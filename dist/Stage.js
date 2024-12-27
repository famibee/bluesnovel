import { r as ut, i as bs, o as wi, a as mn, n as Es, j as Br, b as Xt, F as Pe, s as Ds, h as ys, E as Cs, c as _s, u as za, d as Ms, e as ws } from "./Main.js";
import { S as Rs, a as Wt, u as Ga } from "./ConfigBase.js";
import { B as Ts } from "./web2.js";
import { g as Os } from "./_commonjsHelpers.js";
var Ps = function(t, r) {
  return typeof r == "boolean" ? r : !t;
}, Ba = function(t) {
  return ut.useReducer(Ps, t);
}, Is = bs ? ut.useLayoutEffect : ut.useEffect, zs = function(t) {
  ut.useEffect(t, []);
}, en = { exports: {} };
/*!
* screenfull
* v5.2.0 - 2021-11-03
* (c) Sindre Sorhus; MIT License
*/
var ka;
function Gs() {
  return ka || (ka = 1, function(t) {
    (function() {
      var r = typeof window < "u" && typeof window.document < "u" ? window.document : {}, e = t.exports, n = function() {
        for (var o, s = [
          [
            "requestFullscreen",
            "exitFullscreen",
            "fullscreenElement",
            "fullscreenEnabled",
            "fullscreenchange",
            "fullscreenerror"
          ],
          // New WebKit
          [
            "webkitRequestFullscreen",
            "webkitExitFullscreen",
            "webkitFullscreenElement",
            "webkitFullscreenEnabled",
            "webkitfullscreenchange",
            "webkitfullscreenerror"
          ],
          // Old WebKit
          [
            "webkitRequestFullScreen",
            "webkitCancelFullScreen",
            "webkitCurrentFullScreenElement",
            "webkitCancelFullScreen",
            "webkitfullscreenchange",
            "webkitfullscreenerror"
          ],
          [
            "mozRequestFullScreen",
            "mozCancelFullScreen",
            "mozFullScreenElement",
            "mozFullScreenEnabled",
            "mozfullscreenchange",
            "mozfullscreenerror"
          ],
          [
            "msRequestFullscreen",
            "msExitFullscreen",
            "msFullscreenElement",
            "msFullscreenEnabled",
            "MSFullscreenChange",
            "MSFullscreenError"
          ]
        ], u = 0, f = s.length, l = {}; u < f; u++)
          if (o = s[u], o && o[1] in r) {
            for (u = 0; u < o.length; u++)
              l[s[0][u]] = o[u];
            return l;
          }
        return !1;
      }(), a = {
        change: n.fullscreenchange,
        error: n.fullscreenerror
      }, i = {
        request: function(o, s) {
          return new Promise(function(u, f) {
            var l = function() {
              this.off("change", l), u();
            }.bind(this);
            this.on("change", l), o = o || r.documentElement;
            var c = o[n.requestFullscreen](s);
            c instanceof Promise && c.then(l).catch(f);
          }.bind(this));
        },
        exit: function() {
          return new Promise(function(o, s) {
            if (!this.isFullscreen) {
              o();
              return;
            }
            var u = function() {
              this.off("change", u), o();
            }.bind(this);
            this.on("change", u);
            var f = r[n.exitFullscreen]();
            f instanceof Promise && f.then(u).catch(s);
          }.bind(this));
        },
        toggle: function(o, s) {
          return this.isFullscreen ? this.exit() : this.request(o, s);
        },
        onchange: function(o) {
          this.on("change", o);
        },
        onerror: function(o) {
          this.on("error", o);
        },
        on: function(o, s) {
          var u = a[o];
          u && r.addEventListener(u, s, !1);
        },
        off: function(o, s) {
          var u = a[o];
          u && r.removeEventListener(u, s, !1);
        },
        raw: n
      };
      if (!n) {
        e ? t.exports = { isEnabled: !1 } : window.screenfull = { isEnabled: !1 };
        return;
      }
      Object.defineProperties(i, {
        isFullscreen: {
          get: function() {
            return !!r[n.fullscreenElement];
          }
        },
        element: {
          enumerable: !0,
          get: function() {
            return r[n.fullscreenElement];
          }
        },
        isEnabled: {
          enumerable: !0,
          get: function() {
            return !!r[n.fullscreenEnabled];
          }
        }
      }), e ? t.exports = i : window.screenfull = i;
    })();
  }(en)), en.exports;
}
var Bs = Gs();
const sr = /* @__PURE__ */ Os(Bs);
var ks = function(t, r, e) {
  e === void 0 && (e = {});
  var n = e.video, a = e.onClose, i = a === void 0 ? Es : a, o = ut.useState(r), s = o[0], u = o[1];
  return Is(function() {
    if (r && t.current) {
      var f = function() {
        n?.current && mn(n.current, "webkitendfullscreen", f), i();
      }, l = function() {
        if (sr.isEnabled) {
          var c = sr.isFullscreen;
          u(c), c || i();
        }
      };
      if (sr.isEnabled) {
        try {
          sr.request(t.current), u(!0);
        } catch (c) {
          i(c), u(!1);
        }
        sr.on("change", l);
      } else n && n.current && n.current.webkitEnterFullscreen ? (n.current.webkitEnterFullscreen(), wi(n.current, "webkitendfullscreen", f), u(!0)) : (i(), u(!1));
      return function() {
        if (u(!1), sr.isEnabled)
          try {
            sr.off("change", l), sr.exit();
          } catch {
          }
        else n && n.current && n.current.webkitExitFullscreen && (mn(n.current, "webkitendfullscreen", f), n.current.webkitExitFullscreen());
      };
    }
  }, [r, n, t]), s;
}, As = function(t) {
  return "touches" in t;
}, Aa = function(t) {
  As(t) && t.touches.length < 2 && t.preventDefault && t.preventDefault();
}, Fs = function(t, r) {
  var e = r === void 0 ? {} : r, n = e.isPreventDefault, a = n === void 0 ? !0 : n, i = e.delay, o = i === void 0 ? 300 : i, s = ut.useRef(), u = ut.useRef(), f = ut.useCallback(function(c) {
    a && c.target && (wi(c.target, "touchend", Aa, { passive: !1 }), u.current = c.target), s.current = setTimeout(function() {
      return t(c);
    }, o);
  }, [t, o, a]), l = ut.useCallback(function() {
    s.current && clearTimeout(s.current), a && u.current && mn(u.current, "touchend", Aa);
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
}, Fa = function(t) {
  zs(function() {
    t();
  });
};
function qn(t, r) {
  for (var e = t.length, n = 0; n < e; ++n)
    if (r(t[n], n))
      return !0;
  return !1;
}
function Ri(t, r) {
  for (var e = t.length, n = 0; n < e; ++n)
    if (r(t[n], n))
      return t[n];
  return null;
}
function Ti(t) {
  var r = t;
  if (typeof r > "u") {
    if (typeof navigator > "u" || !navigator)
      return "";
    r = navigator.userAgent || "";
  }
  return r.toLowerCase();
}
function Vn(t, r) {
  try {
    return new RegExp(t, "g").exec(r);
  } catch {
    return null;
  }
}
function Ns() {
  if (typeof navigator > "u" || !navigator || !navigator.userAgentData)
    return !1;
  var t = navigator.userAgentData, r = t.brands || t.uaList;
  return !!(r && r.length);
}
function Ws(t, r) {
  var e = Vn("(" + t + ")((?:\\/|\\s|:)([0-9|\\.|_]+))", r);
  return e ? e[3] : "";
}
function xn(t) {
  return t.replace(/_/g, ".");
}
function jr(t, r) {
  var e = null, n = "-1";
  return qn(t, function(a) {
    var i = Vn("(" + a.test + ")((?:\\/|\\s|:)([0-9|\\.|_]+))?", r);
    return !i || a.brand ? !1 : (e = a, n = i[3] || "-1", a.versionAlias ? n = a.versionAlias : a.versionTest && (n = Ws(a.versionTest.toLowerCase(), r) || n), n = xn(n), !0);
  }), {
    preset: e,
    version: n
  };
}
function he(t, r) {
  var e = {
    brand: "",
    version: "-1"
  };
  return qn(t, function(n) {
    var a = Oi(r, n);
    return a ? (e.brand = n.id, e.version = n.versionAlias || a.version, e.version !== "-1") : !1;
  }), e;
}
function Oi(t, r) {
  return Ri(t, function(e) {
    var n = e.brand;
    return Vn("" + r.test, n.toLowerCase());
  });
}
var Pi = [{
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
}], Ii = [{
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
}], Sn = [{
  test: "applewebkit",
  id: "webkit",
  versionTest: "applewebkit|safari"
}], zi = [{
  test: "(?=(iphone|ipad))(?!(.*version))",
  id: "webview"
}, {
  test: "(?=(android|iphone|ipad))(?=.*(naver|daum|; wv))",
  id: "webview"
}, {
  // test webview
  test: "webview",
  id: "webview"
}], Gi = [{
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
function Bi(t) {
  return !!jr(zi, t).preset;
}
function Ls(t) {
  var r = Ti(t), e = !!/mobi/g.exec(r), n = {
    name: "unknown",
    version: "-1",
    majorVersion: -1,
    webview: Bi(r),
    chromium: !1,
    chromiumVersion: "-1",
    webkit: !1,
    webkitVersion: "-1"
  }, a = {
    name: "unknown",
    version: "-1",
    majorVersion: -1
  }, i = jr(Pi, r), o = i.preset, s = i.version, u = jr(Gi, r), f = u.preset, l = u.version, c = jr(Ii, r);
  if (n.chromium = !!c.preset, n.chromiumVersion = c.version, !n.chromium) {
    var v = jr(Sn, r);
    n.webkit = !!v.preset, n.webkitVersion = v.version;
  }
  return f && (a.name = f.id, a.version = l, a.majorVersion = parseInt(l, 10)), o && (n.name = o.id, n.version = s, n.webview && a.name === "ios" && n.name !== "safari" && (n.webview = !1)), n.majorVersion = parseInt(n.version, 10), {
    browser: n,
    os: a,
    isMobile: e,
    isHints: !1
  };
}
function Hs(t) {
  var r = navigator.userAgentData, e = (r.uaList || r.brands).slice(), n = r.mobile || !1, a = e[0], i = (r.platform || navigator.platform).toLowerCase(), o = {
    name: a.brand,
    version: a.version,
    majorVersion: -1,
    webkit: !1,
    webkitVersion: "-1",
    chromium: !1,
    chromiumVersion: "-1",
    webview: !!he(zi, e).brand || Bi(Ti())
  }, s = {
    name: "unknown",
    version: "-1",
    majorVersion: -1
  };
  o.webkit = !o.chromium && qn(Sn, function(v) {
    return Oi(e, v);
  });
  var u = he(Ii, e);
  if (o.chromium = !!u.brand, o.chromiumVersion = u.version || "-1", !o.chromium) {
    var f = he(Sn, e);
    o.webkit = !!f.brand, o.webkitVersion = f.version || "-1";
  }
  var l = Ri(Gi, function(v) {
    return new RegExp("" + v.test, "g").exec(i);
  });
  s.name = l ? l.id : "";
  {
    var c = he(Pi, e);
    o.name = c.brand || o.name, o.version = c.brand && t ? t.uaFullVersion : c.version;
  }
  return o.webkit && (s.name = n ? "ios" : "mac"), s.name === "ios" && o.webview && (o.version = "-1"), s.version = xn(s.version), o.version = xn(o.version), s.majorVersion = parseInt(s.version, 10), o.majorVersion = parseInt(o.version, 10), {
    browser: o,
    os: s,
    isMobile: n,
    isHints: !0
  };
}
function Ys(t) {
  return Ns() ? Hs() : Ls(t);
}
function Xs(t) {
  for (var r = [], e = 1; e < arguments.length; e++)
    r[e - 1] = arguments[e];
  return r.map(function(n) {
    return n.split(" ").map(function(a) {
      return a ? "" + t + a : "";
    }).join(" ");
  }).join(" ");
}
function qs(t, r) {
  return r.replace(/([^}{]*){/gm, function(e, n) {
    return n.replace(/\.([^{,\s\d.]+)/g, "." + t + "$1") + "{";
  });
}
function Er(t, r) {
  return function(e) {
    e && (t[r] = e);
  };
}
function ki(t, r, e) {
  return function(n) {
    n && (t[r][e] = n);
  };
}
function Vs(t, r) {
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
var js = "function", Us = "object", $s = "string", Zs = "number", jn = "undefined", Ai = typeof window !== jn, Ks = typeof document !== jn && document, Js = [{
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
}], Dt = 1e-7, me = {
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
function Qs() {
  for (var t = 0, r = 0, e = arguments.length; r < e; r++) t += arguments[r].length;
  for (var n = Array(t), a = 0, r = 0; r < e; r++) for (var i = arguments[r], o = 0, s = i.length; o < s; o++, a++) n[a] = i[o];
  return n;
}
function Ie(t, r, e, n) {
  return (t * n + r * e) / (e + n);
}
function Un(t) {
  return typeof t === jn;
}
function Zt(t) {
  return t && typeof t === Us;
}
function wt(t) {
  return Array.isArray(t);
}
function ar(t) {
  return typeof t === $s;
}
function ne(t) {
  return typeof t === Zs;
}
function $n(t) {
  return typeof t === js;
}
function tu(t, r) {
  var e = t === "" || t == " ", n = r === "" || r == " ";
  return n && e || t === r;
}
function Fi(t, r, e, n, a) {
  var i = Zn(t, r, e);
  return i ? e : ru(t, r, e + 1, n, a);
}
function Zn(t, r, e) {
  if (!t.ignore)
    return null;
  var n = r.slice(Math.max(e - 3, 0), e + 3).join("");
  return new RegExp(t.ignore).exec(n);
}
function ru(t, r, e, n, a) {
  for (var i = function(f) {
    var l = r[f].trim();
    if (l === t.close && !Zn(t, r, f))
      return {
        value: f
      };
    var c = f, v = Lt(a, function(d) {
      var p = d.open;
      return p === l;
    });
    if (v && (c = Fi(v, r, f, n, a)), c === -1)
      return o = f, "break";
    f = c, o = f;
  }, o, s = e; s < n; ++s) {
    var u = i(s);
    if (s = o, typeof u == "object") return u.value;
    if (u === "break") break;
  }
  return -1;
}
function Kn(t, r) {
  var e = ar(r) ? {
    separator: r
  } : r, n = e.separator, a = n === void 0 ? "," : n, i = e.isSeparateFirst, o = e.isSeparateOnlyOpenClose, s = e.isSeparateOpenClose, u = s === void 0 ? o : s, f = e.openCloseCharacters, l = f === void 0 ? Js : f, c = l.map(function(y) {
    var C = y.open, _ = y.close;
    return C === _ ? C : C + "|" + _;
  }).join("|"), v = "(\\s*" + a + "\\s*|" + c + "|\\s+)", d = new RegExp(v, "g"), p = t.split(d).filter(function(y) {
    return y && y !== "undefined";
  }), g = p.length, h = [], m = [];
  function x() {
    return m.length ? (h.push(m.join("")), m = [], !0) : !1;
  }
  for (var S = function(y) {
    var C = p[y].trim(), _ = y, w = Lt(l, function(T) {
      var I = T.open;
      return I === C;
    }), P = Lt(l, function(T) {
      var I = T.close;
      return I === C;
    });
    if (w) {
      if (_ = Fi(w, p, y, g, l), _ !== -1 && u)
        return x() && i || (h.push(p.slice(y, _ + 1).join("")), y = _, i) ? (b = y, "break") : (b = y, "continue");
    } else if (P && !Zn(P, p, y)) {
      var O = Qs(l);
      return O.splice(l.indexOf(P), 1), {
        value: Kn(t, {
          separator: a,
          isSeparateFirst: i,
          isSeparateOnlyOpenClose: o,
          isSeparateOpenClose: u,
          openCloseCharacters: O
        })
      };
    } else if (tu(C, a) && !o)
      return x(), i ? (b = y, "break") : (b = y, "continue");
    _ === -1 && (_ = g - 1), m.push(p.slice(y, _ + 1).join("")), y = _, b = y;
  }, b, D = 0; D < g; ++D) {
    var E = S(D);
    if (D = b, typeof E == "object") return E.value;
    if (E === "break") break;
  }
  return m.length && h.push(m.join("")), h;
}
function vr(t) {
  return Kn(t, "");
}
function br(t) {
  return Kn(t, ",");
}
function Ni(t) {
  var r = /([^(]*)\(([\s\S]*)\)([\s\S]*)/g.exec(t);
  return !r || r.length < 4 ? {} : {
    prefix: r[1],
    value: r[2],
    suffix: r[3]
  };
}
function ue(t) {
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
function eu(t, r) {
  return t.replace(/([a-z])([A-Z])/g, function(e, n, a) {
    return "" + n + r + a.toLowerCase();
  });
}
function ae() {
  return Date.now ? Date.now() : (/* @__PURE__ */ new Date()).getTime();
}
function nr(t, r, e) {
  e === void 0 && (e = -1);
  for (var n = t.length, a = 0; a < n; ++a)
    if (r(t[a], a, t))
      return a;
  return e;
}
function Lt(t, r, e) {
  var n = nr(t, r);
  return n > -1 ? t[n] : e;
}
var Wi = /* @__PURE__ */ function() {
  var t = ae(), r = Ai && (window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.msRequestAnimationFrame);
  return r ? r.bind(window) : function(e) {
    var n = ae(), a = setTimeout(function() {
      e(n - t);
    }, 1e3 / 60);
    return a;
  };
}(), nu = /* @__PURE__ */ function() {
  var t = Ai && (window.cancelAnimationFrame || window.webkitCancelAnimationFrame || window.mozCancelAnimationFrame || window.msCancelAnimationFrame);
  return t ? t.bind(window) : function(r) {
    clearTimeout(r);
  };
}();
function Yr(t) {
  return Object.keys(t);
}
function dt(t, r) {
  var e = ue(t), n = e.value, a = e.unit;
  if (Zt(r)) {
    var i = r[a];
    if (i) {
      if ($n(i))
        return i(n);
      if (me[a])
        return me[a](n, i);
    }
  } else if (a === "%")
    return n * r / 100;
  return me[a] ? me[a](n) : n;
}
function bn(t, r, e) {
  return Math.max(r, Math.min(t, e));
}
function Na(t, r, e, n) {
  return n === void 0 && (n = t[0] / t[1]), [[tt(r[0], Dt), tt(r[0] / n, Dt)], [tt(r[1] * n, Dt), tt(r[1], Dt)]].filter(function(a) {
    return a.every(function(i, o) {
      var s = r[o], u = tt(s, Dt);
      return e ? i <= s || i <= u : i >= s || i >= u;
    });
  })[0] || t;
}
function Li(t, r, e, n) {
  if (!n)
    return t.map(function(d, p) {
      return bn(d, r[p], e[p]);
    });
  var a = t[0], i = t[1], o = n === !0 ? a / i : n, s = Na(t, r, !1, o), u = s[0], f = s[1], l = Na(t, e, !0, o), c = l[0], v = l[1];
  return a < u || i < f ? (a = u, i = f) : (a > c || i > v) && (a = c, i = v), [a, i];
}
function au(t) {
  for (var r = t.length, e = 0, n = r - 1; n >= 0; --n)
    e += t[n];
  return e;
}
function En(t) {
  for (var r = t.length, e = 0, n = r - 1; n >= 0; --n)
    e += t[n];
  return r ? e / r : 0;
}
function St(t, r) {
  var e = r[0] - t[0], n = r[1] - t[1], a = Math.atan2(n, e);
  return a >= 0 ? a : a + Math.PI * 2;
}
function iu(t) {
  return [0, 1].map(function(r) {
    return En(t.map(function(e) {
      return e[r];
    }));
  });
}
function Wa(t) {
  var r = iu(t), e = St(r, t[0]), n = St(r, t[1]);
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
function La(t, r) {
  return t.forEach(function(e, n) {
    t[n] = tt(t[n], r);
  }), t;
}
function ou(t) {
  for (var r = [], e = 0; e < t; ++e)
    r.push(e);
  return r;
}
function su(t) {
  return t.reduce(function(r, e) {
    return r.concat(e);
  }, []);
}
function Ct(t, r) {
  return t.classList ? t.classList.contains(r) : !!t.className.match(new RegExp("(\\s|^)" + r + "(\\s|$)"));
}
function Hi(t, r) {
  t.classList ? t.classList.add(r) : t.className += " " + r;
}
function Yi(t, r) {
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
function Jn(t) {
  return t?.ownerDocument || Ks;
}
function Qn(t) {
  return Jn(t).documentElement;
}
function gr(t) {
  return Jn(t).body;
}
function cr(t) {
  var r;
  return ((r = t?.ownerDocument) === null || r === void 0 ? void 0 : r.defaultView) || window;
}
function Xi(t) {
  return t && "postMessage" in t && "blur" in t && "self" in t;
}
function ta(t) {
  return Zt(t) && t.nodeName && t.nodeType && "ownerDocument" in t;
}
function uu(t, r, e, n, a, i) {
  for (var o = 0; o < a; ++o) {
    var s = e + o * a, u = n + o * a;
    t[s] += t[u] * i, r[s] += r[u] * i;
  }
}
function fu(t, r, e, n, a) {
  for (var i = 0; i < a; ++i) {
    var o = e + i * a, s = n + i * a, u = t[o], f = r[o];
    t[o] = t[s], t[s] = u, r[o] = r[s], r[s] = f;
  }
}
function lu(t, r, e, n, a) {
  for (var i = 0; i < n; ++i) {
    var o = e + i * n;
    t[o] /= a, r[o] /= a;
  }
}
function qi(t, r, e) {
  for (var n = t.slice(), a = 0; a < e; ++a)
    n[a * e + r - 1] = 0, n[(r - 1) * e + a] = 0;
  return n[(r - 1) * (e + 1)] = 1, n;
}
function Qt(t, r) {
  r === void 0 && (r = Math.sqrt(t.length));
  for (var e = t.slice(), n = mt(r), a = 0; a < r; ++a) {
    var i = r * a + a;
    if (!tt(e[i], Dt)) {
      for (var o = a + 1; o < r; ++o)
        if (e[r * a + o]) {
          fu(e, n, a, o, r);
          break;
        }
    }
    if (!tt(e[i], Dt))
      return [];
    lu(e, n, a, r, e[i]);
    for (var o = 0; o < r; ++o) {
      var s = o, u = o + a * r, f = e[u];
      !tt(f, Dt) || a === o || uu(e, n, s, a, r, -f);
    }
  }
  return n;
}
function cu(t, r) {
  r === void 0 && (r = Math.sqrt(t.length));
  for (var e = [], n = 0; n < r; ++n)
    for (var a = 0; a < r; ++a)
      e[a * r + n] = t[r * n + a];
  return e;
}
function Vi(t, r) {
  r === void 0 && (r = Math.sqrt(t.length));
  for (var e = [], n = t[r * r - 1], a = 0; a < r - 1; ++a)
    e[a] = t[r * (r - 1) + a] / n;
  return e[r - 1] = 0, e;
}
function vu(t, r) {
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
function ze(t) {
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
function ft(t, r) {
  for (var e = Math.min(t.length, r.length), n = t.slice(), a = 0; a < e; ++a)
    n[a] = n[a] + r[a];
  return n;
}
function Q(t, r) {
  for (var e = Math.min(t.length, r.length), n = t.slice(), a = 0; a < e; ++a)
    n[a] = n[a] - r[a];
  return n;
}
function du(t, r) {
  return r === void 0 && (r = t.length === 6), r ? [t[0], t[1], 0, t[2], t[3], 0, t[4], t[5], 1] : t;
}
function ji(t, r) {
  return r === void 0 && (r = t.length === 9), r ? [t[0], t[1], t[3], t[4], t[6], t[7]] : t;
}
function Pt(t, r, e) {
  e === void 0 && (e = r.length);
  var n = pt(t, r, e), a = n[e - 1];
  return n.map(function(i) {
    return i / a;
  });
}
function pu(t, r) {
  return pt(t, [1, 0, 0, 0, 0, Math.cos(r), Math.sin(r), 0, 0, -Math.sin(r), Math.cos(r), 0, 0, 0, 0, 1], 4);
}
function gu(t, r) {
  return pt(t, [Math.cos(r), 0, -Math.sin(r), 0, 0, 1, 0, 0, Math.sin(r), 0, Math.cos(r), 0, 0, 0, 0, 1], 4);
}
function hu(t, r) {
  return pt(t, le(r, 4));
}
function xe(t, r) {
  var e = r[0], n = e === void 0 ? 1 : e, a = r[1], i = a === void 0 ? 1 : a, o = r[2], s = o === void 0 ? 1 : o;
  return pt(t, [n, 0, 0, 0, 0, i, 0, 0, 0, 0, s, 0, 0, 0, 0, 1], 4);
}
function fe(t, r) {
  return Pt(le(r, 3), Dr(t, 3));
}
function nn(t, r) {
  var e = r[0], n = e === void 0 ? 0 : e, a = r[1], i = a === void 0 ? 0 : a, o = r[2], s = o === void 0 ? 0 : o;
  return pt(t, [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, n, i, s, 1], 4);
}
function Ha(t, r) {
  return pt(t, r, 4);
}
function le(t, r) {
  var e = Math.cos(t), n = Math.sin(t), a = mt(r);
  return a[0] = e, a[1] = n, a[r] = -n, a[r + 1] = e, a;
}
function mt(t) {
  for (var r = t * t, e = [], n = 0; n < r; ++n)
    e[n] = n % (t + 1) ? 0 : 1;
  return e;
}
function ra(t, r) {
  for (var e = mt(r), n = Math.min(t.length, r - 1), a = 0; a < n; ++a)
    e[(r + 1) * a] = t[a];
  return e;
}
function yr(t, r) {
  for (var e = mt(r), n = Math.min(t.length, r - 1), a = 0; a < n; ++a)
    e[r * (r - 1) + a] = t[a];
  return e;
}
function ea(t, r, e, n, a, i, o, s) {
  var u = t[0], f = t[1], l = r[0], c = r[1], v = e[0], d = e[1], p = n[0], g = n[1], h = a[0], m = a[1], x = i[0], S = i[1], b = o[0], D = o[1], E = s[0], y = s[1], C = [u, 0, l, 0, v, 0, p, 0, f, 0, c, 0, d, 0, g, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, u, 0, l, 0, v, 0, p, 0, f, 0, c, 0, d, 0, g, 0, 1, 0, 1, 0, 1, 0, 1, -h * u, -m * u, -x * l, -S * l, -b * v, -D * v, -E * p, -y * p, -h * f, -m * f, -x * c, -S * c, -b * d, -D * d, -E * g, -y * g], _ = Qt(C, 8);
  if (!_.length)
    return [];
  var w = pt(_, [h, m, x, S, b, D, E, y], 8);
  return w[8] = 1, Kt(cu(w), 3, 4);
}
var Zr = function() {
  return Zr = Object.assign || function(r) {
    for (var e, n = 1, a = arguments.length; n < a; n++) {
      e = arguments[n];
      for (var i in e) Object.prototype.hasOwnProperty.call(e, i) && (r[i] = e[i]);
    }
    return r;
  }, Zr.apply(this, arguments);
};
function mu() {
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
function ie(t, r) {
  return r === void 0 && (r = 0), Tr(Ar(t, r));
}
function xu(t, r) {
  var e = Pt(t, [r[0], r[1] || 0, r[2] || 0, 1], 4), n = e[3] || 1;
  return [
    e[0] / n,
    e[1] / n,
    e[2] / n
  ];
}
function Tr(t) {
  var r = mu();
  return t.forEach(function(e) {
    var n = e.matrixFunction, a = e.functionValue;
    n && (r = n(r, a));
  }), r;
}
function Ar(t, r) {
  r === void 0 && (r = 0);
  var e = wt(t) ? t : vr(t);
  return e.map(function(n) {
    var a = Ni(n), i = a.prefix, o = a.value, s = null, u = i, f = "";
    if (i === "translate" || i === "translateX" || i === "translate3d") {
      var l = Zt(r) ? Zr(Zr({}, r), { "o%": r["%"] }) : {
        "%": r,
        "o%": r
      }, c = br(o).map(function(T, I) {
        return I === 0 && "x%" in l ? l["%"] = r["x%"] : I === 1 && "y%" in l ? l["%"] = r["y%"] : l["%"] = r["o%"], dt(T, l);
      }), v = c[0], d = c[1], p = d === void 0 ? 0 : d, g = c[2], h = g === void 0 ? 0 : g;
      s = nn, f = [v, p, h];
    } else if (i === "translateY") {
      var m = Zt(r) ? Zr({ "%": r["y%"] }, r) : {
        "%": r
      }, p = dt(o, m);
      s = nn, f = [0, p, 0];
    } else if (i === "translateZ") {
      var h = parseFloat(o);
      s = nn, f = [0, 0, h];
    } else if (i === "scale" || i === "scale3d") {
      var x = br(o).map(function(T) {
        return parseFloat(T);
      }), S = x[0], b = x[1], D = b === void 0 ? S : b, E = x[2], y = E === void 0 ? 1 : E;
      s = xe, f = [S, D, y];
    } else if (i === "scaleX") {
      var S = parseFloat(o);
      s = xe, f = [S, 1, 1];
    } else if (i === "scaleY") {
      var D = parseFloat(o);
      s = xe, f = [1, D, 1];
    } else if (i === "scaleZ") {
      var y = parseFloat(o);
      s = xe, f = [1, 1, y];
    } else if (i === "rotate" || i === "rotateZ" || i === "rotateX" || i === "rotateY") {
      var C = ue(o), _ = C.unit, w = C.value, P = _ === "rad" ? w : w * Math.PI / 180;
      i === "rotate" || i === "rotateZ" ? (u = "rotateZ", s = hu) : i === "rotateX" ? s = pu : i === "rotateY" && (s = gu), f = P;
    } else if (i === "matrix3d")
      s = Ha, f = br(o).map(function(T) {
        return parseFloat(T);
      });
    else if (i === "matrix") {
      var O = br(o).map(function(T) {
        return parseFloat(T);
      });
      s = Ha, f = [
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
var Su = /* @__PURE__ */ function() {
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
}(), bu = /* @__PURE__ */ function() {
  function t() {
    this.object = {};
  }
  var r = t.prototype;
  return r.get = function(e) {
    return this.object[e];
  }, r.set = function(e, n) {
    this.object[e] = n;
  }, t;
}(), Eu = typeof Map == "function", Du = /* @__PURE__ */ function() {
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
function yu(t, r) {
  var e = [], n = [];
  return t.forEach(function(a) {
    var i = a[0], o = a[1], s = new Du();
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
var Cu = /* @__PURE__ */ function() {
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
    var e = yu(this.changedBeforeAdded, this.fixed), n = this.changed, a = [];
    this.cacheOrdered = e.filter(function(i, o) {
      var s = i[0], u = i[1], f = n[o], l = f[0], c = f[1];
      if (s !== u)
        return a.push([l, c]), !0;
    }), this.cachePureChanged = a;
  }, t;
}();
function na(t, r, e) {
  var n = Eu ? Map : e ? bu : Su, a = e || function(x) {
    return x;
  }, i = [], o = [], s = [], u = t.map(a), f = r.map(a), l = new n(), c = new n(), v = [], d = [], p = {}, g = [], h = 0, m = 0;
  return u.forEach(function(x, S) {
    l.set(x, S);
  }), f.forEach(function(x, S) {
    c.set(x, S);
  }), u.forEach(function(x, S) {
    var b = c.get(x);
    typeof b > "u" ? (++m, o.push(S)) : p[b] = m;
  }), f.forEach(function(x, S) {
    var b = l.get(x);
    typeof b > "u" ? (i.push(S), ++h) : (s.push([b, S]), m = p[S] || 0, v.push([b - m, S - h]), d.push(S === b), b !== S && g.push([b, S]));
  }), o.reverse(), new Cu(t, r, i, o, g, s, v, d);
}
var _u = /* @__PURE__ */ function() {
  function t(e, n) {
    e === void 0 && (e = []), this.findKeyCallback = n, this.list = [].slice.call(e);
  }
  var r = t.prototype;
  return r.update = function(e) {
    var n = [].slice.call(e), a = na(this.list, n, this.findKeyCallback);
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
var Dn = function(t, r) {
  return Dn = Object.setPrototypeOf || {
    __proto__: []
  } instanceof Array && function(e, n) {
    e.__proto__ = n;
  } || function(e, n) {
    for (var a in n) n.hasOwnProperty(a) && (e[a] = n[a]);
  }, Dn(t, r);
};
function Mu(t, r) {
  Dn(t, r);
  function e() {
    this.constructor = t;
  }
  t.prototype = r === null ? Object.create(r) : (e.prototype = r.prototype, new e());
}
var Ui = typeof Map == "function" ? void 0 : /* @__PURE__ */ function() {
  var t = 0;
  return function(r) {
    return r.__DIFF_KEY__ || (r.__DIFF_KEY__ = ++t);
  };
}(), $i = /* @__PURE__ */ function(t) {
  Mu(r, t);
  function r(e) {
    return e === void 0 && (e = []), t.call(this, e, Ui) || this;
  }
  return r;
}(_u);
function wu(t, r) {
  return na(t, r, Ui);
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
var yn = function() {
  return yn = Object.assign || function(r) {
    for (var e, n = 1, a = arguments.length; n < a; n++) {
      e = arguments[n];
      for (var i in e) Object.prototype.hasOwnProperty.call(e, i) && (r[i] = e[i]);
    }
    return r;
  }, yn.apply(this, arguments);
};
function Ru() {
  for (var t = 0, r = 0, e = arguments.length; r < e; r++) t += arguments[r].length;
  for (var n = Array(t), a = 0, r = 0; r < e; r++) for (var i = arguments[r], o = 0, s = i.length; o < s; o++, a++) n[a] = i[o];
  return n;
}
var aa = /* @__PURE__ */ function() {
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
    }, n.currentTarget = this, Ru(i).forEach(function(s) {
      s.listener(n), s.once && a.off(e, s.listener);
    }), !o;
  }, r.trigger = function(e, n) {
    return n === void 0 && (n = {}), this.emit(e, n);
  }, r._addEvent = function(e, n, a) {
    var i = this._events;
    i[e] = i[e] || [];
    var o = i[e];
    o.push(yn({
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
var Cn = function(t, r) {
  return Cn = Object.setPrototypeOf || {
    __proto__: []
  } instanceof Array && function(e, n) {
    e.__proto__ = n;
  } || function(e, n) {
    for (var a in n) n.hasOwnProperty(a) && (e[a] = n[a]);
  }, Cn(t, r);
};
function Tu(t, r) {
  Cn(t, r);
  function e() {
    this.constructor = t;
  }
  t.prototype = r === null ? Object.create(r) : (e.prototype = r.prototype, new e());
}
var Or = function() {
  return Or = Object.assign || function(r) {
    for (var e, n = 1, a = arguments.length; n < a; n++) {
      e = arguments[n];
      for (var i in e) Object.prototype.hasOwnProperty.call(e, i) && (r[i] = e[i]);
    }
    return r;
  }, Or.apply(this, arguments);
};
function Ou(t) {
  var r = t.container;
  return r === document.body ? [r.scrollLeft || document.documentElement.scrollLeft, r.scrollTop || document.documentElement.scrollTop] : [r.scrollLeft, r.scrollTop];
}
function Ya(t, r) {
  return t.addEventListener("scroll", r), function() {
    t.removeEventListener("scroll", r);
  };
}
function Se(t) {
  if (t) {
    if (ar(t))
      return document.querySelector(t);
  } else return null;
  if ($n(t))
    return t();
  if (t instanceof Element)
    return t;
  if ("current" in t)
    return t.current;
  if ("value" in t)
    return t.value;
}
var Pu = /* @__PURE__ */ function(t) {
  Tu(r, t);
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
    var i = Se(a.container);
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
      return l.top > o - u ? (c[1] > l.top || o < c[1]) && (v[1] = -1) : l.top + l.height < o + u && (c[1] < l.top + l.height || o > c[1]) && (v[1] = 1), l.left > i - u ? (c[0] > l.left || i < c[0]) && (v[0] = -1) : l.left + l.width < i + u && (c[0] < l.left + l.width || i > c[0]) && (v[0] = 1), !v[0] && !v[1] ? !1 : this._continueDrag(Or(Or({}, a), {
        direction: v,
        inputEvent: n,
        isDrag: !0
      }));
    }
  }, e.checkScroll = function(n) {
    var a = this;
    if (this._isWait)
      return !1;
    var i = n.prevScrollPos, o = i === void 0 ? this._prevScrollPos : i, s = n.direction, u = n.throttleTime, f = u === void 0 ? 0 : u, l = n.inputEvent, c = n.isDrag, v = this._getScrollPosition(s || [0, 0], n), d = v[0] - o[0], p = v[1] - o[1], g = s || [d ? Math.abs(d) / d : 0, p ? Math.abs(p) / p : 0];
    return this._prevScrollPos = v, this._lock = !1, !d && !p ? !1 : (this.emit("move", {
      offsetX: g[0] ? d : 0,
      offsetY: g[1] ? p : 0,
      inputEvent: l
    }), f && c && (clearTimeout(this._timer), this._timer = window.setTimeout(function() {
      a._continueDrag(n);
    }, f)), !0);
  }, e.dragEnd = function() {
    this._flag = !1, this._lock = !1, clearTimeout(this._timer), this._unregisterScrollEvent();
  }, e._getScrollPosition = function(n, a) {
    var i = a.container, o = a.getScrollPosition, s = o === void 0 ? Ou : o;
    return s({
      container: Se(i),
      direction: n
    });
  }, e._continueDrag = function(n) {
    var a = this, i, o = n.container, s = n.direction, u = n.throttleTime, f = n.useScroll, l = n.isDrag, c = n.inputEvent;
    if (!(!this._flag || l && this._isWait)) {
      var v = ae(), d = Math.max(u + this._prevTime - v, 0);
      if (d > 0)
        return clearTimeout(this._timer), this._timer = window.setTimeout(function() {
          a._continueDrag(n);
        }, d), !1;
      this._prevTime = v;
      var p = this._getScrollPosition(s, n);
      this._prevScrollPos = p, l && (this._isWait = !0), f || (this._lock = !0);
      var g = {
        container: Se(o),
        direction: s,
        inputEvent: c
      };
      return (i = n.requestScroll) === null || i === void 0 || i.call(n, g), this.emit("scroll", g), this._isWait = !1, f || this.checkScroll(Or(Or({}, n), {
        prevScrollPos: p,
        direction: s,
        inputEvent: c
      }));
    }
  }, e._registerScrollEvent = function(n) {
    this._unregisterScrollEvent();
    var a = n.checkScrollEvent;
    if (a) {
      var i = a === !0 ? Ya : a, o = Se(n.container);
      a === !0 && (o === document.body || o === document.documentElement) ? this._unregister = Ya(window, this._onScroll) : this._unregister = i(o, this._onScroll);
    }
  }, e._unregisterScrollEvent = function() {
    var n;
    (n = this._unregister) === null || n === void 0 || n.call(this), this._unregister = null;
  }, r;
}(aa);
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
function Iu() {
  for (var t = 0, r = 0, e = arguments.length; r < e; r++) t += arguments[r].length;
  for (var n = Array(t), a = 0, r = 0; r < e; r++) for (var i = arguments[r], o = 0, s = i.length; o < s; o++, a++) n[a] = i[o];
  return n;
}
function Ft(t) {
  return tt(t, Dt);
}
function zu(t, r) {
  return t.every(function(e, n) {
    return Ft(e - r[n]) === 0;
  });
}
function Gu(t, r) {
  return !Ft(t[0] - r[0]) && !Ft(t[1] - r[1]);
}
function Zi(t) {
  return t.length < 3 ? 0 : Math.abs(au(t.map(function(r, e) {
    var n = t[e + 1] || t[0];
    return r[0] * n[1] - n[0] * r[1];
  }))) / 2;
}
function Xa(t, r) {
  var e = r.width, n = r.height, a = r.left, i = r.top, o = Cr(t), s = o.minX, u = o.minY, f = o.maxX, l = o.maxY, c = e / (f - s), v = n / (l - u);
  return t.map(function(d) {
    return [a + (d[0] - s) * c, i + (d[1] - u) * v];
  });
}
function Cr(t) {
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
function _n(t, r, e) {
  var n = t[0], a = t[1], i = Cr(r), o = i.minX, s = i.maxX, u = [[o, a], [s, a]], f = Ge(u[0], u[1]), l = Mn(r), c = [];
  if (l.forEach(function(p) {
    var g = Ge(p[0], p[1]), h = p[0];
    if (zu(f, g))
      c.push({
        pos: t,
        line: p,
        type: "line"
      });
    else {
      var m = Ki(ia(f, g), [u, p]);
      m.forEach(function(x) {
        p.some(function(S) {
          return Gu(S, x);
        }) ? c.push({
          pos: x,
          line: p,
          type: "point"
        }) : Ft(h[1] - a) !== 0 && c.push({
          pos: x,
          line: p,
          type: "intersection"
        });
      });
    }
  }), Lt(c, function(p) {
    return p[0] === n;
  }))
    return !0;
  var v = 0, d = {};
  return c.forEach(function(p) {
    var g = p.pos, h = p.type, m = p.line;
    if (!(g[0] > n))
      if (h === "intersection")
        ++v;
      else {
        if (h === "line")
          return;
        if (h === "point") {
          var x = Lt(m, function(D) {
            return D[1] !== a;
          }), S = d[g[0]], b = x[1] > a ? 1 : -1;
          S ? S !== b && ++v : d[g[0]] = b;
        }
      }
  }), v % 2 === 1;
}
function Ge(t, r) {
  var e = t[0], n = t[1], a = r[0], i = r[1], o = a - e, s = i - n;
  Math.abs(o) < Dt && (o = 0), Math.abs(s) < Dt && (s = 0);
  var u = 0, f = 0, l = 0;
  return o ? s ? (u = -s / o, f = 1, l = -u * e - n) : (f = 1, l = -n) : s && (u = -1, l = e), [u, f, l];
}
function ia(t, r) {
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
function Ki(t, r) {
  var e = r.map(function(c) {
    return [0, 1].map(function(v) {
      return [Math.min(c[0][v], c[1][v]), Math.max(c[0][v], c[1][v])];
    });
  }), n = [];
  if (t.length === 2) {
    var a = t[0], i = a[0], o = a[1];
    if (Ft(i - t[1][0])) {
      if (!Ft(o - t[1][1])) {
        var f = Math.max.apply(Math, e.map(function(c) {
          return c[0][0];
        })), l = Math.min.apply(Math, e.map(function(c) {
          return c[0][1];
        }));
        if (Ft(f - l) > 0)
          return [];
        n = [[f, o], [l, o]];
      }
    } else {
      var s = Math.max.apply(Math, e.map(function(c) {
        return c[1][0];
      })), u = Math.min.apply(Math, e.map(function(c) {
        return c[1][1];
      }));
      if (Ft(s - u) > 0)
        return [];
      n = [[i, s], [i, u]];
    }
  }
  return n.length || (n = t.filter(function(c) {
    var v = c[0], d = c[1];
    return e.every(function(p) {
      return 0 <= Ft(v - p[0][0]) && 0 <= Ft(p[0][1] - v) && 0 <= Ft(d - p[1][0]) && 0 <= Ft(p[1][1] - d);
    });
  })), n.map(function(c) {
    return [Ft(c[0]), Ft(c[1])];
  });
}
function Mn(t) {
  return Iu(t.slice(1), [t[0]]).map(function(r, e) {
    return [t[e], r];
  });
}
function Bu(t, r) {
  var e = t.slice(), n = r.slice();
  Wa(e) === -1 && e.reverse(), Wa(n) === -1 && n.reverse();
  var a = Mn(e), i = Mn(n), o = a.map(function(l) {
    return Ge(l[0], l[1]);
  }), s = i.map(function(l) {
    return Ge(l[0], l[1]);
  }), u = [];
  o.forEach(function(l, c) {
    var v = a[c], d = [];
    s.forEach(function(p, g) {
      var h = ia(l, p), m = Ki(h, [v, i[g]]);
      d.push.apply(d, m.map(function(x) {
        return {
          index1: c,
          index2: g,
          pos: x,
          type: "intersection"
        };
      }));
    }), d.sort(function(p, g) {
      return rr(v[0], p.pos) - rr(v[0], g.pos);
    }), u.push.apply(u, d), _n(v[1], n) && u.push({
      index1: c,
      index2: -1,
      pos: v[1],
      type: "inside"
    });
  }), i.forEach(function(l, c) {
    if (_n(l[1], e)) {
      var v = !1, d = nr(u, function(p) {
        var g = p.index2;
        return g === c ? (v = !0, !1) : !!v;
      });
      d === -1 && (v = !1, d = nr(u, function(p) {
        var g = p.index1, h = p.index2;
        return g === -1 && h + 1 === c ? (v = !0, !1) : !!v;
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
function ku(t, r) {
  var e = Bu(t, r);
  return e.map(function(n) {
    var a = n.pos;
    return a;
  });
}
function Au(t, r) {
  var e = ku(t, r);
  return Zi(e);
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
var wn = function(t, r) {
  return wn = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(e, n) {
    e.__proto__ = n;
  } || function(e, n) {
    for (var a in n) n.hasOwnProperty(a) && (e[a] = n[a]);
  }, wn(t, r);
};
function Fu(t, r) {
  wn(t, r);
  function e() {
    this.constructor = t;
  }
  t.prototype = r === null ? Object.create(r) : (e.prototype = r.prototype, new e());
}
var Et = function() {
  return Et = Object.assign || function(r) {
    for (var e, n = 1, a = arguments.length; n < a; n++) {
      e = arguments[n];
      for (var i in e) Object.prototype.hasOwnProperty.call(e, i) && (r[i] = e[i]);
    }
    return r;
  }, Et.apply(this, arguments);
};
function Nu(t, r) {
  var e = r[0] - t[0], n = r[1] - t[1], a = Math.atan2(n, e);
  return a >= 0 ? a : a + Math.PI * 2;
}
function an(t) {
  return Nu([
    t[0].clientX,
    t[0].clientY
  ], [
    t[1].clientX,
    t[1].clientY
  ]) / Math.PI * 180;
}
function Wu(t) {
  return t.touches && t.touches.length >= 2;
}
function be(t) {
  return t ? t.touches ? Hu(t.touches) : [Ji(t)] : [];
}
function Lu(t) {
  return t && (t.type.indexOf("mouse") > -1 || "button" in t);
}
function qa(t, r, e) {
  var n = e.length, a = Kr(t, n), i = a.clientX, o = a.clientY, s = a.originalClientX, u = a.originalClientY, f = Kr(r, n), l = f.clientX, c = f.clientY, v = Kr(e, n), d = v.clientX, p = v.clientY, g = i - l, h = o - c, m = i - d, x = o - p;
  return {
    clientX: s,
    clientY: u,
    deltaX: g,
    deltaY: h,
    distX: m,
    distY: x
  };
}
function on(t) {
  return Math.sqrt(Math.pow(t[0].clientX - t[1].clientX, 2) + Math.pow(t[0].clientY - t[1].clientY, 2));
}
function Hu(t) {
  for (var r = Math.min(t.length, 2), e = [], n = 0; n < r; ++n)
    e.push(Ji(t[n]));
  return e;
}
function Ji(t) {
  return {
    clientX: t.clientX,
    clientY: t.clientY
  };
}
function Kr(t, r) {
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
var sn = /* @__PURE__ */ function() {
  function t(r) {
    this.prevClients = [], this.startClients = [], this.movement = 0, this.length = 0, this.startClients = r, this.prevClients = r, this.length = r.length;
  }
  return t.prototype.getAngle = function(r) {
    return r === void 0 && (r = this.prevClients), an(r);
  }, t.prototype.getRotation = function(r) {
    return r === void 0 && (r = this.prevClients), an(r) - an(this.startClients);
  }, t.prototype.getPosition = function(r, e) {
    r === void 0 && (r = this.prevClients);
    var n = qa(r || this.prevClients, this.prevClients, this.startClients), a = n.deltaX, i = n.deltaY;
    return this.movement += Math.sqrt(a * a + i * i), this.prevClients = r, n;
  }, t.prototype.getPositions = function(r) {
    r === void 0 && (r = this.prevClients);
    for (var e = this.prevClients, n = this.startClients, a = Math.min(this.length, e.length), i = [], o = 0; o < a; ++o)
      i[o] = qa([r[o]], [e[o]], [n[o]]);
    return i;
  }, t.prototype.getMovement = function(r) {
    var e = this.movement;
    if (!r)
      return e;
    var n = Kr(r, this.length), a = Kr(this.prevClients, this.length), i = n.clientX - a.clientX, o = n.clientY - a.clientY;
    return Math.sqrt(i * i + o * o) + e;
  }, t.prototype.getDistance = function(r) {
    return r === void 0 && (r = this.prevClients), on(r);
  }, t.prototype.getScale = function(r) {
    return r === void 0 && (r = this.prevClients), on(r) / on(this.startClients);
  }, t.prototype.move = function(r, e) {
    this.startClients.forEach(function(n) {
      n.clientX -= r, n.clientY -= e;
    }), this.prevClients.forEach(function(n) {
      n.clientX -= r, n.clientY -= e;
    });
  }, t;
}(), Va = ["textarea", "input"], Yu = /* @__PURE__ */ function(t) {
  Fu(r, t);
  function r(e, n) {
    n === void 0 && (n = {});
    var a = t.call(this) || this;
    a.options = {}, a.flag = !1, a.pinchFlag = !1, a.data = {}, a.isDrag = !1, a.isPinch = !1, a.clientStores = [], a.targets = [], a.prevTime = 0, a.doubleFlag = !1, a._useMouse = !1, a._useTouch = !1, a._useDrag = !1, a._dragFlag = !1, a._isTrusted = !1, a._isMouseEvent = !1, a._isSecondaryButton = !1, a._preventMouseEvent = !1, a._prevInputEvent = null, a._isDragAPI = !1, a._isIdle = !0, a._preventMouseEventId = 0, a._window = window, a.onDragStart = function(v, d) {
      if (d === void 0 && (d = !0), !(!a.flag && v.cancelable === !1)) {
        var p = v.type.indexOf("drag") >= -1;
        if (!(a.flag && p)) {
          a._isDragAPI = !0;
          var g = a.options, h = g.container, m = g.pinchOutside, x = g.preventWheelClick, S = g.preventRightClick, b = g.preventDefault, D = g.checkInput, E = g.dragFocusedInput, y = g.preventClickEventOnDragStart, C = g.preventClickEventOnDrag, _ = g.preventClickEventByCondition, w = a._useTouch, P = !a.flag;
          if (a._isSecondaryButton = v.which === 3 || v.button === 2, x && (v.which === 2 || v.button === 1) || S && (v.which === 3 || v.button === 2))
            return a.stop(), !1;
          if (P) {
            var O = a._window.document.activeElement, T = v.target;
            if (T) {
              var I = T.tagName.toLowerCase(), z = Va.indexOf(I) > -1, A = T.isContentEditable;
              if (z || A) {
                if (D || !E && O === T)
                  return !1;
                if (O && (O === T || A && O.isContentEditable && O.contains(T)))
                  if (E)
                    T.blur();
                  else
                    return !1;
              } else if ((b || v.type === "touchstart") && O) {
                var F = O.tagName.toLowerCase();
                (O.isContentEditable || Va.indexOf(F) > -1) && O.blur();
              }
              (y || C || _) && Ot(a._window, "click", a._onClick, !0);
            }
            a.clientStores = [new sn(be(v))], a._isIdle = !1, a.flag = !0, a.isDrag = !1, a._isTrusted = d, a._dragFlag = !0, a._prevInputEvent = v, a.data = {}, a.doubleFlag = ae() - a.prevTime < 200, a._isMouseEvent = Lu(v), !a._isMouseEvent && a._preventMouseEvent && a._allowMouseEvent();
            var k = a._preventMouseEvent || a.emit("dragStart", Et(Et({ data: a.data, datas: a.data, inputEvent: v, isMouseEvent: a._isMouseEvent, isSecondaryButton: a._isSecondaryButton, isTrusted: d, isDouble: a.doubleFlag }, a.getCurrentStore().getPosition()), { preventDefault: function() {
              v.preventDefault();
            }, preventDrag: function() {
              a._dragFlag = !1;
            } }));
            k === !1 && a.stop(), a._isMouseEvent && a.flag && b && v.preventDefault();
          }
          if (!a.flag)
            return !1;
          var W = 0;
          if (P ? (a._attchDragEvent(), w && m && (W = setTimeout(function() {
            Ot(h, "touchstart", a.onDragStart, {
              passive: !1
            });
          }))) : w && m && Rt(h, "touchstart", a.onDragStart), a.flag && Wu(v)) {
            if (clearTimeout(W), P && v.touches.length !== v.changedTouches.length)
              return;
            a.pinchFlag || a.onPinchStart(v);
          }
        }
      }
    }, a.onDrag = function(v, d) {
      if (a.flag) {
        var p = a.options.preventDefault;
        !a._isMouseEvent && p && v.preventDefault(), a._prevInputEvent = v;
        var g = be(v), h = a.moveClients(g, v, !1);
        if (a._dragFlag) {
          if (a.pinchFlag || h.deltaX || h.deltaY) {
            var m = a._preventMouseEvent || a.emit("drag", Et(Et({}, h), { isScroll: !!d, inputEvent: v }));
            if (m === !1) {
              a.stop();
              return;
            }
          }
          a.pinchFlag && a.onPinch(v, g);
        }
        a.getCurrentStore().getPosition(g, !0);
      }
    }, a.onDragEnd = function(v) {
      if (a.flag) {
        var d = a.options, p = d.pinchOutside, g = d.container, h = d.preventClickEventOnDrag, m = d.preventClickEventOnDragStart, x = d.preventClickEventByCondition, S = a.isDrag;
        (h || m || x) && requestAnimationFrame(function() {
          a._allowClickEvent();
        }), !x && !m && h && !S && a._allowClickEvent(), a._useTouch && p && Rt(g, "touchstart", a.onDragStart), a.pinchFlag && a.onPinchEnd(v);
        var b = v?.touches ? be(v) : [], D = b.length;
        D === 0 || !a.options.keepDragging ? a.flag = !1 : a._addStore(new sn(b));
        var E = a._getPosition(), y = ae(), C = !S && a.doubleFlag;
        a._prevInputEvent = null, a.prevTime = S || C ? 0 : y, a.flag || (a._dettachDragEvent(), a._preventMouseEvent || a.emit("dragEnd", Et({ data: a.data, datas: a.data, isDouble: C, isDrag: S, isClick: !S, isMouseEvent: a._isMouseEvent, isSecondaryButton: a._isSecondaryButton, inputEvent: v, isTrusted: a._isTrusted }, E)), a.clientStores = [], a._isMouseEvent || (a._preventMouseEvent = !0, clearTimeout(a._preventMouseEventId), a._preventMouseEventId = setTimeout(function() {
          a._preventMouseEvent = !1;
        }, 200)), a._isIdle = !0);
      }
    }, a.onBlur = function() {
      a.onDragEnd();
    }, a._allowClickEvent = function() {
      Rt(a._window, "click", a._onClick, !0);
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
    a._window = Xi(o) ? o : cr(o), a.options = Et({ checkInput: !1, container: o && !("document" in o) ? cr(o) : o, preventRightClick: !0, preventWheelClick: !0, preventClickEventOnDragStart: !1, preventClickEventOnDrag: !1, preventClickEventByCondition: null, preventDefault: !0, checkWindowBlur: !1, keepDragging: !1, pinchThreshold: 0, events: ["touch", "mouse"] }, n);
    var s = a.options, u = s.container, f = s.events, l = s.checkWindowBlur;
    if (a._useDrag = f.indexOf("drag") > -1, a._useTouch = f.indexOf("touch") > -1, a._useMouse = f.indexOf("mouse") > -1, a.targets = i, a._useDrag && i.forEach(function(v) {
      Ot(v, "dragstart", a.onDragStart);
    }), a._useMouse && (i.forEach(function(v) {
      Ot(v, "mousedown", a.onDragStart), Ot(v, "mousemove", a._passCallback);
    }), Ot(u, "contextmenu", a._onContextMenu)), l && Ot(cr(), "blur", a.onBlur), a._useTouch) {
      var c = {
        passive: !1
      };
      i.forEach(function(v) {
        Ot(v, "touchstart", a.onDragStart, c), Ot(v, "touchmove", a._passCallback, c);
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
    return e === void 0 && (e = this._prevInputEvent), Et(Et({ data: this.data, datas: this.data }, this._getPosition()), { movement: this.getMovement(), isDrag: this.isDrag, isPinch: this.isPinch, isScroll: !1, inputEvent: e });
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
      var i = new sn(be(e));
      this.pinchFlag = !0, this._addStore(i);
      var o = this.emit("pinchStart", Et(Et({ data: this.data, datas: this.data, angle: i.getAngle(), touches: this.getCurrentStore().getPositions() }, i.getPosition()), { inputEvent: e, isTrusted: this._isTrusted, preventDefault: function() {
        e.preventDefault();
      }, preventDrag: function() {
        n._dragFlag = !1;
      } }));
      o === !1 && (this.pinchFlag = !1);
    }
  }, r.prototype.onPinch = function(e, n) {
    if (!(!this.flag || !this.pinchFlag || n.length < 2)) {
      var a = this.getCurrentStore();
      this.isPinch = !0, this.emit("pinch", Et(Et({ data: this.data, datas: this.data, movement: this.getMovement(n), angle: a.getAngle(n), rotation: a.getRotation(n), touches: a.getPositions(n), scale: a.getScale(n), distance: a.getDistance(n) }, a.getPosition(n)), { inputEvent: e, isTrusted: this._isTrusted }));
    }
  }, r.prototype.onPinchEnd = function(e) {
    if (this.pinchFlag) {
      var n = this.isPinch;
      this.isPinch = !1, this.pinchFlag = !1;
      var a = this.getCurrentStore();
      this.emit("pinchEnd", Et(Et({ data: this.data, datas: this.data, isPinch: n, touches: a.getPositions() }, a.getPosition()), { inputEvent: e }));
    }
  }, r.prototype.getCurrentStore = function() {
    return this.clientStores[0];
  }, r.prototype.moveClients = function(e, n, a) {
    var i = this._getPosition(e, a), o = this.isDrag;
    (i.deltaX || i.deltaY) && (this.isDrag = !0);
    var s = !1;
    return !o && this.isDrag && (s = !0), Et(Et({ data: this.data, datas: this.data }, i), { movement: this.getMovement(e), isDrag: this.isDrag, isPinch: this.isPinch, isScroll: !1, isMouseEvent: this._isMouseEvent, isSecondaryButton: this._isSecondaryButton, inputEvent: n, isTrusted: this._isTrusted, isFirstDrag: s });
  }, r.prototype._addStore = function(e) {
    this.clientStores.splice(0, 0, e);
  }, r.prototype._getPosition = function(e, n) {
    var a = this.getCurrentStore(), i = a.getPosition(e, n), o = this.clientStores.slice(1).reduce(function(f, l) {
      var c = l.getPosition();
      return f.distX += c.distX, f.distY += c.distY, f;
    }, i), s = o.distX, u = o.distY;
    return Et(Et({}, i), { distX: s, distY: u });
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
}(aa);
function Xu(t) {
  for (var r = 5381, e = t.length; e; )
    r = r * 33 ^ t.charCodeAt(--e);
  return r >>> 0;
}
var qu = Xu;
function Vu(t) {
  return qu(t).toString(36);
}
function ju(t) {
  if (t && t.getRootNode) {
    var r = t.getRootNode();
    if (r.nodeType === 11)
      return r;
  }
}
function Uu(t, r, e) {
  return e.original ? r : r.replace(/([^};{\s}][^};{]*|^\s*){/mg, function(n, a) {
    var i = a.trim();
    return (i ? br(i) : [""]).map(function(o) {
      var s = o.trim();
      return s.indexOf("@") === 0 ? s : s.indexOf(":global") > -1 ? s.replace(/\:global/g, "") : s.indexOf(":host") > -1 ? "".concat(s.replace(/\:host/g, ".".concat(t))) : s ? ".".concat(t, " ").concat(s) : ".".concat(t);
    }).join(", ") + " {";
  });
}
function $u(t, r, e, n, a) {
  var i = Jn(n), o = i.createElement("style");
  return o.setAttribute("type", "text/css"), o.setAttribute("data-styled-id", t), o.setAttribute("data-styled-count", "1"), e.nonce && o.setAttribute("nonce", e.nonce), o.innerHTML = Uu(t, r, e), (a || i.head || i.body).appendChild(o), o;
}
function Zu(t) {
  var r = "rCS" + Vu(t);
  return {
    className: r,
    inject: function(e, n) {
      n === void 0 && (n = {});
      var a = ju(e), i = (a || e.ownerDocument || document).querySelector('style[data-styled-id="'.concat(r, '"]'));
      if (!i)
        i = $u(r, t, n, e, a);
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
var Rn = function() {
  return Rn = Object.assign || function(r) {
    for (var e, n = 1, a = arguments.length; n < a; n++) {
      e = arguments[n];
      for (var i in e) Object.prototype.hasOwnProperty.call(e, i) && (r[i] = e[i]);
    }
    return r;
  }, Rn.apply(this, arguments);
};
function Ku(t, r) {
  var e = {};
  for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && r.indexOf(n) < 0 && (e[n] = t[n]);
  if (t != null && typeof Object.getOwnPropertySymbols == "function") for (var a = 0, n = Object.getOwnPropertySymbols(t); a < n.length; a++)
    r.indexOf(n[a]) < 0 && Object.prototype.propertyIsEnumerable.call(t, n[a]) && (e[n[a]] = t[n[a]]);
  return e;
}
function Qi(t, r) {
  var e = Zu(r), n = e.className;
  return ut.forwardRef(function(a, i) {
    var o = a.className, s = o === void 0 ? "" : o;
    a.cspNonce;
    var u = Ku(a, ["className", "cspNonce"]), f = ut.useRef();
    return ut.useImperativeHandle(i, function() {
      return f.current;
    }, []), ut.useEffect(function() {
      var l = e.inject(f.current, {
        nonce: a.cspNonce
      });
      return function() {
        l.destroy();
      };
    }, []), ut.createElement(t, Rn({
      ref: f,
      "data-styled-id": n,
      className: "".concat(s, " ").concat(n)
    }, u));
  });
}
var Tn = function(t, r) {
  return Tn = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(e, n) {
    e.__proto__ = n;
  } || function(e, n) {
    for (var a in n) Object.prototype.hasOwnProperty.call(n, a) && (e[a] = n[a]);
  }, Tn(t, r);
};
function ce(t, r) {
  if (typeof r != "function" && r !== null)
    throw new TypeError("Class extends value " + String(r) + " is not a constructor or null");
  Tn(t, r);
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
function Ju(t, r) {
  var e = {};
  for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && r.indexOf(n) < 0 && (e[n] = t[n]);
  if (t != null && typeof Object.getOwnPropertySymbols == "function")
    for (var a = 0, n = Object.getOwnPropertySymbols(t); a < n.length; a++)
      r.indexOf(n[a]) < 0 && Object.prototype.propertyIsEnumerable.call(t, n[a]) && (e[n[a]] = t[n[a]]);
  return e;
}
function Qu(t, r, e, n) {
  var a = arguments.length, i = a < 3 ? r : n, o;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") i = Reflect.decorate(t, r, e, n);
  else for (var s = t.length - 1; s >= 0; s--) (o = t[s]) && (i = (a < 3 ? o(i) : a > 3 ? o(r, e, i) : o(r, e)) || i);
  return a > 3 && i && Object.defineProperty(r, e, i), i;
}
function tf(t) {
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
function ve(t, r) {
  return M({ events: [], props: [], name: t }, r);
}
var rf = ["n", "w", "s", "e"], oa = ["n", "w", "s", "e", "nw", "ne", "sw", "se"];
function ef(t, r) {
  return 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="'.concat(32 * t, 'px" height="').concat(32 * t, 'px" viewBox="0 0 32 32" ><path d="M 16,5 L 12,10 L 14.5,10 L 14.5,22 L 12,22 L 16,27 L 20,22 L 17.5,22 L 17.5,10 L 20, 10 L 16,5 Z" stroke-linejoin="round" stroke-width="1.2" fill="black" stroke="white" style="transform:rotate(').concat(r, 'deg);transform-origin: 16px 16px"></path></svg>');
}
function nf(t) {
  var r = ef(1, t), e = Math.round(t / 45) * 45 % 180, n = "ns-resize";
  return e === 135 ? n = "nwse-resize" : e === 45 ? n = "nesw-resize" : e === 90 && (n = "ew-resize"), "cursor:".concat(n, ";cursor: url('").concat(r, "') 16 16, ").concat(n, ";");
}
var Xr = Ys(), to = Xr.browser.webkit, ro = to && function() {
  var t = typeof window > "u" ? { userAgent: "" } : window.navigator, r = /applewebkit\/([^\s]+)/g.exec(t.userAgent.toLowerCase());
  return r ? parseFloat(r[1]) < 605 : !1;
}(), eo = Xr.browser.name, no = parseInt(Xr.browser.version, 10), af = eo === "chrome", of = Xr.browser.chromium, sf = parseInt(Xr.browser.chromiumVersion, 10) || 0, uf = af && no >= 109 || of && sf >= 109, ff = eo === "firefox", lf = parseInt(Xr.browser.webkitVersion, 10) >= 612 || no >= 15, sa = "moveable-", cf = oa.map(function(t) {
  var r = "", e = "", n = "center", a = "center", i = "calc(var(--moveable-control-padding, 20) * -1px)";
  return t.indexOf("n") > -1 && (r = "top: ".concat(i, ";"), a = "bottom"), t.indexOf("s") > -1 && (r = "top: 0px;", a = "top"), t.indexOf("w") > -1 && (e = "left: ".concat(i, ";"), n = "right"), t.indexOf("e") > -1 && (e = "left: 0px;", n = "left"), '.around-control[data-direction*="'.concat(t, `"] {
        `).concat(e).concat(r, `
        transform-origin: `).concat(n, " ").concat(a, `;
    }`);
}).join(`
`), vf = `
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
`.concat(cf, `
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
`).concat(nf(t), `
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

`).concat(ro ? `:global svg *:before {
content:"";
transform-origin: inherit;
}` : "", `
`), df = [
  [0, 1, 2],
  [1, 0, 3],
  [2, 0, 3],
  [3, 1, 2]
], On = 1e-4, At = 1e-7, Ee = 1e-9, Pn = Math.pow(10, 10), ja = -Pn, pf = {
  n: [0, -1],
  e: [1, 0],
  s: [0, 1],
  w: [-1, 0],
  nw: [-1, -1],
  ne: [1, -1],
  sw: [-1, 1],
  se: [1, 1]
}, ua = {
  n: [0, 1],
  e: [1, 3],
  s: [3, 2],
  w: [2, 0],
  nw: [0],
  ne: [1],
  sw: [2],
  se: [3]
}, ao = {
  n: 0,
  s: 180,
  w: 270,
  e: 90,
  nw: 315,
  ne: 45,
  sw: 225,
  se: 135
}, gf = [
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
function de(t, r, e, n, a, i) {
  var o, s;
  i === void 0 && (i = "draggable");
  var u = (s = (o = r.gestos[i]) === null || o === void 0 ? void 0 : o.move(e, t.inputEvent)) !== null && s !== void 0 ? s : {}, f = u.originalDatas || u.datas, l = f[i] || (f[i] = {});
  return M(M({}, u), { isPinch: !!n, parentEvent: !0, datas: l, originalDatas: t.originalDatas });
}
var Fr = /* @__PURE__ */ function() {
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
function kr(t, r, e, n) {
  var a = t.length === 16, i = a ? 4 : 3, o = wr(t, e, n, i), s = R(o, 4), u = R(s[0], 2), f = u[0], l = u[1], c = R(s[1], 2), v = c[0], d = c[1], p = R(s[2], 2), g = p[0], h = p[1], m = R(s[3], 2), x = m[0], S = m[1], b = R(xt(t, r, i), 2), D = b[0], E = b[1], y = Math.min(f, v, g, x), C = Math.min(l, d, h, S), _ = Math.max(f, v, g, x), w = Math.max(l, d, h, S);
  f = f - y || 0, v = v - y || 0, g = g - y || 0, x = x - y || 0, l = l - C || 0, d = d - C || 0, h = h - C || 0, S = S - C || 0, D = D - y || 0, E = E - C || 0;
  var P = t[0], O = t[i + 1], T = Bt(P * O);
  return {
    left: y,
    top: C,
    right: _,
    bottom: w,
    origin: [D, E],
    pos1: [f, l],
    pos2: [v, d],
    pos3: [g, h],
    pos4: [x, S],
    direction: T
  };
}
function io(t, r) {
  var e = r.clientX, n = r.clientY, a = r.datas, i = t.state, o = i.moveableClientRect, s = i.rootMatrix, u = i.is3d, f = i.pos1, l = o.left, c = o.top, v = u ? 4 : 3, d = R(Q(Lr(s, [e - l, n - c], v), f), 2), p = d[0], g = d[1], h = R(tr({ datas: a, distX: p, distY: g }), 2), m = h[0], x = h[1];
  return [m, x];
}
function Mr(t, r) {
  var e = r.datas, n = t.state, a = n.allMatrix, i = n.beforeMatrix, o = n.is3d, s = n.left, u = n.top, f = n.origin, l = n.offsetMatrix, c = n.targetMatrix, v = n.transformOrigin, d = o ? 4 : 3;
  e.is3d = o, e.matrix = a, e.targetMatrix = c, e.beforeMatrix = i, e.offsetMatrix = l, e.transformOrigin = v, e.inverseMatrix = Qt(a, d), e.inverseBeforeMatrix = Qt(i, d), e.absoluteOrigin = Dr(ft([s, u], f), d), e.startDragBeforeDist = Pt(e.inverseBeforeMatrix, e.absoluteOrigin, d), e.startDragDist = Pt(e.inverseMatrix, e.absoluteOrigin, d);
}
function hf(t) {
  return kr(t.datas.beforeTransform, [50, 50], 100, 100).direction;
}
function Ye(t, r, e) {
  var n = r.datas, a = r.originalDatas.beforeRenderable, i = n.transformIndex, o = a.nextTransforms, s = o.length, u = a.nextTransformAppendedIndexes, f = -1;
  i === -1 ? (e === "translate" ? f = 0 : e === "rotate" && (f = nr(o, function(d) {
    return d.match(/scale\(/g);
  })), f === -1 && (f = o.length), n.transformIndex = f) : Lt(u, function(d) {
    return d.index === i && d.functionName === e;
  }) ? f = i : f = i + u.filter(function(d) {
    return d.index < i;
  }).length;
  var l = Hl(o, t.state, f), c = l.targetFunction, v = e === "rotate" ? "rotateZ" : e;
  n.beforeFunctionTexts = l.beforeFunctionTexts, n.afterFunctionTexts = l.afterFunctionTexts, n.beforeTransform = l.beforeFunctionMatrix, n.beforeTransform2 = l.beforeFunctionMatrix2, n.targetTansform = l.targetFunctionMatrix, n.afterTransform = l.afterFunctionMatrix, n.afterTransform2 = l.afterFunctionMatrix2, n.targetAllTransform = l.allFunctionMatrix, c.functionName === v ? (n.afterFunctionTexts.splice(0, 1), n.isAppendTransform = !1) : s > f && (n.isAppendTransform = !0, a.nextTransformAppendedIndexes = N(N([], R(u), !1), [{
    functionName: e,
    index: f,
    isAppend: !0
  }], !1));
}
function Xe(t, r, e) {
  return "".concat(t.beforeFunctionTexts.join(" "), " ").concat(t.isAppendTransform ? e : r, " ").concat(t.afterFunctionTexts.join(" "));
}
function mf(t) {
  var r = t.datas, e = t.distX, n = t.distY, a = R(so({ datas: r, distX: e, distY: n }), 2), i = a[0], o = a[1], s = oo(r, vu([i, o], 4));
  return Pt(s, Dr([0, 0, 0], 4), 4);
}
function oo(t, r, e) {
  var n = t.beforeTransform, a = t.afterTransform, i = t.beforeTransform2, o = t.afterTransform2, s = t.targetAllTransform, u = e ? pt(s, r, 4) : pt(r, s, 4), f = pt(Qt(e ? i : n, 4), u, 4), l = pt(f, Qt(e ? o : a, 4), 4);
  return l;
}
function so(t) {
  var r = t.datas, e = t.distX, n = t.distY, a = r.inverseBeforeMatrix, i = r.is3d, o = r.startDragBeforeDist, s = r.absoluteOrigin, u = i ? 4 : 3;
  return Q(Pt(a, ft(s, [e, n]), u), o);
}
function tr(t, r) {
  var e = t.datas, n = t.distX, a = t.distY, i = e.inverseBeforeMatrix, o = e.inverseMatrix, s = e.is3d, u = e.startDragBeforeDist, f = e.startDragDist, l = e.absoluteOrigin, c = s ? 4 : 3;
  return Q(Pt(r ? i : o, ft(l, [n, a]), c), r ? u : f);
}
function xf(t, r) {
  var e = t.datas, n = t.distX, a = t.distY;
  e.beforeMatrix;
  var i = e.matrix, o = e.is3d;
  e.startDragBeforeDist;
  var s = e.startDragDist, u = e.absoluteOrigin, f = o ? 4 : 3;
  return Q(Pt(i, ft(s, [n, a]), f), u);
}
function Sf(t, r, e, n, a, i) {
  return n === void 0 && (n = r), a === void 0 && (a = e), i === void 0 && (i = [0, 0]), t ? t.map(function(o, s) {
    var u = ue(o), f = u.value, l = u.unit, c = s ? a : n, v = s ? e : r;
    if (o === "%" || isNaN(f)) {
      var d = c ? i[s] / c : 0;
      return v * d;
    } else if (l !== "%")
      return f;
    return v * f / 100;
  }) : i;
}
function uo(t) {
  var r = [];
  return t[1] >= 0 && (t[0] >= 0 && r.push(3), t[0] <= 0 && r.push(2)), t[1] <= 0 && (t[0] >= 0 && r.push(1), t[0] <= 0 && r.push(0)), r;
}
function bf(t, r) {
  return uo(r).map(function(e) {
    return t[e];
  });
}
function un(t, r) {
  var e = (r + 1) / 2;
  return [
    Ie(t[0][0], t[1][0], e, 1 - e),
    Ie(t[0][1], t[1][1], e, 1 - e)
  ];
}
function _t(t, r) {
  var e = un([t[0], t[1]], r[0]), n = un([t[2], t[3]], r[0]);
  return un([e, n], r[1]);
}
function Ef(t, r, e, n, a, i) {
  var o = wr(r, e, n, a), s = _t(o, i), u = t[0] - s[0], f = t[1] - s[1];
  return [u, f];
}
function pe(t, r, e, n) {
  return pt(t, Qr(r, n, e), n);
}
function Df(t, r, e, n) {
  var a = t.transformOrigin, i = t.offsetMatrix, o = t.is3d, s = o ? 4 : 3, u;
  if (ar(e)) {
    var f = r.beforeTransform, l = r.afterTransform;
    n ? u = Kt(ie(e), 4, s) : u = Kt(pt(pt(f, ie([e]), 4), l, 4), 4, s);
  } else
    u = e;
  return pe(i, u, a, s);
}
function yf(t, r) {
  var e = t.transformOrigin, n = t.offsetMatrix, a = t.is3d, i = t.targetMatrix, o = t.targetAllTransform, s = a ? 4 : 3;
  return pe(n, pt(o || i, ra(r, s), s), e, s);
}
function qe(t, r) {
  var e = qr(r);
  return {
    setTransform: function(n, a) {
      a === void 0 && (a = -1), e.startTransforms = wt(n) ? n : vr(n), In(t, r, a);
    },
    setTransformIndex: function(n) {
      In(t, r, n);
    }
  };
}
function Ve(t, r, e) {
  var n = qr(r), a = n.startTransforms;
  In(t, r, nr(a, function(i) {
    return i.indexOf("".concat(e, "(")) === 0;
  }));
}
function In(t, r, e) {
  var n = qr(r), a = r.datas;
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
function fa(t, r) {
  var e = qr(t);
  e.nextTransforms = vr(r);
}
function qr(t) {
  return t.originalDatas.beforeRenderable;
}
function Be(t) {
  var r = t.originalDatas.beforeRenderable;
  return r.nextTransforms;
}
function De(t) {
  return (Be(t) || []).join(" ");
}
function ye(t) {
  return qr(t).nextStyle;
}
function fo(t, r, e, n, a) {
  fa(a, r);
  var i = Gt.drag(t, de(a, t.state, e, n)), o = i ? i.transform : r;
  return M(M({ transform: r, drag: i }, kt({
    transform: o
  }, a)), { afterTransform: o });
}
function la(t, r, e, n, a, i) {
  var o = Df(t.state, a, r, i), s = Mf(t, e, n, o);
  return s;
}
function lo(t, r, e, n, a, i, o) {
  var s = la(t, r, e, a, i, o), u = t.state, f = u.left, l = u.top, c = t.props.groupable, v = c ? f : 0, d = c ? l : 0, p = Q(n, s);
  return Q(p, [v, d]);
}
function Cf(t, r, e, n, a, i, o) {
  var s = lo(t, r, e, n, a, i, o);
  return s;
}
function _f(t, r, e) {
  return [
    r ? -1 + t[0] / (r / 2) : 0,
    e ? -1 + t[1] / (e / 2) : 0
  ];
}
function Mf(t, r, e, n) {
  n === void 0 && (n = t.state.allMatrix);
  var a = t.state, i = a.width, o = a.height, s = a.is3d, u = s ? 4 : 3, f = [
    i / 2 * (1 + r[0]) + e[0],
    o / 2 * (1 + r[1]) + e[1]
  ];
  return xt(n, f, u);
}
function wf(t, r, e) {
  var n = e.fixedDirection, a = e.fixedPosition, i = e.fixedOffset;
  return lo(t, "rotate(".concat(r, "deg)"), n, a, i, e);
}
function Rf(t, r, e, n, a, i) {
  var o = t.props.groupable, s = t.state, u = s.transformOrigin, f = s.offsetMatrix, l = s.is3d, c = s.width, v = s.height, d = s.left, p = s.top, g = i.fixedDirection, h = i.nextTargetMatrix || s.targetMatrix, m = l ? 4 : 3, x = Sf(a, r, e, c, v, u), S = o ? d : 0, b = o ? p : 0, D = pe(f, h, x, m), E = Ef(n, D, r, e, m, g);
  return Q(E, [S, b]);
}
function Tf(t, r) {
  return _t(jt(t.state), r);
}
function Of(t, r) {
  var e = t.targetGesto, n = t.controlGesto, a;
  return e?.isFlag() && (a = e.getEventData()[r]), !a && n?.isFlag() && (a = n.getEventData()[r]), a || {};
}
function Pf(t) {
  if (t && t.getRootNode) {
    var r = t.getRootNode();
    if (r.nodeType === 11)
      return r;
  }
}
function If(t) {
  var r = t("scale"), e = t("rotate"), n = t("translate"), a = [];
  return n && n !== "0px" && n !== "none" && a.push("translate(".concat(n.split(/\s+/).join(","), ")")), e && e !== "1" && e !== "none" && a.push("rotate(".concat(e, ")")), r && r !== "1" && r !== "none" && a.push("scale(".concat(r.split(/\s+/).join(","), ")")), a;
}
function co(t, r, e) {
  for (var n = t, a = [], i = Qn(t) || gr(t), o = !e && t === r || t === i, s = o, u = !1, f = 3, l, c, v, d = !1, p = se(r, r, !0).offsetParent, g = 1; n && !s; ) {
    s = o;
    var h = Nt(n), m = h("position"), x = ko(n), S = m === "fixed", b = If(h), D = du(Tl(x)), E = void 0, y = !1, C = !1, _ = 0, w = 0, P = 0, O = 0, T = {
      hasTransform: !1,
      fixedContainer: null
    };
    S && (d = !0, T = Gl(n), p = T.fixedContainer);
    var I = D.length;
    !u && (I === 16 || b.length) && (u = !0, f = 4, Fn(a), v && (v = Kt(v, 3, 4))), u && I === 9 && (D = Kt(D, 3, 4));
    var z = zl(n, t), A = z.tagName, F = z.hasOffset, k = z.isSVG, W = z.origin, L = z.targetOrigin, G = z.offset, q = R(G, 2), V = q[0], H = q[1];
    A === "svg" && !n.ownerSVGElement && v && (a.push({
      type: "target",
      target: n,
      matrix: Bl(n, f)
    }), a.push({
      type: "offset",
      target: n,
      matrix: mt(f)
    }));
    var j = parseFloat(h("zoom")) || 1;
    if (S)
      E = T.fixedContainer, y = !0;
    else {
      var Y = se(n, r, !1, !0, h), $ = Y.offsetZoom;
      if (E = Y.offsetParent, y = Y.isEnd, C = Y.isStatic, g *= $, (Y.isCustomElement || $ !== 1) && C)
        V -= E.offsetLeft, H -= E.offsetTop;
      else if (ff || uf) {
        var J = Y.parentSlotElement;
        if (J) {
          for (var at = E, st = 0, X = 0; at && Pf(at); )
            st += at.offsetLeft, X += at.offsetTop, at = at.offsetParent;
          V -= st, H -= X;
        }
      }
    }
    if (to && !lf && F && !k && C && (m === "relative" || m === "static") && (V -= E.offsetLeft, H -= E.offsetTop, o = o || y), S)
      F && T.hasTransform && (P = E.clientLeft, O = E.clientTop);
    else if (F && p !== E && (_ = E.clientLeft, w = E.clientTop), F && E === i) {
      var Z = Ao(n, !1);
      V += Z[0], H += Z[1];
    }
    if (a.push({
      type: "target",
      target: n,
      matrix: Qr(D, f, W)
    }), b.length && (a.push({
      type: "offset",
      target: n,
      matrix: mt(f)
    }), a.push({
      type: "target",
      target: n,
      matrix: Qr(ie(b), f, W)
    })), F) {
      var lt = n === t, rt = lt ? 0 : n.scrollLeft, et = lt ? 0 : n.scrollTop;
      a.push({
        type: "offset",
        target: n,
        matrix: yr([
          V - rt + _ - P,
          H - et + w - O
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
      matrix: Qr(ra([j, j], f), f, [0, 0])
    }), v || (v = D), l || (l = W), c || (c = L), s || S)
      break;
    n = E, o = y, (!e || n === i) && (s = o);
  }
  return v || (v = mt(f)), l || (l = [0, 0]), c || (c = [0, 0]), {
    zoom: g,
    offsetContainer: p,
    matrixes: a,
    targetMatrix: v,
    transformOrigin: l,
    targetOrigin: c,
    is3d: u,
    hasFixed: d
  };
}
var hr = null, mr = null, Pr = null;
function Nr(t) {
  t ? (window.Map && (hr = /* @__PURE__ */ new Map(), mr = /* @__PURE__ */ new Map()), Pr = []) : (hr = null, Pr = null, mr = null);
}
function zf(t) {
  var r = mr?.get(t);
  if (r)
    return r;
  var e = te(t, !0);
  return mr && mr.set(t, e), e;
}
function Gf(t, r) {
  if (Pr) {
    var e = Lt(Pr, function(a) {
      return a[0][0] == t && a[0][1] == r;
    });
    if (e)
      return e[1];
  }
  var n = co(t, r, !0);
  return Pr && Pr.push([[t, r], n]), n;
}
function Nt(t) {
  var r = hr?.get(t);
  if (!r) {
    var e = cr(t).getComputedStyle(t);
    if (!hr)
      return function(i) {
        return e[i];
      };
    r = {
      style: e,
      cached: {}
    }, hr.set(t, r);
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
function fn(t, r, e, n, a, i, o) {
  var s = !!e.match(/Start$/g), u = !!e.match(/End$/g), f = a.isPinch, l = a.datas, c = $t(t, r.name, a), v = t.moveables, d = [], p = c.map(function(g, h) {
    var m = v[h], x = m.state, S = x.gestos, b = g;
    if (s)
      b = new Fr(o).dragStart(n, g), d.push(b);
    else {
      if (S[o] || (S[o] = l.childGestos[h]), !S[o])
        return;
      b = de(g, x, n, f, i, o), d.push(b);
    }
    var D = r[e](m, M(M({}, b), { parentFlag: !0 }));
    return u && (S[o] = null), D;
  });
  return s && (l.childGestos = v.map(function(g) {
    return g.state.gestos[o];
  })), {
    eventParams: p,
    childEvents: d
  };
}
function er(t, r, e, n, a, i) {
  a === void 0 && (a = function(l, c) {
    return c;
  });
  var o = !!e.match(/End$/g), s = $t(t, r.name, n), u = t.moveables, f = s.map(function(l, c) {
    var v = u[c], d = l;
    d = a(v, l);
    var p = r[e](v, M(M({}, d), { parentFlag: !0 }));
    return p && i && i(v, l, p, c), o && (v.state.gestos = {}), p;
  });
  return f;
}
function ke(t, r, e, n) {
  var a = e.fixedDirection, i = e.fixedPosition, o = n.datas.startPositions || jt(r.state), s = _t(o, a), u = R(Pt(le(-t.rotation / 180 * Math.PI, 3), [s[0] - i[0], s[1] - i[1], 1], 3), 2), f = u[0], l = u[1];
  return n.datas.originalX = f, n.datas.originalY = l, n;
}
function vo(t, r, e, n) {
  var a = t.getState(), i = a.renderPoses, o = a.rotation, s = a.direction, u = _r(t.props, r).zoom, f = Jr(o / Math.PI * 180), l = {}, c = t.renderState;
  c.renderDirectionMap || (c.renderDirectionMap = {});
  var v = c.renderDirectionMap;
  e.forEach(function(p) {
    var g = p.dir;
    l[g] = !0;
  });
  var d = Bt(s);
  return e.map(function(p) {
    var g = p.data, h = p.classNames, m = p.dir, x = ua[m];
    if (!x || !l[m])
      return null;
    v[m] = !0;
    var S = (tt(f, 15) + d * ao[m] + 720) % 180, b = {};
    return Yr(g).forEach(function(D) {
      b["data-".concat(D)] = g[D];
    }), n.createElement("div", M({ className: K.apply(void 0, N(["control", "direction", m, r], R(h), !1)), "data-rotation": S, "data-direction": m }, b, { key: "direction-".concat(m), style: We.apply(void 0, N([o, u], R(x.map(function(D) {
      return i[D];
    })), !1)) }));
  });
}
function po(t, r, e, n) {
  var a = _r(t.props, e), i = a.renderDirections, o = i === void 0 ? r : i, s = a.displayAroundControls;
  if (!o)
    return [];
  var u = o === !0 ? oa : o;
  return N(N([], R(s ? xo(t, n, e, u) : []), !1), R(vo(t, e, u.map(function(f) {
    return {
      data: {},
      classNames: [],
      dir: f
    };
  }), n)), !1);
}
function oe(t, r, e, n, a, i) {
  for (var o = [], s = 6; s < arguments.length; s++)
    o[s - 6] = arguments[s];
  var u = St(e, n), f = r ? tt(u / Math.PI * 180, 15) % 180 : -1;
  return t.createElement("div", { key: "line-".concat(i), className: K.apply(void 0, N(["line", "direction", r ? "edge" : "", r], R(o), !1)), "data-rotation": f, "data-line-key": i, "data-direction": r, style: $r(e, n, a, u) });
}
function go(t, r, e, n, a) {
  var i = e === !0 ? rf : e;
  return i.map(function(o, s) {
    var u = R(ua[o], 2), f = u[0], l = u[1];
    if (l != null)
      return oe(t, o, n[f], n[l], a, "".concat(r, "Edge").concat(s), r);
  }).filter(Boolean);
}
function ho(t) {
  return function(r, e) {
    var n = _r(r.props, t).edge;
    return n && (n === !0 || n.length) ? N(N([], R(go(e, t, n, r.getState().renderPoses, r.props.zoom)), !1), R(Bf(r, t, e)), !1) : mo(r, t, e);
  };
}
function mo(t, r, e) {
  return po(t, oa, r, e);
}
function Bf(t, r, e) {
  return po(t, ["nw", "ne", "sw", "se"], r, e);
}
function xo(t, r, e, n) {
  var a = t.renderState;
  a.renderDirectionMap || (a.renderDirectionMap = {});
  var i = t.getState(), o = i.renderPoses, s = i.rotation, u = i.direction, f = a.renderDirectionMap, l = t.props.zoom, c = Bt(u), v = s / Math.PI * 180;
  return (n || Yr(f)).map(function(d) {
    var p = ua[d];
    if (!p)
      return null;
    var g = (tt(v, 15) + c * ao[d] + 720) % 180, h = ["around-control"];
    return e && h.push("direction", e), r.createElement("div", { className: K.apply(void 0, N([], R(h), !1)), "data-rotation": g, "data-direction": d, key: "direction-around-".concat(d), style: We.apply(void 0, N([s, l], R(p.map(function(m) {
      return o[m];
    })), !1)) });
  });
}
function ca(t, r, e) {
  var n = t || {}, a = n.position, i = a === void 0 ? "client" : a, o = n.left, s = o === void 0 ? -1 / 0 : o, u = n.top, f = u === void 0 ? -1 / 0 : u, l = n.right, c = l === void 0 ? 1 / 0 : l, v = n.bottom, d = v === void 0 ? 1 / 0 : v, p = {
    position: i,
    left: s,
    top: f,
    right: c,
    bottom: d
  };
  return {
    vertical: Ua(p, r, !0),
    horizontal: Ua(p, e, !1)
  };
}
function je(t, r) {
  var e = t.state, n = e.containerClientRect, a = n.clientHeight, i = n.clientWidth, o = n.clientLeft, s = n.clientTop, u = e.snapOffset, f = u.left, l = u.top, c = u.right, v = u.bottom, d = r || t.props.bounds || {}, p = d.position || "client", g = p === "css", h = d.left, m = h === void 0 ? -1 / 0 : h, x = d.top, S = x === void 0 ? -1 / 0 : x, b = d.right, D = b === void 0 ? g ? -1 / 0 : 1 / 0 : b, E = d.bottom, y = E === void 0 ? g ? -1 / 0 : 1 / 0 : E;
  return g && (D = i + c - f - D, y = a + v - l - y), {
    left: m + f - o,
    right: D + f - o,
    top: S + l - s,
    bottom: y + l - s
  };
}
function kf(t, r, e) {
  var n = je(t), a = n.left, i = n.top, o = n.right, s = n.bottom, u = R(e, 2), f = u[0], l = u[1], c = R(Q(e, r), 2), v = c[0], d = c[1];
  B(v) < At && (v = 0), B(d) < At && (d = 0);
  var p = d > 0, g = v > 0, h = {
    isBound: !1,
    offset: 0,
    pos: 0
  }, m = {
    isBound: !1,
    offset: 0,
    pos: 0
  };
  if (v === 0 && d === 0)
    return {
      vertical: h,
      horizontal: m
    };
  if (v === 0)
    p ? s < l && (m.pos = s, m.offset = l - s) : i > l && (m.pos = i, m.offset = l - i);
  else if (d === 0)
    g ? o < f && (h.pos = o, h.offset = f - o) : a > f && (h.pos = a, h.offset = f - a);
  else {
    var x = d / v, S = e[1] - x * f, b = 0, D = 0, E = !1;
    g && o <= f ? (b = x * o + S, D = o, E = !0) : !g && f <= a && (b = x * a + S, D = a, E = !0), E && (b < i || b > s) && (E = !1), E || (p && s <= l ? (b = s, D = (b - S) / x, E = !0) : !p && l <= i && (b = i, D = (b - S) / x, E = !0)), E && (h.isBound = !0, h.pos = D, h.offset = f - D, m.isBound = !0, m.pos = b, m.offset = l - b);
  }
  return {
    vertical: h,
    horizontal: m
  };
}
function Ua(t, r, e) {
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
function $a(t, r, e) {
  var n = e ? t.map(function(a) {
    return fe(a, e);
  }) : t;
  return n.some(function(a) {
    return a[0] < r.left && B(a[0] - r.left) > 0.1 || a[0] > r.right && B(a[0] - r.right) > 0.1 || a[1] < r.top && B(a[1] - r.top) > 0.1 || a[1] > r.bottom && B(a[1] - r.bottom) > 0.1;
  });
}
function Af(t, r, e) {
  var n = Vt(t), a = Math.sqrt(n * n - r * r) || 0;
  return [a, -a].sort(function(i, o) {
    return B(i - t[e ? 0 : 1]) - B(o - t[e ? 0 : 1]);
  }).map(function(i) {
    return St([0, 0], e ? [i, r] : [r, i]);
  });
}
function Ff(t, r, e, n, a) {
  if (!t.props.bounds)
    return [];
  var i = a * Math.PI / 180, o = je(t), s = o.left, u = o.top, f = o.right, l = o.bottom, c = s - n[0], v = f - n[0], d = u - n[1], p = l - n[1], g = {
    left: c,
    top: d,
    right: v,
    bottom: p
  };
  if (!$a(e, g, 0))
    return [];
  var h = [];
  return [
    [c, 0],
    [v, 0],
    [d, 1],
    [p, 1]
  ].forEach(function(m) {
    var x = R(m, 2), S = x[0], b = x[1];
    e.forEach(function(D) {
      var E = St([0, 0], D);
      h.push.apply(h, N([], R(Af(D, S, b).map(function(y) {
        return i + y - E;
      }).filter(function(y) {
        return !$a(r, g, y);
      }).map(function(y) {
        return tt(y * 180 / Math.PI, At);
      })), !1));
    });
  }), h;
}
var Nf = ["left", "right", "center"], Wf = ["top", "bottom", "middle"], Za = {
  left: "start",
  right: "end",
  center: "center",
  top: "start",
  bottom: "end",
  middle: "center"
}, dr = {
  start: "left",
  end: "right",
  center: "center"
}, pr = {
  start: "top",
  end: "bottom",
  center: "middle"
};
function Ir() {
  return {
    left: !1,
    top: !1,
    right: !1,
    bottom: !1
  };
}
function Vr(t, r) {
  var e = t.props, n = e.snappable, a = e.bounds, i = e.innerBounds, o = e.verticalGuidelines, s = e.horizontalGuidelines, u = e.snapGridWidth, f = e.snapGridHeight, l = t.state, c = l.guidelines, v = l.enableSnap;
  return !n || !v || r && n !== !0 && n.indexOf(r) < 0 ? !1 : !!(u || f || a || i || c && c.length || o && o.length || s && s.length);
}
function va(t) {
  return t === !1 ? {} : t === !0 || !t ? { left: !0, right: !0, top: !0, bottom: !0 } : t;
}
function Lf(t, r) {
  var e = va(t), n = {};
  for (var a in e)
    a in r && e[a] && (n[a] = r[a]);
  return n;
}
function da(t, r) {
  var e = Lf(t, r), n = Wf.filter(function(i) {
    return i in e;
  }), a = Nf.filter(function(i) {
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
function Hf(t, r, e) {
  var n = xt(t, [r.clientLeft, r.clientTop], e);
  return [
    r.left + n[0],
    r.top + n[1]
  ];
}
function Yf(t) {
  var r = R(t, 2), e = r[0], n = r[1], a = n[0] - e[0], i = n[1] - e[1];
  Math.abs(a) < Dt && (a = 0), Math.abs(i) < Dt && (i = 0);
  var o = 0, s = 0, u = 0;
  return a ? i ? (o = -i / a, s = 1, u = o * e[0] - e[1]) : (s = 1, u = -e[1]) : (o = -1, u = e[0]), [o, s, u].map(function(f) {
    return tt(f, Dt);
  });
}
var So = "snapRotationThreshold", bo = "snapRotationDegrees", Eo = "snapHorizontalThreshold", Do = "snapVerticalThreshold";
function Ue(t, r, e, n, a, i, o) {
  var s;
  n === void 0 && (n = []), a === void 0 && (a = []);
  var u = t.props, f = ((s = t.state.snapThresholdInfo) === null || s === void 0 ? void 0 : s.multiples) || [1, 1], l = ci(o, u[Eo], 5), c = ci(i, u[Do], 5);
  return yo(t.state.guidelines, r, e, n, a, l, c, f);
}
function yo(t, r, e, n, a, i, o, s) {
  return {
    vertical: Ja(t, "vertical", r, o * s[0], n),
    horizontal: Ja(t, "horizontal", e, i * s[1], a)
  };
}
function Xf(t, r, e) {
  var n = R(e, 2), a = n[0], i = n[1], o = R(r, 2), s = o[0], u = o[1], f = R(Q(e, r), 2), l = f[0], c = f[1], v = c > 0, d = l > 0;
  l = Le(l), c = Le(c);
  var p = {
    isSnap: !1,
    offset: 0,
    pos: 0
  }, g = {
    isSnap: !1,
    offset: 0,
    pos: 0
  };
  if (l === 0 && c === 0)
    return {
      vertical: p,
      horizontal: g
    };
  var h = Ue(t, l ? [a] : [], c ? [i] : [], [], [], void 0, void 0), m = h.vertical, x = h.horizontal;
  m.posInfos.filter(function(A) {
    var F = A.pos;
    return d ? F >= s : F <= s;
  }), x.posInfos.filter(function(A) {
    var F = A.pos;
    return v ? F >= u : F <= u;
  }), m.isSnap = m.posInfos.length > 0, x.isSnap = x.posInfos.length > 0;
  var S = zn(m), b = S.isSnap, D = S.guideline, E = zn(x), y = E.isSnap, C = E.guideline, _ = y ? C.pos[1] : 0, w = b ? D.pos[0] : 0;
  if (l === 0)
    y && (g.isSnap = !0, g.pos = C.pos[1], g.offset = i - g.pos);
  else if (c === 0)
    b && (p.isSnap = !0, p.pos = w, p.offset = a - w);
  else {
    var P = c / l, O = e[1] - P * a, T = 0, I = 0, z = !1;
    b ? (I = w, T = P * I + O, z = !0) : y && (T = _, I = (T - O) / P, z = !0), z && (p.isSnap = !0, p.pos = I, p.offset = a - I, g.isSnap = !0, g.pos = T, g.offset = i - T);
  }
  return {
    vertical: p,
    horizontal: g
  };
}
function fr(t) {
  var r = "";
  return t === -1 || t === "top" || t === "left" ? r = "start" : t === 0 || t === "center" || t === "middle" ? r = "center" : (t === 1 || t === "right" || t === "bottom") && (r = "end"), r;
}
function Ka(t, r, e, n) {
  var a = da(t.props.snapDirections, r), i = Ue(t, a.vertical, a.horizontal, a.verticalNames.map(function(u) {
    return fr(u);
  }), a.horizontalNames.map(function(u) {
    return fr(u);
  }), e, n), o = fr(a.horizontalNames[i.horizontal.index]), s = fr(a.verticalNames[i.vertical.index]);
  return {
    vertical: M(M({}, i.vertical), { direction: s }),
    horizontal: M(M({}, i.horizontal), { direction: o })
  };
}
function zn(t) {
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
function Ja(t, r, e, n, a) {
  var i, o;
  if (a === void 0 && (a = []), !t || !t.length)
    return {
      isSnap: !1,
      index: -1,
      direction: "",
      posInfos: []
    };
  var s = r === "vertical", u = s ? 0 : 1, f = e.map(function(c, v) {
    var d = a[v] || "", p = t.map(function(g) {
      var h = g.pos, m = c - h[u];
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
function qf(t, r, e, n, a) {
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
    var g = p[d + 1] || p[0];
    i.push(v), i.push([
      (v[0] + g[0]) / 2,
      (v[1] + g[1]) / 2
    ]);
  }) : t.props.keepRatio ? i.push([-1, -1], [-1, 1], [1, -1], [1, 1], e) : (i.push.apply(i, N([], R(bf([
    [-1, -1],
    [1, -1],
    [-1, -1],
    [1, 1]
  ], e)), !1)), i.length > 1 && i.push([
    (i[0][0] + i[1][0]) / 2,
    (i[0][1] + i[1][1]) / 2
  ]));
  var o = i.map(function(v) {
    return _t(r, v);
  }), s = o.map(function(v) {
    return v[0];
  }), u = o.map(function(v) {
    return v[1];
  }), f = Ue(t, s, u, i.map(function(v) {
    return fr(v[0]);
  }), i.map(function(v) {
    return fr(v[1]);
  }), n, a), l = fr(i.map(function(v) {
    return v[0];
  })[f.vertical.index]), c = fr(i.map(function(v) {
    return v[1];
  })[f.horizontal.index]);
  return {
    vertical: M(M({}, f.vertical), { direction: l }),
    horizontal: M(M({}, f.horizontal), { direction: c })
  };
}
function Co(t, r) {
  var e = B(t.offset), n = B(r.offset);
  return t.isBound && r.isBound ? n - e : t.isBound ? -1 : r.isBound ? 1 : t.isSnap && r.isSnap ? n - e : t.isSnap ? -1 : r.isSnap || e < At ? 1 : n < At ? -1 : e - n;
}
function Ae(t, r) {
  return t.slice().sort(function(e, n) {
    var a = e.sign[r], i = n.sign[r], o = e.offset[r], s = n.offset[r];
    if (a) {
      if (!i)
        return -1;
    } else return 1;
    return Co({ isBound: e.isBound, isSnap: e.isSnap, offset: o }, { isBound: n.isBound, isSnap: n.isSnap, offset: s });
  })[0];
}
function Vf(t, r, e) {
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
function _o(t, r) {
  var e = En([r[0][0], r[1][0]]), n = En([r[0][1], r[1][1]]);
  return {
    vertical: e <= t[0],
    horizontal: n <= t[1]
  };
}
function pa(t, r) {
  var e = R(r, 2), n = e[0], a = e[1], i = a[0] - n[0], o = a[1] - n[1];
  B(i) < At && (i = 0), B(o) < At && (o = 0);
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
function Mo(t, r, e, n) {
  return n === void 0 && (n = At), t.every(function(a) {
    var i = pa(a, r), o = i <= 0;
    return o === e || B(i) <= n;
  });
}
function Qa(t, r, e, n, a) {
  return a === void 0 && (a = 0), n && r - a <= t || !n && t <= e + a ? {
    isBound: !0,
    offset: n ? r - t : e - t
  } : {
    isBound: !1,
    offset: 0
  };
}
function jf(t, r) {
  var e = r.line, n = r.centerSign, a = r.verticalSign, i = r.horizontalSign, o = r.lineConstants, s = t.props.innerBounds;
  if (!s)
    return {
      isAllBound: !1,
      isBound: !1,
      isVerticalBound: !1,
      isHorizontalBound: !1,
      offset: [0, 0]
    };
  var u = s.left, f = s.top, l = s.width, c = s.height, v = [[u, f], [u, f + c]], d = [[u, f], [u + l, f]], p = [[u + l, f], [u + l, f + c]], g = [[u, f + c], [u + l, f + c]];
  if (Mo([
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
  var h = lr(e, o, d, a), m = lr(e, o, g, a), x = lr(e, o, v, i), S = lr(e, o, p, i), b = h.isBound && m.isBound, D = h.isBound || m.isBound, E = x.isBound && S.isBound, y = x.isBound || S.isBound, C = Wr(h.offset, m.offset), _ = Wr(x.offset, S.offset), w = [0, 0], P = !1, O = !1;
  return B(_) < B(C) ? (w = [C, 0], P = D, O = b) : (w = [0, _], P = y, O = E), {
    isAllBound: O,
    isVerticalBound: D,
    isHorizontalBound: y,
    isBound: P,
    offset: w
  };
}
function lr(t, r, e, n, a, i) {
  var o = R(r, 2), s = o[0], u = o[1], f = t[0], l = e[0], c = e[1], v = Le(c[1] - l[1]), d = Le(c[0] - l[0]), p = u, g = s, h = -s / u;
  if (d) {
    if (!v) {
      if (i && !p)
        return {
          isBound: !1,
          offset: 0
        };
      if (g) {
        var b = (l[1] - f[1]) / h + f[0];
        return Qa(b, l[0], c[0], n, a);
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
      return Qa(m, l[1], c[1], n, a);
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
function wo(t, r, e) {
  return r.map(function(n) {
    var a = jf(t, n), i = a.isBound, o = a.offset, s = a.isVerticalBound, u = a.isHorizontalBound, f = n.multiple, l = tr({
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
function Uf(t, r, e) {
  var n, a = ga(t, r, [0, 0], !1).map(function(v) {
    return M(M({}, v), { multiple: v.multiple.map(function(d) {
      return B(d) * 2;
    }) });
  }), i = wo(t, a, e), o = Ae(i, 0), s = Ae(i, 1), u = 0, f = 0, l = o.isVerticalBound || s.isVerticalBound, c = o.isHorizontalBound || s.isHorizontalBound;
  return (l || c) && (n = R(xf({
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
function $f(t, r) {
  var e = [], n = t[0], a = t[1];
  return n && a ? e.push([[0, a * 2], t, [-n, a]], [[n * 2, 0], t, [n, -a]]) : n ? (e.push([[n * 2, 0], [n, 1], [n, -1]]), r && e.push([[0, -1], [n, -1], [-n, -1]], [[0, 1], [n, 1], [-n, 1]])) : a ? (e.push([[0, a * 2], [1, a], [-1, a]]), r && e.push([[-1, 0], [-1, a], [-1, -a]], [[1, 0], [1, a], [1, -a]])) : e.push([[-1, 0], [-1, -1], [-1, 1]], [[1, 0], [1, -1], [1, 1]], [[0, -1], [-1, -1], [1, -1]], [[0, 1], [-1, 1], [1, 1]]), e;
}
function ga(t, r, e, n) {
  var a = t.state, i = a.allMatrix, o = a.is3d, s = wr(i, 100, 100, o ? 4 : 3), u = _t(s, [0, 0]);
  return $f(e, n).map(function(f) {
    var l = R(f, 3), c = l[0], v = l[1], d = l[2], p = [
      _t(s, v),
      _t(s, d)
    ], g = Yf(p), h = _o(u, p), m = h.vertical, x = h.horizontal, S = pa(u, p) <= 0;
    return {
      multiple: c,
      centerSign: S,
      verticalSign: m,
      horizontalSign: x,
      lineConstants: g,
      line: [
        _t(r, v),
        _t(r, d)
      ]
    };
  });
}
function ti(t, r, e, n) {
  var a = n ? t.map(function(i) {
    return fe(i, n);
  }) : t;
  return [
    [a[0], a[1]],
    [a[1], a[3]],
    [a[3], a[2]],
    [a[2], a[0]]
  ].some(function(i) {
    var o = pa(e, i) <= 0;
    return !Mo(r, i, o);
  });
}
function Zf(t) {
  var r = R(t, 2), e = r[0], n = r[1], a = n[0] - e[0], i = n[1] - e[1];
  if (!a)
    return B(e[0]);
  if (!i)
    return B(e[1]);
  var o = i / a;
  return B((-o * e[0] + e[1]) / Math.sqrt(Math.pow(o, 2) + 1));
}
function Kf(t) {
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
function Jf(t, r, e, n, a) {
  var i = t.props.innerBounds, o = a * Math.PI / 180;
  if (!i)
    return [];
  var s = i.left, u = i.top, f = i.width, l = i.height, c = s - n[0], v = s + f - n[0], d = u - n[1], p = u + l - n[1], g = [
    [c, d],
    [v, d],
    [c, p],
    [v, p]
  ], h = _t(e, [0, 0]);
  if (!ti(e, g, h, 0))
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
    var b = St([0, 0], Kf(S)), D = Zf(S);
    m.push.apply(m, N([], R(x.filter(function(E) {
      var y = R(E, 1), C = y[0];
      return C && D <= C;
    }).map(function(E) {
      var y = R(E, 2), C = y[0], _ = y[1], w = Math.acos(C ? D / C : 0), P = _ + w, O = _ - w;
      return [
        o + P - b,
        o + O - b
      ];
    }).reduce(function(E, y) {
      return E.push.apply(E, N([], R(y), !1)), E;
    }, []).filter(function(E) {
      return !ti(r, g, h, E);
    }).map(function(E) {
      return tt(E * 180 / Math.PI, At);
    })), !1));
  }), m;
}
function Qf(t) {
  var r = t.props.innerBounds, e = Ir();
  if (!r)
    return {
      boundMap: e,
      vertical: [],
      horizontal: []
    };
  var n = t.getRect(), a = n.pos1, i = n.pos2, o = n.pos3, s = n.pos4, u = [a, i, o, s], f = _t(u, [0, 0]), l = r.left, c = r.top, v = r.width, d = r.height, p = [[l, c], [l, c + d]], g = [[l, c], [l + v, c]], h = [[l + v, c], [l + v, c + d]], m = [[l, c + d], [l + v, c + d]], x = ga(t, u, [0, 0], !1), S = [], b = [];
  return x.forEach(function(D) {
    var E = D.line, y = D.lineConstants, C = _o(f, E), _ = C.horizontal, w = C.vertical, P = lr(E, y, g, w, 1, !0), O = lr(E, y, m, w, 1, !0), T = lr(E, y, p, _, 1, !0), I = lr(E, y, h, _, 1, !0);
    P.isBound && !e.top && (S.push(c), e.top = !0), O.isBound && !e.bottom && (S.push(c + d), e.bottom = !0), T.isBound && !e.left && (b.push(l), e.left = !0), I.isBound && !e.right && (b.push(l + v), e.right = !0);
  }), {
    boundMap: e,
    horizontal: S,
    vertical: b
  };
}
function tl(t, r, e, n) {
  var a = r[0] - t[0], i = r[1] - t[1];
  if (B(a) < Dt && (a = 0), B(i) < Dt && (i = 0), !a)
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
function Gn(t, r, e, n, a) {
  var i = tl(t, r, e, n);
  if (!i)
    return {
      isOutside: !1,
      offset: [0, 0]
    };
  var o = rr(t, r), s = rr(i, t), u = rr(i, r), f = s > o || u > o, l = R(tr({
    datas: a,
    distX: i[0],
    distY: i[1]
  }), 2), c = l[0], v = l[1];
  return {
    offset: [c, v],
    isOutside: f
  };
}
function Fe(t, r) {
  return t.isBound ? t.offset : r.isSnap ? zn(r).offset : 0;
}
function rl(t, r, e, n, a) {
  var i = R(r, 2), o = i[0], s = i[1], u = R(e, 2), f = u[0], l = u[1], c = R(n, 2), v = c[0], d = c[1], p = R(a, 2), g = p[0], h = p[1], m = -g, x = -h;
  if (t && o && s) {
    m = 0, x = 0;
    var S = [];
    if (f && l ? S.push([0, h], [g, 0]) : f ? S.push([g, 0]) : l ? S.push([0, h]) : v && d ? S.push([0, h], [g, 0]) : v ? S.push([g, 0]) : d && S.push([0, h]), S.length) {
      S.sort(function(y, C) {
        return Vt(Q([o, s], y)) - Vt(Q([o, s], C));
      });
      var b = S[0];
      if (b[0] && B(o) > Dt)
        m = -b[0], x = s * B(o + m) / B(o) - s;
      else if (b[1] && B(s) > Dt) {
        var D = s;
        x = -b[1], m = o * B(s + x) / B(D) - o;
      }
      if (t && l && f)
        if (B(m) > Dt && B(m) < B(g)) {
          var E = B(g) / B(m);
          m *= E, x *= E;
        } else if (B(x) > Dt && B(x) < B(h)) {
          var E = B(h) / B(x);
          m *= E, x *= E;
        } else
          m = Wr(-g, m), x = Wr(-h, x);
    }
  } else
    m = o || f ? -g : 0, x = s || l ? -h : 0;
  return [m, x];
}
function el(t, r, e, n, a, i) {
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
  var o = xa(i.absolutePoses, [r, e]), s = qt(o), u = s.left, f = s.right, l = s.top, c = s.bottom, v = {
    horizontal: o.map(function(I) {
      return I[1];
    }),
    vertical: o.map(function(I) {
      return I[0];
    })
  }, d = va(t.props.snapDirections), p = da(d, {
    left: u,
    right: f,
    top: l,
    bottom: c,
    center: (u + f) / 2,
    middle: (l + c) / 2
  }), g = $e(t, a, p, v), h = g.vertical, m = g.horizontal, x = Uf(t, o, i), S = x.vertical, b = x.horizontal, D = h.isSnap, E = m.isSnap, y = h.isBound || S.isBound, C = m.isBound || b.isBound, _ = Wr(h.offset, S.offset), w = Wr(m.offset, b.offset), P = R(rl(n, [r, e], [y, C], [D, E], [_, w]), 2), O = P[0], T = P[1];
  return [
    {
      isBound: y,
      isSnap: D,
      offset: O
    },
    {
      isBound: C,
      isSnap: E,
      offset: T
    }
  ];
}
function $e(t, r, e, n) {
  n === void 0 && (n = e);
  var a = ca(je(t), n.vertical, n.horizontal), i = a.horizontal, o = a.vertical, s = r ? {
    horizontal: { isSnap: !1, index: -1 },
    vertical: { isSnap: !1, index: -1 }
  } : Ue(t, e.vertical, e.horizontal, void 0, void 0, void 0, void 0), u = s.horizontal, f = s.vertical, l = Fe(i[0], u), c = Fe(o[0], f), v = B(l), d = B(c);
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
function ri(t, r, e, n, a, i, o) {
  o === void 0 && (o = [1, 1]);
  var s = ca(r, e, n), u = s.horizontal, f = s.vertical, l = yo(t, e, n, [], [], a, i, o), c = l.horizontal, v = l.vertical, d = Fe(u[0], c), p = Fe(f[0], v), g = B(d), h = B(p);
  return {
    horizontal: {
      isBound: u[0].isBound,
      isSnap: c.isSnap,
      snapIndex: c.index,
      offset: d,
      dist: g,
      bounds: u,
      snap: c
    },
    vertical: {
      isBound: f[0].isBound,
      isSnap: v.isSnap,
      snapIndex: v.index,
      offset: p,
      dist: h,
      bounds: f,
      snap: v
    }
  };
}
function nl(t, r, e, n) {
  var a = St(t, r) / Math.PI * 180, i = e.vertical, o = i.isBound, s = i.isSnap, u = i.dist, f = e.horizontal, l = f.isBound, c = f.isSnap, v = f.dist, d = a % 180, p = d < 3 || d > 177, g = d > 87 && d < 93;
  return v < u && (o || s && !g && (!n || !p)) ? "vertical" : l || c && !p && (!n || !g) ? "horizontal" : "";
}
function al(t, r, e, n, a, i) {
  return e.map(function(o) {
    var s = R(o, 2), u = s[0], f = s[1], l = _t(r, u), c = _t(r, f), v = n ? il(t, l, c, a) : $e(t, a, {
      vertical: [c[0]],
      horizontal: [c[1]]
    }), d = v.horizontal, p = d.offset, g = d.isBound, h = d.isSnap, m = v.vertical, x = m.offset, S = m.isBound, b = m.isSnap, D = Q(f, u);
    if (!x && !p)
      return {
        isBound: S || g,
        isSnap: b || h,
        sign: D,
        offset: [0, 0]
      };
    var E = nl(l, c, v, n);
    if (!E)
      return {
        sign: D,
        isBound: !1,
        isSnap: !1,
        offset: [0, 0]
      };
    var y = E === "vertical", C = [0, 0];
    return !n && B(f[0]) === 1 && B(f[1]) === 1 && u[0] !== f[0] && u[1] !== f[1] ? C = tr({
      datas: i,
      distX: -x,
      distY: -p
    }) : C = Gn(l, c, -(y ? x : p), y, i).offset, C = C.map(function(_, w) {
      return _ * (D[w] ? 2 / D[w] : 0);
    }), {
      sign: D,
      isBound: y ? S : g,
      isSnap: y ? b : h,
      offset: C
    };
  });
}
function ei(t, r) {
  return t.isBound ? t.offset : r.isSnap ? r.offset : 0;
}
function il(t, r, e, n) {
  var a = kf(t, r, e), i = a.horizontal, o = a.vertical, s = n ? {
    horizontal: { isSnap: !1 },
    vertical: { isSnap: !1 }
  } : Xf(t, r, e), u = s.horizontal, f = s.vertical, l = ei(i, u), c = ei(o, f), v = B(l), d = B(c);
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
function ol(t, r, e, n, a) {
  var i = [-e[0], -e[1]], o = t.state, s = o.width, u = o.height, f = t.props.bounds, l = 1 / 0, c = 1 / 0;
  if (f) {
    var v = [
      [e[0], -e[1]],
      [-e[0], e[1]]
    ], d = f.left, p = d === void 0 ? -1 / 0 : d, g = f.top, h = g === void 0 ? -1 / 0 : g, m = f.right, x = m === void 0 ? 1 / 0 : m, S = f.bottom, b = S === void 0 ? 1 / 0 : S;
    v.forEach(function(D) {
      var E = D[0] !== i[0], y = D[1] !== i[1], C = _t(r, D), _ = St(n, C) * 360 / Math.PI;
      if (y) {
        var w = C.slice();
        (B(_ - 360) < 2 || B(_ - 180) < 2) && (w[1] = n[1]);
        var P = Gn(n, w, (n[1] < C[1] ? b : h) - C[1], !1, a), O = R(P.offset, 2), T = O[1], I = P.isOutside;
        isNaN(T) || (c = u + (I ? 1 : -1) * B(T));
      }
      if (E) {
        var w = C.slice();
        (B(_ - 90) < 2 || B(_ - 270) < 2) && (w[0] = n[0]);
        var z = Gn(n, w, (n[0] < C[0] ? x : p) - C[0], !0, a), A = R(z.offset, 1), F = A[0], k = z.isOutside;
        isNaN(F) || (l = s + (k ? 1 : -1) * B(F));
      }
    });
  }
  return {
    maxWidth: l,
    maxHeight: c
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
    var l = Vt(f), c = St(f, [0, 0]);
    return [r.createElement("div", { className: K("line", "horizontal", "dragline", "dashed"), key: "dragRotateGuideline", style: {
      width: "".concat(l, "px"),
      transform: "translate(".concat(u[0], "px, ").concat(u[1], "px) rotate(").concat(c, "rad) scaleY(").concat(i, ")")
    } })];
  },
  dragStart: function(t, r) {
    var e = r.datas, n = r.parentEvent, a = r.parentGesto, i = t.state, o = i.gestos, s = i.style;
    if (o.draggable)
      return !1;
    o.draggable = a || t.targetGesto, e.datas = {}, e.left = parseFloat(s.left || "") || 0, e.top = parseFloat(s.top || "") || 0, e.bottom = parseFloat(s.bottom || "") || 0, e.right = parseFloat(s.right || "") || 0, e.startValue = [0, 0], Mr(t, r), Ve(t, r, "translate"), _l(t, e), e.prevDist = [0, 0], e.prevBeforeDist = [0, 0], e.isDrag = !1, e.deltaOffset = [0, 0];
    var u = nt(t, r, M({ set: function(l) {
      e.startValue = l;
    } }, qe(t, r))), f = n || U(t, "onDragStart", u);
    return f !== !1 ? (e.isDrag = !0, t.state.dragInfo = {
      startRect: t.getRect(),
      dist: [0, 0]
    }) : (o.draggable = null, e.isPinch = !1), e.isDrag ? u : !1;
  },
  drag: function(t, r) {
    if (r) {
      Ye(t, r, "translate");
      var e = r.datas, n = r.parentEvent, a = r.parentFlag, i = r.isPinch, o = r.deltaOffset, s = r.useSnap, u = r.isRequest, f = r.isGroup, l = r.parentThrottleDrag, c = r.distX, v = r.distY, d = e.isDrag, p = e.prevDist, g = e.prevBeforeDist, h = e.startValue;
      if (d) {
        o && (c += o[0], v += o[1]);
        var m = t.props, x = m.parentMoveable, S = f ? 0 : m.throttleDrag || l || 0, b = n ? 0 : m.throttleDragRotate || 0, D = 0, E = !1, y = !1, C = !1, _ = !1;
        if (!n && b > 0 && (c || v)) {
          var w = m.startDragRotate || 0, P = tt(w + St([0, 0], [c, v]) * 180 / Math.PI, b) - w, O = v * Math.abs(Math.cos((P - 90) / 180 * Math.PI)), T = c * Math.abs(Math.cos(P / 180 * Math.PI)), I = Vt([T, O]);
          D = P * Math.PI / 180, c = I * Math.cos(D), v = I * Math.sin(D);
        }
        if (!i && !n && !a) {
          var z = R(el(t, c, v, b, !s && u || o, e), 2), A = z[0], F = z[1];
          E = A.isSnap, y = A.isBound, C = F.isSnap, _ = F.isBound;
          var k = A.offset, W = F.offset;
          c += k, v += W;
        }
        var L = ft(so({ datas: e, distX: c, distY: v }), h), G = ft(mf({ datas: e, distX: c, distY: v }), h);
        La(G, At), La(L, At), b || (!E && !y && (G[0] = tt(G[0], S), L[0] = tt(L[0], S)), !C && !_ && (G[1] = tt(G[1], S), L[1] = tt(L[1], S)));
        var q = Q(L, h), V = Q(G, h), H = Q(V, p), j = Q(q, g);
        e.prevDist = V, e.prevBeforeDist = q, e.passDelta = H, e.passDist = V;
        var Y = e.left + q[0], $ = e.top + q[1], J = e.right - q[0], at = e.bottom - q[1], st = Xe(e, "translate(".concat(G[0], "px, ").concat(G[1], "px)"), "translate(".concat(V[0], "px, ").concat(V[1], "px)"));
        if (fa(r, st), t.state.dragInfo.dist = n ? [0, 0] : V, !(!n && !x && H.every(function(et) {
          return !et;
        }) && j.some(function(et) {
          return !et;
        }))) {
          var X = t.state, Z = X.width, lt = X.height, rt = nt(t, r, M({ transform: st, dist: V, delta: H, translate: G, beforeDist: q, beforeDelta: j, beforeTranslate: L, left: Y, top: $, right: J, bottom: at, width: Z, height: lt, isPinch: i }, kt({
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
      var a = Ht(t, r, {});
      return !e && U(t, "onDragEnd", a), a;
    }
  },
  dragGroupStart: function(t, r) {
    var e, n, a = r.datas, i = r.clientX, o = r.clientY, s = this.dragStart(t, r);
    if (!s)
      return !1;
    var u = fn(t, this, "dragStart", [
      i || 0,
      o || 0
    ], r, !1, "draggable"), f = u.childEvents, l = u.eventParams, c = M(M({}, s), { targets: t.props.targets, events: l }), v = U(t, "onDragGroupStart", c);
    a.isDrag = v !== !1;
    var d = (n = (e = f[0]) === null || e === void 0 ? void 0 : e.datas.startValue) !== null && n !== void 0 ? n : [0, 0];
    return a.throttleOffset = [d[0] % 1, d[1] % 1], a.isDrag ? s : !1;
  },
  dragGroup: function(t, r) {
    var e = r.datas;
    if (e.isDrag) {
      var n = this.drag(t, M(M({}, r), { parentThrottleDrag: t.props.throttleDrag })), a = r.datas.passDelta, i = fn(t, this, "drag", a, r, !1, "draggable").eventParams;
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
      var a = fn(t, this, "dragEnd", [0, 0], r, !1, "draggable").eventParams;
      return U(t, "onDragGroupEnd", Ht(t, r, {
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
function Ro(t, r) {
  var e = _t(t, r), n = [0, 0];
  return {
    fixedPosition: e,
    fixedDirection: r,
    fixedOffset: n
  };
}
function sl(t, r) {
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
function To(t, r) {
  var e = t.allMatrix, n = t.is3d, a = t.width, i = t.height, o = n ? 4 : 3, s = _f(r, a, i), u = xt(e, r, o), f = [
    a ? 0 : r[0],
    i ? 0 : r[1]
  ];
  return {
    fixedPosition: u,
    fixedDirection: s,
    fixedOffset: f
  };
}
var ni = Ea("resizable"), Bn = {
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
  render: ho("resizable"),
  dragControlCondition: ni,
  viewClassName: ba("resizable"),
  dragControlStart: function(t, r) {
    var e, n = r.inputEvent, a = r.isPinch, i = r.isGroup, o = r.parentDirection, s = r.parentGesto, u = r.datas, f = r.parentFixedDirection, l = r.parentEvent, c = Ho(o, a, n, u), v = t.state, d = v.target, p = v.width, g = v.height, h = v.gestos;
    if (!c || !d || h.resizable)
      return !1;
    h.resizable = s || t.controlGesto, !a && Mr(t, r), u.datas = {}, u.direction = c, u.startOffsetWidth = p, u.startOffsetHeight = g, u.prevWidth = 0, u.prevHeight = 0, u.minSize = [0, 0], u.startWidth = v.inlineCSSWidth || v.cssWidth, u.startHeight = v.inlineCSSHeight || v.cssHeight, u.maxSize = [1 / 0, 1 / 0], i || (u.minSize = [
      v.minOffsetWidth,
      v.minOffsetHeight
    ], u.maxSize = [
      v.maxOffsetWidth,
      v.maxOffsetHeight
    ]);
    var m = t.props.transformOrigin || "% %";
    u.transformOrigin = m && ar(m) ? m.split(" ") : m, u.startOffsetMatrix = v.offsetMatrix, u.startTransformOrigin = v.transformOrigin, u.isWidth = (e = r?.parentIsWidth) !== null && e !== void 0 ? e : !c[0] && !c[1] || c[0] || !c[1];
    function x(_) {
      u.ratio = _ && isFinite(_) ? _ : 0;
    }
    u.startPositions = jt(t.state);
    function S(_) {
      var w = Ro(u.startPositions, _);
      u.fixedDirection = w.fixedDirection, u.fixedPosition = w.fixedPosition, u.fixedOffset = w.fixedOffset;
    }
    function b(_) {
      var w = To(t.state, _);
      u.fixedDirection = w.fixedDirection, u.fixedPosition = w.fixedPosition, u.fixedOffset = w.fixedOffset;
    }
    function D(_) {
      u.minSize = [
        dt("".concat(_[0]), 0) || 0,
        dt("".concat(_[1]), 0) || 0
      ];
    }
    function E(_) {
      var w = [
        _[0] || 1 / 0,
        _[1] || 1 / 0
      ];
      (!ne(w[0]) || isFinite(w[0])) && (w[0] = dt("".concat(w[0]), 0) || 1 / 0), (!ne(w[1]) || isFinite(w[1])) && (w[1] = dt("".concat(w[1]), 0) || 1 / 0), u.maxSize = w;
    }
    x(p / g), S(f || [-c[0], -c[1]]), u.setFixedDirection = S, u.setFixedPosition = b, u.setMin = D, u.setMax = E;
    var y = nt(t, r, {
      direction: c,
      startRatio: u.ratio,
      set: function(_) {
        var w = R(_, 2), P = w[0], O = w[1];
        u.startWidth = P, u.startHeight = O;
      },
      setMin: D,
      setMax: E,
      setRatio: x,
      setFixedDirection: S,
      setFixedPosition: b,
      setOrigin: function(_) {
        u.transformOrigin = _;
      },
      dragStart: Gt.dragStart(t, new Fr().dragStart([0, 0], r))
    }), C = l || U(t, "onResizeStart", y);
    return u.startFixedDirection = u.fixedDirection, u.startFixedPosition = u.fixedPosition, C !== !1 && (u.isResize = !0, t.state.snapRenderInfo = {
      request: r.isRequest,
      direction: c
    }), u.isResize ? y : !1;
  },
  dragControl: function(t, r) {
    var e, n = r.datas, a = r.parentFlag, i = r.isPinch, o = r.parentKeepRatio, s = r.dragClient, u = r.parentDist, f = r.useSnap, l = r.isRequest, c = r.isGroup, v = r.parentEvent, d = r.resolveMatrix, p = n.isResize, g = n.transformOrigin, h = n.startWidth, m = n.startHeight, x = n.prevWidth, S = n.prevHeight, b = n.minSize, D = n.maxSize, E = n.ratio, y = n.startOffsetWidth, C = n.startOffsetHeight, _ = n.isWidth;
    if (!p)
      return;
    if (d) {
      var w = t.state.is3d, P = n.startOffsetMatrix, O = n.startTransformOrigin, T = w ? 4 : 3, I = ie(Be(r)), z = Math.sqrt(I.length);
      T !== z && (I = Kt(I, z, T));
      var A = pe(P, I, O, T), F = wr(A, y, C, T);
      n.startPositions = F, n.nextTargetMatrix = I, n.nextAllMatrix = A;
    }
    var k = _r(t.props, "resizable"), W = k.resizeFormat, L = k.throttleResize, G = L === void 0 ? a ? 0 : 1 : L, q = k.parentMoveable, V = k.keepRatioFinally, H = n.direction, j = H, Y = 0, $ = 0;
    !H[0] && !H[1] && (j = [1, 1]);
    var J = E && (o ?? k.keepRatio) || !1;
    function at() {
      var bt = n.fixedDirection, yt = Uo(j, J, n, r);
      Y = yt.distWidth, $ = yt.distHeight;
      var ir = j[0] - bt[0] || J ? Math.max(y + Y, At) : y, or = j[1] - bt[1] || J ? Math.max(C + $, At) : C;
      return J && y && C && (_ ? or = ir / E : ir = or * E), [ir, or];
    }
    var st = R(at(), 2), X = st[0], Z = st[1];
    v || (n.setFixedDirection(n.fixedDirection), U(t, "onBeforeResize", nt(t, r, {
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
    var lt = s;
    s || (!a && i ? lt = Tf(t, [0, 0]) : lt = n.fixedPosition);
    var rt = [0, 0];
    i || (rt = yl(t, X, Z, H, lt, !f && l, n)), u && (!u[0] && (rt[0] = 0), !u[1] && (rt[1] = 0));
    function et() {
      var bt;
      W && (bt = R(W([X, Z]), 2), X = bt[0], Z = bt[1]), X = tt(X, G), Z = tt(Z, G);
    }
    if (J) {
      j[0] && j[1] && rt[0] && rt[1] && (B(rt[0]) > B(rt[1]) ? rt[1] = 0 : rt[0] = 0);
      var ot = !rt[0] && !rt[1];
      ot && et(), j[0] && !j[1] || rt[0] && !rt[1] || ot && _ ? (X += rt[0], Z = X / E) : (!j[0] && j[1] || !rt[0] && rt[1] || ot && !_) && (Z += rt[1], X = Z * E);
    } else
      X += rt[0], Z += rt[1], X = Math.max(0, X), Z = Math.max(0, Z);
    e = R(Li([X, Z], b, D, J ? E : !1), 2), X = e[0], Z = e[1], et(), J && (c || V) && (_ ? Z = X / E : X = Z * E), Y = X - y, $ = Z - C;
    var vt = [Y - x, $ - S];
    n.prevWidth = Y, n.prevHeight = $;
    var gt = Rf(t, X, Z, lt, g, n);
    if (!(!q && vt.every(function(bt) {
      return !bt;
    }) && gt.every(function(bt) {
      return !bt;
    }))) {
      var it = Gt.drag(t, de(r, t.state, gt, !!i, !1, "draggable")), ct = it.transform, Mt = h + Y, It = m + $, Tt = nt(t, r, M({ width: Mt, height: It, offsetWidth: Math.round(X), offsetHeight: Math.round(Z), startRatio: E, boundingWidth: X, boundingHeight: Z, direction: H, dist: [Y, $], delta: vt, isPinch: !!i, drag: it }, Xo({
        style: {
          width: "".concat(Mt, "px"),
          height: "".concat(It, "px")
        },
        transform: ct
      }, it, r)));
      return !v && U(t, "onResize", Tt), Tt;
    }
  },
  dragControlAfter: function(t, r) {
    var e = r.datas, n = e.isResize, a = e.startOffsetWidth, i = e.startOffsetHeight, o = e.prevWidth, s = e.prevHeight;
    if (!(!n || t.props.checkResizableError === !1)) {
      var u = t.state, f = u.width, l = u.height, c = f - (a + o), v = l - (i + s), d = B(c) > 3, p = B(v) > 3;
      if (d && (e.startWidth += c, e.startOffsetWidth += c, e.prevWidth += c), p && (e.startHeight += v, e.startOffsetHeight += v, e.prevHeight += v), d || p)
        return this.dragControl(t, r);
    }
  },
  dragControlEnd: function(t, r) {
    var e = r.datas, n = r.parentEvent;
    if (e.isResize) {
      e.isResize = !1;
      var a = Ht(t, r, {});
      return !n && U(t, "onResizeEnd", a), a;
    }
  },
  dragGroupControlCondition: ni,
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
      return ke(t, d, e, p);
    });
    s(), u();
    var l = function(d) {
      n.setFixedDirection(d), f.forEach(function(p, g) {
        p.setFixedDirection(d), ke(t, p.moveable, e, a[g]);
      });
    };
    e.setFixedDirection = l;
    var c = M(M({}, n), { targets: t.props.targets, events: f.map(function(d) {
      return M(M({}, d), { setMin: function(p) {
        d.setMin(p), s();
      }, setMax: function(p) {
        d.setMax(p), u();
      } });
    }), setFixedDirection: l, setMin: function(d) {
      n.setMin(d), s();
    }, setMax: function(d) {
      n.setMax(d), u();
    } }), v = U(t, "onResizeGroupStart", c);
    return e.isResize = v !== !1, e.isResize ? n : !1;
  },
  dragGroupControl: function(t, r) {
    var e = r.datas;
    if (e.isResize) {
      var n = _r(t.props, "resizable");
      Ke(t, "onBeforeResize", function(d) {
        U(t, "onBeforeResizeGroup", nt(t, r, M(M({}, d), { targets: n.targets }), !0));
      });
      var a = this.dragControl(t, M(M({}, r), { isGroup: !0 }));
      if (a) {
        var i = a.boundingWidth, o = a.boundingHeight, s = a.dist, u = n.keepRatio, f = [
          i / (i - s[0]),
          o / (o - s[1])
        ], l = e.fixedPosition, c = er(t, this, "dragControl", r, function(d, p) {
          var g = R(Pt(le(t.rotation / 180 * Math.PI, 3), [
            p.datas.originalX * f[0],
            p.datas.originalY * f[1],
            1
          ], 3), 2), h = g[0], m = g[1];
          return M(M({}, p), { parentDist: null, parentScale: f, dragClient: ft(l, [h, m]), parentKeepRatio: u });
        }), v = M({ targets: n.targets, events: c }, a);
        return U(t, "onResizeGroup", v), v;
      }
    }
  },
  dragGroupControlEnd: function(t, r) {
    var e = r.isDrag, n = r.datas;
    if (n.isResize) {
      this.dragControlEnd(t, r);
      var a = er(t, this, "dragControlEnd", r), i = Ht(t, r, {
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
function ln(t, r, e, n, a) {
  var i = t.props.groupable, o = t.state, s = o.is3d ? 4 : 3, u = r.origin, f = xt(
    t.state.rootMatrix,
    // TO-DO #710
    Q([u[0], u[1]], i ? [0, 0] : [o.left, o.top]),
    s
  ), l = ft([a.left, a.top], f);
  r.startAbsoluteOrigin = l, r.prevDeg = St(l, [e, n]) / Math.PI * 180, r.defaultDeg = r.prevDeg, r.prevSnapDeg = 0, r.loop = 0, r.startDist = rr(l, [e, n]);
}
function Oe(t, r, e) {
  var n = e.defaultDeg, a = e.prevDeg, i = a % 360, o = Math.floor(a / 360);
  i < 0 && (i += 360), i > t && i > 270 && t < 90 ? ++o : i < t && i < 90 && t > 270 && --o;
  var s = r * (o * 360 + t - n);
  return e.prevDeg = n + s, s;
}
function cn(t, r, e, n) {
  return Oe(St(n.startAbsoluteOrigin, [t, r]) / Math.PI * 180, e, n);
}
function vn(t, r, e, n, a, i) {
  var o = t.props.throttleRotate, s = o === void 0 ? 0 : o, u = e.prevSnapDeg, f = 0, l = !1;
  if (i) {
    var c = Dl(t, r, n, a + n);
    l = c.isSnap, f = a + c.dist;
  }
  l || (f = tt(a + n, s));
  var v = f - a;
  return e.prevSnapDeg = v, [v - u, v, f];
}
function Oo(t, r, e) {
  var n = R(r, 4), a = n[0], i = n[1], o = n[2], s = n[3];
  if (t === "none")
    return [];
  if (wt(t))
    return t.map(function(h) {
      return Oo(h, [a, i, o, s], e)[0];
    });
  var u = R((t || "top").split("-"), 2), f = u[0], l = u[1], c = [a, i];
  f === "left" ? c = [o, a] : f === "right" ? c = [i, s] : f === "bottom" && (c = [s, o]);
  var v = [
    (c[0][0] + c[1][0]) / 2,
    (c[0][1] + c[1][1]) / 2
  ], d = Wo(c, e);
  if (l) {
    var p = l === "top" || l === "left", g = f === "bottom" || f === "left";
    v = c[p && !g || !p && g ? 0 : 1];
  }
  return [[v, d]];
}
function kn(t, r) {
  if (r.isRequest)
    return r.requestAble === "rotatable";
  var e = r.inputEvent.target;
  if (Ct(e, K("rotation-control")) || t.props.rotateAroundControls && Ct(e, K("around-control")) || Ct(e, K("control")) && Ct(e, K("rotatable")))
    return !0;
  var n = t.props.rotationTarget;
  return n ? Da(n, !0).some(function(a) {
    return a ? e === a || e.contains(a) : !1;
  }) : !1;
}
var ul = `.rotation {
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
`, fl = {
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
  css: [ul],
  viewClassName: function(t) {
    return t.isDragging("rotatable") ? K("view-rotation-dragging") : "";
  },
  render: function(t, r) {
    var e = _r(t.props, "rotatable"), n = e.rotatable, a = e.rotationPosition, i = e.zoom, o = e.renderDirections, s = e.rotateAroundControls, u = e.resolveAblesWithRotatable, f = t.getState(), l = f.renderPoses, c = f.direction;
    if (!n)
      return null;
    var v = Oo(a, l, c), d = [];
    if (v.forEach(function(m, x) {
      var S = R(m, 2), b = S[0], D = S[1];
      d.push(r.createElement(
        "div",
        { key: "rotation".concat(x), className: K("rotation"), style: {
          // tslint:disable-next-line: max-line-length
          transform: "translate(-50%) translate(".concat(b[0], "px, ").concat(b[1], "px) rotate(").concat(D, "rad)")
        } },
        r.createElement("div", { className: K("line rotation-line"), style: {
          transform: "scaleX(".concat(i, ")")
        } }),
        r.createElement("div", { className: K("control rotation-control"), style: {
          transform: "translate(0.5px) scale(".concat(i, ")")
        } })
      ));
    }), o) {
      var p = Yr(u || {}), g = {};
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
      })), d.push.apply(d, N([], R(vo(t, "rotatable", h, r)), !1));
    }
    return s && d.push.apply(d, N([], R(xo(t, r)), !1)), d;
  },
  dragControlCondition: kn,
  dragControlStart: function(t, r) {
    var e, n, a = r.datas, i = r.clientX, o = r.clientY, s = r.parentRotate, u = r.parentFlag, f = r.isPinch, l = r.isRequest, c = t.state, v = c.target, d = c.left, p = c.top, g = c.direction, h = c.beforeDirection, m = c.targetTransform, x = c.moveableClientRect, S = c.offsetMatrix, b = c.targetMatrix, D = c.allMatrix, E = c.width, y = c.height;
    if (!l && !v)
      return !1;
    var C = t.getRect();
    a.rect = C, a.transform = m, a.left = d, a.top = p;
    var _ = function(j) {
      var Y = To(t.state, j);
      a.fixedDirection = Y.fixedDirection, a.fixedOffset = Y.fixedOffset, a.fixedPosition = Y.fixedPosition, G && G.setFixedPosition(j);
    }, w = function(j) {
      var Y = sl(t.state, j);
      a.fixedDirection = Y.fixedDirection, a.fixedOffset = Y.fixedOffset, a.fixedPosition = Y.fixedPosition, G && G.setFixedDirection(j);
    }, P = i, O = o;
    if (l || f || u) {
      var T = s || 0;
      a.beforeInfo = {
        origin: C.beforeOrigin,
        prevDeg: T,
        defaultDeg: T,
        prevSnapDeg: 0,
        startDist: 0
      }, a.afterInfo = M(M({}, a.beforeInfo), { origin: C.origin }), a.absoluteInfo = M(M({}, a.beforeInfo), { origin: C.origin, startValue: T });
    } else {
      var I = (n = r.inputEvent) === null || n === void 0 ? void 0 : n.target;
      if (I) {
        var z = I.getAttribute("data-direction") || "", A = pf[z];
        if (A) {
          a.isControl = !0, a.isAroundControl = Ct(I, K("around-control")), a.controlDirection = A;
          var F = I.getAttribute("data-resolve");
          F && (a.resolveAble = F);
          var k = Fl(c.rootMatrix, c.renderPoses, x);
          e = R(_t(k, A), 2), P = e[0], O = e[1];
        }
      }
      a.beforeInfo = { origin: C.beforeOrigin }, a.afterInfo = { origin: C.origin }, a.absoluteInfo = {
        origin: C.origin,
        startValue: C.rotation
      };
      var W = _;
      _ = function(j) {
        var Y = c.is3d ? 4 : 3, $ = R(ft(Vi(b, Y), j), 2), J = $[0], at = $[1], st = Pt(S, Dr([J, at], Y)), X = Pt(D, Dr([j[0], j[1]], Y));
        W(j);
        var Z = c.posDelta;
        a.beforeInfo.origin = Q(st, Z), a.afterInfo.origin = Q(X, Z), a.absoluteInfo.origin = Q(X, Z), ln(t, a.beforeInfo, P, O, x), ln(t, a.afterInfo, P, O, x), ln(t, a.absoluteInfo, P, O, x);
      }, w = function(j) {
        var Y = _t([
          [0, 0],
          [E, 0],
          [0, y],
          [E, y]
        ], j);
        _(Y);
      };
    }
    a.startClientX = P, a.startClientY = O, a.direction = g, a.beforeDirection = h, a.startValue = 0, a.datas = {}, Ve(t, r, "rotate");
    var L = !1, G = !1;
    if (a.isControl && a.resolveAble) {
      var q = a.resolveAble;
      q === "resizable" && (G = Bn.dragControlStart(t, M(M({}, new Fr("resizable").dragStart([0, 0], r)), { parentPosition: a.controlPosition, parentFixedPosition: a.fixedPosition })));
    }
    G || (L = Gt.dragStart(t, new Fr().dragStart([0, 0], r))), _(Nl(t));
    var V = nt(t, r, M(M({ set: function(j) {
      a.startValue = j * Math.PI / 180;
    }, setFixedDirection: w, setFixedPosition: _ }, qe(t, r)), { dragStart: L, resizeStart: G })), H = U(t, "onRotateStart", V);
    return a.isRotate = H !== !1, c.snapRenderInfo = {
      request: r.isRequest
    }, a.isRotate ? V : !1;
  },
  dragControl: function(t, r) {
    var e, n, a, i = r.datas, o = r.clientDistX, s = r.clientDistY, u = r.parentRotate, f = r.parentFlag, l = r.isPinch, c = r.groupDelta, v = r.resolveMatrix, d = i.beforeDirection, p = i.beforeInfo, g = i.afterInfo, h = i.absoluteInfo, m = i.isRotate, x = i.startValue, S = i.rect, b = i.startClientX, D = i.startClientY;
    if (m) {
      Ye(t, r, "rotate");
      var E = hf(r), y = d * E, C = t.props.parentMoveable, _ = 0, w, P, O = 0, T, I, z = 0, A, F, k = 180 / Math.PI * x, W = h.startValue, L = !1, G = b + o, q = D + s;
      if (!f && "parentDist" in r) {
        var V = r.parentDist;
        w = V, T = V, A = V;
      } else l || f ? (w = Oe(u, d, p), T = Oe(u, y, g), A = Oe(u, y, h)) : (w = cn(G, q, d, p), T = cn(G, q, y, g), A = cn(G, q, y, h), L = !0);
      if (P = k + w, I = k + T, F = W + A, U(t, "onBeforeRotate", nt(t, r, {
        beforeRotation: P,
        rotation: I,
        absoluteRotation: F,
        setRotation: function(lt) {
          T = lt - k, w = T, A = T;
        }
      }, !0)), e = R(vn(t, S, p, w, k, L), 3), _ = e[0], w = e[1], P = e[2], n = R(vn(t, S, g, T, k, L), 3), O = n[0], T = n[1], I = n[2], a = R(vn(t, S, h, A, W, L), 3), z = a[0], A = a[1], F = a[2], !(!z && !O && !_ && !C && !v)) {
        var H = Xe(i, "rotate(".concat(I, "deg)"), "rotate(".concat(T, "deg)"));
        v && (i.fixedPosition = la(t, i.targetAllTransform, i.fixedDirection, i.fixedOffset, i));
        var j = wf(t, T, i), Y = Q(ft(c || [0, 0], j), i.prevInverseDist || [0, 0]);
        i.prevInverseDist = j, i.requestValue = null;
        var $ = fo(t, H, Y, l, r), J = $, at = rr([G, q], h.startAbsoluteOrigin) - h.startDist, st = void 0;
        if (i.resolveAble === "resizable") {
          var X = Bn.dragControl(t, M(M({}, de(r, t.state, [r.deltaX, r.deltaY], !!l, !1, "resizable")), { resolveMatrix: !0, parentDistance: at }));
          X && (st = X, J = Xo(J, X, r));
        }
        var Z = nt(t, r, M(M({ delta: O, dist: T, rotate: I, rotation: I, beforeDist: w, beforeDelta: _, beforeRotate: P, beforeRotation: P, absoluteDist: A, absoluteDelta: z, absoluteRotate: F, absoluteRotation: F, isPinch: !!l, resize: st }, $), J));
        return U(t, "onRotate", Z), Z;
      }
    }
  },
  dragControlEnd: function(t, r) {
    var e = r.datas;
    if (e.isRotate) {
      e.isRotate = !1;
      var n = Ht(t, r, {});
      return U(t, "onRotateEnd", n), n;
    }
  },
  dragGroupControlCondition: kn,
  dragGroupControlStart: function(t, r) {
    var e = r.datas, n = t.state, a = n.left, i = n.top, o = n.beforeOrigin, s = this.dragControlStart(t, r);
    if (!s)
      return !1;
    s.set(e.beforeDirection * t.rotation);
    var u = er(t, this, "dragControlStart", r, function(c, v) {
      var d = c.state, p = d.left, g = d.top, h = d.beforeOrigin, m = ft(Q([p, g], [a, i]), Q(h, o));
      return v.datas.startGroupClient = m, v.datas.groupClient = m, M(M({}, v), { parentRotate: 0 });
    }), f = M(M({}, s), { targets: t.props.targets, events: u }), l = U(t, "onRotateGroupStart", f);
    return e.isRotate = l !== !1, e.isRotate ? s : !1;
  },
  dragGroupControl: function(t, r) {
    var e = r.datas;
    if (e.isRotate) {
      Ke(t, "onBeforeRotate", function(f) {
        U(t, "onBeforeRotateGroup", nt(t, r, M(M({}, f), { targets: t.props.targets }), !0));
      });
      var n = this.dragControl(t, r);
      if (n) {
        var a = e.beforeDirection, i = n.beforeDist, o = i / 180 * Math.PI, s = er(t, this, "dragControl", r, function(f, l) {
          var c = l.datas.startGroupClient, v = R(l.datas.groupClient, 2), d = v[0], p = v[1], g = R(fe(c, o * a), 2), h = g[0], m = g[1], x = [h - d, m - p];
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
      var a = er(t, this, "dragControlEnd", r), i = Ht(t, r, {
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
function ll(t, r) {
  var e, n = t.direction, a = t.classNames, i = t.size, o = t.pos, s = t.zoom, u = t.key, f = n === "horizontal", l = f ? "Y" : "X";
  return r.createElement("div", {
    key: u,
    className: a.join(" "),
    style: (e = {}, e[f ? "width" : "height"] = "".concat(i), e.transform = "translate(".concat(o[0], ", ").concat(o[1], ") translate").concat(l, "(-50%) scale").concat(l, "(").concat(s, ")"), e)
  });
}
function ha(t, r) {
  return ll(M(M({}, t), { classNames: N([
    K("line", "guideline", t.direction)
  ], R(t.classNames), !1).filter(function(e) {
    return e;
  }), size: t.size || "".concat(t.sizeValue, "px"), pos: t.pos || t.posValue.map(function(e) {
    return "".concat(tt(e, 0.1), "px");
  }) }), r);
}
function ai(t, r, e, n, a, i, o, s) {
  var u = t.props.zoom;
  return e.map(function(f, l) {
    var c = f.type, v = f.pos, d = [0, 0];
    return d[o] = n, d[o ? 0 : 1] = -a + v, ha({
      key: "".concat(r, "TargetGuideline").concat(l),
      classNames: [K("target", "bold", c)],
      posValue: d,
      sizeValue: i,
      zoom: u,
      direction: r
    }, s);
  });
}
function ii(t, r, e, n, a, i) {
  var o = t.props, s = o.zoom, u = o.isDisplayInnerSnapDigit, f = r === "horizontal" ? dr : pr, l = a[f.start], c = a[f.end];
  return e.filter(function(v) {
    var d = v.hide, p = v.elementRect;
    if (d)
      return !1;
    if (u && p) {
      var g = p.rect;
      if (g[f.start] <= l && c <= g[f.end])
        return !1;
    }
    return !0;
  }).map(function(v, d) {
    var p = v.pos, g = v.size, h = v.element, m = v.className, x = [
      -n[0] + p[0],
      -n[1] + p[1]
    ];
    return ha({
      key: "".concat(r, "-default-guideline-").concat(d),
      classNames: h ? [K("bold"), m] : [K("normal"), m],
      direction: r,
      posValue: x,
      sizeValue: g,
      zoom: s
    }, i);
  });
}
function Ur(t, r, e, n, a, i, o, s) {
  var u, f = t.props, l = f.snapDigit, c = l === void 0 ? 0 : l, v = f.isDisplaySnapDigit, d = v === void 0 ? !0 : v, p = f.snapDistFormat, g = p === void 0 ? function(D, E) {
    return D;
  } : p, h = f.zoom, m = r === "horizontal" ? "X" : "Y", x = r === "vertical" ? "height" : "width", S = Math.abs(a), b = d ? parseFloat(S.toFixed(c)) : 0;
  return s.createElement(
    "div",
    { key: "".concat(r, "-").concat(e, "-guideline-").concat(n), className: K("guideline-group", r), style: (u = {
      left: "".concat(i[0], "px"),
      top: "".concat(i[1], "px")
    }, u[x] = "".concat(S, "px"), u) },
    ha({
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
function cl(t, r, e, n) {
  var a = t === "vertical" ? 0 : 1, i = t === "vertical" ? 1 : 0, o = a ? dr : pr, s = e[o.start], u = e[o.end];
  return qo(r, function(f) {
    return f.pos[a];
  }).map(function(f) {
    var l = [], c = [], v = [];
    return f.forEach(function(d) {
      var p, g, h = d.element, m = d.elementRect.rect;
      if (m[o.end] < s)
        l.push(d);
      else if (u < m[o.start])
        c.push(d);
      else if (m[o.start] <= s && u <= m[o.end] && n) {
        var x = d.pos, S = { element: h, rect: M(M({}, m), (p = {}, p[o.end] = m[o.start], p)) }, b = { element: h, rect: M(M({}, m), (g = {}, g[o.start] = m[o.end], g)) }, D = [0, 0], E = [0, 0];
        D[a] = x[a], D[i] = x[i], E[a] = x[a], E[i] = x[i] + d.size, l.push({
          type: t,
          pos: D,
          size: 0,
          elementRect: S,
          direction: "",
          elementDirection: "end"
        }), c.push({
          type: t,
          pos: E,
          size: 0,
          elementRect: b,
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
function vl(t, r, e, n, a) {
  var i = t.props.isDisplayInnerSnapDigit, o = [];
  return ["vertical", "horizontal"].forEach(function(s) {
    var u = r.filter(function(h) {
      return h.type === s;
    }), f = s === "vertical" ? 1 : 0, l = f ? 0 : 1, c = cl(s, u, n, i), v = f ? pr : dr, d = f ? dr : pr, p = n[v.start], g = n[v.end];
    c.forEach(function(h) {
      var m = h.total, x = h.start, S = h.end, b = h.inner, D = e[l] + m[0].pos[l] - n[d.start], E = n;
      x.forEach(function(y) {
        var C = y.elementRect.rect, _ = E[v.start] - C[v.end];
        if (_ > 0) {
          var w = [0, 0];
          w[f] = e[f] + E[v.start] - p - _, w[l] = D, o.push(Ur(t, s, "dashed", o.length, _, w, y.className, a));
        }
        E = C;
      }), E = n, S.forEach(function(y) {
        var C = y.elementRect.rect, _ = C[v.start] - E[v.end];
        if (_ > 0) {
          var w = [0, 0];
          w[f] = e[f] + E[v.end] - p, w[l] = D, o.push(Ur(t, s, "dashed", o.length, _, w, y.className, a));
        }
        E = C;
      }), b.forEach(function(y) {
        var C = y.elementRect.rect, _ = p - C[v.start], w = C[v.end] - g, P = [0, 0], O = [0, 0];
        P[f] = e[f] - _, P[l] = D, O[f] = e[f] + g - p, O[l] = D, o.push(Ur(t, s, "dashed", o.length, _, P, y.className, a)), o.push(Ur(t, s, "dashed", o.length, w, O, y.className, a));
      });
    });
  }), o;
}
function dl(t, r, e, n, a) {
  var i = [];
  return ["horizontal", "vertical"].forEach(function(o) {
    var s = r.filter(function(h) {
      return h.type === o;
    }).slice(0, 1), u = o === "vertical" ? 0 : 1, f = u ? 0 : 1, l = u ? pr : dr, c = u ? dr : pr, v = n[l.start], d = n[l.end], p = n[c.start], g = n[c.end];
    s.forEach(function(h) {
      var m = h.gap, x = h.gapRects, S = Math.max.apply(Math, N([p], R(x.map(function(E) {
        var y = E.rect;
        return y[c.start];
      })), !1)), b = Math.min.apply(Math, N([g], R(x.map(function(E) {
        var y = E.rect;
        return y[c.end];
      })), !1)), D = (S + b) / 2;
      S === b || D === (p + g) / 2 || x.forEach(function(E) {
        var y = E.rect, C = E.className, _ = [e[0], e[1]];
        if (y[l.end] < v)
          _[u] += y[l.end] - v;
        else if (d < y[l.start])
          _[u] += y[l.start] - v - m;
        else
          return;
        _[f] += D - p, i.push(Ur(t, u ? "vertical" : "horizontal", "gap", i.length, m, _, C, a));
      });
    });
  }), i;
}
function An(t) {
  var r, e, n = t.state, a = n.containerClientRect, i = n.hasFixed, o = a.overflow, s = a.scrollHeight, u = a.scrollWidth, f = a.clientHeight, l = a.clientWidth, c = a.clientLeft, v = a.clientTop, d = t.props, p = d.snapGap, g = p === void 0 ? !0 : p, h = d.verticalGuidelines, m = d.horizontalGuidelines, x = d.snapThreshold, S = x === void 0 ? 5 : x, b = d.maxSnapElementGuidelineDistance, D = b === void 0 ? 1 / 0 : b, E = d.isDisplayGridGuidelines, y = qt(jt(t.state)), C = y.top, _ = y.left, w = y.bottom, P = y.right, O = { top: C, left: _, bottom: w, right: P, center: (_ + P) / 2, middle: (C + w) / 2 }, T = ml(t), I = N([], R(T), !1), z = ((e = (r = n.snapThresholdInfo) === null || r === void 0 ? void 0 : r.multiples) !== null && e !== void 0 ? e : [1, 1]).map(function(W) {
    return W * S;
  });
  g && I.push.apply(I, N([], R(pl(t, O, z)), !1));
  var A = M({}, n.snapOffset || {
    left: 0,
    top: 0,
    bottom: 0,
    right: 0
  });
  if (I.push.apply(I, N([], R(hl(t, o ? u : l, o ? s : f, c, v, A, E)), !1)), i) {
    var F = a.left, k = a.top;
    A.left += F, A.top += k, A.right += F, A.bottom += k;
  }
  return I.push.apply(I, N([], R(Io(m || !1, h || !1, o ? u : l, o ? s : f, c, v, A)), !1)), I = I.filter(function(W) {
    var L = W.element, G = W.elementRect, q = W.type;
    if (!L || !G)
      return !0;
    var V = G.rect;
    return Po(O, V, q, D);
  }), I;
}
function pl(t, r, e) {
  var n = t.props, a = n.maxSnapElementGuidelineDistance, i = a === void 0 ? 1 / 0 : a, o = n.maxSnapElementGapDistance, s = o === void 0 ? 1 / 0 : o, u = t.state.elementRects, f = [];
  return [
    ["vertical", dr, pr],
    ["horizontal", pr, dr]
  ].forEach(function(l) {
    var c = R(l, 3), v = c[0], d = c[1], p = c[2], g = r[d.start], h = r[d.end], m = r[d.center], x = r[p.start], S = r[p.end], b = {
      left: e[0],
      top: e[1]
    };
    function D(C) {
      var _ = C.rect, w = b[d.start];
      return _[d.end] < g + w ? g - _[d.end] : h - w < _[d.start] ? _[d.start] - h : -1;
    }
    var E = u.filter(function(C) {
      var _ = C.rect;
      return _[p.start] > S || _[p.end] < x ? !1 : D(C) > 0;
    }).sort(function(C, _) {
      return D(C) - D(_);
    }), y = [];
    E.forEach(function(C) {
      E.forEach(function(_) {
        if (C !== _) {
          var w = C.rect, P = _.rect, O = w[p.start], T = w[p.end], I = P[p.start], z = P[p.end];
          O > z || I > T || y.push([C, _]);
        }
      });
    }), y.forEach(function(C) {
      var _ = R(C, 2), w = _[0], P = _[1], O = w.rect, T = P.rect, I = O[d.start], z = O[d.end], A = T[d.start], F = T[d.end], k = b[d.start], W = 0, L = 0, G = !1, q = !1, V = !1;
      if (z <= g && h <= A) {
        if (q = !0, W = (A - z - (h - g)) / 2, L = z + W + (h - g) / 2, B(L - m) > k)
          return;
      } else if (z < A && F < g + k) {
        if (G = !0, W = A - z, L = F + W, B(L - g) > k)
          return;
      } else if (z < A && h - k < I) {
        if (V = !0, W = A - z, L = I - W, B(L - h) > k)
          return;
      } else
        return;
      W && Po(r, T, v, i) && (W > s || f.push({
        type: v,
        pos: v === "vertical" ? [L, 0] : [0, L],
        element: P.element,
        size: 0,
        className: P.className,
        isStart: G,
        isCenter: q,
        isEnd: V,
        gap: W,
        hide: !0,
        gapRects: [w, P],
        direction: "",
        elementDirection: ""
      }));
    });
  }), f;
}
function gl(t, r, e, n) {
  var a, i, o = t.props, s = t.state, u = o.snapGridAll, f = o.snapGridWidth, l = f === void 0 ? 0 : f, c = o.snapGridHeight, v = c === void 0 ? 0 : c, d = s.snapRenderInfo, p = d && (((a = d.direction) === null || a === void 0 ? void 0 : a[0]) || ((i = d.direction) === null || i === void 0 ? void 0 : i[1])), g = t.moveables;
  if (u && g && p && (l || v)) {
    if (s.snapThresholdInfo)
      return;
    s.snapThresholdInfo = {
      multiples: [1, 1],
      offset: [0, 0]
    };
    var h = t.getRect(), m = h.children, x = d.direction;
    if (m) {
      var S = x.map(function(D, E) {
        var y = E === 0 ? {
          snapSize: l,
          posName: "left",
          sizeName: "width",
          clientOffset: n.left - r
        } : {
          snapSize: v,
          posName: "top",
          sizeName: "height",
          clientOffset: n.top - e
        }, C = y.snapSize, _ = y.posName, w = y.sizeName, P = y.clientOffset;
        if (!C)
          return {
            dir: D,
            multiple: 1,
            snapSize: C,
            snapOffset: 0
          };
        var O = h[w], T = h[_], I = su(m.map(function(G) {
          return [
            G[_] - T,
            G[w],
            O - G[w] - G[_] + T
          ];
        })).filter(function(G) {
          return G;
        }).sort(function(G, q) {
          return G - q;
        }), z = I[0], A = I.map(function(G) {
          return tt(G / z, 0.1) * C;
        }), F = 1, k = tt(O / z, 0.1);
        for (F = 1; F <= 10 && !A.every(function(G) {
          return G * F % 1 === 0;
        }); ++F)
          ;
        var W = (-D + 1) / 2, L = Ie(T - P, T - P + O, W, 1 - W);
        return {
          multiple: k * F,
          dir: D,
          snapSize: C,
          snapOffset: Math.round(L / C)
        };
      }), b = S.map(function(D) {
        return D.multiple || 1;
      });
      s.snapThresholdInfo.multiples = b, s.snapThresholdInfo.offset = S.map(function(D) {
        return D.snapOffset;
      }), S.forEach(function(D, E) {
        D.snapSize;
      });
    }
  } else
    s.snapThresholdInfo = null;
}
function hl(t, r, e, n, a, i, o) {
  n === void 0 && (n = 0), a === void 0 && (a = 0);
  var s = t.props, u = t.state, f = s.snapGridWidth, l = f === void 0 ? 0 : f, c = s.snapGridHeight, v = c === void 0 ? 0 : c, d = [], p = i.left, g = i.top, h = [0, 0];
  gl(t, n, a, i);
  var m = u.snapThresholdInfo, x = l, S = v;
  if (m && (l *= m.multiples[0] || 1, v *= m.multiples[1] || 1, h = m.offset), v) {
    for (var b = function(E) {
      d.push({
        type: "horizontal",
        pos: [
          p,
          tt(h[1] * S + E - a + g, 0.1)
        ],
        className: K("grid-guideline"),
        size: r,
        hide: !o,
        direction: "",
        grid: !0
      });
    }, D = 0; D <= e * 2; D += v)
      b(D);
    for (var D = -v; D >= -e; D -= v)
      b(D);
  }
  if (l) {
    for (var b = function(y) {
      d.push({
        type: "vertical",
        pos: [
          tt(h[0] * x + y - n + p, 0.1),
          g
        ],
        className: K("grid-guideline"),
        size: e,
        hide: !o,
        direction: "",
        grid: !0
      });
    }, D = 0; D <= r * 2; D += l)
      b(D);
    for (var D = -l; D >= -r; D -= l)
      b(D);
  }
  return d;
}
function Po(t, r, e, n) {
  return e === "horizontal" ? B(t.right - r.left) <= n || B(t.left - r.right) <= n || t.left <= r.right && r.left <= t.right : e === "vertical" ? B(t.bottom - r.top) <= n || B(t.top - r.bottom) <= n || t.top <= r.bottom && r.top <= t.bottom : !0;
}
function ml(t) {
  var r = t.state, e = t.props.elementGuidelines, n = e === void 0 ? [] : e;
  if (!n.length)
    return r.elementRects = [], [];
  var a = (r.elementRects || []).filter(function(v) {
    return !v.refresh;
  }), i = n.map(function(v) {
    return Zt(v) && "element" in v ? M(M({}, v), { element: Jt(v.element, !0) }) : {
      element: Jt(v, !0)
    };
  }).filter(function(v) {
    return v.element;
  }), o = wu(a.map(function(v) {
    return v.element;
  }), i.map(function(v) {
    return v.element;
  })), s = o.maintained, u = o.added, f = [];
  s.forEach(function(v) {
    var d = R(v, 2), p = d[0], g = d[1];
    f[g] = a[p];
  }), xl(t, u.map(function(v) {
    return i[v];
  })).map(function(v, d) {
    f[u[d]] = v;
  }), r.elementRects = f;
  var l = va(t.props.elementSnapDirections), c = [];
  return f.forEach(function(v) {
    var d = v.element, p = v.top, g = p === void 0 ? l.top : p, h = v.left, m = h === void 0 ? l.left : h, x = v.right, S = x === void 0 ? l.right : x, b = v.bottom, D = b === void 0 ? l.bottom : b, E = v.center, y = E === void 0 ? l.center : E, C = v.middle, _ = C === void 0 ? l.middle : C, w = v.className, P = v.rect, O = da({
      top: g,
      right: S,
      left: m,
      bottom: D,
      center: y,
      middle: _
    }, P), T = O.horizontal, I = O.vertical, z = O.horizontalNames, A = O.verticalNames, F = P.top, k = P.left, W = P.right - k, L = P.bottom - F, G = [W, L];
    I.forEach(function(q, V) {
      c.push({
        type: "vertical",
        element: d,
        pos: [
          tt(q, 0.1),
          F
        ],
        size: L,
        sizes: G,
        className: w,
        elementRect: v,
        elementDirection: Za[A[V]] || A[V],
        direction: ""
      });
    }), T.forEach(function(q, V) {
      c.push({
        type: "horizontal",
        element: d,
        pos: [
          k,
          tt(q, 0.1)
        ],
        size: W,
        sizes: G,
        className: w,
        elementRect: v,
        elementDirection: Za[z[V]] || z[V],
        direction: ""
      });
    });
  }), c;
}
function oi(t, r) {
  return t ? t.map(function(e) {
    var n = Zt(e) ? e : { pos: e }, a = n.pos;
    return ne(a) ? n : M(M({}, n), { pos: dt(a, r) });
  }) : [];
}
function Io(t, r, e, n, a, i, o) {
  a === void 0 && (a = 0), i === void 0 && (i = 0), o === void 0 && (o = { left: 0, top: 0, right: 0, bottom: 0 });
  var s = [], u = o.left, f = o.top, l = o.bottom, c = o.right, v = e + c - u, d = n + l - f;
  return oi(t, d).forEach(function(p) {
    s.push({
      type: "horizontal",
      pos: [
        u,
        tt(p.pos - i + f, 0.1)
      ],
      size: v,
      className: p.className,
      direction: ""
    });
  }), oi(r, v).forEach(function(p) {
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
function xl(t, r) {
  if (!r.length)
    return [];
  var e = t.props.groupable, n = t.state, a = n.containerClientRect, i = n.rootMatrix, o = n.is3d, s = n.offsetDelta, u = o ? 4 : 3, f = R(Hf(i, a, u), 2), l = f[0], c = f[1], v = e ? 0 : s[0], d = e ? 0 : s[1];
  return r.map(function(p) {
    var g = p.element.getBoundingClientRect(), h = g.left - l - v, m = g.top - c - d, x = m + g.height, S = h + g.width, b = R(Lr(i, [h, m], u), 2), D = b[0], E = b[1], y = R(Lr(i, [S, x], u), 2), C = y[0], _ = y[1];
    return M(M({}, p), { rect: {
      left: D,
      right: C,
      top: E,
      bottom: _,
      center: (D + C) / 2,
      middle: (E + _) / 2
    } });
  });
}
function Ce(t) {
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
      var s = te(o), u = vi(r, [
        s.left - a.left,
        s.top - a.top
      ]), f = vi(r, [
        s.right - a.right,
        s.bottom - a.bottom
      ]);
      i.left = tt(u[0], 1e-5), i.top = tt(u[1], 1e-5), i.right = tt(f[0], 1e-5), i.bottom = tt(f[1], 1e-5);
    }
  }
  return r.snapContainer = n, r.snapOffset = i, r.guidelines = An(t), r.enableSnap = !0, !0;
}
function zo(t, r, e, n, a, i) {
  var o = wr(t, r, e, i ? 4 : 3), s = _t(o, n);
  return xa(o, Q(a, s));
}
function si(t) {
  return t ? t / B(t) : 0;
}
function Sl(t, r, e, n, a, i) {
  var o = i.fixedDirection, s = Vf(e, o, n), u = ga(t, r, e, n), f = N(N([], R(al(t, r, s, n, a, i)), !1), R(wo(t, u, i)), !1), l = Ae(f, 0), c = Ae(f, 1);
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
function bl(t, r, e, n, a, i, o, s, u) {
  var f = _t(r, o), l = $e(t, s, {
    vertical: [f[0]],
    horizontal: [f[1]]
  }), c = l.horizontal.offset, v = l.vertical.offset;
  if (tt(v, On) || tt(c, On)) {
    var d = R(tr({
      datas: u,
      distX: -v,
      distY: -c
    }), 2), p = d[0], g = d[1], h = Math.min(a || 1 / 0, e + o[0] * p), m = Math.min(i || 1 / 0, n + o[1] * g);
    return [h - e, m - n];
  }
  return [0, 0];
}
function Go(t, r, e, n, a, i, o, s) {
  for (var u = jt(t.state), f = t.props.keepRatio, l = 0, c = 0, v = 0; v < 2; ++v) {
    var d = r(l, c), p = Sl(t, d, a, f, o, s), g = p.width, h = p.height, m = g.isBound, x = h.isBound, S = g.offset, b = h.offset;
    if (v === 1 && (m || (S = 0), x || (b = 0)), v === 0 && o && !m && !x)
      return [0, 0];
    if (f) {
      var D = B(S) * (e ? 1 / e : 1), E = B(b) * (n ? 1 / n : 1), y = m && x ? D < E : x || !m && D < E;
      y ? S = e * b / n : b = n * S / e;
    }
    l += S, c += b;
  }
  if (!f && a[0] && a[1]) {
    var C = ol(t, u, a, i, s), _ = C.maxWidth, w = C.maxHeight, P = R(bl(t, r(l, c).map(function(I) {
      return I.map(function(z) {
        return tt(z, On);
      });
    }), e + l, n + c, _, w, a, o, s), 2), S = P[0], b = P[1];
    l += S, c += b;
  }
  return [l, c];
}
function Jr(t) {
  return t < 0 && (t = t % 360 + 360), t %= 360, t;
}
function El(t, r) {
  r = Jr(r);
  var e = Math.floor(t / 360), n = e * 360 + 360 - r, a = e * 360 + r;
  return B(t - n) < B(t - a) ? n : a;
}
function dn(t, r) {
  t = Jr(t), r = Jr(r);
  var e = Jr(t - r);
  return Math.min(e, 360 - e);
}
function Dl(t, r, e, n) {
  var a, i = t.props, o = (a = i[So]) !== null && a !== void 0 ? a : 5, s = i[bo];
  if (Vr(t, "rotatable")) {
    var u = r.pos1, f = r.pos2, l = r.pos3, c = r.pos4, v = r.origin, d = e * Math.PI / 180, p = [u, f, l, c].map(function(b) {
      return Q(b, v);
    }), g = p.map(function(b) {
      return fe(b, d);
    }), h = N(N([], R(Ff(t, p, g, v, e)), !1), R(Jf(t, p, g, v, e)), !1);
    h.sort(function(b, D) {
      return B(b - e) - B(D - e);
    });
    var m = h.length > 0;
    if (m)
      return {
        isSnap: m,
        dist: m ? h[0] : e
      };
  }
  if (s?.length && o) {
    var x = s.slice().sort(function(b, D) {
      return dn(b, n) - dn(D, n);
    }), S = x[0];
    if (dn(S, n) <= o)
      return {
        isSnap: !0,
        dist: e + El(n, S) - n
      };
  }
  return {
    isSnap: !1,
    dist: e
  };
}
function yl(t, r, e, n, a, i, o) {
  if (!Vr(t, "resizable"))
    return [0, 0];
  var s = o.fixedDirection, u = o.nextAllMatrix, f = t.state, l = f.allMatrix, c = f.is3d;
  return Go(t, function(v, d) {
    return zo(u || l, r + v, e + d, s, a, c);
  }, r, e, n, a, i, o);
}
function Cl(t, r, e, n, a) {
  if (!Vr(t, "scalable"))
    return [0, 0];
  var i = a.startOffsetWidth, o = a.startOffsetHeight, s = a.fixedPosition, u = a.fixedDirection, f = a.is3d, l = Go(t, function(c, v) {
    return zo(yf(a, ft(r, [c / i, v / o])), i, o, u, s, f);
  }, i, o, e, s, n, a);
  return [l[0] / i, l[1] / o];
}
function _l(t, r) {
  r.absolutePoses = jt(t.state);
}
function ui(t) {
  var r = [];
  return t.forEach(function(e) {
    e.guidelineInfos.forEach(function(n) {
      var a = n.guideline;
      Lt(r, function(i) {
        return i.guideline === a;
      }) || (a.direction = "", r.push({ guideline: a, posInfo: e }));
    });
  }), r.map(function(e) {
    var n = e.guideline, a = e.posInfo;
    return M(M({}, n), { direction: a.direction });
  });
}
function fi(t, r, e, n, a, i) {
  var o = ca(je(t, i), r, e), s = o.vertical, u = o.horizontal, f = Ir();
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
  var l = Qf(t), c = l.boundMap, v = l.vertical, d = l.horizontal;
  return v.forEach(function(p) {
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
    innerBoundMap: c
  };
}
var Ml = Ea("", ["resizable", "scalable"]), wl = {
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
    So,
    bo,
    Eo,
    Do,
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
    if (!f || !f.render || !Vr(t, ""))
      return Gr(t, "boundMap", Ir(), function(H) {
        return JSON.stringify(H);
      }), Gr(t, "innerBoundMap", Ir(), function(H) {
        return JSON.stringify(H);
      }), [];
    e.guidelines = An(t);
    var v = Math.min(i[0], o[0], s[0], u[0]), d = Math.min(i[1], o[1], s[1], u[1]), p = f.externalPoses || [], g = jt(t.state), h = [], m = [], x = [], S = [], b = [], D = qt(g), E = D.width, y = D.height, C = D.top, _ = D.left, w = D.bottom, P = D.right, O = { left: _, right: P, top: C, bottom: w, center: (_ + P) / 2, middle: (C + w) / 2 }, T = p.length > 0, I = T ? qt(p) : {};
    if (!f.request) {
      if (f.direction && b.push(qf(t, g, f.direction, c, c)), f.snap) {
        var z = qt(g);
        f.center && (z.middle = (z.top + z.bottom) / 2, z.center = (z.left + z.right) / 2), b.push(Ka(t, z, c, c));
      }
      T && (f.center && (I.middle = (I.top + I.bottom) / 2, I.center = (I.left + I.right) / 2), b.push(Ka(t, I, c, c))), b.forEach(function(H) {
        var j = H.vertical.posInfos, Y = H.horizontal.posInfos;
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
        })), !1)), x.push.apply(x, N([], R(ui(j)), !1)), S.push.apply(S, N([], R(ui(Y)), !1));
      });
    }
    var A = fi(t, [_, P], [C, w], h, m), F = A.boundMap, k = A.innerBoundMap;
    T && fi(t, [I.left, I.right], [I.top, I.bottom], h, m, f.externalBounds);
    var W = N(N([], R(x), !1), R(S), !1), L = W.filter(function(H) {
      return H.element && !H.gapRects;
    }), G = W.filter(function(H) {
      return H.gapRects;
    }).sort(function(H, j) {
      return H.gap - j.gap;
    });
    U(t, "onSnap", {
      guidelines: W.filter(function(H) {
        var j = H.element;
        return !j;
      }),
      elements: L,
      gaps: G
    }, !0);
    var q = Gr(t, "boundMap", F, function(H) {
      return JSON.stringify(H);
    }, Ir()), V = Gr(t, "innerBoundMap", k, function(H) {
      return JSON.stringify(H);
    }, Ir());
    return (F === q || k === V) && U(t, "onBound", {
      bounds: F,
      innerBounds: k
    }, !0), N(N(N(N(N(N([], R(vl(t, L, [v, d], O, r)), !1), R(dl(t, G, [v, d], O, r)), !1), R(ii(t, "horizontal", S, [a, n], O, r)), !1), R(ii(t, "vertical", x, [a, n], O, r)), !1), R(ai(t, "horizontal", m, v, n, E, 0, r)), !1), R(ai(t, "vertical", h, d, a, y, 1, r)), !1);
  },
  dragStart: function(t, r) {
    t.state.snapRenderInfo = {
      request: r.isRequest,
      snap: !0,
      center: !0
    }, Ce(t);
  },
  drag: function(t) {
    var r = t.state;
    Ce(t) || (r.guidelines = An(t)), r.snapRenderInfo && (r.snapRenderInfo.render = !0);
  },
  pinchStart: function(t) {
    this.unset(t);
  },
  dragEnd: function(t) {
    this.unset(t);
  },
  dragControlCondition: function(t, r) {
    if (Ml(t, r) || kn(t, r))
      return !0;
    if (!r.isRequest && r.inputEvent)
      return Ct(r.inputEvent.target, K("snap-control"));
  },
  dragControlStart: function(t) {
    t.state.snapRenderInfo = null, Ce(t);
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
    t.state.snapRenderInfo = null, Ce(t);
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
function Rl(t, r) {
  return [
    t[0] * r[0],
    t[1] * r[1]
  ];
}
function K() {
  for (var t = [], r = 0; r < arguments.length; r++)
    t[r] = arguments[r];
  return Xs.apply(void 0, N([sa], R(t), !1));
}
function Bo(t) {
  t();
}
function Tl(t) {
  return !t || t === "none" ? [1, 0, 0, 1, 0, 0] : Zt(t) ? t : ie(t);
}
function Qr(t, r, e) {
  return ze(r, yr(e, r), t, yr(e.map(function(n) {
    return -n;
  }), r));
}
function Ol(t, r, e) {
  if (r === "%") {
    var n = ma(t.ownerSVGElement);
    return n[e ? "width" : "height"] / 100;
  }
  return 1;
}
function Pl(t) {
  var r = Il(Sa(t, ":before"));
  return r.map(function(e, n) {
    var a = ue(e), i = a.value, o = a.unit;
    return i * Ol(t, o, n === 0);
  });
}
function Ne(t) {
  return t ? t.split(" ") : ["0", "0"];
}
function Il(t) {
  return Ne(t.transformOrigin);
}
function ko(t) {
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
      o.push("matrix(".concat(["a", "b", "c", "d", "e", "f"].map(function(c) {
        return l[c];
      }).join(", "), ")"));
    }, u = 0; u < i; ++u)
      s(u);
    return o.join(" ");
  }
  return "";
}
function se(t, r, e, n, a) {
  var i, o, s = Qn(t) || gr(t), u = !1, f, l;
  if (!t || e)
    f = t;
  else {
    var c = (i = t?.assignedSlot) === null || i === void 0 ? void 0 : i.parentElement, v = t.parentElement;
    c ? (u = !0, l = v, f = c) : f = v;
  }
  for (var d = !1, p = t === r || f === r, g = "relative", h = 1, m = parseFloat(a?.("zoom")) || 1, x = a?.("position"); f && f !== s; ) {
    r === f && (p = !0);
    var S = Nt(f), b = f.tagName.toLowerCase(), D = ko(f), E = S("willChange"), y = parseFloat(S("zoom")) || 1;
    if (g = S("position"), n && y !== 1) {
      h = y;
      break;
    }
    if (
      // offsetParent is the parentElement if the target's zoom is not 1 and not absolute.
      !e && n && m !== 1 && x && x !== "absolute" || b === "svg" || b === "foreignobject" || g !== "static" || D && D !== "none" || E === "transform"
    )
      break;
    var C = (o = t?.assignedSlot) === null || o === void 0 ? void 0 : o.parentNode, _ = f.parentNode;
    C && (u = !0, l = _);
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
function zl(t, r) {
  var e, n = t.tagName.toLowerCase(), a = t.offsetLeft, i = t.offsetTop, o = Nt(t), s = Un(a), u = !s, f, l;
  return !u && (n !== "svg" || t.ownerSVGElement) ? (f = ro ? Pl(t) : Ne(o("transformOrigin")).map(function(c) {
    return parseFloat(c);
  }), l = f.slice(), u = !0, n === "svg" ? (a = 0, i = 0) : (e = R(kl(t, f, t === r && r.tagName.toLowerCase() === "g"), 4), a = e[0], i = e[1], f[0] = e[2], f[1] = e[3])) : (f = Ne(o("transformOrigin")).map(function(c) {
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
function Ao(t, r) {
  var e = Nt(t), n = Nt(gr(t)), a = n("position");
  if (!r && (!a || a === "static"))
    return [0, 0];
  var i = parseInt(n("marginLeft"), 10), o = parseInt(n("marginTop"), 10);
  return e("position") === "absolute" && ((e("top") !== "auto" || e("bottom") !== "auto") && (o = 0), (e("left") !== "auto" || e("right") !== "auto") && (i = 0)), [i, o];
}
function Fn(t) {
  t.forEach(function(r) {
    var e = r.matrix;
    e && (r.matrix = Kt(e, 3, 4));
  });
}
function Gl(t) {
  for (var r = t.parentElement, e = !1, n = gr(t); r; ) {
    var a = Sa(r).transform;
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
function Ze(t, r) {
  return r === void 0 && (r = t.length > 9), "".concat(r ? "matrix3d" : "matrix", "(").concat(ji(t, !r).join(","), ")");
}
function ma(t) {
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
function Bl(t, r) {
  var e, n = ma(t), a = n.width, i = n.height, o = n.clientWidth, s = n.clientHeight, u = o / a, f = s / i, l = t.preserveAspectRatio.baseVal, c = l.align, v = l.meetOrSlice, d = [0, 0], p = [u, f], g = [0, 0];
  if (c !== 1) {
    var h = (c - 2) % 3, m = Math.floor((c - 2) / 3);
    d[0] = a * h / 2, d[1] = i * m / 2;
    var x = v === 2 ? Math.max(f, u) : Math.min(u, f);
    p[0] = x, p[1] = x, g[0] = (o - a) / 2 * h, g[1] = (s - i) / 2 * m;
  }
  var S = ra(p, r);
  return e = R(g, 2), S[r * (r - 1)] = e[0], S[r * (r - 1) + 1] = e[1], Qr(S, r, d);
}
function kl(t, r, e) {
  var n = t.tagName.toLowerCase();
  if (!t.getBBox || !e && n === "g")
    return [0, 0, 0, 0];
  var a = Nt(t), i = a("transform-box") === "fill-box", o = t.getBBox(), s = ma(t.ownerSVGElement), u = o.x, f = o.y;
  n === "foreignobject" && !u && !f && (u = parseFloat(t.getAttribute("x")) || 0, f = parseFloat(t.getAttribute("y")) || 0);
  var l = u - s.x, c = f - s.y, v = i ? r[0] : r[0] - l, d = i ? r[1] : r[1] - c;
  return [l, c, v, d];
}
function xt(t, r, e) {
  return Pt(t, Dr(r, e), e);
}
function wr(t, r, e, n) {
  return [[0, 0], [r, 0], [0, e], [r, e]].map(function(a) {
    return xt(t, a, n);
  });
}
function qt(t) {
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
function li(t, r, e, n) {
  var a = wr(t, r, e, n);
  return qt(a);
}
function Al(t, r, e, n, a) {
  var i, o = t.target, s = t.origin, u = r.matrix, f = No(o), l = f.offsetWidth, c = f.offsetHeight, v = e.getBoundingClientRect(), d = [0, 0];
  e === gr(e) && (d = Ao(o, !0));
  for (var p = o.getBoundingClientRect(), g = p.left - v.left + e.scrollLeft - (e.clientLeft || 0) + d[0], h = p.top - v.top + e.scrollTop - (e.clientTop || 0) + d[1], m = p.width, x = p.height, S = ze(n, a, u), b = li(S, l, c, n), D = b.left, E = b.top, y = b.width, C = b.height, _ = xt(S, s, n), w = Q(_, [D, E]), P = [
    g + w[0] * m / y,
    h + w[1] * x / C
  ], O = [0, 0], T = 0; ++T < 10; ) {
    var I = Qt(a, n);
    i = R(Q(xt(I, P, n), xt(I, _, n)), 2), O[0] = i[0], O[1] = i[1];
    var z = ze(n, a, yr(O, n), u), A = li(z, l, c, n), F = A.left, k = A.top, W = F - g, L = k - h;
    if (B(W) < 2 && B(L) < 2)
      break;
    P[0] -= W, P[1] -= L;
  }
  return O.map(function(G) {
    return Math.round(G);
  });
}
function Fl(t, r, e) {
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
function Fo(t, r) {
  return Vt([
    r[0] - t[0],
    r[1] - t[1]
  ]);
}
function $r(t, r, e, n) {
  e === void 0 && (e = 1), n === void 0 && (n = St(t, r));
  var a = Fo(t, r);
  return {
    transform: "translateY(-50%) translate(".concat(t[0], "px, ").concat(t[1], "px) rotate(").concat(n, "rad) scaleY(").concat(e, ")"),
    width: "".concat(a, "px")
  };
}
function We(t, r) {
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
function _r(t, r) {
  var e = t[r];
  return Zt(e) ? M(M({}, t), e) : t;
}
function No(t) {
  var r = t && !Un(t.offsetWidth), e = 0, n = 0, a = 0, i = 0, o = 0, s = 0, u = 0, f = 0, l = 0, c = 0, v = 0, d = 0, p = 1 / 0, g = 1 / 0, h = 1 / 0, m = 1 / 0, x = 0, S = 0, b = !1;
  if (t)
    if (!r && t.ownerSVGElement) {
      var D = t.getBBox();
      b = !0, e = D.width, n = D.height, o = e, s = n, u = e, f = n, a = e, i = n;
    } else {
      var E = Nt(t), y = t.style, C = E("boxSizing") === "border-box", _ = parseFloat(E("borderLeftWidth")) || 0, w = parseFloat(E("borderRightWidth")) || 0, P = parseFloat(E("borderTopWidth")) || 0, O = parseFloat(E("borderBottomWidth")) || 0, T = parseFloat(E("paddingLeft")) || 0, I = parseFloat(E("paddingRight")) || 0, z = parseFloat(E("paddingTop")) || 0, A = parseFloat(E("paddingBottom")) || 0, F = T + I, k = z + A, W = _ + w, L = P + O, G = F + W, q = k + L, V = E("position"), H = 0, j = 0;
      if ("clientLeft" in t) {
        var Y = null;
        if (V === "absolute") {
          var $ = se(t, gr(t));
          Y = $.offsetParent;
        } else
          Y = t.parentElement;
        if (Y) {
          var J = Nt(Y);
          H = parseFloat(J("width")), j = parseFloat(J("height"));
        }
      }
      l = Math.max(F, dt(E("minWidth"), H) || 0), c = Math.max(k, dt(E("minHeight"), j) || 0), p = dt(E("maxWidth"), H), g = dt(E("maxHeight"), j), isNaN(p) && (p = 1 / 0), isNaN(g) && (g = 1 / 0), x = dt(y.width, 0) || 0, S = dt(y.height, 0) || 0, o = parseFloat(E("width")) || 0, s = parseFloat(E("height")) || 0, u = B(o - x) < 1 ? bn(l, x || o, p) : o, f = B(s - S) < 1 ? bn(c, S || s, g) : s, e = u, n = f, a = u, i = f, C ? (h = p, m = g, v = l, d = c, u = e - G, f = n - q) : (h = p + G, m = g + q, v = l + G, d = c + q, e = u + G, n = f + q), a = u + F, i = f + k;
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
    minHeight: c,
    maxWidth: p,
    maxHeight: g,
    minOffsetWidth: v,
    minOffsetHeight: d,
    maxOffsetWidth: h,
    maxOffsetHeight: m
  };
}
function Wo(t, r) {
  return St(r > 0 ? t[0] : t[1], r > 0 ? t[1] : t[0]);
}
function _e() {
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
function Lo(t, r) {
  var e = t === gr(t) || t === Qn(t), n = {
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
function pn(t, r, e, n) {
  var a = t.left, i = t.right, o = t.top, s = t.bottom, u = r.top, f = r.left, l = {
    left: f + a,
    top: u + o,
    right: f + i,
    bottom: u + s,
    width: i - a,
    height: s - o
  };
  return e && n ? Lo(e, l) : l;
}
function te(t, r) {
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
  return t && r ? Lo(t, s) : s;
}
function Nl(t) {
  var r = t.props, e = r.groupable, n = r.svgOrigin, a = t.getState(), i = a.offsetWidth, o = a.offsetHeight, s = a.svg, u = a.transformOrigin;
  return !e && s && n ? ya(n, i, o) : u;
}
function Ho(t, r, e, n) {
  var a;
  if (t)
    a = t;
  else if (r)
    a = [0, 0];
  else {
    var i = e.target;
    a = Yo(i, n);
  }
  return a;
}
function Yo(t, r) {
  if (t) {
    var e = t.getAttribute("data-rotation") || "", n = t.getAttribute("data-direction");
    if (r.deg = e, !!n) {
      var a = [0, 0];
      return n.indexOf("w") > -1 && (a[0] = -1), n.indexOf("e") > -1 && (a[0] = 1), n.indexOf("n") > -1 && (a[1] = -1), n.indexOf("s") > -1 && (a[1] = 1), a;
    }
  }
}
function xa(t, r) {
  return [
    ft(r, t[0]),
    ft(r, t[1]),
    ft(r, t[2]),
    ft(r, t[3])
  ];
}
function jt(t) {
  var r = t.left, e = t.top, n = t.pos1, a = t.pos2, i = t.pos3, o = t.pos4;
  return xa([n, a, i, o], [r, e]);
}
function Nn(t, r) {
  t[r ? "controlAbles" : "targetAbles"].forEach(function(e) {
    e.unset && e.unset(t);
  });
}
function zr(t, r) {
  var e = r ? "controlGesto" : "targetGesto", n = t[e];
  n?.isIdle() === !1 && Nn(t, r), n?.unset(), t[e] = null;
}
function kt(t, r) {
  if (r) {
    var e = qr(r);
    e.nextStyle = M(M({}, e.nextStyle), t);
  }
  return {
    style: t,
    cssText: Yr(t).map(function(n) {
      return "".concat(eu(n, "-"), ": ").concat(t[n], ";");
    }).join("")
  };
}
function Xo(t, r, e) {
  var n = r.afterTransform || r.transform;
  return M(M({}, kt(M(M(M({}, t.style), r.style), { transform: n }), e)), { afterTransform: n, transform: t.transform });
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
function Ht(t, r, e) {
  var n = r.datas, a = "isDrag" in e ? e.isDrag : r.isDrag;
  return n.datas || (n.datas = {}), M(M({ isDrag: a }, e), { moveable: t, target: t.state.target, clientX: r.clientX, clientY: r.clientY, inputEvent: r.inputEvent, currentTarget: t, lastEvent: n.lastEvent, isDouble: r.isDouble, datas: n.datas, isFirstDrag: !!r.isFirstDrag });
}
function Ke(t, r, e) {
  t._emitter.on(r, e);
}
function U(t, r, e, n, a) {
  return t.triggerEvent(r, e, n, a);
}
function Sa(t, r) {
  return cr(t).getComputedStyle(t, r);
}
function Me(t, r, e) {
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
function Wn(t, r) {
  return t === r || t == null && r == null;
}
function ci() {
  for (var t = [], r = 0; r < arguments.length; r++)
    t[r] = arguments[r];
  for (var e = t.length - 1, n = 0; n < e; ++n) {
    var a = t[n];
    if (!Un(a))
      return a;
  }
  return t[e];
}
function qo(t, r) {
  var e = [], n = [];
  return t.forEach(function(a, i) {
    var o = r(a, i, t), s = n.indexOf(o), u = e[s] || [];
    s === -1 && (n.push(o), e.push(u)), u.push(a);
  }), e;
}
function Wl(t, r) {
  var e = [], n = {};
  return t.forEach(function(a, i) {
    var o = r(a, i, t), s = n[o];
    s || (s = [], n[o] = s, e.push(s)), s.push(a);
  }), e;
}
function Vo(t) {
  return t.reduce(function(r, e) {
    return r.concat(e);
  }, []);
}
function Wr() {
  for (var t = [], r = 0; r < arguments.length; r++)
    t[r] = arguments[r];
  return t.sort(function(e, n) {
    return B(n) - B(e);
  }), t[0];
}
function Lr(t, r, e) {
  return Pt(Qt(t, e), Dr(r, e), e);
}
function Ll(t, r) {
  var e, n = t.is3d, a = t.rootMatrix, i = n ? 4 : 3;
  return e = R(Lr(a, [r.distX, r.distY], i), 2), r.distX = e[0], r.distY = e[1], r;
}
function Yt(t, r, e, n) {
  if (!e[0] && !e[1])
    return r;
  var a = xt(t, [si(e[0] || 1), 0], n), i = xt(t, [0, si(e[1] || 1)], n), o = xt(t, [
    e[0] / Vt(a),
    e[1] / Vt(i)
  ], n);
  return ft(r, o);
}
function Ut(t, r, e) {
  return e ? "".concat(t / r * 100, "%") : "".concat(t, "px");
}
function Le(t) {
  return B(t) <= At ? 0 : t;
}
function ba(t) {
  return function(r) {
    if (!r.isDragging(t))
      return "";
    var e = Of(r, t), n = e.deg;
    return n ? K("view-control-rotation".concat(n)) : "";
  };
}
function Ea(t, r) {
  return r === void 0 && (r = [t]), function(e, n) {
    if (n.isRequest)
      return r.some(function(i) {
        return n.requestAble === i;
      }) ? n.parentDirection : !1;
    var a = n.inputEvent.target;
    return Ct(a, K("direction")) && (!t || Ct(a, K(t)));
  };
}
function Hl(t, r, e) {
  var n, a = Ar(t, {
    "x%": function(D) {
      return D / 100 * r.offsetWidth;
    },
    "y%": function(D) {
      return D / 100 * r.offsetHeight;
    }
  }), i = t.slice(0, e < 0 ? void 0 : e), o = t.slice(0, e < 0 ? void 0 : e + 1), s = t[e] || "", u = e < 0 ? [] : t.slice(e), f = e < 0 ? [] : t.slice(e + 1), l = a.slice(0, e < 0 ? void 0 : e), c = a.slice(0, e < 0 ? void 0 : e + 1), v = (n = a[e]) !== null && n !== void 0 ? n : Ar([""])[0], d = e < 0 ? [] : a.slice(e), p = e < 0 ? [] : a.slice(e + 1), g = v ? [v] : [], h = Tr(l), m = Tr(c), x = Tr(d), S = Tr(p), b = pt(h, x, 4);
  return {
    transforms: t,
    beforeFunctionMatrix: h,
    beforeFunctionMatrix2: m,
    targetFunctionMatrix: Tr(g),
    afterFunctionMatrix: x,
    afterFunctionMatrix2: S,
    allFunctionMatrix: b,
    beforeFunctions: l,
    beforeFunctions2: c,
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
function Yl(t) {
  return !t || !Zt(t) || ta(t) ? !1 : wt(t) || "length" in t;
}
function Jt(t, r) {
  return t ? ta(t) ? t : ar(t) ? r ? document.querySelector(t) : t : $n(t) ? t() : Xi(t) ? t : "current" in t ? t.current : t : null;
}
function Da(t, r) {
  if (!t)
    return [];
  var e = Yl(t) ? [].slice.call(t) : [t];
  return e.reduce(function(n, a) {
    return ar(a) && r ? N(N([], R(n), !1), R([].slice.call(document.querySelectorAll(a))), !1) : (wt(a) ? n.push(Da(a, r)) : n.push(Jt(a, r)), n);
  }, []);
}
function Xl(t, r, e) {
  var n = St(t, r) / Math.PI * 180;
  return n = e >= 0 ? n : 180 - n, n = n >= 0 ? n : 360 + n, n;
}
function vi(t, r) {
  var e = t.rootMatrix, n = t.is3d, a = n ? 4 : 3, i = Qt(e, a);
  return n || (i = Kt(i, 3, 4)), i[12] = 0, i[13] = 0, i[14] = 0, xu(i, r);
}
function jo(t, r, e, n, a) {
  var i = R(t, 2), o = i[0], s = i[1], u = 0, f = 0;
  if (a && o && s) {
    var l = St([0, 0], r), c = St([0, 0], n), v = Vt(r), d = Math.cos(l - c) * v;
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
function Uo(t, r, e, n) {
  var a, i = e.ratio, o = e.startOffsetWidth, s = e.startOffsetHeight, u = 0, f = 0, l = n.distX, c = n.distY, v = n.pinchScale, d = n.parentDistance, p = n.parentDist, g = n.parentScale, h = e.fixedDirection, m = [0, 1].map(function(y) {
    return B(t[y] - h[y]);
  }), x = [0, 1].map(function(y) {
    var C = m[y];
    return C !== 0 && (C = 2 / C), C;
  });
  if (p)
    u = p[0], f = p[1], r && (u ? f || (f = u / i) : u = f * i);
  else if (ne(v))
    u = (v - 1) * o, f = (v - 1) * s;
  else if (g)
    u = (g[0] - 1) * o, f = (g[1] - 1) * s;
  else if (d) {
    var S = o * m[0], b = s * m[1], D = Vt([S, b]);
    u = d / D * S * x[0], f = d / D * b * x[1];
  } else {
    var E = tr({ datas: e, distX: l, distY: c });
    E = x.map(function(y, C) {
      return E[C] * y;
    }), a = R(jo([o, s], E, i, t, r), 2), u = a[0], f = a[1];
  }
  return {
    // direction,
    // sizeDirection,
    distWidth: u,
    distHeight: f
  };
}
function Ln(t, r) {
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
    var e = R(t.split(" "), 2), n = e[0], a = e[1], i = Ln(n || ""), o = Ln(a || ""), s = M(M({}, i), o), u = {
      x: "50%",
      y: "50%"
    };
    return s.x && (u.x = s.x), s.y && (u.y = s.y), s.value && (s.x && !s.y && (u.y = s.value), !s.x && s.y && (u.x = s.value)), u;
  }
  return t === "left" ? { x: "0%" } : t === "right" ? { x: "100%" } : t === "top" ? { y: "0%" } : t === "bottom" ? { y: "100%" } : t ? t === "center" ? { value: "50%" } : { value: t } : {};
}
function ya(t, r, e) {
  var n = Ln(t, !0), a = n.x, i = n.y;
  return [
    dt(a, r) || 0,
    dt(i, e) || 0
  ];
}
function ql(t, r, e) {
  var n = t.map(function(i) {
    return Q(i, r);
  }), a = n.map(function(i) {
    return fe(i, e);
  });
  return {
    prev: n,
    next: a,
    result: a.map(function(i) {
      return ft(i, r);
    })
  };
}
function $o(t, r) {
  return t.length === r.length && t.every(function(e, n) {
    var a = r[n], i = wt(e), o = wt(a);
    return i && o ? $o(e, a) : !i && !o ? e === a : !1;
  });
}
function Gr(t, r, e, n, a) {
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
function gn(t, r) {
  return ou(t).map(function(e) {
    return r(e);
  });
}
function Zo(t) {
  return ne(t) ? {
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
var Vl = ve("pinchable", {
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
    var f = "onPinch".concat(n ? "Group" : "", "Start"), l = "drag".concat(n ? "Group" : "", "ControlStart"), c = (s === !0 ? t.controlAbles : u.filter(function(g) {
      return s.indexOf(g.name) > -1;
    })).filter(function(g) {
      return g.canPinch && g[l];
    }), v = nt(t, r, {});
    n && (v.targets = n);
    var d = U(t, f, v);
    e.isPinch = d !== !1, e.ables = c;
    var p = e.isPinch;
    return p ? (c.forEach(function(g) {
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
      var c = "onPinch".concat(s ? "Group" : "");
      U(t, c, l);
      var v = e.ables, d = "drag".concat(s ? "Group" : "", "Control");
      return v.forEach(function(p) {
        p[d] && p[d](t, M(M({}, r), { datas: i[p.name], inputEvent: o, resolveMatrix: !0, pinchScale: n, parentDistance: f, parentRotate: u, isPinch: !0 }));
      }), l;
    }
  },
  pinchEnd: function(t, r) {
    var e = r.datas, n = r.isPinch, a = r.inputEvent, i = r.targets, o = r.originalDatas;
    if (e.isPinch) {
      var s = "onPinch".concat(i ? "Group" : "", "End"), u = Ht(t, r, { isDrag: n });
      i && (u.targets = i), U(t, s, u);
      var f = e.ables, l = "drag".concat(i ? "Group" : "", "ControlEnd");
      return f.forEach(function(c) {
        c[l] && c[l](t, M(M({}, r), { isDrag: n, datas: o[c.name], inputEvent: a, isPinch: !0 }));
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
}), di = Ea("scalable"), jl = {
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
  render: ho("scalable"),
  dragControlCondition: di,
  viewClassName: ba("scalable"),
  dragControlStart: function(t, r) {
    var e = r.datas, n = r.isPinch, a = r.inputEvent, i = r.parentDirection, o = Ho(i, n, a, e), s = t.state, u = s.width, f = s.height, l = s.targetTransform, c = s.target, v = s.pos1, d = s.pos2, p = s.pos4;
    if (!o || !c)
      return !1;
    n || Mr(t, r), e.datas = {}, e.transform = l, e.prevDist = [1, 1], e.direction = o, e.startOffsetWidth = u, e.startOffsetHeight = f, e.startValue = [1, 1];
    var g = !o[0] && !o[1] || o[0] || !o[1];
    Ve(t, r, "scale"), e.isWidth = g;
    function h(E) {
      e.ratio = E && isFinite(E) ? E : 0;
    }
    e.startPositions = jt(t.state);
    function m(E) {
      var y = Ro(e.startPositions, E);
      e.fixedDirection = y.fixedDirection, e.fixedPosition = y.fixedPosition, e.fixedOffset = y.fixedOffset;
    }
    e.setFixedDirection = m, h(rr(v, d) / rr(d, p)), m([-o[0], -o[1]]);
    var x = function(E) {
      e.minScaleSize = E;
    }, S = function(E) {
      e.maxScaleSize = E;
    };
    x([-1 / 0, -1 / 0]), S([1 / 0, 1 / 0]);
    var b = nt(t, r, M(M({ direction: o, set: function(E) {
      e.startValue = E;
    }, setRatio: h, setFixedDirection: m, setMinScaleSize: x, setMaxScaleSize: S }, qe(t, r)), { dragStart: Gt.dragStart(t, new Fr().dragStart([0, 0], r)) })), D = U(t, "onScaleStart", b);
    return e.startFixedDirection = e.fixedDirection, D !== !1 && (e.isScale = !0, t.state.snapRenderInfo = {
      request: r.isRequest,
      direction: o
    }), e.isScale ? b : !1;
  },
  dragControl: function(t, r) {
    Ye(t, r, "scale");
    var e = r.datas, n = r.parentKeepRatio, a = r.parentFlag, i = r.isPinch, o = r.dragClient, s = r.isRequest, u = r.useSnap, f = r.resolveMatrix, l = e.prevDist, c = e.direction, v = e.startOffsetWidth, d = e.startOffsetHeight, p = e.isScale, g = e.startValue, h = e.isWidth, m = e.ratio;
    if (!p)
      return !1;
    var x = t.props, S = x.throttleScale, b = x.parentMoveable, D = c;
    !c[0] && !c[1] && (D = [1, 1]);
    var E = m && (n ?? x.keepRatio) || !1, y = t.state, C = [
      g[0],
      g[1]
    ];
    function _() {
      var X = Uo(D, E, e, r), Z = X.distWidth, lt = X.distHeight, rt = v ? (v + Z) / v : 1, et = d ? (d + lt) / d : 1;
      g[0] || (C[0] = Z / v), g[1] || (C[1] = lt / d);
      var ot = (D[0] || E ? rt : 1) * C[0], vt = (D[1] || E ? et : 1) * C[1];
      return ot === 0 && (ot = Bt(l[0]) * Ee), vt === 0 && (vt = Bt(l[1]) * Ee), [ot, vt];
    }
    var w = _();
    if (!i && t.props.groupable) {
      var P = y.snapRenderInfo || {}, O = P.direction;
      wt(O) && (O[0] || O[1]) && (y.snapRenderInfo = { direction: c, request: r.isRequest });
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
      w[0] / C[0],
      w[1] / C[1]
    ], I = o, z = [0, 0], A = Bt(T[0] * T[1]), F = !o && !a && i;
    if (F || f ? I = la(t, e.targetAllTransform, [0, 0], [0, 0], e) : o || (I = e.fixedPosition), i || (z = Cl(t, T, c, !u && s, e)), E) {
      D[0] && D[1] && z[0] && z[1] && (Math.abs(z[0] * v) > Math.abs(z[1] * d) ? z[1] = 0 : z[0] = 0);
      var k = !z[0] && !z[1];
      if (k && (h ? T[0] = tt(T[0] * C[0], S) / C[0] : T[1] = tt(T[1] * C[1], S) / C[1]), D[0] && !D[1] || z[0] && !z[1] || k && h) {
        T[0] += z[0];
        var W = v * T[0] * C[0] / m;
        T[1] = Bt(A * T[0]) * B(W / d / C[1]);
      } else if (!D[0] && D[1] || !z[0] && z[1] || k && !h) {
        T[1] += z[1];
        var L = d * T[1] * C[1] * m;
        T[0] = Bt(A * T[1]) * B(L / v / C[0]);
      }
    } else
      T[0] += z[0], T[1] += z[1], z[0] || (T[0] = tt(T[0] * C[0], S) / C[0]), z[1] || (T[1] = tt(T[1] * C[1], S) / C[1]);
    T[0] === 0 && (T[0] = Bt(l[0]) * Ee), T[1] === 0 && (T[1] = Bt(l[1]) * Ee), w = Rl(T, [C[0], C[1]]);
    var G = [
      v,
      d
    ], q = [
      v * w[0],
      d * w[1]
    ];
    q = Li(q, e.minScaleSize, e.maxScaleSize, E ? m : !1), w = gn(2, function(X) {
      return G[X] ? q[X] / G[X] : q[X];
    }), T = gn(2, function(X) {
      return w[X] / C[X];
    });
    var V = gn(2, function(X) {
      return l[X] ? T[X] / l[X] : T[X];
    }), H = "scale(".concat(T.join(", "), ")"), j = "scale(".concat(w.join(", "), ")"), Y = Xe(e, j, H), $ = !g[0] || !g[1], J = Cf(t, $ ? j : H, e.fixedDirection, I, e.fixedOffset, e, $), at = F ? J : Q(J, e.prevInverseDist || [0, 0]);
    if (e.prevDist = T, e.prevInverseDist = J, w[0] === l[0] && w[1] === l[1] && at.every(function(X) {
      return !X;
    }) && !b && !F)
      return !1;
    var st = nt(t, r, M({ offsetWidth: v, offsetHeight: d, direction: c, scale: w, dist: T, delta: V, isPinch: !!i }, fo(t, Y, at, i, r)));
    return U(t, "onScale", st), st;
  },
  dragControlEnd: function(t, r) {
    var e = r.datas;
    if (!e.isScale)
      return !1;
    e.isScale = !1;
    var n = Ht(t, r, {});
    return U(t, "onScaleEnd", n), n;
  },
  dragGroupControlCondition: di,
  dragGroupControlStart: function(t, r) {
    var e = r.datas, n = this.dragControlStart(t, r);
    if (!n)
      return !1;
    var a = $t(t, "resizable", r);
    e.moveableScale = t.scale;
    var i = er(t, this, "dragControlStart", r, function(f, l) {
      return ke(t, f, e, l);
    }), o = function(f) {
      n.setFixedDirection(f), i.forEach(function(l, c) {
        l.setFixedDirection(f), ke(t, l.moveable, e, a[c]);
      });
    };
    e.setFixedDirection = o;
    var s = M(M({}, n), { targets: t.props.targets, events: i, setFixedDirection: o }), u = U(t, "onScaleGroupStart", s);
    return e.isScale = u !== !1, e.isScale ? s : !1;
  },
  dragGroupControl: function(t, r) {
    var e = r.datas;
    if (e.isScale) {
      Ke(t, "onBeforeScale", function(l) {
        U(t, "onBeforeScaleGroup", nt(t, r, M(M({}, l), { targets: t.props.targets }), !0));
      });
      var n = this.dragControl(t, r);
      if (n) {
        var a = n.dist, i = e.moveableScale;
        t.scale = [
          a[0] * i[0],
          a[1] * i[1]
        ];
        var o = t.props.keepRatio, s = e.fixedPosition, u = er(t, this, "dragControl", r, function(l, c) {
          var v = R(Pt(le(t.rotation / 180 * Math.PI, 3), [
            c.datas.originalX * a[0],
            c.datas.originalY * a[1],
            1
          ], 3), 2), d = v[0], p = v[1];
          return M(M({}, c), {
            parentDist: null,
            parentScale: a,
            parentKeepRatio: o,
            // recalculate child fixed position for parent group's dragging.
            dragClient: ft(s, [d, p])
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
      var a = er(t, this, "dragControlEnd", r), i = Ht(t, r, {
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
function ur(t, r) {
  return t.map(function(e, n) {
    return Ie(e, r[n], 1, 2);
  });
}
function pi(t, r, e) {
  var n = St(t, r), a = St(t, e), i = a - n;
  return i >= 0 ? i : i + 2 * Math.PI;
}
function Ul(t, r) {
  var e = pi(t[0], t[1], t[2]), n = pi(r[0], r[1], r[2]), a = Math.PI;
  return !(e >= a && n <= a || e <= a && n >= a);
}
var $l = {
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
  viewClassName: ba("warpable"),
  render: function(t, r) {
    var e = t.props, n = e.resizable, a = e.scalable, i = e.warpable, o = e.zoom;
    if (n || a || !i)
      return [];
    var s = t.state, u = s.pos1, f = s.pos2, l = s.pos3, c = s.pos4, v = ur(u, f), d = ur(f, u), p = ur(u, l), g = ur(l, u), h = ur(l, c), m = ur(c, l), x = ur(f, c), S = ur(c, f);
    return N([
      r.createElement("div", { className: K("line"), key: "middeLine1", style: $r(v, h, o) }),
      r.createElement("div", { className: K("line"), key: "middeLine2", style: $r(d, m, o) }),
      r.createElement("div", { className: K("line"), key: "middeLine3", style: $r(p, x, o) }),
      r.createElement("div", { className: K("line"), key: "middeLine4", style: $r(g, S, o) })
    ], R(mo(t, "warpable", r)), !1);
  },
  dragControlCondition: function(t, r) {
    if (r.isRequest)
      return !1;
    var e = r.inputEvent.target;
    return Ct(e, K("direction")) && Ct(e, K("warpable"));
  },
  dragControlStart: function(t, r) {
    var e = r.datas, n = r.inputEvent, a = t.props.target, i = n.target, o = Yo(i, e);
    if (!o || !a)
      return !1;
    var s = t.state, u = s.transformOrigin, f = s.is3d, l = s.targetTransform, c = s.targetMatrix, v = s.width, d = s.height, p = s.left, g = s.top;
    e.datas = {}, e.targetTransform = l, e.warpTargetMatrix = f ? c : Kt(c, 3, 4), e.targetInverseMatrix = qi(Qt(e.warpTargetMatrix, 4), 3, 4), e.direction = o, e.left = p, e.top = g, e.poses = [
      [0, 0],
      [v, 0],
      [0, d],
      [v, d]
    ].map(function(x) {
      return Q(x, u);
    }), e.nextPoses = e.poses.map(function(x) {
      var S = R(x, 2), b = S[0], D = S[1];
      return Pt(e.warpTargetMatrix, [b, D, 0, 1], 4);
    }), e.startValue = mt(4), e.prevMatrix = mt(4), e.absolutePoses = jt(s), e.posIndexes = uo(o), Mr(t, r), Ve(t, r, "matrix3d"), s.snapRenderInfo = {
      request: r.isRequest,
      direction: o
    };
    var h = nt(t, r, M({ set: function(x) {
      e.startValue = x;
    } }, qe(t, r))), m = U(t, "onWarpStart", h);
    return m !== !1 && (e.isWarp = !0), e.isWarp;
  },
  dragControl: function(t, r) {
    var e = r.datas, n = r.isRequest, a = r.distX, i = r.distY, o = e.targetInverseMatrix, s = e.prevMatrix, u = e.isWarp, f = e.startValue, l = e.poses, c = e.posIndexes, v = e.absolutePoses;
    if (!u)
      return !1;
    if (Ye(t, r, "matrix3d"), Vr(t, "warpable")) {
      var d = c.map(function(_) {
        return v[_];
      });
      d.length > 1 && d.push([
        (d[0][0] + d[1][0]) / 2,
        (d[0][1] + d[1][1]) / 2
      ]);
      var p = $e(t, n, {
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
    if (c.forEach(function(_) {
      x[_] = ft(x[_], m);
    }), !df.every(function(_) {
      return Ul(_.map(function(w) {
        return l[w];
      }), _.map(function(w) {
        return x[w];
      }));
    }))
      return !1;
    var S = ea(l[0], l[2], l[1], l[3], x[0], x[2], x[1], x[3]);
    if (!S.length)
      return !1;
    var b = pt(o, S, 4), D = oo(e, b, !0), E = pt(Qt(s, 4), D, 4);
    e.prevMatrix = D;
    var y = pt(f, D, 4), C = Xe(e, "matrix3d(".concat(y.join(", "), ")"), "matrix3d(".concat(D.join(", "), ")"));
    return fa(r, C), U(t, "onWarp", nt(t, r, M({ delta: E, matrix: y, dist: D, multiply: pt, transform: C }, kt({
      transform: C
    }, r)))), !0;
  },
  dragControlEnd: function(t, r) {
    var e = r.datas, n = r.isDrag;
    return e.isWarp ? (e.isWarp = !1, U(t, "onWarpEnd", Ht(t, r, {})), n) : !1;
  }
}, Zl = /* @__PURE__ */ K("area-pieces"), we = /* @__PURE__ */ K("area-piece"), Ko = /* @__PURE__ */ K("avoid"), Kl = K("view-dragging");
function hn(t) {
  var r = t.areaElement;
  if (r) {
    var e = t.state, n = e.width, a = e.height;
    Yi(r, Ko), r.style.cssText += "left: 0px; top: 0px; width: ".concat(n, "px; height: ").concat(a, "px");
  }
}
function gi(t) {
  return t.createElement(
    "div",
    { key: "area_pieces", className: Zl },
    t.createElement("div", { className: we }),
    t.createElement("div", { className: we }),
    t.createElement("div", { className: we }),
    t.createElement("div", { className: we })
  );
}
var Jo = {
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
    var e = t.props, n = e.target, a = e.dragArea, i = e.groupable, o = e.passDragArea, s = t.getState(), u = s.width, f = s.height, l = s.renderPoses, c = o ? K("area", "pass") : K("area");
    if (i)
      return [
        r.createElement("div", { key: "area", ref: Er(t, "areaElement"), className: c }),
        gi(r)
      ];
    if (!n || !a)
      return [];
    var v = ea([0, 0], [u, 0], [0, f], [u, f], l[0], l[1], l[2], l[3]), d = v.length ? Ze(v, !0) : "none";
    return [
      r.createElement("div", { key: "area", ref: Er(t, "areaElement"), className: c, style: {
        top: "0px",
        left: "0px",
        width: "".concat(u, "px"),
        height: "".concat(f, "px"),
        transformOrigin: "0 0",
        transform: d
      } }),
      gi(r)
    ];
  },
  dragStart: function(t, r) {
    var e = r.datas, n = r.clientX, a = r.clientY, i = r.inputEvent;
    if (!i)
      return !1;
    e.isDragArea = !1;
    var o = t.areaElement, s = t.state, u = s.moveableClientRect, f = s.renderPoses, l = s.rootMatrix, c = s.is3d, v = u.left, d = u.top, p = qt(f), g = p.left, h = p.top, m = p.width, x = p.height, S = c ? 4 : 3, b = R(Lr(l, [n - v, a - d], S), 2), D = b[0], E = b[1];
    D -= g, E -= h;
    var y = [
      { left: g, top: h, width: m, height: E - 10 },
      { left: g, top: h, width: D - 10, height: x },
      { left: g, top: h + E + 10, width: m, height: x - E - 10 },
      { left: g + D + 10, top: h, width: m - D - 10, height: x }
    ], C = [].slice.call(o.nextElementSibling.children);
    y.forEach(function(_, w) {
      C[w].style.cssText = "left: ".concat(_.left, "px;top: ").concat(_.top, "px; width: ").concat(_.width, "px; height: ").concat(_.height, "px;");
    }), Hi(o, Ko), s.disableNativeEvent = !0;
  },
  drag: function(t, r) {
    var e = r.datas, n = r.inputEvent;
    if (this.enableNativeEvent(t), !n)
      return !1;
    e.isDragArea || (e.isDragArea = !0, hn(t));
  },
  dragEnd: function(t, r) {
    this.enableNativeEvent(t);
    var e = r.inputEvent, n = r.datas;
    if (!e)
      return !1;
    n.isDragArea || hn(t);
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
    hn(t), t.state.disableNativeEvent = !1;
  },
  enableNativeEvent: function(t) {
    var r = t.state;
    r.disableNativeEvent && Wi(function() {
      r.disableNativeEvent = !1;
    });
  }
}, Jl = ve("origin", {
  props: ["origin", "svgOrigin"],
  render: function(t, r) {
    var e = t.props, n = e.zoom, a = e.svgOrigin, i = e.groupable, o = t.getState(), s = o.beforeOrigin, u = o.rotation, f = o.svg, l = o.allMatrix, c = o.is3d, v = o.left, d = o.top, p = o.offsetWidth, g = o.offsetHeight, h;
    if (!i && f && a) {
      var m = R(ya(a, p, g), 2), x = m[0], S = m[1], b = c ? 4 : 3, D = xt(l, [x, S], b);
      h = We(u, n, Q(D, [v, d]));
    } else
      h = We(u, n, s);
    return [
      r.createElement("div", { className: K("control", "origin"), style: h, key: "beforeOrigin" })
    ];
  }
});
function Ql(t) {
  var r = t.scrollContainer;
  return [
    r.scrollLeft,
    r.scrollTop
  ];
}
var tc = {
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
    var e = t.props, n = e.scrollContainer, a = n === void 0 ? t.getContainer() : n, i = e.scrollOptions, o = new Pu(), s = Jt(a, !0);
    r.datas.dragScroll = o, t.state.dragScroll = o;
    var u = r.isControl ? "controlGesto" : "targetGesto", f = r.targets;
    o.on("scroll", function(l) {
      var c = l.container, v = l.direction, d = nt(t, r, {
        scrollContainer: c,
        direction: v
      }), p = f ? "onScrollGroup" : "onScroll";
      f && (d.targets = f), U(t, p, d);
    }).on("move", function(l) {
      var c = l.offsetX, v = l.offsetY, d = l.inputEvent;
      t[u].scrollBy(c, v, d.inputEvent, !1);
    }).on("scrollDrag", function(l) {
      var c = l.next;
      c(t[u].getCurrentEvent());
    }), o.dragStart(r, M({ container: s }, i));
  },
  checkScroll: function(t, r) {
    var e = r.datas.dragScroll;
    if (e) {
      var n = t.props, a = n.scrollContainer, i = a === void 0 ? t.getContainer() : a, o = n.scrollThreshold, s = o === void 0 ? 0 : o, u = n.scrollThrottleTime, f = u === void 0 ? 0 : u, l = n.getScrollPosition, c = l === void 0 ? Ql : l, v = n.scrollOptions;
      return e.drag(r, M({ container: i, threshold: s, throttleTime: f, getScrollPosition: function(d) {
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
}, Qo = {
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
}, rc = ve("padding", {
  props: ["padding"],
  render: function(t, r) {
    var e = t.props;
    if (e.dragArea)
      return [];
    var n = Zo(e.padding || {}), a = n.left, i = n.top, o = n.right, s = n.bottom, u = t.getState(), f = u.renderPoses, l = u.pos1, c = u.pos2, v = u.pos3, d = u.pos4, p = [l, c, v, d], g = [];
    return a > 0 && g.push([0, 2]), i > 0 && g.push([0, 1]), o > 0 && g.push([1, 3]), s > 0 && g.push([2, 3]), g.map(function(h, m) {
      var x = R(h, 2), S = x[0], b = x[1], D = p[S], E = p[b], y = f[S], C = f[b], _ = ea([0, 0], [100, 0], [0, 100], [100, 100], D, E, y, C);
      if (_.length)
        return r.createElement("div", { key: "padding".concat(m), className: K("padding"), style: {
          transform: Ze(_, !0)
        } });
    });
  }
}), hi = ["nw", "ne", "se", "sw"];
function Re(t, r) {
  var e = t[0] + t[1], n = e > r ? r / e : 1;
  return t[0] *= n, t[1] = r - t[1] * n, t;
}
var ec = [1, 2, 5, 6], nc = [0, 3, 4, 7], xr = [1, -1, -1, 1], Sr = [1, 1, -1, -1];
function Ca(t, r, e, n, a, i, o, s) {
  a === void 0 && (a = 0), i === void 0 && (i = 0), o === void 0 && (o = e), s === void 0 && (s = n);
  var u = [], f = !1, l = t.filter(function(v) {
    return !v.virtual;
  }), c = l.map(function(v) {
    var d = v.horizontal, p = v.vertical, g = v.pos;
    if (p && !f && (f = !0, u.push("/")), f) {
      var h = Math.max(0, p === 1 ? g[1] - i : s - g[1]);
      return u.push(Ut(h, n, r)), h;
    } else {
      var h = Math.max(0, d === 1 ? g[0] - a : o - g[0]);
      return u.push(Ut(h, e, r)), h;
    }
  });
  return {
    radiusPoses: l,
    styles: u,
    raws: c
  };
}
function ts(t) {
  for (var r = [0, 0], e = [0, 0], n = t.length, a = 0; a < n; ++a) {
    var i = t[a];
    i.sub && (i.horizontal && (r[1] === 0 && (r[0] = a), r[1] = a - r[0] + 1, e[0] = a + 1), i.vertical && (e[1] === 0 && (e[0] = a), e[1] = a - e[0] + 1));
  }
  return {
    horizontalRange: r,
    verticalRange: e
  };
}
function rs(t, r, e, n, a, i, o) {
  var s, u, f, l;
  i === void 0 && (i = [0, 0]), o === void 0 && (o = !1);
  var c = t.indexOf("/"), v = (c > -1 ? t.slice(0, c) : t).length, d = t.slice(0, v), p = t.slice(v + 1), g = d.length, h = p.length, m = h > 0, x = R(d, 4), S = x[0], b = S === void 0 ? "0px" : S, D = x[1], E = D === void 0 ? b : D, y = x[2], C = y === void 0 ? b : y, _ = x[3], w = _ === void 0 ? E : _, P = R(p, 4), O = P[0], T = O === void 0 ? b : O, I = P[1], z = I === void 0 ? m ? T : E : I, A = P[2], F = A === void 0 ? m ? T : C : A, k = P[3], W = k === void 0 ? m ? z : w : k, L = [b, E, C, w].map(function(Y) {
    return dt(Y, r);
  }), G = [T, z, F, W].map(function(Y) {
    return dt(Y, e);
  }), q = L.slice(), V = G.slice();
  s = R(Re([q[0], q[1]], r), 2), q[0] = s[0], q[1] = s[1], u = R(Re([q[3], q[2]], r), 2), q[3] = u[0], q[2] = u[1], f = R(Re([V[0], V[3]], e), 2), V[0] = f[0], V[3] = f[1], l = R(Re([V[1], V[2]], e), 2), V[1] = l[0], V[2] = l[1];
  var H = o ? q : q.slice(0, Math.max(i[0], g)), j = o ? V : V.slice(0, Math.max(i[1], h));
  return N(N([], R(H.map(function(Y, $) {
    var J = hi[$];
    return {
      virtual: $ >= g,
      horizontal: xr[$],
      vertical: 0,
      pos: [n + Y, a + (Sr[$] === -1 ? e : 0)],
      sub: !0,
      raw: L[$],
      direction: J
    };
  })), !1), R(j.map(function(Y, $) {
    var J = hi[$];
    return {
      virtual: $ >= h,
      horizontal: 0,
      vertical: Sr[$],
      pos: [n + (xr[$] === -1 ? r : 0), a + Y],
      sub: !0,
      raw: G[$],
      direction: J
    };
  })), !1);
}
function ac(t, r, e, n, a) {
  a === void 0 && (a = r.length);
  var i = ts(t.slice(n)), o = i.horizontalRange, s = i.verticalRange, u = e - n, f = 0;
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
function ic(t, r, e, n, a, i, o, s, u, f, l) {
  f === void 0 && (f = 0), l === void 0 && (l = 0);
  var c = ts(t.slice(e)), v = c.horizontalRange, d = c.verticalRange;
  if (n > -1)
    for (var p = xr[n] === 1 ? i - f : s - i, g = v[1]; g <= n; ++g) {
      var h = Sr[g] === 1 ? l : u, m = 0;
      if (n === g ? m = i : g === 0 ? m = f + p : xr[g] === -1 && (m = s - (r[e][0] - f)), t.splice(e + g, 0, {
        horizontal: xr[g],
        vertical: 0,
        pos: [m, h]
      }), r.splice(e + g, 0, [m, h]), g === 0)
        break;
    }
  else if (a > -1) {
    var x = Sr[a] === 1 ? o - l : u - o;
    if (v[1] === 0 && d[1] === 0) {
      var S = [
        f + x,
        l
      ];
      t.push({
        horizontal: xr[0],
        vertical: 0,
        pos: S
      }), r.push(S);
    }
    for (var b = d[0], g = d[1]; g <= a; ++g) {
      var m = xr[g] === 1 ? f : s, h = 0;
      if (a === g ? h = o : g === 0 ? h = l + x : Sr[g] === 1 ? h = r[e + b][1] : Sr[g] === -1 && (h = u - (r[e + b][1] - l)), t.push({
        horizontal: 0,
        vertical: Sr[g],
        pos: [m, h]
      }), r.push([m, h]), g === 0)
        break;
    }
  }
}
function oc(t, r) {
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
var sc = [
  [0, -1, "n"],
  [1, 0, "e"]
], uc = [
  [-1, -1, "nw"],
  [0, -1, "n"],
  [1, -1, "ne"],
  [1, 0, "e"],
  [1, 1, "se"],
  [0, 1, "s"],
  [-1, 1, "sw"],
  [-1, 0, "w"]
];
function _a(t, r, e) {
  var n = t.props.clipRelative, a = t.state, i = a.width, o = a.height, s = r, u = s.type, f = s.poses, l = u === "rect", c = u === "circle";
  if (u === "polygon")
    return e.map(function(E) {
      return "".concat(Ut(E[0], i, n), " ").concat(Ut(E[1], o, n));
    });
  if (l || u === "inset") {
    var v = e[1][1], d = e[3][0], p = e[7][0], g = e[5][1];
    if (l)
      return [
        v,
        d,
        g,
        p
      ].map(function(E) {
        return "".concat(E, "px");
      });
    var h = [v, i - d, o - g, p].map(function(E, y) {
      return Ut(E, y % 2 ? i : o, n);
    });
    if (e.length > 8) {
      var m = R(Q(e[4], e[0]), 2), x = m[0], S = m[1];
      h.push.apply(h, N(["round"], R(Ca(f.slice(8).map(function(E, y) {
        return M(M({}, E), { pos: e[y] });
      }), n, x, S, p, v, d, g).styles), !1));
    }
    return h;
  } else if (c || u === "ellipse") {
    var b = e[0], D = Ut(B(e[1][1] - b[1]), c ? Math.sqrt((i * i + o * o) / 2) : o, n), h = c ? [D] : [Ut(B(e[2][0] - b[0]), i, n), D];
    return h.push("at", Ut(b[0], i, n), Ut(b[1], o, n)), h;
  }
}
function He(t, r, e, n) {
  var a = [n, (n + r) / 2, r], i = [t, (t + e) / 2, e];
  return uc.map(function(o) {
    var s = R(o, 3), u = s[0], f = s[1], l = s[2], c = a[u + 1], v = i[f + 1];
    return {
      vertical: B(f),
      horizontal: B(u),
      direction: l,
      pos: [c, v]
    };
  });
}
function es(t) {
  var r = [1 / 0, -1 / 0], e = [1 / 0, -1 / 0];
  return t.forEach(function(n) {
    var a = n.pos;
    r[0] = Math.min(r[0], a[0]), r[1] = Math.max(r[1], a[0]), e[0] = Math.min(e[0], a[1]), e[1] = Math.max(e[1], a[1]);
  }), [
    B(r[1] - r[0]),
    B(e[1] - e[0])
  ];
}
function mi(t, r, e, n, a) {
  var i, o, s, u, f, l, c, v, d;
  if (t) {
    var p = a;
    if (!p) {
      var g = Nt(t), h = g("clipPath");
      p = h !== "none" ? h : g("clip");
    }
    if (!((!p || p === "none" || p === "auto") && (p = n, !p))) {
      var m = Ni(p), x = m.prefix, S = x === void 0 ? p : x, b = m.value, D = b === void 0 ? "" : b, E = S === "circle", y = " ";
      if (S === "polygon") {
        var C = br(D || "0% 0%, 100% 0%, 100% 100%, 0% 100%");
        y = ",";
        var _ = C.map(function(Mt) {
          var It = R(Mt.split(" "), 2), Tt = It[0], bt = It[1];
          return {
            vertical: 1,
            horizontal: 1,
            pos: [
              dt(Tt, r),
              dt(bt, e)
            ]
          };
        }), w = Cr(_.map(function(Mt) {
          return Mt.pos;
        }));
        return {
          type: S,
          clipText: p,
          poses: _,
          splitter: y,
          left: w.minX,
          right: w.maxX,
          top: w.minY,
          bottom: w.maxY
        };
      } else if (E || S === "ellipse") {
        var P = "", O = "", T = 0, I = 0, C = vr(D);
        if (E) {
          var z = "";
          i = R(C, 4), o = i[0], z = o === void 0 ? "50%" : o, s = i[2], P = s === void 0 ? "50%" : s, u = i[3], O = u === void 0 ? "50%" : u, T = dt(z, Math.sqrt((r * r + e * e) / 2)), I = T;
        } else {
          var A = "", F = "";
          f = R(C, 5), l = f[0], A = l === void 0 ? "50%" : l, c = f[1], F = c === void 0 ? "50%" : c, v = f[3], P = v === void 0 ? "50%" : v, d = f[4], O = d === void 0 ? "50%" : d, T = dt(A, r), I = dt(F, e);
        }
        var k = [
          dt(P, r),
          dt(O, e)
        ], _ = N([
          {
            vertical: 1,
            horizontal: 1,
            pos: k,
            direction: "nesw"
          }
        ], R(sc.slice(0, E ? 1 : 2).map(function(Tt) {
          return {
            vertical: B(Tt[1]),
            horizontal: Tt[0],
            direction: Tt[2],
            sub: !0,
            pos: [
              k[0] + Tt[0] * T,
              k[1] + Tt[1] * I
            ]
          };
        })), !1);
        return {
          type: S,
          clipText: p,
          radiusX: T,
          radiusY: I,
          left: k[0] - T,
          top: k[1] - I,
          right: k[0] + T,
          bottom: k[1] + I,
          poses: _,
          splitter: y
        };
      } else if (S === "inset") {
        var C = vr(D || "0 0 0 0"), W = C.indexOf("round"), L = (W > -1 ? C.slice(0, W) : C).length, G = C.slice(L + 1), q = R(C.slice(0, L), 4), V = q[0], H = q[1], j = H === void 0 ? V : H, Y = q[2], $ = Y === void 0 ? V : Y, J = q[3], at = J === void 0 ? j : J, st = R([V, $].map(function(Tt) {
          return dt(Tt, e);
        }), 2), X = st[0], Z = st[1], lt = R([at, j].map(function(Tt) {
          return dt(Tt, r);
        }), 2), rt = lt[0], et = lt[1], ot = r - et, vt = e - Z, gt = rs(G, ot - rt, vt - X, rt, X), _ = N(N([], R(He(X, ot, vt, rt)), !1), R(gt), !1);
        return {
          type: "inset",
          clipText: p,
          poses: _,
          top: X,
          left: rt,
          right: ot,
          bottom: vt,
          radius: G,
          splitter: y
        };
      } else if (S === "rect") {
        var C = br(D || "0px, ".concat(r, "px, ").concat(e, "px, 0px"));
        y = ",";
        var it = R(C.map(function(ir) {
          var or = ue(ir).value;
          return or;
        }), 4), ct = it[0], et = it[1], Z = it[2], rt = it[3], _ = He(ct, et, Z, rt);
        return {
          type: "rect",
          clipText: p,
          poses: _,
          top: ct,
          right: et,
          bottom: Z,
          left: rt,
          values: C,
          splitter: y
        };
      }
    }
  }
}
function fc(t, r, e, n, a) {
  var i = t[r], o = i.direction, s = i.sub, u = t.map(function() {
    return [0, 0];
  }), f = o ? o.split("") : [];
  if (n && r < 8) {
    var l = f.filter(function(T) {
      return T === "w" || T === "e";
    }), c = f.filter(function(T) {
      return T === "n" || T === "s";
    }), v = l[0], d = c[0];
    u[r] = e;
    var p = R(es(t), 2), g = p[0], h = p[1], m = g && h ? g / h : 0;
    if (m && a) {
      var x = (r + 4) % 8, S = t[x].pos, b = [0, 0];
      o.indexOf("w") > -1 ? b[0] = -1 : o.indexOf("e") > -1 && (b[0] = 1), o.indexOf("n") > -1 ? b[1] = -1 : o.indexOf("s") > -1 && (b[1] = 1);
      var D = jo([g, h], e, m, b, !0), E = g + D[0], y = h + D[1], C = S[1], _ = S[1], w = S[0], P = S[0];
      b[0] === -1 ? w = P - E : b[0] === 1 ? P = w + E : (w = w - E / 2, P = P + E / 2), b[1] === -1 ? C = _ - y : (b[1] === 1 || (C = _ - y / 2), _ = C + y);
      var O = He(C, P, _, w);
      t.forEach(function(T, I) {
        u[I][0] = O[I].pos[0] - T.pos[0], u[I][1] = O[I].pos[1] - T.pos[1];
      });
    } else
      t.forEach(function(T, I) {
        var z = T.direction;
        z && (z.indexOf(v) > -1 && (u[I][0] = e[0]), z.indexOf(d) > -1 && (u[I][1] = e[1]));
      }), v && (u[1][0] = e[0] / 2, u[5][0] = e[0] / 2), d && (u[3][1] = e[1] / 2, u[7][1] = e[1] / 2);
  } else o && !s ? f.forEach(function(T) {
    var I = T === "n" || T === "s";
    t.forEach(function(z, A) {
      var F = z.direction, k = z.horizontal, W = z.vertical;
      !F || F.indexOf(T) === -1 || (u[A] = [
        I || !k ? 0 : e[0],
        !I || !W ? 0 : e[1]
      ]);
    });
  }) : u[r] = e;
  return u;
}
function lc(t, r) {
  var e = R(io(t, r), 2), n = e[0], a = e[1], i = r.datas, o = i.clipPath, s = i.clipIndex, u = o, f = u.type, l = u.poses, c = u.splitter, v = l.map(function(x) {
    return x.pos;
  });
  if (f === "polygon")
    v.splice(s, 0, [n, a]);
  else if (f === "inset") {
    var d = ec.indexOf(s), p = nc.indexOf(s), g = l.length;
    if (ic(l, v, 8, d, p, n, a, v[4][0], v[4][1], v[0][0], v[0][1]), g === l.length)
      return;
  } else
    return;
  var h = _a(t, o, v), m = "".concat(f, "(").concat(h.join(c), ")");
  U(t, "onClip", nt(t, r, M({ clipEventType: "added", clipType: f, poses: v, clipStyles: h, clipStyle: m, distX: 0, distY: 0 }, kt({
    clipPath: m
  }, r))));
}
function cc(t, r) {
  var e = r.datas, n = e.clipPath, a = e.clipIndex, i = n, o = i.type, s = i.poses, u = i.splitter, f = s.map(function(d) {
    return d.pos;
  }), l = f.length;
  if (o === "polygon")
    s.splice(a, 1), f.splice(a, 1);
  else if (o === "inset") {
    if (a < 8 || (ac(s, f, a, 8, l), l === s.length))
      return;
  } else
    return;
  var c = _a(t, n, f), v = "".concat(o, "(").concat(c.join(u), ")");
  U(t, "onClip", nt(t, r, M({ clipEventType: "removed", clipType: o, poses: f, clipStyles: c, clipStyle: v, distX: 0, distY: 0 }, kt({
    clipPath: v
  }, r))));
}
var vc = {
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
    var e = t.props, n = e.customClipPath, a = e.defaultClipPath, i = e.clipArea, o = e.zoom, s = e.groupable, u = t.getState(), f = u.target, l = u.width, c = u.height, v = u.allMatrix, d = u.is3d, p = u.left, g = u.top, h = u.pos1, m = u.pos2, x = u.pos3, S = u.pos4, b = u.clipPathState, D = u.snapBoundInfos, E = u.rotation;
    if (!f || s)
      return [];
    var y = mi(f, l, c, a || "inset", b || n);
    if (!y)
      return [];
    var C = d ? 4 : 3, _ = y.type, w = y.poses, P = w.map(function(et) {
      var ot = xt(v, et.pos, C);
      return [
        ot[0] - p,
        ot[1] - g
      ];
    }), O = [], T = [], I = _ === "rect", z = _ === "inset", A = _ === "polygon";
    if (I || z || A) {
      var F = z ? P.slice(0, 8) : P;
      T = F.map(function(et, ot) {
        var vt = ot === 0 ? F[F.length - 1] : F[ot - 1], gt = St(vt, et), it = Fo(vt, et);
        return r.createElement("div", { key: "clipLine".concat(ot), className: K("line", "clip-line", "snap-control"), "data-clip-index": ot, style: {
          width: "".concat(it, "px"),
          transform: "translate(".concat(vt[0], "px, ").concat(vt[1], "px) rotate(").concat(gt, "rad) scaleY(").concat(o, ")")
        } });
      });
    }
    if (O = P.map(function(et, ot) {
      return r.createElement("div", { key: "clipControl".concat(ot), className: K("control", "clip-control", "snap-control"), "data-clip-index": ot, style: {
        transform: "translate(".concat(et[0], "px, ").concat(et[1], "px) rotate(").concat(E, "rad) scale(").concat(o, ")")
      } });
    }), z && O.push.apply(O, N([], R(P.slice(8).map(function(et, ot) {
      return r.createElement("div", { key: "clipRadiusControl".concat(ot), className: K("control", "clip-control", "clip-radius", "snap-control"), "data-clip-index": 8 + ot, style: {
        transform: "translate(".concat(et[0], "px, ").concat(et[1], "px) rotate(").concat(E, "rad) scale(").concat(o, ")")
      } });
    })), !1)), _ === "circle" || _ === "ellipse") {
      var k = y.left, W = y.top, L = y.radiusX, G = y.radiusY, q = R(Q(xt(v, [k, W], C), xt(v, [0, 0], C)), 2), V = q[0], H = q[1], j = "none";
      if (!i) {
        for (var Y = Math.max(10, L / 5, G / 5), $ = [], J = 0; J <= Y; ++J) {
          var at = Math.PI * 2 / Y * J;
          $.push([
            L + (L - o) * Math.cos(at),
            G + (G - o) * Math.sin(at)
          ]);
        }
        $.push([L, -2]), $.push([-2, -2]), $.push([-2, G * 2 + 2]), $.push([L * 2 + 2, G * 2 + 2]), $.push([L * 2 + 2, -2]), $.push([L, -2]), j = "polygon(".concat($.map(function(et) {
          return "".concat(et[0], "px ").concat(et[1], "px");
        }).join(", "), ")");
      }
      O.push(r.createElement("div", { key: "clipEllipse", className: K("clip-ellipse", "snap-control"), style: {
        width: "".concat(L * 2, "px"),
        height: "".concat(G * 2, "px"),
        clipPath: j,
        transform: "translate(".concat(-p + V, "px, ").concat(-g + H, "px) ").concat(Ze(v))
      } }));
    }
    if (i) {
      var st = qt(N([h, m, x, S], R(P), !1)), X = st.width, Z = st.height, lt = st.left, rt = st.top;
      if (A || I || z) {
        var $ = z ? P.slice(0, 8) : P;
        O.push(r.createElement("div", { key: "clipArea", className: K("clip-area", "snap-control"), style: {
          width: "".concat(X, "px"),
          height: "".concat(Z, "px"),
          transform: "translate(".concat(lt, "px, ").concat(rt, "px)"),
          clipPath: "polygon(".concat($.map(function(ot) {
            return "".concat(ot[0] - lt, "px ").concat(ot[1] - rt, "px");
          }).join(", "), ")")
        } }));
      }
    }
    return D && ["vertical", "horizontal"].forEach(function(et) {
      var ot = D[et], vt = et === "horizontal";
      ot.isSnap && T.push.apply(T, N([], R(ot.snap.posInfos.map(function(gt, it) {
        var ct = gt.pos, Mt = Q(xt(v, vt ? [0, ct] : [ct, 0], C), [p, g]), It = Q(xt(v, vt ? [l, ct] : [ct, c], C), [p, g]);
        return oe(r, "", Mt, It, o, "clip".concat(et, "snap").concat(it), "guideline");
      })), !1)), ot.isBound && T.push.apply(T, N([], R(ot.bounds.map(function(gt, it) {
        var ct = gt.pos, Mt = Q(xt(v, vt ? [0, ct] : [ct, 0], C), [p, g]), It = Q(xt(v, vt ? [l, ct] : [ct, c], C), [p, g]);
        return oe(r, "", Mt, It, o, "clip".concat(et, "bounds").concat(it), "guideline", "bounds", "bold");
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
    var e = t.state, n = t.props, a = n.defaultClipPath, i = n.customClipPath, o = e.target, s = e.width, u = e.height, f = r.inputEvent ? r.inputEvent.target : null, l = f && f.getAttribute("class") || "", c = r.datas, v = mi(o, s, u, a || "inset", i);
    if (!v)
      return !1;
    var d = v.clipText, p = v.type, g = v.poses, h = U(t, "onClipStart", nt(t, r, {
      clipType: p,
      clipStyle: d,
      poses: g.map(function(m) {
        return m.pos;
      })
    }));
    return h === !1 ? (c.isClipStart = !1, !1) : (c.isControl = l && l.indexOf("clip-control") > -1, c.isLine = l.indexOf("clip-line") > -1, c.isArea = l.indexOf("clip-area") > -1 || l.indexOf("clip-ellipse") > -1, c.clipIndex = f ? parseInt(f.getAttribute("data-clip-index"), 10) : -1, c.clipPath = v, c.isClipStart = !0, e.clipPathState = d, Mr(t, r), !0);
  },
  dragControl: function(t, r) {
    var e, n, a, i = r.datas, o = r.originalDatas, s = r.isDragTarget;
    if (!i.isClipStart)
      return !1;
    var u = i, f = u.isControl, l = u.isLine, c = u.isArea, v = u.clipIndex, d = u.clipPath;
    if (!d)
      return !1;
    var p = _r(t.props, "clippable"), g = p.keepRatio, h = 0, m = 0, x = o.draggable, S = tr(r);
    s && x ? (e = R(x.prevBeforeDist, 2), h = e[0], m = e[1]) : (n = R(S, 2), h = n[0], m = n[1]);
    var b = [h, m], D = t.state, E = D.width, y = D.height, C = !c && !f && !l, _ = d.type, w = d.poses, P = d.splitter, O = w.map(function(ht) {
      return ht.pos;
    });
    C && (h = -h, m = -m);
    var T = !f || w[v].direction === "nesw", I = _ === "inset" || _ === "rect", z = w.map(function() {
      return [0, 0];
    });
    if (f && !T) {
      var A = w[v], F = A.horizontal, k = A.vertical, W = [
        h * B(F),
        m * B(k)
      ];
      z = fc(w, v, W, I, g);
    } else T && (z = O.map(function() {
      return [h, m];
    }));
    var L = O.map(function(ht, zt) {
      return ft(ht, z[zt]);
    }), G = N([], R(L), !1);
    D.snapBoundInfos = null;
    var q = d.type === "circle", V = d.type === "ellipse";
    if (q || V) {
      var H = qt(L), j = B(H.bottom - H.top), Y = B(V ? H.right - H.left : j), $ = L[0][1] + j, J = L[0][0] - Y, at = L[0][0] + Y;
      q && (G.push([at, H.bottom]), z.push([1, 0])), G.push([H.left, $]), z.push([0, 1]), G.push([J, H.bottom]), z.push([1, 0]);
    }
    var st = Io((p.clipHorizontalGuidelines || []).map(function(ht) {
      return dt("".concat(ht), y);
    }), (p.clipVerticalGuidelines || []).map(function(ht) {
      return dt("".concat(ht), E);
    }), E, y), X = [], Z = [];
    if (q || V)
      X = [G[4][0], G[2][0]], Z = [G[1][1], G[3][1]];
    else if (I) {
      var lt = [G[0], G[2], G[4], G[6]], rt = [z[0], z[2], z[4], z[6]];
      X = lt.filter(function(ht, zt) {
        return rt[zt][0];
      }).map(function(ht) {
        return ht[0];
      }), Z = lt.filter(function(ht, zt) {
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
    var et = [0, 0], ot = ri(st, p.clipTargetBounds && { left: 0, top: 0, right: E, bottom: y }, X, Z, 5, 5), vt = ot.horizontal, gt = ot.vertical, it = vt.offset, ct = gt.offset;
    if (vt.isBound && (et[1] += it), gt.isBound && (et[0] += ct), (V || q) && z[0][0] === 0 && z[0][1] === 0) {
      var H = qt(L), Mt = H.bottom - H.top, It = V ? H.right - H.left : Mt, Tt = gt.isBound ? B(ct) : gt.snapIndex === 0 ? -ct : ct, bt = vt.isBound ? B(it) : vt.snapIndex === 0 ? -it : it;
      It -= Tt, Mt -= bt, q && (Mt = Co(gt, vt) > 0 ? Mt : It, It = Mt);
      var yt = G[0];
      G[1][1] = yt[1] - Mt, G[2][0] = yt[0] + It, G[3][1] = yt[1] + Mt, G[4][0] = yt[0] - It;
    } else if (I && g && f) {
      var ir = R(es(w), 2), or = ir[0], Ra = ir[1], Ta = or && Ra ? or / Ra : 0, ps = w[v], ge = ps.direction || "", Je = G[1][1], $ = G[5][1], J = G[7][0], at = G[3][0];
      B(it) <= B(ct) ? it = Bt(it) * B(ct) / Ta : ct = Bt(ct) * B(it) * Ta, ge.indexOf("w") > -1 ? J -= ct : ge.indexOf("e") > -1 ? at -= ct : (J += ct / 2, at -= ct / 2), ge.indexOf("n") > -1 ? Je -= it : ge.indexOf("s") > -1 ? $ -= it : (Je += it / 2, $ -= it / 2);
      var gs = He(Je, at, $, J);
      G.forEach(function(Ia, Ss) {
        var rn;
        rn = R(gs[Ss].pos, 2), Ia[0] = rn[0], Ia[1] = rn[1];
      });
    } else
      G.forEach(function(ht, zt) {
        var Pa = z[zt];
        Pa[0] && (ht[0] -= ct), Pa[1] && (ht[1] -= it);
      });
    var Oa = _a(t, d, L), Qe = "".concat(_, "(").concat(Oa.join(P), ")");
    if (D.clipPathState = Qe, q || V)
      X = [G[4][0], G[2][0]], Z = [G[1][1], G[3][1]];
    else if (I) {
      var lt = [G[0], G[2], G[4], G[6]];
      X = lt.map(function(zt) {
        return zt[0];
      }), Z = lt.map(function(zt) {
        return zt[1];
      });
    } else
      X = G.map(function(ht) {
        return ht[0];
      }), Z = G.map(function(ht) {
        return ht[1];
      });
    if (D.snapBoundInfos = ri(st, p.clipTargetBounds && { left: 0, top: 0, right: E, bottom: y }, X, Z, 1, 1), x) {
      var hs = D.is3d, ms = D.allMatrix, xs = hs ? 4 : 3, tn = et;
      s && (tn = [
        b[0] + et[0] - S[0],
        b[1] + et[1] - S[1]
      ]), x.deltaOffset = pt(ms, [tn[0], tn[1], 0, 0], xs);
    }
    return U(t, "onClip", nt(t, r, M({ clipEventType: "changed", clipType: _, poses: L, clipStyle: Qe, clipStyles: Oa, distX: h, distY: m }, kt((a = {}, a[_ === "rect" ? "clip" : "clipPath"] = Qe, a), r)))), !0;
  },
  dragControlEnd: function(t, r) {
    this.unset(t);
    var e = r.isDrag, n = r.datas, a = r.isDouble, i = n.isLine, o = n.isClipStart, s = n.isControl;
    return o ? (U(t, "onClipEnd", Ht(t, r, {})), a && (s ? cc(t, r) : i && lc(t, r)), a || e) : !1;
  },
  unset: function(t) {
    t.state.clipPathState = "", t.state.snapBoundInfos = null;
  }
}, dc = {
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
    Mr(t, r);
    var n = nt(t, r, {
      dragStart: Gt.dragStart(t, new Fr().dragStart([0, 0], r))
    }), a = U(t, "onDragOriginStart", n);
    return e.startOrigin = t.state.transformOrigin, e.startTargetOrigin = t.state.targetOrigin, e.prevOrigin = [0, 0], e.isDragOrigin = !0, a === !1 ? (e.isDragOrigin = !1, !1) : n;
  },
  dragControl: function(t, r) {
    var e = r.datas, n = r.isPinch, a = r.isRequest;
    if (!e.isDragOrigin)
      return !1;
    var i = R(tr(r), 2), o = i[0], s = i[1], u = t.state, f = u.width, l = u.height, c = u.offsetMatrix, v = u.targetMatrix, d = u.is3d, p = t.props.originRelative, g = p === void 0 ? !0 : p, h = d ? 4 : 3, m = [o, s];
    if (a) {
      var x = r.distOrigin;
      (x[0] || x[1]) && (m = x);
    }
    var S = ft(e.startOrigin, m), b = ft(e.startTargetOrigin, m), D = Q(m, e.prevOrigin), E = pe(c, v, S, h), y = t.getRect(), C = qt(wr(E, f, l, h)), _ = [
      y.left - C.left,
      y.top - C.top
    ];
    e.prevOrigin = m;
    var w = [
      Ut(b[0], f, g),
      Ut(b[1], l, g)
    ].join(" "), P = Gt.drag(t, de(r, t.state, _, !!n)), O = nt(t, r, M(M({ width: f, height: l, origin: S, dist: m, delta: D, transformOrigin: w, drag: P }, kt({
      transformOrigin: w,
      transform: P.transform
    }, r)), { afterTransform: P.transform }));
    return U(t, "onDragOrigin", O), O;
  },
  dragControlEnd: function(t, r) {
    var e = r.datas;
    return e.isDragOrigin ? (U(t, "onDragOriginEnd", Ht(t, r, {})), !0) : !1;
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
function pc(t, r, e, n) {
  var a = t.filter(function(u) {
    var f = u.virtual, l = u.horizontal;
    return l && !f;
  }).length, i = t.filter(function(u) {
    var f = u.virtual, l = u.vertical;
    return l && !f;
  }).length, o = -1;
  if (r === 0 && (a === 0 ? o = 0 : a === 1 && (o = 1)), r === 2 && (a <= 2 ? o = 2 : a <= 3 && (o = 3)), r === 3 && (i === 0 ? o = 4 : i < 4 && (o = 7)), r === 1 && (i <= 1 ? o = 5 : i <= 2 && (o = 6)), !(o === -1 || !t[o].virtual)) {
    var s = t[o];
    gc(t, o), o < 4 ? s.pos[0] = e : s.pos[1] = n;
  }
}
function gc(t, r) {
  r < 4 ? t.slice(0, r + 1).forEach(function(e) {
    e.virtual = !1;
  }) : (t[0].virtual && (t[0].virtual = !1), t.slice(4, r + 1).forEach(function(e) {
    e.virtual = !1;
  }));
}
function hc(t, r) {
  r < 4 ? t.slice(r, 4).forEach(function(e) {
    e.virtual = !0;
  }) : t.slice(r).forEach(function(e) {
    e.virtual = !0;
  });
}
function xi(t, r, e, n, a) {
  n === void 0 && (n = [0, 0]);
  var i = [];
  return !t || t === "0px" ? i = [] : i = vr(t), rs(i, r, e, 0, 0, n, a);
}
function Si(t, r, e, n, a) {
  var i = t.state, o = i.width, s = i.height, u = Ca(a, t.props.roundRelative, o, s), f = u.raws, l = u.styles, c = u.radiusPoses, v = oc(c, f), d = v.horizontals, p = v.verticals, g = l.join(" ");
  i.borderRadiusState = g;
  var h = nt(t, r, M({ horizontals: d, verticals: p, borderRadius: g, width: o, height: s, delta: n, dist: e }, kt({
    borderRadius: g
  }, r)));
  return U(t, "onRound", h), h;
}
function bi(t) {
  var r, e, n = t.getState().style, a = n.borderRadius || "";
  if (!a && t.props.groupable) {
    var i = t.moveables[0], o = t.getTargets()[0];
    o && (i?.props.target === o ? (a = (e = (r = t.moveables[0]) === null || r === void 0 ? void 0 : r.state.style.borderRadius) !== null && e !== void 0 ? e : "", n.borderRadius = a) : (a = Sa(o).borderRadius, n.borderRadius = a));
  }
  return a;
}
var mc = {
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
    var e = t.getState(), n = e.target, a = e.width, i = e.height, o = e.allMatrix, s = e.is3d, u = e.left, f = e.top, l = e.borderRadiusState, c = t.props, v = c.minRoundControls, d = v === void 0 ? [0, 0] : v, p = c.maxRoundControls, g = p === void 0 ? [4, 4] : p, h = c.zoom, m = c.roundPadding, x = m === void 0 ? 0 : m, S = c.isDisplayShadowRoundControls, b = c.groupable;
    if (!n)
      return null;
    var D = l || bi(t), E = s ? 4 : 3, y = xi(D, a, i, d, !0);
    if (!y)
      return null;
    var C = 0, _ = 0, w = b ? [0, 0] : [u, f];
    return y.map(function(P, O) {
      var T = P.horizontal, I = P.vertical, z = P.direction || "", A = N([], R(P.pos), !1);
      _ += Math.abs(T), C += Math.abs(I), T && z.indexOf("n") > -1 && (A[1] -= x), I && z.indexOf("w") > -1 && (A[0] -= x), T && z.indexOf("s") > -1 && (A[1] += x), I && z.indexOf("e") > -1 && (A[0] += x);
      var F = Q(xt(o, A, E), w), k = S && S !== "horizontal", W = P.vertical ? C <= g[1] && (k || !P.virtual) : _ <= g[0] && (S || !P.virtual);
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
    var c = nt(t, r, {}), v = U(t, "onRoundStart", c);
    if (v === !1)
      return !1;
    n.lineIndex = f, n.controlIndex = u, n.isControl = o, n.isLine = s, Mr(t, r);
    var d = t.props, p = d.roundRelative, g = d.minRoundControls, h = g === void 0 ? [0, 0] : g, m = t.state, x = m.width, S = m.height;
    n.isRound = !0, n.prevDist = [0, 0];
    var b = bi(t), D = xi(b || "", x, S, h, !0) || [];
    return n.controlPoses = D, m.borderRadiusState = Ca(D, p, x, S).styles.join(" "), c;
  },
  dragControl: function(t, r) {
    var e = r.datas, n = e.controlPoses;
    if (!e.isRound || !e.isControl || !n.length)
      return !1;
    var a = e.controlIndex, i = R(tr(r), 2), o = i[0], s = i[1], u = [o, s], f = Q(u, e.prevDist), l = t.props.maxRoundControls, c = l === void 0 ? [4, 4] : l, v = t.state, d = v.width, p = v.height, g = n[a], h = g.vertical, m = g.horizontal, x = n.map(function(b) {
      var D = b.horizontal, E = b.vertical, y = [
        D * m * u[0],
        E * h * u[1]
      ];
      if (D) {
        if (c[0] === 1)
          return y;
        if (c[0] < 4 && D !== m)
          return y;
      } else {
        if (c[1] === 0)
          return y[1] = E * m * u[0] / d * p, y;
        if (h) {
          if (c[1] === 1)
            return y;
          if (c[1] < 4 && E !== h)
            return y;
        }
      }
      return [0, 0];
    });
    x[a] = u;
    var S = n.map(function(b, D) {
      return M(M({}, b), { pos: ft(b.pos, x[D]) });
    });
    return a < 4 ? S.slice(0, a + 1).forEach(function(b) {
      b.virtual = !1;
    }) : S.slice(4, a + 1).forEach(function(b) {
      b.virtual = !1;
    }), e.prevDist = [o, s], Si(t, r, u, f, S);
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
    }).length, c = t.props.roundClickable, v = c === void 0 ? !0 : c;
    if (a && v) {
      if (i && (v === !0 || v === "control"))
        hc(f, o);
      else if (s && (v === !0 || v === "line")) {
        var d = R(io(t, r), 2), p = d[0], g = d[1];
        pc(f, u, p, g);
      }
      l !== f.filter(function(m) {
        var x = m.virtual;
        return x;
      }).length && Si(t, r, [0, 0], [0, 0], f);
    }
    var h = Ht(t, r, {});
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
      return M(M(M({}, s), { target: a[u], moveable: n[u], currentTarget: n[u] }), kt({
        borderRadius: e.borderRadius
      }, s));
    }) }, e);
    return U(t, "onRoundGroup", o), o;
  },
  dragGroupControlEnd: function(t, r) {
    var e = t.moveables, n = t.props.targets, a = $t(t, "roundable", r);
    Ke(t, "onRound", function(s) {
      var u = M({ targets: t.props.targets, events: a.map(function(f, l) {
        return M(M(M({}, f), { target: n[l], moveable: e[l], currentTarget: e[l] }), kt({
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
function xc(t, r) {
  var e = r ? 4 : 3, n = mt(e), a = "matrix".concat(r ? "3d" : "", "(").concat(n.join(","), ")");
  return t === a || t === "matrix(1,0,0,1,0,0)";
}
var ns = {
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
    var e = t.state, n = e.is3d, a = e.targetMatrix, i = e.inlineTransform, o = n ? "matrix3d(".concat(a.join(","), ")") : "matrix(".concat(ji(a, !0), ")"), s = !i || i === "none" ? o : i;
    r.datas.startTransforms = xc(s, n) ? [] : vr(s);
  },
  resetStyle: function(t) {
    var r = t.datas;
    r.nextStyle = {}, r.nextTransforms = t.datas.startTransforms, r.nextTransformAppendedIndexes = [];
  },
  fillDragStartParams: function(t, r) {
    return nt(t, r, {
      setTransform: function(e) {
        r.datas.startTransforms = wt(e) ? e : vr(e);
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
}, as = {
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
    U(t, "onRenderGroup", nt(t, r, M(M({ isPinch: !!r.isPinch, targets: t.props.targets, transform: De(r), transformObject: {} }, kt(ye(r))), { events: i })));
  },
  dragGroupEnd: function(t, r) {
    var e = this, n = $t(t, "beforeRenderable", r), a = t.moveables, i = n.map(function(o, s) {
      var u = a[s];
      return e.fillDragEndParams(u, o);
    });
    U(t, "onRenderGroupEnd", nt(t, r, M({ isPinch: !!r.isPinch, isDrag: r.isDrag, targets: t.props.targets, events: i, transformObject: {}, transform: De(r) }, kt(ye(r)))));
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
    return Ar(Be(r) || []).forEach(function(n) {
      e[n.name] = n.functionValue;
    }), nt(t, r, M({ isPinch: !!r.isPinch, transformObject: e, transform: De(r) }, kt(ye(r))));
  },
  fillDragEndParams: function(t, r) {
    var e = {};
    return Ar(Be(r) || []).forEach(function(n) {
      e[n.name] = n.functionValue;
    }), nt(t, r, M({ isPinch: !!r.isPinch, isDrag: r.isDrag, transformObject: e, transform: De(r) }, kt(ye(r))));
  }
};
function re(t, r, e, n, a, i, o) {
  i.clientDistX = i.distX, i.clientDistY = i.distY;
  var s = a === "Start", u = a === "End", f = a === "After", l = t.state.target, c = i.isRequest, v = n.indexOf("Control") > -1;
  if (!l || s && v && !c && t.areaElement === i.inputEvent.target)
    return !1;
  var d = N([], R(r), !1);
  if (c) {
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
  var b = i.datas, D = v ? "controlGesto" : "targetGesto", E = t[D], y = function(O, T, I) {
    if (!(T in O) || E !== t[D])
      return !1;
    var z = O.name, A = b[z] || (b[z] = {});
    if (s && (A.isEventStart = !I || !O[I] || O[I](t, i)), !A.isEventStart)
      return !1;
    var F = O[T](t, M(M({}, i), { stop: x, datas: A, originalDatas: b, inputTarget: h }));
    return t._emitter.off(), s && F === !1 && (A.isEventStart = !1), F;
  };
  S && d.forEach(function(O) {
    O.unset && O.unset(t);
  }), y(ns, "drag".concat(n).concat(a));
  var C = 0, _ = 0;
  e.forEach(function(O) {
    if (m)
      return !1;
    var T = "".concat(O).concat(n).concat(a), I = "".concat(O).concat(n, "Condition");
    a === "" && !c && Ll(t.state, i);
    var z = d.filter(function(k) {
      return k[T];
    });
    z = z.filter(function(k, W) {
      return k.name && z.indexOf(k) === W;
    });
    var A = z.filter(function(k) {
      return y(k, T, I);
    }), F = A.length;
    m && ++C, F && ++_, !m && s && z.length && !F && (C += z.filter(function(k) {
      var W = k.name, L = b[W];
      return L.isEventStart ? k.dragRelation !== "strong" : !1;
    }).length ? 1 : 0);
  }), (!f || _) && y(as, "drag".concat(n).concat(a));
  var w = E !== t[D] || C === e.length;
  if ((u || m || w) && (t.state.gestos = {}, t.moveables && t.moveables.forEach(function(O) {
    O.state.gestos = {};
  }), d.forEach(function(O) {
    O.unset && O.unset(t);
  })), s && !w && !c && _ && t.props.preventDefault && i?.preventDefault(), t.isUnmounted || w)
    return !1;
  if (!s && _ && !o || u) {
    var P = t.props.flushSync || Bo;
    P(function() {
      t.updateRect(u ? a : "", !0, !1), t.forceUpdate();
    });
  }
  return !s && !u && !f && _ && !o && re(t, r, e, n, a + "After", i), !0;
}
function Ma(t, r) {
  return function(e, n) {
    var a;
    n === void 0 && (n = e.inputEvent.target);
    var i = n, o = t.areaElement, s = t._dragTarget;
    return !s || !r && (!((a = t.controlGesto) === null || a === void 0) && a.isFlag()) ? !1 : i === s || s.contains(i) || i === o || !t.isMoveableElement(i) && !t.controlBox.contains(i) || Ct(i, "moveable-area") || Ct(i, "moveable-padding") || Ct(i, "moveable-edgeDraggable");
  };
}
function is(t, r, e) {
  var n = t.controlBox, a = [], i = t.props, o = i.dragArea, s = t.state.target, u = i.dragTarget;
  a.push(n), (!o || u) && a.push(r), !o && u && s && r !== s && i.dragTargetSelf && a.push(s);
  var f = Ma(t);
  return ss(t, a, "targetAbles", e, {
    dragStart: f,
    pinchStart: f
  });
}
function os(t, r) {
  var e = t.controlBox, n = [];
  n.push(e);
  var a = Ma(t, !0), i = function(o, s) {
    if (s === void 0 && (s = o.inputEvent.target), s === e)
      return !0;
    var u = a(o, s);
    return !u;
  };
  return ss(t, n, "controlAbles", r, {
    dragStart: i,
    pinchStart: i
  });
}
function ss(t, r, e, n, a) {
  a === void 0 && (a = {});
  var i = e === "targetAbles", o = t.props, s = o.pinchOutside, u = o.pinchThreshold, f = o.preventClickEventOnDrag, l = o.preventClickDefault, c = o.checkInput, v = o.dragFocusedInput, d = o.preventDefault, p = d === void 0 ? !0 : d, g = o.preventRightClick, h = g === void 0 ? !0 : g, m = o.preventWheelClick, x = m === void 0 ? !0 : m, S = o.dragContainer, b = Jt(S, !0), D = {
    preventDefault: p,
    preventRightClick: h,
    preventWheelClick: x,
    container: b || cr(t.getControlBoxElement()),
    pinchThreshold: u,
    pinchOutside: s,
    preventClickEventOnDrag: i ? f : !1,
    preventClickEventOnDragStart: i ? l : !1,
    preventClickEventByCondition: i ? null : function(C) {
      return t.controlBox.contains(C.target);
    },
    checkInput: i ? c : !1,
    dragFocusedInput: v
  }, E = new Yu(r, D), y = n === "Control";
  return ["drag", "pinch"].forEach(function(C) {
    ["Start", "", "End"].forEach(function(_) {
      E.on("".concat(C).concat(_), function(w) {
        var P, O = w.eventType, T = C === "drag" && w.isPinch;
        if (a[O] && !a[O](w)) {
          w.stop();
          return;
        }
        if (!T) {
          var I = C === "drag" ? [C] : ["drag", C], z = N([], R(t[e]), !1), A = re(t, z, I, n, _, w);
          A ? (t.props.stopPropagation || _ === "Start" && y) && ((P = w?.inputEvent) === null || P === void 0 || P.stopPropagation()) : w.stop();
        }
      });
    });
  }), E;
}
var Sc = /* @__PURE__ */ function() {
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
function bc(t, r, e, n) {
  var a;
  e === void 0 && (e = r);
  var i = co(t, r), o = i.matrixes, s = i.is3d, u = i.targetMatrix, f = i.transformOrigin, l = i.targetOrigin, c = i.offsetContainer, v = i.hasFixed, d = i.zoom, p = Gf(c, e), g = p.matrixes, h = p.is3d, m = p.offsetContainer, x = p.zoom, S = n, b = 4, D = t.tagName.toLowerCase() !== "svg" && "ownerSVGElement" in t, E = u, y = mt(b), C = mt(b), _ = mt(b), w = mt(b), P = o.length, O = g.map(function(W) {
    return M(M({}, W), { matrix: W.matrix ? N([], R(W.matrix), !1) : void 0 });
  }).reverse();
  o.reverse(), !s && S && (E = Kt(E, 3, 4), Fn(o)), !h && S && Fn(O), O.forEach(function(W) {
    C = pt(C, W.matrix, b);
  });
  var T = e || gr(t), I = ((a = O[0]) === null || a === void 0 ? void 0 : a.target) || se(T, T, !0).offsetParent, z = O.slice(1).reduce(function(W, L) {
    return pt(W, L.matrix, b);
  }, mt(b));
  o.forEach(function(W, L) {
    if (P - 2 === L && (_ = y.slice()), P - 1 === L && (w = y.slice()), !W.matrix) {
      var G = o[L + 1], q = Al(W, G, I, b, pt(z, y, b));
      W.matrix = yr(q, b);
    }
    y = pt(y, W.matrix, b);
  });
  var A = !D && s;
  E || (E = mt(A ? 4 : 3));
  var F = Ze(D && E.length === 16 ? Kt(E, 4, 3) : E, A), k = C;
  return C = qi(C, b, b), {
    hasZoom: d !== 1 || x !== 1,
    hasFixed: v,
    matrixes: o,
    rootMatrix: C,
    originalRootMatrix: k,
    beforeMatrix: _,
    offsetMatrix: w,
    allMatrix: y,
    targetMatrix: E,
    targetTransform: F,
    inlineTransform: t.style.transform,
    transformOrigin: f,
    targetOrigin: l,
    is3d: S,
    offsetContainer: c,
    offsetRootContainer: m
  };
}
function Ec(t, r, e, n) {
  e === void 0 && (e = r);
  var a = 0, i = 0, o = 0, s = {}, u = No(t);
  if (t && (a = u.offsetWidth, i = u.offsetHeight), t) {
    var f = bc(t, r, e, n), l = kr(f.allMatrix, f.transformOrigin, a, i);
    s = M(M({}, f), l);
    var c = kr(f.allMatrix, [50, 50], 100, 100);
    o = Wo([c.pos1, c.pos2], c.direction);
  }
  var v = 4;
  return M(M(M({ hasZoom: !1, width: a, height: i, rotation: o }, u), { originalRootMatrix: mt(v), rootMatrix: mt(v), beforeMatrix: mt(v), offsetMatrix: mt(v), allMatrix: mt(v), targetMatrix: mt(v), targetTransform: "", inlineTransform: "", transformOrigin: [0, 0], targetOrigin: [0, 0], is3d: !!n, left: 0, top: 0, right: 0, bottom: 0, origin: [0, 0], pos1: [0, 0], pos2: [0, 0], pos3: [0, 0], pos4: [0, 0], direction: 1, hasFixed: !1, offsetContainer: null, offsetRootContainer: null, matrixes: [] }), s);
}
function Hn(t, r, e, n, a, i) {
  i === void 0 && (i = []);
  var o = 1, s = [0, 0], u = _e(), f = _e(), l = _e(), c = _e(), v = [0, 0], d = {}, p = Ec(r, e, a, !0);
  if (r) {
    var g = Nt(r);
    i.forEach(function(O) {
      d[O] = g(O);
    });
    var h = p.is3d ? 4 : 3, m = kr(p.offsetMatrix, ft(p.transformOrigin, Vi(p.targetMatrix, h)), p.width, p.height);
    o = m.direction, s = ft(m.origin, [m.left - p.left, m.top - p.top]), c = te(p.offsetRootContainer);
    var x = se(n, n, !0).offsetParent || p.offsetRootContainer;
    if (p.hasZoom) {
      var S = kr(pt(p.originalRootMatrix, p.allMatrix), p.transformOrigin, p.width, p.height), b = kr(p.originalRootMatrix, Ne(Nt(x)("transformOrigin")).map(function(O) {
        return parseFloat(O);
      }), x.offsetWidth, x.offsetHeight);
      if (u = pn(S, c), l = pn(b, c, x, !0), t) {
        var D = S.left, E = S.top;
        f = pn({
          left: D,
          top: E,
          bottom: E,
          right: E
        }, c);
      }
    } else {
      u = te(r), l = zf(x), t && (f = te(t));
      var y = l.left, C = l.top, _ = l.clientLeft, w = l.clientTop, P = [
        u.left - y,
        u.top - C
      ];
      v = Q(Lr(p.rootMatrix, P, 4), [_ + p.left, w + p.top]);
    }
  }
  return M({ targetClientRect: u, containerClientRect: l, moveableClientRect: f, rootContainerClientRect: c, beforeDirection: o, beforeOrigin: s, originalBeforeOrigin: s, target: r, style: d, offsetDelta: v }, p);
}
function Ei(t) {
  var r = t.pos1, e = t.pos2, n = t.pos3, a = t.pos4;
  if (!r || !e || !n || !a)
    return null;
  var i = Cr([r, e, n, a]), o = [i.minX, i.minY], s = Q(t.origin, o);
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
  ce(r, t);
  function r() {
    var e = t !== null && t.apply(this, arguments) || this;
    return e.state = M({ container: null, gestos: {}, renderLines: [
      [[0, 0], [0, 0]],
      [[0, 0], [0, 0]],
      [[0, 0], [0, 0]],
      [[0, 0], [0, 0]]
    ], renderPoses: [[0, 0], [0, 0], [0, 0], [0, 0]], disableNativeEvent: !1, posDelta: [0, 0] }, Hn(null)), e.renderState = {}, e.enabledAbles = [], e.targetAbles = [], e.controlAbles = [], e.rotation = 0, e.scale = [1, 1], e.isMoveableMounted = !1, e.isUnmounted = !1, e.events = {
      mouseEnter: null,
      mouseLeave: null
    }, e._emitter = new aa(), e._prevOriginalDragTarget = null, e._originalDragTarget = null, e._prevDragTarget = null, e._dragTarget = null, e._prevPropTarget = null, e._propTarget = null, e._prevDragArea = !1, e._isPropTargetChanged = !1, e._hasFirstTarget = !1, e._reiszeObserver = null, e._observerId = 0, e._mutationObserver = null, e._rootContainer = null, e._viewContainer = null, e._viewClassNames = [], e._store = {}, e.checkUpdateRect = function() {
      if (!e.isDragging()) {
        var n = e.props.parentMoveable;
        if (n) {
          n.checkUpdateRect();
          return;
        }
        nu(e._observerId), e._observerId = Wi(function() {
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
    var p = R(a || [0, 0], 2), g = p[0], h = p[1], m = n.left, x = n.top, S = n.target, b = n.direction, D = n.hasFixed, E = n.offsetDelta, y = e.targets, C = this.isDragging(), _ = {};
    this.getEnabledAbles().forEach(function(z) {
      _["data-able-".concat(z.name.toLowerCase())] = !0;
    });
    var w = this._getAbleClassName(), P = y && y.length && (S || c) || o || !this._hasFirstTarget && this.state.isPersisted, O = this.controlBox || this.props.firstRenderState || this.props.persistData, T = [m - g, x - h];
    !c && e.useAccuratePosition && (T[0] += E[0], T[1] += E[1]);
    var I = {
      position: D ? "fixed" : "absolute",
      display: P ? "block" : "none",
      visibility: O ? "visible" : "hidden",
      transform: "translate3d(".concat(T[0], "px, ").concat(T[1], "px, ").concat(f, ")"),
      "--zoom": s,
      "--zoompx": "".concat(s, "px")
    };
    return v && (I["--moveable-line-padding"] = v), d && (I["--moveable-control-padding"] = d), ut.createElement(
      l,
      M({ cspNonce: u, ref: Er(this, "controlBox"), className: "".concat(K("control-box", b === -1 ? "reverse" : "", C ? "dragging" : ""), " ").concat(w, " ").concat(i) }, _, { onClick: this._onPreventClick, style: I }),
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
    a && this._changeAbleViewClassNames([]), zr(this, !1), zr(this, !0);
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
    return Lt(n, function(a) {
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
    return e && (((n = e.getAttribute) === null || n === void 0 ? void 0 : n.call(e, "class")) || "").indexOf(sa) > -1;
  }, r.prototype.dragStart = function(e, n) {
    n === void 0 && (n = e.target);
    var a = this.targetGesto, i = this.controlGesto;
    return a && Ma(this)({ inputEvent: e }, n) ? a.isFlag() || a.triggerDragStart(e) : i && this.isMoveableElement(n) && (i.isFlag() || i.triggerDragStart(e)), this;
  }, r.prototype.hitTest = function(e) {
    var n = this.state, a = n.target, i = n.pos1, o = n.pos2, s = n.pos3, u = n.pos4, f = n.targetClientRect;
    if (!a)
      return 0;
    var l;
    if (ta(e)) {
      var c = e.getBoundingClientRect();
      l = {
        left: c.left,
        top: c.top,
        width: c.width,
        height: c.height
      };
    } else
      l = M({ width: 0, height: 0 }, e);
    var v = l.left, d = l.top, p = l.width, g = l.height, h = Xa([i, o, u, s], f), m = Au(h, [
      [v, d],
      [v + p, d],
      [v + p, d + g],
      [v, d + g]
    ]), x = Zi(h);
    return !m || !x ? 0 : Math.min(100, m / x * 100);
  }, r.prototype.isInside = function(e, n) {
    var a = this.state, i = a.target, o = a.pos1, s = a.pos2, u = a.pos3, f = a.pos4, l = a.targetClientRect;
    return i ? _n([e, n], Xa([o, s, f, u], l)) : !1;
  }, r.prototype.updateRect = function(e, n, a) {
    a === void 0 && (a = !0);
    var i = this.props, o = !i.parentPosition && !i.wrapperMoveable;
    o && Nr(!0);
    var s = i.parentMoveable, u = this.state, f = u.target || i.target, l = this.getContainer(), c = s ? s._rootContainer : this._rootContainer, v = Hn(this.controlBox, f, l, l, c || l, this._getRequestStyles());
    if (!f && this._hasFirstTarget && i.persistData) {
      var d = Ei(i.persistData);
      for (var p in d)
        v[p] = d[p];
    }
    o && Nr(), this.updateState(v, s ? !1 : a);
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
    var e = this.state, n = jt(this.state), a = R(n, 4), i = a[0], o = a[1], s = a[2], u = a[3], f = qt(n), l = e.width, c = e.height, v = f.width, d = f.height, p = f.left, g = f.top, h = [e.left, e.top], m = ft(h, e.origin), x = ft(h, e.beforeOrigin), S = e.transformOrigin;
    return {
      width: v,
      height: d,
      left: p,
      top: g,
      pos1: i,
      pos2: o,
      pos3: s,
      pos4: u,
      offsetWidth: l,
      offsetHeight: c,
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
      n?.isIdle() === !1 && Nn(this, !1), n?.stop();
    }
    if (!e || e === "control") {
      var n = this.controlGesto;
      n?.isIdle() === !1 && Nn(this, !0), n?.stop();
    }
  }, r.prototype.getRotation = function() {
    var e = this.state, n = e.pos1, a = e.pos2, i = e.direction;
    return Xl(n, a, i);
  }, r.prototype.request = function(e, n, a) {
    n === void 0 && (n = {});
    var i = this, o = i.props, s = o.parentMoveable || o.wrapperMoveable || i, u = s.props.ables, f = o.groupable, l = Lt(u, function(m) {
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
    var c = l.request(i), v = a || n.isInstant, d = c.isControl ? "controlAbles" : "targetAbles", p = "".concat(f ? "Group" : "").concat(c.isControl ? "Control" : ""), g = N([], R(s[d]), !1), h = {
      request: function(m) {
        return re(i, g, ["drag"], p, "", M(M({}, c.request(m)), { requestAble: e, isRequest: !0 }), v), h;
      },
      requestEnd: function() {
        return re(i, g, ["drag"], p, "End", M(M({}, c.requestEnd()), { requestAble: e, isRequest: !0 }), v), h;
      }
    };
    return re(i, g, ["drag"], p, "Start", M(M({}, c.requestStart(n)), { requestAble: e, isRequest: !0 }), v), v ? h.request(n).requestEnd() : h;
  }, r.prototype.getMoveables = function() {
    return [this];
  }, r.prototype.destroy = function() {
    this.componentWillUnmount();
  }, r.prototype.updateRenderPoses = function() {
    var e = this.getState(), n = this.props, a = n.padding, i = e.originalBeforeOrigin, o = e.transformOrigin, s = e.allMatrix, u = e.is3d, f = e.pos1, l = e.pos2, c = e.pos3, v = e.pos4, d = e.left, p = e.top, g = e.isPersisted, h = n.zoom || 1;
    if (!a && h <= 1) {
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
    var m = Zo(a || {}), x = m.left, S = m.top, b = m.bottom, D = m.right, E = u ? 4 : 3, y = [];
    g ? y = o : this.controlBox && n.groupable ? y = i : y = ft(i, [d, p]);
    var C = ze(E, yr(y.map(function(I) {
      return -I;
    }), E), s, yr(o, E)), _ = Yt(C, f, [-x, -S], E), w = Yt(C, l, [D, -S], E), P = Yt(C, c, [-x, b], E), O = Yt(C, v, [D, b], E);
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
          Yt(C, f, [-x - T, -S], E),
          Yt(C, l, [D + T, -S], E)
        ],
        [
          Yt(C, l, [D, -S - T], E),
          Yt(C, v, [D, b + T], E)
        ],
        [
          Yt(C, v, [D + T, b], E),
          Yt(C, c, [-x - T, b], E)
        ],
        [
          Yt(C, c, [-x, b + T], E),
          Yt(C, f, [-x, -S - T], E)
        ]
      ];
    }
  }, r.prototype.checkUpdate = function() {
    this._isPropTargetChanged = !1;
    var e = this.props, n = e.target, a = e.container, i = e.parentMoveable, o = this.state, s = o.target, u = o.container;
    if (!(!s && !n)) {
      this.updateAbles();
      var f = !Wn(s, n), l = f || !Wn(u, a);
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
    return a[i] || (a[i] = Qi(e, n)), a[i];
  }, r.prototype.getState = function() {
    var e, n = this.props;
    (n.target || !((e = n.targets) === null || e === void 0) && e.length) && (this._hasFirstTarget = !0);
    var a = this.controlBox, i = n.persistData, o = n.firstRenderState;
    if (o && !a)
      return o;
    if (!this._hasFirstTarget && i) {
      var s = Ei(i);
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
    var a = this.props, i = a.triggerAblesSimultaneously, o = this.getEnabledAbles(e), s = "drag".concat(n, "Start"), u = "pinch".concat(n, "Start"), f = "drag".concat(n, "ControlStart"), l = Me(o, [s, u], i), c = Me(o, [f], i);
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
      createElement: ut.createElement
    };
    return this.renderState = {}, Wl(Vo(Me(this.getEnabledAbles(), ["render"], a).map(function(o) {
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
    i && (zr(this, !1), this.updateState({ gestos: {} })), n || zr(this, !0), a && e && !this.targetGesto && (this.targetGesto = is(this, a, "")), !this.controlGesto && n && (this.controlGesto = os(this, "Control"));
  }, r.prototype._updateTargets = function() {
    var e = this.props;
    this._prevPropTarget = this._propTarget, this._prevDragTarget = this._dragTarget, this._prevOriginalDragTarget = this._originalDragTarget, this._prevDragArea = e.dragArea, this._propTarget = e.target, this._originalDragTarget = e.dragTarget || e.target, this._dragTarget = Jt(this._originalDragTarget, !0);
  }, r.prototype._renderLines = function() {
    var e = this.props, n = e, a = n.zoom, i = n.hideDefaultLines, o = n.hideChildMoveableDefaultLines, s = n.parentMoveable;
    if (i || s && o)
      return [];
    var u = this.getState(), f = {
      createElement: ut.createElement
    };
    return u.renderLines.map(function(l, c) {
      return oe(f, "", l[0], l[1], a, "render-line-".concat(c));
    });
  }, r.prototype._isTargetChanged = function(e) {
    var n = this.props, a = n.dragTarget || n.target, i = this._prevOriginalDragTarget, o = this._prevDragArea, s = n.dragArea, u = !s && i !== a, f = (e || s) && o !== s;
    return u || f || this._prevPropTarget != this._propTarget;
  }, r.prototype._updateNativeEvents = function() {
    var e = this, n = this.props, a = n.dragArea ? this.areaElement : this.state.target, i = this.events, o = Yr(i);
    if (this._isTargetChanged())
      for (var s in i) {
        var u = i[s];
        u && u.destroy(), i[s] = null;
      }
    if (a) {
      var f = this.enabledAbles;
      o.forEach(function(l) {
        var c = Me(f, [l]), v = c.length > 0, d = i[l];
        if (!v) {
          d && (d.destroy(), i[l] = null);
          return;
        }
        d || (d = new Sc(a, e, l), i[l] = d), d.setAbles(c);
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
      this.isDragging() ? Kl : ""
    ], !1));
  }, r.prototype._changeAbleViewClassNames = function(e) {
    var n = this._viewContainer, a = qo(e.filter(Boolean), function(f) {
      return f;
    }).map(function(f) {
      var l = R(f, 1), c = l[0];
      return c;
    }), i = this._viewClassNames, o = na(i, a), s = o.removed, u = o.added;
    s.forEach(function(f) {
      Yi(n, i[f]);
    }), u.forEach(function(f) {
      Hi(n, a[f]);
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
      return (!((c = s[d]) === null || c === void 0) && c.isEventStart || !((v = u[d]) === null || v === void 0) && v.isEventStart) && (p += " ".concat(K("".concat(d).concat(e, "-dragging")))), p.trim();
    }).filter(Boolean).join(" ");
  }, r.prototype._updateResizeObserver = function(e) {
    var n, a = this.props, i = a.target, o = cr(this.getControlBoxElement());
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
    var n = this, a, i = this.props, o = i.target, s = cr(this.getControlBoxElement());
    if (!s.MutationObserver || !o || !i.useMutationObserver) {
      (a = this._mutationObserver) === null || a === void 0 || a.disconnect();
      return;
    }
    if (!(e.target === o && this._mutationObserver)) {
      var u = new s.MutationObserver(function(f) {
        var l, c;
        try {
          for (var v = tf(f), d = v.next(); !d.done; d = v.next()) {
            var p = d.value;
            p.type === "attributes" && p.attributeName === "style" && n.checkUpdateRect();
          }
        } catch (g) {
          l = { error: g };
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
    flushSync: Bo,
    firstRenderState: null,
    persistData: null,
    viewContainer: null,
    requestStyles: [],
    useAccuratePosition: !1
  }, r;
}(ut.PureComponent), wa = {
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
    var v = Gr(t, "parentPosition", [o, s], function(p) {
      return p.join(",");
    }), d = Gr(t, "requestStyles", t.getRequestChildStyles(), function(p) {
      return p.join(",");
    });
    return t.moveables = t.moveables.slice(0, a.length), N(N([], R(a.map(function(p, g) {
      return r.createElement(Hr, { key: "moveable" + g, ref: ki(t, "moveables", g), target: p, origin: !1, requestStyles: d, cssStyled: n.cssStyled, customStyledMap: n.customStyledMap, useResizeObserver: n.useResizeObserver, useMutationObserver: n.useMutationObserver, hideChildMoveableDefaultLines: n.hideChildMoveableDefaultLines, parentMoveable: t, parentPosition: [o, s], persistData: c[g], zoom: f });
    })), !1), R(Vo(l.map(function(p, g) {
      var h = p.pos1, m = p.pos2, x = p.pos3, S = p.pos4, b = [h, m, x, S];
      return [
        [0, 1],
        [1, 3],
        [3, 2],
        [2, 0]
      ].map(function(D, E) {
        var y = R(D, 2), C = y[0], _ = y[1];
        return oe(r, "", Q(b[C], v), Q(b[_], v), f, "group-rect-".concat(g, "-").concat(E));
      });
    }))), !1);
  }
}, Dc = ve("clickable", {
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
var yc = ve("edgeDraggable", {
  css: [
    `.edge.edgeDraggable.line {
cursor: move;
}`
  ],
  render: function(t, r) {
    var e = t.props, n = e.edgeDraggable;
    return n ? go(r, "edgeDraggable", n, t.getState().renderPoses, e.zoom) : [];
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
}), us = {
  name: "individualGroupable",
  props: [
    "individualGroupable",
    "individualGroupableProps"
  ],
  events: []
}, Cc = [
  ns,
  Qo,
  wl,
  Vl,
  Gt,
  yc,
  Bn,
  jl,
  $l,
  fl,
  tc,
  rc,
  Jl,
  dc,
  vc,
  mc,
  wa,
  us,
  Dc,
  Jo,
  as
];
function Di(t, r) {
  var e = R(t, 3), n = e[0], a = e[1], i = e[2];
  return (n * r[0] + a * r[1] + i) / Math.sqrt(n * n + a * a);
}
function Te(t, r) {
  var e = R(t, 2), n = e[0], a = e[1];
  return -n * r[0] - a * r[1];
}
function yi(t, r) {
  return Math.max.apply(Math, N([], R(t.map(function(e) {
    var n = R(e, 4), a = n[0], i = n[1], o = n[2], s = n[3];
    return Math.max(a[r], i[r], o[r], s[r]);
  })), !1));
}
function Ci(t, r) {
  return Math.min.apply(Math, N([], R(t.map(function(e) {
    var n = R(e, 4), a = n[0], i = n[1], o = n[2], s = n[3];
    return Math.min(a[r], i[r], o[r], s[r]);
  })), !1));
}
function _c(t, r) {
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
  var c = tt(r, At);
  if (c % 90) {
    var v = c / 180 * Math.PI, d = Math.tan(v), p = -1 / d, g = [Pn, ja], h = [[0, 0], [0, 0]], m = [Pn, ja], x = [[0, 0], [0, 0]];
    t.forEach(function(V) {
      V.forEach(function(H) {
        var j = Di([-d, 1, 0], H), Y = Di([-p, 1, 0], H);
        g[0] > j && (h[0] = H, g[0] = j), g[1] < j && (h[1] = H, g[1] = j), m[0] > Y && (x[0] = H, m[0] = Y), m[1] < Y && (x[1] = H, m[1] = Y);
      });
    });
    var S = R(h, 2), b = S[0], D = S[1], E = R(x, 2), y = E[0], C = E[1], _ = [-d, 1, Te([-d, 1], b)], w = [-d, 1, Te([-d, 1], D)], P = [-p, 1, Te([-p, 1], y)], O = [-p, 1, Te([-p, 1], C)];
    e = R([
      [_, P],
      [_, O],
      [w, P],
      [w, O]
    ].map(function(V) {
      var H = R(V, 2), j = H[0], Y = H[1];
      return ia(j, Y)[0];
    }), 4), i = e[0], o = e[1], s = e[2], u = e[3], f = m[1] - m[0], l = g[1] - g[0];
  } else {
    var T = Ci(t, 0), I = Ci(t, 1), z = yi(t, 0), A = yi(t, 1);
    if (i = [T, I], o = [z, I], s = [T, A], u = [z, A], f = z - T, l = A - I, c % 180) {
      var F = [s, i, u, o];
      n = R(F, 4), i = n[0], o = n[1], s = n[2], u = n[3], f = A - I, l = z - T;
    }
  }
  if (c % 360 > 180) {
    var F = [u, s, o, i];
    a = R(F, 4), i = a[0], o = a[1], s = a[2], u = a[3];
  }
  var k = Cr([i, o, s, u]), W = k.minX, L = k.minY, G = k.maxX, q = k.maxY;
  return {
    pos1: i,
    pos2: o,
    pos3: s,
    pos4: u,
    width: f,
    height: l,
    minX: W,
    minY: L,
    maxX: G,
    maxY: q,
    rotation: r
  };
}
function fs(t, r) {
  var e = r.map(function(n) {
    if (wt(n)) {
      var a = fs(t, n), i = a.length;
      return i > 1 ? a : i === 1 ? a[0] : null;
    } else {
      var o = Lt(t, function(s) {
        var u = s.manager;
        return u.props.target === n;
      });
      return o ? (o.finded = !0, o.manager) : null;
    }
  }).filter(Boolean);
  return e.length === 1 && wt(e[0]) ? e[0] : e;
}
var Mc = /* @__PURE__ */ function(t) {
  ce(r, t);
  function r() {
    var e = t !== null && t.apply(this, arguments) || this;
    return e.differ = new $i(), e.moveables = [], e.transformOrigin = "50% 50%", e.renderGroupRects = [], e._targetGroups = [], e._hasFirstTargets = !1, e;
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
    Nr(!0), this.moveables.forEach(function(J) {
      J.updateRect(e, !1, !1);
    });
    var s = this.props, u = this.moveables, f = o.target || s.target, l = u.map(function(J) {
      return { finded: !1, manager: J };
    }), c = this.props.targetGroups || [], v = fs(l, c), d = s.useDefaultGroupRotate;
    v.push.apply(v, N([], R(l.filter(function(J) {
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
          var it = x(gt, at), ct = [it.pos1, it.pos2, it.pos3, it.pos4];
          return p.push(it), { poses: ct, rotation: it.rotation };
        } else
          return {
            poses: jt(gt.state),
            rotation: gt.getRotation()
          };
      }), Z = X.map(function(gt) {
        var it = gt.rotation;
        return it;
      }), lt = 0, rt = Z[0], et = Z.every(function(gt) {
        return Math.abs(rt - gt) < 0.1;
      });
      g ? lt = !d && et ? rt : h : lt = !d && !st && et ? rt : at;
      var ot = X.map(function(gt) {
        var it = gt.poses;
        return it;
      }), vt = _c(ot, lt);
      return vt;
    }
    var S = x(v, this.rotation, !0);
    g && (this.rotation = S.rotation, this.transformOrigin = s.defaultGroupOrigin || "50% 50%", this.scale = [1, 1]), this._targetGroups = c, this.renderGroupRects = p;
    var b = this.transformOrigin, D = this.rotation, E = this.scale, y = S.width, C = S.height, _ = S.minX, w = S.minY, P = ql([
      [0, 0],
      [y, 0],
      [0, C],
      [y, C]
    ], ya(b, y, C), this.rotation / 180 * Math.PI), O = Cr(P.result), T = O.minX, I = O.minY, z = " rotate(".concat(D, "deg)") + " scale(".concat(Bt(E[0]), ", ").concat(Bt(E[1]), ")"), A = "translate(".concat(-T, "px, ").concat(-I, "px)").concat(z);
    this.controlBox.style.transform = "translate3d(".concat(_, "px, ").concat(w, "px, ").concat(this.props.translateZ || 0, ")"), f.style.cssText += "left:0px;top:0px;" + "transform-origin:".concat(b, ";") + "width:".concat(y, "px;height:").concat(C, "px;") + "transform: ".concat(A), o.width = y, o.height = C;
    var F = this.getContainer(), k = Hn(this.controlBox, f, this.controlBox, this.getContainer(), this._rootContainer || F, []), W = [k.left, k.top], L = R(jt(k), 4), G = L[0], q = L[1], V = L[2], H = L[3], j = Cr([G, q, V, H]), Y = [j.minX, j.minY], $ = Bt(E[0] * E[1]);
    k.pos1 = Q(G, Y), k.pos2 = Q(q, Y), k.pos3 = Q(V, Y), k.pos4 = Q(H, Y), k.left = _ - k.left + Y[0], k.top = w - k.top + Y[1], k.origin = Q(ft(W, k.origin), Y), k.beforeOrigin = Q(ft(W, k.beforeOrigin), Y), k.originalBeforeOrigin = ft(W, k.originalBeforeOrigin), k.transformOrigin = Q(ft(W, k.transformOrigin), Y), f.style.transform = "translate(".concat(-T - Y[0], "px, ").concat(-I - Y[1], "px)") + z, Nr(), this.updateState(M(M({}, k), { posDelta: Y, direction: $, beforeDirection: $ }), a);
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
    t.prototype.updateAbles.call(this, N(N([], R(this.props.ables), !1), [wa], !1), "Group");
  }, r.prototype._updateTargets = function() {
    t.prototype._updateTargets.call(this), this._originalDragTarget = this.props.dragTarget || this.areaElement, this._dragTarget = Jt(this._originalDragTarget, !0);
  }, r.prototype._updateEvents = function() {
    var e = this.state, n = this.props, a = this._prevDragTarget, i = n.dragTarget || this.areaElement, o = n.targets, s = this.differ.update(o), u = s.added, f = s.changed, l = s.removed, c = u.length || l.length;
    (c || this._prevOriginalDragTarget !== this._originalDragTarget) && (zr(this, !1), zr(this, !0), this.updateState({ gestos: {} })), a !== i && (e.target = null), e.target || (e.target = this.areaElement, this.controlBox.style.display = "block"), e.target && (this.targetGesto || (this.targetGesto = is(this, this._dragTarget, "Group")), this.controlGesto || (this.controlGesto = os(this, "GroupControl")));
    var v = !Wn(e.container, n.container);
    v && (e.container = n.container), (v || c || this.transformOrigin !== (n.defaultGroupOrigin || "50% 50%") || f.length || o.length && !$o(this._targetGroups, n.targetGroups || [])) && (this.updateRect(), this._hasFirstTargets = !0), this._isPropTargetChanged = !!c;
  }, r.prototype._updateObserver = function() {
  }, r.defaultProps = M(M({}, Hr.defaultProps), { transformOrigin: ["50%", "50%"], groupable: !0, dragArea: !0, keepRatio: !0, targets: [], defaultGroupRotate: 0, defaultGroupOrigin: "50% 50%" }), r;
}(Hr), wc = /* @__PURE__ */ function(t) {
  ce(r, t);
  function r() {
    var e = t !== null && t.apply(this, arguments) || this;
    return e.moveables = [], e;
  }
  return r.prototype.render = function() {
    var e = this, n, a = this.props, i = a.cspNonce, o = a.cssStyled, s = a.persistData, u = a.targets || [], f = u.length, l = this.isUnmounted || !f, c = (n = s?.children) !== null && n !== void 0 ? n : [];
    return l && !f && c.length ? u = c.map(function() {
      return null;
    }) : l || (c = []), ut.createElement(o, { cspNonce: i, ref: Er(this, "controlBox"), className: K("control-box") }, u.map(function(v, d) {
      var p, g, h = (g = (p = a.individualGroupableProps) === null || p === void 0 ? void 0 : p.call(a, v, d)) !== null && g !== void 0 ? g : {};
      return ut.createElement(Hr, M({ key: "moveable" + d, ref: ki(e, "moveables", d) }, a, h, { target: v, wrapperMoveable: e, isWrapperMounted: e.isMoveableMounted, persistData: c[d] }));
    }));
  }, r.prototype.componentDidMount = function() {
  }, r.prototype.componentDidUpdate = function() {
  }, r.prototype.getTargets = function() {
    return this.props.targets;
  }, r.prototype.updateRect = function(e, n, a) {
    a === void 0 && (a = !0), Nr(!0), this.moveables.forEach(function(i) {
      i.updateRect(e, n, a);
    }), Nr();
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
    var a = n, i = Lt(this.moveables, function(o) {
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
function ls(t, r) {
  var e = [];
  return t.forEach(function(n) {
    if (n) {
      if (ar(n)) {
        r[n] && e.push.apply(e, N([], R(r[n]), !1));
        return;
      }
      wt(n) ? e.push.apply(e, N([], R(ls(n, r)), !1)) : e.push(n);
    }
  }), e;
}
function cs(t, r) {
  var e = [];
  return t.forEach(function(n) {
    if (n) {
      if (ar(n)) {
        r[n] && e.push.apply(e, N([], R(r[n]), !1));
        return;
      }
      wt(n) ? e.push(cs(n, r)) : e.push(n);
    }
  }), e;
}
function vs(t, r) {
  return t.length !== r.length || t.some(function(e, n) {
    var a = r[n];
    return !e && !a ? !1 : e != a ? wt(e) && wt(a) ? vs(e, a) : !0 : !1;
  });
}
var Rc = /* @__PURE__ */ function(t) {
  ce(r, t);
  function r() {
    var e = t !== null && t.apply(this, arguments) || this;
    return e.refTargets = [], e.selectorMap = {}, e._differ = new $i(), e._elementTargets = [], e._tmpRefTargets = [], e._tmpSelectorMap = {}, e._onChangeTargets = null, e;
  }
  return r.makeStyled = function() {
    var e = {}, n = this.getTotalAbles();
    n.forEach(function(i) {
      var o = i.css;
      o && o.forEach(function(s) {
        e[s] = !0;
      });
    });
    var a = Yr(e).join(`
`);
    this.defaultStyled = Qi("div", qs(sa, vf + a));
  }, r.getTotalAbles = function() {
    return N([Qo, wa, us, Jo], R(this.defaultAbles), !1);
  }, r.prototype.render = function() {
    var e, n = this.constructor;
    n.defaultStyled || n.makeStyled();
    var a = this.props, i = a.ables, o = a.props, s = Ju(a, ["ables", "props"]), u = R(this._updateRefs(!0), 2), f = u[0], l = u[1], c = ls(f, l), v = c.length > 1, d = n.getTotalAbles(), p = N(N([], R(d), !1), R(i || []), !1), g = M(M(M({}, s), o || {}), { ables: p, cssStyled: n.defaultStyled, customStyledMap: n.customStyledMap });
    this._elementTargets = c;
    var h = null, m = this.moveable, x = s.persistData;
    if (x?.children && (v = !0), s.individualGroupable)
      return ut.createElement(wc, M({ key: "individual-group", ref: Er(this, "moveable") }, g, { target: null, targets: c }));
    if (v) {
      var S = cs(f, l);
      if (m && !m.props.groupable && !m.props.individualGroupable) {
        var b = m.props.target;
        b && c.indexOf(b) > -1 && (h = M({}, m.state));
      }
      return ut.createElement(Mc, M({ key: "group", ref: Er(this, "moveable") }, g, (e = s.groupableProps) !== null && e !== void 0 ? e : {}, { target: null, targets: c, targetGroups: S, firstRenderState: h }));
    } else {
      var D = c[0];
      if (m && (m.props.groupable || m.props.individualGroupable)) {
        var E = m.moveables || [], y = Lt(E, function(C) {
          return C.props.target === D;
        });
        y && (h = M({}, y.state));
      }
      return ut.createElement(Hr, M({ key: "single", ref: Er(this, "moveable") }, g, { target: D, firstRenderState: h }));
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
    var n = this.refTargets, a = Da(this.props.target || this.props.targets), i = typeof document < "u", o = vs(n, a), s = this.selectorMap, u = {};
    return this.refTargets.forEach(function f(l) {
      if (ar(l)) {
        var c = s[l];
        c ? u[l] = s[l] : i && (o = !0, u[l] = [].slice.call(document.querySelectorAll(l)));
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
    var f = R(this._updateRefs(), 3), l = f[0], c = f[1], v = f[2];
    this.refTargets = l, this.selectorMap = c, v && this.forceUpdate();
  }, r.defaultAbles = [], r.customStyledMap = {}, r.defaultStyled = null, Qu([
    Vs(gf)
  ], r.prototype, "moveable", void 0), r;
}(ut.PureComponent), Yn = /* @__PURE__ */ function(t) {
  ce(r, t);
  function r() {
    return t !== null && t.apply(this, arguments) || this;
  }
  return r.defaultAbles = Cc, r;
}(Rc);
function Tc({ cmn: { styChild: t, sys: r, isDesignMode: e, sty4Moveable: n }, fn: a }) {
  const i = (f) => r.cfg.searchPath(f, Rs.SP_GSM), o = (f) => {
    f.button == 1 && console.log("fn:GrpLayer.tsx line:28 MIDDLE:");
  }, s = ut.useRef(null), u = (f, l) => {
    ds(), f.transform = l;
  };
  return /* @__PURE__ */ Br(Pe, { children: [
    /* @__PURE__ */ Xt("img", { css: t, src: i(a), ref: s, style: n, onMouseDown: (f) => o(f) }),
    e && /* @__PURE__ */ Xt(
      Yn,
      {
        target: s,
        draggable: !0,
        throttleDrag: 1,
        onDrag: ({ target: { style: f }, transform: l }) => u(f, l),
        resizable: !0,
        keepRatio: !0,
        onResize: ({ target: { style: f }, width: l, height: c, drag: { transform: v } }) => {
          u(f, v), f.width = `${l}px`, f.height = `${c}px`;
        },
        rotatable: !0,
        throttleRotate: 0,
        startDragRotate: 0,
        throttleDragRotate: 0,
        rotationPosition: "top",
        onRotate: ({ target: { style: f }, drag: { transform: l } }) => u(f, l),
        originDraggable: !0,
        onDragOrigin: ({ target: { style: f }, transformOrigin: l, drag: { transform: c } }) => {
          u(f, c), f.transformOrigin = l;
        }
      }
    )
  ] });
}
var _i = function(r, e) {
  var n = arguments;
  if (e == null || !ys.call(e, "css"))
    return ut.createElement.apply(void 0, n);
  var a = n.length, i = new Array(a);
  i[0] = Cs, i[1] = _s(r, e);
  for (var o = 2; o < a; o++)
    i[o] = n[o];
  return ut.createElement.apply(null, i);
};
(function(t) {
  var r;
  r || (r = t.JSX || (t.JSX = {}));
})(_i || (_i = {}));
function ee() {
  for (var t = arguments.length, r = new Array(t), e = 0; e < t; e++)
    r[e] = arguments[e];
  return Ds(r);
}
function Oc({ cmn: { styChild: t, isDesignMode: r, sty4Moveable: e }, str: n }) {
  const a = ee`
		padding: 1em 1.5em;
		margin: 2em 0;
		background-color: aquamarine;
		border: dotted 6px #ffa500;

		font-size: xxx-large;
		top: 48%;
		width: 70%;
	`, i = ee`
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
	`, [o, s] = ut.useState("");
  ut.useEffect(() => s(n), [n]);
  const u = ut.useRef(null), f = ut.useRef(null), l = (c, v) => {
    ds(), c.transform = v;
  };
  return /* @__PURE__ */ Br(Pe, { children: [
    /* @__PURE__ */ Xt("span", { css: [t, a], ref: u, style: e, children: o }),
    r && /* @__PURE__ */ Xt(
      Yn,
      {
        target: u,
        draggable: !0,
        throttleDrag: 1,
        onDrag: ({ target: { style: c }, transform: v }) => l(c, v),
        resizable: !0,
        keepRatio: !1,
        onResize: ({ target: { style: c }, width: v, height: d, drag: { transform: p } }) => {
          l(c, p), c.width = `${v}px`, c.height = `${d}px`;
        },
        rotatable: !0,
        throttleRotate: 0,
        startDragRotate: 0,
        throttleDragRotate: 0,
        rotationPosition: "top",
        onRotate: ({ target: { style: c }, drag: { transform: v } }) => l(c, v),
        originDraggable: !0,
        onDragOrigin: ({ target: { style: c }, transformOrigin: v, drag: { transform: d } }) => {
          l(c, d), c.transformOrigin = v;
        }
      }
    ),
    r && /* @__PURE__ */ Br(Pe, { children: [
      /* @__PURE__ */ Br("label", { css: i, ref: f, children: [
        "テキスト入力",
        /* @__PURE__ */ Xt("textarea", { rows: 3, value: o, onChange: (c) => s(c.target.value) })
      ] }),
      /* @__PURE__ */ Xt(
        Yn,
        {
          target: f,
          origin: !1,
          draggable: !0,
          throttleDrag: 1,
          onDrag: ({ target: { style: c }, transform: v }) => l(c, v),
          preventDefault: !1
        }
      )
    ] })
  ] });
}
function kc({
  arg: { sys: t },
  onClick: r,
  prev: e,
  next: n
}) {
  const a = za((D) => D.aLay), i = za((D) => D.replace);
  class o extends Ts {
    nm = "Stage";
    restore() {
      i(this.stt);
    }
    // this.stt から
  }
  t.caretaker.update(() => new o(JSON.stringify(a)));
  const [s, u] = ut.useState(Mi());
  Fa(() => {
    function D() {
      u(Mi());
    }
    return globalThis.addEventListener("resize", D), () => globalThis.removeEventListener("resize", D);
  });
  const { cvsScale: f } = Pc(s), l = ee`
		position: relative;

		transform-origin: left top;
		transform: scale(${f});
		width	: calc(${Wt.stageW}px / ${f});
		height	: calc(${Wt.stageH}px / ${f});
	`, c = ee`position: absolute; top: 0; left: 0;`, v = ee`
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
	`, d = ut.useRef(null);
  Fa(() => {
    const D = d.current;
    D.addEventListener("mousedown", () => Xn = !1);
    const E = (y) => {
      y.preventDefault(), y.deltaY < 0 ? n() : e();
    };
    return D.addEventListener("wheel", E, { passive: !1 }), () => D.removeEventListener("wheel", E);
  });
  const [p, g] = Ba(!1), h = Fs((D) => {
    D.stopPropagation(), Ms(), !Xn && (g(), ws(!p));
  }, { isPreventDefault: !0, delay: 300 }), [m, x] = Ba(!1), S = ks(d, m, { onClose: () => x(!1) }), b = { cmn: { sys: t, styChild: c, isDesignMode: p, sty4Moveable: {
    maxWidth: "auto",
    maxHeight: "auto",
    minWidth: "auto",
    minHeight: "auto",
    transform: "translate(0px, 0px) rotate(0deg)"
  } } };
  return /* @__PURE__ */ Br("div", { css: l, onClick: r, ...h, ref: d, children: [
    p && /* @__PURE__ */ Br(Pe, { children: [
      /* @__PURE__ */ Xt("button", { onClick: () => x(), css: v, children: "FullScr" }),
      /* @__PURE__ */ Xt("button", { onClick: () => {
      }, css: v, children: "Back" }),
      /* @__PURE__ */ Xt("button", { onClick: () => {
      }, css: v, children: "Prev" })
    ] }),
    /* @__PURE__ */ Xt("span", { children: S }),
    a.map((D) => D.cls === "GRP" ? /* @__PURE__ */ Xt(Tc, { cmn: b.cmn, fn: D.fn }, D.nm) : /* @__PURE__ */ Xt(Oc, { cmn: b.cmn, str: D.str }, D.nm))
  ] });
}
function Pc({ width: t, height: r }) {
  let e = 0, n = 0, a = 1;
  return Wt.stageW > t || Wt.stageH > r ? (Wt.stageW / Wt.stageH <= t / r ? (n = r, e = Ga(Wt.stageW / Wt.stageH * r)) : (e = t, n = Ga(Wt.stageH / Wt.stageW * t)), a = e / Wt.stageW) : (e = Wt.stageW, n = Wt.stageH, a = 1), { cvsScale: a, cvsWidth: e, cvsHeight: n };
}
function Mi() {
  const { innerWidth: t, innerHeight: r } = globalThis;
  return { width: t, height: r };
}
let Xn = !1;
const ds = () => {
  Xn = !0;
};
export {
  kc as default,
  ds as noticeDrag
};
//# sourceMappingURL=Stage.js.map
