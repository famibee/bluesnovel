import { n as e } from "./rolldown-runtime.js";
//#region src/ts/Crypto.ts
var t = {
	png: "image/png",
	jpg: "image/jpeg",
	jpeg: "image/jpeg",
	webp: "image/webp",
	svg: "image/svg+xml",
	mp4: "video/mp4",
	webm: "video/webm"
};
async function n(e, n, r, i) {
	if (!n || !e || e.startsWith("data:") || e.startsWith("blob:") || e.endsWith(".json")) return e;
	let a = t[/\.([a-z0-9]+)$/i.exec(e)?.[1]?.toLowerCase() ?? ""];
	if (!a) return e;
	let o = await i(await (await r(e)).arrayBuffer());
	return URL.createObjectURL(new Blob([o], { type: a }));
}
//#endregion
//#region src/ts/Sprite.ts
var r = /* @__PURE__ */ e({
	aniSpriteClass: () => b,
	aniSpriteCss: () => x,
	getNatSize: () => _,
	loadSheet: () => f,
	parseSheet: () => i,
	setDecFncs: () => u,
	setFetch: () => l,
	setNatSize: () => g,
	sheetImgSrc: () => m
});
function i(e, t) {
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
var a = (e, t) => fetch(e, t), o = (e, t) => Promise.resolve(t), s = (e) => Promise.resolve(e), c = !1;
function l(e) {
	a = e;
}
function u(e, t, n) {
	o = e, s = t, c = n;
}
var d = Object.create(null);
function f(e) {
	return d[e] ??= a(e).then(async (e) => {
		if (!e.ok) throw `${String(e.status)} ${e.statusText}`;
		return o("json", p(await e.arrayBuffer()));
	}).then((e) => JSON.parse(e)).then(async (t) => i(t, await n(m(e, t), c, a, s))).catch(() => void 0);
}
function p(e) {
	let t = new Uint8Array(e);
	return t[0] === 255 && t[1] === 254 ? new TextDecoder("utf-16le").decode(e.slice(2)) : t[0] === 254 && t[1] === 255 ? new TextDecoder("utf-16be").decode(e.slice(2)) : new TextDecoder("utf-8").decode(e);
}
function m(e, t) {
	let n = t.meta.image ?? "";
	return e.replace(/[^/]*$/, "") + n;
}
var h = Object.create(null);
function g(e, t, n) {
	h[e] = {
		w: t,
		h: n
	};
}
function _(e) {
	return h[e];
}
var v = Object.create(null), y = 0;
function b(e, t = document) {
	let n = v[e.img];
	if (n) return n;
	let r = v[e.img] = `sn_ani${String(++y)}`, i = t.createElement("style");
	return i.dataset.sn = "sprite", i.textContent = x(e, r), t.head.appendChild(i), r;
}
function x({ img: e, fw: t, fh: n, cols: r, rows: i, cnt: a, sec: o, isCol: s }, c) {
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
export { g as a, f as i, b as n, n as o, _ as r, r as t };

//# sourceMappingURL=Sprite.js.map