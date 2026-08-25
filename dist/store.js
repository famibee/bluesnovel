import { r as e } from "./rolldown-runtime.js";
import { c as t } from "./CmnLib.js";
import { t as n } from "./react.js";
//#region src/ts/Blendmode.ts
var r = {
	normal: "normal",
	add: "plus-lighter",
	multiply: "multiply",
	screen: "screen"
};
function i(e) {
	let t = r[e];
	if (!t) throw `${e} はサポートされない blendmode です`;
	return t;
}
//#endregion
//#region src/ts/Filter.ts
function a(e, t, n) {
	let r = e[t];
	if (r === void 0) return n;
	let i = r.startsWith("0x") ? parseInt(r.slice(2), 16) : Number(r);
	if (!Number.isFinite(i)) throw `[add_filter] ${t}の値が不正です：${r}`;
	return i;
}
var o = {
	blur: (e) => `blur(${String(a(e, "strength", 8))}px)`,
	brightness: (e) => `brightness(${String(a(e, "b", .5))})`,
	black_and_white: () => "grayscale(1)",
	negative: () => "invert(1)",
	saturate: (e) => `saturate(${String(1 + a(e, "amount", .5))})`,
	sepia: () => "sepia(1)"
}, s = ["noise"], c = {
	grayscale: (e) => {
		let t = a(e, "scale", .5);
		return [
			t,
			t,
			t,
			0,
			0,
			t,
			t,
			t,
			0,
			0,
			t,
			t,
			t,
			0,
			0,
			0,
			0,
			0,
			1,
			0
		];
	},
	contrast: (e) => {
		let t = a(e, "amount", .5) + 1, n = -.5 * (t - 1);
		return [
			t,
			0,
			0,
			0,
			n,
			0,
			t,
			0,
			0,
			n,
			0,
			0,
			t,
			0,
			n,
			0,
			0,
			0,
			1,
			0
		];
	},
	hue: (e) => {
		let t = a(e, "f_rotation", 90) / 180 * Math.PI, n = Math.cos(t), r = Math.sin(t), i = 1 / 3, o = Math.sqrt(i);
		return [
			n + (1 - n) * i,
			i * (1 - n) - o * r,
			i * (1 - n) + o * r,
			0,
			0,
			i * (1 - n) + o * r,
			n + i * (1 - n),
			i * (1 - n) - o * r,
			0,
			0,
			i * (1 - n) - o * r,
			i * (1 - n) + o * r,
			n + i * (1 - n),
			0,
			0,
			0,
			0,
			0,
			1,
			0
		];
	},
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
		let t = a(e, "f_color", 8947848);
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
		let t = a(e, "intensity", .5);
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
		let t = a(e, "amount", .5);
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
		let t = a(e, "desaturation", .5), n = a(e, "toned", .5), r = a(e, "light_color", 16770432), i = a(e, "dark_color", 16770432), o = (r >> 16 & 255) / 255, s = (r >> 8 & 255) / 255, c = (r & 255) / 255, l = (i >> 16 & 255) / 255, u = (i >> 8 & 255) / 255, d = (i & 255) / 255;
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
			a(e, "rtor", 1),
			a(e, "gtor", 0),
			a(e, "btor", 0),
			a(e, "ator", 0),
			a(e, "pr", 0),
			a(e, "rtog", 0),
			a(e, "gtog", 1),
			a(e, "btog", 0),
			a(e, "atog", 0),
			a(e, "pg", 0),
			a(e, "rtob", 0),
			a(e, "gtob", 0),
			a(e, "btob", 1),
			a(e, "atob", 0),
			a(e, "pb", 0),
			a(e, "rtoa", 0),
			a(e, "gtoa", 0),
			a(e, "btoa", 0),
			a(e, "atoa", 1),
			a(e, "pa", 0)
		];
	}
};
function l(e) {
	let t = 0, n = e.join(",");
	for (let e = 0; e < n.length; ++e) t = Math.imul(t, 31) + n.charCodeAt(e) | 0;
	return `sn_cm_${(t >>> 0).toString(36)}`;
}
var u = (e) => e.join(" ");
function d([e, t]) {
	return `sn_gb_${String(e)}_${String(t)}`;
}
var f = ([e, t]) => `${String(e)} ${String(t)}`;
function p(e) {
	let { filter: n = "" } = e, r = e.blendmode === void 0 ? void 0 : i(e.blendmode), u = (e.enable_filter ?? "true") !== "false";
	if (n === "blur" && (e.blur_x !== void 0 || e.blur_y !== void 0)) {
		let n = [t(a(e, "blur_x", 2)), t(a(e, "blur_y", 2))];
		return {
			css: `url(#${d(n)})`,
			enabled: u,
			blurXY: n,
			...r === void 0 ? {} : { blendmode: r }
		};
	}
	let f = c[n];
	if (f) {
		let t = f(e);
		return {
			css: `url(#${l(t)})`,
			enabled: u,
			mat: t,
			...r === void 0 ? {} : { blendmode: r }
		};
	}
	let p = o[n];
	if (!p) throw s.includes(n) ? `filter【${n}】はbluesnovelでは未対応です（CSSのfilterにもSVGのfeColorMatrixにも相当が無いため）` : "filter が異常です";
	return {
		css: p(e),
		enabled: u,
		...r === void 0 ? {} : { blendmode: r }
	};
}
function m(e) {
	return e.filter((e) => e.enabled && e.mat).map((e) => e.mat);
}
function ee(e) {
	return e.filter((e) => e.enabled && e.blurXY).map((e) => e.blurXY);
}
function h(e) {
	let t;
	for (let n of e) n.enabled && n.blendmode !== void 0 && (t = n.blendmode);
	return t;
}
function g(e) {
	return e.filter((e) => e.enabled).map((e) => e.css).join(" ");
}
//#endregion
//#region src/components/Lay.ts
var _ = [
	"visible",
	"alpha",
	"left",
	"top",
	"align_x",
	"align_y",
	"s_right",
	"s_bottom",
	"width",
	"height",
	"rotation",
	"scale_x",
	"scale_y",
	"pivot_x",
	"pivot_y",
	"blendmode",
	"aFlt"
];
function v(e) {
	let t = {};
	e.s_right === void 0 ? e.left !== void 0 && (t.left = `${String(e.left - (e.pivot_x ?? 0))}px`) : (t.right = `${String(e.s_right)}px`, t.left = "auto"), e.s_bottom === void 0 ? e.top !== void 0 && (t.top = `${String(e.top - (e.pivot_y ?? 0))}px`) : (t.bottom = `${String(e.s_bottom)}px`, t.top = "auto"), (e.align_x !== void 0 || e.align_y !== void 0) && (t.translate = `${e.align_x === "center" ? "-50%" : e.align_x === "right" ? "-100%" : "0"} ${e.align_y === "middle" ? "-50%" : e.align_y === "bottom" ? "-100%" : "0"}`), e.alpha !== void 0 && (t.opacity = e.alpha), e.width !== void 0 && (t.width = `${String(e.width)}px`), e.height !== void 0 && (t.height = `${String(e.height)}px`), (e.rotation !== void 0 || e.scale_x !== void 0 || e.scale_y !== void 0 || e.pivot_x !== void 0 || e.pivot_y !== void 0) && (t.transform = `rotate(${String(e.rotation ?? 0)}deg) scale(${String(e.scale_x ?? 1)}, ${String(e.scale_y ?? 1)})`, t.transformOrigin = `${String(e.pivot_x ?? 0)}px ${String(e.pivot_y ?? 0)}px`);
	let n = e.blendmode ?? (e.aFlt === void 0 ? void 0 : h(e.aFlt));
	if (n !== void 0 && (t.mixBlendMode = n), e.aFlt !== void 0) {
		let n = g(e.aFlt);
		n && (t.filter = n);
	}
	return e.visible === !1 && (t.display = "none"), t;
}
function y(e) {
	return e.cls === "grp";
}
function b(e) {
	return e.cls === "txt";
}
var x = !1, te = () => {
	x = !0;
}, ne = () => {
	x = !1;
}, S = () => x, C = {
	wait: 500,
	alpha: 0,
	x: "=0.3",
	y: "=0",
	scale_x: 1,
	scale_y: 1,
	rotate: 0,
	join: !0,
	ease: "ease-out"
}, w = {
	wait: 0,
	alpha: 0,
	x: "=0",
	y: "=0",
	scale_x: 1,
	scale_y: 1,
	rotate: 0,
	join: !1,
	ease: "ease-out"
}, re = /[{\s.,*]/, T = (e, t, n, r) => {
	if (n === void 0) return r;
	let i = Number(n);
	if (!Number.isFinite(i)) throw `[${e}] ${t}【${n}】は数値ではありません`;
	return i;
};
function E(e, t, n) {
	let r = t.name ?? "";
	if (!r) throw `[${e}] nameは必須です`;
	if (re.test(r)) throw `[${e}] name【${r}】に使えない文字が含まれます`;
	return {
		name: r,
		sty: {
			wait: T(e, "wait", t.wait, 500),
			alpha: T(e, "alpha", t.alpha, 0),
			x: t.x ?? "=0",
			y: t.y ?? "=0",
			scale_x: T(e, "scale_x", t.scale_x, 1),
			scale_y: T(e, "scale_y", t.scale_y, 1),
			rotate: T(e, "rotate", t.rotate, 0),
			join: (t.join ?? String(n)) !== "false",
			ease: t.ease ?? "ease-out"
		}
	};
}
function D(e) {
	let t = e.startsWith("="), n = parseFloat(t ? e.slice(1) : e);
	return Number.isFinite(n) ? t ? `${n}em` : `${n}px` : "0px";
}
var O = /^(?:linear|ease|ease-in|ease-out|ease-in-out|cubic-bezier\([^()]+\)|steps\([^()]+\))$/;
function k(e) {
	let t = e.trim();
	return O.test(t) ? t : "ease-out";
}
function A(e) {
	return {
		keyframes: [{
			opacity: e.alpha,
			transform: `translate(${D(e.x)}, ${D(e.y)}) scale(${String(e.scale_x)}, ${String(e.scale_y)}) rotate(${String(e.rotate)}deg)`
		}, {
			opacity: 1,
			transform: "none"
		}],
		options: {
			duration: e.wait,
			easing: k(e.ease),
			fill: "backwards"
		}
	};
}
//#endregion
//#region src/ts/Hyphenation.ts
var j = "、。，．）］｝〉」』】〕”〟ぁぃぅぇぉっゃゅょゎァィゥェォッャュョヮヵヶ！？!?‼⁉・ーゝゞヽヾ々", M = {
	sol: j,
	eol: "［（｛〈「『【〔“〝",
	dns: "─‥…",
	bura: j
}, N = /* @__PURE__ */ new Map();
function P(e) {
	let t = N.get(e);
	return t || (t = RegExp(`[${e}]`), N.set(e, t)), t;
}
function F(e, t, n) {
	for (let t of n) if (e.includes(t)) throw `禁則の競合があります。文字 ${t} がぶら下げ と 行末禁則 の両方に含まれます`;
	for (let e of n) if (t.includes(e)) throw `禁則の競合があります。文字 ${e} がぶら下げ と 分割禁止 の両方に含まれます`;
}
var I = class {
	#e;
	#t;
	#n;
	#r;
	constructor(e) {
		this.#e = P(e?.sol ?? M.sol), this.#t = P(e?.eol ?? M.eol), this.#n = P(e?.dns ?? M.dns), this.#r = P(e?.bura ?? M.bura);
	}
	i2pi(e, t) {
		let n = t - 1;
		return e[n]?.rt ? n - 1 : n;
	}
	hyphAlg(e, t, n, r, i) {
		let a = r;
		if (!this.#t.test(n)) {
			if (this.#e.test(i)) for (; (a = this.i2pi(e, a)) >= 0 && this.#e.test(e[a].ch););
			else if (!(n === i && this.#n.test(n))) return {
				cont: !0,
				ins: a + 1
			};
		}
		for (a = t; (a = this.i2pi(e, a)) >= 0 && this.#t.test(e[a].ch););
		return {
			cont: !1,
			ins: a + 1
		};
	}
	hyphAlgBura(e, t, n, r) {
		let i = this.i2pi(e, t), { ch: a } = e[i];
		if (this.#r.test(a) || this.#e.test(a)) {
			let r = t;
			(this.#r.test(n) || this.#e.test(n)) && ++r;
			let i = this.i2pi(e, r), { ch: a } = e[i], { ch: o } = e[r];
			if (a === o && this.#n.test(o)) return {
				cont: !1,
				ins: i
			};
			if (!this.#t.test(a)) return {
				cont: !1,
				ins: r
			};
			r = i;
			do
				if (!this.#t.test(e[r].ch)) break;
			while ((r = this.i2pi(e, r)) >= 0);
			return {
				cont: !1,
				ins: r + 1
			};
		}
		let o = this.i2pi(e, i);
		if (r >= 3) {
			let { ch: t } = e[o];
			if (this.#n.test(a) && t === a) return {
				cont: !1,
				ins: o
			};
			if (this.#t.test(t)) {
				let t = o;
				for (; (t = this.i2pi(e, t)) >= 0 && this.#t.test(e[t].ch););
				return {
					cont: !1,
					ins: t + 1
				};
			}
		}
		return {
			cont: !1,
			ins: i
		};
	}
	scan(e, t, n, r) {
		let i = -Infinity;
		for (let a = r; a < e.length; ++a) {
			if (e[a].rt) continue;
			let r = t[a];
			if (i <= r || e[a].afterBr) {
				i = r;
				continue;
			}
			let o = this.i2pi(e, a), s = e[o].ch, c = a, { cont: l, ins: u } = n ? this.hyphAlgBura(e, o, s, a) : this.hyphAlg(e, o, s, a, e[a].ch);
			if (l) {
				a = u - 1;
				continue;
			}
			let d = u + 2;
			return d < c && (d = c), {
				ins: u,
				resumeAt: d
			};
		}
		return null;
	}
}, L = [
	"oldest",
	"prev",
	"next",
	"newest",
	"exit",
	"load"
], R = "color: yellow; text-shadow: 1px 1px 0 #000, -1px 1px 0 #000, 1px -1px 0 #000, -1px -1px 0 #000;", z = class {
	maxLen;
	constructor(e) {
		this.maxLen = e;
	}
	#e = [];
	#t = -1;
	get len() {
		return this.#e.length;
	}
	get pos() {
		return this.#t;
	}
	get isPaging() {
		return this.#t >= 0 && this.#t < this.#e.length - 1;
	}
	push(e, t, n, r) {
		let i = `${String(t)}:${e}`;
		if (this.#e.some((e) => e.key === i)) return;
		this.#e.push({
			key: i,
			fn: e,
			idx: t,
			mark: n,
			clearOnResume: r
		});
		let a = this.maxLen();
		this.#e.length > a && (this.#e = this.#e.slice(-a)), this.#t = this.#e.length - 1;
	}
	clear() {
		this.#e = [], this.#t = -1;
	}
	move(e) {
		let t = this.#e.length - 1;
		if (!(t < 0)) {
			switch (e) {
				case "oldest":
					this.#t = 0;
					break;
				case "prev":
					this.#t > 0 && --this.#t;
					break;
				case "next":
					this.#t < t && ++this.#t;
					break;
				case "newest":
				case "exit":
					this.#t = t;
					break;
				case "load": this.#e = this.#e.slice(0, this.#t + 1);
			}
			return this.#e[this.#t];
		}
	}
	json() {
		return JSON.stringify(this.#e.map(({ fn: e, idx: t }, n) => ({
			fn: e,
			idx: t,
			place: n
		})));
	}
}, B = (e) => {
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
}, V = ((e) => e ? B(e) : B), H = /* @__PURE__ */ e(n(), 1), U = (e) => e;
function W(e, t = U) {
	let n = H.useSyncExternalStore(e.subscribe, H.useCallback(() => t(e.getState()), [e, t]), H.useCallback(() => t(e.getInitialState()), [e, t]));
	return H.useDebugValue(n), n;
}
var G = (e) => {
	let t = V(e), n = (e) => W(t, e);
	return Object.assign(n, t), n;
}, K = ((e) => e ? G(e) : G), q = [
	"alpha",
	"blendmode",
	"pivot_x",
	"pivot_y",
	"rotation",
	"scale_x",
	"scale_y"
], J = "'Hiragino Sans', 'Hiragino Kaku Gothic ProN', '游ゴシック Medium', meiryo, sans-serif";
function Y(e, t) {
	let n = t === "fore" ? e.foreIdx : 1 - e.foreIdx;
	return {
		idx: n,
		aLay: [...e.aPage[n]]
	};
}
function X(e, t, n) {
	let r = [e.aPage[0], e.aPage[1]];
	return r[t] = n, { aPage: r };
}
function Z(e, t) {
	let n = e.foreIdx, r = 1 - n, i = e.aPage[n], a = e.aPage[r], o = (e) => t !== null && !t.includes(e), s = (e, t) => e.map((e) => o(e.nm) ? t.find((t) => t.nm === e.nm) ?? e : e), c = [[], []];
	return c[r] = s(a, i), c[n] = s(i, a), c[n] = c[n].map((e) => o(e.nm) ? e : structuredClone(c[r].find((t) => t.nm === e.nm) ?? e)), {
		aPage: c,
		foreIdx: r,
		trans: null
	};
}
function ie(e, t) {
	let n = (e) => {
		let t = /* @__PURE__ */ new Map();
		for (let n of e.split(";")) {
			let e = n.indexOf(":");
			if (e < 0) continue;
			let r = n.slice(0, e).trim(), i = n.slice(e + 1).trim();
			r && i && t.set(r, i);
		}
		return t;
	}, r = n(e ?? "");
	for (let [e, i] of n(t)) r.set(e, i);
	return [...r].map(([e, t]) => `${e}: ${t};`).join(" ");
}
function Q(e, t, n) {
	let r = e.find((e) => e.nm === t);
	if (!r) throw `存在しないレイヤ ${t} です`;
	if (r.cls !== n) throw `${t} は${n === "grp" ? "画像" : "文字"}レイヤではありません`;
	return r;
}
var $ = K()((e, t) => ({
	txt: "",
	addTxt: (t) => e((e) => ({ txt: e.txt + t })),
	clearTxt: () => e(() => ({ txt: "" })),
	aPage: [[], []],
	foreIdx: 0,
	hChIn: { default: C },
	hChOut: { default: w },
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
	addBtn: ({ layerNm: t, page: n, nm: r, text: i, label: a, call: o, fn: s, arg: c, sty: l }) => e((e) => {
		let { idx: u, aLay: d } = Y(e, n), f = Q(d, t, "txt");
		if (r === void 0) r = `${a || s || "btn"}#${String(f.aBtn.length)}`;
		else if (f.aBtn.some((e) => e.nm === r)) throw `ボタン名 ${r} はレイヤ ${t} 内で既に使用されています`;
		return f.aBtn = [...f.aBtn, {
			nm: r,
			text: i,
			label: a,
			...o === void 0 ? {} : { call: o },
			...s === void 0 ? {} : { fn: s },
			...c === void 0 ? {} : { arg: c },
			...l === void 0 ? {} : { sty: l }
		}], X(e, u, d);
	}),
	chgPic: ({ nm: t, page: n, fn: r, src: i, isSheet: a, isMovie: o, aFace: s }) => e((e) => {
		let { idx: c, aLay: l } = Y(e, n), u = Q(l, t, "grp");
		return u.fn = r, u.src = i, u.isSheet = a, u.isMovie = o, s !== void 0 && (u.aFace = s), X(e, c, l);
	}),
	chgBAlpha: ({ nm: t, page: n, b_alpha: r, isFixed: i }) => e((e) => {
		let { idx: a, aLay: o } = Y(e, n), s = Q(o, t, "txt");
		return r !== void 0 && (s.b_alpha = r), i !== void 0 && (s.b_alpha_isfixed = i), X(e, a, o);
	}),
	chgBPic: ({ nm: t, page: n, fn: r, src: i }) => e((e) => {
		let { idx: a, aLay: o } = Y(e, n), s = Q(o, t, "txt");
		return s.b_pic = r, s.b_src = i, X(e, a, o);
	}),
	chgBackClear: ({ nm: t, page: n }) => e((e) => {
		let { idx: r, aLay: i } = Y(e, n), a = Q(i, t, "txt");
		return delete a.b_color, a.b_alpha = 0, a.b_alpha_isfixed = !1, delete a.b_pic, delete a.b_src, X(e, r, i);
	}),
	chgLay: ({ nm: t, page: n, sty: r }) => e((e) => {
		let { idx: i, aLay: a } = Y(e, n), o = a.find((e) => e.nm === t);
		if (!o) throw `存在しないレイヤ ${t} です`;
		if (!b(o) && (r.b_color !== void 0 || r.style !== void 0 || r.ffs !== void 0 || r.noffs !== void 0 || r.bura !== void 0 || r.r_align !== void 0 || r.kinsoku_sol !== void 0 || r.kinsoku_eol !== void 0 || r.kinsoku_dns !== void 0 || r.kinsoku_bura !== void 0 || r.pl !== void 0 || r.pr !== void 0 || r.pt !== void 0 || r.pb !== void 0)) throw `${t} は文字レイヤではありません（b_color/style/ffs/noffs/bura/r_align/kinsoku_*/pl/pr/pt/pbは文字レイヤ専用）`;
		b(o) && (r.kinsoku_eol !== void 0 || r.kinsoku_dns !== void 0 || r.kinsoku_bura !== void 0) && F(r.kinsoku_eol ?? o.kinsoku_eol ?? M.eol, r.kinsoku_dns ?? o.kinsoku_dns ?? M.dns, r.kinsoku_bura ?? o.kinsoku_bura ?? M.bura), r.left !== void 0 && r.align_x === void 0 && delete o.align_x, r.top !== void 0 && r.align_y === void 0 && delete o.align_y;
		let s = b(o) && r.style !== void 0 ? {
			...r,
			style: r.style ? ie(o.style, r.style) : ""
		} : r;
		return Object.assign(o, s), X(e, i, a);
	}),
	getLaySty: (e, n) => {
		let r = t(), i = r.aPage[n === "fore" ? r.foreIdx : 1 - r.foreIdx].find((t) => t.nm === e);
		if (!i) throw `存在しないレイヤ ${e} です`;
		let a = {};
		for (let e of _) i[e] !== void 0 && Object.assign(a, { [e]: i[e] });
		return a;
	},
	getForeIdx: () => t().foreIdx,
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
		return Q(r, t, "txt").enabled = n, r;
	}) })),
	clearTxtLay: ({ nm: t, page: n, clearFilter: r }) => e((e) => {
		let i = (e) => {
			let n = Q(e, t, "txt");
			n.aBtn.length > 0 && (n.aBtn = []);
			for (let e of q) delete n[e];
			r && delete n.aFlt;
		};
		if (n === "both") return { aPage: e.aPage.map((e) => {
			let t = [...e];
			return i(t), t;
		}) };
		let { idx: a, aLay: o } = Y(e, n);
		return i(o), X(e, a, o);
	}),
	clearLay: ({ aLayNm: t, page: n }) => e((e) => {
		let r = (e) => {
			for (let t of _) t !== "visible" && delete e[t];
			y(e) ? (e.fn = "", e.src = "", e.aFace = []) : b(e) && (e.str = "", e.aCh = [], e.aBtn = [], delete e.b_color, delete e.style, delete e.ffs, delete e.noffs, delete e.r_align, delete e.b_pic, delete e.b_src, delete e.b_alpha_isfixed, e.b_alpha = 1, delete e.pl, delete e.pr, delete e.pt, delete e.pb);
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
		let { idx: a, aLay: o } = Y(e, n);
		return i(o), X(e, a, o);
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
		let { idx: l, aLay: u } = Y(e, n);
		return c(u), X(e, l, u);
	}),
	chgStr: ({ nm: t, page: n, str: r, aCh: i }) => e((e) => {
		let a = (e) => {
			let n = Q(e, t, "txt");
			n.str = r, n.aCh = i;
		};
		if (n === "both") return { aPage: e.aPage.map((e) => {
			let t = [...e];
			return a(t), t;
		}) };
		let { idx: o, aLay: s } = Y(e, n);
		return a(s), X(e, o, s);
	}),
	trans: null,
	startTrans: ({ aLayNm: t, time: n, ruleSrc: r, vague: i }) => e((e) => n <= 0 ? Z(e, t) : { trans: {
		seq: (e.trans?.seq ?? 0) + 1,
		aLayNm: t,
		time: n,
		...r === void 0 ? {} : { ruleSrc: r },
		...i === void 0 ? {} : { vague: i }
	} }),
	finishTrans: () => e((e) => e.trans ? Z(e, e.trans.aLayNm) : {}),
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
	styPaging: R,
	setStyPaging: (t) => e(() => ({ styPaging: t })),
	isTyping: !1,
	setIsTyping: (t) => e(() => ({ isTyping: t })),
	backAlpha: 1,
	setBackAlpha: (t) => e(() => ({ backAlpha: t })),
	btnFont: J,
	setBtnFont: (t) => e(() => ({ btnFont: t })),
	skipReq: 0,
	requestSkip: () => e((e) => ({ skipReq: e.skipReq + 1 })),
	skipping: !1,
	setSkipping: (t) => e(() => ({ skipping: t })),
	wait: null,
	setWait: (t) => e(() => ({ wait: t }))
})), ae = $.getState();
function oe() {
	$.setState(ae, !0);
}
//#endregion
export { J as DEF_BTN_FONT, ee as _, C as a, m as b, ne as c, b as d, te as f, f as g, d as h, I as i, S as l, p as m, R as n, A as o, v as p, z as r, oe as resetStore, E as s, L as t, y as u, $ as useStore, l as v, i as x, u as y };

//# sourceMappingURL=store.js.map