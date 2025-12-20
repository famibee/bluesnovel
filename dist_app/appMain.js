import electron, { BrowserWindow, app, dialog, ipcMain, screen, shell } from "electron";
import process$1 from "node:process";
import path from "node:path";
import { isDeepStrictEqual, promisify } from "node:util";
import fs from "node:fs";
import crypto from "node:crypto";
import assert from "node:assert";
import os from "node:os";
import "node:events";
import "node:stream";
var __create = Object.create, __defProp = Object.defineProperty, __getOwnPropDesc = Object.getOwnPropertyDescriptor, __getOwnPropNames = Object.getOwnPropertyNames, __getProtoOf = Object.getPrototypeOf, __hasOwnProp = Object.prototype.hasOwnProperty, __esmMin = (t, a) => () => (t && (a = t(t = 0)), a), __commonJSMin = (t, a) => () => (a || t((a = { exports: {} }).exports, a), a.exports), __export = (t, a) => {
	let o = {};
	for (var s in t) __defProp(o, s, {
		get: t[s],
		enumerable: !0
	});
	return a && __defProp(o, Symbol.toStringTag, { value: "Module" }), o;
}, __copyProps = (t, a, o, s) => {
	if (a && typeof a == "object" || typeof a == "function") for (var c = __getOwnPropNames(a), l = 0, u = c.length, d; l < u; l++) d = c[l], !__hasOwnProp.call(t, d) && d !== o && __defProp(t, d, {
		get: ((t) => a[t]).bind(null, d),
		enumerable: !(s = __getOwnPropDesc(a, d)) || s.enumerable
	});
	return t;
}, __toESM = (t, a, o) => (o = t == null ? {} : __create(__getProtoOf(t)), __copyProps(a || !t || !t.__esModule ? __defProp(o, "default", {
	value: t,
	enumerable: !0
}) : o, t)), __toCommonJS = (t) => __hasOwnProp.call(t, "module.exports") ? t["module.exports"] : __copyProps(__defProp({}, "__esModule", { value: !0 }), t), __require = /* @__PURE__ */ ((t) => typeof require < "u" ? require : typeof Proxy < "u" ? new Proxy(t, { get: (t, a) => (typeof require < "u" ? require : t)[a] }) : t)(function(t) {
	if (typeof require < "u") return require.apply(this, arguments);
	throw Error("Calling `require` for \"" + t + "\" in an environment that doesn't expose the `require` function.");
}), import_platform = (/* @__PURE__ */ __commonJSMin(((t, a) => {
	(function() {
		var o = {
			function: !0,
			object: !0
		}, s = o[typeof window] && window || this, c = o[typeof t] && t, l = o[typeof a] && a && !a.nodeType && a, u = c && l && typeof global == "object" && global;
		u && (u.global === u || u.window === u || u.self === u) && (s = u);
		var d = 2 ** 53 - 1, f = /\bOpera/, p = Object.prototype, m = p.hasOwnProperty, h = p.toString;
		function g(t) {
			return t = String(t), t.charAt(0).toUpperCase() + t.slice(1);
		}
		function _(t, a, o) {
			var s = {
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
			return a && o && /^Win/i.test(t) && !/^Windows Phone /i.test(t) && (s = s[/[\d.]+$/.exec(t)]) && (t = "Windows " + s), t = String(t), a && o && (t = t.replace(RegExp(a, "i"), o)), t = y(t.replace(/ ce$/i, " CE").replace(/\bhpw/i, "web").replace(/\bMacintosh\b/, "Mac OS").replace(/_PowerPC\b/i, " OS").replace(/\b(OS X) [^ \d]+/i, "$1").replace(/\bMac (OS X)\b/, "$1").replace(/\/(\d)/, " $1").replace(/_/g, ".").replace(/(?: BePC|[ .]*fc[ \d.]+)$/i, "").replace(/\bx86\.64\b/gi, "x86_64").replace(/\b(Windows Phone) OS\b/, "$1").replace(/\b(Chrome OS \w+) [\d.]+\b/, "$1").split(" on ")[0]), t;
		}
		function v(t, a) {
			var o = -1, s = t ? t.length : 0;
			if (typeof s == "number" && s > -1 && s <= d) for (; ++o < s;) a(t[o], o, t);
			else b(t, a);
		}
		function y(t) {
			return t = T(t), /^(?:webOS|i(?:OS|P))/.test(t) ? t : g(t);
		}
		function b(t, a) {
			for (var o in t) m.call(t, o) && a(t[o], o, t);
		}
		function x(t) {
			return t == null ? g(t) : h.call(t).slice(8, -1);
		}
		function S(t, a) {
			var o = t == null ? "number" : typeof t[a];
			return !/^(?:boolean|number|string|undefined)$/.test(o) && (o == "object" ? !!t[a] : !0);
		}
		function C(t) {
			return String(t).replace(/([ -])(?!$)/g, "$1?");
		}
		function w(t, a) {
			var o = null;
			return v(t, function(s, c) {
				o = a(o, s, c, t);
			}), o;
		}
		function T(t) {
			return String(t).replace(/^ +| +$/g, "");
		}
		function E(t) {
			var a = s, o = t && typeof t == "object" && x(t) != "String";
			o && (a = t, t = null);
			var c = a.navigator || {}, l = c.userAgent || "";
			t ||= l;
			var u = o ? !!c.likeChrome : /\bChrome\b/.test(t) && !/internal|\n/i.test(h.toString()), d = "Object", p = o ? d : "ScriptBridgingProxyObject", m = o ? d : "Environment", g = o && a.java ? "JavaPackage" : x(a.java), v = o ? d : "RuntimeObject", D = /\bJava/.test(g) && a.java, O = D && x(a.environment) == m, k = D ? "a" : "α", A = D ? "b" : "β", j = a.document || {}, M = a.operamini || a.opera, N = f.test(N = o && M ? M["[[Class]]"] : x(M)) ? N : M = null, P, F = t, I = [], L = null, R = t == l, z = R && M && typeof M.version == "function" && M.version(), B, V = K([
				{
					label: "EdgeHTML",
					pattern: "Edge"
				},
				"Trident",
				{
					label: "WebKit",
					pattern: "AppleWebKit"
				},
				"iCab",
				"Presto",
				"NetFront",
				"Tasman",
				"KHTML",
				"Gecko"
			]), H = J([
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
				{
					label: "Microsoft Edge",
					pattern: "(?:Edge|Edg|EdgA|EdgiOS)"
				},
				"Midori",
				"Nook Browser",
				"PaleMoon",
				"PhantomJS",
				"Raven",
				"Rekonq",
				"RockMelt",
				{
					label: "Samsung Internet",
					pattern: "SamsungBrowser"
				},
				"SeaMonkey",
				{
					label: "Silk",
					pattern: "(?:Cloud9|Silk-Accelerated)"
				},
				"Sleipnir",
				"SlimBrowser",
				{
					label: "SRWare Iron",
					pattern: "Iron"
				},
				"Sunrise",
				"Swiftfox",
				"Vivaldi",
				"Waterfox",
				"WebPositive",
				{
					label: "Yandex Browser",
					pattern: "YaBrowser"
				},
				{
					label: "UC Browser",
					pattern: "UCBrowser"
				},
				"Opera Mini",
				{
					label: "Opera Mini",
					pattern: "OPiOS"
				},
				"Opera",
				{
					label: "Opera",
					pattern: "OPR"
				},
				"Chromium",
				"Chrome",
				{
					label: "Chrome",
					pattern: "(?:HeadlessChrome)"
				},
				{
					label: "Chrome Mobile",
					pattern: "(?:CriOS|CrMo)"
				},
				{
					label: "Firefox",
					pattern: "(?:Firefox|Minefield)"
				},
				{
					label: "Firefox for iOS",
					pattern: "FxiOS"
				},
				{
					label: "IE",
					pattern: "IEMobile"
				},
				{
					label: "IE",
					pattern: "MSIE"
				},
				"Safari"
			]), U = X([
				{
					label: "BlackBerry",
					pattern: "BB10"
				},
				"BlackBerry",
				{
					label: "Galaxy S",
					pattern: "GT-I9000"
				},
				{
					label: "Galaxy S2",
					pattern: "GT-I9100"
				},
				{
					label: "Galaxy S3",
					pattern: "GT-I9300"
				},
				{
					label: "Galaxy S4",
					pattern: "GT-I9500"
				},
				{
					label: "Galaxy S5",
					pattern: "SM-G900"
				},
				{
					label: "Galaxy S6",
					pattern: "SM-G920"
				},
				{
					label: "Galaxy S6 Edge",
					pattern: "SM-G925"
				},
				{
					label: "Galaxy S7",
					pattern: "SM-G930"
				},
				{
					label: "Galaxy S7 Edge",
					pattern: "SM-G935"
				},
				"Google TV",
				"Lumia",
				"iPad",
				"iPod",
				"iPhone",
				"Kindle",
				{
					label: "Kindle Fire",
					pattern: "(?:Cloud9|Silk-Accelerated)"
				},
				"Nexus",
				"Nook",
				"PlayBook",
				"PlayStation Vita",
				"PlayStation",
				"TouchPad",
				"Transformer",
				{
					label: "Wii U",
					pattern: "WiiU"
				},
				"Wii",
				"Xbox One",
				{
					label: "Xbox 360",
					pattern: "Xbox"
				},
				"Xoom"
			]), W = q({
				Apple: {
					iPad: 1,
					iPhone: 1,
					iPod: 1
				},
				Alcatel: {},
				Archos: {},
				Amazon: {
					Kindle: 1,
					"Kindle Fire": 1
				},
				Asus: { Transformer: 1 },
				"Barnes & Noble": { Nook: 1 },
				BlackBerry: { PlayBook: 1 },
				Google: {
					"Google TV": 1,
					Nexus: 1
				},
				HP: { TouchPad: 1 },
				HTC: {},
				Huawei: {},
				Lenovo: {},
				LG: {},
				Microsoft: {
					Xbox: 1,
					"Xbox One": 1
				},
				Motorola: { Xoom: 1 },
				Nintendo: {
					"Wii U": 1,
					Wii: 1
				},
				Nokia: { Lumia: 1 },
				Oppo: {},
				Samsung: {
					"Galaxy S": 1,
					"Galaxy S2": 1,
					"Galaxy S3": 1,
					"Galaxy S4": 1
				},
				Sony: {
					PlayStation: 1,
					"PlayStation Vita": 1
				},
				Xiaomi: {
					Mi: 1,
					Redmi: 1
				}
			}), G = Y([
				"Windows Phone",
				"KaiOS",
				"Android",
				"CentOS",
				{
					label: "Chrome OS",
					pattern: "CrOS"
				},
				"Debian",
				{
					label: "DragonFly BSD",
					pattern: "DragonFly"
				},
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
			function K(a) {
				return w(a, function(a, o) {
					return a || RegExp("\\b" + (o.pattern || C(o)) + "\\b", "i").exec(t) && (o.label || o);
				});
			}
			function q(a) {
				return w(a, function(a, o, s) {
					return a || (o[U] || o[/^[a-z]+(?: +[a-z]+\b)*/i.exec(U)] || RegExp("\\b" + C(s) + "(?:\\b|\\w*\\d)", "i").exec(t)) && s;
				});
			}
			function J(a) {
				return w(a, function(a, o) {
					return a || RegExp("\\b" + (o.pattern || C(o)) + "\\b", "i").exec(t) && (o.label || o);
				});
			}
			function Y(a) {
				return w(a, function(a, o) {
					var s = o.pattern || C(o);
					return !a && (a = RegExp("\\b" + s + "(?:/[\\d.]+|[ \\w.]*)", "i").exec(t)) && (a = _(a, s, o.label || o)), a;
				});
			}
			function X(a) {
				return w(a, function(a, o) {
					var s = o.pattern || C(o);
					return !a && (a = RegExp("\\b" + s + " *\\d+[.\\w_]*", "i").exec(t) || RegExp("\\b" + s + " *\\w+-[\\w]*", "i").exec(t) || RegExp("\\b" + s + "(?:; *(?:[a-z]+[_-])?[a-z]+\\d+|[^ ();-]*)", "i").exec(t)) && ((a = String(o.label && !RegExp(s, "i").test(o.label) ? o.label : a).split("/"))[1] && !/[\d.]+/.test(a[0]) && (a[0] += " " + a[1]), o = o.label || o, a = y(a[0].replace(RegExp(s, "i"), o).replace(RegExp("; *(?:" + o + "[_-])?", "i"), " ").replace(RegExp("(" + o + ")[-_.]?(\\w)", "i"), "$1 $2"))), a;
				});
			}
			function Z(a) {
				return w(a, function(a, o) {
					return a || (RegExp(o + "(?:-[\\d.]+/|(?: for [\\w-]+)?[ /-])([\\d.]+[^ ();/_-]*)", "i").exec(t) || 0)[1] || null;
				});
			}
			function Q() {
				return this.description || "";
			}
			if (V &&= [V], /\bAndroid\b/.test(G) && !U && (P = /\bAndroid[^;]*;(.*?)(?:Build|\) AppleWebKit)\b/i.exec(t)) && (U = T(P[1]).replace(/^[a-z]{2}-[a-z]{2};\s*/i, "") || null), W && !U ? U = X([W]) : W && U && (U = U.replace(RegExp("^(" + C(W) + ")[-_.\\s]", "i"), W + " ").replace(RegExp("^(" + C(W) + ")[-_.]?(\\w)", "i"), W + " $2")), (P = /\bGoogle TV\b/.exec(U)) && (U = P[0]), /\bSimulator\b/i.test(t) && (U = (U ? U + " " : "") + "Simulator"), H == "Opera Mini" && /\bOPiOS\b/.test(t) && I.push("running in Turbo/Uncompressed mode"), H == "IE" && /\blike iPhone OS\b/.test(t) ? (P = E(t.replace(/like iPhone OS/, "")), W = P.manufacturer, U = P.product) : /^iP/.test(U) ? (H ||= "Safari", G = "iOS" + ((P = / OS ([\d_]+)/i.exec(t)) ? " " + P[1].replace(/_/g, ".") : "")) : H == "Konqueror" && /^Linux\b/i.test(G) ? G = "Kubuntu" : W && W != "Google" && (/Chrome/.test(H) && !/\bMobile Safari\b/i.test(t) || /\bVita\b/.test(U)) || /\bAndroid\b/.test(G) && /^Chrome/.test(H) && /\bVersion\//i.test(t) ? (H = "Android Browser", G = /\bAndroid\b/.test(G) ? G : "Android") : H == "Silk" ? (/\bMobi/i.test(t) || (G = "Android", I.unshift("desktop mode")), /Accelerated *= *true/i.test(t) && I.unshift("accelerated")) : H == "UC Browser" && /\bUCWEB\b/.test(t) ? I.push("speed mode") : H == "PaleMoon" && (P = /\bFirefox\/([\d.]+)\b/.exec(t)) ? I.push("identifying as Firefox " + P[1]) : H == "Firefox" && (P = /\b(Mobile|Tablet|TV)\b/i.exec(t)) ? (G ||= "Firefox OS", U ||= P[1]) : !H || (P = !/\bMinefield\b/i.test(t) && /\b(?:Firefox|Safari)\b/.exec(H)) ? (H && !U && /[\/,]|^[^(]+?\)/.test(t.slice(t.indexOf(P + "/") + 8)) && (H = null), (P = U || W || G) && (U || W || /\b(?:Android|Symbian OS|Tablet OS|webOS)\b/.test(G)) && (H = /[a-z]+(?: Hat)?/i.exec(/\bAndroid\b/.test(G) ? G : P) + " Browser")) : H == "Electron" && (P = (/\bChrome\/([\d.]+)\b/.exec(t) || 0)[1]) && I.push("Chromium " + P), z ||= Z([
				"(?:Cloud9|CriOS|CrMo|Edge|Edg|EdgA|EdgiOS|FxiOS|HeadlessChrome|IEMobile|Iron|Opera ?Mini|OPiOS|OPR|Raven|SamsungBrowser|Silk(?!/[\\d.]+$)|UCBrowser|YaBrowser)",
				"Version",
				C(H),
				"(?:Firefox|Minefield|NetFront)"
			]), (P = V == "iCab" && parseFloat(z) > 3 && "WebKit" || /\bOpera\b/.test(H) && (/\bOPR\b/.test(t) ? "Blink" : "Presto") || /\b(?:Midori|Nook|Safari)\b/i.test(t) && !/^(?:Trident|EdgeHTML)$/.test(V) && "WebKit" || !V && /\bMSIE\b/i.test(t) && (G == "Mac OS" ? "Tasman" : "Trident") || V == "WebKit" && /\bPlayStation\b(?! Vita\b)/i.test(H) && "NetFront") && (V = [P]), H == "IE" && (P = (/; *(?:XBLWP|ZuneWP)(\d+)/i.exec(t) || 0)[1]) ? (H += " Mobile", G = "Windows Phone " + (/\+$/.test(P) ? P : P + ".x"), I.unshift("desktop mode")) : /\bWPDesktop\b/i.test(t) ? (H = "IE Mobile", G = "Windows Phone 8.x", I.unshift("desktop mode"), z ||= (/\brv:([\d.]+)/.exec(t) || 0)[1]) : H != "IE" && V == "Trident" && (P = /\brv:([\d.]+)/.exec(t)) && (H && I.push("identifying as " + H + (z ? " " + z : "")), H = "IE", z = P[1]), R) {
				if (S(a, "global")) if (D && (P = D.lang.System, F = P.getProperty("os.arch"), G ||= P.getProperty("os.name") + " " + P.getProperty("os.version")), O) {
					try {
						z = a.require("ringo/engine").version.join("."), H = "RingoJS";
					} catch {
						(P = a.system) && P.global.system == a.system && (H = "Narwhal", G ||= P[0].os || null);
					}
					H ||= "Rhino";
				} else typeof a.process == "object" && !a.process.browser && (P = a.process) && (typeof P.versions == "object" && (typeof P.versions.electron == "string" ? (I.push("Node " + P.versions.node), H = "Electron", z = P.versions.electron) : typeof P.versions.nw == "string" && (I.push("Chromium " + z, "Node " + P.versions.node), H = "NW.js", z = P.versions.nw)), H || (H = "Node.js", F = P.arch, G = P.platform, z = /[\d.]+/.exec(P.version), z = z ? z[0] : null));
				else x(P = a.runtime) == p ? (H = "Adobe AIR", G = P.flash.system.Capabilities.os) : x(P = a.phantom) == v ? (H = "PhantomJS", z = (P = P.version || null) && P.major + "." + P.minor + "." + P.patch) : typeof j.documentMode == "number" && (P = /\bTrident\/(\d+)/i.exec(t)) ? (z = [z, j.documentMode], (P = +P[1] + 4) != z[1] && (I.push("IE " + z[1] + " mode"), V && (V[1] = ""), z[1] = P), z = H == "IE" ? String(z[1].toFixed(1)) : z[0]) : typeof j.documentMode == "number" && /^(?:Chrome|Firefox)\b/.test(H) && (I.push("masking as " + H + " " + z), H = "IE", z = "11.0", V = ["Trident"], G = "Windows");
				G &&= y(G);
			}
			if (z && (P = /(?:[ab]|dp|pre|[ab]\d+pre)(?:\d+\+?)?$/i.exec(z) || /(?:alpha|beta)(?: ?\d)?/i.exec(t + ";" + (R && c.appMinorVersion)) || /\bMinefield\b/i.test(t) && "a") && (L = /b/i.test(P) ? "beta" : "alpha", z = z.replace(RegExp(P + "\\+?$"), "") + (L == "beta" ? A : k) + (/\d+\+?/.exec(P) || "")), H == "Fennec" || H == "Firefox" && /\b(?:Android|Firefox OS|KaiOS)\b/.test(G)) H = "Firefox Mobile";
			else if (H == "Maxthon" && z) z = z.replace(/\.[\d.]+/, ".x");
			else if (/\bXbox\b/i.test(U)) U == "Xbox 360" && (G = null), U == "Xbox 360" && /\bIEMobile\b/.test(t) && I.unshift("mobile mode");
			else if ((/^(?:Chrome|IE|Opera)$/.test(H) || H && !U && !/Browser|Mobi/.test(H)) && (G == "Windows CE" || /Mobi/i.test(t))) H += " Mobile";
			else if (H == "IE" && R) try {
				a.external === null && I.unshift("platform preview");
			} catch {
				I.unshift("embedded");
			}
			else (/\bBlackBerry\b/.test(U) || /\bBB10\b/.test(t)) && (P = (RegExp(U.replace(/ +/g, " *") + "/([.\\d]+)", "i").exec(t) || 0)[1] || z) ? (P = [P, /BB10/.test(t)], G = (P[1] ? (U = null, W = "BlackBerry") : "Device Software") + " " + P[0], z = null) : this != b && U != "Wii" && (R && M || /Opera/.test(H) && /\b(?:MSIE|Firefox)\b/i.test(t) || H == "Firefox" && /\bOS X (?:\d+\.){2,}/.test(G) || H == "IE" && (G && !/^Win/.test(G) && z > 5.5 || /\bWindows XP\b/.test(G) && z > 8 || z == 8 && !/\bTrident\b/.test(t))) && !f.test(P = E.call(b, t.replace(f, "") + ";")) && P.name && (P = "ing as " + P.name + ((P = P.version) ? " " + P : ""), f.test(H) ? (/\bIE\b/.test(P) && G == "Mac OS" && (G = null), P = "identify" + P) : (P = "mask" + P, H = N ? y(N.replace(/([a-z])([A-Z])/g, "$1 $2")) : "Opera", /\bIE\b/.test(P) && (G = null), R || (z = null)), V = ["Presto"], I.push(P));
			(P = (/\bAppleWebKit\/([\d.]+\+?)/i.exec(t) || 0)[1]) && (P = [parseFloat(P.replace(/\.(\d)$/, ".0$1")), P], H == "Safari" && P[1].slice(-1) == "+" ? (H = "WebKit Nightly", L = "alpha", z = P[1].slice(0, -1)) : (z == P[1] || z == (P[2] = (/\bSafari\/([\d.]+\+?)/i.exec(t) || 0)[1])) && (z = null), P[1] = (/\b(?:Headless)?Chrome\/([\d.]+)/i.exec(t) || 0)[1], P[0] == 537.36 && P[2] == 537.36 && parseFloat(P[1]) >= 28 && V == "WebKit" && (V = ["Blink"]), !R || !u && !P[1] ? (V && (V[1] = "like Safari"), P = (P = P[0], P < 400 ? 1 : P < 500 ? 2 : P < 526 ? 3 : P < 533 ? 4 : P < 534 ? "4+" : P < 535 ? 5 : P < 537 ? 6 : P < 538 ? 7 : P < 601 ? 8 : P < 602 ? 9 : P < 604 ? 10 : P < 606 ? 11 : P < 608 ? 12 : "12")) : (V && (V[1] = "like Chrome"), P = P[1] || (P = P[0], P < 530 ? 1 : P < 532 ? 2 : P < 532.05 ? 3 : P < 533 ? 4 : P < 534.03 ? 5 : P < 534.07 ? 6 : P < 534.1 ? 7 : P < 534.13 ? 8 : P < 534.16 ? 9 : P < 534.24 ? 10 : P < 534.3 ? 11 : P < 535.01 ? 12 : P < 535.02 ? "13+" : P < 535.07 ? 15 : P < 535.11 ? 16 : P < 535.19 ? 17 : P < 536.05 ? 18 : P < 536.1 ? 19 : P < 537.01 ? 20 : P < 537.11 ? "21+" : P < 537.13 ? 23 : P < 537.18 ? 24 : P < 537.24 ? 25 : P < 537.36 ? 26 : V == "Blink" ? "28" : "27")), V && (V[1] += " " + (P += typeof P == "number" ? ".x" : /[.+]/.test(P) ? "" : "+")), H == "Safari" && (!z || parseInt(z) > 45) ? z = P : H == "Chrome" && /\bHeadlessChrome/i.test(t) && I.unshift("headless")), H == "Opera" && (P = /\bzbov|zvav$/.exec(G)) ? (H += " ", I.unshift("desktop mode"), P == "zvav" ? (H += "Mini", z = null) : H += "Mobile", G = G.replace(RegExp(" *" + P + "$"), "")) : H == "Safari" && /\bChrome\b/.exec(V && V[1]) ? (I.unshift("desktop mode"), H = "Chrome Mobile", z = null, /\bOS X\b/.test(G) ? (W = "Apple", G = "iOS 4.3+") : G = null) : /\bSRWare Iron\b/.test(H) && !z && (z = Z("Chrome")), z && z.indexOf(P = /[\d.]+$/.exec(G)) == 0 && t.indexOf("/" + P + "-") > -1 && (G = T(G.replace(P, ""))), G && G.indexOf(H) != -1 && !RegExp(H + " OS").test(G) && (G = G.replace(RegExp(" *" + C(H) + " *"), "")), V && !/\b(?:Avant|Nook)\b/.test(H) && (/Browser|Lunascape|Maxthon/.test(H) || H != "Safari" && /^iOS/.test(G) && /\bSafari\b/.test(V[1]) || /^(?:Adobe|Arora|Breach|Midori|Opera|Phantom|Rekonq|Rock|Samsung Internet|Sleipnir|SRWare Iron|Vivaldi|Web)/.test(H) && V[1]) && (P = V[V.length - 1]) && I.push(P), I.length && (I = ["(" + I.join("; ") + ")"]), W && U && U.indexOf(W) < 0 && I.push("on " + W), U && I.push((/^on /.test(I[I.length - 1]) ? "" : "on ") + U), G &&= (P = / ([\d.+]+)$/.exec(G), B = P && G.charAt(G.length - P[0].length - 1) == "/", {
				architecture: 32,
				family: P && !B ? G.replace(P[0], "") : G,
				version: P ? P[1] : null,
				toString: function() {
					var t = this.version;
					return this.family + (t && !B ? " " + t : "") + (this.architecture == 64 ? " 64-bit" : "");
				}
			}), (P = /\b(?:AMD|IA|Win|WOW|x86_|x)64\b/i.exec(F)) && !/\bi686\b/i.test(F) ? (G && (G.architecture = 64, G.family = G.family.replace(RegExp(" *" + P), "")), H && (/\bWOW64\b/i.test(t) || R && /\w(?:86|32)$/.test(c.cpuClass || c.platform) && !/\bWin64; x64\b/i.test(t)) && I.unshift("32-bit")) : G && /^OS X/.test(G.family) && H == "Chrome" && parseFloat(z) >= 39 && (G.architecture = 64), t ||= null;
			var $ = {};
			return $.description = t, $.layout = V && V[0], $.manufacturer = W, $.name = H, $.prerelease = L, $.product = U, $.ua = t, $.version = H && z, $.os = G || {
				architecture: null,
				family: null,
				version: null,
				toString: function() {
					return "null";
				}
			}, $.parse = E, $.toString = Q, $.version && I.unshift(z), $.name && I.unshift(H), G && H && !(G == String(G).split(" ")[0] && (G == H.split(" ")[0] || U)) && I.push(U ? "(" + G + ")" : "on " + G), I.length && ($.description = I.join(" ")), $;
		}
		var D = E();
		typeof define == "function" && typeof define.amd == "object" && define.amd ? (s.platform = D, define(function() {
			return D;
		})) : c && l ? b(D, function(t, a) {
			c[a] = t;
		}) : s.platform = D;
	}).call(t);
})))();
function int(t) {
	return parseInt(String(t), 10);
}
"toInt" in String.prototype || (String.prototype.toInt = function() {
	return int(this);
}), "toUint" in String.prototype || (String.prototype.toUint = function() {
	let t = int(this);
	return t < 0 ? -t : t;
});
var CmnLib = class {
	static stageW = 0;
	static stageH = 0;
	static debugLog = !1;
	static isSafari = import_platform.name === "Safari";
	static isFirefox = import_platform.name === "Firefox";
	static isMac = /OS X/.test(import_platform.os?.family ?? "");
	static isWin = /Windows/.test(import_platform.os?.family ?? "");
	static isMobile = !/(Windows|OS X)/.test(import_platform.os?.family ?? "");
	static hDip = {};
	static isDbg = !1;
	static isPackaged = !1;
	static isDarkMode = !1;
	static cc4ColorName;
}, isObject = (t) => {
	let a = typeof t;
	return t !== null && (a === "object" || a === "function");
}, disallowedKeys = new Set([
	"__proto__",
	"prototype",
	"constructor"
]), MAX_ARRAY_INDEX = 1e6, isDigit = (t) => t >= "0" && t <= "9";
function shouldCoerceToNumber(t) {
	if (t === "0") return !0;
	if (/^[1-9]\d*$/.test(t)) {
		let a = Number.parseInt(t, 10);
		return a <= 2 ** 53 - 1 && a <= MAX_ARRAY_INDEX;
	}
	return !1;
}
function processSegment(t, a) {
	return disallowedKeys.has(t) ? !1 : (t && shouldCoerceToNumber(t) ? a.push(Number.parseInt(t, 10)) : a.push(t), !0);
}
function parsePath(t) {
	if (typeof t != "string") throw TypeError(`Expected a string, got ${typeof t}`);
	let a = [], o = "", s = "start", c = !1, l = 0;
	for (let u of t) {
		if (l++, c) {
			o += u, c = !1;
			continue;
		}
		if (u === "\\") {
			if (s === "index") throw Error(`Invalid character '${u}' in an index at position ${l}`);
			if (s === "indexEnd") throw Error(`Invalid character '${u}' after an index at position ${l}`);
			c = !0, s = s === "start" ? "property" : s;
			continue;
		}
		switch (u) {
			case ".":
				if (s === "index") throw Error(`Invalid character '${u}' in an index at position ${l}`);
				if (s === "indexEnd") {
					s = "property";
					break;
				}
				if (!processSegment(o, a)) return [];
				o = "", s = "property";
				break;
			case "[":
				if (s === "index") throw Error(`Invalid character '${u}' in an index at position ${l}`);
				if (s === "indexEnd") {
					s = "index";
					break;
				}
				if (s === "property" || s === "start") {
					if ((o || s === "property") && !processSegment(o, a)) return [];
					o = "";
				}
				s = "index";
				break;
			case "]":
				if (s === "index") {
					if (o === "") o = (a.pop() || "") + "[]", s = "property";
					else {
						let t = Number.parseInt(o, 10);
						!Number.isNaN(t) && Number.isFinite(t) && t >= 0 && t <= 2 ** 53 - 1 && t <= MAX_ARRAY_INDEX && o === String(t) ? a.push(t) : a.push(o), o = "", s = "indexEnd";
					}
					break;
				}
				if (s === "indexEnd") throw Error(`Invalid character '${u}' after an index at position ${l}`);
				o += u;
				break;
			default:
				if (s === "index" && !isDigit(u)) throw Error(`Invalid character '${u}' in an index at position ${l}`);
				if (s === "indexEnd") throw Error(`Invalid character '${u}' after an index at position ${l}`);
				s === "start" && (s = "property"), o += u;
		}
	}
	switch (c && (o += "\\"), s) {
		case "property":
			if (!processSegment(o, a)) return [];
			break;
		case "index": throw Error("Index was not closed");
		case "start":
			a.push("");
			break;
	}
	return a;
}
function normalizePath(t) {
	if (typeof t == "string") return parsePath(t);
	if (Array.isArray(t)) {
		let a = [];
		for (let [o, s] of t.entries()) {
			if (typeof s != "string" && typeof s != "number") throw TypeError(`Expected a string or number for path segment at index ${o}, got ${typeof s}`);
			if (typeof s == "number" && !Number.isFinite(s)) throw TypeError(`Path segment at index ${o} must be a finite number, got ${s}`);
			if (disallowedKeys.has(s)) return [];
			typeof s == "string" && shouldCoerceToNumber(s) ? a.push(Number.parseInt(s, 10)) : a.push(s);
		}
		return a;
	}
	return [];
}
function getProperty(t, a, o) {
	if (!isObject(t) || typeof a != "string" && !Array.isArray(a)) return o === void 0 ? t : o;
	let s = normalizePath(a);
	if (s.length === 0) return o;
	for (let a = 0; a < s.length; a++) {
		let c = s[a];
		if (t = t[c], t == null) {
			if (a !== s.length - 1) return o;
			break;
		}
	}
	return t === void 0 ? o : t;
}
function setProperty(t, a, o) {
	if (!isObject(t) || typeof a != "string" && !Array.isArray(a)) return t;
	let s = t, c = normalizePath(a);
	if (c.length === 0) return t;
	for (let a = 0; a < c.length; a++) {
		let s = c[a];
		if (a === c.length - 1) t[s] = o;
		else if (!isObject(t[s])) {
			let o = typeof c[a + 1] == "number";
			t[s] = o ? [] : {};
		}
		t = t[s];
	}
	return s;
}
function deleteProperty(t, a) {
	if (!isObject(t) || typeof a != "string" && !Array.isArray(a)) return !1;
	let o = normalizePath(a);
	if (o.length === 0) return !1;
	for (let a = 0; a < o.length; a++) {
		let s = o[a];
		if (a === o.length - 1) return Object.hasOwn(t, s) ? (delete t[s], !0) : !1;
		if (t = t[s], !isObject(t)) return !1;
	}
}
function hasProperty(t, a) {
	if (!isObject(t) || typeof a != "string" && !Array.isArray(a)) return !1;
	let o = normalizePath(a);
	if (o.length === 0) return !1;
	for (let a of o) {
		if (!isObject(t) || !(a in t)) return !1;
		t = t[a];
	}
	return !0;
}
var homedir = os.homedir(), tmpdir = os.tmpdir(), { env } = process$1, macos = (t) => {
	let a = path.join(homedir, "Library");
	return {
		data: path.join(a, "Application Support", t),
		config: path.join(a, "Preferences", t),
		cache: path.join(a, "Caches", t),
		log: path.join(a, "Logs", t),
		temp: path.join(tmpdir, t)
	};
}, windows = (t) => {
	let a = env.APPDATA || path.join(homedir, "AppData", "Roaming"), o = env.LOCALAPPDATA || path.join(homedir, "AppData", "Local");
	return {
		data: path.join(o, t, "Data"),
		config: path.join(a, t, "Config"),
		cache: path.join(o, t, "Cache"),
		log: path.join(o, t, "Log"),
		temp: path.join(tmpdir, t)
	};
}, linux = (t) => {
	let a = path.basename(homedir);
	return {
		data: path.join(env.XDG_DATA_HOME || path.join(homedir, ".local", "share"), t),
		config: path.join(env.XDG_CONFIG_HOME || path.join(homedir, ".config"), t),
		cache: path.join(env.XDG_CACHE_HOME || path.join(homedir, ".cache"), t),
		log: path.join(env.XDG_STATE_HOME || path.join(homedir, ".local", "state"), t),
		temp: path.join(tmpdir, a, t)
	};
};
function envPaths(t, { suffix: a = "nodejs" } = {}) {
	if (typeof t != "string") throw TypeError(`Expected a string, got ${typeof t}`);
	return a && (t += `-${a}`), process$1.platform === "darwin" ? macos(t) : process$1.platform === "win32" ? windows(t) : linux(t);
}
var attemptify_async_default = (t, a) => {
	let { onError: o } = a;
	return function(...a) {
		return t.apply(void 0, a).catch(o);
	};
}, attemptify_sync_default = (t, a) => {
	let { onError: o } = a;
	return function(...a) {
		try {
			return t.apply(void 0, a);
		} catch (t) {
			return o(t);
		}
	};
}, retryify_async_default = (t, a) => {
	let { isRetriable: o } = a;
	return function(a) {
		let { timeout: s } = a, c = a.interval ?? 250, l = Date.now() + s;
		return function a(...s) {
			return t.apply(void 0, s).catch((t) => {
				if (!o(t) || Date.now() >= l) throw t;
				let u = Math.round(c * Math.random());
				return u > 0 ? new Promise((t) => setTimeout(t, u)).then(() => a.apply(void 0, s)) : a.apply(void 0, s);
			});
		};
	};
}, retryify_sync_default = (t, a) => {
	let { isRetriable: o } = a;
	return function(a) {
		let { timeout: s } = a, c = Date.now() + s;
		return function(...a) {
			for (;;) try {
				return t.apply(void 0, a);
			} catch (t) {
				if (!o(t) || Date.now() >= c) throw t;
				continue;
			}
		};
	};
}, Handlers = {
	isChangeErrorOk: (t) => {
		if (!Handlers.isNodeError(t)) return !1;
		let { code: a } = t;
		return a === "ENOSYS" || !IS_USER_ROOT$1 && (a === "EINVAL" || a === "EPERM");
	},
	isNodeError: (t) => t instanceof Error,
	isRetriableError: (t) => {
		if (!Handlers.isNodeError(t)) return !1;
		let { code: a } = t;
		return a === "EMFILE" || a === "ENFILE" || a === "EAGAIN" || a === "EBUSY" || a === "EACCESS" || a === "EACCES" || a === "EACCS" || a === "EPERM";
	},
	onChangeError: (t) => {
		if (!Handlers.isNodeError(t) || !Handlers.isChangeErrorOk(t)) throw t;
	}
}, handlers_default = Handlers, ATTEMPTIFY_CHANGE_ERROR_OPTIONS = { onError: handlers_default.onChangeError }, ATTEMPTIFY_NOOP_OPTIONS = { onError: () => void 0 }, IS_USER_ROOT$1 = process$1.getuid ? !process$1.getuid() : !1, RETRYIFY_OPTIONS = { isRetriable: handlers_default.isRetriableError }, dist_default = {
	attempt: {
		chmod: attemptify_async_default(promisify(fs.chmod), ATTEMPTIFY_CHANGE_ERROR_OPTIONS),
		chown: attemptify_async_default(promisify(fs.chown), ATTEMPTIFY_CHANGE_ERROR_OPTIONS),
		close: attemptify_async_default(promisify(fs.close), ATTEMPTIFY_NOOP_OPTIONS),
		fsync: attemptify_async_default(promisify(fs.fsync), ATTEMPTIFY_NOOP_OPTIONS),
		mkdir: attemptify_async_default(promisify(fs.mkdir), ATTEMPTIFY_NOOP_OPTIONS),
		realpath: attemptify_async_default(promisify(fs.realpath), ATTEMPTIFY_NOOP_OPTIONS),
		stat: attemptify_async_default(promisify(fs.stat), ATTEMPTIFY_NOOP_OPTIONS),
		unlink: attemptify_async_default(promisify(fs.unlink), ATTEMPTIFY_NOOP_OPTIONS),
		chmodSync: attemptify_sync_default(fs.chmodSync, ATTEMPTIFY_CHANGE_ERROR_OPTIONS),
		chownSync: attemptify_sync_default(fs.chownSync, ATTEMPTIFY_CHANGE_ERROR_OPTIONS),
		closeSync: attemptify_sync_default(fs.closeSync, ATTEMPTIFY_NOOP_OPTIONS),
		existsSync: attemptify_sync_default(fs.existsSync, ATTEMPTIFY_NOOP_OPTIONS),
		fsyncSync: attemptify_sync_default(fs.fsync, ATTEMPTIFY_NOOP_OPTIONS),
		mkdirSync: attemptify_sync_default(fs.mkdirSync, ATTEMPTIFY_NOOP_OPTIONS),
		realpathSync: attemptify_sync_default(fs.realpathSync, ATTEMPTIFY_NOOP_OPTIONS),
		statSync: attemptify_sync_default(fs.statSync, ATTEMPTIFY_NOOP_OPTIONS),
		unlinkSync: attemptify_sync_default(fs.unlinkSync, ATTEMPTIFY_NOOP_OPTIONS)
	},
	retry: {
		close: retryify_async_default(promisify(fs.close), RETRYIFY_OPTIONS),
		fsync: retryify_async_default(promisify(fs.fsync), RETRYIFY_OPTIONS),
		open: retryify_async_default(promisify(fs.open), RETRYIFY_OPTIONS),
		readFile: retryify_async_default(promisify(fs.readFile), RETRYIFY_OPTIONS),
		rename: retryify_async_default(promisify(fs.rename), RETRYIFY_OPTIONS),
		stat: retryify_async_default(promisify(fs.stat), RETRYIFY_OPTIONS),
		write: retryify_async_default(promisify(fs.write), RETRYIFY_OPTIONS),
		writeFile: retryify_async_default(promisify(fs.writeFile), RETRYIFY_OPTIONS),
		closeSync: retryify_sync_default(fs.closeSync, RETRYIFY_OPTIONS),
		fsyncSync: retryify_sync_default(fs.fsyncSync, RETRYIFY_OPTIONS),
		openSync: retryify_sync_default(fs.openSync, RETRYIFY_OPTIONS),
		readFileSync: retryify_sync_default(fs.readFileSync, RETRYIFY_OPTIONS),
		renameSync: retryify_sync_default(fs.renameSync, RETRYIFY_OPTIONS),
		statSync: retryify_sync_default(fs.statSync, RETRYIFY_OPTIONS),
		writeSync: retryify_sync_default(fs.writeSync, RETRYIFY_OPTIONS),
		writeFileSync: retryify_sync_default(fs.writeFileSync, RETRYIFY_OPTIONS)
	}
}, DEFAULT_WRITE_OPTIONS = {}, DEFAULT_USER_UID = process$1.geteuid ? process$1.geteuid() : -1, DEFAULT_USER_GID = process$1.getegid ? process$1.getegid() : -1, IS_POSIX = !!process$1.getuid;
process$1.getuid && process$1.getuid();
var isException = (t) => t instanceof Error && "code" in t, isString = (t) => typeof t == "string", isUndefined = (t) => t === void 0, browser_default = new class {
	constructor() {
		this.callbacks = /* @__PURE__ */ new Set(), this.exit = () => {
			for (let t of this.callbacks) t();
		}, this.hook = () => {
			window.addEventListener("beforeunload", this.exit);
		}, this.register = (t) => (this.callbacks.add(t), () => {
			this.callbacks.delete(t);
		}), this.hook();
	}
}().register, Temp = {
	store: {},
	create: (t) => {
		let a = `000000${Math.floor(Math.random() * 16777215).toString(16)}`.slice(-6);
		return `${t}${`.tmp-${Date.now().toString().slice(-10)}${a}`}`;
	},
	get: (t, a, o = !0) => {
		let s = Temp.truncate(a(t));
		return s in Temp.store ? Temp.get(t, a, o) : (Temp.store[s] = o, [s, () => delete Temp.store[s]]);
	},
	purge: (t) => {
		Temp.store[t] && (delete Temp.store[t], dist_default.attempt.unlink(t));
	},
	purgeSync: (t) => {
		Temp.store[t] && (delete Temp.store[t], dist_default.attempt.unlinkSync(t));
	},
	purgeSyncAll: () => {
		for (let t in Temp.store) Temp.purgeSync(t);
	},
	truncate: (t) => {
		let a = path.basename(t);
		if (a.length <= 128) return t;
		let o = /^(\.?)(.*?)((?:\.[^.]+)?(?:\.tmp-\d{10}[a-f0-9]{6})?)$/.exec(a);
		if (!o) return t;
		let s = a.length - 128;
		return `${t.slice(0, -a.length)}${o[1]}${o[2].slice(0, -s)}${o[3]}`;
	}
};
browser_default(Temp.purgeSyncAll);
var temp_default = Temp;
function writeFileSync$1(t, a, o = DEFAULT_WRITE_OPTIONS) {
	if (isString(o)) return writeFileSync$1(t, a, { encoding: o });
	let s = { timeout: o.timeout ?? 1e3 }, c = null, l = null, u = null;
	try {
		let d = dist_default.attempt.realpathSync(t), p = !!d;
		t = d || t, [l, c] = temp_default.get(t, o.tmpCreate || temp_default.create, o.tmpPurge !== !1);
		let m = IS_POSIX && isUndefined(o.chown), h = isUndefined(o.mode);
		if (p && (m || h)) {
			let a = dist_default.attempt.statSync(t);
			a && (o = { ...o }, m && (o.chown = {
				uid: a.uid,
				gid: a.gid
			}), h && (o.mode = a.mode));
		}
		if (!p) {
			let a = path.dirname(t);
			dist_default.attempt.mkdirSync(a, {
				mode: 511,
				recursive: !0
			});
		}
		u = dist_default.retry.openSync(s)(l, "w", o.mode || 438), o.tmpCreated && o.tmpCreated(l), isString(a) ? dist_default.retry.writeSync(s)(u, a, 0, o.encoding || "utf8") : isUndefined(a) || dist_default.retry.writeSync(s)(u, a, 0, a.length, 0), o.fsync !== !1 && (o.fsyncWait === !1 ? dist_default.attempt.fsync(u) : dist_default.retry.fsyncSync(s)(u)), dist_default.retry.closeSync(s)(u), u = null, o.chown && (o.chown.uid !== DEFAULT_USER_UID || o.chown.gid !== DEFAULT_USER_GID) && dist_default.attempt.chownSync(l, o.chown.uid, o.chown.gid), o.mode && o.mode !== 438 && dist_default.attempt.chmodSync(l, o.mode);
		try {
			dist_default.retry.renameSync(s)(l, t);
		} catch (a) {
			if (!isException(a) || a.code !== "ENAMETOOLONG") throw a;
			dist_default.retry.renameSync(s)(l, temp_default.truncate(t));
		}
		c(), l = null;
	} finally {
		u && dist_default.attempt.closeSync(u), l && temp_default.purge(l);
	}
}
var require_code$3 = /* @__PURE__ */ __commonJSMin(((t) => {
	Object.defineProperty(t, "__esModule", { value: !0 }), t.regexpCode = t.getEsmExportName = t.getProperty = t.safeStringify = t.stringify = t.strConcat = t.addCodeArg = t.str = t._ = t.nil = t._Code = t.Name = t.IDENTIFIER = t._CodeOrName = void 0;
	var a = class {};
	t._CodeOrName = a, t.IDENTIFIER = /^[a-z$_][a-z$_0-9]*$/i;
	var o = class extends a {
		constructor(a) {
			if (super(), !t.IDENTIFIER.test(a)) throw Error("CodeGen: name must be a valid identifier");
			this.str = a;
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
	};
	t.Name = o;
	var s = class extends a {
		constructor(t) {
			super(), this._items = typeof t == "string" ? [t] : t;
		}
		toString() {
			return this.str;
		}
		emptyStr() {
			if (this._items.length > 1) return !1;
			let t = this._items[0];
			return t === "" || t === "\"\"";
		}
		get str() {
			return this._str ??= this._items.reduce((t, a) => `${t}${a}`, "");
		}
		get names() {
			return this._names ??= this._items.reduce((t, a) => (a instanceof o && (t[a.str] = (t[a.str] || 0) + 1), t), {});
		}
	};
	t._Code = s, t.nil = new s("");
	function c(t, ...a) {
		let o = [t[0]], c = 0;
		for (; c < a.length;) d(o, a[c]), o.push(t[++c]);
		return new s(o);
	}
	t._ = c;
	var l = new s("+");
	function u(t, ...a) {
		let o = [_(t[0])], c = 0;
		for (; c < a.length;) o.push(l), d(o, a[c]), o.push(l, _(t[++c]));
		return f(o), new s(o);
	}
	t.str = u;
	function d(t, a) {
		a instanceof s ? t.push(...a._items) : a instanceof o ? t.push(a) : t.push(h(a));
	}
	t.addCodeArg = d;
	function f(t) {
		let a = 1;
		for (; a < t.length - 1;) {
			if (t[a] === l) {
				let o = p(t[a - 1], t[a + 1]);
				if (o !== void 0) {
					t.splice(a - 1, 3, o);
					continue;
				}
				t[a++] = "+";
			}
			a++;
		}
	}
	function p(t, a) {
		if (a === "\"\"") return t;
		if (t === "\"\"") return a;
		if (typeof t == "string") return a instanceof o || t[t.length - 1] !== "\"" ? void 0 : typeof a == "string" ? a[0] === "\"" ? t.slice(0, -1) + a.slice(1) : void 0 : `${t.slice(0, -1)}${a}"`;
		if (typeof a == "string" && a[0] === "\"" && !(t instanceof o)) return `"${t}${a.slice(1)}`;
	}
	function m(t, a) {
		return a.emptyStr() ? t : t.emptyStr() ? a : u`${t}${a}`;
	}
	t.strConcat = m;
	function h(t) {
		return typeof t == "number" || typeof t == "boolean" || t === null ? t : _(Array.isArray(t) ? t.join(",") : t);
	}
	function g(t) {
		return new s(_(t));
	}
	t.stringify = g;
	function _(t) {
		return JSON.stringify(t).replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029");
	}
	t.safeStringify = _;
	function v(a) {
		return typeof a == "string" && t.IDENTIFIER.test(a) ? new s(`.${a}`) : c`[${a}]`;
	}
	t.getProperty = v;
	function y(a) {
		if (typeof a == "string" && t.IDENTIFIER.test(a)) return new s(`${a}`);
		throw Error(`CodeGen: invalid export name: ${a}, use explicit $id name mapping`);
	}
	t.getEsmExportName = y;
	function b(t) {
		return new s(t.toString());
	}
	t.regexpCode = b;
})), require_scope$1 = /* @__PURE__ */ __commonJSMin(((t) => {
	Object.defineProperty(t, "__esModule", { value: !0 }), t.ValueScope = t.ValueScopeName = t.Scope = t.varKinds = t.UsedValueState = void 0;
	var a = require_code$3(), o = class extends Error {
		constructor(t) {
			super(`CodeGen: "code" for ${t} not defined`), this.value = t.value;
		}
	}, s;
	(function(t) {
		t[t.Started = 0] = "Started", t[t.Completed = 1] = "Completed";
	})(s || (t.UsedValueState = s = {})), t.varKinds = {
		const: new a.Name("const"),
		let: new a.Name("let"),
		var: new a.Name("var")
	};
	var c = class {
		constructor({ prefixes: t, parent: a } = {}) {
			this._names = {}, this._prefixes = t, this._parent = a;
		}
		toName(t) {
			return t instanceof a.Name ? t : this.name(t);
		}
		name(t) {
			return new a.Name(this._newName(t));
		}
		_newName(t) {
			let a = this._names[t] || this._nameGroup(t);
			return `${t}${a.index++}`;
		}
		_nameGroup(t) {
			if ((this._parent?._prefixes)?.has(t) || this._prefixes && !this._prefixes.has(t)) throw Error(`CodeGen: prefix "${t}" is not allowed in this scope`);
			return this._names[t] = {
				prefix: t,
				index: 0
			};
		}
	};
	t.Scope = c;
	var l = class extends a.Name {
		constructor(t, a) {
			super(a), this.prefix = t;
		}
		setValue(t, { property: o, itemIndex: s }) {
			this.value = t, this.scopePath = (0, a._)`.${new a.Name(o)}[${s}]`;
		}
	};
	t.ValueScopeName = l;
	var u = (0, a._)`\n`;
	t.ValueScope = class extends c {
		constructor(t) {
			super(t), this._values = {}, this._scope = t.scope, this.opts = {
				...t,
				_n: t.lines ? u : a.nil
			};
		}
		get() {
			return this._scope;
		}
		name(t) {
			return new l(t, this._newName(t));
		}
		value(t, a) {
			if (a.ref === void 0) throw Error("CodeGen: ref must be passed in value");
			let o = this.toName(t), { prefix: s } = o, c = a.key ?? a.ref, l = this._values[s];
			if (l) {
				let t = l.get(c);
				if (t) return t;
			} else l = this._values[s] = /* @__PURE__ */ new Map();
			l.set(c, o);
			let u = this._scope[s] || (this._scope[s] = []), d = u.length;
			return u[d] = a.ref, o.setValue(a, {
				property: s,
				itemIndex: d
			}), o;
		}
		getValue(t, a) {
			let o = this._values[t];
			if (o) return o.get(a);
		}
		scopeRefs(t, o = this._values) {
			return this._reduceValues(o, (o) => {
				if (o.scopePath === void 0) throw Error(`CodeGen: name "${o}" has no value`);
				return (0, a._)`${t}${o.scopePath}`;
			});
		}
		scopeCode(t = this._values, a, o) {
			return this._reduceValues(t, (t) => {
				if (t.value === void 0) throw Error(`CodeGen: name "${t}" has no value`);
				return t.value.code;
			}, a, o);
		}
		_reduceValues(c, l, u = {}, d) {
			let f = a.nil;
			for (let p in c) {
				let m = c[p];
				if (!m) continue;
				let h = u[p] = u[p] || /* @__PURE__ */ new Map();
				m.forEach((c) => {
					if (h.has(c)) return;
					h.set(c, s.Started);
					let u = l(c);
					if (u) {
						let o = this.opts.es5 ? t.varKinds.var : t.varKinds.const;
						f = (0, a._)`${f}${o} ${c} = ${u};${this.opts._n}`;
					} else if (u = d?.(c)) f = (0, a._)`${f}${u}${this.opts._n}`;
					else throw new o(c);
					h.set(c, s.Completed);
				});
			}
			return f;
		}
	};
})), require_codegen$1 = /* @__PURE__ */ __commonJSMin(((t) => {
	Object.defineProperty(t, "__esModule", { value: !0 }), t.or = t.and = t.not = t.CodeGen = t.operators = t.varKinds = t.ValueScopeName = t.ValueScope = t.Scope = t.Name = t.regexpCode = t.stringify = t.getProperty = t.nil = t.strConcat = t.str = t._ = void 0;
	var a = require_code$3(), o = require_scope$1(), s = require_code$3();
	Object.defineProperty(t, "_", {
		enumerable: !0,
		get: function() {
			return s._;
		}
	}), Object.defineProperty(t, "str", {
		enumerable: !0,
		get: function() {
			return s.str;
		}
	}), Object.defineProperty(t, "strConcat", {
		enumerable: !0,
		get: function() {
			return s.strConcat;
		}
	}), Object.defineProperty(t, "nil", {
		enumerable: !0,
		get: function() {
			return s.nil;
		}
	}), Object.defineProperty(t, "getProperty", {
		enumerable: !0,
		get: function() {
			return s.getProperty;
		}
	}), Object.defineProperty(t, "stringify", {
		enumerable: !0,
		get: function() {
			return s.stringify;
		}
	}), Object.defineProperty(t, "regexpCode", {
		enumerable: !0,
		get: function() {
			return s.regexpCode;
		}
	}), Object.defineProperty(t, "Name", {
		enumerable: !0,
		get: function() {
			return s.Name;
		}
	});
	var c = require_scope$1();
	Object.defineProperty(t, "Scope", {
		enumerable: !0,
		get: function() {
			return c.Scope;
		}
	}), Object.defineProperty(t, "ValueScope", {
		enumerable: !0,
		get: function() {
			return c.ValueScope;
		}
	}), Object.defineProperty(t, "ValueScopeName", {
		enumerable: !0,
		get: function() {
			return c.ValueScopeName;
		}
	}), Object.defineProperty(t, "varKinds", {
		enumerable: !0,
		get: function() {
			return c.varKinds;
		}
	}), t.operators = {
		GT: new a._Code(">"),
		GTE: new a._Code(">="),
		LT: new a._Code("<"),
		LTE: new a._Code("<="),
		EQ: new a._Code("==="),
		NEQ: new a._Code("!=="),
		NOT: new a._Code("!"),
		OR: new a._Code("||"),
		AND: new a._Code("&&"),
		ADD: new a._Code("+")
	};
	var l = class {
		optimizeNodes() {
			return this;
		}
		optimizeNames(t, a) {
			return this;
		}
	}, u = class extends l {
		constructor(t, a, o) {
			super(), this.varKind = t, this.name = a, this.rhs = o;
		}
		render({ es5: t, _n: a }) {
			let s = t ? o.varKinds.var : this.varKind, c = this.rhs === void 0 ? "" : ` = ${this.rhs}`;
			return `${s} ${this.name}${c};` + a;
		}
		optimizeNames(t, a) {
			if (t[this.name.str]) return this.rhs &&= N(this.rhs, t, a), this;
		}
		get names() {
			return this.rhs instanceof a._CodeOrName ? this.rhs.names : {};
		}
	}, d = class extends l {
		constructor(t, a, o) {
			super(), this.lhs = t, this.rhs = a, this.sideEffects = o;
		}
		render({ _n: t }) {
			return `${this.lhs} = ${this.rhs};` + t;
		}
		optimizeNames(t, o) {
			if (!(this.lhs instanceof a.Name && !t[this.lhs.str] && !this.sideEffects)) return this.rhs = N(this.rhs, t, o), this;
		}
		get names() {
			return M(this.lhs instanceof a.Name ? {} : { ...this.lhs.names }, this.rhs);
		}
	}, f = class extends d {
		constructor(t, a, o, s) {
			super(t, o, s), this.op = a;
		}
		render({ _n: t }) {
			return `${this.lhs} ${this.op}= ${this.rhs};` + t;
		}
	}, p = class extends l {
		constructor(t) {
			super(), this.label = t, this.names = {};
		}
		render({ _n: t }) {
			return `${this.label}:` + t;
		}
	}, m = class extends l {
		constructor(t) {
			super(), this.label = t, this.names = {};
		}
		render({ _n: t }) {
			return `break${this.label ? ` ${this.label}` : ""};` + t;
		}
	}, h = class extends l {
		constructor(t) {
			super(), this.error = t;
		}
		render({ _n: t }) {
			return `throw ${this.error};` + t;
		}
		get names() {
			return this.error.names;
		}
	}, g = class extends l {
		constructor(t) {
			super(), this.code = t;
		}
		render({ _n: t }) {
			return `${this.code};` + t;
		}
		optimizeNodes() {
			return `${this.code}` ? this : void 0;
		}
		optimizeNames(t, a) {
			return this.code = N(this.code, t, a), this;
		}
		get names() {
			return this.code instanceof a._CodeOrName ? this.code.names : {};
		}
	}, _ = class extends l {
		constructor(t = []) {
			super(), this.nodes = t;
		}
		render(t) {
			return this.nodes.reduce((a, o) => a + o.render(t), "");
		}
		optimizeNodes() {
			let { nodes: t } = this, a = t.length;
			for (; a--;) {
				let o = t[a].optimizeNodes();
				Array.isArray(o) ? t.splice(a, 1, ...o) : o ? t[a] = o : t.splice(a, 1);
			}
			return t.length > 0 ? this : void 0;
		}
		optimizeNames(t, a) {
			let { nodes: o } = this, s = o.length;
			for (; s--;) {
				let c = o[s];
				c.optimizeNames(t, a) || (P(t, c.names), o.splice(s, 1));
			}
			return o.length > 0 ? this : void 0;
		}
		get names() {
			return this.nodes.reduce((t, a) => j(t, a.names), {});
		}
	}, v = class extends _ {
		render(t) {
			return "{" + t._n + super.render(t) + "}" + t._n;
		}
	}, y = class extends _ {}, b = class extends v {};
	b.kind = "else";
	var x = class t extends v {
		constructor(t, a) {
			super(a), this.condition = t;
		}
		render(t) {
			let a = `if(${this.condition})` + super.render(t);
			return this.else && (a += "else " + this.else.render(t)), a;
		}
		optimizeNodes() {
			super.optimizeNodes();
			let a = this.condition;
			if (a === !0) return this.nodes;
			let o = this.else;
			if (o) {
				let t = o.optimizeNodes();
				o = this.else = Array.isArray(t) ? new b(t) : t;
			}
			if (o) return a === !1 ? o instanceof t ? o : o.nodes : this.nodes.length ? this : new t(F(a), o instanceof t ? [o] : o.nodes);
			if (!(a === !1 || !this.nodes.length)) return this;
		}
		optimizeNames(t, a) {
			if (this.else = this.else?.optimizeNames(t, a), super.optimizeNames(t, a) || this.else) return this.condition = N(this.condition, t, a), this;
		}
		get names() {
			let t = super.names;
			return M(t, this.condition), this.else && j(t, this.else.names), t;
		}
	};
	x.kind = "if";
	var S = class extends v {};
	S.kind = "for";
	var C = class extends S {
		constructor(t) {
			super(), this.iteration = t;
		}
		render(t) {
			return `for(${this.iteration})` + super.render(t);
		}
		optimizeNames(t, a) {
			if (super.optimizeNames(t, a)) return this.iteration = N(this.iteration, t, a), this;
		}
		get names() {
			return j(super.names, this.iteration.names);
		}
	}, w = class extends S {
		constructor(t, a, o, s) {
			super(), this.varKind = t, this.name = a, this.from = o, this.to = s;
		}
		render(t) {
			let a = t.es5 ? o.varKinds.var : this.varKind, { name: s, from: c, to: l } = this;
			return `for(${a} ${s}=${c}; ${s}<${l}; ${s}++)` + super.render(t);
		}
		get names() {
			return M(M(super.names, this.from), this.to);
		}
	}, T = class extends S {
		constructor(t, a, o, s) {
			super(), this.loop = t, this.varKind = a, this.name = o, this.iterable = s;
		}
		render(t) {
			return `for(${this.varKind} ${this.name} ${this.loop} ${this.iterable})` + super.render(t);
		}
		optimizeNames(t, a) {
			if (super.optimizeNames(t, a)) return this.iterable = N(this.iterable, t, a), this;
		}
		get names() {
			return j(super.names, this.iterable.names);
		}
	}, E = class extends v {
		constructor(t, a, o) {
			super(), this.name = t, this.args = a, this.async = o;
		}
		render(t) {
			return `${this.async ? "async " : ""}function ${this.name}(${this.args})` + super.render(t);
		}
	};
	E.kind = "func";
	var D = class extends _ {
		render(t) {
			return "return " + super.render(t);
		}
	};
	D.kind = "return";
	var O = class extends v {
		render(t) {
			let a = "try" + super.render(t);
			return this.catch && (a += this.catch.render(t)), this.finally && (a += this.finally.render(t)), a;
		}
		optimizeNodes() {
			var t, a;
			return super.optimizeNodes(), (t = this.catch) == null || t.optimizeNodes(), (a = this.finally) == null || a.optimizeNodes(), this;
		}
		optimizeNames(t, a) {
			var o, s;
			return super.optimizeNames(t, a), (o = this.catch) == null || o.optimizeNames(t, a), (s = this.finally) == null || s.optimizeNames(t, a), this;
		}
		get names() {
			let t = super.names;
			return this.catch && j(t, this.catch.names), this.finally && j(t, this.finally.names), t;
		}
	}, k = class extends v {
		constructor(t) {
			super(), this.error = t;
		}
		render(t) {
			return `catch(${this.error})` + super.render(t);
		}
	};
	k.kind = "catch";
	var A = class extends v {
		render(t) {
			return "finally" + super.render(t);
		}
	};
	A.kind = "finally", t.CodeGen = class {
		constructor(t, a = {}) {
			this._values = {}, this._blockStarts = [], this._constants = {}, this.opts = {
				...a,
				_n: a.lines ? "\n" : ""
			}, this._extScope = t, this._scope = new o.Scope({ parent: t }), this._nodes = [new y()];
		}
		toString() {
			return this._root.render(this.opts);
		}
		name(t) {
			return this._scope.name(t);
		}
		scopeName(t) {
			return this._extScope.name(t);
		}
		scopeValue(t, a) {
			let o = this._extScope.value(t, a);
			return (this._values[o.prefix] || (this._values[o.prefix] = /* @__PURE__ */ new Set())).add(o), o;
		}
		getScopeValue(t, a) {
			return this._extScope.getValue(t, a);
		}
		scopeRefs(t) {
			return this._extScope.scopeRefs(t, this._values);
		}
		scopeCode() {
			return this._extScope.scopeCode(this._values);
		}
		_def(t, a, o, s) {
			let c = this._scope.toName(a);
			return o !== void 0 && s && (this._constants[c.str] = o), this._leafNode(new u(t, c, o)), c;
		}
		const(t, a, s) {
			return this._def(o.varKinds.const, t, a, s);
		}
		let(t, a, s) {
			return this._def(o.varKinds.let, t, a, s);
		}
		var(t, a, s) {
			return this._def(o.varKinds.var, t, a, s);
		}
		assign(t, a, o) {
			return this._leafNode(new d(t, a, o));
		}
		add(a, o) {
			return this._leafNode(new f(a, t.operators.ADD, o));
		}
		code(t) {
			return typeof t == "function" ? t() : t !== a.nil && this._leafNode(new g(t)), this;
		}
		object(...t) {
			let o = ["{"];
			for (let [s, c] of t) o.length > 1 && o.push(","), o.push(s), (s !== c || this.opts.es5) && (o.push(":"), (0, a.addCodeArg)(o, c));
			return o.push("}"), new a._Code(o);
		}
		if(t, a, o) {
			if (this._blockNode(new x(t)), a && o) this.code(a).else().code(o).endIf();
			else if (a) this.code(a).endIf();
			else if (o) throw Error("CodeGen: \"else\" body without \"then\" body");
			return this;
		}
		elseIf(t) {
			return this._elseNode(new x(t));
		}
		else() {
			return this._elseNode(new b());
		}
		endIf() {
			return this._endBlockNode(x, b);
		}
		_for(t, a) {
			return this._blockNode(t), a && this.code(a).endFor(), this;
		}
		for(t, a) {
			return this._for(new C(t), a);
		}
		forRange(t, a, s, c, l = this.opts.es5 ? o.varKinds.var : o.varKinds.let) {
			let u = this._scope.toName(t);
			return this._for(new w(l, u, a, s), () => c(u));
		}
		forOf(t, s, c, l = o.varKinds.const) {
			let u = this._scope.toName(t);
			if (this.opts.es5) {
				let t = s instanceof a.Name ? s : this.var("_arr", s);
				return this.forRange("_i", 0, (0, a._)`${t}.length`, (o) => {
					this.var(u, (0, a._)`${t}[${o}]`), c(u);
				});
			}
			return this._for(new T("of", l, u, s), () => c(u));
		}
		forIn(t, s, c, l = this.opts.es5 ? o.varKinds.var : o.varKinds.const) {
			if (this.opts.ownProperties) return this.forOf(t, (0, a._)`Object.keys(${s})`, c);
			let u = this._scope.toName(t);
			return this._for(new T("in", l, u, s), () => c(u));
		}
		endFor() {
			return this._endBlockNode(S);
		}
		label(t) {
			return this._leafNode(new p(t));
		}
		break(t) {
			return this._leafNode(new m(t));
		}
		return(t) {
			let a = new D();
			if (this._blockNode(a), this.code(t), a.nodes.length !== 1) throw Error("CodeGen: \"return\" should have one node");
			return this._endBlockNode(D);
		}
		try(t, a, o) {
			if (!a && !o) throw Error("CodeGen: \"try\" without \"catch\" and \"finally\"");
			let s = new O();
			if (this._blockNode(s), this.code(t), a) {
				let t = this.name("e");
				this._currNode = s.catch = new k(t), a(t);
			}
			return o && (this._currNode = s.finally = new A(), this.code(o)), this._endBlockNode(k, A);
		}
		throw(t) {
			return this._leafNode(new h(t));
		}
		block(t, a) {
			return this._blockStarts.push(this._nodes.length), t && this.code(t).endBlock(a), this;
		}
		endBlock(t) {
			let a = this._blockStarts.pop();
			if (a === void 0) throw Error("CodeGen: not in self-balancing block");
			let o = this._nodes.length - a;
			if (o < 0 || t !== void 0 && o !== t) throw Error(`CodeGen: wrong number of nodes: ${o} vs ${t} expected`);
			return this._nodes.length = a, this;
		}
		func(t, o = a.nil, s, c) {
			return this._blockNode(new E(t, o, s)), c && this.code(c).endFunc(), this;
		}
		endFunc() {
			return this._endBlockNode(E);
		}
		optimize(t = 1) {
			for (; t-- > 0;) this._root.optimizeNodes(), this._root.optimizeNames(this._root.names, this._constants);
		}
		_leafNode(t) {
			return this._currNode.nodes.push(t), this;
		}
		_blockNode(t) {
			this._currNode.nodes.push(t), this._nodes.push(t);
		}
		_endBlockNode(t, a) {
			let o = this._currNode;
			if (o instanceof t || a && o instanceof a) return this._nodes.pop(), this;
			throw Error(`CodeGen: not in block "${a ? `${t.kind}/${a.kind}` : t.kind}"`);
		}
		_elseNode(t) {
			let a = this._currNode;
			if (!(a instanceof x)) throw Error("CodeGen: \"else\" without \"if\"");
			return this._currNode = a.else = t, this;
		}
		get _root() {
			return this._nodes[0];
		}
		get _currNode() {
			let t = this._nodes;
			return t[t.length - 1];
		}
		set _currNode(t) {
			let a = this._nodes;
			a[a.length - 1] = t;
		}
	};
	function j(t, a) {
		for (let o in a) t[o] = (t[o] || 0) + (a[o] || 0);
		return t;
	}
	function M(t, o) {
		return o instanceof a._CodeOrName ? j(t, o.names) : t;
	}
	function N(t, o, s) {
		if (t instanceof a.Name) return c(t);
		if (!l(t)) return t;
		return new a._Code(t._items.reduce((t, o) => (o instanceof a.Name && (o = c(o)), o instanceof a._Code ? t.push(...o._items) : t.push(o), t), []));
		function c(t) {
			let a = s[t.str];
			return a === void 0 || o[t.str] !== 1 ? t : (delete o[t.str], a);
		}
		function l(t) {
			return t instanceof a._Code && t._items.some((t) => t instanceof a.Name && o[t.str] === 1 && s[t.str] !== void 0);
		}
	}
	function P(t, a) {
		for (let o in a) t[o] = (t[o] || 0) - (a[o] || 0);
	}
	function F(t) {
		return typeof t == "boolean" || typeof t == "number" || t === null ? !t : (0, a._)`!${V(t)}`;
	}
	t.not = F;
	var I = B(t.operators.AND);
	function L(...t) {
		return t.reduce(I);
	}
	t.and = L;
	var R = B(t.operators.OR);
	function z(...t) {
		return t.reduce(R);
	}
	t.or = z;
	function B(t) {
		return (o, s) => o === a.nil ? s : s === a.nil ? o : (0, a._)`${V(o)} ${t} ${V(s)}`;
	}
	function V(t) {
		return t instanceof a.Name ? t : (0, a._)`(${t})`;
	}
})), require_util$2 = /* @__PURE__ */ __commonJSMin(((t) => {
	Object.defineProperty(t, "__esModule", { value: !0 }), t.checkStrictMode = t.getErrorPath = t.Type = t.useFunc = t.setEvaluated = t.evaluatedPropsToName = t.mergeEvaluated = t.eachItem = t.unescapeJsonPointer = t.escapeJsonPointer = t.escapeFragment = t.unescapeFragment = t.schemaRefOrVal = t.schemaHasRulesButRef = t.schemaHasRules = t.checkUnknownRules = t.alwaysValidSchema = t.toHash = void 0;
	var a = require_codegen$1(), o = require_code$3();
	function s(t) {
		let a = {};
		for (let o of t) a[o] = !0;
		return a;
	}
	t.toHash = s;
	function c(t, a) {
		return typeof a == "boolean" ? a : Object.keys(a).length === 0 ? !0 : (l(t, a), !u(a, t.self.RULES.all));
	}
	t.alwaysValidSchema = c;
	function l(t, a = t.schema) {
		let { opts: o, self: s } = t;
		if (!o.strictSchema || typeof a == "boolean") return;
		let c = s.RULES.keywords;
		for (let o in a) c[o] || T(t, `unknown keyword: "${o}"`);
	}
	t.checkUnknownRules = l;
	function u(t, a) {
		if (typeof t == "boolean") return !t;
		for (let o in t) if (a[o]) return !0;
		return !1;
	}
	t.schemaHasRules = u;
	function d(t, a) {
		if (typeof t == "boolean") return !t;
		for (let o in t) if (o !== "$ref" && a.all[o]) return !0;
		return !1;
	}
	t.schemaHasRulesButRef = d;
	function f({ topSchemaRef: t, schemaPath: o }, s, c, l) {
		if (!l) {
			if (typeof s == "number" || typeof s == "boolean") return s;
			if (typeof s == "string") return (0, a._)`${s}`;
		}
		return (0, a._)`${t}${o}${(0, a.getProperty)(c)}`;
	}
	t.schemaRefOrVal = f;
	function p(t) {
		return g(decodeURIComponent(t));
	}
	t.unescapeFragment = p;
	function m(t) {
		return encodeURIComponent(h(t));
	}
	t.escapeFragment = m;
	function h(t) {
		return typeof t == "number" ? `${t}` : t.replace(/~/g, "~0").replace(/\//g, "~1");
	}
	t.escapeJsonPointer = h;
	function g(t) {
		return t.replace(/~1/g, "/").replace(/~0/g, "~");
	}
	t.unescapeJsonPointer = g;
	function _(t, a) {
		if (Array.isArray(t)) for (let o of t) a(o);
		else a(t);
	}
	t.eachItem = _;
	function v({ mergeNames: t, mergeToName: o, mergeValues: s, resultToName: c }) {
		return (l, u, d, f) => {
			let p = d === void 0 ? u : d instanceof a.Name ? (u instanceof a.Name ? t(l, u, d) : o(l, u, d), d) : u instanceof a.Name ? (o(l, d, u), u) : s(u, d);
			return f === a.Name && !(p instanceof a.Name) ? c(l, p) : p;
		};
	}
	t.mergeEvaluated = {
		props: v({
			mergeNames: (t, o, s) => t.if((0, a._)`${s} !== true && ${o} !== undefined`, () => {
				t.if((0, a._)`${o} === true`, () => t.assign(s, !0), () => t.assign(s, (0, a._)`${s} || {}`).code((0, a._)`Object.assign(${s}, ${o})`));
			}),
			mergeToName: (t, o, s) => t.if((0, a._)`${s} !== true`, () => {
				o === !0 ? t.assign(s, !0) : (t.assign(s, (0, a._)`${s} || {}`), b(t, s, o));
			}),
			mergeValues: (t, a) => t === !0 ? !0 : {
				...t,
				...a
			},
			resultToName: y
		}),
		items: v({
			mergeNames: (t, o, s) => t.if((0, a._)`${s} !== true && ${o} !== undefined`, () => t.assign(s, (0, a._)`${o} === true ? true : ${s} > ${o} ? ${s} : ${o}`)),
			mergeToName: (t, o, s) => t.if((0, a._)`${s} !== true`, () => t.assign(s, o === !0 ? !0 : (0, a._)`${s} > ${o} ? ${s} : ${o}`)),
			mergeValues: (t, a) => t === !0 ? !0 : Math.max(t, a),
			resultToName: (t, a) => t.var("items", a)
		})
	};
	function y(t, o) {
		if (o === !0) return t.var("props", !0);
		let s = t.var("props", (0, a._)`{}`);
		return o !== void 0 && b(t, s, o), s;
	}
	t.evaluatedPropsToName = y;
	function b(t, o, s) {
		Object.keys(s).forEach((s) => t.assign((0, a._)`${o}${(0, a.getProperty)(s)}`, !0));
	}
	t.setEvaluated = b;
	var x = {};
	function S(t, a) {
		return t.scopeValue("func", {
			ref: a,
			code: x[a.code] || (x[a.code] = new o._Code(a.code))
		});
	}
	t.useFunc = S;
	var C;
	(function(t) {
		t[t.Num = 0] = "Num", t[t.Str = 1] = "Str";
	})(C || (t.Type = C = {}));
	function w(t, o, s) {
		if (t instanceof a.Name) {
			let c = o === C.Num;
			return s ? c ? (0, a._)`"[" + ${t} + "]"` : (0, a._)`"['" + ${t} + "']"` : c ? (0, a._)`"/" + ${t}` : (0, a._)`"/" + ${t}.replace(/~/g, "~0").replace(/\\//g, "~1")`;
		}
		return s ? (0, a.getProperty)(t).toString() : "/" + h(t);
	}
	t.getErrorPath = w;
	function T(t, a, o = t.opts.strictSchema) {
		if (o) {
			if (a = `strict mode: ${a}`, o === !0) throw Error(a);
			t.self.logger.warn(a);
		}
	}
	t.checkStrictMode = T;
})), require_names$1 = /* @__PURE__ */ __commonJSMin(((t) => {
	Object.defineProperty(t, "__esModule", { value: !0 });
	var a = require_codegen$1();
	t.default = {
		data: new a.Name("data"),
		valCxt: new a.Name("valCxt"),
		instancePath: new a.Name("instancePath"),
		parentData: new a.Name("parentData"),
		parentDataProperty: new a.Name("parentDataProperty"),
		rootData: new a.Name("rootData"),
		dynamicAnchors: new a.Name("dynamicAnchors"),
		vErrors: new a.Name("vErrors"),
		errors: new a.Name("errors"),
		this: new a.Name("this"),
		self: new a.Name("self"),
		scope: new a.Name("scope"),
		json: new a.Name("json"),
		jsonPos: new a.Name("jsonPos"),
		jsonLen: new a.Name("jsonLen"),
		jsonPart: new a.Name("jsonPart")
	};
})), require_errors$2 = /* @__PURE__ */ __commonJSMin(((t) => {
	Object.defineProperty(t, "__esModule", { value: !0 }), t.extendErrors = t.resetErrorsCount = t.reportExtraError = t.reportError = t.keyword$DataError = t.keywordError = void 0;
	var a = require_codegen$1(), o = require_util$2(), s = require_names$1();
	t.keywordError = { message: ({ keyword: t }) => (0, a.str)`must pass "${t}" keyword validation` }, t.keyword$DataError = { message: ({ keyword: t, schemaType: o }) => o ? (0, a.str)`"${t}" keyword must be ${o} ($data)` : (0, a.str)`"${t}" keyword is invalid ($data)` };
	function c(o, s = t.keywordError, c, l) {
		let { it: u } = o, { gen: d, compositeRule: m, allErrors: g } = u, _ = h(o, s, c);
		l ?? (m || g) ? f(d, _) : p(u, (0, a._)`[${_}]`);
	}
	t.reportError = c;
	function l(a, o = t.keywordError, c) {
		let { it: l } = a, { gen: u, compositeRule: d, allErrors: m } = l;
		f(u, h(a, o, c)), d || m || p(l, s.default.vErrors);
	}
	t.reportExtraError = l;
	function u(t, o) {
		t.assign(s.default.errors, o), t.if((0, a._)`${s.default.vErrors} !== null`, () => t.if(o, () => t.assign((0, a._)`${s.default.vErrors}.length`, o), () => t.assign(s.default.vErrors, null)));
	}
	t.resetErrorsCount = u;
	function d({ gen: t, keyword: o, schemaValue: c, data: l, errsCount: u, it: d }) {
		/* istanbul ignore if */
		if (u === void 0) throw Error("ajv implementation error");
		let f = t.name("err");
		t.forRange("i", u, s.default.errors, (u) => {
			t.const(f, (0, a._)`${s.default.vErrors}[${u}]`), t.if((0, a._)`${f}.instancePath === undefined`, () => t.assign((0, a._)`${f}.instancePath`, (0, a.strConcat)(s.default.instancePath, d.errorPath))), t.assign((0, a._)`${f}.schemaPath`, (0, a.str)`${d.errSchemaPath}/${o}`), d.opts.verbose && (t.assign((0, a._)`${f}.schema`, c), t.assign((0, a._)`${f}.data`, l));
		});
	}
	t.extendErrors = d;
	function f(t, o) {
		let c = t.const("err", o);
		t.if((0, a._)`${s.default.vErrors} === null`, () => t.assign(s.default.vErrors, (0, a._)`[${c}]`), (0, a._)`${s.default.vErrors}.push(${c})`), t.code((0, a._)`${s.default.errors}++`);
	}
	function p(t, o) {
		let { gen: s, validateName: c, schemaEnv: l } = t;
		l.$async ? s.throw((0, a._)`new ${t.ValidationError}(${o})`) : (s.assign((0, a._)`${c}.errors`, o), s.return(!1));
	}
	var m = {
		keyword: new a.Name("keyword"),
		schemaPath: new a.Name("schemaPath"),
		params: new a.Name("params"),
		propertyName: new a.Name("propertyName"),
		message: new a.Name("message"),
		schema: new a.Name("schema"),
		parentSchema: new a.Name("parentSchema")
	};
	function h(t, o, s) {
		let { createErrors: c } = t.it;
		return c === !1 ? (0, a._)`{}` : g(t, o, s);
	}
	function g(t, a, o = {}) {
		let { gen: s, it: c } = t, l = [_(c, o), v(t, o)];
		return y(t, a, l), s.object(...l);
	}
	function _({ errorPath: t }, { instancePath: c }) {
		let l = c ? (0, a.str)`${t}${(0, o.getErrorPath)(c, o.Type.Str)}` : t;
		return [s.default.instancePath, (0, a.strConcat)(s.default.instancePath, l)];
	}
	function v({ keyword: t, it: { errSchemaPath: s } }, { schemaPath: c, parentSchema: l }) {
		let u = l ? s : (0, a.str)`${s}/${t}`;
		return c && (u = (0, a.str)`${u}${(0, o.getErrorPath)(c, o.Type.Str)}`), [m.schemaPath, u];
	}
	function y(t, { params: o, message: c }, l) {
		let { keyword: u, data: d, schemaValue: f, it: p } = t, { opts: h, propertyName: g, topSchemaRef: _, schemaPath: v } = p;
		l.push([m.keyword, u], [m.params, typeof o == "function" ? o(t) : o || (0, a._)`{}`]), h.messages && l.push([m.message, typeof c == "function" ? c(t) : c]), h.verbose && l.push([m.schema, f], [m.parentSchema, (0, a._)`${_}${v}`], [s.default.data, d]), g && l.push([m.propertyName, g]);
	}
})), require_boolSchema$1 = /* @__PURE__ */ __commonJSMin(((t) => {
	Object.defineProperty(t, "__esModule", { value: !0 }), t.boolOrEmptySchema = t.topBoolOrEmptySchema = void 0;
	var a = require_errors$2(), o = require_codegen$1(), s = require_names$1(), c = { message: "boolean schema is false" };
	function l(t) {
		let { gen: a, schema: c, validateName: l } = t;
		c === !1 ? d(t, !1) : typeof c == "object" && c.$async === !0 ? a.return(s.default.data) : (a.assign((0, o._)`${l}.errors`, null), a.return(!0));
	}
	t.topBoolOrEmptySchema = l;
	function u(t, a) {
		let { gen: o, schema: s } = t;
		s === !1 ? (o.var(a, !1), d(t)) : o.var(a, !0);
	}
	t.boolOrEmptySchema = u;
	function d(t, o) {
		let { gen: s, data: l } = t, u = {
			gen: s,
			keyword: "false schema",
			data: l,
			schema: !1,
			schemaCode: !1,
			schemaValue: !1,
			params: {},
			it: t
		};
		(0, a.reportError)(u, c, void 0, o);
	}
})), require_rules$1 = /* @__PURE__ */ __commonJSMin(((t) => {
	Object.defineProperty(t, "__esModule", { value: !0 }), t.getRules = t.isJSONType = void 0;
	var a = new Set([
		"string",
		"number",
		"integer",
		"boolean",
		"null",
		"object",
		"array"
	]);
	function o(t) {
		return typeof t == "string" && a.has(t);
	}
	t.isJSONType = o;
	function s() {
		let t = {
			number: {
				type: "number",
				rules: []
			},
			string: {
				type: "string",
				rules: []
			},
			array: {
				type: "array",
				rules: []
			},
			object: {
				type: "object",
				rules: []
			}
		};
		return {
			types: {
				...t,
				integer: !0,
				boolean: !0,
				null: !0
			},
			rules: [
				{ rules: [] },
				t.number,
				t.string,
				t.array,
				t.object
			],
			post: { rules: [] },
			all: {},
			keywords: {}
		};
	}
	t.getRules = s;
})), require_applicability$1 = /* @__PURE__ */ __commonJSMin(((t) => {
	Object.defineProperty(t, "__esModule", { value: !0 }), t.shouldUseRule = t.shouldUseGroup = t.schemaHasRulesForType = void 0;
	function a({ schema: t, self: a }, s) {
		let c = a.RULES.types[s];
		return c && c !== !0 && o(t, c);
	}
	t.schemaHasRulesForType = a;
	function o(t, a) {
		return a.rules.some((a) => s(t, a));
	}
	t.shouldUseGroup = o;
	function s(t, a) {
		return t[a.keyword] !== void 0 || a.definition.implements?.some((a) => t[a] !== void 0);
	}
	t.shouldUseRule = s;
})), require_dataType$1 = /* @__PURE__ */ __commonJSMin(((t) => {
	Object.defineProperty(t, "__esModule", { value: !0 }), t.reportTypeError = t.checkDataTypes = t.checkDataType = t.coerceAndCheckDataType = t.getJSONTypes = t.getSchemaTypes = t.DataType = void 0;
	var a = require_rules$1(), o = require_applicability$1(), s = require_errors$2(), c = require_codegen$1(), l = require_util$2(), u;
	(function(t) {
		t[t.Correct = 0] = "Correct", t[t.Wrong = 1] = "Wrong";
	})(u || (t.DataType = u = {}));
	function d(t) {
		let a = f(t.type);
		if (a.includes("null")) {
			if (t.nullable === !1) throw Error("type: null contradicts nullable: false");
		} else {
			if (!a.length && t.nullable !== void 0) throw Error("\"nullable\" cannot be used without \"type\"");
			t.nullable === !0 && a.push("null");
		}
		return a;
	}
	t.getSchemaTypes = d;
	function f(t) {
		let o = Array.isArray(t) ? t : t ? [t] : [];
		if (o.every(a.isJSONType)) return o;
		throw Error("type must be JSONType or JSONType[]: " + o.join(","));
	}
	t.getJSONTypes = f;
	function p(t, a) {
		let { gen: s, data: c, opts: l } = t, d = h(a, l.coerceTypes), f = a.length > 0 && !(d.length === 0 && a.length === 1 && (0, o.schemaHasRulesForType)(t, a[0]));
		if (f) {
			let o = y(a, c, l.strictNumbers, u.Wrong);
			s.if(o, () => {
				d.length ? g(t, a, d) : x(t);
			});
		}
		return f;
	}
	t.coerceAndCheckDataType = p;
	var m = new Set([
		"string",
		"number",
		"integer",
		"boolean",
		"null"
	]);
	function h(t, a) {
		return a ? t.filter((t) => m.has(t) || a === "array" && t === "array") : [];
	}
	function g(t, a, o) {
		let { gen: s, data: l, opts: u } = t, d = s.let("dataType", (0, c._)`typeof ${l}`), f = s.let("coerced", (0, c._)`undefined`);
		u.coerceTypes === "array" && s.if((0, c._)`${d} == 'object' && Array.isArray(${l}) && ${l}.length == 1`, () => s.assign(l, (0, c._)`${l}[0]`).assign(d, (0, c._)`typeof ${l}`).if(y(a, l, u.strictNumbers), () => s.assign(f, l))), s.if((0, c._)`${f} !== undefined`);
		for (let t of o) (m.has(t) || t === "array" && u.coerceTypes === "array") && p(t);
		s.else(), x(t), s.endIf(), s.if((0, c._)`${f} !== undefined`, () => {
			s.assign(l, f), _(t, f);
		});
		function p(t) {
			switch (t) {
				case "string":
					s.elseIf((0, c._)`${d} == "number" || ${d} == "boolean"`).assign(f, (0, c._)`"" + ${l}`).elseIf((0, c._)`${l} === null`).assign(f, (0, c._)`""`);
					return;
				case "number":
					s.elseIf((0, c._)`${d} == "boolean" || ${l} === null
              || (${d} == "string" && ${l} && ${l} == +${l})`).assign(f, (0, c._)`+${l}`);
					return;
				case "integer":
					s.elseIf((0, c._)`${d} === "boolean" || ${l} === null
              || (${d} === "string" && ${l} && ${l} == +${l} && !(${l} % 1))`).assign(f, (0, c._)`+${l}`);
					return;
				case "boolean":
					s.elseIf((0, c._)`${l} === "false" || ${l} === 0 || ${l} === null`).assign(f, !1).elseIf((0, c._)`${l} === "true" || ${l} === 1`).assign(f, !0);
					return;
				case "null":
					s.elseIf((0, c._)`${l} === "" || ${l} === 0 || ${l} === false`), s.assign(f, null);
					return;
				case "array": s.elseIf((0, c._)`${d} === "string" || ${d} === "number"
              || ${d} === "boolean" || ${l} === null`).assign(f, (0, c._)`[${l}]`);
			}
		}
	}
	function _({ gen: t, parentData: a, parentDataProperty: o }, s) {
		t.if((0, c._)`${a} !== undefined`, () => t.assign((0, c._)`${a}[${o}]`, s));
	}
	function v(t, a, o, s = u.Correct) {
		let l = s === u.Correct ? c.operators.EQ : c.operators.NEQ, d;
		switch (t) {
			case "null": return (0, c._)`${a} ${l} null`;
			case "array":
				d = (0, c._)`Array.isArray(${a})`;
				break;
			case "object":
				d = (0, c._)`${a} && typeof ${a} == "object" && !Array.isArray(${a})`;
				break;
			case "integer":
				d = f((0, c._)`!(${a} % 1) && !isNaN(${a})`);
				break;
			case "number":
				d = f();
				break;
			default: return (0, c._)`typeof ${a} ${l} ${t}`;
		}
		return s === u.Correct ? d : (0, c.not)(d);
		function f(t = c.nil) {
			return (0, c.and)((0, c._)`typeof ${a} == "number"`, t, o ? (0, c._)`isFinite(${a})` : c.nil);
		}
	}
	t.checkDataType = v;
	function y(t, a, o, s) {
		if (t.length === 1) return v(t[0], a, o, s);
		let u, d = (0, l.toHash)(t);
		if (d.array && d.object) {
			let t = (0, c._)`typeof ${a} != "object"`;
			u = d.null ? t : (0, c._)`!${a} || ${t}`, delete d.null, delete d.array, delete d.object;
		} else u = c.nil;
		for (let t in d.number && delete d.integer, d) u = (0, c.and)(u, v(t, a, o, s));
		return u;
	}
	t.checkDataTypes = y;
	var b = {
		message: ({ schema: t }) => `must be ${t}`,
		params: ({ schema: t, schemaValue: a }) => typeof t == "string" ? (0, c._)`{type: ${t}}` : (0, c._)`{type: ${a}}`
	};
	function x(t) {
		let a = S(t);
		(0, s.reportError)(a, b);
	}
	t.reportTypeError = x;
	function S(t) {
		let { gen: a, data: o, schema: s } = t, c = (0, l.schemaRefOrVal)(t, s, "type");
		return {
			gen: a,
			keyword: "type",
			data: o,
			schema: s.type,
			schemaCode: c,
			schemaValue: c,
			parentSchema: s,
			params: {},
			it: t
		};
	}
})), require_defaults$1 = /* @__PURE__ */ __commonJSMin(((t) => {
	Object.defineProperty(t, "__esModule", { value: !0 }), t.assignDefaults = void 0;
	var a = require_codegen$1(), o = require_util$2();
	function s(t, a) {
		let { properties: o, items: s } = t.schema;
		if (a === "object" && o) for (let a in o) c(t, a, o[a].default);
		else a === "array" && Array.isArray(s) && s.forEach((a, o) => c(t, o, a.default));
	}
	t.assignDefaults = s;
	function c(t, s, c) {
		let { gen: l, compositeRule: u, data: d, opts: f } = t;
		if (c === void 0) return;
		let p = (0, a._)`${d}${(0, a.getProperty)(s)}`;
		if (u) {
			(0, o.checkStrictMode)(t, `default is ignored for: ${p}`);
			return;
		}
		let m = (0, a._)`${p} === undefined`;
		f.useDefaults === "empty" && (m = (0, a._)`${m} || ${p} === null || ${p} === ""`), l.if(m, (0, a._)`${p} = ${(0, a.stringify)(c)}`);
	}
})), require_code$2 = /* @__PURE__ */ __commonJSMin(((t) => {
	Object.defineProperty(t, "__esModule", { value: !0 }), t.validateUnion = t.validateArray = t.usePattern = t.callValidateCode = t.schemaProperties = t.allSchemaProperties = t.noPropertyInData = t.propertyInData = t.isOwnProperty = t.hasPropFunc = t.reportMissingProp = t.checkMissingProp = t.checkReportMissingProp = void 0;
	var a = require_codegen$1(), o = require_util$2(), s = require_names$1(), c = require_util$2();
	function l(t, o) {
		let { gen: s, data: c, it: l } = t;
		s.if(h(s, c, o, l.opts.ownProperties), () => {
			t.setParams({ missingProperty: (0, a._)`${o}` }, !0), t.error();
		});
	}
	t.checkReportMissingProp = l;
	function u({ gen: t, data: o, it: { opts: s } }, c, l) {
		return (0, a.or)(...c.map((c) => (0, a.and)(h(t, o, c, s.ownProperties), (0, a._)`${l} = ${c}`)));
	}
	t.checkMissingProp = u;
	function d(t, a) {
		t.setParams({ missingProperty: a }, !0), t.error();
	}
	t.reportMissingProp = d;
	function f(t) {
		return t.scopeValue("func", {
			ref: Object.prototype.hasOwnProperty,
			code: (0, a._)`Object.prototype.hasOwnProperty`
		});
	}
	t.hasPropFunc = f;
	function p(t, o, s) {
		return (0, a._)`${f(t)}.call(${o}, ${s})`;
	}
	t.isOwnProperty = p;
	function m(t, o, s, c) {
		let l = (0, a._)`${o}${(0, a.getProperty)(s)} !== undefined`;
		return c ? (0, a._)`${l} && ${p(t, o, s)}` : l;
	}
	t.propertyInData = m;
	function h(t, o, s, c) {
		let l = (0, a._)`${o}${(0, a.getProperty)(s)} === undefined`;
		return c ? (0, a.or)(l, (0, a.not)(p(t, o, s))) : l;
	}
	t.noPropertyInData = h;
	function g(t) {
		return t ? Object.keys(t).filter((t) => t !== "__proto__") : [];
	}
	t.allSchemaProperties = g;
	function _(t, a) {
		return g(a).filter((s) => !(0, o.alwaysValidSchema)(t, a[s]));
	}
	t.schemaProperties = _;
	function v({ schemaCode: t, data: o, it: { gen: c, topSchemaRef: l, schemaPath: u, errorPath: d }, it: f }, p, m, h) {
		let g = h ? (0, a._)`${t}, ${o}, ${l}${u}` : o, _ = [
			[s.default.instancePath, (0, a.strConcat)(s.default.instancePath, d)],
			[s.default.parentData, f.parentData],
			[s.default.parentDataProperty, f.parentDataProperty],
			[s.default.rootData, s.default.rootData]
		];
		f.opts.dynamicRef && _.push([s.default.dynamicAnchors, s.default.dynamicAnchors]);
		let v = (0, a._)`${g}, ${c.object(..._)}`;
		return m === a.nil ? (0, a._)`${p}(${v})` : (0, a._)`${p}.call(${m}, ${v})`;
	}
	t.callValidateCode = v;
	var y = (0, a._)`new RegExp`;
	function b({ gen: t, it: { opts: o } }, s) {
		let l = o.unicodeRegExp ? "u" : "", { regExp: u } = o.code, d = u(s, l);
		return t.scopeValue("pattern", {
			key: d.toString(),
			ref: d,
			code: (0, a._)`${u.code === "new RegExp" ? y : (0, c.useFunc)(t, u)}(${s}, ${l})`
		});
	}
	t.usePattern = b;
	function x(t) {
		let { gen: s, data: c, keyword: l, it: u } = t, d = s.name("valid");
		if (u.allErrors) {
			let t = s.let("valid", !0);
			return f(() => s.assign(t, !1)), t;
		}
		return s.var(d, !0), f(() => s.break()), d;
		function f(u) {
			let f = s.const("len", (0, a._)`${c}.length`);
			s.forRange("i", 0, f, (c) => {
				t.subschema({
					keyword: l,
					dataProp: c,
					dataPropType: o.Type.Num
				}, d), s.if((0, a.not)(d), u);
			});
		}
	}
	t.validateArray = x;
	function S(t) {
		let { gen: s, schema: c, keyword: l, it: u } = t;
		/* istanbul ignore if */
		if (!Array.isArray(c)) throw Error("ajv implementation error");
		if (c.some((t) => (0, o.alwaysValidSchema)(u, t)) && !u.opts.unevaluated) return;
		let d = s.let("valid", !1), f = s.name("_valid");
		s.block(() => c.forEach((o, c) => {
			let u = t.subschema({
				keyword: l,
				schemaProp: c,
				compositeRule: !0
			}, f);
			s.assign(d, (0, a._)`${d} || ${f}`), t.mergeValidEvaluated(u, f) || s.if((0, a.not)(d));
		})), t.result(d, () => t.reset(), () => t.error(!0));
	}
	t.validateUnion = S;
})), require_keyword$1 = /* @__PURE__ */ __commonJSMin(((t) => {
	Object.defineProperty(t, "__esModule", { value: !0 }), t.validateKeywordUsage = t.validSchemaType = t.funcKeywordCode = t.macroKeywordCode = void 0;
	var a = require_codegen$1(), o = require_names$1(), s = require_code$2(), c = require_errors$2();
	function l(t, o) {
		let { gen: s, keyword: c, schema: l, parentSchema: u, it: d } = t, f = o.macro.call(d.self, l, u, d), p = m(s, c, f);
		d.opts.validateSchema !== !1 && d.self.validateSchema(f, !0);
		let h = s.name("valid");
		t.subschema({
			schema: f,
			schemaPath: a.nil,
			errSchemaPath: `${d.errSchemaPath}/${c}`,
			topSchemaRef: p,
			compositeRule: !0
		}, h), t.pass(h, () => t.error(!0));
	}
	t.macroKeywordCode = l;
	function u(t, c) {
		let { gen: l, keyword: u, schema: h, parentSchema: g, $data: _, it: v } = t;
		p(v, c);
		let y = m(l, u, !_ && c.compile ? c.compile.call(v.self, h, g, v) : c.validate), b = l.let("valid");
		t.block$data(b, x), t.ok(c.valid ?? b);
		function x() {
			if (c.errors === !1) w(), c.modifying && d(t), T(() => t.error());
			else {
				let a = c.async ? S() : C();
				c.modifying && d(t), T(() => f(t, a));
			}
		}
		function S() {
			let t = l.let("ruleErrs", null);
			return l.try(() => w((0, a._)`await `), (o) => l.assign(b, !1).if((0, a._)`${o} instanceof ${v.ValidationError}`, () => l.assign(t, (0, a._)`${o}.errors`), () => l.throw(o))), t;
		}
		function C() {
			let t = (0, a._)`${y}.errors`;
			return l.assign(t, null), w(a.nil), t;
		}
		function w(u = c.async ? (0, a._)`await ` : a.nil) {
			let d = v.opts.passContext ? o.default.this : o.default.self, f = !("compile" in c && !_ || c.schema === !1);
			l.assign(b, (0, a._)`${u}${(0, s.callValidateCode)(t, y, d, f)}`, c.modifying);
		}
		function T(t) {
			l.if((0, a.not)(c.valid ?? b), t);
		}
	}
	t.funcKeywordCode = u;
	function d(t) {
		let { gen: o, data: s, it: c } = t;
		o.if(c.parentData, () => o.assign(s, (0, a._)`${c.parentData}[${c.parentDataProperty}]`));
	}
	function f(t, s) {
		let { gen: l } = t;
		l.if((0, a._)`Array.isArray(${s})`, () => {
			l.assign(o.default.vErrors, (0, a._)`${o.default.vErrors} === null ? ${s} : ${o.default.vErrors}.concat(${s})`).assign(o.default.errors, (0, a._)`${o.default.vErrors}.length`), (0, c.extendErrors)(t);
		}, () => t.error());
	}
	function p({ schemaEnv: t }, a) {
		if (a.async && !t.$async) throw Error("async keyword in sync schema");
	}
	function m(t, o, s) {
		if (s === void 0) throw Error(`keyword "${o}" failed to compile`);
		return t.scopeValue("keyword", typeof s == "function" ? { ref: s } : {
			ref: s,
			code: (0, a.stringify)(s)
		});
	}
	function h(t, a, o = !1) {
		return !a.length || a.some((a) => a === "array" ? Array.isArray(t) : a === "object" ? t && typeof t == "object" && !Array.isArray(t) : typeof t == a || o && t === void 0);
	}
	t.validSchemaType = h;
	function g({ schema: t, opts: a, self: o, errSchemaPath: s }, c, l) {
		/* istanbul ignore if */
		if (Array.isArray(c.keyword) ? !c.keyword.includes(l) : c.keyword !== l) throw Error("ajv implementation error");
		let u = c.dependencies;
		if (u?.some((a) => !Object.prototype.hasOwnProperty.call(t, a))) throw Error(`parent schema must have dependencies of ${l}: ${u.join(",")}`);
		if (c.validateSchema && !c.validateSchema(t[l])) {
			let t = `keyword "${l}" value is invalid at path "${s}": ` + o.errorsText(c.validateSchema.errors);
			if (a.validateSchema === "log") o.logger.error(t);
			else throw Error(t);
		}
	}
	t.validateKeywordUsage = g;
})), require_subschema$1 = /* @__PURE__ */ __commonJSMin(((t) => {
	Object.defineProperty(t, "__esModule", { value: !0 }), t.extendSubschemaMode = t.extendSubschemaData = t.getSubschema = void 0;
	var a = require_codegen$1(), o = require_util$2();
	function s(t, { keyword: s, schemaProp: c, schema: l, schemaPath: u, errSchemaPath: d, topSchemaRef: f }) {
		if (s !== void 0 && l !== void 0) throw Error("both \"keyword\" and \"schema\" passed, only one allowed");
		if (s !== void 0) {
			let l = t.schema[s];
			return c === void 0 ? {
				schema: l,
				schemaPath: (0, a._)`${t.schemaPath}${(0, a.getProperty)(s)}`,
				errSchemaPath: `${t.errSchemaPath}/${s}`
			} : {
				schema: l[c],
				schemaPath: (0, a._)`${t.schemaPath}${(0, a.getProperty)(s)}${(0, a.getProperty)(c)}`,
				errSchemaPath: `${t.errSchemaPath}/${s}/${(0, o.escapeFragment)(c)}`
			};
		}
		if (l !== void 0) {
			if (u === void 0 || d === void 0 || f === void 0) throw Error("\"schemaPath\", \"errSchemaPath\" and \"topSchemaRef\" are required with \"schema\"");
			return {
				schema: l,
				schemaPath: u,
				topSchemaRef: f,
				errSchemaPath: d
			};
		}
		throw Error("either \"keyword\" or \"schema\" must be passed");
	}
	t.getSubschema = s;
	function c(t, s, { dataProp: c, dataPropType: l, data: u, dataTypes: d, propertyName: f }) {
		if (u !== void 0 && c !== void 0) throw Error("both \"data\" and \"dataProp\" passed, only one allowed");
		let { gen: p } = s;
		if (c !== void 0) {
			let { errorPath: u, dataPathArr: d, opts: f } = s;
			m(p.let("data", (0, a._)`${s.data}${(0, a.getProperty)(c)}`, !0)), t.errorPath = (0, a.str)`${u}${(0, o.getErrorPath)(c, l, f.jsPropertySyntax)}`, t.parentDataProperty = (0, a._)`${c}`, t.dataPathArr = [...d, t.parentDataProperty];
		}
		u !== void 0 && (m(u instanceof a.Name ? u : p.let("data", u, !0)), f !== void 0 && (t.propertyName = f)), d && (t.dataTypes = d);
		function m(a) {
			t.data = a, t.dataLevel = s.dataLevel + 1, t.dataTypes = [], s.definedProperties = /* @__PURE__ */ new Set(), t.parentData = s.data, t.dataNames = [...s.dataNames, a];
		}
	}
	t.extendSubschemaData = c;
	function l(t, { jtdDiscriminator: a, jtdMetadata: o, compositeRule: s, createErrors: c, allErrors: l }) {
		s !== void 0 && (t.compositeRule = s), c !== void 0 && (t.createErrors = c), l !== void 0 && (t.allErrors = l), t.jtdDiscriminator = a, t.jtdMetadata = o;
	}
	t.extendSubschemaMode = l;
})), require_fast_deep_equal = /* @__PURE__ */ __commonJSMin(((t, a) => {
	a.exports = function t(a, o) {
		if (a === o) return !0;
		if (a && o && typeof a == "object" && typeof o == "object") {
			if (a.constructor !== o.constructor) return !1;
			var s, c, l;
			if (Array.isArray(a)) {
				if (s = a.length, s != o.length) return !1;
				for (c = s; c-- !== 0;) if (!t(a[c], o[c])) return !1;
				return !0;
			}
			if (a.constructor === RegExp) return a.source === o.source && a.flags === o.flags;
			if (a.valueOf !== Object.prototype.valueOf) return a.valueOf() === o.valueOf();
			if (a.toString !== Object.prototype.toString) return a.toString() === o.toString();
			if (l = Object.keys(a), s = l.length, s !== Object.keys(o).length) return !1;
			for (c = s; c-- !== 0;) if (!Object.prototype.hasOwnProperty.call(o, l[c])) return !1;
			for (c = s; c-- !== 0;) {
				var u = l[c];
				if (!t(a[u], o[u])) return !1;
			}
			return !0;
		}
		return a !== a && o !== o;
	};
})), require_json_schema_traverse$1 = /* @__PURE__ */ __commonJSMin(((t, a) => {
	var o = a.exports = function(t, a, o) {
		typeof a == "function" && (o = a, a = {}), o = a.cb || o;
		var c = typeof o == "function" ? o : o.pre || function() {}, l = o.post || function() {};
		s(a, c, l, t, "", t);
	};
	o.keywords = {
		additionalItems: !0,
		items: !0,
		contains: !0,
		additionalProperties: !0,
		propertyNames: !0,
		not: !0,
		if: !0,
		then: !0,
		else: !0
	}, o.arrayKeywords = {
		items: !0,
		allOf: !0,
		anyOf: !0,
		oneOf: !0
	}, o.propsKeywords = {
		$defs: !0,
		definitions: !0,
		properties: !0,
		patternProperties: !0,
		dependencies: !0
	}, o.skipKeywords = {
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
	function s(t, a, l, u, d, f, p, m, h, g) {
		if (u && typeof u == "object" && !Array.isArray(u)) {
			for (var _ in a(u, d, f, p, m, h, g), u) {
				var v = u[_];
				if (Array.isArray(v)) {
					if (_ in o.arrayKeywords) for (var y = 0; y < v.length; y++) s(t, a, l, v[y], d + "/" + _ + "/" + y, f, d, _, u, y);
				} else if (_ in o.propsKeywords) {
					if (v && typeof v == "object") for (var b in v) s(t, a, l, v[b], d + "/" + _ + "/" + c(b), f, d, _, u, b);
				} else (_ in o.keywords || t.allKeys && !(_ in o.skipKeywords)) && s(t, a, l, v, d + "/" + _, f, d, _, u);
			}
			l(u, d, f, p, m, h, g);
		}
	}
	function c(t) {
		return t.replace(/~/g, "~0").replace(/\//g, "~1");
	}
})), require_resolve$1 = /* @__PURE__ */ __commonJSMin(((t) => {
	Object.defineProperty(t, "__esModule", { value: !0 }), t.getSchemaRefs = t.resolveUrl = t.normalizeId = t._getFullPath = t.getFullPath = t.inlineRef = void 0;
	var a = require_util$2(), o = require_fast_deep_equal(), s = require_json_schema_traverse$1(), c = new Set([
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
	function l(t, a = !0) {
		return typeof t == "boolean" ? !0 : a === !0 ? !d(t) : a ? f(t) <= a : !1;
	}
	t.inlineRef = l;
	var u = new Set([
		"$ref",
		"$recursiveRef",
		"$recursiveAnchor",
		"$dynamicRef",
		"$dynamicAnchor"
	]);
	function d(t) {
		for (let a in t) {
			if (u.has(a)) return !0;
			let o = t[a];
			if (Array.isArray(o) && o.some(d) || typeof o == "object" && d(o)) return !0;
		}
		return !1;
	}
	function f(t) {
		let o = 0;
		for (let s in t) if (s === "$ref" || (o++, !c.has(s) && (typeof t[s] == "object" && (0, a.eachItem)(t[s], (t) => o += f(t)), o === Infinity))) return Infinity;
		return o;
	}
	function p(t, a = "", o) {
		return o !== !1 && (a = g(a)), m(t, t.parse(a));
	}
	t.getFullPath = p;
	function m(t, a) {
		return t.serialize(a).split("#")[0] + "#";
	}
	t._getFullPath = m;
	var h = /#\/?$/;
	function g(t) {
		return t ? t.replace(h, "") : "";
	}
	t.normalizeId = g;
	function _(t, a, o) {
		return o = g(o), t.resolve(a, o);
	}
	t.resolveUrl = _;
	var v = /^[a-z_][-a-z0-9._]*$/i;
	function y(t, a) {
		if (typeof t == "boolean") return {};
		let { schemaId: c, uriResolver: l } = this.opts, u = g(t[c] || a), d = { "": u }, f = p(l, u, !1), m = {}, h = /* @__PURE__ */ new Set();
		return s(t, { allKeys: !0 }, (t, a, o, s) => {
			if (s === void 0) return;
			let l = f + a, u = d[s];
			typeof t[c] == "string" && (u = p.call(this, t[c])), b.call(this, t.$anchor), b.call(this, t.$dynamicAnchor), d[a] = u;
			function p(a) {
				let o = this.opts.uriResolver.resolve;
				if (a = g(u ? o(u, a) : a), h.has(a)) throw y(a);
				h.add(a);
				let s = this.refs[a];
				return typeof s == "string" && (s = this.refs[s]), typeof s == "object" ? _(t, s.schema, a) : a !== g(l) && (a[0] === "#" ? (_(t, m[a], a), m[a] = t) : this.refs[a] = l), a;
			}
			function b(t) {
				if (typeof t == "string") {
					if (!v.test(t)) throw Error(`invalid anchor "${t}"`);
					p.call(this, `#${t}`);
				}
			}
		}), m;
		function _(t, a, s) {
			if (a !== void 0 && !o(t, a)) throw y(s);
		}
		function y(t) {
			return /* @__PURE__ */ Error(`reference "${t}" resolves to more than one schema`);
		}
	}
	t.getSchemaRefs = y;
})), require_validate$1 = /* @__PURE__ */ __commonJSMin(((t) => {
	Object.defineProperty(t, "__esModule", { value: !0 }), t.getData = t.KeywordCxt = t.validateFunctionCode = void 0;
	var a = require_boolSchema$1(), o = require_dataType$1(), s = require_applicability$1(), c = require_dataType$1(), l = require_defaults$1(), u = require_keyword$1(), d = require_subschema$1(), f = require_codegen$1(), p = require_names$1(), m = require_resolve$1(), h = require_util$2(), g = require_errors$2();
	function _(t) {
		if (E(t) && (O(t), T(t))) {
			x(t);
			return;
		}
		v(t, () => (0, a.topBoolOrEmptySchema)(t));
	}
	t.validateFunctionCode = _;
	function v({ gen: t, validateName: a, schema: o, schemaEnv: s, opts: c }, l) {
		c.code.es5 ? t.func(a, (0, f._)`${p.default.data}, ${p.default.valCxt}`, s.$async, () => {
			t.code((0, f._)`"use strict"; ${C(o, c)}`), b(t, c), t.code(l);
		}) : t.func(a, (0, f._)`${p.default.data}, ${y(c)}`, s.$async, () => t.code(C(o, c)).code(l));
	}
	function y(t) {
		return (0, f._)`{${p.default.instancePath}="", ${p.default.parentData}, ${p.default.parentDataProperty}, ${p.default.rootData}=${p.default.data}${t.dynamicRef ? (0, f._)`, ${p.default.dynamicAnchors}={}` : f.nil}}={}`;
	}
	function b(t, a) {
		t.if(p.default.valCxt, () => {
			t.var(p.default.instancePath, (0, f._)`${p.default.valCxt}.${p.default.instancePath}`), t.var(p.default.parentData, (0, f._)`${p.default.valCxt}.${p.default.parentData}`), t.var(p.default.parentDataProperty, (0, f._)`${p.default.valCxt}.${p.default.parentDataProperty}`), t.var(p.default.rootData, (0, f._)`${p.default.valCxt}.${p.default.rootData}`), a.dynamicRef && t.var(p.default.dynamicAnchors, (0, f._)`${p.default.valCxt}.${p.default.dynamicAnchors}`);
		}, () => {
			t.var(p.default.instancePath, (0, f._)`""`), t.var(p.default.parentData, (0, f._)`undefined`), t.var(p.default.parentDataProperty, (0, f._)`undefined`), t.var(p.default.rootData, p.default.data), a.dynamicRef && t.var(p.default.dynamicAnchors, (0, f._)`{}`);
		});
	}
	function x(t) {
		let { schema: a, opts: o, gen: s } = t;
		v(t, () => {
			o.$comment && a.$comment && P(t), j(t), s.let(p.default.vErrors, null), s.let(p.default.errors, 0), o.unevaluated && S(t), k(t), F(t);
		});
	}
	function S(t) {
		let { gen: a, validateName: o } = t;
		t.evaluated = a.const("evaluated", (0, f._)`${o}.evaluated`), a.if((0, f._)`${t.evaluated}.dynamicProps`, () => a.assign((0, f._)`${t.evaluated}.props`, (0, f._)`undefined`)), a.if((0, f._)`${t.evaluated}.dynamicItems`, () => a.assign((0, f._)`${t.evaluated}.items`, (0, f._)`undefined`));
	}
	function C(t, a) {
		let o = typeof t == "object" && t[a.schemaId];
		return o && (a.code.source || a.code.process) ? (0, f._)`/*# sourceURL=${o} */` : f.nil;
	}
	function w(t, o) {
		if (E(t) && (O(t), T(t))) {
			D(t, o);
			return;
		}
		(0, a.boolOrEmptySchema)(t, o);
	}
	function T({ schema: t, self: a }) {
		if (typeof t == "boolean") return !t;
		for (let o in t) if (a.RULES.all[o]) return !0;
		return !1;
	}
	function E(t) {
		return typeof t.schema != "boolean";
	}
	function D(t, a) {
		let { schema: o, gen: s, opts: c } = t;
		c.$comment && o.$comment && P(t), M(t), N(t);
		let l = s.const("_errs", p.default.errors);
		k(t, l), s.var(a, (0, f._)`${l} === ${p.default.errors}`);
	}
	function O(t) {
		(0, h.checkUnknownRules)(t), A(t);
	}
	function k(t, a) {
		if (t.opts.jtd) return L(t, [], !1, a);
		let s = (0, o.getSchemaTypes)(t.schema);
		L(t, s, !(0, o.coerceAndCheckDataType)(t, s), a);
	}
	function A(t) {
		let { schema: a, errSchemaPath: o, opts: s, self: c } = t;
		a.$ref && s.ignoreKeywordsWithRef && (0, h.schemaHasRulesButRef)(a, c.RULES) && c.logger.warn(`$ref: keywords ignored in schema at path "${o}"`);
	}
	function j(t) {
		let { schema: a, opts: o } = t;
		a.default !== void 0 && o.useDefaults && o.strictSchema && (0, h.checkStrictMode)(t, "default is ignored in the schema root");
	}
	function M(t) {
		let a = t.schema[t.opts.schemaId];
		a && (t.baseId = (0, m.resolveUrl)(t.opts.uriResolver, t.baseId, a));
	}
	function N(t) {
		if (t.schema.$async && !t.schemaEnv.$async) throw Error("async schema in sync schema");
	}
	function P({ gen: t, schemaEnv: a, schema: o, errSchemaPath: s, opts: c }) {
		let l = o.$comment;
		if (c.$comment === !0) t.code((0, f._)`${p.default.self}.logger.log(${l})`);
		else if (typeof c.$comment == "function") {
			let o = (0, f.str)`${s}/$comment`, c = t.scopeValue("root", { ref: a.root });
			t.code((0, f._)`${p.default.self}.opts.$comment(${l}, ${o}, ${c}.schema)`);
		}
	}
	function F(t) {
		let { gen: a, schemaEnv: o, validateName: s, ValidationError: c, opts: l } = t;
		o.$async ? a.if((0, f._)`${p.default.errors} === 0`, () => a.return(p.default.data), () => a.throw((0, f._)`new ${c}(${p.default.vErrors})`)) : (a.assign((0, f._)`${s}.errors`, p.default.vErrors), l.unevaluated && I(t), a.return((0, f._)`${p.default.errors} === 0`));
	}
	function I({ gen: t, evaluated: a, props: o, items: s }) {
		o instanceof f.Name && t.assign((0, f._)`${a}.props`, o), s instanceof f.Name && t.assign((0, f._)`${a}.items`, s);
	}
	function L(t, a, o, l) {
		let { gen: u, schema: d, data: m, allErrors: g, opts: _, self: v } = t, { RULES: y } = v;
		if (d.$ref && (_.ignoreKeywordsWithRef || !(0, h.schemaHasRulesButRef)(d, y))) {
			u.block(() => J(t, "$ref", y.all.$ref.definition));
			return;
		}
		_.jtd || z(t, a), u.block(() => {
			for (let t of y.rules) b(t);
			b(y.post);
		});
		function b(h) {
			(0, s.shouldUseGroup)(d, h) && (h.type ? (u.if((0, c.checkDataType)(h.type, m, _.strictNumbers)), R(t, h), a.length === 1 && a[0] === h.type && o && (u.else(), (0, c.reportTypeError)(t)), u.endIf()) : R(t, h), g || u.if((0, f._)`${p.default.errors} === ${l || 0}`));
		}
	}
	function R(t, a) {
		let { gen: o, schema: c, opts: { useDefaults: u } } = t;
		u && (0, l.assignDefaults)(t, a.type), o.block(() => {
			for (let o of a.rules) (0, s.shouldUseRule)(c, o) && J(t, o.keyword, o.definition, a.type);
		});
	}
	function z(t, a) {
		t.schemaEnv.meta || !t.opts.strictTypes || (B(t, a), t.opts.allowUnionTypes || V(t, a), H(t, t.dataTypes));
	}
	function B(t, a) {
		if (a.length) {
			if (!t.dataTypes.length) {
				t.dataTypes = a;
				return;
			}
			a.forEach((a) => {
				W(t.dataTypes, a) || K(t, `type "${a}" not allowed by context "${t.dataTypes.join(",")}"`);
			}), G(t, a);
		}
	}
	function V(t, a) {
		a.length > 1 && !(a.length === 2 && a.includes("null")) && K(t, "use allowUnionTypes to allow union type keyword");
	}
	function H(t, a) {
		let o = t.self.RULES.all;
		for (let c in o) {
			let l = o[c];
			if (typeof l == "object" && (0, s.shouldUseRule)(t.schema, l)) {
				let { type: o } = l.definition;
				o.length && !o.some((t) => U(a, t)) && K(t, `missing type "${o.join(",")}" for keyword "${c}"`);
			}
		}
	}
	function U(t, a) {
		return t.includes(a) || a === "number" && t.includes("integer");
	}
	function W(t, a) {
		return t.includes(a) || a === "integer" && t.includes("number");
	}
	function G(t, a) {
		let o = [];
		for (let s of t.dataTypes) W(a, s) ? o.push(s) : a.includes("integer") && s === "number" && o.push("integer");
		t.dataTypes = o;
	}
	function K(t, a) {
		let o = t.schemaEnv.baseId + t.errSchemaPath;
		a += ` at "${o}" (strictTypes)`, (0, h.checkStrictMode)(t, a, t.opts.strictTypes);
	}
	var q = class {
		constructor(t, a, o) {
			if ((0, u.validateKeywordUsage)(t, a, o), this.gen = t.gen, this.allErrors = t.allErrors, this.keyword = o, this.data = t.data, this.schema = t.schema[o], this.$data = a.$data && t.opts.$data && this.schema && this.schema.$data, this.schemaValue = (0, h.schemaRefOrVal)(t, this.schema, o, this.$data), this.schemaType = a.schemaType, this.parentSchema = t.schema, this.params = {}, this.it = t, this.def = a, this.$data) this.schemaCode = t.gen.const("vSchema", Z(this.$data, t));
			else if (this.schemaCode = this.schemaValue, !(0, u.validSchemaType)(this.schema, a.schemaType, a.allowUndefined)) throw Error(`${o} value must be ${JSON.stringify(a.schemaType)}`);
			("code" in a ? a.trackErrors : a.errors !== !1) && (this.errsCount = t.gen.const("_errs", p.default.errors));
		}
		result(t, a, o) {
			this.failResult((0, f.not)(t), a, o);
		}
		failResult(t, a, o) {
			this.gen.if(t), o ? o() : this.error(), a ? (this.gen.else(), a(), this.allErrors && this.gen.endIf()) : this.allErrors ? this.gen.endIf() : this.gen.else();
		}
		pass(t, a) {
			this.failResult((0, f.not)(t), void 0, a);
		}
		fail(t) {
			if (t === void 0) {
				this.error(), this.allErrors || this.gen.if(!1);
				return;
			}
			this.gen.if(t), this.error(), this.allErrors ? this.gen.endIf() : this.gen.else();
		}
		fail$data(t) {
			if (!this.$data) return this.fail(t);
			let { schemaCode: a } = this;
			this.fail((0, f._)`${a} !== undefined && (${(0, f.or)(this.invalid$data(), t)})`);
		}
		error(t, a, o) {
			if (a) {
				this.setParams(a), this._error(t, o), this.setParams({});
				return;
			}
			this._error(t, o);
		}
		_error(t, a) {
			(t ? g.reportExtraError : g.reportError)(this, this.def.error, a);
		}
		$dataError() {
			(0, g.reportError)(this, this.def.$dataError || g.keyword$DataError);
		}
		reset() {
			if (this.errsCount === void 0) throw Error("add \"trackErrors\" to keyword definition");
			(0, g.resetErrorsCount)(this.gen, this.errsCount);
		}
		ok(t) {
			this.allErrors || this.gen.if(t);
		}
		setParams(t, a) {
			a ? Object.assign(this.params, t) : this.params = t;
		}
		block$data(t, a, o = f.nil) {
			this.gen.block(() => {
				this.check$data(t, o), a();
			});
		}
		check$data(t = f.nil, a = f.nil) {
			if (!this.$data) return;
			let { gen: o, schemaCode: s, schemaType: c, def: l } = this;
			o.if((0, f.or)((0, f._)`${s} === undefined`, a)), t !== f.nil && o.assign(t, !0), (c.length || l.validateSchema) && (o.elseIf(this.invalid$data()), this.$dataError(), t !== f.nil && o.assign(t, !1)), o.else();
		}
		invalid$data() {
			let { gen: t, schemaCode: a, schemaType: o, def: s, it: l } = this;
			return (0, f.or)(u(), d());
			function u() {
				if (o.length) {
					/* istanbul ignore if */
					if (!(a instanceof f.Name)) throw Error("ajv implementation error");
					let t = Array.isArray(o) ? o : [o];
					return (0, f._)`${(0, c.checkDataTypes)(t, a, l.opts.strictNumbers, c.DataType.Wrong)}`;
				}
				return f.nil;
			}
			function d() {
				if (s.validateSchema) {
					let o = t.scopeValue("validate$data", { ref: s.validateSchema });
					return (0, f._)`!${o}(${a})`;
				}
				return f.nil;
			}
		}
		subschema(t, a) {
			let o = (0, d.getSubschema)(this.it, t);
			(0, d.extendSubschemaData)(o, this.it, t), (0, d.extendSubschemaMode)(o, t);
			let s = {
				...this.it,
				...o,
				items: void 0,
				props: void 0
			};
			return w(s, a), s;
		}
		mergeEvaluated(t, a) {
			let { it: o, gen: s } = this;
			o.opts.unevaluated && (o.props !== !0 && t.props !== void 0 && (o.props = h.mergeEvaluated.props(s, t.props, o.props, a)), o.items !== !0 && t.items !== void 0 && (o.items = h.mergeEvaluated.items(s, t.items, o.items, a)));
		}
		mergeValidEvaluated(t, a) {
			let { it: o, gen: s } = this;
			if (o.opts.unevaluated && (o.props !== !0 || o.items !== !0)) return s.if(a, () => this.mergeEvaluated(t, f.Name)), !0;
		}
	};
	t.KeywordCxt = q;
	function J(t, a, o, s) {
		let c = new q(t, o, a);
		"code" in o ? o.code(c, s) : c.$data && o.validate ? (0, u.funcKeywordCode)(c, o) : "macro" in o ? (0, u.macroKeywordCode)(c, o) : (o.compile || o.validate) && (0, u.funcKeywordCode)(c, o);
	}
	var Y = /^\/(?:[^~]|~0|~1)*$/, X = /^([0-9]+)(#|\/(?:[^~]|~0|~1)*)?$/;
	function Z(t, { dataLevel: a, dataNames: o, dataPathArr: s }) {
		let c, l;
		if (t === "") return p.default.rootData;
		if (t[0] === "/") {
			if (!Y.test(t)) throw Error(`Invalid JSON-pointer: ${t}`);
			c = t, l = p.default.rootData;
		} else {
			let u = X.exec(t);
			if (!u) throw Error(`Invalid JSON-pointer: ${t}`);
			let d = +u[1];
			if (c = u[2], c === "#") {
				if (d >= a) throw Error(m("property/index", d));
				return s[a - d];
			}
			if (d > a) throw Error(m("data", d));
			if (l = o[a - d], !c) return l;
		}
		let u = l, d = c.split("/");
		for (let t of d) t && (l = (0, f._)`${l}${(0, f.getProperty)((0, h.unescapeJsonPointer)(t))}`, u = (0, f._)`${u} && ${l}`);
		return u;
		function m(t, o) {
			return `Cannot access ${t} ${o} levels up, current level is ${a}`;
		}
	}
	t.getData = Z;
})), require_validation_error$1 = /* @__PURE__ */ __commonJSMin(((t) => {
	Object.defineProperty(t, "__esModule", { value: !0 }), t.default = class extends Error {
		constructor(t) {
			super("validation failed"), this.errors = t, this.ajv = this.validation = !0;
		}
	};
})), require_ref_error$1 = /* @__PURE__ */ __commonJSMin(((t) => {
	Object.defineProperty(t, "__esModule", { value: !0 });
	var a = require_resolve$1();
	t.default = class extends Error {
		constructor(t, o, s, c) {
			super(c || `can't resolve reference ${s} from id ${o}`), this.missingRef = (0, a.resolveUrl)(t, o, s), this.missingSchema = (0, a.normalizeId)((0, a.getFullPath)(t, this.missingRef));
		}
	};
})), require_compile$1 = /* @__PURE__ */ __commonJSMin(((t) => {
	Object.defineProperty(t, "__esModule", { value: !0 }), t.resolveSchema = t.getCompilingSchema = t.resolveRef = t.compileSchema = t.SchemaEnv = void 0;
	var a = require_codegen$1(), o = require_validation_error$1(), s = require_names$1(), c = require_resolve$1(), l = require_util$2(), u = require_validate$1(), d = class {
		constructor(t) {
			this.refs = {}, this.dynamicAnchors = {};
			let a;
			typeof t.schema == "object" && (a = t.schema), this.schema = t.schema, this.schemaId = t.schemaId, this.root = t.root || this, this.baseId = t.baseId ?? (0, c.normalizeId)(a?.[t.schemaId || "$id"]), this.schemaPath = t.schemaPath, this.localRefs = t.localRefs, this.meta = t.meta, this.$async = a?.$async, this.refs = {};
		}
	};
	t.SchemaEnv = d;
	function f(t) {
		let l = h.call(this, t);
		if (l) return l;
		let d = (0, c.getFullPath)(this.opts.uriResolver, t.root.baseId), { es5: f, lines: p } = this.opts.code, { ownProperties: m } = this.opts, g = new a.CodeGen(this.scope, {
			es5: f,
			lines: p,
			ownProperties: m
		}), _;
		t.$async && (_ = g.scopeValue("Error", {
			ref: o.default,
			code: (0, a._)`require("ajv/dist/runtime/validation_error").default`
		}));
		let v = g.scopeName("validate");
		t.validateName = v;
		let y = {
			gen: g,
			allErrors: this.opts.allErrors,
			data: s.default.data,
			parentData: s.default.parentData,
			parentDataProperty: s.default.parentDataProperty,
			dataNames: [s.default.data],
			dataPathArr: [a.nil],
			dataLevel: 0,
			dataTypes: [],
			definedProperties: /* @__PURE__ */ new Set(),
			topSchemaRef: g.scopeValue("schema", this.opts.code.source === !0 ? {
				ref: t.schema,
				code: (0, a.stringify)(t.schema)
			} : { ref: t.schema }),
			validateName: v,
			ValidationError: _,
			schema: t.schema,
			schemaEnv: t,
			rootId: d,
			baseId: t.baseId || d,
			schemaPath: a.nil,
			errSchemaPath: t.schemaPath || (this.opts.jtd ? "" : "#"),
			errorPath: (0, a._)`""`,
			opts: this.opts,
			self: this
		}, b;
		try {
			this._compilations.add(t), (0, u.validateFunctionCode)(y), g.optimize(this.opts.code.optimize);
			let o = g.toString();
			b = `${g.scopeRefs(s.default.scope)}return ${o}`, this.opts.code.process && (b = this.opts.code.process(b, t));
			let c = Function(`${s.default.self}`, `${s.default.scope}`, b)(this, this.scope.get());
			if (this.scope.value(v, { ref: c }), c.errors = null, c.schema = t.schema, c.schemaEnv = t, t.$async && (c.$async = !0), this.opts.code.source === !0 && (c.source = {
				validateName: v,
				validateCode: o,
				scopeValues: g._values
			}), this.opts.unevaluated) {
				let { props: t, items: o } = y;
				c.evaluated = {
					props: t instanceof a.Name ? void 0 : t,
					items: o instanceof a.Name ? void 0 : o,
					dynamicProps: t instanceof a.Name,
					dynamicItems: o instanceof a.Name
				}, c.source && (c.source.evaluated = (0, a.stringify)(c.evaluated));
			}
			return t.validate = c, t;
		} catch (a) {
			throw delete t.validate, delete t.validateName, b && this.logger.error("Error compiling schema, function code:", b), a;
		} finally {
			this._compilations.delete(t);
		}
	}
	t.compileSchema = f;
	function p(t, a, o) {
		o = (0, c.resolveUrl)(this.opts.uriResolver, a, o);
		let s = t.refs[o];
		if (s) return s;
		let l = _.call(this, t, o);
		if (l === void 0) {
			let s = t.localRefs?.[o], { schemaId: c } = this.opts;
			s && (l = new d({
				schema: s,
				schemaId: c,
				root: t,
				baseId: a
			}));
		}
		if (l !== void 0) return t.refs[o] = m.call(this, l);
	}
	t.resolveRef = p;
	function m(t) {
		return (0, c.inlineRef)(t.schema, this.opts.inlineRefs) ? t.schema : t.validate ? t : f.call(this, t);
	}
	function h(t) {
		for (let a of this._compilations) if (g(a, t)) return a;
	}
	t.getCompilingSchema = h;
	function g(t, a) {
		return t.schema === a.schema && t.root === a.root && t.baseId === a.baseId;
	}
	function _(t, a) {
		let o;
		for (; typeof (o = this.refs[a]) == "string";) a = o;
		return o || this.schemas[a] || v.call(this, t, a);
	}
	function v(t, a) {
		let o = this.opts.uriResolver.parse(a), s = (0, c._getFullPath)(this.opts.uriResolver, o), l = (0, c.getFullPath)(this.opts.uriResolver, t.baseId, void 0);
		if (Object.keys(t.schema).length > 0 && s === l) return b.call(this, o, t);
		let u = (0, c.normalizeId)(s), p = this.refs[u] || this.schemas[u];
		if (typeof p == "string") {
			let a = v.call(this, t, p);
			return typeof a?.schema == "object" ? b.call(this, o, a) : void 0;
		}
		if (typeof p?.schema == "object") {
			if (p.validate || f.call(this, p), u === (0, c.normalizeId)(a)) {
				let { schema: a } = p, { schemaId: o } = this.opts, s = a[o];
				return s && (l = (0, c.resolveUrl)(this.opts.uriResolver, l, s)), new d({
					schema: a,
					schemaId: o,
					root: t,
					baseId: l
				});
			}
			return b.call(this, o, p);
		}
	}
	t.resolveSchema = v;
	var y = new Set([
		"properties",
		"patternProperties",
		"enum",
		"dependencies",
		"definitions"
	]);
	function b(t, { baseId: a, schema: o, root: s }) {
		if (t.fragment?.[0] !== "/") return;
		for (let s of t.fragment.slice(1).split("/")) {
			if (typeof o == "boolean") return;
			let t = o[(0, l.unescapeFragment)(s)];
			if (t === void 0) return;
			o = t;
			let u = typeof o == "object" && o[this.opts.schemaId];
			!y.has(s) && u && (a = (0, c.resolveUrl)(this.opts.uriResolver, a, u));
		}
		let u;
		if (typeof o != "boolean" && o.$ref && !(0, l.schemaHasRulesButRef)(o, this.RULES)) {
			let t = (0, c.resolveUrl)(this.opts.uriResolver, a, o.$ref);
			u = v.call(this, s, t);
		}
		let { schemaId: f } = this.opts;
		if (u ||= new d({
			schema: o,
			schemaId: f,
			root: s,
			baseId: a
		}), u.schema !== u.root.schema) return u;
	}
})), data_exports$1 = /* @__PURE__ */ __export({
	$id: () => $id$10,
	additionalProperties: () => !1,
	default: () => data_default$1,
	description: () => description$1,
	properties: () => properties$10,
	required: () => required$1,
	type: () => type$10
}, 1), $id$10, description$1, type$10, required$1, properties$10, data_default$1, init_data$1 = __esmMin((() => {
	$id$10 = "https://raw.githubusercontent.com/ajv-validator/ajv/master/lib/refs/data.json#", description$1 = "Meta-schema for $data reference (JSON AnySchema extension proposal)", type$10 = "object", required$1 = ["$data"], properties$10 = { $data: {
		type: "string",
		anyOf: [{ format: "relative-json-pointer" }, { format: "json-pointer" }]
	} }, data_default$1 = {
		$id: $id$10,
		description: description$1,
		type: type$10,
		required: required$1,
		properties: properties$10,
		additionalProperties: !1
	};
})), require_utils$3 = /* @__PURE__ */ __commonJSMin(((t, a) => {
	var o = RegExp.prototype.test.bind(/^[\da-f]{8}-[\da-f]{4}-[\da-f]{4}-[\da-f]{4}-[\da-f]{12}$/iu), s = RegExp.prototype.test.bind(/^(?:(?:25[0-5]|2[0-4]\d|1\d{2}|[1-9]\d|\d)\.){3}(?:25[0-5]|2[0-4]\d|1\d{2}|[1-9]\d|\d)$/u);
	function c(t) {
		let a = "", o = 0, s = 0;
		for (s = 0; s < t.length; s++) if (o = t[s].charCodeAt(0), o !== 48) {
			if (!(o >= 48 && o <= 57 || o >= 65 && o <= 70 || o >= 97 && o <= 102)) return "";
			a += t[s];
			break;
		}
		for (s += 1; s < t.length; s++) {
			if (o = t[s].charCodeAt(0), !(o >= 48 && o <= 57 || o >= 65 && o <= 70 || o >= 97 && o <= 102)) return "";
			a += t[s];
		}
		return a;
	}
	var l = RegExp.prototype.test.bind(/[^!"$&'()*+,\-.;=_`a-z{}~]/u);
	function u(t) {
		return t.length = 0, !0;
	}
	function d(t, a, o) {
		if (t.length) {
			let s = c(t);
			if (s !== "") a.push(s);
			else return o.error = !0, !1;
			t.length = 0;
		}
		return !0;
	}
	function f(t) {
		let a = 0, o = {
			error: !1,
			address: "",
			zone: ""
		}, s = [], l = [], f = !1, p = !1, m = d;
		for (let c = 0; c < t.length; c++) {
			let d = t[c];
			if (!(d === "[" || d === "]")) if (d === ":") {
				if (f === !0 && (p = !0), !m(l, s, o)) break;
				if (++a > 7) {
					o.error = !0;
					break;
				}
				c > 0 && t[c - 1] === ":" && (f = !0), s.push(":");
				continue;
			} else if (d === "%") {
				if (!m(l, s, o)) break;
				m = u;
			} else {
				l.push(d);
				continue;
			}
		}
		return l.length && (m === u ? o.zone = l.join("") : p ? s.push(l.join("")) : s.push(c(l))), o.address = s.join(""), o;
	}
	function p(t) {
		if (m(t, ":") < 2) return {
			host: t,
			isIPV6: !1
		};
		let a = f(t);
		if (a.error) return {
			host: t,
			isIPV6: !1
		};
		{
			let t = a.address, o = a.address;
			return a.zone && (t += "%" + a.zone, o += "%25" + a.zone), {
				host: t,
				isIPV6: !0,
				escapedHost: o
			};
		}
	}
	function m(t, a) {
		let o = 0;
		for (let s = 0; s < t.length; s++) t[s] === a && o++;
		return o;
	}
	function h(t) {
		let a = t, o = [], s = -1, c = 0;
		for (; c = a.length;) {
			if (c === 1) {
				if (a === ".") break;
				if (a === "/") {
					o.push("/");
					break;
				} else {
					o.push(a);
					break;
				}
			} else if (c === 2) {
				if (a[0] === ".") {
					if (a[1] === ".") break;
					if (a[1] === "/") {
						a = a.slice(2);
						continue;
					}
				} else if (a[0] === "/" && (a[1] === "." || a[1] === "/")) {
					o.push("/");
					break;
				}
			} else if (c === 3 && a === "/..") {
				o.length !== 0 && o.pop(), o.push("/");
				break;
			}
			if (a[0] === ".") {
				if (a[1] === ".") {
					if (a[2] === "/") {
						a = a.slice(3);
						continue;
					}
				} else if (a[1] === "/") {
					a = a.slice(2);
					continue;
				}
			} else if (a[0] === "/" && a[1] === ".") {
				if (a[2] === "/") {
					a = a.slice(2);
					continue;
				} else if (a[2] === "." && a[3] === "/") {
					a = a.slice(3), o.length !== 0 && o.pop();
					continue;
				}
			}
			if ((s = a.indexOf("/", 1)) === -1) {
				o.push(a);
				break;
			} else o.push(a.slice(0, s)), a = a.slice(s);
		}
		return o.join("");
	}
	function g(t, a) {
		let o = a === !0 ? unescape : escape;
		return t.scheme !== void 0 && (t.scheme = o(t.scheme)), t.userinfo !== void 0 && (t.userinfo = o(t.userinfo)), t.host !== void 0 && (t.host = o(t.host)), t.path !== void 0 && (t.path = o(t.path)), t.query !== void 0 && (t.query = o(t.query)), t.fragment !== void 0 && (t.fragment = o(t.fragment)), t;
	}
	function _(t) {
		let a = [];
		if (t.userinfo !== void 0 && (a.push(t.userinfo), a.push("@")), t.host !== void 0) {
			let o = unescape(t.host);
			if (!s(o)) {
				let a = p(o);
				o = a.isIPV6 === !0 ? `[${a.escapedHost}]` : t.host;
			}
			a.push(o);
		}
		return (typeof t.port == "number" || typeof t.port == "string") && (a.push(":"), a.push(String(t.port))), a.length ? a.join("") : void 0;
	}
	a.exports = {
		nonSimpleDomain: l,
		recomposeAuthority: _,
		normalizeComponentEncoding: g,
		removeDotSegments: h,
		isIPv4: s,
		isUUID: o,
		normalizeIPv6: p,
		stringArrayToHexStripped: c
	};
})), require_schemes = /* @__PURE__ */ __commonJSMin(((t, a) => {
	var { isUUID: o } = require_utils$3(), s = /([\da-z][\d\-a-z]{0,31}):((?:[\w!$'()*+,\-.:;=@]|%[\da-f]{2})+)/iu, c = [
		"http",
		"https",
		"ws",
		"wss",
		"urn",
		"urn:uuid"
	];
	function l(t) {
		return c.indexOf(t) !== -1;
	}
	function u(t) {
		return t.secure === !0 ? !0 : t.secure === !1 ? !1 : t.scheme ? t.scheme.length === 3 && (t.scheme[0] === "w" || t.scheme[0] === "W") && (t.scheme[1] === "s" || t.scheme[1] === "S") && (t.scheme[2] === "s" || t.scheme[2] === "S") : !1;
	}
	function d(t) {
		return t.host || (t.error = t.error || "HTTP URIs must have a host."), t;
	}
	function f(t) {
		let a = String(t.scheme).toLowerCase() === "https";
		return (t.port === (a ? 443 : 80) || t.port === "") && (t.port = void 0), t.path ||= "/", t;
	}
	function p(t) {
		return t.secure = u(t), t.resourceName = (t.path || "/") + (t.query ? "?" + t.query : ""), t.path = void 0, t.query = void 0, t;
	}
	function m(t) {
		if ((t.port === (u(t) ? 443 : 80) || t.port === "") && (t.port = void 0), typeof t.secure == "boolean" && (t.scheme = t.secure ? "wss" : "ws", t.secure = void 0), t.resourceName) {
			let [a, o] = t.resourceName.split("?");
			t.path = a && a !== "/" ? a : void 0, t.query = o, t.resourceName = void 0;
		}
		return t.fragment = void 0, t;
	}
	function h(t, a) {
		if (!t.path) return t.error = "URN can not be parsed", t;
		let o = t.path.match(s);
		if (o) {
			let s = a.scheme || t.scheme || "urn";
			t.nid = o[1].toLowerCase(), t.nss = o[2];
			let c = E(`${s}:${a.nid || t.nid}`);
			t.path = void 0, c && (t = c.parse(t, a));
		} else t.error = t.error || "URN can not be parsed.";
		return t;
	}
	function g(t, a) {
		if (t.nid === void 0) throw Error("URN without nid cannot be serialized");
		let o = a.scheme || t.scheme || "urn", s = t.nid.toLowerCase(), c = E(`${o}:${a.nid || s}`);
		c && (t = c.serialize(t, a));
		let l = t, u = t.nss;
		return l.path = `${s || a.nid}:${u}`, a.skipEscape = !0, l;
	}
	function _(t, a) {
		let s = t;
		return s.uuid = s.nss, s.nss = void 0, !a.tolerant && (!s.uuid || !o(s.uuid)) && (s.error = s.error || "UUID is not valid."), s;
	}
	function v(t) {
		let a = t;
		return a.nss = (t.uuid || "").toLowerCase(), a;
	}
	var y = {
		scheme: "http",
		domainHost: !0,
		parse: d,
		serialize: f
	}, b = {
		scheme: "https",
		domainHost: y.domainHost,
		parse: d,
		serialize: f
	}, x = {
		scheme: "ws",
		domainHost: !0,
		parse: p,
		serialize: m
	}, S = {
		scheme: "wss",
		domainHost: x.domainHost,
		parse: x.parse,
		serialize: x.serialize
	}, C = {
		scheme: "urn",
		parse: h,
		serialize: g,
		skipNormalize: !0
	}, w = {
		scheme: "urn:uuid",
		parse: _,
		serialize: v,
		skipNormalize: !0
	}, T = {
		http: y,
		https: b,
		ws: x,
		wss: S,
		urn: C,
		"urn:uuid": w
	};
	Object.setPrototypeOf(T, null);
	function E(t) {
		return t && (T[t] || T[t.toLowerCase()]) || void 0;
	}
	a.exports = {
		wsIsSecure: u,
		SCHEMES: T,
		isValidSchemeName: l,
		getSchemeHandler: E
	};
})), require_fast_uri = /* @__PURE__ */ __commonJSMin(((t, a) => {
	var { normalizeIPv6: o, removeDotSegments: s, recomposeAuthority: c, normalizeComponentEncoding: l, isIPv4: u, nonSimpleDomain: d } = require_utils$3(), { SCHEMES: f, getSchemeHandler: p } = require_schemes();
	function m(t, a) {
		return typeof t == "string" ? t = v(b(t, a), a) : typeof t == "object" && (t = b(v(t, a), a)), t;
	}
	function h(t, a, o) {
		let s = o ? Object.assign({ scheme: "null" }, o) : { scheme: "null" }, c = g(b(t, s), b(a, s), s, !0);
		return s.skipEscape = !0, v(c, s);
	}
	function g(t, a, o, c) {
		let l = {};
		return c || (t = b(v(t, o), o), a = b(v(a, o), o)), o ||= {}, !o.tolerant && a.scheme ? (l.scheme = a.scheme, l.userinfo = a.userinfo, l.host = a.host, l.port = a.port, l.path = s(a.path || ""), l.query = a.query) : (a.userinfo !== void 0 || a.host !== void 0 || a.port !== void 0 ? (l.userinfo = a.userinfo, l.host = a.host, l.port = a.port, l.path = s(a.path || ""), l.query = a.query) : (a.path ? (a.path[0] === "/" ? l.path = s(a.path) : ((t.userinfo !== void 0 || t.host !== void 0 || t.port !== void 0) && !t.path ? l.path = "/" + a.path : t.path ? l.path = t.path.slice(0, t.path.lastIndexOf("/") + 1) + a.path : l.path = a.path, l.path = s(l.path)), l.query = a.query) : (l.path = t.path, a.query === void 0 ? l.query = t.query : l.query = a.query), l.userinfo = t.userinfo, l.host = t.host, l.port = t.port), l.scheme = t.scheme), l.fragment = a.fragment, l;
	}
	function _(t, a, o) {
		return typeof t == "string" ? (t = unescape(t), t = v(l(b(t, o), !0), {
			...o,
			skipEscape: !0
		})) : typeof t == "object" && (t = v(l(t, !0), {
			...o,
			skipEscape: !0
		})), typeof a == "string" ? (a = unescape(a), a = v(l(b(a, o), !0), {
			...o,
			skipEscape: !0
		})) : typeof a == "object" && (a = v(l(a, !0), {
			...o,
			skipEscape: !0
		})), t.toLowerCase() === a.toLowerCase();
	}
	function v(t, a) {
		let o = {
			host: t.host,
			scheme: t.scheme,
			userinfo: t.userinfo,
			port: t.port,
			path: t.path,
			query: t.query,
			nid: t.nid,
			nss: t.nss,
			uuid: t.uuid,
			fragment: t.fragment,
			reference: t.reference,
			resourceName: t.resourceName,
			secure: t.secure,
			error: ""
		}, l = Object.assign({}, a), u = [], d = p(l.scheme || o.scheme);
		d && d.serialize && d.serialize(o, l), o.path !== void 0 && (l.skipEscape ? o.path = unescape(o.path) : (o.path = escape(o.path), o.scheme !== void 0 && (o.path = o.path.split("%3A").join(":")))), l.reference !== "suffix" && o.scheme && u.push(o.scheme, ":");
		let f = c(o);
		if (f !== void 0 && (l.reference !== "suffix" && u.push("//"), u.push(f), o.path && o.path[0] !== "/" && u.push("/")), o.path !== void 0) {
			let t = o.path;
			!l.absolutePath && (!d || !d.absolutePath) && (t = s(t)), f === void 0 && t[0] === "/" && t[1] === "/" && (t = "/%2F" + t.slice(2)), u.push(t);
		}
		return o.query !== void 0 && u.push("?", o.query), o.fragment !== void 0 && u.push("#", o.fragment), u.join("");
	}
	var y = /^(?:([^#/:?]+):)?(?:\/\/((?:([^#/?@]*)@)?(\[[^#/?\]]+\]|[^#/:?]*)(?::(\d*))?))?([^#?]*)(?:\?([^#]*))?(?:#((?:.|[\n\r])*))?/u;
	function b(t, a) {
		let s = Object.assign({}, a), c = {
			scheme: void 0,
			userinfo: void 0,
			host: "",
			port: void 0,
			path: "",
			query: void 0,
			fragment: void 0
		}, l = !1;
		s.reference === "suffix" && (t = s.scheme ? s.scheme + ":" + t : "//" + t);
		let f = t.match(y);
		if (f) {
			if (c.scheme = f[1], c.userinfo = f[3], c.host = f[4], c.port = parseInt(f[5], 10), c.path = f[6] || "", c.query = f[7], c.fragment = f[8], isNaN(c.port) && (c.port = f[5]), c.host) if (u(c.host) === !1) {
				let t = o(c.host);
				c.host = t.host.toLowerCase(), l = t.isIPV6;
			} else l = !0;
			c.scheme === void 0 && c.userinfo === void 0 && c.host === void 0 && c.port === void 0 && c.query === void 0 && !c.path ? c.reference = "same-document" : c.scheme === void 0 ? c.reference = "relative" : c.fragment === void 0 ? c.reference = "absolute" : c.reference = "uri", s.reference && s.reference !== "suffix" && s.reference !== c.reference && (c.error = c.error || "URI is not a " + s.reference + " reference.");
			let a = p(s.scheme || c.scheme);
			if (!s.unicodeSupport && (!a || !a.unicodeSupport) && c.host && (s.domainHost || a && a.domainHost) && l === !1 && d(c.host)) try {
				c.host = URL.domainToASCII(c.host.toLowerCase());
			} catch (t) {
				c.error = c.error || "Host's domain name can not be converted to ASCII: " + t;
			}
			(!a || a && !a.skipNormalize) && (t.indexOf("%") !== -1 && (c.scheme !== void 0 && (c.scheme = unescape(c.scheme)), c.host !== void 0 && (c.host = unescape(c.host))), c.path &&= escape(unescape(c.path)), c.fragment &&= encodeURI(decodeURIComponent(c.fragment))), a && a.parse && a.parse(c, s);
		} else c.error = c.error || "URI can not be parsed.";
		return c;
	}
	var x = {
		SCHEMES: f,
		normalize: m,
		resolve: h,
		resolveComponent: g,
		equal: _,
		serialize: v,
		parse: b
	};
	a.exports = x, a.exports.default = x, a.exports.fastUri = x;
})), require_uri$1 = /* @__PURE__ */ __commonJSMin(((t) => {
	Object.defineProperty(t, "__esModule", { value: !0 });
	var a = require_fast_uri();
	a.code = "require(\"ajv/dist/runtime/uri\").default", t.default = a;
})), require_core$3 = /* @__PURE__ */ __commonJSMin(((t) => {
	Object.defineProperty(t, "__esModule", { value: !0 }), t.CodeGen = t.Name = t.nil = t.stringify = t.str = t._ = t.KeywordCxt = void 0;
	var a = require_validate$1();
	Object.defineProperty(t, "KeywordCxt", {
		enumerable: !0,
		get: function() {
			return a.KeywordCxt;
		}
	});
	var o = require_codegen$1();
	Object.defineProperty(t, "_", {
		enumerable: !0,
		get: function() {
			return o._;
		}
	}), Object.defineProperty(t, "str", {
		enumerable: !0,
		get: function() {
			return o.str;
		}
	}), Object.defineProperty(t, "stringify", {
		enumerable: !0,
		get: function() {
			return o.stringify;
		}
	}), Object.defineProperty(t, "nil", {
		enumerable: !0,
		get: function() {
			return o.nil;
		}
	}), Object.defineProperty(t, "Name", {
		enumerable: !0,
		get: function() {
			return o.Name;
		}
	}), Object.defineProperty(t, "CodeGen", {
		enumerable: !0,
		get: function() {
			return o.CodeGen;
		}
	});
	var s = require_validation_error$1(), c = require_ref_error$1(), l = require_rules$1(), u = require_compile$1(), d = require_codegen$1(), f = require_resolve$1(), p = require_dataType$1(), m = require_util$2(), h = (init_data$1(), __toCommonJS(data_exports$1).default), g = require_uri$1(), _ = (t, a) => new RegExp(t, a);
	_.code = "new RegExp";
	var v = [
		"removeAdditional",
		"useDefaults",
		"coerceTypes"
	], y = new Set([
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
	]), b = {
		errorDataPath: "",
		format: "`validateFormats: false` can be used instead.",
		nullable: "\"nullable\" keyword is supported by default.",
		jsonPointers: "Deprecated jsPropertySyntax can be used instead.",
		extendRefs: "Deprecated ignoreKeywordsWithRef can be used instead.",
		missingRefs: "Pass empty schema with $id that should be ignored to ajv.addSchema.",
		processCode: "Use option `code: {process: (code, schemaEnv: object) => string}`",
		sourceCode: "Use option `code: {source: true}`",
		strictDefaults: "It is default now, see option `strict`.",
		strictKeywords: "It is default now, see option `strict`.",
		uniqueItems: "\"uniqueItems\" keyword is always validated.",
		unknownFormats: "Disable strict mode or pass `true` to `ajv.addFormat` (or `formats` option).",
		cache: "Map is used as cache, schema object as key.",
		serialize: "Map is used as cache, schema object as key.",
		ajvErrors: "It is default now."
	}, x = {
		ignoreKeywordsWithRef: "",
		jsPropertySyntax: "",
		unicode: "\"minLength\"/\"maxLength\" account for unicode characters by default."
	}, S = 200;
	function C(t) {
		let a = t.strict, o = t.code?.optimize, s = o === !0 || o === void 0 ? 1 : o || 0, c = t.code?.regExp ?? _, l = t.uriResolver ?? g.default;
		return {
			strictSchema: t.strictSchema ?? a ?? !0,
			strictNumbers: t.strictNumbers ?? a ?? !0,
			strictTypes: t.strictTypes ?? a ?? "log",
			strictTuples: t.strictTuples ?? a ?? "log",
			strictRequired: t.strictRequired ?? a ?? !1,
			code: t.code ? {
				...t.code,
				optimize: s,
				regExp: c
			} : {
				optimize: s,
				regExp: c
			},
			loopRequired: t.loopRequired ?? S,
			loopEnum: t.loopEnum ?? S,
			meta: t.meta ?? !0,
			messages: t.messages ?? !0,
			inlineRefs: t.inlineRefs ?? !0,
			schemaId: t.schemaId ?? "$id",
			addUsedSchema: t.addUsedSchema ?? !0,
			validateSchema: t.validateSchema ?? !0,
			validateFormats: t.validateFormats ?? !0,
			unicodeRegExp: t.unicodeRegExp ?? !0,
			int32range: t.int32range ?? !0,
			uriResolver: l
		};
	}
	var w = class {
		constructor(t = {}) {
			this.schemas = {}, this.refs = {}, this.formats = {}, this._compilations = /* @__PURE__ */ new Set(), this._loading = {}, this._cache = /* @__PURE__ */ new Map(), t = this.opts = {
				...t,
				...C(t)
			};
			let { es5: a, lines: o } = this.opts.code;
			this.scope = new d.ValueScope({
				scope: {},
				prefixes: y,
				es5: a,
				lines: o
			}), this.logger = N(t.logger);
			let s = t.validateFormats;
			t.validateFormats = !1, this.RULES = (0, l.getRules)(), T.call(this, b, t, "NOT SUPPORTED"), T.call(this, x, t, "DEPRECATED", "warn"), this._metaOpts = j.call(this), t.formats && O.call(this), this._addVocabularies(), this._addDefaultMetaSchema(), t.keywords && k.call(this, t.keywords), typeof t.meta == "object" && this.addMetaSchema(t.meta), D.call(this), t.validateFormats = s;
		}
		_addVocabularies() {
			this.addKeyword("$async");
		}
		_addDefaultMetaSchema() {
			let { $data: t, meta: a, schemaId: o } = this.opts, s = h;
			o === "id" && (s = { ...h }, s.id = s.$id, delete s.$id), a && t && this.addMetaSchema(s, s[o], !1);
		}
		defaultMeta() {
			let { meta: t, schemaId: a } = this.opts;
			return this.opts.defaultMeta = typeof t == "object" ? t[a] || t : void 0;
		}
		validate(t, a) {
			let o;
			if (typeof t == "string") {
				if (o = this.getSchema(t), !o) throw Error(`no schema with key or ref "${t}"`);
			} else o = this.compile(t);
			let s = o(a);
			return "$async" in o || (this.errors = o.errors), s;
		}
		compile(t, a) {
			let o = this._addSchema(t, a);
			return o.validate || this._compileSchemaEnv(o);
		}
		compileAsync(t, a) {
			if (typeof this.opts.loadSchema != "function") throw Error("options.loadSchema should be a function");
			let { loadSchema: o } = this.opts;
			return s.call(this, t, a);
			async function s(t, a) {
				await l.call(this, t.$schema);
				let o = this._addSchema(t, a);
				return o.validate || u.call(this, o);
			}
			async function l(t) {
				t && !this.getSchema(t) && await s.call(this, { $ref: t }, !0);
			}
			async function u(t) {
				try {
					return this._compileSchemaEnv(t);
				} catch (a) {
					if (!(a instanceof c.default)) throw a;
					return d.call(this, a), await f.call(this, a.missingSchema), u.call(this, t);
				}
			}
			function d({ missingSchema: t, missingRef: a }) {
				if (this.refs[t]) throw Error(`AnySchema ${t} is loaded but ${a} cannot be resolved`);
			}
			async function f(t) {
				let o = await p.call(this, t);
				this.refs[t] || await l.call(this, o.$schema), this.refs[t] || this.addSchema(o, t, a);
			}
			async function p(t) {
				let a = this._loading[t];
				if (a) return a;
				try {
					return await (this._loading[t] = o(t));
				} finally {
					delete this._loading[t];
				}
			}
		}
		addSchema(t, a, o, s = this.opts.validateSchema) {
			if (Array.isArray(t)) {
				for (let a of t) this.addSchema(a, void 0, o, s);
				return this;
			}
			let c;
			if (typeof t == "object") {
				let { schemaId: a } = this.opts;
				if (c = t[a], c !== void 0 && typeof c != "string") throw Error(`schema ${a} must be string`);
			}
			return a = (0, f.normalizeId)(a || c), this._checkUnique(a), this.schemas[a] = this._addSchema(t, o, a, s, !0), this;
		}
		addMetaSchema(t, a, o = this.opts.validateSchema) {
			return this.addSchema(t, a, !0, o), this;
		}
		validateSchema(t, a) {
			if (typeof t == "boolean") return !0;
			let o;
			if (o = t.$schema, o !== void 0 && typeof o != "string") throw Error("$schema must be a string");
			if (o = o || this.opts.defaultMeta || this.defaultMeta(), !o) return this.logger.warn("meta-schema not available"), this.errors = null, !0;
			let s = this.validate(o, t);
			if (!s && a) {
				let t = "schema is invalid: " + this.errorsText();
				if (this.opts.validateSchema === "log") this.logger.error(t);
				else throw Error(t);
			}
			return s;
		}
		getSchema(t) {
			let a;
			for (; typeof (a = E.call(this, t)) == "string";) t = a;
			if (a === void 0) {
				let { schemaId: o } = this.opts, s = new u.SchemaEnv({
					schema: {},
					schemaId: o
				});
				if (a = u.resolveSchema.call(this, s, t), !a) return;
				this.refs[t] = a;
			}
			return a.validate || this._compileSchemaEnv(a);
		}
		removeSchema(t) {
			if (t instanceof RegExp) return this._removeAllSchemas(this.schemas, t), this._removeAllSchemas(this.refs, t), this;
			switch (typeof t) {
				case "undefined": return this._removeAllSchemas(this.schemas), this._removeAllSchemas(this.refs), this._cache.clear(), this;
				case "string": {
					let a = E.call(this, t);
					return typeof a == "object" && this._cache.delete(a.schema), delete this.schemas[t], delete this.refs[t], this;
				}
				case "object": {
					let a = t;
					this._cache.delete(a);
					let o = t[this.opts.schemaId];
					return o && (o = (0, f.normalizeId)(o), delete this.schemas[o], delete this.refs[o]), this;
				}
				default: throw Error("ajv.removeSchema: invalid parameter");
			}
		}
		addVocabulary(t) {
			for (let a of t) this.addKeyword(a);
			return this;
		}
		addKeyword(t, a) {
			let o;
			if (typeof t == "string") o = t, typeof a == "object" && (this.logger.warn("these parameters are deprecated, see docs for addKeyword"), a.keyword = o);
			else if (typeof t == "object" && a === void 0) {
				if (a = t, o = a.keyword, Array.isArray(o) && !o.length) throw Error("addKeywords: keyword must be string or non-empty array");
			} else throw Error("invalid addKeywords parameters");
			if (F.call(this, o, a), !a) return (0, m.eachItem)(o, (t) => I.call(this, t)), this;
			R.call(this, a);
			let s = {
				...a,
				type: (0, p.getJSONTypes)(a.type),
				schemaType: (0, p.getJSONTypes)(a.schemaType)
			};
			return (0, m.eachItem)(o, s.type.length === 0 ? (t) => I.call(this, t, s) : (t) => s.type.forEach((a) => I.call(this, t, s, a))), this;
		}
		getKeyword(t) {
			let a = this.RULES.all[t];
			return typeof a == "object" ? a.definition : !!a;
		}
		removeKeyword(t) {
			let { RULES: a } = this;
			delete a.keywords[t], delete a.all[t];
			for (let o of a.rules) {
				let a = o.rules.findIndex((a) => a.keyword === t);
				a >= 0 && o.rules.splice(a, 1);
			}
			return this;
		}
		addFormat(t, a) {
			return typeof a == "string" && (a = new RegExp(a)), this.formats[t] = a, this;
		}
		errorsText(t = this.errors, { separator: a = ", ", dataVar: o = "data" } = {}) {
			return !t || t.length === 0 ? "No errors" : t.map((t) => `${o}${t.instancePath} ${t.message}`).reduce((t, o) => t + a + o);
		}
		$dataMetaSchema(t, a) {
			let o = this.RULES.all;
			t = JSON.parse(JSON.stringify(t));
			for (let s of a) {
				let a = s.split("/").slice(1), c = t;
				for (let t of a) c = c[t];
				for (let t in o) {
					let a = o[t];
					if (typeof a != "object") continue;
					let { $data: s } = a.definition, l = c[t];
					s && l && (c[t] = B(l));
				}
			}
			return t;
		}
		_removeAllSchemas(t, a) {
			for (let o in t) {
				let s = t[o];
				(!a || a.test(o)) && (typeof s == "string" ? delete t[o] : s && !s.meta && (this._cache.delete(s.schema), delete t[o]));
			}
		}
		_addSchema(t, a, o, s = this.opts.validateSchema, c = this.opts.addUsedSchema) {
			let l, { schemaId: d } = this.opts;
			if (typeof t == "object") l = t[d];
			else if (this.opts.jtd) throw Error("schema must be object");
			else if (typeof t != "boolean") throw Error("schema must be object or boolean");
			let p = this._cache.get(t);
			if (p !== void 0) return p;
			o = (0, f.normalizeId)(l || o);
			let m = f.getSchemaRefs.call(this, t, o);
			return p = new u.SchemaEnv({
				schema: t,
				schemaId: d,
				meta: a,
				baseId: o,
				localRefs: m
			}), this._cache.set(p.schema, p), c && !o.startsWith("#") && (o && this._checkUnique(o), this.refs[o] = p), s && this.validateSchema(t, !0), p;
		}
		_checkUnique(t) {
			if (this.schemas[t] || this.refs[t]) throw Error(`schema with key or id "${t}" already exists`);
		}
		_compileSchemaEnv(t) {
			/* istanbul ignore if */
			if (t.meta ? this._compileMetaSchema(t) : u.compileSchema.call(this, t), !t.validate) throw Error("ajv implementation error");
			return t.validate;
		}
		_compileMetaSchema(t) {
			let a = this.opts;
			this.opts = this._metaOpts;
			try {
				u.compileSchema.call(this, t);
			} finally {
				this.opts = a;
			}
		}
	};
	w.ValidationError = s.default, w.MissingRefError = c.default, t.default = w;
	function T(t, a, o, s = "error") {
		for (let c in t) {
			let l = c;
			l in a && this.logger[s](`${o}: option ${c}. ${t[l]}`);
		}
	}
	function E(t) {
		return t = (0, f.normalizeId)(t), this.schemas[t] || this.refs[t];
	}
	function D() {
		let t = this.opts.schemas;
		if (t) if (Array.isArray(t)) this.addSchema(t);
		else for (let a in t) this.addSchema(t[a], a);
	}
	function O() {
		for (let t in this.opts.formats) {
			let a = this.opts.formats[t];
			a && this.addFormat(t, a);
		}
	}
	function k(t) {
		if (Array.isArray(t)) {
			this.addVocabulary(t);
			return;
		}
		for (let a in this.logger.warn("keywords option as map is deprecated, pass array"), t) {
			let o = t[a];
			o.keyword ||= a, this.addKeyword(o);
		}
	}
	function j() {
		let t = { ...this.opts };
		for (let a of v) delete t[a];
		return t;
	}
	var M = {
		log() {},
		warn() {},
		error() {}
	};
	function N(t) {
		if (t === !1) return M;
		if (t === void 0) return console;
		if (t.log && t.warn && t.error) return t;
		throw Error("logger must implement log, warn and error methods");
	}
	var P = /^[a-z_$][a-z0-9_$:-]*$/i;
	function F(t, a) {
		let { RULES: o } = this;
		if ((0, m.eachItem)(t, (t) => {
			if (o.keywords[t]) throw Error(`Keyword ${t} is already defined`);
			if (!P.test(t)) throw Error(`Keyword ${t} has invalid name`);
		}), a && a.$data && !("code" in a || "validate" in a)) throw Error("$data keyword must have \"code\" or \"validate\" function");
	}
	function I(t, a, o) {
		var s;
		let c = a?.post;
		if (o && c) throw Error("keyword with \"post\" flag cannot have \"type\"");
		let { RULES: l } = this, u = c ? l.post : l.rules.find(({ type: t }) => t === o);
		if (u || (u = {
			type: o,
			rules: []
		}, l.rules.push(u)), l.keywords[t] = !0, !a) return;
		let d = {
			keyword: t,
			definition: {
				...a,
				type: (0, p.getJSONTypes)(a.type),
				schemaType: (0, p.getJSONTypes)(a.schemaType)
			}
		};
		a.before ? L.call(this, u, d, a.before) : u.rules.push(d), l.all[t] = d, (s = a.implements) == null || s.forEach((t) => this.addKeyword(t));
	}
	function L(t, a, o) {
		let s = t.rules.findIndex((t) => t.keyword === o);
		s >= 0 ? t.rules.splice(s, 0, a) : (t.rules.push(a), this.logger.warn(`rule ${o} is not defined`));
	}
	function R(t) {
		let { metaSchema: a } = t;
		a !== void 0 && (t.$data && this.opts.$data && (a = B(a)), t.validateSchema = this.compile(a, !0));
	}
	var z = { $ref: "https://raw.githubusercontent.com/ajv-validator/ajv/master/lib/refs/data.json#" };
	function B(t) {
		return { anyOf: [t, z] };
	}
})), require_id$1 = /* @__PURE__ */ __commonJSMin(((t) => {
	Object.defineProperty(t, "__esModule", { value: !0 }), t.default = {
		keyword: "id",
		code() {
			throw Error("NOT SUPPORTED: keyword \"id\", use \"$id\" for schema ID");
		}
	};
})), require_ref$1 = /* @__PURE__ */ __commonJSMin(((t) => {
	Object.defineProperty(t, "__esModule", { value: !0 }), t.callRef = t.getValidate = void 0;
	var a = require_ref_error$1(), o = require_code$2(), s = require_codegen$1(), c = require_names$1(), l = require_compile$1(), u = require_util$2(), d = {
		keyword: "$ref",
		schemaType: "string",
		code(t) {
			let { gen: o, schema: c, it: u } = t, { baseId: d, schemaEnv: m, validateName: h, opts: g, self: _ } = u, { root: v } = m;
			if ((c === "#" || c === "#/") && d === v.baseId) return b();
			let y = l.resolveRef.call(_, v, d, c);
			if (y === void 0) throw new a.default(u.opts.uriResolver, d, c);
			if (y instanceof l.SchemaEnv) return x(y);
			return S(y);
			function b() {
				if (m === v) return p(t, h, m, m.$async);
				let a = o.scopeValue("root", { ref: v });
				return p(t, (0, s._)`${a}.validate`, v, v.$async);
			}
			function x(a) {
				p(t, f(t, a), a, a.$async);
			}
			function S(a) {
				let l = o.scopeValue("schema", g.code.source === !0 ? {
					ref: a,
					code: (0, s.stringify)(a)
				} : { ref: a }), u = o.name("valid"), d = t.subschema({
					schema: a,
					dataTypes: [],
					schemaPath: s.nil,
					topSchemaRef: l,
					errSchemaPath: c
				}, u);
				t.mergeEvaluated(d), t.ok(u);
			}
		}
	};
	function f(t, a) {
		let { gen: o } = t;
		return a.validate ? o.scopeValue("validate", { ref: a.validate }) : (0, s._)`${o.scopeValue("wrapper", { ref: a })}.validate`;
	}
	t.getValidate = f;
	function p(t, a, l, d) {
		let { gen: f, it: p } = t, { allErrors: m, schemaEnv: h, opts: g } = p, _ = g.passContext ? c.default.this : s.nil;
		d ? v() : y();
		function v() {
			if (!h.$async) throw Error("async schema referenced by sync schema");
			let c = f.let("valid");
			f.try(() => {
				f.code((0, s._)`await ${(0, o.callValidateCode)(t, a, _)}`), x(a), m || f.assign(c, !0);
			}, (t) => {
				f.if((0, s._)`!(${t} instanceof ${p.ValidationError})`, () => f.throw(t)), b(t), m || f.assign(c, !1);
			}), t.ok(c);
		}
		function y() {
			t.result((0, o.callValidateCode)(t, a, _), () => x(a), () => b(a));
		}
		function b(t) {
			let a = (0, s._)`${t}.errors`;
			f.assign(c.default.vErrors, (0, s._)`${c.default.vErrors} === null ? ${a} : ${c.default.vErrors}.concat(${a})`), f.assign(c.default.errors, (0, s._)`${c.default.vErrors}.length`);
		}
		function x(t) {
			if (!p.opts.unevaluated) return;
			let a = l?.validate?.evaluated;
			if (p.props !== !0) if (a && !a.dynamicProps) a.props !== void 0 && (p.props = u.mergeEvaluated.props(f, a.props, p.props));
			else {
				let a = f.var("props", (0, s._)`${t}.evaluated.props`);
				p.props = u.mergeEvaluated.props(f, a, p.props, s.Name);
			}
			if (p.items !== !0) if (a && !a.dynamicItems) a.items !== void 0 && (p.items = u.mergeEvaluated.items(f, a.items, p.items));
			else {
				let a = f.var("items", (0, s._)`${t}.evaluated.items`);
				p.items = u.mergeEvaluated.items(f, a, p.items, s.Name);
			}
		}
	}
	t.callRef = p, t.default = d;
})), require_core$2 = /* @__PURE__ */ __commonJSMin(((t) => {
	Object.defineProperty(t, "__esModule", { value: !0 });
	var a = require_id$1(), o = require_ref$1();
	t.default = [
		"$schema",
		"$id",
		"$defs",
		"$vocabulary",
		{ keyword: "$comment" },
		"definitions",
		a.default,
		o.default
	];
})), require_limitNumber$1 = /* @__PURE__ */ __commonJSMin(((t) => {
	Object.defineProperty(t, "__esModule", { value: !0 });
	var a = require_codegen$1(), o = a.operators, s = {
		maximum: {
			okStr: "<=",
			ok: o.LTE,
			fail: o.GT
		},
		minimum: {
			okStr: ">=",
			ok: o.GTE,
			fail: o.LT
		},
		exclusiveMaximum: {
			okStr: "<",
			ok: o.LT,
			fail: o.GTE
		},
		exclusiveMinimum: {
			okStr: ">",
			ok: o.GT,
			fail: o.LTE
		}
	};
	t.default = {
		keyword: Object.keys(s),
		type: "number",
		schemaType: "number",
		$data: !0,
		error: {
			message: ({ keyword: t, schemaCode: o }) => (0, a.str)`must be ${s[t].okStr} ${o}`,
			params: ({ keyword: t, schemaCode: o }) => (0, a._)`{comparison: ${s[t].okStr}, limit: ${o}}`
		},
		code(t) {
			let { keyword: o, data: c, schemaCode: l } = t;
			t.fail$data((0, a._)`${c} ${s[o].fail} ${l} || isNaN(${c})`);
		}
	};
})), require_multipleOf$1 = /* @__PURE__ */ __commonJSMin(((t) => {
	Object.defineProperty(t, "__esModule", { value: !0 });
	var a = require_codegen$1();
	t.default = {
		keyword: "multipleOf",
		type: "number",
		schemaType: "number",
		$data: !0,
		error: {
			message: ({ schemaCode: t }) => (0, a.str)`must be multiple of ${t}`,
			params: ({ schemaCode: t }) => (0, a._)`{multipleOf: ${t}}`
		},
		code(t) {
			let { gen: o, data: s, schemaCode: c, it: l } = t, u = l.opts.multipleOfPrecision, d = o.let("res"), f = u ? (0, a._)`Math.abs(Math.round(${d}) - ${d}) > 1e-${u}` : (0, a._)`${d} !== parseInt(${d})`;
			t.fail$data((0, a._)`(${c} === 0 || (${d} = ${s}/${c}, ${f}))`);
		}
	};
})), require_ucs2length$1 = /* @__PURE__ */ __commonJSMin(((t) => {
	Object.defineProperty(t, "__esModule", { value: !0 });
	function a(t) {
		let a = t.length, o = 0, s = 0, c;
		for (; s < a;) o++, c = t.charCodeAt(s++), c >= 55296 && c <= 56319 && s < a && (c = t.charCodeAt(s), (c & 64512) == 56320 && s++);
		return o;
	}
	t.default = a, a.code = "require(\"ajv/dist/runtime/ucs2length\").default";
})), require_limitLength$1 = /* @__PURE__ */ __commonJSMin(((t) => {
	Object.defineProperty(t, "__esModule", { value: !0 });
	var a = require_codegen$1(), o = require_util$2(), s = require_ucs2length$1();
	t.default = {
		keyword: ["maxLength", "minLength"],
		type: "string",
		schemaType: "number",
		$data: !0,
		error: {
			message({ keyword: t, schemaCode: o }) {
				let s = t === "maxLength" ? "more" : "fewer";
				return (0, a.str)`must NOT have ${s} than ${o} characters`;
			},
			params: ({ schemaCode: t }) => (0, a._)`{limit: ${t}}`
		},
		code(t) {
			let { keyword: c, data: l, schemaCode: u, it: d } = t, f = c === "maxLength" ? a.operators.GT : a.operators.LT, p = d.opts.unicode === !1 ? (0, a._)`${l}.length` : (0, a._)`${(0, o.useFunc)(t.gen, s.default)}(${l})`;
			t.fail$data((0, a._)`${p} ${f} ${u}`);
		}
	};
})), require_pattern$1 = /* @__PURE__ */ __commonJSMin(((t) => {
	Object.defineProperty(t, "__esModule", { value: !0 });
	var a = require_code$2(), o = require_codegen$1();
	t.default = {
		keyword: "pattern",
		type: "string",
		schemaType: "string",
		$data: !0,
		error: {
			message: ({ schemaCode: t }) => (0, o.str)`must match pattern "${t}"`,
			params: ({ schemaCode: t }) => (0, o._)`{pattern: ${t}}`
		},
		code(t) {
			let { data: s, $data: c, schema: l, schemaCode: u, it: d } = t, f = d.opts.unicodeRegExp ? "u" : "", p = c ? (0, o._)`(new RegExp(${u}, ${f}))` : (0, a.usePattern)(t, l);
			t.fail$data((0, o._)`!${p}.test(${s})`);
		}
	};
})), require_limitProperties$1 = /* @__PURE__ */ __commonJSMin(((t) => {
	Object.defineProperty(t, "__esModule", { value: !0 });
	var a = require_codegen$1();
	t.default = {
		keyword: ["maxProperties", "minProperties"],
		type: "object",
		schemaType: "number",
		$data: !0,
		error: {
			message({ keyword: t, schemaCode: o }) {
				let s = t === "maxProperties" ? "more" : "fewer";
				return (0, a.str)`must NOT have ${s} than ${o} properties`;
			},
			params: ({ schemaCode: t }) => (0, a._)`{limit: ${t}}`
		},
		code(t) {
			let { keyword: o, data: s, schemaCode: c } = t, l = o === "maxProperties" ? a.operators.GT : a.operators.LT;
			t.fail$data((0, a._)`Object.keys(${s}).length ${l} ${c}`);
		}
	};
})), require_required$1 = /* @__PURE__ */ __commonJSMin(((t) => {
	Object.defineProperty(t, "__esModule", { value: !0 });
	var a = require_code$2(), o = require_codegen$1(), s = require_util$2();
	t.default = {
		keyword: "required",
		type: "object",
		schemaType: "array",
		$data: !0,
		error: {
			message: ({ params: { missingProperty: t } }) => (0, o.str)`must have required property '${t}'`,
			params: ({ params: { missingProperty: t } }) => (0, o._)`{missingProperty: ${t}}`
		},
		code(t) {
			let { gen: c, schema: l, schemaCode: u, data: d, $data: f, it: p } = t, { opts: m } = p;
			if (!f && l.length === 0) return;
			let h = l.length >= m.loopRequired;
			if (p.allErrors ? g() : _(), m.strictRequired) {
				let a = t.parentSchema.properties, { definedProperties: o } = t.it;
				for (let t of l) if (a?.[t] === void 0 && !o.has(t)) {
					let a = `required property "${t}" is not defined at "${p.schemaEnv.baseId + p.errSchemaPath}" (strictRequired)`;
					(0, s.checkStrictMode)(p, a, p.opts.strictRequired);
				}
			}
			function g() {
				if (h || f) t.block$data(o.nil, v);
				else for (let o of l) (0, a.checkReportMissingProp)(t, o);
			}
			function _() {
				let o = c.let("missing");
				if (h || f) {
					let a = c.let("valid", !0);
					t.block$data(a, () => y(o, a)), t.ok(a);
				} else c.if((0, a.checkMissingProp)(t, l, o)), (0, a.reportMissingProp)(t, o), c.else();
			}
			function v() {
				c.forOf("prop", u, (o) => {
					t.setParams({ missingProperty: o }), c.if((0, a.noPropertyInData)(c, d, o, m.ownProperties), () => t.error());
				});
			}
			function y(s, l) {
				t.setParams({ missingProperty: s }), c.forOf(s, u, () => {
					c.assign(l, (0, a.propertyInData)(c, d, s, m.ownProperties)), c.if((0, o.not)(l), () => {
						t.error(), c.break();
					});
				}, o.nil);
			}
		}
	};
})), require_limitItems$1 = /* @__PURE__ */ __commonJSMin(((t) => {
	Object.defineProperty(t, "__esModule", { value: !0 });
	var a = require_codegen$1();
	t.default = {
		keyword: ["maxItems", "minItems"],
		type: "array",
		schemaType: "number",
		$data: !0,
		error: {
			message({ keyword: t, schemaCode: o }) {
				let s = t === "maxItems" ? "more" : "fewer";
				return (0, a.str)`must NOT have ${s} than ${o} items`;
			},
			params: ({ schemaCode: t }) => (0, a._)`{limit: ${t}}`
		},
		code(t) {
			let { keyword: o, data: s, schemaCode: c } = t, l = o === "maxItems" ? a.operators.GT : a.operators.LT;
			t.fail$data((0, a._)`${s}.length ${l} ${c}`);
		}
	};
})), require_equal$1 = /* @__PURE__ */ __commonJSMin(((t) => {
	Object.defineProperty(t, "__esModule", { value: !0 });
	var a = require_fast_deep_equal();
	a.code = "require(\"ajv/dist/runtime/equal\").default", t.default = a;
})), require_uniqueItems$1 = /* @__PURE__ */ __commonJSMin(((t) => {
	Object.defineProperty(t, "__esModule", { value: !0 });
	var a = require_dataType$1(), o = require_codegen$1(), s = require_util$2(), c = require_equal$1();
	t.default = {
		keyword: "uniqueItems",
		type: "array",
		schemaType: "boolean",
		$data: !0,
		error: {
			message: ({ params: { i: t, j: a } }) => (0, o.str)`must NOT have duplicate items (items ## ${a} and ${t} are identical)`,
			params: ({ params: { i: t, j: a } }) => (0, o._)`{i: ${t}, j: ${a}}`
		},
		code(t) {
			let { gen: l, data: u, $data: d, schema: f, parentSchema: p, schemaCode: m, it: h } = t;
			if (!d && !f) return;
			let g = l.let("valid"), _ = p.items ? (0, a.getSchemaTypes)(p.items) : [];
			t.block$data(g, v, (0, o._)`${m} === false`), t.ok(g);
			function v() {
				let a = l.let("i", (0, o._)`${u}.length`), s = l.let("j");
				t.setParams({
					i: a,
					j: s
				}), l.assign(g, !0), l.if((0, o._)`${a} > 1`, () => (y() ? b : x)(a, s));
			}
			function y() {
				return _.length > 0 && !_.some((t) => t === "object" || t === "array");
			}
			function b(s, c) {
				let d = l.name("item"), f = (0, a.checkDataTypes)(_, d, h.opts.strictNumbers, a.DataType.Wrong), p = l.const("indices", (0, o._)`{}`);
				l.for((0, o._)`;${s}--;`, () => {
					l.let(d, (0, o._)`${u}[${s}]`), l.if(f, (0, o._)`continue`), _.length > 1 && l.if((0, o._)`typeof ${d} == "string"`, (0, o._)`${d} += "_"`), l.if((0, o._)`typeof ${p}[${d}] == "number"`, () => {
						l.assign(c, (0, o._)`${p}[${d}]`), t.error(), l.assign(g, !1).break();
					}).code((0, o._)`${p}[${d}] = ${s}`);
				});
			}
			function x(a, d) {
				let f = (0, s.useFunc)(l, c.default), p = l.name("outer");
				l.label(p).for((0, o._)`;${a}--;`, () => l.for((0, o._)`${d} = ${a}; ${d}--;`, () => l.if((0, o._)`${f}(${u}[${a}], ${u}[${d}])`, () => {
					t.error(), l.assign(g, !1).break(p);
				})));
			}
		}
	};
})), require_const$1 = /* @__PURE__ */ __commonJSMin(((t) => {
	Object.defineProperty(t, "__esModule", { value: !0 });
	var a = require_codegen$1(), o = require_util$2(), s = require_equal$1();
	t.default = {
		keyword: "const",
		$data: !0,
		error: {
			message: "must be equal to constant",
			params: ({ schemaCode: t }) => (0, a._)`{allowedValue: ${t}}`
		},
		code(t) {
			let { gen: c, data: l, $data: u, schemaCode: d, schema: f } = t;
			u || f && typeof f == "object" ? t.fail$data((0, a._)`!${(0, o.useFunc)(c, s.default)}(${l}, ${d})`) : t.fail((0, a._)`${f} !== ${l}`);
		}
	};
})), require_enum$1 = /* @__PURE__ */ __commonJSMin(((t) => {
	Object.defineProperty(t, "__esModule", { value: !0 });
	var a = require_codegen$1(), o = require_util$2(), s = require_equal$1();
	t.default = {
		keyword: "enum",
		schemaType: "array",
		$data: !0,
		error: {
			message: "must be equal to one of the allowed values",
			params: ({ schemaCode: t }) => (0, a._)`{allowedValues: ${t}}`
		},
		code(t) {
			let { gen: c, data: l, $data: u, schema: d, schemaCode: f, it: p } = t;
			if (!u && d.length === 0) throw Error("enum must have non-empty array");
			let m = d.length >= p.opts.loopEnum, h, g = () => h ??= (0, o.useFunc)(c, s.default), _;
			if (m || u) _ = c.let("valid"), t.block$data(_, v);
			else {
				/* istanbul ignore if */
				if (!Array.isArray(d)) throw Error("ajv implementation error");
				let t = c.const("vSchema", f);
				_ = (0, a.or)(...d.map((a, o) => y(t, o)));
			}
			t.pass(_);
			function v() {
				c.assign(_, !1), c.forOf("v", f, (t) => c.if((0, a._)`${g()}(${l}, ${t})`, () => c.assign(_, !0).break()));
			}
			function y(t, o) {
				let s = d[o];
				return typeof s == "object" && s ? (0, a._)`${g()}(${l}, ${t}[${o}])` : (0, a._)`${l} === ${s}`;
			}
		}
	};
})), require_validation$1 = /* @__PURE__ */ __commonJSMin(((t) => {
	Object.defineProperty(t, "__esModule", { value: !0 });
	var a = require_limitNumber$1(), o = require_multipleOf$1(), s = require_limitLength$1(), c = require_pattern$1(), l = require_limitProperties$1(), u = require_required$1(), d = require_limitItems$1(), f = require_uniqueItems$1(), p = require_const$1(), m = require_enum$1();
	t.default = [
		a.default,
		o.default,
		s.default,
		c.default,
		l.default,
		u.default,
		d.default,
		f.default,
		{
			keyword: "type",
			schemaType: ["string", "array"]
		},
		{
			keyword: "nullable",
			schemaType: "boolean"
		},
		p.default,
		m.default
	];
})), require_additionalItems$1 = /* @__PURE__ */ __commonJSMin(((t) => {
	Object.defineProperty(t, "__esModule", { value: !0 }), t.validateAdditionalItems = void 0;
	var a = require_codegen$1(), o = require_util$2(), s = {
		keyword: "additionalItems",
		type: "array",
		schemaType: ["boolean", "object"],
		before: "uniqueItems",
		error: {
			message: ({ params: { len: t } }) => (0, a.str)`must NOT have more than ${t} items`,
			params: ({ params: { len: t } }) => (0, a._)`{limit: ${t}}`
		},
		code(t) {
			let { parentSchema: a, it: s } = t, { items: l } = a;
			if (!Array.isArray(l)) {
				(0, o.checkStrictMode)(s, "\"additionalItems\" is ignored when \"items\" is not an array of schemas");
				return;
			}
			c(t, l);
		}
	};
	function c(t, s) {
		let { gen: c, schema: l, data: u, keyword: d, it: f } = t;
		f.items = !0;
		let p = c.const("len", (0, a._)`${u}.length`);
		if (l === !1) t.setParams({ len: s.length }), t.pass((0, a._)`${p} <= ${s.length}`);
		else if (typeof l == "object" && !(0, o.alwaysValidSchema)(f, l)) {
			let o = c.var("valid", (0, a._)`${p} <= ${s.length}`);
			c.if((0, a.not)(o), () => m(o)), t.ok(o);
		}
		function m(l) {
			c.forRange("i", s.length, p, (s) => {
				t.subschema({
					keyword: d,
					dataProp: s,
					dataPropType: o.Type.Num
				}, l), f.allErrors || c.if((0, a.not)(l), () => c.break());
			});
		}
	}
	t.validateAdditionalItems = c, t.default = s;
})), require_items$1 = /* @__PURE__ */ __commonJSMin(((t) => {
	Object.defineProperty(t, "__esModule", { value: !0 }), t.validateTuple = void 0;
	var a = require_codegen$1(), o = require_util$2(), s = require_code$2(), c = {
		keyword: "items",
		type: "array",
		schemaType: [
			"object",
			"array",
			"boolean"
		],
		before: "uniqueItems",
		code(t) {
			let { schema: a, it: c } = t;
			if (Array.isArray(a)) return l(t, "additionalItems", a);
			c.items = !0, !(0, o.alwaysValidSchema)(c, a) && t.ok((0, s.validateArray)(t));
		}
	};
	function l(t, s, c = t.schema) {
		let { gen: l, parentSchema: u, data: d, keyword: f, it: p } = t;
		g(u), p.opts.unevaluated && c.length && p.items !== !0 && (p.items = o.mergeEvaluated.items(l, c.length, p.items));
		let m = l.name("valid"), h = l.const("len", (0, a._)`${d}.length`);
		c.forEach((s, c) => {
			(0, o.alwaysValidSchema)(p, s) || (l.if((0, a._)`${h} > ${c}`, () => t.subschema({
				keyword: f,
				schemaProp: c,
				dataProp: c
			}, m)), t.ok(m));
		});
		function g(t) {
			let { opts: a, errSchemaPath: l } = p, u = c.length, d = u === t.minItems && (u === t.maxItems || t[s] === !1);
			if (a.strictTuples && !d) {
				let t = `"${f}" is ${u}-tuple, but minItems or maxItems/${s} are not specified or different at path "${l}"`;
				(0, o.checkStrictMode)(p, t, a.strictTuples);
			}
		}
	}
	t.validateTuple = l, t.default = c;
})), require_prefixItems$1 = /* @__PURE__ */ __commonJSMin(((t) => {
	Object.defineProperty(t, "__esModule", { value: !0 });
	var a = require_items$1();
	t.default = {
		keyword: "prefixItems",
		type: "array",
		schemaType: ["array"],
		before: "uniqueItems",
		code: (t) => (0, a.validateTuple)(t, "items")
	};
})), require_items2020$1 = /* @__PURE__ */ __commonJSMin(((t) => {
	Object.defineProperty(t, "__esModule", { value: !0 });
	var a = require_codegen$1(), o = require_util$2(), s = require_code$2(), c = require_additionalItems$1();
	t.default = {
		keyword: "items",
		type: "array",
		schemaType: ["object", "boolean"],
		before: "uniqueItems",
		error: {
			message: ({ params: { len: t } }) => (0, a.str)`must NOT have more than ${t} items`,
			params: ({ params: { len: t } }) => (0, a._)`{limit: ${t}}`
		},
		code(t) {
			let { schema: a, parentSchema: l, it: u } = t, { prefixItems: d } = l;
			u.items = !0, !(0, o.alwaysValidSchema)(u, a) && (d ? (0, c.validateAdditionalItems)(t, d) : t.ok((0, s.validateArray)(t)));
		}
	};
})), require_contains$1 = /* @__PURE__ */ __commonJSMin(((t) => {
	Object.defineProperty(t, "__esModule", { value: !0 });
	var a = require_codegen$1(), o = require_util$2();
	t.default = {
		keyword: "contains",
		type: "array",
		schemaType: ["object", "boolean"],
		before: "uniqueItems",
		trackErrors: !0,
		error: {
			message: ({ params: { min: t, max: o } }) => o === void 0 ? (0, a.str)`must contain at least ${t} valid item(s)` : (0, a.str)`must contain at least ${t} and no more than ${o} valid item(s)`,
			params: ({ params: { min: t, max: o } }) => o === void 0 ? (0, a._)`{minContains: ${t}}` : (0, a._)`{minContains: ${t}, maxContains: ${o}}`
		},
		code(t) {
			let { gen: s, schema: c, parentSchema: l, data: u, it: d } = t, f, p, { minContains: m, maxContains: h } = l;
			d.opts.next ? (f = m === void 0 ? 1 : m, p = h) : f = 1;
			let g = s.const("len", (0, a._)`${u}.length`);
			if (t.setParams({
				min: f,
				max: p
			}), p === void 0 && f === 0) {
				(0, o.checkStrictMode)(d, "\"minContains\" == 0 without \"maxContains\": \"contains\" keyword ignored");
				return;
			}
			if (p !== void 0 && f > p) {
				(0, o.checkStrictMode)(d, "\"minContains\" > \"maxContains\" is always invalid"), t.fail();
				return;
			}
			if ((0, o.alwaysValidSchema)(d, c)) {
				let o = (0, a._)`${g} >= ${f}`;
				p !== void 0 && (o = (0, a._)`${o} && ${g} <= ${p}`), t.pass(o);
				return;
			}
			d.items = !0;
			let _ = s.name("valid");
			p === void 0 && f === 1 ? y(_, () => s.if(_, () => s.break())) : f === 0 ? (s.let(_, !0), p !== void 0 && s.if((0, a._)`${u}.length > 0`, v)) : (s.let(_, !1), v()), t.result(_, () => t.reset());
			function v() {
				let t = s.name("_valid"), a = s.let("count", 0);
				y(t, () => s.if(t, () => b(a)));
			}
			function y(a, c) {
				s.forRange("i", 0, g, (s) => {
					t.subschema({
						keyword: "contains",
						dataProp: s,
						dataPropType: o.Type.Num,
						compositeRule: !0
					}, a), c();
				});
			}
			function b(t) {
				s.code((0, a._)`${t}++`), p === void 0 ? s.if((0, a._)`${t} >= ${f}`, () => s.assign(_, !0).break()) : (s.if((0, a._)`${t} > ${p}`, () => s.assign(_, !1).break()), f === 1 ? s.assign(_, !0) : s.if((0, a._)`${t} >= ${f}`, () => s.assign(_, !0)));
			}
		}
	};
})), require_dependencies$1 = /* @__PURE__ */ __commonJSMin(((t) => {
	Object.defineProperty(t, "__esModule", { value: !0 }), t.validateSchemaDeps = t.validatePropertyDeps = t.error = void 0;
	var a = require_codegen$1(), o = require_util$2(), s = require_code$2();
	t.error = {
		message: ({ params: { property: t, depsCount: o, deps: s } }) => {
			let c = o === 1 ? "property" : "properties";
			return (0, a.str)`must have ${c} ${s} when property ${t} is present`;
		},
		params: ({ params: { property: t, depsCount: o, deps: s, missingProperty: c } }) => (0, a._)`{property: ${t},
    missingProperty: ${c},
    depsCount: ${o},
    deps: ${s}}`
	};
	var c = {
		keyword: "dependencies",
		type: "object",
		schemaType: "object",
		error: t.error,
		code(t) {
			let [a, o] = l(t);
			u(t, a), d(t, o);
		}
	};
	function l({ schema: t }) {
		let a = {}, o = {};
		for (let s in t) {
			if (s === "__proto__") continue;
			let c = Array.isArray(t[s]) ? a : o;
			c[s] = t[s];
		}
		return [a, o];
	}
	function u(t, o = t.schema) {
		let { gen: c, data: l, it: u } = t;
		if (Object.keys(o).length === 0) return;
		let d = c.let("missing");
		for (let f in o) {
			let p = o[f];
			if (p.length === 0) continue;
			let m = (0, s.propertyInData)(c, l, f, u.opts.ownProperties);
			t.setParams({
				property: f,
				depsCount: p.length,
				deps: p.join(", ")
			}), u.allErrors ? c.if(m, () => {
				for (let a of p) (0, s.checkReportMissingProp)(t, a);
			}) : (c.if((0, a._)`${m} && (${(0, s.checkMissingProp)(t, p, d)})`), (0, s.reportMissingProp)(t, d), c.else());
		}
	}
	t.validatePropertyDeps = u;
	function d(t, a = t.schema) {
		let { gen: c, data: l, keyword: u, it: d } = t, f = c.name("valid");
		for (let p in a) (0, o.alwaysValidSchema)(d, a[p]) || (c.if((0, s.propertyInData)(c, l, p, d.opts.ownProperties), () => {
			let a = t.subschema({
				keyword: u,
				schemaProp: p
			}, f);
			t.mergeValidEvaluated(a, f);
		}, () => c.var(f, !0)), t.ok(f));
	}
	t.validateSchemaDeps = d, t.default = c;
})), require_propertyNames$1 = /* @__PURE__ */ __commonJSMin(((t) => {
	Object.defineProperty(t, "__esModule", { value: !0 });
	var a = require_codegen$1(), o = require_util$2();
	t.default = {
		keyword: "propertyNames",
		type: "object",
		schemaType: ["object", "boolean"],
		error: {
			message: "property name must be valid",
			params: ({ params: t }) => (0, a._)`{propertyName: ${t.propertyName}}`
		},
		code(t) {
			let { gen: s, schema: c, data: l, it: u } = t;
			if ((0, o.alwaysValidSchema)(u, c)) return;
			let d = s.name("valid");
			s.forIn("key", l, (o) => {
				t.setParams({ propertyName: o }), t.subschema({
					keyword: "propertyNames",
					data: o,
					dataTypes: ["string"],
					propertyName: o,
					compositeRule: !0
				}, d), s.if((0, a.not)(d), () => {
					t.error(!0), u.allErrors || s.break();
				});
			}), t.ok(d);
		}
	};
})), require_additionalProperties$1 = /* @__PURE__ */ __commonJSMin(((t) => {
	Object.defineProperty(t, "__esModule", { value: !0 });
	var a = require_code$2(), o = require_codegen$1(), s = require_names$1(), c = require_util$2();
	t.default = {
		keyword: "additionalProperties",
		type: ["object"],
		schemaType: ["boolean", "object"],
		allowUndefined: !0,
		trackErrors: !0,
		error: {
			message: "must NOT have additional properties",
			params: ({ params: t }) => (0, o._)`{additionalProperty: ${t.additionalProperty}}`
		},
		code(t) {
			let { gen: l, schema: u, parentSchema: d, data: f, errsCount: p, it: m } = t;
			/* istanbul ignore if */
			if (!p) throw Error("ajv implementation error");
			let { allErrors: h, opts: g } = m;
			if (m.props = !0, g.removeAdditional !== "all" && (0, c.alwaysValidSchema)(m, u)) return;
			let _ = (0, a.allSchemaProperties)(d.properties), v = (0, a.allSchemaProperties)(d.patternProperties);
			y(), t.ok((0, o._)`${p} === ${s.default.errors}`);
			function y() {
				l.forIn("key", f, (t) => {
					!_.length && !v.length ? S(t) : l.if(b(t), () => S(t));
				});
			}
			function b(s) {
				let u;
				if (_.length > 8) {
					let t = (0, c.schemaRefOrVal)(m, d.properties, "properties");
					u = (0, a.isOwnProperty)(l, t, s);
				} else u = _.length ? (0, o.or)(..._.map((t) => (0, o._)`${s} === ${t}`)) : o.nil;
				return v.length && (u = (0, o.or)(u, ...v.map((c) => (0, o._)`${(0, a.usePattern)(t, c)}.test(${s})`))), (0, o.not)(u);
			}
			function x(t) {
				l.code((0, o._)`delete ${f}[${t}]`);
			}
			function S(a) {
				if (g.removeAdditional === "all" || g.removeAdditional && u === !1) {
					x(a);
					return;
				}
				if (u === !1) {
					t.setParams({ additionalProperty: a }), t.error(), h || l.break();
					return;
				}
				if (typeof u == "object" && !(0, c.alwaysValidSchema)(m, u)) {
					let s = l.name("valid");
					g.removeAdditional === "failing" ? (C(a, s, !1), l.if((0, o.not)(s), () => {
						t.reset(), x(a);
					})) : (C(a, s), h || l.if((0, o.not)(s), () => l.break()));
				}
			}
			function C(a, o, s) {
				let l = {
					keyword: "additionalProperties",
					dataProp: a,
					dataPropType: c.Type.Str
				};
				s === !1 && Object.assign(l, {
					compositeRule: !0,
					createErrors: !1,
					allErrors: !1
				}), t.subschema(l, o);
			}
		}
	};
})), require_properties$1 = /* @__PURE__ */ __commonJSMin(((t) => {
	Object.defineProperty(t, "__esModule", { value: !0 });
	var a = require_validate$1(), o = require_code$2(), s = require_util$2(), c = require_additionalProperties$1();
	t.default = {
		keyword: "properties",
		type: "object",
		schemaType: "object",
		code(t) {
			let { gen: l, schema: u, parentSchema: d, data: f, it: p } = t;
			p.opts.removeAdditional === "all" && d.additionalProperties === void 0 && c.default.code(new a.KeywordCxt(p, c.default, "additionalProperties"));
			let m = (0, o.allSchemaProperties)(u);
			for (let t of m) p.definedProperties.add(t);
			p.opts.unevaluated && m.length && p.props !== !0 && (p.props = s.mergeEvaluated.props(l, (0, s.toHash)(m), p.props));
			let h = m.filter((t) => !(0, s.alwaysValidSchema)(p, u[t]));
			if (h.length === 0) return;
			let g = l.name("valid");
			for (let a of h) _(a) ? v(a) : (l.if((0, o.propertyInData)(l, f, a, p.opts.ownProperties)), v(a), p.allErrors || l.else().var(g, !0), l.endIf()), t.it.definedProperties.add(a), t.ok(g);
			function _(t) {
				return p.opts.useDefaults && !p.compositeRule && u[t].default !== void 0;
			}
			function v(a) {
				t.subschema({
					keyword: "properties",
					schemaProp: a,
					dataProp: a
				}, g);
			}
		}
	};
})), require_patternProperties$1 = /* @__PURE__ */ __commonJSMin(((t) => {
	Object.defineProperty(t, "__esModule", { value: !0 });
	var a = require_code$2(), o = require_codegen$1(), s = require_util$2(), c = require_util$2();
	t.default = {
		keyword: "patternProperties",
		type: "object",
		schemaType: "object",
		code(t) {
			let { gen: l, schema: u, data: d, parentSchema: f, it: p } = t, { opts: m } = p, h = (0, a.allSchemaProperties)(u), g = h.filter((t) => (0, s.alwaysValidSchema)(p, u[t]));
			if (h.length === 0 || g.length === h.length && (!p.opts.unevaluated || p.props === !0)) return;
			let _ = m.strictSchema && !m.allowMatchingProperties && f.properties, v = l.name("valid");
			p.props !== !0 && !(p.props instanceof o.Name) && (p.props = (0, c.evaluatedPropsToName)(l, p.props));
			let { props: y } = p;
			b();
			function b() {
				for (let t of h) _ && x(t), p.allErrors ? S(t) : (l.var(v, !0), S(t), l.if(v));
			}
			function x(t) {
				for (let a in _) new RegExp(t).test(a) && (0, s.checkStrictMode)(p, `property ${a} matches pattern ${t} (use allowMatchingProperties)`);
			}
			function S(s) {
				l.forIn("key", d, (u) => {
					l.if((0, o._)`${(0, a.usePattern)(t, s)}.test(${u})`, () => {
						let a = g.includes(s);
						a || t.subschema({
							keyword: "patternProperties",
							schemaProp: s,
							dataProp: u,
							dataPropType: c.Type.Str
						}, v), p.opts.unevaluated && y !== !0 ? l.assign((0, o._)`${y}[${u}]`, !0) : !a && !p.allErrors && l.if((0, o.not)(v), () => l.break());
					});
				});
			}
		}
	};
})), require_not$1 = /* @__PURE__ */ __commonJSMin(((t) => {
	Object.defineProperty(t, "__esModule", { value: !0 });
	var a = require_util$2();
	t.default = {
		keyword: "not",
		schemaType: ["object", "boolean"],
		trackErrors: !0,
		code(t) {
			let { gen: o, schema: s, it: c } = t;
			if ((0, a.alwaysValidSchema)(c, s)) {
				t.fail();
				return;
			}
			let l = o.name("valid");
			t.subschema({
				keyword: "not",
				compositeRule: !0,
				createErrors: !1,
				allErrors: !1
			}, l), t.failResult(l, () => t.reset(), () => t.error());
		},
		error: { message: "must NOT be valid" }
	};
})), require_anyOf$1 = /* @__PURE__ */ __commonJSMin(((t) => {
	Object.defineProperty(t, "__esModule", { value: !0 }), t.default = {
		keyword: "anyOf",
		schemaType: "array",
		trackErrors: !0,
		code: require_code$2().validateUnion,
		error: { message: "must match a schema in anyOf" }
	};
})), require_oneOf$1 = /* @__PURE__ */ __commonJSMin(((t) => {
	Object.defineProperty(t, "__esModule", { value: !0 });
	var a = require_codegen$1(), o = require_util$2();
	t.default = {
		keyword: "oneOf",
		schemaType: "array",
		trackErrors: !0,
		error: {
			message: "must match exactly one schema in oneOf",
			params: ({ params: t }) => (0, a._)`{passingSchemas: ${t.passing}}`
		},
		code(t) {
			let { gen: s, schema: c, parentSchema: l, it: u } = t;
			/* istanbul ignore if */
			if (!Array.isArray(c)) throw Error("ajv implementation error");
			if (u.opts.discriminator && l.discriminator) return;
			let d = c, f = s.let("valid", !1), p = s.let("passing", null), m = s.name("_valid");
			t.setParams({ passing: p }), s.block(h), t.result(f, () => t.reset(), () => t.error(!0));
			function h() {
				d.forEach((c, l) => {
					let d;
					(0, o.alwaysValidSchema)(u, c) ? s.var(m, !0) : d = t.subschema({
						keyword: "oneOf",
						schemaProp: l,
						compositeRule: !0
					}, m), l > 0 && s.if((0, a._)`${m} && ${f}`).assign(f, !1).assign(p, (0, a._)`[${p}, ${l}]`).else(), s.if(m, () => {
						s.assign(f, !0), s.assign(p, l), d && t.mergeEvaluated(d, a.Name);
					});
				});
			}
		}
	};
})), require_allOf$1 = /* @__PURE__ */ __commonJSMin(((t) => {
	Object.defineProperty(t, "__esModule", { value: !0 });
	var a = require_util$2();
	t.default = {
		keyword: "allOf",
		schemaType: "array",
		code(t) {
			let { gen: o, schema: s, it: c } = t;
			/* istanbul ignore if */
			if (!Array.isArray(s)) throw Error("ajv implementation error");
			let l = o.name("valid");
			s.forEach((o, s) => {
				if ((0, a.alwaysValidSchema)(c, o)) return;
				let u = t.subschema({
					keyword: "allOf",
					schemaProp: s
				}, l);
				t.ok(l), t.mergeEvaluated(u);
			});
		}
	};
})), require_if$1 = /* @__PURE__ */ __commonJSMin(((t) => {
	Object.defineProperty(t, "__esModule", { value: !0 });
	var a = require_codegen$1(), o = require_util$2(), s = {
		keyword: "if",
		schemaType: ["object", "boolean"],
		trackErrors: !0,
		error: {
			message: ({ params: t }) => (0, a.str)`must match "${t.ifClause}" schema`,
			params: ({ params: t }) => (0, a._)`{failingKeyword: ${t.ifClause}}`
		},
		code(t) {
			let { gen: s, parentSchema: l, it: u } = t;
			l.then === void 0 && l.else === void 0 && (0, o.checkStrictMode)(u, "\"if\" without \"then\" and \"else\" is ignored");
			let d = c(u, "then"), f = c(u, "else");
			if (!d && !f) return;
			let p = s.let("valid", !0), m = s.name("_valid");
			if (h(), t.reset(), d && f) {
				let a = s.let("ifClause");
				t.setParams({ ifClause: a }), s.if(m, g("then", a), g("else", a));
			} else d ? s.if(m, g("then")) : s.if((0, a.not)(m), g("else"));
			t.pass(p, () => t.error(!0));
			function h() {
				let a = t.subschema({
					keyword: "if",
					compositeRule: !0,
					createErrors: !1,
					allErrors: !1
				}, m);
				t.mergeEvaluated(a);
			}
			function g(o, c) {
				return () => {
					let l = t.subschema({ keyword: o }, m);
					s.assign(p, m), t.mergeValidEvaluated(l, p), c ? s.assign(c, (0, a._)`${o}`) : t.setParams({ ifClause: o });
				};
			}
		}
	};
	function c(t, a) {
		let s = t.schema[a];
		return s !== void 0 && !(0, o.alwaysValidSchema)(t, s);
	}
	t.default = s;
})), require_thenElse$1 = /* @__PURE__ */ __commonJSMin(((t) => {
	Object.defineProperty(t, "__esModule", { value: !0 });
	var a = require_util$2();
	t.default = {
		keyword: ["then", "else"],
		schemaType: ["object", "boolean"],
		code({ keyword: t, parentSchema: o, it: s }) {
			o.if === void 0 && (0, a.checkStrictMode)(s, `"${t}" without "if" is ignored`);
		}
	};
})), require_applicator$1 = /* @__PURE__ */ __commonJSMin(((t) => {
	Object.defineProperty(t, "__esModule", { value: !0 });
	var a = require_additionalItems$1(), o = require_prefixItems$1(), s = require_items$1(), c = require_items2020$1(), l = require_contains$1(), u = require_dependencies$1(), d = require_propertyNames$1(), f = require_additionalProperties$1(), p = require_properties$1(), m = require_patternProperties$1(), h = require_not$1(), g = require_anyOf$1(), _ = require_oneOf$1(), v = require_allOf$1(), y = require_if$1(), b = require_thenElse$1();
	function x(t = !1) {
		let x = [
			h.default,
			g.default,
			_.default,
			v.default,
			y.default,
			b.default,
			d.default,
			f.default,
			u.default,
			p.default,
			m.default
		];
		return t ? x.push(o.default, c.default) : x.push(a.default, s.default), x.push(l.default), x;
	}
	t.default = x;
})), require_dynamicAnchor = /* @__PURE__ */ __commonJSMin(((t) => {
	Object.defineProperty(t, "__esModule", { value: !0 }), t.dynamicAnchor = void 0;
	var a = require_codegen$1(), o = require_names$1(), s = require_compile$1(), c = require_ref$1(), l = {
		keyword: "$dynamicAnchor",
		schemaType: "string",
		code: (t) => u(t, t.schema)
	};
	function u(t, s) {
		let { gen: c, it: l } = t;
		l.schemaEnv.root.dynamicAnchors[s] = !0;
		let u = (0, a._)`${o.default.dynamicAnchors}${(0, a.getProperty)(s)}`, f = l.errSchemaPath === "#" ? l.validateName : d(t);
		c.if((0, a._)`!${u}`, () => c.assign(u, f));
	}
	t.dynamicAnchor = u;
	function d(t) {
		let { schemaEnv: a, schema: o, self: l } = t.it, { root: u, baseId: d, localRefs: f, meta: p } = a.root, { schemaId: m } = l.opts, h = new s.SchemaEnv({
			schema: o,
			schemaId: m,
			root: u,
			baseId: d,
			localRefs: f,
			meta: p
		});
		return s.compileSchema.call(l, h), (0, c.getValidate)(t, h);
	}
	t.default = l;
})), require_dynamicRef = /* @__PURE__ */ __commonJSMin(((t) => {
	Object.defineProperty(t, "__esModule", { value: !0 }), t.dynamicRef = void 0;
	var a = require_codegen$1(), o = require_names$1(), s = require_ref$1(), c = {
		keyword: "$dynamicRef",
		schemaType: "string",
		code: (t) => l(t, t.schema)
	};
	function l(t, c) {
		let { gen: l, keyword: u, it: d } = t;
		if (c[0] !== "#") throw Error(`"${u}" only supports hash fragment reference`);
		let f = c.slice(1);
		if (d.allErrors) p();
		else {
			let a = l.let("valid", !1);
			p(a), t.ok(a);
		}
		function p(t) {
			if (d.schemaEnv.root.dynamicAnchors[f]) {
				let s = l.let("_v", (0, a._)`${o.default.dynamicAnchors}${(0, a.getProperty)(f)}`);
				l.if(s, m(s, t), m(d.validateName, t));
			} else m(d.validateName, t)();
		}
		function m(a, o) {
			return o ? () => l.block(() => {
				(0, s.callRef)(t, a), l.let(o, !0);
			}) : () => (0, s.callRef)(t, a);
		}
	}
	t.dynamicRef = l, t.default = c;
})), require_recursiveAnchor = /* @__PURE__ */ __commonJSMin(((t) => {
	Object.defineProperty(t, "__esModule", { value: !0 });
	var a = require_dynamicAnchor(), o = require_util$2();
	t.default = {
		keyword: "$recursiveAnchor",
		schemaType: "boolean",
		code(t) {
			t.schema ? (0, a.dynamicAnchor)(t, "") : (0, o.checkStrictMode)(t.it, "$recursiveAnchor: false is ignored");
		}
	};
})), require_recursiveRef = /* @__PURE__ */ __commonJSMin(((t) => {
	Object.defineProperty(t, "__esModule", { value: !0 });
	var a = require_dynamicRef();
	t.default = {
		keyword: "$recursiveRef",
		schemaType: "string",
		code: (t) => (0, a.dynamicRef)(t, t.schema)
	};
})), require_dynamic = /* @__PURE__ */ __commonJSMin(((t) => {
	Object.defineProperty(t, "__esModule", { value: !0 });
	var a = require_dynamicAnchor(), o = require_dynamicRef(), s = require_recursiveAnchor(), c = require_recursiveRef();
	t.default = [
		a.default,
		o.default,
		s.default,
		c.default
	];
})), require_dependentRequired = /* @__PURE__ */ __commonJSMin(((t) => {
	Object.defineProperty(t, "__esModule", { value: !0 });
	var a = require_dependencies$1();
	t.default = {
		keyword: "dependentRequired",
		type: "object",
		schemaType: "object",
		error: a.error,
		code: (t) => (0, a.validatePropertyDeps)(t)
	};
})), require_dependentSchemas = /* @__PURE__ */ __commonJSMin(((t) => {
	Object.defineProperty(t, "__esModule", { value: !0 });
	var a = require_dependencies$1();
	t.default = {
		keyword: "dependentSchemas",
		type: "object",
		schemaType: "object",
		code: (t) => (0, a.validateSchemaDeps)(t)
	};
})), require_limitContains = /* @__PURE__ */ __commonJSMin(((t) => {
	Object.defineProperty(t, "__esModule", { value: !0 });
	var a = require_util$2();
	t.default = {
		keyword: ["maxContains", "minContains"],
		type: "array",
		schemaType: "number",
		code({ keyword: t, parentSchema: o, it: s }) {
			o.contains === void 0 && (0, a.checkStrictMode)(s, `"${t}" without "contains" is ignored`);
		}
	};
})), require_next = /* @__PURE__ */ __commonJSMin(((t) => {
	Object.defineProperty(t, "__esModule", { value: !0 });
	var a = require_dependentRequired(), o = require_dependentSchemas(), s = require_limitContains();
	t.default = [
		a.default,
		o.default,
		s.default
	];
})), require_unevaluatedProperties = /* @__PURE__ */ __commonJSMin(((t) => {
	Object.defineProperty(t, "__esModule", { value: !0 });
	var a = require_codegen$1(), o = require_util$2(), s = require_names$1();
	t.default = {
		keyword: "unevaluatedProperties",
		type: "object",
		schemaType: ["boolean", "object"],
		trackErrors: !0,
		error: {
			message: "must NOT have unevaluated properties",
			params: ({ params: t }) => (0, a._)`{unevaluatedProperty: ${t.unevaluatedProperty}}`
		},
		code(t) {
			let { gen: c, schema: l, data: u, errsCount: d, it: f } = t;
			/* istanbul ignore if */
			if (!d) throw Error("ajv implementation error");
			let { allErrors: p, props: m } = f;
			m instanceof a.Name ? c.if((0, a._)`${m} !== true`, () => c.forIn("key", u, (t) => c.if(g(m, t), () => h(t)))) : m !== !0 && c.forIn("key", u, (t) => m === void 0 ? h(t) : c.if(_(m, t), () => h(t))), f.props = !0, t.ok((0, a._)`${d} === ${s.default.errors}`);
			function h(s) {
				if (l === !1) {
					t.setParams({ unevaluatedProperty: s }), t.error(), p || c.break();
					return;
				}
				if (!(0, o.alwaysValidSchema)(f, l)) {
					let l = c.name("valid");
					t.subschema({
						keyword: "unevaluatedProperties",
						dataProp: s,
						dataPropType: o.Type.Str
					}, l), p || c.if((0, a.not)(l), () => c.break());
				}
			}
			function g(t, o) {
				return (0, a._)`!${t} || !${t}[${o}]`;
			}
			function _(t, o) {
				let s = [];
				for (let c in t) t[c] === !0 && s.push((0, a._)`${o} !== ${c}`);
				return (0, a.and)(...s);
			}
		}
	};
})), require_unevaluatedItems = /* @__PURE__ */ __commonJSMin(((t) => {
	Object.defineProperty(t, "__esModule", { value: !0 });
	var a = require_codegen$1(), o = require_util$2();
	t.default = {
		keyword: "unevaluatedItems",
		type: "array",
		schemaType: ["boolean", "object"],
		error: {
			message: ({ params: { len: t } }) => (0, a.str)`must NOT have more than ${t} items`,
			params: ({ params: { len: t } }) => (0, a._)`{limit: ${t}}`
		},
		code(t) {
			let { gen: s, schema: c, data: l, it: u } = t, d = u.items || 0;
			if (d === !0) return;
			let f = s.const("len", (0, a._)`${l}.length`);
			if (c === !1) t.setParams({ len: d }), t.fail((0, a._)`${f} > ${d}`);
			else if (typeof c == "object" && !(0, o.alwaysValidSchema)(u, c)) {
				let o = s.var("valid", (0, a._)`${f} <= ${d}`);
				s.if((0, a.not)(o), () => p(o, d)), t.ok(o);
			}
			u.items = !0;
			function p(c, l) {
				s.forRange("i", l, f, (l) => {
					t.subschema({
						keyword: "unevaluatedItems",
						dataProp: l,
						dataPropType: o.Type.Num
					}, c), u.allErrors || s.if((0, a.not)(c), () => s.break());
				});
			}
		}
	};
})), require_unevaluated = /* @__PURE__ */ __commonJSMin(((t) => {
	Object.defineProperty(t, "__esModule", { value: !0 });
	var a = require_unevaluatedProperties(), o = require_unevaluatedItems();
	t.default = [a.default, o.default];
})), require_format$3 = /* @__PURE__ */ __commonJSMin(((t) => {
	Object.defineProperty(t, "__esModule", { value: !0 });
	var a = require_codegen$1();
	t.default = {
		keyword: "format",
		type: ["number", "string"],
		schemaType: "string",
		$data: !0,
		error: {
			message: ({ schemaCode: t }) => (0, a.str)`must match format "${t}"`,
			params: ({ schemaCode: t }) => (0, a._)`{format: ${t}}`
		},
		code(t, o) {
			let { gen: s, data: c, $data: l, schema: u, schemaCode: d, it: f } = t, { opts: p, errSchemaPath: m, schemaEnv: h, self: g } = f;
			if (!p.validateFormats) return;
			l ? _() : v();
			function _() {
				let l = s.scopeValue("formats", {
					ref: g.formats,
					code: p.code.formats
				}), u = s.const("fDef", (0, a._)`${l}[${d}]`), f = s.let("fType"), m = s.let("format");
				s.if((0, a._)`typeof ${u} == "object" && !(${u} instanceof RegExp)`, () => s.assign(f, (0, a._)`${u}.type || "string"`).assign(m, (0, a._)`${u}.validate`), () => s.assign(f, (0, a._)`"string"`).assign(m, u)), t.fail$data((0, a.or)(_(), v()));
				function _() {
					return p.strictSchema === !1 ? a.nil : (0, a._)`${d} && !${m}`;
				}
				function v() {
					let t = h.$async ? (0, a._)`(${u}.async ? await ${m}(${c}) : ${m}(${c}))` : (0, a._)`${m}(${c})`, s = (0, a._)`(typeof ${m} == "function" ? ${t} : ${m}.test(${c}))`;
					return (0, a._)`${m} && ${m} !== true && ${f} === ${o} && !${s}`;
				}
			}
			function v() {
				let l = g.formats[u];
				if (!l) {
					v();
					return;
				}
				if (l === !0) return;
				let [d, f, _] = y(l);
				d === o && t.pass(b());
				function v() {
					if (p.strictSchema === !1) {
						g.logger.warn(t());
						return;
					}
					throw Error(t());
					function t() {
						return `unknown format "${u}" ignored in schema at path "${m}"`;
					}
				}
				function y(t) {
					let o = t instanceof RegExp ? (0, a.regexpCode)(t) : p.code.formats ? (0, a._)`${p.code.formats}${(0, a.getProperty)(u)}` : void 0, c = s.scopeValue("formats", {
						key: u,
						ref: t,
						code: o
					});
					return typeof t == "object" && !(t instanceof RegExp) ? [
						t.type || "string",
						t.validate,
						(0, a._)`${c}.validate`
					] : [
						"string",
						t,
						c
					];
				}
				function b() {
					if (typeof l == "object" && !(l instanceof RegExp) && l.async) {
						if (!h.$async) throw Error("async format in sync schema");
						return (0, a._)`await ${_}(${c})`;
					}
					return typeof f == "function" ? (0, a._)`${_}(${c})` : (0, a._)`${_}.test(${c})`;
				}
			}
		}
	};
})), require_format$2 = /* @__PURE__ */ __commonJSMin(((t) => {
	Object.defineProperty(t, "__esModule", { value: !0 }), t.default = [require_format$3().default];
})), require_metadata$1 = /* @__PURE__ */ __commonJSMin(((t) => {
	Object.defineProperty(t, "__esModule", { value: !0 }), t.contentVocabulary = t.metadataVocabulary = void 0, t.metadataVocabulary = [
		"title",
		"description",
		"default",
		"deprecated",
		"readOnly",
		"writeOnly",
		"examples"
	], t.contentVocabulary = [
		"contentMediaType",
		"contentEncoding",
		"contentSchema"
	];
})), require_draft2020 = /* @__PURE__ */ __commonJSMin(((t) => {
	Object.defineProperty(t, "__esModule", { value: !0 });
	var a = require_core$2(), o = require_validation$1(), s = require_applicator$1(), c = require_dynamic(), l = require_next(), u = require_unevaluated(), d = require_format$2(), f = require_metadata$1();
	t.default = [
		c.default,
		a.default,
		o.default,
		(0, s.default)(!0),
		d.default,
		f.metadataVocabulary,
		f.contentVocabulary,
		l.default,
		u.default
	];
})), require_types$1 = /* @__PURE__ */ __commonJSMin(((t) => {
	Object.defineProperty(t, "__esModule", { value: !0 }), t.DiscrError = void 0;
	var a;
	(function(t) {
		t.Tag = "tag", t.Mapping = "mapping";
	})(a || (t.DiscrError = a = {}));
})), require_discriminator$1 = /* @__PURE__ */ __commonJSMin(((t) => {
	Object.defineProperty(t, "__esModule", { value: !0 });
	var a = require_codegen$1(), o = require_types$1(), s = require_compile$1(), c = require_ref_error$1(), l = require_util$2();
	t.default = {
		keyword: "discriminator",
		type: "object",
		schemaType: "object",
		error: {
			message: ({ params: { discrError: t, tagName: a } }) => t === o.DiscrError.Tag ? `tag "${a}" must be string` : `value of tag "${a}" must be in oneOf`,
			params: ({ params: { discrError: t, tag: o, tagName: s } }) => (0, a._)`{error: ${t}, tag: ${s}, tagValue: ${o}}`
		},
		code(t) {
			let { gen: u, data: d, schema: f, parentSchema: p, it: m } = t, { oneOf: h } = p;
			if (!m.opts.discriminator) throw Error("discriminator: requires discriminator option");
			let g = f.propertyName;
			if (typeof g != "string") throw Error("discriminator: requires propertyName");
			if (f.mapping) throw Error("discriminator: mapping is not supported");
			if (!h) throw Error("discriminator: requires oneOf keyword");
			let _ = u.let("valid", !1), v = u.const("tag", (0, a._)`${d}${(0, a.getProperty)(g)}`);
			u.if((0, a._)`typeof ${v} == "string"`, () => y(), () => t.error(!1, {
				discrError: o.DiscrError.Tag,
				tag: v,
				tagName: g
			})), t.ok(_);
			function y() {
				let s = x();
				for (let t in u.if(!1), s) u.elseIf((0, a._)`${v} === ${t}`), u.assign(_, b(s[t]));
				u.else(), t.error(!1, {
					discrError: o.DiscrError.Mapping,
					tag: v,
					tagName: g
				}), u.endIf();
			}
			function b(o) {
				let s = u.name("valid"), c = t.subschema({
					keyword: "oneOf",
					schemaProp: o
				}, s);
				return t.mergeEvaluated(c, a.Name), s;
			}
			function x() {
				let t = {}, a = u(p), o = !0;
				for (let t = 0; t < h.length; t++) {
					let f = h[t];
					if (f?.$ref && !(0, l.schemaHasRulesButRef)(f, m.self.RULES)) {
						let t = f.$ref;
						if (f = s.resolveRef.call(m.self, m.schemaEnv.root, m.baseId, t), f instanceof s.SchemaEnv && (f = f.schema), f === void 0) throw new c.default(m.opts.uriResolver, m.baseId, t);
					}
					let p = f?.properties?.[g];
					if (typeof p != "object") throw Error(`discriminator: oneOf subschemas (or referenced schemas) must have "properties/${g}"`);
					o &&= a || u(f), d(p, t);
				}
				if (!o) throw Error(`discriminator: "${g}" must be required`);
				return t;
				function u({ required: t }) {
					return Array.isArray(t) && t.includes(g);
				}
				function d(t, a) {
					if (t.const) f(t.const, a);
					else if (t.enum) for (let o of t.enum) f(o, a);
					else throw Error(`discriminator: "properties/${g}" must have "const" or "enum"`);
				}
				function f(a, o) {
					if (typeof a != "string" || a in t) throw Error(`discriminator: "${g}" values must be unique strings`);
					t[a] = o;
				}
			}
		}
	};
})), schema_exports = /* @__PURE__ */ __export({
	$comment: () => $comment,
	$dynamicAnchor: () => $dynamicAnchor$7,
	$id: () => $id$9,
	$schema: () => $schema$8,
	$vocabulary: () => $vocabulary$7,
	allOf: () => allOf,
	default: () => schema_default,
	properties: () => properties$9,
	title: () => title$8,
	type: () => type$9
}, 1), $schema$8, $id$9, $vocabulary$7, $dynamicAnchor$7, title$8, allOf, type$9, $comment, properties$9, schema_default, init_schema = __esmMin((() => {
	$schema$8 = "https://json-schema.org/draft/2020-12/schema", $id$9 = "https://json-schema.org/draft/2020-12/schema", $vocabulary$7 = {
		"https://json-schema.org/draft/2020-12/vocab/core": !0,
		"https://json-schema.org/draft/2020-12/vocab/applicator": !0,
		"https://json-schema.org/draft/2020-12/vocab/unevaluated": !0,
		"https://json-schema.org/draft/2020-12/vocab/validation": !0,
		"https://json-schema.org/draft/2020-12/vocab/meta-data": !0,
		"https://json-schema.org/draft/2020-12/vocab/format-annotation": !0,
		"https://json-schema.org/draft/2020-12/vocab/content": !0
	}, $dynamicAnchor$7 = "meta", title$8 = "Core and Validation specifications meta-schema", allOf = [
		{ $ref: "meta/core" },
		{ $ref: "meta/applicator" },
		{ $ref: "meta/unevaluated" },
		{ $ref: "meta/validation" },
		{ $ref: "meta/meta-data" },
		{ $ref: "meta/format-annotation" },
		{ $ref: "meta/content" }
	], type$9 = ["object", "boolean"], $comment = "This meta-schema also defines keywords that have appeared in previous drafts in order to prevent incompatible extensions as they remain in common use.", properties$9 = {
		definitions: {
			$comment: "\"definitions\" has been replaced by \"$defs\".",
			type: "object",
			additionalProperties: { $dynamicRef: "#meta" },
			deprecated: !0,
			default: {}
		},
		dependencies: {
			$comment: "\"dependencies\" has been split and replaced by \"dependentSchemas\" and \"dependentRequired\" in order to serve their differing semantics.",
			type: "object",
			additionalProperties: { anyOf: [{ $dynamicRef: "#meta" }, { $ref: "meta/validation#/$defs/stringArray" }] },
			deprecated: !0,
			default: {}
		},
		$recursiveAnchor: {
			$comment: "\"$recursiveAnchor\" has been replaced by \"$dynamicAnchor\".",
			$ref: "meta/core#/$defs/anchorString",
			deprecated: !0
		},
		$recursiveRef: {
			$comment: "\"$recursiveRef\" has been replaced by \"$dynamicRef\".",
			$ref: "meta/core#/$defs/uriReferenceString",
			deprecated: !0
		}
	}, schema_default = {
		$schema: $schema$8,
		$id: $id$9,
		$vocabulary: $vocabulary$7,
		$dynamicAnchor: $dynamicAnchor$7,
		title: title$8,
		allOf,
		type: type$9,
		$comment,
		properties: properties$9
	};
})), applicator_exports = /* @__PURE__ */ __export({
	$defs: () => $defs$2,
	$dynamicAnchor: () => $dynamicAnchor$6,
	$id: () => $id$8,
	$schema: () => $schema$7,
	$vocabulary: () => $vocabulary$6,
	default: () => applicator_default,
	properties: () => properties$8,
	title: () => title$7,
	type: () => type$8
}, 1), $schema$7, $id$8, $vocabulary$6, $dynamicAnchor$6, title$7, type$8, properties$8, $defs$2, applicator_default, init_applicator = __esmMin((() => {
	$schema$7 = "https://json-schema.org/draft/2020-12/schema", $id$8 = "https://json-schema.org/draft/2020-12/meta/applicator", $vocabulary$6 = { "https://json-schema.org/draft/2020-12/vocab/applicator": !0 }, $dynamicAnchor$6 = "meta", title$7 = "Applicator vocabulary meta-schema", type$8 = ["object", "boolean"], properties$8 = {
		prefixItems: { $ref: "#/$defs/schemaArray" },
		items: { $dynamicRef: "#meta" },
		contains: { $dynamicRef: "#meta" },
		additionalProperties: { $dynamicRef: "#meta" },
		properties: {
			type: "object",
			additionalProperties: { $dynamicRef: "#meta" },
			default: {}
		},
		patternProperties: {
			type: "object",
			additionalProperties: { $dynamicRef: "#meta" },
			propertyNames: { format: "regex" },
			default: {}
		},
		dependentSchemas: {
			type: "object",
			additionalProperties: { $dynamicRef: "#meta" },
			default: {}
		},
		propertyNames: { $dynamicRef: "#meta" },
		if: { $dynamicRef: "#meta" },
		then: { $dynamicRef: "#meta" },
		else: { $dynamicRef: "#meta" },
		allOf: { $ref: "#/$defs/schemaArray" },
		anyOf: { $ref: "#/$defs/schemaArray" },
		oneOf: { $ref: "#/$defs/schemaArray" },
		not: { $dynamicRef: "#meta" }
	}, $defs$2 = { schemaArray: {
		type: "array",
		minItems: 1,
		items: { $dynamicRef: "#meta" }
	} }, applicator_default = {
		$schema: $schema$7,
		$id: $id$8,
		$vocabulary: $vocabulary$6,
		$dynamicAnchor: $dynamicAnchor$6,
		title: title$7,
		type: type$8,
		properties: properties$8,
		$defs: $defs$2
	};
})), unevaluated_exports = /* @__PURE__ */ __export({
	$dynamicAnchor: () => $dynamicAnchor$5,
	$id: () => $id$7,
	$schema: () => $schema$6,
	$vocabulary: () => $vocabulary$5,
	default: () => unevaluated_default,
	properties: () => properties$7,
	title: () => title$6,
	type: () => type$7
}, 1), $schema$6, $id$7, $vocabulary$5, $dynamicAnchor$5, title$6, type$7, properties$7, unevaluated_default, init_unevaluated = __esmMin((() => {
	$schema$6 = "https://json-schema.org/draft/2020-12/schema", $id$7 = "https://json-schema.org/draft/2020-12/meta/unevaluated", $vocabulary$5 = { "https://json-schema.org/draft/2020-12/vocab/unevaluated": !0 }, $dynamicAnchor$5 = "meta", title$6 = "Unevaluated applicator vocabulary meta-schema", type$7 = ["object", "boolean"], properties$7 = {
		unevaluatedItems: { $dynamicRef: "#meta" },
		unevaluatedProperties: { $dynamicRef: "#meta" }
	}, unevaluated_default = {
		$schema: $schema$6,
		$id: $id$7,
		$vocabulary: $vocabulary$5,
		$dynamicAnchor: $dynamicAnchor$5,
		title: title$6,
		type: type$7,
		properties: properties$7
	};
})), content_exports = /* @__PURE__ */ __export({
	$dynamicAnchor: () => $dynamicAnchor$4,
	$id: () => $id$6,
	$schema: () => $schema$5,
	$vocabulary: () => $vocabulary$4,
	default: () => content_default,
	properties: () => properties$6,
	title: () => title$5,
	type: () => type$6
}, 1), $schema$5, $id$6, $vocabulary$4, $dynamicAnchor$4, title$5, type$6, properties$6, content_default, init_content = __esmMin((() => {
	$schema$5 = "https://json-schema.org/draft/2020-12/schema", $id$6 = "https://json-schema.org/draft/2020-12/meta/content", $vocabulary$4 = { "https://json-schema.org/draft/2020-12/vocab/content": !0 }, $dynamicAnchor$4 = "meta", title$5 = "Content vocabulary meta-schema", type$6 = ["object", "boolean"], properties$6 = {
		contentEncoding: { type: "string" },
		contentMediaType: { type: "string" },
		contentSchema: { $dynamicRef: "#meta" }
	}, content_default = {
		$schema: $schema$5,
		$id: $id$6,
		$vocabulary: $vocabulary$4,
		$dynamicAnchor: $dynamicAnchor$4,
		title: title$5,
		type: type$6,
		properties: properties$6
	};
})), core_exports = /* @__PURE__ */ __export({
	$defs: () => $defs$1,
	$dynamicAnchor: () => $dynamicAnchor$3,
	$id: () => $id$5,
	$schema: () => $schema$4,
	$vocabulary: () => $vocabulary$3,
	default: () => core_default,
	properties: () => properties$5,
	title: () => title$4,
	type: () => type$5
}, 1), $schema$4, $id$5, $vocabulary$3, $dynamicAnchor$3, title$4, type$5, properties$5, $defs$1, core_default, init_core = __esmMin((() => {
	$schema$4 = "https://json-schema.org/draft/2020-12/schema", $id$5 = "https://json-schema.org/draft/2020-12/meta/core", $vocabulary$3 = { "https://json-schema.org/draft/2020-12/vocab/core": !0 }, $dynamicAnchor$3 = "meta", title$4 = "Core vocabulary meta-schema", type$5 = ["object", "boolean"], properties$5 = {
		$id: {
			$ref: "#/$defs/uriReferenceString",
			$comment: "Non-empty fragments not allowed.",
			pattern: "^[^#]*#?$"
		},
		$schema: { $ref: "#/$defs/uriString" },
		$ref: { $ref: "#/$defs/uriReferenceString" },
		$anchor: { $ref: "#/$defs/anchorString" },
		$dynamicRef: { $ref: "#/$defs/uriReferenceString" },
		$dynamicAnchor: { $ref: "#/$defs/anchorString" },
		$vocabulary: {
			type: "object",
			propertyNames: { $ref: "#/$defs/uriString" },
			additionalProperties: { type: "boolean" }
		},
		$comment: { type: "string" },
		$defs: {
			type: "object",
			additionalProperties: { $dynamicRef: "#meta" }
		}
	}, $defs$1 = {
		anchorString: {
			type: "string",
			pattern: "^[A-Za-z_][-A-Za-z0-9._]*$"
		},
		uriString: {
			type: "string",
			format: "uri"
		},
		uriReferenceString: {
			type: "string",
			format: "uri-reference"
		}
	}, core_default = {
		$schema: $schema$4,
		$id: $id$5,
		$vocabulary: $vocabulary$3,
		$dynamicAnchor: $dynamicAnchor$3,
		title: title$4,
		type: type$5,
		properties: properties$5,
		$defs: $defs$1
	};
})), format_annotation_exports = /* @__PURE__ */ __export({
	$dynamicAnchor: () => $dynamicAnchor$2,
	$id: () => $id$4,
	$schema: () => $schema$3,
	$vocabulary: () => $vocabulary$2,
	default: () => format_annotation_default,
	properties: () => properties$4,
	title: () => title$3,
	type: () => type$4
}, 1), $schema$3, $id$4, $vocabulary$2, $dynamicAnchor$2, title$3, type$4, properties$4, format_annotation_default, init_format_annotation = __esmMin((() => {
	$schema$3 = "https://json-schema.org/draft/2020-12/schema", $id$4 = "https://json-schema.org/draft/2020-12/meta/format-annotation", $vocabulary$2 = { "https://json-schema.org/draft/2020-12/vocab/format-annotation": !0 }, $dynamicAnchor$2 = "meta", title$3 = "Format vocabulary meta-schema for annotation results", type$4 = ["object", "boolean"], properties$4 = { format: { type: "string" } }, format_annotation_default = {
		$schema: $schema$3,
		$id: $id$4,
		$vocabulary: $vocabulary$2,
		$dynamicAnchor: $dynamicAnchor$2,
		title: title$3,
		type: type$4,
		properties: properties$4
	};
})), meta_data_exports = /* @__PURE__ */ __export({
	$dynamicAnchor: () => $dynamicAnchor$1,
	$id: () => $id$3,
	$schema: () => $schema$2,
	$vocabulary: () => $vocabulary$1,
	default: () => meta_data_default,
	properties: () => properties$3,
	title: () => title$2,
	type: () => type$3
}, 1), $schema$2, $id$3, $vocabulary$1, $dynamicAnchor$1, title$2, type$3, properties$3, meta_data_default, init_meta_data = __esmMin((() => {
	$schema$2 = "https://json-schema.org/draft/2020-12/schema", $id$3 = "https://json-schema.org/draft/2020-12/meta/meta-data", $vocabulary$1 = { "https://json-schema.org/draft/2020-12/vocab/meta-data": !0 }, $dynamicAnchor$1 = "meta", title$2 = "Meta-data vocabulary meta-schema", type$3 = ["object", "boolean"], properties$3 = {
		title: { type: "string" },
		description: { type: "string" },
		default: !0,
		deprecated: {
			type: "boolean",
			default: !1
		},
		readOnly: {
			type: "boolean",
			default: !1
		},
		writeOnly: {
			type: "boolean",
			default: !1
		},
		examples: {
			type: "array",
			items: !0
		}
	}, meta_data_default = {
		$schema: $schema$2,
		$id: $id$3,
		$vocabulary: $vocabulary$1,
		$dynamicAnchor: $dynamicAnchor$1,
		title: title$2,
		type: type$3,
		properties: properties$3
	};
})), validation_exports = /* @__PURE__ */ __export({
	$defs: () => $defs,
	$dynamicAnchor: () => $dynamicAnchor,
	$id: () => $id$2,
	$schema: () => $schema$1,
	$vocabulary: () => $vocabulary,
	default: () => validation_default,
	properties: () => properties$2,
	title: () => title$1,
	type: () => type$2
}, 1), $schema$1, $id$2, $vocabulary, $dynamicAnchor, title$1, type$2, properties$2, $defs, validation_default, init_validation = __esmMin((() => {
	$schema$1 = "https://json-schema.org/draft/2020-12/schema", $id$2 = "https://json-schema.org/draft/2020-12/meta/validation", $vocabulary = { "https://json-schema.org/draft/2020-12/vocab/validation": !0 }, $dynamicAnchor = "meta", title$1 = "Validation vocabulary meta-schema", type$2 = ["object", "boolean"], properties$2 = {
		type: { anyOf: [{ $ref: "#/$defs/simpleTypes" }, {
			type: "array",
			items: { $ref: "#/$defs/simpleTypes" },
			minItems: 1,
			uniqueItems: !0
		}] },
		const: !0,
		enum: {
			type: "array",
			items: !0
		},
		multipleOf: {
			type: "number",
			exclusiveMinimum: 0
		},
		maximum: { type: "number" },
		exclusiveMaximum: { type: "number" },
		minimum: { type: "number" },
		exclusiveMinimum: { type: "number" },
		maxLength: { $ref: "#/$defs/nonNegativeInteger" },
		minLength: { $ref: "#/$defs/nonNegativeIntegerDefault0" },
		pattern: {
			type: "string",
			format: "regex"
		},
		maxItems: { $ref: "#/$defs/nonNegativeInteger" },
		minItems: { $ref: "#/$defs/nonNegativeIntegerDefault0" },
		uniqueItems: {
			type: "boolean",
			default: !1
		},
		maxContains: { $ref: "#/$defs/nonNegativeInteger" },
		minContains: {
			$ref: "#/$defs/nonNegativeInteger",
			default: 1
		},
		maxProperties: { $ref: "#/$defs/nonNegativeInteger" },
		minProperties: { $ref: "#/$defs/nonNegativeIntegerDefault0" },
		required: { $ref: "#/$defs/stringArray" },
		dependentRequired: {
			type: "object",
			additionalProperties: { $ref: "#/$defs/stringArray" }
		}
	}, $defs = {
		nonNegativeInteger: {
			type: "integer",
			minimum: 0
		},
		nonNegativeIntegerDefault0: {
			$ref: "#/$defs/nonNegativeInteger",
			default: 0
		},
		simpleTypes: { enum: [
			"array",
			"boolean",
			"integer",
			"null",
			"number",
			"object",
			"string"
		] },
		stringArray: {
			type: "array",
			items: { type: "string" },
			uniqueItems: !0,
			default: []
		}
	}, validation_default = {
		$schema: $schema$1,
		$id: $id$2,
		$vocabulary,
		$dynamicAnchor,
		title: title$1,
		type: type$2,
		properties: properties$2,
		$defs
	};
})), require_json_schema_2020_12 = /* @__PURE__ */ __commonJSMin(((t) => {
	Object.defineProperty(t, "__esModule", { value: !0 });
	var a = (init_schema(), __toCommonJS(schema_exports).default), o = (init_applicator(), __toCommonJS(applicator_exports).default), s = (init_unevaluated(), __toCommonJS(unevaluated_exports).default), c = (init_content(), __toCommonJS(content_exports).default), l = (init_core(), __toCommonJS(core_exports).default), u = (init_format_annotation(), __toCommonJS(format_annotation_exports).default), d = (init_meta_data(), __toCommonJS(meta_data_exports).default), f = (init_validation(), __toCommonJS(validation_exports).default), p = ["/properties"];
	function m(t) {
		return [
			a,
			o,
			s,
			c,
			l,
			m(this, u),
			d,
			m(this, f)
		].forEach((t) => this.addMetaSchema(t, void 0, !1)), this;
		function m(a, o) {
			return t ? a.$dataMetaSchema(o, p) : o;
		}
	}
	t.default = m;
})), require__2020 = /* @__PURE__ */ __commonJSMin(((t, a) => {
	Object.defineProperty(t, "__esModule", { value: !0 }), t.MissingRefError = t.ValidationError = t.CodeGen = t.Name = t.nil = t.stringify = t.str = t._ = t.KeywordCxt = t.Ajv2020 = void 0;
	var o = require_core$3(), s = require_draft2020(), c = require_discriminator$1(), l = require_json_schema_2020_12(), u = "https://json-schema.org/draft/2020-12/schema", d = class extends o.default {
		constructor(t = {}) {
			super({
				...t,
				dynamicRef: !0,
				next: !0,
				unevaluated: !0
			});
		}
		_addVocabularies() {
			super._addVocabularies(), s.default.forEach((t) => this.addVocabulary(t)), this.opts.discriminator && this.addKeyword(c.default);
		}
		_addDefaultMetaSchema() {
			super._addDefaultMetaSchema();
			let { $data: t, meta: a } = this.opts;
			a && (l.default.call(this, t), this.refs["http://json-schema.org/schema"] = u);
		}
		defaultMeta() {
			return this.opts.defaultMeta = super.defaultMeta() || (this.getSchema(u) ? u : void 0);
		}
	};
	t.Ajv2020 = d, a.exports = t = d, a.exports.Ajv2020 = d, Object.defineProperty(t, "__esModule", { value: !0 }), t.default = d;
	var f = require_validate$1();
	Object.defineProperty(t, "KeywordCxt", {
		enumerable: !0,
		get: function() {
			return f.KeywordCxt;
		}
	});
	var p = require_codegen$1();
	Object.defineProperty(t, "_", {
		enumerable: !0,
		get: function() {
			return p._;
		}
	}), Object.defineProperty(t, "str", {
		enumerable: !0,
		get: function() {
			return p.str;
		}
	}), Object.defineProperty(t, "stringify", {
		enumerable: !0,
		get: function() {
			return p.stringify;
		}
	}), Object.defineProperty(t, "nil", {
		enumerable: !0,
		get: function() {
			return p.nil;
		}
	}), Object.defineProperty(t, "Name", {
		enumerable: !0,
		get: function() {
			return p.Name;
		}
	}), Object.defineProperty(t, "CodeGen", {
		enumerable: !0,
		get: function() {
			return p.CodeGen;
		}
	});
	var m = require_validation_error$1();
	Object.defineProperty(t, "ValidationError", {
		enumerable: !0,
		get: function() {
			return m.default;
		}
	});
	var h = require_ref_error$1();
	Object.defineProperty(t, "MissingRefError", {
		enumerable: !0,
		get: function() {
			return h.default;
		}
	});
})), require_formats = /* @__PURE__ */ __commonJSMin(((t) => {
	Object.defineProperty(t, "__esModule", { value: !0 }), t.formatNames = t.fastFormats = t.fullFormats = void 0;
	function a(t, a) {
		return {
			validate: t,
			compare: a
		};
	}
	t.fullFormats = {
		date: a(l, u),
		time: a(f(!0), p),
		"date-time": a(g(!0), _),
		"iso-time": a(f(), m),
		"iso-date-time": a(g(), v),
		duration: /^P(?!$)((\d+Y)?(\d+M)?(\d+D)?(T(?=\d)(\d+H)?(\d+M)?(\d+S)?)?|(\d+W)?)$/,
		uri: x,
		"uri-reference": /^(?:[a-z][a-z0-9+\-.]*:)?(?:\/?\/(?:(?:[a-z0-9\-._~!$&'()*+,;=:]|%[0-9a-f]{2})*@)?(?:\[(?:(?:(?:(?:[0-9a-f]{1,4}:){6}|::(?:[0-9a-f]{1,4}:){5}|(?:[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){4}|(?:(?:[0-9a-f]{1,4}:){0,1}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){3}|(?:(?:[0-9a-f]{1,4}:){0,2}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){2}|(?:(?:[0-9a-f]{1,4}:){0,3}[0-9a-f]{1,4})?::[0-9a-f]{1,4}:|(?:(?:[0-9a-f]{1,4}:){0,4}[0-9a-f]{1,4})?::)(?:[0-9a-f]{1,4}:[0-9a-f]{1,4}|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?))|(?:(?:[0-9a-f]{1,4}:){0,5}[0-9a-f]{1,4})?::[0-9a-f]{1,4}|(?:(?:[0-9a-f]{1,4}:){0,6}[0-9a-f]{1,4})?::)|[Vv][0-9a-f]+\.[a-z0-9\-._~!$&'()*+,;=:]+)\]|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)|(?:[a-z0-9\-._~!$&'"()*+,;=]|%[0-9a-f]{2})*)(?::\d*)?(?:\/(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})*)*|\/(?:(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})*)*)?|(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})*)*)?(?:\?(?:[a-z0-9\-._~!$&'"()*+,;=:@/?]|%[0-9a-f]{2})*)?(?:#(?:[a-z0-9\-._~!$&'"()*+,;=:@/?]|%[0-9a-f]{2})*)?$/i,
		"uri-template": /^(?:(?:[^\x00-\x20"'<>%\\^`{|}]|%[0-9a-f]{2})|\{[+#./;?&=,!@|]?(?:[a-z0-9_]|%[0-9a-f]{2})+(?::[1-9][0-9]{0,3}|\*)?(?:,(?:[a-z0-9_]|%[0-9a-f]{2})+(?::[1-9][0-9]{0,3}|\*)?)*\})*$/i,
		url: /^(?:https?|ftp):\/\/(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z0-9\u{00a1}-\u{ffff}]+-)*[a-z0-9\u{00a1}-\u{ffff}]+)(?:\.(?:[a-z0-9\u{00a1}-\u{ffff}]+-)*[a-z0-9\u{00a1}-\u{ffff}]+)*(?:\.(?:[a-z\u{00a1}-\u{ffff}]{2,})))(?::\d{2,5})?(?:\/[^\s]*)?$/iu,
		email: /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i,
		hostname: /^(?=.{1,253}\.?$)[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[-0-9a-z]{0,61}[0-9a-z])?)*\.?$/i,
		ipv4: /^(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)\.){3}(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)$/,
		ipv6: /^((([0-9a-f]{1,4}:){7}([0-9a-f]{1,4}|:))|(([0-9a-f]{1,4}:){6}(:[0-9a-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9a-f]{1,4}:){5}(((:[0-9a-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9a-f]{1,4}:){4}(((:[0-9a-f]{1,4}){1,3})|((:[0-9a-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9a-f]{1,4}:){3}(((:[0-9a-f]{1,4}){1,4})|((:[0-9a-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9a-f]{1,4}:){2}(((:[0-9a-f]{1,4}){1,5})|((:[0-9a-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9a-f]{1,4}:){1}(((:[0-9a-f]{1,4}){1,6})|((:[0-9a-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9a-f]{1,4}){1,7})|((:[0-9a-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))$/i,
		regex: A,
		uuid: /^(?:urn:uuid:)?[0-9a-f]{8}-(?:[0-9a-f]{4}-){3}[0-9a-f]{12}$/i,
		"json-pointer": /^(?:\/(?:[^~/]|~0|~1)*)*$/,
		"json-pointer-uri-fragment": /^#(?:\/(?:[a-z0-9_\-.!$&'()*+,;:=@]|%[0-9a-f]{2}|~0|~1)*)*$/i,
		"relative-json-pointer": /^(?:0|[1-9][0-9]*)(?:#|(?:\/(?:[^~/]|~0|~1)*)*)$/,
		byte: C,
		int32: {
			type: "number",
			validate: E
		},
		int64: {
			type: "number",
			validate: D
		},
		float: {
			type: "number",
			validate: O
		},
		double: {
			type: "number",
			validate: O
		},
		password: !0,
		binary: !0
	}, t.fastFormats = {
		...t.fullFormats,
		date: a(/^\d\d\d\d-[0-1]\d-[0-3]\d$/, u),
		time: a(/^(?:[0-2]\d:[0-5]\d:[0-5]\d|23:59:60)(?:\.\d+)?(?:z|[+-]\d\d(?::?\d\d)?)$/i, p),
		"date-time": a(/^\d\d\d\d-[0-1]\d-[0-3]\dt(?:[0-2]\d:[0-5]\d:[0-5]\d|23:59:60)(?:\.\d+)?(?:z|[+-]\d\d(?::?\d\d)?)$/i, _),
		"iso-time": a(/^(?:[0-2]\d:[0-5]\d:[0-5]\d|23:59:60)(?:\.\d+)?(?:z|[+-]\d\d(?::?\d\d)?)?$/i, m),
		"iso-date-time": a(/^\d\d\d\d-[0-1]\d-[0-3]\d[t\s](?:[0-2]\d:[0-5]\d:[0-5]\d|23:59:60)(?:\.\d+)?(?:z|[+-]\d\d(?::?\d\d)?)?$/i, v),
		uri: /^(?:[a-z][a-z0-9+\-.]*:)(?:\/?\/)?[^\s]*$/i,
		"uri-reference": /^(?:(?:[a-z][a-z0-9+\-.]*:)?\/?\/)?(?:[^\\\s#][^\s#]*)?(?:#[^\\\s]*)?$/i,
		email: /^[a-z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?)*$/i
	}, t.formatNames = Object.keys(t.fullFormats);
	function o(t) {
		return t % 4 == 0 && (t % 100 != 0 || t % 400 == 0);
	}
	var s = /^(\d\d\d\d)-(\d\d)-(\d\d)$/, c = [
		0,
		31,
		28,
		31,
		30,
		31,
		30,
		31,
		31,
		30,
		31,
		30,
		31
	];
	function l(t) {
		let a = s.exec(t);
		if (!a) return !1;
		let l = +a[1], u = +a[2], d = +a[3];
		return u >= 1 && u <= 12 && d >= 1 && d <= (u === 2 && o(l) ? 29 : c[u]);
	}
	function u(t, a) {
		if (t && a) return t > a ? 1 : t < a ? -1 : 0;
	}
	var d = /^(\d\d):(\d\d):(\d\d(?:\.\d+)?)(z|([+-])(\d\d)(?::?(\d\d))?)?$/i;
	function f(t) {
		return function(a) {
			let o = d.exec(a);
			if (!o) return !1;
			let s = +o[1], c = +o[2], l = +o[3], u = o[4], f = o[5] === "-" ? -1 : 1, p = +(o[6] || 0), m = +(o[7] || 0);
			if (p > 23 || m > 59 || t && !u) return !1;
			if (s <= 23 && c <= 59 && l < 60) return !0;
			let h = c - m * f, g = s - p * f - (h < 0 ? 1 : 0);
			return (g === 23 || g === -1) && (h === 59 || h === -1) && l < 61;
		};
	}
	function p(t, a) {
		if (!(t && a)) return;
		let o = (/* @__PURE__ */ new Date("2020-01-01T" + t)).valueOf(), s = (/* @__PURE__ */ new Date("2020-01-01T" + a)).valueOf();
		if (o && s) return o - s;
	}
	function m(t, a) {
		if (!(t && a)) return;
		let o = d.exec(t), s = d.exec(a);
		if (o && s) return t = o[1] + o[2] + o[3], a = s[1] + s[2] + s[3], t > a ? 1 : t < a ? -1 : 0;
	}
	var h = /t|\s/i;
	function g(t) {
		let a = f(t);
		return function(t) {
			let o = t.split(h);
			return o.length === 2 && l(o[0]) && a(o[1]);
		};
	}
	function _(t, a) {
		if (!(t && a)) return;
		let o = new Date(t).valueOf(), s = new Date(a).valueOf();
		if (o && s) return o - s;
	}
	function v(t, a) {
		if (!(t && a)) return;
		let [o, s] = t.split(h), [c, l] = a.split(h), d = u(o, c);
		if (d !== void 0) return d || p(s, l);
	}
	var y = /\/|:/, b = /^(?:[a-z][a-z0-9+\-.]*:)(?:\/?\/(?:(?:[a-z0-9\-._~!$&'()*+,;=:]|%[0-9a-f]{2})*@)?(?:\[(?:(?:(?:(?:[0-9a-f]{1,4}:){6}|::(?:[0-9a-f]{1,4}:){5}|(?:[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){4}|(?:(?:[0-9a-f]{1,4}:){0,1}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){3}|(?:(?:[0-9a-f]{1,4}:){0,2}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){2}|(?:(?:[0-9a-f]{1,4}:){0,3}[0-9a-f]{1,4})?::[0-9a-f]{1,4}:|(?:(?:[0-9a-f]{1,4}:){0,4}[0-9a-f]{1,4})?::)(?:[0-9a-f]{1,4}:[0-9a-f]{1,4}|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?))|(?:(?:[0-9a-f]{1,4}:){0,5}[0-9a-f]{1,4})?::[0-9a-f]{1,4}|(?:(?:[0-9a-f]{1,4}:){0,6}[0-9a-f]{1,4})?::)|[Vv][0-9a-f]+\.[a-z0-9\-._~!$&'()*+,;=:]+)\]|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)|(?:[a-z0-9\-._~!$&'()*+,;=]|%[0-9a-f]{2})*)(?::\d*)?(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*|\/(?:(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*)?|(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*)(?:\?(?:[a-z0-9\-._~!$&'()*+,;=:@/?]|%[0-9a-f]{2})*)?(?:#(?:[a-z0-9\-._~!$&'()*+,;=:@/?]|%[0-9a-f]{2})*)?$/i;
	function x(t) {
		return y.test(t) && b.test(t);
	}
	var S = /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/gm;
	function C(t) {
		return S.lastIndex = 0, S.test(t);
	}
	var w = -(2 ** 31), T = 2 ** 31 - 1;
	function E(t) {
		return Number.isInteger(t) && t <= T && t >= w;
	}
	function D(t) {
		return Number.isInteger(t);
	}
	function O() {
		return !0;
	}
	var k = /[^\\]\\Z/;
	function A(t) {
		if (k.test(t)) return !1;
		try {
			return new RegExp(t), !0;
		} catch {
			return !1;
		}
	}
})), require_code$1 = /* @__PURE__ */ __commonJSMin(((t) => {
	Object.defineProperty(t, "__esModule", { value: !0 }), t.regexpCode = t.getEsmExportName = t.getProperty = t.safeStringify = t.stringify = t.strConcat = t.addCodeArg = t.str = t._ = t.nil = t._Code = t.Name = t.IDENTIFIER = t._CodeOrName = void 0;
	var a = class {};
	t._CodeOrName = a, t.IDENTIFIER = /^[a-z$_][a-z$_0-9]*$/i;
	var o = class extends a {
		constructor(a) {
			if (super(), !t.IDENTIFIER.test(a)) throw Error("CodeGen: name must be a valid identifier");
			this.str = a;
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
	};
	t.Name = o;
	var s = class extends a {
		constructor(t) {
			super(), this._items = typeof t == "string" ? [t] : t;
		}
		toString() {
			return this.str;
		}
		emptyStr() {
			if (this._items.length > 1) return !1;
			let t = this._items[0];
			return t === "" || t === "\"\"";
		}
		get str() {
			return this._str ??= this._items.reduce((t, a) => `${t}${a}`, "");
		}
		get names() {
			return this._names ??= this._items.reduce((t, a) => (a instanceof o && (t[a.str] = (t[a.str] || 0) + 1), t), {});
		}
	};
	t._Code = s, t.nil = new s("");
	function c(t, ...a) {
		let o = [t[0]], c = 0;
		for (; c < a.length;) d(o, a[c]), o.push(t[++c]);
		return new s(o);
	}
	t._ = c;
	var l = new s("+");
	function u(t, ...a) {
		let o = [_(t[0])], c = 0;
		for (; c < a.length;) o.push(l), d(o, a[c]), o.push(l, _(t[++c]));
		return f(o), new s(o);
	}
	t.str = u;
	function d(t, a) {
		a instanceof s ? t.push(...a._items) : a instanceof o ? t.push(a) : t.push(h(a));
	}
	t.addCodeArg = d;
	function f(t) {
		let a = 1;
		for (; a < t.length - 1;) {
			if (t[a] === l) {
				let o = p(t[a - 1], t[a + 1]);
				if (o !== void 0) {
					t.splice(a - 1, 3, o);
					continue;
				}
				t[a++] = "+";
			}
			a++;
		}
	}
	function p(t, a) {
		if (a === "\"\"") return t;
		if (t === "\"\"") return a;
		if (typeof t == "string") return a instanceof o || t[t.length - 1] !== "\"" ? void 0 : typeof a == "string" ? a[0] === "\"" ? t.slice(0, -1) + a.slice(1) : void 0 : `${t.slice(0, -1)}${a}"`;
		if (typeof a == "string" && a[0] === "\"" && !(t instanceof o)) return `"${t}${a.slice(1)}`;
	}
	function m(t, a) {
		return a.emptyStr() ? t : t.emptyStr() ? a : u`${t}${a}`;
	}
	t.strConcat = m;
	function h(t) {
		return typeof t == "number" || typeof t == "boolean" || t === null ? t : _(Array.isArray(t) ? t.join(",") : t);
	}
	function g(t) {
		return new s(_(t));
	}
	t.stringify = g;
	function _(t) {
		return JSON.stringify(t).replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029");
	}
	t.safeStringify = _;
	function v(a) {
		return typeof a == "string" && t.IDENTIFIER.test(a) ? new s(`.${a}`) : c`[${a}]`;
	}
	t.getProperty = v;
	function y(a) {
		if (typeof a == "string" && t.IDENTIFIER.test(a)) return new s(`${a}`);
		throw Error(`CodeGen: invalid export name: ${a}, use explicit $id name mapping`);
	}
	t.getEsmExportName = y;
	function b(t) {
		return new s(t.toString());
	}
	t.regexpCode = b;
})), require_scope = /* @__PURE__ */ __commonJSMin(((t) => {
	Object.defineProperty(t, "__esModule", { value: !0 }), t.ValueScope = t.ValueScopeName = t.Scope = t.varKinds = t.UsedValueState = void 0;
	var a = require_code$1(), o = class extends Error {
		constructor(t) {
			super(`CodeGen: "code" for ${t} not defined`), this.value = t.value;
		}
	}, s;
	(function(t) {
		t[t.Started = 0] = "Started", t[t.Completed = 1] = "Completed";
	})(s || (t.UsedValueState = s = {})), t.varKinds = {
		const: new a.Name("const"),
		let: new a.Name("let"),
		var: new a.Name("var")
	};
	var c = class {
		constructor({ prefixes: t, parent: a } = {}) {
			this._names = {}, this._prefixes = t, this._parent = a;
		}
		toName(t) {
			return t instanceof a.Name ? t : this.name(t);
		}
		name(t) {
			return new a.Name(this._newName(t));
		}
		_newName(t) {
			let a = this._names[t] || this._nameGroup(t);
			return `${t}${a.index++}`;
		}
		_nameGroup(t) {
			if ((this._parent?._prefixes)?.has(t) || this._prefixes && !this._prefixes.has(t)) throw Error(`CodeGen: prefix "${t}" is not allowed in this scope`);
			return this._names[t] = {
				prefix: t,
				index: 0
			};
		}
	};
	t.Scope = c;
	var l = class extends a.Name {
		constructor(t, a) {
			super(a), this.prefix = t;
		}
		setValue(t, { property: o, itemIndex: s }) {
			this.value = t, this.scopePath = (0, a._)`.${new a.Name(o)}[${s}]`;
		}
	};
	t.ValueScopeName = l;
	var u = (0, a._)`\n`;
	t.ValueScope = class extends c {
		constructor(t) {
			super(t), this._values = {}, this._scope = t.scope, this.opts = {
				...t,
				_n: t.lines ? u : a.nil
			};
		}
		get() {
			return this._scope;
		}
		name(t) {
			return new l(t, this._newName(t));
		}
		value(t, a) {
			if (a.ref === void 0) throw Error("CodeGen: ref must be passed in value");
			let o = this.toName(t), { prefix: s } = o, c = a.key ?? a.ref, l = this._values[s];
			if (l) {
				let t = l.get(c);
				if (t) return t;
			} else l = this._values[s] = /* @__PURE__ */ new Map();
			l.set(c, o);
			let u = this._scope[s] || (this._scope[s] = []), d = u.length;
			return u[d] = a.ref, o.setValue(a, {
				property: s,
				itemIndex: d
			}), o;
		}
		getValue(t, a) {
			let o = this._values[t];
			if (o) return o.get(a);
		}
		scopeRefs(t, o = this._values) {
			return this._reduceValues(o, (o) => {
				if (o.scopePath === void 0) throw Error(`CodeGen: name "${o}" has no value`);
				return (0, a._)`${t}${o.scopePath}`;
			});
		}
		scopeCode(t = this._values, a, o) {
			return this._reduceValues(t, (t) => {
				if (t.value === void 0) throw Error(`CodeGen: name "${t}" has no value`);
				return t.value.code;
			}, a, o);
		}
		_reduceValues(c, l, u = {}, d) {
			let f = a.nil;
			for (let p in c) {
				let m = c[p];
				if (!m) continue;
				let h = u[p] = u[p] || /* @__PURE__ */ new Map();
				m.forEach((c) => {
					if (h.has(c)) return;
					h.set(c, s.Started);
					let u = l(c);
					if (u) {
						let o = this.opts.es5 ? t.varKinds.var : t.varKinds.const;
						f = (0, a._)`${f}${o} ${c} = ${u};${this.opts._n}`;
					} else if (u = d?.(c)) f = (0, a._)`${f}${u}${this.opts._n}`;
					else throw new o(c);
					h.set(c, s.Completed);
				});
			}
			return f;
		}
	};
})), require_codegen = /* @__PURE__ */ __commonJSMin(((t) => {
	Object.defineProperty(t, "__esModule", { value: !0 }), t.or = t.and = t.not = t.CodeGen = t.operators = t.varKinds = t.ValueScopeName = t.ValueScope = t.Scope = t.Name = t.regexpCode = t.stringify = t.getProperty = t.nil = t.strConcat = t.str = t._ = void 0;
	var a = require_code$1(), o = require_scope(), s = require_code$1();
	Object.defineProperty(t, "_", {
		enumerable: !0,
		get: function() {
			return s._;
		}
	}), Object.defineProperty(t, "str", {
		enumerable: !0,
		get: function() {
			return s.str;
		}
	}), Object.defineProperty(t, "strConcat", {
		enumerable: !0,
		get: function() {
			return s.strConcat;
		}
	}), Object.defineProperty(t, "nil", {
		enumerable: !0,
		get: function() {
			return s.nil;
		}
	}), Object.defineProperty(t, "getProperty", {
		enumerable: !0,
		get: function() {
			return s.getProperty;
		}
	}), Object.defineProperty(t, "stringify", {
		enumerable: !0,
		get: function() {
			return s.stringify;
		}
	}), Object.defineProperty(t, "regexpCode", {
		enumerable: !0,
		get: function() {
			return s.regexpCode;
		}
	}), Object.defineProperty(t, "Name", {
		enumerable: !0,
		get: function() {
			return s.Name;
		}
	});
	var c = require_scope();
	Object.defineProperty(t, "Scope", {
		enumerable: !0,
		get: function() {
			return c.Scope;
		}
	}), Object.defineProperty(t, "ValueScope", {
		enumerable: !0,
		get: function() {
			return c.ValueScope;
		}
	}), Object.defineProperty(t, "ValueScopeName", {
		enumerable: !0,
		get: function() {
			return c.ValueScopeName;
		}
	}), Object.defineProperty(t, "varKinds", {
		enumerable: !0,
		get: function() {
			return c.varKinds;
		}
	}), t.operators = {
		GT: new a._Code(">"),
		GTE: new a._Code(">="),
		LT: new a._Code("<"),
		LTE: new a._Code("<="),
		EQ: new a._Code("==="),
		NEQ: new a._Code("!=="),
		NOT: new a._Code("!"),
		OR: new a._Code("||"),
		AND: new a._Code("&&"),
		ADD: new a._Code("+")
	};
	var l = class {
		optimizeNodes() {
			return this;
		}
		optimizeNames(t, a) {
			return this;
		}
	}, u = class extends l {
		constructor(t, a, o) {
			super(), this.varKind = t, this.name = a, this.rhs = o;
		}
		render({ es5: t, _n: a }) {
			let s = t ? o.varKinds.var : this.varKind, c = this.rhs === void 0 ? "" : ` = ${this.rhs}`;
			return `${s} ${this.name}${c};` + a;
		}
		optimizeNames(t, a) {
			if (t[this.name.str]) return this.rhs &&= N(this.rhs, t, a), this;
		}
		get names() {
			return this.rhs instanceof a._CodeOrName ? this.rhs.names : {};
		}
	}, d = class extends l {
		constructor(t, a, o) {
			super(), this.lhs = t, this.rhs = a, this.sideEffects = o;
		}
		render({ _n: t }) {
			return `${this.lhs} = ${this.rhs};` + t;
		}
		optimizeNames(t, o) {
			if (!(this.lhs instanceof a.Name && !t[this.lhs.str] && !this.sideEffects)) return this.rhs = N(this.rhs, t, o), this;
		}
		get names() {
			return M(this.lhs instanceof a.Name ? {} : { ...this.lhs.names }, this.rhs);
		}
	}, f = class extends d {
		constructor(t, a, o, s) {
			super(t, o, s), this.op = a;
		}
		render({ _n: t }) {
			return `${this.lhs} ${this.op}= ${this.rhs};` + t;
		}
	}, p = class extends l {
		constructor(t) {
			super(), this.label = t, this.names = {};
		}
		render({ _n: t }) {
			return `${this.label}:` + t;
		}
	}, m = class extends l {
		constructor(t) {
			super(), this.label = t, this.names = {};
		}
		render({ _n: t }) {
			return `break${this.label ? ` ${this.label}` : ""};` + t;
		}
	}, h = class extends l {
		constructor(t) {
			super(), this.error = t;
		}
		render({ _n: t }) {
			return `throw ${this.error};` + t;
		}
		get names() {
			return this.error.names;
		}
	}, g = class extends l {
		constructor(t) {
			super(), this.code = t;
		}
		render({ _n: t }) {
			return `${this.code};` + t;
		}
		optimizeNodes() {
			return `${this.code}` ? this : void 0;
		}
		optimizeNames(t, a) {
			return this.code = N(this.code, t, a), this;
		}
		get names() {
			return this.code instanceof a._CodeOrName ? this.code.names : {};
		}
	}, _ = class extends l {
		constructor(t = []) {
			super(), this.nodes = t;
		}
		render(t) {
			return this.nodes.reduce((a, o) => a + o.render(t), "");
		}
		optimizeNodes() {
			let { nodes: t } = this, a = t.length;
			for (; a--;) {
				let o = t[a].optimizeNodes();
				Array.isArray(o) ? t.splice(a, 1, ...o) : o ? t[a] = o : t.splice(a, 1);
			}
			return t.length > 0 ? this : void 0;
		}
		optimizeNames(t, a) {
			let { nodes: o } = this, s = o.length;
			for (; s--;) {
				let c = o[s];
				c.optimizeNames(t, a) || (P(t, c.names), o.splice(s, 1));
			}
			return o.length > 0 ? this : void 0;
		}
		get names() {
			return this.nodes.reduce((t, a) => j(t, a.names), {});
		}
	}, v = class extends _ {
		render(t) {
			return "{" + t._n + super.render(t) + "}" + t._n;
		}
	}, y = class extends _ {}, b = class extends v {};
	b.kind = "else";
	var x = class t extends v {
		constructor(t, a) {
			super(a), this.condition = t;
		}
		render(t) {
			let a = `if(${this.condition})` + super.render(t);
			return this.else && (a += "else " + this.else.render(t)), a;
		}
		optimizeNodes() {
			super.optimizeNodes();
			let a = this.condition;
			if (a === !0) return this.nodes;
			let o = this.else;
			if (o) {
				let t = o.optimizeNodes();
				o = this.else = Array.isArray(t) ? new b(t) : t;
			}
			if (o) return a === !1 ? o instanceof t ? o : o.nodes : this.nodes.length ? this : new t(F(a), o instanceof t ? [o] : o.nodes);
			if (!(a === !1 || !this.nodes.length)) return this;
		}
		optimizeNames(t, a) {
			if (this.else = this.else?.optimizeNames(t, a), super.optimizeNames(t, a) || this.else) return this.condition = N(this.condition, t, a), this;
		}
		get names() {
			let t = super.names;
			return M(t, this.condition), this.else && j(t, this.else.names), t;
		}
	};
	x.kind = "if";
	var S = class extends v {};
	S.kind = "for";
	var C = class extends S {
		constructor(t) {
			super(), this.iteration = t;
		}
		render(t) {
			return `for(${this.iteration})` + super.render(t);
		}
		optimizeNames(t, a) {
			if (super.optimizeNames(t, a)) return this.iteration = N(this.iteration, t, a), this;
		}
		get names() {
			return j(super.names, this.iteration.names);
		}
	}, w = class extends S {
		constructor(t, a, o, s) {
			super(), this.varKind = t, this.name = a, this.from = o, this.to = s;
		}
		render(t) {
			let a = t.es5 ? o.varKinds.var : this.varKind, { name: s, from: c, to: l } = this;
			return `for(${a} ${s}=${c}; ${s}<${l}; ${s}++)` + super.render(t);
		}
		get names() {
			return M(M(super.names, this.from), this.to);
		}
	}, T = class extends S {
		constructor(t, a, o, s) {
			super(), this.loop = t, this.varKind = a, this.name = o, this.iterable = s;
		}
		render(t) {
			return `for(${this.varKind} ${this.name} ${this.loop} ${this.iterable})` + super.render(t);
		}
		optimizeNames(t, a) {
			if (super.optimizeNames(t, a)) return this.iterable = N(this.iterable, t, a), this;
		}
		get names() {
			return j(super.names, this.iterable.names);
		}
	}, E = class extends v {
		constructor(t, a, o) {
			super(), this.name = t, this.args = a, this.async = o;
		}
		render(t) {
			return `${this.async ? "async " : ""}function ${this.name}(${this.args})` + super.render(t);
		}
	};
	E.kind = "func";
	var D = class extends _ {
		render(t) {
			return "return " + super.render(t);
		}
	};
	D.kind = "return";
	var O = class extends v {
		render(t) {
			let a = "try" + super.render(t);
			return this.catch && (a += this.catch.render(t)), this.finally && (a += this.finally.render(t)), a;
		}
		optimizeNodes() {
			var t, a;
			return super.optimizeNodes(), (t = this.catch) == null || t.optimizeNodes(), (a = this.finally) == null || a.optimizeNodes(), this;
		}
		optimizeNames(t, a) {
			var o, s;
			return super.optimizeNames(t, a), (o = this.catch) == null || o.optimizeNames(t, a), (s = this.finally) == null || s.optimizeNames(t, a), this;
		}
		get names() {
			let t = super.names;
			return this.catch && j(t, this.catch.names), this.finally && j(t, this.finally.names), t;
		}
	}, k = class extends v {
		constructor(t) {
			super(), this.error = t;
		}
		render(t) {
			return `catch(${this.error})` + super.render(t);
		}
	};
	k.kind = "catch";
	var A = class extends v {
		render(t) {
			return "finally" + super.render(t);
		}
	};
	A.kind = "finally", t.CodeGen = class {
		constructor(t, a = {}) {
			this._values = {}, this._blockStarts = [], this._constants = {}, this.opts = {
				...a,
				_n: a.lines ? "\n" : ""
			}, this._extScope = t, this._scope = new o.Scope({ parent: t }), this._nodes = [new y()];
		}
		toString() {
			return this._root.render(this.opts);
		}
		name(t) {
			return this._scope.name(t);
		}
		scopeName(t) {
			return this._extScope.name(t);
		}
		scopeValue(t, a) {
			let o = this._extScope.value(t, a);
			return (this._values[o.prefix] || (this._values[o.prefix] = /* @__PURE__ */ new Set())).add(o), o;
		}
		getScopeValue(t, a) {
			return this._extScope.getValue(t, a);
		}
		scopeRefs(t) {
			return this._extScope.scopeRefs(t, this._values);
		}
		scopeCode() {
			return this._extScope.scopeCode(this._values);
		}
		_def(t, a, o, s) {
			let c = this._scope.toName(a);
			return o !== void 0 && s && (this._constants[c.str] = o), this._leafNode(new u(t, c, o)), c;
		}
		const(t, a, s) {
			return this._def(o.varKinds.const, t, a, s);
		}
		let(t, a, s) {
			return this._def(o.varKinds.let, t, a, s);
		}
		var(t, a, s) {
			return this._def(o.varKinds.var, t, a, s);
		}
		assign(t, a, o) {
			return this._leafNode(new d(t, a, o));
		}
		add(a, o) {
			return this._leafNode(new f(a, t.operators.ADD, o));
		}
		code(t) {
			return typeof t == "function" ? t() : t !== a.nil && this._leafNode(new g(t)), this;
		}
		object(...t) {
			let o = ["{"];
			for (let [s, c] of t) o.length > 1 && o.push(","), o.push(s), (s !== c || this.opts.es5) && (o.push(":"), (0, a.addCodeArg)(o, c));
			return o.push("}"), new a._Code(o);
		}
		if(t, a, o) {
			if (this._blockNode(new x(t)), a && o) this.code(a).else().code(o).endIf();
			else if (a) this.code(a).endIf();
			else if (o) throw Error("CodeGen: \"else\" body without \"then\" body");
			return this;
		}
		elseIf(t) {
			return this._elseNode(new x(t));
		}
		else() {
			return this._elseNode(new b());
		}
		endIf() {
			return this._endBlockNode(x, b);
		}
		_for(t, a) {
			return this._blockNode(t), a && this.code(a).endFor(), this;
		}
		for(t, a) {
			return this._for(new C(t), a);
		}
		forRange(t, a, s, c, l = this.opts.es5 ? o.varKinds.var : o.varKinds.let) {
			let u = this._scope.toName(t);
			return this._for(new w(l, u, a, s), () => c(u));
		}
		forOf(t, s, c, l = o.varKinds.const) {
			let u = this._scope.toName(t);
			if (this.opts.es5) {
				let t = s instanceof a.Name ? s : this.var("_arr", s);
				return this.forRange("_i", 0, (0, a._)`${t}.length`, (o) => {
					this.var(u, (0, a._)`${t}[${o}]`), c(u);
				});
			}
			return this._for(new T("of", l, u, s), () => c(u));
		}
		forIn(t, s, c, l = this.opts.es5 ? o.varKinds.var : o.varKinds.const) {
			if (this.opts.ownProperties) return this.forOf(t, (0, a._)`Object.keys(${s})`, c);
			let u = this._scope.toName(t);
			return this._for(new T("in", l, u, s), () => c(u));
		}
		endFor() {
			return this._endBlockNode(S);
		}
		label(t) {
			return this._leafNode(new p(t));
		}
		break(t) {
			return this._leafNode(new m(t));
		}
		return(t) {
			let a = new D();
			if (this._blockNode(a), this.code(t), a.nodes.length !== 1) throw Error("CodeGen: \"return\" should have one node");
			return this._endBlockNode(D);
		}
		try(t, a, o) {
			if (!a && !o) throw Error("CodeGen: \"try\" without \"catch\" and \"finally\"");
			let s = new O();
			if (this._blockNode(s), this.code(t), a) {
				let t = this.name("e");
				this._currNode = s.catch = new k(t), a(t);
			}
			return o && (this._currNode = s.finally = new A(), this.code(o)), this._endBlockNode(k, A);
		}
		throw(t) {
			return this._leafNode(new h(t));
		}
		block(t, a) {
			return this._blockStarts.push(this._nodes.length), t && this.code(t).endBlock(a), this;
		}
		endBlock(t) {
			let a = this._blockStarts.pop();
			if (a === void 0) throw Error("CodeGen: not in self-balancing block");
			let o = this._nodes.length - a;
			if (o < 0 || t !== void 0 && o !== t) throw Error(`CodeGen: wrong number of nodes: ${o} vs ${t} expected`);
			return this._nodes.length = a, this;
		}
		func(t, o = a.nil, s, c) {
			return this._blockNode(new E(t, o, s)), c && this.code(c).endFunc(), this;
		}
		endFunc() {
			return this._endBlockNode(E);
		}
		optimize(t = 1) {
			for (; t-- > 0;) this._root.optimizeNodes(), this._root.optimizeNames(this._root.names, this._constants);
		}
		_leafNode(t) {
			return this._currNode.nodes.push(t), this;
		}
		_blockNode(t) {
			this._currNode.nodes.push(t), this._nodes.push(t);
		}
		_endBlockNode(t, a) {
			let o = this._currNode;
			if (o instanceof t || a && o instanceof a) return this._nodes.pop(), this;
			throw Error(`CodeGen: not in block "${a ? `${t.kind}/${a.kind}` : t.kind}"`);
		}
		_elseNode(t) {
			let a = this._currNode;
			if (!(a instanceof x)) throw Error("CodeGen: \"else\" without \"if\"");
			return this._currNode = a.else = t, this;
		}
		get _root() {
			return this._nodes[0];
		}
		get _currNode() {
			let t = this._nodes;
			return t[t.length - 1];
		}
		set _currNode(t) {
			let a = this._nodes;
			a[a.length - 1] = t;
		}
	};
	function j(t, a) {
		for (let o in a) t[o] = (t[o] || 0) + (a[o] || 0);
		return t;
	}
	function M(t, o) {
		return o instanceof a._CodeOrName ? j(t, o.names) : t;
	}
	function N(t, o, s) {
		if (t instanceof a.Name) return c(t);
		if (!l(t)) return t;
		return new a._Code(t._items.reduce((t, o) => (o instanceof a.Name && (o = c(o)), o instanceof a._Code ? t.push(...o._items) : t.push(o), t), []));
		function c(t) {
			let a = s[t.str];
			return a === void 0 || o[t.str] !== 1 ? t : (delete o[t.str], a);
		}
		function l(t) {
			return t instanceof a._Code && t._items.some((t) => t instanceof a.Name && o[t.str] === 1 && s[t.str] !== void 0);
		}
	}
	function P(t, a) {
		for (let o in a) t[o] = (t[o] || 0) - (a[o] || 0);
	}
	function F(t) {
		return typeof t == "boolean" || typeof t == "number" || t === null ? !t : (0, a._)`!${V(t)}`;
	}
	t.not = F;
	var I = B(t.operators.AND);
	function L(...t) {
		return t.reduce(I);
	}
	t.and = L;
	var R = B(t.operators.OR);
	function z(...t) {
		return t.reduce(R);
	}
	t.or = z;
	function B(t) {
		return (o, s) => o === a.nil ? s : s === a.nil ? o : (0, a._)`${V(o)} ${t} ${V(s)}`;
	}
	function V(t) {
		return t instanceof a.Name ? t : (0, a._)`(${t})`;
	}
})), require_util$1 = /* @__PURE__ */ __commonJSMin(((t) => {
	Object.defineProperty(t, "__esModule", { value: !0 }), t.checkStrictMode = t.getErrorPath = t.Type = t.useFunc = t.setEvaluated = t.evaluatedPropsToName = t.mergeEvaluated = t.eachItem = t.unescapeJsonPointer = t.escapeJsonPointer = t.escapeFragment = t.unescapeFragment = t.schemaRefOrVal = t.schemaHasRulesButRef = t.schemaHasRules = t.checkUnknownRules = t.alwaysValidSchema = t.toHash = void 0;
	var a = require_codegen(), o = require_code$1();
	function s(t) {
		let a = {};
		for (let o of t) a[o] = !0;
		return a;
	}
	t.toHash = s;
	function c(t, a) {
		return typeof a == "boolean" ? a : Object.keys(a).length === 0 ? !0 : (l(t, a), !u(a, t.self.RULES.all));
	}
	t.alwaysValidSchema = c;
	function l(t, a = t.schema) {
		let { opts: o, self: s } = t;
		if (!o.strictSchema || typeof a == "boolean") return;
		let c = s.RULES.keywords;
		for (let o in a) c[o] || T(t, `unknown keyword: "${o}"`);
	}
	t.checkUnknownRules = l;
	function u(t, a) {
		if (typeof t == "boolean") return !t;
		for (let o in t) if (a[o]) return !0;
		return !1;
	}
	t.schemaHasRules = u;
	function d(t, a) {
		if (typeof t == "boolean") return !t;
		for (let o in t) if (o !== "$ref" && a.all[o]) return !0;
		return !1;
	}
	t.schemaHasRulesButRef = d;
	function f({ topSchemaRef: t, schemaPath: o }, s, c, l) {
		if (!l) {
			if (typeof s == "number" || typeof s == "boolean") return s;
			if (typeof s == "string") return (0, a._)`${s}`;
		}
		return (0, a._)`${t}${o}${(0, a.getProperty)(c)}`;
	}
	t.schemaRefOrVal = f;
	function p(t) {
		return g(decodeURIComponent(t));
	}
	t.unescapeFragment = p;
	function m(t) {
		return encodeURIComponent(h(t));
	}
	t.escapeFragment = m;
	function h(t) {
		return typeof t == "number" ? `${t}` : t.replace(/~/g, "~0").replace(/\//g, "~1");
	}
	t.escapeJsonPointer = h;
	function g(t) {
		return t.replace(/~1/g, "/").replace(/~0/g, "~");
	}
	t.unescapeJsonPointer = g;
	function _(t, a) {
		if (Array.isArray(t)) for (let o of t) a(o);
		else a(t);
	}
	t.eachItem = _;
	function v({ mergeNames: t, mergeToName: o, mergeValues: s, resultToName: c }) {
		return (l, u, d, f) => {
			let p = d === void 0 ? u : d instanceof a.Name ? (u instanceof a.Name ? t(l, u, d) : o(l, u, d), d) : u instanceof a.Name ? (o(l, d, u), u) : s(u, d);
			return f === a.Name && !(p instanceof a.Name) ? c(l, p) : p;
		};
	}
	t.mergeEvaluated = {
		props: v({
			mergeNames: (t, o, s) => t.if((0, a._)`${s} !== true && ${o} !== undefined`, () => {
				t.if((0, a._)`${o} === true`, () => t.assign(s, !0), () => t.assign(s, (0, a._)`${s} || {}`).code((0, a._)`Object.assign(${s}, ${o})`));
			}),
			mergeToName: (t, o, s) => t.if((0, a._)`${s} !== true`, () => {
				o === !0 ? t.assign(s, !0) : (t.assign(s, (0, a._)`${s} || {}`), b(t, s, o));
			}),
			mergeValues: (t, a) => t === !0 ? !0 : {
				...t,
				...a
			},
			resultToName: y
		}),
		items: v({
			mergeNames: (t, o, s) => t.if((0, a._)`${s} !== true && ${o} !== undefined`, () => t.assign(s, (0, a._)`${o} === true ? true : ${s} > ${o} ? ${s} : ${o}`)),
			mergeToName: (t, o, s) => t.if((0, a._)`${s} !== true`, () => t.assign(s, o === !0 ? !0 : (0, a._)`${s} > ${o} ? ${s} : ${o}`)),
			mergeValues: (t, a) => t === !0 ? !0 : Math.max(t, a),
			resultToName: (t, a) => t.var("items", a)
		})
	};
	function y(t, o) {
		if (o === !0) return t.var("props", !0);
		let s = t.var("props", (0, a._)`{}`);
		return o !== void 0 && b(t, s, o), s;
	}
	t.evaluatedPropsToName = y;
	function b(t, o, s) {
		Object.keys(s).forEach((s) => t.assign((0, a._)`${o}${(0, a.getProperty)(s)}`, !0));
	}
	t.setEvaluated = b;
	var x = {};
	function S(t, a) {
		return t.scopeValue("func", {
			ref: a,
			code: x[a.code] || (x[a.code] = new o._Code(a.code))
		});
	}
	t.useFunc = S;
	var C;
	(function(t) {
		t[t.Num = 0] = "Num", t[t.Str = 1] = "Str";
	})(C || (t.Type = C = {}));
	function w(t, o, s) {
		if (t instanceof a.Name) {
			let c = o === C.Num;
			return s ? c ? (0, a._)`"[" + ${t} + "]"` : (0, a._)`"['" + ${t} + "']"` : c ? (0, a._)`"/" + ${t}` : (0, a._)`"/" + ${t}.replace(/~/g, "~0").replace(/\\//g, "~1")`;
		}
		return s ? (0, a.getProperty)(t).toString() : "/" + h(t);
	}
	t.getErrorPath = w;
	function T(t, a, o = t.opts.strictSchema) {
		if (o) {
			if (a = `strict mode: ${a}`, o === !0) throw Error(a);
			t.self.logger.warn(a);
		}
	}
	t.checkStrictMode = T;
})), require_names = /* @__PURE__ */ __commonJSMin(((t) => {
	Object.defineProperty(t, "__esModule", { value: !0 });
	var a = require_codegen();
	t.default = {
		data: new a.Name("data"),
		valCxt: new a.Name("valCxt"),
		instancePath: new a.Name("instancePath"),
		parentData: new a.Name("parentData"),
		parentDataProperty: new a.Name("parentDataProperty"),
		rootData: new a.Name("rootData"),
		dynamicAnchors: new a.Name("dynamicAnchors"),
		vErrors: new a.Name("vErrors"),
		errors: new a.Name("errors"),
		this: new a.Name("this"),
		self: new a.Name("self"),
		scope: new a.Name("scope"),
		json: new a.Name("json"),
		jsonPos: new a.Name("jsonPos"),
		jsonLen: new a.Name("jsonLen"),
		jsonPart: new a.Name("jsonPart")
	};
})), require_errors$1 = /* @__PURE__ */ __commonJSMin(((t) => {
	Object.defineProperty(t, "__esModule", { value: !0 }), t.extendErrors = t.resetErrorsCount = t.reportExtraError = t.reportError = t.keyword$DataError = t.keywordError = void 0;
	var a = require_codegen(), o = require_util$1(), s = require_names();
	t.keywordError = { message: ({ keyword: t }) => (0, a.str)`must pass "${t}" keyword validation` }, t.keyword$DataError = { message: ({ keyword: t, schemaType: o }) => o ? (0, a.str)`"${t}" keyword must be ${o} ($data)` : (0, a.str)`"${t}" keyword is invalid ($data)` };
	function c(o, s = t.keywordError, c, l) {
		let { it: u } = o, { gen: d, compositeRule: m, allErrors: g } = u, _ = h(o, s, c);
		l ?? (m || g) ? f(d, _) : p(u, (0, a._)`[${_}]`);
	}
	t.reportError = c;
	function l(a, o = t.keywordError, c) {
		let { it: l } = a, { gen: u, compositeRule: d, allErrors: m } = l;
		f(u, h(a, o, c)), d || m || p(l, s.default.vErrors);
	}
	t.reportExtraError = l;
	function u(t, o) {
		t.assign(s.default.errors, o), t.if((0, a._)`${s.default.vErrors} !== null`, () => t.if(o, () => t.assign((0, a._)`${s.default.vErrors}.length`, o), () => t.assign(s.default.vErrors, null)));
	}
	t.resetErrorsCount = u;
	function d({ gen: t, keyword: o, schemaValue: c, data: l, errsCount: u, it: d }) {
		/* istanbul ignore if */
		if (u === void 0) throw Error("ajv implementation error");
		let f = t.name("err");
		t.forRange("i", u, s.default.errors, (u) => {
			t.const(f, (0, a._)`${s.default.vErrors}[${u}]`), t.if((0, a._)`${f}.instancePath === undefined`, () => t.assign((0, a._)`${f}.instancePath`, (0, a.strConcat)(s.default.instancePath, d.errorPath))), t.assign((0, a._)`${f}.schemaPath`, (0, a.str)`${d.errSchemaPath}/${o}`), d.opts.verbose && (t.assign((0, a._)`${f}.schema`, c), t.assign((0, a._)`${f}.data`, l));
		});
	}
	t.extendErrors = d;
	function f(t, o) {
		let c = t.const("err", o);
		t.if((0, a._)`${s.default.vErrors} === null`, () => t.assign(s.default.vErrors, (0, a._)`[${c}]`), (0, a._)`${s.default.vErrors}.push(${c})`), t.code((0, a._)`${s.default.errors}++`);
	}
	function p(t, o) {
		let { gen: s, validateName: c, schemaEnv: l } = t;
		l.$async ? s.throw((0, a._)`new ${t.ValidationError}(${o})`) : (s.assign((0, a._)`${c}.errors`, o), s.return(!1));
	}
	var m = {
		keyword: new a.Name("keyword"),
		schemaPath: new a.Name("schemaPath"),
		params: new a.Name("params"),
		propertyName: new a.Name("propertyName"),
		message: new a.Name("message"),
		schema: new a.Name("schema"),
		parentSchema: new a.Name("parentSchema")
	};
	function h(t, o, s) {
		let { createErrors: c } = t.it;
		return c === !1 ? (0, a._)`{}` : g(t, o, s);
	}
	function g(t, a, o = {}) {
		let { gen: s, it: c } = t, l = [_(c, o), v(t, o)];
		return y(t, a, l), s.object(...l);
	}
	function _({ errorPath: t }, { instancePath: c }) {
		let l = c ? (0, a.str)`${t}${(0, o.getErrorPath)(c, o.Type.Str)}` : t;
		return [s.default.instancePath, (0, a.strConcat)(s.default.instancePath, l)];
	}
	function v({ keyword: t, it: { errSchemaPath: s } }, { schemaPath: c, parentSchema: l }) {
		let u = l ? s : (0, a.str)`${s}/${t}`;
		return c && (u = (0, a.str)`${u}${(0, o.getErrorPath)(c, o.Type.Str)}`), [m.schemaPath, u];
	}
	function y(t, { params: o, message: c }, l) {
		let { keyword: u, data: d, schemaValue: f, it: p } = t, { opts: h, propertyName: g, topSchemaRef: _, schemaPath: v } = p;
		l.push([m.keyword, u], [m.params, typeof o == "function" ? o(t) : o || (0, a._)`{}`]), h.messages && l.push([m.message, typeof c == "function" ? c(t) : c]), h.verbose && l.push([m.schema, f], [m.parentSchema, (0, a._)`${_}${v}`], [s.default.data, d]), g && l.push([m.propertyName, g]);
	}
})), require_boolSchema = /* @__PURE__ */ __commonJSMin(((t) => {
	Object.defineProperty(t, "__esModule", { value: !0 }), t.boolOrEmptySchema = t.topBoolOrEmptySchema = void 0;
	var a = require_errors$1(), o = require_codegen(), s = require_names(), c = { message: "boolean schema is false" };
	function l(t) {
		let { gen: a, schema: c, validateName: l } = t;
		c === !1 ? d(t, !1) : typeof c == "object" && c.$async === !0 ? a.return(s.default.data) : (a.assign((0, o._)`${l}.errors`, null), a.return(!0));
	}
	t.topBoolOrEmptySchema = l;
	function u(t, a) {
		let { gen: o, schema: s } = t;
		s === !1 ? (o.var(a, !1), d(t)) : o.var(a, !0);
	}
	t.boolOrEmptySchema = u;
	function d(t, o) {
		let { gen: s, data: l } = t, u = {
			gen: s,
			keyword: "false schema",
			data: l,
			schema: !1,
			schemaCode: !1,
			schemaValue: !1,
			params: {},
			it: t
		};
		(0, a.reportError)(u, c, void 0, o);
	}
})), require_rules = /* @__PURE__ */ __commonJSMin(((t) => {
	Object.defineProperty(t, "__esModule", { value: !0 }), t.getRules = t.isJSONType = void 0;
	var a = new Set([
		"string",
		"number",
		"integer",
		"boolean",
		"null",
		"object",
		"array"
	]);
	function o(t) {
		return typeof t == "string" && a.has(t);
	}
	t.isJSONType = o;
	function s() {
		let t = {
			number: {
				type: "number",
				rules: []
			},
			string: {
				type: "string",
				rules: []
			},
			array: {
				type: "array",
				rules: []
			},
			object: {
				type: "object",
				rules: []
			}
		};
		return {
			types: {
				...t,
				integer: !0,
				boolean: !0,
				null: !0
			},
			rules: [
				{ rules: [] },
				t.number,
				t.string,
				t.array,
				t.object
			],
			post: { rules: [] },
			all: {},
			keywords: {}
		};
	}
	t.getRules = s;
})), require_applicability = /* @__PURE__ */ __commonJSMin(((t) => {
	Object.defineProperty(t, "__esModule", { value: !0 }), t.shouldUseRule = t.shouldUseGroup = t.schemaHasRulesForType = void 0;
	function a({ schema: t, self: a }, s) {
		let c = a.RULES.types[s];
		return c && c !== !0 && o(t, c);
	}
	t.schemaHasRulesForType = a;
	function o(t, a) {
		return a.rules.some((a) => s(t, a));
	}
	t.shouldUseGroup = o;
	function s(t, a) {
		return t[a.keyword] !== void 0 || a.definition.implements?.some((a) => t[a] !== void 0);
	}
	t.shouldUseRule = s;
})), require_dataType = /* @__PURE__ */ __commonJSMin(((t) => {
	Object.defineProperty(t, "__esModule", { value: !0 }), t.reportTypeError = t.checkDataTypes = t.checkDataType = t.coerceAndCheckDataType = t.getJSONTypes = t.getSchemaTypes = t.DataType = void 0;
	var a = require_rules(), o = require_applicability(), s = require_errors$1(), c = require_codegen(), l = require_util$1(), u;
	(function(t) {
		t[t.Correct = 0] = "Correct", t[t.Wrong = 1] = "Wrong";
	})(u || (t.DataType = u = {}));
	function d(t) {
		let a = f(t.type);
		if (a.includes("null")) {
			if (t.nullable === !1) throw Error("type: null contradicts nullable: false");
		} else {
			if (!a.length && t.nullable !== void 0) throw Error("\"nullable\" cannot be used without \"type\"");
			t.nullable === !0 && a.push("null");
		}
		return a;
	}
	t.getSchemaTypes = d;
	function f(t) {
		let o = Array.isArray(t) ? t : t ? [t] : [];
		if (o.every(a.isJSONType)) return o;
		throw Error("type must be JSONType or JSONType[]: " + o.join(","));
	}
	t.getJSONTypes = f;
	function p(t, a) {
		let { gen: s, data: c, opts: l } = t, d = h(a, l.coerceTypes), f = a.length > 0 && !(d.length === 0 && a.length === 1 && (0, o.schemaHasRulesForType)(t, a[0]));
		if (f) {
			let o = y(a, c, l.strictNumbers, u.Wrong);
			s.if(o, () => {
				d.length ? g(t, a, d) : x(t);
			});
		}
		return f;
	}
	t.coerceAndCheckDataType = p;
	var m = new Set([
		"string",
		"number",
		"integer",
		"boolean",
		"null"
	]);
	function h(t, a) {
		return a ? t.filter((t) => m.has(t) || a === "array" && t === "array") : [];
	}
	function g(t, a, o) {
		let { gen: s, data: l, opts: u } = t, d = s.let("dataType", (0, c._)`typeof ${l}`), f = s.let("coerced", (0, c._)`undefined`);
		u.coerceTypes === "array" && s.if((0, c._)`${d} == 'object' && Array.isArray(${l}) && ${l}.length == 1`, () => s.assign(l, (0, c._)`${l}[0]`).assign(d, (0, c._)`typeof ${l}`).if(y(a, l, u.strictNumbers), () => s.assign(f, l))), s.if((0, c._)`${f} !== undefined`);
		for (let t of o) (m.has(t) || t === "array" && u.coerceTypes === "array") && p(t);
		s.else(), x(t), s.endIf(), s.if((0, c._)`${f} !== undefined`, () => {
			s.assign(l, f), _(t, f);
		});
		function p(t) {
			switch (t) {
				case "string":
					s.elseIf((0, c._)`${d} == "number" || ${d} == "boolean"`).assign(f, (0, c._)`"" + ${l}`).elseIf((0, c._)`${l} === null`).assign(f, (0, c._)`""`);
					return;
				case "number":
					s.elseIf((0, c._)`${d} == "boolean" || ${l} === null
              || (${d} == "string" && ${l} && ${l} == +${l})`).assign(f, (0, c._)`+${l}`);
					return;
				case "integer":
					s.elseIf((0, c._)`${d} === "boolean" || ${l} === null
              || (${d} === "string" && ${l} && ${l} == +${l} && !(${l} % 1))`).assign(f, (0, c._)`+${l}`);
					return;
				case "boolean":
					s.elseIf((0, c._)`${l} === "false" || ${l} === 0 || ${l} === null`).assign(f, !1).elseIf((0, c._)`${l} === "true" || ${l} === 1`).assign(f, !0);
					return;
				case "null":
					s.elseIf((0, c._)`${l} === "" || ${l} === 0 || ${l} === false`), s.assign(f, null);
					return;
				case "array": s.elseIf((0, c._)`${d} === "string" || ${d} === "number"
              || ${d} === "boolean" || ${l} === null`).assign(f, (0, c._)`[${l}]`);
			}
		}
	}
	function _({ gen: t, parentData: a, parentDataProperty: o }, s) {
		t.if((0, c._)`${a} !== undefined`, () => t.assign((0, c._)`${a}[${o}]`, s));
	}
	function v(t, a, o, s = u.Correct) {
		let l = s === u.Correct ? c.operators.EQ : c.operators.NEQ, d;
		switch (t) {
			case "null": return (0, c._)`${a} ${l} null`;
			case "array":
				d = (0, c._)`Array.isArray(${a})`;
				break;
			case "object":
				d = (0, c._)`${a} && typeof ${a} == "object" && !Array.isArray(${a})`;
				break;
			case "integer":
				d = f((0, c._)`!(${a} % 1) && !isNaN(${a})`);
				break;
			case "number":
				d = f();
				break;
			default: return (0, c._)`typeof ${a} ${l} ${t}`;
		}
		return s === u.Correct ? d : (0, c.not)(d);
		function f(t = c.nil) {
			return (0, c.and)((0, c._)`typeof ${a} == "number"`, t, o ? (0, c._)`isFinite(${a})` : c.nil);
		}
	}
	t.checkDataType = v;
	function y(t, a, o, s) {
		if (t.length === 1) return v(t[0], a, o, s);
		let u, d = (0, l.toHash)(t);
		if (d.array && d.object) {
			let t = (0, c._)`typeof ${a} != "object"`;
			u = d.null ? t : (0, c._)`!${a} || ${t}`, delete d.null, delete d.array, delete d.object;
		} else u = c.nil;
		for (let t in d.number && delete d.integer, d) u = (0, c.and)(u, v(t, a, o, s));
		return u;
	}
	t.checkDataTypes = y;
	var b = {
		message: ({ schema: t }) => `must be ${t}`,
		params: ({ schema: t, schemaValue: a }) => typeof t == "string" ? (0, c._)`{type: ${t}}` : (0, c._)`{type: ${a}}`
	};
	function x(t) {
		let a = S(t);
		(0, s.reportError)(a, b);
	}
	t.reportTypeError = x;
	function S(t) {
		let { gen: a, data: o, schema: s } = t, c = (0, l.schemaRefOrVal)(t, s, "type");
		return {
			gen: a,
			keyword: "type",
			data: o,
			schema: s.type,
			schemaCode: c,
			schemaValue: c,
			parentSchema: s,
			params: {},
			it: t
		};
	}
})), require_defaults = /* @__PURE__ */ __commonJSMin(((t) => {
	Object.defineProperty(t, "__esModule", { value: !0 }), t.assignDefaults = void 0;
	var a = require_codegen(), o = require_util$1();
	function s(t, a) {
		let { properties: o, items: s } = t.schema;
		if (a === "object" && o) for (let a in o) c(t, a, o[a].default);
		else a === "array" && Array.isArray(s) && s.forEach((a, o) => c(t, o, a.default));
	}
	t.assignDefaults = s;
	function c(t, s, c) {
		let { gen: l, compositeRule: u, data: d, opts: f } = t;
		if (c === void 0) return;
		let p = (0, a._)`${d}${(0, a.getProperty)(s)}`;
		if (u) {
			(0, o.checkStrictMode)(t, `default is ignored for: ${p}`);
			return;
		}
		let m = (0, a._)`${p} === undefined`;
		f.useDefaults === "empty" && (m = (0, a._)`${m} || ${p} === null || ${p} === ""`), l.if(m, (0, a._)`${p} = ${(0, a.stringify)(c)}`);
	}
})), require_code = /* @__PURE__ */ __commonJSMin(((t) => {
	Object.defineProperty(t, "__esModule", { value: !0 }), t.validateUnion = t.validateArray = t.usePattern = t.callValidateCode = t.schemaProperties = t.allSchemaProperties = t.noPropertyInData = t.propertyInData = t.isOwnProperty = t.hasPropFunc = t.reportMissingProp = t.checkMissingProp = t.checkReportMissingProp = void 0;
	var a = require_codegen(), o = require_util$1(), s = require_names(), c = require_util$1();
	function l(t, o) {
		let { gen: s, data: c, it: l } = t;
		s.if(h(s, c, o, l.opts.ownProperties), () => {
			t.setParams({ missingProperty: (0, a._)`${o}` }, !0), t.error();
		});
	}
	t.checkReportMissingProp = l;
	function u({ gen: t, data: o, it: { opts: s } }, c, l) {
		return (0, a.or)(...c.map((c) => (0, a.and)(h(t, o, c, s.ownProperties), (0, a._)`${l} = ${c}`)));
	}
	t.checkMissingProp = u;
	function d(t, a) {
		t.setParams({ missingProperty: a }, !0), t.error();
	}
	t.reportMissingProp = d;
	function f(t) {
		return t.scopeValue("func", {
			ref: Object.prototype.hasOwnProperty,
			code: (0, a._)`Object.prototype.hasOwnProperty`
		});
	}
	t.hasPropFunc = f;
	function p(t, o, s) {
		return (0, a._)`${f(t)}.call(${o}, ${s})`;
	}
	t.isOwnProperty = p;
	function m(t, o, s, c) {
		let l = (0, a._)`${o}${(0, a.getProperty)(s)} !== undefined`;
		return c ? (0, a._)`${l} && ${p(t, o, s)}` : l;
	}
	t.propertyInData = m;
	function h(t, o, s, c) {
		let l = (0, a._)`${o}${(0, a.getProperty)(s)} === undefined`;
		return c ? (0, a.or)(l, (0, a.not)(p(t, o, s))) : l;
	}
	t.noPropertyInData = h;
	function g(t) {
		return t ? Object.keys(t).filter((t) => t !== "__proto__") : [];
	}
	t.allSchemaProperties = g;
	function _(t, a) {
		return g(a).filter((s) => !(0, o.alwaysValidSchema)(t, a[s]));
	}
	t.schemaProperties = _;
	function v({ schemaCode: t, data: o, it: { gen: c, topSchemaRef: l, schemaPath: u, errorPath: d }, it: f }, p, m, h) {
		let g = h ? (0, a._)`${t}, ${o}, ${l}${u}` : o, _ = [
			[s.default.instancePath, (0, a.strConcat)(s.default.instancePath, d)],
			[s.default.parentData, f.parentData],
			[s.default.parentDataProperty, f.parentDataProperty],
			[s.default.rootData, s.default.rootData]
		];
		f.opts.dynamicRef && _.push([s.default.dynamicAnchors, s.default.dynamicAnchors]);
		let v = (0, a._)`${g}, ${c.object(..._)}`;
		return m === a.nil ? (0, a._)`${p}(${v})` : (0, a._)`${p}.call(${m}, ${v})`;
	}
	t.callValidateCode = v;
	var y = (0, a._)`new RegExp`;
	function b({ gen: t, it: { opts: o } }, s) {
		let l = o.unicodeRegExp ? "u" : "", { regExp: u } = o.code, d = u(s, l);
		return t.scopeValue("pattern", {
			key: d.toString(),
			ref: d,
			code: (0, a._)`${u.code === "new RegExp" ? y : (0, c.useFunc)(t, u)}(${s}, ${l})`
		});
	}
	t.usePattern = b;
	function x(t) {
		let { gen: s, data: c, keyword: l, it: u } = t, d = s.name("valid");
		if (u.allErrors) {
			let t = s.let("valid", !0);
			return f(() => s.assign(t, !1)), t;
		}
		return s.var(d, !0), f(() => s.break()), d;
		function f(u) {
			let f = s.const("len", (0, a._)`${c}.length`);
			s.forRange("i", 0, f, (c) => {
				t.subschema({
					keyword: l,
					dataProp: c,
					dataPropType: o.Type.Num
				}, d), s.if((0, a.not)(d), u);
			});
		}
	}
	t.validateArray = x;
	function S(t) {
		let { gen: s, schema: c, keyword: l, it: u } = t;
		/* istanbul ignore if */
		if (!Array.isArray(c)) throw Error("ajv implementation error");
		if (c.some((t) => (0, o.alwaysValidSchema)(u, t)) && !u.opts.unevaluated) return;
		let d = s.let("valid", !1), f = s.name("_valid");
		s.block(() => c.forEach((o, c) => {
			let u = t.subschema({
				keyword: l,
				schemaProp: c,
				compositeRule: !0
			}, f);
			s.assign(d, (0, a._)`${d} || ${f}`), t.mergeValidEvaluated(u, f) || s.if((0, a.not)(d));
		})), t.result(d, () => t.reset(), () => t.error(!0));
	}
	t.validateUnion = S;
})), require_keyword = /* @__PURE__ */ __commonJSMin(((t) => {
	Object.defineProperty(t, "__esModule", { value: !0 }), t.validateKeywordUsage = t.validSchemaType = t.funcKeywordCode = t.macroKeywordCode = void 0;
	var a = require_codegen(), o = require_names(), s = require_code(), c = require_errors$1();
	function l(t, o) {
		let { gen: s, keyword: c, schema: l, parentSchema: u, it: d } = t, f = o.macro.call(d.self, l, u, d), p = m(s, c, f);
		d.opts.validateSchema !== !1 && d.self.validateSchema(f, !0);
		let h = s.name("valid");
		t.subschema({
			schema: f,
			schemaPath: a.nil,
			errSchemaPath: `${d.errSchemaPath}/${c}`,
			topSchemaRef: p,
			compositeRule: !0
		}, h), t.pass(h, () => t.error(!0));
	}
	t.macroKeywordCode = l;
	function u(t, c) {
		let { gen: l, keyword: u, schema: h, parentSchema: g, $data: _, it: v } = t;
		p(v, c);
		let y = m(l, u, !_ && c.compile ? c.compile.call(v.self, h, g, v) : c.validate), b = l.let("valid");
		t.block$data(b, x), t.ok(c.valid ?? b);
		function x() {
			if (c.errors === !1) w(), c.modifying && d(t), T(() => t.error());
			else {
				let a = c.async ? S() : C();
				c.modifying && d(t), T(() => f(t, a));
			}
		}
		function S() {
			let t = l.let("ruleErrs", null);
			return l.try(() => w((0, a._)`await `), (o) => l.assign(b, !1).if((0, a._)`${o} instanceof ${v.ValidationError}`, () => l.assign(t, (0, a._)`${o}.errors`), () => l.throw(o))), t;
		}
		function C() {
			let t = (0, a._)`${y}.errors`;
			return l.assign(t, null), w(a.nil), t;
		}
		function w(u = c.async ? (0, a._)`await ` : a.nil) {
			let d = v.opts.passContext ? o.default.this : o.default.self, f = !("compile" in c && !_ || c.schema === !1);
			l.assign(b, (0, a._)`${u}${(0, s.callValidateCode)(t, y, d, f)}`, c.modifying);
		}
		function T(t) {
			l.if((0, a.not)(c.valid ?? b), t);
		}
	}
	t.funcKeywordCode = u;
	function d(t) {
		let { gen: o, data: s, it: c } = t;
		o.if(c.parentData, () => o.assign(s, (0, a._)`${c.parentData}[${c.parentDataProperty}]`));
	}
	function f(t, s) {
		let { gen: l } = t;
		l.if((0, a._)`Array.isArray(${s})`, () => {
			l.assign(o.default.vErrors, (0, a._)`${o.default.vErrors} === null ? ${s} : ${o.default.vErrors}.concat(${s})`).assign(o.default.errors, (0, a._)`${o.default.vErrors}.length`), (0, c.extendErrors)(t);
		}, () => t.error());
	}
	function p({ schemaEnv: t }, a) {
		if (a.async && !t.$async) throw Error("async keyword in sync schema");
	}
	function m(t, o, s) {
		if (s === void 0) throw Error(`keyword "${o}" failed to compile`);
		return t.scopeValue("keyword", typeof s == "function" ? { ref: s } : {
			ref: s,
			code: (0, a.stringify)(s)
		});
	}
	function h(t, a, o = !1) {
		return !a.length || a.some((a) => a === "array" ? Array.isArray(t) : a === "object" ? t && typeof t == "object" && !Array.isArray(t) : typeof t == a || o && t === void 0);
	}
	t.validSchemaType = h;
	function g({ schema: t, opts: a, self: o, errSchemaPath: s }, c, l) {
		/* istanbul ignore if */
		if (Array.isArray(c.keyword) ? !c.keyword.includes(l) : c.keyword !== l) throw Error("ajv implementation error");
		let u = c.dependencies;
		if (u?.some((a) => !Object.prototype.hasOwnProperty.call(t, a))) throw Error(`parent schema must have dependencies of ${l}: ${u.join(",")}`);
		if (c.validateSchema && !c.validateSchema(t[l])) {
			let t = `keyword "${l}" value is invalid at path "${s}": ` + o.errorsText(c.validateSchema.errors);
			if (a.validateSchema === "log") o.logger.error(t);
			else throw Error(t);
		}
	}
	t.validateKeywordUsage = g;
})), require_subschema = /* @__PURE__ */ __commonJSMin(((t) => {
	Object.defineProperty(t, "__esModule", { value: !0 }), t.extendSubschemaMode = t.extendSubschemaData = t.getSubschema = void 0;
	var a = require_codegen(), o = require_util$1();
	function s(t, { keyword: s, schemaProp: c, schema: l, schemaPath: u, errSchemaPath: d, topSchemaRef: f }) {
		if (s !== void 0 && l !== void 0) throw Error("both \"keyword\" and \"schema\" passed, only one allowed");
		if (s !== void 0) {
			let l = t.schema[s];
			return c === void 0 ? {
				schema: l,
				schemaPath: (0, a._)`${t.schemaPath}${(0, a.getProperty)(s)}`,
				errSchemaPath: `${t.errSchemaPath}/${s}`
			} : {
				schema: l[c],
				schemaPath: (0, a._)`${t.schemaPath}${(0, a.getProperty)(s)}${(0, a.getProperty)(c)}`,
				errSchemaPath: `${t.errSchemaPath}/${s}/${(0, o.escapeFragment)(c)}`
			};
		}
		if (l !== void 0) {
			if (u === void 0 || d === void 0 || f === void 0) throw Error("\"schemaPath\", \"errSchemaPath\" and \"topSchemaRef\" are required with \"schema\"");
			return {
				schema: l,
				schemaPath: u,
				topSchemaRef: f,
				errSchemaPath: d
			};
		}
		throw Error("either \"keyword\" or \"schema\" must be passed");
	}
	t.getSubschema = s;
	function c(t, s, { dataProp: c, dataPropType: l, data: u, dataTypes: d, propertyName: f }) {
		if (u !== void 0 && c !== void 0) throw Error("both \"data\" and \"dataProp\" passed, only one allowed");
		let { gen: p } = s;
		if (c !== void 0) {
			let { errorPath: u, dataPathArr: d, opts: f } = s;
			m(p.let("data", (0, a._)`${s.data}${(0, a.getProperty)(c)}`, !0)), t.errorPath = (0, a.str)`${u}${(0, o.getErrorPath)(c, l, f.jsPropertySyntax)}`, t.parentDataProperty = (0, a._)`${c}`, t.dataPathArr = [...d, t.parentDataProperty];
		}
		u !== void 0 && (m(u instanceof a.Name ? u : p.let("data", u, !0)), f !== void 0 && (t.propertyName = f)), d && (t.dataTypes = d);
		function m(a) {
			t.data = a, t.dataLevel = s.dataLevel + 1, t.dataTypes = [], s.definedProperties = /* @__PURE__ */ new Set(), t.parentData = s.data, t.dataNames = [...s.dataNames, a];
		}
	}
	t.extendSubschemaData = c;
	function l(t, { jtdDiscriminator: a, jtdMetadata: o, compositeRule: s, createErrors: c, allErrors: l }) {
		s !== void 0 && (t.compositeRule = s), c !== void 0 && (t.createErrors = c), l !== void 0 && (t.allErrors = l), t.jtdDiscriminator = a, t.jtdMetadata = o;
	}
	t.extendSubschemaMode = l;
})), require_json_schema_traverse = /* @__PURE__ */ __commonJSMin(((t, a) => {
	var o = a.exports = function(t, a, o) {
		typeof a == "function" && (o = a, a = {}), o = a.cb || o;
		var c = typeof o == "function" ? o : o.pre || function() {}, l = o.post || function() {};
		s(a, c, l, t, "", t);
	};
	o.keywords = {
		additionalItems: !0,
		items: !0,
		contains: !0,
		additionalProperties: !0,
		propertyNames: !0,
		not: !0,
		if: !0,
		then: !0,
		else: !0
	}, o.arrayKeywords = {
		items: !0,
		allOf: !0,
		anyOf: !0,
		oneOf: !0
	}, o.propsKeywords = {
		$defs: !0,
		definitions: !0,
		properties: !0,
		patternProperties: !0,
		dependencies: !0
	}, o.skipKeywords = {
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
	function s(t, a, l, u, d, f, p, m, h, g) {
		if (u && typeof u == "object" && !Array.isArray(u)) {
			for (var _ in a(u, d, f, p, m, h, g), u) {
				var v = u[_];
				if (Array.isArray(v)) {
					if (_ in o.arrayKeywords) for (var y = 0; y < v.length; y++) s(t, a, l, v[y], d + "/" + _ + "/" + y, f, d, _, u, y);
				} else if (_ in o.propsKeywords) {
					if (v && typeof v == "object") for (var b in v) s(t, a, l, v[b], d + "/" + _ + "/" + c(b), f, d, _, u, b);
				} else (_ in o.keywords || t.allKeys && !(_ in o.skipKeywords)) && s(t, a, l, v, d + "/" + _, f, d, _, u);
			}
			l(u, d, f, p, m, h, g);
		}
	}
	function c(t) {
		return t.replace(/~/g, "~0").replace(/\//g, "~1");
	}
})), require_resolve = /* @__PURE__ */ __commonJSMin(((t) => {
	Object.defineProperty(t, "__esModule", { value: !0 }), t.getSchemaRefs = t.resolveUrl = t.normalizeId = t._getFullPath = t.getFullPath = t.inlineRef = void 0;
	var a = require_util$1(), o = require_fast_deep_equal(), s = require_json_schema_traverse(), c = new Set([
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
	function l(t, a = !0) {
		return typeof t == "boolean" ? !0 : a === !0 ? !d(t) : a ? f(t) <= a : !1;
	}
	t.inlineRef = l;
	var u = new Set([
		"$ref",
		"$recursiveRef",
		"$recursiveAnchor",
		"$dynamicRef",
		"$dynamicAnchor"
	]);
	function d(t) {
		for (let a in t) {
			if (u.has(a)) return !0;
			let o = t[a];
			if (Array.isArray(o) && o.some(d) || typeof o == "object" && d(o)) return !0;
		}
		return !1;
	}
	function f(t) {
		let o = 0;
		for (let s in t) if (s === "$ref" || (o++, !c.has(s) && (typeof t[s] == "object" && (0, a.eachItem)(t[s], (t) => o += f(t)), o === Infinity))) return Infinity;
		return o;
	}
	function p(t, a = "", o) {
		return o !== !1 && (a = g(a)), m(t, t.parse(a));
	}
	t.getFullPath = p;
	function m(t, a) {
		return t.serialize(a).split("#")[0] + "#";
	}
	t._getFullPath = m;
	var h = /#\/?$/;
	function g(t) {
		return t ? t.replace(h, "") : "";
	}
	t.normalizeId = g;
	function _(t, a, o) {
		return o = g(o), t.resolve(a, o);
	}
	t.resolveUrl = _;
	var v = /^[a-z_][-a-z0-9._]*$/i;
	function y(t, a) {
		if (typeof t == "boolean") return {};
		let { schemaId: c, uriResolver: l } = this.opts, u = g(t[c] || a), d = { "": u }, f = p(l, u, !1), m = {}, h = /* @__PURE__ */ new Set();
		return s(t, { allKeys: !0 }, (t, a, o, s) => {
			if (s === void 0) return;
			let l = f + a, u = d[s];
			typeof t[c] == "string" && (u = p.call(this, t[c])), b.call(this, t.$anchor), b.call(this, t.$dynamicAnchor), d[a] = u;
			function p(a) {
				let o = this.opts.uriResolver.resolve;
				if (a = g(u ? o(u, a) : a), h.has(a)) throw y(a);
				h.add(a);
				let s = this.refs[a];
				return typeof s == "string" && (s = this.refs[s]), typeof s == "object" ? _(t, s.schema, a) : a !== g(l) && (a[0] === "#" ? (_(t, m[a], a), m[a] = t) : this.refs[a] = l), a;
			}
			function b(t) {
				if (typeof t == "string") {
					if (!v.test(t)) throw Error(`invalid anchor "${t}"`);
					p.call(this, `#${t}`);
				}
			}
		}), m;
		function _(t, a, s) {
			if (a !== void 0 && !o(t, a)) throw y(s);
		}
		function y(t) {
			return /* @__PURE__ */ Error(`reference "${t}" resolves to more than one schema`);
		}
	}
	t.getSchemaRefs = y;
})), require_validate = /* @__PURE__ */ __commonJSMin(((t) => {
	Object.defineProperty(t, "__esModule", { value: !0 }), t.getData = t.KeywordCxt = t.validateFunctionCode = void 0;
	var a = require_boolSchema(), o = require_dataType(), s = require_applicability(), c = require_dataType(), l = require_defaults(), u = require_keyword(), d = require_subschema(), f = require_codegen(), p = require_names(), m = require_resolve(), h = require_util$1(), g = require_errors$1();
	function _(t) {
		if (E(t) && (O(t), T(t))) {
			x(t);
			return;
		}
		v(t, () => (0, a.topBoolOrEmptySchema)(t));
	}
	t.validateFunctionCode = _;
	function v({ gen: t, validateName: a, schema: o, schemaEnv: s, opts: c }, l) {
		c.code.es5 ? t.func(a, (0, f._)`${p.default.data}, ${p.default.valCxt}`, s.$async, () => {
			t.code((0, f._)`"use strict"; ${C(o, c)}`), b(t, c), t.code(l);
		}) : t.func(a, (0, f._)`${p.default.data}, ${y(c)}`, s.$async, () => t.code(C(o, c)).code(l));
	}
	function y(t) {
		return (0, f._)`{${p.default.instancePath}="", ${p.default.parentData}, ${p.default.parentDataProperty}, ${p.default.rootData}=${p.default.data}${t.dynamicRef ? (0, f._)`, ${p.default.dynamicAnchors}={}` : f.nil}}={}`;
	}
	function b(t, a) {
		t.if(p.default.valCxt, () => {
			t.var(p.default.instancePath, (0, f._)`${p.default.valCxt}.${p.default.instancePath}`), t.var(p.default.parentData, (0, f._)`${p.default.valCxt}.${p.default.parentData}`), t.var(p.default.parentDataProperty, (0, f._)`${p.default.valCxt}.${p.default.parentDataProperty}`), t.var(p.default.rootData, (0, f._)`${p.default.valCxt}.${p.default.rootData}`), a.dynamicRef && t.var(p.default.dynamicAnchors, (0, f._)`${p.default.valCxt}.${p.default.dynamicAnchors}`);
		}, () => {
			t.var(p.default.instancePath, (0, f._)`""`), t.var(p.default.parentData, (0, f._)`undefined`), t.var(p.default.parentDataProperty, (0, f._)`undefined`), t.var(p.default.rootData, p.default.data), a.dynamicRef && t.var(p.default.dynamicAnchors, (0, f._)`{}`);
		});
	}
	function x(t) {
		let { schema: a, opts: o, gen: s } = t;
		v(t, () => {
			o.$comment && a.$comment && P(t), j(t), s.let(p.default.vErrors, null), s.let(p.default.errors, 0), o.unevaluated && S(t), k(t), F(t);
		});
	}
	function S(t) {
		let { gen: a, validateName: o } = t;
		t.evaluated = a.const("evaluated", (0, f._)`${o}.evaluated`), a.if((0, f._)`${t.evaluated}.dynamicProps`, () => a.assign((0, f._)`${t.evaluated}.props`, (0, f._)`undefined`)), a.if((0, f._)`${t.evaluated}.dynamicItems`, () => a.assign((0, f._)`${t.evaluated}.items`, (0, f._)`undefined`));
	}
	function C(t, a) {
		let o = typeof t == "object" && t[a.schemaId];
		return o && (a.code.source || a.code.process) ? (0, f._)`/*# sourceURL=${o} */` : f.nil;
	}
	function w(t, o) {
		if (E(t) && (O(t), T(t))) {
			D(t, o);
			return;
		}
		(0, a.boolOrEmptySchema)(t, o);
	}
	function T({ schema: t, self: a }) {
		if (typeof t == "boolean") return !t;
		for (let o in t) if (a.RULES.all[o]) return !0;
		return !1;
	}
	function E(t) {
		return typeof t.schema != "boolean";
	}
	function D(t, a) {
		let { schema: o, gen: s, opts: c } = t;
		c.$comment && o.$comment && P(t), M(t), N(t);
		let l = s.const("_errs", p.default.errors);
		k(t, l), s.var(a, (0, f._)`${l} === ${p.default.errors}`);
	}
	function O(t) {
		(0, h.checkUnknownRules)(t), A(t);
	}
	function k(t, a) {
		if (t.opts.jtd) return L(t, [], !1, a);
		let s = (0, o.getSchemaTypes)(t.schema);
		L(t, s, !(0, o.coerceAndCheckDataType)(t, s), a);
	}
	function A(t) {
		let { schema: a, errSchemaPath: o, opts: s, self: c } = t;
		a.$ref && s.ignoreKeywordsWithRef && (0, h.schemaHasRulesButRef)(a, c.RULES) && c.logger.warn(`$ref: keywords ignored in schema at path "${o}"`);
	}
	function j(t) {
		let { schema: a, opts: o } = t;
		a.default !== void 0 && o.useDefaults && o.strictSchema && (0, h.checkStrictMode)(t, "default is ignored in the schema root");
	}
	function M(t) {
		let a = t.schema[t.opts.schemaId];
		a && (t.baseId = (0, m.resolveUrl)(t.opts.uriResolver, t.baseId, a));
	}
	function N(t) {
		if (t.schema.$async && !t.schemaEnv.$async) throw Error("async schema in sync schema");
	}
	function P({ gen: t, schemaEnv: a, schema: o, errSchemaPath: s, opts: c }) {
		let l = o.$comment;
		if (c.$comment === !0) t.code((0, f._)`${p.default.self}.logger.log(${l})`);
		else if (typeof c.$comment == "function") {
			let o = (0, f.str)`${s}/$comment`, c = t.scopeValue("root", { ref: a.root });
			t.code((0, f._)`${p.default.self}.opts.$comment(${l}, ${o}, ${c}.schema)`);
		}
	}
	function F(t) {
		let { gen: a, schemaEnv: o, validateName: s, ValidationError: c, opts: l } = t;
		o.$async ? a.if((0, f._)`${p.default.errors} === 0`, () => a.return(p.default.data), () => a.throw((0, f._)`new ${c}(${p.default.vErrors})`)) : (a.assign((0, f._)`${s}.errors`, p.default.vErrors), l.unevaluated && I(t), a.return((0, f._)`${p.default.errors} === 0`));
	}
	function I({ gen: t, evaluated: a, props: o, items: s }) {
		o instanceof f.Name && t.assign((0, f._)`${a}.props`, o), s instanceof f.Name && t.assign((0, f._)`${a}.items`, s);
	}
	function L(t, a, o, l) {
		let { gen: u, schema: d, data: m, allErrors: g, opts: _, self: v } = t, { RULES: y } = v;
		if (d.$ref && (_.ignoreKeywordsWithRef || !(0, h.schemaHasRulesButRef)(d, y))) {
			u.block(() => J(t, "$ref", y.all.$ref.definition));
			return;
		}
		_.jtd || z(t, a), u.block(() => {
			for (let t of y.rules) b(t);
			b(y.post);
		});
		function b(h) {
			(0, s.shouldUseGroup)(d, h) && (h.type ? (u.if((0, c.checkDataType)(h.type, m, _.strictNumbers)), R(t, h), a.length === 1 && a[0] === h.type && o && (u.else(), (0, c.reportTypeError)(t)), u.endIf()) : R(t, h), g || u.if((0, f._)`${p.default.errors} === ${l || 0}`));
		}
	}
	function R(t, a) {
		let { gen: o, schema: c, opts: { useDefaults: u } } = t;
		u && (0, l.assignDefaults)(t, a.type), o.block(() => {
			for (let o of a.rules) (0, s.shouldUseRule)(c, o) && J(t, o.keyword, o.definition, a.type);
		});
	}
	function z(t, a) {
		t.schemaEnv.meta || !t.opts.strictTypes || (B(t, a), t.opts.allowUnionTypes || V(t, a), H(t, t.dataTypes));
	}
	function B(t, a) {
		if (a.length) {
			if (!t.dataTypes.length) {
				t.dataTypes = a;
				return;
			}
			a.forEach((a) => {
				W(t.dataTypes, a) || K(t, `type "${a}" not allowed by context "${t.dataTypes.join(",")}"`);
			}), G(t, a);
		}
	}
	function V(t, a) {
		a.length > 1 && !(a.length === 2 && a.includes("null")) && K(t, "use allowUnionTypes to allow union type keyword");
	}
	function H(t, a) {
		let o = t.self.RULES.all;
		for (let c in o) {
			let l = o[c];
			if (typeof l == "object" && (0, s.shouldUseRule)(t.schema, l)) {
				let { type: o } = l.definition;
				o.length && !o.some((t) => U(a, t)) && K(t, `missing type "${o.join(",")}" for keyword "${c}"`);
			}
		}
	}
	function U(t, a) {
		return t.includes(a) || a === "number" && t.includes("integer");
	}
	function W(t, a) {
		return t.includes(a) || a === "integer" && t.includes("number");
	}
	function G(t, a) {
		let o = [];
		for (let s of t.dataTypes) W(a, s) ? o.push(s) : a.includes("integer") && s === "number" && o.push("integer");
		t.dataTypes = o;
	}
	function K(t, a) {
		let o = t.schemaEnv.baseId + t.errSchemaPath;
		a += ` at "${o}" (strictTypes)`, (0, h.checkStrictMode)(t, a, t.opts.strictTypes);
	}
	var q = class {
		constructor(t, a, o) {
			if ((0, u.validateKeywordUsage)(t, a, o), this.gen = t.gen, this.allErrors = t.allErrors, this.keyword = o, this.data = t.data, this.schema = t.schema[o], this.$data = a.$data && t.opts.$data && this.schema && this.schema.$data, this.schemaValue = (0, h.schemaRefOrVal)(t, this.schema, o, this.$data), this.schemaType = a.schemaType, this.parentSchema = t.schema, this.params = {}, this.it = t, this.def = a, this.$data) this.schemaCode = t.gen.const("vSchema", Z(this.$data, t));
			else if (this.schemaCode = this.schemaValue, !(0, u.validSchemaType)(this.schema, a.schemaType, a.allowUndefined)) throw Error(`${o} value must be ${JSON.stringify(a.schemaType)}`);
			("code" in a ? a.trackErrors : a.errors !== !1) && (this.errsCount = t.gen.const("_errs", p.default.errors));
		}
		result(t, a, o) {
			this.failResult((0, f.not)(t), a, o);
		}
		failResult(t, a, o) {
			this.gen.if(t), o ? o() : this.error(), a ? (this.gen.else(), a(), this.allErrors && this.gen.endIf()) : this.allErrors ? this.gen.endIf() : this.gen.else();
		}
		pass(t, a) {
			this.failResult((0, f.not)(t), void 0, a);
		}
		fail(t) {
			if (t === void 0) {
				this.error(), this.allErrors || this.gen.if(!1);
				return;
			}
			this.gen.if(t), this.error(), this.allErrors ? this.gen.endIf() : this.gen.else();
		}
		fail$data(t) {
			if (!this.$data) return this.fail(t);
			let { schemaCode: a } = this;
			this.fail((0, f._)`${a} !== undefined && (${(0, f.or)(this.invalid$data(), t)})`);
		}
		error(t, a, o) {
			if (a) {
				this.setParams(a), this._error(t, o), this.setParams({});
				return;
			}
			this._error(t, o);
		}
		_error(t, a) {
			(t ? g.reportExtraError : g.reportError)(this, this.def.error, a);
		}
		$dataError() {
			(0, g.reportError)(this, this.def.$dataError || g.keyword$DataError);
		}
		reset() {
			if (this.errsCount === void 0) throw Error("add \"trackErrors\" to keyword definition");
			(0, g.resetErrorsCount)(this.gen, this.errsCount);
		}
		ok(t) {
			this.allErrors || this.gen.if(t);
		}
		setParams(t, a) {
			a ? Object.assign(this.params, t) : this.params = t;
		}
		block$data(t, a, o = f.nil) {
			this.gen.block(() => {
				this.check$data(t, o), a();
			});
		}
		check$data(t = f.nil, a = f.nil) {
			if (!this.$data) return;
			let { gen: o, schemaCode: s, schemaType: c, def: l } = this;
			o.if((0, f.or)((0, f._)`${s} === undefined`, a)), t !== f.nil && o.assign(t, !0), (c.length || l.validateSchema) && (o.elseIf(this.invalid$data()), this.$dataError(), t !== f.nil && o.assign(t, !1)), o.else();
		}
		invalid$data() {
			let { gen: t, schemaCode: a, schemaType: o, def: s, it: l } = this;
			return (0, f.or)(u(), d());
			function u() {
				if (o.length) {
					/* istanbul ignore if */
					if (!(a instanceof f.Name)) throw Error("ajv implementation error");
					let t = Array.isArray(o) ? o : [o];
					return (0, f._)`${(0, c.checkDataTypes)(t, a, l.opts.strictNumbers, c.DataType.Wrong)}`;
				}
				return f.nil;
			}
			function d() {
				if (s.validateSchema) {
					let o = t.scopeValue("validate$data", { ref: s.validateSchema });
					return (0, f._)`!${o}(${a})`;
				}
				return f.nil;
			}
		}
		subschema(t, a) {
			let o = (0, d.getSubschema)(this.it, t);
			(0, d.extendSubschemaData)(o, this.it, t), (0, d.extendSubschemaMode)(o, t);
			let s = {
				...this.it,
				...o,
				items: void 0,
				props: void 0
			};
			return w(s, a), s;
		}
		mergeEvaluated(t, a) {
			let { it: o, gen: s } = this;
			o.opts.unevaluated && (o.props !== !0 && t.props !== void 0 && (o.props = h.mergeEvaluated.props(s, t.props, o.props, a)), o.items !== !0 && t.items !== void 0 && (o.items = h.mergeEvaluated.items(s, t.items, o.items, a)));
		}
		mergeValidEvaluated(t, a) {
			let { it: o, gen: s } = this;
			if (o.opts.unevaluated && (o.props !== !0 || o.items !== !0)) return s.if(a, () => this.mergeEvaluated(t, f.Name)), !0;
		}
	};
	t.KeywordCxt = q;
	function J(t, a, o, s) {
		let c = new q(t, o, a);
		"code" in o ? o.code(c, s) : c.$data && o.validate ? (0, u.funcKeywordCode)(c, o) : "macro" in o ? (0, u.macroKeywordCode)(c, o) : (o.compile || o.validate) && (0, u.funcKeywordCode)(c, o);
	}
	var Y = /^\/(?:[^~]|~0|~1)*$/, X = /^([0-9]+)(#|\/(?:[^~]|~0|~1)*)?$/;
	function Z(t, { dataLevel: a, dataNames: o, dataPathArr: s }) {
		let c, l;
		if (t === "") return p.default.rootData;
		if (t[0] === "/") {
			if (!Y.test(t)) throw Error(`Invalid JSON-pointer: ${t}`);
			c = t, l = p.default.rootData;
		} else {
			let u = X.exec(t);
			if (!u) throw Error(`Invalid JSON-pointer: ${t}`);
			let d = +u[1];
			if (c = u[2], c === "#") {
				if (d >= a) throw Error(m("property/index", d));
				return s[a - d];
			}
			if (d > a) throw Error(m("data", d));
			if (l = o[a - d], !c) return l;
		}
		let u = l, d = c.split("/");
		for (let t of d) t && (l = (0, f._)`${l}${(0, f.getProperty)((0, h.unescapeJsonPointer)(t))}`, u = (0, f._)`${u} && ${l}`);
		return u;
		function m(t, o) {
			return `Cannot access ${t} ${o} levels up, current level is ${a}`;
		}
	}
	t.getData = Z;
})), require_validation_error = /* @__PURE__ */ __commonJSMin(((t) => {
	Object.defineProperty(t, "__esModule", { value: !0 }), t.default = class extends Error {
		constructor(t) {
			super("validation failed"), this.errors = t, this.ajv = this.validation = !0;
		}
	};
})), require_ref_error = /* @__PURE__ */ __commonJSMin(((t) => {
	Object.defineProperty(t, "__esModule", { value: !0 });
	var a = require_resolve();
	t.default = class extends Error {
		constructor(t, o, s, c) {
			super(c || `can't resolve reference ${s} from id ${o}`), this.missingRef = (0, a.resolveUrl)(t, o, s), this.missingSchema = (0, a.normalizeId)((0, a.getFullPath)(t, this.missingRef));
		}
	};
})), require_compile = /* @__PURE__ */ __commonJSMin(((t) => {
	Object.defineProperty(t, "__esModule", { value: !0 }), t.resolveSchema = t.getCompilingSchema = t.resolveRef = t.compileSchema = t.SchemaEnv = void 0;
	var a = require_codegen(), o = require_validation_error(), s = require_names(), c = require_resolve(), l = require_util$1(), u = require_validate(), d = class {
		constructor(t) {
			this.refs = {}, this.dynamicAnchors = {};
			let a;
			typeof t.schema == "object" && (a = t.schema), this.schema = t.schema, this.schemaId = t.schemaId, this.root = t.root || this, this.baseId = t.baseId ?? (0, c.normalizeId)(a?.[t.schemaId || "$id"]), this.schemaPath = t.schemaPath, this.localRefs = t.localRefs, this.meta = t.meta, this.$async = a?.$async, this.refs = {};
		}
	};
	t.SchemaEnv = d;
	function f(t) {
		let l = h.call(this, t);
		if (l) return l;
		let d = (0, c.getFullPath)(this.opts.uriResolver, t.root.baseId), { es5: f, lines: p } = this.opts.code, { ownProperties: m } = this.opts, g = new a.CodeGen(this.scope, {
			es5: f,
			lines: p,
			ownProperties: m
		}), _;
		t.$async && (_ = g.scopeValue("Error", {
			ref: o.default,
			code: (0, a._)`require("ajv/dist/runtime/validation_error").default`
		}));
		let v = g.scopeName("validate");
		t.validateName = v;
		let y = {
			gen: g,
			allErrors: this.opts.allErrors,
			data: s.default.data,
			parentData: s.default.parentData,
			parentDataProperty: s.default.parentDataProperty,
			dataNames: [s.default.data],
			dataPathArr: [a.nil],
			dataLevel: 0,
			dataTypes: [],
			definedProperties: /* @__PURE__ */ new Set(),
			topSchemaRef: g.scopeValue("schema", this.opts.code.source === !0 ? {
				ref: t.schema,
				code: (0, a.stringify)(t.schema)
			} : { ref: t.schema }),
			validateName: v,
			ValidationError: _,
			schema: t.schema,
			schemaEnv: t,
			rootId: d,
			baseId: t.baseId || d,
			schemaPath: a.nil,
			errSchemaPath: t.schemaPath || (this.opts.jtd ? "" : "#"),
			errorPath: (0, a._)`""`,
			opts: this.opts,
			self: this
		}, b;
		try {
			this._compilations.add(t), (0, u.validateFunctionCode)(y), g.optimize(this.opts.code.optimize);
			let o = g.toString();
			b = `${g.scopeRefs(s.default.scope)}return ${o}`, this.opts.code.process && (b = this.opts.code.process(b, t));
			let c = Function(`${s.default.self}`, `${s.default.scope}`, b)(this, this.scope.get());
			if (this.scope.value(v, { ref: c }), c.errors = null, c.schema = t.schema, c.schemaEnv = t, t.$async && (c.$async = !0), this.opts.code.source === !0 && (c.source = {
				validateName: v,
				validateCode: o,
				scopeValues: g._values
			}), this.opts.unevaluated) {
				let { props: t, items: o } = y;
				c.evaluated = {
					props: t instanceof a.Name ? void 0 : t,
					items: o instanceof a.Name ? void 0 : o,
					dynamicProps: t instanceof a.Name,
					dynamicItems: o instanceof a.Name
				}, c.source && (c.source.evaluated = (0, a.stringify)(c.evaluated));
			}
			return t.validate = c, t;
		} catch (a) {
			throw delete t.validate, delete t.validateName, b && this.logger.error("Error compiling schema, function code:", b), a;
		} finally {
			this._compilations.delete(t);
		}
	}
	t.compileSchema = f;
	function p(t, a, o) {
		o = (0, c.resolveUrl)(this.opts.uriResolver, a, o);
		let s = t.refs[o];
		if (s) return s;
		let l = _.call(this, t, o);
		if (l === void 0) {
			let s = t.localRefs?.[o], { schemaId: c } = this.opts;
			s && (l = new d({
				schema: s,
				schemaId: c,
				root: t,
				baseId: a
			}));
		}
		if (l !== void 0) return t.refs[o] = m.call(this, l);
	}
	t.resolveRef = p;
	function m(t) {
		return (0, c.inlineRef)(t.schema, this.opts.inlineRefs) ? t.schema : t.validate ? t : f.call(this, t);
	}
	function h(t) {
		for (let a of this._compilations) if (g(a, t)) return a;
	}
	t.getCompilingSchema = h;
	function g(t, a) {
		return t.schema === a.schema && t.root === a.root && t.baseId === a.baseId;
	}
	function _(t, a) {
		let o;
		for (; typeof (o = this.refs[a]) == "string";) a = o;
		return o || this.schemas[a] || v.call(this, t, a);
	}
	function v(t, a) {
		let o = this.opts.uriResolver.parse(a), s = (0, c._getFullPath)(this.opts.uriResolver, o), l = (0, c.getFullPath)(this.opts.uriResolver, t.baseId, void 0);
		if (Object.keys(t.schema).length > 0 && s === l) return b.call(this, o, t);
		let u = (0, c.normalizeId)(s), p = this.refs[u] || this.schemas[u];
		if (typeof p == "string") {
			let a = v.call(this, t, p);
			return typeof a?.schema == "object" ? b.call(this, o, a) : void 0;
		}
		if (typeof p?.schema == "object") {
			if (p.validate || f.call(this, p), u === (0, c.normalizeId)(a)) {
				let { schema: a } = p, { schemaId: o } = this.opts, s = a[o];
				return s && (l = (0, c.resolveUrl)(this.opts.uriResolver, l, s)), new d({
					schema: a,
					schemaId: o,
					root: t,
					baseId: l
				});
			}
			return b.call(this, o, p);
		}
	}
	t.resolveSchema = v;
	var y = new Set([
		"properties",
		"patternProperties",
		"enum",
		"dependencies",
		"definitions"
	]);
	function b(t, { baseId: a, schema: o, root: s }) {
		if (t.fragment?.[0] !== "/") return;
		for (let s of t.fragment.slice(1).split("/")) {
			if (typeof o == "boolean") return;
			let t = o[(0, l.unescapeFragment)(s)];
			if (t === void 0) return;
			o = t;
			let u = typeof o == "object" && o[this.opts.schemaId];
			!y.has(s) && u && (a = (0, c.resolveUrl)(this.opts.uriResolver, a, u));
		}
		let u;
		if (typeof o != "boolean" && o.$ref && !(0, l.schemaHasRulesButRef)(o, this.RULES)) {
			let t = (0, c.resolveUrl)(this.opts.uriResolver, a, o.$ref);
			u = v.call(this, s, t);
		}
		let { schemaId: f } = this.opts;
		if (u ||= new d({
			schema: o,
			schemaId: f,
			root: s,
			baseId: a
		}), u.schema !== u.root.schema) return u;
	}
})), data_exports = /* @__PURE__ */ __export({
	$id: () => $id$1,
	additionalProperties: () => !1,
	default: () => data_default,
	description: () => description,
	properties: () => properties$1,
	required: () => required,
	type: () => type$1
}, 1), $id$1, description, type$1, required, properties$1, data_default, init_data = __esmMin((() => {
	$id$1 = "https://raw.githubusercontent.com/ajv-validator/ajv/master/lib/refs/data.json#", description = "Meta-schema for $data reference (JSON AnySchema extension proposal)", type$1 = "object", required = ["$data"], properties$1 = { $data: {
		type: "string",
		anyOf: [{ format: "relative-json-pointer" }, { format: "json-pointer" }]
	} }, data_default = {
		$id: $id$1,
		description,
		type: type$1,
		required,
		properties: properties$1,
		additionalProperties: !1
	};
})), require_uri = /* @__PURE__ */ __commonJSMin(((t) => {
	Object.defineProperty(t, "__esModule", { value: !0 });
	var a = require_fast_uri();
	a.code = "require(\"ajv/dist/runtime/uri\").default", t.default = a;
})), require_core$1 = /* @__PURE__ */ __commonJSMin(((t) => {
	Object.defineProperty(t, "__esModule", { value: !0 }), t.CodeGen = t.Name = t.nil = t.stringify = t.str = t._ = t.KeywordCxt = void 0;
	var a = require_validate();
	Object.defineProperty(t, "KeywordCxt", {
		enumerable: !0,
		get: function() {
			return a.KeywordCxt;
		}
	});
	var o = require_codegen();
	Object.defineProperty(t, "_", {
		enumerable: !0,
		get: function() {
			return o._;
		}
	}), Object.defineProperty(t, "str", {
		enumerable: !0,
		get: function() {
			return o.str;
		}
	}), Object.defineProperty(t, "stringify", {
		enumerable: !0,
		get: function() {
			return o.stringify;
		}
	}), Object.defineProperty(t, "nil", {
		enumerable: !0,
		get: function() {
			return o.nil;
		}
	}), Object.defineProperty(t, "Name", {
		enumerable: !0,
		get: function() {
			return o.Name;
		}
	}), Object.defineProperty(t, "CodeGen", {
		enumerable: !0,
		get: function() {
			return o.CodeGen;
		}
	});
	var s = require_validation_error(), c = require_ref_error(), l = require_rules(), u = require_compile(), d = require_codegen(), f = require_resolve(), p = require_dataType(), m = require_util$1(), h = (init_data(), __toCommonJS(data_exports).default), g = require_uri(), _ = (t, a) => new RegExp(t, a);
	_.code = "new RegExp";
	var v = [
		"removeAdditional",
		"useDefaults",
		"coerceTypes"
	], y = new Set([
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
	]), b = {
		errorDataPath: "",
		format: "`validateFormats: false` can be used instead.",
		nullable: "\"nullable\" keyword is supported by default.",
		jsonPointers: "Deprecated jsPropertySyntax can be used instead.",
		extendRefs: "Deprecated ignoreKeywordsWithRef can be used instead.",
		missingRefs: "Pass empty schema with $id that should be ignored to ajv.addSchema.",
		processCode: "Use option `code: {process: (code, schemaEnv: object) => string}`",
		sourceCode: "Use option `code: {source: true}`",
		strictDefaults: "It is default now, see option `strict`.",
		strictKeywords: "It is default now, see option `strict`.",
		uniqueItems: "\"uniqueItems\" keyword is always validated.",
		unknownFormats: "Disable strict mode or pass `true` to `ajv.addFormat` (or `formats` option).",
		cache: "Map is used as cache, schema object as key.",
		serialize: "Map is used as cache, schema object as key.",
		ajvErrors: "It is default now."
	}, x = {
		ignoreKeywordsWithRef: "",
		jsPropertySyntax: "",
		unicode: "\"minLength\"/\"maxLength\" account for unicode characters by default."
	}, S = 200;
	function C(t) {
		let a = t.strict, o = t.code?.optimize, s = o === !0 || o === void 0 ? 1 : o || 0, c = t.code?.regExp ?? _, l = t.uriResolver ?? g.default;
		return {
			strictSchema: t.strictSchema ?? a ?? !0,
			strictNumbers: t.strictNumbers ?? a ?? !0,
			strictTypes: t.strictTypes ?? a ?? "log",
			strictTuples: t.strictTuples ?? a ?? "log",
			strictRequired: t.strictRequired ?? a ?? !1,
			code: t.code ? {
				...t.code,
				optimize: s,
				regExp: c
			} : {
				optimize: s,
				regExp: c
			},
			loopRequired: t.loopRequired ?? S,
			loopEnum: t.loopEnum ?? S,
			meta: t.meta ?? !0,
			messages: t.messages ?? !0,
			inlineRefs: t.inlineRefs ?? !0,
			schemaId: t.schemaId ?? "$id",
			addUsedSchema: t.addUsedSchema ?? !0,
			validateSchema: t.validateSchema ?? !0,
			validateFormats: t.validateFormats ?? !0,
			unicodeRegExp: t.unicodeRegExp ?? !0,
			int32range: t.int32range ?? !0,
			uriResolver: l
		};
	}
	var w = class {
		constructor(t = {}) {
			this.schemas = {}, this.refs = {}, this.formats = {}, this._compilations = /* @__PURE__ */ new Set(), this._loading = {}, this._cache = /* @__PURE__ */ new Map(), t = this.opts = {
				...t,
				...C(t)
			};
			let { es5: a, lines: o } = this.opts.code;
			this.scope = new d.ValueScope({
				scope: {},
				prefixes: y,
				es5: a,
				lines: o
			}), this.logger = N(t.logger);
			let s = t.validateFormats;
			t.validateFormats = !1, this.RULES = (0, l.getRules)(), T.call(this, b, t, "NOT SUPPORTED"), T.call(this, x, t, "DEPRECATED", "warn"), this._metaOpts = j.call(this), t.formats && O.call(this), this._addVocabularies(), this._addDefaultMetaSchema(), t.keywords && k.call(this, t.keywords), typeof t.meta == "object" && this.addMetaSchema(t.meta), D.call(this), t.validateFormats = s;
		}
		_addVocabularies() {
			this.addKeyword("$async");
		}
		_addDefaultMetaSchema() {
			let { $data: t, meta: a, schemaId: o } = this.opts, s = h;
			o === "id" && (s = { ...h }, s.id = s.$id, delete s.$id), a && t && this.addMetaSchema(s, s[o], !1);
		}
		defaultMeta() {
			let { meta: t, schemaId: a } = this.opts;
			return this.opts.defaultMeta = typeof t == "object" ? t[a] || t : void 0;
		}
		validate(t, a) {
			let o;
			if (typeof t == "string") {
				if (o = this.getSchema(t), !o) throw Error(`no schema with key or ref "${t}"`);
			} else o = this.compile(t);
			let s = o(a);
			return "$async" in o || (this.errors = o.errors), s;
		}
		compile(t, a) {
			let o = this._addSchema(t, a);
			return o.validate || this._compileSchemaEnv(o);
		}
		compileAsync(t, a) {
			if (typeof this.opts.loadSchema != "function") throw Error("options.loadSchema should be a function");
			let { loadSchema: o } = this.opts;
			return s.call(this, t, a);
			async function s(t, a) {
				await l.call(this, t.$schema);
				let o = this._addSchema(t, a);
				return o.validate || u.call(this, o);
			}
			async function l(t) {
				t && !this.getSchema(t) && await s.call(this, { $ref: t }, !0);
			}
			async function u(t) {
				try {
					return this._compileSchemaEnv(t);
				} catch (a) {
					if (!(a instanceof c.default)) throw a;
					return d.call(this, a), await f.call(this, a.missingSchema), u.call(this, t);
				}
			}
			function d({ missingSchema: t, missingRef: a }) {
				if (this.refs[t]) throw Error(`AnySchema ${t} is loaded but ${a} cannot be resolved`);
			}
			async function f(t) {
				let o = await p.call(this, t);
				this.refs[t] || await l.call(this, o.$schema), this.refs[t] || this.addSchema(o, t, a);
			}
			async function p(t) {
				let a = this._loading[t];
				if (a) return a;
				try {
					return await (this._loading[t] = o(t));
				} finally {
					delete this._loading[t];
				}
			}
		}
		addSchema(t, a, o, s = this.opts.validateSchema) {
			if (Array.isArray(t)) {
				for (let a of t) this.addSchema(a, void 0, o, s);
				return this;
			}
			let c;
			if (typeof t == "object") {
				let { schemaId: a } = this.opts;
				if (c = t[a], c !== void 0 && typeof c != "string") throw Error(`schema ${a} must be string`);
			}
			return a = (0, f.normalizeId)(a || c), this._checkUnique(a), this.schemas[a] = this._addSchema(t, o, a, s, !0), this;
		}
		addMetaSchema(t, a, o = this.opts.validateSchema) {
			return this.addSchema(t, a, !0, o), this;
		}
		validateSchema(t, a) {
			if (typeof t == "boolean") return !0;
			let o;
			if (o = t.$schema, o !== void 0 && typeof o != "string") throw Error("$schema must be a string");
			if (o = o || this.opts.defaultMeta || this.defaultMeta(), !o) return this.logger.warn("meta-schema not available"), this.errors = null, !0;
			let s = this.validate(o, t);
			if (!s && a) {
				let t = "schema is invalid: " + this.errorsText();
				if (this.opts.validateSchema === "log") this.logger.error(t);
				else throw Error(t);
			}
			return s;
		}
		getSchema(t) {
			let a;
			for (; typeof (a = E.call(this, t)) == "string";) t = a;
			if (a === void 0) {
				let { schemaId: o } = this.opts, s = new u.SchemaEnv({
					schema: {},
					schemaId: o
				});
				if (a = u.resolveSchema.call(this, s, t), !a) return;
				this.refs[t] = a;
			}
			return a.validate || this._compileSchemaEnv(a);
		}
		removeSchema(t) {
			if (t instanceof RegExp) return this._removeAllSchemas(this.schemas, t), this._removeAllSchemas(this.refs, t), this;
			switch (typeof t) {
				case "undefined": return this._removeAllSchemas(this.schemas), this._removeAllSchemas(this.refs), this._cache.clear(), this;
				case "string": {
					let a = E.call(this, t);
					return typeof a == "object" && this._cache.delete(a.schema), delete this.schemas[t], delete this.refs[t], this;
				}
				case "object": {
					let a = t;
					this._cache.delete(a);
					let o = t[this.opts.schemaId];
					return o && (o = (0, f.normalizeId)(o), delete this.schemas[o], delete this.refs[o]), this;
				}
				default: throw Error("ajv.removeSchema: invalid parameter");
			}
		}
		addVocabulary(t) {
			for (let a of t) this.addKeyword(a);
			return this;
		}
		addKeyword(t, a) {
			let o;
			if (typeof t == "string") o = t, typeof a == "object" && (this.logger.warn("these parameters are deprecated, see docs for addKeyword"), a.keyword = o);
			else if (typeof t == "object" && a === void 0) {
				if (a = t, o = a.keyword, Array.isArray(o) && !o.length) throw Error("addKeywords: keyword must be string or non-empty array");
			} else throw Error("invalid addKeywords parameters");
			if (F.call(this, o, a), !a) return (0, m.eachItem)(o, (t) => I.call(this, t)), this;
			R.call(this, a);
			let s = {
				...a,
				type: (0, p.getJSONTypes)(a.type),
				schemaType: (0, p.getJSONTypes)(a.schemaType)
			};
			return (0, m.eachItem)(o, s.type.length === 0 ? (t) => I.call(this, t, s) : (t) => s.type.forEach((a) => I.call(this, t, s, a))), this;
		}
		getKeyword(t) {
			let a = this.RULES.all[t];
			return typeof a == "object" ? a.definition : !!a;
		}
		removeKeyword(t) {
			let { RULES: a } = this;
			delete a.keywords[t], delete a.all[t];
			for (let o of a.rules) {
				let a = o.rules.findIndex((a) => a.keyword === t);
				a >= 0 && o.rules.splice(a, 1);
			}
			return this;
		}
		addFormat(t, a) {
			return typeof a == "string" && (a = new RegExp(a)), this.formats[t] = a, this;
		}
		errorsText(t = this.errors, { separator: a = ", ", dataVar: o = "data" } = {}) {
			return !t || t.length === 0 ? "No errors" : t.map((t) => `${o}${t.instancePath} ${t.message}`).reduce((t, o) => t + a + o);
		}
		$dataMetaSchema(t, a) {
			let o = this.RULES.all;
			t = JSON.parse(JSON.stringify(t));
			for (let s of a) {
				let a = s.split("/").slice(1), c = t;
				for (let t of a) c = c[t];
				for (let t in o) {
					let a = o[t];
					if (typeof a != "object") continue;
					let { $data: s } = a.definition, l = c[t];
					s && l && (c[t] = B(l));
				}
			}
			return t;
		}
		_removeAllSchemas(t, a) {
			for (let o in t) {
				let s = t[o];
				(!a || a.test(o)) && (typeof s == "string" ? delete t[o] : s && !s.meta && (this._cache.delete(s.schema), delete t[o]));
			}
		}
		_addSchema(t, a, o, s = this.opts.validateSchema, c = this.opts.addUsedSchema) {
			let l, { schemaId: d } = this.opts;
			if (typeof t == "object") l = t[d];
			else if (this.opts.jtd) throw Error("schema must be object");
			else if (typeof t != "boolean") throw Error("schema must be object or boolean");
			let p = this._cache.get(t);
			if (p !== void 0) return p;
			o = (0, f.normalizeId)(l || o);
			let m = f.getSchemaRefs.call(this, t, o);
			return p = new u.SchemaEnv({
				schema: t,
				schemaId: d,
				meta: a,
				baseId: o,
				localRefs: m
			}), this._cache.set(p.schema, p), c && !o.startsWith("#") && (o && this._checkUnique(o), this.refs[o] = p), s && this.validateSchema(t, !0), p;
		}
		_checkUnique(t) {
			if (this.schemas[t] || this.refs[t]) throw Error(`schema with key or id "${t}" already exists`);
		}
		_compileSchemaEnv(t) {
			/* istanbul ignore if */
			if (t.meta ? this._compileMetaSchema(t) : u.compileSchema.call(this, t), !t.validate) throw Error("ajv implementation error");
			return t.validate;
		}
		_compileMetaSchema(t) {
			let a = this.opts;
			this.opts = this._metaOpts;
			try {
				u.compileSchema.call(this, t);
			} finally {
				this.opts = a;
			}
		}
	};
	w.ValidationError = s.default, w.MissingRefError = c.default, t.default = w;
	function T(t, a, o, s = "error") {
		for (let c in t) {
			let l = c;
			l in a && this.logger[s](`${o}: option ${c}. ${t[l]}`);
		}
	}
	function E(t) {
		return t = (0, f.normalizeId)(t), this.schemas[t] || this.refs[t];
	}
	function D() {
		let t = this.opts.schemas;
		if (t) if (Array.isArray(t)) this.addSchema(t);
		else for (let a in t) this.addSchema(t[a], a);
	}
	function O() {
		for (let t in this.opts.formats) {
			let a = this.opts.formats[t];
			a && this.addFormat(t, a);
		}
	}
	function k(t) {
		if (Array.isArray(t)) {
			this.addVocabulary(t);
			return;
		}
		for (let a in this.logger.warn("keywords option as map is deprecated, pass array"), t) {
			let o = t[a];
			o.keyword ||= a, this.addKeyword(o);
		}
	}
	function j() {
		let t = { ...this.opts };
		for (let a of v) delete t[a];
		return t;
	}
	var M = {
		log() {},
		warn() {},
		error() {}
	};
	function N(t) {
		if (t === !1) return M;
		if (t === void 0) return console;
		if (t.log && t.warn && t.error) return t;
		throw Error("logger must implement log, warn and error methods");
	}
	var P = /^[a-z_$][a-z0-9_$:-]*$/i;
	function F(t, a) {
		let { RULES: o } = this;
		if ((0, m.eachItem)(t, (t) => {
			if (o.keywords[t]) throw Error(`Keyword ${t} is already defined`);
			if (!P.test(t)) throw Error(`Keyword ${t} has invalid name`);
		}), a && a.$data && !("code" in a || "validate" in a)) throw Error("$data keyword must have \"code\" or \"validate\" function");
	}
	function I(t, a, o) {
		var s;
		let c = a?.post;
		if (o && c) throw Error("keyword with \"post\" flag cannot have \"type\"");
		let { RULES: l } = this, u = c ? l.post : l.rules.find(({ type: t }) => t === o);
		if (u || (u = {
			type: o,
			rules: []
		}, l.rules.push(u)), l.keywords[t] = !0, !a) return;
		let d = {
			keyword: t,
			definition: {
				...a,
				type: (0, p.getJSONTypes)(a.type),
				schemaType: (0, p.getJSONTypes)(a.schemaType)
			}
		};
		a.before ? L.call(this, u, d, a.before) : u.rules.push(d), l.all[t] = d, (s = a.implements) == null || s.forEach((t) => this.addKeyword(t));
	}
	function L(t, a, o) {
		let s = t.rules.findIndex((t) => t.keyword === o);
		s >= 0 ? t.rules.splice(s, 0, a) : (t.rules.push(a), this.logger.warn(`rule ${o} is not defined`));
	}
	function R(t) {
		let { metaSchema: a } = t;
		a !== void 0 && (t.$data && this.opts.$data && (a = B(a)), t.validateSchema = this.compile(a, !0));
	}
	var z = { $ref: "https://raw.githubusercontent.com/ajv-validator/ajv/master/lib/refs/data.json#" };
	function B(t) {
		return { anyOf: [t, z] };
	}
})), require_id = /* @__PURE__ */ __commonJSMin(((t) => {
	Object.defineProperty(t, "__esModule", { value: !0 }), t.default = {
		keyword: "id",
		code() {
			throw Error("NOT SUPPORTED: keyword \"id\", use \"$id\" for schema ID");
		}
	};
})), require_ref = /* @__PURE__ */ __commonJSMin(((t) => {
	Object.defineProperty(t, "__esModule", { value: !0 }), t.callRef = t.getValidate = void 0;
	var a = require_ref_error(), o = require_code(), s = require_codegen(), c = require_names(), l = require_compile(), u = require_util$1(), d = {
		keyword: "$ref",
		schemaType: "string",
		code(t) {
			let { gen: o, schema: c, it: u } = t, { baseId: d, schemaEnv: m, validateName: h, opts: g, self: _ } = u, { root: v } = m;
			if ((c === "#" || c === "#/") && d === v.baseId) return b();
			let y = l.resolveRef.call(_, v, d, c);
			if (y === void 0) throw new a.default(u.opts.uriResolver, d, c);
			if (y instanceof l.SchemaEnv) return x(y);
			return S(y);
			function b() {
				if (m === v) return p(t, h, m, m.$async);
				let a = o.scopeValue("root", { ref: v });
				return p(t, (0, s._)`${a}.validate`, v, v.$async);
			}
			function x(a) {
				p(t, f(t, a), a, a.$async);
			}
			function S(a) {
				let l = o.scopeValue("schema", g.code.source === !0 ? {
					ref: a,
					code: (0, s.stringify)(a)
				} : { ref: a }), u = o.name("valid"), d = t.subschema({
					schema: a,
					dataTypes: [],
					schemaPath: s.nil,
					topSchemaRef: l,
					errSchemaPath: c
				}, u);
				t.mergeEvaluated(d), t.ok(u);
			}
		}
	};
	function f(t, a) {
		let { gen: o } = t;
		return a.validate ? o.scopeValue("validate", { ref: a.validate }) : (0, s._)`${o.scopeValue("wrapper", { ref: a })}.validate`;
	}
	t.getValidate = f;
	function p(t, a, l, d) {
		let { gen: f, it: p } = t, { allErrors: m, schemaEnv: h, opts: g } = p, _ = g.passContext ? c.default.this : s.nil;
		d ? v() : y();
		function v() {
			if (!h.$async) throw Error("async schema referenced by sync schema");
			let c = f.let("valid");
			f.try(() => {
				f.code((0, s._)`await ${(0, o.callValidateCode)(t, a, _)}`), x(a), m || f.assign(c, !0);
			}, (t) => {
				f.if((0, s._)`!(${t} instanceof ${p.ValidationError})`, () => f.throw(t)), b(t), m || f.assign(c, !1);
			}), t.ok(c);
		}
		function y() {
			t.result((0, o.callValidateCode)(t, a, _), () => x(a), () => b(a));
		}
		function b(t) {
			let a = (0, s._)`${t}.errors`;
			f.assign(c.default.vErrors, (0, s._)`${c.default.vErrors} === null ? ${a} : ${c.default.vErrors}.concat(${a})`), f.assign(c.default.errors, (0, s._)`${c.default.vErrors}.length`);
		}
		function x(t) {
			if (!p.opts.unevaluated) return;
			let a = l?.validate?.evaluated;
			if (p.props !== !0) if (a && !a.dynamicProps) a.props !== void 0 && (p.props = u.mergeEvaluated.props(f, a.props, p.props));
			else {
				let a = f.var("props", (0, s._)`${t}.evaluated.props`);
				p.props = u.mergeEvaluated.props(f, a, p.props, s.Name);
			}
			if (p.items !== !0) if (a && !a.dynamicItems) a.items !== void 0 && (p.items = u.mergeEvaluated.items(f, a.items, p.items));
			else {
				let a = f.var("items", (0, s._)`${t}.evaluated.items`);
				p.items = u.mergeEvaluated.items(f, a, p.items, s.Name);
			}
		}
	}
	t.callRef = p, t.default = d;
})), require_core = /* @__PURE__ */ __commonJSMin(((t) => {
	Object.defineProperty(t, "__esModule", { value: !0 });
	var a = require_id(), o = require_ref();
	t.default = [
		"$schema",
		"$id",
		"$defs",
		"$vocabulary",
		{ keyword: "$comment" },
		"definitions",
		a.default,
		o.default
	];
})), require_limitNumber = /* @__PURE__ */ __commonJSMin(((t) => {
	Object.defineProperty(t, "__esModule", { value: !0 });
	var a = require_codegen(), o = a.operators, s = {
		maximum: {
			okStr: "<=",
			ok: o.LTE,
			fail: o.GT
		},
		minimum: {
			okStr: ">=",
			ok: o.GTE,
			fail: o.LT
		},
		exclusiveMaximum: {
			okStr: "<",
			ok: o.LT,
			fail: o.GTE
		},
		exclusiveMinimum: {
			okStr: ">",
			ok: o.GT,
			fail: o.LTE
		}
	};
	t.default = {
		keyword: Object.keys(s),
		type: "number",
		schemaType: "number",
		$data: !0,
		error: {
			message: ({ keyword: t, schemaCode: o }) => (0, a.str)`must be ${s[t].okStr} ${o}`,
			params: ({ keyword: t, schemaCode: o }) => (0, a._)`{comparison: ${s[t].okStr}, limit: ${o}}`
		},
		code(t) {
			let { keyword: o, data: c, schemaCode: l } = t;
			t.fail$data((0, a._)`${c} ${s[o].fail} ${l} || isNaN(${c})`);
		}
	};
})), require_multipleOf = /* @__PURE__ */ __commonJSMin(((t) => {
	Object.defineProperty(t, "__esModule", { value: !0 });
	var a = require_codegen();
	t.default = {
		keyword: "multipleOf",
		type: "number",
		schemaType: "number",
		$data: !0,
		error: {
			message: ({ schemaCode: t }) => (0, a.str)`must be multiple of ${t}`,
			params: ({ schemaCode: t }) => (0, a._)`{multipleOf: ${t}}`
		},
		code(t) {
			let { gen: o, data: s, schemaCode: c, it: l } = t, u = l.opts.multipleOfPrecision, d = o.let("res"), f = u ? (0, a._)`Math.abs(Math.round(${d}) - ${d}) > 1e-${u}` : (0, a._)`${d} !== parseInt(${d})`;
			t.fail$data((0, a._)`(${c} === 0 || (${d} = ${s}/${c}, ${f}))`);
		}
	};
})), require_ucs2length = /* @__PURE__ */ __commonJSMin(((t) => {
	Object.defineProperty(t, "__esModule", { value: !0 });
	function a(t) {
		let a = t.length, o = 0, s = 0, c;
		for (; s < a;) o++, c = t.charCodeAt(s++), c >= 55296 && c <= 56319 && s < a && (c = t.charCodeAt(s), (c & 64512) == 56320 && s++);
		return o;
	}
	t.default = a, a.code = "require(\"ajv/dist/runtime/ucs2length\").default";
})), require_limitLength = /* @__PURE__ */ __commonJSMin(((t) => {
	Object.defineProperty(t, "__esModule", { value: !0 });
	var a = require_codegen(), o = require_util$1(), s = require_ucs2length();
	t.default = {
		keyword: ["maxLength", "minLength"],
		type: "string",
		schemaType: "number",
		$data: !0,
		error: {
			message({ keyword: t, schemaCode: o }) {
				let s = t === "maxLength" ? "more" : "fewer";
				return (0, a.str)`must NOT have ${s} than ${o} characters`;
			},
			params: ({ schemaCode: t }) => (0, a._)`{limit: ${t}}`
		},
		code(t) {
			let { keyword: c, data: l, schemaCode: u, it: d } = t, f = c === "maxLength" ? a.operators.GT : a.operators.LT, p = d.opts.unicode === !1 ? (0, a._)`${l}.length` : (0, a._)`${(0, o.useFunc)(t.gen, s.default)}(${l})`;
			t.fail$data((0, a._)`${p} ${f} ${u}`);
		}
	};
})), require_pattern = /* @__PURE__ */ __commonJSMin(((t) => {
	Object.defineProperty(t, "__esModule", { value: !0 });
	var a = require_code(), o = require_codegen();
	t.default = {
		keyword: "pattern",
		type: "string",
		schemaType: "string",
		$data: !0,
		error: {
			message: ({ schemaCode: t }) => (0, o.str)`must match pattern "${t}"`,
			params: ({ schemaCode: t }) => (0, o._)`{pattern: ${t}}`
		},
		code(t) {
			let { data: s, $data: c, schema: l, schemaCode: u, it: d } = t, f = d.opts.unicodeRegExp ? "u" : "", p = c ? (0, o._)`(new RegExp(${u}, ${f}))` : (0, a.usePattern)(t, l);
			t.fail$data((0, o._)`!${p}.test(${s})`);
		}
	};
})), require_limitProperties = /* @__PURE__ */ __commonJSMin(((t) => {
	Object.defineProperty(t, "__esModule", { value: !0 });
	var a = require_codegen();
	t.default = {
		keyword: ["maxProperties", "minProperties"],
		type: "object",
		schemaType: "number",
		$data: !0,
		error: {
			message({ keyword: t, schemaCode: o }) {
				let s = t === "maxProperties" ? "more" : "fewer";
				return (0, a.str)`must NOT have ${s} than ${o} properties`;
			},
			params: ({ schemaCode: t }) => (0, a._)`{limit: ${t}}`
		},
		code(t) {
			let { keyword: o, data: s, schemaCode: c } = t, l = o === "maxProperties" ? a.operators.GT : a.operators.LT;
			t.fail$data((0, a._)`Object.keys(${s}).length ${l} ${c}`);
		}
	};
})), require_required = /* @__PURE__ */ __commonJSMin(((t) => {
	Object.defineProperty(t, "__esModule", { value: !0 });
	var a = require_code(), o = require_codegen(), s = require_util$1();
	t.default = {
		keyword: "required",
		type: "object",
		schemaType: "array",
		$data: !0,
		error: {
			message: ({ params: { missingProperty: t } }) => (0, o.str)`must have required property '${t}'`,
			params: ({ params: { missingProperty: t } }) => (0, o._)`{missingProperty: ${t}}`
		},
		code(t) {
			let { gen: c, schema: l, schemaCode: u, data: d, $data: f, it: p } = t, { opts: m } = p;
			if (!f && l.length === 0) return;
			let h = l.length >= m.loopRequired;
			if (p.allErrors ? g() : _(), m.strictRequired) {
				let a = t.parentSchema.properties, { definedProperties: o } = t.it;
				for (let t of l) if (a?.[t] === void 0 && !o.has(t)) {
					let a = `required property "${t}" is not defined at "${p.schemaEnv.baseId + p.errSchemaPath}" (strictRequired)`;
					(0, s.checkStrictMode)(p, a, p.opts.strictRequired);
				}
			}
			function g() {
				if (h || f) t.block$data(o.nil, v);
				else for (let o of l) (0, a.checkReportMissingProp)(t, o);
			}
			function _() {
				let o = c.let("missing");
				if (h || f) {
					let a = c.let("valid", !0);
					t.block$data(a, () => y(o, a)), t.ok(a);
				} else c.if((0, a.checkMissingProp)(t, l, o)), (0, a.reportMissingProp)(t, o), c.else();
			}
			function v() {
				c.forOf("prop", u, (o) => {
					t.setParams({ missingProperty: o }), c.if((0, a.noPropertyInData)(c, d, o, m.ownProperties), () => t.error());
				});
			}
			function y(s, l) {
				t.setParams({ missingProperty: s }), c.forOf(s, u, () => {
					c.assign(l, (0, a.propertyInData)(c, d, s, m.ownProperties)), c.if((0, o.not)(l), () => {
						t.error(), c.break();
					});
				}, o.nil);
			}
		}
	};
})), require_limitItems = /* @__PURE__ */ __commonJSMin(((t) => {
	Object.defineProperty(t, "__esModule", { value: !0 });
	var a = require_codegen();
	t.default = {
		keyword: ["maxItems", "minItems"],
		type: "array",
		schemaType: "number",
		$data: !0,
		error: {
			message({ keyword: t, schemaCode: o }) {
				let s = t === "maxItems" ? "more" : "fewer";
				return (0, a.str)`must NOT have ${s} than ${o} items`;
			},
			params: ({ schemaCode: t }) => (0, a._)`{limit: ${t}}`
		},
		code(t) {
			let { keyword: o, data: s, schemaCode: c } = t, l = o === "maxItems" ? a.operators.GT : a.operators.LT;
			t.fail$data((0, a._)`${s}.length ${l} ${c}`);
		}
	};
})), require_equal = /* @__PURE__ */ __commonJSMin(((t) => {
	Object.defineProperty(t, "__esModule", { value: !0 });
	var a = require_fast_deep_equal();
	a.code = "require(\"ajv/dist/runtime/equal\").default", t.default = a;
})), require_uniqueItems = /* @__PURE__ */ __commonJSMin(((t) => {
	Object.defineProperty(t, "__esModule", { value: !0 });
	var a = require_dataType(), o = require_codegen(), s = require_util$1(), c = require_equal();
	t.default = {
		keyword: "uniqueItems",
		type: "array",
		schemaType: "boolean",
		$data: !0,
		error: {
			message: ({ params: { i: t, j: a } }) => (0, o.str)`must NOT have duplicate items (items ## ${a} and ${t} are identical)`,
			params: ({ params: { i: t, j: a } }) => (0, o._)`{i: ${t}, j: ${a}}`
		},
		code(t) {
			let { gen: l, data: u, $data: d, schema: f, parentSchema: p, schemaCode: m, it: h } = t;
			if (!d && !f) return;
			let g = l.let("valid"), _ = p.items ? (0, a.getSchemaTypes)(p.items) : [];
			t.block$data(g, v, (0, o._)`${m} === false`), t.ok(g);
			function v() {
				let a = l.let("i", (0, o._)`${u}.length`), s = l.let("j");
				t.setParams({
					i: a,
					j: s
				}), l.assign(g, !0), l.if((0, o._)`${a} > 1`, () => (y() ? b : x)(a, s));
			}
			function y() {
				return _.length > 0 && !_.some((t) => t === "object" || t === "array");
			}
			function b(s, c) {
				let d = l.name("item"), f = (0, a.checkDataTypes)(_, d, h.opts.strictNumbers, a.DataType.Wrong), p = l.const("indices", (0, o._)`{}`);
				l.for((0, o._)`;${s}--;`, () => {
					l.let(d, (0, o._)`${u}[${s}]`), l.if(f, (0, o._)`continue`), _.length > 1 && l.if((0, o._)`typeof ${d} == "string"`, (0, o._)`${d} += "_"`), l.if((0, o._)`typeof ${p}[${d}] == "number"`, () => {
						l.assign(c, (0, o._)`${p}[${d}]`), t.error(), l.assign(g, !1).break();
					}).code((0, o._)`${p}[${d}] = ${s}`);
				});
			}
			function x(a, d) {
				let f = (0, s.useFunc)(l, c.default), p = l.name("outer");
				l.label(p).for((0, o._)`;${a}--;`, () => l.for((0, o._)`${d} = ${a}; ${d}--;`, () => l.if((0, o._)`${f}(${u}[${a}], ${u}[${d}])`, () => {
					t.error(), l.assign(g, !1).break(p);
				})));
			}
		}
	};
})), require_const = /* @__PURE__ */ __commonJSMin(((t) => {
	Object.defineProperty(t, "__esModule", { value: !0 });
	var a = require_codegen(), o = require_util$1(), s = require_equal();
	t.default = {
		keyword: "const",
		$data: !0,
		error: {
			message: "must be equal to constant",
			params: ({ schemaCode: t }) => (0, a._)`{allowedValue: ${t}}`
		},
		code(t) {
			let { gen: c, data: l, $data: u, schemaCode: d, schema: f } = t;
			u || f && typeof f == "object" ? t.fail$data((0, a._)`!${(0, o.useFunc)(c, s.default)}(${l}, ${d})`) : t.fail((0, a._)`${f} !== ${l}`);
		}
	};
})), require_enum = /* @__PURE__ */ __commonJSMin(((t) => {
	Object.defineProperty(t, "__esModule", { value: !0 });
	var a = require_codegen(), o = require_util$1(), s = require_equal();
	t.default = {
		keyword: "enum",
		schemaType: "array",
		$data: !0,
		error: {
			message: "must be equal to one of the allowed values",
			params: ({ schemaCode: t }) => (0, a._)`{allowedValues: ${t}}`
		},
		code(t) {
			let { gen: c, data: l, $data: u, schema: d, schemaCode: f, it: p } = t;
			if (!u && d.length === 0) throw Error("enum must have non-empty array");
			let m = d.length >= p.opts.loopEnum, h, g = () => h ??= (0, o.useFunc)(c, s.default), _;
			if (m || u) _ = c.let("valid"), t.block$data(_, v);
			else {
				/* istanbul ignore if */
				if (!Array.isArray(d)) throw Error("ajv implementation error");
				let t = c.const("vSchema", f);
				_ = (0, a.or)(...d.map((a, o) => y(t, o)));
			}
			t.pass(_);
			function v() {
				c.assign(_, !1), c.forOf("v", f, (t) => c.if((0, a._)`${g()}(${l}, ${t})`, () => c.assign(_, !0).break()));
			}
			function y(t, o) {
				let s = d[o];
				return typeof s == "object" && s ? (0, a._)`${g()}(${l}, ${t}[${o}])` : (0, a._)`${l} === ${s}`;
			}
		}
	};
})), require_validation = /* @__PURE__ */ __commonJSMin(((t) => {
	Object.defineProperty(t, "__esModule", { value: !0 });
	var a = require_limitNumber(), o = require_multipleOf(), s = require_limitLength(), c = require_pattern(), l = require_limitProperties(), u = require_required(), d = require_limitItems(), f = require_uniqueItems(), p = require_const(), m = require_enum();
	t.default = [
		a.default,
		o.default,
		s.default,
		c.default,
		l.default,
		u.default,
		d.default,
		f.default,
		{
			keyword: "type",
			schemaType: ["string", "array"]
		},
		{
			keyword: "nullable",
			schemaType: "boolean"
		},
		p.default,
		m.default
	];
})), require_additionalItems = /* @__PURE__ */ __commonJSMin(((t) => {
	Object.defineProperty(t, "__esModule", { value: !0 }), t.validateAdditionalItems = void 0;
	var a = require_codegen(), o = require_util$1(), s = {
		keyword: "additionalItems",
		type: "array",
		schemaType: ["boolean", "object"],
		before: "uniqueItems",
		error: {
			message: ({ params: { len: t } }) => (0, a.str)`must NOT have more than ${t} items`,
			params: ({ params: { len: t } }) => (0, a._)`{limit: ${t}}`
		},
		code(t) {
			let { parentSchema: a, it: s } = t, { items: l } = a;
			if (!Array.isArray(l)) {
				(0, o.checkStrictMode)(s, "\"additionalItems\" is ignored when \"items\" is not an array of schemas");
				return;
			}
			c(t, l);
		}
	};
	function c(t, s) {
		let { gen: c, schema: l, data: u, keyword: d, it: f } = t;
		f.items = !0;
		let p = c.const("len", (0, a._)`${u}.length`);
		if (l === !1) t.setParams({ len: s.length }), t.pass((0, a._)`${p} <= ${s.length}`);
		else if (typeof l == "object" && !(0, o.alwaysValidSchema)(f, l)) {
			let o = c.var("valid", (0, a._)`${p} <= ${s.length}`);
			c.if((0, a.not)(o), () => m(o)), t.ok(o);
		}
		function m(l) {
			c.forRange("i", s.length, p, (s) => {
				t.subschema({
					keyword: d,
					dataProp: s,
					dataPropType: o.Type.Num
				}, l), f.allErrors || c.if((0, a.not)(l), () => c.break());
			});
		}
	}
	t.validateAdditionalItems = c, t.default = s;
})), require_items = /* @__PURE__ */ __commonJSMin(((t) => {
	Object.defineProperty(t, "__esModule", { value: !0 }), t.validateTuple = void 0;
	var a = require_codegen(), o = require_util$1(), s = require_code(), c = {
		keyword: "items",
		type: "array",
		schemaType: [
			"object",
			"array",
			"boolean"
		],
		before: "uniqueItems",
		code(t) {
			let { schema: a, it: c } = t;
			if (Array.isArray(a)) return l(t, "additionalItems", a);
			c.items = !0, !(0, o.alwaysValidSchema)(c, a) && t.ok((0, s.validateArray)(t));
		}
	};
	function l(t, s, c = t.schema) {
		let { gen: l, parentSchema: u, data: d, keyword: f, it: p } = t;
		g(u), p.opts.unevaluated && c.length && p.items !== !0 && (p.items = o.mergeEvaluated.items(l, c.length, p.items));
		let m = l.name("valid"), h = l.const("len", (0, a._)`${d}.length`);
		c.forEach((s, c) => {
			(0, o.alwaysValidSchema)(p, s) || (l.if((0, a._)`${h} > ${c}`, () => t.subschema({
				keyword: f,
				schemaProp: c,
				dataProp: c
			}, m)), t.ok(m));
		});
		function g(t) {
			let { opts: a, errSchemaPath: l } = p, u = c.length, d = u === t.minItems && (u === t.maxItems || t[s] === !1);
			if (a.strictTuples && !d) {
				let t = `"${f}" is ${u}-tuple, but minItems or maxItems/${s} are not specified or different at path "${l}"`;
				(0, o.checkStrictMode)(p, t, a.strictTuples);
			}
		}
	}
	t.validateTuple = l, t.default = c;
})), require_prefixItems = /* @__PURE__ */ __commonJSMin(((t) => {
	Object.defineProperty(t, "__esModule", { value: !0 });
	var a = require_items();
	t.default = {
		keyword: "prefixItems",
		type: "array",
		schemaType: ["array"],
		before: "uniqueItems",
		code: (t) => (0, a.validateTuple)(t, "items")
	};
})), require_items2020 = /* @__PURE__ */ __commonJSMin(((t) => {
	Object.defineProperty(t, "__esModule", { value: !0 });
	var a = require_codegen(), o = require_util$1(), s = require_code(), c = require_additionalItems();
	t.default = {
		keyword: "items",
		type: "array",
		schemaType: ["object", "boolean"],
		before: "uniqueItems",
		error: {
			message: ({ params: { len: t } }) => (0, a.str)`must NOT have more than ${t} items`,
			params: ({ params: { len: t } }) => (0, a._)`{limit: ${t}}`
		},
		code(t) {
			let { schema: a, parentSchema: l, it: u } = t, { prefixItems: d } = l;
			u.items = !0, !(0, o.alwaysValidSchema)(u, a) && (d ? (0, c.validateAdditionalItems)(t, d) : t.ok((0, s.validateArray)(t)));
		}
	};
})), require_contains = /* @__PURE__ */ __commonJSMin(((t) => {
	Object.defineProperty(t, "__esModule", { value: !0 });
	var a = require_codegen(), o = require_util$1();
	t.default = {
		keyword: "contains",
		type: "array",
		schemaType: ["object", "boolean"],
		before: "uniqueItems",
		trackErrors: !0,
		error: {
			message: ({ params: { min: t, max: o } }) => o === void 0 ? (0, a.str)`must contain at least ${t} valid item(s)` : (0, a.str)`must contain at least ${t} and no more than ${o} valid item(s)`,
			params: ({ params: { min: t, max: o } }) => o === void 0 ? (0, a._)`{minContains: ${t}}` : (0, a._)`{minContains: ${t}, maxContains: ${o}}`
		},
		code(t) {
			let { gen: s, schema: c, parentSchema: l, data: u, it: d } = t, f, p, { minContains: m, maxContains: h } = l;
			d.opts.next ? (f = m === void 0 ? 1 : m, p = h) : f = 1;
			let g = s.const("len", (0, a._)`${u}.length`);
			if (t.setParams({
				min: f,
				max: p
			}), p === void 0 && f === 0) {
				(0, o.checkStrictMode)(d, "\"minContains\" == 0 without \"maxContains\": \"contains\" keyword ignored");
				return;
			}
			if (p !== void 0 && f > p) {
				(0, o.checkStrictMode)(d, "\"minContains\" > \"maxContains\" is always invalid"), t.fail();
				return;
			}
			if ((0, o.alwaysValidSchema)(d, c)) {
				let o = (0, a._)`${g} >= ${f}`;
				p !== void 0 && (o = (0, a._)`${o} && ${g} <= ${p}`), t.pass(o);
				return;
			}
			d.items = !0;
			let _ = s.name("valid");
			p === void 0 && f === 1 ? y(_, () => s.if(_, () => s.break())) : f === 0 ? (s.let(_, !0), p !== void 0 && s.if((0, a._)`${u}.length > 0`, v)) : (s.let(_, !1), v()), t.result(_, () => t.reset());
			function v() {
				let t = s.name("_valid"), a = s.let("count", 0);
				y(t, () => s.if(t, () => b(a)));
			}
			function y(a, c) {
				s.forRange("i", 0, g, (s) => {
					t.subschema({
						keyword: "contains",
						dataProp: s,
						dataPropType: o.Type.Num,
						compositeRule: !0
					}, a), c();
				});
			}
			function b(t) {
				s.code((0, a._)`${t}++`), p === void 0 ? s.if((0, a._)`${t} >= ${f}`, () => s.assign(_, !0).break()) : (s.if((0, a._)`${t} > ${p}`, () => s.assign(_, !1).break()), f === 1 ? s.assign(_, !0) : s.if((0, a._)`${t} >= ${f}`, () => s.assign(_, !0)));
			}
		}
	};
})), require_dependencies = /* @__PURE__ */ __commonJSMin(((t) => {
	Object.defineProperty(t, "__esModule", { value: !0 }), t.validateSchemaDeps = t.validatePropertyDeps = t.error = void 0;
	var a = require_codegen(), o = require_util$1(), s = require_code();
	t.error = {
		message: ({ params: { property: t, depsCount: o, deps: s } }) => {
			let c = o === 1 ? "property" : "properties";
			return (0, a.str)`must have ${c} ${s} when property ${t} is present`;
		},
		params: ({ params: { property: t, depsCount: o, deps: s, missingProperty: c } }) => (0, a._)`{property: ${t},
    missingProperty: ${c},
    depsCount: ${o},
    deps: ${s}}`
	};
	var c = {
		keyword: "dependencies",
		type: "object",
		schemaType: "object",
		error: t.error,
		code(t) {
			let [a, o] = l(t);
			u(t, a), d(t, o);
		}
	};
	function l({ schema: t }) {
		let a = {}, o = {};
		for (let s in t) {
			if (s === "__proto__") continue;
			let c = Array.isArray(t[s]) ? a : o;
			c[s] = t[s];
		}
		return [a, o];
	}
	function u(t, o = t.schema) {
		let { gen: c, data: l, it: u } = t;
		if (Object.keys(o).length === 0) return;
		let d = c.let("missing");
		for (let f in o) {
			let p = o[f];
			if (p.length === 0) continue;
			let m = (0, s.propertyInData)(c, l, f, u.opts.ownProperties);
			t.setParams({
				property: f,
				depsCount: p.length,
				deps: p.join(", ")
			}), u.allErrors ? c.if(m, () => {
				for (let a of p) (0, s.checkReportMissingProp)(t, a);
			}) : (c.if((0, a._)`${m} && (${(0, s.checkMissingProp)(t, p, d)})`), (0, s.reportMissingProp)(t, d), c.else());
		}
	}
	t.validatePropertyDeps = u;
	function d(t, a = t.schema) {
		let { gen: c, data: l, keyword: u, it: d } = t, f = c.name("valid");
		for (let p in a) (0, o.alwaysValidSchema)(d, a[p]) || (c.if((0, s.propertyInData)(c, l, p, d.opts.ownProperties), () => {
			let a = t.subschema({
				keyword: u,
				schemaProp: p
			}, f);
			t.mergeValidEvaluated(a, f);
		}, () => c.var(f, !0)), t.ok(f));
	}
	t.validateSchemaDeps = d, t.default = c;
})), require_propertyNames = /* @__PURE__ */ __commonJSMin(((t) => {
	Object.defineProperty(t, "__esModule", { value: !0 });
	var a = require_codegen(), o = require_util$1();
	t.default = {
		keyword: "propertyNames",
		type: "object",
		schemaType: ["object", "boolean"],
		error: {
			message: "property name must be valid",
			params: ({ params: t }) => (0, a._)`{propertyName: ${t.propertyName}}`
		},
		code(t) {
			let { gen: s, schema: c, data: l, it: u } = t;
			if ((0, o.alwaysValidSchema)(u, c)) return;
			let d = s.name("valid");
			s.forIn("key", l, (o) => {
				t.setParams({ propertyName: o }), t.subschema({
					keyword: "propertyNames",
					data: o,
					dataTypes: ["string"],
					propertyName: o,
					compositeRule: !0
				}, d), s.if((0, a.not)(d), () => {
					t.error(!0), u.allErrors || s.break();
				});
			}), t.ok(d);
		}
	};
})), require_additionalProperties = /* @__PURE__ */ __commonJSMin(((t) => {
	Object.defineProperty(t, "__esModule", { value: !0 });
	var a = require_code(), o = require_codegen(), s = require_names(), c = require_util$1();
	t.default = {
		keyword: "additionalProperties",
		type: ["object"],
		schemaType: ["boolean", "object"],
		allowUndefined: !0,
		trackErrors: !0,
		error: {
			message: "must NOT have additional properties",
			params: ({ params: t }) => (0, o._)`{additionalProperty: ${t.additionalProperty}}`
		},
		code(t) {
			let { gen: l, schema: u, parentSchema: d, data: f, errsCount: p, it: m } = t;
			/* istanbul ignore if */
			if (!p) throw Error("ajv implementation error");
			let { allErrors: h, opts: g } = m;
			if (m.props = !0, g.removeAdditional !== "all" && (0, c.alwaysValidSchema)(m, u)) return;
			let _ = (0, a.allSchemaProperties)(d.properties), v = (0, a.allSchemaProperties)(d.patternProperties);
			y(), t.ok((0, o._)`${p} === ${s.default.errors}`);
			function y() {
				l.forIn("key", f, (t) => {
					!_.length && !v.length ? S(t) : l.if(b(t), () => S(t));
				});
			}
			function b(s) {
				let u;
				if (_.length > 8) {
					let t = (0, c.schemaRefOrVal)(m, d.properties, "properties");
					u = (0, a.isOwnProperty)(l, t, s);
				} else u = _.length ? (0, o.or)(..._.map((t) => (0, o._)`${s} === ${t}`)) : o.nil;
				return v.length && (u = (0, o.or)(u, ...v.map((c) => (0, o._)`${(0, a.usePattern)(t, c)}.test(${s})`))), (0, o.not)(u);
			}
			function x(t) {
				l.code((0, o._)`delete ${f}[${t}]`);
			}
			function S(a) {
				if (g.removeAdditional === "all" || g.removeAdditional && u === !1) {
					x(a);
					return;
				}
				if (u === !1) {
					t.setParams({ additionalProperty: a }), t.error(), h || l.break();
					return;
				}
				if (typeof u == "object" && !(0, c.alwaysValidSchema)(m, u)) {
					let s = l.name("valid");
					g.removeAdditional === "failing" ? (C(a, s, !1), l.if((0, o.not)(s), () => {
						t.reset(), x(a);
					})) : (C(a, s), h || l.if((0, o.not)(s), () => l.break()));
				}
			}
			function C(a, o, s) {
				let l = {
					keyword: "additionalProperties",
					dataProp: a,
					dataPropType: c.Type.Str
				};
				s === !1 && Object.assign(l, {
					compositeRule: !0,
					createErrors: !1,
					allErrors: !1
				}), t.subschema(l, o);
			}
		}
	};
})), require_properties = /* @__PURE__ */ __commonJSMin(((t) => {
	Object.defineProperty(t, "__esModule", { value: !0 });
	var a = require_validate(), o = require_code(), s = require_util$1(), c = require_additionalProperties();
	t.default = {
		keyword: "properties",
		type: "object",
		schemaType: "object",
		code(t) {
			let { gen: l, schema: u, parentSchema: d, data: f, it: p } = t;
			p.opts.removeAdditional === "all" && d.additionalProperties === void 0 && c.default.code(new a.KeywordCxt(p, c.default, "additionalProperties"));
			let m = (0, o.allSchemaProperties)(u);
			for (let t of m) p.definedProperties.add(t);
			p.opts.unevaluated && m.length && p.props !== !0 && (p.props = s.mergeEvaluated.props(l, (0, s.toHash)(m), p.props));
			let h = m.filter((t) => !(0, s.alwaysValidSchema)(p, u[t]));
			if (h.length === 0) return;
			let g = l.name("valid");
			for (let a of h) _(a) ? v(a) : (l.if((0, o.propertyInData)(l, f, a, p.opts.ownProperties)), v(a), p.allErrors || l.else().var(g, !0), l.endIf()), t.it.definedProperties.add(a), t.ok(g);
			function _(t) {
				return p.opts.useDefaults && !p.compositeRule && u[t].default !== void 0;
			}
			function v(a) {
				t.subschema({
					keyword: "properties",
					schemaProp: a,
					dataProp: a
				}, g);
			}
		}
	};
})), require_patternProperties = /* @__PURE__ */ __commonJSMin(((t) => {
	Object.defineProperty(t, "__esModule", { value: !0 });
	var a = require_code(), o = require_codegen(), s = require_util$1(), c = require_util$1();
	t.default = {
		keyword: "patternProperties",
		type: "object",
		schemaType: "object",
		code(t) {
			let { gen: l, schema: u, data: d, parentSchema: f, it: p } = t, { opts: m } = p, h = (0, a.allSchemaProperties)(u), g = h.filter((t) => (0, s.alwaysValidSchema)(p, u[t]));
			if (h.length === 0 || g.length === h.length && (!p.opts.unevaluated || p.props === !0)) return;
			let _ = m.strictSchema && !m.allowMatchingProperties && f.properties, v = l.name("valid");
			p.props !== !0 && !(p.props instanceof o.Name) && (p.props = (0, c.evaluatedPropsToName)(l, p.props));
			let { props: y } = p;
			b();
			function b() {
				for (let t of h) _ && x(t), p.allErrors ? S(t) : (l.var(v, !0), S(t), l.if(v));
			}
			function x(t) {
				for (let a in _) new RegExp(t).test(a) && (0, s.checkStrictMode)(p, `property ${a} matches pattern ${t} (use allowMatchingProperties)`);
			}
			function S(s) {
				l.forIn("key", d, (u) => {
					l.if((0, o._)`${(0, a.usePattern)(t, s)}.test(${u})`, () => {
						let a = g.includes(s);
						a || t.subschema({
							keyword: "patternProperties",
							schemaProp: s,
							dataProp: u,
							dataPropType: c.Type.Str
						}, v), p.opts.unevaluated && y !== !0 ? l.assign((0, o._)`${y}[${u}]`, !0) : !a && !p.allErrors && l.if((0, o.not)(v), () => l.break());
					});
				});
			}
		}
	};
})), require_not = /* @__PURE__ */ __commonJSMin(((t) => {
	Object.defineProperty(t, "__esModule", { value: !0 });
	var a = require_util$1();
	t.default = {
		keyword: "not",
		schemaType: ["object", "boolean"],
		trackErrors: !0,
		code(t) {
			let { gen: o, schema: s, it: c } = t;
			if ((0, a.alwaysValidSchema)(c, s)) {
				t.fail();
				return;
			}
			let l = o.name("valid");
			t.subschema({
				keyword: "not",
				compositeRule: !0,
				createErrors: !1,
				allErrors: !1
			}, l), t.failResult(l, () => t.reset(), () => t.error());
		},
		error: { message: "must NOT be valid" }
	};
})), require_anyOf = /* @__PURE__ */ __commonJSMin(((t) => {
	Object.defineProperty(t, "__esModule", { value: !0 }), t.default = {
		keyword: "anyOf",
		schemaType: "array",
		trackErrors: !0,
		code: require_code().validateUnion,
		error: { message: "must match a schema in anyOf" }
	};
})), require_oneOf = /* @__PURE__ */ __commonJSMin(((t) => {
	Object.defineProperty(t, "__esModule", { value: !0 });
	var a = require_codegen(), o = require_util$1();
	t.default = {
		keyword: "oneOf",
		schemaType: "array",
		trackErrors: !0,
		error: {
			message: "must match exactly one schema in oneOf",
			params: ({ params: t }) => (0, a._)`{passingSchemas: ${t.passing}}`
		},
		code(t) {
			let { gen: s, schema: c, parentSchema: l, it: u } = t;
			/* istanbul ignore if */
			if (!Array.isArray(c)) throw Error("ajv implementation error");
			if (u.opts.discriminator && l.discriminator) return;
			let d = c, f = s.let("valid", !1), p = s.let("passing", null), m = s.name("_valid");
			t.setParams({ passing: p }), s.block(h), t.result(f, () => t.reset(), () => t.error(!0));
			function h() {
				d.forEach((c, l) => {
					let d;
					(0, o.alwaysValidSchema)(u, c) ? s.var(m, !0) : d = t.subschema({
						keyword: "oneOf",
						schemaProp: l,
						compositeRule: !0
					}, m), l > 0 && s.if((0, a._)`${m} && ${f}`).assign(f, !1).assign(p, (0, a._)`[${p}, ${l}]`).else(), s.if(m, () => {
						s.assign(f, !0), s.assign(p, l), d && t.mergeEvaluated(d, a.Name);
					});
				});
			}
		}
	};
})), require_allOf = /* @__PURE__ */ __commonJSMin(((t) => {
	Object.defineProperty(t, "__esModule", { value: !0 });
	var a = require_util$1();
	t.default = {
		keyword: "allOf",
		schemaType: "array",
		code(t) {
			let { gen: o, schema: s, it: c } = t;
			/* istanbul ignore if */
			if (!Array.isArray(s)) throw Error("ajv implementation error");
			let l = o.name("valid");
			s.forEach((o, s) => {
				if ((0, a.alwaysValidSchema)(c, o)) return;
				let u = t.subschema({
					keyword: "allOf",
					schemaProp: s
				}, l);
				t.ok(l), t.mergeEvaluated(u);
			});
		}
	};
})), require_if = /* @__PURE__ */ __commonJSMin(((t) => {
	Object.defineProperty(t, "__esModule", { value: !0 });
	var a = require_codegen(), o = require_util$1(), s = {
		keyword: "if",
		schemaType: ["object", "boolean"],
		trackErrors: !0,
		error: {
			message: ({ params: t }) => (0, a.str)`must match "${t.ifClause}" schema`,
			params: ({ params: t }) => (0, a._)`{failingKeyword: ${t.ifClause}}`
		},
		code(t) {
			let { gen: s, parentSchema: l, it: u } = t;
			l.then === void 0 && l.else === void 0 && (0, o.checkStrictMode)(u, "\"if\" without \"then\" and \"else\" is ignored");
			let d = c(u, "then"), f = c(u, "else");
			if (!d && !f) return;
			let p = s.let("valid", !0), m = s.name("_valid");
			if (h(), t.reset(), d && f) {
				let a = s.let("ifClause");
				t.setParams({ ifClause: a }), s.if(m, g("then", a), g("else", a));
			} else d ? s.if(m, g("then")) : s.if((0, a.not)(m), g("else"));
			t.pass(p, () => t.error(!0));
			function h() {
				let a = t.subschema({
					keyword: "if",
					compositeRule: !0,
					createErrors: !1,
					allErrors: !1
				}, m);
				t.mergeEvaluated(a);
			}
			function g(o, c) {
				return () => {
					let l = t.subschema({ keyword: o }, m);
					s.assign(p, m), t.mergeValidEvaluated(l, p), c ? s.assign(c, (0, a._)`${o}`) : t.setParams({ ifClause: o });
				};
			}
		}
	};
	function c(t, a) {
		let s = t.schema[a];
		return s !== void 0 && !(0, o.alwaysValidSchema)(t, s);
	}
	t.default = s;
})), require_thenElse = /* @__PURE__ */ __commonJSMin(((t) => {
	Object.defineProperty(t, "__esModule", { value: !0 });
	var a = require_util$1();
	t.default = {
		keyword: ["then", "else"],
		schemaType: ["object", "boolean"],
		code({ keyword: t, parentSchema: o, it: s }) {
			o.if === void 0 && (0, a.checkStrictMode)(s, `"${t}" without "if" is ignored`);
		}
	};
})), require_applicator = /* @__PURE__ */ __commonJSMin(((t) => {
	Object.defineProperty(t, "__esModule", { value: !0 });
	var a = require_additionalItems(), o = require_prefixItems(), s = require_items(), c = require_items2020(), l = require_contains(), u = require_dependencies(), d = require_propertyNames(), f = require_additionalProperties(), p = require_properties(), m = require_patternProperties(), h = require_not(), g = require_anyOf(), _ = require_oneOf(), v = require_allOf(), y = require_if(), b = require_thenElse();
	function x(t = !1) {
		let x = [
			h.default,
			g.default,
			_.default,
			v.default,
			y.default,
			b.default,
			d.default,
			f.default,
			u.default,
			p.default,
			m.default
		];
		return t ? x.push(o.default, c.default) : x.push(a.default, s.default), x.push(l.default), x;
	}
	t.default = x;
})), require_format$1 = /* @__PURE__ */ __commonJSMin(((t) => {
	Object.defineProperty(t, "__esModule", { value: !0 });
	var a = require_codegen();
	t.default = {
		keyword: "format",
		type: ["number", "string"],
		schemaType: "string",
		$data: !0,
		error: {
			message: ({ schemaCode: t }) => (0, a.str)`must match format "${t}"`,
			params: ({ schemaCode: t }) => (0, a._)`{format: ${t}}`
		},
		code(t, o) {
			let { gen: s, data: c, $data: l, schema: u, schemaCode: d, it: f } = t, { opts: p, errSchemaPath: m, schemaEnv: h, self: g } = f;
			if (!p.validateFormats) return;
			l ? _() : v();
			function _() {
				let l = s.scopeValue("formats", {
					ref: g.formats,
					code: p.code.formats
				}), u = s.const("fDef", (0, a._)`${l}[${d}]`), f = s.let("fType"), m = s.let("format");
				s.if((0, a._)`typeof ${u} == "object" && !(${u} instanceof RegExp)`, () => s.assign(f, (0, a._)`${u}.type || "string"`).assign(m, (0, a._)`${u}.validate`), () => s.assign(f, (0, a._)`"string"`).assign(m, u)), t.fail$data((0, a.or)(_(), v()));
				function _() {
					return p.strictSchema === !1 ? a.nil : (0, a._)`${d} && !${m}`;
				}
				function v() {
					let t = h.$async ? (0, a._)`(${u}.async ? await ${m}(${c}) : ${m}(${c}))` : (0, a._)`${m}(${c})`, s = (0, a._)`(typeof ${m} == "function" ? ${t} : ${m}.test(${c}))`;
					return (0, a._)`${m} && ${m} !== true && ${f} === ${o} && !${s}`;
				}
			}
			function v() {
				let l = g.formats[u];
				if (!l) {
					v();
					return;
				}
				if (l === !0) return;
				let [d, f, _] = y(l);
				d === o && t.pass(b());
				function v() {
					if (p.strictSchema === !1) {
						g.logger.warn(t());
						return;
					}
					throw Error(t());
					function t() {
						return `unknown format "${u}" ignored in schema at path "${m}"`;
					}
				}
				function y(t) {
					let o = t instanceof RegExp ? (0, a.regexpCode)(t) : p.code.formats ? (0, a._)`${p.code.formats}${(0, a.getProperty)(u)}` : void 0, c = s.scopeValue("formats", {
						key: u,
						ref: t,
						code: o
					});
					return typeof t == "object" && !(t instanceof RegExp) ? [
						t.type || "string",
						t.validate,
						(0, a._)`${c}.validate`
					] : [
						"string",
						t,
						c
					];
				}
				function b() {
					if (typeof l == "object" && !(l instanceof RegExp) && l.async) {
						if (!h.$async) throw Error("async format in sync schema");
						return (0, a._)`await ${_}(${c})`;
					}
					return typeof f == "function" ? (0, a._)`${_}(${c})` : (0, a._)`${_}.test(${c})`;
				}
			}
		}
	};
})), require_format = /* @__PURE__ */ __commonJSMin(((t) => {
	Object.defineProperty(t, "__esModule", { value: !0 }), t.default = [require_format$1().default];
})), require_metadata = /* @__PURE__ */ __commonJSMin(((t) => {
	Object.defineProperty(t, "__esModule", { value: !0 }), t.contentVocabulary = t.metadataVocabulary = void 0, t.metadataVocabulary = [
		"title",
		"description",
		"default",
		"deprecated",
		"readOnly",
		"writeOnly",
		"examples"
	], t.contentVocabulary = [
		"contentMediaType",
		"contentEncoding",
		"contentSchema"
	];
})), require_draft7 = /* @__PURE__ */ __commonJSMin(((t) => {
	Object.defineProperty(t, "__esModule", { value: !0 });
	var a = require_core(), o = require_validation(), s = require_applicator(), c = require_format(), l = require_metadata();
	t.default = [
		a.default,
		o.default,
		(0, s.default)(),
		c.default,
		l.metadataVocabulary,
		l.contentVocabulary
	];
})), require_types = /* @__PURE__ */ __commonJSMin(((t) => {
	Object.defineProperty(t, "__esModule", { value: !0 }), t.DiscrError = void 0;
	var a;
	(function(t) {
		t.Tag = "tag", t.Mapping = "mapping";
	})(a || (t.DiscrError = a = {}));
})), require_discriminator = /* @__PURE__ */ __commonJSMin(((t) => {
	Object.defineProperty(t, "__esModule", { value: !0 });
	var a = require_codegen(), o = require_types(), s = require_compile(), c = require_ref_error(), l = require_util$1();
	t.default = {
		keyword: "discriminator",
		type: "object",
		schemaType: "object",
		error: {
			message: ({ params: { discrError: t, tagName: a } }) => t === o.DiscrError.Tag ? `tag "${a}" must be string` : `value of tag "${a}" must be in oneOf`,
			params: ({ params: { discrError: t, tag: o, tagName: s } }) => (0, a._)`{error: ${t}, tag: ${s}, tagValue: ${o}}`
		},
		code(t) {
			let { gen: u, data: d, schema: f, parentSchema: p, it: m } = t, { oneOf: h } = p;
			if (!m.opts.discriminator) throw Error("discriminator: requires discriminator option");
			let g = f.propertyName;
			if (typeof g != "string") throw Error("discriminator: requires propertyName");
			if (f.mapping) throw Error("discriminator: mapping is not supported");
			if (!h) throw Error("discriminator: requires oneOf keyword");
			let _ = u.let("valid", !1), v = u.const("tag", (0, a._)`${d}${(0, a.getProperty)(g)}`);
			u.if((0, a._)`typeof ${v} == "string"`, () => y(), () => t.error(!1, {
				discrError: o.DiscrError.Tag,
				tag: v,
				tagName: g
			})), t.ok(_);
			function y() {
				let s = x();
				for (let t in u.if(!1), s) u.elseIf((0, a._)`${v} === ${t}`), u.assign(_, b(s[t]));
				u.else(), t.error(!1, {
					discrError: o.DiscrError.Mapping,
					tag: v,
					tagName: g
				}), u.endIf();
			}
			function b(o) {
				let s = u.name("valid"), c = t.subschema({
					keyword: "oneOf",
					schemaProp: o
				}, s);
				return t.mergeEvaluated(c, a.Name), s;
			}
			function x() {
				let t = {}, a = u(p), o = !0;
				for (let t = 0; t < h.length; t++) {
					let f = h[t];
					if (f?.$ref && !(0, l.schemaHasRulesButRef)(f, m.self.RULES)) {
						let t = f.$ref;
						if (f = s.resolveRef.call(m.self, m.schemaEnv.root, m.baseId, t), f instanceof s.SchemaEnv && (f = f.schema), f === void 0) throw new c.default(m.opts.uriResolver, m.baseId, t);
					}
					let p = f?.properties?.[g];
					if (typeof p != "object") throw Error(`discriminator: oneOf subschemas (or referenced schemas) must have "properties/${g}"`);
					o &&= a || u(f), d(p, t);
				}
				if (!o) throw Error(`discriminator: "${g}" must be required`);
				return t;
				function u({ required: t }) {
					return Array.isArray(t) && t.includes(g);
				}
				function d(t, a) {
					if (t.const) f(t.const, a);
					else if (t.enum) for (let o of t.enum) f(o, a);
					else throw Error(`discriminator: "properties/${g}" must have "const" or "enum"`);
				}
				function f(a, o) {
					if (typeof a != "string" || a in t) throw Error(`discriminator: "${g}" values must be unique strings`);
					t[a] = o;
				}
			}
		}
	};
})), json_schema_draft_07_exports = /* @__PURE__ */ __export({
	$id: () => $id,
	$schema: () => $schema,
	default: () => json_schema_draft_07_default,
	definitions: () => definitions,
	properties: () => properties,
	title: () => title,
	type: () => type
}, 1), $schema, $id, title, definitions, type, properties, json_schema_draft_07_default, init_json_schema_draft_07 = __esmMin((() => {
	$schema = "http://json-schema.org/draft-07/schema#", $id = "http://json-schema.org/draft-07/schema#", title = "Core schema meta-schema", definitions = {
		schemaArray: {
			type: "array",
			minItems: 1,
			items: { $ref: "#" }
		},
		nonNegativeInteger: {
			type: "integer",
			minimum: 0
		},
		nonNegativeIntegerDefault0: { allOf: [{ $ref: "#/definitions/nonNegativeInteger" }, { default: 0 }] },
		simpleTypes: { enum: [
			"array",
			"boolean",
			"integer",
			"null",
			"number",
			"object",
			"string"
		] },
		stringArray: {
			type: "array",
			items: { type: "string" },
			uniqueItems: !0,
			default: []
		}
	}, type = ["object", "boolean"], properties = {
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
		$comment: { type: "string" },
		title: { type: "string" },
		description: { type: "string" },
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
		maximum: { type: "number" },
		exclusiveMaximum: { type: "number" },
		minimum: { type: "number" },
		exclusiveMinimum: { type: "number" },
		maxLength: { $ref: "#/definitions/nonNegativeInteger" },
		minLength: { $ref: "#/definitions/nonNegativeIntegerDefault0" },
		pattern: {
			type: "string",
			format: "regex"
		},
		additionalItems: { $ref: "#" },
		items: {
			anyOf: [{ $ref: "#" }, { $ref: "#/definitions/schemaArray" }],
			default: !0
		},
		maxItems: { $ref: "#/definitions/nonNegativeInteger" },
		minItems: { $ref: "#/definitions/nonNegativeIntegerDefault0" },
		uniqueItems: {
			type: "boolean",
			default: !1
		},
		contains: { $ref: "#" },
		maxProperties: { $ref: "#/definitions/nonNegativeInteger" },
		minProperties: { $ref: "#/definitions/nonNegativeIntegerDefault0" },
		required: { $ref: "#/definitions/stringArray" },
		additionalProperties: { $ref: "#" },
		definitions: {
			type: "object",
			additionalProperties: { $ref: "#" },
			default: {}
		},
		properties: {
			type: "object",
			additionalProperties: { $ref: "#" },
			default: {}
		},
		patternProperties: {
			type: "object",
			additionalProperties: { $ref: "#" },
			propertyNames: { format: "regex" },
			default: {}
		},
		dependencies: {
			type: "object",
			additionalProperties: { anyOf: [{ $ref: "#" }, { $ref: "#/definitions/stringArray" }] }
		},
		propertyNames: { $ref: "#" },
		const: !0,
		enum: {
			type: "array",
			items: !0,
			minItems: 1,
			uniqueItems: !0
		},
		type: { anyOf: [{ $ref: "#/definitions/simpleTypes" }, {
			type: "array",
			items: { $ref: "#/definitions/simpleTypes" },
			minItems: 1,
			uniqueItems: !0
		}] },
		format: { type: "string" },
		contentMediaType: { type: "string" },
		contentEncoding: { type: "string" },
		if: { $ref: "#" },
		then: { $ref: "#" },
		else: { $ref: "#" },
		allOf: { $ref: "#/definitions/schemaArray" },
		anyOf: { $ref: "#/definitions/schemaArray" },
		oneOf: { $ref: "#/definitions/schemaArray" },
		not: { $ref: "#" }
	}, json_schema_draft_07_default = {
		$schema,
		$id,
		title,
		definitions,
		type,
		properties,
		default: !0
	};
})), require_ajv = /* @__PURE__ */ __commonJSMin(((t, a) => {
	Object.defineProperty(t, "__esModule", { value: !0 }), t.MissingRefError = t.ValidationError = t.CodeGen = t.Name = t.nil = t.stringify = t.str = t._ = t.KeywordCxt = t.Ajv = void 0;
	var o = require_core$1(), s = require_draft7(), c = require_discriminator(), l = (init_json_schema_draft_07(), __toCommonJS(json_schema_draft_07_exports).default), u = ["/properties"], d = "http://json-schema.org/draft-07/schema", f = class extends o.default {
		_addVocabularies() {
			super._addVocabularies(), s.default.forEach((t) => this.addVocabulary(t)), this.opts.discriminator && this.addKeyword(c.default);
		}
		_addDefaultMetaSchema() {
			if (super._addDefaultMetaSchema(), !this.opts.meta) return;
			let t = this.opts.$data ? this.$dataMetaSchema(l, u) : l;
			this.addMetaSchema(t, d, !1), this.refs["http://json-schema.org/schema"] = d;
		}
		defaultMeta() {
			return this.opts.defaultMeta = super.defaultMeta() || (this.getSchema(d) ? d : void 0);
		}
	};
	t.Ajv = f, a.exports = t = f, a.exports.Ajv = f, Object.defineProperty(t, "__esModule", { value: !0 }), t.default = f;
	var p = require_validate();
	Object.defineProperty(t, "KeywordCxt", {
		enumerable: !0,
		get: function() {
			return p.KeywordCxt;
		}
	});
	var m = require_codegen();
	Object.defineProperty(t, "_", {
		enumerable: !0,
		get: function() {
			return m._;
		}
	}), Object.defineProperty(t, "str", {
		enumerable: !0,
		get: function() {
			return m.str;
		}
	}), Object.defineProperty(t, "stringify", {
		enumerable: !0,
		get: function() {
			return m.stringify;
		}
	}), Object.defineProperty(t, "nil", {
		enumerable: !0,
		get: function() {
			return m.nil;
		}
	}), Object.defineProperty(t, "Name", {
		enumerable: !0,
		get: function() {
			return m.Name;
		}
	}), Object.defineProperty(t, "CodeGen", {
		enumerable: !0,
		get: function() {
			return m.CodeGen;
		}
	});
	var h = require_validation_error();
	Object.defineProperty(t, "ValidationError", {
		enumerable: !0,
		get: function() {
			return h.default;
		}
	});
	var g = require_ref_error();
	Object.defineProperty(t, "MissingRefError", {
		enumerable: !0,
		get: function() {
			return g.default;
		}
	});
})), require_limit = /* @__PURE__ */ __commonJSMin(((t) => {
	Object.defineProperty(t, "__esModule", { value: !0 }), t.formatLimitDefinition = void 0;
	var a = require_ajv(), o = require_codegen(), s = o.operators, c = {
		formatMaximum: {
			okStr: "<=",
			ok: s.LTE,
			fail: s.GT
		},
		formatMinimum: {
			okStr: ">=",
			ok: s.GTE,
			fail: s.LT
		},
		formatExclusiveMaximum: {
			okStr: "<",
			ok: s.LT,
			fail: s.GTE
		},
		formatExclusiveMinimum: {
			okStr: ">",
			ok: s.GT,
			fail: s.LTE
		}
	};
	t.formatLimitDefinition = {
		keyword: Object.keys(c),
		type: "string",
		schemaType: "string",
		$data: !0,
		error: {
			message: ({ keyword: t, schemaCode: a }) => (0, o.str)`should be ${c[t].okStr} ${a}`,
			params: ({ keyword: t, schemaCode: a }) => (0, o._)`{comparison: ${c[t].okStr}, limit: ${a}}`
		},
		code(t) {
			let { gen: s, data: l, schemaCode: u, keyword: d, it: f } = t, { opts: p, self: m } = f;
			if (!p.validateFormats) return;
			let h = new a.KeywordCxt(f, m.RULES.all.format.definition, "format");
			h.$data ? g() : _();
			function g() {
				let a = s.scopeValue("formats", {
					ref: m.formats,
					code: p.code.formats
				}), c = s.const("fmt", (0, o._)`${a}[${h.schemaCode}]`);
				t.fail$data((0, o.or)((0, o._)`typeof ${c} != "object"`, (0, o._)`${c} instanceof RegExp`, (0, o._)`typeof ${c}.compare != "function"`, v(c)));
			}
			function _() {
				let a = h.schema, c = m.formats[a];
				if (!c || c === !0) return;
				if (typeof c != "object" || c instanceof RegExp || typeof c.compare != "function") throw Error(`"${d}": format "${a}" does not define "compare" function`);
				let l = s.scopeValue("formats", {
					key: a,
					ref: c,
					code: p.code.formats ? (0, o._)`${p.code.formats}${(0, o.getProperty)(a)}` : void 0
				});
				t.fail$data(v(l));
			}
			function v(t) {
				return (0, o._)`${t}.compare(${l}, ${u}) ${c[d].fail} 0`;
			}
		},
		dependencies: ["format"]
	}, t.default = (a) => (a.addKeyword(t.formatLimitDefinition), a);
})), import_dist = /* @__PURE__ */ __toESM((/* @__PURE__ */ __commonJSMin(((t, a) => {
	Object.defineProperty(t, "__esModule", { value: !0 });
	var o = require_formats(), s = require_limit(), c = require_codegen(), l = new c.Name("fullFormats"), u = new c.Name("fastFormats"), d = (t, a = { keywords: !0 }) => {
		if (Array.isArray(a)) return f(t, a, o.fullFormats, l), t;
		let [c, d] = a.mode === "fast" ? [o.fastFormats, u] : [o.fullFormats, l];
		return f(t, a.formats || o.formatNames, c, d), a.keywords && (0, s.default)(t), t;
	};
	d.get = (t, a = "full") => {
		let s = (a === "fast" ? o.fastFormats : o.fullFormats)[t];
		if (!s) throw Error(`Unknown format "${t}"`);
		return s;
	};
	function f(t, a, o, s) {
		var l;
		(l = t.opts.code).formats ?? (l.formats = (0, c._)`require("ajv-formats/dist/formats").${s}`);
		for (let s of a) t.addFormat(s, o[s]);
	}
	a.exports = t = d, Object.defineProperty(t, "__esModule", { value: !0 }), t.default = d;
})))(), 1), import__2020 = require__2020(), copyProperty = (t, a, o, s) => {
	if (o === "length" || o === "prototype" || o === "arguments" || o === "caller") return;
	let c = Object.getOwnPropertyDescriptor(t, o), l = Object.getOwnPropertyDescriptor(a, o);
	!canCopyProperty(c, l) && s || Object.defineProperty(t, o, l);
}, canCopyProperty = function(t, a) {
	return t === void 0 || t.configurable || t.writable === a.writable && t.enumerable === a.enumerable && t.configurable === a.configurable && (t.writable || t.value === a.value);
}, changePrototype = (t, a) => {
	let o = Object.getPrototypeOf(a);
	o !== Object.getPrototypeOf(t) && Object.setPrototypeOf(t, o);
}, wrappedToString = (t, a) => `/* Wrapped ${t}*/\n${a}`, toStringDescriptor = Object.getOwnPropertyDescriptor(Function.prototype, "toString"), toStringName = Object.getOwnPropertyDescriptor(Function.prototype.toString, "name"), changeToString = (t, a, o) => {
	let s = o === "" ? "" : `with ${o.trim()}() `, c = wrappedToString.bind(null, s, a.toString());
	Object.defineProperty(c, "name", toStringName);
	let { writable: l, enumerable: u, configurable: d } = toStringDescriptor;
	Object.defineProperty(t, "toString", {
		value: c,
		writable: l,
		enumerable: u,
		configurable: d
	});
};
function mimicFunction(t, a, { ignoreNonConfigurable: o = !1 } = {}) {
	let { name: s } = t;
	for (let s of Reflect.ownKeys(a)) copyProperty(t, a, s, o);
	return changePrototype(t, a), changeToString(t, a, s), t;
}
var debounce_fn_default = (t, a = {}) => {
	if (typeof t != "function") throw TypeError(`Expected the first argument to be a function, got \`${typeof t}\``);
	let { wait: o = 0, maxWait: s = Infinity, before: c = !1, after: l = !0 } = a;
	if (o < 0 || s < 0) throw RangeError("`wait` and `maxWait` must not be negative.");
	if (!c && !l) throw Error("Both `before` and `after` are false, function wouldn't be called.");
	let u, d, f, p = function(...a) {
		let p = this, m = () => {
			u = void 0, d &&= (clearTimeout(d), void 0), l && (f = t.apply(p, a));
		}, h = () => {
			d = void 0, u &&= (clearTimeout(u), void 0), l && (f = t.apply(p, a));
		}, g = c && !u;
		return clearTimeout(u), u = setTimeout(m, o), s > 0 && s !== Infinity && !d && (d = setTimeout(h, s)), g && (f = t.apply(p, a)), f;
	};
	return mimicFunction(p, t), p.cancel = () => {
		u &&= (clearTimeout(u), void 0), d &&= (clearTimeout(d), void 0);
	}, p;
}, require_constants$1 = /* @__PURE__ */ __commonJSMin(((t, a) => {
	var o = "2.0.0", s = 256;
	a.exports = {
		MAX_LENGTH: s,
		MAX_SAFE_COMPONENT_LENGTH: 16,
		MAX_SAFE_BUILD_LENGTH: s - 6,
		MAX_SAFE_INTEGER: 2 ** 53 - 1 || 9007199254740991,
		RELEASE_TYPES: [
			"major",
			"premajor",
			"minor",
			"preminor",
			"patch",
			"prepatch",
			"prerelease"
		],
		SEMVER_SPEC_VERSION: o,
		FLAG_INCLUDE_PRERELEASE: 1,
		FLAG_LOOSE: 2
	};
})), require_debug = /* @__PURE__ */ __commonJSMin(((t, a) => {
	a.exports = typeof process == "object" && process.env && process.env.NODE_DEBUG && /\bsemver\b/i.test(process.env.NODE_DEBUG) ? (...t) => console.error("SEMVER", ...t) : () => {};
})), require_re = /* @__PURE__ */ __commonJSMin(((t, a) => {
	var { MAX_SAFE_COMPONENT_LENGTH: o, MAX_SAFE_BUILD_LENGTH: s, MAX_LENGTH: c } = require_constants$1(), l = require_debug();
	t = a.exports = {};
	var u = t.re = [], d = t.safeRe = [], f = t.src = [], p = t.safeSrc = [], m = t.t = {}, h = 0, g = "[a-zA-Z0-9-]", _ = [
		["\\s", 1],
		["\\d", c],
		[g, s]
	], v = (t) => {
		for (let [a, o] of _) t = t.split(`${a}*`).join(`${a}{0,${o}}`).split(`${a}+`).join(`${a}{1,${o}}`);
		return t;
	}, y = (t, a, o) => {
		let s = v(a), c = h++;
		l(t, c, a), m[t] = c, f[c] = a, p[c] = s, u[c] = new RegExp(a, o ? "g" : void 0), d[c] = new RegExp(s, o ? "g" : void 0);
	};
	y("NUMERICIDENTIFIER", "0|[1-9]\\d*"), y("NUMERICIDENTIFIERLOOSE", "\\d+"), y("NONNUMERICIDENTIFIER", `\\d*[a-zA-Z-]${g}*`), y("MAINVERSION", `(${f[m.NUMERICIDENTIFIER]})\\.(${f[m.NUMERICIDENTIFIER]})\\.(${f[m.NUMERICIDENTIFIER]})`), y("MAINVERSIONLOOSE", `(${f[m.NUMERICIDENTIFIERLOOSE]})\\.(${f[m.NUMERICIDENTIFIERLOOSE]})\\.(${f[m.NUMERICIDENTIFIERLOOSE]})`), y("PRERELEASEIDENTIFIER", `(?:${f[m.NONNUMERICIDENTIFIER]}|${f[m.NUMERICIDENTIFIER]})`), y("PRERELEASEIDENTIFIERLOOSE", `(?:${f[m.NONNUMERICIDENTIFIER]}|${f[m.NUMERICIDENTIFIERLOOSE]})`), y("PRERELEASE", `(?:-(${f[m.PRERELEASEIDENTIFIER]}(?:\\.${f[m.PRERELEASEIDENTIFIER]})*))`), y("PRERELEASELOOSE", `(?:-?(${f[m.PRERELEASEIDENTIFIERLOOSE]}(?:\\.${f[m.PRERELEASEIDENTIFIERLOOSE]})*))`), y("BUILDIDENTIFIER", `${g}+`), y("BUILD", `(?:\\+(${f[m.BUILDIDENTIFIER]}(?:\\.${f[m.BUILDIDENTIFIER]})*))`), y("FULLPLAIN", `v?${f[m.MAINVERSION]}${f[m.PRERELEASE]}?${f[m.BUILD]}?`), y("FULL", `^${f[m.FULLPLAIN]}$`), y("LOOSEPLAIN", `[v=\\s]*${f[m.MAINVERSIONLOOSE]}${f[m.PRERELEASELOOSE]}?${f[m.BUILD]}?`), y("LOOSE", `^${f[m.LOOSEPLAIN]}$`), y("GTLT", "((?:<|>)?=?)"), y("XRANGEIDENTIFIERLOOSE", `${f[m.NUMERICIDENTIFIERLOOSE]}|x|X|\\*`), y("XRANGEIDENTIFIER", `${f[m.NUMERICIDENTIFIER]}|x|X|\\*`), y("XRANGEPLAIN", `[v=\\s]*(${f[m.XRANGEIDENTIFIER]})(?:\\.(${f[m.XRANGEIDENTIFIER]})(?:\\.(${f[m.XRANGEIDENTIFIER]})(?:${f[m.PRERELEASE]})?${f[m.BUILD]}?)?)?`), y("XRANGEPLAINLOOSE", `[v=\\s]*(${f[m.XRANGEIDENTIFIERLOOSE]})(?:\\.(${f[m.XRANGEIDENTIFIERLOOSE]})(?:\\.(${f[m.XRANGEIDENTIFIERLOOSE]})(?:${f[m.PRERELEASELOOSE]})?${f[m.BUILD]}?)?)?`), y("XRANGE", `^${f[m.GTLT]}\\s*${f[m.XRANGEPLAIN]}$`), y("XRANGELOOSE", `^${f[m.GTLT]}\\s*${f[m.XRANGEPLAINLOOSE]}$`), y("COERCEPLAIN", `(^|[^\\d])(\\d{1,${o}})(?:\\.(\\d{1,${o}}))?(?:\\.(\\d{1,${o}}))?`), y("COERCE", `${f[m.COERCEPLAIN]}(?:$|[^\\d])`), y("COERCEFULL", f[m.COERCEPLAIN] + `(?:${f[m.PRERELEASE]})?(?:${f[m.BUILD]})?(?:$|[^\\d])`), y("COERCERTL", f[m.COERCE], !0), y("COERCERTLFULL", f[m.COERCEFULL], !0), y("LONETILDE", "(?:~>?)"), y("TILDETRIM", `(\\s*)${f[m.LONETILDE]}\\s+`, !0), t.tildeTrimReplace = "$1~", y("TILDE", `^${f[m.LONETILDE]}${f[m.XRANGEPLAIN]}$`), y("TILDELOOSE", `^${f[m.LONETILDE]}${f[m.XRANGEPLAINLOOSE]}$`), y("LONECARET", "(?:\\^)"), y("CARETTRIM", `(\\s*)${f[m.LONECARET]}\\s+`, !0), t.caretTrimReplace = "$1^", y("CARET", `^${f[m.LONECARET]}${f[m.XRANGEPLAIN]}$`), y("CARETLOOSE", `^${f[m.LONECARET]}${f[m.XRANGEPLAINLOOSE]}$`), y("COMPARATORLOOSE", `^${f[m.GTLT]}\\s*(${f[m.LOOSEPLAIN]})$|^$`), y("COMPARATOR", `^${f[m.GTLT]}\\s*(${f[m.FULLPLAIN]})$|^$`), y("COMPARATORTRIM", `(\\s*)${f[m.GTLT]}\\s*(${f[m.LOOSEPLAIN]}|${f[m.XRANGEPLAIN]})`, !0), t.comparatorTrimReplace = "$1$2$3", y("HYPHENRANGE", `^\\s*(${f[m.XRANGEPLAIN]})\\s+-\\s+(${f[m.XRANGEPLAIN]})\\s*$`), y("HYPHENRANGELOOSE", `^\\s*(${f[m.XRANGEPLAINLOOSE]})\\s+-\\s+(${f[m.XRANGEPLAINLOOSE]})\\s*$`), y("STAR", "(<|>)?=?\\s*\\*"), y("GTE0", "^\\s*>=\\s*0\\.0\\.0\\s*$"), y("GTE0PRE", "^\\s*>=\\s*0\\.0\\.0-0\\s*$");
})), require_parse_options = /* @__PURE__ */ __commonJSMin(((t, a) => {
	var o = Object.freeze({ loose: !0 }), s = Object.freeze({});
	a.exports = (t) => t ? typeof t == "object" ? t : o : s;
})), require_identifiers = /* @__PURE__ */ __commonJSMin(((t, a) => {
	var o = /^[0-9]+$/, s = (t, a) => {
		if (typeof t == "number" && typeof a == "number") return t === a ? 0 : t < a ? -1 : 1;
		let s = o.test(t), c = o.test(a);
		return s && c && (t = +t, a = +a), t === a ? 0 : s && !c ? -1 : c && !s ? 1 : t < a ? -1 : 1;
	};
	a.exports = {
		compareIdentifiers: s,
		rcompareIdentifiers: (t, a) => s(a, t)
	};
})), require_semver$1 = /* @__PURE__ */ __commonJSMin(((t, a) => {
	var o = require_debug(), { MAX_LENGTH: s, MAX_SAFE_INTEGER: c } = require_constants$1(), { safeRe: l, t: u } = require_re(), d = require_parse_options(), { compareIdentifiers: f } = require_identifiers();
	a.exports = class t {
		constructor(a, f) {
			if (f = d(f), a instanceof t) {
				if (a.loose === !!f.loose && a.includePrerelease === !!f.includePrerelease) return a;
				a = a.version;
			} else if (typeof a != "string") throw TypeError(`Invalid version. Must be a string. Got type "${typeof a}".`);
			if (a.length > s) throw TypeError(`version is longer than ${s} characters`);
			o("SemVer", a, f), this.options = f, this.loose = !!f.loose, this.includePrerelease = !!f.includePrerelease;
			let p = a.trim().match(f.loose ? l[u.LOOSE] : l[u.FULL]);
			if (!p) throw TypeError(`Invalid Version: ${a}`);
			if (this.raw = a, this.major = +p[1], this.minor = +p[2], this.patch = +p[3], this.major > c || this.major < 0) throw TypeError("Invalid major version");
			if (this.minor > c || this.minor < 0) throw TypeError("Invalid minor version");
			if (this.patch > c || this.patch < 0) throw TypeError("Invalid patch version");
			p[4] ? this.prerelease = p[4].split(".").map((t) => {
				if (/^[0-9]+$/.test(t)) {
					let a = +t;
					if (a >= 0 && a < c) return a;
				}
				return t;
			}) : this.prerelease = [], this.build = p[5] ? p[5].split(".") : [], this.format();
		}
		format() {
			return this.version = `${this.major}.${this.minor}.${this.patch}`, this.prerelease.length && (this.version += `-${this.prerelease.join(".")}`), this.version;
		}
		toString() {
			return this.version;
		}
		compare(a) {
			if (o("SemVer.compare", this.version, this.options, a), !(a instanceof t)) {
				if (typeof a == "string" && a === this.version) return 0;
				a = new t(a, this.options);
			}
			return a.version === this.version ? 0 : this.compareMain(a) || this.comparePre(a);
		}
		compareMain(a) {
			return a instanceof t || (a = new t(a, this.options)), this.major < a.major ? -1 : this.major > a.major ? 1 : this.minor < a.minor ? -1 : this.minor > a.minor ? 1 : this.patch < a.patch ? -1 : this.patch > a.patch ? 1 : 0;
		}
		comparePre(a) {
			if (a instanceof t || (a = new t(a, this.options)), this.prerelease.length && !a.prerelease.length) return -1;
			if (!this.prerelease.length && a.prerelease.length) return 1;
			if (!this.prerelease.length && !a.prerelease.length) return 0;
			let s = 0;
			do {
				let t = this.prerelease[s], c = a.prerelease[s];
				if (o("prerelease compare", s, t, c), t === void 0 && c === void 0) return 0;
				if (c === void 0) return 1;
				if (t === void 0) return -1;
				if (t === c) continue;
				return f(t, c);
			} while (++s);
		}
		compareBuild(a) {
			a instanceof t || (a = new t(a, this.options));
			let s = 0;
			do {
				let t = this.build[s], c = a.build[s];
				if (o("build compare", s, t, c), t === void 0 && c === void 0) return 0;
				if (c === void 0) return 1;
				if (t === void 0) return -1;
				if (t === c) continue;
				return f(t, c);
			} while (++s);
		}
		inc(t, a, o) {
			if (t.startsWith("pre")) {
				if (!a && o === !1) throw Error("invalid increment argument: identifier is empty");
				if (a) {
					let t = `-${a}`.match(this.options.loose ? l[u.PRERELEASELOOSE] : l[u.PRERELEASE]);
					if (!t || t[1] !== a) throw Error(`invalid identifier: ${a}`);
				}
			}
			switch (t) {
				case "premajor":
					this.prerelease.length = 0, this.patch = 0, this.minor = 0, this.major++, this.inc("pre", a, o);
					break;
				case "preminor":
					this.prerelease.length = 0, this.patch = 0, this.minor++, this.inc("pre", a, o);
					break;
				case "prepatch":
					this.prerelease.length = 0, this.inc("patch", a, o), this.inc("pre", a, o);
					break;
				case "prerelease":
					this.prerelease.length === 0 && this.inc("patch", a, o), this.inc("pre", a, o);
					break;
				case "release":
					if (this.prerelease.length === 0) throw Error(`version ${this.raw} is not a prerelease`);
					this.prerelease.length = 0;
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
					let t = Number(o) ? 1 : 0;
					if (this.prerelease.length === 0) this.prerelease = [t];
					else {
						let s = this.prerelease.length;
						for (; --s >= 0;) typeof this.prerelease[s] == "number" && (this.prerelease[s]++, s = -2);
						if (s === -1) {
							if (a === this.prerelease.join(".") && o === !1) throw Error("invalid increment argument: identifier already exists");
							this.prerelease.push(t);
						}
					}
					if (a) {
						let s = [a, t];
						o === !1 && (s = [a]), f(this.prerelease[0], a) === 0 ? isNaN(this.prerelease[1]) && (this.prerelease = s) : this.prerelease = s;
					}
					break;
				}
				default: throw Error(`invalid increment argument: ${t}`);
			}
			return this.raw = this.format(), this.build.length && (this.raw += `+${this.build.join(".")}`), this;
		}
	};
})), require_parse = /* @__PURE__ */ __commonJSMin(((t, a) => {
	var o = require_semver$1();
	a.exports = (t, a, s = !1) => {
		if (t instanceof o) return t;
		try {
			return new o(t, a);
		} catch (t) {
			if (!s) return null;
			throw t;
		}
	};
})), require_valid$1 = /* @__PURE__ */ __commonJSMin(((t, a) => {
	var o = require_parse();
	a.exports = (t, a) => {
		let s = o(t, a);
		return s ? s.version : null;
	};
})), require_clean = /* @__PURE__ */ __commonJSMin(((t, a) => {
	var o = require_parse();
	a.exports = (t, a) => {
		let s = o(t.trim().replace(/^[=v]+/, ""), a);
		return s ? s.version : null;
	};
})), require_inc = /* @__PURE__ */ __commonJSMin(((t, a) => {
	var o = require_semver$1();
	a.exports = (t, a, s, c, l) => {
		typeof s == "string" && (l = c, c = s, s = void 0);
		try {
			return new o(t instanceof o ? t.version : t, s).inc(a, c, l).version;
		} catch {
			return null;
		}
	};
})), require_diff = /* @__PURE__ */ __commonJSMin(((t, a) => {
	var o = require_parse();
	a.exports = (t, a) => {
		let s = o(t, null, !0), c = o(a, null, !0), l = s.compare(c);
		if (l === 0) return null;
		let u = l > 0, d = u ? s : c, f = u ? c : s, p = !!d.prerelease.length;
		if (f.prerelease.length && !p) {
			if (!f.patch && !f.minor) return "major";
			if (f.compareMain(d) === 0) return f.minor && !f.patch ? "minor" : "patch";
		}
		let m = p ? "pre" : "";
		return s.major === c.major ? s.minor === c.minor ? s.patch === c.patch ? "prerelease" : m + "patch" : m + "minor" : m + "major";
	};
})), require_major = /* @__PURE__ */ __commonJSMin(((t, a) => {
	var o = require_semver$1();
	a.exports = (t, a) => new o(t, a).major;
})), require_minor = /* @__PURE__ */ __commonJSMin(((t, a) => {
	var o = require_semver$1();
	a.exports = (t, a) => new o(t, a).minor;
})), require_patch = /* @__PURE__ */ __commonJSMin(((t, a) => {
	var o = require_semver$1();
	a.exports = (t, a) => new o(t, a).patch;
})), require_prerelease = /* @__PURE__ */ __commonJSMin(((t, a) => {
	var o = require_parse();
	a.exports = (t, a) => {
		let s = o(t, a);
		return s && s.prerelease.length ? s.prerelease : null;
	};
})), require_compare = /* @__PURE__ */ __commonJSMin(((t, a) => {
	var o = require_semver$1();
	a.exports = (t, a, s) => new o(t, s).compare(new o(a, s));
})), require_rcompare = /* @__PURE__ */ __commonJSMin(((t, a) => {
	var o = require_compare();
	a.exports = (t, a, s) => o(a, t, s);
})), require_compare_loose = /* @__PURE__ */ __commonJSMin(((t, a) => {
	var o = require_compare();
	a.exports = (t, a) => o(t, a, !0);
})), require_compare_build = /* @__PURE__ */ __commonJSMin(((t, a) => {
	var o = require_semver$1();
	a.exports = (t, a, s) => {
		let c = new o(t, s), l = new o(a, s);
		return c.compare(l) || c.compareBuild(l);
	};
})), require_sort = /* @__PURE__ */ __commonJSMin(((t, a) => {
	var o = require_compare_build();
	a.exports = (t, a) => t.sort((t, s) => o(t, s, a));
})), require_rsort = /* @__PURE__ */ __commonJSMin(((t, a) => {
	var o = require_compare_build();
	a.exports = (t, a) => t.sort((t, s) => o(s, t, a));
})), require_gt = /* @__PURE__ */ __commonJSMin(((t, a) => {
	var o = require_compare();
	a.exports = (t, a, s) => o(t, a, s) > 0;
})), require_lt = /* @__PURE__ */ __commonJSMin(((t, a) => {
	var o = require_compare();
	a.exports = (t, a, s) => o(t, a, s) < 0;
})), require_eq = /* @__PURE__ */ __commonJSMin(((t, a) => {
	var o = require_compare();
	a.exports = (t, a, s) => o(t, a, s) === 0;
})), require_neq = /* @__PURE__ */ __commonJSMin(((t, a) => {
	var o = require_compare();
	a.exports = (t, a, s) => o(t, a, s) !== 0;
})), require_gte = /* @__PURE__ */ __commonJSMin(((t, a) => {
	var o = require_compare();
	a.exports = (t, a, s) => o(t, a, s) >= 0;
})), require_lte = /* @__PURE__ */ __commonJSMin(((t, a) => {
	var o = require_compare();
	a.exports = (t, a, s) => o(t, a, s) <= 0;
})), require_cmp = /* @__PURE__ */ __commonJSMin(((t, a) => {
	var o = require_eq(), s = require_neq(), c = require_gt(), l = require_gte(), u = require_lt(), d = require_lte();
	a.exports = (t, a, f, p) => {
		switch (a) {
			case "===": return typeof t == "object" && (t = t.version), typeof f == "object" && (f = f.version), t === f;
			case "!==": return typeof t == "object" && (t = t.version), typeof f == "object" && (f = f.version), t !== f;
			case "":
			case "=":
			case "==": return o(t, f, p);
			case "!=": return s(t, f, p);
			case ">": return c(t, f, p);
			case ">=": return l(t, f, p);
			case "<": return u(t, f, p);
			case "<=": return d(t, f, p);
			default: throw TypeError(`Invalid operator: ${a}`);
		}
	};
})), require_coerce = /* @__PURE__ */ __commonJSMin(((t, a) => {
	var o = require_semver$1(), s = require_parse(), { safeRe: c, t: l } = require_re();
	a.exports = (t, a) => {
		if (t instanceof o) return t;
		if (typeof t == "number" && (t = String(t)), typeof t != "string") return null;
		a ||= {};
		let u = null;
		if (!a.rtl) u = t.match(a.includePrerelease ? c[l.COERCEFULL] : c[l.COERCE]);
		else {
			let o = a.includePrerelease ? c[l.COERCERTLFULL] : c[l.COERCERTL], s;
			for (; (s = o.exec(t)) && (!u || u.index + u[0].length !== t.length);) (!u || s.index + s[0].length !== u.index + u[0].length) && (u = s), o.lastIndex = s.index + s[1].length + s[2].length;
			o.lastIndex = -1;
		}
		if (u === null) return null;
		let d = u[2];
		return s(`${d}.${u[3] || "0"}.${u[4] || "0"}${a.includePrerelease && u[5] ? `-${u[5]}` : ""}${a.includePrerelease && u[6] ? `+${u[6]}` : ""}`, a);
	};
})), require_lrucache = /* @__PURE__ */ __commonJSMin(((t, a) => {
	a.exports = class {
		constructor() {
			this.max = 1e3, this.map = /* @__PURE__ */ new Map();
		}
		get(t) {
			let a = this.map.get(t);
			if (a !== void 0) return this.map.delete(t), this.map.set(t, a), a;
		}
		delete(t) {
			return this.map.delete(t);
		}
		set(t, a) {
			if (!this.delete(t) && a !== void 0) {
				if (this.map.size >= this.max) {
					let t = this.map.keys().next().value;
					this.delete(t);
				}
				this.map.set(t, a);
			}
			return this;
		}
	};
})), require_range = /* @__PURE__ */ __commonJSMin(((t, a) => {
	var o = /\s+/g;
	a.exports = class t {
		constructor(a, s) {
			if (s = c(s), a instanceof t) return a.loose === !!s.loose && a.includePrerelease === !!s.includePrerelease ? a : new t(a.raw, s);
			if (a instanceof l) return this.raw = a.value, this.set = [[a]], this.formatted = void 0, this;
			if (this.options = s, this.loose = !!s.loose, this.includePrerelease = !!s.includePrerelease, this.raw = a.trim().replace(o, " "), this.set = this.raw.split("||").map((t) => this.parseRange(t.trim())).filter((t) => t.length), !this.set.length) throw TypeError(`Invalid SemVer Range: ${this.raw}`);
			if (this.set.length > 1) {
				let t = this.set[0];
				if (this.set = this.set.filter((t) => !y(t[0])), this.set.length === 0) this.set = [t];
				else if (this.set.length > 1) {
					for (let t of this.set) if (t.length === 1 && b(t[0])) {
						this.set = [t];
						break;
					}
				}
			}
			this.formatted = void 0;
		}
		get range() {
			if (this.formatted === void 0) {
				this.formatted = "";
				for (let t = 0; t < this.set.length; t++) {
					t > 0 && (this.formatted += "||");
					let a = this.set[t];
					for (let t = 0; t < a.length; t++) t > 0 && (this.formatted += " "), this.formatted += a[t].toString().trim();
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
		parseRange(t) {
			let a = ((this.options.includePrerelease && _) | (this.options.loose && v)) + ":" + t, o = s.get(a);
			if (o) return o;
			let c = this.options.loose, d = c ? f[p.HYPHENRANGELOOSE] : f[p.HYPHENRANGE];
			t = t.replace(d, M(this.options.includePrerelease)), u("hyphen replace", t), t = t.replace(f[p.COMPARATORTRIM], m), u("comparator trim", t), t = t.replace(f[p.TILDETRIM], h), u("tilde trim", t), t = t.replace(f[p.CARETTRIM], g), u("caret trim", t);
			let b = t.split(" ").map((t) => S(t, this.options)).join(" ").split(/\s+/).map((t) => j(t, this.options));
			c && (b = b.filter((t) => (u("loose invalid filter", t, this.options), !!t.match(f[p.COMPARATORLOOSE])))), u("range list", b);
			let x = /* @__PURE__ */ new Map(), C = b.map((t) => new l(t, this.options));
			for (let t of C) {
				if (y(t)) return [t];
				x.set(t.value, t);
			}
			x.size > 1 && x.has("") && x.delete("");
			let w = [...x.values()];
			return s.set(a, w), w;
		}
		intersects(a, o) {
			if (!(a instanceof t)) throw TypeError("a Range is required");
			return this.set.some((t) => x(t, o) && a.set.some((a) => x(a, o) && t.every((t) => a.every((a) => t.intersects(a, o)))));
		}
		test(t) {
			if (!t) return !1;
			if (typeof t == "string") try {
				t = new d(t, this.options);
			} catch {
				return !1;
			}
			for (let a = 0; a < this.set.length; a++) if (N(this.set[a], t, this.options)) return !0;
			return !1;
		}
	};
	var s = new (require_lrucache())(), c = require_parse_options(), l = require_comparator(), u = require_debug(), d = require_semver$1(), { safeRe: f, t: p, comparatorTrimReplace: m, tildeTrimReplace: h, caretTrimReplace: g } = require_re(), { FLAG_INCLUDE_PRERELEASE: _, FLAG_LOOSE: v } = require_constants$1(), y = (t) => t.value === "<0.0.0-0", b = (t) => t.value === "", x = (t, a) => {
		let o = !0, s = t.slice(), c = s.pop();
		for (; o && s.length;) o = s.every((t) => c.intersects(t, a)), c = s.pop();
		return o;
	}, S = (t, a) => (t = t.replace(f[p.BUILD], ""), u("comp", t, a), t = E(t, a), u("caret", t), t = w(t, a), u("tildes", t), t = O(t, a), u("xrange", t), t = A(t, a), u("stars", t), t), C = (t) => !t || t.toLowerCase() === "x" || t === "*", w = (t, a) => t.trim().split(/\s+/).map((t) => T(t, a)).join(" "), T = (t, a) => {
		let o = a.loose ? f[p.TILDELOOSE] : f[p.TILDE];
		return t.replace(o, (a, o, s, c, l) => {
			u("tilde", t, a, o, s, c, l);
			let d;
			return C(o) ? d = "" : C(s) ? d = `>=${o}.0.0 <${+o + 1}.0.0-0` : C(c) ? d = `>=${o}.${s}.0 <${o}.${+s + 1}.0-0` : l ? (u("replaceTilde pr", l), d = `>=${o}.${s}.${c}-${l} <${o}.${+s + 1}.0-0`) : d = `>=${o}.${s}.${c} <${o}.${+s + 1}.0-0`, u("tilde return", d), d;
		});
	}, E = (t, a) => t.trim().split(/\s+/).map((t) => D(t, a)).join(" "), D = (t, a) => {
		u("caret", t, a);
		let o = a.loose ? f[p.CARETLOOSE] : f[p.CARET], s = a.includePrerelease ? "-0" : "";
		return t.replace(o, (a, o, c, l, d) => {
			u("caret", t, a, o, c, l, d);
			let f;
			return C(o) ? f = "" : C(c) ? f = `>=${o}.0.0${s} <${+o + 1}.0.0-0` : C(l) ? f = o === "0" ? `>=${o}.${c}.0${s} <${o}.${+c + 1}.0-0` : `>=${o}.${c}.0${s} <${+o + 1}.0.0-0` : d ? (u("replaceCaret pr", d), f = o === "0" ? c === "0" ? `>=${o}.${c}.${l}-${d} <${o}.${c}.${+l + 1}-0` : `>=${o}.${c}.${l}-${d} <${o}.${+c + 1}.0-0` : `>=${o}.${c}.${l}-${d} <${+o + 1}.0.0-0`) : (u("no pr"), f = o === "0" ? c === "0" ? `>=${o}.${c}.${l}${s} <${o}.${c}.${+l + 1}-0` : `>=${o}.${c}.${l}${s} <${o}.${+c + 1}.0-0` : `>=${o}.${c}.${l} <${+o + 1}.0.0-0`), u("caret return", f), f;
		});
	}, O = (t, a) => (u("replaceXRanges", t, a), t.split(/\s+/).map((t) => k(t, a)).join(" ")), k = (t, a) => {
		t = t.trim();
		let o = a.loose ? f[p.XRANGELOOSE] : f[p.XRANGE];
		return t.replace(o, (o, s, c, l, d, f) => {
			u("xRange", t, o, s, c, l, d, f);
			let p = C(c), m = p || C(l), h = m || C(d), g = h;
			return s === "=" && g && (s = ""), f = a.includePrerelease ? "-0" : "", p ? o = s === ">" || s === "<" ? "<0.0.0-0" : "*" : s && g ? (m && (l = 0), d = 0, s === ">" ? (s = ">=", m ? (c = +c + 1, l = 0, d = 0) : (l = +l + 1, d = 0)) : s === "<=" && (s = "<", m ? c = +c + 1 : l = +l + 1), s === "<" && (f = "-0"), o = `${s + c}.${l}.${d}${f}`) : m ? o = `>=${c}.0.0${f} <${+c + 1}.0.0-0` : h && (o = `>=${c}.${l}.0${f} <${c}.${+l + 1}.0-0`), u("xRange return", o), o;
		});
	}, A = (t, a) => (u("replaceStars", t, a), t.trim().replace(f[p.STAR], "")), j = (t, a) => (u("replaceGTE0", t, a), t.trim().replace(f[a.includePrerelease ? p.GTE0PRE : p.GTE0], "")), M = (t) => (a, o, s, c, l, u, d, f, p, m, h, g) => (o = C(s) ? "" : C(c) ? `>=${s}.0.0${t ? "-0" : ""}` : C(l) ? `>=${s}.${c}.0${t ? "-0" : ""}` : u ? `>=${o}` : `>=${o}${t ? "-0" : ""}`, f = C(p) ? "" : C(m) ? `<${+p + 1}.0.0-0` : C(h) ? `<${p}.${+m + 1}.0-0` : g ? `<=${p}.${m}.${h}-${g}` : t ? `<${p}.${m}.${+h + 1}-0` : `<=${f}`, `${o} ${f}`.trim()), N = (t, a, o) => {
		for (let o = 0; o < t.length; o++) if (!t[o].test(a)) return !1;
		if (a.prerelease.length && !o.includePrerelease) {
			for (let o = 0; o < t.length; o++) if (u(t[o].semver), t[o].semver !== l.ANY && t[o].semver.prerelease.length > 0) {
				let s = t[o].semver;
				if (s.major === a.major && s.minor === a.minor && s.patch === a.patch) return !0;
			}
			return !1;
		}
		return !0;
	};
})), require_comparator = /* @__PURE__ */ __commonJSMin(((t, a) => {
	var o = Symbol("SemVer ANY");
	a.exports = class t {
		static get ANY() {
			return o;
		}
		constructor(a, c) {
			if (c = s(c), a instanceof t) {
				if (a.loose === !!c.loose) return a;
				a = a.value;
			}
			a = a.trim().split(/\s+/).join(" "), d("comparator", a, c), this.options = c, this.loose = !!c.loose, this.parse(a), this.semver === o ? this.value = "" : this.value = this.operator + this.semver.version, d("comp", this);
		}
		parse(t) {
			let a = this.options.loose ? c[l.COMPARATORLOOSE] : c[l.COMPARATOR], s = t.match(a);
			if (!s) throw TypeError(`Invalid comparator: ${t}`);
			this.operator = s[1] === void 0 ? "" : s[1], this.operator === "=" && (this.operator = ""), s[2] ? this.semver = new f(s[2], this.options.loose) : this.semver = o;
		}
		toString() {
			return this.value;
		}
		test(t) {
			if (d("Comparator.test", t, this.options.loose), this.semver === o || t === o) return !0;
			if (typeof t == "string") try {
				t = new f(t, this.options);
			} catch {
				return !1;
			}
			return u(t, this.operator, this.semver, this.options);
		}
		intersects(a, o) {
			if (!(a instanceof t)) throw TypeError("a Comparator is required");
			return this.operator === "" ? this.value === "" ? !0 : new p(a.value, o).test(this.value) : a.operator === "" ? a.value === "" ? !0 : new p(this.value, o).test(a.semver) : (o = s(o), o.includePrerelease && (this.value === "<0.0.0-0" || a.value === "<0.0.0-0") || !o.includePrerelease && (this.value.startsWith("<0.0.0") || a.value.startsWith("<0.0.0")) ? !1 : !!(this.operator.startsWith(">") && a.operator.startsWith(">") || this.operator.startsWith("<") && a.operator.startsWith("<") || this.semver.version === a.semver.version && this.operator.includes("=") && a.operator.includes("=") || u(this.semver, "<", a.semver, o) && this.operator.startsWith(">") && a.operator.startsWith("<") || u(this.semver, ">", a.semver, o) && this.operator.startsWith("<") && a.operator.startsWith(">")));
		}
	};
	var s = require_parse_options(), { safeRe: c, t: l } = require_re(), u = require_cmp(), d = require_debug(), f = require_semver$1(), p = require_range();
})), require_satisfies = /* @__PURE__ */ __commonJSMin(((t, a) => {
	var o = require_range();
	a.exports = (t, a, s) => {
		try {
			a = new o(a, s);
		} catch {
			return !1;
		}
		return a.test(t);
	};
})), require_to_comparators = /* @__PURE__ */ __commonJSMin(((t, a) => {
	var o = require_range();
	a.exports = (t, a) => new o(t, a).set.map((t) => t.map((t) => t.value).join(" ").trim().split(" "));
})), require_max_satisfying = /* @__PURE__ */ __commonJSMin(((t, a) => {
	var o = require_semver$1(), s = require_range();
	a.exports = (t, a, c) => {
		let l = null, u = null, d = null;
		try {
			d = new s(a, c);
		} catch {
			return null;
		}
		return t.forEach((t) => {
			d.test(t) && (!l || u.compare(t) === -1) && (l = t, u = new o(l, c));
		}), l;
	};
})), require_min_satisfying = /* @__PURE__ */ __commonJSMin(((t, a) => {
	var o = require_semver$1(), s = require_range();
	a.exports = (t, a, c) => {
		let l = null, u = null, d = null;
		try {
			d = new s(a, c);
		} catch {
			return null;
		}
		return t.forEach((t) => {
			d.test(t) && (!l || u.compare(t) === 1) && (l = t, u = new o(l, c));
		}), l;
	};
})), require_min_version = /* @__PURE__ */ __commonJSMin(((t, a) => {
	var o = require_semver$1(), s = require_range(), c = require_gt();
	a.exports = (t, a) => {
		t = new s(t, a);
		let l = new o("0.0.0");
		if (t.test(l) || (l = new o("0.0.0-0"), t.test(l))) return l;
		l = null;
		for (let a = 0; a < t.set.length; ++a) {
			let s = t.set[a], u = null;
			s.forEach((t) => {
				let a = new o(t.semver.version);
				switch (t.operator) {
					case ">": a.prerelease.length === 0 ? a.patch++ : a.prerelease.push(0), a.raw = a.format();
					case "":
					case ">=":
						(!u || c(a, u)) && (u = a);
						break;
					case "<":
					case "<=": break;
					default: throw Error(`Unexpected operation: ${t.operator}`);
				}
			}), u && (!l || c(l, u)) && (l = u);
		}
		return l && t.test(l) ? l : null;
	};
})), require_valid = /* @__PURE__ */ __commonJSMin(((t, a) => {
	var o = require_range();
	a.exports = (t, a) => {
		try {
			return new o(t, a).range || "*";
		} catch {
			return null;
		}
	};
})), require_outside = /* @__PURE__ */ __commonJSMin(((t, a) => {
	var o = require_semver$1(), s = require_comparator(), { ANY: c } = s, l = require_range(), u = require_satisfies(), d = require_gt(), f = require_lt(), p = require_lte(), m = require_gte();
	a.exports = (t, a, h, g) => {
		t = new o(t, g), a = new l(a, g);
		let _, v, y, b, x;
		switch (h) {
			case ">":
				_ = d, v = p, y = f, b = ">", x = ">=";
				break;
			case "<":
				_ = f, v = m, y = d, b = "<", x = "<=";
				break;
			default: throw TypeError("Must provide a hilo val of \"<\" or \">\"");
		}
		if (u(t, a, g)) return !1;
		for (let o = 0; o < a.set.length; ++o) {
			let l = a.set[o], u = null, d = null;
			if (l.forEach((t) => {
				t.semver === c && (t = new s(">=0.0.0")), u ||= t, d ||= t, _(t.semver, u.semver, g) ? u = t : y(t.semver, d.semver, g) && (d = t);
			}), u.operator === b || u.operator === x || (!d.operator || d.operator === b) && v(t, d.semver) || d.operator === x && y(t, d.semver)) return !1;
		}
		return !0;
	};
})), require_gtr = /* @__PURE__ */ __commonJSMin(((t, a) => {
	var o = require_outside();
	a.exports = (t, a, s) => o(t, a, ">", s);
})), require_ltr = /* @__PURE__ */ __commonJSMin(((t, a) => {
	var o = require_outside();
	a.exports = (t, a, s) => o(t, a, "<", s);
})), require_intersects = /* @__PURE__ */ __commonJSMin(((t, a) => {
	var o = require_range();
	a.exports = (t, a, s) => (t = new o(t, s), a = new o(a, s), t.intersects(a, s));
})), require_simplify = /* @__PURE__ */ __commonJSMin(((t, a) => {
	var o = require_satisfies(), s = require_compare();
	a.exports = (t, a, c) => {
		let l = [], u = null, d = null, f = t.sort((t, a) => s(t, a, c));
		for (let t of f) o(t, a, c) ? (d = t, u ||= t) : (d && l.push([u, d]), d = null, u = null);
		u && l.push([u, null]);
		let p = [];
		for (let [t, a] of l) t === a ? p.push(t) : !a && t === f[0] ? p.push("*") : a ? t === f[0] ? p.push(`<=${a}`) : p.push(`${t} - ${a}`) : p.push(`>=${t}`);
		let m = p.join(" || "), h = typeof a.raw == "string" ? a.raw : String(a);
		return m.length < h.length ? m : a;
	};
})), require_subset = /* @__PURE__ */ __commonJSMin(((t, a) => {
	var o = require_range(), s = require_comparator(), { ANY: c } = s, l = require_satisfies(), u = require_compare(), d = (t, a, s = {}) => {
		if (t === a) return !0;
		t = new o(t, s), a = new o(a, s);
		let c = !1;
		OUTER: for (let o of t.set) {
			for (let t of a.set) {
				let a = m(o, t, s);
				if (c ||= a !== null, a) continue OUTER;
			}
			if (c) return !1;
		}
		return !0;
	}, f = [new s(">=0.0.0-0")], p = [new s(">=0.0.0")], m = (t, a, o) => {
		if (t === a) return !0;
		if (t.length === 1 && t[0].semver === c) {
			if (a.length === 1 && a[0].semver === c) return !0;
			t = o.includePrerelease ? f : p;
		}
		if (a.length === 1 && a[0].semver === c) {
			if (o.includePrerelease) return !0;
			a = p;
		}
		let s = /* @__PURE__ */ new Set(), d, m;
		for (let a of t) a.operator === ">" || a.operator === ">=" ? d = h(d, a, o) : a.operator === "<" || a.operator === "<=" ? m = g(m, a, o) : s.add(a.semver);
		if (s.size > 1) return null;
		let _;
		if (d && m && (_ = u(d.semver, m.semver, o), _ > 0 || _ === 0 && (d.operator !== ">=" || m.operator !== "<="))) return null;
		for (let t of s) {
			if (d && !l(t, String(d), o) || m && !l(t, String(m), o)) return null;
			for (let s of a) if (!l(t, String(s), o)) return !1;
			return !0;
		}
		let v, y, b, x, S = m && !o.includePrerelease && m.semver.prerelease.length ? m.semver : !1, C = d && !o.includePrerelease && d.semver.prerelease.length ? d.semver : !1;
		S && S.prerelease.length === 1 && m.operator === "<" && S.prerelease[0] === 0 && (S = !1);
		for (let t of a) {
			if (x = x || t.operator === ">" || t.operator === ">=", b = b || t.operator === "<" || t.operator === "<=", d) {
				if (C && t.semver.prerelease && t.semver.prerelease.length && t.semver.major === C.major && t.semver.minor === C.minor && t.semver.patch === C.patch && (C = !1), t.operator === ">" || t.operator === ">=") {
					if (v = h(d, t, o), v === t && v !== d) return !1;
				} else if (d.operator === ">=" && !l(d.semver, String(t), o)) return !1;
			}
			if (m) {
				if (S && t.semver.prerelease && t.semver.prerelease.length && t.semver.major === S.major && t.semver.minor === S.minor && t.semver.patch === S.patch && (S = !1), t.operator === "<" || t.operator === "<=") {
					if (y = g(m, t, o), y === t && y !== m) return !1;
				} else if (m.operator === "<=" && !l(m.semver, String(t), o)) return !1;
			}
			if (!t.operator && (m || d) && _ !== 0) return !1;
		}
		return !(d && b && !m && _ !== 0 || m && x && !d && _ !== 0 || C || S);
	}, h = (t, a, o) => {
		if (!t) return a;
		let s = u(t.semver, a.semver, o);
		return s > 0 ? t : s < 0 || a.operator === ">" && t.operator === ">=" ? a : t;
	}, g = (t, a, o) => {
		if (!t) return a;
		let s = u(t.semver, a.semver, o);
		return s < 0 ? t : s > 0 || a.operator === "<" && t.operator === "<=" ? a : t;
	};
	a.exports = d;
})), import_semver = /* @__PURE__ */ __toESM((/* @__PURE__ */ __commonJSMin(((t, a) => {
	var o = require_re(), s = require_constants$1(), c = require_semver$1(), l = require_identifiers();
	a.exports = {
		parse: require_parse(),
		valid: require_valid$1(),
		clean: require_clean(),
		inc: require_inc(),
		diff: require_diff(),
		major: require_major(),
		minor: require_minor(),
		patch: require_patch(),
		prerelease: require_prerelease(),
		compare: require_compare(),
		rcompare: require_rcompare(),
		compareLoose: require_compare_loose(),
		compareBuild: require_compare_build(),
		sort: require_sort(),
		rsort: require_rsort(),
		gt: require_gt(),
		lt: require_lt(),
		eq: require_eq(),
		neq: require_neq(),
		gte: require_gte(),
		lte: require_lte(),
		cmp: require_cmp(),
		coerce: require_coerce(),
		Comparator: require_comparator(),
		Range: require_range(),
		satisfies: require_satisfies(),
		toComparators: require_to_comparators(),
		maxSatisfying: require_max_satisfying(),
		minSatisfying: require_min_satisfying(),
		minVersion: require_min_version(),
		validRange: require_valid(),
		outside: require_outside(),
		gtr: require_gtr(),
		ltr: require_ltr(),
		intersects: require_intersects(),
		simplifyRange: require_simplify(),
		subset: require_subset(),
		SemVer: c,
		re: o.re,
		src: o.src,
		tokens: o.t,
		SEMVER_SPEC_VERSION: s.SEMVER_SPEC_VERSION,
		RELEASE_TYPES: s.RELEASE_TYPES,
		compareIdentifiers: l.compareIdentifiers,
		rcompareIdentifiers: l.rcompareIdentifiers
	};
})))(), 1), objectToString = Object.prototype.toString, uint8ArrayStringified = "[object Uint8Array]", arrayBufferStringified = "[object ArrayBuffer]";
function isType(t, a, o) {
	return t ? t.constructor === a ? !0 : objectToString.call(t) === o : !1;
}
function isUint8Array(t) {
	return isType(t, Uint8Array, uint8ArrayStringified);
}
function isArrayBuffer(t) {
	return isType(t, ArrayBuffer, arrayBufferStringified);
}
function isUint8ArrayOrArrayBuffer(t) {
	return isUint8Array(t) || isArrayBuffer(t);
}
function assertUint8Array(t) {
	if (!isUint8Array(t)) throw TypeError(`Expected \`Uint8Array\`, got \`${typeof t}\``);
}
function assertUint8ArrayOrArrayBuffer(t) {
	if (!isUint8ArrayOrArrayBuffer(t)) throw TypeError(`Expected \`Uint8Array\` or \`ArrayBuffer\`, got \`${typeof t}\``);
}
function concatUint8Arrays(t, a) {
	if (t.length === 0) return new Uint8Array();
	a ??= t.reduce((t, a) => t + a.length, 0);
	let o = new Uint8Array(a), s = 0;
	for (let a of t) assertUint8Array(a), o.set(a, s), s += a.length;
	return o;
}
var cachedDecoders = { utf8: new globalThis.TextDecoder("utf8") };
function uint8ArrayToString(t, a = "utf8") {
	return assertUint8ArrayOrArrayBuffer(t), cachedDecoders[a] ??= new globalThis.TextDecoder(a), cachedDecoders[a].decode(t);
}
function assertString(t) {
	if (typeof t != "string") throw TypeError(`Expected \`string\`, got \`${typeof t}\``);
}
var cachedEncoder = new globalThis.TextEncoder();
function stringToUint8Array(t) {
	return assertString(t), cachedEncoder.encode(t);
}
Array.from({ length: 256 }, (t, a) => a.toString(16).padStart(2, "0"));
var encryptionAlgorithm = "aes-256-cbc", createPlainObject = () => Object.create(null), isExist = (t) => t !== void 0, checkValueType = (t, a) => {
	let o = new Set([
		"undefined",
		"symbol",
		"function"
	]), s = typeof a;
	if (o.has(s)) throw TypeError(`Setting a value of type \`${s}\` for key \`${t}\` is not allowed as it's not supported by JSON`);
}, INTERNAL_KEY = "__internal__", MIGRATION_KEY = `${INTERNAL_KEY}.migrations.version`, Conf = class {
	path;
	events;
	#e;
	#t;
	#n;
	#r = {};
	#i = !1;
	#a;
	#o;
	#s;
	constructor(t = {}) {
		let a = this.#c(t);
		this.#n = a, this.#l(a), this.#d(a), this.#f(a), this.events = new EventTarget(), this.#t = a.encryptionKey, this.path = this.#p(a), this.#m(a), a.watch && this._watch();
	}
	get(t, a) {
		if (this.#n.accessPropertiesByDotNotation) return this._get(t, a);
		let { store: o } = this;
		return t in o ? o[t] : a;
	}
	set(t, a) {
		if (typeof t != "string" && typeof t != "object") throw TypeError(`Expected \`key\` to be of type \`string\` or \`object\`, got ${typeof t}`);
		if (typeof t != "object" && a === void 0) throw TypeError("Use `delete()` to clear values");
		if (this._containsReservedKey(t)) throw TypeError(`Please don't use the ${INTERNAL_KEY} key, as it's used to manage this module internal operations.`);
		let { store: o } = this, s = (t, a) => {
			if (checkValueType(t, a), this.#n.accessPropertiesByDotNotation) setProperty(o, t, a);
			else {
				if (t === "__proto__" || t === "constructor" || t === "prototype") return;
				o[t] = a;
			}
		};
		if (typeof t == "object") {
			let a = t;
			for (let [t, o] of Object.entries(a)) s(t, o);
		} else s(t, a);
		this.store = o;
	}
	has(t) {
		return this.#n.accessPropertiesByDotNotation ? hasProperty(this.store, t) : t in this.store;
	}
	appendToArray(t, a) {
		checkValueType(t, a);
		let o = this.#n.accessPropertiesByDotNotation ? this._get(t, []) : t in this.store ? this.store[t] : [];
		if (!Array.isArray(o)) throw TypeError(`The key \`${t}\` is already set to a non-array value`);
		this.set(t, [...o, a]);
	}
	reset(...t) {
		for (let a of t) isExist(this.#r[a]) && this.set(a, this.#r[a]);
	}
	delete(t) {
		let { store: a } = this;
		this.#n.accessPropertiesByDotNotation ? deleteProperty(a, t) : delete a[t], this.store = a;
	}
	clear() {
		let t = createPlainObject();
		for (let a of Object.keys(this.#r)) isExist(this.#r[a]) && (checkValueType(a, this.#r[a]), this.#n.accessPropertiesByDotNotation ? setProperty(t, a, this.#r[a]) : t[a] = this.#r[a]);
		this.store = t;
	}
	onDidChange(t, a) {
		if (typeof t != "string") throw TypeError(`Expected \`key\` to be of type \`string\`, got ${typeof t}`);
		if (typeof a != "function") throw TypeError(`Expected \`callback\` to be of type \`function\`, got ${typeof a}`);
		return this._handleValueChange(() => this.get(t), a);
	}
	onDidAnyChange(t) {
		if (typeof t != "function") throw TypeError(`Expected \`callback\` to be of type \`function\`, got ${typeof t}`);
		return this._handleStoreChange(t);
	}
	get size() {
		return Object.keys(this.store).filter((t) => !this._isReservedKeyPath(t)).length;
	}
	get store() {
		try {
			let t = fs.readFileSync(this.path, this.#t ? null : "utf8"), a = this._decryptData(t), o = this._deserialize(a);
			return this.#i || this._validate(o), Object.assign(createPlainObject(), o);
		} catch (t) {
			if (t?.code === "ENOENT") return this._ensureDirectory(), createPlainObject();
			if (this.#n.clearInvalidConfig) {
				let a = t;
				if (a.name === "SyntaxError" || a.message?.startsWith("Config schema violation:")) return createPlainObject();
			}
			throw t;
		}
	}
	set store(t) {
		if (this._ensureDirectory(), !hasProperty(t, INTERNAL_KEY)) try {
			let a = fs.readFileSync(this.path, this.#t ? null : "utf8"), o = this._decryptData(a), s = this._deserialize(o);
			hasProperty(s, INTERNAL_KEY) && setProperty(t, INTERNAL_KEY, getProperty(s, INTERNAL_KEY));
		} catch {}
		this.#i || this._validate(t), this._write(t), this.events.dispatchEvent(new Event("change"));
	}
	*[Symbol.iterator]() {
		for (let [t, a] of Object.entries(this.store)) this._isReservedKeyPath(t) || (yield [t, a]);
	}
	_closeWatcher() {
		this.#a &&= (this.#a.close(), void 0), this.#o &&= (fs.unwatchFile(this.path), !1), this.#s = void 0;
	}
	_decryptData(t) {
		if (!this.#t) return typeof t == "string" ? t : uint8ArrayToString(t);
		try {
			let a = t.slice(0, 16), o = crypto.pbkdf2Sync(this.#t, a, 1e4, 32, "sha512"), s = crypto.createDecipheriv(encryptionAlgorithm, o, a), c = t.slice(17), l = typeof c == "string" ? stringToUint8Array(c) : c;
			return uint8ArrayToString(concatUint8Arrays([s.update(l), s.final()]));
		} catch {
			try {
				let a = t.slice(0, 16), o = crypto.pbkdf2Sync(this.#t, a.toString(), 1e4, 32, "sha512"), s = crypto.createDecipheriv(encryptionAlgorithm, o, a), c = t.slice(17), l = typeof c == "string" ? stringToUint8Array(c) : c;
				return uint8ArrayToString(concatUint8Arrays([s.update(l), s.final()]));
			} catch {}
		}
		return typeof t == "string" ? t : uint8ArrayToString(t);
	}
	_handleStoreChange(t) {
		let a = this.store, o = () => {
			let o = a, s = this.store;
			isDeepStrictEqual(s, o) || (a = s, t.call(this, s, o));
		};
		return this.events.addEventListener("change", o), () => {
			this.events.removeEventListener("change", o);
		};
	}
	_handleValueChange(t, a) {
		let o = t(), s = () => {
			let s = o, c = t();
			isDeepStrictEqual(c, s) || (o = c, a.call(this, c, s));
		};
		return this.events.addEventListener("change", s), () => {
			this.events.removeEventListener("change", s);
		};
	}
	_deserialize = (t) => JSON.parse(t);
	_serialize = (t) => JSON.stringify(t, void 0, "	");
	_validate(t) {
		if (!this.#e || this.#e(t) || !this.#e.errors) return;
		let a = this.#e.errors.map(({ instancePath: t, message: a = "" }) => `\`${t.slice(1)}\` ${a}`);
		throw Error("Config schema violation: " + a.join("; "));
	}
	_ensureDirectory() {
		fs.mkdirSync(path.dirname(this.path), { recursive: !0 });
	}
	_write(t) {
		let a = this._serialize(t);
		if (this.#t) {
			let t = crypto.randomBytes(16), o = crypto.pbkdf2Sync(this.#t, t, 1e4, 32, "sha512"), s = crypto.createCipheriv(encryptionAlgorithm, o, t);
			a = concatUint8Arrays([
				t,
				stringToUint8Array(":"),
				s.update(stringToUint8Array(a)),
				s.final()
			]);
		}
		if (process$1.env.SNAP) fs.writeFileSync(this.path, a, { mode: this.#n.configFileMode });
		else try {
			writeFileSync$1(this.path, a, { mode: this.#n.configFileMode });
		} catch (t) {
			if (t?.code === "EXDEV") {
				fs.writeFileSync(this.path, a, { mode: this.#n.configFileMode });
				return;
			}
			throw t;
		}
	}
	_watch() {
		if (this._ensureDirectory(), fs.existsSync(this.path) || this._write(createPlainObject()), process$1.platform === "win32" || process$1.platform === "darwin") {
			this.#s ??= debounce_fn_default(() => {
				this.events.dispatchEvent(new Event("change"));
			}, { wait: 100 });
			let t = path.dirname(this.path), a = path.basename(this.path);
			this.#a = fs.watch(t, {
				persistent: !1,
				encoding: "utf8"
			}, (t, o) => {
				o && o !== a || typeof this.#s == "function" && this.#s();
			});
		} else this.#s ??= debounce_fn_default(() => {
			this.events.dispatchEvent(new Event("change"));
		}, { wait: 1e3 }), fs.watchFile(this.path, { persistent: !1 }, (t, a) => {
			typeof this.#s == "function" && this.#s();
		}), this.#o = !0;
	}
	_migrate(t, a, o) {
		let s = this._get(MIGRATION_KEY, "0.0.0"), c = Object.keys(t).filter((t) => this._shouldPerformMigration(t, s, a)), l = structuredClone(this.store);
		for (let u of c) try {
			o && o(this, {
				fromVersion: s,
				toVersion: u,
				finalVersion: a,
				versions: c
			});
			let d = t[u];
			d?.(this), this._set(MIGRATION_KEY, u), s = u, l = structuredClone(this.store);
		} catch (t) {
			this.store = l;
			try {
				this._write(l);
			} catch {}
			let a = t instanceof Error ? t.message : String(t);
			throw Error(`Something went wrong during the migration! Changes applied to the store until this failed migration will be restored. ${a}`);
		}
		(this._isVersionInRangeFormat(s) || !import_semver.default.eq(s, a)) && this._set(MIGRATION_KEY, a);
	}
	_containsReservedKey(t) {
		return typeof t == "string" ? this._isReservedKeyPath(t) : !t || typeof t != "object" ? !1 : this._objectContainsReservedKey(t);
	}
	_objectContainsReservedKey(t) {
		if (!t || typeof t != "object") return !1;
		for (let [a, o] of Object.entries(t)) if (this._isReservedKeyPath(a) || this._objectContainsReservedKey(o)) return !0;
		return !1;
	}
	_isReservedKeyPath(t) {
		return t === INTERNAL_KEY || t.startsWith(`${INTERNAL_KEY}.`);
	}
	_isVersionInRangeFormat(t) {
		return import_semver.default.clean(t) === null;
	}
	_shouldPerformMigration(t, a, o) {
		return this._isVersionInRangeFormat(t) ? a !== "0.0.0" && import_semver.default.satisfies(a, t) ? !1 : import_semver.default.satisfies(o, t) : !(import_semver.default.lte(t, a) || import_semver.default.gt(t, o));
	}
	_get(t, a) {
		return getProperty(this.store, t, a);
	}
	_set(t, a) {
		let { store: o } = this;
		setProperty(o, t, a), this.store = o;
	}
	#c(t) {
		let a = {
			configName: "config",
			fileExtension: "json",
			projectSuffix: "nodejs",
			clearInvalidConfig: !1,
			accessPropertiesByDotNotation: !0,
			configFileMode: 438,
			...t
		};
		if (!a.cwd) {
			if (!a.projectName) throw Error("Please specify the `projectName` option.");
			a.cwd = envPaths(a.projectName, { suffix: a.projectSuffix }).config;
		}
		return typeof a.fileExtension == "string" && (a.fileExtension = a.fileExtension.replace(/^\.+/, "")), a;
	}
	#l(t) {
		if (!(t.schema ?? t.ajvOptions ?? t.rootSchema)) return;
		if (t.schema && typeof t.schema != "object") throw TypeError("The `schema` option must be an object.");
		let a = import_dist.default.default, o = new import__2020.Ajv2020({
			allErrors: !0,
			useDefaults: !0,
			...t.ajvOptions
		});
		a(o);
		let s = {
			...t.rootSchema,
			type: "object",
			properties: t.schema
		};
		this.#e = o.compile(s), this.#u(t.schema);
	}
	#u(t) {
		let a = Object.entries(t ?? {});
		for (let [t, o] of a) {
			if (!o || typeof o != "object" || !Object.hasOwn(o, "default")) continue;
			let { default: a } = o;
			a !== void 0 && (this.#r[t] = a);
		}
	}
	#d(t) {
		t.defaults && Object.assign(this.#r, t.defaults);
	}
	#f(t) {
		t.serialize && (this._serialize = t.serialize), t.deserialize && (this._deserialize = t.deserialize);
	}
	#p(t) {
		let a = typeof t.fileExtension == "string" ? t.fileExtension : void 0, o = a ? `.${a}` : "";
		return path.resolve(t.cwd, `${t.configName ?? "config"}${o}`);
	}
	#m(t) {
		if (t.migrations) {
			this.#h(t), this._validate(this.store);
			return;
		}
		let a = this.store, o = Object.assign(createPlainObject(), t.defaults ?? {}, a);
		this._validate(o);
		try {
			assert.deepEqual(a, o);
		} catch {
			this.store = o;
		}
	}
	#h(t) {
		let { migrations: a, projectVersion: o } = t;
		if (a) {
			if (!o) throw Error("Please specify the `projectVersion` option.");
			this.#i = !0;
			try {
				let s = this.store, c = Object.assign(createPlainObject(), t.defaults ?? {}, s);
				try {
					assert.deepEqual(s, c);
				} catch {
					this._write(c);
				}
				this._migrate(a, o, t.beforeEachMigration);
			} finally {
				this.#i = !1;
			}
		}
	}
}, { app: app$1, ipcMain: ipcMain$1, shell: shell$1 } = electron, isInitialized = !1, initDataListener = () => {
	if (!ipcMain$1 || !app$1) throw Error("Electron Store: You need to call `.initRenderer()` from the main process.");
	let t = {
		defaultCwd: app$1.getPath("userData"),
		appVersion: app$1.getVersion()
	};
	return isInitialized ? t : (ipcMain$1.on("electron-store-get-data", (a) => {
		a.returnValue = t;
	}), isInitialized = !0, t);
}, ElectronStore = class extends Conf {
	constructor(a) {
		let o, s;
		if (process$1.type === "renderer") {
			let a = electron.ipcRenderer.sendSync("electron-store-get-data");
			if (!a) throw Error("Electron Store: You need to call `.initRenderer()` from the main process.");
			({defaultCwd: o, appVersion: s} = a);
		} else ipcMain$1 && app$1 && ({defaultCwd: o, appVersion: s} = initDataListener());
		a = {
			name: "config",
			...a
		}, a.projectVersion ||= s, a.cwd ? a.cwd = path.isAbsolute(a.cwd) ? a.cwd : path.join(o, a.cwd) : a.cwd = o, a.configName = a.name, delete a.name, super(a);
	}
	static initRenderer() {
		initDataListener();
	}
	async openInEditor() {
		let t = await shell$1.openPath(this.path);
		if (t) throw Error(t);
	}
}, require_constants = /* @__PURE__ */ __commonJSMin(((t, a) => {
	a.exports = {
		LOCHDR: 30,
		LOCSIG: 67324752,
		LOCVER: 4,
		LOCFLG: 6,
		LOCHOW: 8,
		LOCTIM: 10,
		LOCCRC: 14,
		LOCSIZ: 18,
		LOCLEN: 22,
		LOCNAM: 26,
		LOCEXT: 28,
		EXTSIG: 134695760,
		EXTHDR: 16,
		EXTCRC: 4,
		EXTSIZ: 8,
		EXTLEN: 12,
		CENHDR: 46,
		CENSIG: 33639248,
		CENVEM: 4,
		CENVER: 6,
		CENFLG: 8,
		CENHOW: 10,
		CENTIM: 12,
		CENCRC: 16,
		CENSIZ: 20,
		CENLEN: 24,
		CENNAM: 28,
		CENEXT: 30,
		CENCOM: 32,
		CENDSK: 34,
		CENATT: 36,
		CENATX: 38,
		CENOFF: 42,
		ENDHDR: 22,
		ENDSIG: 101010256,
		ENDSUB: 8,
		ENDTOT: 10,
		ENDSIZ: 12,
		ENDOFF: 16,
		ENDCOM: 20,
		END64HDR: 20,
		END64SIG: 117853008,
		END64START: 4,
		END64OFF: 8,
		END64NUMDISKS: 16,
		ZIP64SIG: 101075792,
		ZIP64HDR: 56,
		ZIP64LEAD: 12,
		ZIP64SIZE: 4,
		ZIP64VEM: 12,
		ZIP64VER: 14,
		ZIP64DSK: 16,
		ZIP64DSKDIR: 20,
		ZIP64SUB: 24,
		ZIP64TOT: 32,
		ZIP64SIZB: 40,
		ZIP64OFF: 48,
		ZIP64EXTRA: 56,
		STORED: 0,
		SHRUNK: 1,
		REDUCED1: 2,
		REDUCED2: 3,
		REDUCED3: 4,
		REDUCED4: 5,
		IMPLODED: 6,
		DEFLATED: 8,
		ENHANCED_DEFLATED: 9,
		PKWARE: 10,
		BZIP2: 12,
		LZMA: 14,
		IBM_TERSE: 18,
		IBM_LZ77: 19,
		AES_ENCRYPT: 99,
		FLG_ENC: 1,
		FLG_COMP1: 2,
		FLG_COMP2: 4,
		FLG_DESC: 8,
		FLG_ENH: 16,
		FLG_PATCH: 32,
		FLG_STR: 64,
		FLG_EFS: 2048,
		FLG_MSK: 4096,
		FILE: 2,
		BUFFER: 1,
		NONE: 0,
		EF_ID: 0,
		EF_SIZE: 2,
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
	};
})), require_errors = /* @__PURE__ */ __commonJSMin(((t) => {
	var a = {
		INVALID_LOC: "Invalid LOC header (bad signature)",
		INVALID_CEN: "Invalid CEN header (bad signature)",
		INVALID_END: "Invalid END header (bad signature)",
		DESCRIPTOR_NOT_EXIST: "No descriptor present",
		DESCRIPTOR_UNKNOWN: "Unknown descriptor format",
		DESCRIPTOR_FAULTY: "Descriptor data is malformed",
		NO_DATA: "Nothing to decompress",
		BAD_CRC: "CRC32 checksum failed {0}",
		FILE_IN_THE_WAY: "There is a file in the way: {0}",
		UNKNOWN_METHOD: "Invalid/unsupported compression method",
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
		CANT_EXTRACT_FILE: "Could not extract the file",
		CANT_OVERRIDE: "Target file already exists",
		DISK_ENTRY_TOO_LARGE: "Number of disk entries is too large",
		NO_ZIP: "No zip file was loaded",
		NO_ENTRY: "Entry doesn't exist",
		DIRECTORY_CONTENT_ERROR: "A directory cannot have content",
		FILE_NOT_FOUND: "File not found: \"{0}\"",
		NOT_IMPLEMENTED: "Not implemented",
		INVALID_FILENAME: "Invalid filename",
		INVALID_FORMAT: "Invalid or unsupported zip format. No END header found",
		INVALID_PASS_PARAM: "Incompatible password parameter",
		WRONG_PASSWORD: "Wrong Password",
		COMMENT_TOO_LONG: "Comment is too long",
		EXTRA_FIELD_PARSE_ERROR: "Extra field parsing error"
	};
	function o(t) {
		return function(...a) {
			return a.length && (t = t.replace(/\{(\d)\}/g, (t, o) => a[o] || "")), /* @__PURE__ */ Error("ADM-ZIP: " + t);
		};
	}
	for (let s of Object.keys(a)) t[s] = o(a[s]);
})), require_utils$2 = /* @__PURE__ */ __commonJSMin(((t, a) => {
	var o = __require("fs"), s = __require("path"), c = require_constants(), l = require_errors(), u = typeof process == "object" && process.platform === "win32", d = (t) => typeof t == "object" && !!t, f = new Uint32Array(256).map((t, a) => {
		for (let t = 0; t < 8; t++) a & 1 ? a = 3988292384 ^ a >>> 1 : a >>>= 1;
		return a >>> 0;
	});
	function p(t) {
		this.sep = s.sep, this.fs = o, d(t) && d(t.fs) && typeof t.fs.statSync == "function" && (this.fs = t.fs);
	}
	a.exports = p, p.prototype.makeDir = function(t) {
		let a = this;
		function o(t) {
			let o = t.split(a.sep)[0];
			t.split(a.sep).forEach(function(t) {
				if (!(!t || t.substr(-1, 1) === ":")) {
					o += a.sep + t;
					var s;
					try {
						s = a.fs.statSync(o);
					} catch {
						a.fs.mkdirSync(o);
					}
					if (s && s.isFile()) throw l.FILE_IN_THE_WAY(`"${o}"`);
				}
			});
		}
		o(t);
	}, p.prototype.writeFileTo = function(t, a, o, c) {
		let l = this;
		if (l.fs.existsSync(t) && (!o || l.fs.statSync(t).isDirectory())) return !1;
		var u = s.dirname(t);
		l.fs.existsSync(u) || l.makeDir(u);
		var d;
		try {
			d = l.fs.openSync(t, "w", 438);
		} catch {
			l.fs.chmodSync(t, 438), d = l.fs.openSync(t, "w", 438);
		}
		if (d) try {
			l.fs.writeSync(d, a, 0, a.length, 0);
		} finally {
			l.fs.closeSync(d);
		}
		return l.fs.chmodSync(t, c || 438), !0;
	}, p.prototype.writeFileToAsync = function(t, a, o, c, l) {
		typeof c == "function" && (l = c, c = void 0);
		let u = this;
		u.fs.exists(t, function(d) {
			if (d && !o) return l(!1);
			u.fs.stat(t, function(o, f) {
				if (d && f.isDirectory()) return l(!1);
				var p = s.dirname(t);
				u.fs.exists(p, function(o) {
					o || u.makeDir(p), u.fs.open(t, "w", 438, function(o, s) {
						o ? u.fs.chmod(t, 438, function() {
							u.fs.open(t, "w", 438, function(o, s) {
								u.fs.write(s, a, 0, a.length, 0, function() {
									u.fs.close(s, function() {
										u.fs.chmod(t, c || 438, function() {
											l(!0);
										});
									});
								});
							});
						}) : s ? u.fs.write(s, a, 0, a.length, 0, function() {
							u.fs.close(s, function() {
								u.fs.chmod(t, c || 438, function() {
									l(!0);
								});
							});
						}) : u.fs.chmod(t, c || 438, function() {
							l(!0);
						});
					});
				});
			});
		});
	}, p.prototype.findFiles = function(t) {
		let a = this;
		function o(t, c, l) {
			typeof c == "boolean" && (l = c, c = void 0);
			let u = [];
			return a.fs.readdirSync(t).forEach(function(d) {
				let f = s.join(t, d), p = a.fs.statSync(f);
				(!c || c.test(f)) && u.push(s.normalize(f) + (p.isDirectory() ? a.sep : "")), p.isDirectory() && l && (u = u.concat(o(f, c, l)));
			}), u;
		}
		return o(t, void 0, !0);
	}, p.prototype.findFilesAsync = function(t, a) {
		let o = this, c = [];
		o.fs.readdir(t, function(l, u) {
			if (l) return a(l);
			let d = u.length;
			if (!d) return a(null, c);
			u.forEach(function(l) {
				l = s.join(t, l), o.fs.stat(l, function(t, u) {
					if (t) return a(t);
					u && (c.push(s.normalize(l) + (u.isDirectory() ? o.sep : "")), u.isDirectory() ? o.findFilesAsync(l, function(t, o) {
						if (t) return a(t);
						c = c.concat(o), --d || a(null, c);
					}) : --d || a(null, c));
				});
			});
		});
	}, p.prototype.getAttributes = function() {}, p.prototype.setAttributes = function() {}, p.crc32update = function(t, a) {
		return f[(t ^ a) & 255] ^ t >>> 8;
	}, p.crc32 = function(t) {
		typeof t == "string" && (t = Buffer.from(t, "utf8"));
		let a = t.length, o = -1;
		for (let s = 0; s < a;) o = p.crc32update(o, t[s++]);
		return ~o >>> 0;
	}, p.methodToString = function(t) {
		switch (t) {
			case c.STORED: return "STORED (" + t + ")";
			case c.DEFLATED: return "DEFLATED (" + t + ")";
			default: return "UNSUPPORTED (" + t + ")";
		}
	}, p.canonical = function(t) {
		if (!t) return "";
		let a = s.posix.normalize("/" + t.split("\\").join("/"));
		return s.join(".", a);
	}, p.zipnamefix = function(t) {
		if (!t) return "";
		let a = s.posix.normalize("/" + t.split("\\").join("/"));
		return s.posix.join(".", a);
	}, p.findLast = function(t, a) {
		if (!Array.isArray(t)) throw TypeError("arr is not array");
		let o = t.length >>> 0;
		for (let s = o - 1; s >= 0; s--) if (a(t[s], s, t)) return t[s];
	}, p.sanitize = function(t, a) {
		t = s.resolve(s.normalize(t));
		for (var o = a.split("/"), c = 0, l = o.length; c < l; c++) {
			var u = s.normalize(s.join(t, o.slice(c, l).join(s.sep)));
			if (u.indexOf(t) === 0) return u;
		}
		return s.normalize(s.join(t, s.basename(a)));
	}, p.toBuffer = function(t, a) {
		return Buffer.isBuffer(t) ? t : t instanceof Uint8Array ? Buffer.from(t) : typeof t == "string" ? a(t) : Buffer.alloc(0);
	}, p.readBigUInt64LE = function(t, a) {
		var o = Buffer.from(t.slice(a, a + 8));
		return o.swap64(), parseInt(`0x${o.toString("hex")}`);
	}, p.fromDOS2Date = function(t) {
		return new Date((t >> 25 & 127) + 1980, Math.max((t >> 21 & 15) - 1, 0), Math.max(t >> 16 & 31, 1), t >> 11 & 31, t >> 5 & 63, (t & 31) << 1);
	}, p.fromDate2DOS = function(t) {
		let a = 0, o = 0;
		return t.getFullYear() > 1979 && (a = (t.getFullYear() - 1980 & 127) << 9 | t.getMonth() + 1 << 5 | t.getDate(), o = t.getHours() << 11 | t.getMinutes() << 5 | t.getSeconds() >> 1), a << 16 | o;
	}, p.isWin = u, p.crcTable = f;
})), require_fattr = /* @__PURE__ */ __commonJSMin(((t, a) => {
	var o = __require("path");
	a.exports = function(t, { fs: a }) {
		var s = t || "", c = u(), l = null;
		function u() {
			return {
				directory: !1,
				readonly: !1,
				hidden: !1,
				executable: !1,
				mtime: 0,
				atime: 0
			};
		}
		return s && a.existsSync(s) ? (l = a.statSync(s), c.directory = l.isDirectory(), c.mtime = l.mtime, c.atime = l.atime, c.executable = (73 & l.mode) != 0, c.readonly = (128 & l.mode) == 0, c.hidden = o.basename(s)[0] === ".") : console.warn("Invalid path: " + s), {
			get directory() {
				return c.directory;
			},
			get readOnly() {
				return c.readonly;
			},
			get hidden() {
				return c.hidden;
			},
			get mtime() {
				return c.mtime;
			},
			get atime() {
				return c.atime;
			},
			get executable() {
				return c.executable;
			},
			decodeAttributes: function() {},
			encodeAttributes: function() {},
			toJSON: function() {
				return {
					path: s,
					isDirectory: c.directory,
					isReadOnly: c.readonly,
					isHidden: c.hidden,
					isExecutable: c.executable,
					mTime: c.mtime,
					aTime: c.atime
				};
			},
			toString: function() {
				return JSON.stringify(this.toJSON(), null, "	");
			}
		};
	};
})), require_decoder = /* @__PURE__ */ __commonJSMin(((t, a) => {
	a.exports = {
		efs: !0,
		encode: (t) => Buffer.from(t, "utf8"),
		decode: (t) => t.toString("utf8")
	};
})), require_util = /* @__PURE__ */ __commonJSMin(((t, a) => {
	a.exports = require_utils$2(), a.exports.Constants = require_constants(), a.exports.Errors = require_errors(), a.exports.FileAttr = require_fattr(), a.exports.decoder = require_decoder();
})), require_entryHeader = /* @__PURE__ */ __commonJSMin(((t, a) => {
	var o = require_util(), s = o.Constants;
	a.exports = function() {
		var t = 20, a = 10, c = 0, l = 0, u = 0, d = 0, f = 0, p = 0, m = 0, h = 0, g = 0, _ = 0, v = 0, y = 0, b = 0;
		t |= o.isWin ? 2560 : 768, c |= s.FLG_EFS;
		let x = { extraLen: 0 }, S = (t) => Math.max(0, t) >>> 0, C = (t) => Math.max(0, t) & 255;
		return u = o.fromDate2DOS(/* @__PURE__ */ new Date()), {
			get made() {
				return t;
			},
			set made(a) {
				t = a;
			},
			get version() {
				return a;
			},
			set version(t) {
				a = t;
			},
			get flags() {
				return c;
			},
			set flags(t) {
				c = t;
			},
			get flags_efs() {
				return (c & s.FLG_EFS) > 0;
			},
			set flags_efs(t) {
				t ? c |= s.FLG_EFS : c &= ~s.FLG_EFS;
			},
			get flags_desc() {
				return (c & s.FLG_DESC) > 0;
			},
			set flags_desc(t) {
				t ? c |= s.FLG_DESC : c &= ~s.FLG_DESC;
			},
			get method() {
				return l;
			},
			set method(t) {
				switch (t) {
					case s.STORED: this.version = 10;
					case s.DEFLATED:
					default: this.version = 20;
				}
				l = t;
			},
			get time() {
				return o.fromDOS2Date(this.timeval);
			},
			set time(t) {
				this.timeval = o.fromDate2DOS(t);
			},
			get timeval() {
				return u;
			},
			set timeval(t) {
				u = S(t);
			},
			get timeHighByte() {
				return C(u >>> 8);
			},
			get crc() {
				return d;
			},
			set crc(t) {
				d = S(t);
			},
			get compressedSize() {
				return f;
			},
			set compressedSize(t) {
				f = S(t);
			},
			get size() {
				return p;
			},
			set size(t) {
				p = S(t);
			},
			get fileNameLength() {
				return m;
			},
			set fileNameLength(t) {
				m = t;
			},
			get extraLength() {
				return h;
			},
			set extraLength(t) {
				h = t;
			},
			get extraLocalLength() {
				return x.extraLen;
			},
			set extraLocalLength(t) {
				x.extraLen = t;
			},
			get commentLength() {
				return g;
			},
			set commentLength(t) {
				g = t;
			},
			get diskNumStart() {
				return _;
			},
			set diskNumStart(t) {
				_ = S(t);
			},
			get inAttr() {
				return v;
			},
			set inAttr(t) {
				v = S(t);
			},
			get attr() {
				return y;
			},
			set attr(t) {
				y = S(t);
			},
			get fileAttr() {
				return (y || 0) >> 16 & 4095;
			},
			get offset() {
				return b;
			},
			set offset(t) {
				b = S(t);
			},
			get encrypted() {
				return (c & s.FLG_ENC) === s.FLG_ENC;
			},
			get centralHeaderSize() {
				return s.CENHDR + m + h + g;
			},
			get realDataOffset() {
				return b + s.LOCHDR + x.fnameLen + x.extraLen;
			},
			get localHeader() {
				return x;
			},
			loadLocalHeaderFromBinary: function(t) {
				var a = t.slice(b, b + s.LOCHDR);
				if (a.readUInt32LE(0) !== s.LOCSIG) throw o.Errors.INVALID_LOC();
				x.version = a.readUInt16LE(s.LOCVER), x.flags = a.readUInt16LE(s.LOCFLG), x.method = a.readUInt16LE(s.LOCHOW), x.time = a.readUInt32LE(s.LOCTIM), x.crc = a.readUInt32LE(s.LOCCRC), x.compressedSize = a.readUInt32LE(s.LOCSIZ), x.size = a.readUInt32LE(s.LOCLEN), x.fnameLen = a.readUInt16LE(s.LOCNAM), x.extraLen = a.readUInt16LE(s.LOCEXT);
				let c = b + s.LOCHDR + x.fnameLen, l = c + x.extraLen;
				return t.slice(c, l);
			},
			loadFromBinary: function(x) {
				if (x.length !== s.CENHDR || x.readUInt32LE(0) !== s.CENSIG) throw o.Errors.INVALID_CEN();
				t = x.readUInt16LE(s.CENVEM), a = x.readUInt16LE(s.CENVER), c = x.readUInt16LE(s.CENFLG), l = x.readUInt16LE(s.CENHOW), u = x.readUInt32LE(s.CENTIM), d = x.readUInt32LE(s.CENCRC), f = x.readUInt32LE(s.CENSIZ), p = x.readUInt32LE(s.CENLEN), m = x.readUInt16LE(s.CENNAM), h = x.readUInt16LE(s.CENEXT), g = x.readUInt16LE(s.CENCOM), _ = x.readUInt16LE(s.CENDSK), v = x.readUInt16LE(s.CENATT), y = x.readUInt32LE(s.CENATX), b = x.readUInt32LE(s.CENOFF);
			},
			localHeaderToBinary: function() {
				var t = Buffer.alloc(s.LOCHDR);
				return t.writeUInt32LE(s.LOCSIG, 0), t.writeUInt16LE(a, s.LOCVER), t.writeUInt16LE(c, s.LOCFLG), t.writeUInt16LE(l, s.LOCHOW), t.writeUInt32LE(u, s.LOCTIM), t.writeUInt32LE(d, s.LOCCRC), t.writeUInt32LE(f, s.LOCSIZ), t.writeUInt32LE(p, s.LOCLEN), t.writeUInt16LE(m, s.LOCNAM), t.writeUInt16LE(x.extraLen, s.LOCEXT), t;
			},
			centralHeaderToBinary: function() {
				var o = Buffer.alloc(s.CENHDR + m + h + g);
				return o.writeUInt32LE(s.CENSIG, 0), o.writeUInt16LE(t, s.CENVEM), o.writeUInt16LE(a, s.CENVER), o.writeUInt16LE(c, s.CENFLG), o.writeUInt16LE(l, s.CENHOW), o.writeUInt32LE(u, s.CENTIM), o.writeUInt32LE(d, s.CENCRC), o.writeUInt32LE(f, s.CENSIZ), o.writeUInt32LE(p, s.CENLEN), o.writeUInt16LE(m, s.CENNAM), o.writeUInt16LE(h, s.CENEXT), o.writeUInt16LE(g, s.CENCOM), o.writeUInt16LE(_, s.CENDSK), o.writeUInt16LE(v, s.CENATT), o.writeUInt32LE(y, s.CENATX), o.writeUInt32LE(b, s.CENOFF), o;
			},
			toJSON: function() {
				let u = function(t) {
					return t + " bytes";
				};
				return {
					made: t,
					version: a,
					flags: c,
					method: o.methodToString(l),
					time: this.time,
					crc: "0x" + d.toString(16).toUpperCase(),
					compressedSize: u(f),
					size: u(p),
					fileNameLength: u(m),
					extraLength: u(h),
					commentLength: u(g),
					diskNumStart: _,
					inAttr: v,
					attr: y,
					offset: b,
					centralHeaderSize: u(s.CENHDR + m + h + g)
				};
			},
			toString: function() {
				return JSON.stringify(this.toJSON(), null, "	");
			}
		};
	};
})), require_mainHeader = /* @__PURE__ */ __commonJSMin(((t, a) => {
	var o = require_util(), s = o.Constants;
	a.exports = function() {
		var t = 0, a = 0, c = 0, l = 0, u = 0;
		return {
			get diskEntries() {
				return t;
			},
			set diskEntries(o) {
				t = a = o;
			},
			get totalEntries() {
				return a;
			},
			set totalEntries(o) {
				a = t = o;
			},
			get size() {
				return c;
			},
			set size(t) {
				c = t;
			},
			get offset() {
				return l;
			},
			set offset(t) {
				l = t;
			},
			get commentLength() {
				return u;
			},
			set commentLength(t) {
				u = t;
			},
			get mainHeaderSize() {
				return s.ENDHDR + u;
			},
			loadFromBinary: function(d) {
				if ((d.length !== s.ENDHDR || d.readUInt32LE(0) !== s.ENDSIG) && (d.length < s.ZIP64HDR || d.readUInt32LE(0) !== s.ZIP64SIG)) throw o.Errors.INVALID_END();
				d.readUInt32LE(0) === s.ENDSIG ? (t = d.readUInt16LE(s.ENDSUB), a = d.readUInt16LE(s.ENDTOT), c = d.readUInt32LE(s.ENDSIZ), l = d.readUInt32LE(s.ENDOFF), u = d.readUInt16LE(s.ENDCOM)) : (t = o.readBigUInt64LE(d, s.ZIP64SUB), a = o.readBigUInt64LE(d, s.ZIP64TOT), c = o.readBigUInt64LE(d, s.ZIP64SIZE), l = o.readBigUInt64LE(d, s.ZIP64OFF), u = 0);
			},
			toBinary: function() {
				var o = Buffer.alloc(s.ENDHDR + u);
				return o.writeUInt32LE(s.ENDSIG, 0), o.writeUInt32LE(0, 4), o.writeUInt16LE(t, s.ENDSUB), o.writeUInt16LE(a, s.ENDTOT), o.writeUInt32LE(c, s.ENDSIZ), o.writeUInt32LE(l, s.ENDOFF), o.writeUInt16LE(u, s.ENDCOM), o.fill(" ", s.ENDHDR), o;
			},
			toJSON: function() {
				return {
					diskEntries: t,
					totalEntries: a,
					size: c + " bytes",
					offset: function(t, a) {
						let o = t.toString(16).toUpperCase();
						for (; o.length < a;) o = "0" + o;
						return "0x" + o;
					}(l, 4),
					commentLength: u
				};
			},
			toString: function() {
				return JSON.stringify(this.toJSON(), null, "	");
			}
		};
	};
})), require_headers = /* @__PURE__ */ __commonJSMin(((t) => {
	t.EntryHeader = require_entryHeader(), t.MainHeader = require_mainHeader();
})), require_deflater = /* @__PURE__ */ __commonJSMin(((t, a) => {
	a.exports = function(t) {
		var a = __require("zlib"), o = { chunkSize: (parseInt(t.length / 1024) + 1) * 1024 };
		return {
			deflate: function() {
				return a.deflateRawSync(t, o);
			},
			deflateAsync: function(s) {
				var c = a.createDeflateRaw(o), l = [], u = 0;
				c.on("data", function(t) {
					l.push(t), u += t.length;
				}), c.on("end", function() {
					var t = Buffer.alloc(u), a = 0;
					t.fill(0);
					for (var o = 0; o < l.length; o++) {
						var c = l[o];
						c.copy(t, a), a += c.length;
					}
					s && s(t);
				}), c.end(t);
			}
		};
	};
})), require_inflater = /* @__PURE__ */ __commonJSMin(((t, a) => {
	var o = +(process.versions ? process.versions.node : "").split(".")[0] || 0;
	a.exports = function(t, a) {
		var s = __require("zlib");
		let c = o >= 15 && a > 0 ? { maxOutputLength: a } : {};
		return {
			inflate: function() {
				return s.inflateRawSync(t, c);
			},
			inflateAsync: function(a) {
				var o = s.createInflateRaw(c), l = [], u = 0;
				o.on("data", function(t) {
					l.push(t), u += t.length;
				}), o.on("end", function() {
					var t = Buffer.alloc(u), o = 0;
					t.fill(0);
					for (var s = 0; s < l.length; s++) {
						var c = l[s];
						c.copy(t, o), o += c.length;
					}
					a && a(t);
				}), o.end(t);
			}
		};
	};
})), require_zipcrypto = /* @__PURE__ */ __commonJSMin(((t, a) => {
	var { randomFillSync: o } = __require("crypto"), s = require_errors(), c = new Uint32Array(256).map((t, a) => {
		for (let t = 0; t < 8; t++) a & 1 ? a = a >>> 1 ^ 3988292384 : a >>>= 1;
		return a >>> 0;
	}), l = (t, a) => Math.imul(t, a) >>> 0, u = (t, a) => c[(t ^ a) & 255] ^ t >>> 8, d = () => typeof o == "function" ? o(Buffer.alloc(12)) : d.node();
	d.node = () => {
		let t = Buffer.alloc(12), a = t.length;
		for (let o = 0; o < a; o++) t[o] = Math.random() * 256 & 255;
		return t;
	};
	var f = { genSalt: d };
	function p(t) {
		let a = Buffer.isBuffer(t) ? t : Buffer.from(t);
		this.keys = new Uint32Array([
			305419896,
			591751049,
			878082192
		]);
		for (let t = 0; t < a.length; t++) this.updateKeys(a[t]);
	}
	p.prototype.updateKeys = function(t) {
		let a = this.keys;
		return a[0] = u(a[0], t), a[1] += a[0] & 255, a[1] = l(a[1], 134775813) + 1, a[2] = u(a[2], a[1] >>> 24), t;
	}, p.prototype.next = function() {
		let t = (this.keys[2] | 2) >>> 0;
		return l(t, t ^ 1) >> 8 & 255;
	};
	function m(t) {
		let a = new p(t);
		return function(t) {
			let o = Buffer.alloc(t.length), s = 0;
			for (let c of t) o[s++] = a.updateKeys(c ^ a.next());
			return o;
		};
	}
	function h(t) {
		let a = new p(t);
		return function(t, o, s = 0) {
			o ||= Buffer.alloc(t.length);
			for (let c of t) {
				let t = a.next();
				o[s++] = c ^ t, a.updateKeys(c);
			}
			return o;
		};
	}
	function g(t, a, o) {
		if (!t || !Buffer.isBuffer(t) || t.length < 12) return Buffer.alloc(0);
		let c = m(o), l = c(t.slice(0, 12)), u = (a.flags & 8) == 8 ? a.timeHighByte : a.crc >>> 24;
		if (l[11] !== u) throw s.WRONG_PASSWORD();
		return c(t.slice(12));
	}
	function _(t) {
		Buffer.isBuffer(t) && t.length >= 12 ? f.genSalt = function() {
			return t.slice(0, 12);
		} : t === "node" ? f.genSalt = d.node : f.genSalt = d;
	}
	function v(t, a, o, s = !1) {
		t ??= Buffer.alloc(0), Buffer.isBuffer(t) || (t = Buffer.from(t.toString()));
		let c = h(o), l = f.genSalt();
		l[11] = a.crc >>> 24 & 255, s && (l[10] = a.crc >>> 16 & 255);
		let u = Buffer.alloc(t.length + 12);
		return c(l, u), c(t, u, 12);
	}
	a.exports = {
		decrypt: g,
		encrypt: v,
		_salter: _
	};
})), require_methods = /* @__PURE__ */ __commonJSMin(((t) => {
	t.Deflater = require_deflater(), t.Inflater = require_inflater(), t.ZipCrypto = require_zipcrypto();
})), require_zipEntry = /* @__PURE__ */ __commonJSMin(((t, a) => {
	var o = require_util(), s = require_headers(), c = o.Constants, l = require_methods();
	a.exports = function(t, a) {
		var u = new s.EntryHeader(), d = Buffer.alloc(0), f = Buffer.alloc(0), p = !1, m = null, h = Buffer.alloc(0), g = Buffer.alloc(0), _ = !0;
		let v = t, y = typeof v.decoder == "object" ? v.decoder : o.decoder;
		_ = y.hasOwnProperty("efs") ? y.efs : !1;
		function b() {
			return !a || !(a instanceof Uint8Array) ? Buffer.alloc(0) : (g = u.loadLocalHeaderFromBinary(a), a.slice(u.realDataOffset, u.realDataOffset + u.compressedSize));
		}
		function x(t) {
			if (u.flags_desc) {
				let s = {}, l = u.realDataOffset + u.compressedSize;
				if (a.readUInt32LE(l) == c.LOCSIG || a.readUInt32LE(l) == c.CENSIG) throw o.Errors.DESCRIPTOR_NOT_EXIST();
				if (a.readUInt32LE(l) == c.EXTSIG) s.crc = a.readUInt32LE(l + c.EXTCRC), s.compressedSize = a.readUInt32LE(l + c.EXTSIZ), s.size = a.readUInt32LE(l + c.EXTLEN);
				else if (a.readUInt16LE(l + 12) === 19280) s.crc = a.readUInt32LE(l + c.EXTCRC - 4), s.compressedSize = a.readUInt32LE(l + c.EXTSIZ - 4), s.size = a.readUInt32LE(l + c.EXTLEN - 4);
				else throw o.Errors.DESCRIPTOR_UNKNOWN();
				if (s.compressedSize !== u.compressedSize || s.size !== u.size || s.crc !== u.crc) throw o.Errors.DESCRIPTOR_FAULTY();
				if (o.crc32(t) !== s.crc) return !1;
			} else if (o.crc32(t) !== u.localHeader.crc) return !1;
			return !0;
		}
		function S(t, a, s) {
			if (a === void 0 && typeof t == "string" && (s = t, t = void 0), p) return t && a && a(Buffer.alloc(0), o.Errors.DIRECTORY_CONTENT_ERROR()), Buffer.alloc(0);
			var c = b();
			if (c.length === 0) return t && a && a(c), c;
			if (u.encrypted) {
				if (typeof s != "string" && !Buffer.isBuffer(s)) throw o.Errors.INVALID_PASS_PARAM();
				c = l.ZipCrypto.decrypt(c, u, s);
			}
			var f = Buffer.alloc(u.size);
			switch (u.method) {
				case o.Constants.STORED:
					if (c.copy(f), x(f)) return t && a && a(f), f;
					throw t && a && a(f, o.Errors.BAD_CRC()), o.Errors.BAD_CRC();
				case o.Constants.DEFLATED:
					var m = new l.Inflater(c, u.size);
					if (t) m.inflateAsync(function(t) {
						t.copy(t, 0), a && (x(t) ? a(t) : a(t, o.Errors.BAD_CRC()));
					});
					else {
						if (m.inflate(f).copy(f, 0), !x(f)) throw o.Errors.BAD_CRC(`"${y.decode(d)}"`);
						return f;
					}
					break;
				default: throw t && a && a(Buffer.alloc(0), o.Errors.UNKNOWN_METHOD()), o.Errors.UNKNOWN_METHOD();
			}
		}
		function C(t, s) {
			if ((!m || !m.length) && Buffer.isBuffer(a)) return t && s && s(b()), b();
			if (m.length && !p) {
				var c;
				switch (u.method) {
					case o.Constants.STORED: return u.compressedSize = u.size, c = Buffer.alloc(m.length), m.copy(c), t && s && s(c), c;
					default:
					case o.Constants.DEFLATED:
						var d = new l.Deflater(m);
						if (t) d.deflateAsync(function(t) {
							c = Buffer.alloc(t.length), u.compressedSize = t.length, t.copy(c), s && s(c);
						});
						else {
							var f = d.deflate();
							return u.compressedSize = f.length, f;
						}
						d = null;
						break;
				}
			} else if (t && s) s(Buffer.alloc(0));
			else return Buffer.alloc(0);
		}
		function w(t, a) {
			return (t.readUInt32LE(a + 4) << 4) + t.readUInt32LE(a);
		}
		function T(t) {
			try {
				for (var a = 0, s, l, u; a + 4 < t.length;) s = t.readUInt16LE(a), a += 2, l = t.readUInt16LE(a), a += 2, u = t.slice(a, a + l), a += l, c.ID_ZIP64 === s && E(u);
			} catch {
				throw o.Errors.EXTRA_FIELD_PARSE_ERROR();
			}
		}
		function E(t) {
			var a, o, s, l;
			t.length >= c.EF_ZIP64_SCOMP && (a = w(t, c.EF_ZIP64_SUNCOMP), u.size === c.EF_ZIP64_OR_32 && (u.size = a)), t.length >= c.EF_ZIP64_RHO && (o = w(t, c.EF_ZIP64_SCOMP), u.compressedSize === c.EF_ZIP64_OR_32 && (u.compressedSize = o)), t.length >= c.EF_ZIP64_DSN && (s = w(t, c.EF_ZIP64_RHO), u.offset === c.EF_ZIP64_OR_32 && (u.offset = s)), t.length >= c.EF_ZIP64_DSN + 4 && (l = t.readUInt32LE(c.EF_ZIP64_DSN), u.diskNumStart === c.EF_ZIP64_OR_16 && (u.diskNumStart = l));
		}
		return {
			get entryName() {
				return y.decode(d);
			},
			get rawEntryName() {
				return d;
			},
			set entryName(t) {
				d = o.toBuffer(t, y.encode);
				var a = d[d.length - 1];
				p = a === 47 || a === 92, u.fileNameLength = d.length;
			},
			get efs() {
				return typeof _ == "function" ? _(this.entryName) : _;
			},
			get extra() {
				return h;
			},
			set extra(t) {
				h = t, u.extraLength = t.length, T(t);
			},
			get comment() {
				return y.decode(f);
			},
			set comment(t) {
				if (f = o.toBuffer(t, y.encode), u.commentLength = f.length, f.length > 65535) throw o.Errors.COMMENT_TOO_LONG();
			},
			get name() {
				var t = y.decode(d);
				return p ? t.substr(t.length - 1).split("/").pop() : t.split("/").pop();
			},
			get isDirectory() {
				return p;
			},
			getCompressedData: function() {
				return C(!1, null);
			},
			getCompressedDataAsync: function(t) {
				C(!0, t);
			},
			setData: function(t) {
				m = o.toBuffer(t, o.decoder.encode), !p && m.length ? (u.size = m.length, u.method = o.Constants.DEFLATED, u.crc = o.crc32(t), u.changed = !0) : u.method = o.Constants.STORED;
			},
			getData: function(t) {
				return u.changed ? m : S(!1, null, t);
			},
			getDataAsync: function(t, a) {
				u.changed ? t(m) : S(!0, t, a);
			},
			set attr(t) {
				u.attr = t;
			},
			get attr() {
				return u.attr;
			},
			set header(t) {
				u.loadFromBinary(t);
			},
			get header() {
				return u;
			},
			packCentralHeader: function() {
				u.flags_efs = this.efs, u.extraLength = h.length;
				var t = u.centralHeaderToBinary(), a = o.Constants.CENHDR;
				return d.copy(t, a), a += d.length, h.copy(t, a), a += u.extraLength, f.copy(t, a), t;
			},
			packLocalHeader: function() {
				let t = 0;
				u.flags_efs = this.efs, u.extraLocalLength = g.length;
				let a = u.localHeaderToBinary(), o = Buffer.alloc(a.length + d.length + u.extraLocalLength);
				return a.copy(o, t), t += a.length, d.copy(o, t), t += d.length, g.copy(o, t), t += g.length, o;
			},
			toJSON: function() {
				let t = function(t) {
					return "<" + (t && t.length + " bytes buffer" || "null") + ">";
				};
				return {
					entryName: this.entryName,
					name: this.name,
					comment: this.comment,
					isDirectory: this.isDirectory,
					header: u.toJSON(),
					compressedData: t(a),
					data: t(m)
				};
			},
			toString: function() {
				return JSON.stringify(this.toJSON(), null, "	");
			}
		};
	};
})), require_zipFile = /* @__PURE__ */ __commonJSMin(((t, a) => {
	var o = require_zipEntry(), s = require_headers(), c = require_util();
	a.exports = function(t, a) {
		var l = [], u = {}, d = Buffer.alloc(0), f = new s.MainHeader(), p = !1;
		let m = /* @__PURE__ */ new Set(), h = a, { noSort: g, decoder: _ } = h;
		t ? b(h.readEntries) : p = !0;
		function v() {
			let t = /* @__PURE__ */ new Set();
			for (let a of Object.keys(u)) {
				let o = a.split("/");
				if (o.pop(), o.length) for (let a = 0; a < o.length; a++) {
					let s = o.slice(0, a + 1).join("/") + "/";
					t.add(s);
				}
			}
			for (let a of t) if (!(a in u)) {
				let t = new o(h);
				t.entryName = a, t.attr = 16, t.temporary = !0, l.push(t), u[t.entryName] = t, m.add(t);
			}
		}
		function y() {
			if (p = !0, u = {}, f.diskEntries > (t.length - f.offset) / c.Constants.CENHDR) throw c.Errors.DISK_ENTRY_TOO_LARGE();
			l = Array(f.diskEntries);
			for (var a = f.offset, s = 0; s < l.length; s++) {
				var d = a, g = new o(h, t);
				g.header = t.slice(d, d += c.Constants.CENHDR), g.entryName = t.slice(d, d += g.header.fileNameLength), g.header.extraLength && (g.extra = t.slice(d, d += g.header.extraLength)), g.header.commentLength && (g.comment = t.slice(d, d + g.header.commentLength)), a += g.header.centralHeaderSize, l[s] = g, u[g.entryName] = g;
			}
			m.clear(), v();
		}
		function b(a) {
			var o = t.length - c.Constants.ENDHDR, s = Math.max(0, o - 65535), l = s, u = t.length, p = -1, m = 0;
			for (typeof h.trailingSpace == "boolean" && h.trailingSpace && (s = 0); o >= l; o--) if (t[o] === 80) {
				if (t.readUInt32LE(o) === c.Constants.ENDSIG) {
					p = o, m = o, u = o + c.Constants.ENDHDR, l = o - c.Constants.END64HDR;
					continue;
				}
				if (t.readUInt32LE(o) === c.Constants.END64SIG) {
					l = s;
					continue;
				}
				if (t.readUInt32LE(o) === c.Constants.ZIP64SIG) {
					p = o, u = o + c.readBigUInt64LE(t, o + c.Constants.ZIP64SIZE) + c.Constants.ZIP64LEAD;
					break;
				}
			}
			if (p == -1) throw c.Errors.INVALID_FORMAT();
			f.loadFromBinary(t.slice(p, u)), f.commentLength && (d = t.slice(m + c.Constants.ENDHDR)), a && y();
		}
		function x() {
			l.length > 1 && !g && l.sort((t, a) => t.entryName.toLowerCase().localeCompare(a.entryName.toLowerCase()));
		}
		return {
			get entries() {
				return p || y(), l.filter((t) => !m.has(t));
			},
			get comment() {
				return _.decode(d);
			},
			set comment(t) {
				d = c.toBuffer(t, _.encode), f.commentLength = d.length;
			},
			getEntryCount: function() {
				return p ? l.length : f.diskEntries;
			},
			forEach: function(t) {
				this.entries.forEach(t);
			},
			getEntry: function(t) {
				return p || y(), u[t] || null;
			},
			setEntry: function(t) {
				p || y(), l.push(t), u[t.entryName] = t, f.totalEntries = l.length;
			},
			deleteFile: function(t, a = !0) {
				p || y();
				let o = u[t];
				this.getEntryChildren(o, a).map((t) => t.entryName).forEach(this.deleteEntry);
			},
			deleteEntry: function(t) {
				p || y();
				let a = u[t], o = l.indexOf(a);
				o >= 0 && (l.splice(o, 1), delete u[t], f.totalEntries = l.length);
			},
			getEntryChildren: function(t, a = !0) {
				if (p || y(), typeof t == "object") if (t.isDirectory && a) {
					let a = [], o = t.entryName;
					for (let t of l) t.entryName.startsWith(o) && a.push(t);
					return a;
				} else return [t];
				return [];
			},
			getChildCount: function(t) {
				if (t && t.isDirectory) {
					let a = this.getEntryChildren(t);
					return a.includes(t) ? a.length - 1 : a.length;
				}
				return 0;
			},
			compressToBuffer: function() {
				p || y(), x();
				let a = [], o = [], s = 0, l = 0;
				f.size = 0, f.offset = 0;
				let u = 0;
				for (let t of this.entries) {
					let c = t.getCompressedData();
					t.header.offset = l;
					let d = t.packLocalHeader(), p = d.length + c.length;
					l += p, a.push(d), a.push(c);
					let m = t.packCentralHeader();
					o.push(m), f.size += m.length, s += p + m.length, u++;
				}
				s += f.mainHeaderSize, f.offset = l, f.totalEntries = u, l = 0;
				let m = Buffer.alloc(s);
				for (let t of a) t.copy(m, l), l += t.length;
				for (let t of o) t.copy(m, l), l += t.length;
				let h = f.toBinary();
				return d && d.copy(h, c.Constants.ENDHDR), h.copy(m, l), t = m, p = !1, m;
			},
			toAsyncBuffer: function(a, o, s, l) {
				try {
					p || y(), x();
					let o = [], u = [], m = 0, h = 0, g = 0;
					f.size = 0, f.offset = 0;
					let _ = function(v) {
						if (v.length > 0) {
							let t = v.shift(), a = t.entryName + t.extra.toString();
							s && s(a), t.getCompressedDataAsync(function(s) {
								l && l(a), t.header.offset = h;
								let c = t.packLocalHeader(), d = c.length + s.length;
								h += d, o.push(c), o.push(s);
								let p = t.packCentralHeader();
								u.push(p), f.size += p.length, m += d + p.length, g++, _(v);
							});
						} else {
							m += f.mainHeaderSize, f.offset = h, f.totalEntries = g, h = 0;
							let s = Buffer.alloc(m);
							o.forEach(function(t) {
								t.copy(s, h), h += t.length;
							}), u.forEach(function(t) {
								t.copy(s, h), h += t.length;
							});
							let l = f.toBinary();
							d && d.copy(l, c.Constants.ENDHDR), l.copy(s, h), t = s, p = !1, a(s);
						}
					};
					_(Array.from(this.entries));
				} catch (t) {
					o(t);
				}
			}
		};
	};
})), require_adm_zip = /* @__PURE__ */ __commonJSMin(((t, a) => {
	var o = require_util(), s = __require("path"), c = require_zipEntry(), l = require_zipFile(), u = (...t) => o.findLast(t, (t) => typeof t == "boolean"), d = (...t) => o.findLast(t, (t) => typeof t == "string"), f = (...t) => o.findLast(t, (t) => typeof t == "function"), p = {
		noSort: !1,
		readEntries: !1,
		method: o.Constants.NONE,
		fs: null
	};
	a.exports = function(t, a) {
		let m = null, h = Object.assign(Object.create(null), p);
		t && typeof t == "object" && (t instanceof Uint8Array || (Object.assign(h, t), t = h.input ? h.input : void 0, h.input && delete h.input), Buffer.isBuffer(t) && (m = t, h.method = o.Constants.BUFFER, t = void 0)), Object.assign(h, a);
		let g = new o(h);
		if ((typeof h.decoder != "object" || typeof h.decoder.encode != "function" || typeof h.decoder.decode != "function") && (h.decoder = o.decoder), t && typeof t == "string") if (g.fs.existsSync(t)) h.method = o.Constants.FILE, h.filename = t, m = g.fs.readFileSync(t);
		else throw o.Errors.INVALID_FILENAME();
		let _ = new l(m, h), { canonical: v, sanitize: y, zipnamefix: b } = o;
		function x(t) {
			if (t && _) {
				var a;
				if (typeof t == "string" && (a = _.getEntry(s.posix.normalize(t))), typeof t == "object" && t.entryName !== void 0 && t.header !== void 0 && (a = _.getEntry(t.entryName)), a) return a;
			}
			return null;
		}
		function S(t) {
			let { join: a, normalize: o, sep: c } = s.posix;
			return a(".", o(c + t.split("\\").join(c) + c));
		}
		function C(t) {
			return t instanceof RegExp ? (function(t) {
				return function(a) {
					return t.test(a);
				};
			})(t) : typeof t == "function" ? t : () => !0;
		}
		let w = (t, a) => {
			let o = a.slice(-1);
			return o = o === g.sep ? g.sep : "", s.relative(t, a) + o;
		};
		return {
			readFile: function(t, a) {
				var o = x(t);
				return o && o.getData(a) || null;
			},
			childCount: function(t) {
				let a = x(t);
				if (a) return _.getChildCount(a);
			},
			readFileAsync: function(t, a) {
				var o = x(t);
				o ? o.getDataAsync(a) : a(null, "getEntry failed for:" + t);
			},
			readAsText: function(t, a) {
				var o = x(t);
				if (o) {
					var s = o.getData();
					if (s && s.length) return s.toString(a || "utf8");
				}
				return "";
			},
			readAsTextAsync: function(t, a, o) {
				var s = x(t);
				s ? s.getDataAsync(function(t, s) {
					if (s) {
						a(t, s);
						return;
					}
					t && t.length ? a(t.toString(o || "utf8")) : a("");
				}) : a("");
			},
			deleteFile: function(t, a = !0) {
				var o = x(t);
				o && _.deleteFile(o.entryName, a);
			},
			deleteEntry: function(t) {
				var a = x(t);
				a && _.deleteEntry(a.entryName);
			},
			addZipComment: function(t) {
				_.comment = t;
			},
			getZipComment: function() {
				return _.comment || "";
			},
			addZipEntryComment: function(t, a) {
				var o = x(t);
				o && (o.comment = a);
			},
			getZipEntryComment: function(t) {
				var a = x(t);
				return a && a.comment || "";
			},
			updateFile: function(t, a) {
				var o = x(t);
				o && o.setData(a);
			},
			addLocalFile: function(t, a, c, l) {
				if (g.fs.existsSync(t)) {
					a = a ? S(a) : "";
					let o = s.win32.basename(s.win32.normalize(t));
					a += c || o;
					let u = g.fs.statSync(t), d = u.isFile() ? g.fs.readFileSync(t) : Buffer.alloc(0);
					u.isDirectory() && (a += g.sep), this.addFile(a, d, l, u);
				} else throw o.Errors.FILE_NOT_FOUND(t);
			},
			addLocalFileAsync: function(t, a) {
				t = typeof t == "object" ? t : { localPath: t };
				let o = s.resolve(t.localPath), { comment: c } = t, { zipPath: l, zipName: u } = t, d = this;
				g.fs.stat(o, function(t, f) {
					if (t) return a(t, !1);
					l = l ? S(l) : "";
					let p = s.win32.basename(s.win32.normalize(o));
					if (l += u || p, f.isFile()) g.fs.readFile(o, function(t, o) {
						return t ? a(t, !1) : (d.addFile(l, o, c, f), setImmediate(a, void 0, !0));
					});
					else if (f.isDirectory()) return l += g.sep, d.addFile(l, Buffer.alloc(0), c, f), setImmediate(a, void 0, !0);
				});
			},
			addLocalFolder: function(t, a, c) {
				if (c = C(c), a = a ? S(a) : "", t = s.normalize(t), g.fs.existsSync(t)) {
					let o = g.findFiles(t), l = this;
					if (o.length) for (let u of o) {
						let o = s.join(a, w(t, u));
						c(o) && l.addLocalFile(u, s.dirname(o));
					}
				} else throw o.Errors.FILE_NOT_FOUND(t);
			},
			addLocalFolderAsync: function(t, a, c, l) {
				l = C(l), c = c ? S(c) : "", t = s.normalize(t);
				var u = this;
				g.fs.open(t, "r", function(s) {
					if (s && s.code === "ENOENT") a(void 0, o.Errors.FILE_NOT_FOUND(t));
					else if (s) a(void 0, s);
					else {
						var d = g.findFiles(t), f = -1, p = function() {
							if (f += 1, f < d.length) {
								var o = d[f], s = w(t, o).split("\\").join("/");
								s = s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^\x20-\x7E]/g, ""), l(s) ? g.fs.stat(o, function(t, l) {
									t && a(void 0, t), l.isFile() ? g.fs.readFile(o, function(t, o) {
										t ? a(void 0, t) : (u.addFile(c + s, o, "", l), p());
									}) : (u.addFile(c + s + "/", Buffer.alloc(0), "", l), p());
								}) : process.nextTick(() => {
									p();
								});
							} else a(!0, void 0);
						};
						p();
					}
				});
			},
			addLocalFolderAsync2: function(t, a) {
				let c = this;
				t = typeof t == "object" ? t : { localPath: t }, localPath = s.resolve(S(t.localPath));
				let { zipPath: l, filter: u, namefix: d } = t;
				u instanceof RegExp ? u = (function(t) {
					return function(a) {
						return t.test(a);
					};
				})(u) : typeof u != "function" && (u = function() {
					return !0;
				}), l = l ? S(l) : "", d == "latin1" && (d = (t) => t.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^\x20-\x7E]/g, "")), typeof d != "function" && (d = (t) => t);
				let f = (t) => s.join(l, d(w(localPath, t))), p = (t) => s.win32.basename(s.win32.normalize(d(t)));
				g.fs.open(localPath, "r", function(t) {
					t && t.code === "ENOENT" ? a(void 0, o.Errors.FILE_NOT_FOUND(localPath)) : t ? a(void 0, t) : g.findFilesAsync(localPath, function(t, o) {
						if (t) return a(t);
						o = o.filter((t) => u(f(t))), o.length || a(void 0, !1), setImmediate(o.reverse().reduce(function(t, a) {
							return function(o, l) {
								if (o || l === !1) return setImmediate(t, o, !1);
								c.addLocalFileAsync({
									localPath: a,
									zipPath: s.dirname(f(a)),
									zipName: p(a)
								}, t);
							};
						}, a));
					});
				});
			},
			addLocalFolderPromise: function(t, a) {
				return new Promise((o, s) => {
					this.addLocalFolderAsync2(Object.assign({ localPath: t }, a), (t, a) => {
						t && s(t), a && o(this);
					});
				});
			},
			addFile: function(t, a, o, s) {
				t = b(t);
				let l = x(t), u = l != null;
				u || (l = new c(h), l.entryName = t), l.comment = o || "";
				let d = typeof s == "object" && s instanceof g.fs.Stats;
				d && (l.header.time = s.mtime);
				var f = l.isDirectory ? 16 : 0;
				let p = l.isDirectory ? 16384 : 32768;
				return d ? p |= 4095 & s.mode : typeof s == "number" ? p |= 4095 & s : p |= l.isDirectory ? 493 : 420, f = (f | p << 16) >>> 0, l.attr = f, l.setData(a), u || _.setEntry(l), l;
			},
			getEntries: function(t) {
				return _.password = t, _ ? _.entries : [];
			},
			getEntry: function(t) {
				return x(t);
			},
			getEntryCount: function() {
				return _.getEntryCount();
			},
			forEach: function(t) {
				return _.forEach(t);
			},
			extractEntryTo: function(t, a, c, l, f, p) {
				l = u(!1, l), f = u(!1, f), c = u(!0, c), p = d(f, p);
				var m = x(t);
				if (!m) throw o.Errors.NO_ENTRY();
				var h = v(m.entryName), b = y(a, p && !m.isDirectory ? p : c ? h : s.basename(h));
				if (m.isDirectory) return _.getEntryChildren(m).forEach(function(t) {
					if (t.isDirectory) return;
					var u = t.getData();
					if (!u) throw o.Errors.CANT_EXTRACT_FILE();
					var d = v(t.entryName), p = y(a, c ? d : s.basename(d));
					let m = f ? t.header.fileAttr : void 0;
					g.writeFileTo(p, u, l, m);
				}), !0;
				var S = m.getData(_.password);
				if (!S) throw o.Errors.CANT_EXTRACT_FILE();
				if (g.fs.existsSync(b) && !l) throw o.Errors.CANT_OVERRIDE();
				let C = f ? t.header.fileAttr : void 0;
				return g.writeFileTo(b, S, l, C), !0;
			},
			test: function(t) {
				if (!_) return !1;
				for (var a in _.entries) try {
					if (a.isDirectory) continue;
					if (!_.entries[a].getData(t)) return !1;
				} catch {
					return !1;
				}
				return !0;
			},
			extractAllTo: function(t, a, s, c) {
				if (s = u(!1, s), c = d(s, c), a = u(!1, a), !_) throw o.Errors.NO_ZIP();
				_.entries.forEach(function(l) {
					var u = y(t, v(l.entryName));
					if (l.isDirectory) {
						g.makeDir(u);
						return;
					}
					var d = l.getData(c);
					if (!d) throw o.Errors.CANT_EXTRACT_FILE();
					let f = s ? l.header.fileAttr : void 0;
					g.writeFileTo(u, d, a, f);
					try {
						g.fs.utimesSync(u, l.header.time, l.header.time);
					} catch {
						throw o.Errors.CANT_EXTRACT_FILE();
					}
				});
			},
			extractAllToAsync: function(t, a, c, l) {
				if (l = f(a, c, l), c = u(!1, c), a = u(!1, a), !l) return new Promise((o, s) => {
					this.extractAllToAsync(t, a, c, function(t) {
						t ? s(t) : o(this);
					});
				});
				if (!_) {
					l(o.Errors.NO_ZIP());
					return;
				}
				t = s.resolve(t);
				let d = (a) => y(t, s.normalize(v(a.entryName))), p = (t, a) => /* @__PURE__ */ Error(t + ": \"" + a + "\""), m = [], h = [];
				_.entries.forEach((t) => {
					t.isDirectory ? m.push(t) : h.push(t);
				});
				for (let t of m) {
					let a = d(t), o = c ? t.header.fileAttr : void 0;
					try {
						g.makeDir(a), o && g.fs.chmodSync(a, o), g.fs.utimesSync(a, t.header.time, t.header.time);
					} catch {
						l(p("Unable to create folder", a));
					}
				}
				h.reverse().reduce(function(l, u) {
					return function(d) {
						if (d) l(d);
						else {
							let d = s.normalize(v(u.entryName)), f = y(t, d);
							u.getDataAsync(function(t, s) {
								if (s) l(s);
								else if (!t) l(o.Errors.CANT_EXTRACT_FILE());
								else {
									let o = c ? u.header.fileAttr : void 0;
									g.writeFileToAsync(f, t, a, o, function(t) {
										t || l(p("Unable to write file", f)), g.fs.utimes(f, u.header.time, u.header.time, function(t) {
											t ? l(p("Unable to set times", f)) : l();
										});
									});
								}
							});
						}
					};
				}, l)();
			},
			writeZip: function(t, a) {
				if (arguments.length === 1 && typeof t == "function" && (a = t, t = ""), !t && h.filename && (t = h.filename), t) {
					var o = _.compressToBuffer();
					if (o) {
						var s = g.writeFileTo(t, o, !0);
						typeof a == "function" && a(s ? null : /* @__PURE__ */ Error("failed"), "");
					}
				}
			},
			writeZipPromise: function(t, a) {
				let { overwrite: o, perm: s } = Object.assign({ overwrite: !0 }, a);
				return new Promise((a, c) => {
					!t && h.filename && (t = h.filename), t || c("ADM-ZIP: ZIP File Name Missing"), this.toBufferPromise().then((l) => {
						g.writeFileToAsync(t, l, o, s, (t) => t ? a(t) : c("ADM-ZIP: Wasn't able to write zip file"));
					}, c);
				});
			},
			toBufferPromise: function() {
				return new Promise((t, a) => {
					_.toAsyncBuffer(t, a);
				});
			},
			toBuffer: function(t, a, o, s) {
				return typeof t == "function" ? (_.toAsyncBuffer(t, a, o, s), null) : _.compressToBuffer();
			}
		};
	};
})), require_universalify = /* @__PURE__ */ __commonJSMin(((t) => {
	t.fromCallback = function(t) {
		return Object.defineProperty(function(...a) {
			if (typeof a[a.length - 1] == "function") t.apply(this, a);
			else return new Promise((o, s) => {
				a.push((t, a) => t == null ? o(a) : s(t)), t.apply(this, a);
			});
		}, "name", { value: t.name });
	}, t.fromPromise = function(t) {
		return Object.defineProperty(function(...a) {
			let o = a[a.length - 1];
			if (typeof o != "function") return t.apply(this, a);
			a.pop(), t.apply(this, a).then((t) => o(null, t), o);
		}, "name", { value: t.name });
	};
})), require_polyfills = /* @__PURE__ */ __commonJSMin(((t, a) => {
	var o = __require("constants"), s = process.cwd, c = null, l = process.env.GRACEFUL_FS_PLATFORM || process.platform;
	process.cwd = function() {
		return c ||= s.call(process), c;
	};
	try {
		process.cwd();
	} catch {}
	if (typeof process.chdir == "function") {
		var u = process.chdir;
		process.chdir = function(t) {
			c = null, u.call(process, t);
		}, Object.setPrototypeOf && Object.setPrototypeOf(process.chdir, u);
	}
	a.exports = d;
	function d(t) {
		o.hasOwnProperty("O_SYMLINK") && process.version.match(/^v0\.6\.[0-2]|^v0\.5\./) && a(t), t.lutimes || s(t), t.chown = d(t.chown), t.fchown = d(t.fchown), t.lchown = d(t.lchown), t.chmod = c(t.chmod), t.fchmod = c(t.fchmod), t.lchmod = c(t.lchmod), t.chownSync = f(t.chownSync), t.fchownSync = f(t.fchownSync), t.lchownSync = f(t.lchownSync), t.chmodSync = u(t.chmodSync), t.fchmodSync = u(t.fchmodSync), t.lchmodSync = u(t.lchmodSync), t.stat = p(t.stat), t.fstat = p(t.fstat), t.lstat = p(t.lstat), t.statSync = m(t.statSync), t.fstatSync = m(t.fstatSync), t.lstatSync = m(t.lstatSync), t.chmod && !t.lchmod && (t.lchmod = function(t, a, o) {
			o && process.nextTick(o);
		}, t.lchmodSync = function() {}), t.chown && !t.lchown && (t.lchown = function(t, a, o, s) {
			s && process.nextTick(s);
		}, t.lchownSync = function() {}), l === "win32" && (t.rename = typeof t.rename == "function" ? (function(a) {
			function o(o, s, c) {
				var l = Date.now(), u = 0;
				a(o, s, function d(f) {
					if (f && (f.code === "EACCES" || f.code === "EPERM" || f.code === "EBUSY") && Date.now() - l < 6e4) {
						setTimeout(function() {
							t.stat(s, function(t, l) {
								t && t.code === "ENOENT" ? a(o, s, d) : c(f);
							});
						}, u), u < 100 && (u += 10);
						return;
					}
					c && c(f);
				});
			}
			return Object.setPrototypeOf && Object.setPrototypeOf(o, a), o;
		})(t.rename) : t.rename), t.read = typeof t.read == "function" ? (function(a) {
			function o(o, s, c, l, u, d) {
				var f;
				if (d && typeof d == "function") {
					var p = 0;
					f = function(m, h, g) {
						if (m && m.code === "EAGAIN" && p < 10) return p++, a.call(t, o, s, c, l, u, f);
						d.apply(this, arguments);
					};
				}
				return a.call(t, o, s, c, l, u, f);
			}
			return Object.setPrototypeOf && Object.setPrototypeOf(o, a), o;
		})(t.read) : t.read, t.readSync = typeof t.readSync == "function" ? (function(a) {
			return function(o, s, c, l, u) {
				for (var d = 0;;) try {
					return a.call(t, o, s, c, l, u);
				} catch (t) {
					if (t.code === "EAGAIN" && d < 10) {
						d++;
						continue;
					}
					throw t;
				}
			};
		})(t.readSync) : t.readSync;
		function a(t) {
			t.lchmod = function(a, s, c) {
				t.open(a, o.O_WRONLY | o.O_SYMLINK, s, function(a, o) {
					if (a) {
						c && c(a);
						return;
					}
					t.fchmod(o, s, function(a) {
						t.close(o, function(t) {
							c && c(a || t);
						});
					});
				});
			}, t.lchmodSync = function(a, s) {
				var c = t.openSync(a, o.O_WRONLY | o.O_SYMLINK, s), l = !0, u;
				try {
					u = t.fchmodSync(c, s), l = !1;
				} finally {
					if (l) try {
						t.closeSync(c);
					} catch {}
					else t.closeSync(c);
				}
				return u;
			};
		}
		function s(t) {
			o.hasOwnProperty("O_SYMLINK") && t.futimes ? (t.lutimes = function(a, s, c, l) {
				t.open(a, o.O_SYMLINK, function(a, o) {
					if (a) {
						l && l(a);
						return;
					}
					t.futimes(o, s, c, function(a) {
						t.close(o, function(t) {
							l && l(a || t);
						});
					});
				});
			}, t.lutimesSync = function(a, s, c) {
				var l = t.openSync(a, o.O_SYMLINK), u, d = !0;
				try {
					u = t.futimesSync(l, s, c), d = !1;
				} finally {
					if (d) try {
						t.closeSync(l);
					} catch {}
					else t.closeSync(l);
				}
				return u;
			}) : t.futimes && (t.lutimes = function(t, a, o, s) {
				s && process.nextTick(s);
			}, t.lutimesSync = function() {});
		}
		function c(a) {
			return a && function(o, s, c) {
				return a.call(t, o, s, function(t) {
					h(t) && (t = null), c && c.apply(this, arguments);
				});
			};
		}
		function u(a) {
			return a && function(o, s) {
				try {
					return a.call(t, o, s);
				} catch (t) {
					if (!h(t)) throw t;
				}
			};
		}
		function d(a) {
			return a && function(o, s, c, l) {
				return a.call(t, o, s, c, function(t) {
					h(t) && (t = null), l && l.apply(this, arguments);
				});
			};
		}
		function f(a) {
			return a && function(o, s, c) {
				try {
					return a.call(t, o, s, c);
				} catch (t) {
					if (!h(t)) throw t;
				}
			};
		}
		function p(a) {
			return a && function(o, s, c) {
				typeof s == "function" && (c = s, s = null);
				function l(t, a) {
					a && (a.uid < 0 && (a.uid += 4294967296), a.gid < 0 && (a.gid += 4294967296)), c && c.apply(this, arguments);
				}
				return s ? a.call(t, o, s, l) : a.call(t, o, l);
			};
		}
		function m(a) {
			return a && function(o, s) {
				var c = s ? a.call(t, o, s) : a.call(t, o);
				return c && (c.uid < 0 && (c.uid += 4294967296), c.gid < 0 && (c.gid += 4294967296)), c;
			};
		}
		function h(t) {
			return !t || t.code === "ENOSYS" || (!process.getuid || process.getuid() !== 0) && (t.code === "EINVAL" || t.code === "EPERM");
		}
	}
})), require_legacy_streams = /* @__PURE__ */ __commonJSMin(((t, a) => {
	var o = __require("stream").Stream;
	a.exports = s;
	function s(t) {
		return {
			ReadStream: a,
			WriteStream: s
		};
		function a(s, c) {
			if (!(this instanceof a)) return new a(s, c);
			o.call(this);
			var l = this;
			this.path = s, this.fd = null, this.readable = !0, this.paused = !1, this.flags = "r", this.mode = 438, this.bufferSize = 64 * 1024, c ||= {};
			for (var u = Object.keys(c), d = 0, f = u.length; d < f; d++) {
				var p = u[d];
				this[p] = c[p];
			}
			if (this.encoding && this.setEncoding(this.encoding), this.start !== void 0) {
				if (typeof this.start != "number") throw TypeError("start must be a Number");
				if (this.end === void 0) this.end = Infinity;
				else if (typeof this.end != "number") throw TypeError("end must be a Number");
				if (this.start > this.end) throw Error("start must be <= end");
				this.pos = this.start;
			}
			if (this.fd !== null) {
				process.nextTick(function() {
					l._read();
				});
				return;
			}
			t.open(this.path, this.flags, this.mode, function(t, a) {
				if (t) {
					l.emit("error", t), l.readable = !1;
					return;
				}
				l.fd = a, l.emit("open", a), l._read();
			});
		}
		function s(a, c) {
			if (!(this instanceof s)) return new s(a, c);
			o.call(this), this.path = a, this.fd = null, this.writable = !0, this.flags = "w", this.encoding = "binary", this.mode = 438, this.bytesWritten = 0, c ||= {};
			for (var l = Object.keys(c), u = 0, d = l.length; u < d; u++) {
				var f = l[u];
				this[f] = c[f];
			}
			if (this.start !== void 0) {
				if (typeof this.start != "number") throw TypeError("start must be a Number");
				if (this.start < 0) throw Error("start must be >= zero");
				this.pos = this.start;
			}
			this.busy = !1, this._queue = [], this.fd === null && (this._open = t.open, this._queue.push([
				this._open,
				this.path,
				this.flags,
				this.mode,
				void 0
			]), this.flush());
		}
	}
})), require_clone = /* @__PURE__ */ __commonJSMin(((t, a) => {
	a.exports = s;
	var o = Object.getPrototypeOf || function(t) {
		return t.__proto__;
	};
	function s(t) {
		if (typeof t != "object" || !t) return t;
		if (t instanceof Object) var a = { __proto__: o(t) };
		else var a = Object.create(null);
		return Object.getOwnPropertyNames(t).forEach(function(o) {
			Object.defineProperty(a, o, Object.getOwnPropertyDescriptor(t, o));
		}), a;
	}
})), require_graceful_fs = /* @__PURE__ */ __commonJSMin(((t, a) => {
	var o = __require("fs"), s = require_polyfills(), c = require_legacy_streams(), l = require_clone(), u = __require("util"), d, f;
	/* istanbul ignore else - node 0.x polyfill */
	typeof Symbol == "function" && typeof Symbol.for == "function" ? (d = Symbol.for("graceful-fs.queue"), f = Symbol.for("graceful-fs.previous")) : (d = "___graceful-fs.queue", f = "___graceful-fs.previous");
	function p() {}
	function m(t, a) {
		Object.defineProperty(t, d, { get: function() {
			return a;
		} });
	}
	var h = p;
	u.debuglog ? h = u.debuglog("gfs4") : /\bgfs4\b/i.test(process.env.NODE_DEBUG || "") && (h = function() {
		var t = u.format.apply(u, arguments);
		t = "GFS4: " + t.split(/\n/).join("\nGFS4: "), console.error(t);
	}), o[d] || (m(o, global[d] || []), o.close = (function(t) {
		function a(a, s) {
			return t.call(o, a, function(t) {
				t || y(), typeof s == "function" && s.apply(this, arguments);
			});
		}
		return Object.defineProperty(a, f, { value: t }), a;
	})(o.close), o.closeSync = (function(t) {
		function a(a) {
			t.apply(o, arguments), y();
		}
		return Object.defineProperty(a, f, { value: t }), a;
	})(o.closeSync), /\bgfs4\b/i.test(process.env.NODE_DEBUG || "") && process.on("exit", function() {
		h(o[d]), __require("assert").equal(o[d].length, 0);
	})), global[d] || m(global, o[d]), a.exports = g(l(o)), process.env.TEST_GRACEFUL_FS_GLOBAL_PATCH && !o.__patched && (a.exports = g(o), o.__patched = !0);
	function g(t) {
		s(t), t.gracefulify = g, t.createReadStream = k, t.createWriteStream = A;
		var a = t.readFile;
		t.readFile = o;
		function o(t, o, s) {
			return typeof o == "function" && (s = o, o = null), c(t, o, s);
			function c(t, o, s, l) {
				return a(t, o, function(a) {
					a && (a.code === "EMFILE" || a.code === "ENFILE") ? _([
						c,
						[
							t,
							o,
							s
						],
						a,
						l || Date.now(),
						Date.now()
					]) : typeof s == "function" && s.apply(this, arguments);
				});
			}
		}
		var l = t.writeFile;
		t.writeFile = u;
		function u(t, a, o, s) {
			return typeof o == "function" && (s = o, o = null), c(t, a, o, s);
			function c(t, a, o, s, u) {
				return l(t, a, o, function(l) {
					l && (l.code === "EMFILE" || l.code === "ENFILE") ? _([
						c,
						[
							t,
							a,
							o,
							s
						],
						l,
						u || Date.now(),
						Date.now()
					]) : typeof s == "function" && s.apply(this, arguments);
				});
			}
		}
		var d = t.appendFile;
		d && (t.appendFile = f);
		function f(t, a, o, s) {
			return typeof o == "function" && (s = o, o = null), c(t, a, o, s);
			function c(t, a, o, s, l) {
				return d(t, a, o, function(u) {
					u && (u.code === "EMFILE" || u.code === "ENFILE") ? _([
						c,
						[
							t,
							a,
							o,
							s
						],
						u,
						l || Date.now(),
						Date.now()
					]) : typeof s == "function" && s.apply(this, arguments);
				});
			}
		}
		var p = t.copyFile;
		p && (t.copyFile = m);
		function m(t, a, o, s) {
			return typeof o == "function" && (s = o, o = 0), c(t, a, o, s);
			function c(t, a, o, s, l) {
				return p(t, a, o, function(u) {
					u && (u.code === "EMFILE" || u.code === "ENFILE") ? _([
						c,
						[
							t,
							a,
							o,
							s
						],
						u,
						l || Date.now(),
						Date.now()
					]) : typeof s == "function" && s.apply(this, arguments);
				});
			}
		}
		var h = t.readdir;
		t.readdir = y;
		var v = /^v[0-5]\./;
		function y(t, a, o) {
			typeof a == "function" && (o = a, a = null);
			var s = v.test(process.version) ? function(t, a, o, s) {
				return h(t, c(t, a, o, s));
			} : function(t, a, o, s) {
				return h(t, a, c(t, a, o, s));
			};
			return s(t, a, o);
			function c(t, a, o, c) {
				return function(l, u) {
					l && (l.code === "EMFILE" || l.code === "ENFILE") ? _([
						s,
						[
							t,
							a,
							o
						],
						l,
						c || Date.now(),
						Date.now()
					]) : (u && u.sort && u.sort(), typeof o == "function" && o.call(this, l, u));
				};
			}
		}
		if (process.version.substr(0, 4) === "v0.8") {
			var b = c(t);
			T = b.ReadStream, D = b.WriteStream;
		}
		var x = t.ReadStream;
		x && (T.prototype = Object.create(x.prototype), T.prototype.open = E);
		var S = t.WriteStream;
		S && (D.prototype = Object.create(S.prototype), D.prototype.open = O), Object.defineProperty(t, "ReadStream", {
			get: function() {
				return T;
			},
			set: function(t) {
				T = t;
			},
			enumerable: !0,
			configurable: !0
		}), Object.defineProperty(t, "WriteStream", {
			get: function() {
				return D;
			},
			set: function(t) {
				D = t;
			},
			enumerable: !0,
			configurable: !0
		});
		var C = T;
		Object.defineProperty(t, "FileReadStream", {
			get: function() {
				return C;
			},
			set: function(t) {
				C = t;
			},
			enumerable: !0,
			configurable: !0
		});
		var w = D;
		Object.defineProperty(t, "FileWriteStream", {
			get: function() {
				return w;
			},
			set: function(t) {
				w = t;
			},
			enumerable: !0,
			configurable: !0
		});
		function T(t, a) {
			return this instanceof T ? (x.apply(this, arguments), this) : T.apply(Object.create(T.prototype), arguments);
		}
		function E() {
			var t = this;
			M(t.path, t.flags, t.mode, function(a, o) {
				a ? (t.autoClose && t.destroy(), t.emit("error", a)) : (t.fd = o, t.emit("open", o), t.read());
			});
		}
		function D(t, a) {
			return this instanceof D ? (S.apply(this, arguments), this) : D.apply(Object.create(D.prototype), arguments);
		}
		function O() {
			var t = this;
			M(t.path, t.flags, t.mode, function(a, o) {
				a ? (t.destroy(), t.emit("error", a)) : (t.fd = o, t.emit("open", o));
			});
		}
		function k(a, o) {
			return new t.ReadStream(a, o);
		}
		function A(a, o) {
			return new t.WriteStream(a, o);
		}
		var j = t.open;
		t.open = M;
		function M(t, a, o, s) {
			return typeof o == "function" && (s = o, o = null), c(t, a, o, s);
			function c(t, a, o, s, l) {
				return j(t, a, o, function(u, d) {
					u && (u.code === "EMFILE" || u.code === "ENFILE") ? _([
						c,
						[
							t,
							a,
							o,
							s
						],
						u,
						l || Date.now(),
						Date.now()
					]) : typeof s == "function" && s.apply(this, arguments);
				});
			}
		}
		return t;
	}
	function _(t) {
		h("ENQUEUE", t[0].name, t[1]), o[d].push(t), b();
	}
	var v;
	function y() {
		for (var t = Date.now(), a = 0; a < o[d].length; ++a) o[d][a].length > 2 && (o[d][a][3] = t, o[d][a][4] = t);
		b();
	}
	function b() {
		if (clearTimeout(v), v = void 0, o[d].length !== 0) {
			var t = o[d].shift(), a = t[0], s = t[1], c = t[2], l = t[3], u = t[4];
			if (l === void 0) h("RETRY", a.name, s), a.apply(null, s);
			else if (Date.now() - l >= 6e4) {
				h("TIMEOUT", a.name, s);
				var f = s.pop();
				typeof f == "function" && f.call(null, c);
			} else {
				var p = Date.now() - u, m = Math.max(u - l, 1);
				p >= Math.min(m * 1.2, 100) ? (h("RETRY", a.name, s), a.apply(null, s.concat([l]))) : o[d].push(t);
			}
			v === void 0 && (v = setTimeout(b, 0));
		}
	}
})), require_fs = /* @__PURE__ */ __commonJSMin(((t) => {
	var a = require_universalify().fromCallback, o = require_graceful_fs(), s = (/* @__PURE__ */ "access.appendFile.chmod.chown.close.copyFile.cp.fchmod.fchown.fdatasync.fstat.fsync.ftruncate.futimes.glob.lchmod.lchown.lutimes.link.lstat.mkdir.mkdtemp.open.opendir.readdir.readFile.readlink.realpath.rename.rm.rmdir.stat.statfs.symlink.truncate.unlink.utimes.writeFile".split(".")).filter((t) => typeof o[t] == "function");
	Object.assign(t, o), s.forEach((s) => {
		t[s] = a(o[s]);
	}), t.exists = function(t, a) {
		return typeof a == "function" ? o.exists(t, a) : new Promise((a) => o.exists(t, a));
	}, t.read = function(t, a, s, c, l, u) {
		return typeof u == "function" ? o.read(t, a, s, c, l, u) : new Promise((u, d) => {
			o.read(t, a, s, c, l, (t, a, o) => {
				if (t) return d(t);
				u({
					bytesRead: a,
					buffer: o
				});
			});
		});
	}, t.write = function(t, a, ...s) {
		return typeof s[s.length - 1] == "function" ? o.write(t, a, ...s) : new Promise((c, l) => {
			o.write(t, a, ...s, (t, a, o) => {
				if (t) return l(t);
				c({
					bytesWritten: a,
					buffer: o
				});
			});
		});
	}, t.readv = function(t, a, ...s) {
		return typeof s[s.length - 1] == "function" ? o.readv(t, a, ...s) : new Promise((c, l) => {
			o.readv(t, a, ...s, (t, a, o) => {
				if (t) return l(t);
				c({
					bytesRead: a,
					buffers: o
				});
			});
		});
	}, t.writev = function(t, a, ...s) {
		return typeof s[s.length - 1] == "function" ? o.writev(t, a, ...s) : new Promise((c, l) => {
			o.writev(t, a, ...s, (t, a, o) => {
				if (t) return l(t);
				c({
					bytesWritten: a,
					buffers: o
				});
			});
		});
	}, typeof o.realpath.native == "function" ? t.realpath.native = a(o.realpath.native) : process.emitWarning("fs.realpath.native is not a function. Is fs being monkey-patched?", "Warning", "fs-extra-WARN0003");
})), require_utils$1 = /* @__PURE__ */ __commonJSMin(((t, a) => {
	var o = __require("path");
	a.exports.checkPath = function(t) {
		if (process.platform === "win32" && /[<>:"|?*]/.test(t.replace(o.parse(t).root, ""))) {
			let a = /* @__PURE__ */ Error(`Path contains invalid characters: ${t}`);
			throw a.code = "EINVAL", a;
		}
	};
})), require_make_dir = /* @__PURE__ */ __commonJSMin(((t, a) => {
	var o = require_fs(), { checkPath: s } = require_utils$1(), c = (t) => typeof t == "number" ? t : {
		mode: 511,
		...t
	}.mode;
	a.exports.makeDir = async (t, a) => (s(t), o.mkdir(t, {
		mode: c(a),
		recursive: !0
	})), a.exports.makeDirSync = (t, a) => (s(t), o.mkdirSync(t, {
		mode: c(a),
		recursive: !0
	}));
})), require_mkdirs = /* @__PURE__ */ __commonJSMin(((t, a) => {
	var o = require_universalify().fromPromise, { makeDir: s, makeDirSync: c } = require_make_dir(), l = o(s);
	a.exports = {
		mkdirs: l,
		mkdirsSync: c,
		mkdirp: l,
		mkdirpSync: c,
		ensureDir: l,
		ensureDirSync: c
	};
})), require_path_exists = /* @__PURE__ */ __commonJSMin(((t, a) => {
	var o = require_universalify().fromPromise, s = require_fs();
	function c(t) {
		return s.access(t).then(() => !0).catch(() => !1);
	}
	a.exports = {
		pathExists: o(c),
		pathExistsSync: s.existsSync
	};
})), require_utimes = /* @__PURE__ */ __commonJSMin(((t, a) => {
	var o = require_fs(), s = require_universalify().fromPromise;
	async function c(t, a, s) {
		let c = await o.open(t, "r+"), l = null;
		try {
			await o.futimes(c, a, s);
		} finally {
			try {
				await o.close(c);
			} catch (t) {
				l = t;
			}
		}
		if (l) throw l;
	}
	function l(t, a, s) {
		let c = o.openSync(t, "r+");
		return o.futimesSync(c, a, s), o.closeSync(c);
	}
	a.exports = {
		utimesMillis: s(c),
		utimesMillisSync: l
	};
})), require_stat = /* @__PURE__ */ __commonJSMin(((t, a) => {
	var o = require_fs(), s = __require("path"), c = require_universalify().fromPromise;
	function l(t, a, s) {
		let c = s.dereference ? (t) => o.stat(t, { bigint: !0 }) : (t) => o.lstat(t, { bigint: !0 });
		return Promise.all([c(t), c(a).catch((t) => {
			if (t.code === "ENOENT") return null;
			throw t;
		})]).then(([t, a]) => ({
			srcStat: t,
			destStat: a
		}));
	}
	function u(t, a, s) {
		let c, l = s.dereference ? (t) => o.statSync(t, { bigint: !0 }) : (t) => o.lstatSync(t, { bigint: !0 }), u = l(t);
		try {
			c = l(a);
		} catch (t) {
			if (t.code === "ENOENT") return {
				srcStat: u,
				destStat: null
			};
			throw t;
		}
		return {
			srcStat: u,
			destStat: c
		};
	}
	async function d(t, a, o, c) {
		let { srcStat: u, destStat: d } = await l(t, a, c);
		if (d) {
			if (h(u, d)) {
				let c = s.basename(t), l = s.basename(a);
				if (o === "move" && c !== l && c.toLowerCase() === l.toLowerCase()) return {
					srcStat: u,
					destStat: d,
					isChangingCase: !0
				};
				throw Error("Source and destination must not be the same.");
			}
			if (u.isDirectory() && !d.isDirectory()) throw Error(`Cannot overwrite non-directory '${a}' with directory '${t}'.`);
			if (!u.isDirectory() && d.isDirectory()) throw Error(`Cannot overwrite directory '${a}' with non-directory '${t}'.`);
		}
		if (u.isDirectory() && g(t, a)) throw Error(_(t, a, o));
		return {
			srcStat: u,
			destStat: d
		};
	}
	function f(t, a, o, c) {
		let { srcStat: l, destStat: d } = u(t, a, c);
		if (d) {
			if (h(l, d)) {
				let c = s.basename(t), u = s.basename(a);
				if (o === "move" && c !== u && c.toLowerCase() === u.toLowerCase()) return {
					srcStat: l,
					destStat: d,
					isChangingCase: !0
				};
				throw Error("Source and destination must not be the same.");
			}
			if (l.isDirectory() && !d.isDirectory()) throw Error(`Cannot overwrite non-directory '${a}' with directory '${t}'.`);
			if (!l.isDirectory() && d.isDirectory()) throw Error(`Cannot overwrite directory '${a}' with non-directory '${t}'.`);
		}
		if (l.isDirectory() && g(t, a)) throw Error(_(t, a, o));
		return {
			srcStat: l,
			destStat: d
		};
	}
	async function p(t, a, c, l) {
		let u = s.resolve(s.dirname(t)), d = s.resolve(s.dirname(c));
		if (d === u || d === s.parse(d).root) return;
		let f;
		try {
			f = await o.stat(d, { bigint: !0 });
		} catch (t) {
			if (t.code === "ENOENT") return;
			throw t;
		}
		if (h(a, f)) throw Error(_(t, c, l));
		return p(t, a, d, l);
	}
	function m(t, a, c, l) {
		let u = s.resolve(s.dirname(t)), d = s.resolve(s.dirname(c));
		if (d === u || d === s.parse(d).root) return;
		let f;
		try {
			f = o.statSync(d, { bigint: !0 });
		} catch (t) {
			if (t.code === "ENOENT") return;
			throw t;
		}
		if (h(a, f)) throw Error(_(t, c, l));
		return m(t, a, d, l);
	}
	function h(t, a) {
		return a.ino !== void 0 && a.dev !== void 0 && a.ino === t.ino && a.dev === t.dev;
	}
	function g(t, a) {
		let o = s.resolve(t).split(s.sep).filter((t) => t), c = s.resolve(a).split(s.sep).filter((t) => t);
		return o.every((t, a) => c[a] === t);
	}
	function _(t, a, o) {
		return `Cannot ${o} '${t}' to a subdirectory of itself, '${a}'.`;
	}
	a.exports = {
		checkPaths: c(d),
		checkPathsSync: f,
		checkParentPaths: c(p),
		checkParentPathsSync: m,
		isSrcSubdir: g,
		areIdentical: h
	};
})), require_async = /* @__PURE__ */ __commonJSMin(((t, a) => {
	async function o(t, a) {
		let o = [];
		for await (let s of t) o.push(a(s).then(() => null, (t) => t ?? /* @__PURE__ */ Error("unknown error")));
		await Promise.all(o.map((t) => t.then((t) => {
			if (t !== null) throw t;
		})));
	}
	a.exports = { asyncIteratorConcurrentProcess: o };
})), require_copy$1 = /* @__PURE__ */ __commonJSMin(((t, a) => {
	var o = require_fs(), s = __require("path"), { mkdirs: c } = require_mkdirs(), { pathExists: l } = require_path_exists(), { utimesMillis: u } = require_utimes(), d = require_stat(), { asyncIteratorConcurrentProcess: f } = require_async();
	async function p(t, a, o = {}) {
		typeof o == "function" && (o = { filter: o }), o.clobber = "clobber" in o ? !!o.clobber : !0, o.overwrite = "overwrite" in o ? !!o.overwrite : o.clobber, o.preserveTimestamps && process.arch === "ia32" && process.emitWarning("Using the preserveTimestamps option in 32-bit node is not recommended;\n\n	see https://github.com/jprichardson/node-fs-extra/issues/269", "Warning", "fs-extra-WARN0001");
		let { srcStat: u, destStat: f } = await d.checkPaths(t, a, "copy", o);
		if (await d.checkParentPaths(t, u, a, "copy"), !await m(t, a, o)) return;
		let p = s.dirname(a);
		await l(p) || await c(p), await h(f, t, a, o);
	}
	async function m(t, a, o) {
		return o.filter ? o.filter(t, a) : !0;
	}
	async function h(t, a, s, c) {
		let l = await (c.dereference ? o.stat : o.lstat)(a);
		if (l.isDirectory()) return b(l, t, a, s, c);
		if (l.isFile() || l.isCharacterDevice() || l.isBlockDevice()) return g(l, t, a, s, c);
		if (l.isSymbolicLink()) return x(t, a, s, c);
		throw l.isSocket() ? Error(`Cannot copy a socket file: ${a}`) : l.isFIFO() ? Error(`Cannot copy a FIFO pipe: ${a}`) : Error(`Unknown file: ${a}`);
	}
	async function g(t, a, s, c, l) {
		if (!a) return _(t, s, c, l);
		if (l.overwrite) return await o.unlink(c), _(t, s, c, l);
		if (l.errorOnExist) throw Error(`'${c}' already exists`);
	}
	async function _(t, a, s, c) {
		if (await o.copyFile(a, s), c.preserveTimestamps) {
			v(t.mode) && await y(s, t.mode);
			let c = await o.stat(a);
			await u(s, c.atime, c.mtime);
		}
		return o.chmod(s, t.mode);
	}
	function v(t) {
		return (t & 128) == 0;
	}
	function y(t, a) {
		return o.chmod(t, a | 128);
	}
	async function b(t, a, c, l, u) {
		a || await o.mkdir(l), await f(await o.opendir(c), async (t) => {
			let a = s.join(c, t.name), o = s.join(l, t.name);
			if (await m(a, o, u)) {
				let { destStat: t } = await d.checkPaths(a, o, "copy", u);
				await h(t, a, o, u);
			}
		}), a || await o.chmod(l, t.mode);
	}
	async function x(t, a, c, l) {
		let u = await o.readlink(a);
		if (l.dereference && (u = s.resolve(process.cwd(), u)), !t) return o.symlink(u, c);
		let f = null;
		try {
			f = await o.readlink(c);
		} catch (t) {
			if (t.code === "EINVAL" || t.code === "UNKNOWN") return o.symlink(u, c);
			throw t;
		}
		if (l.dereference && (f = s.resolve(process.cwd(), f)), u !== f) {
			if (d.isSrcSubdir(u, f)) throw Error(`Cannot copy '${u}' to a subdirectory of itself, '${f}'.`);
			if (d.isSrcSubdir(f, u)) throw Error(`Cannot overwrite '${f}' with '${u}'.`);
		}
		return await o.unlink(c), o.symlink(u, c);
	}
	a.exports = p;
})), require_copy_sync = /* @__PURE__ */ __commonJSMin(((t, a) => {
	var o = require_graceful_fs(), s = __require("path"), c = require_mkdirs().mkdirsSync, l = require_utimes().utimesMillisSync, u = require_stat();
	function d(t, a, l) {
		typeof l == "function" && (l = { filter: l }), l ||= {}, l.clobber = "clobber" in l ? !!l.clobber : !0, l.overwrite = "overwrite" in l ? !!l.overwrite : l.clobber, l.preserveTimestamps && process.arch === "ia32" && process.emitWarning("Using the preserveTimestamps option in 32-bit node is not recommended;\n\n	see https://github.com/jprichardson/node-fs-extra/issues/269", "Warning", "fs-extra-WARN0002");
		let { srcStat: d, destStat: p } = u.checkPathsSync(t, a, "copy", l);
		if (u.checkParentPathsSync(t, d, a, "copy"), l.filter && !l.filter(t, a)) return;
		let m = s.dirname(a);
		return o.existsSync(m) || c(m), f(p, t, a, l);
	}
	function f(t, a, s, c) {
		let l = (c.dereference ? o.statSync : o.lstatSync)(a);
		if (l.isDirectory()) return x(l, t, a, s, c);
		if (l.isFile() || l.isCharacterDevice() || l.isBlockDevice()) return p(l, t, a, s, c);
		if (l.isSymbolicLink()) return T(t, a, s, c);
		throw l.isSocket() ? Error(`Cannot copy a socket file: ${a}`) : l.isFIFO() ? Error(`Cannot copy a FIFO pipe: ${a}`) : Error(`Unknown file: ${a}`);
	}
	function p(t, a, o, s, c) {
		return a ? m(t, o, s, c) : h(t, o, s, c);
	}
	function m(t, a, s, c) {
		if (c.overwrite) return o.unlinkSync(s), h(t, a, s, c);
		if (c.errorOnExist) throw Error(`'${s}' already exists`);
	}
	function h(t, a, s, c) {
		return o.copyFileSync(a, s), c.preserveTimestamps && g(t.mode, a, s), y(s, t.mode);
	}
	function g(t, a, o) {
		return _(t) && v(o, t), b(a, o);
	}
	function _(t) {
		return (t & 128) == 0;
	}
	function v(t, a) {
		return y(t, a | 128);
	}
	function y(t, a) {
		return o.chmodSync(t, a);
	}
	function b(t, a) {
		let s = o.statSync(t);
		return l(a, s.atime, s.mtime);
	}
	function x(t, a, o, s, c) {
		return a ? C(o, s, c) : S(t.mode, o, s, c);
	}
	function S(t, a, s, c) {
		return o.mkdirSync(s), C(a, s, c), y(s, t);
	}
	function C(t, a, s) {
		let c = o.opendirSync(t);
		try {
			let o;
			for (; (o = c.readSync()) !== null;) w(o.name, t, a, s);
		} finally {
			c.closeSync();
		}
	}
	function w(t, a, o, c) {
		let l = s.join(a, t), d = s.join(o, t);
		if (c.filter && !c.filter(l, d)) return;
		let { destStat: p } = u.checkPathsSync(l, d, "copy", c);
		return f(p, l, d, c);
	}
	function T(t, a, c, l) {
		let d = o.readlinkSync(a);
		if (l.dereference && (d = s.resolve(process.cwd(), d)), t) {
			let t;
			try {
				t = o.readlinkSync(c);
			} catch (t) {
				if (t.code === "EINVAL" || t.code === "UNKNOWN") return o.symlinkSync(d, c);
				throw t;
			}
			if (l.dereference && (t = s.resolve(process.cwd(), t)), d !== t) {
				if (u.isSrcSubdir(d, t)) throw Error(`Cannot copy '${d}' to a subdirectory of itself, '${t}'.`);
				if (u.isSrcSubdir(t, d)) throw Error(`Cannot overwrite '${t}' with '${d}'.`);
			}
			return E(d, c);
		} else return o.symlinkSync(d, c);
	}
	function E(t, a) {
		return o.unlinkSync(a), o.symlinkSync(t, a);
	}
	a.exports = d;
})), require_copy = /* @__PURE__ */ __commonJSMin(((t, a) => {
	var o = require_universalify().fromPromise;
	a.exports = {
		copy: o(require_copy$1()),
		copySync: require_copy_sync()
	};
})), require_remove = /* @__PURE__ */ __commonJSMin(((t, a) => {
	var o = require_graceful_fs(), s = require_universalify().fromCallback;
	function c(t, a) {
		o.rm(t, {
			recursive: !0,
			force: !0
		}, a);
	}
	function l(t) {
		o.rmSync(t, {
			recursive: !0,
			force: !0
		});
	}
	a.exports = {
		remove: s(c),
		removeSync: l
	};
})), require_empty = /* @__PURE__ */ __commonJSMin(((t, a) => {
	var o = require_universalify().fromPromise, s = require_fs(), c = __require("path"), l = require_mkdirs(), u = require_remove(), d = o(async function(t) {
		let a;
		try {
			a = await s.readdir(t);
		} catch {
			return l.mkdirs(t);
		}
		return Promise.all(a.map((a) => u.remove(c.join(t, a))));
	});
	function f(t) {
		let a;
		try {
			a = s.readdirSync(t);
		} catch {
			return l.mkdirsSync(t);
		}
		a.forEach((a) => {
			a = c.join(t, a), u.removeSync(a);
		});
	}
	a.exports = {
		emptyDirSync: f,
		emptydirSync: f,
		emptyDir: d,
		emptydir: d
	};
})), require_file = /* @__PURE__ */ __commonJSMin(((t, a) => {
	var o = require_universalify().fromPromise, s = __require("path"), c = require_fs(), l = require_mkdirs();
	async function u(t) {
		let a;
		try {
			a = await c.stat(t);
		} catch {}
		if (a && a.isFile()) return;
		let o = s.dirname(t), u = null;
		try {
			u = await c.stat(o);
		} catch (a) {
			if (a.code === "ENOENT") {
				await l.mkdirs(o), await c.writeFile(t, "");
				return;
			} else throw a;
		}
		u.isDirectory() ? await c.writeFile(t, "") : await c.readdir(o);
	}
	function d(t) {
		let a;
		try {
			a = c.statSync(t);
		} catch {}
		if (a && a.isFile()) return;
		let o = s.dirname(t);
		try {
			c.statSync(o).isDirectory() || c.readdirSync(o);
		} catch (t) {
			if (t && t.code === "ENOENT") l.mkdirsSync(o);
			else throw t;
		}
		c.writeFileSync(t, "");
	}
	a.exports = {
		createFile: o(u),
		createFileSync: d
	};
})), require_link = /* @__PURE__ */ __commonJSMin(((t, a) => {
	var o = require_universalify().fromPromise, s = __require("path"), c = require_fs(), l = require_mkdirs(), { pathExists: u } = require_path_exists(), { areIdentical: d } = require_stat();
	async function f(t, a) {
		let o;
		try {
			o = await c.lstat(a);
		} catch {}
		let f;
		try {
			f = await c.lstat(t);
		} catch (t) {
			throw t.message = t.message.replace("lstat", "ensureLink"), t;
		}
		if (o && d(f, o)) return;
		let p = s.dirname(a);
		await u(p) || await l.mkdirs(p), await c.link(t, a);
	}
	function p(t, a) {
		let o;
		try {
			o = c.lstatSync(a);
		} catch {}
		try {
			let a = c.lstatSync(t);
			if (o && d(a, o)) return;
		} catch (t) {
			throw t.message = t.message.replace("lstat", "ensureLink"), t;
		}
		let u = s.dirname(a);
		return c.existsSync(u) || l.mkdirsSync(u), c.linkSync(t, a);
	}
	a.exports = {
		createLink: o(f),
		createLinkSync: p
	};
})), require_symlink_paths = /* @__PURE__ */ __commonJSMin(((t, a) => {
	var o = __require("path"), s = require_fs(), { pathExists: c } = require_path_exists(), l = require_universalify().fromPromise;
	async function u(t, a) {
		if (o.isAbsolute(t)) {
			try {
				await s.lstat(t);
			} catch (t) {
				throw t.message = t.message.replace("lstat", "ensureSymlink"), t;
			}
			return {
				toCwd: t,
				toDst: t
			};
		}
		let l = o.dirname(a), u = o.join(l, t);
		if (await c(u)) return {
			toCwd: u,
			toDst: t
		};
		try {
			await s.lstat(t);
		} catch (t) {
			throw t.message = t.message.replace("lstat", "ensureSymlink"), t;
		}
		return {
			toCwd: t,
			toDst: o.relative(l, t)
		};
	}
	function d(t, a) {
		if (o.isAbsolute(t)) {
			if (!s.existsSync(t)) throw Error("absolute srcpath does not exist");
			return {
				toCwd: t,
				toDst: t
			};
		}
		let c = o.dirname(a), l = o.join(c, t);
		if (s.existsSync(l)) return {
			toCwd: l,
			toDst: t
		};
		if (!s.existsSync(t)) throw Error("relative srcpath does not exist");
		return {
			toCwd: t,
			toDst: o.relative(c, t)
		};
	}
	a.exports = {
		symlinkPaths: l(u),
		symlinkPathsSync: d
	};
})), require_symlink_type = /* @__PURE__ */ __commonJSMin(((t, a) => {
	var o = require_fs(), s = require_universalify().fromPromise;
	async function c(t, a) {
		if (a) return a;
		let s;
		try {
			s = await o.lstat(t);
		} catch {
			return "file";
		}
		return s && s.isDirectory() ? "dir" : "file";
	}
	function l(t, a) {
		if (a) return a;
		let s;
		try {
			s = o.lstatSync(t);
		} catch {
			return "file";
		}
		return s && s.isDirectory() ? "dir" : "file";
	}
	a.exports = {
		symlinkType: s(c),
		symlinkTypeSync: l
	};
})), require_symlink = /* @__PURE__ */ __commonJSMin(((t, a) => {
	var o = require_universalify().fromPromise, s = __require("path"), c = require_fs(), { mkdirs: l, mkdirsSync: u } = require_mkdirs(), { symlinkPaths: d, symlinkPathsSync: f } = require_symlink_paths(), { symlinkType: p, symlinkTypeSync: m } = require_symlink_type(), { pathExists: h } = require_path_exists(), { areIdentical: g } = require_stat();
	async function _(t, a, o) {
		let u;
		try {
			u = await c.lstat(a);
		} catch {}
		if (u && u.isSymbolicLink()) {
			let [o, s] = await Promise.all([c.stat(t), c.stat(a)]);
			if (g(o, s)) return;
		}
		let f = await d(t, a);
		t = f.toDst;
		let m = await p(f.toCwd, o), _ = s.dirname(a);
		return await h(_) || await l(_), c.symlink(t, a, m);
	}
	function v(t, a, o) {
		let l;
		try {
			l = c.lstatSync(a);
		} catch {}
		if (l && l.isSymbolicLink() && g(c.statSync(t), c.statSync(a))) return;
		let d = f(t, a);
		t = d.toDst, o = m(d.toCwd, o);
		let p = s.dirname(a);
		return c.existsSync(p) || u(p), c.symlinkSync(t, a, o);
	}
	a.exports = {
		createSymlink: o(_),
		createSymlinkSync: v
	};
})), require_ensure = /* @__PURE__ */ __commonJSMin(((t, a) => {
	var { createFile: o, createFileSync: s } = require_file(), { createLink: c, createLinkSync: l } = require_link(), { createSymlink: u, createSymlinkSync: d } = require_symlink();
	a.exports = {
		createFile: o,
		createFileSync: s,
		ensureFile: o,
		ensureFileSync: s,
		createLink: c,
		createLinkSync: l,
		ensureLink: c,
		ensureLinkSync: l,
		createSymlink: u,
		createSymlinkSync: d,
		ensureSymlink: u,
		ensureSymlinkSync: d
	};
})), require_utils = /* @__PURE__ */ __commonJSMin(((t, a) => {
	function o(t, { EOL: a = "\n", finalEOL: o = !0, replacer: s = null, spaces: c } = {}) {
		let l = o ? a : "";
		return JSON.stringify(t, s, c).replace(/\n/g, a) + l;
	}
	function s(t) {
		return Buffer.isBuffer(t) && (t = t.toString("utf8")), t.replace(/^\uFEFF/, "");
	}
	a.exports = {
		stringify: o,
		stripBom: s
	};
})), require_jsonfile$1 = /* @__PURE__ */ __commonJSMin(((t, a) => {
	var o;
	try {
		o = require_graceful_fs();
	} catch {
		o = __require("fs");
	}
	var s = require_universalify(), { stringify: c, stripBom: l } = require_utils();
	async function u(t, a = {}) {
		typeof a == "string" && (a = { encoding: a });
		let c = a.fs || o, u = "throws" in a ? a.throws : !0, d = await s.fromCallback(c.readFile)(t, a);
		d = l(d);
		let f;
		try {
			f = JSON.parse(d, a ? a.reviver : null);
		} catch (a) {
			if (u) throw a.message = `${t}: ${a.message}`, a;
			return null;
		}
		return f;
	}
	var d = s.fromPromise(u);
	function f(t, a = {}) {
		typeof a == "string" && (a = { encoding: a });
		let s = a.fs || o, c = "throws" in a ? a.throws : !0;
		try {
			let o = s.readFileSync(t, a);
			return o = l(o), JSON.parse(o, a.reviver);
		} catch (a) {
			if (c) throw a.message = `${t}: ${a.message}`, a;
			return null;
		}
	}
	async function p(t, a, l = {}) {
		let u = l.fs || o, d = c(a, l);
		await s.fromCallback(u.writeFile)(t, d, l);
	}
	var m = s.fromPromise(p);
	function h(t, a, s = {}) {
		let l = s.fs || o, u = c(a, s);
		return l.writeFileSync(t, u, s);
	}
	a.exports = {
		readFile: d,
		readFileSync: f,
		writeFile: m,
		writeFileSync: h
	};
})), require_jsonfile = /* @__PURE__ */ __commonJSMin(((t, a) => {
	var o = require_jsonfile$1();
	a.exports = {
		readJson: o.readFile,
		readJsonSync: o.readFileSync,
		writeJson: o.writeFile,
		writeJsonSync: o.writeFileSync
	};
})), require_output_file = /* @__PURE__ */ __commonJSMin(((t, a) => {
	var o = require_universalify().fromPromise, s = require_fs(), c = __require("path"), l = require_mkdirs(), u = require_path_exists().pathExists;
	async function d(t, a, o = "utf-8") {
		let d = c.dirname(t);
		return await u(d) || await l.mkdirs(d), s.writeFile(t, a, o);
	}
	function f(t, ...a) {
		let o = c.dirname(t);
		s.existsSync(o) || l.mkdirsSync(o), s.writeFileSync(t, ...a);
	}
	a.exports = {
		outputFile: o(d),
		outputFileSync: f
	};
})), require_output_json = /* @__PURE__ */ __commonJSMin(((t, a) => {
	var { stringify: o } = require_utils(), { outputFile: s } = require_output_file();
	async function c(t, a, c = {}) {
		await s(t, o(a, c), c);
	}
	a.exports = c;
})), require_output_json_sync = /* @__PURE__ */ __commonJSMin(((t, a) => {
	var { stringify: o } = require_utils(), { outputFileSync: s } = require_output_file();
	function c(t, a, c) {
		s(t, o(a, c), c);
	}
	a.exports = c;
})), require_json = /* @__PURE__ */ __commonJSMin(((t, a) => {
	var o = require_universalify().fromPromise, s = require_jsonfile();
	s.outputJson = o(require_output_json()), s.outputJsonSync = require_output_json_sync(), s.outputJSON = s.outputJson, s.outputJSONSync = s.outputJsonSync, s.writeJSON = s.writeJson, s.writeJSONSync = s.writeJsonSync, s.readJSON = s.readJson, s.readJSONSync = s.readJsonSync, a.exports = s;
})), require_move$1 = /* @__PURE__ */ __commonJSMin(((t, a) => {
	var o = require_fs(), s = __require("path"), { copy: c } = require_copy(), { remove: l } = require_remove(), { mkdirp: u } = require_mkdirs(), { pathExists: d } = require_path_exists(), f = require_stat();
	async function p(t, a, o = {}) {
		let c = o.overwrite || o.clobber || !1, { srcStat: l, isChangingCase: d = !1 } = await f.checkPaths(t, a, "move", o);
		await f.checkParentPaths(t, l, a, "move");
		let p = s.dirname(a);
		return s.parse(p).root !== p && await u(p), m(t, a, c, d);
	}
	async function m(t, a, s, c) {
		if (!c) {
			if (s) await l(a);
			else if (await d(a)) throw Error("dest already exists.");
		}
		try {
			await o.rename(t, a);
		} catch (o) {
			if (o.code !== "EXDEV") throw o;
			await h(t, a, s);
		}
	}
	async function h(t, a, o) {
		return await c(t, a, {
			overwrite: o,
			errorOnExist: !0,
			preserveTimestamps: !0
		}), l(t);
	}
	a.exports = p;
})), require_move_sync = /* @__PURE__ */ __commonJSMin(((t, a) => {
	var o = require_graceful_fs(), s = __require("path"), c = require_copy().copySync, l = require_remove().removeSync, u = require_mkdirs().mkdirpSync, d = require_stat();
	function f(t, a, o) {
		o ||= {};
		let c = o.overwrite || o.clobber || !1, { srcStat: l, isChangingCase: f = !1 } = d.checkPathsSync(t, a, "move", o);
		return d.checkParentPathsSync(t, l, a, "move"), p(a) || u(s.dirname(a)), m(t, a, c, f);
	}
	function p(t) {
		let a = s.dirname(t);
		return s.parse(a).root === a;
	}
	function m(t, a, s, c) {
		if (c) return h(t, a, s);
		if (s) return l(a), h(t, a, s);
		if (o.existsSync(a)) throw Error("dest already exists.");
		return h(t, a, s);
	}
	function h(t, a, s) {
		try {
			o.renameSync(t, a);
		} catch (o) {
			if (o.code !== "EXDEV") throw o;
			return g(t, a, s);
		}
	}
	function g(t, a, o) {
		return c(t, a, {
			overwrite: o,
			errorOnExist: !0,
			preserveTimestamps: !0
		}), l(t);
	}
	a.exports = f;
})), require_move = /* @__PURE__ */ __commonJSMin(((t, a) => {
	var o = require_universalify().fromPromise;
	a.exports = {
		move: o(require_move$1()),
		moveSync: require_move_sync()
	};
})), require_lib = /* @__PURE__ */ __commonJSMin(((t, a) => {
	a.exports = {
		...require_fs(),
		...require_copy(),
		...require_empty(),
		...require_ensure(),
		...require_json(),
		...require_mkdirs(),
		...require_move(),
		...require_output_file(),
		...require_path_exists(),
		...require_remove()
	};
})), import_adm_zip = /* @__PURE__ */ __toESM(require_adm_zip(), 1), import_lib = require_lib(), appMain = class t {
	static initRenderer(o, s) {
		let l, u = () => {};
		try {
			ElectronStore.initRenderer(), l = new BrowserWindow({
				show: !1,
				minWidth: 300,
				minHeight: 300,
				width: 900,
				height: 670,
				acceptFirstMouse: !0,
				maximizable: !1,
				webPreferences: {
					preload: o,
					sandbox: !1
				}
			});
			let c = new t(l, s);
			u = () => c.openDevTools();
		} catch (t) {
			throw console.error(`early err:${t}`), u(), "initRenderer error";
		}
		return l.on("ready-to-show", () => l.show()), ipcMain.on("ping", () => console.log("pong")), l;
	}
	#e = {
		getAppPath: app.getAppPath(),
		isPackaged: app.isPackaged,
		downloads: app.getPath("downloads"),
		userData: app.getPath("userData"),
		getVersion: "",
		env: { ...process.env },
		platform: process.platform,
		arch: process.arch
	};
	#t = 0;
	#n = 0;
	#r = 0;
	#i = 0;
	constructor(t, a) {
		this.bw = t, this.version = a, t.webContents.on("devtools-opened", () => this.#o()), ipcMain.handle("openDevTools", () => t.webContents.openDevTools()), this.#e.getVersion = a, ipcMain.handle("getInfo", () => this.#e), ipcMain.handle("inited", (t, a, o) => this.#s(a, o)), ipcMain.handle("existsSync", (t, a) => (0, import_lib.existsSync)(a)), ipcMain.handle("copySync", (t, a, o) => (0, import_lib.copySync)(a, o)), ipcMain.handle("removeSync", (t, a) => (0, import_lib.removeSync)(a)), ipcMain.handle("ensureFileSync", (t, a) => (0, import_lib.ensureFileSync)(a)), ipcMain.handle("readFileSync", (t, a) => (0, import_lib.readFileSync)(a, { encoding: "utf8" })), ipcMain.handle("writeFileSync", (t, a, o, s) => (0, import_lib.writeFileSync)(a, o, s)), ipcMain.handle("appendFile", (t, a, o) => (0, import_lib.appendFile)(a, o).catch((t) => console.log(t))), ipcMain.handle("outputFile", (t, a, o) => (0, import_lib.outputFile)(a, o).catch((t) => console.log(t))), ipcMain.handle("win_close", () => t.close()), ipcMain.handle("win_setTitle", (a, o) => t.setTitle(o)), ipcMain.handle("showMessageBox", (t, a) => dialog.showMessageBox(a)), ipcMain.handle("capturePage", (a, o, s, c) => t.webContents.capturePage().then((t) => {
			(0, import_lib.ensureFileSync)(o);
			let a = t.resize({
				width: s,
				height: c,
				quality: "best"
			});
			(0, import_lib.writeFileSync)(o, o.endsWith(".png") ? a.toPNG() : a.toJPEG(80));
		})), ipcMain.handle("navigate_to", (t, a) => shell.openExternal(a));
		let o;
		ipcMain.handle("Store", (t, a) => {
			o = new ElectronStore(a);
		}), ipcMain.handle("flush", (t, a) => {
			o.store = a;
		}), ipcMain.handle("Store_isEmpty", () => o.size === 0), ipcMain.handle("Store_get", () => o.store), ipcMain.handle("zip", (t, a, o) => {
			let s = new import_adm_zip.default();
			s.addLocalFolder(a), s.writeZip(o);
		}), ipcMain.handle("unzip", (t, a, o) => {
			(0, import_lib.removeSync)(o), (0, import_lib.ensureDirSync)(o), new import_adm_zip.default(a).extractAllTo(o, !0);
		}), ipcMain.handle("isSimpleFullScreen", () => t.simpleFullScreen), CmnLib.isWin ? (ipcMain.handle("setSimpleFullScreen", (a, o) => {
			this.#f = !0, t.setSimpleFullScreen(o), o || (t.setPosition(this.#t, this.#n), t.setContentSize(this.#r, this.#i)), this.#f = !1;
		}), t.on("enter-full-screen", () => {
			t.setContentSize(this.#c.width, this.#c.height);
		}), t.on("leave-full-screen", () => {
			this.#m(!1, this.#t, this.#n, this.#r, this.#i);
		})) : ipcMain.handle("setSimpleFullScreen", (a, o) => {
			t.setSimpleFullScreen(o), !o && t.setContentSize(this.#r, this.#i);
		}), ipcMain.handle("window", (t, a, o, s, c, l) => this.#m(a, o, s, c, l)), t.on("move", () => this.#p()), t.on("resize", () => this.#p()), this.#l();
	}
	#a = 0;
	openDevTools = () => {};
	#o = () => {};
	#s(t, a) {
		let { c: o, x: s, y: c, w: l, h: u } = a;
		if (this.#a = l / u, CmnLib.isWin || this.bw.setAspectRatio(this.#a), this.#m(o, s, c, l, u), this.bw.show(), t.debug.devtool) {
			this.#o = () => {}, this.openDevTools = () => this.bw.webContents.openDevTools({ mode: "detach" }), this.openDevTools();
			return;
		}
		this.#o = () => {
			this.bw.webContents.closeDevTools(), this.bw.setTitle("DevToolは禁止されています。許可する場合は【プロジェクト設定】の【devtool】をONに。"), this.bw.webContents.send("shutdown");
		};
	}
	#c;
	#l() {
		let t = screen.getCursorScreenPoint();
		this.#c = screen.getDisplayNearestPoint(t).workAreaSize;
	}
	#u = void 0;
	#d = !1;
	#f = !1;
	#p() {
		if (this.#u || this.#f) return;
		this.#f = !0;
		let [t, a] = this.bw.getPosition(), [o, s] = this.bw.getContentSize();
		this.#u = setTimeout(() => {
			if (this.#u = void 0, this.#d) {
				this.#d = !1;
				return;
			}
			this.#f = !1;
			let [c = 0, l = 0] = this.bw.getPosition(), [u = 0, d = 0] = this.bw.getContentSize();
			if (t !== c || a !== l || o !== u || s !== d) {
				this.#p();
				return;
			}
			this.#m(!1, c, l, u, d);
		}, 1e3 / 60 * 10);
	}
	#m(t, a, o, s, c) {
		this.#f || (this.#f = !0, !this.bw.simpleFullScreen && (t && (this.#l(), a = (this.#c.width - s) * .5, o = (this.#c.height - c) * .5), this.#t = a = Math.round(a), this.#n = o = Math.round(o), this.bw.setPosition(a, o), CmnLib.isWin && (this.#r === s ? s = c * this.#a : c = s / this.#a), this.#r = s = Math.round(s), this.#i = c = Math.round(c), this.bw.setContentSize(s, c), this.bw.webContents.send("save_win_inf", {
			c: t,
			x: a,
			y: o,
			w: s,
			h: c,
			scrw: this.#c.width,
			scrh: this.#c.height
		}), this.#f = !1));
	}
};
export { appMain };

//# sourceMappingURL=appMain.js.map