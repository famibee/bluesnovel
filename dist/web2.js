var Z = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function ve(l) {
  return l && l.__esModule && Object.prototype.hasOwnProperty.call(l, "default") ? l.default : l;
}
var U = { exports: {} };
/*!
 * Platform.js v1.3.6
 * Copyright 2014-2020 Benjamin Tan
 * Copyright 2011-2013 John-David Dalton
 * Available under MIT license
 */
U.exports;
(function(l, o) {
  (function() {
    var f = {
      function: !0,
      object: !0
    }, x = f[typeof window] && window || this, m = o, w = l && !l.nodeType && l, d = m && w && typeof Z == "object" && Z;
    d && (d.global === d || d.window === d || d.self === d) && (x = d);
    var P = Math.pow(2, 53) - 1, u = /\bOpera/, v = Object.prototype, C = v.hasOwnProperty, B = v.toString;
    function V(t) {
      return t = String(t), t.charAt(0).toUpperCase() + t.slice(1);
    }
    function z(t, s, h) {
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
      return s && h && /^Win/i.test(t) && !/^Windows Phone /i.test(t) && (O = O[/[\d.]+$/.exec(t)]) && (t = "Windows " + O), t = String(t), s && h && (t = t.replace(RegExp(s, "i"), h)), t = N(
        t.replace(/ ce$/i, " CE").replace(/\bhpw/i, "web").replace(/\bMacintosh\b/, "Mac OS").replace(/_PowerPC\b/i, " OS").replace(/\b(OS X) [^ \d]+/i, "$1").replace(/\bMac (OS X)\b/, "$1").replace(/\/(\d)/, " $1").replace(/_/g, ".").replace(/(?: BePC|[ .]*fc[ \d.]+)$/i, "").replace(/\bx86\.64\b/gi, "x86_64").replace(/\b(Windows Phone) OS\b/, "$1").replace(/\b(Chrome OS \w+) [\d.]+\b/, "$1").split(" on ")[0]
      ), t;
    }
    function X(t, s) {
      var h = -1, O = t ? t.length : 0;
      if (typeof O == "number" && O > -1 && O <= P)
        for (; ++h < O; )
          s(t[h], h, t);
      else
        G(t, s);
    }
    function N(t) {
      return t = A(t), /^(?:webOS|i(?:OS|P))/.test(t) ? t : V(t);
    }
    function G(t, s) {
      for (var h in t)
        C.call(t, h) && s(t[h], h, t);
    }
    function F(t) {
      return t == null ? V(t) : B.call(t).slice(8, -1);
    }
    function oe(t, s) {
      var h = t != null ? typeof t[s] : "number";
      return !/^(?:boolean|number|string|undefined)$/.test(h) && (h == "object" ? !!t[s] : !0);
    }
    function k(t) {
      return String(t).replace(/([ -])(?!$)/g, "$1?");
    }
    function j(t, s) {
      var h = null;
      return X(t, function(O, _) {
        h = s(h, O, _, t);
      }), h;
    }
    function A(t) {
      return String(t).replace(/^ +| +$/g, "");
    }
    function L(t) {
      var s = x, h = t && typeof t == "object" && F(t) != "String";
      h && (s = t, t = null);
      var O = s.navigator || {}, _ = O.userAgent || "";
      t || (t = _);
      var ae = h ? !!O.likeChrome : /\bChrome\b/.test(t) && !/internal|\n/i.test(B.toString()), J = "Object", se = h ? J : "ScriptBridgingProxyObject", le = h ? J : "Environment", ce = h && s.java ? "JavaPackage" : F(s.java), fe = h ? J : "RuntimeObject", I = /\bJava/.test(ce) && s.java, be = I && F(s.environment) == le, pe = I ? "a" : "α", he = I ? "b" : "β", q = s.document || {}, W = s.operamini || s.opera, R = u.test(R = h && W ? W["[[Class]]"] : F(W)) ? R : W = null, e, K = t, c = [], D = null, $ = t == _, n = $ && W && typeof W.version == "function" && W.version(), Y, b = de([
        { label: "EdgeHTML", pattern: "Edge" },
        "Trident",
        { label: "WebKit", pattern: "AppleWebKit" },
        "iCab",
        "Presto",
        "NetFront",
        "Tasman",
        "KHTML",
        "Gecko"
      ]), i = ge([
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
      ]), a = ie([
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
      ]), S = ue({
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
      }), r = xe([
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
      function de(y) {
        return j(y, function(g, p) {
          return g || RegExp("\\b" + (p.pattern || k(p)) + "\\b", "i").exec(t) && (p.label || p);
        });
      }
      function ue(y) {
        return j(y, function(g, p, E) {
          return g || (p[a] || p[/^[a-z]+(?: +[a-z]+\b)*/i.exec(a)] || RegExp("\\b" + k(E) + "(?:\\b|\\w*\\d)", "i").exec(t)) && E;
        });
      }
      function ge(y) {
        return j(y, function(g, p) {
          return g || RegExp("\\b" + (p.pattern || k(p)) + "\\b", "i").exec(t) && (p.label || p);
        });
      }
      function xe(y) {
        return j(y, function(g, p) {
          var E = p.pattern || k(p);
          return !g && (g = RegExp("\\b" + E + "(?:/[\\d.]+|[ \\w.]*)", "i").exec(t)) && (g = z(g, E, p.label || p)), g;
        });
      }
      function ie(y) {
        return j(y, function(g, p) {
          var E = p.pattern || k(p);
          return !g && (g = RegExp("\\b" + E + " *\\d+[.\\w_]*", "i").exec(t) || RegExp("\\b" + E + " *\\w+-[\\w]*", "i").exec(t) || RegExp("\\b" + E + "(?:; *(?:[a-z]+[_-])?[a-z]+\\d+|[^ ();-]*)", "i").exec(t)) && ((g = String(p.label && !RegExp(E, "i").test(p.label) ? p.label : g).split("/"))[1] && !/[\d.]+/.test(g[0]) && (g[0] += " " + g[1]), p = p.label || p, g = N(g[0].replace(RegExp(E, "i"), p).replace(RegExp("; *(?:" + p + "[_-])?", "i"), " ").replace(RegExp("(" + p + ")[-_.]?(\\w)", "i"), "$1 $2"))), g;
        });
      }
      function re(y) {
        return j(y, function(g, p) {
          return g || (RegExp(p + "(?:-[\\d.]+/|(?: for [\\w-]+)?[ /-])([\\d.]+[^ ();/_-]*)", "i").exec(t) || 0)[1] || null;
        });
      }
      function me() {
        return this.description || "";
      }
      if (b && (b = [b]), /\bAndroid\b/.test(r) && !a && (e = /\bAndroid[^;]*;(.*?)(?:Build|\) AppleWebKit)\b/i.exec(t)) && (a = A(e[1]).replace(/^[a-z]{2}-[a-z]{2};\s*/i, "") || null), S && !a ? a = ie([S]) : S && a && (a = a.replace(RegExp("^(" + k(S) + ")[-_.\\s]", "i"), S + " ").replace(RegExp("^(" + k(S) + ")[-_.]?(\\w)", "i"), S + " $2")), (e = /\bGoogle TV\b/.exec(a)) && (a = e[0]), /\bSimulator\b/i.test(t) && (a = (a ? a + " " : "") + "Simulator"), i == "Opera Mini" && /\bOPiOS\b/.test(t) && c.push("running in Turbo/Uncompressed mode"), i == "IE" && /\blike iPhone OS\b/.test(t) ? (e = L(t.replace(/like iPhone OS/, "")), S = e.manufacturer, a = e.product) : /^iP/.test(a) ? (i || (i = "Safari"), r = "iOS" + ((e = / OS ([\d_]+)/i.exec(t)) ? " " + e[1].replace(/_/g, ".") : "")) : i == "Konqueror" && /^Linux\b/i.test(r) ? r = "Kubuntu" : S && S != "Google" && (/Chrome/.test(i) && !/\bMobile Safari\b/i.test(t) || /\bVita\b/.test(a)) || /\bAndroid\b/.test(r) && /^Chrome/.test(i) && /\bVersion\//i.test(t) ? (i = "Android Browser", r = /\bAndroid\b/.test(r) ? r : "Android") : i == "Silk" ? (/\bMobi/i.test(t) || (r = "Android", c.unshift("desktop mode")), /Accelerated *= *true/i.test(t) && c.unshift("accelerated")) : i == "UC Browser" && /\bUCWEB\b/.test(t) ? c.push("speed mode") : i == "PaleMoon" && (e = /\bFirefox\/([\d.]+)\b/.exec(t)) ? c.push("identifying as Firefox " + e[1]) : i == "Firefox" && (e = /\b(Mobile|Tablet|TV)\b/i.exec(t)) ? (r || (r = "Firefox OS"), a || (a = e[1])) : !i || (e = !/\bMinefield\b/i.test(t) && /\b(?:Firefox|Safari)\b/.exec(i)) ? (i && !a && /[\/,]|^[^(]+?\)/.test(t.slice(t.indexOf(e + "/") + 8)) && (i = null), (e = a || S || r) && (a || S || /\b(?:Android|Symbian OS|Tablet OS|webOS)\b/.test(r)) && (i = /[a-z]+(?: Hat)?/i.exec(/\bAndroid\b/.test(r) ? r : e) + " Browser")) : i == "Electron" && (e = (/\bChrome\/([\d.]+)\b/.exec(t) || 0)[1]) && c.push("Chromium " + e), n || (n = re([
        "(?:Cloud9|CriOS|CrMo|Edge|Edg|EdgA|EdgiOS|FxiOS|HeadlessChrome|IEMobile|Iron|Opera ?Mini|OPiOS|OPR|Raven|SamsungBrowser|Silk(?!/[\\d.]+$)|UCBrowser|YaBrowser)",
        "Version",
        k(i),
        "(?:Firefox|Minefield|NetFront)"
      ])), (e = b == "iCab" && parseFloat(n) > 3 && "WebKit" || /\bOpera\b/.test(i) && (/\bOPR\b/.test(t) ? "Blink" : "Presto") || /\b(?:Midori|Nook|Safari)\b/i.test(t) && !/^(?:Trident|EdgeHTML)$/.test(b) && "WebKit" || !b && /\bMSIE\b/i.test(t) && (r == "Mac OS" ? "Tasman" : "Trident") || b == "WebKit" && /\bPlayStation\b(?! Vita\b)/i.test(i) && "NetFront") && (b = [e]), i == "IE" && (e = (/; *(?:XBLWP|ZuneWP)(\d+)/i.exec(t) || 0)[1]) ? (i += " Mobile", r = "Windows Phone " + (/\+$/.test(e) ? e : e + ".x"), c.unshift("desktop mode")) : /\bWPDesktop\b/i.test(t) ? (i = "IE Mobile", r = "Windows Phone 8.x", c.unshift("desktop mode"), n || (n = (/\brv:([\d.]+)/.exec(t) || 0)[1])) : i != "IE" && b == "Trident" && (e = /\brv:([\d.]+)/.exec(t)) && (i && c.push("identifying as " + i + (n ? " " + n : "")), i = "IE", n = e[1]), $) {
        if (oe(s, "global"))
          if (I && (e = I.lang.System, K = e.getProperty("os.arch"), r = r || e.getProperty("os.name") + " " + e.getProperty("os.version")), be) {
            try {
              n = s.require("ringo/engine").version.join("."), i = "RingoJS";
            } catch {
              (e = s.system) && e.global.system == s.system && (i = "Narwhal", r || (r = e[0].os || null));
            }
            i || (i = "Rhino");
          } else typeof s.process == "object" && !s.process.browser && (e = s.process) && (typeof e.versions == "object" && (typeof e.versions.electron == "string" ? (c.push("Node " + e.versions.node), i = "Electron", n = e.versions.electron) : typeof e.versions.nw == "string" && (c.push("Chromium " + n, "Node " + e.versions.node), i = "NW.js", n = e.versions.nw)), i || (i = "Node.js", K = e.arch, r = e.platform, n = /[\d.]+/.exec(e.version), n = n ? n[0] : null));
        else F(e = s.runtime) == se ? (i = "Adobe AIR", r = e.flash.system.Capabilities.os) : F(e = s.phantom) == fe ? (i = "PhantomJS", n = (e = e.version || null) && e.major + "." + e.minor + "." + e.patch) : typeof q.documentMode == "number" && (e = /\bTrident\/(\d+)/i.exec(t)) ? (n = [n, q.documentMode], (e = +e[1] + 4) != n[1] && (c.push("IE " + n[1] + " mode"), b && (b[1] = ""), n[1] = e), n = i == "IE" ? String(n[1].toFixed(1)) : n[0]) : typeof q.documentMode == "number" && /^(?:Chrome|Firefox)\b/.test(i) && (c.push("masking as " + i + " " + n), i = "IE", n = "11.0", b = ["Trident"], r = "Windows");
        r = r && N(r);
      }
      if (n && (e = /(?:[ab]|dp|pre|[ab]\d+pre)(?:\d+\+?)?$/i.exec(n) || /(?:alpha|beta)(?: ?\d)?/i.exec(t + ";" + ($ && O.appMinorVersion)) || /\bMinefield\b/i.test(t) && "a") && (D = /b/i.test(e) ? "beta" : "alpha", n = n.replace(RegExp(e + "\\+?$"), "") + (D == "beta" ? he : pe) + (/\d+\+?/.exec(e) || "")), i == "Fennec" || i == "Firefox" && /\b(?:Android|Firefox OS|KaiOS)\b/.test(r))
        i = "Firefox Mobile";
      else if (i == "Maxthon" && n)
        n = n.replace(/\.[\d.]+/, ".x");
      else if (/\bXbox\b/i.test(a))
        a == "Xbox 360" && (r = null), a == "Xbox 360" && /\bIEMobile\b/.test(t) && c.unshift("mobile mode");
      else if ((/^(?:Chrome|IE|Opera)$/.test(i) || i && !a && !/Browser|Mobi/.test(i)) && (r == "Windows CE" || /Mobi/i.test(t)))
        i += " Mobile";
      else if (i == "IE" && $)
        try {
          s.external === null && c.unshift("platform preview");
        } catch {
          c.unshift("embedded");
        }
      else (/\bBlackBerry\b/.test(a) || /\bBB10\b/.test(t)) && (e = (RegExp(a.replace(/ +/g, " *") + "/([.\\d]+)", "i").exec(t) || 0)[1] || n) ? (e = [e, /BB10/.test(t)], r = (e[1] ? (a = null, S = "BlackBerry") : "Device Software") + " " + e[0], n = null) : this != G && a != "Wii" && ($ && W || /Opera/.test(i) && /\b(?:MSIE|Firefox)\b/i.test(t) || i == "Firefox" && /\bOS X (?:\d+\.){2,}/.test(r) || i == "IE" && (r && !/^Win/.test(r) && n > 5.5 || /\bWindows XP\b/.test(r) && n > 8 || n == 8 && !/\bTrident\b/.test(t))) && !u.test(e = L.call(G, t.replace(u, "") + ";")) && e.name && (e = "ing as " + e.name + ((e = e.version) ? " " + e : ""), u.test(i) ? (/\bIE\b/.test(e) && r == "Mac OS" && (r = null), e = "identify" + e) : (e = "mask" + e, R ? i = N(R.replace(/([a-z])([A-Z])/g, "$1 $2")) : i = "Opera", /\bIE\b/.test(e) && (r = null), $ || (n = null)), b = ["Presto"], c.push(e));
      (e = (/\bAppleWebKit\/([\d.]+\+?)/i.exec(t) || 0)[1]) && (e = [parseFloat(e.replace(/\.(\d)$/, ".0$1")), e], i == "Safari" && e[1].slice(-1) == "+" ? (i = "WebKit Nightly", D = "alpha", n = e[1].slice(0, -1)) : (n == e[1] || n == (e[2] = (/\bSafari\/([\d.]+\+?)/i.exec(t) || 0)[1])) && (n = null), e[1] = (/\b(?:Headless)?Chrome\/([\d.]+)/i.exec(t) || 0)[1], e[0] == 537.36 && e[2] == 537.36 && parseFloat(e[1]) >= 28 && b == "WebKit" && (b = ["Blink"]), !$ || !ae && !e[1] ? (b && (b[1] = "like Safari"), e = (e = e[0], e < 400 ? 1 : e < 500 ? 2 : e < 526 ? 3 : e < 533 ? 4 : e < 534 ? "4+" : e < 535 ? 5 : e < 537 ? 6 : e < 538 ? 7 : e < 601 ? 8 : e < 602 ? 9 : e < 604 ? 10 : e < 606 ? 11 : e < 608 ? 12 : "12")) : (b && (b[1] = "like Chrome"), e = e[1] || (e = e[0], e < 530 ? 1 : e < 532 ? 2 : e < 532.05 ? 3 : e < 533 ? 4 : e < 534.03 ? 5 : e < 534.07 ? 6 : e < 534.1 ? 7 : e < 534.13 ? 8 : e < 534.16 ? 9 : e < 534.24 ? 10 : e < 534.3 ? 11 : e < 535.01 ? 12 : e < 535.02 ? "13+" : e < 535.07 ? 15 : e < 535.11 ? 16 : e < 535.19 ? 17 : e < 536.05 ? 18 : e < 536.1 ? 19 : e < 537.01 ? 20 : e < 537.11 ? "21+" : e < 537.13 ? 23 : e < 537.18 ? 24 : e < 537.24 ? 25 : e < 537.36 ? 26 : b != "Blink" ? "27" : "28")), b && (b[1] += " " + (e += typeof e == "number" ? ".x" : /[.+]/.test(e) ? "" : "+")), i == "Safari" && (!n || parseInt(n) > 45) ? n = e : i == "Chrome" && /\bHeadlessChrome/i.test(t) && c.unshift("headless")), i == "Opera" && (e = /\bzbov|zvav$/.exec(r)) ? (i += " ", c.unshift("desktop mode"), e == "zvav" ? (i += "Mini", n = null) : i += "Mobile", r = r.replace(RegExp(" *" + e + "$"), "")) : i == "Safari" && /\bChrome\b/.exec(b && b[1]) ? (c.unshift("desktop mode"), i = "Chrome Mobile", n = null, /\bOS X\b/.test(r) ? (S = "Apple", r = "iOS 4.3+") : r = null) : /\bSRWare Iron\b/.test(i) && !n && (n = re("Chrome")), n && n.indexOf(e = /[\d.]+$/.exec(r)) == 0 && t.indexOf("/" + e + "-") > -1 && (r = A(r.replace(e, ""))), r && r.indexOf(i) != -1 && !RegExp(i + " OS").test(r) && (r = r.replace(RegExp(" *" + k(i) + " *"), "")), b && !/\b(?:Avant|Nook)\b/.test(i) && (/Browser|Lunascape|Maxthon/.test(i) || i != "Safari" && /^iOS/.test(r) && /\bSafari\b/.test(b[1]) || /^(?:Adobe|Arora|Breach|Midori|Opera|Phantom|Rekonq|Rock|Samsung Internet|Sleipnir|SRWare Iron|Vivaldi|Web)/.test(i) && b[1]) && (e = b[b.length - 1]) && c.push(e), c.length && (c = ["(" + c.join("; ") + ")"]), S && a && a.indexOf(S) < 0 && c.push("on " + S), a && c.push((/^on /.test(c[c.length - 1]) ? "" : "on ") + a), r && (e = / ([\d.+]+)$/.exec(r), Y = e && r.charAt(r.length - e[0].length - 1) == "/", r = {
        architecture: 32,
        family: e && !Y ? r.replace(e[0], "") : r,
        version: e ? e[1] : null,
        toString: function() {
          var y = this.version;
          return this.family + (y && !Y ? " " + y : "") + (this.architecture == 64 ? " 64-bit" : "");
        }
      }), (e = /\b(?:AMD|IA|Win|WOW|x86_|x)64\b/i.exec(K)) && !/\bi686\b/i.test(K) ? (r && (r.architecture = 64, r.family = r.family.replace(RegExp(" *" + e), "")), i && (/\bWOW64\b/i.test(t) || $ && /\w(?:86|32)$/.test(O.cpuClass || O.platform) && !/\bWin64; x64\b/i.test(t)) && c.unshift("32-bit")) : r && /^OS X/.test(r.family) && i == "Chrome" && parseFloat(n) >= 39 && (r.architecture = 64), t || (t = null);
      var M = {};
      return M.description = t, M.layout = b && b[0], M.manufacturer = S, M.name = i, M.prerelease = D, M.product = a, M.ua = t, M.version = i && n, M.os = r || {
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
      }, M.parse = L, M.toString = me, M.version && c.unshift(n), M.name && c.unshift(i), r && i && !(r == String(r).split(" ")[0] && (r == i.split(" ")[0] || a)) && c.push(a ? "(" + r + ")" : "on " + r), c.length && (M.description = c.join(" ")), M;
    }
    var te = L();
    m && w ? G(te, function(t, s) {
      m[s] = t;
    }) : x.platform = te;
  }).call(Z);
})(U, U.exports);
var T = U.exports;
function H(l) {
  return parseInt(String(l), 10);
}
"toInt" in String.prototype || (String.prototype.toInt = function() {
  return H(this);
});
"toUint" in String.prototype || (String.prototype.toUint = function() {
  const l = H(this);
  return l < 0 ? -l : l;
});
class Q {
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
var ne = /* @__PURE__ */ ((l) => (l.DEFAULT = "", l.SP_GSM = "png|jpg|jpeg|json|svg|webp|mp4|webm", l.SCRIPT = "sn|ssn", l.FONT = "woff2|woff|otf|ttf", l.SOUND = "mp3|m4a|ogg|aac|flac|wav", l.HTML = "htm|html", l.CSS = "css", l.SN = "sn", l.TST_PNGPNG_ = "png|png_", l.TST_HH = "hh", l.TST_EEE = "eee", l.TST_GGG = "ggg", l.TST_PNGXML = "png|xml", l))(ne || {});
class Se {
  constructor(o) {
    this.sys = o;
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
  async load(o) {
    this.oCfg.save_ns = o?.save_ns ?? this.oCfg.save_ns, this.oCfg.window.width = Number(o?.window?.width ?? this.oCfg.window.width), this.oCfg.window.height = Number(o?.window?.height ?? this.oCfg.window.height), this.oCfg.book = { ...this.oCfg.book, ...o.book }, this.oCfg.log.max_len = o.log?.max_len?.max_len ?? this.oCfg.log.max_len, this.oCfg.init = { ...this.oCfg.init, ...o.init }, this.oCfg.debug = { ...this.oCfg.debug, ...o.debug }, this.oCfg.debuger_token = o.debuger_token;
    const f = this.sys.cur + "path.json", x = await fetch(f);
    if (!x.ok) throw Error(x.statusText);
    const m = await x.text(), w = JSON.parse(await this.sys.dec(f, m));
    for (const [d, P] of Object.entries(w)) {
      const u = this.hPathFn2Exts[d] = P;
      for (const [v, C] of Object.entries(u))
        v !== ":cnt" && (u[v] = this.sys.cur + C);
    }
    if (this.#e = this.matchPath(
      "^breakline$",
      "png|jpg|jpeg|json|svg|webp|mp4|webm"
      /* SP_GSM */
    ).length > 0, this.#t = this.matchPath(
      "^breakpage$",
      "png|jpg|jpeg|json|svg|webp|mp4|webm"
      /* SP_GSM */
    ).length > 0, this.sys.crypto)
      for (const [d, P] of Object.entries(this.hPathFn2Exts))
        for (const [u, v] of Object.entries(P)) {
          if (!u.startsWith(":") || !u.endsWith(":id")) continue;
          const C = v.slice(v.lastIndexOf("/") + 1), B = P[u.slice(0, -10)] ?? "", z = await (await fetch(B)).text(), X = this.sys.hash(z);
          if (C !== X) throw `ファイル改竄エラーです fn:${B}`;
        }
    else
      for (const [d, P] of Object.entries(this.hPathFn2Exts))
        for (const u of Object.keys(P))
          u.startsWith(":");
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
  searchPath(o, f = "") {
    if (!o) throw "[searchPath] fnが空です";
    if (o.startsWith("http://")) return o;
    const x = o.match(this.#i);
    let m = x ? x[1] : o;
    const w = x ? x[2] : "";
    if (this.userFnTail) {
      const u = m + "@@" + this.userFnTail;
      if (u in this.hPathFn2Exts) {
        if (f === "") m = u;
        else for (const v of Object.keys(this.hPathFn2Exts[u] ?? {}))
          if (`|${f}|`.includes(`|${v}|`)) {
            m = u;
            break;
          }
      }
    }
    const d = this.hPathFn2Exts[m];
    if (!d) throw `サーチパスに存在しないファイル【${o}】です`;
    if (!w) {
      const u = H(d[":cnt"]);
      if (f === "") {
        if (u > 1) throw `指定ファイル【${o}】が複数マッチします。サーチ対象拡張子群【${f}】で絞り込むか、ファイル名を個別にして下さい。`;
        return o;
      }
      const v = `|${f}|`;
      if (u > 1) {
        let C = 0;
        for (const B of Object.keys(d))
          if (v.includes(`|${B}|`) && ++C > 1)
            throw `指定ファイル【${o}】が複数マッチします。サーチ対象拡張子群【${f}】で絞り込むか、ファイル名を個別にして下さい。`;
      }
      for (const C of Object.keys(d))
        if (v.includes(`|${C}|`)) return d[C];
      throw `サーチ対象拡張子群【${f}】にマッチするファイルがサーチパスに存在しません。探索ファイル名=【${o}】`;
    }
    if (f !== "" && !`|${f}|`.includes(`|${w}|`))
      throw `指定ファイルの拡張子【${w}】は、サーチ対象拡張子群【${f}】にマッチしません。探索ファイル名=【${o}】`;
    const P = d[w];
    if (!P) throw `サーチパスに存在しない拡張子【${w}】です。探索ファイル名=【${o}】、サーチ対象拡張子群【${f}】`;
    return P;
  }
  matchPath(o, f = "") {
    const x = [], m = new RegExp(o), w = new RegExp(f);
    for (const [d, P] of Object.entries(this.hPathFn2Exts)) {
      if (d.search(m) === -1) continue;
      if (f === "") {
        x.push(P);
        continue;
      }
      const u = {};
      let v = !1;
      for (const C of Object.keys(P))
        C.search(w) !== -1 && (u[C] = d, v = !0);
      v && x.push(u);
    }
    return x;
  }
  addPath(o, f) {
    const x = {};
    for (const [m, w] of Object.entries(f))
      x[m] = (m.startsWith(":") ? "" : this.sys.cur) + w;
    this.hPathFn2Exts[o] = x;
  }
}
class ee extends Se {
  constructor(o) {
    super(o), this.sys = o;
  }
  static async generate(o) {
    const f = new ee(o), x = o.arg.cur + "prj.json", m = await fetch(x);
    if (!m.ok) throw Error(m.statusText);
    const w = await m.text(), d = JSON.parse(await o.dec(x, w));
    return await f.load(d), f;
  }
  async load(o) {
    await super.load(o), Q.stageW = this.oCfg.window.width, Q.stageH = this.oCfg.window.height, Q.debugLog = this.oCfg.debug.debugLog;
  }
  searchPath(o, f = ne.DEFAULT) {
    return o.startsWith("downloads:/") ? this.sys.path_downloads + o.slice(11) : o.startsWith("userdata:/") ? this.sys.path_userdata + "storage/" + o.slice(10) : super.searchPath(o, f);
  }
}
window.__REACT_DEVTOOLS_GLOBAL_HOOK__ = { isDisabled: !0 };
class we {
  constructor(o = {}, f) {
    this.hPlg = o, this.arg = f, this.cur = this.arg.cur, this.crypto = this.arg.crypto;
  }
  cur;
  crypto;
  async init() {
    this.#t = await ee.generate(this);
    const { ScriptMng: o } = await import("./ScriptMng.js");
    this.#e = new o(this), this.#e.load("main");
  }
  #e;
  #t;
  get cfg() {
    return this.#t;
  }
  $path_downloads = "";
  get path_downloads() {
    return this.$path_downloads;
  }
  $path_userdata = "";
  get path_userdata() {
    return this.$path_userdata;
  }
  dec = (o, f) => Promise.resolve(f);
  hash = (o) => "";
}
class Oe extends we {
  constructor(o = {}, f = { cur: "prj/", crypto: !1, dip: "" }) {
    super(o, f), super.init();
  }
}
export {
  Q as C,
  ne as S,
  Oe as a,
  ve as g
};
//# sourceMappingURL=web2.js.map
