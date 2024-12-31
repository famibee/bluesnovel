import { c as J, g as me } from "./_commonjsHelpers.js";
var k = { exports: {} };
/*!
 * Platform.js v1.3.6
 * Copyright 2014-2020 Benjamin Tan
 * Copyright 2011-2013 John-David Dalton
 * Available under MIT license
 */
var he = k.exports, Y;
function ge() {
  return Y || (Y = 1, function(b, d) {
    (function() {
      var O = {
        function: !0,
        object: !0
      }, g = O[typeof window] && window || this, u = d, H = b && !b.nodeType && b, M = u && H && typeof J == "object" && J;
      M && (M.global === M || M.window === M || M.self === M) && (g = M);
      var Q = Math.pow(2, 53) - 1, R = /\bOpera/, L = Object.prototype, ee = L.hasOwnProperty, V = L.toString;
      function z(t) {
        return t = String(t), t.charAt(0).toUpperCase() + t.slice(1);
      }
      function te(t, a, c) {
        var x = {
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
        return a && c && /^Win/i.test(t) && !/^Windows Phone /i.test(t) && (x = x[/[\d.]+$/.exec(t)]) && (t = "Windows " + x), t = String(t), a && c && (t = t.replace(RegExp(a, "i"), c)), t = I(
          t.replace(/ ce$/i, " CE").replace(/\bhpw/i, "web").replace(/\bMacintosh\b/, "Mac OS").replace(/_PowerPC\b/i, " OS").replace(/\b(OS X) [^ \d]+/i, "$1").replace(/\bMac (OS X)\b/, "$1").replace(/\/(\d)/, " $1").replace(/_/g, ".").replace(/(?: BePC|[ .]*fc[ \d.]+)$/i, "").replace(/\bx86\.64\b/gi, "x86_64").replace(/\b(Windows Phone) OS\b/, "$1").replace(/\b(Chrome OS \w+) [\d.]+\b/, "$1").split(" on ")[0]
        ), t;
      }
      function ie(t, a) {
        var c = -1, x = t ? t.length : 0;
        if (typeof x == "number" && x > -1 && x <= Q)
          for (; ++c < x; )
            a(t[c], c, t);
        else
          F(t, a);
      }
      function I(t) {
        return t = X(t), /^(?:webOS|i(?:OS|P))/.test(t) ? t : z(t);
      }
      function F(t, a) {
        for (var c in t)
          ee.call(t, c) && a(t[c], c, t);
      }
      function E(t) {
        return t == null ? z(t) : V.call(t).slice(8, -1);
      }
      function re(t, a) {
        var c = t != null ? typeof t[a] : "number";
        return !/^(?:boolean|number|string|undefined)$/.test(c) && (c == "object" ? !!t[a] : !0);
      }
      function y(t) {
        return String(t).replace(/([ -])(?!$)/g, "$1?");
      }
      function P(t, a) {
        var c = null;
        return ie(t, function(x, $) {
          c = a(c, x, $, t);
        }), c;
      }
      function X(t) {
        return String(t).replace(/^ +| +$/g, "");
      }
      function A(t) {
        var a = g, c = t && typeof t == "object" && E(t) != "String";
        c && (a = t, t = null);
        var x = a.navigator || {}, $ = x.userAgent || "";
        t || (t = $);
        var ne = c ? !!x.likeChrome : /\bChrome\b/.test(t) && !/internal|\n/i.test(V.toString()), K = "Object", oe = c ? K : "ScriptBridgingProxyObject", ae = c ? K : "Environment", le = c && a.java ? "JavaPackage" : E(a.java), se = c ? K : "RuntimeObject", W = /\bJava/.test(le) && a.java, fe = W && E(a.environment) == ae, be = W ? "a" : "α", ce = W ? "b" : "β", j = a.document || {}, w = a.operamini || a.opera, G = R.test(G = c && w ? w["[[Class]]"] : E(w)) ? G : w = null, e, T = t, l = [], N = null, C = t == $, n = C && w && typeof w.version == "function" && w.version(), D, s = pe([
          { label: "EdgeHTML", pattern: "Edge" },
          "Trident",
          { label: "WebKit", pattern: "AppleWebKit" },
          "iCab",
          "Presto",
          "NetFront",
          "Tasman",
          "KHTML",
          "Gecko"
        ]), i = Se([
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
        ]), o = U([
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
        ]), S = de({
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
        }), r = ue([
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
        function pe(m) {
          return P(m, function(p, f) {
            return p || RegExp("\\b" + (f.pattern || y(f)) + "\\b", "i").exec(t) && (f.label || f);
          });
        }
        function de(m) {
          return P(m, function(p, f, v) {
            return p || (f[o] || f[/^[a-z]+(?: +[a-z]+\b)*/i.exec(o)] || RegExp("\\b" + y(v) + "(?:\\b|\\w*\\d)", "i").exec(t)) && v;
          });
        }
        function Se(m) {
          return P(m, function(p, f) {
            return p || RegExp("\\b" + (f.pattern || y(f)) + "\\b", "i").exec(t) && (f.label || f);
          });
        }
        function ue(m) {
          return P(m, function(p, f) {
            var v = f.pattern || y(f);
            return !p && (p = RegExp("\\b" + v + "(?:/[\\d.]+|[ \\w.]*)", "i").exec(t)) && (p = te(p, v, f.label || f)), p;
          });
        }
        function U(m) {
          return P(m, function(p, f) {
            var v = f.pattern || y(f);
            return !p && (p = RegExp("\\b" + v + " *\\d+[.\\w_]*", "i").exec(t) || RegExp("\\b" + v + " *\\w+-[\\w]*", "i").exec(t) || RegExp("\\b" + v + "(?:; *(?:[a-z]+[_-])?[a-z]+\\d+|[^ ();-]*)", "i").exec(t)) && ((p = String(f.label && !RegExp(v, "i").test(f.label) ? f.label : p).split("/"))[1] && !/[\d.]+/.test(p[0]) && (p[0] += " " + p[1]), f = f.label || f, p = I(p[0].replace(RegExp(v, "i"), f).replace(RegExp("; *(?:" + f + "[_-])?", "i"), " ").replace(RegExp("(" + f + ")[-_.]?(\\w)", "i"), "$1 $2"))), p;
          });
        }
        function q(m) {
          return P(m, function(p, f) {
            return p || (RegExp(f + "(?:-[\\d.]+/|(?: for [\\w-]+)?[ /-])([\\d.]+[^ ();/_-]*)", "i").exec(t) || 0)[1] || null;
          });
        }
        function xe() {
          return this.description || "";
        }
        if (s && (s = [s]), /\bAndroid\b/.test(r) && !o && (e = /\bAndroid[^;]*;(.*?)(?:Build|\) AppleWebKit)\b/i.exec(t)) && (o = X(e[1]).replace(/^[a-z]{2}-[a-z]{2};\s*/i, "") || null), S && !o ? o = U([S]) : S && o && (o = o.replace(RegExp("^(" + y(S) + ")[-_.\\s]", "i"), S + " ").replace(RegExp("^(" + y(S) + ")[-_.]?(\\w)", "i"), S + " $2")), (e = /\bGoogle TV\b/.exec(o)) && (o = e[0]), /\bSimulator\b/i.test(t) && (o = (o ? o + " " : "") + "Simulator"), i == "Opera Mini" && /\bOPiOS\b/.test(t) && l.push("running in Turbo/Uncompressed mode"), i == "IE" && /\blike iPhone OS\b/.test(t) ? (e = A(t.replace(/like iPhone OS/, "")), S = e.manufacturer, o = e.product) : /^iP/.test(o) ? (i || (i = "Safari"), r = "iOS" + ((e = / OS ([\d_]+)/i.exec(t)) ? " " + e[1].replace(/_/g, ".") : "")) : i == "Konqueror" && /^Linux\b/i.test(r) ? r = "Kubuntu" : S && S != "Google" && (/Chrome/.test(i) && !/\bMobile Safari\b/i.test(t) || /\bVita\b/.test(o)) || /\bAndroid\b/.test(r) && /^Chrome/.test(i) && /\bVersion\//i.test(t) ? (i = "Android Browser", r = /\bAndroid\b/.test(r) ? r : "Android") : i == "Silk" ? (/\bMobi/i.test(t) || (r = "Android", l.unshift("desktop mode")), /Accelerated *= *true/i.test(t) && l.unshift("accelerated")) : i == "UC Browser" && /\bUCWEB\b/.test(t) ? l.push("speed mode") : i == "PaleMoon" && (e = /\bFirefox\/([\d.]+)\b/.exec(t)) ? l.push("identifying as Firefox " + e[1]) : i == "Firefox" && (e = /\b(Mobile|Tablet|TV)\b/i.exec(t)) ? (r || (r = "Firefox OS"), o || (o = e[1])) : !i || (e = !/\bMinefield\b/i.test(t) && /\b(?:Firefox|Safari)\b/.exec(i)) ? (i && !o && /[\/,]|^[^(]+?\)/.test(t.slice(t.indexOf(e + "/") + 8)) && (i = null), (e = o || S || r) && (o || S || /\b(?:Android|Symbian OS|Tablet OS|webOS)\b/.test(r)) && (i = /[a-z]+(?: Hat)?/i.exec(/\bAndroid\b/.test(r) ? r : e) + " Browser")) : i == "Electron" && (e = (/\bChrome\/([\d.]+)\b/.exec(t) || 0)[1]) && l.push("Chromium " + e), n || (n = q([
          "(?:Cloud9|CriOS|CrMo|Edge|Edg|EdgA|EdgiOS|FxiOS|HeadlessChrome|IEMobile|Iron|Opera ?Mini|OPiOS|OPR|Raven|SamsungBrowser|Silk(?!/[\\d.]+$)|UCBrowser|YaBrowser)",
          "Version",
          y(i),
          "(?:Firefox|Minefield|NetFront)"
        ])), (e = s == "iCab" && parseFloat(n) > 3 && "WebKit" || /\bOpera\b/.test(i) && (/\bOPR\b/.test(t) ? "Blink" : "Presto") || /\b(?:Midori|Nook|Safari)\b/i.test(t) && !/^(?:Trident|EdgeHTML)$/.test(s) && "WebKit" || !s && /\bMSIE\b/i.test(t) && (r == "Mac OS" ? "Tasman" : "Trident") || s == "WebKit" && /\bPlayStation\b(?! Vita\b)/i.test(i) && "NetFront") && (s = [e]), i == "IE" && (e = (/; *(?:XBLWP|ZuneWP)(\d+)/i.exec(t) || 0)[1]) ? (i += " Mobile", r = "Windows Phone " + (/\+$/.test(e) ? e : e + ".x"), l.unshift("desktop mode")) : /\bWPDesktop\b/i.test(t) ? (i = "IE Mobile", r = "Windows Phone 8.x", l.unshift("desktop mode"), n || (n = (/\brv:([\d.]+)/.exec(t) || 0)[1])) : i != "IE" && s == "Trident" && (e = /\brv:([\d.]+)/.exec(t)) && (i && l.push("identifying as " + i + (n ? " " + n : "")), i = "IE", n = e[1]), C) {
          if (re(a, "global"))
            if (W && (e = W.lang.System, T = e.getProperty("os.arch"), r = r || e.getProperty("os.name") + " " + e.getProperty("os.version")), fe) {
              try {
                n = a.require("ringo/engine").version.join("."), i = "RingoJS";
              } catch {
                (e = a.system) && e.global.system == a.system && (i = "Narwhal", r || (r = e[0].os || null));
              }
              i || (i = "Rhino");
            } else typeof a.process == "object" && !a.process.browser && (e = a.process) && (typeof e.versions == "object" && (typeof e.versions.electron == "string" ? (l.push("Node " + e.versions.node), i = "Electron", n = e.versions.electron) : typeof e.versions.nw == "string" && (l.push("Chromium " + n, "Node " + e.versions.node), i = "NW.js", n = e.versions.nw)), i || (i = "Node.js", T = e.arch, r = e.platform, n = /[\d.]+/.exec(e.version), n = n ? n[0] : null));
          else E(e = a.runtime) == oe ? (i = "Adobe AIR", r = e.flash.system.Capabilities.os) : E(e = a.phantom) == se ? (i = "PhantomJS", n = (e = e.version || null) && e.major + "." + e.minor + "." + e.patch) : typeof j.documentMode == "number" && (e = /\bTrident\/(\d+)/i.exec(t)) ? (n = [n, j.documentMode], (e = +e[1] + 4) != n[1] && (l.push("IE " + n[1] + " mode"), s && (s[1] = ""), n[1] = e), n = i == "IE" ? String(n[1].toFixed(1)) : n[0]) : typeof j.documentMode == "number" && /^(?:Chrome|Firefox)\b/.test(i) && (l.push("masking as " + i + " " + n), i = "IE", n = "11.0", s = ["Trident"], r = "Windows");
          r = r && I(r);
        }
        if (n && (e = /(?:[ab]|dp|pre|[ab]\d+pre)(?:\d+\+?)?$/i.exec(n) || /(?:alpha|beta)(?: ?\d)?/i.exec(t + ";" + (C && x.appMinorVersion)) || /\bMinefield\b/i.test(t) && "a") && (N = /b/i.test(e) ? "beta" : "alpha", n = n.replace(RegExp(e + "\\+?$"), "") + (N == "beta" ? ce : be) + (/\d+\+?/.exec(e) || "")), i == "Fennec" || i == "Firefox" && /\b(?:Android|Firefox OS|KaiOS)\b/.test(r))
          i = "Firefox Mobile";
        else if (i == "Maxthon" && n)
          n = n.replace(/\.[\d.]+/, ".x");
        else if (/\bXbox\b/i.test(o))
          o == "Xbox 360" && (r = null), o == "Xbox 360" && /\bIEMobile\b/.test(t) && l.unshift("mobile mode");
        else if ((/^(?:Chrome|IE|Opera)$/.test(i) || i && !o && !/Browser|Mobi/.test(i)) && (r == "Windows CE" || /Mobi/i.test(t)))
          i += " Mobile";
        else if (i == "IE" && C)
          try {
            a.external === null && l.unshift("platform preview");
          } catch {
            l.unshift("embedded");
          }
        else (/\bBlackBerry\b/.test(o) || /\bBB10\b/.test(t)) && (e = (RegExp(o.replace(/ +/g, " *") + "/([.\\d]+)", "i").exec(t) || 0)[1] || n) ? (e = [e, /BB10/.test(t)], r = (e[1] ? (o = null, S = "BlackBerry") : "Device Software") + " " + e[0], n = null) : this != F && o != "Wii" && (C && w || /Opera/.test(i) && /\b(?:MSIE|Firefox)\b/i.test(t) || i == "Firefox" && /\bOS X (?:\d+\.){2,}/.test(r) || i == "IE" && (r && !/^Win/.test(r) && n > 5.5 || /\bWindows XP\b/.test(r) && n > 8 || n == 8 && !/\bTrident\b/.test(t))) && !R.test(e = A.call(F, t.replace(R, "") + ";")) && e.name && (e = "ing as " + e.name + ((e = e.version) ? " " + e : ""), R.test(i) ? (/\bIE\b/.test(e) && r == "Mac OS" && (r = null), e = "identify" + e) : (e = "mask" + e, G ? i = I(G.replace(/([a-z])([A-Z])/g, "$1 $2")) : i = "Opera", /\bIE\b/.test(e) && (r = null), C || (n = null)), s = ["Presto"], l.push(e));
        (e = (/\bAppleWebKit\/([\d.]+\+?)/i.exec(t) || 0)[1]) && (e = [parseFloat(e.replace(/\.(\d)$/, ".0$1")), e], i == "Safari" && e[1].slice(-1) == "+" ? (i = "WebKit Nightly", N = "alpha", n = e[1].slice(0, -1)) : (n == e[1] || n == (e[2] = (/\bSafari\/([\d.]+\+?)/i.exec(t) || 0)[1])) && (n = null), e[1] = (/\b(?:Headless)?Chrome\/([\d.]+)/i.exec(t) || 0)[1], e[0] == 537.36 && e[2] == 537.36 && parseFloat(e[1]) >= 28 && s == "WebKit" && (s = ["Blink"]), !C || !ne && !e[1] ? (s && (s[1] = "like Safari"), e = (e = e[0], e < 400 ? 1 : e < 500 ? 2 : e < 526 ? 3 : e < 533 ? 4 : e < 534 ? "4+" : e < 535 ? 5 : e < 537 ? 6 : e < 538 ? 7 : e < 601 ? 8 : e < 602 ? 9 : e < 604 ? 10 : e < 606 ? 11 : e < 608 ? 12 : "12")) : (s && (s[1] = "like Chrome"), e = e[1] || (e = e[0], e < 530 ? 1 : e < 532 ? 2 : e < 532.05 ? 3 : e < 533 ? 4 : e < 534.03 ? 5 : e < 534.07 ? 6 : e < 534.1 ? 7 : e < 534.13 ? 8 : e < 534.16 ? 9 : e < 534.24 ? 10 : e < 534.3 ? 11 : e < 535.01 ? 12 : e < 535.02 ? "13+" : e < 535.07 ? 15 : e < 535.11 ? 16 : e < 535.19 ? 17 : e < 536.05 ? 18 : e < 536.1 ? 19 : e < 537.01 ? 20 : e < 537.11 ? "21+" : e < 537.13 ? 23 : e < 537.18 ? 24 : e < 537.24 ? 25 : e < 537.36 ? 26 : s != "Blink" ? "27" : "28")), s && (s[1] += " " + (e += typeof e == "number" ? ".x" : /[.+]/.test(e) ? "" : "+")), i == "Safari" && (!n || parseInt(n) > 45) ? n = e : i == "Chrome" && /\bHeadlessChrome/i.test(t) && l.unshift("headless")), i == "Opera" && (e = /\bzbov|zvav$/.exec(r)) ? (i += " ", l.unshift("desktop mode"), e == "zvav" ? (i += "Mini", n = null) : i += "Mobile", r = r.replace(RegExp(" *" + e + "$"), "")) : i == "Safari" && /\bChrome\b/.exec(s && s[1]) ? (l.unshift("desktop mode"), i = "Chrome Mobile", n = null, /\bOS X\b/.test(r) ? (S = "Apple", r = "iOS 4.3+") : r = null) : /\bSRWare Iron\b/.test(i) && !n && (n = q("Chrome")), n && n.indexOf(e = /[\d.]+$/.exec(r)) == 0 && t.indexOf("/" + e + "-") > -1 && (r = X(r.replace(e, ""))), r && r.indexOf(i) != -1 && !RegExp(i + " OS").test(r) && (r = r.replace(RegExp(" *" + y(i) + " *"), "")), s && !/\b(?:Avant|Nook)\b/.test(i) && (/Browser|Lunascape|Maxthon/.test(i) || i != "Safari" && /^iOS/.test(r) && /\bSafari\b/.test(s[1]) || /^(?:Adobe|Arora|Breach|Midori|Opera|Phantom|Rekonq|Rock|Samsung Internet|Sleipnir|SRWare Iron|Vivaldi|Web)/.test(i) && s[1]) && (e = s[s.length - 1]) && l.push(e), l.length && (l = ["(" + l.join("; ") + ")"]), S && o && o.indexOf(S) < 0 && l.push("on " + S), o && l.push((/^on /.test(l[l.length - 1]) ? "" : "on ") + o), r && (e = / ([\d.+]+)$/.exec(r), D = e && r.charAt(r.length - e[0].length - 1) == "/", r = {
          architecture: 32,
          family: e && !D ? r.replace(e[0], "") : r,
          version: e ? e[1] : null,
          toString: function() {
            var m = this.version;
            return this.family + (m && !D ? " " + m : "") + (this.architecture == 64 ? " 64-bit" : "");
          }
        }), (e = /\b(?:AMD|IA|Win|WOW|x86_|x)64\b/i.exec(T)) && !/\bi686\b/i.test(T) ? (r && (r.architecture = 64, r.family = r.family.replace(RegExp(" *" + e), "")), i && (/\bWOW64\b/i.test(t) || C && /\w(?:86|32)$/.test(x.cpuClass || x.platform) && !/\bWin64; x64\b/i.test(t)) && l.unshift("32-bit")) : r && /^OS X/.test(r.family) && i == "Chrome" && parseFloat(n) >= 39 && (r.architecture = 64), t || (t = null);
        var h = {};
        return h.description = t, h.layout = s && s[0], h.manufacturer = S, h.name = i, h.prerelease = N, h.product = o, h.ua = t, h.version = i && n, h.os = r || {
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
        }, h.parse = A, h.toString = xe, h.version && l.unshift(n), h.name && l.unshift(i), r && i && !(r == String(r).split(" ")[0] && (r == i.split(" ")[0] || o)) && l.push(o ? "(" + r + ")" : "on " + r), l.length && (h.description = l.join(" ")), h;
      }
      var _ = A();
      u && H ? F(_, function(t, a) {
        u[a] = t;
      }) : g.platform = _;
    }).call(he);
  }(k, k.exports)), k.exports;
}
var B = ge();
const ye = /* @__PURE__ */ me(B);
function Z(b) {
  return parseInt(String(b), 10);
}
function Me(b) {
  const d = parseInt(String(b), 10);
  return d < 0 ? -d : d;
}
"toInt" in String.prototype || (String.prototype.toInt = function() {
  return Z(this);
});
"toUint" in String.prototype || (String.prototype.toUint = function() {
  const b = Z(this);
  return b < 0 ? -b : b;
});
function we(b = "/", d = " ", O = ":", g = "") {
  const u = /* @__PURE__ */ new Date();
  return u.getFullYear() + b + String(100 + u.getMonth() + 1).slice(1, 3) + b + String(100 + u.getDate()).slice(1, 3) + d + String(100 + u.getHours()).slice(1, 3) + O + String(100 + u.getMinutes()).slice(1, 3) + (g === "" ? "" : g + String(u.getMilliseconds()));
}
function Ce(b, d, O) {
  const g = b[d];
  if (!(d in b)) {
    if (isNaN(O)) throw `[${b[":タグ名"]}]属性 ${d} は必須です`;
    return b[d] = O, O;
  }
  const u = String(g).startsWith("0x") ? parseInt(g) : parseFloat(g);
  if (isNaN(u)) throw `[${b[":タグ名"]}]属性 ${d} の値【${g}】が数値ではありません`;
  return b[d] = u;
}
function Ee(b, d, O) {
  if (!(d in b)) return b[d] = O;
  const g = b[d];
  if (g === null) return !1;
  const u = String(g);
  return b[d] = u === "false" ? !1 : !!u;
}
const ve = /^[^\/\.]+$|[^\/]+(?=\.)/;
function Pe(b) {
  return (b.match(ve) ?? [""])[0];
}
class Be {
  static stageW = 0;
  static stageH = 0;
  static debugLog = !1;
  static isSafari = B.name === "Safari";
  static isFirefox = B.name === "Firefox";
  static isMac = /OS X/.test(B.os?.family ?? "");
  static isWin = /Windows/.test(B.os?.family ?? "");
  static isMobile = !/(Windows|OS X)/.test(B.os?.family ?? "");
  static hDip = {};
  static isDbg = !1;
  static isPackaged = !1;
  static isDarkMode = !1;
  static cc4ColorName;
}
export {
  Be as C,
  we as a,
  Ee as b,
  Ce as c,
  Pe as g,
  Z as i,
  ye as p,
  Me as u
};
//# sourceMappingURL=CmnLib.js.map
