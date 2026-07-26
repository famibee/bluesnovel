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
}, a = [
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
function o(e) {
	let { filter: t = "" } = e, n = i[t];
	if (!n) throw a.includes(t) ? `filter【${t}】はbluesnovelでは未対応です（CSSのfilterで表現できないため。対応可能なのは ${Object.keys(i).join("/")}）` : "filter が異常です";
	return {
		css: n(e),
		enabled: (e.enable_filter ?? "true") !== "false"
	};
}
function s(e) {
	return e.filter((e) => e.enabled).map((e) => e.css).join(" ");
}
//#endregion
//#region src/components/Lay.ts
var c = [
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
function l(e) {
	let t = {};
	if (e.s_right === void 0 ? e.left !== void 0 && (t.left = `${String(e.left)}px`) : t.right = `${String(e.s_right)}px`, e.s_bottom === void 0 ? e.top !== void 0 && (t.top = `${String(e.top)}px`) : t.bottom = `${String(e.s_bottom)}px`, (e.align_x !== void 0 || e.align_y !== void 0) && (t.translate = `${e.align_x === "center" ? "-50%" : e.align_x === "right" ? "-100%" : "0"} ${e.align_y === "middle" ? "-50%" : e.align_y === "bottom" ? "-100%" : "0"}`), e.alpha !== void 0 && (t.opacity = e.alpha), (e.rotation !== void 0 || e.scale_x !== void 0 || e.scale_y !== void 0 || e.pivot_x !== void 0 || e.pivot_y !== void 0) && (t.transform = `rotate(${String(e.rotation ?? 0)}deg) scale(${String(e.scale_x ?? 1)}, ${String(e.scale_y ?? 1)})`, t.transformOrigin = `${String(e.pivot_x ?? 0)}px ${String(e.pivot_y ?? 0)}px`), e.blendmode !== void 0 && (t.mixBlendMode = e.blendmode), e.aFlt !== void 0) {
		let n = s(e.aFlt);
		n && (t.filter = n);
	}
	return e.visible === !1 && (t.display = "none"), t;
}
var u = !1, d = () => {
	u = !0;
}, f = () => {
	u = !1;
}, p = () => u, m = {
	wait: 500,
	alpha: 0,
	x: "=0.3",
	y: "=0",
	scale_x: 1,
	scale_y: 1,
	rotate: 0,
	join: !0,
	ease: "ease-out"
}, h = {
	wait: 0,
	alpha: 0,
	x: "=0",
	y: "=0",
	scale_x: 1,
	scale_y: 1,
	rotate: 0,
	join: !1,
	ease: "ease-out"
}, g = /[{\s.,*]/, _ = (e, t, n, r) => {
	if (n === void 0) return r;
	let i = Number(n);
	if (!Number.isFinite(i)) throw `[${e}] ${t}【${n}】は数値ではありません`;
	return i;
};
function v(e, t, n) {
	let r = t.name ?? "";
	if (!r) throw `[${e}] nameは必須です`;
	if (g.test(r)) throw `[${e}] name【${r}】に使えない文字が含まれます`;
	return {
		name: r,
		sty: {
			wait: _(e, "wait", t.wait, 500),
			alpha: _(e, "alpha", t.alpha, 0),
			x: t.x ?? "=0",
			y: t.y ?? "=0",
			scale_x: _(e, "scale_x", t.scale_x, 1),
			scale_y: _(e, "scale_y", t.scale_y, 1),
			rotate: _(e, "rotate", t.rotate, 0),
			join: (t.join ?? String(n)) !== "false",
			ease: t.ease ?? "ease-out"
		}
	};
}
function y(e) {
	let t = e.startsWith("="), n = parseFloat(t ? e.slice(1) : e);
	return Number.isFinite(n) ? t ? `${n}em` : `${n}px` : "0px";
}
function b(e) {
	switch (e.trim()) {
		case "linear": return "none";
		case "ease-in": return "power1.in";
		case "ease-in-out": return "power1.inOut";
		case "ease": return "power1.inOut";
		case "ease-out": return "power1.out";
		default: return "power1.out";
	}
}
function x(e) {
	return {
		from: {
			opacity: e.alpha,
			x: y(e.x),
			y: y(e.y),
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
			ease: b(e.ease)
		}
	};
}
//#endregion
//#region node_modules/zustand/esm/vanilla.mjs
var S = (e) => {
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
}, C = ((e) => e ? S(e) : S), w = (e) => e;
function T(e, t = w) {
	let r = n.useSyncExternalStore(e.subscribe, n.useCallback(() => t(e.getState()), [e, t]), n.useCallback(() => t(e.getInitialState()), [e, t]));
	return n.useDebugValue(r), r;
}
var E = (e) => {
	let t = C(e), n = (e) => T(t, e);
	return Object.assign(n, t), n;
}, D = ((e) => e ? E(e) : E), O = "'Hiragino Sans', 'Hiragino Kaku Gothic ProN', '游ゴシック Medium', meiryo, sans-serif";
function k(e, t) {
	let n = t === "fore" ? e.foreIdx : 1 - e.foreIdx;
	return {
		idx: n,
		aLay: [...e.aPage[n]]
	};
}
function A(e, t, n) {
	let r = [e.aPage[0], e.aPage[1]];
	return r[t] = n, { aPage: r };
}
function j(e, t) {
	let n = e.foreIdx, r = 1 - n, i = e.aPage[n], a = e.aPage[r], o = (e) => t !== null && !t.includes(e), s = (e, t) => e.map((e) => o(e.nm) ? t.find((t) => t.nm === e.nm) ?? e : e), c = [[], []];
	return c[r] = s(a, i), c[n] = s(i, a), c[n] = c[n].map((e) => o(e.nm) ? e : structuredClone(c[r].find((t) => t.nm === e.nm) ?? e)), {
		aPage: c,
		foreIdx: r,
		trans: null
	};
}
function M(e, t, n) {
	let r = e.find((e) => e.nm === t);
	if (!r) throw `存在しないレイヤ ${t} です`;
	if (r.cls !== n) throw `${t} は${n === "grp" ? "画像" : "文字"}レイヤではありません`;
	return r;
}
var N = D()((e, t) => ({
	txt: "",
	addTxt: (t) => e((e) => ({ txt: e.txt + t })),
	clearTxt: () => e(() => ({ txt: "" })),
	aPage: [[], []],
	foreIdx: 0,
	hChIn: { default: m },
	hChOut: { default: h },
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
		let { idx: l, aLay: u } = k(e, n), d = M(u, t, "txt");
		if (r === void 0) r = `${a || s || "btn"}#${String(d.aBtn.length)}`;
		else if (d.aBtn.some((e) => e.nm === r)) throw `ボタン名 ${r} はレイヤ ${t} 内で既に使用されています`;
		return d.aBtn = [...d.aBtn, {
			nm: r,
			text: i,
			label: a,
			...o === void 0 ? {} : { call: o },
			...s === void 0 ? {} : { fn: s },
			...c === void 0 ? {} : { sty: c }
		}], A(e, l, u);
	}),
	chgPic: ({ nm: t, page: n, fn: r, src: i, aFace: a }) => e((e) => {
		let { idx: o, aLay: s } = k(e, n), c = M(s, t, "grp");
		return c.fn = r, c.src = i, c.aFace = a, A(e, o, s);
	}),
	chgBAlpha: ({ nm: t, page: n, b_alpha: r, isFixed: i }) => e((e) => {
		let { idx: a, aLay: o } = k(e, n), s = M(o, t, "txt");
		return r !== void 0 && (s.b_alpha = r), i !== void 0 && (s.b_alpha_isfixed = i), A(e, a, o);
	}),
	chgBPic: ({ nm: t, page: n, fn: r, src: i }) => e((e) => {
		let { idx: a, aLay: o } = k(e, n), s = M(o, t, "txt");
		return s.b_pic = r, s.b_src = i, A(e, a, o);
	}),
	chgLay: ({ nm: t, page: n, sty: r }) => e((e) => {
		let { idx: i, aLay: a } = k(e, n), o = a.find((e) => e.nm === t);
		if (!o) throw `存在しないレイヤ ${t} です`;
		if (o.cls !== "txt" && (r.b_color !== void 0 || r.style !== void 0 || r.ffs !== void 0 || r.noffs !== void 0 || r.bura !== void 0)) throw `${t} は文字レイヤではありません（b_color/style/ffs/noffs/buraは文字レイヤ専用）`;
		return Object.assign(o, r), A(e, i, a);
	}),
	getLaySty: (e, n) => {
		let r = t(), i = r.aPage[n === "fore" ? r.foreIdx : 1 - r.foreIdx].find((t) => t.nm === e);
		if (!i) throw `存在しないレイヤ ${e} です`;
		let a = {};
		for (let e of c) i[e] !== void 0 && Object.assign(a, { [e]: i[e] });
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
		return M(r, t, "txt").enabled = n, r;
	}) })),
	clearBtn: ({ nm: t, page: n }) => e((e) => {
		let r = (e) => {
			let n = M(e, t, "txt");
			n.aBtn.length > 0 && (n.aBtn = []);
		};
		if (n === "both") return { aPage: e.aPage.map((e) => {
			let t = [...e];
			return r(t), t;
		}) };
		let { idx: i, aLay: a } = k(e, n);
		return r(a), A(e, i, a);
	}),
	clearLay: ({ aLayNm: t, page: n }) => e((e) => {
		let r = (e) => {
			for (let t of c) t !== "visible" && delete e[t];
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
		let { idx: a, aLay: o } = k(e, n);
		return i(o), A(e, a, o);
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
		let { idx: l, aLay: u } = k(e, n);
		return c(u), A(e, l, u);
	}),
	chgStr: ({ nm: t, page: n, str: r, aCh: i }) => e((e) => {
		let a = (e) => {
			let n = M(e, t, "txt");
			n.str = r, n.aCh = i;
		};
		if (n === "both") return { aPage: e.aPage.map((e) => {
			let t = [...e];
			return a(t), t;
		}) };
		let { idx: o, aLay: s } = k(e, n);
		return a(s), A(e, o, s);
	}),
	trans: null,
	startTrans: ({ aLayNm: t, time: n, ruleSrc: r, vague: i }) => e((e) => n <= 0 ? j(e, t) : { trans: {
		seq: (e.trans?.seq ?? 0) + 1,
		aLayNm: t,
		time: n,
		...r === void 0 ? {} : { ruleSrc: r },
		...i === void 0 ? {} : { vague: i }
	} }),
	finishTrans: () => e((e) => e.trans ? j(e, e.trans.aLayNm) : {}),
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
	btnFont: O,
	setBtnFont: (t) => e(() => ({ btnFont: t })),
	skipReq: 0,
	requestSkip: () => e((e) => ({ skipReq: e.skipReq + 1 })),
	skipping: !1,
	setSkipping: (t) => e(() => ({ skipping: t })),
	wait: null,
	setWait: (t) => e(() => ({ wait: t }))
}));
//#endregion
export { v as a, d as c, x as i, l, N as n, f as o, m as r, p as s, O as t, o as u };

//# sourceMappingURL=store.js.map