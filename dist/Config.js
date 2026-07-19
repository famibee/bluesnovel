import { n as e, r as t, t as n } from "./ConfigBase.js";
//#region src/sn/Config.ts
var r = "userdata:/", i = "downloads:/", a = class r extends n {
	sys;
	static async generate(e) {
		let t = new r(e), n = e.arg.cur + "prj.json", i = await fetch(n);
		if (!i.ok) throw Error(i.statusText);
		let a = await e.dec(n, await i.text());
		return await t.load(JSON.parse(a)), t;
	}
	constructor(e) {
		super(e), this.sys = e;
	}
	async load(e) {
		return e.window ??= {
			width: 300,
			height: 300
		}, t.stageW = e.window.width, t.stageH = e.window.height, t.debugLog = e.debug.debugLog, await t.init(), super.load(e);
	}
	searchPath(t, n = e.DEFAULT) {
		return t.startsWith("downloads:/") ? this.sys.path_downloads + t.slice(11) : t.startsWith("userdata:/") ? this.sys.path_userdata + "storage/" + t.slice(10) : super.searchPath(t, n);
	}
};
//#endregion
export { a as Config, i as PROTOCOL_DL, r as PROTOCOL_USERDATA };

//# sourceMappingURL=Config.js.map