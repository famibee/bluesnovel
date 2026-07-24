//#region src/ts/Filter.ts
function e(e, t, n) {
	let r = e[t];
	if (r === void 0) return n;
	let i = r.startsWith("0x") ? parseInt(r.slice(2), 16) : Number(r);
	if (!Number.isFinite(i)) throw `[add_filter] ${t}の値が不正です：${r}`;
	return i;
}
var t = {
	blur: (t) => `blur(${String(e(t, "strength", 8))}px)`,
	brightness: (t) => `brightness(${String(e(t, "b", .5))})`,
	contrast: (t) => `contrast(${String(e(t, "amount", .5))})`,
	grayscale: (t) => `grayscale(${String(e(t, "scale", .5))})`,
	black_and_white: () => "grayscale(1)",
	negative: () => "invert(1)",
	saturate: (t) => `saturate(${String(1 + e(t, "amount", .5))})`,
	hue: (t) => `hue-rotate(${String(e(t, "rotation", 0))}deg)`,
	sepia: () => "sepia(1)"
}, n = [
	"noise",
	"color_matrix",
	"browni",
	"color_tone",
	"kodachrome",
	"lsd",
	"night",
	"polaroid",
	"predator",
	"technicolor",
	"tint",
	"to_bgr",
	"vintage"
];
function r(e) {
	let { filter: r = "" } = e, i = t[r];
	if (!i) throw n.includes(r) ? `filter【${r}】はbluesnovelでは未対応です（CSSのfilterで表現できないため。対応可能なのは ${Object.keys(t).join("/")}）` : "filter が異常です";
	return {
		css: i(e),
		enabled: (e.enable_filter ?? "true") !== "false"
	};
}
function i(e) {
	return e.filter((e) => e.enabled).map((e) => e.css).join(" ");
}
//#endregion
export { i as n, r as t };

//# sourceMappingURL=Filter.js.map