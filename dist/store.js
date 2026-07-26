import { n as e } from "./rolldown-runtime.js";
import { t } from "./react.js";
//#region src/ts/Filter.ts
var n = /* @__PURE__ */ e(t(), 1);
function r(e, t, n) {
	let r = e[t];
	if (r === void 0) return n;
	let i = r.startsWith("0x") ? parseInt(r.slice(2), 16) : Number(r);
	if (!Number.isFinite(i)) throw `[add_filter] ${t}の値が不正です：${r}`;
	return i;
}
var i = {
	blur: (e) => `blur(${String(r(e, "strength", 8))}px)`,
	brightness: (e) => `brightness(${String(r(e, "b", .5))})`,
	contrast: (e) => `contrast(${String(r(e, "amount", .5))})`,
	grayscale: (e) => `grayscale(${String(r(e, "scale", .5))})`,
	black_and_white: () => "grayscale(1)",
	negative: () => "invert(1)",
	saturate: (e) => `saturate(${String(1 + r(e, "amount", .5))})`,
	hue: (e) => `hue-rotate(${String(r(e, "rotation", 0))}deg)`,
	sepia: () => "sepia(1)"
}, a = ["noise"], o = {
	to_bgr: () => [
		0,
		0,
		1,
		0,
		0,
		0,
		1,
		0,
		0,
		0,
		1,
		0,
		0,
		0,
		0,
		0,
		0,
		0,
		1,
		0
	],
	lsd: () => [
		2,
		-.4,
		.5,
		0,
		0,
		-.5,
		2,
		-.4,
		0,
		0,
		-.4,
		-.5,
		3,
		0,
		0,
		0,
		0,
		0,
		1,
		0
	],
	polaroid: () => [
		1.438,
		-.062,
		-.062,
		0,
		0,
		-.122,
		1.378,
		-.122,
		0,
		0,
		-.016,
		-.016,
		1.483,
		0,
		0,
		0,
		0,
		0,
		1,
		0
	],
	technicolor: () => [
		1.9125277891456083,
		-.8545344976951645,
		-.09155508482755585,
		0,
		11.793603434377337 / 255,
		-.3087833385928097,
		1.7658908555458428,
		-.10601743074722245,
		0,
		-70.35205161461398 / 255,
		-.231103377548616,
		-.7501899197440212,
		1.847597816108189,
		0,
		30.950940869491138 / 255,
		0,
		0,
		0,
		1,
		0
	],
	kodachrome: () => [
		1.1285582396593525,
		-.3967382283601348,
		-.03992559172921793,
		0,
		63.72958762196502 / 255,
		-.16404339962244616,
		1.0835251566291304,
		-.05498805115633132,
		0,
		24.732407896706203 / 255,
		-.16786010706155763,
		-.5603416277695248,
		1.6014850761964943,
		0,
		35.62982807460946 / 255,
		0,
		0,
		0,
		1,
		0
	],
	browni: () => [
		.5997023498159715,
		.34553243048391263,
		-.2708298674538042,
		0,
		47.43192855600873 / 255,
		-.037703249837783157,
		.8609577587992641,
		.15059552388459913,
		0,
		-36.96841498319127 / 255,
		.24113635128153335,
		-.07441037908422492,
		.44972182064877153,
		0,
		-7.562075277591283 / 255,
		0,
		0,
		0,
		1,
		0
	],
	vintage: () => [
		.6279345635605994,
		.3202183420819367,
		-.03965408211312453,
		0,
		9.651285835294123 / 255,
		.02578397704808868,
		.6441188644374771,
		.03259127616149294,
		0,
		7.462829176470591 / 255,
		.0466055556782719,
		-.0851232987247891,
		.5241648018700465,
		0,
		5.159190588235296 / 255,
		0,
		0,
		0,
		1,
		0
	],
	tint: (e) => {
		let t = r(e, "f_color", 8947848);
		return [
			(t >> 16 & 255) / 255,
			0,
			0,
			0,
			0,
			0,
			(t >> 8 & 255) / 255,
			0,
			0,
			0,
			0,
			0,
			(t & 255) / 255,
			0,
			0,
			0,
			0,
			0,
			1,
			0
		];
	},
	night: (e) => {
		let t = r(e, "intensity", .5);
		return [
			t * -2,
			-t,
			0,
			0,
			0,
			-t,
			0,
			t,
			0,
			0,
			0,
			t,
			t * 2,
			0,
			0,
			0,
			0,
			0,
			1,
			0
		];
	},
	predator: (e) => {
		let t = r(e, "amount", .5);
		return [
			11.224130630493164 * t,
			-4.794486999511719 * t,
			-2.8746118545532227 * t,
			0,
			.40342438220977783 * t,
			-3.6330697536468506 * t,
			9.193157196044922 * t,
			-2.951810836791992 * t,
			0,
			-1.316135048866272 * t,
			-3.2184197902679443 * t,
			-4.2375030517578125 * t,
			7.476448059082031 * t,
			0,
			.8044459223747253 * t,
			0,
			0,
			0,
			1,
			0
		];
	},
	color_tone: (e) => {
		let t = r(e, "desaturation", .5), n = r(e, "toned", .5), i = r(e, "light_color", 16770432), a = r(e, "dark_color", 16770432), o = (i >> 16 & 255) / 255, s = (i >> 8 & 255) / 255, c = (i & 255) / 255, l = (a >> 16 & 255) / 255, u = (a >> 8 & 255) / 255, d = (a & 255) / 255;
		return [
			.3,
			.59,
			.11,
			0,
			0,
			o,
			s,
			c,
			t,
			0,
			l,
			u,
			d,
			n,
			0,
			o - l,
			s - u,
			c - d,
			0,
			0
		];
	},
	color_matrix: (e) => {
		let { matrix: t = "" } = e;
		if (t) {
			let e = t.split(",").map((e) => Number(e));
			if (e.length !== 20) throw `matrix の個数（${String(e.length)}）が 20 ではありません`;
			if (e.some((e) => !Number.isFinite(e))) throw "[add_filter] matrix に数値でない値があります";
			return e;
		}
		return [
			r(e, "rtor", 1),
			r(e, "gtor", 0),
			r(e, "btor", 0),
			r(e, "ator", 0),
			r(e, "pr", 0),
			r(e, "rtog", 0),
			r(e, "gtog", 1),
			r(e, "btog", 0),
			r(e, "atog", 0),
			r(e, "pg", 0),
			r(e, "rtob", 0),
			r(e, "gtob", 0),
			r(e, "btob", 1),
			r(e, "atob", 0),
			r(e, "pb", 0),
			r(e, "rtoa", 0),
			r(e, "gtoa", 0),
			r(e, "btoa", 0),
			r(e, "atoa", 1),
			r(e, "pa", 0)
		];
	}
};
function s(e) {
	let t = 0, n = e.join(",");
	for (let e = 0; e < n.length; ++e) t = Math.imul(t, 31) + n.charCodeAt(e) | 0;
	return `sn_cm_${(t >>> 0).toString(36)}`;
}
var c = (e) => e.join(" ");
function l(e) {
	let { filter: t = "" } = e, n = o[t];
	if (n) {
		let t = n(e);
		return {
			css: `url(#${s(t)})`,
			enabled: (e.enable_filter ?? "true") !== "false",
			mat: t
		};
	}
	let r = i[t];
	if (!r) throw a.includes(t) ? `filter【${t}】はbluesnovelでは未対応です（CSSのfilterにもSVGのfeColorMatrixにも相当が無いため）` : "filter が異常です";
	return {
		css: r(e),
		enabled: (e.enable_filter ?? "true") !== "false"
	};
}
function u(e) {
	return e.filter((e) => e.enabled && e.mat).map((e) => e.mat);
}
function d(e) {
	return e.filter((e) => e.enabled).map((e) => e.css).join(" ");
}
//#endregion
//#region src/components/Lay.ts
var f = [
	"visible",
	"alpha",
	"left",
	"top",
	"align_x",
	"align_y",
	"s_right",
	"s_bottom",
	"rotation",
	"scale_x",
	"scale_y",
	"pivot_x",
	"pivot_y",
	"blendmode",
	"aFlt"
];
function p(e) {
	let t = {};
	if (e.s_right === void 0 ? e.left !== void 0 && (t.left = `${String(e.left)}px`) : t.right = `${String(e.s_right)}px`, e.s_bottom === void 0 ? e.top !== void 0 && (t.top = `${String(e.top)}px`) : t.bottom = `${String(e.s_bottom)}px`, (e.align_x !== void 0 || e.align_y !== void 0) && (t.translate = `${e.align_x === "center" ? "-50%" : e.align_x === "right" ? "-100%" : "0"} ${e.align_y === "middle" ? "-50%" : e.align_y === "bottom" ? "-100%" : "0"}`), e.alpha !== void 0 && (t.opacity = e.alpha), (e.rotation !== void 0 || e.scale_x !== void 0 || e.scale_y !== void 0 || e.pivot_x !== void 0 || e.pivot_y !== void 0) && (t.transform = `rotate(${String(e.rotation ?? 0)}deg) scale(${String(e.scale_x ?? 1)}, ${String(e.scale_y ?? 1)})`, t.transformOrigin = `${String(e.pivot_x ?? 0)}px ${String(e.pivot_y ?? 0)}px`), e.blendmode !== void 0 && (t.mixBlendMode = e.blendmode), e.aFlt !== void 0) {
		let n = d(e.aFlt);
		n && (t.filter = n);
	}
	return e.visible === !1 && (t.display = "none"), t;
}
var m = !1, h = () => {
	m = !0;
}, g = () => {
	m = !1;
}, _ = () => m, v = {
	wait: 500,
	alpha: 0,
	x: "=0.3",
	y: "=0",
	scale_x: 1,
	scale_y: 1,
	rotate: 0,
	join: !0,
	ease: "ease-out"
}, y = {
	wait: 0,
	alpha: 0,
	x: "=0",
	y: "=0",
	scale_x: 1,
	scale_y: 1,
	rotate: 0,
	join: !1,
	ease: "ease-out"
}, b = /[{\s.,*]/, x = (e, t, n, r) => {
	if (n === void 0) return r;
	let i = Number(n);
	if (!Number.isFinite(i)) throw `[${e}] ${t}【${n}】は数値ではありません`;
	return i;
};
function S(e, t, n) {
	let r = t.name ?? "";
	if (!r) throw `[${e}] nameは必須です`;
	if (b.test(r)) throw `[${e}] name【${r}】に使えない文字が含まれます`;
	return {
		name: r,
		sty: {
			wait: x(e, "wait", t.wait, 500),
			alpha: x(e, "alpha", t.alpha, 0),
			x: t.x ?? "=0",
			y: t.y ?? "=0",
			scale_x: x(e, "scale_x", t.scale_x, 1),
			scale_y: x(e, "scale_y", t.scale_y, 1),
			rotate: x(e, "rotate", t.rotate, 0),
			join: (t.join ?? String(n)) !== "false",
			ease: t.ease ?? "ease-out"
		}
	};
}
function C(e) {
	let t = e.startsWith("="), n = parseFloat(t ? e.slice(1) : e);
	return Number.isFinite(n) ? t ? `${n}em` : `${n}px` : "0px";
}
function w(e) {
	switch (e.trim()) {
		case "linear": return "none";
		case "ease-in": return "power1.in";
		case "ease-in-out": return "power1.inOut";
		case "ease": return "power1.inOut";
		case "ease-out": return "power1.out";
		default: return "power1.out";
	}
}
function T(e) {
	return {
		from: {
			opacity: e.alpha,
			x: C(e.x),
			y: C(e.y),
			scaleX: e.scale_x,
			scaleY: e.scale_y,
			rotation: e.rotate
		},
		to: {
			opacity: 1,
			x: 0,
			y: 0,
			scaleX: 1,
			scaleY: 1,
			rotation: 0,
			duration: e.wait / 1e3,
			ease: w(e.ease)
		}
	};
}
//#endregion
//#region node_modules/zustand/esm/vanilla.mjs
var E = (e) => {
	let t, n = /* @__PURE__ */ new Set(), r = (e, r) => {
		let i = typeof e == "function" ? e(t) : e;
		if (!Object.is(i, t)) {
			let e = t;
			t = r ?? (typeof i != "object" || !i) ? i : Object.assign({}, t, i), n.forEach((n) => n(t, e));
		}
	}, i = () => t, a = {
		setState: r,
		getState: i,
		getInitialState: () => o,
		subscribe: (e) => (n.add(e), () => n.delete(e))
	}, o = t = e(r, i, a);
	return a;
}, D = ((e) => e ? E(e) : E), O = (e) => e;
function k(e, t = O) {
	let r = n.useSyncExternalStore(e.subscribe, n.useCallback(() => t(e.getState()), [e, t]), n.useCallback(() => t(e.getInitialState()), [e, t]));
	return n.useDebugValue(r), r;
}
var A = (e) => {
	let t = D(e), n = (e) => k(t, e);
	return Object.assign(n, t), n;
}, j = ((e) => e ? A(e) : A), M = "'Hiragino Sans', 'Hiragino Kaku Gothic ProN', '游ゴシック Medium', meiryo, sans-serif";
function N(e, t) {
	let n = t === "fore" ? e.foreIdx : 1 - e.foreIdx;
	return {
		idx: n,
		aLay: [...e.aPage[n]]
	};
}
function P(e, t, n) {
	let r = [e.aPage[0], e.aPage[1]];
	return r[t] = n, { aPage: r };
}
function F(e, t) {
	let n = e.foreIdx, r = 1 - n, i = e.aPage[n], a = e.aPage[r], o = (e) => t !== null && !t.includes(e), s = (e, t) => e.map((e) => o(e.nm) ? t.find((t) => t.nm === e.nm) ?? e : e), c = [[], []];
	return c[r] = s(a, i), c[n] = s(i, a), c[n] = c[n].map((e) => o(e.nm) ? e : structuredClone(c[r].find((t) => t.nm === e.nm) ?? e)), {
		aPage: c,
		foreIdx: r,
		trans: null
	};
}
function I(e, t, n) {
	let r = e.find((e) => e.nm === t);
	if (!r) throw `存在しないレイヤ ${t} です`;
	if (r.cls !== n) throw `${t} は${n === "grp" ? "画像" : "文字"}レイヤではありません`;
	return r;
}
var L = j()((e, t) => ({
	txt: "",
	addTxt: (t) => e((e) => ({ txt: e.txt + t })),
	clearTxt: () => e(() => ({ txt: "" })),
	aPage: [[], []],
	foreIdx: 0,
	hChIn: { default: v },
	hChOut: { default: y },
	defChStyle: ({ kind: t, nm: n, sty: r }) => e((e) => t === "in" ? { hChIn: {
		...e.hChIn,
		[n]: r
	} } : { hChOut: {
		...e.hChOut,
		[n]: r
	} }),
	chWait: 10,
	setChWait: (t) => e(() => ({ chWait: t })),
	autowc: {
		enabled: !1,
		h: {}
	},
	setAutowc: (t) => e(() => ({ autowc: t })),
	replace: (t) => e(() => JSON.parse(t)),
	addLayer: (t) => e((e) => {
		if (e.aPage[0].some((e) => e.nm === t.nm)) throw `レイヤ名 ${t.nm} は既に使用されています（既存の${e.aPage[0].find((e) => e.nm === t.nm).cls}レイヤと重複）`;
		return { aPage: [[...e.aPage[0], structuredClone(t)], [...e.aPage[1], structuredClone(t)]] };
	}),
	addBtn: ({ layerNm: t, page: n, nm: r, text: i, label: a, call: o, fn: s, sty: c }) => e((e) => {
		let { idx: l, aLay: u } = N(e, n), d = I(u, t, "txt");
		if (r === void 0) r = `${a || s || "btn"}#${String(d.aBtn.length)}`;
		else if (d.aBtn.some((e) => e.nm === r)) throw `ボタン名 ${r} はレイヤ ${t} 内で既に使用されています`;
		return d.aBtn = [...d.aBtn, {
			nm: r,
			text: i,
			label: a,
			...o === void 0 ? {} : { call: o },
			...s === void 0 ? {} : { fn: s },
			...c === void 0 ? {} : { sty: c }
		}], P(e, l, u);
	}),
	chgPic: ({ nm: t, page: n, fn: r, src: i, aFace: a }) => e((e) => {
		let { idx: o, aLay: s } = N(e, n), c = I(s, t, "grp");
		return c.fn = r, c.src = i, c.aFace = a, P(e, o, s);
	}),
	chgBAlpha: ({ nm: t, page: n, b_alpha: r, isFixed: i }) => e((e) => {
		let { idx: a, aLay: o } = N(e, n), s = I(o, t, "txt");
		return r !== void 0 && (s.b_alpha = r), i !== void 0 && (s.b_alpha_isfixed = i), P(e, a, o);
	}),
	chgBPic: ({ nm: t, page: n, fn: r, src: i }) => e((e) => {
		let { idx: a, aLay: o } = N(e, n), s = I(o, t, "txt");
		return s.b_pic = r, s.b_src = i, P(e, a, o);
	}),
	chgLay: ({ nm: t, page: n, sty: r }) => e((e) => {
		let { idx: i, aLay: a } = N(e, n), o = a.find((e) => e.nm === t);
		if (!o) throw `存在しないレイヤ ${t} です`;
		if (o.cls !== "txt" && (r.b_color !== void 0 || r.style !== void 0 || r.ffs !== void 0 || r.noffs !== void 0 || r.bura !== void 0)) throw `${t} は文字レイヤではありません（b_color/style/ffs/noffs/buraは文字レイヤ専用）`;
		return Object.assign(o, r), P(e, i, a);
	}),
	getLaySty: (e, n) => {
		let r = t(), i = r.aPage[n === "fore" ? r.foreIdx : 1 - r.foreIdx].find((t) => t.nm === e);
		if (!i) throw `存在しないレイヤ ${e} です`;
		let a = {};
		for (let e of f) i[e] !== void 0 && Object.assign(a, { [e]: i[e] });
		return a;
	},
	getPages: () => {
		let e = t();
		return {
			fore: e.aPage[e.foreIdx],
			back: e.aPage[1 - e.foreIdx]
		};
	},
	getPagesJson: () => {
		let { aPage: e, foreIdx: n } = t();
		return JSON.stringify({
			aPage: e,
			foreIdx: n
		});
	},
	enableEvent: ({ nm: t, enabled: n }) => e((e) => ({ aPage: e.aPage.map((e) => {
		let r = [...e];
		return I(r, t, "txt").enabled = n, r;
	}) })),
	clearBtn: ({ nm: t, page: n }) => e((e) => {
		let r = (e) => {
			let n = I(e, t, "txt");
			n.aBtn.length > 0 && (n.aBtn = []);
		};
		if (n === "both") return { aPage: e.aPage.map((e) => {
			let t = [...e];
			return r(t), t;
		}) };
		let { idx: i, aLay: a } = N(e, n);
		return r(a), P(e, i, a);
	}),
	clearLay: ({ aLayNm: t, page: n }) => e((e) => {
		let r = (e) => {
			for (let t of f) t !== "visible" && delete e[t];
			e.cls === "grp" ? (e.fn = "", e.src = "", e.aFace = []) : (e.str = "", e.aCh = [], e.aBtn = [], delete e.b_color, delete e.style, delete e.ffs, delete e.noffs, delete e.bura, delete e.b_pic, delete e.b_src, delete e.b_alpha_isfixed, e.b_alpha = 1);
		}, i = (e) => {
			if (!t) {
				e.forEach(r);
				return;
			}
			for (let n of t) {
				let t = e.find((e) => e.nm === n);
				if (!t) throw `存在しないレイヤ ${n} です`;
				r(t);
			}
		};
		if (n === "both") return { aPage: e.aPage.map((e) => {
			let t = [...e];
			return i(t), t;
		}) };
		let { idx: a, aLay: o } = N(e, n);
		return i(o), P(e, a, o);
	}),
	moveLay: ({ nm: t, mode: n, index: r, dive: i }) => e((e) => {
		let a = e.aPage[0], o = a.findIndex((e) => e.nm === t);
		if (o < 0) throw `存在しないレイヤ ${t} です`;
		let s;
		switch (n) {
			case "float":
				s = a.length - 1;
				break;
			case "index":
				s = Math.min(Math.max(0, r ?? 0), a.length - 1);
				break;
			case "dive": {
				if (t === i) throw `[lay] 属性 layerとdiveが同じ【${String(i)}】です`;
				let e = a.findIndex((e) => e.nm === i);
				if (e < 0) throw `[lay] 属性 dive【${String(i)}】が不正です。レイヤーがありません`;
				s = e > o ? e - 1 : e;
				break;
			}
		}
		return s === o ? {} : { aPage: e.aPage.map((e) => {
			let t = [...e];
			return t.splice(s, 0, ...t.splice(o, 1)), t;
		}) };
	}),
	chgFilter: ({ aLayNm: t, page: n, mode: r, flt: i, index: a, enabled: o }) => e((e) => {
		let s = (e) => {
			switch (r) {
				case "add":
					e.aFlt = [...e.aFlt ?? [], i];
					break;
				case "replace":
					e.aFlt = [i];
					break;
				case "clear":
					delete e.aFlt;
					break;
				case "enable": {
					let t = [...e.aFlt ?? []], n = a ?? 0;
					if (t.length === 0) throw `${e.nm} にフィルターがありません`;
					if (t.length <= n) throw `${e.nm} のフィルターの個数（${String(t.length)}）を越えています`;
					t[n] = {
						...t[n],
						enabled: o ?? !0
					}, e.aFlt = t;
					break;
				}
			}
		}, c = (e) => {
			if (!t) {
				e.forEach(s);
				return;
			}
			for (let n of t) {
				let t = e.find((e) => e.nm === n);
				if (!t) throw `存在しないレイヤ ${n} です`;
				s(t);
			}
		};
		if (n === "both") return { aPage: e.aPage.map((e) => {
			let t = [...e];
			return c(t), t;
		}) };
		let { idx: l, aLay: u } = N(e, n);
		return c(u), P(e, l, u);
	}),
	chgStr: ({ nm: t, page: n, str: r, aCh: i }) => e((e) => {
		let a = (e) => {
			let n = I(e, t, "txt");
			n.str = r, n.aCh = i;
		};
		if (n === "both") return { aPage: e.aPage.map((e) => {
			let t = [...e];
			return a(t), t;
		}) };
		let { idx: o, aLay: s } = N(e, n);
		return a(s), P(e, o, s);
	}),
	trans: null,
	startTrans: ({ aLayNm: t, time: n, ruleSrc: r, vague: i }) => e((e) => n <= 0 ? F(e, t) : { trans: {
		seq: (e.trans?.seq ?? 0) + 1,
		aLayNm: t,
		time: n,
		...r === void 0 ? {} : { ruleSrc: r },
		...i === void 0 ? {} : { vague: i }
	} }),
	finishTrans: () => e((e) => e.trans ? F(e, e.trans.aLayNm) : {}),
	quake: null,
	startQuake: ({ hmax: t, vmax: n }) => e((e) => ({ quake: {
		seq: (e.quake?.seq ?? 0) + 1,
		hmax: t,
		vmax: n
	} })),
	finishQuake: () => e(() => ({ quake: null })),
	title: "",
	addTitle: (t) => e(() => ({ title: t })),
	fullScr: !1,
	setFullScr: (t) => e(() => ({ fullScr: t })),
	toggleFullScr: () => e((e) => ({ fullScr: !e.fullScr })),
	isReadBack: !1,
	setReadBack: (t) => e(() => ({ isReadBack: t })),
	isTyping: !1,
	setIsTyping: (t) => e(() => ({ isTyping: t })),
	backAlpha: 1,
	setBackAlpha: (t) => e(() => ({ backAlpha: t })),
	btnFont: M,
	setBtnFont: (t) => e(() => ({ btnFont: t })),
	skipReq: 0,
	requestSkip: () => e((e) => ({ skipReq: e.skipReq + 1 })),
	skipping: !1,
	setSkipping: (t) => e(() => ({ skipping: t })),
	wait: null,
	setWait: (t) => e(() => ({ wait: t }))
}));
//#endregion
export { S as a, h as c, s as d, c as f, T as i, p as l, L as n, g as o, u as p, v as r, _ as s, M as t, l as u };

//# sourceMappingURL=store.js.map