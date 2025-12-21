import { n as __toDynamicImportESM } from "./chunk.js";
function int(e) {
	return parseInt(String(e), 10);
}
function uint(e) {
	let r = parseInt(String(e), 10);
	return r < 0 ? -r : r;
}
var CmnLib = class {
	static async init() {
		let r = await import("./platform.js").then(__toDynamicImportESM(1));
		this.platform = JSON.stringify(r), this.plat_desc = r.description ?? "", this.isSafari = r.name === "Safari", this.isFirefox = r.name === "Firefox", this.isMac = (r.os?.family ?? "").includes("OS X"), this.isMobile = !/(Windows|OS X)/.test(r.os?.family ?? "");
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
export { int as n, uint as r, CmnLib as t };

//# sourceMappingURL=CmnLib.js.map