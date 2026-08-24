import { n as e } from "./rolldown-runtime.js";
//#region src/sn/LayCls.ts
var t = /* @__PURE__ */ e({
	A_BUILTIN_LAY_CLS: () => n,
	addLayCls: () => i,
	getLayCls: () => a,
	hasLayCls: () => o
}), n = ["grp", "txt"], r = new Map(n.map((e) => [e, null]));
function i(e, t) {
	if (r.has(e)) throw `すでに定義済みのレイヤcls【${e}】です`;
	r.set(e, t);
}
function a(e) {
	return r.get(e) ?? void 0;
}
function o(e) {
	return r.has(e);
}
//#endregion
export { a as n, o as r, t };

//# sourceMappingURL=LayCls.js.map