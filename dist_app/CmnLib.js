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
	if (!(t in e)) return e[t] = n, n;
	let r = e[t];
	if (r === null) return !1;
	let i = String(r);
	return e[t] = i !== "false" && !!i;
}
function i(e) {
	return typeof e == "number" ? `#${e.toString(16).padStart(6, "0")}` : e;
}
var a = /^[^/.]+$|[^/]+(?=\.)/;
function o(e) {
	return (a.exec(e) ?? [""])[0];
}
var s = class {
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
export { o as a, n as i, r as n, e as o, i as r, t as s, s as t };

//# sourceMappingURL=CmnLib.js.map