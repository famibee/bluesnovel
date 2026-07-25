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
	if (e.left !== void 0 && (t.left = `${String(e.left)}px`), e.top !== void 0 && (t.top = `${String(e.top)}px`), e.alpha !== void 0 && (t.opacity = e.alpha), (e.rotation !== void 0 || e.scale_x !== void 0 || e.scale_y !== void 0 || e.pivot_x !== void 0 || e.pivot_y !== void 0) && (t.transform = `rotate(${String(e.rotation ?? 0)}deg) scale(${String(e.scale_x ?? 1)}, ${String(e.scale_y ?? 1)})`, t.transformOrigin = `${String(e.pivot_x ?? 0)}px ${String(e.pivot_y ?? 0)}px`), e.blendmode !== void 0 && (t.mixBlendMode = e.blendmode), e.aFlt !== void 0) {
		let n = s(e.aFlt);
		n && (t.filter = n);
	}
	return e.visible === !1 && (t.display = "none"), t;
}
var u = !1, d = () => {
	u = !0;
}, f = () => {
	u = !1;
}, p = () => u, m = (e) => {
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
}, h = ((e) => e ? m(e) : m), g = (e) => e;
function _(e, t = g) {
	let r = n.useSyncExternalStore(e.subscribe, n.useCallback(() => t(e.getState()), [e, t]), n.useCallback(() => t(e.getInitialState()), [e, t]));
	return n.useDebugValue(r), r;
}
var v = (e) => {
	let t = h(e), n = (e) => _(t, e);
	return Object.assign(n, t), n;
}, y = ((e) => e ? v(e) : v), b = "'Hiragino Sans', 'Hiragino Kaku Gothic ProN', '游ゴシック Medium', meiryo, sans-serif";
function x(e, t) {
	let n = t === "fore" ? e.foreIdx : 1 - e.foreIdx;
	return {
		idx: n,
		aLay: [...e.aPage[n]]
	};
}
function S(e, t, n) {
	let r = [e.aPage[0], e.aPage[1]];
	return r[t] = n, { aPage: r };
}
function C(e, t, n) {
	let r = 1 - t, i = e.aPage[t];
	return S(e, r, e.aPage[r].map((e) => n && !n.includes(e.nm) ? e : structuredClone(i.find((t) => t.nm === e.nm) ?? e)));
}
function w(e, t, n) {
	let r = e.find((e) => e.nm === t);
	if (!r) throw `存在しないレイヤ ${t} です`;
	if (r.cls !== n) throw `${t} は${n === "grp" ? "画像" : "文字"}レイヤではありません`;
	return r;
}
var T = y()((e, t) => ({
	txt: "",
	addTxt: (t) => e((e) => ({ txt: e.txt + t })),
	clearTxt: () => e(() => ({ txt: "" })),
	aPage: [[], []],
	foreIdx: 0,
	replace: (t) => e(() => JSON.parse(t)),
	addLayer: (t) => e((e) => {
		if (e.aPage[0].some((e) => e.nm === t.nm)) throw `レイヤ名 ${t.nm} は既に使用されています（既存の${e.aPage[0].find((e) => e.nm === t.nm).cls}レイヤと重複）`;
		return { aPage: [[...e.aPage[0], structuredClone(t)], [...e.aPage[1], structuredClone(t)]] };
	}),
	addBtn: ({ layerNm: t, page: n, nm: r, text: i, label: a, call: o, fn: s, sty: c }) => e((e) => {
		let { idx: l, aLay: u } = x(e, n), d = w(u, t, "txt");
		if (r === void 0) r = `${a || s || "btn"}#${String(d.aBtn.length)}`;
		else if (d.aBtn.some((e) => e.nm === r)) throw `ボタン名 ${r} はレイヤ ${t} 内で既に使用されています`;
		return d.aBtn = [...d.aBtn, {
			nm: r,
			text: i,
			label: a,
			...o === void 0 ? {} : { call: o },
			...s === void 0 ? {} : { fn: s },
			...c === void 0 ? {} : { sty: c }
		}], S(e, l, u);
	}),
	chgPic: ({ nm: t, page: n, fn: r, src: i, aFace: a }) => e((e) => {
		let { idx: o, aLay: s } = x(e, n), c = w(s, t, "grp");
		return c.fn = r, c.src = i, c.aFace = a, S(e, o, s);
	}),
	chgBAlpha: ({ nm: t, page: n, b_alpha: r, isFixed: i }) => e((e) => {
		let { idx: a, aLay: o } = x(e, n), s = w(o, t, "txt");
		return r !== void 0 && (s.b_alpha = r), i !== void 0 && (s.b_alpha_isfixed = i), S(e, a, o);
	}),
	chgBPic: ({ nm: t, page: n, fn: r, src: i }) => e((e) => {
		let { idx: a, aLay: o } = x(e, n), s = w(o, t, "txt");
		return s.b_pic = r, s.b_src = i, S(e, a, o);
	}),
	chgLay: ({ nm: t, page: n, sty: r }) => e((e) => {
		let { idx: i, aLay: a } = x(e, n), o = a.find((e) => e.nm === t);
		if (!o) throw `存在しないレイヤ ${t} です`;
		if (o.cls !== "txt" && (r.b_color !== void 0 || r.style !== void 0 || r.ffs !== void 0 || r.noffs !== void 0 || r.bura !== void 0)) throw `${t} は文字レイヤではありません（b_color/style/ffs/noffs/buraは文字レイヤ専用）`;
		return Object.assign(o, r), S(e, i, a);
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
		return w(r, t, "txt").enabled = n, r;
	}) })),
	clearBtn: ({ nm: t, page: n }) => e((e) => {
		let r = (e) => {
			let n = w(e, t, "txt");
			n.aBtn.length > 0 && (n.aBtn = []);
		};
		if (n === "both") return { aPage: e.aPage.map((e) => {
			let t = [...e];
			return r(t), t;
		}) };
		let { idx: i, aLay: a } = x(e, n);
		return r(a), S(e, i, a);
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
		let { idx: a, aLay: o } = x(e, n);
		return i(o), S(e, a, o);
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
		let { idx: l, aLay: u } = x(e, n);
		return c(u), S(e, l, u);
	}),
	chgStr: ({ nm: t, page: n, str: r, aCh: i }) => e((e) => {
		let a = (e) => {
			let n = w(e, t, "txt");
			n.str = r, n.aCh = i;
		};
		if (n === "both") return { aPage: e.aPage.map((e) => {
			let t = [...e];
			return a(t), t;
		}) };
		let { idx: o, aLay: s } = x(e, n);
		return a(s), S(e, o, s);
	}),
	trans: null,
	startTrans: ({ aLayNm: t, time: n, ruleSrc: r, vague: i }) => e((e) => {
		let a = 1 - e.foreIdx, o = e.aPage[e.foreIdx], s = (e) => t !== null && !t.includes(e), c = S(e, a, e.aPage[a].map((e) => s(e.nm) ? o.find((t) => t.nm === e.nm) ?? e : e)), l = S({
			...e,
			...c
		}, e.foreIdx, o.map((t) => s(t.nm) ? e.aPage[a].find((e) => e.nm === t.nm) ?? t : t));
		return n <= 0 ? {
			...l,
			foreIdx: a,
			...C({
				...e,
				...l
			}, a, t)
		} : {
			...l,
			trans: {
				seq: (e.trans?.seq ?? 0) + 1,
				aLayNm: t,
				time: n,
				...r === void 0 ? {} : { ruleSrc: r },
				...i === void 0 ? {} : { vague: i }
			}
		};
	}),
	finishTrans: () => e((e) => {
		if (!e.trans) return {};
		let t = 1 - e.foreIdx;
		return {
			foreIdx: t,
			trans: null,
			...C({
				...e,
				foreIdx: t
			}, t, e.trans.aLayNm)
		};
	}),
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
	btnFont: b,
	setBtnFont: (t) => e(() => ({ btnFont: t })),
	skipReq: 0,
	requestSkip: () => e((e) => ({ skipReq: e.skipReq + 1 })),
	skipping: !1,
	setSkipping: (t) => e(() => ({ skipping: t })),
	wait: null,
	setWait: (t) => e(() => ({ wait: t }))
}));
//#endregion
export { d as a, p as i, T as n, l as o, f as r, o as s, b as t };

//# sourceMappingURL=store.js.map