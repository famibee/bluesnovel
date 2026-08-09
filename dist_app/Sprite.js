import { n as e } from "./rolldown-runtime.js";
import { t } from "./Crypto.js";
//#region src/ts/Sprite.ts
var n = /* @__PURE__ */ e({
	aniSpriteClass: () => h,
	aniSpriteCss: () => g,
	loadSheet: () => d,
	parseSheet: () => r,
	setDecFncs: () => l,
	setFetch: () => c,
	sheetImgSrc: () => f
});
function r(e, t) {
	let { frames: n, meta: r } = e, i = Object.values(n ?? {}).map((e) => e.frame), a = i[0];
	if (!a || !r.size) return;
	let { w: o, h: s } = a;
	if (o <= 0 || s <= 0) return;
	let c = (i[1]?.x ?? -1) === a.x && (i[1]?.y ?? -1) !== a.y, l = r.animationSpeed ?? 1;
	return {
		img: t,
		fw: o,
		fh: s,
		cols: Math.max(1, Math.round(r.size.w / o)),
		rows: Math.max(1, Math.round(r.size.h / s)),
		cnt: i.length,
		sec: i.length / (60 * (l > 0 ? l : 1)),
		isCol: c
	};
}
var i = (e, t) => fetch(e, t), a = (e, t) => Promise.resolve(t), o = (e) => Promise.resolve(e), s = !1;
function c(e) {
	i = e;
}
function l(e, t, n) {
	a = e, o = t, s = n;
}
var u = Object.create(null);
function d(e) {
	return u[e] ??= i(e).then(async (e) => {
		if (!e.ok) throw `${String(e.status)} ${e.statusText}`;
		return a("json", await e.text());
	}).then((e) => JSON.parse(e)).then(async (n) => r(n, await t(f(e, n), s, i, o))).catch(() => void 0);
}
function f(e, t) {
	let n = t.meta.image ?? "";
	return e.replace(/[^/]*$/, "") + n;
}
var p = Object.create(null), m = 0;
function h(e, t = document) {
	let n = p[e.img];
	if (n) return n;
	let r = p[e.img] = `sn_ani${String(++m)}`, i = t.createElement("style");
	return i.dataset.sn = "sprite", i.textContent = g(e, r), t.head.appendChild(i), r;
}
function g({ img: e, fw: t, fh: n, cols: r, rows: i, cnt: a, sec: o, isCol: s }, c) {
	let l = (e) => {
		let a = s ? Math.floor(e / i) : e % r, o = s ? e % i : Math.floor(e / r);
		return `${String(-a * t)}px ${String(-o * n)}px`;
	};
	return `@keyframes ${c}_f {
${Array.from({ length: a }, (e, t) => `\t${String(Math.round(t / a * 1e6) / 1e4)}% {background-position: ${l(t)}; animation-timing-function: step-end;}`).join("\n")}
	100% {background-position: ${l(0)};}
}
.${c} {
	display: inline-block;
	width: ${String(t)}px;
	height: ${String(n)}px;
	background-image: url(${JSON.stringify(e)});
	background-repeat: no-repeat;
	background-position: 0 0;
	animation: ${c}_f ${String(o)}s infinite;
}`;
}
//#endregion
export { h as n, d as r, n as t };

//# sourceMappingURL=Sprite.js.map