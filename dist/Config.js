import { i as e, t } from "./CmnLib.js";
import { n, t as r } from "./ConfigBase.js";
//#region src/sn/Config.ts
var i = "userdata:/", a = "downloads:/", o = class i extends r {
	sys;
	static async generate(e) {
		let t = new i(e), n = e.arg.cur + "prj.json", r = await e.fetch(n);
		if (!r.ok) throw Error(r.statusText);
		let a = await e.dec(n, await r.text());
		return await t.load(JSON.parse(a)), t;
	}
	constructor(e) {
		super(e), this.sys = e;
	}
	async load(n) {
		n.window ??= {
			width: 300,
			height: 300
		}, t.stageW = n.window.width, t.stageH = n.window.height, t.debugLog = n.debug.debugLog, t.masume = n.debug.masume, t.init(), await super.load(n), t.bgColor = e(this.oCfg.init.bg_color);
	}
	searchPath(e, t = n.DEFAULT) {
		return e.startsWith("downloads:/") ? this.sys.path_downloads + e.slice(11) : e.startsWith("userdata:/") ? this.sys.path_userdata + "storage/" + e.slice(10) : super.searchPath(e, t);
	}
};
//#endregion
export { o as Config, a as PROTOCOL_DL, i as PROTOCOL_USERDATA };

//# sourceMappingURL=Config.js.map