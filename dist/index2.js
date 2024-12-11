import { a as v } from "./Main.js";
var L = function() {
};
function m(n) {
  for (var r = [], e = 1; e < arguments.length; e++)
    r[e - 1] = arguments[e];
  n && n.addEventListener && n.addEventListener.apply(n, r);
}
function p(n) {
  for (var r = [], e = 1; e < arguments.length; e++)
    r[e - 1] = arguments[e];
  n && n.removeEventListener && n.removeEventListener.apply(n, r);
}
var w = typeof window < "u", T = w ? window : null, t = function(n) {
  return !!n.addEventListener;
}, o = function(n) {
  return !!n.on;
}, g = function(n, r, e, f) {
  e === void 0 && (e = T), v.useEffect(function() {
    if (r && e)
      return t(e) ? m(e, n, r, f) : o(e) && e.on(n, r, f), function() {
        t(e) ? p(e, n, r, f) : o(e) && e.off(n, r, f);
      };
  }, [n, r, e, JSON.stringify(f)]);
}, l = function(n) {
  return typeof n == "function" ? n : typeof n == "string" ? function(r) {
    return r.key === n;
  } : n ? function() {
    return !0;
  } : function() {
    return !1;
  };
}, K = function(n, r, e, f) {
  r === void 0 && (r = L), e === void 0 && (e = {}), f === void 0 && (f = [n]);
  var i = e.event, c = i === void 0 ? "keydown" : i, s = e.target, a = e.options, d = v.useMemo(function() {
    var y = l(n), E = function(u) {
      if (y(u))
        return r(u);
    };
    return E;
  }, f);
  g(c, d, s, a);
};
export {
  g as useEvent,
  K as useKey
};
//# sourceMappingURL=index2.js.map
