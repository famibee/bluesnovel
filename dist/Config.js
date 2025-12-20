import { n as SEARCH_PATH_ARG_EXT, r as CmnLib, t as ConfigBase } from "./ConfigBase.js";
var Config = class r extends ConfigBase {
	static async generate(e) {
		let t = new r(e), n = e.arg.cur + "prj.json", i = await e.fetch(n);
		if (!i.ok) throw Error(i.statusText);
		let a = await e.dec(n, await i.text());
		return await t.load(JSON.parse(a)), t;
	}
	constructor(e) {
		super(e), this.sys = e;
	}
	async load(e) {
		await super.load(e), CmnLib.stageW = e.window.width, CmnLib.stageH = e.window.height, CmnLib.debugLog = e.debug.debugLog;
	}
	searchPath(t, n = SEARCH_PATH_ARG_EXT.DEFAULT) {
		return t.startsWith("downloads:/") ? this.sys.path_downloads + t.slice(11) : t.startsWith("userdata:/") ? this.sys.path_userdata + "storage/" + t.slice(10) : super.searchPath(t, n);
	}
};
export { Config };

//# sourceMappingURL=Config.js.map