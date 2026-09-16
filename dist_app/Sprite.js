import { n as e } from "./rolldown-runtime.js";
import { a as t } from "./CmnLib.js";
import { n } from "./ConfigBase.js";
//#region src/ts/Crypto.ts
var r = {
	png: "image/png",
	jpg: "image/jpeg",
	jpeg: "image/jpeg",
	webp: "image/webp",
	svg: "image/svg+xml",
	mp4: "video/mp4",
	webm: "video/webm"
};
async function i(e, t, n, i) {
	if (!t || !e || e.startsWith("data:") || e.startsWith("blob:") || e.endsWith(".json")) return e;
	let a = r[/\.([a-z0-9]+)$/i.exec(e)?.[1]?.toLowerCase() ?? ""];
	if (!a) return e;
	let o = await i(await (await n(e)).arrayBuffer());
	return URL.createObjectURL(new Blob([o], { type: a }));
}
//#endregion
//#region src/ts/Sprite.ts
var a = /* @__PURE__ */ e({
	aniSpriteClass: () => w,
	aniSpriteCss: () => T,
	getNatSize: () => x,
	loadSheet: () => g,
	parseSheet: () => o,
	setDecFncs: () => f,
	setFetch: () => d,
	setNatSize: () => b,
	setSearchPath: () => m,
	sheetImgSrc: () => v
});
function o(e, t) {
	let { frames: n, meta: r } = e, i = Object.values(n ?? {}), a = i[0];
	if (!a || !r.size) return;
	let { w: o, h: s } = a.sourceSize ?? a.frame;
	if (o <= 0 || s <= 0) return;
	let c = r.animationSpeed ?? 1;
	return {
		img: t,
		boxW: o,
		boxH: s,
		frames: i.map(({ frame: e, spriteSourceSize: t }) => ({
			x: e.x,
			y: e.y,
			w: e.w,
			h: e.h,
			ox: t?.x ?? 0,
			oy: t?.y ?? 0
		})),
		cnt: i.length,
		sec: i.length / (60 * (c > 0 ? c : 1))
	};
}
var s = (e, t) => fetch(e, t), c = (e, t) => Promise.resolve(t), l = (e) => Promise.resolve(e), u = !1;
function d(e) {
	s = e;
}
function f(e, t, n) {
	c = e, l = t, u = n;
}
var p;
function m(e) {
	p = e;
}
var h = Object.create(null);
function g(e) {
	return h[e] ??= s(e).then(async (e) => {
		if (!e.ok) throw `${String(e.status)} ${e.statusText}`;
		return c("json", _(await e.arrayBuffer()));
	}).then((e) => JSON.parse(e)).then(async (t) => o(t, await i(v(e, t), u, s, l))).catch(() => void 0);
}
function _(e) {
	let t = new Uint8Array(e);
	return t[0] === 255 && t[1] === 254 ? new TextDecoder("utf-16le").decode(e.slice(2)) : t[0] === 254 && t[1] === 255 ? new TextDecoder("utf-16be").decode(e.slice(2)) : new TextDecoder("utf-8").decode(e);
}
function v(e, r) {
	let i = r.meta.image ?? "";
	if (p) try {
		return p(t(i), n.SP_GSM);
	} catch {}
	return e.replace(/[^/]*$/, "") + i;
}
var y = Object.create(null);
function b(e, t, n) {
	y[e] = {
		w: t,
		h: n
	};
}
function x(e) {
	return y[e];
}
var S = Object.create(null), C = 0;
function w(e, t = document) {
	let n = S[e.img];
	if (n) return n;
	let r = S[e.img] = `sn_ani${String(++C)}`, i = t.createElement("style");
	return i.dataset.sn = "sprite", i.textContent = T(e, r), t.head.appendChild(i), r;
}
function T({ img: e, boxW: t, boxH: n, frames: r, cnt: i, sec: a }, o) {
	let s = ({ x: e, y: r, w: i, h: a, ox: o, oy: s }) => `background-position: ${String(-e + o)}px ${String(-r + s)}px; clip-path: inset(${String(s)}px ${String(t - o - i)}px ${String(n - s - a)}px ${String(o)}px);`;
	return `@keyframes ${o}_f {
${r.map((e, t) => `\t${String(Math.round(t / i * 1e6) / 1e4)}% {${s(e)} animation-timing-function: step-end;}`).join("\n")}
	100% {${s(r[0])}}
}
.${o} {
	display: inline-block;
	width: ${String(t)}px;
	height: ${String(n)}px;
	background-image: url(${JSON.stringify(e)});
	background-repeat: no-repeat;
	background-position: 0 0;
	animation: ${o}_f ${String(a)}s infinite;
	/* 不可視 back ページではコマ送りを止める（backpage-perf.md）。既定は running。
		Stage.tsx が back ページの div へ --sn-ani-play:paused を撒き、子孫の全シート
		（grp 基本画像・face・[graph]・待ちマーク）へ一括で効かせる */
	animation-play-state: var(--sn-ani-play, running);
}`;
}
//#endregion
export { b as a, g as i, w as n, i as o, x as r, a as t };

//# sourceMappingURL=Sprite.js.map