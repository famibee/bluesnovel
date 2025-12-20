import { t as CmnLib } from "./CmnLib.js";
import { n as SEARCH_PATH_ARG_EXT, t as ConfigBase } from "./ConfigBase.js";
var Config = class r extends ConfigBase {
	static async generate(e) {
		let t = new r(e), n = e.arg.cur + "prj.json", i = await fetch(n);
		if (!i.ok) throw Error(i.statusText);
		let a = await e.dec(n, await i.text());
		return await t.load(JSON.parse(a)), t;
	}
	constructor(e) {
		super(e), this.sys = e;
	}
	async load(t) {
		await super.load(t), CmnLib.stageW = t.window.width, CmnLib.stageH = t.window.height, CmnLib.debugLog = t.debug.debugLog;
	}
	searchPath(e, n = SEARCH_PATH_ARG_EXT.DEFAULT) {
		return e.startsWith("downloads:/") ? this.sys.path_downloads + e.slice(11) : e.startsWith("userdata:/") ? this.sys.path_userdata + "storage/" + e.slice(10) : super.searchPath(e, n);
	}
};
export { Config };

//# sourceMappingURL=Config.js.map