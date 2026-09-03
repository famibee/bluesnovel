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
function a(e) {
	return typeof e == "number" ? { duration: e } : e ?? {};
}
function o(e, t, n) {
	let r = e[t];
	if (r === void 0) return n;
	let i = Number(r);
	if (!Number.isFinite(i)) throw `[add_fx] ${t} の値が不正です：${r}`;
	return i;
}
function s(s, c) {
	let l = s.fx ?? "";
	if (!l) throw "[add_fx] fx=（プリセット名）が必要です";
	if (!e.includes(l) && !(c && l in c)) throw `[add_fx] fx【${l}】は未対応です（組み込み：${e.join(" / ")}／または [def_fx] で定義した名前）`;
	let u = a(c?.[l]), d = { ...t[l] };
	for (let e of r) s[e] !== void 0 && (d[e] = o(s, e, 0));
	let f = (s.loop ?? "true") !== "false", p = o(s, "time", 0);
	if (!f && p <= 0) {
		let e = n[l] ?? u.duration;
		if (!e) throw `[add_fx] loop=false を使うには [def_fx name=${l} duration=…]（ms）の宣言が必要です`;
		p = e;
	}
	return {
		name: s.name ?? "",
		fx: l,
		time: p,
		speed: o(s, "speed", 1),
		enabled: (s.enabled ?? "true") !== "false",
		params: d,
		...s.color === void 0 ? {} : { color: i(s.color) },
		...u.pad ? { pad: u.pad } : {},
		...u.padB ? { padB: u.padB } : {}
	};
}
//#endregion
export { e as n, s as r, r as t };

//# sourceMappingURL=Fx.js.map