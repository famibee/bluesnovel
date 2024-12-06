var ae = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function $e(i) {
  return i && i.__esModule && Object.prototype.hasOwnProperty.call(i, "default") ? i.default : i;
}
function We(i) {
  if (i.__esModule) return i;
  var r = i.default;
  if (typeof r == "function") {
    var o = function l() {
      return this instanceof l ? Reflect.construct(r, arguments, this.constructor) : r.apply(this, arguments);
    };
    o.prototype = r.prototype;
  } else o = {};
  return Object.defineProperty(o, "__esModule", { value: !0 }), Object.keys(i).forEach(function(l) {
    var c = Object.getOwnPropertyDescriptor(i, l);
    Object.defineProperty(o, l, c.get ? c : {
      enumerable: !0,
      get: function() {
        return i[l];
      }
    });
  }), o;
}
var N = { exports: {} };
/*!
 * Platform.js v1.3.6
 * Copyright 2014-2020 Benjamin Tan
 * Copyright 2011-2013 John-David Dalton
 * Available under MIT license
 */
var ye = N.exports, ne;
function Pe() {
  return ne || (ne = 1, function(i, r) {
    (function() {
      var o = {
        function: !0,
        object: !0
      }, l = o[typeof window] && window || this, c = r, m = i && !i.nodeType && i, u = c && m && typeof ae == "object" && ae;
      u && (u.global === u || u.window === u || u.self === u) && (l = u);
      var M = Math.pow(2, 53) - 1, w = /\bOpera/, v = Object.prototype, C = v.hasOwnProperty, B = v.toString;
      function U(t) {
        return t = String(t), t.charAt(0).toUpperCase() + t.slice(1);
      }
      function V(t, h, g) {
        var O = {
          "10.0": "10",
          "6.4": "10 Technical Preview",
          "6.3": "8.1",
          "6.2": "8",
          "6.1": "Server 2008 R2 / 7",
          "6.0": "Server 2008 / Vista",
          "5.2": "Server 2003 / XP 64-bit",
          "5.1": "XP",
          "5.01": "2000 SP1",
          "5.0": "2000",
          "4.0": "NT",
          "4.90": "ME"
        };
        return h && g && /^Win/i.test(t) && !/^Windows Phone /i.test(t) && (O = O[/[\d.]+$/.exec(t)]) && (t = "Windows " + O), t = String(t), h && g && (t = t.replace(RegExp(h, "i"), g)), t = R(
          t.replace(/ ce$/i, " CE").replace(/\bhpw/i, "web").replace(/\bMacintosh\b/, "Mac OS").replace(/_PowerPC\b/i, " OS").replace(/\b(OS X) [^ \d]+/i, "$1").replace(/\bMac (OS X)\b/, "$1").replace(/\/(\d)/, " $1").replace(/_/g, ".").replace(/(?: BePC|[ .]*fc[ \d.]+)$/i, "").replace(/\bx86\.64\b/gi, "x86_64").replace(/\b(Windows Phone) OS\b/, "$1").replace(/\b(Chrome OS \w+) [\d.]+\b/, "$1").split(" on ")[0]
        ), t;
      }
      function q(t, h) {
        var g = -1, O = t ? t.length : 0;
        if (typeof O == "number" && O > -1 && O <= M)
          for (; ++g < O; )
            h(t[g], g, t);
        else
          G(t, h);
      }
      function R(t) {
        return t = A(t), /^(?:webOS|i(?:OS|P))/.test(t) ? t : U(t);
      }
      function G(t, h) {
        for (var g in t)
          C.call(t, g) && h(t[g], g, t);
      }
      function F(t) {
        return t == null ? U(t) : B.call(t).slice(8, -1);
      }
      function ce(t, h) {
        var g = t != null ? typeof t[h] : "number";
        return !/^(?:boolean|number|string|undefined)$/.test(g) && (g == "object" ? !!t[h] : !0);
      }
      function k(t) {
        return String(t).replace(/([ -])(?!$)/g, "$1?");
      }
      function j(t, h) {
        var g = null;
        return q(t, function(O, T) {
          g = h(g, O, T, t);
        }), g;
      }
      function A(t) {
        return String(t).replace(/^ +| +$/g, "");
      }
      function L(t) {
        var h = l, g = t && typeof t == "object" && F(t) != "String";
        g && (h = t, t = null);
        var O = h.navigator || {}, T = O.userAgent || "";
        t || (t = T);
        var fe = g ? !!O.likeChrome : /\bChrome\b/.test(t) && !/internal|\n/i.test(B.toString()), X = "Object", he = g ? X : "ScriptBridgingProxyObject", de = g ? X : "Environment", pe = g && h.java ? "JavaPackage" : F(h.java), be = g ? X : "RuntimeObject", I = /\bJava/.test(pe) && h.java, ue = I && F(h.environment) == de, ge = I ? "a" : "α", me = I ? "b" : "β", J = h.document || {}, $ = h.operamini || h.opera, K = w.test(K = g && $ ? $["[[Class]]"] : F($)) ? K : $ = null, e, D = t, d = [], z = null, W = t == T, s = W && $ && typeof $.version == "function" && $.version(), H, p = we([
          { label: "EdgeHTML", pattern: "Edge" },
          "Trident",
          { label: "WebKit", pattern: "AppleWebKit" },
          "iCab",
          "Presto",
          "NetFront",
          "Tasman",
          "KHTML",
          "Gecko"
        ]), a = xe([
          "Adobe AIR",
          "Arora",
          "Avant Browser",
          "Breach",
          "Camino",
          "Electron",
          "Epiphany",
          "Fennec",
          "Flock",
          "Galeon",
          "GreenBrowser",
          "iCab",
          "Iceweasel",
          "K-Meleon",
          "Konqueror",
          "Lunascape",
          "Maxthon",
          { label: "Microsoft Edge", pattern: "(?:Edge|Edg|EdgA|EdgiOS)" },
          "Midori",
          "Nook Browser",
          "PaleMoon",
          "PhantomJS",
          "Raven",
          "Rekonq",
          "RockMelt",
          { label: "Samsung Internet", pattern: "SamsungBrowser" },
          "SeaMonkey",
          { label: "Silk", pattern: "(?:Cloud9|Silk-Accelerated)" },
          "Sleipnir",
          "SlimBrowser",
          { label: "SRWare Iron", pattern: "Iron" },
          "Sunrise",
          "Swiftfox",
          "Vivaldi",
          "Waterfox",
          "WebPositive",
          { label: "Yandex Browser", pattern: "YaBrowser" },
          { label: "UC Browser", pattern: "UCBrowser" },
          "Opera Mini",
          { label: "Opera Mini", pattern: "OPiOS" },
          "Opera",
          { label: "Opera", pattern: "OPR" },
          "Chromium",
          "Chrome",
          { label: "Chrome", pattern: "(?:HeadlessChrome)" },
          { label: "Chrome Mobile", pattern: "(?:CriOS|CrMo)" },
          { label: "Firefox", pattern: "(?:Firefox|Minefield)" },
          { label: "Firefox for iOS", pattern: "FxiOS" },
          { label: "IE", pattern: "IEMobile" },
          { label: "IE", pattern: "MSIE" },
          "Safari"
        ]), f = ie([
          { label: "BlackBerry", pattern: "BB10" },
          "BlackBerry",
          { label: "Galaxy S", pattern: "GT-I9000" },
          { label: "Galaxy S2", pattern: "GT-I9100" },
          { label: "Galaxy S3", pattern: "GT-I9300" },
          { label: "Galaxy S4", pattern: "GT-I9500" },
          { label: "Galaxy S5", pattern: "SM-G900" },
          { label: "Galaxy S6", pattern: "SM-G920" },
          { label: "Galaxy S6 Edge", pattern: "SM-G925" },
          { label: "Galaxy S7", pattern: "SM-G930" },
          { label: "Galaxy S7 Edge", pattern: "SM-G935" },
          "Google TV",
          "Lumia",
          "iPad",
          "iPod",
          "iPhone",
          "Kindle",
          { label: "Kindle Fire", pattern: "(?:Cloud9|Silk-Accelerated)" },
          "Nexus",
          "Nook",
          "PlayBook",
          "PlayStation Vita",
          "PlayStation",
          "TouchPad",
          "Transformer",
          { label: "Wii U", pattern: "WiiU" },
          "Wii",
          "Xbox One",
          { label: "Xbox 360", pattern: "Xbox" },
          "Xoom"
        ]), x = Se({
          Apple: { iPad: 1, iPhone: 1, iPod: 1 },
          Alcatel: {},
          Archos: {},
          Amazon: { Kindle: 1, "Kindle Fire": 1 },
          Asus: { Transformer: 1 },
          "Barnes & Noble": { Nook: 1 },
          BlackBerry: { PlayBook: 1 },
          Google: { "Google TV": 1, Nexus: 1 },
          HP: { TouchPad: 1 },
          HTC: {},
          Huawei: {},
          Lenovo: {},
          LG: {},
          Microsoft: { Xbox: 1, "Xbox One": 1 },
          Motorola: { Xoom: 1 },
          Nintendo: { "Wii U": 1, Wii: 1 },
          Nokia: { Lumia: 1 },
          Oppo: {},
          Samsung: { "Galaxy S": 1, "Galaxy S2": 1, "Galaxy S3": 1, "Galaxy S4": 1 },
          Sony: { PlayStation: 1, "PlayStation Vita": 1 },
          Xiaomi: { Mi: 1, Redmi: 1 }
        }), n = ve([
          "Windows Phone",
          "KaiOS",
          "Android",
          "CentOS",
          { label: "Chrome OS", pattern: "CrOS" },
          "Debian",
          { label: "DragonFly BSD", pattern: "DragonFly" },
          "Fedora",
          "FreeBSD",
          "Gentoo",
          "Haiku",
          "Kubuntu",
          "Linux Mint",
          "OpenBSD",
          "Red Hat",
          "SuSE",
          "Ubuntu",
          "Xubuntu",
          "Cygwin",
          "Symbian OS",
          "hpwOS",
          "webOS ",
          "webOS",
          "Tablet OS",
          "Tizen",
          "Linux",
          "Mac OS X",
          "Macintosh",
          "Mac",
          "Windows 98;",
          "Windows "
        ]);
        function we(y) {
          return j(y, function(S, b) {
            return S || RegExp("\\b" + (b.pattern || k(b)) + "\\b", "i").exec(t) && (b.label || b);
          });
        }
        function Se(y) {
          return j(y, function(S, b, E) {
            return S || (b[f] || b[/^[a-z]+(?: +[a-z]+\b)*/i.exec(f)] || RegExp("\\b" + k(E) + "(?:\\b|\\w*\\d)", "i").exec(t)) && E;
          });
        }
        function xe(y) {
          return j(y, function(S, b) {
            return S || RegExp("\\b" + (b.pattern || k(b)) + "\\b", "i").exec(t) && (b.label || b);
          });
        }
        function ve(y) {
          return j(y, function(S, b) {
            var E = b.pattern || k(b);
            return !S && (S = RegExp("\\b" + E + "(?:/[\\d.]+|[ \\w.]*)", "i").exec(t)) && (S = V(S, E, b.label || b)), S;
          });
        }
        function ie(y) {
          return j(y, function(S, b) {
            var E = b.pattern || k(b);
            return !S && (S = RegExp("\\b" + E + " *\\d+[.\\w_]*", "i").exec(t) || RegExp("\\b" + E + " *\\w+-[\\w]*", "i").exec(t) || RegExp("\\b" + E + "(?:; *(?:[a-z]+[_-])?[a-z]+\\d+|[^ ();-]*)", "i").exec(t)) && ((S = String(b.label && !RegExp(E, "i").test(b.label) ? b.label : S).split("/"))[1] && !/[\d.]+/.test(S[0]) && (S[0] += " " + S[1]), b = b.label || b, S = R(S[0].replace(RegExp(E, "i"), b).replace(RegExp("; *(?:" + b + "[_-])?", "i"), " ").replace(RegExp("(" + b + ")[-_.]?(\\w)", "i"), "$1 $2"))), S;
          });
        }
        function re(y) {
          return j(y, function(S, b) {
            return S || (RegExp(b + "(?:-[\\d.]+/|(?: for [\\w-]+)?[ /-])([\\d.]+[^ ();/_-]*)", "i").exec(t) || 0)[1] || null;
          });
        }
        function Oe() {
          return this.description || "";
        }
        if (p && (p = [p]), /\bAndroid\b/.test(n) && !f && (e = /\bAndroid[^;]*;(.*?)(?:Build|\) AppleWebKit)\b/i.exec(t)) && (f = A(e[1]).replace(/^[a-z]{2}-[a-z]{2};\s*/i, "") || null), x && !f ? f = ie([x]) : x && f && (f = f.replace(RegExp("^(" + k(x) + ")[-_.\\s]", "i"), x + " ").replace(RegExp("^(" + k(x) + ")[-_.]?(\\w)", "i"), x + " $2")), (e = /\bGoogle TV\b/.exec(f)) && (f = e[0]), /\bSimulator\b/i.test(t) && (f = (f ? f + " " : "") + "Simulator"), a == "Opera Mini" && /\bOPiOS\b/.test(t) && d.push("running in Turbo/Uncompressed mode"), a == "IE" && /\blike iPhone OS\b/.test(t) ? (e = L(t.replace(/like iPhone OS/, "")), x = e.manufacturer, f = e.product) : /^iP/.test(f) ? (a || (a = "Safari"), n = "iOS" + ((e = / OS ([\d_]+)/i.exec(t)) ? " " + e[1].replace(/_/g, ".") : "")) : a == "Konqueror" && /^Linux\b/i.test(n) ? n = "Kubuntu" : x && x != "Google" && (/Chrome/.test(a) && !/\bMobile Safari\b/i.test(t) || /\bVita\b/.test(f)) || /\bAndroid\b/.test(n) && /^Chrome/.test(a) && /\bVersion\//i.test(t) ? (a = "Android Browser", n = /\bAndroid\b/.test(n) ? n : "Android") : a == "Silk" ? (/\bMobi/i.test(t) || (n = "Android", d.unshift("desktop mode")), /Accelerated *= *true/i.test(t) && d.unshift("accelerated")) : a == "UC Browser" && /\bUCWEB\b/.test(t) ? d.push("speed mode") : a == "PaleMoon" && (e = /\bFirefox\/([\d.]+)\b/.exec(t)) ? d.push("identifying as Firefox " + e[1]) : a == "Firefox" && (e = /\b(Mobile|Tablet|TV)\b/i.exec(t)) ? (n || (n = "Firefox OS"), f || (f = e[1])) : !a || (e = !/\bMinefield\b/i.test(t) && /\b(?:Firefox|Safari)\b/.exec(a)) ? (a && !f && /[\/,]|^[^(]+?\)/.test(t.slice(t.indexOf(e + "/") + 8)) && (a = null), (e = f || x || n) && (f || x || /\b(?:Android|Symbian OS|Tablet OS|webOS)\b/.test(n)) && (a = /[a-z]+(?: Hat)?/i.exec(/\bAndroid\b/.test(n) ? n : e) + " Browser")) : a == "Electron" && (e = (/\bChrome\/([\d.]+)\b/.exec(t) || 0)[1]) && d.push("Chromium " + e), s || (s = re([
          "(?:Cloud9|CriOS|CrMo|Edge|Edg|EdgA|EdgiOS|FxiOS|HeadlessChrome|IEMobile|Iron|Opera ?Mini|OPiOS|OPR|Raven|SamsungBrowser|Silk(?!/[\\d.]+$)|UCBrowser|YaBrowser)",
          "Version",
          k(a),
          "(?:Firefox|Minefield|NetFront)"
        ])), (e = p == "iCab" && parseFloat(s) > 3 && "WebKit" || /\bOpera\b/.test(a) && (/\bOPR\b/.test(t) ? "Blink" : "Presto") || /\b(?:Midori|Nook|Safari)\b/i.test(t) && !/^(?:Trident|EdgeHTML)$/.test(p) && "WebKit" || !p && /\bMSIE\b/i.test(t) && (n == "Mac OS" ? "Tasman" : "Trident") || p == "WebKit" && /\bPlayStation\b(?! Vita\b)/i.test(a) && "NetFront") && (p = [e]), a == "IE" && (e = (/; *(?:XBLWP|ZuneWP)(\d+)/i.exec(t) || 0)[1]) ? (a += " Mobile", n = "Windows Phone " + (/\+$/.test(e) ? e : e + ".x"), d.unshift("desktop mode")) : /\bWPDesktop\b/i.test(t) ? (a = "IE Mobile", n = "Windows Phone 8.x", d.unshift("desktop mode"), s || (s = (/\brv:([\d.]+)/.exec(t) || 0)[1])) : a != "IE" && p == "Trident" && (e = /\brv:([\d.]+)/.exec(t)) && (a && d.push("identifying as " + a + (s ? " " + s : "")), a = "IE", s = e[1]), W) {
          if (ce(h, "global"))
            if (I && (e = I.lang.System, D = e.getProperty("os.arch"), n = n || e.getProperty("os.name") + " " + e.getProperty("os.version")), ue) {
              try {
                s = h.require("ringo/engine").version.join("."), a = "RingoJS";
              } catch {
                (e = h.system) && e.global.system == h.system && (a = "Narwhal", n || (n = e[0].os || null));
              }
              a || (a = "Rhino");
            } else typeof h.process == "object" && !h.process.browser && (e = h.process) && (typeof e.versions == "object" && (typeof e.versions.electron == "string" ? (d.push("Node " + e.versions.node), a = "Electron", s = e.versions.electron) : typeof e.versions.nw == "string" && (d.push("Chromium " + s, "Node " + e.versions.node), a = "NW.js", s = e.versions.nw)), a || (a = "Node.js", D = e.arch, n = e.platform, s = /[\d.]+/.exec(e.version), s = s ? s[0] : null));
          else F(e = h.runtime) == he ? (a = "Adobe AIR", n = e.flash.system.Capabilities.os) : F(e = h.phantom) == be ? (a = "PhantomJS", s = (e = e.version || null) && e.major + "." + e.minor + "." + e.patch) : typeof J.documentMode == "number" && (e = /\bTrident\/(\d+)/i.exec(t)) ? (s = [s, J.documentMode], (e = +e[1] + 4) != s[1] && (d.push("IE " + s[1] + " mode"), p && (p[1] = ""), s[1] = e), s = a == "IE" ? String(s[1].toFixed(1)) : s[0]) : typeof J.documentMode == "number" && /^(?:Chrome|Firefox)\b/.test(a) && (d.push("masking as " + a + " " + s), a = "IE", s = "11.0", p = ["Trident"], n = "Windows");
          n = n && R(n);
        }
        if (s && (e = /(?:[ab]|dp|pre|[ab]\d+pre)(?:\d+\+?)?$/i.exec(s) || /(?:alpha|beta)(?: ?\d)?/i.exec(t + ";" + (W && O.appMinorVersion)) || /\bMinefield\b/i.test(t) && "a") && (z = /b/i.test(e) ? "beta" : "alpha", s = s.replace(RegExp(e + "\\+?$"), "") + (z == "beta" ? me : ge) + (/\d+\+?/.exec(e) || "")), a == "Fennec" || a == "Firefox" && /\b(?:Android|Firefox OS|KaiOS)\b/.test(n))
          a = "Firefox Mobile";
        else if (a == "Maxthon" && s)
          s = s.replace(/\.[\d.]+/, ".x");
        else if (/\bXbox\b/i.test(f))
          f == "Xbox 360" && (n = null), f == "Xbox 360" && /\bIEMobile\b/.test(t) && d.unshift("mobile mode");
        else if ((/^(?:Chrome|IE|Opera)$/.test(a) || a && !f && !/Browser|Mobi/.test(a)) && (n == "Windows CE" || /Mobi/i.test(t)))
          a += " Mobile";
        else if (a == "IE" && W)
          try {
            h.external === null && d.unshift("platform preview");
          } catch {
            d.unshift("embedded");
          }
        else (/\bBlackBerry\b/.test(f) || /\bBB10\b/.test(t)) && (e = (RegExp(f.replace(/ +/g, " *") + "/([.\\d]+)", "i").exec(t) || 0)[1] || s) ? (e = [e, /BB10/.test(t)], n = (e[1] ? (f = null, x = "BlackBerry") : "Device Software") + " " + e[0], s = null) : this != G && f != "Wii" && (W && $ || /Opera/.test(a) && /\b(?:MSIE|Firefox)\b/i.test(t) || a == "Firefox" && /\bOS X (?:\d+\.){2,}/.test(n) || a == "IE" && (n && !/^Win/.test(n) && s > 5.5 || /\bWindows XP\b/.test(n) && s > 8 || s == 8 && !/\bTrident\b/.test(t))) && !w.test(e = L.call(G, t.replace(w, "") + ";")) && e.name && (e = "ing as " + e.name + ((e = e.version) ? " " + e : ""), w.test(a) ? (/\bIE\b/.test(e) && n == "Mac OS" && (n = null), e = "identify" + e) : (e = "mask" + e, K ? a = R(K.replace(/([a-z])([A-Z])/g, "$1 $2")) : a = "Opera", /\bIE\b/.test(e) && (n = null), W || (s = null)), p = ["Presto"], d.push(e));
        (e = (/\bAppleWebKit\/([\d.]+\+?)/i.exec(t) || 0)[1]) && (e = [parseFloat(e.replace(/\.(\d)$/, ".0$1")), e], a == "Safari" && e[1].slice(-1) == "+" ? (a = "WebKit Nightly", z = "alpha", s = e[1].slice(0, -1)) : (s == e[1] || s == (e[2] = (/\bSafari\/([\d.]+\+?)/i.exec(t) || 0)[1])) && (s = null), e[1] = (/\b(?:Headless)?Chrome\/([\d.]+)/i.exec(t) || 0)[1], e[0] == 537.36 && e[2] == 537.36 && parseFloat(e[1]) >= 28 && p == "WebKit" && (p = ["Blink"]), !W || !fe && !e[1] ? (p && (p[1] = "like Safari"), e = (e = e[0], e < 400 ? 1 : e < 500 ? 2 : e < 526 ? 3 : e < 533 ? 4 : e < 534 ? "4+" : e < 535 ? 5 : e < 537 ? 6 : e < 538 ? 7 : e < 601 ? 8 : e < 602 ? 9 : e < 604 ? 10 : e < 606 ? 11 : e < 608 ? 12 : "12")) : (p && (p[1] = "like Chrome"), e = e[1] || (e = e[0], e < 530 ? 1 : e < 532 ? 2 : e < 532.05 ? 3 : e < 533 ? 4 : e < 534.03 ? 5 : e < 534.07 ? 6 : e < 534.1 ? 7 : e < 534.13 ? 8 : e < 534.16 ? 9 : e < 534.24 ? 10 : e < 534.3 ? 11 : e < 535.01 ? 12 : e < 535.02 ? "13+" : e < 535.07 ? 15 : e < 535.11 ? 16 : e < 535.19 ? 17 : e < 536.05 ? 18 : e < 536.1 ? 19 : e < 537.01 ? 20 : e < 537.11 ? "21+" : e < 537.13 ? 23 : e < 537.18 ? 24 : e < 537.24 ? 25 : e < 537.36 ? 26 : p != "Blink" ? "27" : "28")), p && (p[1] += " " + (e += typeof e == "number" ? ".x" : /[.+]/.test(e) ? "" : "+")), a == "Safari" && (!s || parseInt(s) > 45) ? s = e : a == "Chrome" && /\bHeadlessChrome/i.test(t) && d.unshift("headless")), a == "Opera" && (e = /\bzbov|zvav$/.exec(n)) ? (a += " ", d.unshift("desktop mode"), e == "zvav" ? (a += "Mini", s = null) : a += "Mobile", n = n.replace(RegExp(" *" + e + "$"), "")) : a == "Safari" && /\bChrome\b/.exec(p && p[1]) ? (d.unshift("desktop mode"), a = "Chrome Mobile", s = null, /\bOS X\b/.test(n) ? (x = "Apple", n = "iOS 4.3+") : n = null) : /\bSRWare Iron\b/.test(a) && !s && (s = re("Chrome")), s && s.indexOf(e = /[\d.]+$/.exec(n)) == 0 && t.indexOf("/" + e + "-") > -1 && (n = A(n.replace(e, ""))), n && n.indexOf(a) != -1 && !RegExp(a + " OS").test(n) && (n = n.replace(RegExp(" *" + k(a) + " *"), "")), p && !/\b(?:Avant|Nook)\b/.test(a) && (/Browser|Lunascape|Maxthon/.test(a) || a != "Safari" && /^iOS/.test(n) && /\bSafari\b/.test(p[1]) || /^(?:Adobe|Arora|Breach|Midori|Opera|Phantom|Rekonq|Rock|Samsung Internet|Sleipnir|SRWare Iron|Vivaldi|Web)/.test(a) && p[1]) && (e = p[p.length - 1]) && d.push(e), d.length && (d = ["(" + d.join("; ") + ")"]), x && f && f.indexOf(x) < 0 && d.push("on " + x), f && d.push((/^on /.test(d[d.length - 1]) ? "" : "on ") + f), n && (e = / ([\d.+]+)$/.exec(n), H = e && n.charAt(n.length - e[0].length - 1) == "/", n = {
          architecture: 32,
          family: e && !H ? n.replace(e[0], "") : n,
          version: e ? e[1] : null,
          toString: function() {
            var y = this.version;
            return this.family + (y && !H ? " " + y : "") + (this.architecture == 64 ? " 64-bit" : "");
          }
        }), (e = /\b(?:AMD|IA|Win|WOW|x86_|x)64\b/i.exec(D)) && !/\bi686\b/i.test(D) ? (n && (n.architecture = 64, n.family = n.family.replace(RegExp(" *" + e), "")), a && (/\bWOW64\b/i.test(t) || W && /\w(?:86|32)$/.test(O.cpuClass || O.platform) && !/\bWin64; x64\b/i.test(t)) && d.unshift("32-bit")) : n && /^OS X/.test(n.family) && a == "Chrome" && parseFloat(s) >= 39 && (n.architecture = 64), t || (t = null);
        var P = {};
        return P.description = t, P.layout = p && p[0], P.manufacturer = x, P.name = a, P.prerelease = z, P.product = f, P.ua = t, P.version = a && s, P.os = n || {
          /**
           * The CPU architecture the OS is built for.
           *
           * @memberOf platform.os
           * @type number|null
           */
          architecture: null,
          /**
           * The family of the OS.
           *
           * Common values include:
           * "Windows", "Windows Server 2008 R2 / 7", "Windows Server 2008 / Vista",
           * "Windows XP", "OS X", "Linux", "Ubuntu", "Debian", "Fedora", "Red Hat",
           * "SuSE", "Android", "iOS" and "Windows Phone"
           *
           * @memberOf platform.os
           * @type string|null
           */
          family: null,
          /**
           * The version of the OS.
           *
           * @memberOf platform.os
           * @type string|null
           */
          version: null,
          /**
           * Returns the OS string.
           *
           * @memberOf platform.os
           * @returns {string} The OS string.
           */
          toString: function() {
            return "null";
          }
        }, P.parse = L, P.toString = Oe, P.version && d.unshift(s), P.name && d.unshift(a), n && a && !(n == String(n).split(" ")[0] && (n == a.split(" ")[0] || f)) && d.push(f ? "(" + n + ")" : "on " + n), d.length && (P.description = d.join(" ")), P;
      }
      var te = L();
      c && m ? G(te, function(t, h) {
        c[h] = t;
      }) : l.platform = te;
    }).call(ye);
  }(N, N.exports)), N.exports;
}
var _ = Pe();
function Q(i) {
  return parseInt(String(i), 10);
}
"toInt" in String.prototype || (String.prototype.toInt = function() {
  return Q(this);
});
"toUint" in String.prototype || (String.prototype.toUint = function() {
  const i = Q(this);
  return i < 0 ? -i : i;
});
const Me = /^[^\/\.]+$|[^\/]+(?=\.)/;
function Be(i) {
  return (i.match(Me) ?? [""])[0];
}
class Y {
  static stageW = 0;
  static stageH = 0;
  static debugLog = !1;
  static isSafari = _.name === "Safari";
  static isFirefox = _.name === "Firefox";
  static isMac = /OS X/.test(_.os?.family ?? "");
  static isWin = /Windows/.test(_.os?.family ?? "");
  static isMobile = !/(Windows|OS X)/.test(_.os?.family ?? "");
  static hDip = {};
  static isDbg = !1;
  static isPackaged = !1;
  static isDarkMode = !1;
  static cc4ColorName;
}
var se = /* @__PURE__ */ ((i) => (i.DEFAULT = "", i.SP_GSM = "png|jpg|jpeg|json|svg|webp|mp4|webm", i.SCRIPT = "sn|ssn", i.FONT = "woff2|woff|otf|ttf", i.SOUND = "mp3|m4a|ogg|aac|flac|wav", i.HTML = "htm|html", i.CSS = "css", i.SN = "sn", i.TST_PNGPNG_ = "png|png_", i.TST_HH = "hh", i.TST_EEE = "eee", i.TST_GGG = "ggg", i.TST_PNGXML = "png|xml", i))(se || {});
class Ce {
  constructor(r) {
    this.sys = r;
  }
  oCfg = {
    save_ns: "",
    // 扱うセーブデータを一意に識別するキーワード文字列
    window: {
      // アプリケーションウインドウサイズ
      width: 300,
      height: 300
    },
    book: {
      // プロジェクトの詳細情報です
      title: "",
      //作品タイトル
      creator: "",
      //著作者。同人ならペンネーム
      cre_url: "",
      //著作者URL。ツイッターやメール、サイトなど
      publisher: "",
      //出版社。同人ならサークル名
      pub_url: "",
      //出版社URL。無ければ省略します
      detail: "",
      // 内容紹介。端的に記入
      version: "1.0"
    },
    log: { max_len: 64 },
    // プレイヤーが読んだ文章を読み返せる履歴のページ数
    init: {
      bg_color: "#000000",
      // 背景色
      tagch_msecwait: 10,
      // 通常文字表示待ち時間（未読／既読）
      auto_msecpagewait: 3500,
      // 自動文字表示、行クリック待ち時間（未読／既読）
      escape: ""
      // エスケープ文字
    },
    debug: {
      devtool: !1,
      token: !1,
      tag: !1,
      putCh: !1,
      debugLog: !1,
      baseTx: !1,
      masume: !1,
      // テキストレイヤ：ガイドマス目を表示するか
      variable: !1,
      dumpHtm: !1
    },
    code: {},
    // 暗号化しないフォルダ
    debuger_token: ""
    // デバッガとの接続トークン
  };
  userFnTail = "";
  // 4tst public
  hPathFn2Exts = {};
  async load(r) {
    this.oCfg.save_ns = r?.save_ns ?? this.oCfg.save_ns, this.oCfg.window.width = Number(r?.window?.width ?? this.oCfg.window.width), this.oCfg.window.height = Number(r?.window?.height ?? this.oCfg.window.height), this.oCfg.book = { ...this.oCfg.book, ...r.book }, this.oCfg.log.max_len = r.log?.max_len?.max_len ?? this.oCfg.log.max_len, this.oCfg.init = { ...this.oCfg.init, ...r.init }, this.oCfg.debug = { ...this.oCfg.debug, ...r.debug }, this.oCfg.debuger_token = r.debuger_token;
    const o = this.sys.arg.cur + "path.json", l = await fetch(o);
    if (!l.ok) throw Error(l.statusText);
    const c = await l.text(), m = JSON.parse(await this.sys.dec(o, c));
    for (const [u, M] of Object.entries(m)) {
      const w = this.hPathFn2Exts[u] = M;
      for (const [v, C] of Object.entries(w))
        v !== ":cnt" && (w[v] = this.sys.arg.cur + C);
    }
    if (this.#e = this.matchPath(
      "^breakline$",
      "png|jpg|jpeg|json|svg|webp|mp4|webm"
      /* SP_GSM */
    ).length > 0, this.#t = this.matchPath(
      "^breakpage$",
      "png|jpg|jpeg|json|svg|webp|mp4|webm"
      /* SP_GSM */
    ).length > 0, this.sys.arg.crypto)
      for (const [u, M] of Object.entries(this.hPathFn2Exts))
        for (const [w, v] of Object.entries(M)) {
          if (!w.startsWith(":") || !w.endsWith(":id")) continue;
          const C = v.slice(v.lastIndexOf("/") + 1), B = M[w.slice(0, -10)] ?? "", V = await (await fetch(B)).text(), q = this.sys.hash(V);
          if (C !== q) throw `ファイル改竄エラーです fn:${B}`;
        }
    else
      for (const [u, M] of Object.entries(this.hPathFn2Exts))
        for (const w of Object.keys(M))
          w.startsWith(":");
  }
  #e = !1;
  get existsBreakline() {
    return this.#e;
  }
  #t = !1;
  get existsBreakpage() {
    return this.#t;
  }
  getNs() {
    return `skynovel.${this.oCfg.save_ns} - `;
  }
  #i = /([^\/\s]+)\.([^\d]\w+)/;
  // 4 match 498 step(~1ms)  https://regex101.com/r/tpVgmI/1
  searchPath(r, o = "") {
    if (!r) throw "[searchPath] fnが空です";
    if (r.startsWith("http://")) return r;
    const l = r.match(this.#i);
    let c = l ? l[1] : r;
    const m = l ? l[2] : "";
    if (this.userFnTail) {
      const w = c + "@@" + this.userFnTail;
      if (w in this.hPathFn2Exts) {
        if (o === "") c = w;
        else for (const v of Object.keys(this.hPathFn2Exts[w] ?? {}))
          if (`|${o}|`.includes(`|${v}|`)) {
            c = w;
            break;
          }
      }
    }
    const u = this.hPathFn2Exts[c];
    if (!u) throw `サーチパスに存在しないファイル【${r}】です`;
    if (!m) {
      const w = Q(u[":cnt"]);
      if (o === "") {
        if (w > 1) throw `指定ファイル【${r}】が複数マッチします。サーチ対象拡張子群【${o}】で絞り込むか、ファイル名を個別にして下さい。`;
        return r;
      }
      const v = `|${o}|`;
      if (w > 1) {
        let C = 0;
        for (const B of Object.keys(u))
          if (v.includes(`|${B}|`) && ++C > 1)
            throw `指定ファイル【${r}】が複数マッチします。サーチ対象拡張子群【${o}】で絞り込むか、ファイル名を個別にして下さい。`;
      }
      for (const C of Object.keys(u))
        if (v.includes(`|${C}|`)) return u[C];
      throw `サーチ対象拡張子群【${o}】にマッチするファイルがサーチパスに存在しません。探索ファイル名=【${r}】`;
    }
    if (o !== "" && !`|${o}|`.includes(`|${m}|`))
      throw `指定ファイルの拡張子【${m}】は、サーチ対象拡張子群【${o}】にマッチしません。探索ファイル名=【${r}】`;
    const M = u[m];
    if (!M) throw `サーチパスに存在しない拡張子【${m}】です。探索ファイル名=【${r}】、サーチ対象拡張子群【${o}】`;
    return M;
  }
  matchPath(r, o = "") {
    const l = [], c = new RegExp(r), m = new RegExp(o);
    for (const [u, M] of Object.entries(this.hPathFn2Exts)) {
      if (u.search(c) === -1) continue;
      if (o === "") {
        l.push(M);
        continue;
      }
      const w = {};
      let v = !1;
      for (const C of Object.keys(M))
        C.search(m) !== -1 && (w[C] = u, v = !0);
      v && l.push(w);
    }
    return l;
  }
  addPath(r, o) {
    const l = {};
    for (const [c, m] of Object.entries(o))
      l[c] = (c.startsWith(":") ? "" : this.sys.arg.cur) + m;
    this.hPathFn2Exts[r] = l;
  }
}
class ee extends Ce {
  constructor(r) {
    super(r), this.sys = r;
  }
  static async generate(r) {
    const o = new ee(r), l = r.arg.cur + "prj.json", c = await fetch(l);
    if (!c.ok) throw Error(c.statusText);
    const m = await c.text(), u = JSON.parse(await r.dec(l, m));
    return await o.load(u), o;
  }
  async load(r) {
    await super.load(r), Y.stageW = this.oCfg.window.width, Y.stageH = this.oCfg.window.height, Y.debugLog = this.oCfg.debug.debugLog;
  }
  searchPath(r, o = se.DEFAULT) {
    return r.startsWith("downloads:/") ? this.sys.path_downloads + r.slice(11) : r.startsWith("userdata:/") ? this.sys.path_userdata + "storage/" + r.slice(10) : super.searchPath(r, o);
  }
}
var le = /* @__PURE__ */ ((i) => (i.Renderer = "renderer", i.Application = "application", i.RendererSystem = "renderer-webgl-system", i.RendererPlugin = "renderer-webgl-plugin", i.CanvasRendererSystem = "renderer-canvas-system", i.CanvasRendererPlugin = "renderer-canvas-plugin", i.Asset = "asset", i.LoadParser = "load-parser", i.ResolveParser = "resolve-parser", i.CacheParser = "cache-parser", i.DetectionParser = "detection-parser", i))(le || {});
const Z = (i) => {
  if (typeof i == "function" || typeof i == "object" && i.extension) {
    if (!i.extension)
      throw new Error("Extension class must have an extension object");
    i = { ...typeof i.extension != "object" ? { type: i.extension } : i.extension, ref: i };
  }
  if (typeof i == "object")
    i = { ...i };
  else
    throw new Error("Invalid extension type");
  return typeof i.type == "string" && (i.type = [i.type]), i;
}, oe = (i, r) => Z(i).priority ?? r, Ee = {
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
  remove(...i) {
    return i.map(Z).forEach((r) => {
      r.type.forEach((o) => this._removeHandlers[o]?.(r));
    }), this;
  },
  /**
   * Register new extensions with PixiJS.
   * @param extensions - The spread of extensions to add to PixiJS.
   * @returns {PIXI.extensions} For chaining.
   */
  add(...i) {
    return i.map(Z).forEach((r) => {
      r.type.forEach((o) => {
        const l = this._addHandlers, c = this._queue;
        l[o] ? l[o]?.(r) : (c[o] = c[o] || [], c[o]?.push(r));
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
  handle(i, r, o) {
    const l = this._addHandlers, c = this._removeHandlers;
    if (l[i] || c[i])
      throw new Error(`Extension type ${i} already has a handler`);
    l[i] = r, c[i] = o;
    const m = this._queue;
    return m[i] && (m[i]?.forEach((u) => r(u)), delete m[i]), this;
  },
  /**
   * Handle a type, but using a map by `name` property.
   * @param type - Type of extension to handle.
   * @param map - The object map of named extensions.
   * @returns {PIXI.extensions} For chaining.
   */
  handleByMap(i, r) {
    return this.handle(
      i,
      (o) => {
        o.name && (r[o.name] = o.ref);
      },
      (o) => {
        o.name && delete r[o.name];
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
  handleByList(i, r, o = -1) {
    return this.handle(
      i,
      (l) => {
        r.includes(l.ref) || (r.push(l.ref), r.sort((c, m) => oe(m, o) - oe(c, o)));
      },
      (l) => {
        const c = r.indexOf(l.ref);
        c !== -1 && r.splice(c, 1);
      }
    );
  }
};
window.__REACT_DEVTOOLS_GLOBAL_HOOK__ = { isDisabled: !0 };
class ke {
  constructor(r = {}, o) {
    this.hPlg = r, this.arg = o;
  }
  async init() {
    this.cfg = await ee.generate(this);
    const { opening: r } = await import("./Stage.js");
    r(this);
    const { Assets: o } = await import("./index.js");
    await o.init({ basePath: location.origin }), Ee.add(this.#t);
    const { ScriptMng: l } = await import("./ScriptMng.js");
    this.#e = await l.generate(this, o), await this.#e.load("main");
  }
  #e;
  cfg;
  #t = {
    extension: {
      type: le.LoadParser,
      name: "sn-loader"
      //priority: LoaderParserPriority.High,
    },
    test: (r) => r.endsWith(".sn"),
    load: (r) => new Promise(async (o, l) => {
      const c = await fetch(r);
      if (!c.ok) {
        l("sn-loader fetch err:" + c.statusText);
        return;
      }
      try {
        o(await this.dec("sn", await c.text()));
      } catch (m) {
        l(`sn-loader err url:${r} ${m}`);
      }
    })
  };
  $path_downloads = "";
  get path_downloads() {
    return this.$path_downloads;
  }
  $path_userdata = "";
  get path_userdata() {
    return this.$path_userdata;
  }
  dec = (r, o) => Promise.resolve(o);
  hash = (r) => "";
}
class Fe extends ke {
  constructor(r = {}, o = { cur: "prj/", crypto: !1, dip: "" }) {
    super(r, o), super.init();
  }
}
export {
  Y as C,
  le as E,
  se as S,
  We as a,
  Be as b,
  ae as c,
  Fe as d,
  Ee as e,
  $e as g
};
//# sourceMappingURL=web2.js.map
