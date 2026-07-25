import { n as e } from "./rolldown-runtime.js";
//#region src/sn/CmnLib.ts
function t(e) {
	return parseInt(String(e), 10);
}
function n(e) {
	let t = parseInt(String(e), 10);
	return t < 0 ? -t : t;
}
function r(e = "/", t = " ", n = ":", r = "") {
	let i = /* @__PURE__ */ new Date();
	return String(i.getFullYear()) + e + String(100 + i.getMonth() + 1).slice(1, 3) + e + String(100 + i.getDate()).slice(1, 3) + t + String(100 + i.getHours()).slice(1, 3) + n + String(100 + i.getMinutes()).slice(1, 3) + (r === "" ? "" : r + String(i.getMilliseconds()));
}
var i = /^[^/.]+$|[^/]+(?=\.)/;
function a(e) {
	return (i.exec(e) ?? [""])[0];
}
var o = class {
	static async init() {
		let t = await import("./platform.js").then((t) => /* @__PURE__ */ e(t.default, 1));
		this.platform = JSON.stringify(t), this.plat_desc = t.description ?? "", this.isSafari = t.name === "Safari", this.isFirefox = t.name === "Firefox", this.isMac = (t.os?.family ?? "").includes("OS X"), this.isMobile = !/(Windows|OS X)/.test(t.os?.family ?? "");
	}
	static stageW = 0;
	static stageH = 0;
	static debugLog = !1;
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
export { n as a, t as i, r as n, a as r, o as t };

//# sourceMappingURL=CmnLib.js.map