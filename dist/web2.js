var re = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function Ce(s) {
  return s && s.__esModule && Object.prototype.hasOwnProperty.call(s, "default") ? s.default : s;
}
function ke(s) {
  if (s.__esModule) return s;
  var r = s.default;
  if (typeof r == "function") {
    var a = function h() {
      return this instanceof h ? Reflect.construct(r, arguments, this.constructor) : r.apply(this, arguments);
    };
    a.prototype = r.prototype;
  } else a = {};
  return Object.defineProperty(a, "__esModule", { value: !0 }), Object.keys(s).forEach(function(h) {
    var d = Object.getOwnPropertyDescriptor(s, h);
    Object.defineProperty(a, h, d.get ? d : {
      enumerable: !0,
      get: function() {
        return s[h];
      }
    });
  }), a;
}
var N = { exports: {} };
/*!
 * Platform.js v1.3.6
 * Copyright 2014-2020 Benjamin Tan
 * Copyright 2011-2013 John-David Dalton
 * Available under MIT license
 */
var we = N.exports, ne;
function ve() {
  return ne || (ne = 1, function(s, r) {
    (function() {
      var a = {
        function: !0,
        object: !0
      }, h = a[typeof window] && window || this, d = r, w = s && !s.nodeType && s, g = d && w && typeof re == "object" && re;
      g && (g.global === g || g.window === g || g.self === g) && (h = g);
      var P = Math.pow(2, 53) - 1, m = /\bOpera/, v = Object.prototype, C = v.hasOwnProperty, W = v.toString;
      function V(t) {
        return t = String(t), t.charAt(0).toUpperCase() + t.slice(1);
      }
      function z(t, c, u) {
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
        return c && u && /^Win/i.test(t) && !/^Windows Phone /i.test(t) && (y = y[/[\d.]+$/.exec(t)]) && (t = "Windows " + y), t = String(t), c && u && (t = t.replace(RegExp(c, "i"), u)), t = _(
          t.replace(/ ce$/i, " CE").replace(/\bhpw/i, "web").replace(/\bMacintosh\b/, "Mac OS").replace(/_PowerPC\b/i, " OS").replace(/\b(OS X) [^ \d]+/i, "$1").replace(/\bMac (OS X)\b/, "$1").replace(/\/(\d)/, " $1").replace(/_/g, ".").replace(/(?: BePC|[ .]*fc[ \d.]+)$/i, "").replace(/\bx86\.64\b/gi, "x86_64").replace(/\b(Windows Phone) OS\b/, "$1").replace(/\b(Chrome OS \w+) [\d.]+\b/, "$1").split(" on ")[0]
        ), t;
      }
      function A(t, c) {
        var u = -1, y = t ? t.length : 0;
        if (typeof y == "number" && y > -1 && y <= P)
          for (; ++u < y; )
            c(t[u], u, t);
        else
          G(t, c);
      }
      function _(t) {
        return t = X(t), /^(?:webOS|i(?:OS|P))/.test(t) ? t : V(t);
      }
      function G(t, c) {
        for (var u in t)
          C.call(t, u) && c(t[u], u, t);
      }
      function F(t) {
        return t == null ? V(t) : W.call(t).slice(8, -1);
      }
      function se(t, c) {
        var u = t != null ? typeof t[c] : "number";
        return !/^(?:boolean|number|string|undefined)$/.test(u) && (u == "object" ? !!t[c] : !0);
      }
      function E(t) {
        return String(t).replace(/([ -])(?!$)/g, "$1?");
      }
      function j(t, c) {
        var u = null;
        return A(t, function(y, K) {
          u = c(u, y, K, t);
        }), u;
      }
      function X(t) {
        return String(t).replace(/^ +| +$/g, "");
      }
      function L(t) {
        var c = h, u = t && typeof t == "object" && F(t) != "String";
        u && (c = t, t = null);
        var y = c.navigator || {}, K = y.userAgent || "";
        t || (t = K);
        var ae = u ? !!y.likeChrome : /\bChrome\b/.test(t) && !/internal|\n/i.test(W.toString()), J = "Object", le = u ? J : "ScriptBridgingProxyObject", ce = u ? J : "Environment", fe = u && c.java ? "JavaPackage" : F(c.java), he = u ? J : "RuntimeObject", I = /\bJava/.test(fe) && c.java, be = I && F(c.environment) == ce, pe = I ? "a" : "α", de = I ? "b" : "β", q = c.document || {}, $ = c.operamini || c.opera, R = m.test(R = u && $ ? $["[[Class]]"] : F($)) ? R : $ = null, e, D = t, f = [], U = null, B = t == K, o = B && $ && typeof $.version == "function" && $.version(), Y, b = ue([
          { label: "EdgeHTML", pattern: "Edge" },
          "Trident",
          { label: "WebKit", pattern: "AppleWebKit" },
          "iCab",
          "Presto",
          "NetFront",
          "Tasman",
          "KHTML",
          "Gecko"
        ]), i = me([
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
        ]), l = te([
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
        ]), S = ge({
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
        }), n = xe([
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
        function ue(O) {
          return j(O, function(x, p) {
            return x || RegExp("\\b" + (p.pattern || E(p)) + "\\b", "i").exec(t) && (p.label || p);
          });
        }
        function ge(O) {
          return j(O, function(x, p, k) {
            return x || (p[l] || p[/^[a-z]+(?: +[a-z]+\b)*/i.exec(l)] || RegExp("\\b" + E(k) + "(?:\\b|\\w*\\d)", "i").exec(t)) && k;
          });
        }
        function me(O) {
          return j(O, function(x, p) {
            return x || RegExp("\\b" + (p.pattern || E(p)) + "\\b", "i").exec(t) && (p.label || p);
          });
        }
        function xe(O) {
          return j(O, function(x, p) {
            var k = p.pattern || E(p);
            return !x && (x = RegExp("\\b" + k + "(?:/[\\d.]+|[ \\w.]*)", "i").exec(t)) && (x = z(x, k, p.label || p)), x;
          });
        }
        function te(O) {
          return j(O, function(x, p) {
            var k = p.pattern || E(p);
            return !x && (x = RegExp("\\b" + k + " *\\d+[.\\w_]*", "i").exec(t) || RegExp("\\b" + k + " *\\w+-[\\w]*", "i").exec(t) || RegExp("\\b" + k + "(?:; *(?:[a-z]+[_-])?[a-z]+\\d+|[^ ();-]*)", "i").exec(t)) && ((x = String(p.label && !RegExp(k, "i").test(p.label) ? p.label : x).split("/"))[1] && !/[\d.]+/.test(x[0]) && (x[0] += " " + x[1]), p = p.label || p, x = _(x[0].replace(RegExp(k, "i"), p).replace(RegExp("; *(?:" + p + "[_-])?", "i"), " ").replace(RegExp("(" + p + ")[-_.]?(\\w)", "i"), "$1 $2"))), x;
          });
        }
        function ie(O) {
          return j(O, function(x, p) {
            return x || (RegExp(p + "(?:-[\\d.]+/|(?: for [\\w-]+)?[ /-])([\\d.]+[^ ();/_-]*)", "i").exec(t) || 0)[1] || null;
          });
        }
        function Se() {
          return this.description || "";
        }
        if (b && (b = [b]), /\bAndroid\b/.test(n) && !l && (e = /\bAndroid[^;]*;(.*?)(?:Build|\) AppleWebKit)\b/i.exec(t)) && (l = X(e[1]).replace(/^[a-z]{2}-[a-z]{2};\s*/i, "") || null), S && !l ? l = te([S]) : S && l && (l = l.replace(RegExp("^(" + E(S) + ")[-_.\\s]", "i"), S + " ").replace(RegExp("^(" + E(S) + ")[-_.]?(\\w)", "i"), S + " $2")), (e = /\bGoogle TV\b/.exec(l)) && (l = e[0]), /\bSimulator\b/i.test(t) && (l = (l ? l + " " : "") + "Simulator"), i == "Opera Mini" && /\bOPiOS\b/.test(t) && f.push("running in Turbo/Uncompressed mode"), i == "IE" && /\blike iPhone OS\b/.test(t) ? (e = L(t.replace(/like iPhone OS/, "")), S = e.manufacturer, l = e.product) : /^iP/.test(l) ? (i || (i = "Safari"), n = "iOS" + ((e = / OS ([\d_]+)/i.exec(t)) ? " " + e[1].replace(/_/g, ".") : "")) : i == "Konqueror" && /^Linux\b/i.test(n) ? n = "Kubuntu" : S && S != "Google" && (/Chrome/.test(i) && !/\bMobile Safari\b/i.test(t) || /\bVita\b/.test(l)) || /\bAndroid\b/.test(n) && /^Chrome/.test(i) && /\bVersion\//i.test(t) ? (i = "Android Browser", n = /\bAndroid\b/.test(n) ? n : "Android") : i == "Silk" ? (/\bMobi/i.test(t) || (n = "Android", f.unshift("desktop mode")), /Accelerated *= *true/i.test(t) && f.unshift("accelerated")) : i == "UC Browser" && /\bUCWEB\b/.test(t) ? f.push("speed mode") : i == "PaleMoon" && (e = /\bFirefox\/([\d.]+)\b/.exec(t)) ? f.push("identifying as Firefox " + e[1]) : i == "Firefox" && (e = /\b(Mobile|Tablet|TV)\b/i.exec(t)) ? (n || (n = "Firefox OS"), l || (l = e[1])) : !i || (e = !/\bMinefield\b/i.test(t) && /\b(?:Firefox|Safari)\b/.exec(i)) ? (i && !l && /[\/,]|^[^(]+?\)/.test(t.slice(t.indexOf(e + "/") + 8)) && (i = null), (e = l || S || n) && (l || S || /\b(?:Android|Symbian OS|Tablet OS|webOS)\b/.test(n)) && (i = /[a-z]+(?: Hat)?/i.exec(/\bAndroid\b/.test(n) ? n : e) + " Browser")) : i == "Electron" && (e = (/\bChrome\/([\d.]+)\b/.exec(t) || 0)[1]) && f.push("Chromium " + e), o || (o = ie([
          "(?:Cloud9|CriOS|CrMo|Edge|Edg|EdgA|EdgiOS|FxiOS|HeadlessChrome|IEMobile|Iron|Opera ?Mini|OPiOS|OPR|Raven|SamsungBrowser|Silk(?!/[\\d.]+$)|UCBrowser|YaBrowser)",
          "Version",
          E(i),
          "(?:Firefox|Minefield|NetFront)"
        ])), (e = b == "iCab" && parseFloat(o) > 3 && "WebKit" || /\bOpera\b/.test(i) && (/\bOPR\b/.test(t) ? "Blink" : "Presto") || /\b(?:Midori|Nook|Safari)\b/i.test(t) && !/^(?:Trident|EdgeHTML)$/.test(b) && "WebKit" || !b && /\bMSIE\b/i.test(t) && (n == "Mac OS" ? "Tasman" : "Trident") || b == "WebKit" && /\bPlayStation\b(?! Vita\b)/i.test(i) && "NetFront") && (b = [e]), i == "IE" && (e = (/; *(?:XBLWP|ZuneWP)(\d+)/i.exec(t) || 0)[1]) ? (i += " Mobile", n = "Windows Phone " + (/\+$/.test(e) ? e : e + ".x"), f.unshift("desktop mode")) : /\bWPDesktop\b/i.test(t) ? (i = "IE Mobile", n = "Windows Phone 8.x", f.unshift("desktop mode"), o || (o = (/\brv:([\d.]+)/.exec(t) || 0)[1])) : i != "IE" && b == "Trident" && (e = /\brv:([\d.]+)/.exec(t)) && (i && f.push("identifying as " + i + (o ? " " + o : "")), i = "IE", o = e[1]), B) {
          if (se(c, "global"))
            if (I && (e = I.lang.System, D = e.getProperty("os.arch"), n = n || e.getProperty("os.name") + " " + e.getProperty("os.version")), be) {
              try {
                o = c.require("ringo/engine").version.join("."), i = "RingoJS";
              } catch {
                (e = c.system) && e.global.system == c.system && (i = "Narwhal", n || (n = e[0].os || null));
              }
              i || (i = "Rhino");
            } else typeof c.process == "object" && !c.process.browser && (e = c.process) && (typeof e.versions == "object" && (typeof e.versions.electron == "string" ? (f.push("Node " + e.versions.node), i = "Electron", o = e.versions.electron) : typeof e.versions.nw == "string" && (f.push("Chromium " + o, "Node " + e.versions.node), i = "NW.js", o = e.versions.nw)), i || (i = "Node.js", D = e.arch, n = e.platform, o = /[\d.]+/.exec(e.version), o = o ? o[0] : null));
          else F(e = c.runtime) == le ? (i = "Adobe AIR", n = e.flash.system.Capabilities.os) : F(e = c.phantom) == he ? (i = "PhantomJS", o = (e = e.version || null) && e.major + "." + e.minor + "." + e.patch) : typeof q.documentMode == "number" && (e = /\bTrident\/(\d+)/i.exec(t)) ? (o = [o, q.documentMode], (e = +e[1] + 4) != o[1] && (f.push("IE " + o[1] + " mode"), b && (b[1] = ""), o[1] = e), o = i == "IE" ? String(o[1].toFixed(1)) : o[0]) : typeof q.documentMode == "number" && /^(?:Chrome|Firefox)\b/.test(i) && (f.push("masking as " + i + " " + o), i = "IE", o = "11.0", b = ["Trident"], n = "Windows");
          n = n && _(n);
        }
        if (o && (e = /(?:[ab]|dp|pre|[ab]\d+pre)(?:\d+\+?)?$/i.exec(o) || /(?:alpha|beta)(?: ?\d)?/i.exec(t + ";" + (B && y.appMinorVersion)) || /\bMinefield\b/i.test(t) && "a") && (U = /b/i.test(e) ? "beta" : "alpha", o = o.replace(RegExp(e + "\\+?$"), "") + (U == "beta" ? de : pe) + (/\d+\+?/.exec(e) || "")), i == "Fennec" || i == "Firefox" && /\b(?:Android|Firefox OS|KaiOS)\b/.test(n))
          i = "Firefox Mobile";
        else if (i == "Maxthon" && o)
          o = o.replace(/\.[\d.]+/, ".x");
        else if (/\bXbox\b/i.test(l))
          l == "Xbox 360" && (n = null), l == "Xbox 360" && /\bIEMobile\b/.test(t) && f.unshift("mobile mode");
        else if ((/^(?:Chrome|IE|Opera)$/.test(i) || i && !l && !/Browser|Mobi/.test(i)) && (n == "Windows CE" || /Mobi/i.test(t)))
          i += " Mobile";
        else if (i == "IE" && B)
          try {
            c.external === null && f.unshift("platform preview");
          } catch {
            f.unshift("embedded");
          }
        else (/\bBlackBerry\b/.test(l) || /\bBB10\b/.test(t)) && (e = (RegExp(l.replace(/ +/g, " *") + "/([.\\d]+)", "i").exec(t) || 0)[1] || o) ? (e = [e, /BB10/.test(t)], n = (e[1] ? (l = null, S = "BlackBerry") : "Device Software") + " " + e[0], o = null) : this != G && l != "Wii" && (B && $ || /Opera/.test(i) && /\b(?:MSIE|Firefox)\b/i.test(t) || i == "Firefox" && /\bOS X (?:\d+\.){2,}/.test(n) || i == "IE" && (n && !/^Win/.test(n) && o > 5.5 || /\bWindows XP\b/.test(n) && o > 8 || o == 8 && !/\bTrident\b/.test(t))) && !m.test(e = L.call(G, t.replace(m, "") + ";")) && e.name && (e = "ing as " + e.name + ((e = e.version) ? " " + e : ""), m.test(i) ? (/\bIE\b/.test(e) && n == "Mac OS" && (n = null), e = "identify" + e) : (e = "mask" + e, R ? i = _(R.replace(/([a-z])([A-Z])/g, "$1 $2")) : i = "Opera", /\bIE\b/.test(e) && (n = null), B || (o = null)), b = ["Presto"], f.push(e));
        (e = (/\bAppleWebKit\/([\d.]+\+?)/i.exec(t) || 0)[1]) && (e = [parseFloat(e.replace(/\.(\d)$/, ".0$1")), e], i == "Safari" && e[1].slice(-1) == "+" ? (i = "WebKit Nightly", U = "alpha", o = e[1].slice(0, -1)) : (o == e[1] || o == (e[2] = (/\bSafari\/([\d.]+\+?)/i.exec(t) || 0)[1])) && (o = null), e[1] = (/\b(?:Headless)?Chrome\/([\d.]+)/i.exec(t) || 0)[1], e[0] == 537.36 && e[2] == 537.36 && parseFloat(e[1]) >= 28 && b == "WebKit" && (b = ["Blink"]), !B || !ae && !e[1] ? (b && (b[1] = "like Safari"), e = (e = e[0], e < 400 ? 1 : e < 500 ? 2 : e < 526 ? 3 : e < 533 ? 4 : e < 534 ? "4+" : e < 535 ? 5 : e < 537 ? 6 : e < 538 ? 7 : e < 601 ? 8 : e < 602 ? 9 : e < 604 ? 10 : e < 606 ? 11 : e < 608 ? 12 : "12")) : (b && (b[1] = "like Chrome"), e = e[1] || (e = e[0], e < 530 ? 1 : e < 532 ? 2 : e < 532.05 ? 3 : e < 533 ? 4 : e < 534.03 ? 5 : e < 534.07 ? 6 : e < 534.1 ? 7 : e < 534.13 ? 8 : e < 534.16 ? 9 : e < 534.24 ? 10 : e < 534.3 ? 11 : e < 535.01 ? 12 : e < 535.02 ? "13+" : e < 535.07 ? 15 : e < 535.11 ? 16 : e < 535.19 ? 17 : e < 536.05 ? 18 : e < 536.1 ? 19 : e < 537.01 ? 20 : e < 537.11 ? "21+" : e < 537.13 ? 23 : e < 537.18 ? 24 : e < 537.24 ? 25 : e < 537.36 ? 26 : b != "Blink" ? "27" : "28")), b && (b[1] += " " + (e += typeof e == "number" ? ".x" : /[.+]/.test(e) ? "" : "+")), i == "Safari" && (!o || parseInt(o) > 45) ? o = e : i == "Chrome" && /\bHeadlessChrome/i.test(t) && f.unshift("headless")), i == "Opera" && (e = /\bzbov|zvav$/.exec(n)) ? (i += " ", f.unshift("desktop mode"), e == "zvav" ? (i += "Mini", o = null) : i += "Mobile", n = n.replace(RegExp(" *" + e + "$"), "")) : i == "Safari" && /\bChrome\b/.exec(b && b[1]) ? (f.unshift("desktop mode"), i = "Chrome Mobile", o = null, /\bOS X\b/.test(n) ? (S = "Apple", n = "iOS 4.3+") : n = null) : /\bSRWare Iron\b/.test(i) && !o && (o = ie("Chrome")), o && o.indexOf(e = /[\d.]+$/.exec(n)) == 0 && t.indexOf("/" + e + "-") > -1 && (n = X(n.replace(e, ""))), n && n.indexOf(i) != -1 && !RegExp(i + " OS").test(n) && (n = n.replace(RegExp(" *" + E(i) + " *"), "")), b && !/\b(?:Avant|Nook)\b/.test(i) && (/Browser|Lunascape|Maxthon/.test(i) || i != "Safari" && /^iOS/.test(n) && /\bSafari\b/.test(b[1]) || /^(?:Adobe|Arora|Breach|Midori|Opera|Phantom|Rekonq|Rock|Samsung Internet|Sleipnir|SRWare Iron|Vivaldi|Web)/.test(i) && b[1]) && (e = b[b.length - 1]) && f.push(e), f.length && (f = ["(" + f.join("; ") + ")"]), S && l && l.indexOf(S) < 0 && f.push("on " + S), l && f.push((/^on /.test(f[f.length - 1]) ? "" : "on ") + l), n && (e = / ([\d.+]+)$/.exec(n), Y = e && n.charAt(n.length - e[0].length - 1) == "/", n = {
          architecture: 32,
          family: e && !Y ? n.replace(e[0], "") : n,
          version: e ? e[1] : null,
          toString: function() {
            var O = this.version;
            return this.family + (O && !Y ? " " + O : "") + (this.architecture == 64 ? " 64-bit" : "");
          }
        }), (e = /\b(?:AMD|IA|Win|WOW|x86_|x)64\b/i.exec(D)) && !/\bi686\b/i.test(D) ? (n && (n.architecture = 64, n.family = n.family.replace(RegExp(" *" + e), "")), i && (/\bWOW64\b/i.test(t) || B && /\w(?:86|32)$/.test(y.cpuClass || y.platform) && !/\bWin64; x64\b/i.test(t)) && f.unshift("32-bit")) : n && /^OS X/.test(n.family) && i == "Chrome" && parseFloat(o) >= 39 && (n.architecture = 64), t || (t = null);
        var M = {};
        return M.description = t, M.layout = b && b[0], M.manufacturer = S, M.name = i, M.prerelease = U, M.product = l, M.ua = t, M.version = i && o, M.os = n || {
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
        }, M.parse = L, M.toString = Se, M.version && f.unshift(o), M.name && f.unshift(i), n && i && !(n == String(n).split(" ")[0] && (n == i.split(" ")[0] || l)) && f.push(l ? "(" + n + ")" : "on " + n), f.length && (M.description = f.join(" ")), M;
      }
      var ee = L();
      d && w ? G(ee, function(t, c) {
        d[c] = t;
      }) : h.platform = ee;
    }).call(we);
  }(N, N.exports)), N.exports;
}
var T = ve();
function Z(s) {
  return parseInt(String(s), 10);
}
function Ee(s) {
  const r = parseInt(String(s), 10);
  return r < 0 ? -r : r;
}
"toInt" in String.prototype || (String.prototype.toInt = function() {
  return Z(this);
});
"toUint" in String.prototype || (String.prototype.toUint = function() {
  const s = Z(this);
  return s < 0 ? -s : s;
});
const ye = /^[^\/\.]+$|[^\/]+(?=\.)/;
function $e(s) {
  return (s.match(ye) ?? [""])[0];
}
class H {
  static stageW = 0;
  static stageH = 0;
  static debugLog = !1;
  static isSafari = T.name === "Safari";
  static isFirefox = T.name === "Firefox";
  static isMac = /OS X/.test(T.os?.family ?? "");
  static isWin = /Windows/.test(T.os?.family ?? "");
  static isMobile = !/(Windows|OS X)/.test(T.os?.family ?? "");
  static hDip = {};
  static isDbg = !1;
  static isPackaged = !1;
  static isDarkMode = !1;
  static cc4ColorName;
}
var oe = /* @__PURE__ */ ((s) => (s.DEFAULT = "", s.SP_GSM = "png|jpg|jpeg|json|svg|webp|mp4|webm", s.SCRIPT = "sn|ssn", s.FONT = "woff2|woff|otf|ttf", s.SOUND = "mp3|m4a|ogg|aac|flac|wav", s.HTML = "htm|html", s.CSS = "css", s.SN = "sn", s.TST_PNGPNG_ = "png|png_", s.TST_HH = "hh", s.TST_EEE = "eee", s.TST_GGG = "ggg", s.TST_PNGXML = "png|xml", s))(oe || {});
class Oe {
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
    const a = this.sys.arg.cur + "path.json", h = await fetch(a);
    if (!h.ok) throw Error(h.statusText);
    const d = await h.text(), w = JSON.parse(await this.sys.dec(a, d));
    for (const [g, P] of Object.entries(w)) {
      const m = this.hPathFn2Exts[g] = P;
      for (const [v, C] of Object.entries(m))
        v !== ":cnt" && (m[v] = this.sys.arg.cur + C);
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
      for (const [g, P] of Object.entries(this.hPathFn2Exts))
        for (const [m, v] of Object.entries(P)) {
          if (!m.startsWith(":") || !m.endsWith(":id")) continue;
          const C = v.slice(v.lastIndexOf("/") + 1), W = P[m.slice(0, -10)] ?? "", z = await (await fetch(W)).text(), A = this.sys.hash(z);
          if (C !== A) throw `ファイル改竄エラーです fn:${W}`;
        }
    else
      for (const [g, P] of Object.entries(this.hPathFn2Exts))
        for (const m of Object.keys(P))
          m.startsWith(":");
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
  #n = /([^\/\s]+)\.([^\d]\w+)/;
  // 4 match 498 step(~1ms)  https://regex101.com/r/tpVgmI/1
  searchPath(r, a = "") {
    if (!r) throw "[searchPath] fnが空です";
    if (r.startsWith("http://")) return r;
    const h = r.match(this.#n);
    let d = h ? h[1] : r;
    const w = h ? h[2] : "";
    if (this.userFnTail) {
      const m = d + "@@" + this.userFnTail;
      if (m in this.hPathFn2Exts) {
        if (a === "") d = m;
        else for (const v of Object.keys(this.hPathFn2Exts[m] ?? {}))
          if (`|${a}|`.includes(`|${v}|`)) {
            d = m;
            break;
          }
      }
    }
    const g = this.hPathFn2Exts[d];
    if (!g) throw `サーチパスに存在しないファイル【${r}】です`;
    if (!w) {
      const m = Z(g[":cnt"]);
      if (a === "") {
        if (m > 1) throw `指定ファイル【${r}】が複数マッチします。サーチ対象拡張子群【${a}】で絞り込むか、ファイル名を個別にして下さい。`;
        return r;
      }
      const v = `|${a}|`;
      if (m > 1) {
        let C = 0;
        for (const W of Object.keys(g))
          if (v.includes(`|${W}|`) && ++C > 1)
            throw `指定ファイル【${r}】が複数マッチします。サーチ対象拡張子群【${a}】で絞り込むか、ファイル名を個別にして下さい。`;
      }
      for (const C of Object.keys(g))
        if (v.includes(`|${C}|`)) return g[C];
      throw `サーチ対象拡張子群【${a}】にマッチするファイルがサーチパスに存在しません。探索ファイル名=【${r}】`;
    }
    if (a !== "" && !`|${a}|`.includes(`|${w}|`))
      throw `指定ファイルの拡張子【${w}】は、サーチ対象拡張子群【${a}】にマッチしません。探索ファイル名=【${r}】`;
    const P = g[w];
    if (!P) throw `サーチパスに存在しない拡張子【${w}】です。探索ファイル名=【${r}】、サーチ対象拡張子群【${a}】`;
    return P;
  }
  matchPath(r, a = "") {
    const h = [], d = new RegExp(r), w = new RegExp(a);
    for (const [g, P] of Object.entries(this.hPathFn2Exts)) {
      if (g.search(d) === -1) continue;
      if (a === "") {
        h.push(P);
        continue;
      }
      const m = {};
      let v = !1;
      for (const C of Object.keys(P))
        C.search(w) !== -1 && (m[C] = g, v = !0);
      v && h.push(m);
    }
    return h;
  }
  addPath(r, a) {
    const h = {};
    for (const [d, w] of Object.entries(a))
      h[d] = (d.startsWith(":") ? "" : this.sys.arg.cur) + w;
    this.hPathFn2Exts[r] = h;
  }
}
class Q extends Oe {
  constructor(r) {
    super(r), this.sys = r;
  }
  static async generate(r) {
    const a = new Q(r), h = r.arg.cur + "prj.json", d = await fetch(h);
    if (!d.ok) throw Error(d.statusText);
    const w = await d.text(), g = JSON.parse(await r.dec(h, w));
    return await a.load(g), a;
  }
  async load(r) {
    await super.load(r), H.stageW = this.oCfg.window.width, H.stageH = this.oCfg.window.height, H.debugLog = this.oCfg.debug.debugLog;
  }
  searchPath(r, a = oe.DEFAULT) {
    return r.startsWith("downloads:/") ? this.sys.path_downloads + r.slice(11) : r.startsWith("userdata:/") ? this.sys.path_userdata + "storage/" + r.slice(10) : super.searchPath(r, a);
  }
}
class Be {
  // 適当な名を付けて
  constructor(r = "") {
    this.stt = r;
  }
  // this.stt から
}
class Me {
  #e = [];
  // Memento対象
  add(r) {
    this.#e.push(r);
  }
  #t = "";
  set key(r) {
    this.#t = r, this.#i = this.#r.push(r) - 1;
  }
  #n = {};
  update() {
    if (this.#i < this.#r.length - 1) {
      console.log("fn:Memento.ts line:31 update -- SKIP");
      return;
    }
    const r = [];
    for (const a of this.#e) r.push(a());
    this.#n[this.#t] = r, console.log(`fn:Memento.ts line:30 update -- key(${this.#t}) STT:%o`, this.#n[this.#t]);
  }
  undo(r) {
    console.log(`fn:Memento.ts line:38 = undo key=(${r})`);
    const a = this.#n[r];
    if (!a) throw `undo Err key:${r}`;
    console.log("fn:Memento.ts line:41 = undo == do");
    for (const h of a)
      console.log(`fn:Memento.ts line:44 == nm:${h.nm}`), h.restore();
  }
  #r = [];
  #i = -1;
  // 前のキーへ移動
  beforeKey() {
    return this.#i <= 0 ? !1 : (console.log("fn:Memento.ts line:53 -- beforeKey --"), this.undo(this.#r[--this.#i]), !0);
  }
  // 後のキーへ移動
  afterKey() {
    return this.#r.length - 1 <= this.#i ? !1 : (console.log("fn:Memento.ts line:61 -- afterKey --"), this.undo(this.#r[++this.#i]), !0);
  }
  isLast() {
    return this.#r.length - 1 === this.#i;
  }
}
window.__REACT_DEVTOOLS_GLOBAL_HOOK__ = { isDisabled: !0 };
class Pe {
  constructor(r = {}, a) {
    this.hPlg = r, this.arg = a;
  }
  #e = new Me();
  get caretaker() {
    return this.#e;
  }
  async init() {
    this.cfg = await Q.generate(this), document.head.insertAdjacentHTML(
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
    const r = "skynovel", a = document.getElementById(r);
    if (a) {
      const d = a.cloneNode(!0);
      d.id = r;
    } else document.body.insertAdjacentHTML("afterbegin", `<div id="${r}"></div>`);
    const { opening: h } = await import("./Main.js").then((d) => d.M);
    await h({ heStage: document.getElementById(r), sys: this });
  }
  cfg;
  $path_downloads = "";
  get path_downloads() {
    return this.$path_downloads;
  }
  $path_userdata = "";
  get path_userdata() {
    return this.$path_userdata;
  }
  dec = (r, a) => Promise.resolve(a);
  hash = (r) => "";
}
class We extends Pe {
  constructor(r = {}, a = { cur: "prj/", crypto: !1, dip: "" }) {
    super(r, a), super.init();
  }
}
export {
  Be as B,
  H as C,
  oe as S,
  ke as a,
  $e as b,
  re as c,
  We as d,
  Ce as g,
  Ee as u
};
//# sourceMappingURL=web2.js.map
