import { g as vk, C as PR, S as hk } from "./web2.js";
function mk(m, S) {
  for (var R = 0; R < S.length; R++) {
    const L = S[R];
    if (typeof L != "string" && !Array.isArray(L)) {
      for (const H in L)
        if (H !== "default" && !(H in m)) {
          const B = Object.getOwnPropertyDescriptor(L, H);
          B && Object.defineProperty(m, H, B.get ? B : {
            enumerable: !0,
            get: () => L[H]
          });
        }
    }
  }
  return Object.freeze(Object.defineProperty(m, Symbol.toStringTag, { value: "Module" }));
}
var ly = { exports: {} }, ov = {}, uy = { exports: {} }, _t = {};
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var HR;
function yk() {
  if (HR) return _t;
  HR = 1;
  var m = Symbol.for("react.element"), S = Symbol.for("react.portal"), R = Symbol.for("react.fragment"), L = Symbol.for("react.strict_mode"), H = Symbol.for("react.profiler"), B = Symbol.for("react.provider"), E = Symbol.for("react.context"), ce = Symbol.for("react.forward_ref"), W = Symbol.for("react.suspense"), q = Symbol.for("react.memo"), me = Symbol.for("react.lazy"), K = Symbol.iterator;
  function oe(O) {
    return O === null || typeof O != "object" ? null : (O = K && O[K] || O["@@iterator"], typeof O == "function" ? O : null);
  }
  var ne = { isMounted: function() {
    return !1;
  }, enqueueForceUpdate: function() {
  }, enqueueReplaceState: function() {
  }, enqueueSetState: function() {
  } }, fe = Object.assign, we = {};
  function ze(O, Q, We) {
    this.props = O, this.context = Q, this.refs = we, this.updater = We || ne;
  }
  ze.prototype.isReactComponent = {}, ze.prototype.setState = function(O, Q) {
    if (typeof O != "object" && typeof O != "function" && O != null) throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
    this.updater.enqueueSetState(this, O, Q, "setState");
  }, ze.prototype.forceUpdate = function(O) {
    this.updater.enqueueForceUpdate(this, O, "forceUpdate");
  };
  function qe() {
  }
  qe.prototype = ze.prototype;
  function _e(O, Q, We) {
    this.props = O, this.context = Q, this.refs = we, this.updater = We || ne;
  }
  var ge = _e.prototype = new qe();
  ge.constructor = _e, fe(ge, ze.prototype), ge.isPureReactComponent = !0;
  var Ne = Array.isArray, $ = Object.prototype.hasOwnProperty, Le = { current: null }, de = { key: !0, ref: !0, __self: !0, __source: !0 };
  function Xt(O, Q, We) {
    var Je, ct = {}, ot = null, St = null;
    if (Q != null) for (Je in Q.ref !== void 0 && (St = Q.ref), Q.key !== void 0 && (ot = "" + Q.key), Q) $.call(Q, Je) && !de.hasOwnProperty(Je) && (ct[Je] = Q[Je]);
    var dt = arguments.length - 2;
    if (dt === 1) ct.children = We;
    else if (1 < dt) {
      for (var pt = Array(dt), Zt = 0; Zt < dt; Zt++) pt[Zt] = arguments[Zt + 2];
      ct.children = pt;
    }
    if (O && O.defaultProps) for (Je in dt = O.defaultProps, dt) ct[Je] === void 0 && (ct[Je] = dt[Je]);
    return { $$typeof: m, type: O, key: ot, ref: St, props: ct, _owner: Le.current };
  }
  function En(O, Q) {
    return { $$typeof: m, type: O.type, key: Q, ref: O.ref, props: O.props, _owner: O._owner };
  }
  function Ht(O) {
    return typeof O == "object" && O !== null && O.$$typeof === m;
  }
  function Ot(O) {
    var Q = { "=": "=0", ":": "=2" };
    return "$" + O.replace(/[=:]/g, function(We) {
      return Q[We];
    });
  }
  var mn = /\/+/g;
  function Ye(O, Q) {
    return typeof O == "object" && O !== null && O.key != null ? Ot("" + O.key) : Q.toString(36);
  }
  function lt(O, Q, We, Je, ct) {
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
          case m:
          case S:
            St = !0;
        }
    }
    if (St) return St = O, ct = ct(St), O = Je === "" ? "." + Ye(St, 0) : Je, Ne(ct) ? (We = "", O != null && (We = O.replace(mn, "$&/") + "/"), lt(ct, Q, We, "", function(Zt) {
      return Zt;
    })) : ct != null && (Ht(ct) && (ct = En(ct, We + (!ct.key || St && St.key === ct.key ? "" : ("" + ct.key).replace(mn, "$&/") + "/") + O)), Q.push(ct)), 1;
    if (St = 0, Je = Je === "" ? "." : Je + ":", Ne(O)) for (var dt = 0; dt < O.length; dt++) {
      ot = O[dt];
      var pt = Je + Ye(ot, dt);
      St += lt(ot, Q, We, pt, ct);
    }
    else if (pt = oe(O), typeof pt == "function") for (O = pt.call(O), dt = 0; !(ot = O.next()).done; ) ot = ot.value, pt = Je + Ye(ot, dt++), St += lt(ot, Q, We, pt, ct);
    else if (ot === "object") throw Q = String(O), Error("Objects are not valid as a React child (found: " + (Q === "[object Object]" ? "object with keys {" + Object.keys(O).join(", ") + "}" : Q) + "). If you meant to render a collection of children, use an array instead.");
    return St;
  }
  function Lt(O, Q, We) {
    if (O == null) return O;
    var Je = [], ct = 0;
    return lt(O, Je, "", "", function(ot) {
      return Q.call(We, ot, ct++);
    }), Je;
  }
  function Tt(O) {
    if (O._status === -1) {
      var Q = O._result;
      Q = Q(), Q.then(function(We) {
        (O._status === 0 || O._status === -1) && (O._status = 1, O._result = We);
      }, function(We) {
        (O._status === 0 || O._status === -1) && (O._status = 2, O._result = We);
      }), O._status === -1 && (O._status = 0, O._result = Q);
    }
    if (O._status === 1) return O._result.default;
    throw O._result;
  }
  var De = { current: null }, ie = { transition: null }, Ue = { ReactCurrentDispatcher: De, ReactCurrentBatchConfig: ie, ReactCurrentOwner: Le };
  function pe() {
    throw Error("act(...) is not supported in production builds of React.");
  }
  return _t.Children = { map: Lt, forEach: function(O, Q, We) {
    Lt(O, function() {
      Q.apply(this, arguments);
    }, We);
  }, count: function(O) {
    var Q = 0;
    return Lt(O, function() {
      Q++;
    }), Q;
  }, toArray: function(O) {
    return Lt(O, function(Q) {
      return Q;
    }) || [];
  }, only: function(O) {
    if (!Ht(O)) throw Error("React.Children.only expected to receive a single React element child.");
    return O;
  } }, _t.Component = ze, _t.Fragment = R, _t.Profiler = H, _t.PureComponent = _e, _t.StrictMode = L, _t.Suspense = W, _t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Ue, _t.act = pe, _t.cloneElement = function(O, Q, We) {
    if (O == null) throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + O + ".");
    var Je = fe({}, O.props), ct = O.key, ot = O.ref, St = O._owner;
    if (Q != null) {
      if (Q.ref !== void 0 && (ot = Q.ref, St = Le.current), Q.key !== void 0 && (ct = "" + Q.key), O.type && O.type.defaultProps) var dt = O.type.defaultProps;
      for (pt in Q) $.call(Q, pt) && !de.hasOwnProperty(pt) && (Je[pt] = Q[pt] === void 0 && dt !== void 0 ? dt[pt] : Q[pt]);
    }
    var pt = arguments.length - 2;
    if (pt === 1) Je.children = We;
    else if (1 < pt) {
      dt = Array(pt);
      for (var Zt = 0; Zt < pt; Zt++) dt[Zt] = arguments[Zt + 2];
      Je.children = dt;
    }
    return { $$typeof: m, type: O.type, key: ct, ref: ot, props: Je, _owner: St };
  }, _t.createContext = function(O) {
    return O = { $$typeof: E, _currentValue: O, _currentValue2: O, _threadCount: 0, Provider: null, Consumer: null, _defaultValue: null, _globalName: null }, O.Provider = { $$typeof: B, _context: O }, O.Consumer = O;
  }, _t.createElement = Xt, _t.createFactory = function(O) {
    var Q = Xt.bind(null, O);
    return Q.type = O, Q;
  }, _t.createRef = function() {
    return { current: null };
  }, _t.forwardRef = function(O) {
    return { $$typeof: ce, render: O };
  }, _t.isValidElement = Ht, _t.lazy = function(O) {
    return { $$typeof: me, _payload: { _status: -1, _result: O }, _init: Tt };
  }, _t.memo = function(O, Q) {
    return { $$typeof: q, type: O, compare: Q === void 0 ? null : Q };
  }, _t.startTransition = function(O) {
    var Q = ie.transition;
    ie.transition = {};
    try {
      O();
    } finally {
      ie.transition = Q;
    }
  }, _t.unstable_act = pe, _t.useCallback = function(O, Q) {
    return De.current.useCallback(O, Q);
  }, _t.useContext = function(O) {
    return De.current.useContext(O);
  }, _t.useDebugValue = function() {
  }, _t.useDeferredValue = function(O) {
    return De.current.useDeferredValue(O);
  }, _t.useEffect = function(O, Q) {
    return De.current.useEffect(O, Q);
  }, _t.useId = function() {
    return De.current.useId();
  }, _t.useImperativeHandle = function(O, Q, We) {
    return De.current.useImperativeHandle(O, Q, We);
  }, _t.useInsertionEffect = function(O, Q) {
    return De.current.useInsertionEffect(O, Q);
  }, _t.useLayoutEffect = function(O, Q) {
    return De.current.useLayoutEffect(O, Q);
  }, _t.useMemo = function(O, Q) {
    return De.current.useMemo(O, Q);
  }, _t.useReducer = function(O, Q, We) {
    return De.current.useReducer(O, Q, We);
  }, _t.useRef = function(O) {
    return De.current.useRef(O);
  }, _t.useState = function(O) {
    return De.current.useState(O);
  }, _t.useSyncExternalStore = function(O, Q, We) {
    return De.current.useSyncExternalStore(O, Q, We);
  }, _t.useTransition = function() {
    return De.current.useTransition();
  }, _t.version = "18.3.1", _t;
}
var fv = { exports: {} };
/**
 * @license React
 * react.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
fv.exports;
var VR;
function gk() {
  return VR || (VR = 1, function(m, S) {
    process.env.NODE_ENV !== "production" && function() {
      typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(new Error());
      var R = "18.3.1", L = Symbol.for("react.element"), H = Symbol.for("react.portal"), B = Symbol.for("react.fragment"), E = Symbol.for("react.strict_mode"), ce = Symbol.for("react.profiler"), W = Symbol.for("react.provider"), q = Symbol.for("react.context"), me = Symbol.for("react.forward_ref"), K = Symbol.for("react.suspense"), oe = Symbol.for("react.suspense_list"), ne = Symbol.for("react.memo"), fe = Symbol.for("react.lazy"), we = Symbol.for("react.offscreen"), ze = Symbol.iterator, qe = "@@iterator";
      function _e(h) {
        if (h === null || typeof h != "object")
          return null;
        var w = ze && h[ze] || h[qe];
        return typeof w == "function" ? w : null;
      }
      var ge = {
        /**
         * @internal
         * @type {ReactComponent}
         */
        current: null
      }, Ne = {
        transition: null
      }, $ = {
        current: null,
        // Used to reproduce behavior of `batchedUpdates` in legacy mode.
        isBatchingLegacy: !1,
        didScheduleLegacyUpdate: !1
      }, Le = {
        /**
         * @internal
         * @type {ReactComponent}
         */
        current: null
      }, de = {}, Xt = null;
      function En(h) {
        Xt = h;
      }
      de.setExtraStackFrame = function(h) {
        Xt = h;
      }, de.getCurrentStack = null, de.getStackAddendum = function() {
        var h = "";
        Xt && (h += Xt);
        var w = de.getCurrentStack;
        return w && (h += w() || ""), h;
      };
      var Ht = !1, Ot = !1, mn = !1, Ye = !1, lt = !1, Lt = {
        ReactCurrentDispatcher: ge,
        ReactCurrentBatchConfig: Ne,
        ReactCurrentOwner: Le
      };
      Lt.ReactDebugCurrentFrame = de, Lt.ReactCurrentActQueue = $;
      function Tt(h) {
        {
          for (var w = arguments.length, F = new Array(w > 1 ? w - 1 : 0), V = 1; V < w; V++)
            F[V - 1] = arguments[V];
          ie("warn", h, F);
        }
      }
      function De(h) {
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
          var Xe = F.map(function(ye) {
            return String(ye);
          });
          Xe.unshift("Warning: " + w), Function.prototype.apply.call(console[h], console, Xe);
        }
      }
      var Ue = {};
      function pe(h, w) {
        {
          var F = h.constructor, V = F && (F.displayName || F.name) || "ReactClass", le = V + "." + w;
          if (Ue[le])
            return;
          De("Can't call %s on a component that is not yet mounted. This is a no-op, but it might indicate a bug in your application. Instead, assign to `this.state` directly or define a `state = {};` class property with the desired state in the %s component.", w, V), Ue[le] = !0;
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
          pe(h, "forceUpdate");
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
          pe(h, "replaceState");
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
          pe(h, "setState");
        }
      }, Q = Object.assign, We = {};
      Object.freeze(We);
      function Je(h, w, F) {
        this.props = h, this.context = w, this.refs = We, this.updater = F || O;
      }
      Je.prototype.isReactComponent = {}, Je.prototype.setState = function(h, w) {
        if (typeof h != "object" && typeof h != "function" && h != null)
          throw new Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
        this.updater.enqueueSetState(this, h, w, "setState");
      }, Je.prototype.forceUpdate = function(h) {
        this.updater.enqueueForceUpdate(this, h, "forceUpdate");
      };
      {
        var ct = {
          isMounted: ["isMounted", "Instead, make sure to clean up subscriptions and pending requests in componentWillUnmount to prevent memory leaks."],
          replaceState: ["replaceState", "Refactor your code to use setState instead (see https://github.com/facebook/react/issues/3236)."]
        }, ot = function(h, w) {
          Object.defineProperty(Je.prototype, h, {
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
      dt.prototype = Je.prototype;
      function pt(h, w, F) {
        this.props = h, this.context = w, this.refs = We, this.updater = F || O;
      }
      var Zt = pt.prototype = new dt();
      Zt.constructor = pt, Q(Zt, Je.prototype), Zt.isPureReactComponent = !0;
      function Zn() {
        var h = {
          current: null
        };
        return Object.seal(h), h;
      }
      var be = Array.isArray;
      function rn(h) {
        return be(h);
      }
      function Cn(h) {
        {
          var w = typeof Symbol == "function" && Symbol.toStringTag, F = w && h[Symbol.toStringTag] || h.constructor.name || "Object";
          return F;
        }
      }
      function Dn(h) {
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
        if (Dn(h))
          return De("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", Cn(h)), Hn(h);
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
        if (typeof h.tag == "number" && De("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof h == "function")
          return h.displayName || h.name || null;
        if (typeof h == "string")
          return h;
        switch (h) {
          case B:
            return "Fragment";
          case H:
            return "Portal";
          case ce:
            return "Profiler";
          case E:
            return "StrictMode";
          case K:
            return "Suspense";
          case oe:
            return "SuspenseList";
        }
        if (typeof h == "object")
          switch (h.$$typeof) {
            case q:
              var w = h;
              return qr(w) + ".Consumer";
            case W:
              var F = h;
              return qr(F._context) + ".Provider";
            case me:
              return Gr(h, h.render, "ForwardRef");
            case ne:
              var V = h.displayName || null;
              return V !== null ? V : Jn(h.type) || "Memo";
            case fe: {
              var le = h, Xe = le._payload, ye = le._init;
              try {
                return Jn(ye(Xe));
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
      }, Rr, ga, sr;
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
          Rr || (Rr = !0, De("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", w));
        };
        F.isReactWarning = !0, Object.defineProperty(h, "key", {
          get: F,
          configurable: !0
        });
      }
      function Si(h, w) {
        var F = function() {
          ga || (ga = !0, De("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", w));
        };
        F.isReactWarning = !0, Object.defineProperty(h, "ref", {
          get: F,
          configurable: !0
        });
      }
      function Sa(h) {
        if (typeof h.ref == "string" && Le.current && h.__self && Le.current.stateNode !== h.__self) {
          var w = Jn(Le.current.type);
          sr[w] || (De('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', w, h.ref), sr[w] = !0);
        }
      }
      var se = function(h, w, F, V, le, Xe, ye) {
        var Ge = {
          // This tag allows us to uniquely identify this as a React Element
          $$typeof: L,
          // Built-in properties that belong on the element
          type: h,
          key: w,
          ref: F,
          props: ye,
          // Record the component responsible for creating this element.
          _owner: Xe
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
      function $e(h, w, F) {
        var V, le = {}, Xe = null, ye = null, Ge = null, yt = null;
        if (w != null) {
          Xr(w) && (ye = w.ref, Sa(w)), Rn(w) && (An(w.key), Xe = "" + w.key), Ge = w.__self === void 0 ? null : w.__self, yt = w.__source === void 0 ? null : w.__source;
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
        if (Xe || ye) {
          var sn = typeof h == "function" ? h.displayName || h.name || "Unknown" : h;
          Xe && Or(le, sn), ye && Si(le, sn);
        }
        return se(h, Xe, ye, Ge, yt, Le.current, le);
      }
      function vt(h, w) {
        var F = se(h.type, w, h.ref, h._self, h._source, h._owner, h.props);
        return F;
      }
      function jt(h, w, F) {
        if (h == null)
          throw new Error("React.cloneElement(...): The argument must be a React element, but you passed " + h + ".");
        var V, le = Q({}, h.props), Xe = h.key, ye = h.ref, Ge = h._self, yt = h._source, Mt = h._owner;
        if (w != null) {
          Xr(w) && (ye = w.ref, Mt = Le.current), Rn(w) && (An(w.key), Xe = "" + w.key);
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
        return se(h.type, Xe, ye, Ge, yt, Mt, le);
      }
      function Vt(h) {
        return typeof h == "object" && h !== null && h.$$typeof === L;
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
      function li(h, w, F, V, le) {
        var Xe = typeof h;
        (Xe === "undefined" || Xe === "boolean") && (h = null);
        var ye = !1;
        if (h === null)
          ye = !0;
        else
          switch (Xe) {
            case "string":
            case "number":
              ye = !0;
              break;
            case "object":
              switch (h.$$typeof) {
                case L:
                case H:
                  ye = !0;
              }
          }
        if (ye) {
          var Ge = h, yt = le(Ge), Mt = V === "" ? zn + Bt(Ge, 0) : V;
          if (rn(yt)) {
            var ln = "";
            Mt != null && (ln = $t(Mt) + "/"), li(yt, w, ln, "", function(ud) {
              return ud;
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
            Gt = h[Yi], un = xt + Bt(Gt, Yi), sn += li(Gt, w, F, un, le);
        else {
          var no = _e(h);
          if (typeof no == "function") {
            var os = h;
            no === os.entries && (Qt || Tt("Using Maps as children is not supported. Use an array of keyed ReactElements instead."), Qt = !0);
            for (var ld = no.call(os), ci, ss = 0; !(ci = ld.next()).done; )
              Gt = ci.value, un = xt + Bt(Gt, ss++), sn += li(Gt, w, F, un, le);
          } else if (Xe === "object") {
            var cs = String(h);
            throw new Error("Objects are not valid as a React child (found: " + (cs === "[object Object]" ? "object with keys {" + Object.keys(h).join(", ") + "}" : cs) + "). If you meant to render a collection of children, use an array instead.");
          }
        }
        return sn;
      }
      function Aa(h, w, F) {
        if (h == null)
          return h;
        var V = [], le = 0;
        return li(h, V, "", "", function(Xe) {
          return w.call(F, Xe, le++);
        }), V;
      }
      function yl(h) {
        var w = 0;
        return Aa(h, function() {
          w++;
        }), w;
      }
      function iu(h, w, F) {
        Aa(h, function() {
          w.apply(this, arguments);
        }, F);
      }
      function Yu(h) {
        return Aa(h, function(w) {
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
          $$typeof: q,
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
          $$typeof: W,
          _context: w
        };
        var F = !1, V = !1, le = !1;
        {
          var Xe = {
            $$typeof: q,
            _context: w
          };
          Object.defineProperties(Xe, {
            Provider: {
              get: function() {
                return V || (V = !0, De("Rendering <Context.Consumer.Provider> is not supported and will be removed in a future major release. Did you mean to render <Context.Provider> instead?")), w.Provider;
              },
              set: function(ye) {
                w.Provider = ye;
              }
            },
            _currentValue: {
              get: function() {
                return w._currentValue;
              },
              set: function(ye) {
                w._currentValue = ye;
              }
            },
            _currentValue2: {
              get: function() {
                return w._currentValue2;
              },
              set: function(ye) {
                w._currentValue2 = ye;
              }
            },
            _threadCount: {
              get: function() {
                return w._threadCount;
              },
              set: function(ye) {
                w._threadCount = ye;
              }
            },
            Consumer: {
              get: function() {
                return F || (F = !0, De("Rendering <Context.Consumer.Consumer> is not supported and will be removed in a future major release. Did you mean to render <Context.Consumer> instead?")), w.Consumer;
              }
            },
            displayName: {
              get: function() {
                return w.displayName;
              },
              set: function(ye) {
                le || (Tt("Setting `displayName` on Context.Consumer has no effect. You should set it directly on the context with Context.displayName = '%s'.", ye), le = !0);
              }
            }
          }), w.Consumer = Xe;
        }
        return w._currentRenderer = null, w._currentRenderer2 = null, w;
      }
      var Ea = -1, Ei = 0, Ca = 1, ui = 2;
      function Lr(h) {
        if (h._status === Ea) {
          var w = h._result, F = w();
          if (F.then(function(Xe) {
            if (h._status === Ei || h._status === Ea) {
              var ye = h;
              ye._status = Ca, ye._result = Xe;
            }
          }, function(Xe) {
            if (h._status === Ei || h._status === Ea) {
              var ye = h;
              ye._status = ui, ye._result = Xe;
            }
          }), h._status === Ea) {
            var V = h;
            V._status = Ei, V._result = F;
          }
        }
        if (h._status === Ca) {
          var le = h._result;
          return le === void 0 && De(`lazy: Expected the result of a dynamic import() call. Instead received: %s

Your code should look like: 
  const MyComponent = lazy(() => import('./MyComponent'))

Did you accidentally put curly braces around the import?`, le), "default" in le || De(`lazy: Expected the result of a dynamic import() call. Instead received: %s

Your code should look like: 
  const MyComponent = lazy(() => import('./MyComponent'))`, le), le.default;
        } else
          throw h._result;
      }
      function Ra(h) {
        var w = {
          // We use these fields to store the result.
          _status: Ea,
          _result: h
        }, F = {
          $$typeof: fe,
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
              set: function(Xe) {
                De("React.lazy(...): It is not supported to assign `defaultProps` to a lazy component import. Either specify them where the component is defined, or create a wrapping component around it."), V = Xe, Object.defineProperty(F, "defaultProps", {
                  enumerable: !0
                });
              }
            },
            propTypes: {
              configurable: !0,
              get: function() {
                return le;
              },
              set: function(Xe) {
                De("React.lazy(...): It is not supported to assign `propTypes` to a lazy component import. Either specify them where the component is defined, or create a wrapping component around it."), le = Xe, Object.defineProperty(F, "propTypes", {
                  enumerable: !0
                });
              }
            }
          });
        }
        return F;
      }
      function Ci(h) {
        h != null && h.$$typeof === ne ? De("forwardRef requires a render function but received a `memo` component. Instead of forwardRef(memo(...)), use memo(forwardRef(...)).") : typeof h != "function" ? De("forwardRef requires a render function but was given %s.", h === null ? "null" : typeof h) : h.length !== 0 && h.length !== 2 && De("forwardRef render functions accept exactly two parameters: props and ref. %s", h.length === 1 ? "Did you forget to use the ref parameter?" : "Any additional parameter will be undefined."), h != null && (h.defaultProps != null || h.propTypes != null) && De("forwardRef render functions do not support propTypes or defaultProps. Did you accidentally pass a React component?");
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
      var Ri;
      Ri = Symbol.for("react.module.reference");
      function b(h) {
        return !!(typeof h == "string" || typeof h == "function" || h === B || h === ce || lt || h === E || h === K || h === oe || Ye || h === we || Ht || Ot || mn || typeof h == "object" && h !== null && (h.$$typeof === fe || h.$$typeof === ne || h.$$typeof === W || h.$$typeof === q || h.$$typeof === me || // This needs to include all possible module reference object
        // types supported by any Flight configuration anywhere since
        // we don't know which Flight build this will end up being used
        // with.
        h.$$typeof === Ri || h.getModuleId !== void 0));
      }
      function J(h, w) {
        b(h) || De("memo: The first argument must be a component. Instead received: %s", h === null ? "null" : typeof h);
        var F = {
          $$typeof: ne,
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
      function ae() {
        var h = ge.current;
        return h === null && De(`Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:
1. You might have mismatching versions of React and the renderer (such as React DOM)
2. You might be breaking the Rules of Hooks
3. You might have more than one copy of React in the same app
See https://reactjs.org/link/invalid-hook-call for tips about how to debug and fix this problem.`), h;
      }
      function Pe(h) {
        var w = ae();
        if (h._context !== void 0) {
          var F = h._context;
          F.Consumer === h ? De("Calling useContext(Context.Consumer) is not supported, may cause bugs, and will be removed in a future major release. Did you mean to call useContext(Context) instead?") : F.Provider === h && De("Calling useContext(Context.Provider) is not supported. Did you mean to call useContext(Context) instead?");
        }
        return w.useContext(h);
      }
      function Et(h) {
        var w = ae();
        return w.useState(h);
      }
      function wt(h, w, F) {
        var V = ae();
        return V.useReducer(h, w, F);
      }
      function Ke(h) {
        var w = ae();
        return w.useRef(h);
      }
      function ht(h, w) {
        var F = ae();
        return F.useEffect(h, w);
      }
      function Vn(h, w) {
        var F = ae();
        return F.useInsertionEffect(h, w);
      }
      function an(h, w) {
        var F = ae();
        return F.useLayoutEffect(h, w);
      }
      function fn(h, w) {
        var F = ae();
        return F.useCallback(h, w);
      }
      function wr(h, w) {
        var F = ae();
        return F.useMemo(h, w);
      }
      function Ti(h, w, F) {
        var V = ae();
        return V.useImperativeHandle(h, w, F);
      }
      function Nt(h, w) {
        {
          var F = ae();
          return F.useDebugValue(h, w);
        }
      }
      function er() {
        var h = ae();
        return h.useTransition();
      }
      function Nr(h) {
        var w = ae();
        return w.useDeferredValue(h);
      }
      function mt() {
        var h = ae();
        return h.useId();
      }
      function za(h, w, F) {
        var V = ae();
        return V.useSyncExternalStore(h, w, F);
      }
      var Sl = 0, Wu, El, Zr, as, Ar, is, ls;
      function cc() {
      }
      cc.__reactDisabledLog = !0;
      function Qu() {
        {
          if (Sl === 0) {
            Wu = console.log, El = console.info, Zr = console.warn, as = console.error, Ar = console.group, is = console.groupCollapsed, ls = console.groupEnd;
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
              log: Q({}, h, {
                value: Wu
              }),
              info: Q({}, h, {
                value: El
              }),
              warn: Q({}, h, {
                value: Zr
              }),
              error: Q({}, h, {
                value: as
              }),
              group: Q({}, h, {
                value: Ar
              }),
              groupCollapsed: Q({}, h, {
                value: is
              }),
              groupEnd: Q({}, h, {
                value: ls
              })
            });
          }
          Sl < 0 && De("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
        }
      }
      var oi = Lt.ReactCurrentDispatcher, zr;
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
        var Gu = typeof WeakMap == "function" ? WeakMap : Map;
        wl = new Gu();
      }
      function qu(h, w) {
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
        var Xe;
        Xe = oi.current, oi.current = null, Qu();
        try {
          if (w) {
            var ye = function() {
              throw Error();
            };
            if (Object.defineProperty(ye.prototype, "props", {
              set: function() {
                throw Error();
              }
            }), typeof Reflect == "object" && Reflect.construct) {
              try {
                Reflect.construct(ye, []);
              } catch (xt) {
                V = xt;
              }
              Reflect.construct(h, [], ye);
            } else {
              try {
                ye.call();
              } catch (xt) {
                V = xt;
              }
              h.call(ye.prototype);
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
          Tl = !1, oi.current = Xe, Cl(), Error.prepareStackTrace = le;
        }
        var un = h ? h.displayName || h.name : "", sn = un ? Rl(un) : "";
        return typeof h == "function" && wl.set(h, sn), sn;
      }
      function $i(h, w, F) {
        return qu(h, !1);
      }
      function id(h) {
        var w = h.prototype;
        return !!(w && w.isReactComponent);
      }
      function wi(h, w, F) {
        if (h == null)
          return "";
        if (typeof h == "function")
          return qu(h, id(h));
        if (typeof h == "string")
          return Rl(h);
        switch (h) {
          case K:
            return Rl("Suspense");
          case oe:
            return Rl("SuspenseList");
        }
        if (typeof h == "object")
          switch (h.$$typeof) {
            case me:
              return $i(h.render);
            case ne:
              return wi(h.type, w, F);
            case fe: {
              var V = h, le = V._payload, Xe = V._init;
              try {
                return wi(Xe(le), w, F);
              } catch {
              }
            }
          }
        return "";
      }
      var At = {}, Ku = Lt.ReactDebugCurrentFrame;
      function lu(h) {
        if (h) {
          var w = h._owner, F = wi(h.type, h._source, w ? w.type : null);
          Ku.setExtraStackFrame(F);
        } else
          Ku.setExtraStackFrame(null);
      }
      function Xu(h, w, F, V, le) {
        {
          var Xe = Function.call.bind(Cr);
          for (var ye in h)
            if (Xe(h, ye)) {
              var Ge = void 0;
              try {
                if (typeof h[ye] != "function") {
                  var yt = Error((V || "React class") + ": " + F + " type `" + ye + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof h[ye] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                  throw yt.name = "Invariant Violation", yt;
                }
                Ge = h[ye](w, ye, V, F, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
              } catch (Mt) {
                Ge = Mt;
              }
              Ge && !(Ge instanceof Error) && (lu(le), De("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", V || "React class", F, ye, typeof Ge), lu(null)), Ge instanceof Error && !(Ge.message in At) && (At[Ge.message] = !0, lu(le), De("Failed %s type: %s", F, Ge.message), lu(null));
            }
        }
      }
      function bt(h) {
        if (h) {
          var w = h._owner, F = wi(h.type, h._source, w ? w.type : null);
          En(F);
        } else
          En(null);
      }
      var Zu;
      Zu = !1;
      function Ju() {
        if (Le.current) {
          var h = Jn(Le.current.type);
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
      function uu(h) {
        return h != null ? at(h.__source) : "";
      }
      var wn = {};
      function Jr(h) {
        var w = Ju();
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
            h && h._owner && h._owner !== Le.current && (V = " It was passed a child from " + Jn(h._owner.type) + "."), bt(h), De('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', F, V), bt(null);
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
            var le = _e(h);
            if (typeof le == "function" && le !== h.entries)
              for (var Xe = le.call(h), ye; !(ye = Xe.next()).done; )
                Vt(ye.value) && Ur(ye.value, w);
          }
        }
      }
      function kn(h) {
        {
          var w = h.type;
          if (w == null || typeof w == "string")
            return;
          var F;
          if (typeof w == "function")
            F = w.propTypes;
          else if (typeof w == "object" && (w.$$typeof === me || // Note: Memo only checks outer props here.
          // Inner props are checked in the reconciler.
          w.$$typeof === ne))
            F = w.propTypes;
          else
            return;
          if (F) {
            var V = Jn(w);
            Xu(F, h.props, "prop", V, h);
          } else if (w.PropTypes !== void 0 && !Zu) {
            Zu = !0;
            var le = Jn(w);
            De("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", le || "Unknown");
          }
          typeof w.getDefaultProps == "function" && !w.getDefaultProps.isReactClassApproved && De("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
        }
      }
      function It(h) {
        {
          for (var w = Object.keys(h.props), F = 0; F < w.length; F++) {
            var V = w[F];
            if (V !== "children" && V !== "key") {
              bt(h), De("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", V), bt(null);
              break;
            }
          }
          h.ref !== null && (bt(h), De("Invalid attribute `ref` supplied to `React.Fragment`."), bt(null));
        }
      }
      function fc(h, w, F) {
        var V = b(h);
        if (!V) {
          var le = "";
          (h === void 0 || typeof h == "object" && h !== null && Object.keys(h).length === 0) && (le += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var Xe = uu(w);
          Xe ? le += Xe : le += Ju();
          var ye;
          h === null ? ye = "null" : rn(h) ? ye = "array" : h !== void 0 && h.$$typeof === L ? (ye = "<" + (Jn(h.type) || "Unknown") + " />", le = " Did you accidentally export a JSX literal instead of a component?") : ye = typeof h, De("React.createElement: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", ye, le);
        }
        var Ge = $e.apply(this, arguments);
        if (Ge == null)
          return Ge;
        if (V)
          for (var yt = 2; yt < arguments.length; yt++)
            bl(arguments[yt], h);
        return h === B ? It(Ge) : kn(Ge), Ge;
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
      function bi(h, w, F) {
        for (var V = jt.apply(this, arguments), le = 2; le < arguments.length; le++)
          bl(arguments[le], V.type);
        return kn(V), V;
      }
      function dc(h, w) {
        var F = Ne.transition;
        Ne.transition = {};
        var V = Ne.transition;
        Ne.transition._updatedFibers = /* @__PURE__ */ new Set();
        try {
          h();
        } finally {
          if (Ne.transition = F, F === null && V._updatedFibers) {
            var le = V._updatedFibers.size;
            le > 10 && Tt("Detected a large number of updates inside startTransition. If this is due to a subscription please re-write it to use React provided hooks. Otherwise concurrent mode guarantees are off the table."), V._updatedFibers.clear();
          }
        }
      }
      var Bi = !1, xl = null;
      function pc(h) {
        if (xl === null)
          try {
            var w = ("require" + Math.random()).slice(0, 7), F = m && m[w];
            xl = F.call(m, "timers").setImmediate;
          } catch {
            xl = function(le) {
              Bi === !1 && (Bi = !0, typeof MessageChannel > "u" && De("This browser does not have a MessageChannel implementation, so enqueuing tasks via await act(async () => ...) will fail. Please file an issue at https://github.com/facebook/react/issues if you encounter this warning."));
              var Xe = new MessageChannel();
              Xe.port1.onmessage = le, Xe.port2.postMessage(void 0);
            };
          }
        return xl(h);
      }
      var Ua = 0, _l = !1;
      function Ii(h) {
        {
          var w = Ua;
          Ua++, $.current === null && ($.current = []);
          var F = $.isBatchingLegacy, V;
          try {
            if ($.isBatchingLegacy = !0, V = h(), !F && $.didScheduleLegacyUpdate) {
              var le = $.current;
              le !== null && ($.didScheduleLegacyUpdate = !1, kl(le));
            }
          } catch (un) {
            throw Fa(w), un;
          } finally {
            $.isBatchingLegacy = F;
          }
          if (V !== null && typeof V == "object" && typeof V.then == "function") {
            var Xe = V, ye = !1, Ge = {
              then: function(un, sn) {
                ye = !0, Xe.then(function(xt) {
                  Fa(w), Ua === 0 ? eo(xt, un, sn) : un(xt);
                }, function(xt) {
                  Fa(w), sn(xt);
                });
              }
            };
            return !_l && typeof Promise < "u" && Promise.resolve().then(function() {
            }).then(function() {
              ye || (_l = !0, De("You called act(async () => ...) without await. This could lead to unexpected testing behaviour, interleaving multiple act calls and mixing their scopes. You should - await act(async () => ...);"));
            }), Ge;
          } else {
            var yt = V;
            if (Fa(w), Ua === 0) {
              var Mt = $.current;
              Mt !== null && (kl(Mt), $.current = null);
              var ln = {
                then: function(un, sn) {
                  $.current === null ? ($.current = [], eo(yt, un, sn)) : un(yt);
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
      function Fa(h) {
        h !== Ua - 1 && De("You seem to have overlapping act() calls, this is not supported. Be sure to await previous act() calls before making a new one. "), Ua = h;
      }
      function eo(h, w, F) {
        {
          var V = $.current;
          if (V !== null)
            try {
              kl(V), pc(function() {
                V.length === 0 ? ($.current = null, w(h)) : eo(h, w, F);
              });
            } catch (le) {
              F(le);
            }
          else
            w(h);
        }
      }
      var Dl = !1;
      function kl(h) {
        if (!Dl) {
          Dl = !0;
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
            Dl = !1;
          }
        }
      }
      var ou = fc, to = bi, us = tr, si = {
        map: Aa,
        forEach: iu,
        count: yl,
        toArray: Yu,
        only: Vi
      };
      S.Children = si, S.Component = Je, S.Fragment = B, S.Profiler = ce, S.PureComponent = pt, S.StrictMode = E, S.Suspense = K, S.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Lt, S.act = Ii, S.cloneElement = to, S.createContext = gl, S.createElement = ou, S.createFactory = us, S.createRef = Zn, S.forwardRef = Ci, S.isValidElement = Vt, S.lazy = Ra, S.memo = J, S.startTransition = dc, S.unstable_act = Ii, S.useCallback = fn, S.useContext = Pe, S.useDebugValue = Nt, S.useDeferredValue = Nr, S.useEffect = ht, S.useId = mt, S.useImperativeHandle = Ti, S.useInsertionEffect = Vn, S.useLayoutEffect = an, S.useMemo = wr, S.useReducer = wt, S.useRef = Ke, S.useState = Et, S.useSyncExternalStore = za, S.useTransition = er, S.version = R, typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error());
    }();
  }(fv, fv.exports)), fv.exports;
}
var $R;
function hv() {
  return $R || ($R = 1, process.env.NODE_ENV === "production" ? uy.exports = yk() : uy.exports = gk()), uy.exports;
}
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var BR;
function Sk() {
  if (BR) return ov;
  BR = 1;
  var m = hv(), S = Symbol.for("react.element"), R = Symbol.for("react.fragment"), L = Object.prototype.hasOwnProperty, H = m.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, B = { key: !0, ref: !0, __self: !0, __source: !0 };
  function E(ce, W, q) {
    var me, K = {}, oe = null, ne = null;
    q !== void 0 && (oe = "" + q), W.key !== void 0 && (oe = "" + W.key), W.ref !== void 0 && (ne = W.ref);
    for (me in W) L.call(W, me) && !B.hasOwnProperty(me) && (K[me] = W[me]);
    if (ce && ce.defaultProps) for (me in W = ce.defaultProps, W) K[me] === void 0 && (K[me] = W[me]);
    return { $$typeof: S, type: ce, key: oe, ref: ne, props: K, _owner: H.current };
  }
  return ov.Fragment = R, ov.jsx = E, ov.jsxs = E, ov;
}
var sv = {};
/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var IR;
function Ek() {
  return IR || (IR = 1, process.env.NODE_ENV !== "production" && function() {
    var m = hv(), S = Symbol.for("react.element"), R = Symbol.for("react.portal"), L = Symbol.for("react.fragment"), H = Symbol.for("react.strict_mode"), B = Symbol.for("react.profiler"), E = Symbol.for("react.provider"), ce = Symbol.for("react.context"), W = Symbol.for("react.forward_ref"), q = Symbol.for("react.suspense"), me = Symbol.for("react.suspense_list"), K = Symbol.for("react.memo"), oe = Symbol.for("react.lazy"), ne = Symbol.for("react.offscreen"), fe = Symbol.iterator, we = "@@iterator";
    function ze(b) {
      if (b === null || typeof b != "object")
        return null;
      var J = fe && b[fe] || b[we];
      return typeof J == "function" ? J : null;
    }
    var qe = m.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function _e(b) {
      {
        for (var J = arguments.length, ae = new Array(J > 1 ? J - 1 : 0), Pe = 1; Pe < J; Pe++)
          ae[Pe - 1] = arguments[Pe];
        ge("error", b, ae);
      }
    }
    function ge(b, J, ae) {
      {
        var Pe = qe.ReactDebugCurrentFrame, Et = Pe.getStackAddendum();
        Et !== "" && (J += "%s", ae = ae.concat([Et]));
        var wt = ae.map(function(Ke) {
          return String(Ke);
        });
        wt.unshift("Warning: " + J), Function.prototype.apply.call(console[b], console, wt);
      }
    }
    var Ne = !1, $ = !1, Le = !1, de = !1, Xt = !1, En;
    En = Symbol.for("react.module.reference");
    function Ht(b) {
      return !!(typeof b == "string" || typeof b == "function" || b === L || b === B || Xt || b === H || b === q || b === me || de || b === ne || Ne || $ || Le || typeof b == "object" && b !== null && (b.$$typeof === oe || b.$$typeof === K || b.$$typeof === E || b.$$typeof === ce || b.$$typeof === W || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      b.$$typeof === En || b.getModuleId !== void 0));
    }
    function Ot(b, J, ae) {
      var Pe = b.displayName;
      if (Pe)
        return Pe;
      var Et = J.displayName || J.name || "";
      return Et !== "" ? ae + "(" + Et + ")" : ae;
    }
    function mn(b) {
      return b.displayName || "Context";
    }
    function Ye(b) {
      if (b == null)
        return null;
      if (typeof b.tag == "number" && _e("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof b == "function")
        return b.displayName || b.name || null;
      if (typeof b == "string")
        return b;
      switch (b) {
        case L:
          return "Fragment";
        case R:
          return "Portal";
        case B:
          return "Profiler";
        case H:
          return "StrictMode";
        case q:
          return "Suspense";
        case me:
          return "SuspenseList";
      }
      if (typeof b == "object")
        switch (b.$$typeof) {
          case ce:
            var J = b;
            return mn(J) + ".Consumer";
          case E:
            var ae = b;
            return mn(ae._context) + ".Provider";
          case W:
            return Ot(b, b.render, "ForwardRef");
          case K:
            var Pe = b.displayName || null;
            return Pe !== null ? Pe : Ye(b.type) || "Memo";
          case oe: {
            var Et = b, wt = Et._payload, Ke = Et._init;
            try {
              return Ye(Ke(wt));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    var lt = Object.assign, Lt = 0, Tt, De, ie, Ue, pe, O, Q;
    function We() {
    }
    We.__reactDisabledLog = !0;
    function Je() {
      {
        if (Lt === 0) {
          Tt = console.log, De = console.info, ie = console.warn, Ue = console.error, pe = console.group, O = console.groupCollapsed, Q = console.groupEnd;
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
              value: De
            }),
            warn: lt({}, b, {
              value: ie
            }),
            error: lt({}, b, {
              value: Ue
            }),
            group: lt({}, b, {
              value: pe
            }),
            groupCollapsed: lt({}, b, {
              value: O
            }),
            groupEnd: lt({}, b, {
              value: Q
            })
          });
        }
        Lt < 0 && _e("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var ot = qe.ReactCurrentDispatcher, St;
    function dt(b, J, ae) {
      {
        if (St === void 0)
          try {
            throw Error();
          } catch (Et) {
            var Pe = Et.stack.trim().match(/\n( *(at )?)/);
            St = Pe && Pe[1] || "";
          }
        return `
` + St + b;
      }
    }
    var pt = !1, Zt;
    {
      var Zn = typeof WeakMap == "function" ? WeakMap : Map;
      Zt = new Zn();
    }
    function be(b, J) {
      if (!b || pt)
        return "";
      {
        var ae = Zt.get(b);
        if (ae !== void 0)
          return ae;
      }
      var Pe;
      pt = !0;
      var Et = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var wt;
      wt = ot.current, ot.current = null, Je();
      try {
        if (J) {
          var Ke = function() {
            throw Error();
          };
          if (Object.defineProperty(Ke.prototype, "props", {
            set: function() {
              throw Error();
            }
          }), typeof Reflect == "object" && Reflect.construct) {
            try {
              Reflect.construct(Ke, []);
            } catch (er) {
              Pe = er;
            }
            Reflect.construct(b, [], Ke);
          } else {
            try {
              Ke.call();
            } catch (er) {
              Pe = er;
            }
            b.call(Ke.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (er) {
            Pe = er;
          }
          b();
        }
      } catch (er) {
        if (er && Pe && typeof er.stack == "string") {
          for (var ht = er.stack.split(`
`), Vn = Pe.stack.split(`
`), an = ht.length - 1, fn = Vn.length - 1; an >= 1 && fn >= 0 && ht[an] !== Vn[fn]; )
            fn--;
          for (; an >= 1 && fn >= 0; an--, fn--)
            if (ht[an] !== Vn[fn]) {
              if (an !== 1 || fn !== 1)
                do
                  if (an--, fn--, fn < 0 || ht[an] !== Vn[fn]) {
                    var wr = `
` + ht[an].replace(" at new ", " at ");
                    return b.displayName && wr.includes("<anonymous>") && (wr = wr.replace("<anonymous>", b.displayName)), typeof b == "function" && Zt.set(b, wr), wr;
                  }
                while (an >= 1 && fn >= 0);
              break;
            }
        }
      } finally {
        pt = !1, ot.current = wt, ct(), Error.prepareStackTrace = Et;
      }
      var Ti = b ? b.displayName || b.name : "", Nt = Ti ? dt(Ti) : "";
      return typeof b == "function" && Zt.set(b, Nt), Nt;
    }
    function rn(b, J, ae) {
      return be(b, !1);
    }
    function Cn(b) {
      var J = b.prototype;
      return !!(J && J.isReactComponent);
    }
    function Dn(b, J, ae) {
      if (b == null)
        return "";
      if (typeof b == "function")
        return be(b, Cn(b));
      if (typeof b == "string")
        return dt(b);
      switch (b) {
        case q:
          return dt("Suspense");
        case me:
          return dt("SuspenseList");
      }
      if (typeof b == "object")
        switch (b.$$typeof) {
          case W:
            return rn(b.render);
          case K:
            return Dn(b.type, J, ae);
          case oe: {
            var Pe = b, Et = Pe._payload, wt = Pe._init;
            try {
              return Dn(wt(Et), J, ae);
            } catch {
            }
          }
        }
      return "";
    }
    var Hn = Object.prototype.hasOwnProperty, An = {}, Gr = qe.ReactDebugCurrentFrame;
    function qr(b) {
      if (b) {
        var J = b._owner, ae = Dn(b.type, b._source, J ? J.type : null);
        Gr.setExtraStackFrame(ae);
      } else
        Gr.setExtraStackFrame(null);
    }
    function Jn(b, J, ae, Pe, Et) {
      {
        var wt = Function.call.bind(Hn);
        for (var Ke in b)
          if (wt(b, Ke)) {
            var ht = void 0;
            try {
              if (typeof b[Ke] != "function") {
                var Vn = Error((Pe || "React class") + ": " + ae + " type `" + Ke + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof b[Ke] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw Vn.name = "Invariant Violation", Vn;
              }
              ht = b[Ke](J, Ke, Pe, ae, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (an) {
              ht = an;
            }
            ht && !(ht instanceof Error) && (qr(Et), _e("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", Pe || "React class", ae, Ke, typeof ht), qr(null)), ht instanceof Error && !(ht.message in An) && (An[ht.message] = !0, qr(Et), _e("Failed %s type: %s", ae, ht.message), qr(null));
          }
      }
    }
    var Cr = Array.isArray;
    function Kr(b) {
      return Cr(b);
    }
    function Rr(b) {
      {
        var J = typeof Symbol == "function" && Symbol.toStringTag, ae = J && b[Symbol.toStringTag] || b.constructor.name || "Object";
        return ae;
      }
    }
    function ga(b) {
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
      if (ga(b))
        return _e("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", Rr(b)), sr(b);
    }
    var Rn = qe.ReactCurrentOwner, Or = {
      key: !0,
      ref: !0,
      __self: !0,
      __source: !0
    }, Si, Sa, se;
    se = {};
    function $e(b) {
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
        var ae = Ye(Rn.current.type);
        se[ae] || (_e('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', Ye(Rn.current.type), b.ref), se[ae] = !0);
      }
    }
    function Vt(b, J) {
      {
        var ae = function() {
          Si || (Si = !0, _e("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", J));
        };
        ae.isReactWarning = !0, Object.defineProperty(b, "key", {
          get: ae,
          configurable: !0
        });
      }
    }
    function zn(b, J) {
      {
        var ae = function() {
          Sa || (Sa = !0, _e("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", J));
        };
        ae.isReactWarning = !0, Object.defineProperty(b, "ref", {
          get: ae,
          configurable: !0
        });
      }
    }
    var Tn = function(b, J, ae, Pe, Et, wt, Ke) {
      var ht = {
        // This tag allows us to uniquely identify this as a React Element
        $$typeof: S,
        // Built-in properties that belong on the element
        type: b,
        key: J,
        ref: ae,
        props: Ke,
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
        value: Pe
      }), Object.defineProperty(ht, "_source", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: Et
      }), Object.freeze && (Object.freeze(ht.props), Object.freeze(ht)), ht;
    };
    function Tr(b, J, ae, Pe, Et) {
      {
        var wt, Ke = {}, ht = null, Vn = null;
        ae !== void 0 && (Xr(ae), ht = "" + ae), vt(J) && (Xr(J.key), ht = "" + J.key), $e(J) && (Vn = J.ref, jt(J, Et));
        for (wt in J)
          Hn.call(J, wt) && !Or.hasOwnProperty(wt) && (Ke[wt] = J[wt]);
        if (b && b.defaultProps) {
          var an = b.defaultProps;
          for (wt in an)
            Ke[wt] === void 0 && (Ke[wt] = an[wt]);
        }
        if (ht || Vn) {
          var fn = typeof b == "function" ? b.displayName || b.name || "Unknown" : b;
          ht && Vt(Ke, fn), Vn && zn(Ke, fn);
        }
        return Tn(b, ht, Vn, Et, Pe, Rn.current, Ke);
      }
    }
    var Qt = qe.ReactCurrentOwner, Mr = qe.ReactDebugCurrentFrame;
    function $t(b) {
      if (b) {
        var J = b._owner, ae = Dn(b.type, b._source, J ? J.type : null);
        Mr.setExtraStackFrame(ae);
      } else
        Mr.setExtraStackFrame(null);
    }
    var Bt;
    Bt = !1;
    function li(b) {
      return typeof b == "object" && b !== null && b.$$typeof === S;
    }
    function Aa() {
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
    var iu = {};
    function Yu(b) {
      {
        var J = Aa();
        if (!J) {
          var ae = typeof b == "string" ? b : b.displayName || b.name;
          ae && (J = `

Check the top-level render call using <` + ae + ">.");
        }
        return J;
      }
    }
    function Vi(b, J) {
      {
        if (!b._store || b._store.validated || b.key != null)
          return;
        b._store.validated = !0;
        var ae = Yu(J);
        if (iu[ae])
          return;
        iu[ae] = !0;
        var Pe = "";
        b && b._owner && b._owner !== Qt.current && (Pe = " It was passed a child from " + Ye(b._owner.type) + "."), $t(b), _e('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', ae, Pe), $t(null);
      }
    }
    function gl(b, J) {
      {
        if (typeof b != "object")
          return;
        if (Kr(b))
          for (var ae = 0; ae < b.length; ae++) {
            var Pe = b[ae];
            li(Pe) && Vi(Pe, J);
          }
        else if (li(b))
          b._store && (b._store.validated = !0);
        else if (b) {
          var Et = ze(b);
          if (typeof Et == "function" && Et !== b.entries)
            for (var wt = Et.call(b), Ke; !(Ke = wt.next()).done; )
              li(Ke.value) && Vi(Ke.value, J);
        }
      }
    }
    function Ea(b) {
      {
        var J = b.type;
        if (J == null || typeof J == "string")
          return;
        var ae;
        if (typeof J == "function")
          ae = J.propTypes;
        else if (typeof J == "object" && (J.$$typeof === W || // Note: Memo only checks outer props here.
        // Inner props are checked in the reconciler.
        J.$$typeof === K))
          ae = J.propTypes;
        else
          return;
        if (ae) {
          var Pe = Ye(J);
          Jn(ae, b.props, "prop", Pe, b);
        } else if (J.PropTypes !== void 0 && !Bt) {
          Bt = !0;
          var Et = Ye(J);
          _e("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", Et || "Unknown");
        }
        typeof J.getDefaultProps == "function" && !J.getDefaultProps.isReactClassApproved && _e("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
    function Ei(b) {
      {
        for (var J = Object.keys(b.props), ae = 0; ae < J.length; ae++) {
          var Pe = J[ae];
          if (Pe !== "children" && Pe !== "key") {
            $t(b), _e("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", Pe), $t(null);
            break;
          }
        }
        b.ref !== null && ($t(b), _e("Invalid attribute `ref` supplied to `React.Fragment`."), $t(null));
      }
    }
    var Ca = {};
    function ui(b, J, ae, Pe, Et, wt) {
      {
        var Ke = Ht(b);
        if (!Ke) {
          var ht = "";
          (b === void 0 || typeof b == "object" && b !== null && Object.keys(b).length === 0) && (ht += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var Vn = yl();
          Vn ? ht += Vn : ht += Aa();
          var an;
          b === null ? an = "null" : Kr(b) ? an = "array" : b !== void 0 && b.$$typeof === S ? (an = "<" + (Ye(b.type) || "Unknown") + " />", ht = " Did you accidentally export a JSX literal instead of a component?") : an = typeof b, _e("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", an, ht);
        }
        var fn = Tr(b, J, ae, Et, wt);
        if (fn == null)
          return fn;
        if (Ke) {
          var wr = J.children;
          if (wr !== void 0)
            if (Pe)
              if (Kr(wr)) {
                for (var Ti = 0; Ti < wr.length; Ti++)
                  gl(wr[Ti], b);
                Object.freeze && Object.freeze(wr);
              } else
                _e("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
            else
              gl(wr, b);
        }
        if (Hn.call(J, "key")) {
          var Nt = Ye(b), er = Object.keys(J).filter(function(za) {
            return za !== "key";
          }), Nr = er.length > 0 ? "{key: someKey, " + er.join(": ..., ") + ": ...}" : "{key: someKey}";
          if (!Ca[Nt + Nr]) {
            var mt = er.length > 0 ? "{" + er.join(": ..., ") + ": ...}" : "{}";
            _e(`A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`, Nr, Nt, mt, Nt), Ca[Nt + Nr] = !0;
          }
        }
        return b === L ? Ei(fn) : Ea(fn), fn;
      }
    }
    function Lr(b, J, ae) {
      return ui(b, J, ae, !0);
    }
    function Ra(b, J, ae) {
      return ui(b, J, ae, !1);
    }
    var Ci = Ra, Ri = Lr;
    sv.Fragment = L, sv.jsx = Ci, sv.jsxs = Ri;
  }()), sv;
}
var YR;
function Ck() {
  return YR || (YR = 1, process.env.NODE_ENV === "production" ? ly.exports = Sk() : ly.exports = Ek()), ly.exports;
}
var my = Ck(), Hi = hv();
const X0 = /* @__PURE__ */ vk(Hi), WR = /* @__PURE__ */ mk({
  __proto__: null,
  default: X0
}, [Hi]);
var Rk = !1;
function Tk(m) {
  if (m.sheet)
    return m.sheet;
  for (var S = 0; S < document.styleSheets.length; S++)
    if (document.styleSheets[S].ownerNode === m)
      return document.styleSheets[S];
}
function wk(m) {
  var S = document.createElement("style");
  return S.setAttribute("data-emotion", m.key), m.nonce !== void 0 && S.setAttribute("nonce", m.nonce), S.appendChild(document.createTextNode("")), S.setAttribute("data-s", ""), S;
}
var bk = /* @__PURE__ */ function() {
  function m(R) {
    var L = this;
    this._insertTag = function(H) {
      var B;
      L.tags.length === 0 ? L.insertionPoint ? B = L.insertionPoint.nextSibling : L.prepend ? B = L.container.firstChild : B = L.before : B = L.tags[L.tags.length - 1].nextSibling, L.container.insertBefore(H, B), L.tags.push(H);
    }, this.isSpeedy = R.speedy === void 0 ? !Rk : R.speedy, this.tags = [], this.ctr = 0, this.nonce = R.nonce, this.key = R.key, this.container = R.container, this.prepend = R.prepend, this.insertionPoint = R.insertionPoint, this.before = null;
  }
  var S = m.prototype;
  return S.hydrate = function(L) {
    L.forEach(this._insertTag);
  }, S.insert = function(L) {
    this.ctr % (this.isSpeedy ? 65e3 : 1) === 0 && this._insertTag(wk(this));
    var H = this.tags[this.tags.length - 1];
    if (this.isSpeedy) {
      var B = Tk(H);
      try {
        B.insertRule(L, B.cssRules.length);
      } catch {
      }
    } else
      H.appendChild(document.createTextNode(L));
    this.ctr++;
  }, S.flush = function() {
    this.tags.forEach(function(L) {
      var H;
      return (H = L.parentNode) == null ? void 0 : H.removeChild(L);
    }), this.tags = [], this.ctr = 0;
  }, m;
}(), ya = "-ms-", yy = "-moz-", qt = "-webkit-", fT = "comm", tE = "rule", nE = "decl", xk = "@import", dT = "@keyframes", _k = "@layer", Dk = Math.abs, Sy = String.fromCharCode, kk = Object.assign;
function Ok(m, S) {
  return Qr(m, 0) ^ 45 ? (((S << 2 ^ Qr(m, 0)) << 2 ^ Qr(m, 1)) << 2 ^ Qr(m, 2)) << 2 ^ Qr(m, 3) : 0;
}
function pT(m) {
  return m.trim();
}
function Mk(m, S) {
  return (m = S.exec(m)) ? m[0] : m;
}
function Kt(m, S, R) {
  return m.replace(S, R);
}
function Z0(m, S) {
  return m.indexOf(S);
}
function Qr(m, S) {
  return m.charCodeAt(S) | 0;
}
function dv(m, S, R) {
  return m.slice(S, R);
}
function tu(m) {
  return m.length;
}
function rE(m) {
  return m.length;
}
function oy(m, S) {
  return S.push(m), m;
}
function Lk(m, S) {
  return m.map(S).join("");
}
var Ey = 1, rd = 1, vT = 0, ii = 0, or = 0, ad = "";
function Cy(m, S, R, L, H, B, E) {
  return { value: m, root: S, parent: R, type: L, props: H, children: B, line: Ey, column: rd, length: E, return: "" };
}
function cv(m, S) {
  return kk(Cy("", null, null, "", null, null, 0), m, { length: -m.length }, S);
}
function Nk() {
  return or;
}
function Ak() {
  return or = ii > 0 ? Qr(ad, --ii) : 0, rd--, or === 10 && (rd = 1, Ey--), or;
}
function gi() {
  return or = ii < vT ? Qr(ad, ii++) : 0, rd++, or === 10 && (rd = 1, Ey++), or;
}
function au() {
  return Qr(ad, ii);
}
function py() {
  return ii;
}
function mv(m, S) {
  return dv(ad, m, S);
}
function pv(m) {
  switch (m) {
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
function hT(m) {
  return Ey = rd = 1, vT = tu(ad = m), ii = 0, [];
}
function mT(m) {
  return ad = "", m;
}
function vy(m) {
  return pT(mv(ii - 1, J0(m === 91 ? m + 2 : m === 40 ? m + 1 : m)));
}
function zk(m) {
  for (; (or = au()) && or < 33; )
    gi();
  return pv(m) > 2 || pv(or) > 3 ? "" : " ";
}
function Uk(m, S) {
  for (; --S && gi() && !(or < 48 || or > 102 || or > 57 && or < 65 || or > 70 && or < 97); )
    ;
  return mv(m, py() + (S < 6 && au() == 32 && gi() == 32));
}
function J0(m) {
  for (; gi(); )
    switch (or) {
      // ] ) " '
      case m:
        return ii;
      // " '
      case 34:
      case 39:
        m !== 34 && m !== 39 && J0(or);
        break;
      // (
      case 40:
        m === 41 && J0(m);
        break;
      // \
      case 92:
        gi();
        break;
    }
  return ii;
}
function Fk(m, S) {
  for (; gi() && m + or !== 57; )
    if (m + or === 84 && au() === 47)
      break;
  return "/*" + mv(S, ii - 1) + "*" + Sy(m === 47 ? m : gi());
}
function jk(m) {
  for (; !pv(au()); )
    gi();
  return mv(m, ii);
}
function Pk(m) {
  return mT(hy("", null, null, null, [""], m = hT(m), 0, [0], m));
}
function hy(m, S, R, L, H, B, E, ce, W) {
  for (var q = 0, me = 0, K = E, oe = 0, ne = 0, fe = 0, we = 1, ze = 1, qe = 1, _e = 0, ge = "", Ne = H, $ = B, Le = L, de = ge; ze; )
    switch (fe = _e, _e = gi()) {
      // (
      case 40:
        if (fe != 108 && Qr(de, K - 1) == 58) {
          Z0(de += Kt(vy(_e), "&", "&\f"), "&\f") != -1 && (qe = -1);
          break;
        }
      // " ' [
      case 34:
      case 39:
      case 91:
        de += vy(_e);
        break;
      // \t \n \r \s
      case 9:
      case 10:
      case 13:
      case 32:
        de += zk(fe);
        break;
      // \
      case 92:
        de += Uk(py() - 1, 7);
        continue;
      // /
      case 47:
        switch (au()) {
          case 42:
          case 47:
            oy(Hk(Fk(gi(), py()), S, R), W);
            break;
          default:
            de += "/";
        }
        break;
      // {
      case 123 * we:
        ce[q++] = tu(de) * qe;
      // } ; \0
      case 125 * we:
      case 59:
      case 0:
        switch (_e) {
          // \0 }
          case 0:
          case 125:
            ze = 0;
          // ;
          case 59 + me:
            qe == -1 && (de = Kt(de, /\f/g, "")), ne > 0 && tu(de) - K && oy(ne > 32 ? GR(de + ";", L, R, K - 1) : GR(Kt(de, " ", "") + ";", L, R, K - 2), W);
            break;
          // @ ;
          case 59:
            de += ";";
          // { rule/at-rule
          default:
            if (oy(Le = QR(de, S, R, q, me, H, ce, ge, Ne = [], $ = [], K), B), _e === 123)
              if (me === 0)
                hy(de, S, Le, Le, Ne, B, K, ce, $);
              else
                switch (oe === 99 && Qr(de, 3) === 110 ? 100 : oe) {
                  // d l m s
                  case 100:
                  case 108:
                  case 109:
                  case 115:
                    hy(m, Le, Le, L && oy(QR(m, Le, Le, 0, 0, H, ce, ge, H, Ne = [], K), $), H, $, K, ce, L ? Ne : $);
                    break;
                  default:
                    hy(de, Le, Le, Le, [""], $, 0, ce, $);
                }
        }
        q = me = ne = 0, we = qe = 1, ge = de = "", K = E;
        break;
      // :
      case 58:
        K = 1 + tu(de), ne = fe;
      default:
        if (we < 1) {
          if (_e == 123)
            --we;
          else if (_e == 125 && we++ == 0 && Ak() == 125)
            continue;
        }
        switch (de += Sy(_e), _e * we) {
          // &
          case 38:
            qe = me > 0 ? 1 : (de += "\f", -1);
            break;
          // ,
          case 44:
            ce[q++] = (tu(de) - 1) * qe, qe = 1;
            break;
          // @
          case 64:
            au() === 45 && (de += vy(gi())), oe = au(), me = K = tu(ge = de += jk(py())), _e++;
            break;
          // -
          case 45:
            fe === 45 && tu(de) == 2 && (we = 0);
        }
    }
  return B;
}
function QR(m, S, R, L, H, B, E, ce, W, q, me) {
  for (var K = H - 1, oe = H === 0 ? B : [""], ne = rE(oe), fe = 0, we = 0, ze = 0; fe < L; ++fe)
    for (var qe = 0, _e = dv(m, K + 1, K = Dk(we = E[fe])), ge = m; qe < ne; ++qe)
      (ge = pT(we > 0 ? oe[qe] + " " + _e : Kt(_e, /&\f/g, oe[qe]))) && (W[ze++] = ge);
  return Cy(m, S, R, H === 0 ? tE : ce, W, q, me);
}
function Hk(m, S, R) {
  return Cy(m, S, R, fT, Sy(Nk()), dv(m, 2, -2), 0);
}
function GR(m, S, R, L) {
  return Cy(m, S, R, nE, dv(m, 0, L), dv(m, L + 1, -1), L);
}
function nd(m, S) {
  for (var R = "", L = rE(m), H = 0; H < L; H++)
    R += S(m[H], H, m, S) || "";
  return R;
}
function Vk(m, S, R, L) {
  switch (m.type) {
    case _k:
      if (m.children.length) break;
    case xk:
    case nE:
      return m.return = m.return || m.value;
    case fT:
      return "";
    case dT:
      return m.return = m.value + "{" + nd(m.children, L) + "}";
    case tE:
      m.value = m.props.join(",");
  }
  return tu(R = nd(m.children, L)) ? m.return = m.value + "{" + R + "}" : "";
}
function $k(m) {
  var S = rE(m);
  return function(R, L, H, B) {
    for (var E = "", ce = 0; ce < S; ce++)
      E += m[ce](R, L, H, B) || "";
    return E;
  };
}
function Bk(m) {
  return function(S) {
    S.root || (S = S.return) && m(S);
  };
}
function Ik(m) {
  var S = /* @__PURE__ */ Object.create(null);
  return function(R) {
    return S[R] === void 0 && (S[R] = m(R)), S[R];
  };
}
var Yk = function(S, R, L) {
  for (var H = 0, B = 0; H = B, B = au(), H === 38 && B === 12 && (R[L] = 1), !pv(B); )
    gi();
  return mv(S, ii);
}, Wk = function(S, R) {
  var L = -1, H = 44;
  do
    switch (pv(H)) {
      case 0:
        H === 38 && au() === 12 && (R[L] = 1), S[L] += Yk(ii - 1, R, L);
        break;
      case 2:
        S[L] += vy(H);
        break;
      case 4:
        if (H === 44) {
          S[++L] = au() === 58 ? "&\f" : "", R[L] = S[L].length;
          break;
        }
      // fallthrough
      default:
        S[L] += Sy(H);
    }
  while (H = gi());
  return S;
}, Qk = function(S, R) {
  return mT(Wk(hT(S), R));
}, qR = /* @__PURE__ */ new WeakMap(), Gk = function(S) {
  if (!(S.type !== "rule" || !S.parent || // positive .length indicates that this rule contains pseudo
  // negative .length indicates that this rule has been already prefixed
  S.length < 1)) {
    for (var R = S.value, L = S.parent, H = S.column === L.column && S.line === L.line; L.type !== "rule"; )
      if (L = L.parent, !L) return;
    if (!(S.props.length === 1 && R.charCodeAt(0) !== 58 && !qR.get(L)) && !H) {
      qR.set(S, !0);
      for (var B = [], E = Qk(R, B), ce = L.props, W = 0, q = 0; W < E.length; W++)
        for (var me = 0; me < ce.length; me++, q++)
          S.props[q] = B[W] ? E[W].replace(/&\f/g, ce[me]) : ce[me] + " " + E[W];
    }
  }
}, qk = function(S) {
  if (S.type === "decl") {
    var R = S.value;
    // charcode for l
    R.charCodeAt(0) === 108 && // charcode for b
    R.charCodeAt(2) === 98 && (S.return = "", S.value = "");
  }
};
function yT(m, S) {
  switch (Ok(m, S)) {
    // color-adjust
    case 5103:
      return qt + "print-" + m + m;
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
      return qt + m + m;
    // appearance, user-select, transform, hyphens, text-size-adjust
    case 5349:
    case 4246:
    case 4810:
    case 6968:
    case 2756:
      return qt + m + yy + m + ya + m + m;
    // flex, flex-direction
    case 6828:
    case 4268:
      return qt + m + ya + m + m;
    // order
    case 6165:
      return qt + m + ya + "flex-" + m + m;
    // align-items
    case 5187:
      return qt + m + Kt(m, /(\w+).+(:[^]+)/, qt + "box-$1$2" + ya + "flex-$1$2") + m;
    // align-self
    case 5443:
      return qt + m + ya + "flex-item-" + Kt(m, /flex-|-self/, "") + m;
    // align-content
    case 4675:
      return qt + m + ya + "flex-line-pack" + Kt(m, /align-content|flex-|-self/, "") + m;
    // flex-shrink
    case 5548:
      return qt + m + ya + Kt(m, "shrink", "negative") + m;
    // flex-basis
    case 5292:
      return qt + m + ya + Kt(m, "basis", "preferred-size") + m;
    // flex-grow
    case 6060:
      return qt + "box-" + Kt(m, "-grow", "") + qt + m + ya + Kt(m, "grow", "positive") + m;
    // transition
    case 4554:
      return qt + Kt(m, /([^-])(transform)/g, "$1" + qt + "$2") + m;
    // cursor
    case 6187:
      return Kt(Kt(Kt(m, /(zoom-|grab)/, qt + "$1"), /(image-set)/, qt + "$1"), m, "") + m;
    // background, background-image
    case 5495:
    case 3959:
      return Kt(m, /(image-set\([^]*)/, qt + "$1$`$1");
    // justify-content
    case 4968:
      return Kt(Kt(m, /(.+:)(flex-)?(.*)/, qt + "box-pack:$3" + ya + "flex-pack:$3"), /s.+-b[^;]+/, "justify") + qt + m + m;
    // (margin|padding)-inline-(start|end)
    case 4095:
    case 3583:
    case 4068:
    case 2532:
      return Kt(m, /(.+)-inline(.+)/, qt + "$1$2") + m;
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
      if (tu(m) - 1 - S > 6) switch (Qr(m, S + 1)) {
        // (m)ax-content, (m)in-content
        case 109:
          if (Qr(m, S + 4) !== 45) break;
        // (f)ill-available, (f)it-content
        case 102:
          return Kt(m, /(.+:)(.+)-([^]+)/, "$1" + qt + "$2-$3$1" + yy + (Qr(m, S + 3) == 108 ? "$3" : "$2-$3")) + m;
        // (s)tretch
        case 115:
          return ~Z0(m, "stretch") ? yT(Kt(m, "stretch", "fill-available"), S) + m : m;
      }
      break;
    // position: sticky
    case 4949:
      if (Qr(m, S + 1) !== 115) break;
    // display: (flex|inline-flex)
    case 6444:
      switch (Qr(m, tu(m) - 3 - (~Z0(m, "!important") && 10))) {
        // stic(k)y
        case 107:
          return Kt(m, ":", ":" + qt) + m;
        // (inline-)?fl(e)x
        case 101:
          return Kt(m, /(.+:)([^;!]+)(;|!.+)?/, "$1" + qt + (Qr(m, 14) === 45 ? "inline-" : "") + "box$3$1" + qt + "$2$3$1" + ya + "$2box$3") + m;
      }
      break;
    // writing-mode
    case 5936:
      switch (Qr(m, S + 11)) {
        // vertical-l(r)
        case 114:
          return qt + m + ya + Kt(m, /[svh]\w+-[tblr]{2}/, "tb") + m;
        // vertical-r(l)
        case 108:
          return qt + m + ya + Kt(m, /[svh]\w+-[tblr]{2}/, "tb-rl") + m;
        // horizontal(-)tb
        case 45:
          return qt + m + ya + Kt(m, /[svh]\w+-[tblr]{2}/, "lr") + m;
      }
      return qt + m + ya + m + m;
  }
  return m;
}
var Kk = function(S, R, L, H) {
  if (S.length > -1 && !S.return) switch (S.type) {
    case nE:
      S.return = yT(S.value, S.length);
      break;
    case dT:
      return nd([cv(S, {
        value: Kt(S.value, "@", "@" + qt)
      })], H);
    case tE:
      if (S.length) return Lk(S.props, function(B) {
        switch (Mk(B, /(::plac\w+|:read-\w+)/)) {
          // :read-(only|write)
          case ":read-only":
          case ":read-write":
            return nd([cv(S, {
              props: [Kt(B, /:(read-\w+)/, ":" + yy + "$1")]
            })], H);
          // :placeholder
          case "::placeholder":
            return nd([cv(S, {
              props: [Kt(B, /:(plac\w+)/, ":" + qt + "input-$1")]
            }), cv(S, {
              props: [Kt(B, /:(plac\w+)/, ":" + yy + "$1")]
            }), cv(S, {
              props: [Kt(B, /:(plac\w+)/, ya + "input-$1")]
            })], H);
        }
        return "";
      });
  }
}, Xk = [Kk], Zk = function(S) {
  var R = S.key;
  if (R === "css") {
    var L = document.querySelectorAll("style[data-emotion]:not([data-s])");
    Array.prototype.forEach.call(L, function(we) {
      var ze = we.getAttribute("data-emotion");
      ze.indexOf(" ") !== -1 && (document.head.appendChild(we), we.setAttribute("data-s", ""));
    });
  }
  var H = S.stylisPlugins || Xk, B = {}, E, ce = [];
  E = S.container || document.head, Array.prototype.forEach.call(
    // this means we will ignore elements which don't have a space in them which
    // means that the style elements we're looking at are only Emotion 11 server-rendered style elements
    document.querySelectorAll('style[data-emotion^="' + R + ' "]'),
    function(we) {
      for (var ze = we.getAttribute("data-emotion").split(" "), qe = 1; qe < ze.length; qe++)
        B[ze[qe]] = !0;
      ce.push(we);
    }
  );
  var W, q = [Gk, qk];
  {
    var me, K = [Vk, Bk(function(we) {
      me.insert(we);
    })], oe = $k(q.concat(H, K)), ne = function(ze) {
      return nd(Pk(ze), oe);
    };
    W = function(ze, qe, _e, ge) {
      me = _e, ne(ze ? ze + "{" + qe.styles + "}" : qe.styles), ge && (fe.inserted[qe.name] = !0);
    };
  }
  var fe = {
    key: R,
    sheet: new bk({
      key: R,
      container: E,
      nonce: S.nonce,
      speedy: S.speedy,
      prepend: S.prepend,
      insertionPoint: S.insertionPoint
    }),
    nonce: S.nonce,
    inserted: B,
    registered: {},
    insert: W
  };
  return fe.sheet.hydrate(ce), fe;
}, sy = { exports: {} }, tn = {};
/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var KR;
function Jk() {
  if (KR) return tn;
  KR = 1;
  var m = typeof Symbol == "function" && Symbol.for, S = m ? Symbol.for("react.element") : 60103, R = m ? Symbol.for("react.portal") : 60106, L = m ? Symbol.for("react.fragment") : 60107, H = m ? Symbol.for("react.strict_mode") : 60108, B = m ? Symbol.for("react.profiler") : 60114, E = m ? Symbol.for("react.provider") : 60109, ce = m ? Symbol.for("react.context") : 60110, W = m ? Symbol.for("react.async_mode") : 60111, q = m ? Symbol.for("react.concurrent_mode") : 60111, me = m ? Symbol.for("react.forward_ref") : 60112, K = m ? Symbol.for("react.suspense") : 60113, oe = m ? Symbol.for("react.suspense_list") : 60120, ne = m ? Symbol.for("react.memo") : 60115, fe = m ? Symbol.for("react.lazy") : 60116, we = m ? Symbol.for("react.block") : 60121, ze = m ? Symbol.for("react.fundamental") : 60117, qe = m ? Symbol.for("react.responder") : 60118, _e = m ? Symbol.for("react.scope") : 60119;
  function ge($) {
    if (typeof $ == "object" && $ !== null) {
      var Le = $.$$typeof;
      switch (Le) {
        case S:
          switch ($ = $.type, $) {
            case W:
            case q:
            case L:
            case B:
            case H:
            case K:
              return $;
            default:
              switch ($ = $ && $.$$typeof, $) {
                case ce:
                case me:
                case fe:
                case ne:
                case E:
                  return $;
                default:
                  return Le;
              }
          }
        case R:
          return Le;
      }
    }
  }
  function Ne($) {
    return ge($) === q;
  }
  return tn.AsyncMode = W, tn.ConcurrentMode = q, tn.ContextConsumer = ce, tn.ContextProvider = E, tn.Element = S, tn.ForwardRef = me, tn.Fragment = L, tn.Lazy = fe, tn.Memo = ne, tn.Portal = R, tn.Profiler = B, tn.StrictMode = H, tn.Suspense = K, tn.isAsyncMode = function($) {
    return Ne($) || ge($) === W;
  }, tn.isConcurrentMode = Ne, tn.isContextConsumer = function($) {
    return ge($) === ce;
  }, tn.isContextProvider = function($) {
    return ge($) === E;
  }, tn.isElement = function($) {
    return typeof $ == "object" && $ !== null && $.$$typeof === S;
  }, tn.isForwardRef = function($) {
    return ge($) === me;
  }, tn.isFragment = function($) {
    return ge($) === L;
  }, tn.isLazy = function($) {
    return ge($) === fe;
  }, tn.isMemo = function($) {
    return ge($) === ne;
  }, tn.isPortal = function($) {
    return ge($) === R;
  }, tn.isProfiler = function($) {
    return ge($) === B;
  }, tn.isStrictMode = function($) {
    return ge($) === H;
  }, tn.isSuspense = function($) {
    return ge($) === K;
  }, tn.isValidElementType = function($) {
    return typeof $ == "string" || typeof $ == "function" || $ === L || $ === q || $ === B || $ === H || $ === K || $ === oe || typeof $ == "object" && $ !== null && ($.$$typeof === fe || $.$$typeof === ne || $.$$typeof === E || $.$$typeof === ce || $.$$typeof === me || $.$$typeof === ze || $.$$typeof === qe || $.$$typeof === _e || $.$$typeof === we);
  }, tn.typeOf = ge, tn;
}
var nn = {};
/** @license React v16.13.1
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var XR;
function eO() {
  return XR || (XR = 1, process.env.NODE_ENV !== "production" && function() {
    var m = typeof Symbol == "function" && Symbol.for, S = m ? Symbol.for("react.element") : 60103, R = m ? Symbol.for("react.portal") : 60106, L = m ? Symbol.for("react.fragment") : 60107, H = m ? Symbol.for("react.strict_mode") : 60108, B = m ? Symbol.for("react.profiler") : 60114, E = m ? Symbol.for("react.provider") : 60109, ce = m ? Symbol.for("react.context") : 60110, W = m ? Symbol.for("react.async_mode") : 60111, q = m ? Symbol.for("react.concurrent_mode") : 60111, me = m ? Symbol.for("react.forward_ref") : 60112, K = m ? Symbol.for("react.suspense") : 60113, oe = m ? Symbol.for("react.suspense_list") : 60120, ne = m ? Symbol.for("react.memo") : 60115, fe = m ? Symbol.for("react.lazy") : 60116, we = m ? Symbol.for("react.block") : 60121, ze = m ? Symbol.for("react.fundamental") : 60117, qe = m ? Symbol.for("react.responder") : 60118, _e = m ? Symbol.for("react.scope") : 60119;
    function ge(be) {
      return typeof be == "string" || typeof be == "function" || // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
      be === L || be === q || be === B || be === H || be === K || be === oe || typeof be == "object" && be !== null && (be.$$typeof === fe || be.$$typeof === ne || be.$$typeof === E || be.$$typeof === ce || be.$$typeof === me || be.$$typeof === ze || be.$$typeof === qe || be.$$typeof === _e || be.$$typeof === we);
    }
    function Ne(be) {
      if (typeof be == "object" && be !== null) {
        var rn = be.$$typeof;
        switch (rn) {
          case S:
            var Cn = be.type;
            switch (Cn) {
              case W:
              case q:
              case L:
              case B:
              case H:
              case K:
                return Cn;
              default:
                var Dn = Cn && Cn.$$typeof;
                switch (Dn) {
                  case ce:
                  case me:
                  case fe:
                  case ne:
                  case E:
                    return Dn;
                  default:
                    return rn;
                }
            }
          case R:
            return rn;
        }
      }
    }
    var $ = W, Le = q, de = ce, Xt = E, En = S, Ht = me, Ot = L, mn = fe, Ye = ne, lt = R, Lt = B, Tt = H, De = K, ie = !1;
    function Ue(be) {
      return ie || (ie = !0, console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 17+. Update your code to use ReactIs.isConcurrentMode() instead. It has the exact same API.")), pe(be) || Ne(be) === W;
    }
    function pe(be) {
      return Ne(be) === q;
    }
    function O(be) {
      return Ne(be) === ce;
    }
    function Q(be) {
      return Ne(be) === E;
    }
    function We(be) {
      return typeof be == "object" && be !== null && be.$$typeof === S;
    }
    function Je(be) {
      return Ne(be) === me;
    }
    function ct(be) {
      return Ne(be) === L;
    }
    function ot(be) {
      return Ne(be) === fe;
    }
    function St(be) {
      return Ne(be) === ne;
    }
    function dt(be) {
      return Ne(be) === R;
    }
    function pt(be) {
      return Ne(be) === B;
    }
    function Zt(be) {
      return Ne(be) === H;
    }
    function Zn(be) {
      return Ne(be) === K;
    }
    nn.AsyncMode = $, nn.ConcurrentMode = Le, nn.ContextConsumer = de, nn.ContextProvider = Xt, nn.Element = En, nn.ForwardRef = Ht, nn.Fragment = Ot, nn.Lazy = mn, nn.Memo = Ye, nn.Portal = lt, nn.Profiler = Lt, nn.StrictMode = Tt, nn.Suspense = De, nn.isAsyncMode = Ue, nn.isConcurrentMode = pe, nn.isContextConsumer = O, nn.isContextProvider = Q, nn.isElement = We, nn.isForwardRef = Je, nn.isFragment = ct, nn.isLazy = ot, nn.isMemo = St, nn.isPortal = dt, nn.isProfiler = pt, nn.isStrictMode = Zt, nn.isSuspense = Zn, nn.isValidElementType = ge, nn.typeOf = Ne;
  }()), nn;
}
var ZR;
function tO() {
  return ZR || (ZR = 1, process.env.NODE_ENV === "production" ? sy.exports = Jk() : sy.exports = eO()), sy.exports;
}
var Q0, JR;
function nO() {
  if (JR) return Q0;
  JR = 1;
  var m = tO(), S = {
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
  }, R = {
    name: !0,
    length: !0,
    prototype: !0,
    caller: !0,
    callee: !0,
    arguments: !0,
    arity: !0
  }, L = {
    $$typeof: !0,
    render: !0,
    defaultProps: !0,
    displayName: !0,
    propTypes: !0
  }, H = {
    $$typeof: !0,
    compare: !0,
    defaultProps: !0,
    displayName: !0,
    propTypes: !0,
    type: !0
  }, B = {};
  B[m.ForwardRef] = L, B[m.Memo] = H;
  function E(fe) {
    return m.isMemo(fe) ? H : B[fe.$$typeof] || S;
  }
  var ce = Object.defineProperty, W = Object.getOwnPropertyNames, q = Object.getOwnPropertySymbols, me = Object.getOwnPropertyDescriptor, K = Object.getPrototypeOf, oe = Object.prototype;
  function ne(fe, we, ze) {
    if (typeof we != "string") {
      if (oe) {
        var qe = K(we);
        qe && qe !== oe && ne(fe, qe, ze);
      }
      var _e = W(we);
      q && (_e = _e.concat(q(we)));
      for (var ge = E(fe), Ne = E(we), $ = 0; $ < _e.length; ++$) {
        var Le = _e[$];
        if (!R[Le] && !(ze && ze[Le]) && !(Ne && Ne[Le]) && !(ge && ge[Le])) {
          var de = me(we, Le);
          try {
            ce(fe, Le, de);
          } catch {
          }
        }
      }
    }
    return fe;
  }
  return Q0 = ne, Q0;
}
nO();
var rO = !0;
function aO(m, S, R) {
  var L = "";
  return R.split(" ").forEach(function(H) {
    m[H] !== void 0 ? S.push(m[H] + ";") : H && (L += H + " ");
  }), L;
}
var gT = function(S, R, L) {
  var H = S.key + "-" + R.name;
  // we only need to add the styles to the registered cache if the
  // class name could be used further down
  // the tree but if it's a string tag, we know it won't
  // so we don't have to add it to registered cache.
  // this improves memory usage since we can avoid storing the whole style string
  (L === !1 || // we need to always store it if we're in compat mode and
  // in node since emotion-server relies on whether a style is in
  // the registered cache to know whether a style is global or not
  // also, note that this check will be dead code eliminated in the browser
  rO === !1) && S.registered[H] === void 0 && (S.registered[H] = R.styles);
}, iO = function(S, R, L) {
  gT(S, R, L);
  var H = S.key + "-" + R.name;
  if (S.inserted[R.name] === void 0) {
    var B = R;
    do
      S.insert(R === B ? "." + H : "", B, S.sheet, !0), B = B.next;
    while (B !== void 0);
  }
};
function lO(m) {
  for (var S = 0, R, L = 0, H = m.length; H >= 4; ++L, H -= 4)
    R = m.charCodeAt(L) & 255 | (m.charCodeAt(++L) & 255) << 8 | (m.charCodeAt(++L) & 255) << 16 | (m.charCodeAt(++L) & 255) << 24, R = /* Math.imul(k, m): */
    (R & 65535) * 1540483477 + ((R >>> 16) * 59797 << 16), R ^= /* k >>> r: */
    R >>> 24, S = /* Math.imul(k, m): */
    (R & 65535) * 1540483477 + ((R >>> 16) * 59797 << 16) ^ /* Math.imul(h, m): */
    (S & 65535) * 1540483477 + ((S >>> 16) * 59797 << 16);
  switch (H) {
    case 3:
      S ^= (m.charCodeAt(L + 2) & 255) << 16;
    case 2:
      S ^= (m.charCodeAt(L + 1) & 255) << 8;
    case 1:
      S ^= m.charCodeAt(L) & 255, S = /* Math.imul(h, m): */
      (S & 65535) * 1540483477 + ((S >>> 16) * 59797 << 16);
  }
  return S ^= S >>> 13, S = /* Math.imul(h, m): */
  (S & 65535) * 1540483477 + ((S >>> 16) * 59797 << 16), ((S ^ S >>> 15) >>> 0).toString(36);
}
var uO = {
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
}, oO = !1, sO = /[A-Z]|^ms/g, cO = /_EMO_([^_]+?)_([^]*?)_EMO_/g, ST = function(S) {
  return S.charCodeAt(1) === 45;
}, eT = function(S) {
  return S != null && typeof S != "boolean";
}, G0 = /* @__PURE__ */ Ik(function(m) {
  return ST(m) ? m : m.replace(sO, "-$&").toLowerCase();
}), tT = function(S, R) {
  switch (S) {
    case "animation":
    case "animationName":
      if (typeof R == "string")
        return R.replace(cO, function(L, H, B) {
          return nu = {
            name: H,
            styles: B,
            next: nu
          }, H;
        });
  }
  return uO[S] !== 1 && !ST(S) && typeof R == "number" && R !== 0 ? R + "px" : R;
}, fO = "Component selectors can only be used in conjunction with @emotion/babel-plugin, the swc Emotion plugin, or another Emotion-aware compiler transform.";
function vv(m, S, R) {
  if (R == null)
    return "";
  var L = R;
  if (L.__emotion_styles !== void 0)
    return L;
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
      var B = R;
      if (B.styles !== void 0) {
        var E = B.next;
        if (E !== void 0)
          for (; E !== void 0; )
            nu = {
              name: E.name,
              styles: E.styles,
              next: nu
            }, E = E.next;
        var ce = B.styles + ";";
        return ce;
      }
      return dO(m, S, R);
    }
    case "function": {
      if (m !== void 0) {
        var W = nu, q = R(m);
        return nu = W, vv(m, S, q);
      }
      break;
    }
  }
  var me = R;
  return me;
}
function dO(m, S, R) {
  var L = "";
  if (Array.isArray(R))
    for (var H = 0; H < R.length; H++)
      L += vv(m, S, R[H]) + ";";
  else
    for (var B in R) {
      var E = R[B];
      if (typeof E != "object") {
        var ce = E;
        eT(ce) && (L += G0(B) + ":" + tT(B, ce) + ";");
      } else {
        if (B === "NO_COMPONENT_SELECTOR" && oO)
          throw new Error(fO);
        if (Array.isArray(E) && typeof E[0] == "string" && S == null)
          for (var W = 0; W < E.length; W++)
            eT(E[W]) && (L += G0(B) + ":" + tT(B, E[W]) + ";");
        else {
          var q = vv(m, S, E);
          switch (B) {
            case "animation":
            case "animationName": {
              L += G0(B) + ":" + q + ";";
              break;
            }
            default:
              L += B + "{" + q + "}";
          }
        }
      }
    }
  return L;
}
var nT = /label:\s*([^\s;{]+)\s*(;|$)/g, nu;
function ET(m, S, R) {
  if (m.length === 1 && typeof m[0] == "object" && m[0] !== null && m[0].styles !== void 0)
    return m[0];
  var L = !0, H = "";
  nu = void 0;
  var B = m[0];
  if (B == null || B.raw === void 0)
    L = !1, H += vv(R, S, B);
  else {
    var E = B;
    H += E[0];
  }
  for (var ce = 1; ce < m.length; ce++)
    if (H += vv(R, S, m[ce]), L) {
      var W = B;
      H += W[ce];
    }
  nT.lastIndex = 0;
  for (var q = "", me; (me = nT.exec(H)) !== null; )
    q += "-" + me[1];
  var K = lO(H) + q;
  return {
    name: K,
    styles: H,
    next: nu
  };
}
var pO = function(S) {
  return S();
}, vO = WR.useInsertionEffect ? WR.useInsertionEffect : !1, hO = vO || pO, mO = !1, CT = /* @__PURE__ */ Hi.createContext(
  // we're doing this to avoid preconstruct's dead code elimination in this one case
  // because this module is primarily intended for the browser and node
  // but it's also required in react native and similar environments sometimes
  // and we could have a special build just for that
  // but this is much easier and the native packages
  // might use a different theme context in the future anyway
  typeof HTMLElement < "u" ? /* @__PURE__ */ Zk({
    key: "css"
  }) : null
);
CT.Provider;
var yO = function(S) {
  return /* @__PURE__ */ Hi.forwardRef(function(R, L) {
    var H = Hi.useContext(CT);
    return S(R, H, L);
  });
}, gO = /* @__PURE__ */ Hi.createContext({}), Ry = {}.hasOwnProperty, eE = "__EMOTION_TYPE_PLEASE_DO_NOT_USE__", RT = function(S, R) {
  var L = {};
  for (var H in R)
    Ry.call(R, H) && (L[H] = R[H]);
  return L[eE] = S, L;
}, SO = function(S) {
  var R = S.cache, L = S.serialized, H = S.isStringTag;
  return gT(R, L, H), hO(function() {
    return iO(R, L, H);
  }), null;
}, EO = /* @__PURE__ */ yO(
  /* <any, any> */
  function(m, S, R) {
    var L = m.css;
    typeof L == "string" && S.registered[L] !== void 0 && (L = S.registered[L]);
    var H = m[eE], B = [L], E = "";
    typeof m.className == "string" ? E = aO(S.registered, B, m.className) : m.className != null && (E = m.className + " ");
    var ce = ET(B, void 0, Hi.useContext(gO));
    E += S.key + "-" + ce.name;
    var W = {};
    for (var q in m)
      Ry.call(m, q) && q !== "css" && q !== eE && !mO && (W[q] = m[q]);
    return W.className = E, R && (W.ref = R), /* @__PURE__ */ Hi.createElement(Hi.Fragment, null, /* @__PURE__ */ Hi.createElement(SO, {
      cache: S,
      serialized: ce,
      isStringTag: typeof H == "string"
    }), /* @__PURE__ */ Hi.createElement(H, W));
  }
), TT = EO;
function ru(m, S, R) {
  return Ry.call(S, "css") ? my.jsx(TT, RT(m, S), R) : my.jsx(m, S, R);
}
function CO(m, S, R) {
  return Ry.call(S, "css") ? my.jsxs(TT, RT(m, S), R) : my.jsxs(m, S, R);
}
function RO({ search: m, fn: S }) {
  return /* @__PURE__ */ ru("div", { css: bT, children: /* @__PURE__ */ ru("img", { src: m(S) }) });
}
function TO({}) {
  return /* @__PURE__ */ ru("div", { css: bT, children: /* @__PURE__ */ ru("span", {}) });
}
const rT = (m) => {
  let S;
  const R = /* @__PURE__ */ new Set(), L = (q, me) => {
    const K = typeof q == "function" ? q(S) : q;
    if (!Object.is(K, S)) {
      const oe = S;
      S = me ?? (typeof K != "object" || K === null) ? K : Object.assign({}, S, K), R.forEach((ne) => ne(S, oe));
    }
  }, H = () => S, ce = { setState: L, getState: H, getInitialState: () => W, subscribe: (q) => (R.add(q), () => R.delete(q)) }, W = S = m(L, H, ce);
  return ce;
}, wO = (m) => m ? rT(m) : rT, bO = (m) => m;
function xO(m, S = bO) {
  const R = X0.useSyncExternalStore(
    m.subscribe,
    () => S(m.getState()),
    () => S(m.getInitialState())
  );
  return X0.useDebugValue(R), R;
}
const _O = (m) => {
  const S = wO(m), R = (L) => xO(S, L);
  return Object.assign(R, S), R;
}, DO = (m) => _O, cy = DO()((m) => ({
  happys: 10,
  happysUp: () => m((S) => ({
    happys: S.happys + 1
  })),
  aLay: [],
  addLayer: (S) => m((R) => ({
    aLay: [...R.aLay, S]
  }))
}));
var td = {}, fy = { exports: {} }, ri = {}, dy = { exports: {} }, q0 = {};
/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var aT;
function kO() {
  return aT || (aT = 1, function(m) {
    function S(ie, Ue) {
      var pe = ie.length;
      ie.push(Ue);
      e: for (; 0 < pe; ) {
        var O = pe - 1 >>> 1, Q = ie[O];
        if (0 < H(Q, Ue)) ie[O] = Ue, ie[pe] = Q, pe = O;
        else break e;
      }
    }
    function R(ie) {
      return ie.length === 0 ? null : ie[0];
    }
    function L(ie) {
      if (ie.length === 0) return null;
      var Ue = ie[0], pe = ie.pop();
      if (pe !== Ue) {
        ie[0] = pe;
        e: for (var O = 0, Q = ie.length, We = Q >>> 1; O < We; ) {
          var Je = 2 * (O + 1) - 1, ct = ie[Je], ot = Je + 1, St = ie[ot];
          if (0 > H(ct, pe)) ot < Q && 0 > H(St, ct) ? (ie[O] = St, ie[ot] = pe, O = ot) : (ie[O] = ct, ie[Je] = pe, O = Je);
          else if (ot < Q && 0 > H(St, pe)) ie[O] = St, ie[ot] = pe, O = ot;
          else break e;
        }
      }
      return Ue;
    }
    function H(ie, Ue) {
      var pe = ie.sortIndex - Ue.sortIndex;
      return pe !== 0 ? pe : ie.id - Ue.id;
    }
    if (typeof performance == "object" && typeof performance.now == "function") {
      var B = performance;
      m.unstable_now = function() {
        return B.now();
      };
    } else {
      var E = Date, ce = E.now();
      m.unstable_now = function() {
        return E.now() - ce;
      };
    }
    var W = [], q = [], me = 1, K = null, oe = 3, ne = !1, fe = !1, we = !1, ze = typeof setTimeout == "function" ? setTimeout : null, qe = typeof clearTimeout == "function" ? clearTimeout : null, _e = typeof setImmediate < "u" ? setImmediate : null;
    typeof navigator < "u" && navigator.scheduling !== void 0 && navigator.scheduling.isInputPending !== void 0 && navigator.scheduling.isInputPending.bind(navigator.scheduling);
    function ge(ie) {
      for (var Ue = R(q); Ue !== null; ) {
        if (Ue.callback === null) L(q);
        else if (Ue.startTime <= ie) L(q), Ue.sortIndex = Ue.expirationTime, S(W, Ue);
        else break;
        Ue = R(q);
      }
    }
    function Ne(ie) {
      if (we = !1, ge(ie), !fe) if (R(W) !== null) fe = !0, Tt($);
      else {
        var Ue = R(q);
        Ue !== null && De(Ne, Ue.startTime - ie);
      }
    }
    function $(ie, Ue) {
      fe = !1, we && (we = !1, qe(Xt), Xt = -1), ne = !0;
      var pe = oe;
      try {
        for (ge(Ue), K = R(W); K !== null && (!(K.expirationTime > Ue) || ie && !Ot()); ) {
          var O = K.callback;
          if (typeof O == "function") {
            K.callback = null, oe = K.priorityLevel;
            var Q = O(K.expirationTime <= Ue);
            Ue = m.unstable_now(), typeof Q == "function" ? K.callback = Q : K === R(W) && L(W), ge(Ue);
          } else L(W);
          K = R(W);
        }
        if (K !== null) var We = !0;
        else {
          var Je = R(q);
          Je !== null && De(Ne, Je.startTime - Ue), We = !1;
        }
        return We;
      } finally {
        K = null, oe = pe, ne = !1;
      }
    }
    var Le = !1, de = null, Xt = -1, En = 5, Ht = -1;
    function Ot() {
      return !(m.unstable_now() - Ht < En);
    }
    function mn() {
      if (de !== null) {
        var ie = m.unstable_now();
        Ht = ie;
        var Ue = !0;
        try {
          Ue = de(!0, ie);
        } finally {
          Ue ? Ye() : (Le = !1, de = null);
        }
      } else Le = !1;
    }
    var Ye;
    if (typeof _e == "function") Ye = function() {
      _e(mn);
    };
    else if (typeof MessageChannel < "u") {
      var lt = new MessageChannel(), Lt = lt.port2;
      lt.port1.onmessage = mn, Ye = function() {
        Lt.postMessage(null);
      };
    } else Ye = function() {
      ze(mn, 0);
    };
    function Tt(ie) {
      de = ie, Le || (Le = !0, Ye());
    }
    function De(ie, Ue) {
      Xt = ze(function() {
        ie(m.unstable_now());
      }, Ue);
    }
    m.unstable_IdlePriority = 5, m.unstable_ImmediatePriority = 1, m.unstable_LowPriority = 4, m.unstable_NormalPriority = 3, m.unstable_Profiling = null, m.unstable_UserBlockingPriority = 2, m.unstable_cancelCallback = function(ie) {
      ie.callback = null;
    }, m.unstable_continueExecution = function() {
      fe || ne || (fe = !0, Tt($));
    }, m.unstable_forceFrameRate = function(ie) {
      0 > ie || 125 < ie ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : En = 0 < ie ? Math.floor(1e3 / ie) : 5;
    }, m.unstable_getCurrentPriorityLevel = function() {
      return oe;
    }, m.unstable_getFirstCallbackNode = function() {
      return R(W);
    }, m.unstable_next = function(ie) {
      switch (oe) {
        case 1:
        case 2:
        case 3:
          var Ue = 3;
          break;
        default:
          Ue = oe;
      }
      var pe = oe;
      oe = Ue;
      try {
        return ie();
      } finally {
        oe = pe;
      }
    }, m.unstable_pauseExecution = function() {
    }, m.unstable_requestPaint = function() {
    }, m.unstable_runWithPriority = function(ie, Ue) {
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
      var pe = oe;
      oe = ie;
      try {
        return Ue();
      } finally {
        oe = pe;
      }
    }, m.unstable_scheduleCallback = function(ie, Ue, pe) {
      var O = m.unstable_now();
      switch (typeof pe == "object" && pe !== null ? (pe = pe.delay, pe = typeof pe == "number" && 0 < pe ? O + pe : O) : pe = O, ie) {
        case 1:
          var Q = -1;
          break;
        case 2:
          Q = 250;
          break;
        case 5:
          Q = 1073741823;
          break;
        case 4:
          Q = 1e4;
          break;
        default:
          Q = 5e3;
      }
      return Q = pe + Q, ie = { id: me++, callback: Ue, priorityLevel: ie, startTime: pe, expirationTime: Q, sortIndex: -1 }, pe > O ? (ie.sortIndex = pe, S(q, ie), R(W) === null && ie === R(q) && (we ? (qe(Xt), Xt = -1) : we = !0, De(Ne, pe - O))) : (ie.sortIndex = Q, S(W, ie), fe || ne || (fe = !0, Tt($))), ie;
    }, m.unstable_shouldYield = Ot, m.unstable_wrapCallback = function(ie) {
      var Ue = oe;
      return function() {
        var pe = oe;
        oe = Ue;
        try {
          return ie.apply(this, arguments);
        } finally {
          oe = pe;
        }
      };
    };
  }(q0)), q0;
}
var K0 = {};
/**
 * @license React
 * scheduler.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var iT;
function OO() {
  return iT || (iT = 1, function(m) {
    process.env.NODE_ENV !== "production" && function() {
      typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(new Error());
      var S = !1, R = !1, L = 5;
      function H(se, $e) {
        var vt = se.length;
        se.push($e), ce(se, $e, vt);
      }
      function B(se) {
        return se.length === 0 ? null : se[0];
      }
      function E(se) {
        if (se.length === 0)
          return null;
        var $e = se[0], vt = se.pop();
        return vt !== $e && (se[0] = vt, W(se, vt, 0)), $e;
      }
      function ce(se, $e, vt) {
        for (var jt = vt; jt > 0; ) {
          var Vt = jt - 1 >>> 1, zn = se[Vt];
          if (q(zn, $e) > 0)
            se[Vt] = $e, se[jt] = zn, jt = Vt;
          else
            return;
        }
      }
      function W(se, $e, vt) {
        for (var jt = vt, Vt = se.length, zn = Vt >>> 1; jt < zn; ) {
          var Tn = (jt + 1) * 2 - 1, Tr = se[Tn], Qt = Tn + 1, Mr = se[Qt];
          if (q(Tr, $e) < 0)
            Qt < Vt && q(Mr, Tr) < 0 ? (se[jt] = Mr, se[Qt] = $e, jt = Qt) : (se[jt] = Tr, se[Tn] = $e, jt = Tn);
          else if (Qt < Vt && q(Mr, $e) < 0)
            se[jt] = Mr, se[Qt] = $e, jt = Qt;
          else
            return;
        }
      }
      function q(se, $e) {
        var vt = se.sortIndex - $e.sortIndex;
        return vt !== 0 ? vt : se.id - $e.id;
      }
      var me = 1, K = 2, oe = 3, ne = 4, fe = 5;
      function we(se, $e) {
      }
      var ze = typeof performance == "object" && typeof performance.now == "function";
      if (ze) {
        var qe = performance;
        m.unstable_now = function() {
          return qe.now();
        };
      } else {
        var _e = Date, ge = _e.now();
        m.unstable_now = function() {
          return _e.now() - ge;
        };
      }
      var Ne = 1073741823, $ = -1, Le = 250, de = 5e3, Xt = 1e4, En = Ne, Ht = [], Ot = [], mn = 1, Ye = null, lt = oe, Lt = !1, Tt = !1, De = !1, ie = typeof setTimeout == "function" ? setTimeout : null, Ue = typeof clearTimeout == "function" ? clearTimeout : null, pe = typeof setImmediate < "u" ? setImmediate : null;
      typeof navigator < "u" && navigator.scheduling !== void 0 && navigator.scheduling.isInputPending !== void 0 && navigator.scheduling.isInputPending.bind(navigator.scheduling);
      function O(se) {
        for (var $e = B(Ot); $e !== null; ) {
          if ($e.callback === null)
            E(Ot);
          else if ($e.startTime <= se)
            E(Ot), $e.sortIndex = $e.expirationTime, H(Ht, $e);
          else
            return;
          $e = B(Ot);
        }
      }
      function Q(se) {
        if (De = !1, O(se), !Tt)
          if (B(Ht) !== null)
            Tt = !0, Xr(We);
          else {
            var $e = B(Ot);
            $e !== null && Rn(Q, $e.startTime - se);
          }
      }
      function We(se, $e) {
        Tt = !1, De && (De = !1, Or()), Lt = !0;
        var vt = lt;
        try {
          var jt;
          if (!R) return Je(se, $e);
        } finally {
          Ye = null, lt = vt, Lt = !1;
        }
      }
      function Je(se, $e) {
        var vt = $e;
        for (O(vt), Ye = B(Ht); Ye !== null && !S && !(Ye.expirationTime > vt && (!se || qr())); ) {
          var jt = Ye.callback;
          if (typeof jt == "function") {
            Ye.callback = null, lt = Ye.priorityLevel;
            var Vt = Ye.expirationTime <= vt, zn = jt(Vt);
            vt = m.unstable_now(), typeof zn == "function" ? Ye.callback = zn : Ye === B(Ht) && E(Ht), O(vt);
          } else
            E(Ht);
          Ye = B(Ht);
        }
        if (Ye !== null)
          return !0;
        var Tn = B(Ot);
        return Tn !== null && Rn(Q, Tn.startTime - vt), !1;
      }
      function ct(se, $e) {
        switch (se) {
          case me:
          case K:
          case oe:
          case ne:
          case fe:
            break;
          default:
            se = oe;
        }
        var vt = lt;
        lt = se;
        try {
          return $e();
        } finally {
          lt = vt;
        }
      }
      function ot(se) {
        var $e;
        switch (lt) {
          case me:
          case K:
          case oe:
            $e = oe;
            break;
          default:
            $e = lt;
            break;
        }
        var vt = lt;
        lt = $e;
        try {
          return se();
        } finally {
          lt = vt;
        }
      }
      function St(se) {
        var $e = lt;
        return function() {
          var vt = lt;
          lt = $e;
          try {
            return se.apply(this, arguments);
          } finally {
            lt = vt;
          }
        };
      }
      function dt(se, $e, vt) {
        var jt = m.unstable_now(), Vt;
        if (typeof vt == "object" && vt !== null) {
          var zn = vt.delay;
          typeof zn == "number" && zn > 0 ? Vt = jt + zn : Vt = jt;
        } else
          Vt = jt;
        var Tn;
        switch (se) {
          case me:
            Tn = $;
            break;
          case K:
            Tn = Le;
            break;
          case fe:
            Tn = En;
            break;
          case ne:
            Tn = Xt;
            break;
          case oe:
          default:
            Tn = de;
            break;
        }
        var Tr = Vt + Tn, Qt = {
          id: mn++,
          callback: $e,
          priorityLevel: se,
          startTime: Vt,
          expirationTime: Tr,
          sortIndex: -1
        };
        return Vt > jt ? (Qt.sortIndex = Vt, H(Ot, Qt), B(Ht) === null && Qt === B(Ot) && (De ? Or() : De = !0, Rn(Q, Vt - jt))) : (Qt.sortIndex = Tr, H(Ht, Qt), !Tt && !Lt && (Tt = !0, Xr(We))), Qt;
      }
      function pt() {
      }
      function Zt() {
        !Tt && !Lt && (Tt = !0, Xr(We));
      }
      function Zn() {
        return B(Ht);
      }
      function be(se) {
        se.callback = null;
      }
      function rn() {
        return lt;
      }
      var Cn = !1, Dn = null, Hn = -1, An = L, Gr = -1;
      function qr() {
        var se = m.unstable_now() - Gr;
        return !(se < An);
      }
      function Jn() {
      }
      function Cr(se) {
        if (se < 0 || se > 125) {
          console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported");
          return;
        }
        se > 0 ? An = Math.floor(1e3 / se) : An = L;
      }
      var Kr = function() {
        if (Dn !== null) {
          var se = m.unstable_now();
          Gr = se;
          var $e = !0, vt = !0;
          try {
            vt = Dn($e, se);
          } finally {
            vt ? Rr() : (Cn = !1, Dn = null);
          }
        } else
          Cn = !1;
      }, Rr;
      if (typeof pe == "function")
        Rr = function() {
          pe(Kr);
        };
      else if (typeof MessageChannel < "u") {
        var ga = new MessageChannel(), sr = ga.port2;
        ga.port1.onmessage = Kr, Rr = function() {
          sr.postMessage(null);
        };
      } else
        Rr = function() {
          ie(Kr, 0);
        };
      function Xr(se) {
        Dn = se, Cn || (Cn = !0, Rr());
      }
      function Rn(se, $e) {
        Hn = ie(function() {
          se(m.unstable_now());
        }, $e);
      }
      function Or() {
        Ue(Hn), Hn = -1;
      }
      var Si = Jn, Sa = null;
      m.unstable_IdlePriority = fe, m.unstable_ImmediatePriority = me, m.unstable_LowPriority = ne, m.unstable_NormalPriority = oe, m.unstable_Profiling = Sa, m.unstable_UserBlockingPriority = K, m.unstable_cancelCallback = be, m.unstable_continueExecution = Zt, m.unstable_forceFrameRate = Cr, m.unstable_getCurrentPriorityLevel = rn, m.unstable_getFirstCallbackNode = Zn, m.unstable_next = ot, m.unstable_pauseExecution = pt, m.unstable_requestPaint = Si, m.unstable_runWithPriority = ct, m.unstable_scheduleCallback = dt, m.unstable_shouldYield = qr, m.unstable_wrapCallback = St, typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error());
    }();
  }(K0)), K0;
}
var lT;
function wT() {
  return lT || (lT = 1, process.env.NODE_ENV === "production" ? dy.exports = kO() : dy.exports = OO()), dy.exports;
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
var uT;
function MO() {
  if (uT) return ri;
  uT = 1;
  var m = hv(), S = wT();
  function R(n) {
    for (var r = "https://reactjs.org/docs/error-decoder.html?invariant=" + n, l = 1; l < arguments.length; l++) r += "&args[]=" + encodeURIComponent(arguments[l]);
    return "Minified React error #" + n + "; visit " + r + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  var L = /* @__PURE__ */ new Set(), H = {};
  function B(n, r) {
    E(n, r), E(n + "Capture", r);
  }
  function E(n, r) {
    for (H[n] = r, n = 0; n < r.length; n++) L.add(r[n]);
  }
  var ce = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), W = Object.prototype.hasOwnProperty, q = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/, me = {}, K = {};
  function oe(n) {
    return W.call(K, n) ? !0 : W.call(me, n) ? !1 : q.test(n) ? K[n] = !0 : (me[n] = !0, !1);
  }
  function ne(n, r, l, o) {
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
  function fe(n, r, l, o) {
    if (r === null || typeof r > "u" || ne(n, r, l, o)) return !0;
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
  function we(n, r, l, o, c, d, y) {
    this.acceptsBooleans = r === 2 || r === 3 || r === 4, this.attributeName = o, this.attributeNamespace = c, this.mustUseProperty = l, this.propertyName = n, this.type = r, this.sanitizeURL = d, this.removeEmptyString = y;
  }
  var ze = {};
  "children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(n) {
    ze[n] = new we(n, 0, !1, n, null, !1, !1);
  }), [["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function(n) {
    var r = n[0];
    ze[r] = new we(r, 1, !1, n[1], null, !1, !1);
  }), ["contentEditable", "draggable", "spellCheck", "value"].forEach(function(n) {
    ze[n] = new we(n, 2, !1, n.toLowerCase(), null, !1, !1);
  }), ["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function(n) {
    ze[n] = new we(n, 2, !1, n, null, !1, !1);
  }), "allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(n) {
    ze[n] = new we(n, 3, !1, n.toLowerCase(), null, !1, !1);
  }), ["checked", "multiple", "muted", "selected"].forEach(function(n) {
    ze[n] = new we(n, 3, !0, n, null, !1, !1);
  }), ["capture", "download"].forEach(function(n) {
    ze[n] = new we(n, 4, !1, n, null, !1, !1);
  }), ["cols", "rows", "size", "span"].forEach(function(n) {
    ze[n] = new we(n, 6, !1, n, null, !1, !1);
  }), ["rowSpan", "start"].forEach(function(n) {
    ze[n] = new we(n, 5, !1, n.toLowerCase(), null, !1, !1);
  });
  var qe = /[\-:]([a-z])/g;
  function _e(n) {
    return n[1].toUpperCase();
  }
  "accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(n) {
    var r = n.replace(
      qe,
      _e
    );
    ze[r] = new we(r, 1, !1, n, null, !1, !1);
  }), "xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(n) {
    var r = n.replace(qe, _e);
    ze[r] = new we(r, 1, !1, n, "http://www.w3.org/1999/xlink", !1, !1);
  }), ["xml:base", "xml:lang", "xml:space"].forEach(function(n) {
    var r = n.replace(qe, _e);
    ze[r] = new we(r, 1, !1, n, "http://www.w3.org/XML/1998/namespace", !1, !1);
  }), ["tabIndex", "crossOrigin"].forEach(function(n) {
    ze[n] = new we(n, 1, !1, n.toLowerCase(), null, !1, !1);
  }), ze.xlinkHref = new we("xlinkHref", 1, !1, "xlink:href", "http://www.w3.org/1999/xlink", !0, !1), ["src", "href", "action", "formAction"].forEach(function(n) {
    ze[n] = new we(n, 1, !1, n.toLowerCase(), null, !0, !0);
  });
  function ge(n, r, l, o) {
    var c = ze.hasOwnProperty(r) ? ze[r] : null;
    (c !== null ? c.type !== 0 : o || !(2 < r.length) || r[0] !== "o" && r[0] !== "O" || r[1] !== "n" && r[1] !== "N") && (fe(r, l, c, o) && (l = null), o || c === null ? oe(r) && (l === null ? n.removeAttribute(r) : n.setAttribute(r, "" + l)) : c.mustUseProperty ? n[c.propertyName] = l === null ? c.type === 3 ? !1 : "" : l : (r = c.attributeName, o = c.attributeNamespace, l === null ? n.removeAttribute(r) : (c = c.type, l = c === 3 || c === 4 && l === !0 ? "" : "" + l, o ? n.setAttributeNS(o, r, l) : n.setAttribute(r, l))));
  }
  var Ne = m.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, $ = Symbol.for("react.element"), Le = Symbol.for("react.portal"), de = Symbol.for("react.fragment"), Xt = Symbol.for("react.strict_mode"), En = Symbol.for("react.profiler"), Ht = Symbol.for("react.provider"), Ot = Symbol.for("react.context"), mn = Symbol.for("react.forward_ref"), Ye = Symbol.for("react.suspense"), lt = Symbol.for("react.suspense_list"), Lt = Symbol.for("react.memo"), Tt = Symbol.for("react.lazy"), De = Symbol.for("react.offscreen"), ie = Symbol.iterator;
  function Ue(n) {
    return n === null || typeof n != "object" ? null : (n = ie && n[ie] || n["@@iterator"], typeof n == "function" ? n : null);
  }
  var pe = Object.assign, O;
  function Q(n) {
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
  function Je(n, r) {
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
`), y = c.length - 1, T = d.length - 1; 1 <= y && 0 <= T && c[y] !== d[T]; ) T--;
        for (; 1 <= y && 0 <= T; y--, T--) if (c[y] !== d[T]) {
          if (y !== 1 || T !== 1)
            do
              if (y--, T--, 0 > T || c[y] !== d[T]) {
                var x = `
` + c[y].replace(" at new ", " at ");
                return n.displayName && x.includes("<anonymous>") && (x = x.replace("<anonymous>", n.displayName)), x;
              }
            while (1 <= y && 0 <= T);
          break;
        }
      }
    } finally {
      We = !1, Error.prepareStackTrace = l;
    }
    return (n = n ? n.displayName || n.name : "") ? Q(n) : "";
  }
  function ct(n) {
    switch (n.tag) {
      case 5:
        return Q(n.type);
      case 16:
        return Q("Lazy");
      case 13:
        return Q("Suspense");
      case 19:
        return Q("SuspenseList");
      case 0:
      case 2:
      case 15:
        return n = Je(n.type, !1), n;
      case 11:
        return n = Je(n.type.render, !1), n;
      case 1:
        return n = Je(n.type, !0), n;
      default:
        return "";
    }
  }
  function ot(n) {
    if (n == null) return null;
    if (typeof n == "function") return n.displayName || n.name || null;
    if (typeof n == "string") return n;
    switch (n) {
      case de:
        return "Fragment";
      case Le:
        return "Portal";
      case En:
        return "Profiler";
      case Xt:
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
        return r === Xt ? "StrictMode" : "Mode";
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
  function Zt(n) {
    var r = pt(n) ? "checked" : "value", l = Object.getOwnPropertyDescriptor(n.constructor.prototype, r), o = "" + n[r];
    if (!n.hasOwnProperty(r) && typeof l < "u" && typeof l.get == "function" && typeof l.set == "function") {
      var c = l.get, d = l.set;
      return Object.defineProperty(n, r, { configurable: !0, get: function() {
        return c.call(this);
      }, set: function(y) {
        o = "" + y, d.call(this, y);
      } }), Object.defineProperty(n, r, { enumerable: l.enumerable }), { getValue: function() {
        return o;
      }, setValue: function(y) {
        o = "" + y;
      }, stopTracking: function() {
        n._valueTracker = null, delete n[r];
      } };
    }
  }
  function Zn(n) {
    n._valueTracker || (n._valueTracker = Zt(n));
  }
  function be(n) {
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
    return pe({}, r, { defaultChecked: void 0, defaultValue: void 0, value: void 0, checked: l ?? n._wrapperState.initialChecked });
  }
  function Dn(n, r) {
    var l = r.defaultValue == null ? "" : r.defaultValue, o = r.checked != null ? r.checked : r.defaultChecked;
    l = dt(r.value != null ? r.value : l), n._wrapperState = { initialChecked: o, initialValue: l, controlled: r.type === "checkbox" || r.type === "radio" ? r.checked != null : r.value != null };
  }
  function Hn(n, r) {
    r = r.checked, r != null && ge(n, "checked", r, !1);
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
    return pe({}, r, { value: void 0, defaultValue: void 0, children: "" + n._wrapperState.initialValue });
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
  function ga(n, r) {
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
  var Or, Si = function(n) {
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
  function Sa(n, r) {
    if (r) {
      var l = n.firstChild;
      if (l && l === n.lastChild && l.nodeType === 3) {
        l.nodeValue = r;
        return;
      }
    }
    n.textContent = r;
  }
  var se = {
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
  }, $e = ["Webkit", "ms", "Moz", "O"];
  Object.keys(se).forEach(function(n) {
    $e.forEach(function(r) {
      r = r + n.charAt(0).toUpperCase() + n.substring(1), se[r] = se[n];
    });
  });
  function vt(n, r, l) {
    return r == null || typeof r == "boolean" || r === "" ? "" : l || typeof r != "number" || r === 0 || se.hasOwnProperty(n) && se[n] ? ("" + r).trim() : r + "px";
  }
  function jt(n, r) {
    n = n.style;
    for (var l in r) if (r.hasOwnProperty(l)) {
      var o = l.indexOf("--") === 0, c = vt(l, r[l], o);
      l === "float" && (l = "cssFloat"), o ? n.setProperty(l, c) : n[l] = c;
    }
  }
  var Vt = pe({ menuitem: !0 }, { area: !0, base: !0, br: !0, col: !0, embed: !0, hr: !0, img: !0, input: !0, keygen: !0, link: !0, meta: !0, param: !0, source: !0, track: !0, wbr: !0 });
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
  function li(n) {
    if (n = Cs(n)) {
      if (typeof Mr != "function") throw Error(R(280));
      var r = n.stateNode;
      r && (r = Ie(r), Mr(n.stateNode, n.type, r));
    }
  }
  function Aa(n) {
    $t ? Bt ? Bt.push(n) : Bt = [n] : $t = n;
  }
  function yl() {
    if ($t) {
      var n = $t, r = Bt;
      if (Bt = $t = null, li(n), r) for (n = 0; n < r.length; n++) li(r[n]);
    }
  }
  function iu(n, r) {
    return n(r);
  }
  function Yu() {
  }
  var Vi = !1;
  function gl(n, r, l) {
    if (Vi) return n(r, l);
    Vi = !0;
    try {
      return iu(n, r, l);
    } finally {
      Vi = !1, ($t !== null || Bt !== null) && (Yu(), yl());
    }
  }
  function Ea(n, r) {
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
  var Ei = !1;
  if (ce) try {
    var Ca = {};
    Object.defineProperty(Ca, "passive", { get: function() {
      Ei = !0;
    } }), window.addEventListener("test", Ca, Ca), window.removeEventListener("test", Ca, Ca);
  } catch {
    Ei = !1;
  }
  function ui(n, r, l, o, c, d, y, T, x) {
    var j = Array.prototype.slice.call(arguments, 3);
    try {
      r.apply(l, j);
    } catch (ee) {
      this.onError(ee);
    }
  }
  var Lr = !1, Ra = null, Ci = !1, Ri = null, b = { onError: function(n) {
    Lr = !0, Ra = n;
  } };
  function J(n, r, l, o, c, d, y, T, x) {
    Lr = !1, Ra = null, ui.apply(b, arguments);
  }
  function ae(n, r, l, o, c, d, y, T, x) {
    if (J.apply(this, arguments), Lr) {
      if (Lr) {
        var j = Ra;
        Lr = !1, Ra = null;
      } else throw Error(R(198));
      Ci || (Ci = !0, Ri = j);
    }
  }
  function Pe(n) {
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
    if (Pe(n) !== n) throw Error(R(188));
  }
  function Ke(n) {
    var r = n.alternate;
    if (!r) {
      if (r = Pe(n), r === null) throw Error(R(188));
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
        for (var y = !1, T = c.child; T; ) {
          if (T === l) {
            y = !0, l = c, o = d;
            break;
          }
          if (T === o) {
            y = !0, o = c, l = d;
            break;
          }
          T = T.sibling;
        }
        if (!y) {
          for (T = d.child; T; ) {
            if (T === l) {
              y = !0, l = d, o = c;
              break;
            }
            if (T === o) {
              y = !0, o = d, l = c;
              break;
            }
            T = T.sibling;
          }
          if (!y) throw Error(R(189));
        }
      }
      if (l.alternate !== o) throw Error(R(190));
    }
    if (l.tag !== 3) throw Error(R(188));
    return l.stateNode.current === l ? n : r;
  }
  function ht(n) {
    return n = Ke(n), n !== null ? Vn(n) : null;
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
  var an = S.unstable_scheduleCallback, fn = S.unstable_cancelCallback, wr = S.unstable_shouldYield, Ti = S.unstable_requestPaint, Nt = S.unstable_now, er = S.unstable_getCurrentPriorityLevel, Nr = S.unstable_ImmediatePriority, mt = S.unstable_UserBlockingPriority, za = S.unstable_NormalPriority, Sl = S.unstable_LowPriority, Wu = S.unstable_IdlePriority, El = null, Zr = null;
  function as(n) {
    if (Zr && typeof Zr.onCommitFiberRoot == "function") try {
      Zr.onCommitFiberRoot(El, n, void 0, (n.current.flags & 128) === 128);
    } catch {
    }
  }
  var Ar = Math.clz32 ? Math.clz32 : cc, is = Math.log, ls = Math.LN2;
  function cc(n) {
    return n >>>= 0, n === 0 ? 32 : 31 - (is(n) / ls | 0) | 0;
  }
  var Qu = 64, Cl = 4194304;
  function oi(n) {
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
    var o = 0, c = n.suspendedLanes, d = n.pingedLanes, y = l & 268435455;
    if (y !== 0) {
      var T = y & ~c;
      T !== 0 ? o = oi(T) : (d &= y, d !== 0 && (o = oi(d)));
    } else y = l & ~c, y !== 0 ? o = oi(y) : d !== 0 && (o = oi(d));
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
      var y = 31 - Ar(d), T = 1 << y, x = c[y];
      x === -1 ? (!(T & l) || T & o) && (c[y] = Rl(T, r)) : x <= r && (n.expiredLanes |= T), d &= ~T;
    }
  }
  function wl(n) {
    return n = n.pendingLanes & -1073741825, n !== 0 ? n : n & 1073741824 ? 1073741824 : 0;
  }
  function Gu() {
    var n = Qu;
    return Qu <<= 1, !(Qu & 4194240) && (Qu = 64), n;
  }
  function qu(n) {
    for (var r = [], l = 0; 31 > l; l++) r.push(n);
    return r;
  }
  function $i(n, r, l) {
    n.pendingLanes |= r, r !== 536870912 && (n.suspendedLanes = 0, n.pingedLanes = 0), n = n.eventTimes, r = 31 - Ar(r), n[r] = l;
  }
  function id(n, r) {
    var l = n.pendingLanes & ~r;
    n.pendingLanes = r, n.suspendedLanes = 0, n.pingedLanes = 0, n.expiredLanes &= r, n.mutableReadLanes &= r, n.entangledLanes &= r, r = n.entanglements;
    var o = n.eventTimes;
    for (n = n.expirationTimes; 0 < l; ) {
      var c = 31 - Ar(l), d = 1 << c;
      r[c] = 0, o[c] = -1, n[c] = -1, l &= ~d;
    }
  }
  function wi(n, r) {
    var l = n.entangledLanes |= r;
    for (n = n.entanglements; l; ) {
      var o = 31 - Ar(l), c = 1 << o;
      c & r | n[o] & r && (n[o] |= r), l &= ~c;
    }
  }
  var At = 0;
  function Ku(n) {
    return n &= -n, 1 < n ? 4 < n ? n & 268435455 ? 16 : 536870912 : 4 : 1;
  }
  var lu, Xu, bt, Zu, Ju, at = !1, uu = [], wn = null, Jr = null, Ur = null, bl = /* @__PURE__ */ new Map(), kn = /* @__PURE__ */ new Map(), It = [], fc = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");
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
        kn.delete(r.pointerId);
    }
  }
  function tr(n, r, l, o, c, d) {
    return n === null || n.nativeEvent !== d ? (n = { blockedOn: r, domEventName: l, eventSystemFlags: o, nativeEvent: d, targetContainers: [c] }, r !== null && (r = Cs(r), r !== null && Xu(r)), n) : (n.eventSystemFlags |= o, r = n.targetContainers, c !== null && r.indexOf(c) === -1 && r.push(c), n);
  }
  function bi(n, r, l, o, c) {
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
        return d = c.pointerId, kn.set(d, tr(kn.get(d) || null, n, r, l, o, c)), !0;
    }
    return !1;
  }
  function dc(n) {
    var r = Pa(n.target);
    if (r !== null) {
      var l = Pe(r);
      if (l !== null) {
        if (r = l.tag, r === 13) {
          if (r = Et(l), r !== null) {
            n.blockedOn = r, Ju(n.priority, function() {
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
      var l = to(n.domEventName, n.eventSystemFlags, r[0], n.nativeEvent);
      if (l === null) {
        l = n.nativeEvent;
        var o = new l.constructor(l.type, l);
        Tr = o, l.target.dispatchEvent(o), Tr = null;
      } else return r = Cs(l), r !== null && Xu(r), n.blockedOn = l, !1;
      r.shift();
    }
    return !0;
  }
  function xl(n, r, l) {
    Bi(n) && l.delete(r);
  }
  function pc() {
    at = !1, wn !== null && Bi(wn) && (wn = null), Jr !== null && Bi(Jr) && (Jr = null), Ur !== null && Bi(Ur) && (Ur = null), bl.forEach(xl), kn.forEach(xl);
  }
  function Ua(n, r) {
    n.blockedOn === r && (n.blockedOn = null, at || (at = !0, S.unstable_scheduleCallback(S.unstable_NormalPriority, pc)));
  }
  function _l(n) {
    function r(c) {
      return Ua(c, n);
    }
    if (0 < uu.length) {
      Ua(uu[0], n);
      for (var l = 1; l < uu.length; l++) {
        var o = uu[l];
        o.blockedOn === n && (o.blockedOn = null);
      }
    }
    for (wn !== null && Ua(wn, n), Jr !== null && Ua(Jr, n), Ur !== null && Ua(Ur, n), bl.forEach(r), kn.forEach(r), l = 0; l < It.length; l++) o = It[l], o.blockedOn === n && (o.blockedOn = null);
    for (; 0 < It.length && (l = It[0], l.blockedOn === null); ) dc(l), l.blockedOn === null && It.shift();
  }
  var Ii = Ne.ReactCurrentBatchConfig, Fa = !0;
  function eo(n, r, l, o) {
    var c = At, d = Ii.transition;
    Ii.transition = null;
    try {
      At = 1, kl(n, r, l, o);
    } finally {
      At = c, Ii.transition = d;
    }
  }
  function Dl(n, r, l, o) {
    var c = At, d = Ii.transition;
    Ii.transition = null;
    try {
      At = 4, kl(n, r, l, o);
    } finally {
      At = c, Ii.transition = d;
    }
  }
  function kl(n, r, l, o) {
    if (Fa) {
      var c = to(n, r, l, o);
      if (c === null) Rc(n, r, o, ou, l), ea(n, o);
      else if (bi(c, n, r, l, o)) o.stopPropagation();
      else if (ea(n, o), r & 4 && -1 < fc.indexOf(n)) {
        for (; c !== null; ) {
          var d = Cs(c);
          if (d !== null && lu(d), d = to(n, r, l, o), d === null && Rc(n, r, o, ou, l), d === c) break;
          c = d;
        }
        c !== null && o.stopPropagation();
      } else Rc(n, r, o, null, l);
    }
  }
  var ou = null;
  function to(n, r, l, o) {
    if (ou = null, n = Qt(o), n = Pa(n), n !== null) if (r = Pe(n), r === null) n = null;
    else if (l = r.tag, l === 13) {
      if (n = Et(r), n !== null) return n;
      n = null;
    } else if (l === 3) {
      if (r.stateNode.current.memoizedState.isDehydrated) return r.tag === 3 ? r.stateNode.containerInfo : null;
      n = null;
    } else r !== n && (n = null);
    return ou = n, null;
  }
  function us(n) {
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
          case za:
          case Sl:
            return 16;
          case Wu:
            return 536870912;
          default:
            return 16;
        }
      default:
        return 16;
    }
  }
  var si = null, h = null, w = null;
  function F() {
    if (w) return w;
    var n, r = h, l = r.length, o, c = "value" in si ? si.value : si.textContent, d = c.length;
    for (n = 0; n < l && r[n] === c[n]; n++) ;
    var y = l - n;
    for (o = 1; o <= y && r[l - o] === c[d - o]; o++) ;
    return w = c.slice(n, 1 < o ? 1 - o : void 0);
  }
  function V(n) {
    var r = n.keyCode;
    return "charCode" in n ? (n = n.charCode, n === 0 && r === 13 && (n = 13)) : n = r, n === 10 && (n = 13), 32 <= n || n === 13 ? n : 0;
  }
  function le() {
    return !0;
  }
  function Xe() {
    return !1;
  }
  function ye(n) {
    function r(l, o, c, d, y) {
      this._reactName = l, this._targetInst = c, this.type = o, this.nativeEvent = d, this.target = y, this.currentTarget = null;
      for (var T in n) n.hasOwnProperty(T) && (l = n[T], this[T] = l ? l(d) : d[T]);
      return this.isDefaultPrevented = (d.defaultPrevented != null ? d.defaultPrevented : d.returnValue === !1) ? le : Xe, this.isPropagationStopped = Xe, this;
    }
    return pe(r.prototype, { preventDefault: function() {
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
  }, defaultPrevented: 0, isTrusted: 0 }, yt = ye(Ge), Mt = pe({}, Ge, { view: 0, detail: 0 }), ln = ye(Mt), Gt, un, sn, xt = pe({}, Mt, { screenX: 0, screenY: 0, clientX: 0, clientY: 0, pageX: 0, pageY: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, getModifierState: cd, button: 0, buttons: 0, relatedTarget: function(n) {
    return n.relatedTarget === void 0 ? n.fromElement === n.srcElement ? n.toElement : n.fromElement : n.relatedTarget;
  }, movementX: function(n) {
    return "movementX" in n ? n.movementX : (n !== sn && (sn && n.type === "mousemove" ? (Gt = n.screenX - sn.screenX, un = n.screenY - sn.screenY) : un = Gt = 0, sn = n), Gt);
  }, movementY: function(n) {
    return "movementY" in n ? n.movementY : un;
  } }), Yi = ye(xt), no = pe({}, xt, { dataTransfer: 0 }), os = ye(no), ld = pe({}, Mt, { relatedTarget: 0 }), ci = ye(ld), ss = pe({}, Ge, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }), cs = ye(ss), ud = pe({}, Ge, { clipboardData: function(n) {
    return "clipboardData" in n ? n.clipboardData : window.clipboardData;
  } }), wy = ye(ud), by = pe({}, Ge, { data: 0 }), od = ye(by), sd = {
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
  }, yv = {
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
  }, gv = { Alt: "altKey", Control: "ctrlKey", Meta: "metaKey", Shift: "shiftKey" };
  function Sv(n) {
    var r = this.nativeEvent;
    return r.getModifierState ? r.getModifierState(n) : (n = gv[n]) ? !!r[n] : !1;
  }
  function cd() {
    return Sv;
  }
  var Wi = pe({}, Mt, { key: function(n) {
    if (n.key) {
      var r = sd[n.key] || n.key;
      if (r !== "Unidentified") return r;
    }
    return n.type === "keypress" ? (n = V(n), n === 13 ? "Enter" : String.fromCharCode(n)) : n.type === "keydown" || n.type === "keyup" ? yv[n.keyCode] || "Unidentified" : "";
  }, code: 0, location: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, repeat: 0, locale: 0, getModifierState: cd, charCode: function(n) {
    return n.type === "keypress" ? V(n) : 0;
  }, keyCode: function(n) {
    return n.type === "keydown" || n.type === "keyup" ? n.keyCode : 0;
  }, which: function(n) {
    return n.type === "keypress" ? V(n) : n.type === "keydown" || n.type === "keyup" ? n.keyCode : 0;
  } }), xy = ye(Wi), fd = pe({}, xt, { pointerId: 0, width: 0, height: 0, pressure: 0, tangentialPressure: 0, tiltX: 0, tiltY: 0, twist: 0, pointerType: 0, isPrimary: 0 }), vc = ye(fd), dd = pe({}, Mt, { touches: 0, targetTouches: 0, changedTouches: 0, altKey: 0, metaKey: 0, ctrlKey: 0, shiftKey: 0, getModifierState: cd }), _y = ye(dd), hc = pe({}, Ge, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }), Ev = ye(hc), ta = pe({}, xt, {
    deltaX: function(n) {
      return "deltaX" in n ? n.deltaX : "wheelDeltaX" in n ? -n.wheelDeltaX : 0;
    },
    deltaY: function(n) {
      return "deltaY" in n ? n.deltaY : "wheelDeltaY" in n ? -n.wheelDeltaY : "wheelDelta" in n ? -n.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
  }), Qi = ye(ta), $n = [9, 13, 27, 32], fi = ce && "CompositionEvent" in window, su = null;
  ce && "documentMode" in document && (su = document.documentMode);
  var mc = ce && "TextEvent" in window && !su, Cv = ce && (!fi || su && 8 < su && 11 >= su), ro = " ", Rv = !1;
  function Tv(n, r) {
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
  var ao = !1;
  function Dy(n, r) {
    switch (n) {
      case "compositionend":
        return yc(r);
      case "keypress":
        return r.which !== 32 ? null : (Rv = !0, ro);
      case "textInput":
        return n = r.data, n === ro && Rv ? null : n;
      default:
        return null;
    }
  }
  function ky(n, r) {
    if (ao) return n === "compositionend" || !fi && Tv(n, r) ? (n = F(), w = h = si = null, ao = !1, n) : null;
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
        return Cv && r.locale !== "ko" ? null : r.data;
      default:
        return null;
    }
  }
  var wv = { color: !0, date: !0, datetime: !0, "datetime-local": !0, email: !0, month: !0, number: !0, password: !0, range: !0, search: !0, tel: !0, text: !0, time: !0, url: !0, week: !0 };
  function bv(n) {
    var r = n && n.nodeName && n.nodeName.toLowerCase();
    return r === "input" ? !!wv[n.type] : r === "textarea";
  }
  function xv(n, r, l, o) {
    Aa(o), r = gs(r, "onChange"), 0 < r.length && (l = new yt("onChange", "change", null, l, o), n.push({ event: l, listeners: r }));
  }
  var fs = null, io = null;
  function lo(n) {
    Cc(n, 0);
  }
  function uo(n) {
    var r = so(n);
    if (be(r)) return n;
  }
  function _v(n, r) {
    if (n === "change") return r;
  }
  var pd = !1;
  if (ce) {
    var vd;
    if (ce) {
      var hd = "oninput" in document;
      if (!hd) {
        var Dv = document.createElement("div");
        Dv.setAttribute("oninput", "return;"), hd = typeof Dv.oninput == "function";
      }
      vd = hd;
    } else vd = !1;
    pd = vd && (!document.documentMode || 9 < document.documentMode);
  }
  function kv() {
    fs && (fs.detachEvent("onpropertychange", Ov), io = fs = null);
  }
  function Ov(n) {
    if (n.propertyName === "value" && uo(io)) {
      var r = [];
      xv(r, io, n, Qt(n)), gl(lo, r);
    }
  }
  function Oy(n, r, l) {
    n === "focusin" ? (kv(), fs = r, io = l, fs.attachEvent("onpropertychange", Ov)) : n === "focusout" && kv();
  }
  function My(n) {
    if (n === "selectionchange" || n === "keyup" || n === "keydown") return uo(io);
  }
  function Ly(n, r) {
    if (n === "click") return uo(r);
  }
  function Mv(n, r) {
    if (n === "input" || n === "change") return uo(r);
  }
  function Ny(n, r) {
    return n === r && (n !== 0 || 1 / n === 1 / r) || n !== n && r !== r;
  }
  var ja = typeof Object.is == "function" ? Object.is : Ny;
  function ds(n, r) {
    if (ja(n, r)) return !0;
    if (typeof n != "object" || n === null || typeof r != "object" || r === null) return !1;
    var l = Object.keys(n), o = Object.keys(r);
    if (l.length !== o.length) return !1;
    for (o = 0; o < l.length; o++) {
      var c = l[o];
      if (!W.call(r, c) || !ja(n[c], r[c])) return !1;
    }
    return !0;
  }
  function Lv(n) {
    for (; n && n.firstChild; ) n = n.firstChild;
    return n;
  }
  function Nv(n, r) {
    var l = Lv(n);
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
      l = Lv(l);
    }
  }
  function Av(n, r) {
    return n && r ? n === r ? !0 : n && n.nodeType === 3 ? !1 : r && r.nodeType === 3 ? Av(n, r.parentNode) : "contains" in n ? n.contains(r) : n.compareDocumentPosition ? !!(n.compareDocumentPosition(r) & 16) : !1 : !1;
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
    if (r !== l && l && l.ownerDocument && Av(l.ownerDocument.documentElement, l)) {
      if (o !== null && Gi(l)) {
        if (r = o.start, n = o.end, n === void 0 && (n = r), "selectionStart" in l) l.selectionStart = r, l.selectionEnd = Math.min(n, l.value.length);
        else if (n = (r = l.ownerDocument || document) && r.defaultView || window, n.getSelection) {
          n = n.getSelection();
          var c = l.textContent.length, d = Math.min(o.start, c);
          o = o.end === void 0 ? d : Math.min(o.end, c), !n.extend && d > o && (c = o, o = d, d = c), c = Nv(l, d);
          var y = Nv(
            l,
            o
          );
          c && y && (n.rangeCount !== 1 || n.anchorNode !== c.node || n.anchorOffset !== c.offset || n.focusNode !== y.node || n.focusOffset !== y.offset) && (r = r.createRange(), r.setStart(c.node, c.offset), n.removeAllRanges(), d > o ? (n.addRange(r), n.extend(y.node, y.offset)) : (r.setEnd(y.node, y.offset), n.addRange(r)));
        }
      }
      for (r = [], n = l; n = n.parentNode; ) n.nodeType === 1 && r.push({ element: n, left: n.scrollLeft, top: n.scrollTop });
      for (typeof l.focus == "function" && l.focus(), l = 0; l < r.length; l++) n = r[l], n.element.scrollLeft = n.left, n.element.scrollTop = n.top;
    }
  }
  var zv = ce && "documentMode" in document && 11 >= document.documentMode, di = null, md = null, ps = null, yd = !1;
  function Uv(n, r, l) {
    var o = l.window === l ? l.document : l.nodeType === 9 ? l : l.ownerDocument;
    yd || di == null || di !== rn(o) || (o = di, "selectionStart" in o && Gi(o) ? o = { start: o.selectionStart, end: o.selectionEnd } : (o = (o.ownerDocument && o.ownerDocument.defaultView || window).getSelection(), o = { anchorNode: o.anchorNode, anchorOffset: o.anchorOffset, focusNode: o.focusNode, focusOffset: o.focusOffset }), ps && ds(ps, o) || (ps = o, o = gs(md, "onSelect"), 0 < o.length && (r = new yt("onSelect", "select", null, r, l), n.push({ event: r, listeners: o }), r.target = di)));
  }
  function Ec(n, r) {
    var l = {};
    return l[n.toLowerCase()] = r.toLowerCase(), l["Webkit" + n] = "webkit" + r, l["Moz" + n] = "moz" + r, l;
  }
  var cu = { animationend: Ec("Animation", "AnimationEnd"), animationiteration: Ec("Animation", "AnimationIteration"), animationstart: Ec("Animation", "AnimationStart"), transitionend: Ec("Transition", "TransitionEnd") }, gd = {}, Sd = {};
  ce && (Sd = document.createElement("div").style, "AnimationEvent" in window || (delete cu.animationend.animation, delete cu.animationiteration.animation, delete cu.animationstart.animation), "TransitionEvent" in window || delete cu.transitionend.transition);
  function nr(n) {
    if (gd[n]) return gd[n];
    if (!cu[n]) return n;
    var r = cu[n], l;
    for (l in r) if (r.hasOwnProperty(l) && l in Sd) return gd[n] = r[l];
    return n;
  }
  var Ed = nr("animationend"), Fv = nr("animationiteration"), jv = nr("animationstart"), Pv = nr("transitionend"), Hv = /* @__PURE__ */ new Map(), Vv = "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
  function qi(n, r) {
    Hv.set(n, r), B(r, [n]);
  }
  for (var vs = 0; vs < Vv.length; vs++) {
    var fu = Vv[vs], Ay = fu.toLowerCase(), hs = fu[0].toUpperCase() + fu.slice(1);
    qi(Ay, "on" + hs);
  }
  qi(Ed, "onAnimationEnd"), qi(Fv, "onAnimationIteration"), qi(jv, "onAnimationStart"), qi("dblclick", "onDoubleClick"), qi("focusin", "onFocus"), qi("focusout", "onBlur"), qi(Pv, "onTransitionEnd"), E("onMouseEnter", ["mouseout", "mouseover"]), E("onMouseLeave", ["mouseout", "mouseover"]), E("onPointerEnter", ["pointerout", "pointerover"]), E("onPointerLeave", ["pointerout", "pointerover"]), B("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" ")), B("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")), B("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]), B("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" ")), B("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" ")), B("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
  var ms = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), zy = new Set("cancel close invalid load scroll toggle".split(" ").concat(ms));
  function $v(n, r, l) {
    var o = n.type || "unknown-event";
    n.currentTarget = l, ae(o, r, void 0, n), n.currentTarget = null;
  }
  function Cc(n, r) {
    r = (r & 4) !== 0;
    for (var l = 0; l < n.length; l++) {
      var o = n[l], c = o.event;
      o = o.listeners;
      e: {
        var d = void 0;
        if (r) for (var y = o.length - 1; 0 <= y; y--) {
          var T = o[y], x = T.instance, j = T.currentTarget;
          if (T = T.listener, x !== d && c.isPropagationStopped()) break e;
          $v(c, T, j), d = x;
        }
        else for (y = 0; y < o.length; y++) {
          if (T = o[y], x = T.instance, j = T.currentTarget, T = T.listener, x !== d && c.isPropagationStopped()) break e;
          $v(c, T, j), d = x;
        }
      }
    }
    if (Ci) throw n = Ri, Ci = !1, Ri = null, n;
  }
  function on(n, r) {
    var l = r[_d];
    l === void 0 && (l = r[_d] = /* @__PURE__ */ new Set());
    var o = n + "__bubble";
    l.has(o) || (Bv(r, n, 2, !1), l.add(o));
  }
  function Ol(n, r, l) {
    var o = 0;
    r && (o |= 4), Bv(l, n, o, r);
  }
  var Ki = "_reactListening" + Math.random().toString(36).slice(2);
  function oo(n) {
    if (!n[Ki]) {
      n[Ki] = !0, L.forEach(function(l) {
        l !== "selectionchange" && (zy.has(l) || Ol(l, !1, n), Ol(l, !0, n));
      });
      var r = n.nodeType === 9 ? n : n.ownerDocument;
      r === null || r[Ki] || (r[Ki] = !0, Ol("selectionchange", !1, r));
    }
  }
  function Bv(n, r, l, o) {
    switch (us(r)) {
      case 1:
        var c = eo;
        break;
      case 4:
        c = Dl;
        break;
      default:
        c = kl;
    }
    l = c.bind(null, r, l, n), c = void 0, !Ei || r !== "touchstart" && r !== "touchmove" && r !== "wheel" || (c = !0), o ? c !== void 0 ? n.addEventListener(r, l, { capture: !0, passive: c }) : n.addEventListener(r, l, !0) : c !== void 0 ? n.addEventListener(r, l, { passive: c }) : n.addEventListener(r, l, !1);
  }
  function Rc(n, r, l, o, c) {
    var d = o;
    if (!(r & 1) && !(r & 2) && o !== null) e: for (; ; ) {
      if (o === null) return;
      var y = o.tag;
      if (y === 3 || y === 4) {
        var T = o.stateNode.containerInfo;
        if (T === c || T.nodeType === 8 && T.parentNode === c) break;
        if (y === 4) for (y = o.return; y !== null; ) {
          var x = y.tag;
          if ((x === 3 || x === 4) && (x = y.stateNode.containerInfo, x === c || x.nodeType === 8 && x.parentNode === c)) return;
          y = y.return;
        }
        for (; T !== null; ) {
          if (y = Pa(T), y === null) return;
          if (x = y.tag, x === 5 || x === 6) {
            o = d = y;
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
        var Z = Hv.get(n);
        if (Z !== void 0) {
          var Ce = yt, ke = n;
          switch (n) {
            case "keypress":
              if (V(l) === 0) break e;
            case "keydown":
            case "keyup":
              Ce = xy;
              break;
            case "focusin":
              ke = "focus", Ce = ci;
              break;
            case "focusout":
              ke = "blur", Ce = ci;
              break;
            case "beforeblur":
            case "afterblur":
              Ce = ci;
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
              Ce = os;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              Ce = _y;
              break;
            case Ed:
            case Fv:
            case jv:
              Ce = cs;
              break;
            case Pv:
              Ce = Ev;
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
              Ce = wy;
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
          var Ae = (r & 4) !== 0, jn = !Ae && n === "scroll", M = Ae ? Z !== null ? Z + "Capture" : null : Z;
          Ae = [];
          for (var D = j, z; D !== null; ) {
            z = D;
            var ue = z.stateNode;
            if (z.tag === 5 && ue !== null && (z = ue, M !== null && (ue = Ea(D, M), ue != null && Ae.push(ys(D, ue, z)))), jn) break;
            D = D.return;
          }
          0 < Ae.length && (Z = new Ce(Z, ke, null, l, ee), te.push({ event: Z, listeners: Ae }));
        }
      }
      if (!(r & 7)) {
        e: {
          if (Z = n === "mouseover" || n === "pointerover", Ce = n === "mouseout" || n === "pointerout", Z && l !== Tr && (ke = l.relatedTarget || l.fromElement) && (Pa(ke) || ke[Xi])) break e;
          if ((Ce || Z) && (Z = ee.window === ee ? ee : (Z = ee.ownerDocument) ? Z.defaultView || Z.parentWindow : window, Ce ? (ke = l.relatedTarget || l.toElement, Ce = j, ke = ke ? Pa(ke) : null, ke !== null && (jn = Pe(ke), ke !== jn || ke.tag !== 5 && ke.tag !== 6) && (ke = null)) : (Ce = null, ke = j), Ce !== ke)) {
            if (Ae = Yi, ue = "onMouseLeave", M = "onMouseEnter", D = "mouse", (n === "pointerout" || n === "pointerover") && (Ae = vc, ue = "onPointerLeave", M = "onPointerEnter", D = "pointer"), jn = Ce == null ? Z : so(Ce), z = ke == null ? Z : so(ke), Z = new Ae(ue, D + "leave", Ce, l, ee), Z.target = jn, Z.relatedTarget = z, ue = null, Pa(ee) === j && (Ae = new Ae(M, D + "enter", ke, l, ee), Ae.target = z, Ae.relatedTarget = jn, ue = Ae), jn = ue, Ce && ke) t: {
              for (Ae = Ce, M = ke, D = 0, z = Ae; z; z = du(z)) D++;
              for (z = 0, ue = M; ue; ue = du(ue)) z++;
              for (; 0 < D - z; ) Ae = du(Ae), D--;
              for (; 0 < z - D; ) M = du(M), z--;
              for (; D--; ) {
                if (Ae === M || M !== null && Ae === M.alternate) break t;
                Ae = du(Ae), M = du(M);
              }
              Ae = null;
            }
            else Ae = null;
            Ce !== null && Cd(te, Z, Ce, Ae, !1), ke !== null && jn !== null && Cd(te, jn, ke, Ae, !0);
          }
        }
        e: {
          if (Z = j ? so(j) : window, Ce = Z.nodeName && Z.nodeName.toLowerCase(), Ce === "select" || Ce === "input" && Z.type === "file") var je = _v;
          else if (bv(Z)) if (pd) je = Mv;
          else {
            je = My;
            var Ze = Oy;
          }
          else (Ce = Z.nodeName) && Ce.toLowerCase() === "input" && (Z.type === "checkbox" || Z.type === "radio") && (je = Ly);
          if (je && (je = je(n, j))) {
            xv(te, je, l, ee);
            break e;
          }
          Ze && Ze(n, Z, j), n === "focusout" && (Ze = Z._wrapperState) && Ze.controlled && Z.type === "number" && qr(Z, "number", Z.value);
        }
        switch (Ze = j ? so(j) : window, n) {
          case "focusin":
            (bv(Ze) || Ze.contentEditable === "true") && (di = Ze, md = j, ps = null);
            break;
          case "focusout":
            ps = md = di = null;
            break;
          case "mousedown":
            yd = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            yd = !1, Uv(te, l, ee);
            break;
          case "selectionchange":
            if (zv) break;
          case "keydown":
          case "keyup":
            Uv(te, l, ee);
        }
        var Oe;
        if (fi) e: {
          switch (n) {
            case "compositionstart":
              var et = "onCompositionStart";
              break e;
            case "compositionend":
              et = "onCompositionEnd";
              break e;
            case "compositionupdate":
              et = "onCompositionUpdate";
              break e;
          }
          et = void 0;
        }
        else ao ? Tv(n, l) && (et = "onCompositionEnd") : n === "keydown" && l.keyCode === 229 && (et = "onCompositionStart");
        et && (Cv && l.locale !== "ko" && (ao || et !== "onCompositionStart" ? et === "onCompositionEnd" && ao && (Oe = F()) : (si = ee, h = "value" in si ? si.value : si.textContent, ao = !0)), Ze = gs(j, et), 0 < Ze.length && (et = new od(et, n, null, l, ee), te.push({ event: et, listeners: Ze }), Oe ? et.data = Oe : (Oe = yc(l), Oe !== null && (et.data = Oe)))), (Oe = mc ? Dy(n, l) : ky(n, l)) && (j = gs(j, "onBeforeInput"), 0 < j.length && (ee = new od("onBeforeInput", "beforeinput", null, l, ee), te.push({ event: ee, listeners: j }), ee.data = Oe));
      }
      Cc(te, r);
    });
  }
  function ys(n, r, l) {
    return { instance: n, listener: r, currentTarget: l };
  }
  function gs(n, r) {
    for (var l = r + "Capture", o = []; n !== null; ) {
      var c = n, d = c.stateNode;
      c.tag === 5 && d !== null && (c = d, d = Ea(n, l), d != null && o.unshift(ys(n, d, c)), d = Ea(n, r), d != null && o.push(ys(n, d, c))), n = n.return;
    }
    return o;
  }
  function du(n) {
    if (n === null) return null;
    do
      n = n.return;
    while (n && n.tag !== 5);
    return n || null;
  }
  function Cd(n, r, l, o, c) {
    for (var d = r._reactName, y = []; l !== null && l !== o; ) {
      var T = l, x = T.alternate, j = T.stateNode;
      if (x !== null && x === o) break;
      T.tag === 5 && j !== null && (T = j, c ? (x = Ea(l, d), x != null && y.unshift(ys(l, x, T))) : c || (x = Ea(l, d), x != null && y.push(ys(l, x, T)))), l = l.return;
    }
    y.length !== 0 && n.push({ event: r, listeners: y });
  }
  var Rd = /\r\n?/g, Uy = /\u0000|\uFFFD/g;
  function Td(n) {
    return (typeof n == "string" ? n : "" + n).replace(Rd, `
`).replace(Uy, "");
  }
  function Tc(n, r, l) {
    if (r = Td(r), Td(n) !== r && l) throw Error(R(425));
  }
  function wc() {
  }
  var wd = null, pu = null;
  function Ss(n, r) {
    return n === "textarea" || n === "noscript" || typeof r.children == "string" || typeof r.children == "number" || typeof r.dangerouslySetInnerHTML == "object" && r.dangerouslySetInnerHTML !== null && r.dangerouslySetInnerHTML.__html != null;
  }
  var vu = typeof setTimeout == "function" ? setTimeout : void 0, Iv = typeof clearTimeout == "function" ? clearTimeout : void 0, bd = typeof Promise == "function" ? Promise : void 0, xd = typeof queueMicrotask == "function" ? queueMicrotask : typeof bd < "u" ? function(n) {
    return bd.resolve(null).then(n).catch(Fy);
  } : vu;
  function Fy(n) {
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
  function pi(n) {
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
  function Es(n) {
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
  var Ll = Math.random().toString(36).slice(2), xi = "__reactFiber$" + Ll, hu = "__reactProps$" + Ll, Xi = "__reactContainer$" + Ll, _d = "__reactEvents$" + Ll, jy = "__reactListeners$" + Ll, Dd = "__reactHandles$" + Ll;
  function Pa(n) {
    var r = n[xi];
    if (r) return r;
    for (var l = n.parentNode; l; ) {
      if (r = l[Xi] || l[xi]) {
        if (l = r.alternate, r.child !== null || l !== null && l.child !== null) for (n = Es(n); n !== null; ) {
          if (l = n[xi]) return l;
          n = Es(n);
        }
        return r;
      }
      n = l, l = n.parentNode;
    }
    return null;
  }
  function Cs(n) {
    return n = n[xi] || n[Xi], !n || n.tag !== 5 && n.tag !== 6 && n.tag !== 13 && n.tag !== 3 ? null : n;
  }
  function so(n) {
    if (n.tag === 5 || n.tag === 6) return n.stateNode;
    throw Error(R(33));
  }
  function Ie(n) {
    return n[hu] || null;
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
  var _i = {}, nt = ft(_i), On = ft(!1), na = _i;
  function Ha(n, r) {
    var l = n.type.contextTypes;
    if (!l) return _i;
    var o = n.stateNode;
    if (o && o.__reactInternalMemoizedUnmaskedChildContext === r) return o.__reactInternalMemoizedMaskedChildContext;
    var c = {}, d;
    for (d in l) c[d] = r[d];
    return o && (n = n.stateNode, n.__reactInternalMemoizedUnmaskedChildContext = r, n.__reactInternalMemoizedMaskedChildContext = c), c;
  }
  function yn(n) {
    return n = n.childContextTypes, n != null;
  }
  function Va() {
    Pt(On), Pt(nt);
  }
  function Al(n, r, l) {
    if (nt.current !== _i) throw Error(R(168));
    Yt(nt, r), Yt(On, l);
  }
  function Rs(n, r, l) {
    var o = n.stateNode;
    if (r = r.childContextTypes, typeof o.getChildContext != "function") return l;
    o = o.getChildContext();
    for (var c in o) if (!(c in r)) throw Error(R(108, St(n) || "Unknown", c));
    return pe({}, l, o);
  }
  function bc(n) {
    return n = (n = n.stateNode) && n.__reactInternalMemoizedMergedChildContext || _i, na = nt.current, Yt(nt, n), Yt(On, On.current), !0;
  }
  function Yv(n, r, l) {
    var o = n.stateNode;
    if (!o) throw Error(R(169));
    l ? (n = Rs(n, r, na), o.__reactInternalMemoizedMergedChildContext = n, Pt(On), Pt(nt), Yt(nt, n)) : Pt(On), Yt(On, l);
  }
  var Ta = null, rr = !1, Ts = !1;
  function kd(n) {
    Ta === null ? Ta = [n] : Ta.push(n);
  }
  function Od(n) {
    rr = !0, kd(n);
  }
  function ra() {
    if (!Ts && Ta !== null) {
      Ts = !0;
      var n = 0, r = At;
      try {
        var l = Ta;
        for (At = 1; n < l.length; n++) {
          var o = l[n];
          do
            o = o(!0);
          while (o !== null);
        }
        Ta = null, rr = !1;
      } catch (c) {
        throw Ta !== null && (Ta = Ta.slice(n + 1)), an(Nr, ra), c;
      } finally {
        At = r, Ts = !1;
      }
    }
    return null;
  }
  var zl = [], aa = 0, mu = null, co = 0, ia = [], br = 0, $a = null, cr = 1, Zi = "";
  function wa(n, r) {
    zl[aa++] = co, zl[aa++] = mu, mu = n, co = r;
  }
  function Md(n, r, l) {
    ia[br++] = cr, ia[br++] = Zi, ia[br++] = $a, $a = n;
    var o = cr;
    n = Zi;
    var c = 32 - Ar(o) - 1;
    o &= ~(1 << c), l += 1;
    var d = 32 - Ar(r) + c;
    if (30 < d) {
      var y = c - c % 5;
      d = (o & (1 << y) - 1).toString(32), o >>= y, c -= y, cr = 1 << 32 - Ar(r) + c | l << c | o, Zi = d + n;
    } else cr = 1 << d | l << c | o, Zi = n;
  }
  function xc(n) {
    n.return !== null && (wa(n, 1), Md(n, 1, 0));
  }
  function Ld(n) {
    for (; n === mu; ) mu = zl[--aa], zl[aa] = null, co = zl[--aa], zl[aa] = null;
    for (; n === $a; ) $a = ia[--br], ia[br] = null, Zi = ia[--br], ia[br] = null, cr = ia[--br], ia[br] = null;
  }
  var ba = null, la = null, pn = !1, Ba = null;
  function Nd(n, r) {
    var l = Xa(5, null, null, 0);
    l.elementType = "DELETED", l.stateNode = r, l.return = n, r = n.deletions, r === null ? (n.deletions = [l], n.flags |= 16) : r.push(l);
  }
  function Wv(n, r) {
    switch (n.tag) {
      case 5:
        var l = n.type;
        return r = r.nodeType !== 1 || l.toLowerCase() !== r.nodeName.toLowerCase() ? null : r, r !== null ? (n.stateNode = r, ba = n, la = pi(r.firstChild), !0) : !1;
      case 6:
        return r = n.pendingProps === "" || r.nodeType !== 3 ? null : r, r !== null ? (n.stateNode = r, ba = n, la = null, !0) : !1;
      case 13:
        return r = r.nodeType !== 8 ? null : r, r !== null ? (l = $a !== null ? { id: cr, overflow: Zi } : null, n.memoizedState = { dehydrated: r, treeContext: l, retryLane: 1073741824 }, l = Xa(18, null, null, 0), l.stateNode = r, l.return = n, n.child = l, ba = n, la = null, !0) : !1;
      default:
        return !1;
    }
  }
  function _c(n) {
    return (n.mode & 1) !== 0 && (n.flags & 128) === 0;
  }
  function Dc(n) {
    if (pn) {
      var r = la;
      if (r) {
        var l = r;
        if (!Wv(n, r)) {
          if (_c(n)) throw Error(R(418));
          r = pi(l.nextSibling);
          var o = ba;
          r && Wv(n, r) ? Nd(o, l) : (n.flags = n.flags & -4097 | 2, pn = !1, ba = n);
        }
      } else {
        if (_c(n)) throw Error(R(418));
        n.flags = n.flags & -4097 | 2, pn = !1, ba = n;
      }
    }
  }
  function Qv(n) {
    for (n = n.return; n !== null && n.tag !== 5 && n.tag !== 3 && n.tag !== 13; ) n = n.return;
    ba = n;
  }
  function kc(n) {
    if (n !== ba) return !1;
    if (!pn) return Qv(n), pn = !0, !1;
    var r;
    if ((r = n.tag !== 3) && !(r = n.tag !== 5) && (r = n.type, r = r !== "head" && r !== "body" && !Ss(n.type, n.memoizedProps)), r && (r = la)) {
      if (_c(n)) throw Gv(), Error(R(418));
      for (; r; ) Nd(n, r), r = pi(r.nextSibling);
    }
    if (Qv(n), n.tag === 13) {
      if (n = n.memoizedState, n = n !== null ? n.dehydrated : null, !n) throw Error(R(317));
      e: {
        for (n = n.nextSibling, r = 0; n; ) {
          if (n.nodeType === 8) {
            var l = n.data;
            if (l === "/$") {
              if (r === 0) {
                la = pi(n.nextSibling);
                break e;
              }
              r--;
            } else l !== "$" && l !== "$!" && l !== "$?" || r++;
          }
          n = n.nextSibling;
        }
        la = null;
      }
    } else la = ba ? pi(n.stateNode.nextSibling) : null;
    return !0;
  }
  function Gv() {
    for (var n = la; n; ) n = pi(n.nextSibling);
  }
  function bn() {
    la = ba = null, pn = !1;
  }
  function Ad(n) {
    Ba === null ? Ba = [n] : Ba.push(n);
  }
  var Oc = Ne.ReactCurrentBatchConfig;
  function yu(n, r, l) {
    if (n = l.ref, n !== null && typeof n != "function" && typeof n != "object") {
      if (l._owner) {
        if (l = l._owner, l) {
          if (l.tag !== 1) throw Error(R(309));
          var o = l.stateNode;
        }
        if (!o) throw Error(R(147, n));
        var c = o, d = "" + n;
        return r !== null && r.ref !== null && typeof r.ref == "function" && r.ref._stringRef === d ? r.ref : (r = function(y) {
          var T = c.refs;
          y === null ? delete T[d] : T[d] = y;
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
  function qv(n) {
    var r = n._init;
    return r(n._payload);
  }
  function Mc(n) {
    function r(M, D) {
      if (n) {
        var z = M.deletions;
        z === null ? (M.deletions = [D], M.flags |= 16) : z.push(D);
      }
    }
    function l(M, D) {
      if (!n) return null;
      for (; D !== null; ) r(M, D), D = D.sibling;
      return null;
    }
    function o(M, D) {
      for (M = /* @__PURE__ */ new Map(); D !== null; ) D.key !== null ? M.set(D.key, D) : M.set(D.index, D), D = D.sibling;
      return M;
    }
    function c(M, D) {
      return M = Bl(M, D), M.index = 0, M.sibling = null, M;
    }
    function d(M, D, z) {
      return M.index = z, n ? (z = M.alternate, z !== null ? (z = z.index, z < D ? (M.flags |= 2, D) : z) : (M.flags |= 2, D)) : (M.flags |= 1048576, D);
    }
    function y(M) {
      return n && M.alternate === null && (M.flags |= 2), M;
    }
    function T(M, D, z, ue) {
      return D === null || D.tag !== 6 ? (D = Sf(z, M.mode, ue), D.return = M, D) : (D = c(D, z), D.return = M, D);
    }
    function x(M, D, z, ue) {
      var je = z.type;
      return je === de ? ee(M, D, z.props.children, ue, z.key) : D !== null && (D.elementType === je || typeof je == "object" && je !== null && je.$$typeof === Tt && qv(je) === D.type) ? (ue = c(D, z.props), ue.ref = yu(M, D, z), ue.return = M, ue) : (ue = yf(z.type, z.key, z.props, null, M.mode, ue), ue.ref = yu(M, D, z), ue.return = M, ue);
    }
    function j(M, D, z, ue) {
      return D === null || D.tag !== 4 || D.stateNode.containerInfo !== z.containerInfo || D.stateNode.implementation !== z.implementation ? (D = Vs(z, M.mode, ue), D.return = M, D) : (D = c(D, z.children || []), D.return = M, D);
    }
    function ee(M, D, z, ue, je) {
      return D === null || D.tag !== 7 ? (D = Lu(z, M.mode, ue, je), D.return = M, D) : (D = c(D, z), D.return = M, D);
    }
    function te(M, D, z) {
      if (typeof D == "string" && D !== "" || typeof D == "number") return D = Sf("" + D, M.mode, z), D.return = M, D;
      if (typeof D == "object" && D !== null) {
        switch (D.$$typeof) {
          case $:
            return z = yf(D.type, D.key, D.props, null, M.mode, z), z.ref = yu(M, null, D), z.return = M, z;
          case Le:
            return D = Vs(D, M.mode, z), D.return = M, D;
          case Tt:
            var ue = D._init;
            return te(M, ue(D._payload), z);
        }
        if (Jn(D) || Ue(D)) return D = Lu(D, M.mode, z, null), D.return = M, D;
        Di(M, D);
      }
      return null;
    }
    function Z(M, D, z, ue) {
      var je = D !== null ? D.key : null;
      if (typeof z == "string" && z !== "" || typeof z == "number") return je !== null ? null : T(M, D, "" + z, ue);
      if (typeof z == "object" && z !== null) {
        switch (z.$$typeof) {
          case $:
            return z.key === je ? x(M, D, z, ue) : null;
          case Le:
            return z.key === je ? j(M, D, z, ue) : null;
          case Tt:
            return je = z._init, Z(
              M,
              D,
              je(z._payload),
              ue
            );
        }
        if (Jn(z) || Ue(z)) return je !== null ? null : ee(M, D, z, ue, null);
        Di(M, z);
      }
      return null;
    }
    function Ce(M, D, z, ue, je) {
      if (typeof ue == "string" && ue !== "" || typeof ue == "number") return M = M.get(z) || null, T(D, M, "" + ue, je);
      if (typeof ue == "object" && ue !== null) {
        switch (ue.$$typeof) {
          case $:
            return M = M.get(ue.key === null ? z : ue.key) || null, x(D, M, ue, je);
          case Le:
            return M = M.get(ue.key === null ? z : ue.key) || null, j(D, M, ue, je);
          case Tt:
            var Ze = ue._init;
            return Ce(M, D, z, Ze(ue._payload), je);
        }
        if (Jn(ue) || Ue(ue)) return M = M.get(z) || null, ee(D, M, ue, je, null);
        Di(D, ue);
      }
      return null;
    }
    function ke(M, D, z, ue) {
      for (var je = null, Ze = null, Oe = D, et = D = 0, Kn = null; Oe !== null && et < z.length; et++) {
        Oe.index > et ? (Kn = Oe, Oe = null) : Kn = Oe.sibling;
        var zt = Z(M, Oe, z[et], ue);
        if (zt === null) {
          Oe === null && (Oe = Kn);
          break;
        }
        n && Oe && zt.alternate === null && r(M, Oe), D = d(zt, D, et), Ze === null ? je = zt : Ze.sibling = zt, Ze = zt, Oe = Kn;
      }
      if (et === z.length) return l(M, Oe), pn && wa(M, et), je;
      if (Oe === null) {
        for (; et < z.length; et++) Oe = te(M, z[et], ue), Oe !== null && (D = d(Oe, D, et), Ze === null ? je = Oe : Ze.sibling = Oe, Ze = Oe);
        return pn && wa(M, et), je;
      }
      for (Oe = o(M, Oe); et < z.length; et++) Kn = Ce(Oe, M, et, z[et], ue), Kn !== null && (n && Kn.alternate !== null && Oe.delete(Kn.key === null ? et : Kn.key), D = d(Kn, D, et), Ze === null ? je = Kn : Ze.sibling = Kn, Ze = Kn);
      return n && Oe.forEach(function(il) {
        return r(M, il);
      }), pn && wa(M, et), je;
    }
    function Ae(M, D, z, ue) {
      var je = Ue(z);
      if (typeof je != "function") throw Error(R(150));
      if (z = je.call(z), z == null) throw Error(R(151));
      for (var Ze = je = null, Oe = D, et = D = 0, Kn = null, zt = z.next(); Oe !== null && !zt.done; et++, zt = z.next()) {
        Oe.index > et ? (Kn = Oe, Oe = null) : Kn = Oe.sibling;
        var il = Z(M, Oe, zt.value, ue);
        if (il === null) {
          Oe === null && (Oe = Kn);
          break;
        }
        n && Oe && il.alternate === null && r(M, Oe), D = d(il, D, et), Ze === null ? je = il : Ze.sibling = il, Ze = il, Oe = Kn;
      }
      if (zt.done) return l(
        M,
        Oe
      ), pn && wa(M, et), je;
      if (Oe === null) {
        for (; !zt.done; et++, zt = z.next()) zt = te(M, zt.value, ue), zt !== null && (D = d(zt, D, et), Ze === null ? je = zt : Ze.sibling = zt, Ze = zt);
        return pn && wa(M, et), je;
      }
      for (Oe = o(M, Oe); !zt.done; et++, zt = z.next()) zt = Ce(Oe, M, et, zt.value, ue), zt !== null && (n && zt.alternate !== null && Oe.delete(zt.key === null ? et : zt.key), D = d(zt, D, et), Ze === null ? je = zt : Ze.sibling = zt, Ze = zt);
      return n && Oe.forEach(function(ng) {
        return r(M, ng);
      }), pn && wa(M, et), je;
    }
    function jn(M, D, z, ue) {
      if (typeof z == "object" && z !== null && z.type === de && z.key === null && (z = z.props.children), typeof z == "object" && z !== null) {
        switch (z.$$typeof) {
          case $:
            e: {
              for (var je = z.key, Ze = D; Ze !== null; ) {
                if (Ze.key === je) {
                  if (je = z.type, je === de) {
                    if (Ze.tag === 7) {
                      l(M, Ze.sibling), D = c(Ze, z.props.children), D.return = M, M = D;
                      break e;
                    }
                  } else if (Ze.elementType === je || typeof je == "object" && je !== null && je.$$typeof === Tt && qv(je) === Ze.type) {
                    l(M, Ze.sibling), D = c(Ze, z.props), D.ref = yu(M, Ze, z), D.return = M, M = D;
                    break e;
                  }
                  l(M, Ze);
                  break;
                } else r(M, Ze);
                Ze = Ze.sibling;
              }
              z.type === de ? (D = Lu(z.props.children, M.mode, ue, z.key), D.return = M, M = D) : (ue = yf(z.type, z.key, z.props, null, M.mode, ue), ue.ref = yu(M, D, z), ue.return = M, M = ue);
            }
            return y(M);
          case Le:
            e: {
              for (Ze = z.key; D !== null; ) {
                if (D.key === Ze) if (D.tag === 4 && D.stateNode.containerInfo === z.containerInfo && D.stateNode.implementation === z.implementation) {
                  l(M, D.sibling), D = c(D, z.children || []), D.return = M, M = D;
                  break e;
                } else {
                  l(M, D);
                  break;
                }
                else r(M, D);
                D = D.sibling;
              }
              D = Vs(z, M.mode, ue), D.return = M, M = D;
            }
            return y(M);
          case Tt:
            return Ze = z._init, jn(M, D, Ze(z._payload), ue);
        }
        if (Jn(z)) return ke(M, D, z, ue);
        if (Ue(z)) return Ae(M, D, z, ue);
        Di(M, z);
      }
      return typeof z == "string" && z !== "" || typeof z == "number" ? (z = "" + z, D !== null && D.tag === 6 ? (l(M, D.sibling), D = c(D, z), D.return = M, M = D) : (l(M, D), D = Sf(z, M.mode, ue), D.return = M, M = D), y(M)) : l(M, D);
    }
    return jn;
  }
  var fo = Mc(!0), Kv = Mc(!1), Ji = ft(null), Wn = null, ve = null, Ia = null;
  function xa() {
    Ia = ve = Wn = null;
  }
  function zd(n) {
    var r = Ji.current;
    Pt(Ji), n._currentValue = r;
  }
  function Ud(n, r, l) {
    for (; n !== null; ) {
      var o = n.alternate;
      if ((n.childLanes & r) !== r ? (n.childLanes |= r, o !== null && (o.childLanes |= r)) : o !== null && (o.childLanes & r) !== r && (o.childLanes |= r), n === l) break;
      n = n.return;
    }
  }
  function po(n, r) {
    Wn = n, Ia = ve = null, n = n.dependencies, n !== null && n.firstContext !== null && (n.lanes & r && (sa = !0), n.firstContext = null);
  }
  function Ya(n) {
    var r = n._currentValue;
    if (Ia !== n) if (n = { context: n, memoizedValue: r, next: null }, ve === null) {
      if (Wn === null) throw Error(R(308));
      ve = n, Wn.dependencies = { lanes: 0, firstContext: n };
    } else ve = ve.next = n;
    return r;
  }
  var gu = null;
  function Bn(n) {
    gu === null ? gu = [n] : gu.push(n);
  }
  function Xv(n, r, l, o) {
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
  function vo(n, r) {
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
      o &= n.pendingLanes, l |= o, r.lanes = l, wi(n, l);
    }
  }
  function Zv(n, r) {
    var l = n.updateQueue, o = n.alternate;
    if (o !== null && (o = o.updateQueue, l === o)) {
      var c = null, d = null;
      if (l = l.firstBaseUpdate, l !== null) {
        do {
          var y = { eventTime: l.eventTime, lane: l.lane, tag: l.tag, payload: l.payload, callback: l.callback, next: null };
          d === null ? c = d = y : d = d.next = y, l = l.next;
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
    var d = c.firstBaseUpdate, y = c.lastBaseUpdate, T = c.shared.pending;
    if (T !== null) {
      c.shared.pending = null;
      var x = T, j = x.next;
      x.next = null, y === null ? d = j : y.next = j, y = x;
      var ee = n.alternate;
      ee !== null && (ee = ee.updateQueue, T = ee.lastBaseUpdate, T !== y && (T === null ? ee.firstBaseUpdate = j : T.next = j, ee.lastBaseUpdate = x));
    }
    if (d !== null) {
      var te = c.baseState;
      y = 0, ee = j = x = null, T = d;
      do {
        var Z = T.lane, Ce = T.eventTime;
        if ((o & Z) === Z) {
          ee !== null && (ee = ee.next = {
            eventTime: Ce,
            lane: 0,
            tag: T.tag,
            payload: T.payload,
            callback: T.callback,
            next: null
          });
          e: {
            var ke = n, Ae = T;
            switch (Z = r, Ce = l, Ae.tag) {
              case 1:
                if (ke = Ae.payload, typeof ke == "function") {
                  te = ke.call(Ce, te, Z);
                  break e;
                }
                te = ke;
                break e;
              case 3:
                ke.flags = ke.flags & -65537 | 128;
              case 0:
                if (ke = Ae.payload, Z = typeof ke == "function" ? ke.call(Ce, te, Z) : ke, Z == null) break e;
                te = pe({}, te, Z);
                break e;
              case 2:
                Ul = !0;
            }
          }
          T.callback !== null && T.lane !== 0 && (n.flags |= 64, Z = c.effects, Z === null ? c.effects = [T] : Z.push(T));
        } else Ce = { eventTime: Ce, lane: Z, tag: T.tag, payload: T.payload, callback: T.callback, next: null }, ee === null ? (j = ee = Ce, x = te) : ee = ee.next = Ce, y |= Z;
        if (T = T.next, T === null) {
          if (T = c.shared.pending, T === null) break;
          Z = T, T = Z.next, Z.next = null, c.lastBaseUpdate = Z, c.shared.pending = null;
        }
      } while (!0);
      if (ee === null && (x = te), c.baseState = x, c.firstBaseUpdate = j, c.lastBaseUpdate = ee, r = c.shared.interleaved, r !== null) {
        c = r;
        do
          y |= c.lane, c = c.next;
        while (c !== r);
      } else d === null && (c.shared.lanes = 0);
      Du |= y, n.lanes = y, n.memoizedState = te;
    }
  }
  function Jv(n, r, l) {
    if (n = r.effects, r.effects = null, n !== null) for (r = 0; r < n.length; r++) {
      var o = n[r], c = o.callback;
      if (c !== null) {
        if (o.callback = null, o = l, typeof c != "function") throw Error(R(191, c));
        c.call(o);
      }
    }
  }
  var ws = {}, vi = ft(ws), ho = ft(ws), bs = ft(ws);
  function Su(n) {
    if (n === ws) throw Error(R(174));
    return n;
  }
  function Fd(n, r) {
    switch (Yt(bs, r), Yt(ho, n), Yt(vi, ws), n = r.nodeType, n) {
      case 9:
      case 11:
        r = (r = r.documentElement) ? r.namespaceURI : Rn(null, "");
        break;
      default:
        n = n === 8 ? r.parentNode : r, r = n.namespaceURI || null, n = n.tagName, r = Rn(r, n);
    }
    Pt(vi), Yt(vi, r);
  }
  function mo() {
    Pt(vi), Pt(ho), Pt(bs);
  }
  function eh(n) {
    Su(bs.current);
    var r = Su(vi.current), l = Rn(r, n.type);
    r !== l && (Yt(ho, n), Yt(vi, l));
  }
  function jd(n) {
    ho.current === n && (Pt(vi), Pt(ho));
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
  function Pd() {
    for (var n = 0; n < Uc.length; n++) Uc[n]._workInProgressVersionPrimary = null;
    Uc.length = 0;
  }
  var Fc = Ne.ReactCurrentDispatcher, xs = Ne.ReactCurrentBatchConfig, Fe = 0, He = null, rt = null, gt = null, _a = !1, yo = !1, _s = 0, Py = 0;
  function xr() {
    throw Error(R(321));
  }
  function Ds(n, r) {
    if (r === null) return !1;
    for (var l = 0; l < r.length && l < n.length; l++) if (!ja(n[l], r[l])) return !1;
    return !0;
  }
  function X(n, r, l, o, c, d) {
    if (Fe = d, He = r, r.memoizedState = null, r.updateQueue = null, r.lanes = 0, Fc.current = n === null || n.memoizedState === null ? Hy : cn, n = l(o, c), yo) {
      d = 0;
      do {
        if (yo = !1, _s = 0, 25 <= d) throw Error(R(301));
        d += 1, gt = rt = null, r.updateQueue = null, Fc.current = Zc, n = l(o, c);
      } while (yo);
    }
    if (Fc.current = _r, r = rt !== null && rt.next !== null, Fe = 0, gt = rt = He = null, _a = !1, r) throw Error(R(300));
    return n;
  }
  function In() {
    var n = _s !== 0;
    return _s = 0, n;
  }
  function Be() {
    var n = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
    return gt === null ? He.memoizedState = gt = n : gt = gt.next = n, gt;
  }
  function fr() {
    if (rt === null) {
      var n = He.alternate;
      n = n !== null ? n.memoizedState : null;
    } else n = rt.next;
    var r = gt === null ? He.memoizedState : gt.next;
    if (r !== null) gt = r, rt = n;
    else {
      if (n === null) throw Error(R(310));
      rt = n, n = { memoizedState: rt.memoizedState, baseState: rt.baseState, baseQueue: rt.baseQueue, queue: rt.queue, next: null }, gt === null ? He.memoizedState = gt = n : gt = gt.next = n;
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
        var y = c.next;
        c.next = d.next, d.next = y;
      }
      o.baseQueue = c = d, l.pending = null;
    }
    if (c !== null) {
      d = c.next, o = o.baseState;
      var T = y = null, x = null, j = d;
      do {
        var ee = j.lane;
        if ((Fe & ee) === ee) x !== null && (x = x.next = { lane: 0, action: j.action, hasEagerState: j.hasEagerState, eagerState: j.eagerState, next: null }), o = j.hasEagerState ? j.eagerState : n(o, j.action);
        else {
          var te = {
            lane: ee,
            action: j.action,
            hasEagerState: j.hasEagerState,
            eagerState: j.eagerState,
            next: null
          };
          x === null ? (T = x = te, y = o) : x = x.next = te, He.lanes |= ee, Du |= ee;
        }
        j = j.next;
      } while (j !== null && j !== d);
      x === null ? y = o : x.next = T, ja(o, r.memoizedState) || (sa = !0), r.memoizedState = o, r.baseState = y, r.baseQueue = x, l.lastRenderedState = o;
    }
    if (n = l.interleaved, n !== null) {
      c = n;
      do
        d = c.lane, He.lanes |= d, Du |= d, c = c.next;
      while (c !== n);
    } else c === null && (l.lanes = 0);
    return [r.memoizedState, l.dispatch];
  }
  function Wa(n) {
    var r = fr(), l = r.queue;
    if (l === null) throw Error(R(311));
    l.lastRenderedReducer = n;
    var o = l.dispatch, c = l.pending, d = r.memoizedState;
    if (c !== null) {
      l.pending = null;
      var y = c = c.next;
      do
        d = n(d, y.action), y = y.next;
      while (y !== c);
      ja(d, r.memoizedState) || (sa = !0), r.memoizedState = d, r.baseQueue === null && (r.baseState = d), l.lastRenderedState = d;
    }
    return [d, o];
  }
  function go() {
  }
  function Eu(n, r) {
    var l = He, o = fr(), c = r(), d = !ja(o.memoizedState, c);
    if (d && (o.memoizedState = c, sa = !0), o = o.queue, ks(Pc.bind(null, l, o, n), [n]), o.getSnapshot !== r || d || gt !== null && gt.memoizedState.tag & 1) {
      if (l.flags |= 2048, Cu(9, jc.bind(null, l, o, c, r), void 0, null), Ln === null) throw Error(R(349));
      Fe & 30 || So(l, r, c);
    }
    return c;
  }
  function So(n, r, l) {
    n.flags |= 16384, n = { getSnapshot: r, value: l }, r = He.updateQueue, r === null ? (r = { lastEffect: null, stores: null }, He.updateQueue = r, r.stores = [n]) : (l = r.stores, l === null ? r.stores = [n] : l.push(n));
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
      return !ja(n, l);
    } catch {
      return !0;
    }
  }
  function Vc(n) {
    var r = el(n, 1);
    r !== null && xn(r, n, 1, -1);
  }
  function $c(n) {
    var r = Be();
    return typeof n == "function" && (n = n()), r.memoizedState = r.baseState = n, n = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: Da, lastRenderedState: n }, r.queue = n, n = n.dispatch = Os.bind(null, He, n), [r.memoizedState, n];
  }
  function Cu(n, r, l, o) {
    return n = { tag: n, create: r, destroy: l, deps: o, next: null }, r = He.updateQueue, r === null ? (r = { lastEffect: null, stores: null }, He.updateQueue = r, r.lastEffect = n.next = n) : (l = r.lastEffect, l === null ? r.lastEffect = n.next = n : (o = l.next, l.next = n, n.next = o, r.lastEffect = n)), n;
  }
  function Bc() {
    return fr().memoizedState;
  }
  function Eo(n, r, l, o) {
    var c = Be();
    He.flags |= n, c.memoizedState = Cu(1 | r, l, void 0, o === void 0 ? null : o);
  }
  function Co(n, r, l, o) {
    var c = fr();
    o = o === void 0 ? null : o;
    var d = void 0;
    if (rt !== null) {
      var y = rt.memoizedState;
      if (d = y.destroy, o !== null && Ds(o, y.deps)) {
        c.memoizedState = Cu(r, l, d, o);
        return;
      }
    }
    He.flags |= n, c.memoizedState = Cu(1 | r, l, d, o);
  }
  function Ic(n, r) {
    return Eo(8390656, 8, n, r);
  }
  function ks(n, r) {
    return Co(2048, 8, n, r);
  }
  function Yc(n, r) {
    return Co(4, 2, n, r);
  }
  function Wc(n, r) {
    return Co(4, 4, n, r);
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
    return l = l != null ? l.concat([n]) : null, Co(4, 4, Qc.bind(null, r, n), l);
  }
  function Ro() {
  }
  function Ru(n, r) {
    var l = fr();
    r = r === void 0 ? null : r;
    var o = l.memoizedState;
    return o !== null && r !== null && Ds(r, o[1]) ? o[0] : (l.memoizedState = [n, r], n);
  }
  function qc(n, r) {
    var l = fr();
    r = r === void 0 ? null : r;
    var o = l.memoizedState;
    return o !== null && r !== null && Ds(r, o[1]) ? o[0] : (n = n(), l.memoizedState = [n, r], n);
  }
  function Kc(n, r, l) {
    return Fe & 21 ? (ja(l, r) || (l = Gu(), He.lanes |= l, Du |= l, n.baseState = !0), r) : (n.baseState && (n.baseState = !1, sa = !0), n.memoizedState = l);
  }
  function Hd(n, r) {
    var l = At;
    At = l !== 0 && 4 > l ? l : 4, n(!0);
    var o = xs.transition;
    xs.transition = {};
    try {
      n(!1), r();
    } finally {
      At = l, xs.transition = o;
    }
  }
  function Xc() {
    return fr().memoizedState;
  }
  function th(n, r, l) {
    var o = al(n);
    if (l = { lane: o, action: l, hasEagerState: !1, eagerState: null, next: null }, Vd(n)) To(r, l);
    else if (l = Xv(n, r, l, o), l !== null) {
      var c = lr();
      xn(l, n, o, c), jl(l, r, o);
    }
  }
  function Os(n, r, l) {
    var o = al(n), c = { lane: o, action: l, hasEagerState: !1, eagerState: null, next: null };
    if (Vd(n)) To(r, c);
    else {
      var d = n.alternate;
      if (n.lanes === 0 && (d === null || d.lanes === 0) && (d = r.lastRenderedReducer, d !== null)) try {
        var y = r.lastRenderedState, T = d(y, l);
        if (c.hasEagerState = !0, c.eagerState = T, ja(T, y)) {
          var x = r.interleaved;
          x === null ? (c.next = c, Bn(r)) : (c.next = x.next, x.next = c), r.interleaved = c;
          return;
        }
      } catch {
      } finally {
      }
      l = Xv(n, r, c, o), l !== null && (c = lr(), xn(l, n, o, c), jl(l, r, o));
    }
  }
  function Vd(n) {
    var r = n.alternate;
    return n === He || r !== null && r === He;
  }
  function To(n, r) {
    yo = _a = !0;
    var l = n.pending;
    l === null ? r.next = r : (r.next = l.next, l.next = r), n.pending = r;
  }
  function jl(n, r, l) {
    if (l & 4194240) {
      var o = r.lanes;
      o &= n.pendingLanes, l |= o, r.lanes = l, wi(n, l);
    }
  }
  var _r = { readContext: Ya, useCallback: xr, useContext: xr, useEffect: xr, useImperativeHandle: xr, useInsertionEffect: xr, useLayoutEffect: xr, useMemo: xr, useReducer: xr, useRef: xr, useState: xr, useDebugValue: xr, useDeferredValue: xr, useTransition: xr, useMutableSource: xr, useSyncExternalStore: xr, useId: xr, unstable_isNewReconciler: !1 }, Hy = { readContext: Ya, useCallback: function(n, r) {
    return Be().memoizedState = [n, r === void 0 ? null : r], n;
  }, useContext: Ya, useEffect: Ic, useImperativeHandle: function(n, r, l) {
    return l = l != null ? l.concat([n]) : null, Eo(
      4194308,
      4,
      Qc.bind(null, r, n),
      l
    );
  }, useLayoutEffect: function(n, r) {
    return Eo(4194308, 4, n, r);
  }, useInsertionEffect: function(n, r) {
    return Eo(4, 2, n, r);
  }, useMemo: function(n, r) {
    var l = Be();
    return r = r === void 0 ? null : r, n = n(), l.memoizedState = [n, r], n;
  }, useReducer: function(n, r, l) {
    var o = Be();
    return r = l !== void 0 ? l(r) : r, o.memoizedState = o.baseState = r, n = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: n, lastRenderedState: r }, o.queue = n, n = n.dispatch = th.bind(null, He, n), [o.memoizedState, n];
  }, useRef: function(n) {
    var r = Be();
    return n = { current: n }, r.memoizedState = n;
  }, useState: $c, useDebugValue: Ro, useDeferredValue: function(n) {
    return Be().memoizedState = n;
  }, useTransition: function() {
    var n = $c(!1), r = n[0];
    return n = Hd.bind(null, n[1]), Be().memoizedState = n, [r, n];
  }, useMutableSource: function() {
  }, useSyncExternalStore: function(n, r, l) {
    var o = He, c = Be();
    if (pn) {
      if (l === void 0) throw Error(R(407));
      l = l();
    } else {
      if (l = r(), Ln === null) throw Error(R(349));
      Fe & 30 || So(o, r, l);
    }
    c.memoizedState = l;
    var d = { value: l, getSnapshot: r };
    return c.queue = d, Ic(Pc.bind(
      null,
      o,
      d,
      n
    ), [n]), o.flags |= 2048, Cu(9, jc.bind(null, o, d, l, r), void 0, null), l;
  }, useId: function() {
    var n = Be(), r = Ln.identifierPrefix;
    if (pn) {
      var l = Zi, o = cr;
      l = (o & ~(1 << 32 - Ar(o) - 1)).toString(32) + l, r = ":" + r + "R" + l, l = _s++, 0 < l && (r += "H" + l.toString(32)), r += ":";
    } else l = Py++, r = ":" + r + "r" + l.toString(32) + ":";
    return n.memoizedState = r;
  }, unstable_isNewReconciler: !1 }, cn = {
    readContext: Ya,
    useCallback: Ru,
    useContext: Ya,
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
    useDebugValue: Ro,
    useDeferredValue: function(n) {
      var r = fr();
      return Kc(r, rt.memoizedState, n);
    },
    useTransition: function() {
      var n = tl(Da)[0], r = fr().memoizedState;
      return [n, r];
    },
    useMutableSource: go,
    useSyncExternalStore: Eu,
    useId: Xc,
    unstable_isNewReconciler: !1
  }, Zc = { readContext: Ya, useCallback: Ru, useContext: Ya, useEffect: ks, useImperativeHandle: Gc, useInsertionEffect: Yc, useLayoutEffect: Wc, useMemo: qc, useReducer: Wa, useRef: Bc, useState: function() {
    return Wa(Da);
  }, useDebugValue: Ro, useDeferredValue: function(n) {
    var r = fr();
    return rt === null ? r.memoizedState = n : Kc(r, rt.memoizedState, n);
  }, useTransition: function() {
    var n = Wa(Da)[0], r = fr().memoizedState;
    return [n, r];
  }, useMutableSource: go, useSyncExternalStore: Eu, useId: Xc, unstable_isNewReconciler: !1 };
  function oa(n, r) {
    if (n && n.defaultProps) {
      r = pe({}, r), n = n.defaultProps;
      for (var l in n) r[l] === void 0 && (r[l] = n[l]);
      return r;
    }
    return r;
  }
  function Tu(n, r, l, o) {
    r = n.memoizedState, l = l(o, r), l = l == null ? r : pe({}, r, l), n.memoizedState = l, n.lanes === 0 && (n.updateQueue.baseState = l);
  }
  var wu = { isMounted: function(n) {
    return (n = n._reactInternals) ? Pe(n) === n : !1;
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
  function nh(n, r, l, o, c, d, y) {
    return n = n.stateNode, typeof n.shouldComponentUpdate == "function" ? n.shouldComponentUpdate(o, d, y) : r.prototype && r.prototype.isPureReactComponent ? !ds(l, o) || !ds(c, d) : !0;
  }
  function rh(n, r, l) {
    var o = !1, c = _i, d = r.contextType;
    return typeof d == "object" && d !== null ? d = Ya(d) : (c = yn(r) ? na : nt.current, o = r.contextTypes, d = (o = o != null) ? Ha(n, c) : _i), r = new r(l, d), n.memoizedState = r.state !== null && r.state !== void 0 ? r.state : null, r.updater = wu, n.stateNode = r, r._reactInternals = n, o && (n = n.stateNode, n.__reactInternalMemoizedUnmaskedChildContext = c, n.__reactInternalMemoizedMaskedChildContext = d), r;
  }
  function ah(n, r, l, o) {
    n = r.state, typeof r.componentWillReceiveProps == "function" && r.componentWillReceiveProps(l, o), typeof r.UNSAFE_componentWillReceiveProps == "function" && r.UNSAFE_componentWillReceiveProps(l, o), r.state !== n && wu.enqueueReplaceState(r, r.state, null);
  }
  function $d(n, r, l, o) {
    var c = n.stateNode;
    c.props = l, c.state = n.memoizedState, c.refs = {}, Lc(n);
    var d = r.contextType;
    typeof d == "object" && d !== null ? c.context = Ya(d) : (d = yn(r) ? na : nt.current, c.context = Ha(n, d)), c.state = n.memoizedState, d = r.getDerivedStateFromProps, typeof d == "function" && (Tu(n, r, d, l), c.state = n.memoizedState), typeof r.getDerivedStateFromProps == "function" || typeof c.getSnapshotBeforeUpdate == "function" || typeof c.UNSAFE_componentWillMount != "function" && typeof c.componentWillMount != "function" || (r = c.state, typeof c.componentWillMount == "function" && c.componentWillMount(), typeof c.UNSAFE_componentWillMount == "function" && c.UNSAFE_componentWillMount(), r !== c.state && wu.enqueueReplaceState(c, c.state, null), Ac(n, l, c, o), c.state = n.memoizedState), typeof c.componentDidMount == "function" && (n.flags |= 4194308);
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
  function Bd(n, r, l) {
    return { value: n, source: null, stack: l ?? null, digest: r ?? null };
  }
  function Ms(n, r) {
    try {
      console.error(r.value);
    } catch (l) {
      setTimeout(function() {
        throw l;
      });
    }
  }
  var ih = typeof WeakMap == "function" ? WeakMap : Map;
  function lh(n, r, l) {
    l = ua(-1, l), l.tag = 3, l.payload = { element: null };
    var o = r.value;
    return l.callback = function() {
      ff || (ff = !0, Zd = o), Ms(n, r);
    }, l;
  }
  function uh(n, r, l) {
    l = ua(-1, l), l.tag = 3;
    var o = n.type.getDerivedStateFromError;
    if (typeof o == "function") {
      var c = r.value;
      l.payload = function() {
        return o(c);
      }, l.callback = function() {
        Ms(n, r);
      };
    }
    var d = n.stateNode;
    return d !== null && typeof d.componentDidCatch == "function" && (l.callback = function() {
      Ms(n, r), typeof o != "function" && (qa === null ? qa = /* @__PURE__ */ new Set([this]) : qa.add(this));
      var y = r.stack;
      this.componentDidCatch(r.value, { componentStack: y !== null ? y : "" });
    }), l;
  }
  function Ls(n, r, l) {
    var o = n.pingCache;
    if (o === null) {
      o = n.pingCache = new ih();
      var c = /* @__PURE__ */ new Set();
      o.set(r, c);
    } else c = o.get(r), c === void 0 && (c = /* @__PURE__ */ new Set(), o.set(r, c));
    c.has(l) || (c.add(l), n = Ky.bind(null, n, r, l), r.then(n, n));
  }
  function oh(n) {
    do {
      var r;
      if ((r = n.tag === 13) && (r = n.memoizedState, r = r !== null ? r.dehydrated !== null : !0), r) return n;
      n = n.return;
    } while (n !== null);
    return null;
  }
  function Id(n, r, l, o, c) {
    return n.mode & 1 ? (n.flags |= 65536, n.lanes = c, n) : (n === r ? n.flags |= 65536 : (n.flags |= 128, l.flags |= 131072, l.flags &= -52805, l.tag === 1 && (l.alternate === null ? l.tag = 17 : (r = ua(-1, 1), r.tag = 2, Fl(l, r, 1))), l.lanes |= 1), n);
  }
  var sh = Ne.ReactCurrentOwner, sa = !1;
  function Un(n, r, l, o) {
    r.child = n === null ? Kv(r, null, l, o) : fo(r, n.child, l, o);
  }
  function wo(n, r, l, o, c) {
    l = l.render;
    var d = r.ref;
    return po(r, c), o = X(n, r, l, o, d, c), l = In(), n !== null && !sa ? (r.updateQueue = n.updateQueue, r.flags &= -2053, n.lanes &= ~c, Fn(n, r, c)) : (pn && l && xc(r), r.flags |= 1, Un(n, r, o, c), r.child);
  }
  function Hl(n, r, l, o, c) {
    if (n === null) {
      var d = l.type;
      return typeof d == "function" && !rp(d) && d.defaultProps === void 0 && l.compare === null && l.defaultProps === void 0 ? (r.tag = 15, r.type = d, Jc(n, r, d, o, c)) : (n = yf(l.type, null, o, r, r.mode, c), n.ref = r.ref, n.return = r, r.child = n);
    }
    if (d = n.child, !(n.lanes & c)) {
      var y = d.memoizedProps;
      if (l = l.compare, l = l !== null ? l : ds, l(y, o) && n.ref === r.ref) return Fn(n, r, c);
    }
    return r.flags |= 1, n = Bl(d, o), n.ref = r.ref, n.return = r, r.child = n;
  }
  function Jc(n, r, l, o, c) {
    if (n !== null) {
      var d = n.memoizedProps;
      if (ds(d, o) && n.ref === r.ref) if (sa = !1, r.pendingProps = o = d, (n.lanes & c) !== 0) n.flags & 131072 && (sa = !0);
      else return r.lanes = n.lanes, Fn(n, r, c);
    }
    return st(n, r, l, o, c);
  }
  function ca(n, r, l) {
    var o = r.pendingProps, c = o.children, d = n !== null ? n.memoizedState : null;
    if (o.mode === "hidden") if (!(r.mode & 1)) r.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, Yt(Ao, fa), fa |= l;
    else {
      if (!(l & 1073741824)) return n = d !== null ? d.baseLanes | l : l, r.lanes = r.childLanes = 1073741824, r.memoizedState = { baseLanes: n, cachePool: null, transitions: null }, r.updateQueue = null, Yt(Ao, fa), fa |= n, null;
      r.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, o = d !== null ? d.baseLanes : l, Yt(Ao, fa), fa |= o;
    }
    else d !== null ? (o = d.baseLanes | l, r.memoizedState = null) : o = l, Yt(Ao, fa), fa |= o;
    return Un(n, r, c, l), r.child;
  }
  function bu(n, r) {
    var l = r.ref;
    (n === null && l !== null || n !== null && n.ref !== l) && (r.flags |= 512, r.flags |= 2097152);
  }
  function st(n, r, l, o, c) {
    var d = yn(l) ? na : nt.current;
    return d = Ha(r, d), po(r, c), l = X(n, r, l, o, d, c), o = In(), n !== null && !sa ? (r.updateQueue = n.updateQueue, r.flags &= -2053, n.lanes &= ~c, Fn(n, r, c)) : (pn && o && xc(r), r.flags |= 1, Un(n, r, l, c), r.child);
  }
  function Ns(n, r, l, o, c) {
    if (yn(l)) {
      var d = !0;
      bc(r);
    } else d = !1;
    if (po(r, c), r.stateNode === null) zs(n, r), rh(r, l, o), $d(r, l, o, c), o = !0;
    else if (n === null) {
      var y = r.stateNode, T = r.memoizedProps;
      y.props = T;
      var x = y.context, j = l.contextType;
      typeof j == "object" && j !== null ? j = Ya(j) : (j = yn(l) ? na : nt.current, j = Ha(r, j));
      var ee = l.getDerivedStateFromProps, te = typeof ee == "function" || typeof y.getSnapshotBeforeUpdate == "function";
      te || typeof y.UNSAFE_componentWillReceiveProps != "function" && typeof y.componentWillReceiveProps != "function" || (T !== o || x !== j) && ah(r, y, o, j), Ul = !1;
      var Z = r.memoizedState;
      y.state = Z, Ac(r, o, y, c), x = r.memoizedState, T !== o || Z !== x || On.current || Ul ? (typeof ee == "function" && (Tu(r, l, ee, o), x = r.memoizedState), (T = Ul || nh(r, l, T, o, Z, x, j)) ? (te || typeof y.UNSAFE_componentWillMount != "function" && typeof y.componentWillMount != "function" || (typeof y.componentWillMount == "function" && y.componentWillMount(), typeof y.UNSAFE_componentWillMount == "function" && y.UNSAFE_componentWillMount()), typeof y.componentDidMount == "function" && (r.flags |= 4194308)) : (typeof y.componentDidMount == "function" && (r.flags |= 4194308), r.memoizedProps = o, r.memoizedState = x), y.props = o, y.state = x, y.context = j, o = T) : (typeof y.componentDidMount == "function" && (r.flags |= 4194308), o = !1);
    } else {
      y = r.stateNode, vo(n, r), T = r.memoizedProps, j = r.type === r.elementType ? T : oa(r.type, T), y.props = j, te = r.pendingProps, Z = y.context, x = l.contextType, typeof x == "object" && x !== null ? x = Ya(x) : (x = yn(l) ? na : nt.current, x = Ha(r, x));
      var Ce = l.getDerivedStateFromProps;
      (ee = typeof Ce == "function" || typeof y.getSnapshotBeforeUpdate == "function") || typeof y.UNSAFE_componentWillReceiveProps != "function" && typeof y.componentWillReceiveProps != "function" || (T !== te || Z !== x) && ah(r, y, o, x), Ul = !1, Z = r.memoizedState, y.state = Z, Ac(r, o, y, c);
      var ke = r.memoizedState;
      T !== te || Z !== ke || On.current || Ul ? (typeof Ce == "function" && (Tu(r, l, Ce, o), ke = r.memoizedState), (j = Ul || nh(r, l, j, o, Z, ke, x) || !1) ? (ee || typeof y.UNSAFE_componentWillUpdate != "function" && typeof y.componentWillUpdate != "function" || (typeof y.componentWillUpdate == "function" && y.componentWillUpdate(o, ke, x), typeof y.UNSAFE_componentWillUpdate == "function" && y.UNSAFE_componentWillUpdate(o, ke, x)), typeof y.componentDidUpdate == "function" && (r.flags |= 4), typeof y.getSnapshotBeforeUpdate == "function" && (r.flags |= 1024)) : (typeof y.componentDidUpdate != "function" || T === n.memoizedProps && Z === n.memoizedState || (r.flags |= 4), typeof y.getSnapshotBeforeUpdate != "function" || T === n.memoizedProps && Z === n.memoizedState || (r.flags |= 1024), r.memoizedProps = o, r.memoizedState = ke), y.props = o, y.state = ke, y.context = x, o = j) : (typeof y.componentDidUpdate != "function" || T === n.memoizedProps && Z === n.memoizedState || (r.flags |= 4), typeof y.getSnapshotBeforeUpdate != "function" || T === n.memoizedProps && Z === n.memoizedState || (r.flags |= 1024), o = !1);
    }
    return ef(n, r, l, o, d, c);
  }
  function ef(n, r, l, o, c, d) {
    bu(n, r);
    var y = (r.flags & 128) !== 0;
    if (!o && !y) return c && Yv(r, l, !1), Fn(n, r, d);
    o = r.stateNode, sh.current = r;
    var T = y && typeof l.getDerivedStateFromError != "function" ? null : o.render();
    return r.flags |= 1, n !== null && y ? (r.child = fo(r, n.child, null, d), r.child = fo(r, null, T, d)) : Un(n, r, T, d), r.memoizedState = o.state, c && Yv(r, l, !0), r.child;
  }
  function Vy(n) {
    var r = n.stateNode;
    r.pendingContext ? Al(n, r.pendingContext, r.pendingContext !== r.context) : r.context && Al(n, r.context, !1), Fd(n, r.containerInfo);
  }
  function ch(n, r, l, o, c) {
    return bn(), Ad(c), r.flags |= 256, Un(n, r, l, o), r.child;
  }
  var As = { dehydrated: null, treeContext: null, retryLane: 0 };
  function xu(n) {
    return { baseLanes: n, cachePool: null, transitions: null };
  }
  function fh(n, r, l) {
    var o = r.pendingProps, c = gn.current, d = !1, y = (r.flags & 128) !== 0, T;
    if ((T = y) || (T = n !== null && n.memoizedState === null ? !1 : (c & 2) !== 0), T ? (d = !0, r.flags &= -129) : (n === null || n.memoizedState !== null) && (c |= 1), Yt(gn, c & 1), n === null)
      return Dc(r), n = r.memoizedState, n !== null && (n = n.dehydrated, n !== null) ? (r.mode & 1 ? n.data === "$!" ? r.lanes = 8 : r.lanes = 1073741824 : r.lanes = 1, null) : (y = o.children, n = o.fallback, d ? (o = r.mode, d = r.child, y = { mode: "hidden", children: y }, !(o & 1) && d !== null ? (d.childLanes = 0, d.pendingProps = y) : d = gf(y, o, 0, null), n = Lu(n, o, l, null), d.return = r, n.return = r, d.sibling = n, r.child = d, r.child.memoizedState = xu(l), r.memoizedState = As, n) : tf(r, y));
    if (c = n.memoizedState, c !== null && (T = c.dehydrated, T !== null)) return Yd(n, r, y, o, T, c, l);
    if (d) {
      d = o.fallback, y = r.mode, c = n.child, T = c.sibling;
      var x = { mode: "hidden", children: o.children };
      return !(y & 1) && r.child !== c ? (o = r.child, o.childLanes = 0, o.pendingProps = x, r.deletions = null) : (o = Bl(c, x), o.subtreeFlags = c.subtreeFlags & 14680064), T !== null ? d = Bl(T, d) : (d = Lu(d, y, l, null), d.flags |= 2), d.return = r, o.return = r, o.sibling = d, r.child = o, o = d, d = r.child, y = n.child.memoizedState, y = y === null ? xu(l) : { baseLanes: y.baseLanes | l, cachePool: null, transitions: y.transitions }, d.memoizedState = y, d.childLanes = n.childLanes & ~l, r.memoizedState = As, o;
    }
    return d = n.child, n = d.sibling, o = Bl(d, { mode: "visible", children: o.children }), !(r.mode & 1) && (o.lanes = l), o.return = r, o.sibling = null, n !== null && (l = r.deletions, l === null ? (r.deletions = [n], r.flags |= 16) : l.push(n)), r.child = o, r.memoizedState = null, o;
  }
  function tf(n, r) {
    return r = gf({ mode: "visible", children: r }, n.mode, 0, null), r.return = n, n.child = r;
  }
  function nf(n, r, l, o) {
    return o !== null && Ad(o), fo(r, n.child, null, l), n = tf(r, r.pendingProps.children), n.flags |= 2, r.memoizedState = null, n;
  }
  function Yd(n, r, l, o, c, d, y) {
    if (l)
      return r.flags & 256 ? (r.flags &= -257, o = Bd(Error(R(422))), nf(n, r, y, o)) : r.memoizedState !== null ? (r.child = n.child, r.flags |= 128, null) : (d = o.fallback, c = r.mode, o = gf({ mode: "visible", children: o.children }, c, 0, null), d = Lu(d, c, y, null), d.flags |= 2, o.return = r, d.return = r, o.sibling = d, r.child = o, r.mode & 1 && fo(r, n.child, null, y), r.child.memoizedState = xu(y), r.memoizedState = As, d);
    if (!(r.mode & 1)) return nf(n, r, y, null);
    if (c.data === "$!") {
      if (o = c.nextSibling && c.nextSibling.dataset, o) var T = o.dgst;
      return o = T, d = Error(R(419)), o = Bd(d, o, void 0), nf(n, r, y, o);
    }
    if (T = (y & n.childLanes) !== 0, sa || T) {
      if (o = Ln, o !== null) {
        switch (y & -y) {
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
        c = c & (o.suspendedLanes | y) ? 0 : c, c !== 0 && c !== d.retryLane && (d.retryLane = c, el(n, c), xn(o, n, c, -1));
      }
      return Hs(), o = Bd(Error(R(421))), nf(n, r, y, o);
    }
    return c.data === "$?" ? (r.flags |= 128, r.child = n.child, r = np.bind(null, n), c._reactRetry = r, null) : (n = d.treeContext, la = pi(c.nextSibling), ba = r, pn = !0, Ba = null, n !== null && (ia[br++] = cr, ia[br++] = Zi, ia[br++] = $a, cr = n.id, Zi = n.overflow, $a = r), r = tf(r, o.children), r.flags |= 4096, r);
  }
  function dh(n, r, l) {
    n.lanes |= r;
    var o = n.alternate;
    o !== null && (o.lanes |= r), Ud(n.return, r, l);
  }
  function rf(n, r, l, o, c) {
    var d = n.memoizedState;
    d === null ? n.memoizedState = { isBackwards: r, rendering: null, renderingStartTime: 0, last: o, tail: l, tailMode: c } : (d.isBackwards = r, d.rendering = null, d.renderingStartTime = 0, d.last = o, d.tail = l, d.tailMode = c);
  }
  function Wd(n, r, l) {
    var o = r.pendingProps, c = o.revealOrder, d = o.tail;
    if (Un(n, r, o.children, l), o = gn.current, o & 2) o = o & 1 | 2, r.flags |= 128;
    else {
      if (n !== null && n.flags & 128) e: for (n = r.child; n !== null; ) {
        if (n.tag === 13) n.memoizedState !== null && dh(n, l, r);
        else if (n.tag === 19) dh(n, l, r);
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
  function zs(n, r) {
    !(r.mode & 1) && n !== null && (n.alternate = null, r.alternate = null, r.flags |= 2);
  }
  function Fn(n, r, l) {
    if (n !== null && (r.dependencies = n.dependencies), Du |= r.lanes, !(l & r.childLanes)) return null;
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
        Vy(r), bn();
        break;
      case 5:
        eh(r);
        break;
      case 1:
        yn(r.type) && bc(r);
        break;
      case 4:
        Fd(r, r.stateNode.containerInfo);
        break;
      case 10:
        var o = r.type._context, c = r.memoizedProps.value;
        Yt(Ji, o._currentValue), o._currentValue = c;
        break;
      case 13:
        if (o = r.memoizedState, o !== null)
          return o.dehydrated !== null ? (Yt(gn, gn.current & 1), r.flags |= 128, null) : l & r.child.childLanes ? fh(n, r, l) : (Yt(gn, gn.current & 1), n = Fn(n, r, l), n !== null ? n.sibling : null);
        Yt(gn, gn.current & 1);
        break;
      case 19:
        if (o = (l & r.childLanes) !== 0, n.flags & 128) {
          if (o) return Wd(n, r, l);
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
  var ki, bo, xo, Qa;
  ki = function(n, r) {
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
  }, bo = function() {
  }, xo = function(n, r, l, o) {
    var c = n.memoizedProps;
    if (c !== o) {
      n = r.stateNode, Su(vi.current);
      var d = null;
      switch (l) {
        case "input":
          c = Cn(n, c), o = Cn(n, o), d = [];
          break;
        case "select":
          c = pe({}, c, { value: void 0 }), o = pe({}, o, { value: void 0 }), d = [];
          break;
        case "textarea":
          c = Kr(n, c), o = Kr(n, o), d = [];
          break;
        default:
          typeof c.onClick != "function" && typeof o.onClick == "function" && (n.onclick = wc);
      }
      zn(l, o);
      var y;
      l = null;
      for (j in c) if (!o.hasOwnProperty(j) && c.hasOwnProperty(j) && c[j] != null) if (j === "style") {
        var T = c[j];
        for (y in T) T.hasOwnProperty(y) && (l || (l = {}), l[y] = "");
      } else j !== "dangerouslySetInnerHTML" && j !== "children" && j !== "suppressContentEditableWarning" && j !== "suppressHydrationWarning" && j !== "autoFocus" && (H.hasOwnProperty(j) ? d || (d = []) : (d = d || []).push(j, null));
      for (j in o) {
        var x = o[j];
        if (T = c?.[j], o.hasOwnProperty(j) && x !== T && (x != null || T != null)) if (j === "style") if (T) {
          for (y in T) !T.hasOwnProperty(y) || x && x.hasOwnProperty(y) || (l || (l = {}), l[y] = "");
          for (y in x) x.hasOwnProperty(y) && T[y] !== x[y] && (l || (l = {}), l[y] = x[y]);
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
  }, Qa = function(n, r, l, o) {
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
  function Dr(n) {
    var r = n.alternate !== null && n.alternate.child === n.child, l = 0, o = 0;
    if (r) for (var c = n.child; c !== null; ) l |= c.lanes | c.childLanes, o |= c.subtreeFlags & 14680064, o |= c.flags & 14680064, c.return = n, c = c.sibling;
    else for (c = n.child; c !== null; ) l |= c.lanes | c.childLanes, o |= c.subtreeFlags, o |= c.flags, c.return = n, c = c.sibling;
    return n.subtreeFlags |= o, n.childLanes = l, r;
  }
  function $y(n, r, l) {
    var o = r.pendingProps;
    switch (Ld(r), r.tag) {
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
        return Dr(r), null;
      case 1:
        return yn(r.type) && Va(), Dr(r), null;
      case 3:
        return o = r.stateNode, mo(), Pt(On), Pt(nt), Pd(), o.pendingContext && (o.context = o.pendingContext, o.pendingContext = null), (n === null || n.child === null) && (kc(r) ? r.flags |= 4 : n === null || n.memoizedState.isDehydrated && !(r.flags & 256) || (r.flags |= 1024, Ba !== null && (Jd(Ba), Ba = null))), bo(n, r), Dr(r), null;
      case 5:
        jd(r);
        var c = Su(bs.current);
        if (l = r.type, n !== null && r.stateNode != null) xo(n, r, l, o, c), n.ref !== r.ref && (r.flags |= 512, r.flags |= 2097152);
        else {
          if (!o) {
            if (r.stateNode === null) throw Error(R(166));
            return Dr(r), null;
          }
          if (n = Su(vi.current), kc(r)) {
            o = r.stateNode, l = r.type;
            var d = r.memoizedProps;
            switch (o[xi] = r, o[hu] = d, n = (r.mode & 1) !== 0, l) {
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
                for (c = 0; c < ms.length; c++) on(ms[c], o);
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
                Dn(o, d), on("invalid", o);
                break;
              case "select":
                o._wrapperState = { wasMultiple: !!d.multiple }, on("invalid", o);
                break;
              case "textarea":
                Rr(o, d), on("invalid", o);
            }
            zn(l, d), c = null;
            for (var y in d) if (d.hasOwnProperty(y)) {
              var T = d[y];
              y === "children" ? typeof T == "string" ? o.textContent !== T && (d.suppressHydrationWarning !== !0 && Tc(o.textContent, T, n), c = ["children", T]) : typeof T == "number" && o.textContent !== "" + T && (d.suppressHydrationWarning !== !0 && Tc(
                o.textContent,
                T,
                n
              ), c = ["children", "" + T]) : H.hasOwnProperty(y) && T != null && y === "onScroll" && on("scroll", o);
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
            y = c.nodeType === 9 ? c : c.ownerDocument, n === "http://www.w3.org/1999/xhtml" && (n = Xr(l)), n === "http://www.w3.org/1999/xhtml" ? l === "script" ? (n = y.createElement("div"), n.innerHTML = "<script><\/script>", n = n.removeChild(n.firstChild)) : typeof o.is == "string" ? n = y.createElement(l, { is: o.is }) : (n = y.createElement(l), l === "select" && (y = n, o.multiple ? y.multiple = !0 : o.size && (y.size = o.size))) : n = y.createElementNS(n, l), n[xi] = r, n[hu] = o, ki(n, r, !1, !1), r.stateNode = n;
            e: {
              switch (y = Tn(l, o), l) {
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
                  for (c = 0; c < ms.length; c++) on(ms[c], n);
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
                  Dn(n, o), c = Cn(n, o), on("invalid", n);
                  break;
                case "option":
                  c = o;
                  break;
                case "select":
                  n._wrapperState = { wasMultiple: !!o.multiple }, c = pe({}, o, { value: void 0 }), on("invalid", n);
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
                d === "style" ? jt(n, x) : d === "dangerouslySetInnerHTML" ? (x = x ? x.__html : void 0, x != null && Si(n, x)) : d === "children" ? typeof x == "string" ? (l !== "textarea" || x !== "") && Sa(n, x) : typeof x == "number" && Sa(n, "" + x) : d !== "suppressContentEditableWarning" && d !== "suppressHydrationWarning" && d !== "autoFocus" && (H.hasOwnProperty(d) ? x != null && d === "onScroll" && on("scroll", n) : x != null && ge(n, d, x, y));
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
        return Dr(r), null;
      case 6:
        if (n && r.stateNode != null) Qa(n, r, n.memoizedProps, o);
        else {
          if (typeof o != "string" && r.stateNode === null) throw Error(R(166));
          if (l = Su(bs.current), Su(vi.current), kc(r)) {
            if (o = r.stateNode, l = r.memoizedProps, o[xi] = r, (d = o.nodeValue !== l) && (n = ba, n !== null)) switch (n.tag) {
              case 3:
                Tc(o.nodeValue, l, (n.mode & 1) !== 0);
                break;
              case 5:
                n.memoizedProps.suppressHydrationWarning !== !0 && Tc(o.nodeValue, l, (n.mode & 1) !== 0);
            }
            d && (r.flags |= 4);
          } else o = (l.nodeType === 9 ? l : l.ownerDocument).createTextNode(o), o[xi] = r, r.stateNode = o;
        }
        return Dr(r), null;
      case 13:
        if (Pt(gn), o = r.memoizedState, n === null || n.memoizedState !== null && n.memoizedState.dehydrated !== null) {
          if (pn && la !== null && r.mode & 1 && !(r.flags & 128)) Gv(), bn(), r.flags |= 98560, d = !1;
          else if (d = kc(r), o !== null && o.dehydrated !== null) {
            if (n === null) {
              if (!d) throw Error(R(318));
              if (d = r.memoizedState, d = d !== null ? d.dehydrated : null, !d) throw Error(R(317));
              d[xi] = r;
            } else bn(), !(r.flags & 128) && (r.memoizedState = null), r.flags |= 4;
            Dr(r), d = !1;
          } else Ba !== null && (Jd(Ba), Ba = null), d = !0;
          if (!d) return r.flags & 65536 ? r : null;
        }
        return r.flags & 128 ? (r.lanes = l, r) : (o = o !== null, o !== (n !== null && n.memoizedState !== null) && o && (r.child.flags |= 8192, r.mode & 1 && (n === null || gn.current & 1 ? Gn === 0 && (Gn = 3) : Hs())), r.updateQueue !== null && (r.flags |= 4), Dr(r), null);
      case 4:
        return mo(), bo(n, r), n === null && oo(r.stateNode.containerInfo), Dr(r), null;
      case 10:
        return zd(r.type._context), Dr(r), null;
      case 17:
        return yn(r.type) && Va(), Dr(r), null;
      case 19:
        if (Pt(gn), d = r.memoizedState, d === null) return Dr(r), null;
        if (o = (r.flags & 128) !== 0, y = d.rendering, y === null) if (o) Mn(d, !1);
        else {
          if (Gn !== 0 || n !== null && n.flags & 128) for (n = r.child; n !== null; ) {
            if (y = zc(n), y !== null) {
              for (r.flags |= 128, Mn(d, !1), o = y.updateQueue, o !== null && (r.updateQueue = o, r.flags |= 4), r.subtreeFlags = 0, o = l, l = r.child; l !== null; ) d = l, n = o, d.flags &= 14680066, y = d.alternate, y === null ? (d.childLanes = 0, d.lanes = n, d.child = null, d.subtreeFlags = 0, d.memoizedProps = null, d.memoizedState = null, d.updateQueue = null, d.dependencies = null, d.stateNode = null) : (d.childLanes = y.childLanes, d.lanes = y.lanes, d.child = y.child, d.subtreeFlags = 0, d.deletions = null, d.memoizedProps = y.memoizedProps, d.memoizedState = y.memoizedState, d.updateQueue = y.updateQueue, d.type = y.type, n = y.dependencies, d.dependencies = n === null ? null : { lanes: n.lanes, firstContext: n.firstContext }), l = l.sibling;
              return Yt(gn, gn.current & 1 | 2), r.child;
            }
            n = n.sibling;
          }
          d.tail !== null && Nt() > Uo && (r.flags |= 128, o = !0, Mn(d, !1), r.lanes = 4194304);
        }
        else {
          if (!o) if (n = zc(y), n !== null) {
            if (r.flags |= 128, o = !0, l = n.updateQueue, l !== null && (r.updateQueue = l, r.flags |= 4), Mn(d, !0), d.tail === null && d.tailMode === "hidden" && !y.alternate && !pn) return Dr(r), null;
          } else 2 * Nt() - d.renderingStartTime > Uo && l !== 1073741824 && (r.flags |= 128, o = !0, Mn(d, !1), r.lanes = 4194304);
          d.isBackwards ? (y.sibling = r.child, r.child = y) : (l = d.last, l !== null ? l.sibling = y : r.child = y, d.last = y);
        }
        return d.tail !== null ? (r = d.tail, d.rendering = r, d.tail = r.sibling, d.renderingStartTime = Nt(), r.sibling = null, l = gn.current, Yt(gn, o ? l & 1 | 2 : l & 1), r) : (Dr(r), null);
      case 22:
      case 23:
        return hf(), o = r.memoizedState !== null, n !== null && n.memoizedState !== null !== o && (r.flags |= 8192), o && r.mode & 1 ? fa & 1073741824 && (Dr(r), r.subtreeFlags & 6 && (r.flags |= 8192)) : Dr(r), null;
      case 24:
        return null;
      case 25:
        return null;
    }
    throw Error(R(156, r.tag));
  }
  function By(n, r) {
    switch (Ld(r), r.tag) {
      case 1:
        return yn(r.type) && Va(), n = r.flags, n & 65536 ? (r.flags = n & -65537 | 128, r) : null;
      case 3:
        return mo(), Pt(On), Pt(nt), Pd(), n = r.flags, n & 65536 && !(n & 128) ? (r.flags = n & -65537 | 128, r) : null;
      case 5:
        return jd(r), null;
      case 13:
        if (Pt(gn), n = r.memoizedState, n !== null && n.dehydrated !== null) {
          if (r.alternate === null) throw Error(R(340));
          bn();
        }
        return n = r.flags, n & 65536 ? (r.flags = n & -65537 | 128, r) : null;
      case 19:
        return Pt(gn), null;
      case 4:
        return mo(), null;
      case 10:
        return zd(r.type._context), null;
      case 22:
      case 23:
        return hf(), null;
      case 24:
        return null;
      default:
        return null;
    }
  }
  var _o = !1, dr = !1, af = typeof WeakSet == "function" ? WeakSet : Set, xe = null;
  function Do(n, r) {
    var l = n.ref;
    if (l !== null) if (typeof l == "function") try {
      l(null);
    } catch (o) {
      Nn(n, r, o);
    }
    else l.current = null;
  }
  function Qd(n, r, l) {
    try {
      l();
    } catch (o) {
      Nn(n, r, o);
    }
  }
  var lf = !1;
  function Iy(n, r) {
    if (wd = Fa, n = gc(), Gi(n)) {
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
          var y = 0, T = -1, x = -1, j = 0, ee = 0, te = n, Z = null;
          t: for (; ; ) {
            for (var Ce; te !== l || c !== 0 && te.nodeType !== 3 || (T = y + c), te !== d || o !== 0 && te.nodeType !== 3 || (x = y + o), te.nodeType === 3 && (y += te.nodeValue.length), (Ce = te.firstChild) !== null; )
              Z = te, te = Ce;
            for (; ; ) {
              if (te === n) break t;
              if (Z === l && ++j === c && (T = y), Z === d && ++ee === o && (x = y), (Ce = te.nextSibling) !== null) break;
              te = Z, Z = te.parentNode;
            }
            te = Ce;
          }
          l = T === -1 || x === -1 ? null : { start: T, end: x };
        } else l = null;
      }
      l = l || { start: 0, end: 0 };
    } else l = null;
    for (pu = { focusedElem: n, selectionRange: l }, Fa = !1, xe = r; xe !== null; ) if (r = xe, n = r.child, (r.subtreeFlags & 1028) !== 0 && n !== null) n.return = r, xe = n;
    else for (; xe !== null; ) {
      r = xe;
      try {
        var ke = r.alternate;
        if (r.flags & 1024) switch (r.tag) {
          case 0:
          case 11:
          case 15:
            break;
          case 1:
            if (ke !== null) {
              var Ae = ke.memoizedProps, jn = ke.memoizedState, M = r.stateNode, D = M.getSnapshotBeforeUpdate(r.elementType === r.type ? Ae : oa(r.type, Ae), jn);
              M.__reactInternalSnapshotBeforeUpdate = D;
            }
            break;
          case 3:
            var z = r.stateNode.containerInfo;
            z.nodeType === 1 ? z.textContent = "" : z.nodeType === 9 && z.documentElement && z.removeChild(z.documentElement);
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
        n.return = r.return, xe = n;
        break;
      }
      xe = r.return;
    }
    return ke = lf, lf = !1, ke;
  }
  function ko(n, r, l) {
    var o = r.updateQueue;
    if (o = o !== null ? o.lastEffect : null, o !== null) {
      var c = o = o.next;
      do {
        if ((c.tag & n) === n) {
          var d = c.destroy;
          c.destroy = void 0, d !== void 0 && Qd(r, l, d);
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
  function ph(n) {
    var r = n.alternate;
    r !== null && (n.alternate = null, ph(r)), n.child = null, n.deletions = null, n.sibling = null, n.tag === 5 && (r = n.stateNode, r !== null && (delete r[xi], delete r[hu], delete r[_d], delete r[jy], delete r[Dd])), n.stateNode = null, n.return = null, n.dependencies = null, n.memoizedProps = null, n.memoizedState = null, n.pendingProps = null, n.stateNode = null, n.updateQueue = null;
  }
  function Gd(n) {
    return n.tag === 5 || n.tag === 3 || n.tag === 4;
  }
  function vh(n) {
    e: for (; ; ) {
      for (; n.sibling === null; ) {
        if (n.return === null || Gd(n.return)) return null;
        n = n.return;
      }
      for (n.sibling.return = n.return, n = n.sibling; n.tag !== 5 && n.tag !== 6 && n.tag !== 18; ) {
        if (n.flags & 2 || n.child === null || n.tag === 4) continue e;
        n.child.return = n, n = n.child;
      }
      if (!(n.flags & 2)) return n.stateNode;
    }
  }
  function Us(n, r, l) {
    var o = n.tag;
    if (o === 5 || o === 6) n = n.stateNode, r ? l.nodeType === 8 ? l.parentNode.insertBefore(n, r) : l.insertBefore(n, r) : (l.nodeType === 8 ? (r = l.parentNode, r.insertBefore(n, l)) : (r = l, r.appendChild(n)), l = l._reactRootContainer, l != null || r.onclick !== null || (r.onclick = wc));
    else if (o !== 4 && (n = n.child, n !== null)) for (Us(n, r, l), n = n.sibling; n !== null; ) Us(n, r, l), n = n.sibling;
  }
  function Oo(n, r, l) {
    var o = n.tag;
    if (o === 5 || o === 6) n = n.stateNode, r ? l.insertBefore(n, r) : l.appendChild(n);
    else if (o !== 4 && (n = n.child, n !== null)) for (Oo(n, r, l), n = n.sibling; n !== null; ) Oo(n, r, l), n = n.sibling;
  }
  var Sn = null, ar = !1;
  function Fr(n, r, l) {
    for (l = l.child; l !== null; ) Mo(n, r, l), l = l.sibling;
  }
  function Mo(n, r, l) {
    if (Zr && typeof Zr.onCommitFiberUnmount == "function") try {
      Zr.onCommitFiberUnmount(El, l);
    } catch {
    }
    switch (l.tag) {
      case 5:
        dr || Do(l, r);
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
            var d = c, y = d.destroy;
            d = d.tag, y !== void 0 && (d & 2 || d & 4) && Qd(l, r, y), c = c.next;
          } while (c !== o);
        }
        Fr(n, r, l);
        break;
      case 1:
        if (!dr && (Do(l, r), o = l.stateNode, typeof o.componentWillUnmount == "function")) try {
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
  function Lo(n) {
    var r = n.updateQueue;
    if (r !== null) {
      n.updateQueue = null;
      var l = n.stateNode;
      l === null && (l = n.stateNode = new af()), r.forEach(function(o) {
        var c = Xy.bind(null, n, o);
        l.has(o) || (l.add(o), o.then(c, c));
      });
    }
  }
  function ir(n, r) {
    var l = r.deletions;
    if (l !== null) for (var o = 0; o < l.length; o++) {
      var c = l[o];
      try {
        var d = n, y = r, T = y;
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
        Mo(d, y, c), Sn = null, ar = !1;
        var x = c.alternate;
        x !== null && (x.return = null), c.return = null;
      } catch (j) {
        Nn(c, r, j);
      }
    }
    if (r.subtreeFlags & 12854) for (r = r.child; r !== null; ) hh(r, n), r = r.sibling;
  }
  function hh(n, r) {
    var l = n.alternate, o = n.flags;
    switch (n.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        if (ir(r, n), Oi(n), o & 4) {
          try {
            ko(3, n, n.return), uf(3, n);
          } catch (Ae) {
            Nn(n, n.return, Ae);
          }
          try {
            ko(5, n, n.return);
          } catch (Ae) {
            Nn(n, n.return, Ae);
          }
        }
        break;
      case 1:
        ir(r, n), Oi(n), o & 512 && l !== null && Do(l, l.return);
        break;
      case 5:
        if (ir(r, n), Oi(n), o & 512 && l !== null && Do(l, l.return), n.flags & 32) {
          var c = n.stateNode;
          try {
            Sa(c, "");
          } catch (Ae) {
            Nn(n, n.return, Ae);
          }
        }
        if (o & 4 && (c = n.stateNode, c != null)) {
          var d = n.memoizedProps, y = l !== null ? l.memoizedProps : d, T = n.type, x = n.updateQueue;
          if (n.updateQueue = null, x !== null) try {
            T === "input" && d.type === "radio" && d.name != null && Hn(c, d), Tn(T, y);
            var j = Tn(T, d);
            for (y = 0; y < x.length; y += 2) {
              var ee = x[y], te = x[y + 1];
              ee === "style" ? jt(c, te) : ee === "dangerouslySetInnerHTML" ? Si(c, te) : ee === "children" ? Sa(c, te) : ge(c, ee, te, j);
            }
            switch (T) {
              case "input":
                An(c, d);
                break;
              case "textarea":
                ga(c, d);
                break;
              case "select":
                var Z = c._wrapperState.wasMultiple;
                c._wrapperState.wasMultiple = !!d.multiple;
                var Ce = d.value;
                Ce != null ? Cr(c, !!d.multiple, Ce, !1) : Z !== !!d.multiple && (d.defaultValue != null ? Cr(
                  c,
                  !!d.multiple,
                  d.defaultValue,
                  !0
                ) : Cr(c, !!d.multiple, d.multiple ? [] : "", !1));
            }
            c[hu] = d;
          } catch (Ae) {
            Nn(n, n.return, Ae);
          }
        }
        break;
      case 6:
        if (ir(r, n), Oi(n), o & 4) {
          if (n.stateNode === null) throw Error(R(162));
          c = n.stateNode, d = n.memoizedProps;
          try {
            c.nodeValue = d;
          } catch (Ae) {
            Nn(n, n.return, Ae);
          }
        }
        break;
      case 3:
        if (ir(r, n), Oi(n), o & 4 && l !== null && l.memoizedState.isDehydrated) try {
          _l(r.containerInfo);
        } catch (Ae) {
          Nn(n, n.return, Ae);
        }
        break;
      case 4:
        ir(r, n), Oi(n);
        break;
      case 13:
        ir(r, n), Oi(n), c = n.child, c.flags & 8192 && (d = c.memoizedState !== null, c.stateNode.isHidden = d, !d || c.alternate !== null && c.alternate.memoizedState !== null || (cf = Nt())), o & 4 && Lo(n);
        break;
      case 22:
        if (ee = l !== null && l.memoizedState !== null, n.mode & 1 ? (dr = (j = dr) || ee, ir(r, n), dr = j) : ir(r, n), Oi(n), o & 8192) {
          if (j = n.memoizedState !== null, (n.stateNode.isHidden = j) && !ee && n.mode & 1) for (xe = n, ee = n.child; ee !== null; ) {
            for (te = xe = ee; xe !== null; ) {
              switch (Z = xe, Ce = Z.child, Z.tag) {
                case 0:
                case 11:
                case 14:
                case 15:
                  ko(4, Z, Z.return);
                  break;
                case 1:
                  Do(Z, Z.return);
                  var ke = Z.stateNode;
                  if (typeof ke.componentWillUnmount == "function") {
                    o = Z, l = Z.return;
                    try {
                      r = o, ke.props = r.memoizedProps, ke.state = r.memoizedState, ke.componentWillUnmount();
                    } catch (Ae) {
                      Nn(o, l, Ae);
                    }
                  }
                  break;
                case 5:
                  Do(Z, Z.return);
                  break;
                case 22:
                  if (Z.memoizedState !== null) {
                    mh(te);
                    continue;
                  }
              }
              Ce !== null ? (Ce.return = Z, xe = Ce) : mh(te);
            }
            ee = ee.sibling;
          }
          e: for (ee = null, te = n; ; ) {
            if (te.tag === 5) {
              if (ee === null) {
                ee = te;
                try {
                  c = te.stateNode, j ? (d = c.style, typeof d.setProperty == "function" ? d.setProperty("display", "none", "important") : d.display = "none") : (T = te.stateNode, x = te.memoizedProps.style, y = x != null && x.hasOwnProperty("display") ? x.display : null, T.style.display = vt("display", y));
                } catch (Ae) {
                  Nn(n, n.return, Ae);
                }
              }
            } else if (te.tag === 6) {
              if (ee === null) try {
                te.stateNode.nodeValue = j ? "" : te.memoizedProps;
              } catch (Ae) {
                Nn(n, n.return, Ae);
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
        ir(r, n), Oi(n), o & 4 && Lo(n);
        break;
      case 21:
        break;
      default:
        ir(
          r,
          n
        ), Oi(n);
    }
  }
  function Oi(n) {
    var r = n.flags;
    if (r & 2) {
      try {
        e: {
          for (var l = n.return; l !== null; ) {
            if (Gd(l)) {
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
            o.flags & 32 && (Sa(c, ""), o.flags &= -33);
            var d = vh(n);
            Oo(n, d, c);
            break;
          case 3:
          case 4:
            var y = o.stateNode.containerInfo, T = vh(n);
            Us(n, T, y);
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
  function Yy(n, r, l) {
    xe = n, qd(n);
  }
  function qd(n, r, l) {
    for (var o = (n.mode & 1) !== 0; xe !== null; ) {
      var c = xe, d = c.child;
      if (c.tag === 22 && o) {
        var y = c.memoizedState !== null || _o;
        if (!y) {
          var T = c.alternate, x = T !== null && T.memoizedState !== null || dr;
          T = _o;
          var j = dr;
          if (_o = y, (dr = x) && !j) for (xe = c; xe !== null; ) y = xe, x = y.child, y.tag === 22 && y.memoizedState !== null ? Kd(c) : x !== null ? (x.return = y, xe = x) : Kd(c);
          for (; d !== null; ) xe = d, qd(d), d = d.sibling;
          xe = c, _o = T, dr = j;
        }
        No(n);
      } else c.subtreeFlags & 8772 && d !== null ? (d.return = c, xe = d) : No(n);
    }
  }
  function No(n) {
    for (; xe !== null; ) {
      var r = xe;
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
              d !== null && Jv(r, d, o);
              break;
            case 3:
              var y = r.updateQueue;
              if (y !== null) {
                if (l = null, r.child !== null) switch (r.child.tag) {
                  case 5:
                    l = r.child.stateNode;
                    break;
                  case 1:
                    l = r.child.stateNode;
                }
                Jv(r, y, l);
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
        } catch (Z) {
          Nn(r, r.return, Z);
        }
      }
      if (r === n) {
        xe = null;
        break;
      }
      if (l = r.sibling, l !== null) {
        l.return = r.return, xe = l;
        break;
      }
      xe = r.return;
    }
  }
  function mh(n) {
    for (; xe !== null; ) {
      var r = xe;
      if (r === n) {
        xe = null;
        break;
      }
      var l = r.sibling;
      if (l !== null) {
        l.return = r.return, xe = l;
        break;
      }
      xe = r.return;
    }
  }
  function Kd(n) {
    for (; xe !== null; ) {
      var r = xe;
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
            var y = r.return;
            try {
              of(r);
            } catch (x) {
              Nn(r, y, x);
            }
        }
      } catch (x) {
        Nn(r, r.return, x);
      }
      if (r === n) {
        xe = null;
        break;
      }
      var T = r.sibling;
      if (T !== null) {
        T.return = r.return, xe = T;
        break;
      }
      xe = r.return;
    }
  }
  var Wy = Math.ceil, _u = Ne.ReactCurrentDispatcher, sf = Ne.ReactCurrentOwner, Ga = Ne.ReactCurrentBatchConfig, Ct = 0, Ln = null, vn = null, Qn = 0, fa = 0, Ao = ft(0), Gn = 0, Fs = null, Du = 0, zo = 0, Xd = 0, Vl = null, kr = null, cf = 0, Uo = 1 / 0, rl = null, ff = !1, Zd = null, qa = null, Fo = !1, Ka = null, df = 0, js = 0, pf = null, Ps = -1, ku = 0;
  function lr() {
    return Ct & 6 ? Nt() : Ps !== -1 ? Ps : Ps = Nt();
  }
  function al(n) {
    return n.mode & 1 ? Ct & 2 && Qn !== 0 ? Qn & -Qn : Oc.transition !== null ? (ku === 0 && (ku = Gu()), ku) : (n = At, n !== 0 || (n = window.event, n = n === void 0 ? 16 : us(n.type)), n) : 1;
  }
  function xn(n, r, l, o) {
    if (50 < js) throw js = 0, pf = null, Error(R(185));
    $i(n, l, o), (!(Ct & 2) || n !== Ln) && (n === Ln && (!(Ct & 2) && (zo |= l), Gn === 4 && Mi(n, Qn)), qn(n, o), l === 1 && Ct === 0 && !(r.mode & 1) && (Uo = Nt() + 500, rr && ra()));
  }
  function qn(n, r) {
    var l = n.callbackNode;
    Tl(n, r);
    var o = zr(n, n === Ln ? Qn : 0);
    if (o === 0) l !== null && fn(l), n.callbackNode = null, n.callbackPriority = 0;
    else if (r = o & -o, n.callbackPriority !== r) {
      if (l != null && fn(l), r === 1) n.tag === 0 ? Od(jo.bind(null, n)) : kd(jo.bind(null, n)), xd(function() {
        !(Ct & 6) && ra();
      }), l = null;
      else {
        switch (Ku(o)) {
          case 1:
            l = Nr;
            break;
          case 4:
            l = mt;
            break;
          case 16:
            l = za;
            break;
          case 536870912:
            l = Wu;
            break;
          default:
            l = za;
        }
        l = wh(l, vf.bind(null, n));
      }
      n.callbackPriority = r, n.callbackNode = l;
    }
  }
  function vf(n, r) {
    if (Ps = -1, ku = 0, Ct & 6) throw Error(R(327));
    var l = n.callbackNode;
    if (Po() && n.callbackNode !== l) return null;
    var o = zr(n, n === Ln ? Qn : 0);
    if (o === 0) return null;
    if (o & 30 || o & n.expiredLanes || r) r = mf(n, o);
    else {
      r = o;
      var c = Ct;
      Ct |= 2;
      var d = gh();
      (Ln !== n || Qn !== r) && (rl = null, Uo = Nt() + 500, Mu(n, r));
      do
        try {
          Gy();
          break;
        } catch (T) {
          yh(n, T);
        }
      while (!0);
      xa(), _u.current = d, Ct = c, vn !== null ? r = 0 : (Ln = null, Qn = 0, r = Gn);
    }
    if (r !== 0) {
      if (r === 2 && (c = wl(n), c !== 0 && (o = c, r = Ou(n, c))), r === 1) throw l = Fs, Mu(n, 0), Mi(n, o), qn(n, Nt()), l;
      if (r === 6) Mi(n, o);
      else {
        if (c = n.current.alternate, !(o & 30) && !ep(c) && (r = mf(n, o), r === 2 && (d = wl(n), d !== 0 && (o = d, r = Ou(n, d))), r === 1)) throw l = Fs, Mu(n, 0), Mi(n, o), qn(n, Nt()), l;
        switch (n.finishedWork = c, n.finishedLanes = o, r) {
          case 0:
          case 1:
            throw Error(R(345));
          case 2:
            $l(n, kr, rl);
            break;
          case 3:
            if (Mi(n, o), (o & 130023424) === o && (r = cf + 500 - Nt(), 10 < r)) {
              if (zr(n, 0) !== 0) break;
              if (c = n.suspendedLanes, (c & o) !== o) {
                lr(), n.pingedLanes |= n.suspendedLanes & c;
                break;
              }
              n.timeoutHandle = vu($l.bind(null, n, kr, rl), r);
              break;
            }
            $l(n, kr, rl);
            break;
          case 4:
            if (Mi(n, o), (o & 4194240) === o) break;
            for (r = n.eventTimes, c = -1; 0 < o; ) {
              var y = 31 - Ar(o);
              d = 1 << y, y = r[y], y > c && (c = y), o &= ~d;
            }
            if (o = c, o = Nt() - o, o = (120 > o ? 120 : 480 > o ? 480 : 1080 > o ? 1080 : 1920 > o ? 1920 : 3e3 > o ? 3e3 : 4320 > o ? 4320 : 1960 * Wy(o / 1960)) - o, 10 < o) {
              n.timeoutHandle = vu($l.bind(null, n, kr, rl), o);
              break;
            }
            $l(n, kr, rl);
            break;
          case 5:
            $l(n, kr, rl);
            break;
          default:
            throw Error(R(329));
        }
      }
    }
    return qn(n, Nt()), n.callbackNode === l ? vf.bind(null, n) : null;
  }
  function Ou(n, r) {
    var l = Vl;
    return n.current.memoizedState.isDehydrated && (Mu(n, r).flags |= 256), n = mf(n, r), n !== 2 && (r = kr, kr = l, r !== null && Jd(r)), n;
  }
  function Jd(n) {
    kr === null ? kr = n : kr.push.apply(kr, n);
  }
  function ep(n) {
    for (var r = n; ; ) {
      if (r.flags & 16384) {
        var l = r.updateQueue;
        if (l !== null && (l = l.stores, l !== null)) for (var o = 0; o < l.length; o++) {
          var c = l[o], d = c.getSnapshot;
          c = c.value;
          try {
            if (!ja(d(), c)) return !1;
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
  function Mi(n, r) {
    for (r &= ~Xd, r &= ~zo, n.suspendedLanes |= r, n.pingedLanes &= ~r, n = n.expirationTimes; 0 < r; ) {
      var l = 31 - Ar(r), o = 1 << l;
      n[l] = -1, r &= ~o;
    }
  }
  function jo(n) {
    if (Ct & 6) throw Error(R(327));
    Po();
    var r = zr(n, 0);
    if (!(r & 1)) return qn(n, Nt()), null;
    var l = mf(n, r);
    if (n.tag !== 0 && l === 2) {
      var o = wl(n);
      o !== 0 && (r = o, l = Ou(n, o));
    }
    if (l === 1) throw l = Fs, Mu(n, 0), Mi(n, r), qn(n, Nt()), l;
    if (l === 6) throw Error(R(345));
    return n.finishedWork = n.current.alternate, n.finishedLanes = r, $l(n, kr, rl), qn(n, Nt()), null;
  }
  function tp(n, r) {
    var l = Ct;
    Ct |= 1;
    try {
      return n(r);
    } finally {
      Ct = l, Ct === 0 && (Uo = Nt() + 500, rr && ra());
    }
  }
  function Li(n) {
    Ka !== null && Ka.tag === 0 && !(Ct & 6) && Po();
    var r = Ct;
    Ct |= 1;
    var l = Ga.transition, o = At;
    try {
      if (Ga.transition = null, At = 1, n) return n();
    } finally {
      At = o, Ga.transition = l, Ct = r, !(Ct & 6) && ra();
    }
  }
  function hf() {
    fa = Ao.current, Pt(Ao);
  }
  function Mu(n, r) {
    n.finishedWork = null, n.finishedLanes = 0;
    var l = n.timeoutHandle;
    if (l !== -1 && (n.timeoutHandle = -1, Iv(l)), vn !== null) for (l = vn.return; l !== null; ) {
      var o = l;
      switch (Ld(o), o.tag) {
        case 1:
          o = o.type.childContextTypes, o != null && Va();
          break;
        case 3:
          mo(), Pt(On), Pt(nt), Pd();
          break;
        case 5:
          jd(o);
          break;
        case 4:
          mo();
          break;
        case 13:
          Pt(gn);
          break;
        case 19:
          Pt(gn);
          break;
        case 10:
          zd(o.type._context);
          break;
        case 22:
        case 23:
          hf();
      }
      l = l.return;
    }
    if (Ln = n, vn = n = Bl(n.current, null), Qn = fa = r, Gn = 0, Fs = null, Xd = zo = Du = 0, kr = Vl = null, gu !== null) {
      for (r = 0; r < gu.length; r++) if (l = gu[r], o = l.interleaved, o !== null) {
        l.interleaved = null;
        var c = o.next, d = l.pending;
        if (d !== null) {
          var y = d.next;
          d.next = c, o.next = y;
        }
        l.pending = o;
      }
      gu = null;
    }
    return n;
  }
  function yh(n, r) {
    do {
      var l = vn;
      try {
        if (xa(), Fc.current = _r, _a) {
          for (var o = He.memoizedState; o !== null; ) {
            var c = o.queue;
            c !== null && (c.pending = null), o = o.next;
          }
          _a = !1;
        }
        if (Fe = 0, gt = rt = He = null, yo = !1, _s = 0, sf.current = null, l === null || l.return === null) {
          Gn = 1, Fs = r, vn = null;
          break;
        }
        e: {
          var d = n, y = l.return, T = l, x = r;
          if (r = Qn, T.flags |= 32768, x !== null && typeof x == "object" && typeof x.then == "function") {
            var j = x, ee = T, te = ee.tag;
            if (!(ee.mode & 1) && (te === 0 || te === 11 || te === 15)) {
              var Z = ee.alternate;
              Z ? (ee.updateQueue = Z.updateQueue, ee.memoizedState = Z.memoizedState, ee.lanes = Z.lanes) : (ee.updateQueue = null, ee.memoizedState = null);
            }
            var Ce = oh(y);
            if (Ce !== null) {
              Ce.flags &= -257, Id(Ce, y, T, d, r), Ce.mode & 1 && Ls(d, j, r), r = Ce, x = j;
              var ke = r.updateQueue;
              if (ke === null) {
                var Ae = /* @__PURE__ */ new Set();
                Ae.add(x), r.updateQueue = Ae;
              } else ke.add(x);
              break e;
            } else {
              if (!(r & 1)) {
                Ls(d, j, r), Hs();
                break e;
              }
              x = Error(R(426));
            }
          } else if (pn && T.mode & 1) {
            var jn = oh(y);
            if (jn !== null) {
              !(jn.flags & 65536) && (jn.flags |= 256), Id(jn, y, T, d, r), Ad(Pl(x, T));
              break e;
            }
          }
          d = x = Pl(x, T), Gn !== 4 && (Gn = 2), Vl === null ? Vl = [d] : Vl.push(d), d = y;
          do {
            switch (d.tag) {
              case 3:
                d.flags |= 65536, r &= -r, d.lanes |= r;
                var M = lh(d, x, r);
                Zv(d, M);
                break e;
              case 1:
                T = x;
                var D = d.type, z = d.stateNode;
                if (!(d.flags & 128) && (typeof D.getDerivedStateFromError == "function" || z !== null && typeof z.componentDidCatch == "function" && (qa === null || !qa.has(z)))) {
                  d.flags |= 65536, r &= -r, d.lanes |= r;
                  var ue = uh(d, T, r);
                  Zv(d, ue);
                  break e;
                }
            }
            d = d.return;
          } while (d !== null);
        }
        Eh(l);
      } catch (je) {
        r = je, vn === l && l !== null && (vn = l = l.return);
        continue;
      }
      break;
    } while (!0);
  }
  function gh() {
    var n = _u.current;
    return _u.current = _r, n === null ? _r : n;
  }
  function Hs() {
    (Gn === 0 || Gn === 3 || Gn === 2) && (Gn = 4), Ln === null || !(Du & 268435455) && !(zo & 268435455) || Mi(Ln, Qn);
  }
  function mf(n, r) {
    var l = Ct;
    Ct |= 2;
    var o = gh();
    (Ln !== n || Qn !== r) && (rl = null, Mu(n, r));
    do
      try {
        Qy();
        break;
      } catch (c) {
        yh(n, c);
      }
    while (!0);
    if (xa(), Ct = l, _u.current = o, vn !== null) throw Error(R(261));
    return Ln = null, Qn = 0, Gn;
  }
  function Qy() {
    for (; vn !== null; ) Sh(vn);
  }
  function Gy() {
    for (; vn !== null && !wr(); ) Sh(vn);
  }
  function Sh(n) {
    var r = Th(n.alternate, n, fa);
    n.memoizedProps = n.pendingProps, r === null ? Eh(n) : vn = r, sf.current = null;
  }
  function Eh(n) {
    var r = n;
    do {
      var l = r.alternate;
      if (n = r.return, r.flags & 32768) {
        if (l = By(l, r), l !== null) {
          l.flags &= 32767, vn = l;
          return;
        }
        if (n !== null) n.flags |= 32768, n.subtreeFlags = 0, n.deletions = null;
        else {
          Gn = 6, vn = null;
          return;
        }
      } else if (l = $y(l, r, fa), l !== null) {
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
    var o = At, c = Ga.transition;
    try {
      Ga.transition = null, At = 1, qy(n, r, l, o);
    } finally {
      Ga.transition = c, At = o;
    }
    return null;
  }
  function qy(n, r, l, o) {
    do
      Po();
    while (Ka !== null);
    if (Ct & 6) throw Error(R(327));
    l = n.finishedWork;
    var c = n.finishedLanes;
    if (l === null) return null;
    if (n.finishedWork = null, n.finishedLanes = 0, l === n.current) throw Error(R(177));
    n.callbackNode = null, n.callbackPriority = 0;
    var d = l.lanes | l.childLanes;
    if (id(n, d), n === Ln && (vn = Ln = null, Qn = 0), !(l.subtreeFlags & 2064) && !(l.flags & 2064) || Fo || (Fo = !0, wh(za, function() {
      return Po(), null;
    })), d = (l.flags & 15990) !== 0, l.subtreeFlags & 15990 || d) {
      d = Ga.transition, Ga.transition = null;
      var y = At;
      At = 1;
      var T = Ct;
      Ct |= 4, sf.current = null, Iy(n, l), hh(l, n), Sc(pu), Fa = !!wd, pu = wd = null, n.current = l, Yy(l), Ti(), Ct = T, At = y, Ga.transition = d;
    } else n.current = l;
    if (Fo && (Fo = !1, Ka = n, df = c), d = n.pendingLanes, d === 0 && (qa = null), as(l.stateNode), qn(n, Nt()), r !== null) for (o = n.onRecoverableError, l = 0; l < r.length; l++) c = r[l], o(c.value, { componentStack: c.stack, digest: c.digest });
    if (ff) throw ff = !1, n = Zd, Zd = null, n;
    return df & 1 && n.tag !== 0 && Po(), d = n.pendingLanes, d & 1 ? n === pf ? js++ : (js = 0, pf = n) : js = 0, ra(), null;
  }
  function Po() {
    if (Ka !== null) {
      var n = Ku(df), r = Ga.transition, l = At;
      try {
        if (Ga.transition = null, At = 16 > n ? 16 : n, Ka === null) var o = !1;
        else {
          if (n = Ka, Ka = null, df = 0, Ct & 6) throw Error(R(331));
          var c = Ct;
          for (Ct |= 4, xe = n.current; xe !== null; ) {
            var d = xe, y = d.child;
            if (xe.flags & 16) {
              var T = d.deletions;
              if (T !== null) {
                for (var x = 0; x < T.length; x++) {
                  var j = T[x];
                  for (xe = j; xe !== null; ) {
                    var ee = xe;
                    switch (ee.tag) {
                      case 0:
                      case 11:
                      case 15:
                        ko(8, ee, d);
                    }
                    var te = ee.child;
                    if (te !== null) te.return = ee, xe = te;
                    else for (; xe !== null; ) {
                      ee = xe;
                      var Z = ee.sibling, Ce = ee.return;
                      if (ph(ee), ee === j) {
                        xe = null;
                        break;
                      }
                      if (Z !== null) {
                        Z.return = Ce, xe = Z;
                        break;
                      }
                      xe = Ce;
                    }
                  }
                }
                var ke = d.alternate;
                if (ke !== null) {
                  var Ae = ke.child;
                  if (Ae !== null) {
                    ke.child = null;
                    do {
                      var jn = Ae.sibling;
                      Ae.sibling = null, Ae = jn;
                    } while (Ae !== null);
                  }
                }
                xe = d;
              }
            }
            if (d.subtreeFlags & 2064 && y !== null) y.return = d, xe = y;
            else e: for (; xe !== null; ) {
              if (d = xe, d.flags & 2048) switch (d.tag) {
                case 0:
                case 11:
                case 15:
                  ko(9, d, d.return);
              }
              var M = d.sibling;
              if (M !== null) {
                M.return = d.return, xe = M;
                break e;
              }
              xe = d.return;
            }
          }
          var D = n.current;
          for (xe = D; xe !== null; ) {
            y = xe;
            var z = y.child;
            if (y.subtreeFlags & 2064 && z !== null) z.return = y, xe = z;
            else e: for (y = D; xe !== null; ) {
              if (T = xe, T.flags & 2048) try {
                switch (T.tag) {
                  case 0:
                  case 11:
                  case 15:
                    uf(9, T);
                }
              } catch (je) {
                Nn(T, T.return, je);
              }
              if (T === y) {
                xe = null;
                break e;
              }
              var ue = T.sibling;
              if (ue !== null) {
                ue.return = T.return, xe = ue;
                break e;
              }
              xe = T.return;
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
        At = l, Ga.transition = r;
      }
    }
    return !1;
  }
  function Ch(n, r, l) {
    r = Pl(l, r), r = lh(n, r, 1), n = Fl(n, r, 1), r = lr(), n !== null && ($i(n, 1, r), qn(n, r));
  }
  function Nn(n, r, l) {
    if (n.tag === 3) Ch(n, n, l);
    else for (; r !== null; ) {
      if (r.tag === 3) {
        Ch(r, n, l);
        break;
      } else if (r.tag === 1) {
        var o = r.stateNode;
        if (typeof r.type.getDerivedStateFromError == "function" || typeof o.componentDidCatch == "function" && (qa === null || !qa.has(o))) {
          n = Pl(l, n), n = uh(r, n, 1), r = Fl(r, n, 1), n = lr(), r !== null && ($i(r, 1, n), qn(r, n));
          break;
        }
      }
      r = r.return;
    }
  }
  function Ky(n, r, l) {
    var o = n.pingCache;
    o !== null && o.delete(r), r = lr(), n.pingedLanes |= n.suspendedLanes & l, Ln === n && (Qn & l) === l && (Gn === 4 || Gn === 3 && (Qn & 130023424) === Qn && 500 > Nt() - cf ? Mu(n, 0) : Xd |= l), qn(n, r);
  }
  function Rh(n, r) {
    r === 0 && (n.mode & 1 ? (r = Cl, Cl <<= 1, !(Cl & 130023424) && (Cl = 4194304)) : r = 1);
    var l = lr();
    n = el(n, r), n !== null && ($i(n, r, l), qn(n, l));
  }
  function np(n) {
    var r = n.memoizedState, l = 0;
    r !== null && (l = r.retryLane), Rh(n, l);
  }
  function Xy(n, r) {
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
    o !== null && o.delete(r), Rh(n, l);
  }
  var Th;
  Th = function(n, r, l) {
    if (n !== null) if (n.memoizedProps !== r.pendingProps || On.current) sa = !0;
    else {
      if (!(n.lanes & l) && !(r.flags & 128)) return sa = !1, nl(n, r, l);
      sa = !!(n.flags & 131072);
    }
    else sa = !1, pn && r.flags & 1048576 && Md(r, co, r.index);
    switch (r.lanes = 0, r.tag) {
      case 2:
        var o = r.type;
        zs(n, r), n = r.pendingProps;
        var c = Ha(r, nt.current);
        po(r, l), c = X(null, r, o, n, c, l);
        var d = In();
        return r.flags |= 1, typeof c == "object" && c !== null && typeof c.render == "function" && c.$$typeof === void 0 ? (r.tag = 1, r.memoizedState = null, r.updateQueue = null, yn(o) ? (d = !0, bc(r)) : d = !1, r.memoizedState = c.state !== null && c.state !== void 0 ? c.state : null, Lc(r), c.updater = wu, r.stateNode = c, c._reactInternals = r, $d(r, o, n, l), r = ef(null, r, o, !0, d, l)) : (r.tag = 0, pn && d && xc(r), Un(null, r, c, l), r = r.child), r;
      case 16:
        o = r.elementType;
        e: {
          switch (zs(n, r), n = r.pendingProps, c = o._init, o = c(o._payload), r.type = o, c = r.tag = Zy(o), n = oa(o, n), c) {
            case 0:
              r = st(null, r, o, n, l);
              break e;
            case 1:
              r = Ns(null, r, o, n, l);
              break e;
            case 11:
              r = wo(null, r, o, n, l);
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
        return o = r.type, c = r.pendingProps, c = r.elementType === o ? c : oa(o, c), Ns(n, r, o, c, l);
      case 3:
        e: {
          if (Vy(r), n === null) throw Error(R(387));
          o = r.pendingProps, d = r.memoizedState, c = d.element, vo(n, r), Ac(r, o, null, l);
          var y = r.memoizedState;
          if (o = y.element, d.isDehydrated) if (d = { element: o, isDehydrated: !1, cache: y.cache, pendingSuspenseBoundaries: y.pendingSuspenseBoundaries, transitions: y.transitions }, r.updateQueue.baseState = d, r.memoizedState = d, r.flags & 256) {
            c = Pl(Error(R(423)), r), r = ch(n, r, o, l, c);
            break e;
          } else if (o !== c) {
            c = Pl(Error(R(424)), r), r = ch(n, r, o, l, c);
            break e;
          } else for (la = pi(r.stateNode.containerInfo.firstChild), ba = r, pn = !0, Ba = null, l = Kv(r, null, o, l), r.child = l; l; ) l.flags = l.flags & -3 | 4096, l = l.sibling;
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
        return eh(r), n === null && Dc(r), o = r.type, c = r.pendingProps, d = n !== null ? n.memoizedProps : null, y = c.children, Ss(o, c) ? y = null : d !== null && Ss(o, d) && (r.flags |= 32), bu(n, r), Un(n, r, y, l), r.child;
      case 6:
        return n === null && Dc(r), null;
      case 13:
        return fh(n, r, l);
      case 4:
        return Fd(r, r.stateNode.containerInfo), o = r.pendingProps, n === null ? r.child = fo(r, null, o, l) : Un(n, r, o, l), r.child;
      case 11:
        return o = r.type, c = r.pendingProps, c = r.elementType === o ? c : oa(o, c), wo(n, r, o, c, l);
      case 7:
        return Un(n, r, r.pendingProps, l), r.child;
      case 8:
        return Un(n, r, r.pendingProps.children, l), r.child;
      case 12:
        return Un(n, r, r.pendingProps.children, l), r.child;
      case 10:
        e: {
          if (o = r.type._context, c = r.pendingProps, d = r.memoizedProps, y = c.value, Yt(Ji, o._currentValue), o._currentValue = y, d !== null) if (ja(d.value, y)) {
            if (d.children === c.children && !On.current) {
              r = Fn(n, r, l);
              break e;
            }
          } else for (d = r.child, d !== null && (d.return = r); d !== null; ) {
            var T = d.dependencies;
            if (T !== null) {
              y = d.child;
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
                  d.lanes |= l, x = d.alternate, x !== null && (x.lanes |= l), Ud(
                    d.return,
                    l,
                    r
                  ), T.lanes |= l;
                  break;
                }
                x = x.next;
              }
            } else if (d.tag === 10) y = d.type === r.type ? null : d.child;
            else if (d.tag === 18) {
              if (y = d.return, y === null) throw Error(R(341));
              y.lanes |= l, T = y.alternate, T !== null && (T.lanes |= l), Ud(y, l, r), y = d.sibling;
            } else y = d.child;
            if (y !== null) y.return = d;
            else for (y = d; y !== null; ) {
              if (y === r) {
                y = null;
                break;
              }
              if (d = y.sibling, d !== null) {
                d.return = y.return, y = d;
                break;
              }
              y = y.return;
            }
            d = y;
          }
          Un(n, r, c.children, l), r = r.child;
        }
        return r;
      case 9:
        return c = r.type, o = r.pendingProps.children, po(r, l), c = Ya(c), o = o(c), r.flags |= 1, Un(n, r, o, l), r.child;
      case 14:
        return o = r.type, c = oa(o, r.pendingProps), c = oa(o.type, c), Hl(n, r, o, c, l);
      case 15:
        return Jc(n, r, r.type, r.pendingProps, l);
      case 17:
        return o = r.type, c = r.pendingProps, c = r.elementType === o ? c : oa(o, c), zs(n, r), r.tag = 1, yn(o) ? (n = !0, bc(r)) : n = !1, po(r, l), rh(r, o, c), $d(r, o, c, l), ef(null, r, o, !0, n, l);
      case 19:
        return Wd(n, r, l);
      case 22:
        return ca(n, r, l);
    }
    throw Error(R(156, r.tag));
  };
  function wh(n, r) {
    return an(n, r);
  }
  function bh(n, r, l, o) {
    this.tag = n, this.key = l, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.ref = null, this.pendingProps = r, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = o, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
  }
  function Xa(n, r, l, o) {
    return new bh(n, r, l, o);
  }
  function rp(n) {
    return n = n.prototype, !(!n || !n.isReactComponent);
  }
  function Zy(n) {
    if (typeof n == "function") return rp(n) ? 1 : 0;
    if (n != null) {
      if (n = n.$$typeof, n === mn) return 11;
      if (n === Lt) return 14;
    }
    return 2;
  }
  function Bl(n, r) {
    var l = n.alternate;
    return l === null ? (l = Xa(n.tag, r, n.key, n.mode), l.elementType = n.elementType, l.type = n.type, l.stateNode = n.stateNode, l.alternate = n, n.alternate = l) : (l.pendingProps = r, l.type = n.type, l.flags = 0, l.subtreeFlags = 0, l.deletions = null), l.flags = n.flags & 14680064, l.childLanes = n.childLanes, l.lanes = n.lanes, l.child = n.child, l.memoizedProps = n.memoizedProps, l.memoizedState = n.memoizedState, l.updateQueue = n.updateQueue, r = n.dependencies, l.dependencies = r === null ? null : { lanes: r.lanes, firstContext: r.firstContext }, l.sibling = n.sibling, l.index = n.index, l.ref = n.ref, l;
  }
  function yf(n, r, l, o, c, d) {
    var y = 2;
    if (o = n, typeof n == "function") rp(n) && (y = 1);
    else if (typeof n == "string") y = 5;
    else e: switch (n) {
      case de:
        return Lu(l.children, c, d, r);
      case Xt:
        y = 8, c |= 8;
        break;
      case En:
        return n = Xa(12, l, r, c | 2), n.elementType = En, n.lanes = d, n;
      case Ye:
        return n = Xa(13, l, r, c), n.elementType = Ye, n.lanes = d, n;
      case lt:
        return n = Xa(19, l, r, c), n.elementType = lt, n.lanes = d, n;
      case De:
        return gf(l, c, d, r);
      default:
        if (typeof n == "object" && n !== null) switch (n.$$typeof) {
          case Ht:
            y = 10;
            break e;
          case Ot:
            y = 9;
            break e;
          case mn:
            y = 11;
            break e;
          case Lt:
            y = 14;
            break e;
          case Tt:
            y = 16, o = null;
            break e;
        }
        throw Error(R(130, n == null ? n : typeof n, ""));
    }
    return r = Xa(y, l, r, c), r.elementType = n, r.type = o, r.lanes = d, r;
  }
  function Lu(n, r, l, o) {
    return n = Xa(7, n, o, r), n.lanes = l, n;
  }
  function gf(n, r, l, o) {
    return n = Xa(22, n, o, r), n.elementType = De, n.lanes = l, n.stateNode = { isHidden: !1 }, n;
  }
  function Sf(n, r, l) {
    return n = Xa(6, n, null, r), n.lanes = l, n;
  }
  function Vs(n, r, l) {
    return r = Xa(4, n.children !== null ? n.children : [], n.key, r), r.lanes = l, r.stateNode = { containerInfo: n.containerInfo, pendingChildren: null, implementation: n.implementation }, r;
  }
  function $s(n, r, l, o, c) {
    this.tag = r, this.containerInfo = n, this.finishedWork = this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.pendingContext = this.context = null, this.callbackPriority = 0, this.eventTimes = qu(0), this.expirationTimes = qu(-1), this.entangledLanes = this.finishedLanes = this.mutableReadLanes = this.expiredLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = qu(0), this.identifierPrefix = o, this.onRecoverableError = c, this.mutableSourceEagerHydrationData = null;
  }
  function ap(n, r, l, o, c, d, y, T, x) {
    return n = new $s(n, r, l, T, x), r === 1 ? (r = 1, d === !0 && (r |= 8)) : r = 0, d = Xa(3, null, null, r), n.current = d, d.stateNode = n, d.memoizedState = { element: o, isDehydrated: l, cache: null, transitions: null, pendingSuspenseBoundaries: null }, Lc(d), n;
  }
  function xh(n, r, l) {
    var o = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return { $$typeof: Le, key: o == null ? null : "" + o, children: n, containerInfo: r, implementation: l };
  }
  function ip(n) {
    if (!n) return _i;
    n = n._reactInternals;
    e: {
      if (Pe(n) !== n || n.tag !== 1) throw Error(R(170));
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
      if (yn(l)) return Rs(n, l, r);
    }
    return r;
  }
  function lp(n, r, l, o, c, d, y, T, x) {
    return n = ap(l, o, !0, n, c, d, y, T, x), n.context = ip(null), l = n.current, o = lr(), c = al(l), d = ua(o, c), d.callback = r ?? null, Fl(l, d, c), n.current.lanes = c, $i(n, c, o), qn(n, o), n;
  }
  function Ef(n, r, l, o) {
    var c = r.current, d = lr(), y = al(c);
    return l = ip(l), r.context === null ? r.context = l : r.pendingContext = l, r = ua(d, y), r.payload = { element: n }, o = o === void 0 ? null : o, o !== null && (r.callback = o), n = Fl(c, r, y), n !== null && (xn(n, c, y, d), Nc(n, c, y)), y;
  }
  function Bs(n) {
    if (n = n.current, !n.child) return null;
    switch (n.child.tag) {
      case 5:
        return n.child.stateNode;
      default:
        return n.child.stateNode;
    }
  }
  function _h(n, r) {
    if (n = n.memoizedState, n !== null && n.dehydrated !== null) {
      var l = n.retryLane;
      n.retryLane = l !== 0 && l < r ? l : r;
    }
  }
  function up(n, r) {
    _h(n, r), (n = n.alternate) && _h(n, r);
  }
  function Jy() {
    return null;
  }
  var op = typeof reportError == "function" ? reportError : function(n) {
    console.error(n);
  };
  function Cf(n) {
    this._internalRoot = n;
  }
  Is.prototype.render = Cf.prototype.render = function(n) {
    var r = this._internalRoot;
    if (r === null) throw Error(R(409));
    Ef(n, r, null, null);
  }, Is.prototype.unmount = Cf.prototype.unmount = function() {
    var n = this._internalRoot;
    if (n !== null) {
      this._internalRoot = null;
      var r = n.containerInfo;
      Li(function() {
        Ef(null, n, null, null);
      }), r[Xi] = null;
    }
  };
  function Is(n) {
    this._internalRoot = n;
  }
  Is.prototype.unstable_scheduleHydration = function(n) {
    if (n) {
      var r = Zu();
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
  function Dh() {
  }
  function eg(n, r, l, o, c) {
    if (c) {
      if (typeof o == "function") {
        var d = o;
        o = function() {
          var j = Bs(y);
          d.call(j);
        };
      }
      var y = lp(r, o, n, 0, null, !1, !1, "", Dh);
      return n._reactRootContainer = y, n[Xi] = y.current, oo(n.nodeType === 8 ? n.parentNode : n), Li(), y;
    }
    for (; c = n.lastChild; ) n.removeChild(c);
    if (typeof o == "function") {
      var T = o;
      o = function() {
        var j = Bs(x);
        T.call(j);
      };
    }
    var x = ap(n, 0, !1, null, null, !1, !1, "", Dh);
    return n._reactRootContainer = x, n[Xi] = x.current, oo(n.nodeType === 8 ? n.parentNode : n), Li(function() {
      Ef(r, x, l, o);
    }), x;
  }
  function Tf(n, r, l, o, c) {
    var d = l._reactRootContainer;
    if (d) {
      var y = d;
      if (typeof c == "function") {
        var T = c;
        c = function() {
          var x = Bs(y);
          T.call(x);
        };
      }
      Ef(r, y, n, c);
    } else y = eg(l, r, n, c, o);
    return Bs(y);
  }
  lu = function(n) {
    switch (n.tag) {
      case 3:
        var r = n.stateNode;
        if (r.current.memoizedState.isDehydrated) {
          var l = oi(r.pendingLanes);
          l !== 0 && (wi(r, l | 1), qn(r, Nt()), !(Ct & 6) && (Uo = Nt() + 500, ra()));
        }
        break;
      case 13:
        Li(function() {
          var o = el(n, 1);
          if (o !== null) {
            var c = lr();
            xn(o, n, 1, c);
          }
        }), up(n, 1);
    }
  }, Xu = function(n) {
    if (n.tag === 13) {
      var r = el(n, 134217728);
      if (r !== null) {
        var l = lr();
        xn(r, n, 134217728, l);
      }
      up(n, 134217728);
    }
  }, bt = function(n) {
    if (n.tag === 13) {
      var r = al(n), l = el(n, r);
      if (l !== null) {
        var o = lr();
        xn(l, n, r, o);
      }
      up(n, r);
    }
  }, Zu = function() {
    return At;
  }, Ju = function(n, r) {
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
              be(o), An(o, c);
            }
          }
        }
        break;
      case "textarea":
        ga(n, l);
        break;
      case "select":
        r = l.value, r != null && Cr(n, !!l.multiple, r, !1);
    }
  }, iu = tp, Yu = Li;
  var tg = { usingClientEntryPoint: !1, Events: [Cs, so, Ie, Aa, yl, tp] }, Ys = { findFiberByHostInstance: Pa, bundleType: 0, version: "18.3.1", rendererPackageName: "react-dom" }, kh = { bundleType: Ys.bundleType, version: Ys.version, rendererPackageName: Ys.rendererPackageName, rendererConfig: Ys.rendererConfig, overrideHookState: null, overrideHookStateDeletePath: null, overrideHookStateRenamePath: null, overrideProps: null, overridePropsDeletePath: null, overridePropsRenamePath: null, setErrorHandler: null, setSuspenseHandler: null, scheduleUpdate: null, currentDispatcherRef: Ne.ReactCurrentDispatcher, findHostInstanceByFiber: function(n) {
    return n = ht(n), n === null ? null : n.stateNode;
  }, findFiberByHostInstance: Ys.findFiberByHostInstance || Jy, findHostInstancesForRefresh: null, scheduleRefresh: null, scheduleRoot: null, setRefreshHandler: null, getCurrentFiber: null, reconcilerVersion: "18.3.1-next-f1338f8080-20240426" };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var wf = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!wf.isDisabled && wf.supportsFiber) try {
      El = wf.inject(kh), Zr = wf;
    } catch {
    }
  }
  return ri.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = tg, ri.createPortal = function(n, r) {
    var l = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!Il(r)) throw Error(R(200));
    return xh(n, r, null, l);
  }, ri.createRoot = function(n, r) {
    if (!Il(n)) throw Error(R(299));
    var l = !1, o = "", c = op;
    return r != null && (r.unstable_strictMode === !0 && (l = !0), r.identifierPrefix !== void 0 && (o = r.identifierPrefix), r.onRecoverableError !== void 0 && (c = r.onRecoverableError)), r = ap(n, 1, !1, null, null, l, !1, o, c), n[Xi] = r.current, oo(n.nodeType === 8 ? n.parentNode : n), new Cf(r);
  }, ri.findDOMNode = function(n) {
    if (n == null) return null;
    if (n.nodeType === 1) return n;
    var r = n._reactInternals;
    if (r === void 0)
      throw typeof n.render == "function" ? Error(R(188)) : (n = Object.keys(n).join(","), Error(R(268, n)));
    return n = ht(r), n = n === null ? null : n.stateNode, n;
  }, ri.flushSync = function(n) {
    return Li(n);
  }, ri.hydrate = function(n, r, l) {
    if (!Rf(r)) throw Error(R(200));
    return Tf(null, n, r, !0, l);
  }, ri.hydrateRoot = function(n, r, l) {
    if (!Il(n)) throw Error(R(405));
    var o = l != null && l.hydratedSources || null, c = !1, d = "", y = op;
    if (l != null && (l.unstable_strictMode === !0 && (c = !0), l.identifierPrefix !== void 0 && (d = l.identifierPrefix), l.onRecoverableError !== void 0 && (y = l.onRecoverableError)), r = lp(r, null, n, 1, l ?? null, c, !1, d, y), n[Xi] = r.current, oo(n), o) for (n = 0; n < o.length; n++) l = o[n], c = l._getVersion, c = c(l._source), r.mutableSourceEagerHydrationData == null ? r.mutableSourceEagerHydrationData = [l, c] : r.mutableSourceEagerHydrationData.push(
      l,
      c
    );
    return new Is(r);
  }, ri.render = function(n, r, l) {
    if (!Rf(r)) throw Error(R(200));
    return Tf(null, n, r, !1, l);
  }, ri.unmountComponentAtNode = function(n) {
    if (!Rf(n)) throw Error(R(40));
    return n._reactRootContainer ? (Li(function() {
      Tf(null, null, n, !1, function() {
        n._reactRootContainer = null, n[Xi] = null;
      });
    }), !0) : !1;
  }, ri.unstable_batchedUpdates = tp, ri.unstable_renderSubtreeIntoContainer = function(n, r, l, o) {
    if (!Rf(l)) throw Error(R(200));
    if (n == null || n._reactInternals === void 0) throw Error(R(38));
    return Tf(n, r, l, !1, o);
  }, ri.version = "18.3.1-next-f1338f8080-20240426", ri;
}
var ai = {};
/**
 * @license React
 * react-dom.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var oT;
function LO() {
  return oT || (oT = 1, process.env.NODE_ENV !== "production" && function() {
    typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(new Error());
    var m = hv(), S = wT(), R = m.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, L = !1;
    function H(e) {
      L = e;
    }
    function B(e) {
      if (!L) {
        for (var t = arguments.length, a = new Array(t > 1 ? t - 1 : 0), i = 1; i < t; i++)
          a[i - 1] = arguments[i];
        ce("warn", e, a);
      }
    }
    function E(e) {
      if (!L) {
        for (var t = arguments.length, a = new Array(t > 1 ? t - 1 : 0), i = 1; i < t; i++)
          a[i - 1] = arguments[i];
        ce("error", e, a);
      }
    }
    function ce(e, t, a) {
      {
        var i = R.ReactDebugCurrentFrame, u = i.getStackAddendum();
        u !== "" && (t += "%s", a = a.concat([u]));
        var s = a.map(function(f) {
          return String(f);
        });
        s.unshift("Warning: " + t), Function.prototype.apply.call(console[e], console, s);
      }
    }
    var W = 0, q = 1, me = 2, K = 3, oe = 4, ne = 5, fe = 6, we = 7, ze = 8, qe = 9, _e = 10, ge = 11, Ne = 12, $ = 13, Le = 14, de = 15, Xt = 16, En = 17, Ht = 18, Ot = 19, mn = 21, Ye = 22, lt = 23, Lt = 24, Tt = 25, De = !0, ie = !1, Ue = !1, pe = !1, O = !1, Q = !0, We = !1, Je = !0, ct = !0, ot = !0, St = !0, dt = /* @__PURE__ */ new Set(), pt = {}, Zt = {};
    function Zn(e, t) {
      be(e, t), be(e + "Capture", t);
    }
    function be(e, t) {
      pt[e] && E("EventRegistry: More than one plugin attempted to publish the same registration name, `%s`.", e), pt[e] = t;
      {
        var a = e.toLowerCase();
        Zt[a] = e, e === "onDoubleClick" && (Zt.ondblclick = e);
      }
      for (var i = 0; i < t.length; i++)
        dt.add(t[i]);
    }
    var rn = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u", Cn = Object.prototype.hasOwnProperty;
    function Dn(e) {
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
        return E("The provided `%s` attribute is an unsupported type %s. This value must be coerced to a string before before using it here.", t, Dn(e)), An(e);
    }
    function qr(e) {
      if (Hn(e))
        return E("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", Dn(e)), An(e);
    }
    function Jn(e, t) {
      if (Hn(e))
        return E("The provided `%s` prop is an unsupported type %s. This value must be coerced to a string before before using it here.", t, Dn(e)), An(e);
    }
    function Cr(e, t) {
      if (Hn(e))
        return E("The provided `%s` CSS property is an unsupported type %s. This value must be coerced to a string before before using it here.", t, Dn(e)), An(e);
    }
    function Kr(e) {
      if (Hn(e))
        return E("The provided HTML markup uses a value of unsupported type %s. This value must be coerced to a string before before using it here.", Dn(e)), An(e);
    }
    function Rr(e) {
      if (Hn(e))
        return E("Form field values (value, checked, defaultValue, or defaultChecked props) must be strings, not %s. This value must be coerced to a string before before using it here.", Dn(e)), An(e);
    }
    var ga = 0, sr = 1, Xr = 2, Rn = 3, Or = 4, Si = 5, Sa = 6, se = ":A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD", $e = se + "\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040", vt = new RegExp("^[" + se + "][" + $e + "]*$"), jt = {}, Vt = {};
    function zn(e) {
      return Cn.call(Vt, e) ? !0 : Cn.call(jt, e) ? !1 : vt.test(e) ? (Vt[e] = !0, !0) : (jt[e] = !0, E("Invalid attribute name: `%s`", e), !1);
    }
    function Tn(e, t, a) {
      return t !== null ? t.type === ga : a ? !1 : e.length > 2 && (e[0] === "o" || e[0] === "O") && (e[1] === "n" || e[1] === "N");
    }
    function Tr(e, t, a, i) {
      if (a !== null && a.type === ga)
        return !1;
      switch (typeof t) {
        case "function":
        // $FlowIssue symbol is perfectly valid here
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
          case Si:
            return isNaN(t);
          case Sa:
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
    var Bt = {}, li = [
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
    li.forEach(function(e) {
      Bt[e] = new $t(
        e,
        ga,
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
    }), ["rowSpan", "start"].forEach(function(e) {
      Bt[e] = new $t(
        e,
        Si,
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
    var Aa = /[\-\:]([a-z])/g, yl = function(e) {
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
      var t = e.replace(Aa, yl);
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
      var t = e.replace(Aa, yl);
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
      var t = e.replace(Aa, yl);
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
    var iu = "xlinkHref";
    Bt[iu] = new $t(
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
    var Yu = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*\:/i, Vi = !1;
    function gl(e) {
      !Vi && Yu.test(e) && (Vi = !0, E("A future version of React will block javascript: URLs as a security precaution. Use event handlers instead if you can. If you need to generate unsafe HTML try using dangerouslySetInnerHTML instead. React was passed %s.", JSON.stringify(e)));
    }
    function Ea(e, t, a, i) {
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
    function Ei(e, t, a, i) {
      {
        if (!zn(t))
          return;
        if (!e.hasAttribute(t))
          return a === void 0 ? void 0 : null;
        var u = e.getAttribute(t);
        return Gr(a, t), u === "" + a ? a : u;
      }
    }
    function Ca(e, t, a, i) {
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
          var k = u.type, _;
          k === Rn || k === Or && a === !0 ? _ = "" : (Gr(a, g), _ = "" + a, u.sanitizeURL && gl(_.toString())), C ? e.setAttributeNS(C, g, _) : e.setAttribute(g, _);
        }
      }
    }
    var ui = Symbol.for("react.element"), Lr = Symbol.for("react.portal"), Ra = Symbol.for("react.fragment"), Ci = Symbol.for("react.strict_mode"), Ri = Symbol.for("react.profiler"), b = Symbol.for("react.provider"), J = Symbol.for("react.context"), ae = Symbol.for("react.forward_ref"), Pe = Symbol.for("react.suspense"), Et = Symbol.for("react.suspense_list"), wt = Symbol.for("react.memo"), Ke = Symbol.for("react.lazy"), ht = Symbol.for("react.scope"), Vn = Symbol.for("react.debug_trace_mode"), an = Symbol.for("react.offscreen"), fn = Symbol.for("react.legacy_hidden"), wr = Symbol.for("react.cache"), Ti = Symbol.for("react.tracing_marker"), Nt = Symbol.iterator, er = "@@iterator";
    function Nr(e) {
      if (e === null || typeof e != "object")
        return null;
      var t = Nt && e[Nt] || e[er];
      return typeof t == "function" ? t : null;
    }
    var mt = Object.assign, za = 0, Sl, Wu, El, Zr, as, Ar, is;
    function ls() {
    }
    ls.__reactDisabledLog = !0;
    function cc() {
      {
        if (za === 0) {
          Sl = console.log, Wu = console.info, El = console.warn, Zr = console.error, as = console.group, Ar = console.groupCollapsed, is = console.groupEnd;
          var e = {
            configurable: !0,
            enumerable: !0,
            value: ls,
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
        za++;
      }
    }
    function Qu() {
      {
        if (za--, za === 0) {
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
              value: Wu
            }),
            warn: mt({}, e, {
              value: El
            }),
            error: mt({}, e, {
              value: Zr
            }),
            group: mt({}, e, {
              value: as
            }),
            groupCollapsed: mt({}, e, {
              value: Ar
            }),
            groupEnd: mt({}, e, {
              value: is
            })
          });
        }
        za < 0 && E("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var Cl = R.ReactCurrentDispatcher, oi;
    function zr(e, t, a) {
      {
        if (oi === void 0)
          try {
            throw Error();
          } catch (u) {
            var i = u.stack.trim().match(/\n( *(at )?)/);
            oi = i && i[1] || "";
          }
        return `
` + oi + e;
      }
    }
    var Rl = !1, Tl;
    {
      var wl = typeof WeakMap == "function" ? WeakMap : Map;
      Tl = new wl();
    }
    function Gu(e, t) {
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
                    var k = `
` + p[g].replace(" at new ", " at ");
                    return e.displayName && k.includes("<anonymous>") && (k = k.replace("<anonymous>", e.displayName)), typeof e == "function" && Tl.set(e, k), k;
                  }
                while (g >= 1 && C >= 0);
              break;
            }
        }
      } finally {
        Rl = !1, Cl.current = s, Qu(), Error.prepareStackTrace = u;
      }
      var _ = e ? e.displayName || e.name : "", U = _ ? zr(_) : "";
      return typeof e == "function" && Tl.set(e, U), U;
    }
    function qu(e, t, a) {
      return Gu(e, !0);
    }
    function $i(e, t, a) {
      return Gu(e, !1);
    }
    function id(e) {
      var t = e.prototype;
      return !!(t && t.isReactComponent);
    }
    function wi(e, t, a) {
      if (e == null)
        return "";
      if (typeof e == "function")
        return Gu(e, id(e));
      if (typeof e == "string")
        return zr(e);
      switch (e) {
        case Pe:
          return zr("Suspense");
        case Et:
          return zr("SuspenseList");
      }
      if (typeof e == "object")
        switch (e.$$typeof) {
          case ae:
            return $i(e.render);
          case wt:
            return wi(e.type, t, a);
          case Ke: {
            var i = e, u = i._payload, s = i._init;
            try {
              return wi(s(u), t, a);
            } catch {
            }
          }
        }
      return "";
    }
    function At(e) {
      switch (e._debugOwner && e._debugOwner.type, e._debugSource, e.tag) {
        case ne:
          return zr(e.type);
        case Xt:
          return zr("Lazy");
        case $:
          return zr("Suspense");
        case Ot:
          return zr("SuspenseList");
        case W:
        case me:
        case de:
          return $i(e.type);
        case ge:
          return $i(e.type.render);
        case q:
          return qu(e.type);
        default:
          return "";
      }
    }
    function Ku(e) {
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
    function lu(e, t, a) {
      var i = e.displayName;
      if (i)
        return i;
      var u = t.displayName || t.name || "";
      return u !== "" ? a + "(" + u + ")" : a;
    }
    function Xu(e) {
      return e.displayName || "Context";
    }
    function bt(e) {
      if (e == null)
        return null;
      if (typeof e.tag == "number" && E("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof e == "function")
        return e.displayName || e.name || null;
      if (typeof e == "string")
        return e;
      switch (e) {
        case Ra:
          return "Fragment";
        case Lr:
          return "Portal";
        case Ri:
          return "Profiler";
        case Ci:
          return "StrictMode";
        case Pe:
          return "Suspense";
        case Et:
          return "SuspenseList";
      }
      if (typeof e == "object")
        switch (e.$$typeof) {
          case J:
            var t = e;
            return Xu(t) + ".Consumer";
          case b:
            var a = e;
            return Xu(a._context) + ".Provider";
          case ae:
            return lu(e, e.render, "ForwardRef");
          case wt:
            var i = e.displayName || null;
            return i !== null ? i : bt(e.type) || "Memo";
          case Ke: {
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
    function Zu(e, t, a) {
      var i = t.displayName || t.name || "";
      return e.displayName || (i !== "" ? a + "(" + i + ")" : a);
    }
    function Ju(e) {
      return e.displayName || "Context";
    }
    function at(e) {
      var t = e.tag, a = e.type;
      switch (t) {
        case Lt:
          return "Cache";
        case qe:
          var i = a;
          return Ju(i) + ".Consumer";
        case _e:
          var u = a;
          return Ju(u._context) + ".Provider";
        case Ht:
          return "DehydratedFragment";
        case ge:
          return Zu(a, a.render, "ForwardRef");
        case we:
          return "Fragment";
        case ne:
          return a;
        case oe:
          return "Portal";
        case K:
          return "Root";
        case fe:
          return "Text";
        case Xt:
          return bt(a);
        case ze:
          return a === Ci ? "StrictMode" : "Mode";
        case Ye:
          return "Offscreen";
        case Ne:
          return "Profiler";
        case mn:
          return "Scope";
        case $:
          return "Suspense";
        case Ot:
          return "SuspenseList";
        case Tt:
          return "TracingMarker";
        // The display name for this tags come from the user-provided type:
        case q:
        case W:
        case En:
        case me:
        case Le:
        case de:
          if (typeof a == "function")
            return a.displayName || a.name || null;
          if (typeof a == "string")
            return a;
          break;
      }
      return null;
    }
    var uu = R.ReactDebugCurrentFrame, wn = null, Jr = !1;
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
      return wn === null ? "" : Ku(wn);
    }
    function kn() {
      uu.getCurrentStack = null, wn = null, Jr = !1;
    }
    function It(e) {
      uu.getCurrentStack = e === null ? null : bl, wn = e, Jr = !1;
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
    function bi(e) {
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
      dc[t.type] || t.onChange || t.onInput || t.readOnly || t.disabled || t.value == null || E("You provided a `value` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultValue`. Otherwise, set either `onChange` or `readOnly`."), t.onChange || t.readOnly || t.disabled || t.checked == null || E("You provided a `checked` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultChecked`. Otherwise, set either `onChange` or `readOnly`.");
    }
    function xl(e) {
      var t = e.type, a = e.nodeName;
      return a && a.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
    }
    function pc(e) {
      return e._valueTracker;
    }
    function Ua(e) {
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
            Ua(e), delete e[t];
          }
        };
        return f;
      }
    }
    function Fa(e) {
      pc(e) || (e._valueTracker = Ii(e));
    }
    function eo(e) {
      if (!e)
        return !1;
      var t = pc(e);
      if (!t)
        return !0;
      var a = t.getValue(), i = _l(e);
      return i !== a ? (t.setValue(i), !0) : !1;
    }
    function Dl(e) {
      if (e = e || (typeof document < "u" ? document : void 0), typeof e > "u")
        return null;
      try {
        return e.activeElement || e.body;
      } catch {
        return e.body;
      }
    }
    var kl = !1, ou = !1, to = !1, us = !1;
    function si(e) {
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
      Bi("input", t), t.checked !== void 0 && t.defaultChecked !== void 0 && !ou && (E("%s contains an input of type %s with both checked and defaultChecked props. Input elements must be either controlled or uncontrolled (specify either the checked prop, or the defaultChecked prop, but not both). Decide between using a controlled or uncontrolled input element and remove one of these props. More info: https://reactjs.org/link/controlled-components", Ur() || "A component", t.type), ou = !0), t.value !== void 0 && t.defaultValue !== void 0 && !kl && (E("%s contains an input of type %s with both value and defaultValue props. Input elements must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both). Decide between using a controlled or uncontrolled input element and remove one of these props. More info: https://reactjs.org/link/controlled-components", Ur() || "A component", t.type), kl = !0);
      var a = e, i = t.defaultValue == null ? "" : t.defaultValue;
      a._wrapperState = {
        initialChecked: t.checked != null ? t.checked : t.defaultChecked,
        initialValue: bi(t.value != null ? t.value : i),
        controlled: si(t)
      };
    }
    function F(e, t) {
      var a = e, i = t.checked;
      i != null && Ca(a, "checked", i, !1);
    }
    function V(e, t) {
      var a = e;
      {
        var i = si(t);
        !a._wrapperState.controlled && i && !us && (E("A component is changing an uncontrolled input to be controlled. This is likely caused by the value changing from undefined to a defined value, which should not happen. Decide between using a controlled or uncontrolled input element for the lifetime of the component. More info: https://reactjs.org/link/controlled-components"), us = !0), a._wrapperState.controlled && !i && !to && (E("A component is changing a controlled input to be uncontrolled. This is likely caused by the value changing from a defined to undefined, which should not happen. Decide between using a controlled or uncontrolled input element for the lifetime of the component. More info: https://reactjs.org/link/controlled-components"), to = !0);
      }
      F(e, t);
      var u = bi(t.value), s = t.type;
      if (u != null)
        s === "number" ? (u === 0 && a.value === "" || // We explicitly want to coerce to number here if possible.
        // eslint-disable-next-line
        a.value != u) && (a.value = tr(u)) : a.value !== tr(u) && (a.value = tr(u));
      else if (s === "submit" || s === "reset") {
        a.removeAttribute("value");
        return;
      }
      t.hasOwnProperty("value") ? Ge(a, t.type, u) : t.hasOwnProperty("defaultValue") && Ge(a, t.type, bi(t.defaultValue)), t.checked == null && t.defaultChecked != null && (a.defaultChecked = !!t.defaultChecked);
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
    function Xe(e, t) {
      var a = e;
      V(a, t), ye(a, t);
    }
    function ye(e, t) {
      var a = t.name;
      if (t.type === "radio" && a != null) {
        for (var i = e; i.parentNode; )
          i = i.parentNode;
        Gr(a, "name");
        for (var u = i.querySelectorAll("input[name=" + JSON.stringify("" + a) + '][type="radio"]'), s = 0; s < u.length; s++) {
          var f = u[s];
          if (!(f === e || f.form !== e.form)) {
            var p = Wh(f);
            if (!p)
              throw new Error("ReactDOMInput: Mixing React and non-React radio inputs with the same `name` is not supported.");
            eo(f), V(f, p);
          }
        }
      }
    }
    function Ge(e, t, a) {
      // Focused number inputs synchronize on blur. See ChangeEventPlugin.js
      (t !== "number" || Dl(e.ownerDocument) !== e) && (a == null ? e.defaultValue = tr(e._wrapperState.initialValue) : e.defaultValue !== tr(a) && (e.defaultValue = tr(a)));
    }
    var yt = !1, Mt = !1, ln = !1;
    function Gt(e, t) {
      t.value == null && (typeof t.children == "object" && t.children !== null ? m.Children.forEach(t.children, function(a) {
        a != null && (typeof a == "string" || typeof a == "number" || Mt || (Mt = !0, E("Cannot infer the option value of complex children. Pass a `value` prop or use a plain string as children to <option>.")));
      }) : t.dangerouslySetInnerHTML != null && (ln || (ln = !0, E("Pass a `value` prop if you set dangerouslyInnerHTML so React knows which value should be selected.")))), t.selected != null && !yt && (E("Use the `defaultValue` or `value` props on <select> instead of setting `selected` on <option>."), yt = !0);
    }
    function un(e, t) {
      t.value != null && e.setAttribute("value", tr(bi(t.value)));
    }
    var sn = Array.isArray;
    function xt(e) {
      return sn(e);
    }
    var Yi;
    Yi = !1;
    function no() {
      var e = Ur();
      return e ? `

Check the render method of \`` + e + "`." : "";
    }
    var os = ["value", "defaultValue"];
    function ld(e) {
      {
        Bi("select", e);
        for (var t = 0; t < os.length; t++) {
          var a = os[t];
          if (e[a] != null) {
            var i = xt(e[a]);
            e.multiple && !i ? E("The `%s` prop supplied to <select> must be an array if `multiple` is true.%s", a, no()) : !e.multiple && i && E("The `%s` prop supplied to <select> must be a scalar value if `multiple` is false.%s", a, no());
          }
        }
      }
    }
    function ci(e, t, a, i) {
      var u = e.options;
      if (t) {
        for (var s = a, f = {}, p = 0; p < s.length; p++)
          f["$" + s[p]] = !0;
        for (var v = 0; v < u.length; v++) {
          var g = f.hasOwnProperty("$" + u[v].value);
          u[v].selected !== g && (u[v].selected = g), g && i && (u[v].defaultSelected = !0);
        }
      } else {
        for (var C = tr(bi(a)), k = null, _ = 0; _ < u.length; _++) {
          if (u[_].value === C) {
            u[_].selected = !0, i && (u[_].defaultSelected = !0);
            return;
          }
          k === null && !u[_].disabled && (k = u[_]);
        }
        k !== null && (k.selected = !0);
      }
    }
    function ss(e, t) {
      return mt({}, t, {
        value: void 0
      });
    }
    function cs(e, t) {
      var a = e;
      ld(t), a._wrapperState = {
        wasMultiple: !!t.multiple
      }, t.value !== void 0 && t.defaultValue !== void 0 && !Yi && (E("Select elements must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both). Decide between using a controlled or uncontrolled select element and remove one of these props. More info: https://reactjs.org/link/controlled-components"), Yi = !0);
    }
    function ud(e, t) {
      var a = e;
      a.multiple = !!t.multiple;
      var i = t.value;
      i != null ? ci(a, !!t.multiple, i, !1) : t.defaultValue != null && ci(a, !!t.multiple, t.defaultValue, !0);
    }
    function wy(e, t) {
      var a = e, i = a._wrapperState.wasMultiple;
      a._wrapperState.wasMultiple = !!t.multiple;
      var u = t.value;
      u != null ? ci(a, !!t.multiple, u, !1) : i !== !!t.multiple && (t.defaultValue != null ? ci(a, !!t.multiple, t.defaultValue, !0) : ci(a, !!t.multiple, t.multiple ? [] : "", !1));
    }
    function by(e, t) {
      var a = e, i = t.value;
      i != null && ci(a, !!t.multiple, i, !1);
    }
    var od = !1;
    function sd(e, t) {
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
    function yv(e, t) {
      var a = e;
      Bi("textarea", t), t.value !== void 0 && t.defaultValue !== void 0 && !od && (E("%s contains a textarea with both value and defaultValue props. Textarea elements must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both). Decide between using a controlled or uncontrolled textarea and remove one of these props. More info: https://reactjs.org/link/controlled-components", Ur() || "A component"), od = !0);
      var i = t.value;
      if (i == null) {
        var u = t.children, s = t.defaultValue;
        if (u != null) {
          E("Use the `defaultValue` or `value` props instead of setting children on <textarea>.");
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
        initialValue: bi(i)
      };
    }
    function gv(e, t) {
      var a = e, i = bi(t.value), u = bi(t.defaultValue);
      if (i != null) {
        var s = tr(i);
        s !== a.value && (a.value = s), t.defaultValue == null && a.defaultValue !== s && (a.defaultValue = s);
      }
      u != null && (a.defaultValue = tr(u));
    }
    function Sv(e, t) {
      var a = e, i = a.textContent;
      i === a._wrapperState.initialValue && i !== "" && i !== null && (a.value = i);
    }
    function cd(e, t) {
      gv(e, t);
    }
    var Wi = "http://www.w3.org/1999/xhtml", xy = "http://www.w3.org/1998/Math/MathML", fd = "http://www.w3.org/2000/svg";
    function vc(e) {
      switch (e) {
        case "svg":
          return fd;
        case "math":
          return xy;
        default:
          return Wi;
      }
    }
    function dd(e, t) {
      return e == null || e === Wi ? vc(t) : e === fd && t === "foreignObject" ? Wi : e;
    }
    var _y = function(e) {
      return typeof MSApp < "u" && MSApp.execUnsafeLocalFunction ? function(t, a, i, u) {
        MSApp.execUnsafeLocalFunction(function() {
          return e(t, a, i, u);
        });
      } : e;
    }, hc, Ev = _y(function(e, t) {
      if (e.namespaceURI === fd && !("innerHTML" in e)) {
        hc = hc || document.createElement("div"), hc.innerHTML = "<svg>" + t.valueOf().toString() + "</svg>";
        for (var a = hc.firstChild; e.firstChild; )
          e.removeChild(e.firstChild);
        for (; a.firstChild; )
          e.appendChild(a.firstChild);
        return;
      }
      e.innerHTML = t;
    }), ta = 1, Qi = 3, $n = 8, fi = 9, su = 11, mc = function(e, t) {
      if (t) {
        var a = e.firstChild;
        if (a && a === e.lastChild && a.nodeType === Qi) {
          a.nodeValue = t;
          return;
        }
      }
      e.textContent = t;
    }, Cv = {
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
    }, ro = {
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
    function Rv(e, t) {
      return e + t.charAt(0).toUpperCase() + t.substring(1);
    }
    var Tv = ["Webkit", "ms", "Moz", "O"];
    Object.keys(ro).forEach(function(e) {
      Tv.forEach(function(t) {
        ro[Rv(t, e)] = ro[e];
      });
    });
    function yc(e, t, a) {
      var i = t == null || typeof t == "boolean" || t === "";
      return i ? "" : !a && typeof t == "number" && t !== 0 && !(ro.hasOwnProperty(e) && ro[e]) ? t + "px" : (Cr(t, e), ("" + t).trim());
    }
    var ao = /([A-Z])/g, Dy = /^ms-/;
    function ky(e) {
      return e.replace(ao, "-$1").toLowerCase().replace(Dy, "-ms-");
    }
    var wv = function() {
    };
    {
      var bv = /^(?:webkit|moz|o)[A-Z]/, xv = /^-ms-/, fs = /-(.)/g, io = /;\s*$/, lo = {}, uo = {}, _v = !1, pd = !1, vd = function(e) {
        return e.replace(fs, function(t, a) {
          return a.toUpperCase();
        });
      }, hd = function(e) {
        lo.hasOwnProperty(e) && lo[e] || (lo[e] = !0, E(
          "Unsupported style property %s. Did you mean %s?",
          e,
          // As Andi Smith suggests
          // (http://www.andismith.com/blog/2012/02/modernizr-prefixed/), an `-ms` prefix
          // is converted to lowercase `ms`.
          vd(e.replace(xv, "ms-"))
        ));
      }, Dv = function(e) {
        lo.hasOwnProperty(e) && lo[e] || (lo[e] = !0, E("Unsupported vendor-prefixed style property %s. Did you mean %s?", e, e.charAt(0).toUpperCase() + e.slice(1)));
      }, kv = function(e, t) {
        uo.hasOwnProperty(t) && uo[t] || (uo[t] = !0, E(`Style property values shouldn't contain a semicolon. Try "%s: %s" instead.`, e, t.replace(io, "")));
      }, Ov = function(e, t) {
        _v || (_v = !0, E("`NaN` is an invalid value for the `%s` css style property.", e));
      }, Oy = function(e, t) {
        pd || (pd = !0, E("`Infinity` is an invalid value for the `%s` css style property.", e));
      };
      wv = function(e, t) {
        e.indexOf("-") > -1 ? hd(e) : bv.test(e) ? Dv(e) : io.test(t) && kv(e, t), typeof t == "number" && (isNaN(t) ? Ov(e, t) : isFinite(t) || Oy(e, t));
      };
    }
    var My = wv;
    function Ly(e) {
      {
        var t = "", a = "";
        for (var i in e)
          if (e.hasOwnProperty(i)) {
            var u = e[i];
            if (u != null) {
              var s = i.indexOf("--") === 0;
              t += a + (s ? i : ky(i)) + ":", t += yc(i, u, s), a = ";";
            }
          }
        return t || null;
      }
    }
    function Mv(e, t) {
      var a = e.style;
      for (var i in t)
        if (t.hasOwnProperty(i)) {
          var u = i.indexOf("--") === 0;
          u || My(i, t[i]);
          var s = yc(i, t[i], u);
          i === "float" && (i = "cssFloat"), u ? a.setProperty(i, s) : a[i] = s;
        }
    }
    function Ny(e) {
      return e == null || typeof e == "boolean" || e === "";
    }
    function ja(e) {
      var t = {};
      for (var a in e)
        for (var i = Cv[a] || [a], u = 0; u < i.length; u++)
          t[i[u]] = a;
      return t;
    }
    function ds(e, t) {
      {
        if (!t)
          return;
        var a = ja(e), i = ja(t), u = {};
        for (var s in a) {
          var f = a[s], p = i[s];
          if (p && f !== p) {
            var v = f + "," + p;
            if (u[v])
              continue;
            u[v] = !0, E("%s a style property during rerender (%s) when a conflicting property is set (%s) can lead to styling bugs. To avoid this, don't mix shorthand and non-shorthand properties for the same value; instead, replace the shorthand with separate values.", Ny(e[f]) ? "Removing" : "Updating", f, p);
          }
        }
      }
    }
    var Lv = {
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
    }, Nv = mt({
      menuitem: !0
    }, Lv), Av = "__html";
    function gc(e, t) {
      if (t) {
        if (Nv[e] && (t.children != null || t.dangerouslySetInnerHTML != null))
          throw new Error(e + " is a void element tag and must neither have `children` nor use `dangerouslySetInnerHTML`.");
        if (t.dangerouslySetInnerHTML != null) {
          if (t.children != null)
            throw new Error("Can only set one of `children` or `props.dangerouslySetInnerHTML`.");
          if (typeof t.dangerouslySetInnerHTML != "object" || !(Av in t.dangerouslySetInnerHTML))
            throw new Error("`props.dangerouslySetInnerHTML` must be in the form `{__html: ...}`. Please visit https://reactjs.org/link/dangerously-set-inner-html for more information.");
        }
        if (!t.suppressContentEditableWarning && t.contentEditable && t.children != null && E("A component is `contentEditable` and contains `children` managed by React. It is now your responsibility to guarantee that none of those nodes are unexpectedly modified or duplicated. This is probably not intentional."), t.style != null && typeof t.style != "object")
          throw new Error("The `style` prop expects a mapping from style properties to values, not a string. For example, style={{marginRight: spacing + 'em'}} when using JSX.");
      }
    }
    function Gi(e, t) {
      if (e.indexOf("-") === -1)
        return typeof t.is == "string";
      switch (e) {
        // These are reserved SVG and MathML elements.
        // We don't mind this list too much because we expect it to never grow.
        // The alternative is to track the namespace in a few places which is convoluted.
        // https://w3c.github.io/webcomponents/spec/custom/#custom-elements-core-concepts
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
    }, zv = {
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
    }, di = {}, md = new RegExp("^(aria)-[" + $e + "]*$"), ps = new RegExp("^(aria)[A-Z][" + $e + "]*$");
    function yd(e, t) {
      {
        if (Cn.call(di, t) && di[t])
          return !0;
        if (ps.test(t)) {
          var a = "aria-" + t.slice(4).toLowerCase(), i = zv.hasOwnProperty(a) ? a : null;
          if (i == null)
            return E("Invalid ARIA attribute `%s`. ARIA attributes follow the pattern aria-* and must be lowercase.", t), di[t] = !0, !0;
          if (t !== i)
            return E("Invalid ARIA attribute `%s`. Did you mean `%s`?", t, i), di[t] = !0, !0;
        }
        if (md.test(t)) {
          var u = t.toLowerCase(), s = zv.hasOwnProperty(u) ? u : null;
          if (s == null)
            return di[t] = !0, !1;
          if (t !== s)
            return E("Unknown ARIA attribute `%s`. Did you mean `%s`?", t, s), di[t] = !0, !0;
        }
      }
      return !0;
    }
    function Uv(e, t) {
      {
        var a = [];
        for (var i in t) {
          var u = yd(e, i);
          u || a.push(i);
        }
        var s = a.map(function(f) {
          return "`" + f + "`";
        }).join(", ");
        a.length === 1 ? E("Invalid aria prop %s on <%s> tag. For details, see https://reactjs.org/link/invalid-aria-props", s, e) : a.length > 1 && E("Invalid aria props %s on <%s> tag. For details, see https://reactjs.org/link/invalid-aria-props", s, e);
      }
    }
    function Ec(e, t) {
      Gi(e, t) || Uv(e, t);
    }
    var cu = !1;
    function gd(e, t) {
      {
        if (e !== "input" && e !== "textarea" && e !== "select")
          return;
        t != null && t.value === null && !cu && (cu = !0, e === "select" && t.multiple ? E("`value` prop on `%s` should not be null. Consider using an empty array when `multiple` is set to `true` to clear the component or `undefined` for uncontrolled components.", e) : E("`value` prop on `%s` should not be null. Consider using an empty string to clear the component or `undefined` for uncontrolled components.", e));
      }
    }
    var Sd = function() {
    };
    {
      var nr = {}, Ed = /^on./, Fv = /^on[^A-Z]/, jv = new RegExp("^(aria)-[" + $e + "]*$"), Pv = new RegExp("^(aria)[A-Z][" + $e + "]*$");
      Sd = function(e, t, a, i) {
        if (Cn.call(nr, t) && nr[t])
          return !0;
        var u = t.toLowerCase();
        if (u === "onfocusin" || u === "onfocusout")
          return E("React uses onFocus and onBlur instead of onFocusIn and onFocusOut. All React events are normalized to bubble, so onFocusIn and onFocusOut are not needed/supported by React."), nr[t] = !0, !0;
        if (i != null) {
          var s = i.registrationNameDependencies, f = i.possibleRegistrationNames;
          if (s.hasOwnProperty(t))
            return !0;
          var p = f.hasOwnProperty(u) ? f[u] : null;
          if (p != null)
            return E("Invalid event handler property `%s`. Did you mean `%s`?", t, p), nr[t] = !0, !0;
          if (Ed.test(t))
            return E("Unknown event handler property `%s`. It will be ignored.", t), nr[t] = !0, !0;
        } else if (Ed.test(t))
          return Fv.test(t) && E("Invalid event handler property `%s`. React events use the camelCase naming convention, for example `onClick`.", t), nr[t] = !0, !0;
        if (jv.test(t) || Pv.test(t))
          return !0;
        if (u === "innerhtml")
          return E("Directly setting property `innerHTML` is not permitted. For more information, lookup documentation on `dangerouslySetInnerHTML`."), nr[t] = !0, !0;
        if (u === "aria")
          return E("The `aria` attribute is reserved for future use in React. Pass individual `aria-` attributes instead."), nr[t] = !0, !0;
        if (u === "is" && a !== null && a !== void 0 && typeof a != "string")
          return E("Received a `%s` for a string attribute `is`. If this is expected, cast the value to a string.", typeof a), nr[t] = !0, !0;
        if (typeof a == "number" && isNaN(a))
          return E("Received NaN for the `%s` attribute. If this is expected, cast the value to a string.", t), nr[t] = !0, !0;
        var v = Mr(t), g = v !== null && v.type === ga;
        if (Sc.hasOwnProperty(u)) {
          var C = Sc[u];
          if (C !== t)
            return E("Invalid DOM property `%s`. Did you mean `%s`?", t, C), nr[t] = !0, !0;
        } else if (!g && t !== u)
          return E("React does not recognize the `%s` prop on a DOM element. If you intentionally want it to appear in the DOM as a custom attribute, spell it as lowercase `%s` instead. If you accidentally passed it from a parent component, remove it from the DOM element.", t, u), nr[t] = !0, !0;
        return typeof a == "boolean" && Tr(t, a, v, !1) ? (a ? E('Received `%s` for a non-boolean attribute `%s`.\n\nIf you want to write it to the DOM, pass a string instead: %s="%s" or %s={value.toString()}.', a, t, t, a, t) : E('Received `%s` for a non-boolean attribute `%s`.\n\nIf you want to write it to the DOM, pass a string instead: %s="%s" or %s={value.toString()}.\n\nIf you used to conditionally omit it with %s={condition && value}, pass %s={condition ? value : undefined} instead.', a, t, t, a, t, t, t), nr[t] = !0, !0) : g ? !0 : Tr(t, a, v, !1) ? (nr[t] = !0, !1) : ((a === "false" || a === "true") && v !== null && v.type === Rn && (E("Received the string `%s` for the boolean attribute `%s`. %s Did you mean %s={%s}?", a, t, a === "false" ? "The browser will interpret it as a truthy value." : 'Although this works, it will not work as expected if you pass the string "false".', t, a), nr[t] = !0), !0);
      };
    }
    var Hv = function(e, t, a) {
      {
        var i = [];
        for (var u in t) {
          var s = Sd(e, u, t[u], a);
          s || i.push(u);
        }
        var f = i.map(function(p) {
          return "`" + p + "`";
        }).join(", ");
        i.length === 1 ? E("Invalid value for prop %s on <%s> tag. Either remove it from the element, or pass a string or number value to keep it in the DOM. For details, see https://reactjs.org/link/attribute-behavior ", f, e) : i.length > 1 && E("Invalid values for props %s on <%s> tag. Either remove them from the element, or pass a string or number value to keep them in the DOM. For details, see https://reactjs.org/link/attribute-behavior ", f, e);
      }
    };
    function Vv(e, t, a) {
      Gi(e, t) || Hv(e, t, a);
    }
    var qi = 1, vs = 2, fu = 4, Ay = qi | vs | fu, hs = null;
    function ms(e) {
      hs !== null && E("Expected currently replaying event to be null. This error is likely caused by a bug in React. Please file an issue."), hs = e;
    }
    function zy() {
      hs === null && E("Expected currently replaying event to not be null. This error is likely caused by a bug in React. Please file an issue."), hs = null;
    }
    function $v(e) {
      return e === hs;
    }
    function Cc(e) {
      var t = e.target || e.srcElement || window;
      return t.correspondingUseElement && (t = t.correspondingUseElement), t.nodeType === Qi ? t.parentNode : t;
    }
    var on = null, Ol = null, Ki = null;
    function oo(e) {
      var t = $o(e);
      if (t) {
        if (typeof on != "function")
          throw new Error("setRestoreImplementation() needs to be called to handle a target for controlled events. This error is likely caused by a bug in React. Please file an issue.");
        var a = t.stateNode;
        if (a) {
          var i = Wh(a);
          on(t.stateNode, t.type, i);
        }
      }
    }
    function Bv(e) {
      on = e;
    }
    function Rc(e) {
      Ol ? Ki ? Ki.push(e) : Ki = [e] : Ol = e;
    }
    function ys() {
      return Ol !== null || Ki !== null;
    }
    function gs() {
      if (Ol) {
        var e = Ol, t = Ki;
        if (Ol = null, Ki = null, oo(e), t)
          for (var a = 0; a < t.length; a++)
            oo(t[a]);
      }
    }
    var du = function(e, t) {
      return e(t);
    }, Cd = function() {
    }, Rd = !1;
    function Uy() {
      var e = ys();
      e && (Cd(), gs());
    }
    function Td(e, t, a) {
      if (Rd)
        return e(t, a);
      Rd = !0;
      try {
        return du(e, t, a);
      } finally {
        Rd = !1, Uy();
      }
    }
    function Tc(e, t, a) {
      du = e, Cd = a;
    }
    function wc(e) {
      return e === "button" || e === "input" || e === "select" || e === "textarea";
    }
    function wd(e, t, a) {
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
    function pu(e, t) {
      var a = e.stateNode;
      if (a === null)
        return null;
      var i = Wh(a);
      if (i === null)
        return null;
      var u = i[t];
      if (wd(t, e.type, i))
        return null;
      if (u && typeof u != "function")
        throw new Error("Expected `" + t + "` listener to be a function, instead got a value of `" + typeof u + "` type.");
      return u;
    }
    var Ss = !1;
    if (rn)
      try {
        var vu = {};
        Object.defineProperty(vu, "passive", {
          get: function() {
            Ss = !0;
          }
        }), window.addEventListener("test", vu, vu), window.removeEventListener("test", vu, vu);
      } catch {
        Ss = !1;
      }
    function Iv(e, t, a, i, u, s, f, p, v) {
      var g = Array.prototype.slice.call(arguments, 3);
      try {
        t.apply(a, g);
      } catch (C) {
        this.onError(C);
      }
    }
    var bd = Iv;
    if (typeof window < "u" && typeof window.dispatchEvent == "function" && typeof document < "u" && typeof document.createEvent == "function") {
      var xd = document.createElement("react");
      bd = function(t, a, i, u, s, f, p, v, g) {
        if (typeof document > "u" || document === null)
          throw new Error("The `document` global was defined when React was initialized, but is not defined anymore. This can happen in a test environment if a component schedules an update from an asynchronous callback, but the test has already finished running. To solve this, you can either unmount the component at the end of your test (and ensure that any asynchronous operations get canceled in `componentWillUnmount`), or you can change the test itself to be asynchronous.");
        var C = document.createEvent("Event"), k = !1, _ = !0, U = window.event, P = Object.getOwnPropertyDescriptor(window, "event");
        function I() {
          xd.removeEventListener(Y, Qe, !1), typeof window.event < "u" && window.hasOwnProperty("event") && (window.event = U);
        }
        var Se = Array.prototype.slice.call(arguments, 3);
        function Qe() {
          k = !0, I(), a.apply(i, Se), _ = !1;
        }
        var Ve, kt = !1, Rt = !1;
        function N(A) {
          if (Ve = A.error, kt = !0, Ve === null && A.colno === 0 && A.lineno === 0 && (Rt = !0), A.defaultPrevented && Ve != null && typeof Ve == "object")
            try {
              Ve._suppressLogging = !0;
            } catch {
            }
        }
        var Y = "react-" + (t || "invokeguardedcallback");
        if (window.addEventListener("error", N), xd.addEventListener(Y, Qe, !1), C.initEvent(Y, !1, !1), xd.dispatchEvent(C), P && Object.defineProperty(window, "event", P), k && _ && (kt ? Rt && (Ve = new Error("A cross-origin error was thrown. React doesn't have access to the actual error object in development. See https://reactjs.org/link/crossorigin-error for more information.")) : Ve = new Error(`An error was thrown inside one of your components, but React doesn't know what it was. This is likely due to browser flakiness. React does its best to preserve the "Pause on exceptions" behavior of the DevTools, which requires some DEV-mode only tricks. It's possible that these don't work in your browser. Try triggering the error in production mode, or switching to a modern browser. If you suspect that this is actually an issue with React, please file an issue.`), this.onError(Ve)), window.removeEventListener("error", N), !k)
          return I(), Iv.apply(this, arguments);
      };
    }
    var Fy = bd, Ml = !1, pi = null, Es = !1, Ll = null, xi = {
      onError: function(e) {
        Ml = !0, pi = e;
      }
    };
    function hu(e, t, a, i, u, s, f, p, v) {
      Ml = !1, pi = null, Fy.apply(xi, arguments);
    }
    function Xi(e, t, a, i, u, s, f, p, v) {
      if (hu.apply(this, arguments), Ml) {
        var g = Dd();
        Es || (Es = !0, Ll = g);
      }
    }
    function _d() {
      if (Es) {
        var e = Ll;
        throw Es = !1, Ll = null, e;
      }
    }
    function jy() {
      return Ml;
    }
    function Dd() {
      if (Ml) {
        var e = pi;
        return Ml = !1, pi = null, e;
      } else
        throw new Error("clearCaughtError was called but no error was captured. This error is likely caused by a bug in React. Please file an issue.");
    }
    function Pa(e) {
      return e._reactInternals;
    }
    function Cs(e) {
      return e._reactInternals !== void 0;
    }
    function so(e, t) {
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
    ), _i = (
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
    ), Ha = (
      /*                     */
      1024
    ), yn = (
      /*                      */
      2048
    ), Va = (
      /*                    */
      4096
    ), Al = (
      /*                   */
      8192
    ), Rs = (
      /*             */
      16384
    ), bc = yn | ft | _i | na | Ha | Rs, Yv = (
      /*               */
      32767
    ), Ta = (
      /*                   */
      32768
    ), rr = (
      /*                */
      65536
    ), Ts = (
      /* */
      131072
    ), kd = (
      /*                       */
      1048576
    ), Od = (
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
    ), mu = (
      /*              */
      33554432
    ), co = (
      // TODO: Remove Update flag from before mutation phase by re-landing Visibility
      // flag logic (see #20043)
      ft | Ha | 0
    ), ia = dn | ft | Pt | Yt | na | Va | Al, br = ft | _i | na | Al, $a = yn | Pt, cr = ra | zl | Od, Zi = R.ReactCurrentOwner;
    function wa(e) {
      var t = e, a = e;
      if (e.alternate)
        for (; t.return; )
          t = t.return;
      else {
        var i = t;
        do
          t = i, (t.flags & (dn | Va)) !== Ie && (a = t.return), i = t.return;
        while (i);
      }
      return t.tag === K ? a : null;
    }
    function Md(e) {
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
    function Ld(e) {
      return wa(e) === e;
    }
    function ba(e) {
      {
        var t = Zi.current;
        if (t !== null && t.tag === q) {
          var a = t, i = a.stateNode;
          i._warnedAboutRefsInRender || E("%s is accessing isMounted inside its render() function. render() should be a pure function of props and state. It should never access something that requires stale data from the previous render, such as refs. Move this logic to componentDidMount and componentDidUpdate instead.", at(a) || "A component"), i._warnedAboutRefsInRender = !0;
        }
      }
      var u = Pa(e);
      return u ? wa(u) === u : !1;
    }
    function la(e) {
      if (wa(e) !== e)
        throw new Error("Unable to find node on an unmounted component.");
    }
    function pn(e) {
      var t = e.alternate;
      if (!t) {
        var a = wa(e);
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
    function Ba(e) {
      var t = pn(e);
      return t !== null ? Nd(t) : null;
    }
    function Nd(e) {
      if (e.tag === ne || e.tag === fe)
        return e;
      for (var t = e.child; t !== null; ) {
        var a = Nd(t);
        if (a !== null)
          return a;
        t = t.sibling;
      }
      return null;
    }
    function Wv(e) {
      var t = pn(e);
      return t !== null ? _c(t) : null;
    }
    function _c(e) {
      if (e.tag === ne || e.tag === fe)
        return e;
      for (var t = e.child; t !== null; ) {
        if (t.tag !== oe) {
          var a = _c(t);
          if (a !== null)
            return a;
        }
        t = t.sibling;
      }
      return null;
    }
    var Dc = S.unstable_scheduleCallback, Qv = S.unstable_cancelCallback, kc = S.unstable_shouldYield, Gv = S.unstable_requestPaint, bn = S.unstable_now, Ad = S.unstable_getCurrentPriorityLevel, Oc = S.unstable_ImmediatePriority, yu = S.unstable_UserBlockingPriority, Di = S.unstable_NormalPriority, qv = S.unstable_LowPriority, Mc = S.unstable_IdlePriority, fo = S.unstable_yieldValue, Kv = S.unstable_setDisableYieldValue, Ji = null, Wn = null, ve = null, Ia = !1, xa = typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u";
    function zd(e) {
      if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u")
        return !1;
      var t = __REACT_DEVTOOLS_GLOBAL_HOOK__;
      if (t.isDisabled)
        return !0;
      if (!t.supportsFiber)
        return E("The installed version of React DevTools is too old and will not work with the current version of React. Please update React DevTools. https://reactjs.org/link/react-devtools"), !0;
      try {
        ct && (e = mt({}, e, {
          getLaneLabelMap: el,
          injectProfilingHooks: Xv
        })), Ji = t.inject(e), Wn = t;
      } catch (a) {
        E("React instrumentation encountered an error: %s.", a);
      }
      return !!t.checkDCE;
    }
    function Ud(e, t) {
      if (Wn && typeof Wn.onScheduleFiberRoot == "function")
        try {
          Wn.onScheduleFiberRoot(Ji, e, t);
        } catch (a) {
          Ia || (Ia = !0, E("React instrumentation encountered an error: %s", a));
        }
    }
    function po(e, t) {
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
                i = yu;
                break;
              case ki:
                i = Di;
                break;
              case bo:
                i = Mc;
                break;
              default:
                i = Di;
                break;
            }
            Wn.onCommitFiberRoot(Ji, e, i, a);
          }
        } catch (u) {
          Ia || (Ia = !0, E("React instrumentation encountered an error: %s", u));
        }
    }
    function Ya(e) {
      if (Wn && typeof Wn.onPostCommitFiberRoot == "function")
        try {
          Wn.onPostCommitFiberRoot(Ji, e);
        } catch (t) {
          Ia || (Ia = !0, E("React instrumentation encountered an error: %s", t));
        }
    }
    function gu(e) {
      if (Wn && typeof Wn.onCommitFiberUnmount == "function")
        try {
          Wn.onCommitFiberUnmount(Ji, e);
        } catch (t) {
          Ia || (Ia = !0, E("React instrumentation encountered an error: %s", t));
        }
    }
    function Bn(e) {
      if (typeof fo == "function" && (Kv(e), H(e)), Wn && typeof Wn.setStrictMode == "function")
        try {
          Wn.setStrictMode(Ji, e);
        } catch (t) {
          Ia || (Ia = !0, E("React instrumentation encountered an error: %s", t));
        }
    }
    function Xv(e) {
      ve = e;
    }
    function el() {
      {
        for (var e = /* @__PURE__ */ new Map(), t = 1, a = 0; a < Ds; a++) {
          var i = Hy(t);
          e.set(t, i), t *= 2;
        }
        return e;
      }
    }
    function Ul(e) {
      ve !== null && typeof ve.markCommitStarted == "function" && ve.markCommitStarted(e);
    }
    function Lc() {
      ve !== null && typeof ve.markCommitStopped == "function" && ve.markCommitStopped();
    }
    function vo(e) {
      ve !== null && typeof ve.markComponentRenderStarted == "function" && ve.markComponentRenderStarted(e);
    }
    function ua() {
      ve !== null && typeof ve.markComponentRenderStopped == "function" && ve.markComponentRenderStopped();
    }
    function Fl(e) {
      ve !== null && typeof ve.markComponentPassiveEffectMountStarted == "function" && ve.markComponentPassiveEffectMountStarted(e);
    }
    function Nc() {
      ve !== null && typeof ve.markComponentPassiveEffectMountStopped == "function" && ve.markComponentPassiveEffectMountStopped();
    }
    function Zv(e) {
      ve !== null && typeof ve.markComponentPassiveEffectUnmountStarted == "function" && ve.markComponentPassiveEffectUnmountStarted(e);
    }
    function Ac() {
      ve !== null && typeof ve.markComponentPassiveEffectUnmountStopped == "function" && ve.markComponentPassiveEffectUnmountStopped();
    }
    function Jv(e) {
      ve !== null && typeof ve.markComponentLayoutEffectMountStarted == "function" && ve.markComponentLayoutEffectMountStarted(e);
    }
    function ws() {
      ve !== null && typeof ve.markComponentLayoutEffectMountStopped == "function" && ve.markComponentLayoutEffectMountStopped();
    }
    function vi(e) {
      ve !== null && typeof ve.markComponentLayoutEffectUnmountStarted == "function" && ve.markComponentLayoutEffectUnmountStarted(e);
    }
    function ho() {
      ve !== null && typeof ve.markComponentLayoutEffectUnmountStopped == "function" && ve.markComponentLayoutEffectUnmountStopped();
    }
    function bs(e, t, a) {
      ve !== null && typeof ve.markComponentErrored == "function" && ve.markComponentErrored(e, t, a);
    }
    function Su(e, t, a) {
      ve !== null && typeof ve.markComponentSuspended == "function" && ve.markComponentSuspended(e, t, a);
    }
    function Fd(e) {
      ve !== null && typeof ve.markLayoutEffectsStarted == "function" && ve.markLayoutEffectsStarted(e);
    }
    function mo() {
      ve !== null && typeof ve.markLayoutEffectsStopped == "function" && ve.markLayoutEffectsStopped();
    }
    function eh(e) {
      ve !== null && typeof ve.markPassiveEffectsStarted == "function" && ve.markPassiveEffectsStarted(e);
    }
    function jd() {
      ve !== null && typeof ve.markPassiveEffectsStopped == "function" && ve.markPassiveEffectsStopped();
    }
    function gn(e) {
      ve !== null && typeof ve.markRenderStarted == "function" && ve.markRenderStarted(e);
    }
    function zc() {
      ve !== null && typeof ve.markRenderYielded == "function" && ve.markRenderYielded();
    }
    function Uc() {
      ve !== null && typeof ve.markRenderStopped == "function" && ve.markRenderStopped();
    }
    function Pd(e) {
      ve !== null && typeof ve.markRenderScheduled == "function" && ve.markRenderScheduled(e);
    }
    function Fc(e, t) {
      ve !== null && typeof ve.markForceUpdateScheduled == "function" && ve.markForceUpdateScheduled(e, t);
    }
    function xs(e, t) {
      ve !== null && typeof ve.markStateUpdateScheduled == "function" && ve.markStateUpdateScheduled(e, t);
    }
    var Fe = (
      /*                         */
      0
    ), He = (
      /*                 */
      1
    ), rt = (
      /*                    */
      2
    ), gt = (
      /*               */
      8
    ), _a = (
      /*              */
      16
    ), yo = Math.clz32 ? Math.clz32 : xr, _s = Math.log, Py = Math.LN2;
    function xr(e) {
      var t = e >>> 0;
      return t === 0 ? 32 : 31 - (_s(t) / Py | 0) | 0;
    }
    var Ds = 31, X = (
      /*                        */
      0
    ), In = (
      /*                          */
      0
    ), Be = (
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
    ), Wa = (
      /*                     */
      16
    ), go = (
      /*                */
      32
    ), Eu = (
      /*                       */
      4194240
    ), So = (
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
    ), Cu = (
      /*                        */
      4096
    ), Bc = (
      /*                        */
      8192
    ), Eo = (
      /*                        */
      16384
    ), Co = (
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
    ), Ro = (
      /*                            */
      130023424
    ), Ru = (
      /*                             */
      4194304
    ), qc = (
      /*                             */
      8388608
    ), Kc = (
      /*                             */
      16777216
    ), Hd = (
      /*                             */
      33554432
    ), Xc = (
      /*                             */
      67108864
    ), th = Ru, Os = (
      /*          */
      134217728
    ), Vd = (
      /*                          */
      268435455
    ), To = (
      /*               */
      268435456
    ), jl = (
      /*                        */
      536870912
    ), _r = (
      /*                   */
      1073741824
    );
    function Hy(e) {
      {
        if (e & Be)
          return "Sync";
        if (e & fr)
          return "InputContinuousHydration";
        if (e & Da)
          return "InputContinuous";
        if (e & tl)
          return "DefaultHydration";
        if (e & Wa)
          return "Default";
        if (e & go)
          return "TransitionHydration";
        if (e & Eu)
          return "Transition";
        if (e & Ro)
          return "Retry";
        if (e & Os)
          return "SelectiveHydration";
        if (e & To)
          return "IdleHydration";
        if (e & jl)
          return "Idle";
        if (e & _r)
          return "Offscreen";
      }
    }
    var cn = -1, Zc = So, oa = Ru;
    function Tu(e) {
      switch (Un(e)) {
        case Be:
          return Be;
        case fr:
          return fr;
        case Da:
          return Da;
        case tl:
          return tl;
        case Wa:
          return Wa;
        case go:
          return go;
        case So:
        case jc:
        case Pc:
        case Hc:
        case Vc:
        case $c:
        case Cu:
        case Bc:
        case Eo:
        case Co:
        case Ic:
        case ks:
        case Yc:
        case Wc:
        case Qc:
        case Gc:
          return e & Eu;
        case Ru:
        case qc:
        case Kc:
        case Hd:
        case Xc:
          return e & Ro;
        case Os:
          return Os;
        case To:
          return To;
        case jl:
          return jl;
        case _r:
          return _r;
        default:
          return E("Should have found matching lanes. This is a bug in React."), e;
      }
    }
    function wu(e, t) {
      var a = e.pendingLanes;
      if (a === X)
        return X;
      var i = X, u = e.suspendedLanes, s = e.pingedLanes, f = a & Vd;
      if (f !== X) {
        var p = f & ~u;
        if (p !== X)
          i = Tu(p);
        else {
          var v = f & s;
          v !== X && (i = Tu(v));
        }
      } else {
        var g = a & ~u;
        g !== X ? i = Tu(g) : s !== X && (i = Tu(s));
      }
      if (i === X)
        return X;
      if (t !== X && t !== i && // If we already suspended with a delay, then interrupting is fine. Don't
      // bother waiting until the root is complete.
      (t & u) === X) {
        var C = Un(i), k = Un(t);
        if (
          // Tests whether the next lane is equal or lower priority than the wip
          // one. This works because the bits decrease in priority as you go left.
          C >= k || // Default priority updates should not interrupt transition updates. The
          // only difference between default updates and transition updates is that
          // default updates do not support refresh transitions.
          C === Wa && (k & Eu) !== X
        )
          return t;
      }
      (i & Da) !== X && (i |= a & Wa);
      var _ = e.entangledLanes;
      if (_ !== X)
        for (var U = e.entanglements, P = i & _; P > 0; ) {
          var I = Hl(P), Se = 1 << I;
          i |= U[I], P &= ~Se;
        }
      return i;
    }
    function nh(e, t) {
      for (var a = e.eventTimes, i = cn; t > 0; ) {
        var u = Hl(t), s = 1 << u, f = a[u];
        f > i && (i = f), t &= ~s;
      }
      return i;
    }
    function rh(e, t) {
      switch (e) {
        case Be:
        case fr:
        case Da:
          return t + 250;
        case tl:
        case Wa:
        case go:
        case So:
        case jc:
        case Pc:
        case Hc:
        case Vc:
        case $c:
        case Cu:
        case Bc:
        case Eo:
        case Co:
        case Ic:
        case ks:
        case Yc:
        case Wc:
        case Qc:
        case Gc:
          return t + 5e3;
        case Ru:
        case qc:
        case Kc:
        case Hd:
        case Xc:
          return cn;
        case Os:
        case To:
        case jl:
        case _r:
          return cn;
        default:
          return E("Should have found matching lanes. This is a bug in React."), cn;
      }
    }
    function ah(e, t) {
      for (var a = e.pendingLanes, i = e.suspendedLanes, u = e.pingedLanes, s = e.expirationTimes, f = a; f > 0; ) {
        var p = Hl(f), v = 1 << p, g = s[p];
        g === cn ? ((v & i) === X || (v & u) !== X) && (s[p] = rh(v, t)) : g <= t && (e.expiredLanes |= v), f &= ~v;
      }
    }
    function $d(e) {
      return Tu(e.pendingLanes);
    }
    function Pl(e) {
      var t = e.pendingLanes & ~_r;
      return t !== X ? t : t & _r ? _r : X;
    }
    function Bd(e) {
      return (e & Be) !== X;
    }
    function Ms(e) {
      return (e & Vd) !== X;
    }
    function ih(e) {
      return (e & Ro) === e;
    }
    function lh(e) {
      var t = Be | Da | Wa;
      return (e & t) === X;
    }
    function uh(e) {
      return (e & Eu) === e;
    }
    function Ls(e, t) {
      var a = fr | Da | tl | Wa;
      return (t & a) !== X;
    }
    function oh(e, t) {
      return (t & e.expiredLanes) !== X;
    }
    function Id(e) {
      return (e & Eu) !== X;
    }
    function sh() {
      var e = Zc;
      return Zc <<= 1, (Zc & Eu) === X && (Zc = So), e;
    }
    function sa() {
      var e = oa;
      return oa <<= 1, (oa & Ro) === X && (oa = Ru), e;
    }
    function Un(e) {
      return e & -e;
    }
    function wo(e) {
      return Un(e);
    }
    function Hl(e) {
      return 31 - yo(e);
    }
    function Jc(e) {
      return Hl(e);
    }
    function ca(e, t) {
      return (e & t) !== X;
    }
    function bu(e, t) {
      return (e & t) === t;
    }
    function st(e, t) {
      return e | t;
    }
    function Ns(e, t) {
      return e & ~t;
    }
    function ef(e, t) {
      return e & t;
    }
    function Vy(e) {
      return e;
    }
    function ch(e, t) {
      return e !== In && e < t ? e : t;
    }
    function As(e) {
      for (var t = [], a = 0; a < Ds; a++)
        t.push(e);
      return t;
    }
    function xu(e, t, a) {
      e.pendingLanes |= t, t !== jl && (e.suspendedLanes = X, e.pingedLanes = X);
      var i = e.eventTimes, u = Jc(t);
      i[u] = a;
    }
    function fh(e, t) {
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
      e.pendingLanes = t, e.suspendedLanes = X, e.pingedLanes = X, e.expiredLanes &= t, e.mutableReadLanes &= t, e.entangledLanes &= t;
      for (var i = e.entanglements, u = e.eventTimes, s = e.expirationTimes, f = a; f > 0; ) {
        var p = Hl(f), v = 1 << p;
        i[p] = X, u[p] = cn, s[p] = cn, f &= ~v;
      }
    }
    function Yd(e, t) {
      for (var a = e.entangledLanes |= t, i = e.entanglements, u = a; u; ) {
        var s = Hl(u), f = 1 << s;
        // Is this one of the newly entangled lanes?
        f & t | // Is this lane transitively entangled with the newly entangled lanes?
        i[s] & t && (i[s] |= t), u &= ~f;
      }
    }
    function dh(e, t) {
      var a = Un(t), i;
      switch (a) {
        case Da:
          i = fr;
          break;
        case Wa:
          i = tl;
          break;
        case So:
        case jc:
        case Pc:
        case Hc:
        case Vc:
        case $c:
        case Cu:
        case Bc:
        case Eo:
        case Co:
        case Ic:
        case ks:
        case Yc:
        case Wc:
        case Qc:
        case Gc:
        case Ru:
        case qc:
        case Kc:
        case Hd:
        case Xc:
          i = go;
          break;
        case jl:
          i = To;
          break;
        default:
          i = In;
          break;
      }
      return (i & (e.suspendedLanes | t)) !== In ? In : i;
    }
    function rf(e, t, a) {
      if (xa)
        for (var i = e.pendingUpdatersLaneMap; a > 0; ) {
          var u = Jc(a), s = 1 << u, f = i[u];
          f.add(t), a &= ~s;
        }
    }
    function Wd(e, t) {
      if (xa)
        for (var a = e.pendingUpdatersLaneMap, i = e.memoizedUpdaters; t > 0; ) {
          var u = Jc(t), s = 1 << u, f = a[u];
          f.size > 0 && (f.forEach(function(p) {
            var v = p.alternate;
            (v === null || !i.has(v)) && i.add(p);
          }), f.clear()), t &= ~s;
        }
    }
    function zs(e, t) {
      return null;
    }
    var Fn = Be, nl = Da, ki = Wa, bo = jl, xo = In;
    function Qa() {
      return xo;
    }
    function Mn(e) {
      xo = e;
    }
    function Dr(e, t) {
      var a = xo;
      try {
        return xo = e, t();
      } finally {
        xo = a;
      }
    }
    function $y(e, t) {
      return e !== 0 && e < t ? e : t;
    }
    function By(e, t) {
      return e > t ? e : t;
    }
    function _o(e, t) {
      return e !== 0 && e < t;
    }
    function dr(e) {
      var t = Un(e);
      return _o(Fn, t) ? _o(nl, t) ? Ms(t) ? ki : bo : nl : Fn;
    }
    function af(e) {
      var t = e.current.memoizedState;
      return t.isDehydrated;
    }
    var xe;
    function Do(e) {
      xe = e;
    }
    function Qd(e) {
      xe(e);
    }
    var lf;
    function Iy(e) {
      lf = e;
    }
    var ko;
    function uf(e) {
      ko = e;
    }
    var of;
    function ph(e) {
      of = e;
    }
    var Gd;
    function vh(e) {
      Gd = e;
    }
    var Us = !1, Oo = [], Sn = null, ar = null, Fr = null, Mo = /* @__PURE__ */ new Map(), Lo = /* @__PURE__ */ new Map(), ir = [], hh = [
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
    function Oi(e) {
      return hh.indexOf(e) > -1;
    }
    function Yy(e, t, a, i, u) {
      return {
        blockedOn: e,
        domEventName: t,
        eventSystemFlags: a,
        nativeEvent: u,
        targetContainers: [i]
      };
    }
    function qd(e, t) {
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
          Mo.delete(a);
          break;
        }
        case "gotpointercapture":
        case "lostpointercapture": {
          var i = t.pointerId;
          Lo.delete(i);
          break;
        }
      }
    }
    function No(e, t, a, i, u, s) {
      if (e === null || e.nativeEvent !== s) {
        var f = Yy(t, a, i, u, s);
        if (t !== null) {
          var p = $o(t);
          p !== null && lf(p);
        }
        return f;
      }
      e.eventSystemFlags |= i;
      var v = e.targetContainers;
      return u !== null && v.indexOf(u) === -1 && v.push(u), e;
    }
    function mh(e, t, a, i, u) {
      switch (t) {
        case "focusin": {
          var s = u;
          return Sn = No(Sn, e, t, a, i, s), !0;
        }
        case "dragenter": {
          var f = u;
          return ar = No(ar, e, t, a, i, f), !0;
        }
        case "mouseover": {
          var p = u;
          return Fr = No(Fr, e, t, a, i, p), !0;
        }
        case "pointerover": {
          var v = u, g = v.pointerId;
          return Mo.set(g, No(Mo.get(g) || null, e, t, a, i, v)), !0;
        }
        case "gotpointercapture": {
          var C = u, k = C.pointerId;
          return Lo.set(k, No(Lo.get(k) || null, e, t, a, i, C)), !0;
        }
      }
      return !1;
    }
    function Kd(e) {
      var t = Gs(e.target);
      if (t !== null) {
        var a = wa(t);
        if (a !== null) {
          var i = a.tag;
          if (i === $) {
            var u = Md(a);
            if (u !== null) {
              e.blockedOn = u, Gd(e.priority, function() {
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
    function Wy(e) {
      for (var t = of(), a = {
        blockedOn: null,
        target: e,
        priority: t
      }, i = 0; i < ir.length && _o(t, ir[i].priority); i++)
        ;
      ir.splice(i, 0, a), i === 0 && Kd(a);
    }
    function _u(e) {
      if (e.blockedOn !== null)
        return !1;
      for (var t = e.targetContainers; t.length > 0; ) {
        var a = t[0], i = kr(e.domEventName, e.eventSystemFlags, a, e.nativeEvent);
        if (i === null) {
          var u = e.nativeEvent, s = new u.constructor(u.type, u);
          ms(s), u.target.dispatchEvent(s), zy();
        } else {
          var f = $o(i);
          return f !== null && lf(f), e.blockedOn = i, !1;
        }
        t.shift();
      }
      return !0;
    }
    function sf(e, t, a) {
      _u(e) && a.delete(t);
    }
    function Ga() {
      Us = !1, Sn !== null && _u(Sn) && (Sn = null), ar !== null && _u(ar) && (ar = null), Fr !== null && _u(Fr) && (Fr = null), Mo.forEach(sf), Lo.forEach(sf);
    }
    function Ct(e, t) {
      e.blockedOn === t && (e.blockedOn = null, Us || (Us = !0, S.unstable_scheduleCallback(S.unstable_NormalPriority, Ga)));
    }
    function Ln(e) {
      if (Oo.length > 0) {
        Ct(Oo[0], e);
        for (var t = 1; t < Oo.length; t++) {
          var a = Oo[t];
          a.blockedOn === e && (a.blockedOn = null);
        }
      }
      Sn !== null && Ct(Sn, e), ar !== null && Ct(ar, e), Fr !== null && Ct(Fr, e);
      var i = function(p) {
        return Ct(p, e);
      };
      Mo.forEach(i), Lo.forEach(i);
      for (var u = 0; u < ir.length; u++) {
        var s = ir[u];
        s.blockedOn === e && (s.blockedOn = null);
      }
      for (; ir.length > 0; ) {
        var f = ir[0];
        if (f.blockedOn !== null)
          break;
        Kd(f), f.blockedOn === null && ir.shift();
      }
    }
    var vn = R.ReactCurrentBatchConfig, Qn = !0;
    function fa(e) {
      Qn = !!e;
    }
    function Ao() {
      return Qn;
    }
    function Gn(e, t, a) {
      var i = cf(t), u;
      switch (i) {
        case Fn:
          u = Fs;
          break;
        case nl:
          u = Du;
          break;
        case ki:
        default:
          u = zo;
          break;
      }
      return u.bind(null, t, a, e);
    }
    function Fs(e, t, a, i) {
      var u = Qa(), s = vn.transition;
      vn.transition = null;
      try {
        Mn(Fn), zo(e, t, a, i);
      } finally {
        Mn(u), vn.transition = s;
      }
    }
    function Du(e, t, a, i) {
      var u = Qa(), s = vn.transition;
      vn.transition = null;
      try {
        Mn(nl), zo(e, t, a, i);
      } finally {
        Mn(u), vn.transition = s;
      }
    }
    function zo(e, t, a, i) {
      Qn && Xd(e, t, a, i);
    }
    function Xd(e, t, a, i) {
      var u = kr(e, t, a, i);
      if (u === null) {
        sg(e, t, i, Vl, a), qd(e, i);
        return;
      }
      if (mh(u, e, t, a, i)) {
        i.stopPropagation();
        return;
      }
      if (qd(e, i), t & fu && Oi(e)) {
        for (; u !== null; ) {
          var s = $o(u);
          s !== null && Qd(s);
          var f = kr(e, t, a, i);
          if (f === null && sg(e, t, i, Vl, a), f === u)
            break;
          u = f;
        }
        u !== null && i.stopPropagation();
        return;
      }
      sg(e, t, i, null, a);
    }
    var Vl = null;
    function kr(e, t, a, i) {
      Vl = null;
      var u = Cc(i), s = Gs(u);
      if (s !== null) {
        var f = wa(s);
        if (f === null)
          s = null;
        else {
          var p = f.tag;
          if (p === $) {
            var v = Md(f);
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
        // Used by SimpleEventPlugin:
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
        // Used by polyfills:
        // eslint-disable-next-line no-fallthrough
        case "change":
        case "selectionchange":
        case "textInput":
        case "compositionstart":
        case "compositionend":
        case "compositionupdate":
        // Only enableCreateEventHandleAPI:
        // eslint-disable-next-line no-fallthrough
        case "beforeblur":
        case "afterblur":
        // Not used by React but could be by user code:
        // eslint-disable-next-line no-fallthrough
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
        // Not used by React but could be by user code:
        // eslint-disable-next-line no-fallthrough
        case "mouseenter":
        case "mouseleave":
        case "pointerenter":
        case "pointerleave":
          return nl;
        case "message": {
          var t = Ad();
          switch (t) {
            case Oc:
              return Fn;
            case yu:
              return nl;
            case Di:
            case qv:
              return ki;
            case Mc:
              return bo;
            default:
              return ki;
          }
        }
        default:
          return ki;
      }
    }
    function Uo(e, t, a) {
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
    function Zd(e, t, a, i) {
      return e.addEventListener(t, a, {
        passive: i
      }), a;
    }
    var qa = null, Fo = null, Ka = null;
    function df(e) {
      return qa = e, Fo = Ps(), !0;
    }
    function js() {
      qa = null, Fo = null, Ka = null;
    }
    function pf() {
      if (Ka)
        return Ka;
      var e, t = Fo, a = t.length, i, u = Ps(), s = u.length;
      for (e = 0; e < a && t[e] === u[e]; e++)
        ;
      var f = a - e;
      for (i = 1; i <= f && t[a - i] === u[s - i]; i++)
        ;
      var p = i > 1 ? 1 - i : void 0;
      return Ka = u.slice(e, p), Ka;
    }
    function Ps() {
      return "value" in qa ? qa.value : qa.textContent;
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
    }, vf = xn(qn), Ou = mt({}, qn, {
      view: 0,
      detail: 0
    }), Jd = xn(Ou), ep, Mi, jo;
    function tp(e) {
      e !== jo && (jo && e.type === "mousemove" ? (ep = e.screenX - jo.screenX, Mi = e.screenY - jo.screenY) : (ep = 0, Mi = 0), jo = e);
    }
    var Li = mt({}, Ou, {
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
      getModifierState: np,
      button: 0,
      buttons: 0,
      relatedTarget: function(e) {
        return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
      },
      movementX: function(e) {
        return "movementX" in e ? e.movementX : (tp(e), ep);
      },
      movementY: function(e) {
        return "movementY" in e ? e.movementY : Mi;
      }
    }), hf = xn(Li), Mu = mt({}, Li, {
      dataTransfer: 0
    }), yh = xn(Mu), gh = mt({}, Ou, {
      relatedTarget: 0
    }), Hs = xn(gh), mf = mt({}, qn, {
      animationName: 0,
      elapsedTime: 0,
      pseudoElement: 0
    }), Qy = xn(mf), Gy = mt({}, qn, {
      clipboardData: function(e) {
        return "clipboardData" in e ? e.clipboardData : window.clipboardData;
      }
    }), Sh = xn(Gy), Eh = mt({}, qn, {
      data: 0
    }), $l = xn(Eh), qy = $l, Po = {
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
    }, Ch = {
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
        var t = Po[e.key] || e.key;
        if (t !== "Unidentified")
          return t;
      }
      if (e.type === "keypress") {
        var a = ku(e);
        return a === 13 ? "Enter" : String.fromCharCode(a);
      }
      return e.type === "keydown" || e.type === "keyup" ? Ch[e.keyCode] || "Unidentified" : "";
    }
    var Ky = {
      Alt: "altKey",
      Control: "ctrlKey",
      Meta: "metaKey",
      Shift: "shiftKey"
    };
    function Rh(e) {
      var t = this, a = t.nativeEvent;
      if (a.getModifierState)
        return a.getModifierState(e);
      var i = Ky[e];
      return i ? !!a[i] : !1;
    }
    function np(e) {
      return Rh;
    }
    var Xy = mt({}, Ou, {
      key: Nn,
      code: 0,
      location: 0,
      ctrlKey: 0,
      shiftKey: 0,
      altKey: 0,
      metaKey: 0,
      repeat: 0,
      locale: 0,
      getModifierState: np,
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
    }), Th = xn(Xy), wh = mt({}, Li, {
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
    }), bh = xn(wh), Xa = mt({}, Ou, {
      touches: 0,
      targetTouches: 0,
      changedTouches: 0,
      altKey: 0,
      metaKey: 0,
      ctrlKey: 0,
      shiftKey: 0,
      getModifierState: np
    }), rp = xn(Xa), Zy = mt({}, qn, {
      propertyName: 0,
      elapsedTime: 0,
      pseudoElement: 0
    }), Bl = xn(Zy), yf = mt({}, Li, {
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
    }), Lu = xn(yf), gf = [9, 13, 27, 32], Sf = 229, Vs = rn && "CompositionEvent" in window, $s = null;
    rn && "documentMode" in document && ($s = document.documentMode);
    var ap = rn && "TextEvent" in window && !$s, xh = rn && (!Vs || $s && $s > 8 && $s <= 11), ip = 32, lp = String.fromCharCode(ip);
    function Ef() {
      Zn("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]), Zn("onCompositionEnd", ["compositionend", "focusout", "keydown", "keypress", "keyup", "mousedown"]), Zn("onCompositionStart", ["compositionstart", "focusout", "keydown", "keypress", "keyup", "mousedown"]), Zn("onCompositionUpdate", ["compositionupdate", "focusout", "keydown", "keypress", "keyup", "mousedown"]);
    }
    var Bs = !1;
    function _h(e) {
      return (e.ctrlKey || e.altKey || e.metaKey) && // ctrlKey && altKey is equivalent to AltGr, and is not a command.
      !(e.ctrlKey && e.altKey);
    }
    function up(e) {
      switch (e) {
        case "compositionstart":
          return "onCompositionStart";
        case "compositionend":
          return "onCompositionEnd";
        case "compositionupdate":
          return "onCompositionUpdate";
      }
    }
    function Jy(e, t) {
      return e === "keydown" && t.keyCode === Sf;
    }
    function op(e, t) {
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
    function Is(e) {
      return e.locale === "ko";
    }
    var Il = !1;
    function Rf(e, t, a, i, u) {
      var s, f;
      if (Vs ? s = up(t) : Il ? op(t, i) && (s = "onCompositionEnd") : Jy(t, i) && (s = "onCompositionStart"), !s)
        return null;
      xh && !Is(i) && (!Il && s === "onCompositionStart" ? Il = df(u) : s === "onCompositionEnd" && Il && (f = pf()));
      var p = Nh(a, s);
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
    function Dh(e, t) {
      switch (e) {
        case "compositionend":
          return Cf(t);
        case "keypress":
          var a = t.which;
          return a !== ip ? null : (Bs = !0, lp);
        case "textInput":
          var i = t.data;
          return i === lp && Bs ? null : i;
        default:
          return null;
      }
    }
    function eg(e, t) {
      if (Il) {
        if (e === "compositionend" || !Vs && op(e, t)) {
          var a = pf();
          return js(), Il = !1, a;
        }
        return null;
      }
      switch (e) {
        case "paste":
          return null;
        case "keypress":
          if (!_h(t)) {
            if (t.char && t.char.length > 1)
              return t.char;
            if (t.which)
              return String.fromCharCode(t.which);
          }
          return null;
        case "compositionend":
          return xh && !Is(t) ? null : t.data;
        default:
          return null;
      }
    }
    function Tf(e, t, a, i, u) {
      var s;
      if (ap ? s = Dh(t, i) : s = eg(t, i), !s)
        return null;
      var f = Nh(a, "onBeforeInput");
      if (f.length > 0) {
        var p = new qy("onBeforeInput", "beforeinput", null, i, u);
        e.push({
          event: p,
          listeners: f
        }), p.data = s;
      }
    }
    function tg(e, t, a, i, u, s, f) {
      Rf(e, t, a, i, u), Tf(e, t, a, i, u);
    }
    var Ys = {
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
      return t === "input" ? !!Ys[e.type] : t === "textarea";
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
      var u = Nh(t, "onChange");
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
      r(t, o, e, Cc(e)), Td(y, t);
    }
    function y(e) {
      mE(e, 0);
    }
    function T(e) {
      var t = Of(e);
      if (eo(t))
        return e;
    }
    function x(e, t) {
      if (e === "change")
        return t;
    }
    var j = !1;
    rn && (j = wf("input") && (!document.documentMode || document.documentMode > 9));
    function ee(e, t) {
      l = e, o = t, l.attachEvent("onpropertychange", Z);
    }
    function te() {
      l && (l.detachEvent("onpropertychange", Z), l = null, o = null);
    }
    function Z(e) {
      e.propertyName === "value" && T(o) && d(e);
    }
    function Ce(e, t, a) {
      e === "focusin" ? (te(), ee(t, a)) : e === "focusout" && te();
    }
    function ke(e, t) {
      if (e === "selectionchange" || e === "keyup" || e === "keydown")
        return T(o);
    }
    function Ae(e) {
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
    function D(e) {
      var t = e._wrapperState;
      !t || !t.controlled || e.type !== "number" || Ge(e, "number", e.value);
    }
    function z(e, t, a, i, u, s, f) {
      var p = a ? Of(a) : window, v, g;
      if (c(p) ? v = x : kh(p) ? j ? v = M : (v = ke, g = Ce) : Ae(p) && (v = jn), v) {
        var C = v(t, a);
        if (C) {
          r(e, C, i, u);
          return;
        }
      }
      g && g(t, p, a), t === "focusout" && D(p);
    }
    function ue() {
      be("onMouseEnter", ["mouseout", "mouseover"]), be("onMouseLeave", ["mouseout", "mouseover"]), be("onPointerEnter", ["pointerout", "pointerover"]), be("onPointerLeave", ["pointerout", "pointerover"]);
    }
    function je(e, t, a, i, u, s, f) {
      var p = t === "mouseover" || t === "pointerover", v = t === "mouseout" || t === "pointerout";
      if (p && !$v(i)) {
        var g = i.relatedTarget || i.fromElement;
        if (g && (Gs(g) || Rp(g)))
          return;
      }
      if (!(!v && !p)) {
        var C;
        if (u.window === u)
          C = u;
        else {
          var k = u.ownerDocument;
          k ? C = k.defaultView || k.parentWindow : C = window;
        }
        var _, U;
        if (v) {
          var P = i.relatedTarget || i.toElement;
          if (_ = a, U = P ? Gs(P) : null, U !== null) {
            var I = wa(U);
            (U !== I || U.tag !== ne && U.tag !== fe) && (U = null);
          }
        } else
          _ = null, U = a;
        if (_ !== U) {
          var Se = hf, Qe = "onMouseLeave", Ve = "onMouseEnter", kt = "mouse";
          (t === "pointerout" || t === "pointerover") && (Se = bh, Qe = "onPointerLeave", Ve = "onPointerEnter", kt = "pointer");
          var Rt = _ == null ? C : Of(_), N = U == null ? C : Of(U), Y = new Se(Qe, kt + "leave", _, i, u);
          Y.target = Rt, Y.relatedTarget = N;
          var A = null, re = Gs(u);
          if (re === a) {
            var Te = new Se(Ve, kt + "enter", U, i, u);
            Te.target = N, Te.relatedTarget = Rt, A = Te;
          }
          WT(e, Y, A, _, U);
        }
      }
    }
    function Ze(e, t) {
      return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t;
    }
    var Oe = typeof Object.is == "function" ? Object.is : Ze;
    function et(e, t) {
      if (Oe(e, t))
        return !0;
      if (typeof e != "object" || e === null || typeof t != "object" || t === null)
        return !1;
      var a = Object.keys(e), i = Object.keys(t);
      if (a.length !== i.length)
        return !1;
      for (var u = 0; u < a.length; u++) {
        var s = a[u];
        if (!Cn.call(t, s) || !Oe(e[s], t[s]))
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
    function ng(e) {
      var t = e.ownerDocument, a = t && t.defaultView || window, i = a.getSelection && a.getSelection();
      if (!i || i.rangeCount === 0)
        return null;
      var u = i.anchorNode, s = i.anchorOffset, f = i.focusNode, p = i.focusOffset;
      try {
        u.nodeType, f.nodeType;
      } catch {
        return null;
      }
      return xT(e, u, s, f, p);
    }
    function xT(e, t, a, i, u) {
      var s = 0, f = -1, p = -1, v = 0, g = 0, C = e, k = null;
      e: for (; ; ) {
        for (var _ = null; C === t && (a === 0 || C.nodeType === Qi) && (f = s + a), C === i && (u === 0 || C.nodeType === Qi) && (p = s + u), C.nodeType === Qi && (s += C.nodeValue.length), (_ = C.firstChild) !== null; )
          k = C, C = _;
        for (; ; ) {
          if (C === e)
            break e;
          if (k === t && ++v === a && (f = s), k === i && ++g === u && (p = s), (_ = C.nextSibling) !== null)
            break;
          C = k, k = C.parentNode;
        }
        C = _;
      }
      return f === -1 || p === -1 ? null : {
        start: f,
        end: p
      };
    }
    function _T(e, t) {
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
          var k = a.createRange();
          k.setStart(g.node, g.offset), u.removeAllRanges(), f > p ? (u.addRange(k), u.extend(C.node, C.offset)) : (k.setEnd(C.node, C.offset), u.addRange(k));
        }
      }
    }
    function aE(e) {
      return e && e.nodeType === Qi;
    }
    function iE(e, t) {
      return !e || !t ? !1 : e === t ? !0 : aE(e) ? !1 : aE(t) ? iE(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1;
    }
    function DT(e) {
      return e && e.ownerDocument && iE(e.ownerDocument.documentElement, e);
    }
    function kT(e) {
      try {
        return typeof e.contentWindow.location.href == "string";
      } catch {
        return !1;
      }
    }
    function lE() {
      for (var e = window, t = Dl(); t instanceof e.HTMLIFrameElement; ) {
        if (kT(t))
          e = t.contentWindow;
        else
          return t;
        t = Dl(e.document);
      }
      return t;
    }
    function rg(e) {
      var t = e && e.nodeName && e.nodeName.toLowerCase();
      return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true");
    }
    function OT() {
      var e = lE();
      return {
        focusedElem: e,
        selectionRange: rg(e) ? LT(e) : null
      };
    }
    function MT(e) {
      var t = lE(), a = e.focusedElem, i = e.selectionRange;
      if (t !== a && DT(a)) {
        i !== null && rg(a) && NT(a, i);
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
    function LT(e) {
      var t;
      return "selectionStart" in e ? t = {
        start: e.selectionStart,
        end: e.selectionEnd
      } : t = ng(e), t || {
        start: 0,
        end: 0
      };
    }
    function NT(e, t) {
      var a = t.start, i = t.end;
      i === void 0 && (i = a), "selectionStart" in e ? (e.selectionStart = a, e.selectionEnd = Math.min(i, e.value.length)) : _T(e, t);
    }
    var AT = rn && "documentMode" in document && document.documentMode <= 11;
    function zT() {
      Zn("onSelect", ["focusout", "contextmenu", "dragend", "focusin", "keydown", "keyup", "mousedown", "mouseup", "selectionchange"]);
    }
    var bf = null, ag = null, sp = null, ig = !1;
    function UT(e) {
      if ("selectionStart" in e && rg(e))
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
    function FT(e) {
      return e.window === e ? e.document : e.nodeType === fi ? e : e.ownerDocument;
    }
    function uE(e, t, a) {
      var i = FT(a);
      if (!(ig || bf == null || bf !== Dl(i))) {
        var u = UT(bf);
        if (!sp || !et(sp, u)) {
          sp = u;
          var s = Nh(ag, "onSelect");
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
    function jT(e, t, a, i, u, s, f) {
      var p = a ? Of(a) : window;
      switch (t) {
        // Track the input node that has focus.
        case "focusin":
          (kh(p) || p.contentEditable === "true") && (bf = p, ag = a, sp = null);
          break;
        case "focusout":
          bf = null, ag = null, sp = null;
          break;
        // Don't fire the event while the user is dragging. This matches the
        // semantics of the native select event.
        case "mousedown":
          ig = !0;
          break;
        case "contextmenu":
        case "mouseup":
        case "dragend":
          ig = !1, uE(e, i, u);
          break;
        // Chrome and IE fire non-standard event when selection is changed (and
        // sometimes when it hasn't). IE's event fires out of order with respect
        // to key and input events on deletion, so we discard it.
        //
        // Firefox doesn't support selectionchange, so check selection status
        // after each key entry. The selection changes after keydown and before
        // keyup, but we check on keydown as well in the case of holding down a
        // key, when multiple keydown events are fired but only one keyup is.
        // This is also our approach for IE handling, for the reason above.
        case "selectionchange":
          if (AT)
            break;
        // falls through
        case "keydown":
        case "keyup":
          uE(e, i, u);
      }
    }
    function Oh(e, t) {
      var a = {};
      return a[e.toLowerCase()] = t.toLowerCase(), a["Webkit" + e] = "webkit" + t, a["Moz" + e] = "moz" + t, a;
    }
    var xf = {
      animationend: Oh("Animation", "AnimationEnd"),
      animationiteration: Oh("Animation", "AnimationIteration"),
      animationstart: Oh("Animation", "AnimationStart"),
      transitionend: Oh("Transition", "TransitionEnd")
    }, lg = {}, oE = {};
    rn && (oE = document.createElement("div").style, "AnimationEvent" in window || (delete xf.animationend.animation, delete xf.animationiteration.animation, delete xf.animationstart.animation), "TransitionEvent" in window || delete xf.transitionend.transition);
    function Mh(e) {
      if (lg[e])
        return lg[e];
      if (!xf[e])
        return e;
      var t = xf[e];
      for (var a in t)
        if (t.hasOwnProperty(a) && a in oE)
          return lg[e] = t[a];
      return e;
    }
    var sE = Mh("animationend"), cE = Mh("animationiteration"), fE = Mh("animationstart"), dE = Mh("transitionend"), pE = /* @__PURE__ */ new Map(), vE = ["abort", "auxClick", "cancel", "canPlay", "canPlayThrough", "click", "close", "contextMenu", "copy", "cut", "drag", "dragEnd", "dragEnter", "dragExit", "dragLeave", "dragOver", "dragStart", "drop", "durationChange", "emptied", "encrypted", "ended", "error", "gotPointerCapture", "input", "invalid", "keyDown", "keyPress", "keyUp", "load", "loadedData", "loadedMetadata", "loadStart", "lostPointerCapture", "mouseDown", "mouseMove", "mouseOut", "mouseOver", "mouseUp", "paste", "pause", "play", "playing", "pointerCancel", "pointerDown", "pointerMove", "pointerOut", "pointerOver", "pointerUp", "progress", "rateChange", "reset", "resize", "seeked", "seeking", "stalled", "submit", "suspend", "timeUpdate", "touchCancel", "touchEnd", "touchStart", "volumeChange", "scroll", "toggle", "touchMove", "waiting", "wheel"];
    function Ho(e, t) {
      pE.set(e, t), Zn(t, [e]);
    }
    function PT() {
      for (var e = 0; e < vE.length; e++) {
        var t = vE[e], a = t.toLowerCase(), i = t[0].toUpperCase() + t.slice(1);
        Ho(a, "on" + i);
      }
      Ho(sE, "onAnimationEnd"), Ho(cE, "onAnimationIteration"), Ho(fE, "onAnimationStart"), Ho("dblclick", "onDoubleClick"), Ho("focusin", "onFocus"), Ho("focusout", "onBlur"), Ho(dE, "onTransitionEnd");
    }
    function HT(e, t, a, i, u, s, f) {
      var p = pE.get(t);
      if (p !== void 0) {
        var v = vf, g = t;
        switch (t) {
          case "keypress":
            if (ku(i) === 0)
              return;
          /* falls through */
          case "keydown":
          case "keyup":
            v = Th;
            break;
          case "focusin":
            g = "focus", v = Hs;
            break;
          case "focusout":
            g = "blur", v = Hs;
            break;
          case "beforeblur":
          case "afterblur":
            v = Hs;
            break;
          case "click":
            if (i.button === 2)
              return;
          /* falls through */
          case "auxclick":
          case "dblclick":
          case "mousedown":
          case "mousemove":
          case "mouseup":
          // TODO: Disabled elements should not respond to mouse events
          /* falls through */
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
            v = yh;
            break;
          case "touchcancel":
          case "touchend":
          case "touchmove":
          case "touchstart":
            v = rp;
            break;
          case sE:
          case cE:
          case fE:
            v = Qy;
            break;
          case dE:
            v = Bl;
            break;
          case "scroll":
            v = Jd;
            break;
          case "wheel":
            v = Lu;
            break;
          case "copy":
          case "cut":
          case "paste":
            v = Sh;
            break;
          case "gotpointercapture":
          case "lostpointercapture":
          case "pointercancel":
          case "pointerdown":
          case "pointermove":
          case "pointerout":
          case "pointerover":
          case "pointerup":
            v = bh;
            break;
        }
        var C = (s & fu) !== 0;
        {
          var k = !C && // TODO: ideally, we'd eventually add all events from
          // nonDelegatedEvents list in DOMPluginEventSystem.
          // Then we can remove this special list.
          // This is a breaking change that can wait until React 18.
          t === "scroll", _ = IT(a, p, i.type, C, k);
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
    PT(), ue(), n(), zT(), Ef();
    function VT(e, t, a, i, u, s, f) {
      HT(e, t, a, i, u, s);
      var p = (s & Ay) === 0;
      p && (je(e, t, a, i, u), z(e, t, a, i, u), jT(e, t, a, i, u), tg(e, t, a, i, u));
    }
    var cp = ["abort", "canplay", "canplaythrough", "durationchange", "emptied", "encrypted", "ended", "error", "loadeddata", "loadedmetadata", "loadstart", "pause", "play", "playing", "progress", "ratechange", "resize", "seeked", "seeking", "stalled", "suspend", "timeupdate", "volumechange", "waiting"], ug = new Set(["cancel", "close", "invalid", "load", "scroll", "toggle"].concat(cp));
    function hE(e, t, a) {
      var i = e.type || "unknown-event";
      e.currentTarget = a, Xi(i, t, void 0, e), e.currentTarget = null;
    }
    function $T(e, t, a) {
      var i;
      if (a)
        for (var u = t.length - 1; u >= 0; u--) {
          var s = t[u], f = s.instance, p = s.currentTarget, v = s.listener;
          if (f !== i && e.isPropagationStopped())
            return;
          hE(e, v, p), i = f;
        }
      else
        for (var g = 0; g < t.length; g++) {
          var C = t[g], k = C.instance, _ = C.currentTarget, U = C.listener;
          if (k !== i && e.isPropagationStopped())
            return;
          hE(e, U, _), i = k;
        }
    }
    function mE(e, t) {
      for (var a = (t & fu) !== 0, i = 0; i < e.length; i++) {
        var u = e[i], s = u.event, f = u.listeners;
        $T(s, f, a);
      }
      _d();
    }
    function BT(e, t, a, i, u) {
      var s = Cc(a), f = [];
      VT(f, e, i, a, s, t), mE(f, t);
    }
    function _n(e, t) {
      ug.has(e) || E('Did not expect a listenToNonDelegatedEvent() call for "%s". This is a bug in React. Please file an issue.', e);
      var a = !1, i = Sb(t), u = QT(e);
      i.has(u) || (yE(t, e, vs, a), i.add(u));
    }
    function og(e, t, a) {
      ug.has(e) && !t && E('Did not expect a listenToNativeEvent() call for "%s" in the bubble phase. This is a bug in React. Please file an issue.', e);
      var i = 0;
      t && (i |= fu), yE(a, e, i, t);
    }
    var Lh = "_reactListening" + Math.random().toString(36).slice(2);
    function fp(e) {
      if (!e[Lh]) {
        e[Lh] = !0, dt.forEach(function(a) {
          a !== "selectionchange" && (ug.has(a) || og(a, !1, e), og(a, !0, e));
        });
        var t = e.nodeType === fi ? e : e.ownerDocument;
        t !== null && (t[Lh] || (t[Lh] = !0, og("selectionchange", !1, t)));
      }
    }
    function yE(e, t, a, i, u) {
      var s = Gn(e, t, a), f = void 0;
      Ss && (t === "touchstart" || t === "touchmove" || t === "wheel") && (f = !0), e = e, i ? f !== void 0 ? ff(e, t, s, f) : rl(e, t, s) : f !== void 0 ? Zd(e, t, s, f) : Uo(e, t, s);
    }
    function gE(e, t) {
      return e === t || e.nodeType === $n && e.parentNode === t;
    }
    function sg(e, t, a, i, u) {
      var s = i;
      if (!(t & qi) && !(t & vs)) {
        var f = u;
        if (i !== null) {
          var p = i;
          e: for (; ; ) {
            if (p === null)
              return;
            var v = p.tag;
            if (v === K || v === oe) {
              var g = p.stateNode.containerInfo;
              if (gE(g, f))
                break;
              if (v === oe)
                for (var C = p.return; C !== null; ) {
                  var k = C.tag;
                  if (k === K || k === oe) {
                    var _ = C.stateNode.containerInfo;
                    if (gE(_, f))
                      return;
                  }
                  C = C.return;
                }
              for (; g !== null; ) {
                var U = Gs(g);
                if (U === null)
                  return;
                var P = U.tag;
                if (P === ne || P === fe) {
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
      Td(function() {
        return BT(e, t, a, s);
      });
    }
    function dp(e, t, a) {
      return {
        instance: e,
        listener: t,
        currentTarget: a
      };
    }
    function IT(e, t, a, i, u, s) {
      for (var f = t !== null ? t + "Capture" : null, p = i ? f : t, v = [], g = e, C = null; g !== null; ) {
        var k = g, _ = k.stateNode, U = k.tag;
        if (U === ne && _ !== null && (C = _, p !== null)) {
          var P = pu(g, p);
          P != null && v.push(dp(g, P, C));
        }
        if (u)
          break;
        g = g.return;
      }
      return v;
    }
    function Nh(e, t) {
      for (var a = t + "Capture", i = [], u = e; u !== null; ) {
        var s = u, f = s.stateNode, p = s.tag;
        if (p === ne && f !== null) {
          var v = f, g = pu(u, a);
          g != null && i.unshift(dp(u, g, v));
          var C = pu(u, t);
          C != null && i.push(dp(u, C, v));
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
      while (e && e.tag !== ne);
      return e || null;
    }
    function YT(e, t) {
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
    function SE(e, t, a, i, u) {
      for (var s = t._reactName, f = [], p = a; p !== null && p !== i; ) {
        var v = p, g = v.alternate, C = v.stateNode, k = v.tag;
        if (g !== null && g === i)
          break;
        if (k === ne && C !== null) {
          var _ = C;
          if (u) {
            var U = pu(p, s);
            U != null && f.unshift(dp(p, U, _));
          } else if (!u) {
            var P = pu(p, s);
            P != null && f.push(dp(p, P, _));
          }
        }
        p = p.return;
      }
      f.length !== 0 && e.push({
        event: t,
        listeners: f
      });
    }
    function WT(e, t, a, i, u) {
      var s = i && u ? YT(i, u) : null;
      i !== null && SE(e, t, i, s, !1), u !== null && a !== null && SE(e, a, u, s, !0);
    }
    function QT(e, t) {
      return e + "__bubble";
    }
    var Za = !1, pp = "dangerouslySetInnerHTML", Ah = "suppressContentEditableWarning", Vo = "suppressHydrationWarning", EE = "autoFocus", Ws = "children", Qs = "style", zh = "__html", cg, Uh, vp, CE, Fh, RE, TE;
    cg = {
      // There are working polyfills for <dialog>. Let people use it.
      dialog: !0,
      // Electron ships a custom <webview> tag to display external web content in
      // an isolated frame and process.
      // This tag is not present in non Electron environments such as JSDom which
      // is often used for testing purposes.
      // @see https://electronjs.org/docs/api/webview-tag
      webview: !0
    }, Uh = function(e, t) {
      Ec(e, t), gd(e, t), Vv(e, t, {
        registrationNameDependencies: pt,
        possibleRegistrationNames: Zt
      });
    }, RE = rn && !document.documentMode, vp = function(e, t, a) {
      if (!Za) {
        var i = jh(a), u = jh(t);
        u !== i && (Za = !0, E("Prop `%s` did not match. Server: %s Client: %s", e, JSON.stringify(u), JSON.stringify(i)));
      }
    }, CE = function(e) {
      if (!Za) {
        Za = !0;
        var t = [];
        e.forEach(function(a) {
          t.push(a);
        }), E("Extra attributes from the server: %s", t);
      }
    }, Fh = function(e, t) {
      t === !1 ? E("Expected `%s` listener to be a function, instead got `false`.\n\nIf you used to conditionally omit it with %s={condition && value}, pass %s={condition ? value : undefined} instead.", e, e, e) : E("Expected `%s` listener to be a function, instead got a value of `%s` type.", e, typeof t);
    }, TE = function(e, t) {
      var a = e.namespaceURI === Wi ? e.ownerDocument.createElement(e.tagName) : e.ownerDocument.createElementNS(e.namespaceURI, e.tagName);
      return a.innerHTML = t, a.innerHTML;
    };
    var GT = /\r\n?/g, qT = /\u0000|\uFFFD/g;
    function jh(e) {
      Kr(e);
      var t = typeof e == "string" ? e : "" + e;
      return t.replace(GT, `
`).replace(qT, "");
    }
    function Ph(e, t, a, i) {
      var u = jh(t), s = jh(e);
      if (s !== u && (i && (Za || (Za = !0, E('Text content did not match. Server: "%s" Client: "%s"', s, u))), a && De))
        throw new Error("Text content does not match server-rendered HTML.");
    }
    function wE(e) {
      return e.nodeType === fi ? e : e.ownerDocument;
    }
    function KT() {
    }
    function Hh(e) {
      e.onclick = KT;
    }
    function XT(e, t, a, i, u) {
      for (var s in i)
        if (i.hasOwnProperty(s)) {
          var f = i[s];
          if (s === Qs)
            f && Object.freeze(f), Mv(t, f);
          else if (s === pp) {
            var p = f ? f[zh] : void 0;
            p != null && Ev(t, p);
          } else if (s === Ws)
            if (typeof f == "string") {
              var v = e !== "textarea" || f !== "";
              v && mc(t, f);
            } else typeof f == "number" && mc(t, "" + f);
          else s === Ah || s === Vo || s === EE || (pt.hasOwnProperty(s) ? f != null && (typeof f != "function" && Fh(s, f), s === "onScroll" && _n("scroll", t)) : f != null && Ca(t, s, f, u));
        }
    }
    function ZT(e, t, a, i) {
      for (var u = 0; u < t.length; u += 2) {
        var s = t[u], f = t[u + 1];
        s === Qs ? Mv(e, f) : s === pp ? Ev(e, f) : s === Ws ? mc(e, f) : Ca(e, s, f, i);
      }
    }
    function JT(e, t, a, i) {
      var u, s = wE(a), f, p = i;
      if (p === Wi && (p = vc(e)), p === Wi) {
        if (u = Gi(e, t), !u && e !== e.toLowerCase() && E("<%s /> is using incorrect casing. Use PascalCase for React components, or lowercase for HTML elements.", e), e === "script") {
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
      return p === Wi && !u && Object.prototype.toString.call(f) === "[object HTMLUnknownElement]" && !Cn.call(cg, e) && (cg[e] = !0, E("The tag <%s> is unrecognized in this browser. If you meant to render a React component, start its name with an uppercase letter.", e)), f;
    }
    function ew(e, t) {
      return wE(t).createTextNode(e);
    }
    function tw(e, t, a, i) {
      var u = Gi(t, a);
      Uh(t, a);
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
          for (var f = 0; f < cp.length; f++)
            _n(cp[f], e);
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
          cs(e, a), s = ss(e, a), _n("invalid", e);
          break;
        case "textarea":
          yv(e, a), s = sd(e, a), _n("invalid", e);
          break;
        default:
          s = a;
      }
      switch (gc(t, s), XT(t, e, i, s, u), t) {
        case "input":
          Fa(e), le(e, a, !1);
          break;
        case "textarea":
          Fa(e), Sv(e);
          break;
        case "option":
          un(e, a);
          break;
        case "select":
          ud(e, a);
          break;
        default:
          typeof s.onClick == "function" && Hh(e);
          break;
      }
    }
    function nw(e, t, a, i, u) {
      Uh(t, i);
      var s = null, f, p;
      switch (t) {
        case "input":
          f = h(e, a), p = h(e, i), s = [];
          break;
        case "select":
          f = ss(e, a), p = ss(e, i), s = [];
          break;
        case "textarea":
          f = sd(e, a), p = sd(e, i), s = [];
          break;
        default:
          f = a, p = i, typeof f.onClick != "function" && typeof p.onClick == "function" && Hh(e);
          break;
      }
      gc(t, p);
      var v, g, C = null;
      for (v in f)
        if (!(p.hasOwnProperty(v) || !f.hasOwnProperty(v) || f[v] == null))
          if (v === Qs) {
            var k = f[v];
            for (g in k)
              k.hasOwnProperty(g) && (C || (C = {}), C[g] = "");
          } else v === pp || v === Ws || v === Ah || v === Vo || v === EE || (pt.hasOwnProperty(v) ? s || (s = []) : (s = s || []).push(v, null));
      for (v in p) {
        var _ = p[v], U = f?.[v];
        if (!(!p.hasOwnProperty(v) || _ === U || _ == null && U == null))
          if (v === Qs)
            if (_ && Object.freeze(_), U) {
              for (g in U)
                U.hasOwnProperty(g) && (!_ || !_.hasOwnProperty(g)) && (C || (C = {}), C[g] = "");
              for (g in _)
                _.hasOwnProperty(g) && U[g] !== _[g] && (C || (C = {}), C[g] = _[g]);
            } else
              C || (s || (s = []), s.push(v, C)), C = _;
          else if (v === pp) {
            var P = _ ? _[zh] : void 0, I = U ? U[zh] : void 0;
            P != null && I !== P && (s = s || []).push(v, P);
          } else v === Ws ? (typeof _ == "string" || typeof _ == "number") && (s = s || []).push(v, "" + _) : v === Ah || v === Vo || (pt.hasOwnProperty(v) ? (_ != null && (typeof _ != "function" && Fh(v, _), v === "onScroll" && _n("scroll", e)), !s && U !== _ && (s = [])) : (s = s || []).push(v, _));
      }
      return C && (ds(C, p[Qs]), (s = s || []).push(Qs, C)), s;
    }
    function rw(e, t, a, i, u) {
      a === "input" && u.type === "radio" && u.name != null && F(e, u);
      var s = Gi(a, i), f = Gi(a, u);
      switch (ZT(e, t, s, f), a) {
        case "input":
          V(e, u);
          break;
        case "textarea":
          gv(e, u);
          break;
        case "select":
          wy(e, u);
          break;
      }
    }
    function aw(e) {
      {
        var t = e.toLowerCase();
        return Sc.hasOwnProperty(t) && Sc[t] || null;
      }
    }
    function iw(e, t, a, i, u, s, f) {
      var p, v;
      switch (p = Gi(t, a), Uh(t, a), t) {
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
          for (var g = 0; g < cp.length; g++)
            _n(cp[g], e);
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
          cs(e, a), _n("invalid", e);
          break;
        case "textarea":
          yv(e, a), _n("invalid", e);
          break;
      }
      gc(t, a);
      {
        v = /* @__PURE__ */ new Set();
        for (var C = e.attributes, k = 0; k < C.length; k++) {
          var _ = C[k].name.toLowerCase();
          switch (_) {
            // Controlled attributes are not validated
            // TODO: Only ignore them on controlled tags.
            case "value":
              break;
            case "checked":
              break;
            case "selected":
              break;
            default:
              v.add(C[k].name);
          }
        }
      }
      var U = null;
      for (var P in a)
        if (a.hasOwnProperty(P)) {
          var I = a[P];
          if (P === Ws)
            typeof I == "string" ? e.textContent !== I && (a[Vo] !== !0 && Ph(e.textContent, I, s, f), U = [Ws, I]) : typeof I == "number" && e.textContent !== "" + I && (a[Vo] !== !0 && Ph(e.textContent, I, s, f), U = [Ws, "" + I]);
          else if (pt.hasOwnProperty(P))
            I != null && (typeof I != "function" && Fh(P, I), P === "onScroll" && _n("scroll", e));
          else if (f && // Convince Flow we've calculated it (it's DEV-only in this method.)
          typeof p == "boolean") {
            var Se = void 0, Qe = p && We ? null : Mr(P);
            if (a[Vo] !== !0) {
              if (!(P === Ah || P === Vo || // Controlled attributes are not validated
              // TODO: Only ignore them on controlled tags.
              P === "value" || P === "checked" || P === "selected")) {
                if (P === pp) {
                  var Ve = e.innerHTML, kt = I ? I[zh] : void 0;
                  if (kt != null) {
                    var Rt = TE(e, kt);
                    Rt !== Ve && vp(P, Ve, Rt);
                  }
                } else if (P === Qs) {
                  if (v.delete(P), RE) {
                    var N = Ly(I);
                    Se = e.getAttribute("style"), N !== Se && vp(P, Se, N);
                  }
                } else if (p && !We)
                  v.delete(P.toLowerCase()), Se = Ei(e, P, I), I !== Se && vp(P, Se, I);
                else if (!Tn(P, Qe, p) && !Qt(P, I, Qe, p)) {
                  var Y = !1;
                  if (Qe !== null)
                    v.delete(Qe.attributeName), Se = Ea(e, P, I, Qe);
                  else {
                    var A = i;
                    if (A === Wi && (A = vc(t)), A === Wi)
                      v.delete(P.toLowerCase());
                    else {
                      var re = aw(P);
                      re !== null && re !== P && (Y = !0, v.delete(re)), v.delete(P);
                    }
                    Se = Ei(e, P, I);
                  }
                  var Te = We;
                  !Te && I !== Se && !Y && vp(P, Se, I);
                }
              }
            }
          }
        }
      switch (f && // $FlowFixMe - Should be inferred as not undefined.
      v.size > 0 && a[Vo] !== !0 && CE(v), t) {
        case "input":
          Fa(e), le(e, a, !0);
          break;
        case "textarea":
          Fa(e), Sv(e);
          break;
        case "select":
        case "option":
          break;
        default:
          typeof a.onClick == "function" && Hh(e);
          break;
      }
      return U;
    }
    function lw(e, t, a) {
      var i = e.nodeValue !== t;
      return i;
    }
    function fg(e, t) {
      {
        if (Za)
          return;
        Za = !0, E("Did not expect server HTML to contain a <%s> in <%s>.", t.nodeName.toLowerCase(), e.nodeName.toLowerCase());
      }
    }
    function dg(e, t) {
      {
        if (Za)
          return;
        Za = !0, E('Did not expect server HTML to contain the text node "%s" in <%s>.', t.nodeValue, e.nodeName.toLowerCase());
      }
    }
    function pg(e, t, a) {
      {
        if (Za)
          return;
        Za = !0, E("Expected server HTML to contain a matching <%s> in <%s>.", t, e.nodeName.toLowerCase());
      }
    }
    function vg(e, t) {
      {
        if (t === "" || Za)
          return;
        Za = !0, E('Expected server HTML to contain a matching text node for "%s" in <%s>.', t, e.nodeName.toLowerCase());
      }
    }
    function uw(e, t, a) {
      switch (t) {
        case "input":
          Xe(e, a);
          return;
        case "textarea":
          cd(e, a);
          return;
        case "select":
          by(e, a);
          return;
      }
    }
    var hp = function() {
    }, mp = function() {
    };
    {
      var ow = ["address", "applet", "area", "article", "aside", "base", "basefont", "bgsound", "blockquote", "body", "br", "button", "caption", "center", "col", "colgroup", "dd", "details", "dir", "div", "dl", "dt", "embed", "fieldset", "figcaption", "figure", "footer", "form", "frame", "frameset", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hgroup", "hr", "html", "iframe", "img", "input", "isindex", "li", "link", "listing", "main", "marquee", "menu", "menuitem", "meta", "nav", "noembed", "noframes", "noscript", "object", "ol", "p", "param", "plaintext", "pre", "script", "section", "select", "source", "style", "summary", "table", "tbody", "td", "template", "textarea", "tfoot", "th", "thead", "title", "tr", "track", "ul", "wbr", "xmp"], bE = [
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
      ], sw = bE.concat(["button"]), cw = ["dd", "dt", "li", "option", "optgroup", "p", "rp", "rt"], xE = {
        current: null,
        formTag: null,
        aTagInScope: null,
        buttonTagInScope: null,
        nobrTagInScope: null,
        pTagInButtonScope: null,
        listItemTagAutoclosing: null,
        dlItemTagAutoclosing: null
      };
      mp = function(e, t) {
        var a = mt({}, e || xE), i = {
          tag: t
        };
        return bE.indexOf(t) !== -1 && (a.aTagInScope = null, a.buttonTagInScope = null, a.nobrTagInScope = null), sw.indexOf(t) !== -1 && (a.pTagInButtonScope = null), ow.indexOf(t) !== -1 && t !== "address" && t !== "div" && t !== "p" && (a.listItemTagAutoclosing = null, a.dlItemTagAutoclosing = null), a.current = i, t === "form" && (a.formTag = i), t === "a" && (a.aTagInScope = i), t === "button" && (a.buttonTagInScope = i), t === "nobr" && (a.nobrTagInScope = i), t === "p" && (a.pTagInButtonScope = i), t === "li" && (a.listItemTagAutoclosing = i), (t === "dd" || t === "dt") && (a.dlItemTagAutoclosing = i), a;
      };
      var fw = function(e, t) {
        switch (t) {
          // https://html.spec.whatwg.org/multipage/syntax.html#parsing-main-inselect
          case "select":
            return e === "option" || e === "optgroup" || e === "#text";
          case "optgroup":
            return e === "option" || e === "#text";
          // Strictly speaking, seeing an <option> doesn't mean we're in a <select>
          // but
          case "option":
            return e === "#text";
          // https://html.spec.whatwg.org/multipage/syntax.html#parsing-main-intd
          // https://html.spec.whatwg.org/multipage/syntax.html#parsing-main-incaption
          // No special behavior since these rules fall back to "in body" mode for
          // all except special table nodes which cause bad parsing behavior anyway.
          // https://html.spec.whatwg.org/multipage/syntax.html#parsing-main-intr
          case "tr":
            return e === "th" || e === "td" || e === "style" || e === "script" || e === "template";
          // https://html.spec.whatwg.org/multipage/syntax.html#parsing-main-intbody
          case "tbody":
          case "thead":
          case "tfoot":
            return e === "tr" || e === "style" || e === "script" || e === "template";
          // https://html.spec.whatwg.org/multipage/syntax.html#parsing-main-incolgroup
          case "colgroup":
            return e === "col" || e === "template";
          // https://html.spec.whatwg.org/multipage/syntax.html#parsing-main-intable
          case "table":
            return e === "caption" || e === "colgroup" || e === "tbody" || e === "tfoot" || e === "thead" || e === "style" || e === "script" || e === "template";
          // https://html.spec.whatwg.org/multipage/syntax.html#parsing-main-inhead
          case "head":
            return e === "base" || e === "basefont" || e === "bgsound" || e === "link" || e === "meta" || e === "title" || e === "noscript" || e === "noframes" || e === "style" || e === "script" || e === "template";
          // https://html.spec.whatwg.org/multipage/semantics.html#the-html-element
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
            return cw.indexOf(t) === -1;
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
      }, dw = function(e, t) {
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
      }, _E = {};
      hp = function(e, t, a) {
        a = a || xE;
        var i = a.current, u = i && i.tag;
        t != null && (e != null && E("validateDOMNesting: when childText is passed, childTag should be null"), e = "#text");
        var s = fw(e, u) ? null : i, f = s ? null : dw(e, a), p = s || f;
        if (p) {
          var v = p.tag, g = !!s + "|" + e + "|" + v;
          if (!_E[g]) {
            _E[g] = !0;
            var C = e, k = "";
            if (e === "#text" ? /\S/.test(t) ? C = "Text nodes" : (C = "Whitespace text nodes", k = " Make sure you don't have any extra whitespace between tags on each line of your source code.") : C = "<" + e + ">", s) {
              var _ = "";
              v === "table" && e === "tr" && (_ += " Add a <tbody>, <thead> or <tfoot> to your code to match the DOM tree generated by the browser."), E("validateDOMNesting(...): %s cannot appear as a child of <%s>.%s%s", C, v, k, _);
            } else
              E("validateDOMNesting(...): %s cannot appear as a descendant of <%s>.", C, v);
          }
        }
      };
    }
    var Vh = "suppressHydrationWarning", $h = "$", Bh = "/$", yp = "$?", gp = "$!", pw = "style", hg = null, mg = null;
    function vw(e) {
      var t, a, i = e.nodeType;
      switch (i) {
        case fi:
        case su: {
          t = i === fi ? "#document" : "#fragment";
          var u = e.documentElement;
          a = u ? u.namespaceURI : dd(null, "");
          break;
        }
        default: {
          var s = i === $n ? e.parentNode : e, f = s.namespaceURI || null;
          t = s.tagName, a = dd(f, t);
          break;
        }
      }
      {
        var p = t.toLowerCase(), v = mp(null, p);
        return {
          namespace: a,
          ancestorInfo: v
        };
      }
    }
    function hw(e, t, a) {
      {
        var i = e, u = dd(i.namespace, t), s = mp(i.ancestorInfo, t);
        return {
          namespace: u,
          ancestorInfo: s
        };
      }
    }
    function PO(e) {
      return e;
    }
    function mw(e) {
      hg = Ao(), mg = OT();
      var t = null;
      return fa(!1), t;
    }
    function yw(e) {
      MT(mg), fa(hg), hg = null, mg = null;
    }
    function gw(e, t, a, i, u) {
      var s;
      {
        var f = i;
        if (hp(e, null, f.ancestorInfo), typeof t.children == "string" || typeof t.children == "number") {
          var p = "" + t.children, v = mp(f.ancestorInfo, e);
          hp(null, p, v);
        }
        s = f.namespace;
      }
      var g = JT(e, t, a, s);
      return Cp(u, g), wg(g, t), g;
    }
    function Sw(e, t) {
      e.appendChild(t);
    }
    function Ew(e, t, a, i, u) {
      switch (tw(e, t, a, i), t) {
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
    function Cw(e, t, a, i, u, s) {
      {
        var f = s;
        if (typeof i.children != typeof a.children && (typeof i.children == "string" || typeof i.children == "number")) {
          var p = "" + i.children, v = mp(f.ancestorInfo, t);
          hp(null, p, v);
        }
      }
      return nw(e, t, a, i);
    }
    function yg(e, t) {
      return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
    }
    function Rw(e, t, a, i) {
      {
        var u = a;
        hp(null, e, u.ancestorInfo);
      }
      var s = ew(e, t);
      return Cp(i, s), s;
    }
    function Tw() {
      var e = window.event;
      return e === void 0 ? ki : cf(e.type);
    }
    var gg = typeof setTimeout == "function" ? setTimeout : void 0, ww = typeof clearTimeout == "function" ? clearTimeout : void 0, Sg = -1, DE = typeof Promise == "function" ? Promise : void 0, bw = typeof queueMicrotask == "function" ? queueMicrotask : typeof DE < "u" ? function(e) {
      return DE.resolve(null).then(e).catch(xw);
    } : gg;
    function xw(e) {
      setTimeout(function() {
        throw e;
      });
    }
    function _w(e, t, a, i) {
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
    function Dw(e, t, a, i, u, s) {
      rw(e, t, a, i, u), wg(e, u);
    }
    function kE(e) {
      mc(e, "");
    }
    function kw(e, t, a) {
      e.nodeValue = a;
    }
    function Ow(e, t) {
      e.appendChild(t);
    }
    function Mw(e, t) {
      var a;
      e.nodeType === $n ? (a = e.parentNode, a.insertBefore(t, e)) : (a = e, a.appendChild(t));
      var i = e._reactRootContainer;
      i == null && a.onclick === null && Hh(a);
    }
    function Lw(e, t, a) {
      e.insertBefore(t, a);
    }
    function Nw(e, t, a) {
      e.nodeType === $n ? e.parentNode.insertBefore(t, a) : e.insertBefore(t, a);
    }
    function Aw(e, t) {
      e.removeChild(t);
    }
    function zw(e, t) {
      e.nodeType === $n ? e.parentNode.removeChild(t) : e.removeChild(t);
    }
    function Eg(e, t) {
      var a = t, i = 0;
      do {
        var u = a.nextSibling;
        if (e.removeChild(a), u && u.nodeType === $n) {
          var s = u.data;
          if (s === Bh)
            if (i === 0) {
              e.removeChild(u), Ln(t);
              return;
            } else
              i--;
          else (s === $h || s === yp || s === gp) && i++;
        }
        a = u;
      } while (a);
      Ln(t);
    }
    function Uw(e, t) {
      e.nodeType === $n ? Eg(e.parentNode, t) : e.nodeType === ta && Eg(e, t), Ln(e);
    }
    function Fw(e) {
      e = e;
      var t = e.style;
      typeof t.setProperty == "function" ? t.setProperty("display", "none", "important") : t.display = "none";
    }
    function jw(e) {
      e.nodeValue = "";
    }
    function Pw(e, t) {
      e = e;
      var a = t[pw], i = a != null && a.hasOwnProperty("display") ? a.display : null;
      e.style.display = yc("display", i);
    }
    function Hw(e, t) {
      e.nodeValue = t;
    }
    function Vw(e) {
      e.nodeType === ta ? e.textContent = "" : e.nodeType === fi && e.documentElement && e.removeChild(e.documentElement);
    }
    function $w(e, t, a) {
      return e.nodeType !== ta || t.toLowerCase() !== e.nodeName.toLowerCase() ? null : e;
    }
    function Bw(e, t) {
      return t === "" || e.nodeType !== Qi ? null : e;
    }
    function Iw(e) {
      return e.nodeType !== $n ? null : e;
    }
    function OE(e) {
      return e.data === yp;
    }
    function Cg(e) {
      return e.data === gp;
    }
    function Yw(e) {
      var t = e.nextSibling && e.nextSibling.dataset, a, i, u;
      return t && (a = t.dgst, i = t.msg, u = t.stck), {
        message: i,
        digest: a,
        stack: u
      };
    }
    function Ww(e, t) {
      e._reactRetry = t;
    }
    function Ih(e) {
      for (; e != null; e = e.nextSibling) {
        var t = e.nodeType;
        if (t === ta || t === Qi)
          break;
        if (t === $n) {
          var a = e.data;
          if (a === $h || a === gp || a === yp)
            break;
          if (a === Bh)
            return null;
        }
      }
      return e;
    }
    function Sp(e) {
      return Ih(e.nextSibling);
    }
    function Qw(e) {
      return Ih(e.firstChild);
    }
    function Gw(e) {
      return Ih(e.firstChild);
    }
    function qw(e) {
      return Ih(e.nextSibling);
    }
    function Kw(e, t, a, i, u, s, f) {
      Cp(s, e), wg(e, a);
      var p;
      {
        var v = u;
        p = v.namespace;
      }
      var g = (s.mode & He) !== Fe;
      return iw(e, t, a, p, i, g, f);
    }
    function Xw(e, t, a, i) {
      return Cp(a, e), a.mode & He, lw(e, t);
    }
    function Zw(e, t) {
      Cp(t, e);
    }
    function Jw(e) {
      for (var t = e.nextSibling, a = 0; t; ) {
        if (t.nodeType === $n) {
          var i = t.data;
          if (i === Bh) {
            if (a === 0)
              return Sp(t);
            a--;
          } else (i === $h || i === gp || i === yp) && a++;
        }
        t = t.nextSibling;
      }
      return null;
    }
    function ME(e) {
      for (var t = e.previousSibling, a = 0; t; ) {
        if (t.nodeType === $n) {
          var i = t.data;
          if (i === $h || i === gp || i === yp) {
            if (a === 0)
              return t;
            a--;
          } else i === Bh && a++;
        }
        t = t.previousSibling;
      }
      return null;
    }
    function eb(e) {
      Ln(e);
    }
    function tb(e) {
      Ln(e);
    }
    function nb(e) {
      return e !== "head" && e !== "body";
    }
    function rb(e, t, a, i) {
      var u = !0;
      Ph(t.nodeValue, a, i, u);
    }
    function ab(e, t, a, i, u, s) {
      if (t[Vh] !== !0) {
        var f = !0;
        Ph(i.nodeValue, u, s, f);
      }
    }
    function ib(e, t) {
      t.nodeType === ta ? fg(e, t) : t.nodeType === $n || dg(e, t);
    }
    function lb(e, t) {
      {
        var a = e.parentNode;
        a !== null && (t.nodeType === ta ? fg(a, t) : t.nodeType === $n || dg(a, t));
      }
    }
    function ub(e, t, a, i, u) {
      (u || t[Vh] !== !0) && (i.nodeType === ta ? fg(a, i) : i.nodeType === $n || dg(a, i));
    }
    function ob(e, t, a) {
      pg(e, t);
    }
    function sb(e, t) {
      vg(e, t);
    }
    function cb(e, t, a) {
      {
        var i = e.parentNode;
        i !== null && pg(i, t);
      }
    }
    function fb(e, t) {
      {
        var a = e.parentNode;
        a !== null && vg(a, t);
      }
    }
    function db(e, t, a, i, u, s) {
      (s || t[Vh] !== !0) && pg(a, i);
    }
    function pb(e, t, a, i, u) {
      (u || t[Vh] !== !0) && vg(a, i);
    }
    function vb(e) {
      E("An error occurred during hydration. The server HTML was replaced with client content in <%s>.", e.nodeName.toLowerCase());
    }
    function hb(e) {
      fp(e);
    }
    var Df = Math.random().toString(36).slice(2), kf = "__reactFiber$" + Df, Rg = "__reactProps$" + Df, Ep = "__reactContainer$" + Df, Tg = "__reactEvents$" + Df, mb = "__reactListeners$" + Df, yb = "__reactHandles$" + Df;
    function gb(e) {
      delete e[kf], delete e[Rg], delete e[Tg], delete e[mb], delete e[yb];
    }
    function Cp(e, t) {
      t[kf] = e;
    }
    function Yh(e, t) {
      t[Ep] = e;
    }
    function LE(e) {
      e[Ep] = null;
    }
    function Rp(e) {
      return !!e[Ep];
    }
    function Gs(e) {
      var t = e[kf];
      if (t)
        return t;
      for (var a = e.parentNode; a; ) {
        if (t = a[Ep] || a[kf], t) {
          var i = t.alternate;
          if (t.child !== null || i !== null && i.child !== null)
            for (var u = ME(e); u !== null; ) {
              var s = u[kf];
              if (s)
                return s;
              u = ME(u);
            }
          return t;
        }
        e = a, a = e.parentNode;
      }
      return null;
    }
    function $o(e) {
      var t = e[kf] || e[Ep];
      return t && (t.tag === ne || t.tag === fe || t.tag === $ || t.tag === K) ? t : null;
    }
    function Of(e) {
      if (e.tag === ne || e.tag === fe)
        return e.stateNode;
      throw new Error("getNodeFromInstance: Invalid argument.");
    }
    function Wh(e) {
      return e[Rg] || null;
    }
    function wg(e, t) {
      e[Rg] = t;
    }
    function Sb(e) {
      var t = e[Tg];
      return t === void 0 && (t = e[Tg] = /* @__PURE__ */ new Set()), t;
    }
    var NE = {}, AE = R.ReactDebugCurrentFrame;
    function Qh(e) {
      if (e) {
        var t = e._owner, a = wi(e.type, e._source, t ? t.type : null);
        AE.setExtraStackFrame(a);
      } else
        AE.setExtraStackFrame(null);
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
            p && !(p instanceof Error) && (Qh(u), E("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", i || "React class", a, f, typeof p), Qh(null)), p instanceof Error && !(p.message in NE) && (NE[p.message] = !0, Qh(u), E("Failed %s type: %s", a, p.message), Qh(null));
          }
      }
    }
    var bg = [], Gh;
    Gh = [];
    var Nu = -1;
    function Bo(e) {
      return {
        current: e
      };
    }
    function da(e, t) {
      if (Nu < 0) {
        E("Unexpected pop.");
        return;
      }
      t !== Gh[Nu] && E("Unexpected Fiber popped."), e.current = bg[Nu], bg[Nu] = null, Gh[Nu] = null, Nu--;
    }
    function pa(e, t, a) {
      Nu++, bg[Nu] = e.current, Gh[Nu] = a, e.current = t;
    }
    var xg;
    xg = {};
    var hi = {};
    Object.freeze(hi);
    var Au = Bo(hi), Yl = Bo(!1), _g = hi;
    function Mf(e, t, a) {
      return a && Wl(t) ? _g : Au.current;
    }
    function zE(e, t, a) {
      {
        var i = e.stateNode;
        i.__reactInternalMemoizedUnmaskedChildContext = t, i.__reactInternalMemoizedMaskedChildContext = a;
      }
    }
    function Lf(e, t) {
      {
        var a = e.type, i = a.contextTypes;
        if (!i)
          return hi;
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
        return u && zE(e, t, s), s;
      }
    }
    function qh() {
      return Yl.current;
    }
    function Wl(e) {
      {
        var t = e.childContextTypes;
        return t != null;
      }
    }
    function Kh(e) {
      da(Yl, e), da(Au, e);
    }
    function Dg(e) {
      da(Yl, e), da(Au, e);
    }
    function UE(e, t, a) {
      {
        if (Au.current !== hi)
          throw new Error("Unexpected context found on stack. This error is likely caused by a bug in React. Please file an issue.");
        pa(Au, t, e), pa(Yl, a, e);
      }
    }
    function FE(e, t, a) {
      {
        var i = e.stateNode, u = t.childContextTypes;
        if (typeof i.getChildContext != "function") {
          {
            var s = at(e) || "Unknown";
            xg[s] || (xg[s] = !0, E("%s.childContextTypes is specified but there is no getChildContext() method on the instance. You can either define getChildContext() on %s or remove childContextTypes from it.", s, s));
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
    function Xh(e) {
      {
        var t = e.stateNode, a = t && t.__reactInternalMemoizedMergedChildContext || hi;
        return _g = Au.current, pa(Au, a, e), pa(Yl, Yl.current, e), !0;
      }
    }
    function jE(e, t, a) {
      {
        var i = e.stateNode;
        if (!i)
          throw new Error("Expected to have an instance by this point. This error is likely caused by a bug in React. Please file an issue.");
        if (a) {
          var u = FE(e, t, _g);
          i.__reactInternalMemoizedMergedChildContext = u, da(Yl, e), da(Au, e), pa(Au, u, e), pa(Yl, a, e);
        } else
          da(Yl, e), pa(Yl, a, e);
      }
    }
    function Eb(e) {
      {
        if (!Ld(e) || e.tag !== q)
          throw new Error("Expected subtree parent to be a mounted class component. This error is likely caused by a bug in React. Please file an issue.");
        var t = e;
        do {
          switch (t.tag) {
            case K:
              return t.stateNode.context;
            case q: {
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
    var Io = 0, Zh = 1, zu = null, kg = !1, Og = !1;
    function PE(e) {
      zu === null ? zu = [e] : zu.push(e);
    }
    function Cb(e) {
      kg = !0, PE(e);
    }
    function HE() {
      kg && Yo();
    }
    function Yo() {
      if (!Og && zu !== null) {
        Og = !0;
        var e = 0, t = Qa();
        try {
          var a = !0, i = zu;
          for (Mn(Fn); e < i.length; e++) {
            var u = i[e];
            do
              u = u(a);
            while (u !== null);
          }
          zu = null, kg = !1;
        } catch (s) {
          throw zu !== null && (zu = zu.slice(e + 1)), Dc(Oc, Yo), s;
        } finally {
          Mn(t), Og = !1;
        }
      }
      return null;
    }
    var Nf = [], Af = 0, Jh = null, em = 0, Ni = [], Ai = 0, qs = null, Uu = 1, Fu = "";
    function Rb(e) {
      return Xs(), (e.flags & kd) !== Ie;
    }
    function Tb(e) {
      return Xs(), em;
    }
    function wb() {
      var e = Fu, t = Uu, a = t & ~bb(t);
      return a.toString(32) + e;
    }
    function Ks(e, t) {
      Xs(), Nf[Af++] = em, Nf[Af++] = Jh, Jh = e, em = t;
    }
    function VE(e, t, a) {
      Xs(), Ni[Ai++] = Uu, Ni[Ai++] = Fu, Ni[Ai++] = qs, qs = e;
      var i = Uu, u = Fu, s = tm(i) - 1, f = i & ~(1 << s), p = a + 1, v = tm(t) + s;
      if (v > 30) {
        var g = s - s % 5, C = (1 << g) - 1, k = (f & C).toString(32), _ = f >> g, U = s - g, P = tm(t) + U, I = p << U, Se = I | _, Qe = k + u;
        Uu = 1 << P | Se, Fu = Qe;
      } else {
        var Ve = p << s, kt = Ve | f, Rt = u;
        Uu = 1 << v | kt, Fu = Rt;
      }
    }
    function Mg(e) {
      Xs();
      var t = e.return;
      if (t !== null) {
        var a = 1, i = 0;
        Ks(e, a), VE(e, a, i);
      }
    }
    function tm(e) {
      return 32 - yo(e);
    }
    function bb(e) {
      return 1 << tm(e) - 1;
    }
    function Lg(e) {
      for (; e === Jh; )
        Jh = Nf[--Af], Nf[Af] = null, em = Nf[--Af], Nf[Af] = null;
      for (; e === qs; )
        qs = Ni[--Ai], Ni[Ai] = null, Fu = Ni[--Ai], Ni[Ai] = null, Uu = Ni[--Ai], Ni[Ai] = null;
    }
    function xb() {
      return Xs(), qs !== null ? {
        id: Uu,
        overflow: Fu
      } : null;
    }
    function _b(e, t) {
      Xs(), Ni[Ai++] = Uu, Ni[Ai++] = Fu, Ni[Ai++] = qs, Uu = t.id, Fu = t.overflow, qs = e;
    }
    function Xs() {
      Pr() || E("Expected to be hydrating. This is a bug in React. Please file an issue.");
    }
    var jr = null, zi = null, ul = !1, Zs = !1, Wo = null;
    function Db() {
      ul && E("We should not be hydrating here. This is a bug in React. Please file a bug.");
    }
    function $E() {
      Zs = !0;
    }
    function kb() {
      return Zs;
    }
    function Ob(e) {
      var t = e.stateNode.containerInfo;
      return zi = Gw(t), jr = e, ul = !0, Wo = null, Zs = !1, !0;
    }
    function Mb(e, t, a) {
      return zi = qw(t), jr = e, ul = !0, Wo = null, Zs = !1, a !== null && _b(e, a), !0;
    }
    function BE(e, t) {
      switch (e.tag) {
        case K: {
          ib(e.stateNode.containerInfo, t);
          break;
        }
        case ne: {
          var a = (e.mode & He) !== Fe;
          ub(
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
          i.dehydrated !== null && lb(i.dehydrated, t);
          break;
        }
      }
    }
    function IE(e, t) {
      BE(e, t);
      var a = zD();
      a.stateNode = t, a.return = e;
      var i = e.deletions;
      i === null ? (e.deletions = [a], e.flags |= Pt) : i.push(a);
    }
    function Ng(e, t) {
      {
        if (Zs)
          return;
        switch (e.tag) {
          case K: {
            var a = e.stateNode.containerInfo;
            switch (t.tag) {
              case ne:
                var i = t.type;
                t.pendingProps, ob(a, i);
                break;
              case fe:
                var u = t.pendingProps;
                sb(a, u);
                break;
            }
            break;
          }
          case ne: {
            var s = e.type, f = e.memoizedProps, p = e.stateNode;
            switch (t.tag) {
              case ne: {
                var v = t.type, g = t.pendingProps, C = (e.mode & He) !== Fe;
                db(
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
              case fe: {
                var k = t.pendingProps, _ = (e.mode & He) !== Fe;
                pb(
                  s,
                  f,
                  p,
                  k,
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
              case ne:
                var I = t.type;
                t.pendingProps, cb(P, I);
                break;
              case fe:
                var Se = t.pendingProps;
                fb(P, Se);
                break;
            }
            break;
          }
          default:
            return;
        }
      }
    }
    function YE(e, t) {
      t.flags = t.flags & ~Va | dn, Ng(e, t);
    }
    function WE(e, t) {
      switch (e.tag) {
        case ne: {
          var a = e.type;
          e.pendingProps;
          var i = $w(t, a);
          return i !== null ? (e.stateNode = i, jr = e, zi = Qw(i), !0) : !1;
        }
        case fe: {
          var u = e.pendingProps, s = Bw(t, u);
          return s !== null ? (e.stateNode = s, jr = e, zi = null, !0) : !1;
        }
        case $: {
          var f = Iw(t);
          if (f !== null) {
            var p = {
              dehydrated: f,
              treeContext: xb(),
              retryLane: _r
            };
            e.memoizedState = p;
            var v = UD(f);
            return v.return = e, e.child = v, jr = e, zi = null, !0;
          }
          return !1;
        }
        default:
          return !1;
      }
    }
    function Ag(e) {
      return (e.mode & He) !== Fe && (e.flags & nt) === Ie;
    }
    function zg(e) {
      throw new Error("Hydration failed because the initial UI does not match what was rendered on the server.");
    }
    function Ug(e) {
      if (ul) {
        var t = zi;
        if (!t) {
          Ag(e) && (Ng(jr, e), zg()), YE(jr, e), ul = !1, jr = e;
          return;
        }
        var a = t;
        if (!WE(e, t)) {
          Ag(e) && (Ng(jr, e), zg()), t = Sp(a);
          var i = jr;
          if (!t || !WE(e, t)) {
            YE(jr, e), ul = !1, jr = e;
            return;
          }
          IE(i, a);
        }
      }
    }
    function Lb(e, t, a) {
      var i = e.stateNode, u = !Zs, s = Kw(i, e.type, e.memoizedProps, t, a, e, u);
      return e.updateQueue = s, s !== null;
    }
    function Nb(e) {
      var t = e.stateNode, a = e.memoizedProps, i = Xw(t, a, e);
      if (i) {
        var u = jr;
        if (u !== null)
          switch (u.tag) {
            case K: {
              var s = u.stateNode.containerInfo, f = (u.mode & He) !== Fe;
              rb(
                s,
                t,
                a,
                // TODO: Delete this argument when we remove the legacy root API.
                f
              );
              break;
            }
            case ne: {
              var p = u.type, v = u.memoizedProps, g = u.stateNode, C = (u.mode & He) !== Fe;
              ab(
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
    function Ab(e) {
      var t = e.memoizedState, a = t !== null ? t.dehydrated : null;
      if (!a)
        throw new Error("Expected to have a hydrated suspense instance. This error is likely caused by a bug in React. Please file an issue.");
      Zw(a, e);
    }
    function zb(e) {
      var t = e.memoizedState, a = t !== null ? t.dehydrated : null;
      if (!a)
        throw new Error("Expected to have a hydrated suspense instance. This error is likely caused by a bug in React. Please file an issue.");
      return Jw(a);
    }
    function QE(e) {
      for (var t = e.return; t !== null && t.tag !== ne && t.tag !== K && t.tag !== $; )
        t = t.return;
      jr = t;
    }
    function nm(e) {
      if (e !== jr)
        return !1;
      if (!ul)
        return QE(e), ul = !0, !1;
      if (e.tag !== K && (e.tag !== ne || nb(e.type) && !yg(e.type, e.memoizedProps))) {
        var t = zi;
        if (t)
          if (Ag(e))
            GE(e), zg();
          else
            for (; t; )
              IE(e, t), t = Sp(t);
      }
      return QE(e), e.tag === $ ? zi = zb(e) : zi = jr ? Sp(e.stateNode) : null, !0;
    }
    function Ub() {
      return ul && zi !== null;
    }
    function GE(e) {
      for (var t = zi; t; )
        BE(e, t), t = Sp(t);
    }
    function zf() {
      jr = null, zi = null, ul = !1, Zs = !1;
    }
    function qE() {
      Wo !== null && ($C(Wo), Wo = null);
    }
    function Pr() {
      return ul;
    }
    function Fg(e) {
      Wo === null ? Wo = [e] : Wo.push(e);
    }
    var Fb = R.ReactCurrentBatchConfig, jb = null;
    function Pb() {
      return Fb.transition;
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
      var Hb = function(e) {
        for (var t = null, a = e; a !== null; )
          a.mode & gt && (t = a), a = a.return;
        return t;
      }, Js = function(e) {
        var t = [];
        return e.forEach(function(a) {
          t.push(a);
        }), t.sort().join(", ");
      }, Tp = [], wp = [], bp = [], xp = [], _p = [], Dp = [], ec = /* @__PURE__ */ new Set();
      ol.recordUnsafeLifecycleWarnings = function(e, t) {
        ec.has(e.type) || (typeof t.componentWillMount == "function" && // Don't warn about react-lifecycles-compat polyfilled components.
        t.componentWillMount.__suppressDeprecationWarning !== !0 && Tp.push(e), e.mode & gt && typeof t.UNSAFE_componentWillMount == "function" && wp.push(e), typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps.__suppressDeprecationWarning !== !0 && bp.push(e), e.mode & gt && typeof t.UNSAFE_componentWillReceiveProps == "function" && xp.push(e), typeof t.componentWillUpdate == "function" && t.componentWillUpdate.__suppressDeprecationWarning !== !0 && _p.push(e), e.mode & gt && typeof t.UNSAFE_componentWillUpdate == "function" && Dp.push(e));
      }, ol.flushPendingUnsafeLifecycleWarnings = function() {
        var e = /* @__PURE__ */ new Set();
        Tp.length > 0 && (Tp.forEach(function(_) {
          e.add(at(_) || "Component"), ec.add(_.type);
        }), Tp = []);
        var t = /* @__PURE__ */ new Set();
        wp.length > 0 && (wp.forEach(function(_) {
          t.add(at(_) || "Component"), ec.add(_.type);
        }), wp = []);
        var a = /* @__PURE__ */ new Set();
        bp.length > 0 && (bp.forEach(function(_) {
          a.add(at(_) || "Component"), ec.add(_.type);
        }), bp = []);
        var i = /* @__PURE__ */ new Set();
        xp.length > 0 && (xp.forEach(function(_) {
          i.add(at(_) || "Component"), ec.add(_.type);
        }), xp = []);
        var u = /* @__PURE__ */ new Set();
        _p.length > 0 && (_p.forEach(function(_) {
          u.add(at(_) || "Component"), ec.add(_.type);
        }), _p = []);
        var s = /* @__PURE__ */ new Set();
        if (Dp.length > 0 && (Dp.forEach(function(_) {
          s.add(at(_) || "Component"), ec.add(_.type);
        }), Dp = []), t.size > 0) {
          var f = Js(t);
          E(`Using UNSAFE_componentWillMount in strict mode is not recommended and may indicate bugs in your code. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move code with side effects to componentDidMount, and set initial state in the constructor.

Please update the following components: %s`, f);
        }
        if (i.size > 0) {
          var p = Js(i);
          E(`Using UNSAFE_componentWillReceiveProps in strict mode is not recommended and may indicate bugs in your code. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move data fetching code or side effects to componentDidUpdate.
* If you're updating state whenever props change, refactor your code to use memoization techniques or move it to static getDerivedStateFromProps. Learn more at: https://reactjs.org/link/derived-state

Please update the following components: %s`, p);
        }
        if (s.size > 0) {
          var v = Js(s);
          E(`Using UNSAFE_componentWillUpdate in strict mode is not recommended and may indicate bugs in your code. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move data fetching code or side effects to componentDidUpdate.

Please update the following components: %s`, v);
        }
        if (e.size > 0) {
          var g = Js(e);
          B(`componentWillMount has been renamed, and is not recommended for use. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move code with side effects to componentDidMount, and set initial state in the constructor.
* Rename componentWillMount to UNSAFE_componentWillMount to suppress this warning in non-strict mode. In React 18.x, only the UNSAFE_ name will work. To rename all deprecated lifecycles to their new names, you can run \`npx react-codemod rename-unsafe-lifecycles\` in your project source folder.

Please update the following components: %s`, g);
        }
        if (a.size > 0) {
          var C = Js(a);
          B(`componentWillReceiveProps has been renamed, and is not recommended for use. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move data fetching code or side effects to componentDidUpdate.
* If you're updating state whenever props change, refactor your code to use memoization techniques or move it to static getDerivedStateFromProps. Learn more at: https://reactjs.org/link/derived-state
* Rename componentWillReceiveProps to UNSAFE_componentWillReceiveProps to suppress this warning in non-strict mode. In React 18.x, only the UNSAFE_ name will work. To rename all deprecated lifecycles to their new names, you can run \`npx react-codemod rename-unsafe-lifecycles\` in your project source folder.

Please update the following components: %s`, C);
        }
        if (u.size > 0) {
          var k = Js(u);
          B(`componentWillUpdate has been renamed, and is not recommended for use. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move data fetching code or side effects to componentDidUpdate.
* Rename componentWillUpdate to UNSAFE_componentWillUpdate to suppress this warning in non-strict mode. In React 18.x, only the UNSAFE_ name will work. To rename all deprecated lifecycles to their new names, you can run \`npx react-codemod rename-unsafe-lifecycles\` in your project source folder.

Please update the following components: %s`, k);
        }
      };
      var rm = /* @__PURE__ */ new Map(), KE = /* @__PURE__ */ new Set();
      ol.recordLegacyContextWarning = function(e, t) {
        var a = Hb(e);
        if (a === null) {
          E("Expected to find a StrictMode component in a strict mode tree. This error is likely caused by a bug in React. Please file an issue.");
          return;
        }
        if (!KE.has(e.type)) {
          var i = rm.get(a);
          (e.type.contextTypes != null || e.type.childContextTypes != null || t !== null && typeof t.getChildContext == "function") && (i === void 0 && (i = [], rm.set(a, i)), i.push(e));
        }
      }, ol.flushLegacyContextWarning = function() {
        rm.forEach(function(e, t) {
          if (e.length !== 0) {
            var a = e[0], i = /* @__PURE__ */ new Set();
            e.forEach(function(s) {
              i.add(at(s) || "Component"), KE.add(s.type);
            });
            var u = Js(i);
            try {
              It(a), E(`Legacy context API has been detected within a strict-mode tree.

The old API will be supported in all 16.x releases, but applications using it should migrate to the new version.

Please update the following components: %s

Learn more about this warning here: https://reactjs.org/link/legacy-context`, u);
            } finally {
              kn();
            }
          }
        });
      }, ol.discardPendingWarnings = function() {
        Tp = [], wp = [], bp = [], xp = [], _p = [], Dp = [], rm = /* @__PURE__ */ new Map();
      };
    }
    var jg, Pg, Hg, Vg, $g, XE = function(e, t) {
    };
    jg = !1, Pg = !1, Hg = {}, Vg = {}, $g = {}, XE = function(e, t) {
      if (!(e === null || typeof e != "object") && !(!e._store || e._store.validated || e.key != null)) {
        if (typeof e._store != "object")
          throw new Error("React Component in warnForMissingKey should have a _store. This error is likely caused by a bug in React. Please file an issue.");
        e._store.validated = !0;
        var a = at(t) || "Component";
        Vg[a] || (Vg[a] = !0, E('Each child in a list should have a unique "key" prop. See https://reactjs.org/link/warning-keys for more information.'));
      }
    };
    function Vb(e) {
      return e.prototype && e.prototype.isReactComponent;
    }
    function kp(e, t, a) {
      var i = a.ref;
      if (i !== null && typeof i != "function" && typeof i != "object") {
        if ((e.mode & gt || Je) && // We warn in ReactElement.js if owner and self are equal for string refs
        // because these cannot be automatically converted to an arrow function
        // using a codemod. Therefore, we don't have to warn about string refs again.
        !(a._owner && a._self && a._owner.stateNode !== a._self) && // Will already throw with "Function components cannot have string refs"
        !(a._owner && a._owner.tag !== q) && // Will already warn with "Function components cannot be given refs"
        !(typeof a.type == "function" && !Vb(a.type)) && // Will already throw with "Element ref was specified as a string (someStringRef) but no owner was set"
        a._owner) {
          var u = at(e) || "Component";
          Hg[u] || (E('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. We recommend using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', u, i), Hg[u] = !0);
        }
        if (a._owner) {
          var s = a._owner, f;
          if (s) {
            var p = s;
            if (p.tag !== q)
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
          var C = function(k) {
            var _ = v.refs;
            k === null ? delete _[g] : _[g] = k;
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
    function am(e, t) {
      var a = Object.prototype.toString.call(t);
      throw new Error("Objects are not valid as a React child (found: " + (a === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : a) + "). If you meant to render a collection of children, use an array instead.");
    }
    function im(e) {
      {
        var t = at(e) || "Component";
        if ($g[t])
          return;
        $g[t] = !0, E("Functions are not valid as a React child. This may happen if you return a Component instead of <Component /> from render. Or maybe you meant to call this function rather than return it.");
      }
    }
    function ZE(e) {
      var t = e._payload, a = e._init;
      return a(t);
    }
    function JE(e) {
      function t(N, Y) {
        if (e) {
          var A = N.deletions;
          A === null ? (N.deletions = [Y], N.flags |= Pt) : A.push(Y);
        }
      }
      function a(N, Y) {
        if (!e)
          return null;
        for (var A = Y; A !== null; )
          t(N, A), A = A.sibling;
        return null;
      }
      function i(N, Y) {
        for (var A = /* @__PURE__ */ new Map(), re = Y; re !== null; )
          re.key !== null ? A.set(re.key, re) : A.set(re.index, re), re = re.sibling;
        return A;
      }
      function u(N, Y) {
        var A = sc(N, Y);
        return A.index = 0, A.sibling = null, A;
      }
      function s(N, Y, A) {
        if (N.index = A, !e)
          return N.flags |= kd, Y;
        var re = N.alternate;
        if (re !== null) {
          var Te = re.index;
          return Te < Y ? (N.flags |= dn, Y) : Te;
        } else
          return N.flags |= dn, Y;
      }
      function f(N) {
        return e && N.alternate === null && (N.flags |= dn), N;
      }
      function p(N, Y, A, re) {
        if (Y === null || Y.tag !== fe) {
          var Te = F0(A, N.mode, re);
          return Te.return = N, Te;
        } else {
          var Ee = u(Y, A);
          return Ee.return = N, Ee;
        }
      }
      function v(N, Y, A, re) {
        var Te = A.type;
        if (Te === Ra)
          return C(N, Y, A.props.children, re, A.key);
        if (Y !== null && (Y.elementType === Te || // Keep this check inline so it only runs on the false path:
        aR(Y, A) || // Lazy types should reconcile their resolved type.
        // We need to do this after the Hot Reloading check above,
        // because hot reloading has different semantics than prod because
        // it doesn't resuspend. So we can't let the call below suspend.
        typeof Te == "object" && Te !== null && Te.$$typeof === Ke && ZE(Te) === Y.type)) {
          var Ee = u(Y, A.props);
          return Ee.ref = kp(N, Y, A), Ee.return = N, Ee._debugSource = A._source, Ee._debugOwner = A._owner, Ee;
        }
        var tt = U0(A, N.mode, re);
        return tt.ref = kp(N, Y, A), tt.return = N, tt;
      }
      function g(N, Y, A, re) {
        if (Y === null || Y.tag !== oe || Y.stateNode.containerInfo !== A.containerInfo || Y.stateNode.implementation !== A.implementation) {
          var Te = j0(A, N.mode, re);
          return Te.return = N, Te;
        } else {
          var Ee = u(Y, A.children || []);
          return Ee.return = N, Ee;
        }
      }
      function C(N, Y, A, re, Te) {
        if (Y === null || Y.tag !== we) {
          var Ee = rs(A, N.mode, re, Te);
          return Ee.return = N, Ee;
        } else {
          var tt = u(Y, A);
          return tt.return = N, tt;
        }
      }
      function k(N, Y, A) {
        if (typeof Y == "string" && Y !== "" || typeof Y == "number") {
          var re = F0("" + Y, N.mode, A);
          return re.return = N, re;
        }
        if (typeof Y == "object" && Y !== null) {
          switch (Y.$$typeof) {
            case ui: {
              var Te = U0(Y, N.mode, A);
              return Te.ref = kp(N, null, Y), Te.return = N, Te;
            }
            case Lr: {
              var Ee = j0(Y, N.mode, A);
              return Ee.return = N, Ee;
            }
            case Ke: {
              var tt = Y._payload, ut = Y._init;
              return k(N, ut(tt), A);
            }
          }
          if (xt(Y) || Nr(Y)) {
            var en = rs(Y, N.mode, A, null);
            return en.return = N, en;
          }
          am(N, Y);
        }
        return typeof Y == "function" && im(N), null;
      }
      function _(N, Y, A, re) {
        var Te = Y !== null ? Y.key : null;
        if (typeof A == "string" && A !== "" || typeof A == "number")
          return Te !== null ? null : p(N, Y, "" + A, re);
        if (typeof A == "object" && A !== null) {
          switch (A.$$typeof) {
            case ui:
              return A.key === Te ? v(N, Y, A, re) : null;
            case Lr:
              return A.key === Te ? g(N, Y, A, re) : null;
            case Ke: {
              var Ee = A._payload, tt = A._init;
              return _(N, Y, tt(Ee), re);
            }
          }
          if (xt(A) || Nr(A))
            return Te !== null ? null : C(N, Y, A, re, null);
          am(N, A);
        }
        return typeof A == "function" && im(N), null;
      }
      function U(N, Y, A, re, Te) {
        if (typeof re == "string" && re !== "" || typeof re == "number") {
          var Ee = N.get(A) || null;
          return p(Y, Ee, "" + re, Te);
        }
        if (typeof re == "object" && re !== null) {
          switch (re.$$typeof) {
            case ui: {
              var tt = N.get(re.key === null ? A : re.key) || null;
              return v(Y, tt, re, Te);
            }
            case Lr: {
              var ut = N.get(re.key === null ? A : re.key) || null;
              return g(Y, ut, re, Te);
            }
            case Ke:
              var en = re._payload, Ut = re._init;
              return U(N, Y, A, Ut(en), Te);
          }
          if (xt(re) || Nr(re)) {
            var Xn = N.get(A) || null;
            return C(Y, Xn, re, Te, null);
          }
          am(Y, re);
        }
        return typeof re == "function" && im(Y), null;
      }
      function P(N, Y, A) {
        {
          if (typeof N != "object" || N === null)
            return Y;
          switch (N.$$typeof) {
            case ui:
            case Lr:
              XE(N, A);
              var re = N.key;
              if (typeof re != "string")
                break;
              if (Y === null) {
                Y = /* @__PURE__ */ new Set(), Y.add(re);
                break;
              }
              if (!Y.has(re)) {
                Y.add(re);
                break;
              }
              E("Encountered two children with the same key, `%s`. Keys should be unique so that components maintain their identity across updates. Non-unique keys may cause children to be duplicated and/or omitted — the behavior is unsupported and could change in a future version.", re);
              break;
            case Ke:
              var Te = N._payload, Ee = N._init;
              P(Ee(Te), Y, A);
              break;
          }
        }
        return Y;
      }
      function I(N, Y, A, re) {
        for (var Te = null, Ee = 0; Ee < A.length; Ee++) {
          var tt = A[Ee];
          Te = P(tt, Te, N);
        }
        for (var ut = null, en = null, Ut = Y, Xn = 0, Ft = 0, Yn = null; Ut !== null && Ft < A.length; Ft++) {
          Ut.index > Ft ? (Yn = Ut, Ut = null) : Yn = Ut.sibling;
          var ha = _(N, Ut, A[Ft], re);
          if (ha === null) {
            Ut === null && (Ut = Yn);
            break;
          }
          e && Ut && ha.alternate === null && t(N, Ut), Xn = s(ha, Xn, Ft), en === null ? ut = ha : en.sibling = ha, en = ha, Ut = Yn;
        }
        if (Ft === A.length) {
          if (a(N, Ut), Pr()) {
            var Wr = Ft;
            Ks(N, Wr);
          }
          return ut;
        }
        if (Ut === null) {
          for (; Ft < A.length; Ft++) {
            var yi = k(N, A[Ft], re);
            yi !== null && (Xn = s(yi, Xn, Ft), en === null ? ut = yi : en.sibling = yi, en = yi);
          }
          if (Pr()) {
            var La = Ft;
            Ks(N, La);
          }
          return ut;
        }
        for (var Na = i(N, Ut); Ft < A.length; Ft++) {
          var ma = U(Na, N, Ft, A[Ft], re);
          ma !== null && (e && ma.alternate !== null && Na.delete(ma.key === null ? Ft : ma.key), Xn = s(ma, Xn, Ft), en === null ? ut = ma : en.sibling = ma, en = ma);
        }
        if (e && Na.forEach(function(ed) {
          return t(N, ed);
        }), Pr()) {
          var Iu = Ft;
          Ks(N, Iu);
        }
        return ut;
      }
      function Se(N, Y, A, re) {
        var Te = Nr(A);
        if (typeof Te != "function")
          throw new Error("An object is not an iterable. This error is likely caused by a bug in React. Please file an issue.");
        {
          typeof Symbol == "function" && // $FlowFixMe Flow doesn't know about toStringTag
          A[Symbol.toStringTag] === "Generator" && (Pg || E("Using Generators as children is unsupported and will likely yield unexpected results because enumerating a generator mutates it. You may convert it to an array with `Array.from()` or the `[...spread]` operator before rendering. Keep in mind you might need to polyfill these features for older browsers."), Pg = !0), A.entries === Te && (jg || E("Using Maps as children is not supported. Use an array of keyed ReactElements instead."), jg = !0);
          var Ee = Te.call(A);
          if (Ee)
            for (var tt = null, ut = Ee.next(); !ut.done; ut = Ee.next()) {
              var en = ut.value;
              tt = P(en, tt, N);
            }
        }
        var Ut = Te.call(A);
        if (Ut == null)
          throw new Error("An iterable object provided no iterator.");
        for (var Xn = null, Ft = null, Yn = Y, ha = 0, Wr = 0, yi = null, La = Ut.next(); Yn !== null && !La.done; Wr++, La = Ut.next()) {
          Yn.index > Wr ? (yi = Yn, Yn = null) : yi = Yn.sibling;
          var Na = _(N, Yn, La.value, re);
          if (Na === null) {
            Yn === null && (Yn = yi);
            break;
          }
          e && Yn && Na.alternate === null && t(N, Yn), ha = s(Na, ha, Wr), Ft === null ? Xn = Na : Ft.sibling = Na, Ft = Na, Yn = yi;
        }
        if (La.done) {
          if (a(N, Yn), Pr()) {
            var ma = Wr;
            Ks(N, ma);
          }
          return Xn;
        }
        if (Yn === null) {
          for (; !La.done; Wr++, La = Ut.next()) {
            var Iu = k(N, La.value, re);
            Iu !== null && (ha = s(Iu, ha, Wr), Ft === null ? Xn = Iu : Ft.sibling = Iu, Ft = Iu);
          }
          if (Pr()) {
            var ed = Wr;
            Ks(N, ed);
          }
          return Xn;
        }
        for (var uv = i(N, Yn); !La.done; Wr++, La = Ut.next()) {
          var eu = U(uv, N, Wr, La.value, re);
          eu !== null && (e && eu.alternate !== null && uv.delete(eu.key === null ? Wr : eu.key), ha = s(eu, ha, Wr), Ft === null ? Xn = eu : Ft.sibling = eu, Ft = eu);
        }
        if (e && uv.forEach(function(pk) {
          return t(N, pk);
        }), Pr()) {
          var dk = Wr;
          Ks(N, dk);
        }
        return Xn;
      }
      function Qe(N, Y, A, re) {
        if (Y !== null && Y.tag === fe) {
          a(N, Y.sibling);
          var Te = u(Y, A);
          return Te.return = N, Te;
        }
        a(N, Y);
        var Ee = F0(A, N.mode, re);
        return Ee.return = N, Ee;
      }
      function Ve(N, Y, A, re) {
        for (var Te = A.key, Ee = Y; Ee !== null; ) {
          if (Ee.key === Te) {
            var tt = A.type;
            if (tt === Ra) {
              if (Ee.tag === we) {
                a(N, Ee.sibling);
                var ut = u(Ee, A.props.children);
                return ut.return = N, ut._debugSource = A._source, ut._debugOwner = A._owner, ut;
              }
            } else if (Ee.elementType === tt || // Keep this check inline so it only runs on the false path:
            aR(Ee, A) || // Lazy types should reconcile their resolved type.
            // We need to do this after the Hot Reloading check above,
            // because hot reloading has different semantics than prod because
            // it doesn't resuspend. So we can't let the call below suspend.
            typeof tt == "object" && tt !== null && tt.$$typeof === Ke && ZE(tt) === Ee.type) {
              a(N, Ee.sibling);
              var en = u(Ee, A.props);
              return en.ref = kp(N, Ee, A), en.return = N, en._debugSource = A._source, en._debugOwner = A._owner, en;
            }
            a(N, Ee);
            break;
          } else
            t(N, Ee);
          Ee = Ee.sibling;
        }
        if (A.type === Ra) {
          var Ut = rs(A.props.children, N.mode, re, A.key);
          return Ut.return = N, Ut;
        } else {
          var Xn = U0(A, N.mode, re);
          return Xn.ref = kp(N, Y, A), Xn.return = N, Xn;
        }
      }
      function kt(N, Y, A, re) {
        for (var Te = A.key, Ee = Y; Ee !== null; ) {
          if (Ee.key === Te)
            if (Ee.tag === oe && Ee.stateNode.containerInfo === A.containerInfo && Ee.stateNode.implementation === A.implementation) {
              a(N, Ee.sibling);
              var tt = u(Ee, A.children || []);
              return tt.return = N, tt;
            } else {
              a(N, Ee);
              break;
            }
          else
            t(N, Ee);
          Ee = Ee.sibling;
        }
        var ut = j0(A, N.mode, re);
        return ut.return = N, ut;
      }
      function Rt(N, Y, A, re) {
        var Te = typeof A == "object" && A !== null && A.type === Ra && A.key === null;
        if (Te && (A = A.props.children), typeof A == "object" && A !== null) {
          switch (A.$$typeof) {
            case ui:
              return f(Ve(N, Y, A, re));
            case Lr:
              return f(kt(N, Y, A, re));
            case Ke:
              var Ee = A._payload, tt = A._init;
              return Rt(N, Y, tt(Ee), re);
          }
          if (xt(A))
            return I(N, Y, A, re);
          if (Nr(A))
            return Se(N, Y, A, re);
          am(N, A);
        }
        return typeof A == "string" && A !== "" || typeof A == "number" ? f(Qe(N, Y, "" + A, re)) : (typeof A == "function" && im(N), a(N, Y));
      }
      return Rt;
    }
    var Uf = JE(!0), e1 = JE(!1);
    function $b(e, t) {
      if (e !== null && t.child !== e.child)
        throw new Error("Resuming work not yet implemented.");
      if (t.child !== null) {
        var a = t.child, i = sc(a, a.pendingProps);
        for (t.child = i, i.return = t; a.sibling !== null; )
          a = a.sibling, i = i.sibling = sc(a, a.pendingProps), i.return = t;
        i.sibling = null;
      }
    }
    function Bb(e, t) {
      for (var a = e.child; a !== null; )
        OD(a, t), a = a.sibling;
    }
    var Bg = Bo(null), Ig;
    Ig = {};
    var lm = null, Ff = null, Yg = null, um = !1;
    function om() {
      lm = null, Ff = null, Yg = null, um = !1;
    }
    function t1() {
      um = !0;
    }
    function n1() {
      um = !1;
    }
    function r1(e, t, a) {
      pa(Bg, t._currentValue, e), t._currentValue = a, t._currentRenderer !== void 0 && t._currentRenderer !== null && t._currentRenderer !== Ig && E("Detected multiple renderers concurrently rendering the same context provider. This is currently unsupported."), t._currentRenderer = Ig;
    }
    function Wg(e, t) {
      var a = Bg.current;
      da(Bg, t), e._currentValue = a;
    }
    function Qg(e, t, a) {
      for (var i = e; i !== null; ) {
        var u = i.alternate;
        if (bu(i.childLanes, t) ? u !== null && !bu(u.childLanes, t) && (u.childLanes = st(u.childLanes, t)) : (i.childLanes = st(i.childLanes, t), u !== null && (u.childLanes = st(u.childLanes, t))), i === a)
          break;
        i = i.return;
      }
      i !== a && E("Expected to find the propagation root when scheduling context work. This error is likely caused by a bug in React. Please file an issue.");
    }
    function Ib(e, t, a) {
      Yb(e, t, a);
    }
    function Yb(e, t, a) {
      var i = e.child;
      for (i !== null && (i.return = e); i !== null; ) {
        var u = void 0, s = i.dependencies;
        if (s !== null) {
          u = i.child;
          for (var f = s.firstContext; f !== null; ) {
            if (f.context === t) {
              if (i.tag === q) {
                var p = wo(a), v = ju(cn, p);
                v.tag = cm;
                var g = i.updateQueue;
                if (g !== null) {
                  var C = g.shared, k = C.pending;
                  k === null ? v.next = v : (v.next = k.next, k.next = v), C.pending = v;
                }
              }
              i.lanes = st(i.lanes, a);
              var _ = i.alternate;
              _ !== null && (_.lanes = st(_.lanes, a)), Qg(i.return, a, e), s.lanes = st(s.lanes, a);
              break;
            }
            f = f.next;
          }
        } else if (i.tag === _e)
          u = i.type === e.type ? null : i.child;
        else if (i.tag === Ht) {
          var U = i.return;
          if (U === null)
            throw new Error("We just came from a parent so we must have had a parent. This is a bug in React.");
          U.lanes = st(U.lanes, a);
          var P = U.alternate;
          P !== null && (P.lanes = st(P.lanes, a)), Qg(U, a, e), u = i.sibling;
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
            var I = u.sibling;
            if (I !== null) {
              I.return = u.return, u = I;
              break;
            }
            u = u.return;
          }
        i = u;
      }
    }
    function jf(e, t) {
      lm = e, Ff = null, Yg = null;
      var a = e.dependencies;
      if (a !== null) {
        var i = a.firstContext;
        i !== null && (ca(a.lanes, t) && Ip(), a.firstContext = null);
      }
    }
    function ur(e) {
      um && E("Context can only be read while React is rendering. In classes, you can read it in the render method or getDerivedStateFromProps. In function components, you can read it directly in the function body, but not inside Hooks like useReducer() or useMemo().");
      var t = e._currentValue;
      if (Yg !== e) {
        var a = {
          context: e,
          memoizedValue: t,
          next: null
        };
        if (Ff === null) {
          if (lm === null)
            throw new Error("Context can only be read while React is rendering. In classes, you can read it in the render method or getDerivedStateFromProps. In function components, you can read it directly in the function body, but not inside Hooks like useReducer() or useMemo().");
          Ff = a, lm.dependencies = {
            lanes: X,
            firstContext: a
          };
        } else
          Ff = Ff.next = a;
      }
      return t;
    }
    var tc = null;
    function Gg(e) {
      tc === null ? tc = [e] : tc.push(e);
    }
    function Wb() {
      if (tc !== null) {
        for (var e = 0; e < tc.length; e++) {
          var t = tc[e], a = t.interleaved;
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
        tc = null;
      }
    }
    function a1(e, t, a, i) {
      var u = t.interleaved;
      return u === null ? (a.next = a, Gg(t)) : (a.next = u.next, u.next = a), t.interleaved = a, sm(e, i);
    }
    function Qb(e, t, a, i) {
      var u = t.interleaved;
      u === null ? (a.next = a, Gg(t)) : (a.next = u.next, u.next = a), t.interleaved = a;
    }
    function Gb(e, t, a, i) {
      var u = t.interleaved;
      return u === null ? (a.next = a, Gg(t)) : (a.next = u.next, u.next = a), t.interleaved = a, sm(e, i);
    }
    function Ja(e, t) {
      return sm(e, t);
    }
    var qb = sm;
    function sm(e, t) {
      e.lanes = st(e.lanes, t);
      var a = e.alternate;
      a !== null && (a.lanes = st(a.lanes, t)), a === null && (e.flags & (dn | Va)) !== Ie && eR(e);
      for (var i = e, u = e.return; u !== null; )
        u.childLanes = st(u.childLanes, t), a = u.alternate, a !== null ? a.childLanes = st(a.childLanes, t) : (u.flags & (dn | Va)) !== Ie && eR(e), i = u, u = u.return;
      if (i.tag === K) {
        var s = i.stateNode;
        return s;
      } else
        return null;
    }
    var i1 = 0, l1 = 1, cm = 2, qg = 3, fm = !1, Kg, dm;
    Kg = !1, dm = null;
    function Xg(e) {
      var t = {
        baseState: e.memoizedState,
        firstBaseUpdate: null,
        lastBaseUpdate: null,
        shared: {
          pending: null,
          interleaved: null,
          lanes: X
        },
        effects: null
      };
      e.updateQueue = t;
    }
    function u1(e, t) {
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
    function ju(e, t) {
      var a = {
        eventTime: e,
        lane: t,
        tag: i1,
        payload: null,
        callback: null,
        next: null
      };
      return a;
    }
    function Qo(e, t, a) {
      var i = e.updateQueue;
      if (i === null)
        return null;
      var u = i.shared;
      if (dm === u && !Kg && (E("An update (setState, replaceState, or forceUpdate) was scheduled from inside an update function. Update functions should be pure, with zero side-effects. Consider using componentDidUpdate or a callback."), Kg = !0), Q_()) {
        var s = u.pending;
        return s === null ? t.next = t : (t.next = s.next, s.next = t), u.pending = t, qb(e, a);
      } else
        return Gb(e, u, t, a);
    }
    function pm(e, t, a) {
      var i = t.updateQueue;
      if (i !== null) {
        var u = i.shared;
        if (Id(a)) {
          var s = u.lanes;
          s = ef(s, e.pendingLanes);
          var f = st(s, a);
          u.lanes = f, Yd(e, f);
        }
      }
    }
    function Zg(e, t) {
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
    function Kb(e, t, a, i, u, s) {
      switch (a.tag) {
        case l1: {
          var f = a.payload;
          if (typeof f == "function") {
            t1();
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
              n1();
            }
            return p;
          }
          return f;
        }
        case qg:
          e.flags = e.flags & ~rr | nt;
        // Intentional fallthrough
        case i1: {
          var v = a.payload, g;
          if (typeof v == "function") {
            t1(), g = v.call(s, i, u);
            {
              if (e.mode & gt) {
                Bn(!0);
                try {
                  v.call(s, i, u);
                } finally {
                  Bn(!1);
                }
              }
              n1();
            }
          } else
            g = v;
          return g == null ? i : mt({}, i, g);
        }
        case cm:
          return fm = !0, i;
      }
      return i;
    }
    function vm(e, t, a, i) {
      var u = e.updateQueue;
      fm = !1, dm = u.shared;
      var s = u.firstBaseUpdate, f = u.lastBaseUpdate, p = u.shared.pending;
      if (p !== null) {
        u.shared.pending = null;
        var v = p, g = v.next;
        v.next = null, f === null ? s = g : f.next = g, f = v;
        var C = e.alternate;
        if (C !== null) {
          var k = C.updateQueue, _ = k.lastBaseUpdate;
          _ !== f && (_ === null ? k.firstBaseUpdate = g : _.next = g, k.lastBaseUpdate = v);
        }
      }
      if (s !== null) {
        var U = u.baseState, P = X, I = null, Se = null, Qe = null, Ve = s;
        do {
          var kt = Ve.lane, Rt = Ve.eventTime;
          if (bu(i, kt)) {
            if (Qe !== null) {
              var Y = {
                eventTime: Rt,
                // This update is going to be committed so we never want uncommit
                // it. Using NoLane works because 0 is a subset of all bitmasks, so
                // this will never be skipped by the check above.
                lane: In,
                tag: Ve.tag,
                payload: Ve.payload,
                callback: Ve.callback,
                next: null
              };
              Qe = Qe.next = Y;
            }
            U = Kb(e, u, Ve, U, t, a);
            var A = Ve.callback;
            if (A !== null && // If the update was already committed, we should not queue its
            // callback again.
            Ve.lane !== In) {
              e.flags |= _i;
              var re = u.effects;
              re === null ? u.effects = [Ve] : re.push(Ve);
            }
          } else {
            var N = {
              eventTime: Rt,
              lane: kt,
              tag: Ve.tag,
              payload: Ve.payload,
              callback: Ve.callback,
              next: null
            };
            Qe === null ? (Se = Qe = N, I = U) : Qe = Qe.next = N, P = st(P, kt);
          }
          if (Ve = Ve.next, Ve === null) {
            if (p = u.shared.pending, p === null)
              break;
            var Te = p, Ee = Te.next;
            Te.next = null, Ve = Ee, u.lastBaseUpdate = Te, u.shared.pending = null;
          }
        } while (!0);
        Qe === null && (I = U), u.baseState = I, u.firstBaseUpdate = Se, u.lastBaseUpdate = Qe;
        var tt = u.shared.interleaved;
        if (tt !== null) {
          var ut = tt;
          do
            P = st(P, ut.lane), ut = ut.next;
          while (ut !== tt);
        } else s === null && (u.shared.lanes = X);
        nv(P), e.lanes = P, e.memoizedState = U;
      }
      dm = null;
    }
    function Xb(e, t) {
      if (typeof e != "function")
        throw new Error("Invalid argument passed as callback. Expected a function. Instead " + ("received: " + e));
      e.call(t);
    }
    function o1() {
      fm = !1;
    }
    function hm() {
      return fm;
    }
    function s1(e, t, a) {
      var i = t.effects;
      if (t.effects = null, i !== null)
        for (var u = 0; u < i.length; u++) {
          var s = i[u], f = s.callback;
          f !== null && (s.callback = null, Xb(f, a));
        }
    }
    var Op = {}, Go = Bo(Op), Mp = Bo(Op), mm = Bo(Op);
    function ym(e) {
      if (e === Op)
        throw new Error("Expected host context to exist. This error is likely caused by a bug in React. Please file an issue.");
      return e;
    }
    function c1() {
      var e = ym(mm.current);
      return e;
    }
    function Jg(e, t) {
      pa(mm, t, e), pa(Mp, e, e), pa(Go, Op, e);
      var a = vw(t);
      da(Go, e), pa(Go, a, e);
    }
    function Pf(e) {
      da(Go, e), da(Mp, e), da(mm, e);
    }
    function eS() {
      var e = ym(Go.current);
      return e;
    }
    function f1(e) {
      ym(mm.current);
      var t = ym(Go.current), a = hw(t, e.type);
      t !== a && (pa(Mp, e, e), pa(Go, a, e));
    }
    function tS(e) {
      Mp.current === e && (da(Go, e), da(Mp, e));
    }
    var Zb = 0, d1 = 1, p1 = 1, Lp = 2, sl = Bo(Zb);
    function nS(e, t) {
      return (e & t) !== 0;
    }
    function Hf(e) {
      return e & d1;
    }
    function rS(e, t) {
      return e & d1 | t;
    }
    function Jb(e, t) {
      return e | t;
    }
    function qo(e, t) {
      pa(sl, t, e);
    }
    function Vf(e) {
      da(sl, e);
    }
    function ex(e, t) {
      var a = e.memoizedState;
      return a !== null ? a.dehydrated !== null : (e.memoizedProps, !0);
    }
    function gm(e) {
      for (var t = e; t !== null; ) {
        if (t.tag === $) {
          var a = t.memoizedState;
          if (a !== null) {
            var i = a.dehydrated;
            if (i === null || OE(i) || Cg(i))
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
    var ei = (
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
    ), aS = [];
    function iS() {
      for (var e = 0; e < aS.length; e++) {
        var t = aS[e];
        t._workInProgressVersionPrimary = null;
      }
      aS.length = 0;
    }
    function tx(e, t) {
      var a = t._getVersion, i = a(t._source);
      e.mutableSourceEagerHydrationData == null ? e.mutableSourceEagerHydrationData = [t, i] : e.mutableSourceEagerHydrationData.push(t, i);
    }
    var Re = R.ReactCurrentDispatcher, Np = R.ReactCurrentBatchConfig, lS, $f;
    lS = /* @__PURE__ */ new Set();
    var nc = X, Jt = null, hr = null, mr = null, Sm = !1, Ap = !1, zp = 0, nx = 0, rx = 25, G = null, Ui = null, Ko = -1, uS = !1;
    function Wt() {
      {
        var e = G;
        Ui === null ? Ui = [e] : Ui.push(e);
      }
    }
    function he() {
      {
        var e = G;
        Ui !== null && (Ko++, Ui[Ko] !== e && ax(e));
      }
    }
    function Bf(e) {
      e != null && !xt(e) && E("%s received a final argument that is not an array (instead, received `%s`). When specified, the final argument must be an array.", G, typeof e);
    }
    function ax(e) {
      {
        var t = at(Jt);
        if (!lS.has(t) && (lS.add(t), Ui !== null)) {
          for (var a = "", i = 30, u = 0; u <= Ko; u++) {
            for (var s = Ui[u], f = u === Ko ? e : s, p = u + 1 + ". " + s; p.length < i; )
              p += " ";
            p += f + `
`, a += p;
          }
          E(`React has detected a change in the order of Hooks called by %s. This will lead to bugs and errors if not fixed. For more information, read the Rules of Hooks: https://reactjs.org/link/rules-of-hooks

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
    function oS(e, t) {
      if (uS)
        return !1;
      if (t === null)
        return E("%s received a final argument during this render, but not during the previous render. Even though the final argument is optional, its type cannot change between renders.", G), !1;
      e.length !== t.length && E(`The final argument passed to %s changed size between renders. The order and size of this array must remain constant.

Previous: %s
Incoming: %s`, G, "[" + t.join(", ") + "]", "[" + e.join(", ") + "]");
      for (var a = 0; a < t.length && a < e.length; a++)
        if (!Oe(e[a], t[a]))
          return !1;
      return !0;
    }
    function If(e, t, a, i, u, s) {
      nc = s, Jt = t, Ui = e !== null ? e._debugHookTypes : null, Ko = -1, uS = e !== null && e.type !== t.type, t.memoizedState = null, t.updateQueue = null, t.lanes = X, e !== null && e.memoizedState !== null ? Re.current = z1 : Ui !== null ? Re.current = A1 : Re.current = N1;
      var f = a(i, u);
      if (Ap) {
        var p = 0;
        do {
          if (Ap = !1, zp = 0, p >= rx)
            throw new Error("Too many re-renders. React limits the number of renders to prevent an infinite loop.");
          p += 1, uS = !1, hr = null, mr = null, t.updateQueue = null, Ko = -1, Re.current = U1, f = a(i, u);
        } while (Ap);
      }
      Re.current = Lm, t._debugHookTypes = Ui;
      var v = hr !== null && hr.next !== null;
      if (nc = X, Jt = null, hr = null, mr = null, G = null, Ui = null, Ko = -1, e !== null && (e.flags & cr) !== (t.flags & cr) && // Disable this warning in legacy mode, because legacy Suspense is weird
      // and creates false positives. To make this work in legacy mode, we'd
      // need to mark fibers that commit in an incomplete state, somehow. For
      // now I'll disable the warning that most of the bugs that would trigger
      // it are either exclusive to concurrent mode or exist in both.
      (e.mode & He) !== Fe && E("Internal React error: Expected static flag was missing. Please notify the React team."), Sm = !1, v)
        throw new Error("Rendered fewer hooks than expected. This may be caused by an accidental early return statement.");
      return f;
    }
    function Yf() {
      var e = zp !== 0;
      return zp = 0, e;
    }
    function v1(e, t, a) {
      t.updateQueue = e.updateQueue, (t.mode & _a) !== Fe ? t.flags &= ~(mu | aa | yn | ft) : t.flags &= ~(yn | ft), e.lanes = Ns(e.lanes, a);
    }
    function h1() {
      if (Re.current = Lm, Sm) {
        for (var e = Jt.memoizedState; e !== null; ) {
          var t = e.queue;
          t !== null && (t.pending = null), e = e.next;
        }
        Sm = !1;
      }
      nc = X, Jt = null, hr = null, mr = null, Ui = null, Ko = -1, G = null, D1 = !1, Ap = !1, zp = 0;
    }
    function Gl() {
      var e = {
        memoizedState: null,
        baseState: null,
        baseQueue: null,
        queue: null,
        next: null
      };
      return mr === null ? Jt.memoizedState = mr = e : mr = mr.next = e, mr;
    }
    function Fi() {
      var e;
      if (hr === null) {
        var t = Jt.alternate;
        t !== null ? e = t.memoizedState : e = null;
      } else
        e = hr.next;
      var a;
      if (mr === null ? a = Jt.memoizedState : a = mr.next, a !== null)
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
        mr === null ? Jt.memoizedState = mr = i : mr = mr.next = i;
      }
      return mr;
    }
    function m1() {
      return {
        lastEffect: null,
        stores: null
      };
    }
    function sS(e, t) {
      return typeof t == "function" ? t(e) : t;
    }
    function cS(e, t, a) {
      var i = Gl(), u;
      a !== void 0 ? u = a(t) : u = t, i.memoizedState = i.baseState = u;
      var s = {
        pending: null,
        interleaved: null,
        lanes: X,
        dispatch: null,
        lastRenderedReducer: e,
        lastRenderedState: u
      };
      i.queue = s;
      var f = s.dispatch = ox.bind(null, Jt, s);
      return [i.memoizedState, f];
    }
    function fS(e, t, a) {
      var i = Fi(), u = i.queue;
      if (u === null)
        throw new Error("Should have a queue. This is likely a bug in React. Please file an issue.");
      u.lastRenderedReducer = e;
      var s = hr, f = s.baseQueue, p = u.pending;
      if (p !== null) {
        if (f !== null) {
          var v = f.next, g = p.next;
          f.next = g, p.next = v;
        }
        s.baseQueue !== f && E("Internal error: Expected work-in-progress queue to be a clone. This is a bug in React."), s.baseQueue = f = p, u.pending = null;
      }
      if (f !== null) {
        var C = f.next, k = s.baseState, _ = null, U = null, P = null, I = C;
        do {
          var Se = I.lane;
          if (bu(nc, Se)) {
            if (P !== null) {
              var Ve = {
                // This update is going to be committed so we never want uncommit
                // it. Using NoLane works because 0 is a subset of all bitmasks, so
                // this will never be skipped by the check above.
                lane: In,
                action: I.action,
                hasEagerState: I.hasEagerState,
                eagerState: I.eagerState,
                next: null
              };
              P = P.next = Ve;
            }
            if (I.hasEagerState)
              k = I.eagerState;
            else {
              var kt = I.action;
              k = e(k, kt);
            }
          } else {
            var Qe = {
              lane: Se,
              action: I.action,
              hasEagerState: I.hasEagerState,
              eagerState: I.eagerState,
              next: null
            };
            P === null ? (U = P = Qe, _ = k) : P = P.next = Qe, Jt.lanes = st(Jt.lanes, Se), nv(Se);
          }
          I = I.next;
        } while (I !== null && I !== C);
        P === null ? _ = k : P.next = U, Oe(k, i.memoizedState) || Ip(), i.memoizedState = k, i.baseState = _, i.baseQueue = P, u.lastRenderedState = k;
      }
      var Rt = u.interleaved;
      if (Rt !== null) {
        var N = Rt;
        do {
          var Y = N.lane;
          Jt.lanes = st(Jt.lanes, Y), nv(Y), N = N.next;
        } while (N !== Rt);
      } else f === null && (u.lanes = X);
      var A = u.dispatch;
      return [i.memoizedState, A];
    }
    function dS(e, t, a) {
      var i = Fi(), u = i.queue;
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
        Oe(p, i.memoizedState) || Ip(), i.memoizedState = p, i.baseQueue === null && (i.baseState = p), u.lastRenderedState = p;
      }
      return [p, s];
    }
    function HO(e, t, a) {
    }
    function VO(e, t, a) {
    }
    function pS(e, t, a) {
      var i = Jt, u = Gl(), s, f = Pr();
      if (f) {
        if (a === void 0)
          throw new Error("Missing getServerSnapshot, which is required for server-rendered content. Will revert to client rendering.");
        s = a(), $f || s !== a() && (E("The result of getServerSnapshot should be cached to avoid an infinite loop"), $f = !0);
      } else {
        if (s = t(), !$f) {
          var p = t();
          Oe(s, p) || (E("The result of getSnapshot should be cached to avoid an infinite loop"), $f = !0);
        }
        var v = Xm();
        if (v === null)
          throw new Error("Expected a work-in-progress root. This is a bug in React. Please file an issue.");
        Ls(v, nc) || y1(i, t, s);
      }
      u.memoizedState = s;
      var g = {
        value: s,
        getSnapshot: t
      };
      return u.queue = g, wm(S1.bind(null, i, g, e), [e]), i.flags |= yn, Up(pr | Hr, g1.bind(null, i, g, s, t), void 0, null), s;
    }
    function Em(e, t, a) {
      var i = Jt, u = Fi(), s = t();
      if (!$f) {
        var f = t();
        Oe(s, f) || (E("The result of getSnapshot should be cached to avoid an infinite loop"), $f = !0);
      }
      var p = u.memoizedState, v = !Oe(p, s);
      v && (u.memoizedState = s, Ip());
      var g = u.queue;
      if (jp(S1.bind(null, i, g, e), [e]), g.getSnapshot !== t || v || // Check if the susbcribe function changed. We can save some memory by
      // checking whether we scheduled a subscription effect above.
      mr !== null && mr.memoizedState.tag & pr) {
        i.flags |= yn, Up(pr | Hr, g1.bind(null, i, g, s, t), void 0, null);
        var C = Xm();
        if (C === null)
          throw new Error("Expected a work-in-progress root. This is a bug in React. Please file an issue.");
        Ls(C, nc) || y1(i, t, s);
      }
      return s;
    }
    function y1(e, t, a) {
      e.flags |= Rs;
      var i = {
        getSnapshot: t,
        value: a
      }, u = Jt.updateQueue;
      if (u === null)
        u = m1(), Jt.updateQueue = u, u.stores = [i];
      else {
        var s = u.stores;
        s === null ? u.stores = [i] : s.push(i);
      }
    }
    function g1(e, t, a, i) {
      t.value = a, t.getSnapshot = i, E1(t) && C1(e);
    }
    function S1(e, t, a) {
      var i = function() {
        E1(t) && C1(e);
      };
      return a(i);
    }
    function E1(e) {
      var t = e.getSnapshot, a = e.value;
      try {
        var i = t();
        return !Oe(a, i);
      } catch {
        return !0;
      }
    }
    function C1(e) {
      var t = Ja(e, Be);
      t !== null && Er(t, e, Be, cn);
    }
    function Cm(e) {
      var t = Gl();
      typeof e == "function" && (e = e()), t.memoizedState = t.baseState = e;
      var a = {
        pending: null,
        interleaved: null,
        lanes: X,
        dispatch: null,
        lastRenderedReducer: sS,
        lastRenderedState: e
      };
      t.queue = a;
      var i = a.dispatch = sx.bind(null, Jt, a);
      return [t.memoizedState, i];
    }
    function vS(e) {
      return fS(sS);
    }
    function hS(e) {
      return dS(sS);
    }
    function Up(e, t, a, i) {
      var u = {
        tag: e,
        create: t,
        destroy: a,
        deps: i,
        // Circular
        next: null
      }, s = Jt.updateQueue;
      if (s === null)
        s = m1(), Jt.updateQueue = s, s.lastEffect = u.next = u;
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
    function mS(e) {
      var t = Gl();
      {
        var a = {
          current: e
        };
        return t.memoizedState = a, a;
      }
    }
    function Rm(e) {
      var t = Fi();
      return t.memoizedState;
    }
    function Fp(e, t, a, i) {
      var u = Gl(), s = i === void 0 ? null : i;
      Jt.flags |= e, u.memoizedState = Up(pr | t, a, void 0, s);
    }
    function Tm(e, t, a, i) {
      var u = Fi(), s = i === void 0 ? null : i, f = void 0;
      if (hr !== null) {
        var p = hr.memoizedState;
        if (f = p.destroy, s !== null) {
          var v = p.deps;
          if (oS(s, v)) {
            u.memoizedState = Up(t, a, f, s);
            return;
          }
        }
      }
      Jt.flags |= e, u.memoizedState = Up(pr | t, a, f, s);
    }
    function wm(e, t) {
      return (Jt.mode & _a) !== Fe ? Fp(mu | yn | zl, Hr, e, t) : Fp(yn | zl, Hr, e, t);
    }
    function jp(e, t) {
      return Tm(yn, Hr, e, t);
    }
    function yS(e, t) {
      return Fp(ft, Ql, e, t);
    }
    function bm(e, t) {
      return Tm(ft, Ql, e, t);
    }
    function gS(e, t) {
      var a = ft;
      return a |= ra, (Jt.mode & _a) !== Fe && (a |= aa), Fp(a, vr, e, t);
    }
    function xm(e, t) {
      return Tm(ft, vr, e, t);
    }
    function R1(e, t) {
      if (typeof t == "function") {
        var a = t, i = e();
        return a(i), function() {
          a(null);
        };
      } else if (t != null) {
        var u = t;
        u.hasOwnProperty("current") || E("Expected useImperativeHandle() first argument to either be a ref callback or React.createRef() object. Instead received: %s.", "an object with keys {" + Object.keys(u).join(", ") + "}");
        var s = e();
        return u.current = s, function() {
          u.current = null;
        };
      }
    }
    function SS(e, t, a) {
      typeof t != "function" && E("Expected useImperativeHandle() second argument to be a function that creates a handle. Instead received: %s.", t !== null ? typeof t : "null");
      var i = a != null ? a.concat([e]) : null, u = ft;
      return u |= ra, (Jt.mode & _a) !== Fe && (u |= aa), Fp(u, vr, R1.bind(null, t, e), i);
    }
    function _m(e, t, a) {
      typeof t != "function" && E("Expected useImperativeHandle() second argument to be a function that creates a handle. Instead received: %s.", t !== null ? typeof t : "null");
      var i = a != null ? a.concat([e]) : null;
      return Tm(ft, vr, R1.bind(null, t, e), i);
    }
    function ix(e, t) {
    }
    var Dm = ix;
    function ES(e, t) {
      var a = Gl(), i = t === void 0 ? null : t;
      return a.memoizedState = [e, i], e;
    }
    function km(e, t) {
      var a = Fi(), i = t === void 0 ? null : t, u = a.memoizedState;
      if (u !== null && i !== null) {
        var s = u[1];
        if (oS(i, s))
          return u[0];
      }
      return a.memoizedState = [e, i], e;
    }
    function CS(e, t) {
      var a = Gl(), i = t === void 0 ? null : t, u = e();
      return a.memoizedState = [u, i], u;
    }
    function Om(e, t) {
      var a = Fi(), i = t === void 0 ? null : t, u = a.memoizedState;
      if (u !== null && i !== null) {
        var s = u[1];
        if (oS(i, s))
          return u[0];
      }
      var f = e();
      return a.memoizedState = [f, i], f;
    }
    function RS(e) {
      var t = Gl();
      return t.memoizedState = e, e;
    }
    function T1(e) {
      var t = Fi(), a = hr, i = a.memoizedState;
      return b1(t, i, e);
    }
    function w1(e) {
      var t = Fi();
      if (hr === null)
        return t.memoizedState = e, e;
      var a = hr.memoizedState;
      return b1(t, a, e);
    }
    function b1(e, t, a) {
      var i = !lh(nc);
      if (i) {
        if (!Oe(a, t)) {
          var u = sh();
          Jt.lanes = st(Jt.lanes, u), nv(u), e.baseState = !0;
        }
        return t;
      } else
        return e.baseState && (e.baseState = !1, Ip()), e.memoizedState = a, a;
    }
    function lx(e, t, a) {
      var i = Qa();
      Mn($y(i, nl)), e(!0);
      var u = Np.transition;
      Np.transition = {};
      var s = Np.transition;
      Np.transition._updatedFibers = /* @__PURE__ */ new Set();
      try {
        e(!1), t();
      } finally {
        if (Mn(i), Np.transition = u, u === null && s._updatedFibers) {
          var f = s._updatedFibers.size;
          f > 10 && B("Detected a large number of updates inside startTransition. If this is due to a subscription please re-write it to use React provided hooks. Otherwise concurrent mode guarantees are off the table."), s._updatedFibers.clear();
        }
      }
    }
    function TS() {
      var e = Cm(!1), t = e[0], a = e[1], i = lx.bind(null, a), u = Gl();
      return u.memoizedState = i, [t, i];
    }
    function x1() {
      var e = vS(), t = e[0], a = Fi(), i = a.memoizedState;
      return [t, i];
    }
    function _1() {
      var e = hS(), t = e[0], a = Fi(), i = a.memoizedState;
      return [t, i];
    }
    var D1 = !1;
    function ux() {
      return D1;
    }
    function wS() {
      var e = Gl(), t = Xm(), a = t.identifierPrefix, i;
      if (Pr()) {
        var u = wb();
        i = ":" + a + "R" + u;
        var s = zp++;
        s > 0 && (i += "H" + s.toString(32)), i += ":";
      } else {
        var f = nx++;
        i = ":" + a + "r" + f.toString(32) + ":";
      }
      return e.memoizedState = i, i;
    }
    function Mm() {
      var e = Fi(), t = e.memoizedState;
      return t;
    }
    function ox(e, t, a) {
      typeof arguments[3] == "function" && E("State updates from the useState() and useReducer() Hooks don't support the second callback argument. To execute a side effect after rendering, declare it in the component body with useEffect().");
      var i = ts(e), u = {
        lane: i,
        action: a,
        hasEagerState: !1,
        eagerState: null,
        next: null
      };
      if (k1(e))
        O1(t, u);
      else {
        var s = a1(e, t, u, i);
        if (s !== null) {
          var f = Ma();
          Er(s, e, i, f), M1(s, t, i);
        }
      }
      L1(e, i);
    }
    function sx(e, t, a) {
      typeof arguments[3] == "function" && E("State updates from the useState() and useReducer() Hooks don't support the second callback argument. To execute a side effect after rendering, declare it in the component body with useEffect().");
      var i = ts(e), u = {
        lane: i,
        action: a,
        hasEagerState: !1,
        eagerState: null,
        next: null
      };
      if (k1(e))
        O1(t, u);
      else {
        var s = e.alternate;
        if (e.lanes === X && (s === null || s.lanes === X)) {
          var f = t.lastRenderedReducer;
          if (f !== null) {
            var p;
            p = Re.current, Re.current = cl;
            try {
              var v = t.lastRenderedState, g = f(v, a);
              if (u.hasEagerState = !0, u.eagerState = g, Oe(g, v)) {
                Qb(e, t, u, i);
                return;
              }
            } catch {
            } finally {
              Re.current = p;
            }
          }
        }
        var C = a1(e, t, u, i);
        if (C !== null) {
          var k = Ma();
          Er(C, e, i, k), M1(C, t, i);
        }
      }
      L1(e, i);
    }
    function k1(e) {
      var t = e.alternate;
      return e === Jt || t !== null && t === Jt;
    }
    function O1(e, t) {
      Ap = Sm = !0;
      var a = e.pending;
      a === null ? t.next = t : (t.next = a.next, a.next = t), e.pending = t;
    }
    function M1(e, t, a) {
      if (Id(a)) {
        var i = t.lanes;
        i = ef(i, e.pendingLanes);
        var u = st(i, a);
        t.lanes = u, Yd(e, u);
      }
    }
    function L1(e, t, a) {
      xs(e, t);
    }
    var Lm = {
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
    }, N1 = null, A1 = null, z1 = null, U1 = null, ql = null, cl = null, Nm = null;
    {
      var bS = function() {
        E("Context can only be read while React is rendering. In classes, you can read it in the render method or getDerivedStateFromProps. In function components, you can read it directly in the function body, but not inside Hooks like useReducer() or useMemo().");
      }, it = function() {
        E("Do not call Hooks inside useEffect(...), useMemo(...), or other built-in Hooks. You can only call Hooks at the top level of your React function. For more information, see https://reactjs.org/link/rules-of-hooks");
      };
      N1 = {
        readContext: function(e) {
          return ur(e);
        },
        useCallback: function(e, t) {
          return G = "useCallback", Wt(), Bf(t), ES(e, t);
        },
        useContext: function(e) {
          return G = "useContext", Wt(), ur(e);
        },
        useEffect: function(e, t) {
          return G = "useEffect", Wt(), Bf(t), wm(e, t);
        },
        useImperativeHandle: function(e, t, a) {
          return G = "useImperativeHandle", Wt(), Bf(a), SS(e, t, a);
        },
        useInsertionEffect: function(e, t) {
          return G = "useInsertionEffect", Wt(), Bf(t), yS(e, t);
        },
        useLayoutEffect: function(e, t) {
          return G = "useLayoutEffect", Wt(), Bf(t), gS(e, t);
        },
        useMemo: function(e, t) {
          G = "useMemo", Wt(), Bf(t);
          var a = Re.current;
          Re.current = ql;
          try {
            return CS(e, t);
          } finally {
            Re.current = a;
          }
        },
        useReducer: function(e, t, a) {
          G = "useReducer", Wt();
          var i = Re.current;
          Re.current = ql;
          try {
            return cS(e, t, a);
          } finally {
            Re.current = i;
          }
        },
        useRef: function(e) {
          return G = "useRef", Wt(), mS(e);
        },
        useState: function(e) {
          G = "useState", Wt();
          var t = Re.current;
          Re.current = ql;
          try {
            return Cm(e);
          } finally {
            Re.current = t;
          }
        },
        useDebugValue: function(e, t) {
          return G = "useDebugValue", Wt(), void 0;
        },
        useDeferredValue: function(e) {
          return G = "useDeferredValue", Wt(), RS(e);
        },
        useTransition: function() {
          return G = "useTransition", Wt(), TS();
        },
        useMutableSource: function(e, t, a) {
          return G = "useMutableSource", Wt(), void 0;
        },
        useSyncExternalStore: function(e, t, a) {
          return G = "useSyncExternalStore", Wt(), pS(e, t, a);
        },
        useId: function() {
          return G = "useId", Wt(), wS();
        },
        unstable_isNewReconciler: ie
      }, A1 = {
        readContext: function(e) {
          return ur(e);
        },
        useCallback: function(e, t) {
          return G = "useCallback", he(), ES(e, t);
        },
        useContext: function(e) {
          return G = "useContext", he(), ur(e);
        },
        useEffect: function(e, t) {
          return G = "useEffect", he(), wm(e, t);
        },
        useImperativeHandle: function(e, t, a) {
          return G = "useImperativeHandle", he(), SS(e, t, a);
        },
        useInsertionEffect: function(e, t) {
          return G = "useInsertionEffect", he(), yS(e, t);
        },
        useLayoutEffect: function(e, t) {
          return G = "useLayoutEffect", he(), gS(e, t);
        },
        useMemo: function(e, t) {
          G = "useMemo", he();
          var a = Re.current;
          Re.current = ql;
          try {
            return CS(e, t);
          } finally {
            Re.current = a;
          }
        },
        useReducer: function(e, t, a) {
          G = "useReducer", he();
          var i = Re.current;
          Re.current = ql;
          try {
            return cS(e, t, a);
          } finally {
            Re.current = i;
          }
        },
        useRef: function(e) {
          return G = "useRef", he(), mS(e);
        },
        useState: function(e) {
          G = "useState", he();
          var t = Re.current;
          Re.current = ql;
          try {
            return Cm(e);
          } finally {
            Re.current = t;
          }
        },
        useDebugValue: function(e, t) {
          return G = "useDebugValue", he(), void 0;
        },
        useDeferredValue: function(e) {
          return G = "useDeferredValue", he(), RS(e);
        },
        useTransition: function() {
          return G = "useTransition", he(), TS();
        },
        useMutableSource: function(e, t, a) {
          return G = "useMutableSource", he(), void 0;
        },
        useSyncExternalStore: function(e, t, a) {
          return G = "useSyncExternalStore", he(), pS(e, t, a);
        },
        useId: function() {
          return G = "useId", he(), wS();
        },
        unstable_isNewReconciler: ie
      }, z1 = {
        readContext: function(e) {
          return ur(e);
        },
        useCallback: function(e, t) {
          return G = "useCallback", he(), km(e, t);
        },
        useContext: function(e) {
          return G = "useContext", he(), ur(e);
        },
        useEffect: function(e, t) {
          return G = "useEffect", he(), jp(e, t);
        },
        useImperativeHandle: function(e, t, a) {
          return G = "useImperativeHandle", he(), _m(e, t, a);
        },
        useInsertionEffect: function(e, t) {
          return G = "useInsertionEffect", he(), bm(e, t);
        },
        useLayoutEffect: function(e, t) {
          return G = "useLayoutEffect", he(), xm(e, t);
        },
        useMemo: function(e, t) {
          G = "useMemo", he();
          var a = Re.current;
          Re.current = cl;
          try {
            return Om(e, t);
          } finally {
            Re.current = a;
          }
        },
        useReducer: function(e, t, a) {
          G = "useReducer", he();
          var i = Re.current;
          Re.current = cl;
          try {
            return fS(e, t, a);
          } finally {
            Re.current = i;
          }
        },
        useRef: function(e) {
          return G = "useRef", he(), Rm();
        },
        useState: function(e) {
          G = "useState", he();
          var t = Re.current;
          Re.current = cl;
          try {
            return vS(e);
          } finally {
            Re.current = t;
          }
        },
        useDebugValue: function(e, t) {
          return G = "useDebugValue", he(), Dm();
        },
        useDeferredValue: function(e) {
          return G = "useDeferredValue", he(), T1(e);
        },
        useTransition: function() {
          return G = "useTransition", he(), x1();
        },
        useMutableSource: function(e, t, a) {
          return G = "useMutableSource", he(), void 0;
        },
        useSyncExternalStore: function(e, t, a) {
          return G = "useSyncExternalStore", he(), Em(e, t);
        },
        useId: function() {
          return G = "useId", he(), Mm();
        },
        unstable_isNewReconciler: ie
      }, U1 = {
        readContext: function(e) {
          return ur(e);
        },
        useCallback: function(e, t) {
          return G = "useCallback", he(), km(e, t);
        },
        useContext: function(e) {
          return G = "useContext", he(), ur(e);
        },
        useEffect: function(e, t) {
          return G = "useEffect", he(), jp(e, t);
        },
        useImperativeHandle: function(e, t, a) {
          return G = "useImperativeHandle", he(), _m(e, t, a);
        },
        useInsertionEffect: function(e, t) {
          return G = "useInsertionEffect", he(), bm(e, t);
        },
        useLayoutEffect: function(e, t) {
          return G = "useLayoutEffect", he(), xm(e, t);
        },
        useMemo: function(e, t) {
          G = "useMemo", he();
          var a = Re.current;
          Re.current = Nm;
          try {
            return Om(e, t);
          } finally {
            Re.current = a;
          }
        },
        useReducer: function(e, t, a) {
          G = "useReducer", he();
          var i = Re.current;
          Re.current = Nm;
          try {
            return dS(e, t, a);
          } finally {
            Re.current = i;
          }
        },
        useRef: function(e) {
          return G = "useRef", he(), Rm();
        },
        useState: function(e) {
          G = "useState", he();
          var t = Re.current;
          Re.current = Nm;
          try {
            return hS(e);
          } finally {
            Re.current = t;
          }
        },
        useDebugValue: function(e, t) {
          return G = "useDebugValue", he(), Dm();
        },
        useDeferredValue: function(e) {
          return G = "useDeferredValue", he(), w1(e);
        },
        useTransition: function() {
          return G = "useTransition", he(), _1();
        },
        useMutableSource: function(e, t, a) {
          return G = "useMutableSource", he(), void 0;
        },
        useSyncExternalStore: function(e, t, a) {
          return G = "useSyncExternalStore", he(), Em(e, t);
        },
        useId: function() {
          return G = "useId", he(), Mm();
        },
        unstable_isNewReconciler: ie
      }, ql = {
        readContext: function(e) {
          return bS(), ur(e);
        },
        useCallback: function(e, t) {
          return G = "useCallback", it(), Wt(), ES(e, t);
        },
        useContext: function(e) {
          return G = "useContext", it(), Wt(), ur(e);
        },
        useEffect: function(e, t) {
          return G = "useEffect", it(), Wt(), wm(e, t);
        },
        useImperativeHandle: function(e, t, a) {
          return G = "useImperativeHandle", it(), Wt(), SS(e, t, a);
        },
        useInsertionEffect: function(e, t) {
          return G = "useInsertionEffect", it(), Wt(), yS(e, t);
        },
        useLayoutEffect: function(e, t) {
          return G = "useLayoutEffect", it(), Wt(), gS(e, t);
        },
        useMemo: function(e, t) {
          G = "useMemo", it(), Wt();
          var a = Re.current;
          Re.current = ql;
          try {
            return CS(e, t);
          } finally {
            Re.current = a;
          }
        },
        useReducer: function(e, t, a) {
          G = "useReducer", it(), Wt();
          var i = Re.current;
          Re.current = ql;
          try {
            return cS(e, t, a);
          } finally {
            Re.current = i;
          }
        },
        useRef: function(e) {
          return G = "useRef", it(), Wt(), mS(e);
        },
        useState: function(e) {
          G = "useState", it(), Wt();
          var t = Re.current;
          Re.current = ql;
          try {
            return Cm(e);
          } finally {
            Re.current = t;
          }
        },
        useDebugValue: function(e, t) {
          return G = "useDebugValue", it(), Wt(), void 0;
        },
        useDeferredValue: function(e) {
          return G = "useDeferredValue", it(), Wt(), RS(e);
        },
        useTransition: function() {
          return G = "useTransition", it(), Wt(), TS();
        },
        useMutableSource: function(e, t, a) {
          return G = "useMutableSource", it(), Wt(), void 0;
        },
        useSyncExternalStore: function(e, t, a) {
          return G = "useSyncExternalStore", it(), Wt(), pS(e, t, a);
        },
        useId: function() {
          return G = "useId", it(), Wt(), wS();
        },
        unstable_isNewReconciler: ie
      }, cl = {
        readContext: function(e) {
          return bS(), ur(e);
        },
        useCallback: function(e, t) {
          return G = "useCallback", it(), he(), km(e, t);
        },
        useContext: function(e) {
          return G = "useContext", it(), he(), ur(e);
        },
        useEffect: function(e, t) {
          return G = "useEffect", it(), he(), jp(e, t);
        },
        useImperativeHandle: function(e, t, a) {
          return G = "useImperativeHandle", it(), he(), _m(e, t, a);
        },
        useInsertionEffect: function(e, t) {
          return G = "useInsertionEffect", it(), he(), bm(e, t);
        },
        useLayoutEffect: function(e, t) {
          return G = "useLayoutEffect", it(), he(), xm(e, t);
        },
        useMemo: function(e, t) {
          G = "useMemo", it(), he();
          var a = Re.current;
          Re.current = cl;
          try {
            return Om(e, t);
          } finally {
            Re.current = a;
          }
        },
        useReducer: function(e, t, a) {
          G = "useReducer", it(), he();
          var i = Re.current;
          Re.current = cl;
          try {
            return fS(e, t, a);
          } finally {
            Re.current = i;
          }
        },
        useRef: function(e) {
          return G = "useRef", it(), he(), Rm();
        },
        useState: function(e) {
          G = "useState", it(), he();
          var t = Re.current;
          Re.current = cl;
          try {
            return vS(e);
          } finally {
            Re.current = t;
          }
        },
        useDebugValue: function(e, t) {
          return G = "useDebugValue", it(), he(), Dm();
        },
        useDeferredValue: function(e) {
          return G = "useDeferredValue", it(), he(), T1(e);
        },
        useTransition: function() {
          return G = "useTransition", it(), he(), x1();
        },
        useMutableSource: function(e, t, a) {
          return G = "useMutableSource", it(), he(), void 0;
        },
        useSyncExternalStore: function(e, t, a) {
          return G = "useSyncExternalStore", it(), he(), Em(e, t);
        },
        useId: function() {
          return G = "useId", it(), he(), Mm();
        },
        unstable_isNewReconciler: ie
      }, Nm = {
        readContext: function(e) {
          return bS(), ur(e);
        },
        useCallback: function(e, t) {
          return G = "useCallback", it(), he(), km(e, t);
        },
        useContext: function(e) {
          return G = "useContext", it(), he(), ur(e);
        },
        useEffect: function(e, t) {
          return G = "useEffect", it(), he(), jp(e, t);
        },
        useImperativeHandle: function(e, t, a) {
          return G = "useImperativeHandle", it(), he(), _m(e, t, a);
        },
        useInsertionEffect: function(e, t) {
          return G = "useInsertionEffect", it(), he(), bm(e, t);
        },
        useLayoutEffect: function(e, t) {
          return G = "useLayoutEffect", it(), he(), xm(e, t);
        },
        useMemo: function(e, t) {
          G = "useMemo", it(), he();
          var a = Re.current;
          Re.current = cl;
          try {
            return Om(e, t);
          } finally {
            Re.current = a;
          }
        },
        useReducer: function(e, t, a) {
          G = "useReducer", it(), he();
          var i = Re.current;
          Re.current = cl;
          try {
            return dS(e, t, a);
          } finally {
            Re.current = i;
          }
        },
        useRef: function(e) {
          return G = "useRef", it(), he(), Rm();
        },
        useState: function(e) {
          G = "useState", it(), he();
          var t = Re.current;
          Re.current = cl;
          try {
            return hS(e);
          } finally {
            Re.current = t;
          }
        },
        useDebugValue: function(e, t) {
          return G = "useDebugValue", it(), he(), Dm();
        },
        useDeferredValue: function(e) {
          return G = "useDeferredValue", it(), he(), w1(e);
        },
        useTransition: function() {
          return G = "useTransition", it(), he(), _1();
        },
        useMutableSource: function(e, t, a) {
          return G = "useMutableSource", it(), he(), void 0;
        },
        useSyncExternalStore: function(e, t, a) {
          return G = "useSyncExternalStore", it(), he(), Em(e, t);
        },
        useId: function() {
          return G = "useId", it(), he(), Mm();
        },
        unstable_isNewReconciler: ie
      };
    }
    var Xo = S.unstable_now, F1 = 0, Am = -1, Pp = -1, zm = -1, xS = !1, Um = !1;
    function j1() {
      return xS;
    }
    function cx() {
      Um = !0;
    }
    function fx() {
      xS = !1, Um = !1;
    }
    function dx() {
      xS = Um, Um = !1;
    }
    function P1() {
      return F1;
    }
    function H1() {
      F1 = Xo();
    }
    function _S(e) {
      Pp = Xo(), e.actualStartTime < 0 && (e.actualStartTime = Xo());
    }
    function V1(e) {
      Pp = -1;
    }
    function Fm(e, t) {
      if (Pp >= 0) {
        var a = Xo() - Pp;
        e.actualDuration += a, t && (e.selfBaseDuration = a), Pp = -1;
      }
    }
    function Kl(e) {
      if (Am >= 0) {
        var t = Xo() - Am;
        Am = -1;
        for (var a = e.return; a !== null; ) {
          switch (a.tag) {
            case K:
              var i = a.stateNode;
              i.effectDuration += t;
              return;
            case Ne:
              var u = a.stateNode;
              u.effectDuration += t;
              return;
          }
          a = a.return;
        }
      }
    }
    function DS(e) {
      if (zm >= 0) {
        var t = Xo() - zm;
        zm = -1;
        for (var a = e.return; a !== null; ) {
          switch (a.tag) {
            case K:
              var i = a.stateNode;
              i !== null && (i.passiveEffectDuration += t);
              return;
            case Ne:
              var u = a.stateNode;
              u !== null && (u.passiveEffectDuration += t);
              return;
          }
          a = a.return;
        }
      }
    }
    function Xl() {
      Am = Xo();
    }
    function kS() {
      zm = Xo();
    }
    function OS(e) {
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
    var MS = {}, LS, NS, AS, zS, US, $1, jm, FS, jS, PS, Hp;
    {
      LS = /* @__PURE__ */ new Set(), NS = /* @__PURE__ */ new Set(), AS = /* @__PURE__ */ new Set(), zS = /* @__PURE__ */ new Set(), FS = /* @__PURE__ */ new Set(), US = /* @__PURE__ */ new Set(), jS = /* @__PURE__ */ new Set(), PS = /* @__PURE__ */ new Set(), Hp = /* @__PURE__ */ new Set();
      var B1 = /* @__PURE__ */ new Set();
      jm = function(e, t) {
        if (!(e === null || typeof e == "function")) {
          var a = t + "_" + e;
          B1.has(a) || (B1.add(a), E("%s(...): Expected the last optional `callback` argument to be a function. Instead received: %s.", t, e));
        }
      }, $1 = function(e, t) {
        if (t === void 0) {
          var a = bt(e) || "Component";
          US.has(a) || (US.add(a), E("%s.getDerivedStateFromProps(): A valid state object (or null) must be returned. You have returned undefined.", a));
        }
      }, Object.defineProperty(MS, "_processChildContext", {
        enumerable: !1,
        value: function() {
          throw new Error("_processChildContext is not available in React 16+. This likely means you have multiple copies of React and are attempting to nest a React 15 tree inside a React 16 tree using unstable_renderSubtreeIntoContainer, which isn't supported. Try to make sure you have only one copy of React (and ideally, switch to ReactDOM.createPortal).");
        }
      }), Object.freeze(MS);
    }
    function HS(e, t, a, i) {
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
        $1(t, s);
      }
      var f = s == null ? u : mt({}, u, s);
      if (e.memoizedState = f, e.lanes === X) {
        var p = e.updateQueue;
        p.baseState = f;
      }
    }
    var VS = {
      isMounted: ba,
      enqueueSetState: function(e, t, a) {
        var i = Pa(e), u = Ma(), s = ts(i), f = ju(u, s);
        f.payload = t, a != null && (jm(a, "setState"), f.callback = a);
        var p = Qo(i, f, s);
        p !== null && (Er(p, i, s, u), pm(p, i, s)), xs(i, s);
      },
      enqueueReplaceState: function(e, t, a) {
        var i = Pa(e), u = Ma(), s = ts(i), f = ju(u, s);
        f.tag = l1, f.payload = t, a != null && (jm(a, "replaceState"), f.callback = a);
        var p = Qo(i, f, s);
        p !== null && (Er(p, i, s, u), pm(p, i, s)), xs(i, s);
      },
      enqueueForceUpdate: function(e, t) {
        var a = Pa(e), i = Ma(), u = ts(a), s = ju(i, u);
        s.tag = cm, t != null && (jm(t, "forceUpdate"), s.callback = t);
        var f = Qo(a, s, u);
        f !== null && (Er(f, a, u, i), pm(f, a, u)), Fc(a, u);
      }
    };
    function I1(e, t, a, i, u, s, f) {
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
          v === void 0 && E("%s.shouldComponentUpdate(): Returned undefined instead of a boolean value. Make sure to return true or false.", bt(t) || "Component");
        }
        return v;
      }
      return t.prototype && t.prototype.isPureReactComponent ? !et(a, i) || !et(u, s) : !0;
    }
    function px(e, t, a) {
      var i = e.stateNode;
      {
        var u = bt(t) || "Component", s = i.render;
        s || (t.prototype && typeof t.prototype.render == "function" ? E("%s(...): No `render` method found on the returned component instance: did you accidentally return an object from the constructor?", u) : E("%s(...): No `render` method found on the returned component instance: you may have forgotten to define `render`.", u)), i.getInitialState && !i.getInitialState.isReactClassApproved && !i.state && E("getInitialState was defined on %s, a plain JavaScript class. This is only supported for classes created using React.createClass. Did you mean to define a state property instead?", u), i.getDefaultProps && !i.getDefaultProps.isReactClassApproved && E("getDefaultProps was defined on %s, a plain JavaScript class. This is only supported for classes created using React.createClass. Use a static property to define defaultProps instead.", u), i.propTypes && E("propTypes was defined as an instance property on %s. Use a static property to define propTypes instead.", u), i.contextType && E("contextType was defined as an instance property on %s. Use a static property to define contextType instead.", u), t.childContextTypes && !Hp.has(t) && // Strict Mode has its own warning for legacy context, so we can skip
        // this one.
        (e.mode & gt) === Fe && (Hp.add(t), E(`%s uses the legacy childContextTypes API which is no longer supported and will be removed in the next major release. Use React.createContext() instead

.Learn more about this warning here: https://reactjs.org/link/legacy-context`, u)), t.contextTypes && !Hp.has(t) && // Strict Mode has its own warning for legacy context, so we can skip
        // this one.
        (e.mode & gt) === Fe && (Hp.add(t), E(`%s uses the legacy contextTypes API which is no longer supported and will be removed in the next major release. Use React.createContext() with static contextType instead.

Learn more about this warning here: https://reactjs.org/link/legacy-context`, u)), i.contextTypes && E("contextTypes was defined as an instance property on %s. Use a static property to define contextTypes instead.", u), t.contextType && t.contextTypes && !jS.has(t) && (jS.add(t), E("%s declares both contextTypes and contextType static properties. The legacy contextTypes property will be ignored.", u)), typeof i.componentShouldUpdate == "function" && E("%s has a method called componentShouldUpdate(). Did you mean shouldComponentUpdate()? The name is phrased as a question because the function is expected to return a value.", u), t.prototype && t.prototype.isPureReactComponent && typeof i.shouldComponentUpdate < "u" && E("%s has a method called shouldComponentUpdate(). shouldComponentUpdate should not be used when extending React.PureComponent. Please extend React.Component if shouldComponentUpdate is used.", bt(t) || "A pure component"), typeof i.componentDidUnmount == "function" && E("%s has a method called componentDidUnmount(). But there is no such lifecycle method. Did you mean componentWillUnmount()?", u), typeof i.componentDidReceiveProps == "function" && E("%s has a method called componentDidReceiveProps(). But there is no such lifecycle method. If you meant to update the state in response to changing props, use componentWillReceiveProps(). If you meant to fetch data or run side-effects or mutations after React has updated the UI, use componentDidUpdate().", u), typeof i.componentWillRecieveProps == "function" && E("%s has a method called componentWillRecieveProps(). Did you mean componentWillReceiveProps()?", u), typeof i.UNSAFE_componentWillRecieveProps == "function" && E("%s has a method called UNSAFE_componentWillRecieveProps(). Did you mean UNSAFE_componentWillReceiveProps()?", u);
        var f = i.props !== a;
        i.props !== void 0 && f && E("%s(...): When calling super() in `%s`, make sure to pass up the same props that your component's constructor was passed.", u, u), i.defaultProps && E("Setting defaultProps as an instance property on %s is not supported and will be ignored. Instead, define defaultProps as a static property on %s.", u, u), typeof i.getSnapshotBeforeUpdate == "function" && typeof i.componentDidUpdate != "function" && !AS.has(t) && (AS.add(t), E("%s: getSnapshotBeforeUpdate() should be used with componentDidUpdate(). This component defines getSnapshotBeforeUpdate() only.", bt(t))), typeof i.getDerivedStateFromProps == "function" && E("%s: getDerivedStateFromProps() is defined as an instance method and will be ignored. Instead, declare it as a static method.", u), typeof i.getDerivedStateFromError == "function" && E("%s: getDerivedStateFromError() is defined as an instance method and will be ignored. Instead, declare it as a static method.", u), typeof t.getSnapshotBeforeUpdate == "function" && E("%s: getSnapshotBeforeUpdate() is defined as a static method and will be ignored. Instead, declare it as an instance method.", u);
        var p = i.state;
        p && (typeof p != "object" || xt(p)) && E("%s.state: must be set to an object or null", u), typeof i.getChildContext == "function" && typeof t.childContextTypes != "object" && E("%s.getChildContext(): childContextTypes must be defined in order to use getChildContext().", u);
      }
    }
    function Y1(e, t) {
      t.updater = VS, e.stateNode = t, so(t, e), t._reactInternalInstance = MS;
    }
    function W1(e, t, a) {
      var i = !1, u = hi, s = hi, f = t.contextType;
      if ("contextType" in t) {
        var p = (
          // Allow null for conditional declaration
          f === null || f !== void 0 && f.$$typeof === J && f._context === void 0
        );
        if (!p && !PS.has(t)) {
          PS.add(t);
          var v = "";
          f === void 0 ? v = " However, it is set to undefined. This can be caused by a typo or by mixing up named and default imports. This can also happen due to a circular dependency, so try moving the createContext() call to a separate file." : typeof f != "object" ? v = " However, it is set to a " + typeof f + "." : f.$$typeof === b ? v = " Did you accidentally pass the Context.Provider instead?" : f._context !== void 0 ? v = " Did you accidentally pass the Context.Consumer instead?" : v = " However, it is set to an object with keys {" + Object.keys(f).join(", ") + "}.", E("%s defines an invalid contextType. contextType should point to the Context object returned by React.createContext().%s", bt(t) || "Component", v);
        }
      }
      if (typeof f == "object" && f !== null)
        s = ur(f);
      else {
        u = Mf(e, t, !0);
        var g = t.contextTypes;
        i = g != null, s = i ? Lf(e, u) : hi;
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
      var k = e.memoizedState = C.state !== null && C.state !== void 0 ? C.state : null;
      Y1(e, C);
      {
        if (typeof t.getDerivedStateFromProps == "function" && k === null) {
          var _ = bt(t) || "Component";
          NS.has(_) || (NS.add(_), E("`%s` uses `getDerivedStateFromProps` but its initial state is %s. This is not recommended. Instead, define the initial state by assigning an object to `this.state` in the constructor of `%s`. This ensures that `getDerivedStateFromProps` arguments have a consistent shape.", _, C.state === null ? "null" : "undefined", _));
        }
        if (typeof t.getDerivedStateFromProps == "function" || typeof C.getSnapshotBeforeUpdate == "function") {
          var U = null, P = null, I = null;
          if (typeof C.componentWillMount == "function" && C.componentWillMount.__suppressDeprecationWarning !== !0 ? U = "componentWillMount" : typeof C.UNSAFE_componentWillMount == "function" && (U = "UNSAFE_componentWillMount"), typeof C.componentWillReceiveProps == "function" && C.componentWillReceiveProps.__suppressDeprecationWarning !== !0 ? P = "componentWillReceiveProps" : typeof C.UNSAFE_componentWillReceiveProps == "function" && (P = "UNSAFE_componentWillReceiveProps"), typeof C.componentWillUpdate == "function" && C.componentWillUpdate.__suppressDeprecationWarning !== !0 ? I = "componentWillUpdate" : typeof C.UNSAFE_componentWillUpdate == "function" && (I = "UNSAFE_componentWillUpdate"), U !== null || P !== null || I !== null) {
            var Se = bt(t) || "Component", Qe = typeof t.getDerivedStateFromProps == "function" ? "getDerivedStateFromProps()" : "getSnapshotBeforeUpdate()";
            zS.has(Se) || (zS.add(Se), E(`Unsafe legacy lifecycles will not be called for components using new component APIs.

%s uses %s but also contains the following legacy lifecycles:%s%s%s

The above lifecycles should be removed. Learn more about this warning here:
https://reactjs.org/link/unsafe-component-lifecycles`, Se, Qe, U !== null ? `
  ` + U : "", P !== null ? `
  ` + P : "", I !== null ? `
  ` + I : ""));
          }
        }
      }
      return i && zE(e, u, s), C;
    }
    function vx(e, t) {
      var a = t.state;
      typeof t.componentWillMount == "function" && t.componentWillMount(), typeof t.UNSAFE_componentWillMount == "function" && t.UNSAFE_componentWillMount(), a !== t.state && (E("%s.componentWillMount(): Assigning directly to this.state is deprecated (except inside a component's constructor). Use setState instead.", at(e) || "Component"), VS.enqueueReplaceState(t, t.state, null));
    }
    function Q1(e, t, a, i) {
      var u = t.state;
      if (typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(a, i), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(a, i), t.state !== u) {
        {
          var s = at(e) || "Component";
          LS.has(s) || (LS.add(s), E("%s.componentWillReceiveProps(): Assigning directly to this.state is deprecated (except inside a component's constructor). Use setState instead.", s));
        }
        VS.enqueueReplaceState(t, t.state, null);
      }
    }
    function $S(e, t, a, i) {
      px(e, t, a);
      var u = e.stateNode;
      u.props = a, u.state = e.memoizedState, u.refs = {}, Xg(e);
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
          FS.has(p) || (FS.add(p), E("%s: It is not recommended to assign props directly to state because updates to props won't be reflected in state. In most cases, it is better to use props directly.", p));
        }
        e.mode & gt && ol.recordLegacyContextWarning(e, u), ol.recordUnsafeLifecycleWarnings(e, u);
      }
      u.state = e.memoizedState;
      var v = t.getDerivedStateFromProps;
      if (typeof v == "function" && (HS(e, t, v, a), u.state = e.memoizedState), typeof t.getDerivedStateFromProps != "function" && typeof u.getSnapshotBeforeUpdate != "function" && (typeof u.UNSAFE_componentWillMount == "function" || typeof u.componentWillMount == "function") && (vx(e, u), vm(e, a, u, i), u.state = e.memoizedState), typeof u.componentDidMount == "function") {
        var g = ft;
        g |= ra, (e.mode & _a) !== Fe && (g |= aa), e.flags |= g;
      }
    }
    function hx(e, t, a, i) {
      var u = e.stateNode, s = e.memoizedProps;
      u.props = s;
      var f = u.context, p = t.contextType, v = hi;
      if (typeof p == "object" && p !== null)
        v = ur(p);
      else {
        var g = Mf(e, t, !0);
        v = Lf(e, g);
      }
      var C = t.getDerivedStateFromProps, k = typeof C == "function" || typeof u.getSnapshotBeforeUpdate == "function";
      !k && (typeof u.UNSAFE_componentWillReceiveProps == "function" || typeof u.componentWillReceiveProps == "function") && (s !== a || f !== v) && Q1(e, u, a, v), o1();
      var _ = e.memoizedState, U = u.state = _;
      if (vm(e, a, u, i), U = e.memoizedState, s === a && _ === U && !qh() && !hm()) {
        if (typeof u.componentDidMount == "function") {
          var P = ft;
          P |= ra, (e.mode & _a) !== Fe && (P |= aa), e.flags |= P;
        }
        return !1;
      }
      typeof C == "function" && (HS(e, t, C, a), U = e.memoizedState);
      var I = hm() || I1(e, t, s, a, _, U, v);
      if (I) {
        if (!k && (typeof u.UNSAFE_componentWillMount == "function" || typeof u.componentWillMount == "function") && (typeof u.componentWillMount == "function" && u.componentWillMount(), typeof u.UNSAFE_componentWillMount == "function" && u.UNSAFE_componentWillMount()), typeof u.componentDidMount == "function") {
          var Se = ft;
          Se |= ra, (e.mode & _a) !== Fe && (Se |= aa), e.flags |= Se;
        }
      } else {
        if (typeof u.componentDidMount == "function") {
          var Qe = ft;
          Qe |= ra, (e.mode & _a) !== Fe && (Qe |= aa), e.flags |= Qe;
        }
        e.memoizedProps = a, e.memoizedState = U;
      }
      return u.props = a, u.state = U, u.context = v, I;
    }
    function mx(e, t, a, i, u) {
      var s = t.stateNode;
      u1(e, t);
      var f = t.memoizedProps, p = t.type === t.elementType ? f : fl(t.type, f);
      s.props = p;
      var v = t.pendingProps, g = s.context, C = a.contextType, k = hi;
      if (typeof C == "object" && C !== null)
        k = ur(C);
      else {
        var _ = Mf(t, a, !0);
        k = Lf(t, _);
      }
      var U = a.getDerivedStateFromProps, P = typeof U == "function" || typeof s.getSnapshotBeforeUpdate == "function";
      !P && (typeof s.UNSAFE_componentWillReceiveProps == "function" || typeof s.componentWillReceiveProps == "function") && (f !== v || g !== k) && Q1(t, s, i, k), o1();
      var I = t.memoizedState, Se = s.state = I;
      if (vm(t, i, s, u), Se = t.memoizedState, f === v && I === Se && !qh() && !hm() && !Ue)
        return typeof s.componentDidUpdate == "function" && (f !== e.memoizedProps || I !== e.memoizedState) && (t.flags |= ft), typeof s.getSnapshotBeforeUpdate == "function" && (f !== e.memoizedProps || I !== e.memoizedState) && (t.flags |= Ha), !1;
      typeof U == "function" && (HS(t, a, U, i), Se = t.memoizedState);
      var Qe = hm() || I1(t, a, p, i, I, Se, k) || // TODO: In some cases, we'll end up checking if context has changed twice,
      // both before and after `shouldComponentUpdate` has been called. Not ideal,
      // but I'm loath to refactor this function. This only happens for memoized
      // components so it's not that common.
      Ue;
      return Qe ? (!P && (typeof s.UNSAFE_componentWillUpdate == "function" || typeof s.componentWillUpdate == "function") && (typeof s.componentWillUpdate == "function" && s.componentWillUpdate(i, Se, k), typeof s.UNSAFE_componentWillUpdate == "function" && s.UNSAFE_componentWillUpdate(i, Se, k)), typeof s.componentDidUpdate == "function" && (t.flags |= ft), typeof s.getSnapshotBeforeUpdate == "function" && (t.flags |= Ha)) : (typeof s.componentDidUpdate == "function" && (f !== e.memoizedProps || I !== e.memoizedState) && (t.flags |= ft), typeof s.getSnapshotBeforeUpdate == "function" && (f !== e.memoizedProps || I !== e.memoizedState) && (t.flags |= Ha), t.memoizedProps = i, t.memoizedState = Se), s.props = i, s.state = Se, s.context = k, Qe;
    }
    function rc(e, t) {
      return {
        value: e,
        source: t,
        stack: Ku(t),
        digest: null
      };
    }
    function BS(e, t, a) {
      return {
        value: e,
        source: null,
        stack: a ?? null,
        digest: t ?? null
      };
    }
    function yx(e, t) {
      return !0;
    }
    function IS(e, t) {
      try {
        var a = yx(e, t);
        if (a === !1)
          return;
        var i = t.value, u = t.source, s = t.stack, f = s !== null ? s : "";
        if (i != null && i._suppressLogging) {
          if (e.tag === q)
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
        var k = v + `
` + f + `

` + ("" + g);
        console.error(k);
      } catch (_) {
        setTimeout(function() {
          throw _;
        });
      }
    }
    var gx = typeof WeakMap == "function" ? WeakMap : Map;
    function G1(e, t, a) {
      var i = ju(cn, a);
      i.tag = qg, i.payload = {
        element: null
      };
      var u = t.value;
      return i.callback = function() {
        cD(u), IS(e, t);
      }, i;
    }
    function YS(e, t, a) {
      var i = ju(cn, a);
      i.tag = qg;
      var u = e.type.getDerivedStateFromError;
      if (typeof u == "function") {
        var s = t.value;
        i.payload = function() {
          return u(s);
        }, i.callback = function() {
          iR(e), IS(e, t);
        };
      }
      var f = e.stateNode;
      return f !== null && typeof f.componentDidCatch == "function" && (i.callback = function() {
        iR(e), IS(e, t), typeof u != "function" && oD(this);
        var v = t.value, g = t.stack;
        this.componentDidCatch(v, {
          componentStack: g !== null ? g : ""
        }), typeof u != "function" && (ca(e.lanes, Be) || E("%s: Error boundaries should implement getDerivedStateFromError(). In that method, return a state update to display an error message or fallback UI.", at(e) || "Unknown"));
      }), i;
    }
    function q1(e, t, a) {
      var i = e.pingCache, u;
      if (i === null ? (i = e.pingCache = new gx(), u = /* @__PURE__ */ new Set(), i.set(t, u)) : (u = i.get(t), u === void 0 && (u = /* @__PURE__ */ new Set(), i.set(t, u))), !u.has(a)) {
        u.add(a);
        var s = fD.bind(null, e, t, a);
        xa && rv(e, a), t.then(s, s);
      }
    }
    function Sx(e, t, a, i) {
      var u = e.updateQueue;
      if (u === null) {
        var s = /* @__PURE__ */ new Set();
        s.add(a), e.updateQueue = s;
      } else
        u.add(a);
    }
    function Ex(e, t) {
      var a = e.tag;
      if ((e.mode & He) === Fe && (a === W || a === ge || a === de)) {
        var i = e.alternate;
        i ? (e.updateQueue = i.updateQueue, e.memoizedState = i.memoizedState, e.lanes = i.lanes) : (e.updateQueue = null, e.memoizedState = null);
      }
    }
    function K1(e) {
      var t = e;
      do {
        if (t.tag === $ && ex(t))
          return t;
        t = t.return;
      } while (t !== null);
      return null;
    }
    function X1(e, t, a, i, u) {
      if ((e.mode & He) === Fe) {
        if (e === t)
          e.flags |= rr;
        else {
          if (e.flags |= nt, a.flags |= Ts, a.flags &= ~(bc | Ta), a.tag === q) {
            var s = a.alternate;
            if (s === null)
              a.tag = En;
            else {
              var f = ju(cn, Be);
              f.tag = cm, Qo(a, f, Be);
            }
          }
          a.lanes = st(a.lanes, Be);
        }
        return e;
      }
      return e.flags |= rr, e.lanes = u, e;
    }
    function Cx(e, t, a, i, u) {
      if (a.flags |= Ta, xa && rv(e, u), i !== null && typeof i == "object" && typeof i.then == "function") {
        var s = i;
        Ex(a), Pr() && a.mode & He && $E();
        var f = K1(t);
        if (f !== null) {
          f.flags &= ~On, X1(f, t, a, e, u), f.mode & He && q1(e, s, u), Sx(f, e, s);
          return;
        } else {
          if (!Bd(u)) {
            q1(e, s, u), w0();
            return;
          }
          var p = new Error("A component suspended while responding to synchronous input. This will cause the UI to be replaced with a loading indicator. To fix, updates that suspend should be wrapped with startTransition.");
          i = p;
        }
      } else if (Pr() && a.mode & He) {
        $E();
        var v = K1(t);
        if (v !== null) {
          (v.flags & rr) === Ie && (v.flags |= On), X1(v, t, a, e, u), Fg(rc(i, a));
          return;
        }
      }
      i = rc(i, a), eD(i);
      var g = t;
      do {
        switch (g.tag) {
          case K: {
            var C = i;
            g.flags |= rr;
            var k = wo(u);
            g.lanes = st(g.lanes, k);
            var _ = G1(g, C, k);
            Zg(g, _);
            return;
          }
          case q:
            var U = i, P = g.type, I = g.stateNode;
            if ((g.flags & nt) === Ie && (typeof P.getDerivedStateFromError == "function" || I !== null && typeof I.componentDidCatch == "function" && !KC(I))) {
              g.flags |= rr;
              var Se = wo(u);
              g.lanes = st(g.lanes, Se);
              var Qe = YS(g, U, Se);
              Zg(g, Qe);
              return;
            }
            break;
        }
        g = g.return;
      } while (g !== null);
    }
    function Rx() {
      return null;
    }
    var Vp = R.ReactCurrentOwner, dl = !1, WS, $p, QS, GS, qS, ac, KS, Pm, Bp;
    WS = {}, $p = {}, QS = {}, GS = {}, qS = {}, ac = !1, KS = {}, Pm = {}, Bp = {};
    function ka(e, t, a, i) {
      e === null ? t.child = e1(t, null, a, i) : t.child = Uf(t, e.child, a, i);
    }
    function Tx(e, t, a, i) {
      t.child = Uf(t, e.child, null, i), t.child = Uf(t, null, a, i);
    }
    function Z1(e, t, a, i, u) {
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
      jf(t, u), vo(t);
      {
        if (Vp.current = t, ea(!0), v = If(e, t, f, i, p, u), g = Yf(), t.mode & gt) {
          Bn(!0);
          try {
            v = If(e, t, f, i, p, u), g = Yf();
          } finally {
            Bn(!1);
          }
        }
        ea(!1);
      }
      return ua(), e !== null && !dl ? (v1(e, t, u), Pu(e, t, u)) : (Pr() && g && Mg(t), t.flags |= Nl, ka(e, t, v, u), t.child);
    }
    function J1(e, t, a, i, u) {
      if (e === null) {
        var s = a.type;
        if (DD(s) && a.compare === null && // SimpleMemoComponent codepath doesn't resolve outer props either.
        a.defaultProps === void 0) {
          var f = s;
          return f = Jf(s), t.tag = de, t.type = f, JS(t, s), eC(e, t, f, i, u);
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
            Bp[v] || (E("%s: Support for defaultProps will be removed from memo components in a future major release. Use JavaScript default parameters instead.", v), Bp[v] = !0);
          }
        }
        var g = z0(a.type, null, i, t, t.mode, u);
        return g.ref = t.ref, g.return = t, t.child = g, g;
      }
      {
        var C = a.type, k = C.propTypes;
        k && ll(
          k,
          i,
          // Resolved props
          "prop",
          bt(C)
        );
      }
      var _ = e.child, U = i0(e, u);
      if (!U) {
        var P = _.memoizedProps, I = a.compare;
        if (I = I !== null ? I : et, I(P, i) && e.ref === t.ref)
          return Pu(e, t, u);
      }
      t.flags |= Nl;
      var Se = sc(_, i);
      return Se.ref = t.ref, Se.return = t, t.child = Se, Se;
    }
    function eC(e, t, a, i, u) {
      if (t.type !== t.elementType) {
        var s = t.elementType;
        if (s.$$typeof === Ke) {
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
        if (et(C, i) && e.ref === t.ref && // Prevent bailout if the implementation changed due to hot reload.
        t.type === e.type)
          if (dl = !1, t.pendingProps = i = C, i0(e, u))
            (e.flags & Ts) !== Ie && (dl = !0);
          else return t.lanes = e.lanes, Pu(e, t, u);
      }
      return XS(e, t, a, i, u);
    }
    function tC(e, t, a) {
      var i = t.pendingProps, u = i.children, s = e !== null ? e.memoizedState : null;
      if (i.mode === "hidden" || pe)
        if ((t.mode & He) === Fe) {
          var f = {
            baseLanes: X,
            cachePool: null,
            transitions: null
          };
          t.memoizedState = f, Zm(t, a);
        } else if (ca(a, _r)) {
          var k = {
            baseLanes: X,
            cachePool: null,
            transitions: null
          };
          t.memoizedState = k;
          var _ = s !== null ? s.baseLanes : a;
          Zm(t, _);
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
          return t.memoizedState = C, t.updateQueue = null, Zm(t, v), null;
        }
      else {
        var U;
        s !== null ? (U = st(s.baseLanes, a), t.memoizedState = null) : U = a, Zm(t, U);
      }
      return ka(e, t, u, a), t.child;
    }
    function wx(e, t, a) {
      var i = t.pendingProps;
      return ka(e, t, i, a), t.child;
    }
    function bx(e, t, a) {
      var i = t.pendingProps.children;
      return ka(e, t, i, a), t.child;
    }
    function xx(e, t, a) {
      {
        t.flags |= ft;
        {
          var i = t.stateNode;
          i.effectDuration = 0, i.passiveEffectDuration = 0;
        }
      }
      var u = t.pendingProps, s = u.children;
      return ka(e, t, s, a), t.child;
    }
    function nC(e, t) {
      var a = t.ref;
      (e === null && a !== null || e !== null && e.ref !== a) && (t.flags |= na, t.flags |= Od);
    }
    function XS(e, t, a, i, u) {
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
      jf(t, u), vo(t);
      {
        if (Vp.current = t, ea(!0), v = If(e, t, a, i, f, u), g = Yf(), t.mode & gt) {
          Bn(!0);
          try {
            v = If(e, t, a, i, f, u), g = Yf();
          } finally {
            Bn(!1);
          }
        }
        ea(!1);
      }
      return ua(), e !== null && !dl ? (v1(e, t, u), Pu(e, t, u)) : (Pr() && g && Mg(t), t.flags |= Nl, ka(e, t, v, u), t.child);
    }
    function rC(e, t, a, i, u) {
      {
        switch (BD(t)) {
          case !1: {
            var s = t.stateNode, f = t.type, p = new f(t.memoizedProps, s.context), v = p.state;
            s.updater.enqueueSetState(s, v, null);
            break;
          }
          case !0: {
            t.flags |= nt, t.flags |= rr;
            var g = new Error("Simulated error coming from DevTools"), C = wo(u);
            t.lanes = st(t.lanes, C);
            var k = YS(t, rc(g, t), C);
            Zg(t, k);
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
      Wl(a) ? (U = !0, Xh(t)) : U = !1, jf(t, u);
      var P = t.stateNode, I;
      P === null ? (Vm(e, t), W1(t, a, i), $S(t, a, i, u), I = !0) : e === null ? I = hx(t, a, i, u) : I = mx(e, t, a, i, u);
      var Se = ZS(e, t, a, I, U, u);
      {
        var Qe = t.stateNode;
        I && Qe.props !== i && (ac || E("It looks like %s is reassigning its own `this.props` while rendering. This is not supported and can lead to confusing bugs.", at(t) || "a component"), ac = !0);
      }
      return Se;
    }
    function ZS(e, t, a, i, u, s) {
      nC(e, t);
      var f = (t.flags & nt) !== Ie;
      if (!i && !f)
        return u && jE(t, a, !1), Pu(e, t, s);
      var p = t.stateNode;
      Vp.current = t;
      var v;
      if (f && typeof a.getDerivedStateFromError != "function")
        v = null, V1();
      else {
        vo(t);
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
      return t.flags |= Nl, e !== null && f ? Tx(e, t, v, s) : ka(e, t, v, s), t.memoizedState = p.state, u && jE(t, a, !0), t.child;
    }
    function aC(e) {
      var t = e.stateNode;
      t.pendingContext ? UE(e, t.pendingContext, t.pendingContext !== t.context) : t.context && UE(e, t.context, !1), Jg(e, t.containerInfo);
    }
    function _x(e, t, a) {
      if (aC(t), e === null)
        throw new Error("Should have a current fiber. This is a bug in React.");
      var i = t.pendingProps, u = t.memoizedState, s = u.element;
      u1(e, t), vm(t, i, null, a);
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
          var C = rc(new Error("There was an error while hydrating. Because the error happened outside of a Suspense boundary, the entire root will switch to client rendering."), t);
          return iC(e, t, p, a, C);
        } else if (p !== s) {
          var k = rc(new Error("This root received an early update, before anything was able hydrate. Switched the entire root to client rendering."), t);
          return iC(e, t, p, a, k);
        } else {
          Ob(t);
          var _ = e1(t, null, p, a);
          t.child = _;
          for (var U = _; U; )
            U.flags = U.flags & ~dn | Va, U = U.sibling;
        }
      } else {
        if (zf(), p === s)
          return Pu(e, t, a);
        ka(e, t, p, a);
      }
      return t.child;
    }
    function iC(e, t, a, i, u) {
      return zf(), Fg(u), t.flags |= On, ka(e, t, a, i), t.child;
    }
    function Dx(e, t, a) {
      f1(t), e === null && Ug(t);
      var i = t.type, u = t.pendingProps, s = e !== null ? e.memoizedProps : null, f = u.children, p = yg(i, u);
      return p ? f = null : s !== null && yg(i, s) && (t.flags |= Yt), nC(e, t), ka(e, t, f, a), t.child;
    }
    function kx(e, t) {
      return e === null && Ug(t), null;
    }
    function Ox(e, t, a, i) {
      Vm(e, t);
      var u = t.pendingProps, s = a, f = s._payload, p = s._init, v = p(f);
      t.type = v;
      var g = t.tag = kD(v), C = fl(v, u), k;
      switch (g) {
        case W:
          return JS(t, v), t.type = v = Jf(v), k = XS(null, t, v, C, i), k;
        case q:
          return t.type = v = k0(v), k = rC(null, t, v, C, i), k;
        case ge:
          return t.type = v = O0(v), k = Z1(null, t, v, C, i), k;
        case Le: {
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
          return k = J1(
            null,
            t,
            v,
            fl(v.type, C),
            // The inner type can have defaults too
            i
          ), k;
        }
      }
      var U = "";
      throw v !== null && typeof v == "object" && v.$$typeof === Ke && (U = " Did you wrap a component in React.lazy() more than once?"), new Error("Element type is invalid. Received a promise that resolves to: " + v + ". " + ("Lazy element type must resolve to a class or function." + U));
    }
    function Mx(e, t, a, i, u) {
      Vm(e, t), t.tag = q;
      var s;
      return Wl(a) ? (s = !0, Xh(t)) : s = !1, jf(t, u), W1(t, a, i), $S(t, a, i, u), ZS(null, t, a, !0, s, u);
    }
    function Lx(e, t, a, i) {
      Vm(e, t);
      var u = t.pendingProps, s;
      {
        var f = Mf(t, a, !1);
        s = Lf(t, f);
      }
      jf(t, i);
      var p, v;
      vo(t);
      {
        if (a.prototype && typeof a.prototype.render == "function") {
          var g = bt(a) || "Unknown";
          WS[g] || (E("The <%s /> component appears to have a render method, but doesn't extend React.Component. This is likely to cause errors. Change %s to extend React.Component instead.", g, g), WS[g] = !0);
        }
        t.mode & gt && ol.recordLegacyContextWarning(t, null), ea(!0), Vp.current = t, p = If(null, t, a, u, s, i), v = Yf(), ea(!1);
      }
      if (ua(), t.flags |= Nl, typeof p == "object" && p !== null && typeof p.render == "function" && p.$$typeof === void 0) {
        var C = bt(a) || "Unknown";
        $p[C] || (E("The <%s /> component appears to be a function component that returns a class instance. Change %s to a class that extends React.Component instead. If you can't use a class try assigning the prototype on the function as a workaround. `%s.prototype = React.Component.prototype`. Don't use an arrow function since it cannot be called with `new` by React.", C, C, C), $p[C] = !0);
      }
      if (
        // Run these checks in production only if the flag is off.
        // Eventually we'll delete this branch altogether.
        typeof p == "object" && p !== null && typeof p.render == "function" && p.$$typeof === void 0
      ) {
        {
          var k = bt(a) || "Unknown";
          $p[k] || (E("The <%s /> component appears to be a function component that returns a class instance. Change %s to a class that extends React.Component instead. If you can't use a class try assigning the prototype on the function as a workaround. `%s.prototype = React.Component.prototype`. Don't use an arrow function since it cannot be called with `new` by React.", k, k, k), $p[k] = !0);
        }
        t.tag = q, t.memoizedState = null, t.updateQueue = null;
        var _ = !1;
        return Wl(a) ? (_ = !0, Xh(t)) : _ = !1, t.memoizedState = p.state !== null && p.state !== void 0 ? p.state : null, Xg(t), Y1(t, p), $S(t, a, u, i), ZS(null, t, a, !0, _, i);
      } else {
        if (t.tag = W, t.mode & gt) {
          Bn(!0);
          try {
            p = If(null, t, a, u, s, i), v = Yf();
          } finally {
            Bn(!1);
          }
        }
        return Pr() && v && Mg(t), ka(null, t, p, i), JS(t, a), t.child;
      }
    }
    function JS(e, t) {
      {
        if (t && t.childContextTypes && E("%s(...): childContextTypes cannot be defined on a function component.", t.displayName || t.name || "Component"), e.ref !== null) {
          var a = "", i = Ur();
          i && (a += `

Check the render method of \`` + i + "`.");
          var u = i || "", s = e._debugSource;
          s && (u = s.fileName + ":" + s.lineNumber), qS[u] || (qS[u] = !0, E("Function components cannot be given refs. Attempts to access this ref will fail. Did you mean to use React.forwardRef()?%s", a));
        }
        if (t.defaultProps !== void 0) {
          var f = bt(t) || "Unknown";
          Bp[f] || (E("%s: Support for defaultProps will be removed from function components in a future major release. Use JavaScript default parameters instead.", f), Bp[f] = !0);
        }
        if (typeof t.getDerivedStateFromProps == "function") {
          var p = bt(t) || "Unknown";
          GS[p] || (E("%s: Function components do not support getDerivedStateFromProps.", p), GS[p] = !0);
        }
        if (typeof t.contextType == "object" && t.contextType !== null) {
          var v = bt(t) || "Unknown";
          QS[v] || (E("%s: Function components do not support contextType.", v), QS[v] = !0);
        }
      }
    }
    var e0 = {
      dehydrated: null,
      treeContext: null,
      retryLane: In
    };
    function t0(e) {
      return {
        baseLanes: e,
        cachePool: Rx(),
        transitions: null
      };
    }
    function Nx(e, t) {
      var a = null;
      return {
        baseLanes: st(e.baseLanes, t),
        cachePool: a,
        transitions: e.transitions
      };
    }
    function Ax(e, t, a, i) {
      if (t !== null) {
        var u = t.memoizedState;
        if (u === null)
          return !1;
      }
      return nS(e, Lp);
    }
    function zx(e, t) {
      return Ns(e.childLanes, t);
    }
    function lC(e, t, a) {
      var i = t.pendingProps;
      ID(t) && (t.flags |= nt);
      var u = sl.current, s = !1, f = (t.flags & nt) !== Ie;
      if (f || Ax(u, e) ? (s = !0, t.flags &= ~nt) : (e === null || e.memoizedState !== null) && (u = Jb(u, p1)), u = Hf(u), qo(t, u), e === null) {
        Ug(t);
        var p = t.memoizedState;
        if (p !== null) {
          var v = p.dehydrated;
          if (v !== null)
            return Hx(t, v);
        }
        var g = i.children, C = i.fallback;
        if (s) {
          var k = Ux(t, g, C, a), _ = t.child;
          return _.memoizedState = t0(a), t.memoizedState = e0, k;
        } else
          return n0(t, g);
      } else {
        var U = e.memoizedState;
        if (U !== null) {
          var P = U.dehydrated;
          if (P !== null)
            return Vx(e, t, f, i, P, U, a);
        }
        if (s) {
          var I = i.fallback, Se = i.children, Qe = jx(e, t, Se, I, a), Ve = t.child, kt = e.child.memoizedState;
          return Ve.memoizedState = kt === null ? t0(a) : Nx(kt, a), Ve.childLanes = zx(e, a), t.memoizedState = e0, Qe;
        } else {
          var Rt = i.children, N = Fx(e, t, Rt, a);
          return t.memoizedState = null, N;
        }
      }
    }
    function n0(e, t, a) {
      var i = e.mode, u = {
        mode: "visible",
        children: t
      }, s = r0(u, i);
      return s.return = e, e.child = s, s;
    }
    function Ux(e, t, a, i) {
      var u = e.mode, s = e.child, f = {
        mode: "hidden",
        children: t
      }, p, v;
      return (u & He) === Fe && s !== null ? (p = s, p.childLanes = X, p.pendingProps = f, e.mode & rt && (p.actualDuration = 0, p.actualStartTime = -1, p.selfBaseDuration = 0, p.treeBaseDuration = 0), v = rs(a, u, i, null)) : (p = r0(f, u), v = rs(a, u, i, null)), p.return = e, v.return = e, p.sibling = v, e.child = p, v;
    }
    function r0(e, t, a) {
      return uR(e, t, X, null);
    }
    function uC(e, t) {
      return sc(e, t);
    }
    function Fx(e, t, a, i) {
      var u = e.child, s = u.sibling, f = uC(u, {
        mode: "visible",
        children: a
      });
      if ((t.mode & He) === Fe && (f.lanes = i), f.return = t, f.sibling = null, s !== null) {
        var p = t.deletions;
        p === null ? (t.deletions = [s], t.flags |= Pt) : p.push(s);
      }
      return t.child = f, f;
    }
    function jx(e, t, a, i, u) {
      var s = t.mode, f = e.child, p = f.sibling, v = {
        mode: "hidden",
        children: a
      }, g;
      if (
        // In legacy mode, we commit the primary tree as if it successfully
        // completed, even though it's in an inconsistent state.
        (s & He) === Fe && // Make sure we're on the second pass, i.e. the primary child fragment was
        // already cloned. In legacy mode, the only case where this isn't true is
        // when DevTools forces us to display a fallback; we skip the first render
        // pass entirely and go straight to rendering the fallback. (In Concurrent
        // Mode, SuspenseList can also trigger this scenario, but this is a legacy-
        // only codepath.)
        t.child !== f
      ) {
        var C = t.child;
        g = C, g.childLanes = X, g.pendingProps = v, t.mode & rt && (g.actualDuration = 0, g.actualStartTime = -1, g.selfBaseDuration = f.selfBaseDuration, g.treeBaseDuration = f.treeBaseDuration), t.deletions = null;
      } else
        g = uC(f, v), g.subtreeFlags = f.subtreeFlags & cr;
      var k;
      return p !== null ? k = sc(p, i) : (k = rs(i, s, u, null), k.flags |= dn), k.return = t, g.return = t, g.sibling = k, t.child = g, k;
    }
    function Hm(e, t, a, i) {
      i !== null && Fg(i), Uf(t, e.child, null, a);
      var u = t.pendingProps, s = u.children, f = n0(t, s);
      return f.flags |= dn, t.memoizedState = null, f;
    }
    function Px(e, t, a, i, u) {
      var s = t.mode, f = {
        mode: "visible",
        children: a
      }, p = r0(f, s), v = rs(i, s, u, null);
      return v.flags |= dn, p.return = t, v.return = t, p.sibling = v, t.child = p, (t.mode & He) !== Fe && Uf(t, e.child, null, u), v;
    }
    function Hx(e, t, a) {
      return (e.mode & He) === Fe ? (E("Cannot hydrate Suspense in legacy mode. Switch from ReactDOM.hydrate(element, container) to ReactDOMClient.hydrateRoot(container, <App />).render(element) or remove the Suspense components from the server rendered components."), e.lanes = Be) : Cg(t) ? e.lanes = tl : e.lanes = _r, null;
    }
    function Vx(e, t, a, i, u, s, f) {
      if (a)
        if (t.flags & On) {
          t.flags &= ~On;
          var N = BS(new Error("There was an error while hydrating this Suspense boundary. Switched to client rendering."));
          return Hm(e, t, f, N);
        } else {
          if (t.memoizedState !== null)
            return t.child = e.child, t.flags |= nt, null;
          var Y = i.children, A = i.fallback, re = Px(e, t, Y, A, f), Te = t.child;
          return Te.memoizedState = t0(f), t.memoizedState = e0, re;
        }
      else {
        if (Db(), (t.mode & He) === Fe)
          return Hm(
            e,
            t,
            f,
            // TODO: When we delete legacy mode, we should make this error argument
            // required — every concurrent mode path that causes hydration to
            // de-opt to client rendering should have an error message.
            null
          );
        if (Cg(u)) {
          var p, v, g;
          {
            var C = Yw(u);
            p = C.digest, v = C.message, g = C.stack;
          }
          var k;
          v ? k = new Error(v) : k = new Error("The server could not finish this Suspense boundary, likely due to an error during server rendering. Switched to client rendering.");
          var _ = BS(k, p, g);
          return Hm(e, t, f, _);
        }
        var U = ca(f, e.childLanes);
        if (dl || U) {
          var P = Xm();
          if (P !== null) {
            var I = dh(P, f);
            if (I !== In && I !== s.retryLane) {
              s.retryLane = I;
              var Se = cn;
              Ja(e, I), Er(P, e, I, Se);
            }
          }
          w0();
          var Qe = BS(new Error("This Suspense boundary received an update before it finished hydrating. This caused the boundary to switch to client rendering. The usual way to fix this is to wrap the original update in startTransition."));
          return Hm(e, t, f, Qe);
        } else if (OE(u)) {
          t.flags |= nt, t.child = e.child;
          var Ve = dD.bind(null, e);
          return Ww(u, Ve), null;
        } else {
          Mb(t, u, s.treeContext);
          var kt = i.children, Rt = n0(t, kt);
          return Rt.flags |= Va, Rt;
        }
      }
    }
    function oC(e, t, a) {
      e.lanes = st(e.lanes, t);
      var i = e.alternate;
      i !== null && (i.lanes = st(i.lanes, t)), Qg(e.return, t, a);
    }
    function $x(e, t, a) {
      for (var i = t; i !== null; ) {
        if (i.tag === $) {
          var u = i.memoizedState;
          u !== null && oC(i, a, e);
        } else if (i.tag === Ot)
          oC(i, a, e);
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
    function Bx(e) {
      for (var t = e, a = null; t !== null; ) {
        var i = t.alternate;
        i !== null && gm(i) === null && (a = t), t = t.sibling;
      }
      return a;
    }
    function Ix(e) {
      if (e !== void 0 && e !== "forwards" && e !== "backwards" && e !== "together" && !KS[e])
        if (KS[e] = !0, typeof e == "string")
          switch (e.toLowerCase()) {
            case "together":
            case "forwards":
            case "backwards": {
              E('"%s" is not a valid value for revealOrder on <SuspenseList />. Use lowercase "%s" instead.', e, e.toLowerCase());
              break;
            }
            case "forward":
            case "backward": {
              E('"%s" is not a valid value for revealOrder on <SuspenseList />. React uses the -s suffix in the spelling. Use "%ss" instead.', e, e.toLowerCase());
              break;
            }
            default:
              E('"%s" is not a supported revealOrder on <SuspenseList />. Did you mean "together", "forwards" or "backwards"?', e);
              break;
          }
        else
          E('%s is not a supported value for revealOrder on <SuspenseList />. Did you mean "together", "forwards" or "backwards"?', e);
    }
    function Yx(e, t) {
      e !== void 0 && !Pm[e] && (e !== "collapsed" && e !== "hidden" ? (Pm[e] = !0, E('"%s" is not a supported value for tail on <SuspenseList />. Did you mean "collapsed" or "hidden"?', e)) : t !== "forwards" && t !== "backwards" && (Pm[e] = !0, E('<SuspenseList tail="%s" /> is only valid if revealOrder is "forwards" or "backwards". Did you mean to specify revealOrder="forwards"?', e)));
    }
    function sC(e, t) {
      {
        var a = xt(e), i = !a && typeof Nr(e) == "function";
        if (a || i) {
          var u = a ? "array" : "iterable";
          return E("A nested %s was passed to row #%s in <SuspenseList />. Wrap it in an additional SuspenseList to configure its revealOrder: <SuspenseList revealOrder=...> ... <SuspenseList revealOrder=...>{%s}</SuspenseList> ... </SuspenseList>", u, t, u), !1;
        }
      }
      return !0;
    }
    function Wx(e, t) {
      if ((t === "forwards" || t === "backwards") && e !== void 0 && e !== null && e !== !1)
        if (xt(e)) {
          for (var a = 0; a < e.length; a++)
            if (!sC(e[a], a))
              return;
        } else {
          var i = Nr(e);
          if (typeof i == "function") {
            var u = i.call(e);
            if (u)
              for (var s = u.next(), f = 0; !s.done; s = u.next()) {
                if (!sC(s.value, f))
                  return;
                f++;
              }
          } else
            E('A single row was passed to a <SuspenseList revealOrder="%s" />. This is not useful since it needs multiple rows. Did you mean to pass multiple children or an array?', t);
        }
    }
    function a0(e, t, a, i, u) {
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
    function cC(e, t, a) {
      var i = t.pendingProps, u = i.revealOrder, s = i.tail, f = i.children;
      Ix(u), Yx(s, u), Wx(f, u), ka(e, t, f, a);
      var p = sl.current, v = nS(p, Lp);
      if (v)
        p = rS(p, Lp), t.flags |= nt;
      else {
        var g = e !== null && (e.flags & nt) !== Ie;
        g && $x(t, t.child, a), p = Hf(p);
      }
      if (qo(t, p), (t.mode & He) === Fe)
        t.memoizedState = null;
      else
        switch (u) {
          case "forwards": {
            var C = Bx(t.child), k;
            C === null ? (k = t.child, t.child = null) : (k = C.sibling, C.sibling = null), a0(
              t,
              !1,
              // isBackwards
              k,
              C,
              s
            );
            break;
          }
          case "backwards": {
            var _ = null, U = t.child;
            for (t.child = null; U !== null; ) {
              var P = U.alternate;
              if (P !== null && gm(P) === null) {
                t.child = U;
                break;
              }
              var I = U.sibling;
              U.sibling = _, _ = U, U = I;
            }
            a0(
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
            a0(
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
    function Qx(e, t, a) {
      Jg(t, t.stateNode.containerInfo);
      var i = t.pendingProps;
      return e === null ? t.child = Uf(t, null, i, a) : ka(e, t, i, a), t.child;
    }
    var fC = !1;
    function Gx(e, t, a) {
      var i = t.type, u = i._context, s = t.pendingProps, f = t.memoizedProps, p = s.value;
      {
        "value" in s || fC || (fC = !0, E("The `value` prop is required for the `<Context.Provider>`. Did you misspell it or forget to pass it?"));
        var v = t.type.propTypes;
        v && ll(v, s, "prop", "Context.Provider");
      }
      if (r1(t, u, p), f !== null) {
        var g = f.value;
        if (Oe(g, p)) {
          if (f.children === s.children && !qh())
            return Pu(e, t, a);
        } else
          Ib(t, u, a);
      }
      var C = s.children;
      return ka(e, t, C, a), t.child;
    }
    var dC = !1;
    function qx(e, t, a) {
      var i = t.type;
      i._context === void 0 ? i !== i.Consumer && (dC || (dC = !0, E("Rendering <Context> directly is not supported and will be removed in a future major release. Did you mean to render <Context.Consumer> instead?"))) : i = i._context;
      var u = t.pendingProps, s = u.children;
      typeof s != "function" && E("A context consumer was rendered with multiple children, or a child that isn't a function. A context consumer expects a single child that is a function. If you did pass a function, make sure there is no trailing or leading whitespace around it."), jf(t, a);
      var f = ur(i);
      vo(t);
      var p;
      return Vp.current = t, ea(!0), p = s(f), ea(!1), ua(), t.flags |= Nl, ka(e, t, p, a), t.child;
    }
    function Ip() {
      dl = !0;
    }
    function Vm(e, t) {
      (t.mode & He) === Fe && e !== null && (e.alternate = null, t.alternate = null, t.flags |= dn);
    }
    function Pu(e, t, a) {
      return e !== null && (t.dependencies = e.dependencies), V1(), nv(t.lanes), ca(a, t.childLanes) ? ($b(e, t), t.child) : null;
    }
    function Kx(e, t, a) {
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
    function i0(e, t) {
      var a = e.lanes;
      return !!ca(a, t);
    }
    function Xx(e, t, a) {
      switch (t.tag) {
        case K:
          aC(t), t.stateNode, zf();
          break;
        case ne:
          f1(t);
          break;
        case q: {
          var i = t.type;
          Wl(i) && Xh(t);
          break;
        }
        case oe:
          Jg(t, t.stateNode.containerInfo);
          break;
        case _e: {
          var u = t.memoizedProps.value, s = t.type._context;
          r1(t, s, u);
          break;
        }
        case Ne:
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
              return qo(t, Hf(sl.current)), t.flags |= nt, null;
            var g = t.child, C = g.childLanes;
            if (ca(a, C))
              return lC(e, t, a);
            qo(t, Hf(sl.current));
            var k = Pu(e, t, a);
            return k !== null ? k.sibling : null;
          } else
            qo(t, Hf(sl.current));
          break;
        }
        case Ot: {
          var _ = (e.flags & nt) !== Ie, U = ca(a, t.childLanes);
          if (_) {
            if (U)
              return cC(e, t, a);
            t.flags |= nt;
          }
          var P = t.memoizedState;
          if (P !== null && (P.rendering = null, P.tail = null, P.lastEffect = null), qo(t, sl.current), U)
            break;
          return null;
        }
        case Ye:
        case lt:
          return t.lanes = X, tC(e, t, a);
      }
      return Pu(e, t, a);
    }
    function pC(e, t, a) {
      if (t._debugNeedsRemount && e !== null)
        return Kx(e, t, z0(t.type, t.key, t.pendingProps, t._debugOwner || null, t.mode, t.lanes));
      if (e !== null) {
        var i = e.memoizedProps, u = t.pendingProps;
        if (i !== u || qh() || // Force a re-render if the implementation changed due to hot reload:
        t.type !== e.type)
          dl = !0;
        else {
          var s = i0(e, a);
          if (!s && // If this is the second pass of an error or suspense boundary, there
          // may not be work scheduled on `current`, so we check for this flag.
          (t.flags & nt) === Ie)
            return dl = !1, Xx(e, t, a);
          (e.flags & Ts) !== Ie ? dl = !0 : dl = !1;
        }
      } else if (dl = !1, Pr() && Rb(t)) {
        var f = t.index, p = Tb();
        VE(t, p, f);
      }
      switch (t.lanes = X, t.tag) {
        case me:
          return Lx(e, t, t.type, a);
        case Xt: {
          var v = t.elementType;
          return Ox(e, t, v, a);
        }
        case W: {
          var g = t.type, C = t.pendingProps, k = t.elementType === g ? C : fl(g, C);
          return XS(e, t, g, k, a);
        }
        case q: {
          var _ = t.type, U = t.pendingProps, P = t.elementType === _ ? U : fl(_, U);
          return rC(e, t, _, P, a);
        }
        case K:
          return _x(e, t, a);
        case ne:
          return Dx(e, t, a);
        case fe:
          return kx(e, t);
        case $:
          return lC(e, t, a);
        case oe:
          return Qx(e, t, a);
        case ge: {
          var I = t.type, Se = t.pendingProps, Qe = t.elementType === I ? Se : fl(I, Se);
          return Z1(e, t, I, Qe, a);
        }
        case we:
          return wx(e, t, a);
        case ze:
          return bx(e, t, a);
        case Ne:
          return xx(e, t, a);
        case _e:
          return Gx(e, t, a);
        case qe:
          return qx(e, t, a);
        case Le: {
          var Ve = t.type, kt = t.pendingProps, Rt = fl(Ve, kt);
          if (t.type !== t.elementType) {
            var N = Ve.propTypes;
            N && ll(
              N,
              Rt,
              // Resolved for outer only
              "prop",
              bt(Ve)
            );
          }
          return Rt = fl(Ve.type, Rt), J1(e, t, Ve, Rt, a);
        }
        case de:
          return eC(e, t, t.type, t.pendingProps, a);
        case En: {
          var Y = t.type, A = t.pendingProps, re = t.elementType === Y ? A : fl(Y, A);
          return Mx(e, t, Y, re, a);
        }
        case Ot:
          return cC(e, t, a);
        case mn:
          break;
        case Ye:
          return tC(e, t, a);
      }
      throw new Error("Unknown unit of work tag (" + t.tag + "). This error is likely caused by a bug in React. Please file an issue.");
    }
    function Wf(e) {
      e.flags |= ft;
    }
    function vC(e) {
      e.flags |= na, e.flags |= Od;
    }
    var hC, l0, mC, yC;
    hC = function(e, t, a, i) {
      for (var u = t.child; u !== null; ) {
        if (u.tag === ne || u.tag === fe)
          Sw(e, u.stateNode);
        else if (u.tag !== oe) {
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
    }, l0 = function(e, t) {
    }, mC = function(e, t, a, i, u) {
      var s = e.memoizedProps;
      if (s !== i) {
        var f = t.stateNode, p = eS(), v = Cw(f, a, s, i, u, p);
        t.updateQueue = v, v && Wf(t);
      }
    }, yC = function(e, t, a, i) {
      a !== i && Wf(t);
    };
    function Yp(e, t) {
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
      var t = e.alternate !== null && e.alternate.child === e.child, a = X, i = Ie;
      if (t) {
        if ((e.mode & rt) !== Fe) {
          for (var v = e.selfBaseDuration, g = e.child; g !== null; )
            a = st(a, st(g.lanes, g.childLanes)), i |= g.subtreeFlags & cr, i |= g.flags & cr, v += g.treeBaseDuration, g = g.sibling;
          e.treeBaseDuration = v;
        } else
          for (var C = e.child; C !== null; )
            a = st(a, st(C.lanes, C.childLanes)), i |= C.subtreeFlags & cr, i |= C.flags & cr, C.return = e, C = C.sibling;
        e.subtreeFlags |= i;
      } else {
        if ((e.mode & rt) !== Fe) {
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
    function Zx(e, t, a) {
      if (Ub() && (t.mode & He) !== Fe && (t.flags & nt) === Ie)
        return GE(t), zf(), t.flags |= On | Ta | rr, !1;
      var i = nm(t);
      if (a !== null && a.dehydrated !== null)
        if (e === null) {
          if (!i)
            throw new Error("A dehydrated suspense component was completed without a hydrated node. This is probably a bug in React.");
          if (Ab(t), Vr(t), (t.mode & rt) !== Fe) {
            var u = a !== null;
            if (u) {
              var s = t.child;
              s !== null && (t.treeBaseDuration -= s.treeBaseDuration);
            }
          }
          return !1;
        } else {
          if (zf(), (t.flags & nt) === Ie && (t.memoizedState = null), t.flags |= ft, Vr(t), (t.mode & rt) !== Fe) {
            var f = a !== null;
            if (f) {
              var p = t.child;
              p !== null && (t.treeBaseDuration -= p.treeBaseDuration);
            }
          }
          return !1;
        }
      else
        return qE(), !0;
    }
    function gC(e, t, a) {
      var i = t.pendingProps;
      switch (Lg(t), t.tag) {
        case me:
        case Xt:
        case de:
        case W:
        case ge:
        case we:
        case ze:
        case Ne:
        case qe:
        case Le:
          return Vr(t), null;
        case q: {
          var u = t.type;
          return Wl(u) && Kh(t), Vr(t), null;
        }
        case K: {
          var s = t.stateNode;
          if (Pf(t), Dg(t), iS(), s.pendingContext && (s.context = s.pendingContext, s.pendingContext = null), e === null || e.child === null) {
            var f = nm(t);
            if (f)
              Wf(t);
            else if (e !== null) {
              var p = e.memoizedState;
              // Check if this is a client root
              (!p.isDehydrated || // Check if we reverted to client rendering (e.g. due to an error)
              (t.flags & On) !== Ie) && (t.flags |= Ha, qE());
            }
          }
          return l0(e, t), Vr(t), null;
        }
        case ne: {
          tS(t);
          var v = c1(), g = t.type;
          if (e !== null && t.stateNode != null)
            mC(e, t, g, i, v), e.ref !== t.ref && vC(t);
          else {
            if (!i) {
              if (t.stateNode === null)
                throw new Error("We must have new props for new mounts. This error is likely caused by a bug in React. Please file an issue.");
              return Vr(t), null;
            }
            var C = eS(), k = nm(t);
            if (k)
              Lb(t, v, C) && Wf(t);
            else {
              var _ = gw(g, i, v, C, t);
              hC(_, t, !1, !1), t.stateNode = _, Ew(_, g, i, v) && Wf(t);
            }
            t.ref !== null && vC(t);
          }
          return Vr(t), null;
        }
        case fe: {
          var U = i;
          if (e && t.stateNode != null) {
            var P = e.memoizedProps;
            yC(e, t, P, U);
          } else {
            if (typeof U != "string" && t.stateNode === null)
              throw new Error("We must have new props for new mounts. This error is likely caused by a bug in React. Please file an issue.");
            var I = c1(), Se = eS(), Qe = nm(t);
            Qe ? Nb(t) && Wf(t) : t.stateNode = Rw(U, I, Se, t);
          }
          return Vr(t), null;
        }
        case $: {
          Vf(t);
          var Ve = t.memoizedState;
          if (e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
            var kt = Zx(e, t, Ve);
            if (!kt)
              return t.flags & rr ? t : null;
          }
          if ((t.flags & nt) !== Ie)
            return t.lanes = a, (t.mode & rt) !== Fe && OS(t), t;
          var Rt = Ve !== null, N = e !== null && e.memoizedState !== null;
          if (Rt !== N && Rt) {
            var Y = t.child;
            if (Y.flags |= Al, (t.mode & He) !== Fe) {
              var A = e === null && (t.memoizedProps.unstable_avoidThisFallback !== !0 || !O);
              A || nS(sl.current, p1) ? J_() : w0();
            }
          }
          var re = t.updateQueue;
          if (re !== null && (t.flags |= ft), Vr(t), (t.mode & rt) !== Fe && Rt) {
            var Te = t.child;
            Te !== null && (t.treeBaseDuration -= Te.treeBaseDuration);
          }
          return null;
        }
        case oe:
          return Pf(t), l0(e, t), e === null && hb(t.stateNode.containerInfo), Vr(t), null;
        case _e:
          var Ee = t.type._context;
          return Wg(Ee, t), Vr(t), null;
        case En: {
          var tt = t.type;
          return Wl(tt) && Kh(t), Vr(t), null;
        }
        case Ot: {
          Vf(t);
          var ut = t.memoizedState;
          if (ut === null)
            return Vr(t), null;
          var en = (t.flags & nt) !== Ie, Ut = ut.rendering;
          if (Ut === null)
            if (en)
              Yp(ut, !1);
            else {
              var Xn = tD() && (e === null || (e.flags & nt) === Ie);
              if (!Xn)
                for (var Ft = t.child; Ft !== null; ) {
                  var Yn = gm(Ft);
                  if (Yn !== null) {
                    en = !0, t.flags |= nt, Yp(ut, !1);
                    var ha = Yn.updateQueue;
                    return ha !== null && (t.updateQueue = ha, t.flags |= ft), t.subtreeFlags = Ie, Bb(t, a), qo(t, rS(sl.current, Lp)), t.child;
                  }
                  Ft = Ft.sibling;
                }
              ut.tail !== null && bn() > PC() && (t.flags |= nt, en = !0, Yp(ut, !1), t.lanes = th);
            }
          else {
            if (!en) {
              var Wr = gm(Ut);
              if (Wr !== null) {
                t.flags |= nt, en = !0;
                var yi = Wr.updateQueue;
                if (yi !== null && (t.updateQueue = yi, t.flags |= ft), Yp(ut, !0), ut.tail === null && ut.tailMode === "hidden" && !Ut.alternate && !Pr())
                  return Vr(t), null;
              } else // The time it took to render last row is greater than the remaining
              // time we have to render. So rendering one more row would likely
              // exceed it.
              bn() * 2 - ut.renderingStartTime > PC() && a !== _r && (t.flags |= nt, en = !0, Yp(ut, !1), t.lanes = th);
            }
            if (ut.isBackwards)
              Ut.sibling = t.child, t.child = Ut;
            else {
              var La = ut.last;
              La !== null ? La.sibling = Ut : t.child = Ut, ut.last = Ut;
            }
          }
          if (ut.tail !== null) {
            var Na = ut.tail;
            ut.rendering = Na, ut.tail = Na.sibling, ut.renderingStartTime = bn(), Na.sibling = null;
            var ma = sl.current;
            return en ? ma = rS(ma, Lp) : ma = Hf(ma), qo(t, ma), Na;
          }
          return Vr(t), null;
        }
        case mn:
          break;
        case Ye:
        case lt: {
          T0(t);
          var Iu = t.memoizedState, ed = Iu !== null;
          if (e !== null) {
            var uv = e.memoizedState, eu = uv !== null;
            eu !== ed && // LegacyHidden doesn't do any hiding — it only pre-renders.
            !pe && (t.flags |= Al);
          }
          return !ed || (t.mode & He) === Fe ? Vr(t) : ca(Jl, _r) && (Vr(t), t.subtreeFlags & (dn | ft) && (t.flags |= Al)), null;
        }
        case Lt:
          return null;
        case Tt:
          return null;
      }
      throw new Error("Unknown unit of work tag (" + t.tag + "). This error is likely caused by a bug in React. Please file an issue.");
    }
    function Jx(e, t, a) {
      switch (Lg(t), t.tag) {
        case q: {
          var i = t.type;
          Wl(i) && Kh(t);
          var u = t.flags;
          return u & rr ? (t.flags = u & ~rr | nt, (t.mode & rt) !== Fe && OS(t), t) : null;
        }
        case K: {
          t.stateNode, Pf(t), Dg(t), iS();
          var s = t.flags;
          return (s & rr) !== Ie && (s & nt) === Ie ? (t.flags = s & ~rr | nt, t) : null;
        }
        case ne:
          return tS(t), null;
        case $: {
          Vf(t);
          var f = t.memoizedState;
          if (f !== null && f.dehydrated !== null) {
            if (t.alternate === null)
              throw new Error("Threw in newly mounted dehydrated component. This is likely a bug in React. Please file an issue.");
            zf();
          }
          var p = t.flags;
          return p & rr ? (t.flags = p & ~rr | nt, (t.mode & rt) !== Fe && OS(t), t) : null;
        }
        case Ot:
          return Vf(t), null;
        case oe:
          return Pf(t), null;
        case _e:
          var v = t.type._context;
          return Wg(v, t), null;
        case Ye:
        case lt:
          return T0(t), null;
        case Lt:
          return null;
        default:
          return null;
      }
    }
    function SC(e, t, a) {
      switch (Lg(t), t.tag) {
        case q: {
          var i = t.type.childContextTypes;
          i != null && Kh(t);
          break;
        }
        case K: {
          t.stateNode, Pf(t), Dg(t), iS();
          break;
        }
        case ne: {
          tS(t);
          break;
        }
        case oe:
          Pf(t);
          break;
        case $:
          Vf(t);
          break;
        case Ot:
          Vf(t);
          break;
        case _e:
          var u = t.type._context;
          Wg(u, t);
          break;
        case Ye:
        case lt:
          T0(t);
          break;
      }
    }
    var EC = null;
    EC = /* @__PURE__ */ new Set();
    var $m = !1, $r = !1, e_ = typeof WeakSet == "function" ? WeakSet : Set, Me = null, Qf = null, Gf = null;
    function t_(e) {
      hu(null, function() {
        throw e;
      }), Dd();
    }
    var n_ = function(e, t) {
      if (t.props = e.memoizedProps, t.state = e.memoizedState, e.mode & rt)
        try {
          Xl(), t.componentWillUnmount();
        } finally {
          Kl(e);
        }
      else
        t.componentWillUnmount();
    };
    function CC(e, t) {
      try {
        Zo(vr, e);
      } catch (a) {
        hn(e, t, a);
      }
    }
    function u0(e, t, a) {
      try {
        n_(e, a);
      } catch (i) {
        hn(e, t, i);
      }
    }
    function r_(e, t, a) {
      try {
        a.componentDidMount();
      } catch (i) {
        hn(e, t, i);
      }
    }
    function RC(e, t) {
      try {
        wC(e);
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
          typeof i == "function" && E("Unexpected return value from a callback ref in %s. A callback ref should not return a function.", at(e));
        } else
          a.current = null;
    }
    function Bm(e, t, a) {
      try {
        a();
      } catch (i) {
        hn(e, t, i);
      }
    }
    var TC = !1;
    function a_(e, t) {
      mw(e.containerInfo), Me = t, i_();
      var a = TC;
      return TC = !1, a;
    }
    function i_() {
      for (; Me !== null; ) {
        var e = Me, t = e.child;
        (e.subtreeFlags & co) !== Ie && t !== null ? (t.return = e, Me = t) : l_();
      }
    }
    function l_() {
      for (; Me !== null; ) {
        var e = Me;
        It(e);
        try {
          u_(e);
        } catch (a) {
          hn(e, e.return, a);
        }
        kn();
        var t = e.sibling;
        if (t !== null) {
          t.return = e.return, Me = t;
          return;
        }
        Me = e.return;
      }
    }
    function u_(e) {
      var t = e.alternate, a = e.flags;
      if ((a & Ha) !== Ie) {
        switch (It(e), e.tag) {
          case W:
          case ge:
          case de:
            break;
          case q: {
            if (t !== null) {
              var i = t.memoizedProps, u = t.memoizedState, s = e.stateNode;
              e.type === e.elementType && !ac && (s.props !== e.memoizedProps && E("Expected %s props to match memoized props before getSnapshotBeforeUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.", at(e) || "instance"), s.state !== e.memoizedState && E("Expected %s state to match memoized state before getSnapshotBeforeUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.", at(e) || "instance"));
              var f = s.getSnapshotBeforeUpdate(e.elementType === e.type ? i : fl(e.type, i), u);
              {
                var p = EC;
                f === void 0 && !p.has(e.type) && (p.add(e.type), E("%s.getSnapshotBeforeUpdate(): A snapshot value (or null) must be returned. You have returned undefined.", at(e)));
              }
              s.__reactInternalSnapshotBeforeUpdate = f;
            }
            break;
          }
          case K: {
            {
              var v = e.stateNode;
              Vw(v.containerInfo);
            }
            break;
          }
          case ne:
          case fe:
          case oe:
          case En:
            break;
          default:
            throw new Error("This unit of work tag should not have side-effects. This error is likely caused by a bug in React. Please file an issue.");
        }
        kn();
      }
    }
    function pl(e, t, a) {
      var i = t.updateQueue, u = i !== null ? i.lastEffect : null;
      if (u !== null) {
        var s = u.next, f = s;
        do {
          if ((f.tag & e) === e) {
            var p = f.destroy;
            f.destroy = void 0, p !== void 0 && ((e & Hr) !== ei ? Zv(t) : (e & vr) !== ei && vi(t), (e & Ql) !== ei && av(!0), Bm(t, a, p), (e & Ql) !== ei && av(!1), (e & Hr) !== ei ? Ac() : (e & vr) !== ei && ho());
          }
          f = f.next;
        } while (f !== s);
      }
    }
    function Zo(e, t) {
      var a = t.updateQueue, i = a !== null ? a.lastEffect : null;
      if (i !== null) {
        var u = i.next, s = u;
        do {
          if ((s.tag & e) === e) {
            (e & Hr) !== ei ? Fl(t) : (e & vr) !== ei && Jv(t);
            var f = s.create;
            (e & Ql) !== ei && av(!0), s.destroy = f(), (e & Ql) !== ei && av(!1), (e & Hr) !== ei ? Nc() : (e & vr) !== ei && ws();
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

Learn more about data fetching with Hooks: https://reactjs.org/link/hooks-data-fetching` : g = " You returned: " + p, E("%s must not return anything besides a function, which is used for clean-up.%s", v, g);
              }
            }
          }
          s = s.next;
        } while (s !== u);
      }
    }
    function o_(e, t) {
      if ((t.flags & ft) !== Ie)
        switch (t.tag) {
          case Ne: {
            var a = t.stateNode.passiveEffectDuration, i = t.memoizedProps, u = i.id, s = i.onPostCommit, f = P1(), p = t.alternate === null ? "mount" : "update";
            j1() && (p = "nested-update"), typeof s == "function" && s(u, p, a, f);
            var v = t.return;
            e: for (; v !== null; ) {
              switch (v.tag) {
                case K:
                  var g = v.stateNode;
                  g.passiveEffectDuration += a;
                  break e;
                case Ne:
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
    function s_(e, t, a, i) {
      if ((a.flags & br) !== Ie)
        switch (a.tag) {
          case W:
          case ge:
          case de: {
            if (!$r)
              if (a.mode & rt)
                try {
                  Xl(), Zo(vr | pr, a);
                } finally {
                  Kl(a);
                }
              else
                Zo(vr | pr, a);
            break;
          }
          case q: {
            var u = a.stateNode;
            if (a.flags & ft && !$r)
              if (t === null)
                if (a.type === a.elementType && !ac && (u.props !== a.memoizedProps && E("Expected %s props to match memoized props before componentDidMount. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.", at(a) || "instance"), u.state !== a.memoizedState && E("Expected %s state to match memoized state before componentDidMount. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.", at(a) || "instance")), a.mode & rt)
                  try {
                    Xl(), u.componentDidMount();
                  } finally {
                    Kl(a);
                  }
                else
                  u.componentDidMount();
              else {
                var s = a.elementType === a.type ? t.memoizedProps : fl(a.type, t.memoizedProps), f = t.memoizedState;
                if (a.type === a.elementType && !ac && (u.props !== a.memoizedProps && E("Expected %s props to match memoized props before componentDidUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.", at(a) || "instance"), u.state !== a.memoizedState && E("Expected %s state to match memoized state before componentDidUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.", at(a) || "instance")), a.mode & rt)
                  try {
                    Xl(), u.componentDidUpdate(s, f, u.__reactInternalSnapshotBeforeUpdate);
                  } finally {
                    Kl(a);
                  }
                else
                  u.componentDidUpdate(s, f, u.__reactInternalSnapshotBeforeUpdate);
              }
            var p = a.updateQueue;
            p !== null && (a.type === a.elementType && !ac && (u.props !== a.memoizedProps && E("Expected %s props to match memoized props before processing the update queue. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.", at(a) || "instance"), u.state !== a.memoizedState && E("Expected %s state to match memoized state before processing the update queue. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.", at(a) || "instance")), s1(a, p, u));
            break;
          }
          case K: {
            var v = a.updateQueue;
            if (v !== null) {
              var g = null;
              if (a.child !== null)
                switch (a.child.tag) {
                  case ne:
                    g = a.child.stateNode;
                    break;
                  case q:
                    g = a.child.stateNode;
                    break;
                }
              s1(a, v, g);
            }
            break;
          }
          case ne: {
            var C = a.stateNode;
            if (t === null && a.flags & ft) {
              var k = a.type, _ = a.memoizedProps;
              _w(C, k, _);
            }
            break;
          }
          case fe:
            break;
          case oe:
            break;
          case Ne: {
            {
              var U = a.memoizedProps, P = U.onCommit, I = U.onRender, Se = a.stateNode.effectDuration, Qe = P1(), Ve = t === null ? "mount" : "update";
              j1() && (Ve = "nested-update"), typeof I == "function" && I(a.memoizedProps.id, Ve, a.actualDuration, a.treeBaseDuration, a.actualStartTime, Qe);
              {
                typeof P == "function" && P(a.memoizedProps.id, Ve, Se, Qe), lD(a);
                var kt = a.return;
                e: for (; kt !== null; ) {
                  switch (kt.tag) {
                    case K:
                      var Rt = kt.stateNode;
                      Rt.effectDuration += Se;
                      break e;
                    case Ne:
                      var N = kt.stateNode;
                      N.effectDuration += Se;
                      break e;
                  }
                  kt = kt.return;
                }
              }
            }
            break;
          }
          case $: {
            y_(e, a);
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
      $r || a.flags & na && wC(a);
    }
    function c_(e) {
      switch (e.tag) {
        case W:
        case ge:
        case de: {
          if (e.mode & rt)
            try {
              Xl(), CC(e, e.return);
            } finally {
              Kl(e);
            }
          else
            CC(e, e.return);
          break;
        }
        case q: {
          var t = e.stateNode;
          typeof t.componentDidMount == "function" && r_(e, e.return, t), RC(e, e.return);
          break;
        }
        case ne: {
          RC(e, e.return);
          break;
        }
      }
    }
    function f_(e, t) {
      for (var a = null, i = e; ; ) {
        if (i.tag === ne) {
          if (a === null) {
            a = i;
            try {
              var u = i.stateNode;
              t ? Fw(u) : Pw(i.stateNode, i.memoizedProps);
            } catch (f) {
              hn(e, e.return, f);
            }
          }
        } else if (i.tag === fe) {
          if (a === null)
            try {
              var s = i.stateNode;
              t ? jw(s) : Hw(s, i.memoizedProps);
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
    function wC(e) {
      var t = e.ref;
      if (t !== null) {
        var a = e.stateNode, i;
        switch (e.tag) {
          case ne:
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
          typeof u == "function" && E("Unexpected return value from a callback ref in %s. A callback ref should not return a function.", at(e));
        } else
          t.hasOwnProperty("current") || E("Unexpected ref object provided for %s. Use either a ref-setter function or React.createRef().", at(e)), t.current = i;
      }
    }
    function d_(e) {
      var t = e.alternate;
      t !== null && (t.return = null), e.return = null;
    }
    function bC(e) {
      var t = e.alternate;
      t !== null && (e.alternate = null, bC(t));
      {
        if (e.child = null, e.deletions = null, e.sibling = null, e.tag === ne) {
          var a = e.stateNode;
          a !== null && gb(a);
        }
        e.stateNode = null, e._debugOwner = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
      }
    }
    function p_(e) {
      for (var t = e.return; t !== null; ) {
        if (xC(t))
          return t;
        t = t.return;
      }
      throw new Error("Expected to find a host parent. This error is likely caused by a bug in React. Please file an issue.");
    }
    function xC(e) {
      return e.tag === ne || e.tag === K || e.tag === oe;
    }
    function _C(e) {
      var t = e;
      e: for (; ; ) {
        for (; t.sibling === null; ) {
          if (t.return === null || xC(t.return))
            return null;
          t = t.return;
        }
        for (t.sibling.return = t.return, t = t.sibling; t.tag !== ne && t.tag !== fe && t.tag !== Ht; ) {
          if (t.flags & dn || t.child === null || t.tag === oe)
            continue e;
          t.child.return = t, t = t.child;
        }
        if (!(t.flags & dn))
          return t.stateNode;
      }
    }
    function v_(e) {
      var t = p_(e);
      switch (t.tag) {
        case ne: {
          var a = t.stateNode;
          t.flags & Yt && (kE(a), t.flags &= ~Yt);
          var i = _C(e);
          s0(e, i, a);
          break;
        }
        case K:
        case oe: {
          var u = t.stateNode.containerInfo, s = _C(e);
          o0(e, s, u);
          break;
        }
        // eslint-disable-next-line-no-fallthrough
        default:
          throw new Error("Invalid host parent fiber. This error is likely caused by a bug in React. Please file an issue.");
      }
    }
    function o0(e, t, a) {
      var i = e.tag, u = i === ne || i === fe;
      if (u) {
        var s = e.stateNode;
        t ? Nw(a, s, t) : Mw(a, s);
      } else if (i !== oe) {
        var f = e.child;
        if (f !== null) {
          o0(f, t, a);
          for (var p = f.sibling; p !== null; )
            o0(p, t, a), p = p.sibling;
        }
      }
    }
    function s0(e, t, a) {
      var i = e.tag, u = i === ne || i === fe;
      if (u) {
        var s = e.stateNode;
        t ? Lw(a, s, t) : Ow(a, s);
      } else if (i !== oe) {
        var f = e.child;
        if (f !== null) {
          s0(f, t, a);
          for (var p = f.sibling; p !== null; )
            s0(p, t, a), p = p.sibling;
        }
      }
    }
    var Br = null, vl = !1;
    function h_(e, t, a) {
      {
        var i = t;
        e: for (; i !== null; ) {
          switch (i.tag) {
            case ne: {
              Br = i.stateNode, vl = !1;
              break e;
            }
            case K: {
              Br = i.stateNode.containerInfo, vl = !0;
              break e;
            }
            case oe: {
              Br = i.stateNode.containerInfo, vl = !0;
              break e;
            }
          }
          i = i.return;
        }
        if (Br === null)
          throw new Error("Expected to find a host parent. This error is likely caused by a bug in React. Please file an issue.");
        DC(e, t, a), Br = null, vl = !1;
      }
      d_(a);
    }
    function Jo(e, t, a) {
      for (var i = a.child; i !== null; )
        DC(e, t, i), i = i.sibling;
    }
    function DC(e, t, a) {
      switch (gu(a), a.tag) {
        case ne:
          $r || qf(a, t);
        // eslint-disable-next-line-no-fallthrough
        case fe: {
          {
            var i = Br, u = vl;
            Br = null, Jo(e, t, a), Br = i, vl = u, Br !== null && (vl ? zw(Br, a.stateNode) : Aw(Br, a.stateNode));
          }
          return;
        }
        case Ht: {
          Br !== null && (vl ? Uw(Br, a.stateNode) : Eg(Br, a.stateNode));
          return;
        }
        case oe: {
          {
            var s = Br, f = vl;
            Br = a.stateNode.containerInfo, vl = !0, Jo(e, t, a), Br = s, vl = f;
          }
          return;
        }
        case W:
        case ge:
        case Le:
        case de: {
          if (!$r) {
            var p = a.updateQueue;
            if (p !== null) {
              var v = p.lastEffect;
              if (v !== null) {
                var g = v.next, C = g;
                do {
                  var k = C, _ = k.destroy, U = k.tag;
                  _ !== void 0 && ((U & Ql) !== ei ? Bm(a, t, _) : (U & vr) !== ei && (vi(a), a.mode & rt ? (Xl(), Bm(a, t, _), Kl(a)) : Bm(a, t, _), ho())), C = C.next;
                } while (C !== g);
              }
            }
          }
          Jo(e, t, a);
          return;
        }
        case q: {
          if (!$r) {
            qf(a, t);
            var P = a.stateNode;
            typeof P.componentWillUnmount == "function" && u0(a, t, P);
          }
          Jo(e, t, a);
          return;
        }
        case mn: {
          Jo(e, t, a);
          return;
        }
        case Ye: {
          if (
            // TODO: Remove this dead flag
            a.mode & He
          ) {
            var I = $r;
            $r = I || a.memoizedState !== null, Jo(e, t, a), $r = I;
          } else
            Jo(e, t, a);
          break;
        }
        default: {
          Jo(e, t, a);
          return;
        }
      }
    }
    function m_(e) {
      e.memoizedState;
    }
    function y_(e, t) {
      var a = t.memoizedState;
      if (a === null) {
        var i = t.alternate;
        if (i !== null) {
          var u = i.memoizedState;
          if (u !== null) {
            var s = u.dehydrated;
            s !== null && tb(s);
          }
        }
      }
    }
    function kC(e) {
      var t = e.updateQueue;
      if (t !== null) {
        e.updateQueue = null;
        var a = e.stateNode;
        a === null && (a = e.stateNode = new e_()), t.forEach(function(i) {
          var u = pD.bind(null, e, i);
          if (!a.has(i)) {
            if (a.add(i), xa)
              if (Qf !== null && Gf !== null)
                rv(Gf, Qf);
              else
                throw Error("Expected finished root and lanes to be set. This is a bug in React.");
            i.then(u, u);
          }
        });
      }
    }
    function g_(e, t, a) {
      Qf = a, Gf = e, It(t), OC(t, e), It(t), Qf = null, Gf = null;
    }
    function hl(e, t, a) {
      var i = t.deletions;
      if (i !== null)
        for (var u = 0; u < i.length; u++) {
          var s = i[u];
          try {
            h_(e, t, s);
          } catch (v) {
            hn(s, t, v);
          }
        }
      var f = fc();
      if (t.subtreeFlags & ia)
        for (var p = t.child; p !== null; )
          It(p), OC(p, e), p = p.sibling;
      It(f);
    }
    function OC(e, t, a) {
      var i = e.alternate, u = e.flags;
      switch (e.tag) {
        case W:
        case ge:
        case Le:
        case de: {
          if (hl(t, e), Zl(e), u & ft) {
            try {
              pl(Ql | pr, e, e.return), Zo(Ql | pr, e);
            } catch (tt) {
              hn(e, e.return, tt);
            }
            if (e.mode & rt) {
              try {
                Xl(), pl(vr | pr, e, e.return);
              } catch (tt) {
                hn(e, e.return, tt);
              }
              Kl(e);
            } else
              try {
                pl(vr | pr, e, e.return);
              } catch (tt) {
                hn(e, e.return, tt);
              }
          }
          return;
        }
        case q: {
          hl(t, e), Zl(e), u & na && i !== null && qf(i, i.return);
          return;
        }
        case ne: {
          hl(t, e), Zl(e), u & na && i !== null && qf(i, i.return);
          {
            if (e.flags & Yt) {
              var s = e.stateNode;
              try {
                kE(s);
              } catch (tt) {
                hn(e, e.return, tt);
              }
            }
            if (u & ft) {
              var f = e.stateNode;
              if (f != null) {
                var p = e.memoizedProps, v = i !== null ? i.memoizedProps : p, g = e.type, C = e.updateQueue;
                if (e.updateQueue = null, C !== null)
                  try {
                    Dw(f, C, g, v, p, e);
                  } catch (tt) {
                    hn(e, e.return, tt);
                  }
              }
            }
          }
          return;
        }
        case fe: {
          if (hl(t, e), Zl(e), u & ft) {
            if (e.stateNode === null)
              throw new Error("This should have a text node initialized. This error is likely caused by a bug in React. Please file an issue.");
            var k = e.stateNode, _ = e.memoizedProps, U = i !== null ? i.memoizedProps : _;
            try {
              kw(k, U, _);
            } catch (tt) {
              hn(e, e.return, tt);
            }
          }
          return;
        }
        case K: {
          if (hl(t, e), Zl(e), u & ft && i !== null) {
            var P = i.memoizedState;
            if (P.isDehydrated)
              try {
                eb(t.containerInfo);
              } catch (tt) {
                hn(e, e.return, tt);
              }
          }
          return;
        }
        case oe: {
          hl(t, e), Zl(e);
          return;
        }
        case $: {
          hl(t, e), Zl(e);
          var I = e.child;
          if (I.flags & Al) {
            var Se = I.stateNode, Qe = I.memoizedState, Ve = Qe !== null;
            if (Se.isHidden = Ve, Ve) {
              var kt = I.alternate !== null && I.alternate.memoizedState !== null;
              kt || Z_();
            }
          }
          if (u & ft) {
            try {
              m_(e);
            } catch (tt) {
              hn(e, e.return, tt);
            }
            kC(e);
          }
          return;
        }
        case Ye: {
          var Rt = i !== null && i.memoizedState !== null;
          if (
            // TODO: Remove this dead flag
            e.mode & He
          ) {
            var N = $r;
            $r = N || Rt, hl(t, e), $r = N;
          } else
            hl(t, e);
          if (Zl(e), u & Al) {
            var Y = e.stateNode, A = e.memoizedState, re = A !== null, Te = e;
            if (Y.isHidden = re, re && !Rt && (Te.mode & He) !== Fe) {
              Me = Te;
              for (var Ee = Te.child; Ee !== null; )
                Me = Ee, E_(Ee), Ee = Ee.sibling;
            }
            f_(Te, re);
          }
          return;
        }
        case Ot: {
          hl(t, e), Zl(e), u & ft && kC(e);
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
          v_(e);
        } catch (a) {
          hn(e, e.return, a);
        }
        e.flags &= ~dn;
      }
      t & Va && (e.flags &= ~Va);
    }
    function S_(e, t, a) {
      Qf = a, Gf = t, Me = e, MC(e, t, a), Qf = null, Gf = null;
    }
    function MC(e, t, a) {
      for (var i = (e.mode & He) !== Fe; Me !== null; ) {
        var u = Me, s = u.child;
        if (u.tag === Ye && i) {
          var f = u.memoizedState !== null, p = f || $m;
          if (p) {
            c0(e, t, a);
            continue;
          } else {
            var v = u.alternate, g = v !== null && v.memoizedState !== null, C = g || $r, k = $m, _ = $r;
            $m = p, $r = C, $r && !_ && (Me = u, C_(u));
            for (var U = s; U !== null; )
              Me = U, MC(
                U,
                // New root; bubble back up to here and stop.
                t,
                a
              ), U = U.sibling;
            Me = u, $m = k, $r = _, c0(e, t, a);
            continue;
          }
        }
        (u.subtreeFlags & br) !== Ie && s !== null ? (s.return = u, Me = s) : c0(e, t, a);
      }
    }
    function c0(e, t, a) {
      for (; Me !== null; ) {
        var i = Me;
        if ((i.flags & br) !== Ie) {
          var u = i.alternate;
          It(i);
          try {
            s_(t, u, i, a);
          } catch (f) {
            hn(i, i.return, f);
          }
          kn();
        }
        if (i === e) {
          Me = null;
          return;
        }
        var s = i.sibling;
        if (s !== null) {
          s.return = i.return, Me = s;
          return;
        }
        Me = i.return;
      }
    }
    function E_(e) {
      for (; Me !== null; ) {
        var t = Me, a = t.child;
        switch (t.tag) {
          case W:
          case ge:
          case Le:
          case de: {
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
          case q: {
            qf(t, t.return);
            var i = t.stateNode;
            typeof i.componentWillUnmount == "function" && u0(t, t.return, i);
            break;
          }
          case ne: {
            qf(t, t.return);
            break;
          }
          case Ye: {
            var u = t.memoizedState !== null;
            if (u) {
              LC(e);
              continue;
            }
            break;
          }
        }
        a !== null ? (a.return = t, Me = a) : LC(e);
      }
    }
    function LC(e) {
      for (; Me !== null; ) {
        var t = Me;
        if (t === e) {
          Me = null;
          return;
        }
        var a = t.sibling;
        if (a !== null) {
          a.return = t.return, Me = a;
          return;
        }
        Me = t.return;
      }
    }
    function C_(e) {
      for (; Me !== null; ) {
        var t = Me, a = t.child;
        if (t.tag === Ye) {
          var i = t.memoizedState !== null;
          if (i) {
            NC(e);
            continue;
          }
        }
        a !== null ? (a.return = t, Me = a) : NC(e);
      }
    }
    function NC(e) {
      for (; Me !== null; ) {
        var t = Me;
        It(t);
        try {
          c_(t);
        } catch (i) {
          hn(t, t.return, i);
        }
        if (kn(), t === e) {
          Me = null;
          return;
        }
        var a = t.sibling;
        if (a !== null) {
          a.return = t.return, Me = a;
          return;
        }
        Me = t.return;
      }
    }
    function R_(e, t, a, i) {
      Me = t, T_(t, e, a, i);
    }
    function T_(e, t, a, i) {
      for (; Me !== null; ) {
        var u = Me, s = u.child;
        (u.subtreeFlags & $a) !== Ie && s !== null ? (s.return = u, Me = s) : w_(e, t, a, i);
      }
    }
    function w_(e, t, a, i) {
      for (; Me !== null; ) {
        var u = Me;
        if ((u.flags & yn) !== Ie) {
          It(u);
          try {
            b_(t, u, a, i);
          } catch (f) {
            hn(u, u.return, f);
          }
          kn();
        }
        if (u === e) {
          Me = null;
          return;
        }
        var s = u.sibling;
        if (s !== null) {
          s.return = u.return, Me = s;
          return;
        }
        Me = u.return;
      }
    }
    function b_(e, t, a, i) {
      switch (t.tag) {
        case W:
        case ge:
        case de: {
          if (t.mode & rt) {
            kS();
            try {
              Zo(Hr | pr, t);
            } finally {
              DS(t);
            }
          } else
            Zo(Hr | pr, t);
          break;
        }
      }
    }
    function x_(e) {
      Me = e, __();
    }
    function __() {
      for (; Me !== null; ) {
        var e = Me, t = e.child;
        if ((Me.flags & Pt) !== Ie) {
          var a = e.deletions;
          if (a !== null) {
            for (var i = 0; i < a.length; i++) {
              var u = a[i];
              Me = u, O_(u, e);
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
            Me = e;
          }
        }
        (e.subtreeFlags & $a) !== Ie && t !== null ? (t.return = e, Me = t) : D_();
      }
    }
    function D_() {
      for (; Me !== null; ) {
        var e = Me;
        (e.flags & yn) !== Ie && (It(e), k_(e), kn());
        var t = e.sibling;
        if (t !== null) {
          t.return = e.return, Me = t;
          return;
        }
        Me = e.return;
      }
    }
    function k_(e) {
      switch (e.tag) {
        case W:
        case ge:
        case de: {
          e.mode & rt ? (kS(), pl(Hr | pr, e, e.return), DS(e)) : pl(Hr | pr, e, e.return);
          break;
        }
      }
    }
    function O_(e, t) {
      for (; Me !== null; ) {
        var a = Me;
        It(a), L_(a, t), kn();
        var i = a.child;
        i !== null ? (i.return = a, Me = i) : M_(e);
      }
    }
    function M_(e) {
      for (; Me !== null; ) {
        var t = Me, a = t.sibling, i = t.return;
        if (bC(t), t === e) {
          Me = null;
          return;
        }
        if (a !== null) {
          a.return = i, Me = a;
          return;
        }
        Me = i;
      }
    }
    function L_(e, t) {
      switch (e.tag) {
        case W:
        case ge:
        case de: {
          e.mode & rt ? (kS(), pl(Hr, e, t), DS(e)) : pl(Hr, e, t);
          break;
        }
      }
    }
    function N_(e) {
      switch (e.tag) {
        case W:
        case ge:
        case de: {
          try {
            Zo(vr | pr, e);
          } catch (a) {
            hn(e, e.return, a);
          }
          break;
        }
        case q: {
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
    function A_(e) {
      switch (e.tag) {
        case W:
        case ge:
        case de: {
          try {
            Zo(Hr | pr, e);
          } catch (t) {
            hn(e, e.return, t);
          }
          break;
        }
      }
    }
    function z_(e) {
      switch (e.tag) {
        case W:
        case ge:
        case de: {
          try {
            pl(vr | pr, e, e.return);
          } catch (a) {
            hn(e, e.return, a);
          }
          break;
        }
        case q: {
          var t = e.stateNode;
          typeof t.componentWillUnmount == "function" && u0(e, e.return, t);
          break;
        }
      }
    }
    function U_(e) {
      switch (e.tag) {
        case W:
        case ge:
        case de:
          try {
            pl(Hr | pr, e, e.return);
          } catch (t) {
            hn(e, e.return, t);
          }
      }
    }
    if (typeof Symbol == "function" && Symbol.for) {
      var Wp = Symbol.for;
      Wp("selector.component"), Wp("selector.has_pseudo_class"), Wp("selector.role"), Wp("selector.test_id"), Wp("selector.text");
    }
    var F_ = [];
    function j_() {
      F_.forEach(function(e) {
        return e();
      });
    }
    var P_ = R.ReactCurrentActQueue;
    function H_(e) {
      {
        var t = (
          // $FlowExpectedError – Flow doesn't know about IS_REACT_ACT_ENVIRONMENT global
          typeof IS_REACT_ACT_ENVIRONMENT < "u" ? IS_REACT_ACT_ENVIRONMENT : void 0
        ), a = typeof jest < "u";
        return a && t !== !1;
      }
    }
    function AC() {
      {
        var e = (
          // $FlowExpectedError – Flow doesn't know about IS_REACT_ACT_ENVIRONMENT global
          typeof IS_REACT_ACT_ENVIRONMENT < "u" ? IS_REACT_ACT_ENVIRONMENT : void 0
        );
        return !e && P_.current !== null && E("The current testing environment is not configured to support act(...)"), e;
      }
    }
    var V_ = Math.ceil, f0 = R.ReactCurrentDispatcher, d0 = R.ReactCurrentOwner, Ir = R.ReactCurrentBatchConfig, ml = R.ReactCurrentActQueue, yr = (
      /*             */
      0
    ), zC = (
      /*               */
      1
    ), Yr = (
      /*                */
      2
    ), ji = (
      /*                */
      4
    ), Hu = 0, Qp = 1, ic = 2, Im = 3, Gp = 4, UC = 5, p0 = 6, Dt = yr, Oa = null, Pn = null, gr = X, Jl = X, v0 = Bo(X), Sr = Hu, qp = null, Ym = X, Kp = X, Wm = X, Xp = null, ti = null, h0 = 0, FC = 500, jC = 1 / 0, $_ = 500, Vu = null;
    function Zp() {
      jC = bn() + $_;
    }
    function PC() {
      return jC;
    }
    var Qm = !1, m0 = null, Kf = null, lc = !1, es = null, Jp = X, y0 = [], g0 = null, B_ = 50, ev = 0, S0 = null, E0 = !1, Gm = !1, I_ = 50, Xf = 0, qm = null, tv = cn, Km = X, HC = !1;
    function Xm() {
      return Oa;
    }
    function Ma() {
      return (Dt & (Yr | ji)) !== yr ? bn() : (tv !== cn || (tv = bn()), tv);
    }
    function ts(e) {
      var t = e.mode;
      if ((t & He) === Fe)
        return Be;
      if ((Dt & Yr) !== yr && gr !== X)
        return wo(gr);
      var a = Pb() !== jb;
      if (a) {
        if (Ir.transition !== null) {
          var i = Ir.transition;
          i._updatedFibers || (i._updatedFibers = /* @__PURE__ */ new Set()), i._updatedFibers.add(e);
        }
        return Km === In && (Km = sh()), Km;
      }
      var u = Qa();
      if (u !== In)
        return u;
      var s = Tw();
      return s;
    }
    function Y_(e) {
      var t = e.mode;
      return (t & He) === Fe ? Be : sa();
    }
    function Er(e, t, a, i) {
      hD(), HC && E("useInsertionEffect must not schedule updates."), E0 && (Gm = !0), xu(e, a, i), (Dt & Yr) !== X && e === Oa ? gD(t) : (xa && rf(e, t, a), SD(t), e === Oa && ((Dt & Yr) === yr && (Kp = st(Kp, a)), Sr === Gp && ns(e, gr)), ni(e, i), a === Be && Dt === yr && (t.mode & He) === Fe && // Treat `act` as if it's inside `batchedUpdates`, even in legacy mode.
      !ml.isBatchingLegacy && (Zp(), HE()));
    }
    function W_(e, t, a) {
      var i = e.current;
      i.lanes = t, xu(e, t, a), ni(e, a);
    }
    function Q_(e) {
      return (
        // TODO: Remove outdated deferRenderPhaseUpdateToNextBatch experiment. We
        // decided not to enable it.
        (Dt & Yr) !== yr
      );
    }
    function ni(e, t) {
      var a = e.callbackNode;
      ah(e, t);
      var i = wu(e, e === Oa ? gr : X);
      if (i === X) {
        a !== null && nR(a), e.callbackNode = null, e.callbackPriority = In;
        return;
      }
      var u = Un(i), s = e.callbackPriority;
      if (s === u && // Special case related to `act`. If the currently scheduled task is a
      // Scheduler task, rather than an `act` task, cancel it and re-scheduled
      // on the `act` queue.
      !(ml.current !== null && a !== _0)) {
        a == null && s !== Be && E("Expected scheduled callback to exist. This error is likely caused by a bug in React. Please file an issue.");
        return;
      }
      a != null && nR(a);
      var f;
      if (u === Be)
        e.tag === Io ? (ml.isBatchingLegacy !== null && (ml.didScheduleLegacyUpdate = !0), Cb(BC.bind(null, e))) : PE(BC.bind(null, e)), ml.current !== null ? ml.current.push(Yo) : bw(function() {
          (Dt & (Yr | ji)) === yr && Yo();
        }), f = null;
      else {
        var p;
        switch (dr(i)) {
          case Fn:
            p = Oc;
            break;
          case nl:
            p = yu;
            break;
          case ki:
            p = Di;
            break;
          case bo:
            p = Mc;
            break;
          default:
            p = Di;
            break;
        }
        f = D0(p, VC.bind(null, e));
      }
      e.callbackPriority = u, e.callbackNode = f;
    }
    function VC(e, t) {
      if (fx(), tv = cn, Km = X, (Dt & (Yr | ji)) !== yr)
        throw new Error("Should not already be working.");
      var a = e.callbackNode, i = Bu();
      if (i && e.callbackNode !== a)
        return null;
      var u = wu(e, e === Oa ? gr : X);
      if (u === X)
        return null;
      var s = !Ls(e, u) && !oh(e, u) && !t, f = s ? rD(e, u) : Jm(e, u);
      if (f !== Hu) {
        if (f === ic) {
          var p = Pl(e);
          p !== X && (u = p, f = C0(e, p));
        }
        if (f === Qp) {
          var v = qp;
          throw uc(e, X), ns(e, u), ni(e, bn()), v;
        }
        if (f === p0)
          ns(e, u);
        else {
          var g = !Ls(e, u), C = e.current.alternate;
          if (g && !q_(C)) {
            if (f = Jm(e, u), f === ic) {
              var k = Pl(e);
              k !== X && (u = k, f = C0(e, k));
            }
            if (f === Qp) {
              var _ = qp;
              throw uc(e, X), ns(e, u), ni(e, bn()), _;
            }
          }
          e.finishedWork = C, e.finishedLanes = u, G_(e, f, u);
        }
      }
      return ni(e, bn()), e.callbackNode === a ? VC.bind(null, e) : null;
    }
    function C0(e, t) {
      var a = Xp;
      if (af(e)) {
        var i = uc(e, t);
        i.flags |= On, vb(e.containerInfo);
      }
      var u = Jm(e, t);
      if (u !== ic) {
        var s = ti;
        ti = a, s !== null && $C(s);
      }
      return u;
    }
    function $C(e) {
      ti === null ? ti = e : ti.push.apply(ti, e);
    }
    function G_(e, t, a) {
      switch (t) {
        case Hu:
        case Qp:
          throw new Error("Root did not complete. This is a bug in React.");
        // Flow knows about invariant, so it complains if I add a break
        // statement, but eslint doesn't know about invariant, so it complains
        // if I do. eslint-disable-next-line no-fallthrough
        case ic: {
          oc(e, ti, Vu);
          break;
        }
        case Im: {
          if (ns(e, a), ih(a) && // do not delay if we're inside an act() scope
          !rR()) {
            var i = h0 + FC - bn();
            if (i > 10) {
              var u = wu(e, X);
              if (u !== X)
                break;
              var s = e.suspendedLanes;
              if (!bu(s, a)) {
                Ma(), tf(e, s);
                break;
              }
              e.timeoutHandle = gg(oc.bind(null, e, ti, Vu), i);
              break;
            }
          }
          oc(e, ti, Vu);
          break;
        }
        case Gp: {
          if (ns(e, a), uh(a))
            break;
          if (!rR()) {
            var f = nh(e, a), p = f, v = bn() - p, g = vD(v) - v;
            if (g > 10) {
              e.timeoutHandle = gg(oc.bind(null, e, ti, Vu), g);
              break;
            }
          }
          oc(e, ti, Vu);
          break;
        }
        case UC: {
          oc(e, ti, Vu);
          break;
        }
        default:
          throw new Error("Unknown root exit status.");
      }
    }
    function q_(e) {
      for (var t = e; ; ) {
        if (t.flags & Rs) {
          var a = t.updateQueue;
          if (a !== null) {
            var i = a.stores;
            if (i !== null)
              for (var u = 0; u < i.length; u++) {
                var s = i[u], f = s.getSnapshot, p = s.value;
                try {
                  if (!Oe(f(), p))
                    return !1;
                } catch {
                  return !1;
                }
              }
          }
        }
        var v = t.child;
        if (t.subtreeFlags & Rs && v !== null) {
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
    function ns(e, t) {
      t = Ns(t, Wm), t = Ns(t, Kp), fh(e, t);
    }
    function BC(e) {
      if (dx(), (Dt & (Yr | ji)) !== yr)
        throw new Error("Should not already be working.");
      Bu();
      var t = wu(e, X);
      if (!ca(t, Be))
        return ni(e, bn()), null;
      var a = Jm(e, t);
      if (e.tag !== Io && a === ic) {
        var i = Pl(e);
        i !== X && (t = i, a = C0(e, i));
      }
      if (a === Qp) {
        var u = qp;
        throw uc(e, X), ns(e, t), ni(e, bn()), u;
      }
      if (a === p0)
        throw new Error("Root did not complete. This is a bug in React.");
      var s = e.current.alternate;
      return e.finishedWork = s, e.finishedLanes = t, oc(e, ti, Vu), ni(e, bn()), null;
    }
    function K_(e, t) {
      t !== X && (Yd(e, st(t, Be)), ni(e, bn()), (Dt & (Yr | ji)) === yr && (Zp(), Yo()));
    }
    function R0(e, t) {
      var a = Dt;
      Dt |= zC;
      try {
        return e(t);
      } finally {
        Dt = a, Dt === yr && // Treat `act` as if it's inside `batchedUpdates`, even in legacy mode.
        !ml.isBatchingLegacy && (Zp(), HE());
      }
    }
    function X_(e, t, a, i, u) {
      var s = Qa(), f = Ir.transition;
      try {
        return Ir.transition = null, Mn(Fn), e(t, a, i, u);
      } finally {
        Mn(s), Ir.transition = f, Dt === yr && Zp();
      }
    }
    function $u(e) {
      es !== null && es.tag === Io && (Dt & (Yr | ji)) === yr && Bu();
      var t = Dt;
      Dt |= zC;
      var a = Ir.transition, i = Qa();
      try {
        return Ir.transition = null, Mn(Fn), e ? e() : void 0;
      } finally {
        Mn(i), Ir.transition = a, Dt = t, (Dt & (Yr | ji)) === yr && Yo();
      }
    }
    function IC() {
      return (Dt & (Yr | ji)) !== yr;
    }
    function Zm(e, t) {
      pa(v0, Jl, e), Jl = st(Jl, t);
    }
    function T0(e) {
      Jl = v0.current, da(v0, e);
    }
    function uc(e, t) {
      e.finishedWork = null, e.finishedLanes = X;
      var a = e.timeoutHandle;
      if (a !== Sg && (e.timeoutHandle = Sg, ww(a)), Pn !== null)
        for (var i = Pn.return; i !== null; ) {
          var u = i.alternate;
          SC(u, i), i = i.return;
        }
      Oa = e;
      var s = sc(e.current, null);
      return Pn = s, gr = Jl = t, Sr = Hu, qp = null, Ym = X, Kp = X, Wm = X, Xp = null, ti = null, Wb(), ol.discardPendingWarnings(), s;
    }
    function YC(e, t) {
      do {
        var a = Pn;
        try {
          if (om(), h1(), kn(), d0.current = null, a === null || a.return === null) {
            Sr = Qp, qp = t, Pn = null;
            return;
          }
          if (ot && a.mode & rt && Fm(a, !0), ct)
            if (ua(), t !== null && typeof t == "object" && typeof t.then == "function") {
              var i = t;
              Su(a, i, gr);
            } else
              bs(a, t, gr);
          Cx(e, a.return, a, t, gr), qC(a);
        } catch (u) {
          t = u, Pn === a && a !== null ? (a = a.return, Pn = a) : a = Pn;
          continue;
        }
        return;
      } while (!0);
    }
    function WC() {
      var e = f0.current;
      return f0.current = Lm, e === null ? Lm : e;
    }
    function QC(e) {
      f0.current = e;
    }
    function Z_() {
      h0 = bn();
    }
    function nv(e) {
      Ym = st(e, Ym);
    }
    function J_() {
      Sr === Hu && (Sr = Im);
    }
    function w0() {
      (Sr === Hu || Sr === Im || Sr === ic) && (Sr = Gp), Oa !== null && (Ms(Ym) || Ms(Kp)) && ns(Oa, gr);
    }
    function eD(e) {
      Sr !== Gp && (Sr = ic), Xp === null ? Xp = [e] : Xp.push(e);
    }
    function tD() {
      return Sr === Hu;
    }
    function Jm(e, t) {
      var a = Dt;
      Dt |= Yr;
      var i = WC();
      if (Oa !== e || gr !== t) {
        if (xa) {
          var u = e.memoizedUpdaters;
          u.size > 0 && (rv(e, gr), u.clear()), Wd(e, t);
        }
        Vu = zs(), uc(e, t);
      }
      gn(t);
      do
        try {
          nD();
          break;
        } catch (s) {
          YC(e, s);
        }
      while (!0);
      if (om(), Dt = a, QC(i), Pn !== null)
        throw new Error("Cannot commit an incomplete root. This error is likely caused by a bug in React. Please file an issue.");
      return Uc(), Oa = null, gr = X, Sr;
    }
    function nD() {
      for (; Pn !== null; )
        GC(Pn);
    }
    function rD(e, t) {
      var a = Dt;
      Dt |= Yr;
      var i = WC();
      if (Oa !== e || gr !== t) {
        if (xa) {
          var u = e.memoizedUpdaters;
          u.size > 0 && (rv(e, gr), u.clear()), Wd(e, t);
        }
        Vu = zs(), Zp(), uc(e, t);
      }
      gn(t);
      do
        try {
          aD();
          break;
        } catch (s) {
          YC(e, s);
        }
      while (!0);
      return om(), QC(i), Dt = a, Pn !== null ? (zc(), Hu) : (Uc(), Oa = null, gr = X, Sr);
    }
    function aD() {
      for (; Pn !== null && !kc(); )
        GC(Pn);
    }
    function GC(e) {
      var t = e.alternate;
      It(e);
      var a;
      (e.mode & rt) !== Fe ? (_S(e), a = b0(t, e, Jl), Fm(e, !0)) : a = b0(t, e, Jl), kn(), e.memoizedProps = e.pendingProps, a === null ? qC(e) : Pn = a, d0.current = null;
    }
    function qC(e) {
      var t = e;
      do {
        var a = t.alternate, i = t.return;
        if ((t.flags & Ta) === Ie) {
          It(t);
          var u = void 0;
          if ((t.mode & rt) === Fe ? u = gC(a, t, Jl) : (_S(t), u = gC(a, t, Jl), Fm(t, !1)), kn(), u !== null) {
            Pn = u;
            return;
          }
        } else {
          var s = Jx(a, t);
          if (s !== null) {
            s.flags &= Yv, Pn = s;
            return;
          }
          if ((t.mode & rt) !== Fe) {
            Fm(t, !1);
            for (var f = t.actualDuration, p = t.child; p !== null; )
              f += p.actualDuration, p = p.sibling;
            t.actualDuration = f;
          }
          if (i !== null)
            i.flags |= Ta, i.subtreeFlags = Ie, i.deletions = null;
          else {
            Sr = p0, Pn = null;
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
      Sr === Hu && (Sr = UC);
    }
    function oc(e, t, a) {
      var i = Qa(), u = Ir.transition;
      try {
        Ir.transition = null, Mn(Fn), iD(e, t, a, i);
      } finally {
        Ir.transition = u, Mn(i);
      }
      return null;
    }
    function iD(e, t, a, i) {
      do
        Bu();
      while (es !== null);
      if (mD(), (Dt & (Yr | ji)) !== yr)
        throw new Error("Should not already be working.");
      var u = e.finishedWork, s = e.finishedLanes;
      if (Ul(s), u === null)
        return Lc(), null;
      if (s === X && E("root.finishedLanes should not be empty during a commit. This is a bug in React."), e.finishedWork = null, e.finishedLanes = X, u === e.current)
        throw new Error("Cannot commit the same tree as before. This error is likely caused by a bug in React. Please file an issue.");
      e.callbackNode = null, e.callbackPriority = In;
      var f = st(u.lanes, u.childLanes);
      nf(e, f), e === Oa && (Oa = null, Pn = null, gr = X), ((u.subtreeFlags & $a) !== Ie || (u.flags & $a) !== Ie) && (lc || (lc = !0, g0 = a, D0(Di, function() {
        return Bu(), null;
      })));
      var p = (u.subtreeFlags & (co | ia | br | $a)) !== Ie, v = (u.flags & (co | ia | br | $a)) !== Ie;
      if (p || v) {
        var g = Ir.transition;
        Ir.transition = null;
        var C = Qa();
        Mn(Fn);
        var k = Dt;
        Dt |= ji, d0.current = null, a_(e, u), H1(), g_(e, u, s), yw(e.containerInfo), e.current = u, Fd(s), S_(u, e, s), mo(), Gv(), Dt = k, Mn(C), Ir.transition = g;
      } else
        e.current = u, H1();
      var _ = lc;
      if (lc ? (lc = !1, es = e, Jp = s) : (Xf = 0, qm = null), f = e.pendingLanes, f === X && (Kf = null), _ || JC(e.current, !1), po(u.stateNode, i), xa && e.memoizedUpdaters.clear(), j_(), ni(e, bn()), t !== null)
        for (var U = e.onRecoverableError, P = 0; P < t.length; P++) {
          var I = t[P], Se = I.stack, Qe = I.digest;
          U(I.value, {
            componentStack: Se,
            digest: Qe
          });
        }
      if (Qm) {
        Qm = !1;
        var Ve = m0;
        throw m0 = null, Ve;
      }
      return ca(Jp, Be) && e.tag !== Io && Bu(), f = e.pendingLanes, ca(f, Be) ? (cx(), e === S0 ? ev++ : (ev = 0, S0 = e)) : ev = 0, Yo(), Lc(), null;
    }
    function Bu() {
      if (es !== null) {
        var e = dr(Jp), t = By(ki, e), a = Ir.transition, i = Qa();
        try {
          return Ir.transition = null, Mn(t), uD();
        } finally {
          Mn(i), Ir.transition = a;
        }
      }
      return !1;
    }
    function lD(e) {
      y0.push(e), lc || (lc = !0, D0(Di, function() {
        return Bu(), null;
      }));
    }
    function uD() {
      if (es === null)
        return !1;
      var e = g0;
      g0 = null;
      var t = es, a = Jp;
      if (es = null, Jp = X, (Dt & (Yr | ji)) !== yr)
        throw new Error("Cannot flush passive effects while already rendering.");
      E0 = !0, Gm = !1, eh(a);
      var i = Dt;
      Dt |= ji, x_(t.current), R_(t, t.current, a, e);
      {
        var u = y0;
        y0 = [];
        for (var s = 0; s < u.length; s++) {
          var f = u[s];
          o_(t, f);
        }
      }
      jd(), JC(t.current, !0), Dt = i, Yo(), Gm ? t === qm ? Xf++ : (Xf = 0, qm = t) : Xf = 0, E0 = !1, Gm = !1, Ya(t);
      {
        var p = t.current.stateNode;
        p.effectDuration = 0, p.passiveEffectDuration = 0;
      }
      return !0;
    }
    function KC(e) {
      return Kf !== null && Kf.has(e);
    }
    function oD(e) {
      Kf === null ? Kf = /* @__PURE__ */ new Set([e]) : Kf.add(e);
    }
    function sD(e) {
      Qm || (Qm = !0, m0 = e);
    }
    var cD = sD;
    function XC(e, t, a) {
      var i = rc(a, t), u = G1(e, i, Be), s = Qo(e, u, Be), f = Ma();
      s !== null && (xu(s, Be, f), ni(s, f));
    }
    function hn(e, t, a) {
      if (t_(a), av(!1), e.tag === K) {
        XC(e, e, a);
        return;
      }
      var i = null;
      for (i = t; i !== null; ) {
        if (i.tag === K) {
          XC(i, e, a);
          return;
        } else if (i.tag === q) {
          var u = i.type, s = i.stateNode;
          if (typeof u.getDerivedStateFromError == "function" || typeof s.componentDidCatch == "function" && !KC(s)) {
            var f = rc(a, e), p = YS(i, f, Be), v = Qo(i, p, Be), g = Ma();
            v !== null && (xu(v, Be, g), ni(v, g));
            return;
          }
        }
        i = i.return;
      }
      E(`Internal React error: Attempted to capture a commit phase error inside a detached tree. This indicates a bug in React. Likely causes include deleting the same fiber more than once, committing an already-finished tree, or an inconsistent return pointer.

Error message:

%s`, a);
    }
    function fD(e, t, a) {
      var i = e.pingCache;
      i !== null && i.delete(t);
      var u = Ma();
      tf(e, a), ED(e), Oa === e && bu(gr, a) && (Sr === Gp || Sr === Im && ih(gr) && bn() - h0 < FC ? uc(e, X) : Wm = st(Wm, a)), ni(e, u);
    }
    function ZC(e, t) {
      t === In && (t = Y_(e));
      var a = Ma(), i = Ja(e, t);
      i !== null && (xu(i, t, a), ni(i, a));
    }
    function dD(e) {
      var t = e.memoizedState, a = In;
      t !== null && (a = t.retryLane), ZC(e, a);
    }
    function pD(e, t) {
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
      i !== null && i.delete(t), ZC(e, a);
    }
    function vD(e) {
      return e < 120 ? 120 : e < 480 ? 480 : e < 1080 ? 1080 : e < 1920 ? 1920 : e < 3e3 ? 3e3 : e < 4320 ? 4320 : V_(e / 1960) * 1960;
    }
    function hD() {
      if (ev > B_)
        throw ev = 0, S0 = null, new Error("Maximum update depth exceeded. This can happen when a component repeatedly calls setState inside componentWillUpdate or componentDidUpdate. React limits the number of nested updates to prevent infinite loops.");
      Xf > I_ && (Xf = 0, qm = null, E("Maximum update depth exceeded. This can happen when a component calls setState inside useEffect, but useEffect either doesn't have a dependency array, or one of the dependencies changes on every render."));
    }
    function mD() {
      ol.flushLegacyContextWarning(), ol.flushPendingUnsafeLifecycleWarnings();
    }
    function JC(e, t) {
      It(e), ey(e, aa, z_), t && ey(e, mu, U_), ey(e, aa, N_), t && ey(e, mu, A_), kn();
    }
    function ey(e, t, a) {
      for (var i = e, u = null; i !== null; ) {
        var s = i.subtreeFlags & t;
        i !== u && i.child !== null && s !== Ie ? i = i.child : ((i.flags & t) !== Ie && a(i), i.sibling !== null ? i = i.sibling : i = u = i.return);
      }
    }
    var ty = null;
    function eR(e) {
      {
        if ((Dt & Yr) !== yr || !(e.mode & He))
          return;
        var t = e.tag;
        if (t !== me && t !== K && t !== q && t !== W && t !== ge && t !== Le && t !== de)
          return;
        var a = at(e) || "ReactComponent";
        if (ty !== null) {
          if (ty.has(a))
            return;
          ty.add(a);
        } else
          ty = /* @__PURE__ */ new Set([a]);
        var i = wn;
        try {
          It(e), E("Can't perform a React state update on a component that hasn't mounted yet. This indicates that you have a side-effect in your render function that asynchronously later calls tries to update the component. Move this work to useEffect instead.");
        } finally {
          i ? It(e) : kn();
        }
      }
    }
    var b0;
    {
      var yD = null;
      b0 = function(e, t, a) {
        var i = oR(yD, t);
        try {
          return pC(e, t, a);
        } catch (s) {
          if (kb() || s !== null && typeof s == "object" && typeof s.then == "function")
            throw s;
          if (om(), h1(), SC(e, t), oR(t, i), t.mode & rt && _S(t), hu(null, pC, null, e, t, a), jy()) {
            var u = Dd();
            typeof u == "object" && u !== null && u._suppressLogging && typeof s == "object" && s !== null && !s._suppressLogging && (s._suppressLogging = !0);
          }
          throw s;
        }
      };
    }
    var tR = !1, x0;
    x0 = /* @__PURE__ */ new Set();
    function gD(e) {
      if (Jr && !ux())
        switch (e.tag) {
          case W:
          case ge:
          case de: {
            var t = Pn && at(Pn) || "Unknown", a = t;
            if (!x0.has(a)) {
              x0.add(a);
              var i = at(e) || "Unknown";
              E("Cannot update a component (`%s`) while rendering a different component (`%s`). To locate the bad setState() call inside `%s`, follow the stack trace as described in https://reactjs.org/link/setstate-in-render", i, t, t);
            }
            break;
          }
          case q: {
            tR || (E("Cannot update during an existing state transition (such as within `render`). Render methods should be a pure function of props and state."), tR = !0);
            break;
          }
        }
    }
    function rv(e, t) {
      if (xa) {
        var a = e.memoizedUpdaters;
        a.forEach(function(i) {
          rf(e, i, t);
        });
      }
    }
    var _0 = {};
    function D0(e, t) {
      {
        var a = ml.current;
        return a !== null ? (a.push(t), _0) : Dc(e, t);
      }
    }
    function nR(e) {
      if (e !== _0)
        return Qv(e);
    }
    function rR() {
      return ml.current !== null;
    }
    function SD(e) {
      {
        if (e.mode & He) {
          if (!AC())
            return;
        } else if (!H_() || Dt !== yr || e.tag !== W && e.tag !== ge && e.tag !== de)
          return;
        if (ml.current === null) {
          var t = wn;
          try {
            It(e), E(`An update to %s inside a test was not wrapped in act(...).

When testing, code that causes React state updates should be wrapped into act(...):

act(() => {
  /* fire events that update state */
});
/* assert on the output */

This ensures that you're testing the behavior the user would see in the browser. Learn more at https://reactjs.org/link/wrap-tests-with-act`, at(e));
          } finally {
            t ? It(e) : kn();
          }
        }
      }
    }
    function ED(e) {
      e.tag !== Io && AC() && ml.current === null && E(`A suspended resource finished loading inside a test, but the event was not wrapped in act(...).

When testing, code that resolves suspended data should be wrapped into act(...):

act(() => {
  /* finish loading suspended data */
});
/* assert on the output */

This ensures that you're testing the behavior the user would see in the browser. Learn more at https://reactjs.org/link/wrap-tests-with-act`);
    }
    function av(e) {
      HC = e;
    }
    var Pi = null, Zf = null, CD = function(e) {
      Pi = e;
    };
    function Jf(e) {
      {
        if (Pi === null)
          return e;
        var t = Pi(e);
        return t === void 0 ? e : t.current;
      }
    }
    function k0(e) {
      return Jf(e);
    }
    function O0(e) {
      {
        if (Pi === null)
          return e;
        var t = Pi(e);
        if (t === void 0) {
          if (e != null && typeof e.render == "function") {
            var a = Jf(e.render);
            if (e.render !== a) {
              var i = {
                $$typeof: ae,
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
    function aR(e, t) {
      {
        if (Pi === null)
          return !1;
        var a = e.elementType, i = t.type, u = !1, s = typeof i == "object" && i !== null ? i.$$typeof : null;
        switch (e.tag) {
          case q: {
            typeof i == "function" && (u = !0);
            break;
          }
          case W: {
            (typeof i == "function" || s === Ke) && (u = !0);
            break;
          }
          case ge: {
            (s === ae || s === Ke) && (u = !0);
            break;
          }
          case Le:
          case de: {
            (s === wt || s === Ke) && (u = !0);
            break;
          }
          default:
            return !1;
        }
        if (u) {
          var f = Pi(a);
          if (f !== void 0 && f === Pi(i))
            return !0;
        }
        return !1;
      }
    }
    function iR(e) {
      {
        if (Pi === null || typeof WeakSet != "function")
          return;
        Zf === null && (Zf = /* @__PURE__ */ new WeakSet()), Zf.add(e);
      }
    }
    var RD = function(e, t) {
      {
        if (Pi === null)
          return;
        var a = t.staleFamilies, i = t.updatedFamilies;
        Bu(), $u(function() {
          M0(e.current, i, a);
        });
      }
    }, TD = function(e, t) {
      {
        if (e.context !== hi)
          return;
        Bu(), $u(function() {
          iv(t, e, null, null);
        });
      }
    };
    function M0(e, t, a) {
      {
        var i = e.alternate, u = e.child, s = e.sibling, f = e.tag, p = e.type, v = null;
        switch (f) {
          case W:
          case de:
          case q:
            v = p;
            break;
          case ge:
            v = p.render;
            break;
        }
        if (Pi === null)
          throw new Error("Expected resolveFamily to be set during hot reload.");
        var g = !1, C = !1;
        if (v !== null) {
          var k = Pi(v);
          k !== void 0 && (a.has(k) ? C = !0 : t.has(k) && (f === q ? C = !0 : g = !0));
        }
        if (Zf !== null && (Zf.has(e) || i !== null && Zf.has(i)) && (C = !0), C && (e._debugNeedsRemount = !0), C || g) {
          var _ = Ja(e, Be);
          _ !== null && Er(_, e, Be, cn);
        }
        u !== null && !C && M0(u, t, a), s !== null && M0(s, t, a);
      }
    }
    var wD = function(e, t) {
      {
        var a = /* @__PURE__ */ new Set(), i = new Set(t.map(function(u) {
          return u.current;
        }));
        return L0(e.current, i, a), a;
      }
    };
    function L0(e, t, a) {
      {
        var i = e.child, u = e.sibling, s = e.tag, f = e.type, p = null;
        switch (s) {
          case W:
          case de:
          case q:
            p = f;
            break;
          case ge:
            p = f.render;
            break;
        }
        var v = !1;
        p !== null && t.has(p) && (v = !0), v ? bD(e, a) : i !== null && L0(i, t, a), u !== null && L0(u, t, a);
      }
    }
    function bD(e, t) {
      {
        var a = xD(e, t);
        if (a)
          return;
        for (var i = e; ; ) {
          switch (i.tag) {
            case ne:
              t.add(i.stateNode);
              return;
            case oe:
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
    function xD(e, t) {
      for (var a = e, i = !1; ; ) {
        if (a.tag === ne)
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
    var N0;
    {
      N0 = !1;
      try {
        var lR = Object.preventExtensions({});
      } catch {
        N0 = !0;
      }
    }
    function _D(e, t, a, i) {
      this.tag = e, this.key = a, this.elementType = null, this.type = null, this.stateNode = null, this.return = null, this.child = null, this.sibling = null, this.index = 0, this.ref = null, this.pendingProps = t, this.memoizedProps = null, this.updateQueue = null, this.memoizedState = null, this.dependencies = null, this.mode = i, this.flags = Ie, this.subtreeFlags = Ie, this.deletions = null, this.lanes = X, this.childLanes = X, this.alternate = null, this.actualDuration = Number.NaN, this.actualStartTime = Number.NaN, this.selfBaseDuration = Number.NaN, this.treeBaseDuration = Number.NaN, this.actualDuration = 0, this.actualStartTime = -1, this.selfBaseDuration = 0, this.treeBaseDuration = 0, this._debugSource = null, this._debugOwner = null, this._debugNeedsRemount = !1, this._debugHookTypes = null, !N0 && typeof Object.preventExtensions == "function" && Object.preventExtensions(this);
    }
    var mi = function(e, t, a, i) {
      return new _D(e, t, a, i);
    };
    function A0(e) {
      var t = e.prototype;
      return !!(t && t.isReactComponent);
    }
    function DD(e) {
      return typeof e == "function" && !A0(e) && e.defaultProps === void 0;
    }
    function kD(e) {
      if (typeof e == "function")
        return A0(e) ? q : W;
      if (e != null) {
        var t = e.$$typeof;
        if (t === ae)
          return ge;
        if (t === wt)
          return Le;
      }
      return me;
    }
    function sc(e, t) {
      var a = e.alternate;
      a === null ? (a = mi(e.tag, t, e.key, e.mode), a.elementType = e.elementType, a.type = e.type, a.stateNode = e.stateNode, a._debugSource = e._debugSource, a._debugOwner = e._debugOwner, a._debugHookTypes = e._debugHookTypes, a.alternate = e, e.alternate = a) : (a.pendingProps = t, a.type = e.type, a.flags = Ie, a.subtreeFlags = Ie, a.deletions = null, a.actualDuration = 0, a.actualStartTime = -1), a.flags = e.flags & cr, a.childLanes = e.childLanes, a.lanes = e.lanes, a.child = e.child, a.memoizedProps = e.memoizedProps, a.memoizedState = e.memoizedState, a.updateQueue = e.updateQueue;
      var i = e.dependencies;
      switch (a.dependencies = i === null ? null : {
        lanes: i.lanes,
        firstContext: i.firstContext
      }, a.sibling = e.sibling, a.index = e.index, a.ref = e.ref, a.selfBaseDuration = e.selfBaseDuration, a.treeBaseDuration = e.treeBaseDuration, a._debugNeedsRemount = e._debugNeedsRemount, a.tag) {
        case me:
        case W:
        case de:
          a.type = Jf(e.type);
          break;
        case q:
          a.type = k0(e.type);
          break;
        case ge:
          a.type = O0(e.type);
          break;
      }
      return a;
    }
    function OD(e, t) {
      e.flags &= cr | dn;
      var a = e.alternate;
      if (a === null)
        e.childLanes = X, e.lanes = t, e.child = null, e.subtreeFlags = Ie, e.memoizedProps = null, e.memoizedState = null, e.updateQueue = null, e.dependencies = null, e.stateNode = null, e.selfBaseDuration = 0, e.treeBaseDuration = 0;
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
    function MD(e, t, a) {
      var i;
      return e === Zh ? (i = He, t === !0 && (i |= gt, i |= _a)) : i = Fe, xa && (i |= rt), mi(K, null, null, i);
    }
    function z0(e, t, a, i, u, s) {
      var f = me, p = e;
      if (typeof e == "function")
        A0(e) ? (f = q, p = k0(p)) : p = Jf(p);
      else if (typeof e == "string")
        f = ne;
      else
        e: switch (e) {
          case Ra:
            return rs(a.children, u, s, t);
          case Ci:
            f = ze, u |= gt, (u & He) !== Fe && (u |= _a);
            break;
          case Ri:
            return LD(a, u, s, t);
          case Pe:
            return ND(a, u, s, t);
          case Et:
            return AD(a, u, s, t);
          case an:
            return uR(a, u, s, t);
          case fn:
          // eslint-disable-next-line no-fallthrough
          case ht:
          // eslint-disable-next-line no-fallthrough
          case wr:
          // eslint-disable-next-line no-fallthrough
          case Ti:
          // eslint-disable-next-line no-fallthrough
          case Vn:
          // eslint-disable-next-line no-fallthrough
          default: {
            if (typeof e == "object" && e !== null)
              switch (e.$$typeof) {
                case b:
                  f = _e;
                  break e;
                case J:
                  f = qe;
                  break e;
                case ae:
                  f = ge, p = O0(p);
                  break e;
                case wt:
                  f = Le;
                  break e;
                case Ke:
                  f = Xt, p = null;
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
      var C = mi(f, a, t, u);
      return C.elementType = e, C.type = p, C.lanes = s, C._debugOwner = i, C;
    }
    function U0(e, t, a) {
      var i = null;
      i = e._owner;
      var u = e.type, s = e.key, f = e.props, p = z0(u, s, f, i, t, a);
      return p._debugSource = e._source, p._debugOwner = e._owner, p;
    }
    function rs(e, t, a, i) {
      var u = mi(we, e, i, t);
      return u.lanes = a, u;
    }
    function LD(e, t, a, i) {
      typeof e.id != "string" && E('Profiler must specify an "id" of type `string` as a prop. Received the type `%s` instead.', typeof e.id);
      var u = mi(Ne, e, i, t | rt);
      return u.elementType = Ri, u.lanes = a, u.stateNode = {
        effectDuration: 0,
        passiveEffectDuration: 0
      }, u;
    }
    function ND(e, t, a, i) {
      var u = mi($, e, i, t);
      return u.elementType = Pe, u.lanes = a, u;
    }
    function AD(e, t, a, i) {
      var u = mi(Ot, e, i, t);
      return u.elementType = Et, u.lanes = a, u;
    }
    function uR(e, t, a, i) {
      var u = mi(Ye, e, i, t);
      u.elementType = an, u.lanes = a;
      var s = {
        isHidden: !1
      };
      return u.stateNode = s, u;
    }
    function F0(e, t, a) {
      var i = mi(fe, e, null, t);
      return i.lanes = a, i;
    }
    function zD() {
      var e = mi(ne, null, null, Fe);
      return e.elementType = "DELETED", e;
    }
    function UD(e) {
      var t = mi(Ht, null, null, Fe);
      return t.stateNode = e, t;
    }
    function j0(e, t, a) {
      var i = e.children !== null ? e.children : [], u = mi(oe, i, e.key, t);
      return u.lanes = a, u.stateNode = {
        containerInfo: e.containerInfo,
        pendingChildren: null,
        // Used by persistent updates
        implementation: e.implementation
      }, u;
    }
    function oR(e, t) {
      return e === null && (e = mi(me, null, null, Fe)), e.tag = t.tag, e.key = t.key, e.elementType = t.elementType, e.type = t.type, e.stateNode = t.stateNode, e.return = t.return, e.child = t.child, e.sibling = t.sibling, e.index = t.index, e.ref = t.ref, e.pendingProps = t.pendingProps, e.memoizedProps = t.memoizedProps, e.updateQueue = t.updateQueue, e.memoizedState = t.memoizedState, e.dependencies = t.dependencies, e.mode = t.mode, e.flags = t.flags, e.subtreeFlags = t.subtreeFlags, e.deletions = t.deletions, e.lanes = t.lanes, e.childLanes = t.childLanes, e.alternate = t.alternate, e.actualDuration = t.actualDuration, e.actualStartTime = t.actualStartTime, e.selfBaseDuration = t.selfBaseDuration, e.treeBaseDuration = t.treeBaseDuration, e._debugSource = t._debugSource, e._debugOwner = t._debugOwner, e._debugNeedsRemount = t._debugNeedsRemount, e._debugHookTypes = t._debugHookTypes, e;
    }
    function FD(e, t, a, i, u) {
      this.tag = t, this.containerInfo = e, this.pendingChildren = null, this.current = null, this.pingCache = null, this.finishedWork = null, this.timeoutHandle = Sg, this.context = null, this.pendingContext = null, this.callbackNode = null, this.callbackPriority = In, this.eventTimes = As(X), this.expirationTimes = As(cn), this.pendingLanes = X, this.suspendedLanes = X, this.pingedLanes = X, this.expiredLanes = X, this.mutableReadLanes = X, this.finishedLanes = X, this.entangledLanes = X, this.entanglements = As(X), this.identifierPrefix = i, this.onRecoverableError = u, this.mutableSourceEagerHydrationData = null, this.effectDuration = 0, this.passiveEffectDuration = 0;
      {
        this.memoizedUpdaters = /* @__PURE__ */ new Set();
        for (var s = this.pendingUpdatersLaneMap = [], f = 0; f < Ds; f++)
          s.push(/* @__PURE__ */ new Set());
      }
      switch (t) {
        case Zh:
          this._debugRootType = a ? "hydrateRoot()" : "createRoot()";
          break;
        case Io:
          this._debugRootType = a ? "hydrate()" : "render()";
          break;
      }
    }
    function sR(e, t, a, i, u, s, f, p, v, g) {
      var C = new FD(e, t, a, p, v), k = MD(t, s);
      C.current = k, k.stateNode = C;
      {
        var _ = {
          element: i,
          isDehydrated: a,
          cache: null,
          // not enabled yet
          transitions: null,
          pendingSuspenseBoundaries: null
        };
        k.memoizedState = _;
      }
      return Xg(k), C;
    }
    var P0 = "18.3.1";
    function jD(e, t, a) {
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
    var H0, V0;
    H0 = !1, V0 = {};
    function cR(e) {
      if (!e)
        return hi;
      var t = Pa(e), a = Eb(t);
      if (t.tag === q) {
        var i = t.type;
        if (Wl(i))
          return FE(t, i, a);
      }
      return a;
    }
    function PD(e, t) {
      {
        var a = Pa(e);
        if (a === void 0) {
          if (typeof e.render == "function")
            throw new Error("Unable to find node on an unmounted component.");
          var i = Object.keys(e).join(",");
          throw new Error("Argument appears to not be a ReactComponent. Keys: " + i);
        }
        var u = Ba(a);
        if (u === null)
          return null;
        if (u.mode & gt) {
          var s = at(a) || "Component";
          if (!V0[s]) {
            V0[s] = !0;
            var f = wn;
            try {
              It(u), a.mode & gt ? E("%s is deprecated in StrictMode. %s was passed an instance of %s which is inside StrictMode. Instead, add a ref directly to the element you want to reference. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-find-node", t, t, s) : E("%s is deprecated in StrictMode. %s was passed an instance of %s which renders StrictMode children. Instead, add a ref directly to the element you want to reference. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-find-node", t, t, s);
            } finally {
              f ? It(f) : kn();
            }
          }
        }
        return u.stateNode;
      }
    }
    function fR(e, t, a, i, u, s, f, p) {
      var v = !1, g = null;
      return sR(e, t, v, g, a, i, u, s, f);
    }
    function dR(e, t, a, i, u, s, f, p, v, g) {
      var C = !0, k = sR(a, i, C, e, u, s, f, p, v);
      k.context = cR(null);
      var _ = k.current, U = Ma(), P = ts(_), I = ju(U, P);
      return I.callback = t ?? null, Qo(_, I, P), W_(k, P, U), k;
    }
    function iv(e, t, a, i) {
      Ud(t, e);
      var u = t.current, s = Ma(), f = ts(u);
      Pd(f);
      var p = cR(a);
      t.context === null ? t.context = p : t.pendingContext = p, Jr && wn !== null && !H0 && (H0 = !0, E(`Render methods should be a pure function of props and state; triggering nested component updates from render is not allowed. If necessary, trigger nested updates in componentDidUpdate.

Check the render method of %s.`, at(wn) || "Unknown"));
      var v = ju(s, f);
      v.payload = {
        element: e
      }, i = i === void 0 ? null : i, i !== null && (typeof i != "function" && E("render(...): Expected the last optional `callback` argument to be a function. Instead received: %s.", i), v.callback = i);
      var g = Qo(u, v, f);
      return g !== null && (Er(g, u, f, s), pm(g, u, f)), f;
    }
    function ny(e) {
      var t = e.current;
      if (!t.child)
        return null;
      switch (t.child.tag) {
        case ne:
          return t.child.stateNode;
        default:
          return t.child.stateNode;
      }
    }
    function HD(e) {
      switch (e.tag) {
        case K: {
          var t = e.stateNode;
          if (af(t)) {
            var a = $d(t);
            K_(t, a);
          }
          break;
        }
        case $: {
          $u(function() {
            var u = Ja(e, Be);
            if (u !== null) {
              var s = Ma();
              Er(u, e, Be, s);
            }
          });
          var i = Be;
          $0(e, i);
          break;
        }
      }
    }
    function pR(e, t) {
      var a = e.memoizedState;
      a !== null && a.dehydrated !== null && (a.retryLane = ch(a.retryLane, t));
    }
    function $0(e, t) {
      pR(e, t);
      var a = e.alternate;
      a && pR(a, t);
    }
    function VD(e) {
      if (e.tag === $) {
        var t = Os, a = Ja(e, t);
        if (a !== null) {
          var i = Ma();
          Er(a, e, t, i);
        }
        $0(e, t);
      }
    }
    function $D(e) {
      if (e.tag === $) {
        var t = ts(e), a = Ja(e, t);
        if (a !== null) {
          var i = Ma();
          Er(a, e, t, i);
        }
        $0(e, t);
      }
    }
    function vR(e) {
      var t = Wv(e);
      return t === null ? null : t.stateNode;
    }
    var hR = function(e) {
      return null;
    };
    function BD(e) {
      return hR(e);
    }
    var mR = function(e) {
      return !1;
    };
    function ID(e) {
      return mR(e);
    }
    var yR = null, gR = null, SR = null, ER = null, CR = null, RR = null, TR = null, wR = null, bR = null;
    {
      var xR = function(e, t, a) {
        var i = t[a], u = xt(e) ? e.slice() : mt({}, e);
        return a + 1 === t.length ? (xt(u) ? u.splice(i, 1) : delete u[i], u) : (u[i] = xR(e[i], t, a + 1), u);
      }, _R = function(e, t) {
        return xR(e, t, 0);
      }, DR = function(e, t, a, i) {
        var u = t[i], s = xt(e) ? e.slice() : mt({}, e);
        if (i + 1 === t.length) {
          var f = a[i];
          s[f] = s[u], xt(s) ? s.splice(u, 1) : delete s[u];
        } else
          s[u] = DR(
            // $FlowFixMe number or string is fine here
            e[u],
            t,
            a,
            i + 1
          );
        return s;
      }, kR = function(e, t, a) {
        if (t.length !== a.length) {
          B("copyWithRename() expects paths of the same length");
          return;
        } else
          for (var i = 0; i < a.length - 1; i++)
            if (t[i] !== a[i]) {
              B("copyWithRename() expects paths to be the same except for the deepest key");
              return;
            }
        return DR(e, t, a, 0);
      }, OR = function(e, t, a, i) {
        if (a >= t.length)
          return i;
        var u = t[a], s = xt(e) ? e.slice() : mt({}, e);
        return s[u] = OR(e[u], t, a + 1, i), s;
      }, MR = function(e, t, a) {
        return OR(e, t, 0, a);
      }, B0 = function(e, t) {
        for (var a = e.memoizedState; a !== null && t > 0; )
          a = a.next, t--;
        return a;
      };
      yR = function(e, t, a, i) {
        var u = B0(e, t);
        if (u !== null) {
          var s = MR(u.memoizedState, a, i);
          u.memoizedState = s, u.baseState = s, e.memoizedProps = mt({}, e.memoizedProps);
          var f = Ja(e, Be);
          f !== null && Er(f, e, Be, cn);
        }
      }, gR = function(e, t, a) {
        var i = B0(e, t);
        if (i !== null) {
          var u = _R(i.memoizedState, a);
          i.memoizedState = u, i.baseState = u, e.memoizedProps = mt({}, e.memoizedProps);
          var s = Ja(e, Be);
          s !== null && Er(s, e, Be, cn);
        }
      }, SR = function(e, t, a, i) {
        var u = B0(e, t);
        if (u !== null) {
          var s = kR(u.memoizedState, a, i);
          u.memoizedState = s, u.baseState = s, e.memoizedProps = mt({}, e.memoizedProps);
          var f = Ja(e, Be);
          f !== null && Er(f, e, Be, cn);
        }
      }, ER = function(e, t, a) {
        e.pendingProps = MR(e.memoizedProps, t, a), e.alternate && (e.alternate.pendingProps = e.pendingProps);
        var i = Ja(e, Be);
        i !== null && Er(i, e, Be, cn);
      }, CR = function(e, t) {
        e.pendingProps = _R(e.memoizedProps, t), e.alternate && (e.alternate.pendingProps = e.pendingProps);
        var a = Ja(e, Be);
        a !== null && Er(a, e, Be, cn);
      }, RR = function(e, t, a) {
        e.pendingProps = kR(e.memoizedProps, t, a), e.alternate && (e.alternate.pendingProps = e.pendingProps);
        var i = Ja(e, Be);
        i !== null && Er(i, e, Be, cn);
      }, TR = function(e) {
        var t = Ja(e, Be);
        t !== null && Er(t, e, Be, cn);
      }, wR = function(e) {
        hR = e;
      }, bR = function(e) {
        mR = e;
      };
    }
    function YD(e) {
      var t = Ba(e);
      return t === null ? null : t.stateNode;
    }
    function WD(e) {
      return null;
    }
    function QD() {
      return wn;
    }
    function GD(e) {
      var t = e.findFiberByHostInstance, a = R.ReactCurrentDispatcher;
      return zd({
        bundleType: e.bundleType,
        version: e.version,
        rendererPackageName: e.rendererPackageName,
        rendererConfig: e.rendererConfig,
        overrideHookState: yR,
        overrideHookStateDeletePath: gR,
        overrideHookStateRenamePath: SR,
        overrideProps: ER,
        overridePropsDeletePath: CR,
        overridePropsRenamePath: RR,
        setErrorHandler: wR,
        setSuspenseHandler: bR,
        scheduleUpdate: TR,
        currentDispatcherRef: a,
        findHostInstanceByFiber: YD,
        findFiberByHostInstance: t || WD,
        // React Refresh
        findHostInstancesForRefresh: wD,
        scheduleRefresh: RD,
        scheduleRoot: TD,
        setRefreshHandler: CD,
        // Enables DevTools to append owner stacks to error messages in DEV mode.
        getCurrentFiber: QD,
        // Enables DevTools to detect reconciler version rather than renderer version
        // which may not match for third party renderers.
        reconcilerVersion: P0
      });
    }
    var LR = typeof reportError == "function" ? (
      // In modern browsers, reportError will dispatch an error event,
      // emulating an uncaught JavaScript error.
      reportError
    ) : function(e) {
      console.error(e);
    };
    function I0(e) {
      this._internalRoot = e;
    }
    ry.prototype.render = I0.prototype.render = function(e) {
      var t = this._internalRoot;
      if (t === null)
        throw new Error("Cannot update an unmounted root.");
      {
        typeof arguments[1] == "function" ? E("render(...): does not support the second callback argument. To execute a side effect after rendering, declare it in a component body with useEffect().") : ay(arguments[1]) ? E("You passed a container to the second argument of root.render(...). You don't need to pass it again since you already passed it to create the root.") : typeof arguments[1] < "u" && E("You passed a second argument to root.render(...) but it only accepts one argument.");
        var a = t.containerInfo;
        if (a.nodeType !== $n) {
          var i = vR(t.current);
          i && i.parentNode !== a && E("render(...): It looks like the React-rendered content of the root container was removed without using React. This is not supported and will cause errors. Instead, call root.unmount() to empty a root's container.");
        }
      }
      iv(e, t, null, null);
    }, ry.prototype.unmount = I0.prototype.unmount = function() {
      typeof arguments[0] == "function" && E("unmount(...): does not support a callback argument. To execute a side effect after rendering, declare it in a component body with useEffect().");
      var e = this._internalRoot;
      if (e !== null) {
        this._internalRoot = null;
        var t = e.containerInfo;
        IC() && E("Attempted to synchronously unmount a root while React was already rendering. React cannot finish unmounting the root until the current render has completed, which may lead to a race condition."), $u(function() {
          iv(null, e, null, null);
        }), LE(t);
      }
    };
    function qD(e, t) {
      if (!ay(e))
        throw new Error("createRoot(...): Target container is not a DOM element.");
      NR(e);
      var a = !1, i = !1, u = "", s = LR;
      t != null && (t.hydrate ? B("hydrate through createRoot is deprecated. Use ReactDOMClient.hydrateRoot(container, <App />) instead.") : typeof t == "object" && t !== null && t.$$typeof === ui && E(`You passed a JSX element to createRoot. You probably meant to call root.render instead. Example usage:

  let root = createRoot(domContainer);
  root.render(<App />);`), t.unstable_strictMode === !0 && (a = !0), t.identifierPrefix !== void 0 && (u = t.identifierPrefix), t.onRecoverableError !== void 0 && (s = t.onRecoverableError), t.transitionCallbacks !== void 0 && t.transitionCallbacks);
      var f = fR(e, Zh, null, a, i, u, s);
      Yh(f.current, e);
      var p = e.nodeType === $n ? e.parentNode : e;
      return fp(p), new I0(f);
    }
    function ry(e) {
      this._internalRoot = e;
    }
    function KD(e) {
      e && Wy(e);
    }
    ry.prototype.unstable_scheduleHydration = KD;
    function XD(e, t, a) {
      if (!ay(e))
        throw new Error("hydrateRoot(...): Target container is not a DOM element.");
      NR(e), t === void 0 && E("Must provide initial children as second argument to hydrateRoot. Example usage: hydrateRoot(domContainer, <App />)");
      var i = a ?? null, u = a != null && a.hydratedSources || null, s = !1, f = !1, p = "", v = LR;
      a != null && (a.unstable_strictMode === !0 && (s = !0), a.identifierPrefix !== void 0 && (p = a.identifierPrefix), a.onRecoverableError !== void 0 && (v = a.onRecoverableError));
      var g = dR(t, null, e, Zh, i, s, f, p, v);
      if (Yh(g.current, e), fp(e), u)
        for (var C = 0; C < u.length; C++) {
          var k = u[C];
          tx(g, k);
        }
      return new ry(g);
    }
    function ay(e) {
      return !!(e && (e.nodeType === ta || e.nodeType === fi || e.nodeType === su || !Q));
    }
    function lv(e) {
      return !!(e && (e.nodeType === ta || e.nodeType === fi || e.nodeType === su || e.nodeType === $n && e.nodeValue === " react-mount-point-unstable "));
    }
    function NR(e) {
      e.nodeType === ta && e.tagName && e.tagName.toUpperCase() === "BODY" && E("createRoot(): Creating roots directly with document.body is discouraged, since its children are often manipulated by third-party scripts and browser extensions. This may lead to subtle reconciliation issues. Try using a container element created for your app."), Rp(e) && (e._reactRootContainer ? E("You are calling ReactDOMClient.createRoot() on a container that was previously passed to ReactDOM.render(). This is not supported.") : E("You are calling ReactDOMClient.createRoot() on a container that has already been passed to createRoot() before. Instead, call root.render() on the existing root instead if you want to update it."));
    }
    var ZD = R.ReactCurrentOwner, AR;
    AR = function(e) {
      if (e._reactRootContainer && e.nodeType !== $n) {
        var t = vR(e._reactRootContainer.current);
        t && t.parentNode !== e && E("render(...): It looks like the React-rendered content of this container was removed without using React. This is not supported and will cause errors. Instead, call ReactDOM.unmountComponentAtNode to empty a container.");
      }
      var a = !!e._reactRootContainer, i = Y0(e), u = !!(i && $o(i));
      u && !a && E("render(...): Replacing React-rendered children with a new root component. If you intended to update the children of this node, you should instead have the existing children update their state and render the new components instead of calling ReactDOM.render."), e.nodeType === ta && e.tagName && e.tagName.toUpperCase() === "BODY" && E("render(): Rendering components directly into document.body is discouraged, since its children are often manipulated by third-party scripts and browser extensions. This may lead to subtle reconciliation issues. Try rendering into a container element created for your app.");
    };
    function Y0(e) {
      return e ? e.nodeType === fi ? e.documentElement : e.firstChild : null;
    }
    function zR() {
    }
    function JD(e, t, a, i, u) {
      if (u) {
        if (typeof i == "function") {
          var s = i;
          i = function() {
            var _ = ny(f);
            s.call(_);
          };
        }
        var f = dR(
          t,
          i,
          e,
          Io,
          null,
          // hydrationCallbacks
          !1,
          // isStrictMode
          !1,
          // concurrentUpdatesByDefaultOverride,
          "",
          // identifierPrefix
          zR
        );
        e._reactRootContainer = f, Yh(f.current, e);
        var p = e.nodeType === $n ? e.parentNode : e;
        return fp(p), $u(), f;
      } else {
        for (var v; v = e.lastChild; )
          e.removeChild(v);
        if (typeof i == "function") {
          var g = i;
          i = function() {
            var _ = ny(C);
            g.call(_);
          };
        }
        var C = fR(
          e,
          Io,
          null,
          // hydrationCallbacks
          !1,
          // isStrictMode
          !1,
          // concurrentUpdatesByDefaultOverride,
          "",
          // identifierPrefix
          zR
        );
        e._reactRootContainer = C, Yh(C.current, e);
        var k = e.nodeType === $n ? e.parentNode : e;
        return fp(k), $u(function() {
          iv(t, C, a, i);
        }), C;
      }
    }
    function ek(e, t) {
      e !== null && typeof e != "function" && E("%s(...): Expected the last optional `callback` argument to be a function. Instead received: %s.", t, e);
    }
    function iy(e, t, a, i, u) {
      AR(a), ek(u === void 0 ? null : u, "render");
      var s = a._reactRootContainer, f;
      if (!s)
        f = JD(a, t, e, u, i);
      else {
        if (f = s, typeof u == "function") {
          var p = u;
          u = function() {
            var v = ny(f);
            p.call(v);
          };
        }
        iv(t, f, e, u);
      }
      return ny(f);
    }
    var UR = !1;
    function tk(e) {
      {
        UR || (UR = !0, E("findDOMNode is deprecated and will be removed in the next major release. Instead, add a ref directly to the element you want to reference. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-find-node"));
        var t = ZD.current;
        if (t !== null && t.stateNode !== null) {
          var a = t.stateNode._warnedAboutRefsInRender;
          a || E("%s is accessing findDOMNode inside its render(). render() should be a pure function of props and state. It should never access something that requires stale data from the previous render, such as refs. Move this logic to componentDidMount and componentDidUpdate instead.", bt(t.type) || "A component"), t.stateNode._warnedAboutRefsInRender = !0;
        }
      }
      return e == null ? null : e.nodeType === ta ? e : PD(e, "findDOMNode");
    }
    function nk(e, t, a) {
      if (E("ReactDOM.hydrate is no longer supported in React 18. Use hydrateRoot instead. Until you switch to the new API, your app will behave as if it's running React 17. Learn more: https://reactjs.org/link/switch-to-createroot"), !lv(t))
        throw new Error("Target container is not a DOM element.");
      {
        var i = Rp(t) && t._reactRootContainer === void 0;
        i && E("You are calling ReactDOM.hydrate() on a container that was previously passed to ReactDOMClient.createRoot(). This is not supported. Did you mean to call hydrateRoot(container, element)?");
      }
      return iy(null, e, t, !0, a);
    }
    function rk(e, t, a) {
      if (E("ReactDOM.render is no longer supported in React 18. Use createRoot instead. Until you switch to the new API, your app will behave as if it's running React 17. Learn more: https://reactjs.org/link/switch-to-createroot"), !lv(t))
        throw new Error("Target container is not a DOM element.");
      {
        var i = Rp(t) && t._reactRootContainer === void 0;
        i && E("You are calling ReactDOM.render() on a container that was previously passed to ReactDOMClient.createRoot(). This is not supported. Did you mean to call root.render(element)?");
      }
      return iy(null, e, t, !1, a);
    }
    function ak(e, t, a, i) {
      if (E("ReactDOM.unstable_renderSubtreeIntoContainer() is no longer supported in React 18. Consider using a portal instead. Until you switch to the createRoot API, your app will behave as if it's running React 17. Learn more: https://reactjs.org/link/switch-to-createroot"), !lv(a))
        throw new Error("Target container is not a DOM element.");
      if (e == null || !Cs(e))
        throw new Error("parentComponent must be a valid React Component");
      return iy(e, t, a, !1, i);
    }
    var FR = !1;
    function ik(e) {
      if (FR || (FR = !0, E("unmountComponentAtNode is deprecated and will be removed in the next major release. Switch to the createRoot API. Learn more: https://reactjs.org/link/switch-to-createroot")), !lv(e))
        throw new Error("unmountComponentAtNode(...): Target container is not a DOM element.");
      {
        var t = Rp(e) && e._reactRootContainer === void 0;
        t && E("You are calling ReactDOM.unmountComponentAtNode() on a container that was previously passed to ReactDOMClient.createRoot(). This is not supported. Did you mean to call root.unmount()?");
      }
      if (e._reactRootContainer) {
        {
          var a = Y0(e), i = a && !$o(a);
          i && E("unmountComponentAtNode(): The node you're attempting to unmount was rendered by another copy of React.");
        }
        return $u(function() {
          iy(null, null, e, !1, function() {
            e._reactRootContainer = null, LE(e);
          });
        }), !0;
      } else {
        {
          var u = Y0(e), s = !!(u && $o(u)), f = e.nodeType === ta && lv(e.parentNode) && !!e.parentNode._reactRootContainer;
          s && E("unmountComponentAtNode(): The node you're attempting to unmount was rendered by React and is not a top-level container. %s", f ? "You may have accidentally passed in a React root node instead of its container." : "Instead, have the parent component update its state and rerender in order to remove this component.");
        }
        return !1;
      }
    }
    Do(HD), Iy(VD), uf($D), ph(Qa), vh(Dr), (typeof Map != "function" || // $FlowIssue Flow incorrectly thinks Map has no prototype
    Map.prototype == null || typeof Map.prototype.forEach != "function" || typeof Set != "function" || // $FlowIssue Flow incorrectly thinks Set has no prototype
    Set.prototype == null || typeof Set.prototype.clear != "function" || typeof Set.prototype.forEach != "function") && E("React depends on Map and Set built-in types. Make sure that you load a polyfill in older browsers. https://reactjs.org/link/react-polyfills"), Bv(uw), Tc(R0, X_, $u);
    function lk(e, t) {
      var a = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : null;
      if (!ay(t))
        throw new Error("Target container is not a DOM element.");
      return jD(e, t, null, a);
    }
    function uk(e, t, a, i) {
      return ak(e, t, a, i);
    }
    var W0 = {
      usingClientEntryPoint: !1,
      // Keep in sync with ReactTestUtils.js.
      // This is an array for better minification.
      Events: [$o, Of, Wh, Rc, gs, R0]
    };
    function ok(e, t) {
      return W0.usingClientEntryPoint || E('You are importing createRoot from "react-dom" which is not supported. You should instead import it from "react-dom/client".'), qD(e, t);
    }
    function sk(e, t, a) {
      return W0.usingClientEntryPoint || E('You are importing hydrateRoot from "react-dom" which is not supported. You should instead import it from "react-dom/client".'), XD(e, t, a);
    }
    function ck(e) {
      return IC() && E("flushSync was called from inside a lifecycle method. React cannot flush when React is already rendering. Consider moving this call to a scheduler task or micro task."), $u(e);
    }
    var fk = GD({
      findFiberByHostInstance: Gs,
      bundleType: 1,
      version: P0,
      rendererPackageName: "react-dom"
    });
    if (!fk && rn && window.top === window.self && (navigator.userAgent.indexOf("Chrome") > -1 && navigator.userAgent.indexOf("Edge") === -1 || navigator.userAgent.indexOf("Firefox") > -1)) {
      var jR = window.location.protocol;
      /^(https?|file):$/.test(jR) && console.info("%cDownload the React DevTools for a better development experience: https://reactjs.org/link/react-devtools" + (jR === "file:" ? `
You might need to use a local HTTP server (instead of file://): https://reactjs.org/link/react-devtools-faq` : ""), "font-weight:bold");
    }
    ai.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = W0, ai.createPortal = lk, ai.createRoot = ok, ai.findDOMNode = tk, ai.flushSync = ck, ai.hydrate = nk, ai.hydrateRoot = sk, ai.render = rk, ai.unmountComponentAtNode = ik, ai.unstable_batchedUpdates = R0, ai.unstable_renderSubtreeIntoContainer = uk, ai.version = P0, typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error());
  }()), ai;
}
var sT;
function NO() {
  if (sT) return fy.exports;
  sT = 1;
  function m() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function")) {
      if (process.env.NODE_ENV !== "production")
        throw new Error("^_^");
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(m);
      } catch (S) {
        console.error(S);
      }
    }
  }
  return process.env.NODE_ENV === "production" ? (m(), fy.exports = MO()) : fy.exports = LO(), fy.exports;
}
var cT;
function AO() {
  if (cT) return td;
  cT = 1;
  var m = NO();
  if (process.env.NODE_ENV === "production")
    td.createRoot = m.createRoot, td.hydrateRoot = m.hydrateRoot;
  else {
    var S = m.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    td.createRoot = function(R, L) {
      S.usingClientEntryPoint = !0;
      try {
        return m.createRoot(R, L);
      } finally {
        S.usingClientEntryPoint = !1;
      }
    }, td.hydrateRoot = function(R, L, H) {
      S.usingClientEntryPoint = !0;
      try {
        return m.hydrateRoot(R, L, H);
      } finally {
        S.usingClientEntryPoint = !1;
      }
    };
  }
  return td;
}
var zO = AO();
function Ty() {
  for (var m = arguments.length, S = new Array(m), R = 0; R < m; R++)
    S[R] = arguments[R];
  return ET(S);
}
const UO = Ty`
`, FO = Ty`
	position: relative;
	width	: ${PR.stageW}px;
	height	: ${PR.stageH}px;
`, bT = Ty`
	position: absolute;
	top		: 0;
	left	: 0;
`, jO = ({ sys: m }) => {
  console.log("fn:Stage.tsx line:60 Stage 0");
  const S = cy((W) => W.aLay), R = cy((W) => W.addLayer);
  gy.addEventListener("ev_addLayer", (W) => R(W.detail));
  const L = cy((W) => W.happys), H = cy((W) => W.happysUp), [B, E] = Hi.useState([]), ce = (W) => m.cfg.searchPath(W, hk.SP_GSM);
  return /* @__PURE__ */ CO("div", { css: [UO, Ty`
		background-color: ${m.cfg.oCfg.init.bg_color};
	`], children: [
    /* @__PURE__ */ ru("button", { onClick: () => E([...B, 0]), children: B.length }),
    /* @__PURE__ */ ru("button", { onClick: () => H(), children: L }),
    /* @__PURE__ */ ru("div", { css: FO, children: S.map((W) => W.cls === "GRP" ? /* @__PURE__ */ ru(RO, { search: ce, fn: W.fn }, W.nm) : /* @__PURE__ */ ru(TO, { search: ce, str: "てすと" }, W.nm)) })
  ] });
};
function BO(m) {
  const S = "skynovel";
  document.body.innerHTML = `<div id="${S}"></div>`, gy = document.getElementById(S), zO.createRoot(gy).render(/* @__PURE__ */ ru(jO, { sys: m }));
}
let gy;
function IO(m) {
  gy.dispatchEvent(new CustomEvent("ev_addLayer", { detail: m }));
}
export {
  jO as Stage,
  IO as addLayer,
  BO as opening,
  bT as styChild
};
//# sourceMappingURL=Stage.js.map
