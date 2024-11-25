import Pl, { ipcMain as ue, dialog as Tl, shell as Rl, BrowserWindow as Cl, app as Vr, screen as Us } from "electron";
import be from "path";
import gi from "util";
import sr from "fs";
import ua from "crypto";
import da from "assert";
import Dl from "events";
import Al from "os";
import ha from "zlib";
import Ll from "constants";
import Fl from "stream";
var ft = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function ma(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var hn = { exports: {} };
/*!
 * Platform.js v1.3.6
 * Copyright 2014-2020 Benjamin Tan
 * Copyright 2011-2013 John-David Dalton
 * Available under MIT license
 */
hn.exports;
(function(e, t) {
  (function() {
    var r = {
      function: !0,
      object: !0
    }, n = r[typeof window] && window || this, i = t, s = e && !e.nodeType && e, o = i && s && typeof ft == "object" && ft;
    o && (o.global === o || o.window === o || o.self === o) && (n = o);
    var l = Math.pow(2, 53) - 1, a = /\bOpera/, c = Object.prototype, f = c.hasOwnProperty, E = c.toString;
    function S(R) {
      return R = String(R), R.charAt(0).toUpperCase() + R.slice(1);
    }
    function u(R, P, A) {
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
      return P && A && /^Win/i.test(R) && !/^Windows Phone /i.test(R) && (x = x[/[\d.]+$/.exec(R)]) && (R = "Windows " + x), R = String(R), P && A && (R = R.replace(RegExp(P, "i"), A)), R = g(
        R.replace(/ ce$/i, " CE").replace(/\bhpw/i, "web").replace(/\bMacintosh\b/, "Mac OS").replace(/_PowerPC\b/i, " OS").replace(/\b(OS X) [^ \d]+/i, "$1").replace(/\bMac (OS X)\b/, "$1").replace(/\/(\d)/, " $1").replace(/_/g, ".").replace(/(?: BePC|[ .]*fc[ \d.]+)$/i, "").replace(/\bx86\.64\b/gi, "x86_64").replace(/\b(Windows Phone) OS\b/, "$1").replace(/\b(Chrome OS \w+) [\d.]+\b/, "$1").split(" on ")[0]
      ), R;
    }
    function d(R, P) {
      var A = -1, x = R ? R.length : 0;
      if (typeof x == "number" && x > -1 && x <= l)
        for (; ++A < x; )
          P(R[A], A, R);
      else
        y(R, P);
    }
    function g(R) {
      return R = N(R), /^(?:webOS|i(?:OS|P))/.test(R) ? R : S(R);
    }
    function y(R, P) {
      for (var A in R)
        f.call(R, A) && P(R[A], A, R);
    }
    function m(R) {
      return R == null ? S(R) : E.call(R).slice(8, -1);
    }
    function h(R, P) {
      var A = R != null ? typeof R[P] : "number";
      return !/^(?:boolean|number|string|undefined)$/.test(A) && (A == "object" ? !!R[P] : !0);
    }
    function v(R) {
      return String(R).replace(/([ -])(?!$)/g, "$1?");
    }
    function O(R, P) {
      var A = null;
      return d(R, function(x, W) {
        A = P(A, x, W, R);
      }), A;
    }
    function N(R) {
      return String(R).replace(/^ +| +$/g, "");
    }
    function F(R) {
      var P = n, A = R && typeof R == "object" && m(R) != "String";
      A && (P = R, R = null);
      var x = P.navigator || {}, W = x.userAgent || "";
      R || (R = W);
      var J = A ? !!x.likeChrome : /\bChrome\b/.test(R) && !/internal|\n/i.test(E.toString()), k = "Object", L = A ? k : "ScriptBridgingProxyObject", V = A ? k : "Environment", j = A && P.java ? "JavaPackage" : m(P.java), T = A ? k : "RuntimeObject", C = /\bJava/.test(j) && P.java, b = C && m(P.environment) == V, w = C ? "a" : "α", D = C ? "b" : "β", I = P.document || {}, p = P.operamini || P.opera, _ = a.test(_ = A && p ? p["[[Class]]"] : m(p)) ? _ : p = null, $, K = R, M = [], ie = null, ee = R == W, B = ee && p && typeof p.version == "function" && p.version(), ot, ne = hr([
        { label: "EdgeHTML", pattern: "Edge" },
        "Trident",
        { label: "WebKit", pattern: "AppleWebKit" },
        "iCab",
        "Presto",
        "NetFront",
        "Tasman",
        "KHTML",
        "Gecko"
      ]), z = pr([
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
      ]), Y = zt([
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
      ]), $e = mr({
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
      }), G = yr([
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
      function hr(ve) {
        return O(ve, function(fe, se) {
          return fe || RegExp("\\b" + (se.pattern || v(se)) + "\\b", "i").exec(R) && (se.label || se);
        });
      }
      function mr(ve) {
        return O(ve, function(fe, se, qe) {
          return fe || (se[Y] || se[/^[a-z]+(?: +[a-z]+\b)*/i.exec(Y)] || RegExp("\\b" + v(qe) + "(?:\\b|\\w*\\d)", "i").exec(R)) && qe;
        });
      }
      function pr(ve) {
        return O(ve, function(fe, se) {
          return fe || RegExp("\\b" + (se.pattern || v(se)) + "\\b", "i").exec(R) && (se.label || se);
        });
      }
      function yr(ve) {
        return O(ve, function(fe, se) {
          var qe = se.pattern || v(se);
          return !fe && (fe = RegExp("\\b" + qe + "(?:/[\\d.]+|[ \\w.]*)", "i").exec(R)) && (fe = u(fe, qe, se.label || se)), fe;
        });
      }
      function zt(ve) {
        return O(ve, function(fe, se) {
          var qe = se.pattern || v(se);
          return !fe && (fe = RegExp("\\b" + qe + " *\\d+[.\\w_]*", "i").exec(R) || RegExp("\\b" + qe + " *\\w+-[\\w]*", "i").exec(R) || RegExp("\\b" + qe + "(?:; *(?:[a-z]+[_-])?[a-z]+\\d+|[^ ();-]*)", "i").exec(R)) && ((fe = String(se.label && !RegExp(qe, "i").test(se.label) ? se.label : fe).split("/"))[1] && !/[\d.]+/.test(fe[0]) && (fe[0] += " " + fe[1]), se = se.label || se, fe = g(fe[0].replace(RegExp(qe, "i"), se).replace(RegExp("; *(?:" + se + "[_-])?", "i"), " ").replace(RegExp("(" + se + ")[-_.]?(\\w)", "i"), "$1 $2"))), fe;
        });
      }
      function Vt(ve) {
        return O(ve, function(fe, se) {
          return fe || (RegExp(se + "(?:-[\\d.]+/|(?: for [\\w-]+)?[ /-])([\\d.]+[^ ();/_-]*)", "i").exec(R) || 0)[1] || null;
        });
      }
      function Er() {
        return this.description || "";
      }
      if (ne && (ne = [ne]), /\bAndroid\b/.test(G) && !Y && ($ = /\bAndroid[^;]*;(.*?)(?:Build|\) AppleWebKit)\b/i.exec(R)) && (Y = N($[1]).replace(/^[a-z]{2}-[a-z]{2};\s*/i, "") || null), $e && !Y ? Y = zt([$e]) : $e && Y && (Y = Y.replace(RegExp("^(" + v($e) + ")[-_.\\s]", "i"), $e + " ").replace(RegExp("^(" + v($e) + ")[-_.]?(\\w)", "i"), $e + " $2")), ($ = /\bGoogle TV\b/.exec(Y)) && (Y = $[0]), /\bSimulator\b/i.test(R) && (Y = (Y ? Y + " " : "") + "Simulator"), z == "Opera Mini" && /\bOPiOS\b/.test(R) && M.push("running in Turbo/Uncompressed mode"), z == "IE" && /\blike iPhone OS\b/.test(R) ? ($ = F(R.replace(/like iPhone OS/, "")), $e = $.manufacturer, Y = $.product) : /^iP/.test(Y) ? (z || (z = "Safari"), G = "iOS" + (($ = / OS ([\d_]+)/i.exec(R)) ? " " + $[1].replace(/_/g, ".") : "")) : z == "Konqueror" && /^Linux\b/i.test(G) ? G = "Kubuntu" : $e && $e != "Google" && (/Chrome/.test(z) && !/\bMobile Safari\b/i.test(R) || /\bVita\b/.test(Y)) || /\bAndroid\b/.test(G) && /^Chrome/.test(z) && /\bVersion\//i.test(R) ? (z = "Android Browser", G = /\bAndroid\b/.test(G) ? G : "Android") : z == "Silk" ? (/\bMobi/i.test(R) || (G = "Android", M.unshift("desktop mode")), /Accelerated *= *true/i.test(R) && M.unshift("accelerated")) : z == "UC Browser" && /\bUCWEB\b/.test(R) ? M.push("speed mode") : z == "PaleMoon" && ($ = /\bFirefox\/([\d.]+)\b/.exec(R)) ? M.push("identifying as Firefox " + $[1]) : z == "Firefox" && ($ = /\b(Mobile|Tablet|TV)\b/i.exec(R)) ? (G || (G = "Firefox OS"), Y || (Y = $[1])) : !z || ($ = !/\bMinefield\b/i.test(R) && /\b(?:Firefox|Safari)\b/.exec(z)) ? (z && !Y && /[\/,]|^[^(]+?\)/.test(R.slice(R.indexOf($ + "/") + 8)) && (z = null), ($ = Y || $e || G) && (Y || $e || /\b(?:Android|Symbian OS|Tablet OS|webOS)\b/.test(G)) && (z = /[a-z]+(?: Hat)?/i.exec(/\bAndroid\b/.test(G) ? G : $) + " Browser")) : z == "Electron" && ($ = (/\bChrome\/([\d.]+)\b/.exec(R) || 0)[1]) && M.push("Chromium " + $), B || (B = Vt([
        "(?:Cloud9|CriOS|CrMo|Edge|Edg|EdgA|EdgiOS|FxiOS|HeadlessChrome|IEMobile|Iron|Opera ?Mini|OPiOS|OPR|Raven|SamsungBrowser|Silk(?!/[\\d.]+$)|UCBrowser|YaBrowser)",
        "Version",
        v(z),
        "(?:Firefox|Minefield|NetFront)"
      ])), ($ = ne == "iCab" && parseFloat(B) > 3 && "WebKit" || /\bOpera\b/.test(z) && (/\bOPR\b/.test(R) ? "Blink" : "Presto") || /\b(?:Midori|Nook|Safari)\b/i.test(R) && !/^(?:Trident|EdgeHTML)$/.test(ne) && "WebKit" || !ne && /\bMSIE\b/i.test(R) && (G == "Mac OS" ? "Tasman" : "Trident") || ne == "WebKit" && /\bPlayStation\b(?! Vita\b)/i.test(z) && "NetFront") && (ne = [$]), z == "IE" && ($ = (/; *(?:XBLWP|ZuneWP)(\d+)/i.exec(R) || 0)[1]) ? (z += " Mobile", G = "Windows Phone " + (/\+$/.test($) ? $ : $ + ".x"), M.unshift("desktop mode")) : /\bWPDesktop\b/i.test(R) ? (z = "IE Mobile", G = "Windows Phone 8.x", M.unshift("desktop mode"), B || (B = (/\brv:([\d.]+)/.exec(R) || 0)[1])) : z != "IE" && ne == "Trident" && ($ = /\brv:([\d.]+)/.exec(R)) && (z && M.push("identifying as " + z + (B ? " " + B : "")), z = "IE", B = $[1]), ee) {
        if (h(P, "global"))
          if (C && ($ = C.lang.System, K = $.getProperty("os.arch"), G = G || $.getProperty("os.name") + " " + $.getProperty("os.version")), b) {
            try {
              B = P.require("ringo/engine").version.join("."), z = "RingoJS";
            } catch {
              ($ = P.system) && $.global.system == P.system && (z = "Narwhal", G || (G = $[0].os || null));
            }
            z || (z = "Rhino");
          } else typeof P.process == "object" && !P.process.browser && ($ = P.process) && (typeof $.versions == "object" && (typeof $.versions.electron == "string" ? (M.push("Node " + $.versions.node), z = "Electron", B = $.versions.electron) : typeof $.versions.nw == "string" && (M.push("Chromium " + B, "Node " + $.versions.node), z = "NW.js", B = $.versions.nw)), z || (z = "Node.js", K = $.arch, G = $.platform, B = /[\d.]+/.exec($.version), B = B ? B[0] : null));
        else m($ = P.runtime) == L ? (z = "Adobe AIR", G = $.flash.system.Capabilities.os) : m($ = P.phantom) == T ? (z = "PhantomJS", B = ($ = $.version || null) && $.major + "." + $.minor + "." + $.patch) : typeof I.documentMode == "number" && ($ = /\bTrident\/(\d+)/i.exec(R)) ? (B = [B, I.documentMode], ($ = +$[1] + 4) != B[1] && (M.push("IE " + B[1] + " mode"), ne && (ne[1] = ""), B[1] = $), B = z == "IE" ? String(B[1].toFixed(1)) : B[0]) : typeof I.documentMode == "number" && /^(?:Chrome|Firefox)\b/.test(z) && (M.push("masking as " + z + " " + B), z = "IE", B = "11.0", ne = ["Trident"], G = "Windows");
        G = G && g(G);
      }
      if (B && ($ = /(?:[ab]|dp|pre|[ab]\d+pre)(?:\d+\+?)?$/i.exec(B) || /(?:alpha|beta)(?: ?\d)?/i.exec(R + ";" + (ee && x.appMinorVersion)) || /\bMinefield\b/i.test(R) && "a") && (ie = /b/i.test($) ? "beta" : "alpha", B = B.replace(RegExp($ + "\\+?$"), "") + (ie == "beta" ? D : w) + (/\d+\+?/.exec($) || "")), z == "Fennec" || z == "Firefox" && /\b(?:Android|Firefox OS|KaiOS)\b/.test(G))
        z = "Firefox Mobile";
      else if (z == "Maxthon" && B)
        B = B.replace(/\.[\d.]+/, ".x");
      else if (/\bXbox\b/i.test(Y))
        Y == "Xbox 360" && (G = null), Y == "Xbox 360" && /\bIEMobile\b/.test(R) && M.unshift("mobile mode");
      else if ((/^(?:Chrome|IE|Opera)$/.test(z) || z && !Y && !/Browser|Mobi/.test(z)) && (G == "Windows CE" || /Mobi/i.test(R)))
        z += " Mobile";
      else if (z == "IE" && ee)
        try {
          P.external === null && M.unshift("platform preview");
        } catch {
          M.unshift("embedded");
        }
      else (/\bBlackBerry\b/.test(Y) || /\bBB10\b/.test(R)) && ($ = (RegExp(Y.replace(/ +/g, " *") + "/([.\\d]+)", "i").exec(R) || 0)[1] || B) ? ($ = [$, /BB10/.test(R)], G = ($[1] ? (Y = null, $e = "BlackBerry") : "Device Software") + " " + $[0], B = null) : this != y && Y != "Wii" && (ee && p || /Opera/.test(z) && /\b(?:MSIE|Firefox)\b/i.test(R) || z == "Firefox" && /\bOS X (?:\d+\.){2,}/.test(G) || z == "IE" && (G && !/^Win/.test(G) && B > 5.5 || /\bWindows XP\b/.test(G) && B > 8 || B == 8 && !/\bTrident\b/.test(R))) && !a.test($ = F.call(y, R.replace(a, "") + ";")) && $.name && ($ = "ing as " + $.name + (($ = $.version) ? " " + $ : ""), a.test(z) ? (/\bIE\b/.test($) && G == "Mac OS" && (G = null), $ = "identify" + $) : ($ = "mask" + $, _ ? z = g(_.replace(/([a-z])([A-Z])/g, "$1 $2")) : z = "Opera", /\bIE\b/.test($) && (G = null), ee || (B = null)), ne = ["Presto"], M.push($));
      ($ = (/\bAppleWebKit\/([\d.]+\+?)/i.exec(R) || 0)[1]) && ($ = [parseFloat($.replace(/\.(\d)$/, ".0$1")), $], z == "Safari" && $[1].slice(-1) == "+" ? (z = "WebKit Nightly", ie = "alpha", B = $[1].slice(0, -1)) : (B == $[1] || B == ($[2] = (/\bSafari\/([\d.]+\+?)/i.exec(R) || 0)[1])) && (B = null), $[1] = (/\b(?:Headless)?Chrome\/([\d.]+)/i.exec(R) || 0)[1], $[0] == 537.36 && $[2] == 537.36 && parseFloat($[1]) >= 28 && ne == "WebKit" && (ne = ["Blink"]), !ee || !J && !$[1] ? (ne && (ne[1] = "like Safari"), $ = ($ = $[0], $ < 400 ? 1 : $ < 500 ? 2 : $ < 526 ? 3 : $ < 533 ? 4 : $ < 534 ? "4+" : $ < 535 ? 5 : $ < 537 ? 6 : $ < 538 ? 7 : $ < 601 ? 8 : $ < 602 ? 9 : $ < 604 ? 10 : $ < 606 ? 11 : $ < 608 ? 12 : "12")) : (ne && (ne[1] = "like Chrome"), $ = $[1] || ($ = $[0], $ < 530 ? 1 : $ < 532 ? 2 : $ < 532.05 ? 3 : $ < 533 ? 4 : $ < 534.03 ? 5 : $ < 534.07 ? 6 : $ < 534.1 ? 7 : $ < 534.13 ? 8 : $ < 534.16 ? 9 : $ < 534.24 ? 10 : $ < 534.3 ? 11 : $ < 535.01 ? 12 : $ < 535.02 ? "13+" : $ < 535.07 ? 15 : $ < 535.11 ? 16 : $ < 535.19 ? 17 : $ < 536.05 ? 18 : $ < 536.1 ? 19 : $ < 537.01 ? 20 : $ < 537.11 ? "21+" : $ < 537.13 ? 23 : $ < 537.18 ? 24 : $ < 537.24 ? 25 : $ < 537.36 ? 26 : ne != "Blink" ? "27" : "28")), ne && (ne[1] += " " + ($ += typeof $ == "number" ? ".x" : /[.+]/.test($) ? "" : "+")), z == "Safari" && (!B || parseInt(B) > 45) ? B = $ : z == "Chrome" && /\bHeadlessChrome/i.test(R) && M.unshift("headless")), z == "Opera" && ($ = /\bzbov|zvav$/.exec(G)) ? (z += " ", M.unshift("desktop mode"), $ == "zvav" ? (z += "Mini", B = null) : z += "Mobile", G = G.replace(RegExp(" *" + $ + "$"), "")) : z == "Safari" && /\bChrome\b/.exec(ne && ne[1]) ? (M.unshift("desktop mode"), z = "Chrome Mobile", B = null, /\bOS X\b/.test(G) ? ($e = "Apple", G = "iOS 4.3+") : G = null) : /\bSRWare Iron\b/.test(z) && !B && (B = Vt("Chrome")), B && B.indexOf($ = /[\d.]+$/.exec(G)) == 0 && R.indexOf("/" + $ + "-") > -1 && (G = N(G.replace($, ""))), G && G.indexOf(z) != -1 && !RegExp(z + " OS").test(G) && (G = G.replace(RegExp(" *" + v(z) + " *"), "")), ne && !/\b(?:Avant|Nook)\b/.test(z) && (/Browser|Lunascape|Maxthon/.test(z) || z != "Safari" && /^iOS/.test(G) && /\bSafari\b/.test(ne[1]) || /^(?:Adobe|Arora|Breach|Midori|Opera|Phantom|Rekonq|Rock|Samsung Internet|Sleipnir|SRWare Iron|Vivaldi|Web)/.test(z) && ne[1]) && ($ = ne[ne.length - 1]) && M.push($), M.length && (M = ["(" + M.join("; ") + ")"]), $e && Y && Y.indexOf($e) < 0 && M.push("on " + $e), Y && M.push((/^on /.test(M[M.length - 1]) ? "" : "on ") + Y), G && ($ = / ([\d.+]+)$/.exec(G), ot = $ && G.charAt(G.length - $[0].length - 1) == "/", G = {
        architecture: 32,
        family: $ && !ot ? G.replace($[0], "") : G,
        version: $ ? $[1] : null,
        toString: function() {
          var ve = this.version;
          return this.family + (ve && !ot ? " " + ve : "") + (this.architecture == 64 ? " 64-bit" : "");
        }
      }), ($ = /\b(?:AMD|IA|Win|WOW|x86_|x)64\b/i.exec(K)) && !/\bi686\b/i.test(K) ? (G && (G.architecture = 64, G.family = G.family.replace(RegExp(" *" + $), "")), z && (/\bWOW64\b/i.test(R) || ee && /\w(?:86|32)$/.test(x.cpuClass || x.platform) && !/\bWin64; x64\b/i.test(R)) && M.unshift("32-bit")) : G && /^OS X/.test(G.family) && z == "Chrome" && parseFloat(B) >= 39 && (G.architecture = 64), R || (R = null);
      var Ie = {};
      return Ie.description = R, Ie.layout = ne && ne[0], Ie.manufacturer = $e, Ie.name = z, Ie.prerelease = ie, Ie.product = Y, Ie.ua = R, Ie.version = z && B, Ie.os = G || {
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
      }, Ie.parse = F, Ie.toString = Er, Ie.version && M.unshift(B), Ie.name && M.unshift(z), G && z && !(G == String(G).split(" ")[0] && (G == z.split(" ")[0] || Y)) && M.push(Y ? "(" + G + ")" : "on " + G), M.length && (Ie.description = M.join(" ")), Ie;
    }
    var U = F();
    i && s ? y(U, function(R, P) {
      i[P] = R;
    }) : n.platform = U;
  }).call(ft);
})(hn, hn.exports);
var gr = hn.exports;
function pa(e) {
  return parseInt(String(e), 10);
}
"toInt" in String.prototype || (String.prototype.toInt = function() {
  return pa(this);
});
"toUint" in String.prototype || (String.prototype.toUint = function() {
  const e = pa(this);
  return e < 0 ? -e : e;
});
class zn {
  static stageW = 0;
  static stageH = 0;
  static debugLog = !1;
  static isSafari = gr.name === "Safari";
  static isFirefox = gr.name === "Firefox";
  static isMac = /OS X/.test(gr.os?.family ?? "");
  static isWin = /Windows/.test(gr.os?.family ?? "");
  static isMobile = !/(Windows|OS X)/.test(gr.os?.family ?? "");
  static hDip = {};
  static isDbg = !1;
  static isPackaged = !1;
  static isDarkMode = !1;
  static cc4ColorName;
}
var ri = { exports: {} }, kl = (e) => {
  const t = typeof e;
  return e !== null && (t === "object" || t === "function");
};
const Ct = kl, jl = /* @__PURE__ */ new Set([
  "__proto__",
  "prototype",
  "constructor"
]), Ml = (e) => !e.some((t) => jl.has(t));
function Gr(e) {
  const t = e.split("."), r = [];
  for (let n = 0; n < t.length; n++) {
    let i = t[n];
    for (; i[i.length - 1] === "\\" && t[n + 1] !== void 0; )
      i = i.slice(0, -1) + ".", i += t[++n];
    r.push(i);
  }
  return Ml(r) ? r : [];
}
var xl = {
  get(e, t, r) {
    if (!Ct(e) || typeof t != "string")
      return r === void 0 ? e : r;
    const n = Gr(t);
    if (n.length !== 0) {
      for (let i = 0; i < n.length; i++)
        if (e = e[n[i]], e == null) {
          if (i !== n.length - 1)
            return r;
          break;
        }
      return e === void 0 ? r : e;
    }
  },
  set(e, t, r) {
    if (!Ct(e) || typeof t != "string")
      return e;
    const n = e, i = Gr(t);
    for (let s = 0; s < i.length; s++) {
      const o = i[s];
      Ct(e[o]) || (e[o] = {}), s === i.length - 1 && (e[o] = r), e = e[o];
    }
    return n;
  },
  delete(e, t) {
    if (!Ct(e) || typeof t != "string")
      return !1;
    const r = Gr(t);
    for (let n = 0; n < r.length; n++) {
      const i = r[n];
      if (n === r.length - 1)
        return delete e[i], !0;
      if (e = e[i], !Ct(e))
        return !1;
    }
  },
  has(e, t) {
    if (!Ct(e) || typeof t != "string")
      return !1;
    const r = Gr(t);
    if (r.length === 0)
      return !1;
    for (let n = 0; n < r.length; n++)
      if (Ct(e)) {
        if (!(r[n] in e))
          return !1;
        e = e[r[n]];
      } else
        return !1;
    return !0;
  }
}, $i = { exports: {} }, vi = { exports: {} }, _i = { exports: {} }, Si = { exports: {} };
const ya = sr;
Si.exports = (e) => new Promise((t) => {
  ya.access(e, (r) => {
    t(!r);
  });
});
Si.exports.sync = (e) => {
  try {
    return ya.accessSync(e), !0;
  } catch {
    return !1;
  }
};
var Ul = Si.exports, wi = { exports: {} }, bi = { exports: {} };
const Ea = (e, ...t) => new Promise((r) => {
  r(e(...t));
});
bi.exports = Ea;
bi.exports.default = Ea;
var zl = bi.exports;
const Vl = zl, ga = (e) => {
  if (!((Number.isInteger(e) || e === 1 / 0) && e > 0))
    return Promise.reject(new TypeError("Expected `concurrency` to be a number from 1 and up"));
  const t = [];
  let r = 0;
  const n = () => {
    r--, t.length > 0 && t.shift()();
  }, i = (l, a, ...c) => {
    r++;
    const f = Vl(l, ...c);
    a(f), f.then(n, n);
  }, s = (l, a, ...c) => {
    r < e ? i(l, a, ...c) : t.push(i.bind(null, l, a, ...c));
  }, o = (l, ...a) => new Promise((c) => s(l, c, ...a));
  return Object.defineProperties(o, {
    activeCount: {
      get: () => r
    },
    pendingCount: {
      get: () => t.length
    },
    clearQueue: {
      value: () => {
        t.length = 0;
      }
    }
  }), o;
};
wi.exports = ga;
wi.exports.default = ga;
var Gl = wi.exports;
const zs = Gl;
class $a extends Error {
  constructor(t) {
    super(), this.value = t;
  }
}
const Bl = (e, t) => Promise.resolve(e).then(t), Hl = (e) => Promise.all(e).then((t) => t[1] === !0 && Promise.reject(new $a(t[0])));
var ql = (e, t, r) => {
  r = Object.assign({
    concurrency: 1 / 0,
    preserveOrder: !0
  }, r);
  const n = zs(r.concurrency), i = [...e].map((o) => [o, n(Bl, o, t)]), s = zs(r.preserveOrder ? 1 : 1 / 0);
  return Promise.all(i.map((o) => s(Hl, o))).then(() => {
  }).catch((o) => o instanceof $a ? o.value : Promise.reject(o));
};
const va = be, _a = Ul, Wl = ql;
_i.exports = (e, t) => (t = Object.assign({
  cwd: process.cwd()
}, t), Wl(e, (r) => _a(va.resolve(t.cwd, r)), t));
_i.exports.sync = (e, t) => {
  t = Object.assign({
    cwd: process.cwd()
  }, t);
  for (const r of e)
    if (_a.sync(va.resolve(t.cwd, r)))
      return r;
};
var Kl = _i.exports;
const It = be, Sa = Kl;
vi.exports = (e, t = {}) => {
  const r = It.resolve(t.cwd || ""), { root: n } = It.parse(r), i = [].concat(e);
  return new Promise((s) => {
    (function o(l) {
      Sa(i, { cwd: l }).then((a) => {
        a ? s(It.join(l, a)) : l === n ? s(null) : o(It.dirname(l));
      });
    })(r);
  });
};
vi.exports.sync = (e, t = {}) => {
  let r = It.resolve(t.cwd || "");
  const { root: n } = It.parse(r), i = [].concat(e);
  for (; ; ) {
    const s = Sa.sync(i, { cwd: r });
    if (s)
      return It.join(r, s);
    if (r === n)
      return null;
    r = It.dirname(r);
  }
};
var Xl = vi.exports;
const wa = Xl;
$i.exports = async ({ cwd: e } = {}) => wa("package.json", { cwd: e });
$i.exports.sync = ({ cwd: e } = {}) => wa.sync("package.json", { cwd: e });
var Zl = $i.exports, Oi = { exports: {} };
const Ee = be, ba = Al, bt = ba.homedir(), Ii = ba.tmpdir(), { env: Xt } = process, Jl = (e) => {
  const t = Ee.join(bt, "Library");
  return {
    data: Ee.join(t, "Application Support", e),
    config: Ee.join(t, "Preferences", e),
    cache: Ee.join(t, "Caches", e),
    log: Ee.join(t, "Logs", e),
    temp: Ee.join(Ii, e)
  };
}, Yl = (e) => {
  const t = Xt.APPDATA || Ee.join(bt, "AppData", "Roaming"), r = Xt.LOCALAPPDATA || Ee.join(bt, "AppData", "Local");
  return {
    // Data/config/cache/log are invented by me as Windows isn't opinionated about this
    data: Ee.join(r, e, "Data"),
    config: Ee.join(t, e, "Config"),
    cache: Ee.join(r, e, "Cache"),
    log: Ee.join(r, e, "Log"),
    temp: Ee.join(Ii, e)
  };
}, Ql = (e) => {
  const t = Ee.basename(bt);
  return {
    data: Ee.join(Xt.XDG_DATA_HOME || Ee.join(bt, ".local", "share"), e),
    config: Ee.join(Xt.XDG_CONFIG_HOME || Ee.join(bt, ".config"), e),
    cache: Ee.join(Xt.XDG_CACHE_HOME || Ee.join(bt, ".cache"), e),
    // https://wiki.debian.org/XDGBaseDirectorySpecification#state
    log: Ee.join(Xt.XDG_STATE_HOME || Ee.join(bt, ".local", "state"), e),
    temp: Ee.join(Ii, t, e)
  };
}, Oa = (e, t) => {
  if (typeof e != "string")
    throw new TypeError(`Expected string, got ${typeof e}`);
  return t = Object.assign({ suffix: "nodejs" }, t), t.suffix && (e += `-${t.suffix}`), process.platform === "darwin" ? Jl(e) : process.platform === "win32" ? Yl(e) : Ql(e);
};
Oi.exports = Oa;
Oi.exports.default = Oa;
var ef = Oi.exports, ut = {}, ae = {};
Object.defineProperty(ae, "__esModule", { value: !0 });
ae.NOOP = ae.LIMIT_FILES_DESCRIPTORS = ae.LIMIT_BASENAME_LENGTH = ae.IS_USER_ROOT = ae.IS_POSIX = ae.DEFAULT_TIMEOUT_SYNC = ae.DEFAULT_TIMEOUT_ASYNC = ae.DEFAULT_WRITE_OPTIONS = ae.DEFAULT_READ_OPTIONS = ae.DEFAULT_FOLDER_MODE = ae.DEFAULT_FILE_MODE = ae.DEFAULT_ENCODING = void 0;
const tf = "utf8";
ae.DEFAULT_ENCODING = tf;
const rf = 438;
ae.DEFAULT_FILE_MODE = rf;
const nf = 511;
ae.DEFAULT_FOLDER_MODE = nf;
const sf = {};
ae.DEFAULT_READ_OPTIONS = sf;
const of = {};
ae.DEFAULT_WRITE_OPTIONS = of;
const af = 5e3;
ae.DEFAULT_TIMEOUT_ASYNC = af;
const cf = 100;
ae.DEFAULT_TIMEOUT_SYNC = cf;
const lf = !!process.getuid;
ae.IS_POSIX = lf;
const ff = process.getuid ? !process.getuid() : !1;
ae.IS_USER_ROOT = ff;
const uf = 128;
ae.LIMIT_BASENAME_LENGTH = uf;
const df = 1e4;
ae.LIMIT_FILES_DESCRIPTORS = df;
const hf = () => {
};
ae.NOOP = hf;
var _n = {}, Qt = {};
Object.defineProperty(Qt, "__esModule", { value: !0 });
Qt.attemptifySync = Qt.attemptifyAsync = void 0;
const Ia = ae, mf = (e, t = Ia.NOOP) => function() {
  return e.apply(void 0, arguments).catch(t);
};
Qt.attemptifyAsync = mf;
const pf = (e, t = Ia.NOOP) => function() {
  try {
    return e.apply(void 0, arguments);
  } catch (r) {
    return t(r);
  }
};
Qt.attemptifySync = pf;
var Ni = {};
Object.defineProperty(Ni, "__esModule", { value: !0 });
const yf = ae, Na = {
  isChangeErrorOk: (e) => {
    const { code: t } = e;
    return t === "ENOSYS" || !yf.IS_USER_ROOT && (t === "EINVAL" || t === "EPERM");
  },
  isRetriableError: (e) => {
    const { code: t } = e;
    return t === "EMFILE" || t === "ENFILE" || t === "EAGAIN" || t === "EBUSY" || t === "EACCESS" || t === "EACCS" || t === "EPERM";
  },
  onChangeError: (e) => {
    if (!Na.isChangeErrorOk(e))
      throw e;
  }
};
Ni.default = Na;
var er = {}, Pi = {};
Object.defineProperty(Pi, "__esModule", { value: !0 });
const Ef = ae, he = {
  interval: 25,
  intervalId: void 0,
  limit: Ef.LIMIT_FILES_DESCRIPTORS,
  queueActive: /* @__PURE__ */ new Set(),
  queueWaiting: /* @__PURE__ */ new Set(),
  init: () => {
    he.intervalId || (he.intervalId = setInterval(he.tick, he.interval));
  },
  reset: () => {
    he.intervalId && (clearInterval(he.intervalId), delete he.intervalId);
  },
  add: (e) => {
    he.queueWaiting.add(e), he.queueActive.size < he.limit / 2 ? he.tick() : he.init();
  },
  remove: (e) => {
    he.queueWaiting.delete(e), he.queueActive.delete(e);
  },
  schedule: () => new Promise((e) => {
    const t = () => he.remove(r), r = () => e(t);
    he.add(r);
  }),
  tick: () => {
    if (!(he.queueActive.size >= he.limit)) {
      if (!he.queueWaiting.size)
        return he.reset();
      for (const e of he.queueWaiting) {
        if (he.queueActive.size >= he.limit)
          break;
        he.queueWaiting.delete(e), he.queueActive.add(e), e();
      }
    }
  }
};
Pi.default = he;
Object.defineProperty(er, "__esModule", { value: !0 });
er.retryifySync = er.retryifyAsync = void 0;
const gf = Pi, $f = (e, t) => function(r) {
  return function n() {
    return gf.default.schedule().then((i) => e.apply(void 0, arguments).then((s) => (i(), s), (s) => {
      if (i(), Date.now() >= r)
        throw s;
      if (t(s)) {
        const o = Math.round(100 + 400 * Math.random());
        return new Promise((a) => setTimeout(a, o)).then(() => n.apply(void 0, arguments));
      }
      throw s;
    }));
  };
};
er.retryifyAsync = $f;
const vf = (e, t) => function(r) {
  return function n() {
    try {
      return e.apply(void 0, arguments);
    } catch (i) {
      if (Date.now() > r)
        throw i;
      if (t(i))
        return n.apply(void 0, arguments);
      throw i;
    }
  };
};
er.retryifySync = vf;
Object.defineProperty(_n, "__esModule", { value: !0 });
const ce = sr, xe = gi, Ue = Qt, Re = Ni, We = er, _f = {
  chmodAttempt: Ue.attemptifyAsync(xe.promisify(ce.chmod), Re.default.onChangeError),
  chownAttempt: Ue.attemptifyAsync(xe.promisify(ce.chown), Re.default.onChangeError),
  closeAttempt: Ue.attemptifyAsync(xe.promisify(ce.close)),
  fsyncAttempt: Ue.attemptifyAsync(xe.promisify(ce.fsync)),
  mkdirAttempt: Ue.attemptifyAsync(xe.promisify(ce.mkdir)),
  realpathAttempt: Ue.attemptifyAsync(xe.promisify(ce.realpath)),
  statAttempt: Ue.attemptifyAsync(xe.promisify(ce.stat)),
  unlinkAttempt: Ue.attemptifyAsync(xe.promisify(ce.unlink)),
  closeRetry: We.retryifyAsync(xe.promisify(ce.close), Re.default.isRetriableError),
  fsyncRetry: We.retryifyAsync(xe.promisify(ce.fsync), Re.default.isRetriableError),
  openRetry: We.retryifyAsync(xe.promisify(ce.open), Re.default.isRetriableError),
  readFileRetry: We.retryifyAsync(xe.promisify(ce.readFile), Re.default.isRetriableError),
  renameRetry: We.retryifyAsync(xe.promisify(ce.rename), Re.default.isRetriableError),
  statRetry: We.retryifyAsync(xe.promisify(ce.stat), Re.default.isRetriableError),
  writeRetry: We.retryifyAsync(xe.promisify(ce.write), Re.default.isRetriableError),
  chmodSyncAttempt: Ue.attemptifySync(ce.chmodSync, Re.default.onChangeError),
  chownSyncAttempt: Ue.attemptifySync(ce.chownSync, Re.default.onChangeError),
  closeSyncAttempt: Ue.attemptifySync(ce.closeSync),
  mkdirSyncAttempt: Ue.attemptifySync(ce.mkdirSync),
  realpathSyncAttempt: Ue.attemptifySync(ce.realpathSync),
  statSyncAttempt: Ue.attemptifySync(ce.statSync),
  unlinkSyncAttempt: Ue.attemptifySync(ce.unlinkSync),
  closeSyncRetry: We.retryifySync(ce.closeSync, Re.default.isRetriableError),
  fsyncSyncRetry: We.retryifySync(ce.fsyncSync, Re.default.isRetriableError),
  openSyncRetry: We.retryifySync(ce.openSync, Re.default.isRetriableError),
  readFileSyncRetry: We.retryifySync(ce.readFileSync, Re.default.isRetriableError),
  renameSyncRetry: We.retryifySync(ce.renameSync, Re.default.isRetriableError),
  statSyncRetry: We.retryifySync(ce.statSync, Re.default.isRetriableError),
  writeSyncRetry: We.retryifySync(ce.writeSync, Re.default.isRetriableError)
};
_n.default = _f;
var Ti = {};
Object.defineProperty(Ti, "__esModule", { value: !0 });
const Sf = {
  isFunction: (e) => typeof e == "function",
  isString: (e) => typeof e == "string",
  isUndefined: (e) => typeof e > "u"
};
Ti.default = Sf;
var Ri = {};
Object.defineProperty(Ri, "__esModule", { value: !0 });
const Br = {}, ni = {
  next: (e) => {
    const t = Br[e];
    if (!t)
      return;
    t.shift();
    const r = t[0];
    r ? r(() => ni.next(e)) : delete Br[e];
  },
  schedule: (e) => new Promise((t) => {
    let r = Br[e];
    r || (r = Br[e] = []), r.push(t), !(r.length > 1) && t(() => ni.next(e));
  })
};
Ri.default = ni;
var Ci = {};
Object.defineProperty(Ci, "__esModule", { value: !0 });
const wf = be, Vs = ae, Gs = _n, Ze = {
  store: {},
  create: (e) => {
    const t = `000000${Math.floor(Math.random() * 16777215).toString(16)}`.slice(-6), r = Date.now().toString().slice(-10), n = "tmp-", i = `.${n}${r}${t}`;
    return `${e}${i}`;
  },
  get: (e, t, r = !0) => {
    const n = Ze.truncate(t(e));
    return n in Ze.store ? Ze.get(e, t, r) : (Ze.store[n] = r, [n, () => delete Ze.store[n]]);
  },
  purge: (e) => {
    Ze.store[e] && (delete Ze.store[e], Gs.default.unlinkAttempt(e));
  },
  purgeSync: (e) => {
    Ze.store[e] && (delete Ze.store[e], Gs.default.unlinkSyncAttempt(e));
  },
  purgeSyncAll: () => {
    for (const e in Ze.store)
      Ze.purgeSync(e);
  },
  truncate: (e) => {
    const t = wf.basename(e);
    if (t.length <= Vs.LIMIT_BASENAME_LENGTH)
      return e;
    const r = /^(\.?)(.*?)((?:\.[^.]+)?(?:\.tmp-\d{10}[a-f0-9]{6})?)$/.exec(t);
    if (!r)
      return e;
    const n = t.length - Vs.LIMIT_BASENAME_LENGTH;
    return `${e.slice(0, -t.length)}${r[1]}${r[2].slice(0, -n)}${r[3]}`;
  }
};
process.on("exit", Ze.purgeSyncAll);
Ci.default = Ze;
Object.defineProperty(ut, "__esModule", { value: !0 });
ut.writeFileSync = ut.writeFile = ut.readFileSync = ut.readFile = void 0;
const Pa = be, Le = ae, oe = _n, Je = Ti, bf = Ri, Nt = Ci;
function Ta(e, t = Le.DEFAULT_READ_OPTIONS) {
  var r;
  if (Je.default.isString(t))
    return Ta(e, { encoding: t });
  const n = Date.now() + ((r = t.timeout) !== null && r !== void 0 ? r : Le.DEFAULT_TIMEOUT_ASYNC);
  return oe.default.readFileRetry(n)(e, t);
}
ut.readFile = Ta;
function Ra(e, t = Le.DEFAULT_READ_OPTIONS) {
  var r;
  if (Je.default.isString(t))
    return Ra(e, { encoding: t });
  const n = Date.now() + ((r = t.timeout) !== null && r !== void 0 ? r : Le.DEFAULT_TIMEOUT_SYNC);
  return oe.default.readFileSyncRetry(n)(e, t);
}
ut.readFileSync = Ra;
const Ca = (e, t, r, n) => {
  if (Je.default.isFunction(r))
    return Ca(e, t, Le.DEFAULT_WRITE_OPTIONS, r);
  const i = Da(e, t, r);
  return n && i.then(n, n), i;
};
ut.writeFile = Ca;
const Da = async (e, t, r = Le.DEFAULT_WRITE_OPTIONS) => {
  var n;
  if (Je.default.isString(r))
    return Da(e, t, { encoding: r });
  const i = Date.now() + ((n = r.timeout) !== null && n !== void 0 ? n : Le.DEFAULT_TIMEOUT_ASYNC);
  let s = null, o = null, l = null, a = null, c = null;
  try {
    r.schedule && (s = await r.schedule(e)), o = await bf.default.schedule(e), e = await oe.default.realpathAttempt(e) || e, [a, l] = Nt.default.get(e, r.tmpCreate || Nt.default.create, r.tmpPurge !== !1);
    const f = Le.IS_POSIX && Je.default.isUndefined(r.chown), E = Je.default.isUndefined(r.mode);
    if (f || E) {
      const u = await oe.default.statAttempt(e);
      u && (r = { ...r }, f && (r.chown = { uid: u.uid, gid: u.gid }), E && (r.mode = u.mode));
    }
    const S = Pa.dirname(e);
    await oe.default.mkdirAttempt(S, {
      mode: Le.DEFAULT_FOLDER_MODE,
      recursive: !0
    }), c = await oe.default.openRetry(i)(a, "w", r.mode || Le.DEFAULT_FILE_MODE), r.tmpCreated && r.tmpCreated(a), Je.default.isString(t) ? await oe.default.writeRetry(i)(c, t, 0, r.encoding || Le.DEFAULT_ENCODING) : Je.default.isUndefined(t) || await oe.default.writeRetry(i)(c, t, 0, t.length, 0), r.fsync !== !1 && (r.fsyncWait !== !1 ? await oe.default.fsyncRetry(i)(c) : oe.default.fsyncAttempt(c)), await oe.default.closeRetry(i)(c), c = null, r.chown && await oe.default.chownAttempt(a, r.chown.uid, r.chown.gid), r.mode && await oe.default.chmodAttempt(a, r.mode);
    try {
      await oe.default.renameRetry(i)(a, e);
    } catch (u) {
      if (u.code !== "ENAMETOOLONG")
        throw u;
      await oe.default.renameRetry(i)(a, Nt.default.truncate(e));
    }
    l(), a = null;
  } finally {
    c && await oe.default.closeAttempt(c), a && Nt.default.purge(a), s && s(), o && o();
  }
}, Aa = (e, t, r = Le.DEFAULT_WRITE_OPTIONS) => {
  var n;
  if (Je.default.isString(r))
    return Aa(e, t, { encoding: r });
  const i = Date.now() + ((n = r.timeout) !== null && n !== void 0 ? n : Le.DEFAULT_TIMEOUT_SYNC);
  let s = null, o = null, l = null;
  try {
    e = oe.default.realpathSyncAttempt(e) || e, [o, s] = Nt.default.get(e, r.tmpCreate || Nt.default.create, r.tmpPurge !== !1);
    const a = Le.IS_POSIX && Je.default.isUndefined(r.chown), c = Je.default.isUndefined(r.mode);
    if (a || c) {
      const E = oe.default.statSyncAttempt(e);
      E && (r = { ...r }, a && (r.chown = { uid: E.uid, gid: E.gid }), c && (r.mode = E.mode));
    }
    const f = Pa.dirname(e);
    oe.default.mkdirSyncAttempt(f, {
      mode: Le.DEFAULT_FOLDER_MODE,
      recursive: !0
    }), l = oe.default.openSyncRetry(i)(o, "w", r.mode || Le.DEFAULT_FILE_MODE), r.tmpCreated && r.tmpCreated(o), Je.default.isString(t) ? oe.default.writeSyncRetry(i)(l, t, 0, r.encoding || Le.DEFAULT_ENCODING) : Je.default.isUndefined(t) || oe.default.writeSyncRetry(i)(l, t, 0, t.length, 0), r.fsync !== !1 && (r.fsyncWait !== !1 ? oe.default.fsyncSyncRetry(i)(l) : oe.default.fsyncAttempt(l)), oe.default.closeSyncRetry(i)(l), l = null, r.chown && oe.default.chownSyncAttempt(o, r.chown.uid, r.chown.gid), r.mode && oe.default.chmodSyncAttempt(o, r.mode);
    try {
      oe.default.renameSyncRetry(i)(o, e);
    } catch (E) {
      if (E.code !== "ENAMETOOLONG")
        throw E;
      oe.default.renameSyncRetry(i)(o, Nt.default.truncate(e));
    }
    s(), o = null;
  } finally {
    l && oe.default.closeSyncAttempt(l), o && Nt.default.purge(o);
  }
};
ut.writeFileSync = Aa;
var ii = { exports: {} }, La = {}, nt = {}, tr = {}, kr = {}, te = {}, Rr = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.regexpCode = e.getEsmExportName = e.getProperty = e.safeStringify = e.stringify = e.strConcat = e.addCodeArg = e.str = e._ = e.nil = e._Code = e.Name = e.IDENTIFIER = e._CodeOrName = void 0;
  class t {
  }
  e._CodeOrName = t, e.IDENTIFIER = /^[a-z$_][a-z$_0-9]*$/i;
  class r extends t {
    constructor(h) {
      if (super(), !e.IDENTIFIER.test(h))
        throw new Error("CodeGen: name must be a valid identifier");
      this.str = h;
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
  e.Name = r;
  class n extends t {
    constructor(h) {
      super(), this._items = typeof h == "string" ? [h] : h;
    }
    toString() {
      return this.str;
    }
    emptyStr() {
      if (this._items.length > 1)
        return !1;
      const h = this._items[0];
      return h === "" || h === '""';
    }
    get str() {
      var h;
      return (h = this._str) !== null && h !== void 0 ? h : this._str = this._items.reduce((v, O) => `${v}${O}`, "");
    }
    get names() {
      var h;
      return (h = this._names) !== null && h !== void 0 ? h : this._names = this._items.reduce((v, O) => (O instanceof r && (v[O.str] = (v[O.str] || 0) + 1), v), {});
    }
  }
  e._Code = n, e.nil = new n("");
  function i(m, ...h) {
    const v = [m[0]];
    let O = 0;
    for (; O < h.length; )
      l(v, h[O]), v.push(m[++O]);
    return new n(v);
  }
  e._ = i;
  const s = new n("+");
  function o(m, ...h) {
    const v = [u(m[0])];
    let O = 0;
    for (; O < h.length; )
      v.push(s), l(v, h[O]), v.push(s, u(m[++O]));
    return a(v), new n(v);
  }
  e.str = o;
  function l(m, h) {
    h instanceof n ? m.push(...h._items) : h instanceof r ? m.push(h) : m.push(E(h));
  }
  e.addCodeArg = l;
  function a(m) {
    let h = 1;
    for (; h < m.length - 1; ) {
      if (m[h] === s) {
        const v = c(m[h - 1], m[h + 1]);
        if (v !== void 0) {
          m.splice(h - 1, 3, v);
          continue;
        }
        m[h++] = "+";
      }
      h++;
    }
  }
  function c(m, h) {
    if (h === '""')
      return m;
    if (m === '""')
      return h;
    if (typeof m == "string")
      return h instanceof r || m[m.length - 1] !== '"' ? void 0 : typeof h != "string" ? `${m.slice(0, -1)}${h}"` : h[0] === '"' ? m.slice(0, -1) + h.slice(1) : void 0;
    if (typeof h == "string" && h[0] === '"' && !(m instanceof r))
      return `"${m}${h.slice(1)}`;
  }
  function f(m, h) {
    return h.emptyStr() ? m : m.emptyStr() ? h : o`${m}${h}`;
  }
  e.strConcat = f;
  function E(m) {
    return typeof m == "number" || typeof m == "boolean" || m === null ? m : u(Array.isArray(m) ? m.join(",") : m);
  }
  function S(m) {
    return new n(u(m));
  }
  e.stringify = S;
  function u(m) {
    return JSON.stringify(m).replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029");
  }
  e.safeStringify = u;
  function d(m) {
    return typeof m == "string" && e.IDENTIFIER.test(m) ? new n(`.${m}`) : i`[${m}]`;
  }
  e.getProperty = d;
  function g(m) {
    if (typeof m == "string" && e.IDENTIFIER.test(m))
      return new n(`${m}`);
    throw new Error(`CodeGen: invalid export name: ${m}, use explicit $id name mapping`);
  }
  e.getEsmExportName = g;
  function y(m) {
    return new n(m.toString());
  }
  e.regexpCode = y;
})(Rr);
var si = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.ValueScope = e.ValueScopeName = e.Scope = e.varKinds = e.UsedValueState = void 0;
  const t = Rr;
  class r extends Error {
    constructor(c) {
      super(`CodeGen: "code" for ${c} not defined`), this.value = c.value;
    }
  }
  var n;
  (function(a) {
    a[a.Started = 0] = "Started", a[a.Completed = 1] = "Completed";
  })(n || (e.UsedValueState = n = {})), e.varKinds = {
    const: new t.Name("const"),
    let: new t.Name("let"),
    var: new t.Name("var")
  };
  class i {
    constructor({ prefixes: c, parent: f } = {}) {
      this._names = {}, this._prefixes = c, this._parent = f;
    }
    toName(c) {
      return c instanceof t.Name ? c : this.name(c);
    }
    name(c) {
      return new t.Name(this._newName(c));
    }
    _newName(c) {
      const f = this._names[c] || this._nameGroup(c);
      return `${c}${f.index++}`;
    }
    _nameGroup(c) {
      var f, E;
      if (!((E = (f = this._parent) === null || f === void 0 ? void 0 : f._prefixes) === null || E === void 0) && E.has(c) || this._prefixes && !this._prefixes.has(c))
        throw new Error(`CodeGen: prefix "${c}" is not allowed in this scope`);
      return this._names[c] = { prefix: c, index: 0 };
    }
  }
  e.Scope = i;
  class s extends t.Name {
    constructor(c, f) {
      super(f), this.prefix = c;
    }
    setValue(c, { property: f, itemIndex: E }) {
      this.value = c, this.scopePath = (0, t._)`.${new t.Name(f)}[${E}]`;
    }
  }
  e.ValueScopeName = s;
  const o = (0, t._)`\n`;
  class l extends i {
    constructor(c) {
      super(c), this._values = {}, this._scope = c.scope, this.opts = { ...c, _n: c.lines ? o : t.nil };
    }
    get() {
      return this._scope;
    }
    name(c) {
      return new s(c, this._newName(c));
    }
    value(c, f) {
      var E;
      if (f.ref === void 0)
        throw new Error("CodeGen: ref must be passed in value");
      const S = this.toName(c), { prefix: u } = S, d = (E = f.key) !== null && E !== void 0 ? E : f.ref;
      let g = this._values[u];
      if (g) {
        const h = g.get(d);
        if (h)
          return h;
      } else
        g = this._values[u] = /* @__PURE__ */ new Map();
      g.set(d, S);
      const y = this._scope[u] || (this._scope[u] = []), m = y.length;
      return y[m] = f.ref, S.setValue(f, { property: u, itemIndex: m }), S;
    }
    getValue(c, f) {
      const E = this._values[c];
      if (E)
        return E.get(f);
    }
    scopeRefs(c, f = this._values) {
      return this._reduceValues(f, (E) => {
        if (E.scopePath === void 0)
          throw new Error(`CodeGen: name "${E}" has no value`);
        return (0, t._)`${c}${E.scopePath}`;
      });
    }
    scopeCode(c = this._values, f, E) {
      return this._reduceValues(c, (S) => {
        if (S.value === void 0)
          throw new Error(`CodeGen: name "${S}" has no value`);
        return S.value.code;
      }, f, E);
    }
    _reduceValues(c, f, E = {}, S) {
      let u = t.nil;
      for (const d in c) {
        const g = c[d];
        if (!g)
          continue;
        const y = E[d] = E[d] || /* @__PURE__ */ new Map();
        g.forEach((m) => {
          if (y.has(m))
            return;
          y.set(m, n.Started);
          let h = f(m);
          if (h) {
            const v = this.opts.es5 ? e.varKinds.var : e.varKinds.const;
            u = (0, t._)`${u}${v} ${m} = ${h};${this.opts._n}`;
          } else if (h = S?.(m))
            u = (0, t._)`${u}${h}${this.opts._n}`;
          else
            throw new r(m);
          y.set(m, n.Completed);
        });
      }
      return u;
    }
  }
  e.ValueScope = l;
})(si);
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.or = e.and = e.not = e.CodeGen = e.operators = e.varKinds = e.ValueScopeName = e.ValueScope = e.Scope = e.Name = e.regexpCode = e.stringify = e.getProperty = e.nil = e.strConcat = e.str = e._ = void 0;
  const t = Rr, r = si;
  var n = Rr;
  Object.defineProperty(e, "_", { enumerable: !0, get: function() {
    return n._;
  } }), Object.defineProperty(e, "str", { enumerable: !0, get: function() {
    return n.str;
  } }), Object.defineProperty(e, "strConcat", { enumerable: !0, get: function() {
    return n.strConcat;
  } }), Object.defineProperty(e, "nil", { enumerable: !0, get: function() {
    return n.nil;
  } }), Object.defineProperty(e, "getProperty", { enumerable: !0, get: function() {
    return n.getProperty;
  } }), Object.defineProperty(e, "stringify", { enumerable: !0, get: function() {
    return n.stringify;
  } }), Object.defineProperty(e, "regexpCode", { enumerable: !0, get: function() {
    return n.regexpCode;
  } }), Object.defineProperty(e, "Name", { enumerable: !0, get: function() {
    return n.Name;
  } });
  var i = si;
  Object.defineProperty(e, "Scope", { enumerable: !0, get: function() {
    return i.Scope;
  } }), Object.defineProperty(e, "ValueScope", { enumerable: !0, get: function() {
    return i.ValueScope;
  } }), Object.defineProperty(e, "ValueScopeName", { enumerable: !0, get: function() {
    return i.ValueScopeName;
  } }), Object.defineProperty(e, "varKinds", { enumerable: !0, get: function() {
    return i.varKinds;
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
  class s {
    optimizeNodes() {
      return this;
    }
    optimizeNames(p, _) {
      return this;
    }
  }
  class o extends s {
    constructor(p, _, $) {
      super(), this.varKind = p, this.name = _, this.rhs = $;
    }
    render({ es5: p, _n: _ }) {
      const $ = p ? r.varKinds.var : this.varKind, K = this.rhs === void 0 ? "" : ` = ${this.rhs}`;
      return `${$} ${this.name}${K};` + _;
    }
    optimizeNames(p, _) {
      if (p[this.name.str])
        return this.rhs && (this.rhs = k(this.rhs, p, _)), this;
    }
    get names() {
      return this.rhs instanceof t._CodeOrName ? this.rhs.names : {};
    }
  }
  class l extends s {
    constructor(p, _, $) {
      super(), this.lhs = p, this.rhs = _, this.sideEffects = $;
    }
    render({ _n: p }) {
      return `${this.lhs} = ${this.rhs};` + p;
    }
    optimizeNames(p, _) {
      if (!(this.lhs instanceof t.Name && !p[this.lhs.str] && !this.sideEffects))
        return this.rhs = k(this.rhs, p, _), this;
    }
    get names() {
      const p = this.lhs instanceof t.Name ? {} : { ...this.lhs.names };
      return J(p, this.rhs);
    }
  }
  class a extends l {
    constructor(p, _, $, K) {
      super(p, $, K), this.op = _;
    }
    render({ _n: p }) {
      return `${this.lhs} ${this.op}= ${this.rhs};` + p;
    }
  }
  class c extends s {
    constructor(p) {
      super(), this.label = p, this.names = {};
    }
    render({ _n: p }) {
      return `${this.label}:` + p;
    }
  }
  class f extends s {
    constructor(p) {
      super(), this.label = p, this.names = {};
    }
    render({ _n: p }) {
      return `break${this.label ? ` ${this.label}` : ""};` + p;
    }
  }
  class E extends s {
    constructor(p) {
      super(), this.error = p;
    }
    render({ _n: p }) {
      return `throw ${this.error};` + p;
    }
    get names() {
      return this.error.names;
    }
  }
  class S extends s {
    constructor(p) {
      super(), this.code = p;
    }
    render({ _n: p }) {
      return `${this.code};` + p;
    }
    optimizeNodes() {
      return `${this.code}` ? this : void 0;
    }
    optimizeNames(p, _) {
      return this.code = k(this.code, p, _), this;
    }
    get names() {
      return this.code instanceof t._CodeOrName ? this.code.names : {};
    }
  }
  class u extends s {
    constructor(p = []) {
      super(), this.nodes = p;
    }
    render(p) {
      return this.nodes.reduce((_, $) => _ + $.render(p), "");
    }
    optimizeNodes() {
      const { nodes: p } = this;
      let _ = p.length;
      for (; _--; ) {
        const $ = p[_].optimizeNodes();
        Array.isArray($) ? p.splice(_, 1, ...$) : $ ? p[_] = $ : p.splice(_, 1);
      }
      return p.length > 0 ? this : void 0;
    }
    optimizeNames(p, _) {
      const { nodes: $ } = this;
      let K = $.length;
      for (; K--; ) {
        const M = $[K];
        M.optimizeNames(p, _) || (L(p, M.names), $.splice(K, 1));
      }
      return $.length > 0 ? this : void 0;
    }
    get names() {
      return this.nodes.reduce((p, _) => W(p, _.names), {});
    }
  }
  class d extends u {
    render(p) {
      return "{" + p._n + super.render(p) + "}" + p._n;
    }
  }
  class g extends u {
  }
  class y extends d {
  }
  y.kind = "else";
  class m extends d {
    constructor(p, _) {
      super(_), this.condition = p;
    }
    render(p) {
      let _ = `if(${this.condition})` + super.render(p);
      return this.else && (_ += "else " + this.else.render(p)), _;
    }
    optimizeNodes() {
      super.optimizeNodes();
      const p = this.condition;
      if (p === !0)
        return this.nodes;
      let _ = this.else;
      if (_) {
        const $ = _.optimizeNodes();
        _ = this.else = Array.isArray($) ? new y($) : $;
      }
      if (_)
        return p === !1 ? _ instanceof m ? _ : _.nodes : this.nodes.length ? this : new m(V(p), _ instanceof m ? [_] : _.nodes);
      if (!(p === !1 || !this.nodes.length))
        return this;
    }
    optimizeNames(p, _) {
      var $;
      if (this.else = ($ = this.else) === null || $ === void 0 ? void 0 : $.optimizeNames(p, _), !!(super.optimizeNames(p, _) || this.else))
        return this.condition = k(this.condition, p, _), this;
    }
    get names() {
      const p = super.names;
      return J(p, this.condition), this.else && W(p, this.else.names), p;
    }
  }
  m.kind = "if";
  class h extends d {
  }
  h.kind = "for";
  class v extends h {
    constructor(p) {
      super(), this.iteration = p;
    }
    render(p) {
      return `for(${this.iteration})` + super.render(p);
    }
    optimizeNames(p, _) {
      if (super.optimizeNames(p, _))
        return this.iteration = k(this.iteration, p, _), this;
    }
    get names() {
      return W(super.names, this.iteration.names);
    }
  }
  class O extends h {
    constructor(p, _, $, K) {
      super(), this.varKind = p, this.name = _, this.from = $, this.to = K;
    }
    render(p) {
      const _ = p.es5 ? r.varKinds.var : this.varKind, { name: $, from: K, to: M } = this;
      return `for(${_} ${$}=${K}; ${$}<${M}; ${$}++)` + super.render(p);
    }
    get names() {
      const p = J(super.names, this.from);
      return J(p, this.to);
    }
  }
  class N extends h {
    constructor(p, _, $, K) {
      super(), this.loop = p, this.varKind = _, this.name = $, this.iterable = K;
    }
    render(p) {
      return `for(${this.varKind} ${this.name} ${this.loop} ${this.iterable})` + super.render(p);
    }
    optimizeNames(p, _) {
      if (super.optimizeNames(p, _))
        return this.iterable = k(this.iterable, p, _), this;
    }
    get names() {
      return W(super.names, this.iterable.names);
    }
  }
  class F extends d {
    constructor(p, _, $) {
      super(), this.name = p, this.args = _, this.async = $;
    }
    render(p) {
      return `${this.async ? "async " : ""}function ${this.name}(${this.args})` + super.render(p);
    }
  }
  F.kind = "func";
  class U extends u {
    render(p) {
      return "return " + super.render(p);
    }
  }
  U.kind = "return";
  class R extends d {
    render(p) {
      let _ = "try" + super.render(p);
      return this.catch && (_ += this.catch.render(p)), this.finally && (_ += this.finally.render(p)), _;
    }
    optimizeNodes() {
      var p, _;
      return super.optimizeNodes(), (p = this.catch) === null || p === void 0 || p.optimizeNodes(), (_ = this.finally) === null || _ === void 0 || _.optimizeNodes(), this;
    }
    optimizeNames(p, _) {
      var $, K;
      return super.optimizeNames(p, _), ($ = this.catch) === null || $ === void 0 || $.optimizeNames(p, _), (K = this.finally) === null || K === void 0 || K.optimizeNames(p, _), this;
    }
    get names() {
      const p = super.names;
      return this.catch && W(p, this.catch.names), this.finally && W(p, this.finally.names), p;
    }
  }
  class P extends d {
    constructor(p) {
      super(), this.error = p;
    }
    render(p) {
      return `catch(${this.error})` + super.render(p);
    }
  }
  P.kind = "catch";
  class A extends d {
    render(p) {
      return "finally" + super.render(p);
    }
  }
  A.kind = "finally";
  class x {
    constructor(p, _ = {}) {
      this._values = {}, this._blockStarts = [], this._constants = {}, this.opts = { ..._, _n: _.lines ? `
` : "" }, this._extScope = p, this._scope = new r.Scope({ parent: p }), this._nodes = [new g()];
    }
    toString() {
      return this._root.render(this.opts);
    }
    // returns unique name in the internal scope
    name(p) {
      return this._scope.name(p);
    }
    // reserves unique name in the external scope
    scopeName(p) {
      return this._extScope.name(p);
    }
    // reserves unique name in the external scope and assigns value to it
    scopeValue(p, _) {
      const $ = this._extScope.value(p, _);
      return (this._values[$.prefix] || (this._values[$.prefix] = /* @__PURE__ */ new Set())).add($), $;
    }
    getScopeValue(p, _) {
      return this._extScope.getValue(p, _);
    }
    // return code that assigns values in the external scope to the names that are used internally
    // (same names that were returned by gen.scopeName or gen.scopeValue)
    scopeRefs(p) {
      return this._extScope.scopeRefs(p, this._values);
    }
    scopeCode() {
      return this._extScope.scopeCode(this._values);
    }
    _def(p, _, $, K) {
      const M = this._scope.toName(_);
      return $ !== void 0 && K && (this._constants[M.str] = $), this._leafNode(new o(p, M, $)), M;
    }
    // `const` declaration (`var` in es5 mode)
    const(p, _, $) {
      return this._def(r.varKinds.const, p, _, $);
    }
    // `let` declaration with optional assignment (`var` in es5 mode)
    let(p, _, $) {
      return this._def(r.varKinds.let, p, _, $);
    }
    // `var` declaration with optional assignment
    var(p, _, $) {
      return this._def(r.varKinds.var, p, _, $);
    }
    // assignment code
    assign(p, _, $) {
      return this._leafNode(new l(p, _, $));
    }
    // `+=` code
    add(p, _) {
      return this._leafNode(new a(p, e.operators.ADD, _));
    }
    // appends passed SafeExpr to code or executes Block
    code(p) {
      return typeof p == "function" ? p() : p !== t.nil && this._leafNode(new S(p)), this;
    }
    // returns code for object literal for the passed argument list of key-value pairs
    object(...p) {
      const _ = ["{"];
      for (const [$, K] of p)
        _.length > 1 && _.push(","), _.push($), ($ !== K || this.opts.es5) && (_.push(":"), (0, t.addCodeArg)(_, K));
      return _.push("}"), new t._Code(_);
    }
    // `if` clause (or statement if `thenBody` and, optionally, `elseBody` are passed)
    if(p, _, $) {
      if (this._blockNode(new m(p)), _ && $)
        this.code(_).else().code($).endIf();
      else if (_)
        this.code(_).endIf();
      else if ($)
        throw new Error('CodeGen: "else" body without "then" body');
      return this;
    }
    // `else if` clause - invalid without `if` or after `else` clauses
    elseIf(p) {
      return this._elseNode(new m(p));
    }
    // `else` clause - only valid after `if` or `else if` clauses
    else() {
      return this._elseNode(new y());
    }
    // end `if` statement (needed if gen.if was used only with condition)
    endIf() {
      return this._endBlockNode(m, y);
    }
    _for(p, _) {
      return this._blockNode(p), _ && this.code(_).endFor(), this;
    }
    // a generic `for` clause (or statement if `forBody` is passed)
    for(p, _) {
      return this._for(new v(p), _);
    }
    // `for` statement for a range of values
    forRange(p, _, $, K, M = this.opts.es5 ? r.varKinds.var : r.varKinds.let) {
      const ie = this._scope.toName(p);
      return this._for(new O(M, ie, _, $), () => K(ie));
    }
    // `for-of` statement (in es5 mode replace with a normal for loop)
    forOf(p, _, $, K = r.varKinds.const) {
      const M = this._scope.toName(p);
      if (this.opts.es5) {
        const ie = _ instanceof t.Name ? _ : this.var("_arr", _);
        return this.forRange("_i", 0, (0, t._)`${ie}.length`, (ee) => {
          this.var(M, (0, t._)`${ie}[${ee}]`), $(M);
        });
      }
      return this._for(new N("of", K, M, _), () => $(M));
    }
    // `for-in` statement.
    // With option `ownProperties` replaced with a `for-of` loop for object keys
    forIn(p, _, $, K = this.opts.es5 ? r.varKinds.var : r.varKinds.const) {
      if (this.opts.ownProperties)
        return this.forOf(p, (0, t._)`Object.keys(${_})`, $);
      const M = this._scope.toName(p);
      return this._for(new N("in", K, M, _), () => $(M));
    }
    // end `for` loop
    endFor() {
      return this._endBlockNode(h);
    }
    // `label` statement
    label(p) {
      return this._leafNode(new c(p));
    }
    // `break` statement
    break(p) {
      return this._leafNode(new f(p));
    }
    // `return` statement
    return(p) {
      const _ = new U();
      if (this._blockNode(_), this.code(p), _.nodes.length !== 1)
        throw new Error('CodeGen: "return" should have one node');
      return this._endBlockNode(U);
    }
    // `try` statement
    try(p, _, $) {
      if (!_ && !$)
        throw new Error('CodeGen: "try" without "catch" and "finally"');
      const K = new R();
      if (this._blockNode(K), this.code(p), _) {
        const M = this.name("e");
        this._currNode = K.catch = new P(M), _(M);
      }
      return $ && (this._currNode = K.finally = new A(), this.code($)), this._endBlockNode(P, A);
    }
    // `throw` statement
    throw(p) {
      return this._leafNode(new E(p));
    }
    // start self-balancing block
    block(p, _) {
      return this._blockStarts.push(this._nodes.length), p && this.code(p).endBlock(_), this;
    }
    // end the current self-balancing block
    endBlock(p) {
      const _ = this._blockStarts.pop();
      if (_ === void 0)
        throw new Error("CodeGen: not in self-balancing block");
      const $ = this._nodes.length - _;
      if ($ < 0 || p !== void 0 && $ !== p)
        throw new Error(`CodeGen: wrong number of nodes: ${$} vs ${p} expected`);
      return this._nodes.length = _, this;
    }
    // `function` heading (or definition if funcBody is passed)
    func(p, _ = t.nil, $, K) {
      return this._blockNode(new F(p, _, $)), K && this.code(K).endFunc(), this;
    }
    // end function definition
    endFunc() {
      return this._endBlockNode(F);
    }
    optimize(p = 1) {
      for (; p-- > 0; )
        this._root.optimizeNodes(), this._root.optimizeNames(this._root.names, this._constants);
    }
    _leafNode(p) {
      return this._currNode.nodes.push(p), this;
    }
    _blockNode(p) {
      this._currNode.nodes.push(p), this._nodes.push(p);
    }
    _endBlockNode(p, _) {
      const $ = this._currNode;
      if ($ instanceof p || _ && $ instanceof _)
        return this._nodes.pop(), this;
      throw new Error(`CodeGen: not in block "${_ ? `${p.kind}/${_.kind}` : p.kind}"`);
    }
    _elseNode(p) {
      const _ = this._currNode;
      if (!(_ instanceof m))
        throw new Error('CodeGen: "else" without "if"');
      return this._currNode = _.else = p, this;
    }
    get _root() {
      return this._nodes[0];
    }
    get _currNode() {
      const p = this._nodes;
      return p[p.length - 1];
    }
    set _currNode(p) {
      const _ = this._nodes;
      _[_.length - 1] = p;
    }
  }
  e.CodeGen = x;
  function W(I, p) {
    for (const _ in p)
      I[_] = (I[_] || 0) + (p[_] || 0);
    return I;
  }
  function J(I, p) {
    return p instanceof t._CodeOrName ? W(I, p.names) : I;
  }
  function k(I, p, _) {
    if (I instanceof t.Name)
      return $(I);
    if (!K(I))
      return I;
    return new t._Code(I._items.reduce((M, ie) => (ie instanceof t.Name && (ie = $(ie)), ie instanceof t._Code ? M.push(...ie._items) : M.push(ie), M), []));
    function $(M) {
      const ie = _[M.str];
      return ie === void 0 || p[M.str] !== 1 ? M : (delete p[M.str], ie);
    }
    function K(M) {
      return M instanceof t._Code && M._items.some((ie) => ie instanceof t.Name && p[ie.str] === 1 && _[ie.str] !== void 0);
    }
  }
  function L(I, p) {
    for (const _ in p)
      I[_] = (I[_] || 0) - (p[_] || 0);
  }
  function V(I) {
    return typeof I == "boolean" || typeof I == "number" || I === null ? !I : (0, t._)`!${D(I)}`;
  }
  e.not = V;
  const j = w(e.operators.AND);
  function T(...I) {
    return I.reduce(j);
  }
  e.and = T;
  const C = w(e.operators.OR);
  function b(...I) {
    return I.reduce(C);
  }
  e.or = b;
  function w(I) {
    return (p, _) => p === t.nil ? _ : _ === t.nil ? p : (0, t._)`${D(p)} ${I} ${D(_)}`;
  }
  function D(I) {
    return I instanceof t.Name ? I : (0, t._)`(${I})`;
  }
})(te);
var q = {};
Object.defineProperty(q, "__esModule", { value: !0 });
q.checkStrictMode = q.getErrorPath = q.Type = q.useFunc = q.setEvaluated = q.evaluatedPropsToName = q.mergeEvaluated = q.eachItem = q.unescapeJsonPointer = q.escapeJsonPointer = q.escapeFragment = q.unescapeFragment = q.schemaRefOrVal = q.schemaHasRulesButRef = q.schemaHasRules = q.checkUnknownRules = q.alwaysValidSchema = q.toHash = void 0;
const de = te, Of = Rr;
function If(e) {
  const t = {};
  for (const r of e)
    t[r] = !0;
  return t;
}
q.toHash = If;
function Nf(e, t) {
  return typeof t == "boolean" ? t : Object.keys(t).length === 0 ? !0 : (Fa(e, t), !ka(t, e.self.RULES.all));
}
q.alwaysValidSchema = Nf;
function Fa(e, t = e.schema) {
  const { opts: r, self: n } = e;
  if (!r.strictSchema || typeof t == "boolean")
    return;
  const i = n.RULES.keywords;
  for (const s in t)
    i[s] || xa(e, `unknown keyword: "${s}"`);
}
q.checkUnknownRules = Fa;
function ka(e, t) {
  if (typeof e == "boolean")
    return !e;
  for (const r in e)
    if (t[r])
      return !0;
  return !1;
}
q.schemaHasRules = ka;
function Pf(e, t) {
  if (typeof e == "boolean")
    return !e;
  for (const r in e)
    if (r !== "$ref" && t.all[r])
      return !0;
  return !1;
}
q.schemaHasRulesButRef = Pf;
function Tf({ topSchemaRef: e, schemaPath: t }, r, n, i) {
  if (!i) {
    if (typeof r == "number" || typeof r == "boolean")
      return r;
    if (typeof r == "string")
      return (0, de._)`${r}`;
  }
  return (0, de._)`${e}${t}${(0, de.getProperty)(n)}`;
}
q.schemaRefOrVal = Tf;
function Rf(e) {
  return ja(decodeURIComponent(e));
}
q.unescapeFragment = Rf;
function Cf(e) {
  return encodeURIComponent(Di(e));
}
q.escapeFragment = Cf;
function Di(e) {
  return typeof e == "number" ? `${e}` : e.replace(/~/g, "~0").replace(/\//g, "~1");
}
q.escapeJsonPointer = Di;
function ja(e) {
  return e.replace(/~1/g, "/").replace(/~0/g, "~");
}
q.unescapeJsonPointer = ja;
function Df(e, t) {
  if (Array.isArray(e))
    for (const r of e)
      t(r);
  else
    t(e);
}
q.eachItem = Df;
function Bs({ mergeNames: e, mergeToName: t, mergeValues: r, resultToName: n }) {
  return (i, s, o, l) => {
    const a = o === void 0 ? s : o instanceof de.Name ? (s instanceof de.Name ? e(i, s, o) : t(i, s, o), o) : s instanceof de.Name ? (t(i, o, s), s) : r(s, o);
    return l === de.Name && !(a instanceof de.Name) ? n(i, a) : a;
  };
}
q.mergeEvaluated = {
  props: Bs({
    mergeNames: (e, t, r) => e.if((0, de._)`${r} !== true && ${t} !== undefined`, () => {
      e.if((0, de._)`${t} === true`, () => e.assign(r, !0), () => e.assign(r, (0, de._)`${r} || {}`).code((0, de._)`Object.assign(${r}, ${t})`));
    }),
    mergeToName: (e, t, r) => e.if((0, de._)`${r} !== true`, () => {
      t === !0 ? e.assign(r, !0) : (e.assign(r, (0, de._)`${r} || {}`), Ai(e, r, t));
    }),
    mergeValues: (e, t) => e === !0 ? !0 : { ...e, ...t },
    resultToName: Ma
  }),
  items: Bs({
    mergeNames: (e, t, r) => e.if((0, de._)`${r} !== true && ${t} !== undefined`, () => e.assign(r, (0, de._)`${t} === true ? true : ${r} > ${t} ? ${r} : ${t}`)),
    mergeToName: (e, t, r) => e.if((0, de._)`${r} !== true`, () => e.assign(r, t === !0 ? !0 : (0, de._)`${r} > ${t} ? ${r} : ${t}`)),
    mergeValues: (e, t) => e === !0 ? !0 : Math.max(e, t),
    resultToName: (e, t) => e.var("items", t)
  })
};
function Ma(e, t) {
  if (t === !0)
    return e.var("props", !0);
  const r = e.var("props", (0, de._)`{}`);
  return t !== void 0 && Ai(e, r, t), r;
}
q.evaluatedPropsToName = Ma;
function Ai(e, t, r) {
  Object.keys(r).forEach((n) => e.assign((0, de._)`${t}${(0, de.getProperty)(n)}`, !0));
}
q.setEvaluated = Ai;
const Hs = {};
function Af(e, t) {
  return e.scopeValue("func", {
    ref: t,
    code: Hs[t.code] || (Hs[t.code] = new Of._Code(t.code))
  });
}
q.useFunc = Af;
var oi;
(function(e) {
  e[e.Num = 0] = "Num", e[e.Str = 1] = "Str";
})(oi || (q.Type = oi = {}));
function Lf(e, t, r) {
  if (e instanceof de.Name) {
    const n = t === oi.Num;
    return r ? n ? (0, de._)`"[" + ${e} + "]"` : (0, de._)`"['" + ${e} + "']"` : n ? (0, de._)`"/" + ${e}` : (0, de._)`"/" + ${e}.replace(/~/g, "~0").replace(/\\//g, "~1")`;
  }
  return r ? (0, de.getProperty)(e).toString() : "/" + Di(e);
}
q.getErrorPath = Lf;
function xa(e, t, r = e.opts.strictSchema) {
  if (r) {
    if (t = `strict mode: ${t}`, r === !0)
      throw new Error(t);
    e.self.logger.warn(t);
  }
}
q.checkStrictMode = xa;
var mt = {};
Object.defineProperty(mt, "__esModule", { value: !0 });
const je = te, Ff = {
  // validation function arguments
  data: new je.Name("data"),
  // data passed to validation function
  // args passed from referencing schema
  valCxt: new je.Name("valCxt"),
  // validation/data context - should not be used directly, it is destructured to the names below
  instancePath: new je.Name("instancePath"),
  parentData: new je.Name("parentData"),
  parentDataProperty: new je.Name("parentDataProperty"),
  rootData: new je.Name("rootData"),
  // root data - same as the data passed to the first/top validation function
  dynamicAnchors: new je.Name("dynamicAnchors"),
  // used to support recursiveRef and dynamicRef
  // function scoped variables
  vErrors: new je.Name("vErrors"),
  // null or array of validation errors
  errors: new je.Name("errors"),
  // counter of validation errors
  this: new je.Name("this"),
  // "globals"
  self: new je.Name("self"),
  scope: new je.Name("scope"),
  // JTD serialize/parse name for JSON string and position
  json: new je.Name("json"),
  jsonPos: new je.Name("jsonPos"),
  jsonLen: new je.Name("jsonLen"),
  jsonPart: new je.Name("jsonPart")
};
mt.default = Ff;
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.extendErrors = e.resetErrorsCount = e.reportExtraError = e.reportError = e.keyword$DataError = e.keywordError = void 0;
  const t = te, r = q, n = mt;
  e.keywordError = {
    message: ({ keyword: y }) => (0, t.str)`must pass "${y}" keyword validation`
  }, e.keyword$DataError = {
    message: ({ keyword: y, schemaType: m }) => m ? (0, t.str)`"${y}" keyword must be ${m} ($data)` : (0, t.str)`"${y}" keyword is invalid ($data)`
  };
  function i(y, m = e.keywordError, h, v) {
    const { it: O } = y, { gen: N, compositeRule: F, allErrors: U } = O, R = E(y, m, h);
    v ?? (F || U) ? a(N, R) : c(O, (0, t._)`[${R}]`);
  }
  e.reportError = i;
  function s(y, m = e.keywordError, h) {
    const { it: v } = y, { gen: O, compositeRule: N, allErrors: F } = v, U = E(y, m, h);
    a(O, U), N || F || c(v, n.default.vErrors);
  }
  e.reportExtraError = s;
  function o(y, m) {
    y.assign(n.default.errors, m), y.if((0, t._)`${n.default.vErrors} !== null`, () => y.if(m, () => y.assign((0, t._)`${n.default.vErrors}.length`, m), () => y.assign(n.default.vErrors, null)));
  }
  e.resetErrorsCount = o;
  function l({ gen: y, keyword: m, schemaValue: h, data: v, errsCount: O, it: N }) {
    if (O === void 0)
      throw new Error("ajv implementation error");
    const F = y.name("err");
    y.forRange("i", O, n.default.errors, (U) => {
      y.const(F, (0, t._)`${n.default.vErrors}[${U}]`), y.if((0, t._)`${F}.instancePath === undefined`, () => y.assign((0, t._)`${F}.instancePath`, (0, t.strConcat)(n.default.instancePath, N.errorPath))), y.assign((0, t._)`${F}.schemaPath`, (0, t.str)`${N.errSchemaPath}/${m}`), N.opts.verbose && (y.assign((0, t._)`${F}.schema`, h), y.assign((0, t._)`${F}.data`, v));
    });
  }
  e.extendErrors = l;
  function a(y, m) {
    const h = y.const("err", m);
    y.if((0, t._)`${n.default.vErrors} === null`, () => y.assign(n.default.vErrors, (0, t._)`[${h}]`), (0, t._)`${n.default.vErrors}.push(${h})`), y.code((0, t._)`${n.default.errors}++`);
  }
  function c(y, m) {
    const { gen: h, validateName: v, schemaEnv: O } = y;
    O.$async ? h.throw((0, t._)`new ${y.ValidationError}(${m})`) : (h.assign((0, t._)`${v}.errors`, m), h.return(!1));
  }
  const f = {
    keyword: new t.Name("keyword"),
    schemaPath: new t.Name("schemaPath"),
    // also used in JTD errors
    params: new t.Name("params"),
    propertyName: new t.Name("propertyName"),
    message: new t.Name("message"),
    schema: new t.Name("schema"),
    parentSchema: new t.Name("parentSchema")
  };
  function E(y, m, h) {
    const { createErrors: v } = y.it;
    return v === !1 ? (0, t._)`{}` : S(y, m, h);
  }
  function S(y, m, h = {}) {
    const { gen: v, it: O } = y, N = [
      u(O, h),
      d(y, h)
    ];
    return g(y, m, N), v.object(...N);
  }
  function u({ errorPath: y }, { instancePath: m }) {
    const h = m ? (0, t.str)`${y}${(0, r.getErrorPath)(m, r.Type.Str)}` : y;
    return [n.default.instancePath, (0, t.strConcat)(n.default.instancePath, h)];
  }
  function d({ keyword: y, it: { errSchemaPath: m } }, { schemaPath: h, parentSchema: v }) {
    let O = v ? m : (0, t.str)`${m}/${y}`;
    return h && (O = (0, t.str)`${O}${(0, r.getErrorPath)(h, r.Type.Str)}`), [f.schemaPath, O];
  }
  function g(y, { params: m, message: h }, v) {
    const { keyword: O, data: N, schemaValue: F, it: U } = y, { opts: R, propertyName: P, topSchemaRef: A, schemaPath: x } = U;
    v.push([f.keyword, O], [f.params, typeof m == "function" ? m(y) : m || (0, t._)`{}`]), R.messages && v.push([f.message, typeof h == "function" ? h(y) : h]), R.verbose && v.push([f.schema, F], [f.parentSchema, (0, t._)`${A}${x}`], [n.default.data, N]), P && v.push([f.propertyName, P]);
  }
})(kr);
Object.defineProperty(tr, "__esModule", { value: !0 });
tr.boolOrEmptySchema = tr.topBoolOrEmptySchema = void 0;
const kf = kr, jf = te, Mf = mt, xf = {
  message: "boolean schema is false"
};
function Uf(e) {
  const { gen: t, schema: r, validateName: n } = e;
  r === !1 ? Ua(e, !1) : typeof r == "object" && r.$async === !0 ? t.return(Mf.default.data) : (t.assign((0, jf._)`${n}.errors`, null), t.return(!0));
}
tr.topBoolOrEmptySchema = Uf;
function zf(e, t) {
  const { gen: r, schema: n } = e;
  n === !1 ? (r.var(t, !1), Ua(e)) : r.var(t, !0);
}
tr.boolOrEmptySchema = zf;
function Ua(e, t) {
  const { gen: r, data: n } = e, i = {
    gen: r,
    keyword: "false schema",
    data: n,
    schema: !1,
    schemaCode: !1,
    schemaValue: !1,
    params: {},
    it: e
  };
  (0, kf.reportError)(i, xf, void 0, t);
}
var Pe = {}, Mt = {};
Object.defineProperty(Mt, "__esModule", { value: !0 });
Mt.getRules = Mt.isJSONType = void 0;
const Vf = ["string", "number", "integer", "boolean", "null", "object", "array"], Gf = new Set(Vf);
function Bf(e) {
  return typeof e == "string" && Gf.has(e);
}
Mt.isJSONType = Bf;
function Hf() {
  const e = {
    number: { type: "number", rules: [] },
    string: { type: "string", rules: [] },
    array: { type: "array", rules: [] },
    object: { type: "object", rules: [] }
  };
  return {
    types: { ...e, integer: !0, boolean: !0, null: !0 },
    rules: [{ rules: [] }, e.number, e.string, e.array, e.object],
    post: { rules: [] },
    all: {},
    keywords: {}
  };
}
Mt.getRules = Hf;
var Et = {};
Object.defineProperty(Et, "__esModule", { value: !0 });
Et.shouldUseRule = Et.shouldUseGroup = Et.schemaHasRulesForType = void 0;
function qf({ schema: e, self: t }, r) {
  const n = t.RULES.types[r];
  return n && n !== !0 && za(e, n);
}
Et.schemaHasRulesForType = qf;
function za(e, t) {
  return t.rules.some((r) => Va(e, r));
}
Et.shouldUseGroup = za;
function Va(e, t) {
  var r;
  return e[t.keyword] !== void 0 || ((r = t.definition.implements) === null || r === void 0 ? void 0 : r.some((n) => e[n] !== void 0));
}
Et.shouldUseRule = Va;
Object.defineProperty(Pe, "__esModule", { value: !0 });
Pe.reportTypeError = Pe.checkDataTypes = Pe.checkDataType = Pe.coerceAndCheckDataType = Pe.getJSONTypes = Pe.getSchemaTypes = Pe.DataType = void 0;
const Wf = Mt, Kf = Et, Xf = kr, Q = te, Ga = q;
var Zt;
(function(e) {
  e[e.Correct = 0] = "Correct", e[e.Wrong = 1] = "Wrong";
})(Zt || (Pe.DataType = Zt = {}));
function Zf(e) {
  const t = Ba(e.type);
  if (t.includes("null")) {
    if (e.nullable === !1)
      throw new Error("type: null contradicts nullable: false");
  } else {
    if (!t.length && e.nullable !== void 0)
      throw new Error('"nullable" cannot be used without "type"');
    e.nullable === !0 && t.push("null");
  }
  return t;
}
Pe.getSchemaTypes = Zf;
function Ba(e) {
  const t = Array.isArray(e) ? e : e ? [e] : [];
  if (t.every(Wf.isJSONType))
    return t;
  throw new Error("type must be JSONType or JSONType[]: " + t.join(","));
}
Pe.getJSONTypes = Ba;
function Jf(e, t) {
  const { gen: r, data: n, opts: i } = e, s = Yf(t, i.coerceTypes), o = t.length > 0 && !(s.length === 0 && t.length === 1 && (0, Kf.schemaHasRulesForType)(e, t[0]));
  if (o) {
    const l = Li(t, n, i.strictNumbers, Zt.Wrong);
    r.if(l, () => {
      s.length ? Qf(e, t, s) : Fi(e);
    });
  }
  return o;
}
Pe.coerceAndCheckDataType = Jf;
const Ha = /* @__PURE__ */ new Set(["string", "number", "integer", "boolean", "null"]);
function Yf(e, t) {
  return t ? e.filter((r) => Ha.has(r) || t === "array" && r === "array") : [];
}
function Qf(e, t, r) {
  const { gen: n, data: i, opts: s } = e, o = n.let("dataType", (0, Q._)`typeof ${i}`), l = n.let("coerced", (0, Q._)`undefined`);
  s.coerceTypes === "array" && n.if((0, Q._)`${o} == 'object' && Array.isArray(${i}) && ${i}.length == 1`, () => n.assign(i, (0, Q._)`${i}[0]`).assign(o, (0, Q._)`typeof ${i}`).if(Li(t, i, s.strictNumbers), () => n.assign(l, i))), n.if((0, Q._)`${l} !== undefined`);
  for (const c of r)
    (Ha.has(c) || c === "array" && s.coerceTypes === "array") && a(c);
  n.else(), Fi(e), n.endIf(), n.if((0, Q._)`${l} !== undefined`, () => {
    n.assign(i, l), eu(e, l);
  });
  function a(c) {
    switch (c) {
      case "string":
        n.elseIf((0, Q._)`${o} == "number" || ${o} == "boolean"`).assign(l, (0, Q._)`"" + ${i}`).elseIf((0, Q._)`${i} === null`).assign(l, (0, Q._)`""`);
        return;
      case "number":
        n.elseIf((0, Q._)`${o} == "boolean" || ${i} === null
              || (${o} == "string" && ${i} && ${i} == +${i})`).assign(l, (0, Q._)`+${i}`);
        return;
      case "integer":
        n.elseIf((0, Q._)`${o} === "boolean" || ${i} === null
              || (${o} === "string" && ${i} && ${i} == +${i} && !(${i} % 1))`).assign(l, (0, Q._)`+${i}`);
        return;
      case "boolean":
        n.elseIf((0, Q._)`${i} === "false" || ${i} === 0 || ${i} === null`).assign(l, !1).elseIf((0, Q._)`${i} === "true" || ${i} === 1`).assign(l, !0);
        return;
      case "null":
        n.elseIf((0, Q._)`${i} === "" || ${i} === 0 || ${i} === false`), n.assign(l, null);
        return;
      case "array":
        n.elseIf((0, Q._)`${o} === "string" || ${o} === "number"
              || ${o} === "boolean" || ${i} === null`).assign(l, (0, Q._)`[${i}]`);
    }
  }
}
function eu({ gen: e, parentData: t, parentDataProperty: r }, n) {
  e.if((0, Q._)`${t} !== undefined`, () => e.assign((0, Q._)`${t}[${r}]`, n));
}
function ai(e, t, r, n = Zt.Correct) {
  const i = n === Zt.Correct ? Q.operators.EQ : Q.operators.NEQ;
  let s;
  switch (e) {
    case "null":
      return (0, Q._)`${t} ${i} null`;
    case "array":
      s = (0, Q._)`Array.isArray(${t})`;
      break;
    case "object":
      s = (0, Q._)`${t} && typeof ${t} == "object" && !Array.isArray(${t})`;
      break;
    case "integer":
      s = o((0, Q._)`!(${t} % 1) && !isNaN(${t})`);
      break;
    case "number":
      s = o();
      break;
    default:
      return (0, Q._)`typeof ${t} ${i} ${e}`;
  }
  return n === Zt.Correct ? s : (0, Q.not)(s);
  function o(l = Q.nil) {
    return (0, Q.and)((0, Q._)`typeof ${t} == "number"`, l, r ? (0, Q._)`isFinite(${t})` : Q.nil);
  }
}
Pe.checkDataType = ai;
function Li(e, t, r, n) {
  if (e.length === 1)
    return ai(e[0], t, r, n);
  let i;
  const s = (0, Ga.toHash)(e);
  if (s.array && s.object) {
    const o = (0, Q._)`typeof ${t} != "object"`;
    i = s.null ? o : (0, Q._)`!${t} || ${o}`, delete s.null, delete s.array, delete s.object;
  } else
    i = Q.nil;
  s.number && delete s.integer;
  for (const o in s)
    i = (0, Q.and)(i, ai(o, t, r, n));
  return i;
}
Pe.checkDataTypes = Li;
const tu = {
  message: ({ schema: e }) => `must be ${e}`,
  params: ({ schema: e, schemaValue: t }) => typeof e == "string" ? (0, Q._)`{type: ${e}}` : (0, Q._)`{type: ${t}}`
};
function Fi(e) {
  const t = ru(e);
  (0, Xf.reportError)(t, tu);
}
Pe.reportTypeError = Fi;
function ru(e) {
  const { gen: t, data: r, schema: n } = e, i = (0, Ga.schemaRefOrVal)(e, n, "type");
  return {
    gen: t,
    keyword: "type",
    data: r,
    schema: n.type,
    schemaCode: i,
    schemaValue: i,
    parentSchema: n,
    params: {},
    it: e
  };
}
var Sn = {};
Object.defineProperty(Sn, "__esModule", { value: !0 });
Sn.assignDefaults = void 0;
const Gt = te, nu = q;
function iu(e, t) {
  const { properties: r, items: n } = e.schema;
  if (t === "object" && r)
    for (const i in r)
      qs(e, i, r[i].default);
  else t === "array" && Array.isArray(n) && n.forEach((i, s) => qs(e, s, i.default));
}
Sn.assignDefaults = iu;
function qs(e, t, r) {
  const { gen: n, compositeRule: i, data: s, opts: o } = e;
  if (r === void 0)
    return;
  const l = (0, Gt._)`${s}${(0, Gt.getProperty)(t)}`;
  if (i) {
    (0, nu.checkStrictMode)(e, `default is ignored for: ${l}`);
    return;
  }
  let a = (0, Gt._)`${l} === undefined`;
  o.useDefaults === "empty" && (a = (0, Gt._)`${a} || ${l} === null || ${l} === ""`), n.if(a, (0, Gt._)`${l} = ${(0, Gt.stringify)(r)}`);
}
var dt = {}, re = {};
Object.defineProperty(re, "__esModule", { value: !0 });
re.validateUnion = re.validateArray = re.usePattern = re.callValidateCode = re.schemaProperties = re.allSchemaProperties = re.noPropertyInData = re.propertyInData = re.isOwnProperty = re.hasPropFunc = re.reportMissingProp = re.checkMissingProp = re.checkReportMissingProp = void 0;
const me = te, ki = q, vt = mt, su = q;
function ou(e, t) {
  const { gen: r, data: n, it: i } = e;
  r.if(Mi(r, n, t, i.opts.ownProperties), () => {
    e.setParams({ missingProperty: (0, me._)`${t}` }, !0), e.error();
  });
}
re.checkReportMissingProp = ou;
function au({ gen: e, data: t, it: { opts: r } }, n, i) {
  return (0, me.or)(...n.map((s) => (0, me.and)(Mi(e, t, s, r.ownProperties), (0, me._)`${i} = ${s}`)));
}
re.checkMissingProp = au;
function cu(e, t) {
  e.setParams({ missingProperty: t }, !0), e.error();
}
re.reportMissingProp = cu;
function qa(e) {
  return e.scopeValue("func", {
    // eslint-disable-next-line @typescript-eslint/unbound-method
    ref: Object.prototype.hasOwnProperty,
    code: (0, me._)`Object.prototype.hasOwnProperty`
  });
}
re.hasPropFunc = qa;
function ji(e, t, r) {
  return (0, me._)`${qa(e)}.call(${t}, ${r})`;
}
re.isOwnProperty = ji;
function lu(e, t, r, n) {
  const i = (0, me._)`${t}${(0, me.getProperty)(r)} !== undefined`;
  return n ? (0, me._)`${i} && ${ji(e, t, r)}` : i;
}
re.propertyInData = lu;
function Mi(e, t, r, n) {
  const i = (0, me._)`${t}${(0, me.getProperty)(r)} === undefined`;
  return n ? (0, me.or)(i, (0, me.not)(ji(e, t, r))) : i;
}
re.noPropertyInData = Mi;
function Wa(e) {
  return e ? Object.keys(e).filter((t) => t !== "__proto__") : [];
}
re.allSchemaProperties = Wa;
function fu(e, t) {
  return Wa(t).filter((r) => !(0, ki.alwaysValidSchema)(e, t[r]));
}
re.schemaProperties = fu;
function uu({ schemaCode: e, data: t, it: { gen: r, topSchemaRef: n, schemaPath: i, errorPath: s }, it: o }, l, a, c) {
  const f = c ? (0, me._)`${e}, ${t}, ${n}${i}` : t, E = [
    [vt.default.instancePath, (0, me.strConcat)(vt.default.instancePath, s)],
    [vt.default.parentData, o.parentData],
    [vt.default.parentDataProperty, o.parentDataProperty],
    [vt.default.rootData, vt.default.rootData]
  ];
  o.opts.dynamicRef && E.push([vt.default.dynamicAnchors, vt.default.dynamicAnchors]);
  const S = (0, me._)`${f}, ${r.object(...E)}`;
  return a !== me.nil ? (0, me._)`${l}.call(${a}, ${S})` : (0, me._)`${l}(${S})`;
}
re.callValidateCode = uu;
const du = (0, me._)`new RegExp`;
function hu({ gen: e, it: { opts: t } }, r) {
  const n = t.unicodeRegExp ? "u" : "", { regExp: i } = t.code, s = i(r, n);
  return e.scopeValue("pattern", {
    key: s.toString(),
    ref: s,
    code: (0, me._)`${i.code === "new RegExp" ? du : (0, su.useFunc)(e, i)}(${r}, ${n})`
  });
}
re.usePattern = hu;
function mu(e) {
  const { gen: t, data: r, keyword: n, it: i } = e, s = t.name("valid");
  if (i.allErrors) {
    const l = t.let("valid", !0);
    return o(() => t.assign(l, !1)), l;
  }
  return t.var(s, !0), o(() => t.break()), s;
  function o(l) {
    const a = t.const("len", (0, me._)`${r}.length`);
    t.forRange("i", 0, a, (c) => {
      e.subschema({
        keyword: n,
        dataProp: c,
        dataPropType: ki.Type.Num
      }, s), t.if((0, me.not)(s), l);
    });
  }
}
re.validateArray = mu;
function pu(e) {
  const { gen: t, schema: r, keyword: n, it: i } = e;
  if (!Array.isArray(r))
    throw new Error("ajv implementation error");
  if (r.some((a) => (0, ki.alwaysValidSchema)(i, a)) && !i.opts.unevaluated)
    return;
  const o = t.let("valid", !1), l = t.name("_valid");
  t.block(() => r.forEach((a, c) => {
    const f = e.subschema({
      keyword: n,
      schemaProp: c,
      compositeRule: !0
    }, l);
    t.assign(o, (0, me._)`${o} || ${l}`), e.mergeValidEvaluated(f, l) || t.if((0, me.not)(o));
  })), e.result(o, () => e.reset(), () => e.error(!0));
}
re.validateUnion = pu;
Object.defineProperty(dt, "__esModule", { value: !0 });
dt.validateKeywordUsage = dt.validSchemaType = dt.funcKeywordCode = dt.macroKeywordCode = void 0;
const ze = te, Lt = mt, yu = re, Eu = kr;
function gu(e, t) {
  const { gen: r, keyword: n, schema: i, parentSchema: s, it: o } = e, l = t.macro.call(o.self, i, s, o), a = Ka(r, n, l);
  o.opts.validateSchema !== !1 && o.self.validateSchema(l, !0);
  const c = r.name("valid");
  e.subschema({
    schema: l,
    schemaPath: ze.nil,
    errSchemaPath: `${o.errSchemaPath}/${n}`,
    topSchemaRef: a,
    compositeRule: !0
  }, c), e.pass(c, () => e.error(!0));
}
dt.macroKeywordCode = gu;
function $u(e, t) {
  var r;
  const { gen: n, keyword: i, schema: s, parentSchema: o, $data: l, it: a } = e;
  _u(a, t);
  const c = !l && t.compile ? t.compile.call(a.self, s, o, a) : t.validate, f = Ka(n, i, c), E = n.let("valid");
  e.block$data(E, S), e.ok((r = t.valid) !== null && r !== void 0 ? r : E);
  function S() {
    if (t.errors === !1)
      g(), t.modifying && Ws(e), y(() => e.error());
    else {
      const m = t.async ? u() : d();
      t.modifying && Ws(e), y(() => vu(e, m));
    }
  }
  function u() {
    const m = n.let("ruleErrs", null);
    return n.try(() => g((0, ze._)`await `), (h) => n.assign(E, !1).if((0, ze._)`${h} instanceof ${a.ValidationError}`, () => n.assign(m, (0, ze._)`${h}.errors`), () => n.throw(h))), m;
  }
  function d() {
    const m = (0, ze._)`${f}.errors`;
    return n.assign(m, null), g(ze.nil), m;
  }
  function g(m = t.async ? (0, ze._)`await ` : ze.nil) {
    const h = a.opts.passContext ? Lt.default.this : Lt.default.self, v = !("compile" in t && !l || t.schema === !1);
    n.assign(E, (0, ze._)`${m}${(0, yu.callValidateCode)(e, f, h, v)}`, t.modifying);
  }
  function y(m) {
    var h;
    n.if((0, ze.not)((h = t.valid) !== null && h !== void 0 ? h : E), m);
  }
}
dt.funcKeywordCode = $u;
function Ws(e) {
  const { gen: t, data: r, it: n } = e;
  t.if(n.parentData, () => t.assign(r, (0, ze._)`${n.parentData}[${n.parentDataProperty}]`));
}
function vu(e, t) {
  const { gen: r } = e;
  r.if((0, ze._)`Array.isArray(${t})`, () => {
    r.assign(Lt.default.vErrors, (0, ze._)`${Lt.default.vErrors} === null ? ${t} : ${Lt.default.vErrors}.concat(${t})`).assign(Lt.default.errors, (0, ze._)`${Lt.default.vErrors}.length`), (0, Eu.extendErrors)(e);
  }, () => e.error());
}
function _u({ schemaEnv: e }, t) {
  if (t.async && !e.$async)
    throw new Error("async keyword in sync schema");
}
function Ka(e, t, r) {
  if (r === void 0)
    throw new Error(`keyword "${t}" failed to compile`);
  return e.scopeValue("keyword", typeof r == "function" ? { ref: r } : { ref: r, code: (0, ze.stringify)(r) });
}
function Su(e, t, r = !1) {
  return !t.length || t.some((n) => n === "array" ? Array.isArray(e) : n === "object" ? e && typeof e == "object" && !Array.isArray(e) : typeof e == n || r && typeof e > "u");
}
dt.validSchemaType = Su;
function wu({ schema: e, opts: t, self: r, errSchemaPath: n }, i, s) {
  if (Array.isArray(i.keyword) ? !i.keyword.includes(s) : i.keyword !== s)
    throw new Error("ajv implementation error");
  const o = i.dependencies;
  if (o?.some((l) => !Object.prototype.hasOwnProperty.call(e, l)))
    throw new Error(`parent schema must have dependencies of ${s}: ${o.join(",")}`);
  if (i.validateSchema && !i.validateSchema(e[s])) {
    const a = `keyword "${s}" value is invalid at path "${n}": ` + r.errorsText(i.validateSchema.errors);
    if (t.validateSchema === "log")
      r.logger.error(a);
    else
      throw new Error(a);
  }
}
dt.validateKeywordUsage = wu;
var Rt = {};
Object.defineProperty(Rt, "__esModule", { value: !0 });
Rt.extendSubschemaMode = Rt.extendSubschemaData = Rt.getSubschema = void 0;
const lt = te, Xa = q;
function bu(e, { keyword: t, schemaProp: r, schema: n, schemaPath: i, errSchemaPath: s, topSchemaRef: o }) {
  if (t !== void 0 && n !== void 0)
    throw new Error('both "keyword" and "schema" passed, only one allowed');
  if (t !== void 0) {
    const l = e.schema[t];
    return r === void 0 ? {
      schema: l,
      schemaPath: (0, lt._)`${e.schemaPath}${(0, lt.getProperty)(t)}`,
      errSchemaPath: `${e.errSchemaPath}/${t}`
    } : {
      schema: l[r],
      schemaPath: (0, lt._)`${e.schemaPath}${(0, lt.getProperty)(t)}${(0, lt.getProperty)(r)}`,
      errSchemaPath: `${e.errSchemaPath}/${t}/${(0, Xa.escapeFragment)(r)}`
    };
  }
  if (n !== void 0) {
    if (i === void 0 || s === void 0 || o === void 0)
      throw new Error('"schemaPath", "errSchemaPath" and "topSchemaRef" are required with "schema"');
    return {
      schema: n,
      schemaPath: i,
      topSchemaRef: o,
      errSchemaPath: s
    };
  }
  throw new Error('either "keyword" or "schema" must be passed');
}
Rt.getSubschema = bu;
function Ou(e, t, { dataProp: r, dataPropType: n, data: i, dataTypes: s, propertyName: o }) {
  if (i !== void 0 && r !== void 0)
    throw new Error('both "data" and "dataProp" passed, only one allowed');
  const { gen: l } = t;
  if (r !== void 0) {
    const { errorPath: c, dataPathArr: f, opts: E } = t, S = l.let("data", (0, lt._)`${t.data}${(0, lt.getProperty)(r)}`, !0);
    a(S), e.errorPath = (0, lt.str)`${c}${(0, Xa.getErrorPath)(r, n, E.jsPropertySyntax)}`, e.parentDataProperty = (0, lt._)`${r}`, e.dataPathArr = [...f, e.parentDataProperty];
  }
  if (i !== void 0) {
    const c = i instanceof lt.Name ? i : l.let("data", i, !0);
    a(c), o !== void 0 && (e.propertyName = o);
  }
  s && (e.dataTypes = s);
  function a(c) {
    e.data = c, e.dataLevel = t.dataLevel + 1, e.dataTypes = [], t.definedProperties = /* @__PURE__ */ new Set(), e.parentData = t.data, e.dataNames = [...t.dataNames, c];
  }
}
Rt.extendSubschemaData = Ou;
function Iu(e, { jtdDiscriminator: t, jtdMetadata: r, compositeRule: n, createErrors: i, allErrors: s }) {
  n !== void 0 && (e.compositeRule = n), i !== void 0 && (e.createErrors = i), s !== void 0 && (e.allErrors = s), e.jtdDiscriminator = t, e.jtdMetadata = r;
}
Rt.extendSubschemaMode = Iu;
var Fe = {}, Za = function e(t, r) {
  if (t === r) return !0;
  if (t && r && typeof t == "object" && typeof r == "object") {
    if (t.constructor !== r.constructor) return !1;
    var n, i, s;
    if (Array.isArray(t)) {
      if (n = t.length, n != r.length) return !1;
      for (i = n; i-- !== 0; )
        if (!e(t[i], r[i])) return !1;
      return !0;
    }
    if (t.constructor === RegExp) return t.source === r.source && t.flags === r.flags;
    if (t.valueOf !== Object.prototype.valueOf) return t.valueOf() === r.valueOf();
    if (t.toString !== Object.prototype.toString) return t.toString() === r.toString();
    if (s = Object.keys(t), n = s.length, n !== Object.keys(r).length) return !1;
    for (i = n; i-- !== 0; )
      if (!Object.prototype.hasOwnProperty.call(r, s[i])) return !1;
    for (i = n; i-- !== 0; ) {
      var o = s[i];
      if (!e(t[o], r[o])) return !1;
    }
    return !0;
  }
  return t !== t && r !== r;
}, Ja = { exports: {} }, Pt = Ja.exports = function(e, t, r) {
  typeof t == "function" && (r = t, t = {}), r = t.cb || r;
  var n = typeof r == "function" ? r : r.pre || function() {
  }, i = r.post || function() {
  };
  sn(t, n, i, e, "", e);
};
Pt.keywords = {
  additionalItems: !0,
  items: !0,
  contains: !0,
  additionalProperties: !0,
  propertyNames: !0,
  not: !0,
  if: !0,
  then: !0,
  else: !0
};
Pt.arrayKeywords = {
  items: !0,
  allOf: !0,
  anyOf: !0,
  oneOf: !0
};
Pt.propsKeywords = {
  $defs: !0,
  definitions: !0,
  properties: !0,
  patternProperties: !0,
  dependencies: !0
};
Pt.skipKeywords = {
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
function sn(e, t, r, n, i, s, o, l, a, c) {
  if (n && typeof n == "object" && !Array.isArray(n)) {
    t(n, i, s, o, l, a, c);
    for (var f in n) {
      var E = n[f];
      if (Array.isArray(E)) {
        if (f in Pt.arrayKeywords)
          for (var S = 0; S < E.length; S++)
            sn(e, t, r, E[S], i + "/" + f + "/" + S, s, i, f, n, S);
      } else if (f in Pt.propsKeywords) {
        if (E && typeof E == "object")
          for (var u in E)
            sn(e, t, r, E[u], i + "/" + f + "/" + Nu(u), s, i, f, n, u);
      } else (f in Pt.keywords || e.allKeys && !(f in Pt.skipKeywords)) && sn(e, t, r, E, i + "/" + f, s, i, f, n);
    }
    r(n, i, s, o, l, a, c);
  }
}
function Nu(e) {
  return e.replace(/~/g, "~0").replace(/\//g, "~1");
}
var Pu = Ja.exports;
Object.defineProperty(Fe, "__esModule", { value: !0 });
Fe.getSchemaRefs = Fe.resolveUrl = Fe.normalizeId = Fe._getFullPath = Fe.getFullPath = Fe.inlineRef = void 0;
const Tu = q, Ru = Za, Cu = Pu, Du = /* @__PURE__ */ new Set([
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
function Au(e, t = !0) {
  return typeof e == "boolean" ? !0 : t === !0 ? !ci(e) : t ? Ya(e) <= t : !1;
}
Fe.inlineRef = Au;
const Lu = /* @__PURE__ */ new Set([
  "$ref",
  "$recursiveRef",
  "$recursiveAnchor",
  "$dynamicRef",
  "$dynamicAnchor"
]);
function ci(e) {
  for (const t in e) {
    if (Lu.has(t))
      return !0;
    const r = e[t];
    if (Array.isArray(r) && r.some(ci) || typeof r == "object" && ci(r))
      return !0;
  }
  return !1;
}
function Ya(e) {
  let t = 0;
  for (const r in e) {
    if (r === "$ref")
      return 1 / 0;
    if (t++, !Du.has(r) && (typeof e[r] == "object" && (0, Tu.eachItem)(e[r], (n) => t += Ya(n)), t === 1 / 0))
      return 1 / 0;
  }
  return t;
}
function Qa(e, t = "", r) {
  r !== !1 && (t = Jt(t));
  const n = e.parse(t);
  return ec(e, n);
}
Fe.getFullPath = Qa;
function ec(e, t) {
  return e.serialize(t).split("#")[0] + "#";
}
Fe._getFullPath = ec;
const Fu = /#\/?$/;
function Jt(e) {
  return e ? e.replace(Fu, "") : "";
}
Fe.normalizeId = Jt;
function ku(e, t, r) {
  return r = Jt(r), e.resolve(t, r);
}
Fe.resolveUrl = ku;
const ju = /^[a-z_][-a-z0-9._]*$/i;
function Mu(e, t) {
  if (typeof e == "boolean")
    return {};
  const { schemaId: r, uriResolver: n } = this.opts, i = Jt(e[r] || t), s = { "": i }, o = Qa(n, i, !1), l = {}, a = /* @__PURE__ */ new Set();
  return Cu(e, { allKeys: !0 }, (E, S, u, d) => {
    if (d === void 0)
      return;
    const g = o + S;
    let y = s[d];
    typeof E[r] == "string" && (y = m.call(this, E[r])), h.call(this, E.$anchor), h.call(this, E.$dynamicAnchor), s[S] = y;
    function m(v) {
      const O = this.opts.uriResolver.resolve;
      if (v = Jt(y ? O(y, v) : v), a.has(v))
        throw f(v);
      a.add(v);
      let N = this.refs[v];
      return typeof N == "string" && (N = this.refs[N]), typeof N == "object" ? c(E, N.schema, v) : v !== Jt(g) && (v[0] === "#" ? (c(E, l[v], v), l[v] = E) : this.refs[v] = g), v;
    }
    function h(v) {
      if (typeof v == "string") {
        if (!ju.test(v))
          throw new Error(`invalid anchor "${v}"`);
        m.call(this, `#${v}`);
      }
    }
  }), l;
  function c(E, S, u) {
    if (S !== void 0 && !Ru(E, S))
      throw f(u);
  }
  function f(E) {
    return new Error(`reference "${E}" resolves to more than one schema`);
  }
}
Fe.getSchemaRefs = Mu;
Object.defineProperty(nt, "__esModule", { value: !0 });
nt.getData = nt.KeywordCxt = nt.validateFunctionCode = void 0;
const tc = tr, Ks = Pe, xi = Et, mn = Pe, xu = Sn, br = dt, Vn = Rt, X = te, Z = mt, Uu = Fe, gt = q, $r = kr;
function zu(e) {
  if (ic(e) && (sc(e), nc(e))) {
    Bu(e);
    return;
  }
  rc(e, () => (0, tc.topBoolOrEmptySchema)(e));
}
nt.validateFunctionCode = zu;
function rc({ gen: e, validateName: t, schema: r, schemaEnv: n, opts: i }, s) {
  i.code.es5 ? e.func(t, (0, X._)`${Z.default.data}, ${Z.default.valCxt}`, n.$async, () => {
    e.code((0, X._)`"use strict"; ${Xs(r, i)}`), Gu(e, i), e.code(s);
  }) : e.func(t, (0, X._)`${Z.default.data}, ${Vu(i)}`, n.$async, () => e.code(Xs(r, i)).code(s));
}
function Vu(e) {
  return (0, X._)`{${Z.default.instancePath}="", ${Z.default.parentData}, ${Z.default.parentDataProperty}, ${Z.default.rootData}=${Z.default.data}${e.dynamicRef ? (0, X._)`, ${Z.default.dynamicAnchors}={}` : X.nil}}={}`;
}
function Gu(e, t) {
  e.if(Z.default.valCxt, () => {
    e.var(Z.default.instancePath, (0, X._)`${Z.default.valCxt}.${Z.default.instancePath}`), e.var(Z.default.parentData, (0, X._)`${Z.default.valCxt}.${Z.default.parentData}`), e.var(Z.default.parentDataProperty, (0, X._)`${Z.default.valCxt}.${Z.default.parentDataProperty}`), e.var(Z.default.rootData, (0, X._)`${Z.default.valCxt}.${Z.default.rootData}`), t.dynamicRef && e.var(Z.default.dynamicAnchors, (0, X._)`${Z.default.valCxt}.${Z.default.dynamicAnchors}`);
  }, () => {
    e.var(Z.default.instancePath, (0, X._)`""`), e.var(Z.default.parentData, (0, X._)`undefined`), e.var(Z.default.parentDataProperty, (0, X._)`undefined`), e.var(Z.default.rootData, Z.default.data), t.dynamicRef && e.var(Z.default.dynamicAnchors, (0, X._)`{}`);
  });
}
function Bu(e) {
  const { schema: t, opts: r, gen: n } = e;
  rc(e, () => {
    r.$comment && t.$comment && ac(e), Xu(e), n.let(Z.default.vErrors, null), n.let(Z.default.errors, 0), r.unevaluated && Hu(e), oc(e), Yu(e);
  });
}
function Hu(e) {
  const { gen: t, validateName: r } = e;
  e.evaluated = t.const("evaluated", (0, X._)`${r}.evaluated`), t.if((0, X._)`${e.evaluated}.dynamicProps`, () => t.assign((0, X._)`${e.evaluated}.props`, (0, X._)`undefined`)), t.if((0, X._)`${e.evaluated}.dynamicItems`, () => t.assign((0, X._)`${e.evaluated}.items`, (0, X._)`undefined`));
}
function Xs(e, t) {
  const r = typeof e == "object" && e[t.schemaId];
  return r && (t.code.source || t.code.process) ? (0, X._)`/*# sourceURL=${r} */` : X.nil;
}
function qu(e, t) {
  if (ic(e) && (sc(e), nc(e))) {
    Wu(e, t);
    return;
  }
  (0, tc.boolOrEmptySchema)(e, t);
}
function nc({ schema: e, self: t }) {
  if (typeof e == "boolean")
    return !e;
  for (const r in e)
    if (t.RULES.all[r])
      return !0;
  return !1;
}
function ic(e) {
  return typeof e.schema != "boolean";
}
function Wu(e, t) {
  const { schema: r, gen: n, opts: i } = e;
  i.$comment && r.$comment && ac(e), Zu(e), Ju(e);
  const s = n.const("_errs", Z.default.errors);
  oc(e, s), n.var(t, (0, X._)`${s} === ${Z.default.errors}`);
}
function sc(e) {
  (0, gt.checkUnknownRules)(e), Ku(e);
}
function oc(e, t) {
  if (e.opts.jtd)
    return Zs(e, [], !1, t);
  const r = (0, Ks.getSchemaTypes)(e.schema), n = (0, Ks.coerceAndCheckDataType)(e, r);
  Zs(e, r, !n, t);
}
function Ku(e) {
  const { schema: t, errSchemaPath: r, opts: n, self: i } = e;
  t.$ref && n.ignoreKeywordsWithRef && (0, gt.schemaHasRulesButRef)(t, i.RULES) && i.logger.warn(`$ref: keywords ignored in schema at path "${r}"`);
}
function Xu(e) {
  const { schema: t, opts: r } = e;
  t.default !== void 0 && r.useDefaults && r.strictSchema && (0, gt.checkStrictMode)(e, "default is ignored in the schema root");
}
function Zu(e) {
  const t = e.schema[e.opts.schemaId];
  t && (e.baseId = (0, Uu.resolveUrl)(e.opts.uriResolver, e.baseId, t));
}
function Ju(e) {
  if (e.schema.$async && !e.schemaEnv.$async)
    throw new Error("async schema in sync schema");
}
function ac({ gen: e, schemaEnv: t, schema: r, errSchemaPath: n, opts: i }) {
  const s = r.$comment;
  if (i.$comment === !0)
    e.code((0, X._)`${Z.default.self}.logger.log(${s})`);
  else if (typeof i.$comment == "function") {
    const o = (0, X.str)`${n}/$comment`, l = e.scopeValue("root", { ref: t.root });
    e.code((0, X._)`${Z.default.self}.opts.$comment(${s}, ${o}, ${l}.schema)`);
  }
}
function Yu(e) {
  const { gen: t, schemaEnv: r, validateName: n, ValidationError: i, opts: s } = e;
  r.$async ? t.if((0, X._)`${Z.default.errors} === 0`, () => t.return(Z.default.data), () => t.throw((0, X._)`new ${i}(${Z.default.vErrors})`)) : (t.assign((0, X._)`${n}.errors`, Z.default.vErrors), s.unevaluated && Qu(e), t.return((0, X._)`${Z.default.errors} === 0`));
}
function Qu({ gen: e, evaluated: t, props: r, items: n }) {
  r instanceof X.Name && e.assign((0, X._)`${t}.props`, r), n instanceof X.Name && e.assign((0, X._)`${t}.items`, n);
}
function Zs(e, t, r, n) {
  const { gen: i, schema: s, data: o, allErrors: l, opts: a, self: c } = e, { RULES: f } = c;
  if (s.$ref && (a.ignoreKeywordsWithRef || !(0, gt.schemaHasRulesButRef)(s, f))) {
    i.block(() => fc(e, "$ref", f.all.$ref.definition));
    return;
  }
  a.jtd || ed(e, t), i.block(() => {
    for (const S of f.rules)
      E(S);
    E(f.post);
  });
  function E(S) {
    (0, xi.shouldUseGroup)(s, S) && (S.type ? (i.if((0, mn.checkDataType)(S.type, o, a.strictNumbers)), Js(e, S), t.length === 1 && t[0] === S.type && r && (i.else(), (0, mn.reportTypeError)(e)), i.endIf()) : Js(e, S), l || i.if((0, X._)`${Z.default.errors} === ${n || 0}`));
  }
}
function Js(e, t) {
  const { gen: r, schema: n, opts: { useDefaults: i } } = e;
  i && (0, xu.assignDefaults)(e, t.type), r.block(() => {
    for (const s of t.rules)
      (0, xi.shouldUseRule)(n, s) && fc(e, s.keyword, s.definition, t.type);
  });
}
function ed(e, t) {
  e.schemaEnv.meta || !e.opts.strictTypes || (td(e, t), e.opts.allowUnionTypes || rd(e, t), nd(e, e.dataTypes));
}
function td(e, t) {
  if (t.length) {
    if (!e.dataTypes.length) {
      e.dataTypes = t;
      return;
    }
    t.forEach((r) => {
      cc(e.dataTypes, r) || Ui(e, `type "${r}" not allowed by context "${e.dataTypes.join(",")}"`);
    }), sd(e, t);
  }
}
function rd(e, t) {
  t.length > 1 && !(t.length === 2 && t.includes("null")) && Ui(e, "use allowUnionTypes to allow union type keyword");
}
function nd(e, t) {
  const r = e.self.RULES.all;
  for (const n in r) {
    const i = r[n];
    if (typeof i == "object" && (0, xi.shouldUseRule)(e.schema, i)) {
      const { type: s } = i.definition;
      s.length && !s.some((o) => id(t, o)) && Ui(e, `missing type "${s.join(",")}" for keyword "${n}"`);
    }
  }
}
function id(e, t) {
  return e.includes(t) || t === "number" && e.includes("integer");
}
function cc(e, t) {
  return e.includes(t) || t === "integer" && e.includes("number");
}
function sd(e, t) {
  const r = [];
  for (const n of e.dataTypes)
    cc(t, n) ? r.push(n) : t.includes("integer") && n === "number" && r.push("integer");
  e.dataTypes = r;
}
function Ui(e, t) {
  const r = e.schemaEnv.baseId + e.errSchemaPath;
  t += ` at "${r}" (strictTypes)`, (0, gt.checkStrictMode)(e, t, e.opts.strictTypes);
}
class lc {
  constructor(t, r, n) {
    if ((0, br.validateKeywordUsage)(t, r, n), this.gen = t.gen, this.allErrors = t.allErrors, this.keyword = n, this.data = t.data, this.schema = t.schema[n], this.$data = r.$data && t.opts.$data && this.schema && this.schema.$data, this.schemaValue = (0, gt.schemaRefOrVal)(t, this.schema, n, this.$data), this.schemaType = r.schemaType, this.parentSchema = t.schema, this.params = {}, this.it = t, this.def = r, this.$data)
      this.schemaCode = t.gen.const("vSchema", uc(this.$data, t));
    else if (this.schemaCode = this.schemaValue, !(0, br.validSchemaType)(this.schema, r.schemaType, r.allowUndefined))
      throw new Error(`${n} value must be ${JSON.stringify(r.schemaType)}`);
    ("code" in r ? r.trackErrors : r.errors !== !1) && (this.errsCount = t.gen.const("_errs", Z.default.errors));
  }
  result(t, r, n) {
    this.failResult((0, X.not)(t), r, n);
  }
  failResult(t, r, n) {
    this.gen.if(t), n ? n() : this.error(), r ? (this.gen.else(), r(), this.allErrors && this.gen.endIf()) : this.allErrors ? this.gen.endIf() : this.gen.else();
  }
  pass(t, r) {
    this.failResult((0, X.not)(t), void 0, r);
  }
  fail(t) {
    if (t === void 0) {
      this.error(), this.allErrors || this.gen.if(!1);
      return;
    }
    this.gen.if(t), this.error(), this.allErrors ? this.gen.endIf() : this.gen.else();
  }
  fail$data(t) {
    if (!this.$data)
      return this.fail(t);
    const { schemaCode: r } = this;
    this.fail((0, X._)`${r} !== undefined && (${(0, X.or)(this.invalid$data(), t)})`);
  }
  error(t, r, n) {
    if (r) {
      this.setParams(r), this._error(t, n), this.setParams({});
      return;
    }
    this._error(t, n);
  }
  _error(t, r) {
    (t ? $r.reportExtraError : $r.reportError)(this, this.def.error, r);
  }
  $dataError() {
    (0, $r.reportError)(this, this.def.$dataError || $r.keyword$DataError);
  }
  reset() {
    if (this.errsCount === void 0)
      throw new Error('add "trackErrors" to keyword definition');
    (0, $r.resetErrorsCount)(this.gen, this.errsCount);
  }
  ok(t) {
    this.allErrors || this.gen.if(t);
  }
  setParams(t, r) {
    r ? Object.assign(this.params, t) : this.params = t;
  }
  block$data(t, r, n = X.nil) {
    this.gen.block(() => {
      this.check$data(t, n), r();
    });
  }
  check$data(t = X.nil, r = X.nil) {
    if (!this.$data)
      return;
    const { gen: n, schemaCode: i, schemaType: s, def: o } = this;
    n.if((0, X.or)((0, X._)`${i} === undefined`, r)), t !== X.nil && n.assign(t, !0), (s.length || o.validateSchema) && (n.elseIf(this.invalid$data()), this.$dataError(), t !== X.nil && n.assign(t, !1)), n.else();
  }
  invalid$data() {
    const { gen: t, schemaCode: r, schemaType: n, def: i, it: s } = this;
    return (0, X.or)(o(), l());
    function o() {
      if (n.length) {
        if (!(r instanceof X.Name))
          throw new Error("ajv implementation error");
        const a = Array.isArray(n) ? n : [n];
        return (0, X._)`${(0, mn.checkDataTypes)(a, r, s.opts.strictNumbers, mn.DataType.Wrong)}`;
      }
      return X.nil;
    }
    function l() {
      if (i.validateSchema) {
        const a = t.scopeValue("validate$data", { ref: i.validateSchema });
        return (0, X._)`!${a}(${r})`;
      }
      return X.nil;
    }
  }
  subschema(t, r) {
    const n = (0, Vn.getSubschema)(this.it, t);
    (0, Vn.extendSubschemaData)(n, this.it, t), (0, Vn.extendSubschemaMode)(n, t);
    const i = { ...this.it, ...n, items: void 0, props: void 0 };
    return qu(i, r), i;
  }
  mergeEvaluated(t, r) {
    const { it: n, gen: i } = this;
    n.opts.unevaluated && (n.props !== !0 && t.props !== void 0 && (n.props = gt.mergeEvaluated.props(i, t.props, n.props, r)), n.items !== !0 && t.items !== void 0 && (n.items = gt.mergeEvaluated.items(i, t.items, n.items, r)));
  }
  mergeValidEvaluated(t, r) {
    const { it: n, gen: i } = this;
    if (n.opts.unevaluated && (n.props !== !0 || n.items !== !0))
      return i.if(r, () => this.mergeEvaluated(t, X.Name)), !0;
  }
}
nt.KeywordCxt = lc;
function fc(e, t, r, n) {
  const i = new lc(e, r, t);
  "code" in r ? r.code(i, n) : i.$data && r.validate ? (0, br.funcKeywordCode)(i, r) : "macro" in r ? (0, br.macroKeywordCode)(i, r) : (r.compile || r.validate) && (0, br.funcKeywordCode)(i, r);
}
const od = /^\/(?:[^~]|~0|~1)*$/, ad = /^([0-9]+)(#|\/(?:[^~]|~0|~1)*)?$/;
function uc(e, { dataLevel: t, dataNames: r, dataPathArr: n }) {
  let i, s;
  if (e === "")
    return Z.default.rootData;
  if (e[0] === "/") {
    if (!od.test(e))
      throw new Error(`Invalid JSON-pointer: ${e}`);
    i = e, s = Z.default.rootData;
  } else {
    const c = ad.exec(e);
    if (!c)
      throw new Error(`Invalid JSON-pointer: ${e}`);
    const f = +c[1];
    if (i = c[2], i === "#") {
      if (f >= t)
        throw new Error(a("property/index", f));
      return n[t - f];
    }
    if (f > t)
      throw new Error(a("data", f));
    if (s = r[t - f], !i)
      return s;
  }
  let o = s;
  const l = i.split("/");
  for (const c of l)
    c && (s = (0, X._)`${s}${(0, X.getProperty)((0, gt.unescapeJsonPointer)(c))}`, o = (0, X._)`${o} && ${s}`);
  return o;
  function a(c, f) {
    return `Cannot access ${c} ${f} levels up, current level is ${t}`;
  }
}
nt.getData = uc;
var jr = {};
Object.defineProperty(jr, "__esModule", { value: !0 });
class cd extends Error {
  constructor(t) {
    super("validation failed"), this.errors = t, this.ajv = this.validation = !0;
  }
}
jr.default = cd;
var or = {};
Object.defineProperty(or, "__esModule", { value: !0 });
const Gn = Fe;
class ld extends Error {
  constructor(t, r, n, i) {
    super(i || `can't resolve reference ${n} from id ${r}`), this.missingRef = (0, Gn.resolveUrl)(t, r, n), this.missingSchema = (0, Gn.normalizeId)((0, Gn.getFullPath)(t, this.missingRef));
  }
}
or.default = ld;
var Xe = {};
Object.defineProperty(Xe, "__esModule", { value: !0 });
Xe.resolveSchema = Xe.getCompilingSchema = Xe.resolveRef = Xe.compileSchema = Xe.SchemaEnv = void 0;
const et = te, fd = jr, Dt = mt, rt = Fe, Ys = q, ud = nt;
class wn {
  constructor(t) {
    var r;
    this.refs = {}, this.dynamicAnchors = {};
    let n;
    typeof t.schema == "object" && (n = t.schema), this.schema = t.schema, this.schemaId = t.schemaId, this.root = t.root || this, this.baseId = (r = t.baseId) !== null && r !== void 0 ? r : (0, rt.normalizeId)(n?.[t.schemaId || "$id"]), this.schemaPath = t.schemaPath, this.localRefs = t.localRefs, this.meta = t.meta, this.$async = n?.$async, this.refs = {};
  }
}
Xe.SchemaEnv = wn;
function zi(e) {
  const t = dc.call(this, e);
  if (t)
    return t;
  const r = (0, rt.getFullPath)(this.opts.uriResolver, e.root.baseId), { es5: n, lines: i } = this.opts.code, { ownProperties: s } = this.opts, o = new et.CodeGen(this.scope, { es5: n, lines: i, ownProperties: s });
  let l;
  e.$async && (l = o.scopeValue("Error", {
    ref: fd.default,
    code: (0, et._)`require("ajv/dist/runtime/validation_error").default`
  }));
  const a = o.scopeName("validate");
  e.validateName = a;
  const c = {
    gen: o,
    allErrors: this.opts.allErrors,
    data: Dt.default.data,
    parentData: Dt.default.parentData,
    parentDataProperty: Dt.default.parentDataProperty,
    dataNames: [Dt.default.data],
    dataPathArr: [et.nil],
    // TODO can its length be used as dataLevel if nil is removed?
    dataLevel: 0,
    dataTypes: [],
    definedProperties: /* @__PURE__ */ new Set(),
    topSchemaRef: o.scopeValue("schema", this.opts.code.source === !0 ? { ref: e.schema, code: (0, et.stringify)(e.schema) } : { ref: e.schema }),
    validateName: a,
    ValidationError: l,
    schema: e.schema,
    schemaEnv: e,
    rootId: r,
    baseId: e.baseId || r,
    schemaPath: et.nil,
    errSchemaPath: e.schemaPath || (this.opts.jtd ? "" : "#"),
    errorPath: (0, et._)`""`,
    opts: this.opts,
    self: this
  };
  let f;
  try {
    this._compilations.add(e), (0, ud.validateFunctionCode)(c), o.optimize(this.opts.code.optimize);
    const E = o.toString();
    f = `${o.scopeRefs(Dt.default.scope)}return ${E}`, this.opts.code.process && (f = this.opts.code.process(f, e));
    const u = new Function(`${Dt.default.self}`, `${Dt.default.scope}`, f)(this, this.scope.get());
    if (this.scope.value(a, { ref: u }), u.errors = null, u.schema = e.schema, u.schemaEnv = e, e.$async && (u.$async = !0), this.opts.code.source === !0 && (u.source = { validateName: a, validateCode: E, scopeValues: o._values }), this.opts.unevaluated) {
      const { props: d, items: g } = c;
      u.evaluated = {
        props: d instanceof et.Name ? void 0 : d,
        items: g instanceof et.Name ? void 0 : g,
        dynamicProps: d instanceof et.Name,
        dynamicItems: g instanceof et.Name
      }, u.source && (u.source.evaluated = (0, et.stringify)(u.evaluated));
    }
    return e.validate = u, e;
  } catch (E) {
    throw delete e.validate, delete e.validateName, f && this.logger.error("Error compiling schema, function code:", f), E;
  } finally {
    this._compilations.delete(e);
  }
}
Xe.compileSchema = zi;
function dd(e, t, r) {
  var n;
  r = (0, rt.resolveUrl)(this.opts.uriResolver, t, r);
  const i = e.refs[r];
  if (i)
    return i;
  let s = pd.call(this, e, r);
  if (s === void 0) {
    const o = (n = e.localRefs) === null || n === void 0 ? void 0 : n[r], { schemaId: l } = this.opts;
    o && (s = new wn({ schema: o, schemaId: l, root: e, baseId: t }));
  }
  if (s !== void 0)
    return e.refs[r] = hd.call(this, s);
}
Xe.resolveRef = dd;
function hd(e) {
  return (0, rt.inlineRef)(e.schema, this.opts.inlineRefs) ? e.schema : e.validate ? e : zi.call(this, e);
}
function dc(e) {
  for (const t of this._compilations)
    if (md(t, e))
      return t;
}
Xe.getCompilingSchema = dc;
function md(e, t) {
  return e.schema === t.schema && e.root === t.root && e.baseId === t.baseId;
}
function pd(e, t) {
  let r;
  for (; typeof (r = this.refs[t]) == "string"; )
    t = r;
  return r || this.schemas[t] || bn.call(this, e, t);
}
function bn(e, t) {
  const r = this.opts.uriResolver.parse(t), n = (0, rt._getFullPath)(this.opts.uriResolver, r);
  let i = (0, rt.getFullPath)(this.opts.uriResolver, e.baseId, void 0);
  if (Object.keys(e.schema).length > 0 && n === i)
    return Bn.call(this, r, e);
  const s = (0, rt.normalizeId)(n), o = this.refs[s] || this.schemas[s];
  if (typeof o == "string") {
    const l = bn.call(this, e, o);
    return typeof l?.schema != "object" ? void 0 : Bn.call(this, r, l);
  }
  if (typeof o?.schema == "object") {
    if (o.validate || zi.call(this, o), s === (0, rt.normalizeId)(t)) {
      const { schema: l } = o, { schemaId: a } = this.opts, c = l[a];
      return c && (i = (0, rt.resolveUrl)(this.opts.uriResolver, i, c)), new wn({ schema: l, schemaId: a, root: e, baseId: i });
    }
    return Bn.call(this, r, o);
  }
}
Xe.resolveSchema = bn;
const yd = /* @__PURE__ */ new Set([
  "properties",
  "patternProperties",
  "enum",
  "dependencies",
  "definitions"
]);
function Bn(e, { baseId: t, schema: r, root: n }) {
  var i;
  if (((i = e.fragment) === null || i === void 0 ? void 0 : i[0]) !== "/")
    return;
  for (const l of e.fragment.slice(1).split("/")) {
    if (typeof r == "boolean")
      return;
    const a = r[(0, Ys.unescapeFragment)(l)];
    if (a === void 0)
      return;
    r = a;
    const c = typeof r == "object" && r[this.opts.schemaId];
    !yd.has(l) && c && (t = (0, rt.resolveUrl)(this.opts.uriResolver, t, c));
  }
  let s;
  if (typeof r != "boolean" && r.$ref && !(0, Ys.schemaHasRulesButRef)(r, this.RULES)) {
    const l = (0, rt.resolveUrl)(this.opts.uriResolver, t, r.$ref);
    s = bn.call(this, n, l);
  }
  const { schemaId: o } = this.opts;
  if (s = s || new wn({ schema: r, schemaId: o, root: n, baseId: t }), s.schema !== s.root.schema)
    return s;
}
const Ed = "https://raw.githubusercontent.com/ajv-validator/ajv/master/lib/refs/data.json#", gd = "Meta-schema for $data reference (JSON AnySchema extension proposal)", $d = "object", vd = [
  "$data"
], _d = {
  $data: {
    type: "string",
    anyOf: [
      {
        format: "relative-json-pointer"
      },
      {
        format: "json-pointer"
      }
    ]
  }
}, Sd = !1, wd = {
  $id: Ed,
  description: gd,
  type: $d,
  required: vd,
  properties: _d,
  additionalProperties: Sd
};
var Vi = {}, On = { exports: {} };
const bd = {
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
};
var Od = {
  HEX: bd
};
const { HEX: Id } = Od;
function hc(e) {
  if (pc(e, ".") < 3)
    return { host: e, isIPV4: !1 };
  const t = e.match(/^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/u) || [], [r] = t;
  return r ? { host: Pd(r, "."), isIPV4: !0 } : { host: e, isIPV4: !1 };
}
function li(e, t = !1) {
  let r = "", n = !0;
  for (const i of e) {
    if (Id[i] === void 0) return;
    i !== "0" && n === !0 && (n = !1), n || (r += i);
  }
  return t && r.length === 0 && (r = "0"), r;
}
function Nd(e) {
  let t = 0;
  const r = { error: !1, address: "", zone: "" }, n = [], i = [];
  let s = !1, o = !1, l = !1;
  function a() {
    if (i.length) {
      if (s === !1) {
        const c = li(i);
        if (c !== void 0)
          n.push(c);
        else
          return r.error = !0, !1;
      }
      i.length = 0;
    }
    return !0;
  }
  for (let c = 0; c < e.length; c++) {
    const f = e[c];
    if (!(f === "[" || f === "]"))
      if (f === ":") {
        if (o === !0 && (l = !0), !a())
          break;
        if (t++, n.push(":"), t > 7) {
          r.error = !0;
          break;
        }
        c - 1 >= 0 && e[c - 1] === ":" && (o = !0);
        continue;
      } else if (f === "%") {
        if (!a())
          break;
        s = !0;
      } else {
        i.push(f);
        continue;
      }
  }
  return i.length && (s ? r.zone = i.join("") : l ? n.push(i.join("")) : n.push(li(i))), r.address = n.join(""), r;
}
function mc(e, t = {}) {
  if (pc(e, ":") < 2)
    return { host: e, isIPV6: !1 };
  const r = Nd(e);
  if (r.error)
    return { host: e, isIPV6: !1 };
  {
    let n = r.address, i = r.address;
    return r.zone && (n += "%" + r.zone, i += "%25" + r.zone), { host: n, escapedHost: i, isIPV6: !0 };
  }
}
function Pd(e, t) {
  let r = "", n = !0;
  const i = e.length;
  for (let s = 0; s < i; s++) {
    const o = e[s];
    o === "0" && n ? (s + 1 <= i && e[s + 1] === t || s + 1 === i) && (r += o, n = !1) : (o === t ? n = !0 : n = !1, r += o);
  }
  return r;
}
function pc(e, t) {
  let r = 0;
  for (let n = 0; n < e.length; n++)
    e[n] === t && r++;
  return r;
}
const Qs = /^\.\.?\//u, eo = /^\/\.(?:\/|$)/u, to = /^\/\.\.(?:\/|$)/u, Td = /^\/?(?:.|\n)*?(?=\/|$)/u;
function Rd(e) {
  const t = [];
  for (; e.length; )
    if (e.match(Qs))
      e = e.replace(Qs, "");
    else if (e.match(eo))
      e = e.replace(eo, "/");
    else if (e.match(to))
      e = e.replace(to, "/"), t.pop();
    else if (e === "." || e === "..")
      e = "";
    else {
      const r = e.match(Td);
      if (r) {
        const n = r[0];
        e = e.slice(n.length), t.push(n);
      } else
        throw new Error("Unexpected dot segment condition");
    }
  return t.join("");
}
function Cd(e, t) {
  const r = t !== !0 ? escape : unescape;
  return e.scheme !== void 0 && (e.scheme = r(e.scheme)), e.userinfo !== void 0 && (e.userinfo = r(e.userinfo)), e.host !== void 0 && (e.host = r(e.host)), e.path !== void 0 && (e.path = r(e.path)), e.query !== void 0 && (e.query = r(e.query)), e.fragment !== void 0 && (e.fragment = r(e.fragment)), e;
}
function Dd(e, t) {
  const r = [];
  if (e.userinfo !== void 0 && (r.push(e.userinfo), r.push("@")), e.host !== void 0) {
    let n = unescape(e.host);
    const i = hc(n);
    if (i.isIPV4)
      n = i.host;
    else {
      const s = mc(i.host, { isIPV4: !1 });
      s.isIPV6 === !0 ? n = `[${s.escapedHost}]` : n = e.host;
    }
    r.push(n);
  }
  return (typeof e.port == "number" || typeof e.port == "string") && (r.push(":"), r.push(String(e.port))), r.length ? r.join("") : void 0;
}
var Ad = {
  recomposeAuthority: Dd,
  normalizeComponentEncoding: Cd,
  removeDotSegments: Rd,
  normalizeIPv4: hc,
  normalizeIPv6: mc,
  stringArrayToHexStripped: li
};
const Ld = /^[\da-f]{8}\b-[\da-f]{4}\b-[\da-f]{4}\b-[\da-f]{4}\b-[\da-f]{12}$/iu, Fd = /([\da-z][\d\-a-z]{0,31}):((?:[\w!$'()*+,\-.:;=@]|%[\da-f]{2})+)/iu;
function yc(e) {
  return typeof e.secure == "boolean" ? e.secure : String(e.scheme).toLowerCase() === "wss";
}
function Ec(e) {
  return e.host || (e.error = e.error || "HTTP URIs must have a host."), e;
}
function gc(e) {
  const t = String(e.scheme).toLowerCase() === "https";
  return (e.port === (t ? 443 : 80) || e.port === "") && (e.port = void 0), e.path || (e.path = "/"), e;
}
function kd(e) {
  return e.secure = yc(e), e.resourceName = (e.path || "/") + (e.query ? "?" + e.query : ""), e.path = void 0, e.query = void 0, e;
}
function jd(e) {
  if ((e.port === (yc(e) ? 443 : 80) || e.port === "") && (e.port = void 0), typeof e.secure == "boolean" && (e.scheme = e.secure ? "wss" : "ws", e.secure = void 0), e.resourceName) {
    const [t, r] = e.resourceName.split("?");
    e.path = t && t !== "/" ? t : void 0, e.query = r, e.resourceName = void 0;
  }
  return e.fragment = void 0, e;
}
function Md(e, t) {
  if (!e.path)
    return e.error = "URN can not be parsed", e;
  const r = e.path.match(Fd);
  if (r) {
    const n = t.scheme || e.scheme || "urn";
    e.nid = r[1].toLowerCase(), e.nss = r[2];
    const i = `${n}:${t.nid || e.nid}`, s = Gi[i];
    e.path = void 0, s && (e = s.parse(e, t));
  } else
    e.error = e.error || "URN can not be parsed.";
  return e;
}
function xd(e, t) {
  const r = t.scheme || e.scheme || "urn", n = e.nid.toLowerCase(), i = `${r}:${t.nid || n}`, s = Gi[i];
  s && (e = s.serialize(e, t));
  const o = e, l = e.nss;
  return o.path = `${n || t.nid}:${l}`, t.skipEscape = !0, o;
}
function Ud(e, t) {
  const r = e;
  return r.uuid = r.nss, r.nss = void 0, !t.tolerant && (!r.uuid || !Ld.test(r.uuid)) && (r.error = r.error || "UUID is not valid."), r;
}
function zd(e) {
  const t = e;
  return t.nss = (e.uuid || "").toLowerCase(), t;
}
const $c = {
  scheme: "http",
  domainHost: !0,
  parse: Ec,
  serialize: gc
}, Vd = {
  scheme: "https",
  domainHost: $c.domainHost,
  parse: Ec,
  serialize: gc
}, on = {
  scheme: "ws",
  domainHost: !0,
  parse: kd,
  serialize: jd
}, Gd = {
  scheme: "wss",
  domainHost: on.domainHost,
  parse: on.parse,
  serialize: on.serialize
}, Bd = {
  scheme: "urn",
  parse: Md,
  serialize: xd,
  skipNormalize: !0
}, Hd = {
  scheme: "urn:uuid",
  parse: Ud,
  serialize: zd,
  skipNormalize: !0
}, Gi = {
  http: $c,
  https: Vd,
  ws: on,
  wss: Gd,
  urn: Bd,
  "urn:uuid": Hd
};
var qd = Gi;
const { normalizeIPv6: Wd, normalizeIPv4: Kd, removeDotSegments: Sr, recomposeAuthority: Xd, normalizeComponentEncoding: Hr } = Ad, Bi = qd;
function Zd(e, t) {
  return typeof e == "string" ? e = ht($t(e, t), t) : typeof e == "object" && (e = $t(ht(e, t), t)), e;
}
function Jd(e, t, r) {
  const n = Object.assign({ scheme: "null" }, r), i = vc($t(e, n), $t(t, n), n, !0);
  return ht(i, { ...n, skipEscape: !0 });
}
function vc(e, t, r, n) {
  const i = {};
  return n || (e = $t(ht(e, r), r), t = $t(ht(t, r), r)), r = r || {}, !r.tolerant && t.scheme ? (i.scheme = t.scheme, i.userinfo = t.userinfo, i.host = t.host, i.port = t.port, i.path = Sr(t.path || ""), i.query = t.query) : (t.userinfo !== void 0 || t.host !== void 0 || t.port !== void 0 ? (i.userinfo = t.userinfo, i.host = t.host, i.port = t.port, i.path = Sr(t.path || ""), i.query = t.query) : (t.path ? (t.path.charAt(0) === "/" ? i.path = Sr(t.path) : ((e.userinfo !== void 0 || e.host !== void 0 || e.port !== void 0) && !e.path ? i.path = "/" + t.path : e.path ? i.path = e.path.slice(0, e.path.lastIndexOf("/") + 1) + t.path : i.path = t.path, i.path = Sr(i.path)), i.query = t.query) : (i.path = e.path, t.query !== void 0 ? i.query = t.query : i.query = e.query), i.userinfo = e.userinfo, i.host = e.host, i.port = e.port), i.scheme = e.scheme), i.fragment = t.fragment, i;
}
function Yd(e, t, r) {
  return typeof e == "string" ? (e = unescape(e), e = ht(Hr($t(e, r), !0), { ...r, skipEscape: !0 })) : typeof e == "object" && (e = ht(Hr(e, !0), { ...r, skipEscape: !0 })), typeof t == "string" ? (t = unescape(t), t = ht(Hr($t(t, r), !0), { ...r, skipEscape: !0 })) : typeof t == "object" && (t = ht(Hr(t, !0), { ...r, skipEscape: !0 })), e.toLowerCase() === t.toLowerCase();
}
function ht(e, t) {
  const r = {
    host: e.host,
    scheme: e.scheme,
    userinfo: e.userinfo,
    port: e.port,
    path: e.path,
    query: e.query,
    nid: e.nid,
    nss: e.nss,
    uuid: e.uuid,
    fragment: e.fragment,
    reference: e.reference,
    resourceName: e.resourceName,
    secure: e.secure,
    error: ""
  }, n = Object.assign({}, t), i = [], s = Bi[(n.scheme || r.scheme || "").toLowerCase()];
  s && s.serialize && s.serialize(r, n), r.path !== void 0 && (n.skipEscape ? r.path = unescape(r.path) : (r.path = escape(r.path), r.scheme !== void 0 && (r.path = r.path.split("%3A").join(":")))), n.reference !== "suffix" && r.scheme && i.push(r.scheme, ":");
  const o = Xd(r, n);
  if (o !== void 0 && (n.reference !== "suffix" && i.push("//"), i.push(o), r.path && r.path.charAt(0) !== "/" && i.push("/")), r.path !== void 0) {
    let l = r.path;
    !n.absolutePath && (!s || !s.absolutePath) && (l = Sr(l)), o === void 0 && (l = l.replace(/^\/\//u, "/%2F")), i.push(l);
  }
  return r.query !== void 0 && i.push("?", r.query), r.fragment !== void 0 && i.push("#", r.fragment), i.join("");
}
const Qd = Array.from({ length: 127 }, (e, t) => /[^!"$&'()*+,\-.;=_`a-z{}~]/u.test(String.fromCharCode(t)));
function eh(e) {
  let t = 0;
  for (let r = 0, n = e.length; r < n; ++r)
    if (t = e.charCodeAt(r), t > 126 || Qd[t])
      return !0;
  return !1;
}
const th = /^(?:([^#/:?]+):)?(?:\/\/((?:([^#/?@]*)@)?(\[[^#/?\]]+\]|[^#/:?]*)(?::(\d*))?))?([^#?]*)(?:\?([^#]*))?(?:#((?:.|[\n\r])*))?/u;
function $t(e, t) {
  const r = Object.assign({}, t), n = {
    scheme: void 0,
    userinfo: void 0,
    host: "",
    port: void 0,
    path: "",
    query: void 0,
    fragment: void 0
  }, i = e.indexOf("%") !== -1;
  let s = !1;
  r.reference === "suffix" && (e = (r.scheme ? r.scheme + ":" : "") + "//" + e);
  const o = e.match(th);
  if (o) {
    if (n.scheme = o[1], n.userinfo = o[3], n.host = o[4], n.port = parseInt(o[5], 10), n.path = o[6] || "", n.query = o[7], n.fragment = o[8], isNaN(n.port) && (n.port = o[5]), n.host) {
      const a = Kd(n.host);
      if (a.isIPV4 === !1) {
        const c = Wd(a.host, { isIPV4: !1 });
        n.host = c.host.toLowerCase(), s = c.isIPV6;
      } else
        n.host = a.host, s = !0;
    }
    n.scheme === void 0 && n.userinfo === void 0 && n.host === void 0 && n.port === void 0 && !n.path && n.query === void 0 ? n.reference = "same-document" : n.scheme === void 0 ? n.reference = "relative" : n.fragment === void 0 ? n.reference = "absolute" : n.reference = "uri", r.reference && r.reference !== "suffix" && r.reference !== n.reference && (n.error = n.error || "URI is not a " + r.reference + " reference.");
    const l = Bi[(r.scheme || n.scheme || "").toLowerCase()];
    if (!r.unicodeSupport && (!l || !l.unicodeSupport) && n.host && (r.domainHost || l && l.domainHost) && s === !1 && eh(n.host))
      try {
        n.host = URL.domainToASCII(n.host.toLowerCase());
      } catch (a) {
        n.error = n.error || "Host's domain name can not be converted to ASCII: " + a;
      }
    (!l || l && !l.skipNormalize) && (i && n.scheme !== void 0 && (n.scheme = unescape(n.scheme)), i && n.host !== void 0 && (n.host = unescape(n.host)), n.path !== void 0 && n.path.length && (n.path = escape(unescape(n.path))), n.fragment !== void 0 && n.fragment.length && (n.fragment = encodeURI(decodeURIComponent(n.fragment)))), l && l.parse && l.parse(n, r);
  } else
    n.error = n.error || "URI can not be parsed.";
  return n;
}
const Hi = {
  SCHEMES: Bi,
  normalize: Zd,
  resolve: Jd,
  resolveComponents: vc,
  equal: Yd,
  serialize: ht,
  parse: $t
};
On.exports = Hi;
On.exports.default = Hi;
On.exports.fastUri = Hi;
var rh = On.exports;
Object.defineProperty(Vi, "__esModule", { value: !0 });
const _c = rh;
_c.code = 'require("ajv/dist/runtime/uri").default';
Vi.default = _c;
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.CodeGen = e.Name = e.nil = e.stringify = e.str = e._ = e.KeywordCxt = void 0;
  var t = nt;
  Object.defineProperty(e, "KeywordCxt", { enumerable: !0, get: function() {
    return t.KeywordCxt;
  } });
  var r = te;
  Object.defineProperty(e, "_", { enumerable: !0, get: function() {
    return r._;
  } }), Object.defineProperty(e, "str", { enumerable: !0, get: function() {
    return r.str;
  } }), Object.defineProperty(e, "stringify", { enumerable: !0, get: function() {
    return r.stringify;
  } }), Object.defineProperty(e, "nil", { enumerable: !0, get: function() {
    return r.nil;
  } }), Object.defineProperty(e, "Name", { enumerable: !0, get: function() {
    return r.Name;
  } }), Object.defineProperty(e, "CodeGen", { enumerable: !0, get: function() {
    return r.CodeGen;
  } });
  const n = jr, i = or, s = Mt, o = Xe, l = te, a = Fe, c = Pe, f = q, E = wd, S = Vi, u = (b, w) => new RegExp(b, w);
  u.code = "new RegExp";
  const d = ["removeAdditional", "useDefaults", "coerceTypes"], g = /* @__PURE__ */ new Set([
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
  ]), y = {
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
  }, m = {
    ignoreKeywordsWithRef: "",
    jsPropertySyntax: "",
    unicode: '"minLength"/"maxLength" account for unicode characters by default.'
  }, h = 200;
  function v(b) {
    var w, D, I, p, _, $, K, M, ie, ee, B, ot, ne, z, Y, $e, G, hr, mr, pr, yr, zt, Vt, Er, Ie;
    const ve = b.strict, fe = (w = b.code) === null || w === void 0 ? void 0 : w.optimize, se = fe === !0 || fe === void 0 ? 1 : fe || 0, qe = (I = (D = b.code) === null || D === void 0 ? void 0 : D.regExp) !== null && I !== void 0 ? I : u, Nl = (p = b.uriResolver) !== null && p !== void 0 ? p : S.default;
    return {
      strictSchema: ($ = (_ = b.strictSchema) !== null && _ !== void 0 ? _ : ve) !== null && $ !== void 0 ? $ : !0,
      strictNumbers: (M = (K = b.strictNumbers) !== null && K !== void 0 ? K : ve) !== null && M !== void 0 ? M : !0,
      strictTypes: (ee = (ie = b.strictTypes) !== null && ie !== void 0 ? ie : ve) !== null && ee !== void 0 ? ee : "log",
      strictTuples: (ot = (B = b.strictTuples) !== null && B !== void 0 ? B : ve) !== null && ot !== void 0 ? ot : "log",
      strictRequired: (z = (ne = b.strictRequired) !== null && ne !== void 0 ? ne : ve) !== null && z !== void 0 ? z : !1,
      code: b.code ? { ...b.code, optimize: se, regExp: qe } : { optimize: se, regExp: qe },
      loopRequired: (Y = b.loopRequired) !== null && Y !== void 0 ? Y : h,
      loopEnum: ($e = b.loopEnum) !== null && $e !== void 0 ? $e : h,
      meta: (G = b.meta) !== null && G !== void 0 ? G : !0,
      messages: (hr = b.messages) !== null && hr !== void 0 ? hr : !0,
      inlineRefs: (mr = b.inlineRefs) !== null && mr !== void 0 ? mr : !0,
      schemaId: (pr = b.schemaId) !== null && pr !== void 0 ? pr : "$id",
      addUsedSchema: (yr = b.addUsedSchema) !== null && yr !== void 0 ? yr : !0,
      validateSchema: (zt = b.validateSchema) !== null && zt !== void 0 ? zt : !0,
      validateFormats: (Vt = b.validateFormats) !== null && Vt !== void 0 ? Vt : !0,
      unicodeRegExp: (Er = b.unicodeRegExp) !== null && Er !== void 0 ? Er : !0,
      int32range: (Ie = b.int32range) !== null && Ie !== void 0 ? Ie : !0,
      uriResolver: Nl
    };
  }
  class O {
    constructor(w = {}) {
      this.schemas = {}, this.refs = {}, this.formats = {}, this._compilations = /* @__PURE__ */ new Set(), this._loading = {}, this._cache = /* @__PURE__ */ new Map(), w = this.opts = { ...w, ...v(w) };
      const { es5: D, lines: I } = this.opts.code;
      this.scope = new l.ValueScope({ scope: {}, prefixes: g, es5: D, lines: I }), this.logger = W(w.logger);
      const p = w.validateFormats;
      w.validateFormats = !1, this.RULES = (0, s.getRules)(), N.call(this, y, w, "NOT SUPPORTED"), N.call(this, m, w, "DEPRECATED", "warn"), this._metaOpts = A.call(this), w.formats && R.call(this), this._addVocabularies(), this._addDefaultMetaSchema(), w.keywords && P.call(this, w.keywords), typeof w.meta == "object" && this.addMetaSchema(w.meta), U.call(this), w.validateFormats = p;
    }
    _addVocabularies() {
      this.addKeyword("$async");
    }
    _addDefaultMetaSchema() {
      const { $data: w, meta: D, schemaId: I } = this.opts;
      let p = E;
      I === "id" && (p = { ...E }, p.id = p.$id, delete p.$id), D && w && this.addMetaSchema(p, p[I], !1);
    }
    defaultMeta() {
      const { meta: w, schemaId: D } = this.opts;
      return this.opts.defaultMeta = typeof w == "object" ? w[D] || w : void 0;
    }
    validate(w, D) {
      let I;
      if (typeof w == "string") {
        if (I = this.getSchema(w), !I)
          throw new Error(`no schema with key or ref "${w}"`);
      } else
        I = this.compile(w);
      const p = I(D);
      return "$async" in I || (this.errors = I.errors), p;
    }
    compile(w, D) {
      const I = this._addSchema(w, D);
      return I.validate || this._compileSchemaEnv(I);
    }
    compileAsync(w, D) {
      if (typeof this.opts.loadSchema != "function")
        throw new Error("options.loadSchema should be a function");
      const { loadSchema: I } = this.opts;
      return p.call(this, w, D);
      async function p(ee, B) {
        await _.call(this, ee.$schema);
        const ot = this._addSchema(ee, B);
        return ot.validate || $.call(this, ot);
      }
      async function _(ee) {
        ee && !this.getSchema(ee) && await p.call(this, { $ref: ee }, !0);
      }
      async function $(ee) {
        try {
          return this._compileSchemaEnv(ee);
        } catch (B) {
          if (!(B instanceof i.default))
            throw B;
          return K.call(this, B), await M.call(this, B.missingSchema), $.call(this, ee);
        }
      }
      function K({ missingSchema: ee, missingRef: B }) {
        if (this.refs[ee])
          throw new Error(`AnySchema ${ee} is loaded but ${B} cannot be resolved`);
      }
      async function M(ee) {
        const B = await ie.call(this, ee);
        this.refs[ee] || await _.call(this, B.$schema), this.refs[ee] || this.addSchema(B, ee, D);
      }
      async function ie(ee) {
        const B = this._loading[ee];
        if (B)
          return B;
        try {
          return await (this._loading[ee] = I(ee));
        } finally {
          delete this._loading[ee];
        }
      }
    }
    // Adds schema to the instance
    addSchema(w, D, I, p = this.opts.validateSchema) {
      if (Array.isArray(w)) {
        for (const $ of w)
          this.addSchema($, void 0, I, p);
        return this;
      }
      let _;
      if (typeof w == "object") {
        const { schemaId: $ } = this.opts;
        if (_ = w[$], _ !== void 0 && typeof _ != "string")
          throw new Error(`schema ${$} must be string`);
      }
      return D = (0, a.normalizeId)(D || _), this._checkUnique(D), this.schemas[D] = this._addSchema(w, I, D, p, !0), this;
    }
    // Add schema that will be used to validate other schemas
    // options in META_IGNORE_OPTIONS are alway set to false
    addMetaSchema(w, D, I = this.opts.validateSchema) {
      return this.addSchema(w, D, !0, I), this;
    }
    //  Validate schema against its meta-schema
    validateSchema(w, D) {
      if (typeof w == "boolean")
        return !0;
      let I;
      if (I = w.$schema, I !== void 0 && typeof I != "string")
        throw new Error("$schema must be a string");
      if (I = I || this.opts.defaultMeta || this.defaultMeta(), !I)
        return this.logger.warn("meta-schema not available"), this.errors = null, !0;
      const p = this.validate(I, w);
      if (!p && D) {
        const _ = "schema is invalid: " + this.errorsText();
        if (this.opts.validateSchema === "log")
          this.logger.error(_);
        else
          throw new Error(_);
      }
      return p;
    }
    // Get compiled schema by `key` or `ref`.
    // (`key` that was passed to `addSchema` or full schema reference - `schema.$id` or resolved id)
    getSchema(w) {
      let D;
      for (; typeof (D = F.call(this, w)) == "string"; )
        w = D;
      if (D === void 0) {
        const { schemaId: I } = this.opts, p = new o.SchemaEnv({ schema: {}, schemaId: I });
        if (D = o.resolveSchema.call(this, p, w), !D)
          return;
        this.refs[w] = D;
      }
      return D.validate || this._compileSchemaEnv(D);
    }
    // Remove cached schema(s).
    // If no parameter is passed all schemas but meta-schemas are removed.
    // If RegExp is passed all schemas with key/id matching pattern but meta-schemas are removed.
    // Even if schema is referenced by other schemas it still can be removed as other schemas have local references.
    removeSchema(w) {
      if (w instanceof RegExp)
        return this._removeAllSchemas(this.schemas, w), this._removeAllSchemas(this.refs, w), this;
      switch (typeof w) {
        case "undefined":
          return this._removeAllSchemas(this.schemas), this._removeAllSchemas(this.refs), this._cache.clear(), this;
        case "string": {
          const D = F.call(this, w);
          return typeof D == "object" && this._cache.delete(D.schema), delete this.schemas[w], delete this.refs[w], this;
        }
        case "object": {
          const D = w;
          this._cache.delete(D);
          let I = w[this.opts.schemaId];
          return I && (I = (0, a.normalizeId)(I), delete this.schemas[I], delete this.refs[I]), this;
        }
        default:
          throw new Error("ajv.removeSchema: invalid parameter");
      }
    }
    // add "vocabulary" - a collection of keywords
    addVocabulary(w) {
      for (const D of w)
        this.addKeyword(D);
      return this;
    }
    addKeyword(w, D) {
      let I;
      if (typeof w == "string")
        I = w, typeof D == "object" && (this.logger.warn("these parameters are deprecated, see docs for addKeyword"), D.keyword = I);
      else if (typeof w == "object" && D === void 0) {
        if (D = w, I = D.keyword, Array.isArray(I) && !I.length)
          throw new Error("addKeywords: keyword must be string or non-empty array");
      } else
        throw new Error("invalid addKeywords parameters");
      if (k.call(this, I, D), !D)
        return (0, f.eachItem)(I, (_) => L.call(this, _)), this;
      j.call(this, D);
      const p = {
        ...D,
        type: (0, c.getJSONTypes)(D.type),
        schemaType: (0, c.getJSONTypes)(D.schemaType)
      };
      return (0, f.eachItem)(I, p.type.length === 0 ? (_) => L.call(this, _, p) : (_) => p.type.forEach(($) => L.call(this, _, p, $))), this;
    }
    getKeyword(w) {
      const D = this.RULES.all[w];
      return typeof D == "object" ? D.definition : !!D;
    }
    // Remove keyword
    removeKeyword(w) {
      const { RULES: D } = this;
      delete D.keywords[w], delete D.all[w];
      for (const I of D.rules) {
        const p = I.rules.findIndex((_) => _.keyword === w);
        p >= 0 && I.rules.splice(p, 1);
      }
      return this;
    }
    // Add format
    addFormat(w, D) {
      return typeof D == "string" && (D = new RegExp(D)), this.formats[w] = D, this;
    }
    errorsText(w = this.errors, { separator: D = ", ", dataVar: I = "data" } = {}) {
      return !w || w.length === 0 ? "No errors" : w.map((p) => `${I}${p.instancePath} ${p.message}`).reduce((p, _) => p + D + _);
    }
    $dataMetaSchema(w, D) {
      const I = this.RULES.all;
      w = JSON.parse(JSON.stringify(w));
      for (const p of D) {
        const _ = p.split("/").slice(1);
        let $ = w;
        for (const K of _)
          $ = $[K];
        for (const K in I) {
          const M = I[K];
          if (typeof M != "object")
            continue;
          const { $data: ie } = M.definition, ee = $[K];
          ie && ee && ($[K] = C(ee));
        }
      }
      return w;
    }
    _removeAllSchemas(w, D) {
      for (const I in w) {
        const p = w[I];
        (!D || D.test(I)) && (typeof p == "string" ? delete w[I] : p && !p.meta && (this._cache.delete(p.schema), delete w[I]));
      }
    }
    _addSchema(w, D, I, p = this.opts.validateSchema, _ = this.opts.addUsedSchema) {
      let $;
      const { schemaId: K } = this.opts;
      if (typeof w == "object")
        $ = w[K];
      else {
        if (this.opts.jtd)
          throw new Error("schema must be object");
        if (typeof w != "boolean")
          throw new Error("schema must be object or boolean");
      }
      let M = this._cache.get(w);
      if (M !== void 0)
        return M;
      I = (0, a.normalizeId)($ || I);
      const ie = a.getSchemaRefs.call(this, w, I);
      return M = new o.SchemaEnv({ schema: w, schemaId: K, meta: D, baseId: I, localRefs: ie }), this._cache.set(M.schema, M), _ && !I.startsWith("#") && (I && this._checkUnique(I), this.refs[I] = M), p && this.validateSchema(w, !0), M;
    }
    _checkUnique(w) {
      if (this.schemas[w] || this.refs[w])
        throw new Error(`schema with key or id "${w}" already exists`);
    }
    _compileSchemaEnv(w) {
      if (w.meta ? this._compileMetaSchema(w) : o.compileSchema.call(this, w), !w.validate)
        throw new Error("ajv implementation error");
      return w.validate;
    }
    _compileMetaSchema(w) {
      const D = this.opts;
      this.opts = this._metaOpts;
      try {
        o.compileSchema.call(this, w);
      } finally {
        this.opts = D;
      }
    }
  }
  O.ValidationError = n.default, O.MissingRefError = i.default, e.default = O;
  function N(b, w, D, I = "error") {
    for (const p in b) {
      const _ = p;
      _ in w && this.logger[I](`${D}: option ${p}. ${b[_]}`);
    }
  }
  function F(b) {
    return b = (0, a.normalizeId)(b), this.schemas[b] || this.refs[b];
  }
  function U() {
    const b = this.opts.schemas;
    if (b)
      if (Array.isArray(b))
        this.addSchema(b);
      else
        for (const w in b)
          this.addSchema(b[w], w);
  }
  function R() {
    for (const b in this.opts.formats) {
      const w = this.opts.formats[b];
      w && this.addFormat(b, w);
    }
  }
  function P(b) {
    if (Array.isArray(b)) {
      this.addVocabulary(b);
      return;
    }
    this.logger.warn("keywords option as map is deprecated, pass array");
    for (const w in b) {
      const D = b[w];
      D.keyword || (D.keyword = w), this.addKeyword(D);
    }
  }
  function A() {
    const b = { ...this.opts };
    for (const w of d)
      delete b[w];
    return b;
  }
  const x = { log() {
  }, warn() {
  }, error() {
  } };
  function W(b) {
    if (b === !1)
      return x;
    if (b === void 0)
      return console;
    if (b.log && b.warn && b.error)
      return b;
    throw new Error("logger must implement log, warn and error methods");
  }
  const J = /^[a-z_$][a-z0-9_$:-]*$/i;
  function k(b, w) {
    const { RULES: D } = this;
    if ((0, f.eachItem)(b, (I) => {
      if (D.keywords[I])
        throw new Error(`Keyword ${I} is already defined`);
      if (!J.test(I))
        throw new Error(`Keyword ${I} has invalid name`);
    }), !!w && w.$data && !("code" in w || "validate" in w))
      throw new Error('$data keyword must have "code" or "validate" function');
  }
  function L(b, w, D) {
    var I;
    const p = w?.post;
    if (D && p)
      throw new Error('keyword with "post" flag cannot have "type"');
    const { RULES: _ } = this;
    let $ = p ? _.post : _.rules.find(({ type: M }) => M === D);
    if ($ || ($ = { type: D, rules: [] }, _.rules.push($)), _.keywords[b] = !0, !w)
      return;
    const K = {
      keyword: b,
      definition: {
        ...w,
        type: (0, c.getJSONTypes)(w.type),
        schemaType: (0, c.getJSONTypes)(w.schemaType)
      }
    };
    w.before ? V.call(this, $, K, w.before) : $.rules.push(K), _.all[b] = K, (I = w.implements) === null || I === void 0 || I.forEach((M) => this.addKeyword(M));
  }
  function V(b, w, D) {
    const I = b.rules.findIndex((p) => p.keyword === D);
    I >= 0 ? b.rules.splice(I, 0, w) : (b.rules.push(w), this.logger.warn(`rule ${D} is not defined`));
  }
  function j(b) {
    let { metaSchema: w } = b;
    w !== void 0 && (b.$data && this.opts.$data && (w = C(w)), b.validateSchema = this.compile(w, !0));
  }
  const T = {
    $ref: "https://raw.githubusercontent.com/ajv-validator/ajv/master/lib/refs/data.json#"
  };
  function C(b) {
    return { anyOf: [b, T] };
  }
})(La);
var qi = {}, Wi = {}, Ki = {};
Object.defineProperty(Ki, "__esModule", { value: !0 });
const nh = {
  keyword: "id",
  code() {
    throw new Error('NOT SUPPORTED: keyword "id", use "$id" for schema ID');
  }
};
Ki.default = nh;
var xt = {};
Object.defineProperty(xt, "__esModule", { value: !0 });
xt.callRef = xt.getValidate = void 0;
const ih = or, ro = re, Ke = te, Bt = mt, no = Xe, qr = q, sh = {
  keyword: "$ref",
  schemaType: "string",
  code(e) {
    const { gen: t, schema: r, it: n } = e, { baseId: i, schemaEnv: s, validateName: o, opts: l, self: a } = n, { root: c } = s;
    if ((r === "#" || r === "#/") && i === c.baseId)
      return E();
    const f = no.resolveRef.call(a, c, i, r);
    if (f === void 0)
      throw new ih.default(n.opts.uriResolver, i, r);
    if (f instanceof no.SchemaEnv)
      return S(f);
    return u(f);
    function E() {
      if (s === c)
        return an(e, o, s, s.$async);
      const d = t.scopeValue("root", { ref: c });
      return an(e, (0, Ke._)`${d}.validate`, c, c.$async);
    }
    function S(d) {
      const g = Sc(e, d);
      an(e, g, d, d.$async);
    }
    function u(d) {
      const g = t.scopeValue("schema", l.code.source === !0 ? { ref: d, code: (0, Ke.stringify)(d) } : { ref: d }), y = t.name("valid"), m = e.subschema({
        schema: d,
        dataTypes: [],
        schemaPath: Ke.nil,
        topSchemaRef: g,
        errSchemaPath: r
      }, y);
      e.mergeEvaluated(m), e.ok(y);
    }
  }
};
function Sc(e, t) {
  const { gen: r } = e;
  return t.validate ? r.scopeValue("validate", { ref: t.validate }) : (0, Ke._)`${r.scopeValue("wrapper", { ref: t })}.validate`;
}
xt.getValidate = Sc;
function an(e, t, r, n) {
  const { gen: i, it: s } = e, { allErrors: o, schemaEnv: l, opts: a } = s, c = a.passContext ? Bt.default.this : Ke.nil;
  n ? f() : E();
  function f() {
    if (!l.$async)
      throw new Error("async schema referenced by sync schema");
    const d = i.let("valid");
    i.try(() => {
      i.code((0, Ke._)`await ${(0, ro.callValidateCode)(e, t, c)}`), u(t), o || i.assign(d, !0);
    }, (g) => {
      i.if((0, Ke._)`!(${g} instanceof ${s.ValidationError})`, () => i.throw(g)), S(g), o || i.assign(d, !1);
    }), e.ok(d);
  }
  function E() {
    e.result((0, ro.callValidateCode)(e, t, c), () => u(t), () => S(t));
  }
  function S(d) {
    const g = (0, Ke._)`${d}.errors`;
    i.assign(Bt.default.vErrors, (0, Ke._)`${Bt.default.vErrors} === null ? ${g} : ${Bt.default.vErrors}.concat(${g})`), i.assign(Bt.default.errors, (0, Ke._)`${Bt.default.vErrors}.length`);
  }
  function u(d) {
    var g;
    if (!s.opts.unevaluated)
      return;
    const y = (g = r?.validate) === null || g === void 0 ? void 0 : g.evaluated;
    if (s.props !== !0)
      if (y && !y.dynamicProps)
        y.props !== void 0 && (s.props = qr.mergeEvaluated.props(i, y.props, s.props));
      else {
        const m = i.var("props", (0, Ke._)`${d}.evaluated.props`);
        s.props = qr.mergeEvaluated.props(i, m, s.props, Ke.Name);
      }
    if (s.items !== !0)
      if (y && !y.dynamicItems)
        y.items !== void 0 && (s.items = qr.mergeEvaluated.items(i, y.items, s.items));
      else {
        const m = i.var("items", (0, Ke._)`${d}.evaluated.items`);
        s.items = qr.mergeEvaluated.items(i, m, s.items, Ke.Name);
      }
  }
}
xt.callRef = an;
xt.default = sh;
Object.defineProperty(Wi, "__esModule", { value: !0 });
const oh = Ki, ah = xt, ch = [
  "$schema",
  "$id",
  "$defs",
  "$vocabulary",
  { keyword: "$comment" },
  "definitions",
  oh.default,
  ah.default
];
Wi.default = ch;
var Xi = {}, Zi = {};
Object.defineProperty(Zi, "__esModule", { value: !0 });
const pn = te, _t = pn.operators, yn = {
  maximum: { okStr: "<=", ok: _t.LTE, fail: _t.GT },
  minimum: { okStr: ">=", ok: _t.GTE, fail: _t.LT },
  exclusiveMaximum: { okStr: "<", ok: _t.LT, fail: _t.GTE },
  exclusiveMinimum: { okStr: ">", ok: _t.GT, fail: _t.LTE }
}, lh = {
  message: ({ keyword: e, schemaCode: t }) => (0, pn.str)`must be ${yn[e].okStr} ${t}`,
  params: ({ keyword: e, schemaCode: t }) => (0, pn._)`{comparison: ${yn[e].okStr}, limit: ${t}}`
}, fh = {
  keyword: Object.keys(yn),
  type: "number",
  schemaType: "number",
  $data: !0,
  error: lh,
  code(e) {
    const { keyword: t, data: r, schemaCode: n } = e;
    e.fail$data((0, pn._)`${r} ${yn[t].fail} ${n} || isNaN(${r})`);
  }
};
Zi.default = fh;
var Ji = {};
Object.defineProperty(Ji, "__esModule", { value: !0 });
const Or = te, uh = {
  message: ({ schemaCode: e }) => (0, Or.str)`must be multiple of ${e}`,
  params: ({ schemaCode: e }) => (0, Or._)`{multipleOf: ${e}}`
}, dh = {
  keyword: "multipleOf",
  type: "number",
  schemaType: "number",
  $data: !0,
  error: uh,
  code(e) {
    const { gen: t, data: r, schemaCode: n, it: i } = e, s = i.opts.multipleOfPrecision, o = t.let("res"), l = s ? (0, Or._)`Math.abs(Math.round(${o}) - ${o}) > 1e-${s}` : (0, Or._)`${o} !== parseInt(${o})`;
    e.fail$data((0, Or._)`(${n} === 0 || (${o} = ${r}/${n}, ${l}))`);
  }
};
Ji.default = dh;
var Yi = {}, Qi = {};
Object.defineProperty(Qi, "__esModule", { value: !0 });
function wc(e) {
  const t = e.length;
  let r = 0, n = 0, i;
  for (; n < t; )
    r++, i = e.charCodeAt(n++), i >= 55296 && i <= 56319 && n < t && (i = e.charCodeAt(n), (i & 64512) === 56320 && n++);
  return r;
}
Qi.default = wc;
wc.code = 'require("ajv/dist/runtime/ucs2length").default';
Object.defineProperty(Yi, "__esModule", { value: !0 });
const Ft = te, hh = q, mh = Qi, ph = {
  message({ keyword: e, schemaCode: t }) {
    const r = e === "maxLength" ? "more" : "fewer";
    return (0, Ft.str)`must NOT have ${r} than ${t} characters`;
  },
  params: ({ schemaCode: e }) => (0, Ft._)`{limit: ${e}}`
}, yh = {
  keyword: ["maxLength", "minLength"],
  type: "string",
  schemaType: "number",
  $data: !0,
  error: ph,
  code(e) {
    const { keyword: t, data: r, schemaCode: n, it: i } = e, s = t === "maxLength" ? Ft.operators.GT : Ft.operators.LT, o = i.opts.unicode === !1 ? (0, Ft._)`${r}.length` : (0, Ft._)`${(0, hh.useFunc)(e.gen, mh.default)}(${r})`;
    e.fail$data((0, Ft._)`${o} ${s} ${n}`);
  }
};
Yi.default = yh;
var es = {};
Object.defineProperty(es, "__esModule", { value: !0 });
const Eh = re, En = te, gh = {
  message: ({ schemaCode: e }) => (0, En.str)`must match pattern "${e}"`,
  params: ({ schemaCode: e }) => (0, En._)`{pattern: ${e}}`
}, $h = {
  keyword: "pattern",
  type: "string",
  schemaType: "string",
  $data: !0,
  error: gh,
  code(e) {
    const { data: t, $data: r, schema: n, schemaCode: i, it: s } = e, o = s.opts.unicodeRegExp ? "u" : "", l = r ? (0, En._)`(new RegExp(${i}, ${o}))` : (0, Eh.usePattern)(e, n);
    e.fail$data((0, En._)`!${l}.test(${t})`);
  }
};
es.default = $h;
var ts = {};
Object.defineProperty(ts, "__esModule", { value: !0 });
const Ir = te, vh = {
  message({ keyword: e, schemaCode: t }) {
    const r = e === "maxProperties" ? "more" : "fewer";
    return (0, Ir.str)`must NOT have ${r} than ${t} properties`;
  },
  params: ({ schemaCode: e }) => (0, Ir._)`{limit: ${e}}`
}, _h = {
  keyword: ["maxProperties", "minProperties"],
  type: "object",
  schemaType: "number",
  $data: !0,
  error: vh,
  code(e) {
    const { keyword: t, data: r, schemaCode: n } = e, i = t === "maxProperties" ? Ir.operators.GT : Ir.operators.LT;
    e.fail$data((0, Ir._)`Object.keys(${r}).length ${i} ${n}`);
  }
};
ts.default = _h;
var rs = {};
Object.defineProperty(rs, "__esModule", { value: !0 });
const vr = re, Nr = te, Sh = q, wh = {
  message: ({ params: { missingProperty: e } }) => (0, Nr.str)`must have required property '${e}'`,
  params: ({ params: { missingProperty: e } }) => (0, Nr._)`{missingProperty: ${e}}`
}, bh = {
  keyword: "required",
  type: "object",
  schemaType: "array",
  $data: !0,
  error: wh,
  code(e) {
    const { gen: t, schema: r, schemaCode: n, data: i, $data: s, it: o } = e, { opts: l } = o;
    if (!s && r.length === 0)
      return;
    const a = r.length >= l.loopRequired;
    if (o.allErrors ? c() : f(), l.strictRequired) {
      const u = e.parentSchema.properties, { definedProperties: d } = e.it;
      for (const g of r)
        if (u?.[g] === void 0 && !d.has(g)) {
          const y = o.schemaEnv.baseId + o.errSchemaPath, m = `required property "${g}" is not defined at "${y}" (strictRequired)`;
          (0, Sh.checkStrictMode)(o, m, o.opts.strictRequired);
        }
    }
    function c() {
      if (a || s)
        e.block$data(Nr.nil, E);
      else
        for (const u of r)
          (0, vr.checkReportMissingProp)(e, u);
    }
    function f() {
      const u = t.let("missing");
      if (a || s) {
        const d = t.let("valid", !0);
        e.block$data(d, () => S(u, d)), e.ok(d);
      } else
        t.if((0, vr.checkMissingProp)(e, r, u)), (0, vr.reportMissingProp)(e, u), t.else();
    }
    function E() {
      t.forOf("prop", n, (u) => {
        e.setParams({ missingProperty: u }), t.if((0, vr.noPropertyInData)(t, i, u, l.ownProperties), () => e.error());
      });
    }
    function S(u, d) {
      e.setParams({ missingProperty: u }), t.forOf(u, n, () => {
        t.assign(d, (0, vr.propertyInData)(t, i, u, l.ownProperties)), t.if((0, Nr.not)(d), () => {
          e.error(), t.break();
        });
      }, Nr.nil);
    }
  }
};
rs.default = bh;
var ns = {};
Object.defineProperty(ns, "__esModule", { value: !0 });
const Pr = te, Oh = {
  message({ keyword: e, schemaCode: t }) {
    const r = e === "maxItems" ? "more" : "fewer";
    return (0, Pr.str)`must NOT have ${r} than ${t} items`;
  },
  params: ({ schemaCode: e }) => (0, Pr._)`{limit: ${e}}`
}, Ih = {
  keyword: ["maxItems", "minItems"],
  type: "array",
  schemaType: "number",
  $data: !0,
  error: Oh,
  code(e) {
    const { keyword: t, data: r, schemaCode: n } = e, i = t === "maxItems" ? Pr.operators.GT : Pr.operators.LT;
    e.fail$data((0, Pr._)`${r}.length ${i} ${n}`);
  }
};
ns.default = Ih;
var is = {}, Mr = {};
Object.defineProperty(Mr, "__esModule", { value: !0 });
const bc = Za;
bc.code = 'require("ajv/dist/runtime/equal").default';
Mr.default = bc;
Object.defineProperty(is, "__esModule", { value: !0 });
const Hn = Pe, Ae = te, Nh = q, Ph = Mr, Th = {
  message: ({ params: { i: e, j: t } }) => (0, Ae.str)`must NOT have duplicate items (items ## ${t} and ${e} are identical)`,
  params: ({ params: { i: e, j: t } }) => (0, Ae._)`{i: ${e}, j: ${t}}`
}, Rh = {
  keyword: "uniqueItems",
  type: "array",
  schemaType: "boolean",
  $data: !0,
  error: Th,
  code(e) {
    const { gen: t, data: r, $data: n, schema: i, parentSchema: s, schemaCode: o, it: l } = e;
    if (!n && !i)
      return;
    const a = t.let("valid"), c = s.items ? (0, Hn.getSchemaTypes)(s.items) : [];
    e.block$data(a, f, (0, Ae._)`${o} === false`), e.ok(a);
    function f() {
      const d = t.let("i", (0, Ae._)`${r}.length`), g = t.let("j");
      e.setParams({ i: d, j: g }), t.assign(a, !0), t.if((0, Ae._)`${d} > 1`, () => (E() ? S : u)(d, g));
    }
    function E() {
      return c.length > 0 && !c.some((d) => d === "object" || d === "array");
    }
    function S(d, g) {
      const y = t.name("item"), m = (0, Hn.checkDataTypes)(c, y, l.opts.strictNumbers, Hn.DataType.Wrong), h = t.const("indices", (0, Ae._)`{}`);
      t.for((0, Ae._)`;${d}--;`, () => {
        t.let(y, (0, Ae._)`${r}[${d}]`), t.if(m, (0, Ae._)`continue`), c.length > 1 && t.if((0, Ae._)`typeof ${y} == "string"`, (0, Ae._)`${y} += "_"`), t.if((0, Ae._)`typeof ${h}[${y}] == "number"`, () => {
          t.assign(g, (0, Ae._)`${h}[${y}]`), e.error(), t.assign(a, !1).break();
        }).code((0, Ae._)`${h}[${y}] = ${d}`);
      });
    }
    function u(d, g) {
      const y = (0, Nh.useFunc)(t, Ph.default), m = t.name("outer");
      t.label(m).for((0, Ae._)`;${d}--;`, () => t.for((0, Ae._)`${g} = ${d}; ${g}--;`, () => t.if((0, Ae._)`${y}(${r}[${d}], ${r}[${g}])`, () => {
        e.error(), t.assign(a, !1).break(m);
      })));
    }
  }
};
is.default = Rh;
var ss = {};
Object.defineProperty(ss, "__esModule", { value: !0 });
const fi = te, Ch = q, Dh = Mr, Ah = {
  message: "must be equal to constant",
  params: ({ schemaCode: e }) => (0, fi._)`{allowedValue: ${e}}`
}, Lh = {
  keyword: "const",
  $data: !0,
  error: Ah,
  code(e) {
    const { gen: t, data: r, $data: n, schemaCode: i, schema: s } = e;
    n || s && typeof s == "object" ? e.fail$data((0, fi._)`!${(0, Ch.useFunc)(t, Dh.default)}(${r}, ${i})`) : e.fail((0, fi._)`${s} !== ${r}`);
  }
};
ss.default = Lh;
var os = {};
Object.defineProperty(os, "__esModule", { value: !0 });
const wr = te, Fh = q, kh = Mr, jh = {
  message: "must be equal to one of the allowed values",
  params: ({ schemaCode: e }) => (0, wr._)`{allowedValues: ${e}}`
}, Mh = {
  keyword: "enum",
  schemaType: "array",
  $data: !0,
  error: jh,
  code(e) {
    const { gen: t, data: r, $data: n, schema: i, schemaCode: s, it: o } = e;
    if (!n && i.length === 0)
      throw new Error("enum must have non-empty array");
    const l = i.length >= o.opts.loopEnum;
    let a;
    const c = () => a ?? (a = (0, Fh.useFunc)(t, kh.default));
    let f;
    if (l || n)
      f = t.let("valid"), e.block$data(f, E);
    else {
      if (!Array.isArray(i))
        throw new Error("ajv implementation error");
      const u = t.const("vSchema", s);
      f = (0, wr.or)(...i.map((d, g) => S(u, g)));
    }
    e.pass(f);
    function E() {
      t.assign(f, !1), t.forOf("v", s, (u) => t.if((0, wr._)`${c()}(${r}, ${u})`, () => t.assign(f, !0).break()));
    }
    function S(u, d) {
      const g = i[d];
      return typeof g == "object" && g !== null ? (0, wr._)`${c()}(${r}, ${u}[${d}])` : (0, wr._)`${r} === ${g}`;
    }
  }
};
os.default = Mh;
Object.defineProperty(Xi, "__esModule", { value: !0 });
const xh = Zi, Uh = Ji, zh = Yi, Vh = es, Gh = ts, Bh = rs, Hh = ns, qh = is, Wh = ss, Kh = os, Xh = [
  // number
  xh.default,
  Uh.default,
  // string
  zh.default,
  Vh.default,
  // object
  Gh.default,
  Bh.default,
  // array
  Hh.default,
  qh.default,
  // any
  { keyword: "type", schemaType: ["string", "array"] },
  { keyword: "nullable", schemaType: "boolean" },
  Wh.default,
  Kh.default
];
Xi.default = Xh;
var as = {}, ar = {};
Object.defineProperty(ar, "__esModule", { value: !0 });
ar.validateAdditionalItems = void 0;
const kt = te, ui = q, Zh = {
  message: ({ params: { len: e } }) => (0, kt.str)`must NOT have more than ${e} items`,
  params: ({ params: { len: e } }) => (0, kt._)`{limit: ${e}}`
}, Jh = {
  keyword: "additionalItems",
  type: "array",
  schemaType: ["boolean", "object"],
  before: "uniqueItems",
  error: Zh,
  code(e) {
    const { parentSchema: t, it: r } = e, { items: n } = t;
    if (!Array.isArray(n)) {
      (0, ui.checkStrictMode)(r, '"additionalItems" is ignored when "items" is not an array of schemas');
      return;
    }
    Oc(e, n);
  }
};
function Oc(e, t) {
  const { gen: r, schema: n, data: i, keyword: s, it: o } = e;
  o.items = !0;
  const l = r.const("len", (0, kt._)`${i}.length`);
  if (n === !1)
    e.setParams({ len: t.length }), e.pass((0, kt._)`${l} <= ${t.length}`);
  else if (typeof n == "object" && !(0, ui.alwaysValidSchema)(o, n)) {
    const c = r.var("valid", (0, kt._)`${l} <= ${t.length}`);
    r.if((0, kt.not)(c), () => a(c)), e.ok(c);
  }
  function a(c) {
    r.forRange("i", t.length, l, (f) => {
      e.subschema({ keyword: s, dataProp: f, dataPropType: ui.Type.Num }, c), o.allErrors || r.if((0, kt.not)(c), () => r.break());
    });
  }
}
ar.validateAdditionalItems = Oc;
ar.default = Jh;
var cs = {}, cr = {};
Object.defineProperty(cr, "__esModule", { value: !0 });
cr.validateTuple = void 0;
const io = te, cn = q, Yh = re, Qh = {
  keyword: "items",
  type: "array",
  schemaType: ["object", "array", "boolean"],
  before: "uniqueItems",
  code(e) {
    const { schema: t, it: r } = e;
    if (Array.isArray(t))
      return Ic(e, "additionalItems", t);
    r.items = !0, !(0, cn.alwaysValidSchema)(r, t) && e.ok((0, Yh.validateArray)(e));
  }
};
function Ic(e, t, r = e.schema) {
  const { gen: n, parentSchema: i, data: s, keyword: o, it: l } = e;
  f(i), l.opts.unevaluated && r.length && l.items !== !0 && (l.items = cn.mergeEvaluated.items(n, r.length, l.items));
  const a = n.name("valid"), c = n.const("len", (0, io._)`${s}.length`);
  r.forEach((E, S) => {
    (0, cn.alwaysValidSchema)(l, E) || (n.if((0, io._)`${c} > ${S}`, () => e.subschema({
      keyword: o,
      schemaProp: S,
      dataProp: S
    }, a)), e.ok(a));
  });
  function f(E) {
    const { opts: S, errSchemaPath: u } = l, d = r.length, g = d === E.minItems && (d === E.maxItems || E[t] === !1);
    if (S.strictTuples && !g) {
      const y = `"${o}" is ${d}-tuple, but minItems or maxItems/${t} are not specified or different at path "${u}"`;
      (0, cn.checkStrictMode)(l, y, S.strictTuples);
    }
  }
}
cr.validateTuple = Ic;
cr.default = Qh;
Object.defineProperty(cs, "__esModule", { value: !0 });
const em = cr, tm = {
  keyword: "prefixItems",
  type: "array",
  schemaType: ["array"],
  before: "uniqueItems",
  code: (e) => (0, em.validateTuple)(e, "items")
};
cs.default = tm;
var ls = {};
Object.defineProperty(ls, "__esModule", { value: !0 });
const so = te, rm = q, nm = re, im = ar, sm = {
  message: ({ params: { len: e } }) => (0, so.str)`must NOT have more than ${e} items`,
  params: ({ params: { len: e } }) => (0, so._)`{limit: ${e}}`
}, om = {
  keyword: "items",
  type: "array",
  schemaType: ["object", "boolean"],
  before: "uniqueItems",
  error: sm,
  code(e) {
    const { schema: t, parentSchema: r, it: n } = e, { prefixItems: i } = r;
    n.items = !0, !(0, rm.alwaysValidSchema)(n, t) && (i ? (0, im.validateAdditionalItems)(e, i) : e.ok((0, nm.validateArray)(e)));
  }
};
ls.default = om;
var fs = {};
Object.defineProperty(fs, "__esModule", { value: !0 });
const Qe = te, Wr = q, am = {
  message: ({ params: { min: e, max: t } }) => t === void 0 ? (0, Qe.str)`must contain at least ${e} valid item(s)` : (0, Qe.str)`must contain at least ${e} and no more than ${t} valid item(s)`,
  params: ({ params: { min: e, max: t } }) => t === void 0 ? (0, Qe._)`{minContains: ${e}}` : (0, Qe._)`{minContains: ${e}, maxContains: ${t}}`
}, cm = {
  keyword: "contains",
  type: "array",
  schemaType: ["object", "boolean"],
  before: "uniqueItems",
  trackErrors: !0,
  error: am,
  code(e) {
    const { gen: t, schema: r, parentSchema: n, data: i, it: s } = e;
    let o, l;
    const { minContains: a, maxContains: c } = n;
    s.opts.next ? (o = a === void 0 ? 1 : a, l = c) : o = 1;
    const f = t.const("len", (0, Qe._)`${i}.length`);
    if (e.setParams({ min: o, max: l }), l === void 0 && o === 0) {
      (0, Wr.checkStrictMode)(s, '"minContains" == 0 without "maxContains": "contains" keyword ignored');
      return;
    }
    if (l !== void 0 && o > l) {
      (0, Wr.checkStrictMode)(s, '"minContains" > "maxContains" is always invalid'), e.fail();
      return;
    }
    if ((0, Wr.alwaysValidSchema)(s, r)) {
      let g = (0, Qe._)`${f} >= ${o}`;
      l !== void 0 && (g = (0, Qe._)`${g} && ${f} <= ${l}`), e.pass(g);
      return;
    }
    s.items = !0;
    const E = t.name("valid");
    l === void 0 && o === 1 ? u(E, () => t.if(E, () => t.break())) : o === 0 ? (t.let(E, !0), l !== void 0 && t.if((0, Qe._)`${i}.length > 0`, S)) : (t.let(E, !1), S()), e.result(E, () => e.reset());
    function S() {
      const g = t.name("_valid"), y = t.let("count", 0);
      u(g, () => t.if(g, () => d(y)));
    }
    function u(g, y) {
      t.forRange("i", 0, f, (m) => {
        e.subschema({
          keyword: "contains",
          dataProp: m,
          dataPropType: Wr.Type.Num,
          compositeRule: !0
        }, g), y();
      });
    }
    function d(g) {
      t.code((0, Qe._)`${g}++`), l === void 0 ? t.if((0, Qe._)`${g} >= ${o}`, () => t.assign(E, !0).break()) : (t.if((0, Qe._)`${g} > ${l}`, () => t.assign(E, !1).break()), o === 1 ? t.assign(E, !0) : t.if((0, Qe._)`${g} >= ${o}`, () => t.assign(E, !0)));
    }
  }
};
fs.default = cm;
var Nc = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.validateSchemaDeps = e.validatePropertyDeps = e.error = void 0;
  const t = te, r = q, n = re;
  e.error = {
    message: ({ params: { property: a, depsCount: c, deps: f } }) => {
      const E = c === 1 ? "property" : "properties";
      return (0, t.str)`must have ${E} ${f} when property ${a} is present`;
    },
    params: ({ params: { property: a, depsCount: c, deps: f, missingProperty: E } }) => (0, t._)`{property: ${a},
    missingProperty: ${E},
    depsCount: ${c},
    deps: ${f}}`
    // TODO change to reference
  };
  const i = {
    keyword: "dependencies",
    type: "object",
    schemaType: "object",
    error: e.error,
    code(a) {
      const [c, f] = s(a);
      o(a, c), l(a, f);
    }
  };
  function s({ schema: a }) {
    const c = {}, f = {};
    for (const E in a) {
      if (E === "__proto__")
        continue;
      const S = Array.isArray(a[E]) ? c : f;
      S[E] = a[E];
    }
    return [c, f];
  }
  function o(a, c = a.schema) {
    const { gen: f, data: E, it: S } = a;
    if (Object.keys(c).length === 0)
      return;
    const u = f.let("missing");
    for (const d in c) {
      const g = c[d];
      if (g.length === 0)
        continue;
      const y = (0, n.propertyInData)(f, E, d, S.opts.ownProperties);
      a.setParams({
        property: d,
        depsCount: g.length,
        deps: g.join(", ")
      }), S.allErrors ? f.if(y, () => {
        for (const m of g)
          (0, n.checkReportMissingProp)(a, m);
      }) : (f.if((0, t._)`${y} && (${(0, n.checkMissingProp)(a, g, u)})`), (0, n.reportMissingProp)(a, u), f.else());
    }
  }
  e.validatePropertyDeps = o;
  function l(a, c = a.schema) {
    const { gen: f, data: E, keyword: S, it: u } = a, d = f.name("valid");
    for (const g in c)
      (0, r.alwaysValidSchema)(u, c[g]) || (f.if(
        (0, n.propertyInData)(f, E, g, u.opts.ownProperties),
        () => {
          const y = a.subschema({ keyword: S, schemaProp: g }, d);
          a.mergeValidEvaluated(y, d);
        },
        () => f.var(d, !0)
        // TODO var
      ), a.ok(d));
  }
  e.validateSchemaDeps = l, e.default = i;
})(Nc);
var us = {};
Object.defineProperty(us, "__esModule", { value: !0 });
const Pc = te, lm = q, fm = {
  message: "property name must be valid",
  params: ({ params: e }) => (0, Pc._)`{propertyName: ${e.propertyName}}`
}, um = {
  keyword: "propertyNames",
  type: "object",
  schemaType: ["object", "boolean"],
  error: fm,
  code(e) {
    const { gen: t, schema: r, data: n, it: i } = e;
    if ((0, lm.alwaysValidSchema)(i, r))
      return;
    const s = t.name("valid");
    t.forIn("key", n, (o) => {
      e.setParams({ propertyName: o }), e.subschema({
        keyword: "propertyNames",
        data: o,
        dataTypes: ["string"],
        propertyName: o,
        compositeRule: !0
      }, s), t.if((0, Pc.not)(s), () => {
        e.error(!0), i.allErrors || t.break();
      });
    }), e.ok(s);
  }
};
us.default = um;
var In = {};
Object.defineProperty(In, "__esModule", { value: !0 });
const Kr = re, tt = te, dm = mt, Xr = q, hm = {
  message: "must NOT have additional properties",
  params: ({ params: e }) => (0, tt._)`{additionalProperty: ${e.additionalProperty}}`
}, mm = {
  keyword: "additionalProperties",
  type: ["object"],
  schemaType: ["boolean", "object"],
  allowUndefined: !0,
  trackErrors: !0,
  error: hm,
  code(e) {
    const { gen: t, schema: r, parentSchema: n, data: i, errsCount: s, it: o } = e;
    if (!s)
      throw new Error("ajv implementation error");
    const { allErrors: l, opts: a } = o;
    if (o.props = !0, a.removeAdditional !== "all" && (0, Xr.alwaysValidSchema)(o, r))
      return;
    const c = (0, Kr.allSchemaProperties)(n.properties), f = (0, Kr.allSchemaProperties)(n.patternProperties);
    E(), e.ok((0, tt._)`${s} === ${dm.default.errors}`);
    function E() {
      t.forIn("key", i, (y) => {
        !c.length && !f.length ? d(y) : t.if(S(y), () => d(y));
      });
    }
    function S(y) {
      let m;
      if (c.length > 8) {
        const h = (0, Xr.schemaRefOrVal)(o, n.properties, "properties");
        m = (0, Kr.isOwnProperty)(t, h, y);
      } else c.length ? m = (0, tt.or)(...c.map((h) => (0, tt._)`${y} === ${h}`)) : m = tt.nil;
      return f.length && (m = (0, tt.or)(m, ...f.map((h) => (0, tt._)`${(0, Kr.usePattern)(e, h)}.test(${y})`))), (0, tt.not)(m);
    }
    function u(y) {
      t.code((0, tt._)`delete ${i}[${y}]`);
    }
    function d(y) {
      if (a.removeAdditional === "all" || a.removeAdditional && r === !1) {
        u(y);
        return;
      }
      if (r === !1) {
        e.setParams({ additionalProperty: y }), e.error(), l || t.break();
        return;
      }
      if (typeof r == "object" && !(0, Xr.alwaysValidSchema)(o, r)) {
        const m = t.name("valid");
        a.removeAdditional === "failing" ? (g(y, m, !1), t.if((0, tt.not)(m), () => {
          e.reset(), u(y);
        })) : (g(y, m), l || t.if((0, tt.not)(m), () => t.break()));
      }
    }
    function g(y, m, h) {
      const v = {
        keyword: "additionalProperties",
        dataProp: y,
        dataPropType: Xr.Type.Str
      };
      h === !1 && Object.assign(v, {
        compositeRule: !0,
        createErrors: !1,
        allErrors: !1
      }), e.subschema(v, m);
    }
  }
};
In.default = mm;
var ds = {};
Object.defineProperty(ds, "__esModule", { value: !0 });
const pm = nt, oo = re, qn = q, ao = In, ym = {
  keyword: "properties",
  type: "object",
  schemaType: "object",
  code(e) {
    const { gen: t, schema: r, parentSchema: n, data: i, it: s } = e;
    s.opts.removeAdditional === "all" && n.additionalProperties === void 0 && ao.default.code(new pm.KeywordCxt(s, ao.default, "additionalProperties"));
    const o = (0, oo.allSchemaProperties)(r);
    for (const E of o)
      s.definedProperties.add(E);
    s.opts.unevaluated && o.length && s.props !== !0 && (s.props = qn.mergeEvaluated.props(t, (0, qn.toHash)(o), s.props));
    const l = o.filter((E) => !(0, qn.alwaysValidSchema)(s, r[E]));
    if (l.length === 0)
      return;
    const a = t.name("valid");
    for (const E of l)
      c(E) ? f(E) : (t.if((0, oo.propertyInData)(t, i, E, s.opts.ownProperties)), f(E), s.allErrors || t.else().var(a, !0), t.endIf()), e.it.definedProperties.add(E), e.ok(a);
    function c(E) {
      return s.opts.useDefaults && !s.compositeRule && r[E].default !== void 0;
    }
    function f(E) {
      e.subschema({
        keyword: "properties",
        schemaProp: E,
        dataProp: E
      }, a);
    }
  }
};
ds.default = ym;
var hs = {};
Object.defineProperty(hs, "__esModule", { value: !0 });
const co = re, Zr = te, lo = q, fo = q, Em = {
  keyword: "patternProperties",
  type: "object",
  schemaType: "object",
  code(e) {
    const { gen: t, schema: r, data: n, parentSchema: i, it: s } = e, { opts: o } = s, l = (0, co.allSchemaProperties)(r), a = l.filter((g) => (0, lo.alwaysValidSchema)(s, r[g]));
    if (l.length === 0 || a.length === l.length && (!s.opts.unevaluated || s.props === !0))
      return;
    const c = o.strictSchema && !o.allowMatchingProperties && i.properties, f = t.name("valid");
    s.props !== !0 && !(s.props instanceof Zr.Name) && (s.props = (0, fo.evaluatedPropsToName)(t, s.props));
    const { props: E } = s;
    S();
    function S() {
      for (const g of l)
        c && u(g), s.allErrors ? d(g) : (t.var(f, !0), d(g), t.if(f));
    }
    function u(g) {
      for (const y in c)
        new RegExp(g).test(y) && (0, lo.checkStrictMode)(s, `property ${y} matches pattern ${g} (use allowMatchingProperties)`);
    }
    function d(g) {
      t.forIn("key", n, (y) => {
        t.if((0, Zr._)`${(0, co.usePattern)(e, g)}.test(${y})`, () => {
          const m = a.includes(g);
          m || e.subschema({
            keyword: "patternProperties",
            schemaProp: g,
            dataProp: y,
            dataPropType: fo.Type.Str
          }, f), s.opts.unevaluated && E !== !0 ? t.assign((0, Zr._)`${E}[${y}]`, !0) : !m && !s.allErrors && t.if((0, Zr.not)(f), () => t.break());
        });
      });
    }
  }
};
hs.default = Em;
var ms = {};
Object.defineProperty(ms, "__esModule", { value: !0 });
const gm = q, $m = {
  keyword: "not",
  schemaType: ["object", "boolean"],
  trackErrors: !0,
  code(e) {
    const { gen: t, schema: r, it: n } = e;
    if ((0, gm.alwaysValidSchema)(n, r)) {
      e.fail();
      return;
    }
    const i = t.name("valid");
    e.subschema({
      keyword: "not",
      compositeRule: !0,
      createErrors: !1,
      allErrors: !1
    }, i), e.failResult(i, () => e.reset(), () => e.error());
  },
  error: { message: "must NOT be valid" }
};
ms.default = $m;
var ps = {};
Object.defineProperty(ps, "__esModule", { value: !0 });
const vm = re, _m = {
  keyword: "anyOf",
  schemaType: "array",
  trackErrors: !0,
  code: vm.validateUnion,
  error: { message: "must match a schema in anyOf" }
};
ps.default = _m;
var ys = {};
Object.defineProperty(ys, "__esModule", { value: !0 });
const ln = te, Sm = q, wm = {
  message: "must match exactly one schema in oneOf",
  params: ({ params: e }) => (0, ln._)`{passingSchemas: ${e.passing}}`
}, bm = {
  keyword: "oneOf",
  schemaType: "array",
  trackErrors: !0,
  error: wm,
  code(e) {
    const { gen: t, schema: r, parentSchema: n, it: i } = e;
    if (!Array.isArray(r))
      throw new Error("ajv implementation error");
    if (i.opts.discriminator && n.discriminator)
      return;
    const s = r, o = t.let("valid", !1), l = t.let("passing", null), a = t.name("_valid");
    e.setParams({ passing: l }), t.block(c), e.result(o, () => e.reset(), () => e.error(!0));
    function c() {
      s.forEach((f, E) => {
        let S;
        (0, Sm.alwaysValidSchema)(i, f) ? t.var(a, !0) : S = e.subschema({
          keyword: "oneOf",
          schemaProp: E,
          compositeRule: !0
        }, a), E > 0 && t.if((0, ln._)`${a} && ${o}`).assign(o, !1).assign(l, (0, ln._)`[${l}, ${E}]`).else(), t.if(a, () => {
          t.assign(o, !0), t.assign(l, E), S && e.mergeEvaluated(S, ln.Name);
        });
      });
    }
  }
};
ys.default = bm;
var Es = {};
Object.defineProperty(Es, "__esModule", { value: !0 });
const Om = q, Im = {
  keyword: "allOf",
  schemaType: "array",
  code(e) {
    const { gen: t, schema: r, it: n } = e;
    if (!Array.isArray(r))
      throw new Error("ajv implementation error");
    const i = t.name("valid");
    r.forEach((s, o) => {
      if ((0, Om.alwaysValidSchema)(n, s))
        return;
      const l = e.subschema({ keyword: "allOf", schemaProp: o }, i);
      e.ok(i), e.mergeEvaluated(l);
    });
  }
};
Es.default = Im;
var gs = {};
Object.defineProperty(gs, "__esModule", { value: !0 });
const gn = te, Tc = q, Nm = {
  message: ({ params: e }) => (0, gn.str)`must match "${e.ifClause}" schema`,
  params: ({ params: e }) => (0, gn._)`{failingKeyword: ${e.ifClause}}`
}, Pm = {
  keyword: "if",
  schemaType: ["object", "boolean"],
  trackErrors: !0,
  error: Nm,
  code(e) {
    const { gen: t, parentSchema: r, it: n } = e;
    r.then === void 0 && r.else === void 0 && (0, Tc.checkStrictMode)(n, '"if" without "then" and "else" is ignored');
    const i = uo(n, "then"), s = uo(n, "else");
    if (!i && !s)
      return;
    const o = t.let("valid", !0), l = t.name("_valid");
    if (a(), e.reset(), i && s) {
      const f = t.let("ifClause");
      e.setParams({ ifClause: f }), t.if(l, c("then", f), c("else", f));
    } else i ? t.if(l, c("then")) : t.if((0, gn.not)(l), c("else"));
    e.pass(o, () => e.error(!0));
    function a() {
      const f = e.subschema({
        keyword: "if",
        compositeRule: !0,
        createErrors: !1,
        allErrors: !1
      }, l);
      e.mergeEvaluated(f);
    }
    function c(f, E) {
      return () => {
        const S = e.subschema({ keyword: f }, l);
        t.assign(o, l), e.mergeValidEvaluated(S, o), E ? t.assign(E, (0, gn._)`${f}`) : e.setParams({ ifClause: f });
      };
    }
  }
};
function uo(e, t) {
  const r = e.schema[t];
  return r !== void 0 && !(0, Tc.alwaysValidSchema)(e, r);
}
gs.default = Pm;
var $s = {};
Object.defineProperty($s, "__esModule", { value: !0 });
const Tm = q, Rm = {
  keyword: ["then", "else"],
  schemaType: ["object", "boolean"],
  code({ keyword: e, parentSchema: t, it: r }) {
    t.if === void 0 && (0, Tm.checkStrictMode)(r, `"${e}" without "if" is ignored`);
  }
};
$s.default = Rm;
Object.defineProperty(as, "__esModule", { value: !0 });
const Cm = ar, Dm = cs, Am = cr, Lm = ls, Fm = fs, km = Nc, jm = us, Mm = In, xm = ds, Um = hs, zm = ms, Vm = ps, Gm = ys, Bm = Es, Hm = gs, qm = $s;
function Wm(e = !1) {
  const t = [
    // any
    zm.default,
    Vm.default,
    Gm.default,
    Bm.default,
    Hm.default,
    qm.default,
    // object
    jm.default,
    Mm.default,
    km.default,
    xm.default,
    Um.default
  ];
  return e ? t.push(Dm.default, Lm.default) : t.push(Cm.default, Am.default), t.push(Fm.default), t;
}
as.default = Wm;
var vs = {}, _s = {};
Object.defineProperty(_s, "__esModule", { value: !0 });
const Oe = te, Km = {
  message: ({ schemaCode: e }) => (0, Oe.str)`must match format "${e}"`,
  params: ({ schemaCode: e }) => (0, Oe._)`{format: ${e}}`
}, Xm = {
  keyword: "format",
  type: ["number", "string"],
  schemaType: "string",
  $data: !0,
  error: Km,
  code(e, t) {
    const { gen: r, data: n, $data: i, schema: s, schemaCode: o, it: l } = e, { opts: a, errSchemaPath: c, schemaEnv: f, self: E } = l;
    if (!a.validateFormats)
      return;
    i ? S() : u();
    function S() {
      const d = r.scopeValue("formats", {
        ref: E.formats,
        code: a.code.formats
      }), g = r.const("fDef", (0, Oe._)`${d}[${o}]`), y = r.let("fType"), m = r.let("format");
      r.if((0, Oe._)`typeof ${g} == "object" && !(${g} instanceof RegExp)`, () => r.assign(y, (0, Oe._)`${g}.type || "string"`).assign(m, (0, Oe._)`${g}.validate`), () => r.assign(y, (0, Oe._)`"string"`).assign(m, g)), e.fail$data((0, Oe.or)(h(), v()));
      function h() {
        return a.strictSchema === !1 ? Oe.nil : (0, Oe._)`${o} && !${m}`;
      }
      function v() {
        const O = f.$async ? (0, Oe._)`(${g}.async ? await ${m}(${n}) : ${m}(${n}))` : (0, Oe._)`${m}(${n})`, N = (0, Oe._)`(typeof ${m} == "function" ? ${O} : ${m}.test(${n}))`;
        return (0, Oe._)`${m} && ${m} !== true && ${y} === ${t} && !${N}`;
      }
    }
    function u() {
      const d = E.formats[s];
      if (!d) {
        h();
        return;
      }
      if (d === !0)
        return;
      const [g, y, m] = v(d);
      g === t && e.pass(O());
      function h() {
        if (a.strictSchema === !1) {
          E.logger.warn(N());
          return;
        }
        throw new Error(N());
        function N() {
          return `unknown format "${s}" ignored in schema at path "${c}"`;
        }
      }
      function v(N) {
        const F = N instanceof RegExp ? (0, Oe.regexpCode)(N) : a.code.formats ? (0, Oe._)`${a.code.formats}${(0, Oe.getProperty)(s)}` : void 0, U = r.scopeValue("formats", { key: s, ref: N, code: F });
        return typeof N == "object" && !(N instanceof RegExp) ? [N.type || "string", N.validate, (0, Oe._)`${U}.validate`] : ["string", N, U];
      }
      function O() {
        if (typeof d == "object" && !(d instanceof RegExp) && d.async) {
          if (!f.$async)
            throw new Error("async format in sync schema");
          return (0, Oe._)`await ${m}(${n})`;
        }
        return typeof y == "function" ? (0, Oe._)`${m}(${n})` : (0, Oe._)`${m}.test(${n})`;
      }
    }
  }
};
_s.default = Xm;
Object.defineProperty(vs, "__esModule", { value: !0 });
const Zm = _s, Jm = [Zm.default];
vs.default = Jm;
var rr = {};
Object.defineProperty(rr, "__esModule", { value: !0 });
rr.contentVocabulary = rr.metadataVocabulary = void 0;
rr.metadataVocabulary = [
  "title",
  "description",
  "default",
  "deprecated",
  "readOnly",
  "writeOnly",
  "examples"
];
rr.contentVocabulary = [
  "contentMediaType",
  "contentEncoding",
  "contentSchema"
];
Object.defineProperty(qi, "__esModule", { value: !0 });
const Ym = Wi, Qm = Xi, ep = as, tp = vs, ho = rr, rp = [
  Ym.default,
  Qm.default,
  (0, ep.default)(),
  tp.default,
  ho.metadataVocabulary,
  ho.contentVocabulary
];
qi.default = rp;
var Ss = {}, Nn = {};
Object.defineProperty(Nn, "__esModule", { value: !0 });
Nn.DiscrError = void 0;
var mo;
(function(e) {
  e.Tag = "tag", e.Mapping = "mapping";
})(mo || (Nn.DiscrError = mo = {}));
Object.defineProperty(Ss, "__esModule", { value: !0 });
const Wt = te, di = Nn, po = Xe, np = or, ip = q, sp = {
  message: ({ params: { discrError: e, tagName: t } }) => e === di.DiscrError.Tag ? `tag "${t}" must be string` : `value of tag "${t}" must be in oneOf`,
  params: ({ params: { discrError: e, tag: t, tagName: r } }) => (0, Wt._)`{error: ${e}, tag: ${r}, tagValue: ${t}}`
}, op = {
  keyword: "discriminator",
  type: "object",
  schemaType: "object",
  error: sp,
  code(e) {
    const { gen: t, data: r, schema: n, parentSchema: i, it: s } = e, { oneOf: o } = i;
    if (!s.opts.discriminator)
      throw new Error("discriminator: requires discriminator option");
    const l = n.propertyName;
    if (typeof l != "string")
      throw new Error("discriminator: requires propertyName");
    if (n.mapping)
      throw new Error("discriminator: mapping is not supported");
    if (!o)
      throw new Error("discriminator: requires oneOf keyword");
    const a = t.let("valid", !1), c = t.const("tag", (0, Wt._)`${r}${(0, Wt.getProperty)(l)}`);
    t.if((0, Wt._)`typeof ${c} == "string"`, () => f(), () => e.error(!1, { discrError: di.DiscrError.Tag, tag: c, tagName: l })), e.ok(a);
    function f() {
      const u = S();
      t.if(!1);
      for (const d in u)
        t.elseIf((0, Wt._)`${c} === ${d}`), t.assign(a, E(u[d]));
      t.else(), e.error(!1, { discrError: di.DiscrError.Mapping, tag: c, tagName: l }), t.endIf();
    }
    function E(u) {
      const d = t.name("valid"), g = e.subschema({ keyword: "oneOf", schemaProp: u }, d);
      return e.mergeEvaluated(g, Wt.Name), d;
    }
    function S() {
      var u;
      const d = {}, g = m(i);
      let y = !0;
      for (let O = 0; O < o.length; O++) {
        let N = o[O];
        if (N?.$ref && !(0, ip.schemaHasRulesButRef)(N, s.self.RULES)) {
          const U = N.$ref;
          if (N = po.resolveRef.call(s.self, s.schemaEnv.root, s.baseId, U), N instanceof po.SchemaEnv && (N = N.schema), N === void 0)
            throw new np.default(s.opts.uriResolver, s.baseId, U);
        }
        const F = (u = N?.properties) === null || u === void 0 ? void 0 : u[l];
        if (typeof F != "object")
          throw new Error(`discriminator: oneOf subschemas (or referenced schemas) must have "properties/${l}"`);
        y = y && (g || m(N)), h(F, O);
      }
      if (!y)
        throw new Error(`discriminator: "${l}" must be required`);
      return d;
      function m({ required: O }) {
        return Array.isArray(O) && O.includes(l);
      }
      function h(O, N) {
        if (O.const)
          v(O.const, N);
        else if (O.enum)
          for (const F of O.enum)
            v(F, N);
        else
          throw new Error(`discriminator: "properties/${l}" must have "const" or "enum"`);
      }
      function v(O, N) {
        if (typeof O != "string" || O in d)
          throw new Error(`discriminator: "${l}" values must be unique strings`);
        d[O] = N;
      }
    }
  }
};
Ss.default = op;
const ap = "http://json-schema.org/draft-07/schema#", cp = "http://json-schema.org/draft-07/schema#", lp = "Core schema meta-schema", fp = {
  schemaArray: {
    type: "array",
    minItems: 1,
    items: {
      $ref: "#"
    }
  },
  nonNegativeInteger: {
    type: "integer",
    minimum: 0
  },
  nonNegativeIntegerDefault0: {
    allOf: [
      {
        $ref: "#/definitions/nonNegativeInteger"
      },
      {
        default: 0
      }
    ]
  },
  simpleTypes: {
    enum: [
      "array",
      "boolean",
      "integer",
      "null",
      "number",
      "object",
      "string"
    ]
  },
  stringArray: {
    type: "array",
    items: {
      type: "string"
    },
    uniqueItems: !0,
    default: []
  }
}, up = [
  "object",
  "boolean"
], dp = {
  $id: {
    type: "string",
    format: "uri-reference"
  },
  $schema: {
    type: "string",
    format: "uri"
  },
  $ref: {
    type: "string",
    format: "uri-reference"
  },
  $comment: {
    type: "string"
  },
  title: {
    type: "string"
  },
  description: {
    type: "string"
  },
  default: !0,
  readOnly: {
    type: "boolean",
    default: !1
  },
  examples: {
    type: "array",
    items: !0
  },
  multipleOf: {
    type: "number",
    exclusiveMinimum: 0
  },
  maximum: {
    type: "number"
  },
  exclusiveMaximum: {
    type: "number"
  },
  minimum: {
    type: "number"
  },
  exclusiveMinimum: {
    type: "number"
  },
  maxLength: {
    $ref: "#/definitions/nonNegativeInteger"
  },
  minLength: {
    $ref: "#/definitions/nonNegativeIntegerDefault0"
  },
  pattern: {
    type: "string",
    format: "regex"
  },
  additionalItems: {
    $ref: "#"
  },
  items: {
    anyOf: [
      {
        $ref: "#"
      },
      {
        $ref: "#/definitions/schemaArray"
      }
    ],
    default: !0
  },
  maxItems: {
    $ref: "#/definitions/nonNegativeInteger"
  },
  minItems: {
    $ref: "#/definitions/nonNegativeIntegerDefault0"
  },
  uniqueItems: {
    type: "boolean",
    default: !1
  },
  contains: {
    $ref: "#"
  },
  maxProperties: {
    $ref: "#/definitions/nonNegativeInteger"
  },
  minProperties: {
    $ref: "#/definitions/nonNegativeIntegerDefault0"
  },
  required: {
    $ref: "#/definitions/stringArray"
  },
  additionalProperties: {
    $ref: "#"
  },
  definitions: {
    type: "object",
    additionalProperties: {
      $ref: "#"
    },
    default: {}
  },
  properties: {
    type: "object",
    additionalProperties: {
      $ref: "#"
    },
    default: {}
  },
  patternProperties: {
    type: "object",
    additionalProperties: {
      $ref: "#"
    },
    propertyNames: {
      format: "regex"
    },
    default: {}
  },
  dependencies: {
    type: "object",
    additionalProperties: {
      anyOf: [
        {
          $ref: "#"
        },
        {
          $ref: "#/definitions/stringArray"
        }
      ]
    }
  },
  propertyNames: {
    $ref: "#"
  },
  const: !0,
  enum: {
    type: "array",
    items: !0,
    minItems: 1,
    uniqueItems: !0
  },
  type: {
    anyOf: [
      {
        $ref: "#/definitions/simpleTypes"
      },
      {
        type: "array",
        items: {
          $ref: "#/definitions/simpleTypes"
        },
        minItems: 1,
        uniqueItems: !0
      }
    ]
  },
  format: {
    type: "string"
  },
  contentMediaType: {
    type: "string"
  },
  contentEncoding: {
    type: "string"
  },
  if: {
    $ref: "#"
  },
  then: {
    $ref: "#"
  },
  else: {
    $ref: "#"
  },
  allOf: {
    $ref: "#/definitions/schemaArray"
  },
  anyOf: {
    $ref: "#/definitions/schemaArray"
  },
  oneOf: {
    $ref: "#/definitions/schemaArray"
  },
  not: {
    $ref: "#"
  }
}, hp = {
  $schema: ap,
  $id: cp,
  title: lp,
  definitions: fp,
  type: up,
  properties: dp,
  default: !0
};
(function(e, t) {
  Object.defineProperty(t, "__esModule", { value: !0 }), t.MissingRefError = t.ValidationError = t.CodeGen = t.Name = t.nil = t.stringify = t.str = t._ = t.KeywordCxt = t.Ajv = void 0;
  const r = La, n = qi, i = Ss, s = hp, o = ["/properties"], l = "http://json-schema.org/draft-07/schema";
  class a extends r.default {
    _addVocabularies() {
      super._addVocabularies(), n.default.forEach((d) => this.addVocabulary(d)), this.opts.discriminator && this.addKeyword(i.default);
    }
    _addDefaultMetaSchema() {
      if (super._addDefaultMetaSchema(), !this.opts.meta)
        return;
      const d = this.opts.$data ? this.$dataMetaSchema(s, o) : s;
      this.addMetaSchema(d, l, !1), this.refs["http://json-schema.org/schema"] = l;
    }
    defaultMeta() {
      return this.opts.defaultMeta = super.defaultMeta() || (this.getSchema(l) ? l : void 0);
    }
  }
  t.Ajv = a, e.exports = t = a, e.exports.Ajv = a, Object.defineProperty(t, "__esModule", { value: !0 }), t.default = a;
  var c = nt;
  Object.defineProperty(t, "KeywordCxt", { enumerable: !0, get: function() {
    return c.KeywordCxt;
  } });
  var f = te;
  Object.defineProperty(t, "_", { enumerable: !0, get: function() {
    return f._;
  } }), Object.defineProperty(t, "str", { enumerable: !0, get: function() {
    return f.str;
  } }), Object.defineProperty(t, "stringify", { enumerable: !0, get: function() {
    return f.stringify;
  } }), Object.defineProperty(t, "nil", { enumerable: !0, get: function() {
    return f.nil;
  } }), Object.defineProperty(t, "Name", { enumerable: !0, get: function() {
    return f.Name;
  } }), Object.defineProperty(t, "CodeGen", { enumerable: !0, get: function() {
    return f.CodeGen;
  } });
  var E = jr;
  Object.defineProperty(t, "ValidationError", { enumerable: !0, get: function() {
    return E.default;
  } });
  var S = or;
  Object.defineProperty(t, "MissingRefError", { enumerable: !0, get: function() {
    return S.default;
  } });
})(ii, ii.exports);
var Rc = ii.exports, hi = { exports: {} }, Cc = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.formatNames = e.fastFormats = e.fullFormats = void 0;
  function t(P, A) {
    return { validate: P, compare: A };
  }
  e.fullFormats = {
    // date: http://tools.ietf.org/html/rfc3339#section-5.6
    date: t(s, o),
    // date-time: http://tools.ietf.org/html/rfc3339#section-5.6
    time: t(a, c),
    "date-time": t(E, S),
    // duration: https://tools.ietf.org/html/rfc3339#appendix-A
    duration: /^P(?!$)((\d+Y)?(\d+M)?(\d+D)?(T(?=\d)(\d+H)?(\d+M)?(\d+S)?)?|(\d+W)?)$/,
    uri: g,
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
    regex: R,
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
    byte: m,
    // signed 32 bit integer
    int32: { type: "number", validate: O },
    // signed 64 bit integer
    int64: { type: "number", validate: N },
    // C-type float
    float: { type: "number", validate: F },
    // C-type double
    double: { type: "number", validate: F },
    // hint to the UI to hide input strings
    password: !0,
    // unchecked string payload
    binary: !0
  }, e.fastFormats = {
    ...e.fullFormats,
    date: t(/^\d\d\d\d-[0-1]\d-[0-3]\d$/, o),
    time: t(/^(?:[0-2]\d:[0-5]\d:[0-5]\d|23:59:60)(?:\.\d+)?(?:z|[+-]\d\d(?::?\d\d)?)?$/i, c),
    "date-time": t(/^\d\d\d\d-[0-1]\d-[0-3]\d[t\s](?:[0-2]\d:[0-5]\d:[0-5]\d|23:59:60)(?:\.\d+)?(?:z|[+-]\d\d(?::?\d\d)?)$/i, S),
    // uri: https://github.com/mafintosh/is-my-json-valid/blob/master/formats.js
    uri: /^(?:[a-z][a-z0-9+\-.]*:)(?:\/?\/)?[^\s]*$/i,
    "uri-reference": /^(?:(?:[a-z][a-z0-9+\-.]*:)?\/?\/)?(?:[^\\\s#][^\s#]*)?(?:#[^\\\s]*)?$/i,
    // email (sources from jsen validator):
    // http://stackoverflow.com/questions/201323/using-a-regular-expression-to-validate-an-email-address#answer-8829363
    // http://www.w3.org/TR/html5/forms.html#valid-e-mail-address (search for 'wilful violation')
    email: /^[a-z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?)*$/i
  }, e.formatNames = Object.keys(e.fullFormats);
  function r(P) {
    return P % 4 === 0 && (P % 100 !== 0 || P % 400 === 0);
  }
  const n = /^(\d\d\d\d)-(\d\d)-(\d\d)$/, i = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  function s(P) {
    const A = n.exec(P);
    if (!A)
      return !1;
    const x = +A[1], W = +A[2], J = +A[3];
    return W >= 1 && W <= 12 && J >= 1 && J <= (W === 2 && r(x) ? 29 : i[W]);
  }
  function o(P, A) {
    if (P && A)
      return P > A ? 1 : P < A ? -1 : 0;
  }
  const l = /^(\d\d):(\d\d):(\d\d)(\.\d+)?(z|[+-]\d\d(?::?\d\d)?)?$/i;
  function a(P, A) {
    const x = l.exec(P);
    if (!x)
      return !1;
    const W = +x[1], J = +x[2], k = +x[3], L = x[5];
    return (W <= 23 && J <= 59 && k <= 59 || W === 23 && J === 59 && k === 60) && (!A || L !== "");
  }
  function c(P, A) {
    if (!(P && A))
      return;
    const x = l.exec(P), W = l.exec(A);
    if (x && W)
      return P = x[1] + x[2] + x[3] + (x[4] || ""), A = W[1] + W[2] + W[3] + (W[4] || ""), P > A ? 1 : P < A ? -1 : 0;
  }
  const f = /t|\s/i;
  function E(P) {
    const A = P.split(f);
    return A.length === 2 && s(A[0]) && a(A[1], !0);
  }
  function S(P, A) {
    if (!(P && A))
      return;
    const [x, W] = P.split(f), [J, k] = A.split(f), L = o(x, J);
    if (L !== void 0)
      return L || c(W, k);
  }
  const u = /\/|:/, d = /^(?:[a-z][a-z0-9+\-.]*:)(?:\/?\/(?:(?:[a-z0-9\-._~!$&'()*+,;=:]|%[0-9a-f]{2})*@)?(?:\[(?:(?:(?:(?:[0-9a-f]{1,4}:){6}|::(?:[0-9a-f]{1,4}:){5}|(?:[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){4}|(?:(?:[0-9a-f]{1,4}:){0,1}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){3}|(?:(?:[0-9a-f]{1,4}:){0,2}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){2}|(?:(?:[0-9a-f]{1,4}:){0,3}[0-9a-f]{1,4})?::[0-9a-f]{1,4}:|(?:(?:[0-9a-f]{1,4}:){0,4}[0-9a-f]{1,4})?::)(?:[0-9a-f]{1,4}:[0-9a-f]{1,4}|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?))|(?:(?:[0-9a-f]{1,4}:){0,5}[0-9a-f]{1,4})?::[0-9a-f]{1,4}|(?:(?:[0-9a-f]{1,4}:){0,6}[0-9a-f]{1,4})?::)|[Vv][0-9a-f]+\.[a-z0-9\-._~!$&'()*+,;=:]+)\]|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)|(?:[a-z0-9\-._~!$&'()*+,;=]|%[0-9a-f]{2})*)(?::\d*)?(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*|\/(?:(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*)?|(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*)(?:\?(?:[a-z0-9\-._~!$&'()*+,;=:@/?]|%[0-9a-f]{2})*)?(?:#(?:[a-z0-9\-._~!$&'()*+,;=:@/?]|%[0-9a-f]{2})*)?$/i;
  function g(P) {
    return u.test(P) && d.test(P);
  }
  const y = /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/gm;
  function m(P) {
    return y.lastIndex = 0, y.test(P);
  }
  const h = -(2 ** 31), v = 2 ** 31 - 1;
  function O(P) {
    return Number.isInteger(P) && P <= v && P >= h;
  }
  function N(P) {
    return Number.isInteger(P);
  }
  function F() {
    return !0;
  }
  const U = /[^\\]\\Z/;
  function R(P) {
    if (U.test(P))
      return !1;
    try {
      return new RegExp(P), !0;
    } catch {
      return !1;
    }
  }
})(Cc);
var Dc = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.formatLimitDefinition = void 0;
  const t = Rc, r = te, n = r.operators, i = {
    formatMaximum: { okStr: "<=", ok: n.LTE, fail: n.GT },
    formatMinimum: { okStr: ">=", ok: n.GTE, fail: n.LT },
    formatExclusiveMaximum: { okStr: "<", ok: n.LT, fail: n.GTE },
    formatExclusiveMinimum: { okStr: ">", ok: n.GT, fail: n.LTE }
  }, s = {
    message: ({ keyword: l, schemaCode: a }) => r.str`should be ${i[l].okStr} ${a}`,
    params: ({ keyword: l, schemaCode: a }) => r._`{comparison: ${i[l].okStr}, limit: ${a}}`
  };
  e.formatLimitDefinition = {
    keyword: Object.keys(i),
    type: "string",
    schemaType: "string",
    $data: !0,
    error: s,
    code(l) {
      const { gen: a, data: c, schemaCode: f, keyword: E, it: S } = l, { opts: u, self: d } = S;
      if (!u.validateFormats)
        return;
      const g = new t.KeywordCxt(S, d.RULES.all.format.definition, "format");
      g.$data ? y() : m();
      function y() {
        const v = a.scopeValue("formats", {
          ref: d.formats,
          code: u.code.formats
        }), O = a.const("fmt", r._`${v}[${g.schemaCode}]`);
        l.fail$data(r.or(r._`typeof ${O} != "object"`, r._`${O} instanceof RegExp`, r._`typeof ${O}.compare != "function"`, h(O)));
      }
      function m() {
        const v = g.schema, O = d.formats[v];
        if (!O || O === !0)
          return;
        if (typeof O != "object" || O instanceof RegExp || typeof O.compare != "function")
          throw new Error(`"${E}": format "${v}" does not define "compare" function`);
        const N = a.scopeValue("formats", {
          key: v,
          ref: O,
          code: u.code.formats ? r._`${u.code.formats}${r.getProperty(v)}` : void 0
        });
        l.fail$data(h(N));
      }
      function h(v) {
        return r._`${v}.compare(${c}, ${f}) ${i[E].fail} 0`;
      }
    },
    dependencies: ["format"]
  };
  const o = (l) => (l.addKeyword(e.formatLimitDefinition), l);
  e.default = o;
})(Dc);
(function(e, t) {
  Object.defineProperty(t, "__esModule", { value: !0 });
  const r = Cc, n = Dc, i = te, s = new i.Name("fullFormats"), o = new i.Name("fastFormats"), l = (c, f = { keywords: !0 }) => {
    if (Array.isArray(f))
      return a(c, f, r.fullFormats, s), c;
    const [E, S] = f.mode === "fast" ? [r.fastFormats, o] : [r.fullFormats, s], u = f.formats || r.formatNames;
    return a(c, u, E, S), f.keywords && n.default(c), c;
  };
  l.get = (c, f = "full") => {
    const S = (f === "fast" ? r.fastFormats : r.fullFormats)[c];
    if (!S)
      throw new Error(`Unknown format "${c}"`);
    return S;
  };
  function a(c, f, E, S) {
    var u, d;
    (u = (d = c.opts.code).formats) !== null && u !== void 0 || (d.formats = i._`require("ajv-formats/dist/formats").${S}`);
    for (const g of f)
      c.addFormat(g, E[g]);
  }
  e.exports = t = l, Object.defineProperty(t, "__esModule", { value: !0 }), t.default = l;
})(hi, hi.exports);
var mp = hi.exports;
const pp = (e, t, r, n) => {
  if (r === "length" || r === "prototype" || r === "arguments" || r === "caller")
    return;
  const i = Object.getOwnPropertyDescriptor(e, r), s = Object.getOwnPropertyDescriptor(t, r);
  !yp(i, s) && n || Object.defineProperty(e, r, s);
}, yp = function(e, t) {
  return e === void 0 || e.configurable || e.writable === t.writable && e.enumerable === t.enumerable && e.configurable === t.configurable && (e.writable || e.value === t.value);
}, Ep = (e, t) => {
  const r = Object.getPrototypeOf(t);
  r !== Object.getPrototypeOf(e) && Object.setPrototypeOf(e, r);
}, gp = (e, t) => `/* Wrapped ${e}*/
${t}`, $p = Object.getOwnPropertyDescriptor(Function.prototype, "toString"), vp = Object.getOwnPropertyDescriptor(Function.prototype.toString, "name"), _p = (e, t, r) => {
  const n = r === "" ? "" : `with ${r.trim()}() `, i = gp.bind(null, n, t.toString());
  Object.defineProperty(i, "name", vp), Object.defineProperty(e, "toString", { ...$p, value: i });
}, Sp = (e, t, { ignoreNonConfigurable: r = !1 } = {}) => {
  const { name: n } = e;
  for (const i of Reflect.ownKeys(t))
    pp(e, t, i, r);
  return Ep(e, t), _p(e, t, n), e;
};
var wp = Sp;
const bp = wp;
var Op = (e, t = {}) => {
  if (typeof e != "function")
    throw new TypeError(`Expected the first argument to be a function, got \`${typeof e}\``);
  const {
    wait: r = 0,
    before: n = !1,
    after: i = !0
  } = t;
  if (!n && !i)
    throw new Error("Both `before` and `after` are false, function wouldn't be called.");
  let s, o;
  const l = function(...a) {
    const c = this, f = () => {
      s = void 0, i && (o = e.apply(c, a));
    }, E = n && !s;
    return clearTimeout(s), s = setTimeout(f, r), E && (o = e.apply(c, a)), o;
  };
  return bp(l, e), l.cancel = () => {
    s && (clearTimeout(s), s = void 0);
  }, l;
}, mi = { exports: {} };
const Ip = "2.0.0", Ac = 256, Np = Number.MAX_SAFE_INTEGER || /* istanbul ignore next */
9007199254740991, Pp = 16, Tp = Ac - 6, Rp = [
  "major",
  "premajor",
  "minor",
  "preminor",
  "patch",
  "prepatch",
  "prerelease"
];
var Pn = {
  MAX_LENGTH: Ac,
  MAX_SAFE_COMPONENT_LENGTH: Pp,
  MAX_SAFE_BUILD_LENGTH: Tp,
  MAX_SAFE_INTEGER: Np,
  RELEASE_TYPES: Rp,
  SEMVER_SPEC_VERSION: Ip,
  FLAG_INCLUDE_PRERELEASE: 1,
  FLAG_LOOSE: 2
};
const Cp = typeof process == "object" && process.env && process.env.NODE_DEBUG && /\bsemver\b/i.test(process.env.NODE_DEBUG) ? (...e) => console.error("SEMVER", ...e) : () => {
};
var Tn = Cp;
(function(e, t) {
  const {
    MAX_SAFE_COMPONENT_LENGTH: r,
    MAX_SAFE_BUILD_LENGTH: n,
    MAX_LENGTH: i
  } = Pn, s = Tn;
  t = e.exports = {};
  const o = t.re = [], l = t.safeRe = [], a = t.src = [], c = t.t = {};
  let f = 0;
  const E = "[a-zA-Z0-9-]", S = [
    ["\\s", 1],
    ["\\d", i],
    [E, n]
  ], u = (g) => {
    for (const [y, m] of S)
      g = g.split(`${y}*`).join(`${y}{0,${m}}`).split(`${y}+`).join(`${y}{1,${m}}`);
    return g;
  }, d = (g, y, m) => {
    const h = u(y), v = f++;
    s(g, v, y), c[g] = v, a[v] = y, o[v] = new RegExp(y, m ? "g" : void 0), l[v] = new RegExp(h, m ? "g" : void 0);
  };
  d("NUMERICIDENTIFIER", "0|[1-9]\\d*"), d("NUMERICIDENTIFIERLOOSE", "\\d+"), d("NONNUMERICIDENTIFIER", `\\d*[a-zA-Z-]${E}*`), d("MAINVERSION", `(${a[c.NUMERICIDENTIFIER]})\\.(${a[c.NUMERICIDENTIFIER]})\\.(${a[c.NUMERICIDENTIFIER]})`), d("MAINVERSIONLOOSE", `(${a[c.NUMERICIDENTIFIERLOOSE]})\\.(${a[c.NUMERICIDENTIFIERLOOSE]})\\.(${a[c.NUMERICIDENTIFIERLOOSE]})`), d("PRERELEASEIDENTIFIER", `(?:${a[c.NUMERICIDENTIFIER]}|${a[c.NONNUMERICIDENTIFIER]})`), d("PRERELEASEIDENTIFIERLOOSE", `(?:${a[c.NUMERICIDENTIFIERLOOSE]}|${a[c.NONNUMERICIDENTIFIER]})`), d("PRERELEASE", `(?:-(${a[c.PRERELEASEIDENTIFIER]}(?:\\.${a[c.PRERELEASEIDENTIFIER]})*))`), d("PRERELEASELOOSE", `(?:-?(${a[c.PRERELEASEIDENTIFIERLOOSE]}(?:\\.${a[c.PRERELEASEIDENTIFIERLOOSE]})*))`), d("BUILDIDENTIFIER", `${E}+`), d("BUILD", `(?:\\+(${a[c.BUILDIDENTIFIER]}(?:\\.${a[c.BUILDIDENTIFIER]})*))`), d("FULLPLAIN", `v?${a[c.MAINVERSION]}${a[c.PRERELEASE]}?${a[c.BUILD]}?`), d("FULL", `^${a[c.FULLPLAIN]}$`), d("LOOSEPLAIN", `[v=\\s]*${a[c.MAINVERSIONLOOSE]}${a[c.PRERELEASELOOSE]}?${a[c.BUILD]}?`), d("LOOSE", `^${a[c.LOOSEPLAIN]}$`), d("GTLT", "((?:<|>)?=?)"), d("XRANGEIDENTIFIERLOOSE", `${a[c.NUMERICIDENTIFIERLOOSE]}|x|X|\\*`), d("XRANGEIDENTIFIER", `${a[c.NUMERICIDENTIFIER]}|x|X|\\*`), d("XRANGEPLAIN", `[v=\\s]*(${a[c.XRANGEIDENTIFIER]})(?:\\.(${a[c.XRANGEIDENTIFIER]})(?:\\.(${a[c.XRANGEIDENTIFIER]})(?:${a[c.PRERELEASE]})?${a[c.BUILD]}?)?)?`), d("XRANGEPLAINLOOSE", `[v=\\s]*(${a[c.XRANGEIDENTIFIERLOOSE]})(?:\\.(${a[c.XRANGEIDENTIFIERLOOSE]})(?:\\.(${a[c.XRANGEIDENTIFIERLOOSE]})(?:${a[c.PRERELEASELOOSE]})?${a[c.BUILD]}?)?)?`), d("XRANGE", `^${a[c.GTLT]}\\s*${a[c.XRANGEPLAIN]}$`), d("XRANGELOOSE", `^${a[c.GTLT]}\\s*${a[c.XRANGEPLAINLOOSE]}$`), d("COERCEPLAIN", `(^|[^\\d])(\\d{1,${r}})(?:\\.(\\d{1,${r}}))?(?:\\.(\\d{1,${r}}))?`), d("COERCE", `${a[c.COERCEPLAIN]}(?:$|[^\\d])`), d("COERCEFULL", a[c.COERCEPLAIN] + `(?:${a[c.PRERELEASE]})?(?:${a[c.BUILD]})?(?:$|[^\\d])`), d("COERCERTL", a[c.COERCE], !0), d("COERCERTLFULL", a[c.COERCEFULL], !0), d("LONETILDE", "(?:~>?)"), d("TILDETRIM", `(\\s*)${a[c.LONETILDE]}\\s+`, !0), t.tildeTrimReplace = "$1~", d("TILDE", `^${a[c.LONETILDE]}${a[c.XRANGEPLAIN]}$`), d("TILDELOOSE", `^${a[c.LONETILDE]}${a[c.XRANGEPLAINLOOSE]}$`), d("LONECARET", "(?:\\^)"), d("CARETTRIM", `(\\s*)${a[c.LONECARET]}\\s+`, !0), t.caretTrimReplace = "$1^", d("CARET", `^${a[c.LONECARET]}${a[c.XRANGEPLAIN]}$`), d("CARETLOOSE", `^${a[c.LONECARET]}${a[c.XRANGEPLAINLOOSE]}$`), d("COMPARATORLOOSE", `^${a[c.GTLT]}\\s*(${a[c.LOOSEPLAIN]})$|^$`), d("COMPARATOR", `^${a[c.GTLT]}\\s*(${a[c.FULLPLAIN]})$|^$`), d("COMPARATORTRIM", `(\\s*)${a[c.GTLT]}\\s*(${a[c.LOOSEPLAIN]}|${a[c.XRANGEPLAIN]})`, !0), t.comparatorTrimReplace = "$1$2$3", d("HYPHENRANGE", `^\\s*(${a[c.XRANGEPLAIN]})\\s+-\\s+(${a[c.XRANGEPLAIN]})\\s*$`), d("HYPHENRANGELOOSE", `^\\s*(${a[c.XRANGEPLAINLOOSE]})\\s+-\\s+(${a[c.XRANGEPLAINLOOSE]})\\s*$`), d("STAR", "(<|>)?=?\\s*\\*"), d("GTE0", "^\\s*>=\\s*0\\.0\\.0\\s*$"), d("GTE0PRE", "^\\s*>=\\s*0\\.0\\.0-0\\s*$");
})(mi, mi.exports);
var xr = mi.exports;
const Dp = Object.freeze({ loose: !0 }), Ap = Object.freeze({}), Lp = (e) => e ? typeof e != "object" ? Dp : e : Ap;
var ws = Lp;
const yo = /^[0-9]+$/, Lc = (e, t) => {
  const r = yo.test(e), n = yo.test(t);
  return r && n && (e = +e, t = +t), e === t ? 0 : r && !n ? -1 : n && !r ? 1 : e < t ? -1 : 1;
}, Fp = (e, t) => Lc(t, e);
var Fc = {
  compareIdentifiers: Lc,
  rcompareIdentifiers: Fp
};
const Jr = Tn, { MAX_LENGTH: Eo, MAX_SAFE_INTEGER: Yr } = Pn, { safeRe: go, t: $o } = xr, kp = ws, { compareIdentifiers: Ht } = Fc;
let jp = class at {
  constructor(t, r) {
    if (r = kp(r), t instanceof at) {
      if (t.loose === !!r.loose && t.includePrerelease === !!r.includePrerelease)
        return t;
      t = t.version;
    } else if (typeof t != "string")
      throw new TypeError(`Invalid version. Must be a string. Got type "${typeof t}".`);
    if (t.length > Eo)
      throw new TypeError(
        `version is longer than ${Eo} characters`
      );
    Jr("SemVer", t, r), this.options = r, this.loose = !!r.loose, this.includePrerelease = !!r.includePrerelease;
    const n = t.trim().match(r.loose ? go[$o.LOOSE] : go[$o.FULL]);
    if (!n)
      throw new TypeError(`Invalid Version: ${t}`);
    if (this.raw = t, this.major = +n[1], this.minor = +n[2], this.patch = +n[3], this.major > Yr || this.major < 0)
      throw new TypeError("Invalid major version");
    if (this.minor > Yr || this.minor < 0)
      throw new TypeError("Invalid minor version");
    if (this.patch > Yr || this.patch < 0)
      throw new TypeError("Invalid patch version");
    n[4] ? this.prerelease = n[4].split(".").map((i) => {
      if (/^[0-9]+$/.test(i)) {
        const s = +i;
        if (s >= 0 && s < Yr)
          return s;
      }
      return i;
    }) : this.prerelease = [], this.build = n[5] ? n[5].split(".") : [], this.format();
  }
  format() {
    return this.version = `${this.major}.${this.minor}.${this.patch}`, this.prerelease.length && (this.version += `-${this.prerelease.join(".")}`), this.version;
  }
  toString() {
    return this.version;
  }
  compare(t) {
    if (Jr("SemVer.compare", this.version, this.options, t), !(t instanceof at)) {
      if (typeof t == "string" && t === this.version)
        return 0;
      t = new at(t, this.options);
    }
    return t.version === this.version ? 0 : this.compareMain(t) || this.comparePre(t);
  }
  compareMain(t) {
    return t instanceof at || (t = new at(t, this.options)), Ht(this.major, t.major) || Ht(this.minor, t.minor) || Ht(this.patch, t.patch);
  }
  comparePre(t) {
    if (t instanceof at || (t = new at(t, this.options)), this.prerelease.length && !t.prerelease.length)
      return -1;
    if (!this.prerelease.length && t.prerelease.length)
      return 1;
    if (!this.prerelease.length && !t.prerelease.length)
      return 0;
    let r = 0;
    do {
      const n = this.prerelease[r], i = t.prerelease[r];
      if (Jr("prerelease compare", r, n, i), n === void 0 && i === void 0)
        return 0;
      if (i === void 0)
        return 1;
      if (n === void 0)
        return -1;
      if (n === i)
        continue;
      return Ht(n, i);
    } while (++r);
  }
  compareBuild(t) {
    t instanceof at || (t = new at(t, this.options));
    let r = 0;
    do {
      const n = this.build[r], i = t.build[r];
      if (Jr("build compare", r, n, i), n === void 0 && i === void 0)
        return 0;
      if (i === void 0)
        return 1;
      if (n === void 0)
        return -1;
      if (n === i)
        continue;
      return Ht(n, i);
    } while (++r);
  }
  // preminor will bump the version up to the next minor release, and immediately
  // down to pre-release. premajor and prepatch work the same way.
  inc(t, r, n) {
    switch (t) {
      case "premajor":
        this.prerelease.length = 0, this.patch = 0, this.minor = 0, this.major++, this.inc("pre", r, n);
        break;
      case "preminor":
        this.prerelease.length = 0, this.patch = 0, this.minor++, this.inc("pre", r, n);
        break;
      case "prepatch":
        this.prerelease.length = 0, this.inc("patch", r, n), this.inc("pre", r, n);
        break;
      case "prerelease":
        this.prerelease.length === 0 && this.inc("patch", r, n), this.inc("pre", r, n);
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
      case "pre": {
        const i = Number(n) ? 1 : 0;
        if (!r && n === !1)
          throw new Error("invalid increment argument: identifier is empty");
        if (this.prerelease.length === 0)
          this.prerelease = [i];
        else {
          let s = this.prerelease.length;
          for (; --s >= 0; )
            typeof this.prerelease[s] == "number" && (this.prerelease[s]++, s = -2);
          if (s === -1) {
            if (r === this.prerelease.join(".") && n === !1)
              throw new Error("invalid increment argument: identifier already exists");
            this.prerelease.push(i);
          }
        }
        if (r) {
          let s = [r, i];
          n === !1 && (s = [r]), Ht(this.prerelease[0], r) === 0 ? isNaN(this.prerelease[1]) && (this.prerelease = s) : this.prerelease = s;
        }
        break;
      }
      default:
        throw new Error(`invalid increment argument: ${t}`);
    }
    return this.raw = this.format(), this.build.length && (this.raw += `+${this.build.join(".")}`), this;
  }
};
var Be = jp;
const vo = Be, Mp = (e, t, r = !1) => {
  if (e instanceof vo)
    return e;
  try {
    return new vo(e, t);
  } catch (n) {
    if (!r)
      return null;
    throw n;
  }
};
var lr = Mp;
const xp = lr, Up = (e, t) => {
  const r = xp(e, t);
  return r ? r.version : null;
};
var zp = Up;
const Vp = lr, Gp = (e, t) => {
  const r = Vp(e.trim().replace(/^[=v]+/, ""), t);
  return r ? r.version : null;
};
var Bp = Gp;
const _o = Be, Hp = (e, t, r, n, i) => {
  typeof r == "string" && (i = n, n = r, r = void 0);
  try {
    return new _o(
      e instanceof _o ? e.version : e,
      r
    ).inc(t, n, i).version;
  } catch {
    return null;
  }
};
var qp = Hp;
const So = lr, Wp = (e, t) => {
  const r = So(e, null, !0), n = So(t, null, !0), i = r.compare(n);
  if (i === 0)
    return null;
  const s = i > 0, o = s ? r : n, l = s ? n : r, a = !!o.prerelease.length;
  if (!!l.prerelease.length && !a)
    return !l.patch && !l.minor ? "major" : o.patch ? "patch" : o.minor ? "minor" : "major";
  const f = a ? "pre" : "";
  return r.major !== n.major ? f + "major" : r.minor !== n.minor ? f + "minor" : r.patch !== n.patch ? f + "patch" : "prerelease";
};
var Kp = Wp;
const Xp = Be, Zp = (e, t) => new Xp(e, t).major;
var Jp = Zp;
const Yp = Be, Qp = (e, t) => new Yp(e, t).minor;
var ey = Qp;
const ty = Be, ry = (e, t) => new ty(e, t).patch;
var ny = ry;
const iy = lr, sy = (e, t) => {
  const r = iy(e, t);
  return r && r.prerelease.length ? r.prerelease : null;
};
var oy = sy;
const wo = Be, ay = (e, t, r) => new wo(e, r).compare(new wo(t, r));
var it = ay;
const cy = it, ly = (e, t, r) => cy(t, e, r);
var fy = ly;
const uy = it, dy = (e, t) => uy(e, t, !0);
var hy = dy;
const bo = Be, my = (e, t, r) => {
  const n = new bo(e, r), i = new bo(t, r);
  return n.compare(i) || n.compareBuild(i);
};
var bs = my;
const py = bs, yy = (e, t) => e.sort((r, n) => py(r, n, t));
var Ey = yy;
const gy = bs, $y = (e, t) => e.sort((r, n) => gy(n, r, t));
var vy = $y;
const _y = it, Sy = (e, t, r) => _y(e, t, r) > 0;
var Rn = Sy;
const wy = it, by = (e, t, r) => wy(e, t, r) < 0;
var Os = by;
const Oy = it, Iy = (e, t, r) => Oy(e, t, r) === 0;
var kc = Iy;
const Ny = it, Py = (e, t, r) => Ny(e, t, r) !== 0;
var jc = Py;
const Ty = it, Ry = (e, t, r) => Ty(e, t, r) >= 0;
var Is = Ry;
const Cy = it, Dy = (e, t, r) => Cy(e, t, r) <= 0;
var Ns = Dy;
const Ay = kc, Ly = jc, Fy = Rn, ky = Is, jy = Os, My = Ns, xy = (e, t, r, n) => {
  switch (t) {
    case "===":
      return typeof e == "object" && (e = e.version), typeof r == "object" && (r = r.version), e === r;
    case "!==":
      return typeof e == "object" && (e = e.version), typeof r == "object" && (r = r.version), e !== r;
    case "":
    case "=":
    case "==":
      return Ay(e, r, n);
    case "!=":
      return Ly(e, r, n);
    case ">":
      return Fy(e, r, n);
    case ">=":
      return ky(e, r, n);
    case "<":
      return jy(e, r, n);
    case "<=":
      return My(e, r, n);
    default:
      throw new TypeError(`Invalid operator: ${t}`);
  }
};
var Mc = xy;
const Uy = Be, zy = lr, { safeRe: Qr, t: en } = xr, Vy = (e, t) => {
  if (e instanceof Uy)
    return e;
  if (typeof e == "number" && (e = String(e)), typeof e != "string")
    return null;
  t = t || {};
  let r = null;
  if (!t.rtl)
    r = e.match(t.includePrerelease ? Qr[en.COERCEFULL] : Qr[en.COERCE]);
  else {
    const a = t.includePrerelease ? Qr[en.COERCERTLFULL] : Qr[en.COERCERTL];
    let c;
    for (; (c = a.exec(e)) && (!r || r.index + r[0].length !== e.length); )
      (!r || c.index + c[0].length !== r.index + r[0].length) && (r = c), a.lastIndex = c.index + c[1].length + c[2].length;
    a.lastIndex = -1;
  }
  if (r === null)
    return null;
  const n = r[2], i = r[3] || "0", s = r[4] || "0", o = t.includePrerelease && r[5] ? `-${r[5]}` : "", l = t.includePrerelease && r[6] ? `+${r[6]}` : "";
  return zy(`${n}.${i}.${s}${o}${l}`, t);
};
var Gy = Vy;
class By {
  constructor() {
    this.max = 1e3, this.map = /* @__PURE__ */ new Map();
  }
  get(t) {
    const r = this.map.get(t);
    if (r !== void 0)
      return this.map.delete(t), this.map.set(t, r), r;
  }
  delete(t) {
    return this.map.delete(t);
  }
  set(t, r) {
    if (!this.delete(t) && r !== void 0) {
      if (this.map.size >= this.max) {
        const i = this.map.keys().next().value;
        this.delete(i);
      }
      this.map.set(t, r);
    }
    return this;
  }
}
var Hy = By, Wn, Oo;
function st() {
  if (Oo) return Wn;
  Oo = 1;
  const e = /\s+/g;
  class t {
    constructor(L, V) {
      if (V = i(V), L instanceof t)
        return L.loose === !!V.loose && L.includePrerelease === !!V.includePrerelease ? L : new t(L.raw, V);
      if (L instanceof s)
        return this.raw = L.value, this.set = [[L]], this.formatted = void 0, this;
      if (this.options = V, this.loose = !!V.loose, this.includePrerelease = !!V.includePrerelease, this.raw = L.trim().replace(e, " "), this.set = this.raw.split("||").map((j) => this.parseRange(j.trim())).filter((j) => j.length), !this.set.length)
        throw new TypeError(`Invalid SemVer Range: ${this.raw}`);
      if (this.set.length > 1) {
        const j = this.set[0];
        if (this.set = this.set.filter((T) => !g(T[0])), this.set.length === 0)
          this.set = [j];
        else if (this.set.length > 1) {
          for (const T of this.set)
            if (T.length === 1 && y(T[0])) {
              this.set = [T];
              break;
            }
        }
      }
      this.formatted = void 0;
    }
    get range() {
      if (this.formatted === void 0) {
        this.formatted = "";
        for (let L = 0; L < this.set.length; L++) {
          L > 0 && (this.formatted += "||");
          const V = this.set[L];
          for (let j = 0; j < V.length; j++)
            j > 0 && (this.formatted += " "), this.formatted += V[j].toString().trim();
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
    parseRange(L) {
      const j = ((this.options.includePrerelease && u) | (this.options.loose && d)) + ":" + L, T = n.get(j);
      if (T)
        return T;
      const C = this.options.loose, b = C ? a[c.HYPHENRANGELOOSE] : a[c.HYPHENRANGE];
      L = L.replace(b, W(this.options.includePrerelease)), o("hyphen replace", L), L = L.replace(a[c.COMPARATORTRIM], f), o("comparator trim", L), L = L.replace(a[c.TILDETRIM], E), o("tilde trim", L), L = L.replace(a[c.CARETTRIM], S), o("caret trim", L);
      let w = L.split(" ").map((_) => h(_, this.options)).join(" ").split(/\s+/).map((_) => x(_, this.options));
      C && (w = w.filter((_) => (o("loose invalid filter", _, this.options), !!_.match(a[c.COMPARATORLOOSE])))), o("range list", w);
      const D = /* @__PURE__ */ new Map(), I = w.map((_) => new s(_, this.options));
      for (const _ of I) {
        if (g(_))
          return [_];
        D.set(_.value, _);
      }
      D.size > 1 && D.has("") && D.delete("");
      const p = [...D.values()];
      return n.set(j, p), p;
    }
    intersects(L, V) {
      if (!(L instanceof t))
        throw new TypeError("a Range is required");
      return this.set.some((j) => m(j, V) && L.set.some((T) => m(T, V) && j.every((C) => T.every((b) => C.intersects(b, V)))));
    }
    // if ANY of the sets match ALL of its comparators, then pass
    test(L) {
      if (!L)
        return !1;
      if (typeof L == "string")
        try {
          L = new l(L, this.options);
        } catch {
          return !1;
        }
      for (let V = 0; V < this.set.length; V++)
        if (J(this.set[V], L, this.options))
          return !0;
      return !1;
    }
  }
  Wn = t;
  const r = Hy, n = new r(), i = ws, s = Cn(), o = Tn, l = Be, {
    safeRe: a,
    t: c,
    comparatorTrimReplace: f,
    tildeTrimReplace: E,
    caretTrimReplace: S
  } = xr, { FLAG_INCLUDE_PRERELEASE: u, FLAG_LOOSE: d } = Pn, g = (k) => k.value === "<0.0.0-0", y = (k) => k.value === "", m = (k, L) => {
    let V = !0;
    const j = k.slice();
    let T = j.pop();
    for (; V && j.length; )
      V = j.every((C) => T.intersects(C, L)), T = j.pop();
    return V;
  }, h = (k, L) => (o("comp", k, L), k = F(k, L), o("caret", k), k = O(k, L), o("tildes", k), k = R(k, L), o("xrange", k), k = A(k, L), o("stars", k), k), v = (k) => !k || k.toLowerCase() === "x" || k === "*", O = (k, L) => k.trim().split(/\s+/).map((V) => N(V, L)).join(" "), N = (k, L) => {
    const V = L.loose ? a[c.TILDELOOSE] : a[c.TILDE];
    return k.replace(V, (j, T, C, b, w) => {
      o("tilde", k, j, T, C, b, w);
      let D;
      return v(T) ? D = "" : v(C) ? D = `>=${T}.0.0 <${+T + 1}.0.0-0` : v(b) ? D = `>=${T}.${C}.0 <${T}.${+C + 1}.0-0` : w ? (o("replaceTilde pr", w), D = `>=${T}.${C}.${b}-${w} <${T}.${+C + 1}.0-0`) : D = `>=${T}.${C}.${b} <${T}.${+C + 1}.0-0`, o("tilde return", D), D;
    });
  }, F = (k, L) => k.trim().split(/\s+/).map((V) => U(V, L)).join(" "), U = (k, L) => {
    o("caret", k, L);
    const V = L.loose ? a[c.CARETLOOSE] : a[c.CARET], j = L.includePrerelease ? "-0" : "";
    return k.replace(V, (T, C, b, w, D) => {
      o("caret", k, T, C, b, w, D);
      let I;
      return v(C) ? I = "" : v(b) ? I = `>=${C}.0.0${j} <${+C + 1}.0.0-0` : v(w) ? C === "0" ? I = `>=${C}.${b}.0${j} <${C}.${+b + 1}.0-0` : I = `>=${C}.${b}.0${j} <${+C + 1}.0.0-0` : D ? (o("replaceCaret pr", D), C === "0" ? b === "0" ? I = `>=${C}.${b}.${w}-${D} <${C}.${b}.${+w + 1}-0` : I = `>=${C}.${b}.${w}-${D} <${C}.${+b + 1}.0-0` : I = `>=${C}.${b}.${w}-${D} <${+C + 1}.0.0-0`) : (o("no pr"), C === "0" ? b === "0" ? I = `>=${C}.${b}.${w}${j} <${C}.${b}.${+w + 1}-0` : I = `>=${C}.${b}.${w}${j} <${C}.${+b + 1}.0-0` : I = `>=${C}.${b}.${w} <${+C + 1}.0.0-0`), o("caret return", I), I;
    });
  }, R = (k, L) => (o("replaceXRanges", k, L), k.split(/\s+/).map((V) => P(V, L)).join(" ")), P = (k, L) => {
    k = k.trim();
    const V = L.loose ? a[c.XRANGELOOSE] : a[c.XRANGE];
    return k.replace(V, (j, T, C, b, w, D) => {
      o("xRange", k, j, T, C, b, w, D);
      const I = v(C), p = I || v(b), _ = p || v(w), $ = _;
      return T === "=" && $ && (T = ""), D = L.includePrerelease ? "-0" : "", I ? T === ">" || T === "<" ? j = "<0.0.0-0" : j = "*" : T && $ ? (p && (b = 0), w = 0, T === ">" ? (T = ">=", p ? (C = +C + 1, b = 0, w = 0) : (b = +b + 1, w = 0)) : T === "<=" && (T = "<", p ? C = +C + 1 : b = +b + 1), T === "<" && (D = "-0"), j = `${T + C}.${b}.${w}${D}`) : p ? j = `>=${C}.0.0${D} <${+C + 1}.0.0-0` : _ && (j = `>=${C}.${b}.0${D} <${C}.${+b + 1}.0-0`), o("xRange return", j), j;
    });
  }, A = (k, L) => (o("replaceStars", k, L), k.trim().replace(a[c.STAR], "")), x = (k, L) => (o("replaceGTE0", k, L), k.trim().replace(a[L.includePrerelease ? c.GTE0PRE : c.GTE0], "")), W = (k) => (L, V, j, T, C, b, w, D, I, p, _, $) => (v(j) ? V = "" : v(T) ? V = `>=${j}.0.0${k ? "-0" : ""}` : v(C) ? V = `>=${j}.${T}.0${k ? "-0" : ""}` : b ? V = `>=${V}` : V = `>=${V}${k ? "-0" : ""}`, v(I) ? D = "" : v(p) ? D = `<${+I + 1}.0.0-0` : v(_) ? D = `<${I}.${+p + 1}.0-0` : $ ? D = `<=${I}.${p}.${_}-${$}` : k ? D = `<${I}.${p}.${+_ + 1}-0` : D = `<=${D}`, `${V} ${D}`.trim()), J = (k, L, V) => {
    for (let j = 0; j < k.length; j++)
      if (!k[j].test(L))
        return !1;
    if (L.prerelease.length && !V.includePrerelease) {
      for (let j = 0; j < k.length; j++)
        if (o(k[j].semver), k[j].semver !== s.ANY && k[j].semver.prerelease.length > 0) {
          const T = k[j].semver;
          if (T.major === L.major && T.minor === L.minor && T.patch === L.patch)
            return !0;
        }
      return !1;
    }
    return !0;
  };
  return Wn;
}
var Kn, Io;
function Cn() {
  if (Io) return Kn;
  Io = 1;
  const e = Symbol("SemVer ANY");
  class t {
    static get ANY() {
      return e;
    }
    constructor(f, E) {
      if (E = r(E), f instanceof t) {
        if (f.loose === !!E.loose)
          return f;
        f = f.value;
      }
      f = f.trim().split(/\s+/).join(" "), o("comparator", f, E), this.options = E, this.loose = !!E.loose, this.parse(f), this.semver === e ? this.value = "" : this.value = this.operator + this.semver.version, o("comp", this);
    }
    parse(f) {
      const E = this.options.loose ? n[i.COMPARATORLOOSE] : n[i.COMPARATOR], S = f.match(E);
      if (!S)
        throw new TypeError(`Invalid comparator: ${f}`);
      this.operator = S[1] !== void 0 ? S[1] : "", this.operator === "=" && (this.operator = ""), S[2] ? this.semver = new l(S[2], this.options.loose) : this.semver = e;
    }
    toString() {
      return this.value;
    }
    test(f) {
      if (o("Comparator.test", f, this.options.loose), this.semver === e || f === e)
        return !0;
      if (typeof f == "string")
        try {
          f = new l(f, this.options);
        } catch {
          return !1;
        }
      return s(f, this.operator, this.semver, this.options);
    }
    intersects(f, E) {
      if (!(f instanceof t))
        throw new TypeError("a Comparator is required");
      return this.operator === "" ? this.value === "" ? !0 : new a(f.value, E).test(this.value) : f.operator === "" ? f.value === "" ? !0 : new a(this.value, E).test(f.semver) : (E = r(E), E.includePrerelease && (this.value === "<0.0.0-0" || f.value === "<0.0.0-0") || !E.includePrerelease && (this.value.startsWith("<0.0.0") || f.value.startsWith("<0.0.0")) ? !1 : !!(this.operator.startsWith(">") && f.operator.startsWith(">") || this.operator.startsWith("<") && f.operator.startsWith("<") || this.semver.version === f.semver.version && this.operator.includes("=") && f.operator.includes("=") || s(this.semver, "<", f.semver, E) && this.operator.startsWith(">") && f.operator.startsWith("<") || s(this.semver, ">", f.semver, E) && this.operator.startsWith("<") && f.operator.startsWith(">")));
    }
  }
  Kn = t;
  const r = ws, { safeRe: n, t: i } = xr, s = Mc, o = Tn, l = Be, a = st();
  return Kn;
}
const qy = st(), Wy = (e, t, r) => {
  try {
    t = new qy(t, r);
  } catch {
    return !1;
  }
  return t.test(e);
};
var Dn = Wy;
const Ky = st(), Xy = (e, t) => new Ky(e, t).set.map((r) => r.map((n) => n.value).join(" ").trim().split(" "));
var Zy = Xy;
const Jy = Be, Yy = st(), Qy = (e, t, r) => {
  let n = null, i = null, s = null;
  try {
    s = new Yy(t, r);
  } catch {
    return null;
  }
  return e.forEach((o) => {
    s.test(o) && (!n || i.compare(o) === -1) && (n = o, i = new Jy(n, r));
  }), n;
};
var e0 = Qy;
const t0 = Be, r0 = st(), n0 = (e, t, r) => {
  let n = null, i = null, s = null;
  try {
    s = new r0(t, r);
  } catch {
    return null;
  }
  return e.forEach((o) => {
    s.test(o) && (!n || i.compare(o) === 1) && (n = o, i = new t0(n, r));
  }), n;
};
var i0 = n0;
const Xn = Be, s0 = st(), No = Rn, o0 = (e, t) => {
  e = new s0(e, t);
  let r = new Xn("0.0.0");
  if (e.test(r) || (r = new Xn("0.0.0-0"), e.test(r)))
    return r;
  r = null;
  for (let n = 0; n < e.set.length; ++n) {
    const i = e.set[n];
    let s = null;
    i.forEach((o) => {
      const l = new Xn(o.semver.version);
      switch (o.operator) {
        case ">":
          l.prerelease.length === 0 ? l.patch++ : l.prerelease.push(0), l.raw = l.format();
        case "":
        case ">=":
          (!s || No(l, s)) && (s = l);
          break;
        case "<":
        case "<=":
          break;
        default:
          throw new Error(`Unexpected operation: ${o.operator}`);
      }
    }), s && (!r || No(r, s)) && (r = s);
  }
  return r && e.test(r) ? r : null;
};
var a0 = o0;
const c0 = st(), l0 = (e, t) => {
  try {
    return new c0(e, t).range || "*";
  } catch {
    return null;
  }
};
var f0 = l0;
const u0 = Be, xc = Cn(), { ANY: d0 } = xc, h0 = st(), m0 = Dn, Po = Rn, To = Os, p0 = Ns, y0 = Is, E0 = (e, t, r, n) => {
  e = new u0(e, n), t = new h0(t, n);
  let i, s, o, l, a;
  switch (r) {
    case ">":
      i = Po, s = p0, o = To, l = ">", a = ">=";
      break;
    case "<":
      i = To, s = y0, o = Po, l = "<", a = "<=";
      break;
    default:
      throw new TypeError('Must provide a hilo val of "<" or ">"');
  }
  if (m0(e, t, n))
    return !1;
  for (let c = 0; c < t.set.length; ++c) {
    const f = t.set[c];
    let E = null, S = null;
    if (f.forEach((u) => {
      u.semver === d0 && (u = new xc(">=0.0.0")), E = E || u, S = S || u, i(u.semver, E.semver, n) ? E = u : o(u.semver, S.semver, n) && (S = u);
    }), E.operator === l || E.operator === a || (!S.operator || S.operator === l) && s(e, S.semver))
      return !1;
    if (S.operator === a && o(e, S.semver))
      return !1;
  }
  return !0;
};
var Ps = E0;
const g0 = Ps, $0 = (e, t, r) => g0(e, t, ">", r);
var v0 = $0;
const _0 = Ps, S0 = (e, t, r) => _0(e, t, "<", r);
var w0 = S0;
const Ro = st(), b0 = (e, t, r) => (e = new Ro(e, r), t = new Ro(t, r), e.intersects(t, r));
var O0 = b0;
const I0 = Dn, N0 = it;
var P0 = (e, t, r) => {
  const n = [];
  let i = null, s = null;
  const o = e.sort((f, E) => N0(f, E, r));
  for (const f of o)
    I0(f, t, r) ? (s = f, i || (i = f)) : (s && n.push([i, s]), s = null, i = null);
  i && n.push([i, null]);
  const l = [];
  for (const [f, E] of n)
    f === E ? l.push(f) : !E && f === o[0] ? l.push("*") : E ? f === o[0] ? l.push(`<=${E}`) : l.push(`${f} - ${E}`) : l.push(`>=${f}`);
  const a = l.join(" || "), c = typeof t.raw == "string" ? t.raw : String(t);
  return a.length < c.length ? a : t;
};
const Co = st(), Ts = Cn(), { ANY: Zn } = Ts, _r = Dn, Rs = it, T0 = (e, t, r = {}) => {
  if (e === t)
    return !0;
  e = new Co(e, r), t = new Co(t, r);
  let n = !1;
  e: for (const i of e.set) {
    for (const s of t.set) {
      const o = C0(i, s, r);
      if (n = n || o !== null, o)
        continue e;
    }
    if (n)
      return !1;
  }
  return !0;
}, R0 = [new Ts(">=0.0.0-0")], Do = [new Ts(">=0.0.0")], C0 = (e, t, r) => {
  if (e === t)
    return !0;
  if (e.length === 1 && e[0].semver === Zn) {
    if (t.length === 1 && t[0].semver === Zn)
      return !0;
    r.includePrerelease ? e = R0 : e = Do;
  }
  if (t.length === 1 && t[0].semver === Zn) {
    if (r.includePrerelease)
      return !0;
    t = Do;
  }
  const n = /* @__PURE__ */ new Set();
  let i, s;
  for (const u of e)
    u.operator === ">" || u.operator === ">=" ? i = Ao(i, u, r) : u.operator === "<" || u.operator === "<=" ? s = Lo(s, u, r) : n.add(u.semver);
  if (n.size > 1)
    return null;
  let o;
  if (i && s) {
    if (o = Rs(i.semver, s.semver, r), o > 0)
      return null;
    if (o === 0 && (i.operator !== ">=" || s.operator !== "<="))
      return null;
  }
  for (const u of n) {
    if (i && !_r(u, String(i), r) || s && !_r(u, String(s), r))
      return null;
    for (const d of t)
      if (!_r(u, String(d), r))
        return !1;
    return !0;
  }
  let l, a, c, f, E = s && !r.includePrerelease && s.semver.prerelease.length ? s.semver : !1, S = i && !r.includePrerelease && i.semver.prerelease.length ? i.semver : !1;
  E && E.prerelease.length === 1 && s.operator === "<" && E.prerelease[0] === 0 && (E = !1);
  for (const u of t) {
    if (f = f || u.operator === ">" || u.operator === ">=", c = c || u.operator === "<" || u.operator === "<=", i) {
      if (S && u.semver.prerelease && u.semver.prerelease.length && u.semver.major === S.major && u.semver.minor === S.minor && u.semver.patch === S.patch && (S = !1), u.operator === ">" || u.operator === ">=") {
        if (l = Ao(i, u, r), l === u && l !== i)
          return !1;
      } else if (i.operator === ">=" && !_r(i.semver, String(u), r))
        return !1;
    }
    if (s) {
      if (E && u.semver.prerelease && u.semver.prerelease.length && u.semver.major === E.major && u.semver.minor === E.minor && u.semver.patch === E.patch && (E = !1), u.operator === "<" || u.operator === "<=") {
        if (a = Lo(s, u, r), a === u && a !== s)
          return !1;
      } else if (s.operator === "<=" && !_r(s.semver, String(u), r))
        return !1;
    }
    if (!u.operator && (s || i) && o !== 0)
      return !1;
  }
  return !(i && c && !s && o !== 0 || s && f && !i && o !== 0 || S || E);
}, Ao = (e, t, r) => {
  if (!e)
    return t;
  const n = Rs(e.semver, t.semver, r);
  return n > 0 ? e : n < 0 || t.operator === ">" && e.operator === ">=" ? t : e;
}, Lo = (e, t, r) => {
  if (!e)
    return t;
  const n = Rs(e.semver, t.semver, r);
  return n < 0 ? e : n > 0 || t.operator === "<" && e.operator === "<=" ? t : e;
};
var D0 = T0;
const Jn = xr, Fo = Pn, A0 = Be, ko = Fc, L0 = lr, F0 = zp, k0 = Bp, j0 = qp, M0 = Kp, x0 = Jp, U0 = ey, z0 = ny, V0 = oy, G0 = it, B0 = fy, H0 = hy, q0 = bs, W0 = Ey, K0 = vy, X0 = Rn, Z0 = Os, J0 = kc, Y0 = jc, Q0 = Is, eE = Ns, tE = Mc, rE = Gy, nE = Cn(), iE = st(), sE = Dn, oE = Zy, aE = e0, cE = i0, lE = a0, fE = f0, uE = Ps, dE = v0, hE = w0, mE = O0, pE = P0, yE = D0;
var EE = {
  parse: L0,
  valid: F0,
  clean: k0,
  inc: j0,
  diff: M0,
  major: x0,
  minor: U0,
  patch: z0,
  prerelease: V0,
  compare: G0,
  rcompare: B0,
  compareLoose: H0,
  compareBuild: q0,
  sort: W0,
  rsort: K0,
  gt: X0,
  lt: Z0,
  eq: J0,
  neq: Y0,
  gte: Q0,
  lte: eE,
  cmp: tE,
  coerce: rE,
  Comparator: nE,
  Range: iE,
  satisfies: sE,
  toComparators: oE,
  maxSatisfying: aE,
  minSatisfying: cE,
  minVersion: lE,
  validRange: fE,
  outside: uE,
  gtr: dE,
  ltr: hE,
  intersects: mE,
  simplifyRange: pE,
  subset: yE,
  SemVer: A0,
  re: Jn.re,
  src: Jn.src,
  tokens: Jn.t,
  SEMVER_SPEC_VERSION: Fo.SEMVER_SPEC_VERSION,
  RELEASE_TYPES: Fo.RELEASE_TYPES,
  compareIdentifiers: ko.compareIdentifiers,
  rcompareIdentifiers: ko.rcompareIdentifiers
}, An = { exports: {} }, Cs = { exports: {} };
const Uc = (e, t) => {
  for (const r of Reflect.ownKeys(t))
    Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
  return e;
};
Cs.exports = Uc;
Cs.exports.default = Uc;
var gE = Cs.exports;
const $E = gE, $n = /* @__PURE__ */ new WeakMap(), zc = (e, t = {}) => {
  if (typeof e != "function")
    throw new TypeError("Expected a function");
  let r, n = 0;
  const i = e.displayName || e.name || "<anonymous>", s = function(...o) {
    if ($n.set(s, ++n), n === 1)
      r = e.apply(this, o), e = null;
    else if (t.throw === !0)
      throw new Error(`Function \`${i}\` can only be called once`);
    return r;
  };
  return $E(s, e), $n.set(s, n), s;
};
An.exports = zc;
An.exports.default = zc;
An.exports.callCount = (e) => {
  if (!$n.has(e))
    throw new Error(`The given function \`${e.name}\` is not wrapped by the \`onetime\` package`);
  return $n.get(e);
};
var vE = An.exports;
(function(e, t) {
  var r = ft && ft.__classPrivateFieldSet || function(j, T, C, b, w) {
    if (b === "m") throw new TypeError("Private method is not writable");
    if (b === "a" && !w) throw new TypeError("Private accessor was defined without a setter");
    if (typeof T == "function" ? j !== T || !w : !T.has(j)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return b === "a" ? w.call(j, C) : w ? w.value = C : T.set(j, C), C;
  }, n = ft && ft.__classPrivateFieldGet || function(j, T, C, b) {
    if (C === "a" && !b) throw new TypeError("Private accessor was defined without a getter");
    if (typeof T == "function" ? j !== T || !b : !T.has(j)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return C === "m" ? b : C === "a" ? b.call(j) : b ? b.value : T.get(j);
  }, i, s, o, l, a, c;
  Object.defineProperty(t, "__esModule", { value: !0 });
  const f = gi, E = sr, S = be, u = ua, d = da, g = Dl, y = xl, m = Zl, h = ef, v = ut, O = Rc, N = mp, F = Op, U = EE, R = vE, P = "aes-256-cbc", A = () => /* @__PURE__ */ Object.create(null), x = (j) => j != null;
  let W = "";
  try {
    delete require.cache[__filename], W = S.dirname((s = (i = e.parent) === null || i === void 0 ? void 0 : i.filename) !== null && s !== void 0 ? s : ".");
  } catch {
  }
  const J = (j, T) => {
    const C = /* @__PURE__ */ new Set([
      "undefined",
      "symbol",
      "function"
    ]), b = typeof T;
    if (C.has(b))
      throw new TypeError(`Setting a value of type \`${b}\` for key \`${j}\` is not allowed as it's not supported by JSON`);
  }, k = "__internal__", L = `${k}.migrations.version`;
  class V {
    constructor(T = {}) {
      var C;
      o.set(this, void 0), l.set(this, void 0), a.set(this, void 0), c.set(this, {}), this._deserialize = (_) => JSON.parse(_), this._serialize = (_) => JSON.stringify(_, void 0, "	");
      const b = {
        configName: "config",
        fileExtension: "json",
        projectSuffix: "nodejs",
        clearInvalidConfig: !1,
        accessPropertiesByDotNotation: !0,
        configFileMode: 438,
        ...T
      }, w = R(() => {
        const _ = m.sync({ cwd: W }), $ = _ && JSON.parse(E.readFileSync(_, "utf8"));
        return $ ?? {};
      });
      if (!b.cwd) {
        if (b.projectName || (b.projectName = w().name), !b.projectName)
          throw new Error("Project name could not be inferred. Please specify the `projectName` option.");
        b.cwd = h(b.projectName, { suffix: b.projectSuffix }).config;
      }
      if (r(this, a, b, "f"), b.schema) {
        if (typeof b.schema != "object")
          throw new TypeError("The `schema` option must be an object.");
        const _ = new O.default({
          allErrors: !0,
          useDefaults: !0
        });
        (0, N.default)(_);
        const $ = {
          type: "object",
          properties: b.schema
        };
        r(this, o, _.compile($), "f");
        for (const [K, M] of Object.entries(b.schema))
          M?.default && (n(this, c, "f")[K] = M.default);
      }
      b.defaults && r(this, c, {
        ...n(this, c, "f"),
        ...b.defaults
      }, "f"), b.serialize && (this._serialize = b.serialize), b.deserialize && (this._deserialize = b.deserialize), this.events = new g.EventEmitter(), r(this, l, b.encryptionKey, "f");
      const D = b.fileExtension ? `.${b.fileExtension}` : "";
      this.path = S.resolve(b.cwd, `${(C = b.configName) !== null && C !== void 0 ? C : "config"}${D}`);
      const I = this.store, p = Object.assign(A(), b.defaults, I);
      this._validate(p);
      try {
        d.deepEqual(I, p);
      } catch {
        this.store = p;
      }
      if (b.watch && this._watch(), b.migrations) {
        if (b.projectVersion || (b.projectVersion = w().version), !b.projectVersion)
          throw new Error("Project version could not be inferred. Please specify the `projectVersion` option.");
        this._migrate(b.migrations, b.projectVersion, b.beforeEachMigration);
      }
    }
    get(T, C) {
      if (n(this, a, "f").accessPropertiesByDotNotation)
        return this._get(T, C);
      const { store: b } = this;
      return T in b ? b[T] : C;
    }
    set(T, C) {
      if (typeof T != "string" && typeof T != "object")
        throw new TypeError(`Expected \`key\` to be of type \`string\` or \`object\`, got ${typeof T}`);
      if (typeof T != "object" && C === void 0)
        throw new TypeError("Use `delete()` to clear values");
      if (this._containsReservedKey(T))
        throw new TypeError(`Please don't use the ${k} key, as it's used to manage this module internal operations.`);
      const { store: b } = this, w = (D, I) => {
        J(D, I), n(this, a, "f").accessPropertiesByDotNotation ? y.set(b, D, I) : b[D] = I;
      };
      if (typeof T == "object") {
        const D = T;
        for (const [I, p] of Object.entries(D))
          w(I, p);
      } else
        w(T, C);
      this.store = b;
    }
    /**
    	    Check if an item exists.
    
    	    @param key - The key of the item to check.
    	    */
    has(T) {
      return n(this, a, "f").accessPropertiesByDotNotation ? y.has(this.store, T) : T in this.store;
    }
    /**
    	    Reset items to their default values, as defined by the `defaults` or `schema` option.
    
    	    @see `clear()` to reset all items.
    
    	    @param keys - The keys of the items to reset.
    	    */
    reset(...T) {
      for (const C of T)
        x(n(this, c, "f")[C]) && this.set(C, n(this, c, "f")[C]);
    }
    /**
    	    Delete an item.
    
    	    @param key - The key of the item to delete.
    	    */
    delete(T) {
      const { store: C } = this;
      n(this, a, "f").accessPropertiesByDotNotation ? y.delete(C, T) : delete C[T], this.store = C;
    }
    /**
    	    Delete all items.
    
    	    This resets known items to their default values, if defined by the `defaults` or `schema` option.
    	    */
    clear() {
      this.store = A();
      for (const T of Object.keys(n(this, c, "f")))
        this.reset(T);
    }
    /**
    	    Watches the given `key`, calling `callback` on any changes.
    
    	    @param key - The key wo watch.
    	    @param callback - A callback function that is called on any changes. When a `key` is first set `oldValue` will be `undefined`, and when a key is deleted `newValue` will be `undefined`.
    	    @returns A function, that when called, will unsubscribe.
    	    */
    onDidChange(T, C) {
      if (typeof T != "string")
        throw new TypeError(`Expected \`key\` to be of type \`string\`, got ${typeof T}`);
      if (typeof C != "function")
        throw new TypeError(`Expected \`callback\` to be of type \`function\`, got ${typeof C}`);
      return this._handleChange(() => this.get(T), C);
    }
    /**
    	    Watches the whole config object, calling `callback` on any changes.
    
    	    @param callback - A callback function that is called on any changes. When a `key` is first set `oldValue` will be `undefined`, and when a key is deleted `newValue` will be `undefined`.
    	    @returns A function, that when called, will unsubscribe.
    	    */
    onDidAnyChange(T) {
      if (typeof T != "function")
        throw new TypeError(`Expected \`callback\` to be of type \`function\`, got ${typeof T}`);
      return this._handleChange(() => this.store, T);
    }
    get size() {
      return Object.keys(this.store).length;
    }
    get store() {
      try {
        const T = E.readFileSync(this.path, n(this, l, "f") ? null : "utf8"), C = this._encryptData(T), b = this._deserialize(C);
        return this._validate(b), Object.assign(A(), b);
      } catch (T) {
        if (T?.code === "ENOENT")
          return this._ensureDirectory(), A();
        if (n(this, a, "f").clearInvalidConfig && T.name === "SyntaxError")
          return A();
        throw T;
      }
    }
    set store(T) {
      this._ensureDirectory(), this._validate(T), this._write(T), this.events.emit("change");
    }
    *[(o = /* @__PURE__ */ new WeakMap(), l = /* @__PURE__ */ new WeakMap(), a = /* @__PURE__ */ new WeakMap(), c = /* @__PURE__ */ new WeakMap(), Symbol.iterator)]() {
      for (const [T, C] of Object.entries(this.store))
        yield [T, C];
    }
    _encryptData(T) {
      if (!n(this, l, "f"))
        return T.toString();
      try {
        if (n(this, l, "f"))
          try {
            if (T.slice(16, 17).toString() === ":") {
              const C = T.slice(0, 16), b = u.pbkdf2Sync(n(this, l, "f"), C.toString(), 1e4, 32, "sha512"), w = u.createDecipheriv(P, b, C);
              T = Buffer.concat([w.update(Buffer.from(T.slice(17))), w.final()]).toString("utf8");
            } else {
              const C = u.createDecipher(P, n(this, l, "f"));
              T = Buffer.concat([C.update(Buffer.from(T)), C.final()]).toString("utf8");
            }
          } catch {
          }
      } catch {
      }
      return T.toString();
    }
    _handleChange(T, C) {
      let b = T();
      const w = () => {
        const D = b, I = T();
        (0, f.isDeepStrictEqual)(I, D) || (b = I, C.call(this, I, D));
      };
      return this.events.on("change", w), () => this.events.removeListener("change", w);
    }
    _validate(T) {
      if (!n(this, o, "f") || n(this, o, "f").call(this, T) || !n(this, o, "f").errors)
        return;
      const b = n(this, o, "f").errors.map(({ instancePath: w, message: D = "" }) => `\`${w.slice(1)}\` ${D}`);
      throw new Error("Config schema violation: " + b.join("; "));
    }
    _ensureDirectory() {
      E.mkdirSync(S.dirname(this.path), { recursive: !0 });
    }
    _write(T) {
      let C = this._serialize(T);
      if (n(this, l, "f")) {
        const b = u.randomBytes(16), w = u.pbkdf2Sync(n(this, l, "f"), b.toString(), 1e4, 32, "sha512"), D = u.createCipheriv(P, w, b);
        C = Buffer.concat([b, Buffer.from(":"), D.update(Buffer.from(C)), D.final()]);
      }
      if (process.env.SNAP)
        E.writeFileSync(this.path, C, { mode: n(this, a, "f").configFileMode });
      else
        try {
          v.writeFileSync(this.path, C, { mode: n(this, a, "f").configFileMode });
        } catch (b) {
          if (b?.code === "EXDEV") {
            E.writeFileSync(this.path, C, { mode: n(this, a, "f").configFileMode });
            return;
          }
          throw b;
        }
    }
    _watch() {
      this._ensureDirectory(), E.existsSync(this.path) || this._write(A()), process.platform === "win32" ? E.watch(this.path, { persistent: !1 }, F(() => {
        this.events.emit("change");
      }, { wait: 100 })) : E.watchFile(this.path, { persistent: !1 }, F(() => {
        this.events.emit("change");
      }, { wait: 5e3 }));
    }
    _migrate(T, C, b) {
      let w = this._get(L, "0.0.0");
      const D = Object.keys(T).filter((p) => this._shouldPerformMigration(p, w, C));
      let I = { ...this.store };
      for (const p of D)
        try {
          b && b(this, {
            fromVersion: w,
            toVersion: p,
            finalVersion: C,
            versions: D
          });
          const _ = T[p];
          _(this), this._set(L, p), w = p, I = { ...this.store };
        } catch (_) {
          throw this.store = I, new Error(`Something went wrong during the migration! Changes applied to the store until this failed migration will be restored. ${_}`);
        }
      (this._isVersionInRangeFormat(w) || !U.eq(w, C)) && this._set(L, C);
    }
    _containsReservedKey(T) {
      return typeof T == "object" && Object.keys(T)[0] === k ? !0 : typeof T != "string" ? !1 : n(this, a, "f").accessPropertiesByDotNotation ? !!T.startsWith(`${k}.`) : !1;
    }
    _isVersionInRangeFormat(T) {
      return U.clean(T) === null;
    }
    _shouldPerformMigration(T, C, b) {
      return this._isVersionInRangeFormat(T) ? C !== "0.0.0" && U.satisfies(C, T) ? !1 : U.satisfies(b, T) : !(U.lte(T, C) || U.gt(T, b));
    }
    _get(T, C) {
      return y.get(this.store, T, C);
    }
    _set(T, C) {
      const { store: b } = this;
      y.set(b, T, C), this.store = b;
    }
  }
  t.default = V, e.exports = V, e.exports.default = V;
})(ri, ri.exports);
var _E = ri.exports;
const jo = be, { app: fn, ipcMain: pi, ipcRenderer: Mo, shell: SE } = Pl, wE = _E;
let xo = !1;
const Uo = () => {
  if (!pi || !fn)
    throw new Error("Electron Store: You need to call `.initRenderer()` from the main process.");
  const e = {
    defaultCwd: fn.getPath("userData"),
    appVersion: fn.getVersion()
  };
  return xo || (pi.on("electron-store-get-data", (t) => {
    t.returnValue = e;
  }), xo = !0), e;
};
class bE extends wE {
  constructor(t) {
    let r, n;
    if (Mo) {
      const i = Mo.sendSync("electron-store-get-data");
      if (!i)
        throw new Error("Electron Store: You need to call `.initRenderer()` from the main process.");
      ({ defaultCwd: r, appVersion: n } = i);
    } else pi && fn && ({ defaultCwd: r, appVersion: n } = Uo());
    t = {
      name: "config",
      ...t
    }, t.projectVersion || (t.projectVersion = n), t.cwd ? t.cwd = jo.isAbsolute(t.cwd) ? t.cwd : jo.join(r, t.cwd) : t.cwd = r, t.configName = t.name, delete t.name, super(t);
  }
  static initRenderer() {
    Uo();
  }
  async openInEditor() {
    const t = await SE.openPath(this.path);
    if (t)
      throw new Error(t);
  }
}
var OE = bE;
const zo = /* @__PURE__ */ ma(OE);
var fr = { exports: {} }, Vc = {
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
}, Ln = {};
(function(e) {
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
  function r(n) {
    return function(...i) {
      return i.length && (n = n.replace(/\{(\d)\}/g, (s, o) => i[o] || "")), new Error("ADM-ZIP: " + n);
    };
  }
  for (const n of Object.keys(t))
    e[n] = r(t[n]);
})(Ln);
const IE = sr, Ne = be, Vo = Vc, NE = Ln, PE = typeof process == "object" && process.platform === "win32", Go = (e) => typeof e == "object" && e !== null, Gc = new Uint32Array(256).map((e, t) => {
  for (let r = 0; r < 8; r++)
    t & 1 ? t = 3988292384 ^ t >>> 1 : t >>>= 1;
  return t >>> 0;
});
function we(e) {
  this.sep = Ne.sep, this.fs = IE, Go(e) && Go(e.fs) && typeof e.fs.statSync == "function" && (this.fs = e.fs);
}
var TE = we;
we.prototype.makeDir = function(e) {
  const t = this;
  function r(n) {
    let i = n.split(t.sep)[0];
    n.split(t.sep).forEach(function(s) {
      if (!(!s || s.substr(-1, 1) === ":")) {
        i += t.sep + s;
        var o;
        try {
          o = t.fs.statSync(i);
        } catch {
          t.fs.mkdirSync(i);
        }
        if (o && o.isFile()) throw NE.FILE_IN_THE_WAY(`"${i}"`);
      }
    });
  }
  r(e);
};
we.prototype.writeFileTo = function(e, t, r, n) {
  const i = this;
  if (i.fs.existsSync(e)) {
    if (!r) return !1;
    var s = i.fs.statSync(e);
    if (s.isDirectory())
      return !1;
  }
  var o = Ne.dirname(e);
  i.fs.existsSync(o) || i.makeDir(o);
  var l;
  try {
    l = i.fs.openSync(e, "w", 438);
  } catch {
    i.fs.chmodSync(e, 438), l = i.fs.openSync(e, "w", 438);
  }
  if (l)
    try {
      i.fs.writeSync(l, t, 0, t.length, 0);
    } finally {
      i.fs.closeSync(l);
    }
  return i.fs.chmodSync(e, n || 438), !0;
};
we.prototype.writeFileToAsync = function(e, t, r, n, i) {
  typeof n == "function" && (i = n, n = void 0);
  const s = this;
  s.fs.exists(e, function(o) {
    if (o && !r) return i(!1);
    s.fs.stat(e, function(l, a) {
      if (o && a.isDirectory())
        return i(!1);
      var c = Ne.dirname(e);
      s.fs.exists(c, function(f) {
        f || s.makeDir(c), s.fs.open(e, "w", 438, function(E, S) {
          E ? s.fs.chmod(e, 438, function() {
            s.fs.open(e, "w", 438, function(u, d) {
              s.fs.write(d, t, 0, t.length, 0, function() {
                s.fs.close(d, function() {
                  s.fs.chmod(e, n || 438, function() {
                    i(!0);
                  });
                });
              });
            });
          }) : S ? s.fs.write(S, t, 0, t.length, 0, function() {
            s.fs.close(S, function() {
              s.fs.chmod(e, n || 438, function() {
                i(!0);
              });
            });
          }) : s.fs.chmod(e, n || 438, function() {
            i(!0);
          });
        });
      });
    });
  });
};
we.prototype.findFiles = function(e) {
  const t = this;
  function r(n, i, s) {
    let o = [];
    return t.fs.readdirSync(n).forEach(function(l) {
      const a = Ne.join(n, l), c = t.fs.statSync(a);
      o.push(Ne.normalize(a) + (c.isDirectory() ? t.sep : "")), c.isDirectory() && s && (o = o.concat(r(a, i, s)));
    }), o;
  }
  return r(e, void 0, !0);
};
we.prototype.findFilesAsync = function(e, t) {
  const r = this;
  let n = [];
  r.fs.readdir(e, function(i, s) {
    if (i) return t(i);
    let o = s.length;
    if (!o) return t(null, n);
    s.forEach(function(l) {
      l = Ne.join(e, l), r.fs.stat(l, function(a, c) {
        if (a) return t(a);
        c && (n.push(Ne.normalize(l) + (c.isDirectory() ? r.sep : "")), c.isDirectory() ? r.findFilesAsync(l, function(f, E) {
          if (f) return t(f);
          n = n.concat(E), --o || t(null, n);
        }) : --o || t(null, n));
      });
    });
  });
};
we.prototype.getAttributes = function() {
};
we.prototype.setAttributes = function() {
};
we.crc32update = function(e, t) {
  return Gc[(e ^ t) & 255] ^ e >>> 8;
};
we.crc32 = function(e) {
  typeof e == "string" && (e = Buffer.from(e, "utf8"));
  let t = e.length, r = -1;
  for (let n = 0; n < t; ) r = we.crc32update(r, e[n++]);
  return ~r >>> 0;
};
we.methodToString = function(e) {
  switch (e) {
    case Vo.STORED:
      return "STORED (" + e + ")";
    case Vo.DEFLATED:
      return "DEFLATED (" + e + ")";
    default:
      return "UNSUPPORTED (" + e + ")";
  }
};
we.canonical = function(e) {
  if (!e) return "";
  const t = Ne.posix.normalize("/" + e.split("\\").join("/"));
  return Ne.join(".", t);
};
we.zipnamefix = function(e) {
  if (!e) return "";
  const t = Ne.posix.normalize("/" + e.split("\\").join("/"));
  return Ne.posix.join(".", t);
};
we.findLast = function(e, t) {
  if (!Array.isArray(e)) throw new TypeError("arr is not array");
  const r = e.length >>> 0;
  for (let n = r - 1; n >= 0; n--)
    if (t(e[n], n, e))
      return e[n];
};
we.sanitize = function(e, t) {
  e = Ne.resolve(Ne.normalize(e));
  for (var r = t.split("/"), n = 0, i = r.length; n < i; n++) {
    var s = Ne.normalize(Ne.join(e, r.slice(n, i).join(Ne.sep)));
    if (s.indexOf(e) === 0)
      return s;
  }
  return Ne.normalize(Ne.join(e, Ne.basename(t)));
};
we.toBuffer = function(t, r) {
  return Buffer.isBuffer(t) ? t : t instanceof Uint8Array ? Buffer.from(t) : typeof t == "string" ? r(t) : Buffer.alloc(0);
};
we.readBigUInt64LE = function(e, t) {
  var r = Buffer.from(e.slice(t, t + 8));
  return r.swap64(), parseInt(`0x${r.toString("hex")}`);
};
we.fromDOS2Date = function(e) {
  return new Date((e >> 25 & 127) + 1980, Math.max((e >> 21 & 15) - 1, 0), Math.max(e >> 16 & 31, 1), e >> 11 & 31, e >> 5 & 63, (e & 31) << 1);
};
we.fromDate2DOS = function(e) {
  let t = 0, r = 0;
  return e.getFullYear() > 1979 && (t = (e.getFullYear() - 1980 & 127) << 9 | e.getMonth() + 1 << 5 | e.getDate(), r = e.getHours() << 11 | e.getMinutes() << 5 | e.getSeconds() >> 1), t << 16 | r;
};
we.isWin = PE;
we.crcTable = Gc;
const RE = be;
var CE = function(e, { fs: t }) {
  var r = e || "", n = s(), i = null;
  function s() {
    return {
      directory: !1,
      readonly: !1,
      hidden: !1,
      executable: !1,
      mtime: 0,
      atime: 0
    };
  }
  return r && t.existsSync(r) ? (i = t.statSync(r), n.directory = i.isDirectory(), n.mtime = i.mtime, n.atime = i.atime, n.executable = (73 & i.mode) !== 0, n.readonly = (128 & i.mode) === 0, n.hidden = RE.basename(r)[0] === ".") : console.warn("Invalid path: " + r), {
    get directory() {
      return n.directory;
    },
    get readOnly() {
      return n.readonly;
    },
    get hidden() {
      return n.hidden;
    },
    get mtime() {
      return n.mtime;
    },
    get atime() {
      return n.atime;
    },
    get executable() {
      return n.executable;
    },
    decodeAttributes: function() {
    },
    encodeAttributes: function() {
    },
    toJSON: function() {
      return {
        path: r,
        isDirectory: n.directory,
        isReadOnly: n.readonly,
        isHidden: n.hidden,
        isExecutable: n.executable,
        mTime: n.mtime,
        aTime: n.atime
      };
    },
    toString: function() {
      return JSON.stringify(this.toJSON(), null, "	");
    }
  };
}, DE = {
  efs: !0,
  encode: (e) => Buffer.from(e, "utf8"),
  decode: (e) => e.toString("utf8")
};
fr.exports = TE;
fr.exports.Constants = Vc;
fr.exports.Errors = Ln;
fr.exports.FileAttr = CE;
fr.exports.decoder = DE;
var Ur = fr.exports, Fn = {}, wt = Ur, H = wt.Constants, AE = function() {
  var e = 20, t = 10, r = 0, n = 0, i = 0, s = 0, o = 0, l = 0, a = 0, c = 0, f = 0, E = 0, S = 0, u = 0, d = 0;
  e |= wt.isWin ? 2560 : 768, r |= H.FLG_EFS;
  const g = {
    extraLen: 0
  }, y = (h) => Math.max(0, h) >>> 0, m = (h) => Math.max(0, h) & 255;
  return i = wt.fromDate2DOS(/* @__PURE__ */ new Date()), {
    get made() {
      return e;
    },
    set made(h) {
      e = h;
    },
    get version() {
      return t;
    },
    set version(h) {
      t = h;
    },
    get flags() {
      return r;
    },
    set flags(h) {
      r = h;
    },
    get flags_efs() {
      return (r & H.FLG_EFS) > 0;
    },
    set flags_efs(h) {
      h ? r |= H.FLG_EFS : r &= ~H.FLG_EFS;
    },
    get flags_desc() {
      return (r & H.FLG_DESC) > 0;
    },
    set flags_desc(h) {
      h ? r |= H.FLG_DESC : r &= ~H.FLG_DESC;
    },
    get method() {
      return n;
    },
    set method(h) {
      switch (h) {
        case H.STORED:
          this.version = 10;
        case H.DEFLATED:
        default:
          this.version = 20;
      }
      n = h;
    },
    get time() {
      return wt.fromDOS2Date(this.timeval);
    },
    set time(h) {
      this.timeval = wt.fromDate2DOS(h);
    },
    get timeval() {
      return i;
    },
    set timeval(h) {
      i = y(h);
    },
    get timeHighByte() {
      return m(i >>> 8);
    },
    get crc() {
      return s;
    },
    set crc(h) {
      s = y(h);
    },
    get compressedSize() {
      return o;
    },
    set compressedSize(h) {
      o = y(h);
    },
    get size() {
      return l;
    },
    set size(h) {
      l = y(h);
    },
    get fileNameLength() {
      return a;
    },
    set fileNameLength(h) {
      a = h;
    },
    get extraLength() {
      return c;
    },
    set extraLength(h) {
      c = h;
    },
    get extraLocalLength() {
      return g.extraLen;
    },
    set extraLocalLength(h) {
      g.extraLen = h;
    },
    get commentLength() {
      return f;
    },
    set commentLength(h) {
      f = h;
    },
    get diskNumStart() {
      return E;
    },
    set diskNumStart(h) {
      E = y(h);
    },
    get inAttr() {
      return S;
    },
    set inAttr(h) {
      S = y(h);
    },
    get attr() {
      return u;
    },
    set attr(h) {
      u = y(h);
    },
    // get Unix file permissions
    get fileAttr() {
      return (u || 0) >> 16 & 4095;
    },
    get offset() {
      return d;
    },
    set offset(h) {
      d = y(h);
    },
    get encrypted() {
      return (r & H.FLG_ENC) === H.FLG_ENC;
    },
    get centralHeaderSize() {
      return H.CENHDR + a + c + f;
    },
    get realDataOffset() {
      return d + H.LOCHDR + g.fnameLen + g.extraLen;
    },
    get localHeader() {
      return g;
    },
    loadLocalHeaderFromBinary: function(h) {
      var v = h.slice(d, d + H.LOCHDR);
      if (v.readUInt32LE(0) !== H.LOCSIG)
        throw wt.Errors.INVALID_LOC();
      g.version = v.readUInt16LE(H.LOCVER), g.flags = v.readUInt16LE(H.LOCFLG), g.method = v.readUInt16LE(H.LOCHOW), g.time = v.readUInt32LE(H.LOCTIM), g.crc = v.readUInt32LE(H.LOCCRC), g.compressedSize = v.readUInt32LE(H.LOCSIZ), g.size = v.readUInt32LE(H.LOCLEN), g.fnameLen = v.readUInt16LE(H.LOCNAM), g.extraLen = v.readUInt16LE(H.LOCEXT);
      const O = d + H.LOCHDR + g.fnameLen, N = O + g.extraLen;
      return h.slice(O, N);
    },
    loadFromBinary: function(h) {
      if (h.length !== H.CENHDR || h.readUInt32LE(0) !== H.CENSIG)
        throw wt.Errors.INVALID_CEN();
      e = h.readUInt16LE(H.CENVEM), t = h.readUInt16LE(H.CENVER), r = h.readUInt16LE(H.CENFLG), n = h.readUInt16LE(H.CENHOW), i = h.readUInt32LE(H.CENTIM), s = h.readUInt32LE(H.CENCRC), o = h.readUInt32LE(H.CENSIZ), l = h.readUInt32LE(H.CENLEN), a = h.readUInt16LE(H.CENNAM), c = h.readUInt16LE(H.CENEXT), f = h.readUInt16LE(H.CENCOM), E = h.readUInt16LE(H.CENDSK), S = h.readUInt16LE(H.CENATT), u = h.readUInt32LE(H.CENATX), d = h.readUInt32LE(H.CENOFF);
    },
    localHeaderToBinary: function() {
      var h = Buffer.alloc(H.LOCHDR);
      return h.writeUInt32LE(H.LOCSIG, 0), h.writeUInt16LE(t, H.LOCVER), h.writeUInt16LE(r, H.LOCFLG), h.writeUInt16LE(n, H.LOCHOW), h.writeUInt32LE(i, H.LOCTIM), h.writeUInt32LE(s, H.LOCCRC), h.writeUInt32LE(o, H.LOCSIZ), h.writeUInt32LE(l, H.LOCLEN), h.writeUInt16LE(a, H.LOCNAM), h.writeUInt16LE(g.extraLen, H.LOCEXT), h;
    },
    centralHeaderToBinary: function() {
      var h = Buffer.alloc(H.CENHDR + a + c + f);
      return h.writeUInt32LE(H.CENSIG, 0), h.writeUInt16LE(e, H.CENVEM), h.writeUInt16LE(t, H.CENVER), h.writeUInt16LE(r, H.CENFLG), h.writeUInt16LE(n, H.CENHOW), h.writeUInt32LE(i, H.CENTIM), h.writeUInt32LE(s, H.CENCRC), h.writeUInt32LE(o, H.CENSIZ), h.writeUInt32LE(l, H.CENLEN), h.writeUInt16LE(a, H.CENNAM), h.writeUInt16LE(c, H.CENEXT), h.writeUInt16LE(f, H.CENCOM), h.writeUInt16LE(E, H.CENDSK), h.writeUInt16LE(S, H.CENATT), h.writeUInt32LE(u, H.CENATX), h.writeUInt32LE(d, H.CENOFF), h;
    },
    toJSON: function() {
      const h = function(v) {
        return v + " bytes";
      };
      return {
        made: e,
        version: t,
        flags: r,
        method: wt.methodToString(n),
        time: this.time,
        crc: "0x" + s.toString(16).toUpperCase(),
        compressedSize: h(o),
        size: h(l),
        fileNameLength: h(a),
        extraLength: h(c),
        commentLength: h(f),
        diskNumStart: E,
        inAttr: S,
        attr: u,
        offset: d,
        centralHeaderSize: h(H.CENHDR + a + c + f)
      };
    },
    toString: function() {
      return JSON.stringify(this.toJSON(), null, "	");
    }
  };
}, Kt = Ur, pe = Kt.Constants, LE = function() {
  var e = 0, t = 0, r = 0, n = 0, i = 0;
  return {
    get diskEntries() {
      return e;
    },
    set diskEntries(s) {
      e = t = s;
    },
    get totalEntries() {
      return t;
    },
    set totalEntries(s) {
      t = e = s;
    },
    get size() {
      return r;
    },
    set size(s) {
      r = s;
    },
    get offset() {
      return n;
    },
    set offset(s) {
      n = s;
    },
    get commentLength() {
      return i;
    },
    set commentLength(s) {
      i = s;
    },
    get mainHeaderSize() {
      return pe.ENDHDR + i;
    },
    loadFromBinary: function(s) {
      if ((s.length !== pe.ENDHDR || s.readUInt32LE(0) !== pe.ENDSIG) && (s.length < pe.ZIP64HDR || s.readUInt32LE(0) !== pe.ZIP64SIG))
        throw Kt.Errors.INVALID_END();
      s.readUInt32LE(0) === pe.ENDSIG ? (e = s.readUInt16LE(pe.ENDSUB), t = s.readUInt16LE(pe.ENDTOT), r = s.readUInt32LE(pe.ENDSIZ), n = s.readUInt32LE(pe.ENDOFF), i = s.readUInt16LE(pe.ENDCOM)) : (e = Kt.readBigUInt64LE(s, pe.ZIP64SUB), t = Kt.readBigUInt64LE(s, pe.ZIP64TOT), r = Kt.readBigUInt64LE(s, pe.ZIP64SIZE), n = Kt.readBigUInt64LE(s, pe.ZIP64OFF), i = 0);
    },
    toBinary: function() {
      var s = Buffer.alloc(pe.ENDHDR + i);
      return s.writeUInt32LE(pe.ENDSIG, 0), s.writeUInt32LE(0, 4), s.writeUInt16LE(e, pe.ENDSUB), s.writeUInt16LE(t, pe.ENDTOT), s.writeUInt32LE(r, pe.ENDSIZ), s.writeUInt32LE(n, pe.ENDOFF), s.writeUInt16LE(i, pe.ENDCOM), s.fill(" ", pe.ENDHDR), s;
    },
    toJSON: function() {
      const s = function(o, l) {
        let a = o.toString(16).toUpperCase();
        for (; a.length < l; ) a = "0" + a;
        return "0x" + a;
      };
      return {
        diskEntries: e,
        totalEntries: t,
        size: r + " bytes",
        offset: s(n, 4),
        commentLength: i
      };
    },
    toString: function() {
      return JSON.stringify(this.toJSON(), null, "	");
    }
  };
};
Fn.EntryHeader = AE;
Fn.MainHeader = LE;
var kn = {}, FE = function(e) {
  var t = ha, r = { chunkSize: (parseInt(e.length / 1024) + 1) * 1024 };
  return {
    deflate: function() {
      return t.deflateRawSync(e, r);
    },
    deflateAsync: function(n) {
      var i = t.createDeflateRaw(r), s = [], o = 0;
      i.on("data", function(l) {
        s.push(l), o += l.length;
      }), i.on("end", function() {
        var l = Buffer.alloc(o), a = 0;
        l.fill(0);
        for (var c = 0; c < s.length; c++) {
          var f = s[c];
          f.copy(l, a), a += f.length;
        }
        n && n(l);
      }), i.end(e);
    }
  };
};
const kE = +(process.versions ? process.versions.node : "").split(".")[0] || 0;
var jE = function(e, t) {
  var r = ha;
  const n = kE >= 15 && t > 0 ? { maxOutputLength: t } : {};
  return {
    inflate: function() {
      return r.inflateRawSync(e, n);
    },
    inflateAsync: function(i) {
      var s = r.createInflateRaw(n), o = [], l = 0;
      s.on("data", function(a) {
        o.push(a), l += a.length;
      }), s.on("end", function() {
        var a = Buffer.alloc(l), c = 0;
        a.fill(0);
        for (var f = 0; f < o.length; f++) {
          var E = o[f];
          E.copy(a, c), c += E.length;
        }
        i && i(a);
      }), s.end(e);
    }
  };
};
const { randomFillSync: Bo } = ua, ME = Ln, xE = new Uint32Array(256).map((e, t) => {
  for (let r = 0; r < 8; r++)
    t & 1 ? t = t >>> 1 ^ 3988292384 : t >>>= 1;
  return t >>> 0;
}), Bc = (e, t) => Math.imul(e, t) >>> 0, Ho = (e, t) => xE[(e ^ t) & 255] ^ e >>> 8, Cr = () => typeof Bo == "function" ? Bo(Buffer.alloc(12)) : Cr.node();
Cr.node = () => {
  const e = Buffer.alloc(12), t = e.length;
  for (let r = 0; r < t; r++) e[r] = Math.random() * 256 & 255;
  return e;
};
const un = {
  genSalt: Cr
};
function jn(e) {
  const t = Buffer.isBuffer(e) ? e : Buffer.from(e);
  this.keys = new Uint32Array([305419896, 591751049, 878082192]);
  for (let r = 0; r < t.length; r++)
    this.updateKeys(t[r]);
}
jn.prototype.updateKeys = function(e) {
  const t = this.keys;
  return t[0] = Ho(t[0], e), t[1] += t[0] & 255, t[1] = Bc(t[1], 134775813) + 1, t[2] = Ho(t[2], t[1] >>> 24), e;
};
jn.prototype.next = function() {
  const e = (this.keys[2] | 2) >>> 0;
  return Bc(e, e ^ 1) >> 8 & 255;
};
function UE(e) {
  const t = new jn(e);
  return function(r) {
    const n = Buffer.alloc(r.length);
    let i = 0;
    for (let s of r)
      n[i++] = t.updateKeys(s ^ t.next());
    return n;
  };
}
function zE(e) {
  const t = new jn(e);
  return function(r, n, i = 0) {
    n || (n = Buffer.alloc(r.length));
    for (let s of r) {
      const o = t.next();
      n[i++] = s ^ o, t.updateKeys(s);
    }
    return n;
  };
}
function VE(e, t, r) {
  if (!e || !Buffer.isBuffer(e) || e.length < 12)
    return Buffer.alloc(0);
  const n = UE(r), i = n(e.slice(0, 12)), s = (t.flags & 8) === 8 ? t.timeHighByte : t.crc >>> 24;
  if (i[11] !== s)
    throw ME.WRONG_PASSWORD();
  return n(e.slice(12));
}
function GE(e) {
  Buffer.isBuffer(e) && e.length >= 12 ? un.genSalt = function() {
    return e.slice(0, 12);
  } : e === "node" ? un.genSalt = Cr.node : un.genSalt = Cr;
}
function BE(e, t, r, n = !1) {
  e == null && (e = Buffer.alloc(0)), Buffer.isBuffer(e) || (e = Buffer.from(e.toString()));
  const i = zE(r), s = un.genSalt();
  s[11] = t.crc >>> 24 & 255, n && (s[10] = t.crc >>> 16 & 255);
  const o = Buffer.alloc(e.length + 12);
  return i(s, o), i(e, o, 12);
}
var HE = { decrypt: VE, encrypt: BE, _salter: GE };
kn.Deflater = FE;
kn.Inflater = jE;
kn.ZipCrypto = HE;
var le = Ur, qE = Fn, _e = le.Constants, Yn = kn, Hc = function(e, t) {
  var r = new qE.EntryHeader(), n = Buffer.alloc(0), i = Buffer.alloc(0), s = !1, o = null, l = Buffer.alloc(0), a = Buffer.alloc(0), c = !0;
  const f = e, E = typeof f.decoder == "object" ? f.decoder : le.decoder;
  c = E.hasOwnProperty("efs") ? E.efs : !1;
  function S() {
    return !t || !(t instanceof Uint8Array) ? Buffer.alloc(0) : (a = r.loadLocalHeaderFromBinary(t), t.slice(r.realDataOffset, r.realDataOffset + r.compressedSize));
  }
  function u(v) {
    if (r.flags_desc) {
      const O = {}, N = r.realDataOffset + r.compressedSize;
      if (t.readUInt32LE(N) == _e.LOCSIG || t.readUInt32LE(N) == _e.CENSIG)
        throw le.Errors.DESCRIPTOR_NOT_EXIST();
      if (t.readUInt32LE(N) == _e.EXTSIG)
        O.crc = t.readUInt32LE(N + _e.EXTCRC), O.compressedSize = t.readUInt32LE(N + _e.EXTSIZ), O.size = t.readUInt32LE(N + _e.EXTLEN);
      else if (t.readUInt16LE(N + 12) === 19280)
        O.crc = t.readUInt32LE(N + _e.EXTCRC - 4), O.compressedSize = t.readUInt32LE(N + _e.EXTSIZ - 4), O.size = t.readUInt32LE(N + _e.EXTLEN - 4);
      else
        throw le.Errors.DESCRIPTOR_UNKNOWN();
      if (O.compressedSize !== r.compressedSize || O.size !== r.size || O.crc !== r.crc)
        throw le.Errors.DESCRIPTOR_FAULTY();
      if (le.crc32(v) !== O.crc)
        return !1;
    } else if (le.crc32(v) !== r.localHeader.crc)
      return !1;
    return !0;
  }
  function d(v, O, N) {
    if (typeof O > "u" && typeof v == "string" && (N = v, v = void 0), s)
      return v && O && O(Buffer.alloc(0), le.Errors.DIRECTORY_CONTENT_ERROR()), Buffer.alloc(0);
    var F = S();
    if (F.length === 0)
      return v && O && O(F), F;
    if (r.encrypted) {
      if (typeof N != "string" && !Buffer.isBuffer(N))
        throw le.Errors.INVALID_PASS_PARAM();
      F = Yn.ZipCrypto.decrypt(F, r, N);
    }
    var U = Buffer.alloc(r.size);
    switch (r.method) {
      case le.Constants.STORED:
        if (F.copy(U), u(U))
          return v && O && O(U), U;
        throw v && O && O(U, le.Errors.BAD_CRC()), le.Errors.BAD_CRC();
      case le.Constants.DEFLATED:
        var R = new Yn.Inflater(F, r.size);
        if (v)
          R.inflateAsync(function(P) {
            P.copy(P, 0), O && (u(P) ? O(P) : O(P, le.Errors.BAD_CRC()));
          });
        else {
          if (R.inflate(U).copy(U, 0), !u(U))
            throw le.Errors.BAD_CRC(`"${E.decode(n)}"`);
          return U;
        }
        break;
      default:
        throw v && O && O(Buffer.alloc(0), le.Errors.UNKNOWN_METHOD()), le.Errors.UNKNOWN_METHOD();
    }
  }
  function g(v, O) {
    if ((!o || !o.length) && Buffer.isBuffer(t))
      return v && O && O(S()), S();
    if (o.length && !s) {
      var N;
      switch (r.method) {
        case le.Constants.STORED:
          return r.compressedSize = r.size, N = Buffer.alloc(o.length), o.copy(N), v && O && O(N), N;
        default:
        case le.Constants.DEFLATED:
          var F = new Yn.Deflater(o);
          if (v)
            F.deflateAsync(function(R) {
              N = Buffer.alloc(R.length), r.compressedSize = R.length, R.copy(N), O && O(N);
            });
          else {
            var U = F.deflate();
            return r.compressedSize = U.length, U;
          }
          F = null;
          break;
      }
    } else if (v && O)
      O(Buffer.alloc(0));
    else
      return Buffer.alloc(0);
  }
  function y(v, O) {
    return (v.readUInt32LE(O + 4) << 4) + v.readUInt32LE(O);
  }
  function m(v) {
    try {
      for (var O = 0, N, F, U; O + 4 < v.length; )
        N = v.readUInt16LE(O), O += 2, F = v.readUInt16LE(O), O += 2, U = v.slice(O, O + F), O += F, _e.ID_ZIP64 === N && h(U);
    } catch {
      throw le.Errors.EXTRA_FIELD_PARSE_ERROR();
    }
  }
  function h(v) {
    var O, N, F, U;
    v.length >= _e.EF_ZIP64_SCOMP && (O = y(v, _e.EF_ZIP64_SUNCOMP), r.size === _e.EF_ZIP64_OR_32 && (r.size = O)), v.length >= _e.EF_ZIP64_RHO && (N = y(v, _e.EF_ZIP64_SCOMP), r.compressedSize === _e.EF_ZIP64_OR_32 && (r.compressedSize = N)), v.length >= _e.EF_ZIP64_DSN && (F = y(v, _e.EF_ZIP64_RHO), r.offset === _e.EF_ZIP64_OR_32 && (r.offset = F)), v.length >= _e.EF_ZIP64_DSN + 4 && (U = v.readUInt32LE(_e.EF_ZIP64_DSN), r.diskNumStart === _e.EF_ZIP64_OR_16 && (r.diskNumStart = U));
  }
  return {
    get entryName() {
      return E.decode(n);
    },
    get rawEntryName() {
      return n;
    },
    set entryName(v) {
      n = le.toBuffer(v, E.encode);
      var O = n[n.length - 1];
      s = O === 47 || O === 92, r.fileNameLength = n.length;
    },
    get efs() {
      return typeof c == "function" ? c(this.entryName) : c;
    },
    get extra() {
      return l;
    },
    set extra(v) {
      l = v, r.extraLength = v.length, m(v);
    },
    get comment() {
      return E.decode(i);
    },
    set comment(v) {
      if (i = le.toBuffer(v, E.encode), r.commentLength = i.length, i.length > 65535) throw le.Errors.COMMENT_TOO_LONG();
    },
    get name() {
      var v = E.decode(n);
      return s ? v.substr(v.length - 1).split("/").pop() : v.split("/").pop();
    },
    get isDirectory() {
      return s;
    },
    getCompressedData: function() {
      return g(!1, null);
    },
    getCompressedDataAsync: function(v) {
      g(!0, v);
    },
    setData: function(v) {
      o = le.toBuffer(v, le.decoder.encode), !s && o.length ? (r.size = o.length, r.method = le.Constants.DEFLATED, r.crc = le.crc32(v), r.changed = !0) : r.method = le.Constants.STORED;
    },
    getData: function(v) {
      return r.changed ? o : d(!1, null, v);
    },
    getDataAsync: function(v, O) {
      r.changed ? v(o) : d(!0, v, O);
    },
    set attr(v) {
      r.attr = v;
    },
    get attr() {
      return r.attr;
    },
    set header(v) {
      r.loadFromBinary(v);
    },
    get header() {
      return r;
    },
    packCentralHeader: function() {
      r.flags_efs = this.efs, r.extraLength = l.length;
      var v = r.centralHeaderToBinary(), O = le.Constants.CENHDR;
      return n.copy(v, O), O += n.length, l.copy(v, O), O += r.extraLength, i.copy(v, O), v;
    },
    packLocalHeader: function() {
      let v = 0;
      r.flags_efs = this.efs, r.extraLocalLength = a.length;
      const O = r.localHeaderToBinary(), N = Buffer.alloc(O.length + n.length + r.extraLocalLength);
      return O.copy(N, v), v += O.length, n.copy(N, v), v += n.length, a.copy(N, v), v += a.length, N;
    },
    toJSON: function() {
      const v = function(O) {
        return "<" + (O && O.length + " bytes buffer" || "null") + ">";
      };
      return {
        entryName: this.entryName,
        name: this.name,
        comment: this.comment,
        isDirectory: this.isDirectory,
        header: r.toJSON(),
        compressedData: v(t),
        data: v(o)
      };
    },
    toString: function() {
      return JSON.stringify(this.toJSON(), null, "	");
    }
  };
};
const qo = Hc, WE = Fn, De = Ur;
var KE = function(e, t) {
  var r = [], n = {}, i = Buffer.alloc(0), s = new WE.MainHeader(), o = !1;
  const l = /* @__PURE__ */ new Set(), a = t, { noSort: c, decoder: f } = a;
  e ? u(a.readEntries) : o = !0;
  function E() {
    const g = /* @__PURE__ */ new Set();
    for (const y of Object.keys(n)) {
      const m = y.split("/");
      if (m.pop(), !!m.length)
        for (let h = 0; h < m.length; h++) {
          const v = m.slice(0, h + 1).join("/") + "/";
          g.add(v);
        }
    }
    for (const y of g)
      if (!(y in n)) {
        const m = new qo(a);
        m.entryName = y, m.attr = 16, m.temporary = !0, r.push(m), n[m.entryName] = m, l.add(m);
      }
  }
  function S() {
    if (o = !0, n = {}, s.diskEntries > (e.length - s.offset) / De.Constants.CENHDR)
      throw De.Errors.DISK_ENTRY_TOO_LARGE();
    r = new Array(s.diskEntries);
    for (var g = s.offset, y = 0; y < r.length; y++) {
      var m = g, h = new qo(a, e);
      h.header = e.slice(m, m += De.Constants.CENHDR), h.entryName = e.slice(m, m += h.header.fileNameLength), h.header.extraLength && (h.extra = e.slice(m, m += h.header.extraLength)), h.header.commentLength && (h.comment = e.slice(m, m + h.header.commentLength)), g += h.header.centralHeaderSize, r[y] = h, n[h.entryName] = h;
    }
    l.clear(), E();
  }
  function u(g) {
    var y = e.length - De.Constants.ENDHDR, m = Math.max(0, y - 65535), h = m, v = e.length, O = -1, N = 0;
    for ((typeof a.trailingSpace == "boolean" ? a.trailingSpace : !1) && (m = 0), y; y >= h; y--)
      if (e[y] === 80) {
        if (e.readUInt32LE(y) === De.Constants.ENDSIG) {
          O = y, N = y, v = y + De.Constants.ENDHDR, h = y - De.Constants.END64HDR;
          continue;
        }
        if (e.readUInt32LE(y) === De.Constants.END64SIG) {
          h = m;
          continue;
        }
        if (e.readUInt32LE(y) === De.Constants.ZIP64SIG) {
          O = y, v = y + De.readBigUInt64LE(e, y + De.Constants.ZIP64SIZE) + De.Constants.ZIP64LEAD;
          break;
        }
      }
    if (O == -1) throw De.Errors.INVALID_FORMAT();
    s.loadFromBinary(e.slice(O, v)), s.commentLength && (i = e.slice(N + De.Constants.ENDHDR)), g && S();
  }
  function d() {
    r.length > 1 && !c && r.sort((g, y) => g.entryName.toLowerCase().localeCompare(y.entryName.toLowerCase()));
  }
  return {
    /**
     * Returns an array of ZipEntry objects existent in the current opened archive
     * @return Array
     */
    get entries() {
      return o || S(), r.filter((g) => !l.has(g));
    },
    /**
     * Archive comment
     * @return {String}
     */
    get comment() {
      return f.decode(i);
    },
    set comment(g) {
      i = De.toBuffer(g, f.encode), s.commentLength = i.length;
    },
    getEntryCount: function() {
      return o ? r.length : s.diskEntries;
    },
    forEach: function(g) {
      this.entries.forEach(g);
    },
    /**
     * Returns a reference to the entry with the given name or null if entry is inexistent
     *
     * @param entryName
     * @return ZipEntry
     */
    getEntry: function(g) {
      return o || S(), n[g] || null;
    },
    /**
     * Adds the given entry to the entry list
     *
     * @param entry
     */
    setEntry: function(g) {
      o || S(), r.push(g), n[g.entryName] = g, s.totalEntries = r.length;
    },
    /**
     * Removes the file with the given name from the entry list.
     *
     * If the entry is a directory, then all nested files and directories will be removed
     * @param entryName
     * @returns {void}
     */
    deleteFile: function(g, y = !0) {
      o || S();
      const m = n[g];
      this.getEntryChildren(m, y).map((v) => v.entryName).forEach(this.deleteEntry);
    },
    /**
     * Removes the entry with the given name from the entry list.
     *
     * @param {string} entryName
     * @returns {void}
     */
    deleteEntry: function(g) {
      o || S();
      const y = n[g], m = r.indexOf(y);
      m >= 0 && (r.splice(m, 1), delete n[g], s.totalEntries = r.length);
    },
    /**
     *  Iterates and returns all nested files and directories of the given entry
     *
     * @param entry
     * @return Array
     */
    getEntryChildren: function(g, y = !0) {
      if (o || S(), typeof g == "object")
        if (g.isDirectory && y) {
          const m = [], h = g.entryName;
          for (const v of r)
            v.entryName.startsWith(h) && m.push(v);
          return m;
        } else
          return [g];
      return [];
    },
    /**
     *  How many child elements entry has
     *
     * @param {ZipEntry} entry
     * @return {integer}
     */
    getChildCount: function(g) {
      if (g && g.isDirectory) {
        const y = this.getEntryChildren(g);
        return y.includes(g) ? y.length - 1 : y.length;
      }
      return 0;
    },
    /**
     * Returns the zip file
     *
     * @return Buffer
     */
    compressToBuffer: function() {
      o || S(), d();
      const g = [], y = [];
      let m = 0, h = 0;
      s.size = 0, s.offset = 0;
      let v = 0;
      for (const F of this.entries) {
        const U = F.getCompressedData();
        F.header.offset = h;
        const R = F.packLocalHeader(), P = R.length + U.length;
        h += P, g.push(R), g.push(U);
        const A = F.packCentralHeader();
        y.push(A), s.size += A.length, m += P + A.length, v++;
      }
      m += s.mainHeaderSize, s.offset = h, s.totalEntries = v, h = 0;
      const O = Buffer.alloc(m);
      for (const F of g)
        F.copy(O, h), h += F.length;
      for (const F of y)
        F.copy(O, h), h += F.length;
      const N = s.toBinary();
      return i && i.copy(N, De.Constants.ENDHDR), N.copy(O, h), e = O, o = !1, O;
    },
    toAsyncBuffer: function(g, y, m, h) {
      try {
        o || S(), d();
        const v = [], O = [];
        let N = 0, F = 0, U = 0;
        s.size = 0, s.offset = 0;
        const R = function(P) {
          if (P.length > 0) {
            const A = P.shift(), x = A.entryName + A.extra.toString();
            m && m(x), A.getCompressedDataAsync(function(W) {
              h && h(x), A.header.offset = F;
              const J = A.packLocalHeader(), k = J.length + W.length;
              F += k, v.push(J), v.push(W);
              const L = A.packCentralHeader();
              O.push(L), s.size += L.length, N += k + L.length, U++, R(P);
            });
          } else {
            N += s.mainHeaderSize, s.offset = F, s.totalEntries = U, F = 0;
            const A = Buffer.alloc(N);
            v.forEach(function(W) {
              W.copy(A, F), F += W.length;
            }), O.forEach(function(W) {
              W.copy(A, F), F += W.length;
            });
            const x = s.toBinary();
            i && i.copy(x, De.Constants.ENDHDR), x.copy(A, F), e = A, o = !1, g(A);
          }
        };
        R(Array.from(this.entries));
      } catch (v) {
        y(v);
      }
    }
  };
};
const ye = Ur, Se = be, XE = Hc, ZE = KE, At = (...e) => ye.findLast(e, (t) => typeof t == "boolean"), Wo = (...e) => ye.findLast(e, (t) => typeof t == "string"), JE = (...e) => ye.findLast(e, (t) => typeof t == "function"), YE = {
  // option "noSort" : if true it disables files sorting
  noSort: !1,
  // read entries during load (initial loading may be slower)
  readEntries: !1,
  // default method is none
  method: ye.Constants.NONE,
  // file system
  fs: null
};
var QE = function(e, t) {
  let r = null;
  const n = Object.assign(/* @__PURE__ */ Object.create(null), YE);
  e && typeof e == "object" && (e instanceof Uint8Array || (Object.assign(n, e), e = n.input ? n.input : void 0, n.input && delete n.input), Buffer.isBuffer(e) && (r = e, n.method = ye.Constants.BUFFER, e = void 0)), Object.assign(n, t);
  const i = new ye(n);
  if ((typeof n.decoder != "object" || typeof n.decoder.encode != "function" || typeof n.decoder.decode != "function") && (n.decoder = ye.decoder), e && typeof e == "string")
    if (i.fs.existsSync(e))
      n.method = ye.Constants.FILE, n.filename = e, r = i.fs.readFileSync(e);
    else
      throw ye.Errors.INVALID_FILENAME();
  const s = new ZE(r, n), { canonical: o, sanitize: l, zipnamefix: a } = ye;
  function c(u) {
    if (u && s) {
      var d;
      if (typeof u == "string" && (d = s.getEntry(Se.posix.normalize(u))), typeof u == "object" && typeof u.entryName < "u" && typeof u.header < "u" && (d = s.getEntry(u.entryName)), d)
        return d;
    }
    return null;
  }
  function f(u) {
    const { join: d, normalize: g, sep: y } = Se.posix;
    return d(".", g(y + u.split("\\").join(y) + y));
  }
  function E(u) {
    return u instanceof RegExp ? /* @__PURE__ */ function(d) {
      return function(g) {
        return d.test(g);
      };
    }(u) : typeof u != "function" ? () => !0 : u;
  }
  const S = (u, d) => {
    let g = d.slice(-1);
    return g = g === i.sep ? i.sep : "", Se.relative(u, d) + g;
  };
  return {
    /**
     * Extracts the given entry from the archive and returns the content as a Buffer object
     * @param {ZipEntry|string} entry ZipEntry object or String with the full path of the entry
     * @param {Buffer|string} [pass] - password
     * @return Buffer or Null in case of error
     */
    readFile: function(u, d) {
      var g = c(u);
      return g && g.getData(d) || null;
    },
    /**
     * Returns how many child elements has on entry (directories) on files it is always 0
     * @param {ZipEntry|string} entry ZipEntry object or String with the full path of the entry
     * @returns {integer}
     */
    childCount: function(u) {
      const d = c(u);
      if (d)
        return s.getChildCount(d);
    },
    /**
     * Asynchronous readFile
     * @param {ZipEntry|string} entry ZipEntry object or String with the full path of the entry
     * @param {callback} callback
     *
     * @return Buffer or Null in case of error
     */
    readFileAsync: function(u, d) {
      var g = c(u);
      g ? g.getDataAsync(d) : d(null, "getEntry failed for:" + u);
    },
    /**
     * Extracts the given entry from the archive and returns the content as plain text in the given encoding
     * @param {ZipEntry|string} entry - ZipEntry object or String with the full path of the entry
     * @param {string} encoding - Optional. If no encoding is specified utf8 is used
     *
     * @return String
     */
    readAsText: function(u, d) {
      var g = c(u);
      if (g) {
        var y = g.getData();
        if (y && y.length)
          return y.toString(d || "utf8");
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
    readAsTextAsync: function(u, d, g) {
      var y = c(u);
      y ? y.getDataAsync(function(m, h) {
        if (h) {
          d(m, h);
          return;
        }
        m && m.length ? d(m.toString(g || "utf8")) : d("");
      }) : d("");
    },
    /**
     * Remove the entry from the file or the entry and all it's nested directories and files if the given entry is a directory
     *
     * @param {ZipEntry|string} entry
     * @returns {void}
     */
    deleteFile: function(u, d = !0) {
      var g = c(u);
      g && s.deleteFile(g.entryName, d);
    },
    /**
     * Remove the entry from the file or directory without affecting any nested entries
     *
     * @param {ZipEntry|string} entry
     * @returns {void}
     */
    deleteEntry: function(u) {
      var d = c(u);
      d && s.deleteEntry(d.entryName);
    },
    /**
     * Adds a comment to the zip. The zip must be rewritten after adding the comment.
     *
     * @param {string} comment
     */
    addZipComment: function(u) {
      s.comment = u;
    },
    /**
     * Returns the zip comment
     *
     * @return String
     */
    getZipComment: function() {
      return s.comment || "";
    },
    /**
     * Adds a comment to a specified zipEntry. The zip must be rewritten after adding the comment
     * The comment cannot exceed 65535 characters in length
     *
     * @param {ZipEntry} entry
     * @param {string} comment
     */
    addZipEntryComment: function(u, d) {
      var g = c(u);
      g && (g.comment = d);
    },
    /**
     * Returns the comment of the specified entry
     *
     * @param {ZipEntry} entry
     * @return String
     */
    getZipEntryComment: function(u) {
      var d = c(u);
      return d && d.comment || "";
    },
    /**
     * Updates the content of an existing entry inside the archive. The zip must be rewritten after updating the content
     *
     * @param {ZipEntry} entry
     * @param {Buffer} content
     */
    updateFile: function(u, d) {
      var g = c(u);
      g && g.setData(d);
    },
    /**
     * Adds a file from the disk to the archive
     *
     * @param {string} localPath File to add to zip
     * @param {string} [zipPath] Optional path inside the zip
     * @param {string} [zipName] Optional name for the file
     * @param {string} [comment] Optional file comment
     */
    addLocalFile: function(u, d, g, y) {
      if (i.fs.existsSync(u)) {
        d = d ? f(d) : "";
        const m = Se.win32.basename(Se.win32.normalize(u));
        d += g || m;
        const h = i.fs.statSync(u), v = h.isFile() ? i.fs.readFileSync(u) : Buffer.alloc(0);
        h.isDirectory() && (d += i.sep), this.addFile(d, v, y, h);
      } else
        throw ye.Errors.FILE_NOT_FOUND(u);
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
    addLocalFileAsync: function(u, d) {
      u = typeof u == "object" ? u : { localPath: u };
      const g = Se.resolve(u.localPath), { comment: y } = u;
      let { zipPath: m, zipName: h } = u;
      const v = this;
      i.fs.stat(g, function(O, N) {
        if (O) return d(O, !1);
        m = m ? f(m) : "";
        const F = Se.win32.basename(Se.win32.normalize(g));
        if (m += h || F, N.isFile())
          i.fs.readFile(g, function(U, R) {
            return U ? d(U, !1) : (v.addFile(m, R, y, N), setImmediate(d, void 0, !0));
          });
        else if (N.isDirectory())
          return m += i.sep, v.addFile(m, Buffer.alloc(0), y, N), setImmediate(d, void 0, !0);
      });
    },
    /**
     * Adds a local directory and all its nested files and directories to the archive
     *
     * @param {string} localPath - local path to the folder
     * @param {string} [zipPath] - optional path inside zip
     * @param {(RegExp|function)} [filter] - optional RegExp or Function if files match will be included.
     */
    addLocalFolder: function(u, d, g) {
      if (g = E(g), d = d ? f(d) : "", u = Se.normalize(u), i.fs.existsSync(u)) {
        const y = i.findFiles(u), m = this;
        if (y.length)
          for (const h of y) {
            const v = Se.join(d, S(u, h));
            g(v) && m.addLocalFile(h, Se.dirname(v));
          }
      } else
        throw ye.Errors.FILE_NOT_FOUND(u);
    },
    /**
     * Asynchronous addLocalFolder
     * @param {string} localPath
     * @param {callback} callback
     * @param {string} [zipPath] optional path inside zip
     * @param {RegExp|function} [filter] optional RegExp or Function if files match will
     *               be included.
     */
    addLocalFolderAsync: function(u, d, g, y) {
      y = E(y), g = g ? f(g) : "", u = Se.normalize(u);
      var m = this;
      i.fs.open(u, "r", function(h) {
        if (h && h.code === "ENOENT")
          d(void 0, ye.Errors.FILE_NOT_FOUND(u));
        else if (h)
          d(void 0, h);
        else {
          var v = i.findFiles(u), O = -1, N = function() {
            if (O += 1, O < v.length) {
              var F = v[O], U = S(u, F).split("\\").join("/");
              U = U.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^\x20-\x7E]/g, ""), y(U) ? i.fs.stat(F, function(R, P) {
                R && d(void 0, R), P.isFile() ? i.fs.readFile(F, function(A, x) {
                  A ? d(void 0, A) : (m.addFile(g + U, x, "", P), N());
                }) : (m.addFile(g + U + "/", Buffer.alloc(0), "", P), N());
              }) : process.nextTick(() => {
                N();
              });
            } else
              d(!0, void 0);
          };
          N();
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
    addLocalFolderAsync2: function(u, d) {
      const g = this;
      u = typeof u == "object" ? u : { localPath: u }, localPath = Se.resolve(f(u.localPath));
      let { zipPath: y, filter: m, namefix: h } = u;
      m instanceof RegExp ? m = /* @__PURE__ */ function(N) {
        return function(F) {
          return N.test(F);
        };
      }(m) : typeof m != "function" && (m = function() {
        return !0;
      }), y = y ? f(y) : "", h == "latin1" && (h = (N) => N.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^\x20-\x7E]/g, "")), typeof h != "function" && (h = (N) => N);
      const v = (N) => Se.join(y, h(S(localPath, N))), O = (N) => Se.win32.basename(Se.win32.normalize(h(N)));
      i.fs.open(localPath, "r", function(N) {
        N && N.code === "ENOENT" ? d(void 0, ye.Errors.FILE_NOT_FOUND(localPath)) : N ? d(void 0, N) : i.findFilesAsync(localPath, function(F, U) {
          if (F) return d(F);
          U = U.filter((R) => m(v(R))), U.length || d(void 0, !1), setImmediate(
            U.reverse().reduce(function(R, P) {
              return function(A, x) {
                if (A || x === !1) return setImmediate(R, A, !1);
                g.addLocalFileAsync(
                  {
                    localPath: P,
                    zipPath: Se.dirname(v(P)),
                    zipName: O(P)
                  },
                  R
                );
              };
            }, d)
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
    addLocalFolderPromise: function(u, d) {
      return new Promise((g, y) => {
        this.addLocalFolderAsync2(Object.assign({ localPath: u }, d), (m, h) => {
          m && y(m), h && g(this);
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
    addFile: function(u, d, g, y) {
      u = a(u);
      let m = c(u);
      const h = m != null;
      h || (m = new XE(n), m.entryName = u), m.comment = g || "";
      const v = typeof y == "object" && y instanceof i.fs.Stats;
      v && (m.header.time = y.mtime);
      var O = m.isDirectory ? 16 : 0;
      let N = m.isDirectory ? 16384 : 32768;
      return v ? N |= 4095 & y.mode : typeof y == "number" ? N |= 4095 & y : N |= m.isDirectory ? 493 : 420, O = (O | N << 16) >>> 0, m.attr = O, m.setData(d), h || s.setEntry(m), m;
    },
    /**
     * Returns an array of ZipEntry objects representing the files and folders inside the archive
     *
     * @param {string} [password]
     * @returns Array
     */
    getEntries: function(u) {
      return s.password = u, s ? s.entries : [];
    },
    /**
     * Returns a ZipEntry object representing the file or folder specified by ``name``.
     *
     * @param {string} name
     * @return ZipEntry
     */
    getEntry: function(u) {
      return c(u);
    },
    getEntryCount: function() {
      return s.getEntryCount();
    },
    forEach: function(u) {
      return s.forEach(u);
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
    extractEntryTo: function(u, d, g, y, m, h) {
      y = At(!1, y), m = At(!1, m), g = At(!0, g), h = Wo(m, h);
      var v = c(u);
      if (!v)
        throw ye.Errors.NO_ENTRY();
      var O = o(v.entryName), N = l(d, h && !v.isDirectory ? h : g ? O : Se.basename(O));
      if (v.isDirectory) {
        var F = s.getEntryChildren(v);
        return F.forEach(function(P) {
          if (P.isDirectory) return;
          var A = P.getData();
          if (!A)
            throw ye.Errors.CANT_EXTRACT_FILE();
          var x = o(P.entryName), W = l(d, g ? x : Se.basename(x));
          const J = m ? P.header.fileAttr : void 0;
          i.writeFileTo(W, A, y, J);
        }), !0;
      }
      var U = v.getData(s.password);
      if (!U) throw ye.Errors.CANT_EXTRACT_FILE();
      if (i.fs.existsSync(N) && !y)
        throw ye.Errors.CANT_OVERRIDE();
      const R = m ? u.header.fileAttr : void 0;
      return i.writeFileTo(N, U, y, R), !0;
    },
    /**
     * Test the archive
     * @param {string} [pass]
     */
    test: function(u) {
      if (!s)
        return !1;
      for (var d in s.entries)
        try {
          if (d.isDirectory)
            continue;
          var g = s.entries[d].getData(u);
          if (!g)
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
    extractAllTo: function(u, d, g, y) {
      if (g = At(!1, g), y = Wo(g, y), d = At(!1, d), !s) throw ye.Errors.NO_ZIP();
      s.entries.forEach(function(m) {
        var h = l(u, o(m.entryName));
        if (m.isDirectory) {
          i.makeDir(h);
          return;
        }
        var v = m.getData(y);
        if (!v)
          throw ye.Errors.CANT_EXTRACT_FILE();
        const O = g ? m.header.fileAttr : void 0;
        i.writeFileTo(h, v, d, O);
        try {
          i.fs.utimesSync(h, m.header.time, m.header.time);
        } catch {
          throw ye.Errors.CANT_EXTRACT_FILE();
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
    extractAllToAsync: function(u, d, g, y) {
      if (y = JE(d, g, y), g = At(!1, g), d = At(!1, d), !y)
        return new Promise((N, F) => {
          this.extractAllToAsync(u, d, g, function(U) {
            U ? F(U) : N(this);
          });
        });
      if (!s) {
        y(ye.Errors.NO_ZIP());
        return;
      }
      u = Se.resolve(u);
      const m = (N) => l(u, Se.normalize(o(N.entryName))), h = (N, F) => new Error(N + ': "' + F + '"'), v = [], O = [];
      s.entries.forEach((N) => {
        N.isDirectory ? v.push(N) : O.push(N);
      });
      for (const N of v) {
        const F = m(N), U = g ? N.header.fileAttr : void 0;
        try {
          i.makeDir(F), U && i.fs.chmodSync(F, U), i.fs.utimesSync(F, N.header.time, N.header.time);
        } catch {
          y(h("Unable to create folder", F));
        }
      }
      O.reverse().reduce(function(N, F) {
        return function(U) {
          if (U)
            N(U);
          else {
            const R = Se.normalize(o(F.entryName)), P = l(u, R);
            F.getDataAsync(function(A, x) {
              if (x)
                N(x);
              else if (!A)
                N(ye.Errors.CANT_EXTRACT_FILE());
              else {
                const W = g ? F.header.fileAttr : void 0;
                i.writeFileToAsync(P, A, d, W, function(J) {
                  J || N(h("Unable to write file", P)), i.fs.utimes(P, F.header.time, F.header.time, function(k) {
                    k ? N(h("Unable to set times", P)) : N();
                  });
                });
              }
            });
          }
        };
      }, y)();
    },
    /**
     * Writes the newly created zip file to disk at the specified location or if a zip was opened and no ``targetFileName`` is provided, it will overwrite the opened zip
     *
     * @param {string} targetFileName
     * @param {function} callback
     */
    writeZip: function(u, d) {
      if (arguments.length === 1 && typeof u == "function" && (d = u, u = ""), !u && n.filename && (u = n.filename), !!u) {
        var g = s.compressToBuffer();
        if (g) {
          var y = i.writeFileTo(u, g, !0);
          typeof d == "function" && d(y ? null : new Error("failed"), "");
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
    writeZipPromise: function(u, d) {
      const { overwrite: g, perm: y } = Object.assign({ overwrite: !0 }, d);
      return new Promise((m, h) => {
        !u && n.filename && (u = n.filename), u || h("ADM-ZIP: ZIP File Name Missing"), this.toBufferPromise().then((v) => {
          const O = (N) => N ? m(N) : h("ADM-ZIP: Wasn't able to write zip file");
          i.writeFileToAsync(u, v, g, y, O);
        }, h);
      });
    },
    /**
     * @returns {Promise<Buffer>} A promise to the Buffer.
     */
    toBufferPromise: function() {
      return new Promise((u, d) => {
        s.toAsyncBuffer(u, d);
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
    toBuffer: function(u, d, g, y) {
      return typeof u == "function" ? (s.toAsyncBuffer(u, d, g, y), null) : s.compressToBuffer();
    }
  };
};
const Ko = /* @__PURE__ */ ma(QE);
var He = {}, Te = {};
Te.fromCallback = function(e) {
  return Object.defineProperty(function(...t) {
    if (typeof t[t.length - 1] == "function") e.apply(this, t);
    else
      return new Promise((r, n) => {
        t.push((i, s) => i != null ? n(i) : r(s)), e.apply(this, t);
      });
  }, "name", { value: e.name });
};
Te.fromPromise = function(e) {
  return Object.defineProperty(function(...t) {
    const r = t[t.length - 1];
    if (typeof r != "function") return e.apply(this, t);
    t.pop(), e.apply(this, t).then((n) => r(null, n), r);
  }, "name", { value: e.name });
};
var St = Ll, eg = process.cwd, dn = null, tg = process.env.GRACEFUL_FS_PLATFORM || process.platform;
process.cwd = function() {
  return dn || (dn = eg.call(process)), dn;
};
try {
  process.cwd();
} catch {
}
if (typeof process.chdir == "function") {
  var Xo = process.chdir;
  process.chdir = function(e) {
    dn = null, Xo.call(process, e);
  }, Object.setPrototypeOf && Object.setPrototypeOf(process.chdir, Xo);
}
var rg = ng;
function ng(e) {
  St.hasOwnProperty("O_SYMLINK") && process.version.match(/^v0\.6\.[0-2]|^v0\.5\./) && t(e), e.lutimes || r(e), e.chown = s(e.chown), e.fchown = s(e.fchown), e.lchown = s(e.lchown), e.chmod = n(e.chmod), e.fchmod = n(e.fchmod), e.lchmod = n(e.lchmod), e.chownSync = o(e.chownSync), e.fchownSync = o(e.fchownSync), e.lchownSync = o(e.lchownSync), e.chmodSync = i(e.chmodSync), e.fchmodSync = i(e.fchmodSync), e.lchmodSync = i(e.lchmodSync), e.stat = l(e.stat), e.fstat = l(e.fstat), e.lstat = l(e.lstat), e.statSync = a(e.statSync), e.fstatSync = a(e.fstatSync), e.lstatSync = a(e.lstatSync), e.chmod && !e.lchmod && (e.lchmod = function(f, E, S) {
    S && process.nextTick(S);
  }, e.lchmodSync = function() {
  }), e.chown && !e.lchown && (e.lchown = function(f, E, S, u) {
    u && process.nextTick(u);
  }, e.lchownSync = function() {
  }), tg === "win32" && (e.rename = typeof e.rename != "function" ? e.rename : function(f) {
    function E(S, u, d) {
      var g = Date.now(), y = 0;
      f(S, u, function m(h) {
        if (h && (h.code === "EACCES" || h.code === "EPERM" || h.code === "EBUSY") && Date.now() - g < 6e4) {
          setTimeout(function() {
            e.stat(u, function(v, O) {
              v && v.code === "ENOENT" ? f(S, u, m) : d(h);
            });
          }, y), y < 100 && (y += 10);
          return;
        }
        d && d(h);
      });
    }
    return Object.setPrototypeOf && Object.setPrototypeOf(E, f), E;
  }(e.rename)), e.read = typeof e.read != "function" ? e.read : function(f) {
    function E(S, u, d, g, y, m) {
      var h;
      if (m && typeof m == "function") {
        var v = 0;
        h = function(O, N, F) {
          if (O && O.code === "EAGAIN" && v < 10)
            return v++, f.call(e, S, u, d, g, y, h);
          m.apply(this, arguments);
        };
      }
      return f.call(e, S, u, d, g, y, h);
    }
    return Object.setPrototypeOf && Object.setPrototypeOf(E, f), E;
  }(e.read), e.readSync = typeof e.readSync != "function" ? e.readSync : /* @__PURE__ */ function(f) {
    return function(E, S, u, d, g) {
      for (var y = 0; ; )
        try {
          return f.call(e, E, S, u, d, g);
        } catch (m) {
          if (m.code === "EAGAIN" && y < 10) {
            y++;
            continue;
          }
          throw m;
        }
    };
  }(e.readSync);
  function t(f) {
    f.lchmod = function(E, S, u) {
      f.open(
        E,
        St.O_WRONLY | St.O_SYMLINK,
        S,
        function(d, g) {
          if (d) {
            u && u(d);
            return;
          }
          f.fchmod(g, S, function(y) {
            f.close(g, function(m) {
              u && u(y || m);
            });
          });
        }
      );
    }, f.lchmodSync = function(E, S) {
      var u = f.openSync(E, St.O_WRONLY | St.O_SYMLINK, S), d = !0, g;
      try {
        g = f.fchmodSync(u, S), d = !1;
      } finally {
        if (d)
          try {
            f.closeSync(u);
          } catch {
          }
        else
          f.closeSync(u);
      }
      return g;
    };
  }
  function r(f) {
    St.hasOwnProperty("O_SYMLINK") && f.futimes ? (f.lutimes = function(E, S, u, d) {
      f.open(E, St.O_SYMLINK, function(g, y) {
        if (g) {
          d && d(g);
          return;
        }
        f.futimes(y, S, u, function(m) {
          f.close(y, function(h) {
            d && d(m || h);
          });
        });
      });
    }, f.lutimesSync = function(E, S, u) {
      var d = f.openSync(E, St.O_SYMLINK), g, y = !0;
      try {
        g = f.futimesSync(d, S, u), y = !1;
      } finally {
        if (y)
          try {
            f.closeSync(d);
          } catch {
          }
        else
          f.closeSync(d);
      }
      return g;
    }) : f.futimes && (f.lutimes = function(E, S, u, d) {
      d && process.nextTick(d);
    }, f.lutimesSync = function() {
    });
  }
  function n(f) {
    return f && function(E, S, u) {
      return f.call(e, E, S, function(d) {
        c(d) && (d = null), u && u.apply(this, arguments);
      });
    };
  }
  function i(f) {
    return f && function(E, S) {
      try {
        return f.call(e, E, S);
      } catch (u) {
        if (!c(u)) throw u;
      }
    };
  }
  function s(f) {
    return f && function(E, S, u, d) {
      return f.call(e, E, S, u, function(g) {
        c(g) && (g = null), d && d.apply(this, arguments);
      });
    };
  }
  function o(f) {
    return f && function(E, S, u) {
      try {
        return f.call(e, E, S, u);
      } catch (d) {
        if (!c(d)) throw d;
      }
    };
  }
  function l(f) {
    return f && function(E, S, u) {
      typeof S == "function" && (u = S, S = null);
      function d(g, y) {
        y && (y.uid < 0 && (y.uid += 4294967296), y.gid < 0 && (y.gid += 4294967296)), u && u.apply(this, arguments);
      }
      return S ? f.call(e, E, S, d) : f.call(e, E, d);
    };
  }
  function a(f) {
    return f && function(E, S) {
      var u = S ? f.call(e, E, S) : f.call(e, E);
      return u && (u.uid < 0 && (u.uid += 4294967296), u.gid < 0 && (u.gid += 4294967296)), u;
    };
  }
  function c(f) {
    if (!f || f.code === "ENOSYS")
      return !0;
    var E = !process.getuid || process.getuid() !== 0;
    return !!(E && (f.code === "EINVAL" || f.code === "EPERM"));
  }
}
var Zo = Fl.Stream, ig = sg;
function sg(e) {
  return {
    ReadStream: t,
    WriteStream: r
  };
  function t(n, i) {
    if (!(this instanceof t)) return new t(n, i);
    Zo.call(this);
    var s = this;
    this.path = n, this.fd = null, this.readable = !0, this.paused = !1, this.flags = "r", this.mode = 438, this.bufferSize = 64 * 1024, i = i || {};
    for (var o = Object.keys(i), l = 0, a = o.length; l < a; l++) {
      var c = o[l];
      this[c] = i[c];
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
        s._read();
      });
      return;
    }
    e.open(this.path, this.flags, this.mode, function(f, E) {
      if (f) {
        s.emit("error", f), s.readable = !1;
        return;
      }
      s.fd = E, s.emit("open", E), s._read();
    });
  }
  function r(n, i) {
    if (!(this instanceof r)) return new r(n, i);
    Zo.call(this), this.path = n, this.fd = null, this.writable = !0, this.flags = "w", this.encoding = "binary", this.mode = 438, this.bytesWritten = 0, i = i || {};
    for (var s = Object.keys(i), o = 0, l = s.length; o < l; o++) {
      var a = s[o];
      this[a] = i[a];
    }
    if (this.start !== void 0) {
      if (typeof this.start != "number")
        throw TypeError("start must be a Number");
      if (this.start < 0)
        throw new Error("start must be >= zero");
      this.pos = this.start;
    }
    this.busy = !1, this._queue = [], this.fd === null && (this._open = e.open, this._queue.push([this._open, this.path, this.flags, this.mode, void 0]), this.flush());
  }
}
var og = cg, ag = Object.getPrototypeOf || function(e) {
  return e.__proto__;
};
function cg(e) {
  if (e === null || typeof e != "object")
    return e;
  if (e instanceof Object)
    var t = { __proto__: ag(e) };
  else
    var t = /* @__PURE__ */ Object.create(null);
  return Object.getOwnPropertyNames(e).forEach(function(r) {
    Object.defineProperty(t, r, Object.getOwnPropertyDescriptor(e, r));
  }), t;
}
var ge = sr, lg = rg, fg = ig, ug = og, tn = gi, ke, vn;
typeof Symbol == "function" && typeof Symbol.for == "function" ? (ke = Symbol.for("graceful-fs.queue"), vn = Symbol.for("graceful-fs.previous")) : (ke = "___graceful-fs.queue", vn = "___graceful-fs.previous");
function dg() {
}
function qc(e, t) {
  Object.defineProperty(e, ke, {
    get: function() {
      return t;
    }
  });
}
var jt = dg;
tn.debuglog ? jt = tn.debuglog("gfs4") : /\bgfs4\b/i.test(process.env.NODE_DEBUG || "") && (jt = function() {
  var e = tn.format.apply(tn, arguments);
  e = "GFS4: " + e.split(/\n/).join(`
GFS4: `), console.error(e);
});
if (!ge[ke]) {
  var hg = ft[ke] || [];
  qc(ge, hg), ge.close = function(e) {
    function t(r, n) {
      return e.call(ge, r, function(i) {
        i || Jo(), typeof n == "function" && n.apply(this, arguments);
      });
    }
    return Object.defineProperty(t, vn, {
      value: e
    }), t;
  }(ge.close), ge.closeSync = function(e) {
    function t(r) {
      e.apply(ge, arguments), Jo();
    }
    return Object.defineProperty(t, vn, {
      value: e
    }), t;
  }(ge.closeSync), /\bgfs4\b/i.test(process.env.NODE_DEBUG || "") && process.on("exit", function() {
    jt(ge[ke]), da.equal(ge[ke].length, 0);
  });
}
ft[ke] || qc(ft, ge[ke]);
var ur = Ds(ug(ge));
process.env.TEST_GRACEFUL_FS_GLOBAL_PATCH && !ge.__patched && (ur = Ds(ge), ge.__patched = !0);
function Ds(e) {
  lg(e), e.gracefulify = Ds, e.createReadStream = N, e.createWriteStream = F;
  var t = e.readFile;
  e.readFile = r;
  function r(P, A, x) {
    return typeof A == "function" && (x = A, A = null), W(P, A, x);
    function W(J, k, L, V) {
      return t(J, k, function(j) {
        j && (j.code === "EMFILE" || j.code === "ENFILE") ? qt([W, [J, k, L], j, V || Date.now(), Date.now()]) : typeof L == "function" && L.apply(this, arguments);
      });
    }
  }
  var n = e.writeFile;
  e.writeFile = i;
  function i(P, A, x, W) {
    return typeof x == "function" && (W = x, x = null), J(P, A, x, W);
    function J(k, L, V, j, T) {
      return n(k, L, V, function(C) {
        C && (C.code === "EMFILE" || C.code === "ENFILE") ? qt([J, [k, L, V, j], C, T || Date.now(), Date.now()]) : typeof j == "function" && j.apply(this, arguments);
      });
    }
  }
  var s = e.appendFile;
  s && (e.appendFile = o);
  function o(P, A, x, W) {
    return typeof x == "function" && (W = x, x = null), J(P, A, x, W);
    function J(k, L, V, j, T) {
      return s(k, L, V, function(C) {
        C && (C.code === "EMFILE" || C.code === "ENFILE") ? qt([J, [k, L, V, j], C, T || Date.now(), Date.now()]) : typeof j == "function" && j.apply(this, arguments);
      });
    }
  }
  var l = e.copyFile;
  l && (e.copyFile = a);
  function a(P, A, x, W) {
    return typeof x == "function" && (W = x, x = 0), J(P, A, x, W);
    function J(k, L, V, j, T) {
      return l(k, L, V, function(C) {
        C && (C.code === "EMFILE" || C.code === "ENFILE") ? qt([J, [k, L, V, j], C, T || Date.now(), Date.now()]) : typeof j == "function" && j.apply(this, arguments);
      });
    }
  }
  var c = e.readdir;
  e.readdir = E;
  var f = /^v[0-5]\./;
  function E(P, A, x) {
    typeof A == "function" && (x = A, A = null);
    var W = f.test(process.version) ? function(L, V, j, T) {
      return c(L, J(
        L,
        V,
        j,
        T
      ));
    } : function(L, V, j, T) {
      return c(L, V, J(
        L,
        V,
        j,
        T
      ));
    };
    return W(P, A, x);
    function J(k, L, V, j) {
      return function(T, C) {
        T && (T.code === "EMFILE" || T.code === "ENFILE") ? qt([
          W,
          [k, L, V],
          T,
          j || Date.now(),
          Date.now()
        ]) : (C && C.sort && C.sort(), typeof V == "function" && V.call(this, T, C));
      };
    }
  }
  if (process.version.substr(0, 4) === "v0.8") {
    var S = fg(e);
    m = S.ReadStream, v = S.WriteStream;
  }
  var u = e.ReadStream;
  u && (m.prototype = Object.create(u.prototype), m.prototype.open = h);
  var d = e.WriteStream;
  d && (v.prototype = Object.create(d.prototype), v.prototype.open = O), Object.defineProperty(e, "ReadStream", {
    get: function() {
      return m;
    },
    set: function(P) {
      m = P;
    },
    enumerable: !0,
    configurable: !0
  }), Object.defineProperty(e, "WriteStream", {
    get: function() {
      return v;
    },
    set: function(P) {
      v = P;
    },
    enumerable: !0,
    configurable: !0
  });
  var g = m;
  Object.defineProperty(e, "FileReadStream", {
    get: function() {
      return g;
    },
    set: function(P) {
      g = P;
    },
    enumerable: !0,
    configurable: !0
  });
  var y = v;
  Object.defineProperty(e, "FileWriteStream", {
    get: function() {
      return y;
    },
    set: function(P) {
      y = P;
    },
    enumerable: !0,
    configurable: !0
  });
  function m(P, A) {
    return this instanceof m ? (u.apply(this, arguments), this) : m.apply(Object.create(m.prototype), arguments);
  }
  function h() {
    var P = this;
    R(P.path, P.flags, P.mode, function(A, x) {
      A ? (P.autoClose && P.destroy(), P.emit("error", A)) : (P.fd = x, P.emit("open", x), P.read());
    });
  }
  function v(P, A) {
    return this instanceof v ? (d.apply(this, arguments), this) : v.apply(Object.create(v.prototype), arguments);
  }
  function O() {
    var P = this;
    R(P.path, P.flags, P.mode, function(A, x) {
      A ? (P.destroy(), P.emit("error", A)) : (P.fd = x, P.emit("open", x));
    });
  }
  function N(P, A) {
    return new e.ReadStream(P, A);
  }
  function F(P, A) {
    return new e.WriteStream(P, A);
  }
  var U = e.open;
  e.open = R;
  function R(P, A, x, W) {
    return typeof x == "function" && (W = x, x = null), J(P, A, x, W);
    function J(k, L, V, j, T) {
      return U(k, L, V, function(C, b) {
        C && (C.code === "EMFILE" || C.code === "ENFILE") ? qt([J, [k, L, V, j], C, T || Date.now(), Date.now()]) : typeof j == "function" && j.apply(this, arguments);
      });
    }
  }
  return e;
}
function qt(e) {
  jt("ENQUEUE", e[0].name, e[1]), ge[ke].push(e), As();
}
var rn;
function Jo() {
  for (var e = Date.now(), t = 0; t < ge[ke].length; ++t)
    ge[ke][t].length > 2 && (ge[ke][t][3] = e, ge[ke][t][4] = e);
  As();
}
function As() {
  if (clearTimeout(rn), rn = void 0, ge[ke].length !== 0) {
    var e = ge[ke].shift(), t = e[0], r = e[1], n = e[2], i = e[3], s = e[4];
    if (i === void 0)
      jt("RETRY", t.name, r), t.apply(null, r);
    else if (Date.now() - i >= 6e4) {
      jt("TIMEOUT", t.name, r);
      var o = r.pop();
      typeof o == "function" && o.call(null, n);
    } else {
      var l = Date.now() - s, a = Math.max(s - i, 1), c = Math.min(a * 1.2, 100);
      l >= c ? (jt("RETRY", t.name, r), t.apply(null, r.concat([i]))) : ge[ke].push(e);
    }
    rn === void 0 && (rn = setTimeout(As, 0));
  }
}
(function(e) {
  const t = Te.fromCallback, r = ur, n = [
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
  ].filter((i) => typeof r[i] == "function");
  Object.assign(e, r), n.forEach((i) => {
    e[i] = t(r[i]);
  }), e.exists = function(i, s) {
    return typeof s == "function" ? r.exists(i, s) : new Promise((o) => r.exists(i, o));
  }, e.read = function(i, s, o, l, a, c) {
    return typeof c == "function" ? r.read(i, s, o, l, a, c) : new Promise((f, E) => {
      r.read(i, s, o, l, a, (S, u, d) => {
        if (S) return E(S);
        f({ bytesRead: u, buffer: d });
      });
    });
  }, e.write = function(i, s, ...o) {
    return typeof o[o.length - 1] == "function" ? r.write(i, s, ...o) : new Promise((l, a) => {
      r.write(i, s, ...o, (c, f, E) => {
        if (c) return a(c);
        l({ bytesWritten: f, buffer: E });
      });
    });
  }, e.readv = function(i, s, ...o) {
    return typeof o[o.length - 1] == "function" ? r.readv(i, s, ...o) : new Promise((l, a) => {
      r.readv(i, s, ...o, (c, f, E) => {
        if (c) return a(c);
        l({ bytesRead: f, buffers: E });
      });
    });
  }, e.writev = function(i, s, ...o) {
    return typeof o[o.length - 1] == "function" ? r.writev(i, s, ...o) : new Promise((l, a) => {
      r.writev(i, s, ...o, (c, f, E) => {
        if (c) return a(c);
        l({ bytesWritten: f, buffers: E });
      });
    });
  }, typeof r.realpath.native == "function" ? e.realpath.native = t(r.realpath.native) : process.emitWarning(
    "fs.realpath.native is not a function. Is fs being monkey-patched?",
    "Warning",
    "fs-extra-WARN0003"
  );
})(He);
var Ls = {}, Wc = {};
const mg = be;
Wc.checkPath = function(t) {
  if (process.platform === "win32" && /[<>:"|?*]/.test(t.replace(mg.parse(t).root, ""))) {
    const n = new Error(`Path contains invalid characters: ${t}`);
    throw n.code = "EINVAL", n;
  }
};
const Kc = He, { checkPath: Xc } = Wc, Zc = (e) => {
  const t = { mode: 511 };
  return typeof e == "number" ? e : { ...t, ...e }.mode;
};
Ls.makeDir = async (e, t) => (Xc(e), Kc.mkdir(e, {
  mode: Zc(t),
  recursive: !0
}));
Ls.makeDirSync = (e, t) => (Xc(e), Kc.mkdirSync(e, {
  mode: Zc(t),
  recursive: !0
}));
const pg = Te.fromPromise, { makeDir: yg, makeDirSync: Qn } = Ls, ei = pg(yg);
var pt = {
  mkdirs: ei,
  mkdirsSync: Qn,
  // alias
  mkdirp: ei,
  mkdirpSync: Qn,
  ensureDir: ei,
  ensureDirSync: Qn
};
const Eg = Te.fromPromise, Jc = He;
function gg(e) {
  return Jc.access(e).then(() => !0).catch(() => !1);
}
var Ut = {
  pathExists: Eg(gg),
  pathExistsSync: Jc.existsSync
};
const Yt = He, $g = Te.fromPromise;
async function vg(e, t, r) {
  const n = await Yt.open(e, "r+");
  let i = null;
  try {
    await Yt.futimes(n, t, r);
  } finally {
    try {
      await Yt.close(n);
    } catch (s) {
      i = s;
    }
  }
  if (i)
    throw i;
}
function _g(e, t, r) {
  const n = Yt.openSync(e, "r+");
  return Yt.futimesSync(n, t, r), Yt.closeSync(n);
}
var Yc = {
  utimesMillis: $g(vg),
  utimesMillisSync: _g
};
const nr = He, Ce = be, Yo = Te.fromPromise;
function Sg(e, t, r) {
  const n = r.dereference ? (i) => nr.stat(i, { bigint: !0 }) : (i) => nr.lstat(i, { bigint: !0 });
  return Promise.all([
    n(e),
    n(t).catch((i) => {
      if (i.code === "ENOENT") return null;
      throw i;
    })
  ]).then(([i, s]) => ({ srcStat: i, destStat: s }));
}
function wg(e, t, r) {
  let n;
  const i = r.dereference ? (o) => nr.statSync(o, { bigint: !0 }) : (o) => nr.lstatSync(o, { bigint: !0 }), s = i(e);
  try {
    n = i(t);
  } catch (o) {
    if (o.code === "ENOENT") return { srcStat: s, destStat: null };
    throw o;
  }
  return { srcStat: s, destStat: n };
}
async function bg(e, t, r, n) {
  const { srcStat: i, destStat: s } = await Sg(e, t, n);
  if (s) {
    if (zr(i, s)) {
      const o = Ce.basename(e), l = Ce.basename(t);
      if (r === "move" && o !== l && o.toLowerCase() === l.toLowerCase())
        return { srcStat: i, destStat: s, isChangingCase: !0 };
      throw new Error("Source and destination must not be the same.");
    }
    if (i.isDirectory() && !s.isDirectory())
      throw new Error(`Cannot overwrite non-directory '${t}' with directory '${e}'.`);
    if (!i.isDirectory() && s.isDirectory())
      throw new Error(`Cannot overwrite directory '${t}' with non-directory '${e}'.`);
  }
  if (i.isDirectory() && Fs(e, t))
    throw new Error(Mn(e, t, r));
  return { srcStat: i, destStat: s };
}
function Og(e, t, r, n) {
  const { srcStat: i, destStat: s } = wg(e, t, n);
  if (s) {
    if (zr(i, s)) {
      const o = Ce.basename(e), l = Ce.basename(t);
      if (r === "move" && o !== l && o.toLowerCase() === l.toLowerCase())
        return { srcStat: i, destStat: s, isChangingCase: !0 };
      throw new Error("Source and destination must not be the same.");
    }
    if (i.isDirectory() && !s.isDirectory())
      throw new Error(`Cannot overwrite non-directory '${t}' with directory '${e}'.`);
    if (!i.isDirectory() && s.isDirectory())
      throw new Error(`Cannot overwrite directory '${t}' with non-directory '${e}'.`);
  }
  if (i.isDirectory() && Fs(e, t))
    throw new Error(Mn(e, t, r));
  return { srcStat: i, destStat: s };
}
async function Qc(e, t, r, n) {
  const i = Ce.resolve(Ce.dirname(e)), s = Ce.resolve(Ce.dirname(r));
  if (s === i || s === Ce.parse(s).root) return;
  let o;
  try {
    o = await nr.stat(s, { bigint: !0 });
  } catch (l) {
    if (l.code === "ENOENT") return;
    throw l;
  }
  if (zr(t, o))
    throw new Error(Mn(e, r, n));
  return Qc(e, t, s, n);
}
function el(e, t, r, n) {
  const i = Ce.resolve(Ce.dirname(e)), s = Ce.resolve(Ce.dirname(r));
  if (s === i || s === Ce.parse(s).root) return;
  let o;
  try {
    o = nr.statSync(s, { bigint: !0 });
  } catch (l) {
    if (l.code === "ENOENT") return;
    throw l;
  }
  if (zr(t, o))
    throw new Error(Mn(e, r, n));
  return el(e, t, s, n);
}
function zr(e, t) {
  return t.ino && t.dev && t.ino === e.ino && t.dev === e.dev;
}
function Fs(e, t) {
  const r = Ce.resolve(e).split(Ce.sep).filter((i) => i), n = Ce.resolve(t).split(Ce.sep).filter((i) => i);
  return r.every((i, s) => n[s] === i);
}
function Mn(e, t, r) {
  return `Cannot ${r} '${e}' to a subdirectory of itself, '${t}'.`;
}
var dr = {
  // checkPaths
  checkPaths: Yo(bg),
  checkPathsSync: Og,
  // checkParent
  checkParentPaths: Yo(Qc),
  checkParentPathsSync: el,
  // Misc
  isSrcSubdir: Fs,
  areIdentical: zr
};
const Me = He, Dr = be, { mkdirs: Ig } = pt, { pathExists: Ng } = Ut, { utimesMillis: Pg } = Yc, Ar = dr;
async function Tg(e, t, r = {}) {
  typeof r == "function" && (r = { filter: r }), r.clobber = "clobber" in r ? !!r.clobber : !0, r.overwrite = "overwrite" in r ? !!r.overwrite : r.clobber, r.preserveTimestamps && process.arch === "ia32" && process.emitWarning(
    `Using the preserveTimestamps option in 32-bit node is not recommended;

	see https://github.com/jprichardson/node-fs-extra/issues/269`,
    "Warning",
    "fs-extra-WARN0001"
  );
  const { srcStat: n, destStat: i } = await Ar.checkPaths(e, t, "copy", r);
  if (await Ar.checkParentPaths(e, n, t, "copy"), !await tl(e, t, r)) return;
  const o = Dr.dirname(t);
  await Ng(o) || await Ig(o), await rl(i, e, t, r);
}
async function tl(e, t, r) {
  return r.filter ? r.filter(e, t) : !0;
}
async function rl(e, t, r, n) {
  const s = await (n.dereference ? Me.stat : Me.lstat)(t);
  if (s.isDirectory()) return Ag(s, e, t, r, n);
  if (s.isFile() || s.isCharacterDevice() || s.isBlockDevice()) return Rg(s, e, t, r, n);
  if (s.isSymbolicLink()) return Lg(e, t, r, n);
  throw s.isSocket() ? new Error(`Cannot copy a socket file: ${t}`) : s.isFIFO() ? new Error(`Cannot copy a FIFO pipe: ${t}`) : new Error(`Unknown file: ${t}`);
}
async function Rg(e, t, r, n, i) {
  if (!t) return Qo(e, r, n, i);
  if (i.overwrite)
    return await Me.unlink(n), Qo(e, r, n, i);
  if (i.errorOnExist)
    throw new Error(`'${n}' already exists`);
}
async function Qo(e, t, r, n) {
  if (await Me.copyFile(t, r), n.preserveTimestamps) {
    Cg(e.mode) && await Dg(r, e.mode);
    const i = await Me.stat(t);
    await Pg(r, i.atime, i.mtime);
  }
  return Me.chmod(r, e.mode);
}
function Cg(e) {
  return (e & 128) === 0;
}
function Dg(e, t) {
  return Me.chmod(e, t | 128);
}
async function Ag(e, t, r, n, i) {
  t || await Me.mkdir(n);
  const s = await Me.readdir(r);
  await Promise.all(s.map(async (o) => {
    const l = Dr.join(r, o), a = Dr.join(n, o);
    if (!await tl(l, a, i)) return;
    const { destStat: f } = await Ar.checkPaths(l, a, "copy", i);
    return rl(f, l, a, i);
  })), t || await Me.chmod(n, e.mode);
}
async function Lg(e, t, r, n) {
  let i = await Me.readlink(t);
  if (n.dereference && (i = Dr.resolve(process.cwd(), i)), !e)
    return Me.symlink(i, r);
  let s = null;
  try {
    s = await Me.readlink(r);
  } catch (o) {
    if (o.code === "EINVAL" || o.code === "UNKNOWN") return Me.symlink(i, r);
    throw o;
  }
  if (n.dereference && (s = Dr.resolve(process.cwd(), s)), Ar.isSrcSubdir(i, s))
    throw new Error(`Cannot copy '${i}' to a subdirectory of itself, '${s}'.`);
  if (Ar.isSrcSubdir(s, i))
    throw new Error(`Cannot overwrite '${s}' with '${i}'.`);
  return await Me.unlink(r), Me.symlink(i, r);
}
var Fg = Tg;
const Ve = ur, Lr = be, kg = pt.mkdirsSync, jg = Yc.utimesMillisSync, Fr = dr;
function Mg(e, t, r) {
  typeof r == "function" && (r = { filter: r }), r = r || {}, r.clobber = "clobber" in r ? !!r.clobber : !0, r.overwrite = "overwrite" in r ? !!r.overwrite : r.clobber, r.preserveTimestamps && process.arch === "ia32" && process.emitWarning(
    `Using the preserveTimestamps option in 32-bit node is not recommended;

	see https://github.com/jprichardson/node-fs-extra/issues/269`,
    "Warning",
    "fs-extra-WARN0002"
  );
  const { srcStat: n, destStat: i } = Fr.checkPathsSync(e, t, "copy", r);
  if (Fr.checkParentPathsSync(e, n, t, "copy"), r.filter && !r.filter(e, t)) return;
  const s = Lr.dirname(t);
  return Ve.existsSync(s) || kg(s), nl(i, e, t, r);
}
function nl(e, t, r, n) {
  const s = (n.dereference ? Ve.statSync : Ve.lstatSync)(t);
  if (s.isDirectory()) return Hg(s, e, t, r, n);
  if (s.isFile() || s.isCharacterDevice() || s.isBlockDevice()) return xg(s, e, t, r, n);
  if (s.isSymbolicLink()) return Kg(e, t, r, n);
  throw s.isSocket() ? new Error(`Cannot copy a socket file: ${t}`) : s.isFIFO() ? new Error(`Cannot copy a FIFO pipe: ${t}`) : new Error(`Unknown file: ${t}`);
}
function xg(e, t, r, n, i) {
  return t ? Ug(e, r, n, i) : il(e, r, n, i);
}
function Ug(e, t, r, n) {
  if (n.overwrite)
    return Ve.unlinkSync(r), il(e, t, r, n);
  if (n.errorOnExist)
    throw new Error(`'${r}' already exists`);
}
function il(e, t, r, n) {
  return Ve.copyFileSync(t, r), n.preserveTimestamps && zg(e.mode, t, r), ks(r, e.mode);
}
function zg(e, t, r) {
  return Vg(e) && Gg(r, e), Bg(t, r);
}
function Vg(e) {
  return (e & 128) === 0;
}
function Gg(e, t) {
  return ks(e, t | 128);
}
function ks(e, t) {
  return Ve.chmodSync(e, t);
}
function Bg(e, t) {
  const r = Ve.statSync(e);
  return jg(t, r.atime, r.mtime);
}
function Hg(e, t, r, n, i) {
  return t ? sl(r, n, i) : qg(e.mode, r, n, i);
}
function qg(e, t, r, n) {
  return Ve.mkdirSync(r), sl(t, r, n), ks(r, e);
}
function sl(e, t, r) {
  Ve.readdirSync(e).forEach((n) => Wg(n, e, t, r));
}
function Wg(e, t, r, n) {
  const i = Lr.join(t, e), s = Lr.join(r, e);
  if (n.filter && !n.filter(i, s)) return;
  const { destStat: o } = Fr.checkPathsSync(i, s, "copy", n);
  return nl(o, i, s, n);
}
function Kg(e, t, r, n) {
  let i = Ve.readlinkSync(t);
  if (n.dereference && (i = Lr.resolve(process.cwd(), i)), e) {
    let s;
    try {
      s = Ve.readlinkSync(r);
    } catch (o) {
      if (o.code === "EINVAL" || o.code === "UNKNOWN") return Ve.symlinkSync(i, r);
      throw o;
    }
    if (n.dereference && (s = Lr.resolve(process.cwd(), s)), Fr.isSrcSubdir(i, s))
      throw new Error(`Cannot copy '${i}' to a subdirectory of itself, '${s}'.`);
    if (Fr.isSrcSubdir(s, i))
      throw new Error(`Cannot overwrite '${s}' with '${i}'.`);
    return Xg(i, r);
  } else
    return Ve.symlinkSync(i, r);
}
function Xg(e, t) {
  return Ve.unlinkSync(t), Ve.symlinkSync(e, t);
}
var Zg = Mg;
const Jg = Te.fromPromise;
var js = {
  copy: Jg(Fg),
  copySync: Zg
};
const ol = ur, Yg = Te.fromCallback;
function Qg(e, t) {
  ol.rm(e, { recursive: !0, force: !0 }, t);
}
function e$(e) {
  ol.rmSync(e, { recursive: !0, force: !0 });
}
var xn = {
  remove: Yg(Qg),
  removeSync: e$
};
const t$ = Te.fromPromise, al = He, cl = be, ll = pt, fl = xn, ea = t$(async function(t) {
  let r;
  try {
    r = await al.readdir(t);
  } catch {
    return ll.mkdirs(t);
  }
  return Promise.all(r.map((n) => fl.remove(cl.join(t, n))));
});
function ta(e) {
  let t;
  try {
    t = al.readdirSync(e);
  } catch {
    return ll.mkdirsSync(e);
  }
  t.forEach((r) => {
    r = cl.join(e, r), fl.removeSync(r);
  });
}
var r$ = {
  emptyDirSync: ta,
  emptydirSync: ta,
  emptyDir: ea,
  emptydir: ea
};
const n$ = Te.fromPromise, ul = be, yt = He, dl = pt;
async function i$(e) {
  let t;
  try {
    t = await yt.stat(e);
  } catch {
  }
  if (t && t.isFile()) return;
  const r = ul.dirname(e);
  let n = null;
  try {
    n = await yt.stat(r);
  } catch (i) {
    if (i.code === "ENOENT") {
      await dl.mkdirs(r), await yt.writeFile(e, "");
      return;
    } else
      throw i;
  }
  n.isDirectory() ? await yt.writeFile(e, "") : await yt.readdir(r);
}
function s$(e) {
  let t;
  try {
    t = yt.statSync(e);
  } catch {
  }
  if (t && t.isFile()) return;
  const r = ul.dirname(e);
  try {
    yt.statSync(r).isDirectory() || yt.readdirSync(r);
  } catch (n) {
    if (n && n.code === "ENOENT") dl.mkdirsSync(r);
    else throw n;
  }
  yt.writeFileSync(e, "");
}
var o$ = {
  createFile: n$(i$),
  createFileSync: s$
};
const a$ = Te.fromPromise, hl = be, Ot = He, ml = pt, { pathExists: c$ } = Ut, { areIdentical: pl } = dr;
async function l$(e, t) {
  let r;
  try {
    r = await Ot.lstat(t);
  } catch {
  }
  let n;
  try {
    n = await Ot.lstat(e);
  } catch (o) {
    throw o.message = o.message.replace("lstat", "ensureLink"), o;
  }
  if (r && pl(n, r)) return;
  const i = hl.dirname(t);
  await c$(i) || await ml.mkdirs(i), await Ot.link(e, t);
}
function f$(e, t) {
  let r;
  try {
    r = Ot.lstatSync(t);
  } catch {
  }
  try {
    const s = Ot.lstatSync(e);
    if (r && pl(s, r)) return;
  } catch (s) {
    throw s.message = s.message.replace("lstat", "ensureLink"), s;
  }
  const n = hl.dirname(t);
  return Ot.existsSync(n) || ml.mkdirsSync(n), Ot.linkSync(e, t);
}
var u$ = {
  createLink: a$(l$),
  createLinkSync: f$
};
const Tt = be, Tr = He, { pathExists: d$ } = Ut, h$ = Te.fromPromise;
async function m$(e, t) {
  if (Tt.isAbsolute(e)) {
    try {
      await Tr.lstat(e);
    } catch (s) {
      throw s.message = s.message.replace("lstat", "ensureSymlink"), s;
    }
    return {
      toCwd: e,
      toDst: e
    };
  }
  const r = Tt.dirname(t), n = Tt.join(r, e);
  if (await d$(n))
    return {
      toCwd: n,
      toDst: e
    };
  try {
    await Tr.lstat(e);
  } catch (s) {
    throw s.message = s.message.replace("lstat", "ensureSymlink"), s;
  }
  return {
    toCwd: e,
    toDst: Tt.relative(r, e)
  };
}
function p$(e, t) {
  if (Tt.isAbsolute(e)) {
    if (!Tr.existsSync(e)) throw new Error("absolute srcpath does not exist");
    return {
      toCwd: e,
      toDst: e
    };
  }
  const r = Tt.dirname(t), n = Tt.join(r, e);
  if (Tr.existsSync(n))
    return {
      toCwd: n,
      toDst: e
    };
  if (!Tr.existsSync(e)) throw new Error("relative srcpath does not exist");
  return {
    toCwd: e,
    toDst: Tt.relative(r, e)
  };
}
var y$ = {
  symlinkPaths: h$(m$),
  symlinkPathsSync: p$
};
const yl = He, E$ = Te.fromPromise;
async function g$(e, t) {
  if (t) return t;
  let r;
  try {
    r = await yl.lstat(e);
  } catch {
    return "file";
  }
  return r && r.isDirectory() ? "dir" : "file";
}
function $$(e, t) {
  if (t) return t;
  let r;
  try {
    r = yl.lstatSync(e);
  } catch {
    return "file";
  }
  return r && r.isDirectory() ? "dir" : "file";
}
var v$ = {
  symlinkType: E$(g$),
  symlinkTypeSync: $$
};
const _$ = Te.fromPromise, El = be, ct = He, { mkdirs: S$, mkdirsSync: w$ } = pt, { symlinkPaths: b$, symlinkPathsSync: O$ } = y$, { symlinkType: I$, symlinkTypeSync: N$ } = v$, { pathExists: P$ } = Ut, { areIdentical: gl } = dr;
async function T$(e, t, r) {
  let n;
  try {
    n = await ct.lstat(t);
  } catch {
  }
  if (n && n.isSymbolicLink()) {
    const [l, a] = await Promise.all([
      ct.stat(e),
      ct.stat(t)
    ]);
    if (gl(l, a)) return;
  }
  const i = await b$(e, t);
  e = i.toDst;
  const s = await I$(i.toCwd, r), o = El.dirname(t);
  return await P$(o) || await S$(o), ct.symlink(e, t, s);
}
function R$(e, t, r) {
  let n;
  try {
    n = ct.lstatSync(t);
  } catch {
  }
  if (n && n.isSymbolicLink()) {
    const l = ct.statSync(e), a = ct.statSync(t);
    if (gl(l, a)) return;
  }
  const i = O$(e, t);
  e = i.toDst, r = N$(i.toCwd, r);
  const s = El.dirname(t);
  return ct.existsSync(s) || w$(s), ct.symlinkSync(e, t, r);
}
var C$ = {
  createSymlink: _$(T$),
  createSymlinkSync: R$
};
const { createFile: ra, createFileSync: na } = o$, { createLink: ia, createLinkSync: sa } = u$, { createSymlink: oa, createSymlinkSync: aa } = C$;
var D$ = {
  // file
  createFile: ra,
  createFileSync: na,
  ensureFile: ra,
  ensureFileSync: na,
  // link
  createLink: ia,
  createLinkSync: sa,
  ensureLink: ia,
  ensureLinkSync: sa,
  // symlink
  createSymlink: oa,
  createSymlinkSync: aa,
  ensureSymlink: oa,
  ensureSymlinkSync: aa
};
function A$(e, { EOL: t = `
`, finalEOL: r = !0, replacer: n = null, spaces: i } = {}) {
  const s = r ? t : "";
  return JSON.stringify(e, n, i).replace(/\n/g, t) + s;
}
function L$(e) {
  return Buffer.isBuffer(e) && (e = e.toString("utf8")), e.replace(/^\uFEFF/, "");
}
var Ms = { stringify: A$, stripBom: L$ };
let ir;
try {
  ir = ur;
} catch {
  ir = sr;
}
const Un = Te, { stringify: $l, stripBom: vl } = Ms;
async function F$(e, t = {}) {
  typeof t == "string" && (t = { encoding: t });
  const r = t.fs || ir, n = "throws" in t ? t.throws : !0;
  let i = await Un.fromCallback(r.readFile)(e, t);
  i = vl(i);
  let s;
  try {
    s = JSON.parse(i, t ? t.reviver : null);
  } catch (o) {
    if (n)
      throw o.message = `${e}: ${o.message}`, o;
    return null;
  }
  return s;
}
const k$ = Un.fromPromise(F$);
function j$(e, t = {}) {
  typeof t == "string" && (t = { encoding: t });
  const r = t.fs || ir, n = "throws" in t ? t.throws : !0;
  try {
    let i = r.readFileSync(e, t);
    return i = vl(i), JSON.parse(i, t.reviver);
  } catch (i) {
    if (n)
      throw i.message = `${e}: ${i.message}`, i;
    return null;
  }
}
async function M$(e, t, r = {}) {
  const n = r.fs || ir, i = $l(t, r);
  await Un.fromCallback(n.writeFile)(e, i, r);
}
const x$ = Un.fromPromise(M$);
function U$(e, t, r = {}) {
  const n = r.fs || ir, i = $l(t, r);
  return n.writeFileSync(e, i, r);
}
const z$ = {
  readFile: k$,
  readFileSync: j$,
  writeFile: x$,
  writeFileSync: U$
};
var V$ = z$;
const nn = V$;
var G$ = {
  // jsonfile exports
  readJson: nn.readFile,
  readJsonSync: nn.readFileSync,
  writeJson: nn.writeFile,
  writeJsonSync: nn.writeFileSync
};
const B$ = Te.fromPromise, yi = He, _l = be, Sl = pt, H$ = Ut.pathExists;
async function q$(e, t, r = "utf-8") {
  const n = _l.dirname(e);
  return await H$(n) || await Sl.mkdirs(n), yi.writeFile(e, t, r);
}
function W$(e, ...t) {
  const r = _l.dirname(e);
  yi.existsSync(r) || Sl.mkdirsSync(r), yi.writeFileSync(e, ...t);
}
var xs = {
  outputFile: B$(q$),
  outputFileSync: W$
};
const { stringify: K$ } = Ms, { outputFile: X$ } = xs;
async function Z$(e, t, r = {}) {
  const n = K$(t, r);
  await X$(e, n, r);
}
var J$ = Z$;
const { stringify: Y$ } = Ms, { outputFileSync: Q$ } = xs;
function ev(e, t, r) {
  const n = Y$(t, r);
  Q$(e, n, r);
}
var tv = ev;
const rv = Te.fromPromise, Ge = G$;
Ge.outputJson = rv(J$);
Ge.outputJsonSync = tv;
Ge.outputJSON = Ge.outputJson;
Ge.outputJSONSync = Ge.outputJsonSync;
Ge.writeJSON = Ge.writeJson;
Ge.writeJSONSync = Ge.writeJsonSync;
Ge.readJSON = Ge.readJson;
Ge.readJSONSync = Ge.readJsonSync;
var nv = Ge;
const iv = He, ca = be, { copy: sv } = js, { remove: wl } = xn, { mkdirp: ov } = pt, { pathExists: av } = Ut, la = dr;
async function cv(e, t, r = {}) {
  const n = r.overwrite || r.clobber || !1, { srcStat: i, isChangingCase: s = !1 } = await la.checkPaths(e, t, "move", r);
  await la.checkParentPaths(e, i, t, "move");
  const o = ca.dirname(t);
  return ca.parse(o).root !== o && await ov(o), lv(e, t, n, s);
}
async function lv(e, t, r, n) {
  if (!n) {
    if (r)
      await wl(t);
    else if (await av(t))
      throw new Error("dest already exists.");
  }
  try {
    await iv.rename(e, t);
  } catch (i) {
    if (i.code !== "EXDEV")
      throw i;
    await fv(e, t, r);
  }
}
async function fv(e, t, r) {
  return await sv(e, t, {
    overwrite: r,
    errorOnExist: !0,
    preserveTimestamps: !0
  }), wl(e);
}
var uv = cv;
const bl = ur, Ei = be, dv = js.copySync, Ol = xn.removeSync, hv = pt.mkdirpSync, fa = dr;
function mv(e, t, r) {
  r = r || {};
  const n = r.overwrite || r.clobber || !1, { srcStat: i, isChangingCase: s = !1 } = fa.checkPathsSync(e, t, "move", r);
  return fa.checkParentPathsSync(e, i, t, "move"), pv(t) || hv(Ei.dirname(t)), yv(e, t, n, s);
}
function pv(e) {
  const t = Ei.dirname(e);
  return Ei.parse(t).root === t;
}
function yv(e, t, r, n) {
  if (n) return ti(e, t, r);
  if (r)
    return Ol(t), ti(e, t, r);
  if (bl.existsSync(t)) throw new Error("dest already exists.");
  return ti(e, t, r);
}
function ti(e, t, r) {
  try {
    bl.renameSync(e, t);
  } catch (n) {
    if (n.code !== "EXDEV") throw n;
    return Ev(e, t, r);
  }
}
function Ev(e, t, r) {
  return dv(e, t, {
    overwrite: r,
    errorOnExist: !0,
    preserveTimestamps: !0
  }), Ol(e);
}
var gv = mv;
const $v = Te.fromPromise;
var vv = {
  move: $v(uv),
  moveSync: gv
}, Ye = {
  // Export promiseified graceful-fs:
  ...He,
  // Export extra methods:
  ...js,
  ...r$,
  ...D$,
  ...nv,
  ...pt,
  ...vv,
  ...xs,
  ...Ut,
  ...xn
};
class Il {
  constructor(t, r) {
    this.bw = t, this.version = r, t.webContents.on("devtools-opened", () => this.#c()), ue.handle("openDevTools", () => t.webContents.openDevTools()), this.#u.getVersion = r, ue.handle("getInfo", () => this.#u), ue.handle("inited", (i, s, o) => this.#m(s, o)), ue.handle("existsSync", (i, s) => Ye.existsSync(s)), ue.handle("copySync", (i, s, o) => Ye.copySync(s, o)), ue.handle("removeSync", (i, s) => Ye.removeSync(s)), ue.handle("ensureFileSync", (i, s) => Ye.ensureFileSync(s)), ue.handle("readFileSync", (i, s) => Ye.readFileSync(s, { encoding: "utf8" })), ue.handle("writeFileSync", (i, s, o, l) => Ye.writeFileSync(s, o, l)), ue.handle("appendFile", (i, s, o) => Ye.appendFile(s, o).catch((l) => console.log(l))), ue.handle("outputFile", (i, s, o) => Ye.outputFile(s, o).catch((l) => console.log(l))), ue.handle("win_close", () => t.close()), ue.handle("win_setTitle", (i, s) => t.setTitle(s)), ue.handle("showMessageBox", (i, s) => Tl.showMessageBox(s)), ue.handle("capturePage", (i, s, o, l) => t.webContents.capturePage().then((a) => {
      Ye.ensureFileSync(s);
      const c = a.resize({ width: o, height: l, quality: "best" }), f = s.endsWith(".png") ? c.toPNG() : c.toJPEG(80);
      Ye.writeFileSync(s, f);
    })), ue.handle("navigate_to", (i, s) => Rl.openExternal(s));
    let n;
    ue.handle("Store", (i, s) => {
      n = new zo(s);
    }), ue.handle("flush", (i, s) => {
      n.store = s;
    }), ue.handle("Store_isEmpty", () => n.size === 0), ue.handle("Store_get", () => n.store), ue.handle("zip", (i, s, o) => {
      const l = new Ko();
      l.addLocalFolder(s), l.writeZip(o);
    }), ue.handle("unzip", (i, s, o) => {
      Ye.removeSync(o), Ye.ensureDirSync(o), new Ko(s).extractAllTo(o, !0);
    }), ue.handle("isSimpleFullScreen", () => t.simpleFullScreen), zn.isWin ? (ue.handle("setSimpleFullScreen", (i, s) => {
      this.#e = !0, t.setSimpleFullScreen(s), s || (t.setPosition(this.#o, this.#a), t.setContentSize(this.#r, this.#n)), this.#e = !1;
    }), t.on("enter-full-screen", () => {
      t.setContentSize(this.#t.width, this.#t.height);
    }), t.on("leave-full-screen", () => {
      this.#s(!1, this.#o, this.#a, this.#r, this.#n);
    })) : ue.handle("setSimpleFullScreen", (i, s) => {
      t.setSimpleFullScreen(s), !s && t.setContentSize(this.#r, this.#n);
    }), ue.handle("window", (i, s, o, l, a, c) => this.#s(s, o, l, a, c)), t.on("move", () => this.#f()), t.on("resize", () => this.#f()), this.#d();
  }
  static initRenderer(t, r) {
    let n, i = () => {
    };
    try {
      zo.initRenderer(), n = new Cl({
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
      const s = new Il(n, r);
      i = () => s.openDevTools();
    } catch (s) {
      throw console.error(`early err:${s}`), i(), "initRenderer error";
    }
    return n.on("ready-to-show", () => n.show()), ue.on("ping", () => console.log("pong")), n;
  }
  #u = {
    getAppPath: Vr.getAppPath(),
    isPackaged: Vr.isPackaged,
    downloads: Vr.getPath("downloads"),
    userData: Vr.getPath("userData"),
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
  #m(t, r) {
    const { c: n, x: i, y: s, w: o, h: l } = r;
    if (this.#i = o / l, zn.isWin || this.bw.setAspectRatio(this.#i), this.#s(n, i, s, o, l), this.bw.show(), t.debug.devtool) {
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
    const t = Us.getCursorScreenPoint(), r = Us.getDisplayNearestPoint(t);
    this.#t = r.workAreaSize;
  }
  #l = void 0;
  #h = !1;
  #e = !1;
  #f() {
    if (this.#l || this.#e) return;
    this.#e = !0;
    const [t, r] = this.bw.getPosition(), [n, i] = this.bw.getContentSize();
    this.#l = setTimeout(() => {
      if (this.#l = void 0, this.#h) {
        this.#h = !1;
        return;
      }
      this.#e = !1;
      const [s = 0, o = 0] = this.bw.getPosition(), [l = 0, a = 0] = this.bw.getContentSize();
      if (t !== s || r !== o || n !== l || i !== a) {
        this.#f();
        return;
      }
      this.#s(!1, s, o, l, a);
    }, 1e3 / 60 * 10);
  }
  #s(t, r, n, i, s) {
    this.#e || (this.#e = !0, !this.bw.simpleFullScreen && (t && (this.#d(), r = (this.#t.width - i) * 0.5, n = (this.#t.height - s) * 0.5), this.#o = r = Math.round(r), this.#a = n = Math.round(n), this.bw.setPosition(r, n), zn.isWin && (this.#r !== i ? s = i / this.#i : i = s * this.#i), this.#r = i = Math.round(i), this.#n = s = Math.round(s), this.bw.setContentSize(i, s), this.bw.webContents.send("save_win_inf", { c: t, x: r, y: n, w: i, h: s, scrw: this.#t.width, scrh: this.#t.height }), this.#e = !1));
  }
}
export {
  Il as appMain
};
//# sourceMappingURL=appMain.js.map
