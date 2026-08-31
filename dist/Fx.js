//#region src/ts/Fx.ts
var e = [
	"wave",
	"rgbShift",
	"snow",
	"rain"
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
	}
}, n = [
	"amp",
	"freq",
	"shift",
	"p1",
	"p2",
	"p3",
	"p4"
];
function r(e) {
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
function i(e, t, n) {
	let r = e[t];
	if (r === void 0) return n;
	let i = Number(r);
	if (!Number.isFinite(i)) throw `[add_fx] ${t} の値が不正です：${r}`;
	return i;
}
function a(a, o) {
	let s = a.fx ?? "";
	if (!s) throw "[add_fx] fx=（プリセット名）が必要です";
	if (!e.includes(s) && !(o && s in o)) throw `[add_fx] fx【${s}】は未対応です（組み込み：${e.join(" / ")}／または [def_fx] で定義した名前）`;
	let c = { ...t[s] };
	for (let e of n) a[e] !== void 0 && (c[e] = i(a, e, 0));
	return {
		name: a.name ?? "",
		fx: s,
		time: i(a, "time", 0),
		speed: i(a, "speed", 1),
		enabled: (a.enabled ?? "true") !== "false",
		params: c,
		...a.color === void 0 ? {} : { color: r(a.color) }
	};
}
//#endregion
export { e as n, a as r, n as t };

//# sourceMappingURL=Fx.js.map