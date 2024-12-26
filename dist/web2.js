function Dr(e, t) {
  for (var n = 0; n < t.length; n++) {
    const o = t[n];
    if (typeof o != "string" && !Array.isArray(o)) {
      for (const s in o)
        if (s !== "default" && !(s in e)) {
          const f = Object.getOwnPropertyDescriptor(o, s);
          f && Object.defineProperty(e, s, f.get ? f : {
            enumerable: !0,
            get: () => o[s]
          });
        }
    }
  }
  return Object.freeze(Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }));
}
var rr = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function zr(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
function $o(e) {
  if (e.__esModule) return e;
  var t = e.default;
  if (typeof t == "function") {
    var n = function o() {
      return this instanceof o ? Reflect.construct(t, arguments, this.constructor) : t.apply(this, arguments);
    };
    n.prototype = t.prototype;
  } else n = {};
  return Object.defineProperty(n, "__esModule", { value: !0 }), Object.keys(e).forEach(function(o) {
    var s = Object.getOwnPropertyDescriptor(e, o);
    Object.defineProperty(n, o, s.get ? s : {
      enumerable: !0,
      get: function() {
        return e[o];
      }
    });
  }), n;
}
var Ze = { exports: {} };
/*!
 * Platform.js v1.3.6
 * Copyright 2014-2020 Benjamin Tan
 * Copyright 2011-2013 John-David Dalton
 * Available under MIT license
 */
var Hr = Ze.exports, nr;
function qr() {
  return nr || (nr = 1, function(e, t) {
    (function() {
      var n = {
        function: !0,
        object: !0
      }, o = n[typeof window] && window || this, s = t, f = e && !e.nodeType && e, p = s && f && typeof rr == "object" && rr;
      p && (p.global === p || p.window === p || p.self === p) && (o = p);
      var w = Math.pow(2, 53) - 1, _ = /\bOpera/, S = Object.prototype, y = S.hasOwnProperty, k = S.toString;
      function ue(l) {
        return l = String(l), l.charAt(0).toUpperCase() + l.slice(1);
      }
      function re(l, L, ee) {
        var fe = {
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
        return L && ee && /^Win/i.test(l) && !/^Windows Phone /i.test(l) && (fe = fe[/[\d.]+$/.exec(l)]) && (l = "Windows " + fe), l = String(l), L && ee && (l = l.replace(RegExp(L, "i"), ee)), l = W(
          l.replace(/ ce$/i, " CE").replace(/\bhpw/i, "web").replace(/\bMacintosh\b/, "Mac OS").replace(/_PowerPC\b/i, " OS").replace(/\b(OS X) [^ \d]+/i, "$1").replace(/\bMac (OS X)\b/, "$1").replace(/\/(\d)/, " $1").replace(/_/g, ".").replace(/(?: BePC|[ .]*fc[ \d.]+)$/i, "").replace(/\bx86\.64\b/gi, "x86_64").replace(/\b(Windows Phone) OS\b/, "$1").replace(/\b(Chrome OS \w+) [\d.]+\b/, "$1").split(" on ")[0]
        ), l;
      }
      function D(l, L) {
        var ee = -1, fe = l ? l.length : 0;
        if (typeof fe == "number" && fe > -1 && fe <= w)
          for (; ++ee < fe; )
            L(l[ee], ee, l);
        else
          z(l, L);
      }
      function W(l) {
        return l = h(l), /^(?:webOS|i(?:OS|P))/.test(l) ? l : ue(l);
      }
      function z(l, L) {
        for (var ee in l)
          y.call(l, ee) && L(l[ee], ee, l);
      }
      function F(l) {
        return l == null ? ue(l) : k.call(l).slice(8, -1);
      }
      function J(l, L) {
        var ee = l != null ? typeof l[L] : "number";
        return !/^(?:boolean|number|string|undefined)$/.test(ee) && (ee == "object" ? !!l[L] : !0);
      }
      function Y(l) {
        return String(l).replace(/([ -])(?!$)/g, "$1?");
      }
      function V(l, L) {
        var ee = null;
        return D(l, function(fe, we) {
          ee = L(ee, fe, we, l);
        }), ee;
      }
      function h(l) {
        return String(l).replace(/^ +| +$/g, "");
      }
      function X(l) {
        var L = o, ee = l && typeof l == "object" && F(l) != "String";
        ee && (L = l, l = null);
        var fe = L.navigator || {}, we = fe.userAgent || "";
        l || (l = we);
        var xe = ee ? !!fe.likeChrome : /\bChrome\b/.test(l) && !/internal|\n/i.test(k.toString()), Ce = "Object", Se = ee ? Ce : "ScriptBridgingProxyObject", be = ee ? Ce : "Environment", Pe = ee && L.java ? "JavaPackage" : F(L.java), Me = ee ? Ce : "RuntimeObject", Q = /\bJava/.test(Pe) && L.java, c = Q && F(L.environment) == be, v = Q ? "a" : "α", N = Q ? "b" : "β", M = L.document || {}, I = L.operamini || L.opera, te = _.test(te = ee && I ? I["[[Class]]"] : F(I)) ? te : I = null, i, he = l, P = [], Oe = null, ge = l == we, C = ge && I && typeof I.version == "function" && I.version(), R, G = ze([
          { label: "EdgeHTML", pattern: "Edge" },
          "Trident",
          { label: "WebKit", pattern: "AppleWebKit" },
          "iCab",
          "Presto",
          "NetFront",
          "Tasman",
          "KHTML",
          "Gecko"
        ]), m = Ue([
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
        ]), B = O([
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
        ]), le = Fe({
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
        }), g = a([
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
        function ze(U) {
          return V(U, function(x, E) {
            return x || RegExp("\\b" + (E.pattern || Y(E)) + "\\b", "i").exec(l) && (E.label || E);
          });
        }
        function Fe(U) {
          return V(U, function(x, E, de) {
            return x || (E[B] || E[/^[a-z]+(?: +[a-z]+\b)*/i.exec(B)] || RegExp("\\b" + Y(de) + "(?:\\b|\\w*\\d)", "i").exec(l)) && de;
          });
        }
        function Ue(U) {
          return V(U, function(x, E) {
            return x || RegExp("\\b" + (E.pattern || Y(E)) + "\\b", "i").exec(l) && (E.label || E);
          });
        }
        function a(U) {
          return V(U, function(x, E) {
            var de = E.pattern || Y(E);
            return !x && (x = RegExp("\\b" + de + "(?:/[\\d.]+|[ \\w.]*)", "i").exec(l)) && (x = re(x, de, E.label || E)), x;
          });
        }
        function O(U) {
          return V(U, function(x, E) {
            var de = E.pattern || Y(E);
            return !x && (x = RegExp("\\b" + de + " *\\d+[.\\w_]*", "i").exec(l) || RegExp("\\b" + de + " *\\w+-[\\w]*", "i").exec(l) || RegExp("\\b" + de + "(?:; *(?:[a-z]+[_-])?[a-z]+\\d+|[^ ();-]*)", "i").exec(l)) && ((x = String(E.label && !RegExp(de, "i").test(E.label) ? E.label : x).split("/"))[1] && !/[\d.]+/.test(x[0]) && (x[0] += " " + x[1]), E = E.label || E, x = W(x[0].replace(RegExp(de, "i"), E).replace(RegExp("; *(?:" + E + "[_-])?", "i"), " ").replace(RegExp("(" + E + ")[-_.]?(\\w)", "i"), "$1 $2"))), x;
          });
        }
        function T(U) {
          return V(U, function(x, E) {
            return x || (RegExp(E + "(?:-[\\d.]+/|(?: for [\\w-]+)?[ /-])([\\d.]+[^ ();/_-]*)", "i").exec(l) || 0)[1] || null;
          });
        }
        function q() {
          return this.description || "";
        }
        if (G && (G = [G]), /\bAndroid\b/.test(g) && !B && (i = /\bAndroid[^;]*;(.*?)(?:Build|\) AppleWebKit)\b/i.exec(l)) && (B = h(i[1]).replace(/^[a-z]{2}-[a-z]{2};\s*/i, "") || null), le && !B ? B = O([le]) : le && B && (B = B.replace(RegExp("^(" + Y(le) + ")[-_.\\s]", "i"), le + " ").replace(RegExp("^(" + Y(le) + ")[-_.]?(\\w)", "i"), le + " $2")), (i = /\bGoogle TV\b/.exec(B)) && (B = i[0]), /\bSimulator\b/i.test(l) && (B = (B ? B + " " : "") + "Simulator"), m == "Opera Mini" && /\bOPiOS\b/.test(l) && P.push("running in Turbo/Uncompressed mode"), m == "IE" && /\blike iPhone OS\b/.test(l) ? (i = X(l.replace(/like iPhone OS/, "")), le = i.manufacturer, B = i.product) : /^iP/.test(B) ? (m || (m = "Safari"), g = "iOS" + ((i = / OS ([\d_]+)/i.exec(l)) ? " " + i[1].replace(/_/g, ".") : "")) : m == "Konqueror" && /^Linux\b/i.test(g) ? g = "Kubuntu" : le && le != "Google" && (/Chrome/.test(m) && !/\bMobile Safari\b/i.test(l) || /\bVita\b/.test(B)) || /\bAndroid\b/.test(g) && /^Chrome/.test(m) && /\bVersion\//i.test(l) ? (m = "Android Browser", g = /\bAndroid\b/.test(g) ? g : "Android") : m == "Silk" ? (/\bMobi/i.test(l) || (g = "Android", P.unshift("desktop mode")), /Accelerated *= *true/i.test(l) && P.unshift("accelerated")) : m == "UC Browser" && /\bUCWEB\b/.test(l) ? P.push("speed mode") : m == "PaleMoon" && (i = /\bFirefox\/([\d.]+)\b/.exec(l)) ? P.push("identifying as Firefox " + i[1]) : m == "Firefox" && (i = /\b(Mobile|Tablet|TV)\b/i.exec(l)) ? (g || (g = "Firefox OS"), B || (B = i[1])) : !m || (i = !/\bMinefield\b/i.test(l) && /\b(?:Firefox|Safari)\b/.exec(m)) ? (m && !B && /[\/,]|^[^(]+?\)/.test(l.slice(l.indexOf(i + "/") + 8)) && (m = null), (i = B || le || g) && (B || le || /\b(?:Android|Symbian OS|Tablet OS|webOS)\b/.test(g)) && (m = /[a-z]+(?: Hat)?/i.exec(/\bAndroid\b/.test(g) ? g : i) + " Browser")) : m == "Electron" && (i = (/\bChrome\/([\d.]+)\b/.exec(l) || 0)[1]) && P.push("Chromium " + i), C || (C = T([
          "(?:Cloud9|CriOS|CrMo|Edge|Edg|EdgA|EdgiOS|FxiOS|HeadlessChrome|IEMobile|Iron|Opera ?Mini|OPiOS|OPR|Raven|SamsungBrowser|Silk(?!/[\\d.]+$)|UCBrowser|YaBrowser)",
          "Version",
          Y(m),
          "(?:Firefox|Minefield|NetFront)"
        ])), (i = G == "iCab" && parseFloat(C) > 3 && "WebKit" || /\bOpera\b/.test(m) && (/\bOPR\b/.test(l) ? "Blink" : "Presto") || /\b(?:Midori|Nook|Safari)\b/i.test(l) && !/^(?:Trident|EdgeHTML)$/.test(G) && "WebKit" || !G && /\bMSIE\b/i.test(l) && (g == "Mac OS" ? "Tasman" : "Trident") || G == "WebKit" && /\bPlayStation\b(?! Vita\b)/i.test(m) && "NetFront") && (G = [i]), m == "IE" && (i = (/; *(?:XBLWP|ZuneWP)(\d+)/i.exec(l) || 0)[1]) ? (m += " Mobile", g = "Windows Phone " + (/\+$/.test(i) ? i : i + ".x"), P.unshift("desktop mode")) : /\bWPDesktop\b/i.test(l) ? (m = "IE Mobile", g = "Windows Phone 8.x", P.unshift("desktop mode"), C || (C = (/\brv:([\d.]+)/.exec(l) || 0)[1])) : m != "IE" && G == "Trident" && (i = /\brv:([\d.]+)/.exec(l)) && (m && P.push("identifying as " + m + (C ? " " + C : "")), m = "IE", C = i[1]), ge) {
          if (J(L, "global"))
            if (Q && (i = Q.lang.System, he = i.getProperty("os.arch"), g = g || i.getProperty("os.name") + " " + i.getProperty("os.version")), c) {
              try {
                C = L.require("ringo/engine").version.join("."), m = "RingoJS";
              } catch {
                (i = L.system) && i.global.system == L.system && (m = "Narwhal", g || (g = i[0].os || null));
              }
              m || (m = "Rhino");
            } else typeof L.process == "object" && !L.process.browser && (i = L.process) && (typeof i.versions == "object" && (typeof i.versions.electron == "string" ? (P.push("Node " + i.versions.node), m = "Electron", C = i.versions.electron) : typeof i.versions.nw == "string" && (P.push("Chromium " + C, "Node " + i.versions.node), m = "NW.js", C = i.versions.nw)), m || (m = "Node.js", he = i.arch, g = i.platform, C = /[\d.]+/.exec(i.version), C = C ? C[0] : null));
          else F(i = L.runtime) == Se ? (m = "Adobe AIR", g = i.flash.system.Capabilities.os) : F(i = L.phantom) == Me ? (m = "PhantomJS", C = (i = i.version || null) && i.major + "." + i.minor + "." + i.patch) : typeof M.documentMode == "number" && (i = /\bTrident\/(\d+)/i.exec(l)) ? (C = [C, M.documentMode], (i = +i[1] + 4) != C[1] && (P.push("IE " + C[1] + " mode"), G && (G[1] = ""), C[1] = i), C = m == "IE" ? String(C[1].toFixed(1)) : C[0]) : typeof M.documentMode == "number" && /^(?:Chrome|Firefox)\b/.test(m) && (P.push("masking as " + m + " " + C), m = "IE", C = "11.0", G = ["Trident"], g = "Windows");
          g = g && W(g);
        }
        if (C && (i = /(?:[ab]|dp|pre|[ab]\d+pre)(?:\d+\+?)?$/i.exec(C) || /(?:alpha|beta)(?: ?\d)?/i.exec(l + ";" + (ge && fe.appMinorVersion)) || /\bMinefield\b/i.test(l) && "a") && (Oe = /b/i.test(i) ? "beta" : "alpha", C = C.replace(RegExp(i + "\\+?$"), "") + (Oe == "beta" ? N : v) + (/\d+\+?/.exec(i) || "")), m == "Fennec" || m == "Firefox" && /\b(?:Android|Firefox OS|KaiOS)\b/.test(g))
          m = "Firefox Mobile";
        else if (m == "Maxthon" && C)
          C = C.replace(/\.[\d.]+/, ".x");
        else if (/\bXbox\b/i.test(B))
          B == "Xbox 360" && (g = null), B == "Xbox 360" && /\bIEMobile\b/.test(l) && P.unshift("mobile mode");
        else if ((/^(?:Chrome|IE|Opera)$/.test(m) || m && !B && !/Browser|Mobi/.test(m)) && (g == "Windows CE" || /Mobi/i.test(l)))
          m += " Mobile";
        else if (m == "IE" && ge)
          try {
            L.external === null && P.unshift("platform preview");
          } catch {
            P.unshift("embedded");
          }
        else (/\bBlackBerry\b/.test(B) || /\bBB10\b/.test(l)) && (i = (RegExp(B.replace(/ +/g, " *") + "/([.\\d]+)", "i").exec(l) || 0)[1] || C) ? (i = [i, /BB10/.test(l)], g = (i[1] ? (B = null, le = "BlackBerry") : "Device Software") + " " + i[0], C = null) : this != z && B != "Wii" && (ge && I || /Opera/.test(m) && /\b(?:MSIE|Firefox)\b/i.test(l) || m == "Firefox" && /\bOS X (?:\d+\.){2,}/.test(g) || m == "IE" && (g && !/^Win/.test(g) && C > 5.5 || /\bWindows XP\b/.test(g) && C > 8 || C == 8 && !/\bTrident\b/.test(l))) && !_.test(i = X.call(z, l.replace(_, "") + ";")) && i.name && (i = "ing as " + i.name + ((i = i.version) ? " " + i : ""), _.test(m) ? (/\bIE\b/.test(i) && g == "Mac OS" && (g = null), i = "identify" + i) : (i = "mask" + i, te ? m = W(te.replace(/([a-z])([A-Z])/g, "$1 $2")) : m = "Opera", /\bIE\b/.test(i) && (g = null), ge || (C = null)), G = ["Presto"], P.push(i));
        (i = (/\bAppleWebKit\/([\d.]+\+?)/i.exec(l) || 0)[1]) && (i = [parseFloat(i.replace(/\.(\d)$/, ".0$1")), i], m == "Safari" && i[1].slice(-1) == "+" ? (m = "WebKit Nightly", Oe = "alpha", C = i[1].slice(0, -1)) : (C == i[1] || C == (i[2] = (/\bSafari\/([\d.]+\+?)/i.exec(l) || 0)[1])) && (C = null), i[1] = (/\b(?:Headless)?Chrome\/([\d.]+)/i.exec(l) || 0)[1], i[0] == 537.36 && i[2] == 537.36 && parseFloat(i[1]) >= 28 && G == "WebKit" && (G = ["Blink"]), !ge || !xe && !i[1] ? (G && (G[1] = "like Safari"), i = (i = i[0], i < 400 ? 1 : i < 500 ? 2 : i < 526 ? 3 : i < 533 ? 4 : i < 534 ? "4+" : i < 535 ? 5 : i < 537 ? 6 : i < 538 ? 7 : i < 601 ? 8 : i < 602 ? 9 : i < 604 ? 10 : i < 606 ? 11 : i < 608 ? 12 : "12")) : (G && (G[1] = "like Chrome"), i = i[1] || (i = i[0], i < 530 ? 1 : i < 532 ? 2 : i < 532.05 ? 3 : i < 533 ? 4 : i < 534.03 ? 5 : i < 534.07 ? 6 : i < 534.1 ? 7 : i < 534.13 ? 8 : i < 534.16 ? 9 : i < 534.24 ? 10 : i < 534.3 ? 11 : i < 535.01 ? 12 : i < 535.02 ? "13+" : i < 535.07 ? 15 : i < 535.11 ? 16 : i < 535.19 ? 17 : i < 536.05 ? 18 : i < 536.1 ? 19 : i < 537.01 ? 20 : i < 537.11 ? "21+" : i < 537.13 ? 23 : i < 537.18 ? 24 : i < 537.24 ? 25 : i < 537.36 ? 26 : G != "Blink" ? "27" : "28")), G && (G[1] += " " + (i += typeof i == "number" ? ".x" : /[.+]/.test(i) ? "" : "+")), m == "Safari" && (!C || parseInt(C) > 45) ? C = i : m == "Chrome" && /\bHeadlessChrome/i.test(l) && P.unshift("headless")), m == "Opera" && (i = /\bzbov|zvav$/.exec(g)) ? (m += " ", P.unshift("desktop mode"), i == "zvav" ? (m += "Mini", C = null) : m += "Mobile", g = g.replace(RegExp(" *" + i + "$"), "")) : m == "Safari" && /\bChrome\b/.exec(G && G[1]) ? (P.unshift("desktop mode"), m = "Chrome Mobile", C = null, /\bOS X\b/.test(g) ? (le = "Apple", g = "iOS 4.3+") : g = null) : /\bSRWare Iron\b/.test(m) && !C && (C = T("Chrome")), C && C.indexOf(i = /[\d.]+$/.exec(g)) == 0 && l.indexOf("/" + i + "-") > -1 && (g = h(g.replace(i, ""))), g && g.indexOf(m) != -1 && !RegExp(m + " OS").test(g) && (g = g.replace(RegExp(" *" + Y(m) + " *"), "")), G && !/\b(?:Avant|Nook)\b/.test(m) && (/Browser|Lunascape|Maxthon/.test(m) || m != "Safari" && /^iOS/.test(g) && /\bSafari\b/.test(G[1]) || /^(?:Adobe|Arora|Breach|Midori|Opera|Phantom|Rekonq|Rock|Samsung Internet|Sleipnir|SRWare Iron|Vivaldi|Web)/.test(m) && G[1]) && (i = G[G.length - 1]) && P.push(i), P.length && (P = ["(" + P.join("; ") + ")"]), le && B && B.indexOf(le) < 0 && P.push("on " + le), B && P.push((/^on /.test(P[P.length - 1]) ? "" : "on ") + B), g && (i = / ([\d.+]+)$/.exec(g), R = i && g.charAt(g.length - i[0].length - 1) == "/", g = {
          architecture: 32,
          family: i && !R ? g.replace(i[0], "") : g,
          version: i ? i[1] : null,
          toString: function() {
            var U = this.version;
            return this.family + (U && !R ? " " + U : "") + (this.architecture == 64 ? " 64-bit" : "");
          }
        }), (i = /\b(?:AMD|IA|Win|WOW|x86_|x)64\b/i.exec(he)) && !/\bi686\b/i.test(he) ? (g && (g.architecture = 64, g.family = g.family.replace(RegExp(" *" + i), "")), m && (/\bWOW64\b/i.test(l) || ge && /\w(?:86|32)$/.test(fe.cpuClass || fe.platform) && !/\bWin64; x64\b/i.test(l)) && P.unshift("32-bit")) : g && /^OS X/.test(g.family) && m == "Chrome" && parseFloat(C) >= 39 && (g.architecture = 64), l || (l = null);
        var Z = {};
        return Z.description = l, Z.layout = G && G[0], Z.manufacturer = le, Z.name = m, Z.prerelease = Oe, Z.product = B, Z.ua = l, Z.version = m && C, Z.os = g || {
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
        }, Z.parse = X, Z.toString = q, Z.version && P.unshift(C), Z.name && P.unshift(m), g && m && !(g == String(g).split(" ")[0] && (g == m.split(" ")[0] || B)) && P.push(B ? "(" + g + ")" : "on " + g), P.length && (Z.description = P.join(" ")), Z;
      }
      var H = X();
      s && f ? z(H, function(l, L) {
        s[L] = l;
      }) : o.platform = H;
    }).call(Hr);
  }(Ze, Ze.exports)), Ze.exports;
}
var Ve = qr();
function Yt(e) {
  return parseInt(String(e), 10);
}
function ko(e) {
  const t = parseInt(String(e), 10);
  return t < 0 ? -t : t;
}
"toInt" in String.prototype || (String.prototype.toInt = function() {
  return Yt(this);
});
"toUint" in String.prototype || (String.prototype.toUint = function() {
  const e = Yt(this);
  return e < 0 ? -e : e;
});
const Kr = /^[^\/\.]+$|[^\/]+(?=\.)/;
function Mo(e) {
  return (e.match(Kr) ?? [""])[0];
}
class Rt {
  static stageW = 0;
  static stageH = 0;
  static debugLog = !1;
  static isSafari = Ve.name === "Safari";
  static isFirefox = Ve.name === "Firefox";
  static isMac = /OS X/.test(Ve.os?.family ?? "");
  static isWin = /Windows/.test(Ve.os?.family ?? "");
  static isMobile = !/(Windows|OS X)/.test(Ve.os?.family ?? "");
  static hDip = {};
  static isDbg = !1;
  static isPackaged = !1;
  static isDarkMode = !1;
  static cc4ColorName;
}
var Cr = /* @__PURE__ */ ((e) => (e.DEFAULT = "", e.SP_GSM = "png|jpg|jpeg|json|svg|webp|mp4|webm", e.SCRIPT = "sn|ssn", e.FONT = "woff2|woff|otf|ttf", e.SOUND = "mp3|m4a|ogg|aac|flac|wav", e.HTML = "htm|html", e.CSS = "css", e.SN = "sn", e.TST_PNGPNG_ = "png|png_", e.TST_HH = "hh", e.TST_EEE = "eee", e.TST_GGG = "ggg", e.TST_PNGXML = "png|xml", e))(Cr || {});
const Vr = {
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
class Xr {
  constructor(t) {
    this.sys = t;
  }
  oCfg = Vr;
  userFnTail = "";
  // 4tst public
  hPathFn2Exts = {};
  async load(t) {
    if (this.oCfg.save_ns = t?.save_ns ?? this.oCfg.save_ns, this.oCfg.window.width = Number(t?.window?.width ?? this.oCfg.window.width), this.oCfg.window.height = Number(t?.window?.height ?? this.oCfg.window.height), this.oCfg.book = { ...this.oCfg.book, ...t.book }, this.oCfg.log.max_len = t.log?.max_len ?? this.oCfg.log.max_len, this.oCfg.init = { ...this.oCfg.init, ...t.init }, this.oCfg.debug = { ...this.oCfg.debug, ...t.debug }, this.oCfg.debuger_token = t.debuger_token, await this.sys.loadPath(this.hPathFn2Exts, this), this.#e = this.matchPath(
      "^breakline$",
      "png|jpg|jpeg|json|svg|webp|mp4|webm"
      /* SP_GSM */
    ).length > 0, this.#n = this.matchPath(
      "^breakpage$",
      "png|jpg|jpeg|json|svg|webp|mp4|webm"
      /* SP_GSM */
    ).length > 0, this.sys.arg.crypto)
      for (const [n, o] of Object.entries(this.hPathFn2Exts))
        for (const [s, f] of Object.entries(o)) {
          if (!s.startsWith(":") || !s.endsWith(":id")) continue;
          const p = f.slice(f.lastIndexOf("/") + 1), w = o[s.slice(0, -10)] ?? "", S = await (await this.sys.fetch(w)).text(), y = this.sys.hash(S);
          if (p !== y) throw `ファイル改竄エラーです fn:${w}`;
        }
    else
      for (const [n, o] of Object.entries(this.hPathFn2Exts))
        for (const s of Object.keys(o))
          s.startsWith(":");
  }
  #e = !1;
  get existsBreakline() {
    return this.#e;
  }
  #n = !1;
  get existsBreakpage() {
    return this.#n;
  }
  getNs() {
    return `skynovel.${this.oCfg.save_ns} - `;
  }
  #t = /([^\/\s]+)\.([^\d]\w+)/;
  // 4 match 498 step(~1ms)  https://regex101.com/r/tpVgmI/1
  searchPath(t, n = "") {
    if (!t) throw "[searchPath] fnが空です";
    if (t.startsWith("http://")) return t;
    const o = t.match(this.#t);
    let s = o ? o[1] : t;
    const f = o ? o[2] : "";
    if (this.userFnTail) {
      const _ = s + "@@" + this.userFnTail;
      if (_ in this.hPathFn2Exts) {
        if (n === "") s = _;
        else for (const S of Object.keys(this.hPathFn2Exts[_] ?? {}))
          if (`|${n}|`.includes(`|${S}|`)) {
            s = _;
            break;
          }
      }
    }
    const p = this.hPathFn2Exts[s];
    if (!p) throw `サーチパスに存在しないファイル【${t}】です`;
    if (!f) {
      const _ = Yt(p[":cnt"]);
      if (n === "") {
        if (_ > 1) throw `指定ファイル【${t}】が複数マッチします。サーチ対象拡張子群【${n}】で絞り込むか、ファイル名を個別にして下さい。`;
        return t;
      }
      const S = `|${n}|`;
      if (_ > 1) {
        let y = 0;
        for (const k of Object.keys(p))
          if (S.includes(`|${k}|`) && ++y > 1)
            throw `指定ファイル【${t}】が複数マッチします。サーチ対象拡張子群【${n}】で絞り込むか、ファイル名を個別にして下さい。`;
      }
      for (const y of Object.keys(p))
        if (S.includes(`|${y}|`)) return p[y];
      throw `サーチ対象拡張子群【${n}】にマッチするファイルがサーチパスに存在しません。探索ファイル名=【${t}】`;
    }
    if (n !== "" && !`|${n}|`.includes(`|${f}|`))
      throw `指定ファイルの拡張子【${f}】は、サーチ対象拡張子群【${n}】にマッチしません。探索ファイル名=【${t}】`;
    const w = p[f];
    if (!w) throw `サーチパスに存在しない拡張子【${f}】です。探索ファイル名=【${t}】、サーチ対象拡張子群【${n}】`;
    return w;
  }
  matchPath(t, n = "") {
    const o = [], s = new RegExp(t), f = new RegExp(n);
    for (const [p, w] of Object.entries(this.hPathFn2Exts)) {
      if (p.search(s) === -1) continue;
      if (n === "") {
        o.push(w);
        continue;
      }
      const _ = {};
      let S = !1;
      for (const y of Object.keys(w))
        y.search(f) !== -1 && (_[y] = p, S = !0);
      S && o.push(_);
    }
    return o;
  }
  addPath(t, n) {
    const o = {};
    for (const [s, f] of Object.entries(n))
      o[s] = (s.startsWith(":") ? "" : this.sys.arg.cur) + f;
    this.hPathFn2Exts[t] = o;
  }
}
class yt extends Xr {
  constructor(t) {
    super(t), this.sys = t;
  }
  static async generate(t) {
    const n = new yt(t), o = t.arg.cur + "prj.json", s = await t.fetch(o);
    if (!s.ok) throw Error(s.statusText);
    const f = await t.dec(o, await s.text());
    return await n.load(JSON.parse(f)), n;
  }
  async load(t) {
    await super.load(t), Rt.stageW = t.window.width, Rt.stageH = t.window.height, Rt.debugLog = t.debug.debugLog;
  }
  searchPath(t, n = Cr.DEFAULT) {
    return t.startsWith("downloads:/") ? this.sys.path_downloads + t.slice(11) : t.startsWith("userdata:/") ? this.sys.path_userdata + "storage/" + t.slice(10) : super.searchPath(t, n);
  }
}
var ft = { exports: {} }, Xe = {};
/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var or;
function Jr() {
  if (or) return Xe;
  or = 1;
  var e = Symbol.for("react.transitional.element"), t = Symbol.for("react.fragment");
  function n(o, s, f) {
    var p = null;
    if (f !== void 0 && (p = "" + f), s.key !== void 0 && (p = "" + s.key), "key" in s) {
      f = {};
      for (var w in s)
        w !== "key" && (f[w] = s[w]);
    } else f = s;
    return s = f.ref, {
      $$typeof: e,
      type: o,
      key: p,
      ref: s !== void 0 ? s : null,
      props: f
    };
  }
  return Xe.Fragment = t, Xe.jsx = n, Xe.jsxs = n, Xe;
}
var Je = {}, lt = { exports: {} }, K = {};
/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var ir;
function Qr() {
  if (ir) return K;
  ir = 1;
  var e = Symbol.for("react.transitional.element"), t = Symbol.for("react.portal"), n = Symbol.for("react.fragment"), o = Symbol.for("react.strict_mode"), s = Symbol.for("react.profiler"), f = Symbol.for("react.consumer"), p = Symbol.for("react.context"), w = Symbol.for("react.forward_ref"), _ = Symbol.for("react.suspense"), S = Symbol.for("react.memo"), y = Symbol.for("react.lazy"), k = Symbol.iterator;
  function ue(c) {
    return c === null || typeof c != "object" ? null : (c = k && c[k] || c["@@iterator"], typeof c == "function" ? c : null);
  }
  var re = {
    isMounted: function() {
      return !1;
    },
    enqueueForceUpdate: function() {
    },
    enqueueReplaceState: function() {
    },
    enqueueSetState: function() {
    }
  }, D = Object.assign, W = {};
  function z(c, v, N) {
    this.props = c, this.context = v, this.refs = W, this.updater = N || re;
  }
  z.prototype.isReactComponent = {}, z.prototype.setState = function(c, v) {
    if (typeof c != "object" && typeof c != "function" && c != null)
      throw Error(
        "takes an object of state variables to update or a function which returns an object of state variables."
      );
    this.updater.enqueueSetState(this, c, v, "setState");
  }, z.prototype.forceUpdate = function(c) {
    this.updater.enqueueForceUpdate(this, c, "forceUpdate");
  };
  function F() {
  }
  F.prototype = z.prototype;
  function J(c, v, N) {
    this.props = c, this.context = v, this.refs = W, this.updater = N || re;
  }
  var Y = J.prototype = new F();
  Y.constructor = J, D(Y, z.prototype), Y.isPureReactComponent = !0;
  var V = Array.isArray, h = { H: null, A: null, T: null, S: null }, X = Object.prototype.hasOwnProperty;
  function H(c, v, N, M, I, te) {
    return N = te.ref, {
      $$typeof: e,
      type: c,
      key: v,
      ref: N !== void 0 ? N : null,
      props: te
    };
  }
  function l(c, v) {
    return H(
      c.type,
      v,
      void 0,
      void 0,
      void 0,
      c.props
    );
  }
  function L(c) {
    return typeof c == "object" && c !== null && c.$$typeof === e;
  }
  function ee(c) {
    var v = { "=": "=0", ":": "=2" };
    return "$" + c.replace(/[=:]/g, function(N) {
      return v[N];
    });
  }
  var fe = /\/+/g;
  function we(c, v) {
    return typeof c == "object" && c !== null && c.key != null ? ee("" + c.key) : v.toString(36);
  }
  function xe() {
  }
  function Ce(c) {
    switch (c.status) {
      case "fulfilled":
        return c.value;
      case "rejected":
        throw c.reason;
      default:
        switch (typeof c.status == "string" ? c.then(xe, xe) : (c.status = "pending", c.then(
          function(v) {
            c.status === "pending" && (c.status = "fulfilled", c.value = v);
          },
          function(v) {
            c.status === "pending" && (c.status = "rejected", c.reason = v);
          }
        )), c.status) {
          case "fulfilled":
            return c.value;
          case "rejected":
            throw c.reason;
        }
    }
    throw c;
  }
  function Se(c, v, N, M, I) {
    var te = typeof c;
    (te === "undefined" || te === "boolean") && (c = null);
    var i = !1;
    if (c === null) i = !0;
    else
      switch (te) {
        case "bigint":
        case "string":
        case "number":
          i = !0;
          break;
        case "object":
          switch (c.$$typeof) {
            case e:
            case t:
              i = !0;
              break;
            case y:
              return i = c._init, Se(
                i(c._payload),
                v,
                N,
                M,
                I
              );
          }
      }
    if (i)
      return I = I(c), i = M === "" ? "." + we(c, 0) : M, V(I) ? (N = "", i != null && (N = i.replace(fe, "$&/") + "/"), Se(I, v, N, "", function(Oe) {
        return Oe;
      })) : I != null && (L(I) && (I = l(
        I,
        N + (I.key == null || c && c.key === I.key ? "" : ("" + I.key).replace(
          fe,
          "$&/"
        ) + "/") + i
      )), v.push(I)), 1;
    i = 0;
    var he = M === "" ? "." : M + ":";
    if (V(c))
      for (var P = 0; P < c.length; P++)
        M = c[P], te = he + we(M, P), i += Se(
          M,
          v,
          N,
          te,
          I
        );
    else if (P = ue(c), typeof P == "function")
      for (c = P.call(c), P = 0; !(M = c.next()).done; )
        M = M.value, te = he + we(M, P++), i += Se(
          M,
          v,
          N,
          te,
          I
        );
    else if (te === "object") {
      if (typeof c.then == "function")
        return Se(
          Ce(c),
          v,
          N,
          M,
          I
        );
      throw v = String(c), Error(
        "Objects are not valid as a React child (found: " + (v === "[object Object]" ? "object with keys {" + Object.keys(c).join(", ") + "}" : v) + "). If you meant to render a collection of children, use an array instead."
      );
    }
    return i;
  }
  function be(c, v, N) {
    if (c == null) return c;
    var M = [], I = 0;
    return Se(c, M, "", "", function(te) {
      return v.call(N, te, I++);
    }), M;
  }
  function Pe(c) {
    if (c._status === -1) {
      var v = c._result;
      v = v(), v.then(
        function(N) {
          (c._status === 0 || c._status === -1) && (c._status = 1, c._result = N);
        },
        function(N) {
          (c._status === 0 || c._status === -1) && (c._status = 2, c._result = N);
        }
      ), c._status === -1 && (c._status = 0, c._result = v);
    }
    if (c._status === 1) return c._result.default;
    throw c._result;
  }
  var Me = typeof reportError == "function" ? reportError : function(c) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var v = new window.ErrorEvent("error", {
        bubbles: !0,
        cancelable: !0,
        message: typeof c == "object" && c !== null && typeof c.message == "string" ? String(c.message) : String(c),
        error: c
      });
      if (!window.dispatchEvent(v)) return;
    } else if (typeof process == "object" && typeof process.emit == "function") {
      process.emit("uncaughtException", c);
      return;
    }
    console.error(c);
  };
  function Q() {
  }
  return K.Children = {
    map: be,
    forEach: function(c, v, N) {
      be(
        c,
        function() {
          v.apply(this, arguments);
        },
        N
      );
    },
    count: function(c) {
      var v = 0;
      return be(c, function() {
        v++;
      }), v;
    },
    toArray: function(c) {
      return be(c, function(v) {
        return v;
      }) || [];
    },
    only: function(c) {
      if (!L(c))
        throw Error(
          "React.Children.only expected to receive a single React element child."
        );
      return c;
    }
  }, K.Component = z, K.Fragment = n, K.Profiler = s, K.PureComponent = J, K.StrictMode = o, K.Suspense = _, K.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = h, K.act = function() {
    throw Error("act(...) is not supported in production builds of React.");
  }, K.cache = function(c) {
    return function() {
      return c.apply(null, arguments);
    };
  }, K.cloneElement = function(c, v, N) {
    if (c == null)
      throw Error(
        "The argument must be a React element, but you passed " + c + "."
      );
    var M = D({}, c.props), I = c.key, te = void 0;
    if (v != null)
      for (i in v.ref !== void 0 && (te = void 0), v.key !== void 0 && (I = "" + v.key), v)
        !X.call(v, i) || i === "key" || i === "__self" || i === "__source" || i === "ref" && v.ref === void 0 || (M[i] = v[i]);
    var i = arguments.length - 2;
    if (i === 1) M.children = N;
    else if (1 < i) {
      for (var he = Array(i), P = 0; P < i; P++)
        he[P] = arguments[P + 2];
      M.children = he;
    }
    return H(c.type, I, void 0, void 0, te, M);
  }, K.createContext = function(c) {
    return c = {
      $$typeof: p,
      _currentValue: c,
      _currentValue2: c,
      _threadCount: 0,
      Provider: null,
      Consumer: null
    }, c.Provider = c, c.Consumer = {
      $$typeof: f,
      _context: c
    }, c;
  }, K.createElement = function(c, v, N) {
    var M, I = {}, te = null;
    if (v != null)
      for (M in v.key !== void 0 && (te = "" + v.key), v)
        X.call(v, M) && M !== "key" && M !== "__self" && M !== "__source" && (I[M] = v[M]);
    var i = arguments.length - 2;
    if (i === 1) I.children = N;
    else if (1 < i) {
      for (var he = Array(i), P = 0; P < i; P++)
        he[P] = arguments[P + 2];
      I.children = he;
    }
    if (c && c.defaultProps)
      for (M in i = c.defaultProps, i)
        I[M] === void 0 && (I[M] = i[M]);
    return H(c, te, void 0, void 0, null, I);
  }, K.createRef = function() {
    return { current: null };
  }, K.forwardRef = function(c) {
    return { $$typeof: w, render: c };
  }, K.isValidElement = L, K.lazy = function(c) {
    return {
      $$typeof: y,
      _payload: { _status: -1, _result: c },
      _init: Pe
    };
  }, K.memo = function(c, v) {
    return {
      $$typeof: S,
      type: c,
      compare: v === void 0 ? null : v
    };
  }, K.startTransition = function(c) {
    var v = h.T, N = {};
    h.T = N;
    try {
      var M = c(), I = h.S;
      I !== null && I(N, M), typeof M == "object" && M !== null && typeof M.then == "function" && M.then(Q, Me);
    } catch (te) {
      Me(te);
    } finally {
      h.T = v;
    }
  }, K.unstable_useCacheRefresh = function() {
    return h.H.useCacheRefresh();
  }, K.use = function(c) {
    return h.H.use(c);
  }, K.useActionState = function(c, v, N) {
    return h.H.useActionState(c, v, N);
  }, K.useCallback = function(c, v) {
    return h.H.useCallback(c, v);
  }, K.useContext = function(c) {
    return h.H.useContext(c);
  }, K.useDebugValue = function() {
  }, K.useDeferredValue = function(c, v) {
    return h.H.useDeferredValue(c, v);
  }, K.useEffect = function(c, v) {
    return h.H.useEffect(c, v);
  }, K.useId = function() {
    return h.H.useId();
  }, K.useImperativeHandle = function(c, v, N) {
    return h.H.useImperativeHandle(c, v, N);
  }, K.useInsertionEffect = function(c, v) {
    return h.H.useInsertionEffect(c, v);
  }, K.useLayoutEffect = function(c, v) {
    return h.H.useLayoutEffect(c, v);
  }, K.useMemo = function(c, v) {
    return h.H.useMemo(c, v);
  }, K.useOptimistic = function(c, v) {
    return h.H.useOptimistic(c, v);
  }, K.useReducer = function(c, v, N) {
    return h.H.useReducer(c, v, N);
  }, K.useRef = function(c) {
    return h.H.useRef(c);
  }, K.useState = function(c) {
    return h.H.useState(c);
  }, K.useSyncExternalStore = function(c, v, N) {
    return h.H.useSyncExternalStore(
      c,
      v,
      N
    );
  }, K.useTransition = function() {
    return h.H.useTransition();
  }, K.version = "19.0.0", K;
}
var et = { exports: {} };
/**
 * @license React
 * react.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
et.exports;
var ar;
function Zr() {
  return ar || (ar = 1, function(e, t) {
    process.env.NODE_ENV !== "production" && function() {
      function n(r, u) {
        Object.defineProperty(f.prototype, r, {
          get: function() {
            console.warn(
              "%s(...) is deprecated in plain JavaScript React classes. %s",
              u[0],
              u[1]
            );
          }
        });
      }
      function o(r) {
        return r === null || typeof r != "object" ? null : (r = Fe && r[Fe] || r["@@iterator"], typeof r == "function" ? r : null);
      }
      function s(r, u) {
        r = (r = r.constructor) && (r.displayName || r.name) || "ReactClass";
        var d = r + "." + u;
        Ue[d] || (console.error(
          "Can't call %s on a component that is not yet mounted. This is a no-op, but it might indicate a bug in your application. Instead, assign to `this.state` directly or define a `state = {};` class property with the desired state in the %s component.",
          u,
          r
        ), Ue[d] = !0);
      }
      function f(r, u, d) {
        this.props = r, this.context = u, this.refs = T, this.updater = d || a;
      }
      function p() {
      }
      function w(r, u, d) {
        this.props = r, this.context = u, this.refs = T, this.updater = d || a;
      }
      function _(r) {
        return "" + r;
      }
      function S(r) {
        try {
          _(r);
          var u = !1;
        } catch {
          u = !0;
        }
        if (u) {
          u = console;
          var d = u.error, b = typeof Symbol == "function" && Symbol.toStringTag && r[Symbol.toStringTag] || r.constructor.name || "Object";
          return d.call(
            u,
            "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.",
            b
          ), _(r);
        }
      }
      function y(r) {
        if (r == null) return null;
        if (typeof r == "function")
          return r.$$typeof === x ? null : r.displayName || r.name || null;
        if (typeof r == "string") return r;
        switch (r) {
          case P:
            return "Fragment";
          case he:
            return "Portal";
          case ge:
            return "Profiler";
          case Oe:
            return "StrictMode";
          case m:
            return "Suspense";
          case B:
            return "SuspenseList";
        }
        if (typeof r == "object")
          switch (typeof r.tag == "number" && console.error(
            "Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."
          ), r.$$typeof) {
            case R:
              return (r.displayName || "Context") + ".Provider";
            case C:
              return (r._context.displayName || "Context") + ".Consumer";
            case G:
              var u = r.render;
              return r = r.displayName, r || (r = u.displayName || u.name || "", r = r !== "" ? "ForwardRef(" + r + ")" : "ForwardRef"), r;
            case le:
              return u = r.displayName || null, u !== null ? u : y(r.type) || "Memo";
            case g:
              u = r._payload, r = r._init;
              try {
                return y(r(u));
              } catch {
              }
          }
        return null;
      }
      function k(r) {
        return typeof r == "string" || typeof r == "function" || r === P || r === ge || r === Oe || r === m || r === B || r === ze || typeof r == "object" && r !== null && (r.$$typeof === g || r.$$typeof === le || r.$$typeof === R || r.$$typeof === C || r.$$typeof === G || r.$$typeof === ye || r.getModuleId !== void 0);
      }
      function ue() {
      }
      function re() {
        if (Ae === 0) {
          Be = console.log, je = console.info, Ge = console.warn, ke = console.error, Gt = console.group, Dt = console.groupCollapsed, zt = console.groupEnd;
          var r = {
            configurable: !0,
            enumerable: !0,
            value: ue,
            writable: !0
          };
          Object.defineProperties(console, {
            info: r,
            log: r,
            warn: r,
            error: r,
            group: r,
            groupCollapsed: r,
            groupEnd: r
          });
        }
        Ae++;
      }
      function D() {
        if (Ae--, Ae === 0) {
          var r = { configurable: !0, enumerable: !0, writable: !0 };
          Object.defineProperties(console, {
            log: O({}, r, { value: Be }),
            info: O({}, r, { value: je }),
            warn: O({}, r, { value: Ge }),
            error: O({}, r, { value: ke }),
            group: O({}, r, { value: Gt }),
            groupCollapsed: O({}, r, { value: Dt }),
            groupEnd: O({}, r, { value: zt })
          });
        }
        0 > Ae && console.error(
          "disabledDepth fell below zero. This is a bug in React. Please file an issue."
        );
      }
      function W(r) {
        if (Ot === void 0)
          try {
            throw Error();
          } catch (d) {
            var u = d.stack.trim().match(/\n( *(at )?)/);
            Ot = u && u[1] || "", Ht = -1 < d.stack.indexOf(`
    at`) ? " (<anonymous>)" : -1 < d.stack.indexOf("@") ? "@unknown:0:0" : "";
          }
        return `
` + Ot + r + Ht;
      }
      function z(r, u) {
        if (!r || xt) return "";
        var d = Ct.get(r);
        if (d !== void 0) return d;
        xt = !0, d = Error.prepareStackTrace, Error.prepareStackTrace = void 0;
        var b = null;
        b = E.H, E.H = null, re();
        try {
          var A = {
            DetermineComponentFrameRoot: function() {
              try {
                if (u) {
                  var Ne = function() {
                    throw Error();
                  };
                  if (Object.defineProperty(Ne.prototype, "props", {
                    set: function() {
                      throw Error();
                    }
                  }), typeof Reflect == "object" && Reflect.construct) {
                    try {
                      Reflect.construct(Ne, []);
                    } catch (Ye) {
                      var ut = Ye;
                    }
                    Reflect.construct(r, [], Ne);
                  } else {
                    try {
                      Ne.call();
                    } catch (Ye) {
                      ut = Ye;
                    }
                    r.call(Ne.prototype);
                  }
                } else {
                  try {
                    throw Error();
                  } catch (Ye) {
                    ut = Ye;
                  }
                  (Ne = r()) && typeof Ne.catch == "function" && Ne.catch(function() {
                  });
                }
              } catch (Ye) {
                if (Ye && ut && typeof Ye.stack == "string")
                  return [Ye.stack, ut.stack];
              }
              return [null, null];
            }
          };
          A.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
          var j = Object.getOwnPropertyDescriptor(
            A.DetermineComponentFrameRoot,
            "name"
          );
          j && j.configurable && Object.defineProperty(
            A.DetermineComponentFrameRoot,
            "name",
            { value: "DetermineComponentFrameRoot" }
          );
          var $ = A.DetermineComponentFrameRoot(), ce = $[0], ne = $[1];
          if (ce && ne) {
            var pe = ce.split(`
`), Te = ne.split(`
`);
            for ($ = j = 0; j < pe.length && !pe[j].includes(
              "DetermineComponentFrameRoot"
            ); )
              j++;
            for (; $ < Te.length && !Te[$].includes(
              "DetermineComponentFrameRoot"
            ); )
              $++;
            if (j === pe.length || $ === Te.length)
              for (j = pe.length - 1, $ = Te.length - 1; 1 <= j && 0 <= $ && pe[j] !== Te[$]; )
                $--;
            for (; 1 <= j && 0 <= $; j--, $--)
              if (pe[j] !== Te[$]) {
                if (j !== 1 || $ !== 1)
                  do
                    if (j--, $--, 0 > $ || pe[j] !== Te[$]) {
                      var De = `
` + pe[j].replace(
                        " at new ",
                        " at "
                      );
                      return r.displayName && De.includes("<anonymous>") && (De = De.replace("<anonymous>", r.displayName)), typeof r == "function" && Ct.set(r, De), De;
                    }
                  while (1 <= j && 0 <= $);
                break;
              }
          }
        } finally {
          xt = !1, E.H = b, D(), Error.prepareStackTrace = d;
        }
        return pe = (pe = r ? r.displayName || r.name : "") ? W(pe) : "", typeof r == "function" && Ct.set(r, pe), pe;
      }
      function F(r) {
        if (r == null) return "";
        if (typeof r == "function") {
          var u = r.prototype;
          return z(
            r,
            !(!u || !u.isReactComponent)
          );
        }
        if (typeof r == "string") return W(r);
        switch (r) {
          case m:
            return W("Suspense");
          case B:
            return W("SuspenseList");
        }
        if (typeof r == "object")
          switch (r.$$typeof) {
            case G:
              return r = z(r.render, !1), r;
            case le:
              return F(r.type);
            case g:
              u = r._payload, r = r._init;
              try {
                return F(r(u));
              } catch {
              }
          }
        return "";
      }
      function J() {
        var r = E.A;
        return r === null ? null : r.getOwner();
      }
      function Y(r) {
        if (de.call(r, "key")) {
          var u = Object.getOwnPropertyDescriptor(r, "key").get;
          if (u && u.isReactWarning) return !1;
        }
        return r.key !== void 0;
      }
      function V(r, u) {
        function d() {
          qt || (qt = !0, console.error(
            "%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)",
            u
          ));
        }
        d.isReactWarning = !0, Object.defineProperty(r, "key", {
          get: d,
          configurable: !0
        });
      }
      function h() {
        var r = y(this.type);
        return Vt[r] || (Vt[r] = !0, console.error(
          "Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release."
        )), r = this.props.ref, r !== void 0 ? r : null;
      }
      function X(r, u, d, b, A, j) {
        return d = j.ref, r = {
          $$typeof: i,
          type: r,
          key: u,
          props: j,
          _owner: A
        }, (d !== void 0 ? d : null) !== null ? Object.defineProperty(r, "ref", {
          enumerable: !1,
          get: h
        }) : Object.defineProperty(r, "ref", { enumerable: !1, value: null }), r._store = {}, Object.defineProperty(r._store, "validated", {
          configurable: !1,
          enumerable: !1,
          writable: !0,
          value: 0
        }), Object.defineProperty(r, "_debugInfo", {
          configurable: !1,
          enumerable: !1,
          writable: !0,
          value: null
        }), Object.freeze && (Object.freeze(r.props), Object.freeze(r)), r;
      }
      function H(r, u) {
        return u = X(
          r.type,
          u,
          void 0,
          void 0,
          r._owner,
          r.props
        ), u._store.validated = r._store.validated, u;
      }
      function l(r, u) {
        if (typeof r == "object" && r && r.$$typeof !== Gr) {
          if (U(r))
            for (var d = 0; d < r.length; d++) {
              var b = r[d];
              L(b) && ee(b, u);
            }
          else if (L(r))
            r._store && (r._store.validated = 1);
          else if (d = o(r), typeof d == "function" && d !== r.entries && (d = d.call(r), d !== r))
            for (; !(r = d.next()).done; )
              L(r.value) && ee(r.value, u);
        }
      }
      function L(r) {
        return typeof r == "object" && r !== null && r.$$typeof === i;
      }
      function ee(r, u) {
        if (r._store && !r._store.validated && r.key == null && (r._store.validated = 1, u = fe(u), !Xt[u])) {
          Xt[u] = !0;
          var d = "";
          r && r._owner != null && r._owner !== J() && (d = null, typeof r._owner.tag == "number" ? d = y(r._owner.type) : typeof r._owner.name == "string" && (d = r._owner.name), d = " It was passed a child from " + d + ".");
          var b = E.getCurrentStack;
          E.getCurrentStack = function() {
            var A = F(r.type);
            return b && (A += b() || ""), A;
          }, console.error(
            'Each child in a list should have a unique "key" prop.%s%s See https://react.dev/link/warning-keys for more information.',
            u,
            d
          ), E.getCurrentStack = b;
        }
      }
      function fe(r) {
        var u = "", d = J();
        return d && (d = y(d.type)) && (u = `

Check the render method of \`` + d + "`."), u || (r = y(r)) && (u = `

Check the top-level render call using <` + r + ">."), u;
      }
      function we(r) {
        var u = { "=": "=0", ":": "=2" };
        return "$" + r.replace(/[=:]/g, function(d) {
          return u[d];
        });
      }
      function xe(r, u) {
        return typeof r == "object" && r !== null && r.key != null ? (S(r.key), we("" + r.key)) : u.toString(36);
      }
      function Ce() {
      }
      function Se(r) {
        switch (r.status) {
          case "fulfilled":
            return r.value;
          case "rejected":
            throw r.reason;
          default:
            switch (typeof r.status == "string" ? r.then(Ce, Ce) : (r.status = "pending", r.then(
              function(u) {
                r.status === "pending" && (r.status = "fulfilled", r.value = u);
              },
              function(u) {
                r.status === "pending" && (r.status = "rejected", r.reason = u);
              }
            )), r.status) {
              case "fulfilled":
                return r.value;
              case "rejected":
                throw r.reason;
            }
        }
        throw r;
      }
      function be(r, u, d, b, A) {
        var j = typeof r;
        (j === "undefined" || j === "boolean") && (r = null);
        var $ = !1;
        if (r === null) $ = !0;
        else
          switch (j) {
            case "bigint":
            case "string":
            case "number":
              $ = !0;
              break;
            case "object":
              switch (r.$$typeof) {
                case i:
                case he:
                  $ = !0;
                  break;
                case g:
                  return $ = r._init, be(
                    $(r._payload),
                    u,
                    d,
                    b,
                    A
                  );
              }
          }
        if ($) {
          $ = r, A = A($);
          var ce = b === "" ? "." + xe($, 0) : b;
          return U(A) ? (d = "", ce != null && (d = ce.replace(Qt, "$&/") + "/"), be(A, u, d, "", function(pe) {
            return pe;
          })) : A != null && (L(A) && (A.key != null && ($ && $.key === A.key || S(A.key)), d = H(
            A,
            d + (A.key == null || $ && $.key === A.key ? "" : ("" + A.key).replace(
              Qt,
              "$&/"
            ) + "/") + ce
          ), b !== "" && $ != null && L($) && $.key == null && $._store && !$._store.validated && (d._store.validated = 2), A = d), u.push(A)), 1;
        }
        if ($ = 0, ce = b === "" ? "." : b + ":", U(r))
          for (var ne = 0; ne < r.length; ne++)
            b = r[ne], j = ce + xe(b, ne), $ += be(
              b,
              u,
              d,
              j,
              A
            );
        else if (ne = o(r), typeof ne == "function")
          for (ne === r.entries && (Jt || console.warn(
            "Using Maps as children is not supported. Use an array of keyed ReactElements instead."
          ), Jt = !0), r = ne.call(r), ne = 0; !(b = r.next()).done; )
            b = b.value, j = ce + xe(b, ne++), $ += be(
              b,
              u,
              d,
              j,
              A
            );
        else if (j === "object") {
          if (typeof r.then == "function")
            return be(
              Se(r),
              u,
              d,
              b,
              A
            );
          throw u = String(r), Error(
            "Objects are not valid as a React child (found: " + (u === "[object Object]" ? "object with keys {" + Object.keys(r).join(", ") + "}" : u) + "). If you meant to render a collection of children, use an array instead."
          );
        }
        return $;
      }
      function Pe(r, u, d) {
        if (r == null) return r;
        var b = [], A = 0;
        return be(r, b, "", "", function(j) {
          return u.call(d, j, A++);
        }), b;
      }
      function Me(r) {
        if (r._status === -1) {
          var u = r._result;
          u = u(), u.then(
            function(d) {
              (r._status === 0 || r._status === -1) && (r._status = 1, r._result = d);
            },
            function(d) {
              (r._status === 0 || r._status === -1) && (r._status = 2, r._result = d);
            }
          ), r._status === -1 && (r._status = 0, r._result = u);
        }
        if (r._status === 1)
          return u = r._result, u === void 0 && console.error(
            `lazy: Expected the result of a dynamic import() call. Instead received: %s

Your code should look like: 
  const MyComponent = lazy(() => import('./MyComponent'))

Did you accidentally put curly braces around the import?`,
            u
          ), "default" in u || console.error(
            `lazy: Expected the result of a dynamic import() call. Instead received: %s

Your code should look like: 
  const MyComponent = lazy(() => import('./MyComponent'))`,
            u
          ), u.default;
        throw r._result;
      }
      function Q() {
        var r = E.H;
        return r === null && console.error(
          `Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:
1. You might have mismatching versions of React and the renderer (such as React DOM)
2. You might be breaking the Rules of Hooks
3. You might have more than one copy of React in the same app
See https://react.dev/link/invalid-hook-call for tips about how to debug and fix this problem.`
        ), r;
      }
      function c() {
      }
      function v(r) {
        if (at === null)
          try {
            var u = ("require" + Math.random()).slice(0, 7);
            at = (e && e[u]).call(
              e,
              "timers"
            ).setImmediate;
          } catch {
            at = function(b) {
              er === !1 && (er = !0, typeof MessageChannel > "u" && console.error(
                "This browser does not have a MessageChannel implementation, so enqueuing tasks via await act(async () => ...) will fail. Please file an issue at https://github.com/facebook/react/issues if you encounter this warning."
              ));
              var A = new MessageChannel();
              A.port1.onmessage = b, A.port2.postMessage(void 0);
            };
          }
        return at(r);
      }
      function N(r) {
        return 1 < r.length && typeof AggregateError == "function" ? new AggregateError(r) : r[0];
      }
      function M(r, u) {
        u !== st - 1 && console.error(
          "You seem to have overlapping act() calls, this is not supported. Be sure to await previous act() calls before making a new one. "
        ), st = u;
      }
      function I(r, u, d) {
        var b = E.actQueue;
        if (b !== null)
          if (b.length !== 0)
            try {
              te(b), v(function() {
                return I(r, u, d);
              });
              return;
            } catch (A) {
              E.thrownErrors.push(A);
            }
          else E.actQueue = null;
        0 < E.thrownErrors.length ? (b = N(E.thrownErrors), E.thrownErrors.length = 0, d(b)) : u(r);
      }
      function te(r) {
        if (!Tt) {
          Tt = !0;
          var u = 0;
          try {
            for (; u < r.length; u++) {
              var d = r[u];
              do {
                E.didUsePromise = !1;
                var b = d(!1);
                if (b !== null) {
                  if (E.didUsePromise) {
                    r[u] = d, r.splice(0, u);
                    return;
                  }
                  d = b;
                } else break;
              } while (!0);
            }
            r.length = 0;
          } catch (A) {
            r.splice(0, u + 1), E.thrownErrors.push(A);
          } finally {
            Tt = !1;
          }
        }
      }
      typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(Error());
      var i = Symbol.for("react.transitional.element"), he = Symbol.for("react.portal"), P = Symbol.for("react.fragment"), Oe = Symbol.for("react.strict_mode"), ge = Symbol.for("react.profiler"), C = Symbol.for("react.consumer"), R = Symbol.for("react.context"), G = Symbol.for("react.forward_ref"), m = Symbol.for("react.suspense"), B = Symbol.for("react.suspense_list"), le = Symbol.for("react.memo"), g = Symbol.for("react.lazy"), ze = Symbol.for("react.offscreen"), Fe = Symbol.iterator, Ue = {}, a = {
        isMounted: function() {
          return !1;
        },
        enqueueForceUpdate: function(r) {
          s(r, "forceUpdate");
        },
        enqueueReplaceState: function(r) {
          s(r, "replaceState");
        },
        enqueueSetState: function(r) {
          s(r, "setState");
        }
      }, O = Object.assign, T = {};
      Object.freeze(T), f.prototype.isReactComponent = {}, f.prototype.setState = function(r, u) {
        if (typeof r != "object" && typeof r != "function" && r != null)
          throw Error(
            "takes an object of state variables to update or a function which returns an object of state variables."
          );
        this.updater.enqueueSetState(this, r, u, "setState");
      }, f.prototype.forceUpdate = function(r) {
        this.updater.enqueueForceUpdate(this, r, "forceUpdate");
      };
      var q = {
        isMounted: [
          "isMounted",
          "Instead, make sure to clean up subscriptions and pending requests in componentWillUnmount to prevent memory leaks."
        ],
        replaceState: [
          "replaceState",
          "Refactor your code to use setState instead (see https://github.com/facebook/react/issues/3236)."
        ]
      }, Z;
      for (Z in q)
        q.hasOwnProperty(Z) && n(Z, q[Z]);
      p.prototype = f.prototype, q = w.prototype = new p(), q.constructor = w, O(q, f.prototype), q.isPureReactComponent = !0;
      var U = Array.isArray, x = Symbol.for("react.client.reference"), E = {
        H: null,
        A: null,
        T: null,
        S: null,
        actQueue: null,
        isBatchingLegacy: !1,
        didScheduleLegacyUpdate: !1,
        didUsePromise: !1,
        thrownErrors: [],
        getCurrentStack: null
      }, de = Object.prototype.hasOwnProperty, ye = Symbol.for("react.client.reference"), Ae = 0, Be, je, Ge, ke, Gt, Dt, zt;
      ue.__reactDisabledLog = !0;
      var Ot, Ht, xt = !1, Ct = new (typeof WeakMap == "function" ? WeakMap : Map)(), Gr = Symbol.for("react.client.reference"), qt, Kt, Vt = {}, Xt = {}, Jt = !1, Qt = /\/+/g, Zt = typeof reportError == "function" ? reportError : function(r) {
        if (typeof window == "object" && typeof window.ErrorEvent == "function") {
          var u = new window.ErrorEvent("error", {
            bubbles: !0,
            cancelable: !0,
            message: typeof r == "object" && r !== null && typeof r.message == "string" ? String(r.message) : String(r),
            error: r
          });
          if (!window.dispatchEvent(u)) return;
        } else if (typeof process == "object" && typeof process.emit == "function") {
          process.emit("uncaughtException", r);
          return;
        }
        console.error(r);
      }, er = !1, at = null, st = 0, ct = !1, Tt = !1, tr = typeof queueMicrotask == "function" ? function(r) {
        queueMicrotask(function() {
          return queueMicrotask(r);
        });
      } : v;
      t.Children = {
        map: Pe,
        forEach: function(r, u, d) {
          Pe(
            r,
            function() {
              u.apply(this, arguments);
            },
            d
          );
        },
        count: function(r) {
          var u = 0;
          return Pe(r, function() {
            u++;
          }), u;
        },
        toArray: function(r) {
          return Pe(r, function(u) {
            return u;
          }) || [];
        },
        only: function(r) {
          if (!L(r))
            throw Error(
              "React.Children.only expected to receive a single React element child."
            );
          return r;
        }
      }, t.Component = f, t.Fragment = P, t.Profiler = ge, t.PureComponent = w, t.StrictMode = Oe, t.Suspense = m, t.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = E, t.act = function(r) {
        var u = E.actQueue, d = st;
        st++;
        var b = E.actQueue = u !== null ? u : [], A = !1;
        try {
          var j = r();
        } catch (ne) {
          E.thrownErrors.push(ne);
        }
        if (0 < E.thrownErrors.length)
          throw M(u, d), r = N(E.thrownErrors), E.thrownErrors.length = 0, r;
        if (j !== null && typeof j == "object" && typeof j.then == "function") {
          var $ = j;
          return tr(function() {
            A || ct || (ct = !0, console.error(
              "You called act(async () => ...) without await. This could lead to unexpected testing behaviour, interleaving multiple act calls and mixing their scopes. You should - await act(async () => ...);"
            ));
          }), {
            then: function(ne, pe) {
              A = !0, $.then(
                function(Te) {
                  if (M(u, d), d === 0) {
                    try {
                      te(b), v(function() {
                        return I(
                          Te,
                          ne,
                          pe
                        );
                      });
                    } catch (Ne) {
                      E.thrownErrors.push(Ne);
                    }
                    if (0 < E.thrownErrors.length) {
                      var De = N(
                        E.thrownErrors
                      );
                      E.thrownErrors.length = 0, pe(De);
                    }
                  } else ne(Te);
                },
                function(Te) {
                  M(u, d), 0 < E.thrownErrors.length && (Te = N(
                    E.thrownErrors
                  ), E.thrownErrors.length = 0), pe(Te);
                }
              );
            }
          };
        }
        var ce = j;
        if (M(u, d), d === 0 && (te(b), b.length !== 0 && tr(function() {
          A || ct || (ct = !0, console.error(
            "A component suspended inside an `act` scope, but the `act` call was not awaited. When testing React components that depend on asynchronous data, you must await the result:\n\nawait act(() => ...)"
          ));
        }), E.actQueue = null), 0 < E.thrownErrors.length)
          throw r = N(E.thrownErrors), E.thrownErrors.length = 0, r;
        return {
          then: function(ne, pe) {
            A = !0, d === 0 ? (E.actQueue = b, v(function() {
              return I(
                ce,
                ne,
                pe
              );
            })) : ne(ce);
          }
        };
      }, t.cache = function(r) {
        return function() {
          return r.apply(null, arguments);
        };
      }, t.cloneElement = function(r, u, d) {
        if (r == null)
          throw Error(
            "The argument must be a React element, but you passed " + r + "."
          );
        var b = O({}, r.props), A = r.key, j = r._owner;
        if (u != null) {
          var $;
          e: {
            if (de.call(u, "ref") && ($ = Object.getOwnPropertyDescriptor(
              u,
              "ref"
            ).get) && $.isReactWarning) {
              $ = !1;
              break e;
            }
            $ = u.ref !== void 0;
          }
          $ && (j = J()), Y(u) && (S(u.key), A = "" + u.key);
          for (ce in u)
            !de.call(u, ce) || ce === "key" || ce === "__self" || ce === "__source" || ce === "ref" && u.ref === void 0 || (b[ce] = u[ce]);
        }
        var ce = arguments.length - 2;
        if (ce === 1) b.children = d;
        else if (1 < ce) {
          $ = Array(ce);
          for (var ne = 0; ne < ce; ne++)
            $[ne] = arguments[ne + 2];
          b.children = $;
        }
        for (b = X(r.type, A, void 0, void 0, j, b), A = 2; A < arguments.length; A++)
          l(arguments[A], b.type);
        return b;
      }, t.createContext = function(r) {
        return r = {
          $$typeof: R,
          _currentValue: r,
          _currentValue2: r,
          _threadCount: 0,
          Provider: null,
          Consumer: null
        }, r.Provider = r, r.Consumer = {
          $$typeof: C,
          _context: r
        }, r._currentRenderer = null, r._currentRenderer2 = null, r;
      }, t.createElement = function(r, u, d) {
        if (k(r))
          for (var b = 2; b < arguments.length; b++)
            l(arguments[b], r);
        else {
          if (b = "", (r === void 0 || typeof r == "object" && r !== null && Object.keys(r).length === 0) && (b += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports."), r === null) var A = "null";
          else
            U(r) ? A = "array" : r !== void 0 && r.$$typeof === i ? (A = "<" + (y(r.type) || "Unknown") + " />", b = " Did you accidentally export a JSX literal instead of a component?") : A = typeof r;
          console.error(
            "React.createElement: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s",
            A,
            b
          );
        }
        var j;
        if (b = {}, A = null, u != null)
          for (j in Kt || !("__self" in u) || "key" in u || (Kt = !0, console.warn(
            "Your app (or one of its dependencies) is using an outdated JSX transform. Update to the modern JSX transform for faster performance: https://react.dev/link/new-jsx-transform"
          )), Y(u) && (S(u.key), A = "" + u.key), u)
            de.call(u, j) && j !== "key" && j !== "__self" && j !== "__source" && (b[j] = u[j]);
        var $ = arguments.length - 2;
        if ($ === 1) b.children = d;
        else if (1 < $) {
          for (var ce = Array($), ne = 0; ne < $; ne++)
            ce[ne] = arguments[ne + 2];
          Object.freeze && Object.freeze(ce), b.children = ce;
        }
        if (r && r.defaultProps)
          for (j in $ = r.defaultProps, $)
            b[j] === void 0 && (b[j] = $[j]);
        return A && V(
          b,
          typeof r == "function" ? r.displayName || r.name || "Unknown" : r
        ), X(r, A, void 0, void 0, J(), b);
      }, t.createRef = function() {
        var r = { current: null };
        return Object.seal(r), r;
      }, t.forwardRef = function(r) {
        r != null && r.$$typeof === le ? console.error(
          "forwardRef requires a render function but received a `memo` component. Instead of forwardRef(memo(...)), use memo(forwardRef(...))."
        ) : typeof r != "function" ? console.error(
          "forwardRef requires a render function but was given %s.",
          r === null ? "null" : typeof r
        ) : r.length !== 0 && r.length !== 2 && console.error(
          "forwardRef render functions accept exactly two parameters: props and ref. %s",
          r.length === 1 ? "Did you forget to use the ref parameter?" : "Any additional parameter will be undefined."
        ), r != null && r.defaultProps != null && console.error(
          "forwardRef render functions do not support defaultProps. Did you accidentally pass a React component?"
        );
        var u = { $$typeof: G, render: r }, d;
        return Object.defineProperty(u, "displayName", {
          enumerable: !1,
          configurable: !0,
          get: function() {
            return d;
          },
          set: function(b) {
            d = b, r.name || r.displayName || (Object.defineProperty(r, "name", { value: b }), r.displayName = b);
          }
        }), u;
      }, t.isValidElement = L, t.lazy = function(r) {
        return {
          $$typeof: g,
          _payload: { _status: -1, _result: r },
          _init: Me
        };
      }, t.memo = function(r, u) {
        k(r) || console.error(
          "memo: The first argument must be a component. Instead received: %s",
          r === null ? "null" : typeof r
        ), u = {
          $$typeof: le,
          type: r,
          compare: u === void 0 ? null : u
        };
        var d;
        return Object.defineProperty(u, "displayName", {
          enumerable: !1,
          configurable: !0,
          get: function() {
            return d;
          },
          set: function(b) {
            d = b, r.name || r.displayName || (Object.defineProperty(r, "name", { value: b }), r.displayName = b);
          }
        }), u;
      }, t.startTransition = function(r) {
        var u = E.T, d = {};
        E.T = d, d._updatedFibers = /* @__PURE__ */ new Set();
        try {
          var b = r(), A = E.S;
          A !== null && A(d, b), typeof b == "object" && b !== null && typeof b.then == "function" && b.then(c, Zt);
        } catch (j) {
          Zt(j);
        } finally {
          u === null && d._updatedFibers && (r = d._updatedFibers.size, d._updatedFibers.clear(), 10 < r && console.warn(
            "Detected a large number of updates inside startTransition. If this is due to a subscription please re-write it to use React provided hooks. Otherwise concurrent mode guarantees are off the table."
          )), E.T = u;
        }
      }, t.unstable_useCacheRefresh = function() {
        return Q().useCacheRefresh();
      }, t.use = function(r) {
        return Q().use(r);
      }, t.useActionState = function(r, u, d) {
        return Q().useActionState(
          r,
          u,
          d
        );
      }, t.useCallback = function(r, u) {
        return Q().useCallback(r, u);
      }, t.useContext = function(r) {
        var u = Q();
        return r.$$typeof === C && console.error(
          "Calling useContext(Context.Consumer) is not supported and will cause bugs. Did you mean to call useContext(Context) instead?"
        ), u.useContext(r);
      }, t.useDebugValue = function(r, u) {
        return Q().useDebugValue(r, u);
      }, t.useDeferredValue = function(r, u) {
        return Q().useDeferredValue(r, u);
      }, t.useEffect = function(r, u) {
        return Q().useEffect(r, u);
      }, t.useId = function() {
        return Q().useId();
      }, t.useImperativeHandle = function(r, u, d) {
        return Q().useImperativeHandle(r, u, d);
      }, t.useInsertionEffect = function(r, u) {
        return Q().useInsertionEffect(r, u);
      }, t.useLayoutEffect = function(r, u) {
        return Q().useLayoutEffect(r, u);
      }, t.useMemo = function(r, u) {
        return Q().useMemo(r, u);
      }, t.useOptimistic = function(r, u) {
        return Q().useOptimistic(r, u);
      }, t.useReducer = function(r, u, d) {
        return Q().useReducer(r, u, d);
      }, t.useRef = function(r) {
        return Q().useRef(r);
      }, t.useState = function(r) {
        return Q().useState(r);
      }, t.useSyncExternalStore = function(r, u, d) {
        return Q().useSyncExternalStore(
          r,
          u,
          d
        );
      }, t.useTransition = function() {
        return Q().useTransition();
      }, t.version = "19.0.0", typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(Error());
    }();
  }(et, et.exports)), et.exports;
}
var sr;
function Tr() {
  return sr || (sr = 1, process.env.NODE_ENV === "production" ? lt.exports = Qr() : lt.exports = Zr()), lt.exports;
}
/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var cr;
function en() {
  return cr || (cr = 1, process.env.NODE_ENV !== "production" && function() {
    function e(a) {
      if (a == null) return null;
      if (typeof a == "function")
        return a.$$typeof === Me ? null : a.displayName || a.name || null;
      if (typeof a == "string") return a;
      switch (a) {
        case X:
          return "Fragment";
        case h:
          return "Portal";
        case l:
          return "Profiler";
        case H:
          return "StrictMode";
        case we:
          return "Suspense";
        case xe:
          return "SuspenseList";
      }
      if (typeof a == "object")
        switch (typeof a.tag == "number" && console.error(
          "Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."
        ), a.$$typeof) {
          case ee:
            return (a.displayName || "Context") + ".Provider";
          case L:
            return (a._context.displayName || "Context") + ".Consumer";
          case fe:
            var O = a.render;
            return a = a.displayName, a || (a = O.displayName || O.name || "", a = a !== "" ? "ForwardRef(" + a + ")" : "ForwardRef"), a;
          case Ce:
            return O = a.displayName || null, O !== null ? O : e(a.type) || "Memo";
          case Se:
            O = a._payload, a = a._init;
            try {
              return e(a(O));
            } catch {
            }
        }
      return null;
    }
    function t(a) {
      return "" + a;
    }
    function n(a) {
      try {
        t(a);
        var O = !1;
      } catch {
        O = !0;
      }
      if (O) {
        O = console;
        var T = O.error, q = typeof Symbol == "function" && Symbol.toStringTag && a[Symbol.toStringTag] || a.constructor.name || "Object";
        return T.call(
          O,
          "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.",
          q
        ), t(a);
      }
    }
    function o() {
    }
    function s() {
      if (I === 0) {
        te = console.log, i = console.info, he = console.warn, P = console.error, Oe = console.group, ge = console.groupCollapsed, C = console.groupEnd;
        var a = {
          configurable: !0,
          enumerable: !0,
          value: o,
          writable: !0
        };
        Object.defineProperties(console, {
          info: a,
          log: a,
          warn: a,
          error: a,
          group: a,
          groupCollapsed: a,
          groupEnd: a
        });
      }
      I++;
    }
    function f() {
      if (I--, I === 0) {
        var a = { configurable: !0, enumerable: !0, writable: !0 };
        Object.defineProperties(console, {
          log: v({}, a, { value: te }),
          info: v({}, a, { value: i }),
          warn: v({}, a, { value: he }),
          error: v({}, a, { value: P }),
          group: v({}, a, { value: Oe }),
          groupCollapsed: v({}, a, { value: ge }),
          groupEnd: v({}, a, { value: C })
        });
      }
      0 > I && console.error(
        "disabledDepth fell below zero. This is a bug in React. Please file an issue."
      );
    }
    function p(a) {
      if (R === void 0)
        try {
          throw Error();
        } catch (T) {
          var O = T.stack.trim().match(/\n( *(at )?)/);
          R = O && O[1] || "", G = -1 < T.stack.indexOf(`
    at`) ? " (<anonymous>)" : -1 < T.stack.indexOf("@") ? "@unknown:0:0" : "";
        }
      return `
` + R + a + G;
    }
    function w(a, O) {
      if (!a || m) return "";
      var T = B.get(a);
      if (T !== void 0) return T;
      m = !0, T = Error.prepareStackTrace, Error.prepareStackTrace = void 0;
      var q = null;
      q = Q.H, Q.H = null, s();
      try {
        var Z = {
          DetermineComponentFrameRoot: function() {
            try {
              if (O) {
                var je = function() {
                  throw Error();
                };
                if (Object.defineProperty(je.prototype, "props", {
                  set: function() {
                    throw Error();
                  }
                }), typeof Reflect == "object" && Reflect.construct) {
                  try {
                    Reflect.construct(je, []);
                  } catch (ke) {
                    var Ge = ke;
                  }
                  Reflect.construct(a, [], je);
                } else {
                  try {
                    je.call();
                  } catch (ke) {
                    Ge = ke;
                  }
                  a.call(je.prototype);
                }
              } else {
                try {
                  throw Error();
                } catch (ke) {
                  Ge = ke;
                }
                (je = a()) && typeof je.catch == "function" && je.catch(function() {
                });
              }
            } catch (ke) {
              if (ke && Ge && typeof ke.stack == "string")
                return [ke.stack, Ge.stack];
            }
            return [null, null];
          }
        };
        Z.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
        var U = Object.getOwnPropertyDescriptor(
          Z.DetermineComponentFrameRoot,
          "name"
        );
        U && U.configurable && Object.defineProperty(
          Z.DetermineComponentFrameRoot,
          "name",
          { value: "DetermineComponentFrameRoot" }
        );
        var x = Z.DetermineComponentFrameRoot(), E = x[0], de = x[1];
        if (E && de) {
          var ye = E.split(`
`), Ae = de.split(`
`);
          for (x = U = 0; U < ye.length && !ye[U].includes(
            "DetermineComponentFrameRoot"
          ); )
            U++;
          for (; x < Ae.length && !Ae[x].includes(
            "DetermineComponentFrameRoot"
          ); )
            x++;
          if (U === ye.length || x === Ae.length)
            for (U = ye.length - 1, x = Ae.length - 1; 1 <= U && 0 <= x && ye[U] !== Ae[x]; )
              x--;
          for (; 1 <= U && 0 <= x; U--, x--)
            if (ye[U] !== Ae[x]) {
              if (U !== 1 || x !== 1)
                do
                  if (U--, x--, 0 > x || ye[U] !== Ae[x]) {
                    var Be = `
` + ye[U].replace(
                      " at new ",
                      " at "
                    );
                    return a.displayName && Be.includes("<anonymous>") && (Be = Be.replace("<anonymous>", a.displayName)), typeof a == "function" && B.set(a, Be), Be;
                  }
                while (1 <= U && 0 <= x);
              break;
            }
        }
      } finally {
        m = !1, Q.H = q, f(), Error.prepareStackTrace = T;
      }
      return ye = (ye = a ? a.displayName || a.name : "") ? p(ye) : "", typeof a == "function" && B.set(a, ye), ye;
    }
    function _(a) {
      if (a == null) return "";
      if (typeof a == "function") {
        var O = a.prototype;
        return w(
          a,
          !(!O || !O.isReactComponent)
        );
      }
      if (typeof a == "string") return p(a);
      switch (a) {
        case we:
          return p("Suspense");
        case xe:
          return p("SuspenseList");
      }
      if (typeof a == "object")
        switch (a.$$typeof) {
          case fe:
            return a = w(a.render, !1), a;
          case Ce:
            return _(a.type);
          case Se:
            O = a._payload, a = a._init;
            try {
              return _(a(O));
            } catch {
            }
        }
      return "";
    }
    function S() {
      var a = Q.A;
      return a === null ? null : a.getOwner();
    }
    function y(a) {
      if (c.call(a, "key")) {
        var O = Object.getOwnPropertyDescriptor(a, "key").get;
        if (O && O.isReactWarning) return !1;
      }
      return a.key !== void 0;
    }
    function k(a, O) {
      function T() {
        g || (g = !0, console.error(
          "%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)",
          O
        ));
      }
      T.isReactWarning = !0, Object.defineProperty(a, "key", {
        get: T,
        configurable: !0
      });
    }
    function ue() {
      var a = e(this.type);
      return ze[a] || (ze[a] = !0, console.error(
        "Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release."
      )), a = this.props.ref, a !== void 0 ? a : null;
    }
    function re(a, O, T, q, Z, U) {
      return T = U.ref, a = {
        $$typeof: V,
        type: a,
        key: O,
        props: U,
        _owner: Z
      }, (T !== void 0 ? T : null) !== null ? Object.defineProperty(a, "ref", {
        enumerable: !1,
        get: ue
      }) : Object.defineProperty(a, "ref", { enumerable: !1, value: null }), a._store = {}, Object.defineProperty(a._store, "validated", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: 0
      }), Object.defineProperty(a, "_debugInfo", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: null
      }), Object.freeze && (Object.freeze(a.props), Object.freeze(a)), a;
    }
    function D(a, O, T, q, Z, U) {
      if (typeof a == "string" || typeof a == "function" || a === X || a === l || a === H || a === we || a === xe || a === be || typeof a == "object" && a !== null && (a.$$typeof === Se || a.$$typeof === Ce || a.$$typeof === ee || a.$$typeof === L || a.$$typeof === fe || a.$$typeof === N || a.getModuleId !== void 0)) {
        var x = O.children;
        if (x !== void 0)
          if (q)
            if (M(x)) {
              for (q = 0; q < x.length; q++)
                W(x[q], a);
              Object.freeze && Object.freeze(x);
            } else
              console.error(
                "React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead."
              );
          else W(x, a);
      } else
        x = "", (a === void 0 || typeof a == "object" && a !== null && Object.keys(a).length === 0) && (x += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports."), a === null ? q = "null" : M(a) ? q = "array" : a !== void 0 && a.$$typeof === V ? (q = "<" + (e(a.type) || "Unknown") + " />", x = " Did you accidentally export a JSX literal instead of a component?") : q = typeof a, console.error(
          "React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s",
          q,
          x
        );
      if (c.call(O, "key")) {
        x = e(a);
        var E = Object.keys(O).filter(function(ye) {
          return ye !== "key";
        });
        q = 0 < E.length ? "{key: someKey, " + E.join(": ..., ") + ": ...}" : "{key: someKey}", Fe[x + q] || (E = 0 < E.length ? "{" + E.join(": ..., ") + ": ...}" : "{}", console.error(
          `A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`,
          q,
          x,
          E,
          x
        ), Fe[x + q] = !0);
      }
      if (x = null, T !== void 0 && (n(T), x = "" + T), y(O) && (n(O.key), x = "" + O.key), "key" in O) {
        T = {};
        for (var de in O)
          de !== "key" && (T[de] = O[de]);
      } else T = O;
      return x && k(
        T,
        typeof a == "function" ? a.displayName || a.name || "Unknown" : a
      ), re(a, x, U, Z, S(), T);
    }
    function W(a, O) {
      if (typeof a == "object" && a && a.$$typeof !== le) {
        if (M(a))
          for (var T = 0; T < a.length; T++) {
            var q = a[T];
            z(q) && F(q, O);
          }
        else if (z(a))
          a._store && (a._store.validated = 1);
        else if (a === null || typeof a != "object" ? T = null : (T = Pe && a[Pe] || a["@@iterator"], T = typeof T == "function" ? T : null), typeof T == "function" && T !== a.entries && (T = T.call(a), T !== a))
          for (; !(a = T.next()).done; )
            z(a.value) && F(a.value, O);
      }
    }
    function z(a) {
      return typeof a == "object" && a !== null && a.$$typeof === V;
    }
    function F(a, O) {
      if (a._store && !a._store.validated && a.key == null && (a._store.validated = 1, O = J(O), !Ue[O])) {
        Ue[O] = !0;
        var T = "";
        a && a._owner != null && a._owner !== S() && (T = null, typeof a._owner.tag == "number" ? T = e(a._owner.type) : typeof a._owner.name == "string" && (T = a._owner.name), T = " It was passed a child from " + T + ".");
        var q = Q.getCurrentStack;
        Q.getCurrentStack = function() {
          var Z = _(a.type);
          return q && (Z += q() || ""), Z;
        }, console.error(
          'Each child in a list should have a unique "key" prop.%s%s See https://react.dev/link/warning-keys for more information.',
          O,
          T
        ), Q.getCurrentStack = q;
      }
    }
    function J(a) {
      var O = "", T = S();
      return T && (T = e(T.type)) && (O = `

Check the render method of \`` + T + "`."), O || (a = e(a)) && (O = `

Check the top-level render call using <` + a + ">."), O;
    }
    var Y = Tr(), V = Symbol.for("react.transitional.element"), h = Symbol.for("react.portal"), X = Symbol.for("react.fragment"), H = Symbol.for("react.strict_mode"), l = Symbol.for("react.profiler"), L = Symbol.for("react.consumer"), ee = Symbol.for("react.context"), fe = Symbol.for("react.forward_ref"), we = Symbol.for("react.suspense"), xe = Symbol.for("react.suspense_list"), Ce = Symbol.for("react.memo"), Se = Symbol.for("react.lazy"), be = Symbol.for("react.offscreen"), Pe = Symbol.iterator, Me = Symbol.for("react.client.reference"), Q = Y.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, c = Object.prototype.hasOwnProperty, v = Object.assign, N = Symbol.for("react.client.reference"), M = Array.isArray, I = 0, te, i, he, P, Oe, ge, C;
    o.__reactDisabledLog = !0;
    var R, G, m = !1, B = new (typeof WeakMap == "function" ? WeakMap : Map)(), le = Symbol.for("react.client.reference"), g, ze = {}, Fe = {}, Ue = {};
    Je.Fragment = X, Je.jsx = function(a, O, T, q, Z) {
      return D(a, O, T, !1, q, Z);
    }, Je.jsxs = function(a, O, T, q, Z) {
      return D(a, O, T, !0, q, Z);
    };
  }()), Je;
}
var ur;
function tn() {
  return ur || (ur = 1, process.env.NODE_ENV === "production" ? ft.exports = Jr() : ft.exports = en()), ft.exports;
}
var tt = tn(), me = Tr();
const Mt = /* @__PURE__ */ zr(me), fr = /* @__PURE__ */ Dr({
  __proto__: null,
  default: Mt
}, [me]);
var rn = !1;
function nn(e) {
  if (e.sheet)
    return e.sheet;
  for (var t = 0; t < document.styleSheets.length; t++)
    if (document.styleSheets[t].ownerNode === e)
      return document.styleSheets[t];
}
function on(e) {
  var t = document.createElement("style");
  return t.setAttribute("data-emotion", e.key), e.nonce !== void 0 && t.setAttribute("nonce", e.nonce), t.appendChild(document.createTextNode("")), t.setAttribute("data-s", ""), t;
}
var an = /* @__PURE__ */ function() {
  function e(n) {
    var o = this;
    this._insertTag = function(s) {
      var f;
      o.tags.length === 0 ? o.insertionPoint ? f = o.insertionPoint.nextSibling : o.prepend ? f = o.container.firstChild : f = o.before : f = o.tags[o.tags.length - 1].nextSibling, o.container.insertBefore(s, f), o.tags.push(s);
    }, this.isSpeedy = n.speedy === void 0 ? !rn : n.speedy, this.tags = [], this.ctr = 0, this.nonce = n.nonce, this.key = n.key, this.container = n.container, this.prepend = n.prepend, this.insertionPoint = n.insertionPoint, this.before = null;
  }
  var t = e.prototype;
  return t.hydrate = function(o) {
    o.forEach(this._insertTag);
  }, t.insert = function(o) {
    this.ctr % (this.isSpeedy ? 65e3 : 1) === 0 && this._insertTag(on(this));
    var s = this.tags[this.tags.length - 1];
    if (this.isSpeedy) {
      var f = nn(s);
      try {
        f.insertRule(o, f.cssRules.length);
      } catch {
      }
    } else
      s.appendChild(document.createTextNode(o));
    this.ctr++;
  }, t.flush = function() {
    this.tags.forEach(function(o) {
      var s;
      return (s = o.parentNode) == null ? void 0 : s.removeChild(o);
    }), this.tags = [], this.ctr = 0;
  }, e;
}(), _e = "-ms-", gt = "-moz-", oe = "-webkit-", Rr = "comm", Bt = "rule", Ft = "decl", sn = "@import", Pr = "@keyframes", cn = "@layer", un = Math.abs, Et = String.fromCharCode, fn = Object.assign;
function ln(e, t) {
  return Ee(e, 0) ^ 45 ? (((t << 2 ^ Ee(e, 0)) << 2 ^ Ee(e, 1)) << 2 ^ Ee(e, 2)) << 2 ^ Ee(e, 3) : 0;
}
function Ar(e) {
  return e.trim();
}
function dn(e, t) {
  return (e = t.exec(e)) ? e[0] : e;
}
function ie(e, t, n) {
  return e.replace(t, n);
}
function jt(e, t) {
  return e.indexOf(t);
}
function Ee(e, t) {
  return e.charCodeAt(t) | 0;
}
function rt(e, t, n) {
  return e.slice(t, n);
}
function Ie(e) {
  return e.length;
}
function Ut(e) {
  return e.length;
}
function dt(e, t) {
  return t.push(e), e;
}
function pn(e, t) {
  return e.map(t).join("");
}
var wt = 1, qe = 1, $r = 0, Re = 0, ve = 0, Ke = "";
function St(e, t, n, o, s, f, p) {
  return { value: e, root: t, parent: n, type: o, props: s, children: f, line: wt, column: qe, length: p, return: "" };
}
function Qe(e, t) {
  return fn(St("", null, null, "", null, null, 0), e, { length: -e.length }, t);
}
function hn() {
  return ve;
}
function vn() {
  return ve = Re > 0 ? Ee(Ke, --Re) : 0, qe--, ve === 10 && (qe = 1, wt--), ve;
}
function $e() {
  return ve = Re < $r ? Ee(Ke, Re++) : 0, qe++, ve === 10 && (qe = 1, wt++), ve;
}
function We() {
  return Ee(Ke, Re);
}
function ht() {
  return Re;
}
function it(e, t) {
  return rt(Ke, e, t);
}
function nt(e) {
  switch (e) {
    // \0 \t \n \r \s whitespace token
    case 0:
    case 9:
    case 10:
    case 13:
    case 32:
      return 5;
    // ! + , / > @ ~ isolate token
    case 33:
    case 43:
    case 44:
    case 47:
    case 62:
    case 64:
    case 126:
    // ; { } breakpoint token
    case 59:
    case 123:
    case 125:
      return 4;
    // : accompanied token
    case 58:
      return 3;
    // " ' ( [ opening delimit token
    case 34:
    case 39:
    case 40:
    case 91:
      return 2;
    // ) ] closing delimit token
    case 41:
    case 93:
      return 1;
  }
  return 0;
}
function kr(e) {
  return wt = qe = 1, $r = Ie(Ke = e), Re = 0, [];
}
function Mr(e) {
  return Ke = "", e;
}
function vt(e) {
  return Ar(it(Re - 1, Nt(e === 91 ? e + 2 : e === 40 ? e + 1 : e)));
}
function mn(e) {
  for (; (ve = We()) && ve < 33; )
    $e();
  return nt(e) > 2 || nt(ve) > 3 ? "" : " ";
}
function bn(e, t) {
  for (; --t && $e() && !(ve < 48 || ve > 102 || ve > 57 && ve < 65 || ve > 70 && ve < 97); )
    ;
  return it(e, ht() + (t < 6 && We() == 32 && $e() == 32));
}
function Nt(e) {
  for (; $e(); )
    switch (ve) {
      // ] ) " '
      case e:
        return Re;
      // " '
      case 34:
      case 39:
        e !== 34 && e !== 39 && Nt(ve);
        break;
      // (
      case 40:
        e === 41 && Nt(e);
        break;
      // \
      case 92:
        $e();
        break;
    }
  return Re;
}
function gn(e, t) {
  for (; $e() && e + ve !== 57; )
    if (e + ve === 84 && We() === 47)
      break;
  return "/*" + it(t, Re - 1) + "*" + Et(e === 47 ? e : $e());
}
function yn(e) {
  for (; !nt(We()); )
    $e();
  return it(e, Re);
}
function En(e) {
  return Mr(mt("", null, null, null, [""], e = kr(e), 0, [0], e));
}
function mt(e, t, n, o, s, f, p, w, _) {
  for (var S = 0, y = 0, k = p, ue = 0, re = 0, D = 0, W = 1, z = 1, F = 1, J = 0, Y = "", V = s, h = f, X = o, H = Y; z; )
    switch (D = J, J = $e()) {
      // (
      case 40:
        if (D != 108 && Ee(H, k - 1) == 58) {
          jt(H += ie(vt(J), "&", "&\f"), "&\f") != -1 && (F = -1);
          break;
        }
      // " ' [
      case 34:
      case 39:
      case 91:
        H += vt(J);
        break;
      // \t \n \r \s
      case 9:
      case 10:
      case 13:
      case 32:
        H += mn(D);
        break;
      // \
      case 92:
        H += bn(ht() - 1, 7);
        continue;
      // /
      case 47:
        switch (We()) {
          case 42:
          case 47:
            dt(wn(gn($e(), ht()), t, n), _);
            break;
          default:
            H += "/";
        }
        break;
      // {
      case 123 * W:
        w[S++] = Ie(H) * F;
      // } ; \0
      case 125 * W:
      case 59:
      case 0:
        switch (J) {
          // \0 }
          case 0:
          case 125:
            z = 0;
          // ;
          case 59 + y:
            F == -1 && (H = ie(H, /\f/g, "")), re > 0 && Ie(H) - k && dt(re > 32 ? dr(H + ";", o, n, k - 1) : dr(ie(H, " ", "") + ";", o, n, k - 2), _);
            break;
          // @ ;
          case 59:
            H += ";";
          // { rule/at-rule
          default:
            if (dt(X = lr(H, t, n, S, y, s, w, Y, V = [], h = [], k), f), J === 123)
              if (y === 0)
                mt(H, t, X, X, V, f, k, w, h);
              else
                switch (ue === 99 && Ee(H, 3) === 110 ? 100 : ue) {
                  // d l m s
                  case 100:
                  case 108:
                  case 109:
                  case 115:
                    mt(e, X, X, o && dt(lr(e, X, X, 0, 0, s, w, Y, s, V = [], k), h), s, h, k, w, o ? V : h);
                    break;
                  default:
                    mt(H, X, X, X, [""], h, 0, w, h);
                }
        }
        S = y = re = 0, W = F = 1, Y = H = "", k = p;
        break;
      // :
      case 58:
        k = 1 + Ie(H), re = D;
      default:
        if (W < 1) {
          if (J == 123)
            --W;
          else if (J == 125 && W++ == 0 && vn() == 125)
            continue;
        }
        switch (H += Et(J), J * W) {
          // &
          case 38:
            F = y > 0 ? 1 : (H += "\f", -1);
            break;
          // ,
          case 44:
            w[S++] = (Ie(H) - 1) * F, F = 1;
            break;
          // @
          case 64:
            We() === 45 && (H += vt($e())), ue = We(), y = k = Ie(Y = H += yn(ht())), J++;
            break;
          // -
          case 45:
            D === 45 && Ie(H) == 2 && (W = 0);
        }
    }
  return f;
}
function lr(e, t, n, o, s, f, p, w, _, S, y) {
  for (var k = s - 1, ue = s === 0 ? f : [""], re = Ut(ue), D = 0, W = 0, z = 0; D < o; ++D)
    for (var F = 0, J = rt(e, k + 1, k = un(W = p[D])), Y = e; F < re; ++F)
      (Y = Ar(W > 0 ? ue[F] + " " + J : ie(J, /&\f/g, ue[F]))) && (_[z++] = Y);
  return St(e, t, n, s === 0 ? Bt : w, _, S, y);
}
function wn(e, t, n) {
  return St(e, t, n, Rr, Et(hn()), rt(e, 2, -2), 0);
}
function dr(e, t, n, o) {
  return St(e, t, n, Ft, rt(e, 0, o), rt(e, o + 1, -1), o);
}
function He(e, t) {
  for (var n = "", o = Ut(e), s = 0; s < o; s++)
    n += t(e[s], s, e, t) || "";
  return n;
}
function Sn(e, t, n, o) {
  switch (e.type) {
    case cn:
      if (e.children.length) break;
    case sn:
    case Ft:
      return e.return = e.return || e.value;
    case Rr:
      return "";
    case Pr:
      return e.return = e.value + "{" + He(e.children, o) + "}";
    case Bt:
      e.value = e.props.join(",");
  }
  return Ie(n = He(e.children, o)) ? e.return = e.value + "{" + n + "}" : "";
}
function _n(e) {
  var t = Ut(e);
  return function(n, o, s, f) {
    for (var p = "", w = 0; w < t; w++)
      p += e[w](n, o, s, f) || "";
    return p;
  };
}
function On(e) {
  return function(t) {
    t.root || (t = t.return) && e(t);
  };
}
function xn(e) {
  var t = /* @__PURE__ */ Object.create(null);
  return function(n) {
    return t[n] === void 0 && (t[n] = e(n)), t[n];
  };
}
var Cn = function(t, n, o) {
  for (var s = 0, f = 0; s = f, f = We(), s === 38 && f === 12 && (n[o] = 1), !nt(f); )
    $e();
  return it(t, Re);
}, Tn = function(t, n) {
  var o = -1, s = 44;
  do
    switch (nt(s)) {
      case 0:
        s === 38 && We() === 12 && (n[o] = 1), t[o] += Cn(Re - 1, n, o);
        break;
      case 2:
        t[o] += vt(s);
        break;
      case 4:
        if (s === 44) {
          t[++o] = We() === 58 ? "&\f" : "", n[o] = t[o].length;
          break;
        }
      // fallthrough
      default:
        t[o] += Et(s);
    }
  while (s = $e());
  return t;
}, Rn = function(t, n) {
  return Mr(Tn(kr(t), n));
}, pr = /* @__PURE__ */ new WeakMap(), Pn = function(t) {
  if (!(t.type !== "rule" || !t.parent || // positive .length indicates that this rule contains pseudo
  // negative .length indicates that this rule has been already prefixed
  t.length < 1)) {
    for (var n = t.value, o = t.parent, s = t.column === o.column && t.line === o.line; o.type !== "rule"; )
      if (o = o.parent, !o) return;
    if (!(t.props.length === 1 && n.charCodeAt(0) !== 58 && !pr.get(o)) && !s) {
      pr.set(t, !0);
      for (var f = [], p = Rn(n, f), w = o.props, _ = 0, S = 0; _ < p.length; _++)
        for (var y = 0; y < w.length; y++, S++)
          t.props[S] = f[_] ? p[_].replace(/&\f/g, w[y]) : w[y] + " " + p[_];
    }
  }
}, An = function(t) {
  if (t.type === "decl") {
    var n = t.value;
    // charcode for l
    n.charCodeAt(0) === 108 && // charcode for b
    n.charCodeAt(2) === 98 && (t.return = "", t.value = "");
  }
};
function jr(e, t) {
  switch (ln(e, t)) {
    // color-adjust
    case 5103:
      return oe + "print-" + e + e;
    // animation, animation-(delay|direction|duration|fill-mode|iteration-count|name|play-state|timing-function)
    case 5737:
    case 4201:
    case 3177:
    case 3433:
    case 1641:
    case 4457:
    case 2921:
    // text-decoration, filter, clip-path, backface-visibility, column, box-decoration-break
    case 5572:
    case 6356:
    case 5844:
    case 3191:
    case 6645:
    case 3005:
    // mask, mask-image, mask-(mode|clip|size), mask-(repeat|origin), mask-position, mask-composite,
    case 6391:
    case 5879:
    case 5623:
    case 6135:
    case 4599:
    case 4855:
    // background-clip, columns, column-(count|fill|gap|rule|rule-color|rule-style|rule-width|span|width)
    case 4215:
    case 6389:
    case 5109:
    case 5365:
    case 5621:
    case 3829:
      return oe + e + e;
    // appearance, user-select, transform, hyphens, text-size-adjust
    case 5349:
    case 4246:
    case 4810:
    case 6968:
    case 2756:
      return oe + e + gt + e + _e + e + e;
    // flex, flex-direction
    case 6828:
    case 4268:
      return oe + e + _e + e + e;
    // order
    case 6165:
      return oe + e + _e + "flex-" + e + e;
    // align-items
    case 5187:
      return oe + e + ie(e, /(\w+).+(:[^]+)/, oe + "box-$1$2" + _e + "flex-$1$2") + e;
    // align-self
    case 5443:
      return oe + e + _e + "flex-item-" + ie(e, /flex-|-self/, "") + e;
    // align-content
    case 4675:
      return oe + e + _e + "flex-line-pack" + ie(e, /align-content|flex-|-self/, "") + e;
    // flex-shrink
    case 5548:
      return oe + e + _e + ie(e, "shrink", "negative") + e;
    // flex-basis
    case 5292:
      return oe + e + _e + ie(e, "basis", "preferred-size") + e;
    // flex-grow
    case 6060:
      return oe + "box-" + ie(e, "-grow", "") + oe + e + _e + ie(e, "grow", "positive") + e;
    // transition
    case 4554:
      return oe + ie(e, /([^-])(transform)/g, "$1" + oe + "$2") + e;
    // cursor
    case 6187:
      return ie(ie(ie(e, /(zoom-|grab)/, oe + "$1"), /(image-set)/, oe + "$1"), e, "") + e;
    // background, background-image
    case 5495:
    case 3959:
      return ie(e, /(image-set\([^]*)/, oe + "$1$`$1");
    // justify-content
    case 4968:
      return ie(ie(e, /(.+:)(flex-)?(.*)/, oe + "box-pack:$3" + _e + "flex-pack:$3"), /s.+-b[^;]+/, "justify") + oe + e + e;
    // (margin|padding)-inline-(start|end)
    case 4095:
    case 3583:
    case 4068:
    case 2532:
      return ie(e, /(.+)-inline(.+)/, oe + "$1$2") + e;
    // (min|max)?(width|height|inline-size|block-size)
    case 8116:
    case 7059:
    case 5753:
    case 5535:
    case 5445:
    case 5701:
    case 4933:
    case 4677:
    case 5533:
    case 5789:
    case 5021:
    case 4765:
      if (Ie(e) - 1 - t > 6) switch (Ee(e, t + 1)) {
        // (m)ax-content, (m)in-content
        case 109:
          if (Ee(e, t + 4) !== 45) break;
        // (f)ill-available, (f)it-content
        case 102:
          return ie(e, /(.+:)(.+)-([^]+)/, "$1" + oe + "$2-$3$1" + gt + (Ee(e, t + 3) == 108 ? "$3" : "$2-$3")) + e;
        // (s)tretch
        case 115:
          return ~jt(e, "stretch") ? jr(ie(e, "stretch", "fill-available"), t) + e : e;
      }
      break;
    // position: sticky
    case 4949:
      if (Ee(e, t + 1) !== 115) break;
    // display: (flex|inline-flex)
    case 6444:
      switch (Ee(e, Ie(e) - 3 - (~jt(e, "!important") && 10))) {
        // stic(k)y
        case 107:
          return ie(e, ":", ":" + oe) + e;
        // (inline-)?fl(e)x
        case 101:
          return ie(e, /(.+:)([^;!]+)(;|!.+)?/, "$1" + oe + (Ee(e, 14) === 45 ? "inline-" : "") + "box$3$1" + oe + "$2$3$1" + _e + "$2box$3") + e;
      }
      break;
    // writing-mode
    case 5936:
      switch (Ee(e, t + 11)) {
        // vertical-l(r)
        case 114:
          return oe + e + _e + ie(e, /[svh]\w+-[tblr]{2}/, "tb") + e;
        // vertical-r(l)
        case 108:
          return oe + e + _e + ie(e, /[svh]\w+-[tblr]{2}/, "tb-rl") + e;
        // horizontal(-)tb
        case 45:
          return oe + e + _e + ie(e, /[svh]\w+-[tblr]{2}/, "lr") + e;
      }
      return oe + e + _e + e + e;
  }
  return e;
}
var $n = function(t, n, o, s) {
  if (t.length > -1 && !t.return) switch (t.type) {
    case Ft:
      t.return = jr(t.value, t.length);
      break;
    case Pr:
      return He([Qe(t, {
        value: ie(t.value, "@", "@" + oe)
      })], s);
    case Bt:
      if (t.length) return pn(t.props, function(f) {
        switch (dn(f, /(::plac\w+|:read-\w+)/)) {
          // :read-(only|write)
          case ":read-only":
          case ":read-write":
            return He([Qe(t, {
              props: [ie(f, /:(read-\w+)/, ":" + gt + "$1")]
            })], s);
          // :placeholder
          case "::placeholder":
            return He([Qe(t, {
              props: [ie(f, /:(plac\w+)/, ":" + oe + "input-$1")]
            }), Qe(t, {
              props: [ie(f, /:(plac\w+)/, ":" + gt + "$1")]
            }), Qe(t, {
              props: [ie(f, /:(plac\w+)/, _e + "input-$1")]
            })], s);
        }
        return "";
      });
  }
}, kn = [$n], Mn = function(t) {
  var n = t.key;
  if (n === "css") {
    var o = document.querySelectorAll("style[data-emotion]:not([data-s])");
    Array.prototype.forEach.call(o, function(W) {
      var z = W.getAttribute("data-emotion");
      z.indexOf(" ") !== -1 && (document.head.appendChild(W), W.setAttribute("data-s", ""));
    });
  }
  var s = t.stylisPlugins || kn, f = {}, p, w = [];
  p = t.container || document.head, Array.prototype.forEach.call(
    // this means we will ignore elements which don't have a space in them which
    // means that the style elements we're looking at are only Emotion 11 server-rendered style elements
    document.querySelectorAll('style[data-emotion^="' + n + ' "]'),
    function(W) {
      for (var z = W.getAttribute("data-emotion").split(" "), F = 1; F < z.length; F++)
        f[z[F]] = !0;
      w.push(W);
    }
  );
  var _, S = [Pn, An];
  {
    var y, k = [Sn, On(function(W) {
      y.insert(W);
    })], ue = _n(S.concat(s, k)), re = function(z) {
      return He(En(z), ue);
    };
    _ = function(z, F, J, Y) {
      y = J, re(z ? z + "{" + F.styles + "}" : F.styles), Y && (D.inserted[F.name] = !0);
    };
  }
  var D = {
    key: n,
    sheet: new an({
      key: n,
      container: p,
      nonce: t.nonce,
      speedy: t.speedy,
      prepend: t.prepend,
      insertionPoint: t.insertionPoint
    }),
    nonce: t.nonce,
    inserted: f,
    registered: {},
    insert: _
  };
  return D.sheet.hydrate(w), D;
}, pt = { exports: {} }, ae = {};
/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var hr;
function jn() {
  if (hr) return ae;
  hr = 1;
  var e = typeof Symbol == "function" && Symbol.for, t = e ? Symbol.for("react.element") : 60103, n = e ? Symbol.for("react.portal") : 60106, o = e ? Symbol.for("react.fragment") : 60107, s = e ? Symbol.for("react.strict_mode") : 60108, f = e ? Symbol.for("react.profiler") : 60114, p = e ? Symbol.for("react.provider") : 60109, w = e ? Symbol.for("react.context") : 60110, _ = e ? Symbol.for("react.async_mode") : 60111, S = e ? Symbol.for("react.concurrent_mode") : 60111, y = e ? Symbol.for("react.forward_ref") : 60112, k = e ? Symbol.for("react.suspense") : 60113, ue = e ? Symbol.for("react.suspense_list") : 60120, re = e ? Symbol.for("react.memo") : 60115, D = e ? Symbol.for("react.lazy") : 60116, W = e ? Symbol.for("react.block") : 60121, z = e ? Symbol.for("react.fundamental") : 60117, F = e ? Symbol.for("react.responder") : 60118, J = e ? Symbol.for("react.scope") : 60119;
  function Y(h) {
    if (typeof h == "object" && h !== null) {
      var X = h.$$typeof;
      switch (X) {
        case t:
          switch (h = h.type, h) {
            case _:
            case S:
            case o:
            case f:
            case s:
            case k:
              return h;
            default:
              switch (h = h && h.$$typeof, h) {
                case w:
                case y:
                case D:
                case re:
                case p:
                  return h;
                default:
                  return X;
              }
          }
        case n:
          return X;
      }
    }
  }
  function V(h) {
    return Y(h) === S;
  }
  return ae.AsyncMode = _, ae.ConcurrentMode = S, ae.ContextConsumer = w, ae.ContextProvider = p, ae.Element = t, ae.ForwardRef = y, ae.Fragment = o, ae.Lazy = D, ae.Memo = re, ae.Portal = n, ae.Profiler = f, ae.StrictMode = s, ae.Suspense = k, ae.isAsyncMode = function(h) {
    return V(h) || Y(h) === _;
  }, ae.isConcurrentMode = V, ae.isContextConsumer = function(h) {
    return Y(h) === w;
  }, ae.isContextProvider = function(h) {
    return Y(h) === p;
  }, ae.isElement = function(h) {
    return typeof h == "object" && h !== null && h.$$typeof === t;
  }, ae.isForwardRef = function(h) {
    return Y(h) === y;
  }, ae.isFragment = function(h) {
    return Y(h) === o;
  }, ae.isLazy = function(h) {
    return Y(h) === D;
  }, ae.isMemo = function(h) {
    return Y(h) === re;
  }, ae.isPortal = function(h) {
    return Y(h) === n;
  }, ae.isProfiler = function(h) {
    return Y(h) === f;
  }, ae.isStrictMode = function(h) {
    return Y(h) === s;
  }, ae.isSuspense = function(h) {
    return Y(h) === k;
  }, ae.isValidElementType = function(h) {
    return typeof h == "string" || typeof h == "function" || h === o || h === S || h === f || h === s || h === k || h === ue || typeof h == "object" && h !== null && (h.$$typeof === D || h.$$typeof === re || h.$$typeof === p || h.$$typeof === w || h.$$typeof === y || h.$$typeof === z || h.$$typeof === F || h.$$typeof === J || h.$$typeof === W);
  }, ae.typeOf = Y, ae;
}
var se = {};
/** @license React v16.13.1
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var vr;
function Nn() {
  return vr || (vr = 1, process.env.NODE_ENV !== "production" && function() {
    var e = typeof Symbol == "function" && Symbol.for, t = e ? Symbol.for("react.element") : 60103, n = e ? Symbol.for("react.portal") : 60106, o = e ? Symbol.for("react.fragment") : 60107, s = e ? Symbol.for("react.strict_mode") : 60108, f = e ? Symbol.for("react.profiler") : 60114, p = e ? Symbol.for("react.provider") : 60109, w = e ? Symbol.for("react.context") : 60110, _ = e ? Symbol.for("react.async_mode") : 60111, S = e ? Symbol.for("react.concurrent_mode") : 60111, y = e ? Symbol.for("react.forward_ref") : 60112, k = e ? Symbol.for("react.suspense") : 60113, ue = e ? Symbol.for("react.suspense_list") : 60120, re = e ? Symbol.for("react.memo") : 60115, D = e ? Symbol.for("react.lazy") : 60116, W = e ? Symbol.for("react.block") : 60121, z = e ? Symbol.for("react.fundamental") : 60117, F = e ? Symbol.for("react.responder") : 60118, J = e ? Symbol.for("react.scope") : 60119;
    function Y(R) {
      return typeof R == "string" || typeof R == "function" || // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
      R === o || R === S || R === f || R === s || R === k || R === ue || typeof R == "object" && R !== null && (R.$$typeof === D || R.$$typeof === re || R.$$typeof === p || R.$$typeof === w || R.$$typeof === y || R.$$typeof === z || R.$$typeof === F || R.$$typeof === J || R.$$typeof === W);
    }
    function V(R) {
      if (typeof R == "object" && R !== null) {
        var G = R.$$typeof;
        switch (G) {
          case t:
            var m = R.type;
            switch (m) {
              case _:
              case S:
              case o:
              case f:
              case s:
              case k:
                return m;
              default:
                var B = m && m.$$typeof;
                switch (B) {
                  case w:
                  case y:
                  case D:
                  case re:
                  case p:
                    return B;
                  default:
                    return G;
                }
            }
          case n:
            return G;
        }
      }
    }
    var h = _, X = S, H = w, l = p, L = t, ee = y, fe = o, we = D, xe = re, Ce = n, Se = f, be = s, Pe = k, Me = !1;
    function Q(R) {
      return Me || (Me = !0, console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 17+. Update your code to use ReactIs.isConcurrentMode() instead. It has the exact same API.")), c(R) || V(R) === _;
    }
    function c(R) {
      return V(R) === S;
    }
    function v(R) {
      return V(R) === w;
    }
    function N(R) {
      return V(R) === p;
    }
    function M(R) {
      return typeof R == "object" && R !== null && R.$$typeof === t;
    }
    function I(R) {
      return V(R) === y;
    }
    function te(R) {
      return V(R) === o;
    }
    function i(R) {
      return V(R) === D;
    }
    function he(R) {
      return V(R) === re;
    }
    function P(R) {
      return V(R) === n;
    }
    function Oe(R) {
      return V(R) === f;
    }
    function ge(R) {
      return V(R) === s;
    }
    function C(R) {
      return V(R) === k;
    }
    se.AsyncMode = h, se.ConcurrentMode = X, se.ContextConsumer = H, se.ContextProvider = l, se.Element = L, se.ForwardRef = ee, se.Fragment = fe, se.Lazy = we, se.Memo = xe, se.Portal = Ce, se.Profiler = Se, se.StrictMode = be, se.Suspense = Pe, se.isAsyncMode = Q, se.isConcurrentMode = c, se.isContextConsumer = v, se.isContextProvider = N, se.isElement = M, se.isForwardRef = I, se.isFragment = te, se.isLazy = i, se.isMemo = he, se.isPortal = P, se.isProfiler = Oe, se.isStrictMode = ge, se.isSuspense = C, se.isValidElementType = Y, se.typeOf = V;
  }()), se;
}
var mr;
function In() {
  return mr || (mr = 1, process.env.NODE_ENV === "production" ? pt.exports = jn() : pt.exports = Nn()), pt.exports;
}
var Pt, br;
function Ln() {
  if (br) return Pt;
  br = 1;
  var e = In(), t = {
    childContextTypes: !0,
    contextType: !0,
    contextTypes: !0,
    defaultProps: !0,
    displayName: !0,
    getDefaultProps: !0,
    getDerivedStateFromError: !0,
    getDerivedStateFromProps: !0,
    mixins: !0,
    propTypes: !0,
    type: !0
  }, n = {
    name: !0,
    length: !0,
    prototype: !0,
    caller: !0,
    callee: !0,
    arguments: !0,
    arity: !0
  }, o = {
    $$typeof: !0,
    render: !0,
    defaultProps: !0,
    displayName: !0,
    propTypes: !0
  }, s = {
    $$typeof: !0,
    compare: !0,
    defaultProps: !0,
    displayName: !0,
    propTypes: !0,
    type: !0
  }, f = {};
  f[e.ForwardRef] = o, f[e.Memo] = s;
  function p(D) {
    return e.isMemo(D) ? s : f[D.$$typeof] || t;
  }
  var w = Object.defineProperty, _ = Object.getOwnPropertyNames, S = Object.getOwnPropertySymbols, y = Object.getOwnPropertyDescriptor, k = Object.getPrototypeOf, ue = Object.prototype;
  function re(D, W, z) {
    if (typeof W != "string") {
      if (ue) {
        var F = k(W);
        F && F !== ue && re(D, F, z);
      }
      var J = _(W);
      S && (J = J.concat(S(W)));
      for (var Y = p(D), V = p(W), h = 0; h < J.length; ++h) {
        var X = J[h];
        if (!n[X] && !(z && z[X]) && !(V && V[X]) && !(Y && Y[X])) {
          var H = y(W, X);
          try {
            w(D, X, H);
          } catch {
          }
        }
      }
    }
    return D;
  }
  return Pt = re, Pt;
}
Ln();
var Wn = !0;
function Yn(e, t, n) {
  var o = "";
  return n.split(" ").forEach(function(s) {
    e[s] !== void 0 ? t.push(e[s] + ";") : s && (o += s + " ");
  }), o;
}
var Nr = function(t, n, o) {
  var s = t.key + "-" + n.name;
  // we only need to add the styles to the registered cache if the
  // class name could be used further down
  // the tree but if it's a string tag, we know it won't
  // so we don't have to add it to registered cache.
  // this improves memory usage since we can avoid storing the whole style string
  (o === !1 || // we need to always store it if we're in compat mode and
  // in node since emotion-server relies on whether a style is in
  // the registered cache to know whether a style is global or not
  // also, note that this check will be dead code eliminated in the browser
  Wn === !1) && t.registered[s] === void 0 && (t.registered[s] = n.styles);
}, Bn = function(t, n, o) {
  Nr(t, n, o);
  var s = t.key + "-" + n.name;
  if (t.inserted[n.name] === void 0) {
    var f = n;
    do
      t.insert(n === f ? "." + s : "", f, t.sheet, !0), f = f.next;
    while (f !== void 0);
  }
};
function Fn(e) {
  for (var t = 0, n, o = 0, s = e.length; s >= 4; ++o, s -= 4)
    n = e.charCodeAt(o) & 255 | (e.charCodeAt(++o) & 255) << 8 | (e.charCodeAt(++o) & 255) << 16 | (e.charCodeAt(++o) & 255) << 24, n = /* Math.imul(k, m): */
    (n & 65535) * 1540483477 + ((n >>> 16) * 59797 << 16), n ^= /* k >>> r: */
    n >>> 24, t = /* Math.imul(k, m): */
    (n & 65535) * 1540483477 + ((n >>> 16) * 59797 << 16) ^ /* Math.imul(h, m): */
    (t & 65535) * 1540483477 + ((t >>> 16) * 59797 << 16);
  switch (s) {
    case 3:
      t ^= (e.charCodeAt(o + 2) & 255) << 16;
    case 2:
      t ^= (e.charCodeAt(o + 1) & 255) << 8;
    case 1:
      t ^= e.charCodeAt(o) & 255, t = /* Math.imul(h, m): */
      (t & 65535) * 1540483477 + ((t >>> 16) * 59797 << 16);
  }
  return t ^= t >>> 13, t = /* Math.imul(h, m): */
  (t & 65535) * 1540483477 + ((t >>> 16) * 59797 << 16), ((t ^ t >>> 15) >>> 0).toString(36);
}
var Un = {
  animationIterationCount: 1,
  aspectRatio: 1,
  borderImageOutset: 1,
  borderImageSlice: 1,
  borderImageWidth: 1,
  boxFlex: 1,
  boxFlexGroup: 1,
  boxOrdinalGroup: 1,
  columnCount: 1,
  columns: 1,
  flex: 1,
  flexGrow: 1,
  flexPositive: 1,
  flexShrink: 1,
  flexNegative: 1,
  flexOrder: 1,
  gridRow: 1,
  gridRowEnd: 1,
  gridRowSpan: 1,
  gridRowStart: 1,
  gridColumn: 1,
  gridColumnEnd: 1,
  gridColumnSpan: 1,
  gridColumnStart: 1,
  msGridRow: 1,
  msGridRowSpan: 1,
  msGridColumn: 1,
  msGridColumnSpan: 1,
  fontWeight: 1,
  lineHeight: 1,
  opacity: 1,
  order: 1,
  orphans: 1,
  scale: 1,
  tabSize: 1,
  widows: 1,
  zIndex: 1,
  zoom: 1,
  WebkitLineClamp: 1,
  // SVG-related properties
  fillOpacity: 1,
  floodOpacity: 1,
  stopOpacity: 1,
  strokeDasharray: 1,
  strokeDashoffset: 1,
  strokeMiterlimit: 1,
  strokeOpacity: 1,
  strokeWidth: 1
}, Gn = !1, Dn = /[A-Z]|^ms/g, zn = /_EMO_([^_]+?)_([^]*?)_EMO_/g, Ir = function(t) {
  return t.charCodeAt(1) === 45;
}, gr = function(t) {
  return t != null && typeof t != "boolean";
}, At = /* @__PURE__ */ xn(function(e) {
  return Ir(e) ? e : e.replace(Dn, "-$&").toLowerCase();
}), yr = function(t, n) {
  switch (t) {
    case "animation":
    case "animationName":
      if (typeof n == "string")
        return n.replace(zn, function(o, s, f) {
          return Le = {
            name: s,
            styles: f,
            next: Le
          }, s;
        });
  }
  return Un[t] !== 1 && !Ir(t) && typeof n == "number" && n !== 0 ? n + "px" : n;
}, Hn = "Component selectors can only be used in conjunction with @emotion/babel-plugin, the swc Emotion plugin, or another Emotion-aware compiler transform.";
function ot(e, t, n) {
  if (n == null)
    return "";
  var o = n;
  if (o.__emotion_styles !== void 0)
    return o;
  switch (typeof n) {
    case "boolean":
      return "";
    case "object": {
      var s = n;
      if (s.anim === 1)
        return Le = {
          name: s.name,
          styles: s.styles,
          next: Le
        }, s.name;
      var f = n;
      if (f.styles !== void 0) {
        var p = f.next;
        if (p !== void 0)
          for (; p !== void 0; )
            Le = {
              name: p.name,
              styles: p.styles,
              next: Le
            }, p = p.next;
        var w = f.styles + ";";
        return w;
      }
      return qn(e, t, n);
    }
    case "function": {
      if (e !== void 0) {
        var _ = Le, S = n(e);
        return Le = _, ot(e, t, S);
      }
      break;
    }
  }
  var y = n;
  return y;
}
function qn(e, t, n) {
  var o = "";
  if (Array.isArray(n))
    for (var s = 0; s < n.length; s++)
      o += ot(e, t, n[s]) + ";";
  else
    for (var f in n) {
      var p = n[f];
      if (typeof p != "object") {
        var w = p;
        gr(w) && (o += At(f) + ":" + yr(f, w) + ";");
      } else {
        if (f === "NO_COMPONENT_SELECTOR" && Gn)
          throw new Error(Hn);
        if (Array.isArray(p) && typeof p[0] == "string" && t == null)
          for (var _ = 0; _ < p.length; _++)
            gr(p[_]) && (o += At(f) + ":" + yr(f, p[_]) + ";");
        else {
          var S = ot(e, t, p);
          switch (f) {
            case "animation":
            case "animationName": {
              o += At(f) + ":" + S + ";";
              break;
            }
            default:
              o += f + "{" + S + "}";
          }
        }
      }
    }
  return o;
}
var Er = /label:\s*([^\s;{]+)\s*(;|$)/g, Le;
function Kn(e, t, n) {
  if (e.length === 1 && typeof e[0] == "object" && e[0] !== null && e[0].styles !== void 0)
    return e[0];
  var o = !0, s = "";
  Le = void 0;
  var f = e[0];
  if (f == null || f.raw === void 0)
    o = !1, s += ot(n, t, f);
  else {
    var p = f;
    s += p[0];
  }
  for (var w = 1; w < e.length; w++)
    if (s += ot(n, t, e[w]), o) {
      var _ = f;
      s += _[w];
    }
  Er.lastIndex = 0;
  for (var S = "", y; (y = Er.exec(s)) !== null; )
    S += "-" + y[1];
  var k = Fn(s) + S;
  return {
    name: k,
    styles: s,
    next: Le
  };
}
var Vn = function(t) {
  return t();
}, Xn = fr.useInsertionEffect ? fr.useInsertionEffect : !1, Jn = Xn || Vn, Qn = !1, Lr = /* @__PURE__ */ me.createContext(
  // we're doing this to avoid preconstruct's dead code elimination in this one case
  // because this module is primarily intended for the browser and node
  // but it's also required in react native and similar environments sometimes
  // and we could have a special build just for that
  // but this is much easier and the native packages
  // might use a different theme context in the future anyway
  typeof HTMLElement < "u" ? /* @__PURE__ */ Mn({
    key: "css"
  }) : null
);
Lr.Provider;
var Zn = function(t) {
  return /* @__PURE__ */ me.forwardRef(function(n, o) {
    var s = me.useContext(Lr);
    return t(n, s, o);
  });
}, eo = /* @__PURE__ */ me.createContext({}), _t = {}.hasOwnProperty, It = "__EMOTION_TYPE_PLEASE_DO_NOT_USE__", Wr = function(t, n) {
  var o = {};
  for (var s in n)
    _t.call(n, s) && (o[s] = n[s]);
  return o[It] = t, o;
}, to = function(t) {
  var n = t.cache, o = t.serialized, s = t.isStringTag;
  return Nr(n, o, s), Jn(function() {
    return Bn(n, o, s);
  }), null;
}, ro = /* @__PURE__ */ Zn(function(e, t, n) {
  var o = e.css;
  typeof o == "string" && t.registered[o] !== void 0 && (o = t.registered[o]);
  var s = e[It], f = [o], p = "";
  typeof e.className == "string" ? p = Yn(t.registered, f, e.className) : e.className != null && (p = e.className + " ");
  var w = Kn(f, void 0, me.useContext(eo));
  p += t.key + "-" + w.name;
  var _ = {};
  for (var S in e)
    _t.call(e, S) && S !== "css" && S !== It && !Qn && (_[S] = e[S]);
  return _.className = p, n && (_.ref = n), /* @__PURE__ */ me.createElement(me.Fragment, null, /* @__PURE__ */ me.createElement(to, {
    cache: t,
    serialized: w,
    isStringTag: typeof s == "string"
  }), /* @__PURE__ */ me.createElement(s, _));
}), Yr = ro, no = tt.Fragment, bt = function(t, n, o) {
  return _t.call(n, "css") ? tt.jsx(Yr, Wr(t, n), o) : tt.jsx(t, n, o);
}, jo = function(t, n, o) {
  return _t.call(n, "css") ? tt.jsxs(Yr, Wr(t, n), o) : tt.jsxs(t, n, o);
};
const wr = (e) => {
  let t;
  const n = /* @__PURE__ */ new Set(), o = (S, y) => {
    const k = typeof S == "function" ? S(t) : S;
    if (!Object.is(k, t)) {
      const ue = t;
      t = y ?? (typeof k != "object" || k === null) ? k : Object.assign({}, t, k), n.forEach((re) => re(t, ue));
    }
  }, s = () => t, w = { setState: o, getState: s, getInitialState: () => _, subscribe: (S) => (n.add(S), () => n.delete(S)) }, _ = t = e(o, s, w);
  return w;
}, oo = (e) => e ? wr(e) : wr, io = (e) => e;
function ao(e, t = io) {
  const n = Mt.useSyncExternalStore(
    e.subscribe,
    () => t(e.getState()),
    () => t(e.getInitialState())
  );
  return Mt.useDebugValue(n), n;
}
const so = (e) => {
  const t = oo(e), n = (o) => ao(t, o);
  return Object.assign(n, t), n;
}, co = (e) => so, $t = co()((e) => ({
  // わざとカーリー化
  txt: "",
  addTxt: (t) => e((n) => ({ txt: n.txt + t })),
  clearTxt: () => e(() => ({ txt: "" })),
  aLay: [],
  replace: (t) => e((n) => ({ aLay: JSON.parse(t) })),
  addLayer: (t) => e((n) => ({ aLay: [...n.aLay, t] })),
  chgPic: ({ nm: t, fn: n }) => e((o) => {
    const s = [...o.aLay], f = s.find((p) => p.nm === t);
    if (!f) throw `存在しないレイヤ ${t} です`;
    if (f.cls !== "GRP") throw `${t} は画像レイヤではありません`;
    return f.fn = n, { aLay: s };
  }),
  chgStr: ({ nm: t, str: n }) => e((o) => {
    const s = [...o.aLay], f = s.find((p) => p.nm === t);
    if (!f) throw `存在しないレイヤ ${t} です`;
    if (f.cls !== "TXT") throw `${t} は文字レイヤではありません`;
    return f.str = n, { aLay: s };
  })
}));
var uo = function() {
};
function fo(e) {
  for (var t = [], n = 1; n < arguments.length; n++)
    t[n - 1] = arguments[n];
  e && e.addEventListener && e.addEventListener.apply(e, t);
}
function lo(e) {
  for (var t = [], n = 1; n < arguments.length; n++)
    t[n - 1] = arguments[n];
  e && e.removeEventListener && e.removeEventListener.apply(e, t);
}
var po = typeof window < "u", ho = function(e) {
  me.useEffect(e, []);
}, vo = po ? window : null, Sr = function(e) {
  return !!e.addEventListener;
}, _r = function(e) {
  return !!e.on;
}, mo = function(e, t, n, o) {
  n === void 0 && (n = vo), me.useEffect(function() {
    if (t && n)
      return Sr(n) ? fo(n, e, t, o) : _r(n) && n.on(e, t, o), function() {
        Sr(n) ? lo(n, e, t, o) : _r(n) && n.off(e, t, o);
      };
  }, [e, t, n, JSON.stringify(o)]);
}, bo = function(e) {
  return typeof e == "function" ? e : typeof e == "string" ? function(t) {
    return t.key === e;
  } : e ? function() {
    return !0;
  } : function() {
    return !1;
  };
}, Or = function(e, t, n, o) {
  t === void 0 && (t = uo), n === void 0 && (n = {}), o === void 0 && (o = [e]);
  var s = n.event, f = s === void 0 ? "keydown" : s, p = n.target, w = n.options, _ = me.useMemo(function() {
    var S = bo(e), y = function(k) {
      if (S(k))
        return t(k);
    };
    return y;
  }, o);
  mo(f, _, p, w);
}, go = {
  restoreOnUnmount: !1
};
function yo(e, t) {
  t === void 0 && (t = go);
  var n = me.useRef(document.title);
  document.title !== e && (document.title = e), me.useEffect(function() {
    if (t && t.restoreOnUnmount)
      return function() {
        document.title = n.current;
      };
  }, []);
}
const Eo = typeof document < "u" ? yo : function(e) {
};
var Br = /* @__PURE__ */ ((e) => (e.Renderer = "renderer", e.Application = "application", e.RendererSystem = "renderer-webgl-system", e.RendererPlugin = "renderer-webgl-plugin", e.CanvasRendererSystem = "renderer-canvas-system", e.CanvasRendererPlugin = "renderer-canvas-plugin", e.Asset = "asset", e.LoadParser = "load-parser", e.ResolveParser = "resolve-parser", e.CacheParser = "cache-parser", e.DetectionParser = "detection-parser", e))(Br || {});
const Lt = (e) => {
  if (typeof e == "function" || typeof e == "object" && e.extension) {
    if (!e.extension)
      throw new Error("Extension class must have an extension object");
    e = { ...typeof e.extension != "object" ? { type: e.extension } : e.extension, ref: e };
  }
  if (typeof e == "object")
    e = { ...e };
  else
    throw new Error("Invalid extension type");
  return typeof e.type == "string" && (e.type = [e.type]), e;
}, xr = (e, t) => Lt(e).priority ?? t, wo = {
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
  remove(...e) {
    return e.map(Lt).forEach((t) => {
      t.type.forEach((n) => this._removeHandlers[n]?.(t));
    }), this;
  },
  /**
   * Register new extensions with PixiJS.
   * @param extensions - The spread of extensions to add to PixiJS.
   * @returns {PIXI.extensions} For chaining.
   */
  add(...e) {
    return e.map(Lt).forEach((t) => {
      t.type.forEach((n) => {
        const o = this._addHandlers, s = this._queue;
        o[n] ? o[n]?.(t) : (s[n] = s[n] || [], s[n]?.push(t));
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
  handle(e, t, n) {
    const o = this._addHandlers, s = this._removeHandlers;
    if (o[e] || s[e])
      throw new Error(`Extension type ${e} already has a handler`);
    o[e] = t, s[e] = n;
    const f = this._queue;
    return f[e] && (f[e]?.forEach((p) => t(p)), delete f[e]), this;
  },
  /**
   * Handle a type, but using a map by `name` property.
   * @param type - Type of extension to handle.
   * @param map - The object map of named extensions.
   * @returns {PIXI.extensions} For chaining.
   */
  handleByMap(e, t) {
    return this.handle(
      e,
      (n) => {
        n.name && (t[n.name] = n.ref);
      },
      (n) => {
        n.name && delete t[n.name];
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
  handleByList(e, t, n = -1) {
    return this.handle(
      e,
      (o) => {
        t.includes(o.ref) || (t.push(o.ref), t.sort((s, f) => xr(f, n) - xr(s, n)));
      },
      (o) => {
        const s = t.indexOf(o.ref);
        s !== -1 && t.splice(s, 1);
      }
    );
  }
};
async function Fr({ heStage: e, sys: t }) {
  const { createRoot: n } = await import("./client.js").then((o) => o.c);
  n(e).render(/* @__PURE__ */ bt(So, { heStage: e, sys: t })), await Promise.all([
    import("./index.js"),
    import("./ScriptMng.js")
  ]).then(async ([{ Assets: o }, { ScriptMng: s }]) => {
    await o.init({ basePath: location.origin }), wo.add({
      extension: {
        type: Br.LoadParser,
        name: "sn-loader"
        //priority: LoaderParserPriority.High,
      },
      test: (p) => p.endsWith(".sn"),
      load: (p) => new Promise(async (w, _) => {
        const S = await t.fetch(p);
        if (!S.ok) {
          _("sn-loader fetch err:" + S.statusText);
          return;
        }
        try {
          w(await t.dec("sn", await S.text()));
        } catch (y) {
          _(`sn-loader err url:${p} ${y}`);
        }
      })
    }), await new s(t, o).load("main");
  });
}
function So({ heStage: e, sys: t }) {
  Eo(t.cfg.oCfg.book.title);
  const n = $t((y) => y.addLayer), o = $t((y) => y.chgPic), s = $t((y) => y.chgStr);
  function f() {
    for (console.log("fn:Main.tsx == next =="); ; ) {
      const { done: y, value: k } = Oo.next();
      if (y) break;
      t.caretaker.key = "main:" + ++_o, "cls" in k ? n(k) : "fn" in k ? o(k) : s(k);
      break;
    }
  }
  ho(() => f());
  function p() {
    t.caretaker.afterKey() || f();
  }
  Or("ArrowDown", (y) => {
    y.stopPropagation(), y.preventDefault(), p();
  });
  function w() {
    t.caretaker.beforeKey();
  }
  Or("ArrowUp", (y) => {
    y.stopPropagation(), y.preventDefault(), w();
  });
  function _() {
    if (Wt) {
      Wt = !1;
      return;
    }
    Ur || p();
  }
  const S = me.lazy(() => import("./Stage.js"));
  return /* @__PURE__ */ bt(me.Suspense, { fallback: /* @__PURE__ */ bt(no, { children: "Loading" }), children: /* @__PURE__ */ bt(
    S,
    {
      arg: { heStage: e, sys: t },
      onClick: _,
      after: p,
      before: w
    }
  ) });
}
let _o = 0;
const Oo = xo();
function* xo() {
  yield { cls: "GRP", nm: "base", fn: "yun_1184" }, yield { cls: "TXT", nm: "mes", str: "あいうえお" }, yield { nm: "mes", str: "かきくけこ" }, yield { cls: "GRP", nm: "fg0", fn: "F_1024a" }, yield { nm: "base", fn: "yun_1317" };
}
let Ur = !1;
const Co = (e) => Ur = e;
let Wt = !1;
function To() {
  Wt = !0;
}
const Ro = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  onLong: To,
  opening: Fr,
  setDesignMode: Co
}, Symbol.toStringTag, { value: "Module" }));
class No {
  // 適当な名を付けて
  constructor(t = "") {
    this.stt = t;
  }
  // this.stt から
}
class Po {
  #e = "";
  set key(t) {
    this.#e = t, this.#r = this.#t.push(t) - 1, this.#n[t] = {};
  }
  #n = {};
  update(t) {
    if (this.#r < this.#t.length - 1) return;
    const n = t();
    this.#n[this.#e][n.nm] = n, console.log(`fn:Memento.ts update -- key(${this.#e}) MeMe:%o`, n);
  }
  undo(t) {
    console.log(`fn:Memento.ts = undo key=(${t})`);
    const n = this.#n[t];
    if (!n) throw `undo Err key:${t}`;
    for (const o of Object.values(n)) o.restore();
  }
  #t = [];
  #r = 0;
  // 前のキーへ移動
  beforeKey() {
    return console.log("fn:Memento.ts -- beforeKey --"), this.#r <= 0 ? !1 : (this.undo(this.#t[--this.#r]), !0);
  }
  // 後のキーへ移動
  afterKey() {
    return console.log("fn:Memento.ts -- afterKey --"), this.#t.length - 1 <= this.#r ? !1 : (this.undo(this.#t[++this.#r]), !0);
  }
  isLast() {
    return this.#t.length - 1 === this.#r;
  }
}
window.__REACT_DEVTOOLS_GLOBAL_HOOK__ = { isDisabled: !0 };
class Ao {
  constructor(t = {}, n) {
    this.hPlg = t, this.arg = n;
  }
  async loaded(...[t]) {
    return Promise.resolve();
  }
  fetch = (t, n) => fetch(t, n);
  #e = new Po();
  get caretaker() {
    return this.#e;
  }
  cfg;
  async loadPath(t, n) {
    this.cfg = n;
  }
  async run() {
  }
  async init() {
    this.cfg = await yt.generate(this), document.head.insertAdjacentHTML(
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
    const t = "skynovel", n = document.getElementById(t);
    if (n) {
      const s = n.cloneNode(!0);
      s.id = t;
    } else document.body.insertAdjacentHTML("afterbegin", `<div id="${t}"></div>`);
    const { opening: o } = await Promise.resolve().then(() => Ro);
    await o({ heStage: document.getElementById(t), sys: this });
  }
  $path_downloads = "";
  get path_downloads() {
    return this.$path_downloads;
  }
  $path_userdata = "";
  get path_userdata() {
    return this.$path_userdata;
  }
  dec = (t, n) => Promise.resolve(n);
  hash = (t) => "";
}
const kt = "skynovel";
class Io extends Ao {
  constructor(...[t = {}, n = { cur: "prj/", crypto: !1, dip: "" }]) {
    super(t, n), queueMicrotask(async () => this.loaded(t, n));
  }
  async loaded(...[t, n]) {
    await super.loaded(t, n), await this.run();
  }
  run = async () => {
    let t = document.getElementById(kt);
    if (t) {
      const n = t.cloneNode(!0);
      n.id = kt;
    } else
      t = document.createElement("div"), t.id = kt, document.body.appendChild(t);
    await yt.generate(this), Fr({ heStage: t, sys: this });
  };
  async loadPath(t, n) {
    await super.loadPath(t, n);
    const o = this.arg.cur + "path.json", s = await this.fetch(o);
    if (!s.ok) throw Error(s.statusText);
    const f = await s.text(), p = JSON.parse(await this.dec(o, f));
    for (const [w, _] of Object.entries(p)) {
      const S = t[w] = _;
      for (const [y, k] of Object.entries(S))
        y !== ":cnt" && (S[y] = this.arg.cur + k);
    }
  }
}
export {
  No as B,
  Rt as C,
  Br as E,
  no as F,
  Cr as S,
  $o as a,
  Mo as b,
  rr as c,
  me as d,
  wo as e,
  lo as f,
  zr as g,
  bt as h,
  po as i,
  jo as j,
  _t as k,
  Yr as l,
  Wr as m,
  uo as n,
  fo as o,
  $t as p,
  ko as q,
  Tr as r,
  Kn as s,
  To as t,
  ho as u,
  Co as v,
  Io as w
};
//# sourceMappingURL=web2.js.map
