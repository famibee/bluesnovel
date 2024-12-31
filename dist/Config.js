import { C as e } from "./CmnLib.js";
import { C as c, S as d } from "./ConfigBase.js";
class o extends c {
  constructor(t) {
    super(t), this.sys = t;
  }
  static async generate(t) {
    const a = new o(t), r = t.arg.cur + "prj.json", s = await t.fetch(r);
    if (!s.ok) throw Error(s.statusText);
    const i = await t.dec(r, await s.text());
    return await a.load(JSON.parse(i)), a;
  }
  async load(t) {
    await super.load(t), e.stageW = t.window.width, e.stageH = t.window.height, e.debugLog = t.debug.debugLog;
  }
  searchPath(t, a = d.DEFAULT) {
    return t.startsWith("downloads:/") ? this.sys.path_downloads + t.slice(11) : t.startsWith("userdata:/") ? this.sys.path_userdata + "storage/" + t.slice(10) : super.searchPath(t, a);
  }
}
export {
  o as Config
};
//# sourceMappingURL=Config.js.map
