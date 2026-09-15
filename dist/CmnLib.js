//#region src/sn/CmnLib.ts
function e(e) {
	return parseInt(String(e), 10);
}
function t(e) {
	let t = parseInt(String(e), 10);
	return t < 0 ? -t : t;
}
function n(e = "/", t = " ", n = ":", r = "") {
	let i = /* @__PURE__ */ new Date();
	return String(i.getFullYear()) + e + String(100 + i.getMonth() + 1).slice(1, 3) + e + String(100 + i.getDate()).slice(1, 3) + t + String(100 + i.getHours()).slice(1, 3) + n + String(100 + i.getMinutes()).slice(1, 3) + (r === "" ? "" : r + String(i.getMilliseconds()));
}
function r(e, t, n) {
	let r = e[t];
	if (!(t in e)) {
		if (isNaN(n)) throw `[${e[":タグ名"] ?? ""}]属性 ${t} は必須です`;
		return e[t] = n, n;
	}
	let i = String(r).startsWith("0x") ? parseInt(r) : parseFloat(r);
	if (isNaN(i)) throw `[${e[":タグ名"] ?? ""}]属性 ${t} の値【${String(r)}】が数値ではありません`;
	return e[t] = i, i;
}
function i(e, t) {
	let n = e.trim() === "" ? NaN : e.startsWith("0x") ? parseInt(e.slice(2), 16) : Number(e);
	if (!Number.isFinite(n)) throw `${t}の値が不正です：${e}`;
	return n;
}
var a = {
	black: 0,
	silver: 12632256,
	gray: 8421504,
	white: 16777215,
	maroon: 8388608,
	red: 16711680,
	purple: 8388736,
	fuchsia: 16711935,
	green: 32768,
	lime: 65280,
	olive: 8421376,
	yellow: 16776960,
	navy: 128,
	blue: 255,
	teal: 32896,
	aqua: 65535,
	aliceblue: 15792383,
	antiquewhite: 16444375,
	aquamarine: 8388564,
	azure: 15794175,
	beige: 16119260,
	bisque: 16770244,
	blanchedalmond: 16772045,
	blueviolet: 9055202,
	brown: 10824234,
	burlywood: 14596231,
	cadetblue: 6266528,
	chartreuse: 8388352,
	chocolate: 13789470,
	coral: 16744272,
	cornflowerblue: 6591981,
	cornsilk: 16775388,
	crimson: 14423100,
	cyan: 65535,
	darkblue: 139,
	darkcyan: 35723,
	darkgoldenrod: 12092939,
	darkgray: 11119017,
	darkgreen: 25600,
	darkgrey: 11119017,
	darkkhaki: 12433259,
	darkmagenta: 9109643,
	darkolivegreen: 5597999,
	darkorange: 16747520,
	darkorchid: 10040012,
	darkred: 9109504,
	darksalmon: 15308410,
	darkseagreen: 9419919,
	darkslateblue: 4734347,
	darkslategray: 3100495,
	darkslategrey: 3100495,
	darkturquoise: 52945,
	darkviolet: 9699539,
	deeppink: 16716947,
	deepskyblue: 49151,
	dimgray: 6908265,
	dimgrey: 6908265,
	dodgerblue: 2003199,
	firebrick: 11674146,
	floralwhite: 16775920,
	forestgreen: 2263842,
	gainsboro: 14474460,
	ghostwhite: 16316671,
	gold: 16766720,
	goldenrod: 14329120,
	greenyellow: 11403055,
	grey: 8421504,
	honeydew: 15794160,
	hotpink: 16738740,
	indianred: 13458524,
	indigo: 4915330,
	ivory: 16777200,
	khaki: 15787660,
	lavender: 15132410,
	lavenderblush: 16773365,
	lawngreen: 8190976,
	lemonchiffon: 16775885,
	lightblue: 11393254,
	lightcoral: 15761536,
	lightcyan: 14745599,
	lightgoldenrodyellow: 16448210,
	lightgray: 13882323,
	lightgreen: 9498256,
	lightgrey: 13882323,
	lightpink: 16758465,
	lightsalmon: 16752762,
	lightseagreen: 2142890,
	lightskyblue: 8900346,
	lightslategray: 7833753,
	lightslategrey: 7833753,
	lightsteelblue: 11584734,
	lightyellow: 16777184,
	limegreen: 3329330,
	linen: 16445670,
	magenta: 16711935,
	mediumaquamarine: 6737322,
	mediumblue: 205,
	mediumorchid: 12211667,
	mediumpurple: 9662683,
	mediumseagreen: 3978097,
	mediumslateblue: 8087790,
	mediumspringgreen: 64154,
	mediumturquoise: 4772300,
	mediumvioletred: 13047173,
	midnightblue: 1644912,
	mintcream: 16121850,
	mistyrose: 16770273,
	moccasin: 16770229,
	navajowhite: 16768685,
	oldlace: 16643558,
	olivedrab: 7048739,
	orange: 16753920,
	orangered: 16729344,
	orchid: 14315734,
	palegoldenrod: 15657130,
	palegreen: 10025880,
	paleturquoise: 11529966,
	palevioletred: 14381203,
	papayawhip: 16773077,
	peachpuff: 16767673,
	peru: 13468991,
	pink: 16761035,
	plum: 14524637,
	powderblue: 11591910,
	rebeccapurple: 6697881,
	rosybrown: 12357519,
	royalblue: 4286945,
	saddlebrown: 9127187,
	salmon: 16416882,
	sandybrown: 16032864,
	seagreen: 3050327,
	seashell: 16774638,
	sienna: 10506797,
	skyblue: 8900331,
	slateblue: 6970061,
	slategray: 7372944,
	slategrey: 7372944,
	snow: 16775930,
	springgreen: 65407,
	steelblue: 4620980,
	tan: 13808780,
	thistle: 14204888,
	tomato: 16737095,
	turquoise: 4251856,
	violet: 15631086,
	wheat: 16113331,
	whitesmoke: 16119285,
	yellowgreen: 10145074
};
function o(e, t) {
	let n = e.trim();
	if (n === "") throw `${t}の値が不正です：${e}`;
	if (n.startsWith("#")) {
		let e = parseInt(n.slice(1), 16);
		if (Number.isFinite(e)) return e;
	} else {
		let e = n.startsWith("0x") ? parseInt(n.slice(2), 16) : Number(n);
		if (Number.isFinite(e)) return e;
		let t = a[n.toLowerCase()];
		if (t !== void 0) return t;
	}
	throw `${t}の値が不正です：${e}`;
}
function s(e, t, n) {
	if (!(t in e)) return e[t] = n, n;
	let r = e[t];
	if (r === null) return !1;
	let i = String(r);
	return e[t] = i !== "false" && !!i;
}
function c(e) {
	return typeof e == "number" ? `#${e.toString(16).padStart(6, "0")}` : e;
}
var l = /^[^/.]+$|[^/]+(?=\.)/;
function u(e) {
	return (l.exec(e) ?? [""])[0];
}
var d = class {
	static init() {
		let e = globalThis.navigator.userAgent;
		this.platform = e, this.plat_desc = e, this.isSafari = /safari/i.test(e) && !/chrome|chromium|crios|edg|android|fxios/i.test(e), this.isFirefox = /firefox|fxios/i.test(e), this.isMac = /macintosh|mac os x/i.test(e) && !/iphone|ipad|ipod/i.test(e), this.isMobile = !/windows|macintosh|mac os x/i.test(e) || /iphone|ipad|ipod|android/i.test(e);
	}
	static stageW = 0;
	static stageH = 0;
	static bgColor = "#000000";
	static debugLog = !1;
	static masume = !1;
	static platform;
	static plat_desc;
	static isSafari;
	static isFirefox;
	static isMac;
	static isMobile;
	static hDip = {};
	static isDbg = !1;
	static isPackaged = !1;
	static isDarkMode = !1;
	static cc4ColorName;
};
//#endregion
export { n as a, o as c, c as i, i as l, s as n, u as o, r, e as s, d as t, t as u };

//# sourceMappingURL=CmnLib.js.map