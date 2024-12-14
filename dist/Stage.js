import { a as ct, o as ps, b as gs, u as hs, j as Gr, c as Ut, F as Oe, s as ms, h as xs, d as Ss, f as bs, g as Oa, i as Ds, k as Es } from "./Main.js";
import { S as ys, C as Wt, B as Cs, u as Pa } from "./web2.js";
var _s = function(t, r) {
  return typeof r == "boolean" ? r : !t;
}, Ms = function(t) {
  return ct.useReducer(_s, t);
}, ws = function(t) {
  return "touches" in t;
}, Ia = function(t) {
  ws(t) && t.touches.length < 2 && t.preventDefault && t.preventDefault();
}, Rs = function(t, r) {
  var e = r === void 0 ? {} : r, n = e.isPreventDefault, a = n === void 0 ? !0 : n, i = e.delay, o = i === void 0 ? 300 : i, s = ct.useRef(), u = ct.useRef(), f = ct.useCallback(function(v) {
    a && v.target && (ps(v.target, "touchend", Ia, { passive: !1 }), u.current = v.target), s.current = setTimeout(function() {
      return t(v);
    }, o);
  }, [t, o, a]), l = ct.useCallback(function() {
    s.current && clearTimeout(s.current), a && u.current && gs(u.current, "touchend", Ia);
  }, [a]);
  return {
    onMouseDown: function(v) {
      return f(v);
    },
    onTouchStart: function(v) {
      return f(v);
    },
    onMouseUp: l,
    onMouseLeave: l,
    onTouchEnd: l
  };
}, za = function(t) {
  hs(function() {
    t();
  });
};
function Ln(t, r) {
  for (var e = t.length, n = 0; n < e; ++n)
    if (r(t[n], n))
      return !0;
  return !1;
}
function Ei(t, r) {
  for (var e = t.length, n = 0; n < e; ++n)
    if (r(t[n], n))
      return t[n];
  return null;
}
function yi(t) {
  var r = t;
  if (typeof r > "u") {
    if (typeof navigator > "u" || !navigator)
      return "";
    r = navigator.userAgent || "";
  }
  return r.toLowerCase();
}
function Yn(t, r) {
  try {
    return new RegExp(t, "g").exec(r);
  } catch {
    return null;
  }
}
function Ts() {
  if (typeof navigator > "u" || !navigator || !navigator.userAgentData)
    return !1;
  var t = navigator.userAgentData, r = t.brands || t.uaList;
  return !!(r && r.length);
}
function Os(t, r) {
  var e = Yn("(" + t + ")((?:\\/|\\s|:)([0-9|\\.|_]+))", r);
  return e ? e[3] : "";
}
function gn(t) {
  return t.replace(/_/g, ".");
}
function qr(t, r) {
  var e = null, n = "-1";
  return Ln(t, function(a) {
    var i = Yn("(" + a.test + ")((?:\\/|\\s|:)([0-9|\\.|_]+))?", r);
    return !i || a.brand ? !1 : (e = a, n = i[3] || "-1", a.versionAlias ? n = a.versionAlias : a.versionTest && (n = Os(a.versionTest.toLowerCase(), r) || n), n = gn(n), !0);
  }), {
    preset: e,
    version: n
  };
}
function ge(t, r) {
  var e = {
    brand: "",
    version: "-1"
  };
  return Ln(t, function(n) {
    var a = Ci(r, n);
    return a ? (e.brand = n.id, e.version = n.versionAlias || a.version, e.version !== "-1") : !1;
  }), e;
}
function Ci(t, r) {
  return Ei(t, function(e) {
    var n = e.brand;
    return Yn("" + r.test, n.toLowerCase());
  });
}
var _i = [{
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
}], Mi = [{
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
}], hn = [{
  test: "applewebkit",
  id: "webkit",
  versionTest: "applewebkit|safari"
}], wi = [{
  test: "(?=(iphone|ipad))(?!(.*version))",
  id: "webview"
}, {
  test: "(?=(android|iphone|ipad))(?=.*(naver|daum|; wv))",
  id: "webview"
}, {
  // test webview
  test: "webview",
  id: "webview"
}], Ri = [{
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
function Ti(t) {
  return !!qr(wi, t).preset;
}
function Ps(t) {
  var r = yi(t), e = !!/mobi/g.exec(r), n = {
    name: "unknown",
    version: "-1",
    majorVersion: -1,
    webview: Ti(r),
    chromium: !1,
    chromiumVersion: "-1",
    webkit: !1,
    webkitVersion: "-1"
  }, a = {
    name: "unknown",
    version: "-1",
    majorVersion: -1
  }, i = qr(_i, r), o = i.preset, s = i.version, u = qr(Ri, r), f = u.preset, l = u.version, v = qr(Mi, r);
  if (n.chromium = !!v.preset, n.chromiumVersion = v.version, !n.chromium) {
    var c = qr(hn, r);
    n.webkit = !!c.preset, n.webkitVersion = c.version;
  }
  return f && (a.name = f.id, a.version = l, a.majorVersion = parseInt(l, 10)), o && (n.name = o.id, n.version = s, n.webview && a.name === "ios" && n.name !== "safari" && (n.webview = !1)), n.majorVersion = parseInt(n.version, 10), {
    browser: n,
    os: a,
    isMobile: e,
    isHints: !1
  };
}
function Is(t) {
  var r = navigator.userAgentData, e = (r.uaList || r.brands).slice(), n = r.mobile || !1, a = e[0], i = (r.platform || navigator.platform).toLowerCase(), o = {
    name: a.brand,
    version: a.version,
    majorVersion: -1,
    webkit: !1,
    webkitVersion: "-1",
    chromium: !1,
    chromiumVersion: "-1",
    webview: !!ge(wi, e).brand || Ti(yi())
  }, s = {
    name: "unknown",
    version: "-1",
    majorVersion: -1
  };
  o.webkit = !o.chromium && Ln(hn, function(c) {
    return Ci(e, c);
  });
  var u = ge(Mi, e);
  if (o.chromium = !!u.brand, o.chromiumVersion = u.version || "-1", !o.chromium) {
    var f = ge(hn, e);
    o.webkit = !!f.brand, o.webkitVersion = f.version || "-1";
  }
  var l = Ei(Ri, function(c) {
    return new RegExp("" + c.test, "g").exec(i);
  });
  s.name = l ? l.id : "";
  {
    var v = ge(_i, e);
    o.name = v.brand || o.name, o.version = v.brand && t ? t.uaFullVersion : v.version;
  }
  return o.webkit && (s.name = n ? "ios" : "mac"), s.name === "ios" && o.webview && (o.version = "-1"), s.version = gn(s.version), o.version = gn(o.version), s.majorVersion = parseInt(s.version, 10), o.majorVersion = parseInt(o.version, 10), {
    browser: o,
    os: s,
    isMobile: n,
    isHints: !0
  };
}
function zs(t) {
  return Ts() ? Is() : Ps(t);
}
function Gs(t) {
  for (var r = [], e = 1; e < arguments.length; e++)
    r[e - 1] = arguments[e];
  return r.map(function(n) {
    return n.split(" ").map(function(a) {
      return a ? "" + t + a : "";
    }).join(" ");
  }).join(" ");
}
function Bs(t, r) {
  return r.replace(/([^}{]*){/gm, function(e, n) {
    return n.replace(/\.([^{,\s\d.]+)/g, "." + t + "$1") + "{";
  });
}
function br(t, r) {
  return function(e) {
    e && (t[r] = e);
  };
}
function Oi(t, r, e) {
  return function(n) {
    n && (t[r][e] = n);
  };
}
function As(t, r) {
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
var ks = "function", Fs = "object", Ns = "string", Ws = "number", Xn = "undefined", Pi = typeof window !== Xn, Hs = typeof document !== Xn && document, Ls = [{
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
}], Et = 1e-7, he = {
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
function Ys() {
  for (var t = 0, r = 0, e = arguments.length; r < e; r++) t += arguments[r].length;
  for (var n = Array(t), a = 0, r = 0; r < e; r++) for (var i = arguments[r], o = 0, s = i.length; o < s; o++, a++) n[a] = i[o];
  return n;
}
function Pe(t, r, e, n) {
  return (t * n + r * e) / (e + n);
}
function Vn(t) {
  return typeof t === Xn;
}
function Zt(t) {
  return t && typeof t === Fs;
}
function wt(t) {
  return Array.isArray(t);
}
function ar(t) {
  return typeof t === Ns;
}
function ee(t) {
  return typeof t === Ws;
}
function qn(t) {
  return typeof t === ks;
}
function Xs(t, r) {
  var e = t === "" || t == " ", n = r === "" || r == " ";
  return n && e || t === r;
}
function Ii(t, r, e, n, a) {
  var i = jn(t, r, e);
  return i ? e : Vs(t, r, e + 1, n, a);
}
function jn(t, r, e) {
  if (!t.ignore)
    return null;
  var n = r.slice(Math.max(e - 3, 0), e + 3).join("");
  return new RegExp(t.ignore).exec(n);
}
function Vs(t, r, e, n, a) {
  for (var i = function(f) {
    var l = r[f].trim();
    if (l === t.close && !jn(t, r, f))
      return {
        value: f
      };
    var v = f, c = Ht(a, function(d) {
      var p = d.open;
      return p === l;
    });
    if (c && (v = Ii(c, r, f, n, a)), v === -1)
      return o = f, "break";
    f = v, o = f;
  }, o, s = e; s < n; ++s) {
    var u = i(s);
    if (s = o, typeof u == "object") return u.value;
    if (u === "break") break;
  }
  return -1;
}
function Un(t, r) {
  var e = ar(r) ? {
    separator: r
  } : r, n = e.separator, a = n === void 0 ? "," : n, i = e.isSeparateFirst, o = e.isSeparateOnlyOpenClose, s = e.isSeparateOpenClose, u = s === void 0 ? o : s, f = e.openCloseCharacters, l = f === void 0 ? Ls : f, v = l.map(function(C) {
    var y = C.open, _ = C.close;
    return y === _ ? y : y + "|" + _;
  }).join("|"), c = "(\\s*" + a + "\\s*|" + v + "|\\s+)", d = new RegExp(c, "g"), p = t.split(d).filter(function(C) {
    return C && C !== "undefined";
  }), g = p.length, h = [], m = [];
  function x() {
    return m.length ? (h.push(m.join("")), m = [], !0) : !1;
  }
  for (var S = function(C) {
    var y = p[C].trim(), _ = C, w = Ht(l, function(T) {
      var I = T.open;
      return I === y;
    }), P = Ht(l, function(T) {
      var I = T.close;
      return I === y;
    });
    if (w) {
      if (_ = Ii(w, p, C, g, l), _ !== -1 && u)
        return x() && i || (h.push(p.slice(C, _ + 1).join("")), C = _, i) ? (b = C, "break") : (b = C, "continue");
    } else if (P && !jn(P, p, C)) {
      var O = Ys(l);
      return O.splice(l.indexOf(P), 1), {
        value: Un(t, {
          separator: a,
          isSeparateFirst: i,
          isSeparateOnlyOpenClose: o,
          isSeparateOpenClose: u,
          openCloseCharacters: O
        })
      };
    } else if (Xs(y, a) && !o)
      return x(), i ? (b = C, "break") : (b = C, "continue");
    _ === -1 && (_ = g - 1), m.push(p.slice(C, _ + 1).join("")), C = _, b = C;
  }, b, E = 0; E < g; ++E) {
    var D = S(E);
    if (E = b, typeof D == "object") return D.value;
    if (D === "break") break;
  }
  return m.length && h.push(m.join("")), h;
}
function cr(t) {
  return Un(t, "");
}
function Sr(t) {
  return Un(t, ",");
}
function zi(t) {
  var r = /([^(]*)\(([\s\S]*)\)([\s\S]*)/g.exec(t);
  return !r || r.length < 4 ? {} : {
    prefix: r[1],
    value: r[2],
    suffix: r[3]
  };
}
function se(t) {
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
function qs(t, r) {
  return t.replace(/([a-z])([A-Z])/g, function(e, n, a) {
    return "" + n + r + a.toLowerCase();
  });
}
function ne() {
  return Date.now ? Date.now() : (/* @__PURE__ */ new Date()).getTime();
}
function nr(t, r, e) {
  e === void 0 && (e = -1);
  for (var n = t.length, a = 0; a < n; ++a)
    if (r(t[a], a, t))
      return a;
  return e;
}
function Ht(t, r, e) {
  var n = nr(t, r);
  return n > -1 ? t[n] : e;
}
var Gi = /* @__PURE__ */ function() {
  var t = ne(), r = Pi && (window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.msRequestAnimationFrame);
  return r ? r.bind(window) : function(e) {
    var n = ne(), a = setTimeout(function() {
      e(n - t);
    }, 1e3 / 60);
    return a;
  };
}(), js = /* @__PURE__ */ function() {
  var t = Pi && (window.cancelAnimationFrame || window.webkitCancelAnimationFrame || window.mozCancelAnimationFrame || window.msCancelAnimationFrame);
  return t ? t.bind(window) : function(r) {
    clearTimeout(r);
  };
}();
function Lr(t) {
  return Object.keys(t);
}
function dt(t, r) {
  var e = se(t), n = e.value, a = e.unit;
  if (Zt(r)) {
    var i = r[a];
    if (i) {
      if (qn(i))
        return i(n);
      if (he[a])
        return he[a](n, i);
    }
  } else if (a === "%")
    return n * r / 100;
  return he[a] ? he[a](n) : n;
}
function mn(t, r, e) {
  return Math.max(r, Math.min(t, e));
}
function Ga(t, r, e, n) {
  return n === void 0 && (n = t[0] / t[1]), [[tt(r[0], Et), tt(r[0] / n, Et)], [tt(r[1] * n, Et), tt(r[1], Et)]].filter(function(a) {
    return a.every(function(i, o) {
      var s = r[o], u = tt(s, Et);
      return e ? i <= s || i <= u : i >= s || i >= u;
    });
  })[0] || t;
}
function Bi(t, r, e, n) {
  if (!n)
    return t.map(function(d, p) {
      return mn(d, r[p], e[p]);
    });
  var a = t[0], i = t[1], o = n === !0 ? a / i : n, s = Ga(t, r, !1, o), u = s[0], f = s[1], l = Ga(t, e, !0, o), v = l[0], c = l[1];
  return a < u || i < f ? (a = u, i = f) : (a > v || i > c) && (a = v, i = c), [a, i];
}
function Us(t) {
  for (var r = t.length, e = 0, n = r - 1; n >= 0; --n)
    e += t[n];
  return e;
}
function xn(t) {
  for (var r = t.length, e = 0, n = r - 1; n >= 0; --n)
    e += t[n];
  return r ? e / r : 0;
}
function St(t, r) {
  var e = r[0] - t[0], n = r[1] - t[1], a = Math.atan2(n, e);
  return a >= 0 ? a : a + Math.PI * 2;
}
function $s(t) {
  return [0, 1].map(function(r) {
    return xn(t.map(function(e) {
      return e[r];
    }));
  });
}
function Ba(t) {
  var r = $s(t), e = St(r, t[0]), n = St(r, t[1]);
  return e < n && n - e < Math.PI || e > n && n - e < -Math.PI ? 1 : -1;
}
function rr(t, r) {
  return Math.sqrt(Math.pow((r ? r[0] : 0) - t[0], 2) + Math.pow((r ? r[1] : 0) - t[1], 2));
}
function tt(t, r) {
  if (!r)
    return t;
  var e = 1 / r;
  return Math.round(t / r) / e;
}
function Aa(t, r) {
  return t.forEach(function(e, n) {
    t[n] = tt(t[n], r);
  }), t;
}
function Zs(t) {
  for (var r = [], e = 0; e < t; ++e)
    r.push(e);
  return r;
}
function Ks(t) {
  return t.reduce(function(r, e) {
    return r.concat(e);
  }, []);
}
function Ct(t, r) {
  return t.classList ? t.classList.contains(r) : !!t.className.match(new RegExp("(\\s|^)" + r + "(\\s|$)"));
}
function Ai(t, r) {
  t.classList ? t.classList.add(r) : t.className += " " + r;
}
function ki(t, r) {
  if (t.classList)
    t.classList.remove(r);
  else {
    var e = new RegExp("(\\s|^)" + r + "(\\s|$)");
    t.className = t.className.replace(e, " ");
  }
}
function Ot(t, r, e, n) {
  t.addEventListener(r, e, n);
}
function Rt(t, r, e, n) {
  t.removeEventListener(r, e, n);
}
function $n(t) {
  return t?.ownerDocument || Hs;
}
function Zn(t) {
  return $n(t).documentElement;
}
function pr(t) {
  return $n(t).body;
}
function lr(t) {
  var r;
  return ((r = t?.ownerDocument) === null || r === void 0 ? void 0 : r.defaultView) || window;
}
function Fi(t) {
  return t && "postMessage" in t && "blur" in t && "self" in t;
}
function Kn(t) {
  return Zt(t) && t.nodeName && t.nodeType && "ownerDocument" in t;
}
function Js(t, r, e, n, a, i) {
  for (var o = 0; o < a; ++o) {
    var s = e + o * a, u = n + o * a;
    t[s] += t[u] * i, r[s] += r[u] * i;
  }
}
function Qs(t, r, e, n, a) {
  for (var i = 0; i < a; ++i) {
    var o = e + i * a, s = n + i * a, u = t[o], f = r[o];
    t[o] = t[s], t[s] = u, r[o] = r[s], r[s] = f;
  }
}
function tu(t, r, e, n, a) {
  for (var i = 0; i < n; ++i) {
    var o = e + i * n;
    t[o] /= a, r[o] /= a;
  }
}
function Ni(t, r, e) {
  for (var n = t.slice(), a = 0; a < e; ++a)
    n[a * e + r - 1] = 0, n[(r - 1) * e + a] = 0;
  return n[(r - 1) * (e + 1)] = 1, n;
}
function Qt(t, r) {
  r === void 0 && (r = Math.sqrt(t.length));
  for (var e = t.slice(), n = mt(r), a = 0; a < r; ++a) {
    var i = r * a + a;
    if (!tt(e[i], Et)) {
      for (var o = a + 1; o < r; ++o)
        if (e[r * a + o]) {
          Qs(e, n, a, o, r);
          break;
        }
    }
    if (!tt(e[i], Et))
      return [];
    tu(e, n, a, r, e[i]);
    for (var o = 0; o < r; ++o) {
      var s = o, u = o + a * r, f = e[u];
      !tt(f, Et) || a === o || Js(e, n, s, a, r, -f);
    }
  }
  return n;
}
function ru(t, r) {
  r === void 0 && (r = Math.sqrt(t.length));
  for (var e = [], n = 0; n < r; ++n)
    for (var a = 0; a < r; ++a)
      e[a * r + n] = t[r * n + a];
  return e;
}
function Wi(t, r) {
  r === void 0 && (r = Math.sqrt(t.length));
  for (var e = [], n = t[r * r - 1], a = 0; a < r - 1; ++a)
    e[a] = t[r * (r - 1) + a] / n;
  return e[r - 1] = 0, e;
}
function eu(t, r) {
  for (var e = mt(r), n = 0; n < r - 1; ++n)
    e[r * (r - 1) + n] = t[n] || 0;
  return e;
}
function Dr(t, r) {
  for (var e = t.slice(), n = t.length; n < r - 1; ++n)
    e[n] = 0;
  return e[r - 1] = 1, e;
}
function Kt(t, r, e) {
  if (r === void 0 && (r = Math.sqrt(t.length)), r === e)
    return t;
  for (var n = mt(e), a = Math.min(r, e), i = 0; i < a - 1; ++i) {
    for (var o = 0; o < a - 1; ++o)
      n[i * e + o] = t[i * r + o];
    n[(i + 1) * e - 1] = t[(i + 1) * r - 1], n[(e - 1) * e + i] = t[(r - 1) * r + i];
  }
  return n[e * e - 1] = t[r * r - 1], n;
}
function Ie(t) {
  for (var r = [], e = 1; e < arguments.length; e++)
    r[e - 1] = arguments[e];
  var n = mt(t);
  return r.forEach(function(a) {
    n = pt(n, a, t);
  }), n;
}
function pt(t, r, e) {
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
function ut(t, r) {
  for (var e = Math.min(t.length, r.length), n = t.slice(), a = 0; a < e; ++a)
    n[a] = n[a] + r[a];
  return n;
}
function Q(t, r) {
  for (var e = Math.min(t.length, r.length), n = t.slice(), a = 0; a < e; ++a)
    n[a] = n[a] - r[a];
  return n;
}
function nu(t, r) {
  return r === void 0 && (r = t.length === 6), r ? [t[0], t[1], 0, t[2], t[3], 0, t[4], t[5], 1] : t;
}
function Hi(t, r) {
  return r === void 0 && (r = t.length === 9), r ? [t[0], t[1], t[3], t[4], t[6], t[7]] : t;
}
function Pt(t, r, e) {
  e === void 0 && (e = r.length);
  var n = pt(t, r, e), a = n[e - 1];
  return n.map(function(i) {
    return i / a;
  });
}
function au(t, r) {
  return pt(t, [1, 0, 0, 0, 0, Math.cos(r), Math.sin(r), 0, 0, -Math.sin(r), Math.cos(r), 0, 0, 0, 0, 1], 4);
}
function iu(t, r) {
  return pt(t, [Math.cos(r), 0, -Math.sin(r), 0, 0, 1, 0, 0, Math.sin(r), 0, Math.cos(r), 0, 0, 0, 0, 1], 4);
}
function ou(t, r) {
  return pt(t, fe(r, 4));
}
function me(t, r) {
  var e = r[0], n = e === void 0 ? 1 : e, a = r[1], i = a === void 0 ? 1 : a, o = r[2], s = o === void 0 ? 1 : o;
  return pt(t, [n, 0, 0, 0, 0, i, 0, 0, 0, 0, s, 0, 0, 0, 0, 1], 4);
}
function ue(t, r) {
  return Pt(fe(r, 3), Dr(t, 3));
}
function rn(t, r) {
  var e = r[0], n = e === void 0 ? 0 : e, a = r[1], i = a === void 0 ? 0 : a, o = r[2], s = o === void 0 ? 0 : o;
  return pt(t, [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, n, i, s, 1], 4);
}
function ka(t, r) {
  return pt(t, r, 4);
}
function fe(t, r) {
  var e = Math.cos(t), n = Math.sin(t), a = mt(r);
  return a[0] = e, a[1] = n, a[r] = -n, a[r + 1] = e, a;
}
function mt(t) {
  for (var r = t * t, e = [], n = 0; n < r; ++n)
    e[n] = n % (t + 1) ? 0 : 1;
  return e;
}
function Jn(t, r) {
  for (var e = mt(r), n = Math.min(t.length, r - 1), a = 0; a < n; ++a)
    e[(r + 1) * a] = t[a];
  return e;
}
function Er(t, r) {
  for (var e = mt(r), n = Math.min(t.length, r - 1), a = 0; a < n; ++a)
    e[r * (r - 1) + a] = t[a];
  return e;
}
function Qn(t, r, e, n, a, i, o, s) {
  var u = t[0], f = t[1], l = r[0], v = r[1], c = e[0], d = e[1], p = n[0], g = n[1], h = a[0], m = a[1], x = i[0], S = i[1], b = o[0], E = o[1], D = s[0], C = s[1], y = [u, 0, l, 0, c, 0, p, 0, f, 0, v, 0, d, 0, g, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, u, 0, l, 0, c, 0, p, 0, f, 0, v, 0, d, 0, g, 0, 1, 0, 1, 0, 1, 0, 1, -h * u, -m * u, -x * l, -S * l, -b * c, -E * c, -D * p, -C * p, -h * f, -m * f, -x * v, -S * v, -b * d, -E * d, -D * g, -C * g], _ = Qt(y, 8);
  if (!_.length)
    return [];
  var w = pt(_, [h, m, x, S, b, E, D, C], 8);
  return w[8] = 1, Kt(ru(w), 3, 4);
}
var $r = function() {
  return $r = Object.assign || function(r) {
    for (var e, n = 1, a = arguments.length; n < a; n++) {
      e = arguments[n];
      for (var i in e) Object.prototype.hasOwnProperty.call(e, i) && (r[i] = e[i]);
    }
    return r;
  }, $r.apply(this, arguments);
};
function su() {
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
function ae(t, r) {
  return r === void 0 && (r = 0), Rr(Ar(t, r));
}
function uu(t, r) {
  var e = Pt(t, [r[0], r[1] || 0, r[2] || 0, 1], 4), n = e[3] || 1;
  return [
    e[0] / n,
    e[1] / n,
    e[2] / n
  ];
}
function Rr(t) {
  var r = su();
  return t.forEach(function(e) {
    var n = e.matrixFunction, a = e.functionValue;
    n && (r = n(r, a));
  }), r;
}
function Ar(t, r) {
  r === void 0 && (r = 0);
  var e = wt(t) ? t : cr(t);
  return e.map(function(n) {
    var a = zi(n), i = a.prefix, o = a.value, s = null, u = i, f = "";
    if (i === "translate" || i === "translateX" || i === "translate3d") {
      var l = Zt(r) ? $r($r({}, r), { "o%": r["%"] }) : {
        "%": r,
        "o%": r
      }, v = Sr(o).map(function(T, I) {
        return I === 0 && "x%" in l ? l["%"] = r["x%"] : I === 1 && "y%" in l ? l["%"] = r["y%"] : l["%"] = r["o%"], dt(T, l);
      }), c = v[0], d = v[1], p = d === void 0 ? 0 : d, g = v[2], h = g === void 0 ? 0 : g;
      s = rn, f = [c, p, h];
    } else if (i === "translateY") {
      var m = Zt(r) ? $r({ "%": r["y%"] }, r) : {
        "%": r
      }, p = dt(o, m);
      s = rn, f = [0, p, 0];
    } else if (i === "translateZ") {
      var h = parseFloat(o);
      s = rn, f = [0, 0, h];
    } else if (i === "scale" || i === "scale3d") {
      var x = Sr(o).map(function(T) {
        return parseFloat(T);
      }), S = x[0], b = x[1], E = b === void 0 ? S : b, D = x[2], C = D === void 0 ? 1 : D;
      s = me, f = [S, E, C];
    } else if (i === "scaleX") {
      var S = parseFloat(o);
      s = me, f = [S, 1, 1];
    } else if (i === "scaleY") {
      var E = parseFloat(o);
      s = me, f = [1, E, 1];
    } else if (i === "scaleZ") {
      var C = parseFloat(o);
      s = me, f = [1, 1, C];
    } else if (i === "rotate" || i === "rotateZ" || i === "rotateX" || i === "rotateY") {
      var y = se(o), _ = y.unit, w = y.value, P = _ === "rad" ? w : w * Math.PI / 180;
      i === "rotate" || i === "rotateZ" ? (u = "rotateZ", s = ou) : i === "rotateX" ? s = au : i === "rotateY" && (s = iu), f = P;
    } else if (i === "matrix3d")
      s = ka, f = Sr(o).map(function(T) {
        return parseFloat(T);
      });
    else if (i === "matrix") {
      var O = Sr(o).map(function(T) {
        return parseFloat(T);
      });
      s = ka, f = [
        O[0],
        O[1],
        0,
        0,
        O[2],
        O[3],
        0,
        0,
        0,
        0,
        1,
        0,
        O[4],
        O[5],
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
var fu = /* @__PURE__ */ function() {
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
}(), lu = /* @__PURE__ */ function() {
  function t() {
    this.object = {};
  }
  var r = t.prototype;
  return r.get = function(e) {
    return this.object[e];
  }, r.set = function(e, n) {
    this.object[e] = n;
  }, t;
}(), cu = typeof Map == "function", vu = /* @__PURE__ */ function() {
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
function du(t, r) {
  var e = [], n = [];
  return t.forEach(function(a) {
    var i = a[0], o = a[1], s = new vu();
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
    var v = u.getIndex();
    return [l, v];
  });
}
var pu = /* @__PURE__ */ function() {
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
    var e = du(this.changedBeforeAdded, this.fixed), n = this.changed, a = [];
    this.cacheOrdered = e.filter(function(i, o) {
      var s = i[0], u = i[1], f = n[o], l = f[0], v = f[1];
      if (s !== u)
        return a.push([l, v]), !0;
    }), this.cachePureChanged = a;
  }, t;
}();
function ta(t, r, e) {
  var n = cu ? Map : e ? lu : fu, a = e || function(x) {
    return x;
  }, i = [], o = [], s = [], u = t.map(a), f = r.map(a), l = new n(), v = new n(), c = [], d = [], p = {}, g = [], h = 0, m = 0;
  return u.forEach(function(x, S) {
    l.set(x, S);
  }), f.forEach(function(x, S) {
    v.set(x, S);
  }), u.forEach(function(x, S) {
    var b = v.get(x);
    typeof b > "u" ? (++m, o.push(S)) : p[b] = m;
  }), f.forEach(function(x, S) {
    var b = l.get(x);
    typeof b > "u" ? (i.push(S), ++h) : (s.push([b, S]), m = p[S] || 0, c.push([b - m, S - h]), d.push(S === b), b !== S && g.push([b, S]));
  }), o.reverse(), new pu(t, r, i, o, g, s, c, d);
}
var gu = /* @__PURE__ */ function() {
  function t(e, n) {
    e === void 0 && (e = []), this.findKeyCallback = n, this.list = [].slice.call(e);
  }
  var r = t.prototype;
  return r.update = function(e) {
    var n = [].slice.call(e), a = ta(this.list, n, this.findKeyCallback);
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
var Sn = function(t, r) {
  return Sn = Object.setPrototypeOf || {
    __proto__: []
  } instanceof Array && function(e, n) {
    e.__proto__ = n;
  } || function(e, n) {
    for (var a in n) n.hasOwnProperty(a) && (e[a] = n[a]);
  }, Sn(t, r);
};
function hu(t, r) {
  Sn(t, r);
  function e() {
    this.constructor = t;
  }
  t.prototype = r === null ? Object.create(r) : (e.prototype = r.prototype, new e());
}
var Li = typeof Map == "function" ? void 0 : /* @__PURE__ */ function() {
  var t = 0;
  return function(r) {
    return r.__DIFF_KEY__ || (r.__DIFF_KEY__ = ++t);
  };
}(), Yi = /* @__PURE__ */ function(t) {
  hu(r, t);
  function r(e) {
    return e === void 0 && (e = []), t.call(this, e, Li) || this;
  }
  return r;
}(gu);
function mu(t, r) {
  return ta(t, r, Li);
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
var bn = function() {
  return bn = Object.assign || function(r) {
    for (var e, n = 1, a = arguments.length; n < a; n++) {
      e = arguments[n];
      for (var i in e) Object.prototype.hasOwnProperty.call(e, i) && (r[i] = e[i]);
    }
    return r;
  }, bn.apply(this, arguments);
};
function xu() {
  for (var t = 0, r = 0, e = arguments.length; r < e; r++) t += arguments[r].length;
  for (var n = Array(t), a = 0, r = 0; r < e; r++) for (var i = arguments[r], o = 0, s = i.length; o < s; o++, a++) n[a] = i[o];
  return n;
}
var ra = /* @__PURE__ */ function() {
  function t() {
    this._events = {};
  }
  var r = t.prototype;
  return r.on = function(e, n) {
    if (Zt(e))
      for (var a in e)
        this.on(a, e[a]);
    else
      this._addEvent(e, n, {});
    return this;
  }, r.off = function(e, n) {
    if (!e)
      this._events = {};
    else if (Zt(e))
      for (var a in e)
        this.off(a);
    else if (!n)
      this._events[e] = [];
    else {
      var i = this._events[e];
      if (i) {
        var o = nr(i, function(s) {
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
    }, n.currentTarget = this, xu(i).forEach(function(s) {
      s.listener(n), s.once && a.off(e, s.listener);
    }), !o;
  }, r.trigger = function(e, n) {
    return n === void 0 && (n = {}), this.emit(e, n);
  }, r._addEvent = function(e, n, a) {
    var i = this._events;
    i[e] = i[e] || [];
    var o = i[e];
    o.push(bn({
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
var Dn = function(t, r) {
  return Dn = Object.setPrototypeOf || {
    __proto__: []
  } instanceof Array && function(e, n) {
    e.__proto__ = n;
  } || function(e, n) {
    for (var a in n) n.hasOwnProperty(a) && (e[a] = n[a]);
  }, Dn(t, r);
};
function Su(t, r) {
  Dn(t, r);
  function e() {
    this.constructor = t;
  }
  t.prototype = r === null ? Object.create(r) : (e.prototype = r.prototype, new e());
}
var Tr = function() {
  return Tr = Object.assign || function(r) {
    for (var e, n = 1, a = arguments.length; n < a; n++) {
      e = arguments[n];
      for (var i in e) Object.prototype.hasOwnProperty.call(e, i) && (r[i] = e[i]);
    }
    return r;
  }, Tr.apply(this, arguments);
};
function bu(t) {
  var r = t.container;
  return r === document.body ? [r.scrollLeft || document.documentElement.scrollLeft, r.scrollTop || document.documentElement.scrollTop] : [r.scrollLeft, r.scrollTop];
}
function Fa(t, r) {
  return t.addEventListener("scroll", r), function() {
    t.removeEventListener("scroll", r);
  };
}
function xe(t) {
  if (t) {
    if (ar(t))
      return document.querySelector(t);
  } else return null;
  if (qn(t))
    return t();
  if (t instanceof Element)
    return t;
  if ("current" in t)
    return t.current;
  if ("value" in t)
    return t.value;
}
var Du = /* @__PURE__ */ function(t) {
  Su(r, t);
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
    var i = xe(a.container);
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
      var i = n.clientX, o = n.clientY, s = a.threshold, u = s === void 0 ? 0 : s, f = this, l = f._startRect, v = f._startPos;
      this._currentOptions = a;
      var c = [0, 0];
      return l.top > o - u ? (v[1] > l.top || o < v[1]) && (c[1] = -1) : l.top + l.height < o + u && (v[1] < l.top + l.height || o > v[1]) && (c[1] = 1), l.left > i - u ? (v[0] > l.left || i < v[0]) && (c[0] = -1) : l.left + l.width < i + u && (v[0] < l.left + l.width || i > v[0]) && (c[0] = 1), !c[0] && !c[1] ? !1 : this._continueDrag(Tr(Tr({}, a), {
        direction: c,
        inputEvent: n,
        isDrag: !0
      }));
    }
  }, e.checkScroll = function(n) {
    var a = this;
    if (this._isWait)
      return !1;
    var i = n.prevScrollPos, o = i === void 0 ? this._prevScrollPos : i, s = n.direction, u = n.throttleTime, f = u === void 0 ? 0 : u, l = n.inputEvent, v = n.isDrag, c = this._getScrollPosition(s || [0, 0], n), d = c[0] - o[0], p = c[1] - o[1], g = s || [d ? Math.abs(d) / d : 0, p ? Math.abs(p) / p : 0];
    return this._prevScrollPos = c, this._lock = !1, !d && !p ? !1 : (this.emit("move", {
      offsetX: g[0] ? d : 0,
      offsetY: g[1] ? p : 0,
      inputEvent: l
    }), f && v && (clearTimeout(this._timer), this._timer = window.setTimeout(function() {
      a._continueDrag(n);
    }, f)), !0);
  }, e.dragEnd = function() {
    this._flag = !1, this._lock = !1, clearTimeout(this._timer), this._unregisterScrollEvent();
  }, e._getScrollPosition = function(n, a) {
    var i = a.container, o = a.getScrollPosition, s = o === void 0 ? bu : o;
    return s({
      container: xe(i),
      direction: n
    });
  }, e._continueDrag = function(n) {
    var a = this, i, o = n.container, s = n.direction, u = n.throttleTime, f = n.useScroll, l = n.isDrag, v = n.inputEvent;
    if (!(!this._flag || l && this._isWait)) {
      var c = ne(), d = Math.max(u + this._prevTime - c, 0);
      if (d > 0)
        return clearTimeout(this._timer), this._timer = window.setTimeout(function() {
          a._continueDrag(n);
        }, d), !1;
      this._prevTime = c;
      var p = this._getScrollPosition(s, n);
      this._prevScrollPos = p, l && (this._isWait = !0), f || (this._lock = !0);
      var g = {
        container: xe(o),
        direction: s,
        inputEvent: v
      };
      return (i = n.requestScroll) === null || i === void 0 || i.call(n, g), this.emit("scroll", g), this._isWait = !1, f || this.checkScroll(Tr(Tr({}, n), {
        prevScrollPos: p,
        direction: s,
        inputEvent: v
      }));
    }
  }, e._registerScrollEvent = function(n) {
    this._unregisterScrollEvent();
    var a = n.checkScrollEvent;
    if (a) {
      var i = a === !0 ? Fa : a, o = xe(n.container);
      a === !0 && (o === document.body || o === document.documentElement) ? this._unregister = Fa(window, this._onScroll) : this._unregister = i(o, this._onScroll);
    }
  }, e._unregisterScrollEvent = function() {
    var n;
    (n = this._unregister) === null || n === void 0 || n.call(this), this._unregister = null;
  }, r;
}(ra);
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
function Eu() {
  for (var t = 0, r = 0, e = arguments.length; r < e; r++) t += arguments[r].length;
  for (var n = Array(t), a = 0, r = 0; r < e; r++) for (var i = arguments[r], o = 0, s = i.length; o < s; o++, a++) n[a] = i[o];
  return n;
}
function Ft(t) {
  return tt(t, Et);
}
function yu(t, r) {
  return t.every(function(e, n) {
    return Ft(e - r[n]) === 0;
  });
}
function Cu(t, r) {
  return !Ft(t[0] - r[0]) && !Ft(t[1] - r[1]);
}
function Xi(t) {
  return t.length < 3 ? 0 : Math.abs(Us(t.map(function(r, e) {
    var n = t[e + 1] || t[0];
    return r[0] * n[1] - n[0] * r[1];
  }))) / 2;
}
function Na(t, r) {
  var e = r.width, n = r.height, a = r.left, i = r.top, o = yr(t), s = o.minX, u = o.minY, f = o.maxX, l = o.maxY, v = e / (f - s), c = n / (l - u);
  return t.map(function(d) {
    return [a + (d[0] - s) * v, i + (d[1] - u) * c];
  });
}
function yr(t) {
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
function En(t, r, e) {
  var n = t[0], a = t[1], i = yr(r), o = i.minX, s = i.maxX, u = [[o, a], [s, a]], f = ze(u[0], u[1]), l = yn(r), v = [];
  if (l.forEach(function(p) {
    var g = ze(p[0], p[1]), h = p[0];
    if (yu(f, g))
      v.push({
        pos: t,
        line: p,
        type: "line"
      });
    else {
      var m = Vi(ea(f, g), [u, p]);
      m.forEach(function(x) {
        p.some(function(S) {
          return Cu(S, x);
        }) ? v.push({
          pos: x,
          line: p,
          type: "point"
        }) : Ft(h[1] - a) !== 0 && v.push({
          pos: x,
          line: p,
          type: "intersection"
        });
      });
    }
  }), Ht(v, function(p) {
    return p[0] === n;
  }))
    return !0;
  var c = 0, d = {};
  return v.forEach(function(p) {
    var g = p.pos, h = p.type, m = p.line;
    if (!(g[0] > n))
      if (h === "intersection")
        ++c;
      else {
        if (h === "line")
          return;
        if (h === "point") {
          var x = Ht(m, function(E) {
            return E[1] !== a;
          }), S = d[g[0]], b = x[1] > a ? 1 : -1;
          S ? S !== b && ++c : d[g[0]] = b;
        }
      }
  }), c % 2 === 1;
}
function ze(t, r) {
  var e = t[0], n = t[1], a = r[0], i = r[1], o = a - e, s = i - n;
  Math.abs(o) < Et && (o = 0), Math.abs(s) < Et && (s = 0);
  var u = 0, f = 0, l = 0;
  return o ? s ? (u = -s / o, f = 1, l = -u * e - n) : (f = 1, l = -n) : s && (u = -1, l = e), [u, f, l];
}
function ea(t, r) {
  var e = t[0], n = t[1], a = t[2], i = r[0], o = r[1], s = r[2], u = e === 0 && i === 0, f = n === 0 && o === 0, l = [];
  if (u && f)
    return [];
  if (u) {
    var v = -a / n, c = -s / o;
    return v !== c ? [] : [[-1 / 0, v], [1 / 0, v]];
  } else if (f) {
    var d = -a / e, p = -s / i;
    return d !== p ? [] : [[d, -1 / 0], [d, 1 / 0]];
  } else if (e === 0) {
    var g = -a / n, h = -(o * g + s) / i;
    l = [[h, g]];
  } else if (i === 0) {
    var g = -s / o, h = -(n * g + a) / e;
    l = [[h, g]];
  } else if (n === 0) {
    var h = -a / e, g = -(i * h + s) / o;
    l = [[h, g]];
  } else if (o === 0) {
    var h = -s / i, g = -(e * h + a) / n;
    l = [[h, g]];
  } else {
    var h = (n * s - o * a) / (o * e - n * i), g = -(e * h + a) / n;
    l = [[h, g]];
  }
  return l.map(function(m) {
    return [m[0], m[1]];
  });
}
function Vi(t, r) {
  var e = r.map(function(v) {
    return [0, 1].map(function(c) {
      return [Math.min(v[0][c], v[1][c]), Math.max(v[0][c], v[1][c])];
    });
  }), n = [];
  if (t.length === 2) {
    var a = t[0], i = a[0], o = a[1];
    if (Ft(i - t[1][0])) {
      if (!Ft(o - t[1][1])) {
        var f = Math.max.apply(Math, e.map(function(v) {
          return v[0][0];
        })), l = Math.min.apply(Math, e.map(function(v) {
          return v[0][1];
        }));
        if (Ft(f - l) > 0)
          return [];
        n = [[f, o], [l, o]];
      }
    } else {
      var s = Math.max.apply(Math, e.map(function(v) {
        return v[1][0];
      })), u = Math.min.apply(Math, e.map(function(v) {
        return v[1][1];
      }));
      if (Ft(s - u) > 0)
        return [];
      n = [[i, s], [i, u]];
    }
  }
  return n.length || (n = t.filter(function(v) {
    var c = v[0], d = v[1];
    return e.every(function(p) {
      return 0 <= Ft(c - p[0][0]) && 0 <= Ft(p[0][1] - c) && 0 <= Ft(d - p[1][0]) && 0 <= Ft(p[1][1] - d);
    });
  })), n.map(function(v) {
    return [Ft(v[0]), Ft(v[1])];
  });
}
function yn(t) {
  return Eu(t.slice(1), [t[0]]).map(function(r, e) {
    return [t[e], r];
  });
}
function _u(t, r) {
  var e = t.slice(), n = r.slice();
  Ba(e) === -1 && e.reverse(), Ba(n) === -1 && n.reverse();
  var a = yn(e), i = yn(n), o = a.map(function(l) {
    return ze(l[0], l[1]);
  }), s = i.map(function(l) {
    return ze(l[0], l[1]);
  }), u = [];
  o.forEach(function(l, v) {
    var c = a[v], d = [];
    s.forEach(function(p, g) {
      var h = ea(l, p), m = Vi(h, [c, i[g]]);
      d.push.apply(d, m.map(function(x) {
        return {
          index1: v,
          index2: g,
          pos: x,
          type: "intersection"
        };
      }));
    }), d.sort(function(p, g) {
      return rr(c[0], p.pos) - rr(c[0], g.pos);
    }), u.push.apply(u, d), En(c[1], n) && u.push({
      index1: v,
      index2: -1,
      pos: c[1],
      type: "inside"
    });
  }), i.forEach(function(l, v) {
    if (En(l[1], e)) {
      var c = !1, d = nr(u, function(p) {
        var g = p.index2;
        return g === v ? (c = !0, !1) : !!c;
      });
      d === -1 && (c = !1, d = nr(u, function(p) {
        var g = p.index1, h = p.index2;
        return g === -1 && h + 1 === v ? (c = !0, !1) : !!c;
      })), d === -1 ? u.push({
        index1: -1,
        index2: v,
        pos: l[1],
        type: "inside"
      }) : u.splice(d, 0, {
        index1: -1,
        index2: v,
        pos: l[1],
        type: "inside"
      });
    }
  });
  var f = {};
  return u.filter(function(l) {
    var v = l.pos, c = v[0] + "x" + v[1];
    return f[c] ? !1 : (f[c] = !0, !0);
  });
}
function Mu(t, r) {
  var e = _u(t, r);
  return e.map(function(n) {
    var a = n.pos;
    return a;
  });
}
function wu(t, r) {
  var e = Mu(t, r);
  return Xi(e);
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
var Cn = function(t, r) {
  return Cn = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(e, n) {
    e.__proto__ = n;
  } || function(e, n) {
    for (var a in n) n.hasOwnProperty(a) && (e[a] = n[a]);
  }, Cn(t, r);
};
function Ru(t, r) {
  Cn(t, r);
  function e() {
    this.constructor = t;
  }
  t.prototype = r === null ? Object.create(r) : (e.prototype = r.prototype, new e());
}
var Dt = function() {
  return Dt = Object.assign || function(r) {
    for (var e, n = 1, a = arguments.length; n < a; n++) {
      e = arguments[n];
      for (var i in e) Object.prototype.hasOwnProperty.call(e, i) && (r[i] = e[i]);
    }
    return r;
  }, Dt.apply(this, arguments);
};
function Tu(t, r) {
  var e = r[0] - t[0], n = r[1] - t[1], a = Math.atan2(n, e);
  return a >= 0 ? a : a + Math.PI * 2;
}
function en(t) {
  return Tu([
    t[0].clientX,
    t[0].clientY
  ], [
    t[1].clientX,
    t[1].clientY
  ]) / Math.PI * 180;
}
function Ou(t) {
  return t.touches && t.touches.length >= 2;
}
function Se(t) {
  return t ? t.touches ? Iu(t.touches) : [qi(t)] : [];
}
function Pu(t) {
  return t && (t.type.indexOf("mouse") > -1 || "button" in t);
}
function Wa(t, r, e) {
  var n = e.length, a = Zr(t, n), i = a.clientX, o = a.clientY, s = a.originalClientX, u = a.originalClientY, f = Zr(r, n), l = f.clientX, v = f.clientY, c = Zr(e, n), d = c.clientX, p = c.clientY, g = i - l, h = o - v, m = i - d, x = o - p;
  return {
    clientX: s,
    clientY: u,
    deltaX: g,
    deltaY: h,
    distX: m,
    distY: x
  };
}
function nn(t) {
  return Math.sqrt(Math.pow(t[0].clientX - t[1].clientX, 2) + Math.pow(t[0].clientY - t[1].clientY, 2));
}
function Iu(t) {
  for (var r = Math.min(t.length, 2), e = [], n = 0; n < r; ++n)
    e.push(qi(t[n]));
  return e;
}
function qi(t) {
  return {
    clientX: t.clientX,
    clientY: t.clientY
  };
}
function Zr(t, r) {
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
var an = /* @__PURE__ */ function() {
  function t(r) {
    this.prevClients = [], this.startClients = [], this.movement = 0, this.length = 0, this.startClients = r, this.prevClients = r, this.length = r.length;
  }
  return t.prototype.getAngle = function(r) {
    return r === void 0 && (r = this.prevClients), en(r);
  }, t.prototype.getRotation = function(r) {
    return r === void 0 && (r = this.prevClients), en(r) - en(this.startClients);
  }, t.prototype.getPosition = function(r, e) {
    r === void 0 && (r = this.prevClients);
    var n = Wa(r || this.prevClients, this.prevClients, this.startClients), a = n.deltaX, i = n.deltaY;
    return this.movement += Math.sqrt(a * a + i * i), this.prevClients = r, n;
  }, t.prototype.getPositions = function(r) {
    r === void 0 && (r = this.prevClients);
    for (var e = this.prevClients, n = this.startClients, a = Math.min(this.length, e.length), i = [], o = 0; o < a; ++o)
      i[o] = Wa([r[o]], [e[o]], [n[o]]);
    return i;
  }, t.prototype.getMovement = function(r) {
    var e = this.movement;
    if (!r)
      return e;
    var n = Zr(r, this.length), a = Zr(this.prevClients, this.length), i = n.clientX - a.clientX, o = n.clientY - a.clientY;
    return Math.sqrt(i * i + o * o) + e;
  }, t.prototype.getDistance = function(r) {
    return r === void 0 && (r = this.prevClients), nn(r);
  }, t.prototype.getScale = function(r) {
    return r === void 0 && (r = this.prevClients), nn(r) / nn(this.startClients);
  }, t.prototype.move = function(r, e) {
    this.startClients.forEach(function(n) {
      n.clientX -= r, n.clientY -= e;
    }), this.prevClients.forEach(function(n) {
      n.clientX -= r, n.clientY -= e;
    });
  }, t;
}(), Ha = ["textarea", "input"], zu = /* @__PURE__ */ function(t) {
  Ru(r, t);
  function r(e, n) {
    n === void 0 && (n = {});
    var a = t.call(this) || this;
    a.options = {}, a.flag = !1, a.pinchFlag = !1, a.data = {}, a.isDrag = !1, a.isPinch = !1, a.clientStores = [], a.targets = [], a.prevTime = 0, a.doubleFlag = !1, a._useMouse = !1, a._useTouch = !1, a._useDrag = !1, a._dragFlag = !1, a._isTrusted = !1, a._isMouseEvent = !1, a._isSecondaryButton = !1, a._preventMouseEvent = !1, a._prevInputEvent = null, a._isDragAPI = !1, a._isIdle = !0, a._preventMouseEventId = 0, a._window = window, a.onDragStart = function(c, d) {
      if (d === void 0 && (d = !0), !(!a.flag && c.cancelable === !1)) {
        var p = c.type.indexOf("drag") >= -1;
        if (!(a.flag && p)) {
          a._isDragAPI = !0;
          var g = a.options, h = g.container, m = g.pinchOutside, x = g.preventWheelClick, S = g.preventRightClick, b = g.preventDefault, E = g.checkInput, D = g.dragFocusedInput, C = g.preventClickEventOnDragStart, y = g.preventClickEventOnDrag, _ = g.preventClickEventByCondition, w = a._useTouch, P = !a.flag;
          if (a._isSecondaryButton = c.which === 3 || c.button === 2, x && (c.which === 2 || c.button === 1) || S && (c.which === 3 || c.button === 2))
            return a.stop(), !1;
          if (P) {
            var O = a._window.document.activeElement, T = c.target;
            if (T) {
              var I = T.tagName.toLowerCase(), z = Ha.indexOf(I) > -1, k = T.isContentEditable;
              if (z || k) {
                if (E || !D && O === T)
                  return !1;
                if (O && (O === T || k && O.isContentEditable && O.contains(T)))
                  if (D)
                    T.blur();
                  else
                    return !1;
              } else if ((b || c.type === "touchstart") && O) {
                var F = O.tagName.toLowerCase();
                (O.isContentEditable || Ha.indexOf(F) > -1) && O.blur();
              }
              (C || y || _) && Ot(a._window, "click", a._onClick, !0);
            }
            a.clientStores = [new an(Se(c))], a._isIdle = !1, a.flag = !0, a.isDrag = !1, a._isTrusted = d, a._dragFlag = !0, a._prevInputEvent = c, a.data = {}, a.doubleFlag = ne() - a.prevTime < 200, a._isMouseEvent = Pu(c), !a._isMouseEvent && a._preventMouseEvent && a._allowMouseEvent();
            var A = a._preventMouseEvent || a.emit("dragStart", Dt(Dt({ data: a.data, datas: a.data, inputEvent: c, isMouseEvent: a._isMouseEvent, isSecondaryButton: a._isSecondaryButton, isTrusted: d, isDouble: a.doubleFlag }, a.getCurrentStore().getPosition()), { preventDefault: function() {
              c.preventDefault();
            }, preventDrag: function() {
              a._dragFlag = !1;
            } }));
            A === !1 && a.stop(), a._isMouseEvent && a.flag && b && c.preventDefault();
          }
          if (!a.flag)
            return !1;
          var W = 0;
          if (P ? (a._attchDragEvent(), w && m && (W = setTimeout(function() {
            Ot(h, "touchstart", a.onDragStart, {
              passive: !1
            });
          }))) : w && m && Rt(h, "touchstart", a.onDragStart), a.flag && Ou(c)) {
            if (clearTimeout(W), P && c.touches.length !== c.changedTouches.length)
              return;
            a.pinchFlag || a.onPinchStart(c);
          }
        }
      }
    }, a.onDrag = function(c, d) {
      if (a.flag) {
        var p = a.options.preventDefault;
        !a._isMouseEvent && p && c.preventDefault(), a._prevInputEvent = c;
        var g = Se(c), h = a.moveClients(g, c, !1);
        if (a._dragFlag) {
          if (a.pinchFlag || h.deltaX || h.deltaY) {
            var m = a._preventMouseEvent || a.emit("drag", Dt(Dt({}, h), { isScroll: !!d, inputEvent: c }));
            if (m === !1) {
              a.stop();
              return;
            }
          }
          a.pinchFlag && a.onPinch(c, g);
        }
        a.getCurrentStore().getPosition(g, !0);
      }
    }, a.onDragEnd = function(c) {
      if (a.flag) {
        var d = a.options, p = d.pinchOutside, g = d.container, h = d.preventClickEventOnDrag, m = d.preventClickEventOnDragStart, x = d.preventClickEventByCondition, S = a.isDrag;
        (h || m || x) && requestAnimationFrame(function() {
          a._allowClickEvent();
        }), !x && !m && h && !S && a._allowClickEvent(), a._useTouch && p && Rt(g, "touchstart", a.onDragStart), a.pinchFlag && a.onPinchEnd(c);
        var b = c?.touches ? Se(c) : [], E = b.length;
        E === 0 || !a.options.keepDragging ? a.flag = !1 : a._addStore(new an(b));
        var D = a._getPosition(), C = ne(), y = !S && a.doubleFlag;
        a._prevInputEvent = null, a.prevTime = S || y ? 0 : C, a.flag || (a._dettachDragEvent(), a._preventMouseEvent || a.emit("dragEnd", Dt({ data: a.data, datas: a.data, isDouble: y, isDrag: S, isClick: !S, isMouseEvent: a._isMouseEvent, isSecondaryButton: a._isSecondaryButton, inputEvent: c, isTrusted: a._isTrusted }, D)), a.clientStores = [], a._isMouseEvent || (a._preventMouseEvent = !0, clearTimeout(a._preventMouseEventId), a._preventMouseEventId = setTimeout(function() {
          a._preventMouseEvent = !1;
        }, 200)), a._isIdle = !0);
      }
    }, a.onBlur = function() {
      a.onDragEnd();
    }, a._allowClickEvent = function() {
      Rt(a._window, "click", a._onClick, !0);
    }, a._onClick = function(c) {
      a._allowClickEvent(), a._allowMouseEvent();
      var d = a.options.preventClickEventByCondition;
      d?.(c) || (c.stopPropagation(), c.preventDefault());
    }, a._onContextMenu = function(c) {
      var d = a.options;
      d.preventRightClick ? a.onDragEnd(c) : c.preventDefault();
    }, a._passCallback = function() {
    };
    var i = [].concat(e), o = i[0];
    a._window = Fi(o) ? o : lr(o), a.options = Dt({ checkInput: !1, container: o && !("document" in o) ? lr(o) : o, preventRightClick: !0, preventWheelClick: !0, preventClickEventOnDragStart: !1, preventClickEventOnDrag: !1, preventClickEventByCondition: null, preventDefault: !0, checkWindowBlur: !1, keepDragging: !1, pinchThreshold: 0, events: ["touch", "mouse"] }, n);
    var s = a.options, u = s.container, f = s.events, l = s.checkWindowBlur;
    if (a._useDrag = f.indexOf("drag") > -1, a._useTouch = f.indexOf("touch") > -1, a._useMouse = f.indexOf("mouse") > -1, a.targets = i, a._useDrag && i.forEach(function(c) {
      Ot(c, "dragstart", a.onDragStart);
    }), a._useMouse && (i.forEach(function(c) {
      Ot(c, "mousedown", a.onDragStart), Ot(c, "mousemove", a._passCallback);
    }), Ot(u, "contextmenu", a._onContextMenu)), l && Ot(lr(), "blur", a.onBlur), a._useTouch) {
      var v = {
        passive: !1
      };
      i.forEach(function(c) {
        Ot(c, "touchstart", a.onDragStart, v), Ot(c, "touchmove", a._passCallback, v);
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
    return e === void 0 && (e = this._prevInputEvent), Dt(Dt({ data: this.data, datas: this.data }, this._getPosition()), { movement: this.getMovement(), isDrag: this.isDrag, isPinch: this.isPinch, isScroll: !1, inputEvent: e });
  }, r.prototype.getEventData = function() {
    return this.data;
  }, r.prototype.getEventDatas = function() {
    return this.data;
  }, r.prototype.unset = function() {
    var e = this, n = this.targets, a = this.options.container;
    this.off(), Rt(this._window, "blur", this.onBlur), this._useDrag && n.forEach(function(i) {
      Rt(i, "dragstart", e.onDragStart);
    }), this._useMouse && (n.forEach(function(i) {
      Rt(i, "mousedown", e.onDragStart);
    }), Rt(a, "contextmenu", this._onContextMenu)), this._useTouch && (n.forEach(function(i) {
      Rt(i, "touchstart", e.onDragStart);
    }), Rt(a, "touchstart", this.onDragStart)), this._prevInputEvent = null, this._allowClickEvent(), this._dettachDragEvent();
  }, r.prototype.onPinchStart = function(e) {
    var n = this, a = this.options.pinchThreshold;
    if (!(this.isDrag && this.getMovement() > a)) {
      var i = new an(Se(e));
      this.pinchFlag = !0, this._addStore(i);
      var o = this.emit("pinchStart", Dt(Dt({ data: this.data, datas: this.data, angle: i.getAngle(), touches: this.getCurrentStore().getPositions() }, i.getPosition()), { inputEvent: e, isTrusted: this._isTrusted, preventDefault: function() {
        e.preventDefault();
      }, preventDrag: function() {
        n._dragFlag = !1;
      } }));
      o === !1 && (this.pinchFlag = !1);
    }
  }, r.prototype.onPinch = function(e, n) {
    if (!(!this.flag || !this.pinchFlag || n.length < 2)) {
      var a = this.getCurrentStore();
      this.isPinch = !0, this.emit("pinch", Dt(Dt({ data: this.data, datas: this.data, movement: this.getMovement(n), angle: a.getAngle(n), rotation: a.getRotation(n), touches: a.getPositions(n), scale: a.getScale(n), distance: a.getDistance(n) }, a.getPosition(n)), { inputEvent: e, isTrusted: this._isTrusted }));
    }
  }, r.prototype.onPinchEnd = function(e) {
    if (this.pinchFlag) {
      var n = this.isPinch;
      this.isPinch = !1, this.pinchFlag = !1;
      var a = this.getCurrentStore();
      this.emit("pinchEnd", Dt(Dt({ data: this.data, datas: this.data, isPinch: n, touches: a.getPositions() }, a.getPosition()), { inputEvent: e }));
    }
  }, r.prototype.getCurrentStore = function() {
    return this.clientStores[0];
  }, r.prototype.moveClients = function(e, n, a) {
    var i = this._getPosition(e, a), o = this.isDrag;
    (i.deltaX || i.deltaY) && (this.isDrag = !0);
    var s = !1;
    return !o && this.isDrag && (s = !0), Dt(Dt({ data: this.data, datas: this.data }, i), { movement: this.getMovement(e), isDrag: this.isDrag, isPinch: this.isPinch, isScroll: !1, isMouseEvent: this._isMouseEvent, isSecondaryButton: this._isSecondaryButton, inputEvent: n, isTrusted: this._isTrusted, isFirstDrag: s });
  }, r.prototype._addStore = function(e) {
    this.clientStores.splice(0, 0, e);
  }, r.prototype._getPosition = function(e, n) {
    var a = this.getCurrentStore(), i = a.getPosition(e, n), o = this.clientStores.slice(1).reduce(function(f, l) {
      var v = l.getPosition();
      return f.distX += v.distX, f.distY += v.distY, f;
    }, i), s = o.distX, u = o.distY;
    return Dt(Dt({}, i), { distX: s, distY: u });
  }, r.prototype._attchDragEvent = function() {
    var e = this._window, n = this.options.container, a = {
      passive: !1
    };
    this._isDragAPI && (Ot(n, "dragover", this.onDrag, a), Ot(e, "dragend", this.onDragEnd)), this._useMouse && (Ot(n, "mousemove", this.onDrag), Ot(e, "mouseup", this.onDragEnd)), this._useTouch && (Ot(n, "touchmove", this.onDrag, a), Ot(e, "touchend", this.onDragEnd, a), Ot(e, "touchcancel", this.onDragEnd, a));
  }, r.prototype._dettachDragEvent = function() {
    var e = this._window, n = this.options.container;
    this._isDragAPI && (Rt(n, "dragover", this.onDrag), Rt(e, "dragend", this.onDragEnd)), this._useMouse && (Rt(n, "mousemove", this.onDrag), Rt(e, "mouseup", this.onDragEnd)), this._useTouch && (Rt(n, "touchstart", this.onDragStart), Rt(n, "touchmove", this.onDrag), Rt(e, "touchend", this.onDragEnd), Rt(e, "touchcancel", this.onDragEnd));
  }, r.prototype._allowMouseEvent = function() {
    this._preventMouseEvent = !1, clearTimeout(this._preventMouseEventId);
  }, r;
}(ra);
function Gu(t) {
  for (var r = 5381, e = t.length; e; )
    r = r * 33 ^ t.charCodeAt(--e);
  return r >>> 0;
}
var Bu = Gu;
function Au(t) {
  return Bu(t).toString(36);
}
function ku(t) {
  if (t && t.getRootNode) {
    var r = t.getRootNode();
    if (r.nodeType === 11)
      return r;
  }
}
function Fu(t, r, e) {
  return e.original ? r : r.replace(/([^};{\s}][^};{]*|^\s*){/mg, function(n, a) {
    var i = a.trim();
    return (i ? Sr(i) : [""]).map(function(o) {
      var s = o.trim();
      return s.indexOf("@") === 0 ? s : s.indexOf(":global") > -1 ? s.replace(/\:global/g, "") : s.indexOf(":host") > -1 ? "".concat(s.replace(/\:host/g, ".".concat(t))) : s ? ".".concat(t, " ").concat(s) : ".".concat(t);
    }).join(", ") + " {";
  });
}
function Nu(t, r, e, n, a) {
  var i = $n(n), o = i.createElement("style");
  return o.setAttribute("type", "text/css"), o.setAttribute("data-styled-id", t), o.setAttribute("data-styled-count", "1"), e.nonce && o.setAttribute("nonce", e.nonce), o.innerHTML = Fu(t, r, e), (a || i.head || i.body).appendChild(o), o;
}
function Wu(t) {
  var r = "rCS" + Au(t);
  return {
    className: r,
    inject: function(e, n) {
      n === void 0 && (n = {});
      var a = ku(e), i = (a || e.ownerDocument || document).querySelector('style[data-styled-id="'.concat(r, '"]'));
      if (!i)
        i = Nu(r, t, n, e, a);
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
var _n = function() {
  return _n = Object.assign || function(r) {
    for (var e, n = 1, a = arguments.length; n < a; n++) {
      e = arguments[n];
      for (var i in e) Object.prototype.hasOwnProperty.call(e, i) && (r[i] = e[i]);
    }
    return r;
  }, _n.apply(this, arguments);
};
function Hu(t, r) {
  var e = {};
  for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && r.indexOf(n) < 0 && (e[n] = t[n]);
  if (t != null && typeof Object.getOwnPropertySymbols == "function") for (var a = 0, n = Object.getOwnPropertySymbols(t); a < n.length; a++)
    r.indexOf(n[a]) < 0 && Object.prototype.propertyIsEnumerable.call(t, n[a]) && (e[n[a]] = t[n[a]]);
  return e;
}
function ji(t, r) {
  var e = Wu(r), n = e.className;
  return ct.forwardRef(function(a, i) {
    var o = a.className, s = o === void 0 ? "" : o;
    a.cspNonce;
    var u = Hu(a, ["className", "cspNonce"]), f = ct.useRef();
    return ct.useImperativeHandle(i, function() {
      return f.current;
    }, []), ct.useEffect(function() {
      var l = e.inject(f.current, {
        nonce: a.cspNonce
      });
      return function() {
        l.destroy();
      };
    }, []), ct.createElement(t, _n({
      ref: f,
      "data-styled-id": n,
      className: "".concat(s, " ").concat(n)
    }, u));
  });
}
var Mn = function(t, r) {
  return Mn = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(e, n) {
    e.__proto__ = n;
  } || function(e, n) {
    for (var a in n) Object.prototype.hasOwnProperty.call(n, a) && (e[a] = n[a]);
  }, Mn(t, r);
};
function le(t, r) {
  if (typeof r != "function" && r !== null)
    throw new TypeError("Class extends value " + String(r) + " is not a constructor or null");
  Mn(t, r);
  function e() {
    this.constructor = t;
  }
  t.prototype = r === null ? Object.create(r) : (e.prototype = r.prototype, new e());
}
var M = function() {
  return M = Object.assign || function(r) {
    for (var e, n = 1, a = arguments.length; n < a; n++) {
      e = arguments[n];
      for (var i in e) Object.prototype.hasOwnProperty.call(e, i) && (r[i] = e[i]);
    }
    return r;
  }, M.apply(this, arguments);
};
function Lu(t, r) {
  var e = {};
  for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && r.indexOf(n) < 0 && (e[n] = t[n]);
  if (t != null && typeof Object.getOwnPropertySymbols == "function")
    for (var a = 0, n = Object.getOwnPropertySymbols(t); a < n.length; a++)
      r.indexOf(n[a]) < 0 && Object.prototype.propertyIsEnumerable.call(t, n[a]) && (e[n[a]] = t[n[a]]);
  return e;
}
function Yu(t, r, e, n) {
  var a = arguments.length, i = a < 3 ? r : n, o;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") i = Reflect.decorate(t, r, e, n);
  else for (var s = t.length - 1; s >= 0; s--) (o = t[s]) && (i = (a < 3 ? o(i) : a > 3 ? o(r, e, i) : o(r, e)) || i);
  return a > 3 && i && Object.defineProperty(r, e, i), i;
}
function Xu(t) {
  var r = typeof Symbol == "function" && Symbol.iterator, e = r && t[r], n = 0;
  if (e) return e.call(t);
  if (t && typeof t.length == "number") return {
    next: function() {
      return t && n >= t.length && (t = void 0), { value: t && t[n++], done: !t };
    }
  };
  throw new TypeError(r ? "Object is not iterable." : "Symbol.iterator is not defined.");
}
function R(t, r) {
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
function N(t, r, e) {
  if (arguments.length === 2) for (var n = 0, a = r.length, i; n < a; n++)
    (i || !(n in r)) && (i || (i = Array.prototype.slice.call(r, 0, n)), i[n] = r[n]);
  return t.concat(i || Array.prototype.slice.call(r));
}
function ce(t, r) {
  return M({ events: [], props: [], name: t }, r);
}
var Vu = ["n", "w", "s", "e"], na = ["n", "w", "s", "e", "nw", "ne", "sw", "se"];
function qu(t, r) {
  return 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="'.concat(32 * t, 'px" height="').concat(32 * t, 'px" viewBox="0 0 32 32" ><path d="M 16,5 L 12,10 L 14.5,10 L 14.5,22 L 12,22 L 16,27 L 20,22 L 17.5,22 L 17.5,10 L 20, 10 L 16,5 Z" stroke-linejoin="round" stroke-width="1.2" fill="black" stroke="white" style="transform:rotate(').concat(r, 'deg);transform-origin: 16px 16px"></path></svg>');
}
function ju(t) {
  var r = qu(1, t), e = Math.round(t / 45) * 45 % 180, n = "ns-resize";
  return e === 135 ? n = "nwse-resize" : e === 45 ? n = "nesw-resize" : e === 90 && (n = "ew-resize"), "cursor:".concat(n, ";cursor: url('").concat(r, "') 16 16, ").concat(n, ";");
}
var Yr = zs(), Ui = Yr.browser.webkit, $i = Ui && function() {
  var t = typeof window > "u" ? { userAgent: "" } : window.navigator, r = /applewebkit\/([^\s]+)/g.exec(t.userAgent.toLowerCase());
  return r ? parseFloat(r[1]) < 605 : !1;
}(), Zi = Yr.browser.name, Ki = parseInt(Yr.browser.version, 10), Uu = Zi === "chrome", $u = Yr.browser.chromium, Zu = parseInt(Yr.browser.chromiumVersion, 10) || 0, Ku = Uu && Ki >= 109 || $u && Zu >= 109, Ju = Zi === "firefox", Qu = parseInt(Yr.browser.webkitVersion, 10) >= 612 || Ki >= 15, aa = "moveable-", tf = na.map(function(t) {
  var r = "", e = "", n = "center", a = "center", i = "calc(var(--moveable-control-padding, 20) * -1px)";
  return t.indexOf("n") > -1 && (r = "top: ".concat(i, ";"), a = "bottom"), t.indexOf("s") > -1 && (r = "top: 0px;", a = "top"), t.indexOf("w") > -1 && (e = "left: ".concat(i, ";"), n = "right"), t.indexOf("e") > -1 && (e = "left: 0px;", n = "left"), '.around-control[data-direction*="'.concat(t, `"] {
        `).concat(e).concat(r, `
        transform-origin: `).concat(n, " ").concat(a, `;
    }`);
}).join(`
`), rf = `
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
`.concat(tf, `
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
`).concat(ju(t), `
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

`).concat($i ? `:global svg *:before {
content:"";
transform-origin: inherit;
}` : "", `
`), ef = [
  [0, 1, 2],
  [1, 0, 3],
  [2, 0, 3],
  [3, 1, 2]
], wn = 1e-4, kt = 1e-7, be = 1e-9, Rn = Math.pow(10, 10), La = -Rn, nf = {
  n: [0, -1],
  e: [1, 0],
  s: [0, 1],
  w: [-1, 0],
  nw: [-1, -1],
  ne: [1, -1],
  sw: [-1, 1],
  se: [1, 1]
}, ia = {
  n: [0, 1],
  e: [1, 3],
  s: [3, 2],
  w: [2, 0],
  nw: [0],
  ne: [1],
  sw: [2],
  se: [3]
}, Ji = {
  n: 0,
  s: 180,
  w: 270,
  e: 90,
  nw: 315,
  ne: 45,
  sw: 225,
  se: 135
}, af = [
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
function ve(t, r, e, n, a, i) {
  var o, s;
  i === void 0 && (i = "draggable");
  var u = (s = (o = r.gestos[i]) === null || o === void 0 ? void 0 : o.move(e, t.inputEvent)) !== null && s !== void 0 ? s : {}, f = u.originalDatas || u.datas, l = f[i] || (f[i] = {});
  return M(M({}, u), { isPinch: !!n, parentEvent: !0, datas: l, originalDatas: t.originalDatas });
}
var kr = /* @__PURE__ */ function() {
  function t(r) {
    var e;
    r === void 0 && (r = "draggable"), this.ableName = r, this.prevX = 0, this.prevY = 0, this.startX = 0, this.startY = 0, this.isDrag = !1, this.isFlag = !1, this.datas = {
      draggable: {}
    }, this.datas = (e = {}, e[r] = {}, e);
  }
  return t.prototype.dragStart = function(r, e) {
    this.isDrag = !1, this.isFlag = !1;
    var n = e.originalDatas;
    return this.datas = n, n[this.ableName] || (n[this.ableName] = {}), M(M({}, this.move(r, e.inputEvent)), { type: "dragstart" });
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
function Br(t, r, e, n) {
  var a = t.length === 16, i = a ? 4 : 3, o = Mr(t, e, n, i), s = R(o, 4), u = R(s[0], 2), f = u[0], l = u[1], v = R(s[1], 2), c = v[0], d = v[1], p = R(s[2], 2), g = p[0], h = p[1], m = R(s[3], 2), x = m[0], S = m[1], b = R(xt(t, r, i), 2), E = b[0], D = b[1], C = Math.min(f, c, g, x), y = Math.min(l, d, h, S), _ = Math.max(f, c, g, x), w = Math.max(l, d, h, S);
  f = f - C || 0, c = c - C || 0, g = g - C || 0, x = x - C || 0, l = l - y || 0, d = d - y || 0, h = h - y || 0, S = S - y || 0, E = E - C || 0, D = D - y || 0;
  var P = t[0], O = t[i + 1], T = Bt(P * O);
  return {
    left: C,
    top: y,
    right: _,
    bottom: w,
    origin: [E, D],
    pos1: [f, l],
    pos2: [c, d],
    pos3: [g, h],
    pos4: [x, S],
    direction: T
  };
}
function Qi(t, r) {
  var e = r.clientX, n = r.clientY, a = r.datas, i = t.state, o = i.moveableClientRect, s = i.rootMatrix, u = i.is3d, f = i.pos1, l = o.left, v = o.top, c = u ? 4 : 3, d = R(Q(Wr(s, [e - l, n - v], c), f), 2), p = d[0], g = d[1], h = R(tr({ datas: a, distX: p, distY: g }), 2), m = h[0], x = h[1];
  return [m, x];
}
function _r(t, r) {
  var e = r.datas, n = t.state, a = n.allMatrix, i = n.beforeMatrix, o = n.is3d, s = n.left, u = n.top, f = n.origin, l = n.offsetMatrix, v = n.targetMatrix, c = n.transformOrigin, d = o ? 4 : 3;
  e.is3d = o, e.matrix = a, e.targetMatrix = v, e.beforeMatrix = i, e.offsetMatrix = l, e.transformOrigin = c, e.inverseMatrix = Qt(a, d), e.inverseBeforeMatrix = Qt(i, d), e.absoluteOrigin = Dr(ut([s, u], f), d), e.startDragBeforeDist = Pt(e.inverseBeforeMatrix, e.absoluteOrigin, d), e.startDragDist = Pt(e.inverseMatrix, e.absoluteOrigin, d);
}
function of(t) {
  return Br(t.datas.beforeTransform, [50, 50], 100, 100).direction;
}
function Le(t, r, e) {
  var n = r.datas, a = r.originalDatas.beforeRenderable, i = n.transformIndex, o = a.nextTransforms, s = o.length, u = a.nextTransformAppendedIndexes, f = -1;
  i === -1 ? (e === "translate" ? f = 0 : e === "rotate" && (f = nr(o, function(d) {
    return d.match(/scale\(/g);
  })), f === -1 && (f = o.length), n.transformIndex = f) : Ht(u, function(d) {
    return d.index === i && d.functionName === e;
  }) ? f = i : f = i + u.filter(function(d) {
    return d.index < i;
  }).length;
  var l = Il(o, t.state, f), v = l.targetFunction, c = e === "rotate" ? "rotateZ" : e;
  n.beforeFunctionTexts = l.beforeFunctionTexts, n.afterFunctionTexts = l.afterFunctionTexts, n.beforeTransform = l.beforeFunctionMatrix, n.beforeTransform2 = l.beforeFunctionMatrix2, n.targetTansform = l.targetFunctionMatrix, n.afterTransform = l.afterFunctionMatrix, n.afterTransform2 = l.afterFunctionMatrix2, n.targetAllTransform = l.allFunctionMatrix, v.functionName === c ? (n.afterFunctionTexts.splice(0, 1), n.isAppendTransform = !1) : s > f && (n.isAppendTransform = !0, a.nextTransformAppendedIndexes = N(N([], R(u), !1), [{
    functionName: e,
    index: f,
    isAppend: !0
  }], !1));
}
function Ye(t, r, e) {
  return "".concat(t.beforeFunctionTexts.join(" "), " ").concat(t.isAppendTransform ? e : r, " ").concat(t.afterFunctionTexts.join(" "));
}
function sf(t) {
  var r = t.datas, e = t.distX, n = t.distY, a = R(ro({ datas: r, distX: e, distY: n }), 2), i = a[0], o = a[1], s = to(r, eu([i, o], 4));
  return Pt(s, Dr([0, 0, 0], 4), 4);
}
function to(t, r, e) {
  var n = t.beforeTransform, a = t.afterTransform, i = t.beforeTransform2, o = t.afterTransform2, s = t.targetAllTransform, u = e ? pt(s, r, 4) : pt(r, s, 4), f = pt(Qt(e ? i : n, 4), u, 4), l = pt(f, Qt(e ? o : a, 4), 4);
  return l;
}
function ro(t) {
  var r = t.datas, e = t.distX, n = t.distY, a = r.inverseBeforeMatrix, i = r.is3d, o = r.startDragBeforeDist, s = r.absoluteOrigin, u = i ? 4 : 3;
  return Q(Pt(a, ut(s, [e, n]), u), o);
}
function tr(t, r) {
  var e = t.datas, n = t.distX, a = t.distY, i = e.inverseBeforeMatrix, o = e.inverseMatrix, s = e.is3d, u = e.startDragBeforeDist, f = e.startDragDist, l = e.absoluteOrigin, v = s ? 4 : 3;
  return Q(Pt(r ? i : o, ut(l, [n, a]), v), r ? u : f);
}
function uf(t, r) {
  var e = t.datas, n = t.distX, a = t.distY;
  e.beforeMatrix;
  var i = e.matrix, o = e.is3d;
  e.startDragBeforeDist;
  var s = e.startDragDist, u = e.absoluteOrigin, f = o ? 4 : 3;
  return Q(Pt(i, ut(s, [n, a]), f), u);
}
function ff(t, r, e, n, a, i) {
  return n === void 0 && (n = r), a === void 0 && (a = e), i === void 0 && (i = [0, 0]), t ? t.map(function(o, s) {
    var u = se(o), f = u.value, l = u.unit, v = s ? a : n, c = s ? e : r;
    if (o === "%" || isNaN(f)) {
      var d = v ? i[s] / v : 0;
      return c * d;
    } else if (l !== "%")
      return f;
    return c * f / 100;
  }) : i;
}
function eo(t) {
  var r = [];
  return t[1] >= 0 && (t[0] >= 0 && r.push(3), t[0] <= 0 && r.push(2)), t[1] <= 0 && (t[0] >= 0 && r.push(1), t[0] <= 0 && r.push(0)), r;
}
function lf(t, r) {
  return eo(r).map(function(e) {
    return t[e];
  });
}
function on(t, r) {
  var e = (r + 1) / 2;
  return [
    Pe(t[0][0], t[1][0], e, 1 - e),
    Pe(t[0][1], t[1][1], e, 1 - e)
  ];
}
function _t(t, r) {
  var e = on([t[0], t[1]], r[0]), n = on([t[2], t[3]], r[0]);
  return on([e, n], r[1]);
}
function cf(t, r, e, n, a, i) {
  var o = Mr(r, e, n, a), s = _t(o, i), u = t[0] - s[0], f = t[1] - s[1];
  return [u, f];
}
function de(t, r, e, n) {
  return pt(t, Jr(r, n, e), n);
}
function vf(t, r, e, n) {
  var a = t.transformOrigin, i = t.offsetMatrix, o = t.is3d, s = o ? 4 : 3, u;
  if (ar(e)) {
    var f = r.beforeTransform, l = r.afterTransform;
    n ? u = Kt(ae(e), 4, s) : u = Kt(pt(pt(f, ae([e]), 4), l, 4), 4, s);
  } else
    u = e;
  return de(i, u, a, s);
}
function df(t, r) {
  var e = t.transformOrigin, n = t.offsetMatrix, a = t.is3d, i = t.targetMatrix, o = t.targetAllTransform, s = a ? 4 : 3;
  return de(n, pt(o || i, Jn(r, s), s), e, s);
}
function Xe(t, r) {
  var e = Xr(r);
  return {
    setTransform: function(n, a) {
      a === void 0 && (a = -1), e.startTransforms = wt(n) ? n : cr(n), Tn(t, r, a);
    },
    setTransformIndex: function(n) {
      Tn(t, r, n);
    }
  };
}
function Ve(t, r, e) {
  var n = Xr(r), a = n.startTransforms;
  Tn(t, r, nr(a, function(i) {
    return i.indexOf("".concat(e, "(")) === 0;
  }));
}
function Tn(t, r, e) {
  var n = Xr(r), a = r.datas;
  if (a.transformIndex = e, e !== -1) {
    var i = n.startTransforms[e];
    if (i) {
      var o = t.state, s = Ar([i], {
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
function oa(t, r) {
  var e = Xr(t);
  e.nextTransforms = cr(r);
}
function Xr(t) {
  return t.originalDatas.beforeRenderable;
}
function Ge(t) {
  var r = t.originalDatas.beforeRenderable;
  return r.nextTransforms;
}
function De(t) {
  return (Ge(t) || []).join(" ");
}
function Ee(t) {
  return Xr(t).nextStyle;
}
function no(t, r, e, n, a) {
  oa(a, r);
  var i = Gt.drag(t, ve(a, t.state, e, n)), o = i ? i.transform : r;
  return M(M({ transform: r, drag: i }, At({
    transform: o
  }, a)), { afterTransform: o });
}
function sa(t, r, e, n, a, i) {
  var o = vf(t.state, a, r, i), s = hf(t, e, n, o);
  return s;
}
function ao(t, r, e, n, a, i, o) {
  var s = sa(t, r, e, a, i, o), u = t.state, f = u.left, l = u.top, v = t.props.groupable, c = v ? f : 0, d = v ? l : 0, p = Q(n, s);
  return Q(p, [c, d]);
}
function pf(t, r, e, n, a, i, o) {
  var s = ao(t, r, e, n, a, i, o);
  return s;
}
function gf(t, r, e) {
  return [
    r ? -1 + t[0] / (r / 2) : 0,
    e ? -1 + t[1] / (e / 2) : 0
  ];
}
function hf(t, r, e, n) {
  n === void 0 && (n = t.state.allMatrix);
  var a = t.state, i = a.width, o = a.height, s = a.is3d, u = s ? 4 : 3, f = [
    i / 2 * (1 + r[0]) + e[0],
    o / 2 * (1 + r[1]) + e[1]
  ];
  return xt(n, f, u);
}
function mf(t, r, e) {
  var n = e.fixedDirection, a = e.fixedPosition, i = e.fixedOffset;
  return ao(t, "rotate(".concat(r, "deg)"), n, a, i, e);
}
function xf(t, r, e, n, a, i) {
  var o = t.props.groupable, s = t.state, u = s.transformOrigin, f = s.offsetMatrix, l = s.is3d, v = s.width, c = s.height, d = s.left, p = s.top, g = i.fixedDirection, h = i.nextTargetMatrix || s.targetMatrix, m = l ? 4 : 3, x = ff(a, r, e, v, c, u), S = o ? d : 0, b = o ? p : 0, E = de(f, h, x, m), D = cf(n, E, r, e, m, g);
  return Q(D, [S, b]);
}
function Sf(t, r) {
  return _t(qt(t.state), r);
}
function bf(t, r) {
  var e = t.targetGesto, n = t.controlGesto, a;
  return e?.isFlag() && (a = e.getEventData()[r]), !a && n?.isFlag() && (a = n.getEventData()[r]), a || {};
}
function Df(t) {
  if (t && t.getRootNode) {
    var r = t.getRootNode();
    if (r.nodeType === 11)
      return r;
  }
}
function Ef(t) {
  var r = t("scale"), e = t("rotate"), n = t("translate"), a = [];
  return n && n !== "0px" && n !== "none" && a.push("translate(".concat(n.split(/\s+/).join(","), ")")), e && e !== "1" && e !== "none" && a.push("rotate(".concat(e, ")")), r && r !== "1" && r !== "none" && a.push("scale(".concat(r.split(/\s+/).join(","), ")")), a;
}
function io(t, r, e) {
  for (var n = t, a = [], i = Zn(t) || pr(t), o = !e && t === r || t === i, s = o, u = !1, f = 3, l, v, c, d = !1, p = oe(r, r, !0).offsetParent, g = 1; n && !s; ) {
    s = o;
    var h = Nt(n), m = h("position"), x = Oo(n), S = m === "fixed", b = Ef(h), E = nu(Sl(x)), D = void 0, C = !1, y = !1, _ = 0, w = 0, P = 0, O = 0, T = {
      hasTransform: !1,
      fixedContainer: null
    };
    S && (d = !0, T = Cl(n), p = T.fixedContainer);
    var I = E.length;
    !u && (I === 16 || b.length) && (u = !0, f = 4, Bn(a), c && (c = Kt(c, 3, 4))), u && I === 9 && (E = Kt(E, 3, 4));
    var z = yl(n, t), k = z.tagName, F = z.hasOffset, A = z.isSVG, W = z.origin, H = z.targetOrigin, G = z.offset, V = R(G, 2), q = V[0], L = V[1];
    k === "svg" && !n.ownerSVGElement && c && (a.push({
      type: "target",
      target: n,
      matrix: _l(n, f)
    }), a.push({
      type: "offset",
      target: n,
      matrix: mt(f)
    }));
    var j = parseFloat(h("zoom")) || 1;
    if (S)
      D = T.fixedContainer, C = !0;
    else {
      var Y = oe(n, r, !1, !0, h), $ = Y.offsetZoom;
      if (D = Y.offsetParent, C = Y.isEnd, y = Y.isStatic, g *= $, (Y.isCustomElement || $ !== 1) && y)
        q -= D.offsetLeft, L -= D.offsetTop;
      else if (Ju || Ku) {
        var J = Y.parentSlotElement;
        if (J) {
          for (var at = D, st = 0, X = 0; at && Df(at); )
            st += at.offsetLeft, X += at.offsetTop, at = at.offsetParent;
          q -= st, L -= X;
        }
      }
    }
    if (Ui && !Qu && F && !A && y && (m === "relative" || m === "static") && (q -= D.offsetLeft, L -= D.offsetTop, o = o || C), S)
      F && T.hasTransform && (P = D.clientLeft, O = D.clientTop);
    else if (F && p !== D && (_ = D.clientLeft, w = D.clientTop), F && D === i) {
      var Z = Po(n, !1);
      q += Z[0], L += Z[1];
    }
    if (a.push({
      type: "target",
      target: n,
      matrix: Jr(E, f, W)
    }), b.length && (a.push({
      type: "offset",
      target: n,
      matrix: mt(f)
    }), a.push({
      type: "target",
      target: n,
      matrix: Jr(ae(b), f, W)
    })), F) {
      var ft = n === t, rt = ft ? 0 : n.scrollLeft, et = ft ? 0 : n.scrollTop;
      a.push({
        type: "offset",
        target: n,
        matrix: Er([
          q - rt + _ - P,
          L - et + w - O
        ], f)
      });
    } else
      a.push({
        type: "offset",
        target: n,
        origin: W
      });
    if (j !== 1 && a.push({
      type: "zoom",
      target: n,
      matrix: Jr(Jn([j, j], f), f, [0, 0])
    }), c || (c = E), l || (l = W), v || (v = H), s || S)
      break;
    n = D, o = C, (!e || n === i) && (s = o);
  }
  return c || (c = mt(f)), l || (l = [0, 0]), v || (v = [0, 0]), {
    zoom: g,
    offsetContainer: p,
    matrixes: a,
    targetMatrix: c,
    transformOrigin: l,
    targetOrigin: v,
    is3d: u,
    hasFixed: d
  };
}
var gr = null, hr = null, Or = null;
function Fr(t) {
  t ? (window.Map && (gr = /* @__PURE__ */ new Map(), hr = /* @__PURE__ */ new Map()), Or = []) : (gr = null, Or = null, hr = null);
}
function yf(t) {
  var r = hr?.get(t);
  if (r)
    return r;
  var e = Qr(t, !0);
  return hr && hr.set(t, e), e;
}
function Cf(t, r) {
  if (Or) {
    var e = Ht(Or, function(a) {
      return a[0][0] == t && a[0][1] == r;
    });
    if (e)
      return e[1];
  }
  var n = io(t, r, !0);
  return Or && Or.push([[t, r], n]), n;
}
function Nt(t) {
  var r = gr?.get(t);
  if (!r) {
    var e = lr(t).getComputedStyle(t);
    if (!gr)
      return function(i) {
        return e[i];
      };
    r = {
      style: e,
      cached: {}
    }, gr.set(t, r);
  }
  var n = r.cached, a = r.style;
  return function(i) {
    return i in n || (n[i] = a[i]), n[i];
  };
}
function $t(t, r, e) {
  var n = e.originalDatas;
  n.groupable = n.groupable || {};
  var a = n.groupable;
  a.childDatas = a.childDatas || [];
  var i = a.childDatas;
  return t.moveables.map(function(o, s) {
    return i[s] = i[s] || {}, i[s][r] = i[s][r] || {}, M(M({}, e), { isRequestChild: !0, datas: i[s][r], originalDatas: i[s] });
  });
}
function sn(t, r, e, n, a, i, o) {
  var s = !!e.match(/Start$/g), u = !!e.match(/End$/g), f = a.isPinch, l = a.datas, v = $t(t, r.name, a), c = t.moveables, d = [], p = v.map(function(g, h) {
    var m = c[h], x = m.state, S = x.gestos, b = g;
    if (s)
      b = new kr(o).dragStart(n, g), d.push(b);
    else {
      if (S[o] || (S[o] = l.childGestos[h]), !S[o])
        return;
      b = ve(g, x, n, f, i, o), d.push(b);
    }
    var E = r[e](m, M(M({}, b), { parentFlag: !0 }));
    return u && (S[o] = null), E;
  });
  return s && (l.childGestos = c.map(function(g) {
    return g.state.gestos[o];
  })), {
    eventParams: p,
    childEvents: d
  };
}
function er(t, r, e, n, a, i) {
  a === void 0 && (a = function(l, v) {
    return v;
  });
  var o = !!e.match(/End$/g), s = $t(t, r.name, n), u = t.moveables, f = s.map(function(l, v) {
    var c = u[v], d = l;
    d = a(c, l);
    var p = r[e](c, M(M({}, d), { parentFlag: !0 }));
    return p && i && i(c, l, p, v), o && (c.state.gestos = {}), p;
  });
  return f;
}
function Be(t, r, e, n) {
  var a = e.fixedDirection, i = e.fixedPosition, o = n.datas.startPositions || qt(r.state), s = _t(o, a), u = R(Pt(fe(-t.rotation / 180 * Math.PI, 3), [s[0] - i[0], s[1] - i[1], 1], 3), 2), f = u[0], l = u[1];
  return n.datas.originalX = f, n.datas.originalY = l, n;
}
function oo(t, r, e, n) {
  var a = t.getState(), i = a.renderPoses, o = a.rotation, s = a.direction, u = Cr(t.props, r).zoom, f = Kr(o / Math.PI * 180), l = {}, v = t.renderState;
  v.renderDirectionMap || (v.renderDirectionMap = {});
  var c = v.renderDirectionMap;
  e.forEach(function(p) {
    var g = p.dir;
    l[g] = !0;
  });
  var d = Bt(s);
  return e.map(function(p) {
    var g = p.data, h = p.classNames, m = p.dir, x = ia[m];
    if (!x || !l[m])
      return null;
    c[m] = !0;
    var S = (tt(f, 15) + d * Ji[m] + 720) % 180, b = {};
    return Lr(g).forEach(function(E) {
      b["data-".concat(E)] = g[E];
    }), n.createElement("div", M({ className: K.apply(void 0, N(["control", "direction", m, r], R(h), !1)), "data-rotation": S, "data-direction": m }, b, { key: "direction-".concat(m), style: Ne.apply(void 0, N([o, u], R(x.map(function(E) {
      return i[E];
    })), !1)) }));
  });
}
function so(t, r, e, n) {
  var a = Cr(t.props, e), i = a.renderDirections, o = i === void 0 ? r : i, s = a.displayAroundControls;
  if (!o)
    return [];
  var u = o === !0 ? na : o;
  return N(N([], R(s ? co(t, n, e, u) : []), !1), R(oo(t, e, u.map(function(f) {
    return {
      data: {},
      classNames: [],
      dir: f
    };
  }), n)), !1);
}
function ie(t, r, e, n, a, i) {
  for (var o = [], s = 6; s < arguments.length; s++)
    o[s - 6] = arguments[s];
  var u = St(e, n), f = r ? tt(u / Math.PI * 180, 15) % 180 : -1;
  return t.createElement("div", { key: "line-".concat(i), className: K.apply(void 0, N(["line", "direction", r ? "edge" : "", r], R(o), !1)), "data-rotation": f, "data-line-key": i, "data-direction": r, style: Ur(e, n, a, u) });
}
function uo(t, r, e, n, a) {
  var i = e === !0 ? Vu : e;
  return i.map(function(o, s) {
    var u = R(ia[o], 2), f = u[0], l = u[1];
    if (l != null)
      return ie(t, o, n[f], n[l], a, "".concat(r, "Edge").concat(s), r);
  }).filter(Boolean);
}
function fo(t) {
  return function(r, e) {
    var n = Cr(r.props, t).edge;
    return n && (n === !0 || n.length) ? N(N([], R(uo(e, t, n, r.getState().renderPoses, r.props.zoom)), !1), R(_f(r, t, e)), !1) : lo(r, t, e);
  };
}
function lo(t, r, e) {
  return so(t, na, r, e);
}
function _f(t, r, e) {
  return so(t, ["nw", "ne", "sw", "se"], r, e);
}
function co(t, r, e, n) {
  var a = t.renderState;
  a.renderDirectionMap || (a.renderDirectionMap = {});
  var i = t.getState(), o = i.renderPoses, s = i.rotation, u = i.direction, f = a.renderDirectionMap, l = t.props.zoom, v = Bt(u), c = s / Math.PI * 180;
  return (n || Lr(f)).map(function(d) {
    var p = ia[d];
    if (!p)
      return null;
    var g = (tt(c, 15) + v * Ji[d] + 720) % 180, h = ["around-control"];
    return e && h.push("direction", e), r.createElement("div", { className: K.apply(void 0, N([], R(h), !1)), "data-rotation": g, "data-direction": d, key: "direction-around-".concat(d), style: Ne.apply(void 0, N([s, l], R(p.map(function(m) {
      return o[m];
    })), !1)) });
  });
}
function ua(t, r, e) {
  var n = t || {}, a = n.position, i = a === void 0 ? "client" : a, o = n.left, s = o === void 0 ? -1 / 0 : o, u = n.top, f = u === void 0 ? -1 / 0 : u, l = n.right, v = l === void 0 ? 1 / 0 : l, c = n.bottom, d = c === void 0 ? 1 / 0 : c, p = {
    position: i,
    left: s,
    top: f,
    right: v,
    bottom: d
  };
  return {
    vertical: Ya(p, r, !0),
    horizontal: Ya(p, e, !1)
  };
}
function qe(t, r) {
  var e = t.state, n = e.containerClientRect, a = n.clientHeight, i = n.clientWidth, o = n.clientLeft, s = n.clientTop, u = e.snapOffset, f = u.left, l = u.top, v = u.right, c = u.bottom, d = r || t.props.bounds || {}, p = d.position || "client", g = p === "css", h = d.left, m = h === void 0 ? -1 / 0 : h, x = d.top, S = x === void 0 ? -1 / 0 : x, b = d.right, E = b === void 0 ? g ? -1 / 0 : 1 / 0 : b, D = d.bottom, C = D === void 0 ? g ? -1 / 0 : 1 / 0 : D;
  return g && (E = i + v - f - E, C = a + c - l - C), {
    left: m + f - o,
    right: E + f - o,
    top: S + l - s,
    bottom: C + l - s
  };
}
function Mf(t, r, e) {
  var n = qe(t), a = n.left, i = n.top, o = n.right, s = n.bottom, u = R(e, 2), f = u[0], l = u[1], v = R(Q(e, r), 2), c = v[0], d = v[1];
  B(c) < kt && (c = 0), B(d) < kt && (d = 0);
  var p = d > 0, g = c > 0, h = {
    isBound: !1,
    offset: 0,
    pos: 0
  }, m = {
    isBound: !1,
    offset: 0,
    pos: 0
  };
  if (c === 0 && d === 0)
    return {
      vertical: h,
      horizontal: m
    };
  if (c === 0)
    p ? s < l && (m.pos = s, m.offset = l - s) : i > l && (m.pos = i, m.offset = l - i);
  else if (d === 0)
    g ? o < f && (h.pos = o, h.offset = f - o) : a > f && (h.pos = a, h.offset = f - a);
  else {
    var x = d / c, S = e[1] - x * f, b = 0, E = 0, D = !1;
    g && o <= f ? (b = x * o + S, E = o, D = !0) : !g && f <= a && (b = x * a + S, E = a, D = !0), D && (b < i || b > s) && (D = !1), D || (p && s <= l ? (b = s, E = (b - S) / x, D = !0) : !p && l <= i && (b = i, E = (b - S) / x, D = !0)), D && (h.isBound = !0, h.pos = E, h.offset = f - E, m.isBound = !0, m.pos = b, m.offset = l - b);
  }
  return {
    vertical: h,
    horizontal: m
  };
}
function Ya(t, r, e) {
  var n = t[e ? "left" : "top"], a = t[e ? "right" : "bottom"], i = Math.min.apply(Math, N([], R(r), !1)), o = Math.max.apply(Math, N([], R(r), !1)), s = [];
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
    return B(f.offset) - B(u.offset);
  });
}
function Xa(t, r, e) {
  var n = e ? t.map(function(a) {
    return ue(a, e);
  }) : t;
  return n.some(function(a) {
    return a[0] < r.left && B(a[0] - r.left) > 0.1 || a[0] > r.right && B(a[0] - r.right) > 0.1 || a[1] < r.top && B(a[1] - r.top) > 0.1 || a[1] > r.bottom && B(a[1] - r.bottom) > 0.1;
  });
}
function wf(t, r, e) {
  var n = Vt(t), a = Math.sqrt(n * n - r * r) || 0;
  return [a, -a].sort(function(i, o) {
    return B(i - t[e ? 0 : 1]) - B(o - t[e ? 0 : 1]);
  }).map(function(i) {
    return St([0, 0], e ? [i, r] : [r, i]);
  });
}
function Rf(t, r, e, n, a) {
  if (!t.props.bounds)
    return [];
  var i = a * Math.PI / 180, o = qe(t), s = o.left, u = o.top, f = o.right, l = o.bottom, v = s - n[0], c = f - n[0], d = u - n[1], p = l - n[1], g = {
    left: v,
    top: d,
    right: c,
    bottom: p
  };
  if (!Xa(e, g, 0))
    return [];
  var h = [];
  return [
    [v, 0],
    [c, 0],
    [d, 1],
    [p, 1]
  ].forEach(function(m) {
    var x = R(m, 2), S = x[0], b = x[1];
    e.forEach(function(E) {
      var D = St([0, 0], E);
      h.push.apply(h, N([], R(wf(E, S, b).map(function(C) {
        return i + C - D;
      }).filter(function(C) {
        return !Xa(r, g, C);
      }).map(function(C) {
        return tt(C * 180 / Math.PI, kt);
      })), !1));
    });
  }), h;
}
var Tf = ["left", "right", "center"], Of = ["top", "bottom", "middle"], Va = {
  left: "start",
  right: "end",
  center: "center",
  top: "start",
  bottom: "end",
  middle: "center"
}, vr = {
  start: "left",
  end: "right",
  center: "center"
}, dr = {
  start: "top",
  end: "bottom",
  center: "middle"
};
function Pr() {
  return {
    left: !1,
    top: !1,
    right: !1,
    bottom: !1
  };
}
function Vr(t, r) {
  var e = t.props, n = e.snappable, a = e.bounds, i = e.innerBounds, o = e.verticalGuidelines, s = e.horizontalGuidelines, u = e.snapGridWidth, f = e.snapGridHeight, l = t.state, v = l.guidelines, c = l.enableSnap;
  return !n || !c || r && n !== !0 && n.indexOf(r) < 0 ? !1 : !!(u || f || a || i || v && v.length || o && o.length || s && s.length);
}
function fa(t) {
  return t === !1 ? {} : t === !0 || !t ? { left: !0, right: !0, top: !0, bottom: !0 } : t;
}
function Pf(t, r) {
  var e = fa(t), n = {};
  for (var a in e)
    a in r && e[a] && (n[a] = r[a]);
  return n;
}
function la(t, r) {
  var e = Pf(t, r), n = Of.filter(function(i) {
    return i in e;
  }), a = Tf.filter(function(i) {
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
function If(t, r, e) {
  var n = xt(t, [r.clientLeft, r.clientTop], e);
  return [
    r.left + n[0],
    r.top + n[1]
  ];
}
function zf(t) {
  var r = R(t, 2), e = r[0], n = r[1], a = n[0] - e[0], i = n[1] - e[1];
  Math.abs(a) < Et && (a = 0), Math.abs(i) < Et && (i = 0);
  var o = 0, s = 0, u = 0;
  return a ? i ? (o = -i / a, s = 1, u = o * e[0] - e[1]) : (s = 1, u = -e[1]) : (o = -1, u = e[0]), [o, s, u].map(function(f) {
    return tt(f, Et);
  });
}
var vo = "snapRotationThreshold", po = "snapRotationDegrees", go = "snapHorizontalThreshold", ho = "snapVerticalThreshold";
function je(t, r, e, n, a, i, o) {
  var s;
  n === void 0 && (n = []), a === void 0 && (a = []);
  var u = t.props, f = ((s = t.state.snapThresholdInfo) === null || s === void 0 ? void 0 : s.multiples) || [1, 1], l = oi(o, u[go], 5), v = oi(i, u[ho], 5);
  return mo(t.state.guidelines, r, e, n, a, l, v, f);
}
function mo(t, r, e, n, a, i, o, s) {
  return {
    vertical: ja(t, "vertical", r, o * s[0], n),
    horizontal: ja(t, "horizontal", e, i * s[1], a)
  };
}
function Gf(t, r, e) {
  var n = R(e, 2), a = n[0], i = n[1], o = R(r, 2), s = o[0], u = o[1], f = R(Q(e, r), 2), l = f[0], v = f[1], c = v > 0, d = l > 0;
  l = We(l), v = We(v);
  var p = {
    isSnap: !1,
    offset: 0,
    pos: 0
  }, g = {
    isSnap: !1,
    offset: 0,
    pos: 0
  };
  if (l === 0 && v === 0)
    return {
      vertical: p,
      horizontal: g
    };
  var h = je(t, l ? [a] : [], v ? [i] : [], [], [], void 0, void 0), m = h.vertical, x = h.horizontal;
  m.posInfos.filter(function(k) {
    var F = k.pos;
    return d ? F >= s : F <= s;
  }), x.posInfos.filter(function(k) {
    var F = k.pos;
    return c ? F >= u : F <= u;
  }), m.isSnap = m.posInfos.length > 0, x.isSnap = x.posInfos.length > 0;
  var S = On(m), b = S.isSnap, E = S.guideline, D = On(x), C = D.isSnap, y = D.guideline, _ = C ? y.pos[1] : 0, w = b ? E.pos[0] : 0;
  if (l === 0)
    C && (g.isSnap = !0, g.pos = y.pos[1], g.offset = i - g.pos);
  else if (v === 0)
    b && (p.isSnap = !0, p.pos = w, p.offset = a - w);
  else {
    var P = v / l, O = e[1] - P * a, T = 0, I = 0, z = !1;
    b ? (I = w, T = P * I + O, z = !0) : C && (T = _, I = (T - O) / P, z = !0), z && (p.isSnap = !0, p.pos = I, p.offset = a - I, g.isSnap = !0, g.pos = T, g.offset = i - T);
  }
  return {
    vertical: p,
    horizontal: g
  };
}
function ur(t) {
  var r = "";
  return t === -1 || t === "top" || t === "left" ? r = "start" : t === 0 || t === "center" || t === "middle" ? r = "center" : (t === 1 || t === "right" || t === "bottom") && (r = "end"), r;
}
function qa(t, r, e, n) {
  var a = la(t.props.snapDirections, r), i = je(t, a.vertical, a.horizontal, a.verticalNames.map(function(u) {
    return ur(u);
  }), a.horizontalNames.map(function(u) {
    return ur(u);
  }), e, n), o = ur(a.horizontalNames[i.horizontal.index]), s = ur(a.verticalNames[i.vertical.index]);
  return {
    vertical: M(M({}, i.vertical), { direction: s }),
    horizontal: M(M({}, i.horizontal), { direction: o })
  };
}
function On(t) {
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
function ja(t, r, e, n, a) {
  var i, o;
  if (a === void 0 && (a = []), !t || !t.length)
    return {
      isSnap: !1,
      index: -1,
      direction: "",
      posInfos: []
    };
  var s = r === "vertical", u = s ? 0 : 1, f = e.map(function(v, c) {
    var d = a[c] || "", p = t.map(function(g) {
      var h = g.pos, m = v - h[u];
      return {
        offset: m,
        dist: B(m),
        guideline: g,
        direction: d
      };
    }).filter(function(g) {
      var h = g.guideline, m = g.dist, x = h.type;
      return !(x !== r || m > n);
    }).sort(function(g, h) {
      return g.dist - h.dist;
    });
    return {
      pos: v,
      index: c,
      guidelineInfos: p,
      direction: d
    };
  }).filter(function(v) {
    return v.guidelineInfos.length > 0;
  }).sort(function(v, c) {
    return v.guidelineInfos[0].dist - c.guidelineInfos[0].dist;
  }), l = f.length > 0;
  return {
    isSnap: l,
    index: l ? f[0].index : -1,
    direction: (o = (i = f[0]) === null || i === void 0 ? void 0 : i.direction) !== null && o !== void 0 ? o : "",
    posInfos: f
  };
}
function Bf(t, r, e, n, a) {
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
  ].forEach(function(c, d, p) {
    var g = p[d + 1] || p[0];
    i.push(c), i.push([
      (c[0] + g[0]) / 2,
      (c[1] + g[1]) / 2
    ]);
  }) : t.props.keepRatio ? i.push([-1, -1], [-1, 1], [1, -1], [1, 1], e) : (i.push.apply(i, N([], R(lf([
    [-1, -1],
    [1, -1],
    [-1, -1],
    [1, 1]
  ], e)), !1)), i.length > 1 && i.push([
    (i[0][0] + i[1][0]) / 2,
    (i[0][1] + i[1][1]) / 2
  ]));
  var o = i.map(function(c) {
    return _t(r, c);
  }), s = o.map(function(c) {
    return c[0];
  }), u = o.map(function(c) {
    return c[1];
  }), f = je(t, s, u, i.map(function(c) {
    return ur(c[0]);
  }), i.map(function(c) {
    return ur(c[1]);
  }), n, a), l = ur(i.map(function(c) {
    return c[0];
  })[f.vertical.index]), v = ur(i.map(function(c) {
    return c[1];
  })[f.horizontal.index]);
  return {
    vertical: M(M({}, f.vertical), { direction: l }),
    horizontal: M(M({}, f.horizontal), { direction: v })
  };
}
function xo(t, r) {
  var e = B(t.offset), n = B(r.offset);
  return t.isBound && r.isBound ? n - e : t.isBound ? -1 : r.isBound ? 1 : t.isSnap && r.isSnap ? n - e : t.isSnap ? -1 : r.isSnap || e < kt ? 1 : n < kt ? -1 : e - n;
}
function Ae(t, r) {
  return t.slice().sort(function(e, n) {
    var a = e.sign[r], i = n.sign[r], o = e.offset[r], s = n.offset[r];
    if (a) {
      if (!i)
        return -1;
    } else return 1;
    return xo({ isBound: e.isBound, isSnap: e.isSnap, offset: o }, { isBound: n.isBound, isSnap: n.isSnap, offset: s });
  })[0];
}
function Af(t, r, e) {
  var n = [];
  if (e)
    B(r[0]) !== 1 || B(r[1]) !== 1 ? n.push([r, [-1, -1]], [r, [-1, 1]], [r, [1, -1]], [r, [1, 1]]) : n.push([r, [t[0], -t[1]]], [r, [-t[0], t[1]]]), n.push([r, t]);
  else if (t[0] && t[1] || !t[0] && !t[1]) {
    var a = t[0] ? t : [1, 1];
    [1, -1].forEach(function(o) {
      [1, -1].forEach(function(s) {
        var u = [o * a[0], s * a[1]];
        r[0] === u[0] && r[1] === u[1] || n.push([r, u]);
      });
    });
  } else if (t[0]) {
    var i = B(r[0]) === 1 ? [1] : [1, -1];
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
    var i = B(r[1]) === 1 ? [1] : [1, -1];
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
function So(t, r) {
  var e = xn([r[0][0], r[1][0]]), n = xn([r[0][1], r[1][1]]);
  return {
    vertical: e <= t[0],
    horizontal: n <= t[1]
  };
}
function ca(t, r) {
  var e = R(r, 2), n = e[0], a = e[1], i = a[0] - n[0], o = a[1] - n[1];
  B(i) < kt && (i = 0), B(o) < kt && (o = 0);
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
function bo(t, r, e, n) {
  return n === void 0 && (n = kt), t.every(function(a) {
    var i = ca(a, r), o = i <= 0;
    return o === e || B(i) <= n;
  });
}
function Ua(t, r, e, n, a) {
  return a === void 0 && (a = 0), n && r - a <= t || !n && t <= e + a ? {
    isBound: !0,
    offset: n ? r - t : e - t
  } : {
    isBound: !1,
    offset: 0
  };
}
function kf(t, r) {
  var e = r.line, n = r.centerSign, a = r.verticalSign, i = r.horizontalSign, o = r.lineConstants, s = t.props.innerBounds;
  if (!s)
    return {
      isAllBound: !1,
      isBound: !1,
      isVerticalBound: !1,
      isHorizontalBound: !1,
      offset: [0, 0]
    };
  var u = s.left, f = s.top, l = s.width, v = s.height, c = [[u, f], [u, f + v]], d = [[u, f], [u + l, f]], p = [[u + l, f], [u + l, f + v]], g = [[u, f + v], [u + l, f + v]];
  if (bo([
    [u, f],
    [u + l, f],
    [u, f + v],
    [u + l, f + v]
  ], e, n))
    return {
      isAllBound: !1,
      isBound: !1,
      isVerticalBound: !1,
      isHorizontalBound: !1,
      offset: [0, 0]
    };
  var h = fr(e, o, d, a), m = fr(e, o, g, a), x = fr(e, o, c, i), S = fr(e, o, p, i), b = h.isBound && m.isBound, E = h.isBound || m.isBound, D = x.isBound && S.isBound, C = x.isBound || S.isBound, y = Nr(h.offset, m.offset), _ = Nr(x.offset, S.offset), w = [0, 0], P = !1, O = !1;
  return B(_) < B(y) ? (w = [y, 0], P = E, O = b) : (w = [0, _], P = C, O = D), {
    isAllBound: O,
    isVerticalBound: E,
    isHorizontalBound: C,
    isBound: P,
    offset: w
  };
}
function fr(t, r, e, n, a, i) {
  var o = R(r, 2), s = o[0], u = o[1], f = t[0], l = e[0], v = e[1], c = We(v[1] - l[1]), d = We(v[0] - l[0]), p = u, g = s, h = -s / u;
  if (d) {
    if (!c) {
      if (i && !p)
        return {
          isBound: !1,
          offset: 0
        };
      if (g) {
        var b = (l[1] - f[1]) / h + f[0];
        return Ua(b, l[0], v[0], n, a);
      } else {
        var x = l[1] - f[1], S = B(x) <= (a || 0);
        return {
          isBound: S,
          offset: S ? x : 0
        };
      }
    }
  } else {
    if (i && !g)
      return {
        isBound: !1,
        offset: 0
      };
    if (p) {
      var m = h * (l[0] - f[0]) + f[1];
      return Ua(m, l[1], v[1], n, a);
    } else {
      var x = l[0] - f[0], S = B(x) <= (a || 0);
      return {
        isBound: S,
        offset: S ? x : 0
      };
    }
  }
  return {
    isBound: !1,
    offset: 0
  };
}
function Do(t, r, e) {
  return r.map(function(n) {
    var a = kf(t, n), i = a.isBound, o = a.offset, s = a.isVerticalBound, u = a.isHorizontalBound, f = n.multiple, l = tr({
      datas: e,
      distX: o[0],
      distY: o[1]
    }).map(function(v, c) {
      return v * (f[c] ? 2 / f[c] : 0);
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
function Ff(t, r, e) {
  var n, a = va(t, r, [0, 0], !1).map(function(c) {
    return M(M({}, c), { multiple: c.multiple.map(function(d) {
      return B(d) * 2;
    }) });
  }), i = Do(t, a, e), o = Ae(i, 0), s = Ae(i, 1), u = 0, f = 0, l = o.isVerticalBound || s.isVerticalBound, v = o.isHorizontalBound || s.isHorizontalBound;
  return (l || v) && (n = R(uf({
    datas: e,
    distX: -o.offset[0],
    distY: -s.offset[1]
  }), 2), u = n[0], f = n[1]), {
    vertical: {
      isBound: l,
      offset: u
    },
    horizontal: {
      isBound: v,
      offset: f
    }
  };
}
function Nf(t, r) {
  var e = [], n = t[0], a = t[1];
  return n && a ? e.push([[0, a * 2], t, [-n, a]], [[n * 2, 0], t, [n, -a]]) : n ? (e.push([[n * 2, 0], [n, 1], [n, -1]]), r && e.push([[0, -1], [n, -1], [-n, -1]], [[0, 1], [n, 1], [-n, 1]])) : a ? (e.push([[0, a * 2], [1, a], [-1, a]]), r && e.push([[-1, 0], [-1, a], [-1, -a]], [[1, 0], [1, a], [1, -a]])) : e.push([[-1, 0], [-1, -1], [-1, 1]], [[1, 0], [1, -1], [1, 1]], [[0, -1], [-1, -1], [1, -1]], [[0, 1], [-1, 1], [1, 1]]), e;
}
function va(t, r, e, n) {
  var a = t.state, i = a.allMatrix, o = a.is3d, s = Mr(i, 100, 100, o ? 4 : 3), u = _t(s, [0, 0]);
  return Nf(e, n).map(function(f) {
    var l = R(f, 3), v = l[0], c = l[1], d = l[2], p = [
      _t(s, c),
      _t(s, d)
    ], g = zf(p), h = So(u, p), m = h.vertical, x = h.horizontal, S = ca(u, p) <= 0;
    return {
      multiple: v,
      centerSign: S,
      verticalSign: m,
      horizontalSign: x,
      lineConstants: g,
      line: [
        _t(r, c),
        _t(r, d)
      ]
    };
  });
}
function $a(t, r, e, n) {
  var a = n ? t.map(function(i) {
    return ue(i, n);
  }) : t;
  return [
    [a[0], a[1]],
    [a[1], a[3]],
    [a[3], a[2]],
    [a[2], a[0]]
  ].some(function(i) {
    var o = ca(e, i) <= 0;
    return !bo(r, i, o);
  });
}
function Wf(t) {
  var r = R(t, 2), e = r[0], n = r[1], a = n[0] - e[0], i = n[1] - e[1];
  if (!a)
    return B(e[0]);
  if (!i)
    return B(e[1]);
  var o = i / a;
  return B((-o * e[0] + e[1]) / Math.sqrt(Math.pow(o, 2) + 1));
}
function Hf(t) {
  var r = R(t, 2), e = r[0], n = r[1], a = n[0] - e[0], i = n[1] - e[1];
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
function Lf(t, r, e, n, a) {
  var i = t.props.innerBounds, o = a * Math.PI / 180;
  if (!i)
    return [];
  var s = i.left, u = i.top, f = i.width, l = i.height, v = s - n[0], c = s + f - n[0], d = u - n[1], p = u + l - n[1], g = [
    [v, d],
    [c, d],
    [v, p],
    [c, p]
  ], h = _t(e, [0, 0]);
  if (!$a(e, g, h, 0))
    return [];
  var m = [], x = g.map(function(S) {
    return [
      Vt(S),
      St([0, 0], S)
    ];
  });
  return [
    [e[0], e[1]],
    [e[1], e[3]],
    [e[3], e[2]],
    [e[2], e[0]]
  ].forEach(function(S) {
    var b = St([0, 0], Hf(S)), E = Wf(S);
    m.push.apply(m, N([], R(x.filter(function(D) {
      var C = R(D, 1), y = C[0];
      return y && E <= y;
    }).map(function(D) {
      var C = R(D, 2), y = C[0], _ = C[1], w = Math.acos(y ? E / y : 0), P = _ + w, O = _ - w;
      return [
        o + P - b,
        o + O - b
      ];
    }).reduce(function(D, C) {
      return D.push.apply(D, N([], R(C), !1)), D;
    }, []).filter(function(D) {
      return !$a(r, g, h, D);
    }).map(function(D) {
      return tt(D * 180 / Math.PI, kt);
    })), !1));
  }), m;
}
function Yf(t) {
  var r = t.props.innerBounds, e = Pr();
  if (!r)
    return {
      boundMap: e,
      vertical: [],
      horizontal: []
    };
  var n = t.getRect(), a = n.pos1, i = n.pos2, o = n.pos3, s = n.pos4, u = [a, i, o, s], f = _t(u, [0, 0]), l = r.left, v = r.top, c = r.width, d = r.height, p = [[l, v], [l, v + d]], g = [[l, v], [l + c, v]], h = [[l + c, v], [l + c, v + d]], m = [[l, v + d], [l + c, v + d]], x = va(t, u, [0, 0], !1), S = [], b = [];
  return x.forEach(function(E) {
    var D = E.line, C = E.lineConstants, y = So(f, D), _ = y.horizontal, w = y.vertical, P = fr(D, C, g, w, 1, !0), O = fr(D, C, m, w, 1, !0), T = fr(D, C, p, _, 1, !0), I = fr(D, C, h, _, 1, !0);
    P.isBound && !e.top && (S.push(v), e.top = !0), O.isBound && !e.bottom && (S.push(v + d), e.bottom = !0), T.isBound && !e.left && (b.push(l), e.left = !0), I.isBound && !e.right && (b.push(l + c), e.right = !0);
  }), {
    boundMap: e,
    horizontal: S,
    vertical: b
  };
}
function Xf(t, r, e, n) {
  var a = r[0] - t[0], i = r[1] - t[1];
  if (B(a) < Et && (a = 0), B(i) < Et && (i = 0), !a)
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
function Pn(t, r, e, n, a) {
  var i = Xf(t, r, e, n);
  if (!i)
    return {
      isOutside: !1,
      offset: [0, 0]
    };
  var o = rr(t, r), s = rr(i, t), u = rr(i, r), f = s > o || u > o, l = R(tr({
    datas: a,
    distX: i[0],
    distY: i[1]
  }), 2), v = l[0], c = l[1];
  return {
    offset: [v, c],
    isOutside: f
  };
}
function ke(t, r) {
  return t.isBound ? t.offset : r.isSnap ? On(r).offset : 0;
}
function Vf(t, r, e, n, a) {
  var i = R(r, 2), o = i[0], s = i[1], u = R(e, 2), f = u[0], l = u[1], v = R(n, 2), c = v[0], d = v[1], p = R(a, 2), g = p[0], h = p[1], m = -g, x = -h;
  if (t && o && s) {
    m = 0, x = 0;
    var S = [];
    if (f && l ? S.push([0, h], [g, 0]) : f ? S.push([g, 0]) : l ? S.push([0, h]) : c && d ? S.push([0, h], [g, 0]) : c ? S.push([g, 0]) : d && S.push([0, h]), S.length) {
      S.sort(function(C, y) {
        return Vt(Q([o, s], C)) - Vt(Q([o, s], y));
      });
      var b = S[0];
      if (b[0] && B(o) > Et)
        m = -b[0], x = s * B(o + m) / B(o) - s;
      else if (b[1] && B(s) > Et) {
        var E = s;
        x = -b[1], m = o * B(s + x) / B(E) - o;
      }
      if (t && l && f)
        if (B(m) > Et && B(m) < B(g)) {
          var D = B(g) / B(m);
          m *= D, x *= D;
        } else if (B(x) > Et && B(x) < B(h)) {
          var D = B(h) / B(x);
          m *= D, x *= D;
        } else
          m = Nr(-g, m), x = Nr(-h, x);
    }
  } else
    m = o || f ? -g : 0, x = s || l ? -h : 0;
  return [m, x];
}
function qf(t, r, e, n, a, i) {
  if (!Vr(t, "draggable"))
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
  var o = ga(i.absolutePoses, [r, e]), s = Xt(o), u = s.left, f = s.right, l = s.top, v = s.bottom, c = {
    horizontal: o.map(function(I) {
      return I[1];
    }),
    vertical: o.map(function(I) {
      return I[0];
    })
  }, d = fa(t.props.snapDirections), p = la(d, {
    left: u,
    right: f,
    top: l,
    bottom: v,
    center: (u + f) / 2,
    middle: (l + v) / 2
  }), g = Ue(t, a, p, c), h = g.vertical, m = g.horizontal, x = Ff(t, o, i), S = x.vertical, b = x.horizontal, E = h.isSnap, D = m.isSnap, C = h.isBound || S.isBound, y = m.isBound || b.isBound, _ = Nr(h.offset, S.offset), w = Nr(m.offset, b.offset), P = R(Vf(n, [r, e], [C, y], [E, D], [_, w]), 2), O = P[0], T = P[1];
  return [
    {
      isBound: C,
      isSnap: E,
      offset: O
    },
    {
      isBound: y,
      isSnap: D,
      offset: T
    }
  ];
}
function Ue(t, r, e, n) {
  n === void 0 && (n = e);
  var a = ua(qe(t), n.vertical, n.horizontal), i = a.horizontal, o = a.vertical, s = r ? {
    horizontal: { isSnap: !1, index: -1 },
    vertical: { isSnap: !1, index: -1 }
  } : je(t, e.vertical, e.horizontal, void 0, void 0, void 0, void 0), u = s.horizontal, f = s.vertical, l = ke(i[0], u), v = ke(o[0], f), c = B(l), d = B(v);
  return {
    horizontal: {
      isBound: i[0].isBound,
      isSnap: u.isSnap,
      snapIndex: u.index,
      offset: l,
      dist: c,
      bounds: i,
      snap: u
    },
    vertical: {
      isBound: o[0].isBound,
      isSnap: f.isSnap,
      snapIndex: f.index,
      offset: v,
      dist: d,
      bounds: o,
      snap: f
    }
  };
}
function Za(t, r, e, n, a, i, o) {
  o === void 0 && (o = [1, 1]);
  var s = ua(r, e, n), u = s.horizontal, f = s.vertical, l = mo(t, e, n, [], [], a, i, o), v = l.horizontal, c = l.vertical, d = ke(u[0], v), p = ke(f[0], c), g = B(d), h = B(p);
  return {
    horizontal: {
      isBound: u[0].isBound,
      isSnap: v.isSnap,
      snapIndex: v.index,
      offset: d,
      dist: g,
      bounds: u,
      snap: v
    },
    vertical: {
      isBound: f[0].isBound,
      isSnap: c.isSnap,
      snapIndex: c.index,
      offset: p,
      dist: h,
      bounds: f,
      snap: c
    }
  };
}
function jf(t, r, e, n) {
  var a = St(t, r) / Math.PI * 180, i = e.vertical, o = i.isBound, s = i.isSnap, u = i.dist, f = e.horizontal, l = f.isBound, v = f.isSnap, c = f.dist, d = a % 180, p = d < 3 || d > 177, g = d > 87 && d < 93;
  return c < u && (o || s && !g && (!n || !p)) ? "vertical" : l || v && !p && (!n || !g) ? "horizontal" : "";
}
function Uf(t, r, e, n, a, i) {
  return e.map(function(o) {
    var s = R(o, 2), u = s[0], f = s[1], l = _t(r, u), v = _t(r, f), c = n ? $f(t, l, v, a) : Ue(t, a, {
      vertical: [v[0]],
      horizontal: [v[1]]
    }), d = c.horizontal, p = d.offset, g = d.isBound, h = d.isSnap, m = c.vertical, x = m.offset, S = m.isBound, b = m.isSnap, E = Q(f, u);
    if (!x && !p)
      return {
        isBound: S || g,
        isSnap: b || h,
        sign: E,
        offset: [0, 0]
      };
    var D = jf(l, v, c, n);
    if (!D)
      return {
        sign: E,
        isBound: !1,
        isSnap: !1,
        offset: [0, 0]
      };
    var C = D === "vertical", y = [0, 0];
    return !n && B(f[0]) === 1 && B(f[1]) === 1 && u[0] !== f[0] && u[1] !== f[1] ? y = tr({
      datas: i,
      distX: -x,
      distY: -p
    }) : y = Pn(l, v, -(C ? x : p), C, i).offset, y = y.map(function(_, w) {
      return _ * (E[w] ? 2 / E[w] : 0);
    }), {
      sign: E,
      isBound: C ? S : g,
      isSnap: C ? b : h,
      offset: y
    };
  });
}
function Ka(t, r) {
  return t.isBound ? t.offset : r.isSnap ? r.offset : 0;
}
function $f(t, r, e, n) {
  var a = Mf(t, r, e), i = a.horizontal, o = a.vertical, s = n ? {
    horizontal: { isSnap: !1 },
    vertical: { isSnap: !1 }
  } : Gf(t, r, e), u = s.horizontal, f = s.vertical, l = Ka(i, u), v = Ka(o, f), c = B(l), d = B(v);
  return {
    horizontal: {
      isBound: i.isBound,
      isSnap: u.isSnap,
      offset: l,
      dist: c
    },
    vertical: {
      isBound: o.isBound,
      isSnap: f.isSnap,
      offset: v,
      dist: d
    }
  };
}
function Zf(t, r, e, n, a) {
  var i = [-e[0], -e[1]], o = t.state, s = o.width, u = o.height, f = t.props.bounds, l = 1 / 0, v = 1 / 0;
  if (f) {
    var c = [
      [e[0], -e[1]],
      [-e[0], e[1]]
    ], d = f.left, p = d === void 0 ? -1 / 0 : d, g = f.top, h = g === void 0 ? -1 / 0 : g, m = f.right, x = m === void 0 ? 1 / 0 : m, S = f.bottom, b = S === void 0 ? 1 / 0 : S;
    c.forEach(function(E) {
      var D = E[0] !== i[0], C = E[1] !== i[1], y = _t(r, E), _ = St(n, y) * 360 / Math.PI;
      if (C) {
        var w = y.slice();
        (B(_ - 360) < 2 || B(_ - 180) < 2) && (w[1] = n[1]);
        var P = Pn(n, w, (n[1] < y[1] ? b : h) - y[1], !1, a), O = R(P.offset, 2), T = O[1], I = P.isOutside;
        isNaN(T) || (v = u + (I ? 1 : -1) * B(T));
      }
      if (D) {
        var w = y.slice();
        (B(_ - 90) < 2 || B(_ - 270) < 2) && (w[0] = n[0]);
        var z = Pn(n, w, (n[0] < y[0] ? x : p) - y[0], !0, a), k = R(z.offset, 1), F = k[0], A = z.isOutside;
        isNaN(F) || (l = s + (A ? 1 : -1) * B(F));
      }
    });
  }
  return {
    maxWidth: l,
    maxHeight: v
  };
}
var Gt = {
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
    var l = Vt(f), v = St(f, [0, 0]);
    return [r.createElement("div", { className: K("line", "horizontal", "dragline", "dashed"), key: "dragRotateGuideline", style: {
      width: "".concat(l, "px"),
      transform: "translate(".concat(u[0], "px, ").concat(u[1], "px) rotate(").concat(v, "rad) scaleY(").concat(i, ")")
    } })];
  },
  dragStart: function(t, r) {
    var e = r.datas, n = r.parentEvent, a = r.parentGesto, i = t.state, o = i.gestos, s = i.style;
    if (o.draggable)
      return !1;
    o.draggable = a || t.targetGesto, e.datas = {}, e.left = parseFloat(s.left || "") || 0, e.top = parseFloat(s.top || "") || 0, e.bottom = parseFloat(s.bottom || "") || 0, e.right = parseFloat(s.right || "") || 0, e.startValue = [0, 0], _r(t, r), Ve(t, r, "translate"), gl(t, e), e.prevDist = [0, 0], e.prevBeforeDist = [0, 0], e.isDrag = !1, e.deltaOffset = [0, 0];
    var u = nt(t, r, M({ set: function(l) {
      e.startValue = l;
    } }, Xe(t, r))), f = n || U(t, "onDragStart", u);
    return f !== !1 ? (e.isDrag = !0, t.state.dragInfo = {
      startRect: t.getRect(),
      dist: [0, 0]
    }) : (o.draggable = null, e.isPinch = !1), e.isDrag ? u : !1;
  },
  drag: function(t, r) {
    if (r) {
      Le(t, r, "translate");
      var e = r.datas, n = r.parentEvent, a = r.parentFlag, i = r.isPinch, o = r.deltaOffset, s = r.useSnap, u = r.isRequest, f = r.isGroup, l = r.parentThrottleDrag, v = r.distX, c = r.distY, d = e.isDrag, p = e.prevDist, g = e.prevBeforeDist, h = e.startValue;
      if (d) {
        o && (v += o[0], c += o[1]);
        var m = t.props, x = m.parentMoveable, S = f ? 0 : m.throttleDrag || l || 0, b = n ? 0 : m.throttleDragRotate || 0, E = 0, D = !1, C = !1, y = !1, _ = !1;
        if (!n && b > 0 && (v || c)) {
          var w = m.startDragRotate || 0, P = tt(w + St([0, 0], [v, c]) * 180 / Math.PI, b) - w, O = c * Math.abs(Math.cos((P - 90) / 180 * Math.PI)), T = v * Math.abs(Math.cos(P / 180 * Math.PI)), I = Vt([T, O]);
          E = P * Math.PI / 180, v = I * Math.cos(E), c = I * Math.sin(E);
        }
        if (!i && !n && !a) {
          var z = R(qf(t, v, c, b, !s && u || o, e), 2), k = z[0], F = z[1];
          D = k.isSnap, C = k.isBound, y = F.isSnap, _ = F.isBound;
          var A = k.offset, W = F.offset;
          v += A, c += W;
        }
        var H = ut(ro({ datas: e, distX: v, distY: c }), h), G = ut(sf({ datas: e, distX: v, distY: c }), h);
        Aa(G, kt), Aa(H, kt), b || (!D && !C && (G[0] = tt(G[0], S), H[0] = tt(H[0], S)), !y && !_ && (G[1] = tt(G[1], S), H[1] = tt(H[1], S)));
        var V = Q(H, h), q = Q(G, h), L = Q(q, p), j = Q(V, g);
        e.prevDist = q, e.prevBeforeDist = V, e.passDelta = L, e.passDist = q;
        var Y = e.left + V[0], $ = e.top + V[1], J = e.right - V[0], at = e.bottom - V[1], st = Ye(e, "translate(".concat(G[0], "px, ").concat(G[1], "px)"), "translate(".concat(q[0], "px, ").concat(q[1], "px)"));
        if (oa(r, st), t.state.dragInfo.dist = n ? [0, 0] : q, !(!n && !x && L.every(function(et) {
          return !et;
        }) && j.some(function(et) {
          return !et;
        }))) {
          var X = t.state, Z = X.width, ft = X.height, rt = nt(t, r, M({ transform: st, dist: q, delta: L, translate: G, beforeDist: V, beforeDelta: j, beforeTranslate: H, left: Y, top: $, right: J, bottom: at, width: Z, height: ft, isPinch: i }, At({
            transform: st
          }, r)));
          return !n && U(t, "onDrag", rt), rt;
        }
      }
    }
  },
  dragAfter: function(t, r) {
    var e = r.datas, n = e.deltaOffset;
    return n[0] || n[1] ? (e.deltaOffset = [0, 0], this.drag(t, M(M({}, r), { deltaOffset: n }))) : !1;
  },
  dragEnd: function(t, r) {
    var e = r.parentEvent, n = r.datas;
    if (t.state.dragInfo = null, !!n.isDrag) {
      n.isDrag = !1;
      var a = Lt(t, r, {});
      return !e && U(t, "onDragEnd", a), a;
    }
  },
  dragGroupStart: function(t, r) {
    var e, n, a = r.datas, i = r.clientX, o = r.clientY, s = this.dragStart(t, r);
    if (!s)
      return !1;
    var u = sn(t, this, "dragStart", [
      i || 0,
      o || 0
    ], r, !1, "draggable"), f = u.childEvents, l = u.eventParams, v = M(M({}, s), { targets: t.props.targets, events: l }), c = U(t, "onDragGroupStart", v);
    a.isDrag = c !== !1;
    var d = (n = (e = f[0]) === null || e === void 0 ? void 0 : e.datas.startValue) !== null && n !== void 0 ? n : [0, 0];
    return a.throttleOffset = [d[0] % 1, d[1] % 1], a.isDrag ? s : !1;
  },
  dragGroup: function(t, r) {
    var e = r.datas;
    if (e.isDrag) {
      var n = this.drag(t, M(M({}, r), { parentThrottleDrag: t.props.throttleDrag })), a = r.datas.passDelta, i = sn(t, this, "drag", a, r, !1, "draggable").eventParams;
      if (n) {
        var o = M({ targets: t.props.targets, events: i }, n);
        return U(t, "onDragGroup", o), o;
      }
    }
  },
  dragGroupEnd: function(t, r) {
    var e = r.isDrag, n = r.datas;
    if (n.isDrag) {
      this.dragEnd(t, r);
      var a = sn(t, this, "dragEnd", [0, 0], r, !1, "draggable").eventParams;
      return U(t, "onDragGroupEnd", Lt(t, r, {
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
function Eo(t, r) {
  var e = _t(t, r), n = [0, 0];
  return {
    fixedPosition: e,
    fixedDirection: r,
    fixedOffset: n
  };
}
function Kf(t, r) {
  var e = t.allMatrix, n = t.is3d, a = t.width, i = t.height, o = n ? 4 : 3, s = [
    a / 2 * (1 + r[0]),
    i / 2 * (1 + r[1])
  ], u = xt(e, s, o), f = [0, 0];
  return {
    fixedPosition: u,
    fixedDirection: r,
    fixedOffset: f
  };
}
function yo(t, r) {
  var e = t.allMatrix, n = t.is3d, a = t.width, i = t.height, o = n ? 4 : 3, s = gf(r, a, i), u = xt(e, r, o), f = [
    a ? 0 : r[0],
    i ? 0 : r[1]
  ];
  return {
    fixedPosition: u,
    fixedDirection: s,
    fixedOffset: f
  };
}
var Ja = xa("resizable"), In = {
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
  render: fo("resizable"),
  dragControlCondition: Ja,
  viewClassName: ma("resizable"),
  dragControlStart: function(t, r) {
    var e, n = r.inputEvent, a = r.isPinch, i = r.isGroup, o = r.parentDirection, s = r.parentGesto, u = r.datas, f = r.parentFixedDirection, l = r.parentEvent, v = Ao(o, a, n, u), c = t.state, d = c.target, p = c.width, g = c.height, h = c.gestos;
    if (!v || !d || h.resizable)
      return !1;
    h.resizable = s || t.controlGesto, !a && _r(t, r), u.datas = {}, u.direction = v, u.startOffsetWidth = p, u.startOffsetHeight = g, u.prevWidth = 0, u.prevHeight = 0, u.minSize = [0, 0], u.startWidth = c.inlineCSSWidth || c.cssWidth, u.startHeight = c.inlineCSSHeight || c.cssHeight, u.maxSize = [1 / 0, 1 / 0], i || (u.minSize = [
      c.minOffsetWidth,
      c.minOffsetHeight
    ], u.maxSize = [
      c.maxOffsetWidth,
      c.maxOffsetHeight
    ]);
    var m = t.props.transformOrigin || "% %";
    u.transformOrigin = m && ar(m) ? m.split(" ") : m, u.startOffsetMatrix = c.offsetMatrix, u.startTransformOrigin = c.transformOrigin, u.isWidth = (e = r?.parentIsWidth) !== null && e !== void 0 ? e : !v[0] && !v[1] || v[0] || !v[1];
    function x(_) {
      u.ratio = _ && isFinite(_) ? _ : 0;
    }
    u.startPositions = qt(t.state);
    function S(_) {
      var w = Eo(u.startPositions, _);
      u.fixedDirection = w.fixedDirection, u.fixedPosition = w.fixedPosition, u.fixedOffset = w.fixedOffset;
    }
    function b(_) {
      var w = yo(t.state, _);
      u.fixedDirection = w.fixedDirection, u.fixedPosition = w.fixedPosition, u.fixedOffset = w.fixedOffset;
    }
    function E(_) {
      u.minSize = [
        dt("".concat(_[0]), 0) || 0,
        dt("".concat(_[1]), 0) || 0
      ];
    }
    function D(_) {
      var w = [
        _[0] || 1 / 0,
        _[1] || 1 / 0
      ];
      (!ee(w[0]) || isFinite(w[0])) && (w[0] = dt("".concat(w[0]), 0) || 1 / 0), (!ee(w[1]) || isFinite(w[1])) && (w[1] = dt("".concat(w[1]), 0) || 1 / 0), u.maxSize = w;
    }
    x(p / g), S(f || [-v[0], -v[1]]), u.setFixedDirection = S, u.setFixedPosition = b, u.setMin = E, u.setMax = D;
    var C = nt(t, r, {
      direction: v,
      startRatio: u.ratio,
      set: function(_) {
        var w = R(_, 2), P = w[0], O = w[1];
        u.startWidth = P, u.startHeight = O;
      },
      setMin: E,
      setMax: D,
      setRatio: x,
      setFixedDirection: S,
      setFixedPosition: b,
      setOrigin: function(_) {
        u.transformOrigin = _;
      },
      dragStart: Gt.dragStart(t, new kr().dragStart([0, 0], r))
    }), y = l || U(t, "onResizeStart", C);
    return u.startFixedDirection = u.fixedDirection, u.startFixedPosition = u.fixedPosition, y !== !1 && (u.isResize = !0, t.state.snapRenderInfo = {
      request: r.isRequest,
      direction: v
    }), u.isResize ? C : !1;
  },
  dragControl: function(t, r) {
    var e, n = r.datas, a = r.parentFlag, i = r.isPinch, o = r.parentKeepRatio, s = r.dragClient, u = r.parentDist, f = r.useSnap, l = r.isRequest, v = r.isGroup, c = r.parentEvent, d = r.resolveMatrix, p = n.isResize, g = n.transformOrigin, h = n.startWidth, m = n.startHeight, x = n.prevWidth, S = n.prevHeight, b = n.minSize, E = n.maxSize, D = n.ratio, C = n.startOffsetWidth, y = n.startOffsetHeight, _ = n.isWidth;
    if (!p)
      return;
    if (d) {
      var w = t.state.is3d, P = n.startOffsetMatrix, O = n.startTransformOrigin, T = w ? 4 : 3, I = ae(Ge(r)), z = Math.sqrt(I.length);
      T !== z && (I = Kt(I, z, T));
      var k = de(P, I, O, T), F = Mr(k, C, y, T);
      n.startPositions = F, n.nextTargetMatrix = I, n.nextAllMatrix = k;
    }
    var A = Cr(t.props, "resizable"), W = A.resizeFormat, H = A.throttleResize, G = H === void 0 ? a ? 0 : 1 : H, V = A.parentMoveable, q = A.keepRatioFinally, L = n.direction, j = L, Y = 0, $ = 0;
    !L[0] && !L[1] && (j = [1, 1]);
    var J = D && (o ?? A.keepRatio) || !1;
    function at() {
      var bt = n.fixedDirection, yt = Lo(j, J, n, r);
      Y = yt.distWidth, $ = yt.distHeight;
      var ir = j[0] - bt[0] || J ? Math.max(C + Y, kt) : C, or = j[1] - bt[1] || J ? Math.max(y + $, kt) : y;
      return J && C && y && (_ ? or = ir / D : ir = or * D), [ir, or];
    }
    var st = R(at(), 2), X = st[0], Z = st[1];
    c || (n.setFixedDirection(n.fixedDirection), U(t, "onBeforeResize", nt(t, r, {
      startFixedDirection: n.startFixedDirection,
      startFixedPosition: n.startFixedPosition,
      setFixedDirection: function(bt) {
        var yt;
        return n.setFixedDirection(bt), yt = R(at(), 2), X = yt[0], Z = yt[1], [X, Z];
      },
      setFixedPosition: function(bt) {
        var yt;
        return n.setFixedPosition(bt), yt = R(at(), 2), X = yt[0], Z = yt[1], [X, Z];
      },
      boundingWidth: X,
      boundingHeight: Z,
      setSize: function(bt) {
        var yt;
        yt = R(bt, 2), X = yt[0], Z = yt[1];
      }
    }, !0)));
    var ft = s;
    s || (!a && i ? ft = Sf(t, [0, 0]) : ft = n.fixedPosition);
    var rt = [0, 0];
    i || (rt = dl(t, X, Z, L, ft, !f && l, n)), u && (!u[0] && (rt[0] = 0), !u[1] && (rt[1] = 0));
    function et() {
      var bt;
      W && (bt = R(W([X, Z]), 2), X = bt[0], Z = bt[1]), X = tt(X, G), Z = tt(Z, G);
    }
    if (J) {
      j[0] && j[1] && rt[0] && rt[1] && (B(rt[0]) > B(rt[1]) ? rt[1] = 0 : rt[0] = 0);
      var ot = !rt[0] && !rt[1];
      ot && et(), j[0] && !j[1] || rt[0] && !rt[1] || ot && _ ? (X += rt[0], Z = X / D) : (!j[0] && j[1] || !rt[0] && rt[1] || ot && !_) && (Z += rt[1], X = Z * D);
    } else
      X += rt[0], Z += rt[1], X = Math.max(0, X), Z = Math.max(0, Z);
    e = R(Bi([X, Z], b, E, J ? D : !1), 2), X = e[0], Z = e[1], et(), J && (v || q) && (_ ? Z = X / D : X = Z * D), Y = X - C, $ = Z - y;
    var vt = [Y - x, $ - S];
    n.prevWidth = Y, n.prevHeight = $;
    var gt = xf(t, X, Z, ft, g, n);
    if (!(!V && vt.every(function(bt) {
      return !bt;
    }) && gt.every(function(bt) {
      return !bt;
    }))) {
      var it = Gt.drag(t, ve(r, t.state, gt, !!i, !1, "draggable")), lt = it.transform, Mt = h + Y, It = m + $, Tt = nt(t, r, M({ width: Mt, height: It, offsetWidth: Math.round(X), offsetHeight: Math.round(Z), startRatio: D, boundingWidth: X, boundingHeight: Z, direction: L, dist: [Y, $], delta: vt, isPinch: !!i, drag: it }, Fo({
        style: {
          width: "".concat(Mt, "px"),
          height: "".concat(It, "px")
        },
        transform: lt
      }, it, r)));
      return !c && U(t, "onResize", Tt), Tt;
    }
  },
  dragControlAfter: function(t, r) {
    var e = r.datas, n = e.isResize, a = e.startOffsetWidth, i = e.startOffsetHeight, o = e.prevWidth, s = e.prevHeight;
    if (!(!n || t.props.checkResizableError === !1)) {
      var u = t.state, f = u.width, l = u.height, v = f - (a + o), c = l - (i + s), d = B(v) > 3, p = B(c) > 3;
      if (d && (e.startWidth += v, e.startOffsetWidth += v, e.prevWidth += v), p && (e.startHeight += c, e.startOffsetHeight += c, e.prevHeight += c), d || p)
        return this.dragControl(t, r);
    }
  },
  dragControlEnd: function(t, r) {
    var e = r.datas, n = r.parentEvent;
    if (e.isResize) {
      e.isResize = !1;
      var a = Lt(t, r, {});
      return !n && U(t, "onResizeEnd", a), a;
    }
  },
  dragGroupControlCondition: Ja,
  dragGroupControlStart: function(t, r) {
    var e = r.datas, n = this.dragControlStart(t, M(M({}, r), { isGroup: !0 }));
    if (!n)
      return !1;
    var a = $t(t, "resizable", r), i = e.startOffsetWidth, o = e.startOffsetHeight;
    function s() {
      var d = e.minSize;
      a.forEach(function(p) {
        var g = p.datas, h = g.minSize, m = g.startOffsetWidth, x = g.startOffsetHeight, S = i * (m ? h[0] / m : 0), b = o * (x ? h[1] / x : 0);
        d[0] = Math.max(d[0], S), d[1] = Math.max(d[1], b);
      });
    }
    function u() {
      var d = e.maxSize;
      a.forEach(function(p) {
        var g = p.datas, h = g.maxSize, m = g.startOffsetWidth, x = g.startOffsetHeight, S = i * (m ? h[0] / m : 0), b = o * (x ? h[1] / x : 0);
        d[0] = Math.min(d[0], S), d[1] = Math.min(d[1], b);
      });
    }
    var f = er(t, this, "dragControlStart", r, function(d, p) {
      return Be(t, d, e, p);
    });
    s(), u();
    var l = function(d) {
      n.setFixedDirection(d), f.forEach(function(p, g) {
        p.setFixedDirection(d), Be(t, p.moveable, e, a[g]);
      });
    };
    e.setFixedDirection = l;
    var v = M(M({}, n), { targets: t.props.targets, events: f.map(function(d) {
      return M(M({}, d), { setMin: function(p) {
        d.setMin(p), s();
      }, setMax: function(p) {
        d.setMax(p), u();
      } });
    }), setFixedDirection: l, setMin: function(d) {
      n.setMin(d), s();
    }, setMax: function(d) {
      n.setMax(d), u();
    } }), c = U(t, "onResizeGroupStart", v);
    return e.isResize = c !== !1, e.isResize ? n : !1;
  },
  dragGroupControl: function(t, r) {
    var e = r.datas;
    if (e.isResize) {
      var n = Cr(t.props, "resizable");
      Ze(t, "onBeforeResize", function(d) {
        U(t, "onBeforeResizeGroup", nt(t, r, M(M({}, d), { targets: n.targets }), !0));
      });
      var a = this.dragControl(t, M(M({}, r), { isGroup: !0 }));
      if (a) {
        var i = a.boundingWidth, o = a.boundingHeight, s = a.dist, u = n.keepRatio, f = [
          i / (i - s[0]),
          o / (o - s[1])
        ], l = e.fixedPosition, v = er(t, this, "dragControl", r, function(d, p) {
          var g = R(Pt(fe(t.rotation / 180 * Math.PI, 3), [
            p.datas.originalX * f[0],
            p.datas.originalY * f[1],
            1
          ], 3), 2), h = g[0], m = g[1];
          return M(M({}, p), { parentDist: null, parentScale: f, dragClient: ut(l, [h, m]), parentKeepRatio: u });
        }), c = M({ targets: n.targets, events: v }, a);
        return U(t, "onResizeGroup", c), c;
      }
    }
  },
  dragGroupControlEnd: function(t, r) {
    var e = r.isDrag, n = r.datas;
    if (n.isResize) {
      this.dragControlEnd(t, r);
      var a = er(t, this, "dragControlEnd", r), i = Lt(t, r, {
        targets: t.props.targets,
        events: a
      });
      return U(t, "onResizeGroupEnd", i), e;
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
function un(t, r, e, n, a) {
  var i = t.props.groupable, o = t.state, s = o.is3d ? 4 : 3, u = r.origin, f = xt(
    t.state.rootMatrix,
    // TO-DO #710
    Q([u[0], u[1]], i ? [0, 0] : [o.left, o.top]),
    s
  ), l = ut([a.left, a.top], f);
  r.startAbsoluteOrigin = l, r.prevDeg = St(l, [e, n]) / Math.PI * 180, r.defaultDeg = r.prevDeg, r.prevSnapDeg = 0, r.loop = 0, r.startDist = rr(l, [e, n]);
}
function Te(t, r, e) {
  var n = e.defaultDeg, a = e.prevDeg, i = a % 360, o = Math.floor(a / 360);
  i < 0 && (i += 360), i > t && i > 270 && t < 90 ? ++o : i < t && i < 90 && t > 270 && --o;
  var s = r * (o * 360 + t - n);
  return e.prevDeg = n + s, s;
}
function fn(t, r, e, n) {
  return Te(St(n.startAbsoluteOrigin, [t, r]) / Math.PI * 180, e, n);
}
function ln(t, r, e, n, a, i) {
  var o = t.props.throttleRotate, s = o === void 0 ? 0 : o, u = e.prevSnapDeg, f = 0, l = !1;
  if (i) {
    var v = vl(t, r, n, a + n);
    l = v.isSnap, f = a + v.dist;
  }
  l || (f = tt(a + n, s));
  var c = f - a;
  return e.prevSnapDeg = c, [c - u, c, f];
}
function Co(t, r, e) {
  var n = R(r, 4), a = n[0], i = n[1], o = n[2], s = n[3];
  if (t === "none")
    return [];
  if (wt(t))
    return t.map(function(h) {
      return Co(h, [a, i, o, s], e)[0];
    });
  var u = R((t || "top").split("-"), 2), f = u[0], l = u[1], v = [a, i];
  f === "left" ? v = [o, a] : f === "right" ? v = [i, s] : f === "bottom" && (v = [s, o]);
  var c = [
    (v[0][0] + v[1][0]) / 2,
    (v[0][1] + v[1][1]) / 2
  ], d = Go(v, e);
  if (l) {
    var p = l === "top" || l === "left", g = f === "bottom" || f === "left";
    c = v[p && !g || !p && g ? 0 : 1];
  }
  return [[c, d]];
}
function zn(t, r) {
  if (r.isRequest)
    return r.requestAble === "rotatable";
  var e = r.inputEvent.target;
  if (Ct(e, K("rotation-control")) || t.props.rotateAroundControls && Ct(e, K("around-control")) || Ct(e, K("control")) && Ct(e, K("rotatable")))
    return !0;
  var n = t.props.rotationTarget;
  return n ? Sa(n, !0).some(function(a) {
    return a ? e === a || e.contains(a) : !1;
  }) : !1;
}
var Jf = `.rotation {
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
`, Qf = {
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
  css: [Jf],
  viewClassName: function(t) {
    return t.isDragging("rotatable") ? K("view-rotation-dragging") : "";
  },
  render: function(t, r) {
    var e = Cr(t.props, "rotatable"), n = e.rotatable, a = e.rotationPosition, i = e.zoom, o = e.renderDirections, s = e.rotateAroundControls, u = e.resolveAblesWithRotatable, f = t.getState(), l = f.renderPoses, v = f.direction;
    if (!n)
      return null;
    var c = Co(a, l, v), d = [];
    if (c.forEach(function(m, x) {
      var S = R(m, 2), b = S[0], E = S[1];
      d.push(r.createElement(
        "div",
        { key: "rotation".concat(x), className: K("rotation"), style: {
          // tslint:disable-next-line: max-line-length
          transform: "translate(-50%) translate(".concat(b[0], "px, ").concat(b[1], "px) rotate(").concat(E, "rad)")
        } },
        r.createElement("div", { className: K("line rotation-line"), style: {
          transform: "scaleX(".concat(i, ")")
        } }),
        r.createElement("div", { className: K("control rotation-control"), style: {
          transform: "translate(0.5px) scale(".concat(i, ")")
        } })
      ));
    }), o) {
      var p = Lr(u || {}), g = {};
      p.forEach(function(m) {
        u[m].forEach(function(x) {
          g[x] = m;
        });
      });
      var h = [];
      wt(o) && (h = o.map(function(m) {
        var x = g[m];
        return {
          data: x ? { resolve: x } : {},
          classNames: x ? ["move"] : [],
          dir: m
        };
      })), d.push.apply(d, N([], R(oo(t, "rotatable", h, r)), !1));
    }
    return s && d.push.apply(d, N([], R(co(t, r)), !1)), d;
  },
  dragControlCondition: zn,
  dragControlStart: function(t, r) {
    var e, n, a = r.datas, i = r.clientX, o = r.clientY, s = r.parentRotate, u = r.parentFlag, f = r.isPinch, l = r.isRequest, v = t.state, c = v.target, d = v.left, p = v.top, g = v.direction, h = v.beforeDirection, m = v.targetTransform, x = v.moveableClientRect, S = v.offsetMatrix, b = v.targetMatrix, E = v.allMatrix, D = v.width, C = v.height;
    if (!l && !c)
      return !1;
    var y = t.getRect();
    a.rect = y, a.transform = m, a.left = d, a.top = p;
    var _ = function(j) {
      var Y = yo(t.state, j);
      a.fixedDirection = Y.fixedDirection, a.fixedOffset = Y.fixedOffset, a.fixedPosition = Y.fixedPosition, G && G.setFixedPosition(j);
    }, w = function(j) {
      var Y = Kf(t.state, j);
      a.fixedDirection = Y.fixedDirection, a.fixedOffset = Y.fixedOffset, a.fixedPosition = Y.fixedPosition, G && G.setFixedDirection(j);
    }, P = i, O = o;
    if (l || f || u) {
      var T = s || 0;
      a.beforeInfo = {
        origin: y.beforeOrigin,
        prevDeg: T,
        defaultDeg: T,
        prevSnapDeg: 0,
        startDist: 0
      }, a.afterInfo = M(M({}, a.beforeInfo), { origin: y.origin }), a.absoluteInfo = M(M({}, a.beforeInfo), { origin: y.origin, startValue: T });
    } else {
      var I = (n = r.inputEvent) === null || n === void 0 ? void 0 : n.target;
      if (I) {
        var z = I.getAttribute("data-direction") || "", k = nf[z];
        if (k) {
          a.isControl = !0, a.isAroundControl = Ct(I, K("around-control")), a.controlDirection = k;
          var F = I.getAttribute("data-resolve");
          F && (a.resolveAble = F);
          var A = Rl(v.rootMatrix, v.renderPoses, x);
          e = R(_t(A, k), 2), P = e[0], O = e[1];
        }
      }
      a.beforeInfo = { origin: y.beforeOrigin }, a.afterInfo = { origin: y.origin }, a.absoluteInfo = {
        origin: y.origin,
        startValue: y.rotation
      };
      var W = _;
      _ = function(j) {
        var Y = v.is3d ? 4 : 3, $ = R(ut(Wi(b, Y), j), 2), J = $[0], at = $[1], st = Pt(S, Dr([J, at], Y)), X = Pt(E, Dr([j[0], j[1]], Y));
        W(j);
        var Z = v.posDelta;
        a.beforeInfo.origin = Q(st, Z), a.afterInfo.origin = Q(X, Z), a.absoluteInfo.origin = Q(X, Z), un(t, a.beforeInfo, P, O, x), un(t, a.afterInfo, P, O, x), un(t, a.absoluteInfo, P, O, x);
      }, w = function(j) {
        var Y = _t([
          [0, 0],
          [D, 0],
          [0, C],
          [D, C]
        ], j);
        _(Y);
      };
    }
    a.startClientX = P, a.startClientY = O, a.direction = g, a.beforeDirection = h, a.startValue = 0, a.datas = {}, Ve(t, r, "rotate");
    var H = !1, G = !1;
    if (a.isControl && a.resolveAble) {
      var V = a.resolveAble;
      V === "resizable" && (G = In.dragControlStart(t, M(M({}, new kr("resizable").dragStart([0, 0], r)), { parentPosition: a.controlPosition, parentFixedPosition: a.fixedPosition })));
    }
    G || (H = Gt.dragStart(t, new kr().dragStart([0, 0], r))), _(Tl(t));
    var q = nt(t, r, M(M({ set: function(j) {
      a.startValue = j * Math.PI / 180;
    }, setFixedDirection: w, setFixedPosition: _ }, Xe(t, r)), { dragStart: H, resizeStart: G })), L = U(t, "onRotateStart", q);
    return a.isRotate = L !== !1, v.snapRenderInfo = {
      request: r.isRequest
    }, a.isRotate ? q : !1;
  },
  dragControl: function(t, r) {
    var e, n, a, i = r.datas, o = r.clientDistX, s = r.clientDistY, u = r.parentRotate, f = r.parentFlag, l = r.isPinch, v = r.groupDelta, c = r.resolveMatrix, d = i.beforeDirection, p = i.beforeInfo, g = i.afterInfo, h = i.absoluteInfo, m = i.isRotate, x = i.startValue, S = i.rect, b = i.startClientX, E = i.startClientY;
    if (m) {
      Le(t, r, "rotate");
      var D = of(r), C = d * D, y = t.props.parentMoveable, _ = 0, w, P, O = 0, T, I, z = 0, k, F, A = 180 / Math.PI * x, W = h.startValue, H = !1, G = b + o, V = E + s;
      if (!f && "parentDist" in r) {
        var q = r.parentDist;
        w = q, T = q, k = q;
      } else l || f ? (w = Te(u, d, p), T = Te(u, C, g), k = Te(u, C, h)) : (w = fn(G, V, d, p), T = fn(G, V, C, g), k = fn(G, V, C, h), H = !0);
      if (P = A + w, I = A + T, F = W + k, U(t, "onBeforeRotate", nt(t, r, {
        beforeRotation: P,
        rotation: I,
        absoluteRotation: F,
        setRotation: function(ft) {
          T = ft - A, w = T, k = T;
        }
      }, !0)), e = R(ln(t, S, p, w, A, H), 3), _ = e[0], w = e[1], P = e[2], n = R(ln(t, S, g, T, A, H), 3), O = n[0], T = n[1], I = n[2], a = R(ln(t, S, h, k, W, H), 3), z = a[0], k = a[1], F = a[2], !(!z && !O && !_ && !y && !c)) {
        var L = Ye(i, "rotate(".concat(I, "deg)"), "rotate(".concat(T, "deg)"));
        c && (i.fixedPosition = sa(t, i.targetAllTransform, i.fixedDirection, i.fixedOffset, i));
        var j = mf(t, T, i), Y = Q(ut(v || [0, 0], j), i.prevInverseDist || [0, 0]);
        i.prevInverseDist = j, i.requestValue = null;
        var $ = no(t, L, Y, l, r), J = $, at = rr([G, V], h.startAbsoluteOrigin) - h.startDist, st = void 0;
        if (i.resolveAble === "resizable") {
          var X = In.dragControl(t, M(M({}, ve(r, t.state, [r.deltaX, r.deltaY], !!l, !1, "resizable")), { resolveMatrix: !0, parentDistance: at }));
          X && (st = X, J = Fo(J, X, r));
        }
        var Z = nt(t, r, M(M({ delta: O, dist: T, rotate: I, rotation: I, beforeDist: w, beforeDelta: _, beforeRotate: P, beforeRotation: P, absoluteDist: k, absoluteDelta: z, absoluteRotate: F, absoluteRotation: F, isPinch: !!l, resize: st }, $), J));
        return U(t, "onRotate", Z), Z;
      }
    }
  },
  dragControlEnd: function(t, r) {
    var e = r.datas;
    if (e.isRotate) {
      e.isRotate = !1;
      var n = Lt(t, r, {});
      return U(t, "onRotateEnd", n), n;
    }
  },
  dragGroupControlCondition: zn,
  dragGroupControlStart: function(t, r) {
    var e = r.datas, n = t.state, a = n.left, i = n.top, o = n.beforeOrigin, s = this.dragControlStart(t, r);
    if (!s)
      return !1;
    s.set(e.beforeDirection * t.rotation);
    var u = er(t, this, "dragControlStart", r, function(v, c) {
      var d = v.state, p = d.left, g = d.top, h = d.beforeOrigin, m = ut(Q([p, g], [a, i]), Q(h, o));
      return c.datas.startGroupClient = m, c.datas.groupClient = m, M(M({}, c), { parentRotate: 0 });
    }), f = M(M({}, s), { targets: t.props.targets, events: u }), l = U(t, "onRotateGroupStart", f);
    return e.isRotate = l !== !1, e.isRotate ? s : !1;
  },
  dragGroupControl: function(t, r) {
    var e = r.datas;
    if (e.isRotate) {
      Ze(t, "onBeforeRotate", function(f) {
        U(t, "onBeforeRotateGroup", nt(t, r, M(M({}, f), { targets: t.props.targets }), !0));
      });
      var n = this.dragControl(t, r);
      if (n) {
        var a = e.beforeDirection, i = n.beforeDist, o = i / 180 * Math.PI, s = er(t, this, "dragControl", r, function(f, l) {
          var v = l.datas.startGroupClient, c = R(l.datas.groupClient, 2), d = c[0], p = c[1], g = R(ue(v, o * a), 2), h = g[0], m = g[1], x = [h - d, m - p];
          return l.datas.groupClient = [h, m], M(M({}, l), { parentRotate: i, groupDelta: x });
        });
        t.rotation = a * n.beforeRotation;
        var u = M({ targets: t.props.targets, events: s, set: function(f) {
          t.rotation = f;
        }, setGroupRotation: function(f) {
          t.rotation = f;
        } }, n);
        return U(t, "onRotateGroup", u), u;
      }
    }
  },
  dragGroupControlEnd: function(t, r) {
    var e = r.isDrag, n = r.datas;
    if (n.isRotate) {
      this.dragControlEnd(t, r);
      var a = er(t, this, "dragControlEnd", r), i = Lt(t, r, {
        targets: t.props.targets,
        events: a
      });
      return U(t, "onRotateGroupEnd", i), e;
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
function tl(t, r) {
  var e, n = t.direction, a = t.classNames, i = t.size, o = t.pos, s = t.zoom, u = t.key, f = n === "horizontal", l = f ? "Y" : "X";
  return r.createElement("div", {
    key: u,
    className: a.join(" "),
    style: (e = {}, e[f ? "width" : "height"] = "".concat(i), e.transform = "translate(".concat(o[0], ", ").concat(o[1], ") translate").concat(l, "(-50%) scale").concat(l, "(").concat(s, ")"), e)
  });
}
function da(t, r) {
  return tl(M(M({}, t), { classNames: N([
    K("line", "guideline", t.direction)
  ], R(t.classNames), !1).filter(function(e) {
    return e;
  }), size: t.size || "".concat(t.sizeValue, "px"), pos: t.pos || t.posValue.map(function(e) {
    return "".concat(tt(e, 0.1), "px");
  }) }), r);
}
function Qa(t, r, e, n, a, i, o, s) {
  var u = t.props.zoom;
  return e.map(function(f, l) {
    var v = f.type, c = f.pos, d = [0, 0];
    return d[o] = n, d[o ? 0 : 1] = -a + c, da({
      key: "".concat(r, "TargetGuideline").concat(l),
      classNames: [K("target", "bold", v)],
      posValue: d,
      sizeValue: i,
      zoom: u,
      direction: r
    }, s);
  });
}
function ti(t, r, e, n, a, i) {
  var o = t.props, s = o.zoom, u = o.isDisplayInnerSnapDigit, f = r === "horizontal" ? vr : dr, l = a[f.start], v = a[f.end];
  return e.filter(function(c) {
    var d = c.hide, p = c.elementRect;
    if (d)
      return !1;
    if (u && p) {
      var g = p.rect;
      if (g[f.start] <= l && v <= g[f.end])
        return !1;
    }
    return !0;
  }).map(function(c, d) {
    var p = c.pos, g = c.size, h = c.element, m = c.className, x = [
      -n[0] + p[0],
      -n[1] + p[1]
    ];
    return da({
      key: "".concat(r, "-default-guideline-").concat(d),
      classNames: h ? [K("bold"), m] : [K("normal"), m],
      direction: r,
      posValue: x,
      sizeValue: g,
      zoom: s
    }, i);
  });
}
function jr(t, r, e, n, a, i, o, s) {
  var u, f = t.props, l = f.snapDigit, v = l === void 0 ? 0 : l, c = f.isDisplaySnapDigit, d = c === void 0 ? !0 : c, p = f.snapDistFormat, g = p === void 0 ? function(E, D) {
    return E;
  } : p, h = f.zoom, m = r === "horizontal" ? "X" : "Y", x = r === "vertical" ? "height" : "width", S = Math.abs(a), b = d ? parseFloat(S.toFixed(v)) : 0;
  return s.createElement(
    "div",
    { key: "".concat(r, "-").concat(e, "-guideline-").concat(n), className: K("guideline-group", r), style: (u = {
      left: "".concat(i[0], "px"),
      top: "".concat(i[1], "px")
    }, u[x] = "".concat(S, "px"), u) },
    da({
      direction: r,
      classNames: [K(e), o],
      size: "100%",
      posValue: [0, 0],
      sizeValue: S,
      zoom: h
    }, s),
    s.createElement("div", { className: K("size-value", "gap"), style: {
      transform: "translate".concat(m, "(-50%) scale(").concat(h, ")")
    } }, b > 0 ? g(b, r) : "")
  );
}
function rl(t, r, e, n) {
  var a = t === "vertical" ? 0 : 1, i = t === "vertical" ? 1 : 0, o = a ? vr : dr, s = e[o.start], u = e[o.end];
  return No(r, function(f) {
    return f.pos[a];
  }).map(function(f) {
    var l = [], v = [], c = [];
    return f.forEach(function(d) {
      var p, g, h = d.element, m = d.elementRect.rect;
      if (m[o.end] < s)
        l.push(d);
      else if (u < m[o.start])
        v.push(d);
      else if (m[o.start] <= s && u <= m[o.end] && n) {
        var x = d.pos, S = { element: h, rect: M(M({}, m), (p = {}, p[o.end] = m[o.start], p)) }, b = { element: h, rect: M(M({}, m), (g = {}, g[o.start] = m[o.end], g)) }, E = [0, 0], D = [0, 0];
        E[a] = x[a], E[i] = x[i], D[a] = x[a], D[i] = x[i] + d.size, l.push({
          type: t,
          pos: E,
          size: 0,
          elementRect: S,
          direction: "",
          elementDirection: "end"
        }), v.push({
          type: t,
          pos: D,
          size: 0,
          elementRect: b,
          direction: "",
          elementDirection: "start"
        });
      }
    }), l.sort(function(d, p) {
      return p.pos[i] - d.pos[i];
    }), v.sort(function(d, p) {
      return d.pos[i] - p.pos[i];
    }), {
      total: f,
      start: l,
      end: v,
      inner: c
    };
  });
}
function el(t, r, e, n, a) {
  var i = t.props.isDisplayInnerSnapDigit, o = [];
  return ["vertical", "horizontal"].forEach(function(s) {
    var u = r.filter(function(h) {
      return h.type === s;
    }), f = s === "vertical" ? 1 : 0, l = f ? 0 : 1, v = rl(s, u, n, i), c = f ? dr : vr, d = f ? vr : dr, p = n[c.start], g = n[c.end];
    v.forEach(function(h) {
      var m = h.total, x = h.start, S = h.end, b = h.inner, E = e[l] + m[0].pos[l] - n[d.start], D = n;
      x.forEach(function(C) {
        var y = C.elementRect.rect, _ = D[c.start] - y[c.end];
        if (_ > 0) {
          var w = [0, 0];
          w[f] = e[f] + D[c.start] - p - _, w[l] = E, o.push(jr(t, s, "dashed", o.length, _, w, C.className, a));
        }
        D = y;
      }), D = n, S.forEach(function(C) {
        var y = C.elementRect.rect, _ = y[c.start] - D[c.end];
        if (_ > 0) {
          var w = [0, 0];
          w[f] = e[f] + D[c.end] - p, w[l] = E, o.push(jr(t, s, "dashed", o.length, _, w, C.className, a));
        }
        D = y;
      }), b.forEach(function(C) {
        var y = C.elementRect.rect, _ = p - y[c.start], w = y[c.end] - g, P = [0, 0], O = [0, 0];
        P[f] = e[f] - _, P[l] = E, O[f] = e[f] + g - p, O[l] = E, o.push(jr(t, s, "dashed", o.length, _, P, C.className, a)), o.push(jr(t, s, "dashed", o.length, w, O, C.className, a));
      });
    });
  }), o;
}
function nl(t, r, e, n, a) {
  var i = [];
  return ["horizontal", "vertical"].forEach(function(o) {
    var s = r.filter(function(h) {
      return h.type === o;
    }).slice(0, 1), u = o === "vertical" ? 0 : 1, f = u ? 0 : 1, l = u ? dr : vr, v = u ? vr : dr, c = n[l.start], d = n[l.end], p = n[v.start], g = n[v.end];
    s.forEach(function(h) {
      var m = h.gap, x = h.gapRects, S = Math.max.apply(Math, N([p], R(x.map(function(D) {
        var C = D.rect;
        return C[v.start];
      })), !1)), b = Math.min.apply(Math, N([g], R(x.map(function(D) {
        var C = D.rect;
        return C[v.end];
      })), !1)), E = (S + b) / 2;
      S === b || E === (p + g) / 2 || x.forEach(function(D) {
        var C = D.rect, y = D.className, _ = [e[0], e[1]];
        if (C[l.end] < c)
          _[u] += C[l.end] - c;
        else if (d < C[l.start])
          _[u] += C[l.start] - c - m;
        else
          return;
        _[f] += E - p, i.push(jr(t, u ? "vertical" : "horizontal", "gap", i.length, m, _, y, a));
      });
    });
  }), i;
}
function Gn(t) {
  var r, e, n = t.state, a = n.containerClientRect, i = n.hasFixed, o = a.overflow, s = a.scrollHeight, u = a.scrollWidth, f = a.clientHeight, l = a.clientWidth, v = a.clientLeft, c = a.clientTop, d = t.props, p = d.snapGap, g = p === void 0 ? !0 : p, h = d.verticalGuidelines, m = d.horizontalGuidelines, x = d.snapThreshold, S = x === void 0 ? 5 : x, b = d.maxSnapElementGuidelineDistance, E = b === void 0 ? 1 / 0 : b, D = d.isDisplayGridGuidelines, C = Xt(qt(t.state)), y = C.top, _ = C.left, w = C.bottom, P = C.right, O = { top: y, left: _, bottom: w, right: P, center: (_ + P) / 2, middle: (y + w) / 2 }, T = sl(t), I = N([], R(T), !1), z = ((e = (r = n.snapThresholdInfo) === null || r === void 0 ? void 0 : r.multiples) !== null && e !== void 0 ? e : [1, 1]).map(function(W) {
    return W * S;
  });
  g && I.push.apply(I, N([], R(al(t, O, z)), !1));
  var k = M({}, n.snapOffset || {
    left: 0,
    top: 0,
    bottom: 0,
    right: 0
  });
  if (I.push.apply(I, N([], R(ol(t, o ? u : l, o ? s : f, v, c, k, D)), !1)), i) {
    var F = a.left, A = a.top;
    k.left += F, k.top += A, k.right += F, k.bottom += A;
  }
  return I.push.apply(I, N([], R(Mo(m || !1, h || !1, o ? u : l, o ? s : f, v, c, k)), !1)), I = I.filter(function(W) {
    var H = W.element, G = W.elementRect, V = W.type;
    if (!H || !G)
      return !0;
    var q = G.rect;
    return _o(O, q, V, E);
  }), I;
}
function al(t, r, e) {
  var n = t.props, a = n.maxSnapElementGuidelineDistance, i = a === void 0 ? 1 / 0 : a, o = n.maxSnapElementGapDistance, s = o === void 0 ? 1 / 0 : o, u = t.state.elementRects, f = [];
  return [
    ["vertical", vr, dr],
    ["horizontal", dr, vr]
  ].forEach(function(l) {
    var v = R(l, 3), c = v[0], d = v[1], p = v[2], g = r[d.start], h = r[d.end], m = r[d.center], x = r[p.start], S = r[p.end], b = {
      left: e[0],
      top: e[1]
    };
    function E(y) {
      var _ = y.rect, w = b[d.start];
      return _[d.end] < g + w ? g - _[d.end] : h - w < _[d.start] ? _[d.start] - h : -1;
    }
    var D = u.filter(function(y) {
      var _ = y.rect;
      return _[p.start] > S || _[p.end] < x ? !1 : E(y) > 0;
    }).sort(function(y, _) {
      return E(y) - E(_);
    }), C = [];
    D.forEach(function(y) {
      D.forEach(function(_) {
        if (y !== _) {
          var w = y.rect, P = _.rect, O = w[p.start], T = w[p.end], I = P[p.start], z = P[p.end];
          O > z || I > T || C.push([y, _]);
        }
      });
    }), C.forEach(function(y) {
      var _ = R(y, 2), w = _[0], P = _[1], O = w.rect, T = P.rect, I = O[d.start], z = O[d.end], k = T[d.start], F = T[d.end], A = b[d.start], W = 0, H = 0, G = !1, V = !1, q = !1;
      if (z <= g && h <= k) {
        if (V = !0, W = (k - z - (h - g)) / 2, H = z + W + (h - g) / 2, B(H - m) > A)
          return;
      } else if (z < k && F < g + A) {
        if (G = !0, W = k - z, H = F + W, B(H - g) > A)
          return;
      } else if (z < k && h - A < I) {
        if (q = !0, W = k - z, H = I - W, B(H - h) > A)
          return;
      } else
        return;
      W && _o(r, T, c, i) && (W > s || f.push({
        type: c,
        pos: c === "vertical" ? [H, 0] : [0, H],
        element: P.element,
        size: 0,
        className: P.className,
        isStart: G,
        isCenter: V,
        isEnd: q,
        gap: W,
        hide: !0,
        gapRects: [w, P],
        direction: "",
        elementDirection: ""
      }));
    });
  }), f;
}
function il(t, r, e, n) {
  var a, i, o = t.props, s = t.state, u = o.snapGridAll, f = o.snapGridWidth, l = f === void 0 ? 0 : f, v = o.snapGridHeight, c = v === void 0 ? 0 : v, d = s.snapRenderInfo, p = d && (((a = d.direction) === null || a === void 0 ? void 0 : a[0]) || ((i = d.direction) === null || i === void 0 ? void 0 : i[1])), g = t.moveables;
  if (u && g && p && (l || c)) {
    if (s.snapThresholdInfo)
      return;
    s.snapThresholdInfo = {
      multiples: [1, 1],
      offset: [0, 0]
    };
    var h = t.getRect(), m = h.children, x = d.direction;
    if (m) {
      var S = x.map(function(E, D) {
        var C = D === 0 ? {
          snapSize: l,
          posName: "left",
          sizeName: "width",
          clientOffset: n.left - r
        } : {
          snapSize: c,
          posName: "top",
          sizeName: "height",
          clientOffset: n.top - e
        }, y = C.snapSize, _ = C.posName, w = C.sizeName, P = C.clientOffset;
        if (!y)
          return {
            dir: E,
            multiple: 1,
            snapSize: y,
            snapOffset: 0
          };
        var O = h[w], T = h[_], I = Ks(m.map(function(G) {
          return [
            G[_] - T,
            G[w],
            O - G[w] - G[_] + T
          ];
        })).filter(function(G) {
          return G;
        }).sort(function(G, V) {
          return G - V;
        }), z = I[0], k = I.map(function(G) {
          return tt(G / z, 0.1) * y;
        }), F = 1, A = tt(O / z, 0.1);
        for (F = 1; F <= 10 && !k.every(function(G) {
          return G * F % 1 === 0;
        }); ++F)
          ;
        var W = (-E + 1) / 2, H = Pe(T - P, T - P + O, W, 1 - W);
        return {
          multiple: A * F,
          dir: E,
          snapSize: y,
          snapOffset: Math.round(H / y)
        };
      }), b = S.map(function(E) {
        return E.multiple || 1;
      });
      s.snapThresholdInfo.multiples = b, s.snapThresholdInfo.offset = S.map(function(E) {
        return E.snapOffset;
      }), S.forEach(function(E, D) {
        E.snapSize;
      });
    }
  } else
    s.snapThresholdInfo = null;
}
function ol(t, r, e, n, a, i, o) {
  n === void 0 && (n = 0), a === void 0 && (a = 0);
  var s = t.props, u = t.state, f = s.snapGridWidth, l = f === void 0 ? 0 : f, v = s.snapGridHeight, c = v === void 0 ? 0 : v, d = [], p = i.left, g = i.top, h = [0, 0];
  il(t, n, a, i);
  var m = u.snapThresholdInfo, x = l, S = c;
  if (m && (l *= m.multiples[0] || 1, c *= m.multiples[1] || 1, h = m.offset), c) {
    for (var b = function(D) {
      d.push({
        type: "horizontal",
        pos: [
          p,
          tt(h[1] * S + D - a + g, 0.1)
        ],
        className: K("grid-guideline"),
        size: r,
        hide: !o,
        direction: "",
        grid: !0
      });
    }, E = 0; E <= e * 2; E += c)
      b(E);
    for (var E = -c; E >= -e; E -= c)
      b(E);
  }
  if (l) {
    for (var b = function(C) {
      d.push({
        type: "vertical",
        pos: [
          tt(h[0] * x + C - n + p, 0.1),
          g
        ],
        className: K("grid-guideline"),
        size: e,
        hide: !o,
        direction: "",
        grid: !0
      });
    }, E = 0; E <= r * 2; E += l)
      b(E);
    for (var E = -l; E >= -r; E -= l)
      b(E);
  }
  return d;
}
function _o(t, r, e, n) {
  return e === "horizontal" ? B(t.right - r.left) <= n || B(t.left - r.right) <= n || t.left <= r.right && r.left <= t.right : e === "vertical" ? B(t.bottom - r.top) <= n || B(t.top - r.bottom) <= n || t.top <= r.bottom && r.top <= t.bottom : !0;
}
function sl(t) {
  var r = t.state, e = t.props.elementGuidelines, n = e === void 0 ? [] : e;
  if (!n.length)
    return r.elementRects = [], [];
  var a = (r.elementRects || []).filter(function(c) {
    return !c.refresh;
  }), i = n.map(function(c) {
    return Zt(c) && "element" in c ? M(M({}, c), { element: Jt(c.element, !0) }) : {
      element: Jt(c, !0)
    };
  }).filter(function(c) {
    return c.element;
  }), o = mu(a.map(function(c) {
    return c.element;
  }), i.map(function(c) {
    return c.element;
  })), s = o.maintained, u = o.added, f = [];
  s.forEach(function(c) {
    var d = R(c, 2), p = d[0], g = d[1];
    f[g] = a[p];
  }), ul(t, u.map(function(c) {
    return i[c];
  })).map(function(c, d) {
    f[u[d]] = c;
  }), r.elementRects = f;
  var l = fa(t.props.elementSnapDirections), v = [];
  return f.forEach(function(c) {
    var d = c.element, p = c.top, g = p === void 0 ? l.top : p, h = c.left, m = h === void 0 ? l.left : h, x = c.right, S = x === void 0 ? l.right : x, b = c.bottom, E = b === void 0 ? l.bottom : b, D = c.center, C = D === void 0 ? l.center : D, y = c.middle, _ = y === void 0 ? l.middle : y, w = c.className, P = c.rect, O = la({
      top: g,
      right: S,
      left: m,
      bottom: E,
      center: C,
      middle: _
    }, P), T = O.horizontal, I = O.vertical, z = O.horizontalNames, k = O.verticalNames, F = P.top, A = P.left, W = P.right - A, H = P.bottom - F, G = [W, H];
    I.forEach(function(V, q) {
      v.push({
        type: "vertical",
        element: d,
        pos: [
          tt(V, 0.1),
          F
        ],
        size: H,
        sizes: G,
        className: w,
        elementRect: c,
        elementDirection: Va[k[q]] || k[q],
        direction: ""
      });
    }), T.forEach(function(V, q) {
      v.push({
        type: "horizontal",
        element: d,
        pos: [
          A,
          tt(V, 0.1)
        ],
        size: W,
        sizes: G,
        className: w,
        elementRect: c,
        elementDirection: Va[z[q]] || z[q],
        direction: ""
      });
    });
  }), v;
}
function ri(t, r) {
  return t ? t.map(function(e) {
    var n = Zt(e) ? e : { pos: e }, a = n.pos;
    return ee(a) ? n : M(M({}, n), { pos: dt(a, r) });
  }) : [];
}
function Mo(t, r, e, n, a, i, o) {
  a === void 0 && (a = 0), i === void 0 && (i = 0), o === void 0 && (o = { left: 0, top: 0, right: 0, bottom: 0 });
  var s = [], u = o.left, f = o.top, l = o.bottom, v = o.right, c = e + v - u, d = n + l - f;
  return ri(t, d).forEach(function(p) {
    s.push({
      type: "horizontal",
      pos: [
        u,
        tt(p.pos - i + f, 0.1)
      ],
      size: c,
      className: p.className,
      direction: ""
    });
  }), ri(r, c).forEach(function(p) {
    s.push({
      type: "vertical",
      pos: [
        tt(p.pos - a + u, 0.1),
        f
      ],
      size: d,
      className: p.className,
      direction: ""
    });
  }), s;
}
function ul(t, r) {
  if (!r.length)
    return [];
  var e = t.props.groupable, n = t.state, a = n.containerClientRect, i = n.rootMatrix, o = n.is3d, s = n.offsetDelta, u = o ? 4 : 3, f = R(If(i, a, u), 2), l = f[0], v = f[1], c = e ? 0 : s[0], d = e ? 0 : s[1];
  return r.map(function(p) {
    var g = p.element.getBoundingClientRect(), h = g.left - l - c, m = g.top - v - d, x = m + g.height, S = h + g.width, b = R(Wr(i, [h, m], u), 2), E = b[0], D = b[1], C = R(Wr(i, [S, x], u), 2), y = C[0], _ = C[1];
    return M(M({}, p), { rect: {
      left: E,
      right: y,
      top: D,
      bottom: _,
      center: (E + y) / 2,
      middle: (D + _) / 2
    } });
  });
}
function ye(t) {
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
    var o = Jt(n, !0);
    if (o) {
      var s = Qr(o), u = si(r, [
        s.left - a.left,
        s.top - a.top
      ]), f = si(r, [
        s.right - a.right,
        s.bottom - a.bottom
      ]);
      i.left = tt(u[0], 1e-5), i.top = tt(u[1], 1e-5), i.right = tt(f[0], 1e-5), i.bottom = tt(f[1], 1e-5);
    }
  }
  return r.snapContainer = n, r.snapOffset = i, r.guidelines = Gn(t), r.enableSnap = !0, !0;
}
function wo(t, r, e, n, a, i) {
  var o = Mr(t, r, e, i ? 4 : 3), s = _t(o, n);
  return ga(o, Q(a, s));
}
function ei(t) {
  return t ? t / B(t) : 0;
}
function fl(t, r, e, n, a, i) {
  var o = i.fixedDirection, s = Af(e, o, n), u = va(t, r, e, n), f = N(N([], R(Uf(t, r, s, n, a, i)), !1), R(Do(t, u, i)), !1), l = Ae(f, 0), v = Ae(f, 1);
  return {
    width: {
      isBound: l.isBound,
      offset: l.offset[0]
    },
    height: {
      isBound: v.isBound,
      offset: v.offset[1]
    }
  };
}
function ll(t, r, e, n, a, i, o, s, u) {
  var f = _t(r, o), l = Ue(t, s, {
    vertical: [f[0]],
    horizontal: [f[1]]
  }), v = l.horizontal.offset, c = l.vertical.offset;
  if (tt(c, wn) || tt(v, wn)) {
    var d = R(tr({
      datas: u,
      distX: -c,
      distY: -v
    }), 2), p = d[0], g = d[1], h = Math.min(a || 1 / 0, e + o[0] * p), m = Math.min(i || 1 / 0, n + o[1] * g);
    return [h - e, m - n];
  }
  return [0, 0];
}
function Ro(t, r, e, n, a, i, o, s) {
  for (var u = qt(t.state), f = t.props.keepRatio, l = 0, v = 0, c = 0; c < 2; ++c) {
    var d = r(l, v), p = fl(t, d, a, f, o, s), g = p.width, h = p.height, m = g.isBound, x = h.isBound, S = g.offset, b = h.offset;
    if (c === 1 && (m || (S = 0), x || (b = 0)), c === 0 && o && !m && !x)
      return [0, 0];
    if (f) {
      var E = B(S) * (e ? 1 / e : 1), D = B(b) * (n ? 1 / n : 1), C = m && x ? E < D : x || !m && E < D;
      C ? S = e * b / n : b = n * S / e;
    }
    l += S, v += b;
  }
  if (!f && a[0] && a[1]) {
    var y = Zf(t, u, a, i, s), _ = y.maxWidth, w = y.maxHeight, P = R(ll(t, r(l, v).map(function(I) {
      return I.map(function(z) {
        return tt(z, wn);
      });
    }), e + l, n + v, _, w, a, o, s), 2), S = P[0], b = P[1];
    l += S, v += b;
  }
  return [l, v];
}
function Kr(t) {
  return t < 0 && (t = t % 360 + 360), t %= 360, t;
}
function cl(t, r) {
  r = Kr(r);
  var e = Math.floor(t / 360), n = e * 360 + 360 - r, a = e * 360 + r;
  return B(t - n) < B(t - a) ? n : a;
}
function cn(t, r) {
  t = Kr(t), r = Kr(r);
  var e = Kr(t - r);
  return Math.min(e, 360 - e);
}
function vl(t, r, e, n) {
  var a, i = t.props, o = (a = i[vo]) !== null && a !== void 0 ? a : 5, s = i[po];
  if (Vr(t, "rotatable")) {
    var u = r.pos1, f = r.pos2, l = r.pos3, v = r.pos4, c = r.origin, d = e * Math.PI / 180, p = [u, f, l, v].map(function(b) {
      return Q(b, c);
    }), g = p.map(function(b) {
      return ue(b, d);
    }), h = N(N([], R(Rf(t, p, g, c, e)), !1), R(Lf(t, p, g, c, e)), !1);
    h.sort(function(b, E) {
      return B(b - e) - B(E - e);
    });
    var m = h.length > 0;
    if (m)
      return {
        isSnap: m,
        dist: m ? h[0] : e
      };
  }
  if (s?.length && o) {
    var x = s.slice().sort(function(b, E) {
      return cn(b, n) - cn(E, n);
    }), S = x[0];
    if (cn(S, n) <= o)
      return {
        isSnap: !0,
        dist: e + cl(n, S) - n
      };
  }
  return {
    isSnap: !1,
    dist: e
  };
}
function dl(t, r, e, n, a, i, o) {
  if (!Vr(t, "resizable"))
    return [0, 0];
  var s = o.fixedDirection, u = o.nextAllMatrix, f = t.state, l = f.allMatrix, v = f.is3d;
  return Ro(t, function(c, d) {
    return wo(u || l, r + c, e + d, s, a, v);
  }, r, e, n, a, i, o);
}
function pl(t, r, e, n, a) {
  if (!Vr(t, "scalable"))
    return [0, 0];
  var i = a.startOffsetWidth, o = a.startOffsetHeight, s = a.fixedPosition, u = a.fixedDirection, f = a.is3d, l = Ro(t, function(v, c) {
    return wo(df(a, ut(r, [v / i, c / o])), i, o, u, s, f);
  }, i, o, e, s, n, a);
  return [l[0] / i, l[1] / o];
}
function gl(t, r) {
  r.absolutePoses = qt(t.state);
}
function ni(t) {
  var r = [];
  return t.forEach(function(e) {
    e.guidelineInfos.forEach(function(n) {
      var a = n.guideline;
      Ht(r, function(i) {
        return i.guideline === a;
      }) || (a.direction = "", r.push({ guideline: a, posInfo: e }));
    });
  }), r.map(function(e) {
    var n = e.guideline, a = e.posInfo;
    return M(M({}, n), { direction: a.direction });
  });
}
function ai(t, r, e, n, a, i) {
  var o = ua(qe(t, i), r, e), s = o.vertical, u = o.horizontal, f = Pr();
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
  var l = Yf(t), v = l.boundMap, c = l.vertical, d = l.horizontal;
  return c.forEach(function(p) {
    nr(n, function(g) {
      var h = g.type, m = g.pos;
      return h === "bounds" && m === p;
    }) >= 0 || n.push({
      type: "bounds",
      pos: p
    });
  }), d.forEach(function(p) {
    nr(a, function(g) {
      var h = g.type, m = g.pos;
      return h === "bounds" && m === p;
    }) >= 0 || a.push({
      type: "bounds",
      pos: p
    });
  }), {
    boundMap: f,
    innerBoundMap: v
  };
}
var hl = xa("", ["resizable", "scalable"]), ml = {
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
    vo,
    po,
    go,
    ho,
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
    var e = t.state, n = e.top, a = e.left, i = e.pos1, o = e.pos2, s = e.pos3, u = e.pos4, f = e.snapRenderInfo, l = t.props.snapRenderThreshold, v = l === void 0 ? 1 : l;
    if (!f || !f.render || !Vr(t, ""))
      return zr(t, "boundMap", Pr(), function(L) {
        return JSON.stringify(L);
      }), zr(t, "innerBoundMap", Pr(), function(L) {
        return JSON.stringify(L);
      }), [];
    e.guidelines = Gn(t);
    var c = Math.min(i[0], o[0], s[0], u[0]), d = Math.min(i[1], o[1], s[1], u[1]), p = f.externalPoses || [], g = qt(t.state), h = [], m = [], x = [], S = [], b = [], E = Xt(g), D = E.width, C = E.height, y = E.top, _ = E.left, w = E.bottom, P = E.right, O = { left: _, right: P, top: y, bottom: w, center: (_ + P) / 2, middle: (y + w) / 2 }, T = p.length > 0, I = T ? Xt(p) : {};
    if (!f.request) {
      if (f.direction && b.push(Bf(t, g, f.direction, v, v)), f.snap) {
        var z = Xt(g);
        f.center && (z.middle = (z.top + z.bottom) / 2, z.center = (z.left + z.right) / 2), b.push(qa(t, z, v, v));
      }
      T && (f.center && (I.middle = (I.top + I.bottom) / 2, I.center = (I.left + I.right) / 2), b.push(qa(t, I, v, v))), b.forEach(function(L) {
        var j = L.vertical.posInfos, Y = L.horizontal.posInfos;
        h.push.apply(h, N([], R(j.filter(function($) {
          var J = $.guidelineInfos;
          return J.some(function(at) {
            var st = at.guideline;
            return !st.hide;
          });
        }).map(function($) {
          return {
            type: "snap",
            pos: $.pos
          };
        })), !1)), m.push.apply(m, N([], R(Y.filter(function($) {
          var J = $.guidelineInfos;
          return J.some(function(at) {
            var st = at.guideline;
            return !st.hide;
          });
        }).map(function($) {
          return {
            type: "snap",
            pos: $.pos
          };
        })), !1)), x.push.apply(x, N([], R(ni(j)), !1)), S.push.apply(S, N([], R(ni(Y)), !1));
      });
    }
    var k = ai(t, [_, P], [y, w], h, m), F = k.boundMap, A = k.innerBoundMap;
    T && ai(t, [I.left, I.right], [I.top, I.bottom], h, m, f.externalBounds);
    var W = N(N([], R(x), !1), R(S), !1), H = W.filter(function(L) {
      return L.element && !L.gapRects;
    }), G = W.filter(function(L) {
      return L.gapRects;
    }).sort(function(L, j) {
      return L.gap - j.gap;
    });
    U(t, "onSnap", {
      guidelines: W.filter(function(L) {
        var j = L.element;
        return !j;
      }),
      elements: H,
      gaps: G
    }, !0);
    var V = zr(t, "boundMap", F, function(L) {
      return JSON.stringify(L);
    }, Pr()), q = zr(t, "innerBoundMap", A, function(L) {
      return JSON.stringify(L);
    }, Pr());
    return (F === V || A === q) && U(t, "onBound", {
      bounds: F,
      innerBounds: A
    }, !0), N(N(N(N(N(N([], R(el(t, H, [c, d], O, r)), !1), R(nl(t, G, [c, d], O, r)), !1), R(ti(t, "horizontal", S, [a, n], O, r)), !1), R(ti(t, "vertical", x, [a, n], O, r)), !1), R(Qa(t, "horizontal", m, c, n, D, 0, r)), !1), R(Qa(t, "vertical", h, d, a, C, 1, r)), !1);
  },
  dragStart: function(t, r) {
    t.state.snapRenderInfo = {
      request: r.isRequest,
      snap: !0,
      center: !0
    }, ye(t);
  },
  drag: function(t) {
    var r = t.state;
    ye(t) || (r.guidelines = Gn(t)), r.snapRenderInfo && (r.snapRenderInfo.render = !0);
  },
  pinchStart: function(t) {
    this.unset(t);
  },
  dragEnd: function(t) {
    this.unset(t);
  },
  dragControlCondition: function(t, r) {
    if (hl(t, r) || zn(t, r))
      return !0;
    if (!r.isRequest && r.inputEvent)
      return Ct(r.inputEvent.target, K("snap-control"));
  },
  dragControlStart: function(t) {
    t.state.snapRenderInfo = null, ye(t);
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
    t.state.snapRenderInfo = null, ye(t);
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
function xl(t, r) {
  return [
    t[0] * r[0],
    t[1] * r[1]
  ];
}
function K() {
  for (var t = [], r = 0; r < arguments.length; r++)
    t[r] = arguments[r];
  return Gs.apply(void 0, N([aa], R(t), !1));
}
function To(t) {
  t();
}
function Sl(t) {
  return !t || t === "none" ? [1, 0, 0, 1, 0, 0] : Zt(t) ? t : ae(t);
}
function Jr(t, r, e) {
  return Ie(r, Er(e, r), t, Er(e.map(function(n) {
    return -n;
  }), r));
}
function bl(t, r, e) {
  if (r === "%") {
    var n = pa(t.ownerSVGElement);
    return n[e ? "width" : "height"] / 100;
  }
  return 1;
}
function Dl(t) {
  var r = El(ha(t, ":before"));
  return r.map(function(e, n) {
    var a = se(e), i = a.value, o = a.unit;
    return i * bl(t, o, n === 0);
  });
}
function Fe(t) {
  return t ? t.split(" ") : ["0", "0"];
}
function El(t) {
  return Fe(t.transformOrigin);
}
function Oo(t) {
  var r = Nt(t), e = r("transform");
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
      o.push("matrix(".concat(["a", "b", "c", "d", "e", "f"].map(function(v) {
        return l[v];
      }).join(", "), ")"));
    }, u = 0; u < i; ++u)
      s(u);
    return o.join(" ");
  }
  return "";
}
function oe(t, r, e, n, a) {
  var i, o, s = Zn(t) || pr(t), u = !1, f, l;
  if (!t || e)
    f = t;
  else {
    var v = (i = t?.assignedSlot) === null || i === void 0 ? void 0 : i.parentElement, c = t.parentElement;
    v ? (u = !0, l = c, f = v) : f = c;
  }
  for (var d = !1, p = t === r || f === r, g = "relative", h = 1, m = parseFloat(a?.("zoom")) || 1, x = a?.("position"); f && f !== s; ) {
    r === f && (p = !0);
    var S = Nt(f), b = f.tagName.toLowerCase(), E = Oo(f), D = S("willChange"), C = parseFloat(S("zoom")) || 1;
    if (g = S("position"), n && C !== 1) {
      h = C;
      break;
    }
    if (
      // offsetParent is the parentElement if the target's zoom is not 1 and not absolute.
      !e && n && m !== 1 && x && x !== "absolute" || b === "svg" || b === "foreignobject" || g !== "static" || E && E !== "none" || D === "transform"
    )
      break;
    var y = (o = t?.assignedSlot) === null || o === void 0 ? void 0 : o.parentNode, _ = f.parentNode;
    y && (u = !0, l = _);
    var w = _;
    if (w && w.nodeType === 11) {
      f = w.host, d = !0, g = Nt(f)("position");
      break;
    }
    f = w, g = "relative";
  }
  return {
    offsetZoom: h,
    hasSlot: u,
    parentSlotElement: l,
    isCustomElement: d,
    isStatic: g === "static",
    isEnd: p || !f || f === s,
    offsetParent: f || s
  };
}
function yl(t, r) {
  var e, n = t.tagName.toLowerCase(), a = t.offsetLeft, i = t.offsetTop, o = Nt(t), s = Vn(a), u = !s, f, l;
  return !u && (n !== "svg" || t.ownerSVGElement) ? (f = $i ? Dl(t) : Fe(o("transformOrigin")).map(function(v) {
    return parseFloat(v);
  }), l = f.slice(), u = !0, n === "svg" ? (a = 0, i = 0) : (e = R(Ml(t, f, t === r && r.tagName.toLowerCase() === "g"), 4), a = e[0], i = e[1], f[0] = e[2], f[1] = e[3])) : (f = Fe(o("transformOrigin")).map(function(v) {
    return parseFloat(v);
  }), l = f.slice()), {
    tagName: n,
    isSVG: s,
    hasOffset: u,
    offset: [a || 0, i || 0],
    origin: f,
    targetOrigin: l
  };
}
function Po(t, r) {
  var e = Nt(t), n = Nt(pr(t)), a = n("position");
  if (!r && (!a || a === "static"))
    return [0, 0];
  var i = parseInt(n("marginLeft"), 10), o = parseInt(n("marginTop"), 10);
  return e("position") === "absolute" && ((e("top") !== "auto" || e("bottom") !== "auto") && (o = 0), (e("left") !== "auto" || e("right") !== "auto") && (i = 0)), [i, o];
}
function Bn(t) {
  t.forEach(function(r) {
    var e = r.matrix;
    e && (r.matrix = Kt(e, 3, 4));
  });
}
function Cl(t) {
  for (var r = t.parentElement, e = !1, n = pr(t); r; ) {
    var a = ha(r).transform;
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
function $e(t, r) {
  return r === void 0 && (r = t.length > 9), "".concat(r ? "matrix3d" : "matrix", "(").concat(Hi(t, !r).join(","), ")");
}
function pa(t) {
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
function _l(t, r) {
  var e, n = pa(t), a = n.width, i = n.height, o = n.clientWidth, s = n.clientHeight, u = o / a, f = s / i, l = t.preserveAspectRatio.baseVal, v = l.align, c = l.meetOrSlice, d = [0, 0], p = [u, f], g = [0, 0];
  if (v !== 1) {
    var h = (v - 2) % 3, m = Math.floor((v - 2) / 3);
    d[0] = a * h / 2, d[1] = i * m / 2;
    var x = c === 2 ? Math.max(f, u) : Math.min(u, f);
    p[0] = x, p[1] = x, g[0] = (o - a) / 2 * h, g[1] = (s - i) / 2 * m;
  }
  var S = Jn(p, r);
  return e = R(g, 2), S[r * (r - 1)] = e[0], S[r * (r - 1) + 1] = e[1], Jr(S, r, d);
}
function Ml(t, r, e) {
  var n = t.tagName.toLowerCase();
  if (!t.getBBox || !e && n === "g")
    return [0, 0, 0, 0];
  var a = Nt(t), i = a("transform-box") === "fill-box", o = t.getBBox(), s = pa(t.ownerSVGElement), u = o.x, f = o.y;
  n === "foreignobject" && !u && !f && (u = parseFloat(t.getAttribute("x")) || 0, f = parseFloat(t.getAttribute("y")) || 0);
  var l = u - s.x, v = f - s.y, c = i ? r[0] : r[0] - l, d = i ? r[1] : r[1] - v;
  return [l, v, c, d];
}
function xt(t, r, e) {
  return Pt(t, Dr(r, e), e);
}
function Mr(t, r, e, n) {
  return [[0, 0], [r, 0], [0, e], [r, e]].map(function(a) {
    return xt(t, a, n);
  });
}
function Xt(t) {
  var r = t.map(function(f) {
    return f[0];
  }), e = t.map(function(f) {
    return f[1];
  }), n = Math.min.apply(Math, N([], R(r), !1)), a = Math.min.apply(Math, N([], R(e), !1)), i = Math.max.apply(Math, N([], R(r), !1)), o = Math.max.apply(Math, N([], R(e), !1)), s = i - n, u = o - a;
  return {
    left: n,
    top: a,
    right: i,
    bottom: o,
    width: s,
    height: u
  };
}
function ii(t, r, e, n) {
  var a = Mr(t, r, e, n);
  return Xt(a);
}
function wl(t, r, e, n, a) {
  var i, o = t.target, s = t.origin, u = r.matrix, f = zo(o), l = f.offsetWidth, v = f.offsetHeight, c = e.getBoundingClientRect(), d = [0, 0];
  e === pr(e) && (d = Po(o, !0));
  for (var p = o.getBoundingClientRect(), g = p.left - c.left + e.scrollLeft - (e.clientLeft || 0) + d[0], h = p.top - c.top + e.scrollTop - (e.clientTop || 0) + d[1], m = p.width, x = p.height, S = Ie(n, a, u), b = ii(S, l, v, n), E = b.left, D = b.top, C = b.width, y = b.height, _ = xt(S, s, n), w = Q(_, [E, D]), P = [
    g + w[0] * m / C,
    h + w[1] * x / y
  ], O = [0, 0], T = 0; ++T < 10; ) {
    var I = Qt(a, n);
    i = R(Q(xt(I, P, n), xt(I, _, n)), 2), O[0] = i[0], O[1] = i[1];
    var z = Ie(n, a, Er(O, n), u), k = ii(z, l, v, n), F = k.left, A = k.top, W = F - g, H = A - h;
    if (B(W) < 2 && B(H) < 2)
      break;
    P[0] -= W, P[1] -= H;
  }
  return O.map(function(G) {
    return Math.round(G);
  });
}
function Rl(t, r, e) {
  var n = t.length === 16, a = n ? 4 : 3, i = r.map(function(u) {
    return xt(t, u, a);
  }), o = e.left, s = e.top;
  return i.map(function(u) {
    return [u[0] + o, u[1] + s];
  });
}
function Vt(t) {
  return Math.sqrt(t[0] * t[0] + t[1] * t[1]);
}
function Io(t, r) {
  return Vt([
    r[0] - t[0],
    r[1] - t[1]
  ]);
}
function Ur(t, r, e, n) {
  e === void 0 && (e = 1), n === void 0 && (n = St(t, r));
  var a = Io(t, r);
  return {
    transform: "translateY(-50%) translate(".concat(t[0], "px, ").concat(t[1], "px) rotate(").concat(n, "rad) scaleY(").concat(e, ")"),
    width: "".concat(a, "px")
  };
}
function Ne(t, r) {
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
function Cr(t, r) {
  var e = t[r];
  return Zt(e) ? M(M({}, t), e) : t;
}
function zo(t) {
  var r = t && !Vn(t.offsetWidth), e = 0, n = 0, a = 0, i = 0, o = 0, s = 0, u = 0, f = 0, l = 0, v = 0, c = 0, d = 0, p = 1 / 0, g = 1 / 0, h = 1 / 0, m = 1 / 0, x = 0, S = 0, b = !1;
  if (t)
    if (!r && t.ownerSVGElement) {
      var E = t.getBBox();
      b = !0, e = E.width, n = E.height, o = e, s = n, u = e, f = n, a = e, i = n;
    } else {
      var D = Nt(t), C = t.style, y = D("boxSizing") === "border-box", _ = parseFloat(D("borderLeftWidth")) || 0, w = parseFloat(D("borderRightWidth")) || 0, P = parseFloat(D("borderTopWidth")) || 0, O = parseFloat(D("borderBottomWidth")) || 0, T = parseFloat(D("paddingLeft")) || 0, I = parseFloat(D("paddingRight")) || 0, z = parseFloat(D("paddingTop")) || 0, k = parseFloat(D("paddingBottom")) || 0, F = T + I, A = z + k, W = _ + w, H = P + O, G = F + W, V = A + H, q = D("position"), L = 0, j = 0;
      if ("clientLeft" in t) {
        var Y = null;
        if (q === "absolute") {
          var $ = oe(t, pr(t));
          Y = $.offsetParent;
        } else
          Y = t.parentElement;
        if (Y) {
          var J = Nt(Y);
          L = parseFloat(J("width")), j = parseFloat(J("height"));
        }
      }
      l = Math.max(F, dt(D("minWidth"), L) || 0), v = Math.max(A, dt(D("minHeight"), j) || 0), p = dt(D("maxWidth"), L), g = dt(D("maxHeight"), j), isNaN(p) && (p = 1 / 0), isNaN(g) && (g = 1 / 0), x = dt(C.width, 0) || 0, S = dt(C.height, 0) || 0, o = parseFloat(D("width")) || 0, s = parseFloat(D("height")) || 0, u = B(o - x) < 1 ? mn(l, x || o, p) : o, f = B(s - S) < 1 ? mn(v, S || s, g) : s, e = u, n = f, a = u, i = f, y ? (h = p, m = g, c = l, d = v, u = e - G, f = n - V) : (h = p + G, m = g + V, c = l + G, d = v + V, e = u + G, n = f + V), a = u + F, i = f + A;
    }
  return {
    svg: b,
    offsetWidth: e,
    offsetHeight: n,
    clientWidth: a,
    clientHeight: i,
    contentWidth: u,
    contentHeight: f,
    inlineCSSWidth: x,
    inlineCSSHeight: S,
    cssWidth: o,
    cssHeight: s,
    minWidth: l,
    minHeight: v,
    maxWidth: p,
    maxHeight: g,
    minOffsetWidth: c,
    minOffsetHeight: d,
    maxOffsetWidth: h,
    maxOffsetHeight: m
  };
}
function Go(t, r) {
  return St(r > 0 ? t[0] : t[1], r > 0 ? t[1] : t[0]);
}
function Ce() {
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
function Bo(t, r) {
  var e = t === pr(t) || t === Zn(t), n = {
    clientLeft: t.clientLeft,
    clientTop: t.clientTop,
    clientWidth: t.clientWidth,
    clientHeight: t.clientHeight,
    scrollWidth: t.scrollWidth,
    scrollHeight: t.scrollHeight,
    overflow: !1
  };
  return e && (n.clientHeight = Math.max(r.height, n.clientHeight), n.scrollHeight = Math.max(r.height, n.scrollHeight)), n.overflow = Nt(t)("overflow") !== "visible", M(M({}, r), n);
}
function vn(t, r, e, n) {
  var a = t.left, i = t.right, o = t.top, s = t.bottom, u = r.top, f = r.left, l = {
    left: f + a,
    top: u + o,
    right: f + i,
    bottom: u + s,
    width: i - a,
    height: s - o
  };
  return e && n ? Bo(e, l) : l;
}
function Qr(t, r) {
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
  return t && r ? Bo(t, s) : s;
}
function Tl(t) {
  var r = t.props, e = r.groupable, n = r.svgOrigin, a = t.getState(), i = a.offsetWidth, o = a.offsetHeight, s = a.svg, u = a.transformOrigin;
  return !e && s && n ? ba(n, i, o) : u;
}
function Ao(t, r, e, n) {
  var a;
  if (t)
    a = t;
  else if (r)
    a = [0, 0];
  else {
    var i = e.target;
    a = ko(i, n);
  }
  return a;
}
function ko(t, r) {
  if (t) {
    var e = t.getAttribute("data-rotation") || "", n = t.getAttribute("data-direction");
    if (r.deg = e, !!n) {
      var a = [0, 0];
      return n.indexOf("w") > -1 && (a[0] = -1), n.indexOf("e") > -1 && (a[0] = 1), n.indexOf("n") > -1 && (a[1] = -1), n.indexOf("s") > -1 && (a[1] = 1), a;
    }
  }
}
function ga(t, r) {
  return [
    ut(r, t[0]),
    ut(r, t[1]),
    ut(r, t[2]),
    ut(r, t[3])
  ];
}
function qt(t) {
  var r = t.left, e = t.top, n = t.pos1, a = t.pos2, i = t.pos3, o = t.pos4;
  return ga([n, a, i, o], [r, e]);
}
function An(t, r) {
  t[r ? "controlAbles" : "targetAbles"].forEach(function(e) {
    e.unset && e.unset(t);
  });
}
function Ir(t, r) {
  var e = r ? "controlGesto" : "targetGesto", n = t[e];
  n?.isIdle() === !1 && An(t, r), n?.unset(), t[e] = null;
}
function At(t, r) {
  if (r) {
    var e = Xr(r);
    e.nextStyle = M(M({}, e.nextStyle), t);
  }
  return {
    style: t,
    cssText: Lr(t).map(function(n) {
      return "".concat(qs(n, "-"), ": ").concat(t[n], ";");
    }).join("")
  };
}
function Fo(t, r, e) {
  var n = r.afterTransform || r.transform;
  return M(M({}, At(M(M(M({}, t.style), r.style), { transform: n }), e)), { afterTransform: n, transform: t.transform });
}
function nt(t, r, e, n) {
  var a = r.datas;
  a.datas || (a.datas = {});
  var i = M(M({}, e), { target: t.state.target, clientX: r.clientX, clientY: r.clientY, inputEvent: r.inputEvent, currentTarget: t, moveable: t, datas: a.datas, isRequest: r.isRequest, isRequestChild: r.isRequestChild, isFirstDrag: !!r.isFirstDrag, isTrusted: r.isTrusted !== !1, stopAble: function() {
    a.isEventStart = !1;
  }, stopDrag: function() {
    var o;
    (o = r.stop) === null || o === void 0 || o.call(r);
  } });
  return a.isStartEvent ? n || (a.lastEvent = i) : a.isStartEvent = !0, i;
}
function Lt(t, r, e) {
  var n = r.datas, a = "isDrag" in e ? e.isDrag : r.isDrag;
  return n.datas || (n.datas = {}), M(M({ isDrag: a }, e), { moveable: t, target: t.state.target, clientX: r.clientX, clientY: r.clientY, inputEvent: r.inputEvent, currentTarget: t, lastEvent: n.lastEvent, isDouble: r.isDouble, datas: n.datas, isFirstDrag: !!r.isFirstDrag });
}
function Ze(t, r, e) {
  t._emitter.on(r, e);
}
function U(t, r, e, n, a) {
  return t.triggerEvent(r, e, n, a);
}
function ha(t, r) {
  return lr(t).getComputedStyle(t, r);
}
function _e(t, r, e) {
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
function kn(t, r) {
  return t === r || t == null && r == null;
}
function oi() {
  for (var t = [], r = 0; r < arguments.length; r++)
    t[r] = arguments[r];
  for (var e = t.length - 1, n = 0; n < e; ++n) {
    var a = t[n];
    if (!Vn(a))
      return a;
  }
  return t[e];
}
function No(t, r) {
  var e = [], n = [];
  return t.forEach(function(a, i) {
    var o = r(a, i, t), s = n.indexOf(o), u = e[s] || [];
    s === -1 && (n.push(o), e.push(u)), u.push(a);
  }), e;
}
function Ol(t, r) {
  var e = [], n = {};
  return t.forEach(function(a, i) {
    var o = r(a, i, t), s = n[o];
    s || (s = [], n[o] = s, e.push(s)), s.push(a);
  }), e;
}
function Wo(t) {
  return t.reduce(function(r, e) {
    return r.concat(e);
  }, []);
}
function Nr() {
  for (var t = [], r = 0; r < arguments.length; r++)
    t[r] = arguments[r];
  return t.sort(function(e, n) {
    return B(n) - B(e);
  }), t[0];
}
function Wr(t, r, e) {
  return Pt(Qt(t, e), Dr(r, e), e);
}
function Pl(t, r) {
  var e, n = t.is3d, a = t.rootMatrix, i = n ? 4 : 3;
  return e = R(Wr(a, [r.distX, r.distY], i), 2), r.distX = e[0], r.distY = e[1], r;
}
function Yt(t, r, e, n) {
  if (!e[0] && !e[1])
    return r;
  var a = xt(t, [ei(e[0] || 1), 0], n), i = xt(t, [0, ei(e[1] || 1)], n), o = xt(t, [
    e[0] / Vt(a),
    e[1] / Vt(i)
  ], n);
  return ut(r, o);
}
function jt(t, r, e) {
  return e ? "".concat(t / r * 100, "%") : "".concat(t, "px");
}
function We(t) {
  return B(t) <= kt ? 0 : t;
}
function ma(t) {
  return function(r) {
    if (!r.isDragging(t))
      return "";
    var e = bf(r, t), n = e.deg;
    return n ? K("view-control-rotation".concat(n)) : "";
  };
}
function xa(t, r) {
  return r === void 0 && (r = [t]), function(e, n) {
    if (n.isRequest)
      return r.some(function(i) {
        return n.requestAble === i;
      }) ? n.parentDirection : !1;
    var a = n.inputEvent.target;
    return Ct(a, K("direction")) && (!t || Ct(a, K(t)));
  };
}
function Il(t, r, e) {
  var n, a = Ar(t, {
    "x%": function(E) {
      return E / 100 * r.offsetWidth;
    },
    "y%": function(E) {
      return E / 100 * r.offsetHeight;
    }
  }), i = t.slice(0, e < 0 ? void 0 : e), o = t.slice(0, e < 0 ? void 0 : e + 1), s = t[e] || "", u = e < 0 ? [] : t.slice(e), f = e < 0 ? [] : t.slice(e + 1), l = a.slice(0, e < 0 ? void 0 : e), v = a.slice(0, e < 0 ? void 0 : e + 1), c = (n = a[e]) !== null && n !== void 0 ? n : Ar([""])[0], d = e < 0 ? [] : a.slice(e), p = e < 0 ? [] : a.slice(e + 1), g = c ? [c] : [], h = Rr(l), m = Rr(v), x = Rr(d), S = Rr(p), b = pt(h, x, 4);
  return {
    transforms: t,
    beforeFunctionMatrix: h,
    beforeFunctionMatrix2: m,
    targetFunctionMatrix: Rr(g),
    afterFunctionMatrix: x,
    afterFunctionMatrix2: S,
    allFunctionMatrix: b,
    beforeFunctions: l,
    beforeFunctions2: v,
    targetFunction: g[0],
    afterFunctions: d,
    afterFunctions2: p,
    beforeFunctionTexts: i,
    beforeFunctionTexts2: o,
    targetFunctionText: s,
    afterFunctionTexts: u,
    afterFunctionTexts2: f
  };
}
function zl(t) {
  return !t || !Zt(t) || Kn(t) ? !1 : wt(t) || "length" in t;
}
function Jt(t, r) {
  return t ? Kn(t) ? t : ar(t) ? r ? document.querySelector(t) : t : qn(t) ? t() : Fi(t) ? t : "current" in t ? t.current : t : null;
}
function Sa(t, r) {
  if (!t)
    return [];
  var e = zl(t) ? [].slice.call(t) : [t];
  return e.reduce(function(n, a) {
    return ar(a) && r ? N(N([], R(n), !1), R([].slice.call(document.querySelectorAll(a))), !1) : (wt(a) ? n.push(Sa(a, r)) : n.push(Jt(a, r)), n);
  }, []);
}
function Gl(t, r, e) {
  var n = St(t, r) / Math.PI * 180;
  return n = e >= 0 ? n : 180 - n, n = n >= 0 ? n : 360 + n, n;
}
function si(t, r) {
  var e = t.rootMatrix, n = t.is3d, a = n ? 4 : 3, i = Qt(e, a);
  return n || (i = Kt(i, 3, 4)), i[12] = 0, i[13] = 0, i[14] = 0, uu(i, r);
}
function Ho(t, r, e, n, a) {
  var i = R(t, 2), o = i[0], s = i[1], u = 0, f = 0;
  if (a && o && s) {
    var l = St([0, 0], r), v = St([0, 0], n), c = Vt(r), d = Math.cos(l - v) * c;
    if (!n[0])
      f = d, u = f * e;
    else if (!n[1])
      u = d, f = u / e;
    else {
      var p = n[0] * o, g = n[1] * s, h = Math.atan2(p + r[0], g + r[1]), m = Math.atan2(p, g);
      h < 0 && (h += Math.PI * 2), m < 0 && (m += Math.PI * 2);
      var x = 0;
      B(h - m) < Math.PI / 2 || B(h - m) > Math.PI / 2 * 3 || (m += Math.PI), x = h - m, x > Math.PI * 2 ? x -= Math.PI * 2 : x > Math.PI ? x = 2 * Math.PI - x : x < -Math.PI && (x = -2 * Math.PI - x);
      var S = Vt([p + r[0], g + r[1]]) * Math.cos(x);
      u = S * Math.sin(m) - p, f = S * Math.cos(m) - g, n[0] < 0 && (u *= -1), n[1] < 0 && (f *= -1);
    }
  } else
    u = n[0] * r[0], f = n[1] * r[1];
  return [u, f];
}
function Lo(t, r, e, n) {
  var a, i = e.ratio, o = e.startOffsetWidth, s = e.startOffsetHeight, u = 0, f = 0, l = n.distX, v = n.distY, c = n.pinchScale, d = n.parentDistance, p = n.parentDist, g = n.parentScale, h = e.fixedDirection, m = [0, 1].map(function(C) {
    return B(t[C] - h[C]);
  }), x = [0, 1].map(function(C) {
    var y = m[C];
    return y !== 0 && (y = 2 / y), y;
  });
  if (p)
    u = p[0], f = p[1], r && (u ? f || (f = u / i) : u = f * i);
  else if (ee(c))
    u = (c - 1) * o, f = (c - 1) * s;
  else if (g)
    u = (g[0] - 1) * o, f = (g[1] - 1) * s;
  else if (d) {
    var S = o * m[0], b = s * m[1], E = Vt([S, b]);
    u = d / E * S * x[0], f = d / E * b * x[1];
  } else {
    var D = tr({ datas: e, distX: l, distY: v });
    D = x.map(function(C, y) {
      return D[y] * C;
    }), a = R(Ho([o, s], D, i, t, r), 2), u = a[0], f = a[1];
  }
  return {
    // direction,
    // sizeDirection,
    distWidth: u,
    distHeight: f
  };
}
function Fn(t, r) {
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
    var e = R(t.split(" "), 2), n = e[0], a = e[1], i = Fn(n || ""), o = Fn(a || ""), s = M(M({}, i), o), u = {
      x: "50%",
      y: "50%"
    };
    return s.x && (u.x = s.x), s.y && (u.y = s.y), s.value && (s.x && !s.y && (u.y = s.value), !s.x && s.y && (u.x = s.value)), u;
  }
  return t === "left" ? { x: "0%" } : t === "right" ? { x: "100%" } : t === "top" ? { y: "0%" } : t === "bottom" ? { y: "100%" } : t ? t === "center" ? { value: "50%" } : { value: t } : {};
}
function ba(t, r, e) {
  var n = Fn(t, !0), a = n.x, i = n.y;
  return [
    dt(a, r) || 0,
    dt(i, e) || 0
  ];
}
function Bl(t, r, e) {
  var n = t.map(function(i) {
    return Q(i, r);
  }), a = n.map(function(i) {
    return ue(i, e);
  });
  return {
    prev: n,
    next: a,
    result: a.map(function(i) {
      return ut(i, r);
    })
  };
}
function Yo(t, r) {
  return t.length === r.length && t.every(function(e, n) {
    var a = r[n], i = wt(e), o = wt(a);
    return i && o ? Yo(e, a) : !i && !o ? e === a : !1;
  });
}
function zr(t, r, e, n, a) {
  var i = t._store, o = i[r];
  if (!(r in i))
    if (a != null)
      i[r] = a, o = a;
    else
      return i[r] = e, e;
  return o === e || n(o) === n(e) ? o : (i[r] = e, e);
}
function Bt(t) {
  return t >= 0 ? 1 : -1;
}
function B(t) {
  return Math.abs(t);
}
function dn(t, r) {
  return Zs(t).map(function(e) {
    return r(e);
  });
}
function Xo(t) {
  return ee(t) ? {
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
var Al = ce("pinchable", {
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
    var f = "onPinch".concat(n ? "Group" : "", "Start"), l = "drag".concat(n ? "Group" : "", "ControlStart"), v = (s === !0 ? t.controlAbles : u.filter(function(g) {
      return s.indexOf(g.name) > -1;
    })).filter(function(g) {
      return g.canPinch && g[l];
    }), c = nt(t, r, {});
    n && (c.targets = n);
    var d = U(t, f, c);
    e.isPinch = d !== !1, e.ables = v;
    var p = e.isPinch;
    return p ? (v.forEach(function(g) {
      if (i[g.name] = i[g.name] || {}, !!g[l]) {
        var h = M(M({}, r), { datas: i[g.name], parentRotate: a, isPinch: !0 });
        g[l](t, h);
      }
    }), t.state.snapRenderInfo = {
      request: r.isRequest,
      direction: [0, 0]
    }, p) : !1;
  },
  pinch: function(t, r) {
    var e = r.datas, n = r.scale, a = r.distance, i = r.originalDatas, o = r.inputEvent, s = r.targets, u = r.angle;
    if (e.isPinch) {
      var f = a * (1 - 1 / n), l = nt(t, r, {});
      s && (l.targets = s);
      var v = "onPinch".concat(s ? "Group" : "");
      U(t, v, l);
      var c = e.ables, d = "drag".concat(s ? "Group" : "", "Control");
      return c.forEach(function(p) {
        p[d] && p[d](t, M(M({}, r), { datas: i[p.name], inputEvent: o, resolveMatrix: !0, pinchScale: n, parentDistance: f, parentRotate: u, isPinch: !0 }));
      }), l;
    }
  },
  pinchEnd: function(t, r) {
    var e = r.datas, n = r.isPinch, a = r.inputEvent, i = r.targets, o = r.originalDatas;
    if (e.isPinch) {
      var s = "onPinch".concat(i ? "Group" : "", "End"), u = Lt(t, r, { isDrag: n });
      i && (u.targets = i), U(t, s, u);
      var f = e.ables, l = "drag".concat(i ? "Group" : "", "ControlEnd");
      return f.forEach(function(v) {
        v[l] && v[l](t, M(M({}, r), { isDrag: n, datas: o[v.name], inputEvent: a, isPinch: !0 }));
      }), n;
    }
  },
  pinchGroupStart: function(t, r) {
    return this.pinchStart(t, M(M({}, r), { targets: t.props.targets }));
  },
  pinchGroup: function(t, r) {
    return this.pinch(t, M(M({}, r), { targets: t.props.targets }));
  },
  pinchGroupEnd: function(t, r) {
    return this.pinchEnd(t, M(M({}, r), { targets: t.props.targets }));
  }
}), ui = xa("scalable"), kl = {
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
  render: fo("scalable"),
  dragControlCondition: ui,
  viewClassName: ma("scalable"),
  dragControlStart: function(t, r) {
    var e = r.datas, n = r.isPinch, a = r.inputEvent, i = r.parentDirection, o = Ao(i, n, a, e), s = t.state, u = s.width, f = s.height, l = s.targetTransform, v = s.target, c = s.pos1, d = s.pos2, p = s.pos4;
    if (!o || !v)
      return !1;
    n || _r(t, r), e.datas = {}, e.transform = l, e.prevDist = [1, 1], e.direction = o, e.startOffsetWidth = u, e.startOffsetHeight = f, e.startValue = [1, 1];
    var g = !o[0] && !o[1] || o[0] || !o[1];
    Ve(t, r, "scale"), e.isWidth = g;
    function h(D) {
      e.ratio = D && isFinite(D) ? D : 0;
    }
    e.startPositions = qt(t.state);
    function m(D) {
      var C = Eo(e.startPositions, D);
      e.fixedDirection = C.fixedDirection, e.fixedPosition = C.fixedPosition, e.fixedOffset = C.fixedOffset;
    }
    e.setFixedDirection = m, h(rr(c, d) / rr(d, p)), m([-o[0], -o[1]]);
    var x = function(D) {
      e.minScaleSize = D;
    }, S = function(D) {
      e.maxScaleSize = D;
    };
    x([-1 / 0, -1 / 0]), S([1 / 0, 1 / 0]);
    var b = nt(t, r, M(M({ direction: o, set: function(D) {
      e.startValue = D;
    }, setRatio: h, setFixedDirection: m, setMinScaleSize: x, setMaxScaleSize: S }, Xe(t, r)), { dragStart: Gt.dragStart(t, new kr().dragStart([0, 0], r)) })), E = U(t, "onScaleStart", b);
    return e.startFixedDirection = e.fixedDirection, E !== !1 && (e.isScale = !0, t.state.snapRenderInfo = {
      request: r.isRequest,
      direction: o
    }), e.isScale ? b : !1;
  },
  dragControl: function(t, r) {
    Le(t, r, "scale");
    var e = r.datas, n = r.parentKeepRatio, a = r.parentFlag, i = r.isPinch, o = r.dragClient, s = r.isRequest, u = r.useSnap, f = r.resolveMatrix, l = e.prevDist, v = e.direction, c = e.startOffsetWidth, d = e.startOffsetHeight, p = e.isScale, g = e.startValue, h = e.isWidth, m = e.ratio;
    if (!p)
      return !1;
    var x = t.props, S = x.throttleScale, b = x.parentMoveable, E = v;
    !v[0] && !v[1] && (E = [1, 1]);
    var D = m && (n ?? x.keepRatio) || !1, C = t.state, y = [
      g[0],
      g[1]
    ];
    function _() {
      var X = Lo(E, D, e, r), Z = X.distWidth, ft = X.distHeight, rt = c ? (c + Z) / c : 1, et = d ? (d + ft) / d : 1;
      g[0] || (y[0] = Z / c), g[1] || (y[1] = ft / d);
      var ot = (E[0] || D ? rt : 1) * y[0], vt = (E[1] || D ? et : 1) * y[1];
      return ot === 0 && (ot = Bt(l[0]) * be), vt === 0 && (vt = Bt(l[1]) * be), [ot, vt];
    }
    var w = _();
    if (!i && t.props.groupable) {
      var P = C.snapRenderInfo || {}, O = P.direction;
      wt(O) && (O[0] || O[1]) && (C.snapRenderInfo = { direction: v, request: r.isRequest });
    }
    U(t, "onBeforeScale", nt(t, r, {
      scale: w,
      setFixedDirection: function(X) {
        return e.setFixedDirection(X), w = _(), w;
      },
      startFixedDirection: e.startFixedDirection,
      setScale: function(X) {
        w = X;
      }
    }, !0));
    var T = [
      w[0] / y[0],
      w[1] / y[1]
    ], I = o, z = [0, 0], k = Bt(T[0] * T[1]), F = !o && !a && i;
    if (F || f ? I = sa(t, e.targetAllTransform, [0, 0], [0, 0], e) : o || (I = e.fixedPosition), i || (z = pl(t, T, v, !u && s, e)), D) {
      E[0] && E[1] && z[0] && z[1] && (Math.abs(z[0] * c) > Math.abs(z[1] * d) ? z[1] = 0 : z[0] = 0);
      var A = !z[0] && !z[1];
      if (A && (h ? T[0] = tt(T[0] * y[0], S) / y[0] : T[1] = tt(T[1] * y[1], S) / y[1]), E[0] && !E[1] || z[0] && !z[1] || A && h) {
        T[0] += z[0];
        var W = c * T[0] * y[0] / m;
        T[1] = Bt(k * T[0]) * B(W / d / y[1]);
      } else if (!E[0] && E[1] || !z[0] && z[1] || A && !h) {
        T[1] += z[1];
        var H = d * T[1] * y[1] * m;
        T[0] = Bt(k * T[1]) * B(H / c / y[0]);
      }
    } else
      T[0] += z[0], T[1] += z[1], z[0] || (T[0] = tt(T[0] * y[0], S) / y[0]), z[1] || (T[1] = tt(T[1] * y[1], S) / y[1]);
    T[0] === 0 && (T[0] = Bt(l[0]) * be), T[1] === 0 && (T[1] = Bt(l[1]) * be), w = xl(T, [y[0], y[1]]);
    var G = [
      c,
      d
    ], V = [
      c * w[0],
      d * w[1]
    ];
    V = Bi(V, e.minScaleSize, e.maxScaleSize, D ? m : !1), w = dn(2, function(X) {
      return G[X] ? V[X] / G[X] : V[X];
    }), T = dn(2, function(X) {
      return w[X] / y[X];
    });
    var q = dn(2, function(X) {
      return l[X] ? T[X] / l[X] : T[X];
    }), L = "scale(".concat(T.join(", "), ")"), j = "scale(".concat(w.join(", "), ")"), Y = Ye(e, j, L), $ = !g[0] || !g[1], J = pf(t, $ ? j : L, e.fixedDirection, I, e.fixedOffset, e, $), at = F ? J : Q(J, e.prevInverseDist || [0, 0]);
    if (e.prevDist = T, e.prevInverseDist = J, w[0] === l[0] && w[1] === l[1] && at.every(function(X) {
      return !X;
    }) && !b && !F)
      return !1;
    var st = nt(t, r, M({ offsetWidth: c, offsetHeight: d, direction: v, scale: w, dist: T, delta: q, isPinch: !!i }, no(t, Y, at, i, r)));
    return U(t, "onScale", st), st;
  },
  dragControlEnd: function(t, r) {
    var e = r.datas;
    if (!e.isScale)
      return !1;
    e.isScale = !1;
    var n = Lt(t, r, {});
    return U(t, "onScaleEnd", n), n;
  },
  dragGroupControlCondition: ui,
  dragGroupControlStart: function(t, r) {
    var e = r.datas, n = this.dragControlStart(t, r);
    if (!n)
      return !1;
    var a = $t(t, "resizable", r);
    e.moveableScale = t.scale;
    var i = er(t, this, "dragControlStart", r, function(f, l) {
      return Be(t, f, e, l);
    }), o = function(f) {
      n.setFixedDirection(f), i.forEach(function(l, v) {
        l.setFixedDirection(f), Be(t, l.moveable, e, a[v]);
      });
    };
    e.setFixedDirection = o;
    var s = M(M({}, n), { targets: t.props.targets, events: i, setFixedDirection: o }), u = U(t, "onScaleGroupStart", s);
    return e.isScale = u !== !1, e.isScale ? s : !1;
  },
  dragGroupControl: function(t, r) {
    var e = r.datas;
    if (e.isScale) {
      Ze(t, "onBeforeScale", function(l) {
        U(t, "onBeforeScaleGroup", nt(t, r, M(M({}, l), { targets: t.props.targets }), !0));
      });
      var n = this.dragControl(t, r);
      if (n) {
        var a = n.dist, i = e.moveableScale;
        t.scale = [
          a[0] * i[0],
          a[1] * i[1]
        ];
        var o = t.props.keepRatio, s = e.fixedPosition, u = er(t, this, "dragControl", r, function(l, v) {
          var c = R(Pt(fe(t.rotation / 180 * Math.PI, 3), [
            v.datas.originalX * a[0],
            v.datas.originalY * a[1],
            1
          ], 3), 2), d = c[0], p = c[1];
          return M(M({}, v), {
            parentDist: null,
            parentScale: a,
            parentKeepRatio: o,
            // recalculate child fixed position for parent group's dragging.
            dragClient: ut(s, [d, p])
          });
        }), f = M({ targets: t.props.targets, events: u }, n);
        return U(t, "onScaleGroup", f), f;
      }
    }
  },
  dragGroupControlEnd: function(t, r) {
    var e = r.isDrag, n = r.datas;
    if (n.isScale) {
      this.dragControlEnd(t, r);
      var a = er(t, this, "dragControlEnd", r), i = Lt(t, r, {
        targets: t.props.targets,
        events: a
      });
      return U(t, "onScaleGroupEnd", i), e;
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
function sr(t, r) {
  return t.map(function(e, n) {
    return Pe(e, r[n], 1, 2);
  });
}
function fi(t, r, e) {
  var n = St(t, r), a = St(t, e), i = a - n;
  return i >= 0 ? i : i + 2 * Math.PI;
}
function Fl(t, r) {
  var e = fi(t[0], t[1], t[2]), n = fi(r[0], r[1], r[2]), a = Math.PI;
  return !(e >= a && n <= a || e <= a && n >= a);
}
var Nl = {
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
  viewClassName: ma("warpable"),
  render: function(t, r) {
    var e = t.props, n = e.resizable, a = e.scalable, i = e.warpable, o = e.zoom;
    if (n || a || !i)
      return [];
    var s = t.state, u = s.pos1, f = s.pos2, l = s.pos3, v = s.pos4, c = sr(u, f), d = sr(f, u), p = sr(u, l), g = sr(l, u), h = sr(l, v), m = sr(v, l), x = sr(f, v), S = sr(v, f);
    return N([
      r.createElement("div", { className: K("line"), key: "middeLine1", style: Ur(c, h, o) }),
      r.createElement("div", { className: K("line"), key: "middeLine2", style: Ur(d, m, o) }),
      r.createElement("div", { className: K("line"), key: "middeLine3", style: Ur(p, x, o) }),
      r.createElement("div", { className: K("line"), key: "middeLine4", style: Ur(g, S, o) })
    ], R(lo(t, "warpable", r)), !1);
  },
  dragControlCondition: function(t, r) {
    if (r.isRequest)
      return !1;
    var e = r.inputEvent.target;
    return Ct(e, K("direction")) && Ct(e, K("warpable"));
  },
  dragControlStart: function(t, r) {
    var e = r.datas, n = r.inputEvent, a = t.props.target, i = n.target, o = ko(i, e);
    if (!o || !a)
      return !1;
    var s = t.state, u = s.transformOrigin, f = s.is3d, l = s.targetTransform, v = s.targetMatrix, c = s.width, d = s.height, p = s.left, g = s.top;
    e.datas = {}, e.targetTransform = l, e.warpTargetMatrix = f ? v : Kt(v, 3, 4), e.targetInverseMatrix = Ni(Qt(e.warpTargetMatrix, 4), 3, 4), e.direction = o, e.left = p, e.top = g, e.poses = [
      [0, 0],
      [c, 0],
      [0, d],
      [c, d]
    ].map(function(x) {
      return Q(x, u);
    }), e.nextPoses = e.poses.map(function(x) {
      var S = R(x, 2), b = S[0], E = S[1];
      return Pt(e.warpTargetMatrix, [b, E, 0, 1], 4);
    }), e.startValue = mt(4), e.prevMatrix = mt(4), e.absolutePoses = qt(s), e.posIndexes = eo(o), _r(t, r), Ve(t, r, "matrix3d"), s.snapRenderInfo = {
      request: r.isRequest,
      direction: o
    };
    var h = nt(t, r, M({ set: function(x) {
      e.startValue = x;
    } }, Xe(t, r))), m = U(t, "onWarpStart", h);
    return m !== !1 && (e.isWarp = !0), e.isWarp;
  },
  dragControl: function(t, r) {
    var e = r.datas, n = r.isRequest, a = r.distX, i = r.distY, o = e.targetInverseMatrix, s = e.prevMatrix, u = e.isWarp, f = e.startValue, l = e.poses, v = e.posIndexes, c = e.absolutePoses;
    if (!u)
      return !1;
    if (Le(t, r, "matrix3d"), Vr(t, "warpable")) {
      var d = v.map(function(_) {
        return c[_];
      });
      d.length > 1 && d.push([
        (d[0][0] + d[1][0]) / 2,
        (d[0][1] + d[1][1]) / 2
      ]);
      var p = Ue(t, n, {
        horizontal: d.map(function(_) {
          return _[1] + i;
        }),
        vertical: d.map(function(_) {
          return _[0] + a;
        })
      }), g = p.horizontal, h = p.vertical;
      i -= g.offset, a -= h.offset;
    }
    var m = tr({ datas: e, distX: a, distY: i }, !0), x = e.nextPoses.slice();
    if (v.forEach(function(_) {
      x[_] = ut(x[_], m);
    }), !ef.every(function(_) {
      return Fl(_.map(function(w) {
        return l[w];
      }), _.map(function(w) {
        return x[w];
      }));
    }))
      return !1;
    var S = Qn(l[0], l[2], l[1], l[3], x[0], x[2], x[1], x[3]);
    if (!S.length)
      return !1;
    var b = pt(o, S, 4), E = to(e, b, !0), D = pt(Qt(s, 4), E, 4);
    e.prevMatrix = E;
    var C = pt(f, E, 4), y = Ye(e, "matrix3d(".concat(C.join(", "), ")"), "matrix3d(".concat(E.join(", "), ")"));
    return oa(r, y), U(t, "onWarp", nt(t, r, M({ delta: D, matrix: C, dist: E, multiply: pt, transform: y }, At({
      transform: y
    }, r)))), !0;
  },
  dragControlEnd: function(t, r) {
    var e = r.datas, n = r.isDrag;
    return e.isWarp ? (e.isWarp = !1, U(t, "onWarpEnd", Lt(t, r, {})), n) : !1;
  }
}, Wl = /* @__PURE__ */ K("area-pieces"), Me = /* @__PURE__ */ K("area-piece"), Vo = /* @__PURE__ */ K("avoid"), Hl = K("view-dragging");
function pn(t) {
  var r = t.areaElement;
  if (r) {
    var e = t.state, n = e.width, a = e.height;
    ki(r, Vo), r.style.cssText += "left: 0px; top: 0px; width: ".concat(n, "px; height: ").concat(a, "px");
  }
}
function li(t) {
  return t.createElement(
    "div",
    { key: "area_pieces", className: Wl },
    t.createElement("div", { className: Me }),
    t.createElement("div", { className: Me }),
    t.createElement("div", { className: Me }),
    t.createElement("div", { className: Me })
  );
}
var qo = {
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
    var e = t.props, n = e.target, a = e.dragArea, i = e.groupable, o = e.passDragArea, s = t.getState(), u = s.width, f = s.height, l = s.renderPoses, v = o ? K("area", "pass") : K("area");
    if (i)
      return [
        r.createElement("div", { key: "area", ref: br(t, "areaElement"), className: v }),
        li(r)
      ];
    if (!n || !a)
      return [];
    var c = Qn([0, 0], [u, 0], [0, f], [u, f], l[0], l[1], l[2], l[3]), d = c.length ? $e(c, !0) : "none";
    return [
      r.createElement("div", { key: "area", ref: br(t, "areaElement"), className: v, style: {
        top: "0px",
        left: "0px",
        width: "".concat(u, "px"),
        height: "".concat(f, "px"),
        transformOrigin: "0 0",
        transform: d
      } }),
      li(r)
    ];
  },
  dragStart: function(t, r) {
    var e = r.datas, n = r.clientX, a = r.clientY, i = r.inputEvent;
    if (!i)
      return !1;
    e.isDragArea = !1;
    var o = t.areaElement, s = t.state, u = s.moveableClientRect, f = s.renderPoses, l = s.rootMatrix, v = s.is3d, c = u.left, d = u.top, p = Xt(f), g = p.left, h = p.top, m = p.width, x = p.height, S = v ? 4 : 3, b = R(Wr(l, [n - c, a - d], S), 2), E = b[0], D = b[1];
    E -= g, D -= h;
    var C = [
      { left: g, top: h, width: m, height: D - 10 },
      { left: g, top: h, width: E - 10, height: x },
      { left: g, top: h + D + 10, width: m, height: x - D - 10 },
      { left: g + E + 10, top: h, width: m - E - 10, height: x }
    ], y = [].slice.call(o.nextElementSibling.children);
    C.forEach(function(_, w) {
      y[w].style.cssText = "left: ".concat(_.left, "px;top: ").concat(_.top, "px; width: ").concat(_.width, "px; height: ").concat(_.height, "px;");
    }), Ai(o, Vo), s.disableNativeEvent = !0;
  },
  drag: function(t, r) {
    var e = r.datas, n = r.inputEvent;
    if (this.enableNativeEvent(t), !n)
      return !1;
    e.isDragArea || (e.isDragArea = !0, pn(t));
  },
  dragEnd: function(t, r) {
    this.enableNativeEvent(t);
    var e = r.inputEvent, n = r.datas;
    if (!e)
      return !1;
    n.isDragArea || pn(t);
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
    pn(t), t.state.disableNativeEvent = !1;
  },
  enableNativeEvent: function(t) {
    var r = t.state;
    r.disableNativeEvent && Gi(function() {
      r.disableNativeEvent = !1;
    });
  }
}, Ll = ce("origin", {
  props: ["origin", "svgOrigin"],
  render: function(t, r) {
    var e = t.props, n = e.zoom, a = e.svgOrigin, i = e.groupable, o = t.getState(), s = o.beforeOrigin, u = o.rotation, f = o.svg, l = o.allMatrix, v = o.is3d, c = o.left, d = o.top, p = o.offsetWidth, g = o.offsetHeight, h;
    if (!i && f && a) {
      var m = R(ba(a, p, g), 2), x = m[0], S = m[1], b = v ? 4 : 3, E = xt(l, [x, S], b);
      h = Ne(u, n, Q(E, [c, d]));
    } else
      h = Ne(u, n, s);
    return [
      r.createElement("div", { className: K("control", "origin"), style: h, key: "beforeOrigin" })
    ];
  }
});
function Yl(t) {
  var r = t.scrollContainer;
  return [
    r.scrollLeft,
    r.scrollTop
  ];
}
var Xl = {
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
    var e = t.props, n = e.scrollContainer, a = n === void 0 ? t.getContainer() : n, i = e.scrollOptions, o = new Du(), s = Jt(a, !0);
    r.datas.dragScroll = o, t.state.dragScroll = o;
    var u = r.isControl ? "controlGesto" : "targetGesto", f = r.targets;
    o.on("scroll", function(l) {
      var v = l.container, c = l.direction, d = nt(t, r, {
        scrollContainer: v,
        direction: c
      }), p = f ? "onScrollGroup" : "onScroll";
      f && (d.targets = f), U(t, p, d);
    }).on("move", function(l) {
      var v = l.offsetX, c = l.offsetY, d = l.inputEvent;
      t[u].scrollBy(v, c, d.inputEvent, !1);
    }).on("scrollDrag", function(l) {
      var v = l.next;
      v(t[u].getCurrentEvent());
    }), o.dragStart(r, M({ container: s }, i));
  },
  checkScroll: function(t, r) {
    var e = r.datas.dragScroll;
    if (e) {
      var n = t.props, a = n.scrollContainer, i = a === void 0 ? t.getContainer() : a, o = n.scrollThreshold, s = o === void 0 ? 0 : o, u = n.scrollThrottleTime, f = u === void 0 ? 0 : u, l = n.getScrollPosition, v = l === void 0 ? Yl : l, c = n.scrollOptions;
      return e.drag(r, M({ container: i, threshold: s, throttleTime: f, getScrollPosition: function(d) {
        return v({ scrollContainer: d.container, direction: d.direction });
      } }, c)), !0;
    }
  },
  drag: function(t, r) {
    return this.checkScroll(t, r);
  },
  dragEnd: function(t, r) {
    r.datas.dragScroll.dragEnd(), r.datas.dragScroll = null;
  },
  dragControlStart: function(t, r) {
    return this.dragStart(t, M(M({}, r), { isControl: !0 }));
  },
  dragControl: function(t, r) {
    return this.drag(t, r);
  },
  dragControlEnd: function(t, r) {
    return this.dragEnd(t, r);
  },
  dragGroupStart: function(t, r) {
    return this.dragStart(t, M(M({}, r), { targets: t.props.targets }));
  },
  dragGroup: function(t, r) {
    return this.drag(t, M(M({}, r), { targets: t.props.targets }));
  },
  dragGroupEnd: function(t, r) {
    return this.dragEnd(t, M(M({}, r), { targets: t.props.targets }));
  },
  dragGroupControlStart: function(t, r) {
    return this.dragStart(t, M(M({}, r), { targets: t.props.targets, isControl: !0 }));
  },
  dragGroupControl: function(t, r) {
    return this.drag(t, M(M({}, r), { targets: t.props.targets }));
  },
  dragGroupControEnd: function(t, r) {
    return this.dragEnd(t, M(M({}, r), { targets: t.props.targets }));
  },
  unset: function(t) {
    var r, e = t.state;
    (r = e.dragScroll) === null || r === void 0 || r.dragEnd(), e.dragScroll = null;
  }
}, jo = {
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
}, Vl = ce("padding", {
  props: ["padding"],
  render: function(t, r) {
    var e = t.props;
    if (e.dragArea)
      return [];
    var n = Xo(e.padding || {}), a = n.left, i = n.top, o = n.right, s = n.bottom, u = t.getState(), f = u.renderPoses, l = u.pos1, v = u.pos2, c = u.pos3, d = u.pos4, p = [l, v, c, d], g = [];
    return a > 0 && g.push([0, 2]), i > 0 && g.push([0, 1]), o > 0 && g.push([1, 3]), s > 0 && g.push([2, 3]), g.map(function(h, m) {
      var x = R(h, 2), S = x[0], b = x[1], E = p[S], D = p[b], C = f[S], y = f[b], _ = Qn([0, 0], [100, 0], [0, 100], [100, 100], E, D, C, y);
      if (_.length)
        return r.createElement("div", { key: "padding".concat(m), className: K("padding"), style: {
          transform: $e(_, !0)
        } });
    });
  }
}), ci = ["nw", "ne", "se", "sw"];
function we(t, r) {
  var e = t[0] + t[1], n = e > r ? r / e : 1;
  return t[0] *= n, t[1] = r - t[1] * n, t;
}
var ql = [1, 2, 5, 6], jl = [0, 3, 4, 7], mr = [1, -1, -1, 1], xr = [1, 1, -1, -1];
function Da(t, r, e, n, a, i, o, s) {
  a === void 0 && (a = 0), i === void 0 && (i = 0), o === void 0 && (o = e), s === void 0 && (s = n);
  var u = [], f = !1, l = t.filter(function(c) {
    return !c.virtual;
  }), v = l.map(function(c) {
    var d = c.horizontal, p = c.vertical, g = c.pos;
    if (p && !f && (f = !0, u.push("/")), f) {
      var h = Math.max(0, p === 1 ? g[1] - i : s - g[1]);
      return u.push(jt(h, n, r)), h;
    } else {
      var h = Math.max(0, d === 1 ? g[0] - a : o - g[0]);
      return u.push(jt(h, e, r)), h;
    }
  });
  return {
    radiusPoses: l,
    styles: u,
    raws: v
  };
}
function Uo(t) {
  for (var r = [0, 0], e = [0, 0], n = t.length, a = 0; a < n; ++a) {
    var i = t[a];
    i.sub && (i.horizontal && (r[1] === 0 && (r[0] = a), r[1] = a - r[0] + 1, e[0] = a + 1), i.vertical && (e[1] === 0 && (e[0] = a), e[1] = a - e[0] + 1));
  }
  return {
    horizontalRange: r,
    verticalRange: e
  };
}
function $o(t, r, e, n, a, i, o) {
  var s, u, f, l;
  i === void 0 && (i = [0, 0]), o === void 0 && (o = !1);
  var v = t.indexOf("/"), c = (v > -1 ? t.slice(0, v) : t).length, d = t.slice(0, c), p = t.slice(c + 1), g = d.length, h = p.length, m = h > 0, x = R(d, 4), S = x[0], b = S === void 0 ? "0px" : S, E = x[1], D = E === void 0 ? b : E, C = x[2], y = C === void 0 ? b : C, _ = x[3], w = _ === void 0 ? D : _, P = R(p, 4), O = P[0], T = O === void 0 ? b : O, I = P[1], z = I === void 0 ? m ? T : D : I, k = P[2], F = k === void 0 ? m ? T : y : k, A = P[3], W = A === void 0 ? m ? z : w : A, H = [b, D, y, w].map(function(Y) {
    return dt(Y, r);
  }), G = [T, z, F, W].map(function(Y) {
    return dt(Y, e);
  }), V = H.slice(), q = G.slice();
  s = R(we([V[0], V[1]], r), 2), V[0] = s[0], V[1] = s[1], u = R(we([V[3], V[2]], r), 2), V[3] = u[0], V[2] = u[1], f = R(we([q[0], q[3]], e), 2), q[0] = f[0], q[3] = f[1], l = R(we([q[1], q[2]], e), 2), q[1] = l[0], q[2] = l[1];
  var L = o ? V : V.slice(0, Math.max(i[0], g)), j = o ? q : q.slice(0, Math.max(i[1], h));
  return N(N([], R(L.map(function(Y, $) {
    var J = ci[$];
    return {
      virtual: $ >= g,
      horizontal: mr[$],
      vertical: 0,
      pos: [n + Y, a + (xr[$] === -1 ? e : 0)],
      sub: !0,
      raw: H[$],
      direction: J
    };
  })), !1), R(j.map(function(Y, $) {
    var J = ci[$];
    return {
      virtual: $ >= h,
      horizontal: 0,
      vertical: xr[$],
      pos: [n + (mr[$] === -1 ? r : 0), a + Y],
      sub: !0,
      raw: G[$],
      direction: J
    };
  })), !1);
}
function Ul(t, r, e, n, a) {
  a === void 0 && (a = r.length);
  var i = Uo(t.slice(n)), o = i.horizontalRange, s = i.verticalRange, u = e - n, f = 0;
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
function $l(t, r, e, n, a, i, o, s, u, f, l) {
  f === void 0 && (f = 0), l === void 0 && (l = 0);
  var v = Uo(t.slice(e)), c = v.horizontalRange, d = v.verticalRange;
  if (n > -1)
    for (var p = mr[n] === 1 ? i - f : s - i, g = c[1]; g <= n; ++g) {
      var h = xr[g] === 1 ? l : u, m = 0;
      if (n === g ? m = i : g === 0 ? m = f + p : mr[g] === -1 && (m = s - (r[e][0] - f)), t.splice(e + g, 0, {
        horizontal: mr[g],
        vertical: 0,
        pos: [m, h]
      }), r.splice(e + g, 0, [m, h]), g === 0)
        break;
    }
  else if (a > -1) {
    var x = xr[a] === 1 ? o - l : u - o;
    if (c[1] === 0 && d[1] === 0) {
      var S = [
        f + x,
        l
      ];
      t.push({
        horizontal: mr[0],
        vertical: 0,
        pos: S
      }), r.push(S);
    }
    for (var b = d[0], g = d[1]; g <= a; ++g) {
      var m = mr[g] === 1 ? f : s, h = 0;
      if (a === g ? h = o : g === 0 ? h = l + x : xr[g] === 1 ? h = r[e + b][1] : xr[g] === -1 && (h = u - (r[e + b][1] - l)), t.push({
        horizontal: 0,
        vertical: xr[g],
        pos: [m, h]
      }), r.push([m, h]), g === 0)
        break;
    }
  }
}
function Zl(t, r) {
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
var Kl = [
  [0, -1, "n"],
  [1, 0, "e"]
], Jl = [
  [-1, -1, "nw"],
  [0, -1, "n"],
  [1, -1, "ne"],
  [1, 0, "e"],
  [1, 1, "se"],
  [0, 1, "s"],
  [-1, 1, "sw"],
  [-1, 0, "w"]
];
function Ea(t, r, e) {
  var n = t.props.clipRelative, a = t.state, i = a.width, o = a.height, s = r, u = s.type, f = s.poses, l = u === "rect", v = u === "circle";
  if (u === "polygon")
    return e.map(function(D) {
      return "".concat(jt(D[0], i, n), " ").concat(jt(D[1], o, n));
    });
  if (l || u === "inset") {
    var c = e[1][1], d = e[3][0], p = e[7][0], g = e[5][1];
    if (l)
      return [
        c,
        d,
        g,
        p
      ].map(function(D) {
        return "".concat(D, "px");
      });
    var h = [c, i - d, o - g, p].map(function(D, C) {
      return jt(D, C % 2 ? i : o, n);
    });
    if (e.length > 8) {
      var m = R(Q(e[4], e[0]), 2), x = m[0], S = m[1];
      h.push.apply(h, N(["round"], R(Da(f.slice(8).map(function(D, C) {
        return M(M({}, D), { pos: e[C] });
      }), n, x, S, p, c, d, g).styles), !1));
    }
    return h;
  } else if (v || u === "ellipse") {
    var b = e[0], E = jt(B(e[1][1] - b[1]), v ? Math.sqrt((i * i + o * o) / 2) : o, n), h = v ? [E] : [jt(B(e[2][0] - b[0]), i, n), E];
    return h.push("at", jt(b[0], i, n), jt(b[1], o, n)), h;
  }
}
function He(t, r, e, n) {
  var a = [n, (n + r) / 2, r], i = [t, (t + e) / 2, e];
  return Jl.map(function(o) {
    var s = R(o, 3), u = s[0], f = s[1], l = s[2], v = a[u + 1], c = i[f + 1];
    return {
      vertical: B(f),
      horizontal: B(u),
      direction: l,
      pos: [v, c]
    };
  });
}
function Zo(t) {
  var r = [1 / 0, -1 / 0], e = [1 / 0, -1 / 0];
  return t.forEach(function(n) {
    var a = n.pos;
    r[0] = Math.min(r[0], a[0]), r[1] = Math.max(r[1], a[0]), e[0] = Math.min(e[0], a[1]), e[1] = Math.max(e[1], a[1]);
  }), [
    B(r[1] - r[0]),
    B(e[1] - e[0])
  ];
}
function vi(t, r, e, n, a) {
  var i, o, s, u, f, l, v, c, d;
  if (t) {
    var p = a;
    if (!p) {
      var g = Nt(t), h = g("clipPath");
      p = h !== "none" ? h : g("clip");
    }
    if (!((!p || p === "none" || p === "auto") && (p = n, !p))) {
      var m = zi(p), x = m.prefix, S = x === void 0 ? p : x, b = m.value, E = b === void 0 ? "" : b, D = S === "circle", C = " ";
      if (S === "polygon") {
        var y = Sr(E || "0% 0%, 100% 0%, 100% 100%, 0% 100%");
        C = ",";
        var _ = y.map(function(Mt) {
          var It = R(Mt.split(" "), 2), Tt = It[0], bt = It[1];
          return {
            vertical: 1,
            horizontal: 1,
            pos: [
              dt(Tt, r),
              dt(bt, e)
            ]
          };
        }), w = yr(_.map(function(Mt) {
          return Mt.pos;
        }));
        return {
          type: S,
          clipText: p,
          poses: _,
          splitter: C,
          left: w.minX,
          right: w.maxX,
          top: w.minY,
          bottom: w.maxY
        };
      } else if (D || S === "ellipse") {
        var P = "", O = "", T = 0, I = 0, y = cr(E);
        if (D) {
          var z = "";
          i = R(y, 4), o = i[0], z = o === void 0 ? "50%" : o, s = i[2], P = s === void 0 ? "50%" : s, u = i[3], O = u === void 0 ? "50%" : u, T = dt(z, Math.sqrt((r * r + e * e) / 2)), I = T;
        } else {
          var k = "", F = "";
          f = R(y, 5), l = f[0], k = l === void 0 ? "50%" : l, v = f[1], F = v === void 0 ? "50%" : v, c = f[3], P = c === void 0 ? "50%" : c, d = f[4], O = d === void 0 ? "50%" : d, T = dt(k, r), I = dt(F, e);
        }
        var A = [
          dt(P, r),
          dt(O, e)
        ], _ = N([
          {
            vertical: 1,
            horizontal: 1,
            pos: A,
            direction: "nesw"
          }
        ], R(Kl.slice(0, D ? 1 : 2).map(function(Tt) {
          return {
            vertical: B(Tt[1]),
            horizontal: Tt[0],
            direction: Tt[2],
            sub: !0,
            pos: [
              A[0] + Tt[0] * T,
              A[1] + Tt[1] * I
            ]
          };
        })), !1);
        return {
          type: S,
          clipText: p,
          radiusX: T,
          radiusY: I,
          left: A[0] - T,
          top: A[1] - I,
          right: A[0] + T,
          bottom: A[1] + I,
          poses: _,
          splitter: C
        };
      } else if (S === "inset") {
        var y = cr(E || "0 0 0 0"), W = y.indexOf("round"), H = (W > -1 ? y.slice(0, W) : y).length, G = y.slice(H + 1), V = R(y.slice(0, H), 4), q = V[0], L = V[1], j = L === void 0 ? q : L, Y = V[2], $ = Y === void 0 ? q : Y, J = V[3], at = J === void 0 ? j : J, st = R([q, $].map(function(Tt) {
          return dt(Tt, e);
        }), 2), X = st[0], Z = st[1], ft = R([at, j].map(function(Tt) {
          return dt(Tt, r);
        }), 2), rt = ft[0], et = ft[1], ot = r - et, vt = e - Z, gt = $o(G, ot - rt, vt - X, rt, X), _ = N(N([], R(He(X, ot, vt, rt)), !1), R(gt), !1);
        return {
          type: "inset",
          clipText: p,
          poses: _,
          top: X,
          left: rt,
          right: ot,
          bottom: vt,
          radius: G,
          splitter: C
        };
      } else if (S === "rect") {
        var y = Sr(E || "0px, ".concat(r, "px, ").concat(e, "px, 0px"));
        C = ",";
        var it = R(y.map(function(ir) {
          var or = se(ir).value;
          return or;
        }), 4), lt = it[0], et = it[1], Z = it[2], rt = it[3], _ = He(lt, et, Z, rt);
        return {
          type: "rect",
          clipText: p,
          poses: _,
          top: lt,
          right: et,
          bottom: Z,
          left: rt,
          values: y,
          splitter: C
        };
      }
    }
  }
}
function Ql(t, r, e, n, a) {
  var i = t[r], o = i.direction, s = i.sub, u = t.map(function() {
    return [0, 0];
  }), f = o ? o.split("") : [];
  if (n && r < 8) {
    var l = f.filter(function(T) {
      return T === "w" || T === "e";
    }), v = f.filter(function(T) {
      return T === "n" || T === "s";
    }), c = l[0], d = v[0];
    u[r] = e;
    var p = R(Zo(t), 2), g = p[0], h = p[1], m = g && h ? g / h : 0;
    if (m && a) {
      var x = (r + 4) % 8, S = t[x].pos, b = [0, 0];
      o.indexOf("w") > -1 ? b[0] = -1 : o.indexOf("e") > -1 && (b[0] = 1), o.indexOf("n") > -1 ? b[1] = -1 : o.indexOf("s") > -1 && (b[1] = 1);
      var E = Ho([g, h], e, m, b, !0), D = g + E[0], C = h + E[1], y = S[1], _ = S[1], w = S[0], P = S[0];
      b[0] === -1 ? w = P - D : b[0] === 1 ? P = w + D : (w = w - D / 2, P = P + D / 2), b[1] === -1 ? y = _ - C : (b[1] === 1 || (y = _ - C / 2), _ = y + C);
      var O = He(y, P, _, w);
      t.forEach(function(T, I) {
        u[I][0] = O[I].pos[0] - T.pos[0], u[I][1] = O[I].pos[1] - T.pos[1];
      });
    } else
      t.forEach(function(T, I) {
        var z = T.direction;
        z && (z.indexOf(c) > -1 && (u[I][0] = e[0]), z.indexOf(d) > -1 && (u[I][1] = e[1]));
      }), c && (u[1][0] = e[0] / 2, u[5][0] = e[0] / 2), d && (u[3][1] = e[1] / 2, u[7][1] = e[1] / 2);
  } else o && !s ? f.forEach(function(T) {
    var I = T === "n" || T === "s";
    t.forEach(function(z, k) {
      var F = z.direction, A = z.horizontal, W = z.vertical;
      !F || F.indexOf(T) === -1 || (u[k] = [
        I || !A ? 0 : e[0],
        !I || !W ? 0 : e[1]
      ]);
    });
  }) : u[r] = e;
  return u;
}
function tc(t, r) {
  var e = R(Qi(t, r), 2), n = e[0], a = e[1], i = r.datas, o = i.clipPath, s = i.clipIndex, u = o, f = u.type, l = u.poses, v = u.splitter, c = l.map(function(x) {
    return x.pos;
  });
  if (f === "polygon")
    c.splice(s, 0, [n, a]);
  else if (f === "inset") {
    var d = ql.indexOf(s), p = jl.indexOf(s), g = l.length;
    if ($l(l, c, 8, d, p, n, a, c[4][0], c[4][1], c[0][0], c[0][1]), g === l.length)
      return;
  } else
    return;
  var h = Ea(t, o, c), m = "".concat(f, "(").concat(h.join(v), ")");
  U(t, "onClip", nt(t, r, M({ clipEventType: "added", clipType: f, poses: c, clipStyles: h, clipStyle: m, distX: 0, distY: 0 }, At({
    clipPath: m
  }, r))));
}
function rc(t, r) {
  var e = r.datas, n = e.clipPath, a = e.clipIndex, i = n, o = i.type, s = i.poses, u = i.splitter, f = s.map(function(d) {
    return d.pos;
  }), l = f.length;
  if (o === "polygon")
    s.splice(a, 1), f.splice(a, 1);
  else if (o === "inset") {
    if (a < 8 || (Ul(s, f, a, 8, l), l === s.length))
      return;
  } else
    return;
  var v = Ea(t, n, f), c = "".concat(o, "(").concat(v.join(u), ")");
  U(t, "onClip", nt(t, r, M({ clipEventType: "removed", clipType: o, poses: f, clipStyles: v, clipStyle: c, distX: 0, distY: 0 }, At({
    clipPath: c
  }, r))));
}
var ec = {
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
    var e = t.props, n = e.customClipPath, a = e.defaultClipPath, i = e.clipArea, o = e.zoom, s = e.groupable, u = t.getState(), f = u.target, l = u.width, v = u.height, c = u.allMatrix, d = u.is3d, p = u.left, g = u.top, h = u.pos1, m = u.pos2, x = u.pos3, S = u.pos4, b = u.clipPathState, E = u.snapBoundInfos, D = u.rotation;
    if (!f || s)
      return [];
    var C = vi(f, l, v, a || "inset", b || n);
    if (!C)
      return [];
    var y = d ? 4 : 3, _ = C.type, w = C.poses, P = w.map(function(et) {
      var ot = xt(c, et.pos, y);
      return [
        ot[0] - p,
        ot[1] - g
      ];
    }), O = [], T = [], I = _ === "rect", z = _ === "inset", k = _ === "polygon";
    if (I || z || k) {
      var F = z ? P.slice(0, 8) : P;
      T = F.map(function(et, ot) {
        var vt = ot === 0 ? F[F.length - 1] : F[ot - 1], gt = St(vt, et), it = Io(vt, et);
        return r.createElement("div", { key: "clipLine".concat(ot), className: K("line", "clip-line", "snap-control"), "data-clip-index": ot, style: {
          width: "".concat(it, "px"),
          transform: "translate(".concat(vt[0], "px, ").concat(vt[1], "px) rotate(").concat(gt, "rad) scaleY(").concat(o, ")")
        } });
      });
    }
    if (O = P.map(function(et, ot) {
      return r.createElement("div", { key: "clipControl".concat(ot), className: K("control", "clip-control", "snap-control"), "data-clip-index": ot, style: {
        transform: "translate(".concat(et[0], "px, ").concat(et[1], "px) rotate(").concat(D, "rad) scale(").concat(o, ")")
      } });
    }), z && O.push.apply(O, N([], R(P.slice(8).map(function(et, ot) {
      return r.createElement("div", { key: "clipRadiusControl".concat(ot), className: K("control", "clip-control", "clip-radius", "snap-control"), "data-clip-index": 8 + ot, style: {
        transform: "translate(".concat(et[0], "px, ").concat(et[1], "px) rotate(").concat(D, "rad) scale(").concat(o, ")")
      } });
    })), !1)), _ === "circle" || _ === "ellipse") {
      var A = C.left, W = C.top, H = C.radiusX, G = C.radiusY, V = R(Q(xt(c, [A, W], y), xt(c, [0, 0], y)), 2), q = V[0], L = V[1], j = "none";
      if (!i) {
        for (var Y = Math.max(10, H / 5, G / 5), $ = [], J = 0; J <= Y; ++J) {
          var at = Math.PI * 2 / Y * J;
          $.push([
            H + (H - o) * Math.cos(at),
            G + (G - o) * Math.sin(at)
          ]);
        }
        $.push([H, -2]), $.push([-2, -2]), $.push([-2, G * 2 + 2]), $.push([H * 2 + 2, G * 2 + 2]), $.push([H * 2 + 2, -2]), $.push([H, -2]), j = "polygon(".concat($.map(function(et) {
          return "".concat(et[0], "px ").concat(et[1], "px");
        }).join(", "), ")");
      }
      O.push(r.createElement("div", { key: "clipEllipse", className: K("clip-ellipse", "snap-control"), style: {
        width: "".concat(H * 2, "px"),
        height: "".concat(G * 2, "px"),
        clipPath: j,
        transform: "translate(".concat(-p + q, "px, ").concat(-g + L, "px) ").concat($e(c))
      } }));
    }
    if (i) {
      var st = Xt(N([h, m, x, S], R(P), !1)), X = st.width, Z = st.height, ft = st.left, rt = st.top;
      if (k || I || z) {
        var $ = z ? P.slice(0, 8) : P;
        O.push(r.createElement("div", { key: "clipArea", className: K("clip-area", "snap-control"), style: {
          width: "".concat(X, "px"),
          height: "".concat(Z, "px"),
          transform: "translate(".concat(ft, "px, ").concat(rt, "px)"),
          clipPath: "polygon(".concat($.map(function(ot) {
            return "".concat(ot[0] - ft, "px ").concat(ot[1] - rt, "px");
          }).join(", "), ")")
        } }));
      }
    }
    return E && ["vertical", "horizontal"].forEach(function(et) {
      var ot = E[et], vt = et === "horizontal";
      ot.isSnap && T.push.apply(T, N([], R(ot.snap.posInfos.map(function(gt, it) {
        var lt = gt.pos, Mt = Q(xt(c, vt ? [0, lt] : [lt, 0], y), [p, g]), It = Q(xt(c, vt ? [l, lt] : [lt, v], y), [p, g]);
        return ie(r, "", Mt, It, o, "clip".concat(et, "snap").concat(it), "guideline");
      })), !1)), ot.isBound && T.push.apply(T, N([], R(ot.bounds.map(function(gt, it) {
        var lt = gt.pos, Mt = Q(xt(c, vt ? [0, lt] : [lt, 0], y), [p, g]), It = Q(xt(c, vt ? [l, lt] : [lt, v], y), [p, g]);
        return ie(r, "", Mt, It, o, "clip".concat(et, "bounds").concat(it), "guideline", "bounds", "bold");
      })), !1));
    }), N(N([], R(O), !1), R(T), !1);
  },
  dragControlCondition: function(t, r) {
    return r.inputEvent && (r.inputEvent.target.getAttribute("class") || "").indexOf("clip") > -1;
  },
  dragStart: function(t, r) {
    var e = t.props, n = e.dragWithClip, a = n === void 0 ? !0 : n;
    return a ? !1 : this.dragControlStart(t, r);
  },
  drag: function(t, r) {
    return this.dragControl(t, M(M({}, r), { isDragTarget: !0 }));
  },
  dragEnd: function(t, r) {
    return this.dragControlEnd(t, r);
  },
  dragControlStart: function(t, r) {
    var e = t.state, n = t.props, a = n.defaultClipPath, i = n.customClipPath, o = e.target, s = e.width, u = e.height, f = r.inputEvent ? r.inputEvent.target : null, l = f && f.getAttribute("class") || "", v = r.datas, c = vi(o, s, u, a || "inset", i);
    if (!c)
      return !1;
    var d = c.clipText, p = c.type, g = c.poses, h = U(t, "onClipStart", nt(t, r, {
      clipType: p,
      clipStyle: d,
      poses: g.map(function(m) {
        return m.pos;
      })
    }));
    return h === !1 ? (v.isClipStart = !1, !1) : (v.isControl = l && l.indexOf("clip-control") > -1, v.isLine = l.indexOf("clip-line") > -1, v.isArea = l.indexOf("clip-area") > -1 || l.indexOf("clip-ellipse") > -1, v.clipIndex = f ? parseInt(f.getAttribute("data-clip-index"), 10) : -1, v.clipPath = c, v.isClipStart = !0, e.clipPathState = d, _r(t, r), !0);
  },
  dragControl: function(t, r) {
    var e, n, a, i = r.datas, o = r.originalDatas, s = r.isDragTarget;
    if (!i.isClipStart)
      return !1;
    var u = i, f = u.isControl, l = u.isLine, v = u.isArea, c = u.clipIndex, d = u.clipPath;
    if (!d)
      return !1;
    var p = Cr(t.props, "clippable"), g = p.keepRatio, h = 0, m = 0, x = o.draggable, S = tr(r);
    s && x ? (e = R(x.prevBeforeDist, 2), h = e[0], m = e[1]) : (n = R(S, 2), h = n[0], m = n[1]);
    var b = [h, m], E = t.state, D = E.width, C = E.height, y = !v && !f && !l, _ = d.type, w = d.poses, P = d.splitter, O = w.map(function(ht) {
      return ht.pos;
    });
    y && (h = -h, m = -m);
    var T = !f || w[c].direction === "nesw", I = _ === "inset" || _ === "rect", z = w.map(function() {
      return [0, 0];
    });
    if (f && !T) {
      var k = w[c], F = k.horizontal, A = k.vertical, W = [
        h * B(F),
        m * B(A)
      ];
      z = Ql(w, c, W, I, g);
    } else T && (z = O.map(function() {
      return [h, m];
    }));
    var H = O.map(function(ht, zt) {
      return ut(ht, z[zt]);
    }), G = N([], R(H), !1);
    E.snapBoundInfos = null;
    var V = d.type === "circle", q = d.type === "ellipse";
    if (V || q) {
      var L = Xt(H), j = B(L.bottom - L.top), Y = B(q ? L.right - L.left : j), $ = H[0][1] + j, J = H[0][0] - Y, at = H[0][0] + Y;
      V && (G.push([at, L.bottom]), z.push([1, 0])), G.push([L.left, $]), z.push([0, 1]), G.push([J, L.bottom]), z.push([1, 0]);
    }
    var st = Mo((p.clipHorizontalGuidelines || []).map(function(ht) {
      return dt("".concat(ht), C);
    }), (p.clipVerticalGuidelines || []).map(function(ht) {
      return dt("".concat(ht), D);
    }), D, C), X = [], Z = [];
    if (V || q)
      X = [G[4][0], G[2][0]], Z = [G[1][1], G[3][1]];
    else if (I) {
      var ft = [G[0], G[2], G[4], G[6]], rt = [z[0], z[2], z[4], z[6]];
      X = ft.filter(function(ht, zt) {
        return rt[zt][0];
      }).map(function(ht) {
        return ht[0];
      }), Z = ft.filter(function(ht, zt) {
        return rt[zt][1];
      }).map(function(ht) {
        return ht[1];
      });
    } else
      X = G.filter(function(ht, zt) {
        return z[zt][0];
      }).map(function(ht) {
        return ht[0];
      }), Z = G.filter(function(ht, zt) {
        return z[zt][1];
      }).map(function(ht) {
        return ht[1];
      });
    var et = [0, 0], ot = Za(st, p.clipTargetBounds && { left: 0, top: 0, right: D, bottom: C }, X, Z, 5, 5), vt = ot.horizontal, gt = ot.vertical, it = vt.offset, lt = gt.offset;
    if (vt.isBound && (et[1] += it), gt.isBound && (et[0] += lt), (q || V) && z[0][0] === 0 && z[0][1] === 0) {
      var L = Xt(H), Mt = L.bottom - L.top, It = q ? L.right - L.left : Mt, Tt = gt.isBound ? B(lt) : gt.snapIndex === 0 ? -lt : lt, bt = vt.isBound ? B(it) : vt.snapIndex === 0 ? -it : it;
      It -= Tt, Mt -= bt, V && (Mt = xo(gt, vt) > 0 ? Mt : It, It = Mt);
      var yt = G[0];
      G[1][1] = yt[1] - Mt, G[2][0] = yt[0] + It, G[3][1] = yt[1] + Mt, G[4][0] = yt[0] - It;
    } else if (I && g && f) {
      var ir = R(Zo(w), 2), or = ir[0], _a = ir[1], Ma = or && _a ? or / _a : 0, us = w[c], pe = us.direction || "", Ke = G[1][1], $ = G[5][1], J = G[7][0], at = G[3][0];
      B(it) <= B(lt) ? it = Bt(it) * B(lt) / Ma : lt = Bt(lt) * B(it) * Ma, pe.indexOf("w") > -1 ? J -= lt : pe.indexOf("e") > -1 ? at -= lt : (J += lt / 2, at -= lt / 2), pe.indexOf("n") > -1 ? Ke -= it : pe.indexOf("s") > -1 ? $ -= it : (Ke += it / 2, $ -= it / 2);
      var fs = He(Ke, at, $, J);
      G.forEach(function(Ta, ds) {
        var tn;
        tn = R(fs[ds].pos, 2), Ta[0] = tn[0], Ta[1] = tn[1];
      });
    } else
      G.forEach(function(ht, zt) {
        var Ra = z[zt];
        Ra[0] && (ht[0] -= lt), Ra[1] && (ht[1] -= it);
      });
    var wa = Ea(t, d, H), Je = "".concat(_, "(").concat(wa.join(P), ")");
    if (E.clipPathState = Je, V || q)
      X = [G[4][0], G[2][0]], Z = [G[1][1], G[3][1]];
    else if (I) {
      var ft = [G[0], G[2], G[4], G[6]];
      X = ft.map(function(zt) {
        return zt[0];
      }), Z = ft.map(function(zt) {
        return zt[1];
      });
    } else
      X = G.map(function(ht) {
        return ht[0];
      }), Z = G.map(function(ht) {
        return ht[1];
      });
    if (E.snapBoundInfos = Za(st, p.clipTargetBounds && { left: 0, top: 0, right: D, bottom: C }, X, Z, 1, 1), x) {
      var ls = E.is3d, cs = E.allMatrix, vs = ls ? 4 : 3, Qe = et;
      s && (Qe = [
        b[0] + et[0] - S[0],
        b[1] + et[1] - S[1]
      ]), x.deltaOffset = pt(cs, [Qe[0], Qe[1], 0, 0], vs);
    }
    return U(t, "onClip", nt(t, r, M({ clipEventType: "changed", clipType: _, poses: H, clipStyle: Je, clipStyles: wa, distX: h, distY: m }, At((a = {}, a[_ === "rect" ? "clip" : "clipPath"] = Je, a), r)))), !0;
  },
  dragControlEnd: function(t, r) {
    this.unset(t);
    var e = r.isDrag, n = r.datas, a = r.isDouble, i = n.isLine, o = n.isClipStart, s = n.isControl;
    return o ? (U(t, "onClipEnd", Lt(t, r, {})), a && (s ? rc(t, r) : i && tc(t, r)), a || e) : !1;
  },
  unset: function(t) {
    t.state.clipPathState = "", t.state.snapBoundInfos = null;
  }
}, nc = {
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
    return r.isRequest ? r.requestAble === "originDraggable" : Ct(r.inputEvent.target, K("origin"));
  },
  dragControlStart: function(t, r) {
    var e = r.datas;
    _r(t, r);
    var n = nt(t, r, {
      dragStart: Gt.dragStart(t, new kr().dragStart([0, 0], r))
    }), a = U(t, "onDragOriginStart", n);
    return e.startOrigin = t.state.transformOrigin, e.startTargetOrigin = t.state.targetOrigin, e.prevOrigin = [0, 0], e.isDragOrigin = !0, a === !1 ? (e.isDragOrigin = !1, !1) : n;
  },
  dragControl: function(t, r) {
    var e = r.datas, n = r.isPinch, a = r.isRequest;
    if (!e.isDragOrigin)
      return !1;
    var i = R(tr(r), 2), o = i[0], s = i[1], u = t.state, f = u.width, l = u.height, v = u.offsetMatrix, c = u.targetMatrix, d = u.is3d, p = t.props.originRelative, g = p === void 0 ? !0 : p, h = d ? 4 : 3, m = [o, s];
    if (a) {
      var x = r.distOrigin;
      (x[0] || x[1]) && (m = x);
    }
    var S = ut(e.startOrigin, m), b = ut(e.startTargetOrigin, m), E = Q(m, e.prevOrigin), D = de(v, c, S, h), C = t.getRect(), y = Xt(Mr(D, f, l, h)), _ = [
      C.left - y.left,
      C.top - y.top
    ];
    e.prevOrigin = m;
    var w = [
      jt(b[0], f, g),
      jt(b[1], l, g)
    ].join(" "), P = Gt.drag(t, ve(r, t.state, _, !!n)), O = nt(t, r, M(M({ width: f, height: l, origin: S, dist: m, delta: E, transformOrigin: w, drag: P }, At({
      transformOrigin: w,
      transform: P.transform
    }, r)), { afterTransform: P.transform }));
    return U(t, "onDragOrigin", O), O;
  },
  dragControlEnd: function(t, r) {
    var e = r.datas;
    return e.isDragOrigin ? (U(t, "onDragOriginEnd", Lt(t, r, {})), !0) : !1;
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
function ac(t, r, e, n) {
  var a = t.filter(function(u) {
    var f = u.virtual, l = u.horizontal;
    return l && !f;
  }).length, i = t.filter(function(u) {
    var f = u.virtual, l = u.vertical;
    return l && !f;
  }).length, o = -1;
  if (r === 0 && (a === 0 ? o = 0 : a === 1 && (o = 1)), r === 2 && (a <= 2 ? o = 2 : a <= 3 && (o = 3)), r === 3 && (i === 0 ? o = 4 : i < 4 && (o = 7)), r === 1 && (i <= 1 ? o = 5 : i <= 2 && (o = 6)), !(o === -1 || !t[o].virtual)) {
    var s = t[o];
    ic(t, o), o < 4 ? s.pos[0] = e : s.pos[1] = n;
  }
}
function ic(t, r) {
  r < 4 ? t.slice(0, r + 1).forEach(function(e) {
    e.virtual = !1;
  }) : (t[0].virtual && (t[0].virtual = !1), t.slice(4, r + 1).forEach(function(e) {
    e.virtual = !1;
  }));
}
function oc(t, r) {
  r < 4 ? t.slice(r, 4).forEach(function(e) {
    e.virtual = !0;
  }) : t.slice(r).forEach(function(e) {
    e.virtual = !0;
  });
}
function di(t, r, e, n, a) {
  n === void 0 && (n = [0, 0]);
  var i = [];
  return !t || t === "0px" ? i = [] : i = cr(t), $o(i, r, e, 0, 0, n, a);
}
function pi(t, r, e, n, a) {
  var i = t.state, o = i.width, s = i.height, u = Da(a, t.props.roundRelative, o, s), f = u.raws, l = u.styles, v = u.radiusPoses, c = Zl(v, f), d = c.horizontals, p = c.verticals, g = l.join(" ");
  i.borderRadiusState = g;
  var h = nt(t, r, M({ horizontals: d, verticals: p, borderRadius: g, width: o, height: s, delta: n, dist: e }, At({
    borderRadius: g
  }, r)));
  return U(t, "onRound", h), h;
}
function gi(t) {
  var r, e, n = t.getState().style, a = n.borderRadius || "";
  if (!a && t.props.groupable) {
    var i = t.moveables[0], o = t.getTargets()[0];
    o && (i?.props.target === o ? (a = (e = (r = t.moveables[0]) === null || r === void 0 ? void 0 : r.state.style.borderRadius) !== null && e !== void 0 ? e : "", n.borderRadius = a) : (a = ha(o).borderRadius, n.borderRadius = a));
  }
  return a;
}
var sc = {
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
    return r === !0 || r === "line" ? K("round-line-clickable") : "";
  },
  requestStyle: function() {
    return ["borderRadius"];
  },
  requestChildStyle: function() {
    return ["borderRadius"];
  },
  render: function(t, r) {
    var e = t.getState(), n = e.target, a = e.width, i = e.height, o = e.allMatrix, s = e.is3d, u = e.left, f = e.top, l = e.borderRadiusState, v = t.props, c = v.minRoundControls, d = c === void 0 ? [0, 0] : c, p = v.maxRoundControls, g = p === void 0 ? [4, 4] : p, h = v.zoom, m = v.roundPadding, x = m === void 0 ? 0 : m, S = v.isDisplayShadowRoundControls, b = v.groupable;
    if (!n)
      return null;
    var E = l || gi(t), D = s ? 4 : 3, C = di(E, a, i, d, !0);
    if (!C)
      return null;
    var y = 0, _ = 0, w = b ? [0, 0] : [u, f];
    return C.map(function(P, O) {
      var T = P.horizontal, I = P.vertical, z = P.direction || "", k = N([], R(P.pos), !1);
      _ += Math.abs(T), y += Math.abs(I), T && z.indexOf("n") > -1 && (k[1] -= x), I && z.indexOf("w") > -1 && (k[0] -= x), T && z.indexOf("s") > -1 && (k[1] += x), I && z.indexOf("e") > -1 && (k[0] += x);
      var F = Q(xt(o, k, D), w), A = S && S !== "horizontal", W = P.vertical ? y <= g[1] && (A || !P.virtual) : _ <= g[0] && (S || !P.virtual);
      return r.createElement("div", { key: "borderRadiusControl".concat(O), className: K("control", "border-radius", P.vertical ? "vertical" : "", P.virtual ? "virtual" : ""), "data-radius-index": O, style: {
        display: W ? "block" : "none",
        transform: "translate(".concat(F[0], "px, ").concat(F[1], "px) scale(").concat(h, ")")
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
    var v = nt(t, r, {}), c = U(t, "onRoundStart", v);
    if (c === !1)
      return !1;
    n.lineIndex = f, n.controlIndex = u, n.isControl = o, n.isLine = s, _r(t, r);
    var d = t.props, p = d.roundRelative, g = d.minRoundControls, h = g === void 0 ? [0, 0] : g, m = t.state, x = m.width, S = m.height;
    n.isRound = !0, n.prevDist = [0, 0];
    var b = gi(t), E = di(b || "", x, S, h, !0) || [];
    return n.controlPoses = E, m.borderRadiusState = Da(E, p, x, S).styles.join(" "), v;
  },
  dragControl: function(t, r) {
    var e = r.datas, n = e.controlPoses;
    if (!e.isRound || !e.isControl || !n.length)
      return !1;
    var a = e.controlIndex, i = R(tr(r), 2), o = i[0], s = i[1], u = [o, s], f = Q(u, e.prevDist), l = t.props.maxRoundControls, v = l === void 0 ? [4, 4] : l, c = t.state, d = c.width, p = c.height, g = n[a], h = g.vertical, m = g.horizontal, x = n.map(function(b) {
      var E = b.horizontal, D = b.vertical, C = [
        E * m * u[0],
        D * h * u[1]
      ];
      if (E) {
        if (v[0] === 1)
          return C;
        if (v[0] < 4 && E !== m)
          return C;
      } else {
        if (v[1] === 0)
          return C[1] = D * m * u[0] / d * p, C;
        if (h) {
          if (v[1] === 1)
            return C;
          if (v[1] < 4 && D !== h)
            return C;
        }
      }
      return [0, 0];
    });
    x[a] = u;
    var S = n.map(function(b, E) {
      return M(M({}, b), { pos: ut(b.pos, x[E]) });
    });
    return a < 4 ? S.slice(0, a + 1).forEach(function(b) {
      b.virtual = !1;
    }) : S.slice(4, a + 1).forEach(function(b) {
      b.virtual = !1;
    }), e.prevDist = [o, s], pi(t, r, u, f, S);
  },
  dragControlEnd: function(t, r) {
    var e = t.state;
    e.borderRadiusState = "";
    var n = r.datas, a = r.isDouble;
    if (!n.isRound)
      return !1;
    var i = n.isControl, o = n.controlIndex, s = n.isLine, u = n.lineIndex, f = n.controlPoses, l = f.filter(function(m) {
      var x = m.virtual;
      return x;
    }).length, v = t.props.roundClickable, c = v === void 0 ? !0 : v;
    if (a && c) {
      if (i && (c === !0 || c === "control"))
        oc(f, o);
      else if (s && (c === !0 || c === "line")) {
        var d = R(Qi(t, r), 2), p = d[0], g = d[1];
        ac(f, u, p, g);
      }
      l !== f.filter(function(m) {
        var x = m.virtual;
        return x;
      }).length && pi(t, r, [0, 0], [0, 0], f);
    }
    var h = Lt(t, r, {});
    return U(t, "onRoundEnd", h), e.borderRadiusState = "", h;
  },
  dragGroupControlStart: function(t, r) {
    var e = this.dragControlStart(t, r);
    if (!e)
      return !1;
    var n = t.moveables, a = t.props.targets, i = $t(t, "roundable", r), o = M({ targets: t.props.targets, events: i.map(function(s, u) {
      return M(M({}, s), { target: a[u], moveable: n[u], currentTarget: n[u] });
    }) }, e);
    return U(t, "onRoundGroupStart", o), e;
  },
  dragGroupControl: function(t, r) {
    var e = this.dragControl(t, r);
    if (!e)
      return !1;
    var n = t.moveables, a = t.props.targets, i = $t(t, "roundable", r), o = M({ targets: t.props.targets, events: i.map(function(s, u) {
      return M(M(M({}, s), { target: a[u], moveable: n[u], currentTarget: n[u] }), At({
        borderRadius: e.borderRadius
      }, s));
    }) }, e);
    return U(t, "onRoundGroup", o), o;
  },
  dragGroupControlEnd: function(t, r) {
    var e = t.moveables, n = t.props.targets, a = $t(t, "roundable", r);
    Ze(t, "onRound", function(s) {
      var u = M({ targets: t.props.targets, events: a.map(function(f, l) {
        return M(M(M({}, f), { target: n[l], moveable: e[l], currentTarget: e[l] }), At({
          borderRadius: s.borderRadius
        }, f));
      }) }, s);
      U(t, "onRoundGroup", u);
    });
    var i = this.dragControlEnd(t, r);
    if (!i)
      return !1;
    var o = M({ targets: t.props.targets, events: a.map(function(s, u) {
      var f;
      return M(M({}, s), { target: n[u], moveable: e[u], currentTarget: e[u], lastEvent: (f = s.datas) === null || f === void 0 ? void 0 : f.lastEvent });
    }) }, i);
    return U(t, "onRoundGroupEnd", o), o;
  },
  unset: function(t) {
    t.state.borderRadiusState = "";
  }
};
function uc(t, r) {
  var e = r ? 4 : 3, n = mt(e), a = "matrix".concat(r ? "3d" : "", "(").concat(n.join(","), ")");
  return t === a || t === "matrix(1,0,0,1,0,0)";
}
var Ko = {
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
    var e = t.state, n = e.is3d, a = e.targetMatrix, i = e.inlineTransform, o = n ? "matrix3d(".concat(a.join(","), ")") : "matrix(".concat(Hi(a, !0), ")"), s = !i || i === "none" ? o : i;
    r.datas.startTransforms = uc(s, n) ? [] : cr(s);
  },
  resetStyle: function(t) {
    var r = t.datas;
    r.nextStyle = {}, r.nextTransforms = t.datas.startTransforms, r.nextTransformAppendedIndexes = [];
  },
  fillDragStartParams: function(t, r) {
    return nt(t, r, {
      setTransform: function(e) {
        r.datas.startTransforms = wt(e) ? e : cr(e);
      },
      isPinch: !!r.isPinch
    });
  },
  fillDragParams: function(t, r) {
    return nt(t, r, {
      isPinch: !!r.isPinch
    });
  },
  dragStart: function(t, r) {
    this.setTransform(t, r), this.resetStyle(r), U(t, "onBeforeRenderStart", this.fillDragStartParams(t, r));
  },
  drag: function(t, r) {
    r.datas.startTransforms || this.setTransform(t, r), this.resetStyle(r), U(t, "onBeforeRender", nt(t, r, {
      isPinch: !!r.isPinch
    }));
  },
  dragEnd: function(t, r) {
    r.datas.startTransforms || (this.setTransform(t, r), this.resetStyle(r)), U(t, "onBeforeRenderEnd", nt(t, r, {
      isPinch: !!r.isPinch,
      isDrag: r.isDrag
    }));
  },
  dragGroupStart: function(t, r) {
    var e = this;
    this.dragStart(t, r);
    var n = $t(t, "beforeRenderable", r), a = t.moveables, i = n.map(function(o, s) {
      var u = a[s];
      return e.setTransform(u, o), e.resetStyle(o), e.fillDragStartParams(u, o);
    });
    U(t, "onBeforeRenderGroupStart", nt(t, r, {
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
    var n = $t(t, "beforeRenderable", r), a = t.moveables, i = n.map(function(o, s) {
      var u = a[s];
      return e.resetStyle(o), e.fillDragParams(u, o);
    });
    U(t, "onBeforeRenderGroup", nt(t, r, {
      isPinch: !!r.isPinch,
      targets: t.props.targets,
      events: i
    }));
  },
  dragGroupEnd: function(t, r) {
    this.dragEnd(t, r), U(t, "onBeforeRenderGroupEnd", nt(t, r, {
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
}, Jo = {
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
    U(t, "onRenderStart", nt(t, r, {
      isPinch: !!r.isPinch
    }));
  },
  drag: function(t, r) {
    U(t, "onRender", this.fillDragParams(t, r));
  },
  dragAfter: function(t, r) {
    return this.drag(t, r);
  },
  dragEnd: function(t, r) {
    U(t, "onRenderEnd", this.fillDragEndParams(t, r));
  },
  dragGroupStart: function(t, r) {
    U(t, "onRenderGroupStart", nt(t, r, {
      isPinch: !!r.isPinch,
      targets: t.props.targets
    }));
  },
  dragGroup: function(t, r) {
    var e = this, n = $t(t, "beforeRenderable", r), a = t.moveables, i = n.map(function(o, s) {
      var u = a[s];
      return e.fillDragParams(u, o);
    });
    U(t, "onRenderGroup", nt(t, r, M(M({ isPinch: !!r.isPinch, targets: t.props.targets, transform: De(r), transformObject: {} }, At(Ee(r))), { events: i })));
  },
  dragGroupEnd: function(t, r) {
    var e = this, n = $t(t, "beforeRenderable", r), a = t.moveables, i = n.map(function(o, s) {
      var u = a[s];
      return e.fillDragEndParams(u, o);
    });
    U(t, "onRenderGroupEnd", nt(t, r, M({ isPinch: !!r.isPinch, isDrag: r.isDrag, targets: t.props.targets, events: i, transformObject: {}, transform: De(r) }, At(Ee(r)))));
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
    return Ar(Ge(r) || []).forEach(function(n) {
      e[n.name] = n.functionValue;
    }), nt(t, r, M({ isPinch: !!r.isPinch, transformObject: e, transform: De(r) }, At(Ee(r))));
  },
  fillDragEndParams: function(t, r) {
    var e = {};
    return Ar(Ge(r) || []).forEach(function(n) {
      e[n.name] = n.functionValue;
    }), nt(t, r, M({ isPinch: !!r.isPinch, isDrag: r.isDrag, transformObject: e, transform: De(r) }, At(Ee(r))));
  }
};
function te(t, r, e, n, a, i, o) {
  i.clientDistX = i.distX, i.clientDistY = i.distY;
  var s = a === "Start", u = a === "End", f = a === "After", l = t.state.target, v = i.isRequest, c = n.indexOf("Control") > -1;
  if (!l || s && c && !v && t.areaElement === i.inputEvent.target)
    return !1;
  var d = N([], R(r), !1);
  if (v) {
    var p = i.requestAble;
    d.some(function(O) {
      return O.name === p;
    }) || d.push.apply(d, N([], R(t.props.ables.filter(function(O) {
      return O.name === p;
    })), !1));
  }
  if (!d.length || d.every(function(O) {
    return O.dragRelation;
  }))
    return !1;
  var g = i.inputEvent, h;
  u && g && (h = document.elementFromPoint(i.clientX, i.clientY) || g.target);
  var m = !1, x = function() {
    var O;
    m = !0, (O = i.stop) === null || O === void 0 || O.call(i);
  }, S = s && (!t.targetGesto || !t.controlGesto || !t.targetGesto.isFlag() || !t.controlGesto.isFlag());
  S && t.updateRect(a, !0, !1);
  var b = i.datas, E = c ? "controlGesto" : "targetGesto", D = t[E], C = function(O, T, I) {
    if (!(T in O) || D !== t[E])
      return !1;
    var z = O.name, k = b[z] || (b[z] = {});
    if (s && (k.isEventStart = !I || !O[I] || O[I](t, i)), !k.isEventStart)
      return !1;
    var F = O[T](t, M(M({}, i), { stop: x, datas: k, originalDatas: b, inputTarget: h }));
    return t._emitter.off(), s && F === !1 && (k.isEventStart = !1), F;
  };
  S && d.forEach(function(O) {
    O.unset && O.unset(t);
  }), C(Ko, "drag".concat(n).concat(a));
  var y = 0, _ = 0;
  e.forEach(function(O) {
    if (m)
      return !1;
    var T = "".concat(O).concat(n).concat(a), I = "".concat(O).concat(n, "Condition");
    a === "" && !v && Pl(t.state, i);
    var z = d.filter(function(A) {
      return A[T];
    });
    z = z.filter(function(A, W) {
      return A.name && z.indexOf(A) === W;
    });
    var k = z.filter(function(A) {
      return C(A, T, I);
    }), F = k.length;
    m && ++y, F && ++_, !m && s && z.length && !F && (y += z.filter(function(A) {
      var W = A.name, H = b[W];
      return H.isEventStart ? A.dragRelation !== "strong" : !1;
    }).length ? 1 : 0);
  }), (!f || _) && C(Jo, "drag".concat(n).concat(a));
  var w = D !== t[E] || y === e.length;
  if ((u || m || w) && (t.state.gestos = {}, t.moveables && t.moveables.forEach(function(O) {
    O.state.gestos = {};
  }), d.forEach(function(O) {
    O.unset && O.unset(t);
  })), s && !w && !v && _ && t.props.preventDefault && i?.preventDefault(), t.isUnmounted || w)
    return !1;
  if (!s && _ && !o || u) {
    var P = t.props.flushSync || To;
    P(function() {
      t.updateRect(u ? a : "", !0, !1), t.forceUpdate();
    });
  }
  return !s && !u && !f && _ && !o && te(t, r, e, n, a + "After", i), !0;
}
function ya(t, r) {
  return function(e, n) {
    var a;
    n === void 0 && (n = e.inputEvent.target);
    var i = n, o = t.areaElement, s = t._dragTarget;
    return !s || !r && (!((a = t.controlGesto) === null || a === void 0) && a.isFlag()) ? !1 : i === s || s.contains(i) || i === o || !t.isMoveableElement(i) && !t.controlBox.contains(i) || Ct(i, "moveable-area") || Ct(i, "moveable-padding") || Ct(i, "moveable-edgeDraggable");
  };
}
function Qo(t, r, e) {
  var n = t.controlBox, a = [], i = t.props, o = i.dragArea, s = t.state.target, u = i.dragTarget;
  a.push(n), (!o || u) && a.push(r), !o && u && s && r !== s && i.dragTargetSelf && a.push(s);
  var f = ya(t);
  return rs(t, a, "targetAbles", e, {
    dragStart: f,
    pinchStart: f
  });
}
function ts(t, r) {
  var e = t.controlBox, n = [];
  n.push(e);
  var a = ya(t, !0), i = function(o, s) {
    if (s === void 0 && (s = o.inputEvent.target), s === e)
      return !0;
    var u = a(o, s);
    return !u;
  };
  return rs(t, n, "controlAbles", r, {
    dragStart: i,
    pinchStart: i
  });
}
function rs(t, r, e, n, a) {
  a === void 0 && (a = {});
  var i = e === "targetAbles", o = t.props, s = o.pinchOutside, u = o.pinchThreshold, f = o.preventClickEventOnDrag, l = o.preventClickDefault, v = o.checkInput, c = o.dragFocusedInput, d = o.preventDefault, p = d === void 0 ? !0 : d, g = o.preventRightClick, h = g === void 0 ? !0 : g, m = o.preventWheelClick, x = m === void 0 ? !0 : m, S = o.dragContainer, b = Jt(S, !0), E = {
    preventDefault: p,
    preventRightClick: h,
    preventWheelClick: x,
    container: b || lr(t.getControlBoxElement()),
    pinchThreshold: u,
    pinchOutside: s,
    preventClickEventOnDrag: i ? f : !1,
    preventClickEventOnDragStart: i ? l : !1,
    preventClickEventByCondition: i ? null : function(y) {
      return t.controlBox.contains(y.target);
    },
    checkInput: i ? v : !1,
    dragFocusedInput: c
  }, D = new zu(r, E), C = n === "Control";
  return ["drag", "pinch"].forEach(function(y) {
    ["Start", "", "End"].forEach(function(_) {
      D.on("".concat(y).concat(_), function(w) {
        var P, O = w.eventType, T = y === "drag" && w.isPinch;
        if (a[O] && !a[O](w)) {
          w.stop();
          return;
        }
        if (!T) {
          var I = y === "drag" ? [y] : ["drag", y], z = N([], R(t[e]), !1), k = te(t, z, I, n, _, w);
          k ? (t.props.stopPropagation || _ === "Start" && C) && ((P = w?.inputEvent) === null || P === void 0 || P.stopPropagation()) : w.stop();
        }
      });
    });
  }), D;
}
var fc = /* @__PURE__ */ function() {
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
function lc(t, r, e, n) {
  var a;
  e === void 0 && (e = r);
  var i = io(t, r), o = i.matrixes, s = i.is3d, u = i.targetMatrix, f = i.transformOrigin, l = i.targetOrigin, v = i.offsetContainer, c = i.hasFixed, d = i.zoom, p = Cf(v, e), g = p.matrixes, h = p.is3d, m = p.offsetContainer, x = p.zoom, S = n, b = 4, E = t.tagName.toLowerCase() !== "svg" && "ownerSVGElement" in t, D = u, C = mt(b), y = mt(b), _ = mt(b), w = mt(b), P = o.length, O = g.map(function(W) {
    return M(M({}, W), { matrix: W.matrix ? N([], R(W.matrix), !1) : void 0 });
  }).reverse();
  o.reverse(), !s && S && (D = Kt(D, 3, 4), Bn(o)), !h && S && Bn(O), O.forEach(function(W) {
    y = pt(y, W.matrix, b);
  });
  var T = e || pr(t), I = ((a = O[0]) === null || a === void 0 ? void 0 : a.target) || oe(T, T, !0).offsetParent, z = O.slice(1).reduce(function(W, H) {
    return pt(W, H.matrix, b);
  }, mt(b));
  o.forEach(function(W, H) {
    if (P - 2 === H && (_ = C.slice()), P - 1 === H && (w = C.slice()), !W.matrix) {
      var G = o[H + 1], V = wl(W, G, I, b, pt(z, C, b));
      W.matrix = Er(V, b);
    }
    C = pt(C, W.matrix, b);
  });
  var k = !E && s;
  D || (D = mt(k ? 4 : 3));
  var F = $e(E && D.length === 16 ? Kt(D, 4, 3) : D, k), A = y;
  return y = Ni(y, b, b), {
    hasZoom: d !== 1 || x !== 1,
    hasFixed: c,
    matrixes: o,
    rootMatrix: y,
    originalRootMatrix: A,
    beforeMatrix: _,
    offsetMatrix: w,
    allMatrix: C,
    targetMatrix: D,
    targetTransform: F,
    inlineTransform: t.style.transform,
    transformOrigin: f,
    targetOrigin: l,
    is3d: S,
    offsetContainer: v,
    offsetRootContainer: m
  };
}
function cc(t, r, e, n) {
  e === void 0 && (e = r);
  var a = 0, i = 0, o = 0, s = {}, u = zo(t);
  if (t && (a = u.offsetWidth, i = u.offsetHeight), t) {
    var f = lc(t, r, e, n), l = Br(f.allMatrix, f.transformOrigin, a, i);
    s = M(M({}, f), l);
    var v = Br(f.allMatrix, [50, 50], 100, 100);
    o = Go([v.pos1, v.pos2], v.direction);
  }
  var c = 4;
  return M(M(M({ hasZoom: !1, width: a, height: i, rotation: o }, u), { originalRootMatrix: mt(c), rootMatrix: mt(c), beforeMatrix: mt(c), offsetMatrix: mt(c), allMatrix: mt(c), targetMatrix: mt(c), targetTransform: "", inlineTransform: "", transformOrigin: [0, 0], targetOrigin: [0, 0], is3d: !!n, left: 0, top: 0, right: 0, bottom: 0, origin: [0, 0], pos1: [0, 0], pos2: [0, 0], pos3: [0, 0], pos4: [0, 0], direction: 1, hasFixed: !1, offsetContainer: null, offsetRootContainer: null, matrixes: [] }), s);
}
function Nn(t, r, e, n, a, i) {
  i === void 0 && (i = []);
  var o = 1, s = [0, 0], u = Ce(), f = Ce(), l = Ce(), v = Ce(), c = [0, 0], d = {}, p = cc(r, e, a, !0);
  if (r) {
    var g = Nt(r);
    i.forEach(function(O) {
      d[O] = g(O);
    });
    var h = p.is3d ? 4 : 3, m = Br(p.offsetMatrix, ut(p.transformOrigin, Wi(p.targetMatrix, h)), p.width, p.height);
    o = m.direction, s = ut(m.origin, [m.left - p.left, m.top - p.top]), v = Qr(p.offsetRootContainer);
    var x = oe(n, n, !0).offsetParent || p.offsetRootContainer;
    if (p.hasZoom) {
      var S = Br(pt(p.originalRootMatrix, p.allMatrix), p.transformOrigin, p.width, p.height), b = Br(p.originalRootMatrix, Fe(Nt(x)("transformOrigin")).map(function(O) {
        return parseFloat(O);
      }), x.offsetWidth, x.offsetHeight);
      if (u = vn(S, v), l = vn(b, v, x, !0), t) {
        var E = S.left, D = S.top;
        f = vn({
          left: E,
          top: D,
          bottom: D,
          right: D
        }, v);
      }
    } else {
      u = Qr(r), l = yf(x), t && (f = Qr(t));
      var C = l.left, y = l.top, _ = l.clientLeft, w = l.clientTop, P = [
        u.left - C,
        u.top - y
      ];
      c = Q(Wr(p.rootMatrix, P, 4), [_ + p.left, w + p.top]);
    }
  }
  return M({ targetClientRect: u, containerClientRect: l, moveableClientRect: f, rootContainerClientRect: v, beforeDirection: o, beforeOrigin: s, originalBeforeOrigin: s, target: r, style: d, offsetDelta: c }, p);
}
function hi(t) {
  var r = t.pos1, e = t.pos2, n = t.pos3, a = t.pos4;
  if (!r || !e || !n || !a)
    return null;
  var i = yr([r, e, n, a]), o = [i.minX, i.minY], s = Q(t.origin, o);
  return r = Q(r, o), e = Q(e, o), n = Q(n, o), a = Q(a, o), M(M({}, t), {
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
var Hr = /* @__PURE__ */ function(t) {
  le(r, t);
  function r() {
    var e = t !== null && t.apply(this, arguments) || this;
    return e.state = M({ container: null, gestos: {}, renderLines: [
      [[0, 0], [0, 0]],
      [[0, 0], [0, 0]],
      [[0, 0], [0, 0]],
      [[0, 0], [0, 0]]
    ], renderPoses: [[0, 0], [0, 0], [0, 0], [0, 0]], disableNativeEvent: !1, posDelta: [0, 0] }, Nn(null)), e.renderState = {}, e.enabledAbles = [], e.targetAbles = [], e.controlAbles = [], e.rotation = 0, e.scale = [1, 1], e.isMoveableMounted = !1, e.isUnmounted = !1, e.events = {
      mouseEnter: null,
      mouseLeave: null
    }, e._emitter = new ra(), e._prevOriginalDragTarget = null, e._originalDragTarget = null, e._prevDragTarget = null, e._dragTarget = null, e._prevPropTarget = null, e._propTarget = null, e._prevDragArea = !1, e._isPropTargetChanged = !1, e._hasFirstTarget = !1, e._reiszeObserver = null, e._observerId = 0, e._mutationObserver = null, e._rootContainer = null, e._viewContainer = null, e._viewClassNames = [], e._store = {}, e.checkUpdateRect = function() {
      if (!e.isDragging()) {
        var n = e.props.parentMoveable;
        if (n) {
          n.checkUpdateRect();
          return;
        }
        js(e._observerId), e._observerId = Gi(function() {
          e.isDragging() || e.updateRect();
        });
      }
    }, e._onPreventClick = function(n) {
      n.stopPropagation(), n.preventDefault();
    }, e;
  }
  return r.prototype.render = function() {
    var e = this.props, n = this.getState(), a = e.parentPosition, i = e.className, o = e.target, s = e.zoom, u = e.cspNonce, f = e.translateZ, l = e.cssStyled, v = e.groupable, c = e.linePadding, d = e.controlPadding;
    this._checkUpdateRootContainer(), this.checkUpdate(), this.updateRenderPoses();
    var p = R(a || [0, 0], 2), g = p[0], h = p[1], m = n.left, x = n.top, S = n.target, b = n.direction, E = n.hasFixed, D = n.offsetDelta, C = e.targets, y = this.isDragging(), _ = {};
    this.getEnabledAbles().forEach(function(z) {
      _["data-able-".concat(z.name.toLowerCase())] = !0;
    });
    var w = this._getAbleClassName(), P = C && C.length && (S || v) || o || !this._hasFirstTarget && this.state.isPersisted, O = this.controlBox || this.props.firstRenderState || this.props.persistData, T = [m - g, x - h];
    !v && e.useAccuratePosition && (T[0] += D[0], T[1] += D[1]);
    var I = {
      position: E ? "fixed" : "absolute",
      display: P ? "block" : "none",
      visibility: O ? "visible" : "hidden",
      transform: "translate3d(".concat(T[0], "px, ").concat(T[1], "px, ").concat(f, ")"),
      "--zoom": s,
      "--zoompx": "".concat(s, "px")
    };
    return c && (I["--moveable-line-padding"] = c), d && (I["--moveable-control-padding"] = d), ct.createElement(
      l,
      M({ cspNonce: u, ref: br(this, "controlBox"), className: "".concat(K("control-box", b === -1 ? "reverse" : "", y ? "dragging" : ""), " ").concat(w, " ").concat(i) }, _, { onClick: this._onPreventClick, style: I }),
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
    a && this._changeAbleViewClassNames([]), Ir(this, !1), Ir(this, !0);
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
    return Ht(n, function(a) {
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
    return e && (((n = e.getAttribute) === null || n === void 0 ? void 0 : n.call(e, "class")) || "").indexOf(aa) > -1;
  }, r.prototype.dragStart = function(e, n) {
    n === void 0 && (n = e.target);
    var a = this.targetGesto, i = this.controlGesto;
    return a && ya(this)({ inputEvent: e }, n) ? a.isFlag() || a.triggerDragStart(e) : i && this.isMoveableElement(n) && (i.isFlag() || i.triggerDragStart(e)), this;
  }, r.prototype.hitTest = function(e) {
    var n = this.state, a = n.target, i = n.pos1, o = n.pos2, s = n.pos3, u = n.pos4, f = n.targetClientRect;
    if (!a)
      return 0;
    var l;
    if (Kn(e)) {
      var v = e.getBoundingClientRect();
      l = {
        left: v.left,
        top: v.top,
        width: v.width,
        height: v.height
      };
    } else
      l = M({ width: 0, height: 0 }, e);
    var c = l.left, d = l.top, p = l.width, g = l.height, h = Na([i, o, u, s], f), m = wu(h, [
      [c, d],
      [c + p, d],
      [c + p, d + g],
      [c, d + g]
    ]), x = Xi(h);
    return !m || !x ? 0 : Math.min(100, m / x * 100);
  }, r.prototype.isInside = function(e, n) {
    var a = this.state, i = a.target, o = a.pos1, s = a.pos2, u = a.pos3, f = a.pos4, l = a.targetClientRect;
    return i ? En([e, n], Na([o, s, f, u], l)) : !1;
  }, r.prototype.updateRect = function(e, n, a) {
    a === void 0 && (a = !0);
    var i = this.props, o = !i.parentPosition && !i.wrapperMoveable;
    o && Fr(!0);
    var s = i.parentMoveable, u = this.state, f = u.target || i.target, l = this.getContainer(), v = s ? s._rootContainer : this._rootContainer, c = Nn(this.controlBox, f, l, l, v || l, this._getRequestStyles());
    if (!f && this._hasFirstTarget && i.persistData) {
      var d = hi(i.persistData);
      for (var p in d)
        c[p] = d[p];
    }
    o && Fr(), this.updateState(c, s ? !1 : a);
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
    var e = this.state, n = qt(this.state), a = R(n, 4), i = a[0], o = a[1], s = a[2], u = a[3], f = Xt(n), l = e.width, v = e.height, c = f.width, d = f.height, p = f.left, g = f.top, h = [e.left, e.top], m = ut(h, e.origin), x = ut(h, e.beforeOrigin), S = e.transformOrigin;
    return {
      width: c,
      height: d,
      left: p,
      top: g,
      pos1: i,
      pos2: o,
      pos3: s,
      pos4: u,
      offsetWidth: l,
      offsetHeight: v,
      beforeOrigin: x,
      origin: m,
      transformOrigin: S,
      rotation: this.getRotation()
    };
  }, r.prototype.getManager = function() {
    return this;
  }, r.prototype.stopDrag = function(e) {
    if (!e || e === "target") {
      var n = this.targetGesto;
      n?.isIdle() === !1 && An(this, !1), n?.stop();
    }
    if (!e || e === "control") {
      var n = this.controlGesto;
      n?.isIdle() === !1 && An(this, !0), n?.stop();
    }
  }, r.prototype.getRotation = function() {
    var e = this.state, n = e.pos1, a = e.pos2, i = e.direction;
    return Gl(n, a, i);
  }, r.prototype.request = function(e, n, a) {
    n === void 0 && (n = {});
    var i = this, o = i.props, s = o.parentMoveable || o.wrapperMoveable || i, u = s.props.ables, f = o.groupable, l = Ht(u, function(m) {
      return m.name === e;
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
    var v = l.request(i), c = a || n.isInstant, d = v.isControl ? "controlAbles" : "targetAbles", p = "".concat(f ? "Group" : "").concat(v.isControl ? "Control" : ""), g = N([], R(s[d]), !1), h = {
      request: function(m) {
        return te(i, g, ["drag"], p, "", M(M({}, v.request(m)), { requestAble: e, isRequest: !0 }), c), h;
      },
      requestEnd: function() {
        return te(i, g, ["drag"], p, "End", M(M({}, v.requestEnd()), { requestAble: e, isRequest: !0 }), c), h;
      }
    };
    return te(i, g, ["drag"], p, "Start", M(M({}, v.requestStart(n)), { requestAble: e, isRequest: !0 }), c), c ? h.request(n).requestEnd() : h;
  }, r.prototype.getMoveables = function() {
    return [this];
  }, r.prototype.destroy = function() {
    this.componentWillUnmount();
  }, r.prototype.updateRenderPoses = function() {
    var e = this.getState(), n = this.props, a = n.padding, i = e.originalBeforeOrigin, o = e.transformOrigin, s = e.allMatrix, u = e.is3d, f = e.pos1, l = e.pos2, v = e.pos3, c = e.pos4, d = e.left, p = e.top, g = e.isPersisted, h = n.zoom || 1;
    if (!a && h <= 1) {
      e.renderPoses = [
        f,
        l,
        v,
        c
      ], e.renderLines = [
        [f, l],
        [l, c],
        [c, v],
        [v, f]
      ];
      return;
    }
    var m = Xo(a || {}), x = m.left, S = m.top, b = m.bottom, E = m.right, D = u ? 4 : 3, C = [];
    g ? C = o : this.controlBox && n.groupable ? C = i : C = ut(i, [d, p]);
    var y = Ie(D, Er(C.map(function(I) {
      return -I;
    }), D), s, Er(o, D)), _ = Yt(y, f, [-x, -S], D), w = Yt(y, l, [E, -S], D), P = Yt(y, v, [-x, b], D), O = Yt(y, c, [E, b], D);
    if (e.renderPoses = [
      _,
      w,
      P,
      O
    ], e.renderLines = [
      [_, w],
      [w, O],
      [O, P],
      [P, _]
    ], h) {
      var T = h / 2;
      e.renderLines = [
        [
          Yt(y, f, [-x - T, -S], D),
          Yt(y, l, [E + T, -S], D)
        ],
        [
          Yt(y, l, [E, -S - T], D),
          Yt(y, c, [E, b + T], D)
        ],
        [
          Yt(y, c, [E + T, b], D),
          Yt(y, v, [-x - T, b], D)
        ],
        [
          Yt(y, v, [-x, b + T], D),
          Yt(y, f, [-x, -S - T], D)
        ]
      ];
    }
  }, r.prototype.checkUpdate = function() {
    this._isPropTargetChanged = !1;
    var e = this.props, n = e.target, a = e.container, i = e.parentMoveable, o = this.state, s = o.target, u = o.container;
    if (!(!s && !n)) {
      this.updateAbles();
      var f = !kn(s, n), l = f || !kn(u, a);
      if (l) {
        var v = a || this.controlBox;
        v && this.unsetAbles(), this.updateState({ target: n, container: a }), !i && v && this.updateRect("End", !1, !1), this._isPropTargetChanged = f;
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
    return a[i] || (a[i] = ji(e, n)), a[i];
  }, r.prototype.getState = function() {
    var e, n = this.props;
    (n.target || !((e = n.targets) === null || e === void 0) && e.length) && (this._hasFirstTarget = !0);
    var a = this.controlBox, i = n.persistData, o = n.firstRenderState;
    if (o && !a)
      return o;
    if (!this._hasFirstTarget && i) {
      var s = hi(i);
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
    var a = this.props, i = a.triggerAblesSimultaneously, o = this.getEnabledAbles(e), s = "drag".concat(n, "Start"), u = "pinch".concat(n, "Start"), f = "drag".concat(n, "ControlStart"), l = _e(o, [s, u], i), v = _e(o, [f], i);
    this.enabledAbles = o, this.targetAbles = l, this.controlAbles = v;
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
      createElement: ct.createElement
    };
    return this.renderState = {}, Ol(Wo(_e(this.getEnabledAbles(), ["render"], a).map(function(o) {
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
      return N(N([], R(n), !1), R(s), !1);
    }, N([], R(this.props.requestStyles || []), !1));
    return e;
  }, r.prototype._updateObserver = function(e) {
    this._updateResizeObserver(e), this._updateMutationObserver(e);
  }, r.prototype._updateEvents = function() {
    var e = this.targetAbles.length, n = this.controlAbles.length, a = this._dragTarget, i = !e && this.targetGesto || this._isTargetChanged(!0);
    i && (Ir(this, !1), this.updateState({ gestos: {} })), n || Ir(this, !0), a && e && !this.targetGesto && (this.targetGesto = Qo(this, a, "")), !this.controlGesto && n && (this.controlGesto = ts(this, "Control"));
  }, r.prototype._updateTargets = function() {
    var e = this.props;
    this._prevPropTarget = this._propTarget, this._prevDragTarget = this._dragTarget, this._prevOriginalDragTarget = this._originalDragTarget, this._prevDragArea = e.dragArea, this._propTarget = e.target, this._originalDragTarget = e.dragTarget || e.target, this._dragTarget = Jt(this._originalDragTarget, !0);
  }, r.prototype._renderLines = function() {
    var e = this.props, n = e, a = n.zoom, i = n.hideDefaultLines, o = n.hideChildMoveableDefaultLines, s = n.parentMoveable;
    if (i || s && o)
      return [];
    var u = this.getState(), f = {
      createElement: ct.createElement
    };
    return u.renderLines.map(function(l, v) {
      return ie(f, "", l[0], l[1], a, "render-line-".concat(v));
    });
  }, r.prototype._isTargetChanged = function(e) {
    var n = this.props, a = n.dragTarget || n.target, i = this._prevOriginalDragTarget, o = this._prevDragArea, s = n.dragArea, u = !s && i !== a, f = (e || s) && o !== s;
    return u || f || this._prevPropTarget != this._propTarget;
  }, r.prototype._updateNativeEvents = function() {
    var e = this, n = this.props, a = n.dragArea ? this.areaElement : this.state.target, i = this.events, o = Lr(i);
    if (this._isTargetChanged())
      for (var s in i) {
        var u = i[s];
        u && u.destroy(), i[s] = null;
      }
    if (a) {
      var f = this.enabledAbles;
      o.forEach(function(l) {
        var v = _e(f, [l]), c = v.length > 0, d = i[l];
        if (!c) {
          d && (d.destroy(), i[l] = null);
          return;
        }
        d || (d = new fc(a, e, l), i[l] = d), d.setAbles(v);
      });
    }
  }, r.prototype._checkUpdateRootContainer = function() {
    var e = this.props.rootContainer;
    !this._rootContainer && e && (this._rootContainer = Jt(e, !0));
  }, r.prototype._checkUpdateViewContainer = function() {
    var e = this.props.viewContainer;
    !this._viewContainer && e && (this._viewContainer = Jt(e, !0));
    var n = this._viewContainer;
    n && this._changeAbleViewClassNames(N(N([], R(this._getAbleViewClassNames()), !1), [
      this.isDragging() ? Hl : ""
    ], !1));
  }, r.prototype._changeAbleViewClassNames = function(e) {
    var n = this._viewContainer, a = No(e.filter(Boolean), function(f) {
      return f;
    }).map(function(f) {
      var l = R(f, 1), v = l[0];
      return v;
    }), i = this._viewClassNames, o = ta(i, a), s = o.removed, u = o.added;
    s.forEach(function(f) {
      ki(n, i[f]);
    }), u.forEach(function(f) {
      Ai(n, a[f]);
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
      var l, v, c, d = f.name, p = ((l = f.className) === null || l === void 0 ? void 0 : l.call(f, n)) || "";
      return (!((v = s[d]) === null || v === void 0) && v.isEventStart || !((c = u[d]) === null || c === void 0) && c.isEventStart) && (p += " ".concat(K("".concat(d).concat(e, "-dragging")))), p.trim();
    }).filter(Boolean).join(" ");
  }, r.prototype._updateResizeObserver = function(e) {
    var n, a = this.props, i = a.target, o = lr(this.getControlBoxElement());
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
    var n = this, a, i = this.props, o = i.target, s = lr(this.getControlBoxElement());
    if (!s.MutationObserver || !o || !i.useMutationObserver) {
      (a = this._mutationObserver) === null || a === void 0 || a.disconnect();
      return;
    }
    if (!(e.target === o && this._mutationObserver)) {
      var u = new s.MutationObserver(function(f) {
        var l, v;
        try {
          for (var c = Xu(f), d = c.next(); !d.done; d = c.next()) {
            var p = d.value;
            p.type === "attributes" && p.attributeName === "style" && n.checkUpdateRect();
          }
        } catch (g) {
          l = { error: g };
        } finally {
          try {
            d && !d.done && (v = c.return) && v.call(c);
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
    flushSync: To,
    firstRenderState: null,
    persistData: null,
    viewContainer: null,
    requestStyles: [],
    useAccuratePosition: !1
  }, r;
}(ct.PureComponent), Ca = {
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
    var e, n = t.props, a = n.targets || [], i = t.getState(), o = i.left, s = i.top, u = i.isPersisted, f = n.zoom || 1, l = t.renderGroupRects, v = ((e = n.persistData) === null || e === void 0 ? void 0 : e.children) || [];
    u ? a = v.map(function() {
      return null;
    }) : v = [];
    var c = zr(t, "parentPosition", [o, s], function(p) {
      return p.join(",");
    }), d = zr(t, "requestStyles", t.getRequestChildStyles(), function(p) {
      return p.join(",");
    });
    return t.moveables = t.moveables.slice(0, a.length), N(N([], R(a.map(function(p, g) {
      return r.createElement(Hr, { key: "moveable" + g, ref: Oi(t, "moveables", g), target: p, origin: !1, requestStyles: d, cssStyled: n.cssStyled, customStyledMap: n.customStyledMap, useResizeObserver: n.useResizeObserver, useMutationObserver: n.useMutationObserver, hideChildMoveableDefaultLines: n.hideChildMoveableDefaultLines, parentMoveable: t, parentPosition: [o, s], persistData: v[g], zoom: f });
    })), !1), R(Wo(l.map(function(p, g) {
      var h = p.pos1, m = p.pos2, x = p.pos3, S = p.pos4, b = [h, m, x, S];
      return [
        [0, 1],
        [1, 3],
        [3, 2],
        [2, 0]
      ].map(function(E, D) {
        var C = R(E, 2), y = C[0], _ = C[1];
        return ie(r, "", Q(b[y], c), Q(b[_], c), f, "group-rect-".concat(g, "-").concat(D));
      });
    }))), !1);
  }
}, vc = ce("clickable", {
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
      U(t, "onClick", nt(t, r, {
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
      i === -1 && (i = nr(a, function(u) {
        return u.contains(n);
      }), s = i > -1), U(t, "onClickGroup", nt(t, r, {
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
function wr(t) {
  var r = t.originalDatas.draggable;
  return r || (t.originalDatas.draggable = {}, r = t.originalDatas.draggable), M(M({}, t), { datas: r });
}
var dc = ce("edgeDraggable", {
  css: [
    `.edge.edgeDraggable.line {
cursor: move;
}`
  ],
  render: function(t, r) {
    var e = t.props, n = e.edgeDraggable;
    return n ? uo(r, "edgeDraggable", n, t.getState().renderPoses, e.zoom) : [];
  },
  dragCondition: function(t, r) {
    var e, n = t.props, a = (e = r.inputEvent) === null || e === void 0 ? void 0 : e.target;
    return !n.edgeDraggable || !a ? !1 : !n.draggable && Ct(a, K("direction")) && Ct(a, K("edge")) && Ct(a, K("edgeDraggable"));
  },
  dragStart: function(t, r) {
    return Gt.dragStart(t, wr(r));
  },
  drag: function(t, r) {
    return Gt.drag(t, wr(r));
  },
  dragEnd: function(t, r) {
    return Gt.dragEnd(t, wr(r));
  },
  dragGroupCondition: function(t, r) {
    var e, n = t.props, a = (e = r.inputEvent) === null || e === void 0 ? void 0 : e.target;
    return !n.edgeDraggable || !a ? !1 : !n.draggable && Ct(a, K("direction")) && Ct(a, K("line"));
  },
  dragGroupStart: function(t, r) {
    return Gt.dragGroupStart(t, wr(r));
  },
  dragGroup: function(t, r) {
    return Gt.dragGroup(t, wr(r));
  },
  dragGroupEnd: function(t, r) {
    return Gt.dragGroupEnd(t, wr(r));
  },
  unset: function(t) {
    return Gt.unset(t);
  }
}), es = {
  name: "individualGroupable",
  props: [
    "individualGroupable",
    "individualGroupableProps"
  ],
  events: []
}, pc = [
  Ko,
  jo,
  ml,
  Al,
  Gt,
  dc,
  In,
  kl,
  Nl,
  Qf,
  Xl,
  Vl,
  Ll,
  nc,
  ec,
  sc,
  Ca,
  es,
  vc,
  qo,
  Jo
];
function mi(t, r) {
  var e = R(t, 3), n = e[0], a = e[1], i = e[2];
  return (n * r[0] + a * r[1] + i) / Math.sqrt(n * n + a * a);
}
function Re(t, r) {
  var e = R(t, 2), n = e[0], a = e[1];
  return -n * r[0] - a * r[1];
}
function xi(t, r) {
  return Math.max.apply(Math, N([], R(t.map(function(e) {
    var n = R(e, 4), a = n[0], i = n[1], o = n[2], s = n[3];
    return Math.max(a[r], i[r], o[r], s[r]);
  })), !1));
}
function Si(t, r) {
  return Math.min.apply(Math, N([], R(t.map(function(e) {
    var n = R(e, 4), a = n[0], i = n[1], o = n[2], s = n[3];
    return Math.min(a[r], i[r], o[r], s[r]);
  })), !1));
}
function gc(t, r) {
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
  var v = tt(r, kt);
  if (v % 90) {
    var c = v / 180 * Math.PI, d = Math.tan(c), p = -1 / d, g = [Rn, La], h = [[0, 0], [0, 0]], m = [Rn, La], x = [[0, 0], [0, 0]];
    t.forEach(function(q) {
      q.forEach(function(L) {
        var j = mi([-d, 1, 0], L), Y = mi([-p, 1, 0], L);
        g[0] > j && (h[0] = L, g[0] = j), g[1] < j && (h[1] = L, g[1] = j), m[0] > Y && (x[0] = L, m[0] = Y), m[1] < Y && (x[1] = L, m[1] = Y);
      });
    });
    var S = R(h, 2), b = S[0], E = S[1], D = R(x, 2), C = D[0], y = D[1], _ = [-d, 1, Re([-d, 1], b)], w = [-d, 1, Re([-d, 1], E)], P = [-p, 1, Re([-p, 1], C)], O = [-p, 1, Re([-p, 1], y)];
    e = R([
      [_, P],
      [_, O],
      [w, P],
      [w, O]
    ].map(function(q) {
      var L = R(q, 2), j = L[0], Y = L[1];
      return ea(j, Y)[0];
    }), 4), i = e[0], o = e[1], s = e[2], u = e[3], f = m[1] - m[0], l = g[1] - g[0];
  } else {
    var T = Si(t, 0), I = Si(t, 1), z = xi(t, 0), k = xi(t, 1);
    if (i = [T, I], o = [z, I], s = [T, k], u = [z, k], f = z - T, l = k - I, v % 180) {
      var F = [s, i, u, o];
      n = R(F, 4), i = n[0], o = n[1], s = n[2], u = n[3], f = k - I, l = z - T;
    }
  }
  if (v % 360 > 180) {
    var F = [u, s, o, i];
    a = R(F, 4), i = a[0], o = a[1], s = a[2], u = a[3];
  }
  var A = yr([i, o, s, u]), W = A.minX, H = A.minY, G = A.maxX, V = A.maxY;
  return {
    pos1: i,
    pos2: o,
    pos3: s,
    pos4: u,
    width: f,
    height: l,
    minX: W,
    minY: H,
    maxX: G,
    maxY: V,
    rotation: r
  };
}
function ns(t, r) {
  var e = r.map(function(n) {
    if (wt(n)) {
      var a = ns(t, n), i = a.length;
      return i > 1 ? a : i === 1 ? a[0] : null;
    } else {
      var o = Ht(t, function(s) {
        var u = s.manager;
        return u.props.target === n;
      });
      return o ? (o.finded = !0, o.manager) : null;
    }
  }).filter(Boolean);
  return e.length === 1 && wt(e[0]) ? e[0] : e;
}
var hc = /* @__PURE__ */ function(t) {
  le(r, t);
  function r() {
    var e = t !== null && t.apply(this, arguments) || this;
    return e.differ = new Yi(), e.moveables = [], e.transformOrigin = "50% 50%", e.renderGroupRects = [], e._targetGroups = [], e._hasFirstTargets = !1, e;
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
    Fr(!0), this.moveables.forEach(function(J) {
      J.updateRect(e, !1, !1);
    });
    var s = this.props, u = this.moveables, f = o.target || s.target, l = u.map(function(J) {
      return { finded: !1, manager: J };
    }), v = this.props.targetGroups || [], c = ns(l, v), d = s.useDefaultGroupRotate;
    c.push.apply(c, N([], R(l.filter(function(J) {
      var at = J.finded;
      return !at;
    }).map(function(J) {
      var at = J.manager;
      return at;
    })), !1));
    var p = [], g = !n || e !== "" && s.updateGroup, h = s.defaultGroupRotate || 0;
    if (!this._hasFirstTargets) {
      var m = (i = s.persistData) === null || i === void 0 ? void 0 : i.rotation;
      m != null && (h = m);
    }
    function x(J, at, st) {
      var X = J.map(function(gt) {
        if (wt(gt)) {
          var it = x(gt, at), lt = [it.pos1, it.pos2, it.pos3, it.pos4];
          return p.push(it), { poses: lt, rotation: it.rotation };
        } else
          return {
            poses: qt(gt.state),
            rotation: gt.getRotation()
          };
      }), Z = X.map(function(gt) {
        var it = gt.rotation;
        return it;
      }), ft = 0, rt = Z[0], et = Z.every(function(gt) {
        return Math.abs(rt - gt) < 0.1;
      });
      g ? ft = !d && et ? rt : h : ft = !d && !st && et ? rt : at;
      var ot = X.map(function(gt) {
        var it = gt.poses;
        return it;
      }), vt = gc(ot, ft);
      return vt;
    }
    var S = x(c, this.rotation, !0);
    g && (this.rotation = S.rotation, this.transformOrigin = s.defaultGroupOrigin || "50% 50%", this.scale = [1, 1]), this._targetGroups = v, this.renderGroupRects = p;
    var b = this.transformOrigin, E = this.rotation, D = this.scale, C = S.width, y = S.height, _ = S.minX, w = S.minY, P = Bl([
      [0, 0],
      [C, 0],
      [0, y],
      [C, y]
    ], ba(b, C, y), this.rotation / 180 * Math.PI), O = yr(P.result), T = O.minX, I = O.minY, z = " rotate(".concat(E, "deg)") + " scale(".concat(Bt(D[0]), ", ").concat(Bt(D[1]), ")"), k = "translate(".concat(-T, "px, ").concat(-I, "px)").concat(z);
    this.controlBox.style.transform = "translate3d(".concat(_, "px, ").concat(w, "px, ").concat(this.props.translateZ || 0, ")"), f.style.cssText += "left:0px;top:0px;" + "transform-origin:".concat(b, ";") + "width:".concat(C, "px;height:").concat(y, "px;") + "transform: ".concat(k), o.width = C, o.height = y;
    var F = this.getContainer(), A = Nn(this.controlBox, f, this.controlBox, this.getContainer(), this._rootContainer || F, []), W = [A.left, A.top], H = R(qt(A), 4), G = H[0], V = H[1], q = H[2], L = H[3], j = yr([G, V, q, L]), Y = [j.minX, j.minY], $ = Bt(D[0] * D[1]);
    A.pos1 = Q(G, Y), A.pos2 = Q(V, Y), A.pos3 = Q(q, Y), A.pos4 = Q(L, Y), A.left = _ - A.left + Y[0], A.top = w - A.top + Y[1], A.origin = Q(ut(W, A.origin), Y), A.beforeOrigin = Q(ut(W, A.beforeOrigin), Y), A.originalBeforeOrigin = ut(W, A.originalBeforeOrigin), A.transformOrigin = Q(ut(W, A.transformOrigin), Y), f.style.transform = "translate(".concat(-T - Y[0], "px, ").concat(-I - Y[1], "px)") + z, Fr(), this.updateState(M(M({}, A), { posDelta: Y, direction: $, beforeDirection: $ }), a);
  }, r.prototype.getRect = function() {
    return M(M({}, t.prototype.getRect.call(this)), { children: this.moveables.map(function(e) {
      return e.getRect();
    }) });
  }, r.prototype.triggerEvent = function(e, n, a) {
    if (a || e.indexOf("Group") > -1)
      return t.prototype.triggerEvent.call(this, e, n);
    this._emitter.trigger(e, n);
  }, r.prototype.getRequestChildStyles = function() {
    var e = this.getEnabledAbles().reduce(function(n, a) {
      var i, o, s = (o = (i = a.requestChildStyle) === null || i === void 0 ? void 0 : i.call(a)) !== null && o !== void 0 ? o : [];
      return N(N([], R(n), !1), R(s), !1);
    }, []);
    return e;
  }, r.prototype.getMoveables = function() {
    return N([], R(this.moveables), !1);
  }, r.prototype.updateAbles = function() {
    t.prototype.updateAbles.call(this, N(N([], R(this.props.ables), !1), [Ca], !1), "Group");
  }, r.prototype._updateTargets = function() {
    t.prototype._updateTargets.call(this), this._originalDragTarget = this.props.dragTarget || this.areaElement, this._dragTarget = Jt(this._originalDragTarget, !0);
  }, r.prototype._updateEvents = function() {
    var e = this.state, n = this.props, a = this._prevDragTarget, i = n.dragTarget || this.areaElement, o = n.targets, s = this.differ.update(o), u = s.added, f = s.changed, l = s.removed, v = u.length || l.length;
    (v || this._prevOriginalDragTarget !== this._originalDragTarget) && (Ir(this, !1), Ir(this, !0), this.updateState({ gestos: {} })), a !== i && (e.target = null), e.target || (e.target = this.areaElement, this.controlBox.style.display = "block"), e.target && (this.targetGesto || (this.targetGesto = Qo(this, this._dragTarget, "Group")), this.controlGesto || (this.controlGesto = ts(this, "GroupControl")));
    var c = !kn(e.container, n.container);
    c && (e.container = n.container), (c || v || this.transformOrigin !== (n.defaultGroupOrigin || "50% 50%") || f.length || o.length && !Yo(this._targetGroups, n.targetGroups || [])) && (this.updateRect(), this._hasFirstTargets = !0), this._isPropTargetChanged = !!v;
  }, r.prototype._updateObserver = function() {
  }, r.defaultProps = M(M({}, Hr.defaultProps), { transformOrigin: ["50%", "50%"], groupable: !0, dragArea: !0, keepRatio: !0, targets: [], defaultGroupRotate: 0, defaultGroupOrigin: "50% 50%" }), r;
}(Hr), mc = /* @__PURE__ */ function(t) {
  le(r, t);
  function r() {
    var e = t !== null && t.apply(this, arguments) || this;
    return e.moveables = [], e;
  }
  return r.prototype.render = function() {
    var e = this, n, a = this.props, i = a.cspNonce, o = a.cssStyled, s = a.persistData, u = a.targets || [], f = u.length, l = this.isUnmounted || !f, v = (n = s?.children) !== null && n !== void 0 ? n : [];
    return l && !f && v.length ? u = v.map(function() {
      return null;
    }) : l || (v = []), ct.createElement(o, { cspNonce: i, ref: br(this, "controlBox"), className: K("control-box") }, u.map(function(c, d) {
      var p, g, h = (g = (p = a.individualGroupableProps) === null || p === void 0 ? void 0 : p.call(a, c, d)) !== null && g !== void 0 ? g : {};
      return ct.createElement(Hr, M({ key: "moveable" + d, ref: Oi(e, "moveables", d) }, a, h, { target: c, wrapperMoveable: e, isWrapperMounted: e.isMoveableMounted, persistData: v[d] }));
    }));
  }, r.prototype.componentDidMount = function() {
  }, r.prototype.componentDidUpdate = function() {
  }, r.prototype.getTargets = function() {
    return this.props.targets;
  }, r.prototype.updateRect = function(e, n, a) {
    a === void 0 && (a = !0), Fr(!0), this.moveables.forEach(function(i) {
      i.updateRect(e, n, a);
    }), Fr();
  }, r.prototype.getRect = function() {
    return M(M({}, t.prototype.getRect.call(this)), { children: this.moveables.map(function(e) {
      return e.getRect();
    }) });
  }, r.prototype.request = function(e, n, a) {
    n === void 0 && (n = {});
    var i = this.moveables.map(function(u) {
      return u.request(e, M(M({}, n), { isInstant: !1 }), !1);
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
    var a = n, i = Ht(this.moveables, function(o) {
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
    return N([], R(this.moveables), !1);
  }, r.prototype.updateRenderPoses = function() {
  }, r.prototype.checkUpdate = function() {
  }, r.prototype.triggerEvent = function() {
  }, r.prototype.updateAbles = function() {
  }, r.prototype._updateEvents = function() {
  }, r.prototype._updateObserver = function() {
  }, r;
}(Hr);
function as(t, r) {
  var e = [];
  return t.forEach(function(n) {
    if (n) {
      if (ar(n)) {
        r[n] && e.push.apply(e, N([], R(r[n]), !1));
        return;
      }
      wt(n) ? e.push.apply(e, N([], R(as(n, r)), !1)) : e.push(n);
    }
  }), e;
}
function is(t, r) {
  var e = [];
  return t.forEach(function(n) {
    if (n) {
      if (ar(n)) {
        r[n] && e.push.apply(e, N([], R(r[n]), !1));
        return;
      }
      wt(n) ? e.push(is(n, r)) : e.push(n);
    }
  }), e;
}
function os(t, r) {
  return t.length !== r.length || t.some(function(e, n) {
    var a = r[n];
    return !e && !a ? !1 : e != a ? wt(e) && wt(a) ? os(e, a) : !0 : !1;
  });
}
var xc = /* @__PURE__ */ function(t) {
  le(r, t);
  function r() {
    var e = t !== null && t.apply(this, arguments) || this;
    return e.refTargets = [], e.selectorMap = {}, e._differ = new Yi(), e._elementTargets = [], e._tmpRefTargets = [], e._tmpSelectorMap = {}, e._onChangeTargets = null, e;
  }
  return r.makeStyled = function() {
    var e = {}, n = this.getTotalAbles();
    n.forEach(function(i) {
      var o = i.css;
      o && o.forEach(function(s) {
        e[s] = !0;
      });
    });
    var a = Lr(e).join(`
`);
    this.defaultStyled = ji("div", Bs(aa, rf + a));
  }, r.getTotalAbles = function() {
    return N([jo, Ca, es, qo], R(this.defaultAbles), !1);
  }, r.prototype.render = function() {
    var e, n = this.constructor;
    n.defaultStyled || n.makeStyled();
    var a = this.props, i = a.ables, o = a.props, s = Lu(a, ["ables", "props"]), u = R(this._updateRefs(!0), 2), f = u[0], l = u[1], v = as(f, l), c = v.length > 1, d = n.getTotalAbles(), p = N(N([], R(d), !1), R(i || []), !1), g = M(M(M({}, s), o || {}), { ables: p, cssStyled: n.defaultStyled, customStyledMap: n.customStyledMap });
    this._elementTargets = v;
    var h = null, m = this.moveable, x = s.persistData;
    if (x?.children && (c = !0), s.individualGroupable)
      return ct.createElement(mc, M({ key: "individual-group", ref: br(this, "moveable") }, g, { target: null, targets: v }));
    if (c) {
      var S = is(f, l);
      if (m && !m.props.groupable && !m.props.individualGroupable) {
        var b = m.props.target;
        b && v.indexOf(b) > -1 && (h = M({}, m.state));
      }
      return ct.createElement(hc, M({ key: "group", ref: br(this, "moveable") }, g, (e = s.groupableProps) !== null && e !== void 0 ? e : {}, { target: null, targets: v, targetGroups: S, firstRenderState: h }));
    } else {
      var E = v[0];
      if (m && (m.props.groupable || m.props.individualGroupable)) {
        var D = m.moveables || [], C = Ht(D, function(y) {
          return y.props.target === E;
        });
        C && (h = M({}, C.state));
      }
      return ct.createElement(Hr, M({ key: "single", ref: br(this, "moveable") }, g, { target: E, firstRenderState: h }));
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
    var n = this.refTargets, a = Sa(this.props.target || this.props.targets), i = typeof document < "u", o = os(n, a), s = this.selectorMap, u = {};
    return this.refTargets.forEach(function f(l) {
      if (ar(l)) {
        var v = s[l];
        v ? u[l] = s[l] : i && (o = !0, u[l] = [].slice.call(document.querySelectorAll(l)));
      } else wt(l) && l.forEach(f);
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
    var f = R(this._updateRefs(), 3), l = f[0], v = f[1], c = f[2];
    this.refTargets = l, this.selectorMap = v, c && this.forceUpdate();
  }, r.defaultAbles = [], r.customStyledMap = {}, r.defaultStyled = null, Yu([
    As(af)
  ], r.prototype, "moveable", void 0), r;
}(ct.PureComponent), Wn = /* @__PURE__ */ function(t) {
  le(r, t);
  function r() {
    return t !== null && t.apply(this, arguments) || this;
  }
  return r.defaultAbles = pc, r;
}(xc);
function Sc({ cmn: { styChild: t, sys: r, isDesignMode: e, sty4Moveable: n }, fn: a }) {
  const i = (f) => r.cfg.searchPath(f, ys.SP_GSM), o = (f) => {
    f.button == 1 && console.log("fn:GrpLayer.tsx line:28 MIDDLE:");
  }, s = ct.useRef(null), u = (f, l) => {
    ss(), f.transform = l;
  };
  return /* @__PURE__ */ Gr(Oe, { children: [
    /* @__PURE__ */ Ut("img", { css: t, src: i(a), ref: s, style: n, onMouseDown: (f) => o(f) }),
    e && /* @__PURE__ */ Ut(
      Wn,
      {
        target: s,
        draggable: !0,
        throttleDrag: 1,
        onDrag: ({ target: { style: f }, transform: l }) => u(f, l),
        resizable: !0,
        keepRatio: !0,
        onResize: ({ target: { style: f }, width: l, height: v, drag: { transform: c } }) => {
          u(f, c), f.width = `${l}px`, f.height = `${v}px`;
        },
        rotatable: !0,
        throttleRotate: 0,
        startDragRotate: 0,
        throttleDragRotate: 0,
        rotationPosition: "top",
        onRotate: ({ target: { style: f }, drag: { transform: l } }) => u(f, l),
        originDraggable: !0,
        onDragOrigin: ({ target: { style: f }, transformOrigin: l, drag: { transform: v } }) => {
          u(f, v), f.transformOrigin = l;
        }
      }
    )
  ] });
}
var bi = function(r, e) {
  var n = arguments;
  if (e == null || !xs.call(e, "css"))
    return ct.createElement.apply(void 0, n);
  var a = n.length, i = new Array(a);
  i[0] = Ss, i[1] = bs(r, e);
  for (var o = 2; o < a; o++)
    i[o] = n[o];
  return ct.createElement.apply(null, i);
};
(function(t) {
  var r;
  r || (r = t.JSX || (t.JSX = {}));
})(bi || (bi = {}));
function re() {
  for (var t = arguments.length, r = new Array(t), e = 0; e < t; e++)
    r[e] = arguments[e];
  return ms(r);
}
function bc({ cmn: { styChild: t, isDesignMode: r, sty4Moveable: e }, str: n }) {
  const a = re`
		padding: 1em 1.5em;
		margin: 2em 0;
		background-color: aquamarine;
		border: dotted 6px #ffa500;

		font-size: xxx-large;
		top: 48%;
		width: 70%;
	`, i = re`
		position: absolute;
		z-index: 1;
		display: inline-block;
		left: 20%;
		top: 20%;

		margin-bottom: 20px;
		padding: 8px;
		border: 2px solid #000000;
		border-radius: 28px;
		background-color: #e2feff;
		text-align: left;
		font-size: 16px;
		font-weight: 400;
		line-height: 1.5;
		color: #000000;

		&:before {
			content: "";
			position: absolute;
			bottom: 0;
			left: 25%;
			border-style: solid;
			border-width: 20px 20px 0 0;
			border-color: #000000 transparent transparent;
			translate: -50% 100%;
			transform: skew(-25deg);
			transform-origin: top;
		}
		&:after {
			content: "";
			position: absolute;
			bottom: 0;
			left: 25%;
			border-style: solid;
			border-width: 15.2px 15.2px 0 0;
			border-color: #e2feff transparent transparent;
			translate: calc(-50% - 0.4px) 100%;
			transform: skew(-25deg);
			transform-origin: top;
		}

		textarea {
			display: block;
			border-radius: 20px;
			border: 2px solid gray;
			outline: none;
			padding: 0 0.3em;
			font-size: xxx-large;
			line-height: 1.2;
			&:focus {
				border-color: #ff9900;
			}
		}
	`, [o, s] = ct.useState("");
  ct.useEffect(() => s(n), [n]);
  const u = ct.useRef(null), f = ct.useRef(null), l = (v, c) => {
    ss(), v.transform = c;
  };
  return /* @__PURE__ */ Gr(Oe, { children: [
    /* @__PURE__ */ Ut("span", { css: [t, a], ref: u, style: e, children: o }),
    r && /* @__PURE__ */ Ut(
      Wn,
      {
        target: u,
        draggable: !0,
        throttleDrag: 1,
        onDrag: ({ target: { style: v }, transform: c }) => l(v, c),
        resizable: !0,
        keepRatio: !1,
        onResize: ({ target: { style: v }, width: c, height: d, drag: { transform: p } }) => {
          l(v, p), v.width = `${c}px`, v.height = `${d}px`;
        },
        rotatable: !0,
        throttleRotate: 0,
        startDragRotate: 0,
        throttleDragRotate: 0,
        rotationPosition: "top",
        onRotate: ({ target: { style: v }, drag: { transform: c } }) => l(v, c),
        originDraggable: !0,
        onDragOrigin: ({ target: { style: v }, transformOrigin: c, drag: { transform: d } }) => {
          l(v, d), v.transformOrigin = c;
        }
      }
    ),
    r && /* @__PURE__ */ Gr(Oe, { children: [
      /* @__PURE__ */ Gr("label", { css: i, ref: f, children: [
        "テキスト入力",
        /* @__PURE__ */ Ut("textarea", { rows: 3, value: o, onChange: (v) => s(v.target.value) })
      ] }),
      /* @__PURE__ */ Ut(
        Wn,
        {
          target: f,
          origin: !1,
          draggable: !0,
          throttleDrag: 1,
          onDrag: ({ target: { style: v }, transform: c }) => l(v, c),
          preventDefault: !1
        }
      )
    ] })
  ] });
}
function Cc({
  arg: { sys: t },
  onClick: r,
  after: e,
  before: n
}) {
  const a = Oa((x) => x.aLay), i = Oa((x) => x.replace);
  class o extends Cs {
    nm = "Stage";
    restore() {
      i(this.stt);
    }
    // this.stt から
  }
  t.caretaker.update(() => new o(JSON.stringify(a)));
  const [s, u] = ct.useState(Di());
  za(() => {
    function x() {
      u(Di());
    }
    return globalThis.addEventListener("resize", x), () => globalThis.removeEventListener("resize", x);
  });
  const { cvsScale: f } = Dc(s), l = re`
		position: relative;

		transform-origin: left top;
		transform: scale(${f});
		width	: calc(${Wt.stageW}px / ${f});
		height	: calc(${Wt.stageH}px / ${f});
	`, v = re`position: absolute; top: 0; left: 0;`, c = re`
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
	`, d = ct.useRef(null);
  za(() => {
    const x = d.current;
    x.addEventListener("mousedown", () => Hn = !1);
    const S = (b) => {
      b.preventDefault(), b.deltaY < 0 ? e() : n();
    };
    return x.addEventListener("wheel", S, { passive: !1 }), () => x.removeEventListener("wheel", S);
  });
  const [p, g] = Ms(!1), h = Rs((x) => {
    x.stopPropagation(), Ds(), !Hn && (g(), Es(!p));
  }, { isPreventDefault: !0, delay: 300 }), m = { cmn: { sys: t, styChild: v, isDesignMode: p, sty4Moveable: {
    maxWidth: "auto",
    maxHeight: "auto",
    minWidth: "auto",
    minHeight: "auto",
    transform: "translate(0px, 0px) rotate(0deg)"
  } } };
  return /* @__PURE__ */ Gr("div", { css: l, onClick: r, ...h, ref: d, children: [
    p && /* @__PURE__ */ Gr(Oe, { children: [
      /* @__PURE__ */ Ut("button", { onClick: () => {
      }, css: c, children: "Click" }),
      /* @__PURE__ */ Ut("button", { onClick: () => {
      }, css: c, children: "Back" }),
      /* @__PURE__ */ Ut("button", { onClick: () => {
      }, css: c, children: "Prev" })
    ] }),
    a.map((x) => x.cls === "GRP" ? /* @__PURE__ */ Ut(Sc, { cmn: m.cmn, fn: x.fn }, x.nm) : /* @__PURE__ */ Ut(bc, { cmn: m.cmn, str: x.str }, x.nm))
  ] });
}
function Dc({ width: t, height: r }) {
  let e = 0, n = 0, a = 1;
  return Wt.stageW > t || Wt.stageH > r ? (Wt.stageW / Wt.stageH <= t / r ? (n = r, e = Pa(Wt.stageW / Wt.stageH * r)) : (e = t, n = Pa(Wt.stageH / Wt.stageW * t)), a = e / Wt.stageW) : (e = Wt.stageW, n = Wt.stageH, a = 1), { cvsScale: a, cvsWidth: e, cvsHeight: n };
}
function Di() {
  const { innerWidth: t, innerHeight: r } = globalThis;
  return { width: t, height: r };
}
let Hn = !1;
const ss = () => {
  Hn = !0;
};
export {
  Cc as default,
  ss as noticeDrag
};
//# sourceMappingURL=Stage.js.map
