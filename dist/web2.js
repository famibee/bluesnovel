var ne = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function Be(r) {
  return r && r.__esModule && Object.prototype.hasOwnProperty.call(r, "default") ? r.default : r;
}
function We(r) {
  if (r.__esModule) return r;
  var i = r.default;
  if (typeof i == "function") {
    var o = function c() {
      return this instanceof c ? Reflect.construct(i, arguments, this.constructor) : i.apply(this, arguments);
    };
    o.prototype = i.prototype;
  } else o = {};
  return Object.defineProperty(o, "__esModule", { value: !0 }), Object.keys(r).forEach(function(c) {
    var l = Object.getOwnPropertyDescriptor(r, c);
    Object.defineProperty(o, c, l.get ? l : {
      enumerable: !0,
      get: function() {
        return r[c];
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
var Oe = N.exports, ae;
function Pe() {
  return ae || (ae = 1, function(r, i) {
    (function() {
      var o = {
        function: !0,
        object: !0
      }, c = o[typeof window] && window || this, l = i, u = r && !r.nodeType && r, g = l && u && typeof ne == "object" && ne;
      g && (g.global === g || g.window === g || g.self === g) && (c = g);
      var M = Math.pow(2, 53) - 1, w = /\bOpera/, v = Object.prototype, C = v.hasOwnProperty, W = v.toString;
      function z(t) {
        return t = String(t), t.charAt(0).toUpperCase() + t.slice(1);
      }
      function V(t, h, m) {
        var y = {
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
        return h && m && /^Win/i.test(t) && !/^Windows Phone /i.test(t) && (y = y[/[\d.]+$/.exec(t)]) && (t = "Windows " + y), t = String(t), h && m && (t = t.replace(RegExp(h, "i"), m)), t = R(
          t.replace(/ ce$/i, " CE").replace(/\bhpw/i, "web").replace(/\bMacintosh\b/, "Mac OS").replace(/_PowerPC\b/i, " OS").replace(/\b(OS X) [^ \d]+/i, "$1").replace(/\bMac (OS X)\b/, "$1").replace(/\/(\d)/, " $1").replace(/_/g, ".").replace(/(?: BePC|[ .]*fc[ \d.]+)$/i, "").replace(/\bx86\.64\b/gi, "x86_64").replace(/\b(Windows Phone) OS\b/, "$1").replace(/\b(Chrome OS \w+) [\d.]+\b/, "$1").split(" on ")[0]
        ), t;
      }
      function A(t, h) {
        var m = -1, y = t ? t.length : 0;
        if (typeof y == "number" && y > -1 && y <= M)
          for (; ++m < y; )
            h(t[m], m, t);
        else
          G(t, h);
      }
      function R(t) {
        return t = q(t), /^(?:webOS|i(?:OS|P))/.test(t) ? t : z(t);
      }
      function G(t, h) {
        for (var m in t)
          C.call(t, m) && h(t[m], m, t);
      }
      function j(t) {
        return t == null ? z(t) : W.call(t).slice(8, -1);
      }
      function ce(t, h) {
        var m = t != null ? typeof t[h] : "number";
        return !/^(?:boolean|number|string|undefined)$/.test(m) && (m == "object" ? !!t[h] : !0);
      }
      function k(t) {
        return String(t).replace(/([ -])(?!$)/g, "$1?");
      }
      function F(t, h) {
        var m = null;
        return A(t, function(y, L) {
          m = h(m, y, L, t);
        }), m;
      }
      function q(t) {
        return String(t).replace(/^ +| +$/g, "");
      }
      function T(t) {
        var h = c, m = t && typeof t == "object" && j(t) != "String";
        m && (h = t, t = null);
        var y = h.navigator || {}, L = y.userAgent || "";
        t || (t = L);
        var fe = m ? !!y.likeChrome : /\bChrome\b/.test(t) && !/internal|\n/i.test(W.toString()), X = "Object", he = m ? X : "ScriptBridgingProxyObject", de = m ? X : "Environment", be = m && h.java ? "JavaPackage" : j(h.java), pe = m ? X : "RuntimeObject", I = /\bJava/.test(be) && h.java, ue = I && j(h.environment) == de, ge = I ? "a" : "α", me = I ? "b" : "β", J = h.document || {}, $ = h.operamini || h.opera, K = w.test(K = m && $ ? $["[[Class]]"] : j($)) ? K : $ = null, e, D = t, d = [], U = null, B = t == L, s = B && $ && typeof $.version == "function" && $.version(), H, b = we([
          { label: "EdgeHTML", pattern: "Edge" },
          "Trident",
          { label: "WebKit", pattern: "AppleWebKit" },
          "iCab",
          "Presto",
          "NetFront",
          "Tasman",
          "KHTML",
          "Gecko"
        ]), n = xe([
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
        }), a = ve([
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
        function we(O) {
          return F(O, function(S, p) {
            return S || RegExp("\\b" + (p.pattern || k(p)) + "\\b", "i").exec(t) && (p.label || p);
          });
        }
        function Se(O) {
          return F(O, function(S, p, E) {
            return S || (p[f] || p[/^[a-z]+(?: +[a-z]+\b)*/i.exec(f)] || RegExp("\\b" + k(E) + "(?:\\b|\\w*\\d)", "i").exec(t)) && E;
          });
        }
        function xe(O) {
          return F(O, function(S, p) {
            return S || RegExp("\\b" + (p.pattern || k(p)) + "\\b", "i").exec(t) && (p.label || p);
          });
        }
        function ve(O) {
          return F(O, function(S, p) {
            var E = p.pattern || k(p);
            return !S && (S = RegExp("\\b" + E + "(?:/[\\d.]+|[ \\w.]*)", "i").exec(t)) && (S = V(S, E, p.label || p)), S;
          });
        }
        function ie(O) {
          return F(O, function(S, p) {
            var E = p.pattern || k(p);
            return !S && (S = RegExp("\\b" + E + " *\\d+[.\\w_]*", "i").exec(t) || RegExp("\\b" + E + " *\\w+-[\\w]*", "i").exec(t) || RegExp("\\b" + E + "(?:; *(?:[a-z]+[_-])?[a-z]+\\d+|[^ ();-]*)", "i").exec(t)) && ((S = String(p.label && !RegExp(E, "i").test(p.label) ? p.label : S).split("/"))[1] && !/[\d.]+/.test(S[0]) && (S[0] += " " + S[1]), p = p.label || p, S = R(S[0].replace(RegExp(E, "i"), p).replace(RegExp("; *(?:" + p + "[_-])?", "i"), " ").replace(RegExp("(" + p + ")[-_.]?(\\w)", "i"), "$1 $2"))), S;
          });
        }
        function re(O) {
          return F(O, function(S, p) {
            return S || (RegExp(p + "(?:-[\\d.]+/|(?: for [\\w-]+)?[ /-])([\\d.]+[^ ();/_-]*)", "i").exec(t) || 0)[1] || null;
          });
        }
        function ye() {
          return this.description || "";
        }
        if (b && (b = [b]), /\bAndroid\b/.test(a) && !f && (e = /\bAndroid[^;]*;(.*?)(?:Build|\) AppleWebKit)\b/i.exec(t)) && (f = q(e[1]).replace(/^[a-z]{2}-[a-z]{2};\s*/i, "") || null), x && !f ? f = ie([x]) : x && f && (f = f.replace(RegExp("^(" + k(x) + ")[-_.\\s]", "i"), x + " ").replace(RegExp("^(" + k(x) + ")[-_.]?(\\w)", "i"), x + " $2")), (e = /\bGoogle TV\b/.exec(f)) && (f = e[0]), /\bSimulator\b/i.test(t) && (f = (f ? f + " " : "") + "Simulator"), n == "Opera Mini" && /\bOPiOS\b/.test(t) && d.push("running in Turbo/Uncompressed mode"), n == "IE" && /\blike iPhone OS\b/.test(t) ? (e = T(t.replace(/like iPhone OS/, "")), x = e.manufacturer, f = e.product) : /^iP/.test(f) ? (n || (n = "Safari"), a = "iOS" + ((e = / OS ([\d_]+)/i.exec(t)) ? " " + e[1].replace(/_/g, ".") : "")) : n == "Konqueror" && /^Linux\b/i.test(a) ? a = "Kubuntu" : x && x != "Google" && (/Chrome/.test(n) && !/\bMobile Safari\b/i.test(t) || /\bVita\b/.test(f)) || /\bAndroid\b/.test(a) && /^Chrome/.test(n) && /\bVersion\//i.test(t) ? (n = "Android Browser", a = /\bAndroid\b/.test(a) ? a : "Android") : n == "Silk" ? (/\bMobi/i.test(t) || (a = "Android", d.unshift("desktop mode")), /Accelerated *= *true/i.test(t) && d.unshift("accelerated")) : n == "UC Browser" && /\bUCWEB\b/.test(t) ? d.push("speed mode") : n == "PaleMoon" && (e = /\bFirefox\/([\d.]+)\b/.exec(t)) ? d.push("identifying as Firefox " + e[1]) : n == "Firefox" && (e = /\b(Mobile|Tablet|TV)\b/i.exec(t)) ? (a || (a = "Firefox OS"), f || (f = e[1])) : !n || (e = !/\bMinefield\b/i.test(t) && /\b(?:Firefox|Safari)\b/.exec(n)) ? (n && !f && /[\/,]|^[^(]+?\)/.test(t.slice(t.indexOf(e + "/") + 8)) && (n = null), (e = f || x || a) && (f || x || /\b(?:Android|Symbian OS|Tablet OS|webOS)\b/.test(a)) && (n = /[a-z]+(?: Hat)?/i.exec(/\bAndroid\b/.test(a) ? a : e) + " Browser")) : n == "Electron" && (e = (/\bChrome\/([\d.]+)\b/.exec(t) || 0)[1]) && d.push("Chromium " + e), s || (s = re([
          "(?:Cloud9|CriOS|CrMo|Edge|Edg|EdgA|EdgiOS|FxiOS|HeadlessChrome|IEMobile|Iron|Opera ?Mini|OPiOS|OPR|Raven|SamsungBrowser|Silk(?!/[\\d.]+$)|UCBrowser|YaBrowser)",
          "Version",
          k(n),
          "(?:Firefox|Minefield|NetFront)"
        ])), (e = b == "iCab" && parseFloat(s) > 3 && "WebKit" || /\bOpera\b/.test(n) && (/\bOPR\b/.test(t) ? "Blink" : "Presto") || /\b(?:Midori|Nook|Safari)\b/i.test(t) && !/^(?:Trident|EdgeHTML)$/.test(b) && "WebKit" || !b && /\bMSIE\b/i.test(t) && (a == "Mac OS" ? "Tasman" : "Trident") || b == "WebKit" && /\bPlayStation\b(?! Vita\b)/i.test(n) && "NetFront") && (b = [e]), n == "IE" && (e = (/; *(?:XBLWP|ZuneWP)(\d+)/i.exec(t) || 0)[1]) ? (n += " Mobile", a = "Windows Phone " + (/\+$/.test(e) ? e : e + ".x"), d.unshift("desktop mode")) : /\bWPDesktop\b/i.test(t) ? (n = "IE Mobile", a = "Windows Phone 8.x", d.unshift("desktop mode"), s || (s = (/\brv:([\d.]+)/.exec(t) || 0)[1])) : n != "IE" && b == "Trident" && (e = /\brv:([\d.]+)/.exec(t)) && (n && d.push("identifying as " + n + (s ? " " + s : "")), n = "IE", s = e[1]), B) {
          if (ce(h, "global"))
            if (I && (e = I.lang.System, D = e.getProperty("os.arch"), a = a || e.getProperty("os.name") + " " + e.getProperty("os.version")), ue) {
              try {
                s = h.require("ringo/engine").version.join("."), n = "RingoJS";
              } catch {
                (e = h.system) && e.global.system == h.system && (n = "Narwhal", a || (a = e[0].os || null));
              }
              n || (n = "Rhino");
            } else typeof h.process == "object" && !h.process.browser && (e = h.process) && (typeof e.versions == "object" && (typeof e.versions.electron == "string" ? (d.push("Node " + e.versions.node), n = "Electron", s = e.versions.electron) : typeof e.versions.nw == "string" && (d.push("Chromium " + s, "Node " + e.versions.node), n = "NW.js", s = e.versions.nw)), n || (n = "Node.js", D = e.arch, a = e.platform, s = /[\d.]+/.exec(e.version), s = s ? s[0] : null));
          else j(e = h.runtime) == he ? (n = "Adobe AIR", a = e.flash.system.Capabilities.os) : j(e = h.phantom) == pe ? (n = "PhantomJS", s = (e = e.version || null) && e.major + "." + e.minor + "." + e.patch) : typeof J.documentMode == "number" && (e = /\bTrident\/(\d+)/i.exec(t)) ? (s = [s, J.documentMode], (e = +e[1] + 4) != s[1] && (d.push("IE " + s[1] + " mode"), b && (b[1] = ""), s[1] = e), s = n == "IE" ? String(s[1].toFixed(1)) : s[0]) : typeof J.documentMode == "number" && /^(?:Chrome|Firefox)\b/.test(n) && (d.push("masking as " + n + " " + s), n = "IE", s = "11.0", b = ["Trident"], a = "Windows");
          a = a && R(a);
        }
        if (s && (e = /(?:[ab]|dp|pre|[ab]\d+pre)(?:\d+\+?)?$/i.exec(s) || /(?:alpha|beta)(?: ?\d)?/i.exec(t + ";" + (B && y.appMinorVersion)) || /\bMinefield\b/i.test(t) && "a") && (U = /b/i.test(e) ? "beta" : "alpha", s = s.replace(RegExp(e + "\\+?$"), "") + (U == "beta" ? me : ge) + (/\d+\+?/.exec(e) || "")), n == "Fennec" || n == "Firefox" && /\b(?:Android|Firefox OS|KaiOS)\b/.test(a))
          n = "Firefox Mobile";
        else if (n == "Maxthon" && s)
          s = s.replace(/\.[\d.]+/, ".x");
        else if (/\bXbox\b/i.test(f))
          f == "Xbox 360" && (a = null), f == "Xbox 360" && /\bIEMobile\b/.test(t) && d.unshift("mobile mode");
        else if ((/^(?:Chrome|IE|Opera)$/.test(n) || n && !f && !/Browser|Mobi/.test(n)) && (a == "Windows CE" || /Mobi/i.test(t)))
          n += " Mobile";
        else if (n == "IE" && B)
          try {
            h.external === null && d.unshift("platform preview");
          } catch {
            d.unshift("embedded");
          }
        else (/\bBlackBerry\b/.test(f) || /\bBB10\b/.test(t)) && (e = (RegExp(f.replace(/ +/g, " *") + "/([.\\d]+)", "i").exec(t) || 0)[1] || s) ? (e = [e, /BB10/.test(t)], a = (e[1] ? (f = null, x = "BlackBerry") : "Device Software") + " " + e[0], s = null) : this != G && f != "Wii" && (B && $ || /Opera/.test(n) && /\b(?:MSIE|Firefox)\b/i.test(t) || n == "Firefox" && /\bOS X (?:\d+\.){2,}/.test(a) || n == "IE" && (a && !/^Win/.test(a) && s > 5.5 || /\bWindows XP\b/.test(a) && s > 8 || s == 8 && !/\bTrident\b/.test(t))) && !w.test(e = T.call(G, t.replace(w, "") + ";")) && e.name && (e = "ing as " + e.name + ((e = e.version) ? " " + e : ""), w.test(n) ? (/\bIE\b/.test(e) && a == "Mac OS" && (a = null), e = "identify" + e) : (e = "mask" + e, K ? n = R(K.replace(/([a-z])([A-Z])/g, "$1 $2")) : n = "Opera", /\bIE\b/.test(e) && (a = null), B || (s = null)), b = ["Presto"], d.push(e));
        (e = (/\bAppleWebKit\/([\d.]+\+?)/i.exec(t) || 0)[1]) && (e = [parseFloat(e.replace(/\.(\d)$/, ".0$1")), e], n == "Safari" && e[1].slice(-1) == "+" ? (n = "WebKit Nightly", U = "alpha", s = e[1].slice(0, -1)) : (s == e[1] || s == (e[2] = (/\bSafari\/([\d.]+\+?)/i.exec(t) || 0)[1])) && (s = null), e[1] = (/\b(?:Headless)?Chrome\/([\d.]+)/i.exec(t) || 0)[1], e[0] == 537.36 && e[2] == 537.36 && parseFloat(e[1]) >= 28 && b == "WebKit" && (b = ["Blink"]), !B || !fe && !e[1] ? (b && (b[1] = "like Safari"), e = (e = e[0], e < 400 ? 1 : e < 500 ? 2 : e < 526 ? 3 : e < 533 ? 4 : e < 534 ? "4+" : e < 535 ? 5 : e < 537 ? 6 : e < 538 ? 7 : e < 601 ? 8 : e < 602 ? 9 : e < 604 ? 10 : e < 606 ? 11 : e < 608 ? 12 : "12")) : (b && (b[1] = "like Chrome"), e = e[1] || (e = e[0], e < 530 ? 1 : e < 532 ? 2 : e < 532.05 ? 3 : e < 533 ? 4 : e < 534.03 ? 5 : e < 534.07 ? 6 : e < 534.1 ? 7 : e < 534.13 ? 8 : e < 534.16 ? 9 : e < 534.24 ? 10 : e < 534.3 ? 11 : e < 535.01 ? 12 : e < 535.02 ? "13+" : e < 535.07 ? 15 : e < 535.11 ? 16 : e < 535.19 ? 17 : e < 536.05 ? 18 : e < 536.1 ? 19 : e < 537.01 ? 20 : e < 537.11 ? "21+" : e < 537.13 ? 23 : e < 537.18 ? 24 : e < 537.24 ? 25 : e < 537.36 ? 26 : b != "Blink" ? "27" : "28")), b && (b[1] += " " + (e += typeof e == "number" ? ".x" : /[.+]/.test(e) ? "" : "+")), n == "Safari" && (!s || parseInt(s) > 45) ? s = e : n == "Chrome" && /\bHeadlessChrome/i.test(t) && d.unshift("headless")), n == "Opera" && (e = /\bzbov|zvav$/.exec(a)) ? (n += " ", d.unshift("desktop mode"), e == "zvav" ? (n += "Mini", s = null) : n += "Mobile", a = a.replace(RegExp(" *" + e + "$"), "")) : n == "Safari" && /\bChrome\b/.exec(b && b[1]) ? (d.unshift("desktop mode"), n = "Chrome Mobile", s = null, /\bOS X\b/.test(a) ? (x = "Apple", a = "iOS 4.3+") : a = null) : /\bSRWare Iron\b/.test(n) && !s && (s = re("Chrome")), s && s.indexOf(e = /[\d.]+$/.exec(a)) == 0 && t.indexOf("/" + e + "-") > -1 && (a = q(a.replace(e, ""))), a && a.indexOf(n) != -1 && !RegExp(n + " OS").test(a) && (a = a.replace(RegExp(" *" + k(n) + " *"), "")), b && !/\b(?:Avant|Nook)\b/.test(n) && (/Browser|Lunascape|Maxthon/.test(n) || n != "Safari" && /^iOS/.test(a) && /\bSafari\b/.test(b[1]) || /^(?:Adobe|Arora|Breach|Midori|Opera|Phantom|Rekonq|Rock|Samsung Internet|Sleipnir|SRWare Iron|Vivaldi|Web)/.test(n) && b[1]) && (e = b[b.length - 1]) && d.push(e), d.length && (d = ["(" + d.join("; ") + ")"]), x && f && f.indexOf(x) < 0 && d.push("on " + x), f && d.push((/^on /.test(d[d.length - 1]) ? "" : "on ") + f), a && (e = / ([\d.+]+)$/.exec(a), H = e && a.charAt(a.length - e[0].length - 1) == "/", a = {
          architecture: 32,
          family: e && !H ? a.replace(e[0], "") : a,
          version: e ? e[1] : null,
          toString: function() {
            var O = this.version;
            return this.family + (O && !H ? " " + O : "") + (this.architecture == 64 ? " 64-bit" : "");
          }
        }), (e = /\b(?:AMD|IA|Win|WOW|x86_|x)64\b/i.exec(D)) && !/\bi686\b/i.test(D) ? (a && (a.architecture = 64, a.family = a.family.replace(RegExp(" *" + e), "")), n && (/\bWOW64\b/i.test(t) || B && /\w(?:86|32)$/.test(y.cpuClass || y.platform) && !/\bWin64; x64\b/i.test(t)) && d.unshift("32-bit")) : a && /^OS X/.test(a.family) && n == "Chrome" && parseFloat(s) >= 39 && (a.architecture = 64), t || (t = null);
        var P = {};
        return P.description = t, P.layout = b && b[0], P.manufacturer = x, P.name = n, P.prerelease = U, P.product = f, P.ua = t, P.version = n && s, P.os = a || {
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
        }, P.parse = T, P.toString = ye, P.version && d.unshift(s), P.name && d.unshift(n), a && n && !(a == String(a).split(" ")[0] && (a == n.split(" ")[0] || f)) && d.push(f ? "(" + a + ")" : "on " + a), d.length && (P.description = d.join(" ")), P;
      }
      var te = T();
      l && u ? G(te, function(t, h) {
        l[h] = t;
      }) : c.platform = te;
    }).call(Oe);
  }(N, N.exports)), N.exports;
}
var _ = Pe();
function Q(r) {
  return parseInt(String(r), 10);
}
function je(r) {
  const i = parseInt(String(r), 10);
  return i < 0 ? -i : i;
}
"toInt" in String.prototype || (String.prototype.toInt = function() {
  return Q(this);
});
"toUint" in String.prototype || (String.prototype.toUint = function() {
  const r = Q(this);
  return r < 0 ? -r : r;
});
const Me = /^[^\/\.]+$|[^\/]+(?=\.)/;
function Fe(r) {
  return (r.match(Me) ?? [""])[0];
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
var se = /* @__PURE__ */ ((r) => (r.DEFAULT = "", r.SP_GSM = "png|jpg|jpeg|json|svg|webp|mp4|webm", r.SCRIPT = "sn|ssn", r.FONT = "woff2|woff|otf|ttf", r.SOUND = "mp3|m4a|ogg|aac|flac|wav", r.HTML = "htm|html", r.CSS = "css", r.SN = "sn", r.TST_PNGPNG_ = "png|png_", r.TST_HH = "hh", r.TST_EEE = "eee", r.TST_GGG = "ggg", r.TST_PNGXML = "png|xml", r))(se || {});
class Ce {
  constructor(i) {
    this.sys = i;
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
  async load(i) {
    this.oCfg.save_ns = i?.save_ns ?? this.oCfg.save_ns, this.oCfg.window.width = Number(i?.window?.width ?? this.oCfg.window.width), this.oCfg.window.height = Number(i?.window?.height ?? this.oCfg.window.height), this.oCfg.book = { ...this.oCfg.book, ...i.book }, this.oCfg.log.max_len = i.log?.max_len?.max_len ?? this.oCfg.log.max_len, this.oCfg.init = { ...this.oCfg.init, ...i.init }, this.oCfg.debug = { ...this.oCfg.debug, ...i.debug }, this.oCfg.debuger_token = i.debuger_token;
    const o = this.sys.arg.cur + "path.json", c = await fetch(o);
    if (!c.ok) throw Error(c.statusText);
    const l = await c.text(), u = JSON.parse(await this.sys.dec(o, l));
    for (const [g, M] of Object.entries(u)) {
      const w = this.hPathFn2Exts[g] = M;
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
      for (const [g, M] of Object.entries(this.hPathFn2Exts))
        for (const [w, v] of Object.entries(M)) {
          if (!w.startsWith(":") || !w.endsWith(":id")) continue;
          const C = v.slice(v.lastIndexOf("/") + 1), W = M[w.slice(0, -10)] ?? "", V = await (await fetch(W)).text(), A = this.sys.hash(V);
          if (C !== A) throw `ファイル改竄エラーです fn:${W}`;
        }
    else
      for (const [g, M] of Object.entries(this.hPathFn2Exts))
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
  searchPath(i, o = "") {
    if (!i) throw "[searchPath] fnが空です";
    if (i.startsWith("http://")) return i;
    const c = i.match(this.#i);
    let l = c ? c[1] : i;
    const u = c ? c[2] : "";
    if (this.userFnTail) {
      const w = l + "@@" + this.userFnTail;
      if (w in this.hPathFn2Exts) {
        if (o === "") l = w;
        else for (const v of Object.keys(this.hPathFn2Exts[w] ?? {}))
          if (`|${o}|`.includes(`|${v}|`)) {
            l = w;
            break;
          }
      }
    }
    const g = this.hPathFn2Exts[l];
    if (!g) throw `サーチパスに存在しないファイル【${i}】です`;
    if (!u) {
      const w = Q(g[":cnt"]);
      if (o === "") {
        if (w > 1) throw `指定ファイル【${i}】が複数マッチします。サーチ対象拡張子群【${o}】で絞り込むか、ファイル名を個別にして下さい。`;
        return i;
      }
      const v = `|${o}|`;
      if (w > 1) {
        let C = 0;
        for (const W of Object.keys(g))
          if (v.includes(`|${W}|`) && ++C > 1)
            throw `指定ファイル【${i}】が複数マッチします。サーチ対象拡張子群【${o}】で絞り込むか、ファイル名を個別にして下さい。`;
      }
      for (const C of Object.keys(g))
        if (v.includes(`|${C}|`)) return g[C];
      throw `サーチ対象拡張子群【${o}】にマッチするファイルがサーチパスに存在しません。探索ファイル名=【${i}】`;
    }
    if (o !== "" && !`|${o}|`.includes(`|${u}|`))
      throw `指定ファイルの拡張子【${u}】は、サーチ対象拡張子群【${o}】にマッチしません。探索ファイル名=【${i}】`;
    const M = g[u];
    if (!M) throw `サーチパスに存在しない拡張子【${u}】です。探索ファイル名=【${i}】、サーチ対象拡張子群【${o}】`;
    return M;
  }
  matchPath(i, o = "") {
    const c = [], l = new RegExp(i), u = new RegExp(o);
    for (const [g, M] of Object.entries(this.hPathFn2Exts)) {
      if (g.search(l) === -1) continue;
      if (o === "") {
        c.push(M);
        continue;
      }
      const w = {};
      let v = !1;
      for (const C of Object.keys(M))
        C.search(u) !== -1 && (w[C] = g, v = !0);
      v && c.push(w);
    }
    return c;
  }
  addPath(i, o) {
    const c = {};
    for (const [l, u] of Object.entries(o))
      c[l] = (l.startsWith(":") ? "" : this.sys.arg.cur) + u;
    this.hPathFn2Exts[i] = c;
  }
}
class ee extends Ce {
  constructor(i) {
    super(i), this.sys = i;
  }
  static async generate(i) {
    const o = new ee(i), c = i.arg.cur + "prj.json", l = await fetch(c);
    if (!l.ok) throw Error(l.statusText);
    const u = await l.text(), g = JSON.parse(await i.dec(c, u));
    return await o.load(g), o;
  }
  async load(i) {
    await super.load(i), Y.stageW = this.oCfg.window.width, Y.stageH = this.oCfg.window.height, Y.debugLog = this.oCfg.debug.debugLog;
  }
  searchPath(i, o = se.DEFAULT) {
    return i.startsWith("downloads:/") ? this.sys.path_downloads + i.slice(11) : i.startsWith("userdata:/") ? this.sys.path_userdata + "storage/" + i.slice(10) : super.searchPath(i, o);
  }
}
class Ie {
  #e;
  init(i) {
    this.#e = i;
  }
  stt = "";
  onUpdate(i) {
    this.stt = i, this.#e();
  }
  // 適当な名を付けて
  get state() {
    return this.stt;
  }
  setState(i) {
    this.stt = i, this.replace();
  }
  // stt から 置換処理を
}
class Ee {
  #e = [];
  // Memento対象
  #t = {};
  #i = [];
  add(i) {
    i.init(() => this.backup()), this.#e.push(i);
  }
  #r = "";
  set key(i) {
    this.#r = i;
  }
  backup(i = this.#r) {
    this.#i.push(i), this.#t[i] = this.#e.map((o) => o.state), console.log(`fn:Memento.ts key:${i} STT:%o`, this.#t[i]);
  }
  undo(i) {
    const o = this.#t[i];
    if (!o) throw `undo Err key:${i}`;
    const c = this.#e.length;
    for (let l = 0; l < c; ++l)
      this.#e[l].onUpdate(o[l] ?? "");
  }
  beforeKey() {
  }
  // 前のキーへ移動
  afterKey() {
  }
  gotoKey() {
  }
  // scr + idx? で指定して移動
}
var le = /* @__PURE__ */ ((r) => (r.Renderer = "renderer", r.Application = "application", r.RendererSystem = "renderer-webgl-system", r.RendererPlugin = "renderer-webgl-plugin", r.CanvasRendererSystem = "renderer-canvas-system", r.CanvasRendererPlugin = "renderer-canvas-plugin", r.Asset = "asset", r.LoadParser = "load-parser", r.ResolveParser = "resolve-parser", r.CacheParser = "cache-parser", r.DetectionParser = "detection-parser", r))(le || {});
const Z = (r) => {
  if (typeof r == "function" || typeof r == "object" && r.extension) {
    if (!r.extension)
      throw new Error("Extension class must have an extension object");
    r = { ...typeof r.extension != "object" ? { type: r.extension } : r.extension, ref: r };
  }
  if (typeof r == "object")
    r = { ...r };
  else
    throw new Error("Invalid extension type");
  return typeof r.type == "string" && (r.type = [r.type]), r;
}, oe = (r, i) => Z(r).priority ?? i, ke = {
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
  remove(...r) {
    return r.map(Z).forEach((i) => {
      i.type.forEach((o) => this._removeHandlers[o]?.(i));
    }), this;
  },
  /**
   * Register new extensions with PixiJS.
   * @param extensions - The spread of extensions to add to PixiJS.
   * @returns {PIXI.extensions} For chaining.
   */
  add(...r) {
    return r.map(Z).forEach((i) => {
      i.type.forEach((o) => {
        const c = this._addHandlers, l = this._queue;
        c[o] ? c[o]?.(i) : (l[o] = l[o] || [], l[o]?.push(i));
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
  handle(r, i, o) {
    const c = this._addHandlers, l = this._removeHandlers;
    if (c[r] || l[r])
      throw new Error(`Extension type ${r} already has a handler`);
    c[r] = i, l[r] = o;
    const u = this._queue;
    return u[r] && (u[r]?.forEach((g) => i(g)), delete u[r]), this;
  },
  /**
   * Handle a type, but using a map by `name` property.
   * @param type - Type of extension to handle.
   * @param map - The object map of named extensions.
   * @returns {PIXI.extensions} For chaining.
   */
  handleByMap(r, i) {
    return this.handle(
      r,
      (o) => {
        o.name && (i[o.name] = o.ref);
      },
      (o) => {
        o.name && delete i[o.name];
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
  handleByList(r, i, o = -1) {
    return this.handle(
      r,
      (c) => {
        i.includes(c.ref) || (i.push(c.ref), i.sort((l, u) => oe(u, o) - oe(l, o)));
      },
      (c) => {
        const l = i.indexOf(c.ref);
        l !== -1 && i.splice(l, 1);
      }
    );
  }
};
window.__REACT_DEVTOOLS_GLOBAL_HOOK__ = { isDisabled: !0 };
class $e {
  constructor(i = {}, o) {
    this.hPlg = i, this.arg = o;
  }
  #e = new Ee();
  get caretaker() {
    return this.#e;
  }
  async init() {
    this.cfg = await ee.generate(this), document.head.insertAdjacentHTML(
      "beforeend",
      `<style type="text/css">
	body {
		background-color: ${this.cfg.oCfg.init.bg_color};
	}
	:-webkit-full-screen canvas#skynovel {width: 100%; height: 100%; object-fit: contain;}
	:-moz-full-screen canvas#skynovel {width: 100%; height: 100%; object-fit: contain;}
	:full-screen canvas#skynovel {width: 100%; height: 100%; object-fit: contain;}
</style>`
    );
    const i = "skynovel", o = document.getElementById(i);
    if (o) {
      const l = o.cloneNode(!0);
      l.id = i;
    } else document.body.insertAdjacentHTML("afterbegin", `<div id="${i}"></div>`);
    const { opening: c } = await import("./Stage.js").then((l) => l.S);
    await c(document.getElementById(i), this), await Promise.all([
      import("./index.js"),
      import("./ScriptMng.js")
    ]).then(async ([{ Assets: l }, { ScriptMng: u }]) => {
      await l.init({ basePath: location.origin }), ke.add(this.#i), this.#t = new u(this, l), await this.#t.load("main");
    });
  }
  #t;
  cfg;
  #i = {
    extension: {
      type: le.LoadParser,
      name: "sn-loader"
      //priority: LoaderParserPriority.High,
    },
    test: (i) => i.endsWith(".sn"),
    load: (i) => new Promise(async (o, c) => {
      const l = await fetch(i);
      if (!l.ok) {
        c("sn-loader fetch err:" + l.statusText);
        return;
      }
      try {
        o(await this.dec("sn", await l.text()));
      } catch (u) {
        c(`sn-loader err url:${i} ${u}`);
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
  dec = (i, o) => Promise.resolve(o);
  hash = (i) => "";
}
class _e extends $e {
  constructor(i = {}, o = { cur: "prj/", crypto: !1, dip: "" }) {
    super(i, o), super.init();
  }
}
export {
  Ie as B,
  Y as C,
  le as E,
  se as S,
  We as a,
  Fe as b,
  ne as c,
  _e as d,
  ke as e,
  Be as g,
  je as u
};
//# sourceMappingURL=web2.js.map
