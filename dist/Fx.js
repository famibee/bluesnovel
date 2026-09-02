//#region src/ts/Fx.ts
var e = [
	"wave",
	"rgbShift",
	"snow",
	"rain",
	"fireworks"
], t = {
	wave: {
		amp: 6,
		freq: 2
	},
	rgbShift: { shift: 4 },
	snow: {
		amp: 1,
		freq: 3
	},
	rain: {
		amp: 2,
		freq: 2,
		shift: 6
	},
	fireworks: {
		amp: 1,
		freq: 1,
		p1: .25,
		p2: 0
	}
}, n = { fireworks: 4e3 }, r = [
	"amp",
	"freq",
	"shift",
	"p1",
	"p2",
	"p3",
	"p4"
];
function i(e) {
	let t = e.trim();
	if (t.includes(",")) {
		let n = t.split(",").map((e) => Number(e.trim()));
		if (n.length === 3 && n.every((e) => Number.isFinite(e))) return [
			n[0],
			n[1],
			n[2]
		].map((e) => Math.min(1, Math.max(0, e)));
		throw `[add_fx] color= の値が不正です：${e}`;
	}
	let n = t.startsWith("#") ? t.slice(1) : t.startsWith("0x") ? t.slice(2) : t, r = parseInt(n, 16);
	if (n.length !== 6 || !Number.isFinite(r)) throw `[add_fx] color= の値が不正です：${e}`;
	return [
		(r >> 16 & 255) / 255,
		(r >> 8 & 255) / 255,
		(r & 255) / 255
	];
}
function a(e, t, n) {
	let r = e[t];
	if (r === void 0) return n;
	let i = Number(r);
	if (!Number.isFinite(i)) throw `[add_fx] ${t} の値が不正です：${r}`;
	return i;
}
function o(o, s) {
	let c = o.fx ?? "";
	if (!c) throw "[add_fx] fx=（プリセット名）が必要です";
	if (!e.includes(c) && !(s && c in s)) throw `[add_fx] fx【${c}】は未対応です（組み込み：${e.join(" / ")}／または [def_fx] で定義した名前）`;
	let l = { ...t[c] };
	for (let e of r) o[e] !== void 0 && (l[e] = a(o, e, 0));
	let u = (o.loop ?? "true") !== "false", d = a(o, "time", 0);
	if (!u && d <= 0) {
		let e = n[c] ?? s?.[c];
		if (!e) throw `[add_fx] loop=false を使うには [def_fx name=${c} duration=…]（ms）の宣言が必要です`;
		d = e;
	}
	return {
		name: o.name ?? "",
		fx: c,
		time: d,
		speed: a(o, "speed", 1),
		enabled: (o.enabled ?? "true") !== "false",
		params: l,
		...o.color === void 0 ? {} : { color: i(o.color) }
	};
}
//#endregion
export { e as n, o as r, r as t };

//# sourceMappingURL=Fx.js.map