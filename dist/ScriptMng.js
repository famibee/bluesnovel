class a {
  constructor(s) {
    this.sys = s;
  }
  async load(s) {
    const t = await fetch(this.sys.arg.cur + "script/" + s + ".sn");
    if (!t.ok) throw `Err load fn:${s}`;
    const c = await this.sys.dec(s, await t.text());
    console.log(`fn:ScriptMng.ts scr:${c.slice(0, 20)}`);
    const { Stage: i } = await import("./Stage.js");
    new i(this.sys).init__();
  }
}
export {
  a as ScriptMng
};
//# sourceMappingURL=ScriptMng.js.map
