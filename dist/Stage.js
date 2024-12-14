import { a as ht, o as vs, b as ps, u as Si, j as Te, c as tr, F as Nn, s as ds, h as gs, d as hs, f as ms, g as wa, i as xs, k as Ss } from "./Main.js";
import { S as Ds, C as Wt, B as bs, u as Ta } from "./web2.js";
var Es = function(t, r) {
  return typeof r == "boolean" ? r : !t;
}, ys = function(t) {
  return ht.useReducer(Es, t);
}, Cs = function(t) {
  return "touches" in t;
}, Oa = function(t) {
  Cs(t) && t.touches.length < 2 && t.preventDefault && t.preventDefault();
}, _s = function(t, r) {
  var e = r === void 0 ? {} : r, n = e.isPreventDefault, a = n === void 0 ? !0 : n, i = e.delay, o = i === void 0 ? 300 : i, s = ht.useRef(), u = ht.useRef(), f = ht.useCallback(function(v) {
    a && v.target && (vs(v.target, "touchend", Oa, { passive: !1 }), u.current = v.target), s.current = setTimeout(function() {
      return t(v);
    }, o);
  }, [t, o, a]), l = ht.useCallback(function() {
    s.current && clearTimeout(s.current), a && u.current && ps(u.current, "touchend", Oa);
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
}, Ms = function(t) {
  Si(function() {
    t();
  });
};
function Wn(t, r) {
  for (var e = t.length, n = 0; n < e; ++n)
    if (r(t[n], n))
      return !0;
  return !1;
}
function Di(t, r) {
  for (var e = t.length, n = 0; n < e; ++n)
    if (r(t[n], n))
      return t[n];
  return null;
}
function bi(t) {
  var r = t;
  if (typeof r > "u") {
    if (typeof navigator > "u" || !navigator)
      return "";
    r = navigator.userAgent || "";
  }
  return r.toLowerCase();
}
function Hn(t, r) {
  try {
    return new RegExp(t, "g").exec(r);
  } catch {
    return null;
  }
}
function Rs() {
  if (typeof navigator > "u" || !navigator || !navigator.userAgentData)
    return !1;
  var t = navigator.userAgentData, r = t.brands || t.uaList;
  return !!(r && r.length);
}
function ws(t, r) {
  var e = Hn("(" + t + ")((?:\\/|\\s|:)([0-9|\\.|_]+))", r);
  return e ? e[3] : "";
}
function dn(t) {
  return t.replace(/_/g, ".");
}
function Vr(t, r) {
  var e = null, n = "-1";
  return Wn(t, function(a) {
    var i = Hn("(" + a.test + ")((?:\\/|\\s|:)([0-9|\\.|_]+))?", r);
    return !i || a.brand ? !1 : (e = a, n = i[3] || "-1", a.versionAlias ? n = a.versionAlias : a.versionTest && (n = ws(a.versionTest.toLowerCase(), r) || n), n = dn(n), !0);
  }), {
    preset: e,
    version: n
  };
}
function pe(t, r) {
  var e = {
    brand: "",
    version: "-1"
  };
  return Wn(t, function(n) {
    var a = Ei(r, n);
    return a ? (e.brand = n.id, e.version = n.versionAlias || a.version, e.version !== "-1") : !1;
  }), e;
}
function Ei(t, r) {
  return Di(t, function(e) {
    var n = e.brand;
    return Hn("" + r.test, n.toLowerCase());
  });
}
var yi = [{
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
}], Ci = [{
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
}], gn = [{
  test: "applewebkit",
  id: "webkit",
  versionTest: "applewebkit|safari"
}], _i = [{
  test: "(?=(iphone|ipad))(?!(.*version))",
  id: "webview"
}, {
  test: "(?=(android|iphone|ipad))(?=.*(naver|daum|; wv))",
  id: "webview"
}, {
  // test webview
  test: "webview",
  id: "webview"
}], Mi = [{
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
function Ri(t) {
  return !!Vr(_i, t).preset;
}
function Ts(t) {
  var r = bi(t), e = !!/mobi/g.exec(r), n = {
    name: "unknown",
    version: "-1",
    majorVersion: -1,
    webview: Ri(r),
    chromium: !1,
    chromiumVersion: "-1",
    webkit: !1,
    webkitVersion: "-1"
  }, a = {
    name: "unknown",
    version: "-1",
    majorVersion: -1
  }, i = Vr(yi, r), o = i.preset, s = i.version, u = Vr(Mi, r), f = u.preset, l = u.version, v = Vr(Ci, r);
  if (n.chromium = !!v.preset, n.chromiumVersion = v.version, !n.chromium) {
    var c = Vr(gn, r);
    n.webkit = !!c.preset, n.webkitVersion = c.version;
  }
  return f && (a.name = f.id, a.version = l, a.majorVersion = parseInt(l, 10)), o && (n.name = o.id, n.version = s, n.webview && a.name === "ios" && n.name !== "safari" && (n.webview = !1)), n.majorVersion = parseInt(n.version, 10), {
    browser: n,
    os: a,
    isMobile: e,
    isHints: !1
  };
}
function Os(t) {
  var r = navigator.userAgentData, e = (r.uaList || r.brands).slice(), n = r.mobile || !1, a = e[0], i = (r.platform || navigator.platform).toLowerCase(), o = {
    name: a.brand,
    version: a.version,
    majorVersion: -1,
    webkit: !1,
    webkitVersion: "-1",
    chromium: !1,
    chromiumVersion: "-1",
    webview: !!pe(_i, e).brand || Ri(bi())
  }, s = {
    name: "unknown",
    version: "-1",
    majorVersion: -1
  };
  o.webkit = !o.chromium && Wn(gn, function(c) {
    return Ei(e, c);
  });
  var u = pe(Ci, e);
  if (o.chromium = !!u.brand, o.chromiumVersion = u.version || "-1", !o.chromium) {
    var f = pe(gn, e);
    o.webkit = !!f.brand, o.webkitVersion = f.version || "-1";
  }
  var l = Di(Mi, function(c) {
    return new RegExp("" + c.test, "g").exec(i);
  });
  s.name = l ? l.id : "";
  {
    var v = pe(yi, e);
    o.name = v.brand || o.name, o.version = v.brand && t ? t.uaFullVersion : v.version;
  }
  return o.webkit && (s.name = n ? "ios" : "mac"), s.name === "ios" && o.webview && (o.version = "-1"), s.version = dn(s.version), o.version = dn(o.version), s.majorVersion = parseInt(s.version, 10), o.majorVersion = parseInt(o.version, 10), {
    browser: o,
    os: s,
    isMobile: n,
    isHints: !0
  };
}
function Ps(t) {
  return Rs() ? Os() : Ts(t);
}
function Is(t) {
  for (var r = [], e = 1; e < arguments.length; e++)
    r[e - 1] = arguments[e];
  return r.map(function(n) {
    return n.split(" ").map(function(a) {
      return a ? "" + t + a : "";
    }).join(" ");
  }).join(" ");
}
function zs(t, r) {
  return r.replace(/([^}{]*){/gm, function(e, n) {
    return n.replace(/\.([^{,\s\d.]+)/g, "." + t + "$1") + "{";
  });
}
function Dr(t, r) {
  return function(e) {
    e && (t[r] = e);
  };
}
function wi(t, r, e) {
  return function(n) {
    n && (t[r][e] = n);
  };
}
function Gs(t, r) {
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
var Bs = "function", As = "object", ks = "string", Fs = "number", Ln = "undefined", Ti = typeof window !== Ln, Ns = typeof document !== Ln && document, Ws = [{
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
}], Et = 1e-7, de = {
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
function Hs() {
  for (var t = 0, r = 0, e = arguments.length; r < e; r++) t += arguments[r].length;
  for (var n = Array(t), a = 0, r = 0; r < e; r++) for (var i = arguments[r], o = 0, s = i.length; o < s; o++, a++) n[a] = i[o];
  return n;
}
function Oe(t, r, e, n) {
  return (t * n + r * e) / (e + n);
}
function Yn(t) {
  return typeof t === Ln;
}
function $t(t) {
  return t && typeof t === As;
}
function Rt(t) {
  return Array.isArray(t);
}
function ar(t) {
  return typeof t === ks;
}
function te(t) {
  return typeof t === Fs;
}
function Xn(t) {
  return typeof t === Bs;
}
function Ls(t, r) {
  var e = t === "" || t == " ", n = r === "" || r == " ";
  return n && e || t === r;
}
function Oi(t, r, e, n, a) {
  var i = Vn(t, r, e);
  return i ? e : Ys(t, r, e + 1, n, a);
}
function Vn(t, r, e) {
  if (!t.ignore)
    return null;
  var n = r.slice(Math.max(e - 3, 0), e + 3).join("");
  return new RegExp(t.ignore).exec(n);
}
function Ys(t, r, e, n, a) {
  for (var i = function(f) {
    var l = r[f].trim();
    if (l === t.close && !Vn(t, r, f))
      return {
        value: f
      };
    var v = f, c = Ht(a, function(p) {
      var d = p.open;
      return d === l;
    });
    if (c && (v = Oi(c, r, f, n, a)), v === -1)
      return o = f, "break";
    f = v, o = f;
  }, o, s = e; s < n; ++s) {
    var u = i(s);
    if (s = o, typeof u == "object") return u.value;
    if (u === "break") break;
  }
  return -1;
}
function qn(t, r) {
  var e = ar(r) ? {
    separator: r
  } : r, n = e.separator, a = n === void 0 ? "," : n, i = e.isSeparateFirst, o = e.isSeparateOnlyOpenClose, s = e.isSeparateOpenClose, u = s === void 0 ? o : s, f = e.openCloseCharacters, l = f === void 0 ? Ws : f, v = l.map(function(C) {
    var y = C.open, _ = C.close;
    return y === _ ? y : y + "|" + _;
  }).join("|"), c = "(\\s*" + a + "\\s*|" + v + "|\\s+)", p = new RegExp(c, "g"), d = t.split(p).filter(function(C) {
    return C && C !== "undefined";
  }), g = d.length, h = [], m = [];
  function x() {
    return m.length ? (h.push(m.join("")), m = [], !0) : !1;
  }
  for (var S = function(C) {
    var y = d[C].trim(), _ = C, R = Ht(l, function(T) {
      var I = T.open;
      return I === y;
    }), P = Ht(l, function(T) {
      var I = T.close;
      return I === y;
    });
    if (R) {
      if (_ = Oi(R, d, C, g, l), _ !== -1 && u)
        return x() && i || (h.push(d.slice(C, _ + 1).join("")), C = _, i) ? (D = C, "break") : (D = C, "continue");
    } else if (P && !Vn(P, d, C)) {
      var O = Hs(l);
      return O.splice(l.indexOf(P), 1), {
        value: qn(t, {
          separator: a,
          isSeparateFirst: i,
          isSeparateOnlyOpenClose: o,
          isSeparateOpenClose: u,
          openCloseCharacters: O
        })
      };
    } else if (Ls(y, a) && !o)
      return x(), i ? (D = C, "break") : (D = C, "continue");
    _ === -1 && (_ = g - 1), m.push(d.slice(C, _ + 1).join("")), C = _, D = C;
  }, D, E = 0; E < g; ++E) {
    var b = S(E);
    if (E = D, typeof b == "object") return b.value;
    if (b === "break") break;
  }
  return m.length && h.push(m.join("")), h;
}
function cr(t) {
  return qn(t, "");
}
function Sr(t) {
  return qn(t, ",");
}
function Pi(t) {
  var r = /([^(]*)\(([\s\S]*)\)([\s\S]*)/g.exec(t);
  return !r || r.length < 4 ? {} : {
    prefix: r[1],
    value: r[2],
    suffix: r[3]
  };
}
function ie(t) {
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
function Xs(t, r) {
  return t.replace(/([a-z])([A-Z])/g, function(e, n, a) {
    return "" + n + r + a.toLowerCase();
  });
}
function re() {
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
var Ii = /* @__PURE__ */ function() {
  var t = re(), r = Ti && (window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.msRequestAnimationFrame);
  return r ? r.bind(window) : function(e) {
    var n = re(), a = setTimeout(function() {
      e(n - t);
    }, 1e3 / 60);
    return a;
  };
}(), Vs = /* @__PURE__ */ function() {
  var t = Ti && (window.cancelAnimationFrame || window.webkitCancelAnimationFrame || window.mozCancelAnimationFrame || window.msCancelAnimationFrame);
  return t ? t.bind(window) : function(r) {
    clearTimeout(r);
  };
}();
function Hr(t) {
  return Object.keys(t);
}
function vt(t, r) {
  var e = ie(t), n = e.value, a = e.unit;
  if ($t(r)) {
    var i = r[a];
    if (i) {
      if (Xn(i))
        return i(n);
      if (de[a])
        return de[a](n, i);
    }
  } else if (a === "%")
    return n * r / 100;
  return de[a] ? de[a](n) : n;
}
function hn(t, r, e) {
  return Math.max(r, Math.min(t, e));
}
function Pa(t, r, e, n) {
  return n === void 0 && (n = t[0] / t[1]), [[tt(r[0], Et), tt(r[0] / n, Et)], [tt(r[1] * n, Et), tt(r[1], Et)]].filter(function(a) {
    return a.every(function(i, o) {
      var s = r[o], u = tt(s, Et);
      return e ? i <= s || i <= u : i >= s || i >= u;
    });
  })[0] || t;
}
function zi(t, r, e, n) {
  if (!n)
    return t.map(function(p, d) {
      return hn(p, r[d], e[d]);
    });
  var a = t[0], i = t[1], o = n === !0 ? a / i : n, s = Pa(t, r, !1, o), u = s[0], f = s[1], l = Pa(t, e, !0, o), v = l[0], c = l[1];
  return a < u || i < f ? (a = u, i = f) : (a > v || i > c) && (a = v, i = c), [a, i];
}
function qs(t) {
  for (var r = t.length, e = 0, n = r - 1; n >= 0; --n)
    e += t[n];
  return e;
}
function mn(t) {
  for (var r = t.length, e = 0, n = r - 1; n >= 0; --n)
    e += t[n];
  return r ? e / r : 0;
}
function St(t, r) {
  var e = r[0] - t[0], n = r[1] - t[1], a = Math.atan2(n, e);
  return a >= 0 ? a : a + Math.PI * 2;
}
function js(t) {
  return [0, 1].map(function(r) {
    return mn(t.map(function(e) {
      return e[r];
    }));
  });
}
function Ia(t) {
  var r = js(t), e = St(r, t[0]), n = St(r, t[1]);
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
function za(t, r) {
  return t.forEach(function(e, n) {
    t[n] = tt(t[n], r);
  }), t;
}
function Us(t) {
  for (var r = [], e = 0; e < t; ++e)
    r.push(e);
  return r;
}
function $s(t) {
  return t.reduce(function(r, e) {
    return r.concat(e);
  }, []);
}
function Ct(t, r) {
  return t.classList ? t.classList.contains(r) : !!t.className.match(new RegExp("(\\s|^)" + r + "(\\s|$)"));
}
function Gi(t, r) {
  t.classList ? t.classList.add(r) : t.className += " " + r;
}
function Bi(t, r) {
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
function wt(t, r, e, n) {
  t.removeEventListener(r, e, n);
}
function jn(t) {
  return t?.ownerDocument || Ns;
}
function Un(t) {
  return jn(t).documentElement;
}
function dr(t) {
  return jn(t).body;
}
function lr(t) {
  var r;
  return ((r = t?.ownerDocument) === null || r === void 0 ? void 0 : r.defaultView) || window;
}
function Ai(t) {
  return t && "postMessage" in t && "blur" in t && "self" in t;
}
function $n(t) {
  return $t(t) && t.nodeName && t.nodeType && "ownerDocument" in t;
}
function Zs(t, r, e, n, a, i) {
  for (var o = 0; o < a; ++o) {
    var s = e + o * a, u = n + o * a;
    t[s] += t[u] * i, r[s] += r[u] * i;
  }
}
function Ks(t, r, e, n, a) {
  for (var i = 0; i < a; ++i) {
    var o = e + i * a, s = n + i * a, u = t[o], f = r[o];
    t[o] = t[s], t[s] = u, r[o] = r[s], r[s] = f;
  }
}
function Js(t, r, e, n, a) {
  for (var i = 0; i < n; ++i) {
    var o = e + i * n;
    t[o] /= a, r[o] /= a;
  }
}
function ki(t, r, e) {
  for (var n = t.slice(), a = 0; a < e; ++a)
    n[a * e + r - 1] = 0, n[(r - 1) * e + a] = 0;
  return n[(r - 1) * (e + 1)] = 1, n;
}
function Jt(t, r) {
  r === void 0 && (r = Math.sqrt(t.length));
  for (var e = t.slice(), n = mt(r), a = 0; a < r; ++a) {
    var i = r * a + a;
    if (!tt(e[i], Et)) {
      for (var o = a + 1; o < r; ++o)
        if (e[r * a + o]) {
          Ks(e, n, a, o, r);
          break;
        }
    }
    if (!tt(e[i], Et))
      return [];
    Js(e, n, a, r, e[i]);
    for (var o = 0; o < r; ++o) {
      var s = o, u = o + a * r, f = e[u];
      !tt(f, Et) || a === o || Zs(e, n, s, a, r, -f);
    }
  }
  return n;
}
function Qs(t, r) {
  r === void 0 && (r = Math.sqrt(t.length));
  for (var e = [], n = 0; n < r; ++n)
    for (var a = 0; a < r; ++a)
      e[a * r + n] = t[r * n + a];
  return e;
}
function Fi(t, r) {
  r === void 0 && (r = Math.sqrt(t.length));
  for (var e = [], n = t[r * r - 1], a = 0; a < r - 1; ++a)
    e[a] = t[r * (r - 1) + a] / n;
  return e[r - 1] = 0, e;
}
function tu(t, r) {
  for (var e = mt(r), n = 0; n < r - 1; ++n)
    e[r * (r - 1) + n] = t[n] || 0;
  return e;
}
function br(t, r) {
  for (var e = t.slice(), n = t.length; n < r - 1; ++n)
    e[n] = 0;
  return e[r - 1] = 1, e;
}
function Zt(t, r, e) {
  if (r === void 0 && (r = Math.sqrt(t.length)), r === e)
    return t;
  for (var n = mt(e), a = Math.min(r, e), i = 0; i < a - 1; ++i) {
    for (var o = 0; o < a - 1; ++o)
      n[i * e + o] = t[i * r + o];
    n[(i + 1) * e - 1] = t[(i + 1) * r - 1], n[(e - 1) * e + i] = t[(r - 1) * r + i];
  }
  return n[e * e - 1] = t[r * r - 1], n;
}
function Pe(t) {
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
function ru(t, r) {
  return r === void 0 && (r = t.length === 6), r ? [t[0], t[1], 0, t[2], t[3], 0, t[4], t[5], 1] : t;
}
function Ni(t, r) {
  return r === void 0 && (r = t.length === 9), r ? [t[0], t[1], t[3], t[4], t[6], t[7]] : t;
}
function Pt(t, r, e) {
  e === void 0 && (e = r.length);
  var n = pt(t, r, e), a = n[e - 1];
  return n.map(function(i) {
    return i / a;
  });
}
function eu(t, r) {
  return pt(t, [1, 0, 0, 0, 0, Math.cos(r), Math.sin(r), 0, 0, -Math.sin(r), Math.cos(r), 0, 0, 0, 0, 1], 4);
}
function nu(t, r) {
  return pt(t, [Math.cos(r), 0, -Math.sin(r), 0, 0, 1, 0, 0, Math.sin(r), 0, Math.cos(r), 0, 0, 0, 0, 1], 4);
}
function au(t, r) {
  return pt(t, se(r, 4));
}
function ge(t, r) {
  var e = r[0], n = e === void 0 ? 1 : e, a = r[1], i = a === void 0 ? 1 : a, o = r[2], s = o === void 0 ? 1 : o;
  return pt(t, [n, 0, 0, 0, 0, i, 0, 0, 0, 0, s, 0, 0, 0, 0, 1], 4);
}
function oe(t, r) {
  return Pt(se(r, 3), br(t, 3));
}
function tn(t, r) {
  var e = r[0], n = e === void 0 ? 0 : e, a = r[1], i = a === void 0 ? 0 : a, o = r[2], s = o === void 0 ? 0 : o;
  return pt(t, [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, n, i, s, 1], 4);
}
function Ga(t, r) {
  return pt(t, r, 4);
}
function se(t, r) {
  var e = Math.cos(t), n = Math.sin(t), a = mt(r);
  return a[0] = e, a[1] = n, a[r] = -n, a[r + 1] = e, a;
}
function mt(t) {
  for (var r = t * t, e = [], n = 0; n < r; ++n)
    e[n] = n % (t + 1) ? 0 : 1;
  return e;
}
function Zn(t, r) {
  for (var e = mt(r), n = Math.min(t.length, r - 1), a = 0; a < n; ++a)
    e[(r + 1) * a] = t[a];
  return e;
}
function Er(t, r) {
  for (var e = mt(r), n = Math.min(t.length, r - 1), a = 0; a < n; ++a)
    e[r * (r - 1) + a] = t[a];
  return e;
}
function Kn(t, r, e, n, a, i, o, s) {
  var u = t[0], f = t[1], l = r[0], v = r[1], c = e[0], p = e[1], d = n[0], g = n[1], h = a[0], m = a[1], x = i[0], S = i[1], D = o[0], E = o[1], b = s[0], C = s[1], y = [u, 0, l, 0, c, 0, d, 0, f, 0, v, 0, p, 0, g, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, u, 0, l, 0, c, 0, d, 0, f, 0, v, 0, p, 0, g, 0, 1, 0, 1, 0, 1, 0, 1, -h * u, -m * u, -x * l, -S * l, -D * c, -E * c, -b * d, -C * d, -h * f, -m * f, -x * v, -S * v, -D * p, -E * p, -b * g, -C * g], _ = Jt(y, 8);
  if (!_.length)
    return [];
  var R = pt(_, [h, m, x, S, D, E, b, C], 8);
  return R[8] = 1, Zt(Qs(R), 3, 4);
}
var Ur = function() {
  return Ur = Object.assign || function(r) {
    for (var e, n = 1, a = arguments.length; n < a; n++) {
      e = arguments[n];
      for (var i in e) Object.prototype.hasOwnProperty.call(e, i) && (r[i] = e[i]);
    }
    return r;
  }, Ur.apply(this, arguments);
};
function iu() {
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
function ee(t, r) {
  return r === void 0 && (r = 0), wr(Br(t, r));
}
function ou(t, r) {
  var e = Pt(t, [r[0], r[1] || 0, r[2] || 0, 1], 4), n = e[3] || 1;
  return [
    e[0] / n,
    e[1] / n,
    e[2] / n
  ];
}
function wr(t) {
  var r = iu();
  return t.forEach(function(e) {
    var n = e.matrixFunction, a = e.functionValue;
    n && (r = n(r, a));
  }), r;
}
function Br(t, r) {
  r === void 0 && (r = 0);
  var e = Rt(t) ? t : cr(t);
  return e.map(function(n) {
    var a = Pi(n), i = a.prefix, o = a.value, s = null, u = i, f = "";
    if (i === "translate" || i === "translateX" || i === "translate3d") {
      var l = $t(r) ? Ur(Ur({}, r), { "o%": r["%"] }) : {
        "%": r,
        "o%": r
      }, v = Sr(o).map(function(T, I) {
        return I === 0 && "x%" in l ? l["%"] = r["x%"] : I === 1 && "y%" in l ? l["%"] = r["y%"] : l["%"] = r["o%"], vt(T, l);
      }), c = v[0], p = v[1], d = p === void 0 ? 0 : p, g = v[2], h = g === void 0 ? 0 : g;
      s = tn, f = [c, d, h];
    } else if (i === "translateY") {
      var m = $t(r) ? Ur({ "%": r["y%"] }, r) : {
        "%": r
      }, d = vt(o, m);
      s = tn, f = [0, d, 0];
    } else if (i === "translateZ") {
      var h = parseFloat(o);
      s = tn, f = [0, 0, h];
    } else if (i === "scale" || i === "scale3d") {
      var x = Sr(o).map(function(T) {
        return parseFloat(T);
      }), S = x[0], D = x[1], E = D === void 0 ? S : D, b = x[2], C = b === void 0 ? 1 : b;
      s = ge, f = [S, E, C];
    } else if (i === "scaleX") {
      var S = parseFloat(o);
      s = ge, f = [S, 1, 1];
    } else if (i === "scaleY") {
      var E = parseFloat(o);
      s = ge, f = [1, E, 1];
    } else if (i === "scaleZ") {
      var C = parseFloat(o);
      s = ge, f = [1, 1, C];
    } else if (i === "rotate" || i === "rotateZ" || i === "rotateX" || i === "rotateY") {
      var y = ie(o), _ = y.unit, R = y.value, P = _ === "rad" ? R : R * Math.PI / 180;
      i === "rotate" || i === "rotateZ" ? (u = "rotateZ", s = au) : i === "rotateX" ? s = eu : i === "rotateY" && (s = nu), f = P;
    } else if (i === "matrix3d")
      s = Ga, f = Sr(o).map(function(T) {
        return parseFloat(T);
      });
    else if (i === "matrix") {
      var O = Sr(o).map(function(T) {
        return parseFloat(T);
      });
      s = Ga, f = [
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
var su = /* @__PURE__ */ function() {
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
}(), uu = /* @__PURE__ */ function() {
  function t() {
    this.object = {};
  }
  var r = t.prototype;
  return r.get = function(e) {
    return this.object[e];
  }, r.set = function(e, n) {
    this.object[e] = n;
  }, t;
}(), fu = typeof Map == "function", lu = /* @__PURE__ */ function() {
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
function cu(t, r) {
  var e = [], n = [];
  return t.forEach(function(a) {
    var i = a[0], o = a[1], s = new lu();
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
var vu = /* @__PURE__ */ function() {
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
    var e = cu(this.changedBeforeAdded, this.fixed), n = this.changed, a = [];
    this.cacheOrdered = e.filter(function(i, o) {
      var s = i[0], u = i[1], f = n[o], l = f[0], v = f[1];
      if (s !== u)
        return a.push([l, v]), !0;
    }), this.cachePureChanged = a;
  }, t;
}();
function Jn(t, r, e) {
  var n = fu ? Map : e ? uu : su, a = e || function(x) {
    return x;
  }, i = [], o = [], s = [], u = t.map(a), f = r.map(a), l = new n(), v = new n(), c = [], p = [], d = {}, g = [], h = 0, m = 0;
  return u.forEach(function(x, S) {
    l.set(x, S);
  }), f.forEach(function(x, S) {
    v.set(x, S);
  }), u.forEach(function(x, S) {
    var D = v.get(x);
    typeof D > "u" ? (++m, o.push(S)) : d[D] = m;
  }), f.forEach(function(x, S) {
    var D = l.get(x);
    typeof D > "u" ? (i.push(S), ++h) : (s.push([D, S]), m = d[S] || 0, c.push([D - m, S - h]), p.push(S === D), D !== S && g.push([D, S]));
  }), o.reverse(), new vu(t, r, i, o, g, s, c, p);
}
var pu = /* @__PURE__ */ function() {
  function t(e, n) {
    e === void 0 && (e = []), this.findKeyCallback = n, this.list = [].slice.call(e);
  }
  var r = t.prototype;
  return r.update = function(e) {
    var n = [].slice.call(e), a = Jn(this.list, n, this.findKeyCallback);
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
var xn = function(t, r) {
  return xn = Object.setPrototypeOf || {
    __proto__: []
  } instanceof Array && function(e, n) {
    e.__proto__ = n;
  } || function(e, n) {
    for (var a in n) n.hasOwnProperty(a) && (e[a] = n[a]);
  }, xn(t, r);
};
function du(t, r) {
  xn(t, r);
  function e() {
    this.constructor = t;
  }
  t.prototype = r === null ? Object.create(r) : (e.prototype = r.prototype, new e());
}
var Wi = typeof Map == "function" ? void 0 : /* @__PURE__ */ function() {
  var t = 0;
  return function(r) {
    return r.__DIFF_KEY__ || (r.__DIFF_KEY__ = ++t);
  };
}(), Hi = /* @__PURE__ */ function(t) {
  du(r, t);
  function r(e) {
    return e === void 0 && (e = []), t.call(this, e, Wi) || this;
  }
  return r;
}(pu);
function gu(t, r) {
  return Jn(t, r, Wi);
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
var Sn = function() {
  return Sn = Object.assign || function(r) {
    for (var e, n = 1, a = arguments.length; n < a; n++) {
      e = arguments[n];
      for (var i in e) Object.prototype.hasOwnProperty.call(e, i) && (r[i] = e[i]);
    }
    return r;
  }, Sn.apply(this, arguments);
};
function hu() {
  for (var t = 0, r = 0, e = arguments.length; r < e; r++) t += arguments[r].length;
  for (var n = Array(t), a = 0, r = 0; r < e; r++) for (var i = arguments[r], o = 0, s = i.length; o < s; o++, a++) n[a] = i[o];
  return n;
}
var Qn = /* @__PURE__ */ function() {
  function t() {
    this._events = {};
  }
  var r = t.prototype;
  return r.on = function(e, n) {
    if ($t(e))
      for (var a in e)
        this.on(a, e[a]);
    else
      this._addEvent(e, n, {});
    return this;
  }, r.off = function(e, n) {
    if (!e)
      this._events = {};
    else if ($t(e))
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
    }, n.currentTarget = this, hu(i).forEach(function(s) {
      s.listener(n), s.once && a.off(e, s.listener);
    }), !o;
  }, r.trigger = function(e, n) {
    return n === void 0 && (n = {}), this.emit(e, n);
  }, r._addEvent = function(e, n, a) {
    var i = this._events;
    i[e] = i[e] || [];
    var o = i[e];
    o.push(Sn({
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
function mu(t, r) {
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
function xu(t) {
  var r = t.container;
  return r === document.body ? [r.scrollLeft || document.documentElement.scrollLeft, r.scrollTop || document.documentElement.scrollTop] : [r.scrollLeft, r.scrollTop];
}
function Ba(t, r) {
  return t.addEventListener("scroll", r), function() {
    t.removeEventListener("scroll", r);
  };
}
function he(t) {
  if (t) {
    if (ar(t))
      return document.querySelector(t);
  } else return null;
  if (Xn(t))
    return t();
  if (t instanceof Element)
    return t;
  if ("current" in t)
    return t.current;
  if ("value" in t)
    return t.value;
}
var Su = /* @__PURE__ */ function(t) {
  mu(r, t);
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
    var i = he(a.container);
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
    var i = n.prevScrollPos, o = i === void 0 ? this._prevScrollPos : i, s = n.direction, u = n.throttleTime, f = u === void 0 ? 0 : u, l = n.inputEvent, v = n.isDrag, c = this._getScrollPosition(s || [0, 0], n), p = c[0] - o[0], d = c[1] - o[1], g = s || [p ? Math.abs(p) / p : 0, d ? Math.abs(d) / d : 0];
    return this._prevScrollPos = c, this._lock = !1, !p && !d ? !1 : (this.emit("move", {
      offsetX: g[0] ? p : 0,
      offsetY: g[1] ? d : 0,
      inputEvent: l
    }), f && v && (clearTimeout(this._timer), this._timer = window.setTimeout(function() {
      a._continueDrag(n);
    }, f)), !0);
  }, e.dragEnd = function() {
    this._flag = !1, this._lock = !1, clearTimeout(this._timer), this._unregisterScrollEvent();
  }, e._getScrollPosition = function(n, a) {
    var i = a.container, o = a.getScrollPosition, s = o === void 0 ? xu : o;
    return s({
      container: he(i),
      direction: n
    });
  }, e._continueDrag = function(n) {
    var a = this, i, o = n.container, s = n.direction, u = n.throttleTime, f = n.useScroll, l = n.isDrag, v = n.inputEvent;
    if (!(!this._flag || l && this._isWait)) {
      var c = re(), p = Math.max(u + this._prevTime - c, 0);
      if (p > 0)
        return clearTimeout(this._timer), this._timer = window.setTimeout(function() {
          a._continueDrag(n);
        }, p), !1;
      this._prevTime = c;
      var d = this._getScrollPosition(s, n);
      this._prevScrollPos = d, l && (this._isWait = !0), f || (this._lock = !0);
      var g = {
        container: he(o),
        direction: s,
        inputEvent: v
      };
      return (i = n.requestScroll) === null || i === void 0 || i.call(n, g), this.emit("scroll", g), this._isWait = !1, f || this.checkScroll(Tr(Tr({}, n), {
        prevScrollPos: d,
        direction: s,
        inputEvent: v
      }));
    }
  }, e._registerScrollEvent = function(n) {
    this._unregisterScrollEvent();
    var a = n.checkScrollEvent;
    if (a) {
      var i = a === !0 ? Ba : a, o = he(n.container);
      a === !0 && (o === document.body || o === document.documentElement) ? this._unregister = Ba(window, this._onScroll) : this._unregister = i(o, this._onScroll);
    }
  }, e._unregisterScrollEvent = function() {
    var n;
    (n = this._unregister) === null || n === void 0 || n.call(this), this._unregister = null;
  }, r;
}(Qn);
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
function Du() {
  for (var t = 0, r = 0, e = arguments.length; r < e; r++) t += arguments[r].length;
  for (var n = Array(t), a = 0, r = 0; r < e; r++) for (var i = arguments[r], o = 0, s = i.length; o < s; o++, a++) n[a] = i[o];
  return n;
}
function Ft(t) {
  return tt(t, Et);
}
function bu(t, r) {
  return t.every(function(e, n) {
    return Ft(e - r[n]) === 0;
  });
}
function Eu(t, r) {
  return !Ft(t[0] - r[0]) && !Ft(t[1] - r[1]);
}
function Li(t) {
  return t.length < 3 ? 0 : Math.abs(qs(t.map(function(r, e) {
    var n = t[e + 1] || t[0];
    return r[0] * n[1] - n[0] * r[1];
  }))) / 2;
}
function Aa(t, r) {
  var e = r.width, n = r.height, a = r.left, i = r.top, o = yr(t), s = o.minX, u = o.minY, f = o.maxX, l = o.maxY, v = e / (f - s), c = n / (l - u);
  return t.map(function(p) {
    return [a + (p[0] - s) * v, i + (p[1] - u) * c];
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
function bn(t, r, e) {
  var n = t[0], a = t[1], i = yr(r), o = i.minX, s = i.maxX, u = [[o, a], [s, a]], f = Ie(u[0], u[1]), l = En(r), v = [];
  if (l.forEach(function(d) {
    var g = Ie(d[0], d[1]), h = d[0];
    if (bu(f, g))
      v.push({
        pos: t,
        line: d,
        type: "line"
      });
    else {
      var m = Yi(ta(f, g), [u, d]);
      m.forEach(function(x) {
        d.some(function(S) {
          return Eu(S, x);
        }) ? v.push({
          pos: x,
          line: d,
          type: "point"
        }) : Ft(h[1] - a) !== 0 && v.push({
          pos: x,
          line: d,
          type: "intersection"
        });
      });
    }
  }), Ht(v, function(d) {
    return d[0] === n;
  }))
    return !0;
  var c = 0, p = {};
  return v.forEach(function(d) {
    var g = d.pos, h = d.type, m = d.line;
    if (!(g[0] > n))
      if (h === "intersection")
        ++c;
      else {
        if (h === "line")
          return;
        if (h === "point") {
          var x = Ht(m, function(E) {
            return E[1] !== a;
          }), S = p[g[0]], D = x[1] > a ? 1 : -1;
          S ? S !== D && ++c : p[g[0]] = D;
        }
      }
  }), c % 2 === 1;
}
function Ie(t, r) {
  var e = t[0], n = t[1], a = r[0], i = r[1], o = a - e, s = i - n;
  Math.abs(o) < Et && (o = 0), Math.abs(s) < Et && (s = 0);
  var u = 0, f = 0, l = 0;
  return o ? s ? (u = -s / o, f = 1, l = -u * e - n) : (f = 1, l = -n) : s && (u = -1, l = e), [u, f, l];
}
function ta(t, r) {
  var e = t[0], n = t[1], a = t[2], i = r[0], o = r[1], s = r[2], u = e === 0 && i === 0, f = n === 0 && o === 0, l = [];
  if (u && f)
    return [];
  if (u) {
    var v = -a / n, c = -s / o;
    return v !== c ? [] : [[-1 / 0, v], [1 / 0, v]];
  } else if (f) {
    var p = -a / e, d = -s / i;
    return p !== d ? [] : [[p, -1 / 0], [p, 1 / 0]];
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
function Yi(t, r) {
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
    var c = v[0], p = v[1];
    return e.every(function(d) {
      return 0 <= Ft(c - d[0][0]) && 0 <= Ft(d[0][1] - c) && 0 <= Ft(p - d[1][0]) && 0 <= Ft(d[1][1] - p);
    });
  })), n.map(function(v) {
    return [Ft(v[0]), Ft(v[1])];
  });
}
function En(t) {
  return Du(t.slice(1), [t[0]]).map(function(r, e) {
    return [t[e], r];
  });
}
function yu(t, r) {
  var e = t.slice(), n = r.slice();
  Ia(e) === -1 && e.reverse(), Ia(n) === -1 && n.reverse();
  var a = En(e), i = En(n), o = a.map(function(l) {
    return Ie(l[0], l[1]);
  }), s = i.map(function(l) {
    return Ie(l[0], l[1]);
  }), u = [];
  o.forEach(function(l, v) {
    var c = a[v], p = [];
    s.forEach(function(d, g) {
      var h = ta(l, d), m = Yi(h, [c, i[g]]);
      p.push.apply(p, m.map(function(x) {
        return {
          index1: v,
          index2: g,
          pos: x,
          type: "intersection"
        };
      }));
    }), p.sort(function(d, g) {
      return rr(c[0], d.pos) - rr(c[0], g.pos);
    }), u.push.apply(u, p), bn(c[1], n) && u.push({
      index1: v,
      index2: -1,
      pos: c[1],
      type: "inside"
    });
  }), i.forEach(function(l, v) {
    if (bn(l[1], e)) {
      var c = !1, p = nr(u, function(d) {
        var g = d.index2;
        return g === v ? (c = !0, !1) : !!c;
      });
      p === -1 && (c = !1, p = nr(u, function(d) {
        var g = d.index1, h = d.index2;
        return g === -1 && h + 1 === v ? (c = !0, !1) : !!c;
      })), p === -1 ? u.push({
        index1: -1,
        index2: v,
        pos: l[1],
        type: "inside"
      }) : u.splice(p, 0, {
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
function Cu(t, r) {
  var e = yu(t, r);
  return e.map(function(n) {
    var a = n.pos;
    return a;
  });
}
function _u(t, r) {
  var e = Cu(t, r);
  return Li(e);
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
var yn = function(t, r) {
  return yn = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(e, n) {
    e.__proto__ = n;
  } || function(e, n) {
    for (var a in n) n.hasOwnProperty(a) && (e[a] = n[a]);
  }, yn(t, r);
};
function Mu(t, r) {
  yn(t, r);
  function e() {
    this.constructor = t;
  }
  t.prototype = r === null ? Object.create(r) : (e.prototype = r.prototype, new e());
}
var bt = function() {
  return bt = Object.assign || function(r) {
    for (var e, n = 1, a = arguments.length; n < a; n++) {
      e = arguments[n];
      for (var i in e) Object.prototype.hasOwnProperty.call(e, i) && (r[i] = e[i]);
    }
    return r;
  }, bt.apply(this, arguments);
};
function Ru(t, r) {
  var e = r[0] - t[0], n = r[1] - t[1], a = Math.atan2(n, e);
  return a >= 0 ? a : a + Math.PI * 2;
}
function rn(t) {
  return Ru([
    t[0].clientX,
    t[0].clientY
  ], [
    t[1].clientX,
    t[1].clientY
  ]) / Math.PI * 180;
}
function wu(t) {
  return t.touches && t.touches.length >= 2;
}
function me(t) {
  return t ? t.touches ? Ou(t.touches) : [Xi(t)] : [];
}
function Tu(t) {
  return t && (t.type.indexOf("mouse") > -1 || "button" in t);
}
function ka(t, r, e) {
  var n = e.length, a = $r(t, n), i = a.clientX, o = a.clientY, s = a.originalClientX, u = a.originalClientY, f = $r(r, n), l = f.clientX, v = f.clientY, c = $r(e, n), p = c.clientX, d = c.clientY, g = i - l, h = o - v, m = i - p, x = o - d;
  return {
    clientX: s,
    clientY: u,
    deltaX: g,
    deltaY: h,
    distX: m,
    distY: x
  };
}
function en(t) {
  return Math.sqrt(Math.pow(t[0].clientX - t[1].clientX, 2) + Math.pow(t[0].clientY - t[1].clientY, 2));
}
function Ou(t) {
  for (var r = Math.min(t.length, 2), e = [], n = 0; n < r; ++n)
    e.push(Xi(t[n]));
  return e;
}
function Xi(t) {
  return {
    clientX: t.clientX,
    clientY: t.clientY
  };
}
function $r(t, r) {
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
var nn = /* @__PURE__ */ function() {
  function t(r) {
    this.prevClients = [], this.startClients = [], this.movement = 0, this.length = 0, this.startClients = r, this.prevClients = r, this.length = r.length;
  }
  return t.prototype.getAngle = function(r) {
    return r === void 0 && (r = this.prevClients), rn(r);
  }, t.prototype.getRotation = function(r) {
    return r === void 0 && (r = this.prevClients), rn(r) - rn(this.startClients);
  }, t.prototype.getPosition = function(r, e) {
    r === void 0 && (r = this.prevClients);
    var n = ka(r || this.prevClients, this.prevClients, this.startClients), a = n.deltaX, i = n.deltaY;
    return this.movement += Math.sqrt(a * a + i * i), this.prevClients = r, n;
  }, t.prototype.getPositions = function(r) {
    r === void 0 && (r = this.prevClients);
    for (var e = this.prevClients, n = this.startClients, a = Math.min(this.length, e.length), i = [], o = 0; o < a; ++o)
      i[o] = ka([r[o]], [e[o]], [n[o]]);
    return i;
  }, t.prototype.getMovement = function(r) {
    var e = this.movement;
    if (!r)
      return e;
    var n = $r(r, this.length), a = $r(this.prevClients, this.length), i = n.clientX - a.clientX, o = n.clientY - a.clientY;
    return Math.sqrt(i * i + o * o) + e;
  }, t.prototype.getDistance = function(r) {
    return r === void 0 && (r = this.prevClients), en(r);
  }, t.prototype.getScale = function(r) {
    return r === void 0 && (r = this.prevClients), en(r) / en(this.startClients);
  }, t.prototype.move = function(r, e) {
    this.startClients.forEach(function(n) {
      n.clientX -= r, n.clientY -= e;
    }), this.prevClients.forEach(function(n) {
      n.clientX -= r, n.clientY -= e;
    });
  }, t;
}(), Fa = ["textarea", "input"], Pu = /* @__PURE__ */ function(t) {
  Mu(r, t);
  function r(e, n) {
    n === void 0 && (n = {});
    var a = t.call(this) || this;
    a.options = {}, a.flag = !1, a.pinchFlag = !1, a.data = {}, a.isDrag = !1, a.isPinch = !1, a.clientStores = [], a.targets = [], a.prevTime = 0, a.doubleFlag = !1, a._useMouse = !1, a._useTouch = !1, a._useDrag = !1, a._dragFlag = !1, a._isTrusted = !1, a._isMouseEvent = !1, a._isSecondaryButton = !1, a._preventMouseEvent = !1, a._prevInputEvent = null, a._isDragAPI = !1, a._isIdle = !0, a._preventMouseEventId = 0, a._window = window, a.onDragStart = function(c, p) {
      if (p === void 0 && (p = !0), !(!a.flag && c.cancelable === !1)) {
        var d = c.type.indexOf("drag") >= -1;
        if (!(a.flag && d)) {
          a._isDragAPI = !0;
          var g = a.options, h = g.container, m = g.pinchOutside, x = g.preventWheelClick, S = g.preventRightClick, D = g.preventDefault, E = g.checkInput, b = g.dragFocusedInput, C = g.preventClickEventOnDragStart, y = g.preventClickEventOnDrag, _ = g.preventClickEventByCondition, R = a._useTouch, P = !a.flag;
          if (a._isSecondaryButton = c.which === 3 || c.button === 2, x && (c.which === 2 || c.button === 1) || S && (c.which === 3 || c.button === 2))
            return a.stop(), !1;
          if (P) {
            var O = a._window.document.activeElement, T = c.target;
            if (T) {
              var I = T.tagName.toLowerCase(), z = Fa.indexOf(I) > -1, k = T.isContentEditable;
              if (z || k) {
                if (E || !b && O === T)
                  return !1;
                if (O && (O === T || k && O.isContentEditable && O.contains(T)))
                  if (b)
                    T.blur();
                  else
                    return !1;
              } else if ((D || c.type === "touchstart") && O) {
                var F = O.tagName.toLowerCase();
                (O.isContentEditable || Fa.indexOf(F) > -1) && O.blur();
              }
              (C || y || _) && Ot(a._window, "click", a._onClick, !0);
            }
            a.clientStores = [new nn(me(c))], a._isIdle = !1, a.flag = !0, a.isDrag = !1, a._isTrusted = p, a._dragFlag = !0, a._prevInputEvent = c, a.data = {}, a.doubleFlag = re() - a.prevTime < 200, a._isMouseEvent = Tu(c), !a._isMouseEvent && a._preventMouseEvent && a._allowMouseEvent();
            var A = a._preventMouseEvent || a.emit("dragStart", bt(bt({ data: a.data, datas: a.data, inputEvent: c, isMouseEvent: a._isMouseEvent, isSecondaryButton: a._isSecondaryButton, isTrusted: p, isDouble: a.doubleFlag }, a.getCurrentStore().getPosition()), { preventDefault: function() {
              c.preventDefault();
            }, preventDrag: function() {
              a._dragFlag = !1;
            } }));
            A === !1 && a.stop(), a._isMouseEvent && a.flag && D && c.preventDefault();
          }
          if (!a.flag)
            return !1;
          var W = 0;
          if (P ? (a._attchDragEvent(), R && m && (W = setTimeout(function() {
            Ot(h, "touchstart", a.onDragStart, {
              passive: !1
            });
          }))) : R && m && wt(h, "touchstart", a.onDragStart), a.flag && wu(c)) {
            if (clearTimeout(W), P && c.touches.length !== c.changedTouches.length)
              return;
            a.pinchFlag || a.onPinchStart(c);
          }
        }
      }
    }, a.onDrag = function(c, p) {
      if (a.flag) {
        var d = a.options.preventDefault;
        !a._isMouseEvent && d && c.preventDefault(), a._prevInputEvent = c;
        var g = me(c), h = a.moveClients(g, c, !1);
        if (a._dragFlag) {
          if (a.pinchFlag || h.deltaX || h.deltaY) {
            var m = a._preventMouseEvent || a.emit("drag", bt(bt({}, h), { isScroll: !!p, inputEvent: c }));
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
        var p = a.options, d = p.pinchOutside, g = p.container, h = p.preventClickEventOnDrag, m = p.preventClickEventOnDragStart, x = p.preventClickEventByCondition, S = a.isDrag;
        (h || m || x) && requestAnimationFrame(function() {
          a._allowClickEvent();
        }), !x && !m && h && !S && a._allowClickEvent(), a._useTouch && d && wt(g, "touchstart", a.onDragStart), a.pinchFlag && a.onPinchEnd(c);
        var D = c?.touches ? me(c) : [], E = D.length;
        E === 0 || !a.options.keepDragging ? a.flag = !1 : a._addStore(new nn(D));
        var b = a._getPosition(), C = re(), y = !S && a.doubleFlag;
        a._prevInputEvent = null, a.prevTime = S || y ? 0 : C, a.flag || (a._dettachDragEvent(), a._preventMouseEvent || a.emit("dragEnd", bt({ data: a.data, datas: a.data, isDouble: y, isDrag: S, isClick: !S, isMouseEvent: a._isMouseEvent, isSecondaryButton: a._isSecondaryButton, inputEvent: c, isTrusted: a._isTrusted }, b)), a.clientStores = [], a._isMouseEvent || (a._preventMouseEvent = !0, clearTimeout(a._preventMouseEventId), a._preventMouseEventId = setTimeout(function() {
          a._preventMouseEvent = !1;
        }, 200)), a._isIdle = !0);
      }
    }, a.onBlur = function() {
      a.onDragEnd();
    }, a._allowClickEvent = function() {
      wt(a._window, "click", a._onClick, !0);
    }, a._onClick = function(c) {
      a._allowClickEvent(), a._allowMouseEvent();
      var p = a.options.preventClickEventByCondition;
      p?.(c) || (c.stopPropagation(), c.preventDefault());
    }, a._onContextMenu = function(c) {
      var p = a.options;
      p.preventRightClick ? a.onDragEnd(c) : c.preventDefault();
    }, a._passCallback = function() {
    };
    var i = [].concat(e), o = i[0];
    a._window = Ai(o) ? o : lr(o), a.options = bt({ checkInput: !1, container: o && !("document" in o) ? lr(o) : o, preventRightClick: !0, preventWheelClick: !0, preventClickEventOnDragStart: !1, preventClickEventOnDrag: !1, preventClickEventByCondition: null, preventDefault: !0, checkWindowBlur: !1, keepDragging: !1, pinchThreshold: 0, events: ["touch", "mouse"] }, n);
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
    return e === void 0 && (e = this._prevInputEvent), bt(bt({ data: this.data, datas: this.data }, this._getPosition()), { movement: this.getMovement(), isDrag: this.isDrag, isPinch: this.isPinch, isScroll: !1, inputEvent: e });
  }, r.prototype.getEventData = function() {
    return this.data;
  }, r.prototype.getEventDatas = function() {
    return this.data;
  }, r.prototype.unset = function() {
    var e = this, n = this.targets, a = this.options.container;
    this.off(), wt(this._window, "blur", this.onBlur), this._useDrag && n.forEach(function(i) {
      wt(i, "dragstart", e.onDragStart);
    }), this._useMouse && (n.forEach(function(i) {
      wt(i, "mousedown", e.onDragStart);
    }), wt(a, "contextmenu", this._onContextMenu)), this._useTouch && (n.forEach(function(i) {
      wt(i, "touchstart", e.onDragStart);
    }), wt(a, "touchstart", this.onDragStart)), this._prevInputEvent = null, this._allowClickEvent(), this._dettachDragEvent();
  }, r.prototype.onPinchStart = function(e) {
    var n = this, a = this.options.pinchThreshold;
    if (!(this.isDrag && this.getMovement() > a)) {
      var i = new nn(me(e));
      this.pinchFlag = !0, this._addStore(i);
      var o = this.emit("pinchStart", bt(bt({ data: this.data, datas: this.data, angle: i.getAngle(), touches: this.getCurrentStore().getPositions() }, i.getPosition()), { inputEvent: e, isTrusted: this._isTrusted, preventDefault: function() {
        e.preventDefault();
      }, preventDrag: function() {
        n._dragFlag = !1;
      } }));
      o === !1 && (this.pinchFlag = !1);
    }
  }, r.prototype.onPinch = function(e, n) {
    if (!(!this.flag || !this.pinchFlag || n.length < 2)) {
      var a = this.getCurrentStore();
      this.isPinch = !0, this.emit("pinch", bt(bt({ data: this.data, datas: this.data, movement: this.getMovement(n), angle: a.getAngle(n), rotation: a.getRotation(n), touches: a.getPositions(n), scale: a.getScale(n), distance: a.getDistance(n) }, a.getPosition(n)), { inputEvent: e, isTrusted: this._isTrusted }));
    }
  }, r.prototype.onPinchEnd = function(e) {
    if (this.pinchFlag) {
      var n = this.isPinch;
      this.isPinch = !1, this.pinchFlag = !1;
      var a = this.getCurrentStore();
      this.emit("pinchEnd", bt(bt({ data: this.data, datas: this.data, isPinch: n, touches: a.getPositions() }, a.getPosition()), { inputEvent: e }));
    }
  }, r.prototype.getCurrentStore = function() {
    return this.clientStores[0];
  }, r.prototype.moveClients = function(e, n, a) {
    var i = this._getPosition(e, a), o = this.isDrag;
    (i.deltaX || i.deltaY) && (this.isDrag = !0);
    var s = !1;
    return !o && this.isDrag && (s = !0), bt(bt({ data: this.data, datas: this.data }, i), { movement: this.getMovement(e), isDrag: this.isDrag, isPinch: this.isPinch, isScroll: !1, isMouseEvent: this._isMouseEvent, isSecondaryButton: this._isSecondaryButton, inputEvent: n, isTrusted: this._isTrusted, isFirstDrag: s });
  }, r.prototype._addStore = function(e) {
    this.clientStores.splice(0, 0, e);
  }, r.prototype._getPosition = function(e, n) {
    var a = this.getCurrentStore(), i = a.getPosition(e, n), o = this.clientStores.slice(1).reduce(function(f, l) {
      var v = l.getPosition();
      return f.distX += v.distX, f.distY += v.distY, f;
    }, i), s = o.distX, u = o.distY;
    return bt(bt({}, i), { distX: s, distY: u });
  }, r.prototype._attchDragEvent = function() {
    var e = this._window, n = this.options.container, a = {
      passive: !1
    };
    this._isDragAPI && (Ot(n, "dragover", this.onDrag, a), Ot(e, "dragend", this.onDragEnd)), this._useMouse && (Ot(n, "mousemove", this.onDrag), Ot(e, "mouseup", this.onDragEnd)), this._useTouch && (Ot(n, "touchmove", this.onDrag, a), Ot(e, "touchend", this.onDragEnd, a), Ot(e, "touchcancel", this.onDragEnd, a));
  }, r.prototype._dettachDragEvent = function() {
    var e = this._window, n = this.options.container;
    this._isDragAPI && (wt(n, "dragover", this.onDrag), wt(e, "dragend", this.onDragEnd)), this._useMouse && (wt(n, "mousemove", this.onDrag), wt(e, "mouseup", this.onDragEnd)), this._useTouch && (wt(n, "touchstart", this.onDragStart), wt(n, "touchmove", this.onDrag), wt(e, "touchend", this.onDragEnd), wt(e, "touchcancel", this.onDragEnd));
  }, r.prototype._allowMouseEvent = function() {
    this._preventMouseEvent = !1, clearTimeout(this._preventMouseEventId);
  }, r;
}(Qn);
function Iu(t) {
  for (var r = 5381, e = t.length; e; )
    r = r * 33 ^ t.charCodeAt(--e);
  return r >>> 0;
}
var zu = Iu;
function Gu(t) {
  return zu(t).toString(36);
}
function Bu(t) {
  if (t && t.getRootNode) {
    var r = t.getRootNode();
    if (r.nodeType === 11)
      return r;
  }
}
function Au(t, r, e) {
  return e.original ? r : r.replace(/([^};{\s}][^};{]*|^\s*){/mg, function(n, a) {
    var i = a.trim();
    return (i ? Sr(i) : [""]).map(function(o) {
      var s = o.trim();
      return s.indexOf("@") === 0 ? s : s.indexOf(":global") > -1 ? s.replace(/\:global/g, "") : s.indexOf(":host") > -1 ? "".concat(s.replace(/\:host/g, ".".concat(t))) : s ? ".".concat(t, " ").concat(s) : ".".concat(t);
    }).join(", ") + " {";
  });
}
function ku(t, r, e, n, a) {
  var i = jn(n), o = i.createElement("style");
  return o.setAttribute("type", "text/css"), o.setAttribute("data-styled-id", t), o.setAttribute("data-styled-count", "1"), e.nonce && o.setAttribute("nonce", e.nonce), o.innerHTML = Au(t, r, e), (a || i.head || i.body).appendChild(o), o;
}
function Fu(t) {
  var r = "rCS" + Gu(t);
  return {
    className: r,
    inject: function(e, n) {
      n === void 0 && (n = {});
      var a = Bu(e), i = (a || e.ownerDocument || document).querySelector('style[data-styled-id="'.concat(r, '"]'));
      if (!i)
        i = ku(r, t, n, e, a);
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
var Cn = function() {
  return Cn = Object.assign || function(r) {
    for (var e, n = 1, a = arguments.length; n < a; n++) {
      e = arguments[n];
      for (var i in e) Object.prototype.hasOwnProperty.call(e, i) && (r[i] = e[i]);
    }
    return r;
  }, Cn.apply(this, arguments);
};
function Nu(t, r) {
  var e = {};
  for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && r.indexOf(n) < 0 && (e[n] = t[n]);
  if (t != null && typeof Object.getOwnPropertySymbols == "function") for (var a = 0, n = Object.getOwnPropertySymbols(t); a < n.length; a++)
    r.indexOf(n[a]) < 0 && Object.prototype.propertyIsEnumerable.call(t, n[a]) && (e[n[a]] = t[n[a]]);
  return e;
}
function Vi(t, r) {
  var e = Fu(r), n = e.className;
  return ht.forwardRef(function(a, i) {
    var o = a.className, s = o === void 0 ? "" : o;
    a.cspNonce;
    var u = Nu(a, ["className", "cspNonce"]), f = ht.useRef();
    return ht.useImperativeHandle(i, function() {
      return f.current;
    }, []), ht.useEffect(function() {
      var l = e.inject(f.current, {
        nonce: a.cspNonce
      });
      return function() {
        l.destroy();
      };
    }, []), ht.createElement(t, Cn({
      ref: f,
      "data-styled-id": n,
      className: "".concat(s, " ").concat(n)
    }, u));
  });
}
var _n = function(t, r) {
  return _n = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(e, n) {
    e.__proto__ = n;
  } || function(e, n) {
    for (var a in n) Object.prototype.hasOwnProperty.call(n, a) && (e[a] = n[a]);
  }, _n(t, r);
};
function ue(t, r) {
  if (typeof r != "function" && r !== null)
    throw new TypeError("Class extends value " + String(r) + " is not a constructor or null");
  _n(t, r);
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
function Wu(t, r) {
  var e = {};
  for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && r.indexOf(n) < 0 && (e[n] = t[n]);
  if (t != null && typeof Object.getOwnPropertySymbols == "function")
    for (var a = 0, n = Object.getOwnPropertySymbols(t); a < n.length; a++)
      r.indexOf(n[a]) < 0 && Object.prototype.propertyIsEnumerable.call(t, n[a]) && (e[n[a]] = t[n[a]]);
  return e;
}
function Hu(t, r, e, n) {
  var a = arguments.length, i = a < 3 ? r : n, o;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") i = Reflect.decorate(t, r, e, n);
  else for (var s = t.length - 1; s >= 0; s--) (o = t[s]) && (i = (a < 3 ? o(i) : a > 3 ? o(r, e, i) : o(r, e)) || i);
  return a > 3 && i && Object.defineProperty(r, e, i), i;
}
function Lu(t) {
  var r = typeof Symbol == "function" && Symbol.iterator, e = r && t[r], n = 0;
  if (e) return e.call(t);
  if (t && typeof t.length == "number") return {
    next: function() {
      return t && n >= t.length && (t = void 0), { value: t && t[n++], done: !t };
    }
  };
  throw new TypeError(r ? "Object is not iterable." : "Symbol.iterator is not defined.");
}
function w(t, r) {
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
function fe(t, r) {
  return M({ events: [], props: [], name: t }, r);
}
var Yu = ["n", "w", "s", "e"], ra = ["n", "w", "s", "e", "nw", "ne", "sw", "se"];
function Xu(t, r) {
  return 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="'.concat(32 * t, 'px" height="').concat(32 * t, 'px" viewBox="0 0 32 32" ><path d="M 16,5 L 12,10 L 14.5,10 L 14.5,22 L 12,22 L 16,27 L 20,22 L 17.5,22 L 17.5,10 L 20, 10 L 16,5 Z" stroke-linejoin="round" stroke-width="1.2" fill="black" stroke="white" style="transform:rotate(').concat(r, 'deg);transform-origin: 16px 16px"></path></svg>');
}
function Vu(t) {
  var r = Xu(1, t), e = Math.round(t / 45) * 45 % 180, n = "ns-resize";
  return e === 135 ? n = "nwse-resize" : e === 45 ? n = "nesw-resize" : e === 90 && (n = "ew-resize"), "cursor:".concat(n, ";cursor: url('").concat(r, "') 16 16, ").concat(n, ";");
}
var Lr = Ps(), qi = Lr.browser.webkit, ji = qi && function() {
  var t = typeof window > "u" ? { userAgent: "" } : window.navigator, r = /applewebkit\/([^\s]+)/g.exec(t.userAgent.toLowerCase());
  return r ? parseFloat(r[1]) < 605 : !1;
}(), Ui = Lr.browser.name, $i = parseInt(Lr.browser.version, 10), qu = Ui === "chrome", ju = Lr.browser.chromium, Uu = parseInt(Lr.browser.chromiumVersion, 10) || 0, $u = qu && $i >= 109 || ju && Uu >= 109, Zu = Ui === "firefox", Ku = parseInt(Lr.browser.webkitVersion, 10) >= 612 || $i >= 15, ea = "moveable-", Ju = ra.map(function(t) {
  var r = "", e = "", n = "center", a = "center", i = "calc(var(--moveable-control-padding, 20) * -1px)";
  return t.indexOf("n") > -1 && (r = "top: ".concat(i, ";"), a = "bottom"), t.indexOf("s") > -1 && (r = "top: 0px;", a = "top"), t.indexOf("w") > -1 && (e = "left: ".concat(i, ";"), n = "right"), t.indexOf("e") > -1 && (e = "left: 0px;", n = "left"), '.around-control[data-direction*="'.concat(t, `"] {
        `).concat(e).concat(r, `
        transform-origin: `).concat(n, " ").concat(a, `;
    }`);
}).join(`
`), Qu = `
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
`.concat(Ju, `
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
`).concat(Vu(t), `
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

`).concat(ji ? `:global svg *:before {
content:"";
transform-origin: inherit;
}` : "", `
`), tf = [
  [0, 1, 2],
  [1, 0, 3],
  [2, 0, 3],
  [3, 1, 2]
], Mn = 1e-4, kt = 1e-7, xe = 1e-9, Rn = Math.pow(10, 10), Na = -Rn, rf = {
  n: [0, -1],
  e: [1, 0],
  s: [0, 1],
  w: [-1, 0],
  nw: [-1, -1],
  ne: [1, -1],
  sw: [-1, 1],
  se: [1, 1]
}, na = {
  n: [0, 1],
  e: [1, 3],
  s: [3, 2],
  w: [2, 0],
  nw: [0],
  ne: [1],
  sw: [2],
  se: [3]
}, Zi = {
  n: 0,
  s: 180,
  w: 270,
  e: 90,
  nw: 315,
  ne: 45,
  sw: 225,
  se: 135
}, ef = [
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
function le(t, r, e, n, a, i) {
  var o, s;
  i === void 0 && (i = "draggable");
  var u = (s = (o = r.gestos[i]) === null || o === void 0 ? void 0 : o.move(e, t.inputEvent)) !== null && s !== void 0 ? s : {}, f = u.originalDatas || u.datas, l = f[i] || (f[i] = {});
  return M(M({}, u), { isPinch: !!n, parentEvent: !0, datas: l, originalDatas: t.originalDatas });
}
var Ar = /* @__PURE__ */ function() {
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
function Gr(t, r, e, n) {
  var a = t.length === 16, i = a ? 4 : 3, o = Mr(t, e, n, i), s = w(o, 4), u = w(s[0], 2), f = u[0], l = u[1], v = w(s[1], 2), c = v[0], p = v[1], d = w(s[2], 2), g = d[0], h = d[1], m = w(s[3], 2), x = m[0], S = m[1], D = w(xt(t, r, i), 2), E = D[0], b = D[1], C = Math.min(f, c, g, x), y = Math.min(l, p, h, S), _ = Math.max(f, c, g, x), R = Math.max(l, p, h, S);
  f = f - C || 0, c = c - C || 0, g = g - C || 0, x = x - C || 0, l = l - y || 0, p = p - y || 0, h = h - y || 0, S = S - y || 0, E = E - C || 0, b = b - y || 0;
  var P = t[0], O = t[i + 1], T = Bt(P * O);
  return {
    left: C,
    top: y,
    right: _,
    bottom: R,
    origin: [E, b],
    pos1: [f, l],
    pos2: [c, p],
    pos3: [g, h],
    pos4: [x, S],
    direction: T
  };
}
function Ki(t, r) {
  var e = r.clientX, n = r.clientY, a = r.datas, i = t.state, o = i.moveableClientRect, s = i.rootMatrix, u = i.is3d, f = i.pos1, l = o.left, v = o.top, c = u ? 4 : 3, p = w(Q(Nr(s, [e - l, n - v], c), f), 2), d = p[0], g = p[1], h = w(Qt({ datas: a, distX: d, distY: g }), 2), m = h[0], x = h[1];
  return [m, x];
}
function _r(t, r) {
  var e = r.datas, n = t.state, a = n.allMatrix, i = n.beforeMatrix, o = n.is3d, s = n.left, u = n.top, f = n.origin, l = n.offsetMatrix, v = n.targetMatrix, c = n.transformOrigin, p = o ? 4 : 3;
  e.is3d = o, e.matrix = a, e.targetMatrix = v, e.beforeMatrix = i, e.offsetMatrix = l, e.transformOrigin = c, e.inverseMatrix = Jt(a, p), e.inverseBeforeMatrix = Jt(i, p), e.absoluteOrigin = br(ut([s, u], f), p), e.startDragBeforeDist = Pt(e.inverseBeforeMatrix, e.absoluteOrigin, p), e.startDragDist = Pt(e.inverseMatrix, e.absoluteOrigin, p);
}
function nf(t) {
  return Gr(t.datas.beforeTransform, [50, 50], 100, 100).direction;
}
function He(t, r, e) {
  var n = r.datas, a = r.originalDatas.beforeRenderable, i = n.transformIndex, o = a.nextTransforms, s = o.length, u = a.nextTransformAppendedIndexes, f = -1;
  i === -1 ? (e === "translate" ? f = 0 : e === "rotate" && (f = nr(o, function(p) {
    return p.match(/scale\(/g);
  })), f === -1 && (f = o.length), n.transformIndex = f) : Ht(u, function(p) {
    return p.index === i && p.functionName === e;
  }) ? f = i : f = i + u.filter(function(p) {
    return p.index < i;
  }).length;
  var l = Ol(o, t.state, f), v = l.targetFunction, c = e === "rotate" ? "rotateZ" : e;
  n.beforeFunctionTexts = l.beforeFunctionTexts, n.afterFunctionTexts = l.afterFunctionTexts, n.beforeTransform = l.beforeFunctionMatrix, n.beforeTransform2 = l.beforeFunctionMatrix2, n.targetTansform = l.targetFunctionMatrix, n.afterTransform = l.afterFunctionMatrix, n.afterTransform2 = l.afterFunctionMatrix2, n.targetAllTransform = l.allFunctionMatrix, v.functionName === c ? (n.afterFunctionTexts.splice(0, 1), n.isAppendTransform = !1) : s > f && (n.isAppendTransform = !0, a.nextTransformAppendedIndexes = N(N([], w(u), !1), [{
    functionName: e,
    index: f,
    isAppend: !0
  }], !1));
}
function Le(t, r, e) {
  return "".concat(t.beforeFunctionTexts.join(" "), " ").concat(t.isAppendTransform ? e : r, " ").concat(t.afterFunctionTexts.join(" "));
}
function af(t) {
  var r = t.datas, e = t.distX, n = t.distY, a = w(Qi({ datas: r, distX: e, distY: n }), 2), i = a[0], o = a[1], s = Ji(r, tu([i, o], 4));
  return Pt(s, br([0, 0, 0], 4), 4);
}
function Ji(t, r, e) {
  var n = t.beforeTransform, a = t.afterTransform, i = t.beforeTransform2, o = t.afterTransform2, s = t.targetAllTransform, u = e ? pt(s, r, 4) : pt(r, s, 4), f = pt(Jt(e ? i : n, 4), u, 4), l = pt(f, Jt(e ? o : a, 4), 4);
  return l;
}
function Qi(t) {
  var r = t.datas, e = t.distX, n = t.distY, a = r.inverseBeforeMatrix, i = r.is3d, o = r.startDragBeforeDist, s = r.absoluteOrigin, u = i ? 4 : 3;
  return Q(Pt(a, ut(s, [e, n]), u), o);
}
function Qt(t, r) {
  var e = t.datas, n = t.distX, a = t.distY, i = e.inverseBeforeMatrix, o = e.inverseMatrix, s = e.is3d, u = e.startDragBeforeDist, f = e.startDragDist, l = e.absoluteOrigin, v = s ? 4 : 3;
  return Q(Pt(r ? i : o, ut(l, [n, a]), v), r ? u : f);
}
function of(t, r) {
  var e = t.datas, n = t.distX, a = t.distY;
  e.beforeMatrix;
  var i = e.matrix, o = e.is3d;
  e.startDragBeforeDist;
  var s = e.startDragDist, u = e.absoluteOrigin, f = o ? 4 : 3;
  return Q(Pt(i, ut(s, [n, a]), f), u);
}
function sf(t, r, e, n, a, i) {
  return n === void 0 && (n = r), a === void 0 && (a = e), i === void 0 && (i = [0, 0]), t ? t.map(function(o, s) {
    var u = ie(o), f = u.value, l = u.unit, v = s ? a : n, c = s ? e : r;
    if (o === "%" || isNaN(f)) {
      var p = v ? i[s] / v : 0;
      return c * p;
    } else if (l !== "%")
      return f;
    return c * f / 100;
  }) : i;
}
function to(t) {
  var r = [];
  return t[1] >= 0 && (t[0] >= 0 && r.push(3), t[0] <= 0 && r.push(2)), t[1] <= 0 && (t[0] >= 0 && r.push(1), t[0] <= 0 && r.push(0)), r;
}
function uf(t, r) {
  return to(r).map(function(e) {
    return t[e];
  });
}
function an(t, r) {
  var e = (r + 1) / 2;
  return [
    Oe(t[0][0], t[1][0], e, 1 - e),
    Oe(t[0][1], t[1][1], e, 1 - e)
  ];
}
function _t(t, r) {
  var e = an([t[0], t[1]], r[0]), n = an([t[2], t[3]], r[0]);
  return an([e, n], r[1]);
}
function ff(t, r, e, n, a, i) {
  var o = Mr(r, e, n, a), s = _t(o, i), u = t[0] - s[0], f = t[1] - s[1];
  return [u, f];
}
function ce(t, r, e, n) {
  return pt(t, Kr(r, n, e), n);
}
function lf(t, r, e, n) {
  var a = t.transformOrigin, i = t.offsetMatrix, o = t.is3d, s = o ? 4 : 3, u;
  if (ar(e)) {
    var f = r.beforeTransform, l = r.afterTransform;
    n ? u = Zt(ee(e), 4, s) : u = Zt(pt(pt(f, ee([e]), 4), l, 4), 4, s);
  } else
    u = e;
  return ce(i, u, a, s);
}
function cf(t, r) {
  var e = t.transformOrigin, n = t.offsetMatrix, a = t.is3d, i = t.targetMatrix, o = t.targetAllTransform, s = a ? 4 : 3;
  return ce(n, pt(o || i, Zn(r, s), s), e, s);
}
function Ye(t, r) {
  var e = Yr(r);
  return {
    setTransform: function(n, a) {
      a === void 0 && (a = -1), e.startTransforms = Rt(n) ? n : cr(n), wn(t, r, a);
    },
    setTransformIndex: function(n) {
      wn(t, r, n);
    }
  };
}
function Xe(t, r, e) {
  var n = Yr(r), a = n.startTransforms;
  wn(t, r, nr(a, function(i) {
    return i.indexOf("".concat(e, "(")) === 0;
  }));
}
function wn(t, r, e) {
  var n = Yr(r), a = r.datas;
  if (a.transformIndex = e, e !== -1) {
    var i = n.startTransforms[e];
    if (i) {
      var o = t.state, s = Br([i], {
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
function aa(t, r) {
  var e = Yr(t);
  e.nextTransforms = cr(r);
}
function Yr(t) {
  return t.originalDatas.beforeRenderable;
}
function ze(t) {
  var r = t.originalDatas.beforeRenderable;
  return r.nextTransforms;
}
function Se(t) {
  return (ze(t) || []).join(" ");
}
function De(t) {
  return Yr(t).nextStyle;
}
function ro(t, r, e, n, a) {
  aa(a, r);
  var i = Gt.drag(t, le(a, t.state, e, n)), o = i ? i.transform : r;
  return M(M({ transform: r, drag: i }, At({
    transform: o
  }, a)), { afterTransform: o });
}
function ia(t, r, e, n, a, i) {
  var o = lf(t.state, a, r, i), s = df(t, e, n, o);
  return s;
}
function eo(t, r, e, n, a, i, o) {
  var s = ia(t, r, e, a, i, o), u = t.state, f = u.left, l = u.top, v = t.props.groupable, c = v ? f : 0, p = v ? l : 0, d = Q(n, s);
  return Q(d, [c, p]);
}
function vf(t, r, e, n, a, i, o) {
  var s = eo(t, r, e, n, a, i, o);
  return s;
}
function pf(t, r, e) {
  return [
    r ? -1 + t[0] / (r / 2) : 0,
    e ? -1 + t[1] / (e / 2) : 0
  ];
}
function df(t, r, e, n) {
  n === void 0 && (n = t.state.allMatrix);
  var a = t.state, i = a.width, o = a.height, s = a.is3d, u = s ? 4 : 3, f = [
    i / 2 * (1 + r[0]) + e[0],
    o / 2 * (1 + r[1]) + e[1]
  ];
  return xt(n, f, u);
}
function gf(t, r, e) {
  var n = e.fixedDirection, a = e.fixedPosition, i = e.fixedOffset;
  return eo(t, "rotate(".concat(r, "deg)"), n, a, i, e);
}
function hf(t, r, e, n, a, i) {
  var o = t.props.groupable, s = t.state, u = s.transformOrigin, f = s.offsetMatrix, l = s.is3d, v = s.width, c = s.height, p = s.left, d = s.top, g = i.fixedDirection, h = i.nextTargetMatrix || s.targetMatrix, m = l ? 4 : 3, x = sf(a, r, e, v, c, u), S = o ? p : 0, D = o ? d : 0, E = ce(f, h, x, m), b = ff(n, E, r, e, m, g);
  return Q(b, [S, D]);
}
function mf(t, r) {
  return _t(qt(t.state), r);
}
function xf(t, r) {
  var e = t.targetGesto, n = t.controlGesto, a;
  return e?.isFlag() && (a = e.getEventData()[r]), !a && n?.isFlag() && (a = n.getEventData()[r]), a || {};
}
function Sf(t) {
  if (t && t.getRootNode) {
    var r = t.getRootNode();
    if (r.nodeType === 11)
      return r;
  }
}
function Df(t) {
  var r = t("scale"), e = t("rotate"), n = t("translate"), a = [];
  return n && n !== "0px" && n !== "none" && a.push("translate(".concat(n.split(/\s+/).join(","), ")")), e && e !== "1" && e !== "none" && a.push("rotate(".concat(e, ")")), r && r !== "1" && r !== "none" && a.push("scale(".concat(r.split(/\s+/).join(","), ")")), a;
}
function no(t, r, e) {
  for (var n = t, a = [], i = Un(t) || dr(t), o = !e && t === r || t === i, s = o, u = !1, f = 3, l, v, c, p = !1, d = ae(r, r, !0).offsetParent, g = 1; n && !s; ) {
    s = o;
    var h = Nt(n), m = h("position"), x = wo(n), S = m === "fixed", D = Df(h), E = ru(ml(x)), b = void 0, C = !1, y = !1, _ = 0, R = 0, P = 0, O = 0, T = {
      hasTransform: !1,
      fixedContainer: null
    };
    S && (p = !0, T = El(n), d = T.fixedContainer);
    var I = E.length;
    !u && (I === 16 || D.length) && (u = !0, f = 4, Gn(a), c && (c = Zt(c, 3, 4))), u && I === 9 && (E = Zt(E, 3, 4));
    var z = bl(n, t), k = z.tagName, F = z.hasOffset, A = z.isSVG, W = z.origin, H = z.targetOrigin, G = z.offset, V = w(G, 2), q = V[0], L = V[1];
    k === "svg" && !n.ownerSVGElement && c && (a.push({
      type: "target",
      target: n,
      matrix: yl(n, f)
    }), a.push({
      type: "offset",
      target: n,
      matrix: mt(f)
    }));
    var j = parseFloat(h("zoom")) || 1;
    if (S)
      b = T.fixedContainer, C = !0;
    else {
      var Y = ae(n, r, !1, !0, h), $ = Y.offsetZoom;
      if (b = Y.offsetParent, C = Y.isEnd, y = Y.isStatic, g *= $, (Y.isCustomElement || $ !== 1) && y)
        q -= b.offsetLeft, L -= b.offsetTop;
      else if (Zu || $u) {
        var J = Y.parentSlotElement;
        if (J) {
          for (var at = b, st = 0, X = 0; at && Sf(at); )
            st += at.offsetLeft, X += at.offsetTop, at = at.offsetParent;
          q -= st, L -= X;
        }
      }
    }
    if (qi && !Ku && F && !A && y && (m === "relative" || m === "static") && (q -= b.offsetLeft, L -= b.offsetTop, o = o || C), S)
      F && T.hasTransform && (P = b.clientLeft, O = b.clientTop);
    else if (F && d !== b && (_ = b.clientLeft, R = b.clientTop), F && b === i) {
      var Z = To(n, !1);
      q += Z[0], L += Z[1];
    }
    if (a.push({
      type: "target",
      target: n,
      matrix: Kr(E, f, W)
    }), D.length && (a.push({
      type: "offset",
      target: n,
      matrix: mt(f)
    }), a.push({
      type: "target",
      target: n,
      matrix: Kr(ee(D), f, W)
    })), F) {
      var ft = n === t, rt = ft ? 0 : n.scrollLeft, et = ft ? 0 : n.scrollTop;
      a.push({
        type: "offset",
        target: n,
        matrix: Er([
          q - rt + _ - P,
          L - et + R - O
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
      matrix: Kr(Zn([j, j], f), f, [0, 0])
    }), c || (c = E), l || (l = W), v || (v = H), s || S)
      break;
    n = b, o = C, (!e || n === i) && (s = o);
  }
  return c || (c = mt(f)), l || (l = [0, 0]), v || (v = [0, 0]), {
    zoom: g,
    offsetContainer: d,
    matrixes: a,
    targetMatrix: c,
    transformOrigin: l,
    targetOrigin: v,
    is3d: u,
    hasFixed: p
  };
}
var gr = null, hr = null, Or = null;
function kr(t) {
  t ? (window.Map && (gr = /* @__PURE__ */ new Map(), hr = /* @__PURE__ */ new Map()), Or = []) : (gr = null, Or = null, hr = null);
}
function bf(t) {
  var r = hr?.get(t);
  if (r)
    return r;
  var e = Jr(t, !0);
  return hr && hr.set(t, e), e;
}
function Ef(t, r) {
  if (Or) {
    var e = Ht(Or, function(a) {
      return a[0][0] == t && a[0][1] == r;
    });
    if (e)
      return e[1];
  }
  var n = no(t, r, !0);
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
function Ut(t, r, e) {
  var n = e.originalDatas;
  n.groupable = n.groupable || {};
  var a = n.groupable;
  a.childDatas = a.childDatas || [];
  var i = a.childDatas;
  return t.moveables.map(function(o, s) {
    return i[s] = i[s] || {}, i[s][r] = i[s][r] || {}, M(M({}, e), { isRequestChild: !0, datas: i[s][r], originalDatas: i[s] });
  });
}
function on(t, r, e, n, a, i, o) {
  var s = !!e.match(/Start$/g), u = !!e.match(/End$/g), f = a.isPinch, l = a.datas, v = Ut(t, r.name, a), c = t.moveables, p = [], d = v.map(function(g, h) {
    var m = c[h], x = m.state, S = x.gestos, D = g;
    if (s)
      D = new Ar(o).dragStart(n, g), p.push(D);
    else {
      if (S[o] || (S[o] = l.childGestos[h]), !S[o])
        return;
      D = le(g, x, n, f, i, o), p.push(D);
    }
    var E = r[e](m, M(M({}, D), { parentFlag: !0 }));
    return u && (S[o] = null), E;
  });
  return s && (l.childGestos = c.map(function(g) {
    return g.state.gestos[o];
  })), {
    eventParams: d,
    childEvents: p
  };
}
function er(t, r, e, n, a, i) {
  a === void 0 && (a = function(l, v) {
    return v;
  });
  var o = !!e.match(/End$/g), s = Ut(t, r.name, n), u = t.moveables, f = s.map(function(l, v) {
    var c = u[v], p = l;
    p = a(c, l);
    var d = r[e](c, M(M({}, p), { parentFlag: !0 }));
    return d && i && i(c, l, d, v), o && (c.state.gestos = {}), d;
  });
  return f;
}
function Ge(t, r, e, n) {
  var a = e.fixedDirection, i = e.fixedPosition, o = n.datas.startPositions || qt(r.state), s = _t(o, a), u = w(Pt(se(-t.rotation / 180 * Math.PI, 3), [s[0] - i[0], s[1] - i[1], 1], 3), 2), f = u[0], l = u[1];
  return n.datas.originalX = f, n.datas.originalY = l, n;
}
function ao(t, r, e, n) {
  var a = t.getState(), i = a.renderPoses, o = a.rotation, s = a.direction, u = Cr(t.props, r).zoom, f = Zr(o / Math.PI * 180), l = {}, v = t.renderState;
  v.renderDirectionMap || (v.renderDirectionMap = {});
  var c = v.renderDirectionMap;
  e.forEach(function(d) {
    var g = d.dir;
    l[g] = !0;
  });
  var p = Bt(s);
  return e.map(function(d) {
    var g = d.data, h = d.classNames, m = d.dir, x = na[m];
    if (!x || !l[m])
      return null;
    c[m] = !0;
    var S = (tt(f, 15) + p * Zi[m] + 720) % 180, D = {};
    return Hr(g).forEach(function(E) {
      D["data-".concat(E)] = g[E];
    }), n.createElement("div", M({ className: K.apply(void 0, N(["control", "direction", m, r], w(h), !1)), "data-rotation": S, "data-direction": m }, D, { key: "direction-".concat(m), style: Fe.apply(void 0, N([o, u], w(x.map(function(E) {
      return i[E];
    })), !1)) }));
  });
}
function io(t, r, e, n) {
  var a = Cr(t.props, e), i = a.renderDirections, o = i === void 0 ? r : i, s = a.displayAroundControls;
  if (!o)
    return [];
  var u = o === !0 ? ra : o;
  return N(N([], w(s ? fo(t, n, e, u) : []), !1), w(ao(t, e, u.map(function(f) {
    return {
      data: {},
      classNames: [],
      dir: f
    };
  }), n)), !1);
}
function ne(t, r, e, n, a, i) {
  for (var o = [], s = 6; s < arguments.length; s++)
    o[s - 6] = arguments[s];
  var u = St(e, n), f = r ? tt(u / Math.PI * 180, 15) % 180 : -1;
  return t.createElement("div", { key: "line-".concat(i), className: K.apply(void 0, N(["line", "direction", r ? "edge" : "", r], w(o), !1)), "data-rotation": f, "data-line-key": i, "data-direction": r, style: jr(e, n, a, u) });
}
function oo(t, r, e, n, a) {
  var i = e === !0 ? Yu : e;
  return i.map(function(o, s) {
    var u = w(na[o], 2), f = u[0], l = u[1];
    if (l != null)
      return ne(t, o, n[f], n[l], a, "".concat(r, "Edge").concat(s), r);
  }).filter(Boolean);
}
function so(t) {
  return function(r, e) {
    var n = Cr(r.props, t).edge;
    return n && (n === !0 || n.length) ? N(N([], w(oo(e, t, n, r.getState().renderPoses, r.props.zoom)), !1), w(yf(r, t, e)), !1) : uo(r, t, e);
  };
}
function uo(t, r, e) {
  return io(t, ra, r, e);
}
function yf(t, r, e) {
  return io(t, ["nw", "ne", "sw", "se"], r, e);
}
function fo(t, r, e, n) {
  var a = t.renderState;
  a.renderDirectionMap || (a.renderDirectionMap = {});
  var i = t.getState(), o = i.renderPoses, s = i.rotation, u = i.direction, f = a.renderDirectionMap, l = t.props.zoom, v = Bt(u), c = s / Math.PI * 180;
  return (n || Hr(f)).map(function(p) {
    var d = na[p];
    if (!d)
      return null;
    var g = (tt(c, 15) + v * Zi[p] + 720) % 180, h = ["around-control"];
    return e && h.push("direction", e), r.createElement("div", { className: K.apply(void 0, N([], w(h), !1)), "data-rotation": g, "data-direction": p, key: "direction-around-".concat(p), style: Fe.apply(void 0, N([s, l], w(d.map(function(m) {
      return o[m];
    })), !1)) });
  });
}
function oa(t, r, e) {
  var n = t || {}, a = n.position, i = a === void 0 ? "client" : a, o = n.left, s = o === void 0 ? -1 / 0 : o, u = n.top, f = u === void 0 ? -1 / 0 : u, l = n.right, v = l === void 0 ? 1 / 0 : l, c = n.bottom, p = c === void 0 ? 1 / 0 : c, d = {
    position: i,
    left: s,
    top: f,
    right: v,
    bottom: p
  };
  return {
    vertical: Wa(d, r, !0),
    horizontal: Wa(d, e, !1)
  };
}
function Ve(t, r) {
  var e = t.state, n = e.containerClientRect, a = n.clientHeight, i = n.clientWidth, o = n.clientLeft, s = n.clientTop, u = e.snapOffset, f = u.left, l = u.top, v = u.right, c = u.bottom, p = r || t.props.bounds || {}, d = p.position || "client", g = d === "css", h = p.left, m = h === void 0 ? -1 / 0 : h, x = p.top, S = x === void 0 ? -1 / 0 : x, D = p.right, E = D === void 0 ? g ? -1 / 0 : 1 / 0 : D, b = p.bottom, C = b === void 0 ? g ? -1 / 0 : 1 / 0 : b;
  return g && (E = i + v - f - E, C = a + c - l - C), {
    left: m + f - o,
    right: E + f - o,
    top: S + l - s,
    bottom: C + l - s
  };
}
function Cf(t, r, e) {
  var n = Ve(t), a = n.left, i = n.top, o = n.right, s = n.bottom, u = w(e, 2), f = u[0], l = u[1], v = w(Q(e, r), 2), c = v[0], p = v[1];
  B(c) < kt && (c = 0), B(p) < kt && (p = 0);
  var d = p > 0, g = c > 0, h = {
    isBound: !1,
    offset: 0,
    pos: 0
  }, m = {
    isBound: !1,
    offset: 0,
    pos: 0
  };
  if (c === 0 && p === 0)
    return {
      vertical: h,
      horizontal: m
    };
  if (c === 0)
    d ? s < l && (m.pos = s, m.offset = l - s) : i > l && (m.pos = i, m.offset = l - i);
  else if (p === 0)
    g ? o < f && (h.pos = o, h.offset = f - o) : a > f && (h.pos = a, h.offset = f - a);
  else {
    var x = p / c, S = e[1] - x * f, D = 0, E = 0, b = !1;
    g && o <= f ? (D = x * o + S, E = o, b = !0) : !g && f <= a && (D = x * a + S, E = a, b = !0), b && (D < i || D > s) && (b = !1), b || (d && s <= l ? (D = s, E = (D - S) / x, b = !0) : !d && l <= i && (D = i, E = (D - S) / x, b = !0)), b && (h.isBound = !0, h.pos = E, h.offset = f - E, m.isBound = !0, m.pos = D, m.offset = l - D);
  }
  return {
    vertical: h,
    horizontal: m
  };
}
function Wa(t, r, e) {
  var n = t[e ? "left" : "top"], a = t[e ? "right" : "bottom"], i = Math.min.apply(Math, N([], w(r), !1)), o = Math.max.apply(Math, N([], w(r), !1)), s = [];
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
function Ha(t, r, e) {
  var n = e ? t.map(function(a) {
    return oe(a, e);
  }) : t;
  return n.some(function(a) {
    return a[0] < r.left && B(a[0] - r.left) > 0.1 || a[0] > r.right && B(a[0] - r.right) > 0.1 || a[1] < r.top && B(a[1] - r.top) > 0.1 || a[1] > r.bottom && B(a[1] - r.bottom) > 0.1;
  });
}
function _f(t, r, e) {
  var n = Vt(t), a = Math.sqrt(n * n - r * r) || 0;
  return [a, -a].sort(function(i, o) {
    return B(i - t[e ? 0 : 1]) - B(o - t[e ? 0 : 1]);
  }).map(function(i) {
    return St([0, 0], e ? [i, r] : [r, i]);
  });
}
function Mf(t, r, e, n, a) {
  if (!t.props.bounds)
    return [];
  var i = a * Math.PI / 180, o = Ve(t), s = o.left, u = o.top, f = o.right, l = o.bottom, v = s - n[0], c = f - n[0], p = u - n[1], d = l - n[1], g = {
    left: v,
    top: p,
    right: c,
    bottom: d
  };
  if (!Ha(e, g, 0))
    return [];
  var h = [];
  return [
    [v, 0],
    [c, 0],
    [p, 1],
    [d, 1]
  ].forEach(function(m) {
    var x = w(m, 2), S = x[0], D = x[1];
    e.forEach(function(E) {
      var b = St([0, 0], E);
      h.push.apply(h, N([], w(_f(E, S, D).map(function(C) {
        return i + C - b;
      }).filter(function(C) {
        return !Ha(r, g, C);
      }).map(function(C) {
        return tt(C * 180 / Math.PI, kt);
      })), !1));
    });
  }), h;
}
var Rf = ["left", "right", "center"], wf = ["top", "bottom", "middle"], La = {
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
}, pr = {
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
function Xr(t, r) {
  var e = t.props, n = e.snappable, a = e.bounds, i = e.innerBounds, o = e.verticalGuidelines, s = e.horizontalGuidelines, u = e.snapGridWidth, f = e.snapGridHeight, l = t.state, v = l.guidelines, c = l.enableSnap;
  return !n || !c || r && n !== !0 && n.indexOf(r) < 0 ? !1 : !!(u || f || a || i || v && v.length || o && o.length || s && s.length);
}
function sa(t) {
  return t === !1 ? {} : t === !0 || !t ? { left: !0, right: !0, top: !0, bottom: !0 } : t;
}
function Tf(t, r) {
  var e = sa(t), n = {};
  for (var a in e)
    a in r && e[a] && (n[a] = r[a]);
  return n;
}
function ua(t, r) {
  var e = Tf(t, r), n = wf.filter(function(i) {
    return i in e;
  }), a = Rf.filter(function(i) {
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
function Of(t, r, e) {
  var n = xt(t, [r.clientLeft, r.clientTop], e);
  return [
    r.left + n[0],
    r.top + n[1]
  ];
}
function Pf(t) {
  var r = w(t, 2), e = r[0], n = r[1], a = n[0] - e[0], i = n[1] - e[1];
  Math.abs(a) < Et && (a = 0), Math.abs(i) < Et && (i = 0);
  var o = 0, s = 0, u = 0;
  return a ? i ? (o = -i / a, s = 1, u = o * e[0] - e[1]) : (s = 1, u = -e[1]) : (o = -1, u = e[0]), [o, s, u].map(function(f) {
    return tt(f, Et);
  });
}
var lo = "snapRotationThreshold", co = "snapRotationDegrees", vo = "snapHorizontalThreshold", po = "snapVerticalThreshold";
function qe(t, r, e, n, a, i, o) {
  var s;
  n === void 0 && (n = []), a === void 0 && (a = []);
  var u = t.props, f = ((s = t.state.snapThresholdInfo) === null || s === void 0 ? void 0 : s.multiples) || [1, 1], l = ni(o, u[vo], 5), v = ni(i, u[po], 5);
  return go(t.state.guidelines, r, e, n, a, l, v, f);
}
function go(t, r, e, n, a, i, o, s) {
  return {
    vertical: Xa(t, "vertical", r, o * s[0], n),
    horizontal: Xa(t, "horizontal", e, i * s[1], a)
  };
}
function If(t, r, e) {
  var n = w(e, 2), a = n[0], i = n[1], o = w(r, 2), s = o[0], u = o[1], f = w(Q(e, r), 2), l = f[0], v = f[1], c = v > 0, p = l > 0;
  l = Ne(l), v = Ne(v);
  var d = {
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
      vertical: d,
      horizontal: g
    };
  var h = qe(t, l ? [a] : [], v ? [i] : [], [], [], void 0, void 0), m = h.vertical, x = h.horizontal;
  m.posInfos.filter(function(k) {
    var F = k.pos;
    return p ? F >= s : F <= s;
  }), x.posInfos.filter(function(k) {
    var F = k.pos;
    return c ? F >= u : F <= u;
  }), m.isSnap = m.posInfos.length > 0, x.isSnap = x.posInfos.length > 0;
  var S = Tn(m), D = S.isSnap, E = S.guideline, b = Tn(x), C = b.isSnap, y = b.guideline, _ = C ? y.pos[1] : 0, R = D ? E.pos[0] : 0;
  if (l === 0)
    C && (g.isSnap = !0, g.pos = y.pos[1], g.offset = i - g.pos);
  else if (v === 0)
    D && (d.isSnap = !0, d.pos = R, d.offset = a - R);
  else {
    var P = v / l, O = e[1] - P * a, T = 0, I = 0, z = !1;
    D ? (I = R, T = P * I + O, z = !0) : C && (T = _, I = (T - O) / P, z = !0), z && (d.isSnap = !0, d.pos = I, d.offset = a - I, g.isSnap = !0, g.pos = T, g.offset = i - T);
  }
  return {
    vertical: d,
    horizontal: g
  };
}
function ur(t) {
  var r = "";
  return t === -1 || t === "top" || t === "left" ? r = "start" : t === 0 || t === "center" || t === "middle" ? r = "center" : (t === 1 || t === "right" || t === "bottom") && (r = "end"), r;
}
function Ya(t, r, e, n) {
  var a = ua(t.props.snapDirections, r), i = qe(t, a.vertical, a.horizontal, a.verticalNames.map(function(u) {
    return ur(u);
  }), a.horizontalNames.map(function(u) {
    return ur(u);
  }), e, n), o = ur(a.horizontalNames[i.horizontal.index]), s = ur(a.verticalNames[i.vertical.index]);
  return {
    vertical: M(M({}, i.vertical), { direction: s }),
    horizontal: M(M({}, i.horizontal), { direction: o })
  };
}
function Tn(t) {
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
function Xa(t, r, e, n, a) {
  var i, o;
  if (a === void 0 && (a = []), !t || !t.length)
    return {
      isSnap: !1,
      index: -1,
      direction: "",
      posInfos: []
    };
  var s = r === "vertical", u = s ? 0 : 1, f = e.map(function(v, c) {
    var p = a[c] || "", d = t.map(function(g) {
      var h = g.pos, m = v - h[u];
      return {
        offset: m,
        dist: B(m),
        guideline: g,
        direction: p
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
      guidelineInfos: d,
      direction: p
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
function zf(t, r, e, n, a) {
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
  ].forEach(function(c, p, d) {
    var g = d[p + 1] || d[0];
    i.push(c), i.push([
      (c[0] + g[0]) / 2,
      (c[1] + g[1]) / 2
    ]);
  }) : t.props.keepRatio ? i.push([-1, -1], [-1, 1], [1, -1], [1, 1], e) : (i.push.apply(i, N([], w(uf([
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
  }), f = qe(t, s, u, i.map(function(c) {
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
function ho(t, r) {
  var e = B(t.offset), n = B(r.offset);
  return t.isBound && r.isBound ? n - e : t.isBound ? -1 : r.isBound ? 1 : t.isSnap && r.isSnap ? n - e : t.isSnap ? -1 : r.isSnap || e < kt ? 1 : n < kt ? -1 : e - n;
}
function Be(t, r) {
  return t.slice().sort(function(e, n) {
    var a = e.sign[r], i = n.sign[r], o = e.offset[r], s = n.offset[r];
    if (a) {
      if (!i)
        return -1;
    } else return 1;
    return ho({ isBound: e.isBound, isSnap: e.isSnap, offset: o }, { isBound: n.isBound, isSnap: n.isSnap, offset: s });
  })[0];
}
function Gf(t, r, e) {
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
function mo(t, r) {
  var e = mn([r[0][0], r[1][0]]), n = mn([r[0][1], r[1][1]]);
  return {
    vertical: e <= t[0],
    horizontal: n <= t[1]
  };
}
function fa(t, r) {
  var e = w(r, 2), n = e[0], a = e[1], i = a[0] - n[0], o = a[1] - n[1];
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
function xo(t, r, e, n) {
  return n === void 0 && (n = kt), t.every(function(a) {
    var i = fa(a, r), o = i <= 0;
    return o === e || B(i) <= n;
  });
}
function Va(t, r, e, n, a) {
  return a === void 0 && (a = 0), n && r - a <= t || !n && t <= e + a ? {
    isBound: !0,
    offset: n ? r - t : e - t
  } : {
    isBound: !1,
    offset: 0
  };
}
function Bf(t, r) {
  var e = r.line, n = r.centerSign, a = r.verticalSign, i = r.horizontalSign, o = r.lineConstants, s = t.props.innerBounds;
  if (!s)
    return {
      isAllBound: !1,
      isBound: !1,
      isVerticalBound: !1,
      isHorizontalBound: !1,
      offset: [0, 0]
    };
  var u = s.left, f = s.top, l = s.width, v = s.height, c = [[u, f], [u, f + v]], p = [[u, f], [u + l, f]], d = [[u + l, f], [u + l, f + v]], g = [[u, f + v], [u + l, f + v]];
  if (xo([
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
  var h = fr(e, o, p, a), m = fr(e, o, g, a), x = fr(e, o, c, i), S = fr(e, o, d, i), D = h.isBound && m.isBound, E = h.isBound || m.isBound, b = x.isBound && S.isBound, C = x.isBound || S.isBound, y = Fr(h.offset, m.offset), _ = Fr(x.offset, S.offset), R = [0, 0], P = !1, O = !1;
  return B(_) < B(y) ? (R = [y, 0], P = E, O = D) : (R = [0, _], P = C, O = b), {
    isAllBound: O,
    isVerticalBound: E,
    isHorizontalBound: C,
    isBound: P,
    offset: R
  };
}
function fr(t, r, e, n, a, i) {
  var o = w(r, 2), s = o[0], u = o[1], f = t[0], l = e[0], v = e[1], c = Ne(v[1] - l[1]), p = Ne(v[0] - l[0]), d = u, g = s, h = -s / u;
  if (p) {
    if (!c) {
      if (i && !d)
        return {
          isBound: !1,
          offset: 0
        };
      if (g) {
        var D = (l[1] - f[1]) / h + f[0];
        return Va(D, l[0], v[0], n, a);
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
    if (d) {
      var m = h * (l[0] - f[0]) + f[1];
      return Va(m, l[1], v[1], n, a);
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
function So(t, r, e) {
  return r.map(function(n) {
    var a = Bf(t, n), i = a.isBound, o = a.offset, s = a.isVerticalBound, u = a.isHorizontalBound, f = n.multiple, l = Qt({
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
function Af(t, r, e) {
  var n, a = la(t, r, [0, 0], !1).map(function(c) {
    return M(M({}, c), { multiple: c.multiple.map(function(p) {
      return B(p) * 2;
    }) });
  }), i = So(t, a, e), o = Be(i, 0), s = Be(i, 1), u = 0, f = 0, l = o.isVerticalBound || s.isVerticalBound, v = o.isHorizontalBound || s.isHorizontalBound;
  return (l || v) && (n = w(of({
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
function kf(t, r) {
  var e = [], n = t[0], a = t[1];
  return n && a ? e.push([[0, a * 2], t, [-n, a]], [[n * 2, 0], t, [n, -a]]) : n ? (e.push([[n * 2, 0], [n, 1], [n, -1]]), r && e.push([[0, -1], [n, -1], [-n, -1]], [[0, 1], [n, 1], [-n, 1]])) : a ? (e.push([[0, a * 2], [1, a], [-1, a]]), r && e.push([[-1, 0], [-1, a], [-1, -a]], [[1, 0], [1, a], [1, -a]])) : e.push([[-1, 0], [-1, -1], [-1, 1]], [[1, 0], [1, -1], [1, 1]], [[0, -1], [-1, -1], [1, -1]], [[0, 1], [-1, 1], [1, 1]]), e;
}
function la(t, r, e, n) {
  var a = t.state, i = a.allMatrix, o = a.is3d, s = Mr(i, 100, 100, o ? 4 : 3), u = _t(s, [0, 0]);
  return kf(e, n).map(function(f) {
    var l = w(f, 3), v = l[0], c = l[1], p = l[2], d = [
      _t(s, c),
      _t(s, p)
    ], g = Pf(d), h = mo(u, d), m = h.vertical, x = h.horizontal, S = fa(u, d) <= 0;
    return {
      multiple: v,
      centerSign: S,
      verticalSign: m,
      horizontalSign: x,
      lineConstants: g,
      line: [
        _t(r, c),
        _t(r, p)
      ]
    };
  });
}
function qa(t, r, e, n) {
  var a = n ? t.map(function(i) {
    return oe(i, n);
  }) : t;
  return [
    [a[0], a[1]],
    [a[1], a[3]],
    [a[3], a[2]],
    [a[2], a[0]]
  ].some(function(i) {
    var o = fa(e, i) <= 0;
    return !xo(r, i, o);
  });
}
function Ff(t) {
  var r = w(t, 2), e = r[0], n = r[1], a = n[0] - e[0], i = n[1] - e[1];
  if (!a)
    return B(e[0]);
  if (!i)
    return B(e[1]);
  var o = i / a;
  return B((-o * e[0] + e[1]) / Math.sqrt(Math.pow(o, 2) + 1));
}
function Nf(t) {
  var r = w(t, 2), e = r[0], n = r[1], a = n[0] - e[0], i = n[1] - e[1];
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
function Wf(t, r, e, n, a) {
  var i = t.props.innerBounds, o = a * Math.PI / 180;
  if (!i)
    return [];
  var s = i.left, u = i.top, f = i.width, l = i.height, v = s - n[0], c = s + f - n[0], p = u - n[1], d = u + l - n[1], g = [
    [v, p],
    [c, p],
    [v, d],
    [c, d]
  ], h = _t(e, [0, 0]);
  if (!qa(e, g, h, 0))
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
    var D = St([0, 0], Nf(S)), E = Ff(S);
    m.push.apply(m, N([], w(x.filter(function(b) {
      var C = w(b, 1), y = C[0];
      return y && E <= y;
    }).map(function(b) {
      var C = w(b, 2), y = C[0], _ = C[1], R = Math.acos(y ? E / y : 0), P = _ + R, O = _ - R;
      return [
        o + P - D,
        o + O - D
      ];
    }).reduce(function(b, C) {
      return b.push.apply(b, N([], w(C), !1)), b;
    }, []).filter(function(b) {
      return !qa(r, g, h, b);
    }).map(function(b) {
      return tt(b * 180 / Math.PI, kt);
    })), !1));
  }), m;
}
function Hf(t) {
  var r = t.props.innerBounds, e = Pr();
  if (!r)
    return {
      boundMap: e,
      vertical: [],
      horizontal: []
    };
  var n = t.getRect(), a = n.pos1, i = n.pos2, o = n.pos3, s = n.pos4, u = [a, i, o, s], f = _t(u, [0, 0]), l = r.left, v = r.top, c = r.width, p = r.height, d = [[l, v], [l, v + p]], g = [[l, v], [l + c, v]], h = [[l + c, v], [l + c, v + p]], m = [[l, v + p], [l + c, v + p]], x = la(t, u, [0, 0], !1), S = [], D = [];
  return x.forEach(function(E) {
    var b = E.line, C = E.lineConstants, y = mo(f, b), _ = y.horizontal, R = y.vertical, P = fr(b, C, g, R, 1, !0), O = fr(b, C, m, R, 1, !0), T = fr(b, C, d, _, 1, !0), I = fr(b, C, h, _, 1, !0);
    P.isBound && !e.top && (S.push(v), e.top = !0), O.isBound && !e.bottom && (S.push(v + p), e.bottom = !0), T.isBound && !e.left && (D.push(l), e.left = !0), I.isBound && !e.right && (D.push(l + c), e.right = !0);
  }), {
    boundMap: e,
    horizontal: S,
    vertical: D
  };
}
function Lf(t, r, e, n) {
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
function On(t, r, e, n, a) {
  var i = Lf(t, r, e, n);
  if (!i)
    return {
      isOutside: !1,
      offset: [0, 0]
    };
  var o = rr(t, r), s = rr(i, t), u = rr(i, r), f = s > o || u > o, l = w(Qt({
    datas: a,
    distX: i[0],
    distY: i[1]
  }), 2), v = l[0], c = l[1];
  return {
    offset: [v, c],
    isOutside: f
  };
}
function Ae(t, r) {
  return t.isBound ? t.offset : r.isSnap ? Tn(r).offset : 0;
}
function Yf(t, r, e, n, a) {
  var i = w(r, 2), o = i[0], s = i[1], u = w(e, 2), f = u[0], l = u[1], v = w(n, 2), c = v[0], p = v[1], d = w(a, 2), g = d[0], h = d[1], m = -g, x = -h;
  if (t && o && s) {
    m = 0, x = 0;
    var S = [];
    if (f && l ? S.push([0, h], [g, 0]) : f ? S.push([g, 0]) : l ? S.push([0, h]) : c && p ? S.push([0, h], [g, 0]) : c ? S.push([g, 0]) : p && S.push([0, h]), S.length) {
      S.sort(function(C, y) {
        return Vt(Q([o, s], C)) - Vt(Q([o, s], y));
      });
      var D = S[0];
      if (D[0] && B(o) > Et)
        m = -D[0], x = s * B(o + m) / B(o) - s;
      else if (D[1] && B(s) > Et) {
        var E = s;
        x = -D[1], m = o * B(s + x) / B(E) - o;
      }
      if (t && l && f)
        if (B(m) > Et && B(m) < B(g)) {
          var b = B(g) / B(m);
          m *= b, x *= b;
        } else if (B(x) > Et && B(x) < B(h)) {
          var b = B(h) / B(x);
          m *= b, x *= b;
        } else
          m = Fr(-g, m), x = Fr(-h, x);
    }
  } else
    m = o || f ? -g : 0, x = s || l ? -h : 0;
  return [m, x];
}
function Xf(t, r, e, n, a, i) {
  if (!Xr(t, "draggable"))
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
  var o = pa(i.absolutePoses, [r, e]), s = Xt(o), u = s.left, f = s.right, l = s.top, v = s.bottom, c = {
    horizontal: o.map(function(I) {
      return I[1];
    }),
    vertical: o.map(function(I) {
      return I[0];
    })
  }, p = sa(t.props.snapDirections), d = ua(p, {
    left: u,
    right: f,
    top: l,
    bottom: v,
    center: (u + f) / 2,
    middle: (l + v) / 2
  }), g = je(t, a, d, c), h = g.vertical, m = g.horizontal, x = Af(t, o, i), S = x.vertical, D = x.horizontal, E = h.isSnap, b = m.isSnap, C = h.isBound || S.isBound, y = m.isBound || D.isBound, _ = Fr(h.offset, S.offset), R = Fr(m.offset, D.offset), P = w(Yf(n, [r, e], [C, y], [E, b], [_, R]), 2), O = P[0], T = P[1];
  return [
    {
      isBound: C,
      isSnap: E,
      offset: O
    },
    {
      isBound: y,
      isSnap: b,
      offset: T
    }
  ];
}
function je(t, r, e, n) {
  n === void 0 && (n = e);
  var a = oa(Ve(t), n.vertical, n.horizontal), i = a.horizontal, o = a.vertical, s = r ? {
    horizontal: { isSnap: !1, index: -1 },
    vertical: { isSnap: !1, index: -1 }
  } : qe(t, e.vertical, e.horizontal, void 0, void 0, void 0, void 0), u = s.horizontal, f = s.vertical, l = Ae(i[0], u), v = Ae(o[0], f), c = B(l), p = B(v);
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
      dist: p,
      bounds: o,
      snap: f
    }
  };
}
function ja(t, r, e, n, a, i, o) {
  o === void 0 && (o = [1, 1]);
  var s = oa(r, e, n), u = s.horizontal, f = s.vertical, l = go(t, e, n, [], [], a, i, o), v = l.horizontal, c = l.vertical, p = Ae(u[0], v), d = Ae(f[0], c), g = B(p), h = B(d);
  return {
    horizontal: {
      isBound: u[0].isBound,
      isSnap: v.isSnap,
      snapIndex: v.index,
      offset: p,
      dist: g,
      bounds: u,
      snap: v
    },
    vertical: {
      isBound: f[0].isBound,
      isSnap: c.isSnap,
      snapIndex: c.index,
      offset: d,
      dist: h,
      bounds: f,
      snap: c
    }
  };
}
function Vf(t, r, e, n) {
  var a = St(t, r) / Math.PI * 180, i = e.vertical, o = i.isBound, s = i.isSnap, u = i.dist, f = e.horizontal, l = f.isBound, v = f.isSnap, c = f.dist, p = a % 180, d = p < 3 || p > 177, g = p > 87 && p < 93;
  return c < u && (o || s && !g && (!n || !d)) ? "vertical" : l || v && !d && (!n || !g) ? "horizontal" : "";
}
function qf(t, r, e, n, a, i) {
  return e.map(function(o) {
    var s = w(o, 2), u = s[0], f = s[1], l = _t(r, u), v = _t(r, f), c = n ? jf(t, l, v, a) : je(t, a, {
      vertical: [v[0]],
      horizontal: [v[1]]
    }), p = c.horizontal, d = p.offset, g = p.isBound, h = p.isSnap, m = c.vertical, x = m.offset, S = m.isBound, D = m.isSnap, E = Q(f, u);
    if (!x && !d)
      return {
        isBound: S || g,
        isSnap: D || h,
        sign: E,
        offset: [0, 0]
      };
    var b = Vf(l, v, c, n);
    if (!b)
      return {
        sign: E,
        isBound: !1,
        isSnap: !1,
        offset: [0, 0]
      };
    var C = b === "vertical", y = [0, 0];
    return !n && B(f[0]) === 1 && B(f[1]) === 1 && u[0] !== f[0] && u[1] !== f[1] ? y = Qt({
      datas: i,
      distX: -x,
      distY: -d
    }) : y = On(l, v, -(C ? x : d), C, i).offset, y = y.map(function(_, R) {
      return _ * (E[R] ? 2 / E[R] : 0);
    }), {
      sign: E,
      isBound: C ? S : g,
      isSnap: C ? D : h,
      offset: y
    };
  });
}
function Ua(t, r) {
  return t.isBound ? t.offset : r.isSnap ? r.offset : 0;
}
function jf(t, r, e, n) {
  var a = Cf(t, r, e), i = a.horizontal, o = a.vertical, s = n ? {
    horizontal: { isSnap: !1 },
    vertical: { isSnap: !1 }
  } : If(t, r, e), u = s.horizontal, f = s.vertical, l = Ua(i, u), v = Ua(o, f), c = B(l), p = B(v);
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
      dist: p
    }
  };
}
function Uf(t, r, e, n, a) {
  var i = [-e[0], -e[1]], o = t.state, s = o.width, u = o.height, f = t.props.bounds, l = 1 / 0, v = 1 / 0;
  if (f) {
    var c = [
      [e[0], -e[1]],
      [-e[0], e[1]]
    ], p = f.left, d = p === void 0 ? -1 / 0 : p, g = f.top, h = g === void 0 ? -1 / 0 : g, m = f.right, x = m === void 0 ? 1 / 0 : m, S = f.bottom, D = S === void 0 ? 1 / 0 : S;
    c.forEach(function(E) {
      var b = E[0] !== i[0], C = E[1] !== i[1], y = _t(r, E), _ = St(n, y) * 360 / Math.PI;
      if (C) {
        var R = y.slice();
        (B(_ - 360) < 2 || B(_ - 180) < 2) && (R[1] = n[1]);
        var P = On(n, R, (n[1] < y[1] ? D : h) - y[1], !1, a), O = w(P.offset, 2), T = O[1], I = P.isOutside;
        isNaN(T) || (v = u + (I ? 1 : -1) * B(T));
      }
      if (b) {
        var R = y.slice();
        (B(_ - 90) < 2 || B(_ - 270) < 2) && (R[0] = n[0]);
        var z = On(n, R, (n[0] < y[0] ? x : d) - y[0], !0, a), k = w(z.offset, 1), F = k[0], A = z.isOutside;
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
    o.draggable = a || t.targetGesto, e.datas = {}, e.left = parseFloat(s.left || "") || 0, e.top = parseFloat(s.top || "") || 0, e.bottom = parseFloat(s.bottom || "") || 0, e.right = parseFloat(s.right || "") || 0, e.startValue = [0, 0], _r(t, r), Xe(t, r, "translate"), pl(t, e), e.prevDist = [0, 0], e.prevBeforeDist = [0, 0], e.isDrag = !1, e.deltaOffset = [0, 0];
    var u = nt(t, r, M({ set: function(l) {
      e.startValue = l;
    } }, Ye(t, r))), f = n || U(t, "onDragStart", u);
    return f !== !1 ? (e.isDrag = !0, t.state.dragInfo = {
      startRect: t.getRect(),
      dist: [0, 0]
    }) : (o.draggable = null, e.isPinch = !1), e.isDrag ? u : !1;
  },
  drag: function(t, r) {
    if (r) {
      He(t, r, "translate");
      var e = r.datas, n = r.parentEvent, a = r.parentFlag, i = r.isPinch, o = r.deltaOffset, s = r.useSnap, u = r.isRequest, f = r.isGroup, l = r.parentThrottleDrag, v = r.distX, c = r.distY, p = e.isDrag, d = e.prevDist, g = e.prevBeforeDist, h = e.startValue;
      if (p) {
        o && (v += o[0], c += o[1]);
        var m = t.props, x = m.parentMoveable, S = f ? 0 : m.throttleDrag || l || 0, D = n ? 0 : m.throttleDragRotate || 0, E = 0, b = !1, C = !1, y = !1, _ = !1;
        if (!n && D > 0 && (v || c)) {
          var R = m.startDragRotate || 0, P = tt(R + St([0, 0], [v, c]) * 180 / Math.PI, D) - R, O = c * Math.abs(Math.cos((P - 90) / 180 * Math.PI)), T = v * Math.abs(Math.cos(P / 180 * Math.PI)), I = Vt([T, O]);
          E = P * Math.PI / 180, v = I * Math.cos(E), c = I * Math.sin(E);
        }
        if (!i && !n && !a) {
          var z = w(Xf(t, v, c, D, !s && u || o, e), 2), k = z[0], F = z[1];
          b = k.isSnap, C = k.isBound, y = F.isSnap, _ = F.isBound;
          var A = k.offset, W = F.offset;
          v += A, c += W;
        }
        var H = ut(Qi({ datas: e, distX: v, distY: c }), h), G = ut(af({ datas: e, distX: v, distY: c }), h);
        za(G, kt), za(H, kt), D || (!b && !C && (G[0] = tt(G[0], S), H[0] = tt(H[0], S)), !y && !_ && (G[1] = tt(G[1], S), H[1] = tt(H[1], S)));
        var V = Q(H, h), q = Q(G, h), L = Q(q, d), j = Q(V, g);
        e.prevDist = q, e.prevBeforeDist = V, e.passDelta = L, e.passDist = q;
        var Y = e.left + V[0], $ = e.top + V[1], J = e.right - V[0], at = e.bottom - V[1], st = Le(e, "translate(".concat(G[0], "px, ").concat(G[1], "px)"), "translate(".concat(q[0], "px, ").concat(q[1], "px)"));
        if (aa(r, st), t.state.dragInfo.dist = n ? [0, 0] : q, !(!n && !x && L.every(function(et) {
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
    var u = on(t, this, "dragStart", [
      i || 0,
      o || 0
    ], r, !1, "draggable"), f = u.childEvents, l = u.eventParams, v = M(M({}, s), { targets: t.props.targets, events: l }), c = U(t, "onDragGroupStart", v);
    a.isDrag = c !== !1;
    var p = (n = (e = f[0]) === null || e === void 0 ? void 0 : e.datas.startValue) !== null && n !== void 0 ? n : [0, 0];
    return a.throttleOffset = [p[0] % 1, p[1] % 1], a.isDrag ? s : !1;
  },
  dragGroup: function(t, r) {
    var e = r.datas;
    if (e.isDrag) {
      var n = this.drag(t, M(M({}, r), { parentThrottleDrag: t.props.throttleDrag })), a = r.datas.passDelta, i = on(t, this, "drag", a, r, !1, "draggable").eventParams;
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
      var a = on(t, this, "dragEnd", [0, 0], r, !1, "draggable").eventParams;
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
function Do(t, r) {
  var e = _t(t, r), n = [0, 0];
  return {
    fixedPosition: e,
    fixedDirection: r,
    fixedOffset: n
  };
}
function $f(t, r) {
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
function bo(t, r) {
  var e = t.allMatrix, n = t.is3d, a = t.width, i = t.height, o = n ? 4 : 3, s = pf(r, a, i), u = xt(e, r, o), f = [
    a ? 0 : r[0],
    i ? 0 : r[1]
  ];
  return {
    fixedPosition: u,
    fixedDirection: s,
    fixedOffset: f
  };
}
var $a = ha("resizable"), Pn = {
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
  render: so("resizable"),
  dragControlCondition: $a,
  viewClassName: ga("resizable"),
  dragControlStart: function(t, r) {
    var e, n = r.inputEvent, a = r.isPinch, i = r.isGroup, o = r.parentDirection, s = r.parentGesto, u = r.datas, f = r.parentFixedDirection, l = r.parentEvent, v = Go(o, a, n, u), c = t.state, p = c.target, d = c.width, g = c.height, h = c.gestos;
    if (!v || !p || h.resizable)
      return !1;
    h.resizable = s || t.controlGesto, !a && _r(t, r), u.datas = {}, u.direction = v, u.startOffsetWidth = d, u.startOffsetHeight = g, u.prevWidth = 0, u.prevHeight = 0, u.minSize = [0, 0], u.startWidth = c.inlineCSSWidth || c.cssWidth, u.startHeight = c.inlineCSSHeight || c.cssHeight, u.maxSize = [1 / 0, 1 / 0], i || (u.minSize = [
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
      var R = Do(u.startPositions, _);
      u.fixedDirection = R.fixedDirection, u.fixedPosition = R.fixedPosition, u.fixedOffset = R.fixedOffset;
    }
    function D(_) {
      var R = bo(t.state, _);
      u.fixedDirection = R.fixedDirection, u.fixedPosition = R.fixedPosition, u.fixedOffset = R.fixedOffset;
    }
    function E(_) {
      u.minSize = [
        vt("".concat(_[0]), 0) || 0,
        vt("".concat(_[1]), 0) || 0
      ];
    }
    function b(_) {
      var R = [
        _[0] || 1 / 0,
        _[1] || 1 / 0
      ];
      (!te(R[0]) || isFinite(R[0])) && (R[0] = vt("".concat(R[0]), 0) || 1 / 0), (!te(R[1]) || isFinite(R[1])) && (R[1] = vt("".concat(R[1]), 0) || 1 / 0), u.maxSize = R;
    }
    x(d / g), S(f || [-v[0], -v[1]]), u.setFixedDirection = S, u.setFixedPosition = D, u.setMin = E, u.setMax = b;
    var C = nt(t, r, {
      direction: v,
      startRatio: u.ratio,
      set: function(_) {
        var R = w(_, 2), P = R[0], O = R[1];
        u.startWidth = P, u.startHeight = O;
      },
      setMin: E,
      setMax: b,
      setRatio: x,
      setFixedDirection: S,
      setFixedPosition: D,
      setOrigin: function(_) {
        u.transformOrigin = _;
      },
      dragStart: Gt.dragStart(t, new Ar().dragStart([0, 0], r))
    }), y = l || U(t, "onResizeStart", C);
    return u.startFixedDirection = u.fixedDirection, u.startFixedPosition = u.fixedPosition, y !== !1 && (u.isResize = !0, t.state.snapRenderInfo = {
      request: r.isRequest,
      direction: v
    }), u.isResize ? C : !1;
  },
  dragControl: function(t, r) {
    var e, n = r.datas, a = r.parentFlag, i = r.isPinch, o = r.parentKeepRatio, s = r.dragClient, u = r.parentDist, f = r.useSnap, l = r.isRequest, v = r.isGroup, c = r.parentEvent, p = r.resolveMatrix, d = n.isResize, g = n.transformOrigin, h = n.startWidth, m = n.startHeight, x = n.prevWidth, S = n.prevHeight, D = n.minSize, E = n.maxSize, b = n.ratio, C = n.startOffsetWidth, y = n.startOffsetHeight, _ = n.isWidth;
    if (!d)
      return;
    if (p) {
      var R = t.state.is3d, P = n.startOffsetMatrix, O = n.startTransformOrigin, T = R ? 4 : 3, I = ee(ze(r)), z = Math.sqrt(I.length);
      T !== z && (I = Zt(I, z, T));
      var k = ce(P, I, O, T), F = Mr(k, C, y, T);
      n.startPositions = F, n.nextTargetMatrix = I, n.nextAllMatrix = k;
    }
    var A = Cr(t.props, "resizable"), W = A.resizeFormat, H = A.throttleResize, G = H === void 0 ? a ? 0 : 1 : H, V = A.parentMoveable, q = A.keepRatioFinally, L = n.direction, j = L, Y = 0, $ = 0;
    !L[0] && !L[1] && (j = [1, 1]);
    var J = b && (o ?? A.keepRatio) || !1;
    function at() {
      var Dt = n.fixedDirection, yt = Wo(j, J, n, r);
      Y = yt.distWidth, $ = yt.distHeight;
      var ir = j[0] - Dt[0] || J ? Math.max(C + Y, kt) : C, or = j[1] - Dt[1] || J ? Math.max(y + $, kt) : y;
      return J && C && y && (_ ? or = ir / b : ir = or * b), [ir, or];
    }
    var st = w(at(), 2), X = st[0], Z = st[1];
    c || (n.setFixedDirection(n.fixedDirection), U(t, "onBeforeResize", nt(t, r, {
      startFixedDirection: n.startFixedDirection,
      startFixedPosition: n.startFixedPosition,
      setFixedDirection: function(Dt) {
        var yt;
        return n.setFixedDirection(Dt), yt = w(at(), 2), X = yt[0], Z = yt[1], [X, Z];
      },
      setFixedPosition: function(Dt) {
        var yt;
        return n.setFixedPosition(Dt), yt = w(at(), 2), X = yt[0], Z = yt[1], [X, Z];
      },
      boundingWidth: X,
      boundingHeight: Z,
      setSize: function(Dt) {
        var yt;
        yt = w(Dt, 2), X = yt[0], Z = yt[1];
      }
    }, !0)));
    var ft = s;
    s || (!a && i ? ft = mf(t, [0, 0]) : ft = n.fixedPosition);
    var rt = [0, 0];
    i || (rt = cl(t, X, Z, L, ft, !f && l, n)), u && (!u[0] && (rt[0] = 0), !u[1] && (rt[1] = 0));
    function et() {
      var Dt;
      W && (Dt = w(W([X, Z]), 2), X = Dt[0], Z = Dt[1]), X = tt(X, G), Z = tt(Z, G);
    }
    if (J) {
      j[0] && j[1] && rt[0] && rt[1] && (B(rt[0]) > B(rt[1]) ? rt[1] = 0 : rt[0] = 0);
      var ot = !rt[0] && !rt[1];
      ot && et(), j[0] && !j[1] || rt[0] && !rt[1] || ot && _ ? (X += rt[0], Z = X / b) : (!j[0] && j[1] || !rt[0] && rt[1] || ot && !_) && (Z += rt[1], X = Z * b);
    } else
      X += rt[0], Z += rt[1], X = Math.max(0, X), Z = Math.max(0, Z);
    e = w(zi([X, Z], D, E, J ? b : !1), 2), X = e[0], Z = e[1], et(), J && (v || q) && (_ ? Z = X / b : X = Z * b), Y = X - C, $ = Z - y;
    var ct = [Y - x, $ - S];
    n.prevWidth = Y, n.prevHeight = $;
    var dt = hf(t, X, Z, ft, g, n);
    if (!(!V && ct.every(function(Dt) {
      return !Dt;
    }) && dt.every(function(Dt) {
      return !Dt;
    }))) {
      var it = Gt.drag(t, le(r, t.state, dt, !!i, !1, "draggable")), lt = it.transform, Mt = h + Y, It = m + $, Tt = nt(t, r, M({ width: Mt, height: It, offsetWidth: Math.round(X), offsetHeight: Math.round(Z), startRatio: b, boundingWidth: X, boundingHeight: Z, direction: L, dist: [Y, $], delta: ct, isPinch: !!i, drag: it }, Ao({
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
      var u = t.state, f = u.width, l = u.height, v = f - (a + o), c = l - (i + s), p = B(v) > 3, d = B(c) > 3;
      if (p && (e.startWidth += v, e.startOffsetWidth += v, e.prevWidth += v), d && (e.startHeight += c, e.startOffsetHeight += c, e.prevHeight += c), p || d)
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
  dragGroupControlCondition: $a,
  dragGroupControlStart: function(t, r) {
    var e = r.datas, n = this.dragControlStart(t, M(M({}, r), { isGroup: !0 }));
    if (!n)
      return !1;
    var a = Ut(t, "resizable", r), i = e.startOffsetWidth, o = e.startOffsetHeight;
    function s() {
      var p = e.minSize;
      a.forEach(function(d) {
        var g = d.datas, h = g.minSize, m = g.startOffsetWidth, x = g.startOffsetHeight, S = i * (m ? h[0] / m : 0), D = o * (x ? h[1] / x : 0);
        p[0] = Math.max(p[0], S), p[1] = Math.max(p[1], D);
      });
    }
    function u() {
      var p = e.maxSize;
      a.forEach(function(d) {
        var g = d.datas, h = g.maxSize, m = g.startOffsetWidth, x = g.startOffsetHeight, S = i * (m ? h[0] / m : 0), D = o * (x ? h[1] / x : 0);
        p[0] = Math.min(p[0], S), p[1] = Math.min(p[1], D);
      });
    }
    var f = er(t, this, "dragControlStart", r, function(p, d) {
      return Ge(t, p, e, d);
    });
    s(), u();
    var l = function(p) {
      n.setFixedDirection(p), f.forEach(function(d, g) {
        d.setFixedDirection(p), Ge(t, d.moveable, e, a[g]);
      });
    };
    e.setFixedDirection = l;
    var v = M(M({}, n), { targets: t.props.targets, events: f.map(function(p) {
      return M(M({}, p), { setMin: function(d) {
        p.setMin(d), s();
      }, setMax: function(d) {
        p.setMax(d), u();
      } });
    }), setFixedDirection: l, setMin: function(p) {
      n.setMin(p), s();
    }, setMax: function(p) {
      n.setMax(p), u();
    } }), c = U(t, "onResizeGroupStart", v);
    return e.isResize = c !== !1, e.isResize ? n : !1;
  },
  dragGroupControl: function(t, r) {
    var e = r.datas;
    if (e.isResize) {
      var n = Cr(t.props, "resizable");
      $e(t, "onBeforeResize", function(p) {
        U(t, "onBeforeResizeGroup", nt(t, r, M(M({}, p), { targets: n.targets }), !0));
      });
      var a = this.dragControl(t, M(M({}, r), { isGroup: !0 }));
      if (a) {
        var i = a.boundingWidth, o = a.boundingHeight, s = a.dist, u = n.keepRatio, f = [
          i / (i - s[0]),
          o / (o - s[1])
        ], l = e.fixedPosition, v = er(t, this, "dragControl", r, function(p, d) {
          var g = w(Pt(se(t.rotation / 180 * Math.PI, 3), [
            d.datas.originalX * f[0],
            d.datas.originalY * f[1],
            1
          ], 3), 2), h = g[0], m = g[1];
          return M(M({}, d), { parentDist: null, parentScale: f, dragClient: ut(l, [h, m]), parentKeepRatio: u });
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
function sn(t, r, e, n, a) {
  var i = t.props.groupable, o = t.state, s = o.is3d ? 4 : 3, u = r.origin, f = xt(
    t.state.rootMatrix,
    // TO-DO #710
    Q([u[0], u[1]], i ? [0, 0] : [o.left, o.top]),
    s
  ), l = ut([a.left, a.top], f);
  r.startAbsoluteOrigin = l, r.prevDeg = St(l, [e, n]) / Math.PI * 180, r.defaultDeg = r.prevDeg, r.prevSnapDeg = 0, r.loop = 0, r.startDist = rr(l, [e, n]);
}
function Re(t, r, e) {
  var n = e.defaultDeg, a = e.prevDeg, i = a % 360, o = Math.floor(a / 360);
  i < 0 && (i += 360), i > t && i > 270 && t < 90 ? ++o : i < t && i < 90 && t > 270 && --o;
  var s = r * (o * 360 + t - n);
  return e.prevDeg = n + s, s;
}
function un(t, r, e, n) {
  return Re(St(n.startAbsoluteOrigin, [t, r]) / Math.PI * 180, e, n);
}
function fn(t, r, e, n, a, i) {
  var o = t.props.throttleRotate, s = o === void 0 ? 0 : o, u = e.prevSnapDeg, f = 0, l = !1;
  if (i) {
    var v = ll(t, r, n, a + n);
    l = v.isSnap, f = a + v.dist;
  }
  l || (f = tt(a + n, s));
  var c = f - a;
  return e.prevSnapDeg = c, [c - u, c, f];
}
function Eo(t, r, e) {
  var n = w(r, 4), a = n[0], i = n[1], o = n[2], s = n[3];
  if (t === "none")
    return [];
  if (Rt(t))
    return t.map(function(h) {
      return Eo(h, [a, i, o, s], e)[0];
    });
  var u = w((t || "top").split("-"), 2), f = u[0], l = u[1], v = [a, i];
  f === "left" ? v = [o, a] : f === "right" ? v = [i, s] : f === "bottom" && (v = [s, o]);
  var c = [
    (v[0][0] + v[1][0]) / 2,
    (v[0][1] + v[1][1]) / 2
  ], p = Io(v, e);
  if (l) {
    var d = l === "top" || l === "left", g = f === "bottom" || f === "left";
    c = v[d && !g || !d && g ? 0 : 1];
  }
  return [[c, p]];
}
function In(t, r) {
  if (r.isRequest)
    return r.requestAble === "rotatable";
  var e = r.inputEvent.target;
  if (Ct(e, K("rotation-control")) || t.props.rotateAroundControls && Ct(e, K("around-control")) || Ct(e, K("control")) && Ct(e, K("rotatable")))
    return !0;
  var n = t.props.rotationTarget;
  return n ? ma(n, !0).some(function(a) {
    return a ? e === a || e.contains(a) : !1;
  }) : !1;
}
var Zf = `.rotation {
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
`, Kf = {
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
  css: [Zf],
  viewClassName: function(t) {
    return t.isDragging("rotatable") ? K("view-rotation-dragging") : "";
  },
  render: function(t, r) {
    var e = Cr(t.props, "rotatable"), n = e.rotatable, a = e.rotationPosition, i = e.zoom, o = e.renderDirections, s = e.rotateAroundControls, u = e.resolveAblesWithRotatable, f = t.getState(), l = f.renderPoses, v = f.direction;
    if (!n)
      return null;
    var c = Eo(a, l, v), p = [];
    if (c.forEach(function(m, x) {
      var S = w(m, 2), D = S[0], E = S[1];
      p.push(r.createElement(
        "div",
        { key: "rotation".concat(x), className: K("rotation"), style: {
          // tslint:disable-next-line: max-line-length
          transform: "translate(-50%) translate(".concat(D[0], "px, ").concat(D[1], "px) rotate(").concat(E, "rad)")
        } },
        r.createElement("div", { className: K("line rotation-line"), style: {
          transform: "scaleX(".concat(i, ")")
        } }),
        r.createElement("div", { className: K("control rotation-control"), style: {
          transform: "translate(0.5px) scale(".concat(i, ")")
        } })
      ));
    }), o) {
      var d = Hr(u || {}), g = {};
      d.forEach(function(m) {
        u[m].forEach(function(x) {
          g[x] = m;
        });
      });
      var h = [];
      Rt(o) && (h = o.map(function(m) {
        var x = g[m];
        return {
          data: x ? { resolve: x } : {},
          classNames: x ? ["move"] : [],
          dir: m
        };
      })), p.push.apply(p, N([], w(ao(t, "rotatable", h, r)), !1));
    }
    return s && p.push.apply(p, N([], w(fo(t, r)), !1)), p;
  },
  dragControlCondition: In,
  dragControlStart: function(t, r) {
    var e, n, a = r.datas, i = r.clientX, o = r.clientY, s = r.parentRotate, u = r.parentFlag, f = r.isPinch, l = r.isRequest, v = t.state, c = v.target, p = v.left, d = v.top, g = v.direction, h = v.beforeDirection, m = v.targetTransform, x = v.moveableClientRect, S = v.offsetMatrix, D = v.targetMatrix, E = v.allMatrix, b = v.width, C = v.height;
    if (!l && !c)
      return !1;
    var y = t.getRect();
    a.rect = y, a.transform = m, a.left = p, a.top = d;
    var _ = function(j) {
      var Y = bo(t.state, j);
      a.fixedDirection = Y.fixedDirection, a.fixedOffset = Y.fixedOffset, a.fixedPosition = Y.fixedPosition, G && G.setFixedPosition(j);
    }, R = function(j) {
      var Y = $f(t.state, j);
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
        var z = I.getAttribute("data-direction") || "", k = rf[z];
        if (k) {
          a.isControl = !0, a.isAroundControl = Ct(I, K("around-control")), a.controlDirection = k;
          var F = I.getAttribute("data-resolve");
          F && (a.resolveAble = F);
          var A = Ml(v.rootMatrix, v.renderPoses, x);
          e = w(_t(A, k), 2), P = e[0], O = e[1];
        }
      }
      a.beforeInfo = { origin: y.beforeOrigin }, a.afterInfo = { origin: y.origin }, a.absoluteInfo = {
        origin: y.origin,
        startValue: y.rotation
      };
      var W = _;
      _ = function(j) {
        var Y = v.is3d ? 4 : 3, $ = w(ut(Fi(D, Y), j), 2), J = $[0], at = $[1], st = Pt(S, br([J, at], Y)), X = Pt(E, br([j[0], j[1]], Y));
        W(j);
        var Z = v.posDelta;
        a.beforeInfo.origin = Q(st, Z), a.afterInfo.origin = Q(X, Z), a.absoluteInfo.origin = Q(X, Z), sn(t, a.beforeInfo, P, O, x), sn(t, a.afterInfo, P, O, x), sn(t, a.absoluteInfo, P, O, x);
      }, R = function(j) {
        var Y = _t([
          [0, 0],
          [b, 0],
          [0, C],
          [b, C]
        ], j);
        _(Y);
      };
    }
    a.startClientX = P, a.startClientY = O, a.direction = g, a.beforeDirection = h, a.startValue = 0, a.datas = {}, Xe(t, r, "rotate");
    var H = !1, G = !1;
    if (a.isControl && a.resolveAble) {
      var V = a.resolveAble;
      V === "resizable" && (G = Pn.dragControlStart(t, M(M({}, new Ar("resizable").dragStart([0, 0], r)), { parentPosition: a.controlPosition, parentFixedPosition: a.fixedPosition })));
    }
    G || (H = Gt.dragStart(t, new Ar().dragStart([0, 0], r))), _(Rl(t));
    var q = nt(t, r, M(M({ set: function(j) {
      a.startValue = j * Math.PI / 180;
    }, setFixedDirection: R, setFixedPosition: _ }, Ye(t, r)), { dragStart: H, resizeStart: G })), L = U(t, "onRotateStart", q);
    return a.isRotate = L !== !1, v.snapRenderInfo = {
      request: r.isRequest
    }, a.isRotate ? q : !1;
  },
  dragControl: function(t, r) {
    var e, n, a, i = r.datas, o = r.clientDistX, s = r.clientDistY, u = r.parentRotate, f = r.parentFlag, l = r.isPinch, v = r.groupDelta, c = r.resolveMatrix, p = i.beforeDirection, d = i.beforeInfo, g = i.afterInfo, h = i.absoluteInfo, m = i.isRotate, x = i.startValue, S = i.rect, D = i.startClientX, E = i.startClientY;
    if (m) {
      He(t, r, "rotate");
      var b = nf(r), C = p * b, y = t.props.parentMoveable, _ = 0, R, P, O = 0, T, I, z = 0, k, F, A = 180 / Math.PI * x, W = h.startValue, H = !1, G = D + o, V = E + s;
      if (!f && "parentDist" in r) {
        var q = r.parentDist;
        R = q, T = q, k = q;
      } else l || f ? (R = Re(u, p, d), T = Re(u, C, g), k = Re(u, C, h)) : (R = un(G, V, p, d), T = un(G, V, C, g), k = un(G, V, C, h), H = !0);
      if (P = A + R, I = A + T, F = W + k, U(t, "onBeforeRotate", nt(t, r, {
        beforeRotation: P,
        rotation: I,
        absoluteRotation: F,
        setRotation: function(ft) {
          T = ft - A, R = T, k = T;
        }
      }, !0)), e = w(fn(t, S, d, R, A, H), 3), _ = e[0], R = e[1], P = e[2], n = w(fn(t, S, g, T, A, H), 3), O = n[0], T = n[1], I = n[2], a = w(fn(t, S, h, k, W, H), 3), z = a[0], k = a[1], F = a[2], !(!z && !O && !_ && !y && !c)) {
        var L = Le(i, "rotate(".concat(I, "deg)"), "rotate(".concat(T, "deg)"));
        c && (i.fixedPosition = ia(t, i.targetAllTransform, i.fixedDirection, i.fixedOffset, i));
        var j = gf(t, T, i), Y = Q(ut(v || [0, 0], j), i.prevInverseDist || [0, 0]);
        i.prevInverseDist = j, i.requestValue = null;
        var $ = ro(t, L, Y, l, r), J = $, at = rr([G, V], h.startAbsoluteOrigin) - h.startDist, st = void 0;
        if (i.resolveAble === "resizable") {
          var X = Pn.dragControl(t, M(M({}, le(r, t.state, [r.deltaX, r.deltaY], !!l, !1, "resizable")), { resolveMatrix: !0, parentDistance: at }));
          X && (st = X, J = Ao(J, X, r));
        }
        var Z = nt(t, r, M(M({ delta: O, dist: T, rotate: I, rotation: I, beforeDist: R, beforeDelta: _, beforeRotate: P, beforeRotation: P, absoluteDist: k, absoluteDelta: z, absoluteRotate: F, absoluteRotation: F, isPinch: !!l, resize: st }, $), J));
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
  dragGroupControlCondition: In,
  dragGroupControlStart: function(t, r) {
    var e = r.datas, n = t.state, a = n.left, i = n.top, o = n.beforeOrigin, s = this.dragControlStart(t, r);
    if (!s)
      return !1;
    s.set(e.beforeDirection * t.rotation);
    var u = er(t, this, "dragControlStart", r, function(v, c) {
      var p = v.state, d = p.left, g = p.top, h = p.beforeOrigin, m = ut(Q([d, g], [a, i]), Q(h, o));
      return c.datas.startGroupClient = m, c.datas.groupClient = m, M(M({}, c), { parentRotate: 0 });
    }), f = M(M({}, s), { targets: t.props.targets, events: u }), l = U(t, "onRotateGroupStart", f);
    return e.isRotate = l !== !1, e.isRotate ? s : !1;
  },
  dragGroupControl: function(t, r) {
    var e = r.datas;
    if (e.isRotate) {
      $e(t, "onBeforeRotate", function(f) {
        U(t, "onBeforeRotateGroup", nt(t, r, M(M({}, f), { targets: t.props.targets }), !0));
      });
      var n = this.dragControl(t, r);
      if (n) {
        var a = e.beforeDirection, i = n.beforeDist, o = i / 180 * Math.PI, s = er(t, this, "dragControl", r, function(f, l) {
          var v = l.datas.startGroupClient, c = w(l.datas.groupClient, 2), p = c[0], d = c[1], g = w(oe(v, o * a), 2), h = g[0], m = g[1], x = [h - p, m - d];
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
function Jf(t, r) {
  var e, n = t.direction, a = t.classNames, i = t.size, o = t.pos, s = t.zoom, u = t.key, f = n === "horizontal", l = f ? "Y" : "X";
  return r.createElement("div", {
    key: u,
    className: a.join(" "),
    style: (e = {}, e[f ? "width" : "height"] = "".concat(i), e.transform = "translate(".concat(o[0], ", ").concat(o[1], ") translate").concat(l, "(-50%) scale").concat(l, "(").concat(s, ")"), e)
  });
}
function ca(t, r) {
  return Jf(M(M({}, t), { classNames: N([
    K("line", "guideline", t.direction)
  ], w(t.classNames), !1).filter(function(e) {
    return e;
  }), size: t.size || "".concat(t.sizeValue, "px"), pos: t.pos || t.posValue.map(function(e) {
    return "".concat(tt(e, 0.1), "px");
  }) }), r);
}
function Za(t, r, e, n, a, i, o, s) {
  var u = t.props.zoom;
  return e.map(function(f, l) {
    var v = f.type, c = f.pos, p = [0, 0];
    return p[o] = n, p[o ? 0 : 1] = -a + c, ca({
      key: "".concat(r, "TargetGuideline").concat(l),
      classNames: [K("target", "bold", v)],
      posValue: p,
      sizeValue: i,
      zoom: u,
      direction: r
    }, s);
  });
}
function Ka(t, r, e, n, a, i) {
  var o = t.props, s = o.zoom, u = o.isDisplayInnerSnapDigit, f = r === "horizontal" ? vr : pr, l = a[f.start], v = a[f.end];
  return e.filter(function(c) {
    var p = c.hide, d = c.elementRect;
    if (p)
      return !1;
    if (u && d) {
      var g = d.rect;
      if (g[f.start] <= l && v <= g[f.end])
        return !1;
    }
    return !0;
  }).map(function(c, p) {
    var d = c.pos, g = c.size, h = c.element, m = c.className, x = [
      -n[0] + d[0],
      -n[1] + d[1]
    ];
    return ca({
      key: "".concat(r, "-default-guideline-").concat(p),
      classNames: h ? [K("bold"), m] : [K("normal"), m],
      direction: r,
      posValue: x,
      sizeValue: g,
      zoom: s
    }, i);
  });
}
function qr(t, r, e, n, a, i, o, s) {
  var u, f = t.props, l = f.snapDigit, v = l === void 0 ? 0 : l, c = f.isDisplaySnapDigit, p = c === void 0 ? !0 : c, d = f.snapDistFormat, g = d === void 0 ? function(E, b) {
    return E;
  } : d, h = f.zoom, m = r === "horizontal" ? "X" : "Y", x = r === "vertical" ? "height" : "width", S = Math.abs(a), D = p ? parseFloat(S.toFixed(v)) : 0;
  return s.createElement(
    "div",
    { key: "".concat(r, "-").concat(e, "-guideline-").concat(n), className: K("guideline-group", r), style: (u = {
      left: "".concat(i[0], "px"),
      top: "".concat(i[1], "px")
    }, u[x] = "".concat(S, "px"), u) },
    ca({
      direction: r,
      classNames: [K(e), o],
      size: "100%",
      posValue: [0, 0],
      sizeValue: S,
      zoom: h
    }, s),
    s.createElement("div", { className: K("size-value", "gap"), style: {
      transform: "translate".concat(m, "(-50%) scale(").concat(h, ")")
    } }, D > 0 ? g(D, r) : "")
  );
}
function Qf(t, r, e, n) {
  var a = t === "vertical" ? 0 : 1, i = t === "vertical" ? 1 : 0, o = a ? vr : pr, s = e[o.start], u = e[o.end];
  return ko(r, function(f) {
    return f.pos[a];
  }).map(function(f) {
    var l = [], v = [], c = [];
    return f.forEach(function(p) {
      var d, g, h = p.element, m = p.elementRect.rect;
      if (m[o.end] < s)
        l.push(p);
      else if (u < m[o.start])
        v.push(p);
      else if (m[o.start] <= s && u <= m[o.end] && n) {
        var x = p.pos, S = { element: h, rect: M(M({}, m), (d = {}, d[o.end] = m[o.start], d)) }, D = { element: h, rect: M(M({}, m), (g = {}, g[o.start] = m[o.end], g)) }, E = [0, 0], b = [0, 0];
        E[a] = x[a], E[i] = x[i], b[a] = x[a], b[i] = x[i] + p.size, l.push({
          type: t,
          pos: E,
          size: 0,
          elementRect: S,
          direction: "",
          elementDirection: "end"
        }), v.push({
          type: t,
          pos: b,
          size: 0,
          elementRect: D,
          direction: "",
          elementDirection: "start"
        });
      }
    }), l.sort(function(p, d) {
      return d.pos[i] - p.pos[i];
    }), v.sort(function(p, d) {
      return p.pos[i] - d.pos[i];
    }), {
      total: f,
      start: l,
      end: v,
      inner: c
    };
  });
}
function tl(t, r, e, n, a) {
  var i = t.props.isDisplayInnerSnapDigit, o = [];
  return ["vertical", "horizontal"].forEach(function(s) {
    var u = r.filter(function(h) {
      return h.type === s;
    }), f = s === "vertical" ? 1 : 0, l = f ? 0 : 1, v = Qf(s, u, n, i), c = f ? pr : vr, p = f ? vr : pr, d = n[c.start], g = n[c.end];
    v.forEach(function(h) {
      var m = h.total, x = h.start, S = h.end, D = h.inner, E = e[l] + m[0].pos[l] - n[p.start], b = n;
      x.forEach(function(C) {
        var y = C.elementRect.rect, _ = b[c.start] - y[c.end];
        if (_ > 0) {
          var R = [0, 0];
          R[f] = e[f] + b[c.start] - d - _, R[l] = E, o.push(qr(t, s, "dashed", o.length, _, R, C.className, a));
        }
        b = y;
      }), b = n, S.forEach(function(C) {
        var y = C.elementRect.rect, _ = y[c.start] - b[c.end];
        if (_ > 0) {
          var R = [0, 0];
          R[f] = e[f] + b[c.end] - d, R[l] = E, o.push(qr(t, s, "dashed", o.length, _, R, C.className, a));
        }
        b = y;
      }), D.forEach(function(C) {
        var y = C.elementRect.rect, _ = d - y[c.start], R = y[c.end] - g, P = [0, 0], O = [0, 0];
        P[f] = e[f] - _, P[l] = E, O[f] = e[f] + g - d, O[l] = E, o.push(qr(t, s, "dashed", o.length, _, P, C.className, a)), o.push(qr(t, s, "dashed", o.length, R, O, C.className, a));
      });
    });
  }), o;
}
function rl(t, r, e, n, a) {
  var i = [];
  return ["horizontal", "vertical"].forEach(function(o) {
    var s = r.filter(function(h) {
      return h.type === o;
    }).slice(0, 1), u = o === "vertical" ? 0 : 1, f = u ? 0 : 1, l = u ? pr : vr, v = u ? vr : pr, c = n[l.start], p = n[l.end], d = n[v.start], g = n[v.end];
    s.forEach(function(h) {
      var m = h.gap, x = h.gapRects, S = Math.max.apply(Math, N([d], w(x.map(function(b) {
        var C = b.rect;
        return C[v.start];
      })), !1)), D = Math.min.apply(Math, N([g], w(x.map(function(b) {
        var C = b.rect;
        return C[v.end];
      })), !1)), E = (S + D) / 2;
      S === D || E === (d + g) / 2 || x.forEach(function(b) {
        var C = b.rect, y = b.className, _ = [e[0], e[1]];
        if (C[l.end] < c)
          _[u] += C[l.end] - c;
        else if (p < C[l.start])
          _[u] += C[l.start] - c - m;
        else
          return;
        _[f] += E - d, i.push(qr(t, u ? "vertical" : "horizontal", "gap", i.length, m, _, y, a));
      });
    });
  }), i;
}
function zn(t) {
  var r, e, n = t.state, a = n.containerClientRect, i = n.hasFixed, o = a.overflow, s = a.scrollHeight, u = a.scrollWidth, f = a.clientHeight, l = a.clientWidth, v = a.clientLeft, c = a.clientTop, p = t.props, d = p.snapGap, g = d === void 0 ? !0 : d, h = p.verticalGuidelines, m = p.horizontalGuidelines, x = p.snapThreshold, S = x === void 0 ? 5 : x, D = p.maxSnapElementGuidelineDistance, E = D === void 0 ? 1 / 0 : D, b = p.isDisplayGridGuidelines, C = Xt(qt(t.state)), y = C.top, _ = C.left, R = C.bottom, P = C.right, O = { top: y, left: _, bottom: R, right: P, center: (_ + P) / 2, middle: (y + R) / 2 }, T = il(t), I = N([], w(T), !1), z = ((e = (r = n.snapThresholdInfo) === null || r === void 0 ? void 0 : r.multiples) !== null && e !== void 0 ? e : [1, 1]).map(function(W) {
    return W * S;
  });
  g && I.push.apply(I, N([], w(el(t, O, z)), !1));
  var k = M({}, n.snapOffset || {
    left: 0,
    top: 0,
    bottom: 0,
    right: 0
  });
  if (I.push.apply(I, N([], w(al(t, o ? u : l, o ? s : f, v, c, k, b)), !1)), i) {
    var F = a.left, A = a.top;
    k.left += F, k.top += A, k.right += F, k.bottom += A;
  }
  return I.push.apply(I, N([], w(Co(m || !1, h || !1, o ? u : l, o ? s : f, v, c, k)), !1)), I = I.filter(function(W) {
    var H = W.element, G = W.elementRect, V = W.type;
    if (!H || !G)
      return !0;
    var q = G.rect;
    return yo(O, q, V, E);
  }), I;
}
function el(t, r, e) {
  var n = t.props, a = n.maxSnapElementGuidelineDistance, i = a === void 0 ? 1 / 0 : a, o = n.maxSnapElementGapDistance, s = o === void 0 ? 1 / 0 : o, u = t.state.elementRects, f = [];
  return [
    ["vertical", vr, pr],
    ["horizontal", pr, vr]
  ].forEach(function(l) {
    var v = w(l, 3), c = v[0], p = v[1], d = v[2], g = r[p.start], h = r[p.end], m = r[p.center], x = r[d.start], S = r[d.end], D = {
      left: e[0],
      top: e[1]
    };
    function E(y) {
      var _ = y.rect, R = D[p.start];
      return _[p.end] < g + R ? g - _[p.end] : h - R < _[p.start] ? _[p.start] - h : -1;
    }
    var b = u.filter(function(y) {
      var _ = y.rect;
      return _[d.start] > S || _[d.end] < x ? !1 : E(y) > 0;
    }).sort(function(y, _) {
      return E(y) - E(_);
    }), C = [];
    b.forEach(function(y) {
      b.forEach(function(_) {
        if (y !== _) {
          var R = y.rect, P = _.rect, O = R[d.start], T = R[d.end], I = P[d.start], z = P[d.end];
          O > z || I > T || C.push([y, _]);
        }
      });
    }), C.forEach(function(y) {
      var _ = w(y, 2), R = _[0], P = _[1], O = R.rect, T = P.rect, I = O[p.start], z = O[p.end], k = T[p.start], F = T[p.end], A = D[p.start], W = 0, H = 0, G = !1, V = !1, q = !1;
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
      W && yo(r, T, c, i) && (W > s || f.push({
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
        gapRects: [R, P],
        direction: "",
        elementDirection: ""
      }));
    });
  }), f;
}
function nl(t, r, e, n) {
  var a, i, o = t.props, s = t.state, u = o.snapGridAll, f = o.snapGridWidth, l = f === void 0 ? 0 : f, v = o.snapGridHeight, c = v === void 0 ? 0 : v, p = s.snapRenderInfo, d = p && (((a = p.direction) === null || a === void 0 ? void 0 : a[0]) || ((i = p.direction) === null || i === void 0 ? void 0 : i[1])), g = t.moveables;
  if (u && g && d && (l || c)) {
    if (s.snapThresholdInfo)
      return;
    s.snapThresholdInfo = {
      multiples: [1, 1],
      offset: [0, 0]
    };
    var h = t.getRect(), m = h.children, x = p.direction;
    if (m) {
      var S = x.map(function(E, b) {
        var C = b === 0 ? {
          snapSize: l,
          posName: "left",
          sizeName: "width",
          clientOffset: n.left - r
        } : {
          snapSize: c,
          posName: "top",
          sizeName: "height",
          clientOffset: n.top - e
        }, y = C.snapSize, _ = C.posName, R = C.sizeName, P = C.clientOffset;
        if (!y)
          return {
            dir: E,
            multiple: 1,
            snapSize: y,
            snapOffset: 0
          };
        var O = h[R], T = h[_], I = $s(m.map(function(G) {
          return [
            G[_] - T,
            G[R],
            O - G[R] - G[_] + T
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
        var W = (-E + 1) / 2, H = Oe(T - P, T - P + O, W, 1 - W);
        return {
          multiple: A * F,
          dir: E,
          snapSize: y,
          snapOffset: Math.round(H / y)
        };
      }), D = S.map(function(E) {
        return E.multiple || 1;
      });
      s.snapThresholdInfo.multiples = D, s.snapThresholdInfo.offset = S.map(function(E) {
        return E.snapOffset;
      }), S.forEach(function(E, b) {
        E.snapSize;
      });
    }
  } else
    s.snapThresholdInfo = null;
}
function al(t, r, e, n, a, i, o) {
  n === void 0 && (n = 0), a === void 0 && (a = 0);
  var s = t.props, u = t.state, f = s.snapGridWidth, l = f === void 0 ? 0 : f, v = s.snapGridHeight, c = v === void 0 ? 0 : v, p = [], d = i.left, g = i.top, h = [0, 0];
  nl(t, n, a, i);
  var m = u.snapThresholdInfo, x = l, S = c;
  if (m && (l *= m.multiples[0] || 1, c *= m.multiples[1] || 1, h = m.offset), c) {
    for (var D = function(b) {
      p.push({
        type: "horizontal",
        pos: [
          d,
          tt(h[1] * S + b - a + g, 0.1)
        ],
        className: K("grid-guideline"),
        size: r,
        hide: !o,
        direction: "",
        grid: !0
      });
    }, E = 0; E <= e * 2; E += c)
      D(E);
    for (var E = -c; E >= -e; E -= c)
      D(E);
  }
  if (l) {
    for (var D = function(C) {
      p.push({
        type: "vertical",
        pos: [
          tt(h[0] * x + C - n + d, 0.1),
          g
        ],
        className: K("grid-guideline"),
        size: e,
        hide: !o,
        direction: "",
        grid: !0
      });
    }, E = 0; E <= r * 2; E += l)
      D(E);
    for (var E = -l; E >= -r; E -= l)
      D(E);
  }
  return p;
}
function yo(t, r, e, n) {
  return e === "horizontal" ? B(t.right - r.left) <= n || B(t.left - r.right) <= n || t.left <= r.right && r.left <= t.right : e === "vertical" ? B(t.bottom - r.top) <= n || B(t.top - r.bottom) <= n || t.top <= r.bottom && r.top <= t.bottom : !0;
}
function il(t) {
  var r = t.state, e = t.props.elementGuidelines, n = e === void 0 ? [] : e;
  if (!n.length)
    return r.elementRects = [], [];
  var a = (r.elementRects || []).filter(function(c) {
    return !c.refresh;
  }), i = n.map(function(c) {
    return $t(c) && "element" in c ? M(M({}, c), { element: Kt(c.element, !0) }) : {
      element: Kt(c, !0)
    };
  }).filter(function(c) {
    return c.element;
  }), o = gu(a.map(function(c) {
    return c.element;
  }), i.map(function(c) {
    return c.element;
  })), s = o.maintained, u = o.added, f = [];
  s.forEach(function(c) {
    var p = w(c, 2), d = p[0], g = p[1];
    f[g] = a[d];
  }), ol(t, u.map(function(c) {
    return i[c];
  })).map(function(c, p) {
    f[u[p]] = c;
  }), r.elementRects = f;
  var l = sa(t.props.elementSnapDirections), v = [];
  return f.forEach(function(c) {
    var p = c.element, d = c.top, g = d === void 0 ? l.top : d, h = c.left, m = h === void 0 ? l.left : h, x = c.right, S = x === void 0 ? l.right : x, D = c.bottom, E = D === void 0 ? l.bottom : D, b = c.center, C = b === void 0 ? l.center : b, y = c.middle, _ = y === void 0 ? l.middle : y, R = c.className, P = c.rect, O = ua({
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
        element: p,
        pos: [
          tt(V, 0.1),
          F
        ],
        size: H,
        sizes: G,
        className: R,
        elementRect: c,
        elementDirection: La[k[q]] || k[q],
        direction: ""
      });
    }), T.forEach(function(V, q) {
      v.push({
        type: "horizontal",
        element: p,
        pos: [
          A,
          tt(V, 0.1)
        ],
        size: W,
        sizes: G,
        className: R,
        elementRect: c,
        elementDirection: La[z[q]] || z[q],
        direction: ""
      });
    });
  }), v;
}
function Ja(t, r) {
  return t ? t.map(function(e) {
    var n = $t(e) ? e : { pos: e }, a = n.pos;
    return te(a) ? n : M(M({}, n), { pos: vt(a, r) });
  }) : [];
}
function Co(t, r, e, n, a, i, o) {
  a === void 0 && (a = 0), i === void 0 && (i = 0), o === void 0 && (o = { left: 0, top: 0, right: 0, bottom: 0 });
  var s = [], u = o.left, f = o.top, l = o.bottom, v = o.right, c = e + v - u, p = n + l - f;
  return Ja(t, p).forEach(function(d) {
    s.push({
      type: "horizontal",
      pos: [
        u,
        tt(d.pos - i + f, 0.1)
      ],
      size: c,
      className: d.className,
      direction: ""
    });
  }), Ja(r, c).forEach(function(d) {
    s.push({
      type: "vertical",
      pos: [
        tt(d.pos - a + u, 0.1),
        f
      ],
      size: p,
      className: d.className,
      direction: ""
    });
  }), s;
}
function ol(t, r) {
  if (!r.length)
    return [];
  var e = t.props.groupable, n = t.state, a = n.containerClientRect, i = n.rootMatrix, o = n.is3d, s = n.offsetDelta, u = o ? 4 : 3, f = w(Of(i, a, u), 2), l = f[0], v = f[1], c = e ? 0 : s[0], p = e ? 0 : s[1];
  return r.map(function(d) {
    var g = d.element.getBoundingClientRect(), h = g.left - l - c, m = g.top - v - p, x = m + g.height, S = h + g.width, D = w(Nr(i, [h, m], u), 2), E = D[0], b = D[1], C = w(Nr(i, [S, x], u), 2), y = C[0], _ = C[1];
    return M(M({}, d), { rect: {
      left: E,
      right: y,
      top: b,
      bottom: _,
      center: (E + y) / 2,
      middle: (b + _) / 2
    } });
  });
}
function be(t) {
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
    var o = Kt(n, !0);
    if (o) {
      var s = Jr(o), u = ai(r, [
        s.left - a.left,
        s.top - a.top
      ]), f = ai(r, [
        s.right - a.right,
        s.bottom - a.bottom
      ]);
      i.left = tt(u[0], 1e-5), i.top = tt(u[1], 1e-5), i.right = tt(f[0], 1e-5), i.bottom = tt(f[1], 1e-5);
    }
  }
  return r.snapContainer = n, r.snapOffset = i, r.guidelines = zn(t), r.enableSnap = !0, !0;
}
function _o(t, r, e, n, a, i) {
  var o = Mr(t, r, e, i ? 4 : 3), s = _t(o, n);
  return pa(o, Q(a, s));
}
function Qa(t) {
  return t ? t / B(t) : 0;
}
function sl(t, r, e, n, a, i) {
  var o = i.fixedDirection, s = Gf(e, o, n), u = la(t, r, e, n), f = N(N([], w(qf(t, r, s, n, a, i)), !1), w(So(t, u, i)), !1), l = Be(f, 0), v = Be(f, 1);
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
function ul(t, r, e, n, a, i, o, s, u) {
  var f = _t(r, o), l = je(t, s, {
    vertical: [f[0]],
    horizontal: [f[1]]
  }), v = l.horizontal.offset, c = l.vertical.offset;
  if (tt(c, Mn) || tt(v, Mn)) {
    var p = w(Qt({
      datas: u,
      distX: -c,
      distY: -v
    }), 2), d = p[0], g = p[1], h = Math.min(a || 1 / 0, e + o[0] * d), m = Math.min(i || 1 / 0, n + o[1] * g);
    return [h - e, m - n];
  }
  return [0, 0];
}
function Mo(t, r, e, n, a, i, o, s) {
  for (var u = qt(t.state), f = t.props.keepRatio, l = 0, v = 0, c = 0; c < 2; ++c) {
    var p = r(l, v), d = sl(t, p, a, f, o, s), g = d.width, h = d.height, m = g.isBound, x = h.isBound, S = g.offset, D = h.offset;
    if (c === 1 && (m || (S = 0), x || (D = 0)), c === 0 && o && !m && !x)
      return [0, 0];
    if (f) {
      var E = B(S) * (e ? 1 / e : 1), b = B(D) * (n ? 1 / n : 1), C = m && x ? E < b : x || !m && E < b;
      C ? S = e * D / n : D = n * S / e;
    }
    l += S, v += D;
  }
  if (!f && a[0] && a[1]) {
    var y = Uf(t, u, a, i, s), _ = y.maxWidth, R = y.maxHeight, P = w(ul(t, r(l, v).map(function(I) {
      return I.map(function(z) {
        return tt(z, Mn);
      });
    }), e + l, n + v, _, R, a, o, s), 2), S = P[0], D = P[1];
    l += S, v += D;
  }
  return [l, v];
}
function Zr(t) {
  return t < 0 && (t = t % 360 + 360), t %= 360, t;
}
function fl(t, r) {
  r = Zr(r);
  var e = Math.floor(t / 360), n = e * 360 + 360 - r, a = e * 360 + r;
  return B(t - n) < B(t - a) ? n : a;
}
function ln(t, r) {
  t = Zr(t), r = Zr(r);
  var e = Zr(t - r);
  return Math.min(e, 360 - e);
}
function ll(t, r, e, n) {
  var a, i = t.props, o = (a = i[lo]) !== null && a !== void 0 ? a : 5, s = i[co];
  if (Xr(t, "rotatable")) {
    var u = r.pos1, f = r.pos2, l = r.pos3, v = r.pos4, c = r.origin, p = e * Math.PI / 180, d = [u, f, l, v].map(function(D) {
      return Q(D, c);
    }), g = d.map(function(D) {
      return oe(D, p);
    }), h = N(N([], w(Mf(t, d, g, c, e)), !1), w(Wf(t, d, g, c, e)), !1);
    h.sort(function(D, E) {
      return B(D - e) - B(E - e);
    });
    var m = h.length > 0;
    if (m)
      return {
        isSnap: m,
        dist: m ? h[0] : e
      };
  }
  if (s?.length && o) {
    var x = s.slice().sort(function(D, E) {
      return ln(D, n) - ln(E, n);
    }), S = x[0];
    if (ln(S, n) <= o)
      return {
        isSnap: !0,
        dist: e + fl(n, S) - n
      };
  }
  return {
    isSnap: !1,
    dist: e
  };
}
function cl(t, r, e, n, a, i, o) {
  if (!Xr(t, "resizable"))
    return [0, 0];
  var s = o.fixedDirection, u = o.nextAllMatrix, f = t.state, l = f.allMatrix, v = f.is3d;
  return Mo(t, function(c, p) {
    return _o(u || l, r + c, e + p, s, a, v);
  }, r, e, n, a, i, o);
}
function vl(t, r, e, n, a) {
  if (!Xr(t, "scalable"))
    return [0, 0];
  var i = a.startOffsetWidth, o = a.startOffsetHeight, s = a.fixedPosition, u = a.fixedDirection, f = a.is3d, l = Mo(t, function(v, c) {
    return _o(cf(a, ut(r, [v / i, c / o])), i, o, u, s, f);
  }, i, o, e, s, n, a);
  return [l[0] / i, l[1] / o];
}
function pl(t, r) {
  r.absolutePoses = qt(t.state);
}
function ti(t) {
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
function ri(t, r, e, n, a, i) {
  var o = oa(Ve(t, i), r, e), s = o.vertical, u = o.horizontal, f = Pr();
  s.forEach(function(d) {
    d.isBound && (d.direction === "start" && (f.left = !0), d.direction === "end" && (f.right = !0), n.push({
      type: "bounds",
      pos: d.pos
    }));
  }), u.forEach(function(d) {
    d.isBound && (d.direction === "start" && (f.top = !0), d.direction === "end" && (f.bottom = !0), a.push({
      type: "bounds",
      pos: d.pos
    }));
  });
  var l = Hf(t), v = l.boundMap, c = l.vertical, p = l.horizontal;
  return c.forEach(function(d) {
    nr(n, function(g) {
      var h = g.type, m = g.pos;
      return h === "bounds" && m === d;
    }) >= 0 || n.push({
      type: "bounds",
      pos: d
    });
  }), p.forEach(function(d) {
    nr(a, function(g) {
      var h = g.type, m = g.pos;
      return h === "bounds" && m === d;
    }) >= 0 || a.push({
      type: "bounds",
      pos: d
    });
  }), {
    boundMap: f,
    innerBoundMap: v
  };
}
var dl = ha("", ["resizable", "scalable"]), gl = {
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
    lo,
    co,
    vo,
    po,
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
    if (!f || !f.render || !Xr(t, ""))
      return zr(t, "boundMap", Pr(), function(L) {
        return JSON.stringify(L);
      }), zr(t, "innerBoundMap", Pr(), function(L) {
        return JSON.stringify(L);
      }), [];
    e.guidelines = zn(t);
    var c = Math.min(i[0], o[0], s[0], u[0]), p = Math.min(i[1], o[1], s[1], u[1]), d = f.externalPoses || [], g = qt(t.state), h = [], m = [], x = [], S = [], D = [], E = Xt(g), b = E.width, C = E.height, y = E.top, _ = E.left, R = E.bottom, P = E.right, O = { left: _, right: P, top: y, bottom: R, center: (_ + P) / 2, middle: (y + R) / 2 }, T = d.length > 0, I = T ? Xt(d) : {};
    if (!f.request) {
      if (f.direction && D.push(zf(t, g, f.direction, v, v)), f.snap) {
        var z = Xt(g);
        f.center && (z.middle = (z.top + z.bottom) / 2, z.center = (z.left + z.right) / 2), D.push(Ya(t, z, v, v));
      }
      T && (f.center && (I.middle = (I.top + I.bottom) / 2, I.center = (I.left + I.right) / 2), D.push(Ya(t, I, v, v))), D.forEach(function(L) {
        var j = L.vertical.posInfos, Y = L.horizontal.posInfos;
        h.push.apply(h, N([], w(j.filter(function($) {
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
        })), !1)), m.push.apply(m, N([], w(Y.filter(function($) {
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
        })), !1)), x.push.apply(x, N([], w(ti(j)), !1)), S.push.apply(S, N([], w(ti(Y)), !1));
      });
    }
    var k = ri(t, [_, P], [y, R], h, m), F = k.boundMap, A = k.innerBoundMap;
    T && ri(t, [I.left, I.right], [I.top, I.bottom], h, m, f.externalBounds);
    var W = N(N([], w(x), !1), w(S), !1), H = W.filter(function(L) {
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
    }, !0), N(N(N(N(N(N([], w(tl(t, H, [c, p], O, r)), !1), w(rl(t, G, [c, p], O, r)), !1), w(Ka(t, "horizontal", S, [a, n], O, r)), !1), w(Ka(t, "vertical", x, [a, n], O, r)), !1), w(Za(t, "horizontal", m, c, n, b, 0, r)), !1), w(Za(t, "vertical", h, p, a, C, 1, r)), !1);
  },
  dragStart: function(t, r) {
    t.state.snapRenderInfo = {
      request: r.isRequest,
      snap: !0,
      center: !0
    }, be(t);
  },
  drag: function(t) {
    var r = t.state;
    be(t) || (r.guidelines = zn(t)), r.snapRenderInfo && (r.snapRenderInfo.render = !0);
  },
  pinchStart: function(t) {
    this.unset(t);
  },
  dragEnd: function(t) {
    this.unset(t);
  },
  dragControlCondition: function(t, r) {
    if (dl(t, r) || In(t, r))
      return !0;
    if (!r.isRequest && r.inputEvent)
      return Ct(r.inputEvent.target, K("snap-control"));
  },
  dragControlStart: function(t) {
    t.state.snapRenderInfo = null, be(t);
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
    t.state.snapRenderInfo = null, be(t);
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
function hl(t, r) {
  return [
    t[0] * r[0],
    t[1] * r[1]
  ];
}
function K() {
  for (var t = [], r = 0; r < arguments.length; r++)
    t[r] = arguments[r];
  return Is.apply(void 0, N([ea], w(t), !1));
}
function Ro(t) {
  t();
}
function ml(t) {
  return !t || t === "none" ? [1, 0, 0, 1, 0, 0] : $t(t) ? t : ee(t);
}
function Kr(t, r, e) {
  return Pe(r, Er(e, r), t, Er(e.map(function(n) {
    return -n;
  }), r));
}
function xl(t, r, e) {
  if (r === "%") {
    var n = va(t.ownerSVGElement);
    return n[e ? "width" : "height"] / 100;
  }
  return 1;
}
function Sl(t) {
  var r = Dl(da(t, ":before"));
  return r.map(function(e, n) {
    var a = ie(e), i = a.value, o = a.unit;
    return i * xl(t, o, n === 0);
  });
}
function ke(t) {
  return t ? t.split(" ") : ["0", "0"];
}
function Dl(t) {
  return ke(t.transformOrigin);
}
function wo(t) {
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
function ae(t, r, e, n, a) {
  var i, o, s = Un(t) || dr(t), u = !1, f, l;
  if (!t || e)
    f = t;
  else {
    var v = (i = t?.assignedSlot) === null || i === void 0 ? void 0 : i.parentElement, c = t.parentElement;
    v ? (u = !0, l = c, f = v) : f = c;
  }
  for (var p = !1, d = t === r || f === r, g = "relative", h = 1, m = parseFloat(a?.("zoom")) || 1, x = a?.("position"); f && f !== s; ) {
    r === f && (d = !0);
    var S = Nt(f), D = f.tagName.toLowerCase(), E = wo(f), b = S("willChange"), C = parseFloat(S("zoom")) || 1;
    if (g = S("position"), n && C !== 1) {
      h = C;
      break;
    }
    if (
      // offsetParent is the parentElement if the target's zoom is not 1 and not absolute.
      !e && n && m !== 1 && x && x !== "absolute" || D === "svg" || D === "foreignobject" || g !== "static" || E && E !== "none" || b === "transform"
    )
      break;
    var y = (o = t?.assignedSlot) === null || o === void 0 ? void 0 : o.parentNode, _ = f.parentNode;
    y && (u = !0, l = _);
    var R = _;
    if (R && R.nodeType === 11) {
      f = R.host, p = !0, g = Nt(f)("position");
      break;
    }
    f = R, g = "relative";
  }
  return {
    offsetZoom: h,
    hasSlot: u,
    parentSlotElement: l,
    isCustomElement: p,
    isStatic: g === "static",
    isEnd: d || !f || f === s,
    offsetParent: f || s
  };
}
function bl(t, r) {
  var e, n = t.tagName.toLowerCase(), a = t.offsetLeft, i = t.offsetTop, o = Nt(t), s = Yn(a), u = !s, f, l;
  return !u && (n !== "svg" || t.ownerSVGElement) ? (f = ji ? Sl(t) : ke(o("transformOrigin")).map(function(v) {
    return parseFloat(v);
  }), l = f.slice(), u = !0, n === "svg" ? (a = 0, i = 0) : (e = w(Cl(t, f, t === r && r.tagName.toLowerCase() === "g"), 4), a = e[0], i = e[1], f[0] = e[2], f[1] = e[3])) : (f = ke(o("transformOrigin")).map(function(v) {
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
function To(t, r) {
  var e = Nt(t), n = Nt(dr(t)), a = n("position");
  if (!r && (!a || a === "static"))
    return [0, 0];
  var i = parseInt(n("marginLeft"), 10), o = parseInt(n("marginTop"), 10);
  return e("position") === "absolute" && ((e("top") !== "auto" || e("bottom") !== "auto") && (o = 0), (e("left") !== "auto" || e("right") !== "auto") && (i = 0)), [i, o];
}
function Gn(t) {
  t.forEach(function(r) {
    var e = r.matrix;
    e && (r.matrix = Zt(e, 3, 4));
  });
}
function El(t) {
  for (var r = t.parentElement, e = !1, n = dr(t); r; ) {
    var a = da(r).transform;
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
function Ue(t, r) {
  return r === void 0 && (r = t.length > 9), "".concat(r ? "matrix3d" : "matrix", "(").concat(Ni(t, !r).join(","), ")");
}
function va(t) {
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
function yl(t, r) {
  var e, n = va(t), a = n.width, i = n.height, o = n.clientWidth, s = n.clientHeight, u = o / a, f = s / i, l = t.preserveAspectRatio.baseVal, v = l.align, c = l.meetOrSlice, p = [0, 0], d = [u, f], g = [0, 0];
  if (v !== 1) {
    var h = (v - 2) % 3, m = Math.floor((v - 2) / 3);
    p[0] = a * h / 2, p[1] = i * m / 2;
    var x = c === 2 ? Math.max(f, u) : Math.min(u, f);
    d[0] = x, d[1] = x, g[0] = (o - a) / 2 * h, g[1] = (s - i) / 2 * m;
  }
  var S = Zn(d, r);
  return e = w(g, 2), S[r * (r - 1)] = e[0], S[r * (r - 1) + 1] = e[1], Kr(S, r, p);
}
function Cl(t, r, e) {
  var n = t.tagName.toLowerCase();
  if (!t.getBBox || !e && n === "g")
    return [0, 0, 0, 0];
  var a = Nt(t), i = a("transform-box") === "fill-box", o = t.getBBox(), s = va(t.ownerSVGElement), u = o.x, f = o.y;
  n === "foreignobject" && !u && !f && (u = parseFloat(t.getAttribute("x")) || 0, f = parseFloat(t.getAttribute("y")) || 0);
  var l = u - s.x, v = f - s.y, c = i ? r[0] : r[0] - l, p = i ? r[1] : r[1] - v;
  return [l, v, c, p];
}
function xt(t, r, e) {
  return Pt(t, br(r, e), e);
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
  }), n = Math.min.apply(Math, N([], w(r), !1)), a = Math.min.apply(Math, N([], w(e), !1)), i = Math.max.apply(Math, N([], w(r), !1)), o = Math.max.apply(Math, N([], w(e), !1)), s = i - n, u = o - a;
  return {
    left: n,
    top: a,
    right: i,
    bottom: o,
    width: s,
    height: u
  };
}
function ei(t, r, e, n) {
  var a = Mr(t, r, e, n);
  return Xt(a);
}
function _l(t, r, e, n, a) {
  var i, o = t.target, s = t.origin, u = r.matrix, f = Po(o), l = f.offsetWidth, v = f.offsetHeight, c = e.getBoundingClientRect(), p = [0, 0];
  e === dr(e) && (p = To(o, !0));
  for (var d = o.getBoundingClientRect(), g = d.left - c.left + e.scrollLeft - (e.clientLeft || 0) + p[0], h = d.top - c.top + e.scrollTop - (e.clientTop || 0) + p[1], m = d.width, x = d.height, S = Pe(n, a, u), D = ei(S, l, v, n), E = D.left, b = D.top, C = D.width, y = D.height, _ = xt(S, s, n), R = Q(_, [E, b]), P = [
    g + R[0] * m / C,
    h + R[1] * x / y
  ], O = [0, 0], T = 0; ++T < 10; ) {
    var I = Jt(a, n);
    i = w(Q(xt(I, P, n), xt(I, _, n)), 2), O[0] = i[0], O[1] = i[1];
    var z = Pe(n, a, Er(O, n), u), k = ei(z, l, v, n), F = k.left, A = k.top, W = F - g, H = A - h;
    if (B(W) < 2 && B(H) < 2)
      break;
    P[0] -= W, P[1] -= H;
  }
  return O.map(function(G) {
    return Math.round(G);
  });
}
function Ml(t, r, e) {
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
function Oo(t, r) {
  return Vt([
    r[0] - t[0],
    r[1] - t[1]
  ]);
}
function jr(t, r, e, n) {
  e === void 0 && (e = 1), n === void 0 && (n = St(t, r));
  var a = Oo(t, r);
  return {
    transform: "translateY(-50%) translate(".concat(t[0], "px, ").concat(t[1], "px) rotate(").concat(n, "rad) scaleY(").concat(e, ")"),
    width: "".concat(a, "px")
  };
}
function Fe(t, r) {
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
  return $t(e) ? M(M({}, t), e) : t;
}
function Po(t) {
  var r = t && !Yn(t.offsetWidth), e = 0, n = 0, a = 0, i = 0, o = 0, s = 0, u = 0, f = 0, l = 0, v = 0, c = 0, p = 0, d = 1 / 0, g = 1 / 0, h = 1 / 0, m = 1 / 0, x = 0, S = 0, D = !1;
  if (t)
    if (!r && t.ownerSVGElement) {
      var E = t.getBBox();
      D = !0, e = E.width, n = E.height, o = e, s = n, u = e, f = n, a = e, i = n;
    } else {
      var b = Nt(t), C = t.style, y = b("boxSizing") === "border-box", _ = parseFloat(b("borderLeftWidth")) || 0, R = parseFloat(b("borderRightWidth")) || 0, P = parseFloat(b("borderTopWidth")) || 0, O = parseFloat(b("borderBottomWidth")) || 0, T = parseFloat(b("paddingLeft")) || 0, I = parseFloat(b("paddingRight")) || 0, z = parseFloat(b("paddingTop")) || 0, k = parseFloat(b("paddingBottom")) || 0, F = T + I, A = z + k, W = _ + R, H = P + O, G = F + W, V = A + H, q = b("position"), L = 0, j = 0;
      if ("clientLeft" in t) {
        var Y = null;
        if (q === "absolute") {
          var $ = ae(t, dr(t));
          Y = $.offsetParent;
        } else
          Y = t.parentElement;
        if (Y) {
          var J = Nt(Y);
          L = parseFloat(J("width")), j = parseFloat(J("height"));
        }
      }
      l = Math.max(F, vt(b("minWidth"), L) || 0), v = Math.max(A, vt(b("minHeight"), j) || 0), d = vt(b("maxWidth"), L), g = vt(b("maxHeight"), j), isNaN(d) && (d = 1 / 0), isNaN(g) && (g = 1 / 0), x = vt(C.width, 0) || 0, S = vt(C.height, 0) || 0, o = parseFloat(b("width")) || 0, s = parseFloat(b("height")) || 0, u = B(o - x) < 1 ? hn(l, x || o, d) : o, f = B(s - S) < 1 ? hn(v, S || s, g) : s, e = u, n = f, a = u, i = f, y ? (h = d, m = g, c = l, p = v, u = e - G, f = n - V) : (h = d + G, m = g + V, c = l + G, p = v + V, e = u + G, n = f + V), a = u + F, i = f + A;
    }
  return {
    svg: D,
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
    maxWidth: d,
    maxHeight: g,
    minOffsetWidth: c,
    minOffsetHeight: p,
    maxOffsetWidth: h,
    maxOffsetHeight: m
  };
}
function Io(t, r) {
  return St(r > 0 ? t[0] : t[1], r > 0 ? t[1] : t[0]);
}
function Ee() {
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
function zo(t, r) {
  var e = t === dr(t) || t === Un(t), n = {
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
function cn(t, r, e, n) {
  var a = t.left, i = t.right, o = t.top, s = t.bottom, u = r.top, f = r.left, l = {
    left: f + a,
    top: u + o,
    right: f + i,
    bottom: u + s,
    width: i - a,
    height: s - o
  };
  return e && n ? zo(e, l) : l;
}
function Jr(t, r) {
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
  return t && r ? zo(t, s) : s;
}
function Rl(t) {
  var r = t.props, e = r.groupable, n = r.svgOrigin, a = t.getState(), i = a.offsetWidth, o = a.offsetHeight, s = a.svg, u = a.transformOrigin;
  return !e && s && n ? xa(n, i, o) : u;
}
function Go(t, r, e, n) {
  var a;
  if (t)
    a = t;
  else if (r)
    a = [0, 0];
  else {
    var i = e.target;
    a = Bo(i, n);
  }
  return a;
}
function Bo(t, r) {
  if (t) {
    var e = t.getAttribute("data-rotation") || "", n = t.getAttribute("data-direction");
    if (r.deg = e, !!n) {
      var a = [0, 0];
      return n.indexOf("w") > -1 && (a[0] = -1), n.indexOf("e") > -1 && (a[0] = 1), n.indexOf("n") > -1 && (a[1] = -1), n.indexOf("s") > -1 && (a[1] = 1), a;
    }
  }
}
function pa(t, r) {
  return [
    ut(r, t[0]),
    ut(r, t[1]),
    ut(r, t[2]),
    ut(r, t[3])
  ];
}
function qt(t) {
  var r = t.left, e = t.top, n = t.pos1, a = t.pos2, i = t.pos3, o = t.pos4;
  return pa([n, a, i, o], [r, e]);
}
function Bn(t, r) {
  t[r ? "controlAbles" : "targetAbles"].forEach(function(e) {
    e.unset && e.unset(t);
  });
}
function Ir(t, r) {
  var e = r ? "controlGesto" : "targetGesto", n = t[e];
  n?.isIdle() === !1 && Bn(t, r), n?.unset(), t[e] = null;
}
function At(t, r) {
  if (r) {
    var e = Yr(r);
    e.nextStyle = M(M({}, e.nextStyle), t);
  }
  return {
    style: t,
    cssText: Hr(t).map(function(n) {
      return "".concat(Xs(n, "-"), ": ").concat(t[n], ";");
    }).join("")
  };
}
function Ao(t, r, e) {
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
function $e(t, r, e) {
  t._emitter.on(r, e);
}
function U(t, r, e, n, a) {
  return t.triggerEvent(r, e, n, a);
}
function da(t, r) {
  return lr(t).getComputedStyle(t, r);
}
function ye(t, r, e) {
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
function An(t, r) {
  return t === r || t == null && r == null;
}
function ni() {
  for (var t = [], r = 0; r < arguments.length; r++)
    t[r] = arguments[r];
  for (var e = t.length - 1, n = 0; n < e; ++n) {
    var a = t[n];
    if (!Yn(a))
      return a;
  }
  return t[e];
}
function ko(t, r) {
  var e = [], n = [];
  return t.forEach(function(a, i) {
    var o = r(a, i, t), s = n.indexOf(o), u = e[s] || [];
    s === -1 && (n.push(o), e.push(u)), u.push(a);
  }), e;
}
function wl(t, r) {
  var e = [], n = {};
  return t.forEach(function(a, i) {
    var o = r(a, i, t), s = n[o];
    s || (s = [], n[o] = s, e.push(s)), s.push(a);
  }), e;
}
function Fo(t) {
  return t.reduce(function(r, e) {
    return r.concat(e);
  }, []);
}
function Fr() {
  for (var t = [], r = 0; r < arguments.length; r++)
    t[r] = arguments[r];
  return t.sort(function(e, n) {
    return B(n) - B(e);
  }), t[0];
}
function Nr(t, r, e) {
  return Pt(Jt(t, e), br(r, e), e);
}
function Tl(t, r) {
  var e, n = t.is3d, a = t.rootMatrix, i = n ? 4 : 3;
  return e = w(Nr(a, [r.distX, r.distY], i), 2), r.distX = e[0], r.distY = e[1], r;
}
function Yt(t, r, e, n) {
  if (!e[0] && !e[1])
    return r;
  var a = xt(t, [Qa(e[0] || 1), 0], n), i = xt(t, [0, Qa(e[1] || 1)], n), o = xt(t, [
    e[0] / Vt(a),
    e[1] / Vt(i)
  ], n);
  return ut(r, o);
}
function jt(t, r, e) {
  return e ? "".concat(t / r * 100, "%") : "".concat(t, "px");
}
function Ne(t) {
  return B(t) <= kt ? 0 : t;
}
function ga(t) {
  return function(r) {
    if (!r.isDragging(t))
      return "";
    var e = xf(r, t), n = e.deg;
    return n ? K("view-control-rotation".concat(n)) : "";
  };
}
function ha(t, r) {
  return r === void 0 && (r = [t]), function(e, n) {
    if (n.isRequest)
      return r.some(function(i) {
        return n.requestAble === i;
      }) ? n.parentDirection : !1;
    var a = n.inputEvent.target;
    return Ct(a, K("direction")) && (!t || Ct(a, K(t)));
  };
}
function Ol(t, r, e) {
  var n, a = Br(t, {
    "x%": function(E) {
      return E / 100 * r.offsetWidth;
    },
    "y%": function(E) {
      return E / 100 * r.offsetHeight;
    }
  }), i = t.slice(0, e < 0 ? void 0 : e), o = t.slice(0, e < 0 ? void 0 : e + 1), s = t[e] || "", u = e < 0 ? [] : t.slice(e), f = e < 0 ? [] : t.slice(e + 1), l = a.slice(0, e < 0 ? void 0 : e), v = a.slice(0, e < 0 ? void 0 : e + 1), c = (n = a[e]) !== null && n !== void 0 ? n : Br([""])[0], p = e < 0 ? [] : a.slice(e), d = e < 0 ? [] : a.slice(e + 1), g = c ? [c] : [], h = wr(l), m = wr(v), x = wr(p), S = wr(d), D = pt(h, x, 4);
  return {
    transforms: t,
    beforeFunctionMatrix: h,
    beforeFunctionMatrix2: m,
    targetFunctionMatrix: wr(g),
    afterFunctionMatrix: x,
    afterFunctionMatrix2: S,
    allFunctionMatrix: D,
    beforeFunctions: l,
    beforeFunctions2: v,
    targetFunction: g[0],
    afterFunctions: p,
    afterFunctions2: d,
    beforeFunctionTexts: i,
    beforeFunctionTexts2: o,
    targetFunctionText: s,
    afterFunctionTexts: u,
    afterFunctionTexts2: f
  };
}
function Pl(t) {
  return !t || !$t(t) || $n(t) ? !1 : Rt(t) || "length" in t;
}
function Kt(t, r) {
  return t ? $n(t) ? t : ar(t) ? r ? document.querySelector(t) : t : Xn(t) ? t() : Ai(t) ? t : "current" in t ? t.current : t : null;
}
function ma(t, r) {
  if (!t)
    return [];
  var e = Pl(t) ? [].slice.call(t) : [t];
  return e.reduce(function(n, a) {
    return ar(a) && r ? N(N([], w(n), !1), w([].slice.call(document.querySelectorAll(a))), !1) : (Rt(a) ? n.push(ma(a, r)) : n.push(Kt(a, r)), n);
  }, []);
}
function Il(t, r, e) {
  var n = St(t, r) / Math.PI * 180;
  return n = e >= 0 ? n : 180 - n, n = n >= 0 ? n : 360 + n, n;
}
function ai(t, r) {
  var e = t.rootMatrix, n = t.is3d, a = n ? 4 : 3, i = Jt(e, a);
  return n || (i = Zt(i, 3, 4)), i[12] = 0, i[13] = 0, i[14] = 0, ou(i, r);
}
function No(t, r, e, n, a) {
  var i = w(t, 2), o = i[0], s = i[1], u = 0, f = 0;
  if (a && o && s) {
    var l = St([0, 0], r), v = St([0, 0], n), c = Vt(r), p = Math.cos(l - v) * c;
    if (!n[0])
      f = p, u = f * e;
    else if (!n[1])
      u = p, f = u / e;
    else {
      var d = n[0] * o, g = n[1] * s, h = Math.atan2(d + r[0], g + r[1]), m = Math.atan2(d, g);
      h < 0 && (h += Math.PI * 2), m < 0 && (m += Math.PI * 2);
      var x = 0;
      B(h - m) < Math.PI / 2 || B(h - m) > Math.PI / 2 * 3 || (m += Math.PI), x = h - m, x > Math.PI * 2 ? x -= Math.PI * 2 : x > Math.PI ? x = 2 * Math.PI - x : x < -Math.PI && (x = -2 * Math.PI - x);
      var S = Vt([d + r[0], g + r[1]]) * Math.cos(x);
      u = S * Math.sin(m) - d, f = S * Math.cos(m) - g, n[0] < 0 && (u *= -1), n[1] < 0 && (f *= -1);
    }
  } else
    u = n[0] * r[0], f = n[1] * r[1];
  return [u, f];
}
function Wo(t, r, e, n) {
  var a, i = e.ratio, o = e.startOffsetWidth, s = e.startOffsetHeight, u = 0, f = 0, l = n.distX, v = n.distY, c = n.pinchScale, p = n.parentDistance, d = n.parentDist, g = n.parentScale, h = e.fixedDirection, m = [0, 1].map(function(C) {
    return B(t[C] - h[C]);
  }), x = [0, 1].map(function(C) {
    var y = m[C];
    return y !== 0 && (y = 2 / y), y;
  });
  if (d)
    u = d[0], f = d[1], r && (u ? f || (f = u / i) : u = f * i);
  else if (te(c))
    u = (c - 1) * o, f = (c - 1) * s;
  else if (g)
    u = (g[0] - 1) * o, f = (g[1] - 1) * s;
  else if (p) {
    var S = o * m[0], D = s * m[1], E = Vt([S, D]);
    u = p / E * S * x[0], f = p / E * D * x[1];
  } else {
    var b = Qt({ datas: e, distX: l, distY: v });
    b = x.map(function(C, y) {
      return b[y] * C;
    }), a = w(No([o, s], b, i, t, r), 2), u = a[0], f = a[1];
  }
  return {
    // direction,
    // sizeDirection,
    distWidth: u,
    distHeight: f
  };
}
function kn(t, r) {
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
    var e = w(t.split(" "), 2), n = e[0], a = e[1], i = kn(n || ""), o = kn(a || ""), s = M(M({}, i), o), u = {
      x: "50%",
      y: "50%"
    };
    return s.x && (u.x = s.x), s.y && (u.y = s.y), s.value && (s.x && !s.y && (u.y = s.value), !s.x && s.y && (u.x = s.value)), u;
  }
  return t === "left" ? { x: "0%" } : t === "right" ? { x: "100%" } : t === "top" ? { y: "0%" } : t === "bottom" ? { y: "100%" } : t ? t === "center" ? { value: "50%" } : { value: t } : {};
}
function xa(t, r, e) {
  var n = kn(t, !0), a = n.x, i = n.y;
  return [
    vt(a, r) || 0,
    vt(i, e) || 0
  ];
}
function zl(t, r, e) {
  var n = t.map(function(i) {
    return Q(i, r);
  }), a = n.map(function(i) {
    return oe(i, e);
  });
  return {
    prev: n,
    next: a,
    result: a.map(function(i) {
      return ut(i, r);
    })
  };
}
function Ho(t, r) {
  return t.length === r.length && t.every(function(e, n) {
    var a = r[n], i = Rt(e), o = Rt(a);
    return i && o ? Ho(e, a) : !i && !o ? e === a : !1;
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
function vn(t, r) {
  return Us(t).map(function(e) {
    return r(e);
  });
}
function Lo(t) {
  return te(t) ? {
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
var Gl = fe("pinchable", {
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
    var p = U(t, f, c);
    e.isPinch = p !== !1, e.ables = v;
    var d = e.isPinch;
    return d ? (v.forEach(function(g) {
      if (i[g.name] = i[g.name] || {}, !!g[l]) {
        var h = M(M({}, r), { datas: i[g.name], parentRotate: a, isPinch: !0 });
        g[l](t, h);
      }
    }), t.state.snapRenderInfo = {
      request: r.isRequest,
      direction: [0, 0]
    }, d) : !1;
  },
  pinch: function(t, r) {
    var e = r.datas, n = r.scale, a = r.distance, i = r.originalDatas, o = r.inputEvent, s = r.targets, u = r.angle;
    if (e.isPinch) {
      var f = a * (1 - 1 / n), l = nt(t, r, {});
      s && (l.targets = s);
      var v = "onPinch".concat(s ? "Group" : "");
      U(t, v, l);
      var c = e.ables, p = "drag".concat(s ? "Group" : "", "Control");
      return c.forEach(function(d) {
        d[p] && d[p](t, M(M({}, r), { datas: i[d.name], inputEvent: o, resolveMatrix: !0, pinchScale: n, parentDistance: f, parentRotate: u, isPinch: !0 }));
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
}), ii = ha("scalable"), Bl = {
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
  render: so("scalable"),
  dragControlCondition: ii,
  viewClassName: ga("scalable"),
  dragControlStart: function(t, r) {
    var e = r.datas, n = r.isPinch, a = r.inputEvent, i = r.parentDirection, o = Go(i, n, a, e), s = t.state, u = s.width, f = s.height, l = s.targetTransform, v = s.target, c = s.pos1, p = s.pos2, d = s.pos4;
    if (!o || !v)
      return !1;
    n || _r(t, r), e.datas = {}, e.transform = l, e.prevDist = [1, 1], e.direction = o, e.startOffsetWidth = u, e.startOffsetHeight = f, e.startValue = [1, 1];
    var g = !o[0] && !o[1] || o[0] || !o[1];
    Xe(t, r, "scale"), e.isWidth = g;
    function h(b) {
      e.ratio = b && isFinite(b) ? b : 0;
    }
    e.startPositions = qt(t.state);
    function m(b) {
      var C = Do(e.startPositions, b);
      e.fixedDirection = C.fixedDirection, e.fixedPosition = C.fixedPosition, e.fixedOffset = C.fixedOffset;
    }
    e.setFixedDirection = m, h(rr(c, p) / rr(p, d)), m([-o[0], -o[1]]);
    var x = function(b) {
      e.minScaleSize = b;
    }, S = function(b) {
      e.maxScaleSize = b;
    };
    x([-1 / 0, -1 / 0]), S([1 / 0, 1 / 0]);
    var D = nt(t, r, M(M({ direction: o, set: function(b) {
      e.startValue = b;
    }, setRatio: h, setFixedDirection: m, setMinScaleSize: x, setMaxScaleSize: S }, Ye(t, r)), { dragStart: Gt.dragStart(t, new Ar().dragStart([0, 0], r)) })), E = U(t, "onScaleStart", D);
    return e.startFixedDirection = e.fixedDirection, E !== !1 && (e.isScale = !0, t.state.snapRenderInfo = {
      request: r.isRequest,
      direction: o
    }), e.isScale ? D : !1;
  },
  dragControl: function(t, r) {
    He(t, r, "scale");
    var e = r.datas, n = r.parentKeepRatio, a = r.parentFlag, i = r.isPinch, o = r.dragClient, s = r.isRequest, u = r.useSnap, f = r.resolveMatrix, l = e.prevDist, v = e.direction, c = e.startOffsetWidth, p = e.startOffsetHeight, d = e.isScale, g = e.startValue, h = e.isWidth, m = e.ratio;
    if (!d)
      return !1;
    var x = t.props, S = x.throttleScale, D = x.parentMoveable, E = v;
    !v[0] && !v[1] && (E = [1, 1]);
    var b = m && (n ?? x.keepRatio) || !1, C = t.state, y = [
      g[0],
      g[1]
    ];
    function _() {
      var X = Wo(E, b, e, r), Z = X.distWidth, ft = X.distHeight, rt = c ? (c + Z) / c : 1, et = p ? (p + ft) / p : 1;
      g[0] || (y[0] = Z / c), g[1] || (y[1] = ft / p);
      var ot = (E[0] || b ? rt : 1) * y[0], ct = (E[1] || b ? et : 1) * y[1];
      return ot === 0 && (ot = Bt(l[0]) * xe), ct === 0 && (ct = Bt(l[1]) * xe), [ot, ct];
    }
    var R = _();
    if (!i && t.props.groupable) {
      var P = C.snapRenderInfo || {}, O = P.direction;
      Rt(O) && (O[0] || O[1]) && (C.snapRenderInfo = { direction: v, request: r.isRequest });
    }
    U(t, "onBeforeScale", nt(t, r, {
      scale: R,
      setFixedDirection: function(X) {
        return e.setFixedDirection(X), R = _(), R;
      },
      startFixedDirection: e.startFixedDirection,
      setScale: function(X) {
        R = X;
      }
    }, !0));
    var T = [
      R[0] / y[0],
      R[1] / y[1]
    ], I = o, z = [0, 0], k = Bt(T[0] * T[1]), F = !o && !a && i;
    if (F || f ? I = ia(t, e.targetAllTransform, [0, 0], [0, 0], e) : o || (I = e.fixedPosition), i || (z = vl(t, T, v, !u && s, e)), b) {
      E[0] && E[1] && z[0] && z[1] && (Math.abs(z[0] * c) > Math.abs(z[1] * p) ? z[1] = 0 : z[0] = 0);
      var A = !z[0] && !z[1];
      if (A && (h ? T[0] = tt(T[0] * y[0], S) / y[0] : T[1] = tt(T[1] * y[1], S) / y[1]), E[0] && !E[1] || z[0] && !z[1] || A && h) {
        T[0] += z[0];
        var W = c * T[0] * y[0] / m;
        T[1] = Bt(k * T[0]) * B(W / p / y[1]);
      } else if (!E[0] && E[1] || !z[0] && z[1] || A && !h) {
        T[1] += z[1];
        var H = p * T[1] * y[1] * m;
        T[0] = Bt(k * T[1]) * B(H / c / y[0]);
      }
    } else
      T[0] += z[0], T[1] += z[1], z[0] || (T[0] = tt(T[0] * y[0], S) / y[0]), z[1] || (T[1] = tt(T[1] * y[1], S) / y[1]);
    T[0] === 0 && (T[0] = Bt(l[0]) * xe), T[1] === 0 && (T[1] = Bt(l[1]) * xe), R = hl(T, [y[0], y[1]]);
    var G = [
      c,
      p
    ], V = [
      c * R[0],
      p * R[1]
    ];
    V = zi(V, e.minScaleSize, e.maxScaleSize, b ? m : !1), R = vn(2, function(X) {
      return G[X] ? V[X] / G[X] : V[X];
    }), T = vn(2, function(X) {
      return R[X] / y[X];
    });
    var q = vn(2, function(X) {
      return l[X] ? T[X] / l[X] : T[X];
    }), L = "scale(".concat(T.join(", "), ")"), j = "scale(".concat(R.join(", "), ")"), Y = Le(e, j, L), $ = !g[0] || !g[1], J = vf(t, $ ? j : L, e.fixedDirection, I, e.fixedOffset, e, $), at = F ? J : Q(J, e.prevInverseDist || [0, 0]);
    if (e.prevDist = T, e.prevInverseDist = J, R[0] === l[0] && R[1] === l[1] && at.every(function(X) {
      return !X;
    }) && !D && !F)
      return !1;
    var st = nt(t, r, M({ offsetWidth: c, offsetHeight: p, direction: v, scale: R, dist: T, delta: q, isPinch: !!i }, ro(t, Y, at, i, r)));
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
  dragGroupControlCondition: ii,
  dragGroupControlStart: function(t, r) {
    var e = r.datas, n = this.dragControlStart(t, r);
    if (!n)
      return !1;
    var a = Ut(t, "resizable", r);
    e.moveableScale = t.scale;
    var i = er(t, this, "dragControlStart", r, function(f, l) {
      return Ge(t, f, e, l);
    }), o = function(f) {
      n.setFixedDirection(f), i.forEach(function(l, v) {
        l.setFixedDirection(f), Ge(t, l.moveable, e, a[v]);
      });
    };
    e.setFixedDirection = o;
    var s = M(M({}, n), { targets: t.props.targets, events: i, setFixedDirection: o }), u = U(t, "onScaleGroupStart", s);
    return e.isScale = u !== !1, e.isScale ? s : !1;
  },
  dragGroupControl: function(t, r) {
    var e = r.datas;
    if (e.isScale) {
      $e(t, "onBeforeScale", function(l) {
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
          var c = w(Pt(se(t.rotation / 180 * Math.PI, 3), [
            v.datas.originalX * a[0],
            v.datas.originalY * a[1],
            1
          ], 3), 2), p = c[0], d = c[1];
          return M(M({}, v), {
            parentDist: null,
            parentScale: a,
            parentKeepRatio: o,
            // recalculate child fixed position for parent group's dragging.
            dragClient: ut(s, [p, d])
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
    return Oe(e, r[n], 1, 2);
  });
}
function oi(t, r, e) {
  var n = St(t, r), a = St(t, e), i = a - n;
  return i >= 0 ? i : i + 2 * Math.PI;
}
function Al(t, r) {
  var e = oi(t[0], t[1], t[2]), n = oi(r[0], r[1], r[2]), a = Math.PI;
  return !(e >= a && n <= a || e <= a && n >= a);
}
var kl = {
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
  viewClassName: ga("warpable"),
  render: function(t, r) {
    var e = t.props, n = e.resizable, a = e.scalable, i = e.warpable, o = e.zoom;
    if (n || a || !i)
      return [];
    var s = t.state, u = s.pos1, f = s.pos2, l = s.pos3, v = s.pos4, c = sr(u, f), p = sr(f, u), d = sr(u, l), g = sr(l, u), h = sr(l, v), m = sr(v, l), x = sr(f, v), S = sr(v, f);
    return N([
      r.createElement("div", { className: K("line"), key: "middeLine1", style: jr(c, h, o) }),
      r.createElement("div", { className: K("line"), key: "middeLine2", style: jr(p, m, o) }),
      r.createElement("div", { className: K("line"), key: "middeLine3", style: jr(d, x, o) }),
      r.createElement("div", { className: K("line"), key: "middeLine4", style: jr(g, S, o) })
    ], w(uo(t, "warpable", r)), !1);
  },
  dragControlCondition: function(t, r) {
    if (r.isRequest)
      return !1;
    var e = r.inputEvent.target;
    return Ct(e, K("direction")) && Ct(e, K("warpable"));
  },
  dragControlStart: function(t, r) {
    var e = r.datas, n = r.inputEvent, a = t.props.target, i = n.target, o = Bo(i, e);
    if (!o || !a)
      return !1;
    var s = t.state, u = s.transformOrigin, f = s.is3d, l = s.targetTransform, v = s.targetMatrix, c = s.width, p = s.height, d = s.left, g = s.top;
    e.datas = {}, e.targetTransform = l, e.warpTargetMatrix = f ? v : Zt(v, 3, 4), e.targetInverseMatrix = ki(Jt(e.warpTargetMatrix, 4), 3, 4), e.direction = o, e.left = d, e.top = g, e.poses = [
      [0, 0],
      [c, 0],
      [0, p],
      [c, p]
    ].map(function(x) {
      return Q(x, u);
    }), e.nextPoses = e.poses.map(function(x) {
      var S = w(x, 2), D = S[0], E = S[1];
      return Pt(e.warpTargetMatrix, [D, E, 0, 1], 4);
    }), e.startValue = mt(4), e.prevMatrix = mt(4), e.absolutePoses = qt(s), e.posIndexes = to(o), _r(t, r), Xe(t, r, "matrix3d"), s.snapRenderInfo = {
      request: r.isRequest,
      direction: o
    };
    var h = nt(t, r, M({ set: function(x) {
      e.startValue = x;
    } }, Ye(t, r))), m = U(t, "onWarpStart", h);
    return m !== !1 && (e.isWarp = !0), e.isWarp;
  },
  dragControl: function(t, r) {
    var e = r.datas, n = r.isRequest, a = r.distX, i = r.distY, o = e.targetInverseMatrix, s = e.prevMatrix, u = e.isWarp, f = e.startValue, l = e.poses, v = e.posIndexes, c = e.absolutePoses;
    if (!u)
      return !1;
    if (He(t, r, "matrix3d"), Xr(t, "warpable")) {
      var p = v.map(function(_) {
        return c[_];
      });
      p.length > 1 && p.push([
        (p[0][0] + p[1][0]) / 2,
        (p[0][1] + p[1][1]) / 2
      ]);
      var d = je(t, n, {
        horizontal: p.map(function(_) {
          return _[1] + i;
        }),
        vertical: p.map(function(_) {
          return _[0] + a;
        })
      }), g = d.horizontal, h = d.vertical;
      i -= g.offset, a -= h.offset;
    }
    var m = Qt({ datas: e, distX: a, distY: i }, !0), x = e.nextPoses.slice();
    if (v.forEach(function(_) {
      x[_] = ut(x[_], m);
    }), !tf.every(function(_) {
      return Al(_.map(function(R) {
        return l[R];
      }), _.map(function(R) {
        return x[R];
      }));
    }))
      return !1;
    var S = Kn(l[0], l[2], l[1], l[3], x[0], x[2], x[1], x[3]);
    if (!S.length)
      return !1;
    var D = pt(o, S, 4), E = Ji(e, D, !0), b = pt(Jt(s, 4), E, 4);
    e.prevMatrix = E;
    var C = pt(f, E, 4), y = Le(e, "matrix3d(".concat(C.join(", "), ")"), "matrix3d(".concat(E.join(", "), ")"));
    return aa(r, y), U(t, "onWarp", nt(t, r, M({ delta: b, matrix: C, dist: E, multiply: pt, transform: y }, At({
      transform: y
    }, r)))), !0;
  },
  dragControlEnd: function(t, r) {
    var e = r.datas, n = r.isDrag;
    return e.isWarp ? (e.isWarp = !1, U(t, "onWarpEnd", Lt(t, r, {})), n) : !1;
  }
}, Fl = /* @__PURE__ */ K("area-pieces"), Ce = /* @__PURE__ */ K("area-piece"), Yo = /* @__PURE__ */ K("avoid"), Nl = K("view-dragging");
function pn(t) {
  var r = t.areaElement;
  if (r) {
    var e = t.state, n = e.width, a = e.height;
    Bi(r, Yo), r.style.cssText += "left: 0px; top: 0px; width: ".concat(n, "px; height: ").concat(a, "px");
  }
}
function si(t) {
  return t.createElement(
    "div",
    { key: "area_pieces", className: Fl },
    t.createElement("div", { className: Ce }),
    t.createElement("div", { className: Ce }),
    t.createElement("div", { className: Ce }),
    t.createElement("div", { className: Ce })
  );
}
var Xo = {
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
        r.createElement("div", { key: "area", ref: Dr(t, "areaElement"), className: v }),
        si(r)
      ];
    if (!n || !a)
      return [];
    var c = Kn([0, 0], [u, 0], [0, f], [u, f], l[0], l[1], l[2], l[3]), p = c.length ? Ue(c, !0) : "none";
    return [
      r.createElement("div", { key: "area", ref: Dr(t, "areaElement"), className: v, style: {
        top: "0px",
        left: "0px",
        width: "".concat(u, "px"),
        height: "".concat(f, "px"),
        transformOrigin: "0 0",
        transform: p
      } }),
      si(r)
    ];
  },
  dragStart: function(t, r) {
    var e = r.datas, n = r.clientX, a = r.clientY, i = r.inputEvent;
    if (!i)
      return !1;
    e.isDragArea = !1;
    var o = t.areaElement, s = t.state, u = s.moveableClientRect, f = s.renderPoses, l = s.rootMatrix, v = s.is3d, c = u.left, p = u.top, d = Xt(f), g = d.left, h = d.top, m = d.width, x = d.height, S = v ? 4 : 3, D = w(Nr(l, [n - c, a - p], S), 2), E = D[0], b = D[1];
    E -= g, b -= h;
    var C = [
      { left: g, top: h, width: m, height: b - 10 },
      { left: g, top: h, width: E - 10, height: x },
      { left: g, top: h + b + 10, width: m, height: x - b - 10 },
      { left: g + E + 10, top: h, width: m - E - 10, height: x }
    ], y = [].slice.call(o.nextElementSibling.children);
    C.forEach(function(_, R) {
      y[R].style.cssText = "left: ".concat(_.left, "px;top: ").concat(_.top, "px; width: ").concat(_.width, "px; height: ").concat(_.height, "px;");
    }), Gi(o, Yo), s.disableNativeEvent = !0;
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
    r.disableNativeEvent && Ii(function() {
      r.disableNativeEvent = !1;
    });
  }
}, Wl = fe("origin", {
  props: ["origin", "svgOrigin"],
  render: function(t, r) {
    var e = t.props, n = e.zoom, a = e.svgOrigin, i = e.groupable, o = t.getState(), s = o.beforeOrigin, u = o.rotation, f = o.svg, l = o.allMatrix, v = o.is3d, c = o.left, p = o.top, d = o.offsetWidth, g = o.offsetHeight, h;
    if (!i && f && a) {
      var m = w(xa(a, d, g), 2), x = m[0], S = m[1], D = v ? 4 : 3, E = xt(l, [x, S], D);
      h = Fe(u, n, Q(E, [c, p]));
    } else
      h = Fe(u, n, s);
    return [
      r.createElement("div", { className: K("control", "origin"), style: h, key: "beforeOrigin" })
    ];
  }
});
function Hl(t) {
  var r = t.scrollContainer;
  return [
    r.scrollLeft,
    r.scrollTop
  ];
}
var Ll = {
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
    var e = t.props, n = e.scrollContainer, a = n === void 0 ? t.getContainer() : n, i = e.scrollOptions, o = new Su(), s = Kt(a, !0);
    r.datas.dragScroll = o, t.state.dragScroll = o;
    var u = r.isControl ? "controlGesto" : "targetGesto", f = r.targets;
    o.on("scroll", function(l) {
      var v = l.container, c = l.direction, p = nt(t, r, {
        scrollContainer: v,
        direction: c
      }), d = f ? "onScrollGroup" : "onScroll";
      f && (p.targets = f), U(t, d, p);
    }).on("move", function(l) {
      var v = l.offsetX, c = l.offsetY, p = l.inputEvent;
      t[u].scrollBy(v, c, p.inputEvent, !1);
    }).on("scrollDrag", function(l) {
      var v = l.next;
      v(t[u].getCurrentEvent());
    }), o.dragStart(r, M({ container: s }, i));
  },
  checkScroll: function(t, r) {
    var e = r.datas.dragScroll;
    if (e) {
      var n = t.props, a = n.scrollContainer, i = a === void 0 ? t.getContainer() : a, o = n.scrollThreshold, s = o === void 0 ? 0 : o, u = n.scrollThrottleTime, f = u === void 0 ? 0 : u, l = n.getScrollPosition, v = l === void 0 ? Hl : l, c = n.scrollOptions;
      return e.drag(r, M({ container: i, threshold: s, throttleTime: f, getScrollPosition: function(p) {
        return v({ scrollContainer: p.container, direction: p.direction });
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
}, Vo = {
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
}, Yl = fe("padding", {
  props: ["padding"],
  render: function(t, r) {
    var e = t.props;
    if (e.dragArea)
      return [];
    var n = Lo(e.padding || {}), a = n.left, i = n.top, o = n.right, s = n.bottom, u = t.getState(), f = u.renderPoses, l = u.pos1, v = u.pos2, c = u.pos3, p = u.pos4, d = [l, v, c, p], g = [];
    return a > 0 && g.push([0, 2]), i > 0 && g.push([0, 1]), o > 0 && g.push([1, 3]), s > 0 && g.push([2, 3]), g.map(function(h, m) {
      var x = w(h, 2), S = x[0], D = x[1], E = d[S], b = d[D], C = f[S], y = f[D], _ = Kn([0, 0], [100, 0], [0, 100], [100, 100], E, b, C, y);
      if (_.length)
        return r.createElement("div", { key: "padding".concat(m), className: K("padding"), style: {
          transform: Ue(_, !0)
        } });
    });
  }
}), ui = ["nw", "ne", "se", "sw"];
function _e(t, r) {
  var e = t[0] + t[1], n = e > r ? r / e : 1;
  return t[0] *= n, t[1] = r - t[1] * n, t;
}
var Xl = [1, 2, 5, 6], Vl = [0, 3, 4, 7], mr = [1, -1, -1, 1], xr = [1, 1, -1, -1];
function Sa(t, r, e, n, a, i, o, s) {
  a === void 0 && (a = 0), i === void 0 && (i = 0), o === void 0 && (o = e), s === void 0 && (s = n);
  var u = [], f = !1, l = t.filter(function(c) {
    return !c.virtual;
  }), v = l.map(function(c) {
    var p = c.horizontal, d = c.vertical, g = c.pos;
    if (d && !f && (f = !0, u.push("/")), f) {
      var h = Math.max(0, d === 1 ? g[1] - i : s - g[1]);
      return u.push(jt(h, n, r)), h;
    } else {
      var h = Math.max(0, p === 1 ? g[0] - a : o - g[0]);
      return u.push(jt(h, e, r)), h;
    }
  });
  return {
    radiusPoses: l,
    styles: u,
    raws: v
  };
}
function qo(t) {
  for (var r = [0, 0], e = [0, 0], n = t.length, a = 0; a < n; ++a) {
    var i = t[a];
    i.sub && (i.horizontal && (r[1] === 0 && (r[0] = a), r[1] = a - r[0] + 1, e[0] = a + 1), i.vertical && (e[1] === 0 && (e[0] = a), e[1] = a - e[0] + 1));
  }
  return {
    horizontalRange: r,
    verticalRange: e
  };
}
function jo(t, r, e, n, a, i, o) {
  var s, u, f, l;
  i === void 0 && (i = [0, 0]), o === void 0 && (o = !1);
  var v = t.indexOf("/"), c = (v > -1 ? t.slice(0, v) : t).length, p = t.slice(0, c), d = t.slice(c + 1), g = p.length, h = d.length, m = h > 0, x = w(p, 4), S = x[0], D = S === void 0 ? "0px" : S, E = x[1], b = E === void 0 ? D : E, C = x[2], y = C === void 0 ? D : C, _ = x[3], R = _ === void 0 ? b : _, P = w(d, 4), O = P[0], T = O === void 0 ? D : O, I = P[1], z = I === void 0 ? m ? T : b : I, k = P[2], F = k === void 0 ? m ? T : y : k, A = P[3], W = A === void 0 ? m ? z : R : A, H = [D, b, y, R].map(function(Y) {
    return vt(Y, r);
  }), G = [T, z, F, W].map(function(Y) {
    return vt(Y, e);
  }), V = H.slice(), q = G.slice();
  s = w(_e([V[0], V[1]], r), 2), V[0] = s[0], V[1] = s[1], u = w(_e([V[3], V[2]], r), 2), V[3] = u[0], V[2] = u[1], f = w(_e([q[0], q[3]], e), 2), q[0] = f[0], q[3] = f[1], l = w(_e([q[1], q[2]], e), 2), q[1] = l[0], q[2] = l[1];
  var L = o ? V : V.slice(0, Math.max(i[0], g)), j = o ? q : q.slice(0, Math.max(i[1], h));
  return N(N([], w(L.map(function(Y, $) {
    var J = ui[$];
    return {
      virtual: $ >= g,
      horizontal: mr[$],
      vertical: 0,
      pos: [n + Y, a + (xr[$] === -1 ? e : 0)],
      sub: !0,
      raw: H[$],
      direction: J
    };
  })), !1), w(j.map(function(Y, $) {
    var J = ui[$];
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
function ql(t, r, e, n, a) {
  a === void 0 && (a = r.length);
  var i = qo(t.slice(n)), o = i.horizontalRange, s = i.verticalRange, u = e - n, f = 0;
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
function jl(t, r, e, n, a, i, o, s, u, f, l) {
  f === void 0 && (f = 0), l === void 0 && (l = 0);
  var v = qo(t.slice(e)), c = v.horizontalRange, p = v.verticalRange;
  if (n > -1)
    for (var d = mr[n] === 1 ? i - f : s - i, g = c[1]; g <= n; ++g) {
      var h = xr[g] === 1 ? l : u, m = 0;
      if (n === g ? m = i : g === 0 ? m = f + d : mr[g] === -1 && (m = s - (r[e][0] - f)), t.splice(e + g, 0, {
        horizontal: mr[g],
        vertical: 0,
        pos: [m, h]
      }), r.splice(e + g, 0, [m, h]), g === 0)
        break;
    }
  else if (a > -1) {
    var x = xr[a] === 1 ? o - l : u - o;
    if (c[1] === 0 && p[1] === 0) {
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
    for (var D = p[0], g = p[1]; g <= a; ++g) {
      var m = mr[g] === 1 ? f : s, h = 0;
      if (a === g ? h = o : g === 0 ? h = l + x : xr[g] === 1 ? h = r[e + D][1] : xr[g] === -1 && (h = u - (r[e + D][1] - l)), t.push({
        horizontal: 0,
        vertical: xr[g],
        pos: [m, h]
      }), r.push([m, h]), g === 0)
        break;
    }
  }
}
function Ul(t, r) {
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
var $l = [
  [0, -1, "n"],
  [1, 0, "e"]
], Zl = [
  [-1, -1, "nw"],
  [0, -1, "n"],
  [1, -1, "ne"],
  [1, 0, "e"],
  [1, 1, "se"],
  [0, 1, "s"],
  [-1, 1, "sw"],
  [-1, 0, "w"]
];
function Da(t, r, e) {
  var n = t.props.clipRelative, a = t.state, i = a.width, o = a.height, s = r, u = s.type, f = s.poses, l = u === "rect", v = u === "circle";
  if (u === "polygon")
    return e.map(function(b) {
      return "".concat(jt(b[0], i, n), " ").concat(jt(b[1], o, n));
    });
  if (l || u === "inset") {
    var c = e[1][1], p = e[3][0], d = e[7][0], g = e[5][1];
    if (l)
      return [
        c,
        p,
        g,
        d
      ].map(function(b) {
        return "".concat(b, "px");
      });
    var h = [c, i - p, o - g, d].map(function(b, C) {
      return jt(b, C % 2 ? i : o, n);
    });
    if (e.length > 8) {
      var m = w(Q(e[4], e[0]), 2), x = m[0], S = m[1];
      h.push.apply(h, N(["round"], w(Sa(f.slice(8).map(function(b, C) {
        return M(M({}, b), { pos: e[C] });
      }), n, x, S, d, c, p, g).styles), !1));
    }
    return h;
  } else if (v || u === "ellipse") {
    var D = e[0], E = jt(B(e[1][1] - D[1]), v ? Math.sqrt((i * i + o * o) / 2) : o, n), h = v ? [E] : [jt(B(e[2][0] - D[0]), i, n), E];
    return h.push("at", jt(D[0], i, n), jt(D[1], o, n)), h;
  }
}
function We(t, r, e, n) {
  var a = [n, (n + r) / 2, r], i = [t, (t + e) / 2, e];
  return Zl.map(function(o) {
    var s = w(o, 3), u = s[0], f = s[1], l = s[2], v = a[u + 1], c = i[f + 1];
    return {
      vertical: B(f),
      horizontal: B(u),
      direction: l,
      pos: [v, c]
    };
  });
}
function Uo(t) {
  var r = [1 / 0, -1 / 0], e = [1 / 0, -1 / 0];
  return t.forEach(function(n) {
    var a = n.pos;
    r[0] = Math.min(r[0], a[0]), r[1] = Math.max(r[1], a[0]), e[0] = Math.min(e[0], a[1]), e[1] = Math.max(e[1], a[1]);
  }), [
    B(r[1] - r[0]),
    B(e[1] - e[0])
  ];
}
function fi(t, r, e, n, a) {
  var i, o, s, u, f, l, v, c, p;
  if (t) {
    var d = a;
    if (!d) {
      var g = Nt(t), h = g("clipPath");
      d = h !== "none" ? h : g("clip");
    }
    if (!((!d || d === "none" || d === "auto") && (d = n, !d))) {
      var m = Pi(d), x = m.prefix, S = x === void 0 ? d : x, D = m.value, E = D === void 0 ? "" : D, b = S === "circle", C = " ";
      if (S === "polygon") {
        var y = Sr(E || "0% 0%, 100% 0%, 100% 100%, 0% 100%");
        C = ",";
        var _ = y.map(function(Mt) {
          var It = w(Mt.split(" "), 2), Tt = It[0], Dt = It[1];
          return {
            vertical: 1,
            horizontal: 1,
            pos: [
              vt(Tt, r),
              vt(Dt, e)
            ]
          };
        }), R = yr(_.map(function(Mt) {
          return Mt.pos;
        }));
        return {
          type: S,
          clipText: d,
          poses: _,
          splitter: C,
          left: R.minX,
          right: R.maxX,
          top: R.minY,
          bottom: R.maxY
        };
      } else if (b || S === "ellipse") {
        var P = "", O = "", T = 0, I = 0, y = cr(E);
        if (b) {
          var z = "";
          i = w(y, 4), o = i[0], z = o === void 0 ? "50%" : o, s = i[2], P = s === void 0 ? "50%" : s, u = i[3], O = u === void 0 ? "50%" : u, T = vt(z, Math.sqrt((r * r + e * e) / 2)), I = T;
        } else {
          var k = "", F = "";
          f = w(y, 5), l = f[0], k = l === void 0 ? "50%" : l, v = f[1], F = v === void 0 ? "50%" : v, c = f[3], P = c === void 0 ? "50%" : c, p = f[4], O = p === void 0 ? "50%" : p, T = vt(k, r), I = vt(F, e);
        }
        var A = [
          vt(P, r),
          vt(O, e)
        ], _ = N([
          {
            vertical: 1,
            horizontal: 1,
            pos: A,
            direction: "nesw"
          }
        ], w($l.slice(0, b ? 1 : 2).map(function(Tt) {
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
          clipText: d,
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
        var y = cr(E || "0 0 0 0"), W = y.indexOf("round"), H = (W > -1 ? y.slice(0, W) : y).length, G = y.slice(H + 1), V = w(y.slice(0, H), 4), q = V[0], L = V[1], j = L === void 0 ? q : L, Y = V[2], $ = Y === void 0 ? q : Y, J = V[3], at = J === void 0 ? j : J, st = w([q, $].map(function(Tt) {
          return vt(Tt, e);
        }), 2), X = st[0], Z = st[1], ft = w([at, j].map(function(Tt) {
          return vt(Tt, r);
        }), 2), rt = ft[0], et = ft[1], ot = r - et, ct = e - Z, dt = jo(G, ot - rt, ct - X, rt, X), _ = N(N([], w(We(X, ot, ct, rt)), !1), w(dt), !1);
        return {
          type: "inset",
          clipText: d,
          poses: _,
          top: X,
          left: rt,
          right: ot,
          bottom: ct,
          radius: G,
          splitter: C
        };
      } else if (S === "rect") {
        var y = Sr(E || "0px, ".concat(r, "px, ").concat(e, "px, 0px"));
        C = ",";
        var it = w(y.map(function(ir) {
          var or = ie(ir).value;
          return or;
        }), 4), lt = it[0], et = it[1], Z = it[2], rt = it[3], _ = We(lt, et, Z, rt);
        return {
          type: "rect",
          clipText: d,
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
function Kl(t, r, e, n, a) {
  var i = t[r], o = i.direction, s = i.sub, u = t.map(function() {
    return [0, 0];
  }), f = o ? o.split("") : [];
  if (n && r < 8) {
    var l = f.filter(function(T) {
      return T === "w" || T === "e";
    }), v = f.filter(function(T) {
      return T === "n" || T === "s";
    }), c = l[0], p = v[0];
    u[r] = e;
    var d = w(Uo(t), 2), g = d[0], h = d[1], m = g && h ? g / h : 0;
    if (m && a) {
      var x = (r + 4) % 8, S = t[x].pos, D = [0, 0];
      o.indexOf("w") > -1 ? D[0] = -1 : o.indexOf("e") > -1 && (D[0] = 1), o.indexOf("n") > -1 ? D[1] = -1 : o.indexOf("s") > -1 && (D[1] = 1);
      var E = No([g, h], e, m, D, !0), b = g + E[0], C = h + E[1], y = S[1], _ = S[1], R = S[0], P = S[0];
      D[0] === -1 ? R = P - b : D[0] === 1 ? P = R + b : (R = R - b / 2, P = P + b / 2), D[1] === -1 ? y = _ - C : (D[1] === 1 || (y = _ - C / 2), _ = y + C);
      var O = We(y, P, _, R);
      t.forEach(function(T, I) {
        u[I][0] = O[I].pos[0] - T.pos[0], u[I][1] = O[I].pos[1] - T.pos[1];
      });
    } else
      t.forEach(function(T, I) {
        var z = T.direction;
        z && (z.indexOf(c) > -1 && (u[I][0] = e[0]), z.indexOf(p) > -1 && (u[I][1] = e[1]));
      }), c && (u[1][0] = e[0] / 2, u[5][0] = e[0] / 2), p && (u[3][1] = e[1] / 2, u[7][1] = e[1] / 2);
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
function Jl(t, r) {
  var e = w(Ki(t, r), 2), n = e[0], a = e[1], i = r.datas, o = i.clipPath, s = i.clipIndex, u = o, f = u.type, l = u.poses, v = u.splitter, c = l.map(function(x) {
    return x.pos;
  });
  if (f === "polygon")
    c.splice(s, 0, [n, a]);
  else if (f === "inset") {
    var p = Xl.indexOf(s), d = Vl.indexOf(s), g = l.length;
    if (jl(l, c, 8, p, d, n, a, c[4][0], c[4][1], c[0][0], c[0][1]), g === l.length)
      return;
  } else
    return;
  var h = Da(t, o, c), m = "".concat(f, "(").concat(h.join(v), ")");
  U(t, "onClip", nt(t, r, M({ clipEventType: "added", clipType: f, poses: c, clipStyles: h, clipStyle: m, distX: 0, distY: 0 }, At({
    clipPath: m
  }, r))));
}
function Ql(t, r) {
  var e = r.datas, n = e.clipPath, a = e.clipIndex, i = n, o = i.type, s = i.poses, u = i.splitter, f = s.map(function(p) {
    return p.pos;
  }), l = f.length;
  if (o === "polygon")
    s.splice(a, 1), f.splice(a, 1);
  else if (o === "inset") {
    if (a < 8 || (ql(s, f, a, 8, l), l === s.length))
      return;
  } else
    return;
  var v = Da(t, n, f), c = "".concat(o, "(").concat(v.join(u), ")");
  U(t, "onClip", nt(t, r, M({ clipEventType: "removed", clipType: o, poses: f, clipStyles: v, clipStyle: c, distX: 0, distY: 0 }, At({
    clipPath: c
  }, r))));
}
var tc = {
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
    var e = t.props, n = e.customClipPath, a = e.defaultClipPath, i = e.clipArea, o = e.zoom, s = e.groupable, u = t.getState(), f = u.target, l = u.width, v = u.height, c = u.allMatrix, p = u.is3d, d = u.left, g = u.top, h = u.pos1, m = u.pos2, x = u.pos3, S = u.pos4, D = u.clipPathState, E = u.snapBoundInfos, b = u.rotation;
    if (!f || s)
      return [];
    var C = fi(f, l, v, a || "inset", D || n);
    if (!C)
      return [];
    var y = p ? 4 : 3, _ = C.type, R = C.poses, P = R.map(function(et) {
      var ot = xt(c, et.pos, y);
      return [
        ot[0] - d,
        ot[1] - g
      ];
    }), O = [], T = [], I = _ === "rect", z = _ === "inset", k = _ === "polygon";
    if (I || z || k) {
      var F = z ? P.slice(0, 8) : P;
      T = F.map(function(et, ot) {
        var ct = ot === 0 ? F[F.length - 1] : F[ot - 1], dt = St(ct, et), it = Oo(ct, et);
        return r.createElement("div", { key: "clipLine".concat(ot), className: K("line", "clip-line", "snap-control"), "data-clip-index": ot, style: {
          width: "".concat(it, "px"),
          transform: "translate(".concat(ct[0], "px, ").concat(ct[1], "px) rotate(").concat(dt, "rad) scaleY(").concat(o, ")")
        } });
      });
    }
    if (O = P.map(function(et, ot) {
      return r.createElement("div", { key: "clipControl".concat(ot), className: K("control", "clip-control", "snap-control"), "data-clip-index": ot, style: {
        transform: "translate(".concat(et[0], "px, ").concat(et[1], "px) rotate(").concat(b, "rad) scale(").concat(o, ")")
      } });
    }), z && O.push.apply(O, N([], w(P.slice(8).map(function(et, ot) {
      return r.createElement("div", { key: "clipRadiusControl".concat(ot), className: K("control", "clip-control", "clip-radius", "snap-control"), "data-clip-index": 8 + ot, style: {
        transform: "translate(".concat(et[0], "px, ").concat(et[1], "px) rotate(").concat(b, "rad) scale(").concat(o, ")")
      } });
    })), !1)), _ === "circle" || _ === "ellipse") {
      var A = C.left, W = C.top, H = C.radiusX, G = C.radiusY, V = w(Q(xt(c, [A, W], y), xt(c, [0, 0], y)), 2), q = V[0], L = V[1], j = "none";
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
        transform: "translate(".concat(-d + q, "px, ").concat(-g + L, "px) ").concat(Ue(c))
      } }));
    }
    if (i) {
      var st = Xt(N([h, m, x, S], w(P), !1)), X = st.width, Z = st.height, ft = st.left, rt = st.top;
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
      var ot = E[et], ct = et === "horizontal";
      ot.isSnap && T.push.apply(T, N([], w(ot.snap.posInfos.map(function(dt, it) {
        var lt = dt.pos, Mt = Q(xt(c, ct ? [0, lt] : [lt, 0], y), [d, g]), It = Q(xt(c, ct ? [l, lt] : [lt, v], y), [d, g]);
        return ne(r, "", Mt, It, o, "clip".concat(et, "snap").concat(it), "guideline");
      })), !1)), ot.isBound && T.push.apply(T, N([], w(ot.bounds.map(function(dt, it) {
        var lt = dt.pos, Mt = Q(xt(c, ct ? [0, lt] : [lt, 0], y), [d, g]), It = Q(xt(c, ct ? [l, lt] : [lt, v], y), [d, g]);
        return ne(r, "", Mt, It, o, "clip".concat(et, "bounds").concat(it), "guideline", "bounds", "bold");
      })), !1));
    }), N(N([], w(O), !1), w(T), !1);
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
    var e = t.state, n = t.props, a = n.defaultClipPath, i = n.customClipPath, o = e.target, s = e.width, u = e.height, f = r.inputEvent ? r.inputEvent.target : null, l = f && f.getAttribute("class") || "", v = r.datas, c = fi(o, s, u, a || "inset", i);
    if (!c)
      return !1;
    var p = c.clipText, d = c.type, g = c.poses, h = U(t, "onClipStart", nt(t, r, {
      clipType: d,
      clipStyle: p,
      poses: g.map(function(m) {
        return m.pos;
      })
    }));
    return h === !1 ? (v.isClipStart = !1, !1) : (v.isControl = l && l.indexOf("clip-control") > -1, v.isLine = l.indexOf("clip-line") > -1, v.isArea = l.indexOf("clip-area") > -1 || l.indexOf("clip-ellipse") > -1, v.clipIndex = f ? parseInt(f.getAttribute("data-clip-index"), 10) : -1, v.clipPath = c, v.isClipStart = !0, e.clipPathState = p, _r(t, r), !0);
  },
  dragControl: function(t, r) {
    var e, n, a, i = r.datas, o = r.originalDatas, s = r.isDragTarget;
    if (!i.isClipStart)
      return !1;
    var u = i, f = u.isControl, l = u.isLine, v = u.isArea, c = u.clipIndex, p = u.clipPath;
    if (!p)
      return !1;
    var d = Cr(t.props, "clippable"), g = d.keepRatio, h = 0, m = 0, x = o.draggable, S = Qt(r);
    s && x ? (e = w(x.prevBeforeDist, 2), h = e[0], m = e[1]) : (n = w(S, 2), h = n[0], m = n[1]);
    var D = [h, m], E = t.state, b = E.width, C = E.height, y = !v && !f && !l, _ = p.type, R = p.poses, P = p.splitter, O = R.map(function(gt) {
      return gt.pos;
    });
    y && (h = -h, m = -m);
    var T = !f || R[c].direction === "nesw", I = _ === "inset" || _ === "rect", z = R.map(function() {
      return [0, 0];
    });
    if (f && !T) {
      var k = R[c], F = k.horizontal, A = k.vertical, W = [
        h * B(F),
        m * B(A)
      ];
      z = Kl(R, c, W, I, g);
    } else T && (z = O.map(function() {
      return [h, m];
    }));
    var H = O.map(function(gt, zt) {
      return ut(gt, z[zt]);
    }), G = N([], w(H), !1);
    E.snapBoundInfos = null;
    var V = p.type === "circle", q = p.type === "ellipse";
    if (V || q) {
      var L = Xt(H), j = B(L.bottom - L.top), Y = B(q ? L.right - L.left : j), $ = H[0][1] + j, J = H[0][0] - Y, at = H[0][0] + Y;
      V && (G.push([at, L.bottom]), z.push([1, 0])), G.push([L.left, $]), z.push([0, 1]), G.push([J, L.bottom]), z.push([1, 0]);
    }
    var st = Co((d.clipHorizontalGuidelines || []).map(function(gt) {
      return vt("".concat(gt), C);
    }), (d.clipVerticalGuidelines || []).map(function(gt) {
      return vt("".concat(gt), b);
    }), b, C), X = [], Z = [];
    if (V || q)
      X = [G[4][0], G[2][0]], Z = [G[1][1], G[3][1]];
    else if (I) {
      var ft = [G[0], G[2], G[4], G[6]], rt = [z[0], z[2], z[4], z[6]];
      X = ft.filter(function(gt, zt) {
        return rt[zt][0];
      }).map(function(gt) {
        return gt[0];
      }), Z = ft.filter(function(gt, zt) {
        return rt[zt][1];
      }).map(function(gt) {
        return gt[1];
      });
    } else
      X = G.filter(function(gt, zt) {
        return z[zt][0];
      }).map(function(gt) {
        return gt[0];
      }), Z = G.filter(function(gt, zt) {
        return z[zt][1];
      }).map(function(gt) {
        return gt[1];
      });
    var et = [0, 0], ot = ja(st, d.clipTargetBounds && { left: 0, top: 0, right: b, bottom: C }, X, Z, 5, 5), ct = ot.horizontal, dt = ot.vertical, it = ct.offset, lt = dt.offset;
    if (ct.isBound && (et[1] += it), dt.isBound && (et[0] += lt), (q || V) && z[0][0] === 0 && z[0][1] === 0) {
      var L = Xt(H), Mt = L.bottom - L.top, It = q ? L.right - L.left : Mt, Tt = dt.isBound ? B(lt) : dt.snapIndex === 0 ? -lt : lt, Dt = ct.isBound ? B(it) : ct.snapIndex === 0 ? -it : it;
      It -= Tt, Mt -= Dt, V && (Mt = ho(dt, ct) > 0 ? Mt : It, It = Mt);
      var yt = G[0];
      G[1][1] = yt[1] - Mt, G[2][0] = yt[0] + It, G[3][1] = yt[1] + Mt, G[4][0] = yt[0] - It;
    } else if (I && g && f) {
      var ir = w(Uo(R), 2), or = ir[0], ya = ir[1], Ca = or && ya ? or / ya : 0, os = R[c], ve = os.direction || "", Ze = G[1][1], $ = G[5][1], J = G[7][0], at = G[3][0];
      B(it) <= B(lt) ? it = Bt(it) * B(lt) / Ca : lt = Bt(lt) * B(it) * Ca, ve.indexOf("w") > -1 ? J -= lt : ve.indexOf("e") > -1 ? at -= lt : (J += lt / 2, at -= lt / 2), ve.indexOf("n") > -1 ? Ze -= it : ve.indexOf("s") > -1 ? $ -= it : (Ze += it / 2, $ -= it / 2);
      var ss = We(Ze, at, $, J);
      G.forEach(function(Ra, cs) {
        var Qe;
        Qe = w(ss[cs].pos, 2), Ra[0] = Qe[0], Ra[1] = Qe[1];
      });
    } else
      G.forEach(function(gt, zt) {
        var Ma = z[zt];
        Ma[0] && (gt[0] -= lt), Ma[1] && (gt[1] -= it);
      });
    var _a = Da(t, p, H), Ke = "".concat(_, "(").concat(_a.join(P), ")");
    if (E.clipPathState = Ke, V || q)
      X = [G[4][0], G[2][0]], Z = [G[1][1], G[3][1]];
    else if (I) {
      var ft = [G[0], G[2], G[4], G[6]];
      X = ft.map(function(zt) {
        return zt[0];
      }), Z = ft.map(function(zt) {
        return zt[1];
      });
    } else
      X = G.map(function(gt) {
        return gt[0];
      }), Z = G.map(function(gt) {
        return gt[1];
      });
    if (E.snapBoundInfos = ja(st, d.clipTargetBounds && { left: 0, top: 0, right: b, bottom: C }, X, Z, 1, 1), x) {
      var us = E.is3d, fs = E.allMatrix, ls = us ? 4 : 3, Je = et;
      s && (Je = [
        D[0] + et[0] - S[0],
        D[1] + et[1] - S[1]
      ]), x.deltaOffset = pt(fs, [Je[0], Je[1], 0, 0], ls);
    }
    return U(t, "onClip", nt(t, r, M({ clipEventType: "changed", clipType: _, poses: H, clipStyle: Ke, clipStyles: _a, distX: h, distY: m }, At((a = {}, a[_ === "rect" ? "clip" : "clipPath"] = Ke, a), r)))), !0;
  },
  dragControlEnd: function(t, r) {
    this.unset(t);
    var e = r.isDrag, n = r.datas, a = r.isDouble, i = n.isLine, o = n.isClipStart, s = n.isControl;
    return o ? (U(t, "onClipEnd", Lt(t, r, {})), a && (s ? Ql(t, r) : i && Jl(t, r)), a || e) : !1;
  },
  unset: function(t) {
    t.state.clipPathState = "", t.state.snapBoundInfos = null;
  }
}, rc = {
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
      dragStart: Gt.dragStart(t, new Ar().dragStart([0, 0], r))
    }), a = U(t, "onDragOriginStart", n);
    return e.startOrigin = t.state.transformOrigin, e.startTargetOrigin = t.state.targetOrigin, e.prevOrigin = [0, 0], e.isDragOrigin = !0, a === !1 ? (e.isDragOrigin = !1, !1) : n;
  },
  dragControl: function(t, r) {
    var e = r.datas, n = r.isPinch, a = r.isRequest;
    if (!e.isDragOrigin)
      return !1;
    var i = w(Qt(r), 2), o = i[0], s = i[1], u = t.state, f = u.width, l = u.height, v = u.offsetMatrix, c = u.targetMatrix, p = u.is3d, d = t.props.originRelative, g = d === void 0 ? !0 : d, h = p ? 4 : 3, m = [o, s];
    if (a) {
      var x = r.distOrigin;
      (x[0] || x[1]) && (m = x);
    }
    var S = ut(e.startOrigin, m), D = ut(e.startTargetOrigin, m), E = Q(m, e.prevOrigin), b = ce(v, c, S, h), C = t.getRect(), y = Xt(Mr(b, f, l, h)), _ = [
      C.left - y.left,
      C.top - y.top
    ];
    e.prevOrigin = m;
    var R = [
      jt(D[0], f, g),
      jt(D[1], l, g)
    ].join(" "), P = Gt.drag(t, le(r, t.state, _, !!n)), O = nt(t, r, M(M({ width: f, height: l, origin: S, dist: m, delta: E, transformOrigin: R, drag: P }, At({
      transformOrigin: R,
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
function ec(t, r, e, n) {
  var a = t.filter(function(u) {
    var f = u.virtual, l = u.horizontal;
    return l && !f;
  }).length, i = t.filter(function(u) {
    var f = u.virtual, l = u.vertical;
    return l && !f;
  }).length, o = -1;
  if (r === 0 && (a === 0 ? o = 0 : a === 1 && (o = 1)), r === 2 && (a <= 2 ? o = 2 : a <= 3 && (o = 3)), r === 3 && (i === 0 ? o = 4 : i < 4 && (o = 7)), r === 1 && (i <= 1 ? o = 5 : i <= 2 && (o = 6)), !(o === -1 || !t[o].virtual)) {
    var s = t[o];
    nc(t, o), o < 4 ? s.pos[0] = e : s.pos[1] = n;
  }
}
function nc(t, r) {
  r < 4 ? t.slice(0, r + 1).forEach(function(e) {
    e.virtual = !1;
  }) : (t[0].virtual && (t[0].virtual = !1), t.slice(4, r + 1).forEach(function(e) {
    e.virtual = !1;
  }));
}
function ac(t, r) {
  r < 4 ? t.slice(r, 4).forEach(function(e) {
    e.virtual = !0;
  }) : t.slice(r).forEach(function(e) {
    e.virtual = !0;
  });
}
function li(t, r, e, n, a) {
  n === void 0 && (n = [0, 0]);
  var i = [];
  return !t || t === "0px" ? i = [] : i = cr(t), jo(i, r, e, 0, 0, n, a);
}
function ci(t, r, e, n, a) {
  var i = t.state, o = i.width, s = i.height, u = Sa(a, t.props.roundRelative, o, s), f = u.raws, l = u.styles, v = u.radiusPoses, c = Ul(v, f), p = c.horizontals, d = c.verticals, g = l.join(" ");
  i.borderRadiusState = g;
  var h = nt(t, r, M({ horizontals: p, verticals: d, borderRadius: g, width: o, height: s, delta: n, dist: e }, At({
    borderRadius: g
  }, r)));
  return U(t, "onRound", h), h;
}
function vi(t) {
  var r, e, n = t.getState().style, a = n.borderRadius || "";
  if (!a && t.props.groupable) {
    var i = t.moveables[0], o = t.getTargets()[0];
    o && (i?.props.target === o ? (a = (e = (r = t.moveables[0]) === null || r === void 0 ? void 0 : r.state.style.borderRadius) !== null && e !== void 0 ? e : "", n.borderRadius = a) : (a = da(o).borderRadius, n.borderRadius = a));
  }
  return a;
}
var ic = {
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
    var e = t.getState(), n = e.target, a = e.width, i = e.height, o = e.allMatrix, s = e.is3d, u = e.left, f = e.top, l = e.borderRadiusState, v = t.props, c = v.minRoundControls, p = c === void 0 ? [0, 0] : c, d = v.maxRoundControls, g = d === void 0 ? [4, 4] : d, h = v.zoom, m = v.roundPadding, x = m === void 0 ? 0 : m, S = v.isDisplayShadowRoundControls, D = v.groupable;
    if (!n)
      return null;
    var E = l || vi(t), b = s ? 4 : 3, C = li(E, a, i, p, !0);
    if (!C)
      return null;
    var y = 0, _ = 0, R = D ? [0, 0] : [u, f];
    return C.map(function(P, O) {
      var T = P.horizontal, I = P.vertical, z = P.direction || "", k = N([], w(P.pos), !1);
      _ += Math.abs(T), y += Math.abs(I), T && z.indexOf("n") > -1 && (k[1] -= x), I && z.indexOf("w") > -1 && (k[0] -= x), T && z.indexOf("s") > -1 && (k[1] += x), I && z.indexOf("e") > -1 && (k[0] += x);
      var F = Q(xt(o, k, b), R), A = S && S !== "horizontal", W = P.vertical ? y <= g[1] && (A || !P.virtual) : _ <= g[0] && (S || !P.virtual);
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
    var p = t.props, d = p.roundRelative, g = p.minRoundControls, h = g === void 0 ? [0, 0] : g, m = t.state, x = m.width, S = m.height;
    n.isRound = !0, n.prevDist = [0, 0];
    var D = vi(t), E = li(D || "", x, S, h, !0) || [];
    return n.controlPoses = E, m.borderRadiusState = Sa(E, d, x, S).styles.join(" "), v;
  },
  dragControl: function(t, r) {
    var e = r.datas, n = e.controlPoses;
    if (!e.isRound || !e.isControl || !n.length)
      return !1;
    var a = e.controlIndex, i = w(Qt(r), 2), o = i[0], s = i[1], u = [o, s], f = Q(u, e.prevDist), l = t.props.maxRoundControls, v = l === void 0 ? [4, 4] : l, c = t.state, p = c.width, d = c.height, g = n[a], h = g.vertical, m = g.horizontal, x = n.map(function(D) {
      var E = D.horizontal, b = D.vertical, C = [
        E * m * u[0],
        b * h * u[1]
      ];
      if (E) {
        if (v[0] === 1)
          return C;
        if (v[0] < 4 && E !== m)
          return C;
      } else {
        if (v[1] === 0)
          return C[1] = b * m * u[0] / p * d, C;
        if (h) {
          if (v[1] === 1)
            return C;
          if (v[1] < 4 && b !== h)
            return C;
        }
      }
      return [0, 0];
    });
    x[a] = u;
    var S = n.map(function(D, E) {
      return M(M({}, D), { pos: ut(D.pos, x[E]) });
    });
    return a < 4 ? S.slice(0, a + 1).forEach(function(D) {
      D.virtual = !1;
    }) : S.slice(4, a + 1).forEach(function(D) {
      D.virtual = !1;
    }), e.prevDist = [o, s], ci(t, r, u, f, S);
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
        ac(f, o);
      else if (s && (c === !0 || c === "line")) {
        var p = w(Ki(t, r), 2), d = p[0], g = p[1];
        ec(f, u, d, g);
      }
      l !== f.filter(function(m) {
        var x = m.virtual;
        return x;
      }).length && ci(t, r, [0, 0], [0, 0], f);
    }
    var h = Lt(t, r, {});
    return U(t, "onRoundEnd", h), e.borderRadiusState = "", h;
  },
  dragGroupControlStart: function(t, r) {
    var e = this.dragControlStart(t, r);
    if (!e)
      return !1;
    var n = t.moveables, a = t.props.targets, i = Ut(t, "roundable", r), o = M({ targets: t.props.targets, events: i.map(function(s, u) {
      return M(M({}, s), { target: a[u], moveable: n[u], currentTarget: n[u] });
    }) }, e);
    return U(t, "onRoundGroupStart", o), e;
  },
  dragGroupControl: function(t, r) {
    var e = this.dragControl(t, r);
    if (!e)
      return !1;
    var n = t.moveables, a = t.props.targets, i = Ut(t, "roundable", r), o = M({ targets: t.props.targets, events: i.map(function(s, u) {
      return M(M(M({}, s), { target: a[u], moveable: n[u], currentTarget: n[u] }), At({
        borderRadius: e.borderRadius
      }, s));
    }) }, e);
    return U(t, "onRoundGroup", o), o;
  },
  dragGroupControlEnd: function(t, r) {
    var e = t.moveables, n = t.props.targets, a = Ut(t, "roundable", r);
    $e(t, "onRound", function(s) {
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
function oc(t, r) {
  var e = r ? 4 : 3, n = mt(e), a = "matrix".concat(r ? "3d" : "", "(").concat(n.join(","), ")");
  return t === a || t === "matrix(1,0,0,1,0,0)";
}
var $o = {
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
    var e = t.state, n = e.is3d, a = e.targetMatrix, i = e.inlineTransform, o = n ? "matrix3d(".concat(a.join(","), ")") : "matrix(".concat(Ni(a, !0), ")"), s = !i || i === "none" ? o : i;
    r.datas.startTransforms = oc(s, n) ? [] : cr(s);
  },
  resetStyle: function(t) {
    var r = t.datas;
    r.nextStyle = {}, r.nextTransforms = t.datas.startTransforms, r.nextTransformAppendedIndexes = [];
  },
  fillDragStartParams: function(t, r) {
    return nt(t, r, {
      setTransform: function(e) {
        r.datas.startTransforms = Rt(e) ? e : cr(e);
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
    var n = Ut(t, "beforeRenderable", r), a = t.moveables, i = n.map(function(o, s) {
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
    var n = Ut(t, "beforeRenderable", r), a = t.moveables, i = n.map(function(o, s) {
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
}, Zo = {
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
    var e = this, n = Ut(t, "beforeRenderable", r), a = t.moveables, i = n.map(function(o, s) {
      var u = a[s];
      return e.fillDragParams(u, o);
    });
    U(t, "onRenderGroup", nt(t, r, M(M({ isPinch: !!r.isPinch, targets: t.props.targets, transform: Se(r), transformObject: {} }, At(De(r))), { events: i })));
  },
  dragGroupEnd: function(t, r) {
    var e = this, n = Ut(t, "beforeRenderable", r), a = t.moveables, i = n.map(function(o, s) {
      var u = a[s];
      return e.fillDragEndParams(u, o);
    });
    U(t, "onRenderGroupEnd", nt(t, r, M({ isPinch: !!r.isPinch, isDrag: r.isDrag, targets: t.props.targets, events: i, transformObject: {}, transform: Se(r) }, At(De(r)))));
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
    return Br(ze(r) || []).forEach(function(n) {
      e[n.name] = n.functionValue;
    }), nt(t, r, M({ isPinch: !!r.isPinch, transformObject: e, transform: Se(r) }, At(De(r))));
  },
  fillDragEndParams: function(t, r) {
    var e = {};
    return Br(ze(r) || []).forEach(function(n) {
      e[n.name] = n.functionValue;
    }), nt(t, r, M({ isPinch: !!r.isPinch, isDrag: r.isDrag, transformObject: e, transform: Se(r) }, At(De(r))));
  }
};
function Qr(t, r, e, n, a, i, o) {
  i.clientDistX = i.distX, i.clientDistY = i.distY;
  var s = a === "Start", u = a === "End", f = a === "After", l = t.state.target, v = i.isRequest, c = n.indexOf("Control") > -1;
  if (!l || s && c && !v && t.areaElement === i.inputEvent.target)
    return !1;
  var p = N([], w(r), !1);
  if (v) {
    var d = i.requestAble;
    p.some(function(O) {
      return O.name === d;
    }) || p.push.apply(p, N([], w(t.props.ables.filter(function(O) {
      return O.name === d;
    })), !1));
  }
  if (!p.length || p.every(function(O) {
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
  var D = i.datas, E = c ? "controlGesto" : "targetGesto", b = t[E], C = function(O, T, I) {
    if (!(T in O) || b !== t[E])
      return !1;
    var z = O.name, k = D[z] || (D[z] = {});
    if (s && (k.isEventStart = !I || !O[I] || O[I](t, i)), !k.isEventStart)
      return !1;
    var F = O[T](t, M(M({}, i), { stop: x, datas: k, originalDatas: D, inputTarget: h }));
    return t._emitter.off(), s && F === !1 && (k.isEventStart = !1), F;
  };
  S && p.forEach(function(O) {
    O.unset && O.unset(t);
  }), C($o, "drag".concat(n).concat(a));
  var y = 0, _ = 0;
  e.forEach(function(O) {
    if (m)
      return !1;
    var T = "".concat(O).concat(n).concat(a), I = "".concat(O).concat(n, "Condition");
    a === "" && !v && Tl(t.state, i);
    var z = p.filter(function(A) {
      return A[T];
    });
    z = z.filter(function(A, W) {
      return A.name && z.indexOf(A) === W;
    });
    var k = z.filter(function(A) {
      return C(A, T, I);
    }), F = k.length;
    m && ++y, F && ++_, !m && s && z.length && !F && (y += z.filter(function(A) {
      var W = A.name, H = D[W];
      return H.isEventStart ? A.dragRelation !== "strong" : !1;
    }).length ? 1 : 0);
  }), (!f || _) && C(Zo, "drag".concat(n).concat(a));
  var R = b !== t[E] || y === e.length;
  if ((u || m || R) && (t.state.gestos = {}, t.moveables && t.moveables.forEach(function(O) {
    O.state.gestos = {};
  }), p.forEach(function(O) {
    O.unset && O.unset(t);
  })), s && !R && !v && _ && t.props.preventDefault && i?.preventDefault(), t.isUnmounted || R)
    return !1;
  if (!s && _ && !o || u) {
    var P = t.props.flushSync || Ro;
    P(function() {
      t.updateRect(u ? a : "", !0, !1), t.forceUpdate();
    });
  }
  return !s && !u && !f && _ && !o && Qr(t, r, e, n, a + "After", i), !0;
}
function ba(t, r) {
  return function(e, n) {
    var a;
    n === void 0 && (n = e.inputEvent.target);
    var i = n, o = t.areaElement, s = t._dragTarget;
    return !s || !r && (!((a = t.controlGesto) === null || a === void 0) && a.isFlag()) ? !1 : i === s || s.contains(i) || i === o || !t.isMoveableElement(i) && !t.controlBox.contains(i) || Ct(i, "moveable-area") || Ct(i, "moveable-padding") || Ct(i, "moveable-edgeDraggable");
  };
}
function Ko(t, r, e) {
  var n = t.controlBox, a = [], i = t.props, o = i.dragArea, s = t.state.target, u = i.dragTarget;
  a.push(n), (!o || u) && a.push(r), !o && u && s && r !== s && i.dragTargetSelf && a.push(s);
  var f = ba(t);
  return Qo(t, a, "targetAbles", e, {
    dragStart: f,
    pinchStart: f
  });
}
function Jo(t, r) {
  var e = t.controlBox, n = [];
  n.push(e);
  var a = ba(t, !0), i = function(o, s) {
    if (s === void 0 && (s = o.inputEvent.target), s === e)
      return !0;
    var u = a(o, s);
    return !u;
  };
  return Qo(t, n, "controlAbles", r, {
    dragStart: i,
    pinchStart: i
  });
}
function Qo(t, r, e, n, a) {
  a === void 0 && (a = {});
  var i = e === "targetAbles", o = t.props, s = o.pinchOutside, u = o.pinchThreshold, f = o.preventClickEventOnDrag, l = o.preventClickDefault, v = o.checkInput, c = o.dragFocusedInput, p = o.preventDefault, d = p === void 0 ? !0 : p, g = o.preventRightClick, h = g === void 0 ? !0 : g, m = o.preventWheelClick, x = m === void 0 ? !0 : m, S = o.dragContainer, D = Kt(S, !0), E = {
    preventDefault: d,
    preventRightClick: h,
    preventWheelClick: x,
    container: D || lr(t.getControlBoxElement()),
    pinchThreshold: u,
    pinchOutside: s,
    preventClickEventOnDrag: i ? f : !1,
    preventClickEventOnDragStart: i ? l : !1,
    preventClickEventByCondition: i ? null : function(y) {
      return t.controlBox.contains(y.target);
    },
    checkInput: i ? v : !1,
    dragFocusedInput: c
  }, b = new Pu(r, E), C = n === "Control";
  return ["drag", "pinch"].forEach(function(y) {
    ["Start", "", "End"].forEach(function(_) {
      b.on("".concat(y).concat(_), function(R) {
        var P, O = R.eventType, T = y === "drag" && R.isPinch;
        if (a[O] && !a[O](R)) {
          R.stop();
          return;
        }
        if (!T) {
          var I = y === "drag" ? [y] : ["drag", y], z = N([], w(t[e]), !1), k = Qr(t, z, I, n, _, R);
          k ? (t.props.stopPropagation || _ === "Start" && C) && ((P = R?.inputEvent) === null || P === void 0 || P.stopPropagation()) : R.stop();
        }
      });
    });
  }), b;
}
var sc = /* @__PURE__ */ function() {
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
function uc(t, r, e, n) {
  var a;
  e === void 0 && (e = r);
  var i = no(t, r), o = i.matrixes, s = i.is3d, u = i.targetMatrix, f = i.transformOrigin, l = i.targetOrigin, v = i.offsetContainer, c = i.hasFixed, p = i.zoom, d = Ef(v, e), g = d.matrixes, h = d.is3d, m = d.offsetContainer, x = d.zoom, S = n, D = 4, E = t.tagName.toLowerCase() !== "svg" && "ownerSVGElement" in t, b = u, C = mt(D), y = mt(D), _ = mt(D), R = mt(D), P = o.length, O = g.map(function(W) {
    return M(M({}, W), { matrix: W.matrix ? N([], w(W.matrix), !1) : void 0 });
  }).reverse();
  o.reverse(), !s && S && (b = Zt(b, 3, 4), Gn(o)), !h && S && Gn(O), O.forEach(function(W) {
    y = pt(y, W.matrix, D);
  });
  var T = e || dr(t), I = ((a = O[0]) === null || a === void 0 ? void 0 : a.target) || ae(T, T, !0).offsetParent, z = O.slice(1).reduce(function(W, H) {
    return pt(W, H.matrix, D);
  }, mt(D));
  o.forEach(function(W, H) {
    if (P - 2 === H && (_ = C.slice()), P - 1 === H && (R = C.slice()), !W.matrix) {
      var G = o[H + 1], V = _l(W, G, I, D, pt(z, C, D));
      W.matrix = Er(V, D);
    }
    C = pt(C, W.matrix, D);
  });
  var k = !E && s;
  b || (b = mt(k ? 4 : 3));
  var F = Ue(E && b.length === 16 ? Zt(b, 4, 3) : b, k), A = y;
  return y = ki(y, D, D), {
    hasZoom: p !== 1 || x !== 1,
    hasFixed: c,
    matrixes: o,
    rootMatrix: y,
    originalRootMatrix: A,
    beforeMatrix: _,
    offsetMatrix: R,
    allMatrix: C,
    targetMatrix: b,
    targetTransform: F,
    inlineTransform: t.style.transform,
    transformOrigin: f,
    targetOrigin: l,
    is3d: S,
    offsetContainer: v,
    offsetRootContainer: m
  };
}
function fc(t, r, e, n) {
  e === void 0 && (e = r);
  var a = 0, i = 0, o = 0, s = {}, u = Po(t);
  if (t && (a = u.offsetWidth, i = u.offsetHeight), t) {
    var f = uc(t, r, e, n), l = Gr(f.allMatrix, f.transformOrigin, a, i);
    s = M(M({}, f), l);
    var v = Gr(f.allMatrix, [50, 50], 100, 100);
    o = Io([v.pos1, v.pos2], v.direction);
  }
  var c = 4;
  return M(M(M({ hasZoom: !1, width: a, height: i, rotation: o }, u), { originalRootMatrix: mt(c), rootMatrix: mt(c), beforeMatrix: mt(c), offsetMatrix: mt(c), allMatrix: mt(c), targetMatrix: mt(c), targetTransform: "", inlineTransform: "", transformOrigin: [0, 0], targetOrigin: [0, 0], is3d: !!n, left: 0, top: 0, right: 0, bottom: 0, origin: [0, 0], pos1: [0, 0], pos2: [0, 0], pos3: [0, 0], pos4: [0, 0], direction: 1, hasFixed: !1, offsetContainer: null, offsetRootContainer: null, matrixes: [] }), s);
}
function Fn(t, r, e, n, a, i) {
  i === void 0 && (i = []);
  var o = 1, s = [0, 0], u = Ee(), f = Ee(), l = Ee(), v = Ee(), c = [0, 0], p = {}, d = fc(r, e, a, !0);
  if (r) {
    var g = Nt(r);
    i.forEach(function(O) {
      p[O] = g(O);
    });
    var h = d.is3d ? 4 : 3, m = Gr(d.offsetMatrix, ut(d.transformOrigin, Fi(d.targetMatrix, h)), d.width, d.height);
    o = m.direction, s = ut(m.origin, [m.left - d.left, m.top - d.top]), v = Jr(d.offsetRootContainer);
    var x = ae(n, n, !0).offsetParent || d.offsetRootContainer;
    if (d.hasZoom) {
      var S = Gr(pt(d.originalRootMatrix, d.allMatrix), d.transformOrigin, d.width, d.height), D = Gr(d.originalRootMatrix, ke(Nt(x)("transformOrigin")).map(function(O) {
        return parseFloat(O);
      }), x.offsetWidth, x.offsetHeight);
      if (u = cn(S, v), l = cn(D, v, x, !0), t) {
        var E = S.left, b = S.top;
        f = cn({
          left: E,
          top: b,
          bottom: b,
          right: b
        }, v);
      }
    } else {
      u = Jr(r), l = bf(x), t && (f = Jr(t));
      var C = l.left, y = l.top, _ = l.clientLeft, R = l.clientTop, P = [
        u.left - C,
        u.top - y
      ];
      c = Q(Nr(d.rootMatrix, P, 4), [_ + d.left, R + d.top]);
    }
  }
  return M({ targetClientRect: u, containerClientRect: l, moveableClientRect: f, rootContainerClientRect: v, beforeDirection: o, beforeOrigin: s, originalBeforeOrigin: s, target: r, style: p, offsetDelta: c }, d);
}
function pi(t) {
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
var Wr = /* @__PURE__ */ function(t) {
  ue(r, t);
  function r() {
    var e = t !== null && t.apply(this, arguments) || this;
    return e.state = M({ container: null, gestos: {}, renderLines: [
      [[0, 0], [0, 0]],
      [[0, 0], [0, 0]],
      [[0, 0], [0, 0]],
      [[0, 0], [0, 0]]
    ], renderPoses: [[0, 0], [0, 0], [0, 0], [0, 0]], disableNativeEvent: !1, posDelta: [0, 0] }, Fn(null)), e.renderState = {}, e.enabledAbles = [], e.targetAbles = [], e.controlAbles = [], e.rotation = 0, e.scale = [1, 1], e.isMoveableMounted = !1, e.isUnmounted = !1, e.events = {
      mouseEnter: null,
      mouseLeave: null
    }, e._emitter = new Qn(), e._prevOriginalDragTarget = null, e._originalDragTarget = null, e._prevDragTarget = null, e._dragTarget = null, e._prevPropTarget = null, e._propTarget = null, e._prevDragArea = !1, e._isPropTargetChanged = !1, e._hasFirstTarget = !1, e._reiszeObserver = null, e._observerId = 0, e._mutationObserver = null, e._rootContainer = null, e._viewContainer = null, e._viewClassNames = [], e._store = {}, e.checkUpdateRect = function() {
      if (!e.isDragging()) {
        var n = e.props.parentMoveable;
        if (n) {
          n.checkUpdateRect();
          return;
        }
        Vs(e._observerId), e._observerId = Ii(function() {
          e.isDragging() || e.updateRect();
        });
      }
    }, e._onPreventClick = function(n) {
      n.stopPropagation(), n.preventDefault();
    }, e;
  }
  return r.prototype.render = function() {
    var e = this.props, n = this.getState(), a = e.parentPosition, i = e.className, o = e.target, s = e.zoom, u = e.cspNonce, f = e.translateZ, l = e.cssStyled, v = e.groupable, c = e.linePadding, p = e.controlPadding;
    this._checkUpdateRootContainer(), this.checkUpdate(), this.updateRenderPoses();
    var d = w(a || [0, 0], 2), g = d[0], h = d[1], m = n.left, x = n.top, S = n.target, D = n.direction, E = n.hasFixed, b = n.offsetDelta, C = e.targets, y = this.isDragging(), _ = {};
    this.getEnabledAbles().forEach(function(z) {
      _["data-able-".concat(z.name.toLowerCase())] = !0;
    });
    var R = this._getAbleClassName(), P = C && C.length && (S || v) || o || !this._hasFirstTarget && this.state.isPersisted, O = this.controlBox || this.props.firstRenderState || this.props.persistData, T = [m - g, x - h];
    !v && e.useAccuratePosition && (T[0] += b[0], T[1] += b[1]);
    var I = {
      position: E ? "fixed" : "absolute",
      display: P ? "block" : "none",
      visibility: O ? "visible" : "hidden",
      transform: "translate3d(".concat(T[0], "px, ").concat(T[1], "px, ").concat(f, ")"),
      "--zoom": s,
      "--zoompx": "".concat(s, "px")
    };
    return c && (I["--moveable-line-padding"] = c), p && (I["--moveable-control-padding"] = p), ht.createElement(
      l,
      M({ cspNonce: u, ref: Dr(this, "controlBox"), className: "".concat(K("control-box", D === -1 ? "reverse" : "", y ? "dragging" : ""), " ").concat(R, " ").concat(i) }, _, { onClick: this._onPreventClick, style: I }),
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
    return e && (((n = e.getAttribute) === null || n === void 0 ? void 0 : n.call(e, "class")) || "").indexOf(ea) > -1;
  }, r.prototype.dragStart = function(e, n) {
    n === void 0 && (n = e.target);
    var a = this.targetGesto, i = this.controlGesto;
    return a && ba(this)({ inputEvent: e }, n) ? a.isFlag() || a.triggerDragStart(e) : i && this.isMoveableElement(n) && (i.isFlag() || i.triggerDragStart(e)), this;
  }, r.prototype.hitTest = function(e) {
    var n = this.state, a = n.target, i = n.pos1, o = n.pos2, s = n.pos3, u = n.pos4, f = n.targetClientRect;
    if (!a)
      return 0;
    var l;
    if ($n(e)) {
      var v = e.getBoundingClientRect();
      l = {
        left: v.left,
        top: v.top,
        width: v.width,
        height: v.height
      };
    } else
      l = M({ width: 0, height: 0 }, e);
    var c = l.left, p = l.top, d = l.width, g = l.height, h = Aa([i, o, u, s], f), m = _u(h, [
      [c, p],
      [c + d, p],
      [c + d, p + g],
      [c, p + g]
    ]), x = Li(h);
    return !m || !x ? 0 : Math.min(100, m / x * 100);
  }, r.prototype.isInside = function(e, n) {
    var a = this.state, i = a.target, o = a.pos1, s = a.pos2, u = a.pos3, f = a.pos4, l = a.targetClientRect;
    return i ? bn([e, n], Aa([o, s, f, u], l)) : !1;
  }, r.prototype.updateRect = function(e, n, a) {
    a === void 0 && (a = !0);
    var i = this.props, o = !i.parentPosition && !i.wrapperMoveable;
    o && kr(!0);
    var s = i.parentMoveable, u = this.state, f = u.target || i.target, l = this.getContainer(), v = s ? s._rootContainer : this._rootContainer, c = Fn(this.controlBox, f, l, l, v || l, this._getRequestStyles());
    if (!f && this._hasFirstTarget && i.persistData) {
      var p = pi(i.persistData);
      for (var d in p)
        c[d] = p[d];
    }
    o && kr(), this.updateState(c, s ? !1 : a);
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
    var e = this.state, n = qt(this.state), a = w(n, 4), i = a[0], o = a[1], s = a[2], u = a[3], f = Xt(n), l = e.width, v = e.height, c = f.width, p = f.height, d = f.left, g = f.top, h = [e.left, e.top], m = ut(h, e.origin), x = ut(h, e.beforeOrigin), S = e.transformOrigin;
    return {
      width: c,
      height: p,
      left: d,
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
      n?.isIdle() === !1 && Bn(this, !1), n?.stop();
    }
    if (!e || e === "control") {
      var n = this.controlGesto;
      n?.isIdle() === !1 && Bn(this, !0), n?.stop();
    }
  }, r.prototype.getRotation = function() {
    var e = this.state, n = e.pos1, a = e.pos2, i = e.direction;
    return Il(n, a, i);
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
    var v = l.request(i), c = a || n.isInstant, p = v.isControl ? "controlAbles" : "targetAbles", d = "".concat(f ? "Group" : "").concat(v.isControl ? "Control" : ""), g = N([], w(s[p]), !1), h = {
      request: function(m) {
        return Qr(i, g, ["drag"], d, "", M(M({}, v.request(m)), { requestAble: e, isRequest: !0 }), c), h;
      },
      requestEnd: function() {
        return Qr(i, g, ["drag"], d, "End", M(M({}, v.requestEnd()), { requestAble: e, isRequest: !0 }), c), h;
      }
    };
    return Qr(i, g, ["drag"], d, "Start", M(M({}, v.requestStart(n)), { requestAble: e, isRequest: !0 }), c), c ? h.request(n).requestEnd() : h;
  }, r.prototype.getMoveables = function() {
    return [this];
  }, r.prototype.destroy = function() {
    this.componentWillUnmount();
  }, r.prototype.updateRenderPoses = function() {
    var e = this.getState(), n = this.props, a = n.padding, i = e.originalBeforeOrigin, o = e.transformOrigin, s = e.allMatrix, u = e.is3d, f = e.pos1, l = e.pos2, v = e.pos3, c = e.pos4, p = e.left, d = e.top, g = e.isPersisted, h = n.zoom || 1;
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
    var m = Lo(a || {}), x = m.left, S = m.top, D = m.bottom, E = m.right, b = u ? 4 : 3, C = [];
    g ? C = o : this.controlBox && n.groupable ? C = i : C = ut(i, [p, d]);
    var y = Pe(b, Er(C.map(function(I) {
      return -I;
    }), b), s, Er(o, b)), _ = Yt(y, f, [-x, -S], b), R = Yt(y, l, [E, -S], b), P = Yt(y, v, [-x, D], b), O = Yt(y, c, [E, D], b);
    if (e.renderPoses = [
      _,
      R,
      P,
      O
    ], e.renderLines = [
      [_, R],
      [R, O],
      [O, P],
      [P, _]
    ], h) {
      var T = h / 2;
      e.renderLines = [
        [
          Yt(y, f, [-x - T, -S], b),
          Yt(y, l, [E + T, -S], b)
        ],
        [
          Yt(y, l, [E, -S - T], b),
          Yt(y, c, [E, D + T], b)
        ],
        [
          Yt(y, c, [E + T, D], b),
          Yt(y, v, [-x - T, D], b)
        ],
        [
          Yt(y, v, [-x, D + T], b),
          Yt(y, f, [-x, -S - T], b)
        ]
      ];
    }
  }, r.prototype.checkUpdate = function() {
    this._isPropTargetChanged = !1;
    var e = this.props, n = e.target, a = e.container, i = e.parentMoveable, o = this.state, s = o.target, u = o.container;
    if (!(!s && !n)) {
      this.updateAbles();
      var f = !An(s, n), l = f || !An(u, a);
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
    return a[i] || (a[i] = Vi(e, n)), a[i];
  }, r.prototype.getState = function() {
    var e, n = this.props;
    (n.target || !((e = n.targets) === null || e === void 0) && e.length) && (this._hasFirstTarget = !0);
    var a = this.controlBox, i = n.persistData, o = n.firstRenderState;
    if (o && !a)
      return o;
    if (!this._hasFirstTarget && i) {
      var s = pi(i);
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
    var a = this.props, i = a.triggerAblesSimultaneously, o = this.getEnabledAbles(e), s = "drag".concat(n, "Start"), u = "pinch".concat(n, "Start"), f = "drag".concat(n, "ControlStart"), l = ye(o, [s, u], i), v = ye(o, [f], i);
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
      createElement: ht.createElement
    };
    return this.renderState = {}, wl(Fo(ye(this.getEnabledAbles(), ["render"], a).map(function(o) {
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
      return N(N([], w(n), !1), w(s), !1);
    }, N([], w(this.props.requestStyles || []), !1));
    return e;
  }, r.prototype._updateObserver = function(e) {
    this._updateResizeObserver(e), this._updateMutationObserver(e);
  }, r.prototype._updateEvents = function() {
    var e = this.targetAbles.length, n = this.controlAbles.length, a = this._dragTarget, i = !e && this.targetGesto || this._isTargetChanged(!0);
    i && (Ir(this, !1), this.updateState({ gestos: {} })), n || Ir(this, !0), a && e && !this.targetGesto && (this.targetGesto = Ko(this, a, "")), !this.controlGesto && n && (this.controlGesto = Jo(this, "Control"));
  }, r.prototype._updateTargets = function() {
    var e = this.props;
    this._prevPropTarget = this._propTarget, this._prevDragTarget = this._dragTarget, this._prevOriginalDragTarget = this._originalDragTarget, this._prevDragArea = e.dragArea, this._propTarget = e.target, this._originalDragTarget = e.dragTarget || e.target, this._dragTarget = Kt(this._originalDragTarget, !0);
  }, r.prototype._renderLines = function() {
    var e = this.props, n = e, a = n.zoom, i = n.hideDefaultLines, o = n.hideChildMoveableDefaultLines, s = n.parentMoveable;
    if (i || s && o)
      return [];
    var u = this.getState(), f = {
      createElement: ht.createElement
    };
    return u.renderLines.map(function(l, v) {
      return ne(f, "", l[0], l[1], a, "render-line-".concat(v));
    });
  }, r.prototype._isTargetChanged = function(e) {
    var n = this.props, a = n.dragTarget || n.target, i = this._prevOriginalDragTarget, o = this._prevDragArea, s = n.dragArea, u = !s && i !== a, f = (e || s) && o !== s;
    return u || f || this._prevPropTarget != this._propTarget;
  }, r.prototype._updateNativeEvents = function() {
    var e = this, n = this.props, a = n.dragArea ? this.areaElement : this.state.target, i = this.events, o = Hr(i);
    if (this._isTargetChanged())
      for (var s in i) {
        var u = i[s];
        u && u.destroy(), i[s] = null;
      }
    if (a) {
      var f = this.enabledAbles;
      o.forEach(function(l) {
        var v = ye(f, [l]), c = v.length > 0, p = i[l];
        if (!c) {
          p && (p.destroy(), i[l] = null);
          return;
        }
        p || (p = new sc(a, e, l), i[l] = p), p.setAbles(v);
      });
    }
  }, r.prototype._checkUpdateRootContainer = function() {
    var e = this.props.rootContainer;
    !this._rootContainer && e && (this._rootContainer = Kt(e, !0));
  }, r.prototype._checkUpdateViewContainer = function() {
    var e = this.props.viewContainer;
    !this._viewContainer && e && (this._viewContainer = Kt(e, !0));
    var n = this._viewContainer;
    n && this._changeAbleViewClassNames(N(N([], w(this._getAbleViewClassNames()), !1), [
      this.isDragging() ? Nl : ""
    ], !1));
  }, r.prototype._changeAbleViewClassNames = function(e) {
    var n = this._viewContainer, a = ko(e.filter(Boolean), function(f) {
      return f;
    }).map(function(f) {
      var l = w(f, 1), v = l[0];
      return v;
    }), i = this._viewClassNames, o = Jn(i, a), s = o.removed, u = o.added;
    s.forEach(function(f) {
      Bi(n, i[f]);
    }), u.forEach(function(f) {
      Gi(n, a[f]);
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
      var l, v, c, p = f.name, d = ((l = f.className) === null || l === void 0 ? void 0 : l.call(f, n)) || "";
      return (!((v = s[p]) === null || v === void 0) && v.isEventStart || !((c = u[p]) === null || c === void 0) && c.isEventStart) && (d += " ".concat(K("".concat(p).concat(e, "-dragging")))), d.trim();
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
          for (var c = Lu(f), p = c.next(); !p.done; p = c.next()) {
            var d = p.value;
            d.type === "attributes" && d.attributeName === "style" && n.checkUpdateRect();
          }
        } catch (g) {
          l = { error: g };
        } finally {
          try {
            p && !p.done && (v = c.return) && v.call(c);
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
    flushSync: Ro,
    firstRenderState: null,
    persistData: null,
    viewContainer: null,
    requestStyles: [],
    useAccuratePosition: !1
  }, r;
}(ht.PureComponent), Ea = {
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
    var c = zr(t, "parentPosition", [o, s], function(d) {
      return d.join(",");
    }), p = zr(t, "requestStyles", t.getRequestChildStyles(), function(d) {
      return d.join(",");
    });
    return t.moveables = t.moveables.slice(0, a.length), N(N([], w(a.map(function(d, g) {
      return r.createElement(Wr, { key: "moveable" + g, ref: wi(t, "moveables", g), target: d, origin: !1, requestStyles: p, cssStyled: n.cssStyled, customStyledMap: n.customStyledMap, useResizeObserver: n.useResizeObserver, useMutationObserver: n.useMutationObserver, hideChildMoveableDefaultLines: n.hideChildMoveableDefaultLines, parentMoveable: t, parentPosition: [o, s], persistData: v[g], zoom: f });
    })), !1), w(Fo(l.map(function(d, g) {
      var h = d.pos1, m = d.pos2, x = d.pos3, S = d.pos4, D = [h, m, x, S];
      return [
        [0, 1],
        [1, 3],
        [3, 2],
        [2, 0]
      ].map(function(E, b) {
        var C = w(E, 2), y = C[0], _ = C[1];
        return ne(r, "", Q(D[y], c), Q(D[_], c), f, "group-rect-".concat(g, "-").concat(b));
      });
    }))), !1);
  }
}, lc = fe("clickable", {
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
function Rr(t) {
  var r = t.originalDatas.draggable;
  return r || (t.originalDatas.draggable = {}, r = t.originalDatas.draggable), M(M({}, t), { datas: r });
}
var cc = fe("edgeDraggable", {
  css: [
    `.edge.edgeDraggable.line {
cursor: move;
}`
  ],
  render: function(t, r) {
    var e = t.props, n = e.edgeDraggable;
    return n ? oo(r, "edgeDraggable", n, t.getState().renderPoses, e.zoom) : [];
  },
  dragCondition: function(t, r) {
    var e, n = t.props, a = (e = r.inputEvent) === null || e === void 0 ? void 0 : e.target;
    return !n.edgeDraggable || !a ? !1 : !n.draggable && Ct(a, K("direction")) && Ct(a, K("edge")) && Ct(a, K("edgeDraggable"));
  },
  dragStart: function(t, r) {
    return Gt.dragStart(t, Rr(r));
  },
  drag: function(t, r) {
    return Gt.drag(t, Rr(r));
  },
  dragEnd: function(t, r) {
    return Gt.dragEnd(t, Rr(r));
  },
  dragGroupCondition: function(t, r) {
    var e, n = t.props, a = (e = r.inputEvent) === null || e === void 0 ? void 0 : e.target;
    return !n.edgeDraggable || !a ? !1 : !n.draggable && Ct(a, K("direction")) && Ct(a, K("line"));
  },
  dragGroupStart: function(t, r) {
    return Gt.dragGroupStart(t, Rr(r));
  },
  dragGroup: function(t, r) {
    return Gt.dragGroup(t, Rr(r));
  },
  dragGroupEnd: function(t, r) {
    return Gt.dragGroupEnd(t, Rr(r));
  },
  unset: function(t) {
    return Gt.unset(t);
  }
}), ts = {
  name: "individualGroupable",
  props: [
    "individualGroupable",
    "individualGroupableProps"
  ],
  events: []
}, vc = [
  $o,
  Vo,
  gl,
  Gl,
  Gt,
  cc,
  Pn,
  Bl,
  kl,
  Kf,
  Ll,
  Yl,
  Wl,
  rc,
  tc,
  ic,
  Ea,
  ts,
  lc,
  Xo,
  Zo
];
function di(t, r) {
  var e = w(t, 3), n = e[0], a = e[1], i = e[2];
  return (n * r[0] + a * r[1] + i) / Math.sqrt(n * n + a * a);
}
function Me(t, r) {
  var e = w(t, 2), n = e[0], a = e[1];
  return -n * r[0] - a * r[1];
}
function gi(t, r) {
  return Math.max.apply(Math, N([], w(t.map(function(e) {
    var n = w(e, 4), a = n[0], i = n[1], o = n[2], s = n[3];
    return Math.max(a[r], i[r], o[r], s[r]);
  })), !1));
}
function hi(t, r) {
  return Math.min.apply(Math, N([], w(t.map(function(e) {
    var n = w(e, 4), a = n[0], i = n[1], o = n[2], s = n[3];
    return Math.min(a[r], i[r], o[r], s[r]);
  })), !1));
}
function pc(t, r) {
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
    var c = v / 180 * Math.PI, p = Math.tan(c), d = -1 / p, g = [Rn, Na], h = [[0, 0], [0, 0]], m = [Rn, Na], x = [[0, 0], [0, 0]];
    t.forEach(function(q) {
      q.forEach(function(L) {
        var j = di([-p, 1, 0], L), Y = di([-d, 1, 0], L);
        g[0] > j && (h[0] = L, g[0] = j), g[1] < j && (h[1] = L, g[1] = j), m[0] > Y && (x[0] = L, m[0] = Y), m[1] < Y && (x[1] = L, m[1] = Y);
      });
    });
    var S = w(h, 2), D = S[0], E = S[1], b = w(x, 2), C = b[0], y = b[1], _ = [-p, 1, Me([-p, 1], D)], R = [-p, 1, Me([-p, 1], E)], P = [-d, 1, Me([-d, 1], C)], O = [-d, 1, Me([-d, 1], y)];
    e = w([
      [_, P],
      [_, O],
      [R, P],
      [R, O]
    ].map(function(q) {
      var L = w(q, 2), j = L[0], Y = L[1];
      return ta(j, Y)[0];
    }), 4), i = e[0], o = e[1], s = e[2], u = e[3], f = m[1] - m[0], l = g[1] - g[0];
  } else {
    var T = hi(t, 0), I = hi(t, 1), z = gi(t, 0), k = gi(t, 1);
    if (i = [T, I], o = [z, I], s = [T, k], u = [z, k], f = z - T, l = k - I, v % 180) {
      var F = [s, i, u, o];
      n = w(F, 4), i = n[0], o = n[1], s = n[2], u = n[3], f = k - I, l = z - T;
    }
  }
  if (v % 360 > 180) {
    var F = [u, s, o, i];
    a = w(F, 4), i = a[0], o = a[1], s = a[2], u = a[3];
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
function rs(t, r) {
  var e = r.map(function(n) {
    if (Rt(n)) {
      var a = rs(t, n), i = a.length;
      return i > 1 ? a : i === 1 ? a[0] : null;
    } else {
      var o = Ht(t, function(s) {
        var u = s.manager;
        return u.props.target === n;
      });
      return o ? (o.finded = !0, o.manager) : null;
    }
  }).filter(Boolean);
  return e.length === 1 && Rt(e[0]) ? e[0] : e;
}
var dc = /* @__PURE__ */ function(t) {
  ue(r, t);
  function r() {
    var e = t !== null && t.apply(this, arguments) || this;
    return e.differ = new Hi(), e.moveables = [], e.transformOrigin = "50% 50%", e.renderGroupRects = [], e._targetGroups = [], e._hasFirstTargets = !1, e;
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
    kr(!0), this.moveables.forEach(function(J) {
      J.updateRect(e, !1, !1);
    });
    var s = this.props, u = this.moveables, f = o.target || s.target, l = u.map(function(J) {
      return { finded: !1, manager: J };
    }), v = this.props.targetGroups || [], c = rs(l, v), p = s.useDefaultGroupRotate;
    c.push.apply(c, N([], w(l.filter(function(J) {
      var at = J.finded;
      return !at;
    }).map(function(J) {
      var at = J.manager;
      return at;
    })), !1));
    var d = [], g = !n || e !== "" && s.updateGroup, h = s.defaultGroupRotate || 0;
    if (!this._hasFirstTargets) {
      var m = (i = s.persistData) === null || i === void 0 ? void 0 : i.rotation;
      m != null && (h = m);
    }
    function x(J, at, st) {
      var X = J.map(function(dt) {
        if (Rt(dt)) {
          var it = x(dt, at), lt = [it.pos1, it.pos2, it.pos3, it.pos4];
          return d.push(it), { poses: lt, rotation: it.rotation };
        } else
          return {
            poses: qt(dt.state),
            rotation: dt.getRotation()
          };
      }), Z = X.map(function(dt) {
        var it = dt.rotation;
        return it;
      }), ft = 0, rt = Z[0], et = Z.every(function(dt) {
        return Math.abs(rt - dt) < 0.1;
      });
      g ? ft = !p && et ? rt : h : ft = !p && !st && et ? rt : at;
      var ot = X.map(function(dt) {
        var it = dt.poses;
        return it;
      }), ct = pc(ot, ft);
      return ct;
    }
    var S = x(c, this.rotation, !0);
    g && (this.rotation = S.rotation, this.transformOrigin = s.defaultGroupOrigin || "50% 50%", this.scale = [1, 1]), this._targetGroups = v, this.renderGroupRects = d;
    var D = this.transformOrigin, E = this.rotation, b = this.scale, C = S.width, y = S.height, _ = S.minX, R = S.minY, P = zl([
      [0, 0],
      [C, 0],
      [0, y],
      [C, y]
    ], xa(D, C, y), this.rotation / 180 * Math.PI), O = yr(P.result), T = O.minX, I = O.minY, z = " rotate(".concat(E, "deg)") + " scale(".concat(Bt(b[0]), ", ").concat(Bt(b[1]), ")"), k = "translate(".concat(-T, "px, ").concat(-I, "px)").concat(z);
    this.controlBox.style.transform = "translate3d(".concat(_, "px, ").concat(R, "px, ").concat(this.props.translateZ || 0, ")"), f.style.cssText += "left:0px;top:0px;" + "transform-origin:".concat(D, ";") + "width:".concat(C, "px;height:").concat(y, "px;") + "transform: ".concat(k), o.width = C, o.height = y;
    var F = this.getContainer(), A = Fn(this.controlBox, f, this.controlBox, this.getContainer(), this._rootContainer || F, []), W = [A.left, A.top], H = w(qt(A), 4), G = H[0], V = H[1], q = H[2], L = H[3], j = yr([G, V, q, L]), Y = [j.minX, j.minY], $ = Bt(b[0] * b[1]);
    A.pos1 = Q(G, Y), A.pos2 = Q(V, Y), A.pos3 = Q(q, Y), A.pos4 = Q(L, Y), A.left = _ - A.left + Y[0], A.top = R - A.top + Y[1], A.origin = Q(ut(W, A.origin), Y), A.beforeOrigin = Q(ut(W, A.beforeOrigin), Y), A.originalBeforeOrigin = ut(W, A.originalBeforeOrigin), A.transformOrigin = Q(ut(W, A.transformOrigin), Y), f.style.transform = "translate(".concat(-T - Y[0], "px, ").concat(-I - Y[1], "px)") + z, kr(), this.updateState(M(M({}, A), { posDelta: Y, direction: $, beforeDirection: $ }), a);
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
      return N(N([], w(n), !1), w(s), !1);
    }, []);
    return e;
  }, r.prototype.getMoveables = function() {
    return N([], w(this.moveables), !1);
  }, r.prototype.updateAbles = function() {
    t.prototype.updateAbles.call(this, N(N([], w(this.props.ables), !1), [Ea], !1), "Group");
  }, r.prototype._updateTargets = function() {
    t.prototype._updateTargets.call(this), this._originalDragTarget = this.props.dragTarget || this.areaElement, this._dragTarget = Kt(this._originalDragTarget, !0);
  }, r.prototype._updateEvents = function() {
    var e = this.state, n = this.props, a = this._prevDragTarget, i = n.dragTarget || this.areaElement, o = n.targets, s = this.differ.update(o), u = s.added, f = s.changed, l = s.removed, v = u.length || l.length;
    (v || this._prevOriginalDragTarget !== this._originalDragTarget) && (Ir(this, !1), Ir(this, !0), this.updateState({ gestos: {} })), a !== i && (e.target = null), e.target || (e.target = this.areaElement, this.controlBox.style.display = "block"), e.target && (this.targetGesto || (this.targetGesto = Ko(this, this._dragTarget, "Group")), this.controlGesto || (this.controlGesto = Jo(this, "GroupControl")));
    var c = !An(e.container, n.container);
    c && (e.container = n.container), (c || v || this.transformOrigin !== (n.defaultGroupOrigin || "50% 50%") || f.length || o.length && !Ho(this._targetGroups, n.targetGroups || [])) && (this.updateRect(), this._hasFirstTargets = !0), this._isPropTargetChanged = !!v;
  }, r.prototype._updateObserver = function() {
  }, r.defaultProps = M(M({}, Wr.defaultProps), { transformOrigin: ["50%", "50%"], groupable: !0, dragArea: !0, keepRatio: !0, targets: [], defaultGroupRotate: 0, defaultGroupOrigin: "50% 50%" }), r;
}(Wr), gc = /* @__PURE__ */ function(t) {
  ue(r, t);
  function r() {
    var e = t !== null && t.apply(this, arguments) || this;
    return e.moveables = [], e;
  }
  return r.prototype.render = function() {
    var e = this, n, a = this.props, i = a.cspNonce, o = a.cssStyled, s = a.persistData, u = a.targets || [], f = u.length, l = this.isUnmounted || !f, v = (n = s?.children) !== null && n !== void 0 ? n : [];
    return l && !f && v.length ? u = v.map(function() {
      return null;
    }) : l || (v = []), ht.createElement(o, { cspNonce: i, ref: Dr(this, "controlBox"), className: K("control-box") }, u.map(function(c, p) {
      var d, g, h = (g = (d = a.individualGroupableProps) === null || d === void 0 ? void 0 : d.call(a, c, p)) !== null && g !== void 0 ? g : {};
      return ht.createElement(Wr, M({ key: "moveable" + p, ref: wi(e, "moveables", p) }, a, h, { target: c, wrapperMoveable: e, isWrapperMounted: e.isMoveableMounted, persistData: v[p] }));
    }));
  }, r.prototype.componentDidMount = function() {
  }, r.prototype.componentDidUpdate = function() {
  }, r.prototype.getTargets = function() {
    return this.props.targets;
  }, r.prototype.updateRect = function(e, n, a) {
    a === void 0 && (a = !0), kr(!0), this.moveables.forEach(function(i) {
      i.updateRect(e, n, a);
    }), kr();
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
    return N([], w(this.moveables), !1);
  }, r.prototype.updateRenderPoses = function() {
  }, r.prototype.checkUpdate = function() {
  }, r.prototype.triggerEvent = function() {
  }, r.prototype.updateAbles = function() {
  }, r.prototype._updateEvents = function() {
  }, r.prototype._updateObserver = function() {
  }, r;
}(Wr);
function es(t, r) {
  var e = [];
  return t.forEach(function(n) {
    if (n) {
      if (ar(n)) {
        r[n] && e.push.apply(e, N([], w(r[n]), !1));
        return;
      }
      Rt(n) ? e.push.apply(e, N([], w(es(n, r)), !1)) : e.push(n);
    }
  }), e;
}
function ns(t, r) {
  var e = [];
  return t.forEach(function(n) {
    if (n) {
      if (ar(n)) {
        r[n] && e.push.apply(e, N([], w(r[n]), !1));
        return;
      }
      Rt(n) ? e.push(ns(n, r)) : e.push(n);
    }
  }), e;
}
function as(t, r) {
  return t.length !== r.length || t.some(function(e, n) {
    var a = r[n];
    return !e && !a ? !1 : e != a ? Rt(e) && Rt(a) ? as(e, a) : !0 : !1;
  });
}
var hc = /* @__PURE__ */ function(t) {
  ue(r, t);
  function r() {
    var e = t !== null && t.apply(this, arguments) || this;
    return e.refTargets = [], e.selectorMap = {}, e._differ = new Hi(), e._elementTargets = [], e._tmpRefTargets = [], e._tmpSelectorMap = {}, e._onChangeTargets = null, e;
  }
  return r.makeStyled = function() {
    var e = {}, n = this.getTotalAbles();
    n.forEach(function(i) {
      var o = i.css;
      o && o.forEach(function(s) {
        e[s] = !0;
      });
    });
    var a = Hr(e).join(`
`);
    this.defaultStyled = Vi("div", zs(ea, Qu + a));
  }, r.getTotalAbles = function() {
    return N([Vo, Ea, ts, Xo], w(this.defaultAbles), !1);
  }, r.prototype.render = function() {
    var e, n = this.constructor;
    n.defaultStyled || n.makeStyled();
    var a = this.props, i = a.ables, o = a.props, s = Wu(a, ["ables", "props"]), u = w(this._updateRefs(!0), 2), f = u[0], l = u[1], v = es(f, l), c = v.length > 1, p = n.getTotalAbles(), d = N(N([], w(p), !1), w(i || []), !1), g = M(M(M({}, s), o || {}), { ables: d, cssStyled: n.defaultStyled, customStyledMap: n.customStyledMap });
    this._elementTargets = v;
    var h = null, m = this.moveable, x = s.persistData;
    if (x?.children && (c = !0), s.individualGroupable)
      return ht.createElement(gc, M({ key: "individual-group", ref: Dr(this, "moveable") }, g, { target: null, targets: v }));
    if (c) {
      var S = ns(f, l);
      if (m && !m.props.groupable && !m.props.individualGroupable) {
        var D = m.props.target;
        D && v.indexOf(D) > -1 && (h = M({}, m.state));
      }
      return ht.createElement(dc, M({ key: "group", ref: Dr(this, "moveable") }, g, (e = s.groupableProps) !== null && e !== void 0 ? e : {}, { target: null, targets: v, targetGroups: S, firstRenderState: h }));
    } else {
      var E = v[0];
      if (m && (m.props.groupable || m.props.individualGroupable)) {
        var b = m.moveables || [], C = Ht(b, function(y) {
          return y.props.target === E;
        });
        C && (h = M({}, C.state));
      }
      return ht.createElement(Wr, M({ key: "single", ref: Dr(this, "moveable") }, g, { target: E, firstRenderState: h }));
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
    var n = this.refTargets, a = ma(this.props.target || this.props.targets), i = typeof document < "u", o = as(n, a), s = this.selectorMap, u = {};
    return this.refTargets.forEach(function f(l) {
      if (ar(l)) {
        var v = s[l];
        v ? u[l] = s[l] : i && (o = !0, u[l] = [].slice.call(document.querySelectorAll(l)));
      } else Rt(l) && l.forEach(f);
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
    var f = w(this._updateRefs(), 3), l = f[0], v = f[1], c = f[2];
    this.refTargets = l, this.selectorMap = v, c && this.forceUpdate();
  }, r.defaultAbles = [], r.customStyledMap = {}, r.defaultStyled = null, Hu([
    Gs(ef)
  ], r.prototype, "moveable", void 0), r;
}(ht.PureComponent), is = /* @__PURE__ */ function(t) {
  ue(r, t);
  function r() {
    return t !== null && t.apply(this, arguments) || this;
  }
  return r.defaultAbles = vc, r;
}(hc);
function mc({ cmn: { styChild: t, sys: r, sty4Moveable: e }, fn: n }) {
  const a = (s) => r.cfg.searchPath(s, Ds.SP_GSM), i = (s) => {
    s.button == 1 && console.log("fn:GrpLayer.tsx line:28 MIDDLE:");
  }, o = ht.useRef(null);
  return /* @__PURE__ */ Te(Nn, { children: [
    /* @__PURE__ */ tr("img", { css: t, src: a(n), ref: o, style: e, onMouseDown: (s) => i(s) }),
    /* @__PURE__ */ tr(
      is,
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
var mi = function(r, e) {
  var n = arguments;
  if (e == null || !gs.call(e, "css"))
    return ht.createElement.apply(void 0, n);
  var a = n.length, i = new Array(a);
  i[0] = hs, i[1] = ms(r, e);
  for (var o = 2; o < a; o++)
    i[o] = n[o];
  return ht.createElement.apply(null, i);
};
(function(t) {
  var r;
  r || (r = t.JSX || (t.JSX = {}));
})(mi || (mi = {}));
function we() {
  for (var t = arguments.length, r = new Array(t), e = 0; e < t; e++)
    r[e] = arguments[e];
  return ds(r);
}
function xc({ cmn: { styChild: t, sty4Moveable: r }, str: e }) {
  const n = we`
		padding: 1em 1.5em;
		margin: 2em 0;
		background-color: aquamarine;
		border: dotted 6px #ffa500;

		font-size: xxx-large;
		top: 48%;
		width: 70%;
	`, a = ht.useRef(null);
  return /* @__PURE__ */ Te(Nn, { children: [
    /* @__PURE__ */ tr("span", { css: [t, n], ref: a, style: r, children: e }),
    /* @__PURE__ */ tr(
      is,
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
function Ec({
  arg: { sys: t },
  onClick: r,
  after: e,
  before: n
}) {
  const a = wa((x) => x.aLay), i = wa((x) => x.replace);
  class o extends bs {
    nm = "Stage";
    restore() {
      i(this.stt);
    }
    // this.stt から
  }
  t.caretaker.update(() => new o(JSON.stringify(a)));
  const [s, u] = ht.useState(xi());
  Ms(() => {
    function x() {
      u(xi());
    }
    return globalThis.addEventListener("resize", x), () => globalThis.removeEventListener("resize", x);
  });
  const { cvsScale: f } = Sc(s), l = we`
		position: relative;

		transform-origin: left top;
		transform: scale(${f});
		width	: calc(${Wt.stageW}px / ${f});
		height	: calc(${Wt.stageH}px / ${f});
	`, v = we`position: absolute; top: 0; left: 0;`, c = we`
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
	`, [p, d] = ys(!1), g = _s((x) => {
    x.stopPropagation(), xs(), d(), Ss(p);
  }, { isPreventDefault: !0, delay: 300 }), h = ht.useRef(null);
  Si(() => {
    let x = 0;
    const S = (E) => {
      E.preventDefault();
      const b = E.deltaY;
      x > b ? e() : n();
    }, D = h.current;
    return D.addEventListener("wheel", S, { passive: !1 }), () => D.removeEventListener("wheel", S);
  });
  const m = { cmn: { sys: t, styChild: v, sty4Moveable: {
    maxWidth: "auto",
    maxHeight: "auto",
    minWidth: "auto",
    minHeight: "auto",
    transform: "translate(0px, 0px) rotate(0deg)"
  } } };
  return /* @__PURE__ */ Te("div", { css: l, onClick: r, ...g, ref: h, children: [
    p && /* @__PURE__ */ Te(Nn, { children: [
      /* @__PURE__ */ tr("button", { onClick: () => {
      }, css: c, children: "Click" }),
      /* @__PURE__ */ tr("button", { onClick: () => {
      }, css: c, children: "Back" }),
      /* @__PURE__ */ tr("button", { onClick: () => {
      }, css: c, children: "Prev" })
    ] }),
    a.map((x) => x.cls === "GRP" ? /* @__PURE__ */ tr(mc, { cmn: m.cmn, fn: x.fn }, x.nm) : /* @__PURE__ */ tr(xc, { cmn: m.cmn, str: x.str }, x.nm))
  ] });
}
function Sc({ width: t, height: r }) {
  let e = 0, n = 0, a = 1;
  return Wt.stageW > t || Wt.stageH > r ? (Wt.stageW / Wt.stageH <= t / r ? (n = r, e = Ta(Wt.stageW / Wt.stageH * r)) : (e = t, n = Ta(Wt.stageH / Wt.stageW * t)), a = e / Wt.stageW) : (e = Wt.stageW, n = Wt.stageH, a = 1), { cvsScale: a, cvsWidth: e, cvsHeight: n };
}
function xi() {
  const { innerWidth: t, innerHeight: r } = globalThis;
  return { width: t, height: r };
}
export {
  Ec as default
};
//# sourceMappingURL=Stage.js.map
