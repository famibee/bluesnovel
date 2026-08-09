//#region src/ts/Crypto.ts
var e = {
	png: "image/png",
	jpg: "image/jpeg",
	jpeg: "image/jpeg",
	webp: "image/webp",
	svg: "image/svg+xml",
	mp4: "video/mp4",
	webm: "video/webm"
};
async function t(t, n, r, i) {
	if (!n || !t || t.startsWith("data:") || t.startsWith("blob:") || t.endsWith(".json")) return t;
	let a = e[/\.([a-z0-9]+)$/i.exec(t)?.[1]?.toLowerCase() ?? ""];
	if (!a) return t;
	let o = await i(await (await r(t)).arrayBuffer());
	return URL.createObjectURL(new Blob([o], { type: a }));
}
//#endregion
export { t };

//# sourceMappingURL=Crypto.js.map