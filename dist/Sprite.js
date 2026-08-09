import { n as e } from "./rolldown-runtime.js";
//#region src/ts/Sprite.ts
var t = /* @__PURE__ */ e({
	aniSpriteClass: () => u,
	aniSpriteCss: () => d,
	loadSheet: () => o,
	parseSheet: () => n,
	setFetch: () => i,
	sheetImgSrc: () => s
});
function n(e, t) {
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
var r = (e, t) => fetch(e, t);
function i(e) {
	r = e;
}
var a = Object.create(null);
function o(e) {
	return a[e] ??= r(e).then(async (e) => {
		if (!e.ok) throw `${String(e.status)} ${e.statusText}`;
		return e.json();
	}).then((t) => n(t, s(e, t))).catch(() => void 0);
}
function s(e, t) {
	let n = t.meta.image ?? "";
	return e.replace(/[^/]*$/, "") + n;
}
var c = Object.create(null), l = 0;
function u(e, t = document) {
	let n = c[e.img];
	if (n) return n;
	let r = c[e.img] = `sn_ani${String(++l)}`, i = t.createElement("style");
	return i.dataset.sn = "sprite", i.textContent = d(e, r), t.head.appendChild(i), r;
}
function d({ img: e, fw: t, fh: n, cols: r, rows: i, cnt: a, sec: o, isCol: s }, c) {
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
export { u as n, o as r, t };

//# sourceMappingURL=Sprite.js.map