import { c as H } from "./_commonjsHelpers.js";
var G = { exports: {} };
/*!
 * Platform.js v1.3.6
 * Copyright 2014-2020 Benjamin Tan
 * Copyright 2011-2013 John-David Dalton
 * Available under MIT license
 */
var me = G.exports, ee;
function xe() {
  return ee || (ee = 1, function(b, l) {
    (function() {
      var d = {
        function: !0,
        object: !0
      }, u = d[typeof window] && window || this, m = l, O = b && !b.nodeType && b, g = m && O && typeof H == "object" && H;
      g && (g.global === g || g.window === g || g.self === g) && (u = g);
      var E = Math.pow(2, 53) - 1, S = /\bOpera/, M = Object.prototype, P = M.hasOwnProperty, N = M.toString;
      function J(t) {
        return t = String(t), t.charAt(0).toUpperCase() + t.slice(1);
      }
      function te(t, a, p) {
        var v = {
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
        return a && p && /^Win/i.test(t) && !/^Windows Phone /i.test(t) && (v = v[/[\d.]+$/.exec(t)]) && (t = "Windows " + v), t = String(t), a && p && (t = t.replace(RegExp(a, "i"), p)), t = T(
          t.replace(/ ce$/i, " CE").replace(/\bhpw/i, "web").replace(/\bMacintosh\b/, "Mac OS").replace(/_PowerPC\b/i, " OS").replace(/\b(OS X) [^ \d]+/i, "$1").replace(/\bMac (OS X)\b/, "$1").replace(/\/(\d)/, " $1").replace(/_/g, ".").replace(/(?: BePC|[ .]*fc[ \d.]+)$/i, "").replace(/\bx86\.64\b/gi, "x86_64").replace(/\b(Windows Phone) OS\b/, "$1").replace(/\b(Chrome OS \w+) [\d.]+\b/, "$1").split(" on ")[0]
        ), t;
      }
      function ie(t, a) {
        var p = -1, v = t ? t.length : 0;
        if (typeof v == "number" && v > -1 && v <= E)
          for (; ++p < v; )
            a(t[p], p, t);
        else
          R(t, a);
      }
      function T(t) {
        return t = z(t), /^(?:webOS|i(?:OS|P))/.test(t) ? t : J(t);
      }
      function R(t, a) {
        for (var p in t)
          P.call(t, p) && a(t[p], p, t);
      }
      function B(t) {
        return t == null ? J(t) : N.call(t).slice(8, -1);
      }
      function re(t, a) {
        var p = t != null ? typeof t[a] : "number";
        return !/^(?:boolean|number|string|undefined)$/.test(p) && (p == "object" ? !!t[a] : !0);
      }
      function k(t) {
        return String(t).replace(/([ -])(?!$)/g, "$1?");
      }
      function W(t, a) {
        var p = null;
        return ie(t, function(v, L) {
          p = a(p, v, L, t);
        }), p;
      }
      function z(t) {
        return String(t).replace(/^ +| +$/g, "");
      }
      function K(t) {
        var a = u, p = t && typeof t == "object" && B(t) != "String";
        p && (a = t, t = null);
        var v = a.navigator || {}, L = v.userAgent || "";
        t || (t = L);
        var ne = p ? !!v.likeChrome : /\bChrome\b/.test(t) && !/internal|\n/i.test(N.toString()), X = "Object", oe = p ? X : "ScriptBridgingProxyObject", ae = p ? X : "Environment", se = p && a.java ? "JavaPackage" : B(a.java), le = p ? X : "RuntimeObject", I = /\bJava/.test(se) && a.java, fe = I && B(a.environment) == ae, ce = I ? "a" : "α", be = I ? "b" : "β", q = a.document || {}, $ = a.operamini || a.opera, D = S.test(D = p && $ ? $["[[Class]]"] : B($)) ? D : $ = null, e, U = t, s = [], V = null, F = t == L, n = F && $ && typeof $.version == "function" && $.version(), _, f = pe([
          { label: "EdgeHTML", pattern: "Edge" },
          "Trident",
          { label: "WebKit", pattern: "AppleWebKit" },
          "iCab",
          "Presto",
          "NetFront",
          "Tasman",
          "KHTML",
          "Gecko"
        ]), i = de([
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
        ]), o = Z([
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
        ]), x = he({
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
        function pe(w) {
          return W(w, function(h, c) {
            return h || RegExp("\\b" + (c.pattern || k(c)) + "\\b", "i").exec(t) && (c.label || c);
          });
        }
        function he(w) {
          return W(w, function(h, c, C) {
            return h || (c[o] || c[/^[a-z]+(?: +[a-z]+\b)*/i.exec(o)] || RegExp("\\b" + k(C) + "(?:\\b|\\w*\\d)", "i").exec(t)) && C;
          });
        }
        function de(w) {
          return W(w, function(h, c) {
            return h || RegExp("\\b" + (c.pattern || k(c)) + "\\b", "i").exec(t) && (c.label || c);
          });
        }
        function ue(w) {
          return W(w, function(h, c) {
            var C = c.pattern || k(c);
            return !h && (h = RegExp("\\b" + C + "(?:/[\\d.]+|[ \\w.]*)", "i").exec(t)) && (h = te(h, C, c.label || c)), h;
          });
        }
        function Z(w) {
          return W(w, function(h, c) {
            var C = c.pattern || k(c);
            return !h && (h = RegExp("\\b" + C + " *\\d+[.\\w_]*", "i").exec(t) || RegExp("\\b" + C + " *\\w+-[\\w]*", "i").exec(t) || RegExp("\\b" + C + "(?:; *(?:[a-z]+[_-])?[a-z]+\\d+|[^ ();-]*)", "i").exec(t)) && ((h = String(c.label && !RegExp(C, "i").test(c.label) ? c.label : h).split("/"))[1] && !/[\d.]+/.test(h[0]) && (h[0] += " " + h[1]), c = c.label || c, h = T(h[0].replace(RegExp(C, "i"), c).replace(RegExp("; *(?:" + c + "[_-])?", "i"), " ").replace(RegExp("(" + c + ")[-_.]?(\\w)", "i"), "$1 $2"))), h;
          });
        }
        function Q(w) {
          return W(w, function(h, c) {
            return h || (RegExp(c + "(?:-[\\d.]+/|(?: for [\\w-]+)?[ /-])([\\d.]+[^ ();/_-]*)", "i").exec(t) || 0)[1] || null;
          });
        }
        function ge() {
          return this.description || "";
        }
        if (f && (f = [f]), /\bAndroid\b/.test(r) && !o && (e = /\bAndroid[^;]*;(.*?)(?:Build|\) AppleWebKit)\b/i.exec(t)) && (o = z(e[1]).replace(/^[a-z]{2}-[a-z]{2};\s*/i, "") || null), x && !o ? o = Z([x]) : x && o && (o = o.replace(RegExp("^(" + k(x) + ")[-_.\\s]", "i"), x + " ").replace(RegExp("^(" + k(x) + ")[-_.]?(\\w)", "i"), x + " $2")), (e = /\bGoogle TV\b/.exec(o)) && (o = e[0]), /\bSimulator\b/i.test(t) && (o = (o ? o + " " : "") + "Simulator"), i == "Opera Mini" && /\bOPiOS\b/.test(t) && s.push("running in Turbo/Uncompressed mode"), i == "IE" && /\blike iPhone OS\b/.test(t) ? (e = K(t.replace(/like iPhone OS/, "")), x = e.manufacturer, o = e.product) : /^iP/.test(o) ? (i || (i = "Safari"), r = "iOS" + ((e = / OS ([\d_]+)/i.exec(t)) ? " " + e[1].replace(/_/g, ".") : "")) : i == "Konqueror" && /^Linux\b/i.test(r) ? r = "Kubuntu" : x && x != "Google" && (/Chrome/.test(i) && !/\bMobile Safari\b/i.test(t) || /\bVita\b/.test(o)) || /\bAndroid\b/.test(r) && /^Chrome/.test(i) && /\bVersion\//i.test(t) ? (i = "Android Browser", r = /\bAndroid\b/.test(r) ? r : "Android") : i == "Silk" ? (/\bMobi/i.test(t) || (r = "Android", s.unshift("desktop mode")), /Accelerated *= *true/i.test(t) && s.unshift("accelerated")) : i == "UC Browser" && /\bUCWEB\b/.test(t) ? s.push("speed mode") : i == "PaleMoon" && (e = /\bFirefox\/([\d.]+)\b/.exec(t)) ? s.push("identifying as Firefox " + e[1]) : i == "Firefox" && (e = /\b(Mobile|Tablet|TV)\b/i.exec(t)) ? (r || (r = "Firefox OS"), o || (o = e[1])) : !i || (e = !/\bMinefield\b/i.test(t) && /\b(?:Firefox|Safari)\b/.exec(i)) ? (i && !o && /[\/,]|^[^(]+?\)/.test(t.slice(t.indexOf(e + "/") + 8)) && (i = null), (e = o || x || r) && (o || x || /\b(?:Android|Symbian OS|Tablet OS|webOS)\b/.test(r)) && (i = /[a-z]+(?: Hat)?/i.exec(/\bAndroid\b/.test(r) ? r : e) + " Browser")) : i == "Electron" && (e = (/\bChrome\/([\d.]+)\b/.exec(t) || 0)[1]) && s.push("Chromium " + e), n || (n = Q([
          "(?:Cloud9|CriOS|CrMo|Edge|Edg|EdgA|EdgiOS|FxiOS|HeadlessChrome|IEMobile|Iron|Opera ?Mini|OPiOS|OPR|Raven|SamsungBrowser|Silk(?!/[\\d.]+$)|UCBrowser|YaBrowser)",
          "Version",
          k(i),
          "(?:Firefox|Minefield|NetFront)"
        ])), (e = f == "iCab" && parseFloat(n) > 3 && "WebKit" || /\bOpera\b/.test(i) && (/\bOPR\b/.test(t) ? "Blink" : "Presto") || /\b(?:Midori|Nook|Safari)\b/i.test(t) && !/^(?:Trident|EdgeHTML)$/.test(f) && "WebKit" || !f && /\bMSIE\b/i.test(t) && (r == "Mac OS" ? "Tasman" : "Trident") || f == "WebKit" && /\bPlayStation\b(?! Vita\b)/i.test(i) && "NetFront") && (f = [e]), i == "IE" && (e = (/; *(?:XBLWP|ZuneWP)(\d+)/i.exec(t) || 0)[1]) ? (i += " Mobile", r = "Windows Phone " + (/\+$/.test(e) ? e : e + ".x"), s.unshift("desktop mode")) : /\bWPDesktop\b/i.test(t) ? (i = "IE Mobile", r = "Windows Phone 8.x", s.unshift("desktop mode"), n || (n = (/\brv:([\d.]+)/.exec(t) || 0)[1])) : i != "IE" && f == "Trident" && (e = /\brv:([\d.]+)/.exec(t)) && (i && s.push("identifying as " + i + (n ? " " + n : "")), i = "IE", n = e[1]), F) {
          if (re(a, "global"))
            if (I && (e = I.lang.System, U = e.getProperty("os.arch"), r = r || e.getProperty("os.name") + " " + e.getProperty("os.version")), fe) {
              try {
                n = a.require("ringo/engine").version.join("."), i = "RingoJS";
              } catch {
                (e = a.system) && e.global.system == a.system && (i = "Narwhal", r || (r = e[0].os || null));
              }
              i || (i = "Rhino");
            } else typeof a.process == "object" && !a.process.browser && (e = a.process) && (typeof e.versions == "object" && (typeof e.versions.electron == "string" ? (s.push("Node " + e.versions.node), i = "Electron", n = e.versions.electron) : typeof e.versions.nw == "string" && (s.push("Chromium " + n, "Node " + e.versions.node), i = "NW.js", n = e.versions.nw)), i || (i = "Node.js", U = e.arch, r = e.platform, n = /[\d.]+/.exec(e.version), n = n ? n[0] : null));
          else B(e = a.runtime) == oe ? (i = "Adobe AIR", r = e.flash.system.Capabilities.os) : B(e = a.phantom) == le ? (i = "PhantomJS", n = (e = e.version || null) && e.major + "." + e.minor + "." + e.patch) : typeof q.documentMode == "number" && (e = /\bTrident\/(\d+)/i.exec(t)) ? (n = [n, q.documentMode], (e = +e[1] + 4) != n[1] && (s.push("IE " + n[1] + " mode"), f && (f[1] = ""), n[1] = e), n = i == "IE" ? String(n[1].toFixed(1)) : n[0]) : typeof q.documentMode == "number" && /^(?:Chrome|Firefox)\b/.test(i) && (s.push("masking as " + i + " " + n), i = "IE", n = "11.0", f = ["Trident"], r = "Windows");
          r = r && T(r);
        }
        if (n && (e = /(?:[ab]|dp|pre|[ab]\d+pre)(?:\d+\+?)?$/i.exec(n) || /(?:alpha|beta)(?: ?\d)?/i.exec(t + ";" + (F && v.appMinorVersion)) || /\bMinefield\b/i.test(t) && "a") && (V = /b/i.test(e) ? "beta" : "alpha", n = n.replace(RegExp(e + "\\+?$"), "") + (V == "beta" ? be : ce) + (/\d+\+?/.exec(e) || "")), i == "Fennec" || i == "Firefox" && /\b(?:Android|Firefox OS|KaiOS)\b/.test(r))
          i = "Firefox Mobile";
        else if (i == "Maxthon" && n)
          n = n.replace(/\.[\d.]+/, ".x");
        else if (/\bXbox\b/i.test(o))
          o == "Xbox 360" && (r = null), o == "Xbox 360" && /\bIEMobile\b/.test(t) && s.unshift("mobile mode");
        else if ((/^(?:Chrome|IE|Opera)$/.test(i) || i && !o && !/Browser|Mobi/.test(i)) && (r == "Windows CE" || /Mobi/i.test(t)))
          i += " Mobile";
        else if (i == "IE" && F)
          try {
            a.external === null && s.unshift("platform preview");
          } catch {
            s.unshift("embedded");
          }
        else (/\bBlackBerry\b/.test(o) || /\bBB10\b/.test(t)) && (e = (RegExp(o.replace(/ +/g, " *") + "/([.\\d]+)", "i").exec(t) || 0)[1] || n) ? (e = [e, /BB10/.test(t)], r = (e[1] ? (o = null, x = "BlackBerry") : "Device Software") + " " + e[0], n = null) : this != R && o != "Wii" && (F && $ || /Opera/.test(i) && /\b(?:MSIE|Firefox)\b/i.test(t) || i == "Firefox" && /\bOS X (?:\d+\.){2,}/.test(r) || i == "IE" && (r && !/^Win/.test(r) && n > 5.5 || /\bWindows XP\b/.test(r) && n > 8 || n == 8 && !/\bTrident\b/.test(t))) && !S.test(e = K.call(R, t.replace(S, "") + ";")) && e.name && (e = "ing as " + e.name + ((e = e.version) ? " " + e : ""), S.test(i) ? (/\bIE\b/.test(e) && r == "Mac OS" && (r = null), e = "identify" + e) : (e = "mask" + e, D ? i = T(D.replace(/([a-z])([A-Z])/g, "$1 $2")) : i = "Opera", /\bIE\b/.test(e) && (r = null), F || (n = null)), f = ["Presto"], s.push(e));
        (e = (/\bAppleWebKit\/([\d.]+\+?)/i.exec(t) || 0)[1]) && (e = [parseFloat(e.replace(/\.(\d)$/, ".0$1")), e], i == "Safari" && e[1].slice(-1) == "+" ? (i = "WebKit Nightly", V = "alpha", n = e[1].slice(0, -1)) : (n == e[1] || n == (e[2] = (/\bSafari\/([\d.]+\+?)/i.exec(t) || 0)[1])) && (n = null), e[1] = (/\b(?:Headless)?Chrome\/([\d.]+)/i.exec(t) || 0)[1], e[0] == 537.36 && e[2] == 537.36 && parseFloat(e[1]) >= 28 && f == "WebKit" && (f = ["Blink"]), !F || !ne && !e[1] ? (f && (f[1] = "like Safari"), e = (e = e[0], e < 400 ? 1 : e < 500 ? 2 : e < 526 ? 3 : e < 533 ? 4 : e < 534 ? "4+" : e < 535 ? 5 : e < 537 ? 6 : e < 538 ? 7 : e < 601 ? 8 : e < 602 ? 9 : e < 604 ? 10 : e < 606 ? 11 : e < 608 ? 12 : "12")) : (f && (f[1] = "like Chrome"), e = e[1] || (e = e[0], e < 530 ? 1 : e < 532 ? 2 : e < 532.05 ? 3 : e < 533 ? 4 : e < 534.03 ? 5 : e < 534.07 ? 6 : e < 534.1 ? 7 : e < 534.13 ? 8 : e < 534.16 ? 9 : e < 534.24 ? 10 : e < 534.3 ? 11 : e < 535.01 ? 12 : e < 535.02 ? "13+" : e < 535.07 ? 15 : e < 535.11 ? 16 : e < 535.19 ? 17 : e < 536.05 ? 18 : e < 536.1 ? 19 : e < 537.01 ? 20 : e < 537.11 ? "21+" : e < 537.13 ? 23 : e < 537.18 ? 24 : e < 537.24 ? 25 : e < 537.36 ? 26 : f != "Blink" ? "27" : "28")), f && (f[1] += " " + (e += typeof e == "number" ? ".x" : /[.+]/.test(e) ? "" : "+")), i == "Safari" && (!n || parseInt(n) > 45) ? n = e : i == "Chrome" && /\bHeadlessChrome/i.test(t) && s.unshift("headless")), i == "Opera" && (e = /\bzbov|zvav$/.exec(r)) ? (i += " ", s.unshift("desktop mode"), e == "zvav" ? (i += "Mini", n = null) : i += "Mobile", r = r.replace(RegExp(" *" + e + "$"), "")) : i == "Safari" && /\bChrome\b/.exec(f && f[1]) ? (s.unshift("desktop mode"), i = "Chrome Mobile", n = null, /\bOS X\b/.test(r) ? (x = "Apple", r = "iOS 4.3+") : r = null) : /\bSRWare Iron\b/.test(i) && !n && (n = Q("Chrome")), n && n.indexOf(e = /[\d.]+$/.exec(r)) == 0 && t.indexOf("/" + e + "-") > -1 && (r = z(r.replace(e, ""))), r && r.indexOf(i) != -1 && !RegExp(i + " OS").test(r) && (r = r.replace(RegExp(" *" + k(i) + " *"), "")), f && !/\b(?:Avant|Nook)\b/.test(i) && (/Browser|Lunascape|Maxthon/.test(i) || i != "Safari" && /^iOS/.test(r) && /\bSafari\b/.test(f[1]) || /^(?:Adobe|Arora|Breach|Midori|Opera|Phantom|Rekonq|Rock|Samsung Internet|Sleipnir|SRWare Iron|Vivaldi|Web)/.test(i) && f[1]) && (e = f[f.length - 1]) && s.push(e), s.length && (s = ["(" + s.join("; ") + ")"]), x && o && o.indexOf(x) < 0 && s.push("on " + x), o && s.push((/^on /.test(s[s.length - 1]) ? "" : "on ") + o), r && (e = / ([\d.+]+)$/.exec(r), _ = e && r.charAt(r.length - e[0].length - 1) == "/", r = {
          architecture: 32,
          family: e && !_ ? r.replace(e[0], "") : r,
          version: e ? e[1] : null,
          toString: function() {
            var w = this.version;
            return this.family + (w && !_ ? " " + w : "") + (this.architecture == 64 ? " 64-bit" : "");
          }
        }), (e = /\b(?:AMD|IA|Win|WOW|x86_|x)64\b/i.exec(U)) && !/\bi686\b/i.test(U) ? (r && (r.architecture = 64, r.family = r.family.replace(RegExp(" *" + e), "")), i && (/\bWOW64\b/i.test(t) || F && /\w(?:86|32)$/.test(v.cpuClass || v.platform) && !/\bWin64; x64\b/i.test(t)) && s.unshift("32-bit")) : r && /^OS X/.test(r.family) && i == "Chrome" && parseFloat(n) >= 39 && (r.architecture = 64), t || (t = null);
        var y = {};
        return y.description = t, y.layout = f && f[0], y.manufacturer = x, y.name = i, y.prerelease = V, y.product = o, y.ua = t, y.version = i && n, y.os = r || {
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
        }, y.parse = K, y.toString = ge, y.version && s.unshift(n), y.name && s.unshift(i), r && i && !(r == String(r).split(" ")[0] && (r == i.split(" ")[0] || o)) && s.push(o ? "(" + r + ")" : "on " + r), s.length && (y.description = s.join(" ")), y;
      }
      var Y = K();
      m && O ? R(Y, function(t, a) {
        m[a] = t;
      }) : u.platform = Y;
    }).call(me);
  }(G, G.exports)), G.exports;
}
var j = xe();
function A(b) {
  return parseInt(String(b), 10);
}
function ye(b) {
  const l = parseInt(String(b), 10);
  return l < 0 ? -l : l;
}
"toInt" in String.prototype || (String.prototype.toInt = function() {
  return A(this);
});
"toUint" in String.prototype || (String.prototype.toUint = function() {
  const b = A(this);
  return b < 0 ? -b : b;
});
const Se = /^[^\/\.]+$|[^\/]+(?=\.)/;
function Me(b) {
  return (b.match(Se) ?? [""])[0];
}
class Pe {
  static stageW = 0;
  static stageH = 0;
  static debugLog = !1;
  static isSafari = j.name === "Safari";
  static isFirefox = j.name === "Firefox";
  static isMac = /OS X/.test(j.os?.family ?? "");
  static isWin = /Windows/.test(j.os?.family ?? "");
  static isMobile = !/(Windows|OS X)/.test(j.os?.family ?? "");
  static hDip = {};
  static isDbg = !1;
  static isPackaged = !1;
  static isDarkMode = !1;
  static cc4ColorName;
}
var ve = /* @__PURE__ */ ((b) => (b.DEFAULT = "", b.SP_GSM = "png|jpg|jpeg|json|svg|webp|mp4|webm", b.SCRIPT = "sn|ssn", b.FONT = "woff2|woff|otf|ttf", b.SOUND = "mp3|m4a|ogg|aac|flac|wav", b.HTML = "htm|html", b.CSS = "css", b.SN = "sn", b.TST_PNGPNG_ = "png|png_", b.TST_HH = "hh", b.TST_EEE = "eee", b.TST_GGG = "ggg", b.TST_PNGXML = "png|xml", b))(ve || {});
const we = {
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
class Ce {
  constructor(l) {
    this.sys = l;
  }
  oCfg = we;
  userFnTail = "";
  // 4tst public
  hPathFn2Exts = {};
  async load(l) {
    if (this.oCfg.save_ns = l?.save_ns ?? this.oCfg.save_ns, this.oCfg.window.width = Number(l?.window?.width ?? this.oCfg.window.width), this.oCfg.window.height = Number(l?.window?.height ?? this.oCfg.window.height), this.oCfg.book = { ...this.oCfg.book, ...l.book }, this.oCfg.log.max_len = l.log?.max_len ?? this.oCfg.log.max_len, this.oCfg.init = { ...this.oCfg.init, ...l.init }, this.oCfg.debug = { ...this.oCfg.debug, ...l.debug }, this.oCfg.debuger_token = l.debuger_token, await this.sys.loadPath(this.hPathFn2Exts, this), this.#e = this.matchPath(
      "^breakline$",
      "png|jpg|jpeg|json|svg|webp|mp4|webm"
      /* SP_GSM */
    ).length > 0, this.#t = this.matchPath(
      "^breakpage$",
      "png|jpg|jpeg|json|svg|webp|mp4|webm"
      /* SP_GSM */
    ).length > 0, this.sys.arg.crypto)
      for (const [d, u] of Object.entries(this.hPathFn2Exts))
        for (const [m, O] of Object.entries(u)) {
          if (!m.startsWith(":") || !m.endsWith(":id")) continue;
          const g = O.slice(O.lastIndexOf("/") + 1), E = u[m.slice(0, -10)] ?? "", M = await (await this.sys.fetch(E)).text(), P = this.sys.hash(M);
          if (g !== P) throw `ファイル改竄エラーです fn:${E}`;
        }
    else
      for (const [d, u] of Object.entries(this.hPathFn2Exts))
        for (const m of Object.keys(u))
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
  #i = /([^\/\s]+)\.([^\d]\w+)/;
  // 4 match 498 step(~1ms)  https://regex101.com/r/tpVgmI/1
  searchPath(l, d = "") {
    if (!l) throw "[searchPath] fnが空です";
    if (l.startsWith("http://")) return l;
    const u = l.match(this.#i);
    let m = u ? u[1] : l;
    const O = u ? u[2] : "";
    if (this.userFnTail) {
      const S = m + "@@" + this.userFnTail;
      if (S in this.hPathFn2Exts) {
        if (d === "") m = S;
        else for (const M of Object.keys(this.hPathFn2Exts[S] ?? {}))
          if (`|${d}|`.includes(`|${M}|`)) {
            m = S;
            break;
          }
      }
    }
    const g = this.hPathFn2Exts[m];
    if (!g) throw `サーチパスに存在しないファイル【${l}】です`;
    if (!O) {
      const S = A(g[":cnt"]);
      if (d === "") {
        if (S > 1) throw `指定ファイル【${l}】が複数マッチします。サーチ対象拡張子群【${d}】で絞り込むか、ファイル名を個別にして下さい。`;
        return l;
      }
      const M = `|${d}|`;
      if (S > 1) {
        let P = 0;
        for (const N of Object.keys(g))
          if (M.includes(`|${N}|`) && ++P > 1)
            throw `指定ファイル【${l}】が複数マッチします。サーチ対象拡張子群【${d}】で絞り込むか、ファイル名を個別にして下さい。`;
      }
      for (const P of Object.keys(g))
        if (M.includes(`|${P}|`)) return g[P];
      throw `サーチ対象拡張子群【${d}】にマッチするファイルがサーチパスに存在しません。探索ファイル名=【${l}】`;
    }
    if (d !== "" && !`|${d}|`.includes(`|${O}|`))
      throw `指定ファイルの拡張子【${O}】は、サーチ対象拡張子群【${d}】にマッチしません。探索ファイル名=【${l}】`;
    const E = g[O];
    if (!E) throw `サーチパスに存在しない拡張子【${O}】です。探索ファイル名=【${l}】、サーチ対象拡張子群【${d}】`;
    return E;
  }
  matchPath(l, d = "") {
    const u = [], m = new RegExp(l), O = new RegExp(d);
    for (const [g, E] of Object.entries(this.hPathFn2Exts)) {
      if (g.search(m) === -1) continue;
      if (d === "") {
        u.push(E);
        continue;
      }
      const S = {};
      let M = !1;
      for (const P of Object.keys(E))
        P.search(O) !== -1 && (S[P] = g, M = !0);
      M && u.push(S);
    }
    return u;
  }
  addPath(l, d) {
    const u = {};
    for (const [m, O] of Object.entries(d))
      u[m] = (m.startsWith(":") ? "" : this.sys.arg.cur) + O;
    this.hPathFn2Exts[l] = u;
  }
}
export {
  Ce as C,
  ve as S,
  Pe as a,
  Me as g,
  ye as u
};
//# sourceMappingURL=ConfigBase.js.map
