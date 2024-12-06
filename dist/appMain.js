import Of, { ipcMain as pe, dialog as Nf, shell as If, BrowserWindow as Tf, app as It, screen as lo } from "electron";
import _e from "path";
import Hs from "util";
import ft from "fs";
import ef from "crypto";
import tf from "assert";
import Cf from "events";
import Df from "os";
import rf from "zlib";
import Af from "constants";
import Lf from "stream";
var bt = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function nf(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var wt = { exports: {} };
/*!
 * Platform.js v1.3.6
 * Copyright 2014-2020 Benjamin Tan
 * Copyright 2011-2013 John-David Dalton
 * Available under MIT license
 */
var kf = wt.exports, fo;
function jf() {
  return fo || (fo = 1, function(e, t) {
    (function() {
      var f = {
        function: !0,
        object: !0
      }, s = f[typeof window] && window || this, l = t, r = e && !e.nodeType && e, n = l && r && typeof bt == "object" && bt;
      n && (n.global === n || n.window === n || n.self === n) && (s = n);
      var c = Math.pow(2, 53) - 1, o = /\bOpera/, a = Object.prototype, h = a.hasOwnProperty, _ = a.toString;
      function E(b) {
        return b = String(b), b.charAt(0).toUpperCase() + b.slice(1);
      }
      function g(b, I, L) {
        var F = {
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
        return I && L && /^Win/i.test(b) && !/^Windows Phone /i.test(b) && (F = F[/[\d.]+$/.exec(b)]) && (b = "Windows " + F), b = String(b), I && L && (b = b.replace(RegExp(I, "i"), L)), b = R(
          b.replace(/ ce$/i, " CE").replace(/\bhpw/i, "web").replace(/\bMacintosh\b/, "Mac OS").replace(/_PowerPC\b/i, " OS").replace(/\b(OS X) [^ \d]+/i, "$1").replace(/\bMac (OS X)\b/, "$1").replace(/\/(\d)/, " $1").replace(/_/g, ".").replace(/(?: BePC|[ .]*fc[ \d.]+)$/i, "").replace(/\bx86\.64\b/gi, "x86_64").replace(/\b(Windows Phone) OS\b/, "$1").replace(/\b(Chrome OS \w+) [\d.]+\b/, "$1").split(" on ")[0]
        ), b;
      }
      function w(b, I) {
        var L = -1, F = b ? b.length : 0;
        if (typeof F == "number" && F > -1 && F <= c)
          for (; ++L < F; )
            I(b[L], L, b);
        else
          u(b, I);
      }
      function R(b) {
        return b = p(b), /^(?:webOS|i(?:OS|P))/.test(b) ? b : E(b);
      }
      function u(b, I) {
        for (var L in b)
          h.call(b, L) && I(b[L], L, b);
      }
      function d(b) {
        return b == null ? E(b) : _.call(b).slice(8, -1);
      }
      function i(b, I) {
        var L = b != null ? typeof b[I] : "number";
        return !/^(?:boolean|number|string|undefined)$/.test(L) && (L == "object" ? !!b[I] : !0);
      }
      function m(b) {
        return String(b).replace(/([ -])(?!$)/g, "$1?");
      }
      function v(b, I) {
        var L = null;
        return w(b, function(F, H) {
          L = I(L, F, H, b);
        }), L;
      }
      function p(b) {
        return String(b).replace(/^ +| +$/g, "");
      }
      function y(b) {
        var I = s, L = b && typeof b == "object" && d(b) != "String";
        L && (I = b, b = null);
        var F = I.navigator || {}, H = F.userAgent || "";
        b || (b = H);
        var U = L ? !!F.likeChrome : /\bChrome\b/.test(b) && !/internal|\n/i.test(_.toString()), V = "Object", K = L ? V : "ScriptBridgingProxyObject", J = L ? V : "Environment", W = L && I.java ? "JavaPackage" : d(I.java), M = L ? V : "RuntimeObject", G = /\bJava/.test(W) && I.java, A = G && d(I.environment) == J, T = G ? "a" : "α", q = G ? "b" : "β", C = I.document || {}, S = I.operamini || I.opera, P = o.test(P = L && S ? S["[[Class]]"] : d(S)) ? P : S = null, O, B = b, x = [], Q = null, Z = b == H, N = Z && S && typeof S.version == "function" && S.version(), D, k = ve([
          { label: "EdgeHTML", pattern: "Edge" },
          "Trident",
          { label: "WebKit", pattern: "AppleWebKit" },
          "iCab",
          "Presto",
          "NetFront",
          "Tasman",
          "KHTML",
          "Gecko"
        ]), j = le([
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
        ]), z = be([
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
        ]), Y = ue({
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
        }), X = ne([
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
        function ve(me) {
          return v(me, function(oe, ie) {
            return oe || RegExp("\\b" + (ie.pattern || m(ie)) + "\\b", "i").exec(b) && (ie.label || ie);
          });
        }
        function ue(me) {
          return v(me, function(oe, ie, $e) {
            return oe || (ie[z] || ie[/^[a-z]+(?: +[a-z]+\b)*/i.exec(z)] || RegExp("\\b" + m($e) + "(?:\\b|\\w*\\d)", "i").exec(b)) && $e;
          });
        }
        function le(me) {
          return v(me, function(oe, ie) {
            return oe || RegExp("\\b" + (ie.pattern || m(ie)) + "\\b", "i").exec(b) && (ie.label || ie);
          });
        }
        function ne(me) {
          return v(me, function(oe, ie) {
            var $e = ie.pattern || m(ie);
            return !oe && (oe = RegExp("\\b" + $e + "(?:/[\\d.]+|[ \\w.]*)", "i").exec(b)) && (oe = g(oe, $e, ie.label || ie)), oe;
          });
        }
        function be(me) {
          return v(me, function(oe, ie) {
            var $e = ie.pattern || m(ie);
            return !oe && (oe = RegExp("\\b" + $e + " *\\d+[.\\w_]*", "i").exec(b) || RegExp("\\b" + $e + " *\\w+-[\\w]*", "i").exec(b) || RegExp("\\b" + $e + "(?:; *(?:[a-z]+[_-])?[a-z]+\\d+|[^ ();-]*)", "i").exec(b)) && ((oe = String(ie.label && !RegExp($e, "i").test(ie.label) ? ie.label : oe).split("/"))[1] && !/[\d.]+/.test(oe[0]) && (oe[0] += " " + oe[1]), ie = ie.label || ie, oe = R(oe[0].replace(RegExp($e, "i"), ie).replace(RegExp("; *(?:" + ie + "[_-])?", "i"), " ").replace(RegExp("(" + ie + ")[-_.]?(\\w)", "i"), "$1 $2"))), oe;
          });
        }
        function he(me) {
          return v(me, function(oe, ie) {
            return oe || (RegExp(ie + "(?:-[\\d.]+/|(?: for [\\w-]+)?[ /-])([\\d.]+[^ ();/_-]*)", "i").exec(b) || 0)[1] || null;
          });
        }
        function Ue() {
          return this.description || "";
        }
        if (k && (k = [k]), /\bAndroid\b/.test(X) && !z && (O = /\bAndroid[^;]*;(.*?)(?:Build|\) AppleWebKit)\b/i.exec(b)) && (z = p(O[1]).replace(/^[a-z]{2}-[a-z]{2};\s*/i, "") || null), Y && !z ? z = be([Y]) : Y && z && (z = z.replace(RegExp("^(" + m(Y) + ")[-_.\\s]", "i"), Y + " ").replace(RegExp("^(" + m(Y) + ")[-_.]?(\\w)", "i"), Y + " $2")), (O = /\bGoogle TV\b/.exec(z)) && (z = O[0]), /\bSimulator\b/i.test(b) && (z = (z ? z + " " : "") + "Simulator"), j == "Opera Mini" && /\bOPiOS\b/.test(b) && x.push("running in Turbo/Uncompressed mode"), j == "IE" && /\blike iPhone OS\b/.test(b) ? (O = y(b.replace(/like iPhone OS/, "")), Y = O.manufacturer, z = O.product) : /^iP/.test(z) ? (j || (j = "Safari"), X = "iOS" + ((O = / OS ([\d_]+)/i.exec(b)) ? " " + O[1].replace(/_/g, ".") : "")) : j == "Konqueror" && /^Linux\b/i.test(X) ? X = "Kubuntu" : Y && Y != "Google" && (/Chrome/.test(j) && !/\bMobile Safari\b/i.test(b) || /\bVita\b/.test(z)) || /\bAndroid\b/.test(X) && /^Chrome/.test(j) && /\bVersion\//i.test(b) ? (j = "Android Browser", X = /\bAndroid\b/.test(X) ? X : "Android") : j == "Silk" ? (/\bMobi/i.test(b) || (X = "Android", x.unshift("desktop mode")), /Accelerated *= *true/i.test(b) && x.unshift("accelerated")) : j == "UC Browser" && /\bUCWEB\b/.test(b) ? x.push("speed mode") : j == "PaleMoon" && (O = /\bFirefox\/([\d.]+)\b/.exec(b)) ? x.push("identifying as Firefox " + O[1]) : j == "Firefox" && (O = /\b(Mobile|Tablet|TV)\b/i.exec(b)) ? (X || (X = "Firefox OS"), z || (z = O[1])) : !j || (O = !/\bMinefield\b/i.test(b) && /\b(?:Firefox|Safari)\b/.exec(j)) ? (j && !z && /[\/,]|^[^(]+?\)/.test(b.slice(b.indexOf(O + "/") + 8)) && (j = null), (O = z || Y || X) && (z || Y || /\b(?:Android|Symbian OS|Tablet OS|webOS)\b/.test(X)) && (j = /[a-z]+(?: Hat)?/i.exec(/\bAndroid\b/.test(X) ? X : O) + " Browser")) : j == "Electron" && (O = (/\bChrome\/([\d.]+)\b/.exec(b) || 0)[1]) && x.push("Chromium " + O), N || (N = he([
          "(?:Cloud9|CriOS|CrMo|Edge|Edg|EdgA|EdgiOS|FxiOS|HeadlessChrome|IEMobile|Iron|Opera ?Mini|OPiOS|OPR|Raven|SamsungBrowser|Silk(?!/[\\d.]+$)|UCBrowser|YaBrowser)",
          "Version",
          m(j),
          "(?:Firefox|Minefield|NetFront)"
        ])), (O = k == "iCab" && parseFloat(N) > 3 && "WebKit" || /\bOpera\b/.test(j) && (/\bOPR\b/.test(b) ? "Blink" : "Presto") || /\b(?:Midori|Nook|Safari)\b/i.test(b) && !/^(?:Trident|EdgeHTML)$/.test(k) && "WebKit" || !k && /\bMSIE\b/i.test(b) && (X == "Mac OS" ? "Tasman" : "Trident") || k == "WebKit" && /\bPlayStation\b(?! Vita\b)/i.test(j) && "NetFront") && (k = [O]), j == "IE" && (O = (/; *(?:XBLWP|ZuneWP)(\d+)/i.exec(b) || 0)[1]) ? (j += " Mobile", X = "Windows Phone " + (/\+$/.test(O) ? O : O + ".x"), x.unshift("desktop mode")) : /\bWPDesktop\b/i.test(b) ? (j = "IE Mobile", X = "Windows Phone 8.x", x.unshift("desktop mode"), N || (N = (/\brv:([\d.]+)/.exec(b) || 0)[1])) : j != "IE" && k == "Trident" && (O = /\brv:([\d.]+)/.exec(b)) && (j && x.push("identifying as " + j + (N ? " " + N : "")), j = "IE", N = O[1]), Z) {
          if (i(I, "global"))
            if (G && (O = G.lang.System, B = O.getProperty("os.arch"), X = X || O.getProperty("os.name") + " " + O.getProperty("os.version")), A) {
              try {
                N = I.require("ringo/engine").version.join("."), j = "RingoJS";
              } catch {
                (O = I.system) && O.global.system == I.system && (j = "Narwhal", X || (X = O[0].os || null));
              }
              j || (j = "Rhino");
            } else typeof I.process == "object" && !I.process.browser && (O = I.process) && (typeof O.versions == "object" && (typeof O.versions.electron == "string" ? (x.push("Node " + O.versions.node), j = "Electron", N = O.versions.electron) : typeof O.versions.nw == "string" && (x.push("Chromium " + N, "Node " + O.versions.node), j = "NW.js", N = O.versions.nw)), j || (j = "Node.js", B = O.arch, X = O.platform, N = /[\d.]+/.exec(O.version), N = N ? N[0] : null));
          else d(O = I.runtime) == K ? (j = "Adobe AIR", X = O.flash.system.Capabilities.os) : d(O = I.phantom) == M ? (j = "PhantomJS", N = (O = O.version || null) && O.major + "." + O.minor + "." + O.patch) : typeof C.documentMode == "number" && (O = /\bTrident\/(\d+)/i.exec(b)) ? (N = [N, C.documentMode], (O = +O[1] + 4) != N[1] && (x.push("IE " + N[1] + " mode"), k && (k[1] = ""), N[1] = O), N = j == "IE" ? String(N[1].toFixed(1)) : N[0]) : typeof C.documentMode == "number" && /^(?:Chrome|Firefox)\b/.test(j) && (x.push("masking as " + j + " " + N), j = "IE", N = "11.0", k = ["Trident"], X = "Windows");
          X = X && R(X);
        }
        if (N && (O = /(?:[ab]|dp|pre|[ab]\d+pre)(?:\d+\+?)?$/i.exec(N) || /(?:alpha|beta)(?: ?\d)?/i.exec(b + ";" + (Z && F.appMinorVersion)) || /\bMinefield\b/i.test(b) && "a") && (Q = /b/i.test(O) ? "beta" : "alpha", N = N.replace(RegExp(O + "\\+?$"), "") + (Q == "beta" ? q : T) + (/\d+\+?/.exec(O) || "")), j == "Fennec" || j == "Firefox" && /\b(?:Android|Firefox OS|KaiOS)\b/.test(X))
          j = "Firefox Mobile";
        else if (j == "Maxthon" && N)
          N = N.replace(/\.[\d.]+/, ".x");
        else if (/\bXbox\b/i.test(z))
          z == "Xbox 360" && (X = null), z == "Xbox 360" && /\bIEMobile\b/.test(b) && x.unshift("mobile mode");
        else if ((/^(?:Chrome|IE|Opera)$/.test(j) || j && !z && !/Browser|Mobi/.test(j)) && (X == "Windows CE" || /Mobi/i.test(b)))
          j += " Mobile";
        else if (j == "IE" && Z)
          try {
            I.external === null && x.unshift("platform preview");
          } catch {
            x.unshift("embedded");
          }
        else (/\bBlackBerry\b/.test(z) || /\bBB10\b/.test(b)) && (O = (RegExp(z.replace(/ +/g, " *") + "/([.\\d]+)", "i").exec(b) || 0)[1] || N) ? (O = [O, /BB10/.test(b)], X = (O[1] ? (z = null, Y = "BlackBerry") : "Device Software") + " " + O[0], N = null) : this != u && z != "Wii" && (Z && S || /Opera/.test(j) && /\b(?:MSIE|Firefox)\b/i.test(b) || j == "Firefox" && /\bOS X (?:\d+\.){2,}/.test(X) || j == "IE" && (X && !/^Win/.test(X) && N > 5.5 || /\bWindows XP\b/.test(X) && N > 8 || N == 8 && !/\bTrident\b/.test(b))) && !o.test(O = y.call(u, b.replace(o, "") + ";")) && O.name && (O = "ing as " + O.name + ((O = O.version) ? " " + O : ""), o.test(j) ? (/\bIE\b/.test(O) && X == "Mac OS" && (X = null), O = "identify" + O) : (O = "mask" + O, P ? j = R(P.replace(/([a-z])([A-Z])/g, "$1 $2")) : j = "Opera", /\bIE\b/.test(O) && (X = null), Z || (N = null)), k = ["Presto"], x.push(O));
        (O = (/\bAppleWebKit\/([\d.]+\+?)/i.exec(b) || 0)[1]) && (O = [parseFloat(O.replace(/\.(\d)$/, ".0$1")), O], j == "Safari" && O[1].slice(-1) == "+" ? (j = "WebKit Nightly", Q = "alpha", N = O[1].slice(0, -1)) : (N == O[1] || N == (O[2] = (/\bSafari\/([\d.]+\+?)/i.exec(b) || 0)[1])) && (N = null), O[1] = (/\b(?:Headless)?Chrome\/([\d.]+)/i.exec(b) || 0)[1], O[0] == 537.36 && O[2] == 537.36 && parseFloat(O[1]) >= 28 && k == "WebKit" && (k = ["Blink"]), !Z || !U && !O[1] ? (k && (k[1] = "like Safari"), O = (O = O[0], O < 400 ? 1 : O < 500 ? 2 : O < 526 ? 3 : O < 533 ? 4 : O < 534 ? "4+" : O < 535 ? 5 : O < 537 ? 6 : O < 538 ? 7 : O < 601 ? 8 : O < 602 ? 9 : O < 604 ? 10 : O < 606 ? 11 : O < 608 ? 12 : "12")) : (k && (k[1] = "like Chrome"), O = O[1] || (O = O[0], O < 530 ? 1 : O < 532 ? 2 : O < 532.05 ? 3 : O < 533 ? 4 : O < 534.03 ? 5 : O < 534.07 ? 6 : O < 534.1 ? 7 : O < 534.13 ? 8 : O < 534.16 ? 9 : O < 534.24 ? 10 : O < 534.3 ? 11 : O < 535.01 ? 12 : O < 535.02 ? "13+" : O < 535.07 ? 15 : O < 535.11 ? 16 : O < 535.19 ? 17 : O < 536.05 ? 18 : O < 536.1 ? 19 : O < 537.01 ? 20 : O < 537.11 ? "21+" : O < 537.13 ? 23 : O < 537.18 ? 24 : O < 537.24 ? 25 : O < 537.36 ? 26 : k != "Blink" ? "27" : "28")), k && (k[1] += " " + (O += typeof O == "number" ? ".x" : /[.+]/.test(O) ? "" : "+")), j == "Safari" && (!N || parseInt(N) > 45) ? N = O : j == "Chrome" && /\bHeadlessChrome/i.test(b) && x.unshift("headless")), j == "Opera" && (O = /\bzbov|zvav$/.exec(X)) ? (j += " ", x.unshift("desktop mode"), O == "zvav" ? (j += "Mini", N = null) : j += "Mobile", X = X.replace(RegExp(" *" + O + "$"), "")) : j == "Safari" && /\bChrome\b/.exec(k && k[1]) ? (x.unshift("desktop mode"), j = "Chrome Mobile", N = null, /\bOS X\b/.test(X) ? (Y = "Apple", X = "iOS 4.3+") : X = null) : /\bSRWare Iron\b/.test(j) && !N && (N = he("Chrome")), N && N.indexOf(O = /[\d.]+$/.exec(X)) == 0 && b.indexOf("/" + O + "-") > -1 && (X = p(X.replace(O, ""))), X && X.indexOf(j) != -1 && !RegExp(j + " OS").test(X) && (X = X.replace(RegExp(" *" + m(j) + " *"), "")), k && !/\b(?:Avant|Nook)\b/.test(j) && (/Browser|Lunascape|Maxthon/.test(j) || j != "Safari" && /^iOS/.test(X) && /\bSafari\b/.test(k[1]) || /^(?:Adobe|Arora|Breach|Midori|Opera|Phantom|Rekonq|Rock|Samsung Internet|Sleipnir|SRWare Iron|Vivaldi|Web)/.test(j) && k[1]) && (O = k[k.length - 1]) && x.push(O), x.length && (x = ["(" + x.join("; ") + ")"]), Y && z && z.indexOf(Y) < 0 && x.push("on " + Y), z && x.push((/^on /.test(x[x.length - 1]) ? "" : "on ") + z), X && (O = / ([\d.+]+)$/.exec(X), D = O && X.charAt(X.length - O[0].length - 1) == "/", X = {
          architecture: 32,
          family: O && !D ? X.replace(O[0], "") : X,
          version: O ? O[1] : null,
          toString: function() {
            var me = this.version;
            return this.family + (me && !D ? " " + me : "") + (this.architecture == 64 ? " 64-bit" : "");
          }
        }), (O = /\b(?:AMD|IA|Win|WOW|x86_|x)64\b/i.exec(B)) && !/\bi686\b/i.test(B) ? (X && (X.architecture = 64, X.family = X.family.replace(RegExp(" *" + O), "")), j && (/\bWOW64\b/i.test(b) || Z && /\w(?:86|32)$/.test(F.cpuClass || F.platform) && !/\bWin64; x64\b/i.test(b)) && x.unshift("32-bit")) : X && /^OS X/.test(X.family) && j == "Chrome" && parseFloat(N) >= 39 && (X.architecture = 64), b || (b = null);
        var ge = {};
        return ge.description = b, ge.layout = k && k[0], ge.manufacturer = Y, ge.name = j, ge.prerelease = Q, ge.product = z, ge.ua = b, ge.version = j && N, ge.os = X || {
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
        }, ge.parse = y, ge.toString = Ue, ge.version && x.unshift(N), ge.name && x.unshift(j), X && j && !(X == String(X).split(" ")[0] && (X == j.split(" ")[0] || z)) && x.push(z ? "(" + X + ")" : "on " + X), x.length && (ge.description = x.join(" ")), ge;
      }
      var $ = y();
      l && r ? u($, function(b, I) {
        l[I] = b;
      }) : s.platform = $;
    }).call(kf);
  }(wt, wt.exports)), wt.exports;
}
var mt = jf();
function sf(e) {
  return parseInt(String(e), 10);
}
"toInt" in String.prototype || (String.prototype.toInt = function() {
  return sf(this);
});
"toUint" in String.prototype || (String.prototype.toUint = function() {
  const e = sf(this);
  return e < 0 ? -e : e;
});
class Un {
  static stageW = 0;
  static stageH = 0;
  static debugLog = !1;
  static isSafari = mt.name === "Safari";
  static isFirefox = mt.name === "Firefox";
  static isMac = /OS X/.test(mt.os?.family ?? "");
  static isWin = /Windows/.test(mt.os?.family ?? "");
  static isMobile = !/(Windows|OS X)/.test(mt.os?.family ?? "");
  static hDip = {};
  static isDbg = !1;
  static isPackaged = !1;
  static isDarkMode = !1;
  static cc4ColorName;
}
var St = { exports: {} }, Vn, ho;
function qf() {
  return ho || (ho = 1, Vn = (e) => {
    const t = typeof e;
    return e !== null && (t === "object" || t === "function");
  }), Vn;
}
var zn, mo;
function Ff() {
  if (mo) return zn;
  mo = 1;
  const e = qf(), t = /* @__PURE__ */ new Set([
    "__proto__",
    "prototype",
    "constructor"
  ]), f = (l) => !l.some((r) => t.has(r));
  function s(l) {
    const r = l.split("."), n = [];
    for (let c = 0; c < r.length; c++) {
      let o = r[c];
      for (; o[o.length - 1] === "\\" && r[c + 1] !== void 0; )
        o = o.slice(0, -1) + ".", o += r[++c];
      n.push(o);
    }
    return f(n) ? n : [];
  }
  return zn = {
    get(l, r, n) {
      if (!e(l) || typeof r != "string")
        return n === void 0 ? l : n;
      const c = s(r);
      if (c.length !== 0) {
        for (let o = 0; o < c.length; o++)
          if (l = l[c[o]], l == null) {
            if (o !== c.length - 1)
              return n;
            break;
          }
        return l === void 0 ? n : l;
      }
    },
    set(l, r, n) {
      if (!e(l) || typeof r != "string")
        return l;
      const c = l, o = s(r);
      for (let a = 0; a < o.length; a++) {
        const h = o[a];
        e(l[h]) || (l[h] = {}), a === o.length - 1 && (l[h] = n), l = l[h];
      }
      return c;
    },
    delete(l, r) {
      if (!e(l) || typeof r != "string")
        return !1;
      const n = s(r);
      for (let c = 0; c < n.length; c++) {
        const o = n[c];
        if (c === n.length - 1)
          return delete l[o], !0;
        if (l = l[o], !e(l))
          return !1;
      }
    },
    has(l, r) {
      if (!e(l) || typeof r != "string")
        return !1;
      const n = s(r);
      if (n.length === 0)
        return !1;
      for (let c = 0; c < n.length; c++)
        if (e(l)) {
          if (!(n[c] in l))
            return !1;
          l = l[n[c]];
        } else
          return !1;
      return !0;
    }
  }, zn;
}
var Tt = { exports: {} }, Ct = { exports: {} }, Dt = { exports: {} }, At = { exports: {} }, po;
function Mf() {
  if (po) return At.exports;
  po = 1;
  const e = ft;
  return At.exports = (t) => new Promise((f) => {
    e.access(t, (s) => {
      f(!s);
    });
  }), At.exports.sync = (t) => {
    try {
      return e.accessSync(t), !0;
    } catch {
      return !1;
    }
  }, At.exports;
}
var Lt = { exports: {} }, kt = { exports: {} }, yo;
function Uf() {
  if (yo) return kt.exports;
  yo = 1;
  const e = (t, ...f) => new Promise((s) => {
    s(t(...f));
  });
  return kt.exports = e, kt.exports.default = e, kt.exports;
}
var vo;
function Vf() {
  if (vo) return Lt.exports;
  vo = 1;
  const e = Uf(), t = (f) => {
    if (!((Number.isInteger(f) || f === 1 / 0) && f > 0))
      return Promise.reject(new TypeError("Expected `concurrency` to be a number from 1 and up"));
    const s = [];
    let l = 0;
    const r = () => {
      l--, s.length > 0 && s.shift()();
    }, n = (a, h, ..._) => {
      l++;
      const E = e(a, ..._);
      h(E), E.then(r, r);
    }, c = (a, h, ..._) => {
      l < f ? n(a, h, ..._) : s.push(n.bind(null, a, h, ..._));
    }, o = (a, ...h) => new Promise((_) => c(a, _, ...h));
    return Object.defineProperties(o, {
      activeCount: {
        get: () => l
      },
      pendingCount: {
        get: () => s.length
      },
      clearQueue: {
        value: () => {
          s.length = 0;
        }
      }
    }), o;
  };
  return Lt.exports = t, Lt.exports.default = t, Lt.exports;
}
var xn, go;
function zf() {
  if (go) return xn;
  go = 1;
  const e = Vf();
  class t extends Error {
    constructor(r) {
      super(), this.value = r;
    }
  }
  const f = (l, r) => Promise.resolve(l).then(r), s = (l) => Promise.all(l).then((r) => r[1] === !0 && Promise.reject(new t(r[0])));
  return xn = (l, r, n) => {
    n = Object.assign({
      concurrency: 1 / 0,
      preserveOrder: !0
    }, n);
    const c = e(n.concurrency), o = [...l].map((h) => [h, c(f, h, r)]), a = e(n.preserveOrder ? 1 : 1 / 0);
    return Promise.all(o.map((h) => a(s, h))).then(() => {
    }).catch((h) => h instanceof t ? h.value : Promise.reject(h));
  }, xn;
}
var _o;
function xf() {
  if (_o) return Dt.exports;
  _o = 1;
  const e = _e, t = Mf(), f = zf();
  return Dt.exports = (s, l) => (l = Object.assign({
    cwd: process.cwd()
  }, l), f(s, (r) => t(e.resolve(l.cwd, r)), l)), Dt.exports.sync = (s, l) => {
    l = Object.assign({
      cwd: process.cwd()
    }, l);
    for (const r of s)
      if (t.sync(e.resolve(l.cwd, r)))
        return r;
  }, Dt.exports;
}
var $o;
function Gf() {
  if ($o) return Ct.exports;
  $o = 1;
  const e = _e, t = xf();
  return Ct.exports = (f, s = {}) => {
    const l = e.resolve(s.cwd || ""), { root: r } = e.parse(l), n = [].concat(f);
    return new Promise((c) => {
      (function o(a) {
        t(n, { cwd: a }).then((h) => {
          h ? c(e.join(a, h)) : a === r ? c(null) : o(e.dirname(a));
        });
      })(l);
    });
  }, Ct.exports.sync = (f, s = {}) => {
    let l = e.resolve(s.cwd || "");
    const { root: r } = e.parse(l), n = [].concat(f);
    for (; ; ) {
      const c = t.sync(n, { cwd: l });
      if (c)
        return e.join(l, c);
      if (l === r)
        return null;
      l = e.dirname(l);
    }
  }, Ct.exports;
}
var Eo;
function Kf() {
  if (Eo) return Tt.exports;
  Eo = 1;
  const e = Gf();
  return Tt.exports = async ({ cwd: t } = {}) => e("package.json", { cwd: t }), Tt.exports.sync = ({ cwd: t } = {}) => e.sync("package.json", { cwd: t }), Tt.exports;
}
var jt = { exports: {} }, wo;
function Bf() {
  if (wo) return jt.exports;
  wo = 1;
  const e = _e, t = Df, f = t.homedir(), s = t.tmpdir(), { env: l } = process, r = (a) => {
    const h = e.join(f, "Library");
    return {
      data: e.join(h, "Application Support", a),
      config: e.join(h, "Preferences", a),
      cache: e.join(h, "Caches", a),
      log: e.join(h, "Logs", a),
      temp: e.join(s, a)
    };
  }, n = (a) => {
    const h = l.APPDATA || e.join(f, "AppData", "Roaming"), _ = l.LOCALAPPDATA || e.join(f, "AppData", "Local");
    return {
      // Data/config/cache/log are invented by me as Windows isn't opinionated about this
      data: e.join(_, a, "Data"),
      config: e.join(h, a, "Config"),
      cache: e.join(_, a, "Cache"),
      log: e.join(_, a, "Log"),
      temp: e.join(s, a)
    };
  }, c = (a) => {
    const h = e.basename(f);
    return {
      data: e.join(l.XDG_DATA_HOME || e.join(f, ".local", "share"), a),
      config: e.join(l.XDG_CONFIG_HOME || e.join(f, ".config"), a),
      cache: e.join(l.XDG_CACHE_HOME || e.join(f, ".cache"), a),
      // https://wiki.debian.org/XDGBaseDirectorySpecification#state
      log: e.join(l.XDG_STATE_HOME || e.join(f, ".local", "state"), a),
      temp: e.join(s, h, a)
    };
  }, o = (a, h) => {
    if (typeof a != "string")
      throw new TypeError(`Expected string, got ${typeof a}`);
    return h = Object.assign({ suffix: "nodejs" }, h), h.suffix && (a += `-${h.suffix}`), process.platform === "darwin" ? r(a) : process.platform === "win32" ? n(a) : c(a);
  };
  return jt.exports = o, jt.exports.default = o, jt.exports;
}
var De = {}, ye = {}, So;
function Rt() {
  if (So) return ye;
  So = 1, Object.defineProperty(ye, "__esModule", { value: !0 }), ye.NOOP = ye.LIMIT_FILES_DESCRIPTORS = ye.LIMIT_BASENAME_LENGTH = ye.IS_USER_ROOT = ye.IS_POSIX = ye.DEFAULT_TIMEOUT_SYNC = ye.DEFAULT_TIMEOUT_ASYNC = ye.DEFAULT_WRITE_OPTIONS = ye.DEFAULT_READ_OPTIONS = ye.DEFAULT_FOLDER_MODE = ye.DEFAULT_FILE_MODE = ye.DEFAULT_ENCODING = void 0;
  const e = "utf8";
  ye.DEFAULT_ENCODING = e;
  const t = 438;
  ye.DEFAULT_FILE_MODE = t;
  const f = 511;
  ye.DEFAULT_FOLDER_MODE = f;
  const s = {};
  ye.DEFAULT_READ_OPTIONS = s;
  const l = {};
  ye.DEFAULT_WRITE_OPTIONS = l;
  const r = 5e3;
  ye.DEFAULT_TIMEOUT_ASYNC = r;
  const n = 100;
  ye.DEFAULT_TIMEOUT_SYNC = n;
  const c = !!process.getuid;
  ye.IS_POSIX = c;
  const o = process.getuid ? !process.getuid() : !1;
  ye.IS_USER_ROOT = o;
  const a = 128;
  ye.LIMIT_BASENAME_LENGTH = a;
  const h = 1e4;
  ye.LIMIT_FILES_DESCRIPTORS = h;
  const _ = () => {
  };
  return ye.NOOP = _, ye;
}
var qt = {}, Ze = {}, bo;
function Hf() {
  if (bo) return Ze;
  bo = 1, Object.defineProperty(Ze, "__esModule", { value: !0 }), Ze.attemptifySync = Ze.attemptifyAsync = void 0;
  const e = Rt(), t = (s, l = e.NOOP) => function() {
    return s.apply(void 0, arguments).catch(l);
  };
  Ze.attemptifyAsync = t;
  const f = (s, l = e.NOOP) => function() {
    try {
      return s.apply(void 0, arguments);
    } catch (r) {
      return l(r);
    }
  };
  return Ze.attemptifySync = f, Ze;
}
var Ft = {}, Ro;
function Wf() {
  if (Ro) return Ft;
  Ro = 1, Object.defineProperty(Ft, "__esModule", { value: !0 });
  const e = Rt(), t = {
    isChangeErrorOk: (f) => {
      const { code: s } = f;
      return s === "ENOSYS" || !e.IS_USER_ROOT && (s === "EINVAL" || s === "EPERM");
    },
    isRetriableError: (f) => {
      const { code: s } = f;
      return s === "EMFILE" || s === "ENFILE" || s === "EAGAIN" || s === "EBUSY" || s === "EACCESS" || s === "EACCS" || s === "EPERM";
    },
    onChangeError: (f) => {
      if (!t.isChangeErrorOk(f))
        throw f;
    }
  };
  return Ft.default = t, Ft;
}
var Ye = {}, Mt = {}, Po;
function Xf() {
  if (Po) return Mt;
  Po = 1, Object.defineProperty(Mt, "__esModule", { value: !0 });
  const t = {
    interval: 25,
    intervalId: void 0,
    limit: Rt().LIMIT_FILES_DESCRIPTORS,
    queueActive: /* @__PURE__ */ new Set(),
    queueWaiting: /* @__PURE__ */ new Set(),
    init: () => {
      t.intervalId || (t.intervalId = setInterval(t.tick, t.interval));
    },
    reset: () => {
      t.intervalId && (clearInterval(t.intervalId), delete t.intervalId);
    },
    add: (f) => {
      t.queueWaiting.add(f), t.queueActive.size < t.limit / 2 ? t.tick() : t.init();
    },
    remove: (f) => {
      t.queueWaiting.delete(f), t.queueActive.delete(f);
    },
    schedule: () => new Promise((f) => {
      const s = () => t.remove(l), l = () => f(s);
      t.add(l);
    }),
    tick: () => {
      if (!(t.queueActive.size >= t.limit)) {
        if (!t.queueWaiting.size)
          return t.reset();
        for (const f of t.queueWaiting) {
          if (t.queueActive.size >= t.limit)
            break;
          t.queueWaiting.delete(f), t.queueActive.add(f), f();
        }
      }
    }
  };
  return Mt.default = t, Mt;
}
var Oo;
function Jf() {
  if (Oo) return Ye;
  Oo = 1, Object.defineProperty(Ye, "__esModule", { value: !0 }), Ye.retryifySync = Ye.retryifyAsync = void 0;
  const e = Xf(), t = (s, l) => function(r) {
    return function n() {
      return e.default.schedule().then((c) => s.apply(void 0, arguments).then((o) => (c(), o), (o) => {
        if (c(), Date.now() >= r)
          throw o;
        if (l(o)) {
          const a = Math.round(100 + 400 * Math.random());
          return new Promise((_) => setTimeout(_, a)).then(() => n.apply(void 0, arguments));
        }
        throw o;
      }));
    };
  };
  Ye.retryifyAsync = t;
  const f = (s, l) => function(r) {
    return function n() {
      try {
        return s.apply(void 0, arguments);
      } catch (c) {
        if (Date.now() > r)
          throw c;
        if (l(c))
          return n.apply(void 0, arguments);
        throw c;
      }
    };
  };
  return Ye.retryifySync = f, Ye;
}
var No;
function of() {
  if (No) return qt;
  No = 1, Object.defineProperty(qt, "__esModule", { value: !0 });
  const e = ft, t = Hs, f = Hf(), s = Wf(), l = Jf(), r = {
    chmodAttempt: f.attemptifyAsync(t.promisify(e.chmod), s.default.onChangeError),
    chownAttempt: f.attemptifyAsync(t.promisify(e.chown), s.default.onChangeError),
    closeAttempt: f.attemptifyAsync(t.promisify(e.close)),
    fsyncAttempt: f.attemptifyAsync(t.promisify(e.fsync)),
    mkdirAttempt: f.attemptifyAsync(t.promisify(e.mkdir)),
    realpathAttempt: f.attemptifyAsync(t.promisify(e.realpath)),
    statAttempt: f.attemptifyAsync(t.promisify(e.stat)),
    unlinkAttempt: f.attemptifyAsync(t.promisify(e.unlink)),
    closeRetry: l.retryifyAsync(t.promisify(e.close), s.default.isRetriableError),
    fsyncRetry: l.retryifyAsync(t.promisify(e.fsync), s.default.isRetriableError),
    openRetry: l.retryifyAsync(t.promisify(e.open), s.default.isRetriableError),
    readFileRetry: l.retryifyAsync(t.promisify(e.readFile), s.default.isRetriableError),
    renameRetry: l.retryifyAsync(t.promisify(e.rename), s.default.isRetriableError),
    statRetry: l.retryifyAsync(t.promisify(e.stat), s.default.isRetriableError),
    writeRetry: l.retryifyAsync(t.promisify(e.write), s.default.isRetriableError),
    chmodSyncAttempt: f.attemptifySync(e.chmodSync, s.default.onChangeError),
    chownSyncAttempt: f.attemptifySync(e.chownSync, s.default.onChangeError),
    closeSyncAttempt: f.attemptifySync(e.closeSync),
    mkdirSyncAttempt: f.attemptifySync(e.mkdirSync),
    realpathSyncAttempt: f.attemptifySync(e.realpathSync),
    statSyncAttempt: f.attemptifySync(e.statSync),
    unlinkSyncAttempt: f.attemptifySync(e.unlinkSync),
    closeSyncRetry: l.retryifySync(e.closeSync, s.default.isRetriableError),
    fsyncSyncRetry: l.retryifySync(e.fsyncSync, s.default.isRetriableError),
    openSyncRetry: l.retryifySync(e.openSync, s.default.isRetriableError),
    readFileSyncRetry: l.retryifySync(e.readFileSync, s.default.isRetriableError),
    renameSyncRetry: l.retryifySync(e.renameSync, s.default.isRetriableError),
    statSyncRetry: l.retryifySync(e.statSync, s.default.isRetriableError),
    writeSyncRetry: l.retryifySync(e.writeSync, s.default.isRetriableError)
  };
  return qt.default = r, qt;
}
var Ut = {}, Io;
function Zf() {
  if (Io) return Ut;
  Io = 1, Object.defineProperty(Ut, "__esModule", { value: !0 });
  const e = {
    isFunction: (t) => typeof t == "function",
    isString: (t) => typeof t == "string",
    isUndefined: (t) => typeof t > "u"
  };
  return Ut.default = e, Ut;
}
var Vt = {}, To;
function Yf() {
  if (To) return Vt;
  To = 1, Object.defineProperty(Vt, "__esModule", { value: !0 });
  const e = {}, t = {
    next: (f) => {
      const s = e[f];
      if (!s)
        return;
      s.shift();
      const l = s[0];
      l ? l(() => t.next(f)) : delete e[f];
    },
    schedule: (f) => new Promise((s) => {
      let l = e[f];
      l || (l = e[f] = []), l.push(s), !(l.length > 1) && s(() => t.next(f));
    })
  };
  return Vt.default = t, Vt;
}
var zt = {}, Co;
function Qf() {
  if (Co) return zt;
  Co = 1, Object.defineProperty(zt, "__esModule", { value: !0 });
  const e = _e, t = Rt(), f = of(), s = {
    store: {},
    create: (l) => {
      const r = `000000${Math.floor(Math.random() * 16777215).toString(16)}`.slice(-6), n = Date.now().toString().slice(-10), c = "tmp-", o = `.${c}${n}${r}`;
      return `${l}${o}`;
    },
    get: (l, r, n = !0) => {
      const c = s.truncate(r(l));
      return c in s.store ? s.get(l, r, n) : (s.store[c] = n, [c, () => delete s.store[c]]);
    },
    purge: (l) => {
      s.store[l] && (delete s.store[l], f.default.unlinkAttempt(l));
    },
    purgeSync: (l) => {
      s.store[l] && (delete s.store[l], f.default.unlinkSyncAttempt(l));
    },
    purgeSyncAll: () => {
      for (const l in s.store)
        s.purgeSync(l);
    },
    truncate: (l) => {
      const r = e.basename(l);
      if (r.length <= t.LIMIT_BASENAME_LENGTH)
        return l;
      const n = /^(\.?)(.*?)((?:\.[^.]+)?(?:\.tmp-\d{10}[a-f0-9]{6})?)$/.exec(r);
      if (!n)
        return l;
      const c = r.length - t.LIMIT_BASENAME_LENGTH;
      return `${l.slice(0, -r.length)}${n[1]}${n[2].slice(0, -c)}${n[3]}`;
    }
  };
  return process.on("exit", s.purgeSyncAll), zt.default = s, zt;
}
var Do;
function ed() {
  if (Do) return De;
  Do = 1, Object.defineProperty(De, "__esModule", { value: !0 }), De.writeFileSync = De.writeFile = De.readFileSync = De.readFile = void 0;
  const e = _e, t = Rt(), f = of(), s = Zf(), l = Yf(), r = Qf();
  function n(_, E = t.DEFAULT_READ_OPTIONS) {
    var g;
    if (s.default.isString(E))
      return n(_, { encoding: E });
    const w = Date.now() + ((g = E.timeout) !== null && g !== void 0 ? g : t.DEFAULT_TIMEOUT_ASYNC);
    return f.default.readFileRetry(w)(_, E);
  }
  De.readFile = n;
  function c(_, E = t.DEFAULT_READ_OPTIONS) {
    var g;
    if (s.default.isString(E))
      return c(_, { encoding: E });
    const w = Date.now() + ((g = E.timeout) !== null && g !== void 0 ? g : t.DEFAULT_TIMEOUT_SYNC);
    return f.default.readFileSyncRetry(w)(_, E);
  }
  De.readFileSync = c;
  const o = (_, E, g, w) => {
    if (s.default.isFunction(g))
      return o(_, E, t.DEFAULT_WRITE_OPTIONS, g);
    const R = a(_, E, g);
    return w && R.then(w, w), R;
  };
  De.writeFile = o;
  const a = async (_, E, g = t.DEFAULT_WRITE_OPTIONS) => {
    var w;
    if (s.default.isString(g))
      return a(_, E, { encoding: g });
    const R = Date.now() + ((w = g.timeout) !== null && w !== void 0 ? w : t.DEFAULT_TIMEOUT_ASYNC);
    let u = null, d = null, i = null, m = null, v = null;
    try {
      g.schedule && (u = await g.schedule(_)), d = await l.default.schedule(_), _ = await f.default.realpathAttempt(_) || _, [m, i] = r.default.get(_, g.tmpCreate || r.default.create, g.tmpPurge !== !1);
      const p = t.IS_POSIX && s.default.isUndefined(g.chown), y = s.default.isUndefined(g.mode);
      if (p || y) {
        const b = await f.default.statAttempt(_);
        b && (g = { ...g }, p && (g.chown = { uid: b.uid, gid: b.gid }), y && (g.mode = b.mode));
      }
      const $ = e.dirname(_);
      await f.default.mkdirAttempt($, {
        mode: t.DEFAULT_FOLDER_MODE,
        recursive: !0
      }), v = await f.default.openRetry(R)(m, "w", g.mode || t.DEFAULT_FILE_MODE), g.tmpCreated && g.tmpCreated(m), s.default.isString(E) ? await f.default.writeRetry(R)(v, E, 0, g.encoding || t.DEFAULT_ENCODING) : s.default.isUndefined(E) || await f.default.writeRetry(R)(v, E, 0, E.length, 0), g.fsync !== !1 && (g.fsyncWait !== !1 ? await f.default.fsyncRetry(R)(v) : f.default.fsyncAttempt(v)), await f.default.closeRetry(R)(v), v = null, g.chown && await f.default.chownAttempt(m, g.chown.uid, g.chown.gid), g.mode && await f.default.chmodAttempt(m, g.mode);
      try {
        await f.default.renameRetry(R)(m, _);
      } catch (b) {
        if (b.code !== "ENAMETOOLONG")
          throw b;
        await f.default.renameRetry(R)(m, r.default.truncate(_));
      }
      i(), m = null;
    } finally {
      v && await f.default.closeAttempt(v), m && r.default.purge(m), u && u(), d && d();
    }
  }, h = (_, E, g = t.DEFAULT_WRITE_OPTIONS) => {
    var w;
    if (s.default.isString(g))
      return h(_, E, { encoding: g });
    const R = Date.now() + ((w = g.timeout) !== null && w !== void 0 ? w : t.DEFAULT_TIMEOUT_SYNC);
    let u = null, d = null, i = null;
    try {
      _ = f.default.realpathSyncAttempt(_) || _, [d, u] = r.default.get(_, g.tmpCreate || r.default.create, g.tmpPurge !== !1);
      const m = t.IS_POSIX && s.default.isUndefined(g.chown), v = s.default.isUndefined(g.mode);
      if (m || v) {
        const y = f.default.statSyncAttempt(_);
        y && (g = { ...g }, m && (g.chown = { uid: y.uid, gid: y.gid }), v && (g.mode = y.mode));
      }
      const p = e.dirname(_);
      f.default.mkdirSyncAttempt(p, {
        mode: t.DEFAULT_FOLDER_MODE,
        recursive: !0
      }), i = f.default.openSyncRetry(R)(d, "w", g.mode || t.DEFAULT_FILE_MODE), g.tmpCreated && g.tmpCreated(d), s.default.isString(E) ? f.default.writeSyncRetry(R)(i, E, 0, g.encoding || t.DEFAULT_ENCODING) : s.default.isUndefined(E) || f.default.writeSyncRetry(R)(i, E, 0, E.length, 0), g.fsync !== !1 && (g.fsyncWait !== !1 ? f.default.fsyncSyncRetry(R)(i) : f.default.fsyncAttempt(i)), f.default.closeSyncRetry(R)(i), i = null, g.chown && f.default.chownSyncAttempt(d, g.chown.uid, g.chown.gid), g.mode && f.default.chmodSyncAttempt(d, g.mode);
      try {
        f.default.renameSyncRetry(R)(d, _);
      } catch (y) {
        if (y.code !== "ENAMETOOLONG")
          throw y;
        f.default.renameSyncRetry(R)(d, r.default.truncate(_));
      }
      u(), d = null;
    } finally {
      i && f.default.closeSyncAttempt(i), d && r.default.purge(d);
    }
  };
  return De.writeFileSync = h, De;
}
var xt = { exports: {} }, Gn = {}, Ve = {}, Qe = {}, Kn = {}, Bn = {}, Hn = {}, Ao;
function $n() {
  return Ao || (Ao = 1, function(e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.regexpCode = e.getEsmExportName = e.getProperty = e.safeStringify = e.stringify = e.strConcat = e.addCodeArg = e.str = e._ = e.nil = e._Code = e.Name = e.IDENTIFIER = e._CodeOrName = void 0;
    class t {
    }
    e._CodeOrName = t, e.IDENTIFIER = /^[a-z$_][a-z$_0-9]*$/i;
    class f extends t {
      constructor(i) {
        if (super(), !e.IDENTIFIER.test(i))
          throw new Error("CodeGen: name must be a valid identifier");
        this.str = i;
      }
      toString() {
        return this.str;
      }
      emptyStr() {
        return !1;
      }
      get names() {
        return { [this.str]: 1 };
      }
    }
    e.Name = f;
    class s extends t {
      constructor(i) {
        super(), this._items = typeof i == "string" ? [i] : i;
      }
      toString() {
        return this.str;
      }
      emptyStr() {
        if (this._items.length > 1)
          return !1;
        const i = this._items[0];
        return i === "" || i === '""';
      }
      get str() {
        var i;
        return (i = this._str) !== null && i !== void 0 ? i : this._str = this._items.reduce((m, v) => `${m}${v}`, "");
      }
      get names() {
        var i;
        return (i = this._names) !== null && i !== void 0 ? i : this._names = this._items.reduce((m, v) => (v instanceof f && (m[v.str] = (m[v.str] || 0) + 1), m), {});
      }
    }
    e._Code = s, e.nil = new s("");
    function l(d, ...i) {
      const m = [d[0]];
      let v = 0;
      for (; v < i.length; )
        c(m, i[v]), m.push(d[++v]);
      return new s(m);
    }
    e._ = l;
    const r = new s("+");
    function n(d, ...i) {
      const m = [g(d[0])];
      let v = 0;
      for (; v < i.length; )
        m.push(r), c(m, i[v]), m.push(r, g(d[++v]));
      return o(m), new s(m);
    }
    e.str = n;
    function c(d, i) {
      i instanceof s ? d.push(...i._items) : i instanceof f ? d.push(i) : d.push(_(i));
    }
    e.addCodeArg = c;
    function o(d) {
      let i = 1;
      for (; i < d.length - 1; ) {
        if (d[i] === r) {
          const m = a(d[i - 1], d[i + 1]);
          if (m !== void 0) {
            d.splice(i - 1, 3, m);
            continue;
          }
          d[i++] = "+";
        }
        i++;
      }
    }
    function a(d, i) {
      if (i === '""')
        return d;
      if (d === '""')
        return i;
      if (typeof d == "string")
        return i instanceof f || d[d.length - 1] !== '"' ? void 0 : typeof i != "string" ? `${d.slice(0, -1)}${i}"` : i[0] === '"' ? d.slice(0, -1) + i.slice(1) : void 0;
      if (typeof i == "string" && i[0] === '"' && !(d instanceof f))
        return `"${d}${i.slice(1)}`;
    }
    function h(d, i) {
      return i.emptyStr() ? d : d.emptyStr() ? i : n`${d}${i}`;
    }
    e.strConcat = h;
    function _(d) {
      return typeof d == "number" || typeof d == "boolean" || d === null ? d : g(Array.isArray(d) ? d.join(",") : d);
    }
    function E(d) {
      return new s(g(d));
    }
    e.stringify = E;
    function g(d) {
      return JSON.stringify(d).replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029");
    }
    e.safeStringify = g;
    function w(d) {
      return typeof d == "string" && e.IDENTIFIER.test(d) ? new s(`.${d}`) : l`[${d}]`;
    }
    e.getProperty = w;
    function R(d) {
      if (typeof d == "string" && e.IDENTIFIER.test(d))
        return new s(`${d}`);
      throw new Error(`CodeGen: invalid export name: ${d}, use explicit $id name mapping`);
    }
    e.getEsmExportName = R;
    function u(d) {
      return new s(d.toString());
    }
    e.regexpCode = u;
  }(Hn)), Hn;
}
var Wn = {}, Lo;
function ko() {
  return Lo || (Lo = 1, function(e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.ValueScope = e.ValueScopeName = e.Scope = e.varKinds = e.UsedValueState = void 0;
    const t = $n();
    class f extends Error {
      constructor(a) {
        super(`CodeGen: "code" for ${a} not defined`), this.value = a.value;
      }
    }
    var s;
    (function(o) {
      o[o.Started = 0] = "Started", o[o.Completed = 1] = "Completed";
    })(s || (e.UsedValueState = s = {})), e.varKinds = {
      const: new t.Name("const"),
      let: new t.Name("let"),
      var: new t.Name("var")
    };
    class l {
      constructor({ prefixes: a, parent: h } = {}) {
        this._names = {}, this._prefixes = a, this._parent = h;
      }
      toName(a) {
        return a instanceof t.Name ? a : this.name(a);
      }
      name(a) {
        return new t.Name(this._newName(a));
      }
      _newName(a) {
        const h = this._names[a] || this._nameGroup(a);
        return `${a}${h.index++}`;
      }
      _nameGroup(a) {
        var h, _;
        if (!((_ = (h = this._parent) === null || h === void 0 ? void 0 : h._prefixes) === null || _ === void 0) && _.has(a) || this._prefixes && !this._prefixes.has(a))
          throw new Error(`CodeGen: prefix "${a}" is not allowed in this scope`);
        return this._names[a] = { prefix: a, index: 0 };
      }
    }
    e.Scope = l;
    class r extends t.Name {
      constructor(a, h) {
        super(h), this.prefix = a;
      }
      setValue(a, { property: h, itemIndex: _ }) {
        this.value = a, this.scopePath = (0, t._)`.${new t.Name(h)}[${_}]`;
      }
    }
    e.ValueScopeName = r;
    const n = (0, t._)`\n`;
    class c extends l {
      constructor(a) {
        super(a), this._values = {}, this._scope = a.scope, this.opts = { ...a, _n: a.lines ? n : t.nil };
      }
      get() {
        return this._scope;
      }
      name(a) {
        return new r(a, this._newName(a));
      }
      value(a, h) {
        var _;
        if (h.ref === void 0)
          throw new Error("CodeGen: ref must be passed in value");
        const E = this.toName(a), { prefix: g } = E, w = (_ = h.key) !== null && _ !== void 0 ? _ : h.ref;
        let R = this._values[g];
        if (R) {
          const i = R.get(w);
          if (i)
            return i;
        } else
          R = this._values[g] = /* @__PURE__ */ new Map();
        R.set(w, E);
        const u = this._scope[g] || (this._scope[g] = []), d = u.length;
        return u[d] = h.ref, E.setValue(h, { property: g, itemIndex: d }), E;
      }
      getValue(a, h) {
        const _ = this._values[a];
        if (_)
          return _.get(h);
      }
      scopeRefs(a, h = this._values) {
        return this._reduceValues(h, (_) => {
          if (_.scopePath === void 0)
            throw new Error(`CodeGen: name "${_}" has no value`);
          return (0, t._)`${a}${_.scopePath}`;
        });
      }
      scopeCode(a = this._values, h, _) {
        return this._reduceValues(a, (E) => {
          if (E.value === void 0)
            throw new Error(`CodeGen: name "${E}" has no value`);
          return E.value.code;
        }, h, _);
      }
      _reduceValues(a, h, _ = {}, E) {
        let g = t.nil;
        for (const w in a) {
          const R = a[w];
          if (!R)
            continue;
          const u = _[w] = _[w] || /* @__PURE__ */ new Map();
          R.forEach((d) => {
            if (u.has(d))
              return;
            u.set(d, s.Started);
            let i = h(d);
            if (i) {
              const m = this.opts.es5 ? e.varKinds.var : e.varKinds.const;
              g = (0, t._)`${g}${m} ${d} = ${i};${this.opts._n}`;
            } else if (i = E?.(d))
              g = (0, t._)`${g}${i}${this.opts._n}`;
            else
              throw new f(d);
            u.set(d, s.Completed);
          });
        }
        return g;
      }
    }
    e.ValueScope = c;
  }(Wn)), Wn;
}
var jo;
function se() {
  return jo || (jo = 1, function(e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.or = e.and = e.not = e.CodeGen = e.operators = e.varKinds = e.ValueScopeName = e.ValueScope = e.Scope = e.Name = e.regexpCode = e.stringify = e.getProperty = e.nil = e.strConcat = e.str = e._ = void 0;
    const t = $n(), f = ko();
    var s = $n();
    Object.defineProperty(e, "_", { enumerable: !0, get: function() {
      return s._;
    } }), Object.defineProperty(e, "str", { enumerable: !0, get: function() {
      return s.str;
    } }), Object.defineProperty(e, "strConcat", { enumerable: !0, get: function() {
      return s.strConcat;
    } }), Object.defineProperty(e, "nil", { enumerable: !0, get: function() {
      return s.nil;
    } }), Object.defineProperty(e, "getProperty", { enumerable: !0, get: function() {
      return s.getProperty;
    } }), Object.defineProperty(e, "stringify", { enumerable: !0, get: function() {
      return s.stringify;
    } }), Object.defineProperty(e, "regexpCode", { enumerable: !0, get: function() {
      return s.regexpCode;
    } }), Object.defineProperty(e, "Name", { enumerable: !0, get: function() {
      return s.Name;
    } });
    var l = ko();
    Object.defineProperty(e, "Scope", { enumerable: !0, get: function() {
      return l.Scope;
    } }), Object.defineProperty(e, "ValueScope", { enumerable: !0, get: function() {
      return l.ValueScope;
    } }), Object.defineProperty(e, "ValueScopeName", { enumerable: !0, get: function() {
      return l.ValueScopeName;
    } }), Object.defineProperty(e, "varKinds", { enumerable: !0, get: function() {
      return l.varKinds;
    } }), e.operators = {
      GT: new t._Code(">"),
      GTE: new t._Code(">="),
      LT: new t._Code("<"),
      LTE: new t._Code("<="),
      EQ: new t._Code("==="),
      NEQ: new t._Code("!=="),
      NOT: new t._Code("!"),
      OR: new t._Code("||"),
      AND: new t._Code("&&"),
      ADD: new t._Code("+")
    };
    class r {
      optimizeNodes() {
        return this;
      }
      optimizeNames(S, P) {
        return this;
      }
    }
    class n extends r {
      constructor(S, P, O) {
        super(), this.varKind = S, this.name = P, this.rhs = O;
      }
      render({ es5: S, _n: P }) {
        const O = S ? f.varKinds.var : this.varKind, B = this.rhs === void 0 ? "" : ` = ${this.rhs}`;
        return `${O} ${this.name}${B};` + P;
      }
      optimizeNames(S, P) {
        if (S[this.name.str])
          return this.rhs && (this.rhs = V(this.rhs, S, P)), this;
      }
      get names() {
        return this.rhs instanceof t._CodeOrName ? this.rhs.names : {};
      }
    }
    class c extends r {
      constructor(S, P, O) {
        super(), this.lhs = S, this.rhs = P, this.sideEffects = O;
      }
      render({ _n: S }) {
        return `${this.lhs} = ${this.rhs};` + S;
      }
      optimizeNames(S, P) {
        if (!(this.lhs instanceof t.Name && !S[this.lhs.str] && !this.sideEffects))
          return this.rhs = V(this.rhs, S, P), this;
      }
      get names() {
        const S = this.lhs instanceof t.Name ? {} : { ...this.lhs.names };
        return U(S, this.rhs);
      }
    }
    class o extends c {
      constructor(S, P, O, B) {
        super(S, O, B), this.op = P;
      }
      render({ _n: S }) {
        return `${this.lhs} ${this.op}= ${this.rhs};` + S;
      }
    }
    class a extends r {
      constructor(S) {
        super(), this.label = S, this.names = {};
      }
      render({ _n: S }) {
        return `${this.label}:` + S;
      }
    }
    class h extends r {
      constructor(S) {
        super(), this.label = S, this.names = {};
      }
      render({ _n: S }) {
        return `break${this.label ? ` ${this.label}` : ""};` + S;
      }
    }
    class _ extends r {
      constructor(S) {
        super(), this.error = S;
      }
      render({ _n: S }) {
        return `throw ${this.error};` + S;
      }
      get names() {
        return this.error.names;
      }
    }
    class E extends r {
      constructor(S) {
        super(), this.code = S;
      }
      render({ _n: S }) {
        return `${this.code};` + S;
      }
      optimizeNodes() {
        return `${this.code}` ? this : void 0;
      }
      optimizeNames(S, P) {
        return this.code = V(this.code, S, P), this;
      }
      get names() {
        return this.code instanceof t._CodeOrName ? this.code.names : {};
      }
    }
    class g extends r {
      constructor(S = []) {
        super(), this.nodes = S;
      }
      render(S) {
        return this.nodes.reduce((P, O) => P + O.render(S), "");
      }
      optimizeNodes() {
        const { nodes: S } = this;
        let P = S.length;
        for (; P--; ) {
          const O = S[P].optimizeNodes();
          Array.isArray(O) ? S.splice(P, 1, ...O) : O ? S[P] = O : S.splice(P, 1);
        }
        return S.length > 0 ? this : void 0;
      }
      optimizeNames(S, P) {
        const { nodes: O } = this;
        let B = O.length;
        for (; B--; ) {
          const x = O[B];
          x.optimizeNames(S, P) || (K(S, x.names), O.splice(B, 1));
        }
        return O.length > 0 ? this : void 0;
      }
      get names() {
        return this.nodes.reduce((S, P) => H(S, P.names), {});
      }
    }
    class w extends g {
      render(S) {
        return "{" + S._n + super.render(S) + "}" + S._n;
      }
    }
    class R extends g {
    }
    class u extends w {
    }
    u.kind = "else";
    class d extends w {
      constructor(S, P) {
        super(P), this.condition = S;
      }
      render(S) {
        let P = `if(${this.condition})` + super.render(S);
        return this.else && (P += "else " + this.else.render(S)), P;
      }
      optimizeNodes() {
        super.optimizeNodes();
        const S = this.condition;
        if (S === !0)
          return this.nodes;
        let P = this.else;
        if (P) {
          const O = P.optimizeNodes();
          P = this.else = Array.isArray(O) ? new u(O) : O;
        }
        if (P)
          return S === !1 ? P instanceof d ? P : P.nodes : this.nodes.length ? this : new d(J(S), P instanceof d ? [P] : P.nodes);
        if (!(S === !1 || !this.nodes.length))
          return this;
      }
      optimizeNames(S, P) {
        var O;
        if (this.else = (O = this.else) === null || O === void 0 ? void 0 : O.optimizeNames(S, P), !!(super.optimizeNames(S, P) || this.else))
          return this.condition = V(this.condition, S, P), this;
      }
      get names() {
        const S = super.names;
        return U(S, this.condition), this.else && H(S, this.else.names), S;
      }
    }
    d.kind = "if";
    class i extends w {
    }
    i.kind = "for";
    class m extends i {
      constructor(S) {
        super(), this.iteration = S;
      }
      render(S) {
        return `for(${this.iteration})` + super.render(S);
      }
      optimizeNames(S, P) {
        if (super.optimizeNames(S, P))
          return this.iteration = V(this.iteration, S, P), this;
      }
      get names() {
        return H(super.names, this.iteration.names);
      }
    }
    class v extends i {
      constructor(S, P, O, B) {
        super(), this.varKind = S, this.name = P, this.from = O, this.to = B;
      }
      render(S) {
        const P = S.es5 ? f.varKinds.var : this.varKind, { name: O, from: B, to: x } = this;
        return `for(${P} ${O}=${B}; ${O}<${x}; ${O}++)` + super.render(S);
      }
      get names() {
        const S = U(super.names, this.from);
        return U(S, this.to);
      }
    }
    class p extends i {
      constructor(S, P, O, B) {
        super(), this.loop = S, this.varKind = P, this.name = O, this.iterable = B;
      }
      render(S) {
        return `for(${this.varKind} ${this.name} ${this.loop} ${this.iterable})` + super.render(S);
      }
      optimizeNames(S, P) {
        if (super.optimizeNames(S, P))
          return this.iterable = V(this.iterable, S, P), this;
      }
      get names() {
        return H(super.names, this.iterable.names);
      }
    }
    class y extends w {
      constructor(S, P, O) {
        super(), this.name = S, this.args = P, this.async = O;
      }
      render(S) {
        return `${this.async ? "async " : ""}function ${this.name}(${this.args})` + super.render(S);
      }
    }
    y.kind = "func";
    class $ extends g {
      render(S) {
        return "return " + super.render(S);
      }
    }
    $.kind = "return";
    class b extends w {
      render(S) {
        let P = "try" + super.render(S);
        return this.catch && (P += this.catch.render(S)), this.finally && (P += this.finally.render(S)), P;
      }
      optimizeNodes() {
        var S, P;
        return super.optimizeNodes(), (S = this.catch) === null || S === void 0 || S.optimizeNodes(), (P = this.finally) === null || P === void 0 || P.optimizeNodes(), this;
      }
      optimizeNames(S, P) {
        var O, B;
        return super.optimizeNames(S, P), (O = this.catch) === null || O === void 0 || O.optimizeNames(S, P), (B = this.finally) === null || B === void 0 || B.optimizeNames(S, P), this;
      }
      get names() {
        const S = super.names;
        return this.catch && H(S, this.catch.names), this.finally && H(S, this.finally.names), S;
      }
    }
    class I extends w {
      constructor(S) {
        super(), this.error = S;
      }
      render(S) {
        return `catch(${this.error})` + super.render(S);
      }
    }
    I.kind = "catch";
    class L extends w {
      render(S) {
        return "finally" + super.render(S);
      }
    }
    L.kind = "finally";
    class F {
      constructor(S, P = {}) {
        this._values = {}, this._blockStarts = [], this._constants = {}, this.opts = { ...P, _n: P.lines ? `
` : "" }, this._extScope = S, this._scope = new f.Scope({ parent: S }), this._nodes = [new R()];
      }
      toString() {
        return this._root.render(this.opts);
      }
      // returns unique name in the internal scope
      name(S) {
        return this._scope.name(S);
      }
      // reserves unique name in the external scope
      scopeName(S) {
        return this._extScope.name(S);
      }
      // reserves unique name in the external scope and assigns value to it
      scopeValue(S, P) {
        const O = this._extScope.value(S, P);
        return (this._values[O.prefix] || (this._values[O.prefix] = /* @__PURE__ */ new Set())).add(O), O;
      }
      getScopeValue(S, P) {
        return this._extScope.getValue(S, P);
      }
      // return code that assigns values in the external scope to the names that are used internally
      // (same names that were returned by gen.scopeName or gen.scopeValue)
      scopeRefs(S) {
        return this._extScope.scopeRefs(S, this._values);
      }
      scopeCode() {
        return this._extScope.scopeCode(this._values);
      }
      _def(S, P, O, B) {
        const x = this._scope.toName(P);
        return O !== void 0 && B && (this._constants[x.str] = O), this._leafNode(new n(S, x, O)), x;
      }
      // `const` declaration (`var` in es5 mode)
      const(S, P, O) {
        return this._def(f.varKinds.const, S, P, O);
      }
      // `let` declaration with optional assignment (`var` in es5 mode)
      let(S, P, O) {
        return this._def(f.varKinds.let, S, P, O);
      }
      // `var` declaration with optional assignment
      var(S, P, O) {
        return this._def(f.varKinds.var, S, P, O);
      }
      // assignment code
      assign(S, P, O) {
        return this._leafNode(new c(S, P, O));
      }
      // `+=` code
      add(S, P) {
        return this._leafNode(new o(S, e.operators.ADD, P));
      }
      // appends passed SafeExpr to code or executes Block
      code(S) {
        return typeof S == "function" ? S() : S !== t.nil && this._leafNode(new E(S)), this;
      }
      // returns code for object literal for the passed argument list of key-value pairs
      object(...S) {
        const P = ["{"];
        for (const [O, B] of S)
          P.length > 1 && P.push(","), P.push(O), (O !== B || this.opts.es5) && (P.push(":"), (0, t.addCodeArg)(P, B));
        return P.push("}"), new t._Code(P);
      }
      // `if` clause (or statement if `thenBody` and, optionally, `elseBody` are passed)
      if(S, P, O) {
        if (this._blockNode(new d(S)), P && O)
          this.code(P).else().code(O).endIf();
        else if (P)
          this.code(P).endIf();
        else if (O)
          throw new Error('CodeGen: "else" body without "then" body');
        return this;
      }
      // `else if` clause - invalid without `if` or after `else` clauses
      elseIf(S) {
        return this._elseNode(new d(S));
      }
      // `else` clause - only valid after `if` or `else if` clauses
      else() {
        return this._elseNode(new u());
      }
      // end `if` statement (needed if gen.if was used only with condition)
      endIf() {
        return this._endBlockNode(d, u);
      }
      _for(S, P) {
        return this._blockNode(S), P && this.code(P).endFor(), this;
      }
      // a generic `for` clause (or statement if `forBody` is passed)
      for(S, P) {
        return this._for(new m(S), P);
      }
      // `for` statement for a range of values
      forRange(S, P, O, B, x = this.opts.es5 ? f.varKinds.var : f.varKinds.let) {
        const Q = this._scope.toName(S);
        return this._for(new v(x, Q, P, O), () => B(Q));
      }
      // `for-of` statement (in es5 mode replace with a normal for loop)
      forOf(S, P, O, B = f.varKinds.const) {
        const x = this._scope.toName(S);
        if (this.opts.es5) {
          const Q = P instanceof t.Name ? P : this.var("_arr", P);
          return this.forRange("_i", 0, (0, t._)`${Q}.length`, (Z) => {
            this.var(x, (0, t._)`${Q}[${Z}]`), O(x);
          });
        }
        return this._for(new p("of", B, x, P), () => O(x));
      }
      // `for-in` statement.
      // With option `ownProperties` replaced with a `for-of` loop for object keys
      forIn(S, P, O, B = this.opts.es5 ? f.varKinds.var : f.varKinds.const) {
        if (this.opts.ownProperties)
          return this.forOf(S, (0, t._)`Object.keys(${P})`, O);
        const x = this._scope.toName(S);
        return this._for(new p("in", B, x, P), () => O(x));
      }
      // end `for` loop
      endFor() {
        return this._endBlockNode(i);
      }
      // `label` statement
      label(S) {
        return this._leafNode(new a(S));
      }
      // `break` statement
      break(S) {
        return this._leafNode(new h(S));
      }
      // `return` statement
      return(S) {
        const P = new $();
        if (this._blockNode(P), this.code(S), P.nodes.length !== 1)
          throw new Error('CodeGen: "return" should have one node');
        return this._endBlockNode($);
      }
      // `try` statement
      try(S, P, O) {
        if (!P && !O)
          throw new Error('CodeGen: "try" without "catch" and "finally"');
        const B = new b();
        if (this._blockNode(B), this.code(S), P) {
          const x = this.name("e");
          this._currNode = B.catch = new I(x), P(x);
        }
        return O && (this._currNode = B.finally = new L(), this.code(O)), this._endBlockNode(I, L);
      }
      // `throw` statement
      throw(S) {
        return this._leafNode(new _(S));
      }
      // start self-balancing block
      block(S, P) {
        return this._blockStarts.push(this._nodes.length), S && this.code(S).endBlock(P), this;
      }
      // end the current self-balancing block
      endBlock(S) {
        const P = this._blockStarts.pop();
        if (P === void 0)
          throw new Error("CodeGen: not in self-balancing block");
        const O = this._nodes.length - P;
        if (O < 0 || S !== void 0 && O !== S)
          throw new Error(`CodeGen: wrong number of nodes: ${O} vs ${S} expected`);
        return this._nodes.length = P, this;
      }
      // `function` heading (or definition if funcBody is passed)
      func(S, P = t.nil, O, B) {
        return this._blockNode(new y(S, P, O)), B && this.code(B).endFunc(), this;
      }
      // end function definition
      endFunc() {
        return this._endBlockNode(y);
      }
      optimize(S = 1) {
        for (; S-- > 0; )
          this._root.optimizeNodes(), this._root.optimizeNames(this._root.names, this._constants);
      }
      _leafNode(S) {
        return this._currNode.nodes.push(S), this;
      }
      _blockNode(S) {
        this._currNode.nodes.push(S), this._nodes.push(S);
      }
      _endBlockNode(S, P) {
        const O = this._currNode;
        if (O instanceof S || P && O instanceof P)
          return this._nodes.pop(), this;
        throw new Error(`CodeGen: not in block "${P ? `${S.kind}/${P.kind}` : S.kind}"`);
      }
      _elseNode(S) {
        const P = this._currNode;
        if (!(P instanceof d))
          throw new Error('CodeGen: "else" without "if"');
        return this._currNode = P.else = S, this;
      }
      get _root() {
        return this._nodes[0];
      }
      get _currNode() {
        const S = this._nodes;
        return S[S.length - 1];
      }
      set _currNode(S) {
        const P = this._nodes;
        P[P.length - 1] = S;
      }
    }
    e.CodeGen = F;
    function H(C, S) {
      for (const P in S)
        C[P] = (C[P] || 0) + (S[P] || 0);
      return C;
    }
    function U(C, S) {
      return S instanceof t._CodeOrName ? H(C, S.names) : C;
    }
    function V(C, S, P) {
      if (C instanceof t.Name)
        return O(C);
      if (!B(C))
        return C;
      return new t._Code(C._items.reduce((x, Q) => (Q instanceof t.Name && (Q = O(Q)), Q instanceof t._Code ? x.push(...Q._items) : x.push(Q), x), []));
      function O(x) {
        const Q = P[x.str];
        return Q === void 0 || S[x.str] !== 1 ? x : (delete S[x.str], Q);
      }
      function B(x) {
        return x instanceof t._Code && x._items.some((Q) => Q instanceof t.Name && S[Q.str] === 1 && P[Q.str] !== void 0);
      }
    }
    function K(C, S) {
      for (const P in S)
        C[P] = (C[P] || 0) - (S[P] || 0);
    }
    function J(C) {
      return typeof C == "boolean" || typeof C == "number" || C === null ? !C : (0, t._)`!${q(C)}`;
    }
    e.not = J;
    const W = T(e.operators.AND);
    function M(...C) {
      return C.reduce(W);
    }
    e.and = M;
    const G = T(e.operators.OR);
    function A(...C) {
      return C.reduce(G);
    }
    e.or = A;
    function T(C) {
      return (S, P) => S === t.nil ? P : P === t.nil ? S : (0, t._)`${q(S)} ${C} ${q(P)}`;
    }
    function q(C) {
      return C instanceof t.Name ? C : (0, t._)`(${C})`;
    }
  }(Bn)), Bn;
}
var ee = {}, qo;
function ae() {
  if (qo) return ee;
  qo = 1, Object.defineProperty(ee, "__esModule", { value: !0 }), ee.checkStrictMode = ee.getErrorPath = ee.Type = ee.useFunc = ee.setEvaluated = ee.evaluatedPropsToName = ee.mergeEvaluated = ee.eachItem = ee.unescapeJsonPointer = ee.escapeJsonPointer = ee.escapeFragment = ee.unescapeFragment = ee.schemaRefOrVal = ee.schemaHasRulesButRef = ee.schemaHasRules = ee.checkUnknownRules = ee.alwaysValidSchema = ee.toHash = void 0;
  const e = se(), t = $n();
  function f(p) {
    const y = {};
    for (const $ of p)
      y[$] = !0;
    return y;
  }
  ee.toHash = f;
  function s(p, y) {
    return typeof y == "boolean" ? y : Object.keys(y).length === 0 ? !0 : (l(p, y), !r(y, p.self.RULES.all));
  }
  ee.alwaysValidSchema = s;
  function l(p, y = p.schema) {
    const { opts: $, self: b } = p;
    if (!$.strictSchema || typeof y == "boolean")
      return;
    const I = b.RULES.keywords;
    for (const L in y)
      I[L] || v(p, `unknown keyword: "${L}"`);
  }
  ee.checkUnknownRules = l;
  function r(p, y) {
    if (typeof p == "boolean")
      return !p;
    for (const $ in p)
      if (y[$])
        return !0;
    return !1;
  }
  ee.schemaHasRules = r;
  function n(p, y) {
    if (typeof p == "boolean")
      return !p;
    for (const $ in p)
      if ($ !== "$ref" && y.all[$])
        return !0;
    return !1;
  }
  ee.schemaHasRulesButRef = n;
  function c({ topSchemaRef: p, schemaPath: y }, $, b, I) {
    if (!I) {
      if (typeof $ == "number" || typeof $ == "boolean")
        return $;
      if (typeof $ == "string")
        return (0, e._)`${$}`;
    }
    return (0, e._)`${p}${y}${(0, e.getProperty)(b)}`;
  }
  ee.schemaRefOrVal = c;
  function o(p) {
    return _(decodeURIComponent(p));
  }
  ee.unescapeFragment = o;
  function a(p) {
    return encodeURIComponent(h(p));
  }
  ee.escapeFragment = a;
  function h(p) {
    return typeof p == "number" ? `${p}` : p.replace(/~/g, "~0").replace(/\//g, "~1");
  }
  ee.escapeJsonPointer = h;
  function _(p) {
    return p.replace(/~1/g, "/").replace(/~0/g, "~");
  }
  ee.unescapeJsonPointer = _;
  function E(p, y) {
    if (Array.isArray(p))
      for (const $ of p)
        y($);
    else
      y(p);
  }
  ee.eachItem = E;
  function g({ mergeNames: p, mergeToName: y, mergeValues: $, resultToName: b }) {
    return (I, L, F, H) => {
      const U = F === void 0 ? L : F instanceof e.Name ? (L instanceof e.Name ? p(I, L, F) : y(I, L, F), F) : L instanceof e.Name ? (y(I, F, L), L) : $(L, F);
      return H === e.Name && !(U instanceof e.Name) ? b(I, U) : U;
    };
  }
  ee.mergeEvaluated = {
    props: g({
      mergeNames: (p, y, $) => p.if((0, e._)`${$} !== true && ${y} !== undefined`, () => {
        p.if((0, e._)`${y} === true`, () => p.assign($, !0), () => p.assign($, (0, e._)`${$} || {}`).code((0, e._)`Object.assign(${$}, ${y})`));
      }),
      mergeToName: (p, y, $) => p.if((0, e._)`${$} !== true`, () => {
        y === !0 ? p.assign($, !0) : (p.assign($, (0, e._)`${$} || {}`), R(p, $, y));
      }),
      mergeValues: (p, y) => p === !0 ? !0 : { ...p, ...y },
      resultToName: w
    }),
    items: g({
      mergeNames: (p, y, $) => p.if((0, e._)`${$} !== true && ${y} !== undefined`, () => p.assign($, (0, e._)`${y} === true ? true : ${$} > ${y} ? ${$} : ${y}`)),
      mergeToName: (p, y, $) => p.if((0, e._)`${$} !== true`, () => p.assign($, y === !0 ? !0 : (0, e._)`${$} > ${y} ? ${$} : ${y}`)),
      mergeValues: (p, y) => p === !0 ? !0 : Math.max(p, y),
      resultToName: (p, y) => p.var("items", y)
    })
  };
  function w(p, y) {
    if (y === !0)
      return p.var("props", !0);
    const $ = p.var("props", (0, e._)`{}`);
    return y !== void 0 && R(p, $, y), $;
  }
  ee.evaluatedPropsToName = w;
  function R(p, y, $) {
    Object.keys($).forEach((b) => p.assign((0, e._)`${y}${(0, e.getProperty)(b)}`, !0));
  }
  ee.setEvaluated = R;
  const u = {};
  function d(p, y) {
    return p.scopeValue("func", {
      ref: y,
      code: u[y.code] || (u[y.code] = new t._Code(y.code))
    });
  }
  ee.useFunc = d;
  var i;
  (function(p) {
    p[p.Num = 0] = "Num", p[p.Str = 1] = "Str";
  })(i || (ee.Type = i = {}));
  function m(p, y, $) {
    if (p instanceof e.Name) {
      const b = y === i.Num;
      return $ ? b ? (0, e._)`"[" + ${p} + "]"` : (0, e._)`"['" + ${p} + "']"` : b ? (0, e._)`"/" + ${p}` : (0, e._)`"/" + ${p}.replace(/~/g, "~0").replace(/\\//g, "~1")`;
    }
    return $ ? (0, e.getProperty)(p).toString() : "/" + h(p);
  }
  ee.getErrorPath = m;
  function v(p, y, $ = p.opts.strictSchema) {
    if ($) {
      if (y = `strict mode: ${y}`, $ === !0)
        throw new Error(y);
      p.self.logger.warn(y);
    }
  }
  return ee.checkStrictMode = v, ee;
}
var Gt = {}, Fo;
function Xe() {
  if (Fo) return Gt;
  Fo = 1, Object.defineProperty(Gt, "__esModule", { value: !0 });
  const e = se(), t = {
    // validation function arguments
    data: new e.Name("data"),
    // data passed to validation function
    // args passed from referencing schema
    valCxt: new e.Name("valCxt"),
    // validation/data context - should not be used directly, it is destructured to the names below
    instancePath: new e.Name("instancePath"),
    parentData: new e.Name("parentData"),
    parentDataProperty: new e.Name("parentDataProperty"),
    rootData: new e.Name("rootData"),
    // root data - same as the data passed to the first/top validation function
    dynamicAnchors: new e.Name("dynamicAnchors"),
    // used to support recursiveRef and dynamicRef
    // function scoped variables
    vErrors: new e.Name("vErrors"),
    // null or array of validation errors
    errors: new e.Name("errors"),
    // counter of validation errors
    this: new e.Name("this"),
    // "globals"
    self: new e.Name("self"),
    scope: new e.Name("scope"),
    // JTD serialize/parse name for JSON string and position
    json: new e.Name("json"),
    jsonPos: new e.Name("jsonPos"),
    jsonLen: new e.Name("jsonLen"),
    jsonPart: new e.Name("jsonPart")
  };
  return Gt.default = t, Gt;
}
var Mo;
function bn() {
  return Mo || (Mo = 1, function(e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.extendErrors = e.resetErrorsCount = e.reportExtraError = e.reportError = e.keyword$DataError = e.keywordError = void 0;
    const t = se(), f = ae(), s = Xe();
    e.keywordError = {
      message: ({ keyword: u }) => (0, t.str)`must pass "${u}" keyword validation`
    }, e.keyword$DataError = {
      message: ({ keyword: u, schemaType: d }) => d ? (0, t.str)`"${u}" keyword must be ${d} ($data)` : (0, t.str)`"${u}" keyword is invalid ($data)`
    };
    function l(u, d = e.keywordError, i, m) {
      const { it: v } = u, { gen: p, compositeRule: y, allErrors: $ } = v, b = _(u, d, i);
      m ?? (y || $) ? o(p, b) : a(v, (0, t._)`[${b}]`);
    }
    e.reportError = l;
    function r(u, d = e.keywordError, i) {
      const { it: m } = u, { gen: v, compositeRule: p, allErrors: y } = m, $ = _(u, d, i);
      o(v, $), p || y || a(m, s.default.vErrors);
    }
    e.reportExtraError = r;
    function n(u, d) {
      u.assign(s.default.errors, d), u.if((0, t._)`${s.default.vErrors} !== null`, () => u.if(d, () => u.assign((0, t._)`${s.default.vErrors}.length`, d), () => u.assign(s.default.vErrors, null)));
    }
    e.resetErrorsCount = n;
    function c({ gen: u, keyword: d, schemaValue: i, data: m, errsCount: v, it: p }) {
      if (v === void 0)
        throw new Error("ajv implementation error");
      const y = u.name("err");
      u.forRange("i", v, s.default.errors, ($) => {
        u.const(y, (0, t._)`${s.default.vErrors}[${$}]`), u.if((0, t._)`${y}.instancePath === undefined`, () => u.assign((0, t._)`${y}.instancePath`, (0, t.strConcat)(s.default.instancePath, p.errorPath))), u.assign((0, t._)`${y}.schemaPath`, (0, t.str)`${p.errSchemaPath}/${d}`), p.opts.verbose && (u.assign((0, t._)`${y}.schema`, i), u.assign((0, t._)`${y}.data`, m));
      });
    }
    e.extendErrors = c;
    function o(u, d) {
      const i = u.const("err", d);
      u.if((0, t._)`${s.default.vErrors} === null`, () => u.assign(s.default.vErrors, (0, t._)`[${i}]`), (0, t._)`${s.default.vErrors}.push(${i})`), u.code((0, t._)`${s.default.errors}++`);
    }
    function a(u, d) {
      const { gen: i, validateName: m, schemaEnv: v } = u;
      v.$async ? i.throw((0, t._)`new ${u.ValidationError}(${d})`) : (i.assign((0, t._)`${m}.errors`, d), i.return(!1));
    }
    const h = {
      keyword: new t.Name("keyword"),
      schemaPath: new t.Name("schemaPath"),
      // also used in JTD errors
      params: new t.Name("params"),
      propertyName: new t.Name("propertyName"),
      message: new t.Name("message"),
      schema: new t.Name("schema"),
      parentSchema: new t.Name("parentSchema")
    };
    function _(u, d, i) {
      const { createErrors: m } = u.it;
      return m === !1 ? (0, t._)`{}` : E(u, d, i);
    }
    function E(u, d, i = {}) {
      const { gen: m, it: v } = u, p = [
        g(v, i),
        w(u, i)
      ];
      return R(u, d, p), m.object(...p);
    }
    function g({ errorPath: u }, { instancePath: d }) {
      const i = d ? (0, t.str)`${u}${(0, f.getErrorPath)(d, f.Type.Str)}` : u;
      return [s.default.instancePath, (0, t.strConcat)(s.default.instancePath, i)];
    }
    function w({ keyword: u, it: { errSchemaPath: d } }, { schemaPath: i, parentSchema: m }) {
      let v = m ? d : (0, t.str)`${d}/${u}`;
      return i && (v = (0, t.str)`${v}${(0, f.getErrorPath)(i, f.Type.Str)}`), [h.schemaPath, v];
    }
    function R(u, { params: d, message: i }, m) {
      const { keyword: v, data: p, schemaValue: y, it: $ } = u, { opts: b, propertyName: I, topSchemaRef: L, schemaPath: F } = $;
      m.push([h.keyword, v], [h.params, typeof d == "function" ? d(u) : d || (0, t._)`{}`]), b.messages && m.push([h.message, typeof i == "function" ? i(u) : i]), b.verbose && m.push([h.schema, y], [h.parentSchema, (0, t._)`${L}${F}`], [s.default.data, p]), I && m.push([h.propertyName, I]);
    }
  }(Kn)), Kn;
}
var Uo;
function td() {
  if (Uo) return Qe;
  Uo = 1, Object.defineProperty(Qe, "__esModule", { value: !0 }), Qe.boolOrEmptySchema = Qe.topBoolOrEmptySchema = void 0;
  const e = bn(), t = se(), f = Xe(), s = {
    message: "boolean schema is false"
  };
  function l(c) {
    const { gen: o, schema: a, validateName: h } = c;
    a === !1 ? n(c, !1) : typeof a == "object" && a.$async === !0 ? o.return(f.default.data) : (o.assign((0, t._)`${h}.errors`, null), o.return(!0));
  }
  Qe.topBoolOrEmptySchema = l;
  function r(c, o) {
    const { gen: a, schema: h } = c;
    h === !1 ? (a.var(o, !1), n(c)) : a.var(o, !0);
  }
  Qe.boolOrEmptySchema = r;
  function n(c, o) {
    const { gen: a, data: h } = c, _ = {
      gen: a,
      keyword: "false schema",
      data: h,
      schema: !1,
      schemaCode: !1,
      schemaValue: !1,
      params: {},
      it: c
    };
    (0, e.reportError)(_, s, void 0, o);
  }
  return Qe;
}
var Ee = {}, et = {}, Vo;
function af() {
  if (Vo) return et;
  Vo = 1, Object.defineProperty(et, "__esModule", { value: !0 }), et.getRules = et.isJSONType = void 0;
  const e = ["string", "number", "integer", "boolean", "null", "object", "array"], t = new Set(e);
  function f(l) {
    return typeof l == "string" && t.has(l);
  }
  et.isJSONType = f;
  function s() {
    const l = {
      number: { type: "number", rules: [] },
      string: { type: "string", rules: [] },
      array: { type: "array", rules: [] },
      object: { type: "object", rules: [] }
    };
    return {
      types: { ...l, integer: !0, boolean: !0, null: !0 },
      rules: [{ rules: [] }, l.number, l.string, l.array, l.object],
      post: { rules: [] },
      all: {},
      keywords: {}
    };
  }
  return et.getRules = s, et;
}
var ze = {}, zo;
function cf() {
  if (zo) return ze;
  zo = 1, Object.defineProperty(ze, "__esModule", { value: !0 }), ze.shouldUseRule = ze.shouldUseGroup = ze.schemaHasRulesForType = void 0;
  function e({ schema: s, self: l }, r) {
    const n = l.RULES.types[r];
    return n && n !== !0 && t(s, n);
  }
  ze.schemaHasRulesForType = e;
  function t(s, l) {
    return l.rules.some((r) => f(s, r));
  }
  ze.shouldUseGroup = t;
  function f(s, l) {
    var r;
    return s[l.keyword] !== void 0 || ((r = l.definition.implements) === null || r === void 0 ? void 0 : r.some((n) => s[n] !== void 0));
  }
  return ze.shouldUseRule = f, ze;
}
var xo;
function En() {
  if (xo) return Ee;
  xo = 1, Object.defineProperty(Ee, "__esModule", { value: !0 }), Ee.reportTypeError = Ee.checkDataTypes = Ee.checkDataType = Ee.coerceAndCheckDataType = Ee.getJSONTypes = Ee.getSchemaTypes = Ee.DataType = void 0;
  const e = af(), t = cf(), f = bn(), s = se(), l = ae();
  var r;
  (function(i) {
    i[i.Correct = 0] = "Correct", i[i.Wrong = 1] = "Wrong";
  })(r || (Ee.DataType = r = {}));
  function n(i) {
    const m = c(i.type);
    if (m.includes("null")) {
      if (i.nullable === !1)
        throw new Error("type: null contradicts nullable: false");
    } else {
      if (!m.length && i.nullable !== void 0)
        throw new Error('"nullable" cannot be used without "type"');
      i.nullable === !0 && m.push("null");
    }
    return m;
  }
  Ee.getSchemaTypes = n;
  function c(i) {
    const m = Array.isArray(i) ? i : i ? [i] : [];
    if (m.every(e.isJSONType))
      return m;
    throw new Error("type must be JSONType or JSONType[]: " + m.join(","));
  }
  Ee.getJSONTypes = c;
  function o(i, m) {
    const { gen: v, data: p, opts: y } = i, $ = h(m, y.coerceTypes), b = m.length > 0 && !($.length === 0 && m.length === 1 && (0, t.schemaHasRulesForType)(i, m[0]));
    if (b) {
      const I = w(m, p, y.strictNumbers, r.Wrong);
      v.if(I, () => {
        $.length ? _(i, m, $) : u(i);
      });
    }
    return b;
  }
  Ee.coerceAndCheckDataType = o;
  const a = /* @__PURE__ */ new Set(["string", "number", "integer", "boolean", "null"]);
  function h(i, m) {
    return m ? i.filter((v) => a.has(v) || m === "array" && v === "array") : [];
  }
  function _(i, m, v) {
    const { gen: p, data: y, opts: $ } = i, b = p.let("dataType", (0, s._)`typeof ${y}`), I = p.let("coerced", (0, s._)`undefined`);
    $.coerceTypes === "array" && p.if((0, s._)`${b} == 'object' && Array.isArray(${y}) && ${y}.length == 1`, () => p.assign(y, (0, s._)`${y}[0]`).assign(b, (0, s._)`typeof ${y}`).if(w(m, y, $.strictNumbers), () => p.assign(I, y))), p.if((0, s._)`${I} !== undefined`);
    for (const F of v)
      (a.has(F) || F === "array" && $.coerceTypes === "array") && L(F);
    p.else(), u(i), p.endIf(), p.if((0, s._)`${I} !== undefined`, () => {
      p.assign(y, I), E(i, I);
    });
    function L(F) {
      switch (F) {
        case "string":
          p.elseIf((0, s._)`${b} == "number" || ${b} == "boolean"`).assign(I, (0, s._)`"" + ${y}`).elseIf((0, s._)`${y} === null`).assign(I, (0, s._)`""`);
          return;
        case "number":
          p.elseIf((0, s._)`${b} == "boolean" || ${y} === null
              || (${b} == "string" && ${y} && ${y} == +${y})`).assign(I, (0, s._)`+${y}`);
          return;
        case "integer":
          p.elseIf((0, s._)`${b} === "boolean" || ${y} === null
              || (${b} === "string" && ${y} && ${y} == +${y} && !(${y} % 1))`).assign(I, (0, s._)`+${y}`);
          return;
        case "boolean":
          p.elseIf((0, s._)`${y} === "false" || ${y} === 0 || ${y} === null`).assign(I, !1).elseIf((0, s._)`${y} === "true" || ${y} === 1`).assign(I, !0);
          return;
        case "null":
          p.elseIf((0, s._)`${y} === "" || ${y} === 0 || ${y} === false`), p.assign(I, null);
          return;
        case "array":
          p.elseIf((0, s._)`${b} === "string" || ${b} === "number"
              || ${b} === "boolean" || ${y} === null`).assign(I, (0, s._)`[${y}]`);
      }
    }
  }
  function E({ gen: i, parentData: m, parentDataProperty: v }, p) {
    i.if((0, s._)`${m} !== undefined`, () => i.assign((0, s._)`${m}[${v}]`, p));
  }
  function g(i, m, v, p = r.Correct) {
    const y = p === r.Correct ? s.operators.EQ : s.operators.NEQ;
    let $;
    switch (i) {
      case "null":
        return (0, s._)`${m} ${y} null`;
      case "array":
        $ = (0, s._)`Array.isArray(${m})`;
        break;
      case "object":
        $ = (0, s._)`${m} && typeof ${m} == "object" && !Array.isArray(${m})`;
        break;
      case "integer":
        $ = b((0, s._)`!(${m} % 1) && !isNaN(${m})`);
        break;
      case "number":
        $ = b();
        break;
      default:
        return (0, s._)`typeof ${m} ${y} ${i}`;
    }
    return p === r.Correct ? $ : (0, s.not)($);
    function b(I = s.nil) {
      return (0, s.and)((0, s._)`typeof ${m} == "number"`, I, v ? (0, s._)`isFinite(${m})` : s.nil);
    }
  }
  Ee.checkDataType = g;
  function w(i, m, v, p) {
    if (i.length === 1)
      return g(i[0], m, v, p);
    let y;
    const $ = (0, l.toHash)(i);
    if ($.array && $.object) {
      const b = (0, s._)`typeof ${m} != "object"`;
      y = $.null ? b : (0, s._)`!${m} || ${b}`, delete $.null, delete $.array, delete $.object;
    } else
      y = s.nil;
    $.number && delete $.integer;
    for (const b in $)
      y = (0, s.and)(y, g(b, m, v, p));
    return y;
  }
  Ee.checkDataTypes = w;
  const R = {
    message: ({ schema: i }) => `must be ${i}`,
    params: ({ schema: i, schemaValue: m }) => typeof i == "string" ? (0, s._)`{type: ${i}}` : (0, s._)`{type: ${m}}`
  };
  function u(i) {
    const m = d(i);
    (0, f.reportError)(m, R);
  }
  Ee.reportTypeError = u;
  function d(i) {
    const { gen: m, data: v, schema: p } = i, y = (0, l.schemaRefOrVal)(i, p, "type");
    return {
      gen: m,
      keyword: "type",
      data: v,
      schema: p.type,
      schemaCode: y,
      schemaValue: y,
      parentSchema: p,
      params: {},
      it: i
    };
  }
  return Ee;
}
var pt = {}, Go;
function rd() {
  if (Go) return pt;
  Go = 1, Object.defineProperty(pt, "__esModule", { value: !0 }), pt.assignDefaults = void 0;
  const e = se(), t = ae();
  function f(l, r) {
    const { properties: n, items: c } = l.schema;
    if (r === "object" && n)
      for (const o in n)
        s(l, o, n[o].default);
    else r === "array" && Array.isArray(c) && c.forEach((o, a) => s(l, a, o.default));
  }
  pt.assignDefaults = f;
  function s(l, r, n) {
    const { gen: c, compositeRule: o, data: a, opts: h } = l;
    if (n === void 0)
      return;
    const _ = (0, e._)`${a}${(0, e.getProperty)(r)}`;
    if (o) {
      (0, t.checkStrictMode)(l, `default is ignored for: ${_}`);
      return;
    }
    let E = (0, e._)`${_} === undefined`;
    h.useDefaults === "empty" && (E = (0, e._)`${E} || ${_} === null || ${_} === ""`), c.if(E, (0, e._)`${_} = ${(0, e.stringify)(n)}`);
  }
  return pt;
}
var Ae = {}, fe = {}, Ko;
function ke() {
  if (Ko) return fe;
  Ko = 1, Object.defineProperty(fe, "__esModule", { value: !0 }), fe.validateUnion = fe.validateArray = fe.usePattern = fe.callValidateCode = fe.schemaProperties = fe.allSchemaProperties = fe.noPropertyInData = fe.propertyInData = fe.isOwnProperty = fe.hasPropFunc = fe.reportMissingProp = fe.checkMissingProp = fe.checkReportMissingProp = void 0;
  const e = se(), t = ae(), f = Xe(), s = ae();
  function l(i, m) {
    const { gen: v, data: p, it: y } = i;
    v.if(h(v, p, m, y.opts.ownProperties), () => {
      i.setParams({ missingProperty: (0, e._)`${m}` }, !0), i.error();
    });
  }
  fe.checkReportMissingProp = l;
  function r({ gen: i, data: m, it: { opts: v } }, p, y) {
    return (0, e.or)(...p.map(($) => (0, e.and)(h(i, m, $, v.ownProperties), (0, e._)`${y} = ${$}`)));
  }
  fe.checkMissingProp = r;
  function n(i, m) {
    i.setParams({ missingProperty: m }, !0), i.error();
  }
  fe.reportMissingProp = n;
  function c(i) {
    return i.scopeValue("func", {
      // eslint-disable-next-line @typescript-eslint/unbound-method
      ref: Object.prototype.hasOwnProperty,
      code: (0, e._)`Object.prototype.hasOwnProperty`
    });
  }
  fe.hasPropFunc = c;
  function o(i, m, v) {
    return (0, e._)`${c(i)}.call(${m}, ${v})`;
  }
  fe.isOwnProperty = o;
  function a(i, m, v, p) {
    const y = (0, e._)`${m}${(0, e.getProperty)(v)} !== undefined`;
    return p ? (0, e._)`${y} && ${o(i, m, v)}` : y;
  }
  fe.propertyInData = a;
  function h(i, m, v, p) {
    const y = (0, e._)`${m}${(0, e.getProperty)(v)} === undefined`;
    return p ? (0, e.or)(y, (0, e.not)(o(i, m, v))) : y;
  }
  fe.noPropertyInData = h;
  function _(i) {
    return i ? Object.keys(i).filter((m) => m !== "__proto__") : [];
  }
  fe.allSchemaProperties = _;
  function E(i, m) {
    return _(m).filter((v) => !(0, t.alwaysValidSchema)(i, m[v]));
  }
  fe.schemaProperties = E;
  function g({ schemaCode: i, data: m, it: { gen: v, topSchemaRef: p, schemaPath: y, errorPath: $ }, it: b }, I, L, F) {
    const H = F ? (0, e._)`${i}, ${m}, ${p}${y}` : m, U = [
      [f.default.instancePath, (0, e.strConcat)(f.default.instancePath, $)],
      [f.default.parentData, b.parentData],
      [f.default.parentDataProperty, b.parentDataProperty],
      [f.default.rootData, f.default.rootData]
    ];
    b.opts.dynamicRef && U.push([f.default.dynamicAnchors, f.default.dynamicAnchors]);
    const V = (0, e._)`${H}, ${v.object(...U)}`;
    return L !== e.nil ? (0, e._)`${I}.call(${L}, ${V})` : (0, e._)`${I}(${V})`;
  }
  fe.callValidateCode = g;
  const w = (0, e._)`new RegExp`;
  function R({ gen: i, it: { opts: m } }, v) {
    const p = m.unicodeRegExp ? "u" : "", { regExp: y } = m.code, $ = y(v, p);
    return i.scopeValue("pattern", {
      key: $.toString(),
      ref: $,
      code: (0, e._)`${y.code === "new RegExp" ? w : (0, s.useFunc)(i, y)}(${v}, ${p})`
    });
  }
  fe.usePattern = R;
  function u(i) {
    const { gen: m, data: v, keyword: p, it: y } = i, $ = m.name("valid");
    if (y.allErrors) {
      const I = m.let("valid", !0);
      return b(() => m.assign(I, !1)), I;
    }
    return m.var($, !0), b(() => m.break()), $;
    function b(I) {
      const L = m.const("len", (0, e._)`${v}.length`);
      m.forRange("i", 0, L, (F) => {
        i.subschema({
          keyword: p,
          dataProp: F,
          dataPropType: t.Type.Num
        }, $), m.if((0, e.not)($), I);
      });
    }
  }
  fe.validateArray = u;
  function d(i) {
    const { gen: m, schema: v, keyword: p, it: y } = i;
    if (!Array.isArray(v))
      throw new Error("ajv implementation error");
    if (v.some((L) => (0, t.alwaysValidSchema)(y, L)) && !y.opts.unevaluated)
      return;
    const b = m.let("valid", !1), I = m.name("_valid");
    m.block(() => v.forEach((L, F) => {
      const H = i.subschema({
        keyword: p,
        schemaProp: F,
        compositeRule: !0
      }, I);
      m.assign(b, (0, e._)`${b} || ${I}`), i.mergeValidEvaluated(H, I) || m.if((0, e.not)(b));
    })), i.result(b, () => i.reset(), () => i.error(!0));
  }
  return fe.validateUnion = d, fe;
}
var Bo;
function nd() {
  if (Bo) return Ae;
  Bo = 1, Object.defineProperty(Ae, "__esModule", { value: !0 }), Ae.validateKeywordUsage = Ae.validSchemaType = Ae.funcKeywordCode = Ae.macroKeywordCode = void 0;
  const e = se(), t = Xe(), f = ke(), s = bn();
  function l(E, g) {
    const { gen: w, keyword: R, schema: u, parentSchema: d, it: i } = E, m = g.macro.call(i.self, u, d, i), v = a(w, R, m);
    i.opts.validateSchema !== !1 && i.self.validateSchema(m, !0);
    const p = w.name("valid");
    E.subschema({
      schema: m,
      schemaPath: e.nil,
      errSchemaPath: `${i.errSchemaPath}/${R}`,
      topSchemaRef: v,
      compositeRule: !0
    }, p), E.pass(p, () => E.error(!0));
  }
  Ae.macroKeywordCode = l;
  function r(E, g) {
    var w;
    const { gen: R, keyword: u, schema: d, parentSchema: i, $data: m, it: v } = E;
    o(v, g);
    const p = !m && g.compile ? g.compile.call(v.self, d, i, v) : g.validate, y = a(R, u, p), $ = R.let("valid");
    E.block$data($, b), E.ok((w = g.valid) !== null && w !== void 0 ? w : $);
    function b() {
      if (g.errors === !1)
        F(), g.modifying && n(E), H(() => E.error());
      else {
        const U = g.async ? I() : L();
        g.modifying && n(E), H(() => c(E, U));
      }
    }
    function I() {
      const U = R.let("ruleErrs", null);
      return R.try(() => F((0, e._)`await `), (V) => R.assign($, !1).if((0, e._)`${V} instanceof ${v.ValidationError}`, () => R.assign(U, (0, e._)`${V}.errors`), () => R.throw(V))), U;
    }
    function L() {
      const U = (0, e._)`${y}.errors`;
      return R.assign(U, null), F(e.nil), U;
    }
    function F(U = g.async ? (0, e._)`await ` : e.nil) {
      const V = v.opts.passContext ? t.default.this : t.default.self, K = !("compile" in g && !m || g.schema === !1);
      R.assign($, (0, e._)`${U}${(0, f.callValidateCode)(E, y, V, K)}`, g.modifying);
    }
    function H(U) {
      var V;
      R.if((0, e.not)((V = g.valid) !== null && V !== void 0 ? V : $), U);
    }
  }
  Ae.funcKeywordCode = r;
  function n(E) {
    const { gen: g, data: w, it: R } = E;
    g.if(R.parentData, () => g.assign(w, (0, e._)`${R.parentData}[${R.parentDataProperty}]`));
  }
  function c(E, g) {
    const { gen: w } = E;
    w.if((0, e._)`Array.isArray(${g})`, () => {
      w.assign(t.default.vErrors, (0, e._)`${t.default.vErrors} === null ? ${g} : ${t.default.vErrors}.concat(${g})`).assign(t.default.errors, (0, e._)`${t.default.vErrors}.length`), (0, s.extendErrors)(E);
    }, () => E.error());
  }
  function o({ schemaEnv: E }, g) {
    if (g.async && !E.$async)
      throw new Error("async keyword in sync schema");
  }
  function a(E, g, w) {
    if (w === void 0)
      throw new Error(`keyword "${g}" failed to compile`);
    return E.scopeValue("keyword", typeof w == "function" ? { ref: w } : { ref: w, code: (0, e.stringify)(w) });
  }
  function h(E, g, w = !1) {
    return !g.length || g.some((R) => R === "array" ? Array.isArray(E) : R === "object" ? E && typeof E == "object" && !Array.isArray(E) : typeof E == R || w && typeof E > "u");
  }
  Ae.validSchemaType = h;
  function _({ schema: E, opts: g, self: w, errSchemaPath: R }, u, d) {
    if (Array.isArray(u.keyword) ? !u.keyword.includes(d) : u.keyword !== d)
      throw new Error("ajv implementation error");
    const i = u.dependencies;
    if (i?.some((m) => !Object.prototype.hasOwnProperty.call(E, m)))
      throw new Error(`parent schema must have dependencies of ${d}: ${i.join(",")}`);
    if (u.validateSchema && !u.validateSchema(E[d])) {
      const v = `keyword "${d}" value is invalid at path "${R}": ` + w.errorsText(u.validateSchema.errors);
      if (g.validateSchema === "log")
        w.logger.error(v);
      else
        throw new Error(v);
    }
  }
  return Ae.validateKeywordUsage = _, Ae;
}
var xe = {}, Ho;
function id() {
  if (Ho) return xe;
  Ho = 1, Object.defineProperty(xe, "__esModule", { value: !0 }), xe.extendSubschemaMode = xe.extendSubschemaData = xe.getSubschema = void 0;
  const e = se(), t = ae();
  function f(r, { keyword: n, schemaProp: c, schema: o, schemaPath: a, errSchemaPath: h, topSchemaRef: _ }) {
    if (n !== void 0 && o !== void 0)
      throw new Error('both "keyword" and "schema" passed, only one allowed');
    if (n !== void 0) {
      const E = r.schema[n];
      return c === void 0 ? {
        schema: E,
        schemaPath: (0, e._)`${r.schemaPath}${(0, e.getProperty)(n)}`,
        errSchemaPath: `${r.errSchemaPath}/${n}`
      } : {
        schema: E[c],
        schemaPath: (0, e._)`${r.schemaPath}${(0, e.getProperty)(n)}${(0, e.getProperty)(c)}`,
        errSchemaPath: `${r.errSchemaPath}/${n}/${(0, t.escapeFragment)(c)}`
      };
    }
    if (o !== void 0) {
      if (a === void 0 || h === void 0 || _ === void 0)
        throw new Error('"schemaPath", "errSchemaPath" and "topSchemaRef" are required with "schema"');
      return {
        schema: o,
        schemaPath: a,
        topSchemaRef: _,
        errSchemaPath: h
      };
    }
    throw new Error('either "keyword" or "schema" must be passed');
  }
  xe.getSubschema = f;
  function s(r, n, { dataProp: c, dataPropType: o, data: a, dataTypes: h, propertyName: _ }) {
    if (a !== void 0 && c !== void 0)
      throw new Error('both "data" and "dataProp" passed, only one allowed');
    const { gen: E } = n;
    if (c !== void 0) {
      const { errorPath: w, dataPathArr: R, opts: u } = n, d = E.let("data", (0, e._)`${n.data}${(0, e.getProperty)(c)}`, !0);
      g(d), r.errorPath = (0, e.str)`${w}${(0, t.getErrorPath)(c, o, u.jsPropertySyntax)}`, r.parentDataProperty = (0, e._)`${c}`, r.dataPathArr = [...R, r.parentDataProperty];
    }
    if (a !== void 0) {
      const w = a instanceof e.Name ? a : E.let("data", a, !0);
      g(w), _ !== void 0 && (r.propertyName = _);
    }
    h && (r.dataTypes = h);
    function g(w) {
      r.data = w, r.dataLevel = n.dataLevel + 1, r.dataTypes = [], n.definedProperties = /* @__PURE__ */ new Set(), r.parentData = n.data, r.dataNames = [...n.dataNames, w];
    }
  }
  xe.extendSubschemaData = s;
  function l(r, { jtdDiscriminator: n, jtdMetadata: c, compositeRule: o, createErrors: a, allErrors: h }) {
    o !== void 0 && (r.compositeRule = o), a !== void 0 && (r.createErrors = a), h !== void 0 && (r.allErrors = h), r.jtdDiscriminator = n, r.jtdMetadata = c;
  }
  return xe.extendSubschemaMode = l, xe;
}
var Re = {}, Xn, Wo;
function Rn() {
  return Wo || (Wo = 1, Xn = function e(t, f) {
    if (t === f) return !0;
    if (t && f && typeof t == "object" && typeof f == "object") {
      if (t.constructor !== f.constructor) return !1;
      var s, l, r;
      if (Array.isArray(t)) {
        if (s = t.length, s != f.length) return !1;
        for (l = s; l-- !== 0; )
          if (!e(t[l], f[l])) return !1;
        return !0;
      }
      if (t.constructor === RegExp) return t.source === f.source && t.flags === f.flags;
      if (t.valueOf !== Object.prototype.valueOf) return t.valueOf() === f.valueOf();
      if (t.toString !== Object.prototype.toString) return t.toString() === f.toString();
      if (r = Object.keys(t), s = r.length, s !== Object.keys(f).length) return !1;
      for (l = s; l-- !== 0; )
        if (!Object.prototype.hasOwnProperty.call(f, r[l])) return !1;
      for (l = s; l-- !== 0; ) {
        var n = r[l];
        if (!e(t[n], f[n])) return !1;
      }
      return !0;
    }
    return t !== t && f !== f;
  }), Xn;
}
var Jn = { exports: {} }, Xo;
function sd() {
  if (Xo) return Jn.exports;
  Xo = 1;
  var e = Jn.exports = function(s, l, r) {
    typeof l == "function" && (r = l, l = {}), r = l.cb || r;
    var n = typeof r == "function" ? r : r.pre || function() {
    }, c = r.post || function() {
    };
    t(l, n, c, s, "", s);
  };
  e.keywords = {
    additionalItems: !0,
    items: !0,
    contains: !0,
    additionalProperties: !0,
    propertyNames: !0,
    not: !0,
    if: !0,
    then: !0,
    else: !0
  }, e.arrayKeywords = {
    items: !0,
    allOf: !0,
    anyOf: !0,
    oneOf: !0
  }, e.propsKeywords = {
    $defs: !0,
    definitions: !0,
    properties: !0,
    patternProperties: !0,
    dependencies: !0
  }, e.skipKeywords = {
    default: !0,
    enum: !0,
    const: !0,
    required: !0,
    maximum: !0,
    minimum: !0,
    exclusiveMaximum: !0,
    exclusiveMinimum: !0,
    multipleOf: !0,
    maxLength: !0,
    minLength: !0,
    pattern: !0,
    format: !0,
    maxItems: !0,
    minItems: !0,
    uniqueItems: !0,
    maxProperties: !0,
    minProperties: !0
  };
  function t(s, l, r, n, c, o, a, h, _, E) {
    if (n && typeof n == "object" && !Array.isArray(n)) {
      l(n, c, o, a, h, _, E);
      for (var g in n) {
        var w = n[g];
        if (Array.isArray(w)) {
          if (g in e.arrayKeywords)
            for (var R = 0; R < w.length; R++)
              t(s, l, r, w[R], c + "/" + g + "/" + R, o, c, g, n, R);
        } else if (g in e.propsKeywords) {
          if (w && typeof w == "object")
            for (var u in w)
              t(s, l, r, w[u], c + "/" + g + "/" + f(u), o, c, g, n, u);
        } else (g in e.keywords || s.allKeys && !(g in e.skipKeywords)) && t(s, l, r, w, c + "/" + g, o, c, g, n);
      }
      r(n, c, o, a, h, _, E);
    }
  }
  function f(s) {
    return s.replace(/~/g, "~0").replace(/\//g, "~1");
  }
  return Jn.exports;
}
var Jo;
function Pn() {
  if (Jo) return Re;
  Jo = 1, Object.defineProperty(Re, "__esModule", { value: !0 }), Re.getSchemaRefs = Re.resolveUrl = Re.normalizeId = Re._getFullPath = Re.getFullPath = Re.inlineRef = void 0;
  const e = ae(), t = Rn(), f = sd(), s = /* @__PURE__ */ new Set([
    "type",
    "format",
    "pattern",
    "maxLength",
    "minLength",
    "maxProperties",
    "minProperties",
    "maxItems",
    "minItems",
    "maximum",
    "minimum",
    "uniqueItems",
    "multipleOf",
    "required",
    "enum",
    "const"
  ]);
  function l(R, u = !0) {
    return typeof R == "boolean" ? !0 : u === !0 ? !n(R) : u ? c(R) <= u : !1;
  }
  Re.inlineRef = l;
  const r = /* @__PURE__ */ new Set([
    "$ref",
    "$recursiveRef",
    "$recursiveAnchor",
    "$dynamicRef",
    "$dynamicAnchor"
  ]);
  function n(R) {
    for (const u in R) {
      if (r.has(u))
        return !0;
      const d = R[u];
      if (Array.isArray(d) && d.some(n) || typeof d == "object" && n(d))
        return !0;
    }
    return !1;
  }
  function c(R) {
    let u = 0;
    for (const d in R) {
      if (d === "$ref")
        return 1 / 0;
      if (u++, !s.has(d) && (typeof R[d] == "object" && (0, e.eachItem)(R[d], (i) => u += c(i)), u === 1 / 0))
        return 1 / 0;
    }
    return u;
  }
  function o(R, u = "", d) {
    d !== !1 && (u = _(u));
    const i = R.parse(u);
    return a(R, i);
  }
  Re.getFullPath = o;
  function a(R, u) {
    return R.serialize(u).split("#")[0] + "#";
  }
  Re._getFullPath = a;
  const h = /#\/?$/;
  function _(R) {
    return R ? R.replace(h, "") : "";
  }
  Re.normalizeId = _;
  function E(R, u, d) {
    return d = _(d), R.resolve(u, d);
  }
  Re.resolveUrl = E;
  const g = /^[a-z_][-a-z0-9._]*$/i;
  function w(R, u) {
    if (typeof R == "boolean")
      return {};
    const { schemaId: d, uriResolver: i } = this.opts, m = _(R[d] || u), v = { "": m }, p = o(i, m, !1), y = {}, $ = /* @__PURE__ */ new Set();
    return f(R, { allKeys: !0 }, (L, F, H, U) => {
      if (U === void 0)
        return;
      const V = p + F;
      let K = v[U];
      typeof L[d] == "string" && (K = J.call(this, L[d])), W.call(this, L.$anchor), W.call(this, L.$dynamicAnchor), v[F] = K;
      function J(M) {
        const G = this.opts.uriResolver.resolve;
        if (M = _(K ? G(K, M) : M), $.has(M))
          throw I(M);
        $.add(M);
        let A = this.refs[M];
        return typeof A == "string" && (A = this.refs[A]), typeof A == "object" ? b(L, A.schema, M) : M !== _(V) && (M[0] === "#" ? (b(L, y[M], M), y[M] = L) : this.refs[M] = V), M;
      }
      function W(M) {
        if (typeof M == "string") {
          if (!g.test(M))
            throw new Error(`invalid anchor "${M}"`);
          J.call(this, `#${M}`);
        }
      }
    }), y;
    function b(L, F, H) {
      if (F !== void 0 && !t(L, F))
        throw I(H);
    }
    function I(L) {
      return new Error(`reference "${L}" resolves to more than one schema`);
    }
  }
  return Re.getSchemaRefs = w, Re;
}
var Zo;
function On() {
  if (Zo) return Ve;
  Zo = 1, Object.defineProperty(Ve, "__esModule", { value: !0 }), Ve.getData = Ve.KeywordCxt = Ve.validateFunctionCode = void 0;
  const e = td(), t = En(), f = cf(), s = En(), l = rd(), r = nd(), n = id(), c = se(), o = Xe(), a = Pn(), h = ae(), _ = bn();
  function E(N) {
    if (p(N) && ($(N), v(N))) {
      u(N);
      return;
    }
    g(N, () => (0, e.topBoolOrEmptySchema)(N));
  }
  Ve.validateFunctionCode = E;
  function g({ gen: N, validateName: D, schema: k, schemaEnv: j, opts: z }, Y) {
    z.code.es5 ? N.func(D, (0, c._)`${o.default.data}, ${o.default.valCxt}`, j.$async, () => {
      N.code((0, c._)`"use strict"; ${i(k, z)}`), R(N, z), N.code(Y);
    }) : N.func(D, (0, c._)`${o.default.data}, ${w(z)}`, j.$async, () => N.code(i(k, z)).code(Y));
  }
  function w(N) {
    return (0, c._)`{${o.default.instancePath}="", ${o.default.parentData}, ${o.default.parentDataProperty}, ${o.default.rootData}=${o.default.data}${N.dynamicRef ? (0, c._)`, ${o.default.dynamicAnchors}={}` : c.nil}}={}`;
  }
  function R(N, D) {
    N.if(o.default.valCxt, () => {
      N.var(o.default.instancePath, (0, c._)`${o.default.valCxt}.${o.default.instancePath}`), N.var(o.default.parentData, (0, c._)`${o.default.valCxt}.${o.default.parentData}`), N.var(o.default.parentDataProperty, (0, c._)`${o.default.valCxt}.${o.default.parentDataProperty}`), N.var(o.default.rootData, (0, c._)`${o.default.valCxt}.${o.default.rootData}`), D.dynamicRef && N.var(o.default.dynamicAnchors, (0, c._)`${o.default.valCxt}.${o.default.dynamicAnchors}`);
    }, () => {
      N.var(o.default.instancePath, (0, c._)`""`), N.var(o.default.parentData, (0, c._)`undefined`), N.var(o.default.parentDataProperty, (0, c._)`undefined`), N.var(o.default.rootData, o.default.data), D.dynamicRef && N.var(o.default.dynamicAnchors, (0, c._)`{}`);
    });
  }
  function u(N) {
    const { schema: D, opts: k, gen: j } = N;
    g(N, () => {
      k.$comment && D.$comment && U(N), L(N), j.let(o.default.vErrors, null), j.let(o.default.errors, 0), k.unevaluated && d(N), b(N), V(N);
    });
  }
  function d(N) {
    const { gen: D, validateName: k } = N;
    N.evaluated = D.const("evaluated", (0, c._)`${k}.evaluated`), D.if((0, c._)`${N.evaluated}.dynamicProps`, () => D.assign((0, c._)`${N.evaluated}.props`, (0, c._)`undefined`)), D.if((0, c._)`${N.evaluated}.dynamicItems`, () => D.assign((0, c._)`${N.evaluated}.items`, (0, c._)`undefined`));
  }
  function i(N, D) {
    const k = typeof N == "object" && N[D.schemaId];
    return k && (D.code.source || D.code.process) ? (0, c._)`/*# sourceURL=${k} */` : c.nil;
  }
  function m(N, D) {
    if (p(N) && ($(N), v(N))) {
      y(N, D);
      return;
    }
    (0, e.boolOrEmptySchema)(N, D);
  }
  function v({ schema: N, self: D }) {
    if (typeof N == "boolean")
      return !N;
    for (const k in N)
      if (D.RULES.all[k])
        return !0;
    return !1;
  }
  function p(N) {
    return typeof N.schema != "boolean";
  }
  function y(N, D) {
    const { schema: k, gen: j, opts: z } = N;
    z.$comment && k.$comment && U(N), F(N), H(N);
    const Y = j.const("_errs", o.default.errors);
    b(N, Y), j.var(D, (0, c._)`${Y} === ${o.default.errors}`);
  }
  function $(N) {
    (0, h.checkUnknownRules)(N), I(N);
  }
  function b(N, D) {
    if (N.opts.jtd)
      return J(N, [], !1, D);
    const k = (0, t.getSchemaTypes)(N.schema), j = (0, t.coerceAndCheckDataType)(N, k);
    J(N, k, !j, D);
  }
  function I(N) {
    const { schema: D, errSchemaPath: k, opts: j, self: z } = N;
    D.$ref && j.ignoreKeywordsWithRef && (0, h.schemaHasRulesButRef)(D, z.RULES) && z.logger.warn(`$ref: keywords ignored in schema at path "${k}"`);
  }
  function L(N) {
    const { schema: D, opts: k } = N;
    D.default !== void 0 && k.useDefaults && k.strictSchema && (0, h.checkStrictMode)(N, "default is ignored in the schema root");
  }
  function F(N) {
    const D = N.schema[N.opts.schemaId];
    D && (N.baseId = (0, a.resolveUrl)(N.opts.uriResolver, N.baseId, D));
  }
  function H(N) {
    if (N.schema.$async && !N.schemaEnv.$async)
      throw new Error("async schema in sync schema");
  }
  function U({ gen: N, schemaEnv: D, schema: k, errSchemaPath: j, opts: z }) {
    const Y = k.$comment;
    if (z.$comment === !0)
      N.code((0, c._)`${o.default.self}.logger.log(${Y})`);
    else if (typeof z.$comment == "function") {
      const X = (0, c.str)`${j}/$comment`, ve = N.scopeValue("root", { ref: D.root });
      N.code((0, c._)`${o.default.self}.opts.$comment(${Y}, ${X}, ${ve}.schema)`);
    }
  }
  function V(N) {
    const { gen: D, schemaEnv: k, validateName: j, ValidationError: z, opts: Y } = N;
    k.$async ? D.if((0, c._)`${o.default.errors} === 0`, () => D.return(o.default.data), () => D.throw((0, c._)`new ${z}(${o.default.vErrors})`)) : (D.assign((0, c._)`${j}.errors`, o.default.vErrors), Y.unevaluated && K(N), D.return((0, c._)`${o.default.errors} === 0`));
  }
  function K({ gen: N, evaluated: D, props: k, items: j }) {
    k instanceof c.Name && N.assign((0, c._)`${D}.props`, k), j instanceof c.Name && N.assign((0, c._)`${D}.items`, j);
  }
  function J(N, D, k, j) {
    const { gen: z, schema: Y, data: X, allErrors: ve, opts: ue, self: le } = N, { RULES: ne } = le;
    if (Y.$ref && (ue.ignoreKeywordsWithRef || !(0, h.schemaHasRulesButRef)(Y, ne))) {
      z.block(() => B(N, "$ref", ne.all.$ref.definition));
      return;
    }
    ue.jtd || M(N, D), z.block(() => {
      for (const he of ne.rules)
        be(he);
      be(ne.post);
    });
    function be(he) {
      (0, f.shouldUseGroup)(Y, he) && (he.type ? (z.if((0, s.checkDataType)(he.type, X, ue.strictNumbers)), W(N, he), D.length === 1 && D[0] === he.type && k && (z.else(), (0, s.reportTypeError)(N)), z.endIf()) : W(N, he), ve || z.if((0, c._)`${o.default.errors} === ${j || 0}`));
    }
  }
  function W(N, D) {
    const { gen: k, schema: j, opts: { useDefaults: z } } = N;
    z && (0, l.assignDefaults)(N, D.type), k.block(() => {
      for (const Y of D.rules)
        (0, f.shouldUseRule)(j, Y) && B(N, Y.keyword, Y.definition, D.type);
    });
  }
  function M(N, D) {
    N.schemaEnv.meta || !N.opts.strictTypes || (G(N, D), N.opts.allowUnionTypes || A(N, D), T(N, N.dataTypes));
  }
  function G(N, D) {
    if (D.length) {
      if (!N.dataTypes.length) {
        N.dataTypes = D;
        return;
      }
      D.forEach((k) => {
        C(N.dataTypes, k) || P(N, `type "${k}" not allowed by context "${N.dataTypes.join(",")}"`);
      }), S(N, D);
    }
  }
  function A(N, D) {
    D.length > 1 && !(D.length === 2 && D.includes("null")) && P(N, "use allowUnionTypes to allow union type keyword");
  }
  function T(N, D) {
    const k = N.self.RULES.all;
    for (const j in k) {
      const z = k[j];
      if (typeof z == "object" && (0, f.shouldUseRule)(N.schema, z)) {
        const { type: Y } = z.definition;
        Y.length && !Y.some((X) => q(D, X)) && P(N, `missing type "${Y.join(",")}" for keyword "${j}"`);
      }
    }
  }
  function q(N, D) {
    return N.includes(D) || D === "number" && N.includes("integer");
  }
  function C(N, D) {
    return N.includes(D) || D === "integer" && N.includes("number");
  }
  function S(N, D) {
    const k = [];
    for (const j of N.dataTypes)
      C(D, j) ? k.push(j) : D.includes("integer") && j === "number" && k.push("integer");
    N.dataTypes = k;
  }
  function P(N, D) {
    const k = N.schemaEnv.baseId + N.errSchemaPath;
    D += ` at "${k}" (strictTypes)`, (0, h.checkStrictMode)(N, D, N.opts.strictTypes);
  }
  class O {
    constructor(D, k, j) {
      if ((0, r.validateKeywordUsage)(D, k, j), this.gen = D.gen, this.allErrors = D.allErrors, this.keyword = j, this.data = D.data, this.schema = D.schema[j], this.$data = k.$data && D.opts.$data && this.schema && this.schema.$data, this.schemaValue = (0, h.schemaRefOrVal)(D, this.schema, j, this.$data), this.schemaType = k.schemaType, this.parentSchema = D.schema, this.params = {}, this.it = D, this.def = k, this.$data)
        this.schemaCode = D.gen.const("vSchema", Z(this.$data, D));
      else if (this.schemaCode = this.schemaValue, !(0, r.validSchemaType)(this.schema, k.schemaType, k.allowUndefined))
        throw new Error(`${j} value must be ${JSON.stringify(k.schemaType)}`);
      ("code" in k ? k.trackErrors : k.errors !== !1) && (this.errsCount = D.gen.const("_errs", o.default.errors));
    }
    result(D, k, j) {
      this.failResult((0, c.not)(D), k, j);
    }
    failResult(D, k, j) {
      this.gen.if(D), j ? j() : this.error(), k ? (this.gen.else(), k(), this.allErrors && this.gen.endIf()) : this.allErrors ? this.gen.endIf() : this.gen.else();
    }
    pass(D, k) {
      this.failResult((0, c.not)(D), void 0, k);
    }
    fail(D) {
      if (D === void 0) {
        this.error(), this.allErrors || this.gen.if(!1);
        return;
      }
      this.gen.if(D), this.error(), this.allErrors ? this.gen.endIf() : this.gen.else();
    }
    fail$data(D) {
      if (!this.$data)
        return this.fail(D);
      const { schemaCode: k } = this;
      this.fail((0, c._)`${k} !== undefined && (${(0, c.or)(this.invalid$data(), D)})`);
    }
    error(D, k, j) {
      if (k) {
        this.setParams(k), this._error(D, j), this.setParams({});
        return;
      }
      this._error(D, j);
    }
    _error(D, k) {
      (D ? _.reportExtraError : _.reportError)(this, this.def.error, k);
    }
    $dataError() {
      (0, _.reportError)(this, this.def.$dataError || _.keyword$DataError);
    }
    reset() {
      if (this.errsCount === void 0)
        throw new Error('add "trackErrors" to keyword definition');
      (0, _.resetErrorsCount)(this.gen, this.errsCount);
    }
    ok(D) {
      this.allErrors || this.gen.if(D);
    }
    setParams(D, k) {
      k ? Object.assign(this.params, D) : this.params = D;
    }
    block$data(D, k, j = c.nil) {
      this.gen.block(() => {
        this.check$data(D, j), k();
      });
    }
    check$data(D = c.nil, k = c.nil) {
      if (!this.$data)
        return;
      const { gen: j, schemaCode: z, schemaType: Y, def: X } = this;
      j.if((0, c.or)((0, c._)`${z} === undefined`, k)), D !== c.nil && j.assign(D, !0), (Y.length || X.validateSchema) && (j.elseIf(this.invalid$data()), this.$dataError(), D !== c.nil && j.assign(D, !1)), j.else();
    }
    invalid$data() {
      const { gen: D, schemaCode: k, schemaType: j, def: z, it: Y } = this;
      return (0, c.or)(X(), ve());
      function X() {
        if (j.length) {
          if (!(k instanceof c.Name))
            throw new Error("ajv implementation error");
          const ue = Array.isArray(j) ? j : [j];
          return (0, c._)`${(0, s.checkDataTypes)(ue, k, Y.opts.strictNumbers, s.DataType.Wrong)}`;
        }
        return c.nil;
      }
      function ve() {
        if (z.validateSchema) {
          const ue = D.scopeValue("validate$data", { ref: z.validateSchema });
          return (0, c._)`!${ue}(${k})`;
        }
        return c.nil;
      }
    }
    subschema(D, k) {
      const j = (0, n.getSubschema)(this.it, D);
      (0, n.extendSubschemaData)(j, this.it, D), (0, n.extendSubschemaMode)(j, D);
      const z = { ...this.it, ...j, items: void 0, props: void 0 };
      return m(z, k), z;
    }
    mergeEvaluated(D, k) {
      const { it: j, gen: z } = this;
      j.opts.unevaluated && (j.props !== !0 && D.props !== void 0 && (j.props = h.mergeEvaluated.props(z, D.props, j.props, k)), j.items !== !0 && D.items !== void 0 && (j.items = h.mergeEvaluated.items(z, D.items, j.items, k)));
    }
    mergeValidEvaluated(D, k) {
      const { it: j, gen: z } = this;
      if (j.opts.unevaluated && (j.props !== !0 || j.items !== !0))
        return z.if(k, () => this.mergeEvaluated(D, c.Name)), !0;
    }
  }
  Ve.KeywordCxt = O;
  function B(N, D, k, j) {
    const z = new O(N, k, D);
    "code" in k ? k.code(z, j) : z.$data && k.validate ? (0, r.funcKeywordCode)(z, k) : "macro" in k ? (0, r.macroKeywordCode)(z, k) : (k.compile || k.validate) && (0, r.funcKeywordCode)(z, k);
  }
  const x = /^\/(?:[^~]|~0|~1)*$/, Q = /^([0-9]+)(#|\/(?:[^~]|~0|~1)*)?$/;
  function Z(N, { dataLevel: D, dataNames: k, dataPathArr: j }) {
    let z, Y;
    if (N === "")
      return o.default.rootData;
    if (N[0] === "/") {
      if (!x.test(N))
        throw new Error(`Invalid JSON-pointer: ${N}`);
      z = N, Y = o.default.rootData;
    } else {
      const le = Q.exec(N);
      if (!le)
        throw new Error(`Invalid JSON-pointer: ${N}`);
      const ne = +le[1];
      if (z = le[2], z === "#") {
        if (ne >= D)
          throw new Error(ue("property/index", ne));
        return j[D - ne];
      }
      if (ne > D)
        throw new Error(ue("data", ne));
      if (Y = k[D - ne], !z)
        return Y;
    }
    let X = Y;
    const ve = z.split("/");
    for (const le of ve)
      le && (Y = (0, c._)`${Y}${(0, c.getProperty)((0, h.unescapeJsonPointer)(le))}`, X = (0, c._)`${X} && ${Y}`);
    return X;
    function ue(le, ne) {
      return `Cannot access ${le} ${ne} levels up, current level is ${D}`;
    }
  }
  return Ve.getData = Z, Ve;
}
var Kt = {}, Yo;
function Ws() {
  if (Yo) return Kt;
  Yo = 1, Object.defineProperty(Kt, "__esModule", { value: !0 });
  class e extends Error {
    constructor(f) {
      super("validation failed"), this.errors = f, this.ajv = this.validation = !0;
    }
  }
  return Kt.default = e, Kt;
}
var Bt = {}, Qo;
function Nn() {
  if (Qo) return Bt;
  Qo = 1, Object.defineProperty(Bt, "__esModule", { value: !0 });
  const e = Pn();
  class t extends Error {
    constructor(s, l, r, n) {
      super(n || `can't resolve reference ${r} from id ${l}`), this.missingRef = (0, e.resolveUrl)(s, l, r), this.missingSchema = (0, e.normalizeId)((0, e.getFullPath)(s, this.missingRef));
    }
  }
  return Bt.default = t, Bt;
}
var Ie = {}, ea;
function Xs() {
  if (ea) return Ie;
  ea = 1, Object.defineProperty(Ie, "__esModule", { value: !0 }), Ie.resolveSchema = Ie.getCompilingSchema = Ie.resolveRef = Ie.compileSchema = Ie.SchemaEnv = void 0;
  const e = se(), t = Ws(), f = Xe(), s = Pn(), l = ae(), r = On();
  class n {
    constructor(d) {
      var i;
      this.refs = {}, this.dynamicAnchors = {};
      let m;
      typeof d.schema == "object" && (m = d.schema), this.schema = d.schema, this.schemaId = d.schemaId, this.root = d.root || this, this.baseId = (i = d.baseId) !== null && i !== void 0 ? i : (0, s.normalizeId)(m?.[d.schemaId || "$id"]), this.schemaPath = d.schemaPath, this.localRefs = d.localRefs, this.meta = d.meta, this.$async = m?.$async, this.refs = {};
    }
  }
  Ie.SchemaEnv = n;
  function c(u) {
    const d = h.call(this, u);
    if (d)
      return d;
    const i = (0, s.getFullPath)(this.opts.uriResolver, u.root.baseId), { es5: m, lines: v } = this.opts.code, { ownProperties: p } = this.opts, y = new e.CodeGen(this.scope, { es5: m, lines: v, ownProperties: p });
    let $;
    u.$async && ($ = y.scopeValue("Error", {
      ref: t.default,
      code: (0, e._)`require("ajv/dist/runtime/validation_error").default`
    }));
    const b = y.scopeName("validate");
    u.validateName = b;
    const I = {
      gen: y,
      allErrors: this.opts.allErrors,
      data: f.default.data,
      parentData: f.default.parentData,
      parentDataProperty: f.default.parentDataProperty,
      dataNames: [f.default.data],
      dataPathArr: [e.nil],
      // TODO can its length be used as dataLevel if nil is removed?
      dataLevel: 0,
      dataTypes: [],
      definedProperties: /* @__PURE__ */ new Set(),
      topSchemaRef: y.scopeValue("schema", this.opts.code.source === !0 ? { ref: u.schema, code: (0, e.stringify)(u.schema) } : { ref: u.schema }),
      validateName: b,
      ValidationError: $,
      schema: u.schema,
      schemaEnv: u,
      rootId: i,
      baseId: u.baseId || i,
      schemaPath: e.nil,
      errSchemaPath: u.schemaPath || (this.opts.jtd ? "" : "#"),
      errorPath: (0, e._)`""`,
      opts: this.opts,
      self: this
    };
    let L;
    try {
      this._compilations.add(u), (0, r.validateFunctionCode)(I), y.optimize(this.opts.code.optimize);
      const F = y.toString();
      L = `${y.scopeRefs(f.default.scope)}return ${F}`, this.opts.code.process && (L = this.opts.code.process(L, u));
      const U = new Function(`${f.default.self}`, `${f.default.scope}`, L)(this, this.scope.get());
      if (this.scope.value(b, { ref: U }), U.errors = null, U.schema = u.schema, U.schemaEnv = u, u.$async && (U.$async = !0), this.opts.code.source === !0 && (U.source = { validateName: b, validateCode: F, scopeValues: y._values }), this.opts.unevaluated) {
        const { props: V, items: K } = I;
        U.evaluated = {
          props: V instanceof e.Name ? void 0 : V,
          items: K instanceof e.Name ? void 0 : K,
          dynamicProps: V instanceof e.Name,
          dynamicItems: K instanceof e.Name
        }, U.source && (U.source.evaluated = (0, e.stringify)(U.evaluated));
      }
      return u.validate = U, u;
    } catch (F) {
      throw delete u.validate, delete u.validateName, L && this.logger.error("Error compiling schema, function code:", L), F;
    } finally {
      this._compilations.delete(u);
    }
  }
  Ie.compileSchema = c;
  function o(u, d, i) {
    var m;
    i = (0, s.resolveUrl)(this.opts.uriResolver, d, i);
    const v = u.refs[i];
    if (v)
      return v;
    let p = E.call(this, u, i);
    if (p === void 0) {
      const y = (m = u.localRefs) === null || m === void 0 ? void 0 : m[i], { schemaId: $ } = this.opts;
      y && (p = new n({ schema: y, schemaId: $, root: u, baseId: d }));
    }
    if (p !== void 0)
      return u.refs[i] = a.call(this, p);
  }
  Ie.resolveRef = o;
  function a(u) {
    return (0, s.inlineRef)(u.schema, this.opts.inlineRefs) ? u.schema : u.validate ? u : c.call(this, u);
  }
  function h(u) {
    for (const d of this._compilations)
      if (_(d, u))
        return d;
  }
  Ie.getCompilingSchema = h;
  function _(u, d) {
    return u.schema === d.schema && u.root === d.root && u.baseId === d.baseId;
  }
  function E(u, d) {
    let i;
    for (; typeof (i = this.refs[d]) == "string"; )
      d = i;
    return i || this.schemas[d] || g.call(this, u, d);
  }
  function g(u, d) {
    const i = this.opts.uriResolver.parse(d), m = (0, s._getFullPath)(this.opts.uriResolver, i);
    let v = (0, s.getFullPath)(this.opts.uriResolver, u.baseId, void 0);
    if (Object.keys(u.schema).length > 0 && m === v)
      return R.call(this, i, u);
    const p = (0, s.normalizeId)(m), y = this.refs[p] || this.schemas[p];
    if (typeof y == "string") {
      const $ = g.call(this, u, y);
      return typeof $?.schema != "object" ? void 0 : R.call(this, i, $);
    }
    if (typeof y?.schema == "object") {
      if (y.validate || c.call(this, y), p === (0, s.normalizeId)(d)) {
        const { schema: $ } = y, { schemaId: b } = this.opts, I = $[b];
        return I && (v = (0, s.resolveUrl)(this.opts.uriResolver, v, I)), new n({ schema: $, schemaId: b, root: u, baseId: v });
      }
      return R.call(this, i, y);
    }
  }
  Ie.resolveSchema = g;
  const w = /* @__PURE__ */ new Set([
    "properties",
    "patternProperties",
    "enum",
    "dependencies",
    "definitions"
  ]);
  function R(u, { baseId: d, schema: i, root: m }) {
    var v;
    if (((v = u.fragment) === null || v === void 0 ? void 0 : v[0]) !== "/")
      return;
    for (const $ of u.fragment.slice(1).split("/")) {
      if (typeof i == "boolean")
        return;
      const b = i[(0, l.unescapeFragment)($)];
      if (b === void 0)
        return;
      i = b;
      const I = typeof i == "object" && i[this.opts.schemaId];
      !w.has($) && I && (d = (0, s.resolveUrl)(this.opts.uriResolver, d, I));
    }
    let p;
    if (typeof i != "boolean" && i.$ref && !(0, l.schemaHasRulesButRef)(i, this.RULES)) {
      const $ = (0, s.resolveUrl)(this.opts.uriResolver, d, i.$ref);
      p = g.call(this, m, $);
    }
    const { schemaId: y } = this.opts;
    if (p = p || new n({ schema: i, schemaId: y, root: m, baseId: d }), p.schema !== p.root.schema)
      return p;
  }
  return Ie;
}
const od = "https://raw.githubusercontent.com/ajv-validator/ajv/master/lib/refs/data.json#", ad = "Meta-schema for $data reference (JSON AnySchema extension proposal)", cd = "object", ud = ["$data"], ld = { $data: { type: "string", anyOf: [{ format: "relative-json-pointer" }, { format: "json-pointer" }] } }, fd = !1, dd = {
  $id: od,
  description: ad,
  type: cd,
  required: ud,
  properties: ld,
  additionalProperties: fd
};
var Ht = {}, yt = { exports: {} }, Zn, ta;
function hd() {
  return ta || (ta = 1, Zn = {
    HEX: {
      0: 0,
      1: 1,
      2: 2,
      3: 3,
      4: 4,
      5: 5,
      6: 6,
      7: 7,
      8: 8,
      9: 9,
      a: 10,
      A: 10,
      b: 11,
      B: 11,
      c: 12,
      C: 12,
      d: 13,
      D: 13,
      e: 14,
      E: 14,
      f: 15,
      F: 15
    }
  }), Zn;
}
var Yn, ra;
function md() {
  if (ra) return Yn;
  ra = 1;
  const { HEX: e } = hd();
  function t(w) {
    if (n(w, ".") < 3)
      return { host: w, isIPV4: !1 };
    const R = w.match(/^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/u) || [], [u] = R;
    return u ? { host: r(u, "."), isIPV4: !0 } : { host: w, isIPV4: !1 };
  }
  function f(w, R = !1) {
    let u = "", d = !0;
    for (const i of w) {
      if (e[i] === void 0) return;
      i !== "0" && d === !0 && (d = !1), d || (u += i);
    }
    return R && u.length === 0 && (u = "0"), u;
  }
  function s(w) {
    let R = 0;
    const u = { error: !1, address: "", zone: "" }, d = [], i = [];
    let m = !1, v = !1, p = !1;
    function y() {
      if (i.length) {
        if (m === !1) {
          const $ = f(i);
          if ($ !== void 0)
            d.push($);
          else
            return u.error = !0, !1;
        }
        i.length = 0;
      }
      return !0;
    }
    for (let $ = 0; $ < w.length; $++) {
      const b = w[$];
      if (!(b === "[" || b === "]"))
        if (b === ":") {
          if (v === !0 && (p = !0), !y())
            break;
          if (R++, d.push(":"), R > 7) {
            u.error = !0;
            break;
          }
          $ - 1 >= 0 && w[$ - 1] === ":" && (v = !0);
          continue;
        } else if (b === "%") {
          if (!y())
            break;
          m = !0;
        } else {
          i.push(b);
          continue;
        }
    }
    return i.length && (m ? u.zone = i.join("") : p ? d.push(i.join("")) : d.push(f(i))), u.address = d.join(""), u;
  }
  function l(w, R = {}) {
    if (n(w, ":") < 2)
      return { host: w, isIPV6: !1 };
    const u = s(w);
    if (u.error)
      return { host: w, isIPV6: !1 };
    {
      let d = u.address, i = u.address;
      return u.zone && (d += "%" + u.zone, i += "%25" + u.zone), { host: d, escapedHost: i, isIPV6: !0 };
    }
  }
  function r(w, R) {
    let u = "", d = !0;
    const i = w.length;
    for (let m = 0; m < i; m++) {
      const v = w[m];
      v === "0" && d ? (m + 1 <= i && w[m + 1] === R || m + 1 === i) && (u += v, d = !1) : (v === R ? d = !0 : d = !1, u += v);
    }
    return u;
  }
  function n(w, R) {
    let u = 0;
    for (let d = 0; d < w.length; d++)
      w[d] === R && u++;
    return u;
  }
  const c = /^\.\.?\//u, o = /^\/\.(?:\/|$)/u, a = /^\/\.\.(?:\/|$)/u, h = /^\/?(?:.|\n)*?(?=\/|$)/u;
  function _(w) {
    const R = [];
    for (; w.length; )
      if (w.match(c))
        w = w.replace(c, "");
      else if (w.match(o))
        w = w.replace(o, "/");
      else if (w.match(a))
        w = w.replace(a, "/"), R.pop();
      else if (w === "." || w === "..")
        w = "";
      else {
        const u = w.match(h);
        if (u) {
          const d = u[0];
          w = w.slice(d.length), R.push(d);
        } else
          throw new Error("Unexpected dot segment condition");
      }
    return R.join("");
  }
  function E(w, R) {
    const u = R !== !0 ? escape : unescape;
    return w.scheme !== void 0 && (w.scheme = u(w.scheme)), w.userinfo !== void 0 && (w.userinfo = u(w.userinfo)), w.host !== void 0 && (w.host = u(w.host)), w.path !== void 0 && (w.path = u(w.path)), w.query !== void 0 && (w.query = u(w.query)), w.fragment !== void 0 && (w.fragment = u(w.fragment)), w;
  }
  function g(w, R) {
    const u = [];
    if (w.userinfo !== void 0 && (u.push(w.userinfo), u.push("@")), w.host !== void 0) {
      let d = unescape(w.host);
      const i = t(d);
      if (i.isIPV4)
        d = i.host;
      else {
        const m = l(i.host, { isIPV4: !1 });
        m.isIPV6 === !0 ? d = `[${m.escapedHost}]` : d = w.host;
      }
      u.push(d);
    }
    return (typeof w.port == "number" || typeof w.port == "string") && (u.push(":"), u.push(String(w.port))), u.length ? u.join("") : void 0;
  }
  return Yn = {
    recomposeAuthority: g,
    normalizeComponentEncoding: E,
    removeDotSegments: _,
    normalizeIPv4: t,
    normalizeIPv6: l,
    stringArrayToHexStripped: f
  }, Yn;
}
var Qn, na;
function pd() {
  if (na) return Qn;
  na = 1;
  const e = /^[\da-f]{8}\b-[\da-f]{4}\b-[\da-f]{4}\b-[\da-f]{4}\b-[\da-f]{12}$/iu, t = /([\da-z][\d\-a-z]{0,31}):((?:[\w!$'()*+,\-.:;=@]|%[\da-f]{2})+)/iu;
  function f(i) {
    return typeof i.secure == "boolean" ? i.secure : String(i.scheme).toLowerCase() === "wss";
  }
  function s(i) {
    return i.host || (i.error = i.error || "HTTP URIs must have a host."), i;
  }
  function l(i) {
    const m = String(i.scheme).toLowerCase() === "https";
    return (i.port === (m ? 443 : 80) || i.port === "") && (i.port = void 0), i.path || (i.path = "/"), i;
  }
  function r(i) {
    return i.secure = f(i), i.resourceName = (i.path || "/") + (i.query ? "?" + i.query : ""), i.path = void 0, i.query = void 0, i;
  }
  function n(i) {
    if ((i.port === (f(i) ? 443 : 80) || i.port === "") && (i.port = void 0), typeof i.secure == "boolean" && (i.scheme = i.secure ? "wss" : "ws", i.secure = void 0), i.resourceName) {
      const [m, v] = i.resourceName.split("?");
      i.path = m && m !== "/" ? m : void 0, i.query = v, i.resourceName = void 0;
    }
    return i.fragment = void 0, i;
  }
  function c(i, m) {
    if (!i.path)
      return i.error = "URN can not be parsed", i;
    const v = i.path.match(t);
    if (v) {
      const p = m.scheme || i.scheme || "urn";
      i.nid = v[1].toLowerCase(), i.nss = v[2];
      const y = `${p}:${m.nid || i.nid}`, $ = d[y];
      i.path = void 0, $ && (i = $.parse(i, m));
    } else
      i.error = i.error || "URN can not be parsed.";
    return i;
  }
  function o(i, m) {
    const v = m.scheme || i.scheme || "urn", p = i.nid.toLowerCase(), y = `${v}:${m.nid || p}`, $ = d[y];
    $ && (i = $.serialize(i, m));
    const b = i, I = i.nss;
    return b.path = `${p || m.nid}:${I}`, m.skipEscape = !0, b;
  }
  function a(i, m) {
    const v = i;
    return v.uuid = v.nss, v.nss = void 0, !m.tolerant && (!v.uuid || !e.test(v.uuid)) && (v.error = v.error || "UUID is not valid."), v;
  }
  function h(i) {
    const m = i;
    return m.nss = (i.uuid || "").toLowerCase(), m;
  }
  const _ = {
    scheme: "http",
    domainHost: !0,
    parse: s,
    serialize: l
  }, E = {
    scheme: "https",
    domainHost: _.domainHost,
    parse: s,
    serialize: l
  }, g = {
    scheme: "ws",
    domainHost: !0,
    parse: r,
    serialize: n
  }, w = {
    scheme: "wss",
    domainHost: g.domainHost,
    parse: g.parse,
    serialize: g.serialize
  }, d = {
    http: _,
    https: E,
    ws: g,
    wss: w,
    urn: {
      scheme: "urn",
      parse: c,
      serialize: o,
      skipNormalize: !0
    },
    "urn:uuid": {
      scheme: "urn:uuid",
      parse: a,
      serialize: h,
      skipNormalize: !0
    }
  };
  return Qn = d, Qn;
}
var ia;
function uf() {
  if (ia) return yt.exports;
  ia = 1;
  const { normalizeIPv6: e, normalizeIPv4: t, removeDotSegments: f, recomposeAuthority: s, normalizeComponentEncoding: l } = md(), r = pd();
  function n(u, d) {
    return typeof u == "string" ? u = h(w(u, d), d) : typeof u == "object" && (u = w(h(u, d), d)), u;
  }
  function c(u, d, i) {
    const m = Object.assign({ scheme: "null" }, i), v = o(w(u, m), w(d, m), m, !0);
    return h(v, { ...m, skipEscape: !0 });
  }
  function o(u, d, i, m) {
    const v = {};
    return m || (u = w(h(u, i), i), d = w(h(d, i), i)), i = i || {}, !i.tolerant && d.scheme ? (v.scheme = d.scheme, v.userinfo = d.userinfo, v.host = d.host, v.port = d.port, v.path = f(d.path || ""), v.query = d.query) : (d.userinfo !== void 0 || d.host !== void 0 || d.port !== void 0 ? (v.userinfo = d.userinfo, v.host = d.host, v.port = d.port, v.path = f(d.path || ""), v.query = d.query) : (d.path ? (d.path.charAt(0) === "/" ? v.path = f(d.path) : ((u.userinfo !== void 0 || u.host !== void 0 || u.port !== void 0) && !u.path ? v.path = "/" + d.path : u.path ? v.path = u.path.slice(0, u.path.lastIndexOf("/") + 1) + d.path : v.path = d.path, v.path = f(v.path)), v.query = d.query) : (v.path = u.path, d.query !== void 0 ? v.query = d.query : v.query = u.query), v.userinfo = u.userinfo, v.host = u.host, v.port = u.port), v.scheme = u.scheme), v.fragment = d.fragment, v;
  }
  function a(u, d, i) {
    return typeof u == "string" ? (u = unescape(u), u = h(l(w(u, i), !0), { ...i, skipEscape: !0 })) : typeof u == "object" && (u = h(l(u, !0), { ...i, skipEscape: !0 })), typeof d == "string" ? (d = unescape(d), d = h(l(w(d, i), !0), { ...i, skipEscape: !0 })) : typeof d == "object" && (d = h(l(d, !0), { ...i, skipEscape: !0 })), u.toLowerCase() === d.toLowerCase();
  }
  function h(u, d) {
    const i = {
      host: u.host,
      scheme: u.scheme,
      userinfo: u.userinfo,
      port: u.port,
      path: u.path,
      query: u.query,
      nid: u.nid,
      nss: u.nss,
      uuid: u.uuid,
      fragment: u.fragment,
      reference: u.reference,
      resourceName: u.resourceName,
      secure: u.secure,
      error: ""
    }, m = Object.assign({}, d), v = [], p = r[(m.scheme || i.scheme || "").toLowerCase()];
    p && p.serialize && p.serialize(i, m), i.path !== void 0 && (m.skipEscape ? i.path = unescape(i.path) : (i.path = escape(i.path), i.scheme !== void 0 && (i.path = i.path.split("%3A").join(":")))), m.reference !== "suffix" && i.scheme && v.push(i.scheme, ":");
    const y = s(i, m);
    if (y !== void 0 && (m.reference !== "suffix" && v.push("//"), v.push(y), i.path && i.path.charAt(0) !== "/" && v.push("/")), i.path !== void 0) {
      let $ = i.path;
      !m.absolutePath && (!p || !p.absolutePath) && ($ = f($)), y === void 0 && ($ = $.replace(/^\/\//u, "/%2F")), v.push($);
    }
    return i.query !== void 0 && v.push("?", i.query), i.fragment !== void 0 && v.push("#", i.fragment), v.join("");
  }
  const _ = Array.from({ length: 127 }, (u, d) => /[^!"$&'()*+,\-.;=_`a-z{}~]/u.test(String.fromCharCode(d)));
  function E(u) {
    let d = 0;
    for (let i = 0, m = u.length; i < m; ++i)
      if (d = u.charCodeAt(i), d > 126 || _[d])
        return !0;
    return !1;
  }
  const g = /^(?:([^#/:?]+):)?(?:\/\/((?:([^#/?@]*)@)?(\[[^#/?\]]+\]|[^#/:?]*)(?::(\d*))?))?([^#?]*)(?:\?([^#]*))?(?:#((?:.|[\n\r])*))?/u;
  function w(u, d) {
    const i = Object.assign({}, d), m = {
      scheme: void 0,
      userinfo: void 0,
      host: "",
      port: void 0,
      path: "",
      query: void 0,
      fragment: void 0
    }, v = u.indexOf("%") !== -1;
    let p = !1;
    i.reference === "suffix" && (u = (i.scheme ? i.scheme + ":" : "") + "//" + u);
    const y = u.match(g);
    if (y) {
      if (m.scheme = y[1], m.userinfo = y[3], m.host = y[4], m.port = parseInt(y[5], 10), m.path = y[6] || "", m.query = y[7], m.fragment = y[8], isNaN(m.port) && (m.port = y[5]), m.host) {
        const b = t(m.host);
        if (b.isIPV4 === !1) {
          const I = e(b.host, { isIPV4: !1 });
          m.host = I.host.toLowerCase(), p = I.isIPV6;
        } else
          m.host = b.host, p = !0;
      }
      m.scheme === void 0 && m.userinfo === void 0 && m.host === void 0 && m.port === void 0 && !m.path && m.query === void 0 ? m.reference = "same-document" : m.scheme === void 0 ? m.reference = "relative" : m.fragment === void 0 ? m.reference = "absolute" : m.reference = "uri", i.reference && i.reference !== "suffix" && i.reference !== m.reference && (m.error = m.error || "URI is not a " + i.reference + " reference.");
      const $ = r[(i.scheme || m.scheme || "").toLowerCase()];
      if (!i.unicodeSupport && (!$ || !$.unicodeSupport) && m.host && (i.domainHost || $ && $.domainHost) && p === !1 && E(m.host))
        try {
          m.host = URL.domainToASCII(m.host.toLowerCase());
        } catch (b) {
          m.error = m.error || "Host's domain name can not be converted to ASCII: " + b;
        }
      (!$ || $ && !$.skipNormalize) && (v && m.scheme !== void 0 && (m.scheme = unescape(m.scheme)), v && m.host !== void 0 && (m.host = unescape(m.host)), m.path !== void 0 && m.path.length && (m.path = escape(unescape(m.path))), m.fragment !== void 0 && m.fragment.length && (m.fragment = encodeURI(decodeURIComponent(m.fragment)))), $ && $.parse && $.parse(m, i);
    } else
      m.error = m.error || "URI can not be parsed.";
    return m;
  }
  const R = {
    SCHEMES: r,
    normalize: n,
    resolve: c,
    resolveComponents: o,
    equal: a,
    serialize: h,
    parse: w
  };
  return yt.exports = R, yt.exports.default = R, yt.exports.fastUri = R, yt.exports;
}
var sa;
function yd() {
  if (sa) return Ht;
  sa = 1, Object.defineProperty(Ht, "__esModule", { value: !0 });
  const e = uf();
  return e.code = 'require("ajv/dist/runtime/uri").default', Ht.default = e, Ht;
}
var oa;
function vd() {
  return oa || (oa = 1, function(e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.CodeGen = e.Name = e.nil = e.stringify = e.str = e._ = e.KeywordCxt = void 0;
    var t = On();
    Object.defineProperty(e, "KeywordCxt", { enumerable: !0, get: function() {
      return t.KeywordCxt;
    } });
    var f = se();
    Object.defineProperty(e, "_", { enumerable: !0, get: function() {
      return f._;
    } }), Object.defineProperty(e, "str", { enumerable: !0, get: function() {
      return f.str;
    } }), Object.defineProperty(e, "stringify", { enumerable: !0, get: function() {
      return f.stringify;
    } }), Object.defineProperty(e, "nil", { enumerable: !0, get: function() {
      return f.nil;
    } }), Object.defineProperty(e, "Name", { enumerable: !0, get: function() {
      return f.Name;
    } }), Object.defineProperty(e, "CodeGen", { enumerable: !0, get: function() {
      return f.CodeGen;
    } });
    const s = Ws(), l = Nn(), r = af(), n = Xs(), c = se(), o = Pn(), a = En(), h = ae(), _ = dd, E = yd(), g = (A, T) => new RegExp(A, T);
    g.code = "new RegExp";
    const w = ["removeAdditional", "useDefaults", "coerceTypes"], R = /* @__PURE__ */ new Set([
      "validate",
      "serialize",
      "parse",
      "wrapper",
      "root",
      "schema",
      "keyword",
      "pattern",
      "formats",
      "validate$data",
      "func",
      "obj",
      "Error"
    ]), u = {
      errorDataPath: "",
      format: "`validateFormats: false` can be used instead.",
      nullable: '"nullable" keyword is supported by default.',
      jsonPointers: "Deprecated jsPropertySyntax can be used instead.",
      extendRefs: "Deprecated ignoreKeywordsWithRef can be used instead.",
      missingRefs: "Pass empty schema with $id that should be ignored to ajv.addSchema.",
      processCode: "Use option `code: {process: (code, schemaEnv: object) => string}`",
      sourceCode: "Use option `code: {source: true}`",
      strictDefaults: "It is default now, see option `strict`.",
      strictKeywords: "It is default now, see option `strict`.",
      uniqueItems: '"uniqueItems" keyword is always validated.',
      unknownFormats: "Disable strict mode or pass `true` to `ajv.addFormat` (or `formats` option).",
      cache: "Map is used as cache, schema object as key.",
      serialize: "Map is used as cache, schema object as key.",
      ajvErrors: "It is default now."
    }, d = {
      ignoreKeywordsWithRef: "",
      jsPropertySyntax: "",
      unicode: '"minLength"/"maxLength" account for unicode characters by default.'
    }, i = 200;
    function m(A) {
      var T, q, C, S, P, O, B, x, Q, Z, N, D, k, j, z, Y, X, ve, ue, le, ne, be, he, Ue, ge;
      const me = A.strict, oe = (T = A.code) === null || T === void 0 ? void 0 : T.optimize, ie = oe === !0 || oe === void 0 ? 1 : oe || 0, $e = (C = (q = A.code) === null || q === void 0 ? void 0 : q.regExp) !== null && C !== void 0 ? C : g, Mn = (S = A.uriResolver) !== null && S !== void 0 ? S : E.default;
      return {
        strictSchema: (O = (P = A.strictSchema) !== null && P !== void 0 ? P : me) !== null && O !== void 0 ? O : !0,
        strictNumbers: (x = (B = A.strictNumbers) !== null && B !== void 0 ? B : me) !== null && x !== void 0 ? x : !0,
        strictTypes: (Z = (Q = A.strictTypes) !== null && Q !== void 0 ? Q : me) !== null && Z !== void 0 ? Z : "log",
        strictTuples: (D = (N = A.strictTuples) !== null && N !== void 0 ? N : me) !== null && D !== void 0 ? D : "log",
        strictRequired: (j = (k = A.strictRequired) !== null && k !== void 0 ? k : me) !== null && j !== void 0 ? j : !1,
        code: A.code ? { ...A.code, optimize: ie, regExp: $e } : { optimize: ie, regExp: $e },
        loopRequired: (z = A.loopRequired) !== null && z !== void 0 ? z : i,
        loopEnum: (Y = A.loopEnum) !== null && Y !== void 0 ? Y : i,
        meta: (X = A.meta) !== null && X !== void 0 ? X : !0,
        messages: (ve = A.messages) !== null && ve !== void 0 ? ve : !0,
        inlineRefs: (ue = A.inlineRefs) !== null && ue !== void 0 ? ue : !0,
        schemaId: (le = A.schemaId) !== null && le !== void 0 ? le : "$id",
        addUsedSchema: (ne = A.addUsedSchema) !== null && ne !== void 0 ? ne : !0,
        validateSchema: (be = A.validateSchema) !== null && be !== void 0 ? be : !0,
        validateFormats: (he = A.validateFormats) !== null && he !== void 0 ? he : !0,
        unicodeRegExp: (Ue = A.unicodeRegExp) !== null && Ue !== void 0 ? Ue : !0,
        int32range: (ge = A.int32range) !== null && ge !== void 0 ? ge : !0,
        uriResolver: Mn
      };
    }
    class v {
      constructor(T = {}) {
        this.schemas = {}, this.refs = {}, this.formats = {}, this._compilations = /* @__PURE__ */ new Set(), this._loading = {}, this._cache = /* @__PURE__ */ new Map(), T = this.opts = { ...T, ...m(T) };
        const { es5: q, lines: C } = this.opts.code;
        this.scope = new c.ValueScope({ scope: {}, prefixes: R, es5: q, lines: C }), this.logger = H(T.logger);
        const S = T.validateFormats;
        T.validateFormats = !1, this.RULES = (0, r.getRules)(), p.call(this, u, T, "NOT SUPPORTED"), p.call(this, d, T, "DEPRECATED", "warn"), this._metaOpts = L.call(this), T.formats && b.call(this), this._addVocabularies(), this._addDefaultMetaSchema(), T.keywords && I.call(this, T.keywords), typeof T.meta == "object" && this.addMetaSchema(T.meta), $.call(this), T.validateFormats = S;
      }
      _addVocabularies() {
        this.addKeyword("$async");
      }
      _addDefaultMetaSchema() {
        const { $data: T, meta: q, schemaId: C } = this.opts;
        let S = _;
        C === "id" && (S = { ..._ }, S.id = S.$id, delete S.$id), q && T && this.addMetaSchema(S, S[C], !1);
      }
      defaultMeta() {
        const { meta: T, schemaId: q } = this.opts;
        return this.opts.defaultMeta = typeof T == "object" ? T[q] || T : void 0;
      }
      validate(T, q) {
        let C;
        if (typeof T == "string") {
          if (C = this.getSchema(T), !C)
            throw new Error(`no schema with key or ref "${T}"`);
        } else
          C = this.compile(T);
        const S = C(q);
        return "$async" in C || (this.errors = C.errors), S;
      }
      compile(T, q) {
        const C = this._addSchema(T, q);
        return C.validate || this._compileSchemaEnv(C);
      }
      compileAsync(T, q) {
        if (typeof this.opts.loadSchema != "function")
          throw new Error("options.loadSchema should be a function");
        const { loadSchema: C } = this.opts;
        return S.call(this, T, q);
        async function S(Z, N) {
          await P.call(this, Z.$schema);
          const D = this._addSchema(Z, N);
          return D.validate || O.call(this, D);
        }
        async function P(Z) {
          Z && !this.getSchema(Z) && await S.call(this, { $ref: Z }, !0);
        }
        async function O(Z) {
          try {
            return this._compileSchemaEnv(Z);
          } catch (N) {
            if (!(N instanceof l.default))
              throw N;
            return B.call(this, N), await x.call(this, N.missingSchema), O.call(this, Z);
          }
        }
        function B({ missingSchema: Z, missingRef: N }) {
          if (this.refs[Z])
            throw new Error(`AnySchema ${Z} is loaded but ${N} cannot be resolved`);
        }
        async function x(Z) {
          const N = await Q.call(this, Z);
          this.refs[Z] || await P.call(this, N.$schema), this.refs[Z] || this.addSchema(N, Z, q);
        }
        async function Q(Z) {
          const N = this._loading[Z];
          if (N)
            return N;
          try {
            return await (this._loading[Z] = C(Z));
          } finally {
            delete this._loading[Z];
          }
        }
      }
      // Adds schema to the instance
      addSchema(T, q, C, S = this.opts.validateSchema) {
        if (Array.isArray(T)) {
          for (const O of T)
            this.addSchema(O, void 0, C, S);
          return this;
        }
        let P;
        if (typeof T == "object") {
          const { schemaId: O } = this.opts;
          if (P = T[O], P !== void 0 && typeof P != "string")
            throw new Error(`schema ${O} must be string`);
        }
        return q = (0, o.normalizeId)(q || P), this._checkUnique(q), this.schemas[q] = this._addSchema(T, C, q, S, !0), this;
      }
      // Add schema that will be used to validate other schemas
      // options in META_IGNORE_OPTIONS are alway set to false
      addMetaSchema(T, q, C = this.opts.validateSchema) {
        return this.addSchema(T, q, !0, C), this;
      }
      //  Validate schema against its meta-schema
      validateSchema(T, q) {
        if (typeof T == "boolean")
          return !0;
        let C;
        if (C = T.$schema, C !== void 0 && typeof C != "string")
          throw new Error("$schema must be a string");
        if (C = C || this.opts.defaultMeta || this.defaultMeta(), !C)
          return this.logger.warn("meta-schema not available"), this.errors = null, !0;
        const S = this.validate(C, T);
        if (!S && q) {
          const P = "schema is invalid: " + this.errorsText();
          if (this.opts.validateSchema === "log")
            this.logger.error(P);
          else
            throw new Error(P);
        }
        return S;
      }
      // Get compiled schema by `key` or `ref`.
      // (`key` that was passed to `addSchema` or full schema reference - `schema.$id` or resolved id)
      getSchema(T) {
        let q;
        for (; typeof (q = y.call(this, T)) == "string"; )
          T = q;
        if (q === void 0) {
          const { schemaId: C } = this.opts, S = new n.SchemaEnv({ schema: {}, schemaId: C });
          if (q = n.resolveSchema.call(this, S, T), !q)
            return;
          this.refs[T] = q;
        }
        return q.validate || this._compileSchemaEnv(q);
      }
      // Remove cached schema(s).
      // If no parameter is passed all schemas but meta-schemas are removed.
      // If RegExp is passed all schemas with key/id matching pattern but meta-schemas are removed.
      // Even if schema is referenced by other schemas it still can be removed as other schemas have local references.
      removeSchema(T) {
        if (T instanceof RegExp)
          return this._removeAllSchemas(this.schemas, T), this._removeAllSchemas(this.refs, T), this;
        switch (typeof T) {
          case "undefined":
            return this._removeAllSchemas(this.schemas), this._removeAllSchemas(this.refs), this._cache.clear(), this;
          case "string": {
            const q = y.call(this, T);
            return typeof q == "object" && this._cache.delete(q.schema), delete this.schemas[T], delete this.refs[T], this;
          }
          case "object": {
            const q = T;
            this._cache.delete(q);
            let C = T[this.opts.schemaId];
            return C && (C = (0, o.normalizeId)(C), delete this.schemas[C], delete this.refs[C]), this;
          }
          default:
            throw new Error("ajv.removeSchema: invalid parameter");
        }
      }
      // add "vocabulary" - a collection of keywords
      addVocabulary(T) {
        for (const q of T)
          this.addKeyword(q);
        return this;
      }
      addKeyword(T, q) {
        let C;
        if (typeof T == "string")
          C = T, typeof q == "object" && (this.logger.warn("these parameters are deprecated, see docs for addKeyword"), q.keyword = C);
        else if (typeof T == "object" && q === void 0) {
          if (q = T, C = q.keyword, Array.isArray(C) && !C.length)
            throw new Error("addKeywords: keyword must be string or non-empty array");
        } else
          throw new Error("invalid addKeywords parameters");
        if (V.call(this, C, q), !q)
          return (0, h.eachItem)(C, (P) => K.call(this, P)), this;
        W.call(this, q);
        const S = {
          ...q,
          type: (0, a.getJSONTypes)(q.type),
          schemaType: (0, a.getJSONTypes)(q.schemaType)
        };
        return (0, h.eachItem)(C, S.type.length === 0 ? (P) => K.call(this, P, S) : (P) => S.type.forEach((O) => K.call(this, P, S, O))), this;
      }
      getKeyword(T) {
        const q = this.RULES.all[T];
        return typeof q == "object" ? q.definition : !!q;
      }
      // Remove keyword
      removeKeyword(T) {
        const { RULES: q } = this;
        delete q.keywords[T], delete q.all[T];
        for (const C of q.rules) {
          const S = C.rules.findIndex((P) => P.keyword === T);
          S >= 0 && C.rules.splice(S, 1);
        }
        return this;
      }
      // Add format
      addFormat(T, q) {
        return typeof q == "string" && (q = new RegExp(q)), this.formats[T] = q, this;
      }
      errorsText(T = this.errors, { separator: q = ", ", dataVar: C = "data" } = {}) {
        return !T || T.length === 0 ? "No errors" : T.map((S) => `${C}${S.instancePath} ${S.message}`).reduce((S, P) => S + q + P);
      }
      $dataMetaSchema(T, q) {
        const C = this.RULES.all;
        T = JSON.parse(JSON.stringify(T));
        for (const S of q) {
          const P = S.split("/").slice(1);
          let O = T;
          for (const B of P)
            O = O[B];
          for (const B in C) {
            const x = C[B];
            if (typeof x != "object")
              continue;
            const { $data: Q } = x.definition, Z = O[B];
            Q && Z && (O[B] = G(Z));
          }
        }
        return T;
      }
      _removeAllSchemas(T, q) {
        for (const C in T) {
          const S = T[C];
          (!q || q.test(C)) && (typeof S == "string" ? delete T[C] : S && !S.meta && (this._cache.delete(S.schema), delete T[C]));
        }
      }
      _addSchema(T, q, C, S = this.opts.validateSchema, P = this.opts.addUsedSchema) {
        let O;
        const { schemaId: B } = this.opts;
        if (typeof T == "object")
          O = T[B];
        else {
          if (this.opts.jtd)
            throw new Error("schema must be object");
          if (typeof T != "boolean")
            throw new Error("schema must be object or boolean");
        }
        let x = this._cache.get(T);
        if (x !== void 0)
          return x;
        C = (0, o.normalizeId)(O || C);
        const Q = o.getSchemaRefs.call(this, T, C);
        return x = new n.SchemaEnv({ schema: T, schemaId: B, meta: q, baseId: C, localRefs: Q }), this._cache.set(x.schema, x), P && !C.startsWith("#") && (C && this._checkUnique(C), this.refs[C] = x), S && this.validateSchema(T, !0), x;
      }
      _checkUnique(T) {
        if (this.schemas[T] || this.refs[T])
          throw new Error(`schema with key or id "${T}" already exists`);
      }
      _compileSchemaEnv(T) {
        if (T.meta ? this._compileMetaSchema(T) : n.compileSchema.call(this, T), !T.validate)
          throw new Error("ajv implementation error");
        return T.validate;
      }
      _compileMetaSchema(T) {
        const q = this.opts;
        this.opts = this._metaOpts;
        try {
          n.compileSchema.call(this, T);
        } finally {
          this.opts = q;
        }
      }
    }
    v.ValidationError = s.default, v.MissingRefError = l.default, e.default = v;
    function p(A, T, q, C = "error") {
      for (const S in A) {
        const P = S;
        P in T && this.logger[C](`${q}: option ${S}. ${A[P]}`);
      }
    }
    function y(A) {
      return A = (0, o.normalizeId)(A), this.schemas[A] || this.refs[A];
    }
    function $() {
      const A = this.opts.schemas;
      if (A)
        if (Array.isArray(A))
          this.addSchema(A);
        else
          for (const T in A)
            this.addSchema(A[T], T);
    }
    function b() {
      for (const A in this.opts.formats) {
        const T = this.opts.formats[A];
        T && this.addFormat(A, T);
      }
    }
    function I(A) {
      if (Array.isArray(A)) {
        this.addVocabulary(A);
        return;
      }
      this.logger.warn("keywords option as map is deprecated, pass array");
      for (const T in A) {
        const q = A[T];
        q.keyword || (q.keyword = T), this.addKeyword(q);
      }
    }
    function L() {
      const A = { ...this.opts };
      for (const T of w)
        delete A[T];
      return A;
    }
    const F = { log() {
    }, warn() {
    }, error() {
    } };
    function H(A) {
      if (A === !1)
        return F;
      if (A === void 0)
        return console;
      if (A.log && A.warn && A.error)
        return A;
      throw new Error("logger must implement log, warn and error methods");
    }
    const U = /^[a-z_$][a-z0-9_$:-]*$/i;
    function V(A, T) {
      const { RULES: q } = this;
      if ((0, h.eachItem)(A, (C) => {
        if (q.keywords[C])
          throw new Error(`Keyword ${C} is already defined`);
        if (!U.test(C))
          throw new Error(`Keyword ${C} has invalid name`);
      }), !!T && T.$data && !("code" in T || "validate" in T))
        throw new Error('$data keyword must have "code" or "validate" function');
    }
    function K(A, T, q) {
      var C;
      const S = T?.post;
      if (q && S)
        throw new Error('keyword with "post" flag cannot have "type"');
      const { RULES: P } = this;
      let O = S ? P.post : P.rules.find(({ type: x }) => x === q);
      if (O || (O = { type: q, rules: [] }, P.rules.push(O)), P.keywords[A] = !0, !T)
        return;
      const B = {
        keyword: A,
        definition: {
          ...T,
          type: (0, a.getJSONTypes)(T.type),
          schemaType: (0, a.getJSONTypes)(T.schemaType)
        }
      };
      T.before ? J.call(this, O, B, T.before) : O.rules.push(B), P.all[A] = B, (C = T.implements) === null || C === void 0 || C.forEach((x) => this.addKeyword(x));
    }
    function J(A, T, q) {
      const C = A.rules.findIndex((S) => S.keyword === q);
      C >= 0 ? A.rules.splice(C, 0, T) : (A.rules.push(T), this.logger.warn(`rule ${q} is not defined`));
    }
    function W(A) {
      let { metaSchema: T } = A;
      T !== void 0 && (A.$data && this.opts.$data && (T = G(T)), A.validateSchema = this.compile(T, !0));
    }
    const M = {
      $ref: "https://raw.githubusercontent.com/ajv-validator/ajv/master/lib/refs/data.json#"
    };
    function G(A) {
      return { anyOf: [A, M] };
    }
  }(Gn)), Gn;
}
var Wt = {}, Xt = {}, Jt = {}, aa;
function gd() {
  if (aa) return Jt;
  aa = 1, Object.defineProperty(Jt, "__esModule", { value: !0 });
  const e = {
    keyword: "id",
    code() {
      throw new Error('NOT SUPPORTED: keyword "id", use "$id" for schema ID');
    }
  };
  return Jt.default = e, Jt;
}
var He = {}, ca;
function _d() {
  if (ca) return He;
  ca = 1, Object.defineProperty(He, "__esModule", { value: !0 }), He.callRef = He.getValidate = void 0;
  const e = Nn(), t = ke(), f = se(), s = Xe(), l = Xs(), r = ae(), n = {
    keyword: "$ref",
    schemaType: "string",
    code(a) {
      const { gen: h, schema: _, it: E } = a, { baseId: g, schemaEnv: w, validateName: R, opts: u, self: d } = E, { root: i } = w;
      if ((_ === "#" || _ === "#/") && g === i.baseId)
        return v();
      const m = l.resolveRef.call(d, i, g, _);
      if (m === void 0)
        throw new e.default(E.opts.uriResolver, g, _);
      if (m instanceof l.SchemaEnv)
        return p(m);
      return y(m);
      function v() {
        if (w === i)
          return o(a, R, w, w.$async);
        const $ = h.scopeValue("root", { ref: i });
        return o(a, (0, f._)`${$}.validate`, i, i.$async);
      }
      function p($) {
        const b = c(a, $);
        o(a, b, $, $.$async);
      }
      function y($) {
        const b = h.scopeValue("schema", u.code.source === !0 ? { ref: $, code: (0, f.stringify)($) } : { ref: $ }), I = h.name("valid"), L = a.subschema({
          schema: $,
          dataTypes: [],
          schemaPath: f.nil,
          topSchemaRef: b,
          errSchemaPath: _
        }, I);
        a.mergeEvaluated(L), a.ok(I);
      }
    }
  };
  function c(a, h) {
    const { gen: _ } = a;
    return h.validate ? _.scopeValue("validate", { ref: h.validate }) : (0, f._)`${_.scopeValue("wrapper", { ref: h })}.validate`;
  }
  He.getValidate = c;
  function o(a, h, _, E) {
    const { gen: g, it: w } = a, { allErrors: R, schemaEnv: u, opts: d } = w, i = d.passContext ? s.default.this : f.nil;
    E ? m() : v();
    function m() {
      if (!u.$async)
        throw new Error("async schema referenced by sync schema");
      const $ = g.let("valid");
      g.try(() => {
        g.code((0, f._)`await ${(0, t.callValidateCode)(a, h, i)}`), y(h), R || g.assign($, !0);
      }, (b) => {
        g.if((0, f._)`!(${b} instanceof ${w.ValidationError})`, () => g.throw(b)), p(b), R || g.assign($, !1);
      }), a.ok($);
    }
    function v() {
      a.result((0, t.callValidateCode)(a, h, i), () => y(h), () => p(h));
    }
    function p($) {
      const b = (0, f._)`${$}.errors`;
      g.assign(s.default.vErrors, (0, f._)`${s.default.vErrors} === null ? ${b} : ${s.default.vErrors}.concat(${b})`), g.assign(s.default.errors, (0, f._)`${s.default.vErrors}.length`);
    }
    function y($) {
      var b;
      if (!w.opts.unevaluated)
        return;
      const I = (b = _?.validate) === null || b === void 0 ? void 0 : b.evaluated;
      if (w.props !== !0)
        if (I && !I.dynamicProps)
          I.props !== void 0 && (w.props = r.mergeEvaluated.props(g, I.props, w.props));
        else {
          const L = g.var("props", (0, f._)`${$}.evaluated.props`);
          w.props = r.mergeEvaluated.props(g, L, w.props, f.Name);
        }
      if (w.items !== !0)
        if (I && !I.dynamicItems)
          I.items !== void 0 && (w.items = r.mergeEvaluated.items(g, I.items, w.items));
        else {
          const L = g.var("items", (0, f._)`${$}.evaluated.items`);
          w.items = r.mergeEvaluated.items(g, L, w.items, f.Name);
        }
    }
  }
  return He.callRef = o, He.default = n, He;
}
var ua;
function $d() {
  if (ua) return Xt;
  ua = 1, Object.defineProperty(Xt, "__esModule", { value: !0 });
  const e = gd(), t = _d(), f = [
    "$schema",
    "$id",
    "$defs",
    "$vocabulary",
    { keyword: "$comment" },
    "definitions",
    e.default,
    t.default
  ];
  return Xt.default = f, Xt;
}
var Zt = {}, Yt = {}, la;
function Ed() {
  if (la) return Yt;
  la = 1, Object.defineProperty(Yt, "__esModule", { value: !0 });
  const e = se(), t = e.operators, f = {
    maximum: { okStr: "<=", ok: t.LTE, fail: t.GT },
    minimum: { okStr: ">=", ok: t.GTE, fail: t.LT },
    exclusiveMaximum: { okStr: "<", ok: t.LT, fail: t.GTE },
    exclusiveMinimum: { okStr: ">", ok: t.GT, fail: t.LTE }
  }, s = {
    message: ({ keyword: r, schemaCode: n }) => (0, e.str)`must be ${f[r].okStr} ${n}`,
    params: ({ keyword: r, schemaCode: n }) => (0, e._)`{comparison: ${f[r].okStr}, limit: ${n}}`
  }, l = {
    keyword: Object.keys(f),
    type: "number",
    schemaType: "number",
    $data: !0,
    error: s,
    code(r) {
      const { keyword: n, data: c, schemaCode: o } = r;
      r.fail$data((0, e._)`${c} ${f[n].fail} ${o} || isNaN(${c})`);
    }
  };
  return Yt.default = l, Yt;
}
var Qt = {}, fa;
function wd() {
  if (fa) return Qt;
  fa = 1, Object.defineProperty(Qt, "__esModule", { value: !0 });
  const e = se(), f = {
    keyword: "multipleOf",
    type: "number",
    schemaType: "number",
    $data: !0,
    error: {
      message: ({ schemaCode: s }) => (0, e.str)`must be multiple of ${s}`,
      params: ({ schemaCode: s }) => (0, e._)`{multipleOf: ${s}}`
    },
    code(s) {
      const { gen: l, data: r, schemaCode: n, it: c } = s, o = c.opts.multipleOfPrecision, a = l.let("res"), h = o ? (0, e._)`Math.abs(Math.round(${a}) - ${a}) > 1e-${o}` : (0, e._)`${a} !== parseInt(${a})`;
      s.fail$data((0, e._)`(${n} === 0 || (${a} = ${r}/${n}, ${h}))`);
    }
  };
  return Qt.default = f, Qt;
}
var er = {}, tr = {}, da;
function Sd() {
  if (da) return tr;
  da = 1, Object.defineProperty(tr, "__esModule", { value: !0 });
  function e(t) {
    const f = t.length;
    let s = 0, l = 0, r;
    for (; l < f; )
      s++, r = t.charCodeAt(l++), r >= 55296 && r <= 56319 && l < f && (r = t.charCodeAt(l), (r & 64512) === 56320 && l++);
    return s;
  }
  return tr.default = e, e.code = 'require("ajv/dist/runtime/ucs2length").default', tr;
}
var ha;
function bd() {
  if (ha) return er;
  ha = 1, Object.defineProperty(er, "__esModule", { value: !0 });
  const e = se(), t = ae(), f = Sd(), l = {
    keyword: ["maxLength", "minLength"],
    type: "string",
    schemaType: "number",
    $data: !0,
    error: {
      message({ keyword: r, schemaCode: n }) {
        const c = r === "maxLength" ? "more" : "fewer";
        return (0, e.str)`must NOT have ${c} than ${n} characters`;
      },
      params: ({ schemaCode: r }) => (0, e._)`{limit: ${r}}`
    },
    code(r) {
      const { keyword: n, data: c, schemaCode: o, it: a } = r, h = n === "maxLength" ? e.operators.GT : e.operators.LT, _ = a.opts.unicode === !1 ? (0, e._)`${c}.length` : (0, e._)`${(0, t.useFunc)(r.gen, f.default)}(${c})`;
      r.fail$data((0, e._)`${_} ${h} ${o}`);
    }
  };
  return er.default = l, er;
}
var rr = {}, ma;
function Rd() {
  if (ma) return rr;
  ma = 1, Object.defineProperty(rr, "__esModule", { value: !0 });
  const e = ke(), t = se(), s = {
    keyword: "pattern",
    type: "string",
    schemaType: "string",
    $data: !0,
    error: {
      message: ({ schemaCode: l }) => (0, t.str)`must match pattern "${l}"`,
      params: ({ schemaCode: l }) => (0, t._)`{pattern: ${l}}`
    },
    code(l) {
      const { data: r, $data: n, schema: c, schemaCode: o, it: a } = l, h = a.opts.unicodeRegExp ? "u" : "", _ = n ? (0, t._)`(new RegExp(${o}, ${h}))` : (0, e.usePattern)(l, c);
      l.fail$data((0, t._)`!${_}.test(${r})`);
    }
  };
  return rr.default = s, rr;
}
var nr = {}, pa;
function Pd() {
  if (pa) return nr;
  pa = 1, Object.defineProperty(nr, "__esModule", { value: !0 });
  const e = se(), f = {
    keyword: ["maxProperties", "minProperties"],
    type: "object",
    schemaType: "number",
    $data: !0,
    error: {
      message({ keyword: s, schemaCode: l }) {
        const r = s === "maxProperties" ? "more" : "fewer";
        return (0, e.str)`must NOT have ${r} than ${l} properties`;
      },
      params: ({ schemaCode: s }) => (0, e._)`{limit: ${s}}`
    },
    code(s) {
      const { keyword: l, data: r, schemaCode: n } = s, c = l === "maxProperties" ? e.operators.GT : e.operators.LT;
      s.fail$data((0, e._)`Object.keys(${r}).length ${c} ${n}`);
    }
  };
  return nr.default = f, nr;
}
var ir = {}, ya;
function Od() {
  if (ya) return ir;
  ya = 1, Object.defineProperty(ir, "__esModule", { value: !0 });
  const e = ke(), t = se(), f = ae(), l = {
    keyword: "required",
    type: "object",
    schemaType: "array",
    $data: !0,
    error: {
      message: ({ params: { missingProperty: r } }) => (0, t.str)`must have required property '${r}'`,
      params: ({ params: { missingProperty: r } }) => (0, t._)`{missingProperty: ${r}}`
    },
    code(r) {
      const { gen: n, schema: c, schemaCode: o, data: a, $data: h, it: _ } = r, { opts: E } = _;
      if (!h && c.length === 0)
        return;
      const g = c.length >= E.loopRequired;
      if (_.allErrors ? w() : R(), E.strictRequired) {
        const i = r.parentSchema.properties, { definedProperties: m } = r.it;
        for (const v of c)
          if (i?.[v] === void 0 && !m.has(v)) {
            const p = _.schemaEnv.baseId + _.errSchemaPath, y = `required property "${v}" is not defined at "${p}" (strictRequired)`;
            (0, f.checkStrictMode)(_, y, _.opts.strictRequired);
          }
      }
      function w() {
        if (g || h)
          r.block$data(t.nil, u);
        else
          for (const i of c)
            (0, e.checkReportMissingProp)(r, i);
      }
      function R() {
        const i = n.let("missing");
        if (g || h) {
          const m = n.let("valid", !0);
          r.block$data(m, () => d(i, m)), r.ok(m);
        } else
          n.if((0, e.checkMissingProp)(r, c, i)), (0, e.reportMissingProp)(r, i), n.else();
      }
      function u() {
        n.forOf("prop", o, (i) => {
          r.setParams({ missingProperty: i }), n.if((0, e.noPropertyInData)(n, a, i, E.ownProperties), () => r.error());
        });
      }
      function d(i, m) {
        r.setParams({ missingProperty: i }), n.forOf(i, o, () => {
          n.assign(m, (0, e.propertyInData)(n, a, i, E.ownProperties)), n.if((0, t.not)(m), () => {
            r.error(), n.break();
          });
        }, t.nil);
      }
    }
  };
  return ir.default = l, ir;
}
var sr = {}, va;
function Nd() {
  if (va) return sr;
  va = 1, Object.defineProperty(sr, "__esModule", { value: !0 });
  const e = se(), f = {
    keyword: ["maxItems", "minItems"],
    type: "array",
    schemaType: "number",
    $data: !0,
    error: {
      message({ keyword: s, schemaCode: l }) {
        const r = s === "maxItems" ? "more" : "fewer";
        return (0, e.str)`must NOT have ${r} than ${l} items`;
      },
      params: ({ schemaCode: s }) => (0, e._)`{limit: ${s}}`
    },
    code(s) {
      const { keyword: l, data: r, schemaCode: n } = s, c = l === "maxItems" ? e.operators.GT : e.operators.LT;
      s.fail$data((0, e._)`${r}.length ${c} ${n}`);
    }
  };
  return sr.default = f, sr;
}
var or = {}, ar = {}, ga;
function Js() {
  if (ga) return ar;
  ga = 1, Object.defineProperty(ar, "__esModule", { value: !0 });
  const e = Rn();
  return e.code = 'require("ajv/dist/runtime/equal").default', ar.default = e, ar;
}
var _a;
function Id() {
  if (_a) return or;
  _a = 1, Object.defineProperty(or, "__esModule", { value: !0 });
  const e = En(), t = se(), f = ae(), s = Js(), r = {
    keyword: "uniqueItems",
    type: "array",
    schemaType: "boolean",
    $data: !0,
    error: {
      message: ({ params: { i: n, j: c } }) => (0, t.str)`must NOT have duplicate items (items ## ${c} and ${n} are identical)`,
      params: ({ params: { i: n, j: c } }) => (0, t._)`{i: ${n}, j: ${c}}`
    },
    code(n) {
      const { gen: c, data: o, $data: a, schema: h, parentSchema: _, schemaCode: E, it: g } = n;
      if (!a && !h)
        return;
      const w = c.let("valid"), R = _.items ? (0, e.getSchemaTypes)(_.items) : [];
      n.block$data(w, u, (0, t._)`${E} === false`), n.ok(w);
      function u() {
        const v = c.let("i", (0, t._)`${o}.length`), p = c.let("j");
        n.setParams({ i: v, j: p }), c.assign(w, !0), c.if((0, t._)`${v} > 1`, () => (d() ? i : m)(v, p));
      }
      function d() {
        return R.length > 0 && !R.some((v) => v === "object" || v === "array");
      }
      function i(v, p) {
        const y = c.name("item"), $ = (0, e.checkDataTypes)(R, y, g.opts.strictNumbers, e.DataType.Wrong), b = c.const("indices", (0, t._)`{}`);
        c.for((0, t._)`;${v}--;`, () => {
          c.let(y, (0, t._)`${o}[${v}]`), c.if($, (0, t._)`continue`), R.length > 1 && c.if((0, t._)`typeof ${y} == "string"`, (0, t._)`${y} += "_"`), c.if((0, t._)`typeof ${b}[${y}] == "number"`, () => {
            c.assign(p, (0, t._)`${b}[${y}]`), n.error(), c.assign(w, !1).break();
          }).code((0, t._)`${b}[${y}] = ${v}`);
        });
      }
      function m(v, p) {
        const y = (0, f.useFunc)(c, s.default), $ = c.name("outer");
        c.label($).for((0, t._)`;${v}--;`, () => c.for((0, t._)`${p} = ${v}; ${p}--;`, () => c.if((0, t._)`${y}(${o}[${v}], ${o}[${p}])`, () => {
          n.error(), c.assign(w, !1).break($);
        })));
      }
    }
  };
  return or.default = r, or;
}
var cr = {}, $a;
function Td() {
  if ($a) return cr;
  $a = 1, Object.defineProperty(cr, "__esModule", { value: !0 });
  const e = se(), t = ae(), f = Js(), l = {
    keyword: "const",
    $data: !0,
    error: {
      message: "must be equal to constant",
      params: ({ schemaCode: r }) => (0, e._)`{allowedValue: ${r}}`
    },
    code(r) {
      const { gen: n, data: c, $data: o, schemaCode: a, schema: h } = r;
      o || h && typeof h == "object" ? r.fail$data((0, e._)`!${(0, t.useFunc)(n, f.default)}(${c}, ${a})`) : r.fail((0, e._)`${h} !== ${c}`);
    }
  };
  return cr.default = l, cr;
}
var ur = {}, Ea;
function Cd() {
  if (Ea) return ur;
  Ea = 1, Object.defineProperty(ur, "__esModule", { value: !0 });
  const e = se(), t = ae(), f = Js(), l = {
    keyword: "enum",
    schemaType: "array",
    $data: !0,
    error: {
      message: "must be equal to one of the allowed values",
      params: ({ schemaCode: r }) => (0, e._)`{allowedValues: ${r}}`
    },
    code(r) {
      const { gen: n, data: c, $data: o, schema: a, schemaCode: h, it: _ } = r;
      if (!o && a.length === 0)
        throw new Error("enum must have non-empty array");
      const E = a.length >= _.opts.loopEnum;
      let g;
      const w = () => g ?? (g = (0, t.useFunc)(n, f.default));
      let R;
      if (E || o)
        R = n.let("valid"), r.block$data(R, u);
      else {
        if (!Array.isArray(a))
          throw new Error("ajv implementation error");
        const i = n.const("vSchema", h);
        R = (0, e.or)(...a.map((m, v) => d(i, v)));
      }
      r.pass(R);
      function u() {
        n.assign(R, !1), n.forOf("v", h, (i) => n.if((0, e._)`${w()}(${c}, ${i})`, () => n.assign(R, !0).break()));
      }
      function d(i, m) {
        const v = a[m];
        return typeof v == "object" && v !== null ? (0, e._)`${w()}(${c}, ${i}[${m}])` : (0, e._)`${c} === ${v}`;
      }
    }
  };
  return ur.default = l, ur;
}
var wa;
function Dd() {
  if (wa) return Zt;
  wa = 1, Object.defineProperty(Zt, "__esModule", { value: !0 });
  const e = Ed(), t = wd(), f = bd(), s = Rd(), l = Pd(), r = Od(), n = Nd(), c = Id(), o = Td(), a = Cd(), h = [
    // number
    e.default,
    t.default,
    // string
    f.default,
    s.default,
    // object
    l.default,
    r.default,
    // array
    n.default,
    c.default,
    // any
    { keyword: "type", schemaType: ["string", "array"] },
    { keyword: "nullable", schemaType: "boolean" },
    o.default,
    a.default
  ];
  return Zt.default = h, Zt;
}
var lr = {}, at = {}, Sa;
function lf() {
  if (Sa) return at;
  Sa = 1, Object.defineProperty(at, "__esModule", { value: !0 }), at.validateAdditionalItems = void 0;
  const e = se(), t = ae(), s = {
    keyword: "additionalItems",
    type: "array",
    schemaType: ["boolean", "object"],
    before: "uniqueItems",
    error: {
      message: ({ params: { len: r } }) => (0, e.str)`must NOT have more than ${r} items`,
      params: ({ params: { len: r } }) => (0, e._)`{limit: ${r}}`
    },
    code(r) {
      const { parentSchema: n, it: c } = r, { items: o } = n;
      if (!Array.isArray(o)) {
        (0, t.checkStrictMode)(c, '"additionalItems" is ignored when "items" is not an array of schemas');
        return;
      }
      l(r, o);
    }
  };
  function l(r, n) {
    const { gen: c, schema: o, data: a, keyword: h, it: _ } = r;
    _.items = !0;
    const E = c.const("len", (0, e._)`${a}.length`);
    if (o === !1)
      r.setParams({ len: n.length }), r.pass((0, e._)`${E} <= ${n.length}`);
    else if (typeof o == "object" && !(0, t.alwaysValidSchema)(_, o)) {
      const w = c.var("valid", (0, e._)`${E} <= ${n.length}`);
      c.if((0, e.not)(w), () => g(w)), r.ok(w);
    }
    function g(w) {
      c.forRange("i", n.length, E, (R) => {
        r.subschema({ keyword: h, dataProp: R, dataPropType: t.Type.Num }, w), _.allErrors || c.if((0, e.not)(w), () => c.break());
      });
    }
  }
  return at.validateAdditionalItems = l, at.default = s, at;
}
var fr = {}, ct = {}, ba;
function ff() {
  if (ba) return ct;
  ba = 1, Object.defineProperty(ct, "__esModule", { value: !0 }), ct.validateTuple = void 0;
  const e = se(), t = ae(), f = ke(), s = {
    keyword: "items",
    type: "array",
    schemaType: ["object", "array", "boolean"],
    before: "uniqueItems",
    code(r) {
      const { schema: n, it: c } = r;
      if (Array.isArray(n))
        return l(r, "additionalItems", n);
      c.items = !0, !(0, t.alwaysValidSchema)(c, n) && r.ok((0, f.validateArray)(r));
    }
  };
  function l(r, n, c = r.schema) {
    const { gen: o, parentSchema: a, data: h, keyword: _, it: E } = r;
    R(a), E.opts.unevaluated && c.length && E.items !== !0 && (E.items = t.mergeEvaluated.items(o, c.length, E.items));
    const g = o.name("valid"), w = o.const("len", (0, e._)`${h}.length`);
    c.forEach((u, d) => {
      (0, t.alwaysValidSchema)(E, u) || (o.if((0, e._)`${w} > ${d}`, () => r.subschema({
        keyword: _,
        schemaProp: d,
        dataProp: d
      }, g)), r.ok(g));
    });
    function R(u) {
      const { opts: d, errSchemaPath: i } = E, m = c.length, v = m === u.minItems && (m === u.maxItems || u[n] === !1);
      if (d.strictTuples && !v) {
        const p = `"${_}" is ${m}-tuple, but minItems or maxItems/${n} are not specified or different at path "${i}"`;
        (0, t.checkStrictMode)(E, p, d.strictTuples);
      }
    }
  }
  return ct.validateTuple = l, ct.default = s, ct;
}
var Ra;
function Ad() {
  if (Ra) return fr;
  Ra = 1, Object.defineProperty(fr, "__esModule", { value: !0 });
  const e = ff(), t = {
    keyword: "prefixItems",
    type: "array",
    schemaType: ["array"],
    before: "uniqueItems",
    code: (f) => (0, e.validateTuple)(f, "items")
  };
  return fr.default = t, fr;
}
var dr = {}, Pa;
function Ld() {
  if (Pa) return dr;
  Pa = 1, Object.defineProperty(dr, "__esModule", { value: !0 });
  const e = se(), t = ae(), f = ke(), s = lf(), r = {
    keyword: "items",
    type: "array",
    schemaType: ["object", "boolean"],
    before: "uniqueItems",
    error: {
      message: ({ params: { len: n } }) => (0, e.str)`must NOT have more than ${n} items`,
      params: ({ params: { len: n } }) => (0, e._)`{limit: ${n}}`
    },
    code(n) {
      const { schema: c, parentSchema: o, it: a } = n, { prefixItems: h } = o;
      a.items = !0, !(0, t.alwaysValidSchema)(a, c) && (h ? (0, s.validateAdditionalItems)(n, h) : n.ok((0, f.validateArray)(n)));
    }
  };
  return dr.default = r, dr;
}
var hr = {}, Oa;
function kd() {
  if (Oa) return hr;
  Oa = 1, Object.defineProperty(hr, "__esModule", { value: !0 });
  const e = se(), t = ae(), s = {
    keyword: "contains",
    type: "array",
    schemaType: ["object", "boolean"],
    before: "uniqueItems",
    trackErrors: !0,
    error: {
      message: ({ params: { min: l, max: r } }) => r === void 0 ? (0, e.str)`must contain at least ${l} valid item(s)` : (0, e.str)`must contain at least ${l} and no more than ${r} valid item(s)`,
      params: ({ params: { min: l, max: r } }) => r === void 0 ? (0, e._)`{minContains: ${l}}` : (0, e._)`{minContains: ${l}, maxContains: ${r}}`
    },
    code(l) {
      const { gen: r, schema: n, parentSchema: c, data: o, it: a } = l;
      let h, _;
      const { minContains: E, maxContains: g } = c;
      a.opts.next ? (h = E === void 0 ? 1 : E, _ = g) : h = 1;
      const w = r.const("len", (0, e._)`${o}.length`);
      if (l.setParams({ min: h, max: _ }), _ === void 0 && h === 0) {
        (0, t.checkStrictMode)(a, '"minContains" == 0 without "maxContains": "contains" keyword ignored');
        return;
      }
      if (_ !== void 0 && h > _) {
        (0, t.checkStrictMode)(a, '"minContains" > "maxContains" is always invalid'), l.fail();
        return;
      }
      if ((0, t.alwaysValidSchema)(a, n)) {
        let m = (0, e._)`${w} >= ${h}`;
        _ !== void 0 && (m = (0, e._)`${m} && ${w} <= ${_}`), l.pass(m);
        return;
      }
      a.items = !0;
      const R = r.name("valid");
      _ === void 0 && h === 1 ? d(R, () => r.if(R, () => r.break())) : h === 0 ? (r.let(R, !0), _ !== void 0 && r.if((0, e._)`${o}.length > 0`, u)) : (r.let(R, !1), u()), l.result(R, () => l.reset());
      function u() {
        const m = r.name("_valid"), v = r.let("count", 0);
        d(m, () => r.if(m, () => i(v)));
      }
      function d(m, v) {
        r.forRange("i", 0, w, (p) => {
          l.subschema({
            keyword: "contains",
            dataProp: p,
            dataPropType: t.Type.Num,
            compositeRule: !0
          }, m), v();
        });
      }
      function i(m) {
        r.code((0, e._)`${m}++`), _ === void 0 ? r.if((0, e._)`${m} >= ${h}`, () => r.assign(R, !0).break()) : (r.if((0, e._)`${m} > ${_}`, () => r.assign(R, !1).break()), h === 1 ? r.assign(R, !0) : r.if((0, e._)`${m} >= ${h}`, () => r.assign(R, !0)));
      }
    }
  };
  return hr.default = s, hr;
}
var ei = {}, Na;
function jd() {
  return Na || (Na = 1, function(e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.validateSchemaDeps = e.validatePropertyDeps = e.error = void 0;
    const t = se(), f = ae(), s = ke();
    e.error = {
      message: ({ params: { property: o, depsCount: a, deps: h } }) => {
        const _ = a === 1 ? "property" : "properties";
        return (0, t.str)`must have ${_} ${h} when property ${o} is present`;
      },
      params: ({ params: { property: o, depsCount: a, deps: h, missingProperty: _ } }) => (0, t._)`{property: ${o},
    missingProperty: ${_},
    depsCount: ${a},
    deps: ${h}}`
      // TODO change to reference
    };
    const l = {
      keyword: "dependencies",
      type: "object",
      schemaType: "object",
      error: e.error,
      code(o) {
        const [a, h] = r(o);
        n(o, a), c(o, h);
      }
    };
    function r({ schema: o }) {
      const a = {}, h = {};
      for (const _ in o) {
        if (_ === "__proto__")
          continue;
        const E = Array.isArray(o[_]) ? a : h;
        E[_] = o[_];
      }
      return [a, h];
    }
    function n(o, a = o.schema) {
      const { gen: h, data: _, it: E } = o;
      if (Object.keys(a).length === 0)
        return;
      const g = h.let("missing");
      for (const w in a) {
        const R = a[w];
        if (R.length === 0)
          continue;
        const u = (0, s.propertyInData)(h, _, w, E.opts.ownProperties);
        o.setParams({
          property: w,
          depsCount: R.length,
          deps: R.join(", ")
        }), E.allErrors ? h.if(u, () => {
          for (const d of R)
            (0, s.checkReportMissingProp)(o, d);
        }) : (h.if((0, t._)`${u} && (${(0, s.checkMissingProp)(o, R, g)})`), (0, s.reportMissingProp)(o, g), h.else());
      }
    }
    e.validatePropertyDeps = n;
    function c(o, a = o.schema) {
      const { gen: h, data: _, keyword: E, it: g } = o, w = h.name("valid");
      for (const R in a)
        (0, f.alwaysValidSchema)(g, a[R]) || (h.if(
          (0, s.propertyInData)(h, _, R, g.opts.ownProperties),
          () => {
            const u = o.subschema({ keyword: E, schemaProp: R }, w);
            o.mergeValidEvaluated(u, w);
          },
          () => h.var(w, !0)
          // TODO var
        ), o.ok(w));
    }
    e.validateSchemaDeps = c, e.default = l;
  }(ei)), ei;
}
var mr = {}, Ia;
function qd() {
  if (Ia) return mr;
  Ia = 1, Object.defineProperty(mr, "__esModule", { value: !0 });
  const e = se(), t = ae(), s = {
    keyword: "propertyNames",
    type: "object",
    schemaType: ["object", "boolean"],
    error: {
      message: "property name must be valid",
      params: ({ params: l }) => (0, e._)`{propertyName: ${l.propertyName}}`
    },
    code(l) {
      const { gen: r, schema: n, data: c, it: o } = l;
      if ((0, t.alwaysValidSchema)(o, n))
        return;
      const a = r.name("valid");
      r.forIn("key", c, (h) => {
        l.setParams({ propertyName: h }), l.subschema({
          keyword: "propertyNames",
          data: h,
          dataTypes: ["string"],
          propertyName: h,
          compositeRule: !0
        }, a), r.if((0, e.not)(a), () => {
          l.error(!0), o.allErrors || r.break();
        });
      }), l.ok(a);
    }
  };
  return mr.default = s, mr;
}
var pr = {}, Ta;
function df() {
  if (Ta) return pr;
  Ta = 1, Object.defineProperty(pr, "__esModule", { value: !0 });
  const e = ke(), t = se(), f = Xe(), s = ae(), r = {
    keyword: "additionalProperties",
    type: ["object"],
    schemaType: ["boolean", "object"],
    allowUndefined: !0,
    trackErrors: !0,
    error: {
      message: "must NOT have additional properties",
      params: ({ params: n }) => (0, t._)`{additionalProperty: ${n.additionalProperty}}`
    },
    code(n) {
      const { gen: c, schema: o, parentSchema: a, data: h, errsCount: _, it: E } = n;
      if (!_)
        throw new Error("ajv implementation error");
      const { allErrors: g, opts: w } = E;
      if (E.props = !0, w.removeAdditional !== "all" && (0, s.alwaysValidSchema)(E, o))
        return;
      const R = (0, e.allSchemaProperties)(a.properties), u = (0, e.allSchemaProperties)(a.patternProperties);
      d(), n.ok((0, t._)`${_} === ${f.default.errors}`);
      function d() {
        c.forIn("key", h, (y) => {
          !R.length && !u.length ? v(y) : c.if(i(y), () => v(y));
        });
      }
      function i(y) {
        let $;
        if (R.length > 8) {
          const b = (0, s.schemaRefOrVal)(E, a.properties, "properties");
          $ = (0, e.isOwnProperty)(c, b, y);
        } else R.length ? $ = (0, t.or)(...R.map((b) => (0, t._)`${y} === ${b}`)) : $ = t.nil;
        return u.length && ($ = (0, t.or)($, ...u.map((b) => (0, t._)`${(0, e.usePattern)(n, b)}.test(${y})`))), (0, t.not)($);
      }
      function m(y) {
        c.code((0, t._)`delete ${h}[${y}]`);
      }
      function v(y) {
        if (w.removeAdditional === "all" || w.removeAdditional && o === !1) {
          m(y);
          return;
        }
        if (o === !1) {
          n.setParams({ additionalProperty: y }), n.error(), g || c.break();
          return;
        }
        if (typeof o == "object" && !(0, s.alwaysValidSchema)(E, o)) {
          const $ = c.name("valid");
          w.removeAdditional === "failing" ? (p(y, $, !1), c.if((0, t.not)($), () => {
            n.reset(), m(y);
          })) : (p(y, $), g || c.if((0, t.not)($), () => c.break()));
        }
      }
      function p(y, $, b) {
        const I = {
          keyword: "additionalProperties",
          dataProp: y,
          dataPropType: s.Type.Str
        };
        b === !1 && Object.assign(I, {
          compositeRule: !0,
          createErrors: !1,
          allErrors: !1
        }), n.subschema(I, $);
      }
    }
  };
  return pr.default = r, pr;
}
var yr = {}, Ca;
function Fd() {
  if (Ca) return yr;
  Ca = 1, Object.defineProperty(yr, "__esModule", { value: !0 });
  const e = On(), t = ke(), f = ae(), s = df(), l = {
    keyword: "properties",
    type: "object",
    schemaType: "object",
    code(r) {
      const { gen: n, schema: c, parentSchema: o, data: a, it: h } = r;
      h.opts.removeAdditional === "all" && o.additionalProperties === void 0 && s.default.code(new e.KeywordCxt(h, s.default, "additionalProperties"));
      const _ = (0, t.allSchemaProperties)(c);
      for (const u of _)
        h.definedProperties.add(u);
      h.opts.unevaluated && _.length && h.props !== !0 && (h.props = f.mergeEvaluated.props(n, (0, f.toHash)(_), h.props));
      const E = _.filter((u) => !(0, f.alwaysValidSchema)(h, c[u]));
      if (E.length === 0)
        return;
      const g = n.name("valid");
      for (const u of E)
        w(u) ? R(u) : (n.if((0, t.propertyInData)(n, a, u, h.opts.ownProperties)), R(u), h.allErrors || n.else().var(g, !0), n.endIf()), r.it.definedProperties.add(u), r.ok(g);
      function w(u) {
        return h.opts.useDefaults && !h.compositeRule && c[u].default !== void 0;
      }
      function R(u) {
        r.subschema({
          keyword: "properties",
          schemaProp: u,
          dataProp: u
        }, g);
      }
    }
  };
  return yr.default = l, yr;
}
var vr = {}, Da;
function Md() {
  if (Da) return vr;
  Da = 1, Object.defineProperty(vr, "__esModule", { value: !0 });
  const e = ke(), t = se(), f = ae(), s = ae(), l = {
    keyword: "patternProperties",
    type: "object",
    schemaType: "object",
    code(r) {
      const { gen: n, schema: c, data: o, parentSchema: a, it: h } = r, { opts: _ } = h, E = (0, e.allSchemaProperties)(c), g = E.filter((v) => (0, f.alwaysValidSchema)(h, c[v]));
      if (E.length === 0 || g.length === E.length && (!h.opts.unevaluated || h.props === !0))
        return;
      const w = _.strictSchema && !_.allowMatchingProperties && a.properties, R = n.name("valid");
      h.props !== !0 && !(h.props instanceof t.Name) && (h.props = (0, s.evaluatedPropsToName)(n, h.props));
      const { props: u } = h;
      d();
      function d() {
        for (const v of E)
          w && i(v), h.allErrors ? m(v) : (n.var(R, !0), m(v), n.if(R));
      }
      function i(v) {
        for (const p in w)
          new RegExp(v).test(p) && (0, f.checkStrictMode)(h, `property ${p} matches pattern ${v} (use allowMatchingProperties)`);
      }
      function m(v) {
        n.forIn("key", o, (p) => {
          n.if((0, t._)`${(0, e.usePattern)(r, v)}.test(${p})`, () => {
            const y = g.includes(v);
            y || r.subschema({
              keyword: "patternProperties",
              schemaProp: v,
              dataProp: p,
              dataPropType: s.Type.Str
            }, R), h.opts.unevaluated && u !== !0 ? n.assign((0, t._)`${u}[${p}]`, !0) : !y && !h.allErrors && n.if((0, t.not)(R), () => n.break());
          });
        });
      }
    }
  };
  return vr.default = l, vr;
}
var gr = {}, Aa;
function Ud() {
  if (Aa) return gr;
  Aa = 1, Object.defineProperty(gr, "__esModule", { value: !0 });
  const e = ae(), t = {
    keyword: "not",
    schemaType: ["object", "boolean"],
    trackErrors: !0,
    code(f) {
      const { gen: s, schema: l, it: r } = f;
      if ((0, e.alwaysValidSchema)(r, l)) {
        f.fail();
        return;
      }
      const n = s.name("valid");
      f.subschema({
        keyword: "not",
        compositeRule: !0,
        createErrors: !1,
        allErrors: !1
      }, n), f.failResult(n, () => f.reset(), () => f.error());
    },
    error: { message: "must NOT be valid" }
  };
  return gr.default = t, gr;
}
var _r = {}, La;
function Vd() {
  if (La) return _r;
  La = 1, Object.defineProperty(_r, "__esModule", { value: !0 });
  const t = {
    keyword: "anyOf",
    schemaType: "array",
    trackErrors: !0,
    code: ke().validateUnion,
    error: { message: "must match a schema in anyOf" }
  };
  return _r.default = t, _r;
}
var $r = {}, ka;
function zd() {
  if (ka) return $r;
  ka = 1, Object.defineProperty($r, "__esModule", { value: !0 });
  const e = se(), t = ae(), s = {
    keyword: "oneOf",
    schemaType: "array",
    trackErrors: !0,
    error: {
      message: "must match exactly one schema in oneOf",
      params: ({ params: l }) => (0, e._)`{passingSchemas: ${l.passing}}`
    },
    code(l) {
      const { gen: r, schema: n, parentSchema: c, it: o } = l;
      if (!Array.isArray(n))
        throw new Error("ajv implementation error");
      if (o.opts.discriminator && c.discriminator)
        return;
      const a = n, h = r.let("valid", !1), _ = r.let("passing", null), E = r.name("_valid");
      l.setParams({ passing: _ }), r.block(g), l.result(h, () => l.reset(), () => l.error(!0));
      function g() {
        a.forEach((w, R) => {
          let u;
          (0, t.alwaysValidSchema)(o, w) ? r.var(E, !0) : u = l.subschema({
            keyword: "oneOf",
            schemaProp: R,
            compositeRule: !0
          }, E), R > 0 && r.if((0, e._)`${E} && ${h}`).assign(h, !1).assign(_, (0, e._)`[${_}, ${R}]`).else(), r.if(E, () => {
            r.assign(h, !0), r.assign(_, R), u && l.mergeEvaluated(u, e.Name);
          });
        });
      }
    }
  };
  return $r.default = s, $r;
}
var Er = {}, ja;
function xd() {
  if (ja) return Er;
  ja = 1, Object.defineProperty(Er, "__esModule", { value: !0 });
  const e = ae(), t = {
    keyword: "allOf",
    schemaType: "array",
    code(f) {
      const { gen: s, schema: l, it: r } = f;
      if (!Array.isArray(l))
        throw new Error("ajv implementation error");
      const n = s.name("valid");
      l.forEach((c, o) => {
        if ((0, e.alwaysValidSchema)(r, c))
          return;
        const a = f.subschema({ keyword: "allOf", schemaProp: o }, n);
        f.ok(n), f.mergeEvaluated(a);
      });
    }
  };
  return Er.default = t, Er;
}
var wr = {}, qa;
function Gd() {
  if (qa) return wr;
  qa = 1, Object.defineProperty(wr, "__esModule", { value: !0 });
  const e = se(), t = ae(), s = {
    keyword: "if",
    schemaType: ["object", "boolean"],
    trackErrors: !0,
    error: {
      message: ({ params: r }) => (0, e.str)`must match "${r.ifClause}" schema`,
      params: ({ params: r }) => (0, e._)`{failingKeyword: ${r.ifClause}}`
    },
    code(r) {
      const { gen: n, parentSchema: c, it: o } = r;
      c.then === void 0 && c.else === void 0 && (0, t.checkStrictMode)(o, '"if" without "then" and "else" is ignored');
      const a = l(o, "then"), h = l(o, "else");
      if (!a && !h)
        return;
      const _ = n.let("valid", !0), E = n.name("_valid");
      if (g(), r.reset(), a && h) {
        const R = n.let("ifClause");
        r.setParams({ ifClause: R }), n.if(E, w("then", R), w("else", R));
      } else a ? n.if(E, w("then")) : n.if((0, e.not)(E), w("else"));
      r.pass(_, () => r.error(!0));
      function g() {
        const R = r.subschema({
          keyword: "if",
          compositeRule: !0,
          createErrors: !1,
          allErrors: !1
        }, E);
        r.mergeEvaluated(R);
      }
      function w(R, u) {
        return () => {
          const d = r.subschema({ keyword: R }, E);
          n.assign(_, E), r.mergeValidEvaluated(d, _), u ? n.assign(u, (0, e._)`${R}`) : r.setParams({ ifClause: R });
        };
      }
    }
  };
  function l(r, n) {
    const c = r.schema[n];
    return c !== void 0 && !(0, t.alwaysValidSchema)(r, c);
  }
  return wr.default = s, wr;
}
var Sr = {}, Fa;
function Kd() {
  if (Fa) return Sr;
  Fa = 1, Object.defineProperty(Sr, "__esModule", { value: !0 });
  const e = ae(), t = {
    keyword: ["then", "else"],
    schemaType: ["object", "boolean"],
    code({ keyword: f, parentSchema: s, it: l }) {
      s.if === void 0 && (0, e.checkStrictMode)(l, `"${f}" without "if" is ignored`);
    }
  };
  return Sr.default = t, Sr;
}
var Ma;
function Bd() {
  if (Ma) return lr;
  Ma = 1, Object.defineProperty(lr, "__esModule", { value: !0 });
  const e = lf(), t = Ad(), f = ff(), s = Ld(), l = kd(), r = jd(), n = qd(), c = df(), o = Fd(), a = Md(), h = Ud(), _ = Vd(), E = zd(), g = xd(), w = Gd(), R = Kd();
  function u(d = !1) {
    const i = [
      // any
      h.default,
      _.default,
      E.default,
      g.default,
      w.default,
      R.default,
      // object
      n.default,
      c.default,
      r.default,
      o.default,
      a.default
    ];
    return d ? i.push(t.default, s.default) : i.push(e.default, f.default), i.push(l.default), i;
  }
  return lr.default = u, lr;
}
var br = {}, Rr = {}, Ua;
function Hd() {
  if (Ua) return Rr;
  Ua = 1, Object.defineProperty(Rr, "__esModule", { value: !0 });
  const e = se(), f = {
    keyword: "format",
    type: ["number", "string"],
    schemaType: "string",
    $data: !0,
    error: {
      message: ({ schemaCode: s }) => (0, e.str)`must match format "${s}"`,
      params: ({ schemaCode: s }) => (0, e._)`{format: ${s}}`
    },
    code(s, l) {
      const { gen: r, data: n, $data: c, schema: o, schemaCode: a, it: h } = s, { opts: _, errSchemaPath: E, schemaEnv: g, self: w } = h;
      if (!_.validateFormats)
        return;
      c ? R() : u();
      function R() {
        const d = r.scopeValue("formats", {
          ref: w.formats,
          code: _.code.formats
        }), i = r.const("fDef", (0, e._)`${d}[${a}]`), m = r.let("fType"), v = r.let("format");
        r.if((0, e._)`typeof ${i} == "object" && !(${i} instanceof RegExp)`, () => r.assign(m, (0, e._)`${i}.type || "string"`).assign(v, (0, e._)`${i}.validate`), () => r.assign(m, (0, e._)`"string"`).assign(v, i)), s.fail$data((0, e.or)(p(), y()));
        function p() {
          return _.strictSchema === !1 ? e.nil : (0, e._)`${a} && !${v}`;
        }
        function y() {
          const $ = g.$async ? (0, e._)`(${i}.async ? await ${v}(${n}) : ${v}(${n}))` : (0, e._)`${v}(${n})`, b = (0, e._)`(typeof ${v} == "function" ? ${$} : ${v}.test(${n}))`;
          return (0, e._)`${v} && ${v} !== true && ${m} === ${l} && !${b}`;
        }
      }
      function u() {
        const d = w.formats[o];
        if (!d) {
          p();
          return;
        }
        if (d === !0)
          return;
        const [i, m, v] = y(d);
        i === l && s.pass($());
        function p() {
          if (_.strictSchema === !1) {
            w.logger.warn(b());
            return;
          }
          throw new Error(b());
          function b() {
            return `unknown format "${o}" ignored in schema at path "${E}"`;
          }
        }
        function y(b) {
          const I = b instanceof RegExp ? (0, e.regexpCode)(b) : _.code.formats ? (0, e._)`${_.code.formats}${(0, e.getProperty)(o)}` : void 0, L = r.scopeValue("formats", { key: o, ref: b, code: I });
          return typeof b == "object" && !(b instanceof RegExp) ? [b.type || "string", b.validate, (0, e._)`${L}.validate`] : ["string", b, L];
        }
        function $() {
          if (typeof d == "object" && !(d instanceof RegExp) && d.async) {
            if (!g.$async)
              throw new Error("async format in sync schema");
            return (0, e._)`await ${v}(${n})`;
          }
          return typeof m == "function" ? (0, e._)`${v}(${n})` : (0, e._)`${v}.test(${n})`;
        }
      }
    }
  };
  return Rr.default = f, Rr;
}
var Va;
function Wd() {
  if (Va) return br;
  Va = 1, Object.defineProperty(br, "__esModule", { value: !0 });
  const t = [Hd().default];
  return br.default = t, br;
}
var tt = {}, za;
function Xd() {
  return za || (za = 1, Object.defineProperty(tt, "__esModule", { value: !0 }), tt.contentVocabulary = tt.metadataVocabulary = void 0, tt.metadataVocabulary = [
    "title",
    "description",
    "default",
    "deprecated",
    "readOnly",
    "writeOnly",
    "examples"
  ], tt.contentVocabulary = [
    "contentMediaType",
    "contentEncoding",
    "contentSchema"
  ]), tt;
}
var xa;
function Jd() {
  if (xa) return Wt;
  xa = 1, Object.defineProperty(Wt, "__esModule", { value: !0 });
  const e = $d(), t = Dd(), f = Bd(), s = Wd(), l = Xd(), r = [
    e.default,
    t.default,
    (0, f.default)(),
    s.default,
    l.metadataVocabulary,
    l.contentVocabulary
  ];
  return Wt.default = r, Wt;
}
var Pr = {}, vt = {}, Ga;
function Zd() {
  if (Ga) return vt;
  Ga = 1, Object.defineProperty(vt, "__esModule", { value: !0 }), vt.DiscrError = void 0;
  var e;
  return function(t) {
    t.Tag = "tag", t.Mapping = "mapping";
  }(e || (vt.DiscrError = e = {})), vt;
}
var Ka;
function Yd() {
  if (Ka) return Pr;
  Ka = 1, Object.defineProperty(Pr, "__esModule", { value: !0 });
  const e = se(), t = Zd(), f = Xs(), s = Nn(), l = ae(), n = {
    keyword: "discriminator",
    type: "object",
    schemaType: "object",
    error: {
      message: ({ params: { discrError: c, tagName: o } }) => c === t.DiscrError.Tag ? `tag "${o}" must be string` : `value of tag "${o}" must be in oneOf`,
      params: ({ params: { discrError: c, tag: o, tagName: a } }) => (0, e._)`{error: ${c}, tag: ${a}, tagValue: ${o}}`
    },
    code(c) {
      const { gen: o, data: a, schema: h, parentSchema: _, it: E } = c, { oneOf: g } = _;
      if (!E.opts.discriminator)
        throw new Error("discriminator: requires discriminator option");
      const w = h.propertyName;
      if (typeof w != "string")
        throw new Error("discriminator: requires propertyName");
      if (h.mapping)
        throw new Error("discriminator: mapping is not supported");
      if (!g)
        throw new Error("discriminator: requires oneOf keyword");
      const R = o.let("valid", !1), u = o.const("tag", (0, e._)`${a}${(0, e.getProperty)(w)}`);
      o.if((0, e._)`typeof ${u} == "string"`, () => d(), () => c.error(!1, { discrError: t.DiscrError.Tag, tag: u, tagName: w })), c.ok(R);
      function d() {
        const v = m();
        o.if(!1);
        for (const p in v)
          o.elseIf((0, e._)`${u} === ${p}`), o.assign(R, i(v[p]));
        o.else(), c.error(!1, { discrError: t.DiscrError.Mapping, tag: u, tagName: w }), o.endIf();
      }
      function i(v) {
        const p = o.name("valid"), y = c.subschema({ keyword: "oneOf", schemaProp: v }, p);
        return c.mergeEvaluated(y, e.Name), p;
      }
      function m() {
        var v;
        const p = {}, y = b(_);
        let $ = !0;
        for (let F = 0; F < g.length; F++) {
          let H = g[F];
          if (H?.$ref && !(0, l.schemaHasRulesButRef)(H, E.self.RULES)) {
            const V = H.$ref;
            if (H = f.resolveRef.call(E.self, E.schemaEnv.root, E.baseId, V), H instanceof f.SchemaEnv && (H = H.schema), H === void 0)
              throw new s.default(E.opts.uriResolver, E.baseId, V);
          }
          const U = (v = H?.properties) === null || v === void 0 ? void 0 : v[w];
          if (typeof U != "object")
            throw new Error(`discriminator: oneOf subschemas (or referenced schemas) must have "properties/${w}"`);
          $ = $ && (y || b(H)), I(U, F);
        }
        if (!$)
          throw new Error(`discriminator: "${w}" must be required`);
        return p;
        function b({ required: F }) {
          return Array.isArray(F) && F.includes(w);
        }
        function I(F, H) {
          if (F.const)
            L(F.const, H);
          else if (F.enum)
            for (const U of F.enum)
              L(U, H);
          else
            throw new Error(`discriminator: "properties/${w}" must have "const" or "enum"`);
        }
        function L(F, H) {
          if (typeof F != "string" || F in p)
            throw new Error(`discriminator: "${w}" values must be unique strings`);
          p[F] = H;
        }
      }
    }
  };
  return Pr.default = n, Pr;
}
const Qd = "http://json-schema.org/draft-07/schema#", eh = "http://json-schema.org/draft-07/schema#", th = "Core schema meta-schema", rh = { schemaArray: { type: "array", minItems: 1, items: { $ref: "#" } }, nonNegativeInteger: { type: "integer", minimum: 0 }, nonNegativeIntegerDefault0: { allOf: [{ $ref: "#/definitions/nonNegativeInteger" }, { default: 0 }] }, simpleTypes: { enum: ["array", "boolean", "integer", "null", "number", "object", "string"] }, stringArray: { type: "array", items: { type: "string" }, uniqueItems: !0, default: [] } }, nh = ["object", "boolean"], ih = { $id: { type: "string", format: "uri-reference" }, $schema: { type: "string", format: "uri" }, $ref: { type: "string", format: "uri-reference" }, $comment: { type: "string" }, title: { type: "string" }, description: { type: "string" }, default: !0, readOnly: { type: "boolean", default: !1 }, examples: { type: "array", items: !0 }, multipleOf: { type: "number", exclusiveMinimum: 0 }, maximum: { type: "number" }, exclusiveMaximum: { type: "number" }, minimum: { type: "number" }, exclusiveMinimum: { type: "number" }, maxLength: { $ref: "#/definitions/nonNegativeInteger" }, minLength: { $ref: "#/definitions/nonNegativeIntegerDefault0" }, pattern: { type: "string", format: "regex" }, additionalItems: { $ref: "#" }, items: { anyOf: [{ $ref: "#" }, { $ref: "#/definitions/schemaArray" }], default: !0 }, maxItems: { $ref: "#/definitions/nonNegativeInteger" }, minItems: { $ref: "#/definitions/nonNegativeIntegerDefault0" }, uniqueItems: { type: "boolean", default: !1 }, contains: { $ref: "#" }, maxProperties: { $ref: "#/definitions/nonNegativeInteger" }, minProperties: { $ref: "#/definitions/nonNegativeIntegerDefault0" }, required: { $ref: "#/definitions/stringArray" }, additionalProperties: { $ref: "#" }, definitions: { type: "object", additionalProperties: { $ref: "#" }, default: {} }, properties: { type: "object", additionalProperties: { $ref: "#" }, default: {} }, patternProperties: { type: "object", additionalProperties: { $ref: "#" }, propertyNames: { format: "regex" }, default: {} }, dependencies: { type: "object", additionalProperties: { anyOf: [{ $ref: "#" }, { $ref: "#/definitions/stringArray" }] } }, propertyNames: { $ref: "#" }, const: !0, enum: { type: "array", items: !0, minItems: 1, uniqueItems: !0 }, type: { anyOf: [{ $ref: "#/definitions/simpleTypes" }, { type: "array", items: { $ref: "#/definitions/simpleTypes" }, minItems: 1, uniqueItems: !0 }] }, format: { type: "string" }, contentMediaType: { type: "string" }, contentEncoding: { type: "string" }, if: { $ref: "#" }, then: { $ref: "#" }, else: { $ref: "#" }, allOf: { $ref: "#/definitions/schemaArray" }, anyOf: { $ref: "#/definitions/schemaArray" }, oneOf: { $ref: "#/definitions/schemaArray" }, not: { $ref: "#" } }, sh = {
  $schema: Qd,
  $id: eh,
  title: th,
  definitions: rh,
  type: nh,
  properties: ih,
  default: !0
};
var Ba;
function oh() {
  return Ba || (Ba = 1, function(e, t) {
    Object.defineProperty(t, "__esModule", { value: !0 }), t.MissingRefError = t.ValidationError = t.CodeGen = t.Name = t.nil = t.stringify = t.str = t._ = t.KeywordCxt = t.Ajv = void 0;
    const f = vd(), s = Jd(), l = Yd(), r = sh, n = ["/properties"], c = "http://json-schema.org/draft-07/schema";
    class o extends f.default {
      _addVocabularies() {
        super._addVocabularies(), s.default.forEach((w) => this.addVocabulary(w)), this.opts.discriminator && this.addKeyword(l.default);
      }
      _addDefaultMetaSchema() {
        if (super._addDefaultMetaSchema(), !this.opts.meta)
          return;
        const w = this.opts.$data ? this.$dataMetaSchema(r, n) : r;
        this.addMetaSchema(w, c, !1), this.refs["http://json-schema.org/schema"] = c;
      }
      defaultMeta() {
        return this.opts.defaultMeta = super.defaultMeta() || (this.getSchema(c) ? c : void 0);
      }
    }
    t.Ajv = o, e.exports = t = o, e.exports.Ajv = o, Object.defineProperty(t, "__esModule", { value: !0 }), t.default = o;
    var a = On();
    Object.defineProperty(t, "KeywordCxt", { enumerable: !0, get: function() {
      return a.KeywordCxt;
    } });
    var h = se();
    Object.defineProperty(t, "_", { enumerable: !0, get: function() {
      return h._;
    } }), Object.defineProperty(t, "str", { enumerable: !0, get: function() {
      return h.str;
    } }), Object.defineProperty(t, "stringify", { enumerable: !0, get: function() {
      return h.stringify;
    } }), Object.defineProperty(t, "nil", { enumerable: !0, get: function() {
      return h.nil;
    } }), Object.defineProperty(t, "Name", { enumerable: !0, get: function() {
      return h.Name;
    } }), Object.defineProperty(t, "CodeGen", { enumerable: !0, get: function() {
      return h.CodeGen;
    } });
    var _ = Ws();
    Object.defineProperty(t, "ValidationError", { enumerable: !0, get: function() {
      return _.default;
    } });
    var E = Nn();
    Object.defineProperty(t, "MissingRefError", { enumerable: !0, get: function() {
      return E.default;
    } });
  }(xt, xt.exports)), xt.exports;
}
var Or = { exports: {} }, ti = {}, Ha;
function ah() {
  return Ha || (Ha = 1, function(e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.formatNames = e.fastFormats = e.fullFormats = void 0;
    function t(I, L) {
      return { validate: I, compare: L };
    }
    e.fullFormats = {
      // date: http://tools.ietf.org/html/rfc3339#section-5.6
      date: t(r, n),
      // date-time: http://tools.ietf.org/html/rfc3339#section-5.6
      time: t(o, a),
      "date-time": t(_, E),
      // duration: https://tools.ietf.org/html/rfc3339#appendix-A
      duration: /^P(?!$)((\d+Y)?(\d+M)?(\d+D)?(T(?=\d)(\d+H)?(\d+M)?(\d+S)?)?|(\d+W)?)$/,
      uri: R,
      "uri-reference": /^(?:[a-z][a-z0-9+\-.]*:)?(?:\/?\/(?:(?:[a-z0-9\-._~!$&'()*+,;=:]|%[0-9a-f]{2})*@)?(?:\[(?:(?:(?:(?:[0-9a-f]{1,4}:){6}|::(?:[0-9a-f]{1,4}:){5}|(?:[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){4}|(?:(?:[0-9a-f]{1,4}:){0,1}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){3}|(?:(?:[0-9a-f]{1,4}:){0,2}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){2}|(?:(?:[0-9a-f]{1,4}:){0,3}[0-9a-f]{1,4})?::[0-9a-f]{1,4}:|(?:(?:[0-9a-f]{1,4}:){0,4}[0-9a-f]{1,4})?::)(?:[0-9a-f]{1,4}:[0-9a-f]{1,4}|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?))|(?:(?:[0-9a-f]{1,4}:){0,5}[0-9a-f]{1,4})?::[0-9a-f]{1,4}|(?:(?:[0-9a-f]{1,4}:){0,6}[0-9a-f]{1,4})?::)|[Vv][0-9a-f]+\.[a-z0-9\-._~!$&'()*+,;=:]+)\]|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)|(?:[a-z0-9\-._~!$&'"()*+,;=]|%[0-9a-f]{2})*)(?::\d*)?(?:\/(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})*)*|\/(?:(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})*)*)?|(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})*)*)?(?:\?(?:[a-z0-9\-._~!$&'"()*+,;=:@/?]|%[0-9a-f]{2})*)?(?:#(?:[a-z0-9\-._~!$&'"()*+,;=:@/?]|%[0-9a-f]{2})*)?$/i,
      // uri-template: https://tools.ietf.org/html/rfc6570
      "uri-template": /^(?:(?:[^\x00-\x20"'<>%\\^`{|}]|%[0-9a-f]{2})|\{[+#./;?&=,!@|]?(?:[a-z0-9_]|%[0-9a-f]{2})+(?::[1-9][0-9]{0,3}|\*)?(?:,(?:[a-z0-9_]|%[0-9a-f]{2})+(?::[1-9][0-9]{0,3}|\*)?)*\})*$/i,
      // For the source: https://gist.github.com/dperini/729294
      // For test cases: https://mathiasbynens.be/demo/url-regex
      url: /^(?:https?|ftp):\/\/(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z0-9\u{00a1}-\u{ffff}]+-)*[a-z0-9\u{00a1}-\u{ffff}]+)(?:\.(?:[a-z0-9\u{00a1}-\u{ffff}]+-)*[a-z0-9\u{00a1}-\u{ffff}]+)*(?:\.(?:[a-z\u{00a1}-\u{ffff}]{2,})))(?::\d{2,5})?(?:\/[^\s]*)?$/iu,
      email: /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i,
      hostname: /^(?=.{1,253}\.?$)[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[-0-9a-z]{0,61}[0-9a-z])?)*\.?$/i,
      // optimized https://www.safaribooksonline.com/library/view/regular-expressions-cookbook/9780596802837/ch07s16.html
      ipv4: /^(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)$/,
      ipv6: /^((([0-9a-f]{1,4}:){7}([0-9a-f]{1,4}|:))|(([0-9a-f]{1,4}:){6}(:[0-9a-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9a-f]{1,4}:){5}(((:[0-9a-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9a-f]{1,4}:){4}(((:[0-9a-f]{1,4}){1,3})|((:[0-9a-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9a-f]{1,4}:){3}(((:[0-9a-f]{1,4}){1,4})|((:[0-9a-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9a-f]{1,4}:){2}(((:[0-9a-f]{1,4}){1,5})|((:[0-9a-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9a-f]{1,4}:){1}(((:[0-9a-f]{1,4}){1,6})|((:[0-9a-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9a-f]{1,4}){1,7})|((:[0-9a-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))$/i,
      regex: b,
      // uuid: http://tools.ietf.org/html/rfc4122
      uuid: /^(?:urn:uuid:)?[0-9a-f]{8}-(?:[0-9a-f]{4}-){3}[0-9a-f]{12}$/i,
      // JSON-pointer: https://tools.ietf.org/html/rfc6901
      // uri fragment: https://tools.ietf.org/html/rfc3986#appendix-A
      "json-pointer": /^(?:\/(?:[^~/]|~0|~1)*)*$/,
      "json-pointer-uri-fragment": /^#(?:\/(?:[a-z0-9_\-.!$&'()*+,;:=@]|%[0-9a-f]{2}|~0|~1)*)*$/i,
      // relative JSON-pointer: http://tools.ietf.org/html/draft-luff-relative-json-pointer-00
      "relative-json-pointer": /^(?:0|[1-9][0-9]*)(?:#|(?:\/(?:[^~/]|~0|~1)*)*)$/,
      // the following formats are used by the openapi specification: https://spec.openapis.org/oas/v3.0.0#data-types
      // byte: https://github.com/miguelmota/is-base64
      byte: d,
      // signed 32 bit integer
      int32: { type: "number", validate: v },
      // signed 64 bit integer
      int64: { type: "number", validate: p },
      // C-type float
      float: { type: "number", validate: y },
      // C-type double
      double: { type: "number", validate: y },
      // hint to the UI to hide input strings
      password: !0,
      // unchecked string payload
      binary: !0
    }, e.fastFormats = {
      ...e.fullFormats,
      date: t(/^\d\d\d\d-[0-1]\d-[0-3]\d$/, n),
      time: t(/^(?:[0-2]\d:[0-5]\d:[0-5]\d|23:59:60)(?:\.\d+)?(?:z|[+-]\d\d(?::?\d\d)?)?$/i, a),
      "date-time": t(/^\d\d\d\d-[0-1]\d-[0-3]\d[t\s](?:[0-2]\d:[0-5]\d:[0-5]\d|23:59:60)(?:\.\d+)?(?:z|[+-]\d\d(?::?\d\d)?)$/i, E),
      // uri: https://github.com/mafintosh/is-my-json-valid/blob/master/formats.js
      uri: /^(?:[a-z][a-z0-9+\-.]*:)(?:\/?\/)?[^\s]*$/i,
      "uri-reference": /^(?:(?:[a-z][a-z0-9+\-.]*:)?\/?\/)?(?:[^\\\s#][^\s#]*)?(?:#[^\\\s]*)?$/i,
      // email (sources from jsen validator):
      // http://stackoverflow.com/questions/201323/using-a-regular-expression-to-validate-an-email-address#answer-8829363
      // http://www.w3.org/TR/html5/forms.html#valid-e-mail-address (search for 'wilful violation')
      email: /^[a-z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?)*$/i
    }, e.formatNames = Object.keys(e.fullFormats);
    function f(I) {
      return I % 4 === 0 && (I % 100 !== 0 || I % 400 === 0);
    }
    const s = /^(\d\d\d\d)-(\d\d)-(\d\d)$/, l = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    function r(I) {
      const L = s.exec(I);
      if (!L)
        return !1;
      const F = +L[1], H = +L[2], U = +L[3];
      return H >= 1 && H <= 12 && U >= 1 && U <= (H === 2 && f(F) ? 29 : l[H]);
    }
    function n(I, L) {
      if (I && L)
        return I > L ? 1 : I < L ? -1 : 0;
    }
    const c = /^(\d\d):(\d\d):(\d\d)(\.\d+)?(z|[+-]\d\d(?::?\d\d)?)?$/i;
    function o(I, L) {
      const F = c.exec(I);
      if (!F)
        return !1;
      const H = +F[1], U = +F[2], V = +F[3], K = F[5];
      return (H <= 23 && U <= 59 && V <= 59 || H === 23 && U === 59 && V === 60) && (!L || K !== "");
    }
    function a(I, L) {
      if (!(I && L))
        return;
      const F = c.exec(I), H = c.exec(L);
      if (F && H)
        return I = F[1] + F[2] + F[3] + (F[4] || ""), L = H[1] + H[2] + H[3] + (H[4] || ""), I > L ? 1 : I < L ? -1 : 0;
    }
    const h = /t|\s/i;
    function _(I) {
      const L = I.split(h);
      return L.length === 2 && r(L[0]) && o(L[1], !0);
    }
    function E(I, L) {
      if (!(I && L))
        return;
      const [F, H] = I.split(h), [U, V] = L.split(h), K = n(F, U);
      if (K !== void 0)
        return K || a(H, V);
    }
    const g = /\/|:/, w = /^(?:[a-z][a-z0-9+\-.]*:)(?:\/?\/(?:(?:[a-z0-9\-._~!$&'()*+,;=:]|%[0-9a-f]{2})*@)?(?:\[(?:(?:(?:(?:[0-9a-f]{1,4}:){6}|::(?:[0-9a-f]{1,4}:){5}|(?:[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){4}|(?:(?:[0-9a-f]{1,4}:){0,1}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){3}|(?:(?:[0-9a-f]{1,4}:){0,2}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){2}|(?:(?:[0-9a-f]{1,4}:){0,3}[0-9a-f]{1,4})?::[0-9a-f]{1,4}:|(?:(?:[0-9a-f]{1,4}:){0,4}[0-9a-f]{1,4})?::)(?:[0-9a-f]{1,4}:[0-9a-f]{1,4}|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?))|(?:(?:[0-9a-f]{1,4}:){0,5}[0-9a-f]{1,4})?::[0-9a-f]{1,4}|(?:(?:[0-9a-f]{1,4}:){0,6}[0-9a-f]{1,4})?::)|[Vv][0-9a-f]+\.[a-z0-9\-._~!$&'()*+,;=:]+)\]|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)|(?:[a-z0-9\-._~!$&'()*+,;=]|%[0-9a-f]{2})*)(?::\d*)?(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*|\/(?:(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*)?|(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*)(?:\?(?:[a-z0-9\-._~!$&'()*+,;=:@/?]|%[0-9a-f]{2})*)?(?:#(?:[a-z0-9\-._~!$&'()*+,;=:@/?]|%[0-9a-f]{2})*)?$/i;
    function R(I) {
      return g.test(I) && w.test(I);
    }
    const u = /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/gm;
    function d(I) {
      return u.lastIndex = 0, u.test(I);
    }
    const i = -(2 ** 31), m = 2 ** 31 - 1;
    function v(I) {
      return Number.isInteger(I) && I <= m && I >= i;
    }
    function p(I) {
      return Number.isInteger(I);
    }
    function y() {
      return !0;
    }
    const $ = /[^\\]\\Z/;
    function b(I) {
      if ($.test(I))
        return !1;
      try {
        return new RegExp(I), !0;
      } catch {
        return !1;
      }
    }
  }(ti)), ti;
}
var ri = {}, Nr = { exports: {} }, ni = {}, Ge = {}, rt = {}, ii = {}, si = {}, oi = {}, Wa;
function wn() {
  return Wa || (Wa = 1, function(e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.regexpCode = e.getEsmExportName = e.getProperty = e.safeStringify = e.stringify = e.strConcat = e.addCodeArg = e.str = e._ = e.nil = e._Code = e.Name = e.IDENTIFIER = e._CodeOrName = void 0;
    class t {
    }
    e._CodeOrName = t, e.IDENTIFIER = /^[a-z$_][a-z$_0-9]*$/i;
    class f extends t {
      constructor(i) {
        if (super(), !e.IDENTIFIER.test(i))
          throw new Error("CodeGen: name must be a valid identifier");
        this.str = i;
      }
      toString() {
        return this.str;
      }
      emptyStr() {
        return !1;
      }
      get names() {
        return { [this.str]: 1 };
      }
    }
    e.Name = f;
    class s extends t {
      constructor(i) {
        super(), this._items = typeof i == "string" ? [i] : i;
      }
      toString() {
        return this.str;
      }
      emptyStr() {
        if (this._items.length > 1)
          return !1;
        const i = this._items[0];
        return i === "" || i === '""';
      }
      get str() {
        var i;
        return (i = this._str) !== null && i !== void 0 ? i : this._str = this._items.reduce((m, v) => `${m}${v}`, "");
      }
      get names() {
        var i;
        return (i = this._names) !== null && i !== void 0 ? i : this._names = this._items.reduce((m, v) => (v instanceof f && (m[v.str] = (m[v.str] || 0) + 1), m), {});
      }
    }
    e._Code = s, e.nil = new s("");
    function l(d, ...i) {
      const m = [d[0]];
      let v = 0;
      for (; v < i.length; )
        c(m, i[v]), m.push(d[++v]);
      return new s(m);
    }
    e._ = l;
    const r = new s("+");
    function n(d, ...i) {
      const m = [g(d[0])];
      let v = 0;
      for (; v < i.length; )
        m.push(r), c(m, i[v]), m.push(r, g(d[++v]));
      return o(m), new s(m);
    }
    e.str = n;
    function c(d, i) {
      i instanceof s ? d.push(...i._items) : i instanceof f ? d.push(i) : d.push(_(i));
    }
    e.addCodeArg = c;
    function o(d) {
      let i = 1;
      for (; i < d.length - 1; ) {
        if (d[i] === r) {
          const m = a(d[i - 1], d[i + 1]);
          if (m !== void 0) {
            d.splice(i - 1, 3, m);
            continue;
          }
          d[i++] = "+";
        }
        i++;
      }
    }
    function a(d, i) {
      if (i === '""')
        return d;
      if (d === '""')
        return i;
      if (typeof d == "string")
        return i instanceof f || d[d.length - 1] !== '"' ? void 0 : typeof i != "string" ? `${d.slice(0, -1)}${i}"` : i[0] === '"' ? d.slice(0, -1) + i.slice(1) : void 0;
      if (typeof i == "string" && i[0] === '"' && !(d instanceof f))
        return `"${d}${i.slice(1)}`;
    }
    function h(d, i) {
      return i.emptyStr() ? d : d.emptyStr() ? i : n`${d}${i}`;
    }
    e.strConcat = h;
    function _(d) {
      return typeof d == "number" || typeof d == "boolean" || d === null ? d : g(Array.isArray(d) ? d.join(",") : d);
    }
    function E(d) {
      return new s(g(d));
    }
    e.stringify = E;
    function g(d) {
      return JSON.stringify(d).replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029");
    }
    e.safeStringify = g;
    function w(d) {
      return typeof d == "string" && e.IDENTIFIER.test(d) ? new s(`.${d}`) : l`[${d}]`;
    }
    e.getProperty = w;
    function R(d) {
      if (typeof d == "string" && e.IDENTIFIER.test(d))
        return new s(`${d}`);
      throw new Error(`CodeGen: invalid export name: ${d}, use explicit $id name mapping`);
    }
    e.getEsmExportName = R;
    function u(d) {
      return new s(d.toString());
    }
    e.regexpCode = u;
  }(oi)), oi;
}
var ai = {}, Xa;
function Ja() {
  return Xa || (Xa = 1, function(e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.ValueScope = e.ValueScopeName = e.Scope = e.varKinds = e.UsedValueState = void 0;
    const t = wn();
    class f extends Error {
      constructor(a) {
        super(`CodeGen: "code" for ${a} not defined`), this.value = a.value;
      }
    }
    var s;
    (function(o) {
      o[o.Started = 0] = "Started", o[o.Completed = 1] = "Completed";
    })(s || (e.UsedValueState = s = {})), e.varKinds = {
      const: new t.Name("const"),
      let: new t.Name("let"),
      var: new t.Name("var")
    };
    class l {
      constructor({ prefixes: a, parent: h } = {}) {
        this._names = {}, this._prefixes = a, this._parent = h;
      }
      toName(a) {
        return a instanceof t.Name ? a : this.name(a);
      }
      name(a) {
        return new t.Name(this._newName(a));
      }
      _newName(a) {
        const h = this._names[a] || this._nameGroup(a);
        return `${a}${h.index++}`;
      }
      _nameGroup(a) {
        var h, _;
        if (!((_ = (h = this._parent) === null || h === void 0 ? void 0 : h._prefixes) === null || _ === void 0) && _.has(a) || this._prefixes && !this._prefixes.has(a))
          throw new Error(`CodeGen: prefix "${a}" is not allowed in this scope`);
        return this._names[a] = { prefix: a, index: 0 };
      }
    }
    e.Scope = l;
    class r extends t.Name {
      constructor(a, h) {
        super(h), this.prefix = a;
      }
      setValue(a, { property: h, itemIndex: _ }) {
        this.value = a, this.scopePath = (0, t._)`.${new t.Name(h)}[${_}]`;
      }
    }
    e.ValueScopeName = r;
    const n = (0, t._)`\n`;
    class c extends l {
      constructor(a) {
        super(a), this._values = {}, this._scope = a.scope, this.opts = { ...a, _n: a.lines ? n : t.nil };
      }
      get() {
        return this._scope;
      }
      name(a) {
        return new r(a, this._newName(a));
      }
      value(a, h) {
        var _;
        if (h.ref === void 0)
          throw new Error("CodeGen: ref must be passed in value");
        const E = this.toName(a), { prefix: g } = E, w = (_ = h.key) !== null && _ !== void 0 ? _ : h.ref;
        let R = this._values[g];
        if (R) {
          const i = R.get(w);
          if (i)
            return i;
        } else
          R = this._values[g] = /* @__PURE__ */ new Map();
        R.set(w, E);
        const u = this._scope[g] || (this._scope[g] = []), d = u.length;
        return u[d] = h.ref, E.setValue(h, { property: g, itemIndex: d }), E;
      }
      getValue(a, h) {
        const _ = this._values[a];
        if (_)
          return _.get(h);
      }
      scopeRefs(a, h = this._values) {
        return this._reduceValues(h, (_) => {
          if (_.scopePath === void 0)
            throw new Error(`CodeGen: name "${_}" has no value`);
          return (0, t._)`${a}${_.scopePath}`;
        });
      }
      scopeCode(a = this._values, h, _) {
        return this._reduceValues(a, (E) => {
          if (E.value === void 0)
            throw new Error(`CodeGen: name "${E}" has no value`);
          return E.value.code;
        }, h, _);
      }
      _reduceValues(a, h, _ = {}, E) {
        let g = t.nil;
        for (const w in a) {
          const R = a[w];
          if (!R)
            continue;
          const u = _[w] = _[w] || /* @__PURE__ */ new Map();
          R.forEach((d) => {
            if (u.has(d))
              return;
            u.set(d, s.Started);
            let i = h(d);
            if (i) {
              const m = this.opts.es5 ? e.varKinds.var : e.varKinds.const;
              g = (0, t._)`${g}${m} ${d} = ${i};${this.opts._n}`;
            } else if (i = E?.(d))
              g = (0, t._)`${g}${i}${this.opts._n}`;
            else
              throw new f(d);
            u.set(d, s.Completed);
          });
        }
        return g;
      }
    }
    e.ValueScope = c;
  }(ai)), ai;
}
var Za;
function re() {
  return Za || (Za = 1, function(e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.or = e.and = e.not = e.CodeGen = e.operators = e.varKinds = e.ValueScopeName = e.ValueScope = e.Scope = e.Name = e.regexpCode = e.stringify = e.getProperty = e.nil = e.strConcat = e.str = e._ = void 0;
    const t = wn(), f = Ja();
    var s = wn();
    Object.defineProperty(e, "_", { enumerable: !0, get: function() {
      return s._;
    } }), Object.defineProperty(e, "str", { enumerable: !0, get: function() {
      return s.str;
    } }), Object.defineProperty(e, "strConcat", { enumerable: !0, get: function() {
      return s.strConcat;
    } }), Object.defineProperty(e, "nil", { enumerable: !0, get: function() {
      return s.nil;
    } }), Object.defineProperty(e, "getProperty", { enumerable: !0, get: function() {
      return s.getProperty;
    } }), Object.defineProperty(e, "stringify", { enumerable: !0, get: function() {
      return s.stringify;
    } }), Object.defineProperty(e, "regexpCode", { enumerable: !0, get: function() {
      return s.regexpCode;
    } }), Object.defineProperty(e, "Name", { enumerable: !0, get: function() {
      return s.Name;
    } });
    var l = Ja();
    Object.defineProperty(e, "Scope", { enumerable: !0, get: function() {
      return l.Scope;
    } }), Object.defineProperty(e, "ValueScope", { enumerable: !0, get: function() {
      return l.ValueScope;
    } }), Object.defineProperty(e, "ValueScopeName", { enumerable: !0, get: function() {
      return l.ValueScopeName;
    } }), Object.defineProperty(e, "varKinds", { enumerable: !0, get: function() {
      return l.varKinds;
    } }), e.operators = {
      GT: new t._Code(">"),
      GTE: new t._Code(">="),
      LT: new t._Code("<"),
      LTE: new t._Code("<="),
      EQ: new t._Code("==="),
      NEQ: new t._Code("!=="),
      NOT: new t._Code("!"),
      OR: new t._Code("||"),
      AND: new t._Code("&&"),
      ADD: new t._Code("+")
    };
    class r {
      optimizeNodes() {
        return this;
      }
      optimizeNames(S, P) {
        return this;
      }
    }
    class n extends r {
      constructor(S, P, O) {
        super(), this.varKind = S, this.name = P, this.rhs = O;
      }
      render({ es5: S, _n: P }) {
        const O = S ? f.varKinds.var : this.varKind, B = this.rhs === void 0 ? "" : ` = ${this.rhs}`;
        return `${O} ${this.name}${B};` + P;
      }
      optimizeNames(S, P) {
        if (S[this.name.str])
          return this.rhs && (this.rhs = V(this.rhs, S, P)), this;
      }
      get names() {
        return this.rhs instanceof t._CodeOrName ? this.rhs.names : {};
      }
    }
    class c extends r {
      constructor(S, P, O) {
        super(), this.lhs = S, this.rhs = P, this.sideEffects = O;
      }
      render({ _n: S }) {
        return `${this.lhs} = ${this.rhs};` + S;
      }
      optimizeNames(S, P) {
        if (!(this.lhs instanceof t.Name && !S[this.lhs.str] && !this.sideEffects))
          return this.rhs = V(this.rhs, S, P), this;
      }
      get names() {
        const S = this.lhs instanceof t.Name ? {} : { ...this.lhs.names };
        return U(S, this.rhs);
      }
    }
    class o extends c {
      constructor(S, P, O, B) {
        super(S, O, B), this.op = P;
      }
      render({ _n: S }) {
        return `${this.lhs} ${this.op}= ${this.rhs};` + S;
      }
    }
    class a extends r {
      constructor(S) {
        super(), this.label = S, this.names = {};
      }
      render({ _n: S }) {
        return `${this.label}:` + S;
      }
    }
    class h extends r {
      constructor(S) {
        super(), this.label = S, this.names = {};
      }
      render({ _n: S }) {
        return `break${this.label ? ` ${this.label}` : ""};` + S;
      }
    }
    class _ extends r {
      constructor(S) {
        super(), this.error = S;
      }
      render({ _n: S }) {
        return `throw ${this.error};` + S;
      }
      get names() {
        return this.error.names;
      }
    }
    class E extends r {
      constructor(S) {
        super(), this.code = S;
      }
      render({ _n: S }) {
        return `${this.code};` + S;
      }
      optimizeNodes() {
        return `${this.code}` ? this : void 0;
      }
      optimizeNames(S, P) {
        return this.code = V(this.code, S, P), this;
      }
      get names() {
        return this.code instanceof t._CodeOrName ? this.code.names : {};
      }
    }
    class g extends r {
      constructor(S = []) {
        super(), this.nodes = S;
      }
      render(S) {
        return this.nodes.reduce((P, O) => P + O.render(S), "");
      }
      optimizeNodes() {
        const { nodes: S } = this;
        let P = S.length;
        for (; P--; ) {
          const O = S[P].optimizeNodes();
          Array.isArray(O) ? S.splice(P, 1, ...O) : O ? S[P] = O : S.splice(P, 1);
        }
        return S.length > 0 ? this : void 0;
      }
      optimizeNames(S, P) {
        const { nodes: O } = this;
        let B = O.length;
        for (; B--; ) {
          const x = O[B];
          x.optimizeNames(S, P) || (K(S, x.names), O.splice(B, 1));
        }
        return O.length > 0 ? this : void 0;
      }
      get names() {
        return this.nodes.reduce((S, P) => H(S, P.names), {});
      }
    }
    class w extends g {
      render(S) {
        return "{" + S._n + super.render(S) + "}" + S._n;
      }
    }
    class R extends g {
    }
    class u extends w {
    }
    u.kind = "else";
    class d extends w {
      constructor(S, P) {
        super(P), this.condition = S;
      }
      render(S) {
        let P = `if(${this.condition})` + super.render(S);
        return this.else && (P += "else " + this.else.render(S)), P;
      }
      optimizeNodes() {
        super.optimizeNodes();
        const S = this.condition;
        if (S === !0)
          return this.nodes;
        let P = this.else;
        if (P) {
          const O = P.optimizeNodes();
          P = this.else = Array.isArray(O) ? new u(O) : O;
        }
        if (P)
          return S === !1 ? P instanceof d ? P : P.nodes : this.nodes.length ? this : new d(J(S), P instanceof d ? [P] : P.nodes);
        if (!(S === !1 || !this.nodes.length))
          return this;
      }
      optimizeNames(S, P) {
        var O;
        if (this.else = (O = this.else) === null || O === void 0 ? void 0 : O.optimizeNames(S, P), !!(super.optimizeNames(S, P) || this.else))
          return this.condition = V(this.condition, S, P), this;
      }
      get names() {
        const S = super.names;
        return U(S, this.condition), this.else && H(S, this.else.names), S;
      }
    }
    d.kind = "if";
    class i extends w {
    }
    i.kind = "for";
    class m extends i {
      constructor(S) {
        super(), this.iteration = S;
      }
      render(S) {
        return `for(${this.iteration})` + super.render(S);
      }
      optimizeNames(S, P) {
        if (super.optimizeNames(S, P))
          return this.iteration = V(this.iteration, S, P), this;
      }
      get names() {
        return H(super.names, this.iteration.names);
      }
    }
    class v extends i {
      constructor(S, P, O, B) {
        super(), this.varKind = S, this.name = P, this.from = O, this.to = B;
      }
      render(S) {
        const P = S.es5 ? f.varKinds.var : this.varKind, { name: O, from: B, to: x } = this;
        return `for(${P} ${O}=${B}; ${O}<${x}; ${O}++)` + super.render(S);
      }
      get names() {
        const S = U(super.names, this.from);
        return U(S, this.to);
      }
    }
    class p extends i {
      constructor(S, P, O, B) {
        super(), this.loop = S, this.varKind = P, this.name = O, this.iterable = B;
      }
      render(S) {
        return `for(${this.varKind} ${this.name} ${this.loop} ${this.iterable})` + super.render(S);
      }
      optimizeNames(S, P) {
        if (super.optimizeNames(S, P))
          return this.iterable = V(this.iterable, S, P), this;
      }
      get names() {
        return H(super.names, this.iterable.names);
      }
    }
    class y extends w {
      constructor(S, P, O) {
        super(), this.name = S, this.args = P, this.async = O;
      }
      render(S) {
        return `${this.async ? "async " : ""}function ${this.name}(${this.args})` + super.render(S);
      }
    }
    y.kind = "func";
    class $ extends g {
      render(S) {
        return "return " + super.render(S);
      }
    }
    $.kind = "return";
    class b extends w {
      render(S) {
        let P = "try" + super.render(S);
        return this.catch && (P += this.catch.render(S)), this.finally && (P += this.finally.render(S)), P;
      }
      optimizeNodes() {
        var S, P;
        return super.optimizeNodes(), (S = this.catch) === null || S === void 0 || S.optimizeNodes(), (P = this.finally) === null || P === void 0 || P.optimizeNodes(), this;
      }
      optimizeNames(S, P) {
        var O, B;
        return super.optimizeNames(S, P), (O = this.catch) === null || O === void 0 || O.optimizeNames(S, P), (B = this.finally) === null || B === void 0 || B.optimizeNames(S, P), this;
      }
      get names() {
        const S = super.names;
        return this.catch && H(S, this.catch.names), this.finally && H(S, this.finally.names), S;
      }
    }
    class I extends w {
      constructor(S) {
        super(), this.error = S;
      }
      render(S) {
        return `catch(${this.error})` + super.render(S);
      }
    }
    I.kind = "catch";
    class L extends w {
      render(S) {
        return "finally" + super.render(S);
      }
    }
    L.kind = "finally";
    class F {
      constructor(S, P = {}) {
        this._values = {}, this._blockStarts = [], this._constants = {}, this.opts = { ...P, _n: P.lines ? `
` : "" }, this._extScope = S, this._scope = new f.Scope({ parent: S }), this._nodes = [new R()];
      }
      toString() {
        return this._root.render(this.opts);
      }
      // returns unique name in the internal scope
      name(S) {
        return this._scope.name(S);
      }
      // reserves unique name in the external scope
      scopeName(S) {
        return this._extScope.name(S);
      }
      // reserves unique name in the external scope and assigns value to it
      scopeValue(S, P) {
        const O = this._extScope.value(S, P);
        return (this._values[O.prefix] || (this._values[O.prefix] = /* @__PURE__ */ new Set())).add(O), O;
      }
      getScopeValue(S, P) {
        return this._extScope.getValue(S, P);
      }
      // return code that assigns values in the external scope to the names that are used internally
      // (same names that were returned by gen.scopeName or gen.scopeValue)
      scopeRefs(S) {
        return this._extScope.scopeRefs(S, this._values);
      }
      scopeCode() {
        return this._extScope.scopeCode(this._values);
      }
      _def(S, P, O, B) {
        const x = this._scope.toName(P);
        return O !== void 0 && B && (this._constants[x.str] = O), this._leafNode(new n(S, x, O)), x;
      }
      // `const` declaration (`var` in es5 mode)
      const(S, P, O) {
        return this._def(f.varKinds.const, S, P, O);
      }
      // `let` declaration with optional assignment (`var` in es5 mode)
      let(S, P, O) {
        return this._def(f.varKinds.let, S, P, O);
      }
      // `var` declaration with optional assignment
      var(S, P, O) {
        return this._def(f.varKinds.var, S, P, O);
      }
      // assignment code
      assign(S, P, O) {
        return this._leafNode(new c(S, P, O));
      }
      // `+=` code
      add(S, P) {
        return this._leafNode(new o(S, e.operators.ADD, P));
      }
      // appends passed SafeExpr to code or executes Block
      code(S) {
        return typeof S == "function" ? S() : S !== t.nil && this._leafNode(new E(S)), this;
      }
      // returns code for object literal for the passed argument list of key-value pairs
      object(...S) {
        const P = ["{"];
        for (const [O, B] of S)
          P.length > 1 && P.push(","), P.push(O), (O !== B || this.opts.es5) && (P.push(":"), (0, t.addCodeArg)(P, B));
        return P.push("}"), new t._Code(P);
      }
      // `if` clause (or statement if `thenBody` and, optionally, `elseBody` are passed)
      if(S, P, O) {
        if (this._blockNode(new d(S)), P && O)
          this.code(P).else().code(O).endIf();
        else if (P)
          this.code(P).endIf();
        else if (O)
          throw new Error('CodeGen: "else" body without "then" body');
        return this;
      }
      // `else if` clause - invalid without `if` or after `else` clauses
      elseIf(S) {
        return this._elseNode(new d(S));
      }
      // `else` clause - only valid after `if` or `else if` clauses
      else() {
        return this._elseNode(new u());
      }
      // end `if` statement (needed if gen.if was used only with condition)
      endIf() {
        return this._endBlockNode(d, u);
      }
      _for(S, P) {
        return this._blockNode(S), P && this.code(P).endFor(), this;
      }
      // a generic `for` clause (or statement if `forBody` is passed)
      for(S, P) {
        return this._for(new m(S), P);
      }
      // `for` statement for a range of values
      forRange(S, P, O, B, x = this.opts.es5 ? f.varKinds.var : f.varKinds.let) {
        const Q = this._scope.toName(S);
        return this._for(new v(x, Q, P, O), () => B(Q));
      }
      // `for-of` statement (in es5 mode replace with a normal for loop)
      forOf(S, P, O, B = f.varKinds.const) {
        const x = this._scope.toName(S);
        if (this.opts.es5) {
          const Q = P instanceof t.Name ? P : this.var("_arr", P);
          return this.forRange("_i", 0, (0, t._)`${Q}.length`, (Z) => {
            this.var(x, (0, t._)`${Q}[${Z}]`), O(x);
          });
        }
        return this._for(new p("of", B, x, P), () => O(x));
      }
      // `for-in` statement.
      // With option `ownProperties` replaced with a `for-of` loop for object keys
      forIn(S, P, O, B = this.opts.es5 ? f.varKinds.var : f.varKinds.const) {
        if (this.opts.ownProperties)
          return this.forOf(S, (0, t._)`Object.keys(${P})`, O);
        const x = this._scope.toName(S);
        return this._for(new p("in", B, x, P), () => O(x));
      }
      // end `for` loop
      endFor() {
        return this._endBlockNode(i);
      }
      // `label` statement
      label(S) {
        return this._leafNode(new a(S));
      }
      // `break` statement
      break(S) {
        return this._leafNode(new h(S));
      }
      // `return` statement
      return(S) {
        const P = new $();
        if (this._blockNode(P), this.code(S), P.nodes.length !== 1)
          throw new Error('CodeGen: "return" should have one node');
        return this._endBlockNode($);
      }
      // `try` statement
      try(S, P, O) {
        if (!P && !O)
          throw new Error('CodeGen: "try" without "catch" and "finally"');
        const B = new b();
        if (this._blockNode(B), this.code(S), P) {
          const x = this.name("e");
          this._currNode = B.catch = new I(x), P(x);
        }
        return O && (this._currNode = B.finally = new L(), this.code(O)), this._endBlockNode(I, L);
      }
      // `throw` statement
      throw(S) {
        return this._leafNode(new _(S));
      }
      // start self-balancing block
      block(S, P) {
        return this._blockStarts.push(this._nodes.length), S && this.code(S).endBlock(P), this;
      }
      // end the current self-balancing block
      endBlock(S) {
        const P = this._blockStarts.pop();
        if (P === void 0)
          throw new Error("CodeGen: not in self-balancing block");
        const O = this._nodes.length - P;
        if (O < 0 || S !== void 0 && O !== S)
          throw new Error(`CodeGen: wrong number of nodes: ${O} vs ${S} expected`);
        return this._nodes.length = P, this;
      }
      // `function` heading (or definition if funcBody is passed)
      func(S, P = t.nil, O, B) {
        return this._blockNode(new y(S, P, O)), B && this.code(B).endFunc(), this;
      }
      // end function definition
      endFunc() {
        return this._endBlockNode(y);
      }
      optimize(S = 1) {
        for (; S-- > 0; )
          this._root.optimizeNodes(), this._root.optimizeNames(this._root.names, this._constants);
      }
      _leafNode(S) {
        return this._currNode.nodes.push(S), this;
      }
      _blockNode(S) {
        this._currNode.nodes.push(S), this._nodes.push(S);
      }
      _endBlockNode(S, P) {
        const O = this._currNode;
        if (O instanceof S || P && O instanceof P)
          return this._nodes.pop(), this;
        throw new Error(`CodeGen: not in block "${P ? `${S.kind}/${P.kind}` : S.kind}"`);
      }
      _elseNode(S) {
        const P = this._currNode;
        if (!(P instanceof d))
          throw new Error('CodeGen: "else" without "if"');
        return this._currNode = P.else = S, this;
      }
      get _root() {
        return this._nodes[0];
      }
      get _currNode() {
        const S = this._nodes;
        return S[S.length - 1];
      }
      set _currNode(S) {
        const P = this._nodes;
        P[P.length - 1] = S;
      }
    }
    e.CodeGen = F;
    function H(C, S) {
      for (const P in S)
        C[P] = (C[P] || 0) + (S[P] || 0);
      return C;
    }
    function U(C, S) {
      return S instanceof t._CodeOrName ? H(C, S.names) : C;
    }
    function V(C, S, P) {
      if (C instanceof t.Name)
        return O(C);
      if (!B(C))
        return C;
      return new t._Code(C._items.reduce((x, Q) => (Q instanceof t.Name && (Q = O(Q)), Q instanceof t._Code ? x.push(...Q._items) : x.push(Q), x), []));
      function O(x) {
        const Q = P[x.str];
        return Q === void 0 || S[x.str] !== 1 ? x : (delete S[x.str], Q);
      }
      function B(x) {
        return x instanceof t._Code && x._items.some((Q) => Q instanceof t.Name && S[Q.str] === 1 && P[Q.str] !== void 0);
      }
    }
    function K(C, S) {
      for (const P in S)
        C[P] = (C[P] || 0) - (S[P] || 0);
    }
    function J(C) {
      return typeof C == "boolean" || typeof C == "number" || C === null ? !C : (0, t._)`!${q(C)}`;
    }
    e.not = J;
    const W = T(e.operators.AND);
    function M(...C) {
      return C.reduce(W);
    }
    e.and = M;
    const G = T(e.operators.OR);
    function A(...C) {
      return C.reduce(G);
    }
    e.or = A;
    function T(C) {
      return (S, P) => S === t.nil ? P : P === t.nil ? S : (0, t._)`${q(S)} ${C} ${q(P)}`;
    }
    function q(C) {
      return C instanceof t.Name ? C : (0, t._)`(${C})`;
    }
  }(si)), si;
}
var te = {}, Ya;
function ce() {
  if (Ya) return te;
  Ya = 1, Object.defineProperty(te, "__esModule", { value: !0 }), te.checkStrictMode = te.getErrorPath = te.Type = te.useFunc = te.setEvaluated = te.evaluatedPropsToName = te.mergeEvaluated = te.eachItem = te.unescapeJsonPointer = te.escapeJsonPointer = te.escapeFragment = te.unescapeFragment = te.schemaRefOrVal = te.schemaHasRulesButRef = te.schemaHasRules = te.checkUnknownRules = te.alwaysValidSchema = te.toHash = void 0;
  const e = re(), t = wn();
  function f(p) {
    const y = {};
    for (const $ of p)
      y[$] = !0;
    return y;
  }
  te.toHash = f;
  function s(p, y) {
    return typeof y == "boolean" ? y : Object.keys(y).length === 0 ? !0 : (l(p, y), !r(y, p.self.RULES.all));
  }
  te.alwaysValidSchema = s;
  function l(p, y = p.schema) {
    const { opts: $, self: b } = p;
    if (!$.strictSchema || typeof y == "boolean")
      return;
    const I = b.RULES.keywords;
    for (const L in y)
      I[L] || v(p, `unknown keyword: "${L}"`);
  }
  te.checkUnknownRules = l;
  function r(p, y) {
    if (typeof p == "boolean")
      return !p;
    for (const $ in p)
      if (y[$])
        return !0;
    return !1;
  }
  te.schemaHasRules = r;
  function n(p, y) {
    if (typeof p == "boolean")
      return !p;
    for (const $ in p)
      if ($ !== "$ref" && y.all[$])
        return !0;
    return !1;
  }
  te.schemaHasRulesButRef = n;
  function c({ topSchemaRef: p, schemaPath: y }, $, b, I) {
    if (!I) {
      if (typeof $ == "number" || typeof $ == "boolean")
        return $;
      if (typeof $ == "string")
        return (0, e._)`${$}`;
    }
    return (0, e._)`${p}${y}${(0, e.getProperty)(b)}`;
  }
  te.schemaRefOrVal = c;
  function o(p) {
    return _(decodeURIComponent(p));
  }
  te.unescapeFragment = o;
  function a(p) {
    return encodeURIComponent(h(p));
  }
  te.escapeFragment = a;
  function h(p) {
    return typeof p == "number" ? `${p}` : p.replace(/~/g, "~0").replace(/\//g, "~1");
  }
  te.escapeJsonPointer = h;
  function _(p) {
    return p.replace(/~1/g, "/").replace(/~0/g, "~");
  }
  te.unescapeJsonPointer = _;
  function E(p, y) {
    if (Array.isArray(p))
      for (const $ of p)
        y($);
    else
      y(p);
  }
  te.eachItem = E;
  function g({ mergeNames: p, mergeToName: y, mergeValues: $, resultToName: b }) {
    return (I, L, F, H) => {
      const U = F === void 0 ? L : F instanceof e.Name ? (L instanceof e.Name ? p(I, L, F) : y(I, L, F), F) : L instanceof e.Name ? (y(I, F, L), L) : $(L, F);
      return H === e.Name && !(U instanceof e.Name) ? b(I, U) : U;
    };
  }
  te.mergeEvaluated = {
    props: g({
      mergeNames: (p, y, $) => p.if((0, e._)`${$} !== true && ${y} !== undefined`, () => {
        p.if((0, e._)`${y} === true`, () => p.assign($, !0), () => p.assign($, (0, e._)`${$} || {}`).code((0, e._)`Object.assign(${$}, ${y})`));
      }),
      mergeToName: (p, y, $) => p.if((0, e._)`${$} !== true`, () => {
        y === !0 ? p.assign($, !0) : (p.assign($, (0, e._)`${$} || {}`), R(p, $, y));
      }),
      mergeValues: (p, y) => p === !0 ? !0 : { ...p, ...y },
      resultToName: w
    }),
    items: g({
      mergeNames: (p, y, $) => p.if((0, e._)`${$} !== true && ${y} !== undefined`, () => p.assign($, (0, e._)`${y} === true ? true : ${$} > ${y} ? ${$} : ${y}`)),
      mergeToName: (p, y, $) => p.if((0, e._)`${$} !== true`, () => p.assign($, y === !0 ? !0 : (0, e._)`${$} > ${y} ? ${$} : ${y}`)),
      mergeValues: (p, y) => p === !0 ? !0 : Math.max(p, y),
      resultToName: (p, y) => p.var("items", y)
    })
  };
  function w(p, y) {
    if (y === !0)
      return p.var("props", !0);
    const $ = p.var("props", (0, e._)`{}`);
    return y !== void 0 && R(p, $, y), $;
  }
  te.evaluatedPropsToName = w;
  function R(p, y, $) {
    Object.keys($).forEach((b) => p.assign((0, e._)`${y}${(0, e.getProperty)(b)}`, !0));
  }
  te.setEvaluated = R;
  const u = {};
  function d(p, y) {
    return p.scopeValue("func", {
      ref: y,
      code: u[y.code] || (u[y.code] = new t._Code(y.code))
    });
  }
  te.useFunc = d;
  var i;
  (function(p) {
    p[p.Num = 0] = "Num", p[p.Str = 1] = "Str";
  })(i || (te.Type = i = {}));
  function m(p, y, $) {
    if (p instanceof e.Name) {
      const b = y === i.Num;
      return $ ? b ? (0, e._)`"[" + ${p} + "]"` : (0, e._)`"['" + ${p} + "']"` : b ? (0, e._)`"/" + ${p}` : (0, e._)`"/" + ${p}.replace(/~/g, "~0").replace(/\\//g, "~1")`;
    }
    return $ ? (0, e.getProperty)(p).toString() : "/" + h(p);
  }
  te.getErrorPath = m;
  function v(p, y, $ = p.opts.strictSchema) {
    if ($) {
      if (y = `strict mode: ${y}`, $ === !0)
        throw new Error(y);
      p.self.logger.warn(y);
    }
  }
  return te.checkStrictMode = v, te;
}
var Ir = {}, Qa;
function Je() {
  if (Qa) return Ir;
  Qa = 1, Object.defineProperty(Ir, "__esModule", { value: !0 });
  const e = re(), t = {
    // validation function arguments
    data: new e.Name("data"),
    // data passed to validation function
    // args passed from referencing schema
    valCxt: new e.Name("valCxt"),
    // validation/data context - should not be used directly, it is destructured to the names below
    instancePath: new e.Name("instancePath"),
    parentData: new e.Name("parentData"),
    parentDataProperty: new e.Name("parentDataProperty"),
    rootData: new e.Name("rootData"),
    // root data - same as the data passed to the first/top validation function
    dynamicAnchors: new e.Name("dynamicAnchors"),
    // used to support recursiveRef and dynamicRef
    // function scoped variables
    vErrors: new e.Name("vErrors"),
    // null or array of validation errors
    errors: new e.Name("errors"),
    // counter of validation errors
    this: new e.Name("this"),
    // "globals"
    self: new e.Name("self"),
    scope: new e.Name("scope"),
    // JTD serialize/parse name for JSON string and position
    json: new e.Name("json"),
    jsonPos: new e.Name("jsonPos"),
    jsonLen: new e.Name("jsonLen"),
    jsonPart: new e.Name("jsonPart")
  };
  return Ir.default = t, Ir;
}
var ec;
function In() {
  return ec || (ec = 1, function(e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.extendErrors = e.resetErrorsCount = e.reportExtraError = e.reportError = e.keyword$DataError = e.keywordError = void 0;
    const t = re(), f = ce(), s = Je();
    e.keywordError = {
      message: ({ keyword: u }) => (0, t.str)`must pass "${u}" keyword validation`
    }, e.keyword$DataError = {
      message: ({ keyword: u, schemaType: d }) => d ? (0, t.str)`"${u}" keyword must be ${d} ($data)` : (0, t.str)`"${u}" keyword is invalid ($data)`
    };
    function l(u, d = e.keywordError, i, m) {
      const { it: v } = u, { gen: p, compositeRule: y, allErrors: $ } = v, b = _(u, d, i);
      m ?? (y || $) ? o(p, b) : a(v, (0, t._)`[${b}]`);
    }
    e.reportError = l;
    function r(u, d = e.keywordError, i) {
      const { it: m } = u, { gen: v, compositeRule: p, allErrors: y } = m, $ = _(u, d, i);
      o(v, $), p || y || a(m, s.default.vErrors);
    }
    e.reportExtraError = r;
    function n(u, d) {
      u.assign(s.default.errors, d), u.if((0, t._)`${s.default.vErrors} !== null`, () => u.if(d, () => u.assign((0, t._)`${s.default.vErrors}.length`, d), () => u.assign(s.default.vErrors, null)));
    }
    e.resetErrorsCount = n;
    function c({ gen: u, keyword: d, schemaValue: i, data: m, errsCount: v, it: p }) {
      if (v === void 0)
        throw new Error("ajv implementation error");
      const y = u.name("err");
      u.forRange("i", v, s.default.errors, ($) => {
        u.const(y, (0, t._)`${s.default.vErrors}[${$}]`), u.if((0, t._)`${y}.instancePath === undefined`, () => u.assign((0, t._)`${y}.instancePath`, (0, t.strConcat)(s.default.instancePath, p.errorPath))), u.assign((0, t._)`${y}.schemaPath`, (0, t.str)`${p.errSchemaPath}/${d}`), p.opts.verbose && (u.assign((0, t._)`${y}.schema`, i), u.assign((0, t._)`${y}.data`, m));
      });
    }
    e.extendErrors = c;
    function o(u, d) {
      const i = u.const("err", d);
      u.if((0, t._)`${s.default.vErrors} === null`, () => u.assign(s.default.vErrors, (0, t._)`[${i}]`), (0, t._)`${s.default.vErrors}.push(${i})`), u.code((0, t._)`${s.default.errors}++`);
    }
    function a(u, d) {
      const { gen: i, validateName: m, schemaEnv: v } = u;
      v.$async ? i.throw((0, t._)`new ${u.ValidationError}(${d})`) : (i.assign((0, t._)`${m}.errors`, d), i.return(!1));
    }
    const h = {
      keyword: new t.Name("keyword"),
      schemaPath: new t.Name("schemaPath"),
      // also used in JTD errors
      params: new t.Name("params"),
      propertyName: new t.Name("propertyName"),
      message: new t.Name("message"),
      schema: new t.Name("schema"),
      parentSchema: new t.Name("parentSchema")
    };
    function _(u, d, i) {
      const { createErrors: m } = u.it;
      return m === !1 ? (0, t._)`{}` : E(u, d, i);
    }
    function E(u, d, i = {}) {
      const { gen: m, it: v } = u, p = [
        g(v, i),
        w(u, i)
      ];
      return R(u, d, p), m.object(...p);
    }
    function g({ errorPath: u }, { instancePath: d }) {
      const i = d ? (0, t.str)`${u}${(0, f.getErrorPath)(d, f.Type.Str)}` : u;
      return [s.default.instancePath, (0, t.strConcat)(s.default.instancePath, i)];
    }
    function w({ keyword: u, it: { errSchemaPath: d } }, { schemaPath: i, parentSchema: m }) {
      let v = m ? d : (0, t.str)`${d}/${u}`;
      return i && (v = (0, t.str)`${v}${(0, f.getErrorPath)(i, f.Type.Str)}`), [h.schemaPath, v];
    }
    function R(u, { params: d, message: i }, m) {
      const { keyword: v, data: p, schemaValue: y, it: $ } = u, { opts: b, propertyName: I, topSchemaRef: L, schemaPath: F } = $;
      m.push([h.keyword, v], [h.params, typeof d == "function" ? d(u) : d || (0, t._)`{}`]), b.messages && m.push([h.message, typeof i == "function" ? i(u) : i]), b.verbose && m.push([h.schema, y], [h.parentSchema, (0, t._)`${L}${F}`], [s.default.data, p]), I && m.push([h.propertyName, I]);
    }
  }(ii)), ii;
}
var tc;
function ch() {
  if (tc) return rt;
  tc = 1, Object.defineProperty(rt, "__esModule", { value: !0 }), rt.boolOrEmptySchema = rt.topBoolOrEmptySchema = void 0;
  const e = In(), t = re(), f = Je(), s = {
    message: "boolean schema is false"
  };
  function l(c) {
    const { gen: o, schema: a, validateName: h } = c;
    a === !1 ? n(c, !1) : typeof a == "object" && a.$async === !0 ? o.return(f.default.data) : (o.assign((0, t._)`${h}.errors`, null), o.return(!0));
  }
  rt.topBoolOrEmptySchema = l;
  function r(c, o) {
    const { gen: a, schema: h } = c;
    h === !1 ? (a.var(o, !1), n(c)) : a.var(o, !0);
  }
  rt.boolOrEmptySchema = r;
  function n(c, o) {
    const { gen: a, data: h } = c, _ = {
      gen: a,
      keyword: "false schema",
      data: h,
      schema: !1,
      schemaCode: !1,
      schemaValue: !1,
      params: {},
      it: c
    };
    (0, e.reportError)(_, s, void 0, o);
  }
  return rt;
}
var we = {}, nt = {}, rc;
function hf() {
  if (rc) return nt;
  rc = 1, Object.defineProperty(nt, "__esModule", { value: !0 }), nt.getRules = nt.isJSONType = void 0;
  const e = ["string", "number", "integer", "boolean", "null", "object", "array"], t = new Set(e);
  function f(l) {
    return typeof l == "string" && t.has(l);
  }
  nt.isJSONType = f;
  function s() {
    const l = {
      number: { type: "number", rules: [] },
      string: { type: "string", rules: [] },
      array: { type: "array", rules: [] },
      object: { type: "object", rules: [] }
    };
    return {
      types: { ...l, integer: !0, boolean: !0, null: !0 },
      rules: [{ rules: [] }, l.number, l.string, l.array, l.object],
      post: { rules: [] },
      all: {},
      keywords: {}
    };
  }
  return nt.getRules = s, nt;
}
var Ke = {}, nc;
function mf() {
  if (nc) return Ke;
  nc = 1, Object.defineProperty(Ke, "__esModule", { value: !0 }), Ke.shouldUseRule = Ke.shouldUseGroup = Ke.schemaHasRulesForType = void 0;
  function e({ schema: s, self: l }, r) {
    const n = l.RULES.types[r];
    return n && n !== !0 && t(s, n);
  }
  Ke.schemaHasRulesForType = e;
  function t(s, l) {
    return l.rules.some((r) => f(s, r));
  }
  Ke.shouldUseGroup = t;
  function f(s, l) {
    var r;
    return s[l.keyword] !== void 0 || ((r = l.definition.implements) === null || r === void 0 ? void 0 : r.some((n) => s[n] !== void 0));
  }
  return Ke.shouldUseRule = f, Ke;
}
var ic;
function Sn() {
  if (ic) return we;
  ic = 1, Object.defineProperty(we, "__esModule", { value: !0 }), we.reportTypeError = we.checkDataTypes = we.checkDataType = we.coerceAndCheckDataType = we.getJSONTypes = we.getSchemaTypes = we.DataType = void 0;
  const e = hf(), t = mf(), f = In(), s = re(), l = ce();
  var r;
  (function(i) {
    i[i.Correct = 0] = "Correct", i[i.Wrong = 1] = "Wrong";
  })(r || (we.DataType = r = {}));
  function n(i) {
    const m = c(i.type);
    if (m.includes("null")) {
      if (i.nullable === !1)
        throw new Error("type: null contradicts nullable: false");
    } else {
      if (!m.length && i.nullable !== void 0)
        throw new Error('"nullable" cannot be used without "type"');
      i.nullable === !0 && m.push("null");
    }
    return m;
  }
  we.getSchemaTypes = n;
  function c(i) {
    const m = Array.isArray(i) ? i : i ? [i] : [];
    if (m.every(e.isJSONType))
      return m;
    throw new Error("type must be JSONType or JSONType[]: " + m.join(","));
  }
  we.getJSONTypes = c;
  function o(i, m) {
    const { gen: v, data: p, opts: y } = i, $ = h(m, y.coerceTypes), b = m.length > 0 && !($.length === 0 && m.length === 1 && (0, t.schemaHasRulesForType)(i, m[0]));
    if (b) {
      const I = w(m, p, y.strictNumbers, r.Wrong);
      v.if(I, () => {
        $.length ? _(i, m, $) : u(i);
      });
    }
    return b;
  }
  we.coerceAndCheckDataType = o;
  const a = /* @__PURE__ */ new Set(["string", "number", "integer", "boolean", "null"]);
  function h(i, m) {
    return m ? i.filter((v) => a.has(v) || m === "array" && v === "array") : [];
  }
  function _(i, m, v) {
    const { gen: p, data: y, opts: $ } = i, b = p.let("dataType", (0, s._)`typeof ${y}`), I = p.let("coerced", (0, s._)`undefined`);
    $.coerceTypes === "array" && p.if((0, s._)`${b} == 'object' && Array.isArray(${y}) && ${y}.length == 1`, () => p.assign(y, (0, s._)`${y}[0]`).assign(b, (0, s._)`typeof ${y}`).if(w(m, y, $.strictNumbers), () => p.assign(I, y))), p.if((0, s._)`${I} !== undefined`);
    for (const F of v)
      (a.has(F) || F === "array" && $.coerceTypes === "array") && L(F);
    p.else(), u(i), p.endIf(), p.if((0, s._)`${I} !== undefined`, () => {
      p.assign(y, I), E(i, I);
    });
    function L(F) {
      switch (F) {
        case "string":
          p.elseIf((0, s._)`${b} == "number" || ${b} == "boolean"`).assign(I, (0, s._)`"" + ${y}`).elseIf((0, s._)`${y} === null`).assign(I, (0, s._)`""`);
          return;
        case "number":
          p.elseIf((0, s._)`${b} == "boolean" || ${y} === null
              || (${b} == "string" && ${y} && ${y} == +${y})`).assign(I, (0, s._)`+${y}`);
          return;
        case "integer":
          p.elseIf((0, s._)`${b} === "boolean" || ${y} === null
              || (${b} === "string" && ${y} && ${y} == +${y} && !(${y} % 1))`).assign(I, (0, s._)`+${y}`);
          return;
        case "boolean":
          p.elseIf((0, s._)`${y} === "false" || ${y} === 0 || ${y} === null`).assign(I, !1).elseIf((0, s._)`${y} === "true" || ${y} === 1`).assign(I, !0);
          return;
        case "null":
          p.elseIf((0, s._)`${y} === "" || ${y} === 0 || ${y} === false`), p.assign(I, null);
          return;
        case "array":
          p.elseIf((0, s._)`${b} === "string" || ${b} === "number"
              || ${b} === "boolean" || ${y} === null`).assign(I, (0, s._)`[${y}]`);
      }
    }
  }
  function E({ gen: i, parentData: m, parentDataProperty: v }, p) {
    i.if((0, s._)`${m} !== undefined`, () => i.assign((0, s._)`${m}[${v}]`, p));
  }
  function g(i, m, v, p = r.Correct) {
    const y = p === r.Correct ? s.operators.EQ : s.operators.NEQ;
    let $;
    switch (i) {
      case "null":
        return (0, s._)`${m} ${y} null`;
      case "array":
        $ = (0, s._)`Array.isArray(${m})`;
        break;
      case "object":
        $ = (0, s._)`${m} && typeof ${m} == "object" && !Array.isArray(${m})`;
        break;
      case "integer":
        $ = b((0, s._)`!(${m} % 1) && !isNaN(${m})`);
        break;
      case "number":
        $ = b();
        break;
      default:
        return (0, s._)`typeof ${m} ${y} ${i}`;
    }
    return p === r.Correct ? $ : (0, s.not)($);
    function b(I = s.nil) {
      return (0, s.and)((0, s._)`typeof ${m} == "number"`, I, v ? (0, s._)`isFinite(${m})` : s.nil);
    }
  }
  we.checkDataType = g;
  function w(i, m, v, p) {
    if (i.length === 1)
      return g(i[0], m, v, p);
    let y;
    const $ = (0, l.toHash)(i);
    if ($.array && $.object) {
      const b = (0, s._)`typeof ${m} != "object"`;
      y = $.null ? b : (0, s._)`!${m} || ${b}`, delete $.null, delete $.array, delete $.object;
    } else
      y = s.nil;
    $.number && delete $.integer;
    for (const b in $)
      y = (0, s.and)(y, g(b, m, v, p));
    return y;
  }
  we.checkDataTypes = w;
  const R = {
    message: ({ schema: i }) => `must be ${i}`,
    params: ({ schema: i, schemaValue: m }) => typeof i == "string" ? (0, s._)`{type: ${i}}` : (0, s._)`{type: ${m}}`
  };
  function u(i) {
    const m = d(i);
    (0, f.reportError)(m, R);
  }
  we.reportTypeError = u;
  function d(i) {
    const { gen: m, data: v, schema: p } = i, y = (0, l.schemaRefOrVal)(i, p, "type");
    return {
      gen: m,
      keyword: "type",
      data: v,
      schema: p.type,
      schemaCode: y,
      schemaValue: y,
      parentSchema: p,
      params: {},
      it: i
    };
  }
  return we;
}
var gt = {}, sc;
function uh() {
  if (sc) return gt;
  sc = 1, Object.defineProperty(gt, "__esModule", { value: !0 }), gt.assignDefaults = void 0;
  const e = re(), t = ce();
  function f(l, r) {
    const { properties: n, items: c } = l.schema;
    if (r === "object" && n)
      for (const o in n)
        s(l, o, n[o].default);
    else r === "array" && Array.isArray(c) && c.forEach((o, a) => s(l, a, o.default));
  }
  gt.assignDefaults = f;
  function s(l, r, n) {
    const { gen: c, compositeRule: o, data: a, opts: h } = l;
    if (n === void 0)
      return;
    const _ = (0, e._)`${a}${(0, e.getProperty)(r)}`;
    if (o) {
      (0, t.checkStrictMode)(l, `default is ignored for: ${_}`);
      return;
    }
    let E = (0, e._)`${_} === undefined`;
    h.useDefaults === "empty" && (E = (0, e._)`${E} || ${_} === null || ${_} === ""`), c.if(E, (0, e._)`${_} = ${(0, e.stringify)(n)}`);
  }
  return gt;
}
var Le = {}, de = {}, oc;
function je() {
  if (oc) return de;
  oc = 1, Object.defineProperty(de, "__esModule", { value: !0 }), de.validateUnion = de.validateArray = de.usePattern = de.callValidateCode = de.schemaProperties = de.allSchemaProperties = de.noPropertyInData = de.propertyInData = de.isOwnProperty = de.hasPropFunc = de.reportMissingProp = de.checkMissingProp = de.checkReportMissingProp = void 0;
  const e = re(), t = ce(), f = Je(), s = ce();
  function l(i, m) {
    const { gen: v, data: p, it: y } = i;
    v.if(h(v, p, m, y.opts.ownProperties), () => {
      i.setParams({ missingProperty: (0, e._)`${m}` }, !0), i.error();
    });
  }
  de.checkReportMissingProp = l;
  function r({ gen: i, data: m, it: { opts: v } }, p, y) {
    return (0, e.or)(...p.map(($) => (0, e.and)(h(i, m, $, v.ownProperties), (0, e._)`${y} = ${$}`)));
  }
  de.checkMissingProp = r;
  function n(i, m) {
    i.setParams({ missingProperty: m }, !0), i.error();
  }
  de.reportMissingProp = n;
  function c(i) {
    return i.scopeValue("func", {
      // eslint-disable-next-line @typescript-eslint/unbound-method
      ref: Object.prototype.hasOwnProperty,
      code: (0, e._)`Object.prototype.hasOwnProperty`
    });
  }
  de.hasPropFunc = c;
  function o(i, m, v) {
    return (0, e._)`${c(i)}.call(${m}, ${v})`;
  }
  de.isOwnProperty = o;
  function a(i, m, v, p) {
    const y = (0, e._)`${m}${(0, e.getProperty)(v)} !== undefined`;
    return p ? (0, e._)`${y} && ${o(i, m, v)}` : y;
  }
  de.propertyInData = a;
  function h(i, m, v, p) {
    const y = (0, e._)`${m}${(0, e.getProperty)(v)} === undefined`;
    return p ? (0, e.or)(y, (0, e.not)(o(i, m, v))) : y;
  }
  de.noPropertyInData = h;
  function _(i) {
    return i ? Object.keys(i).filter((m) => m !== "__proto__") : [];
  }
  de.allSchemaProperties = _;
  function E(i, m) {
    return _(m).filter((v) => !(0, t.alwaysValidSchema)(i, m[v]));
  }
  de.schemaProperties = E;
  function g({ schemaCode: i, data: m, it: { gen: v, topSchemaRef: p, schemaPath: y, errorPath: $ }, it: b }, I, L, F) {
    const H = F ? (0, e._)`${i}, ${m}, ${p}${y}` : m, U = [
      [f.default.instancePath, (0, e.strConcat)(f.default.instancePath, $)],
      [f.default.parentData, b.parentData],
      [f.default.parentDataProperty, b.parentDataProperty],
      [f.default.rootData, f.default.rootData]
    ];
    b.opts.dynamicRef && U.push([f.default.dynamicAnchors, f.default.dynamicAnchors]);
    const V = (0, e._)`${H}, ${v.object(...U)}`;
    return L !== e.nil ? (0, e._)`${I}.call(${L}, ${V})` : (0, e._)`${I}(${V})`;
  }
  de.callValidateCode = g;
  const w = (0, e._)`new RegExp`;
  function R({ gen: i, it: { opts: m } }, v) {
    const p = m.unicodeRegExp ? "u" : "", { regExp: y } = m.code, $ = y(v, p);
    return i.scopeValue("pattern", {
      key: $.toString(),
      ref: $,
      code: (0, e._)`${y.code === "new RegExp" ? w : (0, s.useFunc)(i, y)}(${v}, ${p})`
    });
  }
  de.usePattern = R;
  function u(i) {
    const { gen: m, data: v, keyword: p, it: y } = i, $ = m.name("valid");
    if (y.allErrors) {
      const I = m.let("valid", !0);
      return b(() => m.assign(I, !1)), I;
    }
    return m.var($, !0), b(() => m.break()), $;
    function b(I) {
      const L = m.const("len", (0, e._)`${v}.length`);
      m.forRange("i", 0, L, (F) => {
        i.subschema({
          keyword: p,
          dataProp: F,
          dataPropType: t.Type.Num
        }, $), m.if((0, e.not)($), I);
      });
    }
  }
  de.validateArray = u;
  function d(i) {
    const { gen: m, schema: v, keyword: p, it: y } = i;
    if (!Array.isArray(v))
      throw new Error("ajv implementation error");
    if (v.some((L) => (0, t.alwaysValidSchema)(y, L)) && !y.opts.unevaluated)
      return;
    const b = m.let("valid", !1), I = m.name("_valid");
    m.block(() => v.forEach((L, F) => {
      const H = i.subschema({
        keyword: p,
        schemaProp: F,
        compositeRule: !0
      }, I);
      m.assign(b, (0, e._)`${b} || ${I}`), i.mergeValidEvaluated(H, I) || m.if((0, e.not)(b));
    })), i.result(b, () => i.reset(), () => i.error(!0));
  }
  return de.validateUnion = d, de;
}
var ac;
function lh() {
  if (ac) return Le;
  ac = 1, Object.defineProperty(Le, "__esModule", { value: !0 }), Le.validateKeywordUsage = Le.validSchemaType = Le.funcKeywordCode = Le.macroKeywordCode = void 0;
  const e = re(), t = Je(), f = je(), s = In();
  function l(E, g) {
    const { gen: w, keyword: R, schema: u, parentSchema: d, it: i } = E, m = g.macro.call(i.self, u, d, i), v = a(w, R, m);
    i.opts.validateSchema !== !1 && i.self.validateSchema(m, !0);
    const p = w.name("valid");
    E.subschema({
      schema: m,
      schemaPath: e.nil,
      errSchemaPath: `${i.errSchemaPath}/${R}`,
      topSchemaRef: v,
      compositeRule: !0
    }, p), E.pass(p, () => E.error(!0));
  }
  Le.macroKeywordCode = l;
  function r(E, g) {
    var w;
    const { gen: R, keyword: u, schema: d, parentSchema: i, $data: m, it: v } = E;
    o(v, g);
    const p = !m && g.compile ? g.compile.call(v.self, d, i, v) : g.validate, y = a(R, u, p), $ = R.let("valid");
    E.block$data($, b), E.ok((w = g.valid) !== null && w !== void 0 ? w : $);
    function b() {
      if (g.errors === !1)
        F(), g.modifying && n(E), H(() => E.error());
      else {
        const U = g.async ? I() : L();
        g.modifying && n(E), H(() => c(E, U));
      }
    }
    function I() {
      const U = R.let("ruleErrs", null);
      return R.try(() => F((0, e._)`await `), (V) => R.assign($, !1).if((0, e._)`${V} instanceof ${v.ValidationError}`, () => R.assign(U, (0, e._)`${V}.errors`), () => R.throw(V))), U;
    }
    function L() {
      const U = (0, e._)`${y}.errors`;
      return R.assign(U, null), F(e.nil), U;
    }
    function F(U = g.async ? (0, e._)`await ` : e.nil) {
      const V = v.opts.passContext ? t.default.this : t.default.self, K = !("compile" in g && !m || g.schema === !1);
      R.assign($, (0, e._)`${U}${(0, f.callValidateCode)(E, y, V, K)}`, g.modifying);
    }
    function H(U) {
      var V;
      R.if((0, e.not)((V = g.valid) !== null && V !== void 0 ? V : $), U);
    }
  }
  Le.funcKeywordCode = r;
  function n(E) {
    const { gen: g, data: w, it: R } = E;
    g.if(R.parentData, () => g.assign(w, (0, e._)`${R.parentData}[${R.parentDataProperty}]`));
  }
  function c(E, g) {
    const { gen: w } = E;
    w.if((0, e._)`Array.isArray(${g})`, () => {
      w.assign(t.default.vErrors, (0, e._)`${t.default.vErrors} === null ? ${g} : ${t.default.vErrors}.concat(${g})`).assign(t.default.errors, (0, e._)`${t.default.vErrors}.length`), (0, s.extendErrors)(E);
    }, () => E.error());
  }
  function o({ schemaEnv: E }, g) {
    if (g.async && !E.$async)
      throw new Error("async keyword in sync schema");
  }
  function a(E, g, w) {
    if (w === void 0)
      throw new Error(`keyword "${g}" failed to compile`);
    return E.scopeValue("keyword", typeof w == "function" ? { ref: w } : { ref: w, code: (0, e.stringify)(w) });
  }
  function h(E, g, w = !1) {
    return !g.length || g.some((R) => R === "array" ? Array.isArray(E) : R === "object" ? E && typeof E == "object" && !Array.isArray(E) : typeof E == R || w && typeof E > "u");
  }
  Le.validSchemaType = h;
  function _({ schema: E, opts: g, self: w, errSchemaPath: R }, u, d) {
    if (Array.isArray(u.keyword) ? !u.keyword.includes(d) : u.keyword !== d)
      throw new Error("ajv implementation error");
    const i = u.dependencies;
    if (i?.some((m) => !Object.prototype.hasOwnProperty.call(E, m)))
      throw new Error(`parent schema must have dependencies of ${d}: ${i.join(",")}`);
    if (u.validateSchema && !u.validateSchema(E[d])) {
      const v = `keyword "${d}" value is invalid at path "${R}": ` + w.errorsText(u.validateSchema.errors);
      if (g.validateSchema === "log")
        w.logger.error(v);
      else
        throw new Error(v);
    }
  }
  return Le.validateKeywordUsage = _, Le;
}
var Be = {}, cc;
function fh() {
  if (cc) return Be;
  cc = 1, Object.defineProperty(Be, "__esModule", { value: !0 }), Be.extendSubschemaMode = Be.extendSubschemaData = Be.getSubschema = void 0;
  const e = re(), t = ce();
  function f(r, { keyword: n, schemaProp: c, schema: o, schemaPath: a, errSchemaPath: h, topSchemaRef: _ }) {
    if (n !== void 0 && o !== void 0)
      throw new Error('both "keyword" and "schema" passed, only one allowed');
    if (n !== void 0) {
      const E = r.schema[n];
      return c === void 0 ? {
        schema: E,
        schemaPath: (0, e._)`${r.schemaPath}${(0, e.getProperty)(n)}`,
        errSchemaPath: `${r.errSchemaPath}/${n}`
      } : {
        schema: E[c],
        schemaPath: (0, e._)`${r.schemaPath}${(0, e.getProperty)(n)}${(0, e.getProperty)(c)}`,
        errSchemaPath: `${r.errSchemaPath}/${n}/${(0, t.escapeFragment)(c)}`
      };
    }
    if (o !== void 0) {
      if (a === void 0 || h === void 0 || _ === void 0)
        throw new Error('"schemaPath", "errSchemaPath" and "topSchemaRef" are required with "schema"');
      return {
        schema: o,
        schemaPath: a,
        topSchemaRef: _,
        errSchemaPath: h
      };
    }
    throw new Error('either "keyword" or "schema" must be passed');
  }
  Be.getSubschema = f;
  function s(r, n, { dataProp: c, dataPropType: o, data: a, dataTypes: h, propertyName: _ }) {
    if (a !== void 0 && c !== void 0)
      throw new Error('both "data" and "dataProp" passed, only one allowed');
    const { gen: E } = n;
    if (c !== void 0) {
      const { errorPath: w, dataPathArr: R, opts: u } = n, d = E.let("data", (0, e._)`${n.data}${(0, e.getProperty)(c)}`, !0);
      g(d), r.errorPath = (0, e.str)`${w}${(0, t.getErrorPath)(c, o, u.jsPropertySyntax)}`, r.parentDataProperty = (0, e._)`${c}`, r.dataPathArr = [...R, r.parentDataProperty];
    }
    if (a !== void 0) {
      const w = a instanceof e.Name ? a : E.let("data", a, !0);
      g(w), _ !== void 0 && (r.propertyName = _);
    }
    h && (r.dataTypes = h);
    function g(w) {
      r.data = w, r.dataLevel = n.dataLevel + 1, r.dataTypes = [], n.definedProperties = /* @__PURE__ */ new Set(), r.parentData = n.data, r.dataNames = [...n.dataNames, w];
    }
  }
  Be.extendSubschemaData = s;
  function l(r, { jtdDiscriminator: n, jtdMetadata: c, compositeRule: o, createErrors: a, allErrors: h }) {
    o !== void 0 && (r.compositeRule = o), a !== void 0 && (r.createErrors = a), h !== void 0 && (r.allErrors = h), r.jtdDiscriminator = n, r.jtdMetadata = c;
  }
  return Be.extendSubschemaMode = l, Be;
}
var Pe = {}, ci = { exports: {} }, uc;
function dh() {
  if (uc) return ci.exports;
  uc = 1;
  var e = ci.exports = function(s, l, r) {
    typeof l == "function" && (r = l, l = {}), r = l.cb || r;
    var n = typeof r == "function" ? r : r.pre || function() {
    }, c = r.post || function() {
    };
    t(l, n, c, s, "", s);
  };
  e.keywords = {
    additionalItems: !0,
    items: !0,
    contains: !0,
    additionalProperties: !0,
    propertyNames: !0,
    not: !0,
    if: !0,
    then: !0,
    else: !0
  }, e.arrayKeywords = {
    items: !0,
    allOf: !0,
    anyOf: !0,
    oneOf: !0
  }, e.propsKeywords = {
    $defs: !0,
    definitions: !0,
    properties: !0,
    patternProperties: !0,
    dependencies: !0
  }, e.skipKeywords = {
    default: !0,
    enum: !0,
    const: !0,
    required: !0,
    maximum: !0,
    minimum: !0,
    exclusiveMaximum: !0,
    exclusiveMinimum: !0,
    multipleOf: !0,
    maxLength: !0,
    minLength: !0,
    pattern: !0,
    format: !0,
    maxItems: !0,
    minItems: !0,
    uniqueItems: !0,
    maxProperties: !0,
    minProperties: !0
  };
  function t(s, l, r, n, c, o, a, h, _, E) {
    if (n && typeof n == "object" && !Array.isArray(n)) {
      l(n, c, o, a, h, _, E);
      for (var g in n) {
        var w = n[g];
        if (Array.isArray(w)) {
          if (g in e.arrayKeywords)
            for (var R = 0; R < w.length; R++)
              t(s, l, r, w[R], c + "/" + g + "/" + R, o, c, g, n, R);
        } else if (g in e.propsKeywords) {
          if (w && typeof w == "object")
            for (var u in w)
              t(s, l, r, w[u], c + "/" + g + "/" + f(u), o, c, g, n, u);
        } else (g in e.keywords || s.allKeys && !(g in e.skipKeywords)) && t(s, l, r, w, c + "/" + g, o, c, g, n);
      }
      r(n, c, o, a, h, _, E);
    }
  }
  function f(s) {
    return s.replace(/~/g, "~0").replace(/\//g, "~1");
  }
  return ci.exports;
}
var lc;
function Tn() {
  if (lc) return Pe;
  lc = 1, Object.defineProperty(Pe, "__esModule", { value: !0 }), Pe.getSchemaRefs = Pe.resolveUrl = Pe.normalizeId = Pe._getFullPath = Pe.getFullPath = Pe.inlineRef = void 0;
  const e = ce(), t = Rn(), f = dh(), s = /* @__PURE__ */ new Set([
    "type",
    "format",
    "pattern",
    "maxLength",
    "minLength",
    "maxProperties",
    "minProperties",
    "maxItems",
    "minItems",
    "maximum",
    "minimum",
    "uniqueItems",
    "multipleOf",
    "required",
    "enum",
    "const"
  ]);
  function l(R, u = !0) {
    return typeof R == "boolean" ? !0 : u === !0 ? !n(R) : u ? c(R) <= u : !1;
  }
  Pe.inlineRef = l;
  const r = /* @__PURE__ */ new Set([
    "$ref",
    "$recursiveRef",
    "$recursiveAnchor",
    "$dynamicRef",
    "$dynamicAnchor"
  ]);
  function n(R) {
    for (const u in R) {
      if (r.has(u))
        return !0;
      const d = R[u];
      if (Array.isArray(d) && d.some(n) || typeof d == "object" && n(d))
        return !0;
    }
    return !1;
  }
  function c(R) {
    let u = 0;
    for (const d in R) {
      if (d === "$ref")
        return 1 / 0;
      if (u++, !s.has(d) && (typeof R[d] == "object" && (0, e.eachItem)(R[d], (i) => u += c(i)), u === 1 / 0))
        return 1 / 0;
    }
    return u;
  }
  function o(R, u = "", d) {
    d !== !1 && (u = _(u));
    const i = R.parse(u);
    return a(R, i);
  }
  Pe.getFullPath = o;
  function a(R, u) {
    return R.serialize(u).split("#")[0] + "#";
  }
  Pe._getFullPath = a;
  const h = /#\/?$/;
  function _(R) {
    return R ? R.replace(h, "") : "";
  }
  Pe.normalizeId = _;
  function E(R, u, d) {
    return d = _(d), R.resolve(u, d);
  }
  Pe.resolveUrl = E;
  const g = /^[a-z_][-a-z0-9._]*$/i;
  function w(R, u) {
    if (typeof R == "boolean")
      return {};
    const { schemaId: d, uriResolver: i } = this.opts, m = _(R[d] || u), v = { "": m }, p = o(i, m, !1), y = {}, $ = /* @__PURE__ */ new Set();
    return f(R, { allKeys: !0 }, (L, F, H, U) => {
      if (U === void 0)
        return;
      const V = p + F;
      let K = v[U];
      typeof L[d] == "string" && (K = J.call(this, L[d])), W.call(this, L.$anchor), W.call(this, L.$dynamicAnchor), v[F] = K;
      function J(M) {
        const G = this.opts.uriResolver.resolve;
        if (M = _(K ? G(K, M) : M), $.has(M))
          throw I(M);
        $.add(M);
        let A = this.refs[M];
        return typeof A == "string" && (A = this.refs[A]), typeof A == "object" ? b(L, A.schema, M) : M !== _(V) && (M[0] === "#" ? (b(L, y[M], M), y[M] = L) : this.refs[M] = V), M;
      }
      function W(M) {
        if (typeof M == "string") {
          if (!g.test(M))
            throw new Error(`invalid anchor "${M}"`);
          J.call(this, `#${M}`);
        }
      }
    }), y;
    function b(L, F, H) {
      if (F !== void 0 && !t(L, F))
        throw I(H);
    }
    function I(L) {
      return new Error(`reference "${L}" resolves to more than one schema`);
    }
  }
  return Pe.getSchemaRefs = w, Pe;
}
var fc;
function Cn() {
  if (fc) return Ge;
  fc = 1, Object.defineProperty(Ge, "__esModule", { value: !0 }), Ge.getData = Ge.KeywordCxt = Ge.validateFunctionCode = void 0;
  const e = ch(), t = Sn(), f = mf(), s = Sn(), l = uh(), r = lh(), n = fh(), c = re(), o = Je(), a = Tn(), h = ce(), _ = In();
  function E(N) {
    if (p(N) && ($(N), v(N))) {
      u(N);
      return;
    }
    g(N, () => (0, e.topBoolOrEmptySchema)(N));
  }
  Ge.validateFunctionCode = E;
  function g({ gen: N, validateName: D, schema: k, schemaEnv: j, opts: z }, Y) {
    z.code.es5 ? N.func(D, (0, c._)`${o.default.data}, ${o.default.valCxt}`, j.$async, () => {
      N.code((0, c._)`"use strict"; ${i(k, z)}`), R(N, z), N.code(Y);
    }) : N.func(D, (0, c._)`${o.default.data}, ${w(z)}`, j.$async, () => N.code(i(k, z)).code(Y));
  }
  function w(N) {
    return (0, c._)`{${o.default.instancePath}="", ${o.default.parentData}, ${o.default.parentDataProperty}, ${o.default.rootData}=${o.default.data}${N.dynamicRef ? (0, c._)`, ${o.default.dynamicAnchors}={}` : c.nil}}={}`;
  }
  function R(N, D) {
    N.if(o.default.valCxt, () => {
      N.var(o.default.instancePath, (0, c._)`${o.default.valCxt}.${o.default.instancePath}`), N.var(o.default.parentData, (0, c._)`${o.default.valCxt}.${o.default.parentData}`), N.var(o.default.parentDataProperty, (0, c._)`${o.default.valCxt}.${o.default.parentDataProperty}`), N.var(o.default.rootData, (0, c._)`${o.default.valCxt}.${o.default.rootData}`), D.dynamicRef && N.var(o.default.dynamicAnchors, (0, c._)`${o.default.valCxt}.${o.default.dynamicAnchors}`);
    }, () => {
      N.var(o.default.instancePath, (0, c._)`""`), N.var(o.default.parentData, (0, c._)`undefined`), N.var(o.default.parentDataProperty, (0, c._)`undefined`), N.var(o.default.rootData, o.default.data), D.dynamicRef && N.var(o.default.dynamicAnchors, (0, c._)`{}`);
    });
  }
  function u(N) {
    const { schema: D, opts: k, gen: j } = N;
    g(N, () => {
      k.$comment && D.$comment && U(N), L(N), j.let(o.default.vErrors, null), j.let(o.default.errors, 0), k.unevaluated && d(N), b(N), V(N);
    });
  }
  function d(N) {
    const { gen: D, validateName: k } = N;
    N.evaluated = D.const("evaluated", (0, c._)`${k}.evaluated`), D.if((0, c._)`${N.evaluated}.dynamicProps`, () => D.assign((0, c._)`${N.evaluated}.props`, (0, c._)`undefined`)), D.if((0, c._)`${N.evaluated}.dynamicItems`, () => D.assign((0, c._)`${N.evaluated}.items`, (0, c._)`undefined`));
  }
  function i(N, D) {
    const k = typeof N == "object" && N[D.schemaId];
    return k && (D.code.source || D.code.process) ? (0, c._)`/*# sourceURL=${k} */` : c.nil;
  }
  function m(N, D) {
    if (p(N) && ($(N), v(N))) {
      y(N, D);
      return;
    }
    (0, e.boolOrEmptySchema)(N, D);
  }
  function v({ schema: N, self: D }) {
    if (typeof N == "boolean")
      return !N;
    for (const k in N)
      if (D.RULES.all[k])
        return !0;
    return !1;
  }
  function p(N) {
    return typeof N.schema != "boolean";
  }
  function y(N, D) {
    const { schema: k, gen: j, opts: z } = N;
    z.$comment && k.$comment && U(N), F(N), H(N);
    const Y = j.const("_errs", o.default.errors);
    b(N, Y), j.var(D, (0, c._)`${Y} === ${o.default.errors}`);
  }
  function $(N) {
    (0, h.checkUnknownRules)(N), I(N);
  }
  function b(N, D) {
    if (N.opts.jtd)
      return J(N, [], !1, D);
    const k = (0, t.getSchemaTypes)(N.schema), j = (0, t.coerceAndCheckDataType)(N, k);
    J(N, k, !j, D);
  }
  function I(N) {
    const { schema: D, errSchemaPath: k, opts: j, self: z } = N;
    D.$ref && j.ignoreKeywordsWithRef && (0, h.schemaHasRulesButRef)(D, z.RULES) && z.logger.warn(`$ref: keywords ignored in schema at path "${k}"`);
  }
  function L(N) {
    const { schema: D, opts: k } = N;
    D.default !== void 0 && k.useDefaults && k.strictSchema && (0, h.checkStrictMode)(N, "default is ignored in the schema root");
  }
  function F(N) {
    const D = N.schema[N.opts.schemaId];
    D && (N.baseId = (0, a.resolveUrl)(N.opts.uriResolver, N.baseId, D));
  }
  function H(N) {
    if (N.schema.$async && !N.schemaEnv.$async)
      throw new Error("async schema in sync schema");
  }
  function U({ gen: N, schemaEnv: D, schema: k, errSchemaPath: j, opts: z }) {
    const Y = k.$comment;
    if (z.$comment === !0)
      N.code((0, c._)`${o.default.self}.logger.log(${Y})`);
    else if (typeof z.$comment == "function") {
      const X = (0, c.str)`${j}/$comment`, ve = N.scopeValue("root", { ref: D.root });
      N.code((0, c._)`${o.default.self}.opts.$comment(${Y}, ${X}, ${ve}.schema)`);
    }
  }
  function V(N) {
    const { gen: D, schemaEnv: k, validateName: j, ValidationError: z, opts: Y } = N;
    k.$async ? D.if((0, c._)`${o.default.errors} === 0`, () => D.return(o.default.data), () => D.throw((0, c._)`new ${z}(${o.default.vErrors})`)) : (D.assign((0, c._)`${j}.errors`, o.default.vErrors), Y.unevaluated && K(N), D.return((0, c._)`${o.default.errors} === 0`));
  }
  function K({ gen: N, evaluated: D, props: k, items: j }) {
    k instanceof c.Name && N.assign((0, c._)`${D}.props`, k), j instanceof c.Name && N.assign((0, c._)`${D}.items`, j);
  }
  function J(N, D, k, j) {
    const { gen: z, schema: Y, data: X, allErrors: ve, opts: ue, self: le } = N, { RULES: ne } = le;
    if (Y.$ref && (ue.ignoreKeywordsWithRef || !(0, h.schemaHasRulesButRef)(Y, ne))) {
      z.block(() => B(N, "$ref", ne.all.$ref.definition));
      return;
    }
    ue.jtd || M(N, D), z.block(() => {
      for (const he of ne.rules)
        be(he);
      be(ne.post);
    });
    function be(he) {
      (0, f.shouldUseGroup)(Y, he) && (he.type ? (z.if((0, s.checkDataType)(he.type, X, ue.strictNumbers)), W(N, he), D.length === 1 && D[0] === he.type && k && (z.else(), (0, s.reportTypeError)(N)), z.endIf()) : W(N, he), ve || z.if((0, c._)`${o.default.errors} === ${j || 0}`));
    }
  }
  function W(N, D) {
    const { gen: k, schema: j, opts: { useDefaults: z } } = N;
    z && (0, l.assignDefaults)(N, D.type), k.block(() => {
      for (const Y of D.rules)
        (0, f.shouldUseRule)(j, Y) && B(N, Y.keyword, Y.definition, D.type);
    });
  }
  function M(N, D) {
    N.schemaEnv.meta || !N.opts.strictTypes || (G(N, D), N.opts.allowUnionTypes || A(N, D), T(N, N.dataTypes));
  }
  function G(N, D) {
    if (D.length) {
      if (!N.dataTypes.length) {
        N.dataTypes = D;
        return;
      }
      D.forEach((k) => {
        C(N.dataTypes, k) || P(N, `type "${k}" not allowed by context "${N.dataTypes.join(",")}"`);
      }), S(N, D);
    }
  }
  function A(N, D) {
    D.length > 1 && !(D.length === 2 && D.includes("null")) && P(N, "use allowUnionTypes to allow union type keyword");
  }
  function T(N, D) {
    const k = N.self.RULES.all;
    for (const j in k) {
      const z = k[j];
      if (typeof z == "object" && (0, f.shouldUseRule)(N.schema, z)) {
        const { type: Y } = z.definition;
        Y.length && !Y.some((X) => q(D, X)) && P(N, `missing type "${Y.join(",")}" for keyword "${j}"`);
      }
    }
  }
  function q(N, D) {
    return N.includes(D) || D === "number" && N.includes("integer");
  }
  function C(N, D) {
    return N.includes(D) || D === "integer" && N.includes("number");
  }
  function S(N, D) {
    const k = [];
    for (const j of N.dataTypes)
      C(D, j) ? k.push(j) : D.includes("integer") && j === "number" && k.push("integer");
    N.dataTypes = k;
  }
  function P(N, D) {
    const k = N.schemaEnv.baseId + N.errSchemaPath;
    D += ` at "${k}" (strictTypes)`, (0, h.checkStrictMode)(N, D, N.opts.strictTypes);
  }
  class O {
    constructor(D, k, j) {
      if ((0, r.validateKeywordUsage)(D, k, j), this.gen = D.gen, this.allErrors = D.allErrors, this.keyword = j, this.data = D.data, this.schema = D.schema[j], this.$data = k.$data && D.opts.$data && this.schema && this.schema.$data, this.schemaValue = (0, h.schemaRefOrVal)(D, this.schema, j, this.$data), this.schemaType = k.schemaType, this.parentSchema = D.schema, this.params = {}, this.it = D, this.def = k, this.$data)
        this.schemaCode = D.gen.const("vSchema", Z(this.$data, D));
      else if (this.schemaCode = this.schemaValue, !(0, r.validSchemaType)(this.schema, k.schemaType, k.allowUndefined))
        throw new Error(`${j} value must be ${JSON.stringify(k.schemaType)}`);
      ("code" in k ? k.trackErrors : k.errors !== !1) && (this.errsCount = D.gen.const("_errs", o.default.errors));
    }
    result(D, k, j) {
      this.failResult((0, c.not)(D), k, j);
    }
    failResult(D, k, j) {
      this.gen.if(D), j ? j() : this.error(), k ? (this.gen.else(), k(), this.allErrors && this.gen.endIf()) : this.allErrors ? this.gen.endIf() : this.gen.else();
    }
    pass(D, k) {
      this.failResult((0, c.not)(D), void 0, k);
    }
    fail(D) {
      if (D === void 0) {
        this.error(), this.allErrors || this.gen.if(!1);
        return;
      }
      this.gen.if(D), this.error(), this.allErrors ? this.gen.endIf() : this.gen.else();
    }
    fail$data(D) {
      if (!this.$data)
        return this.fail(D);
      const { schemaCode: k } = this;
      this.fail((0, c._)`${k} !== undefined && (${(0, c.or)(this.invalid$data(), D)})`);
    }
    error(D, k, j) {
      if (k) {
        this.setParams(k), this._error(D, j), this.setParams({});
        return;
      }
      this._error(D, j);
    }
    _error(D, k) {
      (D ? _.reportExtraError : _.reportError)(this, this.def.error, k);
    }
    $dataError() {
      (0, _.reportError)(this, this.def.$dataError || _.keyword$DataError);
    }
    reset() {
      if (this.errsCount === void 0)
        throw new Error('add "trackErrors" to keyword definition');
      (0, _.resetErrorsCount)(this.gen, this.errsCount);
    }
    ok(D) {
      this.allErrors || this.gen.if(D);
    }
    setParams(D, k) {
      k ? Object.assign(this.params, D) : this.params = D;
    }
    block$data(D, k, j = c.nil) {
      this.gen.block(() => {
        this.check$data(D, j), k();
      });
    }
    check$data(D = c.nil, k = c.nil) {
      if (!this.$data)
        return;
      const { gen: j, schemaCode: z, schemaType: Y, def: X } = this;
      j.if((0, c.or)((0, c._)`${z} === undefined`, k)), D !== c.nil && j.assign(D, !0), (Y.length || X.validateSchema) && (j.elseIf(this.invalid$data()), this.$dataError(), D !== c.nil && j.assign(D, !1)), j.else();
    }
    invalid$data() {
      const { gen: D, schemaCode: k, schemaType: j, def: z, it: Y } = this;
      return (0, c.or)(X(), ve());
      function X() {
        if (j.length) {
          if (!(k instanceof c.Name))
            throw new Error("ajv implementation error");
          const ue = Array.isArray(j) ? j : [j];
          return (0, c._)`${(0, s.checkDataTypes)(ue, k, Y.opts.strictNumbers, s.DataType.Wrong)}`;
        }
        return c.nil;
      }
      function ve() {
        if (z.validateSchema) {
          const ue = D.scopeValue("validate$data", { ref: z.validateSchema });
          return (0, c._)`!${ue}(${k})`;
        }
        return c.nil;
      }
    }
    subschema(D, k) {
      const j = (0, n.getSubschema)(this.it, D);
      (0, n.extendSubschemaData)(j, this.it, D), (0, n.extendSubschemaMode)(j, D);
      const z = { ...this.it, ...j, items: void 0, props: void 0 };
      return m(z, k), z;
    }
    mergeEvaluated(D, k) {
      const { it: j, gen: z } = this;
      j.opts.unevaluated && (j.props !== !0 && D.props !== void 0 && (j.props = h.mergeEvaluated.props(z, D.props, j.props, k)), j.items !== !0 && D.items !== void 0 && (j.items = h.mergeEvaluated.items(z, D.items, j.items, k)));
    }
    mergeValidEvaluated(D, k) {
      const { it: j, gen: z } = this;
      if (j.opts.unevaluated && (j.props !== !0 || j.items !== !0))
        return z.if(k, () => this.mergeEvaluated(D, c.Name)), !0;
    }
  }
  Ge.KeywordCxt = O;
  function B(N, D, k, j) {
    const z = new O(N, k, D);
    "code" in k ? k.code(z, j) : z.$data && k.validate ? (0, r.funcKeywordCode)(z, k) : "macro" in k ? (0, r.macroKeywordCode)(z, k) : (k.compile || k.validate) && (0, r.funcKeywordCode)(z, k);
  }
  const x = /^\/(?:[^~]|~0|~1)*$/, Q = /^([0-9]+)(#|\/(?:[^~]|~0|~1)*)?$/;
  function Z(N, { dataLevel: D, dataNames: k, dataPathArr: j }) {
    let z, Y;
    if (N === "")
      return o.default.rootData;
    if (N[0] === "/") {
      if (!x.test(N))
        throw new Error(`Invalid JSON-pointer: ${N}`);
      z = N, Y = o.default.rootData;
    } else {
      const le = Q.exec(N);
      if (!le)
        throw new Error(`Invalid JSON-pointer: ${N}`);
      const ne = +le[1];
      if (z = le[2], z === "#") {
        if (ne >= D)
          throw new Error(ue("property/index", ne));
        return j[D - ne];
      }
      if (ne > D)
        throw new Error(ue("data", ne));
      if (Y = k[D - ne], !z)
        return Y;
    }
    let X = Y;
    const ve = z.split("/");
    for (const le of ve)
      le && (Y = (0, c._)`${Y}${(0, c.getProperty)((0, h.unescapeJsonPointer)(le))}`, X = (0, c._)`${X} && ${Y}`);
    return X;
    function ue(le, ne) {
      return `Cannot access ${le} ${ne} levels up, current level is ${D}`;
    }
  }
  return Ge.getData = Z, Ge;
}
var Tr = {}, dc;
function Zs() {
  if (dc) return Tr;
  dc = 1, Object.defineProperty(Tr, "__esModule", { value: !0 });
  class e extends Error {
    constructor(f) {
      super("validation failed"), this.errors = f, this.ajv = this.validation = !0;
    }
  }
  return Tr.default = e, Tr;
}
var Cr = {}, hc;
function Dn() {
  if (hc) return Cr;
  hc = 1, Object.defineProperty(Cr, "__esModule", { value: !0 });
  const e = Tn();
  class t extends Error {
    constructor(s, l, r, n) {
      super(n || `can't resolve reference ${r} from id ${l}`), this.missingRef = (0, e.resolveUrl)(s, l, r), this.missingSchema = (0, e.normalizeId)((0, e.getFullPath)(s, this.missingRef));
    }
  }
  return Cr.default = t, Cr;
}
var Te = {}, mc;
function Ys() {
  if (mc) return Te;
  mc = 1, Object.defineProperty(Te, "__esModule", { value: !0 }), Te.resolveSchema = Te.getCompilingSchema = Te.resolveRef = Te.compileSchema = Te.SchemaEnv = void 0;
  const e = re(), t = Zs(), f = Je(), s = Tn(), l = ce(), r = Cn();
  class n {
    constructor(d) {
      var i;
      this.refs = {}, this.dynamicAnchors = {};
      let m;
      typeof d.schema == "object" && (m = d.schema), this.schema = d.schema, this.schemaId = d.schemaId, this.root = d.root || this, this.baseId = (i = d.baseId) !== null && i !== void 0 ? i : (0, s.normalizeId)(m?.[d.schemaId || "$id"]), this.schemaPath = d.schemaPath, this.localRefs = d.localRefs, this.meta = d.meta, this.$async = m?.$async, this.refs = {};
    }
  }
  Te.SchemaEnv = n;
  function c(u) {
    const d = h.call(this, u);
    if (d)
      return d;
    const i = (0, s.getFullPath)(this.opts.uriResolver, u.root.baseId), { es5: m, lines: v } = this.opts.code, { ownProperties: p } = this.opts, y = new e.CodeGen(this.scope, { es5: m, lines: v, ownProperties: p });
    let $;
    u.$async && ($ = y.scopeValue("Error", {
      ref: t.default,
      code: (0, e._)`require("ajv/dist/runtime/validation_error").default`
    }));
    const b = y.scopeName("validate");
    u.validateName = b;
    const I = {
      gen: y,
      allErrors: this.opts.allErrors,
      data: f.default.data,
      parentData: f.default.parentData,
      parentDataProperty: f.default.parentDataProperty,
      dataNames: [f.default.data],
      dataPathArr: [e.nil],
      // TODO can its length be used as dataLevel if nil is removed?
      dataLevel: 0,
      dataTypes: [],
      definedProperties: /* @__PURE__ */ new Set(),
      topSchemaRef: y.scopeValue("schema", this.opts.code.source === !0 ? { ref: u.schema, code: (0, e.stringify)(u.schema) } : { ref: u.schema }),
      validateName: b,
      ValidationError: $,
      schema: u.schema,
      schemaEnv: u,
      rootId: i,
      baseId: u.baseId || i,
      schemaPath: e.nil,
      errSchemaPath: u.schemaPath || (this.opts.jtd ? "" : "#"),
      errorPath: (0, e._)`""`,
      opts: this.opts,
      self: this
    };
    let L;
    try {
      this._compilations.add(u), (0, r.validateFunctionCode)(I), y.optimize(this.opts.code.optimize);
      const F = y.toString();
      L = `${y.scopeRefs(f.default.scope)}return ${F}`, this.opts.code.process && (L = this.opts.code.process(L, u));
      const U = new Function(`${f.default.self}`, `${f.default.scope}`, L)(this, this.scope.get());
      if (this.scope.value(b, { ref: U }), U.errors = null, U.schema = u.schema, U.schemaEnv = u, u.$async && (U.$async = !0), this.opts.code.source === !0 && (U.source = { validateName: b, validateCode: F, scopeValues: y._values }), this.opts.unevaluated) {
        const { props: V, items: K } = I;
        U.evaluated = {
          props: V instanceof e.Name ? void 0 : V,
          items: K instanceof e.Name ? void 0 : K,
          dynamicProps: V instanceof e.Name,
          dynamicItems: K instanceof e.Name
        }, U.source && (U.source.evaluated = (0, e.stringify)(U.evaluated));
      }
      return u.validate = U, u;
    } catch (F) {
      throw delete u.validate, delete u.validateName, L && this.logger.error("Error compiling schema, function code:", L), F;
    } finally {
      this._compilations.delete(u);
    }
  }
  Te.compileSchema = c;
  function o(u, d, i) {
    var m;
    i = (0, s.resolveUrl)(this.opts.uriResolver, d, i);
    const v = u.refs[i];
    if (v)
      return v;
    let p = E.call(this, u, i);
    if (p === void 0) {
      const y = (m = u.localRefs) === null || m === void 0 ? void 0 : m[i], { schemaId: $ } = this.opts;
      y && (p = new n({ schema: y, schemaId: $, root: u, baseId: d }));
    }
    if (p !== void 0)
      return u.refs[i] = a.call(this, p);
  }
  Te.resolveRef = o;
  function a(u) {
    return (0, s.inlineRef)(u.schema, this.opts.inlineRefs) ? u.schema : u.validate ? u : c.call(this, u);
  }
  function h(u) {
    for (const d of this._compilations)
      if (_(d, u))
        return d;
  }
  Te.getCompilingSchema = h;
  function _(u, d) {
    return u.schema === d.schema && u.root === d.root && u.baseId === d.baseId;
  }
  function E(u, d) {
    let i;
    for (; typeof (i = this.refs[d]) == "string"; )
      d = i;
    return i || this.schemas[d] || g.call(this, u, d);
  }
  function g(u, d) {
    const i = this.opts.uriResolver.parse(d), m = (0, s._getFullPath)(this.opts.uriResolver, i);
    let v = (0, s.getFullPath)(this.opts.uriResolver, u.baseId, void 0);
    if (Object.keys(u.schema).length > 0 && m === v)
      return R.call(this, i, u);
    const p = (0, s.normalizeId)(m), y = this.refs[p] || this.schemas[p];
    if (typeof y == "string") {
      const $ = g.call(this, u, y);
      return typeof $?.schema != "object" ? void 0 : R.call(this, i, $);
    }
    if (typeof y?.schema == "object") {
      if (y.validate || c.call(this, y), p === (0, s.normalizeId)(d)) {
        const { schema: $ } = y, { schemaId: b } = this.opts, I = $[b];
        return I && (v = (0, s.resolveUrl)(this.opts.uriResolver, v, I)), new n({ schema: $, schemaId: b, root: u, baseId: v });
      }
      return R.call(this, i, y);
    }
  }
  Te.resolveSchema = g;
  const w = /* @__PURE__ */ new Set([
    "properties",
    "patternProperties",
    "enum",
    "dependencies",
    "definitions"
  ]);
  function R(u, { baseId: d, schema: i, root: m }) {
    var v;
    if (((v = u.fragment) === null || v === void 0 ? void 0 : v[0]) !== "/")
      return;
    for (const $ of u.fragment.slice(1).split("/")) {
      if (typeof i == "boolean")
        return;
      const b = i[(0, l.unescapeFragment)($)];
      if (b === void 0)
        return;
      i = b;
      const I = typeof i == "object" && i[this.opts.schemaId];
      !w.has($) && I && (d = (0, s.resolveUrl)(this.opts.uriResolver, d, I));
    }
    let p;
    if (typeof i != "boolean" && i.$ref && !(0, l.schemaHasRulesButRef)(i, this.RULES)) {
      const $ = (0, s.resolveUrl)(this.opts.uriResolver, d, i.$ref);
      p = g.call(this, m, $);
    }
    const { schemaId: y } = this.opts;
    if (p = p || new n({ schema: i, schemaId: y, root: m, baseId: d }), p.schema !== p.root.schema)
      return p;
  }
  return Te;
}
const hh = "https://raw.githubusercontent.com/ajv-validator/ajv/master/lib/refs/data.json#", mh = "Meta-schema for $data reference (JSON AnySchema extension proposal)", ph = "object", yh = ["$data"], vh = { $data: { type: "string", anyOf: [{ format: "relative-json-pointer" }, { format: "json-pointer" }] } }, gh = !1, _h = {
  $id: hh,
  description: mh,
  type: ph,
  required: yh,
  properties: vh,
  additionalProperties: gh
};
var Dr = {}, pc;
function $h() {
  if (pc) return Dr;
  pc = 1, Object.defineProperty(Dr, "__esModule", { value: !0 });
  const e = uf();
  return e.code = 'require("ajv/dist/runtime/uri").default', Dr.default = e, Dr;
}
var yc;
function Eh() {
  return yc || (yc = 1, function(e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.CodeGen = e.Name = e.nil = e.stringify = e.str = e._ = e.KeywordCxt = void 0;
    var t = Cn();
    Object.defineProperty(e, "KeywordCxt", { enumerable: !0, get: function() {
      return t.KeywordCxt;
    } });
    var f = re();
    Object.defineProperty(e, "_", { enumerable: !0, get: function() {
      return f._;
    } }), Object.defineProperty(e, "str", { enumerable: !0, get: function() {
      return f.str;
    } }), Object.defineProperty(e, "stringify", { enumerable: !0, get: function() {
      return f.stringify;
    } }), Object.defineProperty(e, "nil", { enumerable: !0, get: function() {
      return f.nil;
    } }), Object.defineProperty(e, "Name", { enumerable: !0, get: function() {
      return f.Name;
    } }), Object.defineProperty(e, "CodeGen", { enumerable: !0, get: function() {
      return f.CodeGen;
    } });
    const s = Zs(), l = Dn(), r = hf(), n = Ys(), c = re(), o = Tn(), a = Sn(), h = ce(), _ = _h, E = $h(), g = (A, T) => new RegExp(A, T);
    g.code = "new RegExp";
    const w = ["removeAdditional", "useDefaults", "coerceTypes"], R = /* @__PURE__ */ new Set([
      "validate",
      "serialize",
      "parse",
      "wrapper",
      "root",
      "schema",
      "keyword",
      "pattern",
      "formats",
      "validate$data",
      "func",
      "obj",
      "Error"
    ]), u = {
      errorDataPath: "",
      format: "`validateFormats: false` can be used instead.",
      nullable: '"nullable" keyword is supported by default.',
      jsonPointers: "Deprecated jsPropertySyntax can be used instead.",
      extendRefs: "Deprecated ignoreKeywordsWithRef can be used instead.",
      missingRefs: "Pass empty schema with $id that should be ignored to ajv.addSchema.",
      processCode: "Use option `code: {process: (code, schemaEnv: object) => string}`",
      sourceCode: "Use option `code: {source: true}`",
      strictDefaults: "It is default now, see option `strict`.",
      strictKeywords: "It is default now, see option `strict`.",
      uniqueItems: '"uniqueItems" keyword is always validated.',
      unknownFormats: "Disable strict mode or pass `true` to `ajv.addFormat` (or `formats` option).",
      cache: "Map is used as cache, schema object as key.",
      serialize: "Map is used as cache, schema object as key.",
      ajvErrors: "It is default now."
    }, d = {
      ignoreKeywordsWithRef: "",
      jsPropertySyntax: "",
      unicode: '"minLength"/"maxLength" account for unicode characters by default.'
    }, i = 200;
    function m(A) {
      var T, q, C, S, P, O, B, x, Q, Z, N, D, k, j, z, Y, X, ve, ue, le, ne, be, he, Ue, ge;
      const me = A.strict, oe = (T = A.code) === null || T === void 0 ? void 0 : T.optimize, ie = oe === !0 || oe === void 0 ? 1 : oe || 0, $e = (C = (q = A.code) === null || q === void 0 ? void 0 : q.regExp) !== null && C !== void 0 ? C : g, Mn = (S = A.uriResolver) !== null && S !== void 0 ? S : E.default;
      return {
        strictSchema: (O = (P = A.strictSchema) !== null && P !== void 0 ? P : me) !== null && O !== void 0 ? O : !0,
        strictNumbers: (x = (B = A.strictNumbers) !== null && B !== void 0 ? B : me) !== null && x !== void 0 ? x : !0,
        strictTypes: (Z = (Q = A.strictTypes) !== null && Q !== void 0 ? Q : me) !== null && Z !== void 0 ? Z : "log",
        strictTuples: (D = (N = A.strictTuples) !== null && N !== void 0 ? N : me) !== null && D !== void 0 ? D : "log",
        strictRequired: (j = (k = A.strictRequired) !== null && k !== void 0 ? k : me) !== null && j !== void 0 ? j : !1,
        code: A.code ? { ...A.code, optimize: ie, regExp: $e } : { optimize: ie, regExp: $e },
        loopRequired: (z = A.loopRequired) !== null && z !== void 0 ? z : i,
        loopEnum: (Y = A.loopEnum) !== null && Y !== void 0 ? Y : i,
        meta: (X = A.meta) !== null && X !== void 0 ? X : !0,
        messages: (ve = A.messages) !== null && ve !== void 0 ? ve : !0,
        inlineRefs: (ue = A.inlineRefs) !== null && ue !== void 0 ? ue : !0,
        schemaId: (le = A.schemaId) !== null && le !== void 0 ? le : "$id",
        addUsedSchema: (ne = A.addUsedSchema) !== null && ne !== void 0 ? ne : !0,
        validateSchema: (be = A.validateSchema) !== null && be !== void 0 ? be : !0,
        validateFormats: (he = A.validateFormats) !== null && he !== void 0 ? he : !0,
        unicodeRegExp: (Ue = A.unicodeRegExp) !== null && Ue !== void 0 ? Ue : !0,
        int32range: (ge = A.int32range) !== null && ge !== void 0 ? ge : !0,
        uriResolver: Mn
      };
    }
    class v {
      constructor(T = {}) {
        this.schemas = {}, this.refs = {}, this.formats = {}, this._compilations = /* @__PURE__ */ new Set(), this._loading = {}, this._cache = /* @__PURE__ */ new Map(), T = this.opts = { ...T, ...m(T) };
        const { es5: q, lines: C } = this.opts.code;
        this.scope = new c.ValueScope({ scope: {}, prefixes: R, es5: q, lines: C }), this.logger = H(T.logger);
        const S = T.validateFormats;
        T.validateFormats = !1, this.RULES = (0, r.getRules)(), p.call(this, u, T, "NOT SUPPORTED"), p.call(this, d, T, "DEPRECATED", "warn"), this._metaOpts = L.call(this), T.formats && b.call(this), this._addVocabularies(), this._addDefaultMetaSchema(), T.keywords && I.call(this, T.keywords), typeof T.meta == "object" && this.addMetaSchema(T.meta), $.call(this), T.validateFormats = S;
      }
      _addVocabularies() {
        this.addKeyword("$async");
      }
      _addDefaultMetaSchema() {
        const { $data: T, meta: q, schemaId: C } = this.opts;
        let S = _;
        C === "id" && (S = { ..._ }, S.id = S.$id, delete S.$id), q && T && this.addMetaSchema(S, S[C], !1);
      }
      defaultMeta() {
        const { meta: T, schemaId: q } = this.opts;
        return this.opts.defaultMeta = typeof T == "object" ? T[q] || T : void 0;
      }
      validate(T, q) {
        let C;
        if (typeof T == "string") {
          if (C = this.getSchema(T), !C)
            throw new Error(`no schema with key or ref "${T}"`);
        } else
          C = this.compile(T);
        const S = C(q);
        return "$async" in C || (this.errors = C.errors), S;
      }
      compile(T, q) {
        const C = this._addSchema(T, q);
        return C.validate || this._compileSchemaEnv(C);
      }
      compileAsync(T, q) {
        if (typeof this.opts.loadSchema != "function")
          throw new Error("options.loadSchema should be a function");
        const { loadSchema: C } = this.opts;
        return S.call(this, T, q);
        async function S(Z, N) {
          await P.call(this, Z.$schema);
          const D = this._addSchema(Z, N);
          return D.validate || O.call(this, D);
        }
        async function P(Z) {
          Z && !this.getSchema(Z) && await S.call(this, { $ref: Z }, !0);
        }
        async function O(Z) {
          try {
            return this._compileSchemaEnv(Z);
          } catch (N) {
            if (!(N instanceof l.default))
              throw N;
            return B.call(this, N), await x.call(this, N.missingSchema), O.call(this, Z);
          }
        }
        function B({ missingSchema: Z, missingRef: N }) {
          if (this.refs[Z])
            throw new Error(`AnySchema ${Z} is loaded but ${N} cannot be resolved`);
        }
        async function x(Z) {
          const N = await Q.call(this, Z);
          this.refs[Z] || await P.call(this, N.$schema), this.refs[Z] || this.addSchema(N, Z, q);
        }
        async function Q(Z) {
          const N = this._loading[Z];
          if (N)
            return N;
          try {
            return await (this._loading[Z] = C(Z));
          } finally {
            delete this._loading[Z];
          }
        }
      }
      // Adds schema to the instance
      addSchema(T, q, C, S = this.opts.validateSchema) {
        if (Array.isArray(T)) {
          for (const O of T)
            this.addSchema(O, void 0, C, S);
          return this;
        }
        let P;
        if (typeof T == "object") {
          const { schemaId: O } = this.opts;
          if (P = T[O], P !== void 0 && typeof P != "string")
            throw new Error(`schema ${O} must be string`);
        }
        return q = (0, o.normalizeId)(q || P), this._checkUnique(q), this.schemas[q] = this._addSchema(T, C, q, S, !0), this;
      }
      // Add schema that will be used to validate other schemas
      // options in META_IGNORE_OPTIONS are alway set to false
      addMetaSchema(T, q, C = this.opts.validateSchema) {
        return this.addSchema(T, q, !0, C), this;
      }
      //  Validate schema against its meta-schema
      validateSchema(T, q) {
        if (typeof T == "boolean")
          return !0;
        let C;
        if (C = T.$schema, C !== void 0 && typeof C != "string")
          throw new Error("$schema must be a string");
        if (C = C || this.opts.defaultMeta || this.defaultMeta(), !C)
          return this.logger.warn("meta-schema not available"), this.errors = null, !0;
        const S = this.validate(C, T);
        if (!S && q) {
          const P = "schema is invalid: " + this.errorsText();
          if (this.opts.validateSchema === "log")
            this.logger.error(P);
          else
            throw new Error(P);
        }
        return S;
      }
      // Get compiled schema by `key` or `ref`.
      // (`key` that was passed to `addSchema` or full schema reference - `schema.$id` or resolved id)
      getSchema(T) {
        let q;
        for (; typeof (q = y.call(this, T)) == "string"; )
          T = q;
        if (q === void 0) {
          const { schemaId: C } = this.opts, S = new n.SchemaEnv({ schema: {}, schemaId: C });
          if (q = n.resolveSchema.call(this, S, T), !q)
            return;
          this.refs[T] = q;
        }
        return q.validate || this._compileSchemaEnv(q);
      }
      // Remove cached schema(s).
      // If no parameter is passed all schemas but meta-schemas are removed.
      // If RegExp is passed all schemas with key/id matching pattern but meta-schemas are removed.
      // Even if schema is referenced by other schemas it still can be removed as other schemas have local references.
      removeSchema(T) {
        if (T instanceof RegExp)
          return this._removeAllSchemas(this.schemas, T), this._removeAllSchemas(this.refs, T), this;
        switch (typeof T) {
          case "undefined":
            return this._removeAllSchemas(this.schemas), this._removeAllSchemas(this.refs), this._cache.clear(), this;
          case "string": {
            const q = y.call(this, T);
            return typeof q == "object" && this._cache.delete(q.schema), delete this.schemas[T], delete this.refs[T], this;
          }
          case "object": {
            const q = T;
            this._cache.delete(q);
            let C = T[this.opts.schemaId];
            return C && (C = (0, o.normalizeId)(C), delete this.schemas[C], delete this.refs[C]), this;
          }
          default:
            throw new Error("ajv.removeSchema: invalid parameter");
        }
      }
      // add "vocabulary" - a collection of keywords
      addVocabulary(T) {
        for (const q of T)
          this.addKeyword(q);
        return this;
      }
      addKeyword(T, q) {
        let C;
        if (typeof T == "string")
          C = T, typeof q == "object" && (this.logger.warn("these parameters are deprecated, see docs for addKeyword"), q.keyword = C);
        else if (typeof T == "object" && q === void 0) {
          if (q = T, C = q.keyword, Array.isArray(C) && !C.length)
            throw new Error("addKeywords: keyword must be string or non-empty array");
        } else
          throw new Error("invalid addKeywords parameters");
        if (V.call(this, C, q), !q)
          return (0, h.eachItem)(C, (P) => K.call(this, P)), this;
        W.call(this, q);
        const S = {
          ...q,
          type: (0, a.getJSONTypes)(q.type),
          schemaType: (0, a.getJSONTypes)(q.schemaType)
        };
        return (0, h.eachItem)(C, S.type.length === 0 ? (P) => K.call(this, P, S) : (P) => S.type.forEach((O) => K.call(this, P, S, O))), this;
      }
      getKeyword(T) {
        const q = this.RULES.all[T];
        return typeof q == "object" ? q.definition : !!q;
      }
      // Remove keyword
      removeKeyword(T) {
        const { RULES: q } = this;
        delete q.keywords[T], delete q.all[T];
        for (const C of q.rules) {
          const S = C.rules.findIndex((P) => P.keyword === T);
          S >= 0 && C.rules.splice(S, 1);
        }
        return this;
      }
      // Add format
      addFormat(T, q) {
        return typeof q == "string" && (q = new RegExp(q)), this.formats[T] = q, this;
      }
      errorsText(T = this.errors, { separator: q = ", ", dataVar: C = "data" } = {}) {
        return !T || T.length === 0 ? "No errors" : T.map((S) => `${C}${S.instancePath} ${S.message}`).reduce((S, P) => S + q + P);
      }
      $dataMetaSchema(T, q) {
        const C = this.RULES.all;
        T = JSON.parse(JSON.stringify(T));
        for (const S of q) {
          const P = S.split("/").slice(1);
          let O = T;
          for (const B of P)
            O = O[B];
          for (const B in C) {
            const x = C[B];
            if (typeof x != "object")
              continue;
            const { $data: Q } = x.definition, Z = O[B];
            Q && Z && (O[B] = G(Z));
          }
        }
        return T;
      }
      _removeAllSchemas(T, q) {
        for (const C in T) {
          const S = T[C];
          (!q || q.test(C)) && (typeof S == "string" ? delete T[C] : S && !S.meta && (this._cache.delete(S.schema), delete T[C]));
        }
      }
      _addSchema(T, q, C, S = this.opts.validateSchema, P = this.opts.addUsedSchema) {
        let O;
        const { schemaId: B } = this.opts;
        if (typeof T == "object")
          O = T[B];
        else {
          if (this.opts.jtd)
            throw new Error("schema must be object");
          if (typeof T != "boolean")
            throw new Error("schema must be object or boolean");
        }
        let x = this._cache.get(T);
        if (x !== void 0)
          return x;
        C = (0, o.normalizeId)(O || C);
        const Q = o.getSchemaRefs.call(this, T, C);
        return x = new n.SchemaEnv({ schema: T, schemaId: B, meta: q, baseId: C, localRefs: Q }), this._cache.set(x.schema, x), P && !C.startsWith("#") && (C && this._checkUnique(C), this.refs[C] = x), S && this.validateSchema(T, !0), x;
      }
      _checkUnique(T) {
        if (this.schemas[T] || this.refs[T])
          throw new Error(`schema with key or id "${T}" already exists`);
      }
      _compileSchemaEnv(T) {
        if (T.meta ? this._compileMetaSchema(T) : n.compileSchema.call(this, T), !T.validate)
          throw new Error("ajv implementation error");
        return T.validate;
      }
      _compileMetaSchema(T) {
        const q = this.opts;
        this.opts = this._metaOpts;
        try {
          n.compileSchema.call(this, T);
        } finally {
          this.opts = q;
        }
      }
    }
    v.ValidationError = s.default, v.MissingRefError = l.default, e.default = v;
    function p(A, T, q, C = "error") {
      for (const S in A) {
        const P = S;
        P in T && this.logger[C](`${q}: option ${S}. ${A[P]}`);
      }
    }
    function y(A) {
      return A = (0, o.normalizeId)(A), this.schemas[A] || this.refs[A];
    }
    function $() {
      const A = this.opts.schemas;
      if (A)
        if (Array.isArray(A))
          this.addSchema(A);
        else
          for (const T in A)
            this.addSchema(A[T], T);
    }
    function b() {
      for (const A in this.opts.formats) {
        const T = this.opts.formats[A];
        T && this.addFormat(A, T);
      }
    }
    function I(A) {
      if (Array.isArray(A)) {
        this.addVocabulary(A);
        return;
      }
      this.logger.warn("keywords option as map is deprecated, pass array");
      for (const T in A) {
        const q = A[T];
        q.keyword || (q.keyword = T), this.addKeyword(q);
      }
    }
    function L() {
      const A = { ...this.opts };
      for (const T of w)
        delete A[T];
      return A;
    }
    const F = { log() {
    }, warn() {
    }, error() {
    } };
    function H(A) {
      if (A === !1)
        return F;
      if (A === void 0)
        return console;
      if (A.log && A.warn && A.error)
        return A;
      throw new Error("logger must implement log, warn and error methods");
    }
    const U = /^[a-z_$][a-z0-9_$:-]*$/i;
    function V(A, T) {
      const { RULES: q } = this;
      if ((0, h.eachItem)(A, (C) => {
        if (q.keywords[C])
          throw new Error(`Keyword ${C} is already defined`);
        if (!U.test(C))
          throw new Error(`Keyword ${C} has invalid name`);
      }), !!T && T.$data && !("code" in T || "validate" in T))
        throw new Error('$data keyword must have "code" or "validate" function');
    }
    function K(A, T, q) {
      var C;
      const S = T?.post;
      if (q && S)
        throw new Error('keyword with "post" flag cannot have "type"');
      const { RULES: P } = this;
      let O = S ? P.post : P.rules.find(({ type: x }) => x === q);
      if (O || (O = { type: q, rules: [] }, P.rules.push(O)), P.keywords[A] = !0, !T)
        return;
      const B = {
        keyword: A,
        definition: {
          ...T,
          type: (0, a.getJSONTypes)(T.type),
          schemaType: (0, a.getJSONTypes)(T.schemaType)
        }
      };
      T.before ? J.call(this, O, B, T.before) : O.rules.push(B), P.all[A] = B, (C = T.implements) === null || C === void 0 || C.forEach((x) => this.addKeyword(x));
    }
    function J(A, T, q) {
      const C = A.rules.findIndex((S) => S.keyword === q);
      C >= 0 ? A.rules.splice(C, 0, T) : (A.rules.push(T), this.logger.warn(`rule ${q} is not defined`));
    }
    function W(A) {
      let { metaSchema: T } = A;
      T !== void 0 && (A.$data && this.opts.$data && (T = G(T)), A.validateSchema = this.compile(T, !0));
    }
    const M = {
      $ref: "https://raw.githubusercontent.com/ajv-validator/ajv/master/lib/refs/data.json#"
    };
    function G(A) {
      return { anyOf: [A, M] };
    }
  }(ni)), ni;
}
var Ar = {}, Lr = {}, kr = {}, vc;
function wh() {
  if (vc) return kr;
  vc = 1, Object.defineProperty(kr, "__esModule", { value: !0 });
  const e = {
    keyword: "id",
    code() {
      throw new Error('NOT SUPPORTED: keyword "id", use "$id" for schema ID');
    }
  };
  return kr.default = e, kr;
}
var We = {}, gc;
function Sh() {
  if (gc) return We;
  gc = 1, Object.defineProperty(We, "__esModule", { value: !0 }), We.callRef = We.getValidate = void 0;
  const e = Dn(), t = je(), f = re(), s = Je(), l = Ys(), r = ce(), n = {
    keyword: "$ref",
    schemaType: "string",
    code(a) {
      const { gen: h, schema: _, it: E } = a, { baseId: g, schemaEnv: w, validateName: R, opts: u, self: d } = E, { root: i } = w;
      if ((_ === "#" || _ === "#/") && g === i.baseId)
        return v();
      const m = l.resolveRef.call(d, i, g, _);
      if (m === void 0)
        throw new e.default(E.opts.uriResolver, g, _);
      if (m instanceof l.SchemaEnv)
        return p(m);
      return y(m);
      function v() {
        if (w === i)
          return o(a, R, w, w.$async);
        const $ = h.scopeValue("root", { ref: i });
        return o(a, (0, f._)`${$}.validate`, i, i.$async);
      }
      function p($) {
        const b = c(a, $);
        o(a, b, $, $.$async);
      }
      function y($) {
        const b = h.scopeValue("schema", u.code.source === !0 ? { ref: $, code: (0, f.stringify)($) } : { ref: $ }), I = h.name("valid"), L = a.subschema({
          schema: $,
          dataTypes: [],
          schemaPath: f.nil,
          topSchemaRef: b,
          errSchemaPath: _
        }, I);
        a.mergeEvaluated(L), a.ok(I);
      }
    }
  };
  function c(a, h) {
    const { gen: _ } = a;
    return h.validate ? _.scopeValue("validate", { ref: h.validate }) : (0, f._)`${_.scopeValue("wrapper", { ref: h })}.validate`;
  }
  We.getValidate = c;
  function o(a, h, _, E) {
    const { gen: g, it: w } = a, { allErrors: R, schemaEnv: u, opts: d } = w, i = d.passContext ? s.default.this : f.nil;
    E ? m() : v();
    function m() {
      if (!u.$async)
        throw new Error("async schema referenced by sync schema");
      const $ = g.let("valid");
      g.try(() => {
        g.code((0, f._)`await ${(0, t.callValidateCode)(a, h, i)}`), y(h), R || g.assign($, !0);
      }, (b) => {
        g.if((0, f._)`!(${b} instanceof ${w.ValidationError})`, () => g.throw(b)), p(b), R || g.assign($, !1);
      }), a.ok($);
    }
    function v() {
      a.result((0, t.callValidateCode)(a, h, i), () => y(h), () => p(h));
    }
    function p($) {
      const b = (0, f._)`${$}.errors`;
      g.assign(s.default.vErrors, (0, f._)`${s.default.vErrors} === null ? ${b} : ${s.default.vErrors}.concat(${b})`), g.assign(s.default.errors, (0, f._)`${s.default.vErrors}.length`);
    }
    function y($) {
      var b;
      if (!w.opts.unevaluated)
        return;
      const I = (b = _?.validate) === null || b === void 0 ? void 0 : b.evaluated;
      if (w.props !== !0)
        if (I && !I.dynamicProps)
          I.props !== void 0 && (w.props = r.mergeEvaluated.props(g, I.props, w.props));
        else {
          const L = g.var("props", (0, f._)`${$}.evaluated.props`);
          w.props = r.mergeEvaluated.props(g, L, w.props, f.Name);
        }
      if (w.items !== !0)
        if (I && !I.dynamicItems)
          I.items !== void 0 && (w.items = r.mergeEvaluated.items(g, I.items, w.items));
        else {
          const L = g.var("items", (0, f._)`${$}.evaluated.items`);
          w.items = r.mergeEvaluated.items(g, L, w.items, f.Name);
        }
    }
  }
  return We.callRef = o, We.default = n, We;
}
var _c;
function bh() {
  if (_c) return Lr;
  _c = 1, Object.defineProperty(Lr, "__esModule", { value: !0 });
  const e = wh(), t = Sh(), f = [
    "$schema",
    "$id",
    "$defs",
    "$vocabulary",
    { keyword: "$comment" },
    "definitions",
    e.default,
    t.default
  ];
  return Lr.default = f, Lr;
}
var jr = {}, qr = {}, $c;
function Rh() {
  if ($c) return qr;
  $c = 1, Object.defineProperty(qr, "__esModule", { value: !0 });
  const e = re(), t = e.operators, f = {
    maximum: { okStr: "<=", ok: t.LTE, fail: t.GT },
    minimum: { okStr: ">=", ok: t.GTE, fail: t.LT },
    exclusiveMaximum: { okStr: "<", ok: t.LT, fail: t.GTE },
    exclusiveMinimum: { okStr: ">", ok: t.GT, fail: t.LTE }
  }, s = {
    message: ({ keyword: r, schemaCode: n }) => (0, e.str)`must be ${f[r].okStr} ${n}`,
    params: ({ keyword: r, schemaCode: n }) => (0, e._)`{comparison: ${f[r].okStr}, limit: ${n}}`
  }, l = {
    keyword: Object.keys(f),
    type: "number",
    schemaType: "number",
    $data: !0,
    error: s,
    code(r) {
      const { keyword: n, data: c, schemaCode: o } = r;
      r.fail$data((0, e._)`${c} ${f[n].fail} ${o} || isNaN(${c})`);
    }
  };
  return qr.default = l, qr;
}
var Fr = {}, Ec;
function Ph() {
  if (Ec) return Fr;
  Ec = 1, Object.defineProperty(Fr, "__esModule", { value: !0 });
  const e = re(), f = {
    keyword: "multipleOf",
    type: "number",
    schemaType: "number",
    $data: !0,
    error: {
      message: ({ schemaCode: s }) => (0, e.str)`must be multiple of ${s}`,
      params: ({ schemaCode: s }) => (0, e._)`{multipleOf: ${s}}`
    },
    code(s) {
      const { gen: l, data: r, schemaCode: n, it: c } = s, o = c.opts.multipleOfPrecision, a = l.let("res"), h = o ? (0, e._)`Math.abs(Math.round(${a}) - ${a}) > 1e-${o}` : (0, e._)`${a} !== parseInt(${a})`;
      s.fail$data((0, e._)`(${n} === 0 || (${a} = ${r}/${n}, ${h}))`);
    }
  };
  return Fr.default = f, Fr;
}
var Mr = {}, Ur = {}, wc;
function Oh() {
  if (wc) return Ur;
  wc = 1, Object.defineProperty(Ur, "__esModule", { value: !0 });
  function e(t) {
    const f = t.length;
    let s = 0, l = 0, r;
    for (; l < f; )
      s++, r = t.charCodeAt(l++), r >= 55296 && r <= 56319 && l < f && (r = t.charCodeAt(l), (r & 64512) === 56320 && l++);
    return s;
  }
  return Ur.default = e, e.code = 'require("ajv/dist/runtime/ucs2length").default', Ur;
}
var Sc;
function Nh() {
  if (Sc) return Mr;
  Sc = 1, Object.defineProperty(Mr, "__esModule", { value: !0 });
  const e = re(), t = ce(), f = Oh(), l = {
    keyword: ["maxLength", "minLength"],
    type: "string",
    schemaType: "number",
    $data: !0,
    error: {
      message({ keyword: r, schemaCode: n }) {
        const c = r === "maxLength" ? "more" : "fewer";
        return (0, e.str)`must NOT have ${c} than ${n} characters`;
      },
      params: ({ schemaCode: r }) => (0, e._)`{limit: ${r}}`
    },
    code(r) {
      const { keyword: n, data: c, schemaCode: o, it: a } = r, h = n === "maxLength" ? e.operators.GT : e.operators.LT, _ = a.opts.unicode === !1 ? (0, e._)`${c}.length` : (0, e._)`${(0, t.useFunc)(r.gen, f.default)}(${c})`;
      r.fail$data((0, e._)`${_} ${h} ${o}`);
    }
  };
  return Mr.default = l, Mr;
}
var Vr = {}, bc;
function Ih() {
  if (bc) return Vr;
  bc = 1, Object.defineProperty(Vr, "__esModule", { value: !0 });
  const e = je(), t = re(), s = {
    keyword: "pattern",
    type: "string",
    schemaType: "string",
    $data: !0,
    error: {
      message: ({ schemaCode: l }) => (0, t.str)`must match pattern "${l}"`,
      params: ({ schemaCode: l }) => (0, t._)`{pattern: ${l}}`
    },
    code(l) {
      const { data: r, $data: n, schema: c, schemaCode: o, it: a } = l, h = a.opts.unicodeRegExp ? "u" : "", _ = n ? (0, t._)`(new RegExp(${o}, ${h}))` : (0, e.usePattern)(l, c);
      l.fail$data((0, t._)`!${_}.test(${r})`);
    }
  };
  return Vr.default = s, Vr;
}
var zr = {}, Rc;
function Th() {
  if (Rc) return zr;
  Rc = 1, Object.defineProperty(zr, "__esModule", { value: !0 });
  const e = re(), f = {
    keyword: ["maxProperties", "minProperties"],
    type: "object",
    schemaType: "number",
    $data: !0,
    error: {
      message({ keyword: s, schemaCode: l }) {
        const r = s === "maxProperties" ? "more" : "fewer";
        return (0, e.str)`must NOT have ${r} than ${l} properties`;
      },
      params: ({ schemaCode: s }) => (0, e._)`{limit: ${s}}`
    },
    code(s) {
      const { keyword: l, data: r, schemaCode: n } = s, c = l === "maxProperties" ? e.operators.GT : e.operators.LT;
      s.fail$data((0, e._)`Object.keys(${r}).length ${c} ${n}`);
    }
  };
  return zr.default = f, zr;
}
var xr = {}, Pc;
function Ch() {
  if (Pc) return xr;
  Pc = 1, Object.defineProperty(xr, "__esModule", { value: !0 });
  const e = je(), t = re(), f = ce(), l = {
    keyword: "required",
    type: "object",
    schemaType: "array",
    $data: !0,
    error: {
      message: ({ params: { missingProperty: r } }) => (0, t.str)`must have required property '${r}'`,
      params: ({ params: { missingProperty: r } }) => (0, t._)`{missingProperty: ${r}}`
    },
    code(r) {
      const { gen: n, schema: c, schemaCode: o, data: a, $data: h, it: _ } = r, { opts: E } = _;
      if (!h && c.length === 0)
        return;
      const g = c.length >= E.loopRequired;
      if (_.allErrors ? w() : R(), E.strictRequired) {
        const i = r.parentSchema.properties, { definedProperties: m } = r.it;
        for (const v of c)
          if (i?.[v] === void 0 && !m.has(v)) {
            const p = _.schemaEnv.baseId + _.errSchemaPath, y = `required property "${v}" is not defined at "${p}" (strictRequired)`;
            (0, f.checkStrictMode)(_, y, _.opts.strictRequired);
          }
      }
      function w() {
        if (g || h)
          r.block$data(t.nil, u);
        else
          for (const i of c)
            (0, e.checkReportMissingProp)(r, i);
      }
      function R() {
        const i = n.let("missing");
        if (g || h) {
          const m = n.let("valid", !0);
          r.block$data(m, () => d(i, m)), r.ok(m);
        } else
          n.if((0, e.checkMissingProp)(r, c, i)), (0, e.reportMissingProp)(r, i), n.else();
      }
      function u() {
        n.forOf("prop", o, (i) => {
          r.setParams({ missingProperty: i }), n.if((0, e.noPropertyInData)(n, a, i, E.ownProperties), () => r.error());
        });
      }
      function d(i, m) {
        r.setParams({ missingProperty: i }), n.forOf(i, o, () => {
          n.assign(m, (0, e.propertyInData)(n, a, i, E.ownProperties)), n.if((0, t.not)(m), () => {
            r.error(), n.break();
          });
        }, t.nil);
      }
    }
  };
  return xr.default = l, xr;
}
var Gr = {}, Oc;
function Dh() {
  if (Oc) return Gr;
  Oc = 1, Object.defineProperty(Gr, "__esModule", { value: !0 });
  const e = re(), f = {
    keyword: ["maxItems", "minItems"],
    type: "array",
    schemaType: "number",
    $data: !0,
    error: {
      message({ keyword: s, schemaCode: l }) {
        const r = s === "maxItems" ? "more" : "fewer";
        return (0, e.str)`must NOT have ${r} than ${l} items`;
      },
      params: ({ schemaCode: s }) => (0, e._)`{limit: ${s}}`
    },
    code(s) {
      const { keyword: l, data: r, schemaCode: n } = s, c = l === "maxItems" ? e.operators.GT : e.operators.LT;
      s.fail$data((0, e._)`${r}.length ${c} ${n}`);
    }
  };
  return Gr.default = f, Gr;
}
var Kr = {}, Br = {}, Nc;
function Qs() {
  if (Nc) return Br;
  Nc = 1, Object.defineProperty(Br, "__esModule", { value: !0 });
  const e = Rn();
  return e.code = 'require("ajv/dist/runtime/equal").default', Br.default = e, Br;
}
var Ic;
function Ah() {
  if (Ic) return Kr;
  Ic = 1, Object.defineProperty(Kr, "__esModule", { value: !0 });
  const e = Sn(), t = re(), f = ce(), s = Qs(), r = {
    keyword: "uniqueItems",
    type: "array",
    schemaType: "boolean",
    $data: !0,
    error: {
      message: ({ params: { i: n, j: c } }) => (0, t.str)`must NOT have duplicate items (items ## ${c} and ${n} are identical)`,
      params: ({ params: { i: n, j: c } }) => (0, t._)`{i: ${n}, j: ${c}}`
    },
    code(n) {
      const { gen: c, data: o, $data: a, schema: h, parentSchema: _, schemaCode: E, it: g } = n;
      if (!a && !h)
        return;
      const w = c.let("valid"), R = _.items ? (0, e.getSchemaTypes)(_.items) : [];
      n.block$data(w, u, (0, t._)`${E} === false`), n.ok(w);
      function u() {
        const v = c.let("i", (0, t._)`${o}.length`), p = c.let("j");
        n.setParams({ i: v, j: p }), c.assign(w, !0), c.if((0, t._)`${v} > 1`, () => (d() ? i : m)(v, p));
      }
      function d() {
        return R.length > 0 && !R.some((v) => v === "object" || v === "array");
      }
      function i(v, p) {
        const y = c.name("item"), $ = (0, e.checkDataTypes)(R, y, g.opts.strictNumbers, e.DataType.Wrong), b = c.const("indices", (0, t._)`{}`);
        c.for((0, t._)`;${v}--;`, () => {
          c.let(y, (0, t._)`${o}[${v}]`), c.if($, (0, t._)`continue`), R.length > 1 && c.if((0, t._)`typeof ${y} == "string"`, (0, t._)`${y} += "_"`), c.if((0, t._)`typeof ${b}[${y}] == "number"`, () => {
            c.assign(p, (0, t._)`${b}[${y}]`), n.error(), c.assign(w, !1).break();
          }).code((0, t._)`${b}[${y}] = ${v}`);
        });
      }
      function m(v, p) {
        const y = (0, f.useFunc)(c, s.default), $ = c.name("outer");
        c.label($).for((0, t._)`;${v}--;`, () => c.for((0, t._)`${p} = ${v}; ${p}--;`, () => c.if((0, t._)`${y}(${o}[${v}], ${o}[${p}])`, () => {
          n.error(), c.assign(w, !1).break($);
        })));
      }
    }
  };
  return Kr.default = r, Kr;
}
var Hr = {}, Tc;
function Lh() {
  if (Tc) return Hr;
  Tc = 1, Object.defineProperty(Hr, "__esModule", { value: !0 });
  const e = re(), t = ce(), f = Qs(), l = {
    keyword: "const",
    $data: !0,
    error: {
      message: "must be equal to constant",
      params: ({ schemaCode: r }) => (0, e._)`{allowedValue: ${r}}`
    },
    code(r) {
      const { gen: n, data: c, $data: o, schemaCode: a, schema: h } = r;
      o || h && typeof h == "object" ? r.fail$data((0, e._)`!${(0, t.useFunc)(n, f.default)}(${c}, ${a})`) : r.fail((0, e._)`${h} !== ${c}`);
    }
  };
  return Hr.default = l, Hr;
}
var Wr = {}, Cc;
function kh() {
  if (Cc) return Wr;
  Cc = 1, Object.defineProperty(Wr, "__esModule", { value: !0 });
  const e = re(), t = ce(), f = Qs(), l = {
    keyword: "enum",
    schemaType: "array",
    $data: !0,
    error: {
      message: "must be equal to one of the allowed values",
      params: ({ schemaCode: r }) => (0, e._)`{allowedValues: ${r}}`
    },
    code(r) {
      const { gen: n, data: c, $data: o, schema: a, schemaCode: h, it: _ } = r;
      if (!o && a.length === 0)
        throw new Error("enum must have non-empty array");
      const E = a.length >= _.opts.loopEnum;
      let g;
      const w = () => g ?? (g = (0, t.useFunc)(n, f.default));
      let R;
      if (E || o)
        R = n.let("valid"), r.block$data(R, u);
      else {
        if (!Array.isArray(a))
          throw new Error("ajv implementation error");
        const i = n.const("vSchema", h);
        R = (0, e.or)(...a.map((m, v) => d(i, v)));
      }
      r.pass(R);
      function u() {
        n.assign(R, !1), n.forOf("v", h, (i) => n.if((0, e._)`${w()}(${c}, ${i})`, () => n.assign(R, !0).break()));
      }
      function d(i, m) {
        const v = a[m];
        return typeof v == "object" && v !== null ? (0, e._)`${w()}(${c}, ${i}[${m}])` : (0, e._)`${c} === ${v}`;
      }
    }
  };
  return Wr.default = l, Wr;
}
var Dc;
function jh() {
  if (Dc) return jr;
  Dc = 1, Object.defineProperty(jr, "__esModule", { value: !0 });
  const e = Rh(), t = Ph(), f = Nh(), s = Ih(), l = Th(), r = Ch(), n = Dh(), c = Ah(), o = Lh(), a = kh(), h = [
    // number
    e.default,
    t.default,
    // string
    f.default,
    s.default,
    // object
    l.default,
    r.default,
    // array
    n.default,
    c.default,
    // any
    { keyword: "type", schemaType: ["string", "array"] },
    { keyword: "nullable", schemaType: "boolean" },
    o.default,
    a.default
  ];
  return jr.default = h, jr;
}
var Xr = {}, ut = {}, Ac;
function pf() {
  if (Ac) return ut;
  Ac = 1, Object.defineProperty(ut, "__esModule", { value: !0 }), ut.validateAdditionalItems = void 0;
  const e = re(), t = ce(), s = {
    keyword: "additionalItems",
    type: "array",
    schemaType: ["boolean", "object"],
    before: "uniqueItems",
    error: {
      message: ({ params: { len: r } }) => (0, e.str)`must NOT have more than ${r} items`,
      params: ({ params: { len: r } }) => (0, e._)`{limit: ${r}}`
    },
    code(r) {
      const { parentSchema: n, it: c } = r, { items: o } = n;
      if (!Array.isArray(o)) {
        (0, t.checkStrictMode)(c, '"additionalItems" is ignored when "items" is not an array of schemas');
        return;
      }
      l(r, o);
    }
  };
  function l(r, n) {
    const { gen: c, schema: o, data: a, keyword: h, it: _ } = r;
    _.items = !0;
    const E = c.const("len", (0, e._)`${a}.length`);
    if (o === !1)
      r.setParams({ len: n.length }), r.pass((0, e._)`${E} <= ${n.length}`);
    else if (typeof o == "object" && !(0, t.alwaysValidSchema)(_, o)) {
      const w = c.var("valid", (0, e._)`${E} <= ${n.length}`);
      c.if((0, e.not)(w), () => g(w)), r.ok(w);
    }
    function g(w) {
      c.forRange("i", n.length, E, (R) => {
        r.subschema({ keyword: h, dataProp: R, dataPropType: t.Type.Num }, w), _.allErrors || c.if((0, e.not)(w), () => c.break());
      });
    }
  }
  return ut.validateAdditionalItems = l, ut.default = s, ut;
}
var Jr = {}, lt = {}, Lc;
function yf() {
  if (Lc) return lt;
  Lc = 1, Object.defineProperty(lt, "__esModule", { value: !0 }), lt.validateTuple = void 0;
  const e = re(), t = ce(), f = je(), s = {
    keyword: "items",
    type: "array",
    schemaType: ["object", "array", "boolean"],
    before: "uniqueItems",
    code(r) {
      const { schema: n, it: c } = r;
      if (Array.isArray(n))
        return l(r, "additionalItems", n);
      c.items = !0, !(0, t.alwaysValidSchema)(c, n) && r.ok((0, f.validateArray)(r));
    }
  };
  function l(r, n, c = r.schema) {
    const { gen: o, parentSchema: a, data: h, keyword: _, it: E } = r;
    R(a), E.opts.unevaluated && c.length && E.items !== !0 && (E.items = t.mergeEvaluated.items(o, c.length, E.items));
    const g = o.name("valid"), w = o.const("len", (0, e._)`${h}.length`);
    c.forEach((u, d) => {
      (0, t.alwaysValidSchema)(E, u) || (o.if((0, e._)`${w} > ${d}`, () => r.subschema({
        keyword: _,
        schemaProp: d,
        dataProp: d
      }, g)), r.ok(g));
    });
    function R(u) {
      const { opts: d, errSchemaPath: i } = E, m = c.length, v = m === u.minItems && (m === u.maxItems || u[n] === !1);
      if (d.strictTuples && !v) {
        const p = `"${_}" is ${m}-tuple, but minItems or maxItems/${n} are not specified or different at path "${i}"`;
        (0, t.checkStrictMode)(E, p, d.strictTuples);
      }
    }
  }
  return lt.validateTuple = l, lt.default = s, lt;
}
var kc;
function qh() {
  if (kc) return Jr;
  kc = 1, Object.defineProperty(Jr, "__esModule", { value: !0 });
  const e = yf(), t = {
    keyword: "prefixItems",
    type: "array",
    schemaType: ["array"],
    before: "uniqueItems",
    code: (f) => (0, e.validateTuple)(f, "items")
  };
  return Jr.default = t, Jr;
}
var Zr = {}, jc;
function Fh() {
  if (jc) return Zr;
  jc = 1, Object.defineProperty(Zr, "__esModule", { value: !0 });
  const e = re(), t = ce(), f = je(), s = pf(), r = {
    keyword: "items",
    type: "array",
    schemaType: ["object", "boolean"],
    before: "uniqueItems",
    error: {
      message: ({ params: { len: n } }) => (0, e.str)`must NOT have more than ${n} items`,
      params: ({ params: { len: n } }) => (0, e._)`{limit: ${n}}`
    },
    code(n) {
      const { schema: c, parentSchema: o, it: a } = n, { prefixItems: h } = o;
      a.items = !0, !(0, t.alwaysValidSchema)(a, c) && (h ? (0, s.validateAdditionalItems)(n, h) : n.ok((0, f.validateArray)(n)));
    }
  };
  return Zr.default = r, Zr;
}
var Yr = {}, qc;
function Mh() {
  if (qc) return Yr;
  qc = 1, Object.defineProperty(Yr, "__esModule", { value: !0 });
  const e = re(), t = ce(), s = {
    keyword: "contains",
    type: "array",
    schemaType: ["object", "boolean"],
    before: "uniqueItems",
    trackErrors: !0,
    error: {
      message: ({ params: { min: l, max: r } }) => r === void 0 ? (0, e.str)`must contain at least ${l} valid item(s)` : (0, e.str)`must contain at least ${l} and no more than ${r} valid item(s)`,
      params: ({ params: { min: l, max: r } }) => r === void 0 ? (0, e._)`{minContains: ${l}}` : (0, e._)`{minContains: ${l}, maxContains: ${r}}`
    },
    code(l) {
      const { gen: r, schema: n, parentSchema: c, data: o, it: a } = l;
      let h, _;
      const { minContains: E, maxContains: g } = c;
      a.opts.next ? (h = E === void 0 ? 1 : E, _ = g) : h = 1;
      const w = r.const("len", (0, e._)`${o}.length`);
      if (l.setParams({ min: h, max: _ }), _ === void 0 && h === 0) {
        (0, t.checkStrictMode)(a, '"minContains" == 0 without "maxContains": "contains" keyword ignored');
        return;
      }
      if (_ !== void 0 && h > _) {
        (0, t.checkStrictMode)(a, '"minContains" > "maxContains" is always invalid'), l.fail();
        return;
      }
      if ((0, t.alwaysValidSchema)(a, n)) {
        let m = (0, e._)`${w} >= ${h}`;
        _ !== void 0 && (m = (0, e._)`${m} && ${w} <= ${_}`), l.pass(m);
        return;
      }
      a.items = !0;
      const R = r.name("valid");
      _ === void 0 && h === 1 ? d(R, () => r.if(R, () => r.break())) : h === 0 ? (r.let(R, !0), _ !== void 0 && r.if((0, e._)`${o}.length > 0`, u)) : (r.let(R, !1), u()), l.result(R, () => l.reset());
      function u() {
        const m = r.name("_valid"), v = r.let("count", 0);
        d(m, () => r.if(m, () => i(v)));
      }
      function d(m, v) {
        r.forRange("i", 0, w, (p) => {
          l.subschema({
            keyword: "contains",
            dataProp: p,
            dataPropType: t.Type.Num,
            compositeRule: !0
          }, m), v();
        });
      }
      function i(m) {
        r.code((0, e._)`${m}++`), _ === void 0 ? r.if((0, e._)`${m} >= ${h}`, () => r.assign(R, !0).break()) : (r.if((0, e._)`${m} > ${_}`, () => r.assign(R, !1).break()), h === 1 ? r.assign(R, !0) : r.if((0, e._)`${m} >= ${h}`, () => r.assign(R, !0)));
      }
    }
  };
  return Yr.default = s, Yr;
}
var ui = {}, Fc;
function Uh() {
  return Fc || (Fc = 1, function(e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.validateSchemaDeps = e.validatePropertyDeps = e.error = void 0;
    const t = re(), f = ce(), s = je();
    e.error = {
      message: ({ params: { property: o, depsCount: a, deps: h } }) => {
        const _ = a === 1 ? "property" : "properties";
        return (0, t.str)`must have ${_} ${h} when property ${o} is present`;
      },
      params: ({ params: { property: o, depsCount: a, deps: h, missingProperty: _ } }) => (0, t._)`{property: ${o},
    missingProperty: ${_},
    depsCount: ${a},
    deps: ${h}}`
      // TODO change to reference
    };
    const l = {
      keyword: "dependencies",
      type: "object",
      schemaType: "object",
      error: e.error,
      code(o) {
        const [a, h] = r(o);
        n(o, a), c(o, h);
      }
    };
    function r({ schema: o }) {
      const a = {}, h = {};
      for (const _ in o) {
        if (_ === "__proto__")
          continue;
        const E = Array.isArray(o[_]) ? a : h;
        E[_] = o[_];
      }
      return [a, h];
    }
    function n(o, a = o.schema) {
      const { gen: h, data: _, it: E } = o;
      if (Object.keys(a).length === 0)
        return;
      const g = h.let("missing");
      for (const w in a) {
        const R = a[w];
        if (R.length === 0)
          continue;
        const u = (0, s.propertyInData)(h, _, w, E.opts.ownProperties);
        o.setParams({
          property: w,
          depsCount: R.length,
          deps: R.join(", ")
        }), E.allErrors ? h.if(u, () => {
          for (const d of R)
            (0, s.checkReportMissingProp)(o, d);
        }) : (h.if((0, t._)`${u} && (${(0, s.checkMissingProp)(o, R, g)})`), (0, s.reportMissingProp)(o, g), h.else());
      }
    }
    e.validatePropertyDeps = n;
    function c(o, a = o.schema) {
      const { gen: h, data: _, keyword: E, it: g } = o, w = h.name("valid");
      for (const R in a)
        (0, f.alwaysValidSchema)(g, a[R]) || (h.if(
          (0, s.propertyInData)(h, _, R, g.opts.ownProperties),
          () => {
            const u = o.subschema({ keyword: E, schemaProp: R }, w);
            o.mergeValidEvaluated(u, w);
          },
          () => h.var(w, !0)
          // TODO var
        ), o.ok(w));
    }
    e.validateSchemaDeps = c, e.default = l;
  }(ui)), ui;
}
var Qr = {}, Mc;
function Vh() {
  if (Mc) return Qr;
  Mc = 1, Object.defineProperty(Qr, "__esModule", { value: !0 });
  const e = re(), t = ce(), s = {
    keyword: "propertyNames",
    type: "object",
    schemaType: ["object", "boolean"],
    error: {
      message: "property name must be valid",
      params: ({ params: l }) => (0, e._)`{propertyName: ${l.propertyName}}`
    },
    code(l) {
      const { gen: r, schema: n, data: c, it: o } = l;
      if ((0, t.alwaysValidSchema)(o, n))
        return;
      const a = r.name("valid");
      r.forIn("key", c, (h) => {
        l.setParams({ propertyName: h }), l.subschema({
          keyword: "propertyNames",
          data: h,
          dataTypes: ["string"],
          propertyName: h,
          compositeRule: !0
        }, a), r.if((0, e.not)(a), () => {
          l.error(!0), o.allErrors || r.break();
        });
      }), l.ok(a);
    }
  };
  return Qr.default = s, Qr;
}
var en = {}, Uc;
function vf() {
  if (Uc) return en;
  Uc = 1, Object.defineProperty(en, "__esModule", { value: !0 });
  const e = je(), t = re(), f = Je(), s = ce(), r = {
    keyword: "additionalProperties",
    type: ["object"],
    schemaType: ["boolean", "object"],
    allowUndefined: !0,
    trackErrors: !0,
    error: {
      message: "must NOT have additional properties",
      params: ({ params: n }) => (0, t._)`{additionalProperty: ${n.additionalProperty}}`
    },
    code(n) {
      const { gen: c, schema: o, parentSchema: a, data: h, errsCount: _, it: E } = n;
      if (!_)
        throw new Error("ajv implementation error");
      const { allErrors: g, opts: w } = E;
      if (E.props = !0, w.removeAdditional !== "all" && (0, s.alwaysValidSchema)(E, o))
        return;
      const R = (0, e.allSchemaProperties)(a.properties), u = (0, e.allSchemaProperties)(a.patternProperties);
      d(), n.ok((0, t._)`${_} === ${f.default.errors}`);
      function d() {
        c.forIn("key", h, (y) => {
          !R.length && !u.length ? v(y) : c.if(i(y), () => v(y));
        });
      }
      function i(y) {
        let $;
        if (R.length > 8) {
          const b = (0, s.schemaRefOrVal)(E, a.properties, "properties");
          $ = (0, e.isOwnProperty)(c, b, y);
        } else R.length ? $ = (0, t.or)(...R.map((b) => (0, t._)`${y} === ${b}`)) : $ = t.nil;
        return u.length && ($ = (0, t.or)($, ...u.map((b) => (0, t._)`${(0, e.usePattern)(n, b)}.test(${y})`))), (0, t.not)($);
      }
      function m(y) {
        c.code((0, t._)`delete ${h}[${y}]`);
      }
      function v(y) {
        if (w.removeAdditional === "all" || w.removeAdditional && o === !1) {
          m(y);
          return;
        }
        if (o === !1) {
          n.setParams({ additionalProperty: y }), n.error(), g || c.break();
          return;
        }
        if (typeof o == "object" && !(0, s.alwaysValidSchema)(E, o)) {
          const $ = c.name("valid");
          w.removeAdditional === "failing" ? (p(y, $, !1), c.if((0, t.not)($), () => {
            n.reset(), m(y);
          })) : (p(y, $), g || c.if((0, t.not)($), () => c.break()));
        }
      }
      function p(y, $, b) {
        const I = {
          keyword: "additionalProperties",
          dataProp: y,
          dataPropType: s.Type.Str
        };
        b === !1 && Object.assign(I, {
          compositeRule: !0,
          createErrors: !1,
          allErrors: !1
        }), n.subschema(I, $);
      }
    }
  };
  return en.default = r, en;
}
var tn = {}, Vc;
function zh() {
  if (Vc) return tn;
  Vc = 1, Object.defineProperty(tn, "__esModule", { value: !0 });
  const e = Cn(), t = je(), f = ce(), s = vf(), l = {
    keyword: "properties",
    type: "object",
    schemaType: "object",
    code(r) {
      const { gen: n, schema: c, parentSchema: o, data: a, it: h } = r;
      h.opts.removeAdditional === "all" && o.additionalProperties === void 0 && s.default.code(new e.KeywordCxt(h, s.default, "additionalProperties"));
      const _ = (0, t.allSchemaProperties)(c);
      for (const u of _)
        h.definedProperties.add(u);
      h.opts.unevaluated && _.length && h.props !== !0 && (h.props = f.mergeEvaluated.props(n, (0, f.toHash)(_), h.props));
      const E = _.filter((u) => !(0, f.alwaysValidSchema)(h, c[u]));
      if (E.length === 0)
        return;
      const g = n.name("valid");
      for (const u of E)
        w(u) ? R(u) : (n.if((0, t.propertyInData)(n, a, u, h.opts.ownProperties)), R(u), h.allErrors || n.else().var(g, !0), n.endIf()), r.it.definedProperties.add(u), r.ok(g);
      function w(u) {
        return h.opts.useDefaults && !h.compositeRule && c[u].default !== void 0;
      }
      function R(u) {
        r.subschema({
          keyword: "properties",
          schemaProp: u,
          dataProp: u
        }, g);
      }
    }
  };
  return tn.default = l, tn;
}
var rn = {}, zc;
function xh() {
  if (zc) return rn;
  zc = 1, Object.defineProperty(rn, "__esModule", { value: !0 });
  const e = je(), t = re(), f = ce(), s = ce(), l = {
    keyword: "patternProperties",
    type: "object",
    schemaType: "object",
    code(r) {
      const { gen: n, schema: c, data: o, parentSchema: a, it: h } = r, { opts: _ } = h, E = (0, e.allSchemaProperties)(c), g = E.filter((v) => (0, f.alwaysValidSchema)(h, c[v]));
      if (E.length === 0 || g.length === E.length && (!h.opts.unevaluated || h.props === !0))
        return;
      const w = _.strictSchema && !_.allowMatchingProperties && a.properties, R = n.name("valid");
      h.props !== !0 && !(h.props instanceof t.Name) && (h.props = (0, s.evaluatedPropsToName)(n, h.props));
      const { props: u } = h;
      d();
      function d() {
        for (const v of E)
          w && i(v), h.allErrors ? m(v) : (n.var(R, !0), m(v), n.if(R));
      }
      function i(v) {
        for (const p in w)
          new RegExp(v).test(p) && (0, f.checkStrictMode)(h, `property ${p} matches pattern ${v} (use allowMatchingProperties)`);
      }
      function m(v) {
        n.forIn("key", o, (p) => {
          n.if((0, t._)`${(0, e.usePattern)(r, v)}.test(${p})`, () => {
            const y = g.includes(v);
            y || r.subschema({
              keyword: "patternProperties",
              schemaProp: v,
              dataProp: p,
              dataPropType: s.Type.Str
            }, R), h.opts.unevaluated && u !== !0 ? n.assign((0, t._)`${u}[${p}]`, !0) : !y && !h.allErrors && n.if((0, t.not)(R), () => n.break());
          });
        });
      }
    }
  };
  return rn.default = l, rn;
}
var nn = {}, xc;
function Gh() {
  if (xc) return nn;
  xc = 1, Object.defineProperty(nn, "__esModule", { value: !0 });
  const e = ce(), t = {
    keyword: "not",
    schemaType: ["object", "boolean"],
    trackErrors: !0,
    code(f) {
      const { gen: s, schema: l, it: r } = f;
      if ((0, e.alwaysValidSchema)(r, l)) {
        f.fail();
        return;
      }
      const n = s.name("valid");
      f.subschema({
        keyword: "not",
        compositeRule: !0,
        createErrors: !1,
        allErrors: !1
      }, n), f.failResult(n, () => f.reset(), () => f.error());
    },
    error: { message: "must NOT be valid" }
  };
  return nn.default = t, nn;
}
var sn = {}, Gc;
function Kh() {
  if (Gc) return sn;
  Gc = 1, Object.defineProperty(sn, "__esModule", { value: !0 });
  const t = {
    keyword: "anyOf",
    schemaType: "array",
    trackErrors: !0,
    code: je().validateUnion,
    error: { message: "must match a schema in anyOf" }
  };
  return sn.default = t, sn;
}
var on = {}, Kc;
function Bh() {
  if (Kc) return on;
  Kc = 1, Object.defineProperty(on, "__esModule", { value: !0 });
  const e = re(), t = ce(), s = {
    keyword: "oneOf",
    schemaType: "array",
    trackErrors: !0,
    error: {
      message: "must match exactly one schema in oneOf",
      params: ({ params: l }) => (0, e._)`{passingSchemas: ${l.passing}}`
    },
    code(l) {
      const { gen: r, schema: n, parentSchema: c, it: o } = l;
      if (!Array.isArray(n))
        throw new Error("ajv implementation error");
      if (o.opts.discriminator && c.discriminator)
        return;
      const a = n, h = r.let("valid", !1), _ = r.let("passing", null), E = r.name("_valid");
      l.setParams({ passing: _ }), r.block(g), l.result(h, () => l.reset(), () => l.error(!0));
      function g() {
        a.forEach((w, R) => {
          let u;
          (0, t.alwaysValidSchema)(o, w) ? r.var(E, !0) : u = l.subschema({
            keyword: "oneOf",
            schemaProp: R,
            compositeRule: !0
          }, E), R > 0 && r.if((0, e._)`${E} && ${h}`).assign(h, !1).assign(_, (0, e._)`[${_}, ${R}]`).else(), r.if(E, () => {
            r.assign(h, !0), r.assign(_, R), u && l.mergeEvaluated(u, e.Name);
          });
        });
      }
    }
  };
  return on.default = s, on;
}
var an = {}, Bc;
function Hh() {
  if (Bc) return an;
  Bc = 1, Object.defineProperty(an, "__esModule", { value: !0 });
  const e = ce(), t = {
    keyword: "allOf",
    schemaType: "array",
    code(f) {
      const { gen: s, schema: l, it: r } = f;
      if (!Array.isArray(l))
        throw new Error("ajv implementation error");
      const n = s.name("valid");
      l.forEach((c, o) => {
        if ((0, e.alwaysValidSchema)(r, c))
          return;
        const a = f.subschema({ keyword: "allOf", schemaProp: o }, n);
        f.ok(n), f.mergeEvaluated(a);
      });
    }
  };
  return an.default = t, an;
}
var cn = {}, Hc;
function Wh() {
  if (Hc) return cn;
  Hc = 1, Object.defineProperty(cn, "__esModule", { value: !0 });
  const e = re(), t = ce(), s = {
    keyword: "if",
    schemaType: ["object", "boolean"],
    trackErrors: !0,
    error: {
      message: ({ params: r }) => (0, e.str)`must match "${r.ifClause}" schema`,
      params: ({ params: r }) => (0, e._)`{failingKeyword: ${r.ifClause}}`
    },
    code(r) {
      const { gen: n, parentSchema: c, it: o } = r;
      c.then === void 0 && c.else === void 0 && (0, t.checkStrictMode)(o, '"if" without "then" and "else" is ignored');
      const a = l(o, "then"), h = l(o, "else");
      if (!a && !h)
        return;
      const _ = n.let("valid", !0), E = n.name("_valid");
      if (g(), r.reset(), a && h) {
        const R = n.let("ifClause");
        r.setParams({ ifClause: R }), n.if(E, w("then", R), w("else", R));
      } else a ? n.if(E, w("then")) : n.if((0, e.not)(E), w("else"));
      r.pass(_, () => r.error(!0));
      function g() {
        const R = r.subschema({
          keyword: "if",
          compositeRule: !0,
          createErrors: !1,
          allErrors: !1
        }, E);
        r.mergeEvaluated(R);
      }
      function w(R, u) {
        return () => {
          const d = r.subschema({ keyword: R }, E);
          n.assign(_, E), r.mergeValidEvaluated(d, _), u ? n.assign(u, (0, e._)`${R}`) : r.setParams({ ifClause: R });
        };
      }
    }
  };
  function l(r, n) {
    const c = r.schema[n];
    return c !== void 0 && !(0, t.alwaysValidSchema)(r, c);
  }
  return cn.default = s, cn;
}
var un = {}, Wc;
function Xh() {
  if (Wc) return un;
  Wc = 1, Object.defineProperty(un, "__esModule", { value: !0 });
  const e = ce(), t = {
    keyword: ["then", "else"],
    schemaType: ["object", "boolean"],
    code({ keyword: f, parentSchema: s, it: l }) {
      s.if === void 0 && (0, e.checkStrictMode)(l, `"${f}" without "if" is ignored`);
    }
  };
  return un.default = t, un;
}
var Xc;
function Jh() {
  if (Xc) return Xr;
  Xc = 1, Object.defineProperty(Xr, "__esModule", { value: !0 });
  const e = pf(), t = qh(), f = yf(), s = Fh(), l = Mh(), r = Uh(), n = Vh(), c = vf(), o = zh(), a = xh(), h = Gh(), _ = Kh(), E = Bh(), g = Hh(), w = Wh(), R = Xh();
  function u(d = !1) {
    const i = [
      // any
      h.default,
      _.default,
      E.default,
      g.default,
      w.default,
      R.default,
      // object
      n.default,
      c.default,
      r.default,
      o.default,
      a.default
    ];
    return d ? i.push(t.default, s.default) : i.push(e.default, f.default), i.push(l.default), i;
  }
  return Xr.default = u, Xr;
}
var ln = {}, fn = {}, Jc;
function Zh() {
  if (Jc) return fn;
  Jc = 1, Object.defineProperty(fn, "__esModule", { value: !0 });
  const e = re(), f = {
    keyword: "format",
    type: ["number", "string"],
    schemaType: "string",
    $data: !0,
    error: {
      message: ({ schemaCode: s }) => (0, e.str)`must match format "${s}"`,
      params: ({ schemaCode: s }) => (0, e._)`{format: ${s}}`
    },
    code(s, l) {
      const { gen: r, data: n, $data: c, schema: o, schemaCode: a, it: h } = s, { opts: _, errSchemaPath: E, schemaEnv: g, self: w } = h;
      if (!_.validateFormats)
        return;
      c ? R() : u();
      function R() {
        const d = r.scopeValue("formats", {
          ref: w.formats,
          code: _.code.formats
        }), i = r.const("fDef", (0, e._)`${d}[${a}]`), m = r.let("fType"), v = r.let("format");
        r.if((0, e._)`typeof ${i} == "object" && !(${i} instanceof RegExp)`, () => r.assign(m, (0, e._)`${i}.type || "string"`).assign(v, (0, e._)`${i}.validate`), () => r.assign(m, (0, e._)`"string"`).assign(v, i)), s.fail$data((0, e.or)(p(), y()));
        function p() {
          return _.strictSchema === !1 ? e.nil : (0, e._)`${a} && !${v}`;
        }
        function y() {
          const $ = g.$async ? (0, e._)`(${i}.async ? await ${v}(${n}) : ${v}(${n}))` : (0, e._)`${v}(${n})`, b = (0, e._)`(typeof ${v} == "function" ? ${$} : ${v}.test(${n}))`;
          return (0, e._)`${v} && ${v} !== true && ${m} === ${l} && !${b}`;
        }
      }
      function u() {
        const d = w.formats[o];
        if (!d) {
          p();
          return;
        }
        if (d === !0)
          return;
        const [i, m, v] = y(d);
        i === l && s.pass($());
        function p() {
          if (_.strictSchema === !1) {
            w.logger.warn(b());
            return;
          }
          throw new Error(b());
          function b() {
            return `unknown format "${o}" ignored in schema at path "${E}"`;
          }
        }
        function y(b) {
          const I = b instanceof RegExp ? (0, e.regexpCode)(b) : _.code.formats ? (0, e._)`${_.code.formats}${(0, e.getProperty)(o)}` : void 0, L = r.scopeValue("formats", { key: o, ref: b, code: I });
          return typeof b == "object" && !(b instanceof RegExp) ? [b.type || "string", b.validate, (0, e._)`${L}.validate`] : ["string", b, L];
        }
        function $() {
          if (typeof d == "object" && !(d instanceof RegExp) && d.async) {
            if (!g.$async)
              throw new Error("async format in sync schema");
            return (0, e._)`await ${v}(${n})`;
          }
          return typeof m == "function" ? (0, e._)`${v}(${n})` : (0, e._)`${v}.test(${n})`;
        }
      }
    }
  };
  return fn.default = f, fn;
}
var Zc;
function Yh() {
  if (Zc) return ln;
  Zc = 1, Object.defineProperty(ln, "__esModule", { value: !0 });
  const t = [Zh().default];
  return ln.default = t, ln;
}
var it = {}, Yc;
function Qh() {
  return Yc || (Yc = 1, Object.defineProperty(it, "__esModule", { value: !0 }), it.contentVocabulary = it.metadataVocabulary = void 0, it.metadataVocabulary = [
    "title",
    "description",
    "default",
    "deprecated",
    "readOnly",
    "writeOnly",
    "examples"
  ], it.contentVocabulary = [
    "contentMediaType",
    "contentEncoding",
    "contentSchema"
  ]), it;
}
var Qc;
function em() {
  if (Qc) return Ar;
  Qc = 1, Object.defineProperty(Ar, "__esModule", { value: !0 });
  const e = bh(), t = jh(), f = Jh(), s = Yh(), l = Qh(), r = [
    e.default,
    t.default,
    (0, f.default)(),
    s.default,
    l.metadataVocabulary,
    l.contentVocabulary
  ];
  return Ar.default = r, Ar;
}
var dn = {}, _t = {}, eu;
function tm() {
  if (eu) return _t;
  eu = 1, Object.defineProperty(_t, "__esModule", { value: !0 }), _t.DiscrError = void 0;
  var e;
  return function(t) {
    t.Tag = "tag", t.Mapping = "mapping";
  }(e || (_t.DiscrError = e = {})), _t;
}
var tu;
function rm() {
  if (tu) return dn;
  tu = 1, Object.defineProperty(dn, "__esModule", { value: !0 });
  const e = re(), t = tm(), f = Ys(), s = Dn(), l = ce(), n = {
    keyword: "discriminator",
    type: "object",
    schemaType: "object",
    error: {
      message: ({ params: { discrError: c, tagName: o } }) => c === t.DiscrError.Tag ? `tag "${o}" must be string` : `value of tag "${o}" must be in oneOf`,
      params: ({ params: { discrError: c, tag: o, tagName: a } }) => (0, e._)`{error: ${c}, tag: ${a}, tagValue: ${o}}`
    },
    code(c) {
      const { gen: o, data: a, schema: h, parentSchema: _, it: E } = c, { oneOf: g } = _;
      if (!E.opts.discriminator)
        throw new Error("discriminator: requires discriminator option");
      const w = h.propertyName;
      if (typeof w != "string")
        throw new Error("discriminator: requires propertyName");
      if (h.mapping)
        throw new Error("discriminator: mapping is not supported");
      if (!g)
        throw new Error("discriminator: requires oneOf keyword");
      const R = o.let("valid", !1), u = o.const("tag", (0, e._)`${a}${(0, e.getProperty)(w)}`);
      o.if((0, e._)`typeof ${u} == "string"`, () => d(), () => c.error(!1, { discrError: t.DiscrError.Tag, tag: u, tagName: w })), c.ok(R);
      function d() {
        const v = m();
        o.if(!1);
        for (const p in v)
          o.elseIf((0, e._)`${u} === ${p}`), o.assign(R, i(v[p]));
        o.else(), c.error(!1, { discrError: t.DiscrError.Mapping, tag: u, tagName: w }), o.endIf();
      }
      function i(v) {
        const p = o.name("valid"), y = c.subschema({ keyword: "oneOf", schemaProp: v }, p);
        return c.mergeEvaluated(y, e.Name), p;
      }
      function m() {
        var v;
        const p = {}, y = b(_);
        let $ = !0;
        for (let F = 0; F < g.length; F++) {
          let H = g[F];
          if (H?.$ref && !(0, l.schemaHasRulesButRef)(H, E.self.RULES)) {
            const V = H.$ref;
            if (H = f.resolveRef.call(E.self, E.schemaEnv.root, E.baseId, V), H instanceof f.SchemaEnv && (H = H.schema), H === void 0)
              throw new s.default(E.opts.uriResolver, E.baseId, V);
          }
          const U = (v = H?.properties) === null || v === void 0 ? void 0 : v[w];
          if (typeof U != "object")
            throw new Error(`discriminator: oneOf subschemas (or referenced schemas) must have "properties/${w}"`);
          $ = $ && (y || b(H)), I(U, F);
        }
        if (!$)
          throw new Error(`discriminator: "${w}" must be required`);
        return p;
        function b({ required: F }) {
          return Array.isArray(F) && F.includes(w);
        }
        function I(F, H) {
          if (F.const)
            L(F.const, H);
          else if (F.enum)
            for (const U of F.enum)
              L(U, H);
          else
            throw new Error(`discriminator: "properties/${w}" must have "const" or "enum"`);
        }
        function L(F, H) {
          if (typeof F != "string" || F in p)
            throw new Error(`discriminator: "${w}" values must be unique strings`);
          p[F] = H;
        }
      }
    }
  };
  return dn.default = n, dn;
}
const nm = "http://json-schema.org/draft-07/schema#", im = "http://json-schema.org/draft-07/schema#", sm = "Core schema meta-schema", om = { schemaArray: { type: "array", minItems: 1, items: { $ref: "#" } }, nonNegativeInteger: { type: "integer", minimum: 0 }, nonNegativeIntegerDefault0: { allOf: [{ $ref: "#/definitions/nonNegativeInteger" }, { default: 0 }] }, simpleTypes: { enum: ["array", "boolean", "integer", "null", "number", "object", "string"] }, stringArray: { type: "array", items: { type: "string" }, uniqueItems: !0, default: [] } }, am = ["object", "boolean"], cm = { $id: { type: "string", format: "uri-reference" }, $schema: { type: "string", format: "uri" }, $ref: { type: "string", format: "uri-reference" }, $comment: { type: "string" }, title: { type: "string" }, description: { type: "string" }, default: !0, readOnly: { type: "boolean", default: !1 }, examples: { type: "array", items: !0 }, multipleOf: { type: "number", exclusiveMinimum: 0 }, maximum: { type: "number" }, exclusiveMaximum: { type: "number" }, minimum: { type: "number" }, exclusiveMinimum: { type: "number" }, maxLength: { $ref: "#/definitions/nonNegativeInteger" }, minLength: { $ref: "#/definitions/nonNegativeIntegerDefault0" }, pattern: { type: "string", format: "regex" }, additionalItems: { $ref: "#" }, items: { anyOf: [{ $ref: "#" }, { $ref: "#/definitions/schemaArray" }], default: !0 }, maxItems: { $ref: "#/definitions/nonNegativeInteger" }, minItems: { $ref: "#/definitions/nonNegativeIntegerDefault0" }, uniqueItems: { type: "boolean", default: !1 }, contains: { $ref: "#" }, maxProperties: { $ref: "#/definitions/nonNegativeInteger" }, minProperties: { $ref: "#/definitions/nonNegativeIntegerDefault0" }, required: { $ref: "#/definitions/stringArray" }, additionalProperties: { $ref: "#" }, definitions: { type: "object", additionalProperties: { $ref: "#" }, default: {} }, properties: { type: "object", additionalProperties: { $ref: "#" }, default: {} }, patternProperties: { type: "object", additionalProperties: { $ref: "#" }, propertyNames: { format: "regex" }, default: {} }, dependencies: { type: "object", additionalProperties: { anyOf: [{ $ref: "#" }, { $ref: "#/definitions/stringArray" }] } }, propertyNames: { $ref: "#" }, const: !0, enum: { type: "array", items: !0, minItems: 1, uniqueItems: !0 }, type: { anyOf: [{ $ref: "#/definitions/simpleTypes" }, { type: "array", items: { $ref: "#/definitions/simpleTypes" }, minItems: 1, uniqueItems: !0 }] }, format: { type: "string" }, contentMediaType: { type: "string" }, contentEncoding: { type: "string" }, if: { $ref: "#" }, then: { $ref: "#" }, else: { $ref: "#" }, allOf: { $ref: "#/definitions/schemaArray" }, anyOf: { $ref: "#/definitions/schemaArray" }, oneOf: { $ref: "#/definitions/schemaArray" }, not: { $ref: "#" } }, um = {
  $schema: nm,
  $id: im,
  title: sm,
  definitions: om,
  type: am,
  properties: cm,
  default: !0
};
var ru;
function lm() {
  return ru || (ru = 1, function(e, t) {
    Object.defineProperty(t, "__esModule", { value: !0 }), t.MissingRefError = t.ValidationError = t.CodeGen = t.Name = t.nil = t.stringify = t.str = t._ = t.KeywordCxt = t.Ajv = void 0;
    const f = Eh(), s = em(), l = rm(), r = um, n = ["/properties"], c = "http://json-schema.org/draft-07/schema";
    class o extends f.default {
      _addVocabularies() {
        super._addVocabularies(), s.default.forEach((w) => this.addVocabulary(w)), this.opts.discriminator && this.addKeyword(l.default);
      }
      _addDefaultMetaSchema() {
        if (super._addDefaultMetaSchema(), !this.opts.meta)
          return;
        const w = this.opts.$data ? this.$dataMetaSchema(r, n) : r;
        this.addMetaSchema(w, c, !1), this.refs["http://json-schema.org/schema"] = c;
      }
      defaultMeta() {
        return this.opts.defaultMeta = super.defaultMeta() || (this.getSchema(c) ? c : void 0);
      }
    }
    t.Ajv = o, e.exports = t = o, e.exports.Ajv = o, Object.defineProperty(t, "__esModule", { value: !0 }), t.default = o;
    var a = Cn();
    Object.defineProperty(t, "KeywordCxt", { enumerable: !0, get: function() {
      return a.KeywordCxt;
    } });
    var h = re();
    Object.defineProperty(t, "_", { enumerable: !0, get: function() {
      return h._;
    } }), Object.defineProperty(t, "str", { enumerable: !0, get: function() {
      return h.str;
    } }), Object.defineProperty(t, "stringify", { enumerable: !0, get: function() {
      return h.stringify;
    } }), Object.defineProperty(t, "nil", { enumerable: !0, get: function() {
      return h.nil;
    } }), Object.defineProperty(t, "Name", { enumerable: !0, get: function() {
      return h.Name;
    } }), Object.defineProperty(t, "CodeGen", { enumerable: !0, get: function() {
      return h.CodeGen;
    } });
    var _ = Zs();
    Object.defineProperty(t, "ValidationError", { enumerable: !0, get: function() {
      return _.default;
    } });
    var E = Dn();
    Object.defineProperty(t, "MissingRefError", { enumerable: !0, get: function() {
      return E.default;
    } });
  }(Nr, Nr.exports)), Nr.exports;
}
var nu;
function fm() {
  return nu || (nu = 1, function(e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.formatLimitDefinition = void 0;
    const t = lm(), f = re(), s = f.operators, l = {
      formatMaximum: { okStr: "<=", ok: s.LTE, fail: s.GT },
      formatMinimum: { okStr: ">=", ok: s.GTE, fail: s.LT },
      formatExclusiveMaximum: { okStr: "<", ok: s.LT, fail: s.GTE },
      formatExclusiveMinimum: { okStr: ">", ok: s.GT, fail: s.LTE }
    }, r = {
      message: ({ keyword: c, schemaCode: o }) => f.str`should be ${l[c].okStr} ${o}`,
      params: ({ keyword: c, schemaCode: o }) => f._`{comparison: ${l[c].okStr}, limit: ${o}}`
    };
    e.formatLimitDefinition = {
      keyword: Object.keys(l),
      type: "string",
      schemaType: "string",
      $data: !0,
      error: r,
      code(c) {
        const { gen: o, data: a, schemaCode: h, keyword: _, it: E } = c, { opts: g, self: w } = E;
        if (!g.validateFormats)
          return;
        const R = new t.KeywordCxt(E, w.RULES.all.format.definition, "format");
        R.$data ? u() : d();
        function u() {
          const m = o.scopeValue("formats", {
            ref: w.formats,
            code: g.code.formats
          }), v = o.const("fmt", f._`${m}[${R.schemaCode}]`);
          c.fail$data(f.or(f._`typeof ${v} != "object"`, f._`${v} instanceof RegExp`, f._`typeof ${v}.compare != "function"`, i(v)));
        }
        function d() {
          const m = R.schema, v = w.formats[m];
          if (!v || v === !0)
            return;
          if (typeof v != "object" || v instanceof RegExp || typeof v.compare != "function")
            throw new Error(`"${_}": format "${m}" does not define "compare" function`);
          const p = o.scopeValue("formats", {
            key: m,
            ref: v,
            code: g.code.formats ? f._`${g.code.formats}${f.getProperty(m)}` : void 0
          });
          c.fail$data(i(p));
        }
        function i(m) {
          return f._`${m}.compare(${a}, ${h}) ${l[_].fail} 0`;
        }
      },
      dependencies: ["format"]
    };
    const n = (c) => (c.addKeyword(e.formatLimitDefinition), c);
    e.default = n;
  }(ri)), ri;
}
var iu;
function dm() {
  return iu || (iu = 1, function(e, t) {
    Object.defineProperty(t, "__esModule", { value: !0 });
    const f = ah(), s = fm(), l = re(), r = new l.Name("fullFormats"), n = new l.Name("fastFormats"), c = (a, h = { keywords: !0 }) => {
      if (Array.isArray(h))
        return o(a, h, f.fullFormats, r), a;
      const [_, E] = h.mode === "fast" ? [f.fastFormats, n] : [f.fullFormats, r], g = h.formats || f.formatNames;
      return o(a, g, _, E), h.keywords && s.default(a), a;
    };
    c.get = (a, h = "full") => {
      const E = (h === "fast" ? f.fastFormats : f.fullFormats)[a];
      if (!E)
        throw new Error(`Unknown format "${a}"`);
      return E;
    };
    function o(a, h, _, E) {
      var g, w;
      (g = (w = a.opts.code).formats) !== null && g !== void 0 || (w.formats = l._`require("ajv-formats/dist/formats").${E}`);
      for (const R of h)
        a.addFormat(R, _[R]);
    }
    e.exports = t = c, Object.defineProperty(t, "__esModule", { value: !0 }), t.default = c;
  }(Or, Or.exports)), Or.exports;
}
var li, su;
function hm() {
  if (su) return li;
  su = 1;
  const e = (o, a, h, _) => {
    if (h === "length" || h === "prototype" || h === "arguments" || h === "caller")
      return;
    const E = Object.getOwnPropertyDescriptor(o, h), g = Object.getOwnPropertyDescriptor(a, h);
    !t(E, g) && _ || Object.defineProperty(o, h, g);
  }, t = function(o, a) {
    return o === void 0 || o.configurable || o.writable === a.writable && o.enumerable === a.enumerable && o.configurable === a.configurable && (o.writable || o.value === a.value);
  }, f = (o, a) => {
    const h = Object.getPrototypeOf(a);
    h !== Object.getPrototypeOf(o) && Object.setPrototypeOf(o, h);
  }, s = (o, a) => `/* Wrapped ${o}*/
${a}`, l = Object.getOwnPropertyDescriptor(Function.prototype, "toString"), r = Object.getOwnPropertyDescriptor(Function.prototype.toString, "name"), n = (o, a, h) => {
    const _ = h === "" ? "" : `with ${h.trim()}() `, E = s.bind(null, _, a.toString());
    Object.defineProperty(E, "name", r), Object.defineProperty(o, "toString", { ...l, value: E });
  };
  return li = (o, a, { ignoreNonConfigurable: h = !1 } = {}) => {
    const { name: _ } = o;
    for (const E of Reflect.ownKeys(a))
      e(o, a, E, h);
    return f(o, a), n(o, a, _), o;
  }, li;
}
var fi, ou;
function mm() {
  if (ou) return fi;
  ou = 1;
  const e = hm();
  return fi = (t, f = {}) => {
    if (typeof t != "function")
      throw new TypeError(`Expected the first argument to be a function, got \`${typeof t}\``);
    const {
      wait: s = 0,
      before: l = !1,
      after: r = !0
    } = f;
    if (!l && !r)
      throw new Error("Both `before` and `after` are false, function wouldn't be called.");
    let n, c;
    const o = function(...a) {
      const h = this, _ = () => {
        n = void 0, r && (c = t.apply(h, a));
      }, E = l && !n;
      return clearTimeout(n), n = setTimeout(_, s), E && (c = t.apply(h, a)), c;
    };
    return e(o, t), o.cancel = () => {
      n && (clearTimeout(n), n = void 0);
    }, o;
  }, fi;
}
var hn = { exports: {} }, di, au;
function An() {
  if (au) return di;
  au = 1;
  const e = "2.0.0", t = 256, f = Number.MAX_SAFE_INTEGER || /* istanbul ignore next */
  9007199254740991, s = 16, l = t - 6;
  return di = {
    MAX_LENGTH: t,
    MAX_SAFE_COMPONENT_LENGTH: s,
    MAX_SAFE_BUILD_LENGTH: l,
    MAX_SAFE_INTEGER: f,
    RELEASE_TYPES: [
      "major",
      "premajor",
      "minor",
      "preminor",
      "patch",
      "prepatch",
      "prerelease"
    ],
    SEMVER_SPEC_VERSION: e,
    FLAG_INCLUDE_PRERELEASE: 1,
    FLAG_LOOSE: 2
  }, di;
}
var hi, cu;
function Ln() {
  return cu || (cu = 1, hi = typeof process == "object" && process.env && process.env.NODE_DEBUG && /\bsemver\b/i.test(process.env.NODE_DEBUG) ? (...t) => console.error("SEMVER", ...t) : () => {
  }), hi;
}
var uu;
function Pt() {
  return uu || (uu = 1, function(e, t) {
    const {
      MAX_SAFE_COMPONENT_LENGTH: f,
      MAX_SAFE_BUILD_LENGTH: s,
      MAX_LENGTH: l
    } = An(), r = Ln();
    t = e.exports = {};
    const n = t.re = [], c = t.safeRe = [], o = t.src = [], a = t.t = {};
    let h = 0;
    const _ = "[a-zA-Z0-9-]", E = [
      ["\\s", 1],
      ["\\d", l],
      [_, s]
    ], g = (R) => {
      for (const [u, d] of E)
        R = R.split(`${u}*`).join(`${u}{0,${d}}`).split(`${u}+`).join(`${u}{1,${d}}`);
      return R;
    }, w = (R, u, d) => {
      const i = g(u), m = h++;
      r(R, m, u), a[R] = m, o[m] = u, n[m] = new RegExp(u, d ? "g" : void 0), c[m] = new RegExp(i, d ? "g" : void 0);
    };
    w("NUMERICIDENTIFIER", "0|[1-9]\\d*"), w("NUMERICIDENTIFIERLOOSE", "\\d+"), w("NONNUMERICIDENTIFIER", `\\d*[a-zA-Z-]${_}*`), w("MAINVERSION", `(${o[a.NUMERICIDENTIFIER]})\\.(${o[a.NUMERICIDENTIFIER]})\\.(${o[a.NUMERICIDENTIFIER]})`), w("MAINVERSIONLOOSE", `(${o[a.NUMERICIDENTIFIERLOOSE]})\\.(${o[a.NUMERICIDENTIFIERLOOSE]})\\.(${o[a.NUMERICIDENTIFIERLOOSE]})`), w("PRERELEASEIDENTIFIER", `(?:${o[a.NUMERICIDENTIFIER]}|${o[a.NONNUMERICIDENTIFIER]})`), w("PRERELEASEIDENTIFIERLOOSE", `(?:${o[a.NUMERICIDENTIFIERLOOSE]}|${o[a.NONNUMERICIDENTIFIER]})`), w("PRERELEASE", `(?:-(${o[a.PRERELEASEIDENTIFIER]}(?:\\.${o[a.PRERELEASEIDENTIFIER]})*))`), w("PRERELEASELOOSE", `(?:-?(${o[a.PRERELEASEIDENTIFIERLOOSE]}(?:\\.${o[a.PRERELEASEIDENTIFIERLOOSE]})*))`), w("BUILDIDENTIFIER", `${_}+`), w("BUILD", `(?:\\+(${o[a.BUILDIDENTIFIER]}(?:\\.${o[a.BUILDIDENTIFIER]})*))`), w("FULLPLAIN", `v?${o[a.MAINVERSION]}${o[a.PRERELEASE]}?${o[a.BUILD]}?`), w("FULL", `^${o[a.FULLPLAIN]}$`), w("LOOSEPLAIN", `[v=\\s]*${o[a.MAINVERSIONLOOSE]}${o[a.PRERELEASELOOSE]}?${o[a.BUILD]}?`), w("LOOSE", `^${o[a.LOOSEPLAIN]}$`), w("GTLT", "((?:<|>)?=?)"), w("XRANGEIDENTIFIERLOOSE", `${o[a.NUMERICIDENTIFIERLOOSE]}|x|X|\\*`), w("XRANGEIDENTIFIER", `${o[a.NUMERICIDENTIFIER]}|x|X|\\*`), w("XRANGEPLAIN", `[v=\\s]*(${o[a.XRANGEIDENTIFIER]})(?:\\.(${o[a.XRANGEIDENTIFIER]})(?:\\.(${o[a.XRANGEIDENTIFIER]})(?:${o[a.PRERELEASE]})?${o[a.BUILD]}?)?)?`), w("XRANGEPLAINLOOSE", `[v=\\s]*(${o[a.XRANGEIDENTIFIERLOOSE]})(?:\\.(${o[a.XRANGEIDENTIFIERLOOSE]})(?:\\.(${o[a.XRANGEIDENTIFIERLOOSE]})(?:${o[a.PRERELEASELOOSE]})?${o[a.BUILD]}?)?)?`), w("XRANGE", `^${o[a.GTLT]}\\s*${o[a.XRANGEPLAIN]}$`), w("XRANGELOOSE", `^${o[a.GTLT]}\\s*${o[a.XRANGEPLAINLOOSE]}$`), w("COERCEPLAIN", `(^|[^\\d])(\\d{1,${f}})(?:\\.(\\d{1,${f}}))?(?:\\.(\\d{1,${f}}))?`), w("COERCE", `${o[a.COERCEPLAIN]}(?:$|[^\\d])`), w("COERCEFULL", o[a.COERCEPLAIN] + `(?:${o[a.PRERELEASE]})?(?:${o[a.BUILD]})?(?:$|[^\\d])`), w("COERCERTL", o[a.COERCE], !0), w("COERCERTLFULL", o[a.COERCEFULL], !0), w("LONETILDE", "(?:~>?)"), w("TILDETRIM", `(\\s*)${o[a.LONETILDE]}\\s+`, !0), t.tildeTrimReplace = "$1~", w("TILDE", `^${o[a.LONETILDE]}${o[a.XRANGEPLAIN]}$`), w("TILDELOOSE", `^${o[a.LONETILDE]}${o[a.XRANGEPLAINLOOSE]}$`), w("LONECARET", "(?:\\^)"), w("CARETTRIM", `(\\s*)${o[a.LONECARET]}\\s+`, !0), t.caretTrimReplace = "$1^", w("CARET", `^${o[a.LONECARET]}${o[a.XRANGEPLAIN]}$`), w("CARETLOOSE", `^${o[a.LONECARET]}${o[a.XRANGEPLAINLOOSE]}$`), w("COMPARATORLOOSE", `^${o[a.GTLT]}\\s*(${o[a.LOOSEPLAIN]})$|^$`), w("COMPARATOR", `^${o[a.GTLT]}\\s*(${o[a.FULLPLAIN]})$|^$`), w("COMPARATORTRIM", `(\\s*)${o[a.GTLT]}\\s*(${o[a.LOOSEPLAIN]}|${o[a.XRANGEPLAIN]})`, !0), t.comparatorTrimReplace = "$1$2$3", w("HYPHENRANGE", `^\\s*(${o[a.XRANGEPLAIN]})\\s+-\\s+(${o[a.XRANGEPLAIN]})\\s*$`), w("HYPHENRANGELOOSE", `^\\s*(${o[a.XRANGEPLAINLOOSE]})\\s+-\\s+(${o[a.XRANGEPLAINLOOSE]})\\s*$`), w("STAR", "(<|>)?=?\\s*\\*"), w("GTE0", "^\\s*>=\\s*0\\.0\\.0\\s*$"), w("GTE0PRE", "^\\s*>=\\s*0\\.0\\.0-0\\s*$");
  }(hn, hn.exports)), hn.exports;
}
var mi, lu;
function eo() {
  if (lu) return mi;
  lu = 1;
  const e = Object.freeze({ loose: !0 }), t = Object.freeze({});
  return mi = (s) => s ? typeof s != "object" ? e : s : t, mi;
}
var pi, fu;
function gf() {
  if (fu) return pi;
  fu = 1;
  const e = /^[0-9]+$/, t = (s, l) => {
    const r = e.test(s), n = e.test(l);
    return r && n && (s = +s, l = +l), s === l ? 0 : r && !n ? -1 : n && !r ? 1 : s < l ? -1 : 1;
  };
  return pi = {
    compareIdentifiers: t,
    rcompareIdentifiers: (s, l) => t(l, s)
  }, pi;
}
var yi, du;
function Oe() {
  if (du) return yi;
  du = 1;
  const e = Ln(), { MAX_LENGTH: t, MAX_SAFE_INTEGER: f } = An(), { safeRe: s, t: l } = Pt(), r = eo(), { compareIdentifiers: n } = gf();
  class c {
    constructor(a, h) {
      if (h = r(h), a instanceof c) {
        if (a.loose === !!h.loose && a.includePrerelease === !!h.includePrerelease)
          return a;
        a = a.version;
      } else if (typeof a != "string")
        throw new TypeError(`Invalid version. Must be a string. Got type "${typeof a}".`);
      if (a.length > t)
        throw new TypeError(
          `version is longer than ${t} characters`
        );
      e("SemVer", a, h), this.options = h, this.loose = !!h.loose, this.includePrerelease = !!h.includePrerelease;
      const _ = a.trim().match(h.loose ? s[l.LOOSE] : s[l.FULL]);
      if (!_)
        throw new TypeError(`Invalid Version: ${a}`);
      if (this.raw = a, this.major = +_[1], this.minor = +_[2], this.patch = +_[3], this.major > f || this.major < 0)
        throw new TypeError("Invalid major version");
      if (this.minor > f || this.minor < 0)
        throw new TypeError("Invalid minor version");
      if (this.patch > f || this.patch < 0)
        throw new TypeError("Invalid patch version");
      _[4] ? this.prerelease = _[4].split(".").map((E) => {
        if (/^[0-9]+$/.test(E)) {
          const g = +E;
          if (g >= 0 && g < f)
            return g;
        }
        return E;
      }) : this.prerelease = [], this.build = _[5] ? _[5].split(".") : [], this.format();
    }
    format() {
      return this.version = `${this.major}.${this.minor}.${this.patch}`, this.prerelease.length && (this.version += `-${this.prerelease.join(".")}`), this.version;
    }
    toString() {
      return this.version;
    }
    compare(a) {
      if (e("SemVer.compare", this.version, this.options, a), !(a instanceof c)) {
        if (typeof a == "string" && a === this.version)
          return 0;
        a = new c(a, this.options);
      }
      return a.version === this.version ? 0 : this.compareMain(a) || this.comparePre(a);
    }
    compareMain(a) {
      return a instanceof c || (a = new c(a, this.options)), n(this.major, a.major) || n(this.minor, a.minor) || n(this.patch, a.patch);
    }
    comparePre(a) {
      if (a instanceof c || (a = new c(a, this.options)), this.prerelease.length && !a.prerelease.length)
        return -1;
      if (!this.prerelease.length && a.prerelease.length)
        return 1;
      if (!this.prerelease.length && !a.prerelease.length)
        return 0;
      let h = 0;
      do {
        const _ = this.prerelease[h], E = a.prerelease[h];
        if (e("prerelease compare", h, _, E), _ === void 0 && E === void 0)
          return 0;
        if (E === void 0)
          return 1;
        if (_ === void 0)
          return -1;
        if (_ === E)
          continue;
        return n(_, E);
      } while (++h);
    }
    compareBuild(a) {
      a instanceof c || (a = new c(a, this.options));
      let h = 0;
      do {
        const _ = this.build[h], E = a.build[h];
        if (e("build compare", h, _, E), _ === void 0 && E === void 0)
          return 0;
        if (E === void 0)
          return 1;
        if (_ === void 0)
          return -1;
        if (_ === E)
          continue;
        return n(_, E);
      } while (++h);
    }
    // preminor will bump the version up to the next minor release, and immediately
    // down to pre-release. premajor and prepatch work the same way.
    inc(a, h, _) {
      switch (a) {
        case "premajor":
          this.prerelease.length = 0, this.patch = 0, this.minor = 0, this.major++, this.inc("pre", h, _);
          break;
        case "preminor":
          this.prerelease.length = 0, this.patch = 0, this.minor++, this.inc("pre", h, _);
          break;
        case "prepatch":
          this.prerelease.length = 0, this.inc("patch", h, _), this.inc("pre", h, _);
          break;
        // If the input is a non-prerelease version, this acts the same as
        // prepatch.
        case "prerelease":
          this.prerelease.length === 0 && this.inc("patch", h, _), this.inc("pre", h, _);
          break;
        case "major":
          (this.minor !== 0 || this.patch !== 0 || this.prerelease.length === 0) && this.major++, this.minor = 0, this.patch = 0, this.prerelease = [];
          break;
        case "minor":
          (this.patch !== 0 || this.prerelease.length === 0) && this.minor++, this.patch = 0, this.prerelease = [];
          break;
        case "patch":
          this.prerelease.length === 0 && this.patch++, this.prerelease = [];
          break;
        // This probably shouldn't be used publicly.
        // 1.0.0 'pre' would become 1.0.0-0 which is the wrong direction.
        case "pre": {
          const E = Number(_) ? 1 : 0;
          if (!h && _ === !1)
            throw new Error("invalid increment argument: identifier is empty");
          if (this.prerelease.length === 0)
            this.prerelease = [E];
          else {
            let g = this.prerelease.length;
            for (; --g >= 0; )
              typeof this.prerelease[g] == "number" && (this.prerelease[g]++, g = -2);
            if (g === -1) {
              if (h === this.prerelease.join(".") && _ === !1)
                throw new Error("invalid increment argument: identifier already exists");
              this.prerelease.push(E);
            }
          }
          if (h) {
            let g = [h, E];
            _ === !1 && (g = [h]), n(this.prerelease[0], h) === 0 ? isNaN(this.prerelease[1]) && (this.prerelease = g) : this.prerelease = g;
          }
          break;
        }
        default:
          throw new Error(`invalid increment argument: ${a}`);
      }
      return this.raw = this.format(), this.build.length && (this.raw += `+${this.build.join(".")}`), this;
    }
  }
  return yi = c, yi;
}
var vi, hu;
function dt() {
  if (hu) return vi;
  hu = 1;
  const e = Oe();
  return vi = (f, s, l = !1) => {
    if (f instanceof e)
      return f;
    try {
      return new e(f, s);
    } catch (r) {
      if (!l)
        return null;
      throw r;
    }
  }, vi;
}
var gi, mu;
function pm() {
  if (mu) return gi;
  mu = 1;
  const e = dt();
  return gi = (f, s) => {
    const l = e(f, s);
    return l ? l.version : null;
  }, gi;
}
var _i, pu;
function ym() {
  if (pu) return _i;
  pu = 1;
  const e = dt();
  return _i = (f, s) => {
    const l = e(f.trim().replace(/^[=v]+/, ""), s);
    return l ? l.version : null;
  }, _i;
}
var $i, yu;
function vm() {
  if (yu) return $i;
  yu = 1;
  const e = Oe();
  return $i = (f, s, l, r, n) => {
    typeof l == "string" && (n = r, r = l, l = void 0);
    try {
      return new e(
        f instanceof e ? f.version : f,
        l
      ).inc(s, r, n).version;
    } catch {
      return null;
    }
  }, $i;
}
var Ei, vu;
function gm() {
  if (vu) return Ei;
  vu = 1;
  const e = dt();
  return Ei = (f, s) => {
    const l = e(f, null, !0), r = e(s, null, !0), n = l.compare(r);
    if (n === 0)
      return null;
    const c = n > 0, o = c ? l : r, a = c ? r : l, h = !!o.prerelease.length;
    if (!!a.prerelease.length && !h)
      return !a.patch && !a.minor ? "major" : o.patch ? "patch" : o.minor ? "minor" : "major";
    const E = h ? "pre" : "";
    return l.major !== r.major ? E + "major" : l.minor !== r.minor ? E + "minor" : l.patch !== r.patch ? E + "patch" : "prerelease";
  }, Ei;
}
var wi, gu;
function _m() {
  if (gu) return wi;
  gu = 1;
  const e = Oe();
  return wi = (f, s) => new e(f, s).major, wi;
}
var Si, _u;
function $m() {
  if (_u) return Si;
  _u = 1;
  const e = Oe();
  return Si = (f, s) => new e(f, s).minor, Si;
}
var bi, $u;
function Em() {
  if ($u) return bi;
  $u = 1;
  const e = Oe();
  return bi = (f, s) => new e(f, s).patch, bi;
}
var Ri, Eu;
function wm() {
  if (Eu) return Ri;
  Eu = 1;
  const e = dt();
  return Ri = (f, s) => {
    const l = e(f, s);
    return l && l.prerelease.length ? l.prerelease : null;
  }, Ri;
}
var Pi, wu;
function qe() {
  if (wu) return Pi;
  wu = 1;
  const e = Oe();
  return Pi = (f, s, l) => new e(f, l).compare(new e(s, l)), Pi;
}
var Oi, Su;
function Sm() {
  if (Su) return Oi;
  Su = 1;
  const e = qe();
  return Oi = (f, s, l) => e(s, f, l), Oi;
}
var Ni, bu;
function bm() {
  if (bu) return Ni;
  bu = 1;
  const e = qe();
  return Ni = (f, s) => e(f, s, !0), Ni;
}
var Ii, Ru;
function to() {
  if (Ru) return Ii;
  Ru = 1;
  const e = Oe();
  return Ii = (f, s, l) => {
    const r = new e(f, l), n = new e(s, l);
    return r.compare(n) || r.compareBuild(n);
  }, Ii;
}
var Ti, Pu;
function Rm() {
  if (Pu) return Ti;
  Pu = 1;
  const e = to();
  return Ti = (f, s) => f.sort((l, r) => e(l, r, s)), Ti;
}
var Ci, Ou;
function Pm() {
  if (Ou) return Ci;
  Ou = 1;
  const e = to();
  return Ci = (f, s) => f.sort((l, r) => e(r, l, s)), Ci;
}
var Di, Nu;
function kn() {
  if (Nu) return Di;
  Nu = 1;
  const e = qe();
  return Di = (f, s, l) => e(f, s, l) > 0, Di;
}
var Ai, Iu;
function ro() {
  if (Iu) return Ai;
  Iu = 1;
  const e = qe();
  return Ai = (f, s, l) => e(f, s, l) < 0, Ai;
}
var Li, Tu;
function _f() {
  if (Tu) return Li;
  Tu = 1;
  const e = qe();
  return Li = (f, s, l) => e(f, s, l) === 0, Li;
}
var ki, Cu;
function $f() {
  if (Cu) return ki;
  Cu = 1;
  const e = qe();
  return ki = (f, s, l) => e(f, s, l) !== 0, ki;
}
var ji, Du;
function no() {
  if (Du) return ji;
  Du = 1;
  const e = qe();
  return ji = (f, s, l) => e(f, s, l) >= 0, ji;
}
var qi, Au;
function io() {
  if (Au) return qi;
  Au = 1;
  const e = qe();
  return qi = (f, s, l) => e(f, s, l) <= 0, qi;
}
var Fi, Lu;
function Ef() {
  if (Lu) return Fi;
  Lu = 1;
  const e = _f(), t = $f(), f = kn(), s = no(), l = ro(), r = io();
  return Fi = (c, o, a, h) => {
    switch (o) {
      case "===":
        return typeof c == "object" && (c = c.version), typeof a == "object" && (a = a.version), c === a;
      case "!==":
        return typeof c == "object" && (c = c.version), typeof a == "object" && (a = a.version), c !== a;
      case "":
      case "=":
      case "==":
        return e(c, a, h);
      case "!=":
        return t(c, a, h);
      case ">":
        return f(c, a, h);
      case ">=":
        return s(c, a, h);
      case "<":
        return l(c, a, h);
      case "<=":
        return r(c, a, h);
      default:
        throw new TypeError(`Invalid operator: ${o}`);
    }
  }, Fi;
}
var Mi, ku;
function Om() {
  if (ku) return Mi;
  ku = 1;
  const e = Oe(), t = dt(), { safeRe: f, t: s } = Pt();
  return Mi = (r, n) => {
    if (r instanceof e)
      return r;
    if (typeof r == "number" && (r = String(r)), typeof r != "string")
      return null;
    n = n || {};
    let c = null;
    if (!n.rtl)
      c = r.match(n.includePrerelease ? f[s.COERCEFULL] : f[s.COERCE]);
    else {
      const g = n.includePrerelease ? f[s.COERCERTLFULL] : f[s.COERCERTL];
      let w;
      for (; (w = g.exec(r)) && (!c || c.index + c[0].length !== r.length); )
        (!c || w.index + w[0].length !== c.index + c[0].length) && (c = w), g.lastIndex = w.index + w[1].length + w[2].length;
      g.lastIndex = -1;
    }
    if (c === null)
      return null;
    const o = c[2], a = c[3] || "0", h = c[4] || "0", _ = n.includePrerelease && c[5] ? `-${c[5]}` : "", E = n.includePrerelease && c[6] ? `+${c[6]}` : "";
    return t(`${o}.${a}.${h}${_}${E}`, n);
  }, Mi;
}
var Ui, ju;
function Nm() {
  if (ju) return Ui;
  ju = 1;
  class e {
    constructor() {
      this.max = 1e3, this.map = /* @__PURE__ */ new Map();
    }
    get(f) {
      const s = this.map.get(f);
      if (s !== void 0)
        return this.map.delete(f), this.map.set(f, s), s;
    }
    delete(f) {
      return this.map.delete(f);
    }
    set(f, s) {
      if (!this.delete(f) && s !== void 0) {
        if (this.map.size >= this.max) {
          const r = this.map.keys().next().value;
          this.delete(r);
        }
        this.map.set(f, s);
      }
      return this;
    }
  }
  return Ui = e, Ui;
}
var Vi, qu;
function Fe() {
  if (qu) return Vi;
  qu = 1;
  const e = /\s+/g;
  class t {
    constructor(K, J) {
      if (J = l(J), K instanceof t)
        return K.loose === !!J.loose && K.includePrerelease === !!J.includePrerelease ? K : new t(K.raw, J);
      if (K instanceof r)
        return this.raw = K.value, this.set = [[K]], this.formatted = void 0, this;
      if (this.options = J, this.loose = !!J.loose, this.includePrerelease = !!J.includePrerelease, this.raw = K.trim().replace(e, " "), this.set = this.raw.split("||").map((W) => this.parseRange(W.trim())).filter((W) => W.length), !this.set.length)
        throw new TypeError(`Invalid SemVer Range: ${this.raw}`);
      if (this.set.length > 1) {
        const W = this.set[0];
        if (this.set = this.set.filter((M) => !R(M[0])), this.set.length === 0)
          this.set = [W];
        else if (this.set.length > 1) {
          for (const M of this.set)
            if (M.length === 1 && u(M[0])) {
              this.set = [M];
              break;
            }
        }
      }
      this.formatted = void 0;
    }
    get range() {
      if (this.formatted === void 0) {
        this.formatted = "";
        for (let K = 0; K < this.set.length; K++) {
          K > 0 && (this.formatted += "||");
          const J = this.set[K];
          for (let W = 0; W < J.length; W++)
            W > 0 && (this.formatted += " "), this.formatted += J[W].toString().trim();
        }
      }
      return this.formatted;
    }
    format() {
      return this.range;
    }
    toString() {
      return this.range;
    }
    parseRange(K) {
      const W = ((this.options.includePrerelease && g) | (this.options.loose && w)) + ":" + K, M = s.get(W);
      if (M)
        return M;
      const G = this.options.loose, A = G ? o[a.HYPHENRANGELOOSE] : o[a.HYPHENRANGE];
      K = K.replace(A, H(this.options.includePrerelease)), n("hyphen replace", K), K = K.replace(o[a.COMPARATORTRIM], h), n("comparator trim", K), K = K.replace(o[a.TILDETRIM], _), n("tilde trim", K), K = K.replace(o[a.CARETTRIM], E), n("caret trim", K);
      let T = K.split(" ").map((P) => i(P, this.options)).join(" ").split(/\s+/).map((P) => F(P, this.options));
      G && (T = T.filter((P) => (n("loose invalid filter", P, this.options), !!P.match(o[a.COMPARATORLOOSE])))), n("range list", T);
      const q = /* @__PURE__ */ new Map(), C = T.map((P) => new r(P, this.options));
      for (const P of C) {
        if (R(P))
          return [P];
        q.set(P.value, P);
      }
      q.size > 1 && q.has("") && q.delete("");
      const S = [...q.values()];
      return s.set(W, S), S;
    }
    intersects(K, J) {
      if (!(K instanceof t))
        throw new TypeError("a Range is required");
      return this.set.some((W) => d(W, J) && K.set.some((M) => d(M, J) && W.every((G) => M.every((A) => G.intersects(A, J)))));
    }
    // if ANY of the sets match ALL of its comparators, then pass
    test(K) {
      if (!K)
        return !1;
      if (typeof K == "string")
        try {
          K = new c(K, this.options);
        } catch {
          return !1;
        }
      for (let J = 0; J < this.set.length; J++)
        if (U(this.set[J], K, this.options))
          return !0;
      return !1;
    }
  }
  Vi = t;
  const f = Nm(), s = new f(), l = eo(), r = jn(), n = Ln(), c = Oe(), {
    safeRe: o,
    t: a,
    comparatorTrimReplace: h,
    tildeTrimReplace: _,
    caretTrimReplace: E
  } = Pt(), { FLAG_INCLUDE_PRERELEASE: g, FLAG_LOOSE: w } = An(), R = (V) => V.value === "<0.0.0-0", u = (V) => V.value === "", d = (V, K) => {
    let J = !0;
    const W = V.slice();
    let M = W.pop();
    for (; J && W.length; )
      J = W.every((G) => M.intersects(G, K)), M = W.pop();
    return J;
  }, i = (V, K) => (n("comp", V, K), V = y(V, K), n("caret", V), V = v(V, K), n("tildes", V), V = b(V, K), n("xrange", V), V = L(V, K), n("stars", V), V), m = (V) => !V || V.toLowerCase() === "x" || V === "*", v = (V, K) => V.trim().split(/\s+/).map((J) => p(J, K)).join(" "), p = (V, K) => {
    const J = K.loose ? o[a.TILDELOOSE] : o[a.TILDE];
    return V.replace(J, (W, M, G, A, T) => {
      n("tilde", V, W, M, G, A, T);
      let q;
      return m(M) ? q = "" : m(G) ? q = `>=${M}.0.0 <${+M + 1}.0.0-0` : m(A) ? q = `>=${M}.${G}.0 <${M}.${+G + 1}.0-0` : T ? (n("replaceTilde pr", T), q = `>=${M}.${G}.${A}-${T} <${M}.${+G + 1}.0-0`) : q = `>=${M}.${G}.${A} <${M}.${+G + 1}.0-0`, n("tilde return", q), q;
    });
  }, y = (V, K) => V.trim().split(/\s+/).map((J) => $(J, K)).join(" "), $ = (V, K) => {
    n("caret", V, K);
    const J = K.loose ? o[a.CARETLOOSE] : o[a.CARET], W = K.includePrerelease ? "-0" : "";
    return V.replace(J, (M, G, A, T, q) => {
      n("caret", V, M, G, A, T, q);
      let C;
      return m(G) ? C = "" : m(A) ? C = `>=${G}.0.0${W} <${+G + 1}.0.0-0` : m(T) ? G === "0" ? C = `>=${G}.${A}.0${W} <${G}.${+A + 1}.0-0` : C = `>=${G}.${A}.0${W} <${+G + 1}.0.0-0` : q ? (n("replaceCaret pr", q), G === "0" ? A === "0" ? C = `>=${G}.${A}.${T}-${q} <${G}.${A}.${+T + 1}-0` : C = `>=${G}.${A}.${T}-${q} <${G}.${+A + 1}.0-0` : C = `>=${G}.${A}.${T}-${q} <${+G + 1}.0.0-0`) : (n("no pr"), G === "0" ? A === "0" ? C = `>=${G}.${A}.${T}${W} <${G}.${A}.${+T + 1}-0` : C = `>=${G}.${A}.${T}${W} <${G}.${+A + 1}.0-0` : C = `>=${G}.${A}.${T} <${+G + 1}.0.0-0`), n("caret return", C), C;
    });
  }, b = (V, K) => (n("replaceXRanges", V, K), V.split(/\s+/).map((J) => I(J, K)).join(" ")), I = (V, K) => {
    V = V.trim();
    const J = K.loose ? o[a.XRANGELOOSE] : o[a.XRANGE];
    return V.replace(J, (W, M, G, A, T, q) => {
      n("xRange", V, W, M, G, A, T, q);
      const C = m(G), S = C || m(A), P = S || m(T), O = P;
      return M === "=" && O && (M = ""), q = K.includePrerelease ? "-0" : "", C ? M === ">" || M === "<" ? W = "<0.0.0-0" : W = "*" : M && O ? (S && (A = 0), T = 0, M === ">" ? (M = ">=", S ? (G = +G + 1, A = 0, T = 0) : (A = +A + 1, T = 0)) : M === "<=" && (M = "<", S ? G = +G + 1 : A = +A + 1), M === "<" && (q = "-0"), W = `${M + G}.${A}.${T}${q}`) : S ? W = `>=${G}.0.0${q} <${+G + 1}.0.0-0` : P && (W = `>=${G}.${A}.0${q} <${G}.${+A + 1}.0-0`), n("xRange return", W), W;
    });
  }, L = (V, K) => (n("replaceStars", V, K), V.trim().replace(o[a.STAR], "")), F = (V, K) => (n("replaceGTE0", V, K), V.trim().replace(o[K.includePrerelease ? a.GTE0PRE : a.GTE0], "")), H = (V) => (K, J, W, M, G, A, T, q, C, S, P, O) => (m(W) ? J = "" : m(M) ? J = `>=${W}.0.0${V ? "-0" : ""}` : m(G) ? J = `>=${W}.${M}.0${V ? "-0" : ""}` : A ? J = `>=${J}` : J = `>=${J}${V ? "-0" : ""}`, m(C) ? q = "" : m(S) ? q = `<${+C + 1}.0.0-0` : m(P) ? q = `<${C}.${+S + 1}.0-0` : O ? q = `<=${C}.${S}.${P}-${O}` : V ? q = `<${C}.${S}.${+P + 1}-0` : q = `<=${q}`, `${J} ${q}`.trim()), U = (V, K, J) => {
    for (let W = 0; W < V.length; W++)
      if (!V[W].test(K))
        return !1;
    if (K.prerelease.length && !J.includePrerelease) {
      for (let W = 0; W < V.length; W++)
        if (n(V[W].semver), V[W].semver !== r.ANY && V[W].semver.prerelease.length > 0) {
          const M = V[W].semver;
          if (M.major === K.major && M.minor === K.minor && M.patch === K.patch)
            return !0;
        }
      return !1;
    }
    return !0;
  };
  return Vi;
}
var zi, Fu;
function jn() {
  if (Fu) return zi;
  Fu = 1;
  const e = Symbol("SemVer ANY");
  class t {
    static get ANY() {
      return e;
    }
    constructor(h, _) {
      if (_ = f(_), h instanceof t) {
        if (h.loose === !!_.loose)
          return h;
        h = h.value;
      }
      h = h.trim().split(/\s+/).join(" "), n("comparator", h, _), this.options = _, this.loose = !!_.loose, this.parse(h), this.semver === e ? this.value = "" : this.value = this.operator + this.semver.version, n("comp", this);
    }
    parse(h) {
      const _ = this.options.loose ? s[l.COMPARATORLOOSE] : s[l.COMPARATOR], E = h.match(_);
      if (!E)
        throw new TypeError(`Invalid comparator: ${h}`);
      this.operator = E[1] !== void 0 ? E[1] : "", this.operator === "=" && (this.operator = ""), E[2] ? this.semver = new c(E[2], this.options.loose) : this.semver = e;
    }
    toString() {
      return this.value;
    }
    test(h) {
      if (n("Comparator.test", h, this.options.loose), this.semver === e || h === e)
        return !0;
      if (typeof h == "string")
        try {
          h = new c(h, this.options);
        } catch {
          return !1;
        }
      return r(h, this.operator, this.semver, this.options);
    }
    intersects(h, _) {
      if (!(h instanceof t))
        throw new TypeError("a Comparator is required");
      return this.operator === "" ? this.value === "" ? !0 : new o(h.value, _).test(this.value) : h.operator === "" ? h.value === "" ? !0 : new o(this.value, _).test(h.semver) : (_ = f(_), _.includePrerelease && (this.value === "<0.0.0-0" || h.value === "<0.0.0-0") || !_.includePrerelease && (this.value.startsWith("<0.0.0") || h.value.startsWith("<0.0.0")) ? !1 : !!(this.operator.startsWith(">") && h.operator.startsWith(">") || this.operator.startsWith("<") && h.operator.startsWith("<") || this.semver.version === h.semver.version && this.operator.includes("=") && h.operator.includes("=") || r(this.semver, "<", h.semver, _) && this.operator.startsWith(">") && h.operator.startsWith("<") || r(this.semver, ">", h.semver, _) && this.operator.startsWith("<") && h.operator.startsWith(">")));
    }
  }
  zi = t;
  const f = eo(), { safeRe: s, t: l } = Pt(), r = Ef(), n = Ln(), c = Oe(), o = Fe();
  return zi;
}
var xi, Mu;
function qn() {
  if (Mu) return xi;
  Mu = 1;
  const e = Fe();
  return xi = (f, s, l) => {
    try {
      s = new e(s, l);
    } catch {
      return !1;
    }
    return s.test(f);
  }, xi;
}
var Gi, Uu;
function Im() {
  if (Uu) return Gi;
  Uu = 1;
  const e = Fe();
  return Gi = (f, s) => new e(f, s).set.map((l) => l.map((r) => r.value).join(" ").trim().split(" ")), Gi;
}
var Ki, Vu;
function Tm() {
  if (Vu) return Ki;
  Vu = 1;
  const e = Oe(), t = Fe();
  return Ki = (s, l, r) => {
    let n = null, c = null, o = null;
    try {
      o = new t(l, r);
    } catch {
      return null;
    }
    return s.forEach((a) => {
      o.test(a) && (!n || c.compare(a) === -1) && (n = a, c = new e(n, r));
    }), n;
  }, Ki;
}
var Bi, zu;
function Cm() {
  if (zu) return Bi;
  zu = 1;
  const e = Oe(), t = Fe();
  return Bi = (s, l, r) => {
    let n = null, c = null, o = null;
    try {
      o = new t(l, r);
    } catch {
      return null;
    }
    return s.forEach((a) => {
      o.test(a) && (!n || c.compare(a) === 1) && (n = a, c = new e(n, r));
    }), n;
  }, Bi;
}
var Hi, xu;
function Dm() {
  if (xu) return Hi;
  xu = 1;
  const e = Oe(), t = Fe(), f = kn();
  return Hi = (l, r) => {
    l = new t(l, r);
    let n = new e("0.0.0");
    if (l.test(n) || (n = new e("0.0.0-0"), l.test(n)))
      return n;
    n = null;
    for (let c = 0; c < l.set.length; ++c) {
      const o = l.set[c];
      let a = null;
      o.forEach((h) => {
        const _ = new e(h.semver.version);
        switch (h.operator) {
          case ">":
            _.prerelease.length === 0 ? _.patch++ : _.prerelease.push(0), _.raw = _.format();
          /* fallthrough */
          case "":
          case ">=":
            (!a || f(_, a)) && (a = _);
            break;
          case "<":
          case "<=":
            break;
          /* istanbul ignore next */
          default:
            throw new Error(`Unexpected operation: ${h.operator}`);
        }
      }), a && (!n || f(n, a)) && (n = a);
    }
    return n && l.test(n) ? n : null;
  }, Hi;
}
var Wi, Gu;
function Am() {
  if (Gu) return Wi;
  Gu = 1;
  const e = Fe();
  return Wi = (f, s) => {
    try {
      return new e(f, s).range || "*";
    } catch {
      return null;
    }
  }, Wi;
}
var Xi, Ku;
function so() {
  if (Ku) return Xi;
  Ku = 1;
  const e = Oe(), t = jn(), { ANY: f } = t, s = Fe(), l = qn(), r = kn(), n = ro(), c = io(), o = no();
  return Xi = (h, _, E, g) => {
    h = new e(h, g), _ = new s(_, g);
    let w, R, u, d, i;
    switch (E) {
      case ">":
        w = r, R = c, u = n, d = ">", i = ">=";
        break;
      case "<":
        w = n, R = o, u = r, d = "<", i = "<=";
        break;
      default:
        throw new TypeError('Must provide a hilo val of "<" or ">"');
    }
    if (l(h, _, g))
      return !1;
    for (let m = 0; m < _.set.length; ++m) {
      const v = _.set[m];
      let p = null, y = null;
      if (v.forEach(($) => {
        $.semver === f && ($ = new t(">=0.0.0")), p = p || $, y = y || $, w($.semver, p.semver, g) ? p = $ : u($.semver, y.semver, g) && (y = $);
      }), p.operator === d || p.operator === i || (!y.operator || y.operator === d) && R(h, y.semver))
        return !1;
      if (y.operator === i && u(h, y.semver))
        return !1;
    }
    return !0;
  }, Xi;
}
var Ji, Bu;
function Lm() {
  if (Bu) return Ji;
  Bu = 1;
  const e = so();
  return Ji = (f, s, l) => e(f, s, ">", l), Ji;
}
var Zi, Hu;
function km() {
  if (Hu) return Zi;
  Hu = 1;
  const e = so();
  return Zi = (f, s, l) => e(f, s, "<", l), Zi;
}
var Yi, Wu;
function jm() {
  if (Wu) return Yi;
  Wu = 1;
  const e = Fe();
  return Yi = (f, s, l) => (f = new e(f, l), s = new e(s, l), f.intersects(s, l)), Yi;
}
var Qi, Xu;
function qm() {
  if (Xu) return Qi;
  Xu = 1;
  const e = qn(), t = qe();
  return Qi = (f, s, l) => {
    const r = [];
    let n = null, c = null;
    const o = f.sort((E, g) => t(E, g, l));
    for (const E of o)
      e(E, s, l) ? (c = E, n || (n = E)) : (c && r.push([n, c]), c = null, n = null);
    n && r.push([n, null]);
    const a = [];
    for (const [E, g] of r)
      E === g ? a.push(E) : !g && E === o[0] ? a.push("*") : g ? E === o[0] ? a.push(`<=${g}`) : a.push(`${E} - ${g}`) : a.push(`>=${E}`);
    const h = a.join(" || "), _ = typeof s.raw == "string" ? s.raw : String(s);
    return h.length < _.length ? h : s;
  }, Qi;
}
var es, Ju;
function Fm() {
  if (Ju) return es;
  Ju = 1;
  const e = Fe(), t = jn(), { ANY: f } = t, s = qn(), l = qe(), r = (_, E, g = {}) => {
    if (_ === E)
      return !0;
    _ = new e(_, g), E = new e(E, g);
    let w = !1;
    e: for (const R of _.set) {
      for (const u of E.set) {
        const d = o(R, u, g);
        if (w = w || d !== null, d)
          continue e;
      }
      if (w)
        return !1;
    }
    return !0;
  }, n = [new t(">=0.0.0-0")], c = [new t(">=0.0.0")], o = (_, E, g) => {
    if (_ === E)
      return !0;
    if (_.length === 1 && _[0].semver === f) {
      if (E.length === 1 && E[0].semver === f)
        return !0;
      g.includePrerelease ? _ = n : _ = c;
    }
    if (E.length === 1 && E[0].semver === f) {
      if (g.includePrerelease)
        return !0;
      E = c;
    }
    const w = /* @__PURE__ */ new Set();
    let R, u;
    for (const b of _)
      b.operator === ">" || b.operator === ">=" ? R = a(R, b, g) : b.operator === "<" || b.operator === "<=" ? u = h(u, b, g) : w.add(b.semver);
    if (w.size > 1)
      return null;
    let d;
    if (R && u) {
      if (d = l(R.semver, u.semver, g), d > 0)
        return null;
      if (d === 0 && (R.operator !== ">=" || u.operator !== "<="))
        return null;
    }
    for (const b of w) {
      if (R && !s(b, String(R), g) || u && !s(b, String(u), g))
        return null;
      for (const I of E)
        if (!s(b, String(I), g))
          return !1;
      return !0;
    }
    let i, m, v, p, y = u && !g.includePrerelease && u.semver.prerelease.length ? u.semver : !1, $ = R && !g.includePrerelease && R.semver.prerelease.length ? R.semver : !1;
    y && y.prerelease.length === 1 && u.operator === "<" && y.prerelease[0] === 0 && (y = !1);
    for (const b of E) {
      if (p = p || b.operator === ">" || b.operator === ">=", v = v || b.operator === "<" || b.operator === "<=", R) {
        if ($ && b.semver.prerelease && b.semver.prerelease.length && b.semver.major === $.major && b.semver.minor === $.minor && b.semver.patch === $.patch && ($ = !1), b.operator === ">" || b.operator === ">=") {
          if (i = a(R, b, g), i === b && i !== R)
            return !1;
        } else if (R.operator === ">=" && !s(R.semver, String(b), g))
          return !1;
      }
      if (u) {
        if (y && b.semver.prerelease && b.semver.prerelease.length && b.semver.major === y.major && b.semver.minor === y.minor && b.semver.patch === y.patch && (y = !1), b.operator === "<" || b.operator === "<=") {
          if (m = h(u, b, g), m === b && m !== u)
            return !1;
        } else if (u.operator === "<=" && !s(u.semver, String(b), g))
          return !1;
      }
      if (!b.operator && (u || R) && d !== 0)
        return !1;
    }
    return !(R && v && !u && d !== 0 || u && p && !R && d !== 0 || $ || y);
  }, a = (_, E, g) => {
    if (!_)
      return E;
    const w = l(_.semver, E.semver, g);
    return w > 0 ? _ : w < 0 || E.operator === ">" && _.operator === ">=" ? E : _;
  }, h = (_, E, g) => {
    if (!_)
      return E;
    const w = l(_.semver, E.semver, g);
    return w < 0 ? _ : w > 0 || E.operator === "<" && _.operator === "<=" ? E : _;
  };
  return es = r, es;
}
var ts, Zu;
function Mm() {
  if (Zu) return ts;
  Zu = 1;
  const e = Pt(), t = An(), f = Oe(), s = gf(), l = dt(), r = pm(), n = ym(), c = vm(), o = gm(), a = _m(), h = $m(), _ = Em(), E = wm(), g = qe(), w = Sm(), R = bm(), u = to(), d = Rm(), i = Pm(), m = kn(), v = ro(), p = _f(), y = $f(), $ = no(), b = io(), I = Ef(), L = Om(), F = jn(), H = Fe(), U = qn(), V = Im(), K = Tm(), J = Cm(), W = Dm(), M = Am(), G = so(), A = Lm(), T = km(), q = jm(), C = qm(), S = Fm();
  return ts = {
    parse: l,
    valid: r,
    clean: n,
    inc: c,
    diff: o,
    major: a,
    minor: h,
    patch: _,
    prerelease: E,
    compare: g,
    rcompare: w,
    compareLoose: R,
    compareBuild: u,
    sort: d,
    rsort: i,
    gt: m,
    lt: v,
    eq: p,
    neq: y,
    gte: $,
    lte: b,
    cmp: I,
    coerce: L,
    Comparator: F,
    Range: H,
    satisfies: U,
    toComparators: V,
    maxSatisfying: K,
    minSatisfying: J,
    minVersion: W,
    validRange: M,
    outside: G,
    gtr: A,
    ltr: T,
    intersects: q,
    simplifyRange: C,
    subset: S,
    SemVer: f,
    re: e.re,
    src: e.src,
    tokens: e.t,
    SEMVER_SPEC_VERSION: t.SEMVER_SPEC_VERSION,
    RELEASE_TYPES: t.RELEASE_TYPES,
    compareIdentifiers: s.compareIdentifiers,
    rcompareIdentifiers: s.rcompareIdentifiers
  }, ts;
}
var $t = { exports: {} }, mn = { exports: {} }, Yu;
function Um() {
  if (Yu) return mn.exports;
  Yu = 1;
  const e = (t, f) => {
    for (const s of Reflect.ownKeys(f))
      Object.defineProperty(t, s, Object.getOwnPropertyDescriptor(f, s));
    return t;
  };
  return mn.exports = e, mn.exports.default = e, mn.exports;
}
var Qu;
function Vm() {
  if (Qu) return $t.exports;
  Qu = 1;
  const e = Um(), t = /* @__PURE__ */ new WeakMap(), f = (s, l = {}) => {
    if (typeof s != "function")
      throw new TypeError("Expected a function");
    let r, n = 0;
    const c = s.displayName || s.name || "<anonymous>", o = function(...a) {
      if (t.set(o, ++n), n === 1)
        r = s.apply(this, a), s = null;
      else if (l.throw === !0)
        throw new Error(`Function \`${c}\` can only be called once`);
      return r;
    };
    return e(o, s), t.set(o, n), o;
  };
  return $t.exports = f, $t.exports.default = f, $t.exports.callCount = (s) => {
    if (!t.has(s))
      throw new Error(`The given function \`${s.name}\` is not wrapped by the \`onetime\` package`);
    return t.get(s);
  }, $t.exports;
}
var pn = St.exports, el;
function zm() {
  return el || (el = 1, function(e, t) {
    var f = pn && pn.__classPrivateFieldSet || function(W, M, G, A, T) {
      if (A === "m") throw new TypeError("Private method is not writable");
      if (A === "a" && !T) throw new TypeError("Private accessor was defined without a setter");
      if (typeof M == "function" ? W !== M || !T : !M.has(W)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
      return A === "a" ? T.call(W, G) : T ? T.value = G : M.set(W, G), G;
    }, s = pn && pn.__classPrivateFieldGet || function(W, M, G, A) {
      if (G === "a" && !A) throw new TypeError("Private accessor was defined without a getter");
      if (typeof M == "function" ? W !== M || !A : !M.has(W)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
      return G === "m" ? A : G === "a" ? A.call(W) : A ? A.value : M.get(W);
    }, l, r, n, c, o, a;
    Object.defineProperty(t, "__esModule", { value: !0 });
    const h = Hs, _ = ft, E = _e, g = ef, w = tf, R = Cf, u = Ff(), d = Kf(), i = Bf(), m = ed(), v = oh(), p = dm(), y = mm(), $ = Mm(), b = Vm(), I = "aes-256-cbc", L = () => /* @__PURE__ */ Object.create(null), F = (W) => W != null;
    let H = "";
    try {
      delete require.cache[__filename], H = E.dirname((r = (l = e.parent) === null || l === void 0 ? void 0 : l.filename) !== null && r !== void 0 ? r : ".");
    } catch {
    }
    const U = (W, M) => {
      const G = /* @__PURE__ */ new Set([
        "undefined",
        "symbol",
        "function"
      ]), A = typeof M;
      if (G.has(A))
        throw new TypeError(`Setting a value of type \`${A}\` for key \`${W}\` is not allowed as it's not supported by JSON`);
    }, V = "__internal__", K = `${V}.migrations.version`;
    class J {
      constructor(M = {}) {
        var G;
        n.set(this, void 0), c.set(this, void 0), o.set(this, void 0), a.set(this, {}), this._deserialize = (P) => JSON.parse(P), this._serialize = (P) => JSON.stringify(P, void 0, "	");
        const A = {
          configName: "config",
          fileExtension: "json",
          projectSuffix: "nodejs",
          clearInvalidConfig: !1,
          accessPropertiesByDotNotation: !0,
          configFileMode: 438,
          ...M
        }, T = b(() => {
          const P = d.sync({ cwd: H }), O = P && JSON.parse(_.readFileSync(P, "utf8"));
          return O ?? {};
        });
        if (!A.cwd) {
          if (A.projectName || (A.projectName = T().name), !A.projectName)
            throw new Error("Project name could not be inferred. Please specify the `projectName` option.");
          A.cwd = i(A.projectName, { suffix: A.projectSuffix }).config;
        }
        if (f(this, o, A, "f"), A.schema) {
          if (typeof A.schema != "object")
            throw new TypeError("The `schema` option must be an object.");
          const P = new v.default({
            allErrors: !0,
            useDefaults: !0
          });
          (0, p.default)(P);
          const O = {
            type: "object",
            properties: A.schema
          };
          f(this, n, P.compile(O), "f");
          for (const [B, x] of Object.entries(A.schema))
            x?.default && (s(this, a, "f")[B] = x.default);
        }
        A.defaults && f(this, a, {
          ...s(this, a, "f"),
          ...A.defaults
        }, "f"), A.serialize && (this._serialize = A.serialize), A.deserialize && (this._deserialize = A.deserialize), this.events = new R.EventEmitter(), f(this, c, A.encryptionKey, "f");
        const q = A.fileExtension ? `.${A.fileExtension}` : "";
        this.path = E.resolve(A.cwd, `${(G = A.configName) !== null && G !== void 0 ? G : "config"}${q}`);
        const C = this.store, S = Object.assign(L(), A.defaults, C);
        this._validate(S);
        try {
          w.deepEqual(C, S);
        } catch {
          this.store = S;
        }
        if (A.watch && this._watch(), A.migrations) {
          if (A.projectVersion || (A.projectVersion = T().version), !A.projectVersion)
            throw new Error("Project version could not be inferred. Please specify the `projectVersion` option.");
          this._migrate(A.migrations, A.projectVersion, A.beforeEachMigration);
        }
      }
      get(M, G) {
        if (s(this, o, "f").accessPropertiesByDotNotation)
          return this._get(M, G);
        const { store: A } = this;
        return M in A ? A[M] : G;
      }
      set(M, G) {
        if (typeof M != "string" && typeof M != "object")
          throw new TypeError(`Expected \`key\` to be of type \`string\` or \`object\`, got ${typeof M}`);
        if (typeof M != "object" && G === void 0)
          throw new TypeError("Use `delete()` to clear values");
        if (this._containsReservedKey(M))
          throw new TypeError(`Please don't use the ${V} key, as it's used to manage this module internal operations.`);
        const { store: A } = this, T = (q, C) => {
          U(q, C), s(this, o, "f").accessPropertiesByDotNotation ? u.set(A, q, C) : A[q] = C;
        };
        if (typeof M == "object") {
          const q = M;
          for (const [C, S] of Object.entries(q))
            T(C, S);
        } else
          T(M, G);
        this.store = A;
      }
      /**
      		    Check if an item exists.
      
      		    @param key - The key of the item to check.
      		    */
      has(M) {
        return s(this, o, "f").accessPropertiesByDotNotation ? u.has(this.store, M) : M in this.store;
      }
      /**
      		    Reset items to their default values, as defined by the `defaults` or `schema` option.
      
      		    @see `clear()` to reset all items.
      
      		    @param keys - The keys of the items to reset.
      		    */
      reset(...M) {
        for (const G of M)
          F(s(this, a, "f")[G]) && this.set(G, s(this, a, "f")[G]);
      }
      /**
      		    Delete an item.
      
      		    @param key - The key of the item to delete.
      		    */
      delete(M) {
        const { store: G } = this;
        s(this, o, "f").accessPropertiesByDotNotation ? u.delete(G, M) : delete G[M], this.store = G;
      }
      /**
      		    Delete all items.
      
      		    This resets known items to their default values, if defined by the `defaults` or `schema` option.
      		    */
      clear() {
        this.store = L();
        for (const M of Object.keys(s(this, a, "f")))
          this.reset(M);
      }
      /**
      		    Watches the given `key`, calling `callback` on any changes.
      
      		    @param key - The key wo watch.
      		    @param callback - A callback function that is called on any changes. When a `key` is first set `oldValue` will be `undefined`, and when a key is deleted `newValue` will be `undefined`.
      		    @returns A function, that when called, will unsubscribe.
      		    */
      onDidChange(M, G) {
        if (typeof M != "string")
          throw new TypeError(`Expected \`key\` to be of type \`string\`, got ${typeof M}`);
        if (typeof G != "function")
          throw new TypeError(`Expected \`callback\` to be of type \`function\`, got ${typeof G}`);
        return this._handleChange(() => this.get(M), G);
      }
      /**
      		    Watches the whole config object, calling `callback` on any changes.
      
      		    @param callback - A callback function that is called on any changes. When a `key` is first set `oldValue` will be `undefined`, and when a key is deleted `newValue` will be `undefined`.
      		    @returns A function, that when called, will unsubscribe.
      		    */
      onDidAnyChange(M) {
        if (typeof M != "function")
          throw new TypeError(`Expected \`callback\` to be of type \`function\`, got ${typeof M}`);
        return this._handleChange(() => this.store, M);
      }
      get size() {
        return Object.keys(this.store).length;
      }
      get store() {
        try {
          const M = _.readFileSync(this.path, s(this, c, "f") ? null : "utf8"), G = this._encryptData(M), A = this._deserialize(G);
          return this._validate(A), Object.assign(L(), A);
        } catch (M) {
          if (M?.code === "ENOENT")
            return this._ensureDirectory(), L();
          if (s(this, o, "f").clearInvalidConfig && M.name === "SyntaxError")
            return L();
          throw M;
        }
      }
      set store(M) {
        this._ensureDirectory(), this._validate(M), this._write(M), this.events.emit("change");
      }
      *[(n = /* @__PURE__ */ new WeakMap(), c = /* @__PURE__ */ new WeakMap(), o = /* @__PURE__ */ new WeakMap(), a = /* @__PURE__ */ new WeakMap(), Symbol.iterator)]() {
        for (const [M, G] of Object.entries(this.store))
          yield [M, G];
      }
      _encryptData(M) {
        if (!s(this, c, "f"))
          return M.toString();
        try {
          if (s(this, c, "f"))
            try {
              if (M.slice(16, 17).toString() === ":") {
                const G = M.slice(0, 16), A = g.pbkdf2Sync(s(this, c, "f"), G.toString(), 1e4, 32, "sha512"), T = g.createDecipheriv(I, A, G);
                M = Buffer.concat([T.update(Buffer.from(M.slice(17))), T.final()]).toString("utf8");
              } else {
                const G = g.createDecipher(I, s(this, c, "f"));
                M = Buffer.concat([G.update(Buffer.from(M)), G.final()]).toString("utf8");
              }
            } catch {
            }
        } catch {
        }
        return M.toString();
      }
      _handleChange(M, G) {
        let A = M();
        const T = () => {
          const q = A, C = M();
          (0, h.isDeepStrictEqual)(C, q) || (A = C, G.call(this, C, q));
        };
        return this.events.on("change", T), () => this.events.removeListener("change", T);
      }
      _validate(M) {
        if (!s(this, n, "f") || s(this, n, "f").call(this, M) || !s(this, n, "f").errors)
          return;
        const A = s(this, n, "f").errors.map(({ instancePath: T, message: q = "" }) => `\`${T.slice(1)}\` ${q}`);
        throw new Error("Config schema violation: " + A.join("; "));
      }
      _ensureDirectory() {
        _.mkdirSync(E.dirname(this.path), { recursive: !0 });
      }
      _write(M) {
        let G = this._serialize(M);
        if (s(this, c, "f")) {
          const A = g.randomBytes(16), T = g.pbkdf2Sync(s(this, c, "f"), A.toString(), 1e4, 32, "sha512"), q = g.createCipheriv(I, T, A);
          G = Buffer.concat([A, Buffer.from(":"), q.update(Buffer.from(G)), q.final()]);
        }
        if (process.env.SNAP)
          _.writeFileSync(this.path, G, { mode: s(this, o, "f").configFileMode });
        else
          try {
            m.writeFileSync(this.path, G, { mode: s(this, o, "f").configFileMode });
          } catch (A) {
            if (A?.code === "EXDEV") {
              _.writeFileSync(this.path, G, { mode: s(this, o, "f").configFileMode });
              return;
            }
            throw A;
          }
      }
      _watch() {
        this._ensureDirectory(), _.existsSync(this.path) || this._write(L()), process.platform === "win32" ? _.watch(this.path, { persistent: !1 }, y(() => {
          this.events.emit("change");
        }, { wait: 100 })) : _.watchFile(this.path, { persistent: !1 }, y(() => {
          this.events.emit("change");
        }, { wait: 5e3 }));
      }
      _migrate(M, G, A) {
        let T = this._get(K, "0.0.0");
        const q = Object.keys(M).filter((S) => this._shouldPerformMigration(S, T, G));
        let C = { ...this.store };
        for (const S of q)
          try {
            A && A(this, {
              fromVersion: T,
              toVersion: S,
              finalVersion: G,
              versions: q
            });
            const P = M[S];
            P(this), this._set(K, S), T = S, C = { ...this.store };
          } catch (P) {
            throw this.store = C, new Error(`Something went wrong during the migration! Changes applied to the store until this failed migration will be restored. ${P}`);
          }
        (this._isVersionInRangeFormat(T) || !$.eq(T, G)) && this._set(K, G);
      }
      _containsReservedKey(M) {
        return typeof M == "object" && Object.keys(M)[0] === V ? !0 : typeof M != "string" ? !1 : s(this, o, "f").accessPropertiesByDotNotation ? !!M.startsWith(`${V}.`) : !1;
      }
      _isVersionInRangeFormat(M) {
        return $.clean(M) === null;
      }
      _shouldPerformMigration(M, G, A) {
        return this._isVersionInRangeFormat(M) ? G !== "0.0.0" && $.satisfies(G, M) ? !1 : $.satisfies(A, M) : !($.lte(M, G) || $.gt(M, A));
      }
      _get(M, G) {
        return u.get(this.store, M, G);
      }
      _set(M, G) {
        const { store: A } = this;
        u.set(A, M, G), this.store = A;
      }
    }
    t.default = J, e.exports = J, e.exports.default = J;
  }(St, St.exports)), St.exports;
}
var rs, tl;
function xm() {
  if (tl) return rs;
  tl = 1;
  const e = _e, { app: t, ipcMain: f, ipcRenderer: s, shell: l } = Of, r = zm();
  let n = !1;
  const c = () => {
    if (!f || !t)
      throw new Error("Electron Store: You need to call `.initRenderer()` from the main process.");
    const a = {
      defaultCwd: t.getPath("userData"),
      appVersion: t.getVersion()
    };
    return n || (f.on("electron-store-get-data", (h) => {
      h.returnValue = a;
    }), n = !0), a;
  };
  class o extends r {
    constructor(h) {
      let _, E;
      if (s) {
        const g = s.sendSync("electron-store-get-data");
        if (!g)
          throw new Error("Electron Store: You need to call `.initRenderer()` from the main process.");
        ({ defaultCwd: _, appVersion: E } = g);
      } else f && t && ({ defaultCwd: _, appVersion: E } = c());
      h = {
        name: "config",
        ...h
      }, h.projectVersion || (h.projectVersion = E), h.cwd ? h.cwd = e.isAbsolute(h.cwd) ? h.cwd : e.join(_, h.cwd) : h.cwd = _, h.configName = h.name, delete h.name, super(h);
    }
    static initRenderer() {
      c();
    }
    async openInEditor() {
      const h = await l.openPath(this.path);
      if (h)
        throw new Error(h);
    }
  }
  return rs = o, rs;
}
var Gm = /* @__PURE__ */ xm();
const rl = /* @__PURE__ */ nf(Gm);
var st = { exports: {} }, ns, nl;
function wf() {
  return nl || (nl = 1, ns = {
    /* The local file header */
    LOCHDR: 30,
    // LOC header size
    LOCSIG: 67324752,
    // "PK\003\004"
    LOCVER: 4,
    // version needed to extract
    LOCFLG: 6,
    // general purpose bit flag
    LOCHOW: 8,
    // compression method
    LOCTIM: 10,
    // modification time (2 bytes time, 2 bytes date)
    LOCCRC: 14,
    // uncompressed file crc-32 value
    LOCSIZ: 18,
    // compressed size
    LOCLEN: 22,
    // uncompressed size
    LOCNAM: 26,
    // filename length
    LOCEXT: 28,
    // extra field length
    /* The Data descriptor */
    EXTSIG: 134695760,
    // "PK\007\008"
    EXTHDR: 16,
    // EXT header size
    EXTCRC: 4,
    // uncompressed file crc-32 value
    EXTSIZ: 8,
    // compressed size
    EXTLEN: 12,
    // uncompressed size
    /* The central directory file header */
    CENHDR: 46,
    // CEN header size
    CENSIG: 33639248,
    // "PK\001\002"
    CENVEM: 4,
    // version made by
    CENVER: 6,
    // version needed to extract
    CENFLG: 8,
    // encrypt, decrypt flags
    CENHOW: 10,
    // compression method
    CENTIM: 12,
    // modification time (2 bytes time, 2 bytes date)
    CENCRC: 16,
    // uncompressed file crc-32 value
    CENSIZ: 20,
    // compressed size
    CENLEN: 24,
    // uncompressed size
    CENNAM: 28,
    // filename length
    CENEXT: 30,
    // extra field length
    CENCOM: 32,
    // file comment length
    CENDSK: 34,
    // volume number start
    CENATT: 36,
    // internal file attributes
    CENATX: 38,
    // external file attributes (host system dependent)
    CENOFF: 42,
    // LOC header offset
    /* The entries in the end of central directory */
    ENDHDR: 22,
    // END header size
    ENDSIG: 101010256,
    // "PK\005\006"
    ENDSUB: 8,
    // number of entries on this disk
    ENDTOT: 10,
    // total number of entries
    ENDSIZ: 12,
    // central directory size in bytes
    ENDOFF: 16,
    // offset of first CEN header
    ENDCOM: 20,
    // zip file comment length
    END64HDR: 20,
    // zip64 END header size
    END64SIG: 117853008,
    // zip64 Locator signature, "PK\006\007"
    END64START: 4,
    // number of the disk with the start of the zip64
    END64OFF: 8,
    // relative offset of the zip64 end of central directory
    END64NUMDISKS: 16,
    // total number of disks
    ZIP64SIG: 101075792,
    // zip64 signature, "PK\006\006"
    ZIP64HDR: 56,
    // zip64 record minimum size
    ZIP64LEAD: 12,
    // leading bytes at the start of the record, not counted by the value stored in ZIP64SIZE
    ZIP64SIZE: 4,
    // zip64 size of the central directory record
    ZIP64VEM: 12,
    // zip64 version made by
    ZIP64VER: 14,
    // zip64 version needed to extract
    ZIP64DSK: 16,
    // zip64 number of this disk
    ZIP64DSKDIR: 20,
    // number of the disk with the start of the record directory
    ZIP64SUB: 24,
    // number of entries on this disk
    ZIP64TOT: 32,
    // total number of entries
    ZIP64SIZB: 40,
    // zip64 central directory size in bytes
    ZIP64OFF: 48,
    // offset of start of central directory with respect to the starting disk number
    ZIP64EXTRA: 56,
    // extensible data sector
    /* Compression methods */
    STORED: 0,
    // no compression
    SHRUNK: 1,
    // shrunk
    REDUCED1: 2,
    // reduced with compression factor 1
    REDUCED2: 3,
    // reduced with compression factor 2
    REDUCED3: 4,
    // reduced with compression factor 3
    REDUCED4: 5,
    // reduced with compression factor 4
    IMPLODED: 6,
    // imploded
    // 7 reserved for Tokenizing compression algorithm
    DEFLATED: 8,
    // deflated
    ENHANCED_DEFLATED: 9,
    // enhanced deflated
    PKWARE: 10,
    // PKWare DCL imploded
    // 11 reserved by PKWARE
    BZIP2: 12,
    //  compressed using BZIP2
    // 13 reserved by PKWARE
    LZMA: 14,
    // LZMA
    // 15-17 reserved by PKWARE
    IBM_TERSE: 18,
    // compressed using IBM TERSE
    IBM_LZ77: 19,
    // IBM LZ77 z
    AES_ENCRYPT: 99,
    // WinZIP AES encryption method
    /* General purpose bit flag */
    // values can obtained with expression 2**bitnr
    FLG_ENC: 1,
    // Bit 0: encrypted file
    FLG_COMP1: 2,
    // Bit 1, compression option
    FLG_COMP2: 4,
    // Bit 2, compression option
    FLG_DESC: 8,
    // Bit 3, data descriptor
    FLG_ENH: 16,
    // Bit 4, enhanced deflating
    FLG_PATCH: 32,
    // Bit 5, indicates that the file is compressed patched data.
    FLG_STR: 64,
    // Bit 6, strong encryption (patented)
    // Bits 7-10: Currently unused.
    FLG_EFS: 2048,
    // Bit 11: Language encoding flag (EFS)
    // Bit 12: Reserved by PKWARE for enhanced compression.
    // Bit 13: encrypted the Central Directory (patented).
    // Bits 14-15: Reserved by PKWARE.
    FLG_MSK: 4096,
    // mask header values
    /* Load type */
    FILE: 2,
    BUFFER: 1,
    NONE: 0,
    /* 4.5 Extensible data fields */
    EF_ID: 0,
    EF_SIZE: 2,
    /* Header IDs */
    ID_ZIP64: 1,
    ID_AVINFO: 7,
    ID_PFS: 8,
    ID_OS2: 9,
    ID_NTFS: 10,
    ID_OPENVMS: 12,
    ID_UNIX: 13,
    ID_FORK: 14,
    ID_PATCH: 15,
    ID_X509_PKCS7: 20,
    ID_X509_CERTID_F: 21,
    ID_X509_CERTID_C: 22,
    ID_STRONGENC: 23,
    ID_RECORD_MGT: 24,
    ID_X509_PKCS7_RL: 25,
    ID_IBM1: 101,
    ID_IBM2: 102,
    ID_POSZIP: 18064,
    EF_ZIP64_OR_32: 4294967295,
    EF_ZIP64_OR_16: 65535,
    EF_ZIP64_SUNCOMP: 0,
    EF_ZIP64_SCOMP: 8,
    EF_ZIP64_RHO: 16,
    EF_ZIP64_DSN: 24
  }), ns;
}
var is = {}, il;
function oo() {
  return il || (il = 1, function(e) {
    const t = {
      /* Header error messages */
      INVALID_LOC: "Invalid LOC header (bad signature)",
      INVALID_CEN: "Invalid CEN header (bad signature)",
      INVALID_END: "Invalid END header (bad signature)",
      /* Descriptor */
      DESCRIPTOR_NOT_EXIST: "No descriptor present",
      DESCRIPTOR_UNKNOWN: "Unknown descriptor format",
      DESCRIPTOR_FAULTY: "Descriptor data is malformed",
      /* ZipEntry error messages*/
      NO_DATA: "Nothing to decompress",
      BAD_CRC: "CRC32 checksum failed {0}",
      FILE_IN_THE_WAY: "There is a file in the way: {0}",
      UNKNOWN_METHOD: "Invalid/unsupported compression method",
      /* Inflater error messages */
      AVAIL_DATA: "inflate::Available inflate data did not terminate",
      INVALID_DISTANCE: "inflate::Invalid literal/length or distance code in fixed or dynamic block",
      TO_MANY_CODES: "inflate::Dynamic block code description: too many length or distance codes",
      INVALID_REPEAT_LEN: "inflate::Dynamic block code description: repeat more than specified lengths",
      INVALID_REPEAT_FIRST: "inflate::Dynamic block code description: repeat lengths with no first length",
      INCOMPLETE_CODES: "inflate::Dynamic block code description: code lengths codes incomplete",
      INVALID_DYN_DISTANCE: "inflate::Dynamic block code description: invalid distance code lengths",
      INVALID_CODES_LEN: "inflate::Dynamic block code description: invalid literal/length code lengths",
      INVALID_STORE_BLOCK: "inflate::Stored block length did not match one's complement",
      INVALID_BLOCK_TYPE: "inflate::Invalid block type (type == 3)",
      /* ADM-ZIP error messages */
      CANT_EXTRACT_FILE: "Could not extract the file",
      CANT_OVERRIDE: "Target file already exists",
      DISK_ENTRY_TOO_LARGE: "Number of disk entries is too large",
      NO_ZIP: "No zip file was loaded",
      NO_ENTRY: "Entry doesn't exist",
      DIRECTORY_CONTENT_ERROR: "A directory cannot have content",
      FILE_NOT_FOUND: 'File not found: "{0}"',
      NOT_IMPLEMENTED: "Not implemented",
      INVALID_FILENAME: "Invalid filename",
      INVALID_FORMAT: "Invalid or unsupported zip format. No END header found",
      INVALID_PASS_PARAM: "Incompatible password parameter",
      WRONG_PASSWORD: "Wrong Password",
      /* ADM-ZIP */
      COMMENT_TOO_LONG: "Comment is too long",
      // Comment can be max 65535 bytes long (NOTE: some non-US characters may take more space)
      EXTRA_FIELD_PARSE_ERROR: "Extra field parsing error"
    };
    function f(s) {
      return function(...l) {
        return l.length && (s = s.replace(/\{(\d)\}/g, (r, n) => l[n] || "")), new Error("ADM-ZIP: " + s);
      };
    }
    for (const s of Object.keys(t))
      e[s] = f(t[s]);
  }(is)), is;
}
var ss, sl;
function Km() {
  if (sl) return ss;
  sl = 1;
  const e = ft, t = _e, f = wf(), s = oo(), l = typeof process == "object" && process.platform === "win32", r = (o) => typeof o == "object" && o !== null, n = new Uint32Array(256).map((o, a) => {
    for (let h = 0; h < 8; h++)
      a & 1 ? a = 3988292384 ^ a >>> 1 : a >>>= 1;
    return a >>> 0;
  });
  function c(o) {
    this.sep = t.sep, this.fs = e, r(o) && r(o.fs) && typeof o.fs.statSync == "function" && (this.fs = o.fs);
  }
  return ss = c, c.prototype.makeDir = function(o) {
    const a = this;
    function h(_) {
      let E = _.split(a.sep)[0];
      _.split(a.sep).forEach(function(g) {
        if (!(!g || g.substr(-1, 1) === ":")) {
          E += a.sep + g;
          var w;
          try {
            w = a.fs.statSync(E);
          } catch {
            a.fs.mkdirSync(E);
          }
          if (w && w.isFile()) throw s.FILE_IN_THE_WAY(`"${E}"`);
        }
      });
    }
    h(o);
  }, c.prototype.writeFileTo = function(o, a, h, _) {
    const E = this;
    if (E.fs.existsSync(o)) {
      if (!h) return !1;
      var g = E.fs.statSync(o);
      if (g.isDirectory())
        return !1;
    }
    var w = t.dirname(o);
    E.fs.existsSync(w) || E.makeDir(w);
    var R;
    try {
      R = E.fs.openSync(o, "w", 438);
    } catch {
      E.fs.chmodSync(o, 438), R = E.fs.openSync(o, "w", 438);
    }
    if (R)
      try {
        E.fs.writeSync(R, a, 0, a.length, 0);
      } finally {
        E.fs.closeSync(R);
      }
    return E.fs.chmodSync(o, _ || 438), !0;
  }, c.prototype.writeFileToAsync = function(o, a, h, _, E) {
    typeof _ == "function" && (E = _, _ = void 0);
    const g = this;
    g.fs.exists(o, function(w) {
      if (w && !h) return E(!1);
      g.fs.stat(o, function(R, u) {
        if (w && u.isDirectory())
          return E(!1);
        var d = t.dirname(o);
        g.fs.exists(d, function(i) {
          i || g.makeDir(d), g.fs.open(o, "w", 438, function(m, v) {
            m ? g.fs.chmod(o, 438, function() {
              g.fs.open(o, "w", 438, function(p, y) {
                g.fs.write(y, a, 0, a.length, 0, function() {
                  g.fs.close(y, function() {
                    g.fs.chmod(o, _ || 438, function() {
                      E(!0);
                    });
                  });
                });
              });
            }) : v ? g.fs.write(v, a, 0, a.length, 0, function() {
              g.fs.close(v, function() {
                g.fs.chmod(o, _ || 438, function() {
                  E(!0);
                });
              });
            }) : g.fs.chmod(o, _ || 438, function() {
              E(!0);
            });
          });
        });
      });
    });
  }, c.prototype.findFiles = function(o) {
    const a = this;
    function h(_, E, g) {
      let w = [];
      return a.fs.readdirSync(_).forEach(function(R) {
        const u = t.join(_, R), d = a.fs.statSync(u);
        w.push(t.normalize(u) + (d.isDirectory() ? a.sep : "")), d.isDirectory() && g && (w = w.concat(h(u, E, g)));
      }), w;
    }
    return h(o, void 0, !0);
  }, c.prototype.findFilesAsync = function(o, a) {
    const h = this;
    let _ = [];
    h.fs.readdir(o, function(E, g) {
      if (E) return a(E);
      let w = g.length;
      if (!w) return a(null, _);
      g.forEach(function(R) {
        R = t.join(o, R), h.fs.stat(R, function(u, d) {
          if (u) return a(u);
          d && (_.push(t.normalize(R) + (d.isDirectory() ? h.sep : "")), d.isDirectory() ? h.findFilesAsync(R, function(i, m) {
            if (i) return a(i);
            _ = _.concat(m), --w || a(null, _);
          }) : --w || a(null, _));
        });
      });
    });
  }, c.prototype.getAttributes = function() {
  }, c.prototype.setAttributes = function() {
  }, c.crc32update = function(o, a) {
    return n[(o ^ a) & 255] ^ o >>> 8;
  }, c.crc32 = function(o) {
    typeof o == "string" && (o = Buffer.from(o, "utf8"));
    let a = o.length, h = -1;
    for (let _ = 0; _ < a; ) h = c.crc32update(h, o[_++]);
    return ~h >>> 0;
  }, c.methodToString = function(o) {
    switch (o) {
      case f.STORED:
        return "STORED (" + o + ")";
      case f.DEFLATED:
        return "DEFLATED (" + o + ")";
      default:
        return "UNSUPPORTED (" + o + ")";
    }
  }, c.canonical = function(o) {
    if (!o) return "";
    const a = t.posix.normalize("/" + o.split("\\").join("/"));
    return t.join(".", a);
  }, c.zipnamefix = function(o) {
    if (!o) return "";
    const a = t.posix.normalize("/" + o.split("\\").join("/"));
    return t.posix.join(".", a);
  }, c.findLast = function(o, a) {
    if (!Array.isArray(o)) throw new TypeError("arr is not array");
    const h = o.length >>> 0;
    for (let _ = h - 1; _ >= 0; _--)
      if (a(o[_], _, o))
        return o[_];
  }, c.sanitize = function(o, a) {
    o = t.resolve(t.normalize(o));
    for (var h = a.split("/"), _ = 0, E = h.length; _ < E; _++) {
      var g = t.normalize(t.join(o, h.slice(_, E).join(t.sep)));
      if (g.indexOf(o) === 0)
        return g;
    }
    return t.normalize(t.join(o, t.basename(a)));
  }, c.toBuffer = function(a, h) {
    return Buffer.isBuffer(a) ? a : a instanceof Uint8Array ? Buffer.from(a) : typeof a == "string" ? h(a) : Buffer.alloc(0);
  }, c.readBigUInt64LE = function(o, a) {
    var h = Buffer.from(o.slice(a, a + 8));
    return h.swap64(), parseInt(`0x${h.toString("hex")}`);
  }, c.fromDOS2Date = function(o) {
    return new Date((o >> 25 & 127) + 1980, Math.max((o >> 21 & 15) - 1, 0), Math.max(o >> 16 & 31, 1), o >> 11 & 31, o >> 5 & 63, (o & 31) << 1);
  }, c.fromDate2DOS = function(o) {
    let a = 0, h = 0;
    return o.getFullYear() > 1979 && (a = (o.getFullYear() - 1980 & 127) << 9 | o.getMonth() + 1 << 5 | o.getDate(), h = o.getHours() << 11 | o.getMinutes() << 5 | o.getSeconds() >> 1), a << 16 | h;
  }, c.isWin = l, c.crcTable = n, ss;
}
var os, ol;
function Bm() {
  if (ol) return os;
  ol = 1;
  const e = _e;
  return os = function(t, { fs: f }) {
    var s = t || "", l = n(), r = null;
    function n() {
      return {
        directory: !1,
        readonly: !1,
        hidden: !1,
        executable: !1,
        mtime: 0,
        atime: 0
      };
    }
    return s && f.existsSync(s) ? (r = f.statSync(s), l.directory = r.isDirectory(), l.mtime = r.mtime, l.atime = r.atime, l.executable = (73 & r.mode) !== 0, l.readonly = (128 & r.mode) === 0, l.hidden = e.basename(s)[0] === ".") : console.warn("Invalid path: " + s), {
      get directory() {
        return l.directory;
      },
      get readOnly() {
        return l.readonly;
      },
      get hidden() {
        return l.hidden;
      },
      get mtime() {
        return l.mtime;
      },
      get atime() {
        return l.atime;
      },
      get executable() {
        return l.executable;
      },
      decodeAttributes: function() {
      },
      encodeAttributes: function() {
      },
      toJSON: function() {
        return {
          path: s,
          isDirectory: l.directory,
          isReadOnly: l.readonly,
          isHidden: l.hidden,
          isExecutable: l.executable,
          mTime: l.mtime,
          aTime: l.atime
        };
      },
      toString: function() {
        return JSON.stringify(this.toJSON(), null, "	");
      }
    };
  }, os;
}
var as, al;
function Hm() {
  return al || (al = 1, as = {
    efs: !0,
    encode: (e) => Buffer.from(e, "utf8"),
    decode: (e) => e.toString("utf8")
  }), as;
}
var cl;
function Ot() {
  return cl || (cl = 1, st.exports = Km(), st.exports.Constants = wf(), st.exports.Errors = oo(), st.exports.FileAttr = Bm(), st.exports.decoder = Hm()), st.exports;
}
var yn = {}, cs, ul;
function Wm() {
  if (ul) return cs;
  ul = 1;
  var e = Ot(), t = e.Constants;
  return cs = function() {
    var f = 20, s = 10, l = 0, r = 0, n = 0, c = 0, o = 0, a = 0, h = 0, _ = 0, E = 0, g = 0, w = 0, R = 0, u = 0;
    f |= e.isWin ? 2560 : 768, l |= t.FLG_EFS;
    const d = {
      extraLen: 0
    }, i = (v) => Math.max(0, v) >>> 0, m = (v) => Math.max(0, v) & 255;
    return n = e.fromDate2DOS(/* @__PURE__ */ new Date()), {
      get made() {
        return f;
      },
      set made(v) {
        f = v;
      },
      get version() {
        return s;
      },
      set version(v) {
        s = v;
      },
      get flags() {
        return l;
      },
      set flags(v) {
        l = v;
      },
      get flags_efs() {
        return (l & t.FLG_EFS) > 0;
      },
      set flags_efs(v) {
        v ? l |= t.FLG_EFS : l &= ~t.FLG_EFS;
      },
      get flags_desc() {
        return (l & t.FLG_DESC) > 0;
      },
      set flags_desc(v) {
        v ? l |= t.FLG_DESC : l &= ~t.FLG_DESC;
      },
      get method() {
        return r;
      },
      set method(v) {
        switch (v) {
          case t.STORED:
            this.version = 10;
          case t.DEFLATED:
          default:
            this.version = 20;
        }
        r = v;
      },
      get time() {
        return e.fromDOS2Date(this.timeval);
      },
      set time(v) {
        this.timeval = e.fromDate2DOS(v);
      },
      get timeval() {
        return n;
      },
      set timeval(v) {
        n = i(v);
      },
      get timeHighByte() {
        return m(n >>> 8);
      },
      get crc() {
        return c;
      },
      set crc(v) {
        c = i(v);
      },
      get compressedSize() {
        return o;
      },
      set compressedSize(v) {
        o = i(v);
      },
      get size() {
        return a;
      },
      set size(v) {
        a = i(v);
      },
      get fileNameLength() {
        return h;
      },
      set fileNameLength(v) {
        h = v;
      },
      get extraLength() {
        return _;
      },
      set extraLength(v) {
        _ = v;
      },
      get extraLocalLength() {
        return d.extraLen;
      },
      set extraLocalLength(v) {
        d.extraLen = v;
      },
      get commentLength() {
        return E;
      },
      set commentLength(v) {
        E = v;
      },
      get diskNumStart() {
        return g;
      },
      set diskNumStart(v) {
        g = i(v);
      },
      get inAttr() {
        return w;
      },
      set inAttr(v) {
        w = i(v);
      },
      get attr() {
        return R;
      },
      set attr(v) {
        R = i(v);
      },
      // get Unix file permissions
      get fileAttr() {
        return (R || 0) >> 16 & 4095;
      },
      get offset() {
        return u;
      },
      set offset(v) {
        u = i(v);
      },
      get encrypted() {
        return (l & t.FLG_ENC) === t.FLG_ENC;
      },
      get centralHeaderSize() {
        return t.CENHDR + h + _ + E;
      },
      get realDataOffset() {
        return u + t.LOCHDR + d.fnameLen + d.extraLen;
      },
      get localHeader() {
        return d;
      },
      loadLocalHeaderFromBinary: function(v) {
        var p = v.slice(u, u + t.LOCHDR);
        if (p.readUInt32LE(0) !== t.LOCSIG)
          throw e.Errors.INVALID_LOC();
        d.version = p.readUInt16LE(t.LOCVER), d.flags = p.readUInt16LE(t.LOCFLG), d.method = p.readUInt16LE(t.LOCHOW), d.time = p.readUInt32LE(t.LOCTIM), d.crc = p.readUInt32LE(t.LOCCRC), d.compressedSize = p.readUInt32LE(t.LOCSIZ), d.size = p.readUInt32LE(t.LOCLEN), d.fnameLen = p.readUInt16LE(t.LOCNAM), d.extraLen = p.readUInt16LE(t.LOCEXT);
        const y = u + t.LOCHDR + d.fnameLen, $ = y + d.extraLen;
        return v.slice(y, $);
      },
      loadFromBinary: function(v) {
        if (v.length !== t.CENHDR || v.readUInt32LE(0) !== t.CENSIG)
          throw e.Errors.INVALID_CEN();
        f = v.readUInt16LE(t.CENVEM), s = v.readUInt16LE(t.CENVER), l = v.readUInt16LE(t.CENFLG), r = v.readUInt16LE(t.CENHOW), n = v.readUInt32LE(t.CENTIM), c = v.readUInt32LE(t.CENCRC), o = v.readUInt32LE(t.CENSIZ), a = v.readUInt32LE(t.CENLEN), h = v.readUInt16LE(t.CENNAM), _ = v.readUInt16LE(t.CENEXT), E = v.readUInt16LE(t.CENCOM), g = v.readUInt16LE(t.CENDSK), w = v.readUInt16LE(t.CENATT), R = v.readUInt32LE(t.CENATX), u = v.readUInt32LE(t.CENOFF);
      },
      localHeaderToBinary: function() {
        var v = Buffer.alloc(t.LOCHDR);
        return v.writeUInt32LE(t.LOCSIG, 0), v.writeUInt16LE(s, t.LOCVER), v.writeUInt16LE(l, t.LOCFLG), v.writeUInt16LE(r, t.LOCHOW), v.writeUInt32LE(n, t.LOCTIM), v.writeUInt32LE(c, t.LOCCRC), v.writeUInt32LE(o, t.LOCSIZ), v.writeUInt32LE(a, t.LOCLEN), v.writeUInt16LE(h, t.LOCNAM), v.writeUInt16LE(d.extraLen, t.LOCEXT), v;
      },
      centralHeaderToBinary: function() {
        var v = Buffer.alloc(t.CENHDR + h + _ + E);
        return v.writeUInt32LE(t.CENSIG, 0), v.writeUInt16LE(f, t.CENVEM), v.writeUInt16LE(s, t.CENVER), v.writeUInt16LE(l, t.CENFLG), v.writeUInt16LE(r, t.CENHOW), v.writeUInt32LE(n, t.CENTIM), v.writeUInt32LE(c, t.CENCRC), v.writeUInt32LE(o, t.CENSIZ), v.writeUInt32LE(a, t.CENLEN), v.writeUInt16LE(h, t.CENNAM), v.writeUInt16LE(_, t.CENEXT), v.writeUInt16LE(E, t.CENCOM), v.writeUInt16LE(g, t.CENDSK), v.writeUInt16LE(w, t.CENATT), v.writeUInt32LE(R, t.CENATX), v.writeUInt32LE(u, t.CENOFF), v;
      },
      toJSON: function() {
        const v = function(p) {
          return p + " bytes";
        };
        return {
          made: f,
          version: s,
          flags: l,
          method: e.methodToString(r),
          time: this.time,
          crc: "0x" + c.toString(16).toUpperCase(),
          compressedSize: v(o),
          size: v(a),
          fileNameLength: v(h),
          extraLength: v(_),
          commentLength: v(E),
          diskNumStart: g,
          inAttr: w,
          attr: R,
          offset: u,
          centralHeaderSize: v(t.CENHDR + h + _ + E)
        };
      },
      toString: function() {
        return JSON.stringify(this.toJSON(), null, "	");
      }
    };
  }, cs;
}
var us, ll;
function Xm() {
  if (ll) return us;
  ll = 1;
  var e = Ot(), t = e.Constants;
  return us = function() {
    var f = 0, s = 0, l = 0, r = 0, n = 0;
    return {
      get diskEntries() {
        return f;
      },
      set diskEntries(c) {
        f = s = c;
      },
      get totalEntries() {
        return s;
      },
      set totalEntries(c) {
        s = f = c;
      },
      get size() {
        return l;
      },
      set size(c) {
        l = c;
      },
      get offset() {
        return r;
      },
      set offset(c) {
        r = c;
      },
      get commentLength() {
        return n;
      },
      set commentLength(c) {
        n = c;
      },
      get mainHeaderSize() {
        return t.ENDHDR + n;
      },
      loadFromBinary: function(c) {
        if ((c.length !== t.ENDHDR || c.readUInt32LE(0) !== t.ENDSIG) && (c.length < t.ZIP64HDR || c.readUInt32LE(0) !== t.ZIP64SIG))
          throw e.Errors.INVALID_END();
        c.readUInt32LE(0) === t.ENDSIG ? (f = c.readUInt16LE(t.ENDSUB), s = c.readUInt16LE(t.ENDTOT), l = c.readUInt32LE(t.ENDSIZ), r = c.readUInt32LE(t.ENDOFF), n = c.readUInt16LE(t.ENDCOM)) : (f = e.readBigUInt64LE(c, t.ZIP64SUB), s = e.readBigUInt64LE(c, t.ZIP64TOT), l = e.readBigUInt64LE(c, t.ZIP64SIZE), r = e.readBigUInt64LE(c, t.ZIP64OFF), n = 0);
      },
      toBinary: function() {
        var c = Buffer.alloc(t.ENDHDR + n);
        return c.writeUInt32LE(t.ENDSIG, 0), c.writeUInt32LE(0, 4), c.writeUInt16LE(f, t.ENDSUB), c.writeUInt16LE(s, t.ENDTOT), c.writeUInt32LE(l, t.ENDSIZ), c.writeUInt32LE(r, t.ENDOFF), c.writeUInt16LE(n, t.ENDCOM), c.fill(" ", t.ENDHDR), c;
      },
      toJSON: function() {
        const c = function(o, a) {
          let h = o.toString(16).toUpperCase();
          for (; h.length < a; ) h = "0" + h;
          return "0x" + h;
        };
        return {
          diskEntries: f,
          totalEntries: s,
          size: l + " bytes",
          offset: c(r, 4),
          commentLength: n
        };
      },
      toString: function() {
        return JSON.stringify(this.toJSON(), null, "	");
      }
    };
  }, us;
}
var fl;
function Sf() {
  return fl || (fl = 1, yn.EntryHeader = Wm(), yn.MainHeader = Xm()), yn;
}
var Et = {}, ls, dl;
function Jm() {
  return dl || (dl = 1, ls = function(e) {
    var t = rf, f = { chunkSize: (parseInt(e.length / 1024) + 1) * 1024 };
    return {
      deflate: function() {
        return t.deflateRawSync(e, f);
      },
      deflateAsync: function(s) {
        var l = t.createDeflateRaw(f), r = [], n = 0;
        l.on("data", function(c) {
          r.push(c), n += c.length;
        }), l.on("end", function() {
          var c = Buffer.alloc(n), o = 0;
          c.fill(0);
          for (var a = 0; a < r.length; a++) {
            var h = r[a];
            h.copy(c, o), o += h.length;
          }
          s && s(c);
        }), l.end(e);
      }
    };
  }), ls;
}
var fs, hl;
function Zm() {
  if (hl) return fs;
  hl = 1;
  const e = +(process.versions ? process.versions.node : "").split(".")[0] || 0;
  return fs = function(t, f) {
    var s = rf;
    const l = e >= 15 && f > 0 ? { maxOutputLength: f } : {};
    return {
      inflate: function() {
        return s.inflateRawSync(t, l);
      },
      inflateAsync: function(r) {
        var n = s.createInflateRaw(l), c = [], o = 0;
        n.on("data", function(a) {
          c.push(a), o += a.length;
        }), n.on("end", function() {
          var a = Buffer.alloc(o), h = 0;
          a.fill(0);
          for (var _ = 0; _ < c.length; _++) {
            var E = c[_];
            E.copy(a, h), h += E.length;
          }
          r && r(a);
        }), n.end(t);
      }
    };
  }, fs;
}
var ds, ml;
function Ym() {
  if (ml) return ds;
  ml = 1;
  const { randomFillSync: e } = ef, t = oo(), f = new Uint32Array(256).map((g, w) => {
    for (let R = 0; R < 8; R++)
      w & 1 ? w = w >>> 1 ^ 3988292384 : w >>>= 1;
    return w >>> 0;
  }), s = (g, w) => Math.imul(g, w) >>> 0, l = (g, w) => f[(g ^ w) & 255] ^ g >>> 8, r = () => typeof e == "function" ? e(Buffer.alloc(12)) : r.node();
  r.node = () => {
    const g = Buffer.alloc(12), w = g.length;
    for (let R = 0; R < w; R++) g[R] = Math.random() * 256 & 255;
    return g;
  };
  const n = {
    genSalt: r
  };
  function c(g) {
    const w = Buffer.isBuffer(g) ? g : Buffer.from(g);
    this.keys = new Uint32Array([305419896, 591751049, 878082192]);
    for (let R = 0; R < w.length; R++)
      this.updateKeys(w[R]);
  }
  c.prototype.updateKeys = function(g) {
    const w = this.keys;
    return w[0] = l(w[0], g), w[1] += w[0] & 255, w[1] = s(w[1], 134775813) + 1, w[2] = l(w[2], w[1] >>> 24), g;
  }, c.prototype.next = function() {
    const g = (this.keys[2] | 2) >>> 0;
    return s(g, g ^ 1) >> 8 & 255;
  };
  function o(g) {
    const w = new c(g);
    return function(R) {
      const u = Buffer.alloc(R.length);
      let d = 0;
      for (let i of R)
        u[d++] = w.updateKeys(i ^ w.next());
      return u;
    };
  }
  function a(g) {
    const w = new c(g);
    return function(R, u, d = 0) {
      u || (u = Buffer.alloc(R.length));
      for (let i of R) {
        const m = w.next();
        u[d++] = i ^ m, w.updateKeys(i);
      }
      return u;
    };
  }
  function h(g, w, R) {
    if (!g || !Buffer.isBuffer(g) || g.length < 12)
      return Buffer.alloc(0);
    const u = o(R), d = u(g.slice(0, 12)), i = (w.flags & 8) === 8 ? w.timeHighByte : w.crc >>> 24;
    if (d[11] !== i)
      throw t.WRONG_PASSWORD();
    return u(g.slice(12));
  }
  function _(g) {
    Buffer.isBuffer(g) && g.length >= 12 ? n.genSalt = function() {
      return g.slice(0, 12);
    } : g === "node" ? n.genSalt = r.node : n.genSalt = r;
  }
  function E(g, w, R, u = !1) {
    g == null && (g = Buffer.alloc(0)), Buffer.isBuffer(g) || (g = Buffer.from(g.toString()));
    const d = a(R), i = n.genSalt();
    i[11] = w.crc >>> 24 & 255, u && (i[10] = w.crc >>> 16 & 255);
    const m = Buffer.alloc(g.length + 12);
    return d(i, m), d(g, m, 12);
  }
  return ds = { decrypt: h, encrypt: E, _salter: _ }, ds;
}
var pl;
function Qm() {
  return pl || (pl = 1, Et.Deflater = Jm(), Et.Inflater = Zm(), Et.ZipCrypto = Ym()), Et;
}
var hs, yl;
function bf() {
  if (yl) return hs;
  yl = 1;
  var e = Ot(), t = Sf(), f = e.Constants, s = Qm();
  return hs = function(l, r) {
    var n = new t.EntryHeader(), c = Buffer.alloc(0), o = Buffer.alloc(0), a = !1, h = null, _ = Buffer.alloc(0), E = Buffer.alloc(0), g = !0;
    const w = l, R = typeof w.decoder == "object" ? w.decoder : e.decoder;
    g = R.hasOwnProperty("efs") ? R.efs : !1;
    function u() {
      return !r || !(r instanceof Uint8Array) ? Buffer.alloc(0) : (E = n.loadLocalHeaderFromBinary(r), r.slice(n.realDataOffset, n.realDataOffset + n.compressedSize));
    }
    function d($) {
      if (n.flags_desc) {
        const b = {}, I = n.realDataOffset + n.compressedSize;
        if (r.readUInt32LE(I) == f.LOCSIG || r.readUInt32LE(I) == f.CENSIG)
          throw e.Errors.DESCRIPTOR_NOT_EXIST();
        if (r.readUInt32LE(I) == f.EXTSIG)
          b.crc = r.readUInt32LE(I + f.EXTCRC), b.compressedSize = r.readUInt32LE(I + f.EXTSIZ), b.size = r.readUInt32LE(I + f.EXTLEN);
        else if (r.readUInt16LE(I + 12) === 19280)
          b.crc = r.readUInt32LE(I + f.EXTCRC - 4), b.compressedSize = r.readUInt32LE(I + f.EXTSIZ - 4), b.size = r.readUInt32LE(I + f.EXTLEN - 4);
        else
          throw e.Errors.DESCRIPTOR_UNKNOWN();
        if (b.compressedSize !== n.compressedSize || b.size !== n.size || b.crc !== n.crc)
          throw e.Errors.DESCRIPTOR_FAULTY();
        if (e.crc32($) !== b.crc)
          return !1;
      } else if (e.crc32($) !== n.localHeader.crc)
        return !1;
      return !0;
    }
    function i($, b, I) {
      if (typeof b > "u" && typeof $ == "string" && (I = $, $ = void 0), a)
        return $ && b && b(Buffer.alloc(0), e.Errors.DIRECTORY_CONTENT_ERROR()), Buffer.alloc(0);
      var L = u();
      if (L.length === 0)
        return $ && b && b(L), L;
      if (n.encrypted) {
        if (typeof I != "string" && !Buffer.isBuffer(I))
          throw e.Errors.INVALID_PASS_PARAM();
        L = s.ZipCrypto.decrypt(L, n, I);
      }
      var F = Buffer.alloc(n.size);
      switch (n.method) {
        case e.Constants.STORED:
          if (L.copy(F), d(F))
            return $ && b && b(F), F;
          throw $ && b && b(F, e.Errors.BAD_CRC()), e.Errors.BAD_CRC();
        case e.Constants.DEFLATED:
          var H = new s.Inflater(L, n.size);
          if ($)
            H.inflateAsync(function(U) {
              U.copy(U, 0), b && (d(U) ? b(U) : b(U, e.Errors.BAD_CRC()));
            });
          else {
            if (H.inflate(F).copy(F, 0), !d(F))
              throw e.Errors.BAD_CRC(`"${R.decode(c)}"`);
            return F;
          }
          break;
        default:
          throw $ && b && b(Buffer.alloc(0), e.Errors.UNKNOWN_METHOD()), e.Errors.UNKNOWN_METHOD();
      }
    }
    function m($, b) {
      if ((!h || !h.length) && Buffer.isBuffer(r))
        return $ && b && b(u()), u();
      if (h.length && !a) {
        var I;
        switch (n.method) {
          case e.Constants.STORED:
            return n.compressedSize = n.size, I = Buffer.alloc(h.length), h.copy(I), $ && b && b(I), I;
          default:
          case e.Constants.DEFLATED:
            var L = new s.Deflater(h);
            if ($)
              L.deflateAsync(function(H) {
                I = Buffer.alloc(H.length), n.compressedSize = H.length, H.copy(I), b && b(I);
              });
            else {
              var F = L.deflate();
              return n.compressedSize = F.length, F;
            }
            L = null;
            break;
        }
      } else if ($ && b)
        b(Buffer.alloc(0));
      else
        return Buffer.alloc(0);
    }
    function v($, b) {
      return ($.readUInt32LE(b + 4) << 4) + $.readUInt32LE(b);
    }
    function p($) {
      try {
        for (var b = 0, I, L, F; b + 4 < $.length; )
          I = $.readUInt16LE(b), b += 2, L = $.readUInt16LE(b), b += 2, F = $.slice(b, b + L), b += L, f.ID_ZIP64 === I && y(F);
      } catch {
        throw e.Errors.EXTRA_FIELD_PARSE_ERROR();
      }
    }
    function y($) {
      var b, I, L, F;
      $.length >= f.EF_ZIP64_SCOMP && (b = v($, f.EF_ZIP64_SUNCOMP), n.size === f.EF_ZIP64_OR_32 && (n.size = b)), $.length >= f.EF_ZIP64_RHO && (I = v($, f.EF_ZIP64_SCOMP), n.compressedSize === f.EF_ZIP64_OR_32 && (n.compressedSize = I)), $.length >= f.EF_ZIP64_DSN && (L = v($, f.EF_ZIP64_RHO), n.offset === f.EF_ZIP64_OR_32 && (n.offset = L)), $.length >= f.EF_ZIP64_DSN + 4 && (F = $.readUInt32LE(f.EF_ZIP64_DSN), n.diskNumStart === f.EF_ZIP64_OR_16 && (n.diskNumStart = F));
    }
    return {
      get entryName() {
        return R.decode(c);
      },
      get rawEntryName() {
        return c;
      },
      set entryName($) {
        c = e.toBuffer($, R.encode);
        var b = c[c.length - 1];
        a = b === 47 || b === 92, n.fileNameLength = c.length;
      },
      get efs() {
        return typeof g == "function" ? g(this.entryName) : g;
      },
      get extra() {
        return _;
      },
      set extra($) {
        _ = $, n.extraLength = $.length, p($);
      },
      get comment() {
        return R.decode(o);
      },
      set comment($) {
        if (o = e.toBuffer($, R.encode), n.commentLength = o.length, o.length > 65535) throw e.Errors.COMMENT_TOO_LONG();
      },
      get name() {
        var $ = R.decode(c);
        return a ? $.substr($.length - 1).split("/").pop() : $.split("/").pop();
      },
      get isDirectory() {
        return a;
      },
      getCompressedData: function() {
        return m(!1, null);
      },
      getCompressedDataAsync: function($) {
        m(!0, $);
      },
      setData: function($) {
        h = e.toBuffer($, e.decoder.encode), !a && h.length ? (n.size = h.length, n.method = e.Constants.DEFLATED, n.crc = e.crc32($), n.changed = !0) : n.method = e.Constants.STORED;
      },
      getData: function($) {
        return n.changed ? h : i(!1, null, $);
      },
      getDataAsync: function($, b) {
        n.changed ? $(h) : i(!0, $, b);
      },
      set attr($) {
        n.attr = $;
      },
      get attr() {
        return n.attr;
      },
      set header($) {
        n.loadFromBinary($);
      },
      get header() {
        return n;
      },
      packCentralHeader: function() {
        n.flags_efs = this.efs, n.extraLength = _.length;
        var $ = n.centralHeaderToBinary(), b = e.Constants.CENHDR;
        return c.copy($, b), b += c.length, _.copy($, b), b += n.extraLength, o.copy($, b), $;
      },
      packLocalHeader: function() {
        let $ = 0;
        n.flags_efs = this.efs, n.extraLocalLength = E.length;
        const b = n.localHeaderToBinary(), I = Buffer.alloc(b.length + c.length + n.extraLocalLength);
        return b.copy(I, $), $ += b.length, c.copy(I, $), $ += c.length, E.copy(I, $), $ += E.length, I;
      },
      toJSON: function() {
        const $ = function(b) {
          return "<" + (b && b.length + " bytes buffer" || "null") + ">";
        };
        return {
          entryName: this.entryName,
          name: this.name,
          comment: this.comment,
          isDirectory: this.isDirectory,
          header: n.toJSON(),
          compressedData: $(r),
          data: $(h)
        };
      },
      toString: function() {
        return JSON.stringify(this.toJSON(), null, "	");
      }
    };
  }, hs;
}
var ms, vl;
function ep() {
  if (vl) return ms;
  vl = 1;
  const e = bf(), t = Sf(), f = Ot();
  return ms = function(s, l) {
    var r = [], n = {}, c = Buffer.alloc(0), o = new t.MainHeader(), a = !1;
    const h = /* @__PURE__ */ new Set(), _ = l, { noSort: E, decoder: g } = _;
    s ? u(_.readEntries) : a = !0;
    function w() {
      const i = /* @__PURE__ */ new Set();
      for (const m of Object.keys(n)) {
        const v = m.split("/");
        if (v.pop(), !!v.length)
          for (let p = 0; p < v.length; p++) {
            const y = v.slice(0, p + 1).join("/") + "/";
            i.add(y);
          }
      }
      for (const m of i)
        if (!(m in n)) {
          const v = new e(_);
          v.entryName = m, v.attr = 16, v.temporary = !0, r.push(v), n[v.entryName] = v, h.add(v);
        }
    }
    function R() {
      if (a = !0, n = {}, o.diskEntries > (s.length - o.offset) / f.Constants.CENHDR)
        throw f.Errors.DISK_ENTRY_TOO_LARGE();
      r = new Array(o.diskEntries);
      for (var i = o.offset, m = 0; m < r.length; m++) {
        var v = i, p = new e(_, s);
        p.header = s.slice(v, v += f.Constants.CENHDR), p.entryName = s.slice(v, v += p.header.fileNameLength), p.header.extraLength && (p.extra = s.slice(v, v += p.header.extraLength)), p.header.commentLength && (p.comment = s.slice(v, v + p.header.commentLength)), i += p.header.centralHeaderSize, r[m] = p, n[p.entryName] = p;
      }
      h.clear(), w();
    }
    function u(i) {
      var m = s.length - f.Constants.ENDHDR, v = Math.max(0, m - 65535), p = v, y = s.length, $ = -1, b = 0;
      for ((typeof _.trailingSpace == "boolean" ? _.trailingSpace : !1) && (v = 0), m; m >= p; m--)
        if (s[m] === 80) {
          if (s.readUInt32LE(m) === f.Constants.ENDSIG) {
            $ = m, b = m, y = m + f.Constants.ENDHDR, p = m - f.Constants.END64HDR;
            continue;
          }
          if (s.readUInt32LE(m) === f.Constants.END64SIG) {
            p = v;
            continue;
          }
          if (s.readUInt32LE(m) === f.Constants.ZIP64SIG) {
            $ = m, y = m + f.readBigUInt64LE(s, m + f.Constants.ZIP64SIZE) + f.Constants.ZIP64LEAD;
            break;
          }
        }
      if ($ == -1) throw f.Errors.INVALID_FORMAT();
      o.loadFromBinary(s.slice($, y)), o.commentLength && (c = s.slice(b + f.Constants.ENDHDR)), i && R();
    }
    function d() {
      r.length > 1 && !E && r.sort((i, m) => i.entryName.toLowerCase().localeCompare(m.entryName.toLowerCase()));
    }
    return {
      /**
       * Returns an array of ZipEntry objects existent in the current opened archive
       * @return Array
       */
      get entries() {
        return a || R(), r.filter((i) => !h.has(i));
      },
      /**
       * Archive comment
       * @return {String}
       */
      get comment() {
        return g.decode(c);
      },
      set comment(i) {
        c = f.toBuffer(i, g.encode), o.commentLength = c.length;
      },
      getEntryCount: function() {
        return a ? r.length : o.diskEntries;
      },
      forEach: function(i) {
        this.entries.forEach(i);
      },
      /**
       * Returns a reference to the entry with the given name or null if entry is inexistent
       *
       * @param entryName
       * @return ZipEntry
       */
      getEntry: function(i) {
        return a || R(), n[i] || null;
      },
      /**
       * Adds the given entry to the entry list
       *
       * @param entry
       */
      setEntry: function(i) {
        a || R(), r.push(i), n[i.entryName] = i, o.totalEntries = r.length;
      },
      /**
       * Removes the file with the given name from the entry list.
       *
       * If the entry is a directory, then all nested files and directories will be removed
       * @param entryName
       * @returns {void}
       */
      deleteFile: function(i, m = !0) {
        a || R();
        const v = n[i];
        this.getEntryChildren(v, m).map((y) => y.entryName).forEach(this.deleteEntry);
      },
      /**
       * Removes the entry with the given name from the entry list.
       *
       * @param {string} entryName
       * @returns {void}
       */
      deleteEntry: function(i) {
        a || R();
        const m = n[i], v = r.indexOf(m);
        v >= 0 && (r.splice(v, 1), delete n[i], o.totalEntries = r.length);
      },
      /**
       *  Iterates and returns all nested files and directories of the given entry
       *
       * @param entry
       * @return Array
       */
      getEntryChildren: function(i, m = !0) {
        if (a || R(), typeof i == "object")
          if (i.isDirectory && m) {
            const v = [], p = i.entryName;
            for (const y of r)
              y.entryName.startsWith(p) && v.push(y);
            return v;
          } else
            return [i];
        return [];
      },
      /**
       *  How many child elements entry has
       *
       * @param {ZipEntry} entry
       * @return {integer}
       */
      getChildCount: function(i) {
        if (i && i.isDirectory) {
          const m = this.getEntryChildren(i);
          return m.includes(i) ? m.length - 1 : m.length;
        }
        return 0;
      },
      /**
       * Returns the zip file
       *
       * @return Buffer
       */
      compressToBuffer: function() {
        a || R(), d();
        const i = [], m = [];
        let v = 0, p = 0;
        o.size = 0, o.offset = 0;
        let y = 0;
        for (const I of this.entries) {
          const L = I.getCompressedData();
          I.header.offset = p;
          const F = I.packLocalHeader(), H = F.length + L.length;
          p += H, i.push(F), i.push(L);
          const U = I.packCentralHeader();
          m.push(U), o.size += U.length, v += H + U.length, y++;
        }
        v += o.mainHeaderSize, o.offset = p, o.totalEntries = y, p = 0;
        const $ = Buffer.alloc(v);
        for (const I of i)
          I.copy($, p), p += I.length;
        for (const I of m)
          I.copy($, p), p += I.length;
        const b = o.toBinary();
        return c && c.copy(b, f.Constants.ENDHDR), b.copy($, p), s = $, a = !1, $;
      },
      toAsyncBuffer: function(i, m, v, p) {
        try {
          a || R(), d();
          const y = [], $ = [];
          let b = 0, I = 0, L = 0;
          o.size = 0, o.offset = 0;
          const F = function(H) {
            if (H.length > 0) {
              const U = H.shift(), V = U.entryName + U.extra.toString();
              v && v(V), U.getCompressedDataAsync(function(K) {
                p && p(V), U.header.offset = I;
                const J = U.packLocalHeader(), W = J.length + K.length;
                I += W, y.push(J), y.push(K);
                const M = U.packCentralHeader();
                $.push(M), o.size += M.length, b += W + M.length, L++, F(H);
              });
            } else {
              b += o.mainHeaderSize, o.offset = I, o.totalEntries = L, I = 0;
              const U = Buffer.alloc(b);
              y.forEach(function(K) {
                K.copy(U, I), I += K.length;
              }), $.forEach(function(K) {
                K.copy(U, I), I += K.length;
              });
              const V = o.toBinary();
              c && c.copy(V, f.Constants.ENDHDR), V.copy(U, I), s = U, a = !1, i(U);
            }
          };
          F(Array.from(this.entries));
        } catch (y) {
          m(y);
        }
      }
    };
  }, ms;
}
var ps, gl;
function tp() {
  if (gl) return ps;
  gl = 1;
  const e = Ot(), t = _e, f = bf(), s = ep(), l = (...o) => e.findLast(o, (a) => typeof a == "boolean"), r = (...o) => e.findLast(o, (a) => typeof a == "string"), n = (...o) => e.findLast(o, (a) => typeof a == "function"), c = {
    // option "noSort" : if true it disables files sorting
    noSort: !1,
    // read entries during load (initial loading may be slower)
    readEntries: !1,
    // default method is none
    method: e.Constants.NONE,
    // file system
    fs: null
  };
  return ps = function(o, a) {
    let h = null;
    const _ = Object.assign(/* @__PURE__ */ Object.create(null), c);
    o && typeof o == "object" && (o instanceof Uint8Array || (Object.assign(_, o), o = _.input ? _.input : void 0, _.input && delete _.input), Buffer.isBuffer(o) && (h = o, _.method = e.Constants.BUFFER, o = void 0)), Object.assign(_, a);
    const E = new e(_);
    if ((typeof _.decoder != "object" || typeof _.decoder.encode != "function" || typeof _.decoder.decode != "function") && (_.decoder = e.decoder), o && typeof o == "string")
      if (E.fs.existsSync(o))
        _.method = e.Constants.FILE, _.filename = o, h = E.fs.readFileSync(o);
      else
        throw e.Errors.INVALID_FILENAME();
    const g = new s(h, _), { canonical: w, sanitize: R, zipnamefix: u } = e;
    function d(p) {
      if (p && g) {
        var y;
        if (typeof p == "string" && (y = g.getEntry(t.posix.normalize(p))), typeof p == "object" && typeof p.entryName < "u" && typeof p.header < "u" && (y = g.getEntry(p.entryName)), y)
          return y;
      }
      return null;
    }
    function i(p) {
      const { join: y, normalize: $, sep: b } = t.posix;
      return y(".", $(b + p.split("\\").join(b) + b));
    }
    function m(p) {
      return p instanceof RegExp ? /* @__PURE__ */ function(y) {
        return function($) {
          return y.test($);
        };
      }(p) : typeof p != "function" ? () => !0 : p;
    }
    const v = (p, y) => {
      let $ = y.slice(-1);
      return $ = $ === E.sep ? E.sep : "", t.relative(p, y) + $;
    };
    return {
      /**
       * Extracts the given entry from the archive and returns the content as a Buffer object
       * @param {ZipEntry|string} entry ZipEntry object or String with the full path of the entry
       * @param {Buffer|string} [pass] - password
       * @return Buffer or Null in case of error
       */
      readFile: function(p, y) {
        var $ = d(p);
        return $ && $.getData(y) || null;
      },
      /**
       * Returns how many child elements has on entry (directories) on files it is always 0
       * @param {ZipEntry|string} entry ZipEntry object or String with the full path of the entry
       * @returns {integer}
       */
      childCount: function(p) {
        const y = d(p);
        if (y)
          return g.getChildCount(y);
      },
      /**
       * Asynchronous readFile
       * @param {ZipEntry|string} entry ZipEntry object or String with the full path of the entry
       * @param {callback} callback
       *
       * @return Buffer or Null in case of error
       */
      readFileAsync: function(p, y) {
        var $ = d(p);
        $ ? $.getDataAsync(y) : y(null, "getEntry failed for:" + p);
      },
      /**
       * Extracts the given entry from the archive and returns the content as plain text in the given encoding
       * @param {ZipEntry|string} entry - ZipEntry object or String with the full path of the entry
       * @param {string} encoding - Optional. If no encoding is specified utf8 is used
       *
       * @return String
       */
      readAsText: function(p, y) {
        var $ = d(p);
        if ($) {
          var b = $.getData();
          if (b && b.length)
            return b.toString(y || "utf8");
        }
        return "";
      },
      /**
       * Asynchronous readAsText
       * @param {ZipEntry|string} entry ZipEntry object or String with the full path of the entry
       * @param {callback} callback
       * @param {string} [encoding] - Optional. If no encoding is specified utf8 is used
       *
       * @return String
       */
      readAsTextAsync: function(p, y, $) {
        var b = d(p);
        b ? b.getDataAsync(function(I, L) {
          if (L) {
            y(I, L);
            return;
          }
          I && I.length ? y(I.toString($ || "utf8")) : y("");
        }) : y("");
      },
      /**
       * Remove the entry from the file or the entry and all it's nested directories and files if the given entry is a directory
       *
       * @param {ZipEntry|string} entry
       * @returns {void}
       */
      deleteFile: function(p, y = !0) {
        var $ = d(p);
        $ && g.deleteFile($.entryName, y);
      },
      /**
       * Remove the entry from the file or directory without affecting any nested entries
       *
       * @param {ZipEntry|string} entry
       * @returns {void}
       */
      deleteEntry: function(p) {
        var y = d(p);
        y && g.deleteEntry(y.entryName);
      },
      /**
       * Adds a comment to the zip. The zip must be rewritten after adding the comment.
       *
       * @param {string} comment
       */
      addZipComment: function(p) {
        g.comment = p;
      },
      /**
       * Returns the zip comment
       *
       * @return String
       */
      getZipComment: function() {
        return g.comment || "";
      },
      /**
       * Adds a comment to a specified zipEntry. The zip must be rewritten after adding the comment
       * The comment cannot exceed 65535 characters in length
       *
       * @param {ZipEntry} entry
       * @param {string} comment
       */
      addZipEntryComment: function(p, y) {
        var $ = d(p);
        $ && ($.comment = y);
      },
      /**
       * Returns the comment of the specified entry
       *
       * @param {ZipEntry} entry
       * @return String
       */
      getZipEntryComment: function(p) {
        var y = d(p);
        return y && y.comment || "";
      },
      /**
       * Updates the content of an existing entry inside the archive. The zip must be rewritten after updating the content
       *
       * @param {ZipEntry} entry
       * @param {Buffer} content
       */
      updateFile: function(p, y) {
        var $ = d(p);
        $ && $.setData(y);
      },
      /**
       * Adds a file from the disk to the archive
       *
       * @param {string} localPath File to add to zip
       * @param {string} [zipPath] Optional path inside the zip
       * @param {string} [zipName] Optional name for the file
       * @param {string} [comment] Optional file comment
       */
      addLocalFile: function(p, y, $, b) {
        if (E.fs.existsSync(p)) {
          y = y ? i(y) : "";
          const I = t.win32.basename(t.win32.normalize(p));
          y += $ || I;
          const L = E.fs.statSync(p), F = L.isFile() ? E.fs.readFileSync(p) : Buffer.alloc(0);
          L.isDirectory() && (y += E.sep), this.addFile(y, F, b, L);
        } else
          throw e.Errors.FILE_NOT_FOUND(p);
      },
      /**
       * Callback for showing if everything was done.
       *
       * @callback doneCallback
       * @param {Error} err - Error object
       * @param {boolean} done - was request fully completed
       */
      /**
       * Adds a file from the disk to the archive
       *
       * @param {(object|string)} options - options object, if it is string it us used as localPath.
       * @param {string} options.localPath - Local path to the file.
       * @param {string} [options.comment] - Optional file comment.
       * @param {string} [options.zipPath] - Optional path inside the zip
       * @param {string} [options.zipName] - Optional name for the file
       * @param {doneCallback} callback - The callback that handles the response.
       */
      addLocalFileAsync: function(p, y) {
        p = typeof p == "object" ? p : { localPath: p };
        const $ = t.resolve(p.localPath), { comment: b } = p;
        let { zipPath: I, zipName: L } = p;
        const F = this;
        E.fs.stat($, function(H, U) {
          if (H) return y(H, !1);
          I = I ? i(I) : "";
          const V = t.win32.basename(t.win32.normalize($));
          if (I += L || V, U.isFile())
            E.fs.readFile($, function(K, J) {
              return K ? y(K, !1) : (F.addFile(I, J, b, U), setImmediate(y, void 0, !0));
            });
          else if (U.isDirectory())
            return I += E.sep, F.addFile(I, Buffer.alloc(0), b, U), setImmediate(y, void 0, !0);
        });
      },
      /**
       * Adds a local directory and all its nested files and directories to the archive
       *
       * @param {string} localPath - local path to the folder
       * @param {string} [zipPath] - optional path inside zip
       * @param {(RegExp|function)} [filter] - optional RegExp or Function if files match will be included.
       */
      addLocalFolder: function(p, y, $) {
        if ($ = m($), y = y ? i(y) : "", p = t.normalize(p), E.fs.existsSync(p)) {
          const b = E.findFiles(p), I = this;
          if (b.length)
            for (const L of b) {
              const F = t.join(y, v(p, L));
              $(F) && I.addLocalFile(L, t.dirname(F));
            }
        } else
          throw e.Errors.FILE_NOT_FOUND(p);
      },
      /**
       * Asynchronous addLocalFolder
       * @param {string} localPath
       * @param {callback} callback
       * @param {string} [zipPath] optional path inside zip
       * @param {RegExp|function} [filter] optional RegExp or Function if files match will
       *               be included.
       */
      addLocalFolderAsync: function(p, y, $, b) {
        b = m(b), $ = $ ? i($) : "", p = t.normalize(p);
        var I = this;
        E.fs.open(p, "r", function(L) {
          if (L && L.code === "ENOENT")
            y(void 0, e.Errors.FILE_NOT_FOUND(p));
          else if (L)
            y(void 0, L);
          else {
            var F = E.findFiles(p), H = -1, U = function() {
              if (H += 1, H < F.length) {
                var V = F[H], K = v(p, V).split("\\").join("/");
                K = K.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^\x20-\x7E]/g, ""), b(K) ? E.fs.stat(V, function(J, W) {
                  J && y(void 0, J), W.isFile() ? E.fs.readFile(V, function(M, G) {
                    M ? y(void 0, M) : (I.addFile($ + K, G, "", W), U());
                  }) : (I.addFile($ + K + "/", Buffer.alloc(0), "", W), U());
                }) : process.nextTick(() => {
                  U();
                });
              } else
                y(!0, void 0);
            };
            U();
          }
        });
      },
      /**
       * Adds a local directory and all its nested files and directories to the archive
       *
       * @param {object | string} options - options object, if it is string it us used as localPath.
       * @param {string} options.localPath - Local path to the folder.
       * @param {string} [options.zipPath] - optional path inside zip.
       * @param {RegExp|function} [options.filter] - optional RegExp or Function if files match will be included.
       * @param {function|string} [options.namefix] - optional function to help fix filename
       * @param {doneCallback} callback - The callback that handles the response.
       *
       */
      addLocalFolderAsync2: function(p, y) {
        const $ = this;
        p = typeof p == "object" ? p : { localPath: p }, localPath = t.resolve(i(p.localPath));
        let { zipPath: b, filter: I, namefix: L } = p;
        I instanceof RegExp ? I = /* @__PURE__ */ function(U) {
          return function(V) {
            return U.test(V);
          };
        }(I) : typeof I != "function" && (I = function() {
          return !0;
        }), b = b ? i(b) : "", L == "latin1" && (L = (U) => U.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^\x20-\x7E]/g, "")), typeof L != "function" && (L = (U) => U);
        const F = (U) => t.join(b, L(v(localPath, U))), H = (U) => t.win32.basename(t.win32.normalize(L(U)));
        E.fs.open(localPath, "r", function(U) {
          U && U.code === "ENOENT" ? y(void 0, e.Errors.FILE_NOT_FOUND(localPath)) : U ? y(void 0, U) : E.findFilesAsync(localPath, function(V, K) {
            if (V) return y(V);
            K = K.filter((J) => I(F(J))), K.length || y(void 0, !1), setImmediate(
              K.reverse().reduce(function(J, W) {
                return function(M, G) {
                  if (M || G === !1) return setImmediate(J, M, !1);
                  $.addLocalFileAsync(
                    {
                      localPath: W,
                      zipPath: t.dirname(F(W)),
                      zipName: H(W)
                    },
                    J
                  );
                };
              }, y)
            );
          });
        });
      },
      /**
       * Adds a local directory and all its nested files and directories to the archive
       *
       * @param {string} localPath - path where files will be extracted
       * @param {object} props - optional properties
       * @param {string} [props.zipPath] - optional path inside zip
       * @param {RegExp|function} [props.filter] - optional RegExp or Function if files match will be included.
       * @param {function|string} [props.namefix] - optional function to help fix filename
       */
      addLocalFolderPromise: function(p, y) {
        return new Promise(($, b) => {
          this.addLocalFolderAsync2(Object.assign({ localPath: p }, y), (I, L) => {
            I && b(I), L && $(this);
          });
        });
      },
      /**
       * Allows you to create a entry (file or directory) in the zip file.
       * If you want to create a directory the entryName must end in / and a null buffer should be provided.
       * Comment and attributes are optional
       *
       * @param {string} entryName
       * @param {Buffer | string} content - file content as buffer or utf8 coded string
       * @param {string} [comment] - file comment
       * @param {number | object} [attr] - number as unix file permissions, object as filesystem Stats object
       */
      addFile: function(p, y, $, b) {
        p = u(p);
        let I = d(p);
        const L = I != null;
        L || (I = new f(_), I.entryName = p), I.comment = $ || "";
        const F = typeof b == "object" && b instanceof E.fs.Stats;
        F && (I.header.time = b.mtime);
        var H = I.isDirectory ? 16 : 0;
        let U = I.isDirectory ? 16384 : 32768;
        return F ? U |= 4095 & b.mode : typeof b == "number" ? U |= 4095 & b : U |= I.isDirectory ? 493 : 420, H = (H | U << 16) >>> 0, I.attr = H, I.setData(y), L || g.setEntry(I), I;
      },
      /**
       * Returns an array of ZipEntry objects representing the files and folders inside the archive
       *
       * @param {string} [password]
       * @returns Array
       */
      getEntries: function(p) {
        return g.password = p, g ? g.entries : [];
      },
      /**
       * Returns a ZipEntry object representing the file or folder specified by ``name``.
       *
       * @param {string} name
       * @return ZipEntry
       */
      getEntry: function(p) {
        return d(p);
      },
      getEntryCount: function() {
        return g.getEntryCount();
      },
      forEach: function(p) {
        return g.forEach(p);
      },
      /**
       * Extracts the given entry to the given targetPath
       * If the entry is a directory inside the archive, the entire directory and it's subdirectories will be extracted
       *
       * @param {string|ZipEntry} entry - ZipEntry object or String with the full path of the entry
       * @param {string} targetPath - Target folder where to write the file
       * @param {boolean} [maintainEntryPath=true] - If maintainEntryPath is true and the entry is inside a folder, the entry folder will be created in targetPath as well. Default is TRUE
       * @param {boolean} [overwrite=false] - If the file already exists at the target path, the file will be overwriten if this is true.
       * @param {boolean} [keepOriginalPermission=false] - The file will be set as the permission from the entry if this is true.
       * @param {string} [outFileName] - String If set will override the filename of the extracted file (Only works if the entry is a file)
       *
       * @return Boolean
       */
      extractEntryTo: function(p, y, $, b, I, L) {
        b = l(!1, b), I = l(!1, I), $ = l(!0, $), L = r(I, L);
        var F = d(p);
        if (!F)
          throw e.Errors.NO_ENTRY();
        var H = w(F.entryName), U = R(y, L && !F.isDirectory ? L : $ ? H : t.basename(H));
        if (F.isDirectory) {
          var V = g.getEntryChildren(F);
          return V.forEach(function(W) {
            if (W.isDirectory) return;
            var M = W.getData();
            if (!M)
              throw e.Errors.CANT_EXTRACT_FILE();
            var G = w(W.entryName), A = R(y, $ ? G : t.basename(G));
            const T = I ? W.header.fileAttr : void 0;
            E.writeFileTo(A, M, b, T);
          }), !0;
        }
        var K = F.getData(g.password);
        if (!K) throw e.Errors.CANT_EXTRACT_FILE();
        if (E.fs.existsSync(U) && !b)
          throw e.Errors.CANT_OVERRIDE();
        const J = I ? p.header.fileAttr : void 0;
        return E.writeFileTo(U, K, b, J), !0;
      },
      /**
       * Test the archive
       * @param {string} [pass]
       */
      test: function(p) {
        if (!g)
          return !1;
        for (var y in g.entries)
          try {
            if (y.isDirectory)
              continue;
            var $ = g.entries[y].getData(p);
            if (!$)
              return !1;
          } catch {
            return !1;
          }
        return !0;
      },
      /**
       * Extracts the entire archive to the given location
       *
       * @param {string} targetPath Target location
       * @param {boolean} [overwrite=false] If the file already exists at the target path, the file will be overwriten if this is true.
       *                  Default is FALSE
       * @param {boolean} [keepOriginalPermission=false] The file will be set as the permission from the entry if this is true.
       *                  Default is FALSE
       * @param {string|Buffer} [pass] password
       */
      extractAllTo: function(p, y, $, b) {
        if ($ = l(!1, $), b = r($, b), y = l(!1, y), !g) throw e.Errors.NO_ZIP();
        g.entries.forEach(function(I) {
          var L = R(p, w(I.entryName));
          if (I.isDirectory) {
            E.makeDir(L);
            return;
          }
          var F = I.getData(b);
          if (!F)
            throw e.Errors.CANT_EXTRACT_FILE();
          const H = $ ? I.header.fileAttr : void 0;
          E.writeFileTo(L, F, y, H);
          try {
            E.fs.utimesSync(L, I.header.time, I.header.time);
          } catch {
            throw e.Errors.CANT_EXTRACT_FILE();
          }
        });
      },
      /**
       * Asynchronous extractAllTo
       *
       * @param {string} targetPath Target location
       * @param {boolean} [overwrite=false] If the file already exists at the target path, the file will be overwriten if this is true.
       *                  Default is FALSE
       * @param {boolean} [keepOriginalPermission=false] The file will be set as the permission from the entry if this is true.
       *                  Default is FALSE
       * @param {function} callback The callback will be executed when all entries are extracted successfully or any error is thrown.
       */
      extractAllToAsync: function(p, y, $, b) {
        if (b = n(y, $, b), $ = l(!1, $), y = l(!1, y), !b)
          return new Promise((U, V) => {
            this.extractAllToAsync(p, y, $, function(K) {
              K ? V(K) : U(this);
            });
          });
        if (!g) {
          b(e.Errors.NO_ZIP());
          return;
        }
        p = t.resolve(p);
        const I = (U) => R(p, t.normalize(w(U.entryName))), L = (U, V) => new Error(U + ': "' + V + '"'), F = [], H = [];
        g.entries.forEach((U) => {
          U.isDirectory ? F.push(U) : H.push(U);
        });
        for (const U of F) {
          const V = I(U), K = $ ? U.header.fileAttr : void 0;
          try {
            E.makeDir(V), K && E.fs.chmodSync(V, K), E.fs.utimesSync(V, U.header.time, U.header.time);
          } catch {
            b(L("Unable to create folder", V));
          }
        }
        H.reverse().reduce(function(U, V) {
          return function(K) {
            if (K)
              U(K);
            else {
              const J = t.normalize(w(V.entryName)), W = R(p, J);
              V.getDataAsync(function(M, G) {
                if (G)
                  U(G);
                else if (!M)
                  U(e.Errors.CANT_EXTRACT_FILE());
                else {
                  const A = $ ? V.header.fileAttr : void 0;
                  E.writeFileToAsync(W, M, y, A, function(T) {
                    T || U(L("Unable to write file", W)), E.fs.utimes(W, V.header.time, V.header.time, function(q) {
                      q ? U(L("Unable to set times", W)) : U();
                    });
                  });
                }
              });
            }
          };
        }, b)();
      },
      /**
       * Writes the newly created zip file to disk at the specified location or if a zip was opened and no ``targetFileName`` is provided, it will overwrite the opened zip
       *
       * @param {string} targetFileName
       * @param {function} callback
       */
      writeZip: function(p, y) {
        if (arguments.length === 1 && typeof p == "function" && (y = p, p = ""), !p && _.filename && (p = _.filename), !!p) {
          var $ = g.compressToBuffer();
          if ($) {
            var b = E.writeFileTo(p, $, !0);
            typeof y == "function" && y(b ? null : new Error("failed"), "");
          }
        }
      },
      /**
      	         *
      	         * @param {string} targetFileName
      	         * @param {object} [props]
      	         * @param {boolean} [props.overwrite=true] If the file already exists at the target path, the file will be overwriten if this is true.
      	         * @param {boolean} [props.perm] The file will be set as the permission from the entry if this is true.
      
      	         * @returns {Promise<void>}
      	         */
      writeZipPromise: function(p, y) {
        const { overwrite: $, perm: b } = Object.assign({ overwrite: !0 }, y);
        return new Promise((I, L) => {
          !p && _.filename && (p = _.filename), p || L("ADM-ZIP: ZIP File Name Missing"), this.toBufferPromise().then((F) => {
            const H = (U) => U ? I(U) : L("ADM-ZIP: Wasn't able to write zip file");
            E.writeFileToAsync(p, F, $, b, H);
          }, L);
        });
      },
      /**
       * @returns {Promise<Buffer>} A promise to the Buffer.
       */
      toBufferPromise: function() {
        return new Promise((p, y) => {
          g.toAsyncBuffer(p, y);
        });
      },
      /**
       * Returns the content of the entire zip file as a Buffer object
       *
       * @prop {function} [onSuccess]
       * @prop {function} [onFail]
       * @prop {function} [onItemStart]
       * @prop {function} [onItemEnd]
       * @returns {Buffer}
       */
      toBuffer: function(p, y, $, b) {
        return typeof p == "function" ? (g.toAsyncBuffer(p, y, $, b), null) : g.compressToBuffer();
      }
    };
  }, ps;
}
var rp = tp();
const _l = /* @__PURE__ */ nf(rp);
var ys = {}, vn = {}, $l;
function Se() {
  return $l || ($l = 1, vn.fromCallback = function(e) {
    return Object.defineProperty(function(...t) {
      if (typeof t[t.length - 1] == "function") e.apply(this, t);
      else
        return new Promise((f, s) => {
          t.push((l, r) => l != null ? s(l) : f(r)), e.apply(this, t);
        });
    }, "name", { value: e.name });
  }, vn.fromPromise = function(e) {
    return Object.defineProperty(function(...t) {
      const f = t[t.length - 1];
      if (typeof f != "function") return e.apply(this, t);
      t.pop(), e.apply(this, t).then((s) => f(null, s), f);
    }, "name", { value: e.name });
  }), vn;
}
var vs, El;
function np() {
  if (El) return vs;
  El = 1;
  var e = Af, t = process.cwd, f = null, s = process.env.GRACEFUL_FS_PLATFORM || process.platform;
  process.cwd = function() {
    return f || (f = t.call(process)), f;
  };
  try {
    process.cwd();
  } catch {
  }
  if (typeof process.chdir == "function") {
    var l = process.chdir;
    process.chdir = function(n) {
      f = null, l.call(process, n);
    }, Object.setPrototypeOf && Object.setPrototypeOf(process.chdir, l);
  }
  vs = r;
  function r(n) {
    e.hasOwnProperty("O_SYMLINK") && process.version.match(/^v0\.6\.[0-2]|^v0\.5\./) && c(n), n.lutimes || o(n), n.chown = _(n.chown), n.fchown = _(n.fchown), n.lchown = _(n.lchown), n.chmod = a(n.chmod), n.fchmod = a(n.fchmod), n.lchmod = a(n.lchmod), n.chownSync = E(n.chownSync), n.fchownSync = E(n.fchownSync), n.lchownSync = E(n.lchownSync), n.chmodSync = h(n.chmodSync), n.fchmodSync = h(n.fchmodSync), n.lchmodSync = h(n.lchmodSync), n.stat = g(n.stat), n.fstat = g(n.fstat), n.lstat = g(n.lstat), n.statSync = w(n.statSync), n.fstatSync = w(n.fstatSync), n.lstatSync = w(n.lstatSync), n.chmod && !n.lchmod && (n.lchmod = function(u, d, i) {
      i && process.nextTick(i);
    }, n.lchmodSync = function() {
    }), n.chown && !n.lchown && (n.lchown = function(u, d, i, m) {
      m && process.nextTick(m);
    }, n.lchownSync = function() {
    }), s === "win32" && (n.rename = typeof n.rename != "function" ? n.rename : function(u) {
      function d(i, m, v) {
        var p = Date.now(), y = 0;
        u(i, m, function $(b) {
          if (b && (b.code === "EACCES" || b.code === "EPERM" || b.code === "EBUSY") && Date.now() - p < 6e4) {
            setTimeout(function() {
              n.stat(m, function(I, L) {
                I && I.code === "ENOENT" ? u(i, m, $) : v(b);
              });
            }, y), y < 100 && (y += 10);
            return;
          }
          v && v(b);
        });
      }
      return Object.setPrototypeOf && Object.setPrototypeOf(d, u), d;
    }(n.rename)), n.read = typeof n.read != "function" ? n.read : function(u) {
      function d(i, m, v, p, y, $) {
        var b;
        if ($ && typeof $ == "function") {
          var I = 0;
          b = function(L, F, H) {
            if (L && L.code === "EAGAIN" && I < 10)
              return I++, u.call(n, i, m, v, p, y, b);
            $.apply(this, arguments);
          };
        }
        return u.call(n, i, m, v, p, y, b);
      }
      return Object.setPrototypeOf && Object.setPrototypeOf(d, u), d;
    }(n.read), n.readSync = typeof n.readSync != "function" ? n.readSync : /* @__PURE__ */ function(u) {
      return function(d, i, m, v, p) {
        for (var y = 0; ; )
          try {
            return u.call(n, d, i, m, v, p);
          } catch ($) {
            if ($.code === "EAGAIN" && y < 10) {
              y++;
              continue;
            }
            throw $;
          }
      };
    }(n.readSync);
    function c(u) {
      u.lchmod = function(d, i, m) {
        u.open(
          d,
          e.O_WRONLY | e.O_SYMLINK,
          i,
          function(v, p) {
            if (v) {
              m && m(v);
              return;
            }
            u.fchmod(p, i, function(y) {
              u.close(p, function($) {
                m && m(y || $);
              });
            });
          }
        );
      }, u.lchmodSync = function(d, i) {
        var m = u.openSync(d, e.O_WRONLY | e.O_SYMLINK, i), v = !0, p;
        try {
          p = u.fchmodSync(m, i), v = !1;
        } finally {
          if (v)
            try {
              u.closeSync(m);
            } catch {
            }
          else
            u.closeSync(m);
        }
        return p;
      };
    }
    function o(u) {
      e.hasOwnProperty("O_SYMLINK") && u.futimes ? (u.lutimes = function(d, i, m, v) {
        u.open(d, e.O_SYMLINK, function(p, y) {
          if (p) {
            v && v(p);
            return;
          }
          u.futimes(y, i, m, function($) {
            u.close(y, function(b) {
              v && v($ || b);
            });
          });
        });
      }, u.lutimesSync = function(d, i, m) {
        var v = u.openSync(d, e.O_SYMLINK), p, y = !0;
        try {
          p = u.futimesSync(v, i, m), y = !1;
        } finally {
          if (y)
            try {
              u.closeSync(v);
            } catch {
            }
          else
            u.closeSync(v);
        }
        return p;
      }) : u.futimes && (u.lutimes = function(d, i, m, v) {
        v && process.nextTick(v);
      }, u.lutimesSync = function() {
      });
    }
    function a(u) {
      return u && function(d, i, m) {
        return u.call(n, d, i, function(v) {
          R(v) && (v = null), m && m.apply(this, arguments);
        });
      };
    }
    function h(u) {
      return u && function(d, i) {
        try {
          return u.call(n, d, i);
        } catch (m) {
          if (!R(m)) throw m;
        }
      };
    }
    function _(u) {
      return u && function(d, i, m, v) {
        return u.call(n, d, i, m, function(p) {
          R(p) && (p = null), v && v.apply(this, arguments);
        });
      };
    }
    function E(u) {
      return u && function(d, i, m) {
        try {
          return u.call(n, d, i, m);
        } catch (v) {
          if (!R(v)) throw v;
        }
      };
    }
    function g(u) {
      return u && function(d, i, m) {
        typeof i == "function" && (m = i, i = null);
        function v(p, y) {
          y && (y.uid < 0 && (y.uid += 4294967296), y.gid < 0 && (y.gid += 4294967296)), m && m.apply(this, arguments);
        }
        return i ? u.call(n, d, i, v) : u.call(n, d, v);
      };
    }
    function w(u) {
      return u && function(d, i) {
        var m = i ? u.call(n, d, i) : u.call(n, d);
        return m && (m.uid < 0 && (m.uid += 4294967296), m.gid < 0 && (m.gid += 4294967296)), m;
      };
    }
    function R(u) {
      if (!u || u.code === "ENOSYS")
        return !0;
      var d = !process.getuid || process.getuid() !== 0;
      return !!(d && (u.code === "EINVAL" || u.code === "EPERM"));
    }
  }
  return vs;
}
var gs, wl;
function ip() {
  if (wl) return gs;
  wl = 1;
  var e = Lf.Stream;
  gs = t;
  function t(f) {
    return {
      ReadStream: s,
      WriteStream: l
    };
    function s(r, n) {
      if (!(this instanceof s)) return new s(r, n);
      e.call(this);
      var c = this;
      this.path = r, this.fd = null, this.readable = !0, this.paused = !1, this.flags = "r", this.mode = 438, this.bufferSize = 64 * 1024, n = n || {};
      for (var o = Object.keys(n), a = 0, h = o.length; a < h; a++) {
        var _ = o[a];
        this[_] = n[_];
      }
      if (this.encoding && this.setEncoding(this.encoding), this.start !== void 0) {
        if (typeof this.start != "number")
          throw TypeError("start must be a Number");
        if (this.end === void 0)
          this.end = 1 / 0;
        else if (typeof this.end != "number")
          throw TypeError("end must be a Number");
        if (this.start > this.end)
          throw new Error("start must be <= end");
        this.pos = this.start;
      }
      if (this.fd !== null) {
        process.nextTick(function() {
          c._read();
        });
        return;
      }
      f.open(this.path, this.flags, this.mode, function(E, g) {
        if (E) {
          c.emit("error", E), c.readable = !1;
          return;
        }
        c.fd = g, c.emit("open", g), c._read();
      });
    }
    function l(r, n) {
      if (!(this instanceof l)) return new l(r, n);
      e.call(this), this.path = r, this.fd = null, this.writable = !0, this.flags = "w", this.encoding = "binary", this.mode = 438, this.bytesWritten = 0, n = n || {};
      for (var c = Object.keys(n), o = 0, a = c.length; o < a; o++) {
        var h = c[o];
        this[h] = n[h];
      }
      if (this.start !== void 0) {
        if (typeof this.start != "number")
          throw TypeError("start must be a Number");
        if (this.start < 0)
          throw new Error("start must be >= zero");
        this.pos = this.start;
      }
      this.busy = !1, this._queue = [], this.fd === null && (this._open = f.open, this._queue.push([this._open, this.path, this.flags, this.mode, void 0]), this.flush());
    }
  }
  return gs;
}
var _s, Sl;
function sp() {
  if (Sl) return _s;
  Sl = 1, _s = t;
  var e = Object.getPrototypeOf || function(f) {
    return f.__proto__;
  };
  function t(f) {
    if (f === null || typeof f != "object")
      return f;
    if (f instanceof Object)
      var s = { __proto__: e(f) };
    else
      var s = /* @__PURE__ */ Object.create(null);
    return Object.getOwnPropertyNames(f).forEach(function(l) {
      Object.defineProperty(s, l, Object.getOwnPropertyDescriptor(f, l));
    }), s;
  }
  return _s;
}
var gn, bl;
function Nt() {
  if (bl) return gn;
  bl = 1;
  var e = ft, t = np(), f = ip(), s = sp(), l = Hs, r, n;
  typeof Symbol == "function" && typeof Symbol.for == "function" ? (r = Symbol.for("graceful-fs.queue"), n = Symbol.for("graceful-fs.previous")) : (r = "___graceful-fs.queue", n = "___graceful-fs.previous");
  function c() {
  }
  function o(u, d) {
    Object.defineProperty(u, r, {
      get: function() {
        return d;
      }
    });
  }
  var a = c;
  if (l.debuglog ? a = l.debuglog("gfs4") : /\bgfs4\b/i.test(process.env.NODE_DEBUG || "") && (a = function() {
    var u = l.format.apply(l, arguments);
    u = "GFS4: " + u.split(/\n/).join(`
GFS4: `), console.error(u);
  }), !e[r]) {
    var h = bt[r] || [];
    o(e, h), e.close = function(u) {
      function d(i, m) {
        return u.call(e, i, function(v) {
          v || w(), typeof m == "function" && m.apply(this, arguments);
        });
      }
      return Object.defineProperty(d, n, {
        value: u
      }), d;
    }(e.close), e.closeSync = function(u) {
      function d(i) {
        u.apply(e, arguments), w();
      }
      return Object.defineProperty(d, n, {
        value: u
      }), d;
    }(e.closeSync), /\bgfs4\b/i.test(process.env.NODE_DEBUG || "") && process.on("exit", function() {
      a(e[r]), tf.equal(e[r].length, 0);
    });
  }
  bt[r] || o(bt, e[r]), gn = _(s(e)), process.env.TEST_GRACEFUL_FS_GLOBAL_PATCH && !e.__patched && (gn = _(e), e.__patched = !0);
  function _(u) {
    t(u), u.gracefulify = _, u.createReadStream = T, u.createWriteStream = q;
    var d = u.readFile;
    u.readFile = i;
    function i(P, O, B) {
      return typeof O == "function" && (B = O, O = null), x(P, O, B);
      function x(Q, Z, N, D) {
        return d(Q, Z, function(k) {
          k && (k.code === "EMFILE" || k.code === "ENFILE") ? E([x, [Q, Z, N], k, D || Date.now(), Date.now()]) : typeof N == "function" && N.apply(this, arguments);
        });
      }
    }
    var m = u.writeFile;
    u.writeFile = v;
    function v(P, O, B, x) {
      return typeof B == "function" && (x = B, B = null), Q(P, O, B, x);
      function Q(Z, N, D, k, j) {
        return m(Z, N, D, function(z) {
          z && (z.code === "EMFILE" || z.code === "ENFILE") ? E([Q, [Z, N, D, k], z, j || Date.now(), Date.now()]) : typeof k == "function" && k.apply(this, arguments);
        });
      }
    }
    var p = u.appendFile;
    p && (u.appendFile = y);
    function y(P, O, B, x) {
      return typeof B == "function" && (x = B, B = null), Q(P, O, B, x);
      function Q(Z, N, D, k, j) {
        return p(Z, N, D, function(z) {
          z && (z.code === "EMFILE" || z.code === "ENFILE") ? E([Q, [Z, N, D, k], z, j || Date.now(), Date.now()]) : typeof k == "function" && k.apply(this, arguments);
        });
      }
    }
    var $ = u.copyFile;
    $ && (u.copyFile = b);
    function b(P, O, B, x) {
      return typeof B == "function" && (x = B, B = 0), Q(P, O, B, x);
      function Q(Z, N, D, k, j) {
        return $(Z, N, D, function(z) {
          z && (z.code === "EMFILE" || z.code === "ENFILE") ? E([Q, [Z, N, D, k], z, j || Date.now(), Date.now()]) : typeof k == "function" && k.apply(this, arguments);
        });
      }
    }
    var I = u.readdir;
    u.readdir = F;
    var L = /^v[0-5]\./;
    function F(P, O, B) {
      typeof O == "function" && (B = O, O = null);
      var x = L.test(process.version) ? function(N, D, k, j) {
        return I(N, Q(
          N,
          D,
          k,
          j
        ));
      } : function(N, D, k, j) {
        return I(N, D, Q(
          N,
          D,
          k,
          j
        ));
      };
      return x(P, O, B);
      function Q(Z, N, D, k) {
        return function(j, z) {
          j && (j.code === "EMFILE" || j.code === "ENFILE") ? E([
            x,
            [Z, N, D],
            j,
            k || Date.now(),
            Date.now()
          ]) : (z && z.sort && z.sort(), typeof D == "function" && D.call(this, j, z));
        };
      }
    }
    if (process.version.substr(0, 4) === "v0.8") {
      var H = f(u);
      W = H.ReadStream, G = H.WriteStream;
    }
    var U = u.ReadStream;
    U && (W.prototype = Object.create(U.prototype), W.prototype.open = M);
    var V = u.WriteStream;
    V && (G.prototype = Object.create(V.prototype), G.prototype.open = A), Object.defineProperty(u, "ReadStream", {
      get: function() {
        return W;
      },
      set: function(P) {
        W = P;
      },
      enumerable: !0,
      configurable: !0
    }), Object.defineProperty(u, "WriteStream", {
      get: function() {
        return G;
      },
      set: function(P) {
        G = P;
      },
      enumerable: !0,
      configurable: !0
    });
    var K = W;
    Object.defineProperty(u, "FileReadStream", {
      get: function() {
        return K;
      },
      set: function(P) {
        K = P;
      },
      enumerable: !0,
      configurable: !0
    });
    var J = G;
    Object.defineProperty(u, "FileWriteStream", {
      get: function() {
        return J;
      },
      set: function(P) {
        J = P;
      },
      enumerable: !0,
      configurable: !0
    });
    function W(P, O) {
      return this instanceof W ? (U.apply(this, arguments), this) : W.apply(Object.create(W.prototype), arguments);
    }
    function M() {
      var P = this;
      S(P.path, P.flags, P.mode, function(O, B) {
        O ? (P.autoClose && P.destroy(), P.emit("error", O)) : (P.fd = B, P.emit("open", B), P.read());
      });
    }
    function G(P, O) {
      return this instanceof G ? (V.apply(this, arguments), this) : G.apply(Object.create(G.prototype), arguments);
    }
    function A() {
      var P = this;
      S(P.path, P.flags, P.mode, function(O, B) {
        O ? (P.destroy(), P.emit("error", O)) : (P.fd = B, P.emit("open", B));
      });
    }
    function T(P, O) {
      return new u.ReadStream(P, O);
    }
    function q(P, O) {
      return new u.WriteStream(P, O);
    }
    var C = u.open;
    u.open = S;
    function S(P, O, B, x) {
      return typeof B == "function" && (x = B, B = null), Q(P, O, B, x);
      function Q(Z, N, D, k, j) {
        return C(Z, N, D, function(z, Y) {
          z && (z.code === "EMFILE" || z.code === "ENFILE") ? E([Q, [Z, N, D, k], z, j || Date.now(), Date.now()]) : typeof k == "function" && k.apply(this, arguments);
        });
      }
    }
    return u;
  }
  function E(u) {
    a("ENQUEUE", u[0].name, u[1]), e[r].push(u), R();
  }
  var g;
  function w() {
    for (var u = Date.now(), d = 0; d < e[r].length; ++d)
      e[r][d].length > 2 && (e[r][d][3] = u, e[r][d][4] = u);
    R();
  }
  function R() {
    if (clearTimeout(g), g = void 0, e[r].length !== 0) {
      var u = e[r].shift(), d = u[0], i = u[1], m = u[2], v = u[3], p = u[4];
      if (v === void 0)
        a("RETRY", d.name, i), d.apply(null, i);
      else if (Date.now() - v >= 6e4) {
        a("TIMEOUT", d.name, i);
        var y = i.pop();
        typeof y == "function" && y.call(null, m);
      } else {
        var $ = Date.now() - p, b = Math.max(p - v, 1), I = Math.min(b * 1.2, 100);
        $ >= I ? (a("RETRY", d.name, i), d.apply(null, i.concat([v]))) : e[r].push(u);
      }
      g === void 0 && (g = setTimeout(R, 0));
    }
  }
  return gn;
}
var Rl;
function Ne() {
  return Rl || (Rl = 1, function(e) {
    const t = Se().fromCallback, f = Nt(), s = [
      "access",
      "appendFile",
      "chmod",
      "chown",
      "close",
      "copyFile",
      "fchmod",
      "fchown",
      "fdatasync",
      "fstat",
      "fsync",
      "ftruncate",
      "futimes",
      "lchmod",
      "lchown",
      "link",
      "lstat",
      "mkdir",
      "mkdtemp",
      "open",
      "opendir",
      "readdir",
      "readFile",
      "readlink",
      "realpath",
      "rename",
      "rm",
      "rmdir",
      "stat",
      "symlink",
      "truncate",
      "unlink",
      "utimes",
      "writeFile"
    ].filter((l) => typeof f[l] == "function");
    Object.assign(e, f), s.forEach((l) => {
      e[l] = t(f[l]);
    }), e.exists = function(l, r) {
      return typeof r == "function" ? f.exists(l, r) : new Promise((n) => f.exists(l, n));
    }, e.read = function(l, r, n, c, o, a) {
      return typeof a == "function" ? f.read(l, r, n, c, o, a) : new Promise((h, _) => {
        f.read(l, r, n, c, o, (E, g, w) => {
          if (E) return _(E);
          h({ bytesRead: g, buffer: w });
        });
      });
    }, e.write = function(l, r, ...n) {
      return typeof n[n.length - 1] == "function" ? f.write(l, r, ...n) : new Promise((c, o) => {
        f.write(l, r, ...n, (a, h, _) => {
          if (a) return o(a);
          c({ bytesWritten: h, buffer: _ });
        });
      });
    }, e.readv = function(l, r, ...n) {
      return typeof n[n.length - 1] == "function" ? f.readv(l, r, ...n) : new Promise((c, o) => {
        f.readv(l, r, ...n, (a, h, _) => {
          if (a) return o(a);
          c({ bytesRead: h, buffers: _ });
        });
      });
    }, e.writev = function(l, r, ...n) {
      return typeof n[n.length - 1] == "function" ? f.writev(l, r, ...n) : new Promise((c, o) => {
        f.writev(l, r, ...n, (a, h, _) => {
          if (a) return o(a);
          c({ bytesWritten: h, buffers: _ });
        });
      });
    }, typeof f.realpath.native == "function" ? e.realpath.native = t(f.realpath.native) : process.emitWarning(
      "fs.realpath.native is not a function. Is fs being monkey-patched?",
      "Warning",
      "fs-extra-WARN0003"
    );
  }(ys)), ys;
}
var _n = {}, $s = {}, Pl;
function op() {
  if (Pl) return $s;
  Pl = 1;
  const e = _e;
  return $s.checkPath = function(f) {
    if (process.platform === "win32" && /[<>:"|?*]/.test(f.replace(e.parse(f).root, ""))) {
      const l = new Error(`Path contains invalid characters: ${f}`);
      throw l.code = "EINVAL", l;
    }
  }, $s;
}
var Ol;
function ap() {
  if (Ol) return _n;
  Ol = 1;
  const e = /* @__PURE__ */ Ne(), { checkPath: t } = /* @__PURE__ */ op(), f = (s) => {
    const l = { mode: 511 };
    return typeof s == "number" ? s : { ...l, ...s }.mode;
  };
  return _n.makeDir = async (s, l) => (t(s), e.mkdir(s, {
    mode: f(l),
    recursive: !0
  })), _n.makeDirSync = (s, l) => (t(s), e.mkdirSync(s, {
    mode: f(l),
    recursive: !0
  })), _n;
}
var Es, Nl;
function Me() {
  if (Nl) return Es;
  Nl = 1;
  const e = Se().fromPromise, { makeDir: t, makeDirSync: f } = /* @__PURE__ */ ap(), s = e(t);
  return Es = {
    mkdirs: s,
    mkdirsSync: f,
    // alias
    mkdirp: s,
    mkdirpSync: f,
    ensureDir: s,
    ensureDirSync: f
  }, Es;
}
var ws, Il;
function ot() {
  if (Il) return ws;
  Il = 1;
  const e = Se().fromPromise, t = /* @__PURE__ */ Ne();
  function f(s) {
    return t.access(s).then(() => !0).catch(() => !1);
  }
  return ws = {
    pathExists: e(f),
    pathExistsSync: t.existsSync
  }, ws;
}
var Ss, Tl;
function Rf() {
  if (Tl) return Ss;
  Tl = 1;
  const e = /* @__PURE__ */ Ne(), t = Se().fromPromise;
  async function f(l, r, n) {
    const c = await e.open(l, "r+");
    let o = null;
    try {
      await e.futimes(c, r, n);
    } finally {
      try {
        await e.close(c);
      } catch (a) {
        o = a;
      }
    }
    if (o)
      throw o;
  }
  function s(l, r, n) {
    const c = e.openSync(l, "r+");
    return e.futimesSync(c, r, n), e.closeSync(c);
  }
  return Ss = {
    utimesMillis: t(f),
    utimesMillisSync: s
  }, Ss;
}
var bs, Cl;
function ht() {
  if (Cl) return bs;
  Cl = 1;
  const e = /* @__PURE__ */ Ne(), t = _e, f = Se().fromPromise;
  function s(E, g, w) {
    const R = w.dereference ? (u) => e.stat(u, { bigint: !0 }) : (u) => e.lstat(u, { bigint: !0 });
    return Promise.all([
      R(E),
      R(g).catch((u) => {
        if (u.code === "ENOENT") return null;
        throw u;
      })
    ]).then(([u, d]) => ({ srcStat: u, destStat: d }));
  }
  function l(E, g, w) {
    let R;
    const u = w.dereference ? (i) => e.statSync(i, { bigint: !0 }) : (i) => e.lstatSync(i, { bigint: !0 }), d = u(E);
    try {
      R = u(g);
    } catch (i) {
      if (i.code === "ENOENT") return { srcStat: d, destStat: null };
      throw i;
    }
    return { srcStat: d, destStat: R };
  }
  async function r(E, g, w, R) {
    const { srcStat: u, destStat: d } = await s(E, g, R);
    if (d) {
      if (a(u, d)) {
        const i = t.basename(E), m = t.basename(g);
        if (w === "move" && i !== m && i.toLowerCase() === m.toLowerCase())
          return { srcStat: u, destStat: d, isChangingCase: !0 };
        throw new Error("Source and destination must not be the same.");
      }
      if (u.isDirectory() && !d.isDirectory())
        throw new Error(`Cannot overwrite non-directory '${g}' with directory '${E}'.`);
      if (!u.isDirectory() && d.isDirectory())
        throw new Error(`Cannot overwrite directory '${g}' with non-directory '${E}'.`);
    }
    if (u.isDirectory() && h(E, g))
      throw new Error(_(E, g, w));
    return { srcStat: u, destStat: d };
  }
  function n(E, g, w, R) {
    const { srcStat: u, destStat: d } = l(E, g, R);
    if (d) {
      if (a(u, d)) {
        const i = t.basename(E), m = t.basename(g);
        if (w === "move" && i !== m && i.toLowerCase() === m.toLowerCase())
          return { srcStat: u, destStat: d, isChangingCase: !0 };
        throw new Error("Source and destination must not be the same.");
      }
      if (u.isDirectory() && !d.isDirectory())
        throw new Error(`Cannot overwrite non-directory '${g}' with directory '${E}'.`);
      if (!u.isDirectory() && d.isDirectory())
        throw new Error(`Cannot overwrite directory '${g}' with non-directory '${E}'.`);
    }
    if (u.isDirectory() && h(E, g))
      throw new Error(_(E, g, w));
    return { srcStat: u, destStat: d };
  }
  async function c(E, g, w, R) {
    const u = t.resolve(t.dirname(E)), d = t.resolve(t.dirname(w));
    if (d === u || d === t.parse(d).root) return;
    let i;
    try {
      i = await e.stat(d, { bigint: !0 });
    } catch (m) {
      if (m.code === "ENOENT") return;
      throw m;
    }
    if (a(g, i))
      throw new Error(_(E, w, R));
    return c(E, g, d, R);
  }
  function o(E, g, w, R) {
    const u = t.resolve(t.dirname(E)), d = t.resolve(t.dirname(w));
    if (d === u || d === t.parse(d).root) return;
    let i;
    try {
      i = e.statSync(d, { bigint: !0 });
    } catch (m) {
      if (m.code === "ENOENT") return;
      throw m;
    }
    if (a(g, i))
      throw new Error(_(E, w, R));
    return o(E, g, d, R);
  }
  function a(E, g) {
    return g.ino && g.dev && g.ino === E.ino && g.dev === E.dev;
  }
  function h(E, g) {
    const w = t.resolve(E).split(t.sep).filter((u) => u), R = t.resolve(g).split(t.sep).filter((u) => u);
    return w.every((u, d) => R[d] === u);
  }
  function _(E, g, w) {
    return `Cannot ${w} '${E}' to a subdirectory of itself, '${g}'.`;
  }
  return bs = {
    // checkPaths
    checkPaths: f(r),
    checkPathsSync: n,
    // checkParent
    checkParentPaths: f(c),
    checkParentPathsSync: o,
    // Misc
    isSrcSubdir: h,
    areIdentical: a
  }, bs;
}
var Rs, Dl;
function cp() {
  if (Dl) return Rs;
  Dl = 1;
  const e = /* @__PURE__ */ Ne(), t = _e, { mkdirs: f } = /* @__PURE__ */ Me(), { pathExists: s } = /* @__PURE__ */ ot(), { utimesMillis: l } = /* @__PURE__ */ Rf(), r = /* @__PURE__ */ ht();
  async function n(R, u, d = {}) {
    typeof d == "function" && (d = { filter: d }), d.clobber = "clobber" in d ? !!d.clobber : !0, d.overwrite = "overwrite" in d ? !!d.overwrite : d.clobber, d.preserveTimestamps && process.arch === "ia32" && process.emitWarning(
      `Using the preserveTimestamps option in 32-bit node is not recommended;

	see https://github.com/jprichardson/node-fs-extra/issues/269`,
      "Warning",
      "fs-extra-WARN0001"
    );
    const { srcStat: i, destStat: m } = await r.checkPaths(R, u, "copy", d);
    if (await r.checkParentPaths(R, i, u, "copy"), !await c(R, u, d)) return;
    const p = t.dirname(u);
    await s(p) || await f(p), await o(m, R, u, d);
  }
  async function c(R, u, d) {
    return d.filter ? d.filter(R, u) : !0;
  }
  async function o(R, u, d, i) {
    const v = await (i.dereference ? e.stat : e.lstat)(u);
    if (v.isDirectory()) return g(v, R, u, d, i);
    if (v.isFile() || v.isCharacterDevice() || v.isBlockDevice()) return a(v, R, u, d, i);
    if (v.isSymbolicLink()) return w(R, u, d, i);
    throw v.isSocket() ? new Error(`Cannot copy a socket file: ${u}`) : v.isFIFO() ? new Error(`Cannot copy a FIFO pipe: ${u}`) : new Error(`Unknown file: ${u}`);
  }
  async function a(R, u, d, i, m) {
    if (!u) return h(R, d, i, m);
    if (m.overwrite)
      return await e.unlink(i), h(R, d, i, m);
    if (m.errorOnExist)
      throw new Error(`'${i}' already exists`);
  }
  async function h(R, u, d, i) {
    if (await e.copyFile(u, d), i.preserveTimestamps) {
      _(R.mode) && await E(d, R.mode);
      const m = await e.stat(u);
      await l(d, m.atime, m.mtime);
    }
    return e.chmod(d, R.mode);
  }
  function _(R) {
    return (R & 128) === 0;
  }
  function E(R, u) {
    return e.chmod(R, u | 128);
  }
  async function g(R, u, d, i, m) {
    u || await e.mkdir(i);
    const v = await e.readdir(d);
    await Promise.all(v.map(async (p) => {
      const y = t.join(d, p), $ = t.join(i, p);
      if (!await c(y, $, m)) return;
      const { destStat: I } = await r.checkPaths(y, $, "copy", m);
      return o(I, y, $, m);
    })), u || await e.chmod(i, R.mode);
  }
  async function w(R, u, d, i) {
    let m = await e.readlink(u);
    if (i.dereference && (m = t.resolve(process.cwd(), m)), !R)
      return e.symlink(m, d);
    let v = null;
    try {
      v = await e.readlink(d);
    } catch (p) {
      if (p.code === "EINVAL" || p.code === "UNKNOWN") return e.symlink(m, d);
      throw p;
    }
    if (i.dereference && (v = t.resolve(process.cwd(), v)), r.isSrcSubdir(m, v))
      throw new Error(`Cannot copy '${m}' to a subdirectory of itself, '${v}'.`);
    if (r.isSrcSubdir(v, m))
      throw new Error(`Cannot overwrite '${v}' with '${m}'.`);
    return await e.unlink(d), e.symlink(m, d);
  }
  return Rs = n, Rs;
}
var Ps, Al;
function up() {
  if (Al) return Ps;
  Al = 1;
  const e = Nt(), t = _e, f = Me().mkdirsSync, s = Rf().utimesMillisSync, l = /* @__PURE__ */ ht();
  function r(p, y, $) {
    typeof $ == "function" && ($ = { filter: $ }), $ = $ || {}, $.clobber = "clobber" in $ ? !!$.clobber : !0, $.overwrite = "overwrite" in $ ? !!$.overwrite : $.clobber, $.preserveTimestamps && process.arch === "ia32" && process.emitWarning(
      `Using the preserveTimestamps option in 32-bit node is not recommended;

	see https://github.com/jprichardson/node-fs-extra/issues/269`,
      "Warning",
      "fs-extra-WARN0002"
    );
    const { srcStat: b, destStat: I } = l.checkPathsSync(p, y, "copy", $);
    if (l.checkParentPathsSync(p, b, y, "copy"), $.filter && !$.filter(p, y)) return;
    const L = t.dirname(y);
    return e.existsSync(L) || f(L), n(I, p, y, $);
  }
  function n(p, y, $, b) {
    const L = (b.dereference ? e.statSync : e.lstatSync)(y);
    if (L.isDirectory()) return R(L, p, y, $, b);
    if (L.isFile() || L.isCharacterDevice() || L.isBlockDevice()) return c(L, p, y, $, b);
    if (L.isSymbolicLink()) return m(p, y, $, b);
    throw L.isSocket() ? new Error(`Cannot copy a socket file: ${y}`) : L.isFIFO() ? new Error(`Cannot copy a FIFO pipe: ${y}`) : new Error(`Unknown file: ${y}`);
  }
  function c(p, y, $, b, I) {
    return y ? o(p, $, b, I) : a(p, $, b, I);
  }
  function o(p, y, $, b) {
    if (b.overwrite)
      return e.unlinkSync($), a(p, y, $, b);
    if (b.errorOnExist)
      throw new Error(`'${$}' already exists`);
  }
  function a(p, y, $, b) {
    return e.copyFileSync(y, $), b.preserveTimestamps && h(p.mode, y, $), g($, p.mode);
  }
  function h(p, y, $) {
    return _(p) && E($, p), w(y, $);
  }
  function _(p) {
    return (p & 128) === 0;
  }
  function E(p, y) {
    return g(p, y | 128);
  }
  function g(p, y) {
    return e.chmodSync(p, y);
  }
  function w(p, y) {
    const $ = e.statSync(p);
    return s(y, $.atime, $.mtime);
  }
  function R(p, y, $, b, I) {
    return y ? d($, b, I) : u(p.mode, $, b, I);
  }
  function u(p, y, $, b) {
    return e.mkdirSync($), d(y, $, b), g($, p);
  }
  function d(p, y, $) {
    e.readdirSync(p).forEach((b) => i(b, p, y, $));
  }
  function i(p, y, $, b) {
    const I = t.join(y, p), L = t.join($, p);
    if (b.filter && !b.filter(I, L)) return;
    const { destStat: F } = l.checkPathsSync(I, L, "copy", b);
    return n(F, I, L, b);
  }
  function m(p, y, $, b) {
    let I = e.readlinkSync(y);
    if (b.dereference && (I = t.resolve(process.cwd(), I)), p) {
      let L;
      try {
        L = e.readlinkSync($);
      } catch (F) {
        if (F.code === "EINVAL" || F.code === "UNKNOWN") return e.symlinkSync(I, $);
        throw F;
      }
      if (b.dereference && (L = t.resolve(process.cwd(), L)), l.isSrcSubdir(I, L))
        throw new Error(`Cannot copy '${I}' to a subdirectory of itself, '${L}'.`);
      if (l.isSrcSubdir(L, I))
        throw new Error(`Cannot overwrite '${L}' with '${I}'.`);
      return v(I, $);
    } else
      return e.symlinkSync(I, $);
  }
  function v(p, y) {
    return e.unlinkSync(y), e.symlinkSync(p, y);
  }
  return Ps = r, Ps;
}
var Os, Ll;
function ao() {
  if (Ll) return Os;
  Ll = 1;
  const e = Se().fromPromise;
  return Os = {
    copy: e(/* @__PURE__ */ cp()),
    copySync: /* @__PURE__ */ up()
  }, Os;
}
var Ns, kl;
function Fn() {
  if (kl) return Ns;
  kl = 1;
  const e = Nt(), t = Se().fromCallback;
  function f(l, r) {
    e.rm(l, { recursive: !0, force: !0 }, r);
  }
  function s(l) {
    e.rmSync(l, { recursive: !0, force: !0 });
  }
  return Ns = {
    remove: t(f),
    removeSync: s
  }, Ns;
}
var Is, jl;
function lp() {
  if (jl) return Is;
  jl = 1;
  const e = Se().fromPromise, t = /* @__PURE__ */ Ne(), f = _e, s = /* @__PURE__ */ Me(), l = /* @__PURE__ */ Fn(), r = e(async function(o) {
    let a;
    try {
      a = await t.readdir(o);
    } catch {
      return s.mkdirs(o);
    }
    return Promise.all(a.map((h) => l.remove(f.join(o, h))));
  });
  function n(c) {
    let o;
    try {
      o = t.readdirSync(c);
    } catch {
      return s.mkdirsSync(c);
    }
    o.forEach((a) => {
      a = f.join(c, a), l.removeSync(a);
    });
  }
  return Is = {
    emptyDirSync: n,
    emptydirSync: n,
    emptyDir: r,
    emptydir: r
  }, Is;
}
var Ts, ql;
function fp() {
  if (ql) return Ts;
  ql = 1;
  const e = Se().fromPromise, t = _e, f = /* @__PURE__ */ Ne(), s = /* @__PURE__ */ Me();
  async function l(n) {
    let c;
    try {
      c = await f.stat(n);
    } catch {
    }
    if (c && c.isFile()) return;
    const o = t.dirname(n);
    let a = null;
    try {
      a = await f.stat(o);
    } catch (h) {
      if (h.code === "ENOENT") {
        await s.mkdirs(o), await f.writeFile(n, "");
        return;
      } else
        throw h;
    }
    a.isDirectory() ? await f.writeFile(n, "") : await f.readdir(o);
  }
  function r(n) {
    let c;
    try {
      c = f.statSync(n);
    } catch {
    }
    if (c && c.isFile()) return;
    const o = t.dirname(n);
    try {
      f.statSync(o).isDirectory() || f.readdirSync(o);
    } catch (a) {
      if (a && a.code === "ENOENT") s.mkdirsSync(o);
      else throw a;
    }
    f.writeFileSync(n, "");
  }
  return Ts = {
    createFile: e(l),
    createFileSync: r
  }, Ts;
}
var Cs, Fl;
function dp() {
  if (Fl) return Cs;
  Fl = 1;
  const e = Se().fromPromise, t = _e, f = /* @__PURE__ */ Ne(), s = /* @__PURE__ */ Me(), { pathExists: l } = /* @__PURE__ */ ot(), { areIdentical: r } = /* @__PURE__ */ ht();
  async function n(o, a) {
    let h;
    try {
      h = await f.lstat(a);
    } catch {
    }
    let _;
    try {
      _ = await f.lstat(o);
    } catch (w) {
      throw w.message = w.message.replace("lstat", "ensureLink"), w;
    }
    if (h && r(_, h)) return;
    const E = t.dirname(a);
    await l(E) || await s.mkdirs(E), await f.link(o, a);
  }
  function c(o, a) {
    let h;
    try {
      h = f.lstatSync(a);
    } catch {
    }
    try {
      const g = f.lstatSync(o);
      if (h && r(g, h)) return;
    } catch (g) {
      throw g.message = g.message.replace("lstat", "ensureLink"), g;
    }
    const _ = t.dirname(a);
    return f.existsSync(_) || s.mkdirsSync(_), f.linkSync(o, a);
  }
  return Cs = {
    createLink: e(n),
    createLinkSync: c
  }, Cs;
}
var Ds, Ml;
function hp() {
  if (Ml) return Ds;
  Ml = 1;
  const e = _e, t = /* @__PURE__ */ Ne(), { pathExists: f } = /* @__PURE__ */ ot(), s = Se().fromPromise;
  async function l(n, c) {
    if (e.isAbsolute(n)) {
      try {
        await t.lstat(n);
      } catch (_) {
        throw _.message = _.message.replace("lstat", "ensureSymlink"), _;
      }
      return {
        toCwd: n,
        toDst: n
      };
    }
    const o = e.dirname(c), a = e.join(o, n);
    if (await f(a))
      return {
        toCwd: a,
        toDst: n
      };
    try {
      await t.lstat(n);
    } catch (_) {
      throw _.message = _.message.replace("lstat", "ensureSymlink"), _;
    }
    return {
      toCwd: n,
      toDst: e.relative(o, n)
    };
  }
  function r(n, c) {
    if (e.isAbsolute(n)) {
      if (!t.existsSync(n)) throw new Error("absolute srcpath does not exist");
      return {
        toCwd: n,
        toDst: n
      };
    }
    const o = e.dirname(c), a = e.join(o, n);
    if (t.existsSync(a))
      return {
        toCwd: a,
        toDst: n
      };
    if (!t.existsSync(n)) throw new Error("relative srcpath does not exist");
    return {
      toCwd: n,
      toDst: e.relative(o, n)
    };
  }
  return Ds = {
    symlinkPaths: s(l),
    symlinkPathsSync: r
  }, Ds;
}
var As, Ul;
function mp() {
  if (Ul) return As;
  Ul = 1;
  const e = /* @__PURE__ */ Ne(), t = Se().fromPromise;
  async function f(l, r) {
    if (r) return r;
    let n;
    try {
      n = await e.lstat(l);
    } catch {
      return "file";
    }
    return n && n.isDirectory() ? "dir" : "file";
  }
  function s(l, r) {
    if (r) return r;
    let n;
    try {
      n = e.lstatSync(l);
    } catch {
      return "file";
    }
    return n && n.isDirectory() ? "dir" : "file";
  }
  return As = {
    symlinkType: t(f),
    symlinkTypeSync: s
  }, As;
}
var Ls, Vl;
function pp() {
  if (Vl) return Ls;
  Vl = 1;
  const e = Se().fromPromise, t = _e, f = /* @__PURE__ */ Ne(), { mkdirs: s, mkdirsSync: l } = /* @__PURE__ */ Me(), { symlinkPaths: r, symlinkPathsSync: n } = /* @__PURE__ */ hp(), { symlinkType: c, symlinkTypeSync: o } = /* @__PURE__ */ mp(), { pathExists: a } = /* @__PURE__ */ ot(), { areIdentical: h } = /* @__PURE__ */ ht();
  async function _(g, w, R) {
    let u;
    try {
      u = await f.lstat(w);
    } catch {
    }
    if (u && u.isSymbolicLink()) {
      const [v, p] = await Promise.all([
        f.stat(g),
        f.stat(w)
      ]);
      if (h(v, p)) return;
    }
    const d = await r(g, w);
    g = d.toDst;
    const i = await c(d.toCwd, R), m = t.dirname(w);
    return await a(m) || await s(m), f.symlink(g, w, i);
  }
  function E(g, w, R) {
    let u;
    try {
      u = f.lstatSync(w);
    } catch {
    }
    if (u && u.isSymbolicLink()) {
      const v = f.statSync(g), p = f.statSync(w);
      if (h(v, p)) return;
    }
    const d = n(g, w);
    g = d.toDst, R = o(d.toCwd, R);
    const i = t.dirname(w);
    return f.existsSync(i) || l(i), f.symlinkSync(g, w, R);
  }
  return Ls = {
    createSymlink: e(_),
    createSymlinkSync: E
  }, Ls;
}
var ks, zl;
function yp() {
  if (zl) return ks;
  zl = 1;
  const { createFile: e, createFileSync: t } = /* @__PURE__ */ fp(), { createLink: f, createLinkSync: s } = /* @__PURE__ */ dp(), { createSymlink: l, createSymlinkSync: r } = /* @__PURE__ */ pp();
  return ks = {
    // file
    createFile: e,
    createFileSync: t,
    ensureFile: e,
    ensureFileSync: t,
    // link
    createLink: f,
    createLinkSync: s,
    ensureLink: f,
    ensureLinkSync: s,
    // symlink
    createSymlink: l,
    createSymlinkSync: r,
    ensureSymlink: l,
    ensureSymlinkSync: r
  }, ks;
}
var js, xl;
function co() {
  if (xl) return js;
  xl = 1;
  function e(f, { EOL: s = `
`, finalEOL: l = !0, replacer: r = null, spaces: n } = {}) {
    const c = l ? s : "";
    return JSON.stringify(f, r, n).replace(/\n/g, s) + c;
  }
  function t(f) {
    return Buffer.isBuffer(f) && (f = f.toString("utf8")), f.replace(/^\uFEFF/, "");
  }
  return js = { stringify: e, stripBom: t }, js;
}
var qs, Gl;
function vp() {
  if (Gl) return qs;
  Gl = 1;
  let e;
  try {
    e = Nt();
  } catch {
    e = ft;
  }
  const t = Se(), { stringify: f, stripBom: s } = co();
  async function l(_, E = {}) {
    typeof E == "string" && (E = { encoding: E });
    const g = E.fs || e, w = "throws" in E ? E.throws : !0;
    let R = await t.fromCallback(g.readFile)(_, E);
    R = s(R);
    let u;
    try {
      u = JSON.parse(R, E ? E.reviver : null);
    } catch (d) {
      if (w)
        throw d.message = `${_}: ${d.message}`, d;
      return null;
    }
    return u;
  }
  const r = t.fromPromise(l);
  function n(_, E = {}) {
    typeof E == "string" && (E = { encoding: E });
    const g = E.fs || e, w = "throws" in E ? E.throws : !0;
    try {
      let R = g.readFileSync(_, E);
      return R = s(R), JSON.parse(R, E.reviver);
    } catch (R) {
      if (w)
        throw R.message = `${_}: ${R.message}`, R;
      return null;
    }
  }
  async function c(_, E, g = {}) {
    const w = g.fs || e, R = f(E, g);
    await t.fromCallback(w.writeFile)(_, R, g);
  }
  const o = t.fromPromise(c);
  function a(_, E, g = {}) {
    const w = g.fs || e, R = f(E, g);
    return w.writeFileSync(_, R, g);
  }
  return qs = {
    readFile: r,
    readFileSync: n,
    writeFile: o,
    writeFileSync: a
  }, qs;
}
var Fs, Kl;
function gp() {
  if (Kl) return Fs;
  Kl = 1;
  const e = vp();
  return Fs = {
    // jsonfile exports
    readJson: e.readFile,
    readJsonSync: e.readFileSync,
    writeJson: e.writeFile,
    writeJsonSync: e.writeFileSync
  }, Fs;
}
var Ms, Bl;
function uo() {
  if (Bl) return Ms;
  Bl = 1;
  const e = Se().fromPromise, t = /* @__PURE__ */ Ne(), f = _e, s = /* @__PURE__ */ Me(), l = ot().pathExists;
  async function r(c, o, a = "utf-8") {
    const h = f.dirname(c);
    return await l(h) || await s.mkdirs(h), t.writeFile(c, o, a);
  }
  function n(c, ...o) {
    const a = f.dirname(c);
    t.existsSync(a) || s.mkdirsSync(a), t.writeFileSync(c, ...o);
  }
  return Ms = {
    outputFile: e(r),
    outputFileSync: n
  }, Ms;
}
var Us, Hl;
function _p() {
  if (Hl) return Us;
  Hl = 1;
  const { stringify: e } = co(), { outputFile: t } = /* @__PURE__ */ uo();
  async function f(s, l, r = {}) {
    const n = e(l, r);
    await t(s, n, r);
  }
  return Us = f, Us;
}
var Vs, Wl;
function $p() {
  if (Wl) return Vs;
  Wl = 1;
  const { stringify: e } = co(), { outputFileSync: t } = /* @__PURE__ */ uo();
  function f(s, l, r) {
    const n = e(l, r);
    t(s, n, r);
  }
  return Vs = f, Vs;
}
var zs, Xl;
function Ep() {
  if (Xl) return zs;
  Xl = 1;
  const e = Se().fromPromise, t = /* @__PURE__ */ gp();
  return t.outputJson = e(/* @__PURE__ */ _p()), t.outputJsonSync = /* @__PURE__ */ $p(), t.outputJSON = t.outputJson, t.outputJSONSync = t.outputJsonSync, t.writeJSON = t.writeJson, t.writeJSONSync = t.writeJsonSync, t.readJSON = t.readJson, t.readJSONSync = t.readJsonSync, zs = t, zs;
}
var xs, Jl;
function wp() {
  if (Jl) return xs;
  Jl = 1;
  const e = /* @__PURE__ */ Ne(), t = _e, { copy: f } = /* @__PURE__ */ ao(), { remove: s } = /* @__PURE__ */ Fn(), { mkdirp: l } = /* @__PURE__ */ Me(), { pathExists: r } = /* @__PURE__ */ ot(), n = /* @__PURE__ */ ht();
  async function c(h, _, E = {}) {
    const g = E.overwrite || E.clobber || !1, { srcStat: w, isChangingCase: R = !1 } = await n.checkPaths(h, _, "move", E);
    await n.checkParentPaths(h, w, _, "move");
    const u = t.dirname(_);
    return t.parse(u).root !== u && await l(u), o(h, _, g, R);
  }
  async function o(h, _, E, g) {
    if (!g) {
      if (E)
        await s(_);
      else if (await r(_))
        throw new Error("dest already exists.");
    }
    try {
      await e.rename(h, _);
    } catch (w) {
      if (w.code !== "EXDEV")
        throw w;
      await a(h, _, E);
    }
  }
  async function a(h, _, E) {
    return await f(h, _, {
      overwrite: E,
      errorOnExist: !0,
      preserveTimestamps: !0
    }), s(h);
  }
  return xs = c, xs;
}
var Gs, Zl;
function Sp() {
  if (Zl) return Gs;
  Zl = 1;
  const e = Nt(), t = _e, f = ao().copySync, s = Fn().removeSync, l = Me().mkdirpSync, r = /* @__PURE__ */ ht();
  function n(_, E, g) {
    g = g || {};
    const w = g.overwrite || g.clobber || !1, { srcStat: R, isChangingCase: u = !1 } = r.checkPathsSync(_, E, "move", g);
    return r.checkParentPathsSync(_, R, E, "move"), c(E) || l(t.dirname(E)), o(_, E, w, u);
  }
  function c(_) {
    const E = t.dirname(_);
    return t.parse(E).root === E;
  }
  function o(_, E, g, w) {
    if (w) return a(_, E, g);
    if (g)
      return s(E), a(_, E, g);
    if (e.existsSync(E)) throw new Error("dest already exists.");
    return a(_, E, g);
  }
  function a(_, E, g) {
    try {
      e.renameSync(_, E);
    } catch (w) {
      if (w.code !== "EXDEV") throw w;
      return h(_, E, g);
    }
  }
  function h(_, E, g) {
    return f(_, E, {
      overwrite: g,
      errorOnExist: !0,
      preserveTimestamps: !0
    }), s(_);
  }
  return Gs = n, Gs;
}
var Ks, Yl;
function bp() {
  if (Yl) return Ks;
  Yl = 1;
  const e = Se().fromPromise;
  return Ks = {
    move: e(/* @__PURE__ */ wp()),
    moveSync: /* @__PURE__ */ Sp()
  }, Ks;
}
var Bs, Ql;
function Rp() {
  return Ql || (Ql = 1, Bs = {
    // Export promiseified graceful-fs:
    .../* @__PURE__ */ Ne(),
    // Export extra methods:
    .../* @__PURE__ */ ao(),
    .../* @__PURE__ */ lp(),
    .../* @__PURE__ */ yp(),
    .../* @__PURE__ */ Ep(),
    .../* @__PURE__ */ Me(),
    .../* @__PURE__ */ bp(),
    .../* @__PURE__ */ uo(),
    .../* @__PURE__ */ ot(),
    .../* @__PURE__ */ Fn()
  }), Bs;
}
var Ce = /* @__PURE__ */ Rp();
class Pf {
  constructor(t, f) {
    this.bw = t, this.version = f, t.webContents.on("devtools-opened", () => this.#c()), pe.handle("openDevTools", () => t.webContents.openDevTools()), this.#f.getVersion = f, pe.handle("getInfo", () => this.#f), pe.handle("inited", (l, r, n) => this.#m(r, n)), pe.handle("existsSync", (l, r) => Ce.existsSync(r)), pe.handle("copySync", (l, r, n) => Ce.copySync(r, n)), pe.handle("removeSync", (l, r) => Ce.removeSync(r)), pe.handle("ensureFileSync", (l, r) => Ce.ensureFileSync(r)), pe.handle("readFileSync", (l, r) => Ce.readFileSync(r, { encoding: "utf8" })), pe.handle("writeFileSync", (l, r, n, c) => Ce.writeFileSync(r, n, c)), pe.handle("appendFile", (l, r, n) => Ce.appendFile(r, n).catch((c) => console.log(c))), pe.handle("outputFile", (l, r, n) => Ce.outputFile(r, n).catch((c) => console.log(c))), pe.handle("win_close", () => t.close()), pe.handle("win_setTitle", (l, r) => t.setTitle(r)), pe.handle("showMessageBox", (l, r) => Nf.showMessageBox(r)), pe.handle("capturePage", (l, r, n, c) => t.webContents.capturePage().then((o) => {
      Ce.ensureFileSync(r);
      const a = o.resize({ width: n, height: c, quality: "best" }), h = r.endsWith(".png") ? a.toPNG() : a.toJPEG(80);
      Ce.writeFileSync(r, h);
    })), pe.handle("navigate_to", (l, r) => If.openExternal(r));
    let s;
    pe.handle("Store", (l, r) => {
      s = new rl(r);
    }), pe.handle("flush", (l, r) => {
      s.store = r;
    }), pe.handle("Store_isEmpty", () => s.size === 0), pe.handle("Store_get", () => s.store), pe.handle("zip", (l, r, n) => {
      const c = new _l();
      c.addLocalFolder(r), c.writeZip(n);
    }), pe.handle("unzip", (l, r, n) => {
      Ce.removeSync(n), Ce.ensureDirSync(n), new _l(r).extractAllTo(n, !0);
    }), pe.handle("isSimpleFullScreen", () => t.simpleFullScreen), Un.isWin ? (pe.handle("setSimpleFullScreen", (l, r) => {
      this.#e = !0, t.setSimpleFullScreen(r), r || (t.setPosition(this.#o, this.#a), t.setContentSize(this.#r, this.#n)), this.#e = !1;
    }), t.on("enter-full-screen", () => {
      t.setContentSize(this.#t.width, this.#t.height);
    }), t.on("leave-full-screen", () => {
      this.#s(!1, this.#o, this.#a, this.#r, this.#n);
    })) : pe.handle("setSimpleFullScreen", (l, r) => {
      t.setSimpleFullScreen(r), !r && t.setContentSize(this.#r, this.#n);
    }), pe.handle("window", (l, r, n, c, o, a) => this.#s(r, n, c, o, a)), t.on("move", () => this.#l()), t.on("resize", () => this.#l()), this.#d();
  }
  static initRenderer(t, f) {
    let s, l = () => {
    };
    try {
      rl.initRenderer(), s = new Tf({
        //	...o,
        // 以下で上書き
        show: !1,
        // ウインドウ位置（とサイズ）決定時に表示
        minWidth: 300,
        minHeight: 300,
        width: 900,
        //TODO: 4test
        height: 670,
        //TODO: 4test
        acceptFirstMouse: !0,
        maximizable: !1,
        // Macで最大化ボタンでフルスクリーンにしない
        webPreferences: {
          preload: t,
          sandbox: !1
          // // XSS対策としてnodeモジュールをレンダラープロセスで使えなくする
          // nodeIntegration		: false,
          // // レンダラープロセスに公開するAPIのファイル
          // contextIsolation	: true,
        }
      });
      const r = new Pf(s, f);
      l = () => r.openDevTools();
    } catch (r) {
      throw console.error(`early err:${r}`), l(), "initRenderer error";
    }
    return s.on("ready-to-show", () => s.show()), pe.on("ping", () => console.log("pong")), s;
  }
  #f = {
    getAppPath: It.getAppPath(),
    isPackaged: It.isPackaged,
    downloads: It.getPath("downloads"),
    userData: It.getPath("userData"),
    getVersion: "",
    env: { ...process.env },
    platform: process.platform,
    arch: process.arch
  };
  #o = 0;
  #a = 0;
  #r = 0;
  #n = 0;
  #i = 0;
  openDevTools = () => {
  };
  #c = () => {
  };
  //TODO: #evDevtoolsOpened = ()=> this.bw.webContents.closeDevTools();	// 開こうとしたら閉じる
  #m(t, f) {
    const { c: s, x: l, y: r, w: n, h: c } = f;
    if (this.#i = n / c, Un.isWin || this.bw.setAspectRatio(this.#i), this.#s(s, l, r, n, c), this.bw.show(), t.debug.devtool) {
      this.#c = () => {
      }, this.openDevTools = () => this.bw.webContents.openDevTools({
        mode: "detach"
        // 別ウィンドウに切り離すが画面内に戻せない
        //	activate: false,	// 他のウインドウの後ろに回って見失いがち
      }), this.openDevTools();
      return;
    }
    this.#c = () => {
      this.bw.webContents.closeDevTools(), this.bw.setTitle("DevToolは禁止されています。許可する場合は【プロジェクト設定】の【devtool】をONに。"), this.bw.webContents.send("shutdown");
    };
  }
  #t;
  #d() {
    const t = lo.getCursorScreenPoint(), f = lo.getDisplayNearestPoint(t);
    this.#t = f.workAreaSize;
  }
  #u = void 0;
  #h = !1;
  #e = !1;
  #l() {
    if (this.#u || this.#e) return;
    this.#e = !0;
    const [t, f] = this.bw.getPosition(), [s, l] = this.bw.getContentSize();
    this.#u = setTimeout(() => {
      if (this.#u = void 0, this.#h) {
        this.#h = !1;
        return;
      }
      this.#e = !1;
      const [r = 0, n = 0] = this.bw.getPosition(), [c = 0, o = 0] = this.bw.getContentSize();
      if (t !== r || f !== n || s !== c || l !== o) {
        this.#l();
        return;
      }
      this.#s(!1, r, n, c, o);
    }, 1e3 / 60 * 10);
  }
  #s(t, f, s, l, r) {
    this.#e || (this.#e = !0, !this.bw.simpleFullScreen && (t && (this.#d(), f = (this.#t.width - l) * 0.5, s = (this.#t.height - r) * 0.5), this.#o = f = Math.round(f), this.#a = s = Math.round(s), this.bw.setPosition(f, s), Un.isWin && (this.#r !== l ? r = l / this.#i : l = r * this.#i), this.#r = l = Math.round(l), this.#n = r = Math.round(r), this.bw.setContentSize(l, r), this.bw.webContents.send("save_win_inf", { c: t, x: f, y: s, w: l, h: r, scrw: this.#t.width, scrh: this.#t.height }), this.#e = !1));
  }
}
export {
  Pf as appMain
};
//# sourceMappingURL=appMain.js.map
