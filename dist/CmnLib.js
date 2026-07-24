import { n as e } from "./rolldown-runtime.js";
//#region src/sn/CmnLib.ts
function t(e) {
	return parseInt(String(e), 10);
}
function n(e) {
	let t = parseInt(String(e), 10);
	return t < 0 ? -t : t;
}
var r = /^[^/.]+$|[^/]+(?=\.)/;
function i(e) {
	return (r.exec(e) ?? [""])[0];
}
var a = class {
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
export { n as i, i as n, t as r, a as t };

//# sourceMappingURL=CmnLib.js.map