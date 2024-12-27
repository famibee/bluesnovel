import { g as Ba, c as lr, a as Ma } from "./_commonjsHelpers.js";
import { ExtensionType as j, extensions as Z } from "./index2.js";
var ot = /* @__PURE__ */ ((r) => (r[r.WEBGL_LEGACY = 0] = "WEBGL_LEGACY", r[r.WEBGL = 1] = "WEBGL", r[r.WEBGL2 = 2] = "WEBGL2", r))(ot || {}), Sn = /* @__PURE__ */ ((r) => (r[r.UNKNOWN = 0] = "UNKNOWN", r[r.WEBGL = 1] = "WEBGL", r[r.CANVAS = 2] = "CANVAS", r))(Sn || {}), Is = /* @__PURE__ */ ((r) => (r[r.COLOR = 16384] = "COLOR", r[r.DEPTH = 256] = "DEPTH", r[r.STENCIL = 1024] = "STENCIL", r))(Is || {}), Y = /* @__PURE__ */ ((r) => (r[r.NORMAL = 0] = "NORMAL", r[r.ADD = 1] = "ADD", r[r.MULTIPLY = 2] = "MULTIPLY", r[r.SCREEN = 3] = "SCREEN", r[r.OVERLAY = 4] = "OVERLAY", r[r.DARKEN = 5] = "DARKEN", r[r.LIGHTEN = 6] = "LIGHTEN", r[r.COLOR_DODGE = 7] = "COLOR_DODGE", r[r.COLOR_BURN = 8] = "COLOR_BURN", r[r.HARD_LIGHT = 9] = "HARD_LIGHT", r[r.SOFT_LIGHT = 10] = "SOFT_LIGHT", r[r.DIFFERENCE = 11] = "DIFFERENCE", r[r.EXCLUSION = 12] = "EXCLUSION", r[r.HUE = 13] = "HUE", r[r.SATURATION = 14] = "SATURATION", r[r.COLOR = 15] = "COLOR", r[r.LUMINOSITY = 16] = "LUMINOSITY", r[r.NORMAL_NPM = 17] = "NORMAL_NPM", r[r.ADD_NPM = 18] = "ADD_NPM", r[r.SCREEN_NPM = 19] = "SCREEN_NPM", r[r.NONE = 20] = "NONE", r[r.SRC_OVER = 0] = "SRC_OVER", r[r.SRC_IN = 21] = "SRC_IN", r[r.SRC_OUT = 22] = "SRC_OUT", r[r.SRC_ATOP = 23] = "SRC_ATOP", r[r.DST_OVER = 24] = "DST_OVER", r[r.DST_IN = 25] = "DST_IN", r[r.DST_OUT = 26] = "DST_OUT", r[r.DST_ATOP = 27] = "DST_ATOP", r[r.ERASE = 26] = "ERASE", r[r.SUBTRACT = 28] = "SUBTRACT", r[r.XOR = 29] = "XOR", r))(Y || {}), ur = /* @__PURE__ */ ((r) => (r[r.POINTS = 0] = "POINTS", r[r.LINES = 1] = "LINES", r[r.LINE_LOOP = 2] = "LINE_LOOP", r[r.LINE_STRIP = 3] = "LINE_STRIP", r[r.TRIANGLES = 4] = "TRIANGLES", r[r.TRIANGLE_STRIP = 5] = "TRIANGLE_STRIP", r[r.TRIANGLE_FAN = 6] = "TRIANGLE_FAN", r))(ur || {}), L = /* @__PURE__ */ ((r) => (r[r.RGBA = 6408] = "RGBA", r[r.RGB = 6407] = "RGB", r[r.RG = 33319] = "RG", r[r.RED = 6403] = "RED", r[r.RGBA_INTEGER = 36249] = "RGBA_INTEGER", r[r.RGB_INTEGER = 36248] = "RGB_INTEGER", r[r.RG_INTEGER = 33320] = "RG_INTEGER", r[r.RED_INTEGER = 36244] = "RED_INTEGER", r[r.ALPHA = 6406] = "ALPHA", r[r.LUMINANCE = 6409] = "LUMINANCE", r[r.LUMINANCE_ALPHA = 6410] = "LUMINANCE_ALPHA", r[r.DEPTH_COMPONENT = 6402] = "DEPTH_COMPONENT", r[r.DEPTH_STENCIL = 34041] = "DEPTH_STENCIL", r))(L || {}), vt = /* @__PURE__ */ ((r) => (r[r.TEXTURE_2D = 3553] = "TEXTURE_2D", r[r.TEXTURE_CUBE_MAP = 34067] = "TEXTURE_CUBE_MAP", r[r.TEXTURE_2D_ARRAY = 35866] = "TEXTURE_2D_ARRAY", r[r.TEXTURE_CUBE_MAP_POSITIVE_X = 34069] = "TEXTURE_CUBE_MAP_POSITIVE_X", r[r.TEXTURE_CUBE_MAP_NEGATIVE_X = 34070] = "TEXTURE_CUBE_MAP_NEGATIVE_X", r[r.TEXTURE_CUBE_MAP_POSITIVE_Y = 34071] = "TEXTURE_CUBE_MAP_POSITIVE_Y", r[r.TEXTURE_CUBE_MAP_NEGATIVE_Y = 34072] = "TEXTURE_CUBE_MAP_NEGATIVE_Y", r[r.TEXTURE_CUBE_MAP_POSITIVE_Z = 34073] = "TEXTURE_CUBE_MAP_POSITIVE_Z", r[r.TEXTURE_CUBE_MAP_NEGATIVE_Z = 34074] = "TEXTURE_CUBE_MAP_NEGATIVE_Z", r))(vt || {}), se = /* @__PURE__ */ ((r) => (r[r.UNSIGNED_BYTE = 5121] = "UNSIGNED_BYTE", r[r.UNSIGNED_SHORT = 5123] = "UNSIGNED_SHORT", r[r.UNSIGNED_SHORT_5_6_5 = 33635] = "UNSIGNED_SHORT_5_6_5", r[r.UNSIGNED_SHORT_4_4_4_4 = 32819] = "UNSIGNED_SHORT_4_4_4_4", r[r.UNSIGNED_SHORT_5_5_5_1 = 32820] = "UNSIGNED_SHORT_5_5_5_1", r[r.UNSIGNED_INT = 5125] = "UNSIGNED_INT", r[r.UNSIGNED_INT_10F_11F_11F_REV = 35899] = "UNSIGNED_INT_10F_11F_11F_REV", r[r.UNSIGNED_INT_2_10_10_10_REV = 33640] = "UNSIGNED_INT_2_10_10_10_REV", r[r.UNSIGNED_INT_24_8 = 34042] = "UNSIGNED_INT_24_8", r[r.UNSIGNED_INT_5_9_9_9_REV = 35902] = "UNSIGNED_INT_5_9_9_9_REV", r[r.BYTE = 5120] = "BYTE", r[r.SHORT = 5122] = "SHORT", r[r.INT = 5124] = "INT", r[r.FLOAT = 5126] = "FLOAT", r[r.FLOAT_32_UNSIGNED_INT_24_8_REV = 36269] = "FLOAT_32_UNSIGNED_INT_24_8_REV", r[r.HALF_FLOAT = 36193] = "HALF_FLOAT", r))(se || {}), k = /* @__PURE__ */ ((r) => (r[r.FLOAT = 0] = "FLOAT", r[r.INT = 1] = "INT", r[r.UINT = 2] = "UINT", r))(k || {}), De = /* @__PURE__ */ ((r) => (r[r.NEAREST = 0] = "NEAREST", r[r.LINEAR = 1] = "LINEAR", r))(De || {}), Ws = /* @__PURE__ */ ((r) => (r[r.CLAMP = 33071] = "CLAMP", r[r.REPEAT = 10497] = "REPEAT", r[r.MIRRORED_REPEAT = 33648] = "MIRRORED_REPEAT", r))(Ws || {}), at = /* @__PURE__ */ ((r) => (r[r.OFF = 0] = "OFF", r[r.POW2 = 1] = "POW2", r[r.ON = 2] = "ON", r[r.ON_MANUAL = 3] = "ON_MANUAL", r))(at || {}), Pe = /* @__PURE__ */ ((r) => (r[r.NPM = 0] = "NPM", r[r.UNPACK = 1] = "UNPACK", r[r.PMA = 2] = "PMA", r[r.NO_PREMULTIPLIED_ALPHA = 0] = "NO_PREMULTIPLIED_ALPHA", r[r.PREMULTIPLY_ON_UPLOAD = 1] = "PREMULTIPLY_ON_UPLOAD", r[r.PREMULTIPLIED_ALPHA = 2] = "PREMULTIPLIED_ALPHA", r))(Pe || {}), Ze = /* @__PURE__ */ ((r) => (r[r.NO = 0] = "NO", r[r.YES = 1] = "YES", r[r.AUTO = 2] = "AUTO", r[r.BLEND = 0] = "BLEND", r[r.CLEAR = 1] = "CLEAR", r[r.BLIT = 2] = "BLIT", r))(Ze || {}), js = /* @__PURE__ */ ((r) => (r[r.AUTO = 0] = "AUTO", r[r.MANUAL = 1] = "MANUAL", r))(js || {}), Re = /* @__PURE__ */ ((r) => (r.LOW = "lowp", r.MEDIUM = "mediump", r.HIGH = "highp", r))(Re || {}), ve = /* @__PURE__ */ ((r) => (r[r.NONE = 0] = "NONE", r[r.SCISSOR = 1] = "SCISSOR", r[r.STENCIL = 2] = "STENCIL", r[r.SPRITE = 3] = "SPRITE", r[r.COLOR = 4] = "COLOR", r))(ve || {}), ge = /* @__PURE__ */ ((r) => (r[r.NONE = 0] = "NONE", r[r.LOW = 2] = "LOW", r[r.MEDIUM = 4] = "MEDIUM", r[r.HIGH = 8] = "HIGH", r))(ge || {}), Ue = /* @__PURE__ */ ((r) => (r[r.ELEMENT_ARRAY_BUFFER = 34963] = "ELEMENT_ARRAY_BUFFER", r[r.ARRAY_BUFFER = 34962] = "ARRAY_BUFFER", r[r.UNIFORM_BUFFER = 35345] = "UNIFORM_BUFFER", r))(Ue || {});
const Ua = {
  /**
   * Creates a canvas element of the given size.
   * This canvas is created using the browser's native canvas element.
   * @param width - width of the canvas
   * @param height - height of the canvas
   */
  createCanvas: (r, e) => {
    const t = document.createElement("canvas");
    return t.width = r, t.height = e, t;
  },
  getCanvasRenderingContext2D: () => CanvasRenderingContext2D,
  getWebGLRenderingContext: () => WebGLRenderingContext,
  getNavigator: () => navigator,
  getBaseUrl: () => document.baseURI ?? window.location.href,
  getFontFaceSet: () => document.fonts,
  fetch: (r, e) => fetch(r, e),
  parseXML: (r) => new DOMParser().parseFromString(r, "text/xml")
}, J = {
  /**
   * This adapter is used to call methods that are platform dependent.
   * For example `document.createElement` only runs on the web but fails in node environments.
   * This allows us to support more platforms by abstracting away specific implementations per platform.
   *
   * By default the adapter is set to work in the browser. However you can create your own
   * by implementing the `IAdapter` interface. See `IAdapter` for more information.
   * @name ADAPTER
   * @memberof PIXI.settings
   * @type {PIXI.IAdapter}
   * @default PIXI.BrowserAdapter
   */
  ADAPTER: Ua,
  /**
   * Default resolution / device pixel ratio of the renderer.
   * @static
   * @name RESOLUTION
   * @memberof PIXI.settings
   * @type {number}
   * @default 1
   */
  RESOLUTION: 1,
  /**
   * Enables bitmap creation before image load. This feature is experimental.
   * @static
   * @name CREATE_IMAGE_BITMAP
   * @memberof PIXI.settings
   * @type {boolean}
   * @default false
   */
  CREATE_IMAGE_BITMAP: !1,
  /**
   * If true PixiJS will Math.floor() x/y values when rendering, stopping pixel interpolation.
   * Advantages can include sharper image quality (like text) and faster rendering on canvas.
   * The main disadvantage is movement of objects may appear less smooth.
   * @static
   * @memberof PIXI.settings
   * @type {boolean}
   * @default false
   */
  ROUND_PIXELS: !1
};
var Or = /iPhone/i, ci = /iPod/i, di = /iPad/i, fi = /\biOS-universal(?:.+)Mac\b/i, Br = /\bAndroid(?:.+)Mobile\b/i, pi = /Android/i, ct = /(?:SD4930UR|\bSilk(?:.+)Mobile\b)/i, jt = /Silk/i, ke = /Windows Phone/i, mi = /\bWindows(?:.+)ARM\b/i, yi = /BlackBerry/i, gi = /BB10/i, vi = /Opera Mini/i, _i = /\b(CriOS|Chrome)(?:.+)Mobile/i, Ai = /Mobile(?:.+)Firefox\b/i, xi = function(r) {
  return typeof r < "u" && r.platform === "MacIntel" && typeof r.maxTouchPoints == "number" && r.maxTouchPoints > 1 && typeof MSStream > "u";
};
function La(r) {
  return function(e) {
    return e.test(r);
  };
}
function bi(r) {
  var e = {
    userAgent: "",
    platform: "",
    maxTouchPoints: 0
  };
  !r && typeof navigator < "u" ? e = {
    userAgent: navigator.userAgent,
    platform: navigator.platform,
    maxTouchPoints: navigator.maxTouchPoints || 0
  } : typeof r == "string" ? e.userAgent = r : r && r.userAgent && (e = {
    userAgent: r.userAgent,
    platform: r.platform,
    maxTouchPoints: r.maxTouchPoints || 0
  });
  var t = e.userAgent, s = t.split("[FBAN");
  typeof s[1] < "u" && (t = s[0]), s = t.split("Twitter"), typeof s[1] < "u" && (t = s[0]);
  var i = La(t), n = {
    apple: {
      phone: i(Or) && !i(ke),
      ipod: i(ci),
      tablet: !i(Or) && (i(di) || xi(e)) && !i(ke),
      universal: i(fi),
      device: (i(Or) || i(ci) || i(di) || i(fi) || xi(e)) && !i(ke)
    },
    amazon: {
      phone: i(ct),
      tablet: !i(ct) && i(jt),
      device: i(ct) || i(jt)
    },
    android: {
      phone: !i(ke) && i(ct) || !i(ke) && i(Br),
      tablet: !i(ke) && !i(ct) && !i(Br) && (i(jt) || i(pi)),
      device: !i(ke) && (i(ct) || i(jt) || i(Br) || i(pi)) || i(/\bokhttp\b/i)
    },
    windows: {
      phone: i(ke),
      tablet: i(mi),
      device: i(ke) || i(mi)
    },
    other: {
      blackberry: i(yi),
      blackberry10: i(gi),
      opera: i(vi),
      firefox: i(Ai),
      chrome: i(_i),
      device: i(yi) || i(gi) || i(vi) || i(Ai) || i(_i)
    },
    any: !1,
    phone: !1,
    tablet: !1
  };
  return n.any = n.apple.device || n.android.device || n.windows.device || n.other.device, n.phone = n.apple.phone || n.android.phone || n.windows.phone, n.tablet = n.apple.tablet || n.android.tablet || n.windows.tablet, n;
}
const ka = bi.default ?? bi, mt = ka(globalThis.navigator);
J.RETINA_PREFIX = /@([0-9\.]+)x/;
J.FAIL_IF_MAJOR_PERFORMANCE_CAVEAT = !1;
var Mr = { exports: {} }, Ei;
function Ga() {
  return Ei || (Ei = 1, function(r) {
    var e = Object.prototype.hasOwnProperty, t = "~";
    function s() {
    }
    Object.create && (s.prototype = /* @__PURE__ */ Object.create(null), new s().__proto__ || (t = !1));
    function i(h, l, c) {
      this.fn = h, this.context = l, this.once = c || !1;
    }
    function n(h, l, c, g, x) {
      if (typeof c != "function")
        throw new TypeError("The listener must be a function");
      var b = new i(c, g || h, x), F = t ? t + l : l;
      return h._events[F] ? h._events[F].fn ? h._events[F] = [h._events[F], b] : h._events[F].push(b) : (h._events[F] = b, h._eventsCount++), h;
    }
    function a(h, l) {
      --h._eventsCount === 0 ? h._events = new s() : delete h._events[l];
    }
    function o() {
      this._events = new s(), this._eventsCount = 0;
    }
    o.prototype.eventNames = function() {
      var l = [], c, g;
      if (this._eventsCount === 0) return l;
      for (g in c = this._events)
        e.call(c, g) && l.push(t ? g.slice(1) : g);
      return Object.getOwnPropertySymbols ? l.concat(Object.getOwnPropertySymbols(c)) : l;
    }, o.prototype.listeners = function(l) {
      var c = t ? t + l : l, g = this._events[c];
      if (!g) return [];
      if (g.fn) return [g.fn];
      for (var x = 0, b = g.length, F = new Array(b); x < b; x++)
        F[x] = g[x].fn;
      return F;
    }, o.prototype.listenerCount = function(l) {
      var c = t ? t + l : l, g = this._events[c];
      return g ? g.fn ? 1 : g.length : 0;
    }, o.prototype.emit = function(l, c, g, x, b, F) {
      var C = t ? t + l : l;
      if (!this._events[C]) return !1;
      var f = this._events[C], A = arguments.length, E, w;
      if (f.fn) {
        switch (f.once && this.removeListener(l, f.fn, void 0, !0), A) {
          case 1:
            return f.fn.call(f.context), !0;
          case 2:
            return f.fn.call(f.context, c), !0;
          case 3:
            return f.fn.call(f.context, c, g), !0;
          case 4:
            return f.fn.call(f.context, c, g, x), !0;
          case 5:
            return f.fn.call(f.context, c, g, x, b), !0;
          case 6:
            return f.fn.call(f.context, c, g, x, b, F), !0;
        }
        for (w = 1, E = new Array(A - 1); w < A; w++)
          E[w - 1] = arguments[w];
        f.fn.apply(f.context, E);
      } else {
        var M = f.length, p;
        for (w = 0; w < M; w++)
          switch (f[w].once && this.removeListener(l, f[w].fn, void 0, !0), A) {
            case 1:
              f[w].fn.call(f[w].context);
              break;
            case 2:
              f[w].fn.call(f[w].context, c);
              break;
            case 3:
              f[w].fn.call(f[w].context, c, g);
              break;
            case 4:
              f[w].fn.call(f[w].context, c, g, x);
              break;
            default:
              if (!E) for (p = 1, E = new Array(A - 1); p < A; p++)
                E[p - 1] = arguments[p];
              f[w].fn.apply(f[w].context, E);
          }
      }
      return !0;
    }, o.prototype.on = function(l, c, g) {
      return n(this, l, c, g, !1);
    }, o.prototype.once = function(l, c, g) {
      return n(this, l, c, g, !0);
    }, o.prototype.removeListener = function(l, c, g, x) {
      var b = t ? t + l : l;
      if (!this._events[b]) return this;
      if (!c)
        return a(this, b), this;
      var F = this._events[b];
      if (F.fn)
        F.fn === c && (!x || F.once) && (!g || F.context === g) && a(this, b);
      else {
        for (var C = 0, f = [], A = F.length; C < A; C++)
          (F[C].fn !== c || x && !F[C].once || g && F[C].context !== g) && f.push(F[C]);
        f.length ? this._events[b] = f.length === 1 ? f[0] : f : a(this, b);
      }
      return this;
    }, o.prototype.removeAllListeners = function(l) {
      var c;
      return l ? (c = t ? t + l : l, this._events[c] && a(this, c)) : (this._events = new s(), this._eventsCount = 0), this;
    }, o.prototype.off = o.prototype.removeListener, o.prototype.addListener = o.prototype.on, o.prefixed = t, o.EventEmitter = o, r.exports = o;
  }(Mr)), Mr.exports;
}
var Da = Ga();
const Xs = /* @__PURE__ */ Ba(Da);
var Xt = { exports: {} }, Ti;
function $a() {
  if (Ti) return Xt.exports;
  Ti = 1, Xt.exports = r, Xt.exports.default = r;
  function r(d, y, u) {
    u = u || 2;
    var I = y && y.length, m = I ? y[0] * u : d.length, _ = e(d, 0, m, u, !0), R = [];
    if (!_ || _.next === _.prev) return R;
    var S, P, U, G, $, V, z;
    if (I && (_ = h(d, y, _, u)), d.length > 80 * u) {
      S = U = d[0], P = G = d[1];
      for (var H = u; H < m; H += u)
        $ = d[H], V = d[H + 1], $ < S && (S = $), V < P && (P = V), $ > U && (U = $), V > G && (G = V);
      z = Math.max(U - S, G - P), z = z !== 0 ? 32767 / z : 0;
    }
    return s(_, R, u, S, P, z, 0), R;
  }
  function e(d, y, u, I, m) {
    var _, R;
    if (m === ee(d, y, u, I) > 0)
      for (_ = y; _ < u; _ += I) R = B(_, d[_], d[_ + 1], R);
    else
      for (_ = u - I; _ >= y; _ -= I) R = B(_, d[_], d[_ + 1], R);
    return R && M(R, R.next) && (ne(R), R = R.next), R;
  }
  function t(d, y) {
    if (!d) return d;
    y || (y = d);
    var u = d, I;
    do
      if (I = !1, !u.steiner && (M(u, u.next) || w(u.prev, u, u.next) === 0)) {
        if (ne(u), u = y = u.prev, u === u.next) break;
        I = !0;
      } else
        u = u.next;
    while (I || u !== y);
    return y;
  }
  function s(d, y, u, I, m, _, R) {
    if (d) {
      !R && _ && b(d, I, m, _);
      for (var S = d, P, U; d.prev !== d.next; ) {
        if (P = d.prev, U = d.next, _ ? n(d, I, m, _) : i(d)) {
          y.push(P.i / u | 0), y.push(d.i / u | 0), y.push(U.i / u | 0), ne(d), d = U.next, S = U.next;
          continue;
        }
        if (d = U, d === S) {
          R ? R === 1 ? (d = a(t(d), y, u), s(d, y, u, I, m, _, 2)) : R === 2 && o(d, y, u, I, m, _) : s(t(d), y, u, I, m, _, 1);
          break;
        }
      }
    }
  }
  function i(d) {
    var y = d.prev, u = d, I = d.next;
    if (w(y, u, I) >= 0) return !1;
    for (var m = y.x, _ = u.x, R = I.x, S = y.y, P = u.y, U = I.y, G = m < _ ? m < R ? m : R : _ < R ? _ : R, $ = S < P ? S < U ? S : U : P < U ? P : U, V = m > _ ? m > R ? m : R : _ > R ? _ : R, z = S > P ? S > U ? S : U : P > U ? P : U, H = I.next; H !== y; ) {
      if (H.x >= G && H.x <= V && H.y >= $ && H.y <= z && A(m, S, _, P, R, U, H.x, H.y) && w(H.prev, H, H.next) >= 0) return !1;
      H = H.next;
    }
    return !0;
  }
  function n(d, y, u, I) {
    var m = d.prev, _ = d, R = d.next;
    if (w(m, _, R) >= 0) return !1;
    for (var S = m.x, P = _.x, U = R.x, G = m.y, $ = _.y, V = R.y, z = S < P ? S < U ? S : U : P < U ? P : U, H = G < $ ? G < V ? G : V : $ < V ? $ : V, te = S > P ? S > U ? S : U : P > U ? P : U, ae = G > $ ? G > V ? G : V : $ > V ? $ : V, ye = C(z, H, y, u, I), pe = C(te, ae, y, u, I), q = d.prevZ, K = d.nextZ; q && q.z >= ye && K && K.z <= pe; ) {
      if (q.x >= z && q.x <= te && q.y >= H && q.y <= ae && q !== m && q !== R && A(S, G, P, $, U, V, q.x, q.y) && w(q.prev, q, q.next) >= 0 || (q = q.prevZ, K.x >= z && K.x <= te && K.y >= H && K.y <= ae && K !== m && K !== R && A(S, G, P, $, U, V, K.x, K.y) && w(K.prev, K, K.next) >= 0)) return !1;
      K = K.nextZ;
    }
    for (; q && q.z >= ye; ) {
      if (q.x >= z && q.x <= te && q.y >= H && q.y <= ae && q !== m && q !== R && A(S, G, P, $, U, V, q.x, q.y) && w(q.prev, q, q.next) >= 0) return !1;
      q = q.prevZ;
    }
    for (; K && K.z <= pe; ) {
      if (K.x >= z && K.x <= te && K.y >= H && K.y <= ae && K !== m && K !== R && A(S, G, P, $, U, V, K.x, K.y) && w(K.prev, K, K.next) >= 0) return !1;
      K = K.nextZ;
    }
    return !0;
  }
  function a(d, y, u) {
    var I = d;
    do {
      var m = I.prev, _ = I.next.next;
      !M(m, _) && p(m, I, I.next, _) && X(m, _) && X(_, m) && (y.push(m.i / u | 0), y.push(I.i / u | 0), y.push(_.i / u | 0), ne(I), ne(I.next), I = d = _), I = I.next;
    } while (I !== d);
    return t(I);
  }
  function o(d, y, u, I, m, _) {
    var R = d;
    do {
      for (var S = R.next.next; S !== R.prev; ) {
        if (R.i !== S.i && E(R, S)) {
          var P = Q(R, S);
          R = t(R, R.next), P = t(P, P.next), s(R, y, u, I, m, _, 0), s(P, y, u, I, m, _, 0);
          return;
        }
        S = S.next;
      }
      R = R.next;
    } while (R !== d);
  }
  function h(d, y, u, I) {
    var m = [], _, R, S, P, U;
    for (_ = 0, R = y.length; _ < R; _++)
      S = y[_] * I, P = _ < R - 1 ? y[_ + 1] * I : d.length, U = e(d, S, P, I, !1), U === U.next && (U.steiner = !0), m.push(f(U));
    for (m.sort(l), _ = 0; _ < m.length; _++)
      u = c(m[_], u);
    return u;
  }
  function l(d, y) {
    return d.x - y.x;
  }
  function c(d, y) {
    var u = g(d, y);
    if (!u)
      return y;
    var I = Q(u, d);
    return t(I, I.next), t(u, u.next);
  }
  function g(d, y) {
    var u = y, I = d.x, m = d.y, _ = -1 / 0, R;
    do {
      if (m <= u.y && m >= u.next.y && u.next.y !== u.y) {
        var S = u.x + (m - u.y) * (u.next.x - u.x) / (u.next.y - u.y);
        if (S <= I && S > _ && (_ = S, R = u.x < u.next.x ? u : u.next, S === I))
          return R;
      }
      u = u.next;
    } while (u !== y);
    if (!R) return null;
    var P = R, U = R.x, G = R.y, $ = 1 / 0, V;
    u = R;
    do
      I >= u.x && u.x >= U && I !== u.x && A(m < G ? I : _, m, U, G, m < G ? _ : I, m, u.x, u.y) && (V = Math.abs(m - u.y) / (I - u.x), X(u, d) && (V < $ || V === $ && (u.x > R.x || u.x === R.x && x(R, u))) && (R = u, $ = V)), u = u.next;
    while (u !== P);
    return R;
  }
  function x(d, y) {
    return w(d.prev, d, y.prev) < 0 && w(y.next, d, d.next) < 0;
  }
  function b(d, y, u, I) {
    var m = d;
    do
      m.z === 0 && (m.z = C(m.x, m.y, y, u, I)), m.prevZ = m.prev, m.nextZ = m.next, m = m.next;
    while (m !== d);
    m.prevZ.nextZ = null, m.prevZ = null, F(m);
  }
  function F(d) {
    var y, u, I, m, _, R, S, P, U = 1;
    do {
      for (u = d, d = null, _ = null, R = 0; u; ) {
        for (R++, I = u, S = 0, y = 0; y < U && (S++, I = I.nextZ, !!I); y++)
          ;
        for (P = U; S > 0 || P > 0 && I; )
          S !== 0 && (P === 0 || !I || u.z <= I.z) ? (m = u, u = u.nextZ, S--) : (m = I, I = I.nextZ, P--), _ ? _.nextZ = m : d = m, m.prevZ = _, _ = m;
        u = I;
      }
      _.nextZ = null, U *= 2;
    } while (R > 1);
    return d;
  }
  function C(d, y, u, I, m) {
    return d = (d - u) * m | 0, y = (y - I) * m | 0, d = (d | d << 8) & 16711935, d = (d | d << 4) & 252645135, d = (d | d << 2) & 858993459, d = (d | d << 1) & 1431655765, y = (y | y << 8) & 16711935, y = (y | y << 4) & 252645135, y = (y | y << 2) & 858993459, y = (y | y << 1) & 1431655765, d | y << 1;
  }
  function f(d) {
    var y = d, u = d;
    do
      (y.x < u.x || y.x === u.x && y.y < u.y) && (u = y), y = y.next;
    while (y !== d);
    return u;
  }
  function A(d, y, u, I, m, _, R, S) {
    return (m - R) * (y - S) >= (d - R) * (_ - S) && (d - R) * (I - S) >= (u - R) * (y - S) && (u - R) * (_ - S) >= (m - R) * (I - S);
  }
  function E(d, y) {
    return d.next.i !== y.i && d.prev.i !== y.i && !D(d, y) && // dones't intersect other edges
    (X(d, y) && X(y, d) && W(d, y) && // locally visible
    (w(d.prev, d, y.prev) || w(d, y.prev, y)) || // does not create opposite-facing sectors
    M(d, y) && w(d.prev, d, d.next) > 0 && w(y.prev, y, y.next) > 0);
  }
  function w(d, y, u) {
    return (y.y - d.y) * (u.x - y.x) - (y.x - d.x) * (u.y - y.y);
  }
  function M(d, y) {
    return d.x === y.x && d.y === y.y;
  }
  function p(d, y, u, I) {
    var m = v(w(d, y, u)), _ = v(w(d, y, I)), R = v(w(u, I, d)), S = v(w(u, I, y));
    return !!(m !== _ && R !== S || m === 0 && O(d, u, y) || _ === 0 && O(d, I, y) || R === 0 && O(u, d, I) || S === 0 && O(u, y, I));
  }
  function O(d, y, u) {
    return y.x <= Math.max(d.x, u.x) && y.x >= Math.min(d.x, u.x) && y.y <= Math.max(d.y, u.y) && y.y >= Math.min(d.y, u.y);
  }
  function v(d) {
    return d > 0 ? 1 : d < 0 ? -1 : 0;
  }
  function D(d, y) {
    var u = d;
    do {
      if (u.i !== d.i && u.next.i !== d.i && u.i !== y.i && u.next.i !== y.i && p(u, u.next, d, y)) return !0;
      u = u.next;
    } while (u !== d);
    return !1;
  }
  function X(d, y) {
    return w(d.prev, d, d.next) < 0 ? w(d, y, d.next) >= 0 && w(d, d.prev, y) >= 0 : w(d, y, d.prev) < 0 || w(d, d.next, y) < 0;
  }
  function W(d, y) {
    var u = d, I = !1, m = (d.x + y.x) / 2, _ = (d.y + y.y) / 2;
    do
      u.y > _ != u.next.y > _ && u.next.y !== u.y && m < (u.next.x - u.x) * (_ - u.y) / (u.next.y - u.y) + u.x && (I = !I), u = u.next;
    while (u !== d);
    return I;
  }
  function Q(d, y) {
    var u = new ie(d.i, d.x, d.y), I = new ie(y.i, y.x, y.y), m = d.next, _ = y.prev;
    return d.next = y, y.prev = d, u.next = m, m.prev = u, I.next = u, u.prev = I, _.next = I, I.prev = _, I;
  }
  function B(d, y, u, I) {
    var m = new ie(d, y, u);
    return I ? (m.next = I.next, m.prev = I, I.next.prev = m, I.next = m) : (m.prev = m, m.next = m), m;
  }
  function ne(d) {
    d.next.prev = d.prev, d.prev.next = d.next, d.prevZ && (d.prevZ.nextZ = d.nextZ), d.nextZ && (d.nextZ.prevZ = d.prevZ);
  }
  function ie(d, y, u) {
    this.i = d, this.x = y, this.y = u, this.prev = null, this.next = null, this.z = 0, this.prevZ = null, this.nextZ = null, this.steiner = !1;
  }
  r.deviation = function(d, y, u, I) {
    var m = y && y.length, _ = m ? y[0] * u : d.length, R = Math.abs(ee(d, 0, _, u));
    if (m)
      for (var S = 0, P = y.length; S < P; S++) {
        var U = y[S] * u, G = S < P - 1 ? y[S + 1] * u : d.length;
        R -= Math.abs(ee(d, U, G, u));
      }
    var $ = 0;
    for (S = 0; S < I.length; S += 3) {
      var V = I[S] * u, z = I[S + 1] * u, H = I[S + 2] * u;
      $ += Math.abs(
        (d[V] - d[H]) * (d[z + 1] - d[V + 1]) - (d[V] - d[z]) * (d[H + 1] - d[V + 1])
      );
    }
    return R === 0 && $ === 0 ? 0 : Math.abs(($ - R) / R);
  };
  function ee(d, y, u, I) {
    for (var m = 0, _ = y, R = u - I; _ < u; _ += I)
      m += (d[R] - d[_]) * (d[_ + 1] + d[R + 1]), R = _;
    return m;
  }
  return r.flatten = function(d) {
    for (var y = d[0][0].length, u = { vertices: [], holes: [], dimensions: y }, I = 0, m = 0; m < d.length; m++) {
      for (var _ = 0; _ < d[m].length; _++)
        for (var R = 0; R < y; R++) u.vertices.push(d[m][_][R]);
      m > 0 && (I += d[m - 1].length, u.holes.push(I));
    }
    return u;
  }, Xt.exports;
}
$a();
var qe = {}, Pt = { exports: {} };
/*! https://mths.be/punycode v1.4.1 by @mathias */
var Ha = Pt.exports, wi;
function Va() {
  return wi || (wi = 1, function(r, e) {
    (function(t) {
      var s = e && !e.nodeType && e, i = r && !r.nodeType && r, n = typeof lr == "object" && lr;
      (n.global === n || n.window === n || n.self === n) && (t = n);
      var a, o = 2147483647, h = 36, l = 1, c = 26, g = 38, x = 700, b = 72, F = 128, C = "-", f = /^xn--/, A = /[^\x20-\x7E]/, E = /[\x2E\u3002\uFF0E\uFF61]/g, w = {
        overflow: "Overflow: input needs wider integers to process",
        "not-basic": "Illegal input >= 0x80 (not a basic code point)",
        "invalid-input": "Invalid input"
      }, M = h - l, p = Math.floor, O = String.fromCharCode, v;
      function D(m) {
        throw new RangeError(w[m]);
      }
      function X(m, _) {
        for (var R = m.length, S = []; R--; )
          S[R] = _(m[R]);
        return S;
      }
      function W(m, _) {
        var R = m.split("@"), S = "";
        R.length > 1 && (S = R[0] + "@", m = R[1]), m = m.replace(E, ".");
        var P = m.split("."), U = X(P, _).join(".");
        return S + U;
      }
      function Q(m) {
        for (var _ = [], R = 0, S = m.length, P, U; R < S; )
          P = m.charCodeAt(R++), P >= 55296 && P <= 56319 && R < S ? (U = m.charCodeAt(R++), (U & 64512) == 56320 ? _.push(((P & 1023) << 10) + (U & 1023) + 65536) : (_.push(P), R--)) : _.push(P);
        return _;
      }
      function B(m) {
        return X(m, function(_) {
          var R = "";
          return _ > 65535 && (_ -= 65536, R += O(_ >>> 10 & 1023 | 55296), _ = 56320 | _ & 1023), R += O(_), R;
        }).join("");
      }
      function ne(m) {
        return m - 48 < 10 ? m - 22 : m - 65 < 26 ? m - 65 : m - 97 < 26 ? m - 97 : h;
      }
      function ie(m, _) {
        return m + 22 + 75 * (m < 26) - ((_ != 0) << 5);
      }
      function ee(m, _, R) {
        var S = 0;
        for (m = R ? p(m / x) : m >> 1, m += p(m / _); m > M * c >> 1; S += h)
          m = p(m / M);
        return p(S + (M + 1) * m / (m + g));
      }
      function d(m) {
        var _ = [], R = m.length, S, P = 0, U = F, G = b, $, V, z, H, te, ae, ye, pe, q;
        for ($ = m.lastIndexOf(C), $ < 0 && ($ = 0), V = 0; V < $; ++V)
          m.charCodeAt(V) >= 128 && D("not-basic"), _.push(m.charCodeAt(V));
        for (z = $ > 0 ? $ + 1 : 0; z < R; ) {
          for (H = P, te = 1, ae = h; z >= R && D("invalid-input"), ye = ne(m.charCodeAt(z++)), (ye >= h || ye > p((o - P) / te)) && D("overflow"), P += ye * te, pe = ae <= G ? l : ae >= G + c ? c : ae - G, !(ye < pe); ae += h)
            q = h - pe, te > p(o / q) && D("overflow"), te *= q;
          S = _.length + 1, G = ee(P - H, S, H == 0), p(P / S) > o - U && D("overflow"), U += p(P / S), P %= S, _.splice(P++, 0, U);
        }
        return B(_);
      }
      function y(m) {
        var _, R, S, P, U, G, $, V, z, H, te, ae = [], ye, pe, q, K;
        for (m = Q(m), ye = m.length, _ = F, R = 0, U = b, G = 0; G < ye; ++G)
          te = m[G], te < 128 && ae.push(O(te));
        for (S = P = ae.length, P && ae.push(C); S < ye; ) {
          for ($ = o, G = 0; G < ye; ++G)
            te = m[G], te >= _ && te < $ && ($ = te);
          for (pe = S + 1, $ - _ > p((o - R) / pe) && D("overflow"), R += ($ - _) * pe, _ = $, G = 0; G < ye; ++G)
            if (te = m[G], te < _ && ++R > o && D("overflow"), te == _) {
              for (V = R, z = h; H = z <= U ? l : z >= U + c ? c : z - U, !(V < H); z += h)
                K = V - H, q = h - H, ae.push(
                  O(ie(H + K % q, 0))
                ), V = p(K / q);
              ae.push(O(ie(V, 0))), U = ee(R, pe, S == P), R = 0, ++S;
            }
          ++R, ++_;
        }
        return ae.join("");
      }
      function u(m) {
        return W(m, function(_) {
          return f.test(_) ? d(_.slice(4).toLowerCase()) : _;
        });
      }
      function I(m) {
        return W(m, function(_) {
          return A.test(_) ? "xn--" + y(_) : _;
        });
      }
      if (a = {
        /**
         * A string representing the current Punycode.js version number.
         * @memberOf punycode
         * @type String
         */
        version: "1.4.1",
        /**
         * An object of methods to convert from JavaScript's internal character
         * representation (UCS-2) to Unicode code points, and back.
         * @see <https://mathiasbynens.be/notes/javascript-encoding>
         * @memberOf punycode
         * @type Object
         */
        ucs2: {
          decode: Q,
          encode: B
        },
        decode: d,
        encode: y,
        toASCII: I,
        toUnicode: u
      }, s && i)
        if (r.exports == s)
          i.exports = a;
        else
          for (v in a)
            a.hasOwnProperty(v) && (s[v] = a[v]);
      else
        t.punycode = a;
    })(Ha);
  }(Pt, Pt.exports)), Pt.exports;
}
var Ur, Ri;
function Wa() {
  return Ri || (Ri = 1, Ur = Error), Ur;
}
var Lr, Ii;
function ja() {
  return Ii || (Ii = 1, Lr = EvalError), Lr;
}
var kr, Si;
function Xa() {
  return Si || (Si = 1, kr = RangeError), kr;
}
var Gr, Ci;
function za() {
  return Ci || (Ci = 1, Gr = ReferenceError), Gr;
}
var Dr, Ni;
function Cn() {
  return Ni || (Ni = 1, Dr = SyntaxError), Dr;
}
var $r, Fi;
function $t() {
  return Fi || (Fi = 1, $r = TypeError), $r;
}
var Hr, Pi;
function qa() {
  return Pi || (Pi = 1, Hr = URIError), Hr;
}
var Vr, Oi;
function Ka() {
  return Oi || (Oi = 1, Vr = function() {
    if (typeof Symbol != "function" || typeof Object.getOwnPropertySymbols != "function")
      return !1;
    if (typeof Symbol.iterator == "symbol")
      return !0;
    var e = {}, t = Symbol("test"), s = Object(t);
    if (typeof t == "string" || Object.prototype.toString.call(t) !== "[object Symbol]" || Object.prototype.toString.call(s) !== "[object Symbol]")
      return !1;
    var i = 42;
    e[t] = i;
    for (t in e)
      return !1;
    if (typeof Object.keys == "function" && Object.keys(e).length !== 0 || typeof Object.getOwnPropertyNames == "function" && Object.getOwnPropertyNames(e).length !== 0)
      return !1;
    var n = Object.getOwnPropertySymbols(e);
    if (n.length !== 1 || n[0] !== t || !Object.prototype.propertyIsEnumerable.call(e, t))
      return !1;
    if (typeof Object.getOwnPropertyDescriptor == "function") {
      var a = Object.getOwnPropertyDescriptor(e, t);
      if (a.value !== i || a.enumerable !== !0)
        return !1;
    }
    return !0;
  }), Vr;
}
var Wr, Bi;
function Za() {
  if (Bi) return Wr;
  Bi = 1;
  var r = typeof Symbol < "u" && Symbol, e = Ka();
  return Wr = function() {
    return typeof r != "function" || typeof Symbol != "function" || typeof r("foo") != "symbol" || typeof Symbol("bar") != "symbol" ? !1 : e();
  }, Wr;
}
var jr, Mi;
function Ya() {
  if (Mi) return jr;
  Mi = 1;
  var r = {
    __proto__: null,
    foo: {}
  }, e = Object;
  return jr = function() {
    return { __proto__: r }.foo === r.foo && !(r instanceof e);
  }, jr;
}
var Xr, Ui;
function Qa() {
  if (Ui) return Xr;
  Ui = 1;
  var r = "Function.prototype.bind called on incompatible ", e = Object.prototype.toString, t = Math.max, s = "[object Function]", i = function(h, l) {
    for (var c = [], g = 0; g < h.length; g += 1)
      c[g] = h[g];
    for (var x = 0; x < l.length; x += 1)
      c[x + h.length] = l[x];
    return c;
  }, n = function(h, l) {
    for (var c = [], g = l, x = 0; g < h.length; g += 1, x += 1)
      c[x] = h[g];
    return c;
  }, a = function(o, h) {
    for (var l = "", c = 0; c < o.length; c += 1)
      l += o[c], c + 1 < o.length && (l += h);
    return l;
  };
  return Xr = function(h) {
    var l = this;
    if (typeof l != "function" || e.apply(l) !== s)
      throw new TypeError(r + l);
    for (var c = n(arguments, 1), g, x = function() {
      if (this instanceof g) {
        var A = l.apply(
          this,
          i(c, arguments)
        );
        return Object(A) === A ? A : this;
      }
      return l.apply(
        h,
        i(c, arguments)
      );
    }, b = t(0, l.length - c.length), F = [], C = 0; C < b; C++)
      F[C] = "$" + C;
    if (g = Function("binder", "return function (" + a(F, ",") + "){ return binder.apply(this,arguments); }")(x), l.prototype) {
      var f = function() {
      };
      f.prototype = l.prototype, g.prototype = new f(), f.prototype = null;
    }
    return g;
  }, Xr;
}
var zr, Li;
function zs() {
  if (Li) return zr;
  Li = 1;
  var r = Qa();
  return zr = Function.prototype.bind || r, zr;
}
var qr, ki;
function Ja() {
  if (ki) return qr;
  ki = 1;
  var r = Function.prototype.call, e = Object.prototype.hasOwnProperty, t = zs();
  return qr = t.call(r, e), qr;
}
var Kr, Gi;
function Et() {
  if (Gi) return Kr;
  Gi = 1;
  var r, e = /* @__PURE__ */ Wa(), t = /* @__PURE__ */ ja(), s = /* @__PURE__ */ Xa(), i = /* @__PURE__ */ za(), n = /* @__PURE__ */ Cn(), a = /* @__PURE__ */ $t(), o = /* @__PURE__ */ qa(), h = Function, l = function(y) {
    try {
      return h('"use strict"; return (' + y + ").constructor;")();
    } catch {
    }
  }, c = Object.getOwnPropertyDescriptor;
  if (c)
    try {
      c({}, "");
    } catch {
      c = null;
    }
  var g = function() {
    throw new a();
  }, x = c ? function() {
    try {
      return arguments.callee, g;
    } catch {
      try {
        return c(arguments, "callee").get;
      } catch {
        return g;
      }
    }
  }() : g, b = Za()(), F = /* @__PURE__ */ Ya()(), C = Object.getPrototypeOf || (F ? function(y) {
    return y.__proto__;
  } : null), f = {}, A = typeof Uint8Array > "u" || !C ? r : C(Uint8Array), E = {
    __proto__: null,
    "%AggregateError%": typeof AggregateError > "u" ? r : AggregateError,
    "%Array%": Array,
    "%ArrayBuffer%": typeof ArrayBuffer > "u" ? r : ArrayBuffer,
    "%ArrayIteratorPrototype%": b && C ? C([][Symbol.iterator]()) : r,
    "%AsyncFromSyncIteratorPrototype%": r,
    "%AsyncFunction%": f,
    "%AsyncGenerator%": f,
    "%AsyncGeneratorFunction%": f,
    "%AsyncIteratorPrototype%": f,
    "%Atomics%": typeof Atomics > "u" ? r : Atomics,
    "%BigInt%": typeof BigInt > "u" ? r : BigInt,
    "%BigInt64Array%": typeof BigInt64Array > "u" ? r : BigInt64Array,
    "%BigUint64Array%": typeof BigUint64Array > "u" ? r : BigUint64Array,
    "%Boolean%": Boolean,
    "%DataView%": typeof DataView > "u" ? r : DataView,
    "%Date%": Date,
    "%decodeURI%": decodeURI,
    "%decodeURIComponent%": decodeURIComponent,
    "%encodeURI%": encodeURI,
    "%encodeURIComponent%": encodeURIComponent,
    "%Error%": e,
    "%eval%": eval,
    // eslint-disable-line no-eval
    "%EvalError%": t,
    "%Float32Array%": typeof Float32Array > "u" ? r : Float32Array,
    "%Float64Array%": typeof Float64Array > "u" ? r : Float64Array,
    "%FinalizationRegistry%": typeof FinalizationRegistry > "u" ? r : FinalizationRegistry,
    "%Function%": h,
    "%GeneratorFunction%": f,
    "%Int8Array%": typeof Int8Array > "u" ? r : Int8Array,
    "%Int16Array%": typeof Int16Array > "u" ? r : Int16Array,
    "%Int32Array%": typeof Int32Array > "u" ? r : Int32Array,
    "%isFinite%": isFinite,
    "%isNaN%": isNaN,
    "%IteratorPrototype%": b && C ? C(C([][Symbol.iterator]())) : r,
    "%JSON%": typeof JSON == "object" ? JSON : r,
    "%Map%": typeof Map > "u" ? r : Map,
    "%MapIteratorPrototype%": typeof Map > "u" || !b || !C ? r : C((/* @__PURE__ */ new Map())[Symbol.iterator]()),
    "%Math%": Math,
    "%Number%": Number,
    "%Object%": Object,
    "%parseFloat%": parseFloat,
    "%parseInt%": parseInt,
    "%Promise%": typeof Promise > "u" ? r : Promise,
    "%Proxy%": typeof Proxy > "u" ? r : Proxy,
    "%RangeError%": s,
    "%ReferenceError%": i,
    "%Reflect%": typeof Reflect > "u" ? r : Reflect,
    "%RegExp%": RegExp,
    "%Set%": typeof Set > "u" ? r : Set,
    "%SetIteratorPrototype%": typeof Set > "u" || !b || !C ? r : C((/* @__PURE__ */ new Set())[Symbol.iterator]()),
    "%SharedArrayBuffer%": typeof SharedArrayBuffer > "u" ? r : SharedArrayBuffer,
    "%String%": String,
    "%StringIteratorPrototype%": b && C ? C(""[Symbol.iterator]()) : r,
    "%Symbol%": b ? Symbol : r,
    "%SyntaxError%": n,
    "%ThrowTypeError%": x,
    "%TypedArray%": A,
    "%TypeError%": a,
    "%Uint8Array%": typeof Uint8Array > "u" ? r : Uint8Array,
    "%Uint8ClampedArray%": typeof Uint8ClampedArray > "u" ? r : Uint8ClampedArray,
    "%Uint16Array%": typeof Uint16Array > "u" ? r : Uint16Array,
    "%Uint32Array%": typeof Uint32Array > "u" ? r : Uint32Array,
    "%URIError%": o,
    "%WeakMap%": typeof WeakMap > "u" ? r : WeakMap,
    "%WeakRef%": typeof WeakRef > "u" ? r : WeakRef,
    "%WeakSet%": typeof WeakSet > "u" ? r : WeakSet
  };
  if (C)
    try {
      null.error;
    } catch (y) {
      var w = C(C(y));
      E["%Error.prototype%"] = w;
    }
  var M = function y(u) {
    var I;
    if (u === "%AsyncFunction%")
      I = l("async function () {}");
    else if (u === "%GeneratorFunction%")
      I = l("function* () {}");
    else if (u === "%AsyncGeneratorFunction%")
      I = l("async function* () {}");
    else if (u === "%AsyncGenerator%") {
      var m = y("%AsyncGeneratorFunction%");
      m && (I = m.prototype);
    } else if (u === "%AsyncIteratorPrototype%") {
      var _ = y("%AsyncGenerator%");
      _ && C && (I = C(_.prototype));
    }
    return E[u] = I, I;
  }, p = {
    __proto__: null,
    "%ArrayBufferPrototype%": ["ArrayBuffer", "prototype"],
    "%ArrayPrototype%": ["Array", "prototype"],
    "%ArrayProto_entries%": ["Array", "prototype", "entries"],
    "%ArrayProto_forEach%": ["Array", "prototype", "forEach"],
    "%ArrayProto_keys%": ["Array", "prototype", "keys"],
    "%ArrayProto_values%": ["Array", "prototype", "values"],
    "%AsyncFunctionPrototype%": ["AsyncFunction", "prototype"],
    "%AsyncGenerator%": ["AsyncGeneratorFunction", "prototype"],
    "%AsyncGeneratorPrototype%": ["AsyncGeneratorFunction", "prototype", "prototype"],
    "%BooleanPrototype%": ["Boolean", "prototype"],
    "%DataViewPrototype%": ["DataView", "prototype"],
    "%DatePrototype%": ["Date", "prototype"],
    "%ErrorPrototype%": ["Error", "prototype"],
    "%EvalErrorPrototype%": ["EvalError", "prototype"],
    "%Float32ArrayPrototype%": ["Float32Array", "prototype"],
    "%Float64ArrayPrototype%": ["Float64Array", "prototype"],
    "%FunctionPrototype%": ["Function", "prototype"],
    "%Generator%": ["GeneratorFunction", "prototype"],
    "%GeneratorPrototype%": ["GeneratorFunction", "prototype", "prototype"],
    "%Int8ArrayPrototype%": ["Int8Array", "prototype"],
    "%Int16ArrayPrototype%": ["Int16Array", "prototype"],
    "%Int32ArrayPrototype%": ["Int32Array", "prototype"],
    "%JSONParse%": ["JSON", "parse"],
    "%JSONStringify%": ["JSON", "stringify"],
    "%MapPrototype%": ["Map", "prototype"],
    "%NumberPrototype%": ["Number", "prototype"],
    "%ObjectPrototype%": ["Object", "prototype"],
    "%ObjProto_toString%": ["Object", "prototype", "toString"],
    "%ObjProto_valueOf%": ["Object", "prototype", "valueOf"],
    "%PromisePrototype%": ["Promise", "prototype"],
    "%PromiseProto_then%": ["Promise", "prototype", "then"],
    "%Promise_all%": ["Promise", "all"],
    "%Promise_reject%": ["Promise", "reject"],
    "%Promise_resolve%": ["Promise", "resolve"],
    "%RangeErrorPrototype%": ["RangeError", "prototype"],
    "%ReferenceErrorPrototype%": ["ReferenceError", "prototype"],
    "%RegExpPrototype%": ["RegExp", "prototype"],
    "%SetPrototype%": ["Set", "prototype"],
    "%SharedArrayBufferPrototype%": ["SharedArrayBuffer", "prototype"],
    "%StringPrototype%": ["String", "prototype"],
    "%SymbolPrototype%": ["Symbol", "prototype"],
    "%SyntaxErrorPrototype%": ["SyntaxError", "prototype"],
    "%TypedArrayPrototype%": ["TypedArray", "prototype"],
    "%TypeErrorPrototype%": ["TypeError", "prototype"],
    "%Uint8ArrayPrototype%": ["Uint8Array", "prototype"],
    "%Uint8ClampedArrayPrototype%": ["Uint8ClampedArray", "prototype"],
    "%Uint16ArrayPrototype%": ["Uint16Array", "prototype"],
    "%Uint32ArrayPrototype%": ["Uint32Array", "prototype"],
    "%URIErrorPrototype%": ["URIError", "prototype"],
    "%WeakMapPrototype%": ["WeakMap", "prototype"],
    "%WeakSetPrototype%": ["WeakSet", "prototype"]
  }, O = zs(), v = /* @__PURE__ */ Ja(), D = O.call(Function.call, Array.prototype.concat), X = O.call(Function.apply, Array.prototype.splice), W = O.call(Function.call, String.prototype.replace), Q = O.call(Function.call, String.prototype.slice), B = O.call(Function.call, RegExp.prototype.exec), ne = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g, ie = /\\(\\)?/g, ee = function(u) {
    var I = Q(u, 0, 1), m = Q(u, -1);
    if (I === "%" && m !== "%")
      throw new n("invalid intrinsic syntax, expected closing `%`");
    if (m === "%" && I !== "%")
      throw new n("invalid intrinsic syntax, expected opening `%`");
    var _ = [];
    return W(u, ne, function(R, S, P, U) {
      _[_.length] = P ? W(U, ie, "$1") : S || R;
    }), _;
  }, d = function(u, I) {
    var m = u, _;
    if (v(p, m) && (_ = p[m], m = "%" + _[0] + "%"), v(E, m)) {
      var R = E[m];
      if (R === f && (R = M(m)), typeof R > "u" && !I)
        throw new a("intrinsic " + u + " exists, but is not available. Please file an issue!");
      return {
        alias: _,
        name: m,
        value: R
      };
    }
    throw new n("intrinsic " + u + " does not exist!");
  };
  return Kr = function(u, I) {
    if (typeof u != "string" || u.length === 0)
      throw new a("intrinsic name must be a non-empty string");
    if (arguments.length > 1 && typeof I != "boolean")
      throw new a('"allowMissing" argument must be a boolean');
    if (B(/^%?[^%]*%?$/, u) === null)
      throw new n("`%` may not be present anywhere but at the beginning and end of the intrinsic name");
    var m = ee(u), _ = m.length > 0 ? m[0] : "", R = d("%" + _ + "%", I), S = R.name, P = R.value, U = !1, G = R.alias;
    G && (_ = G[0], X(m, D([0, 1], G)));
    for (var $ = 1, V = !0; $ < m.length; $ += 1) {
      var z = m[$], H = Q(z, 0, 1), te = Q(z, -1);
      if ((H === '"' || H === "'" || H === "`" || te === '"' || te === "'" || te === "`") && H !== te)
        throw new n("property names with quotes must have matching quotes");
      if ((z === "constructor" || !V) && (U = !0), _ += "." + z, S = "%" + _ + "%", v(E, S))
        P = E[S];
      else if (P != null) {
        if (!(z in P)) {
          if (!I)
            throw new a("base intrinsic for " + u + " exists, but the property is not available.");
          return;
        }
        if (c && $ + 1 >= m.length) {
          var ae = c(P, z);
          V = !!ae, V && "get" in ae && !("originalValue" in ae.get) ? P = ae.get : P = P[z];
        } else
          V = v(P, z), P = P[z];
        V && !U && (E[S] = P);
      }
    }
    return P;
  }, Kr;
}
var Zr = { exports: {} }, Yr, Di;
function qs() {
  if (Di) return Yr;
  Di = 1;
  var r = /* @__PURE__ */ Et(), e = r("%Object.defineProperty%", !0) || !1;
  if (e)
    try {
      e({}, "a", { value: 1 });
    } catch {
      e = !1;
    }
  return Yr = e, Yr;
}
var Qr, $i;
function Nn() {
  if ($i) return Qr;
  $i = 1;
  var r = /* @__PURE__ */ Et(), e = r("%Object.getOwnPropertyDescriptor%", !0);
  if (e)
    try {
      e([], "length");
    } catch {
      e = null;
    }
  return Qr = e, Qr;
}
var Jr, Hi;
function eo() {
  if (Hi) return Jr;
  Hi = 1;
  var r = /* @__PURE__ */ qs(), e = /* @__PURE__ */ Cn(), t = /* @__PURE__ */ $t(), s = /* @__PURE__ */ Nn();
  return Jr = function(n, a, o) {
    if (!n || typeof n != "object" && typeof n != "function")
      throw new t("`obj` must be an object or a function`");
    if (typeof a != "string" && typeof a != "symbol")
      throw new t("`property` must be a string or a symbol`");
    if (arguments.length > 3 && typeof arguments[3] != "boolean" && arguments[3] !== null)
      throw new t("`nonEnumerable`, if provided, must be a boolean or null");
    if (arguments.length > 4 && typeof arguments[4] != "boolean" && arguments[4] !== null)
      throw new t("`nonWritable`, if provided, must be a boolean or null");
    if (arguments.length > 5 && typeof arguments[5] != "boolean" && arguments[5] !== null)
      throw new t("`nonConfigurable`, if provided, must be a boolean or null");
    if (arguments.length > 6 && typeof arguments[6] != "boolean")
      throw new t("`loose`, if provided, must be a boolean");
    var h = arguments.length > 3 ? arguments[3] : null, l = arguments.length > 4 ? arguments[4] : null, c = arguments.length > 5 ? arguments[5] : null, g = arguments.length > 6 ? arguments[6] : !1, x = !!s && s(n, a);
    if (r)
      r(n, a, {
        configurable: c === null && x ? x.configurable : !c,
        enumerable: h === null && x ? x.enumerable : !h,
        value: o,
        writable: l === null && x ? x.writable : !l
      });
    else if (g || !h && !l && !c)
      n[a] = o;
    else
      throw new e("This environment does not support defining a property as non-configurable, non-writable, or non-enumerable.");
  }, Jr;
}
var es, Vi;
function to() {
  if (Vi) return es;
  Vi = 1;
  var r = /* @__PURE__ */ qs(), e = function() {
    return !!r;
  };
  return e.hasArrayLengthDefineBug = function() {
    if (!r)
      return null;
    try {
      return r([], "length", { value: 1 }).length !== 1;
    } catch {
      return !0;
    }
  }, es = e, es;
}
var ts, Wi;
function ro() {
  if (Wi) return ts;
  Wi = 1;
  var r = /* @__PURE__ */ Et(), e = /* @__PURE__ */ eo(), t = /* @__PURE__ */ to()(), s = /* @__PURE__ */ Nn(), i = /* @__PURE__ */ $t(), n = r("%Math.floor%");
  return ts = function(o, h) {
    if (typeof o != "function")
      throw new i("`fn` is not a function");
    if (typeof h != "number" || h < 0 || h > 4294967295 || n(h) !== h)
      throw new i("`length` must be a positive 32-bit integer");
    var l = arguments.length > 2 && !!arguments[2], c = !0, g = !0;
    if ("length" in o && s) {
      var x = s(o, "length");
      x && !x.configurable && (c = !1), x && !x.writable && (g = !1);
    }
    return (c || g || !l) && (t ? e(
      /** @type {Parameters<define>[0]} */
      o,
      "length",
      h,
      !0,
      !0
    ) : e(
      /** @type {Parameters<define>[0]} */
      o,
      "length",
      h
    )), o;
  }, ts;
}
var ji;
function so() {
  return ji || (ji = 1, function(r) {
    var e = zs(), t = /* @__PURE__ */ Et(), s = /* @__PURE__ */ ro(), i = /* @__PURE__ */ $t(), n = t("%Function.prototype.apply%"), a = t("%Function.prototype.call%"), o = t("%Reflect.apply%", !0) || e.call(a, n), h = /* @__PURE__ */ qs(), l = t("%Math.max%");
    r.exports = function(x) {
      if (typeof x != "function")
        throw new i("a function is required");
      var b = o(e, a, arguments);
      return s(
        b,
        1 + l(0, x.length - (arguments.length - 1)),
        !0
      );
    };
    var c = function() {
      return o(e, n, arguments);
    };
    h ? h(r.exports, "apply", { value: c }) : r.exports.apply = c;
  }(Zr)), Zr.exports;
}
var rs, Xi;
function io() {
  if (Xi) return rs;
  Xi = 1;
  var r = /* @__PURE__ */ Et(), e = so(), t = e(r("String.prototype.indexOf"));
  return rs = function(i, n) {
    var a = r(i, !!n);
    return typeof a == "function" && t(i, ".prototype.") > -1 ? e(a) : a;
  }, rs;
}
const no = {}, ao = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: no
}, Symbol.toStringTag, { value: "Module" })), oo = /* @__PURE__ */ Ma(ao);
var ss, zi;
function ho() {
  if (zi) return ss;
  zi = 1;
  var r = typeof Map == "function" && Map.prototype, e = Object.getOwnPropertyDescriptor && r ? Object.getOwnPropertyDescriptor(Map.prototype, "size") : null, t = r && e && typeof e.get == "function" ? e.get : null, s = r && Map.prototype.forEach, i = typeof Set == "function" && Set.prototype, n = Object.getOwnPropertyDescriptor && i ? Object.getOwnPropertyDescriptor(Set.prototype, "size") : null, a = i && n && typeof n.get == "function" ? n.get : null, o = i && Set.prototype.forEach, h = typeof WeakMap == "function" && WeakMap.prototype, l = h ? WeakMap.prototype.has : null, c = typeof WeakSet == "function" && WeakSet.prototype, g = c ? WeakSet.prototype.has : null, x = typeof WeakRef == "function" && WeakRef.prototype, b = x ? WeakRef.prototype.deref : null, F = Boolean.prototype.valueOf, C = Object.prototype.toString, f = Function.prototype.toString, A = String.prototype.match, E = String.prototype.slice, w = String.prototype.replace, M = String.prototype.toUpperCase, p = String.prototype.toLowerCase, O = RegExp.prototype.test, v = Array.prototype.concat, D = Array.prototype.join, X = Array.prototype.slice, W = Math.floor, Q = typeof BigInt == "function" ? BigInt.prototype.valueOf : null, B = Object.getOwnPropertySymbols, ne = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? Symbol.prototype.toString : null, ie = typeof Symbol == "function" && typeof Symbol.iterator == "object", ee = typeof Symbol == "function" && Symbol.toStringTag && (typeof Symbol.toStringTag === ie || !0) ? Symbol.toStringTag : null, d = Object.prototype.propertyIsEnumerable, y = (typeof Reflect == "function" ? Reflect.getPrototypeOf : Object.getPrototypeOf) || ([].__proto__ === Array.prototype ? function(T) {
    return T.__proto__;
  } : null);
  function u(T, N) {
    if (T === 1 / 0 || T === -1 / 0 || T !== T || T && T > -1e3 && T < 1e3 || O.call(/e/, N))
      return N;
    var le = /[0-9](?=(?:[0-9]{3})+(?![0-9]))/g;
    if (typeof T == "number") {
      var ce = T < 0 ? -W(-T) : W(T);
      if (ce !== T) {
        var de = String(ce), re = E.call(N, de.length + 1);
        return w.call(de, le, "$&_") + "." + w.call(w.call(re, /([0-9]{3})/g, "$&_"), /_$/, "");
      }
    }
    return w.call(N, le, "$&_");
  }
  var I = oo, m = I.custom, _ = ye(m) ? m : null, R = {
    __proto__: null,
    double: '"',
    single: "'"
  }, S = {
    __proto__: null,
    double: /(["\\])/g,
    single: /(['\\])/g
  };
  ss = function T(N, le, ce, de) {
    var re = le || {};
    if (K(re, "quoteStyle") && !K(R, re.quoteStyle))
      throw new TypeError('option "quoteStyle" must be "single" or "double"');
    if (K(re, "maxStringLength") && (typeof re.maxStringLength == "number" ? re.maxStringLength < 0 && re.maxStringLength !== 1 / 0 : re.maxStringLength !== null))
      throw new TypeError('option "maxStringLength", if provided, must be a positive integer, Infinity, or `null`');
    var Ve = K(re, "customInspect") ? re.customInspect : !0;
    if (typeof Ve != "boolean" && Ve !== "symbol")
      throw new TypeError("option \"customInspect\", if provided, must be `true`, `false`, or `'symbol'`");
    if (K(re, "indent") && re.indent !== null && re.indent !== "	" && !(parseInt(re.indent, 10) === re.indent && re.indent > 0))
      throw new TypeError('option "indent" must be "\\t", an integer > 0, or `null`');
    if (K(re, "numericSeparator") && typeof re.numericSeparator != "boolean")
      throw new TypeError('option "numericSeparator", if provided, must be `true` or `false`');
    var ze = re.numericSeparator;
    if (typeof N > "u")
      return "undefined";
    if (N === null)
      return "null";
    if (typeof N == "boolean")
      return N ? "true" : "false";
    if (typeof N == "string")
      return ti(N, re);
    if (typeof N == "number") {
      if (N === 0)
        return 1 / 0 / N > 0 ? "0" : "-0";
      var Te = String(N);
      return ze ? u(N, Te) : Te;
    }
    if (typeof N == "bigint") {
      var We = String(N) + "n";
      return ze ? u(N, We) : We;
    }
    var Rr = typeof re.depth > "u" ? 5 : re.depth;
    if (typeof ce > "u" && (ce = 0), ce >= Rr && Rr > 0 && typeof N == "object")
      return G(N) ? "[Array]" : "[Object]";
    var lt = Fa(re, ce);
    if (typeof de > "u")
      de = [];
    else if (ei(de, N) >= 0)
      return "[Circular]";
    function Se(ut, Wt, Oa) {
      if (Wt && (de = X.call(de), de.push(Wt)), Oa) {
        var ui = {
          depth: re.depth
        };
        return K(re, "quoteStyle") && (ui.quoteStyle = re.quoteStyle), T(ut, ui, ce + 1, de);
      }
      return T(ut, re, ce + 1, de);
    }
    if (typeof N == "function" && !V(N)) {
      var si = Er(N), ii = Ht(N, Se);
      return "[Function" + (si ? ": " + si : " (anonymous)") + "]" + (ii.length > 0 ? " { " + D.call(ii, ", ") + " }" : "");
    }
    if (ye(N)) {
      var ni = ie ? w.call(String(N), /^(Symbol\(.*\))_[^)]*$/, "$1") : ne.call(N);
      return typeof N == "object" && !ie ? It(ni) : ni;
    }
    if (Sa(N)) {
      for (var St = "<" + p.call(String(N.nodeName)), Ir = N.attributes || [], Vt = 0; Vt < Ir.length; Vt++)
        St += " " + Ir[Vt].name + "=" + P(U(Ir[Vt].value), "double", re);
      return St += ">", N.childNodes && N.childNodes.length && (St += "..."), St += "</" + p.call(String(N.nodeName)) + ">", St;
    }
    if (G(N)) {
      if (N.length === 0)
        return "[]";
      var Sr = Ht(N, Se);
      return lt && !Na(Sr) ? "[" + wr(Sr, lt) + "]" : "[ " + D.call(Sr, ", ") + " ]";
    }
    if (z(N)) {
      var Cr = Ht(N, Se);
      return !("cause" in Error.prototype) && "cause" in N && !d.call(N, "cause") ? "{ [" + String(N) + "] " + D.call(v.call("[cause]: " + Se(N.cause), Cr), ", ") + " }" : Cr.length === 0 ? "[" + String(N) + "]" : "{ [" + String(N) + "] " + D.call(Cr, ", ") + " }";
    }
    if (typeof N == "object" && Ve) {
      if (_ && typeof N[_] == "function" && I)
        return I(N, { depth: Rr - ce });
      if (Ve !== "symbol" && typeof N.inspect == "function")
        return N.inspect();
    }
    if (Ea(N)) {
      var ai = [];
      return s && s.call(N, function(ut, Wt) {
        ai.push(Se(Wt, N, !0) + " => " + Se(ut, N));
      }), ri("Map", t.call(N), ai, lt);
    }
    if (Ra(N)) {
      var oi = [];
      return o && o.call(N, function(ut) {
        oi.push(Se(ut, N));
      }), ri("Set", a.call(N), oi, lt);
    }
    if (Ta(N))
      return Tr("WeakMap");
    if (Ia(N))
      return Tr("WeakSet");
    if (wa(N))
      return Tr("WeakRef");
    if (te(N))
      return It(Se(Number(N)));
    if (pe(N))
      return It(Se(Q.call(N)));
    if (ae(N))
      return It(F.call(N));
    if (H(N))
      return It(Se(String(N)));
    if (typeof window < "u" && N === window)
      return "{ [object Window] }";
    if (typeof globalThis < "u" && N === globalThis || typeof lr < "u" && N === lr)
      return "{ [object globalThis] }";
    if (!$(N) && !V(N)) {
      var Nr = Ht(N, Se), hi = y ? y(N) === Object.prototype : N instanceof Object || N.constructor === Object, Fr = N instanceof Object ? "" : "null prototype", li = !hi && ee && Object(N) === N && ee in N ? E.call(Ee(N), 8, -1) : Fr ? "Object" : "", Pa = hi || typeof N.constructor != "function" ? "" : N.constructor.name ? N.constructor.name + " " : "", Pr = Pa + (li || Fr ? "[" + D.call(v.call([], li || [], Fr || []), ": ") + "] " : "");
      return Nr.length === 0 ? Pr + "{}" : lt ? Pr + "{" + wr(Nr, lt) + "}" : Pr + "{ " + D.call(Nr, ", ") + " }";
    }
    return String(N);
  };
  function P(T, N, le) {
    var ce = le.quoteStyle || N, de = R[ce];
    return de + T + de;
  }
  function U(T) {
    return w.call(String(T), /"/g, "&quot;");
  }
  function G(T) {
    return Ee(T) === "[object Array]" && (!ee || !(typeof T == "object" && ee in T));
  }
  function $(T) {
    return Ee(T) === "[object Date]" && (!ee || !(typeof T == "object" && ee in T));
  }
  function V(T) {
    return Ee(T) === "[object RegExp]" && (!ee || !(typeof T == "object" && ee in T));
  }
  function z(T) {
    return Ee(T) === "[object Error]" && (!ee || !(typeof T == "object" && ee in T));
  }
  function H(T) {
    return Ee(T) === "[object String]" && (!ee || !(typeof T == "object" && ee in T));
  }
  function te(T) {
    return Ee(T) === "[object Number]" && (!ee || !(typeof T == "object" && ee in T));
  }
  function ae(T) {
    return Ee(T) === "[object Boolean]" && (!ee || !(typeof T == "object" && ee in T));
  }
  function ye(T) {
    if (ie)
      return T && typeof T == "object" && T instanceof Symbol;
    if (typeof T == "symbol")
      return !0;
    if (!T || typeof T != "object" || !ne)
      return !1;
    try {
      return ne.call(T), !0;
    } catch {
    }
    return !1;
  }
  function pe(T) {
    if (!T || typeof T != "object" || !Q)
      return !1;
    try {
      return Q.call(T), !0;
    } catch {
    }
    return !1;
  }
  var q = Object.prototype.hasOwnProperty || function(T) {
    return T in this;
  };
  function K(T, N) {
    return q.call(T, N);
  }
  function Ee(T) {
    return C.call(T);
  }
  function Er(T) {
    if (T.name)
      return T.name;
    var N = A.call(f.call(T), /^function\s*([\w$]+)/);
    return N ? N[1] : null;
  }
  function ei(T, N) {
    if (T.indexOf)
      return T.indexOf(N);
    for (var le = 0, ce = T.length; le < ce; le++)
      if (T[le] === N)
        return le;
    return -1;
  }
  function Ea(T) {
    if (!t || !T || typeof T != "object")
      return !1;
    try {
      t.call(T);
      try {
        a.call(T);
      } catch {
        return !0;
      }
      return T instanceof Map;
    } catch {
    }
    return !1;
  }
  function Ta(T) {
    if (!l || !T || typeof T != "object")
      return !1;
    try {
      l.call(T, l);
      try {
        g.call(T, g);
      } catch {
        return !0;
      }
      return T instanceof WeakMap;
    } catch {
    }
    return !1;
  }
  function wa(T) {
    if (!b || !T || typeof T != "object")
      return !1;
    try {
      return b.call(T), !0;
    } catch {
    }
    return !1;
  }
  function Ra(T) {
    if (!a || !T || typeof T != "object")
      return !1;
    try {
      a.call(T);
      try {
        t.call(T);
      } catch {
        return !0;
      }
      return T instanceof Set;
    } catch {
    }
    return !1;
  }
  function Ia(T) {
    if (!g || !T || typeof T != "object")
      return !1;
    try {
      g.call(T, g);
      try {
        l.call(T, l);
      } catch {
        return !0;
      }
      return T instanceof WeakSet;
    } catch {
    }
    return !1;
  }
  function Sa(T) {
    return !T || typeof T != "object" ? !1 : typeof HTMLElement < "u" && T instanceof HTMLElement ? !0 : typeof T.nodeName == "string" && typeof T.getAttribute == "function";
  }
  function ti(T, N) {
    if (T.length > N.maxStringLength) {
      var le = T.length - N.maxStringLength, ce = "... " + le + " more character" + (le > 1 ? "s" : "");
      return ti(E.call(T, 0, N.maxStringLength), N) + ce;
    }
    var de = S[N.quoteStyle || "single"];
    de.lastIndex = 0;
    var re = w.call(w.call(T, de, "\\$1"), /[\x00-\x1f]/g, Ca);
    return P(re, "single", N);
  }
  function Ca(T) {
    var N = T.charCodeAt(0), le = {
      8: "b",
      9: "t",
      10: "n",
      12: "f",
      13: "r"
    }[N];
    return le ? "\\" + le : "\\x" + (N < 16 ? "0" : "") + M.call(N.toString(16));
  }
  function It(T) {
    return "Object(" + T + ")";
  }
  function Tr(T) {
    return T + " { ? }";
  }
  function ri(T, N, le, ce) {
    var de = ce ? wr(le, ce) : D.call(le, ", ");
    return T + " (" + N + ") {" + de + "}";
  }
  function Na(T) {
    for (var N = 0; N < T.length; N++)
      if (ei(T[N], `
`) >= 0)
        return !1;
    return !0;
  }
  function Fa(T, N) {
    var le;
    if (T.indent === "	")
      le = "	";
    else if (typeof T.indent == "number" && T.indent > 0)
      le = D.call(Array(T.indent + 1), " ");
    else
      return null;
    return {
      base: le,
      prev: D.call(Array(N + 1), le)
    };
  }
  function wr(T, N) {
    if (T.length === 0)
      return "";
    var le = `
` + N.prev + N.base;
    return le + D.call(T, "," + le) + `
` + N.prev;
  }
  function Ht(T, N) {
    var le = G(T), ce = [];
    if (le) {
      ce.length = T.length;
      for (var de = 0; de < T.length; de++)
        ce[de] = K(T, de) ? N(T[de], T) : "";
    }
    var re = typeof B == "function" ? B(T) : [], Ve;
    if (ie) {
      Ve = {};
      for (var ze = 0; ze < re.length; ze++)
        Ve["$" + re[ze]] = re[ze];
    }
    for (var Te in T)
      K(T, Te) && (le && String(Number(Te)) === Te && Te < T.length || ie && Ve["$" + Te] instanceof Symbol || (O.call(/[^\w$]/, Te) ? ce.push(N(Te, T) + ": " + N(T[Te], T)) : ce.push(Te + ": " + N(T[Te], T))));
    if (typeof B == "function")
      for (var We = 0; We < re.length; We++)
        d.call(T, re[We]) && ce.push("[" + N(re[We]) + "]: " + N(T[re[We]], T));
    return ce;
  }
  return ss;
}
var is, qi;
function lo() {
  if (qi) return is;
  qi = 1;
  var r = /* @__PURE__ */ Et(), e = io(), t = /* @__PURE__ */ ho(), s = /* @__PURE__ */ $t(), i = r("%WeakMap%", !0), n = r("%Map%", !0), a = e("WeakMap.prototype.get", !0), o = e("WeakMap.prototype.set", !0), h = e("WeakMap.prototype.has", !0), l = e("Map.prototype.get", !0), c = e("Map.prototype.set", !0), g = e("Map.prototype.has", !0), x = function(f, A) {
    for (var E = f, w; (w = E.next) !== null; E = w)
      if (w.key === A)
        return E.next = w.next, w.next = /** @type {NonNullable<typeof list.next>} */
        f.next, f.next = w, w;
  }, b = function(f, A) {
    var E = x(f, A);
    return E && E.value;
  }, F = function(f, A, E) {
    var w = x(f, A);
    w ? w.value = E : f.next = /** @type {import('.').ListNode<typeof value>} */
    {
      // eslint-disable-line no-param-reassign, no-extra-parens
      key: A,
      next: f.next,
      value: E
    };
  }, C = function(f, A) {
    return !!x(f, A);
  };
  return is = function() {
    var A, E, w, M = {
      assert: function(p) {
        if (!M.has(p))
          throw new s("Side channel does not contain " + t(p));
      },
      get: function(p) {
        if (i && p && (typeof p == "object" || typeof p == "function")) {
          if (A)
            return a(A, p);
        } else if (n) {
          if (E)
            return l(E, p);
        } else if (w)
          return b(w, p);
      },
      has: function(p) {
        if (i && p && (typeof p == "object" || typeof p == "function")) {
          if (A)
            return h(A, p);
        } else if (n) {
          if (E)
            return g(E, p);
        } else if (w)
          return C(w, p);
        return !1;
      },
      set: function(p, O) {
        i && p && (typeof p == "object" || typeof p == "function") ? (A || (A = new i()), o(A, p, O)) : n ? (E || (E = new n()), c(E, p, O)) : (w || (w = { key: {}, next: null }), F(w, p, O));
      }
    };
    return M;
  }, is;
}
var ns, Ki;
function Ks() {
  if (Ki) return ns;
  Ki = 1;
  var r = String.prototype.replace, e = /%20/g, t = {
    RFC1738: "RFC1738",
    RFC3986: "RFC3986"
  };
  return ns = {
    default: t.RFC3986,
    formatters: {
      RFC1738: function(s) {
        return r.call(s, e, "+");
      },
      RFC3986: function(s) {
        return String(s);
      }
    },
    RFC1738: t.RFC1738,
    RFC3986: t.RFC3986
  }, ns;
}
var as, Zi;
function Fn() {
  if (Zi) return as;
  Zi = 1;
  var r = /* @__PURE__ */ Ks(), e = Object.prototype.hasOwnProperty, t = Array.isArray, s = function() {
    for (var f = [], A = 0; A < 256; ++A)
      f.push("%" + ((A < 16 ? "0" : "") + A.toString(16)).toUpperCase());
    return f;
  }(), i = function(A) {
    for (; A.length > 1; ) {
      var E = A.pop(), w = E.obj[E.prop];
      if (t(w)) {
        for (var M = [], p = 0; p < w.length; ++p)
          typeof w[p] < "u" && M.push(w[p]);
        E.obj[E.prop] = M;
      }
    }
  }, n = function(A, E) {
    for (var w = E && E.plainObjects ? { __proto__: null } : {}, M = 0; M < A.length; ++M)
      typeof A[M] < "u" && (w[M] = A[M]);
    return w;
  }, a = function f(A, E, w) {
    if (!E)
      return A;
    if (typeof E != "object" && typeof E != "function") {
      if (t(A))
        A.push(E);
      else if (A && typeof A == "object")
        (w && (w.plainObjects || w.allowPrototypes) || !e.call(Object.prototype, E)) && (A[E] = !0);
      else
        return [A, E];
      return A;
    }
    if (!A || typeof A != "object")
      return [A].concat(E);
    var M = A;
    return t(A) && !t(E) && (M = n(A, w)), t(A) && t(E) ? (E.forEach(function(p, O) {
      if (e.call(A, O)) {
        var v = A[O];
        v && typeof v == "object" && p && typeof p == "object" ? A[O] = f(v, p, w) : A.push(p);
      } else
        A[O] = p;
    }), A) : Object.keys(E).reduce(function(p, O) {
      var v = E[O];
      return e.call(p, O) ? p[O] = f(p[O], v, w) : p[O] = v, p;
    }, M);
  }, o = function(A, E) {
    return Object.keys(E).reduce(function(w, M) {
      return w[M] = E[M], w;
    }, A);
  }, h = function(f, A, E) {
    var w = f.replace(/\+/g, " ");
    if (E === "iso-8859-1")
      return w.replace(/%[0-9a-f]{2}/gi, unescape);
    try {
      return decodeURIComponent(w);
    } catch {
      return w;
    }
  }, l = 1024, c = function(A, E, w, M, p) {
    if (A.length === 0)
      return A;
    var O = A;
    if (typeof A == "symbol" ? O = Symbol.prototype.toString.call(A) : typeof A != "string" && (O = String(A)), w === "iso-8859-1")
      return escape(O).replace(/%u[0-9a-f]{4}/gi, function(ne) {
        return "%26%23" + parseInt(ne.slice(2), 16) + "%3B";
      });
    for (var v = "", D = 0; D < O.length; D += l) {
      for (var X = O.length >= l ? O.slice(D, D + l) : O, W = [], Q = 0; Q < X.length; ++Q) {
        var B = X.charCodeAt(Q);
        if (B === 45 || B === 46 || B === 95 || B === 126 || B >= 48 && B <= 57 || B >= 65 && B <= 90 || B >= 97 && B <= 122 || p === r.RFC1738 && (B === 40 || B === 41)) {
          W[W.length] = X.charAt(Q);
          continue;
        }
        if (B < 128) {
          W[W.length] = s[B];
          continue;
        }
        if (B < 2048) {
          W[W.length] = s[192 | B >> 6] + s[128 | B & 63];
          continue;
        }
        if (B < 55296 || B >= 57344) {
          W[W.length] = s[224 | B >> 12] + s[128 | B >> 6 & 63] + s[128 | B & 63];
          continue;
        }
        Q += 1, B = 65536 + ((B & 1023) << 10 | X.charCodeAt(Q) & 1023), W[W.length] = s[240 | B >> 18] + s[128 | B >> 12 & 63] + s[128 | B >> 6 & 63] + s[128 | B & 63];
      }
      v += W.join("");
    }
    return v;
  }, g = function(A) {
    for (var E = [{ obj: { o: A }, prop: "o" }], w = [], M = 0; M < E.length; ++M)
      for (var p = E[M], O = p.obj[p.prop], v = Object.keys(O), D = 0; D < v.length; ++D) {
        var X = v[D], W = O[X];
        typeof W == "object" && W !== null && w.indexOf(W) === -1 && (E.push({ obj: O, prop: X }), w.push(W));
      }
    return i(E), A;
  }, x = function(A) {
    return Object.prototype.toString.call(A) === "[object RegExp]";
  }, b = function(A) {
    return !A || typeof A != "object" ? !1 : !!(A.constructor && A.constructor.isBuffer && A.constructor.isBuffer(A));
  }, F = function(A, E) {
    return [].concat(A, E);
  }, C = function(A, E) {
    if (t(A)) {
      for (var w = [], M = 0; M < A.length; M += 1)
        w.push(E(A[M]));
      return w;
    }
    return E(A);
  };
  return as = {
    arrayToObject: n,
    assign: o,
    combine: F,
    compact: g,
    decode: h,
    encode: c,
    isBuffer: b,
    isRegExp: x,
    maybeMap: C,
    merge: a
  }, as;
}
var os, Yi;
function uo() {
  if (Yi) return os;
  Yi = 1;
  var r = lo(), e = /* @__PURE__ */ Fn(), t = /* @__PURE__ */ Ks(), s = Object.prototype.hasOwnProperty, i = {
    brackets: function(f) {
      return f + "[]";
    },
    comma: "comma",
    indices: function(f, A) {
      return f + "[" + A + "]";
    },
    repeat: function(f) {
      return f;
    }
  }, n = Array.isArray, a = Array.prototype.push, o = function(C, f) {
    a.apply(C, n(f) ? f : [f]);
  }, h = Date.prototype.toISOString, l = t.default, c = {
    addQueryPrefix: !1,
    allowDots: !1,
    allowEmptyArrays: !1,
    arrayFormat: "indices",
    charset: "utf-8",
    charsetSentinel: !1,
    commaRoundTrip: !1,
    delimiter: "&",
    encode: !0,
    encodeDotInKeys: !1,
    encoder: e.encode,
    encodeValuesOnly: !1,
    filter: void 0,
    format: l,
    formatter: t.formatters[l],
    // deprecated
    indices: !1,
    serializeDate: function(f) {
      return h.call(f);
    },
    skipNulls: !1,
    strictNullHandling: !1
  }, g = function(f) {
    return typeof f == "string" || typeof f == "number" || typeof f == "boolean" || typeof f == "symbol" || typeof f == "bigint";
  }, x = {}, b = function C(f, A, E, w, M, p, O, v, D, X, W, Q, B, ne, ie, ee, d, y) {
    for (var u = f, I = y, m = 0, _ = !1; (I = I.get(x)) !== void 0 && !_; ) {
      var R = I.get(f);
      if (m += 1, typeof R < "u") {
        if (R === m)
          throw new RangeError("Cyclic object value");
        _ = !0;
      }
      typeof I.get(x) > "u" && (m = 0);
    }
    if (typeof X == "function" ? u = X(A, u) : u instanceof Date ? u = B(u) : E === "comma" && n(u) && (u = e.maybeMap(u, function(q) {
      return q instanceof Date ? B(q) : q;
    })), u === null) {
      if (p)
        return D && !ee ? D(A, c.encoder, d, "key", ne) : A;
      u = "";
    }
    if (g(u) || e.isBuffer(u)) {
      if (D) {
        var S = ee ? A : D(A, c.encoder, d, "key", ne);
        return [ie(S) + "=" + ie(D(u, c.encoder, d, "value", ne))];
      }
      return [ie(A) + "=" + ie(String(u))];
    }
    var P = [];
    if (typeof u > "u")
      return P;
    var U;
    if (E === "comma" && n(u))
      ee && D && (u = e.maybeMap(u, D)), U = [{ value: u.length > 0 ? u.join(",") || null : void 0 }];
    else if (n(X))
      U = X;
    else {
      var G = Object.keys(u);
      U = W ? G.sort(W) : G;
    }
    var $ = v ? String(A).replace(/\./g, "%2E") : String(A), V = w && n(u) && u.length === 1 ? $ + "[]" : $;
    if (M && n(u) && u.length === 0)
      return V + "[]";
    for (var z = 0; z < U.length; ++z) {
      var H = U[z], te = typeof H == "object" && H && typeof H.value < "u" ? H.value : u[H];
      if (!(O && te === null)) {
        var ae = Q && v ? String(H).replace(/\./g, "%2E") : String(H), ye = n(u) ? typeof E == "function" ? E(V, ae) : V : V + (Q ? "." + ae : "[" + ae + "]");
        y.set(f, m);
        var pe = r();
        pe.set(x, y), o(P, C(
          te,
          ye,
          E,
          w,
          M,
          p,
          O,
          v,
          E === "comma" && ee && n(u) ? null : D,
          X,
          W,
          Q,
          B,
          ne,
          ie,
          ee,
          d,
          pe
        ));
      }
    }
    return P;
  }, F = function(f) {
    if (!f)
      return c;
    if (typeof f.allowEmptyArrays < "u" && typeof f.allowEmptyArrays != "boolean")
      throw new TypeError("`allowEmptyArrays` option can only be `true` or `false`, when provided");
    if (typeof f.encodeDotInKeys < "u" && typeof f.encodeDotInKeys != "boolean")
      throw new TypeError("`encodeDotInKeys` option can only be `true` or `false`, when provided");
    if (f.encoder !== null && typeof f.encoder < "u" && typeof f.encoder != "function")
      throw new TypeError("Encoder has to be a function.");
    var A = f.charset || c.charset;
    if (typeof f.charset < "u" && f.charset !== "utf-8" && f.charset !== "iso-8859-1")
      throw new TypeError("The charset option must be either utf-8, iso-8859-1, or undefined");
    var E = t.default;
    if (typeof f.format < "u") {
      if (!s.call(t.formatters, f.format))
        throw new TypeError("Unknown format option provided.");
      E = f.format;
    }
    var w = t.formatters[E], M = c.filter;
    (typeof f.filter == "function" || n(f.filter)) && (M = f.filter);
    var p;
    if (f.arrayFormat in i ? p = f.arrayFormat : "indices" in f ? p = f.indices ? "indices" : "repeat" : p = c.arrayFormat, "commaRoundTrip" in f && typeof f.commaRoundTrip != "boolean")
      throw new TypeError("`commaRoundTrip` must be a boolean, or absent");
    var O = typeof f.allowDots > "u" ? f.encodeDotInKeys === !0 ? !0 : c.allowDots : !!f.allowDots;
    return {
      addQueryPrefix: typeof f.addQueryPrefix == "boolean" ? f.addQueryPrefix : c.addQueryPrefix,
      allowDots: O,
      allowEmptyArrays: typeof f.allowEmptyArrays == "boolean" ? !!f.allowEmptyArrays : c.allowEmptyArrays,
      arrayFormat: p,
      charset: A,
      charsetSentinel: typeof f.charsetSentinel == "boolean" ? f.charsetSentinel : c.charsetSentinel,
      commaRoundTrip: !!f.commaRoundTrip,
      delimiter: typeof f.delimiter > "u" ? c.delimiter : f.delimiter,
      encode: typeof f.encode == "boolean" ? f.encode : c.encode,
      encodeDotInKeys: typeof f.encodeDotInKeys == "boolean" ? f.encodeDotInKeys : c.encodeDotInKeys,
      encoder: typeof f.encoder == "function" ? f.encoder : c.encoder,
      encodeValuesOnly: typeof f.encodeValuesOnly == "boolean" ? f.encodeValuesOnly : c.encodeValuesOnly,
      filter: M,
      format: E,
      formatter: w,
      serializeDate: typeof f.serializeDate == "function" ? f.serializeDate : c.serializeDate,
      skipNulls: typeof f.skipNulls == "boolean" ? f.skipNulls : c.skipNulls,
      sort: typeof f.sort == "function" ? f.sort : null,
      strictNullHandling: typeof f.strictNullHandling == "boolean" ? f.strictNullHandling : c.strictNullHandling
    };
  };
  return os = function(C, f) {
    var A = C, E = F(f), w, M;
    typeof E.filter == "function" ? (M = E.filter, A = M("", A)) : n(E.filter) && (M = E.filter, w = M);
    var p = [];
    if (typeof A != "object" || A === null)
      return "";
    var O = i[E.arrayFormat], v = O === "comma" && E.commaRoundTrip;
    w || (w = Object.keys(A)), E.sort && w.sort(E.sort);
    for (var D = r(), X = 0; X < w.length; ++X) {
      var W = w[X], Q = A[W];
      E.skipNulls && Q === null || o(p, b(
        Q,
        W,
        O,
        v,
        E.allowEmptyArrays,
        E.strictNullHandling,
        E.skipNulls,
        E.encodeDotInKeys,
        E.encode ? E.encoder : null,
        E.filter,
        E.sort,
        E.allowDots,
        E.serializeDate,
        E.format,
        E.formatter,
        E.encodeValuesOnly,
        E.charset,
        D
      ));
    }
    var B = p.join(E.delimiter), ne = E.addQueryPrefix === !0 ? "?" : "";
    return E.charsetSentinel && (E.charset === "iso-8859-1" ? ne += "utf8=%26%2310003%3B&" : ne += "utf8=%E2%9C%93&"), B.length > 0 ? ne + B : "";
  }, os;
}
var hs, Qi;
function co() {
  if (Qi) return hs;
  Qi = 1;
  var r = /* @__PURE__ */ Fn(), e = Object.prototype.hasOwnProperty, t = Array.isArray, s = {
    allowDots: !1,
    allowEmptyArrays: !1,
    allowPrototypes: !1,
    allowSparse: !1,
    arrayLimit: 20,
    charset: "utf-8",
    charsetSentinel: !1,
    comma: !1,
    decodeDotInKeys: !1,
    decoder: r.decode,
    delimiter: "&",
    depth: 5,
    duplicates: "combine",
    ignoreQueryPrefix: !1,
    interpretNumericEntities: !1,
    parameterLimit: 1e3,
    parseArrays: !0,
    plainObjects: !1,
    strictDepth: !1,
    strictNullHandling: !1
  }, i = function(x) {
    return x.replace(/&#(\d+);/g, function(b, F) {
      return String.fromCharCode(parseInt(F, 10));
    });
  }, n = function(x, b) {
    return x && typeof x == "string" && b.comma && x.indexOf(",") > -1 ? x.split(",") : x;
  }, a = "utf8=%26%2310003%3B", o = "utf8=%E2%9C%93", h = function(b, F) {
    var C = { __proto__: null }, f = F.ignoreQueryPrefix ? b.replace(/^\?/, "") : b;
    f = f.replace(/%5B/gi, "[").replace(/%5D/gi, "]");
    var A = F.parameterLimit === 1 / 0 ? void 0 : F.parameterLimit, E = f.split(F.delimiter, A), w = -1, M, p = F.charset;
    if (F.charsetSentinel)
      for (M = 0; M < E.length; ++M)
        E[M].indexOf("utf8=") === 0 && (E[M] === o ? p = "utf-8" : E[M] === a && (p = "iso-8859-1"), w = M, M = E.length);
    for (M = 0; M < E.length; ++M)
      if (M !== w) {
        var O = E[M], v = O.indexOf("]="), D = v === -1 ? O.indexOf("=") : v + 1, X, W;
        D === -1 ? (X = F.decoder(O, s.decoder, p, "key"), W = F.strictNullHandling ? null : "") : (X = F.decoder(O.slice(0, D), s.decoder, p, "key"), W = r.maybeMap(
          n(O.slice(D + 1), F),
          function(B) {
            return F.decoder(B, s.decoder, p, "value");
          }
        )), W && F.interpretNumericEntities && p === "iso-8859-1" && (W = i(String(W))), O.indexOf("[]=") > -1 && (W = t(W) ? [W] : W);
        var Q = e.call(C, X);
        Q && F.duplicates === "combine" ? C[X] = r.combine(C[X], W) : (!Q || F.duplicates === "last") && (C[X] = W);
      }
    return C;
  }, l = function(x, b, F, C) {
    for (var f = C ? b : n(b, F), A = x.length - 1; A >= 0; --A) {
      var E, w = x[A];
      if (w === "[]" && F.parseArrays)
        E = F.allowEmptyArrays && (f === "" || F.strictNullHandling && f === null) ? [] : [].concat(f);
      else {
        E = F.plainObjects ? { __proto__: null } : {};
        var M = w.charAt(0) === "[" && w.charAt(w.length - 1) === "]" ? w.slice(1, -1) : w, p = F.decodeDotInKeys ? M.replace(/%2E/g, ".") : M, O = parseInt(p, 10);
        !F.parseArrays && p === "" ? E = { 0: f } : !isNaN(O) && w !== p && String(O) === p && O >= 0 && F.parseArrays && O <= F.arrayLimit ? (E = [], E[O] = f) : p !== "__proto__" && (E[p] = f);
      }
      f = E;
    }
    return f;
  }, c = function(b, F, C, f) {
    if (b) {
      var A = C.allowDots ? b.replace(/\.([^.[]+)/g, "[$1]") : b, E = /(\[[^[\]]*])/, w = /(\[[^[\]]*])/g, M = C.depth > 0 && E.exec(A), p = M ? A.slice(0, M.index) : A, O = [];
      if (p) {
        if (!C.plainObjects && e.call(Object.prototype, p) && !C.allowPrototypes)
          return;
        O.push(p);
      }
      for (var v = 0; C.depth > 0 && (M = w.exec(A)) !== null && v < C.depth; ) {
        if (v += 1, !C.plainObjects && e.call(Object.prototype, M[1].slice(1, -1)) && !C.allowPrototypes)
          return;
        O.push(M[1]);
      }
      if (M) {
        if (C.strictDepth === !0)
          throw new RangeError("Input depth exceeded depth option of " + C.depth + " and strictDepth is true");
        O.push("[" + A.slice(M.index) + "]");
      }
      return l(O, F, C, f);
    }
  }, g = function(b) {
    if (!b)
      return s;
    if (typeof b.allowEmptyArrays < "u" && typeof b.allowEmptyArrays != "boolean")
      throw new TypeError("`allowEmptyArrays` option can only be `true` or `false`, when provided");
    if (typeof b.decodeDotInKeys < "u" && typeof b.decodeDotInKeys != "boolean")
      throw new TypeError("`decodeDotInKeys` option can only be `true` or `false`, when provided");
    if (b.decoder !== null && typeof b.decoder < "u" && typeof b.decoder != "function")
      throw new TypeError("Decoder has to be a function.");
    if (typeof b.charset < "u" && b.charset !== "utf-8" && b.charset !== "iso-8859-1")
      throw new TypeError("The charset option must be either utf-8, iso-8859-1, or undefined");
    var F = typeof b.charset > "u" ? s.charset : b.charset, C = typeof b.duplicates > "u" ? s.duplicates : b.duplicates;
    if (C !== "combine" && C !== "first" && C !== "last")
      throw new TypeError("The duplicates option must be either combine, first, or last");
    var f = typeof b.allowDots > "u" ? b.decodeDotInKeys === !0 ? !0 : s.allowDots : !!b.allowDots;
    return {
      allowDots: f,
      allowEmptyArrays: typeof b.allowEmptyArrays == "boolean" ? !!b.allowEmptyArrays : s.allowEmptyArrays,
      allowPrototypes: typeof b.allowPrototypes == "boolean" ? b.allowPrototypes : s.allowPrototypes,
      allowSparse: typeof b.allowSparse == "boolean" ? b.allowSparse : s.allowSparse,
      arrayLimit: typeof b.arrayLimit == "number" ? b.arrayLimit : s.arrayLimit,
      charset: F,
      charsetSentinel: typeof b.charsetSentinel == "boolean" ? b.charsetSentinel : s.charsetSentinel,
      comma: typeof b.comma == "boolean" ? b.comma : s.comma,
      decodeDotInKeys: typeof b.decodeDotInKeys == "boolean" ? b.decodeDotInKeys : s.decodeDotInKeys,
      decoder: typeof b.decoder == "function" ? b.decoder : s.decoder,
      delimiter: typeof b.delimiter == "string" || r.isRegExp(b.delimiter) ? b.delimiter : s.delimiter,
      // eslint-disable-next-line no-implicit-coercion, no-extra-parens
      depth: typeof b.depth == "number" || b.depth === !1 ? +b.depth : s.depth,
      duplicates: C,
      ignoreQueryPrefix: b.ignoreQueryPrefix === !0,
      interpretNumericEntities: typeof b.interpretNumericEntities == "boolean" ? b.interpretNumericEntities : s.interpretNumericEntities,
      parameterLimit: typeof b.parameterLimit == "number" ? b.parameterLimit : s.parameterLimit,
      parseArrays: b.parseArrays !== !1,
      plainObjects: typeof b.plainObjects == "boolean" ? b.plainObjects : s.plainObjects,
      strictDepth: typeof b.strictDepth == "boolean" ? !!b.strictDepth : s.strictDepth,
      strictNullHandling: typeof b.strictNullHandling == "boolean" ? b.strictNullHandling : s.strictNullHandling
    };
  };
  return hs = function(x, b) {
    var F = g(b);
    if (x === "" || x === null || typeof x > "u")
      return F.plainObjects ? { __proto__: null } : {};
    for (var C = typeof x == "string" ? h(x, F) : x, f = F.plainObjects ? { __proto__: null } : {}, A = Object.keys(C), E = 0; E < A.length; ++E) {
      var w = A[E], M = c(w, C[w], F, typeof x == "string");
      f = r.merge(f, M, F);
    }
    return F.allowSparse === !0 ? f : r.compact(f);
  }, hs;
}
var ls, Ji;
function fo() {
  if (Ji) return ls;
  Ji = 1;
  var r = /* @__PURE__ */ uo(), e = /* @__PURE__ */ co(), t = /* @__PURE__ */ Ks();
  return ls = {
    formats: t,
    parse: e,
    stringify: r
  }, ls;
}
var en;
function po() {
  if (en) return qe;
  en = 1;
  var r = Va();
  function e() {
    this.protocol = null, this.slashes = null, this.auth = null, this.host = null, this.port = null, this.hostname = null, this.hash = null, this.search = null, this.query = null, this.pathname = null, this.path = null, this.href = null;
  }
  var t = /^([a-z0-9.+-]+:)/i, s = /:[0-9]*$/, i = /^(\/\/?(?!\/)[^?\s]*)(\?[^\s]*)?$/, n = [
    "<",
    ">",
    '"',
    "`",
    " ",
    "\r",
    `
`,
    "	"
  ], a = [
    "{",
    "}",
    "|",
    "\\",
    "^",
    "`"
  ].concat(n), o = ["'"].concat(a), h = [
    "%",
    "/",
    "?",
    ";",
    "#"
  ].concat(o), l = [
    "/",
    "?",
    "#"
  ], c = 255, g = /^[+a-z0-9A-Z_-]{0,63}$/, x = /^([+a-z0-9A-Z_-]{0,63})(.*)$/, b = {
    javascript: !0,
    "javascript:": !0
  }, F = {
    javascript: !0,
    "javascript:": !0
  }, C = {
    http: !0,
    https: !0,
    ftp: !0,
    gopher: !0,
    file: !0,
    "http:": !0,
    "https:": !0,
    "ftp:": !0,
    "gopher:": !0,
    "file:": !0
  }, f = /* @__PURE__ */ fo();
  function A(p, O, v) {
    if (p && typeof p == "object" && p instanceof e)
      return p;
    var D = new e();
    return D.parse(p, O, v), D;
  }
  e.prototype.parse = function(p, O, v) {
    if (typeof p != "string")
      throw new TypeError("Parameter 'url' must be a string, not " + typeof p);
    var D = p.indexOf("?"), X = D !== -1 && D < p.indexOf("#") ? "?" : "#", W = p.split(X), Q = /\\/g;
    W[0] = W[0].replace(Q, "/"), p = W.join(X);
    var B = p;
    if (B = B.trim(), !v && p.split("#").length === 1) {
      var ne = i.exec(B);
      if (ne)
        return this.path = B, this.href = B, this.pathname = ne[1], ne[2] ? (this.search = ne[2], O ? this.query = f.parse(this.search.substr(1)) : this.query = this.search.substr(1)) : O && (this.search = "", this.query = {}), this;
    }
    var ie = t.exec(B);
    if (ie) {
      ie = ie[0];
      var ee = ie.toLowerCase();
      this.protocol = ee, B = B.substr(ie.length);
    }
    if (v || ie || B.match(/^\/\/[^@/]+@[^@/]+/)) {
      var d = B.substr(0, 2) === "//";
      d && !(ie && F[ie]) && (B = B.substr(2), this.slashes = !0);
    }
    if (!F[ie] && (d || ie && !C[ie])) {
      for (var y = -1, u = 0; u < l.length; u++) {
        var I = B.indexOf(l[u]);
        I !== -1 && (y === -1 || I < y) && (y = I);
      }
      var m, _;
      y === -1 ? _ = B.lastIndexOf("@") : _ = B.lastIndexOf("@", y), _ !== -1 && (m = B.slice(0, _), B = B.slice(_ + 1), this.auth = decodeURIComponent(m)), y = -1;
      for (var u = 0; u < h.length; u++) {
        var I = B.indexOf(h[u]);
        I !== -1 && (y === -1 || I < y) && (y = I);
      }
      y === -1 && (y = B.length), this.host = B.slice(0, y), B = B.slice(y), this.parseHost(), this.hostname = this.hostname || "";
      var R = this.hostname[0] === "[" && this.hostname[this.hostname.length - 1] === "]";
      if (!R)
        for (var S = this.hostname.split(/\./), u = 0, P = S.length; u < P; u++) {
          var U = S[u];
          if (U && !U.match(g)) {
            for (var G = "", $ = 0, V = U.length; $ < V; $++)
              U.charCodeAt($) > 127 ? G += "x" : G += U[$];
            if (!G.match(g)) {
              var z = S.slice(0, u), H = S.slice(u + 1), te = U.match(x);
              te && (z.push(te[1]), H.unshift(te[2])), H.length && (B = "/" + H.join(".") + B), this.hostname = z.join(".");
              break;
            }
          }
        }
      this.hostname.length > c ? this.hostname = "" : this.hostname = this.hostname.toLowerCase(), R || (this.hostname = r.toASCII(this.hostname));
      var ae = this.port ? ":" + this.port : "", ye = this.hostname || "";
      this.host = ye + ae, this.href += this.host, R && (this.hostname = this.hostname.substr(1, this.hostname.length - 2), B[0] !== "/" && (B = "/" + B));
    }
    if (!b[ee])
      for (var u = 0, P = o.length; u < P; u++) {
        var pe = o[u];
        if (B.indexOf(pe) !== -1) {
          var q = encodeURIComponent(pe);
          q === pe && (q = escape(pe)), B = B.split(pe).join(q);
        }
      }
    var K = B.indexOf("#");
    K !== -1 && (this.hash = B.substr(K), B = B.slice(0, K));
    var Ee = B.indexOf("?");
    if (Ee !== -1 ? (this.search = B.substr(Ee), this.query = B.substr(Ee + 1), O && (this.query = f.parse(this.query)), B = B.slice(0, Ee)) : O && (this.search = "", this.query = {}), B && (this.pathname = B), C[ee] && this.hostname && !this.pathname && (this.pathname = "/"), this.pathname || this.search) {
      var ae = this.pathname || "", Er = this.search || "";
      this.path = ae + Er;
    }
    return this.href = this.format(), this;
  };
  function E(p) {
    return typeof p == "string" && (p = A(p)), p instanceof e ? p.format() : e.prototype.format.call(p);
  }
  e.prototype.format = function() {
    var p = this.auth || "";
    p && (p = encodeURIComponent(p), p = p.replace(/%3A/i, ":"), p += "@");
    var O = this.protocol || "", v = this.pathname || "", D = this.hash || "", X = !1, W = "";
    this.host ? X = p + this.host : this.hostname && (X = p + (this.hostname.indexOf(":") === -1 ? this.hostname : "[" + this.hostname + "]"), this.port && (X += ":" + this.port)), this.query && typeof this.query == "object" && Object.keys(this.query).length && (W = f.stringify(this.query, {
      arrayFormat: "repeat",
      addQueryPrefix: !1
    }));
    var Q = this.search || W && "?" + W || "";
    return O && O.substr(-1) !== ":" && (O += ":"), this.slashes || (!O || C[O]) && X !== !1 ? (X = "//" + (X || ""), v && v.charAt(0) !== "/" && (v = "/" + v)) : X || (X = ""), D && D.charAt(0) !== "#" && (D = "#" + D), Q && Q.charAt(0) !== "?" && (Q = "?" + Q), v = v.replace(/[?#]/g, function(B) {
      return encodeURIComponent(B);
    }), Q = Q.replace("#", "%23"), O + X + v + Q + D;
  };
  function w(p, O) {
    return A(p, !1, !0).resolve(O);
  }
  e.prototype.resolve = function(p) {
    return this.resolveObject(A(p, !1, !0)).format();
  };
  function M(p, O) {
    return p ? A(p, !1, !0).resolveObject(O) : O;
  }
  return e.prototype.resolveObject = function(p) {
    if (typeof p == "string") {
      var O = new e();
      O.parse(p, !1, !0), p = O;
    }
    for (var v = new e(), D = Object.keys(this), X = 0; X < D.length; X++) {
      var W = D[X];
      v[W] = this[W];
    }
    if (v.hash = p.hash, p.href === "")
      return v.href = v.format(), v;
    if (p.slashes && !p.protocol) {
      for (var Q = Object.keys(p), B = 0; B < Q.length; B++) {
        var ne = Q[B];
        ne !== "protocol" && (v[ne] = p[ne]);
      }
      return C[v.protocol] && v.hostname && !v.pathname && (v.pathname = "/", v.path = v.pathname), v.href = v.format(), v;
    }
    if (p.protocol && p.protocol !== v.protocol) {
      if (!C[p.protocol]) {
        for (var ie = Object.keys(p), ee = 0; ee < ie.length; ee++) {
          var d = ie[ee];
          v[d] = p[d];
        }
        return v.href = v.format(), v;
      }
      if (v.protocol = p.protocol, !p.host && !F[p.protocol]) {
        for (var P = (p.pathname || "").split("/"); P.length && !(p.host = P.shift()); )
          ;
        p.host || (p.host = ""), p.hostname || (p.hostname = ""), P[0] !== "" && P.unshift(""), P.length < 2 && P.unshift(""), v.pathname = P.join("/");
      } else
        v.pathname = p.pathname;
      if (v.search = p.search, v.query = p.query, v.host = p.host || "", v.auth = p.auth, v.hostname = p.hostname || p.host, v.port = p.port, v.pathname || v.search) {
        var y = v.pathname || "", u = v.search || "";
        v.path = y + u;
      }
      return v.slashes = v.slashes || p.slashes, v.href = v.format(), v;
    }
    var I = v.pathname && v.pathname.charAt(0) === "/", m = p.host || p.pathname && p.pathname.charAt(0) === "/", _ = m || I || v.host && p.pathname, R = _, S = v.pathname && v.pathname.split("/") || [], P = p.pathname && p.pathname.split("/") || [], U = v.protocol && !C[v.protocol];
    if (U && (v.hostname = "", v.port = null, v.host && (S[0] === "" ? S[0] = v.host : S.unshift(v.host)), v.host = "", p.protocol && (p.hostname = null, p.port = null, p.host && (P[0] === "" ? P[0] = p.host : P.unshift(p.host)), p.host = null), _ = _ && (P[0] === "" || S[0] === "")), m)
      v.host = p.host || p.host === "" ? p.host : v.host, v.hostname = p.hostname || p.hostname === "" ? p.hostname : v.hostname, v.search = p.search, v.query = p.query, S = P;
    else if (P.length)
      S || (S = []), S.pop(), S = S.concat(P), v.search = p.search, v.query = p.query;
    else if (p.search != null) {
      if (U) {
        v.host = S.shift(), v.hostname = v.host;
        var G = v.host && v.host.indexOf("@") > 0 ? v.host.split("@") : !1;
        G && (v.auth = G.shift(), v.hostname = G.shift(), v.host = v.hostname);
      }
      return v.search = p.search, v.query = p.query, (v.pathname !== null || v.search !== null) && (v.path = (v.pathname ? v.pathname : "") + (v.search ? v.search : "")), v.href = v.format(), v;
    }
    if (!S.length)
      return v.pathname = null, v.search ? v.path = "/" + v.search : v.path = null, v.href = v.format(), v;
    for (var $ = S.slice(-1)[0], V = (v.host || p.host || S.length > 1) && ($ === "." || $ === "..") || $ === "", z = 0, H = S.length; H >= 0; H--)
      $ = S[H], $ === "." ? S.splice(H, 1) : $ === ".." ? (S.splice(H, 1), z++) : z && (S.splice(H, 1), z--);
    if (!_ && !R)
      for (; z--; z)
        S.unshift("..");
    _ && S[0] !== "" && (!S[0] || S[0].charAt(0) !== "/") && S.unshift(""), V && S.join("/").substr(-1) !== "/" && S.push("");
    var te = S[0] === "" || S[0] && S[0].charAt(0) === "/";
    if (U) {
      v.hostname = te ? "" : S.length ? S.shift() : "", v.host = v.hostname;
      var G = v.host && v.host.indexOf("@") > 0 ? v.host.split("@") : !1;
      G && (v.auth = G.shift(), v.hostname = G.shift(), v.host = v.hostname);
    }
    return _ = _ || v.host && S.length, _ && !te && S.unshift(""), S.length > 0 ? v.pathname = S.join("/") : (v.pathname = null, v.path = null), (v.pathname !== null || v.search !== null) && (v.path = (v.pathname ? v.pathname : "") + (v.search ? v.search : "")), v.auth = p.auth || v.auth, v.slashes = v.slashes || p.slashes, v.href = v.format(), v;
  }, e.prototype.parseHost = function() {
    var p = this.host, O = s.exec(p);
    O && (O = O[0], O !== ":" && (this.port = O.substr(1)), p = p.substr(0, p.length - O.length)), p && (this.hostname = p);
  }, qe.parse = A, qe.resolve = w, qe.resolveObject = M, qe.format = E, qe.Url = e, qe;
}
po();
const tn = {};
function ue(r, e, t = 3) {
  if (tn[e])
    return;
  let s = new Error().stack;
  typeof s > "u" ? console.warn("PixiJS Deprecation Warning: ", `${e}
Deprecated since v${r}`) : (s = s.split(`
`).splice(t).join(`
`), console.groupCollapsed ? (console.groupCollapsed(
    "%cPixiJS Deprecation Warning: %c%s",
    "color:#614108;background:#fffbe6",
    "font-weight:normal;color:#614108;background:#fffbe6",
    `${e}
Deprecated since v${r}`
  ), console.warn(s), console.groupEnd()) : (console.warn("PixiJS Deprecation Warning: ", `${e}
Deprecated since v${r}`), console.warn(s))), tn[e] = !0;
}
function Ce(r) {
  if (typeof r != "string")
    throw new TypeError(`Path must be a string. Received ${JSON.stringify(r)}`);
}
function Ct(r) {
  return r.split("?")[0].split("#")[0];
}
function mo(r) {
  return r.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
function yo(r, e, t) {
  return r.replace(new RegExp(mo(e), "g"), t);
}
function go(r, e) {
  let t = "", s = 0, i = -1, n = 0, a = -1;
  for (let o = 0; o <= r.length; ++o) {
    if (o < r.length)
      a = r.charCodeAt(o);
    else {
      if (a === 47)
        break;
      a = 47;
    }
    if (a === 47) {
      if (!(i === o - 1 || n === 1))
        if (i !== o - 1 && n === 2) {
          if (t.length < 2 || s !== 2 || t.charCodeAt(t.length - 1) !== 46 || t.charCodeAt(t.length - 2) !== 46) {
            if (t.length > 2) {
              const h = t.lastIndexOf("/");
              if (h !== t.length - 1) {
                h === -1 ? (t = "", s = 0) : (t = t.slice(0, h), s = t.length - 1 - t.lastIndexOf("/")), i = o, n = 0;
                continue;
              }
            } else if (t.length === 2 || t.length === 1) {
              t = "", s = 0, i = o, n = 0;
              continue;
            }
          }
        } else
          t.length > 0 ? t += `/${r.slice(i + 1, o)}` : t = r.slice(i + 1, o), s = o - i - 1;
      i = o, n = 0;
    } else
      a === 46 && n !== -1 ? ++n : n = -1;
  }
  return t;
}
const $e = {
  /**
   * Converts a path to posix format.
   * @param path - The path to convert to posix
   */
  toPosix(r) {
    return yo(r, "\\", "/");
  },
  /**
   * Checks if the path is a URL e.g. http://, https://
   * @param path - The path to check
   */
  isUrl(r) {
    return /^https?:/.test(this.toPosix(r));
  },
  /**
   * Checks if the path is a data URL
   * @param path - The path to check
   */
  isDataUrl(r) {
    return /^data:([a-z]+\/[a-z0-9-+.]+(;[a-z0-9-.!#$%*+.{}|~`]+=[a-z0-9-.!#$%*+.{}()_|~`]+)*)?(;base64)?,([a-z0-9!$&',()*+;=\-._~:@\/?%\s<>]*?)$/i.test(r);
  },
  /**
   * Checks if the path is a blob URL
   * @param path - The path to check
   */
  isBlobUrl(r) {
    return r.startsWith("blob:");
  },
  /**
   * Checks if the path has a protocol e.g. http://, https://, file:///, data:, blob:, C:/
   * This will return true for windows file paths
   * @param path - The path to check
   */
  hasProtocol(r) {
    return /^[^/:]+:/.test(this.toPosix(r));
  },
  /**
   * Returns the protocol of the path e.g. http://, https://, file:///, data:, blob:, C:/
   * @param path - The path to get the protocol from
   */
  getProtocol(r) {
    Ce(r), r = this.toPosix(r);
    const e = /^file:\/\/\//.exec(r);
    if (e)
      return e[0];
    const t = /^[^/:]+:\/{0,2}/.exec(r);
    return t ? t[0] : "";
  },
  /**
   * Converts URL to an absolute path.
   * When loading from a Web Worker, we must use absolute paths.
   * If the URL is already absolute we return it as is
   * If it's not, we convert it
   * @param url - The URL to test
   * @param customBaseUrl - The base URL to use
   * @param customRootUrl - The root URL to use
   */
  toAbsolute(r, e, t) {
    if (Ce(r), this.isDataUrl(r) || this.isBlobUrl(r))
      return r;
    const s = Ct(this.toPosix(e ?? J.ADAPTER.getBaseUrl())), i = Ct(this.toPosix(t ?? this.rootname(s)));
    return r = this.toPosix(r), r.startsWith("/") ? $e.join(i, r.slice(1)) : this.isAbsolute(r) ? r : this.join(s, r);
  },
  /**
   * Normalizes the given path, resolving '..' and '.' segments
   * @param path - The path to normalize
   */
  normalize(r) {
    if (Ce(r), r.length === 0)
      return ".";
    if (this.isDataUrl(r) || this.isBlobUrl(r))
      return r;
    r = this.toPosix(r);
    let e = "";
    const t = r.startsWith("/");
    this.hasProtocol(r) && (e = this.rootname(r), r = r.slice(e.length));
    const s = r.endsWith("/");
    return r = go(r), r.length > 0 && s && (r += "/"), t ? `/${r}` : e + r;
  },
  /**
   * Determines if path is an absolute path.
   * Absolute paths can be urls, data urls, or paths on disk
   * @param path - The path to test
   */
  isAbsolute(r) {
    return Ce(r), r = this.toPosix(r), this.hasProtocol(r) ? !0 : r.startsWith("/");
  },
  /**
   * Joins all given path segments together using the platform-specific separator as a delimiter,
   * then normalizes the resulting path
   * @param segments - The segments of the path to join
   */
  join(...r) {
    if (r.length === 0)
      return ".";
    let e;
    for (let t = 0; t < r.length; ++t) {
      const s = r[t];
      if (Ce(s), s.length > 0)
        if (e === void 0)
          e = s;
        else {
          const i = r[t - 1] ?? "";
          this.joinExtensions.includes(this.extname(i).toLowerCase()) ? e += `/../${s}` : e += `/${s}`;
        }
    }
    return e === void 0 ? "." : this.normalize(e);
  },
  /**
   * Returns the directory name of a path
   * @param path - The path to parse
   */
  dirname(r) {
    if (Ce(r), r.length === 0)
      return ".";
    r = this.toPosix(r);
    let e = r.charCodeAt(0);
    const t = e === 47;
    let s = -1, i = !0;
    const n = this.getProtocol(r), a = r;
    r = r.slice(n.length);
    for (let o = r.length - 1; o >= 1; --o)
      if (e = r.charCodeAt(o), e === 47) {
        if (!i) {
          s = o;
          break;
        }
      } else
        i = !1;
    return s === -1 ? t ? "/" : this.isUrl(a) ? n + r : n : t && s === 1 ? "//" : n + r.slice(0, s);
  },
  /**
   * Returns the root of the path e.g. /, C:/, file:///, http://domain.com/
   * @param path - The path to parse
   */
  rootname(r) {
    Ce(r), r = this.toPosix(r);
    let e = "";
    if (r.startsWith("/") ? e = "/" : e = this.getProtocol(r), this.isUrl(r)) {
      const t = r.indexOf("/", e.length);
      t !== -1 ? e = r.slice(0, t) : e = r, e.endsWith("/") || (e += "/");
    }
    return e;
  },
  /**
   * Returns the last portion of a path
   * @param path - The path to test
   * @param ext - Optional extension to remove
   */
  basename(r, e) {
    Ce(r), e && Ce(e), r = Ct(this.toPosix(r));
    let t = 0, s = -1, i = !0, n;
    if (e !== void 0 && e.length > 0 && e.length <= r.length) {
      if (e.length === r.length && e === r)
        return "";
      let a = e.length - 1, o = -1;
      for (n = r.length - 1; n >= 0; --n) {
        const h = r.charCodeAt(n);
        if (h === 47) {
          if (!i) {
            t = n + 1;
            break;
          }
        } else
          o === -1 && (i = !1, o = n + 1), a >= 0 && (h === e.charCodeAt(a) ? --a === -1 && (s = n) : (a = -1, s = o));
      }
      return t === s ? s = o : s === -1 && (s = r.length), r.slice(t, s);
    }
    for (n = r.length - 1; n >= 0; --n)
      if (r.charCodeAt(n) === 47) {
        if (!i) {
          t = n + 1;
          break;
        }
      } else
        s === -1 && (i = !1, s = n + 1);
    return s === -1 ? "" : r.slice(t, s);
  },
  /**
   * Returns the extension of the path, from the last occurrence of the . (period) character to end of string in the last
   * portion of the path. If there is no . in the last portion of the path, or if there are no . characters other than
   * the first character of the basename of path, an empty string is returned.
   * @param path - The path to parse
   */
  extname(r) {
    Ce(r), r = Ct(this.toPosix(r));
    let e = -1, t = 0, s = -1, i = !0, n = 0;
    for (let a = r.length - 1; a >= 0; --a) {
      const o = r.charCodeAt(a);
      if (o === 47) {
        if (!i) {
          t = a + 1;
          break;
        }
        continue;
      }
      s === -1 && (i = !1, s = a + 1), o === 46 ? e === -1 ? e = a : n !== 1 && (n = 1) : e !== -1 && (n = -1);
    }
    return e === -1 || s === -1 || n === 0 || n === 1 && e === s - 1 && e === t + 1 ? "" : r.slice(e, s);
  },
  /**
   * Parses a path into an object containing the 'root', `dir`, `base`, `ext`, and `name` properties.
   * @param path - The path to parse
   */
  parse(r) {
    Ce(r);
    const e = { root: "", dir: "", base: "", ext: "", name: "" };
    if (r.length === 0)
      return e;
    r = Ct(this.toPosix(r));
    let t = r.charCodeAt(0);
    const s = this.isAbsolute(r);
    let i;
    e.root = this.rootname(r), s || this.hasProtocol(r) ? i = 1 : i = 0;
    let n = -1, a = 0, o = -1, h = !0, l = r.length - 1, c = 0;
    for (; l >= i; --l) {
      if (t = r.charCodeAt(l), t === 47) {
        if (!h) {
          a = l + 1;
          break;
        }
        continue;
      }
      o === -1 && (h = !1, o = l + 1), t === 46 ? n === -1 ? n = l : c !== 1 && (c = 1) : n !== -1 && (c = -1);
    }
    return n === -1 || o === -1 || c === 0 || c === 1 && n === o - 1 && n === a + 1 ? o !== -1 && (a === 0 && s ? e.base = e.name = r.slice(1, o) : e.base = e.name = r.slice(a, o)) : (a === 0 && s ? (e.name = r.slice(1, n), e.base = r.slice(1, o)) : (e.name = r.slice(a, n), e.base = r.slice(a, o)), e.ext = r.slice(n, o)), e.dir = this.dirname(r), e;
  },
  sep: "/",
  delimiter: ":",
  joinExtensions: [".html"]
};
let us;
async function vo() {
  return us ?? (us = (async () => {
    const r = document.createElement("canvas").getContext("webgl");
    if (!r)
      return Pe.UNPACK;
    const e = await new Promise((n) => {
      const a = document.createElement("video");
      a.onloadeddata = () => n(a), a.onerror = () => n(null), a.autoplay = !1, a.crossOrigin = "anonymous", a.preload = "auto", a.src = "data:video/webm;base64,GkXfo59ChoEBQveBAULygQRC84EIQoKEd2VibUKHgQJChYECGFOAZwEAAAAAAAHTEU2bdLpNu4tTq4QVSalmU6yBoU27i1OrhBZUrmtTrIHGTbuMU6uEElTDZ1OsggEXTbuMU6uEHFO7a1OsggG97AEAAAAAAABZAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAVSalmoCrXsYMPQkBNgIRMYXZmV0GETGF2ZkSJiEBEAAAAAAAAFlSua8yuAQAAAAAAAEPXgQFzxYgAAAAAAAAAAZyBACK1nIN1bmSIgQCGhVZfVlA5g4EBI+ODhAJiWgDglLCBArqBApqBAlPAgQFVsIRVuYEBElTDZ9Vzc9JjwItjxYgAAAAAAAAAAWfInEWjh0VOQ09ERVJEh49MYXZjIGxpYnZweC12cDlnyKJFo4hEVVJBVElPTkSHlDAwOjAwOjAwLjA0MDAwMDAwMAAAH0O2dcfngQCgwqGggQAAAIJJg0IAABAAFgA4JBwYSgAAICAAEb///4r+AAB1oZ2mm+6BAaWWgkmDQgAAEAAWADgkHBhKAAAgIABIQBxTu2uRu4+zgQC3iveBAfGCAXHwgQM=", a.load();
    });
    if (!e)
      return Pe.UNPACK;
    const t = r.createTexture();
    r.bindTexture(r.TEXTURE_2D, t);
    const s = r.createFramebuffer();
    r.bindFramebuffer(r.FRAMEBUFFER, s), r.framebufferTexture2D(
      r.FRAMEBUFFER,
      r.COLOR_ATTACHMENT0,
      r.TEXTURE_2D,
      t,
      0
    ), r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL, !1), r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL, r.NONE), r.texImage2D(r.TEXTURE_2D, 0, r.RGBA, r.RGBA, r.UNSIGNED_BYTE, e);
    const i = new Uint8Array(4);
    return r.readPixels(0, 0, 1, 1, r.RGBA, r.UNSIGNED_BYTE, i), r.deleteFramebuffer(s), r.deleteTexture(t), r.getExtension("WEBGL_lose_context")?.loseContext(), i[0] <= i[3] ? Pe.PMA : Pe.UNPACK;
  })()), us;
}
let cs;
function _o() {
  return typeof cs > "u" && (cs = function() {
    const r = {
      stencil: !0,
      failIfMajorPerformanceCaveat: J.FAIL_IF_MAJOR_PERFORMANCE_CAVEAT
    };
    try {
      if (!J.ADAPTER.getWebGLRenderingContext())
        return !1;
      const e = J.ADAPTER.createCanvas();
      let t = e.getContext("webgl", r) || e.getContext("experimental-webgl", r);
      const s = !!t?.getContextAttributes()?.stencil;
      if (t) {
        const i = t.getExtension("WEBGL_lose_context");
        i && i.loseContext();
      }
      return t = null, s;
    } catch {
      return !1;
    }
  }()), cs;
}
var Ao = { grad: 0.9, turn: 360, rad: 360 / (2 * Math.PI) }, Ge = function(r) {
  return typeof r == "string" ? r.length > 0 : typeof r == "number";
}, _e = function(r, e, t) {
  return e === void 0 && (e = 0), t === void 0 && (t = Math.pow(10, e)), Math.round(t * r) / t + 0;
}, Ie = function(r, e, t) {
  return e === void 0 && (e = 0), t === void 0 && (t = 1), r > t ? t : r > e ? r : e;
}, Pn = function(r) {
  return (r = isFinite(r) ? r % 360 : 0) > 0 ? r : r + 360;
}, rn = function(r) {
  return { r: Ie(r.r, 0, 255), g: Ie(r.g, 0, 255), b: Ie(r.b, 0, 255), a: Ie(r.a) };
}, ds = function(r) {
  return { r: _e(r.r), g: _e(r.g), b: _e(r.b), a: _e(r.a, 3) };
}, xo = /^#([0-9a-f]{3,8})$/i, zt = function(r) {
  var e = r.toString(16);
  return e.length < 2 ? "0" + e : e;
}, On = function(r) {
  var e = r.r, t = r.g, s = r.b, i = r.a, n = Math.max(e, t, s), a = n - Math.min(e, t, s), o = a ? n === e ? (t - s) / a : n === t ? 2 + (s - e) / a : 4 + (e - t) / a : 0;
  return { h: 60 * (o < 0 ? o + 6 : o), s: n ? a / n * 100 : 0, v: n / 255 * 100, a: i };
}, Bn = function(r) {
  var e = r.h, t = r.s, s = r.v, i = r.a;
  e = e / 360 * 6, t /= 100, s /= 100;
  var n = Math.floor(e), a = s * (1 - t), o = s * (1 - (e - n) * t), h = s * (1 - (1 - e + n) * t), l = n % 6;
  return { r: 255 * [s, o, a, a, h, s][l], g: 255 * [h, s, s, o, a, a][l], b: 255 * [a, a, h, s, s, o][l], a: i };
}, sn = function(r) {
  return { h: Pn(r.h), s: Ie(r.s, 0, 100), l: Ie(r.l, 0, 100), a: Ie(r.a) };
}, nn = function(r) {
  return { h: _e(r.h), s: _e(r.s), l: _e(r.l), a: _e(r.a, 3) };
}, an = function(r) {
  return Bn((t = (e = r).s, { h: e.h, s: (t *= ((s = e.l) < 50 ? s : 100 - s) / 100) > 0 ? 2 * t / (s + t) * 100 : 0, v: s + t, a: e.a }));
  var e, t, s;
}, Lt = function(r) {
  return { h: (e = On(r)).h, s: (i = (200 - (t = e.s)) * (s = e.v) / 100) > 0 && i < 200 ? t * s / 100 / (i <= 100 ? i : 200 - i) * 100 : 0, l: i / 2, a: e.a };
  var e, t, s, i;
}, bo = /^hsla?\(\s*([+-]?\d*\.?\d+)(deg|rad|grad|turn)?\s*,\s*([+-]?\d*\.?\d+)%\s*,\s*([+-]?\d*\.?\d+)%\s*(?:,\s*([+-]?\d*\.?\d+)(%)?\s*)?\)$/i, Eo = /^hsla?\(\s*([+-]?\d*\.?\d+)(deg|rad|grad|turn)?\s+([+-]?\d*\.?\d+)%\s+([+-]?\d*\.?\d+)%\s*(?:\/\s*([+-]?\d*\.?\d+)(%)?\s*)?\)$/i, To = /^rgba?\(\s*([+-]?\d*\.?\d+)(%)?\s*,\s*([+-]?\d*\.?\d+)(%)?\s*,\s*([+-]?\d*\.?\d+)(%)?\s*(?:,\s*([+-]?\d*\.?\d+)(%)?\s*)?\)$/i, wo = /^rgba?\(\s*([+-]?\d*\.?\d+)(%)?\s+([+-]?\d*\.?\d+)(%)?\s+([+-]?\d*\.?\d+)(%)?\s*(?:\/\s*([+-]?\d*\.?\d+)(%)?\s*)?\)$/i, Ss = { string: [[function(r) {
  var e = xo.exec(r);
  return e ? (r = e[1]).length <= 4 ? { r: parseInt(r[0] + r[0], 16), g: parseInt(r[1] + r[1], 16), b: parseInt(r[2] + r[2], 16), a: r.length === 4 ? _e(parseInt(r[3] + r[3], 16) / 255, 2) : 1 } : r.length === 6 || r.length === 8 ? { r: parseInt(r.substr(0, 2), 16), g: parseInt(r.substr(2, 2), 16), b: parseInt(r.substr(4, 2), 16), a: r.length === 8 ? _e(parseInt(r.substr(6, 2), 16) / 255, 2) : 1 } : null : null;
}, "hex"], [function(r) {
  var e = To.exec(r) || wo.exec(r);
  return e ? e[2] !== e[4] || e[4] !== e[6] ? null : rn({ r: Number(e[1]) / (e[2] ? 100 / 255 : 1), g: Number(e[3]) / (e[4] ? 100 / 255 : 1), b: Number(e[5]) / (e[6] ? 100 / 255 : 1), a: e[7] === void 0 ? 1 : Number(e[7]) / (e[8] ? 100 : 1) }) : null;
}, "rgb"], [function(r) {
  var e = bo.exec(r) || Eo.exec(r);
  if (!e) return null;
  var t, s, i = sn({ h: (t = e[1], s = e[2], s === void 0 && (s = "deg"), Number(t) * (Ao[s] || 1)), s: Number(e[3]), l: Number(e[4]), a: e[5] === void 0 ? 1 : Number(e[5]) / (e[6] ? 100 : 1) });
  return an(i);
}, "hsl"]], object: [[function(r) {
  var e = r.r, t = r.g, s = r.b, i = r.a, n = i === void 0 ? 1 : i;
  return Ge(e) && Ge(t) && Ge(s) ? rn({ r: Number(e), g: Number(t), b: Number(s), a: Number(n) }) : null;
}, "rgb"], [function(r) {
  var e = r.h, t = r.s, s = r.l, i = r.a, n = i === void 0 ? 1 : i;
  if (!Ge(e) || !Ge(t) || !Ge(s)) return null;
  var a = sn({ h: Number(e), s: Number(t), l: Number(s), a: Number(n) });
  return an(a);
}, "hsl"], [function(r) {
  var e = r.h, t = r.s, s = r.v, i = r.a, n = i === void 0 ? 1 : i;
  if (!Ge(e) || !Ge(t) || !Ge(s)) return null;
  var a = function(o) {
    return { h: Pn(o.h), s: Ie(o.s, 0, 100), v: Ie(o.v, 0, 100), a: Ie(o.a) };
  }({ h: Number(e), s: Number(t), v: Number(s), a: Number(n) });
  return Bn(a);
}, "hsv"]] }, on = function(r, e) {
  for (var t = 0; t < e.length; t++) {
    var s = e[t][0](r);
    if (s) return [s, e[t][1]];
  }
  return [null, void 0];
}, Ro = function(r) {
  return typeof r == "string" ? on(r.trim(), Ss.string) : typeof r == "object" && r !== null ? on(r, Ss.object) : [null, void 0];
}, fs = function(r, e) {
  var t = Lt(r);
  return { h: t.h, s: Ie(t.s + 100 * e, 0, 100), l: t.l, a: t.a };
}, ps = function(r) {
  return (299 * r.r + 587 * r.g + 114 * r.b) / 1e3 / 255;
}, hn = function(r, e) {
  var t = Lt(r);
  return { h: t.h, s: t.s, l: Ie(t.l + 100 * e, 0, 100), a: t.a };
}, Cs = function() {
  function r(e) {
    this.parsed = Ro(e)[0], this.rgba = this.parsed || { r: 0, g: 0, b: 0, a: 1 };
  }
  return r.prototype.isValid = function() {
    return this.parsed !== null;
  }, r.prototype.brightness = function() {
    return _e(ps(this.rgba), 2);
  }, r.prototype.isDark = function() {
    return ps(this.rgba) < 0.5;
  }, r.prototype.isLight = function() {
    return ps(this.rgba) >= 0.5;
  }, r.prototype.toHex = function() {
    return e = ds(this.rgba), t = e.r, s = e.g, i = e.b, a = (n = e.a) < 1 ? zt(_e(255 * n)) : "", "#" + zt(t) + zt(s) + zt(i) + a;
    var e, t, s, i, n, a;
  }, r.prototype.toRgb = function() {
    return ds(this.rgba);
  }, r.prototype.toRgbString = function() {
    return e = ds(this.rgba), t = e.r, s = e.g, i = e.b, (n = e.a) < 1 ? "rgba(" + t + ", " + s + ", " + i + ", " + n + ")" : "rgb(" + t + ", " + s + ", " + i + ")";
    var e, t, s, i, n;
  }, r.prototype.toHsl = function() {
    return nn(Lt(this.rgba));
  }, r.prototype.toHslString = function() {
    return e = nn(Lt(this.rgba)), t = e.h, s = e.s, i = e.l, (n = e.a) < 1 ? "hsla(" + t + ", " + s + "%, " + i + "%, " + n + ")" : "hsl(" + t + ", " + s + "%, " + i + "%)";
    var e, t, s, i, n;
  }, r.prototype.toHsv = function() {
    return e = On(this.rgba), { h: _e(e.h), s: _e(e.s), v: _e(e.v), a: _e(e.a, 3) };
    var e;
  }, r.prototype.invert = function() {
    return Be({ r: 255 - (e = this.rgba).r, g: 255 - e.g, b: 255 - e.b, a: e.a });
    var e;
  }, r.prototype.saturate = function(e) {
    return e === void 0 && (e = 0.1), Be(fs(this.rgba, e));
  }, r.prototype.desaturate = function(e) {
    return e === void 0 && (e = 0.1), Be(fs(this.rgba, -e));
  }, r.prototype.grayscale = function() {
    return Be(fs(this.rgba, -1));
  }, r.prototype.lighten = function(e) {
    return e === void 0 && (e = 0.1), Be(hn(this.rgba, e));
  }, r.prototype.darken = function(e) {
    return e === void 0 && (e = 0.1), Be(hn(this.rgba, -e));
  }, r.prototype.rotate = function(e) {
    return e === void 0 && (e = 15), this.hue(this.hue() + e);
  }, r.prototype.alpha = function(e) {
    return typeof e == "number" ? Be({ r: (t = this.rgba).r, g: t.g, b: t.b, a: e }) : _e(this.rgba.a, 3);
    var t;
  }, r.prototype.hue = function(e) {
    var t = Lt(this.rgba);
    return typeof e == "number" ? Be({ h: e, s: t.s, l: t.l, a: t.a }) : _e(t.h);
  }, r.prototype.isEqual = function(e) {
    return this.toHex() === Be(e).toHex();
  }, r;
}(), Be = function(r) {
  return r instanceof Cs ? r : new Cs(r);
}, ln = [], Io = function(r) {
  r.forEach(function(e) {
    ln.indexOf(e) < 0 && (e(Cs, Ss), ln.push(e));
  });
};
function So(r, e) {
  var t = { white: "#ffffff", bisque: "#ffe4c4", blue: "#0000ff", cadetblue: "#5f9ea0", chartreuse: "#7fff00", chocolate: "#d2691e", coral: "#ff7f50", antiquewhite: "#faebd7", aqua: "#00ffff", azure: "#f0ffff", whitesmoke: "#f5f5f5", papayawhip: "#ffefd5", plum: "#dda0dd", blanchedalmond: "#ffebcd", black: "#000000", gold: "#ffd700", goldenrod: "#daa520", gainsboro: "#dcdcdc", cornsilk: "#fff8dc", cornflowerblue: "#6495ed", burlywood: "#deb887", aquamarine: "#7fffd4", beige: "#f5f5dc", crimson: "#dc143c", cyan: "#00ffff", darkblue: "#00008b", darkcyan: "#008b8b", darkgoldenrod: "#b8860b", darkkhaki: "#bdb76b", darkgray: "#a9a9a9", darkgreen: "#006400", darkgrey: "#a9a9a9", peachpuff: "#ffdab9", darkmagenta: "#8b008b", darkred: "#8b0000", darkorchid: "#9932cc", darkorange: "#ff8c00", darkslateblue: "#483d8b", gray: "#808080", darkslategray: "#2f4f4f", darkslategrey: "#2f4f4f", deeppink: "#ff1493", deepskyblue: "#00bfff", wheat: "#f5deb3", firebrick: "#b22222", floralwhite: "#fffaf0", ghostwhite: "#f8f8ff", darkviolet: "#9400d3", magenta: "#ff00ff", green: "#008000", dodgerblue: "#1e90ff", grey: "#808080", honeydew: "#f0fff0", hotpink: "#ff69b4", blueviolet: "#8a2be2", forestgreen: "#228b22", lawngreen: "#7cfc00", indianred: "#cd5c5c", indigo: "#4b0082", fuchsia: "#ff00ff", brown: "#a52a2a", maroon: "#800000", mediumblue: "#0000cd", lightcoral: "#f08080", darkturquoise: "#00ced1", lightcyan: "#e0ffff", ivory: "#fffff0", lightyellow: "#ffffe0", lightsalmon: "#ffa07a", lightseagreen: "#20b2aa", linen: "#faf0e6", mediumaquamarine: "#66cdaa", lemonchiffon: "#fffacd", lime: "#00ff00", khaki: "#f0e68c", mediumseagreen: "#3cb371", limegreen: "#32cd32", mediumspringgreen: "#00fa9a", lightskyblue: "#87cefa", lightblue: "#add8e6", midnightblue: "#191970", lightpink: "#ffb6c1", mistyrose: "#ffe4e1", moccasin: "#ffe4b5", mintcream: "#f5fffa", lightslategray: "#778899", lightslategrey: "#778899", navajowhite: "#ffdead", navy: "#000080", mediumvioletred: "#c71585", powderblue: "#b0e0e6", palegoldenrod: "#eee8aa", oldlace: "#fdf5e6", paleturquoise: "#afeeee", mediumturquoise: "#48d1cc", mediumorchid: "#ba55d3", rebeccapurple: "#663399", lightsteelblue: "#b0c4de", mediumslateblue: "#7b68ee", thistle: "#d8bfd8", tan: "#d2b48c", orchid: "#da70d6", mediumpurple: "#9370db", purple: "#800080", pink: "#ffc0cb", skyblue: "#87ceeb", springgreen: "#00ff7f", palegreen: "#98fb98", red: "#ff0000", yellow: "#ffff00", slateblue: "#6a5acd", lavenderblush: "#fff0f5", peru: "#cd853f", palevioletred: "#db7093", violet: "#ee82ee", teal: "#008080", slategray: "#708090", slategrey: "#708090", aliceblue: "#f0f8ff", darkseagreen: "#8fbc8f", darkolivegreen: "#556b2f", greenyellow: "#adff2f", seagreen: "#2e8b57", seashell: "#fff5ee", tomato: "#ff6347", silver: "#c0c0c0", sienna: "#a0522d", lavender: "#e6e6fa", lightgreen: "#90ee90", orange: "#ffa500", orangered: "#ff4500", steelblue: "#4682b4", royalblue: "#4169e1", turquoise: "#40e0d0", yellowgreen: "#9acd32", salmon: "#fa8072", saddlebrown: "#8b4513", sandybrown: "#f4a460", rosybrown: "#bc8f8f", darksalmon: "#e9967a", lightgoldenrodyellow: "#fafad2", snow: "#fffafa", lightgrey: "#d3d3d3", lightgray: "#d3d3d3", dimgray: "#696969", dimgrey: "#696969", olivedrab: "#6b8e23", olive: "#808000" }, s = {};
  for (var i in t) s[t[i]] = i;
  var n = {};
  r.prototype.toName = function(a) {
    if (!(this.rgba.a || this.rgba.r || this.rgba.g || this.rgba.b)) return "transparent";
    var o, h, l = s[this.toHex()];
    if (l) return l;
    if (a?.closest) {
      var c = this.toRgb(), g = 1 / 0, x = "black";
      if (!n.length) for (var b in t) n[b] = new r(t[b]).toRgb();
      for (var F in t) {
        var C = (o = c, h = n[F], Math.pow(o.r - h.r, 2) + Math.pow(o.g - h.g, 2) + Math.pow(o.b - h.b, 2));
        C < g && (g = C, x = F);
      }
      return x;
    }
  }, e.string.push([function(a) {
    var o = a.toLowerCase(), h = o === "transparent" ? "#0000" : t[o];
    return h ? new r(h).toRgb() : null;
  }, "name"]);
}
Io([So]);
const dt = class ir {
  /**
   * @param {PIXI.ColorSource} value - Optional value to use, if not provided, white is used.
   */
  constructor(e = 16777215) {
    this._value = null, this._components = new Float32Array(4), this._components.fill(1), this._int = 16777215, this.value = e;
  }
  /** Get red component (0 - 1) */
  get red() {
    return this._components[0];
  }
  /** Get green component (0 - 1) */
  get green() {
    return this._components[1];
  }
  /** Get blue component (0 - 1) */
  get blue() {
    return this._components[2];
  }
  /** Get alpha component (0 - 1) */
  get alpha() {
    return this._components[3];
  }
  /**
   * Set the value, suitable for chaining
   * @param value
   * @see PIXI.Color.value
   */
  setValue(e) {
    return this.value = e, this;
  }
  /**
   * The current color source.
   *
   * When setting:
   * - Setting to an instance of `Color` will copy its color source and components.
   * - Otherwise, `Color` will try to normalize the color source and set the components.
   *   If the color source is invalid, an `Error` will be thrown and the `Color` will left unchanged.
   *
   * Note: The `null` in the setter's parameter type is added to match the TypeScript rule: return type of getter
   * must be assignable to its setter's parameter type. Setting `value` to `null` will throw an `Error`.
   *
   * When getting:
   * - A return value of `null` means the previous value was overridden (e.g., {@link PIXI.Color.multiply multiply},
   *   {@link PIXI.Color.premultiply premultiply} or {@link PIXI.Color.round round}).
   * - Otherwise, the color source used when setting is returned.
   * @type {PIXI.ColorSource}
   */
  set value(e) {
    if (e instanceof ir)
      this._value = this.cloneSource(e._value), this._int = e._int, this._components.set(e._components);
    else {
      if (e === null)
        throw new Error("Cannot set PIXI.Color#value to null");
      (this._value === null || !this.isSourceEqual(this._value, e)) && (this.normalize(e), this._value = this.cloneSource(e));
    }
  }
  get value() {
    return this._value;
  }
  /**
   * Copy a color source internally.
   * @param value - Color source
   */
  cloneSource(e) {
    return typeof e == "string" || typeof e == "number" || e instanceof Number || e === null ? e : Array.isArray(e) || ArrayBuffer.isView(e) ? e.slice(0) : typeof e == "object" && e !== null ? { ...e } : e;
  }
  /**
   * Equality check for color sources.
   * @param value1 - First color source
   * @param value2 - Second color source
   * @returns `true` if the color sources are equal, `false` otherwise.
   */
  isSourceEqual(e, t) {
    const s = typeof e;
    if (s !== typeof t)
      return !1;
    if (s === "number" || s === "string" || e instanceof Number)
      return e === t;
    if (Array.isArray(e) && Array.isArray(t) || ArrayBuffer.isView(e) && ArrayBuffer.isView(t))
      return e.length !== t.length ? !1 : e.every((i, n) => i === t[n]);
    if (e !== null && t !== null) {
      const i = Object.keys(e), n = Object.keys(t);
      return i.length !== n.length ? !1 : i.every((a) => e[a] === t[a]);
    }
    return e === t;
  }
  /**
   * Convert to a RGBA color object.
   * @example
   * import { Color } from 'pixi.js';
   * new Color('white').toRgb(); // returns { r: 1, g: 1, b: 1, a: 1 }
   */
  toRgba() {
    const [e, t, s, i] = this._components;
    return { r: e, g: t, b: s, a: i };
  }
  /**
   * Convert to a RGB color object.
   * @example
   * import { Color } from 'pixi.js';
   * new Color('white').toRgb(); // returns { r: 1, g: 1, b: 1 }
   */
  toRgb() {
    const [e, t, s] = this._components;
    return { r: e, g: t, b: s };
  }
  /** Convert to a CSS-style rgba string: `rgba(255,255,255,1.0)`. */
  toRgbaString() {
    const [e, t, s] = this.toUint8RgbArray();
    return `rgba(${e},${t},${s},${this.alpha})`;
  }
  toUint8RgbArray(e) {
    const [t, s, i] = this._components;
    return e = e ?? [], e[0] = Math.round(t * 255), e[1] = Math.round(s * 255), e[2] = Math.round(i * 255), e;
  }
  toRgbArray(e) {
    e = e ?? [];
    const [t, s, i] = this._components;
    return e[0] = t, e[1] = s, e[2] = i, e;
  }
  /**
   * Convert to a hexadecimal number.
   * @example
   * import { Color } from 'pixi.js';
   * new Color('white').toNumber(); // returns 16777215
   */
  toNumber() {
    return this._int;
  }
  /**
   * Convert to a hexadecimal number in little endian format (e.g., BBGGRR).
   * @example
   * import { Color } from 'pixi.js';
   * new Color(0xffcc99).toLittleEndianNumber(); // returns 0x99ccff
   * @returns {number} - The color as a number in little endian format.
   */
  toLittleEndianNumber() {
    const e = this._int;
    return (e >> 16) + (e & 65280) + ((e & 255) << 16);
  }
  /**
   * Multiply with another color. This action is destructive, and will
   * override the previous `value` property to be `null`.
   * @param {PIXI.ColorSource} value - The color to multiply by.
   */
  multiply(e) {
    const [t, s, i, n] = ir.temp.setValue(e)._components;
    return this._components[0] *= t, this._components[1] *= s, this._components[2] *= i, this._components[3] *= n, this.refreshInt(), this._value = null, this;
  }
  /**
   * Converts color to a premultiplied alpha format. This action is destructive, and will
   * override the previous `value` property to be `null`.
   * @param alpha - The alpha to multiply by.
   * @param {boolean} [applyToRGB=true] - Whether to premultiply RGB channels.
   * @returns {PIXI.Color} - Itself.
   */
  premultiply(e, t = !0) {
    return t && (this._components[0] *= e, this._components[1] *= e, this._components[2] *= e), this._components[3] = e, this.refreshInt(), this._value = null, this;
  }
  /**
   * Premultiplies alpha with current color.
   * @param {number} alpha - The alpha to multiply by.
   * @param {boolean} [applyToRGB=true] - Whether to premultiply RGB channels.
   * @returns {number} tint multiplied by alpha
   */
  toPremultiplied(e, t = !0) {
    if (e === 1)
      return (255 << 24) + this._int;
    if (e === 0)
      return t ? 0 : this._int;
    let s = this._int >> 16 & 255, i = this._int >> 8 & 255, n = this._int & 255;
    return t && (s = s * e + 0.5 | 0, i = i * e + 0.5 | 0, n = n * e + 0.5 | 0), (e * 255 << 24) + (s << 16) + (i << 8) + n;
  }
  /**
   * Convert to a hexidecimal string.
   * @example
   * import { Color } from 'pixi.js';
   * new Color('white').toHex(); // returns "#ffffff"
   */
  toHex() {
    const e = this._int.toString(16);
    return `#${"000000".substring(0, 6 - e.length) + e}`;
  }
  /**
   * Convert to a hexidecimal string with alpha.
   * @example
   * import { Color } from 'pixi.js';
   * new Color('white').toHexa(); // returns "#ffffffff"
   */
  toHexa() {
    const e = Math.round(this._components[3] * 255).toString(16);
    return this.toHex() + "00".substring(0, 2 - e.length) + e;
  }
  /**
   * Set alpha, suitable for chaining.
   * @param alpha
   */
  setAlpha(e) {
    return this._components[3] = this._clamp(e), this;
  }
  /**
   * Rounds the specified color according to the step. This action is destructive, and will
   * override the previous `value` property to be `null`. The alpha component is not rounded.
   * @param steps - Number of steps which will be used as a cap when rounding colors
   * @deprecated since 7.3.0
   */
  round(e) {
    const [t, s, i] = this._components;
    return this._components[0] = Math.round(t * e) / e, this._components[1] = Math.round(s * e) / e, this._components[2] = Math.round(i * e) / e, this.refreshInt(), this._value = null, this;
  }
  toArray(e) {
    e = e ?? [];
    const [t, s, i, n] = this._components;
    return e[0] = t, e[1] = s, e[2] = i, e[3] = n, e;
  }
  /**
   * Normalize the input value into rgba
   * @param value - Input value
   */
  normalize(e) {
    let t, s, i, n;
    if ((typeof e == "number" || e instanceof Number) && e >= 0 && e <= 16777215) {
      const a = e;
      t = (a >> 16 & 255) / 255, s = (a >> 8 & 255) / 255, i = (a & 255) / 255, n = 1;
    } else if ((Array.isArray(e) || e instanceof Float32Array) && e.length >= 3 && e.length <= 4)
      e = this._clamp(e), [t, s, i, n = 1] = e;
    else if ((e instanceof Uint8Array || e instanceof Uint8ClampedArray) && e.length >= 3 && e.length <= 4)
      e = this._clamp(e, 0, 255), [t, s, i, n = 255] = e, t /= 255, s /= 255, i /= 255, n /= 255;
    else if (typeof e == "string" || typeof e == "object") {
      if (typeof e == "string") {
        const o = ir.HEX_PATTERN.exec(e);
        o && (e = `#${o[2]}`);
      }
      const a = Be(e);
      a.isValid() && ({ r: t, g: s, b: i, a: n } = a.rgba, t /= 255, s /= 255, i /= 255);
    }
    if (t !== void 0)
      this._components[0] = t, this._components[1] = s, this._components[2] = i, this._components[3] = n, this.refreshInt();
    else
      throw new Error(`Unable to convert color ${e}`);
  }
  /** Refresh the internal color rgb number */
  refreshInt() {
    this._clamp(this._components);
    const [e, t, s] = this._components;
    this._int = (e * 255 << 16) + (t * 255 << 8) + (s * 255 | 0);
  }
  /**
   * Clamps values to a range. Will override original values
   * @param value - Value(s) to clamp
   * @param min - Minimum value
   * @param max - Maximum value
   */
  _clamp(e, t = 0, s = 1) {
    return typeof e == "number" ? Math.min(Math.max(e, t), s) : (e.forEach((i, n) => {
      e[n] = Math.min(Math.max(i, t), s);
    }), e);
  }
};
dt.shared = new dt(), /**
* Temporary Color object for static uses internally.
* As to not conflict with Color.shared.
* @ignore
*/
dt.temp = new dt(), /** Pattern for hex strings */
dt.HEX_PATTERN = /^(#|0x)?(([a-f0-9]{3}){1,2}([a-f0-9]{2})?)$/i;
let _r = dt;
function Co() {
  const r = [], e = [];
  for (let s = 0; s < 32; s++)
    r[s] = s, e[s] = s;
  r[Y.NORMAL_NPM] = Y.NORMAL, r[Y.ADD_NPM] = Y.ADD, r[Y.SCREEN_NPM] = Y.SCREEN, e[Y.NORMAL] = Y.NORMAL_NPM, e[Y.ADD] = Y.ADD_NPM, e[Y.SCREEN] = Y.SCREEN_NPM;
  const t = [];
  return t.push(e), t.push(r), t;
}
const No = Co();
function Mn(r) {
  if (r.BYTES_PER_ELEMENT === 4)
    return r instanceof Float32Array ? "Float32Array" : r instanceof Uint32Array ? "Uint32Array" : "Int32Array";
  if (r.BYTES_PER_ELEMENT === 2) {
    if (r instanceof Uint16Array)
      return "Uint16Array";
  } else if (r.BYTES_PER_ELEMENT === 1 && r instanceof Uint8Array)
    return "Uint8Array";
  return null;
}
function cr(r) {
  return r += r === 0 ? 1 : 0, --r, r |= r >>> 1, r |= r >>> 2, r |= r >>> 4, r |= r >>> 8, r |= r >>> 16, r + 1;
}
function un(r) {
  return !(r & r - 1) && !!r;
}
function cn(r) {
  let e = (r > 65535 ? 1 : 0) << 4;
  r >>>= e;
  let t = (r > 255 ? 1 : 0) << 3;
  return r >>>= t, e |= t, t = (r > 15 ? 1 : 0) << 2, r >>>= t, e |= t, t = (r > 3 ? 1 : 0) << 1, r >>>= t, e |= t, e | r >> 1;
}
function Fo(r, e, t) {
  const s = r.length;
  let i;
  if (e >= s || t === 0)
    return;
  t = e + t > s ? s - e : t;
  const n = s - t;
  for (i = e; i < n; ++i)
    r[i] = r[i + t];
  r.length = n;
}
let Po = 0;
function kt() {
  return ++Po;
}
const dn = {}, Me = /* @__PURE__ */ Object.create(null), je = /* @__PURE__ */ Object.create(null);
function Oo(r, e = globalThis.location) {
  if (r.startsWith("data:"))
    return "";
  e = e || globalThis.location;
  const t = new URL(r, document.baseURI);
  return t.hostname !== e.hostname || t.port !== e.port || t.protocol !== e.protocol ? "anonymous" : "";
}
function Gt(r, e = 1) {
  const t = J.RETINA_PREFIX?.exec(r);
  return t ? parseFloat(t[1]) : e;
}
class Bo {
  constructor(e) {
    typeof e == "number" ? this.rawBinaryData = new ArrayBuffer(e) : e instanceof Uint8Array ? this.rawBinaryData = e.buffer : this.rawBinaryData = e, this.uint32View = new Uint32Array(this.rawBinaryData), this.float32View = new Float32Array(this.rawBinaryData);
  }
  /** View on the raw binary data as a `Int8Array`. */
  get int8View() {
    return this._int8View || (this._int8View = new Int8Array(this.rawBinaryData)), this._int8View;
  }
  /** View on the raw binary data as a `Uint8Array`. */
  get uint8View() {
    return this._uint8View || (this._uint8View = new Uint8Array(this.rawBinaryData)), this._uint8View;
  }
  /**  View on the raw binary data as a `Int16Array`. */
  get int16View() {
    return this._int16View || (this._int16View = new Int16Array(this.rawBinaryData)), this._int16View;
  }
  /** View on the raw binary data as a `Uint16Array`. */
  get uint16View() {
    return this._uint16View || (this._uint16View = new Uint16Array(this.rawBinaryData)), this._uint16View;
  }
  /** View on the raw binary data as a `Int32Array`. */
  get int32View() {
    return this._int32View || (this._int32View = new Int32Array(this.rawBinaryData)), this._int32View;
  }
  /**
   * Returns the view of the given type.
   * @param type - One of `int8`, `uint8`, `int16`,
   *    `uint16`, `int32`, `uint32`, and `float32`.
   * @returns - typed array of given type
   */
  view(e) {
    return this[`${e}View`];
  }
  /** Destroys all buffer references. Do not use after calling this. */
  destroy() {
    this.rawBinaryData = null, this._int8View = null, this._uint8View = null, this._int16View = null, this._uint16View = null, this._int32View = null, this.uint32View = null, this.float32View = null;
  }
  static sizeOf(e) {
    switch (e) {
      case "int8":
      case "uint8":
        return 1;
      case "int16":
      case "uint16":
        return 2;
      case "int32":
      case "uint32":
      case "float32":
        return 4;
      default:
        throw new Error(`${e} isn't a valid view type`);
    }
  }
}
const Mo = [
  "precision mediump float;",
  "void main(void){",
  "float test = 0.1;",
  "%forloop%",
  "gl_FragColor = vec4(0.0);",
  "}"
].join(`
`);
function Uo(r) {
  let e = "";
  for (let t = 0; t < r; ++t)
    t > 0 && (e += `
else `), t < r - 1 && (e += `if(test == ${t}.0){}`);
  return e;
}
function Lo(r, e) {
  if (r === 0)
    throw new Error("Invalid value of `0` passed to `checkMaxIfStatementsInShader`");
  const t = e.createShader(e.FRAGMENT_SHADER);
  for (; ; ) {
    const s = Mo.replace(/%forloop%/gi, Uo(r));
    if (e.shaderSource(t, s), e.compileShader(t), !e.getShaderParameter(t, e.COMPILE_STATUS))
      r = r / 2 | 0;
    else
      break;
  }
  return r;
}
const ms = 0, ys = 1, gs = 2, vs = 3, _s = 4, As = 5;
class Tt {
  constructor() {
    this.data = 0, this.blendMode = Y.NORMAL, this.polygonOffset = 0, this.blend = !0, this.depthMask = !0;
  }
  /**
   * Activates blending of the computed fragment color values.
   * @default true
   */
  get blend() {
    return !!(this.data & 1 << ms);
  }
  set blend(e) {
    !!(this.data & 1 << ms) !== e && (this.data ^= 1 << ms);
  }
  /**
   * Activates adding an offset to depth values of polygon's fragments
   * @default false
   */
  get offsets() {
    return !!(this.data & 1 << ys);
  }
  set offsets(e) {
    !!(this.data & 1 << ys) !== e && (this.data ^= 1 << ys);
  }
  /**
   * Activates culling of polygons.
   * @default false
   */
  get culling() {
    return !!(this.data & 1 << gs);
  }
  set culling(e) {
    !!(this.data & 1 << gs) !== e && (this.data ^= 1 << gs);
  }
  /**
   * Activates depth comparisons and updates to the depth buffer.
   * @default false
   */
  get depthTest() {
    return !!(this.data & 1 << vs);
  }
  set depthTest(e) {
    !!(this.data & 1 << vs) !== e && (this.data ^= 1 << vs);
  }
  /**
   * Enables or disables writing to the depth buffer.
   * @default true
   */
  get depthMask() {
    return !!(this.data & 1 << As);
  }
  set depthMask(e) {
    !!(this.data & 1 << As) !== e && (this.data ^= 1 << As);
  }
  /**
   * Specifies whether or not front or back-facing polygons can be culled.
   * @default false
   */
  get clockwiseFrontFace() {
    return !!(this.data & 1 << _s);
  }
  set clockwiseFrontFace(e) {
    !!(this.data & 1 << _s) !== e && (this.data ^= 1 << _s);
  }
  /**
   * The blend mode to be applied when this state is set. Apply a value of `PIXI.BLEND_MODES.NORMAL` to reset the blend mode.
   * Setting this mode to anything other than NO_BLEND will automatically switch blending on.
   * @default PIXI.BLEND_MODES.NORMAL
   */
  get blendMode() {
    return this._blendMode;
  }
  set blendMode(e) {
    this.blend = e !== Y.NONE, this._blendMode = e;
  }
  /**
   * The polygon offset. Setting this property to anything other than 0 will automatically enable polygon offset fill.
   * @default 0
   */
  get polygonOffset() {
    return this._polygonOffset;
  }
  set polygonOffset(e) {
    this.offsets = !!e, this._polygonOffset = e;
  }
  static for2d() {
    const e = new Tt();
    return e.depthTest = !1, e.blend = !0, e;
  }
}
Tt.prototype.toString = function() {
  return `[@pixi/core:State blendMode=${this.blendMode} clockwiseFrontFace=${this.clockwiseFrontFace} culling=${this.culling} depthMask=${this.depthMask} polygonOffset=${this.polygonOffset}]`;
};
const Ns = [];
function Un(r, e) {
  if (!r)
    return null;
  let t = "";
  if (typeof r == "string") {
    const s = /\.(\w{3,4})(?:$|\?|#)/i.exec(r);
    s && (t = s[1].toLowerCase());
  }
  for (let s = Ns.length - 1; s >= 0; --s) {
    const i = Ns[s];
    if (i.test && i.test(r, t))
      return new i(r, e);
  }
  throw new Error("Unrecognized source type to auto-detect Resource");
}
class Oe {
  /**
   * @param {string} name - The function name that will be executed on the listeners added to this Runner.
   */
  constructor(e) {
    this.items = [], this._name = e, this._aliasCount = 0;
  }
  /* eslint-disable jsdoc/require-param, jsdoc/check-param-names */
  /**
   * Dispatch/Broadcast Runner to all listeners added to the queue.
   * @param {...any} params - (optional) parameters to pass to each listener
   */
  /*  eslint-enable jsdoc/require-param, jsdoc/check-param-names */
  emit(e, t, s, i, n, a, o, h) {
    if (arguments.length > 8)
      throw new Error("max arguments reached");
    const { name: l, items: c } = this;
    this._aliasCount++;
    for (let g = 0, x = c.length; g < x; g++)
      c[g][l](e, t, s, i, n, a, o, h);
    return c === this.items && this._aliasCount--, this;
  }
  ensureNonAliasedItems() {
    this._aliasCount > 0 && this.items.length > 1 && (this._aliasCount = 0, this.items = this.items.slice(0));
  }
  /**
   * Add a listener to the Runner
   *
   * Runners do not need to have scope or functions passed to them.
   * All that is required is to pass the listening object and ensure that it has contains a function that has the same name
   * as the name provided to the Runner when it was created.
   *
   * E.g. A listener passed to this Runner will require a 'complete' function.
   *
   * ```js
   * import { Runner } from '@pixi/runner';
   *
   * const complete = new Runner('complete');
   * ```
   *
   * The scope used will be the object itself.
   * @param {any} item - The object that will be listening.
   */
  add(e) {
    return e[this._name] && (this.ensureNonAliasedItems(), this.remove(e), this.items.push(e)), this;
  }
  /**
   * Remove a single listener from the dispatch queue.
   * @param {any} item - The listener that you would like to remove.
   */
  remove(e) {
    const t = this.items.indexOf(e);
    return t !== -1 && (this.ensureNonAliasedItems(), this.items.splice(t, 1)), this;
  }
  /**
   * Check to see if the listener is already in the Runner
   * @param {any} item - The listener that you would like to check.
   */
  contains(e) {
    return this.items.includes(e);
  }
  /** Remove all listeners from the Runner */
  removeAll() {
    return this.ensureNonAliasedItems(), this.items.length = 0, this;
  }
  /** Remove all references, don't use after this. */
  destroy() {
    this.removeAll(), this.items.length = 0, this._name = "";
  }
  /**
   * `true` if there are no this Runner contains no listeners
   * @readonly
   */
  get empty() {
    return this.items.length === 0;
  }
  /**
   * The name of the runner.
   * @type {string}
   */
  get name() {
    return this._name;
  }
}
Object.defineProperties(Oe.prototype, {
  /**
   * Alias for `emit`
   * @memberof PIXI.Runner#
   * @method dispatch
   * @see PIXI.Runner#emit
   */
  dispatch: { value: Oe.prototype.emit },
  /**
   * Alias for `emit`
   * @memberof PIXI.Runner#
   * @method run
   * @see PIXI.Runner#emit
   */
  run: { value: Oe.prototype.emit }
});
class Dt {
  /**
   * @param width - Width of the resource
   * @param height - Height of the resource
   */
  constructor(e = 0, t = 0) {
    this._width = e, this._height = t, this.destroyed = !1, this.internal = !1, this.onResize = new Oe("setRealSize"), this.onUpdate = new Oe("update"), this.onError = new Oe("onError");
  }
  /**
   * Bind to a parent BaseTexture
   * @param baseTexture - Parent texture
   */
  bind(e) {
    this.onResize.add(e), this.onUpdate.add(e), this.onError.add(e), (this._width || this._height) && this.onResize.emit(this._width, this._height);
  }
  /**
   * Unbind to a parent BaseTexture
   * @param baseTexture - Parent texture
   */
  unbind(e) {
    this.onResize.remove(e), this.onUpdate.remove(e), this.onError.remove(e);
  }
  /**
   * Trigger a resize event
   * @param width - X dimension
   * @param height - Y dimension
   */
  resize(e, t) {
    (e !== this._width || t !== this._height) && (this._width = e, this._height = t, this.onResize.emit(e, t));
  }
  /**
   * Has been validated
   * @readonly
   */
  get valid() {
    return !!this._width && !!this._height;
  }
  /** Has been updated trigger event. */
  update() {
    this.destroyed || this.onUpdate.emit();
  }
  /**
   * This can be overridden to start preloading a resource
   * or do any other prepare step.
   * @protected
   * @returns Handle the validate event
   */
  load() {
    return Promise.resolve(this);
  }
  /**
   * The width of the resource.
   * @readonly
   */
  get width() {
    return this._width;
  }
  /**
   * The height of the resource.
   * @readonly
   */
  get height() {
    return this._height;
  }
  /**
   * Set the style, optional to override
   * @param _renderer - yeah, renderer!
   * @param _baseTexture - the texture
   * @param _glTexture - texture instance for this webgl context
   * @returns - `true` is success
   */
  style(e, t, s) {
    return !1;
  }
  /** Clean up anything, this happens when destroying is ready. */
  dispose() {
  }
  /**
   * Call when destroying resource, unbind any BaseTexture object
   * before calling this method, as reference counts are maintained
   * internally.
   */
  destroy() {
    this.destroyed || (this.destroyed = !0, this.dispose(), this.onError.removeAll(), this.onError = null, this.onResize.removeAll(), this.onResize = null, this.onUpdate.removeAll(), this.onUpdate = null);
  }
  /**
   * Abstract, used to auto-detect resource type.
   * @param {*} _source - The source object
   * @param {string} _extension - The extension of source, if set
   */
  static test(e, t) {
    return !1;
  }
}
class Ln extends Dt {
  /**
   * @param source - Source buffer
   * @param options - Options
   * @param {number} options.width - Width of the texture
   * @param {number} options.height - Height of the texture
   * @param {1|2|4|8} [options.unpackAlignment=4] - The alignment of the pixel rows.
   */
  constructor(e, t) {
    const { width: s, height: i } = t || {};
    if (!s || !i)
      throw new Error("BufferResource width or height invalid");
    super(s, i), this.data = e, this.unpackAlignment = t.unpackAlignment ?? 4;
  }
  /**
   * Upload the texture to the GPU.
   * @param renderer - Upload to the renderer
   * @param baseTexture - Reference to parent texture
   * @param glTexture - glTexture
   * @returns - true is success
   */
  upload(e, t, s) {
    const i = e.gl;
    i.pixelStorei(i.UNPACK_ALIGNMENT, this.unpackAlignment), i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL, t.alphaMode === Pe.UNPACK);
    const n = t.realWidth, a = t.realHeight;
    return s.width === n && s.height === a ? i.texSubImage2D(
      t.target,
      0,
      0,
      0,
      n,
      a,
      t.format,
      s.type,
      this.data
    ) : (s.width = n, s.height = a, i.texImage2D(
      t.target,
      0,
      s.internalFormat,
      n,
      a,
      0,
      t.format,
      s.type,
      this.data
    )), !0;
  }
  /** Destroy and don't use after this. */
  dispose() {
    this.data = null;
  }
  /**
   * Used to auto-detect the type of resource.
   * @param {*} source - The source object
   * @returns {boolean} `true` if buffer source
   */
  static test(e) {
    return e === null || e instanceof Int8Array || e instanceof Uint8Array || e instanceof Uint8ClampedArray || e instanceof Int16Array || e instanceof Uint16Array || e instanceof Int32Array || e instanceof Uint32Array || e instanceof Float32Array;
  }
}
const ko = {
  scaleMode: De.NEAREST,
  alphaMode: Pe.NPM
}, Fs = class ft extends Xs {
  /**
   * @param {PIXI.Resource|PIXI.ImageSource|string} [resource=null] -
   *        The current resource to use, for things that aren't Resource objects, will be converted
   *        into a Resource.
   * @param options - Collection of options, default options inherited from {@link PIXI.BaseTexture.defaultOptions}.
   * @param {PIXI.MIPMAP_MODES} [options.mipmap] - If mipmapping is enabled for texture
   * @param {number} [options.anisotropicLevel] - Anisotropic filtering level of texture
   * @param {PIXI.WRAP_MODES} [options.wrapMode] - Wrap mode for textures
   * @param {PIXI.SCALE_MODES} [options.scaleMode] - Default scale mode, linear, nearest
   * @param {PIXI.FORMATS} [options.format] - GL format type
   * @param {PIXI.TYPES} [options.type] - GL data type
   * @param {PIXI.TARGETS} [options.target] - GL texture target
   * @param {PIXI.ALPHA_MODES} [options.alphaMode] - Pre multiply the image alpha
   * @param {number} [options.width=0] - Width of the texture
   * @param {number} [options.height=0] - Height of the texture
   * @param {number} [options.resolution=PIXI.settings.RESOLUTION] - Resolution of the base texture
   * @param {object} [options.resourceOptions] - Optional resource options,
   *        see {@link PIXI.autoDetectResource autoDetectResource}
   */
  constructor(e = null, t = null) {
    super(), t = Object.assign({}, ft.defaultOptions, t);
    const {
      alphaMode: s,
      mipmap: i,
      anisotropicLevel: n,
      scaleMode: a,
      width: o,
      height: h,
      wrapMode: l,
      format: c,
      type: g,
      target: x,
      resolution: b,
      resourceOptions: F
    } = t;
    e && !(e instanceof Dt) && (e = Un(e, F), e.internal = !0), this.resolution = b || J.RESOLUTION, this.width = Math.round((o || 0) * this.resolution) / this.resolution, this.height = Math.round((h || 0) * this.resolution) / this.resolution, this._mipmap = i, this.anisotropicLevel = n, this._wrapMode = l, this._scaleMode = a, this.format = c, this.type = g, this.target = x, this.alphaMode = s, this.uid = kt(), this.touched = 0, this.isPowerOfTwo = !1, this._refreshPOT(), this._glTextures = {}, this.dirtyId = 0, this.dirtyStyleId = 0, this.cacheId = null, this.valid = o > 0 && h > 0, this.textureCacheIds = [], this.destroyed = !1, this.resource = null, this._batchEnabled = 0, this._batchLocation = 0, this.parentTextureArray = null, this.setResource(e);
  }
  /**
   * Pixel width of the source of this texture
   * @readonly
   */
  get realWidth() {
    return Math.round(this.width * this.resolution);
  }
  /**
   * Pixel height of the source of this texture
   * @readonly
   */
  get realHeight() {
    return Math.round(this.height * this.resolution);
  }
  /**
   * Mipmap mode of the texture, affects downscaled images
   * @default PIXI.MIPMAP_MODES.POW2
   */
  get mipmap() {
    return this._mipmap;
  }
  set mipmap(e) {
    this._mipmap !== e && (this._mipmap = e, this.dirtyStyleId++);
  }
  /**
   * The scale mode to apply when scaling this texture
   * @default PIXI.SCALE_MODES.LINEAR
   */
  get scaleMode() {
    return this._scaleMode;
  }
  set scaleMode(e) {
    this._scaleMode !== e && (this._scaleMode = e, this.dirtyStyleId++);
  }
  /**
   * How the texture wraps
   * @default PIXI.WRAP_MODES.CLAMP
   */
  get wrapMode() {
    return this._wrapMode;
  }
  set wrapMode(e) {
    this._wrapMode !== e && (this._wrapMode = e, this.dirtyStyleId++);
  }
  /**
   * Changes style options of BaseTexture
   * @param scaleMode - Pixi scalemode
   * @param mipmap - enable mipmaps
   * @returns - this
   */
  setStyle(e, t) {
    let s;
    return e !== void 0 && e !== this.scaleMode && (this.scaleMode = e, s = !0), t !== void 0 && t !== this.mipmap && (this.mipmap = t, s = !0), s && this.dirtyStyleId++, this;
  }
  /**
   * Changes w/h/resolution. Texture becomes valid if width and height are greater than zero.
   * @param desiredWidth - Desired visual width
   * @param desiredHeight - Desired visual height
   * @param resolution - Optionally set resolution
   * @returns - this
   */
  setSize(e, t, s) {
    return s = s || this.resolution, this.setRealSize(e * s, t * s, s);
  }
  /**
   * Sets real size of baseTexture, preserves current resolution.
   * @param realWidth - Full rendered width
   * @param realHeight - Full rendered height
   * @param resolution - Optionally set resolution
   * @returns - this
   */
  setRealSize(e, t, s) {
    return this.resolution = s || this.resolution, this.width = Math.round(e) / this.resolution, this.height = Math.round(t) / this.resolution, this._refreshPOT(), this.update(), this;
  }
  /**
   * Refresh check for isPowerOfTwo texture based on size
   * @private
   */
  _refreshPOT() {
    this.isPowerOfTwo = un(this.realWidth) && un(this.realHeight);
  }
  /**
   * Changes resolution
   * @param resolution - res
   * @returns - this
   */
  setResolution(e) {
    const t = this.resolution;
    return t === e ? this : (this.resolution = e, this.valid && (this.width = Math.round(this.width * t) / e, this.height = Math.round(this.height * t) / e, this.emit("update", this)), this._refreshPOT(), this);
  }
  /**
   * Sets the resource if it wasn't set. Throws error if resource already present
   * @param resource - that is managing this BaseTexture
   * @returns - this
   */
  setResource(e) {
    if (this.resource === e)
      return this;
    if (this.resource)
      throw new Error("Resource can be set only once");
    return e.bind(this), this.resource = e, this;
  }
  /** Invalidates the object. Texture becomes valid if width and height are greater than zero. */
  update() {
    this.valid ? (this.dirtyId++, this.dirtyStyleId++, this.emit("update", this)) : this.width > 0 && this.height > 0 && (this.valid = !0, this.emit("loaded", this), this.emit("update", this));
  }
  /**
   * Handle errors with resources.
   * @private
   * @param event - Error event emitted.
   */
  onError(e) {
    this.emit("error", this, e);
  }
  /**
   * Destroys this base texture.
   * The method stops if resource doesn't want this texture to be destroyed.
   * Removes texture from all caches.
   * @fires PIXI.BaseTexture#destroyed
   */
  destroy() {
    this.resource && (this.resource.unbind(this), this.resource.internal && this.resource.destroy(), this.resource = null), this.cacheId && (delete je[this.cacheId], delete Me[this.cacheId], this.cacheId = null), this.valid = !1, this.dispose(), ft.removeFromCache(this), this.textureCacheIds = null, this.destroyed = !0, this.emit("destroyed", this), this.removeAllListeners();
  }
  /**
   * Frees the texture from WebGL memory without destroying this texture object.
   * This means you can still use the texture later which will upload it to GPU
   * memory again.
   * @fires PIXI.BaseTexture#dispose
   */
  dispose() {
    this.emit("dispose", this);
  }
  /** Utility function for BaseTexture|Texture cast. */
  castToBaseTexture() {
    return this;
  }
  /**
   * Helper function that creates a base texture based on the source you provide.
   * The source can be - image url, image element, canvas element. If the
   * source is an image url or an image element and not in the base texture
   * cache, it will be created and loaded.
   * @static
   * @param {PIXI.ImageSource|string|string[]} source - The
   *        source to create base texture from.
   * @param options - See {@link PIXI.BaseTexture}'s constructor for options.
   * @param {string} [options.pixiIdPrefix=pixiid] - If a source has no id, this is the prefix of the generated id
   * @param {boolean} [strict] - Enforce strict-mode, see {@link PIXI.settings.STRICT_TEXTURE_CACHE}.
   * @returns {PIXI.BaseTexture} The new base texture.
   */
  static from(e, t, s = J.STRICT_TEXTURE_CACHE) {
    const i = typeof e == "string";
    let n = null;
    if (i)
      n = e;
    else {
      if (!e._pixiId) {
        const o = t?.pixiIdPrefix || "pixiid";
        e._pixiId = `${o}_${kt()}`;
      }
      n = e._pixiId;
    }
    let a = je[n];
    if (i && s && !a)
      throw new Error(`The cacheId "${n}" does not exist in BaseTextureCache.`);
    return a || (a = new ft(e, t), a.cacheId = n, ft.addToCache(a, n)), a;
  }
  /**
   * Create a new Texture with a BufferResource from a typed array.
   * @param buffer - The optional array to use. If no data is provided, a new Float32Array is created.
   * @param width - Width of the resource
   * @param height - Height of the resource
   * @param options - See {@link PIXI.BaseTexture}'s constructor for options.
   *        Default properties are different from the constructor's defaults.
   * @param {PIXI.FORMATS} [options.format] - The format is not given, the type is inferred from the
   *        type of the buffer: `RGBA` if Float32Array, Int8Array, Uint8Array, or Uint8ClampedArray,
   *        otherwise `RGBA_INTEGER`.
   * @param {PIXI.TYPES} [options.type] - The type is not given, the type is inferred from the
   *        type of the buffer. Maps Float32Array to `FLOAT`, Int32Array to `INT`, Uint32Array to
   *        `UNSIGNED_INT`, Int16Array to `SHORT`, Uint16Array to `UNSIGNED_SHORT`, Int8Array to `BYTE`,
   *        Uint8Array/Uint8ClampedArray to `UNSIGNED_BYTE`.
   * @param {PIXI.ALPHA_MODES} [options.alphaMode=PIXI.ALPHA_MODES.NPM]
   * @param {PIXI.SCALE_MODES} [options.scaleMode=PIXI.SCALE_MODES.NEAREST]
   * @returns - The resulting new BaseTexture
   */
  static fromBuffer(e, t, s, i) {
    e = e || new Float32Array(t * s * 4);
    const n = new Ln(e, { width: t, height: s, ...i?.resourceOptions });
    let a, o;
    return e instanceof Float32Array ? (a = L.RGBA, o = se.FLOAT) : e instanceof Int32Array ? (a = L.RGBA_INTEGER, o = se.INT) : e instanceof Uint32Array ? (a = L.RGBA_INTEGER, o = se.UNSIGNED_INT) : e instanceof Int16Array ? (a = L.RGBA_INTEGER, o = se.SHORT) : e instanceof Uint16Array ? (a = L.RGBA_INTEGER, o = se.UNSIGNED_SHORT) : e instanceof Int8Array ? (a = L.RGBA, o = se.BYTE) : (a = L.RGBA, o = se.UNSIGNED_BYTE), n.internal = !0, new ft(n, Object.assign({}, ko, { type: o, format: a }, i));
  }
  /**
   * Adds a BaseTexture to the global BaseTextureCache. This cache is shared across the whole PIXI object.
   * @param {PIXI.BaseTexture} baseTexture - The BaseTexture to add to the cache.
   * @param {string} id - The id that the BaseTexture will be stored against.
   */
  static addToCache(e, t) {
    t && (e.textureCacheIds.includes(t) || e.textureCacheIds.push(t), je[t] && je[t] !== e && console.warn(`BaseTexture added to the cache with an id [${t}] that already had an entry`), je[t] = e);
  }
  /**
   * Remove a BaseTexture from the global BaseTextureCache.
   * @param {string|PIXI.BaseTexture} baseTexture - id of a BaseTexture to be removed, or a BaseTexture instance itself.
   * @returns {PIXI.BaseTexture|null} The BaseTexture that was removed.
   */
  static removeFromCache(e) {
    if (typeof e == "string") {
      const t = je[e];
      if (t) {
        const s = t.textureCacheIds.indexOf(e);
        return s > -1 && t.textureCacheIds.splice(s, 1), delete je[e], t;
      }
    } else if (e?.textureCacheIds) {
      for (let t = 0; t < e.textureCacheIds.length; ++t)
        delete je[e.textureCacheIds[t]];
      return e.textureCacheIds.length = 0, e;
    }
    return null;
  }
};
Fs.defaultOptions = {
  /**
   * If mipmapping is enabled for texture.
   * @type {PIXI.MIPMAP_MODES}
   * @default PIXI.MIPMAP_MODES.POW2
   */
  mipmap: at.POW2,
  /** Anisotropic filtering level of texture */
  anisotropicLevel: 0,
  /**
   * Default scale mode, linear, nearest.
   * @type {PIXI.SCALE_MODES}
   * @default PIXI.SCALE_MODES.LINEAR
   */
  scaleMode: De.LINEAR,
  /**
   * Wrap mode for textures.
   * @type {PIXI.WRAP_MODES}
   * @default PIXI.WRAP_MODES.CLAMP
   */
  wrapMode: Ws.CLAMP,
  /**
   * Pre multiply the image alpha
   * @type {PIXI.ALPHA_MODES}
   * @default PIXI.ALPHA_MODES.UNPACK
   */
  alphaMode: Pe.UNPACK,
  /**
   * GL texture target
   * @type {PIXI.TARGETS}
   * @default PIXI.TARGETS.TEXTURE_2D
   */
  target: vt.TEXTURE_2D,
  /**
   * GL format type
   * @type {PIXI.FORMATS}
   * @default PIXI.FORMATS.RGBA
   */
  format: L.RGBA,
  /**
   * GL data type
   * @type {PIXI.TYPES}
   * @default PIXI.TYPES.UNSIGNED_BYTE
   */
  type: se.UNSIGNED_BYTE
}, /** Global number of the texture batch, used by multi-texture renderers. */
Fs._globalBatch = 0;
let he = Fs;
class Go {
  constructor() {
    this.texArray = null, this.blend = 0, this.type = ur.TRIANGLES, this.start = 0, this.size = 0, this.data = null;
  }
}
let Do = 0;
class xe {
  /**
   * @param {PIXI.IArrayBuffer} data - the data to store in the buffer.
   * @param _static - `true` for static buffer
   * @param index - `true` for index buffer
   */
  constructor(e, t = !0, s = !1) {
    this.data = e || new Float32Array(1), this._glBuffers = {}, this._updateID = 0, this.index = s, this.static = t, this.id = Do++, this.disposeRunner = new Oe("disposeBuffer");
  }
  // TODO could explore flagging only a partial upload?
  /**
   * Flags this buffer as requiring an upload to the GPU.
   * @param {PIXI.IArrayBuffer|number[]} [data] - the data to update in the buffer.
   */
  update(e) {
    e instanceof Array && (e = new Float32Array(e)), this.data = e || this.data, this._updateID++;
  }
  /** Disposes WebGL resources that are connected to this geometry. */
  dispose() {
    this.disposeRunner.emit(this, !1);
  }
  /** Destroys the buffer. */
  destroy() {
    this.dispose(), this.data = null;
  }
  /**
   * Flags whether this is an index buffer.
   *
   * Index buffers are of type `ELEMENT_ARRAY_BUFFER`. Note that setting this property to false will make
   * the buffer of type `ARRAY_BUFFER`.
   *
   * For backwards compatibility.
   */
  set index(e) {
    this.type = e ? Ue.ELEMENT_ARRAY_BUFFER : Ue.ARRAY_BUFFER;
  }
  get index() {
    return this.type === Ue.ELEMENT_ARRAY_BUFFER;
  }
  /**
   * Helper function that creates a buffer based on an array or TypedArray
   * @param {ArrayBufferView | number[]} data - the TypedArray that the buffer will store. If this is a regular Array it will be converted to a Float32Array.
   * @returns - A new Buffer based on the data provided.
   */
  static from(e) {
    return e instanceof Array && (e = new Float32Array(e)), new xe(e);
  }
}
class dr {
  /**
   * @param buffer - the id of the buffer that this attribute will look for
   * @param size - the size of the attribute. If you have 2 floats per vertex (eg position x and y) this would be 2.
   * @param normalized - should the data be normalized.
   * @param {PIXI.TYPES} [type=PIXI.TYPES.FLOAT] - what type of number is the attribute. Check {@link PIXI.TYPES} to see the ones available
   * @param [stride=0] - How far apart, in bytes, the start of each value is. (used for interleaving data)
   * @param [start=0] - How far into the array to start reading values (used for interleaving data)
   * @param [instance=false] - Whether the geometry is instanced.
   * @param [divisor=1] - Divisor to use when doing instanced rendering
   */
  constructor(e, t = 0, s = !1, i = se.FLOAT, n, a, o, h = 1) {
    this.buffer = e, this.size = t, this.normalized = s, this.type = i, this.stride = n, this.start = a, this.instance = o, this.divisor = h;
  }
  /** Destroys the Attribute. */
  destroy() {
    this.buffer = null;
  }
  /**
   * Helper function that creates an Attribute based on the information provided
   * @param buffer - the id of the buffer that this attribute will look for
   * @param [size=0] - the size of the attribute. If you have 2 floats per vertex (eg position x and y) this would be 2
   * @param [normalized=false] - should the data be normalized.
   * @param [type=PIXI.TYPES.FLOAT] - what type of number is the attribute. Check {@link PIXI.TYPES} to see the ones available
   * @param [stride=0] - How far apart, in bytes, the start of each value is. (used for interleaving data)
   * @returns - A new {@link PIXI.Attribute} based on the information provided
   */
  static from(e, t, s, i, n) {
    return new dr(e, t, s, i, n);
  }
}
const $o = {
  Float32Array,
  Uint32Array,
  Int32Array,
  Uint8Array
};
function Ho(r, e) {
  let t = 0, s = 0;
  const i = {};
  for (let h = 0; h < r.length; h++)
    s += e[h], t += r[h].length;
  const n = new ArrayBuffer(t * 4);
  let a = null, o = 0;
  for (let h = 0; h < r.length; h++) {
    const l = e[h], c = r[h], g = Mn(c);
    i[g] || (i[g] = new $o[g](n)), a = i[g];
    for (let x = 0; x < c.length; x++) {
      const b = (x / l | 0) * s + o, F = x % l;
      a[b + F] = c[x];
    }
    o += l;
  }
  return new Float32Array(n);
}
const fn = { 5126: 4, 5123: 2, 5121: 1 };
let Vo = 0;
const Wo = {
  Float32Array,
  Uint32Array,
  Int32Array,
  Uint8Array,
  Uint16Array
};
class bt {
  /**
   * @param buffers - An array of buffers. optional.
   * @param attributes - Of the geometry, optional structure of the attributes layout
   */
  constructor(e = [], t = {}) {
    this.buffers = e, this.indexBuffer = null, this.attributes = t, this.glVertexArrayObjects = {}, this.id = Vo++, this.instanced = !1, this.instanceCount = 1, this.disposeRunner = new Oe("disposeGeometry"), this.refCount = 0;
  }
  /**
   *
   * Adds an attribute to the geometry
   * Note: `stride` and `start` should be `undefined` if you dont know them, not 0!
   * @param id - the name of the attribute (matching up to a shader)
   * @param {PIXI.Buffer|number[]} buffer - the buffer that holds the data of the attribute . You can also provide an Array and a buffer will be created from it.
   * @param size - the size of the attribute. If you have 2 floats per vertex (eg position x and y) this would be 2
   * @param normalized - should the data be normalized.
   * @param [type=PIXI.TYPES.FLOAT] - what type of number is the attribute. Check {@link PIXI.TYPES} to see the ones available
   * @param [stride=0] - How far apart, in bytes, the start of each value is. (used for interleaving data)
   * @param [start=0] - How far into the array to start reading values (used for interleaving data)
   * @param instance - Instancing flag
   * @returns - Returns self, useful for chaining.
   */
  addAttribute(e, t, s = 0, i = !1, n, a, o, h = !1) {
    if (!t)
      throw new Error("You must pass a buffer when creating an attribute");
    t instanceof xe || (t instanceof Array && (t = new Float32Array(t)), t = new xe(t));
    const l = e.split("|");
    if (l.length > 1) {
      for (let g = 0; g < l.length; g++)
        this.addAttribute(l[g], t, s, i, n);
      return this;
    }
    let c = this.buffers.indexOf(t);
    return c === -1 && (this.buffers.push(t), c = this.buffers.length - 1), this.attributes[e] = new dr(c, s, i, n, a, o, h), this.instanced = this.instanced || h, this;
  }
  /**
   * Returns the requested attribute.
   * @param id - The name of the attribute required
   * @returns - The attribute requested.
   */
  getAttribute(e) {
    return this.attributes[e];
  }
  /**
   * Returns the requested buffer.
   * @param id - The name of the buffer required.
   * @returns - The buffer requested.
   */
  getBuffer(e) {
    return this.buffers[this.getAttribute(e).buffer];
  }
  /**
   *
   * Adds an index buffer to the geometry
   * The index buffer contains integers, three for each triangle in the geometry, which reference the various attribute buffers (position, colour, UV coordinates, other UV coordinates, normal, …). There is only ONE index buffer.
   * @param {PIXI.Buffer|number[]} [buffer] - The buffer that holds the data of the index buffer. You can also provide an Array and a buffer will be created from it.
   * @returns - Returns self, useful for chaining.
   */
  addIndex(e) {
    return e instanceof xe || (e instanceof Array && (e = new Uint16Array(e)), e = new xe(e)), e.type = Ue.ELEMENT_ARRAY_BUFFER, this.indexBuffer = e, this.buffers.includes(e) || this.buffers.push(e), this;
  }
  /**
   * Returns the index buffer
   * @returns - The index buffer.
   */
  getIndex() {
    return this.indexBuffer;
  }
  /**
   * This function modifies the structure so that all current attributes become interleaved into a single buffer
   * This can be useful if your model remains static as it offers a little performance boost
   * @returns - Returns self, useful for chaining.
   */
  interleave() {
    if (this.buffers.length === 1 || this.buffers.length === 2 && this.indexBuffer)
      return this;
    const e = [], t = [], s = new xe();
    let i;
    for (i in this.attributes) {
      const n = this.attributes[i], a = this.buffers[n.buffer];
      e.push(a.data), t.push(n.size * fn[n.type] / 4), n.buffer = 0;
    }
    for (s.data = Ho(e, t), i = 0; i < this.buffers.length; i++)
      this.buffers[i] !== this.indexBuffer && this.buffers[i].destroy();
    return this.buffers = [s], this.indexBuffer && this.buffers.push(this.indexBuffer), this;
  }
  /** Get the size of the geometries, in vertices. */
  getSize() {
    for (const e in this.attributes) {
      const t = this.attributes[e];
      return this.buffers[t.buffer].data.length / (t.stride / 4 || t.size);
    }
    return 0;
  }
  /** Disposes WebGL resources that are connected to this geometry. */
  dispose() {
    this.disposeRunner.emit(this, !1);
  }
  /** Destroys the geometry. */
  destroy() {
    this.dispose(), this.buffers = null, this.indexBuffer = null, this.attributes = null;
  }
  /**
   * Returns a clone of the geometry.
   * @returns - A new clone of this geometry.
   */
  clone() {
    const e = new bt();
    for (let t = 0; t < this.buffers.length; t++)
      e.buffers[t] = new xe(this.buffers[t].data.slice(0));
    for (const t in this.attributes) {
      const s = this.attributes[t];
      e.attributes[t] = new dr(
        s.buffer,
        s.size,
        s.normalized,
        s.type,
        s.stride,
        s.start,
        s.instance
      );
    }
    return this.indexBuffer && (e.indexBuffer = e.buffers[this.buffers.indexOf(this.indexBuffer)], e.indexBuffer.type = Ue.ELEMENT_ARRAY_BUFFER), e;
  }
  /**
   * Merges an array of geometries into a new single one.
   *
   * Geometry attribute styles must match for this operation to work.
   * @param geometries - array of geometries to merge
   * @returns - Shiny new geometry!
   */
  static merge(e) {
    const t = new bt(), s = [], i = [], n = [];
    let a;
    for (let o = 0; o < e.length; o++) {
      a = e[o];
      for (let h = 0; h < a.buffers.length; h++)
        i[h] = i[h] || 0, i[h] += a.buffers[h].data.length, n[h] = 0;
    }
    for (let o = 0; o < a.buffers.length; o++)
      s[o] = new Wo[Mn(a.buffers[o].data)](i[o]), t.buffers[o] = new xe(s[o]);
    for (let o = 0; o < e.length; o++) {
      a = e[o];
      for (let h = 0; h < a.buffers.length; h++)
        s[h].set(a.buffers[h].data, n[h]), n[h] += a.buffers[h].data.length;
    }
    if (t.attributes = a.attributes, a.indexBuffer) {
      t.indexBuffer = t.buffers[a.buffers.indexOf(a.indexBuffer)], t.indexBuffer.type = Ue.ELEMENT_ARRAY_BUFFER;
      let o = 0, h = 0, l = 0, c = 0;
      for (let g = 0; g < a.buffers.length; g++)
        if (a.buffers[g] !== a.indexBuffer) {
          c = g;
          break;
        }
      for (const g in a.attributes) {
        const x = a.attributes[g];
        (x.buffer | 0) === c && (h += x.size * fn[x.type] / 4);
      }
      for (let g = 0; g < e.length; g++) {
        const x = e[g].indexBuffer.data;
        for (let b = 0; b < x.length; b++)
          t.indexBuffer.data[b + l] += o;
        o += e[g].buffers[c].data.length / h, l += x.length;
      }
    }
    return t;
  }
}
class jo extends bt {
  /**
   * @param {boolean} [_static=false] - Optimization flag, where `false`
   *        is updated every frame, `true` doesn't change frame-to-frame.
   */
  constructor(e = !1) {
    super(), this._buffer = new xe(null, e, !1), this._indexBuffer = new xe(null, e, !0), this.addAttribute("aVertexPosition", this._buffer, 2, !1, se.FLOAT).addAttribute("aTextureCoord", this._buffer, 2, !1, se.FLOAT).addAttribute("aColor", this._buffer, 4, !0, se.UNSIGNED_BYTE).addAttribute("aTextureId", this._buffer, 1, !0, se.FLOAT).addIndex(this._indexBuffer);
  }
}
const Xo = Math.PI * 2;
var kn = /* @__PURE__ */ ((r) => (r[r.POLY = 0] = "POLY", r[r.RECT = 1] = "RECT", r[r.CIRC = 2] = "CIRC", r[r.ELIP = 3] = "ELIP", r[r.RREC = 4] = "RREC", r))(kn || {});
class be {
  /**
   * Creates a new `Point`
   * @param {number} [x=0] - position of the point on the x axis
   * @param {number} [y=0] - position of the point on the y axis
   */
  constructor(e = 0, t = 0) {
    this.x = 0, this.y = 0, this.x = e, this.y = t;
  }
  /**
   * Creates a clone of this point
   * @returns A clone of this point
   */
  clone() {
    return new be(this.x, this.y);
  }
  /**
   * Copies `x` and `y` from the given point into this point
   * @param p - The point to copy from
   * @returns The point instance itself
   */
  copyFrom(e) {
    return this.set(e.x, e.y), this;
  }
  /**
   * Copies this point's x and y into the given point (`p`).
   * @param p - The point to copy to. Can be any of type that is or extends `IPointData`
   * @returns The point (`p`) with values updated
   */
  copyTo(e) {
    return e.set(this.x, this.y), e;
  }
  /**
   * Accepts another point (`p`) and returns `true` if the given point is equal to this point
   * @param p - The point to check
   * @returns Returns `true` if both `x` and `y` are equal
   */
  equals(e) {
    return e.x === this.x && e.y === this.y;
  }
  /**
   * Sets the point to a new `x` and `y` position.
   * If `y` is omitted, both `x` and `y` will be set to `x`.
   * @param {number} [x=0] - position of the point on the `x` axis
   * @param {number} [y=x] - position of the point on the `y` axis
   * @returns The point instance itself
   */
  set(e = 0, t = e) {
    return this.x = e, this.y = t, this;
  }
}
be.prototype.toString = function() {
  return `[@pixi/math:Point x=${this.x} y=${this.y}]`;
};
const qt = [new be(), new be(), new be(), new be()];
class me {
  /**
   * @param x - The X coordinate of the upper-left corner of the rectangle
   * @param y - The Y coordinate of the upper-left corner of the rectangle
   * @param width - The overall width of the rectangle
   * @param height - The overall height of the rectangle
   */
  constructor(e = 0, t = 0, s = 0, i = 0) {
    this.x = Number(e), this.y = Number(t), this.width = Number(s), this.height = Number(i), this.type = kn.RECT;
  }
  /** Returns the left edge of the rectangle. */
  get left() {
    return this.x;
  }
  /** Returns the right edge of the rectangle. */
  get right() {
    return this.x + this.width;
  }
  /** Returns the top edge of the rectangle. */
  get top() {
    return this.y;
  }
  /** Returns the bottom edge of the rectangle. */
  get bottom() {
    return this.y + this.height;
  }
  /** A constant empty rectangle. */
  static get EMPTY() {
    return new me(0, 0, 0, 0);
  }
  /**
   * Creates a clone of this Rectangle
   * @returns a copy of the rectangle
   */
  clone() {
    return new me(this.x, this.y, this.width, this.height);
  }
  /**
   * Copies another rectangle to this one.
   * @param rectangle - The rectangle to copy from.
   * @returns Returns itself.
   */
  copyFrom(e) {
    return this.x = e.x, this.y = e.y, this.width = e.width, this.height = e.height, this;
  }
  /**
   * Copies this rectangle to another one.
   * @param rectangle - The rectangle to copy to.
   * @returns Returns given parameter.
   */
  copyTo(e) {
    return e.x = this.x, e.y = this.y, e.width = this.width, e.height = this.height, e;
  }
  /**
   * Checks whether the x and y coordinates given are contained within this Rectangle
   * @param x - The X coordinate of the point to test
   * @param y - The Y coordinate of the point to test
   * @returns Whether the x/y coordinates are within this Rectangle
   */
  contains(e, t) {
    return this.width <= 0 || this.height <= 0 ? !1 : e >= this.x && e < this.x + this.width && t >= this.y && t < this.y + this.height;
  }
  /**
   * Determines whether the `other` Rectangle transformed by `transform` intersects with `this` Rectangle object.
   * Returns true only if the area of the intersection is >0, this means that Rectangles
   * sharing a side are not overlapping. Another side effect is that an arealess rectangle
   * (width or height equal to zero) can't intersect any other rectangle.
   * @param {Rectangle} other - The Rectangle to intersect with `this`.
   * @param {Matrix} transform - The transformation matrix of `other`.
   * @returns {boolean} A value of `true` if the transformed `other` Rectangle intersects with `this`; otherwise `false`.
   */
  intersects(e, t) {
    if (!t) {
      const D = this.x < e.x ? e.x : this.x;
      if ((this.right > e.right ? e.right : this.right) <= D)
        return !1;
      const X = this.y < e.y ? e.y : this.y;
      return (this.bottom > e.bottom ? e.bottom : this.bottom) > X;
    }
    const s = this.left, i = this.right, n = this.top, a = this.bottom;
    if (i <= s || a <= n)
      return !1;
    const o = qt[0].set(e.left, e.top), h = qt[1].set(e.left, e.bottom), l = qt[2].set(e.right, e.top), c = qt[3].set(e.right, e.bottom);
    if (l.x <= o.x || h.y <= o.y)
      return !1;
    const g = Math.sign(t.a * t.d - t.b * t.c);
    if (g === 0 || (t.apply(o, o), t.apply(h, h), t.apply(l, l), t.apply(c, c), Math.max(o.x, h.x, l.x, c.x) <= s || Math.min(o.x, h.x, l.x, c.x) >= i || Math.max(o.y, h.y, l.y, c.y) <= n || Math.min(o.y, h.y, l.y, c.y) >= a))
      return !1;
    const x = g * (h.y - o.y), b = g * (o.x - h.x), F = x * s + b * n, C = x * i + b * n, f = x * s + b * a, A = x * i + b * a;
    if (Math.max(F, C, f, A) <= x * o.x + b * o.y || Math.min(F, C, f, A) >= x * c.x + b * c.y)
      return !1;
    const E = g * (o.y - l.y), w = g * (l.x - o.x), M = E * s + w * n, p = E * i + w * n, O = E * s + w * a, v = E * i + w * a;
    return !(Math.max(M, p, O, v) <= E * o.x + w * o.y || Math.min(M, p, O, v) >= E * c.x + w * c.y);
  }
  /**
   * Pads the rectangle making it grow in all directions.
   * If paddingY is omitted, both paddingX and paddingY will be set to paddingX.
   * @param paddingX - The horizontal padding amount.
   * @param paddingY - The vertical padding amount.
   * @returns Returns itself.
   */
  pad(e = 0, t = e) {
    return this.x -= e, this.y -= t, this.width += e * 2, this.height += t * 2, this;
  }
  /**
   * Fits this rectangle around the passed one.
   * @param rectangle - The rectangle to fit.
   * @returns Returns itself.
   */
  fit(e) {
    const t = Math.max(this.x, e.x), s = Math.min(this.x + this.width, e.x + e.width), i = Math.max(this.y, e.y), n = Math.min(this.y + this.height, e.y + e.height);
    return this.x = t, this.width = Math.max(s - t, 0), this.y = i, this.height = Math.max(n - i, 0), this;
  }
  /**
   * Enlarges rectangle that way its corners lie on grid
   * @param resolution - resolution
   * @param eps - precision
   * @returns Returns itself.
   */
  ceil(e = 1, t = 1e-3) {
    const s = Math.ceil((this.x + this.width - t) * e) / e, i = Math.ceil((this.y + this.height - t) * e) / e;
    return this.x = Math.floor((this.x + t) * e) / e, this.y = Math.floor((this.y + t) * e) / e, this.width = s - this.x, this.height = i - this.y, this;
  }
  /**
   * Enlarges this rectangle to include the passed rectangle.
   * @param rectangle - The rectangle to include.
   * @returns Returns itself.
   */
  enlarge(e) {
    const t = Math.min(this.x, e.x), s = Math.max(this.x + this.width, e.x + e.width), i = Math.min(this.y, e.y), n = Math.max(this.y + this.height, e.y + e.height);
    return this.x = t, this.width = s - t, this.y = i, this.height = n - i, this;
  }
}
me.prototype.toString = function() {
  return `[@pixi/math:Rectangle x=${this.x} y=${this.y} width=${this.width} height=${this.height}]`;
};
class Ae {
  /**
   * @param a - x scale
   * @param b - y skew
   * @param c - x skew
   * @param d - y scale
   * @param tx - x translation
   * @param ty - y translation
   */
  constructor(e = 1, t = 0, s = 0, i = 1, n = 0, a = 0) {
    this.array = null, this.a = e, this.b = t, this.c = s, this.d = i, this.tx = n, this.ty = a;
  }
  /**
   * Creates a Matrix object based on the given array. The Element to Matrix mapping order is as follows:
   *
   * a = array[0]
   * b = array[1]
   * c = array[3]
   * d = array[4]
   * tx = array[2]
   * ty = array[5]
   * @param array - The array that the matrix will be populated from.
   */
  fromArray(e) {
    this.a = e[0], this.b = e[1], this.c = e[3], this.d = e[4], this.tx = e[2], this.ty = e[5];
  }
  /**
   * Sets the matrix properties.
   * @param a - Matrix component
   * @param b - Matrix component
   * @param c - Matrix component
   * @param d - Matrix component
   * @param tx - Matrix component
   * @param ty - Matrix component
   * @returns This matrix. Good for chaining method calls.
   */
  set(e, t, s, i, n, a) {
    return this.a = e, this.b = t, this.c = s, this.d = i, this.tx = n, this.ty = a, this;
  }
  /**
   * Creates an array from the current Matrix object.
   * @param transpose - Whether we need to transpose the matrix or not
   * @param [out=new Float32Array(9)] - If provided the array will be assigned to out
   * @returns The newly created array which contains the matrix
   */
  toArray(e, t) {
    this.array || (this.array = new Float32Array(9));
    const s = t || this.array;
    return e ? (s[0] = this.a, s[1] = this.b, s[2] = 0, s[3] = this.c, s[4] = this.d, s[5] = 0, s[6] = this.tx, s[7] = this.ty, s[8] = 1) : (s[0] = this.a, s[1] = this.c, s[2] = this.tx, s[3] = this.b, s[4] = this.d, s[5] = this.ty, s[6] = 0, s[7] = 0, s[8] = 1), s;
  }
  /**
   * Get a new position with the current transformation applied.
   * Can be used to go from a child's coordinate space to the world coordinate space. (e.g. rendering)
   * @param pos - The origin
   * @param {PIXI.Point} [newPos] - The point that the new position is assigned to (allowed to be same as input)
   * @returns {PIXI.Point} The new point, transformed through this matrix
   */
  apply(e, t) {
    t = t || new be();
    const s = e.x, i = e.y;
    return t.x = this.a * s + this.c * i + this.tx, t.y = this.b * s + this.d * i + this.ty, t;
  }
  /**
   * Get a new position with the inverse of the current transformation applied.
   * Can be used to go from the world coordinate space to a child's coordinate space. (e.g. input)
   * @param pos - The origin
   * @param {PIXI.Point} [newPos] - The point that the new position is assigned to (allowed to be same as input)
   * @returns {PIXI.Point} The new point, inverse-transformed through this matrix
   */
  applyInverse(e, t) {
    t = t || new be();
    const s = 1 / (this.a * this.d + this.c * -this.b), i = e.x, n = e.y;
    return t.x = this.d * s * i + -this.c * s * n + (this.ty * this.c - this.tx * this.d) * s, t.y = this.a * s * n + -this.b * s * i + (-this.ty * this.a + this.tx * this.b) * s, t;
  }
  /**
   * Translates the matrix on the x and y.
   * @param x - How much to translate x by
   * @param y - How much to translate y by
   * @returns This matrix. Good for chaining method calls.
   */
  translate(e, t) {
    return this.tx += e, this.ty += t, this;
  }
  /**
   * Applies a scale transformation to the matrix.
   * @param x - The amount to scale horizontally
   * @param y - The amount to scale vertically
   * @returns This matrix. Good for chaining method calls.
   */
  scale(e, t) {
    return this.a *= e, this.d *= t, this.c *= e, this.b *= t, this.tx *= e, this.ty *= t, this;
  }
  /**
   * Applies a rotation transformation to the matrix.
   * @param angle - The angle in radians.
   * @returns This matrix. Good for chaining method calls.
   */
  rotate(e) {
    const t = Math.cos(e), s = Math.sin(e), i = this.a, n = this.c, a = this.tx;
    return this.a = i * t - this.b * s, this.b = i * s + this.b * t, this.c = n * t - this.d * s, this.d = n * s + this.d * t, this.tx = a * t - this.ty * s, this.ty = a * s + this.ty * t, this;
  }
  /**
   * Appends the given Matrix to this Matrix.
   * @param matrix - The matrix to append.
   * @returns This matrix. Good for chaining method calls.
   */
  append(e) {
    const t = this.a, s = this.b, i = this.c, n = this.d;
    return this.a = e.a * t + e.b * i, this.b = e.a * s + e.b * n, this.c = e.c * t + e.d * i, this.d = e.c * s + e.d * n, this.tx = e.tx * t + e.ty * i + this.tx, this.ty = e.tx * s + e.ty * n + this.ty, this;
  }
  /**
   * Sets the matrix based on all the available properties
   * @param x - Position on the x axis
   * @param y - Position on the y axis
   * @param pivotX - Pivot on the x axis
   * @param pivotY - Pivot on the y axis
   * @param scaleX - Scale on the x axis
   * @param scaleY - Scale on the y axis
   * @param rotation - Rotation in radians
   * @param skewX - Skew on the x axis
   * @param skewY - Skew on the y axis
   * @returns This matrix. Good for chaining method calls.
   */
  setTransform(e, t, s, i, n, a, o, h, l) {
    return this.a = Math.cos(o + l) * n, this.b = Math.sin(o + l) * n, this.c = -Math.sin(o - h) * a, this.d = Math.cos(o - h) * a, this.tx = e - (s * this.a + i * this.c), this.ty = t - (s * this.b + i * this.d), this;
  }
  /**
   * Prepends the given Matrix to this Matrix.
   * @param matrix - The matrix to prepend
   * @returns This matrix. Good for chaining method calls.
   */
  prepend(e) {
    const t = this.tx;
    if (e.a !== 1 || e.b !== 0 || e.c !== 0 || e.d !== 1) {
      const s = this.a, i = this.c;
      this.a = s * e.a + this.b * e.c, this.b = s * e.b + this.b * e.d, this.c = i * e.a + this.d * e.c, this.d = i * e.b + this.d * e.d;
    }
    return this.tx = t * e.a + this.ty * e.c + e.tx, this.ty = t * e.b + this.ty * e.d + e.ty, this;
  }
  /**
   * Decomposes the matrix (x, y, scaleX, scaleY, and rotation) and sets the properties on to a transform.
   * @param transform - The transform to apply the properties to.
   * @returns The transform with the newly applied properties
   */
  decompose(e) {
    const t = this.a, s = this.b, i = this.c, n = this.d, a = e.pivot, o = -Math.atan2(-i, n), h = Math.atan2(s, t), l = Math.abs(o + h);
    return l < 1e-5 || Math.abs(Xo - l) < 1e-5 ? (e.rotation = h, e.skew.x = e.skew.y = 0) : (e.rotation = 0, e.skew.x = o, e.skew.y = h), e.scale.x = Math.sqrt(t * t + s * s), e.scale.y = Math.sqrt(i * i + n * n), e.position.x = this.tx + (a.x * t + a.y * i), e.position.y = this.ty + (a.x * s + a.y * n), e;
  }
  /**
   * Inverts this matrix
   * @returns This matrix. Good for chaining method calls.
   */
  invert() {
    const e = this.a, t = this.b, s = this.c, i = this.d, n = this.tx, a = e * i - t * s;
    return this.a = i / a, this.b = -t / a, this.c = -s / a, this.d = e / a, this.tx = (s * this.ty - i * n) / a, this.ty = -(e * this.ty - t * n) / a, this;
  }
  /**
   * Resets this Matrix to an identity (default) matrix.
   * @returns This matrix. Good for chaining method calls.
   */
  identity() {
    return this.a = 1, this.b = 0, this.c = 0, this.d = 1, this.tx = 0, this.ty = 0, this;
  }
  /**
   * Creates a new Matrix object with the same values as this one.
   * @returns A copy of this matrix. Good for chaining method calls.
   */
  clone() {
    const e = new Ae();
    return e.a = this.a, e.b = this.b, e.c = this.c, e.d = this.d, e.tx = this.tx, e.ty = this.ty, e;
  }
  /**
   * Changes the values of the given matrix to be the same as the ones in this matrix
   * @param matrix - The matrix to copy to.
   * @returns The matrix given in parameter with its values updated.
   */
  copyTo(e) {
    return e.a = this.a, e.b = this.b, e.c = this.c, e.d = this.d, e.tx = this.tx, e.ty = this.ty, e;
  }
  /**
   * Changes the values of the matrix to be the same as the ones in given matrix
   * @param {PIXI.Matrix} matrix - The matrix to copy from.
   * @returns {PIXI.Matrix} this
   */
  copyFrom(e) {
    return this.a = e.a, this.b = e.b, this.c = e.c, this.d = e.d, this.tx = e.tx, this.ty = e.ty, this;
  }
  /**
   * A default (identity) matrix
   * @readonly
   */
  static get IDENTITY() {
    return new Ae();
  }
  /**
   * A temp matrix
   * @readonly
   */
  static get TEMP_MATRIX() {
    return new Ae();
  }
}
Ae.prototype.toString = function() {
  return `[@pixi/math:Matrix a=${this.a} b=${this.b} c=${this.c} d=${this.d} tx=${this.tx} ty=${this.ty}]`;
};
const Ye = [1, 1, 0, -1, -1, -1, 0, 1, 1, 1, 0, -1, -1, -1, 0, 1], Qe = [0, 1, 1, 1, 0, -1, -1, -1, 0, 1, 1, 1, 0, -1, -1, -1], Je = [0, -1, -1, -1, 0, 1, 1, 1, 0, 1, 1, 1, 0, -1, -1, -1], et = [1, 1, 0, -1, -1, -1, 0, 1, -1, -1, 0, 1, 1, 1, 0, -1], Ps = [], Gn = [], Kt = Math.sign;
function zo() {
  for (let r = 0; r < 16; r++) {
    const e = [];
    Ps.push(e);
    for (let t = 0; t < 16; t++) {
      const s = Kt(Ye[r] * Ye[t] + Je[r] * Qe[t]), i = Kt(Qe[r] * Ye[t] + et[r] * Qe[t]), n = Kt(Ye[r] * Je[t] + Je[r] * et[t]), a = Kt(Qe[r] * Je[t] + et[r] * et[t]);
      for (let o = 0; o < 16; o++)
        if (Ye[o] === s && Qe[o] === i && Je[o] === n && et[o] === a) {
          e.push(o);
          break;
        }
    }
  }
  for (let r = 0; r < 16; r++) {
    const e = new Ae();
    e.set(Ye[r], Qe[r], Je[r], et[r], 0, 0), Gn.push(e);
  }
}
zo();
const fe = {
  /**
   * | Rotation | Direction |
   * |----------|-----------|
   * | 0°       | East      |
   * @readonly
   */
  E: 0,
  /**
   * | Rotation | Direction |
   * |----------|-----------|
   * | 45°↻     | Southeast |
   * @readonly
   */
  SE: 1,
  /**
   * | Rotation | Direction |
   * |----------|-----------|
   * | 90°↻     | South     |
   * @readonly
   */
  S: 2,
  /**
   * | Rotation | Direction |
   * |----------|-----------|
   * | 135°↻    | Southwest |
   * @readonly
   */
  SW: 3,
  /**
   * | Rotation | Direction |
   * |----------|-----------|
   * | 180°     | West      |
   * @readonly
   */
  W: 4,
  /**
   * | Rotation    | Direction    |
   * |-------------|--------------|
   * | -135°/225°↻ | Northwest    |
   * @readonly
   */
  NW: 5,
  /**
   * | Rotation    | Direction    |
   * |-------------|--------------|
   * | -90°/270°↻  | North        |
   * @readonly
   */
  N: 6,
  /**
   * | Rotation    | Direction    |
   * |-------------|--------------|
   * | -45°/315°↻  | Northeast    |
   * @readonly
   */
  NE: 7,
  /**
   * Reflection about Y-axis.
   * @readonly
   */
  MIRROR_VERTICAL: 8,
  /**
   * Reflection about the main diagonal.
   * @readonly
   */
  MAIN_DIAGONAL: 10,
  /**
   * Reflection about X-axis.
   * @readonly
   */
  MIRROR_HORIZONTAL: 12,
  /**
   * Reflection about reverse diagonal.
   * @readonly
   */
  REVERSE_DIAGONAL: 14,
  /**
   * @param {PIXI.GD8Symmetry} ind - sprite rotation angle.
   * @returns {PIXI.GD8Symmetry} The X-component of the U-axis
   *    after rotating the axes.
   */
  uX: (r) => Ye[r],
  /**
   * @param {PIXI.GD8Symmetry} ind - sprite rotation angle.
   * @returns {PIXI.GD8Symmetry} The Y-component of the U-axis
   *    after rotating the axes.
   */
  uY: (r) => Qe[r],
  /**
   * @param {PIXI.GD8Symmetry} ind - sprite rotation angle.
   * @returns {PIXI.GD8Symmetry} The X-component of the V-axis
   *    after rotating the axes.
   */
  vX: (r) => Je[r],
  /**
   * @param {PIXI.GD8Symmetry} ind - sprite rotation angle.
   * @returns {PIXI.GD8Symmetry} The Y-component of the V-axis
   *    after rotating the axes.
   */
  vY: (r) => et[r],
  /**
   * @param {PIXI.GD8Symmetry} rotation - symmetry whose opposite
   *   is needed. Only rotations have opposite symmetries while
   *   reflections don't.
   * @returns {PIXI.GD8Symmetry} The opposite symmetry of `rotation`
   */
  inv: (r) => r & 8 ? r & 15 : -r & 7,
  /**
   * Composes the two D8 operations.
   *
   * Taking `^` as reflection:
   *
   * |       | E=0 | S=2 | W=4 | N=6 | E^=8 | S^=10 | W^=12 | N^=14 |
   * |-------|-----|-----|-----|-----|------|-------|-------|-------|
   * | E=0   | E   | S   | W   | N   | E^   | S^    | W^    | N^    |
   * | S=2   | S   | W   | N   | E   | S^   | W^    | N^    | E^    |
   * | W=4   | W   | N   | E   | S   | W^   | N^    | E^    | S^    |
   * | N=6   | N   | E   | S   | W   | N^   | E^    | S^    | W^    |
   * | E^=8  | E^  | N^  | W^  | S^  | E    | N     | W     | S     |
   * | S^=10 | S^  | E^  | N^  | W^  | S    | E     | N     | W     |
   * | W^=12 | W^  | S^  | E^  | N^  | W    | S     | E     | N     |
   * | N^=14 | N^  | W^  | S^  | E^  | N    | W     | S     | E     |
   *
   * [This is a Cayley table]{@link https://en.wikipedia.org/wiki/Cayley_table}
   * @param {PIXI.GD8Symmetry} rotationSecond - Second operation, which
   *   is the row in the above cayley table.
   * @param {PIXI.GD8Symmetry} rotationFirst - First operation, which
   *   is the column in the above cayley table.
   * @returns {PIXI.GD8Symmetry} Composed operation
   */
  add: (r, e) => Ps[r][e],
  /**
   * Reverse of `add`.
   * @param {PIXI.GD8Symmetry} rotationSecond - Second operation
   * @param {PIXI.GD8Symmetry} rotationFirst - First operation
   * @returns {PIXI.GD8Symmetry} Result
   */
  sub: (r, e) => Ps[r][fe.inv(e)],
  /**
   * Adds 180 degrees to rotation, which is a commutative
   * operation.
   * @param {number} rotation - The number to rotate.
   * @returns {number} Rotated number
   */
  rotate180: (r) => r ^ 4,
  /**
   * Checks if the rotation angle is vertical, i.e. south
   * or north. It doesn't work for reflections.
   * @param {PIXI.GD8Symmetry} rotation - The number to check.
   * @returns {boolean} Whether or not the direction is vertical
   */
  isVertical: (r) => (r & 3) === 2,
  // rotation % 4 === 2
  /**
   * Approximates the vector `V(dx,dy)` into one of the
   * eight directions provided by `groupD8`.
   * @param {number} dx - X-component of the vector
   * @param {number} dy - Y-component of the vector
   * @returns {PIXI.GD8Symmetry} Approximation of the vector into
   *  one of the eight symmetries.
   */
  byDirection: (r, e) => Math.abs(r) * 2 <= Math.abs(e) ? e >= 0 ? fe.S : fe.N : Math.abs(e) * 2 <= Math.abs(r) ? r > 0 ? fe.E : fe.W : e > 0 ? r > 0 ? fe.SE : fe.SW : r > 0 ? fe.NE : fe.NW,
  /**
   * Helps sprite to compensate texture packer rotation.
   * @param {PIXI.Matrix} matrix - sprite world matrix
   * @param {PIXI.GD8Symmetry} rotation - The rotation factor to use.
   * @param {number} tx - sprite anchoring
   * @param {number} ty - sprite anchoring
   */
  matrixAppendRotationInv: (r, e, t = 0, s = 0) => {
    const i = Gn[fe.inv(e)];
    i.tx = t, i.ty = s, r.append(i);
  }
};
class it {
  /**
   * Creates a new `ObservablePoint`
   * @param cb - callback function triggered when `x` and/or `y` are changed
   * @param scope - owner of callback
   * @param {number} [x=0] - position of the point on the x axis
   * @param {number} [y=0] - position of the point on the y axis
   */
  constructor(e, t, s = 0, i = 0) {
    this._x = s, this._y = i, this.cb = e, this.scope = t;
  }
  /**
   * Creates a clone of this point.
   * The callback and scope params can be overridden otherwise they will default
   * to the clone object's values.
   * @override
   * @param cb - The callback function triggered when `x` and/or `y` are changed
   * @param scope - The owner of the callback
   * @returns a copy of this observable point
   */
  clone(e = this.cb, t = this.scope) {
    return new it(e, t, this._x, this._y);
  }
  /**
   * Sets the point to a new `x` and `y` position.
   * If `y` is omitted, both `x` and `y` will be set to `x`.
   * @param {number} [x=0] - position of the point on the x axis
   * @param {number} [y=x] - position of the point on the y axis
   * @returns The observable point instance itself
   */
  set(e = 0, t = e) {
    return (this._x !== e || this._y !== t) && (this._x = e, this._y = t, this.cb.call(this.scope)), this;
  }
  /**
   * Copies x and y from the given point (`p`)
   * @param p - The point to copy from. Can be any of type that is or extends `IPointData`
   * @returns The observable point instance itself
   */
  copyFrom(e) {
    return (this._x !== e.x || this._y !== e.y) && (this._x = e.x, this._y = e.y, this.cb.call(this.scope)), this;
  }
  /**
   * Copies this point's x and y into that of the given point (`p`)
   * @param p - The point to copy to. Can be any of type that is or extends `IPointData`
   * @returns The point (`p`) with values updated
   */
  copyTo(e) {
    return e.set(this._x, this._y), e;
  }
  /**
   * Accepts another point (`p`) and returns `true` if the given point is equal to this point
   * @param p - The point to check
   * @returns Returns `true` if both `x` and `y` are equal
   */
  equals(e) {
    return e.x === this._x && e.y === this._y;
  }
  /** Position of the observable point on the x axis. */
  get x() {
    return this._x;
  }
  set x(e) {
    this._x !== e && (this._x = e, this.cb.call(this.scope));
  }
  /** Position of the observable point on the y axis. */
  get y() {
    return this._y;
  }
  set y(e) {
    this._y !== e && (this._y = e, this.cb.call(this.scope));
  }
}
it.prototype.toString = function() {
  return `[@pixi/math:ObservablePoint x=${this.x} y=${this.y} scope=${this.scope}]`;
};
const Os = class {
  constructor() {
    this.worldTransform = new Ae(), this.localTransform = new Ae(), this.position = new it(this.onChange, this, 0, 0), this.scale = new it(this.onChange, this, 1, 1), this.pivot = new it(this.onChange, this, 0, 0), this.skew = new it(this.updateSkew, this, 0, 0), this._rotation = 0, this._cx = 1, this._sx = 0, this._cy = 0, this._sy = 1, this._localID = 0, this._currentLocalID = 0, this._worldID = 0, this._parentID = 0;
  }
  /** Called when a value changes. */
  onChange() {
    this._localID++;
  }
  /** Called when the skew or the rotation changes. */
  updateSkew() {
    this._cx = Math.cos(this._rotation + this.skew.y), this._sx = Math.sin(this._rotation + this.skew.y), this._cy = -Math.sin(this._rotation - this.skew.x), this._sy = Math.cos(this._rotation - this.skew.x), this._localID++;
  }
  /** Updates the local transformation matrix. */
  updateLocalTransform() {
    const r = this.localTransform;
    this._localID !== this._currentLocalID && (r.a = this._cx * this.scale.x, r.b = this._sx * this.scale.x, r.c = this._cy * this.scale.y, r.d = this._sy * this.scale.y, r.tx = this.position.x - (this.pivot.x * r.a + this.pivot.y * r.c), r.ty = this.position.y - (this.pivot.x * r.b + this.pivot.y * r.d), this._currentLocalID = this._localID, this._parentID = -1);
  }
  /**
   * Updates the local and the world transformation matrices.
   * @param parentTransform - The parent transform
   */
  updateTransform(r) {
    const e = this.localTransform;
    if (this._localID !== this._currentLocalID && (e.a = this._cx * this.scale.x, e.b = this._sx * this.scale.x, e.c = this._cy * this.scale.y, e.d = this._sy * this.scale.y, e.tx = this.position.x - (this.pivot.x * e.a + this.pivot.y * e.c), e.ty = this.position.y - (this.pivot.x * e.b + this.pivot.y * e.d), this._currentLocalID = this._localID, this._parentID = -1), this._parentID !== r._worldID) {
      const t = r.worldTransform, s = this.worldTransform;
      s.a = e.a * t.a + e.b * t.c, s.b = e.a * t.b + e.b * t.d, s.c = e.c * t.a + e.d * t.c, s.d = e.c * t.b + e.d * t.d, s.tx = e.tx * t.a + e.ty * t.c + t.tx, s.ty = e.tx * t.b + e.ty * t.d + t.ty, this._parentID = r._worldID, this._worldID++;
    }
  }
  /**
   * Decomposes a matrix and sets the transforms properties based on it.
   * @param matrix - The matrix to decompose
   */
  setFromMatrix(r) {
    r.decompose(this), this._localID++;
  }
  /** The rotation of the object in radians. */
  get rotation() {
    return this._rotation;
  }
  set rotation(r) {
    this._rotation !== r && (this._rotation = r, this.updateSkew());
  }
};
Os.IDENTITY = new Os();
let Dn = Os;
Dn.prototype.toString = function() {
  return `[@pixi/math:Transform position=(${this.position.x}, ${this.position.y}) rotation=${this.rotation} scale=(${this.scale.x}, ${this.scale.y}) skew=(${this.skew.x}, ${this.skew.y}) ]`;
};
var qo = `varying vec2 vTextureCoord;

uniform sampler2D uSampler;

void main(void){
   gl_FragColor *= texture2D(uSampler, vTextureCoord);
}`, Ko = `attribute vec2 aVertexPosition;
attribute vec2 aTextureCoord;

uniform mat3 projectionMatrix;

varying vec2 vTextureCoord;

void main(void){
   gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);
   vTextureCoord = aTextureCoord;
}
`;
function pn(r, e, t) {
  const s = r.createShader(e);
  return r.shaderSource(s, t), r.compileShader(s), s;
}
function xs(r) {
  const e = new Array(r);
  for (let t = 0; t < e.length; t++)
    e[t] = !1;
  return e;
}
function $n(r, e) {
  switch (r) {
    case "float":
      return 0;
    case "vec2":
      return new Float32Array(2 * e);
    case "vec3":
      return new Float32Array(3 * e);
    case "vec4":
      return new Float32Array(4 * e);
    case "int":
    case "uint":
    case "sampler2D":
    case "sampler2DArray":
      return 0;
    case "ivec2":
      return new Int32Array(2 * e);
    case "ivec3":
      return new Int32Array(3 * e);
    case "ivec4":
      return new Int32Array(4 * e);
    case "uvec2":
      return new Uint32Array(2 * e);
    case "uvec3":
      return new Uint32Array(3 * e);
    case "uvec4":
      return new Uint32Array(4 * e);
    case "bool":
      return !1;
    case "bvec2":
      return xs(2 * e);
    case "bvec3":
      return xs(3 * e);
    case "bvec4":
      return xs(4 * e);
    case "mat2":
      return new Float32Array([
        1,
        0,
        0,
        1
      ]);
    case "mat3":
      return new Float32Array([
        1,
        0,
        0,
        0,
        1,
        0,
        0,
        0,
        1
      ]);
    case "mat4":
      return new Float32Array([
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
      ]);
  }
  return null;
}
const _t = [
  // a float cache layer
  {
    test: (r) => r.type === "float" && r.size === 1 && !r.isArray,
    code: (r) => `
            if(uv["${r}"] !== ud["${r}"].value)
            {
                ud["${r}"].value = uv["${r}"]
                gl.uniform1f(ud["${r}"].location, uv["${r}"])
            }
            `
  },
  // handling samplers
  {
    test: (r, e) => (
      // eslint-disable-next-line max-len,no-eq-null,eqeqeq
      (r.type === "sampler2D" || r.type === "samplerCube" || r.type === "sampler2DArray") && r.size === 1 && !r.isArray && (e == null || e.castToBaseTexture !== void 0)
    ),
    code: (r) => `t = syncData.textureCount++;

            renderer.texture.bind(uv["${r}"], t);

            if(ud["${r}"].value !== t)
            {
                ud["${r}"].value = t;
                gl.uniform1i(ud["${r}"].location, t);
; // eslint-disable-line max-len
            }`
  },
  // uploading pixi matrix object to mat3
  {
    test: (r, e) => r.type === "mat3" && r.size === 1 && !r.isArray && e.a !== void 0,
    code: (r) => (
      // TODO and some smart caching dirty ids here!
      `
            gl.uniformMatrix3fv(ud["${r}"].location, false, uv["${r}"].toArray(true));
            `
    ),
    codeUbo: (r) => `
                var ${r}_matrix = uv.${r}.toArray(true);

                data[offset] = ${r}_matrix[0];
                data[offset+1] = ${r}_matrix[1];
                data[offset+2] = ${r}_matrix[2];
        
                data[offset + 4] = ${r}_matrix[3];
                data[offset + 5] = ${r}_matrix[4];
                data[offset + 6] = ${r}_matrix[5];
        
                data[offset + 8] = ${r}_matrix[6];
                data[offset + 9] = ${r}_matrix[7];
                data[offset + 10] = ${r}_matrix[8];
            `
  },
  // uploading a pixi point as a vec2 with caching layer
  {
    test: (r, e) => r.type === "vec2" && r.size === 1 && !r.isArray && e.x !== void 0,
    code: (r) => `
                cv = ud["${r}"].value;
                v = uv["${r}"];

                if(cv[0] !== v.x || cv[1] !== v.y)
                {
                    cv[0] = v.x;
                    cv[1] = v.y;
                    gl.uniform2f(ud["${r}"].location, v.x, v.y);
                }`,
    codeUbo: (r) => `
                v = uv.${r};

                data[offset] = v.x;
                data[offset+1] = v.y;
            `
  },
  // caching layer for a vec2
  {
    test: (r) => r.type === "vec2" && r.size === 1 && !r.isArray,
    code: (r) => `
                cv = ud["${r}"].value;
                v = uv["${r}"];

                if(cv[0] !== v[0] || cv[1] !== v[1])
                {
                    cv[0] = v[0];
                    cv[1] = v[1];
                    gl.uniform2f(ud["${r}"].location, v[0], v[1]);
                }
            `
  },
  // upload a pixi rectangle as a vec4 with caching layer
  {
    test: (r, e) => r.type === "vec4" && r.size === 1 && !r.isArray && e.width !== void 0,
    code: (r) => `
                cv = ud["${r}"].value;
                v = uv["${r}"];

                if(cv[0] !== v.x || cv[1] !== v.y || cv[2] !== v.width || cv[3] !== v.height)
                {
                    cv[0] = v.x;
                    cv[1] = v.y;
                    cv[2] = v.width;
                    cv[3] = v.height;
                    gl.uniform4f(ud["${r}"].location, v.x, v.y, v.width, v.height)
                }`,
    codeUbo: (r) => `
                    v = uv.${r};

                    data[offset] = v.x;
                    data[offset+1] = v.y;
                    data[offset+2] = v.width;
                    data[offset+3] = v.height;
                `
  },
  // upload a pixi color as vec4 with caching layer
  {
    test: (r, e) => r.type === "vec4" && r.size === 1 && !r.isArray && e.red !== void 0,
    code: (r) => `
                cv = ud["${r}"].value;
                v = uv["${r}"];

                if(cv[0] !== v.red || cv[1] !== v.green || cv[2] !== v.blue || cv[3] !== v.alpha)
                {
                    cv[0] = v.red;
                    cv[1] = v.green;
                    cv[2] = v.blue;
                    cv[3] = v.alpha;
                    gl.uniform4f(ud["${r}"].location, v.red, v.green, v.blue, v.alpha)
                }`,
    codeUbo: (r) => `
                    v = uv.${r};

                    data[offset] = v.red;
                    data[offset+1] = v.green;
                    data[offset+2] = v.blue;
                    data[offset+3] = v.alpha;
                `
  },
  // upload a pixi color as a vec3 with caching layer
  {
    test: (r, e) => r.type === "vec3" && r.size === 1 && !r.isArray && e.red !== void 0,
    code: (r) => `
                cv = ud["${r}"].value;
                v = uv["${r}"];

                if(cv[0] !== v.red || cv[1] !== v.green || cv[2] !== v.blue || cv[3] !== v.a)
                {
                    cv[0] = v.red;
                    cv[1] = v.green;
                    cv[2] = v.blue;
    
                    gl.uniform3f(ud["${r}"].location, v.red, v.green, v.blue)
                }`,
    codeUbo: (r) => `
                    v = uv.${r};

                    data[offset] = v.red;
                    data[offset+1] = v.green;
                    data[offset+2] = v.blue;
                `
  },
  // a caching layer for vec4 uploading
  {
    test: (r) => r.type === "vec4" && r.size === 1 && !r.isArray,
    code: (r) => `
                cv = ud["${r}"].value;
                v = uv["${r}"];

                if(cv[0] !== v[0] || cv[1] !== v[1] || cv[2] !== v[2] || cv[3] !== v[3])
                {
                    cv[0] = v[0];
                    cv[1] = v[1];
                    cv[2] = v[2];
                    cv[3] = v[3];

                    gl.uniform4f(ud["${r}"].location, v[0], v[1], v[2], v[3])
                }`
  }
], Zo = {
  float: `
    if (cv !== v)
    {
        cu.value = v;
        gl.uniform1f(location, v);
    }`,
  vec2: `
    if (cv[0] !== v[0] || cv[1] !== v[1])
    {
        cv[0] = v[0];
        cv[1] = v[1];

        gl.uniform2f(location, v[0], v[1])
    }`,
  vec3: `
    if (cv[0] !== v[0] || cv[1] !== v[1] || cv[2] !== v[2])
    {
        cv[0] = v[0];
        cv[1] = v[1];
        cv[2] = v[2];

        gl.uniform3f(location, v[0], v[1], v[2])
    }`,
  vec4: `
    if (cv[0] !== v[0] || cv[1] !== v[1] || cv[2] !== v[2] || cv[3] !== v[3])
    {
        cv[0] = v[0];
        cv[1] = v[1];
        cv[2] = v[2];
        cv[3] = v[3];

        gl.uniform4f(location, v[0], v[1], v[2], v[3]);
    }`,
  int: `
    if (cv !== v)
    {
        cu.value = v;

        gl.uniform1i(location, v);
    }`,
  ivec2: `
    if (cv[0] !== v[0] || cv[1] !== v[1])
    {
        cv[0] = v[0];
        cv[1] = v[1];

        gl.uniform2i(location, v[0], v[1]);
    }`,
  ivec3: `
    if (cv[0] !== v[0] || cv[1] !== v[1] || cv[2] !== v[2])
    {
        cv[0] = v[0];
        cv[1] = v[1];
        cv[2] = v[2];

        gl.uniform3i(location, v[0], v[1], v[2]);
    }`,
  ivec4: `
    if (cv[0] !== v[0] || cv[1] !== v[1] || cv[2] !== v[2] || cv[3] !== v[3])
    {
        cv[0] = v[0];
        cv[1] = v[1];
        cv[2] = v[2];
        cv[3] = v[3];

        gl.uniform4i(location, v[0], v[1], v[2], v[3]);
    }`,
  uint: `
    if (cv !== v)
    {
        cu.value = v;

        gl.uniform1ui(location, v);
    }`,
  uvec2: `
    if (cv[0] !== v[0] || cv[1] !== v[1])
    {
        cv[0] = v[0];
        cv[1] = v[1];

        gl.uniform2ui(location, v[0], v[1]);
    }`,
  uvec3: `
    if (cv[0] !== v[0] || cv[1] !== v[1] || cv[2] !== v[2])
    {
        cv[0] = v[0];
        cv[1] = v[1];
        cv[2] = v[2];

        gl.uniform3ui(location, v[0], v[1], v[2]);
    }`,
  uvec4: `
    if (cv[0] !== v[0] || cv[1] !== v[1] || cv[2] !== v[2] || cv[3] !== v[3])
    {
        cv[0] = v[0];
        cv[1] = v[1];
        cv[2] = v[2];
        cv[3] = v[3];

        gl.uniform4ui(location, v[0], v[1], v[2], v[3]);
    }`,
  bool: `
    if (cv !== v)
    {
        cu.value = v;
        gl.uniform1i(location, v);
    }`,
  bvec2: `
    if (cv[0] != v[0] || cv[1] != v[1])
    {
        cv[0] = v[0];
        cv[1] = v[1];

        gl.uniform2i(location, v[0], v[1]);
    }`,
  bvec3: `
    if (cv[0] !== v[0] || cv[1] !== v[1] || cv[2] !== v[2])
    {
        cv[0] = v[0];
        cv[1] = v[1];
        cv[2] = v[2];

        gl.uniform3i(location, v[0], v[1], v[2]);
    }`,
  bvec4: `
    if (cv[0] !== v[0] || cv[1] !== v[1] || cv[2] !== v[2] || cv[3] !== v[3])
    {
        cv[0] = v[0];
        cv[1] = v[1];
        cv[2] = v[2];
        cv[3] = v[3];

        gl.uniform4i(location, v[0], v[1], v[2], v[3]);
    }`,
  mat2: "gl.uniformMatrix2fv(location, false, v)",
  mat3: "gl.uniformMatrix3fv(location, false, v)",
  mat4: "gl.uniformMatrix4fv(location, false, v)",
  sampler2D: `
    if (cv !== v)
    {
        cu.value = v;

        gl.uniform1i(location, v);
    }`,
  samplerCube: `
    if (cv !== v)
    {
        cu.value = v;

        gl.uniform1i(location, v);
    }`,
  sampler2DArray: `
    if (cv !== v)
    {
        cu.value = v;

        gl.uniform1i(location, v);
    }`
}, Yo = {
  float: "gl.uniform1fv(location, v)",
  vec2: "gl.uniform2fv(location, v)",
  vec3: "gl.uniform3fv(location, v)",
  vec4: "gl.uniform4fv(location, v)",
  mat4: "gl.uniformMatrix4fv(location, false, v)",
  mat3: "gl.uniformMatrix3fv(location, false, v)",
  mat2: "gl.uniformMatrix2fv(location, false, v)",
  int: "gl.uniform1iv(location, v)",
  ivec2: "gl.uniform2iv(location, v)",
  ivec3: "gl.uniform3iv(location, v)",
  ivec4: "gl.uniform4iv(location, v)",
  uint: "gl.uniform1uiv(location, v)",
  uvec2: "gl.uniform2uiv(location, v)",
  uvec3: "gl.uniform3uiv(location, v)",
  uvec4: "gl.uniform4uiv(location, v)",
  bool: "gl.uniform1iv(location, v)",
  bvec2: "gl.uniform2iv(location, v)",
  bvec3: "gl.uniform3iv(location, v)",
  bvec4: "gl.uniform4iv(location, v)",
  sampler2D: "gl.uniform1iv(location, v)",
  samplerCube: "gl.uniform1iv(location, v)",
  sampler2DArray: "gl.uniform1iv(location, v)"
};
function Qo(r, e) {
  const t = [`
        var v = null;
        var cv = null;
        var cu = null;
        var t = 0;
        var gl = renderer.gl;
    `];
  for (const s in r.uniforms) {
    const i = e[s];
    if (!i) {
      r.uniforms[s]?.group === !0 && (r.uniforms[s].ubo ? t.push(`
                        renderer.shader.syncUniformBufferGroup(uv.${s}, '${s}');
                    `) : t.push(`
                        renderer.shader.syncUniformGroup(uv.${s}, syncData);
                    `));
      continue;
    }
    const n = r.uniforms[s];
    let a = !1;
    for (let o = 0; o < _t.length; o++)
      if (_t[o].test(i, n)) {
        t.push(_t[o].code(s, n)), a = !0;
        break;
      }
    if (!a) {
      const o = (i.size === 1 && !i.isArray ? Zo : Yo)[i.type].replace("location", `ud["${s}"].location`);
      t.push(`
            cu = ud["${s}"];
            cv = cu.value;
            v = uv["${s}"];
            ${o};`);
    }
  }
  return new Function("ud", "uv", "renderer", "syncData", t.join(`
`));
}
const Hn = {};
let Zt = Hn;
function Jo() {
  if (Zt === Hn || Zt?.isContextLost()) {
    const r = J.ADAPTER.createCanvas();
    let e;
    J.PREFER_ENV >= ot.WEBGL2 && (e = r.getContext("webgl2", {})), e || (e = r.getContext("webgl", {}) || r.getContext("experimental-webgl", {}), e ? e.getExtension("WEBGL_draw_buffers") : e = null), Zt = e;
  }
  return Zt;
}
let Yt;
function eh() {
  if (!Yt) {
    Yt = Re.MEDIUM;
    const r = Jo();
    if (r && r.getShaderPrecisionFormat) {
      const e = r.getShaderPrecisionFormat(r.FRAGMENT_SHADER, r.HIGH_FLOAT);
      e && (Yt = e.precision ? Re.HIGH : Re.MEDIUM);
    }
  }
  return Yt;
}
function mn(r, e) {
  const t = r.getShaderSource(e).split(`
`).map((l, c) => `${c}: ${l}`), s = r.getShaderInfoLog(e), i = s.split(`
`), n = {}, a = i.map((l) => parseFloat(l.replace(/^ERROR\: 0\:([\d]+)\:.*$/, "$1"))).filter((l) => l && !n[l] ? (n[l] = !0, !0) : !1), o = [""];
  a.forEach((l) => {
    t[l - 1] = `%c${t[l - 1]}%c`, o.push("background: #FF0000; color:#FFFFFF; font-size: 10px", "font-size: 10px");
  });
  const h = t.join(`
`);
  o[0] = h, console.error(s), console.groupCollapsed("click to view full shader code"), console.warn(...o), console.groupEnd();
}
function th(r, e, t, s) {
  r.getProgramParameter(e, r.LINK_STATUS) || (r.getShaderParameter(t, r.COMPILE_STATUS) || mn(r, t), r.getShaderParameter(s, r.COMPILE_STATUS) || mn(r, s), console.error("PixiJS Error: Could not initialize shader."), r.getProgramInfoLog(e) !== "" && console.warn("PixiJS Warning: gl.getProgramInfoLog()", r.getProgramInfoLog(e)));
}
const rh = {
  float: 1,
  vec2: 2,
  vec3: 3,
  vec4: 4,
  int: 1,
  ivec2: 2,
  ivec3: 3,
  ivec4: 4,
  uint: 1,
  uvec2: 2,
  uvec3: 3,
  uvec4: 4,
  bool: 1,
  bvec2: 2,
  bvec3: 3,
  bvec4: 4,
  mat2: 4,
  mat3: 9,
  mat4: 16,
  sampler2D: 1
};
function Vn(r) {
  return rh[r];
}
let Qt = null;
const yn = {
  FLOAT: "float",
  FLOAT_VEC2: "vec2",
  FLOAT_VEC3: "vec3",
  FLOAT_VEC4: "vec4",
  INT: "int",
  INT_VEC2: "ivec2",
  INT_VEC3: "ivec3",
  INT_VEC4: "ivec4",
  UNSIGNED_INT: "uint",
  UNSIGNED_INT_VEC2: "uvec2",
  UNSIGNED_INT_VEC3: "uvec3",
  UNSIGNED_INT_VEC4: "uvec4",
  BOOL: "bool",
  BOOL_VEC2: "bvec2",
  BOOL_VEC3: "bvec3",
  BOOL_VEC4: "bvec4",
  FLOAT_MAT2: "mat2",
  FLOAT_MAT3: "mat3",
  FLOAT_MAT4: "mat4",
  SAMPLER_2D: "sampler2D",
  INT_SAMPLER_2D: "sampler2D",
  UNSIGNED_INT_SAMPLER_2D: "sampler2D",
  SAMPLER_CUBE: "samplerCube",
  INT_SAMPLER_CUBE: "samplerCube",
  UNSIGNED_INT_SAMPLER_CUBE: "samplerCube",
  SAMPLER_2D_ARRAY: "sampler2DArray",
  INT_SAMPLER_2D_ARRAY: "sampler2DArray",
  UNSIGNED_INT_SAMPLER_2D_ARRAY: "sampler2DArray"
};
function Wn(r, e) {
  if (!Qt) {
    const t = Object.keys(yn);
    Qt = {};
    for (let s = 0; s < t.length; ++s) {
      const i = t[s];
      Qt[r[i]] = yn[i];
    }
  }
  return Qt[e];
}
function gn(r, e, t) {
  if (r.substring(0, 9) !== "precision") {
    let s = e;
    return e === Re.HIGH && t !== Re.HIGH && (s = Re.MEDIUM), `precision ${s} float;
${r}`;
  } else if (t !== Re.HIGH && r.substring(0, 15) === "precision highp")
    return r.replace("precision highp", "precision mediump");
  return r;
}
let Nt;
function sh() {
  if (typeof Nt == "boolean")
    return Nt;
  try {
    Nt = new Function("param1", "param2", "param3", "return param1[param2] === param3;")({ a: "b" }, "a", "b") === !0;
  } catch {
    Nt = !1;
  }
  return Nt;
}
let ih = 0;
const Jt = {}, Bs = class pt {
  /**
   * @param vertexSrc - The source of the vertex shader.
   * @param fragmentSrc - The source of the fragment shader.
   * @param name - Name for shader
   * @param extra - Extra data for shader
   */
  constructor(e, t, s = "pixi-shader", i = {}) {
    this.extra = {}, this.id = ih++, this.vertexSrc = e || pt.defaultVertexSrc, this.fragmentSrc = t || pt.defaultFragmentSrc, this.vertexSrc = this.vertexSrc.trim(), this.fragmentSrc = this.fragmentSrc.trim(), this.extra = i, this.vertexSrc.substring(0, 8) !== "#version" && (s = s.replace(/\s+/g, "-"), Jt[s] ? (Jt[s]++, s += `-${Jt[s]}`) : Jt[s] = 1, this.vertexSrc = `#define SHADER_NAME ${s}
${this.vertexSrc}`, this.fragmentSrc = `#define SHADER_NAME ${s}
${this.fragmentSrc}`, this.vertexSrc = gn(
      this.vertexSrc,
      pt.defaultVertexPrecision,
      Re.HIGH
    ), this.fragmentSrc = gn(
      this.fragmentSrc,
      pt.defaultFragmentPrecision,
      eh()
    )), this.glPrograms = {}, this.syncUniforms = null;
  }
  /**
   * The default vertex shader source.
   * @readonly
   */
  static get defaultVertexSrc() {
    return Ko;
  }
  /**
   * The default fragment shader source.
   * @readonly
   */
  static get defaultFragmentSrc() {
    return qo;
  }
  /**
   * A short hand function to create a program based of a vertex and fragment shader.
   *
   * This method will also check to see if there is a cached program.
   * @param vertexSrc - The source of the vertex shader.
   * @param fragmentSrc - The source of the fragment shader.
   * @param name - Name for shader
   * @returns A shiny new PixiJS shader program!
   */
  static from(e, t, s) {
    const i = e + t;
    let n = dn[i];
    return n || (dn[i] = n = new pt(e, t, s)), n;
  }
};
Bs.defaultVertexPrecision = Re.HIGH, /**
* Default specify float precision in fragment shader.
* iOS is best set at highp due to https://github.com/pixijs/pixijs/issues/3742
* @static
* @type {PIXI.PRECISION}
* @default PIXI.PRECISION.MEDIUM
*/
Bs.defaultFragmentPrecision = mt.apple.device ? Re.HIGH : Re.MEDIUM;
let nt = Bs, nh = 0;
class Le {
  /**
   * @param {object | Buffer} [uniforms] - Custom uniforms to use to augment the built-in ones. Or a pixi buffer.
   * @param isStatic - Uniforms wont be changed after creation.
   * @param isUbo - If true, will treat this uniform group as a uniform buffer object.
   */
  constructor(e, t, s) {
    this.group = !0, this.syncUniforms = {}, this.dirtyId = 0, this.id = nh++, this.static = !!t, this.ubo = !!s, e instanceof xe ? (this.buffer = e, this.buffer.type = Ue.UNIFORM_BUFFER, this.autoManage = !1, this.ubo = !0) : (this.uniforms = e, this.ubo && (this.buffer = new xe(new Float32Array(1)), this.buffer.type = Ue.UNIFORM_BUFFER, this.autoManage = !0));
  }
  update() {
    this.dirtyId++, !this.autoManage && this.buffer && this.buffer.update();
  }
  add(e, t, s) {
    if (!this.ubo)
      this.uniforms[e] = new Le(t, s);
    else
      throw new Error("[UniformGroup] uniform groups in ubo mode cannot be modified, or have uniform groups nested in them");
  }
  static from(e, t, s) {
    return new Le(e, t, s);
  }
  /**
   * A short hand function for creating a static UBO UniformGroup.
   * @param uniforms - the ubo item
   * @param _static - should this be updated each time it is used? defaults to true here!
   */
  static uboFrom(e, t) {
    return new Le(e, t ?? !0, !0);
  }
}
class Ar {
  /**
   * @param program - The program the shader will use.
   * @param uniforms - Custom uniforms to use to augment the built-in ones.
   */
  constructor(e, t) {
    this.uniformBindCount = 0, this.program = e, t ? t instanceof Le ? this.uniformGroup = t : this.uniformGroup = new Le(t) : this.uniformGroup = new Le({}), this.disposeRunner = new Oe("disposeShader");
  }
  // TODO move to shader system..
  checkUniformExists(e, t) {
    if (t.uniforms[e])
      return !0;
    for (const s in t.uniforms) {
      const i = t.uniforms[s];
      if (i.group === !0 && this.checkUniformExists(e, i))
        return !0;
    }
    return !1;
  }
  destroy() {
    this.uniformGroup = null, this.disposeRunner.emit(this), this.disposeRunner.destroy();
  }
  /**
   * Shader uniform values, shortcut for `uniformGroup.uniforms`.
   * @readonly
   */
  get uniforms() {
    return this.uniformGroup.uniforms;
  }
  /**
   * A short hand function to create a shader based of a vertex and fragment shader.
   * @param vertexSrc - The source of the vertex shader.
   * @param fragmentSrc - The source of the fragment shader.
   * @param uniforms - Custom uniforms to use to augment the built-in ones.
   * @returns A shiny new PixiJS shader!
   */
  static from(e, t, s) {
    const i = nt.from(e, t);
    return new Ar(i, s);
  }
}
class ah {
  /**
   * @param vertexSrc - Vertex shader
   * @param fragTemplate - Fragment shader template
   */
  constructor(e, t) {
    if (this.vertexSrc = e, this.fragTemplate = t, this.programCache = {}, this.defaultGroupCache = {}, !t.includes("%count%"))
      throw new Error('Fragment template must contain "%count%".');
    if (!t.includes("%forloop%"))
      throw new Error('Fragment template must contain "%forloop%".');
  }
  generateShader(e) {
    if (!this.programCache[e]) {
      const s = new Int32Array(e);
      for (let n = 0; n < e; n++)
        s[n] = n;
      this.defaultGroupCache[e] = Le.from({ uSamplers: s }, !0);
      let i = this.fragTemplate;
      i = i.replace(/%count%/gi, `${e}`), i = i.replace(/%forloop%/gi, this.generateSampleSrc(e)), this.programCache[e] = new nt(this.vertexSrc, i);
    }
    const t = {
      tint: new Float32Array([1, 1, 1, 1]),
      translationMatrix: new Ae(),
      default: this.defaultGroupCache[e]
    };
    return new Ar(this.programCache[e], t);
  }
  generateSampleSrc(e) {
    let t = "";
    t += `
`, t += `
`;
    for (let s = 0; s < e; s++)
      s > 0 && (t += `
else `), s < e - 1 && (t += `if(vTextureId < ${s}.5)`), t += `
{`, t += `
	color = texture2D(uSamplers[${s}], vTextureCoord);`, t += `
}`;
    return t += `
`, t += `
`, t;
  }
}
class oh {
  constructor() {
    this.elements = [], this.ids = [], this.count = 0;
  }
  clear() {
    for (let e = 0; e < this.count; e++)
      this.elements[e] = null;
    this.count = 0;
  }
}
function hh() {
  return !mt.apple.device;
}
function lh(r) {
  let e = !0;
  const t = J.ADAPTER.getNavigator();
  if (mt.tablet || mt.phone) {
    if (mt.apple.device) {
      const s = t.userAgent.match(/OS (\d+)_(\d+)?/);
      s && parseInt(s[1], 10) < 11 && (e = !1);
    }
    if (mt.android.device) {
      const s = t.userAgent.match(/Android\s([0-9.]*)/);
      s && parseInt(s[1], 10) < 7 && (e = !1);
    }
  }
  return e ? r : 4;
}
class jn {
  /**
   * @param renderer - The renderer this manager works for.
   */
  constructor(e) {
    this.renderer = e;
  }
  /** Stub method that should be used to empty the current batch by rendering objects now. */
  flush() {
  }
  /** Generic destruction method that frees all resources. This should be called by subclasses. */
  destroy() {
    this.renderer = null;
  }
  /**
   * Stub method that initializes any state required before
   * rendering starts. It is different from the `prerender`
   * signal, which occurs every frame, in that it is called
   * whenever an object requests _this_ renderer specifically.
   */
  start() {
  }
  /** Stops the renderer. It should free up any state and become dormant. */
  stop() {
    this.flush();
  }
  /**
   * Keeps the object to render. It doesn't have to be
   * rendered immediately.
   * @param {PIXI.DisplayObject} _object - The object to render.
   */
  render(e) {
  }
}
var uh = `varying vec2 vTextureCoord;
varying vec4 vColor;
varying float vTextureId;
uniform sampler2D uSamplers[%count%];

void main(void){
    vec4 color;
    %forloop%
    gl_FragColor = color * vColor;
}
`, ch = `precision highp float;
attribute vec2 aVertexPosition;
attribute vec2 aTextureCoord;
attribute vec4 aColor;
attribute float aTextureId;

uniform mat3 projectionMatrix;
uniform mat3 translationMatrix;
uniform vec4 tint;

varying vec2 vTextureCoord;
varying vec4 vColor;
varying float vTextureId;

void main(void){
    gl_Position = vec4((projectionMatrix * translationMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);

    vTextureCoord = aTextureCoord;
    vTextureId = aTextureId;
    vColor = aColor * tint;
}
`;
const Ot = class Ne extends jn {
  /**
   * This will hook onto the renderer's `contextChange`
   * and `prerender` signals.
   * @param {PIXI.Renderer} renderer - The renderer this works for.
   */
  constructor(e) {
    super(e), this.setShaderGenerator(), this.geometryClass = jo, this.vertexSize = 6, this.state = Tt.for2d(), this.size = Ne.defaultBatchSize * 4, this._vertexCount = 0, this._indexCount = 0, this._bufferedElements = [], this._bufferedTextures = [], this._bufferSize = 0, this._shader = null, this._packedGeometries = [], this._packedGeometryPoolSize = 2, this._flushId = 0, this._aBuffers = {}, this._iBuffers = {}, this.maxTextures = 1, this.renderer.on("prerender", this.onPrerender, this), e.runners.contextChange.add(this), this._dcIndex = 0, this._aIndex = 0, this._iIndex = 0, this._attributeBuffer = null, this._indexBuffer = null, this._tempBoundTextures = [];
  }
  /**
   * The maximum textures that this device supports.
   * @static
   * @default 32
   */
  static get defaultMaxTextures() {
    return this._defaultMaxTextures = this._defaultMaxTextures ?? lh(32), this._defaultMaxTextures;
  }
  static set defaultMaxTextures(e) {
    this._defaultMaxTextures = e;
  }
  /**
   * Can we upload the same buffer in a single frame?
   * @static
   */
  static get canUploadSameBuffer() {
    return this._canUploadSameBuffer = this._canUploadSameBuffer ?? hh(), this._canUploadSameBuffer;
  }
  static set canUploadSameBuffer(e) {
    this._canUploadSameBuffer = e;
  }
  /**
   * @see PIXI.BatchRenderer#maxTextures
   * @deprecated since 7.1.0
   * @readonly
   */
  get MAX_TEXTURES() {
    return ue("7.1.0", "BatchRenderer#MAX_TEXTURES renamed to BatchRenderer#maxTextures"), this.maxTextures;
  }
  /**
   * The default vertex shader source
   * @readonly
   */
  static get defaultVertexSrc() {
    return ch;
  }
  /**
   * The default fragment shader source
   * @readonly
   */
  static get defaultFragmentTemplate() {
    return uh;
  }
  /**
   * Set the shader generator.
   * @param {object} [options]
   * @param {string} [options.vertex=PIXI.BatchRenderer.defaultVertexSrc] - Vertex shader source
   * @param {string} [options.fragment=PIXI.BatchRenderer.defaultFragmentTemplate] - Fragment shader template
   */
  setShaderGenerator({
    vertex: e = Ne.defaultVertexSrc,
    fragment: t = Ne.defaultFragmentTemplate
  } = {}) {
    this.shaderGenerator = new ah(e, t);
  }
  /**
   * Handles the `contextChange` signal.
   *
   * It calculates `this.maxTextures` and allocating the packed-geometry object pool.
   */
  contextChange() {
    const e = this.renderer.gl;
    J.PREFER_ENV === ot.WEBGL_LEGACY ? this.maxTextures = 1 : (this.maxTextures = Math.min(
      e.getParameter(e.MAX_TEXTURE_IMAGE_UNITS),
      Ne.defaultMaxTextures
    ), this.maxTextures = Lo(
      this.maxTextures,
      e
    )), this._shader = this.shaderGenerator.generateShader(this.maxTextures);
    for (let t = 0; t < this._packedGeometryPoolSize; t++)
      this._packedGeometries[t] = new this.geometryClass();
    this.initFlushBuffers();
  }
  /** Makes sure that static and dynamic flush pooled objects have correct dimensions. */
  initFlushBuffers() {
    const {
      _drawCallPool: e,
      _textureArrayPool: t
    } = Ne, s = this.size / 4, i = Math.floor(s / this.maxTextures) + 1;
    for (; e.length < s; )
      e.push(new Go());
    for (; t.length < i; )
      t.push(new oh());
    for (let n = 0; n < this.maxTextures; n++)
      this._tempBoundTextures[n] = null;
  }
  /** Handles the `prerender` signal. It ensures that flushes start from the first geometry object again. */
  onPrerender() {
    this._flushId = 0;
  }
  /**
   * Buffers the "batchable" object. It need not be rendered immediately.
   * @param {PIXI.DisplayObject} element - the element to render when
   *    using this renderer
   */
  render(e) {
    e._texture.valid && (this._vertexCount + e.vertexData.length / 2 > this.size && this.flush(), this._vertexCount += e.vertexData.length / 2, this._indexCount += e.indices.length, this._bufferedTextures[this._bufferSize] = e._texture.baseTexture, this._bufferedElements[this._bufferSize++] = e);
  }
  buildTexturesAndDrawCalls() {
    const {
      _bufferedTextures: e,
      maxTextures: t
    } = this, s = Ne._textureArrayPool, i = this.renderer.batch, n = this._tempBoundTextures, a = this.renderer.textureGC.count;
    let o = ++he._globalBatch, h = 0, l = s[0], c = 0;
    i.copyBoundTextures(n, t);
    for (let g = 0; g < this._bufferSize; ++g) {
      const x = e[g];
      e[g] = null, x._batchEnabled !== o && (l.count >= t && (i.boundArray(l, n, o, t), this.buildDrawCalls(l, c, g), c = g, l = s[++h], ++o), x._batchEnabled = o, x.touched = a, l.elements[l.count++] = x);
    }
    l.count > 0 && (i.boundArray(l, n, o, t), this.buildDrawCalls(l, c, this._bufferSize), ++h, ++o);
    for (let g = 0; g < n.length; g++)
      n[g] = null;
    he._globalBatch = o;
  }
  /**
   * Populating drawcalls for rendering
   * @param texArray
   * @param start
   * @param finish
   */
  buildDrawCalls(e, t, s) {
    const {
      _bufferedElements: i,
      _attributeBuffer: n,
      _indexBuffer: a,
      vertexSize: o
    } = this, h = Ne._drawCallPool;
    let l = this._dcIndex, c = this._aIndex, g = this._iIndex, x = h[l];
    x.start = this._iIndex, x.texArray = e;
    for (let b = t; b < s; ++b) {
      const F = i[b], C = F._texture.baseTexture, f = No[C.alphaMode ? 1 : 0][F.blendMode];
      i[b] = null, t < b && x.blend !== f && (x.size = g - x.start, t = b, x = h[++l], x.texArray = e, x.start = g), this.packInterleavedGeometry(F, n, a, c, g), c += F.vertexData.length / 2 * o, g += F.indices.length, x.blend = f;
    }
    t < s && (x.size = g - x.start, ++l), this._dcIndex = l, this._aIndex = c, this._iIndex = g;
  }
  /**
   * Bind textures for current rendering
   * @param texArray
   */
  bindAndClearTexArray(e) {
    const t = this.renderer.texture;
    for (let s = 0; s < e.count; s++)
      t.bind(e.elements[s], e.ids[s]), e.elements[s] = null;
    e.count = 0;
  }
  updateGeometry() {
    const {
      _packedGeometries: e,
      _attributeBuffer: t,
      _indexBuffer: s
    } = this;
    Ne.canUploadSameBuffer ? (e[this._flushId]._buffer.update(t.rawBinaryData), e[this._flushId]._indexBuffer.update(s), this.renderer.geometry.updateBuffers()) : (this._packedGeometryPoolSize <= this._flushId && (this._packedGeometryPoolSize++, e[this._flushId] = new this.geometryClass()), e[this._flushId]._buffer.update(t.rawBinaryData), e[this._flushId]._indexBuffer.update(s), this.renderer.geometry.bind(e[this._flushId]), this.renderer.geometry.updateBuffers(), this._flushId++);
  }
  drawBatches() {
    const e = this._dcIndex, { gl: t, state: s } = this.renderer, i = Ne._drawCallPool;
    let n = null;
    for (let a = 0; a < e; a++) {
      const { texArray: o, type: h, size: l, start: c, blend: g } = i[a];
      n !== o && (n = o, this.bindAndClearTexArray(o)), this.state.blendMode = g, s.set(this.state), t.drawElements(h, l, t.UNSIGNED_SHORT, c * 2);
    }
  }
  /** Renders the content _now_ and empties the current batch. */
  flush() {
    this._vertexCount !== 0 && (this._attributeBuffer = this.getAttributeBuffer(this._vertexCount), this._indexBuffer = this.getIndexBuffer(this._indexCount), this._aIndex = 0, this._iIndex = 0, this._dcIndex = 0, this.buildTexturesAndDrawCalls(), this.updateGeometry(), this.drawBatches(), this._bufferSize = 0, this._vertexCount = 0, this._indexCount = 0);
  }
  /** Starts a new sprite batch. */
  start() {
    this.renderer.state.set(this.state), this.renderer.texture.ensureSamplerType(this.maxTextures), this.renderer.shader.bind(this._shader), Ne.canUploadSameBuffer && this.renderer.geometry.bind(this._packedGeometries[this._flushId]);
  }
  /** Stops and flushes the current batch. */
  stop() {
    this.flush();
  }
  /** Destroys this `BatchRenderer`. It cannot be used again. */
  destroy() {
    for (let e = 0; e < this._packedGeometryPoolSize; e++)
      this._packedGeometries[e] && this._packedGeometries[e].destroy();
    this.renderer.off("prerender", this.onPrerender, this), this._aBuffers = null, this._iBuffers = null, this._packedGeometries = null, this._attributeBuffer = null, this._indexBuffer = null, this._shader && (this._shader.destroy(), this._shader = null), super.destroy();
  }
  /**
   * Fetches an attribute buffer from `this._aBuffers` that can hold atleast `size` floats.
   * @param size - minimum capacity required
   * @returns - buffer than can hold atleast `size` floats
   */
  getAttributeBuffer(e) {
    const t = cr(Math.ceil(e / 8)), s = cn(t), i = t * 8;
    this._aBuffers.length <= s && (this._iBuffers.length = s + 1);
    let n = this._aBuffers[i];
    return n || (this._aBuffers[i] = n = new Bo(i * this.vertexSize * 4)), n;
  }
  /**
   * Fetches an index buffer from `this._iBuffers` that can
   * have at least `size` capacity.
   * @param size - minimum required capacity
   * @returns - buffer that can fit `size` indices.
   */
  getIndexBuffer(e) {
    const t = cr(Math.ceil(e / 12)), s = cn(t), i = t * 12;
    this._iBuffers.length <= s && (this._iBuffers.length = s + 1);
    let n = this._iBuffers[s];
    return n || (this._iBuffers[s] = n = new Uint16Array(i)), n;
  }
  /**
   * Takes the four batching parameters of `element`, interleaves
   * and pushes them into the batching attribute/index buffers given.
   *
   * It uses these properties: `vertexData` `uvs`, `textureId` and
   * `indicies`. It also uses the "tint" of the base-texture, if
   * present.
   * @param {PIXI.DisplayObject} element - element being rendered
   * @param attributeBuffer - attribute buffer.
   * @param indexBuffer - index buffer
   * @param aIndex - number of floats already in the attribute buffer
   * @param iIndex - number of indices already in `indexBuffer`
   */
  packInterleavedGeometry(e, t, s, i, n) {
    const {
      uint32View: a,
      float32View: o
    } = t, h = i / this.vertexSize, l = e.uvs, c = e.indices, g = e.vertexData, x = e._texture.baseTexture._batchLocation, b = Math.min(e.worldAlpha, 1), F = _r.shared.setValue(e._tintRGB).toPremultiplied(b, e._texture.baseTexture.alphaMode > 0);
    for (let C = 0; C < g.length; C += 2)
      o[i++] = g[C], o[i++] = g[C + 1], o[i++] = l[C], o[i++] = l[C + 1], a[i++] = F, o[i++] = x;
    for (let C = 0; C < c.length; C++)
      s[n++] = h + c[C];
  }
};
Ot.defaultBatchSize = 4096, /** @ignore */
Ot.extension = {
  name: "batch",
  type: j.RendererPlugin
}, /**
* Pool of `BatchDrawCall` objects that `flush` used
* to create "batches" of the objects being rendered.
*
* These are never re-allocated again.
* Shared between all batch renderers because it can be only one "flush" working at the moment.
* @member {PIXI.BatchDrawCall[]}
*/
Ot._drawCallPool = [], /**
* Pool of `BatchDrawCall` objects that `flush` used
* to create "batches" of the objects being rendered.
*
* These are never re-allocated again.
* Shared between all batch renderers because it can be only one "flush" working at the moment.
* @member {PIXI.BatchTextureArray[]}
*/
Ot._textureArrayPool = [];
let tt = Ot;
Z.add(tt);
var dh = `varying vec2 vTextureCoord;

uniform sampler2D uSampler;

void main(void){
   gl_FragColor = texture2D(uSampler, vTextureCoord);
}
`, fh = `attribute vec2 aVertexPosition;

uniform mat3 projectionMatrix;

varying vec2 vTextureCoord;

uniform vec4 inputSize;
uniform vec4 outputFrame;

vec4 filterVertexPosition( void )
{
    vec2 position = aVertexPosition * max(outputFrame.zw, vec2(0.)) + outputFrame.xy;

    return vec4((projectionMatrix * vec3(position, 1.0)).xy, 0.0, 1.0);
}

vec2 filterTextureCoord( void )
{
    return aVertexPosition * (outputFrame.zw * inputSize.zw);
}

void main(void)
{
    gl_Position = filterVertexPosition();
    vTextureCoord = filterTextureCoord();
}
`;
const Ms = class Bt extends Ar {
  /**
   * @param vertexSrc - The source of the vertex shader.
   * @param fragmentSrc - The source of the fragment shader.
   * @param uniforms - Custom uniforms to use to augment the built-in ones.
   */
  constructor(e, t, s) {
    const i = nt.from(
      e || Bt.defaultVertexSrc,
      t || Bt.defaultFragmentSrc
    );
    super(i, s), this.padding = 0, this.resolution = Bt.defaultResolution, this.multisample = Bt.defaultMultisample, this.enabled = !0, this.autoFit = !0, this.state = new Tt();
  }
  /**
   * Applies the filter
   * @param {PIXI.FilterSystem} filterManager - The renderer to retrieve the filter from
   * @param {PIXI.RenderTexture} input - The input render target.
   * @param {PIXI.RenderTexture} output - The target to output to.
   * @param {PIXI.CLEAR_MODES} [clearMode] - Should the output be cleared before rendering to it.
   * @param {object} [_currentState] - It's current state of filter.
   *        There are some useful properties in the currentState :
   *        target, filters, sourceFrame, destinationFrame, renderTarget, resolution
   */
  apply(e, t, s, i, n) {
    e.applyFilter(this, t, s, i);
  }
  /**
   * Sets the blend mode of the filter.
   * @default PIXI.BLEND_MODES.NORMAL
   */
  get blendMode() {
    return this.state.blendMode;
  }
  set blendMode(e) {
    this.state.blendMode = e;
  }
  /**
   * The resolution of the filter. Setting this to be lower will lower the quality but
   * increase the performance of the filter.
   * If set to `null` or `0`, the resolution of the current render target is used.
   * @default PIXI.Filter.defaultResolution
   */
  get resolution() {
    return this._resolution;
  }
  set resolution(e) {
    this._resolution = e;
  }
  /**
   * The default vertex shader source
   * @readonly
   */
  static get defaultVertexSrc() {
    return fh;
  }
  /**
   * The default fragment shader source
   * @readonly
   */
  static get defaultFragmentSrc() {
    return dh;
  }
};
Ms.defaultResolution = 1, /**
* Default filter samples for any filter.
* @static
* @type {PIXI.MSAA_QUALITY|null}
* @default PIXI.MSAA_QUALITY.NONE
*/
Ms.defaultMultisample = ge.NONE;
let yt = Ms;
class fr {
  constructor() {
    this.clearBeforeRender = !0, this._backgroundColor = new _r(0), this.alpha = 1;
  }
  /**
   * initiates the background system
   * @param {PIXI.IRendererOptions} options - the options for the background colors
   */
  init(e) {
    this.clearBeforeRender = e.clearBeforeRender;
    const { backgroundColor: t, background: s, backgroundAlpha: i } = e, n = s ?? t;
    n !== void 0 && (this.color = n), this.alpha = i;
  }
  /**
   * The background color to fill if not transparent.
   * @member {PIXI.ColorSource}
   */
  get color() {
    return this._backgroundColor.value;
  }
  set color(e) {
    this._backgroundColor.setValue(e);
  }
  /**
   * The background color alpha. Setting this to 0 will make the canvas transparent.
   * @member {number}
   */
  get alpha() {
    return this._backgroundColor.alpha;
  }
  set alpha(e) {
    this._backgroundColor.setAlpha(e);
  }
  /** The background color object. */
  get backgroundColor() {
    return this._backgroundColor;
  }
  destroy() {
  }
}
fr.defaultOptions = {
  /**
   * {@link PIXI.IRendererOptions.backgroundAlpha}
   * @default 1
   * @memberof PIXI.settings.RENDER_OPTIONS
   */
  backgroundAlpha: 1,
  /**
   * {@link PIXI.IRendererOptions.backgroundColor}
   * @default 0x000000
   * @memberof PIXI.settings.RENDER_OPTIONS
   */
  backgroundColor: 0,
  /**
   * {@link PIXI.IRendererOptions.clearBeforeRender}
   * @default true
   * @memberof PIXI.settings.RENDER_OPTIONS
   */
  clearBeforeRender: !0
}, /** @ignore */
fr.extension = {
  type: [
    j.RendererSystem,
    j.CanvasRendererSystem
  ],
  name: "background"
};
Z.add(fr);
class Xn {
  /**
   * @param renderer - The renderer this System works for.
   */
  constructor(e) {
    this.renderer = e, this.emptyRenderer = new jn(e), this.currentRenderer = this.emptyRenderer;
  }
  /**
   * Changes the current renderer to the one given in parameter
   * @param objectRenderer - The object renderer to use.
   */
  setObjectRenderer(e) {
    this.currentRenderer !== e && (this.currentRenderer.stop(), this.currentRenderer = e, this.currentRenderer.start());
  }
  /**
   * This should be called if you wish to do some custom rendering
   * It will basically render anything that may be batched up such as sprites
   */
  flush() {
    this.setObjectRenderer(this.emptyRenderer);
  }
  /** Reset the system to an empty renderer */
  reset() {
    this.setObjectRenderer(this.emptyRenderer);
  }
  /**
   * Handy function for batch renderers: copies bound textures in first maxTextures locations to array
   * sets actual _batchLocation for them
   * @param arr - arr copy destination
   * @param maxTextures - number of copied elements
   */
  copyBoundTextures(e, t) {
    const { boundTextures: s } = this.renderer.texture;
    for (let i = t - 1; i >= 0; --i)
      e[i] = s[i] || null, e[i] && (e[i]._batchLocation = i);
  }
  /**
   * Assigns batch locations to textures in array based on boundTextures state.
   * All textures in texArray should have `_batchEnabled = _batchId`,
   * and their count should be less than `maxTextures`.
   * @param texArray - textures to bound
   * @param boundTextures - current state of bound textures
   * @param batchId - marker for _batchEnabled param of textures in texArray
   * @param maxTextures - number of texture locations to manipulate
   */
  boundArray(e, t, s, i) {
    const { elements: n, ids: a, count: o } = e;
    let h = 0;
    for (let l = 0; l < o; l++) {
      const c = n[l], g = c._batchLocation;
      if (g >= 0 && g < i && t[g] === c) {
        a[l] = g;
        continue;
      }
      for (; h < i; ) {
        const x = t[h];
        if (x && x._batchEnabled === s && x._batchLocation === h) {
          h++;
          continue;
        }
        a[l] = h, c._batchLocation = h, t[h] = c;
        break;
      }
    }
  }
  /**
   * @ignore
   */
  destroy() {
    this.renderer = null;
  }
}
Xn.extension = {
  type: j.RendererSystem,
  name: "batch"
};
Z.add(Xn);
let vn = 0;
class pr {
  /** @param renderer - The renderer this System works for. */
  constructor(e) {
    this.renderer = e, this.webGLVersion = 1, this.extensions = {}, this.supports = {
      uint32Indices: !1
    }, this.handleContextLost = this.handleContextLost.bind(this), this.handleContextRestored = this.handleContextRestored.bind(this);
  }
  /**
   * `true` if the context is lost
   * @readonly
   */
  get isLost() {
    return !this.gl || this.gl.isContextLost();
  }
  /**
   * Handles the context change event.
   * @param {WebGLRenderingContext} gl - New WebGL context.
   */
  contextChange(e) {
    this.gl = e, this.renderer.gl = e, this.renderer.CONTEXT_UID = vn++;
  }
  init(e) {
    if (e.context)
      this.initFromContext(e.context);
    else {
      const t = this.renderer.background.alpha < 1, s = e.premultipliedAlpha;
      this.preserveDrawingBuffer = e.preserveDrawingBuffer, this.useContextAlpha = e.useContextAlpha, this.powerPreference = e.powerPreference, this.initFromOptions({
        alpha: t,
        premultipliedAlpha: s,
        antialias: e.antialias,
        stencil: !0,
        preserveDrawingBuffer: e.preserveDrawingBuffer,
        powerPreference: e.powerPreference
      });
    }
  }
  /**
   * Initializes the context.
   * @protected
   * @param {WebGLRenderingContext} gl - WebGL context
   */
  initFromContext(e) {
    this.gl = e, this.validateContext(e), this.renderer.gl = e, this.renderer.CONTEXT_UID = vn++, this.renderer.runners.contextChange.emit(e);
    const t = this.renderer.view;
    t.addEventListener !== void 0 && (t.addEventListener("webglcontextlost", this.handleContextLost, !1), t.addEventListener("webglcontextrestored", this.handleContextRestored, !1));
  }
  /**
   * Initialize from context options
   * @protected
   * @see https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/getContext
   * @param {object} options - context attributes
   */
  initFromOptions(e) {
    const t = this.createContext(this.renderer.view, e);
    this.initFromContext(t);
  }
  /**
   * Helper class to create a WebGL Context
   * @param canvas - the canvas element that we will get the context from
   * @param options - An options object that gets passed in to the canvas element containing the
   *    context attributes
   * @see https://developer.mozilla.org/en/docs/Web/API/HTMLCanvasElement/getContext
   * @returns {WebGLRenderingContext} the WebGL context
   */
  createContext(e, t) {
    let s;
    if (J.PREFER_ENV >= ot.WEBGL2 && (s = e.getContext("webgl2", t)), s)
      this.webGLVersion = 2;
    else if (this.webGLVersion = 1, s = e.getContext("webgl", t) || e.getContext("experimental-webgl", t), !s)
      throw new Error("This browser does not support WebGL. Try using the canvas renderer");
    return this.gl = s, this.getExtensions(), this.gl;
  }
  /** Auto-populate the {@link PIXI.ContextSystem.extensions extensions}. */
  getExtensions() {
    const { gl: e } = this, t = {
      loseContext: e.getExtension("WEBGL_lose_context"),
      anisotropicFiltering: e.getExtension("EXT_texture_filter_anisotropic"),
      floatTextureLinear: e.getExtension("OES_texture_float_linear"),
      s3tc: e.getExtension("WEBGL_compressed_texture_s3tc"),
      s3tc_sRGB: e.getExtension("WEBGL_compressed_texture_s3tc_srgb"),
      // eslint-disable-line camelcase
      etc: e.getExtension("WEBGL_compressed_texture_etc"),
      etc1: e.getExtension("WEBGL_compressed_texture_etc1"),
      pvrtc: e.getExtension("WEBGL_compressed_texture_pvrtc") || e.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc"),
      atc: e.getExtension("WEBGL_compressed_texture_atc"),
      astc: e.getExtension("WEBGL_compressed_texture_astc"),
      bptc: e.getExtension("EXT_texture_compression_bptc")
    };
    this.webGLVersion === 1 ? Object.assign(this.extensions, t, {
      drawBuffers: e.getExtension("WEBGL_draw_buffers"),
      depthTexture: e.getExtension("WEBGL_depth_texture"),
      vertexArrayObject: e.getExtension("OES_vertex_array_object") || e.getExtension("MOZ_OES_vertex_array_object") || e.getExtension("WEBKIT_OES_vertex_array_object"),
      uint32ElementIndex: e.getExtension("OES_element_index_uint"),
      // Floats and half-floats
      floatTexture: e.getExtension("OES_texture_float"),
      floatTextureLinear: e.getExtension("OES_texture_float_linear"),
      textureHalfFloat: e.getExtension("OES_texture_half_float"),
      textureHalfFloatLinear: e.getExtension("OES_texture_half_float_linear")
    }) : this.webGLVersion === 2 && Object.assign(this.extensions, t, {
      // Floats and half-floats
      colorBufferFloat: e.getExtension("EXT_color_buffer_float")
    });
  }
  /**
   * Handles a lost webgl context
   * @param {WebGLContextEvent} event - The context lost event.
   */
  handleContextLost(e) {
    e.preventDefault(), setTimeout(() => {
      this.gl.isContextLost() && this.extensions.loseContext && this.extensions.loseContext.restoreContext();
    }, 0);
  }
  /** Handles a restored webgl context. */
  handleContextRestored() {
    this.renderer.runners.contextChange.emit(this.gl);
  }
  destroy() {
    const e = this.renderer.view;
    this.renderer = null, e.removeEventListener !== void 0 && (e.removeEventListener("webglcontextlost", this.handleContextLost), e.removeEventListener("webglcontextrestored", this.handleContextRestored)), this.gl.useProgram(null), this.extensions.loseContext && this.extensions.loseContext.loseContext();
  }
  /** Handle the post-render runner event. */
  postrender() {
    this.renderer.objectRenderer.renderingToScreen && this.gl.flush();
  }
  /**
   * Validate context.
   * @param {WebGLRenderingContext} gl - Render context.
   */
  validateContext(e) {
    const t = e.getContextAttributes(), s = "WebGL2RenderingContext" in globalThis && e instanceof globalThis.WebGL2RenderingContext;
    s && (this.webGLVersion = 2), t && !t.stencil && console.warn("Provided WebGL context does not have a stencil buffer, masks may not render correctly");
    const i = s || !!e.getExtension("OES_element_index_uint");
    this.supports.uint32Indices = i, i || console.warn("Provided WebGL context does not support 32 index buffer, complex graphics may not render correctly");
  }
}
pr.defaultOptions = {
  /**
   * {@link PIXI.IRendererOptions.context}
   * @default null
   * @memberof PIXI.settings.RENDER_OPTIONS
   */
  context: null,
  /**
   * {@link PIXI.IRendererOptions.antialias}
   * @default false
   * @memberof PIXI.settings.RENDER_OPTIONS
   */
  antialias: !1,
  /**
   * {@link PIXI.IRendererOptions.premultipliedAlpha}
   * @default true
   * @memberof PIXI.settings.RENDER_OPTIONS
   */
  premultipliedAlpha: !0,
  /**
   * {@link PIXI.IRendererOptions.preserveDrawingBuffer}
   * @default false
   * @memberof PIXI.settings.RENDER_OPTIONS
   */
  preserveDrawingBuffer: !1,
  /**
   * {@link PIXI.IRendererOptions.powerPreference}
   * @default default
   * @memberof PIXI.settings.RENDER_OPTIONS
   */
  powerPreference: "default"
}, /** @ignore */
pr.extension = {
  type: j.RendererSystem,
  name: "context"
};
Z.add(pr);
class Us {
  /**
   * @param width - Width of the frame buffer
   * @param height - Height of the frame buffer
   */
  constructor(e, t) {
    if (this.width = Math.round(e), this.height = Math.round(t), !this.width || !this.height)
      throw new Error("Framebuffer width or height is zero");
    this.stencil = !1, this.depth = !1, this.dirtyId = 0, this.dirtyFormat = 0, this.dirtySize = 0, this.depthTexture = null, this.colorTextures = [], this.glFramebuffers = {}, this.disposeRunner = new Oe("disposeFramebuffer"), this.multisample = ge.NONE;
  }
  /**
   * Reference to the colorTexture.
   * @readonly
   */
  get colorTexture() {
    return this.colorTextures[0];
  }
  /**
   * Add texture to the colorTexture array.
   * @param index - Index of the array to add the texture to
   * @param texture - Texture to add to the array
   */
  addColorTexture(e = 0, t) {
    return this.colorTextures[e] = t || new he(null, {
      scaleMode: De.NEAREST,
      resolution: 1,
      mipmap: at.OFF,
      width: this.width,
      height: this.height
    }), this.dirtyId++, this.dirtyFormat++, this;
  }
  /**
   * Add a depth texture to the frame buffer.
   * @param texture - Texture to add.
   */
  addDepthTexture(e) {
    return this.depthTexture = e || new he(null, {
      scaleMode: De.NEAREST,
      resolution: 1,
      width: this.width,
      height: this.height,
      mipmap: at.OFF,
      format: L.DEPTH_COMPONENT,
      type: se.UNSIGNED_SHORT
    }), this.dirtyId++, this.dirtyFormat++, this;
  }
  /** Enable depth on the frame buffer. */
  enableDepth() {
    return this.depth = !0, this.dirtyId++, this.dirtyFormat++, this;
  }
  /** Enable stencil on the frame buffer. */
  enableStencil() {
    return this.stencil = !0, this.dirtyId++, this.dirtyFormat++, this;
  }
  /**
   * Resize the frame buffer
   * @param width - Width of the frame buffer to resize to
   * @param height - Height of the frame buffer to resize to
   */
  resize(e, t) {
    if (e = Math.round(e), t = Math.round(t), !e || !t)
      throw new Error("Framebuffer width and height must not be zero");
    if (!(e === this.width && t === this.height)) {
      this.width = e, this.height = t, this.dirtyId++, this.dirtySize++;
      for (let s = 0; s < this.colorTextures.length; s++) {
        const i = this.colorTextures[s], n = i.resolution;
        i.setSize(e / n, t / n);
      }
      if (this.depthTexture) {
        const s = this.depthTexture.resolution;
        this.depthTexture.setSize(e / s, t / s);
      }
    }
  }
  /** Disposes WebGL resources that are connected to this geometry. */
  dispose() {
    this.disposeRunner.emit(this, !1);
  }
  /** Destroys and removes the depth texture added to this framebuffer. */
  destroyDepthTexture() {
    this.depthTexture && (this.depthTexture.destroy(), this.depthTexture = null, ++this.dirtyId, ++this.dirtyFormat);
  }
}
class zn extends he {
  /**
   * @param options
   * @param {number} [options.width=100] - The width of the base render texture.
   * @param {number} [options.height=100] - The height of the base render texture.
   * @param {PIXI.SCALE_MODES} [options.scaleMode=PIXI.BaseTexture.defaultOptions.scaleMode] - See {@link PIXI.SCALE_MODES}
   *   for possible values.
   * @param {number} [options.resolution=PIXI.settings.RESOLUTION] - The resolution / device pixel ratio
   *   of the texture being generated.
   * @param {PIXI.MSAA_QUALITY} [options.multisample=PIXI.MSAA_QUALITY.NONE] - The number of samples of the frame buffer.
   */
  constructor(e = {}) {
    if (typeof e == "number") {
      const t = arguments[0], s = arguments[1], i = arguments[2], n = arguments[3];
      e = { width: t, height: s, scaleMode: i, resolution: n };
    }
    e.width = e.width ?? 100, e.height = e.height ?? 100, e.multisample ?? (e.multisample = ge.NONE), super(null, e), this.mipmap = at.OFF, this.valid = !0, this._clear = new _r([0, 0, 0, 0]), this.framebuffer = new Us(this.realWidth, this.realHeight).addColorTexture(0, this), this.framebuffer.multisample = e.multisample, this.maskStack = [], this.filterStack = [{}];
  }
  /** Color when clearning the texture. */
  set clearColor(e) {
    this._clear.setValue(e);
  }
  get clearColor() {
    return this._clear.value;
  }
  /**
   * Color object when clearning the texture.
   * @readonly
   * @since 7.2.0
   */
  get clear() {
    return this._clear;
  }
  /**
   * Shortcut to `this.framebuffer.multisample`.
   * @default PIXI.MSAA_QUALITY.NONE
   */
  get multisample() {
    return this.framebuffer.multisample;
  }
  set multisample(e) {
    this.framebuffer.multisample = e;
  }
  /**
   * Resizes the BaseRenderTexture.
   * @param desiredWidth - The desired width to resize to.
   * @param desiredHeight - The desired height to resize to.
   */
  resize(e, t) {
    this.framebuffer.resize(e * this.resolution, t * this.resolution), this.setRealSize(this.framebuffer.width, this.framebuffer.height);
  }
  /**
   * Frees the texture and framebuffer from WebGL memory without destroying this texture object.
   * This means you can still use the texture later which will upload it to GPU
   * memory again.
   * @fires PIXI.BaseTexture#dispose
   */
  dispose() {
    this.framebuffer.dispose(), super.dispose();
  }
  /** Destroys this texture. */
  destroy() {
    super.destroy(), this.framebuffer.destroyDepthTexture(), this.framebuffer = null;
  }
}
class He extends Dt {
  /**
   * @param {PIXI.ImageSourcee} source
   */
  constructor(e) {
    const t = e, s = t.naturalWidth || t.videoWidth || t.displayWidth || t.width, i = t.naturalHeight || t.videoHeight || t.displayHeight || t.height;
    super(s, i), this.source = e, this.noSubImage = !1;
  }
  /**
   * Set cross origin based detecting the url and the crossorigin
   * @param element - Element to apply crossOrigin
   * @param url - URL to check
   * @param crossorigin - Cross origin value to use
   */
  static crossOrigin(e, t, s) {
    s === void 0 && !t.startsWith("data:") ? e.crossOrigin = Oo(t) : s !== !1 && (e.crossOrigin = typeof s == "string" ? s : "anonymous");
  }
  /**
   * Upload the texture to the GPU.
   * @param renderer - Upload to the renderer
   * @param baseTexture - Reference to parent texture
   * @param glTexture
   * @param {PIXI.ImageSourcee} [source] - (optional)
   * @returns - true is success
   */
  upload(e, t, s, i) {
    const n = e.gl, a = t.realWidth, o = t.realHeight;
    if (i = i || this.source, typeof HTMLImageElement < "u" && i instanceof HTMLImageElement) {
      if (!i.complete || i.naturalWidth === 0)
        return !1;
    } else if (typeof HTMLVideoElement < "u" && i instanceof HTMLVideoElement && i.readyState <= 1)
      return !1;
    return n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL, t.alphaMode === Pe.UNPACK), !this.noSubImage && t.target === n.TEXTURE_2D && s.width === a && s.height === o ? n.texSubImage2D(n.TEXTURE_2D, 0, 0, 0, t.format, s.type, i) : (s.width = a, s.height = o, n.texImage2D(t.target, 0, s.internalFormat, t.format, s.type, i)), !0;
  }
  /**
   * Checks if source width/height was changed, resize can cause extra baseTexture update.
   * Triggers one update in any case.
   */
  update() {
    if (this.destroyed)
      return;
    const e = this.source, t = e.naturalWidth || e.videoWidth || e.width, s = e.naturalHeight || e.videoHeight || e.height;
    this.resize(t, s), super.update();
  }
  /** Destroy this {@link PIXI.BaseImageResource} */
  dispose() {
    this.source = null;
  }
}
class qn extends He {
  /**
   * @param source - image source or URL
   * @param options
   * @param {boolean} [options.autoLoad=true] - start loading process
   * @param {boolean} [options.createBitmap=PIXI.settings.CREATE_IMAGE_BITMAP] - whether its required to create
   *        a bitmap before upload
   * @param {boolean} [options.crossorigin=true] - Load image using cross origin
   * @param {PIXI.ALPHA_MODES} [options.alphaMode=PIXI.ALPHA_MODES.UNPACK] - Premultiply image alpha in bitmap
   */
  constructor(e, t) {
    if (t = t || {}, typeof e == "string") {
      const s = new Image();
      He.crossOrigin(s, e, t.crossorigin), s.src = e, e = s;
    }
    super(e), !e.complete && this._width && this._height && (this._width = 0, this._height = 0), this.url = e.src, this._process = null, this.preserveBitmap = !1, this.createBitmap = (t.createBitmap ?? J.CREATE_IMAGE_BITMAP) && !!globalThis.createImageBitmap, this.alphaMode = typeof t.alphaMode == "number" ? t.alphaMode : null, this.bitmap = null, this._load = null, t.autoLoad !== !1 && this.load();
  }
  /**
   * Returns a promise when image will be loaded and processed.
   * @param createBitmap - whether process image into bitmap
   */
  load(e) {
    return this._load ? this._load : (e !== void 0 && (this.createBitmap = e), this._load = new Promise((t, s) => {
      const i = this.source;
      this.url = i.src;
      const n = () => {
        this.destroyed || (i.onload = null, i.onerror = null, this.update(), this._load = null, this.createBitmap ? t(this.process()) : t(this));
      };
      i.complete && i.src ? n() : (i.onload = n, i.onerror = (a) => {
        s(a), this.onError.emit(a);
      });
    }), this._load);
  }
  /**
   * Called when we need to convert image into BitmapImage.
   * Can be called multiple times, real promise is cached inside.
   * @returns - Cached promise to fill that bitmap
   */
  process() {
    const e = this.source;
    if (this._process !== null)
      return this._process;
    if (this.bitmap !== null || !globalThis.createImageBitmap)
      return Promise.resolve(this);
    const t = globalThis.createImageBitmap, s = !e.crossOrigin || e.crossOrigin === "anonymous";
    return this._process = fetch(
      e.src,
      {
        mode: s ? "cors" : "no-cors"
      }
    ).then((i) => i.blob()).then((i) => t(
      i,
      0,
      0,
      e.width,
      e.height,
      {
        premultiplyAlpha: this.alphaMode === null || this.alphaMode === Pe.UNPACK ? "premultiply" : "none"
      }
    )).then((i) => this.destroyed ? Promise.reject() : (this.bitmap = i, this.update(), this._process = null, Promise.resolve(this))), this._process;
  }
  /**
   * Upload the image resource to GPU.
   * @param renderer - Renderer to upload to
   * @param baseTexture - BaseTexture for this resource
   * @param glTexture - GLTexture to use
   * @returns {boolean} true is success
   */
  upload(e, t, s) {
    if (typeof this.alphaMode == "number" && (t.alphaMode = this.alphaMode), !this.createBitmap)
      return super.upload(e, t, s);
    if (!this.bitmap && (this.process(), !this.bitmap))
      return !1;
    if (super.upload(e, t, s, this.bitmap), !this.preserveBitmap) {
      let i = !0;
      const n = t._glTextures;
      for (const a in n) {
        const o = n[a];
        if (o !== s && o.dirtyId !== t.dirtyId) {
          i = !1;
          break;
        }
      }
      i && (this.bitmap.close && this.bitmap.close(), this.bitmap = null);
    }
    return !0;
  }
  /** Destroys this resource. */
  dispose() {
    this.source.onload = null, this.source.onerror = null, super.dispose(), this.bitmap && (this.bitmap.close(), this.bitmap = null), this._process = null, this._load = null;
  }
  /**
   * Used to auto-detect the type of resource.
   * @param {*} source - The source object
   * @returns {boolean} `true` if current environment support HTMLImageElement, and source is string or HTMLImageElement
   */
  static test(e) {
    return typeof HTMLImageElement < "u" && (typeof e == "string" || e instanceof HTMLImageElement);
  }
}
class Zs {
  constructor() {
    this.x0 = 0, this.y0 = 0, this.x1 = 1, this.y1 = 0, this.x2 = 1, this.y2 = 1, this.x3 = 0, this.y3 = 1, this.uvsFloat32 = new Float32Array(8);
  }
  /**
   * Sets the texture Uvs based on the given frame information.
   * @protected
   * @param frame - The frame of the texture
   * @param baseFrame - The base frame of the texture
   * @param rotate - Rotation of frame, see {@link PIXI.groupD8}
   */
  set(e, t, s) {
    const i = t.width, n = t.height;
    if (s) {
      const a = e.width / 2 / i, o = e.height / 2 / n, h = e.x / i + a, l = e.y / n + o;
      s = fe.add(s, fe.NW), this.x0 = h + a * fe.uX(s), this.y0 = l + o * fe.uY(s), s = fe.add(s, 2), this.x1 = h + a * fe.uX(s), this.y1 = l + o * fe.uY(s), s = fe.add(s, 2), this.x2 = h + a * fe.uX(s), this.y2 = l + o * fe.uY(s), s = fe.add(s, 2), this.x3 = h + a * fe.uX(s), this.y3 = l + o * fe.uY(s);
    } else
      this.x0 = e.x / i, this.y0 = e.y / n, this.x1 = (e.x + e.width) / i, this.y1 = e.y / n, this.x2 = (e.x + e.width) / i, this.y2 = (e.y + e.height) / n, this.x3 = e.x / i, this.y3 = (e.y + e.height) / n;
    this.uvsFloat32[0] = this.x0, this.uvsFloat32[1] = this.y0, this.uvsFloat32[2] = this.x1, this.uvsFloat32[3] = this.y1, this.uvsFloat32[4] = this.x2, this.uvsFloat32[5] = this.y2, this.uvsFloat32[6] = this.x3, this.uvsFloat32[7] = this.y3;
  }
}
Zs.prototype.toString = function() {
  return `[@pixi/core:TextureUvs x0=${this.x0} y0=${this.y0} x1=${this.x1} y1=${this.y1} x2=${this.x2} y2=${this.y2} x3=${this.x3} y3=${this.y3}]`;
};
const _n = new Zs();
function er(r) {
  r.destroy = function() {
  }, r.on = function() {
  }, r.once = function() {
  }, r.emit = function() {
  };
}
class oe extends Xs {
  /**
   * @param baseTexture - The base texture source to create the texture from
   * @param frame - The rectangle frame of the texture to show
   * @param orig - The area of original texture
   * @param trim - Trimmed rectangle of original texture
   * @param rotate - indicates how the texture was rotated by texture packer. See {@link PIXI.groupD8}
   * @param anchor - Default anchor point used for sprite placement / rotation
   * @param borders - Default borders used for 9-slice scaling. See {@link PIXI.NineSlicePlane}
   */
  constructor(e, t, s, i, n, a, o) {
    if (super(), this.noFrame = !1, t || (this.noFrame = !0, t = new me(0, 0, 1, 1)), e instanceof oe && (e = e.baseTexture), this.baseTexture = e, this._frame = t, this.trim = i, this.valid = !1, this.destroyed = !1, this._uvs = _n, this.uvMatrix = null, this.orig = s || t, this._rotate = Number(n || 0), n === !0)
      this._rotate = 2;
    else if (this._rotate % 2 !== 0)
      throw new Error("attempt to use diamond-shaped UVs. If you are sure, set rotation manually");
    this.defaultAnchor = a ? new be(a.x, a.y) : new be(0, 0), this.defaultBorders = o, this._updateID = 0, this.textureCacheIds = [], e.valid ? this.noFrame ? e.valid && this.onBaseTextureUpdated(e) : this.frame = t : e.once("loaded", this.onBaseTextureUpdated, this), this.noFrame && e.on("update", this.onBaseTextureUpdated, this);
  }
  /**
   * Updates this texture on the gpu.
   *
   * Calls the TextureResource update.
   *
   * If you adjusted `frame` manually, please call `updateUvs()` instead.
   */
  update() {
    this.baseTexture.resource && this.baseTexture.resource.update();
  }
  /**
   * Called when the base texture is updated
   * @protected
   * @param baseTexture - The base texture.
   */
  onBaseTextureUpdated(e) {
    if (this.noFrame) {
      if (!this.baseTexture.valid)
        return;
      this._frame.width = e.width, this._frame.height = e.height, this.valid = !0, this.updateUvs();
    } else
      this.frame = this._frame;
    this.emit("update", this);
  }
  /**
   * Destroys this texture
   * @param [destroyBase=false] - Whether to destroy the base texture as well
   * @fires PIXI.Texture#destroyed
   */
  destroy(e) {
    if (this.baseTexture) {
      if (e) {
        const { resource: t } = this.baseTexture;
        t?.url && Me[t.url] && oe.removeFromCache(t.url), this.baseTexture.destroy();
      }
      this.baseTexture.off("loaded", this.onBaseTextureUpdated, this), this.baseTexture.off("update", this.onBaseTextureUpdated, this), this.baseTexture = null;
    }
    this._frame = null, this._uvs = null, this.trim = null, this.orig = null, this.valid = !1, oe.removeFromCache(this), this.textureCacheIds = null, this.destroyed = !0, this.emit("destroyed", this), this.removeAllListeners();
  }
  /**
   * Creates a new texture object that acts the same as this one.
   * @returns - The new texture
   */
  clone() {
    const e = this._frame.clone(), t = this._frame === this.orig ? e : this.orig.clone(), s = new oe(
      this.baseTexture,
      !this.noFrame && e,
      t,
      this.trim?.clone(),
      this.rotate,
      this.defaultAnchor,
      this.defaultBorders
    );
    return this.noFrame && (s._frame = e), s;
  }
  /**
   * Updates the internal WebGL UV cache. Use it after you change `frame` or `trim` of the texture.
   * Call it after changing the frame
   */
  updateUvs() {
    this._uvs === _n && (this._uvs = new Zs()), this._uvs.set(this._frame, this.baseTexture, this.rotate), this._updateID++;
  }
  /**
   * Helper function that creates a new Texture based on the source you provide.
   * The source can be - frame id, image url, video url, canvas element, video element, base texture
   * @param {string|PIXI.BaseTexture|HTMLImageElement|HTMLVideoElement|ImageBitmap|PIXI.ICanvas} source -
   *        Source or array of sources to create texture from
   * @param options - See {@link PIXI.BaseTexture}'s constructor for options.
   * @param {string} [options.pixiIdPrefix=pixiid] - If a source has no id, this is the prefix of the generated id
   * @param {boolean} [strict] - Enforce strict-mode, see {@link PIXI.settings.STRICT_TEXTURE_CACHE}.
   * @returns {PIXI.Texture} The newly created texture
   */
  static from(e, t = {}, s = J.STRICT_TEXTURE_CACHE) {
    const i = typeof e == "string";
    let n = null;
    if (i)
      n = e;
    else if (e instanceof he) {
      if (!e.cacheId) {
        const o = t?.pixiIdPrefix || "pixiid";
        e.cacheId = `${o}-${kt()}`, he.addToCache(e, e.cacheId);
      }
      n = e.cacheId;
    } else {
      if (!e._pixiId) {
        const o = t?.pixiIdPrefix || "pixiid";
        e._pixiId = `${o}_${kt()}`;
      }
      n = e._pixiId;
    }
    let a = Me[n];
    if (i && s && !a)
      throw new Error(`The cacheId "${n}" does not exist in TextureCache.`);
    return !a && !(e instanceof he) ? (t.resolution || (t.resolution = Gt(e)), a = new oe(new he(e, t)), a.baseTexture.cacheId = n, he.addToCache(a.baseTexture, n), oe.addToCache(a, n)) : !a && e instanceof he && (a = new oe(e), oe.addToCache(a, n)), a;
  }
  /**
   * Useful for loading textures via URLs. Use instead of `Texture.from` because
   * it does a better job of handling failed URLs more effectively. This also ignores
   * `PIXI.settings.STRICT_TEXTURE_CACHE`. Works for Videos, SVGs, Images.
   * @param url - The remote URL or array of URLs to load.
   * @param options - Optional options to include
   * @returns - A Promise that resolves to a Texture.
   */
  static fromURL(e, t) {
    const s = Object.assign({ autoLoad: !1 }, t?.resourceOptions), i = oe.from(e, Object.assign({ resourceOptions: s }, t), !1), n = i.baseTexture.resource;
    return i.baseTexture.valid ? Promise.resolve(i) : n.load().then(() => Promise.resolve(i));
  }
  /**
   * Create a new Texture with a BufferResource from a typed array.
   * @param buffer - The optional array to use. If no data is provided, a new Float32Array is created.
   * @param width - Width of the resource
   * @param height - Height of the resource
   * @param options - See {@link PIXI.BaseTexture}'s constructor for options.
   *        Default properties are different from the constructor's defaults.
   * @param {PIXI.FORMATS} [options.format] - The format is not given, the type is inferred from the
   *        type of the buffer: `RGBA` if Float32Array, Int8Array, Uint8Array, or Uint8ClampedArray,
   *        otherwise `RGBA_INTEGER`.
   * @param {PIXI.TYPES} [options.type] - The type is not given, the type is inferred from the
   *        type of the buffer. Maps Float32Array to `FLOAT`, Int32Array to `INT`, Uint32Array to
   *        `UNSIGNED_INT`, Int16Array to `SHORT`, Uint16Array to `UNSIGNED_SHORT`, Int8Array to `BYTE`,
   *        Uint8Array/Uint8ClampedArray to `UNSIGNED_BYTE`.
   * @param {PIXI.ALPHA_MODES} [options.alphaMode=PIXI.ALPHA_MODES.NPM]
   * @param {PIXI.SCALE_MODES} [options.scaleMode=PIXI.SCALE_MODES.NEAREST]
   * @returns - The resulting new BaseTexture
   */
  static fromBuffer(e, t, s, i) {
    return new oe(he.fromBuffer(e, t, s, i));
  }
  /**
   * Create a texture from a source and add to the cache.
   * @param {HTMLImageElement|HTMLVideoElement|ImageBitmap|PIXI.ICanvas|string} source - The input source.
   * @param imageUrl - File name of texture, for cache and resolving resolution.
   * @param name - Human readable name for the texture cache. If no name is
   *        specified, only `imageUrl` will be used as the cache ID.
   * @param options
   * @returns - Output texture
   */
  static fromLoader(e, t, s, i) {
    const n = new he(e, Object.assign({
      scaleMode: he.defaultOptions.scaleMode,
      resolution: Gt(t)
    }, i)), { resource: a } = n;
    a instanceof qn && (a.url = t);
    const o = new oe(n);
    return s || (s = t), he.addToCache(o.baseTexture, s), oe.addToCache(o, s), s !== t && (he.addToCache(o.baseTexture, t), oe.addToCache(o, t)), o.baseTexture.valid ? Promise.resolve(o) : new Promise((h) => {
      o.baseTexture.once("loaded", () => h(o));
    });
  }
  /**
   * Adds a Texture to the global TextureCache. This cache is shared across the whole PIXI object.
   * @param texture - The Texture to add to the cache.
   * @param id - The id that the Texture will be stored against.
   */
  static addToCache(e, t) {
    t && (e.textureCacheIds.includes(t) || e.textureCacheIds.push(t), Me[t] && Me[t] !== e && console.warn(`Texture added to the cache with an id [${t}] that already had an entry`), Me[t] = e);
  }
  /**
   * Remove a Texture from the global TextureCache.
   * @param texture - id of a Texture to be removed, or a Texture instance itself
   * @returns - The Texture that was removed
   */
  static removeFromCache(e) {
    if (typeof e == "string") {
      const t = Me[e];
      if (t) {
        const s = t.textureCacheIds.indexOf(e);
        return s > -1 && t.textureCacheIds.splice(s, 1), delete Me[e], t;
      }
    } else if (e?.textureCacheIds) {
      for (let t = 0; t < e.textureCacheIds.length; ++t)
        Me[e.textureCacheIds[t]] === e && delete Me[e.textureCacheIds[t]];
      return e.textureCacheIds.length = 0, e;
    }
    return null;
  }
  /**
   * Returns resolution of baseTexture
   * @readonly
   */
  get resolution() {
    return this.baseTexture.resolution;
  }
  /**
   * The frame specifies the region of the base texture that this texture uses.
   * Please call `updateUvs()` after you change coordinates of `frame` manually.
   */
  get frame() {
    return this._frame;
  }
  set frame(e) {
    this._frame = e, this.noFrame = !1;
    const { x: t, y: s, width: i, height: n } = e, a = t + i > this.baseTexture.width, o = s + n > this.baseTexture.height;
    if (a || o) {
      const h = a && o ? "and" : "or", l = `X: ${t} + ${i} = ${t + i} > ${this.baseTexture.width}`, c = `Y: ${s} + ${n} = ${s + n} > ${this.baseTexture.height}`;
      throw new Error(`Texture Error: frame does not fit inside the base Texture dimensions: ${l} ${h} ${c}`);
    }
    this.valid = i && n && this.baseTexture.valid, !this.trim && !this.rotate && (this.orig = e), this.valid && this.updateUvs();
  }
  /**
   * Indicates whether the texture is rotated inside the atlas
   * set to 2 to compensate for texture packer rotation
   * set to 6 to compensate for spine packer rotation
   * can be used to rotate or mirror sprites
   * See {@link PIXI.groupD8} for explanation
   */
  get rotate() {
    return this._rotate;
  }
  set rotate(e) {
    this._rotate = e, this.valid && this.updateUvs();
  }
  /** The width of the Texture in pixels. */
  get width() {
    return this.orig.width;
  }
  /** The height of the Texture in pixels. */
  get height() {
    return this.orig.height;
  }
  /** Utility function for BaseTexture|Texture cast. */
  castToBaseTexture() {
    return this.baseTexture;
  }
  /** An empty texture, used often to not have to create multiple empty textures. Can not be destroyed. */
  static get EMPTY() {
    return oe._EMPTY || (oe._EMPTY = new oe(new he()), er(oe._EMPTY), er(oe._EMPTY.baseTexture)), oe._EMPTY;
  }
  /** A white texture of 16x16 size, used for graphics and other things Can not be destroyed. */
  static get WHITE() {
    if (!oe._WHITE) {
      const e = J.ADAPTER.createCanvas(16, 16), t = e.getContext("2d");
      e.width = 16, e.height = 16, t.fillStyle = "white", t.fillRect(0, 0, 16, 16), oe._WHITE = new oe(he.from(e)), er(oe._WHITE), er(oe._WHITE.baseTexture);
    }
    return oe._WHITE;
  }
}
class xr extends oe {
  /**
   * @param baseRenderTexture - The base texture object that this texture uses.
   * @param frame - The rectangle frame of the texture to show.
   */
  constructor(e, t) {
    super(e, t), this.valid = !0, this.filterFrame = null, this.filterPoolKey = null, this.updateUvs();
  }
  /**
   * Shortcut to `this.baseTexture.framebuffer`, saves baseTexture cast.
   * @readonly
   */
  get framebuffer() {
    return this.baseTexture.framebuffer;
  }
  /**
   * Shortcut to `this.framebuffer.multisample`.
   * @default PIXI.MSAA_QUALITY.NONE
   */
  get multisample() {
    return this.framebuffer.multisample;
  }
  set multisample(e) {
    this.framebuffer.multisample = e;
  }
  /**
   * Resizes the RenderTexture.
   * @param desiredWidth - The desired width to resize to.
   * @param desiredHeight - The desired height to resize to.
   * @param resizeBaseTexture - Should the baseTexture.width and height values be resized as well?
   */
  resize(e, t, s = !0) {
    const i = this.baseTexture.resolution, n = Math.round(e * i) / i, a = Math.round(t * i) / i;
    this.valid = n > 0 && a > 0, this._frame.width = this.orig.width = n, this._frame.height = this.orig.height = a, s && this.baseTexture.resize(n, a), this.updateUvs();
  }
  /**
   * Changes the resolution of baseTexture, but does not change framebuffer size.
   * @param resolution - The new resolution to apply to RenderTexture
   */
  setResolution(e) {
    const { baseTexture: t } = this;
    t.resolution !== e && (t.setResolution(e), this.resize(t.width, t.height, !1));
  }
  /**
   * A short hand way of creating a render texture.
   * @param options - Options
   * @param {number} [options.width=100] - The width of the render texture
   * @param {number} [options.height=100] - The height of the render texture
   * @param {PIXI.SCALE_MODES} [options.scaleMode=PIXI.BaseTexture.defaultOptions.scaleMode] - See {@link PIXI.SCALE_MODES}
   *    for possible values
   * @param {number} [options.resolution=PIXI.settings.RESOLUTION] - The resolution / device pixel ratio of the texture
   *    being generated
   * @param {PIXI.MSAA_QUALITY} [options.multisample=PIXI.MSAA_QUALITY.NONE] - The number of samples of the frame buffer
   * @returns The new render texture
   */
  static create(e) {
    return new xr(new zn(e));
  }
}
class Kn {
  /**
   * @param textureOptions - options that will be passed to BaseRenderTexture constructor
   * @param {PIXI.SCALE_MODES} [textureOptions.scaleMode] - See {@link PIXI.SCALE_MODES} for possible values.
   */
  constructor(e) {
    this.texturePool = {}, this.textureOptions = e || {}, this.enableFullScreen = !1, this._pixelsWidth = 0, this._pixelsHeight = 0;
  }
  /**
   * Creates texture with params that were specified in pool constructor.
   * @param realWidth - Width of texture in pixels.
   * @param realHeight - Height of texture in pixels.
   * @param multisample - Number of samples of the framebuffer.
   */
  createTexture(e, t, s = ge.NONE) {
    const i = new zn(Object.assign({
      width: e,
      height: t,
      resolution: 1,
      multisample: s
    }, this.textureOptions));
    return new xr(i);
  }
  /**
   * Gets a Power-of-Two render texture or fullScreen texture
   * @param minWidth - The minimum width of the render texture.
   * @param minHeight - The minimum height of the render texture.
   * @param resolution - The resolution of the render texture.
   * @param multisample - Number of samples of the render texture.
   * @returns The new render texture.
   */
  getOptimalTexture(e, t, s = 1, i = ge.NONE) {
    let n;
    e = Math.max(Math.ceil(e * s - 1e-6), 1), t = Math.max(Math.ceil(t * s - 1e-6), 1), !this.enableFullScreen || e !== this._pixelsWidth || t !== this._pixelsHeight ? (e = cr(e), t = cr(t), n = ((e & 65535) << 16 | t & 65535) >>> 0, i > 1 && (n += i * 4294967296)) : n = i > 1 ? -i : -1, this.texturePool[n] || (this.texturePool[n] = []);
    let a = this.texturePool[n].pop();
    return a || (a = this.createTexture(e, t, i)), a.filterPoolKey = n, a.setResolution(s), a;
  }
  /**
   * Gets extra texture of the same size as input renderTexture
   *
   * `getFilterTexture(input, 0.5)` or `getFilterTexture(0.5, input)`
   * @param input - renderTexture from which size and resolution will be copied
   * @param resolution - override resolution of the renderTexture
   *  It overrides, it does not multiply
   * @param multisample - number of samples of the renderTexture
   */
  getFilterTexture(e, t, s) {
    const i = this.getOptimalTexture(
      e.width,
      e.height,
      t || e.resolution,
      s || ge.NONE
    );
    return i.filterFrame = e.filterFrame, i;
  }
  /**
   * Place a render texture back into the pool.
   * @param renderTexture - The renderTexture to free
   */
  returnTexture(e) {
    const t = e.filterPoolKey;
    e.filterFrame = null, this.texturePool[t].push(e);
  }
  /**
   * Alias for returnTexture, to be compliant with FilterSystem interface.
   * @param renderTexture - The renderTexture to free
   */
  returnFilterTexture(e) {
    this.returnTexture(e);
  }
  /**
   * Clears the pool.
   * @param destroyTextures - Destroy all stored textures.
   */
  clear(e) {
    if (e = e !== !1, e)
      for (const t in this.texturePool) {
        const s = this.texturePool[t];
        if (s)
          for (let i = 0; i < s.length; i++)
            s[i].destroy(!0);
      }
    this.texturePool = {};
  }
  /**
   * If screen size was changed, drops all screen-sized textures,
   * sets new screen size, sets `enableFullScreen` to true
   *
   * Size is measured in pixels, `renderer.view` can be passed here, not `renderer.screen`
   * @param size - Initial size of screen.
   */
  setScreenSize(e) {
    if (!(e.width === this._pixelsWidth && e.height === this._pixelsHeight)) {
      this.enableFullScreen = e.width > 0 && e.height > 0;
      for (const t in this.texturePool) {
        if (!(Number(t) < 0))
          continue;
        const s = this.texturePool[t];
        if (s)
          for (let i = 0; i < s.length; i++)
            s[i].destroy(!0);
        this.texturePool[t] = [];
      }
      this._pixelsWidth = e.width, this._pixelsHeight = e.height;
    }
  }
}
Kn.SCREEN_KEY = -1;
class ph extends bt {
  constructor() {
    super(), this.addAttribute("aVertexPosition", new Float32Array([
      0,
      0,
      1,
      0,
      1,
      1,
      0,
      1
    ])).addIndex([0, 1, 3, 2]);
  }
}
class mh extends bt {
  constructor() {
    super(), this.vertices = new Float32Array([
      -1,
      -1,
      1,
      -1,
      1,
      1,
      -1,
      1
    ]), this.uvs = new Float32Array([
      0,
      0,
      1,
      0,
      1,
      1,
      0,
      1
    ]), this.vertexBuffer = new xe(this.vertices), this.uvBuffer = new xe(this.uvs), this.addAttribute("aVertexPosition", this.vertexBuffer).addAttribute("aTextureCoord", this.uvBuffer).addIndex([0, 1, 2, 0, 2, 3]);
  }
  /**
   * Maps two Rectangle to the quad.
   * @param targetTextureFrame - The first rectangle
   * @param destinationFrame - The second rectangle
   * @returns - Returns itself.
   */
  map(e, t) {
    let s = 0, i = 0;
    return this.uvs[0] = s, this.uvs[1] = i, this.uvs[2] = s + t.width / e.width, this.uvs[3] = i, this.uvs[4] = s + t.width / e.width, this.uvs[5] = i + t.height / e.height, this.uvs[6] = s, this.uvs[7] = i + t.height / e.height, s = t.x, i = t.y, this.vertices[0] = s, this.vertices[1] = i, this.vertices[2] = s + t.width, this.vertices[3] = i, this.vertices[4] = s + t.width, this.vertices[5] = i + t.height, this.vertices[6] = s, this.vertices[7] = i + t.height, this.invalidate(), this;
  }
  /**
   * Legacy upload method, just marks buffers dirty.
   * @returns - Returns itself.
   */
  invalidate() {
    return this.vertexBuffer._updateID++, this.uvBuffer._updateID++, this;
  }
}
class yh {
  constructor() {
    this.renderTexture = null, this.target = null, this.legacy = !1, this.resolution = 1, this.multisample = ge.NONE, this.sourceFrame = new me(), this.destinationFrame = new me(), this.bindingSourceFrame = new me(), this.bindingDestinationFrame = new me(), this.filters = [], this.transform = null;
  }
  /** Clears the state */
  clear() {
    this.target = null, this.filters = null, this.renderTexture = null;
  }
}
const tr = [new be(), new be(), new be(), new be()], bs = new Ae();
class Zn {
  /**
   * @param renderer - The renderer this System works for.
   */
  constructor(e) {
    this.renderer = e, this.defaultFilterStack = [{}], this.texturePool = new Kn(), this.statePool = [], this.quad = new ph(), this.quadUv = new mh(), this.tempRect = new me(), this.activeState = {}, this.globalUniforms = new Le({
      outputFrame: new me(),
      inputSize: new Float32Array(4),
      inputPixel: new Float32Array(4),
      inputClamp: new Float32Array(4),
      resolution: 1,
      // legacy variables
      filterArea: new Float32Array(4),
      filterClamp: new Float32Array(4)
    }, !0), this.forceClear = !1, this.useMaxPadding = !1;
  }
  init() {
    this.texturePool.setScreenSize(this.renderer.view);
  }
  /**
   * Pushes a set of filters to be applied later to the system. This will redirect further rendering into an
   * input render-texture for the rest of the filtering pipeline.
   * @param {PIXI.DisplayObject} target - The target of the filter to render.
   * @param filters - The filters to apply.
   */
  push(e, t) {
    const s = this.renderer, i = this.defaultFilterStack, n = this.statePool.pop() || new yh(), a = s.renderTexture;
    let o, h;
    if (a.current) {
      const f = a.current;
      o = f.resolution, h = f.multisample;
    } else
      o = s.resolution, h = s.multisample;
    let l = t[0].resolution || o, c = t[0].multisample ?? h, g = t[0].padding, x = t[0].autoFit, b = t[0].legacy ?? !0;
    for (let f = 1; f < t.length; f++) {
      const A = t[f];
      l = Math.min(l, A.resolution || o), c = Math.min(c, A.multisample ?? h), g = this.useMaxPadding ? Math.max(g, A.padding) : g + A.padding, x = x && A.autoFit, b = b || (A.legacy ?? !0);
    }
    i.length === 1 && (this.defaultFilterStack[0].renderTexture = a.current), i.push(n), n.resolution = l, n.multisample = c, n.legacy = b, n.target = e, n.sourceFrame.copyFrom(e.filterArea || e.getBounds(!0)), n.sourceFrame.pad(g);
    const F = this.tempRect.copyFrom(a.sourceFrame);
    s.projection.transform && this.transformAABB(
      bs.copyFrom(s.projection.transform).invert(),
      F
    ), x ? (n.sourceFrame.fit(F), (n.sourceFrame.width <= 0 || n.sourceFrame.height <= 0) && (n.sourceFrame.width = 0, n.sourceFrame.height = 0)) : n.sourceFrame.intersects(F) || (n.sourceFrame.width = 0, n.sourceFrame.height = 0), this.roundFrame(
      n.sourceFrame,
      a.current ? a.current.resolution : s.resolution,
      a.sourceFrame,
      a.destinationFrame,
      s.projection.transform
    ), n.renderTexture = this.getOptimalFilterTexture(
      n.sourceFrame.width,
      n.sourceFrame.height,
      l,
      c
    ), n.filters = t, n.destinationFrame.width = n.renderTexture.width, n.destinationFrame.height = n.renderTexture.height;
    const C = this.tempRect;
    C.x = 0, C.y = 0, C.width = n.sourceFrame.width, C.height = n.sourceFrame.height, n.renderTexture.filterFrame = n.sourceFrame, n.bindingSourceFrame.copyFrom(a.sourceFrame), n.bindingDestinationFrame.copyFrom(a.destinationFrame), n.transform = s.projection.transform, s.projection.transform = null, a.bind(n.renderTexture, n.sourceFrame, C), s.framebuffer.clear(0, 0, 0, 0);
  }
  /** Pops off the filter and applies it. */
  pop() {
    const e = this.defaultFilterStack, t = e.pop(), s = t.filters;
    this.activeState = t;
    const i = this.globalUniforms.uniforms;
    i.outputFrame = t.sourceFrame, i.resolution = t.resolution;
    const n = i.inputSize, a = i.inputPixel, o = i.inputClamp;
    if (n[0] = t.destinationFrame.width, n[1] = t.destinationFrame.height, n[2] = 1 / n[0], n[3] = 1 / n[1], a[0] = Math.round(n[0] * t.resolution), a[1] = Math.round(n[1] * t.resolution), a[2] = 1 / a[0], a[3] = 1 / a[1], o[0] = 0.5 * a[2], o[1] = 0.5 * a[3], o[2] = t.sourceFrame.width * n[2] - 0.5 * a[2], o[3] = t.sourceFrame.height * n[3] - 0.5 * a[3], t.legacy) {
      const l = i.filterArea;
      l[0] = t.destinationFrame.width, l[1] = t.destinationFrame.height, l[2] = t.sourceFrame.x, l[3] = t.sourceFrame.y, i.filterClamp = i.inputClamp;
    }
    this.globalUniforms.update();
    const h = e[e.length - 1];
    if (this.renderer.framebuffer.blit(), s.length === 1)
      s[0].apply(this, t.renderTexture, h.renderTexture, Ze.BLEND, t), this.returnFilterTexture(t.renderTexture);
    else {
      let l = t.renderTexture, c = this.getOptimalFilterTexture(
        l.width,
        l.height,
        t.resolution
      );
      c.filterFrame = l.filterFrame;
      let g = 0;
      for (g = 0; g < s.length - 1; ++g) {
        g === 1 && t.multisample > 1 && (c = this.getOptimalFilterTexture(
          l.width,
          l.height,
          t.resolution
        ), c.filterFrame = l.filterFrame), s[g].apply(this, l, c, Ze.CLEAR, t);
        const x = l;
        l = c, c = x;
      }
      s[g].apply(this, l, h.renderTexture, Ze.BLEND, t), g > 1 && t.multisample > 1 && this.returnFilterTexture(t.renderTexture), this.returnFilterTexture(l), this.returnFilterTexture(c);
    }
    t.clear(), this.statePool.push(t);
  }
  /**
   * Binds a renderTexture with corresponding `filterFrame`, clears it if mode corresponds.
   * @param filterTexture - renderTexture to bind, should belong to filter pool or filter stack
   * @param clearMode - clearMode, by default its CLEAR/YES. See {@link PIXI.CLEAR_MODES}
   */
  bindAndClear(e, t = Ze.CLEAR) {
    const {
      renderTexture: s,
      state: i
    } = this.renderer;
    if (e === this.defaultFilterStack[this.defaultFilterStack.length - 1].renderTexture ? this.renderer.projection.transform = this.activeState.transform : this.renderer.projection.transform = null, e?.filterFrame) {
      const a = this.tempRect;
      a.x = 0, a.y = 0, a.width = e.filterFrame.width, a.height = e.filterFrame.height, s.bind(e, e.filterFrame, a);
    } else
      e !== this.defaultFilterStack[this.defaultFilterStack.length - 1].renderTexture ? s.bind(e) : this.renderer.renderTexture.bind(
        e,
        this.activeState.bindingSourceFrame,
        this.activeState.bindingDestinationFrame
      );
    const n = i.stateId & 1 || this.forceClear;
    (t === Ze.CLEAR || t === Ze.BLIT && n) && this.renderer.framebuffer.clear(0, 0, 0, 0);
  }
  /**
   * Draws a filter using the default rendering process.
   *
   * This should be called only by {@link PIXI.Filter#apply}.
   * @param filter - The filter to draw.
   * @param input - The input render target.
   * @param output - The target to output to.
   * @param clearMode - Should the output be cleared before rendering to it
   */
  applyFilter(e, t, s, i) {
    const n = this.renderer;
    n.state.set(e.state), this.bindAndClear(s, i), e.uniforms.uSampler = t, e.uniforms.filterGlobals = this.globalUniforms, n.shader.bind(e), e.legacy = !!e.program.attributeData.aTextureCoord, e.legacy ? (this.quadUv.map(t._frame, t.filterFrame), n.geometry.bind(this.quadUv), n.geometry.draw(ur.TRIANGLES)) : (n.geometry.bind(this.quad), n.geometry.draw(ur.TRIANGLE_STRIP));
  }
  /**
   * Multiply _input normalized coordinates_ to this matrix to get _sprite texture normalized coordinates_.
   *
   * Use `outputMatrix * vTextureCoord` in the shader.
   * @param outputMatrix - The matrix to output to.
   * @param {PIXI.Sprite} sprite - The sprite to map to.
   * @returns The mapped matrix.
   */
  calculateSpriteMatrix(e, t) {
    const { sourceFrame: s, destinationFrame: i } = this.activeState, { orig: n } = t._texture, a = e.set(
      i.width,
      0,
      0,
      i.height,
      s.x,
      s.y
    ), o = t.worldTransform.copyTo(Ae.TEMP_MATRIX);
    return o.invert(), a.prepend(o), a.scale(1 / n.width, 1 / n.height), a.translate(t.anchor.x, t.anchor.y), a;
  }
  /** Destroys this Filter System. */
  destroy() {
    this.renderer = null, this.texturePool.clear(!1);
  }
  /**
   * Gets a Power-of-Two render texture or fullScreen texture
   * @param minWidth - The minimum width of the render texture in real pixels.
   * @param minHeight - The minimum height of the render texture in real pixels.
   * @param resolution - The resolution of the render texture.
   * @param multisample - Number of samples of the render texture.
   * @returns - The new render texture.
   */
  getOptimalFilterTexture(e, t, s = 1, i = ge.NONE) {
    return this.texturePool.getOptimalTexture(e, t, s, i);
  }
  /**
   * Gets extra render texture to use inside current filter
   * To be compliant with older filters, you can use params in any order
   * @param input - renderTexture from which size and resolution will be copied
   * @param resolution - override resolution of the renderTexture
   * @param multisample - number of samples of the renderTexture
   */
  getFilterTexture(e, t, s) {
    if (typeof e == "number") {
      const n = e;
      e = t, t = n;
    }
    e = e || this.activeState.renderTexture;
    const i = this.texturePool.getOptimalTexture(
      e.width,
      e.height,
      t || e.resolution,
      s || ge.NONE
    );
    return i.filterFrame = e.filterFrame, i;
  }
  /**
   * Frees a render texture back into the pool.
   * @param renderTexture - The renderTarget to free
   */
  returnFilterTexture(e) {
    this.texturePool.returnTexture(e);
  }
  /** Empties the texture pool. */
  emptyPool() {
    this.texturePool.clear(!0);
  }
  /** Calls `texturePool.resize()`, affects fullScreen renderTextures. */
  resize() {
    this.texturePool.setScreenSize(this.renderer.view);
  }
  /**
   * @param matrix - first param
   * @param rect - second param
   */
  transformAABB(e, t) {
    const s = tr[0], i = tr[1], n = tr[2], a = tr[3];
    s.set(t.left, t.top), i.set(t.left, t.bottom), n.set(t.right, t.top), a.set(t.right, t.bottom), e.apply(s, s), e.apply(i, i), e.apply(n, n), e.apply(a, a);
    const o = Math.min(s.x, i.x, n.x, a.x), h = Math.min(s.y, i.y, n.y, a.y), l = Math.max(s.x, i.x, n.x, a.x), c = Math.max(s.y, i.y, n.y, a.y);
    t.x = o, t.y = h, t.width = l - o, t.height = c - h;
  }
  roundFrame(e, t, s, i, n) {
    if (!(e.width <= 0 || e.height <= 0 || s.width <= 0 || s.height <= 0)) {
      if (n) {
        const { a, b: o, c: h, d: l } = n;
        if ((Math.abs(o) > 1e-4 || Math.abs(h) > 1e-4) && (Math.abs(a) > 1e-4 || Math.abs(l) > 1e-4))
          return;
      }
      n = n ? bs.copyFrom(n) : bs.identity(), n.translate(-s.x, -s.y).scale(
        i.width / s.width,
        i.height / s.height
      ).translate(i.x, i.y), this.transformAABB(n, e), e.ceil(t), this.transformAABB(n.invert(), e);
    }
  }
}
Zn.extension = {
  type: j.RendererSystem,
  name: "filter"
};
Z.add(Zn);
class gh {
  constructor(e) {
    this.framebuffer = e, this.stencil = null, this.dirtyId = -1, this.dirtyFormat = -1, this.dirtySize = -1, this.multisample = ge.NONE, this.msaaBuffer = null, this.blitFramebuffer = null, this.mipLevel = 0;
  }
}
const vh = new me();
class Yn {
  /**
   * @param renderer - The renderer this System works for.
   */
  constructor(e) {
    this.renderer = e, this.managedFramebuffers = [], this.unknownFramebuffer = new Us(10, 10), this.msaaSamples = null;
  }
  /** Sets up the renderer context and necessary buffers. */
  contextChange() {
    this.disposeAll(!0);
    const e = this.gl = this.renderer.gl;
    if (this.CONTEXT_UID = this.renderer.CONTEXT_UID, this.current = this.unknownFramebuffer, this.viewport = new me(), this.hasMRT = !0, this.writeDepthTexture = !0, this.renderer.context.webGLVersion === 1) {
      let t = this.renderer.context.extensions.drawBuffers, s = this.renderer.context.extensions.depthTexture;
      J.PREFER_ENV === ot.WEBGL_LEGACY && (t = null, s = null), t ? e.drawBuffers = (i) => t.drawBuffersWEBGL(i) : (this.hasMRT = !1, e.drawBuffers = () => {
      }), s || (this.writeDepthTexture = !1);
    } else
      this.msaaSamples = e.getInternalformatParameter(e.RENDERBUFFER, e.RGBA8, e.SAMPLES);
  }
  /**
   * Bind a framebuffer.
   * @param framebuffer
   * @param frame - frame, default is framebuffer size
   * @param mipLevel - optional mip level to set on the framebuffer - defaults to 0
   */
  bind(e, t, s = 0) {
    const { gl: i } = this;
    if (e) {
      const n = e.glFramebuffers[this.CONTEXT_UID] || this.initFramebuffer(e);
      this.current !== e && (this.current = e, i.bindFramebuffer(i.FRAMEBUFFER, n.framebuffer)), n.mipLevel !== s && (e.dirtyId++, e.dirtyFormat++, n.mipLevel = s), n.dirtyId !== e.dirtyId && (n.dirtyId = e.dirtyId, n.dirtyFormat !== e.dirtyFormat ? (n.dirtyFormat = e.dirtyFormat, n.dirtySize = e.dirtySize, this.updateFramebuffer(e, s)) : n.dirtySize !== e.dirtySize && (n.dirtySize = e.dirtySize, this.resizeFramebuffer(e)));
      for (let a = 0; a < e.colorTextures.length; a++) {
        const o = e.colorTextures[a];
        this.renderer.texture.unbind(o.parentTextureArray || o);
      }
      if (e.depthTexture && this.renderer.texture.unbind(e.depthTexture), t) {
        const a = t.width >> s, o = t.height >> s, h = a / t.width;
        this.setViewport(
          t.x * h,
          t.y * h,
          a,
          o
        );
      } else {
        const a = e.width >> s, o = e.height >> s;
        this.setViewport(0, 0, a, o);
      }
    } else
      this.current && (this.current = null, i.bindFramebuffer(i.FRAMEBUFFER, null)), t ? this.setViewport(t.x, t.y, t.width, t.height) : this.setViewport(0, 0, this.renderer.width, this.renderer.height);
  }
  /**
   * Set the WebGLRenderingContext's viewport.
   * @param x - X position of viewport
   * @param y - Y position of viewport
   * @param width - Width of viewport
   * @param height - Height of viewport
   */
  setViewport(e, t, s, i) {
    const n = this.viewport;
    e = Math.round(e), t = Math.round(t), s = Math.round(s), i = Math.round(i), (n.width !== s || n.height !== i || n.x !== e || n.y !== t) && (n.x = e, n.y = t, n.width = s, n.height = i, this.gl.viewport(e, t, s, i));
  }
  /**
   * Get the size of the current width and height. Returns object with `width` and `height` values.
   * @readonly
   */
  get size() {
    return this.current ? { x: 0, y: 0, width: this.current.width, height: this.current.height } : { x: 0, y: 0, width: this.renderer.width, height: this.renderer.height };
  }
  /**
   * Clear the color of the context
   * @param r - Red value from 0 to 1
   * @param g - Green value from 0 to 1
   * @param b - Blue value from 0 to 1
   * @param a - Alpha value from 0 to 1
   * @param {PIXI.BUFFER_BITS} [mask=BUFFER_BITS.COLOR | BUFFER_BITS.DEPTH] - Bitwise OR of masks
   *  that indicate the buffers to be cleared, by default COLOR and DEPTH buffers.
   */
  clear(e, t, s, i, n = Is.COLOR | Is.DEPTH) {
    const { gl: a } = this;
    a.clearColor(e, t, s, i), a.clear(n);
  }
  /**
   * Initialize framebuffer for this context
   * @protected
   * @param framebuffer
   * @returns - created GLFramebuffer
   */
  initFramebuffer(e) {
    const { gl: t } = this, s = new gh(t.createFramebuffer());
    return s.multisample = this.detectSamples(e.multisample), e.glFramebuffers[this.CONTEXT_UID] = s, this.managedFramebuffers.push(e), e.disposeRunner.add(this), s;
  }
  /**
   * Resize the framebuffer
   * @param framebuffer
   * @protected
   */
  resizeFramebuffer(e) {
    const { gl: t } = this, s = e.glFramebuffers[this.CONTEXT_UID];
    if (s.stencil) {
      t.bindRenderbuffer(t.RENDERBUFFER, s.stencil);
      let a;
      this.renderer.context.webGLVersion === 1 ? a = t.DEPTH_STENCIL : e.depth && e.stencil ? a = t.DEPTH24_STENCIL8 : e.depth ? a = t.DEPTH_COMPONENT24 : a = t.STENCIL_INDEX8, s.msaaBuffer ? t.renderbufferStorageMultisample(
        t.RENDERBUFFER,
        s.multisample,
        a,
        e.width,
        e.height
      ) : t.renderbufferStorage(t.RENDERBUFFER, a, e.width, e.height);
    }
    const i = e.colorTextures;
    let n = i.length;
    t.drawBuffers || (n = Math.min(n, 1));
    for (let a = 0; a < n; a++) {
      const o = i[a], h = o.parentTextureArray || o;
      this.renderer.texture.bind(h, 0), a === 0 && s.msaaBuffer && (t.bindRenderbuffer(t.RENDERBUFFER, s.msaaBuffer), t.renderbufferStorageMultisample(
        t.RENDERBUFFER,
        s.multisample,
        h._glTextures[this.CONTEXT_UID].internalFormat,
        e.width,
        e.height
      ));
    }
    e.depthTexture && this.writeDepthTexture && this.renderer.texture.bind(e.depthTexture, 0);
  }
  /**
   * Update the framebuffer
   * @param framebuffer
   * @param mipLevel
   * @protected
   */
  updateFramebuffer(e, t) {
    const { gl: s } = this, i = e.glFramebuffers[this.CONTEXT_UID], n = e.colorTextures;
    let a = n.length;
    s.drawBuffers || (a = Math.min(a, 1)), i.multisample > 1 && this.canMultisampleFramebuffer(e) ? i.msaaBuffer = i.msaaBuffer || s.createRenderbuffer() : i.msaaBuffer && (s.deleteRenderbuffer(i.msaaBuffer), i.msaaBuffer = null, i.blitFramebuffer && (i.blitFramebuffer.dispose(), i.blitFramebuffer = null));
    const o = [];
    for (let h = 0; h < a; h++) {
      const l = n[h], c = l.parentTextureArray || l;
      this.renderer.texture.bind(c, 0), h === 0 && i.msaaBuffer ? (s.bindRenderbuffer(s.RENDERBUFFER, i.msaaBuffer), s.renderbufferStorageMultisample(
        s.RENDERBUFFER,
        i.multisample,
        c._glTextures[this.CONTEXT_UID].internalFormat,
        e.width,
        e.height
      ), s.framebufferRenderbuffer(s.FRAMEBUFFER, s.COLOR_ATTACHMENT0, s.RENDERBUFFER, i.msaaBuffer)) : (s.framebufferTexture2D(
        s.FRAMEBUFFER,
        s.COLOR_ATTACHMENT0 + h,
        l.target,
        c._glTextures[this.CONTEXT_UID].texture,
        t
      ), o.push(s.COLOR_ATTACHMENT0 + h));
    }
    if (o.length > 1 && s.drawBuffers(o), e.depthTexture && this.writeDepthTexture) {
      const h = e.depthTexture;
      this.renderer.texture.bind(h, 0), s.framebufferTexture2D(
        s.FRAMEBUFFER,
        s.DEPTH_ATTACHMENT,
        s.TEXTURE_2D,
        h._glTextures[this.CONTEXT_UID].texture,
        t
      );
    }
    if ((e.stencil || e.depth) && !(e.depthTexture && this.writeDepthTexture)) {
      i.stencil = i.stencil || s.createRenderbuffer();
      let h, l;
      this.renderer.context.webGLVersion === 1 ? (h = s.DEPTH_STENCIL_ATTACHMENT, l = s.DEPTH_STENCIL) : e.depth && e.stencil ? (h = s.DEPTH_STENCIL_ATTACHMENT, l = s.DEPTH24_STENCIL8) : e.depth ? (h = s.DEPTH_ATTACHMENT, l = s.DEPTH_COMPONENT24) : (h = s.STENCIL_ATTACHMENT, l = s.STENCIL_INDEX8), s.bindRenderbuffer(s.RENDERBUFFER, i.stencil), i.msaaBuffer ? s.renderbufferStorageMultisample(
        s.RENDERBUFFER,
        i.multisample,
        l,
        e.width,
        e.height
      ) : s.renderbufferStorage(s.RENDERBUFFER, l, e.width, e.height), s.framebufferRenderbuffer(s.FRAMEBUFFER, h, s.RENDERBUFFER, i.stencil);
    } else
      i.stencil && (s.deleteRenderbuffer(i.stencil), i.stencil = null);
  }
  /**
   * Returns true if the frame buffer can be multisampled.
   * @param framebuffer
   */
  canMultisampleFramebuffer(e) {
    return this.renderer.context.webGLVersion !== 1 && e.colorTextures.length <= 1 && !e.depthTexture;
  }
  /**
   * Detects number of samples that is not more than a param but as close to it as possible
   * @param samples - number of samples
   * @returns - recommended number of samples
   */
  detectSamples(e) {
    const { msaaSamples: t } = this;
    let s = ge.NONE;
    if (e <= 1 || t === null)
      return s;
    for (let i = 0; i < t.length; i++)
      if (t[i] <= e) {
        s = t[i];
        break;
      }
    return s === 1 && (s = ge.NONE), s;
  }
  /**
   * Only works with WebGL2
   *
   * blits framebuffer to another of the same or bigger size
   * after that target framebuffer is bound
   *
   * Fails with WebGL warning if blits multisample framebuffer to different size
   * @param framebuffer - by default it blits "into itself", from renderBuffer to texture.
   * @param sourcePixels - source rectangle in pixels
   * @param destPixels - dest rectangle in pixels, assumed to be the same as sourcePixels
   */
  blit(e, t, s) {
    const { current: i, renderer: n, gl: a, CONTEXT_UID: o } = this;
    if (n.context.webGLVersion !== 2 || !i)
      return;
    const h = i.glFramebuffers[o];
    if (!h)
      return;
    if (!e) {
      if (!h.msaaBuffer)
        return;
      const c = i.colorTextures[0];
      if (!c)
        return;
      h.blitFramebuffer || (h.blitFramebuffer = new Us(i.width, i.height), h.blitFramebuffer.addColorTexture(0, c)), e = h.blitFramebuffer, e.colorTextures[0] !== c && (e.colorTextures[0] = c, e.dirtyId++, e.dirtyFormat++), (e.width !== i.width || e.height !== i.height) && (e.width = i.width, e.height = i.height, e.dirtyId++, e.dirtySize++);
    }
    t || (t = vh, t.width = i.width, t.height = i.height), s || (s = t);
    const l = t.width === s.width && t.height === s.height;
    this.bind(e), a.bindFramebuffer(a.READ_FRAMEBUFFER, h.framebuffer), a.blitFramebuffer(
      t.left,
      t.top,
      t.right,
      t.bottom,
      s.left,
      s.top,
      s.right,
      s.bottom,
      a.COLOR_BUFFER_BIT,
      l ? a.NEAREST : a.LINEAR
    ), a.bindFramebuffer(a.READ_FRAMEBUFFER, e.glFramebuffers[this.CONTEXT_UID].framebuffer);
  }
  /**
   * Disposes framebuffer.
   * @param framebuffer - framebuffer that has to be disposed of
   * @param contextLost - If context was lost, we suppress all delete function calls
   */
  disposeFramebuffer(e, t) {
    const s = e.glFramebuffers[this.CONTEXT_UID], i = this.gl;
    if (!s)
      return;
    delete e.glFramebuffers[this.CONTEXT_UID];
    const n = this.managedFramebuffers.indexOf(e);
    n >= 0 && this.managedFramebuffers.splice(n, 1), e.disposeRunner.remove(this), t || (i.deleteFramebuffer(s.framebuffer), s.msaaBuffer && i.deleteRenderbuffer(s.msaaBuffer), s.stencil && i.deleteRenderbuffer(s.stencil)), s.blitFramebuffer && this.disposeFramebuffer(s.blitFramebuffer, t);
  }
  /**
   * Disposes all framebuffers, but not textures bound to them.
   * @param [contextLost=false] - If context was lost, we suppress all delete function calls
   */
  disposeAll(e) {
    const t = this.managedFramebuffers;
    this.managedFramebuffers = [];
    for (let s = 0; s < t.length; s++)
      this.disposeFramebuffer(t[s], e);
  }
  /**
   * Forcing creation of stencil buffer for current framebuffer, if it wasn't done before.
   * Used by MaskSystem, when its time to use stencil mask for Graphics element.
   *
   * Its an alternative for public lazy `framebuffer.enableStencil`, in case we need stencil without rebind.
   * @private
   */
  forceStencil() {
    const e = this.current;
    if (!e)
      return;
    const t = e.glFramebuffers[this.CONTEXT_UID];
    if (!t || t.stencil && e.stencil)
      return;
    e.stencil = !0;
    const s = e.width, i = e.height, n = this.gl, a = t.stencil = n.createRenderbuffer();
    n.bindRenderbuffer(n.RENDERBUFFER, a);
    let o, h;
    this.renderer.context.webGLVersion === 1 ? (o = n.DEPTH_STENCIL_ATTACHMENT, h = n.DEPTH_STENCIL) : e.depth ? (o = n.DEPTH_STENCIL_ATTACHMENT, h = n.DEPTH24_STENCIL8) : (o = n.STENCIL_ATTACHMENT, h = n.STENCIL_INDEX8), t.msaaBuffer ? n.renderbufferStorageMultisample(n.RENDERBUFFER, t.multisample, h, s, i) : n.renderbufferStorage(n.RENDERBUFFER, h, s, i), n.framebufferRenderbuffer(n.FRAMEBUFFER, o, n.RENDERBUFFER, a);
  }
  /** Resets framebuffer stored state, binds screen framebuffer. Should be called before renderTexture reset(). */
  reset() {
    this.current = this.unknownFramebuffer, this.viewport = new me();
  }
  destroy() {
    this.renderer = null;
  }
}
Yn.extension = {
  type: j.RendererSystem,
  name: "framebuffer"
};
Z.add(Yn);
const Es = { 5126: 4, 5123: 2, 5121: 1 };
class Qn {
  /** @param renderer - The renderer this System works for. */
  constructor(e) {
    this.renderer = e, this._activeGeometry = null, this._activeVao = null, this.hasVao = !0, this.hasInstance = !0, this.canUseUInt32ElementIndex = !1, this.managedGeometries = {};
  }
  /** Sets up the renderer context and necessary buffers. */
  contextChange() {
    this.disposeAll(!0);
    const e = this.gl = this.renderer.gl, t = this.renderer.context;
    if (this.CONTEXT_UID = this.renderer.CONTEXT_UID, t.webGLVersion !== 2) {
      let s = this.renderer.context.extensions.vertexArrayObject;
      J.PREFER_ENV === ot.WEBGL_LEGACY && (s = null), s ? (e.createVertexArray = () => s.createVertexArrayOES(), e.bindVertexArray = (i) => s.bindVertexArrayOES(i), e.deleteVertexArray = (i) => s.deleteVertexArrayOES(i)) : (this.hasVao = !1, e.createVertexArray = () => null, e.bindVertexArray = () => null, e.deleteVertexArray = () => null);
    }
    if (t.webGLVersion !== 2) {
      const s = e.getExtension("ANGLE_instanced_arrays");
      s ? (e.vertexAttribDivisor = (i, n) => s.vertexAttribDivisorANGLE(i, n), e.drawElementsInstanced = (i, n, a, o, h) => s.drawElementsInstancedANGLE(i, n, a, o, h), e.drawArraysInstanced = (i, n, a, o) => s.drawArraysInstancedANGLE(i, n, a, o)) : this.hasInstance = !1;
    }
    this.canUseUInt32ElementIndex = t.webGLVersion === 2 || !!t.extensions.uint32ElementIndex;
  }
  /**
   * Binds geometry so that is can be drawn. Creating a Vao if required
   * @param geometry - Instance of geometry to bind.
   * @param shader - Instance of shader to use vao for.
   */
  bind(e, t) {
    t = t || this.renderer.shader.shader;
    const { gl: s } = this;
    let i = e.glVertexArrayObjects[this.CONTEXT_UID], n = !1;
    i || (this.managedGeometries[e.id] = e, e.disposeRunner.add(this), e.glVertexArrayObjects[this.CONTEXT_UID] = i = {}, n = !0);
    const a = i[t.program.id] || this.initGeometryVao(e, t, n);
    this._activeGeometry = e, this._activeVao !== a && (this._activeVao = a, this.hasVao ? s.bindVertexArray(a) : this.activateVao(e, t.program)), this.updateBuffers();
  }
  /** Reset and unbind any active VAO and geometry. */
  reset() {
    this.unbind();
  }
  /** Update buffers of the currently bound geometry. */
  updateBuffers() {
    const e = this._activeGeometry, t = this.renderer.buffer;
    for (let s = 0; s < e.buffers.length; s++) {
      const i = e.buffers[s];
      t.update(i);
    }
  }
  /**
   * Check compatibility between a geometry and a program
   * @param geometry - Geometry instance.
   * @param program - Program instance.
   */
  checkCompatibility(e, t) {
    const s = e.attributes, i = t.attributeData;
    for (const n in i)
      if (!s[n])
        throw new Error(`shader and geometry incompatible, geometry missing the "${n}" attribute`);
  }
  /**
   * Takes a geometry and program and generates a unique signature for them.
   * @param geometry - To get signature from.
   * @param program - To test geometry against.
   * @returns - Unique signature of the geometry and program
   */
  getSignature(e, t) {
    const s = e.attributes, i = t.attributeData, n = ["g", e.id];
    for (const a in s)
      i[a] && n.push(a, i[a].location);
    return n.join("-");
  }
  /**
   * Creates or gets Vao with the same structure as the geometry and stores it on the geometry.
   * If vao is created, it is bound automatically. We use a shader to infer what and how to set up the
   * attribute locations.
   * @param geometry - Instance of geometry to to generate Vao for.
   * @param shader - Instance of the shader.
   * @param incRefCount - Increment refCount of all geometry buffers.
   */
  initGeometryVao(e, t, s = !0) {
    const i = this.gl, n = this.CONTEXT_UID, a = this.renderer.buffer, o = t.program;
    o.glPrograms[n] || this.renderer.shader.generateProgram(t), this.checkCompatibility(e, o);
    const h = this.getSignature(e, o), l = e.glVertexArrayObjects[this.CONTEXT_UID];
    let c = l[h];
    if (c)
      return l[o.id] = c, c;
    const g = e.buffers, x = e.attributes, b = {}, F = {};
    for (const C in g)
      b[C] = 0, F[C] = 0;
    for (const C in x)
      !x[C].size && o.attributeData[C] ? x[C].size = o.attributeData[C].size : x[C].size || console.warn(`PIXI Geometry attribute '${C}' size cannot be determined (likely the bound shader does not have the attribute)`), b[x[C].buffer] += x[C].size * Es[x[C].type];
    for (const C in x) {
      const f = x[C], A = f.size;
      f.stride === void 0 && (b[f.buffer] === A * Es[f.type] ? f.stride = 0 : f.stride = b[f.buffer]), f.start === void 0 && (f.start = F[f.buffer], F[f.buffer] += A * Es[f.type]);
    }
    c = i.createVertexArray(), i.bindVertexArray(c);
    for (let C = 0; C < g.length; C++) {
      const f = g[C];
      a.bind(f), s && f._glBuffers[n].refCount++;
    }
    return this.activateVao(e, o), l[o.id] = c, l[h] = c, i.bindVertexArray(null), a.unbind(Ue.ARRAY_BUFFER), c;
  }
  /**
   * Disposes geometry.
   * @param geometry - Geometry with buffers. Only VAO will be disposed
   * @param [contextLost=false] - If context was lost, we suppress deleteVertexArray
   */
  disposeGeometry(e, t) {
    if (!this.managedGeometries[e.id])
      return;
    delete this.managedGeometries[e.id];
    const s = e.glVertexArrayObjects[this.CONTEXT_UID], i = this.gl, n = e.buffers, a = this.renderer?.buffer;
    if (e.disposeRunner.remove(this), !!s) {
      if (a)
        for (let o = 0; o < n.length; o++) {
          const h = n[o]._glBuffers[this.CONTEXT_UID];
          h && (h.refCount--, h.refCount === 0 && !t && a.dispose(n[o], t));
        }
      if (!t) {
        for (const o in s)
          if (o[0] === "g") {
            const h = s[o];
            this._activeVao === h && this.unbind(), i.deleteVertexArray(h);
          }
      }
      delete e.glVertexArrayObjects[this.CONTEXT_UID];
    }
  }
  /**
   * Dispose all WebGL resources of all managed geometries.
   * @param [contextLost=false] - If context was lost, we suppress `gl.delete` calls
   */
  disposeAll(e) {
    const t = Object.keys(this.managedGeometries);
    for (let s = 0; s < t.length; s++)
      this.disposeGeometry(this.managedGeometries[t[s]], e);
  }
  /**
   * Activate vertex array object.
   * @param geometry - Geometry instance.
   * @param program - Shader program instance.
   */
  activateVao(e, t) {
    const s = this.gl, i = this.CONTEXT_UID, n = this.renderer.buffer, a = e.buffers, o = e.attributes;
    e.indexBuffer && n.bind(e.indexBuffer);
    let h = null;
    for (const l in o) {
      const c = o[l], g = a[c.buffer], x = g._glBuffers[i];
      if (t.attributeData[l]) {
        h !== x && (n.bind(g), h = x);
        const b = t.attributeData[l].location;
        if (s.enableVertexAttribArray(b), s.vertexAttribPointer(
          b,
          c.size,
          c.type || s.FLOAT,
          c.normalized,
          c.stride,
          c.start
        ), c.instance)
          if (this.hasInstance)
            s.vertexAttribDivisor(b, c.divisor);
          else
            throw new Error("geometry error, GPU Instancing is not supported on this device");
      }
    }
  }
  /**
   * Draws the currently bound geometry.
   * @param type - The type primitive to render.
   * @param size - The number of elements to be rendered. If not specified, all vertices after the
   *  starting vertex will be drawn.
   * @param start - The starting vertex in the geometry to start drawing from. If not specified,
   *  drawing will start from the first vertex.
   * @param instanceCount - The number of instances of the set of elements to execute. If not specified,
   *  all instances will be drawn.
   */
  draw(e, t, s, i) {
    const { gl: n } = this, a = this._activeGeometry;
    if (a.indexBuffer) {
      const o = a.indexBuffer.data.BYTES_PER_ELEMENT, h = o === 2 ? n.UNSIGNED_SHORT : n.UNSIGNED_INT;
      o === 2 || o === 4 && this.canUseUInt32ElementIndex ? a.instanced ? n.drawElementsInstanced(e, t || a.indexBuffer.data.length, h, (s || 0) * o, i || 1) : n.drawElements(e, t || a.indexBuffer.data.length, h, (s || 0) * o) : console.warn("unsupported index buffer type: uint32");
    } else
      a.instanced ? n.drawArraysInstanced(e, s, t || a.getSize(), i || 1) : n.drawArrays(e, s, t || a.getSize());
    return this;
  }
  /** Unbind/reset everything. */
  unbind() {
    this.gl.bindVertexArray(null), this._activeVao = null, this._activeGeometry = null;
  }
  destroy() {
    this.renderer = null;
  }
}
Qn.extension = {
  type: j.RendererSystem,
  name: "geometry"
};
Z.add(Qn);
const An = new Ae();
class _h {
  /**
   * @param texture - observed texture
   * @param clampMargin - Changes frame clamping, 0.5 by default. Use -0.5 for extra border.
   */
  constructor(e, t) {
    this._texture = e, this.mapCoord = new Ae(), this.uClampFrame = new Float32Array(4), this.uClampOffset = new Float32Array(2), this._textureID = -1, this._updateID = 0, this.clampOffset = 0, this.clampMargin = typeof t > "u" ? 0.5 : t, this.isSimple = !1;
  }
  /** Texture property. */
  get texture() {
    return this._texture;
  }
  set texture(e) {
    this._texture = e, this._textureID = -1;
  }
  /**
   * Multiplies uvs array to transform
   * @param uvs - mesh uvs
   * @param [out=uvs] - output
   * @returns - output
   */
  multiplyUvs(e, t) {
    t === void 0 && (t = e);
    const s = this.mapCoord;
    for (let i = 0; i < e.length; i += 2) {
      const n = e[i], a = e[i + 1];
      t[i] = n * s.a + a * s.c + s.tx, t[i + 1] = n * s.b + a * s.d + s.ty;
    }
    return t;
  }
  /**
   * Updates matrices if texture was changed.
   * @param [forceUpdate=false] - if true, matrices will be updated any case
   * @returns - Whether or not it was updated
   */
  update(e) {
    const t = this._texture;
    if (!t || !t.valid || !e && this._textureID === t._updateID)
      return !1;
    this._textureID = t._updateID, this._updateID++;
    const s = t._uvs;
    this.mapCoord.set(s.x1 - s.x0, s.y1 - s.y0, s.x3 - s.x0, s.y3 - s.y0, s.x0, s.y0);
    const i = t.orig, n = t.trim;
    n && (An.set(
      i.width / n.width,
      0,
      0,
      i.height / n.height,
      -n.x / n.width,
      -n.y / n.height
    ), this.mapCoord.append(An));
    const a = t.baseTexture, o = this.uClampFrame, h = this.clampMargin / a.resolution, l = this.clampOffset;
    return o[0] = (t._frame.x + h + l) / a.width, o[1] = (t._frame.y + h + l) / a.height, o[2] = (t._frame.x + t._frame.width - h + l) / a.width, o[3] = (t._frame.y + t._frame.height - h + l) / a.height, this.uClampOffset[0] = l / a.realWidth, this.uClampOffset[1] = l / a.realHeight, this.isSimple = t._frame.width === a.width && t._frame.height === a.height && t.rotate === 0, !0;
  }
}
var Ah = `varying vec2 vMaskCoord;
varying vec2 vTextureCoord;

uniform sampler2D uSampler;
uniform sampler2D mask;
uniform float alpha;
uniform float npmAlpha;
uniform vec4 maskClamp;

void main(void)
{
    float clip = step(3.5,
        step(maskClamp.x, vMaskCoord.x) +
        step(maskClamp.y, vMaskCoord.y) +
        step(vMaskCoord.x, maskClamp.z) +
        step(vMaskCoord.y, maskClamp.w));

    vec4 original = texture2D(uSampler, vTextureCoord);
    vec4 masky = texture2D(mask, vMaskCoord);
    float alphaMul = 1.0 - npmAlpha * (1.0 - masky.a);

    original *= (alphaMul * masky.r * alpha * clip);

    gl_FragColor = original;
}
`, xh = `attribute vec2 aVertexPosition;
attribute vec2 aTextureCoord;

uniform mat3 projectionMatrix;
uniform mat3 otherMatrix;

varying vec2 vMaskCoord;
varying vec2 vTextureCoord;

void main(void)
{
    gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);

    vTextureCoord = aTextureCoord;
    vMaskCoord = ( otherMatrix * vec3( aTextureCoord, 1.0)  ).xy;
}
`;
class bh extends yt {
  /** @ignore */
  constructor(e, t, s) {
    let i = null;
    typeof e != "string" && t === void 0 && s === void 0 && (i = e, e = void 0, t = void 0, s = void 0), super(e || xh, t || Ah, s), this.maskSprite = i, this.maskMatrix = new Ae();
  }
  /**
   * Sprite mask
   * @type {PIXI.DisplayObject}
   */
  get maskSprite() {
    return this._maskSprite;
  }
  set maskSprite(e) {
    this._maskSprite = e, this._maskSprite && (this._maskSprite.renderable = !1);
  }
  /**
   * Applies the filter
   * @param filterManager - The renderer to retrieve the filter from
   * @param input - The input render target.
   * @param output - The target to output to.
   * @param clearMode - Should the output be cleared before rendering to it.
   */
  apply(e, t, s, i) {
    const n = this._maskSprite, a = n._texture;
    a.valid && (a.uvMatrix || (a.uvMatrix = new _h(a, 0)), a.uvMatrix.update(), this.uniforms.npmAlpha = a.baseTexture.alphaMode ? 0 : 1, this.uniforms.mask = a, this.uniforms.otherMatrix = e.calculateSpriteMatrix(this.maskMatrix, n).prepend(a.uvMatrix.mapCoord), this.uniforms.alpha = n.worldAlpha, this.uniforms.maskClamp = a.uvMatrix.uClampFrame, e.applyFilter(this, t, s, i));
  }
}
class Eh {
  /**
   * Create MaskData
   * @param {PIXI.DisplayObject} [maskObject=null] - object that describes the mask
   */
  constructor(e = null) {
    this.type = ve.NONE, this.autoDetect = !0, this.maskObject = e || null, this.pooled = !1, this.isMaskData = !0, this.resolution = null, this.multisample = yt.defaultMultisample, this.enabled = !0, this.colorMask = 15, this._filters = null, this._stencilCounter = 0, this._scissorCounter = 0, this._scissorRect = null, this._scissorRectLocal = null, this._colorMask = 15, this._target = null;
  }
  /**
   * The sprite mask filter.
   * If set to `null`, the default sprite mask filter is used.
   * @default null
   */
  get filter() {
    return this._filters ? this._filters[0] : null;
  }
  set filter(e) {
    e ? this._filters ? this._filters[0] = e : this._filters = [e] : this._filters = null;
  }
  /** Resets the mask data after popMask(). */
  reset() {
    this.pooled && (this.maskObject = null, this.type = ve.NONE, this.autoDetect = !0), this._target = null, this._scissorRectLocal = null;
  }
  /**
   * Copies counters from maskData above, called from pushMask().
   * @param maskAbove
   */
  copyCountersOrReset(e) {
    e ? (this._stencilCounter = e._stencilCounter, this._scissorCounter = e._scissorCounter, this._scissorRect = e._scissorRect) : (this._stencilCounter = 0, this._scissorCounter = 0, this._scissorRect = null);
  }
}
class Jn {
  /**
   * @param renderer - The renderer this System works for.
   */
  constructor(e) {
    this.renderer = e, this.enableScissor = !0, this.alphaMaskPool = [], this.maskDataPool = [], this.maskStack = [], this.alphaMaskIndex = 0;
  }
  /**
   * Changes the mask stack that is used by this System.
   * @param maskStack - The mask stack
   */
  setMaskStack(e) {
    this.maskStack = e, this.renderer.scissor.setMaskStack(e), this.renderer.stencil.setMaskStack(e);
  }
  /**
   * Enables the mask and appends it to the current mask stack.
   *
   * NOTE: The batch renderer should be flushed beforehand to prevent pending renders from being masked.
   * @param {PIXI.DisplayObject} target - Display Object to push the mask to
   * @param {PIXI.MaskData|PIXI.Sprite|PIXI.Graphics|PIXI.DisplayObject} maskDataOrTarget - The masking data.
   */
  push(e, t) {
    let s = t;
    if (!s.isMaskData) {
      const n = this.maskDataPool.pop() || new Eh();
      n.pooled = !0, n.maskObject = t, s = n;
    }
    const i = this.maskStack.length !== 0 ? this.maskStack[this.maskStack.length - 1] : null;
    if (s.copyCountersOrReset(i), s._colorMask = i ? i._colorMask : 15, s.autoDetect && this.detect(s), s._target = e, s.type !== ve.SPRITE && this.maskStack.push(s), s.enabled)
      switch (s.type) {
        case ve.SCISSOR:
          this.renderer.scissor.push(s);
          break;
        case ve.STENCIL:
          this.renderer.stencil.push(s);
          break;
        case ve.SPRITE:
          s.copyCountersOrReset(null), this.pushSpriteMask(s);
          break;
        case ve.COLOR:
          this.pushColorMask(s);
          break;
      }
    s.type === ve.SPRITE && this.maskStack.push(s);
  }
  /**
   * Removes the last mask from the mask stack and doesn't return it.
   *
   * NOTE: The batch renderer should be flushed beforehand to render the masked contents before the mask is removed.
   * @param {PIXI.IMaskTarget} target - Display Object to pop the mask from
   */
  pop(e) {
    const t = this.maskStack.pop();
    if (!(!t || t._target !== e)) {
      if (t.enabled)
        switch (t.type) {
          case ve.SCISSOR:
            this.renderer.scissor.pop(t);
            break;
          case ve.STENCIL:
            this.renderer.stencil.pop(t.maskObject);
            break;
          case ve.SPRITE:
            this.popSpriteMask(t);
            break;
          case ve.COLOR:
            this.popColorMask(t);
            break;
        }
      if (t.reset(), t.pooled && this.maskDataPool.push(t), this.maskStack.length !== 0) {
        const s = this.maskStack[this.maskStack.length - 1];
        s.type === ve.SPRITE && s._filters && (s._filters[0].maskSprite = s.maskObject);
      }
    }
  }
  /**
   * Sets type of MaskData based on its maskObject.
   * @param maskData
   */
  detect(e) {
    const t = e.maskObject;
    t ? t.isSprite ? e.type = ve.SPRITE : this.enableScissor && this.renderer.scissor.testScissor(e) ? e.type = ve.SCISSOR : e.type = ve.STENCIL : e.type = ve.COLOR;
  }
  /**
   * Applies the Mask and adds it to the current filter stack.
   * @param maskData - Sprite to be used as the mask.
   */
  pushSpriteMask(e) {
    const { maskObject: t } = e, s = e._target;
    let i = e._filters;
    i || (i = this.alphaMaskPool[this.alphaMaskIndex], i || (i = this.alphaMaskPool[this.alphaMaskIndex] = [new bh()])), i[0].resolution = e.resolution, i[0].multisample = e.multisample, i[0].maskSprite = t;
    const n = s.filterArea;
    s.filterArea = t.getBounds(!0), this.renderer.filter.push(s, i), s.filterArea = n, e._filters || this.alphaMaskIndex++;
  }
  /**
   * Removes the last filter from the filter stack and doesn't return it.
   * @param maskData - Sprite to be used as the mask.
   */
  popSpriteMask(e) {
    this.renderer.filter.pop(), e._filters ? e._filters[0].maskSprite = null : (this.alphaMaskIndex--, this.alphaMaskPool[this.alphaMaskIndex][0].maskSprite = null);
  }
  /**
   * Pushes the color mask.
   * @param maskData - The mask data
   */
  pushColorMask(e) {
    const t = e._colorMask, s = e._colorMask = t & e.colorMask;
    s !== t && this.renderer.gl.colorMask(
      (s & 1) !== 0,
      (s & 2) !== 0,
      (s & 4) !== 0,
      (s & 8) !== 0
    );
  }
  /**
   * Pops the color mask.
   * @param maskData - The mask data
   */
  popColorMask(e) {
    const t = e._colorMask, s = this.maskStack.length > 0 ? this.maskStack[this.maskStack.length - 1]._colorMask : 15;
    s !== t && this.renderer.gl.colorMask(
      (s & 1) !== 0,
      (s & 2) !== 0,
      (s & 4) !== 0,
      (s & 8) !== 0
    );
  }
  destroy() {
    this.renderer = null;
  }
}
Jn.extension = {
  type: j.RendererSystem,
  name: "mask"
};
Z.add(Jn);
class ea {
  /**
   * @param renderer - The renderer this System works for.
   */
  constructor(e) {
    this.renderer = e, this.maskStack = [], this.glConst = 0;
  }
  /** Gets count of masks of certain type. */
  getStackLength() {
    return this.maskStack.length;
  }
  /**
   * Changes the mask stack that is used by this System.
   * @param {PIXI.MaskData[]} maskStack - The mask stack
   */
  setMaskStack(e) {
    const { gl: t } = this.renderer, s = this.getStackLength();
    this.maskStack = e;
    const i = this.getStackLength();
    i !== s && (i === 0 ? t.disable(this.glConst) : (t.enable(this.glConst), this._useCurrent()));
  }
  /**
   * Setup renderer to use the current mask data.
   * @private
   */
  _useCurrent() {
  }
  /** Destroys the mask stack. */
  destroy() {
    this.renderer = null, this.maskStack = null;
  }
}
const xn = new Ae(), bn = [], ta = class nr extends ea {
  /**
   * @param {PIXI.Renderer} renderer - The renderer this System works for.
   */
  constructor(e) {
    super(e), this.glConst = J.ADAPTER.getWebGLRenderingContext().SCISSOR_TEST;
  }
  getStackLength() {
    const e = this.maskStack[this.maskStack.length - 1];
    return e ? e._scissorCounter : 0;
  }
  /**
   * evaluates _boundsTransformed, _scissorRect for MaskData
   * @param maskData
   */
  calcScissorRect(e) {
    if (e._scissorRectLocal)
      return;
    const t = e._scissorRect, { maskObject: s } = e, { renderer: i } = this, n = i.renderTexture, a = s.getBounds(!0, bn.pop() ?? new me());
    this.roundFrameToPixels(
      a,
      n.current ? n.current.resolution : i.resolution,
      n.sourceFrame,
      n.destinationFrame,
      i.projection.transform
    ), t && a.fit(t), e._scissorRectLocal = a;
  }
  static isMatrixRotated(e) {
    if (!e)
      return !1;
    const { a: t, b: s, c: i, d: n } = e;
    return (Math.abs(s) > 1e-4 || Math.abs(i) > 1e-4) && (Math.abs(t) > 1e-4 || Math.abs(n) > 1e-4);
  }
  /**
   * Test, whether the object can be scissor mask with current renderer projection.
   * Calls "calcScissorRect()" if its true.
   * @param maskData - mask data
   * @returns whether Whether the object can be scissor mask
   */
  testScissor(e) {
    const { maskObject: t } = e;
    if (!t.isFastRect || !t.isFastRect() || nr.isMatrixRotated(t.worldTransform) || nr.isMatrixRotated(this.renderer.projection.transform))
      return !1;
    this.calcScissorRect(e);
    const s = e._scissorRectLocal;
    return s.width > 0 && s.height > 0;
  }
  roundFrameToPixels(e, t, s, i, n) {
    nr.isMatrixRotated(n) || (n = n ? xn.copyFrom(n) : xn.identity(), n.translate(-s.x, -s.y).scale(
      i.width / s.width,
      i.height / s.height
    ).translate(i.x, i.y), this.renderer.filter.transformAABB(n, e), e.fit(i), e.x = Math.round(e.x * t), e.y = Math.round(e.y * t), e.width = Math.round(e.width * t), e.height = Math.round(e.height * t));
  }
  /**
   * Applies the Mask and adds it to the current stencil stack.
   * @author alvin
   * @param maskData - The mask data.
   */
  push(e) {
    e._scissorRectLocal || this.calcScissorRect(e);
    const { gl: t } = this.renderer;
    e._scissorRect || t.enable(t.SCISSOR_TEST), e._scissorCounter++, e._scissorRect = e._scissorRectLocal, this._useCurrent();
  }
  /**
   * This should be called after a mask is popped off the mask stack. It will rebind the scissor box to be latest with the
   * last mask in the stack.
   *
   * This can also be called when you directly modify the scissor box and want to restore PixiJS state.
   * @param maskData - The mask data.
   */
  pop(e) {
    const { gl: t } = this.renderer;
    e && bn.push(e._scissorRectLocal), this.getStackLength() > 0 ? this._useCurrent() : t.disable(t.SCISSOR_TEST);
  }
  /**
   * Setup renderer to use the current scissor data.
   * @private
   */
  _useCurrent() {
    const e = this.maskStack[this.maskStack.length - 1]._scissorRect;
    let t;
    this.renderer.renderTexture.current ? t = e.y : t = this.renderer.height - e.height - e.y, this.renderer.gl.scissor(e.x, t, e.width, e.height);
  }
};
ta.extension = {
  type: j.RendererSystem,
  name: "scissor"
};
let Th = ta;
Z.add(Th);
class ra extends ea {
  /**
   * @param renderer - The renderer this System works for.
   */
  constructor(e) {
    super(e), this.glConst = J.ADAPTER.getWebGLRenderingContext().STENCIL_TEST;
  }
  getStackLength() {
    const e = this.maskStack[this.maskStack.length - 1];
    return e ? e._stencilCounter : 0;
  }
  /**
   * Applies the Mask and adds it to the current stencil stack.
   * @param maskData - The mask data
   */
  push(e) {
    const t = e.maskObject, { gl: s } = this.renderer, i = e._stencilCounter;
    i === 0 && (this.renderer.framebuffer.forceStencil(), s.clearStencil(0), s.clear(s.STENCIL_BUFFER_BIT), s.enable(s.STENCIL_TEST)), e._stencilCounter++;
    const n = e._colorMask;
    n !== 0 && (e._colorMask = 0, s.colorMask(!1, !1, !1, !1)), s.stencilFunc(s.EQUAL, i, 4294967295), s.stencilOp(s.KEEP, s.KEEP, s.INCR), t.renderable = !0, t.render(this.renderer), this.renderer.batch.flush(), t.renderable = !1, n !== 0 && (e._colorMask = n, s.colorMask(
      (n & 1) !== 0,
      (n & 2) !== 0,
      (n & 4) !== 0,
      (n & 8) !== 0
    )), this._useCurrent();
  }
  /**
   * Pops stencil mask. MaskData is already removed from stack
   * @param {PIXI.DisplayObject} maskObject - object of popped mask data
   */
  pop(e) {
    const t = this.renderer.gl;
    if (this.getStackLength() === 0)
      t.disable(t.STENCIL_TEST);
    else {
      const s = this.maskStack.length !== 0 ? this.maskStack[this.maskStack.length - 1] : null, i = s ? s._colorMask : 15;
      i !== 0 && (s._colorMask = 0, t.colorMask(!1, !1, !1, !1)), t.stencilOp(t.KEEP, t.KEEP, t.DECR), e.renderable = !0, e.render(this.renderer), this.renderer.batch.flush(), e.renderable = !1, i !== 0 && (s._colorMask = i, t.colorMask(
        (i & 1) !== 0,
        (i & 2) !== 0,
        (i & 4) !== 0,
        (i & 8) !== 0
      )), this._useCurrent();
    }
  }
  /**
   * Setup renderer to use the current stencil data.
   * @private
   */
  _useCurrent() {
    const e = this.renderer.gl;
    e.stencilFunc(e.EQUAL, this.getStackLength(), 4294967295), e.stencilOp(e.KEEP, e.KEEP, e.KEEP);
  }
}
ra.extension = {
  type: j.RendererSystem,
  name: "stencil"
};
Z.add(ra);
class sa {
  constructor(e) {
    this.renderer = e, this.plugins = {}, Object.defineProperties(this.plugins, {
      extract: {
        enumerable: !1,
        get() {
          return ue("7.0.0", "renderer.plugins.extract has moved to renderer.extract"), e.extract;
        }
      },
      prepare: {
        enumerable: !1,
        get() {
          return ue("7.0.0", "renderer.plugins.prepare has moved to renderer.prepare"), e.prepare;
        }
      },
      interaction: {
        enumerable: !1,
        get() {
          return ue("7.0.0", "renderer.plugins.interaction has been deprecated, use renderer.events"), e.events;
        }
      }
    });
  }
  /**
   * Initialize the plugins.
   * @protected
   */
  init() {
    const e = this.rendererPlugins;
    for (const t in e)
      this.plugins[t] = new e[t](this.renderer);
  }
  destroy() {
    for (const e in this.plugins)
      this.plugins[e].destroy(), this.plugins[e] = null;
  }
}
sa.extension = {
  type: [
    j.RendererSystem,
    j.CanvasRendererSystem
  ],
  name: "_plugin"
};
Z.add(sa);
class ia {
  /** @param renderer - The renderer this System works for. */
  constructor(e) {
    this.renderer = e, this.destinationFrame = null, this.sourceFrame = null, this.defaultFrame = null, this.projectionMatrix = new Ae(), this.transform = null;
  }
  /**
   * Updates the projection-matrix based on the sourceFrame → destinationFrame mapping provided.
   *
   * NOTE: It is expected you call `renderer.framebuffer.setViewport(destinationFrame)` after this. This is because
   * the framebuffer viewport converts shader vertex output in normalized device coordinates to window coordinates.
   *
   * NOTE-2: {@link PIXI.RenderTextureSystem#bind} updates the projection-matrix when you bind a render-texture.
   * It is expected
   * that you dirty the current bindings when calling this manually.
   * @param destinationFrame - The rectangle in the render-target to render the contents into. If rendering to the canvas,
   *  the origin is on the top-left; if rendering to a render-texture, the origin is on the bottom-left.
   * @param sourceFrame - The rectangle in world space that contains the contents being rendered.
   * @param resolution - The resolution of the render-target, which is the ratio of
   *  world-space (or CSS) pixels to physical pixels.
   * @param root - Whether the render-target is the screen. This is required because rendering to textures
   *  is y-flipped (i.e. upside down relative to the screen).
   */
  update(e, t, s, i) {
    this.destinationFrame = e || this.destinationFrame || this.defaultFrame, this.sourceFrame = t || this.sourceFrame || e, this.calculateProjection(this.destinationFrame, this.sourceFrame, s, i), this.transform && this.projectionMatrix.append(this.transform);
    const n = this.renderer;
    n.globalUniforms.uniforms.projectionMatrix = this.projectionMatrix, n.globalUniforms.update(), n.shader.shader && n.shader.syncUniformGroup(n.shader.shader.uniforms.globals);
  }
  /**
   * Calculates the `projectionMatrix` to map points inside `sourceFrame` to inside `destinationFrame`.
   * @param _destinationFrame - The destination frame in the render-target.
   * @param sourceFrame - The source frame in world space.
   * @param _resolution - The render-target's resolution, i.e. ratio of CSS to physical pixels.
   * @param root - Whether rendering into the screen. Otherwise, if rendering to a framebuffer, the projection
   *  is y-flipped.
   */
  calculateProjection(e, t, s, i) {
    const n = this.projectionMatrix, a = i ? -1 : 1;
    n.identity(), n.a = 1 / t.width * 2, n.d = a * (1 / t.height * 2), n.tx = -1 - t.x * n.a, n.ty = -a - t.y * n.d;
  }
  /**
   * Sets the transform of the active render target to the given matrix.
   * @param _matrix - The transformation matrix
   */
  setTransform(e) {
  }
  destroy() {
    this.renderer = null;
  }
}
ia.extension = {
  type: j.RendererSystem,
  name: "projection"
};
Z.add(ia);
const wh = new Dn(), En = new me();
class na {
  constructor(e) {
    this.renderer = e, this._tempMatrix = new Ae();
  }
  /**
   * A Useful function that returns a texture of the display object that can then be used to create sprites
   * This can be quite useful if your displayObject is complicated and needs to be reused multiple times.
   * @param displayObject - The displayObject the object will be generated from.
   * @param {IGenerateTextureOptions} options - Generate texture options.
   * @param {PIXI.Rectangle} options.region - The region of the displayObject, that shall be rendered,
   *        if no region is specified, defaults to the local bounds of the displayObject.
   * @param {number} [options.resolution] - If not given, the renderer's resolution is used.
   * @param {PIXI.MSAA_QUALITY} [options.multisample] - If not given, the renderer's multisample is used.
   * @returns a shiny new texture of the display object passed in
   */
  generateTexture(e, t) {
    const { region: s, ...i } = t || {}, n = s?.copyTo(En) || e.getLocalBounds(En, !0), a = i.resolution || this.renderer.resolution;
    n.width = Math.max(n.width, 1 / a), n.height = Math.max(n.height, 1 / a), i.width = n.width, i.height = n.height, i.resolution = a, i.multisample ?? (i.multisample = this.renderer.multisample);
    const o = xr.create(i);
    this._tempMatrix.tx = -n.x, this._tempMatrix.ty = -n.y;
    const h = e.transform;
    return e.transform = wh, this.renderer.render(e, {
      renderTexture: o,
      transform: this._tempMatrix,
      skipUpdateTransform: !!e.parent,
      blit: !0
    }), e.transform = h, o;
  }
  destroy() {
  }
}
na.extension = {
  type: [
    j.RendererSystem,
    j.CanvasRendererSystem
  ],
  name: "textureGenerator"
};
Z.add(na);
const Ke = new me(), Ft = new me();
class aa {
  /**
   * @param renderer - The renderer this System works for.
   */
  constructor(e) {
    this.renderer = e, this.defaultMaskStack = [], this.current = null, this.sourceFrame = new me(), this.destinationFrame = new me(), this.viewportFrame = new me();
  }
  contextChange() {
    const e = this.renderer?.gl.getContextAttributes();
    this._rendererPremultipliedAlpha = !!(e && e.alpha && e.premultipliedAlpha);
  }
  /**
   * Bind the current render texture.
   * @param renderTexture - RenderTexture to bind, by default its `null` - the screen.
   * @param sourceFrame - Part of world that is mapped to the renderTexture.
   * @param destinationFrame - Part of renderTexture, by default it has the same size as sourceFrame.
   */
  bind(e = null, t, s) {
    const i = this.renderer;
    this.current = e;
    let n, a, o;
    e ? (n = e.baseTexture, o = n.resolution, t || (Ke.width = e.frame.width, Ke.height = e.frame.height, t = Ke), s || (Ft.x = e.frame.x, Ft.y = e.frame.y, Ft.width = t.width, Ft.height = t.height, s = Ft), a = n.framebuffer) : (o = i.resolution, t || (Ke.width = i._view.screen.width, Ke.height = i._view.screen.height, t = Ke), s || (s = Ke, s.width = t.width, s.height = t.height));
    const h = this.viewportFrame;
    h.x = s.x * o, h.y = s.y * o, h.width = s.width * o, h.height = s.height * o, e || (h.y = i.view.height - (h.y + h.height)), h.ceil(), this.renderer.framebuffer.bind(a, h), this.renderer.projection.update(s, t, o, !a), e ? this.renderer.mask.setMaskStack(n.maskStack) : this.renderer.mask.setMaskStack(this.defaultMaskStack), this.sourceFrame.copyFrom(t), this.destinationFrame.copyFrom(s);
  }
  /**
   * Erases the render texture and fills the drawing area with a colour.
   * @param clearColor - The color as rgba, default to use the renderer backgroundColor
   * @param [mask=BUFFER_BITS.COLOR | BUFFER_BITS.DEPTH] - Bitwise OR of masks
   *  that indicate the buffers to be cleared, by default COLOR and DEPTH buffers.
   */
  clear(e, t) {
    const s = this.current ? this.current.baseTexture.clear : this.renderer.background.backgroundColor, i = _r.shared.setValue(e || s);
    (this.current && this.current.baseTexture.alphaMode > 0 || !this.current && this._rendererPremultipliedAlpha) && i.premultiply(i.alpha);
    const n = this.destinationFrame, a = this.current ? this.current.baseTexture : this.renderer._view.screen, o = n.width !== a.width || n.height !== a.height;
    if (o) {
      let { x: h, y: l, width: c, height: g } = this.viewportFrame;
      h = Math.round(h), l = Math.round(l), c = Math.round(c), g = Math.round(g), this.renderer.gl.enable(this.renderer.gl.SCISSOR_TEST), this.renderer.gl.scissor(h, l, c, g);
    }
    this.renderer.framebuffer.clear(i.red, i.green, i.blue, i.alpha, t), o && this.renderer.scissor.pop();
  }
  resize() {
    this.bind(null);
  }
  /** Resets render-texture state. */
  reset() {
    this.bind(null);
  }
  destroy() {
    this.renderer = null;
  }
}
aa.extension = {
  type: j.RendererSystem,
  name: "renderTexture"
};
Z.add(aa);
class Rh {
  /**
   * Makes a new Pixi program.
   * @param program - webgl program
   * @param uniformData - uniforms
   */
  constructor(e, t) {
    this.program = e, this.uniformData = t, this.uniformGroups = {}, this.uniformDirtyGroups = {}, this.uniformBufferBindings = {};
  }
  /** Destroys this program. */
  destroy() {
    this.uniformData = null, this.uniformGroups = null, this.uniformDirtyGroups = null, this.uniformBufferBindings = null, this.program = null;
  }
}
function Ih(r, e) {
  const t = {}, s = e.getProgramParameter(r, e.ACTIVE_ATTRIBUTES);
  for (let i = 0; i < s; i++) {
    const n = e.getActiveAttrib(r, i);
    if (n.name.startsWith("gl_"))
      continue;
    const a = Wn(e, n.type), o = {
      type: a,
      name: n.name,
      size: Vn(a),
      location: e.getAttribLocation(r, n.name)
    };
    t[n.name] = o;
  }
  return t;
}
function Sh(r, e) {
  const t = {}, s = e.getProgramParameter(r, e.ACTIVE_UNIFORMS);
  for (let i = 0; i < s; i++) {
    const n = e.getActiveUniform(r, i), a = n.name.replace(/\[.*?\]$/, ""), o = !!n.name.match(/\[.*?\]$/), h = Wn(e, n.type);
    t[a] = {
      name: a,
      index: i,
      type: h,
      size: n.size,
      isArray: o,
      value: $n(h, n.size)
    };
  }
  return t;
}
function Ch(r, e) {
  const t = pn(r, r.VERTEX_SHADER, e.vertexSrc), s = pn(r, r.FRAGMENT_SHADER, e.fragmentSrc), i = r.createProgram();
  r.attachShader(i, t), r.attachShader(i, s);
  const n = e.extra?.transformFeedbackVaryings;
  if (n && (typeof r.transformFeedbackVaryings != "function" ? console.warn("TransformFeedback is not supported but TransformFeedbackVaryings are given.") : r.transformFeedbackVaryings(
    i,
    n.names,
    n.bufferMode === "separate" ? r.SEPARATE_ATTRIBS : r.INTERLEAVED_ATTRIBS
  )), r.linkProgram(i), r.getProgramParameter(i, r.LINK_STATUS) || th(r, i, t, s), e.attributeData = Ih(i, r), e.uniformData = Sh(i, r), !/^[ \t]*#[ \t]*version[ \t]+300[ \t]+es[ \t]*$/m.test(e.vertexSrc)) {
    const o = Object.keys(e.attributeData);
    o.sort((h, l) => h > l ? 1 : -1);
    for (let h = 0; h < o.length; h++)
      e.attributeData[o[h]].location = h, r.bindAttribLocation(i, h, o[h]);
    r.linkProgram(i);
  }
  r.deleteShader(t), r.deleteShader(s);
  const a = {};
  for (const o in e.uniformData) {
    const h = e.uniformData[o];
    a[o] = {
      location: r.getUniformLocation(i, o),
      value: $n(h.type, h.size)
    };
  }
  return new Rh(i, a);
}
function Nh(r, e, t, s, i) {
  t.buffer.update(i);
}
const Fh = {
  float: `
        data[offset] = v;
    `,
  vec2: `
        data[offset] = v[0];
        data[offset+1] = v[1];
    `,
  vec3: `
        data[offset] = v[0];
        data[offset+1] = v[1];
        data[offset+2] = v[2];

    `,
  vec4: `
        data[offset] = v[0];
        data[offset+1] = v[1];
        data[offset+2] = v[2];
        data[offset+3] = v[3];
    `,
  mat2: `
        data[offset] = v[0];
        data[offset+1] = v[1];

        data[offset+4] = v[2];
        data[offset+5] = v[3];
    `,
  mat3: `
        data[offset] = v[0];
        data[offset+1] = v[1];
        data[offset+2] = v[2];

        data[offset + 4] = v[3];
        data[offset + 5] = v[4];
        data[offset + 6] = v[5];

        data[offset + 8] = v[6];
        data[offset + 9] = v[7];
        data[offset + 10] = v[8];
    `,
  mat4: `
        for(var i = 0; i < 16; i++)
        {
            data[offset + i] = v[i];
        }
    `
}, oa = {
  float: 4,
  vec2: 8,
  vec3: 12,
  vec4: 16,
  int: 4,
  ivec2: 8,
  ivec3: 12,
  ivec4: 16,
  uint: 4,
  uvec2: 8,
  uvec3: 12,
  uvec4: 16,
  bool: 4,
  bvec2: 8,
  bvec3: 12,
  bvec4: 16,
  mat2: 16 * 2,
  mat3: 16 * 3,
  mat4: 16 * 4
};
function Ph(r) {
  const e = r.map((n) => ({
    data: n,
    offset: 0,
    dataLen: 0,
    dirty: 0
  }));
  let t = 0, s = 0, i = 0;
  for (let n = 0; n < e.length; n++) {
    const a = e[n];
    if (t = oa[a.data.type], a.data.size > 1 && (t = Math.max(t, 16) * a.data.size), a.dataLen = t, s % t !== 0 && s < 16) {
      const o = s % t % 16;
      s += o, i += o;
    }
    s + t > 16 ? (i = Math.ceil(i / 16) * 16, a.offset = i, i += t, s = t) : (a.offset = i, s += t, i += t);
  }
  return i = Math.ceil(i / 16) * 16, { uboElements: e, size: i };
}
function Oh(r, e) {
  const t = [];
  for (const s in r)
    e[s] && t.push(e[s]);
  return t.sort((s, i) => s.index - i.index), t;
}
function Bh(r, e) {
  if (!r.autoManage)
    return { size: 0, syncFunc: Nh };
  const t = Oh(r.uniforms, e), { uboElements: s, size: i } = Ph(t), n = [`
    var v = null;
    var v2 = null;
    var cv = null;
    var t = 0;
    var gl = renderer.gl
    var index = 0;
    var data = buffer.data;
    `];
  for (let a = 0; a < s.length; a++) {
    const o = s[a], h = r.uniforms[o.data.name], l = o.data.name;
    let c = !1;
    for (let g = 0; g < _t.length; g++) {
      const x = _t[g];
      if (x.codeUbo && x.test(o.data, h)) {
        n.push(
          `offset = ${o.offset / 4};`,
          _t[g].codeUbo(o.data.name, h)
        ), c = !0;
        break;
      }
    }
    if (!c)
      if (o.data.size > 1) {
        const g = Vn(o.data.type), x = Math.max(oa[o.data.type] / 16, 1), b = g / x, F = (4 - b % 4) % 4;
        n.push(`
                cv = ud.${l}.value;
                v = uv.${l};
                offset = ${o.offset / 4};

                t = 0;

                for(var i=0; i < ${o.data.size * x}; i++)
                {
                    for(var j = 0; j < ${b}; j++)
                    {
                        data[offset++] = v[t++];
                    }
                    offset += ${F};
                }

                `);
      } else {
        const g = Fh[o.data.type];
        n.push(`
                cv = ud.${l}.value;
                v = uv.${l};
                offset = ${o.offset / 4};
                ${g};
                `);
      }
  }
  return n.push(`
       renderer.buffer.update(buffer);
    `), {
    size: i,
    // eslint-disable-next-line no-new-func
    syncFunc: new Function(
      "ud",
      "uv",
      "renderer",
      "syncData",
      "buffer",
      n.join(`
`)
    )
  };
}
let Mh = 0;
const rr = { textureCount: 0, uboCount: 0 };
class ha {
  /** @param renderer - The renderer this System works for. */
  constructor(e) {
    this.destroyed = !1, this.renderer = e, this.systemCheck(), this.gl = null, this.shader = null, this.program = null, this.cache = {}, this._uboCache = {}, this.id = Mh++;
  }
  /**
   * Overrideable function by `@pixi/unsafe-eval` to silence
   * throwing an error if platform doesn't support unsafe-evals.
   * @private
   */
  systemCheck() {
    if (!sh())
      throw new Error("Current environment does not allow unsafe-eval, please use @pixi/unsafe-eval module to enable support.");
  }
  contextChange(e) {
    this.gl = e, this.reset();
  }
  /**
   * Changes the current shader to the one given in parameter.
   * @param shader - the new shader
   * @param dontSync - false if the shader should automatically sync its uniforms.
   * @returns the glProgram that belongs to the shader.
   */
  bind(e, t) {
    e.disposeRunner.add(this), e.uniforms.globals = this.renderer.globalUniforms;
    const s = e.program, i = s.glPrograms[this.renderer.CONTEXT_UID] || this.generateProgram(e);
    return this.shader = e, this.program !== s && (this.program = s, this.gl.useProgram(i.program)), t || (rr.textureCount = 0, rr.uboCount = 0, this.syncUniformGroup(e.uniformGroup, rr)), i;
  }
  /**
   * Uploads the uniforms values to the currently bound shader.
   * @param uniforms - the uniforms values that be applied to the current shader
   */
  setUniforms(e) {
    const t = this.shader.program, s = t.glPrograms[this.renderer.CONTEXT_UID];
    t.syncUniforms(s.uniformData, e, this.renderer);
  }
  /* eslint-disable @typescript-eslint/explicit-module-boundary-types */
  /**
   * Syncs uniforms on the group
   * @param group - the uniform group to sync
   * @param syncData - this is data that is passed to the sync function and any nested sync functions
   */
  syncUniformGroup(e, t) {
    const s = this.getGlProgram();
    (!e.static || e.dirtyId !== s.uniformDirtyGroups[e.id]) && (s.uniformDirtyGroups[e.id] = e.dirtyId, this.syncUniforms(e, s, t));
  }
  /**
   * Overrideable by the @pixi/unsafe-eval package to use static syncUniforms instead.
   * @param group
   * @param glProgram
   * @param syncData
   */
  syncUniforms(e, t, s) {
    (e.syncUniforms[this.shader.program.id] || this.createSyncGroups(e))(t.uniformData, e.uniforms, this.renderer, s);
  }
  createSyncGroups(e) {
    const t = this.getSignature(e, this.shader.program.uniformData, "u");
    return this.cache[t] || (this.cache[t] = Qo(e, this.shader.program.uniformData)), e.syncUniforms[this.shader.program.id] = this.cache[t], e.syncUniforms[this.shader.program.id];
  }
  /**
   * Syncs uniform buffers
   * @param group - the uniform buffer group to sync
   * @param name - the name of the uniform buffer
   */
  syncUniformBufferGroup(e, t) {
    const s = this.getGlProgram();
    if (!e.static || e.dirtyId !== 0 || !s.uniformGroups[e.id]) {
      e.dirtyId = 0;
      const i = s.uniformGroups[e.id] || this.createSyncBufferGroup(e, s, t);
      e.buffer.update(), i(
        s.uniformData,
        e.uniforms,
        this.renderer,
        rr,
        e.buffer
      );
    }
    this.renderer.buffer.bindBufferBase(e.buffer, s.uniformBufferBindings[t]);
  }
  /**
   * Will create a function that uploads a uniform buffer using the STD140 standard.
   * The upload function will then be cached for future calls
   * If a group is manually managed, then a simple upload function is generated
   * @param group - the uniform buffer group to sync
   * @param glProgram - the gl program to attach the uniform bindings to
   * @param name - the name of the uniform buffer (must exist on the shader)
   */
  createSyncBufferGroup(e, t, s) {
    const { gl: i } = this.renderer;
    this.renderer.buffer.bind(e.buffer);
    const n = this.gl.getUniformBlockIndex(t.program, s);
    t.uniformBufferBindings[s] = this.shader.uniformBindCount, i.uniformBlockBinding(t.program, n, this.shader.uniformBindCount), this.shader.uniformBindCount++;
    const a = this.getSignature(e, this.shader.program.uniformData, "ubo");
    let o = this._uboCache[a];
    if (o || (o = this._uboCache[a] = Bh(e, this.shader.program.uniformData)), e.autoManage) {
      const h = new Float32Array(o.size / 4);
      e.buffer.update(h);
    }
    return t.uniformGroups[e.id] = o.syncFunc, t.uniformGroups[e.id];
  }
  /**
   * Takes a uniform group and data and generates a unique signature for them.
   * @param group - The uniform group to get signature of
   * @param group.uniforms
   * @param uniformData - Uniform information generated by the shader
   * @param preFix
   * @returns Unique signature of the uniform group
   */
  getSignature(e, t, s) {
    const i = e.uniforms, n = [`${s}-`];
    for (const a in i)
      n.push(a), t[a] && n.push(t[a].type);
    return n.join("-");
  }
  /**
   * Returns the underlying GLShade rof the currently bound shader.
   *
   * This can be handy for when you to have a little more control over the setting of your uniforms.
   * @returns The glProgram for the currently bound Shader for this context
   */
  getGlProgram() {
    return this.shader ? this.shader.program.glPrograms[this.renderer.CONTEXT_UID] : null;
  }
  /**
   * Generates a glProgram version of the Shader provided.
   * @param shader - The shader that the glProgram will be based on.
   * @returns A shiny new glProgram!
   */
  generateProgram(e) {
    const t = this.gl, s = e.program, i = Ch(t, s);
    return s.glPrograms[this.renderer.CONTEXT_UID] = i, i;
  }
  /** Resets ShaderSystem state, does not affect WebGL state. */
  reset() {
    this.program = null, this.shader = null;
  }
  /**
   * Disposes shader.
   * If disposing one equals with current shader, set current as null.
   * @param shader - Shader object
   */
  disposeShader(e) {
    this.shader === e && (this.shader = null);
  }
  /** Destroys this System and removes all its textures. */
  destroy() {
    this.renderer = null, this.destroyed = !0;
  }
}
ha.extension = {
  type: j.RendererSystem,
  name: "shader"
};
Z.add(ha);
class mr {
  constructor(e) {
    this.renderer = e;
  }
  /**
   * It all starts here! This initiates every system, passing in the options for any system by name.
   * @param options - the config for the renderer and all its systems
   */
  run(e) {
    const { renderer: t } = this;
    t.runners.init.emit(t.options), e.hello && console.log(`PixiJS 7.4.2 - ${t.rendererLogId} - https://pixijs.com`), t.resize(t.screen.width, t.screen.height);
  }
  destroy() {
  }
}
mr.defaultOptions = {
  /**
   * {@link PIXI.IRendererOptions.hello}
   * @default false
   * @memberof PIXI.settings.RENDER_OPTIONS
   */
  hello: !1
}, /** @ignore */
mr.extension = {
  type: [
    j.RendererSystem,
    j.CanvasRendererSystem
  ],
  name: "startup"
};
Z.add(mr);
function Uh(r, e = []) {
  return e[Y.NORMAL] = [r.ONE, r.ONE_MINUS_SRC_ALPHA], e[Y.ADD] = [r.ONE, r.ONE], e[Y.MULTIPLY] = [r.DST_COLOR, r.ONE_MINUS_SRC_ALPHA, r.ONE, r.ONE_MINUS_SRC_ALPHA], e[Y.SCREEN] = [r.ONE, r.ONE_MINUS_SRC_COLOR, r.ONE, r.ONE_MINUS_SRC_ALPHA], e[Y.OVERLAY] = [r.ONE, r.ONE_MINUS_SRC_ALPHA], e[Y.DARKEN] = [r.ONE, r.ONE_MINUS_SRC_ALPHA], e[Y.LIGHTEN] = [r.ONE, r.ONE_MINUS_SRC_ALPHA], e[Y.COLOR_DODGE] = [r.ONE, r.ONE_MINUS_SRC_ALPHA], e[Y.COLOR_BURN] = [r.ONE, r.ONE_MINUS_SRC_ALPHA], e[Y.HARD_LIGHT] = [r.ONE, r.ONE_MINUS_SRC_ALPHA], e[Y.SOFT_LIGHT] = [r.ONE, r.ONE_MINUS_SRC_ALPHA], e[Y.DIFFERENCE] = [r.ONE, r.ONE_MINUS_SRC_ALPHA], e[Y.EXCLUSION] = [r.ONE, r.ONE_MINUS_SRC_ALPHA], e[Y.HUE] = [r.ONE, r.ONE_MINUS_SRC_ALPHA], e[Y.SATURATION] = [r.ONE, r.ONE_MINUS_SRC_ALPHA], e[Y.COLOR] = [r.ONE, r.ONE_MINUS_SRC_ALPHA], e[Y.LUMINOSITY] = [r.ONE, r.ONE_MINUS_SRC_ALPHA], e[Y.NONE] = [0, 0], e[Y.NORMAL_NPM] = [r.SRC_ALPHA, r.ONE_MINUS_SRC_ALPHA, r.ONE, r.ONE_MINUS_SRC_ALPHA], e[Y.ADD_NPM] = [r.SRC_ALPHA, r.ONE, r.ONE, r.ONE], e[Y.SCREEN_NPM] = [r.SRC_ALPHA, r.ONE_MINUS_SRC_COLOR, r.ONE, r.ONE_MINUS_SRC_ALPHA], e[Y.SRC_IN] = [r.DST_ALPHA, r.ZERO], e[Y.SRC_OUT] = [r.ONE_MINUS_DST_ALPHA, r.ZERO], e[Y.SRC_ATOP] = [r.DST_ALPHA, r.ONE_MINUS_SRC_ALPHA], e[Y.DST_OVER] = [r.ONE_MINUS_DST_ALPHA, r.ONE], e[Y.DST_IN] = [r.ZERO, r.SRC_ALPHA], e[Y.DST_OUT] = [r.ZERO, r.ONE_MINUS_SRC_ALPHA], e[Y.DST_ATOP] = [r.ONE_MINUS_DST_ALPHA, r.SRC_ALPHA], e[Y.XOR] = [r.ONE_MINUS_DST_ALPHA, r.ONE_MINUS_SRC_ALPHA], e[Y.SUBTRACT] = [r.ONE, r.ONE, r.ONE, r.ONE, r.FUNC_REVERSE_SUBTRACT, r.FUNC_ADD], e;
}
const Lh = 0, kh = 1, Gh = 2, Dh = 3, $h = 4, Hh = 5, la = class Ls {
  constructor() {
    this.gl = null, this.stateId = 0, this.polygonOffset = 0, this.blendMode = Y.NONE, this._blendEq = !1, this.map = [], this.map[Lh] = this.setBlend, this.map[kh] = this.setOffset, this.map[Gh] = this.setCullFace, this.map[Dh] = this.setDepthTest, this.map[$h] = this.setFrontFace, this.map[Hh] = this.setDepthMask, this.checks = [], this.defaultState = new Tt(), this.defaultState.blend = !0;
  }
  contextChange(e) {
    this.gl = e, this.blendModes = Uh(e), this.set(this.defaultState), this.reset();
  }
  /**
   * Sets the current state
   * @param {*} state - The state to set.
   */
  set(e) {
    if (e = e || this.defaultState, this.stateId !== e.data) {
      let t = this.stateId ^ e.data, s = 0;
      for (; t; )
        t & 1 && this.map[s].call(this, !!(e.data & 1 << s)), t = t >> 1, s++;
      this.stateId = e.data;
    }
    for (let t = 0; t < this.checks.length; t++)
      this.checks[t](this, e);
  }
  /**
   * Sets the state, when previous state is unknown.
   * @param {*} state - The state to set
   */
  forceState(e) {
    e = e || this.defaultState;
    for (let t = 0; t < this.map.length; t++)
      this.map[t].call(this, !!(e.data & 1 << t));
    for (let t = 0; t < this.checks.length; t++)
      this.checks[t](this, e);
    this.stateId = e.data;
  }
  /**
   * Sets whether to enable or disable blending.
   * @param value - Turn on or off WebGl blending.
   */
  setBlend(e) {
    this.updateCheck(Ls.checkBlendMode, e), this.gl[e ? "enable" : "disable"](this.gl.BLEND);
  }
  /**
   * Sets whether to enable or disable polygon offset fill.
   * @param value - Turn on or off webgl polygon offset testing.
   */
  setOffset(e) {
    this.updateCheck(Ls.checkPolygonOffset, e), this.gl[e ? "enable" : "disable"](this.gl.POLYGON_OFFSET_FILL);
  }
  /**
   * Sets whether to enable or disable depth test.
   * @param value - Turn on or off webgl depth testing.
   */
  setDepthTest(e) {
    this.gl[e ? "enable" : "disable"](this.gl.DEPTH_TEST);
  }
  /**
   * Sets whether to enable or disable depth mask.
   * @param value - Turn on or off webgl depth mask.
   */
  setDepthMask(e) {
    this.gl.depthMask(e);
  }
  /**
   * Sets whether to enable or disable cull face.
   * @param {boolean} value - Turn on or off webgl cull face.
   */
  setCullFace(e) {
    this.gl[e ? "enable" : "disable"](this.gl.CULL_FACE);
  }
  /**
   * Sets the gl front face.
   * @param {boolean} value - true is clockwise and false is counter-clockwise
   */
  setFrontFace(e) {
    this.gl.frontFace(this.gl[e ? "CW" : "CCW"]);
  }
  /**
   * Sets the blend mode.
   * @param {number} value - The blend mode to set to.
   */
  setBlendMode(e) {
    if (e === this.blendMode)
      return;
    this.blendMode = e;
    const t = this.blendModes[e], s = this.gl;
    t.length === 2 ? s.blendFunc(t[0], t[1]) : s.blendFuncSeparate(t[0], t[1], t[2], t[3]), t.length === 6 ? (this._blendEq = !0, s.blendEquationSeparate(t[4], t[5])) : this._blendEq && (this._blendEq = !1, s.blendEquationSeparate(s.FUNC_ADD, s.FUNC_ADD));
  }
  /**
   * Sets the polygon offset.
   * @param {number} value - the polygon offset
   * @param {number} scale - the polygon offset scale
   */
  setPolygonOffset(e, t) {
    this.gl.polygonOffset(e, t);
  }
  // used
  /** Resets all the logic and disables the VAOs. */
  reset() {
    this.gl.pixelStorei(this.gl.UNPACK_FLIP_Y_WEBGL, !1), this.forceState(this.defaultState), this._blendEq = !0, this.blendMode = -1, this.setBlendMode(0);
  }
  /**
   * Checks to see which updates should be checked based on which settings have been activated.
   *
   * For example, if blend is enabled then we should check the blend modes each time the state is changed
   * or if polygon fill is activated then we need to check if the polygon offset changes.
   * The idea is that we only check what we have too.
   * @param func - the checking function to add or remove
   * @param value - should the check function be added or removed.
   */
  updateCheck(e, t) {
    const s = this.checks.indexOf(e);
    t && s === -1 ? this.checks.push(e) : !t && s !== -1 && this.checks.splice(s, 1);
  }
  /**
   * A private little wrapper function that we call to check the blend mode.
   * @param system - the System to perform the state check on
   * @param state - the state that the blendMode will pulled from
   */
  static checkBlendMode(e, t) {
    e.setBlendMode(t.blendMode);
  }
  /**
   * A private little wrapper function that we call to check the polygon offset.
   * @param system - the System to perform the state check on
   * @param state - the state that the blendMode will pulled from
   */
  static checkPolygonOffset(e, t) {
    e.setPolygonOffset(1, t.polygonOffset);
  }
  /**
   * @ignore
   */
  destroy() {
    this.gl = null;
  }
};
la.extension = {
  type: j.RendererSystem,
  name: "state"
};
let Vh = la;
Z.add(Vh);
class Wh extends Xs {
  constructor() {
    super(...arguments), this.runners = {}, this._systemsHash = {};
  }
  /**
   * Set up a system with a collection of SystemClasses and runners.
   * Systems are attached dynamically to this class when added.
   * @param config - the config for the system manager
   */
  setup(e) {
    this.addRunners(...e.runners);
    const t = (e.priority ?? []).filter((i) => e.systems[i]), s = [
      ...t,
      ...Object.keys(e.systems).filter((i) => !t.includes(i))
    ];
    for (const i of s)
      this.addSystem(e.systems[i], i);
  }
  /**
   * Create a bunch of runners based of a collection of ids
   * @param runnerIds - the runner ids to add
   */
  addRunners(...e) {
    e.forEach((t) => {
      this.runners[t] = new Oe(t);
    });
  }
  /**
   * Add a new system to the renderer.
   * @param ClassRef - Class reference
   * @param name - Property name for system, if not specified
   *        will use a static `name` property on the class itself. This
   *        name will be assigned as s property on the Renderer so make
   *        sure it doesn't collide with properties on Renderer.
   * @returns Return instance of renderer
   */
  addSystem(e, t) {
    const s = new e(this);
    if (this[t])
      throw new Error(`Whoops! The name "${t}" is already in use`);
    this[t] = s, this._systemsHash[t] = s;
    for (const i in this.runners)
      this.runners[i].add(s);
    return this;
  }
  /**
   * A function that will run a runner and call the runners function but pass in different options
   * to each system based on there name.
   *
   * E.g. If you have two systems added called `systemA` and `systemB` you could call do the following:
   *
   * ```js
   * system.emitWithCustomOptions(init, {
   *     systemA: {...optionsForA},
   *     systemB: {...optionsForB},
   * });
   * ```
   *
   * `init` would be called on system A passing `optionsForA` and on system B passing `optionsForB`.
   * @param runner - the runner to target
   * @param options - key value options for each system
   */
  emitWithCustomOptions(e, t) {
    const s = Object.keys(this._systemsHash);
    e.items.forEach((i) => {
      const n = s.find((a) => this._systemsHash[a] === i);
      i[e.name](t[n]);
    });
  }
  /** destroy the all runners and systems. Its apps job to */
  destroy() {
    Object.values(this.runners).forEach((e) => {
      e.destroy();
    }), this._systemsHash = {};
  }
  // TODO implement!
  // removeSystem(ClassRef: ISystemConstructor, name: string): void
  // {
  // }
}
const Mt = class ar {
  /** @param renderer - The renderer this System works for. */
  constructor(e) {
    this.renderer = e, this.count = 0, this.checkCount = 0, this.maxIdle = ar.defaultMaxIdle, this.checkCountMax = ar.defaultCheckCountMax, this.mode = ar.defaultMode;
  }
  /**
   * Checks to see when the last time a texture was used.
   * If the texture has not been used for a specified amount of time, it will be removed from the GPU.
   */
  postrender() {
    this.renderer.objectRenderer.renderingToScreen && (this.count++, this.mode !== js.MANUAL && (this.checkCount++, this.checkCount > this.checkCountMax && (this.checkCount = 0, this.run())));
  }
  /**
   * Checks to see when the last time a texture was used.
   * If the texture has not been used for a specified amount of time, it will be removed from the GPU.
   */
  run() {
    const e = this.renderer.texture, t = e.managedTextures;
    let s = !1;
    for (let i = 0; i < t.length; i++) {
      const n = t[i];
      n.resource && this.count - n.touched > this.maxIdle && (e.destroyTexture(n, !0), t[i] = null, s = !0);
    }
    if (s) {
      let i = 0;
      for (let n = 0; n < t.length; n++)
        t[n] !== null && (t[i++] = t[n]);
      t.length = i;
    }
  }
  /**
   * Removes all the textures within the specified displayObject and its children from the GPU.
   * @param {PIXI.DisplayObject} displayObject - the displayObject to remove the textures from.
   */
  unload(e) {
    const t = this.renderer.texture, s = e._texture;
    s && !s.framebuffer && t.destroyTexture(s);
    for (let i = e.children.length - 1; i >= 0; i--)
      this.unload(e.children[i]);
  }
  destroy() {
    this.renderer = null;
  }
};
Mt.defaultMode = js.AUTO, /**
* Default maximum idle frames before a texture is destroyed by garbage collection.
* @static
* @default 3600
* @see PIXI.TextureGCSystem#maxIdle
*/
Mt.defaultMaxIdle = 60 * 60, /**
* Default frames between two garbage collections.
* @static
* @default 600
* @see PIXI.TextureGCSystem#checkCountMax
*/
Mt.defaultCheckCountMax = 60 * 10, /** @ignore */
Mt.extension = {
  type: j.RendererSystem,
  name: "textureGC"
};
let rt = Mt;
Z.add(rt);
class Ts {
  constructor(e) {
    this.texture = e, this.width = -1, this.height = -1, this.dirtyId = -1, this.dirtyStyleId = -1, this.mipmap = !1, this.wrapMode = 33071, this.type = se.UNSIGNED_BYTE, this.internalFormat = L.RGBA, this.samplerType = 0;
  }
}
function jh(r) {
  let e;
  return "WebGL2RenderingContext" in globalThis && r instanceof globalThis.WebGL2RenderingContext ? e = {
    [r.RGB]: k.FLOAT,
    [r.RGBA]: k.FLOAT,
    [r.ALPHA]: k.FLOAT,
    [r.LUMINANCE]: k.FLOAT,
    [r.LUMINANCE_ALPHA]: k.FLOAT,
    [r.R8]: k.FLOAT,
    [r.R8_SNORM]: k.FLOAT,
    [r.RG8]: k.FLOAT,
    [r.RG8_SNORM]: k.FLOAT,
    [r.RGB8]: k.FLOAT,
    [r.RGB8_SNORM]: k.FLOAT,
    [r.RGB565]: k.FLOAT,
    [r.RGBA4]: k.FLOAT,
    [r.RGB5_A1]: k.FLOAT,
    [r.RGBA8]: k.FLOAT,
    [r.RGBA8_SNORM]: k.FLOAT,
    [r.RGB10_A2]: k.FLOAT,
    [r.RGB10_A2UI]: k.FLOAT,
    [r.SRGB8]: k.FLOAT,
    [r.SRGB8_ALPHA8]: k.FLOAT,
    [r.R16F]: k.FLOAT,
    [r.RG16F]: k.FLOAT,
    [r.RGB16F]: k.FLOAT,
    [r.RGBA16F]: k.FLOAT,
    [r.R32F]: k.FLOAT,
    [r.RG32F]: k.FLOAT,
    [r.RGB32F]: k.FLOAT,
    [r.RGBA32F]: k.FLOAT,
    [r.R11F_G11F_B10F]: k.FLOAT,
    [r.RGB9_E5]: k.FLOAT,
    [r.R8I]: k.INT,
    [r.R8UI]: k.UINT,
    [r.R16I]: k.INT,
    [r.R16UI]: k.UINT,
    [r.R32I]: k.INT,
    [r.R32UI]: k.UINT,
    [r.RG8I]: k.INT,
    [r.RG8UI]: k.UINT,
    [r.RG16I]: k.INT,
    [r.RG16UI]: k.UINT,
    [r.RG32I]: k.INT,
    [r.RG32UI]: k.UINT,
    [r.RGB8I]: k.INT,
    [r.RGB8UI]: k.UINT,
    [r.RGB16I]: k.INT,
    [r.RGB16UI]: k.UINT,
    [r.RGB32I]: k.INT,
    [r.RGB32UI]: k.UINT,
    [r.RGBA8I]: k.INT,
    [r.RGBA8UI]: k.UINT,
    [r.RGBA16I]: k.INT,
    [r.RGBA16UI]: k.UINT,
    [r.RGBA32I]: k.INT,
    [r.RGBA32UI]: k.UINT,
    [r.DEPTH_COMPONENT16]: k.FLOAT,
    [r.DEPTH_COMPONENT24]: k.FLOAT,
    [r.DEPTH_COMPONENT32F]: k.FLOAT,
    [r.DEPTH_STENCIL]: k.FLOAT,
    [r.DEPTH24_STENCIL8]: k.FLOAT,
    [r.DEPTH32F_STENCIL8]: k.FLOAT
  } : e = {
    [r.RGB]: k.FLOAT,
    [r.RGBA]: k.FLOAT,
    [r.ALPHA]: k.FLOAT,
    [r.LUMINANCE]: k.FLOAT,
    [r.LUMINANCE_ALPHA]: k.FLOAT,
    [r.DEPTH_STENCIL]: k.FLOAT
  }, e;
}
function Xh(r) {
  let e;
  return "WebGL2RenderingContext" in globalThis && r instanceof globalThis.WebGL2RenderingContext ? e = {
    [se.UNSIGNED_BYTE]: {
      [L.RGBA]: r.RGBA8,
      [L.RGB]: r.RGB8,
      [L.RG]: r.RG8,
      [L.RED]: r.R8,
      [L.RGBA_INTEGER]: r.RGBA8UI,
      [L.RGB_INTEGER]: r.RGB8UI,
      [L.RG_INTEGER]: r.RG8UI,
      [L.RED_INTEGER]: r.R8UI,
      [L.ALPHA]: r.ALPHA,
      [L.LUMINANCE]: r.LUMINANCE,
      [L.LUMINANCE_ALPHA]: r.LUMINANCE_ALPHA
    },
    [se.BYTE]: {
      [L.RGBA]: r.RGBA8_SNORM,
      [L.RGB]: r.RGB8_SNORM,
      [L.RG]: r.RG8_SNORM,
      [L.RED]: r.R8_SNORM,
      [L.RGBA_INTEGER]: r.RGBA8I,
      [L.RGB_INTEGER]: r.RGB8I,
      [L.RG_INTEGER]: r.RG8I,
      [L.RED_INTEGER]: r.R8I
    },
    [se.UNSIGNED_SHORT]: {
      [L.RGBA_INTEGER]: r.RGBA16UI,
      [L.RGB_INTEGER]: r.RGB16UI,
      [L.RG_INTEGER]: r.RG16UI,
      [L.RED_INTEGER]: r.R16UI,
      [L.DEPTH_COMPONENT]: r.DEPTH_COMPONENT16
    },
    [se.SHORT]: {
      [L.RGBA_INTEGER]: r.RGBA16I,
      [L.RGB_INTEGER]: r.RGB16I,
      [L.RG_INTEGER]: r.RG16I,
      [L.RED_INTEGER]: r.R16I
    },
    [se.UNSIGNED_INT]: {
      [L.RGBA_INTEGER]: r.RGBA32UI,
      [L.RGB_INTEGER]: r.RGB32UI,
      [L.RG_INTEGER]: r.RG32UI,
      [L.RED_INTEGER]: r.R32UI,
      [L.DEPTH_COMPONENT]: r.DEPTH_COMPONENT24
    },
    [se.INT]: {
      [L.RGBA_INTEGER]: r.RGBA32I,
      [L.RGB_INTEGER]: r.RGB32I,
      [L.RG_INTEGER]: r.RG32I,
      [L.RED_INTEGER]: r.R32I
    },
    [se.FLOAT]: {
      [L.RGBA]: r.RGBA32F,
      [L.RGB]: r.RGB32F,
      [L.RG]: r.RG32F,
      [L.RED]: r.R32F,
      [L.DEPTH_COMPONENT]: r.DEPTH_COMPONENT32F
    },
    [se.HALF_FLOAT]: {
      [L.RGBA]: r.RGBA16F,
      [L.RGB]: r.RGB16F,
      [L.RG]: r.RG16F,
      [L.RED]: r.R16F
    },
    [se.UNSIGNED_SHORT_5_6_5]: {
      [L.RGB]: r.RGB565
    },
    [se.UNSIGNED_SHORT_4_4_4_4]: {
      [L.RGBA]: r.RGBA4
    },
    [se.UNSIGNED_SHORT_5_5_5_1]: {
      [L.RGBA]: r.RGB5_A1
    },
    [se.UNSIGNED_INT_2_10_10_10_REV]: {
      [L.RGBA]: r.RGB10_A2,
      [L.RGBA_INTEGER]: r.RGB10_A2UI
    },
    [se.UNSIGNED_INT_10F_11F_11F_REV]: {
      [L.RGB]: r.R11F_G11F_B10F
    },
    [se.UNSIGNED_INT_5_9_9_9_REV]: {
      [L.RGB]: r.RGB9_E5
    },
    [se.UNSIGNED_INT_24_8]: {
      [L.DEPTH_STENCIL]: r.DEPTH24_STENCIL8
    },
    [se.FLOAT_32_UNSIGNED_INT_24_8_REV]: {
      [L.DEPTH_STENCIL]: r.DEPTH32F_STENCIL8
    }
  } : e = {
    [se.UNSIGNED_BYTE]: {
      [L.RGBA]: r.RGBA,
      [L.RGB]: r.RGB,
      [L.ALPHA]: r.ALPHA,
      [L.LUMINANCE]: r.LUMINANCE,
      [L.LUMINANCE_ALPHA]: r.LUMINANCE_ALPHA
    },
    [se.UNSIGNED_SHORT_5_6_5]: {
      [L.RGB]: r.RGB
    },
    [se.UNSIGNED_SHORT_4_4_4_4]: {
      [L.RGBA]: r.RGBA
    },
    [se.UNSIGNED_SHORT_5_5_5_1]: {
      [L.RGBA]: r.RGBA
    }
  }, e;
}
class ua {
  /**
   * @param renderer - The renderer this system works for.
   */
  constructor(e) {
    this.renderer = e, this.boundTextures = [], this.currentLocation = -1, this.managedTextures = [], this._unknownBoundTextures = !1, this.unknownTexture = new he(), this.hasIntegerTextures = !1;
  }
  /** Sets up the renderer context and necessary buffers. */
  contextChange() {
    const e = this.gl = this.renderer.gl;
    this.CONTEXT_UID = this.renderer.CONTEXT_UID, this.webGLVersion = this.renderer.context.webGLVersion, this.internalFormats = Xh(e), this.samplerTypes = jh(e);
    const t = e.getParameter(e.MAX_TEXTURE_IMAGE_UNITS);
    this.boundTextures.length = t;
    for (let i = 0; i < t; i++)
      this.boundTextures[i] = null;
    this.emptyTextures = {};
    const s = new Ts(e.createTexture());
    e.bindTexture(e.TEXTURE_2D, s.texture), e.texImage2D(e.TEXTURE_2D, 0, e.RGBA, 1, 1, 0, e.RGBA, e.UNSIGNED_BYTE, new Uint8Array(4)), this.emptyTextures[e.TEXTURE_2D] = s, this.emptyTextures[e.TEXTURE_CUBE_MAP] = new Ts(e.createTexture()), e.bindTexture(e.TEXTURE_CUBE_MAP, this.emptyTextures[e.TEXTURE_CUBE_MAP].texture);
    for (let i = 0; i < 6; i++)
      e.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X + i, 0, e.RGBA, 1, 1, 0, e.RGBA, e.UNSIGNED_BYTE, null);
    e.texParameteri(e.TEXTURE_CUBE_MAP, e.TEXTURE_MAG_FILTER, e.LINEAR), e.texParameteri(e.TEXTURE_CUBE_MAP, e.TEXTURE_MIN_FILTER, e.LINEAR);
    for (let i = 0; i < this.boundTextures.length; i++)
      this.bind(null, i);
  }
  /**
   * Bind a texture to a specific location
   *
   * If you want to unbind something, please use `unbind(texture)` instead of `bind(null, textureLocation)`
   * @param texture - Texture to bind
   * @param [location=0] - Location to bind at
   */
  bind(e, t = 0) {
    const { gl: s } = this;
    if (e = e?.castToBaseTexture(), e?.valid && !e.parentTextureArray) {
      e.touched = this.renderer.textureGC.count;
      const i = e._glTextures[this.CONTEXT_UID] || this.initTexture(e);
      this.boundTextures[t] !== e && (this.currentLocation !== t && (this.currentLocation = t, s.activeTexture(s.TEXTURE0 + t)), s.bindTexture(e.target, i.texture)), i.dirtyId !== e.dirtyId ? (this.currentLocation !== t && (this.currentLocation = t, s.activeTexture(s.TEXTURE0 + t)), this.updateTexture(e)) : i.dirtyStyleId !== e.dirtyStyleId && this.updateTextureStyle(e), this.boundTextures[t] = e;
    } else
      this.currentLocation !== t && (this.currentLocation = t, s.activeTexture(s.TEXTURE0 + t)), s.bindTexture(s.TEXTURE_2D, this.emptyTextures[s.TEXTURE_2D].texture), this.boundTextures[t] = null;
  }
  /** Resets texture location and bound textures Actual `bind(null, i)` calls will be performed at next `unbind()` call */
  reset() {
    this._unknownBoundTextures = !0, this.hasIntegerTextures = !1, this.currentLocation = -1;
    for (let e = 0; e < this.boundTextures.length; e++)
      this.boundTextures[e] = this.unknownTexture;
  }
  /**
   * Unbind a texture.
   * @param texture - Texture to bind
   */
  unbind(e) {
    const { gl: t, boundTextures: s } = this;
    if (this._unknownBoundTextures) {
      this._unknownBoundTextures = !1;
      for (let i = 0; i < s.length; i++)
        s[i] === this.unknownTexture && this.bind(null, i);
    }
    for (let i = 0; i < s.length; i++)
      s[i] === e && (this.currentLocation !== i && (t.activeTexture(t.TEXTURE0 + i), this.currentLocation = i), t.bindTexture(e.target, this.emptyTextures[e.target].texture), s[i] = null);
  }
  /**
   * Ensures that current boundTextures all have FLOAT sampler type,
   * see {@link PIXI.SAMPLER_TYPES} for explanation.
   * @param maxTextures - number of locations to check
   */
  ensureSamplerType(e) {
    const { boundTextures: t, hasIntegerTextures: s, CONTEXT_UID: i } = this;
    if (s)
      for (let n = e - 1; n >= 0; --n) {
        const a = t[n];
        a && a._glTextures[i].samplerType !== k.FLOAT && this.renderer.texture.unbind(a);
      }
  }
  /**
   * Initialize a texture
   * @private
   * @param texture - Texture to initialize
   */
  initTexture(e) {
    const t = new Ts(this.gl.createTexture());
    return t.dirtyId = -1, e._glTextures[this.CONTEXT_UID] = t, this.managedTextures.push(e), e.on("dispose", this.destroyTexture, this), t;
  }
  initTextureType(e, t) {
    t.internalFormat = this.internalFormats[e.type]?.[e.format] ?? e.format, t.samplerType = this.samplerTypes[t.internalFormat] ?? k.FLOAT, this.webGLVersion === 2 && e.type === se.HALF_FLOAT ? t.type = this.gl.HALF_FLOAT : t.type = e.type;
  }
  /**
   * Update a texture
   * @private
   * @param {PIXI.BaseTexture} texture - Texture to initialize
   */
  updateTexture(e) {
    const t = e._glTextures[this.CONTEXT_UID];
    if (!t)
      return;
    const s = this.renderer;
    if (this.initTextureType(e, t), e.resource?.upload(s, e, t))
      t.samplerType !== k.FLOAT && (this.hasIntegerTextures = !0);
    else {
      const i = e.realWidth, n = e.realHeight, a = s.gl;
      (t.width !== i || t.height !== n || t.dirtyId < 0) && (t.width = i, t.height = n, a.texImage2D(
        e.target,
        0,
        t.internalFormat,
        i,
        n,
        0,
        e.format,
        t.type,
        null
      ));
    }
    e.dirtyStyleId !== t.dirtyStyleId && this.updateTextureStyle(e), t.dirtyId = e.dirtyId;
  }
  /**
   * Deletes the texture from WebGL
   * @private
   * @param texture - the texture to destroy
   * @param [skipRemove=false] - Whether to skip removing the texture from the TextureManager.
   */
  destroyTexture(e, t) {
    const { gl: s } = this;
    if (e = e.castToBaseTexture(), e._glTextures[this.CONTEXT_UID] && (this.unbind(e), s.deleteTexture(e._glTextures[this.CONTEXT_UID].texture), e.off("dispose", this.destroyTexture, this), delete e._glTextures[this.CONTEXT_UID], !t)) {
      const i = this.managedTextures.indexOf(e);
      i !== -1 && Fo(this.managedTextures, i, 1);
    }
  }
  /**
   * Update texture style such as mipmap flag
   * @private
   * @param {PIXI.BaseTexture} texture - Texture to update
   */
  updateTextureStyle(e) {
    const t = e._glTextures[this.CONTEXT_UID];
    t && ((e.mipmap === at.POW2 || this.webGLVersion !== 2) && !e.isPowerOfTwo ? t.mipmap = !1 : t.mipmap = e.mipmap >= 1, this.webGLVersion !== 2 && !e.isPowerOfTwo ? t.wrapMode = Ws.CLAMP : t.wrapMode = e.wrapMode, e.resource?.style(this.renderer, e, t) || this.setStyle(e, t), t.dirtyStyleId = e.dirtyStyleId);
  }
  /**
   * Set style for texture
   * @private
   * @param texture - Texture to update
   * @param glTexture
   */
  setStyle(e, t) {
    const s = this.gl;
    if (t.mipmap && e.mipmap !== at.ON_MANUAL && s.generateMipmap(e.target), s.texParameteri(e.target, s.TEXTURE_WRAP_S, t.wrapMode), s.texParameteri(e.target, s.TEXTURE_WRAP_T, t.wrapMode), t.mipmap) {
      s.texParameteri(e.target, s.TEXTURE_MIN_FILTER, e.scaleMode === De.LINEAR ? s.LINEAR_MIPMAP_LINEAR : s.NEAREST_MIPMAP_NEAREST);
      const i = this.renderer.context.extensions.anisotropicFiltering;
      if (i && e.anisotropicLevel > 0 && e.scaleMode === De.LINEAR) {
        const n = Math.min(e.anisotropicLevel, s.getParameter(i.MAX_TEXTURE_MAX_ANISOTROPY_EXT));
        s.texParameterf(e.target, i.TEXTURE_MAX_ANISOTROPY_EXT, n);
      }
    } else
      s.texParameteri(e.target, s.TEXTURE_MIN_FILTER, e.scaleMode === De.LINEAR ? s.LINEAR : s.NEAREST);
    s.texParameteri(e.target, s.TEXTURE_MAG_FILTER, e.scaleMode === De.LINEAR ? s.LINEAR : s.NEAREST);
  }
  destroy() {
    this.renderer = null;
  }
}
ua.extension = {
  type: j.RendererSystem,
  name: "texture"
};
Z.add(ua);
class ca {
  /**
   * @param renderer - The renderer this System works for.
   */
  constructor(e) {
    this.renderer = e;
  }
  /** Sets up the renderer context and necessary buffers. */
  contextChange() {
    this.gl = this.renderer.gl, this.CONTEXT_UID = this.renderer.CONTEXT_UID;
  }
  /**
   * Bind TransformFeedback and buffers
   * @param transformFeedback - TransformFeedback to bind
   */
  bind(e) {
    const { gl: t, CONTEXT_UID: s } = this, i = e._glTransformFeedbacks[s] || this.createGLTransformFeedback(e);
    t.bindTransformFeedback(t.TRANSFORM_FEEDBACK, i);
  }
  /** Unbind TransformFeedback */
  unbind() {
    const { gl: e } = this;
    e.bindTransformFeedback(e.TRANSFORM_FEEDBACK, null);
  }
  /**
   * Begin TransformFeedback
   * @param drawMode - DrawMode for TransformFeedback
   * @param shader - A Shader used by TransformFeedback. Current bound shader will be used if not provided.
   */
  beginTransformFeedback(e, t) {
    const { gl: s, renderer: i } = this;
    t && i.shader.bind(t), s.beginTransformFeedback(e);
  }
  /** End TransformFeedback */
  endTransformFeedback() {
    const { gl: e } = this;
    e.endTransformFeedback();
  }
  /**
   * Create TransformFeedback and bind buffers
   * @param tf - TransformFeedback
   * @returns WebGLTransformFeedback
   */
  createGLTransformFeedback(e) {
    const { gl: t, renderer: s, CONTEXT_UID: i } = this, n = t.createTransformFeedback();
    e._glTransformFeedbacks[i] = n, t.bindTransformFeedback(t.TRANSFORM_FEEDBACK, n);
    for (let a = 0; a < e.buffers.length; a++) {
      const o = e.buffers[a];
      o && (s.buffer.update(o), o._glBuffers[i].refCount++, t.bindBufferBase(t.TRANSFORM_FEEDBACK_BUFFER, a, o._glBuffers[i].buffer || null));
    }
    return t.bindTransformFeedback(t.TRANSFORM_FEEDBACK, null), e.disposeRunner.add(this), n;
  }
  /**
   * Disposes TransfromFeedback
   * @param {PIXI.TransformFeedback} tf - TransformFeedback
   * @param {boolean} [contextLost=false] - If context was lost, we suppress delete TransformFeedback
   */
  disposeTransformFeedback(e, t) {
    const s = e._glTransformFeedbacks[this.CONTEXT_UID], i = this.gl;
    e.disposeRunner.remove(this);
    const n = this.renderer.buffer;
    if (n)
      for (let a = 0; a < e.buffers.length; a++) {
        const o = e.buffers[a];
        if (!o)
          continue;
        const h = o._glBuffers[this.CONTEXT_UID];
        h && (h.refCount--, h.refCount === 0 && !t && n.dispose(o, t));
      }
    s && (t || i.deleteTransformFeedback(s), delete e._glTransformFeedbacks[this.CONTEXT_UID]);
  }
  destroy() {
    this.renderer = null;
  }
}
ca.extension = {
  type: j.RendererSystem,
  name: "transformFeedback"
};
Z.add(ca);
class yr {
  constructor(e) {
    this.renderer = e;
  }
  /**
   * initiates the view system
   * @param {PIXI.ViewOptions} options - the options for the view
   */
  init(e) {
    this.screen = new me(0, 0, e.width, e.height), this.element = e.view || J.ADAPTER.createCanvas(), this.resolution = e.resolution || J.RESOLUTION, this.autoDensity = !!e.autoDensity;
  }
  /**
   * Resizes the screen and canvas to the specified dimensions.
   * @param desiredScreenWidth - The new width of the screen.
   * @param desiredScreenHeight - The new height of the screen.
   */
  resizeView(e, t) {
    this.element.width = Math.round(e * this.resolution), this.element.height = Math.round(t * this.resolution);
    const s = this.element.width / this.resolution, i = this.element.height / this.resolution;
    this.screen.width = s, this.screen.height = i, this.autoDensity && (this.element.style.width = `${s}px`, this.element.style.height = `${i}px`), this.renderer.emit("resize", s, i), this.renderer.runners.resize.emit(this.screen.width, this.screen.height);
  }
  /**
   * Destroys this System and optionally removes the canvas from the dom.
   * @param {boolean} [removeView=false] - Whether to remove the canvas from the DOM.
   */
  destroy(e) {
    e && this.element.parentNode?.removeChild(this.element), this.renderer = null, this.element = null, this.screen = null;
  }
}
yr.defaultOptions = {
  /**
   * {@link PIXI.IRendererOptions.width}
   * @default 800
   * @memberof PIXI.settings.RENDER_OPTIONS
   */
  width: 800,
  /**
   * {@link PIXI.IRendererOptions.height}
   * @default 600
   * @memberof PIXI.settings.RENDER_OPTIONS
   */
  height: 600,
  /**
   * {@link PIXI.IRendererOptions.resolution}
   * @type {number}
   * @default PIXI.settings.RESOLUTION
   * @memberof PIXI.settings.RENDER_OPTIONS
   */
  resolution: void 0,
  /**
   * {@link PIXI.IRendererOptions.autoDensity}
   * @default false
   * @memberof PIXI.settings.RENDER_OPTIONS
   */
  autoDensity: !1
}, /** @ignore */
yr.extension = {
  type: [
    j.RendererSystem,
    j.CanvasRendererSystem
  ],
  name: "_view"
};
Z.add(yr);
J.PREFER_ENV = ot.WEBGL2;
J.STRICT_TEXTURE_CACHE = !1;
J.RENDER_OPTIONS = {
  ...pr.defaultOptions,
  ...fr.defaultOptions,
  ...yr.defaultOptions,
  ...mr.defaultOptions
};
Object.defineProperties(J, {
  /**
   * @static
   * @name WRAP_MODE
   * @memberof PIXI.settings
   * @type {PIXI.WRAP_MODES}
   * @deprecated since 7.1.0
   * @see PIXI.BaseTexture.defaultOptions.wrapMode
   */
  WRAP_MODE: {
    get() {
      return he.defaultOptions.wrapMode;
    },
    set(r) {
      ue("7.1.0", "settings.WRAP_MODE is deprecated, use BaseTexture.defaultOptions.wrapMode"), he.defaultOptions.wrapMode = r;
    }
  },
  /**
   * @static
   * @name SCALE_MODE
   * @memberof PIXI.settings
   * @type {PIXI.SCALE_MODES}
   * @deprecated since 7.1.0
   * @see PIXI.BaseTexture.defaultOptions.scaleMode
   */
  SCALE_MODE: {
    get() {
      return he.defaultOptions.scaleMode;
    },
    set(r) {
      ue("7.1.0", "settings.SCALE_MODE is deprecated, use BaseTexture.defaultOptions.scaleMode"), he.defaultOptions.scaleMode = r;
    }
  },
  /**
   * @static
   * @name MIPMAP_TEXTURES
   * @memberof PIXI.settings
   * @type {PIXI.MIPMAP_MODES}
   * @deprecated since 7.1.0
   * @see PIXI.BaseTexture.defaultOptions.mipmap
   */
  MIPMAP_TEXTURES: {
    get() {
      return he.defaultOptions.mipmap;
    },
    set(r) {
      ue("7.1.0", "settings.MIPMAP_TEXTURES is deprecated, use BaseTexture.defaultOptions.mipmap"), he.defaultOptions.mipmap = r;
    }
    // MIPMAP_MODES.POW2,
  },
  /**
   * @static
   * @name ANISOTROPIC_LEVEL
   * @memberof PIXI.settings
   * @type {number}
   * @deprecated since 7.1.0
   * @see PIXI.BaseTexture.defaultOptions.anisotropicLevel
   */
  ANISOTROPIC_LEVEL: {
    get() {
      return he.defaultOptions.anisotropicLevel;
    },
    set(r) {
      ue(
        "7.1.0",
        "settings.ANISOTROPIC_LEVEL is deprecated, use BaseTexture.defaultOptions.anisotropicLevel"
      ), he.defaultOptions.anisotropicLevel = r;
    }
  },
  /**
   * Default filter resolution.
   * @static
   * @name FILTER_RESOLUTION
   * @memberof PIXI.settings
   * @deprecated since 7.1.0
   * @type {number|null}
   * @see PIXI.Filter.defaultResolution
   */
  FILTER_RESOLUTION: {
    get() {
      return ue("7.1.0", "settings.FILTER_RESOLUTION is deprecated, use Filter.defaultResolution"), yt.defaultResolution;
    },
    set(r) {
      yt.defaultResolution = r;
    }
  },
  /**
   * Default filter samples.
   * @static
   * @name FILTER_MULTISAMPLE
   * @memberof PIXI.settings
   * @deprecated since 7.1.0
   * @type {PIXI.MSAA_QUALITY}
   * @see PIXI.Filter.defaultMultisample
   */
  FILTER_MULTISAMPLE: {
    get() {
      return ue("7.1.0", "settings.FILTER_MULTISAMPLE is deprecated, use Filter.defaultMultisample"), yt.defaultMultisample;
    },
    set(r) {
      yt.defaultMultisample = r;
    }
  },
  /**
   * The maximum textures that this device supports.
   * @static
   * @name SPRITE_MAX_TEXTURES
   * @memberof PIXI.settings
   * @deprecated since 7.1.0
   * @see PIXI.BatchRenderer.defaultMaxTextures
   * @type {number}
   */
  SPRITE_MAX_TEXTURES: {
    get() {
      return tt.defaultMaxTextures;
    },
    set(r) {
      ue("7.1.0", "settings.SPRITE_MAX_TEXTURES is deprecated, use BatchRenderer.defaultMaxTextures"), tt.defaultMaxTextures = r;
    }
  },
  /**
   * The default sprite batch size.
   *
   * The default aims to balance desktop and mobile devices.
   * @static
   * @name SPRITE_BATCH_SIZE
   * @memberof PIXI.settings
   * @see PIXI.BatchRenderer.defaultBatchSize
   * @deprecated since 7.1.0
   * @type {number}
   */
  SPRITE_BATCH_SIZE: {
    get() {
      return tt.defaultBatchSize;
    },
    set(r) {
      ue("7.1.0", "settings.SPRITE_BATCH_SIZE is deprecated, use BatchRenderer.defaultBatchSize"), tt.defaultBatchSize = r;
    }
  },
  /**
   * Can we upload the same buffer in a single frame?
   * @static
   * @name CAN_UPLOAD_SAME_BUFFER
   * @memberof PIXI.settings
   * @see PIXI.BatchRenderer.canUploadSameBuffer
   * @deprecated since 7.1.0
   * @type {boolean}
   */
  CAN_UPLOAD_SAME_BUFFER: {
    get() {
      return tt.canUploadSameBuffer;
    },
    set(r) {
      ue("7.1.0", "settings.CAN_UPLOAD_SAME_BUFFER is deprecated, use BatchRenderer.canUploadSameBuffer"), tt.canUploadSameBuffer = r;
    }
  },
  /**
   * Default Garbage Collection mode.
   * @static
   * @name GC_MODE
   * @memberof PIXI.settings
   * @type {PIXI.GC_MODES}
   * @deprecated since 7.1.0
   * @see PIXI.TextureGCSystem.defaultMode
   */
  GC_MODE: {
    get() {
      return rt.defaultMode;
    },
    set(r) {
      ue("7.1.0", "settings.GC_MODE is deprecated, use TextureGCSystem.defaultMode"), rt.defaultMode = r;
    }
  },
  /**
   * Default Garbage Collection max idle.
   * @static
   * @name GC_MAX_IDLE
   * @memberof PIXI.settings
   * @type {number}
   * @deprecated since 7.1.0
   * @see PIXI.TextureGCSystem.defaultMaxIdle
   */
  GC_MAX_IDLE: {
    get() {
      return rt.defaultMaxIdle;
    },
    set(r) {
      ue("7.1.0", "settings.GC_MAX_IDLE is deprecated, use TextureGCSystem.defaultMaxIdle"), rt.defaultMaxIdle = r;
    }
  },
  /**
   * Default Garbage Collection maximum check count.
   * @static
   * @name GC_MAX_CHECK_COUNT
   * @memberof PIXI.settings
   * @type {number}
   * @deprecated since 7.1.0
   * @see PIXI.TextureGCSystem.defaultCheckCountMax
   */
  GC_MAX_CHECK_COUNT: {
    get() {
      return rt.defaultCheckCountMax;
    },
    set(r) {
      ue("7.1.0", "settings.GC_MAX_CHECK_COUNT is deprecated, use TextureGCSystem.defaultCheckCountMax"), rt.defaultCheckCountMax = r;
    }
  },
  /**
   * Default specify float precision in vertex shader.
   * @static
   * @name PRECISION_VERTEX
   * @memberof PIXI.settings
   * @type {PIXI.PRECISION}
   * @deprecated since 7.1.0
   * @see PIXI.Program.defaultVertexPrecision
   */
  PRECISION_VERTEX: {
    get() {
      return nt.defaultVertexPrecision;
    },
    set(r) {
      ue("7.1.0", "settings.PRECISION_VERTEX is deprecated, use Program.defaultVertexPrecision"), nt.defaultVertexPrecision = r;
    }
  },
  /**
   * Default specify float precision in fragment shader.
   * @static
   * @name PRECISION_FRAGMENT
   * @memberof PIXI.settings
   * @type {PIXI.PRECISION}
   * @deprecated since 7.1.0
   * @see PIXI.Program.defaultFragmentPrecision
   */
  PRECISION_FRAGMENT: {
    get() {
      return nt.defaultFragmentPrecision;
    },
    set(r) {
      ue("7.1.0", "settings.PRECISION_FRAGMENT is deprecated, use Program.defaultFragmentPrecision"), nt.defaultFragmentPrecision = r;
    }
  }
});
var gr = /* @__PURE__ */ ((r) => (r[r.INTERACTION = 50] = "INTERACTION", r[r.HIGH = 25] = "HIGH", r[r.NORMAL = 0] = "NORMAL", r[r.LOW = -25] = "LOW", r[r.UTILITY = -50] = "UTILITY", r))(gr || {});
class ws {
  /**
   * Constructor
   * @private
   * @param fn - The listener function to be added for one update
   * @param context - The listener context
   * @param priority - The priority for emitting
   * @param once - If the handler should fire once
   */
  constructor(e, t = null, s = 0, i = !1) {
    this.next = null, this.previous = null, this._destroyed = !1, this.fn = e, this.context = t, this.priority = s, this.once = i;
  }
  /**
   * Simple compare function to figure out if a function and context match.
   * @private
   * @param fn - The listener function to be added for one update
   * @param context - The listener context
   * @returns `true` if the listener match the arguments
   */
  match(e, t = null) {
    return this.fn === e && this.context === t;
  }
  /**
   * Emit by calling the current function.
   * @private
   * @param deltaTime - time since the last emit.
   * @returns Next ticker
   */
  emit(e) {
    this.fn && (this.context ? this.fn.call(this.context, e) : this.fn(e));
    const t = this.next;
    return this.once && this.destroy(!0), this._destroyed && (this.next = null), t;
  }
  /**
   * Connect to the list.
   * @private
   * @param previous - Input node, previous listener
   */
  connect(e) {
    this.previous = e, e.next && (e.next.previous = this), this.next = e.next, e.next = this;
  }
  /**
   * Destroy and don't use after this.
   * @private
   * @param hard - `true` to remove the `next` reference, this
   *        is considered a hard destroy. Soft destroy maintains the next reference.
   * @returns The listener to redirect while emitting or removing.
   */
  destroy(e = !1) {
    this._destroyed = !0, this.fn = null, this.context = null, this.previous && (this.previous.next = this.next), this.next && (this.next.previous = this.previous);
    const t = this.next;
    return this.next = e ? null : t, this.previous = null, t;
  }
}
const da = class we {
  constructor() {
    this.autoStart = !1, this.deltaTime = 1, this.lastTime = -1, this.speed = 1, this.started = !1, this._requestId = null, this._maxElapsedMS = 100, this._minElapsedMS = 0, this._protected = !1, this._lastFrame = -1, this._head = new ws(null, null, 1 / 0), this.deltaMS = 1 / we.targetFPMS, this.elapsedMS = 1 / we.targetFPMS, this._tick = (e) => {
      this._requestId = null, this.started && (this.update(e), this.started && this._requestId === null && this._head.next && (this._requestId = requestAnimationFrame(this._tick)));
    };
  }
  /**
   * Conditionally requests a new animation frame.
   * If a frame has not already been requested, and if the internal
   * emitter has listeners, a new frame is requested.
   * @private
   */
  _requestIfNeeded() {
    this._requestId === null && this._head.next && (this.lastTime = performance.now(), this._lastFrame = this.lastTime, this._requestId = requestAnimationFrame(this._tick));
  }
  /**
   * Conditionally cancels a pending animation frame.
   * @private
   */
  _cancelIfNeeded() {
    this._requestId !== null && (cancelAnimationFrame(this._requestId), this._requestId = null);
  }
  /**
   * Conditionally requests a new animation frame.
   * If the ticker has been started it checks if a frame has not already
   * been requested, and if the internal emitter has listeners. If these
   * conditions are met, a new frame is requested. If the ticker has not
   * been started, but autoStart is `true`, then the ticker starts now,
   * and continues with the previous conditions to request a new frame.
   * @private
   */
  _startIfPossible() {
    this.started ? this._requestIfNeeded() : this.autoStart && this.start();
  }
  /**
   * Register a handler for tick events. Calls continuously unless
   * it is removed or the ticker is stopped.
   * @param fn - The listener function to be added for updates
   * @param context - The listener context
   * @param {number} [priority=PIXI.UPDATE_PRIORITY.NORMAL] - The priority for emitting
   * @returns This instance of a ticker
   */
  add(e, t, s = gr.NORMAL) {
    return this._addListener(new ws(e, t, s));
  }
  /**
   * Add a handler for the tick event which is only execute once.
   * @param fn - The listener function to be added for one update
   * @param context - The listener context
   * @param {number} [priority=PIXI.UPDATE_PRIORITY.NORMAL] - The priority for emitting
   * @returns This instance of a ticker
   */
  addOnce(e, t, s = gr.NORMAL) {
    return this._addListener(new ws(e, t, s, !0));
  }
  /**
   * Internally adds the event handler so that it can be sorted by priority.
   * Priority allows certain handler (user, AnimatedSprite, Interaction) to be run
   * before the rendering.
   * @private
   * @param listener - Current listener being added.
   * @returns This instance of a ticker
   */
  _addListener(e) {
    let t = this._head.next, s = this._head;
    if (!t)
      e.connect(s);
    else {
      for (; t; ) {
        if (e.priority > t.priority) {
          e.connect(s);
          break;
        }
        s = t, t = t.next;
      }
      e.previous || e.connect(s);
    }
    return this._startIfPossible(), this;
  }
  /**
   * Removes any handlers matching the function and context parameters.
   * If no handlers are left after removing, then it cancels the animation frame.
   * @param fn - The listener function to be removed
   * @param context - The listener context to be removed
   * @returns This instance of a ticker
   */
  remove(e, t) {
    let s = this._head.next;
    for (; s; )
      s.match(e, t) ? s = s.destroy() : s = s.next;
    return this._head.next || this._cancelIfNeeded(), this;
  }
  /**
   * The number of listeners on this ticker, calculated by walking through linked list
   * @readonly
   * @member {number}
   */
  get count() {
    if (!this._head)
      return 0;
    let e = 0, t = this._head;
    for (; t = t.next; )
      e++;
    return e;
  }
  /** Starts the ticker. If the ticker has listeners a new animation frame is requested at this point. */
  start() {
    this.started || (this.started = !0, this._requestIfNeeded());
  }
  /** Stops the ticker. If the ticker has requested an animation frame it is canceled at this point. */
  stop() {
    this.started && (this.started = !1, this._cancelIfNeeded());
  }
  /** Destroy the ticker and don't use after this. Calling this method removes all references to internal events. */
  destroy() {
    if (!this._protected) {
      this.stop();
      let e = this._head.next;
      for (; e; )
        e = e.destroy(!0);
      this._head.destroy(), this._head = null;
    }
  }
  /**
   * Triggers an update. An update entails setting the
   * current {@link PIXI.Ticker#elapsedMS},
   * the current {@link PIXI.Ticker#deltaTime},
   * invoking all listeners with current deltaTime,
   * and then finally setting {@link PIXI.Ticker#lastTime}
   * with the value of currentTime that was provided.
   * This method will be called automatically by animation
   * frame callbacks if the ticker instance has been started
   * and listeners are added.
   * @param {number} [currentTime=performance.now()] - the current time of execution
   */
  update(e = performance.now()) {
    let t;
    if (e > this.lastTime) {
      if (t = this.elapsedMS = e - this.lastTime, t > this._maxElapsedMS && (t = this._maxElapsedMS), t *= this.speed, this._minElapsedMS) {
        const n = e - this._lastFrame | 0;
        if (n < this._minElapsedMS)
          return;
        this._lastFrame = e - n % this._minElapsedMS;
      }
      this.deltaMS = t, this.deltaTime = this.deltaMS * we.targetFPMS;
      const s = this._head;
      let i = s.next;
      for (; i; )
        i = i.emit(this.deltaTime);
      s.next || this._cancelIfNeeded();
    } else
      this.deltaTime = this.deltaMS = this.elapsedMS = 0;
    this.lastTime = e;
  }
  /**
   * The frames per second at which this ticker is running.
   * The default is approximately 60 in most modern browsers.
   * **Note:** This does not factor in the value of
   * {@link PIXI.Ticker#speed}, which is specific
   * to scaling {@link PIXI.Ticker#deltaTime}.
   * @member {number}
   * @readonly
   */
  get FPS() {
    return 1e3 / this.elapsedMS;
  }
  /**
   * Manages the maximum amount of milliseconds allowed to
   * elapse between invoking {@link PIXI.Ticker#update}.
   * This value is used to cap {@link PIXI.Ticker#deltaTime},
   * but does not effect the measured value of {@link PIXI.Ticker#FPS}.
   * When setting this property it is clamped to a value between
   * `0` and `Ticker.targetFPMS * 1000`.
   * @member {number}
   * @default 10
   */
  get minFPS() {
    return 1e3 / this._maxElapsedMS;
  }
  set minFPS(e) {
    const t = Math.min(this.maxFPS, e), s = Math.min(Math.max(0, t) / 1e3, we.targetFPMS);
    this._maxElapsedMS = 1 / s;
  }
  /**
   * Manages the minimum amount of milliseconds required to
   * elapse between invoking {@link PIXI.Ticker#update}.
   * This will effect the measured value of {@link PIXI.Ticker#FPS}.
   * If it is set to `0`, then there is no limit; PixiJS will render as many frames as it can.
   * Otherwise it will be at least `minFPS`
   * @member {number}
   * @default 0
   */
  get maxFPS() {
    return this._minElapsedMS ? Math.round(1e3 / this._minElapsedMS) : 0;
  }
  set maxFPS(e) {
    if (e === 0)
      this._minElapsedMS = 0;
    else {
      const t = Math.max(this.minFPS, e);
      this._minElapsedMS = 1 / (t / 1e3);
    }
  }
  /**
   * The shared ticker instance used by {@link PIXI.AnimatedSprite} and by
   * {@link PIXI.VideoResource} to update animation frames / video textures.
   *
   * It may also be used by {@link PIXI.Application} if created with the `sharedTicker` option property set to true.
   *
   * The property {@link PIXI.Ticker#autoStart} is set to `true` for this instance.
   * Please follow the examples for usage, including how to opt-out of auto-starting the shared ticker.
   * @example
   * import { Ticker } from 'pixi.js';
   *
   * const ticker = Ticker.shared;
   * // Set this to prevent starting this ticker when listeners are added.
   * // By default this is true only for the PIXI.Ticker.shared instance.
   * ticker.autoStart = false;
   *
   * // FYI, call this to ensure the ticker is stopped. It should be stopped
   * // if you have not attempted to render anything yet.
   * ticker.stop();
   *
   * // Call this when you are ready for a running shared ticker.
   * ticker.start();
   * @example
   * import { autoDetectRenderer, Container } from 'pixi.js';
   *
   * // You may use the shared ticker to render...
   * const renderer = autoDetectRenderer();
   * const stage = new Container();
   * document.body.appendChild(renderer.view);
   * ticker.add((time) => renderer.render(stage));
   *
   * // Or you can just update it manually.
   * ticker.autoStart = false;
   * ticker.stop();
   * const animate = (time) => {
   *     ticker.update(time);
   *     renderer.render(stage);
   *     requestAnimationFrame(animate);
   * };
   * animate(performance.now());
   * @member {PIXI.Ticker}
   * @static
   */
  static get shared() {
    if (!we._shared) {
      const e = we._shared = new we();
      e.autoStart = !0, e._protected = !0;
    }
    return we._shared;
  }
  /**
   * The system ticker instance used by {@link PIXI.BasePrepare} for core timing
   * functionality that shouldn't usually need to be paused, unlike the `shared`
   * ticker which drives visual animations and rendering which may want to be paused.
   *
   * The property {@link PIXI.Ticker#autoStart} is set to `true` for this instance.
   * @member {PIXI.Ticker}
   * @static
   */
  static get system() {
    if (!we._system) {
      const e = we._system = new we();
      e.autoStart = !0, e._protected = !0;
    }
    return we._system;
  }
};
da.targetFPMS = 0.06;
let Xe = da;
Object.defineProperties(J, {
  /**
   * Target frames per millisecond.
   * @static
   * @name TARGET_FPMS
   * @memberof PIXI.settings
   * @type {number}
   * @deprecated since 7.1.0
   * @see PIXI.Ticker.targetFPMS
   */
  TARGET_FPMS: {
    get() {
      return Xe.targetFPMS;
    },
    set(r) {
      ue("7.1.0", "settings.TARGET_FPMS is deprecated, use Ticker.targetFPMS"), Xe.targetFPMS = r;
    }
  }
});
class fa {
  /**
   * Initialize the plugin with scope of application instance
   * @static
   * @private
   * @param {object} [options] - See application options
   */
  static init(e) {
    e = Object.assign({
      autoStart: !0,
      sharedTicker: !1
    }, e), Object.defineProperty(
      this,
      "ticker",
      {
        set(t) {
          this._ticker && this._ticker.remove(this.render, this), this._ticker = t, t && t.add(this.render, this, gr.LOW);
        },
        get() {
          return this._ticker;
        }
      }
    ), this.stop = () => {
      this._ticker.stop();
    }, this.start = () => {
      this._ticker.start();
    }, this._ticker = null, this.ticker = e.sharedTicker ? Xe.shared : new Xe(), e.autoStart && this.start();
  }
  /**
   * Clean up the ticker, scoped to application.
   * @static
   * @private
   */
  static destroy() {
    if (this._ticker) {
      const e = this._ticker;
      this.ticker = null, e.destroy();
    }
  }
}
fa.extension = j.Application;
Z.add(fa);
const zh = [];
Z.handleByList(j.Renderer, zh);
class pa {
  constructor(e) {
    this.renderer = e;
  }
  contextChange(e) {
    let t;
    if (this.renderer.context.webGLVersion === 1) {
      const s = e.getParameter(e.FRAMEBUFFER_BINDING);
      e.bindFramebuffer(e.FRAMEBUFFER, null), t = e.getParameter(e.SAMPLES), e.bindFramebuffer(e.FRAMEBUFFER, s);
    } else {
      const s = e.getParameter(e.DRAW_FRAMEBUFFER_BINDING);
      e.bindFramebuffer(e.DRAW_FRAMEBUFFER, null), t = e.getParameter(e.SAMPLES), e.bindFramebuffer(e.DRAW_FRAMEBUFFER, s);
    }
    t >= ge.HIGH ? this.multisample = ge.HIGH : t >= ge.MEDIUM ? this.multisample = ge.MEDIUM : t >= ge.LOW ? this.multisample = ge.LOW : this.multisample = ge.NONE;
  }
  destroy() {
  }
}
pa.extension = {
  type: j.RendererSystem,
  name: "_multisample"
};
Z.add(pa);
class qh {
  constructor(e) {
    this.buffer = e || null, this.updateID = -1, this.byteLength = -1, this.refCount = 0;
  }
}
class ma {
  /**
   * @param {PIXI.Renderer} renderer - The renderer this System works for.
   */
  constructor(e) {
    this.renderer = e, this.managedBuffers = {}, this.boundBufferBases = {};
  }
  /**
   * @ignore
   */
  destroy() {
    this.renderer = null;
  }
  /** Sets up the renderer context and necessary buffers. */
  contextChange() {
    this.disposeAll(!0), this.gl = this.renderer.gl, this.CONTEXT_UID = this.renderer.CONTEXT_UID;
  }
  /**
   * This binds specified buffer. On first run, it will create the webGL buffers for the context too
   * @param buffer - the buffer to bind to the renderer
   */
  bind(e) {
    const { gl: t, CONTEXT_UID: s } = this, i = e._glBuffers[s] || this.createGLBuffer(e);
    t.bindBuffer(e.type, i.buffer);
  }
  unbind(e) {
    const { gl: t } = this;
    t.bindBuffer(e, null);
  }
  /**
   * Binds an uniform buffer to at the given index.
   *
   * A cache is used so a buffer will not be bound again if already bound.
   * @param buffer - the buffer to bind
   * @param index - the base index to bind it to.
   */
  bindBufferBase(e, t) {
    const { gl: s, CONTEXT_UID: i } = this;
    if (this.boundBufferBases[t] !== e) {
      const n = e._glBuffers[i] || this.createGLBuffer(e);
      this.boundBufferBases[t] = e, s.bindBufferBase(s.UNIFORM_BUFFER, t, n.buffer);
    }
  }
  /**
   * Binds a buffer whilst also binding its range.
   * This will make the buffer start from the offset supplied rather than 0 when it is read.
   * @param buffer - the buffer to bind
   * @param index - the base index to bind at, defaults to 0
   * @param offset - the offset to bind at (this is blocks of 256). 0 = 0, 1 = 256, 2 = 512 etc
   */
  bindBufferRange(e, t, s) {
    const { gl: i, CONTEXT_UID: n } = this;
    s = s || 0;
    const a = e._glBuffers[n] || this.createGLBuffer(e);
    i.bindBufferRange(i.UNIFORM_BUFFER, t || 0, a.buffer, s * 256, 256);
  }
  /**
   * Will ensure the data in the buffer is uploaded to the GPU.
   * @param {PIXI.Buffer} buffer - the buffer to update
   */
  update(e) {
    const { gl: t, CONTEXT_UID: s } = this, i = e._glBuffers[s] || this.createGLBuffer(e);
    if (e._updateID !== i.updateID)
      if (i.updateID = e._updateID, t.bindBuffer(e.type, i.buffer), i.byteLength >= e.data.byteLength)
        t.bufferSubData(e.type, 0, e.data);
      else {
        const n = e.static ? t.STATIC_DRAW : t.DYNAMIC_DRAW;
        i.byteLength = e.data.byteLength, t.bufferData(e.type, e.data, n);
      }
  }
  /**
   * Disposes buffer
   * @param {PIXI.Buffer} buffer - buffer with data
   * @param {boolean} [contextLost=false] - If context was lost, we suppress deleteVertexArray
   */
  dispose(e, t) {
    if (!this.managedBuffers[e.id])
      return;
    delete this.managedBuffers[e.id];
    const s = e._glBuffers[this.CONTEXT_UID], i = this.gl;
    e.disposeRunner.remove(this), s && (t || i.deleteBuffer(s.buffer), delete e._glBuffers[this.CONTEXT_UID]);
  }
  /**
   * dispose all WebGL resources of all managed buffers
   * @param {boolean} [contextLost=false] - If context was lost, we suppress `gl.delete` calls
   */
  disposeAll(e) {
    const t = Object.keys(this.managedBuffers);
    for (let s = 0; s < t.length; s++)
      this.dispose(this.managedBuffers[t[s]], e);
  }
  /**
   * creates and attaches a GLBuffer object tied to the current context.
   * @param buffer
   * @protected
   */
  createGLBuffer(e) {
    const { CONTEXT_UID: t, gl: s } = this;
    return e._glBuffers[t] = new qh(s.createBuffer()), this.managedBuffers[e.id] = e, e.disposeRunner.add(this), e._glBuffers[t];
  }
}
ma.extension = {
  type: j.RendererSystem,
  name: "buffer"
};
Z.add(ma);
class ya {
  // renderers scene graph!
  constructor(e) {
    this.renderer = e;
  }
  /**
   * Renders the object to its WebGL view.
   * @param displayObject - The object to be rendered.
   * @param options - the options to be passed to the renderer
   */
  render(e, t) {
    const s = this.renderer;
    let i, n, a, o;
    if (t && (i = t.renderTexture, n = t.clear, a = t.transform, o = t.skipUpdateTransform), this.renderingToScreen = !i, s.runners.prerender.emit(), s.emit("prerender"), s.projection.transform = a, !s.context.isLost) {
      if (i || (this.lastObjectRendered = e), !o) {
        const h = e.enableTempParent();
        e.updateTransform(), e.disableTempParent(h);
      }
      s.renderTexture.bind(i), s.batch.currentRenderer.start(), (n ?? s.background.clearBeforeRender) && s.renderTexture.clear(), e.render(s), s.batch.currentRenderer.flush(), i && (t.blit && s.framebuffer.blit(), i.baseTexture.update()), s.runners.postrender.emit(), s.projection.transform = null, s.emit("postrender");
    }
  }
  destroy() {
    this.renderer = null, this.lastObjectRendered = null;
  }
}
ya.extension = {
  type: j.RendererSystem,
  name: "objectRenderer"
};
Z.add(ya);
const or = class ks extends Wh {
  /**
   * @param {PIXI.IRendererOptions} [options] - See {@link PIXI.settings.RENDER_OPTIONS} for defaults.
   */
  constructor(e) {
    super(), this.type = Sn.WEBGL, e = Object.assign({}, J.RENDER_OPTIONS, e), this.gl = null, this.CONTEXT_UID = 0, this.globalUniforms = new Le({
      projectionMatrix: new Ae()
    }, !0);
    const t = {
      runners: [
        "init",
        "destroy",
        "contextChange",
        "resolutionChange",
        "reset",
        "update",
        "postrender",
        "prerender",
        "resize"
      ],
      systems: ks.__systems,
      priority: [
        "_view",
        "textureGenerator",
        "background",
        "_plugin",
        "startup",
        // low level WebGL systems
        "context",
        "state",
        "texture",
        "buffer",
        "geometry",
        "framebuffer",
        "transformFeedback",
        // high level pixi specific rendering
        "mask",
        "scissor",
        "stencil",
        "projection",
        "textureGC",
        "filter",
        "renderTexture",
        "batch",
        "objectRenderer",
        "_multisample"
      ]
    };
    this.setup(t), "useContextAlpha" in e && (ue("7.0.0", "options.useContextAlpha is deprecated, use options.premultipliedAlpha and options.backgroundAlpha instead"), e.premultipliedAlpha = e.useContextAlpha && e.useContextAlpha !== "notMultiplied", e.backgroundAlpha = e.useContextAlpha === !1 ? 1 : e.backgroundAlpha), this._plugin.rendererPlugins = ks.__plugins, this.options = e, this.startup.run(this.options);
  }
  /**
   * Create renderer if WebGL is available. Overrideable
   * by the **@pixi/canvas-renderer** package to allow fallback.
   * throws error if WebGL is not available.
   * @param options
   * @private
   */
  static test(e) {
    return e?.forceCanvas ? !1 : _o();
  }
  /**
   * Renders the object to its WebGL view.
   * @param displayObject - The object to be rendered.
   * @param {object} [options] - Object to use for render options.
   * @param {PIXI.RenderTexture} [options.renderTexture] - The render texture to render to.
   * @param {boolean} [options.clear=true] - Should the canvas be cleared before the new render.
   * @param {PIXI.Matrix} [options.transform] - A transform to apply to the render texture before rendering.
   * @param {boolean} [options.skipUpdateTransform=false] - Should we skip the update transform pass?
   */
  render(e, t) {
    this.objectRenderer.render(e, t);
  }
  /**
   * Resizes the WebGL view to the specified width and height.
   * @param desiredScreenWidth - The desired width of the screen.
   * @param desiredScreenHeight - The desired height of the screen.
   */
  resize(e, t) {
    this._view.resizeView(e, t);
  }
  /**
   * Resets the WebGL state so you can render things however you fancy!
   * @returns Returns itself.
   */
  reset() {
    return this.runners.reset.emit(), this;
  }
  /** Clear the frame buffer. */
  clear() {
    this.renderTexture.bind(), this.renderTexture.clear();
  }
  /**
   * Removes everything from the renderer (event listeners, spritebatch, etc...)
   * @param [removeView=false] - Removes the Canvas element from the DOM.
   *  See: https://github.com/pixijs/pixijs/issues/2233
   */
  destroy(e = !1) {
    this.runners.destroy.items.reverse(), this.emitWithCustomOptions(this.runners.destroy, {
      _view: e
    }), super.destroy();
  }
  /** Collection of plugins */
  get plugins() {
    return this._plugin.plugins;
  }
  /** The number of msaa samples of the canvas. */
  get multisample() {
    return this._multisample.multisample;
  }
  /**
   * Same as view.width, actual number of pixels in the canvas by horizontal.
   * @member {number}
   * @readonly
   * @default 800
   */
  get width() {
    return this._view.element.width;
  }
  /**
   * Same as view.height, actual number of pixels in the canvas by vertical.
   * @default 600
   */
  get height() {
    return this._view.element.height;
  }
  /** The resolution / device pixel ratio of the renderer. */
  get resolution() {
    return this._view.resolution;
  }
  set resolution(e) {
    this._view.resolution = e, this.runners.resolutionChange.emit(e);
  }
  /** Whether CSS dimensions of canvas view should be resized to screen dimensions automatically. */
  get autoDensity() {
    return this._view.autoDensity;
  }
  /** The canvas element that everything is drawn to.*/
  get view() {
    return this._view.element;
  }
  /**
   * Measurements of the screen. (0, 0, screenWidth, screenHeight).
   *
   * Its safe to use as filterArea or hitArea for the whole stage.
   * @member {PIXI.Rectangle}
   */
  get screen() {
    return this._view.screen;
  }
  /** the last object rendered by the renderer. Useful for other plugins like interaction managers */
  get lastObjectRendered() {
    return this.objectRenderer.lastObjectRendered;
  }
  /** Flag if we are rendering to the screen vs renderTexture */
  get renderingToScreen() {
    return this.objectRenderer.renderingToScreen;
  }
  /** When logging Pixi to the console, this is the name we will show */
  get rendererLogId() {
    return `WebGL ${this.context.webGLVersion}`;
  }
  /**
   * This sets weather the screen is totally cleared between each frame withthe background color and alpha
   * @deprecated since 7.0.0
   */
  get clearBeforeRender() {
    return ue("7.0.0", "renderer.clearBeforeRender has been deprecated, please use renderer.background.clearBeforeRender instead."), this.background.clearBeforeRender;
  }
  /**
   * Pass-thru setting for the canvas' context `alpha` property. This is typically
   * not something you need to fiddle with. If you want transparency, use `backgroundAlpha`.
   * @deprecated since 7.0.0
   * @member {boolean}
   */
  get useContextAlpha() {
    return ue("7.0.0", "renderer.useContextAlpha has been deprecated, please use renderer.context.premultipliedAlpha instead."), this.context.useContextAlpha;
  }
  /**
   * readonly drawing buffer preservation
   * we can only know this if Pixi created the context
   * @deprecated since 7.0.0
   */
  get preserveDrawingBuffer() {
    return ue("7.0.0", "renderer.preserveDrawingBuffer has been deprecated, we cannot truly know this unless pixi created the context"), this.context.preserveDrawingBuffer;
  }
  /**
   * The background color to fill if not transparent
   * @member {number}
   * @deprecated since 7.0.0
   */
  get backgroundColor() {
    return ue("7.0.0", "renderer.backgroundColor has been deprecated, use renderer.background.color instead."), this.background.color;
  }
  set backgroundColor(e) {
    ue("7.0.0", "renderer.backgroundColor has been deprecated, use renderer.background.color instead."), this.background.color = e;
  }
  /**
   * The background color alpha. Setting this to 0 will make the canvas transparent.
   * @member {number}
   * @deprecated since 7.0.0
   */
  get backgroundAlpha() {
    return ue("7.0.0", "renderer.backgroundAlpha has been deprecated, use renderer.background.alpha instead."), this.background.alpha;
  }
  /**
   * @deprecated since 7.0.0
   */
  set backgroundAlpha(e) {
    ue("7.0.0", "renderer.backgroundAlpha has been deprecated, use renderer.background.alpha instead."), this.background.alpha = e;
  }
  /**
   * @deprecated since 7.0.0
   */
  get powerPreference() {
    return ue("7.0.0", "renderer.powerPreference has been deprecated, we can only know this if pixi creates the context"), this.context.powerPreference;
  }
  /**
   * Useful function that returns a texture of the display object that can then be used to create sprites
   * This can be quite useful if your displayObject is complicated and needs to be reused multiple times.
   * @param displayObject - The displayObject the object will be generated from.
   * @param {IGenerateTextureOptions} options - Generate texture options.
   * @param {PIXI.Rectangle} options.region - The region of the displayObject, that shall be rendered,
   *        if no region is specified, defaults to the local bounds of the displayObject.
   * @param {number} [options.resolution] - If not given, the renderer's resolution is used.
   * @param {PIXI.MSAA_QUALITY} [options.multisample] - If not given, the renderer's multisample is used.
   * @returns A texture of the graphics object.
   */
  generateTexture(e, t) {
    return this.textureGenerator.generateTexture(e, t);
  }
};
or.extension = {
  type: j.Renderer,
  priority: 1
}, /**
* Collection of installed plugins. These are included by default in PIXI, but can be excluded
* by creating a custom build. Consult the README for more information about creating custom
* builds and excluding plugins.
* @private
*/
or.__plugins = {}, /**
* The collection of installed systems.
* @private
*/
or.__systems = {};
let Ys = or;
Z.handleByMap(j.RendererPlugin, Ys.__plugins);
Z.handleByMap(j.RendererSystem, Ys.__systems);
Z.add(Ys);
class ga extends Dt {
  /**
   * @param length
   * @param options - Options to for Resource constructor
   * @param {number} [options.width] - Width of the resource
   * @param {number} [options.height] - Height of the resource
   */
  constructor(e, t) {
    const { width: s, height: i } = t || {};
    super(s, i), this.items = [], this.itemDirtyIds = [];
    for (let n = 0; n < e; n++) {
      const a = new he();
      this.items.push(a), this.itemDirtyIds.push(-2);
    }
    this.length = e, this._load = null, this.baseTexture = null;
  }
  /**
   * Used from ArrayResource and CubeResource constructors.
   * @param resources - Can be resources, image elements, canvas, etc. ,
   *  length should be same as constructor length
   * @param options - Detect options for resources
   */
  initFromArray(e, t) {
    for (let s = 0; s < this.length; s++)
      e[s] && (e[s].castToBaseTexture ? this.addBaseTextureAt(e[s].castToBaseTexture(), s) : e[s] instanceof Dt ? this.addResourceAt(e[s], s) : this.addResourceAt(Un(e[s], t), s));
  }
  /** Destroy this BaseImageResource. */
  dispose() {
    for (let e = 0, t = this.length; e < t; e++)
      this.items[e].destroy();
    this.items = null, this.itemDirtyIds = null, this._load = null;
  }
  /**
   * Set a resource by ID
   * @param resource
   * @param index - Zero-based index of resource to set
   * @returns - Instance for chaining
   */
  addResourceAt(e, t) {
    if (!this.items[t])
      throw new Error(`Index ${t} is out of bounds`);
    return e.valid && !this.valid && this.resize(e.width, e.height), this.items[t].setResource(e), this;
  }
  /**
   * Set the parent base texture.
   * @param baseTexture
   */
  bind(e) {
    if (this.baseTexture !== null)
      throw new Error("Only one base texture per TextureArray is allowed");
    super.bind(e);
    for (let t = 0; t < this.length; t++)
      this.items[t].parentTextureArray = e, this.items[t].on("update", e.update, e);
  }
  /**
   * Unset the parent base texture.
   * @param baseTexture
   */
  unbind(e) {
    super.unbind(e);
    for (let t = 0; t < this.length; t++)
      this.items[t].parentTextureArray = null, this.items[t].off("update", e.update, e);
  }
  /**
   * Load all the resources simultaneously
   * @returns - When load is resolved
   */
  load() {
    if (this._load)
      return this._load;
    const e = this.items.map((t) => t.resource).filter((t) => t).map((t) => t.load());
    return this._load = Promise.all(e).then(
      () => {
        const { realWidth: t, realHeight: s } = this.items[0];
        return this.resize(t, s), this.update(), Promise.resolve(this);
      }
    ), this._load;
  }
}
class Kh extends ga {
  /**
   * @param source - Number of items in array or the collection
   *        of image URLs to use. Can also be resources, image elements, canvas, etc.
   * @param options - Options to apply to {@link PIXI.autoDetectResource}
   * @param {number} [options.width] - Width of the resource
   * @param {number} [options.height] - Height of the resource
   */
  constructor(e, t) {
    const { width: s, height: i } = t || {};
    let n, a;
    Array.isArray(e) ? (n = e, a = e.length) : a = e, super(a, { width: s, height: i }), n && this.initFromArray(n, t);
  }
  /**
   * Set a baseTexture by ID,
   * ArrayResource just takes resource from it, nothing more
   * @param baseTexture
   * @param index - Zero-based index of resource to set
   * @returns - Instance for chaining
   */
  addBaseTextureAt(e, t) {
    if (e.resource)
      this.addResourceAt(e.resource, t);
    else
      throw new Error("ArrayResource does not support RenderTexture");
    return this;
  }
  /**
   * Add binding
   * @param baseTexture
   */
  bind(e) {
    super.bind(e), e.target = vt.TEXTURE_2D_ARRAY;
  }
  /**
   * Upload the resources to the GPU.
   * @param renderer
   * @param texture
   * @param glTexture
   * @returns - whether texture was uploaded
   */
  upload(e, t, s) {
    const { length: i, itemDirtyIds: n, items: a } = this, { gl: o } = e;
    s.dirtyId < 0 && o.texImage3D(
      o.TEXTURE_2D_ARRAY,
      0,
      s.internalFormat,
      this._width,
      this._height,
      i,
      0,
      t.format,
      s.type,
      null
    );
    for (let h = 0; h < i; h++) {
      const l = a[h];
      n[h] < l.dirtyId && (n[h] = l.dirtyId, l.valid && o.texSubImage3D(
        o.TEXTURE_2D_ARRAY,
        0,
        0,
        // xoffset
        0,
        // yoffset
        h,
        // zoffset
        l.resource.width,
        l.resource.height,
        1,
        t.format,
        s.type,
        l.resource.source
      ));
    }
    return !0;
  }
}
class Zh extends He {
  /**
   * @param source - Canvas element to use
   */
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(e) {
    super(e);
  }
  /**
   * Used to auto-detect the type of resource.
   * @param {*} source - The source object
   * @returns {boolean} `true` if source is HTMLCanvasElement or OffscreenCanvas
   */
  static test(e) {
    const { OffscreenCanvas: t } = globalThis;
    return t && e instanceof t ? !0 : globalThis.HTMLCanvasElement && e instanceof HTMLCanvasElement;
  }
}
const va = class Ut extends ga {
  /**
   * @param {Array<string|PIXI.Resource>} [source] - Collection of URLs or resources
   *        to use as the sides of the cube.
   * @param options - ImageResource options
   * @param {number} [options.width] - Width of resource
   * @param {number} [options.height] - Height of resource
   * @param {number} [options.autoLoad=true] - Whether to auto-load resources
   * @param {number} [options.linkBaseTexture=true] - In case BaseTextures are supplied,
   *   whether to copy them or use
   */
  constructor(e, t) {
    const { width: s, height: i, autoLoad: n, linkBaseTexture: a } = t || {};
    if (e && e.length !== Ut.SIDES)
      throw new Error(`Invalid length. Got ${e.length}, expected 6`);
    super(6, { width: s, height: i });
    for (let o = 0; o < Ut.SIDES; o++)
      this.items[o].target = vt.TEXTURE_CUBE_MAP_POSITIVE_X + o;
    this.linkBaseTexture = a !== !1, e && this.initFromArray(e, t), n !== !1 && this.load();
  }
  /**
   * Add binding.
   * @param baseTexture - parent base texture
   */
  bind(e) {
    super.bind(e), e.target = vt.TEXTURE_CUBE_MAP;
  }
  addBaseTextureAt(e, t, s) {
    if (s === void 0 && (s = this.linkBaseTexture), !this.items[t])
      throw new Error(`Index ${t} is out of bounds`);
    if (!this.linkBaseTexture || e.parentTextureArray || Object.keys(e._glTextures).length > 0)
      if (e.resource)
        this.addResourceAt(e.resource, t);
      else
        throw new Error("CubeResource does not support copying of renderTexture.");
    else
      e.target = vt.TEXTURE_CUBE_MAP_POSITIVE_X + t, e.parentTextureArray = this.baseTexture, this.items[t] = e;
    return e.valid && !this.valid && this.resize(e.realWidth, e.realHeight), this.items[t] = e, this;
  }
  /**
   * Upload the resource
   * @param renderer
   * @param _baseTexture
   * @param glTexture
   * @returns {boolean} true is success
   */
  upload(e, t, s) {
    const i = this.itemDirtyIds;
    for (let n = 0; n < Ut.SIDES; n++) {
      const a = this.items[n];
      (i[n] < a.dirtyId || s.dirtyId < t.dirtyId) && (a.valid && a.resource ? (a.resource.upload(e, a, s), i[n] = a.dirtyId) : i[n] < -1 && (e.gl.texImage2D(
        a.target,
        0,
        s.internalFormat,
        t.realWidth,
        t.realHeight,
        0,
        t.format,
        s.type,
        null
      ), i[n] = -1));
    }
    return !0;
  }
  /**
   * Used to auto-detect the type of resource.
   * @param {*} source - The source object
   * @returns {boolean} `true` if source is an array of 6 elements
   */
  static test(e) {
    return Array.isArray(e) && e.length === Ut.SIDES;
  }
};
va.SIDES = 6;
let Yh = va;
class gt extends He {
  /**
   * @param source - ImageBitmap or URL to use.
   * @param options - Options to use.
   */
  constructor(e, t) {
    t = t || {};
    let s, i, n;
    typeof e == "string" ? (s = gt.EMPTY, i = e, n = !0) : (s = e, i = null, n = !1), super(s), this.url = i, this.crossOrigin = t.crossOrigin ?? !0, this.alphaMode = typeof t.alphaMode == "number" ? t.alphaMode : null, this.ownsImageBitmap = t.ownsImageBitmap ?? n, this._load = null, t.autoLoad !== !1 && this.load();
  }
  load() {
    return this._load ? this._load : (this._load = new Promise(async (e, t) => {
      if (this.url === null) {
        e(this);
        return;
      }
      try {
        const s = await J.ADAPTER.fetch(this.url, {
          mode: this.crossOrigin ? "cors" : "no-cors"
        });
        if (this.destroyed)
          return;
        const i = await s.blob();
        if (this.destroyed)
          return;
        const n = await createImageBitmap(i, {
          premultiplyAlpha: this.alphaMode === null || this.alphaMode === Pe.UNPACK ? "premultiply" : "none"
        });
        if (this.destroyed) {
          n.close();
          return;
        }
        this.source = n, this.update(), e(this);
      } catch (s) {
        if (this.destroyed)
          return;
        t(s), this.onError.emit(s);
      }
    }), this._load);
  }
  /**
   * Upload the image bitmap resource to GPU.
   * @param renderer - Renderer to upload to
   * @param baseTexture - BaseTexture for this resource
   * @param glTexture - GLTexture to use
   * @returns {boolean} true is success
   */
  upload(e, t, s) {
    return this.source instanceof ImageBitmap ? (typeof this.alphaMode == "number" && (t.alphaMode = this.alphaMode), super.upload(e, t, s)) : (this.load(), !1);
  }
  /** Destroys this resource. */
  dispose() {
    this.ownsImageBitmap && this.source instanceof ImageBitmap && this.source.close(), super.dispose(), this._load = null;
  }
  /**
   * Used to auto-detect the type of resource.
   * @param {*} source - The source object
   * @returns {boolean} `true` if current environment support ImageBitmap, and source is string or ImageBitmap
   */
  static test(e) {
    return !!globalThis.createImageBitmap && typeof ImageBitmap < "u" && (typeof e == "string" || e instanceof ImageBitmap);
  }
  /**
   * ImageBitmap cannot be created synchronously, so a empty placeholder canvas is needed when loading from URLs.
   * Only for internal usage.
   * @returns The cached placeholder canvas.
   */
  static get EMPTY() {
    return gt._EMPTY = gt._EMPTY ?? J.ADAPTER.createCanvas(0, 0), gt._EMPTY;
  }
}
const Gs = class hr extends He {
  /**
   * @param sourceBase64 - Base64 encoded SVG element or URL for SVG file.
   * @param {object} [options] - Options to use
   * @param {number} [options.scale=1] - Scale to apply to SVG. Overridden by...
   * @param {number} [options.width] - Rasterize SVG this wide. Aspect ratio preserved if height not specified.
   * @param {number} [options.height] - Rasterize SVG this high. Aspect ratio preserved if width not specified.
   * @param {boolean} [options.autoLoad=true] - Start loading right away.
   */
  constructor(e, t) {
    t = t || {}, super(J.ADAPTER.createCanvas()), this._width = 0, this._height = 0, this.svg = e, this.scale = t.scale || 1, this._overrideWidth = t.width, this._overrideHeight = t.height, this._resolve = null, this._crossorigin = t.crossorigin, this._load = null, t.autoLoad !== !1 && this.load();
  }
  load() {
    return this._load ? this._load : (this._load = new Promise((e) => {
      if (this._resolve = () => {
        this.update(), e(this);
      }, hr.SVG_XML.test(this.svg.trim())) {
        if (!btoa)
          throw new Error("Your browser doesn't support base64 conversions.");
        this.svg = `data:image/svg+xml;base64,${btoa(unescape(encodeURIComponent(this.svg)))}`;
      }
      this._loadSvg();
    }), this._load);
  }
  /** Loads an SVG image from `imageUrl` or `data URL`. */
  _loadSvg() {
    const e = new Image();
    He.crossOrigin(e, this.svg, this._crossorigin), e.src = this.svg, e.onerror = (t) => {
      this._resolve && (e.onerror = null, this.onError.emit(t));
    }, e.onload = () => {
      if (!this._resolve)
        return;
      const t = e.width, s = e.height;
      if (!t || !s)
        throw new Error("The SVG image must have width and height defined (in pixels), canvas API needs them.");
      let i = t * this.scale, n = s * this.scale;
      (this._overrideWidth || this._overrideHeight) && (i = this._overrideWidth || this._overrideHeight / s * t, n = this._overrideHeight || this._overrideWidth / t * s), i = Math.round(i), n = Math.round(n);
      const a = this.source;
      a.width = i, a.height = n, a._pixiId = `canvas_${kt()}`, a.getContext("2d").drawImage(e, 0, 0, t, s, 0, 0, i, n), this._resolve(), this._resolve = null;
    };
  }
  /**
   * Get size from an svg string using a regular expression.
   * @param svgString - a serialized svg element
   * @returns - image extension
   */
  static getSize(e) {
    const t = hr.SVG_SIZE.exec(e), s = {};
    return t && (s[t[1]] = Math.round(parseFloat(t[3])), s[t[5]] = Math.round(parseFloat(t[7]))), s;
  }
  /** Destroys this texture. */
  dispose() {
    super.dispose(), this._resolve = null, this._crossorigin = null;
  }
  /**
   * Used to auto-detect the type of resource.
   * @param {*} source - The source object
   * @param {string} extension - The extension of source, if set
   * @returns {boolean} - If the source is a SVG source or data file
   */
  static test(e, t) {
    return t === "svg" || typeof e == "string" && e.startsWith("data:image/svg+xml") || typeof e == "string" && hr.SVG_XML.test(e);
  }
  // eslint-disable-line max-len
};
Gs.SVG_XML = /^(<\?xml[^?]+\?>)?\s*(<!--[^(-->)]*-->)?\s*\<svg/m, /**
* Regular expression for SVG size.
* @example &lt;svg width="100" height="100"&gt;&lt;/svg&gt;
* @readonly
*/
Gs.SVG_SIZE = /<svg[^>]*(?:\s(width|height)=('|")(\d*(?:\.\d+)?)(?:px)?('|"))[^>]*(?:\s(width|height)=('|")(\d*(?:\.\d+)?)(?:px)?('|"))[^>]*>/i;
let Ds = Gs;
class Qh extends He {
  /**
   * @param source - Image element to use
   */
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(e) {
    super(e);
  }
  /**
   * Used to auto-detect the type of resource.
   * @param {*} source - The source object
   * @returns {boolean} `true` if source is an VideoFrame
   */
  static test(e) {
    return !!globalThis.VideoFrame && e instanceof globalThis.VideoFrame;
  }
}
const $s = class Hs extends He {
  /**
   * @param {HTMLVideoElement|object|string|Array<string|object>} source - Video element to use.
   * @param {object} [options] - Options to use
   * @param {boolean} [options.autoLoad=true] - Start loading the video immediately
   * @param {boolean} [options.autoPlay=true] - Start playing video immediately
   * @param {number} [options.updateFPS=0] - How many times a second to update the texture from the video.
   * If 0, `requestVideoFrameCallback` is used to update the texture.
   * If `requestVideoFrameCallback` is not available, the texture is updated every render.
   * @param {boolean} [options.crossorigin=true] - Load image using cross origin
   * @param {boolean} [options.loop=false] - Loops the video
   * @param {boolean} [options.muted=false] - Mutes the video audio, useful for autoplay
   * @param {boolean} [options.playsinline=true] - Prevents opening the video on mobile devices
   */
  constructor(e, t) {
    if (t = t || {}, !(e instanceof HTMLVideoElement)) {
      const s = document.createElement("video");
      t.autoLoad !== !1 && s.setAttribute("preload", "auto"), t.playsinline !== !1 && (s.setAttribute("webkit-playsinline", ""), s.setAttribute("playsinline", "")), t.muted === !0 && (s.setAttribute("muted", ""), s.muted = !0), t.loop === !0 && s.setAttribute("loop", ""), t.autoPlay !== !1 && s.setAttribute("autoplay", ""), typeof e == "string" && (e = [e]);
      const i = e[0].src || e[0];
      He.crossOrigin(s, i, t.crossorigin);
      for (let n = 0; n < e.length; ++n) {
        const a = document.createElement("source");
        let { src: o, mime: h } = e[n];
        if (o = o || e[n], o.startsWith("data:"))
          h = o.slice(5, o.indexOf(";"));
        else if (!o.startsWith("blob:")) {
          const l = o.split("?").shift().toLowerCase(), c = l.slice(l.lastIndexOf(".") + 1);
          h = h || Hs.MIME_TYPES[c] || `video/${c}`;
        }
        a.src = o, h && (a.type = h), s.appendChild(a);
      }
      e = s;
    }
    super(e), this.noSubImage = !0, this._autoUpdate = !0, this._isConnectedToTicker = !1, this._updateFPS = t.updateFPS || 0, this._msToNextUpdate = 0, this.autoPlay = t.autoPlay !== !1, this._videoFrameRequestCallback = this._videoFrameRequestCallback.bind(this), this._videoFrameRequestCallbackHandle = null, this._load = null, this._resolve = null, this._reject = null, this._onCanPlay = this._onCanPlay.bind(this), this._onError = this._onError.bind(this), this._onPlayStart = this._onPlayStart.bind(this), this._onPlayStop = this._onPlayStop.bind(this), this._onSeeked = this._onSeeked.bind(this), t.autoLoad !== !1 && this.load();
  }
  /**
   * Trigger updating of the texture.
   * @param _deltaTime - time delta since last tick
   */
  update(e = 0) {
    if (!this.destroyed) {
      if (this._updateFPS) {
        const t = Xe.shared.elapsedMS * this.source.playbackRate;
        this._msToNextUpdate = Math.floor(this._msToNextUpdate - t);
      }
      (!this._updateFPS || this._msToNextUpdate <= 0) && (super.update(
        /* deltaTime*/
      ), this._msToNextUpdate = this._updateFPS ? Math.floor(1e3 / this._updateFPS) : 0);
    }
  }
  _videoFrameRequestCallback() {
    this.update(), this.destroyed ? this._videoFrameRequestCallbackHandle = null : this._videoFrameRequestCallbackHandle = this.source.requestVideoFrameCallback(
      this._videoFrameRequestCallback
    );
  }
  /**
   * Start preloading the video resource.
   * @returns {Promise<void>} Handle the validate event
   */
  load() {
    if (this._load)
      return this._load;
    const e = this.source;
    return (e.readyState === e.HAVE_ENOUGH_DATA || e.readyState === e.HAVE_FUTURE_DATA) && e.width && e.height && (e.complete = !0), e.addEventListener("play", this._onPlayStart), e.addEventListener("pause", this._onPlayStop), e.addEventListener("seeked", this._onSeeked), this._isSourceReady() ? this._onCanPlay() : (e.addEventListener("canplay", this._onCanPlay), e.addEventListener("canplaythrough", this._onCanPlay), e.addEventListener("error", this._onError, !0)), this._load = new Promise((t, s) => {
      this.valid ? t(this) : (this._resolve = t, this._reject = s, e.load());
    }), this._load;
  }
  /**
   * Handle video error events.
   * @param event
   */
  _onError(e) {
    this.source.removeEventListener("error", this._onError, !0), this.onError.emit(e), this._reject && (this._reject(e), this._reject = null, this._resolve = null);
  }
  /**
   * Returns true if the underlying source is playing.
   * @returns - True if playing.
   */
  _isSourcePlaying() {
    const e = this.source;
    return !e.paused && !e.ended;
  }
  /**
   * Returns true if the underlying source is ready for playing.
   * @returns - True if ready.
   */
  _isSourceReady() {
    return this.source.readyState > 2;
  }
  /** Runs the update loop when the video is ready to play. */
  _onPlayStart() {
    this.valid || this._onCanPlay(), this._configureAutoUpdate();
  }
  /** Fired when a pause event is triggered, stops the update loop. */
  _onPlayStop() {
    this._configureAutoUpdate();
  }
  /** Fired when the video is completed seeking to the current playback position. */
  _onSeeked() {
    this._autoUpdate && !this._isSourcePlaying() && (this._msToNextUpdate = 0, this.update(), this._msToNextUpdate = 0);
  }
  /** Fired when the video is loaded and ready to play. */
  _onCanPlay() {
    const e = this.source;
    e.removeEventListener("canplay", this._onCanPlay), e.removeEventListener("canplaythrough", this._onCanPlay);
    const t = this.valid;
    this._msToNextUpdate = 0, this.update(), this._msToNextUpdate = 0, !t && this._resolve && (this._resolve(this), this._resolve = null, this._reject = null), this._isSourcePlaying() ? this._onPlayStart() : this.autoPlay && e.play();
  }
  /** Destroys this texture. */
  dispose() {
    this._configureAutoUpdate();
    const e = this.source;
    e && (e.removeEventListener("play", this._onPlayStart), e.removeEventListener("pause", this._onPlayStop), e.removeEventListener("seeked", this._onSeeked), e.removeEventListener("canplay", this._onCanPlay), e.removeEventListener("canplaythrough", this._onCanPlay), e.removeEventListener("error", this._onError, !0), e.pause(), e.src = "", e.load()), super.dispose();
  }
  /** Should the base texture automatically update itself, set to true by default. */
  get autoUpdate() {
    return this._autoUpdate;
  }
  set autoUpdate(e) {
    e !== this._autoUpdate && (this._autoUpdate = e, this._configureAutoUpdate());
  }
  /**
   * How many times a second to update the texture from the video. If 0, `requestVideoFrameCallback` is used to
   * update the texture. If `requestVideoFrameCallback` is not available, the texture is updated every render.
   * A lower fps can help performance, as updating the texture at 60fps on a 30ps video may not be efficient.
   */
  get updateFPS() {
    return this._updateFPS;
  }
  set updateFPS(e) {
    e !== this._updateFPS && (this._updateFPS = e, this._configureAutoUpdate());
  }
  _configureAutoUpdate() {
    this._autoUpdate && this._isSourcePlaying() ? !this._updateFPS && this.source.requestVideoFrameCallback ? (this._isConnectedToTicker && (Xe.shared.remove(this.update, this), this._isConnectedToTicker = !1, this._msToNextUpdate = 0), this._videoFrameRequestCallbackHandle === null && (this._videoFrameRequestCallbackHandle = this.source.requestVideoFrameCallback(
      this._videoFrameRequestCallback
    ))) : (this._videoFrameRequestCallbackHandle !== null && (this.source.cancelVideoFrameCallback(this._videoFrameRequestCallbackHandle), this._videoFrameRequestCallbackHandle = null), this._isConnectedToTicker || (Xe.shared.add(this.update, this), this._isConnectedToTicker = !0, this._msToNextUpdate = 0)) : (this._videoFrameRequestCallbackHandle !== null && (this.source.cancelVideoFrameCallback(this._videoFrameRequestCallbackHandle), this._videoFrameRequestCallbackHandle = null), this._isConnectedToTicker && (Xe.shared.remove(this.update, this), this._isConnectedToTicker = !1, this._msToNextUpdate = 0));
  }
  /**
   * Used to auto-detect the type of resource.
   * @param {*} source - The source object
   * @param {string} extension - The extension of source, if set
   * @returns {boolean} `true` if video source
   */
  static test(e, t) {
    return globalThis.HTMLVideoElement && e instanceof HTMLVideoElement || Hs.TYPES.includes(t);
  }
};
$s.TYPES = ["mp4", "m4v", "webm", "ogg", "ogv", "h264", "avi", "mov"], /**
* Map of video MIME types that can't be directly derived from file extensions.
* @readonly
*/
$s.MIME_TYPES = {
  ogv: "video/ogg",
  mov: "video/quicktime",
  m4v: "video/mp4"
};
let _a = $s;
Ns.push(
  gt,
  qn,
  Zh,
  _a,
  Qh,
  Ds,
  Ln,
  Yh,
  Kh
);
const Tn = {
  loader: j.LoadParser,
  resolver: j.ResolveParser,
  cache: j.CacheParser,
  detection: j.DetectionParser
};
Z.handle(j.Asset, (r) => {
  const e = r.ref;
  Object.entries(Tn).filter(([t]) => !!e[t]).forEach(([t, s]) => Z.add(Object.assign(
    e[t],
    // Allow the function to optionally define it's own
    // ExtensionMetadata, the use cases here is priority for LoaderParsers
    { extension: e[t].extension ?? s }
  )));
}, (r) => {
  const e = r.ref;
  Object.keys(Tn).filter((t) => !!e[t]).forEach((t) => Z.remove(e[t]));
});
class Jh {
  /**
   * @param loader
   * @param verbose - should the loader log to the console
   */
  constructor(e, t = !1) {
    this._loader = e, this._assetList = [], this._isLoading = !1, this._maxConcurrent = 1, this.verbose = t;
  }
  /**
   * Adds an array of assets to load.
   * @param assetUrls - assets to load
   */
  add(e) {
    e.forEach((t) => {
      this._assetList.push(t);
    }), this.verbose && console.log("[BackgroundLoader] assets: ", this._assetList), this._isActive && !this._isLoading && this._next();
  }
  /**
   * Loads the next set of assets. Will try to load as many assets as it can at the same time.
   *
   * The max assets it will try to load at one time will be 4.
   */
  async _next() {
    if (this._assetList.length && this._isActive) {
      this._isLoading = !0;
      const e = [], t = Math.min(this._assetList.length, this._maxConcurrent);
      for (let s = 0; s < t; s++)
        e.push(this._assetList.pop());
      await this._loader.load(e), this._isLoading = !1, this._next();
    }
  }
  /**
   * Activate/Deactivate the loading. If set to true then it will immediately continue to load the next asset.
   * @returns whether the class is active
   */
  get active() {
    return this._isActive;
  }
  set active(e) {
    this._isActive !== e && (this._isActive = e, e && !this._isLoading && this._next());
  }
}
function wt(r, e) {
  if (Array.isArray(e)) {
    for (const t of e)
      if (r.startsWith(`data:${t}`))
        return !0;
    return !1;
  }
  return r.startsWith(`data:${e}`);
}
function Rt(r, e) {
  const t = r.split("?")[0], s = $e.extname(t).toLowerCase();
  return Array.isArray(e) ? e.includes(s) : s === e;
}
const Fe = (r, e, t = !1) => (Array.isArray(r) || (r = [r]), e ? r.map((s) => typeof s == "string" || t ? e(s) : s) : r), Hl = (r, e) => {
  const t = e.split("?")[1];
  return t && (r += `?${t}`), r;
};
function Aa(r, e, t, s, i) {
  const n = e[t];
  for (let a = 0; a < n.length; a++) {
    const o = n[a];
    t < e.length - 1 ? Aa(r.replace(s[t], o), e, t + 1, s, i) : i.push(r.replace(s[t], o));
  }
}
function el(r) {
  const e = /\{(.*?)\}/g, t = r.match(e), s = [];
  if (t) {
    const i = [];
    t.forEach((n) => {
      const a = n.substring(1, n.length - 1).split(",");
      i.push(a);
    }), Aa(r, i, 0, t, s);
  } else
    s.push(r);
  return s;
}
const vr = (r) => !Array.isArray(r);
class tl {
  constructor() {
    this._parsers = [], this._cache = /* @__PURE__ */ new Map(), this._cacheMap = /* @__PURE__ */ new Map();
  }
  /** Clear all entries. */
  reset() {
    this._cacheMap.clear(), this._cache.clear();
  }
  /**
   * Check if the key exists
   * @param key - The key to check
   */
  has(e) {
    return this._cache.has(e);
  }
  /**
   * Fetch entry by key
   * @param key - The key of the entry to get
   */
  get(e) {
    const t = this._cache.get(e);
    return t || console.warn(`[Assets] Asset id ${e} was not found in the Cache`), t;
  }
  /**
   * Set a value by key or keys name
   * @param key - The key or keys to set
   * @param value - The value to store in the cache or from which cacheable assets will be derived.
   */
  set(e, t) {
    const s = Fe(e);
    let i;
    for (let o = 0; o < this.parsers.length; o++) {
      const h = this.parsers[o];
      if (h.test(t)) {
        i = h.getCacheableAssets(s, t);
        break;
      }
    }
    i || (i = {}, s.forEach((o) => {
      i[o] = t;
    }));
    const n = Object.keys(i), a = {
      cacheKeys: n,
      keys: s
    };
    if (s.forEach((o) => {
      this._cacheMap.set(o, a);
    }), n.forEach((o) => {
      this._cache.has(o) && this._cache.get(o) !== t && console.warn("[Cache] already has key:", o), this._cache.set(o, i[o]);
    }), t instanceof oe) {
      const o = t;
      s.forEach((h) => {
        o.baseTexture !== oe.EMPTY.baseTexture && he.addToCache(o.baseTexture, h), oe.addToCache(o, h);
      });
    }
  }
  /**
   * Remove entry by key
   *
   * This function will also remove any associated alias from the cache also.
   * @param key - The key of the entry to remove
   */
  remove(e) {
    if (!this._cacheMap.has(e)) {
      console.warn(`[Assets] Asset id ${e} was not found in the Cache`);
      return;
    }
    const t = this._cacheMap.get(e);
    t.cacheKeys.forEach((s) => {
      this._cache.delete(s);
    }), t.keys.forEach((s) => {
      this._cacheMap.delete(s);
    });
  }
  /** All loader parsers registered */
  get parsers() {
    return this._parsers;
  }
}
const st = new tl();
class rl {
  constructor() {
    this._parsers = [], this._parsersValidated = !1, this.parsers = new Proxy(this._parsers, {
      set: (e, t, s) => (this._parsersValidated = !1, e[t] = s, !0)
    }), this.promiseCache = {};
  }
  /** function used for testing */
  reset() {
    this._parsersValidated = !1, this.promiseCache = {};
  }
  /**
   * Used internally to generate a promise for the asset to be loaded.
   * @param url - The URL to be loaded
   * @param data - any custom additional information relevant to the asset being loaded
   * @returns - a promise that will resolve to an Asset for example a Texture of a JSON object
   */
  _getLoadPromiseAndParser(e, t) {
    const s = {
      promise: null,
      parser: null
    };
    return s.promise = (async () => {
      let i = null, n = null;
      if (t.loadParser && (n = this._parserHash[t.loadParser], n || console.warn(`[Assets] specified load parser "${t.loadParser}" not found while loading ${e}`)), !n) {
        for (let a = 0; a < this.parsers.length; a++) {
          const o = this.parsers[a];
          if (o.load && o.test?.(e, t, this)) {
            n = o;
            break;
          }
        }
        if (!n)
          return console.warn(`[Assets] ${e} could not be loaded as we don't know how to parse it, ensure the correct parser has been added`), null;
      }
      i = await n.load(e, t, this), s.parser = n;
      for (let a = 0; a < this.parsers.length; a++) {
        const o = this.parsers[a];
        o.parse && o.parse && await o.testParse?.(i, t, this) && (i = await o.parse(i, t, this) || i, s.parser = o);
      }
      return i;
    })(), s;
  }
  async load(e, t) {
    this._parsersValidated || this._validateParsers();
    let s = 0;
    const i = {}, n = vr(e), a = Fe(e, (l) => ({
      alias: [l],
      src: l
    })), o = a.length, h = a.map(async (l) => {
      const c = $e.toAbsolute(l.src);
      if (!i[l.src])
        try {
          this.promiseCache[c] || (this.promiseCache[c] = this._getLoadPromiseAndParser(c, l)), i[l.src] = await this.promiseCache[c].promise, t && t(++s / o);
        } catch (g) {
          throw delete this.promiseCache[c], delete i[l.src], new Error(`[Loader.load] Failed to load ${c}.
${g}`);
        }
    });
    return await Promise.all(h), n ? i[a[0].src] : i;
  }
  /**
   * Unloads one or more assets. Any unloaded assets will be destroyed, freeing up memory for your app.
   * The parser that created the asset, will be the one that unloads it.
   * @example
   * // Single asset:
   * const asset = await Loader.load('cool.png');
   *
   * await Loader.unload('cool.png');
   *
   * console.log(asset.destroyed); // true
   * @param assetsToUnloadIn - urls that you want to unload, or a single one!
   */
  async unload(e) {
    const t = Fe(e, (s) => ({
      alias: [s],
      src: s
    })).map(async (s) => {
      const i = $e.toAbsolute(s.src), n = this.promiseCache[i];
      if (n) {
        const a = await n.promise;
        delete this.promiseCache[i], n.parser?.unload?.(a, s, this);
      }
    });
    await Promise.all(t);
  }
  /** validates our parsers, right now it only checks for name conflicts but we can add more here as required! */
  _validateParsers() {
    this._parsersValidated = !0, this._parserHash = this._parsers.filter((e) => e.name).reduce((e, t) => (e[t.name] && console.warn(`[Assets] loadParser name conflict "${t.name}"`), { ...e, [t.name]: t }), {});
  }
}
var ht = /* @__PURE__ */ ((r) => (r[r.Low = 0] = "Low", r[r.Normal = 1] = "Normal", r[r.High = 2] = "High", r))(ht || {});
const sl = ".json", il = "application/json", nl = {
  extension: {
    type: j.LoadParser,
    priority: ht.Low
  },
  name: "loadJson",
  test(r) {
    return wt(r, il) || Rt(r, sl);
  },
  async load(r) {
    return await (await J.ADAPTER.fetch(r)).json();
  }
};
Z.add(nl);
const al = ".txt", ol = "text/plain", hl = {
  name: "loadTxt",
  extension: {
    type: j.LoadParser,
    priority: ht.Low
  },
  test(r) {
    return wt(r, ol) || Rt(r, al);
  },
  async load(r) {
    return await (await J.ADAPTER.fetch(r)).text();
  }
};
Z.add(hl);
const ll = [
  "normal",
  "bold",
  "100",
  "200",
  "300",
  "400",
  "500",
  "600",
  "700",
  "800",
  "900"
], ul = [".ttf", ".otf", ".woff", ".woff2"], cl = [
  "font/ttf",
  "font/otf",
  "font/woff",
  "font/woff2"
], dl = /^(--|-?[A-Z_])[0-9A-Z_-]*$/i;
function fl(r) {
  const e = $e.extname(r), t = $e.basename(r, e).replace(/(-|_)/g, " ").toLowerCase().split(" ").map((n) => n.charAt(0).toUpperCase() + n.slice(1));
  let s = t.length > 0;
  for (const n of t)
    if (!n.match(dl)) {
      s = !1;
      break;
    }
  let i = t.join(" ");
  return s || (i = `"${i.replace(/[\\"]/g, "\\$&")}"`), i;
}
const pl = /^[0-9A-Za-z%:/?#\[\]@!\$&'()\*\+,;=\-._~]*$/;
function ml(r) {
  return pl.test(r) ? r : encodeURI(r);
}
const yl = {
  extension: {
    type: j.LoadParser,
    priority: ht.Low
  },
  name: "loadWebFont",
  test(r) {
    return wt(r, cl) || Rt(r, ul);
  },
  async load(r, e) {
    const t = J.ADAPTER.getFontFaceSet();
    if (t) {
      const s = [], i = e.data?.family ?? fl(r), n = e.data?.weights?.filter((o) => ll.includes(o)) ?? ["normal"], a = e.data ?? {};
      for (let o = 0; o < n.length; o++) {
        const h = n[o], l = new FontFace(i, `url(${ml(r)})`, {
          ...a,
          weight: h
        });
        await l.load(), t.add(l), s.push(l);
      }
      return s.length === 1 ? s[0] : s;
    }
    return console.warn("[loadWebFont] FontFace API is not supported. Skipping loading font"), null;
  },
  unload(r) {
    (Array.isArray(r) ? r : [r]).forEach((e) => J.ADAPTER.getFontFaceSet().delete(e));
  }
};
Z.add(yl);
const gl = `(function() {
  "use strict";
  const WHITE_PNG = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+ip1sAAAAASUVORK5CYII=";
  async function checkImageBitmap() {
    try {
      if (typeof createImageBitmap != "function")
        return !1;
      const imageBlob = await (await fetch(WHITE_PNG)).blob(), imageBitmap = await createImageBitmap(imageBlob);
      return imageBitmap.width === 1 && imageBitmap.height === 1;
    } catch {
      return !1;
    }
  }
  checkImageBitmap().then((result) => {
    self.postMessage(result);
  });
})();
`;
let At = null, Vs = class {
  constructor() {
    At || (At = URL.createObjectURL(new Blob([gl], { type: "application/javascript" }))), this.worker = new Worker(At);
  }
};
Vs.revokeObjectURL = function() {
  At && (URL.revokeObjectURL(At), At = null);
};
const vl = `(function() {
  "use strict";
  async function loadImageBitmap(url) {
    const response = await fetch(url);
    if (!response.ok)
      throw new Error(\`[WorkerManager.loadImageBitmap] Failed to fetch \${url}: \${response.status} \${response.statusText}\`);
    const imageBlob = await response.blob();
    return await createImageBitmap(imageBlob);
  }
  self.onmessage = async (event) => {
    try {
      const imageBitmap = await loadImageBitmap(event.data.data[0]);
      self.postMessage({
        data: imageBitmap,
        uuid: event.data.uuid,
        id: event.data.id
      }, [imageBitmap]);
    } catch (e) {
      self.postMessage({
        error: e,
        uuid: event.data.uuid,
        id: event.data.id
      });
    }
  };
})();
`;
let xt = null;
class xa {
  constructor() {
    xt || (xt = URL.createObjectURL(new Blob([vl], { type: "application/javascript" }))), this.worker = new Worker(xt);
  }
}
xa.revokeObjectURL = function() {
  xt && (URL.revokeObjectURL(xt), xt = null);
};
let wn = 0, Rs;
class _l {
  constructor() {
    this._initialized = !1, this._createdWorkers = 0, this.workerPool = [], this.queue = [], this.resolveHash = {};
  }
  isImageBitmapSupported() {
    return this._isImageBitmapSupported !== void 0 ? this._isImageBitmapSupported : (this._isImageBitmapSupported = new Promise((e) => {
      const { worker: t } = new Vs();
      t.addEventListener("message", (s) => {
        t.terminate(), Vs.revokeObjectURL(), e(s.data);
      });
    }), this._isImageBitmapSupported);
  }
  loadImageBitmap(e) {
    return this._run("loadImageBitmap", [e]);
  }
  async _initWorkers() {
    this._initialized || (this._initialized = !0);
  }
  getWorker() {
    Rs === void 0 && (Rs = navigator.hardwareConcurrency || 4);
    let e = this.workerPool.pop();
    return !e && this._createdWorkers < Rs && (this._createdWorkers++, e = new xa().worker, e.addEventListener("message", (t) => {
      this.complete(t.data), this.returnWorker(t.target), this.next();
    })), e;
  }
  returnWorker(e) {
    this.workerPool.push(e);
  }
  complete(e) {
    e.error !== void 0 ? this.resolveHash[e.uuid].reject(e.error) : this.resolveHash[e.uuid].resolve(e.data), this.resolveHash[e.uuid] = null;
  }
  async _run(e, t) {
    await this._initWorkers();
    const s = new Promise((i, n) => {
      this.queue.push({ id: e, arguments: t, resolve: i, reject: n });
    });
    return this.next(), s;
  }
  next() {
    if (!this.queue.length)
      return;
    const e = this.getWorker();
    if (!e)
      return;
    const t = this.queue.pop(), s = t.id;
    this.resolveHash[wn] = { resolve: t.resolve, reject: t.reject }, e.postMessage({
      data: t.arguments,
      uuid: wn++,
      id: s
    });
  }
}
const Rn = new _l();
function Qs(r, e, t) {
  r.resource.internal = !0;
  const s = new oe(r), i = () => {
    delete e.promiseCache[t], st.has(t) && st.remove(t);
  };
  return s.baseTexture.once("destroyed", () => {
    t in e.promiseCache && (console.warn("[Assets] A BaseTexture managed by Assets was destroyed instead of unloaded! Use Assets.unload() instead of destroying the BaseTexture."), i());
  }), s.once("destroyed", () => {
    r.destroyed || (console.warn("[Assets] A Texture managed by Assets was destroyed instead of unloaded! Use Assets.unload() instead of destroying the Texture."), i());
  }), s;
}
const Al = [".jpeg", ".jpg", ".png", ".webp", ".avif"], xl = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/avif"
];
async function bl(r) {
  const e = await J.ADAPTER.fetch(r);
  if (!e.ok)
    throw new Error(`[loadImageBitmap] Failed to fetch ${r}: ${e.status} ${e.statusText}`);
  const t = await e.blob();
  return await createImageBitmap(t);
}
const br = {
  name: "loadTextures",
  extension: {
    type: j.LoadParser,
    priority: ht.High
  },
  config: {
    preferWorkers: !0,
    preferCreateImageBitmap: !0,
    crossOrigin: "anonymous"
  },
  test(r) {
    return wt(r, xl) || Rt(r, Al);
  },
  async load(r, e, t) {
    const s = globalThis.createImageBitmap && this.config.preferCreateImageBitmap;
    let i;
    s ? this.config.preferWorkers && await Rn.isImageBitmapSupported() ? i = await Rn.loadImageBitmap(r) : i = await bl(r) : i = await new Promise((o, h) => {
      const l = new Image();
      l.crossOrigin = this.config.crossOrigin, l.src = r, l.complete ? o(l) : (l.onload = () => o(l), l.onerror = (c) => h(c));
    });
    const n = { ...e.data };
    n.resolution ?? (n.resolution = Gt(r)), s && n.resourceOptions?.ownsImageBitmap === void 0 && (n.resourceOptions = { ...n.resourceOptions }, n.resourceOptions.ownsImageBitmap = !0);
    const a = new he(i, n);
    return a.resource.src = r, Qs(a, t, r);
  },
  unload(r) {
    r.destroy(!0);
  }
};
Z.add(br);
const El = ".svg", Tl = "image/svg+xml", wl = {
  extension: {
    type: j.LoadParser,
    priority: ht.High
  },
  name: "loadSVG",
  test(r) {
    return wt(r, Tl) || Rt(r, El);
  },
  async testParse(r) {
    return Ds.test(r);
  },
  async parse(r, e, t) {
    const s = new Ds(r, e?.data?.resourceOptions);
    await s.load();
    const i = new he(s, {
      resolution: Gt(r),
      ...e?.data
    });
    return i.resource.src = e.src, Qs(i, t, e.src);
  },
  async load(r, e) {
    return (await J.ADAPTER.fetch(r)).text();
  },
  unload: br.unload
};
Z.add(wl);
const Rl = [".mp4", ".m4v", ".webm", ".ogv"], Il = [
  "video/mp4",
  "video/webm",
  "video/ogg"
], Sl = {
  name: "loadVideo",
  extension: {
    type: j.LoadParser,
    priority: ht.High
  },
  config: {
    defaultAutoPlay: !0,
    defaultUpdateFPS: 0,
    defaultLoop: !1,
    defaultMuted: !1,
    defaultPlaysinline: !0
  },
  test(r) {
    return wt(r, Il) || Rt(r, Rl);
  },
  async load(r, e, t) {
    let s;
    const i = await (await J.ADAPTER.fetch(r)).blob(), n = URL.createObjectURL(i);
    try {
      const a = {
        autoPlay: this.config.defaultAutoPlay,
        updateFPS: this.config.defaultUpdateFPS,
        loop: this.config.defaultLoop,
        muted: this.config.defaultMuted,
        playsinline: this.config.defaultPlaysinline,
        ...e?.data?.resourceOptions,
        autoLoad: !0
      }, o = new _a(n, a);
      await o.load();
      const h = new he(o, {
        alphaMode: await vo(),
        resolution: Gt(r),
        ...e?.data
      });
      h.resource.src = r, s = Qs(h, t, r), s.baseTexture.once("destroyed", () => {
        URL.revokeObjectURL(n);
      });
    } catch (a) {
      throw URL.revokeObjectURL(n), a;
    }
    return s;
  },
  unload(r) {
    r.destroy(!0);
  }
};
Z.add(Sl);
class Cl {
  constructor() {
    this._defaultBundleIdentifierOptions = {
      connector: "-",
      createBundleAssetId: (e, t) => `${e}${this._bundleIdConnector}${t}`,
      extractAssetIdFromBundle: (e, t) => t.replace(`${e}${this._bundleIdConnector}`, "")
    }, this._bundleIdConnector = this._defaultBundleIdentifierOptions.connector, this._createBundleAssetId = this._defaultBundleIdentifierOptions.createBundleAssetId, this._extractAssetIdFromBundle = this._defaultBundleIdentifierOptions.extractAssetIdFromBundle, this._assetMap = {}, this._preferredOrder = [], this._parsers = [], this._resolverHash = {}, this._bundles = {};
  }
  /**
   * Override how the resolver deals with generating bundle ids.
   * must be called before any bundles are added
   * @param bundleIdentifier - the bundle identifier options
   */
  setBundleIdentifier(e) {
    if (this._bundleIdConnector = e.connector ?? this._bundleIdConnector, this._createBundleAssetId = e.createBundleAssetId ?? this._createBundleAssetId, this._extractAssetIdFromBundle = e.extractAssetIdFromBundle ?? this._extractAssetIdFromBundle, this._extractAssetIdFromBundle("foo", this._createBundleAssetId("foo", "bar")) !== "bar")
      throw new Error("[Resolver] GenerateBundleAssetId are not working correctly");
  }
  /**
   * Let the resolver know which assets you prefer to use when resolving assets.
   * Multiple prefer user defined rules can be added.
   * @example
   * resolver.prefer({
   *     // first look for something with the correct format, and then then correct resolution
   *     priority: ['format', 'resolution'],
   *     params:{
   *         format:'webp', // prefer webp images
   *         resolution: 2, // prefer a resolution of 2
   *     }
   * })
   * resolver.add('foo', ['bar@2x.webp', 'bar@2x.png', 'bar.webp', 'bar.png']);
   * resolver.resolveUrl('foo') // => 'bar@2x.webp'
   * @param preferOrders - the prefer options
   */
  prefer(...e) {
    e.forEach((t) => {
      this._preferredOrder.push(t), t.priority || (t.priority = Object.keys(t.params));
    }), this._resolverHash = {};
  }
  /**
   * Set the base path to prepend to all urls when resolving
   * @example
   * resolver.basePath = 'https://home.com/';
   * resolver.add('foo', 'bar.ong');
   * resolver.resolveUrl('foo', 'bar.png'); // => 'https://home.com/bar.png'
   * @param basePath - the base path to use
   */
  set basePath(e) {
    this._basePath = e;
  }
  get basePath() {
    return this._basePath;
  }
  /**
   * Set the root path for root-relative URLs. By default the `basePath`'s root is used. If no `basePath` is set, then the
   * default value for browsers is `window.location.origin`
   * @example
   * // Application hosted on https://home.com/some-path/index.html
   * resolver.basePath = 'https://home.com/some-path/';
   * resolver.rootPath = 'https://home.com/';
   * resolver.add('foo', '/bar.png');
   * resolver.resolveUrl('foo', '/bar.png'); // => 'https://home.com/bar.png'
   * @param rootPath - the root path to use
   */
  set rootPath(e) {
    this._rootPath = e;
  }
  get rootPath() {
    return this._rootPath;
  }
  /**
   * All the active URL parsers that help the parser to extract information and create
   * an asset object-based on parsing the URL itself.
   *
   * Can be added using the extensions API
   * @example
   * resolver.add('foo', [
   *     {
   *         resolution: 2,
   *         format: 'png',
   *         src: 'image@2x.png',
   *     },
   *     {
   *         resolution:1,
   *         format:'png',
   *         src: 'image.png',
   *     },
   * ]);
   *
   * // With a url parser the information such as resolution and file format could extracted from the url itself:
   * extensions.add({
   *     extension: ExtensionType.ResolveParser,
   *     test: loadTextures.test, // test if url ends in an image
   *     parse: (value: string) =>
   *     ({
   *         resolution: parseFloat(settings.RETINA_PREFIX.exec(value)?.[1] ?? '1'),
   *         format: value.split('.').pop(),
   *         src: value,
   *     }),
   * });
   *
   * // Now resolution and format can be extracted from the url
   * resolver.add('foo', [
   *     'image@2x.png',
   *     'image.png',
   * ]);
   */
  get parsers() {
    return this._parsers;
  }
  /** Used for testing, this resets the resolver to its initial state */
  reset() {
    this.setBundleIdentifier(this._defaultBundleIdentifierOptions), this._assetMap = {}, this._preferredOrder = [], this._resolverHash = {}, this._rootPath = null, this._basePath = null, this._manifest = null, this._bundles = {}, this._defaultSearchParams = null;
  }
  /**
   * Sets the default URL search parameters for the URL resolver. The urls can be specified as a string or an object.
   * @param searchParams - the default url parameters to append when resolving urls
   */
  setDefaultSearchParams(e) {
    if (typeof e == "string")
      this._defaultSearchParams = e;
    else {
      const t = e;
      this._defaultSearchParams = Object.keys(t).map((s) => `${encodeURIComponent(s)}=${encodeURIComponent(t[s])}`).join("&");
    }
  }
  /**
   * Returns the aliases for a given asset
   * @param asset - the asset to get the aliases for
   */
  getAlias(e) {
    const { alias: t, name: s, src: i, srcs: n } = e;
    return Fe(
      t || s || i || n,
      (a) => typeof a == "string" ? a : Array.isArray(a) ? a.map((o) => o?.src ?? o?.srcs ?? o) : a?.src || a?.srcs ? a.src ?? a.srcs : a,
      !0
    );
  }
  /**
   * Add a manifest to the asset resolver. This is a nice way to add all the asset information in one go.
   * generally a manifest would be built using a tool.
   * @param manifest - the manifest to add to the resolver
   */
  addManifest(e) {
    this._manifest && console.warn("[Resolver] Manifest already exists, this will be overwritten"), this._manifest = e, e.bundles.forEach((t) => {
      this.addBundle(t.name, t.assets);
    });
  }
  /**
   * This adds a bundle of assets in one go so that you can resolve them as a group.
   * For example you could add a bundle for each screen in you pixi app
   * @example
   * resolver.addBundle('animals', {
   *     bunny: 'bunny.png',
   *     chicken: 'chicken.png',
   *     thumper: 'thumper.png',
   * });
   *
   * const resolvedAssets = await resolver.resolveBundle('animals');
   * @param bundleId - The id of the bundle to add
   * @param assets - A record of the asset or assets that will be chosen from when loading via the specified key
   */
  addBundle(e, t) {
    const s = [];
    Array.isArray(t) ? t.forEach((i) => {
      const n = i.src ?? i.srcs, a = i.alias ?? i.name;
      let o;
      if (typeof a == "string") {
        const h = this._createBundleAssetId(e, a);
        s.push(h), o = [a, h];
      } else {
        const h = a.map((l) => this._createBundleAssetId(e, l));
        s.push(...h), o = [...a, ...h];
      }
      this.add({
        ...i,
        alias: o,
        src: n
      });
    }) : Object.keys(t).forEach((i) => {
      const n = [i, this._createBundleAssetId(e, i)];
      if (typeof t[i] == "string")
        this.add({
          alias: n,
          src: t[i]
        });
      else if (Array.isArray(t[i]))
        this.add({
          alias: n,
          src: t[i]
        });
      else {
        const a = t[i], o = a.src ?? a.srcs;
        this.add({
          ...a,
          alias: n,
          src: Array.isArray(o) ? o : [o]
        });
      }
      s.push(...n);
    }), this._bundles[e] = s;
  }
  add(e, t, s, i, n) {
    const a = [];
    typeof e == "string" || Array.isArray(e) && typeof e[0] == "string" ? (ue("7.2.0", `Assets.add now uses an object instead of individual parameters.
Please use Assets.add({ alias, src, data, format, loadParser }) instead.`), a.push({ alias: e, src: t, data: s, format: i, loadParser: n })) : Array.isArray(e) ? a.push(...e) : a.push(e);
    let o;
    o = (h) => {
      this.hasKey(h) && console.warn(`[Resolver] already has key: ${h} overwriting`);
    }, Fe(a).forEach((h) => {
      const { src: l, srcs: c } = h;
      let { data: g, format: x, loadParser: b } = h;
      const F = Fe(l || c).map((A) => typeof A == "string" ? el(A) : Array.isArray(A) ? A : [A]), C = this.getAlias(h);
      Array.isArray(C) ? C.forEach(o) : o(C);
      const f = [];
      F.forEach((A) => {
        A.forEach((E) => {
          let w = {};
          if (typeof E != "object") {
            w.src = E;
            for (let M = 0; M < this._parsers.length; M++) {
              const p = this._parsers[M];
              if (p.test(E)) {
                w = p.parse(E);
                break;
              }
            }
          } else
            g = E.data ?? g, x = E.format ?? x, b = E.loadParser ?? b, w = {
              ...w,
              ...E
            };
          if (!C)
            throw new Error(`[Resolver] alias is undefined for this asset: ${w.src}`);
          w = this.buildResolvedAsset(w, {
            aliases: C,
            data: g,
            format: x,
            loadParser: b
          }), f.push(w);
        });
      }), C.forEach((A) => {
        this._assetMap[A] = f;
      });
    });
  }
  // TODO: this needs an overload like load did in Assets
  /**
   * If the resolver has had a manifest set via setManifest, this will return the assets urls for
   * a given bundleId or bundleIds.
   * @example
   * // Manifest Example
   * const manifest = {
   *     bundles: [
   *         {
   *             name: 'load-screen',
   *             assets: [
   *                 {
   *                     alias: 'background',
   *                     src: 'sunset.png',
   *                 },
   *                 {
   *                     alias: 'bar',
   *                     src: 'load-bar.{png,webp}',
   *                 },
   *             ],
   *         },
   *         {
   *             name: 'game-screen',
   *             assets: [
   *                 {
   *                     alias: 'character',
   *                     src: 'robot.png',
   *                 },
   *                 {
   *                     alias: 'enemy',
   *                     src: 'bad-guy.png',
   *                 },
   *             ],
   *         },
   *     ]
   * };
   *
   * resolver.setManifest(manifest);
   * const resolved = resolver.resolveBundle('load-screen');
   * @param bundleIds - The bundle ids to resolve
   * @returns All the bundles assets or a hash of assets for each bundle specified
   */
  resolveBundle(e) {
    const t = vr(e);
    e = Fe(e);
    const s = {};
    return e.forEach((i) => {
      const n = this._bundles[i];
      if (n) {
        const a = this.resolve(n), o = {};
        for (const h in a) {
          const l = a[h];
          o[this._extractAssetIdFromBundle(i, h)] = l;
        }
        s[i] = o;
      }
    }), t ? s[e[0]] : s;
  }
  /**
   * Does exactly what resolve does, but returns just the URL rather than the whole asset object
   * @param key - The key or keys to resolve
   * @returns - The URLs associated with the key(s)
   */
  resolveUrl(e) {
    const t = this.resolve(e);
    if (typeof e != "string") {
      const s = {};
      for (const i in t)
        s[i] = t[i].src;
      return s;
    }
    return t.src;
  }
  resolve(e) {
    const t = vr(e);
    e = Fe(e);
    const s = {};
    return e.forEach((i) => {
      if (!this._resolverHash[i])
        if (this._assetMap[i]) {
          let n = this._assetMap[i];
          const a = n[0], o = this._getPreferredOrder(n);
          o?.priority.forEach((h) => {
            o.params[h].forEach((l) => {
              const c = n.filter((g) => g[h] ? g[h] === l : !1);
              c.length && (n = c);
            });
          }), this._resolverHash[i] = n[0] ?? a;
        } else
          this._resolverHash[i] = this.buildResolvedAsset({
            alias: [i],
            src: i
          }, {});
      s[i] = this._resolverHash[i];
    }), t ? s[e[0]] : s;
  }
  /**
   * Checks if an asset with a given key exists in the resolver
   * @param key - The key of the asset
   */
  hasKey(e) {
    return !!this._assetMap[e];
  }
  /**
   * Checks if a bundle with the given key exists in the resolver
   * @param key - The key of the bundle
   */
  hasBundle(e) {
    return !!this._bundles[e];
  }
  /**
   * Internal function for figuring out what prefer criteria an asset should use.
   * @param assets
   */
  _getPreferredOrder(e) {
    for (let t = 0; t < e.length; t++) {
      const s = e[0], i = this._preferredOrder.find((n) => n.params.format.includes(s.format));
      if (i)
        return i;
    }
    return this._preferredOrder[0];
  }
  /**
   * Appends the default url parameters to the url
   * @param url - The url to append the default parameters to
   * @returns - The url with the default parameters appended
   */
  _appendDefaultSearchParams(e) {
    if (!this._defaultSearchParams)
      return e;
    const t = /\?/.test(e) ? "&" : "?";
    return `${e}${t}${this._defaultSearchParams}`;
  }
  buildResolvedAsset(e, t) {
    const { aliases: s, data: i, loadParser: n, format: a } = t;
    return (this._basePath || this._rootPath) && (e.src = $e.toAbsolute(e.src, this._basePath, this._rootPath)), e.alias = s ?? e.alias ?? [e.src], e.src = this._appendDefaultSearchParams(e.src), e.data = { ...i || {}, ...e.data }, e.loadParser = n ?? e.loadParser, e.format = a ?? e.format ?? $e.extname(e.src).slice(1), e.srcs = e.src, e.name = e.alias, e;
  }
}
class Nl {
  constructor() {
    this._detections = [], this._initialized = !1, this.resolver = new Cl(), this.loader = new rl(), this.cache = st, this._backgroundLoader = new Jh(this.loader), this._backgroundLoader.active = !0, this.reset();
  }
  /**
   * Best practice is to call this function before any loading commences
   * Initiating is the best time to add any customization to the way things are loaded.
   *
   * you do not need to call this for the Asset class to work, only if you want to set any initial properties
   * @param options - options to initialize the Asset manager with
   */
  async init(e = {}) {
    if (this._initialized) {
      console.warn("[Assets]AssetManager already initialized, did you load before calling this Assets.init()?");
      return;
    }
    if (this._initialized = !0, e.defaultSearchParams && this.resolver.setDefaultSearchParams(e.defaultSearchParams), e.basePath && (this.resolver.basePath = e.basePath), e.bundleIdentifier && this.resolver.setBundleIdentifier(e.bundleIdentifier), e.manifest) {
      let n = e.manifest;
      typeof n == "string" && (n = await this.load(n)), this.resolver.addManifest(n);
    }
    const t = e.texturePreference?.resolution ?? 1, s = typeof t == "number" ? [t] : t, i = await this._detectFormats({
      preferredFormats: e.texturePreference?.format,
      skipDetections: e.skipDetections,
      detections: this._detections
    });
    this.resolver.prefer({
      params: {
        format: i,
        resolution: s
      }
    }), e.preferences && this.setPreferences(e.preferences);
  }
  add(e, t, s, i, n) {
    this.resolver.add(e, t, s, i, n);
  }
  async load(e, t) {
    this._initialized || await this.init();
    const s = vr(e), i = Fe(e).map((o) => {
      if (typeof o != "string") {
        const h = this.resolver.getAlias(o);
        return h.some((l) => !this.resolver.hasKey(l)) && this.add(o), Array.isArray(h) ? h[0] : h;
      }
      return this.resolver.hasKey(o) || this.add({ alias: o, src: o }), o;
    }), n = this.resolver.resolve(i), a = await this._mapLoadToResolve(n, t);
    return s ? a[i[0]] : a;
  }
  /**
   * This adds a bundle of assets in one go so that you can load them as a group.
   * For example you could add a bundle for each screen in you pixi app
   * @example
   * import { Assets } from 'pixi.js';
   *
   * Assets.addBundle('animals', {
   *     bunny: 'bunny.png',
   *     chicken: 'chicken.png',
   *     thumper: 'thumper.png',
   * });
   *
   * const assets = await Assets.loadBundle('animals');
   * @param bundleId - the id of the bundle to add
   * @param assets - a record of the asset or assets that will be chosen from when loading via the specified key
   */
  addBundle(e, t) {
    this.resolver.addBundle(e, t);
  }
  /**
   * Bundles are a way to load multiple assets at once.
   * If a manifest has been provided to the init function then you can load a bundle, or bundles.
   * you can also add bundles via `addBundle`
   * @example
   * import { Assets } from 'pixi.js';
   *
   * // Manifest Example
   * const manifest = {
   *     bundles: [
   *         {
   *             name: 'load-screen',
   *             assets: [
   *                 {
   *                     alias: 'background',
   *                     src: 'sunset.png',
   *                 },
   *                 {
   *                     alias: 'bar',
   *                     src: 'load-bar.{png,webp}',
   *                 },
   *             ],
   *         },
   *         {
   *             name: 'game-screen',
   *             assets: [
   *                 {
   *                     alias: 'character',
   *                     src: 'robot.png',
   *                 },
   *                 {
   *                     alias: 'enemy',
   *                     src: 'bad-guy.png',
   *                 },
   *             ],
   *         },
   *     ]
   * };
   *
   * await Assets.init({ manifest });
   *
   * // Load a bundle...
   * loadScreenAssets = await Assets.loadBundle('load-screen');
   * // Load another bundle...
   * gameScreenAssets = await Assets.loadBundle('game-screen');
   * @param bundleIds - the bundle id or ids to load
   * @param onProgress - Optional function that is called when progress on asset loading is made.
   * The function is passed a single parameter, `progress`, which represents the percentage (0.0 - 1.0)
   * of the assets loaded. Do not use this function to detect when assets are complete and available,
   * instead use the Promise returned by this function.
   * @returns all the bundles assets or a hash of assets for each bundle specified
   */
  async loadBundle(e, t) {
    this._initialized || await this.init();
    let s = !1;
    typeof e == "string" && (s = !0, e = [e]);
    const i = this.resolver.resolveBundle(e), n = {}, a = Object.keys(i);
    let o = 0, h = 0;
    const l = () => {
      t?.(++o / h);
    }, c = a.map((g) => {
      const x = i[g];
      return h += Object.keys(x).length, this._mapLoadToResolve(x, l).then((b) => {
        n[g] = b;
      });
    });
    return await Promise.all(c), s ? n[e[0]] : n;
  }
  /**
   * Initiate a background load of some assets. It will passively begin to load these assets in the background.
   * So when you actually come to loading them you will get a promise that resolves to the loaded assets immediately
   *
   * An example of this might be that you would background load game assets after your inital load.
   * then when you got to actually load your game screen assets when a player goes to the game - the loading
   * would already have stared or may even be complete, saving you having to show an interim load bar.
   * @example
   * import { Assets } from 'pixi.js';
   *
   * Assets.backgroundLoad('bunny.png');
   *
   * // later on in your app...
   * await Assets.loadBundle('bunny.png'); // Will resolve quicker as loading may have completed!
   * @param urls - the url / urls you want to background load
   */
  async backgroundLoad(e) {
    this._initialized || await this.init(), typeof e == "string" && (e = [e]);
    const t = this.resolver.resolve(e);
    this._backgroundLoader.add(Object.values(t));
  }
  /**
   * Initiate a background of a bundle, works exactly like backgroundLoad but for bundles.
   * this can only be used if the loader has been initiated with a manifest
   * @example
   * import { Assets } from 'pixi.js';
   *
   * await Assets.init({
   *     manifest: {
   *         bundles: [
   *             {
   *                 name: 'load-screen',
   *                 assets: [...],
   *             },
   *             ...
   *         ],
   *     },
   * });
   *
   * Assets.backgroundLoadBundle('load-screen');
   *
   * // Later on in your app...
   * await Assets.loadBundle('load-screen'); // Will resolve quicker as loading may have completed!
   * @param bundleIds - the bundleId / bundleIds you want to background load
   */
  async backgroundLoadBundle(e) {
    this._initialized || await this.init(), typeof e == "string" && (e = [e]);
    const t = this.resolver.resolveBundle(e);
    Object.values(t).forEach((s) => {
      this._backgroundLoader.add(Object.values(s));
    });
  }
  /**
   * Only intended for development purposes.
   * This will wipe the resolver and caches.
   * You will need to reinitialize the Asset
   */
  reset() {
    this.resolver.reset(), this.loader.reset(), this.cache.reset(), this._initialized = !1;
  }
  get(e) {
    if (typeof e == "string")
      return st.get(e);
    const t = {};
    for (let s = 0; s < e.length; s++)
      t[s] = st.get(e[s]);
    return t;
  }
  /**
   * helper function to map resolved assets back to loaded assets
   * @param resolveResults - the resolve results from the resolver
   * @param onProgress - the progress callback
   */
  async _mapLoadToResolve(e, t) {
    const s = Object.values(e), i = Object.keys(e);
    this._backgroundLoader.active = !1;
    const n = await this.loader.load(s, t);
    this._backgroundLoader.active = !0;
    const a = {};
    return s.forEach((o, h) => {
      const l = n[o.src], c = [o.src];
      o.alias && c.push(...o.alias), a[i[h]] = l, st.set(c, l);
    }), a;
  }
  /**
   * Unload an asset or assets. As the Assets class is responsible for creating the assets via the `load` function
   * this will make sure to destroy any assets and release them from memory.
   * Once unloaded, you will need to load the asset again.
   *
   * Use this to help manage assets if you find that you have a large app and you want to free up memory.
   *
   * - it's up to you as the developer to make sure that textures are not actively being used when you unload them,
   * Pixi won't break but you will end up with missing assets. Not a good look for the user!
   * @example
   * import { Assets } from 'pixi.js';
   *
   * // Load a URL:
   * const myImageTexture = await Assets.load('http://some.url.com/image.png'); // => returns a texture
   *
   * await Assets.unload('http://some.url.com/image.png')
   *
   * // myImageTexture will be destroyed now.
   *
   * // Unload multiple assets:
   * const textures = await Assets.unload(['thumper', 'chicko']);
   * @param urls - the urls to unload
   */
  async unload(e) {
    this._initialized || await this.init();
    const t = Fe(e).map((i) => typeof i != "string" ? i.src : i), s = this.resolver.resolve(t);
    await this._unloadFromResolved(s);
  }
  /**
   * Bundles are a way to manage multiple assets at once.
   * this will unload all files in a bundle.
   *
   * once a bundle has been unloaded, you need to load it again to have access to the assets.
   * @example
   * import { Assets } from 'pixi.js';
   *
   * Assets.addBundle({
   *     'thumper': 'http://some.url.com/thumper.png',
   * })
   *
   * const assets = await Assets.loadBundle('thumper');
   *
   * // Now to unload...
   *
   * await Assets.unloadBundle('thumper');
   *
   * // All assets in the assets object will now have been destroyed and purged from the cache
   * @param bundleIds - the bundle id or ids to unload
   */
  async unloadBundle(e) {
    this._initialized || await this.init(), e = Fe(e);
    const t = this.resolver.resolveBundle(e), s = Object.keys(t).map((i) => this._unloadFromResolved(t[i]));
    await Promise.all(s);
  }
  async _unloadFromResolved(e) {
    const t = Object.values(e);
    t.forEach((s) => {
      st.remove(s.src);
    }), await this.loader.unload(t);
  }
  /**
   * Detects the supported formats for the browser, and returns an array of supported formats, respecting
   * the users preferred formats order.
   * @param options - the options to use when detecting formats
   * @param options.preferredFormats - the preferred formats to use
   * @param options.skipDetections - if we should skip the detections altogether
   * @param options.detections - the detections to use
   * @returns - the detected formats
   */
  async _detectFormats(e) {
    let t = [];
    e.preferredFormats && (t = Array.isArray(e.preferredFormats) ? e.preferredFormats : [e.preferredFormats]);
    for (const s of e.detections)
      e.skipDetections || await s.test() ? t = await s.add(t) : e.skipDetections || (t = await s.remove(t));
    return t = t.filter((s, i) => t.indexOf(s) === i), t;
  }
  /** All the detection parsers currently added to the Assets class. */
  get detections() {
    return this._detections;
  }
  /**
   * @deprecated since 7.2.0
   * @see {@link Assets.setPreferences}
   */
  get preferWorkers() {
    return br.config.preferWorkers;
  }
  set preferWorkers(e) {
    ue("7.2.0", "Assets.prefersWorkers is deprecated, use Assets.setPreferences({ preferWorkers: true }) instead."), this.setPreferences({ preferWorkers: e });
  }
  /**
   * General setter for preferences. This is a helper function to set preferences on all parsers.
   * @param preferences - the preferences to set
   */
  setPreferences(e) {
    this.loader.parsers.forEach((t) => {
      t.config && Object.keys(t.config).filter((s) => s in e).forEach((s) => {
        t.config[s] = e[s];
      });
    });
  }
}
const sr = new Nl();
Z.handleByList(j.LoadParser, sr.loader.parsers).handleByList(j.ResolveParser, sr.resolver.parsers).handleByList(j.CacheParser, sr.cache.parsers).handleByList(j.DetectionParser, sr.detections);
const Fl = {
  extension: j.CacheParser,
  test: (r) => Array.isArray(r) && r.every((e) => e instanceof oe),
  getCacheableAssets: (r, e) => {
    const t = {};
    return r.forEach((s) => {
      e.forEach((i, n) => {
        t[s + (n === 0 ? "" : n + 1)] = i;
      });
    }), t;
  }
};
Z.add(Fl);
async function ba(r) {
  if ("Image" in globalThis)
    return new Promise((e) => {
      const t = new Image();
      t.onload = () => {
        e(!0);
      }, t.onerror = () => {
        e(!1);
      }, t.src = r;
    });
  if ("createImageBitmap" in globalThis && "fetch" in globalThis) {
    try {
      const e = await (await fetch(r)).blob();
      await createImageBitmap(e);
    } catch {
      return !1;
    }
    return !0;
  }
  return !1;
}
const Pl = {
  extension: {
    type: j.DetectionParser,
    priority: 1
  },
  test: async () => ba(
    // eslint-disable-next-line max-len
    "data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAAB0AAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAIAAAACAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQ0MAAAAABNjb2xybmNseAACAAIAAYAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAACVtZGF0EgAKCBgANogQEAwgMg8f8D///8WfhwB8+ErK42A="
  ),
  add: async (r) => [...r, "avif"],
  remove: async (r) => r.filter((e) => e !== "avif")
};
Z.add(Pl);
const Ol = {
  extension: {
    type: j.DetectionParser,
    priority: 0
  },
  test: async () => ba(
    "data:image/webp;base64,UklGRh4AAABXRUJQVlA4TBEAAAAvAAAAAAfQ//73v/+BiOh/AAA="
  ),
  add: async (r) => [...r, "webp"],
  remove: async (r) => r.filter((e) => e !== "webp")
};
Z.add(Ol);
const In = ["png", "jpg", "jpeg"], Bl = {
  extension: {
    type: j.DetectionParser,
    priority: -1
  },
  test: () => Promise.resolve(!0),
  add: async (r) => [...r, ...In],
  remove: async (r) => r.filter((e) => !In.includes(e))
};
Z.add(Bl);
const Ml = "WorkerGlobalScope" in globalThis && globalThis instanceof globalThis.WorkerGlobalScope;
function Js(r) {
  return Ml ? !1 : document.createElement("video").canPlayType(r) !== "";
}
const Ul = {
  extension: {
    type: j.DetectionParser,
    priority: 0
  },
  test: async () => Js("video/webm"),
  add: async (r) => [...r, "webm"],
  remove: async (r) => r.filter((e) => e !== "webm")
};
Z.add(Ul);
const Ll = {
  extension: {
    type: j.DetectionParser,
    priority: 0
  },
  test: async () => Js("video/mp4"),
  add: async (r) => [...r, "mp4", "m4v"],
  remove: async (r) => r.filter((e) => e !== "mp4" && e !== "m4v")
};
Z.add(Ll);
const kl = {
  extension: {
    type: j.DetectionParser,
    priority: 0
  },
  test: async () => Js("video/ogg"),
  add: async (r) => [...r, "ogv"],
  remove: async (r) => r.filter((e) => e !== "ogv")
};
Z.add(kl);
const Gl = {
  extension: j.ResolveParser,
  test: br.test,
  parse: (r) => ({
    resolution: parseFloat(J.RETINA_PREFIX.exec(r)?.[1] ?? "1"),
    format: $e.extname(r).slice(1),
    src: r
  })
};
Z.add(Gl);
export {
  sr as Assets,
  Nl as AssetsClass,
  st as Cache,
  ht as LoaderParserPriority,
  Fl as cacheTextureArray,
  wt as checkDataUrl,
  Rt as checkExtension,
  Fe as convertToList,
  Hl as copySearchParams,
  el as createStringVariations,
  Qs as createTexture,
  Pl as detectAvif,
  Bl as detectDefaults,
  Ll as detectMp4,
  kl as detectOgv,
  Ul as detectWebm,
  Ol as detectWebp,
  fl as getFontFamilyName,
  vr as isSingleItem,
  bl as loadImageBitmap,
  nl as loadJson,
  wl as loadSVG,
  br as loadTextures,
  hl as loadTxt,
  Sl as loadVideo,
  yl as loadWebFont,
  Gl as resolveTextureUrl
};
//# sourceMappingURL=index.js.map
