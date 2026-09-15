import { i as e, t } from "./CmnLib.js";
import { t as n } from "./SaveMng.js";
import { t as r } from "./FocusMng.js";
import { h as i, m as a, n as o, r as s } from "./PageLog.js";
import { DEF_BTN_FONT as c } from "./store.js";
import { o as l, r as u } from "./Sprite.js";
import { n as d } from "./ConfigBase.js";
import { PROTOCOL_USERDATA as f } from "./Config.js";
import { n as p } from "./LayCls.js";
import { t as m } from "./fxRegistry.js";
import { ScriptEngine as h, a as g, c as _, i as v, n as y, o as b, r as x, s as S, t as ee } from "./ScriptEngine.js";
import { a as te, i as ne, n as re, r as ie, t as ae } from "./Snapshot.js";
//#region src/ts/FrameMng.ts
var oe = class e {
	searchPath;
	fetch;
	dec;
	decAB;
	crypto;
	constructor(e, t, n, r, i) {
		this.searchPath = e, this.fetch = t, this.dec = n, this.decAB = r, this.crypto = i;
	}
	#e;
	#t;
	#n = new Promise((e) => {
		this.#t = e;
	});
	attachBox(e) {
		this.#e = e, this.#t?.(e);
	}
	#r = Object.create(null);
	#i = Object.create(null);
	#a = Object.create(null);
	#o = 1;
	getDisabled(e) {
		return this.#i[e] ?? !1;
	}
	getSty(e) {
		return this.#s("tsy_frame", e), this.#a[e] ?? {};
	}
	#s(e, t) {
		let n = this.#r[t];
		if (!n) throw `[${e}] frame【${t}】が読み込まれていません`;
		return n;
	}
	#c(e, t) {
		let n = this.#s(e, t).contentWindow;
		if (!n) throw `[${e}] frame【${t}】の中身がありません`;
		return n;
	}
	async add(n, r, i) {
		if (this.#r[n]) throw `[add_frame] frame【${n}】はすでにあります`;
		let a = this.#e ?? await this.#n, o = this.searchPath(r, d.HTML), s = await this.fetch(o);
		if (!s.ok) throw `[add_frame] HTMLの読込に失敗しました src:${r} ${s.statusText}`;
		let c = e.#m(await this.dec(o, await s.text()), o), l = document.createElement("iframe");
		l.id = n, l.style.cssText = "position: absolute; border: 0; overflow: hidden; pointer-events: auto;", a.appendChild(l), this.#r[n] = l, this.#i[n] = !1, this.#l(l, this.#a[n] = {
			visible: !0,
			alpha: 1,
			x: 0,
			y: 0,
			width: t.stageW,
			height: t.stageH,
			scale_x: 1,
			scale_y: 1,
			rotate: 0,
			...i
		}), await new Promise((e, t) => {
			l.onload = () => e(), l.onerror = () => t(/* @__PURE__ */ Error(`[add_frame] frame【${n}】の表示に失敗しました`)), l.srcdoc = c;
		});
		let u = e.#d(o);
		l.contentWindow.sn_repRes?.((e) => {
			this.#f(u, e.dataset.src ?? "").then((t) => {
				e.src = t;
			});
		}), l.contentDocument?.addEventListener("keydown", (e) => {
			document.dispatchEvent(new KeyboardEvent("keydown", {
				key: e.key,
				code: e.code,
				bubbles: !0,
				altKey: e.altKey,
				ctrlKey: e.ctrlKey,
				metaKey: e.metaKey,
				shiftKey: e.shiftKey
			}));
		}), l.contentDocument?.addEventListener("contextmenu", (e) => {
			e.preventDefault(), document.dispatchEvent(new MouseEvent("contextmenu", {
				bubbles: !0,
				altKey: e.altKey,
				ctrlKey: e.ctrlKey,
				metaKey: e.metaKey,
				shiftKey: e.shiftKey
			}));
		});
		let f = `const.sn.frm.${n}`;
		return {
			[f]: !0,
			[`${f}.alpha`]: i.alpha ?? 1,
			[`${f}.x`]: i.x ?? 0,
			[`${f}.y`]: i.y ?? 0,
			[`${f}.width`]: i.width ?? t.stageW,
			[`${f}.height`]: i.height ?? t.stageH,
			[`${f}.scale_x`]: i.scale_x ?? 1,
			[`${f}.scale_y`]: i.scale_y ?? 1,
			[`${f}.rotate`]: i.rotate ?? 0,
			[`${f}.visible`]: i.visible ?? !0
		};
	}
	frame(e, t, n, r) {
		let i = this.#s("frame", e);
		if (this.#l(i, Object.assign(this.#a[e] ??= {}, t)), n) {
			let { style: e } = i;
			e.zIndex = n.mode === "float" ? String(++this.#o) : n.mode === "index" ? String(n.index ?? 0) : String(-++this.#o);
		}
		if (r !== void 0) {
			this.#i[e] = r;
			let t = i.contentDocument?.body;
			if (t) for (let e of t.querySelectorAll("input, select, button")) e.disabled = r;
		}
		let a = `const.sn.frm.${e}`, o = {};
		for (let [e, n] of Object.entries(t)) o[`${a}.${e}`] = n;
		return o;
	}
	#l(e, t) {
		let n = e.style;
		t.alpha !== void 0 && (n.opacity = String(t.alpha)), t.x !== void 0 && (n.left = `${String(t.x)}px`), t.y !== void 0 && (n.top = `${String(t.y)}px`), t.width !== void 0 && (n.width = `${String(t.width)}px`), t.height !== void 0 && (n.height = `${String(t.height)}px`), (t.scale_x !== void 0 || t.scale_y !== void 0 || t.rotate !== void 0) && (n.transform = `scale(${String(t.scale_x ?? 1)}, ${String(t.scale_y ?? 1)}) rotate(${String(t.rotate ?? 0)}deg)`), t.b_color !== void 0 && (n.backgroundColor = t.b_color), t.visible !== void 0 && (n.display = t.visible ? "inline" : "none");
	}
	set(e, t, n) {
		this.#c("set_frame", e)[t] = n;
	}
	get(e, t, n) {
		let r = this.#c("let_frame", e);
		if (!(t in r)) throw `[let_frame] frame【${e}】に変数/関数【${t}】がありません。変数は var付きにして下さい`;
		let i = r[t];
		return n ? i() : i;
	}
	elms(e) {
		let t = e.slice(4), n = t.indexOf(":");
		if (n < 0) return {
			id: "",
			sel: t,
			aEl: [...document.querySelectorAll(t)]
		};
		let r = t.slice(0, n), i = t.slice(n + 1), a = this.#r[r]?.contentDocument;
		if (!a) throw `[event] frame【${r}】が読み込まれていません`;
		return {
			id: r,
			sel: i,
			aEl: i ? [...a.querySelectorAll(i)] : [a.body]
		};
	}
	#u = Object.create(null);
	resvDom(e, t, n, r, i) {
		for (let { el: e, ev: n, fnc: r } of this.#u[t] ?? []) e.removeEventListener(n, r);
		if (delete this.#u[t], n) return [];
		let { id: a, sel: o, aEl: s } = this.elms(e);
		if (s.length === 0) {
			if (r) throw `[event] HTML内にセレクタ（${o}）に対応する要素が見つかりません。存在しない場合を許容するなら、need_err=false と指定してください`;
			return [];
		}
		let c = s[0].type || "", l = c === "checkbox" || c === "range" ? ["input"] : c === "text" || c === "textarea" ? ["input", "change"] : ["click", "keydown"], u = [];
		for (let e of s) for (let t of l) {
			let n = (n) => {
				this.getDisabled(a) || (t !== "keydown" || n.key === "Enter") && (t === "keydown" && (n.stopImmediatePropagation(), n.preventDefault()), i(e));
			};
			e.addEventListener(t, n), u.push({
				el: e,
				ev: t,
				fnc: n
			});
		}
		return this.#u[t] = u, s;
	}
	resolveDom(e, t) {
		let { sel: n, aEl: r } = this.elms(e);
		if (r.length === 0 && t) throw `[set_focus] HTML内にセレクタ（${n}）に対応する要素が見つかりません。存在しない場合を許容するなら、need_err=false と指定してください`;
		return r;
	}
	static #d(e) {
		return e.slice(0, e.lastIndexOf("/") + 1);
	}
	async #f(e, t) {
		if (!t) return "";
		if (/^(?:[a-z][a-z\d+\-.]*:|\/)/i.test(t)) return t;
		try {
			let e = this.searchPath(t, d.SP_GSM);
			return await l(e, this.crypto, this.fetch, this.decAB);
		} catch {
			return e + t.replace(/^\.\//, "");
		}
	}
	static #p = /\s(?:src|href)=(["'])(\S+?)\1/g;
	static #m(t, n) {
		let r = e.#d(n);
		return t.replaceAll(e.#p, (e, t, n) => n.startsWith("../") ? r + e.slice(3) : e.replace("./", "").replace(t, t + r));
	}
}, se = class {
	#e = Object.create(null);
	#t = Object.create(null);
	#n = 0;
	#r = !1;
	#i(e) {
		return this.#r || e === this.#n;
	}
	setPageState(e, t) {
		this.#n = e, this.#r = t;
		for (let e of Object.keys(this.#e)) this.#e[e].setActive(this.#i(+!e.endsWith(":0")));
	}
	add(e, t) {
		let n = p(t);
		if (!n) throw `[add_lay] 属性 class【${t}】が不正です`;
		for (let r of [0, 1]) {
			let i = n();
			i.layname = e, i.name = `layer:${e} cls:${t} page:${r === 0 ? "A" : "B"}`, i.setActive(this.#i(r)), this.#e[`${e}:${String(r)}`] = i;
		}
		this.#t[e] = t;
	}
	lay(e, t, n) {
		let r = this.#e[`${e}:${String(t)}`];
		if (!r) throw `[lay] 存在しないプラグインレイヤー ${e} です`;
		return r.lay(n);
	}
	clearLay(e, t, n) {
		let r = e ?? Object.keys(this.#t), i = t === "both" ? [0, 1] : [t === "fore" ? n : 1 - n];
		for (let e of r) if (e in this.#t) for (let t of i) this.#e[`${e}:${String(t)}`]?.clearLay({});
	}
	attachBox(e, t, n) {
		let r = this.#e[`${e}:${String(t)}`];
		r && (n ? n.appendChild(r.ctn) : r.ctn.remove());
	}
	dump(e, t) {
		return this.#e[`${e}:${String(t)}`]?.dump() ?? "";
	}
	record() {
		let e = {};
		for (let t of Object.keys(this.#t)) e[t] = {
			cls: this.#t[t],
			fore: this.#e[`${t}:0`].record(),
			back: this.#e[`${t}:1`].record()
		};
		return e;
	}
	playback(e, t) {
		let n = e ?? {};
		for (let e of Object.keys(this.#t)) e in n || (this.#e[`${e}:0`]?.destroy(), this.#e[`${e}:1`]?.destroy(), delete this.#e[`${e}:0`], delete this.#e[`${e}:1`], delete this.#t[e]);
		for (let e of Object.keys(n)) {
			let { cls: r, fore: i, back: a } = n[e];
			e in this.#t || this.add(e, r), this.#e[`${e}:0`].playback(i, t), this.#e[`${e}:1`].playback(a, t), this.#e[`${e}:0`].setActive(this.#i(0)), this.#e[`${e}:1`].setActive(this.#i(1));
		}
	}
	finishTrans(e, t, n) {
		let r = 1 - t;
		for (let i of Object.keys(this.#t)) (!e || e.includes(i)) && this.#e[`${i}:${String(t)}`]?.copy(this.#e[`${i}:${String(r)}`], n);
		this.setPageState(r, !1);
	}
	destroy() {
		for (let e of Object.values(this.#e)) e.destroy();
		for (let e of Object.keys(this.#e)) delete this.#e[e];
		for (let e of Object.keys(this.#t)) delete this.#t[e];
		this.#n = 0, this.#r = !1;
	}
};
//#endregion
//#region src/ts/Font.ts
function ce(e) {
	return e.matchPath(".+", d.FONT).flatMap((e) => Object.values(e)).filter((e) => typeof e == "string").map((t) => `@font-face {
	font-family: ${JSON.stringify(t)};
	src: url(${JSON.stringify(e.searchPath(t, d.FONT))});
}`).join("\n");
}
function le(e, t = document) {
	let n = ce(e);
	if (!n) return;
	let r = t.createElement("style");
	r.dataset.sn = "font", r.textContent = n, t.head.appendChild(r);
}
//#endregion
//#region src/ts/SndBuf.ts
var ue = 999e3, de = class {
	ctx;
	src;
	opt;
	buf;
	constructor(e, t, n, r, i) {
		this.ctx = e, this.src = r, this.opt = i, this.buf = n;
		let a = this.gn = e.createGain();
		if (a.gain.value = i.volume, i.pan !== 0 && typeof e.createStereoPanner == "function") {
			let n = e.createStereoPanner();
			n.pan.value = i.pan < -1 ? -1 : i.pan > 1 ? 1 : i.pan, a.connect(n), n.connect(t);
		} else a.connect(t);
	}
	gn;
	get loop() {
		return this.opt.loop;
	}
	#e;
	#t = !1;
	get destroyed() {
		return this.#t;
	}
	#n;
	#r;
	set onEnd(e) {
		this.#r = e;
	}
	start(e, t) {
		if (this.#t) return;
		let { loop: n, speed: r, start_ms: i, ret_ms: a } = this.opt, { end_ms: o } = this.opt, s = e.duration * 1e3;
		o === 999e3 ? o = s : o < 0 && (o = s + o);
		let c = this.#e = this.ctx.createBufferSource();
		c.buffer = e, c.playbackRate.value = r, c.loop = n, n ? (c.loopStart = a / 1e3, c.loopEnd = Math.max(o, a + 1) / 1e3) : c.onended = () => {
			this.#e = void 0, this.stop();
		}, c.connect(this.gn);
		let l = i / 1e3;
		n ? c.start(0, l) : (c.start(0, l, Math.max(0, o - i) / 1e3), t && (this.#n = setTimeout(() => this.stop(), Math.max(0, o - i))));
	}
	stop() {
		if (this.#t) return;
		if (this.#t = !0, this.#n &&= (clearTimeout(this.#n), void 0), this.#e) {
			try {
				this.#e.stop();
			} catch {}
			this.#e.disconnect(), this.#e = void 0;
		}
		this.gn.disconnect();
		let e = this.#r;
		this.#r = void 0, e?.();
	}
	get volume() {
		return this.gn.gain.value;
	}
	set volume(e) {
		this.gn.gain.value = e;
	}
}, fe = {
	mp3: "audio/mpeg",
	mpeg: "audio/mpeg",
	opus: "audio/ogg; codecs=\"opus\"",
	ogg: "audio/ogg; codecs=\"vorbis\"",
	oga: "audio/ogg; codecs=\"vorbis\"",
	wav: "audio/wav; codecs=\"1\"",
	aac: "audio/aac",
	caf: "audio/x-caf",
	m4a: "audio/mp4; codecs=\"mp4a.40.2\"",
	mp4: "audio/mp4; codecs=\"mp4a.40.2\"",
	weba: "audio/webm; codecs=\"vorbis\"",
	webm: "audio/webm; codecs=\"vorbis\"",
	dolby: "audio/mp4; codecs=\"ec-3\"",
	flac: "audio/flac"
}, pe = class {
	trace;
	fetch;
	decAB;
	constructor(e, t, n) {
		this.trace = e, this.fetch = t, this.decAB = n;
	}
	#e;
	#t;
	#n() {
		if (this.#e && this.#t) return {
			ctx: this.#e,
			gn: this.#t
		};
		let e = this.#e = new AudioContext(), t = this.#t = e.createGain();
		return t.connect(e.destination), {
			ctx: e,
			gn: t
		};
	}
	unlock() {
		let { ctx: e } = this.#n();
		e.state === "suspended" && e.resume();
	}
	needClick2Play() {
		return this.#n().ctx.state === "suspended";
	}
	setGlobalVol(e) {
		this.#n().gn.gain.value = e < 0 ? 0 : e;
	}
	codecs() {
		let e = document.createElement("audio"), t = {};
		for (let [n, r] of Object.entries(fe)) t[n] = e.canPlayType(r) !== "";
		return JSON.stringify(t);
	}
	#r = /* @__PURE__ */ new Map();
	#i(e) {
		let t = this.#r.get(e);
		if (!t) {
			let { ctx: n } = this.#n();
			t = this.fetch(e).then((e) => {
				if (!e.ok) throw `fetch失敗 ${String(e.status)} ${e.statusText}`;
				return e.arrayBuffer();
			}).then((e) => this.decAB(e)).then((e) => n.decodeAudioData(e)), t.catch(() => this.#r.delete(e)), this.#r.set(e, t);
		}
		return t;
	}
	#a = Object.create(null);
	#o = Object.create(null);
	async play(e, t, n, r) {
		let i = this.#a[e];
		if (i && !i.destroyed && i.src === t) return;
		this.stop(e);
		let { ctx: a, gn: o } = this.#n(), s = new de(a, o, e, t, n);
		this.#a[e] = s, s.onEnd = () => {
			let e = s.buf;
			this.#a[e] === s && delete this.#a[e];
			let t = this.#o[e];
			delete this.#o[e], r?.(e), t?.();
		};
		let c;
		try {
			c = await this.#i(t);
		} catch (e) {
			s.destroyed || (this.trace(`[playse] 音声のデコードに失敗しました src:${t} ${String(e)}`, "E"), s.stop());
			return;
		}
		s.start(c, this.needClick2Play());
	}
	stop(e) {
		this.#a[e]?.stop();
	}
	stopAll() {
		for (let e of Object.values(this.#a)) e.stop();
	}
	bufs() {
		return Object.keys(this.#a);
	}
	xchgBuf(e, t) {
		let n = this.#a[e], r = this.#a[t];
		r ? (this.#a[e] = r, r.buf = e) : delete this.#a[e], n ? (this.#a[t] = n, n.buf = t) : delete this.#a[t];
	}
	setVol(e, t) {
		let n = this.#a[e];
		n && (n.volume = t < 0 ? 0 : t > 1 ? 1 : t);
	}
	gainNode(e) {
		return this.#a[e]?.gn;
	}
	waitEnd(e, t) {
		let n = this.#a[e];
		return !n || n.loop ? !1 : (this.#o[e] = t, !0);
	}
	cancelWaitEnd(e) {
		delete this.#o[e];
	}
};
//#endregion
//#region node_modules/motion-utils/dist/es/array.mjs
function me(e, t) {
	e.indexOf(t) === -1 && e.push(t);
}
function he(e, t) {
	let n = e.indexOf(t);
	n > -1 && e.splice(n, 1);
}
//#endregion
//#region node_modules/motion-utils/dist/es/clamp.mjs
var C = (e, t, n) => n > t ? t : n < e ? e : n;
//#endregion
//#region node_modules/motion-utils/dist/es/format-error-message.mjs
function ge(e, t) {
	return t ? `${e}. For more information and steps for solving, visit https://motion.dev/troubleshooting/${t}` : e;
}
//#endregion
//#region node_modules/motion-utils/dist/es/errors.mjs
var w = () => {}, T = () => {};
typeof process < "u" && process.env.NODE_ENV !== "production" && (w = (e, t, n) => {
	!e && typeof console < "u" && console.warn(ge(t, n));
}, T = (e, t, n) => {
	if (!e) throw Error(ge(t, n));
});
//#endregion
//#region node_modules/motion-utils/dist/es/global-config.mjs
var E = {}, _e = (e) => /^-?(?:\d+(?:\.\d+)?|\.\d+)$/u.test(e), ve = (e) => typeof e == "object" && !!e, ye = (e) => /^0[^.\s]+$/u.test(e);
//#endregion
//#region node_modules/motion-utils/dist/es/memo.mjs
/*#__NO_SIDE_EFFECTS__*/
function be(e) {
	let t;
	return () => (t === void 0 && (t = e()), t);
}
//#endregion
//#region node_modules/motion-utils/dist/es/noop.mjs
var D = /* @__NO_SIDE_EFFECTS__ */ (e) => e, xe = (...e) => e.reduce((e, t) => (n) => t(e(n))), Se = /* @__NO_SIDE_EFFECTS__ */ (e, t, n) => {
	let r = t - e;
	return r ? (n - e) / r : 1;
}, Ce = class {
	constructor() {
		this.subscriptions = [];
	}
	add(e) {
		return me(this.subscriptions, e), () => this.remove(e);
	}
	remove(e) {
		he(this.subscriptions, e);
	}
	notify(e, t, n) {
		let r = this.subscriptions.length;
		if (r) {
			if (r === 1) this.subscriptions[0](e, t, n);
			else for (let i = 0; i < r; i++) {
				let r = this.subscriptions[i];
				r && r(e, t, n);
			}
		}
	}
	getSize() {
		return this.subscriptions.length;
	}
	clear() {
		this.subscriptions.length = 0;
	}
}, O = /* @__NO_SIDE_EFFECTS__ */ (e) => e * 1e3, k = /* @__NO_SIDE_EFFECTS__ */ (e) => e / 1e3, we = /* @__NO_SIDE_EFFECTS__ */ (e, t) => t ? 1e3 / t * e : 0, Te = /* @__PURE__ */ new Set();
function Ee(e, t, n) {
	e || Te.has(t) || (console.warn(ge(t, n)), Te.add(t));
}
//#endregion
//#region node_modules/motion-utils/dist/es/wrap.mjs
var De = (e, t, n) => {
	let r = t - e;
	return ((n - e) % r + r) % r + e;
}, Oe = (e, t, n) => (((1 - 3 * n + 3 * t) * e + (3 * n - 6 * t)) * e + 3 * t) * e, ke = 1e-7, Ae = 12;
function je(e, t, n, r, i) {
	let a, o, s = 0;
	do
		o = t + (n - t) / 2, a = Oe(o, r, i) - e, a > 0 ? n = o : t = o;
	while (Math.abs(a) > ke && ++s < Ae);
	return o;
}
/*#__NO_SIDE_EFFECTS__*/
function A(e, t, n, r) {
	if (e === t && n === r) return D;
	let i = (t) => je(t, 0, 1, e, n);
	return (e) => e === 0 || e === 1 ? e : Oe(i(e), t, r);
}
//#endregion
//#region node_modules/motion-utils/dist/es/easing/modifiers/mirror.mjs
var Me = /* @__NO_SIDE_EFFECTS__ */ (e) => (t) => t <= .5 ? e(2 * t) / 2 : (2 - e(2 * (1 - t))) / 2, Ne = /* @__NO_SIDE_EFFECTS__ */ (e) => (t) => 1 - e(1 - t), Pe = /*@__PURE__*/ A(.33, 1.53, .69, .99), Fe = /*@__PURE__*/ Ne(Pe), Ie = /*@__PURE__*/ Me(Fe), Le = (e) => e >= 1 ? 1 : (e *= 2) < 1 ? .5 * Fe(e) : .5 * (2 - 2 ** (-10 * (e - 1))), Re = (e) => 1 - Math.sin(Math.acos(e)), ze = /* @__PURE__ */ Ne(Re), Be = /* @__PURE__ */ Me(Re), Ve = /*@__PURE__*/ A(.42, 0, 1, 1), He = /*@__PURE__*/ A(0, 0, .58, 1), Ue = /*@__PURE__*/ A(.42, 0, .58, 1), We = /* @__NO_SIDE_EFFECTS__ */ (e) => Array.isArray(e) && typeof e[0] != "number";
//#endregion
//#region node_modules/motion-utils/dist/es/easing/utils/get-easing-for-segment.mjs
/*#__NO_SIDE_EFFECTS__*/
function Ge(e, t) {
	return /* @__PURE__ */ We(e) ? e[De(0, e.length, t)] : e;
}
//#endregion
//#region node_modules/motion-utils/dist/es/easing/utils/is-bezier-definition.mjs
var Ke = /* @__NO_SIDE_EFFECTS__ */ (e) => Array.isArray(e) && typeof e[0] == "number", qe = {
	linear: D,
	easeIn: Ve,
	easeInOut: Ue,
	easeOut: He,
	circIn: Re,
	circInOut: Be,
	circOut: ze,
	backIn: Fe,
	backInOut: Ie,
	backOut: Pe,
	anticipate: Le
}, Je = (e) => typeof e == "string", Ye = (e) => {
	if (/* @__PURE__ */ Ke(e)) {
		T(e.length === 4, "Cubic bezier arrays must contain four numerical values.", "cubic-bezier-length");
		let [t, n, r, i] = e;
		return /* @__PURE__ */ A(t, n, r, i);
	}
	return Je(e) ? (T(qe[e] !== void 0, `Invalid easing type '${e}'`, "invalid-easing-type"), qe[e]) : e;
}, Xe = [
	"setup",
	"read",
	"resolveKeyframes",
	"preUpdate",
	"update",
	"preRender",
	"render",
	"postRender"
];
//#endregion
//#region node_modules/motion-dom/dist/es/frameloop/render-step.mjs
function Ze(e) {
	let t = /* @__PURE__ */ new Set(), n = /* @__PURE__ */ new Set(), r = !1, i = !1, a = /* @__PURE__ */ new Set(), o = {
		delta: 0,
		timestamp: 0,
		isProcessing: !1
	};
	function s(t) {
		a.has(t) && (n.add(t), e()), t(o);
	}
	let c = {
		schedule: (e, i = !1, o = !1) => {
			let s = o && r ? t : n;
			return i && a.add(e), s.add(e), e;
		},
		cancel: (e) => {
			n.delete(e), a.delete(e);
		},
		process: (e) => {
			if (o = e, r) {
				i = !0;
				return;
			}
			r = !0;
			let a = t;
			t = n, n = a, t.forEach(s), t.clear(), r = !1, i && (i = !1, c.process(e));
		}
	};
	return c;
}
//#endregion
//#region node_modules/motion-dom/dist/es/frameloop/batcher.mjs
var Qe = 40;
function $e(e, t) {
	let n = !1, r = !0, i = {
		delta: 0,
		timestamp: 0,
		isProcessing: !1
	}, a = () => n = !0, o = Xe.reduce((e, t) => (e[t] = Ze(a), e), {}), { setup: s, read: c, resolveKeyframes: l, preUpdate: u, update: d, preRender: f, render: p, postRender: m } = o, h = () => {
		let a = E.useManualTiming, o = a ? i.timestamp : performance.now();
		n = !1, a || (i.delta = r ? 1e3 / 60 : Math.max(Math.min(o - i.timestamp, Qe), 1)), i.timestamp = o, i.isProcessing = !0, s.process(i), c.process(i), l.process(i), u.process(i), d.process(i), f.process(i), p.process(i), m.process(i), i.isProcessing = !1, n && t && (r = !1, e(h));
	}, g = () => {
		n = !0, r = !0, i.isProcessing || e(h);
	};
	return {
		schedule: Xe.reduce((e, t) => {
			let r = o[t];
			return e[t] = (e, t = !1, i = !1) => (n || g(), r.schedule(e, t, i)), e;
		}, {}),
		cancel: (e) => {
			for (let t = 0; t < Xe.length; t++) o[Xe[t]].cancel(e);
		},
		state: i,
		steps: o
	};
}
//#endregion
//#region node_modules/motion-dom/dist/es/frameloop/frame.mjs
var { schedule: j, cancel: et, state: M, steps: tt } = /* @__PURE__ */ $e(typeof requestAnimationFrame < "u" ? requestAnimationFrame : D, !0), nt;
function rt() {
	nt = void 0;
}
var N = {
	now: () => (nt === void 0 && N.set(M.isProcessing || E.useManualTiming ? M.timestamp : performance.now()), nt),
	set: (e) => {
		nt = e, queueMicrotask(rt);
	}
}, P = (e) => Math.round(e * 1e5) / 1e5, it = /*@__PURE__*/ ((e) => (t) => typeof t == "string" && t.startsWith(e))("var(--"), at = (e) => it(e) ? ot.test(e.split("/*")[0].trim()) : !1, ot = /var\(--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)$/iu;
function st(e) {
	return typeof e == "string" && e.split("/*")[0].includes("var(--");
}
//#endregion
//#region node_modules/motion-dom/dist/es/value/types/numbers/index.mjs
var F = {
	test: (e) => typeof e == "number",
	parse: parseFloat,
	transform: (e) => e
}, ct = {
	...F,
	transform: (e) => C(0, 1, e)
}, lt = {
	...F,
	default: 1
}, ut = /-?(?:\d+(?:\.\d+)?|\.\d+)/gu;
//#endregion
//#region node_modules/motion-dom/dist/es/value/types/utils/is-nullish.mjs
function dt(e) {
	return e == null;
}
//#endregion
//#region node_modules/motion-dom/dist/es/value/types/utils/single-color-regex.mjs
var ft = /^(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))$/iu, pt = (e, t) => (n) => !!(typeof n == "string" && ft.test(n) && n.startsWith(e) || t && !dt(n) && Object.prototype.hasOwnProperty.call(n, t)), mt = (e, t, n) => (r) => {
	if (typeof r != "string") return r;
	let [i, a, o, s] = r.match(ut);
	return {
		[e]: parseFloat(i),
		[t]: parseFloat(a),
		[n]: parseFloat(o),
		alpha: s === void 0 ? 1 : parseFloat(s)
	};
}, ht = (e) => C(0, 255, e), gt = {
	...F,
	transform: (e) => Math.round(ht(e))
}, I = {
	test: /*@__PURE__*/ pt("rgb", "red"),
	parse: /*@__PURE__*/ mt("red", "green", "blue"),
	transform: ({ red: e, green: t, blue: n, alpha: r = 1 }) => "rgba(" + gt.transform(e) + ", " + gt.transform(t) + ", " + gt.transform(n) + ", " + P(ct.transform(r)) + ")"
};
//#endregion
//#region node_modules/motion-dom/dist/es/value/types/color/hex.mjs
function _t(e) {
	let t = "", n = "", r = "", i = "";
	return e.length > 5 ? (t = e.substring(1, 3), n = e.substring(3, 5), r = e.substring(5, 7), i = e.substring(7, 9)) : (t = e.substring(1, 2), n = e.substring(2, 3), r = e.substring(3, 4), i = e.substring(4, 5), t += t, n += n, r += r, i += i), {
		red: parseInt(t, 16),
		green: parseInt(n, 16),
		blue: parseInt(r, 16),
		alpha: i ? parseInt(i, 16) / 255 : 1
	};
}
var vt = {
	test: /*@__PURE__*/ pt("#"),
	parse: _t,
	transform: I.transform
}, L = /* @__NO_SIDE_EFFECTS__ */ (e) => ({
	test: (t) => typeof t == "string" && t.endsWith(e) && t.split(" ").length === 1,
	parse: parseFloat,
	transform: (t) => `${t}${e}`
}), R = /*@__PURE__*/ L("deg"), z = /*@__PURE__*/ L("%"), B = /*@__PURE__*/ L("px"), yt = /*@__PURE__*/ L("vh"), bt = /*@__PURE__*/ L("vw"), xt = {
	...z,
	parse: (e) => z.parse(e) / 100,
	transform: (e) => z.transform(e * 100)
}, V = {
	test: /*@__PURE__*/ pt("hsl", "hue"),
	parse: /*@__PURE__*/ mt("hue", "saturation", "lightness"),
	transform: ({ hue: e, saturation: t, lightness: n, alpha: r = 1 }) => "hsla(" + Math.round(e) + ", " + z.transform(P(t)) + ", " + z.transform(P(n)) + ", " + P(ct.transform(r)) + ")"
}, H = {
	test: (e) => I.test(e) || vt.test(e) || V.test(e),
	parse: (e) => I.test(e) ? I.parse(e) : V.test(e) ? V.parse(e) : vt.parse(e),
	transform: (e) => typeof e == "string" ? e : e.hasOwnProperty("red") ? I.transform(e) : V.transform(e),
	getAnimatableNone: (e) => {
		let t = H.parse(e);
		return t.alpha = 0, H.transform(t);
	}
}, St = /(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))/giu, Ct = /*@__PURE__*/ new RegExp(ut.source), wt = /*@__PURE__*/ new RegExp(St.source, "i");
function Tt(e) {
	return isNaN(e) && typeof e == "string" && (Ct.test(e) || wt.test(e));
}
var Et = "number", Dt = "color", Ot = "var", kt = "var(", At = "${}", jt = /var\s*\(\s*--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)|#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\)|-?(?:\d+(?:\.\d+)?|\.\d+)/giu;
function Mt(e) {
	let t = e.toString();
	return Ct.test(t) || wt.test(t);
}
function U(e) {
	let t = e.toString(), n = [], r = {
		color: [],
		number: [],
		var: []
	}, i = [], a = 0;
	return {
		values: n,
		split: t.replace(jt, (e) => (H.test(e) ? (r.color.push(a), i.push(Dt), n.push(H.parse(e))) : e.startsWith(kt) ? (r.var.push(a), i.push(Ot), n.push(e)) : (r.number.push(a), i.push(Et), n.push(parseFloat(e))), ++a, At)).split(At),
		indexes: r,
		types: i
	};
}
function Nt(e) {
	return U(e).values;
}
function Pt({ split: e, types: t }) {
	let n = e.length;
	return (r) => {
		let i = "";
		for (let a = 0; a < n; a++) if (i += e[a], r[a] !== void 0) {
			let e = t[a];
			i += e === Et ? P(r[a]) : e === Dt ? H.transform(r[a]) : r[a];
		}
		return i;
	};
}
function Ft(e) {
	return Pt(U(e));
}
var It = (e) => typeof e == "number" ? 0 : H.test(e) ? H.getAnimatableNone(e) : e, Lt = (e, t) => typeof e == "number" ? t?.trim().endsWith("/") ? e : 0 : It(e);
function Rt(e) {
	let t = U(e);
	return Pt(t)(t.values.map((e, n) => Lt(e, t.split[n])));
}
var W = {
	test: Tt,
	parse: Nt,
	createTransformer: Ft,
	getAnimatableNone: Rt
};
//#endregion
//#region node_modules/motion-dom/dist/es/value/types/color/hsla-to-rgba.mjs
function zt(e, t, n) {
	return n < 0 && (n += 1), n > 1 && --n, n < 1 / 6 ? e + (t - e) * 6 * n : n < 1 / 2 ? t : n < 2 / 3 ? e + (t - e) * (2 / 3 - n) * 6 : e;
}
function Bt({ hue: e, saturation: t, lightness: n, alpha: r }) {
	e /= 360, t /= 100, n /= 100;
	let i = 0, a = 0, o = 0;
	if (!t) i = a = o = n;
	else {
		let r = n < .5 ? n * (1 + t) : n + t - n * t, s = 2 * n - r;
		i = zt(s, r, e + 1 / 3), a = zt(s, r, e), o = zt(s, r, e - 1 / 3);
	}
	return {
		red: Math.round(i * 255),
		green: Math.round(a * 255),
		blue: Math.round(o * 255),
		alpha: r
	};
}
//#endregion
//#region node_modules/motion-dom/dist/es/utils/mix/immediate.mjs
function Vt(e, t) {
	return (n) => n > 0 ? t : e;
}
//#endregion
//#region node_modules/motion-dom/dist/es/utils/mix/number.mjs
var G = (e, t, n) => e + (t - e) * n, Ht = (e, t, n) => {
	let r = e * e, i = n * (t * t - r) + r;
	return i < 0 ? 0 : Math.sqrt(i);
}, Ut = [
	vt,
	I,
	V
], Wt = (e) => Ut.find((t) => t.test(e));
function Gt(e) {
	let t = Wt(e);
	if (!t) return w(!1, `'${e}' is not an animatable color. Use the equivalent color code instead.`, "color-not-animatable"), !1;
	let n = t.parse(e);
	return t === V && (n = Bt(n)), n;
}
var Kt = (e, t) => {
	let n = Gt(e), r = Gt(t);
	if (!n || !r) return Vt(e, t);
	let i = { ...n };
	return (e) => (i.red = Ht(n.red, r.red, e), i.green = Ht(n.green, r.green, e), i.blue = Ht(n.blue, r.blue, e), i.alpha = G(n.alpha, r.alpha, e), I.transform(i));
}, qt = /* @__PURE__ */ new Set(["none", "hidden"]);
function Jt(e, t) {
	return qt.has(e) ? (n) => n <= 0 ? e : t : (n) => n >= 1 ? t : e;
}
//#endregion
//#region node_modules/motion-dom/dist/es/utils/mix/complex.mjs
function Yt(e, t) {
	return (n) => G(e, t, n);
}
function Xt(e) {
	return typeof e == "number" ? Yt : typeof e == "string" ? at(e) ? Vt : H.test(e) ? Kt : en : Array.isArray(e) ? Zt : typeof e == "object" ? H.test(e) ? Kt : Qt : Vt;
}
function Zt(e, t) {
	let n = [...e], r = n.length, i = e.map((e, n) => Xt(e)(e, t[n]));
	return (e) => {
		for (let t = 0; t < r; t++) n[t] = i[t](e);
		return n;
	};
}
function Qt(e, t) {
	let n = {
		...e,
		...t
	}, r = {};
	for (let i in n) e[i] !== void 0 && t[i] !== void 0 && (r[i] = Xt(e[i])(e[i], t[i]));
	return (e) => {
		for (let t in r) n[t] = r[t](e);
		return n;
	};
}
function $t(e, t) {
	let n = [], r = {
		color: 0,
		var: 0,
		number: 0
	};
	for (let i = 0; i < t.values.length; i++) {
		let a = t.types[i], o = e.indexes[a][r[a]], s = e.values[o] ?? 0;
		n[i] = s, r[a]++;
	}
	return n;
}
var en = (e, t) => {
	let n = W.createTransformer(t), r = U(e), i = U(t);
	return r.indexes.var.length === i.indexes.var.length && r.indexes.color.length === i.indexes.color.length && r.indexes.number.length >= i.indexes.number.length ? qt.has(e) && !i.values.length || qt.has(t) && !r.values.length ? Jt(e, t) : xe(Zt($t(r, i), i.values), n) : (w(!0, `Complex values '${e}' and '${t}' too different to mix. Ensure all colors are of the same type, and that each contains the same quantity of number and color values. Falling back to instant transition.`, "complex-values-different"), Vt(e, t));
}, tn = /^(-?(?:\d+(?:\.\d*)?|\.\d+))([a-z%]*)$/iu;
function nn(e, t) {
	let n = tn.exec(e);
	if (!n) return;
	let r = tn.exec(t);
	if (!r || n[2] !== r[2]) return;
	let i = n[2], a = parseFloat(n[1]), o = parseFloat(r[1]);
	return (e) => P(G(a, o, e)) + i;
}
function rn(e, t, n) {
	if (typeof e == "number" && typeof t == "number" && typeof n == "number") return G(e, t, n);
	if (typeof e == "string" && typeof t == "string") {
		let n = nn(e, t);
		if (n) return n;
	}
	return Xt(e)(e, t);
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/drivers/frame.mjs
var an = (e) => {
	let t = ({ timestamp: t }) => e(t);
	return {
		start: (e = !0) => j.update(t, e),
		stop: () => et(t),
		now: () => M.isProcessing ? M.timestamp : N.now()
	};
}, on = (e, t, n = 10) => {
	let r = "", i = Math.max(Math.round(t / n), 2);
	for (let t = 0; t < i; t++) r += Math.round(e(t / (i - 1)) * 1e4) / 1e4 + ", ";
	return `linear(${r.substring(0, r.length - 2)})`;
}, sn = 2e4;
function cn(e, t = 50, n = sn, r) {
	let i = 0, a = e.next(i);
	for (r?.push(a.value); !a.done && i < n;) i += t, a = e.next(i), r?.push(a.value);
	return i >= n ? Infinity : i;
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/generators/utils/create-generator-easing.mjs
function ln(e, t = 100, n) {
	let r = n({
		...e,
		keyframes: [0, t]
	}), i = Math.min(cn(r), sn);
	return {
		type: "keyframes",
		ease: (e) => r.next(i * e).value / t,
		duration: /* @__PURE__ */ k(i)
	};
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/generators/spring.mjs
var K = {
	stiffness: 100,
	damping: 10,
	mass: 1,
	velocity: 0,
	duration: 800,
	bounce: .3,
	visualDuration: .3,
	restSpeed: {
		granular: .01,
		default: 2
	},
	restDelta: {
		granular: .005,
		default: .5
	},
	minDuration: .01,
	maxDuration: 10,
	minDamping: .05,
	maxDamping: 1
};
function un(e, t) {
	return e * Math.sqrt(1 - t * t);
}
var dn = 12;
function fn(e, t, n) {
	let r = n;
	for (let n = 1; n < dn; n++) r -= e(r) / t(r);
	return r;
}
var pn = .001;
function mn({ duration: e = K.duration, bounce: t = K.bounce, velocity: n = K.velocity, mass: r = K.mass }) {
	let i, a;
	w(e <= /* @__PURE__ */ O(K.maxDuration), "Spring duration must be 10 seconds or less", "spring-duration-limit");
	let o = 1 - t;
	o = C(K.minDamping, K.maxDamping, o), e = C(K.minDuration, K.maxDuration, /* @__PURE__ */ k(e)), o < 1 ? (i = (t) => {
		let r = t * o, i = r * e, a = r - n, s = un(t, o), c = Math.exp(-i);
		return pn - a / s * c;
	}, a = (t) => {
		let r = t * o * e, a = r * n + n, s = o * o * t * t * e, c = Math.exp(-r), l = un(t * t, o);
		return (-i(t) + pn > 0 ? -1 : 1) * ((a - s) * c) / l;
	}) : (i = (t) => -.001 + Math.exp(-t * e) * ((t - n) * e + 1), a = (t) => Math.exp(-t * e) * ((n - t) * (e * e)));
	let s = 5 / e, c = fn(i, a, s);
	if (e = /* @__PURE__ */ O(e), isNaN(c)) return {
		stiffness: K.stiffness,
		damping: K.damping,
		duration: e
	};
	{
		let t = c * c * r;
		return {
			stiffness: t,
			damping: o * 2 * Math.sqrt(r * t),
			duration: e
		};
	}
}
var hn = ["duration", "bounce"], gn = [
	"stiffness",
	"damping",
	"mass"
];
function _n(e, t) {
	return t.some((t) => e[t] !== void 0);
}
function vn(e) {
	let t = {
		velocity: K.velocity,
		stiffness: K.stiffness,
		damping: K.damping,
		mass: K.mass,
		isResolvedFromDuration: !1,
		...e
	};
	if (!_n(e, gn) && _n(e, hn)) {
		if (t.velocity = 0, e.visualDuration) {
			let n = e.visualDuration, r = 2 * Math.PI / (n * 1.2), i = r * r, a = 2 * C(.05, 1, 1 - (e.bounce || 0)) * Math.sqrt(i);
			t = {
				...t,
				mass: K.mass,
				stiffness: i,
				damping: a
			};
		} else {
			let n = mn({
				...e,
				velocity: 0
			});
			t = {
				...t,
				...n,
				mass: K.mass
			}, t.isResolvedFromDuration = !0;
		}
	}
	return t;
}
function q(e = K.visualDuration, t = K.bounce) {
	let n = typeof e == "object" ? e : {
		visualDuration: e,
		keyframes: [0, 1],
		bounce: t
	}, r = n.keyframes[0], i = n.keyframes[n.keyframes.length - 1], a = {
		done: !1,
		value: r
	}, { stiffness: o, damping: s, mass: c, duration: l, velocity: u, isResolvedFromDuration: d } = vn({
		...n,
		velocity: -/* @__PURE__ */ k(n.velocity || 0)
	}), f = s / (2 * Math.sqrt(o * c)), p = /* @__PURE__ */ k(Math.sqrt(o / c)), m = f * p, h = {
		target: i,
		delta: i - r,
		velocity: u || 0,
		restSpeed: 0,
		restDelta: 0
	}, g = () => {
		let e = Math.abs(h.delta) < 5;
		h.restSpeed = n.restSpeed || (e ? K.restSpeed.granular : K.restSpeed.default), h.restDelta = n.restDelta || (e ? K.restDelta.granular : K.restDelta.default);
	};
	g();
	let _, v, y;
	if (f < 1) {
		let e = un(p, f), t = {
			A: 0,
			sinC: 0,
			cosC: 0,
			t: -1,
			env: 0,
			sin: 0,
			cos: 0
		};
		y = () => {
			t.A = (h.velocity + m * h.delta) / e, t.sinC = m * t.A + h.delta * e, t.cosC = m * h.delta - t.A * e;
		};
		let n = (n) => {
			n !== t.t && (t.t = n, t.env = Math.exp(-m * n), t.sin = Math.sin(e * n), t.cos = Math.cos(e * n));
		};
		_ = (e) => (n(e), h.target - t.env * (t.A * t.sin + h.delta * t.cos)), v = (e) => (n(e), t.env * (t.sinC * t.sin + t.cosC * t.cos));
	} else if (f === 1) {
		_ = (e) => h.target - Math.exp(-p * e) * (h.delta + (h.velocity + p * h.delta) * e);
		let e = { C: 0 };
		y = () => {
			e.C = h.velocity + p * h.delta;
		}, v = (t) => Math.exp(-p * t) * (p * e.C * t - h.velocity);
	} else {
		let e = p * Math.sqrt(f * f - 1);
		_ = (t) => {
			let n = Math.exp(-m * t), r = Math.min(e * t, 300);
			return h.target - n * ((h.velocity + m * h.delta) * Math.sinh(r) + e * h.delta * Math.cosh(r)) / e;
		};
		let t = {
			P: 0,
			sinh: 0,
			cosh: 0
		};
		y = () => {
			t.P = (h.velocity + m * h.delta) / e, t.sinh = m * t.P - h.delta * e, t.cosh = m * h.delta - t.P * e;
		}, v = (n) => {
			let r = Math.exp(-m * n), i = Math.min(e * n, 300);
			return r * (t.sinh * Math.sinh(i) + t.cosh * Math.cosh(i));
		};
	}
	y();
	let b = !_n(n, gn) && _n(n, hn), x = d && l || null, S = {
		calculatedDuration: x,
		retarget: (e, t) => {
			h.target = e[e.length - 1], h.delta = h.target - e[0], h.velocity = b ? 0 : -/* @__PURE__ */ k(t), n.restSpeed && n.restDelta || g(), S.calculatedDuration = x, a.done = !1, y();
		},
		velocity: (e) => /* @__PURE__ */ O(v(e)),
		next: (e) => {
			let t = _(e);
			if (d) a.done = e >= l;
			else {
				let n = /* @__PURE__ */ O(v(e));
				a.done = Math.abs(n) <= h.restSpeed && Math.abs(h.target - t) <= h.restDelta;
			}
			return a.value = a.done ? h.target : t, a;
		},
		toString: () => {
			let e = Math.min(cn(S), sn), t = on((t) => S.next(e * t).value, e, 30);
			return e + "ms " + t;
		},
		toTransition: () => {}
	};
	return S;
}
q.applyToOptions = (e) => {
	let t = ln(e, 100, q);
	return e.ease = t.ease, e.duration = /* @__PURE__ */ O(t.duration), e.type = "keyframes", e;
};
//#endregion
//#region node_modules/motion-dom/dist/es/animation/generators/inertia.mjs
function yn({ keyframes: e, velocity: t = 0, power: n = .8, timeConstant: r = 325, bounceDamping: i = 10, bounceStiffness: a = 500, modifyTarget: o, min: s, max: c, restDelta: l = .5, restSpeed: u }) {
	let d = e[0], f = {
		done: !1,
		value: d
	}, p = (e) => e < s || e > c, m = (e) => s === void 0 ? c : c === void 0 || Math.abs(s - e) < Math.abs(c - e) ? s : c, h = n * t, g = d + h, _ = o === void 0 ? g : o(g);
	_ !== g && (h = _ - d);
	let v = (e) => -h * Math.exp(-e / r), y = (e) => {
		let t = v(e);
		f.done = Math.abs(t) <= l, f.value = f.done ? _ : _ + t;
	}, b, x, S = (e) => {
		p(f.value) && (b = e, x = q({
			keyframes: [f.value, m(f.value)],
			velocity: -v(e) / r * 1e3,
			damping: i,
			stiffness: a,
			restDelta: l,
			restSpeed: u
		}));
	};
	return S(0), {
		calculatedDuration: null,
		next: (e) => {
			let t = !1;
			return !x && b === void 0 && (t = !0, y(e), S(e)), b !== void 0 && e >= b ? x.next(e - b) : (!t && y(e), f);
		}
	};
}
//#endregion
//#region node_modules/motion-dom/dist/es/utils/interpolate.mjs
function bn(e, t, n) {
	let r = [], i = n || E.mix || rn, a = e.length - 1;
	for (let n = 0; n < a; n++) {
		let a = i(e[n], e[n + 1]);
		t && (a = xe(Array.isArray(t) ? t[n] || D : t, a)), r.push(a);
	}
	return r;
}
function xn(e, t, { clamp: n = !0, ease: r, mixer: i } = {}) {
	let a = e.length;
	if (T(a === t.length, "Both input and output ranges must be the same length", "range-length"), a === 1) return () => t[0];
	if (a === 2 && t[0] === t[1]) return () => t[1];
	let o = e[0] === e[1];
	e[0] > e[a - 1] && (e = [...e].reverse(), t = [...t].reverse());
	let s = bn(t, r, i), c = s.length, l = (n) => {
		if (o && n < e[0]) return t[0];
		let r = 0;
		if (c > 1) for (; r < e.length - 2 && !(n < e[r + 1]); r++);
		let i = /* @__PURE__ */ Se(e[r], e[r + 1], n);
		return s[r](i);
	};
	return n ? (t) => l(C(e[0], e[a - 1], t)) : l;
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/keyframes/offsets/fill.mjs
function Sn(e, t) {
	let n = e[e.length - 1];
	for (let r = 1; r <= t; r++) {
		let i = /* @__PURE__ */ Se(0, t, r);
		e.push(G(n, 1, i));
	}
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/keyframes/offsets/default.mjs
function Cn(e) {
	let t = [0];
	return Sn(t, e.length - 1), t;
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/keyframes/offsets/time.mjs
function wn(e, t) {
	return e.map((e) => e * t);
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/generators/keyframes.mjs
function Tn(e, t) {
	return e.map(() => t || Ue).splice(0, e.length - 1);
}
function J({ duration: e = 300, keyframes: t, times: n, ease: r = "easeInOut" }) {
	let i = /* @__PURE__ */ We(r) ? r.map(Ye) : Ye(r), a = {
		done: !1,
		value: t[0]
	};
	if (t.length === 2 && !Array.isArray(i) && (!n || n.length !== 2 || n[0] === 0 && n[1] === 1)) {
		let [n, r] = t, o = n === r ? void 0 : (E.mix || rn)(n, r);
		return {
			calculatedDuration: e,
			next: (t) => (a.value = o ? o(i(e > 0 ? C(0, 1, t / e) : 1)) : r, a.done = t >= e, a)
		};
	}
	let o = xn(wn(n && n.length === t.length ? n : Cn(t), e), t, { ease: Array.isArray(i) ? i : Tn(t, i) });
	return {
		calculatedDuration: e,
		next: (t) => (a.value = o(t), a.done = t >= e, a)
	};
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/generators/utils/velocity.mjs
var En = 5;
function Dn(e, t, n) {
	let r = Math.max(t - En, 0);
	return /* @__PURE__ */ we(n - e(r), t - r);
}
function On(e, t, n = 0) {
	return t <= 0 ? n : e.velocity ? e.velocity(t) : Dn((t) => e.next(t).value, t, e.next(t).value);
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/keyframes/get-final.mjs
var kn = (e) => e !== null;
function An(e, { repeat: t, repeatType: n = "loop" }, r, i = 1) {
	let a = e.filter(kn), o = i < 0 || t && n !== "loop" && t % 2 == 1 ? 0 : a.length - 1;
	return !o || r === void 0 ? a[o] : r;
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/utils/replace-transition-type.mjs
var jn = {
	decay: yn,
	inertia: yn,
	tween: J,
	keyframes: J,
	spring: q
};
function Mn(e) {
	typeof e.type == "string" && (e.type = jn[e.type]);
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/utils/notify-inspector.mjs
function Nn(e, t) {
	return {
		kind: e,
		animation: t,
		timestamp: N.now(),
		frameTimestamp: M.timestamp,
		frameIsProcessing: M.isProcessing
	};
}
function Pn(e, t, n) {
	let r = globalThis.__MOTION_INSPECT__;
	if (r) try {
		r({
			...Nn("animation-start", e),
			options: n ? {
				...t,
				...n
			} : t
		});
	} catch {}
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/utils/WithPromise.mjs
var Fn = class {
	constructor() {
		this.isResolved = !1;
	}
	get finished() {
		return this._finished ||= this.isResolved ? Promise.resolve() : new Promise((e) => {
			this._resolve = e;
		}), this._finished;
	}
	updateFinished() {
		this._finished = this._resolve = void 0, this.isResolved = !1;
	}
	notifyFinished() {
		this.isResolved = !0, this._resolve?.();
	}
	then(e, t) {
		return this.finished.then(e, t);
	}
}, In = (e) => e / 100, Ln = class extends Fn {
	constructor(e) {
		super(), this.state = "idle", this.startTime = null, this.isStopped = !1, this.currentTime = 0, this.holdTime = null, this.playbackSpeed = 1, this.delayState = {
			done: !1,
			value: void 0
		}, this.stop = () => {
			let { motionValue: e } = this.options;
			e && e.updatedAt !== N.now() && this.tick(N.now()), this.isStopped = !0, this.state !== "idle" && (this.teardown(), this.options.onStop?.());
		}, this.options = e, this.initAnimation(), this.play(), e.autoplay === !1 && this.pause(), Pn(this, this.options);
	}
	initAnimation() {
		let { options: e } = this;
		Mn(e);
		let { type: t = J, repeat: n = 0, repeatDelay: r = 0, repeatType: i, velocity: a = 0 } = e, { keyframes: o } = e, s = t || J;
		process.env.NODE_ENV !== "production" && s !== J && T(o.length <= 2, `Only two keyframes currently supported with spring and inertia animations. Trying to animate ${o}`, "spring-two-frames"), s !== J && typeof o[0] != "number" && (this.mixKeyframes = xe(In, rn(o[0], o[1])), o = [0, 100]);
		let c = s(o === e.keyframes ? e : {
			...e,
			keyframes: o
		});
		i === "mirror" && (this.mirroredGenerator = s({
			...e,
			keyframes: [...o].reverse(),
			velocity: -a
		})), c.calculatedDuration === null && (c.calculatedDuration = cn(c));
		let { calculatedDuration: l } = c;
		this.calculatedDuration = l, this.resolvedDuration = l + r, this.totalDuration = this.resolvedDuration * (n + 1) - r, this.generator = c;
	}
	updateTime(e) {
		let t = Math.round(e - this.startTime) * this.playbackSpeed;
		this.currentTime = this.holdTime === null ? t : this.holdTime;
	}
	tick(e, t = !1) {
		let { generator: n, totalDuration: r, mixKeyframes: i, mirroredGenerator: a, resolvedDuration: o, calculatedDuration: s } = this;
		if (this.startTime === null) return n.next(0);
		let { delay: c = 0, keyframes: l, repeat: u, repeatType: d, repeatDelay: f, type: p, onUpdate: m, finalKeyframe: h } = this.options;
		this.speed > 0 ? this.startTime = Math.min(this.startTime, e) : this.speed < 0 && (this.startTime = Math.min(e - r / this.speed, this.startTime)), t ? this.currentTime = e : this.updateTime(e);
		let g = this.currentTime - c * (this.playbackSpeed >= 0 ? 1 : -1), _ = this.playbackSpeed >= 0 ? g < 0 : g > r;
		this.currentTime = Math.max(g, 0), this.state === "finished" && this.holdTime === null && (this.currentTime = r);
		let v = this.currentTime, y = n;
		if (u) {
			let e = Math.min(this.currentTime, r) / o, t = Math.floor(e), n = e % 1;
			!n && e >= 1 && (n = 1), n === 1 && t--, t = Math.min(t, u + 1), t % 2 && (d === "reverse" ? (n = 1 - n, f && (n -= f / o)) : d === "mirror" && (y = a)), v = C(0, 1, n) * o;
		}
		let b;
		_ ? (this.delayState.value = l[0], b = this.delayState) : b = y.next(v), i && !_ && (b.value = i(b.value));
		let { done: x } = b;
		!_ && s !== null && (x = this.playbackSpeed >= 0 ? this.currentTime >= r : this.currentTime <= 0);
		let S = this.holdTime === null && (this.state === "finished" || this.state === "running" && x);
		return S && p !== yn && (b.value = An(l, this.options, h, this.speed)), m && m(b.value), S && this.finish(), b;
	}
	then(e, t) {
		return this.finished.then(e, t);
	}
	get duration() {
		return /* @__PURE__ */ k(this.calculatedDuration);
	}
	get iterationDuration() {
		let { delay: e = 0 } = this.options || {};
		return this.duration + /* @__PURE__ */ k(e);
	}
	get time() {
		return /* @__PURE__ */ k(this.currentTime);
	}
	set time(e) {
		e = /* @__PURE__ */ O(e), this.currentTime = e, this.startTime === null || this.holdTime !== null || this.playbackSpeed === 0 ? this.holdTime = e : this.driver && (this.startTime = this.driver.now() - e / this.playbackSpeed), this.driver ? this.driver.start(!1) : (this.startTime = 0, this.state = "paused", this.holdTime = e, this.tick(e));
	}
	getGeneratorVelocity() {
		return On(this.generator, this.currentTime, this.options.velocity);
	}
	get speed() {
		return this.playbackSpeed;
	}
	set speed(e) {
		let t = this.playbackSpeed !== e;
		t && this.driver && this.updateTime(N.now()), this.playbackSpeed = e, t && this.driver && (this.time = /* @__PURE__ */ k(this.currentTime));
	}
	play() {
		if (this.isStopped) return;
		let { driver: e = an, startTime: t } = this.options;
		this.driver ||= e((e) => this.tick(e)), this.options.onPlay?.();
		let n = this.driver.now();
		this.state === "finished" ? (this.updateFinished(), this.startTime = n) : this.holdTime === null ? this.startTime ||= t ?? n : this.startTime = n - this.holdTime, this.state === "finished" && this.speed < 0 && (this.startTime += this.calculatedDuration), this.holdTime = null, this.state = "running", this.driver.start();
	}
	pause() {
		this.state = "paused", this.updateTime(N.now()), this.holdTime = this.currentTime;
	}
	complete() {
		this.state !== "running" && this.play(), this.state = "finished", this.holdTime = null;
	}
	finish() {
		this.notifyFinished(), this.teardown(), this.state = "finished", this.options.onComplete?.();
	}
	cancel() {
		this.holdTime = null, this.startTime = 0, this.tick(0), this.teardown(), this.options.onCancel?.();
	}
	teardown() {
		this.state = "idle", this.stopDriver(), this.startTime = this.holdTime = null;
	}
	stopDriver() {
		this.driver &&= (this.driver.stop(), void 0);
	}
	sample(e) {
		return this.startTime = 0, this.tick(e, !0);
	}
	attachTimeline(e) {
		return this.options.allowFlatten && (this.options.type = "keyframes", this.options.ease = "linear", this.initAnimation()), this.driver?.stop(), e.observe(this);
	}
}, Rn = /* @__PURE__ */ new Set([
	"brightness",
	"contrast",
	"saturate",
	"opacity"
]);
function zn(e) {
	let [t, n] = e.slice(0, -1).split("(");
	if (t === "drop-shadow") return e;
	let [r] = n.match(ut) || [];
	if (!r) return e;
	let i = n.replace(r, ""), a = +!!Rn.has(t);
	return r !== n && (a *= 100), t + "(" + a + i + ")";
}
var Bn = /\b([a-z-]*)\(.*?\)/gu, Vn = {
	...W,
	getAnimatableNone: (e) => {
		let t = e.match(Bn);
		return t ? t.map(zn).join(" ") : e;
	}
}, Hn = {
	...W,
	getAnimatableNone: (e) => {
		let t = W.parse(e);
		return W.createTransformer(e)(t.map((e) => typeof e == "number" ? 0 : typeof e == "object" ? {
			...e,
			alpha: 1
		} : e));
	}
}, Un = {
	...F,
	transform: Math.round
}, Wn = {
	rotate: R,
	pathRotation: R,
	rotateX: R,
	rotateY: R,
	rotateZ: R,
	scale: lt,
	scaleX: lt,
	scaleY: lt,
	scaleZ: lt,
	skew: R,
	skewX: R,
	skewY: R,
	distance: B,
	translateX: B,
	translateY: B,
	translateZ: B,
	x: B,
	y: B,
	z: B,
	perspective: B,
	transformPerspective: B,
	opacity: ct,
	originX: xt,
	originY: xt,
	originZ: B
}, Y = {
	borderWidth: B,
	borderTopWidth: B,
	borderRightWidth: B,
	borderBottomWidth: B,
	borderLeftWidth: B,
	borderRadius: B,
	borderTopLeftRadius: B,
	borderTopRightRadius: B,
	borderBottomRightRadius: B,
	borderBottomLeftRadius: B,
	width: B,
	maxWidth: B,
	height: B,
	maxHeight: B,
	top: B,
	right: B,
	bottom: B,
	left: B,
	inset: B,
	insetBlock: B,
	insetBlockStart: B,
	insetBlockEnd: B,
	insetInline: B,
	insetInlineStart: B,
	insetInlineEnd: B,
	padding: B,
	paddingTop: B,
	paddingRight: B,
	paddingBottom: B,
	paddingLeft: B,
	paddingBlock: B,
	paddingBlockStart: B,
	paddingBlockEnd: B,
	paddingInline: B,
	paddingInlineStart: B,
	paddingInlineEnd: B,
	margin: B,
	marginTop: B,
	marginRight: B,
	marginBottom: B,
	marginLeft: B,
	marginBlock: B,
	marginBlockStart: B,
	marginBlockEnd: B,
	marginInline: B,
	marginInlineStart: B,
	marginInlineEnd: B,
	fontSize: B,
	backgroundPositionX: B,
	backgroundPositionY: B,
	...Wn,
	zIndex: Un,
	fillOpacity: ct,
	strokeOpacity: ct,
	numOctaves: Un
}, Gn = {
	...Y,
	color: H,
	backgroundColor: H,
	outlineColor: H,
	fill: H,
	stroke: H,
	borderColor: H,
	borderTopColor: H,
	borderRightColor: H,
	borderBottomColor: H,
	borderLeftColor: H,
	filter: Vn,
	WebkitFilter: Vn,
	mask: Hn,
	WebkitMask: Hn
}, Kn = (e) => Gn[e], qn = /*@__PURE__*/ new Set([Vn, Hn]);
function Jn(e, t) {
	let n = Kn(e);
	return qn.has(n) || (n = W), n.getAnimatableNone ? n.getAnimatableNone(t) : void 0;
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/keyframes/utils/fill-wildcards.mjs
function Yn(e) {
	for (let t = 1; t < e.length; t++) e[t] ?? (e[t] = e[t - 1]);
}
//#endregion
//#region node_modules/motion-dom/dist/es/render/dom/parse-transform.mjs
var X = (e) => e * 180 / Math.PI, Xn = (e) => Qn(X(Math.atan2(e[1], e[0]))), Zn = {
	x: 4,
	y: 5,
	translateX: 4,
	translateY: 5,
	scaleX: 0,
	scaleY: 3,
	scale: (e) => (Math.abs(e[0]) + Math.abs(e[3])) / 2,
	rotate: Xn,
	rotateZ: Xn,
	skewX: (e) => X(Math.atan(e[1])),
	skewY: (e) => X(Math.atan(e[2])),
	skew: (e) => (Math.abs(e[1]) + Math.abs(e[2])) / 2
}, Qn = (e) => (e %= 360, e < 0 && (e += 360), e), $n = Xn, er = (e) => Math.sqrt(e[0] * e[0] + e[1] * e[1]), tr = (e) => Math.sqrt(e[4] * e[4] + e[5] * e[5]), nr = {
	x: 12,
	y: 13,
	z: 14,
	translateX: 12,
	translateY: 13,
	translateZ: 14,
	scaleX: er,
	scaleY: tr,
	scale: (e) => (er(e) + tr(e)) / 2,
	rotateX: (e) => Qn(X(Math.atan2(e[6], e[5]))),
	rotateY: (e) => Qn(X(Math.atan2(-e[2], e[0]))),
	rotateZ: $n,
	rotate: $n,
	skewX: (e) => X(Math.atan(e[4])),
	skewY: (e) => X(Math.atan(e[1])),
	skew: (e) => (Math.abs(e[1]) + Math.abs(e[4])) / 2
};
function rr(e) {
	return +!!e.includes("scale");
}
function ir(e, t) {
	if (!e || e === "none") return rr(t);
	let n = e.match(/^matrix3d\(([-\d.e\s,]+)\)$/u), r, i;
	if (n) r = nr, i = n;
	else {
		let t = e.match(/^matrix\(([-\d.e\s,]+)\)$/u);
		r = Zn, i = t;
	}
	if (!i) return rr(t);
	let a = r[t], o = i[1].split(",").map(or);
	return typeof a == "function" ? a(o) : o[a];
}
var ar = (e, t) => {
	let { transform: n = "none" } = getComputedStyle(e);
	return ir(n, t);
};
function or(e) {
	return parseFloat(e.trim());
}
//#endregion
//#region node_modules/motion-dom/dist/es/render/utils/keys-transform.mjs
var sr = [
	"transformPerspective",
	"x",
	"y",
	"z",
	"translateX",
	"translateY",
	"translateZ",
	"scale",
	"scaleX",
	"scaleY",
	"rotate",
	"rotateX",
	"rotateY",
	"rotateZ",
	"skew",
	"skewX",
	"skewY"
], cr = /* @__PURE__ */ new Set([...sr, "pathRotation"]), lr = (e) => e === F || e === B, ur = /* @__PURE__ */ new Set([
	"x",
	"y",
	"z"
]), dr = sr.filter((e) => !ur.has(e));
function fr(e) {
	let t = [];
	return dr.forEach((n) => {
		let r = e.getValue(n);
		if (r !== void 0) {
			let e = r.get(), i = +!!n.startsWith("scale");
			if (e === i) return;
			t.push([n, e]), r.set(i);
		}
	}), t;
}
var pr = /* @__PURE__ */ new Set(["bottom", "right"]);
function mr(e, t, n, r, i, a) {
	let o = parseFloat(e);
	if (!isNaN(o)) return o;
	let { min: s, max: c } = t()[n], l = c - s;
	return a === "border-box" ? l : l - parseFloat(r) - parseFloat(i);
}
var Z = {
	width: ({ width: e, paddingLeft: t = "0", paddingRight: n = "0", boxSizing: r }, i) => mr(e, i, "x", t, n, r),
	height: ({ height: e, paddingTop: t = "0", paddingBottom: n = "0", boxSizing: r }, i) => mr(e, i, "y", t, n, r),
	top: ({ top: e }) => parseFloat(e),
	left: ({ left: e }) => parseFloat(e),
	bottom: ({ top: e }, t) => {
		let { y: n } = t();
		return parseFloat(e) + (n.max - n.min);
	},
	right: ({ left: e }, t) => {
		let { x: n } = t();
		return parseFloat(e) + (n.max - n.min);
	},
	x: ({ transform: e }) => ir(e, "x"),
	y: ({ transform: e }) => ir(e, "y")
};
Z.translateX = Z.x, Z.translateY = Z.y;
//#endregion
//#region node_modules/motion-dom/dist/es/animation/keyframes/KeyframesResolver.mjs
var Q = /* @__PURE__ */ new Set(), hr = !1, gr = !1, _r = !1;
function vr() {
	if (gr) {
		let e = [], t = /* @__PURE__ */ new Set(), n = /* @__PURE__ */ new Set();
		Q.forEach((r) => {
			r.needsMeasurement && (e.push(r), t.add(r.element), pr.has(r.name) && n.add(r.element));
		});
		let r = /* @__PURE__ */ new Map();
		n.forEach((e) => {
			let t = fr(e);
			t.length && (r.set(e, t), e.render());
		}), e.forEach((e) => e.measureInitialState()), t.forEach((e) => {
			e.render();
			let t = r.get(e);
			t && t.forEach(([t, n]) => {
				e.getValue(t)?.set(n);
			});
		}), e.forEach((e) => e.measureEndState()), e.forEach((e) => {
			e.suspendedScrollY !== void 0 && window.scrollTo(0, e.suspendedScrollY);
		});
	}
	gr = !1, hr = !1, Q.forEach((e) => e.complete(_r)), Q.clear();
}
function yr() {
	Q.forEach((e) => {
		e.readKeyframes(), e.needsMeasurement && (gr = !0);
	});
}
function br() {
	_r = !0, yr(), vr(), _r = !1;
}
function xr(e, t, n) {
	if (typeof e == "string") {
		if (_e(e) || ye(e)) return parseFloat(e);
		if (!W.test(e) && W.test(n)) return Jn(t, n);
	}
	return e ?? void 0;
}
var Sr = class {
	constructor(e, t, n, r, i, a = !1) {
		this.state = "pending", this.isAsync = !1, this.needsMeasurement = !1, this.unresolvedKeyframes = [...e], this.onComplete = t, this.name = n, this.motionValue = r, this.element = i, this.isAsync = a;
	}
	scheduleResolve() {
		this.state = "scheduled", this.isAsync ? (Q.add(this), hr || (hr = !0, j.read(yr), j.resolveKeyframes(vr))) : (this.readKeyframes(), this.complete());
	}
	readKeyframes() {
		let { unresolvedKeyframes: e, name: t, element: n, motionValue: r } = this;
		if (e[0] === null) {
			let i = r?.get(), a = e[e.length - 1];
			if (i !== void 0) e[0] = i;
			else if (n && t) {
				let r = xr(n.readValue(t, a), t, a);
				r !== void 0 && (e[0] = r);
			}
			e[0] === void 0 && (e[0] = a), r && i === void 0 && r.set(e[0]);
		}
		Yn(e);
	}
	setFinalKeyframe() {}
	measureInitialState() {}
	renderEndStyles() {}
	measureEndState() {}
	complete(e = !1) {
		this.state = "complete", this.onComplete(this.unresolvedKeyframes, this.finalKeyframe, e), Q.delete(this);
	}
	cancel() {
		this.state === "scheduled" && (Q.delete(this), this.state = "pending");
	}
	resume() {
		this.state === "pending" && this.scheduleResolve();
	}
}, Cr = (e) => e.startsWith("--");
//#endregion
//#region node_modules/motion-dom/dist/es/render/dom/style-set.mjs
function wr(e, t, n) {
	Cr(t) ? e.style.setProperty(t, n) : e.style[t] = n;
}
//#endregion
//#region node_modules/motion-dom/dist/es/utils/supports/flags.mjs
var Tr = {};
//#endregion
//#region node_modules/motion-dom/dist/es/utils/supports/memo.mjs
function Er(e, t) {
	let n = /* @__PURE__ */ be(e);
	return () => Tr[t] ?? n();
}
//#endregion
//#region node_modules/motion-dom/dist/es/utils/supports/scroll-timeline.mjs
var Dr = /* @__PURE__ */ Er(() => window.ScrollTimeline !== void 0, "scrollTimeline"), Or = /*@__PURE__*/ Er(() => {
	try {
		document.createElement("div").animate({ opacity: 0 }, { easing: "linear(0, 1)" });
	} catch {
		return !1;
	}
	return !0;
}, "linearEasing"), kr = ([e, t, n, r]) => `cubic-bezier(${e}, ${t}, ${n}, ${r})`, Ar = {
	linear: "linear",
	ease: "ease",
	easeIn: "ease-in",
	easeOut: "ease-out",
	easeInOut: "ease-in-out",
	circIn: /*@__PURE__*/ kr([
		0,
		.65,
		.55,
		1
	]),
	circOut: /*@__PURE__*/ kr([
		.55,
		0,
		1,
		.45
	]),
	backIn: /*@__PURE__*/ kr([
		.31,
		.01,
		.66,
		-.59
	]),
	backOut: /*@__PURE__*/ kr([
		.33,
		1.53,
		.69,
		.99
	])
};
//#endregion
//#region node_modules/motion-dom/dist/es/animation/waapi/easing/map-easing.mjs
function jr(e, t) {
	if (e) return typeof e == "function" ? Or() ? on(e, t) : "ease-out" : /* @__PURE__ */ Ke(e) ? kr(e) : Array.isArray(e) ? e.map((e) => jr(e, t) || Ar.easeOut) : Ar[e];
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/waapi/start-waapi-animation.mjs
function Mr(e, t, n, { delay: r = 0, duration: i = 300, repeat: a = 0, repeatType: o = "loop", ease: s = "easeOut", times: c } = {}, l = void 0) {
	let u = { [t]: n };
	c && (u.offset = c);
	let d = jr(s, i);
	Array.isArray(d) && (u.easing = d);
	let f = {
		delay: r,
		duration: i,
		easing: Array.isArray(d) ? "linear" : d,
		fill: "both",
		iterations: a + 1,
		direction: o === "reverse" ? "alternate" : "normal"
	};
	return l && (f.pseudoElement = l), e.animate(u, f);
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/generators/utils/is-generator.mjs
function Nr(e) {
	return typeof e == "function" && "applyToOptions" in e;
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/waapi/utils/apply-generator.mjs
function Pr({ type: e, ...t }) {
	return Nr(e) && Or() ? e.applyToOptions(t) : (t.duration ??= 300, t.ease ??= "easeOut", t);
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/NativeAnimation.mjs
var Fr = class extends Fn {
	constructor(e) {
		if (super(), this.finishedTime = null, this.isStopped = !1, this.manualStartTime = null, !e) return;
		let { element: t, name: n, keyframes: r, pseudoElement: i, allowFlatten: a = !1, finalKeyframe: o, onComplete: s } = e;
		this.isPseudoElement = !!i, this.allowFlatten = a, this.options = e, T(typeof e.type != "string", "Mini animate() doesn't support \"type\" as a string.", "mini-spring");
		let c = Pr(e);
		this.animation = Mr(t, n, r, c, i), c.autoplay === !1 && this.animation.pause(), this.animation.onfinish = () => {
			if (this.finishedTime = this.time, !i) {
				let e = An(r, this.options, o, this.speed);
				this.updateMotionValue && this.updateMotionValue(e), wr(t, n, e), this.animation.cancel();
			}
			s?.(), this.notifyFinished();
		}, Pn(this, e, c);
	}
	play() {
		this.isStopped || (this.manualStartTime = null, this.animation.play(), this.state === "finished" && this.updateFinished());
	}
	pause() {
		this.animation.pause();
	}
	complete() {
		this.animation.finish?.();
	}
	cancel() {
		try {
			this.animation.cancel();
		} catch {}
	}
	stop() {
		if (this.isStopped) return;
		this.isStopped = !0;
		let { state: e } = this;
		e !== "idle" && e !== "finished" && (this.updateMotionValue ? this.updateMotionValue() : this.commitStyles(), this.isPseudoElement || this.cancel());
	}
	commitStyles() {
		let e = this.options?.element;
		!this.isPseudoElement && e?.isConnected && this.animation.commitStyles?.();
	}
	get duration() {
		let e = this.animation.effect?.getComputedTiming?.().duration || 0;
		return /* @__PURE__ */ k(Number(e));
	}
	get iterationDuration() {
		let { delay: e = 0 } = this.options || {};
		return this.duration + /* @__PURE__ */ k(e);
	}
	get time() {
		return /* @__PURE__ */ k(Number(this.animation.currentTime) || 0);
	}
	set time(e) {
		let t = this.finishedTime !== null;
		this.manualStartTime = null, this.finishedTime = null, this.animation.currentTime = /* @__PURE__ */ O(e), t && this.animation.pause();
	}
	get speed() {
		return this.animation.playbackRate;
	}
	set speed(e) {
		e < 0 && (this.finishedTime = null), this.animation.playbackRate = e;
	}
	get state() {
		return this.finishedTime === null ? this.animation.playState : "finished";
	}
	get startTime() {
		return this.manualStartTime ?? Number(this.animation.startTime);
	}
	set startTime(e) {
		this.manualStartTime = this.animation.startTime = e;
	}
	attachTimeline({ timeline: e, rangeStart: t, rangeEnd: n, observe: r }) {
		return this.allowFlatten && this.animation.effect?.updateTiming({ easing: "linear" }), this.animation.onfinish = null, e && Dr() ? (this.animation.timeline = e, t && (this.animation.rangeStart = t), n && (this.animation.rangeEnd = n), D) : r(this);
	}
}, Ir = {
	anticipate: Le,
	backInOut: Ie,
	circInOut: Be
};
function Lr(e) {
	return e in Ir;
}
function Rr(e) {
	typeof e.ease == "string" && Lr(e.ease) && (e.ease = Ir[e.ease]);
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/NativeAnimationExtended.mjs
var zr = 10, Br = class extends Fr {
	constructor(e) {
		Rr(e), Mn(e), super(e), e.startTime !== void 0 && e.autoplay !== !1 && (this.startTime = e.startTime), this.options = e;
	}
	updateMotionValue(e) {
		let { motionValue: t, onUpdate: n, onComplete: r, element: i, ...a } = this.options;
		if (!t) return;
		if (e !== void 0) {
			t.set(e);
			return;
		}
		let o = new Ln({
			...a,
			autoplay: !1
		}), s = Math.max(zr, N.now() - this.startTime), c = C(0, zr, s - zr), l = o.sample(s).value, { name: u } = this.options;
		i && u && wr(i, u, l), t.setWithVelocity(o.sample(Math.max(0, s - c)).value, l, c), o.stop();
	}
}, Vr = (e, t) => t !== "zIndex" && !!(typeof e == "number" || Array.isArray(e) || typeof e == "string" && (W.test(e) || e === "0") && !e.startsWith("url("));
//#endregion
//#region node_modules/motion-dom/dist/es/animation/utils/can-animate.mjs
function Hr(e) {
	let t = e[0];
	if (e.length === 1) return !0;
	for (let n = 0; n < e.length; n++) if (e[n] !== t) return !0;
}
function Ur(e, t, n, r) {
	let i = e[0];
	if (i === null) return !1;
	if (t === "display" || t === "visibility") return !0;
	let a = e[e.length - 1], o = Vr(i, t), s = Vr(a, t);
	return !o || !s ? (o !== s && w(!1, `You are trying to animate ${t} from "${i}" to "${a}". "${o ? a : i}" is not an animatable value.`, "value-not-animatable"), !1) : Hr(e) || (n === "spring" || Nr(n)) && r;
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/utils/make-animation-instant.mjs
function Wr(e) {
	e.duration = 0, e.type = "keyframes";
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/waapi/utils/accelerated-values.mjs
var Gr = /* @__PURE__ */ new Set([
	"opacity",
	"clipPath",
	"filter",
	"transform",
	"backgroundColor"
]), Kr = /^(?:oklch|oklab|lab|lch|color|color-mix|light-dark)\(/;
function qr(e) {
	for (let t = 0; t < e.length; t++) if (typeof e[t] == "string" && Kr.test(e[t])) return !0;
	return !1;
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/waapi/supports/waapi.mjs
var Jr = /* @__PURE__ */ new Set([
	"color",
	"backgroundColor",
	"outlineColor",
	"fill",
	"stroke",
	"borderColor",
	"borderTopColor",
	"borderRightColor",
	"borderBottomColor",
	"borderLeftColor"
]), Yr = /*@__PURE__*/ be(() => Object.hasOwnProperty.call(Element.prototype, "animate"));
function Xr(e) {
	let { motionValue: t, name: n, repeatDelay: r, repeatType: i, damping: a, type: o, keyframes: s } = e;
	if (!n || !(Gr.has(n) || Jr.has(n))) return !1;
	let c = t?.owner?.current;
	if (!(c instanceof HTMLElement) && !(c instanceof SVGElement)) return !1;
	let { onUpdate: l, transformTemplate: u } = t.owner.getProps();
	return Yr() && (Gr.has(n) || Jr.has(n) && qr(s)) && (n !== "transform" || !u) && !l && !r && i !== "mirror" && a !== 0 && o !== "inertia";
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/AsyncMotionValueAnimation.mjs
var Zr = 40, Qr = class extends Fn {
	constructor(e) {
		super(), this.stop = () => {
			this._animation && (this._animation.stop(), this.stopTimeline?.()), this.keyframeResolver?.cancel();
		}, this.createdAt = N.now();
		let { keyframes: t, name: n, motionValue: r, element: i } = e, a = e;
		a.autoplay ??= !0, a.delay ??= 0, a.type ??= "keyframes", a.repeat ??= 0, a.repeatDelay ??= 0, a.repeatType ??= "loop";
		let o = i?.KeyframeResolver || Sr;
		this.keyframeResolver = new o(t, (e, t, n) => this.onKeyframesResolved(e, t, a, !n), n, r, i), this.keyframeResolver?.scheduleResolve();
	}
	onKeyframesResolved(e, t, n, r) {
		this.keyframeResolver = void 0;
		let { name: i, type: a, velocity: o, delay: s, isHandoff: c, onUpdate: l } = n;
		this.resolvedAt = N.now();
		let u = !0;
		Ur(e, i, a, o) || (u = !1, (E.instantAnimations || !s) && l?.(An(e, n, t)), e[0] = e[e.length - 1], Wr(n), n.repeat = 0);
		let d = r ? this.resolvedAt && this.resolvedAt - this.createdAt > Zr ? this.resolvedAt : this.createdAt : void 0, { onComplete: f } = n;
		n.startTime ??= d, n.finalKeyframe = t, n.keyframes = e, n.onComplete = () => {
			f?.(), this.notifyFinished();
		};
		let p = u && !c && Xr(n), m;
		if (p) {
			n.element = n.motionValue?.owner?.current;
			try {
				m = new Br(n);
			} catch {
				m = new Ln(n);
			}
		} else m = new Ln(n);
		this.pendingTimeline &&= (this.stopTimeline = m.attachTimeline(this.pendingTimeline), void 0), this._animation = m;
	}
	get finished() {
		return this._animation ? this._animation.finished : super.finished;
	}
	then(e, t) {
		return this.finished.finally(e).then(() => {});
	}
	get animation() {
		return this._animation || (this.keyframeResolver?.resume(), br()), this._animation;
	}
	get duration() {
		return this.animation.duration;
	}
	get iterationDuration() {
		return this.animation.iterationDuration;
	}
	get time() {
		return this.animation.time;
	}
	set time(e) {
		this.animation.time = e;
	}
	get speed() {
		return this.animation.speed;
	}
	get state() {
		return this.animation.state;
	}
	set speed(e) {
		this.animation.speed = e;
	}
	get startTime() {
		return this.animation.startTime;
	}
	attachTimeline(e) {
		return this._animation ? this.stopTimeline = this.animation.attachTimeline(e) : this.pendingTimeline = e, () => this.stop();
	}
	play() {
		this.animation.play();
	}
	pause() {
		this.animation.pause();
	}
	complete() {
		this.animation.complete();
	}
	cancel() {
		this._animation && this.animation.cancel(), this.keyframeResolver?.cancel();
	}
}, $r = class {
	constructor(e) {
		this.stop = () => this.runAll("stop"), this.animations = e.filter(Boolean);
	}
	get finished() {
		return Promise.all(this.animations.map((e) => e.finished));
	}
	getAll(e) {
		return this.animations[0][e];
	}
	setAll(e, t) {
		for (let n = 0; n < this.animations.length; n++) this.animations[n][e] = t;
	}
	attachTimeline(e) {
		let t = this.animations.map((t) => t.attachTimeline(e));
		return () => {
			t.forEach((e, t) => {
				e && e(), this.animations[t].stop();
			});
		};
	}
	get time() {
		return this.getAll("time");
	}
	set time(e) {
		this.setAll("time", e);
	}
	get speed() {
		return this.getAll("speed");
	}
	set speed(e) {
		this.setAll("speed", e);
	}
	get state() {
		return this.getAll("state");
	}
	get startTime() {
		return this.getAll("startTime");
	}
	get duration() {
		return ei(this.animations, "duration");
	}
	get iterationDuration() {
		return ei(this.animations, "iterationDuration");
	}
	runAll(e) {
		this.animations.forEach((t) => t[e]());
	}
	play() {
		this.runAll("play");
	}
	pause() {
		this.runAll("pause");
	}
	cancel() {
		this.runAll("cancel");
	}
	complete() {
		this.runAll("complete");
	}
};
function ei(e, t) {
	let n = 0;
	for (let r = 0; r < e.length; r++) {
		let i = e[r][t];
		i !== null && i > n && (n = i);
	}
	return n;
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/GroupAnimationWithThen.mjs
var ti = class extends $r {
	then(e, t) {
		return this.finished.finally(e).then(() => {});
	}
}, ni = 30, ri = (e) => !isNaN(parseFloat(e)), ii = { current: void 0 }, ai = class {
	constructor(e, t = {}) {
		this.canTrackVelocity = null, this.events = {}, this.updateAndNotify = (e) => {
			let t = N.now();
			if (this.updatedAt !== t && this.setPrevFrameValue(), this.prev = this.current, this.setCurrent(e), this.current !== this.prev && (this.notifyChange(), this.dependents)) for (let e of this.dependents) e.dirty();
		}, this.hasAnimated = !1, this.setCurrent(e), this.owner = t.owner;
	}
	setCurrent(e) {
		this.current = e, this.updatedAt = N.now(), this.canTrackVelocity === null && e !== void 0 && (this.canTrackVelocity = ri(this.current));
	}
	setPrevFrameValue(e = this.current) {
		this.prevFrameValue = e, this.prevUpdatedAt = this.updatedAt;
	}
	onChange(e) {
		return process.env.NODE_ENV !== "production" && Ee(!1, "value.onChange(callback) is deprecated. Switch to value.on(\"change\", callback)."), this.on("change", e);
	}
	on(e, t) {
		var n;
		return e === "change" ? this.onChangeSubscribe(t) : ((n = this.events)[e] || (n[e] = new Ce())).add(t);
	}
	onChangeSubscribe(e) {
		let { events: t } = this;
		return !t.change && !this.changeSubscriber ? this.changeSubscriber = e : (t.change || (t.change = new Ce(), t.change.add(this.changeSubscriber), this.changeSubscriber = void 0), t.change.add(e)), () => {
			this.changeSubscriber === e ? this.changeSubscriber = void 0 : t.change?.remove(e), this.stopIfUnobserved();
		};
	}
	stopIfUnobserved() {
		j.read(() => {
			!this.changeSubscriber && !this.events.change?.getSize() && this.stop();
		});
	}
	clearListeners() {
		this.changeSubscriber = void 0;
		for (let e in this.events) this.events[e].clear();
	}
	attach(e, t) {
		this.passiveEffect = e, this.stopPassiveEffect = t;
	}
	set(e) {
		this.passiveEffect ? this.passiveEffect(e, this.updateAndNotify) : this.updateAndNotify(e);
	}
	setWithVelocity(e, t, n) {
		this.set(t), this.prev = void 0, this.prevFrameValue = e, this.prevUpdatedAt = this.updatedAt - n;
	}
	jump(e, t = !0) {
		this.updateAndNotify(e), this.prev = e, this.prevUpdatedAt = this.prevFrameValue = void 0, t && this.stop(), this.stopPassiveEffect && this.stopPassiveEffect();
	}
	dirty() {
		this.notifyChange();
	}
	notifyChange() {
		let { current: e, changeSubscriber: t } = this;
		t ? t(e) : this.events.change?.notify(e);
	}
	addDependent(e) {
		this.dependents ||= /* @__PURE__ */ new Set(), this.dependents.add(e);
	}
	removeDependent(e) {
		this.dependents && this.dependents.delete(e);
	}
	get() {
		return ii.current && ii.current.push(this), this.current;
	}
	getPrevious() {
		return this.prev;
	}
	getVelocity() {
		let e = N.now();
		if (!this.canTrackVelocity || this.prevFrameValue === void 0 || e - this.updatedAt > ni) return 0;
		let t = Math.min(this.updatedAt - this.prevUpdatedAt, ni);
		return /* @__PURE__ */ we(parseFloat(this.current) - parseFloat(this.prevFrameValue), t);
	}
	start(e) {
		return this.stop(), new Promise((t) => {
			this.hasAnimated = !0;
			let n = !1, r;
			r = e(() => {
				n = !0, this.events.animationComplete?.notify(), this.animation === r && this.clearAnimation(), t();
			}), n || (this.animation = r), this.events.animationStart?.notify();
		});
	}
	stop() {
		this.animation && (this.animation.stop(), this.events.animationCancel && this.events.animationCancel.notify()), this.clearAnimation();
	}
	isAnimating() {
		return !!this.animation;
	}
	clearAnimation() {
		this.animation = void 0;
	}
	destroy() {
		this.dependents?.clear(), this.events.destroy?.notify(), this.clearListeners(), this.stop(), this.stopPassiveEffect && this.stopPassiveEffect();
	}
};
function oi(e, t) {
	return new ai(e, t);
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/utils/resolve-transition.mjs
function si(e, t) {
	if (e?.inherit && t) {
		let { inherit: n, ...r } = e;
		return {
			...t,
			...r
		};
	}
	return e;
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/utils/get-value-transition.mjs
function ci(e, t) {
	let n = e?.[t] ?? e?.default ?? e;
	return n === e ? n : si(n, e);
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/utils/default-transitions.mjs
var li = {
	type: "spring",
	stiffness: 500,
	damping: 25,
	restSpeed: 10
}, ui = (e) => ({
	type: "spring",
	stiffness: 550,
	damping: e === 0 ? 2 * Math.sqrt(550) : 30,
	restSpeed: 10
}), di = {
	type: "keyframes",
	duration: .8
}, fi = {
	type: "keyframes",
	ease: [
		.25,
		.1,
		.35,
		1
	],
	duration: .3
}, pi = (e, { keyframes: t }) => t.length > 2 ? di : cr.has(e) ? e.startsWith("scale") ? ui(t[1]) : li : fi, mi = /* @__PURE__ */ new Set([
	"when",
	"delay",
	"delayChildren",
	"staggerChildren",
	"staggerDirection",
	"repeat",
	"repeatType",
	"repeatDelay",
	"from",
	"elapsed"
]);
function hi(e) {
	for (let t in e) if (!mi.has(t)) return !0;
	return !1;
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/interfaces/motion-value.mjs
var gi = (e, t, n, r = {}, i, a) => (o) => {
	let s = ci(r, e) || {}, c = s.delay || r.delay || 0, { elapsed: l = 0 } = r;
	l -= /* @__PURE__ */ O(c);
	let u = {
		keyframes: Array.isArray(n) ? n : [null, n],
		ease: "easeOut",
		velocity: t.getVelocity(),
		...s,
		delay: -l,
		onUpdate: (e) => {
			t.set(e), s.onUpdate && s.onUpdate(e);
		},
		onComplete: () => {
			o(), s.onComplete && s.onComplete();
		},
		name: e,
		motionValue: t,
		element: a ? void 0 : i
	};
	hi(s) || Object.assign(u, pi(e, u)), u.duration &&= /* @__PURE__ */ O(u.duration), u.repeatDelay &&= /* @__PURE__ */ O(u.repeatDelay), u.from !== void 0 && (u.keyframes[0] = u.from);
	let d = !1;
	if ((u.type === !1 || u.duration === 0 && !u.repeatDelay) && (Wr(u), u.delay === 0 && (d = !0)), (E.instantAnimations || E.skipAnimations || i?.shouldSkipAnimations || s.skipAnimations) && (d = !0, Wr(u), u.delay = 0), u.allowFlatten = !s.type && !s.ease, d && !a && t.get() !== void 0) {
		let e = An(u.keyframes, s);
		if (e !== void 0) {
			j.update(() => {
				u.onUpdate(e), u.onComplete();
			});
			return;
		}
	}
	return s.isSync ? new Ln(u) : new Qr(u);
}, _i = /^var\(--(?:([\w-]+)|([\w-]+), ?([a-zA-Z\d ()%#.,-]+))\)/u;
function vi(e) {
	let t = _i.exec(e);
	if (!t) return [,];
	let [, n, r, i] = t;
	return [`--${n ?? r}`, i];
}
var yi = 4;
function bi(e, t, n = 1) {
	T(n <= yi, `Max CSS variable fallback depth detected in property "${e}". This may indicate a circular fallback dependency.`, "max-css-var-depth");
	let [r, i] = vi(e);
	if (!r) return;
	let a = window.getComputedStyle(t).getPropertyValue(r);
	if (a) {
		let e = a.trim();
		return _e(e) ? parseFloat(e) : e;
	}
	return at(i) ? bi(i, t, n + 1) : i;
}
//#endregion
//#region node_modules/motion-dom/dist/es/render/utils/keys-position.mjs
var xi = /* @__PURE__ */ new Set([
	"width",
	"height",
	"top",
	"left",
	"right",
	"bottom",
	...sr
]), Si = (e) => !!(e && e.getVelocity);
//#endregion
//#region node_modules/motion-dom/dist/es/render/dom/utils/camel-to-dash.mjs
function Ci(e) {
	return e.replace(/([A-Z])/g, (e) => `-${e.toLowerCase()}`);
}
//#endregion
//#region node_modules/motion-dom/dist/es/value/types/auto.mjs
var wi = {
	test: (e) => e === "auto",
	parse: (e) => e
}, Ti = (e) => (t) => t.test(e), Ei = [
	F,
	B,
	z,
	R,
	bt,
	yt,
	wi
], Di = (e) => Ei.find(Ti(e));
//#endregion
//#region node_modules/motion-dom/dist/es/animation/keyframes/utils/is-none.mjs
function Oi(e) {
	return typeof e == "number" ? e === 0 : e === null || e === "none" || e === "0" || ye(e);
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/keyframes/utils/make-none-animatable.mjs
var ki = /* @__PURE__ */ new Set([
	"auto",
	"none",
	"0"
]);
function Ai(e, t, n) {
	let r = 0, i;
	for (; r < e.length && !i;) {
		let t = e[r];
		typeof t == "string" && !ki.has(t) && Mt(t) && (i = e[r]), r++;
	}
	if (i && n) for (let r of t) e[r] !== i && (e[r] = Jn(n, i));
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/keyframes/DOMKeyframesResolver.mjs
var ji = class extends Sr {
	constructor(e, t, n, r, i) {
		super(e, t, n, r, i, !0);
	}
	readKeyframes() {
		let { unresolvedKeyframes: e, element: t, name: n } = this;
		if (!t || !t.current) return;
		super.readKeyframes();
		for (let n = 0; n < e.length; n++) {
			let r = e[n];
			if (typeof r == "string" && (r = r.trim(), at(r))) {
				let i = bi(r, t.current);
				i !== void 0 && (e[n] = i), n === e.length - 1 && (this.finalKeyframe = r);
			}
		}
		if (this.resolveNoneKeyframes(), !xi.has(n) || e.length !== 2) return;
		let [r, i] = e;
		if (typeof r == "number" && typeof i == "number") return;
		let a = Di(r), o = Di(i);
		if (st(r) !== st(i) && Z[n]) {
			this.needsMeasurement = !0;
			return;
		}
		if (a !== o) {
			if (lr(a) && lr(o)) for (let t = 0; t < e.length; t++) {
				let n = e[t];
				typeof n == "string" && (e[t] = parseFloat(n));
			}
			else Z[n] && (this.needsMeasurement = !0);
		}
	}
	resolveNoneKeyframes() {
		let { unresolvedKeyframes: e, name: t } = this, n = [];
		for (let t = 0; t < e.length; t++) (e[t] === null || Oi(e[t])) && n.push(t);
		n.length && Ai(e, n, t);
	}
	measure() {
		let { element: e, name: t } = this;
		return Z[t](window.getComputedStyle(e.current), () => e.measureViewportBox());
	}
	measureInitialState() {
		let { element: e, unresolvedKeyframes: t, name: n } = this;
		if (!e || !e.current) return;
		n === "height" && (this.suspendedScrollY = window.pageYOffset), this.measuredOrigin = this.measure(), t[0] = this.measuredOrigin;
		let r = t[t.length - 1];
		r !== void 0 && this.motionValue?.jump(r, !1);
	}
	measureEndState() {
		let { element: e, unresolvedKeyframes: t } = this;
		if (!e || !e.current) return;
		this.motionValue?.jump(this.measuredOrigin, !1);
		let n = t.length - 1, r = t[n];
		t[n] = this.measure(), r !== null && this.finalKeyframe === void 0 && (this.finalKeyframe = r), this.removedTransforms?.length && this.removedTransforms.forEach(([t, n]) => {
			e.getValue(t).set(n);
		}), this.resolveNoneKeyframes();
	}
}, Mi = [];
function Ni(e) {
	T(typeof e.test == "function" && typeof e.read == "function", "Effects passed to animate.addEffect() need test() and read().", "effect-missing-test"), Pi(e), Mi.unshift(e);
}
function Pi(e) {
	he(Mi, e);
}
function Fi(e) {
	return Mi.find((t) => t.test(e));
}
function Ii(e, t, n = {}, r) {
	let i = [], { velocity: a } = n, o = n.reduceMotion ?? r?.shouldReduceMotion;
	for (let s in t) {
		if (s === "transition" || s === "transitionEnd") continue;
		let c = t[s];
		if (c === void 0) continue;
		let l = e(s), u = l.get();
		if (u !== void 0 && !l.isAnimating() && !Array.isArray(c) && c === u && !a) {
			j.update(() => l.set(c));
			continue;
		}
		l.start(gi(s, l, c, o && xi.has(s) ? { type: !1 } : n, r)), l.animation && i.push(l.animation);
	}
	let { transitionEnd: s } = t;
	if (s) {
		let t = () => j.update(() => {
			for (let t in s) e(t).set(s[t]);
		});
		i.length ? Promise.all(i).then(t) : t();
	}
	return i;
}
function Li(e, t, n, r, i) {
	return Ii((r) => {
		let a = e.get(t, r);
		if (!a) {
			let o;
			if (!i) {
				let i = n[r];
				o = Ri(i) ?? e.read(t, r, i), T(o !== void 0, `"${r}" can't be read from the animated subject. Provide [from, to] keyframes.`, "effect-unreadable-value");
			}
			a = oi(o, { owner: i }), e(t, { [r]: a });
		}
		return a;
	}, n, r, i);
}
function Ri(e) {
	let t = Array.isArray(e) ? e[0] : void 0;
	return t === null ? void 0 : t;
}
//#endregion
//#region node_modules/motion-dom/dist/es/utils/is-html-element.mjs
function zi(e) {
	return ve(e) && "offsetHeight" in e && !("ownerSVGElement" in e);
}
//#endregion
//#region node_modules/motion-dom/dist/es/utils/is-svg-element.mjs
function Bi(e) {
	return ve(e) && "ownerSVGElement" in e;
}
//#endregion
//#region node_modules/motion-dom/dist/es/value/types/utils/get-as-type.mjs
var $ = (e, t) => t && typeof e == "number" ? t.transform(e) : e;
//#endregion
//#region node_modules/motion-dom/dist/es/utils/resolve-elements.mjs
function Vi(e, t, n) {
	if (e == null) return [];
	if (e instanceof EventTarget) return [e];
	if (typeof e == "string") {
		let r = document;
		t && (r = t.current);
		let i = n?.[e] ?? r.querySelectorAll(e);
		return i ? Array.from(i) : [];
	}
	return Array.from(e).filter((e) => e != null);
}
//#endregion
//#region node_modules/motion-dom/dist/es/effects/MotionValueState.mjs
var Hi = class {
	constructor(e = j.render) {
		this.step = e, this.values = /* @__PURE__ */ new Map(), this.pending = [], this.numPending = 0, this.flush = () => {
			let { pending: e, numPending: t } = this;
			this.numPending = 0;
			for (let n = 0; n < t; n++) e[n]();
		};
	}
	set(e, t, n, r) {
		if (this.values.get(e)?.onRemove(), r) for (let e of this.values.values()) e.value === r && (n = e.render);
		let i = () => n && this.schedule(n);
		t.get() !== void 0 && i();
		let a = t.on("change", i), o = () => {
			a(), n && !r && this.cancel(n), this.values.delete(e);
		};
		return this.values.set(e, {
			value: t,
			render: r ? void 0 : n,
			onRemove: o
		}), o;
	}
	get(e) {
		return this.values.get(e)?.value;
	}
	release() {
		let e = /* @__PURE__ */ new Map();
		return this.values.forEach((t, n) => {
			e.set(n, t.value), t.onRemove();
		}), this.transformKeys = this.transformValues = void 0, e;
	}
	schedule(e) {
		let { pending: t, numPending: n } = this;
		for (let r = 0; r < n; r++) if (t[r] === e) return;
		n || this.step(this.flush), t[this.numPending++] = e;
	}
	cancel(e) {
		let { pending: t } = this;
		for (let n = 0; n < this.numPending; n++) if (t[n] === e) {
			t[n] = t[--this.numPending];
			return;
		}
	}
};
//#endregion
//#region node_modules/motion-dom/dist/es/effects/utils/create-effect.mjs
function Ui(e, { step: t, ...n } = {}) {
	let r = /* @__PURE__ */ new WeakMap();
	return Object.assign((n, i) => {
		let a = r.get(n) ?? new Hi(t);
		r.set(n, a);
		let o = [];
		for (let t in i) {
			let r = i[t], s = e(n, a, t, r);
			o.push(s);
		}
		return () => {
			for (let e of o) e();
		};
	}, n, {
		get: (e, t) => r.get(e)?.get(t),
		flush: (e) => r.get(e)?.flush(),
		state: (e) => r.get(e)
	});
}
//#endregion
//#region node_modules/motion-dom/dist/es/effects/style/transform.mjs
var Wi = {
	x: "translateX",
	y: "translateY",
	z: "translateZ",
	transformPerspective: "perspective"
}, Gi = {};
function Ki(e) {
	let t = "", { transformKeys: n = [], transformValues: r = {} } = e;
	for (let e = 0; e < n.length; e++) {
		let i = n[e], a = r[i].get();
		a !== void 0 && (typeof a == "number" ? a : parseFloat(a)) !== +!!i.startsWith("scale") && (t += (t && " ") + (Gi[i] || (Gi[i] = (Wi[i] || i) + "(")) + $(a, Wn[i]) + ")");
	}
	let i = e.get("pathRotation")?.get();
	return i && (t += (t && " ") + "rotate(" + $(i, Wn.pathRotation) + ")"), t || "none";
}
//#endregion
//#region node_modules/motion-dom/dist/es/effects/style/index.mjs
var qi = /* @__PURE__ */ new Set([
	"originX",
	"originY",
	"originZ"
]), Ji = (e, t) => $(e.get(t)?.get(), Y[t]), Yi = (e, t, n, r) => {
	let i, a;
	if (cr.has(n)) {
		if (n !== "pathRotation") {
			let e = t.transformKeys ??= [];
			(t.transformValues ??= {})[n] = r, e.includes(n) || (e.push(n), e.sort((e, t) => sr.indexOf(e) - sr.indexOf(t)));
		}
		t.get("transform") || (!zi(e) && !t.get("transformBox") && Yi(e, t, "transformBox", new ai("fill-box")), t.set("transform", new ai("none"), () => {
			e.style.transform = Ki(t);
		})), a = t.get("transform");
	} else qi.has(n) ? (t.get("transformOrigin") || t.set("transformOrigin", new ai(""), () => {
		let n = Ji(t, "originX") ?? "50%", r = Ji(t, "originY") ?? "50%", i = Ji(t, "originZ") ?? 0;
		e.style.transformOrigin = `${n} ${r} ${i}`;
	}), a = t.get("transformOrigin")) : i = Cr(n) ? () => {
		e.style.setProperty(n, r.get());
	} : () => {
		e.style[n] = $(r.get(), Y[n]);
	};
	return t.set(n, r, i, a);
}, Xi = (e) => zi(e) || Bi(e), Zi = (e, t) => {
	if (cr.has(t)) return ar(e, t);
	let n = getComputedStyle(e), r = Cr(t) ? n.getPropertyValue(t) : n[t];
	return typeof r == "string" && r.trim() || 0;
}, Qi = /*@__PURE__*/ Ui(Yi, {
	test: Xi,
	read: Zi
}), $i = [
	"transform",
	"opacity",
	"offsetDistance",
	"offsetPath",
	"offsetRotate",
	"offsetAnchor"
];
//#endregion
//#region node_modules/motion-dom/dist/es/effects/attr/index.mjs
function ea(e, t) {
	if (!(t in e)) return !1;
	let n = Object.getOwnPropertyDescriptor(Object.getPrototypeOf(e), t) || Object.getOwnPropertyDescriptor(e, t);
	return n && typeof n.set == "function";
}
var ta = (e, t, n, r, i = n) => {
	let a = ea(e, i);
	!a && (i.startsWith("data") || i.startsWith("aria")) && (i = Ci(i));
	let o = Y[n] || Y[i], s = a ? () => {
		e[i] = $(r.get(), Y[n]);
	} : () => {
		let t = $(r.get(), o);
		t == null ? e.removeAttribute(i) : e.setAttribute(i, String(t));
	};
	return t.set(n, r, s);
};
//#endregion
//#region node_modules/motion-dom/dist/es/effects/svg/index.mjs
function na(e, t, n, r) {
	return j.render(() => e.setAttribute("pathLength", "1")), n === "pathOffset" ? t.set(n, r, () => {
		let t = r.get();
		e.setAttribute("stroke-dashoffset", `${-t}`);
	}) : (t.get("stroke-dasharray") || t.set("stroke-dasharray", new ai("1 1"), () => {
		let n = t.get("pathLength")?.get() ?? 1, r = t.get("pathSpacing")?.get();
		e.setAttribute("stroke-dasharray", `${n} ${r ?? 1 - Number(n)}`);
	}), t.set(n, r, void 0, t.get("stroke-dasharray")));
}
var ra = /*@__PURE__*/ Ui((e, t, n, r) => n.startsWith("path") ? na(e, t, n, r) : n.startsWith("attr") ? ta(e, t, n, r, ia(n)) : (n in e.style ? Yi : ta)(e, t, n, r), {
	test: Bi,
	read: (e, t) => cr.has(t) ? Y[t]?.default || 0 : $i.includes(t) ? Zi(e, t) : (t = ia(t), e.getAttribute(Ci(t)) ?? e.getAttribute(t) ?? void 0)
});
function ia(e) {
	return e.replace(/^attr([A-Z])/, (e, t) => t.toLowerCase());
}
//#endregion
//#region node_modules/motion-dom/dist/es/projection/geometry/conversion.mjs
function aa({ top: e, left: t, right: n, bottom: r }) {
	return {
		x: {
			min: t,
			max: n
		},
		y: {
			min: e,
			max: r
		}
	};
}
function oa(e, t) {
	if (!t) return e;
	let n = t({
		x: e.left,
		y: e.top
	}), r = t({
		x: e.right,
		y: e.bottom
	});
	return {
		top: n.y,
		left: n.x,
		bottom: r.y,
		right: r.x
	};
}
//#endregion
//#region node_modules/motion-dom/dist/es/projection/utils/measure.mjs
function sa(e, t) {
	return aa(oa(e.getBoundingClientRect(), t));
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/animate/element.mjs
var ca = {}, la = (e) => Bi(e) ? ra : Qi, ua = class {
	constructor(e, t) {
		this.effect = e, this.current = t, this.KeyframeResolver = ji;
	}
	getValue(e) {
		return this.effect.get(this.current, e);
	}
	readValue(e, t) {
		return this.effect.read(this.current, e, t);
	}
	render() {
		this.effect.flush(this.current);
	}
	measureViewportBox() {
		return sa(this.current);
	}
	getProps() {
		return ca;
	}
};
function da(e, t, n, r) {
	if (r) return Ii((e) => r.getValue(e, null), t, n, r);
	let i = la(e);
	return Li(i, e, t, n, new ua(i, e));
}
//#endregion
//#region node_modules/motion-dom/dist/es/effects/prop/index.mjs
var fa = /*@__PURE__*/ Ui((e, t, n, r) => t.set(n, r, () => {
	e[n] = r.get();
}), {
	test: (e) => ve(e),
	read: (e, t) => {
		let n = e[t];
		return typeof n == "string" || typeof n == "number" ? n : void 0;
	}
}), pa = /* @__PURE__ */ new WeakMap();
//#endregion
//#region node_modules/motion-dom/dist/es/animation/animate/single-value.mjs
function ma(e, t, n) {
	let r = Si(e) ? e : oi(e);
	return r.start(gi("", r, t, n)), r.animation;
}
//#endregion
//#region node_modules/framer-motion/dist/es/animation/utils/is-dom-keyframes.mjs
function ha(e) {
	return typeof e == "object" && !Array.isArray(e);
}
//#endregion
//#region node_modules/framer-motion/dist/es/animation/animate/resolve-subjects.mjs
function ga(e, t, n, r) {
	return e == null ? [] : typeof e == "string" && ha(t) ? Vi(e, n, r) : e instanceof NodeList ? Array.from(e) : Array.isArray(e) ? e.filter((e) => e != null) : [e];
}
//#endregion
//#region node_modules/framer-motion/dist/es/animation/sequence/utils/calc-repeat-duration.mjs
function _a(e, t, n) {
	return e * (t + 1) + n * t;
}
//#endregion
//#region node_modules/framer-motion/dist/es/animation/sequence/utils/calc-time.mjs
function va(e, t, n, r) {
	return typeof t == "number" ? t : t.startsWith("-") || t.startsWith("+") ? Math.max(0, e + parseFloat(t)) : t === "<" ? n : t.startsWith("<") ? Math.max(0, n + parseFloat(t.slice(1))) : r.get(t) ?? e;
}
//#endregion
//#region node_modules/framer-motion/dist/es/animation/sequence/utils/edit.mjs
function ya(e, t, n) {
	for (let r = 0; r < e.length; r++) {
		let i = e[r];
		i.at > t && i.at < n && (he(e, i), r--);
	}
}
function ba(e, t, n, r, i, a) {
	ya(e, i, a);
	for (let o = 0; o < t.length; o++) e.push({
		value: t[o],
		at: G(i, a, r[o]),
		easing: /* @__PURE__ */ Ge(n, o)
	});
}
//#endregion
//#region node_modules/framer-motion/dist/es/animation/sequence/utils/normalize-times.mjs
function xa(e, t, n = 0) {
	let r = t + 1 + t * n;
	for (let t = 0; t < e.length; t++) e[t] = e[t] / r;
}
//#endregion
//#region node_modules/framer-motion/dist/es/animation/sequence/utils/sort.mjs
function Sa(e, t) {
	return e.at === t.at ? e.value === null ? 1 : t.value === null ? -1 : 0 : e.at - t.at;
}
//#endregion
//#region node_modules/framer-motion/dist/es/animation/sequence/create.mjs
var Ca = "easeInOut", wa = 20;
function Ta(e, { defaultTransition: t = {}, ...n } = {}, r, i) {
	let a = t.duration || .3, o = /* @__PURE__ */ new Map(), s = /* @__PURE__ */ new Map(), c = {}, l = /* @__PURE__ */ new Map(), u = 0, d = 0, f = 0;
	for (let n = 0; n < e.length; n++) {
		let o = e[n];
		if (typeof o == "string") {
			l.set(o, d);
			continue;
		}
		if (!Array.isArray(o)) {
			l.set(o.name, va(d, o.at, u, l));
			continue;
		}
		let [p, m, h = {}] = o;
		h.at !== void 0 && (d = va(d, h.at, u, l));
		let g = 0, _ = (e, n, r, o = 0, s = 0) => {
			let c = Oa(e), { delay: l = 0, times: u = Cn(c), type: p = t.type || "keyframes", repeat: m, repeatType: h, repeatDelay: _ = 0, ...v } = n, { ease: y = t.ease || "easeOut", duration: b } = n, x = typeof l == "function" ? l(o, s) : l, S = c.length, ee = Nr(p) ? p : i?.[p || "keyframes"];
			if (S <= 2 && ee) {
				let e = 100;
				if (S === 2 && ja(c)) {
					let t = c[1] - c[0];
					e = Math.abs(t);
				}
				let n = {
					...t,
					...v
				};
				b !== void 0 && (n.duration = /* @__PURE__ */ O(b));
				let r = ln(n, e, ee);
				y = r.ease, b = r.duration;
			}
			b ??= a;
			let te = d + x;
			u.length === 1 && u[0] === 0 && (u[1] = 1);
			let ne = u.length - c.length;
			if (ne > 0 && Sn(u, ne), c.length === 1 && c.unshift(null), m && w(m < wa, `Sequence segments can't repeat ${m} times — ignoring repeat option. Use a value below ${wa} or apply repeat at the sequence level instead.`), m && m < wa) {
				let e = b > 0 ? _ / b : 0;
				b = _a(b, m, _);
				let t = [...c], n = [...u];
				y = Array.isArray(y) ? [...y] : [y];
				let r = [...y], i = h === "reverse" || h === "mirror", a = t, o = r;
				i && (a = [...t].reverse(), h === "reverse" && (o = [...r].reverse().map((e) => typeof e == "function" ? /* @__PURE__ */ Ne(e) : e)));
				for (let s = 0; s < m; s++) {
					let l = i && s % 2 == 0, d = l ? a : t, f = l ? o : r, p = (s + 1) * (1 + e);
					e > 0 && (c.push(c[c.length - 1]), u.push(p), y.push("linear")), c.push(...d);
					for (let e = 0; e < d.length; e++) u.push(n[e] + p), y.push(e === 0 ? "linear" : /* @__PURE__ */ Ge(f, e - 1));
				}
				xa(u, m, e);
			}
			let re = te + b;
			ba(r, c, y, u, te, re), g = Math.max(x + b, g), f = Math.max(re, f);
		};
		if (Si(p)) {
			let e = Ea(p, s);
			_(m, h, Da("default", e));
		} else {
			let e = ga(p, m, r, c), t = e.length;
			for (let n = 0; n < t; n++) {
				m = m, h = h;
				let r = e[n], i = Ea(r, s);
				for (let e in m) _(m[e], ka(h, e), Da(e, i), n, t);
			}
		}
		u = d, d += g;
	}
	return s.forEach((e, r) => {
		for (let i in e) {
			let a = e[i];
			a.sort(Sa);
			let s = [], c = [], l = [];
			for (let e = 0; e < a.length; e++) {
				let { at: t, value: n, easing: r } = a[e];
				s.push(n), c.push(/* @__PURE__ */ Se(0, f, t)), l.push(r || "easeOut");
			}
			c[0] !== 0 && (c.unshift(0), s.unshift(s[0]), l.unshift(Ca)), c[c.length - 1] !== 1 && (c.push(1), s.push(null)), o.has(r) || o.set(r, {
				keyframes: {},
				transition: {}
			});
			let u = o.get(r);
			u.keyframes[i] = s;
			let { type: d, ...p } = t;
			u.transition[i] = {
				...p,
				duration: f,
				ease: l,
				times: c,
				...n
			};
		}
	}), o;
}
function Ea(e, t) {
	return !t.has(e) && t.set(e, {}), t.get(e);
}
function Da(e, t) {
	return t[e] || (t[e] = []), t[e];
}
function Oa(e) {
	return Array.isArray(e) ? e : [e];
}
function ka(e, t) {
	return e && e[t] ? {
		...e,
		...e[t]
	} : { ...e };
}
var Aa = (e) => typeof e == "number", ja = (e) => e.every(Aa);
//#endregion
//#region node_modules/framer-motion/dist/es/animation/animate/subject.mjs
function Ma(e, t) {
	return Si(e) || typeof e == "number" || typeof e == "string" && !ha(t);
}
function Na(e, t, n, r) {
	let i = [];
	if (Ma(e, t)) i.push(ma(e, ha(t) && t.default || t, n && (n.default || n)));
	else {
		if (e == null) return i;
		let a = ga(e, t, r), o = a.length;
		T(!!o, "No valid elements provided.", "no-valid-elements");
		for (let e = 0; e < o; e++) {
			let r = a[e], s = { ...n };
			"delay" in s && typeof s.delay == "function" && (s.delay = s.delay(e, o)), r instanceof Element ? i.push(...da(r, t, s, pa.get(r))) : i.push(...Li(Fi(r) ?? fa, r, t, s));
		}
	}
	return i;
}
//#endregion
//#region node_modules/framer-motion/dist/es/animation/animate/sequence.mjs
function Pa(e, t, n) {
	let r = [];
	return Ta(e.map((e) => {
		if (Array.isArray(e) && typeof e[0] == "function") {
			let t = e[0], n = oi(0);
			return n.on("change", t), e.length === 1 ? [n, [0, 1]] : e.length === 2 ? [
				n,
				[0, 1],
				e[1]
			] : [
				n,
				e[1],
				e[2]
			];
		}
		return e;
	}), t, n, { spring: q }).forEach(({ keyframes: e, transition: t }, n) => {
		r.push(...Na(n, e, t));
	}), r;
}
//#endregion
//#region node_modules/framer-motion/dist/es/animation/animate/index.mjs
function Fa(e) {
	return Array.isArray(e) && e.some(Array.isArray);
}
function Ia(e = {}) {
	let { scope: t, reduceMotion: n, skipAnimations: r } = e;
	function i(e, i, a) {
		let o = [], s, c = {};
		if (n !== void 0 && (c.reduceMotion = n), r !== void 0 && (c.skipAnimations = r), Fa(e)) {
			let { onComplete: n, ...r } = i || {};
			typeof n == "function" && (s = n), o = Pa(e, {
				...c,
				...r
			}, t);
		} else {
			let { onComplete: n, ...r } = a || {};
			typeof n == "function" && (s = n), o = Na(e, i, {
				...c,
				...r
			}, t);
		}
		let l = new ti(o);
		return s && l.finished.then(s), t && (t.animations.push(l), l.finished.then(() => {
			he(t.animations, l);
		})), l;
	}
	return i;
}
var La = Object.assign(Ia(), {
	addEffect: Ni,
	removeEffect: Pi
}), Ra = class {
	#e;
	#t = {};
	#n = 0;
	#r = 0;
	#i = (e) => e;
	#a = 0;
	#o = !1;
	#s;
	#c;
	#l;
	#u;
	#d;
	#f = !1;
	constructor(e) {
		this.#e = e;
	}
	to(e, t) {
		return this.#t = e, this.#n = Math.max(t, 0) / 1e3, this;
	}
	onUpdate(e) {
		return this.#s = e, this;
	}
	onComplete(e) {
		return this.#c = e, this;
	}
	easing(e) {
		return this.#i = e, this;
	}
	delay(e) {
		return this.#r = e / 1e3, this;
	}
	repeat(e) {
		return this.#a = e, this;
	}
	yoyo(e) {
		return this.#o = e, this;
	}
	chain(e) {
		return this.#l = e, this;
	}
	onStart(e) {
		return this.#u = e, this;
	}
	start() {
		if (this.#d) return this;
		this.#u?.();
		let e = {};
		for (let t of Object.keys(this.#t)) e[t] = this.#e[t];
		return this.#d = La(e, this.#t, {
			duration: this.#n,
			delay: this.#r,
			ease: this.#i,
			repeat: this.#a,
			...this.#o ? { repeatType: "reverse" } : {},
			reduceMotion: !1,
			onUpdate: () => {
				this.#f || (Object.assign(this.#e, e), this.#s?.(this.#e));
			},
			onComplete: () => this.#p()
		}), this;
	}
	#p() {
		this.#f || (Object.assign(this.#e, this.#t), this.#s?.(this.#e), this.#f = !0, this.#c?.(), this.#l?.start());
	}
	kill() {
		let e = this;
		for (; e;) e.#d?.stop(), e.#f = !0, e = e.#l;
	}
	pause() {
		return this.#d?.pause(), this;
	}
	resume() {
		return this.#d?.play(), this;
	}
}, za = {
	width: /(?:^|;)\s*width\s*:\s*([\d.]+)px/i,
	height: /(?:^|;)\s*height\s*:\s*([\d.]+)px/i
};
function Ba(e, t) {
	let n = e?.match(za[t]);
	return n ? Number(n[1]) : void 0;
}
var Va = /\.(?:mp4|webm)$/i;
function Ha(e) {
	return {
		isSheet: e.endsWith(".json"),
		isMovie: Va.test(e)
	};
}
var Ua = class p {
	sys;
	#e;
	constructor(e) {
		this.sys = e, this.#m = new n(e, ""), this.#T = new oe((t, n) => e.cfg.searchPath(t, n), (t, n) => e.fetch(t, n), (t, n) => e.dec(t, n), (t) => e.decAB(t), e.crypto), this.#e = document.createElement("span"), this.#e.hidden = !0, this.#e.textContent = "", this.#e.style.cssText = `	z-index: ${2 ** 53 - 1};
			position: absolute; left: 0; top: 0;
			color: black;
			background-color: rgba(255, 255, 255, 0.7);`, document.body.appendChild(this.#e), this.#t.trace = (e) => this.#ct(e), this.#t.log = (e) => this.#ut(e, this.#r?.fn ?? "", this.#r?.lineNum ?? NaN);
	}
	destroy() {
		this.#C = !0, this.cancelAuto(), clearTimeout(this.#U), clearTimeout(this.#Y), clearTimeout(this.#ee), this.#ve(() => !0);
		for (let { tw: e } of Object.values(this.#re)) e.kill();
		for (let { tw: e } of Object.values(this.#De)) e.kill();
		this.#O.stopAll(), this.#I = void 0, this.#e.remove(), this.#E.destroy();
	}
	attachTsx(e, t, n) {
		this.$trgNext = e, this.$fncs = t, this.#t = n, this.#t.title = ({ text: e }) => {
			if (!e) throw "[title] textは必須です";
			return t.addTitle(e), !1;
		};
	}
	$trgNext;
	$fncs;
	#t = Object.create(null);
	#n = Object.create(null);
	#r;
	#i = (e) => {
		e !== this.#a && this.myTrace(`内部エラー ${e instanceof Error ? e.stack ?? e.message : String(e)}`, "E");
	};
	#a;
	load(e) {
		this.#o(e).catch(this.#i);
	}
	async #o(e) {
		let t = await this.#b(e);
		if (this.#r) this.#r.switchScript(t);
		else {
			let e = this.#r = new h(t);
			this.#s(e), e.defSetTrigger("sys:sn.sound.global_volume", (e) => {
				this.#O.setGlobalVol(Number(e)), this.#A();
			}), e.defSetTriggerSoundVol((t, n) => {
				let r = Number(e.getVal(`save:const.sn.sound.${t}.volume`) ?? 1);
				this.#O.setVol(t, r * Number(n));
			}), e.defSetTrigger("sys:sn.sound.movie_volume", () => this.#A()), e.defSetTrigger("save:sn.userFnTail", (e) => {
				let t = String(e);
				if (t.includes("@")) throw "この変数では文字「@」は禁止です";
				this.sys.cfg.userFnTail = t;
			}), await this.#g(e), le(this.sys.cfg);
		}
		this.go = () => this.#N(), this.$trgNext();
	}
	#s(e) {
		let { oCfg: n } = this.sys.cfg, r = {
			"const.sn.config.window.width": () => t.stageW,
			"const.sn.config.window.height": () => t.stageH,
			"const.sn.config.book.title": () => n.book.title,
			"const.sn.config.book.version": () => n.book.version,
			"const.sn.config.log.max_len": () => n.log.max_len,
			"const.sn.navigator.language": () => globalThis.navigator.language,
			"const.sn.screenResolutionX": () => globalThis.screen.width,
			"const.sn.screenResolutionY": () => globalThis.screen.height,
			"const.sn.isApp": () => !1,
			"const.sn.isDbg": () => !1,
			"const.sn.isDebugger": () => !1,
			"const.sn.isPackaged": () => !1,
			"const.sn.isFirstBoot": () => this.#h,
			"const.sn.needClick2Play": () => this.#O.needClick2Play(),
			"const.sn.sound.codecs": () => this.#O.codecs(),
			"const.sn.bookmark.json": () => this.#m.bookmarkJson(),
			"const.sn.isDarkMode": () => globalThis.matchMedia("(prefers-color-scheme: dark)").matches,
			"const.sn.platform": () => globalThis.navigator.userAgent,
			"const.sn.isPaging": () => this.#c.isPaging,
			"const.sn.aPageLog": () => this.#c.json()
		};
		for (let [t, n] of Object.entries(r)) e.defBuiltin(t, n);
		e.defBuiltin("const.sn.lay", () => {
			let { fore: e, back: n } = this.$fncs.getPages(), r = (e) => {
				if (!e) return;
				let n = e.left ?? 0, r = e.top ?? 0, o = a(e) ? (() => {
					let t = u(e.src);
					return {
						w: t?.w ?? 0,
						h: t?.h ?? 0
					};
				})() : i(e) ? {
					w: Ba(e.style, "width") ?? t.stageW,
					h: Ba(e.style, "height") ?? t.stageH
				} : {
					w: 0,
					h: 0
				};
				return {
					visible: e.visible !== !1,
					alpha: e.alpha ?? 1,
					x: n,
					y: r,
					left: n,
					top: r,
					width: e.width ?? o.w,
					height: e.height ?? o.h
				};
			}, o = {};
			for (let t of e) o[t.nm] = {
				fore: r(t),
				back: r(n.find((e) => e.nm === t.nm))
			};
			return JSON.stringify(o);
		});
	}
	#c = new s(() => this.sys.cfg.oCfg.log.max_len);
	#l;
	#u = [];
	#d = !1;
	#f() {
		this.$fncs.setReadBack(this.#c.isPaging || this.#d), this.$fncs.setStyPaging(String(this.#r?.getVal("save:const.sn.styPaging") ?? "") || "color: yellow; text-shadow: 1px 1px 0 #000, -1px 1px 0 #000, 1px -1px 0 #000, -1px -1px 0 #000;");
	}
	page(e) {
		this.#F || (this.#F = !0, this.#p(e).catch(this.#i));
	}
	async #p(e) {
		let t = this.#r;
		if (!t) {
			this.#F = !1;
			return;
		}
		try {
			let n = this.#c.move(e);
			if (!n) {
				this.#f(), this.#F = !1;
				return;
			}
			this.#d = !0, this.#f(), t.restoreMarkPart(n.mark), t.clearOnResume = n.clearOnResume, this.#ue(null, "both"), this.#ve(() => !0), this.$fncs.replace(n.mark.sPages), this.#E.setPageState(this.$fncs.getForeIdx(), !1), this.#E.playback(n.mark.hPlgLay, []), this.#P = !1, this.#l = void 0, t.switchScript(await this.#b(n.fn), "", n.idx);
		} catch (e) {
			this.#d = !1, this.#F = !1, this.myTrace(`[page] ${String(e)}`, "ET");
			return;
		}
		this.#F = !1, this.#N();
	}
	#m;
	#h = !0;
	async #g(e) {
		this.#m = new n(this.sys, this.sys.cfg.oCfg.save_ns);
		try {
			this.#h = await this.#m.load();
		} catch (e) {
			this.myTrace(`セーブデータが壊れています。初期状態で起動します ${String(e)}`, "E"), this.#h = !0;
		}
		this.#h || (e.setSys(this.#m.data.sys), e.setKidoku(this.#m.data.kidoku), this.#O.setGlobalVol(Number(e.getVal("sys:sn.sound.global_volume") ?? 1)), this.#A()), e.setValNochk("sys:const.sn.cfg.ns", this.sys.cfg.oCfg.save_ns), this.#_();
	}
	setWinInf(e, t, n, r) {
		let i = this.#r;
		i && (i.setValNochk("sys:const.sn.nativeWindow.x", e), i.setValNochk("sys:const.sn.nativeWindow.y", t), i.setValNochk("sys:const.sn.nativeWindow.w", n), i.setValNochk("sys:const.sn.nativeWindow.h", r), this.#_());
	}
	#_() {
		let e = this.#r;
		e && (this.#m.data.sys = e.cloneSys(), this.#m.data.kidoku = e.getKidoku(), this.#m.flush());
	}
	#v(e = {}) {
		return {
			...this.#r.nowMarkPart(),
			sPages: this.$fncs.getPagesJson(),
			hPlgLay: this.#E.record(),
			json: e
		};
	}
	#y;
	async #b(e) {
		return this.#n[e] ??= new S(e, await this.#st(e), this.#S());
	}
	#x;
	#S() {
		if (this.#x) return this.#x;
		let e = this.#x = new _(this.sys.cfg);
		return e.setEscape(this.sys.cfg.oCfg.init.escape), x(this.sys.cfg.oCfg.init.escape), e;
	}
	go() {}
	#C = !1;
	resumePlg() {
		this.#C || (this.#F = !1, this.#N());
	}
	navigateTo(e) {
		globalThis.open(e, "_blank");
	}
	jumpToLabelAndGo(e, t, n = "", r) {
		this.#r?.setValNochk("tmp:sn.eventArg", r ?? ""), this.#r?.setValNochk("tmp:sn.eventLabel", e), this.#M(e, t, n).catch(this.#i);
	}
	#w = !1;
	hoverCall(e, t = "") {
		let n = this.#r;
		n && e && (this.#w || this.#Fe || this.#F || this.#I && !this.#I.bypassOnCall || (this.#w = !0, n.setValNochk("tmp:sn.eventArg", ""), n.setValNochk("tmp:sn.eventLabel", e), this.#M(e, !0, t).catch(this.#i).finally(() => {
			this.#w = !1;
		})));
	}
	#T;
	attachFrameBox(e) {
		this.#T.attachBox(e);
	}
	#E = new se();
	attachPlgBox(e, t, n) {
		this.#E.attachBox(e, t, n);
	}
	getVal(e, t) {
		return this.#r?.getVal(e) ?? t;
	}
	#D(e) {
		let t = this.$fncs.getForeIdx();
		return e === "fore" ? t : 1 - t;
	}
	#O = new pe((e, t) => this.myTrace(e, t), (e, t) => this.sys.fetch(e, t), (e) => this.sys.decAB(e));
	unlockAudio() {
		this.#O.unlock();
	}
	needClick2Play() {
		return this.#O.needClick2Play();
	}
	playButtonSe(e, t) {
		if (!e) return;
		let n = this.#Ze("button", e);
		if (!n) return;
		let r = Number(this.#r?.getVal(`sys:const.sn.sound.${t}.volume`) ?? 1);
		this.#O.play(t, n, {
			loop: !1,
			volume: r,
			speed: 1,
			pan: 0,
			start_ms: 0,
			end_ms: ue,
			ret_ms: 0
		}).catch(this.#i);
	}
	#k;
	attachStageBox(e) {
		this.#k = e;
	}
	getMovieVolume() {
		let e = Number(this.#r?.getVal("sys:sn.sound.movie_volume") ?? 1) * Number(this.#r?.getVal("sys:sn.sound.global_volume") ?? 1);
		return e < 0 ? 0 : e > 1 ? 1 : e;
	}
	#A() {
		let e = this.#k;
		if (!e) return;
		let t = this.getMovieVolume();
		for (let n of e.querySelectorAll("video")) n.volume = t;
	}
	#j = /* @__PURE__ */ new Set();
	fireFullScrKey(e) {
		return this.#j.has(e) ? (this.$fncs.toggleFullScr(), !0) : !1;
	}
	setFullScr(e) {
		this.#r?.setFullScr(e);
	}
	setKeyDown(e, t) {
		this.#r?.setKeyDown(e, t);
	}
	clearKeyDown() {
		this.#r?.clearKeyDown();
	}
	fireEvent(e) {
		let t = this.#r;
		if (!t || this.#c.isPaging && this.#u.length > 0 && !this.#u.includes(e)) return !1;
		let n = t.beginEvent(e);
		return n ? n.url ? (this.navigateTo(n.url), !0) : (this.jumpToLabelAndGo(n.label, n.call, n.fn, n.arg), !0) : !1;
	}
	async #M(e, t, n) {
		let r = this.#r;
		if (r) {
			this.#P = !1;
			try {
				if (n && (n !== r.fn || !e)) {
					let i = await this.#b(n);
					t ? r.callToScript(i, e) : r.switchScript(i, e);
				} else t ? r.callToLabel(e) : r.jumpToLabel(e);
			} catch (e) {
				this.myTrace(`[button]/[event] ジャンプ先エラー fn:${n || r.fn} ${String(e)}`, "ET");
				return;
			}
			this.#N(!0);
		}
	}
	#N(e = !1) {
		if (this.#P) return;
		let t = this.#I;
		if (!(this.#w && !e)) {
			if (t && !(e && t.bypassOnCall)) {
				t.canskip && t.skip();
				return;
			}
			this.#F || this.#Le().catch(this.#i);
		}
	}
	#P = !1;
	#F = !1;
	#I;
	#L(e) {
		if (e) {
			this.#I = e, this.#gt(!0);
			return;
		}
		setTimeout(() => this.#N(), 0);
	}
	#R(e, t, n) {
		let r = this.#I;
		r?.kind === e && r.key === t && (this.#I = void 0, n ? setTimeout(() => this.#N(), 0) : this.#N());
	}
	#z;
	#B;
	#V(e, t) {
		if (clearTimeout(this.#z), this.#B = void 0, this.$fncs.setSkipping(e === "skip"), this.$fncs.isTyping()) {
			this.#B = {
				mode: e,
				msec: t
			};
			return;
		}
		this.#H(e, t);
	}
	#H(e, t) {
		this.#z = setTimeout(() => {
			this.#z = void 0, e === "skip" && this.$fncs.requestSkip(), this.#N();
		}, t);
	}
	onTypingDone() {
		if (!this.#B) return;
		let { mode: e, msec: t } = this.#B;
		this.#B = void 0, this.#H(e, t);
	}
	get isAutoPending() {
		return this.#B !== void 0 || this.#z !== void 0;
	}
	cancelAuto() {
		clearTimeout(this.#z), this.#z = void 0, this.#B = void 0, this.$fncs?.setSkipping(!1), this.#r?.cancelAutoSkip();
	}
	#U;
	#W = !1;
	#G = null;
	#K(e, t) {
		clearTimeout(this.#U), this.#W = e > 0, this.#G = t, this.#U = this.#W ? setTimeout(() => this.#q(), e) : void 0, this.#W ? this.#E.setPageState(this.$fncs.getForeIdx(), !0) : this.#r?.transDone(t);
	}
	#q() {
		clearTimeout(this.#U), this.#U = void 0;
		let e = this.#W;
		this.#W = !1;
		let t = this.$fncs.getForeIdx();
		this.$fncs.finishTrans(), e && (this.#r?.transDone(this.#G), this.#E.finishTrans(this.#G, t, [])), this.#R("trans", void 0, !1);
	}
	#J(e) {
		this.#L(this.#W ? {
			kind: "trans",
			key: void 0,
			canskip: e,
			bypassOnCall: !1,
			skip: () => {
				this.#q(), this.$fncs.requestSkip();
			}
		} : void 0);
	}
	#Y;
	#X = !1;
	#Z(e) {
		clearTimeout(this.#Y), this.#X = !0, this.#Y = setTimeout(() => this.#Q(), e.msec), this.$fncs.startQuake({
			hmax: e.hmax,
			vmax: e.vmax
		});
	}
	#Q() {
		clearTimeout(this.#Y), this.#Y = void 0, this.#X = !1, this.$fncs.finishQuake(), this.#R("quake", void 0, !1);
	}
	#$(e) {
		this.#L(this.#X ? {
			kind: "quake",
			key: void 0,
			canskip: e,
			bypassOnCall: !1,
			skip: () => this.#Q()
		} : void 0);
	}
	#ee;
	#te(e, t) {
		clearTimeout(this.#ee), this.#ee = setTimeout(() => this.#ne(), Math.max(0, e)), this.#L({
			kind: "wait",
			key: void 0,
			canskip: t,
			bypassOnCall: !1,
			skip: () => this.#ne()
		});
	}
	#ne() {
		clearTimeout(this.#ee), this.#ee = void 0, this.#R("wait", void 0, !1);
	}
	#re = Object.create(null);
	#ie(e) {
		let t = this.$fncs.getLaySty(e.nm, e.page), { from: n, aTo: r, aPrp: i } = p.#oe(e, (e) => {
			let n = t[e] ?? g[e];
			if (n === void 0) throw `[tsy] ${e} は [lay ${e}=…] で寸法を明示したレイヤにしか使えません`;
			return n;
		}), a = [e.hTo, ...e.aPath ?? []], o = (e) => i.includes(e) && a.some((t) => t[e] && !t[e].rel), s = o("left"), c = o("top"), l = s ? c ? "xy" : "x" : c ? "y" : void 0;
		this.#se(e, n, r, () => {
			let t = {};
			for (let e of i) Object.assign(t, { [e]: n[e] });
			this.$fncs.chgLay({
				nm: e.nm,
				page: e.page,
				sty: t,
				...l ? { reposition: l } : {}
			});
		}, e.backlay ? () => {
			let t = {};
			for (let e of i) Object.assign(t, { [e]: n[e] });
			this.$fncs.chgLay({
				nm: e.nm,
				page: e.page === "fore" ? "back" : "fore",
				sty: t,
				...l ? { reposition: l } : {}
			});
		} : void 0);
	}
	#ae(e) {
		let t = this.#T.getSty(e.id), { from: n, aTo: r, aPrp: i } = p.#oe(e, (e) => t[e] ?? 0);
		this.#se(e, n, r, () => {
			let t = {};
			for (let e of i) Object.assign(t, { [e]: n[e] });
			this.#qe(this.#T.frame(e.id, t));
		});
	}
	static #oe(e, t) {
		let n = [e.hTo, ...e.aPath ?? []], r = [...new Set(n.flatMap((e) => Object.keys(e)))], i = {};
		for (let e of r) i[e] = t(e);
		return {
			from: i,
			aTo: n.map((e) => {
				let t = {};
				for (let [n, r] of Object.entries(e)) r && (t[n] = r.rel ? i[n] + r.v : r.v);
				return t;
			}),
			aPrp: r
		};
	}
	#se(e, t, n, r, i) {
		let a = e.t === "tsy" ? {
			nm: e.nm,
			page: e.page
		} : {};
		this.#re[e.tw_nm]?.tw.kill(), delete this.#re[e.tw_nm];
		let o = {};
		for (let e of n) Object.assign(o, e);
		let s = () => {
			Object.assign(t, o), r(), i?.();
		};
		if (e.msec <= 0 && e.delay <= 0) {
			s(), this.#ce(e.tw_nm);
			return;
		}
		let c = b(e.ease), l = n.map((n) => {
			let i = new Ra(t).to(n, e.msec).delay(e.delay).easing(c).repeat(e.repeat).yoyo(e.yoyo).onUpdate(r);
			return i.onStart(() => {
				this.#re[e.tw_nm] = {
					end: s,
					tw: i,
					...a
				};
			}), i;
		});
		for (let e = 0; e < l.length; ++e) {
			let t = l[e], n = l[e + 1];
			n && t.chain(n);
		}
		let u = l[0];
		if (l[l.length - 1].onComplete(() => {
			s(), this.#ce(e.tw_nm);
		}), this.#re[e.tw_nm] = {
			end: s,
			tw: u,
			...a
		}, !e.chain) {
			u.start();
			return;
		}
		let d = this.#re[e.chain];
		if (!d) throw `${e.chain}は存在しない・または終了したトゥイーンです`;
		d.next = () => u.start();
	}
	#ce(e) {
		let { next: t } = this.#re[e] ?? {};
		delete this.#re[e], t?.(), this.#R("tsy", e, !0);
	}
	#le(e) {
		let t = this.#re[e];
		t && (t.tw.kill(), t.end()), this.#ce(e);
	}
	#ue(e, t) {
		for (let [n, r] of Object.entries(this.#re)) r.nm !== void 0 && (!e || e.includes(r.nm)) && (t === "both" || r.page === t) && (r.tw.kill(), delete this.#re[n]);
	}
	#de(e, t) {
		this.#L(this.#re[e] ? {
			kind: "tsy",
			key: e,
			canskip: t,
			bypassOnCall: !0,
			skip: () => this.#le(e)
		} : void 0);
	}
	#fe = [];
	#pe = 0;
	#me(e) {
		if (e.fx.time <= 0) return;
		let t = ++this.#pe, n = setTimeout(() => this.#ge(t), e.fx.time);
		this.#fe.push({
			id: t,
			timer: n,
			endAt: Date.now() + e.fx.time,
			paused: null,
			aLayNm: e.aLayNm,
			page: e.page,
			name: e.fx.name
		});
	}
	#he(e, t) {
		let n = Date.now();
		for (let r of this.#fe) if (e(r)) {
			if (t) {
				if (r.paused) continue;
				clearTimeout(r.timer), r.paused = { remainMs: Math.max(0, r.endAt - n) };
			} else {
				if (!r.paused) continue;
				let { remainMs: e } = r.paused;
				r.paused = null, r.endAt = n + e, r.timer = setTimeout(() => this.#ge(r.id), e);
			}
		}
	}
	#ge(e) {
		let t = this.#fe.findIndex((t) => t.id === e);
		if (t >= 0) {
			let e = this.#fe[t];
			clearTimeout(e.timer), this.#fe.splice(t, 1), this.#_e(e);
		}
		let n = this.#I, r = n?.kind === "fx" ? n.key : void 0;
		r && (r.delete(e), !(r.size > 0) && this.#R("fx", r, !0));
	}
	#_e(e) {
		this.$fncs.chgFx({
			aLayNm: e.aLayNm ? [...e.aLayNm] : null,
			page: e.page,
			mode: "done",
			names: e.name ? [e.name] : null
		});
	}
	#ve(e) {
		for (let t = this.#fe.length; --t >= 0;) {
			let n = this.#fe[t];
			e(n) && (clearTimeout(n.timer), this.#fe.splice(t, 1));
		}
	}
	#ye(e, t, n) {
		let r = this.#fe.filter((n) => p.#be(n, e, t));
		this.#L(r.length === 0 ? void 0 : {
			kind: "fx",
			key: new Set(r.map((e) => e.id)),
			canskip: n,
			bypassOnCall: !0,
			skip: () => this.#xe()
		});
	}
	static #be(e, t, n) {
		return !(n && (!e.name || !n.includes(e.name)) || t && e.aLayNm && !e.aLayNm.some((e) => t.includes(e)));
	}
	#xe() {
		let e = this.#I, t = e?.kind === "fx" ? e.key : void 0;
		if (t) {
			for (let e of t) {
				let t = this.#fe.findIndex((t) => t.id === e);
				if (t >= 0) {
					let e = this.#fe[t];
					clearTimeout(e.timer), this.#fe.splice(t, 1), this.#_e(e);
				}
			}
			this.#R("fx", t, !1);
		}
	}
	async #Se(e) {
		let t = e.buf === "BGM" ? "playbgm" : "playse", n = this.#Ze(t, e.fn);
		n && (this.#r?.setValNochk(`tmp:const.sn.sound.${e.buf}.playing`, !0), await this.#O.play(e.buf, n, e, (e) => {
			this.#r?.setValNochk(`tmp:const.sn.sound.${e}.playing`, !1), e === "VOICE" && this.#Ce();
		}));
	}
	#Ce() {
		let e = this.#r;
		if (!e) return;
		e.resetVolMulTalking();
		let t = "const.sn.sound.BGM.", n = Number(e.getVal(`save:${t}volume`) ?? 1), r = Number(e.getVal(`sys:${t}volume`) ?? 1);
		this.#O.setVol("BGM", n * r);
	}
	#we(e) {
		let t;
		try {
			t = JSON.parse(String(e.getVal("save:const.sn.loopPlaying") ?? "{}"));
		} catch {
			t = {};
		}
		for (let e of this.#O.bufs()) e in t || this.#O.stop(e);
		for (let [n, r] of Object.entries(t)) {
			if (!r) continue;
			let t = `const.sn.sound.${n}.`, i = Number(e.getVal(`save:${t}volume`) ?? 1), a = Number(e.getVal(`sys:${t}volume`) ?? 1);
			this.#Se({
				t: "playSnd",
				buf: n,
				fn: r,
				loop: !0,
				volume: i * a,
				speed: 1,
				pan: 0,
				start_ms: Number(e.getVal(`save:${t}start_ms`) ?? 0),
				end_ms: Number(e.getVal(`save:${t}end_ms`) ?? 999e3),
				ret_ms: Number(e.getVal(`save:${t}ret_ms`) ?? 0),
				join: !1,
				canskip: !1
			}).catch(this.#i);
		}
	}
	async #Te(e) {
		try {
			await this.#Se(e);
		} catch (t) {
			this.#F = !1, this.myTrace(`[playse] エラー fn:${e.fn} ${String(t)}`, "E");
			return;
		}
		this.#F = !1, this.#N();
	}
	#Ee(e, t, n) {
		if (!this.#O.waitEnd(e, () => this.#R("snd", e, !1))) {
			this.#L(void 0);
			return;
		}
		this.#L({
			kind: "snd",
			key: e,
			canskip: t,
			bypassOnCall: !1,
			skip: () => {
				this.#I = void 0, this.#O.cancelWaitEnd(e), n && this.#O.stop(e), this.#N();
			}
		});
	}
	#De = Object.create(null);
	#Oe(e) {
		this.#De[e.buf]?.tw.kill(), delete this.#De[e.buf];
		let t = () => {
			this.#O.setVol(e.buf, e.volume), e.stop && this.#O.stop(e.buf);
		}, n = this.#O.gainNode(e.buf);
		if (!n || e.msec <= 0 && e.delay <= 0) {
			t(), this.#ke(e.buf);
			return;
		}
		let r = new Ra(n.gain).to({ value: e.volume }, e.msec).delay(e.delay).onComplete(() => {
			t(), this.#ke(e.buf);
		}).start();
		this.#De[e.buf] = {
			tw: r,
			end: t
		};
	}
	#ke(e) {
		delete this.#De[e], this.#R("fade", e, !0);
	}
	#Ae(e, t) {
		this.#L(this.#De[e] ? {
			kind: "fade",
			key: e,
			canskip: t,
			bypassOnCall: !1,
			skip: () => this.#je(e)
		} : void 0);
	}
	#je(e) {
		let t = this.#De[e];
		t && (t.tw.kill(), t.end()), this.#ke(e);
	}
	#Me(e) {
		return this.#k?.querySelector(`video[data-fn="${CSS.escape(e)}"]`) ?? void 0;
	}
	#Ne(e, t, n, r = 30) {
		let i = this.#Me(e);
		if (!i) {
			if (r > 0) {
				requestAnimationFrame(() => this.#Ne(e, t, n, r - 1));
				return;
			}
			this.#N();
			return;
		}
		if (i.loop || i.ended) {
			i.ended && n && this.#Pe(i), this.#N();
			return;
		}
		i.paused && i.play().catch(() => {}), this.#L({
			kind: "video",
			key: e,
			canskip: t,
			bypassOnCall: !1,
			skip: () => {
				if (this.#I = void 0, n) {
					let t = this.#Me(e);
					t && this.#Pe(t);
				}
				this.#N();
			}
		});
		let a = () => {
			if (this.#I?.kind !== "video" || this.#I.key !== e) return;
			let t = this.#Me(e);
			if (!t || t.loop || t.ended) {
				t?.ended && n && this.#Pe(t), this.#R("video", e, !1);
				return;
			}
			t.paused && t.play().catch(() => {}), requestAnimationFrame(a);
		};
		requestAnimationFrame(a);
	}
	#Pe(e) {
		e.pause(), e.currentTime = e.duration;
	}
	#Fe = !1;
	#Ie = 0;
	async #Le() {
		let e = this.#r;
		if (e) {
			if (this.#Fe) {
				++this.#Ie;
				return;
			}
			this.#Fe = !0, this.#gt(!1), this.#l ??= {
				...e.nowScrIdx(),
				mark: this.#v(),
				clearOnResume: e.clearOnResume
			};
			try {
				for (;;) {
					this.$fncs.setWait(null);
					let t;
					try {
						t = e.step();
					} catch (t) {
						this.myTrace(`シナリオ解析エラー fn:${e.fn} ${String(t)}`, "ET");
						return;
					}
					for (let e of t) this.#ot(e);
					let n = t.at(-1);
					if (n?.t === "waitTrans") {
						this.#J(n.canskip);
						return;
					}
					if (n?.t === "wait") {
						this.#te(n.msec, n.canskip);
						return;
					}
					if (n?.t === "waitTsy") {
						this.#de(n.tw_nm, n.canskip);
						return;
					}
					if (n?.t === "waitFx") {
						this.#ye(n.aLayNm, n.names, n.canskip);
						return;
					}
					if (n?.t === "waitQuake") {
						this.#$(n.canskip);
						return;
					}
					if (n?.t === "waitSnd") {
						this.#Ee(n.buf, n.canskip, n.stop);
						return;
					}
					if (n?.t === "waitFade") {
						this.#Ae(n.buf, n.canskip);
						return;
					}
					if (n?.t === "waitVideo") {
						this.#Ne(n.fn, n.canskip, n.stop);
						return;
					}
					if (n?.t === "playSnd" && n.join) {
						this.#F = !0, this.#Te(n).catch(this.#i);
						return;
					}
					if (n?.t === "addFrame" || n?.t === "letFrame") {
						this.#F = !0, this.#Be(n).catch(this.#i);
						return;
					}
					if (n?.t === "loadPlugin" || n?.t === "snapshot") {
						this.#F = !0, this.#Ue(n).catch(this.#i);
						return;
					}
					if (n?.t === "load" || n?.t === "reloadScript") {
						this.#F = !0, this.#Ve(n).catch(this.#i);
						return;
					}
					if (n?.t === "pageTo") {
						this.#F = !0, this.#p(n.to).catch(this.#i);
						return;
					}
					if (n?.t === "pageToPlace") {
						this.#F = !0, this.#p({ placeKey: n.placeKey }).catch(this.#i);
						return;
					}
					if (n?.t === "plgTag") {
						this.#Re(n);
						return;
					}
					if (t.some((e) => e.t === "layPlg")) {
						this.#ze(t);
						return;
					}
					if (n?.t !== "loadScript") {
						e.atEnd ? this.myTrace(`スクリプト終端です fn:${e.fn}`, "I") : this.#at();
						return;
					}
					try {
						e.switchScript(await this.#b(n.fn), n.label, n.idx);
					} catch (e) {
						this.myTrace(`[jump系] スクリプト切替エラー fn:${n.fn} ${String(e)}`, "ET");
						return;
					}
				}
			} finally {
				this.#Fe = !1, this.#Ie > 0 && (--this.#Ie, this.#N());
			}
		}
	}
	#Re(e) {
		let t = ee(e.name);
		if (!t) {
			this.#N();
			return;
		}
		this.#F = !0;
		let n;
		try {
			n = t(e.hArg);
		} catch (t) {
			this.#F = !1, this.myTrace(`[${e.name}] エラー ${String(t)}`, "ET");
			return;
		}
		n || (this.#F = !1, this.#N());
	}
	#ze(e) {
		this.#F = !0;
		let t = !1;
		try {
			for (let n of e) n.t === "layPlg" && (t = this.#E.lay(n.nm, this.#D(n.page), n.hArg) || t);
		} catch (e) {
			this.#F = !1, this.myTrace(`[lay] エラー ${String(e)}`, "ET");
			return;
		}
		t || (this.#F = !1, this.#N());
	}
	async #Be(e) {
		try {
			e.t === "addFrame" ? this.#qe(await this.#T.add(e.id, e.src, e.sty)) : this.#qe({ [`const.sn.frm.${e.id}.${e.var_name}`]: this.#T.get(e.id, e.var_name, e.fnc) });
		} catch (t) {
			this.#F = !1, this.myTrace(`[${e.t === "addFrame" ? "add_frame" : "let_frame"}] エラー id:${e.id} ${String(t)}`, "ET");
			return;
		}
		this.#F = !1, this.#N();
	}
	async #Ve(e) {
		let t = this.#r;
		if (!t) {
			this.#F = !1;
			return;
		}
		try {
			let n = e.t === "reloadScript" ? this.#y : this.#m.getMark(e.place);
			if (!n) throw e.t === "reloadScript" ? "[record_place]がまだ実行されていません" : `place=${String(e.place)} は存在しません`;
			if (t.restoreMarkPart(n), this.#we(t), this.$fncs.replace(n.sPages), e.t === "load" && this.sys.crypto && await this.#He(), this.#E.setPageState(this.$fncs.getForeIdx(), !1), this.#E.playback(n.hPlgLay, []), this.#c.clear(), this.#l = void 0, this.#P = !1, e.t === "load" && e.doRec !== !1 && (this.#y = { ...n }), e.t === "load" && e.index !== void 0) {
				let n = await this.#b(e.fn || t.fn);
				t.switchScript(n, "", e.index), this.#F = !1, this.#N();
				return;
			}
			let r = String(t.getVal("save:const.sn.scriptFn") ?? ""), i = Number(t.getVal("save:const.sn.scriptIdx") ?? 0);
			if (!r) throw "再開位置（save:const.sn.scriptFn）が空です";
			delete this.#n[r];
			let a = await this.#b(r);
			if (e.t === "load" && e.label) {
				t.switchScript(a, "", i);
				let n = e.fn && e.fn !== r ? await this.#b(e.fn) : a;
				t.callToScript(n, e.label, !1);
			} else t.switchScript(a, "", i);
		} catch (t) {
			this.#F = !1, this.myTrace(`[${e.t === "reloadScript" ? "reload_script" : "load"}] ${String(t)}`, "ET");
			return;
		}
		this.#F = !1, this.#N();
	}
	async #He() {
		let { fore: e, back: t } = this.$fncs.getPages(), n = [];
		for (let [r, o] of [[e, "fore"], [t, "back"]]) for (let e of r) if (a(e)) {
			e.fn && n.push((async () => {
				let [t, n] = await Promise.all([this.#Qe(this.#Xe("lay", e.fn)), Promise.all(e.aFace.map(async (e) => ({
					...e,
					src: await this.#Qe(this.#Xe("add_face", e.fn))
				})))]);
				this.$fncs.chgPic({
					nm: e.nm,
					page: o,
					fn: e.fn,
					src: t,
					isSheet: e.isSheet,
					isMovie: e.isMovie,
					aFace: n
				});
			})());
			for (let t of e.aFx ?? []) {
				let r = t.tex;
				r && n.push(this.#rt(r).then((n) => this.$fncs.chgFx({
					aLayNm: [e.nm],
					page: o,
					mode: "add",
					fx: {
						...t,
						texSrc: n
					}
				})));
			}
		} else if (i(e)) {
			let t = e.b_pic;
			t && n.push(this.#Qe(this.#Xe("lay", t)).then((n) => this.$fncs.chgBPic({
				nm: e.nm,
				page: o,
				fn: t,
				src: n
			})));
		}
		await Promise.all(n);
	}
	async #Ue(e) {
		try {
			e.t === "loadPlugin" ? await this.#We(e.fn) : await this.#Ge(e);
		} catch (t) {
			this.myTrace(`[${e.t === "loadPlugin" ? "loadplugin" : "snapshot"}] ${String(t)}`, "E");
		}
		this.#F = !1, this.#N();
	}
	async #We(e) {
		let t = await this.sys.fetch(e);
		if (!t.ok) throw `cssが取得できません fn:${e}`;
		let n = document.createElement("style");
		n.textContent = await t.text(), document.head.appendChild(n);
	}
	async #Ge(e) {
		let n = this.#k;
		if (!n) throw "ステージがまだ表示されていません";
		let r = e.fn.startsWith(f), i = r ? e.fn : ae(e.fn || "snapshot"), a = re(i), { stageW: o, stageH: s } = t, c = e.width || o, l = e.height || s, u = (e.aLayNm === null && e.page === "fore" && e.b_color === void 0 ? await this.sys.capturePage(this.#Ke(n), c, l, a) : "") || await te({
			el: n,
			sw: o,
			sh: s,
			width: c,
			height: l,
			bgColor: e.b_color === void 0 ? "black" : ie(e.b_color),
			page: e.page,
			aLayNm: e.aLayNm,
			mime: a,
			smoothing: e.smoothing
		});
		r ? this.#m.putFile(i, u) : ne(i, u);
	}
	#Ke(e) {
		let t = e.getBoundingClientRect();
		return {
			x: Math.round(t.x),
			y: Math.round(t.y),
			width: Math.round(t.width),
			height: Math.round(t.height)
		};
	}
	#qe(e) {
		for (let [t, n] of Object.entries(e)) this.#r?.setValNochk(t, n);
	}
	#Je = Object.create(null);
	#Ye(e) {
		let t = e === "l" ? "breakline" : "breakpage";
		return this.#Je[e] ??= this.sys.cfg.matchPath(`^${t}$`, d.SP_GSM).length > 0 ? this.sys.cfg.searchPath(t, d.SP_GSM) : "";
	}
	#Xe(e, t) {
		if (!t) return "";
		if (t.startsWith("userdata:/")) return this.#m.getFile(t) || (this.myTrace(`[${e}] 保存された画像がありません fn:${t}`, "E"), "");
		try {
			return this.sys.cfg.searchPath(t, d.SP_GSM);
		} catch (n) {
			return this.myTrace(`[${e}] 画像が見つかりません fn:${t} ${String(n)}`, "E"), "";
		}
	}
	#Ze(e, t) {
		if (!t) return "";
		try {
			return this.sys.cfg.searchPath(t, d.SOUND);
		} catch (n) {
			return this.myTrace(`[${e}] 音声ファイルが見つかりません fn:${t} ${String(n)}`, "E"), "";
		}
	}
	#Qe(e) {
		return l(e, this.sys.crypto, this.sys.fetch, (e) => this.sys.decAB(e));
	}
	#$e = /* @__PURE__ */ new Map();
	#et = /* @__PURE__ */ new Map();
	#tt = /* @__PURE__ */ new Map();
	#nt(e) {
		let t = this.#D(e);
		return () => t === this.$fncs.getForeIdx() ? "fore" : "back";
	}
	#rt(e) {
		return this.#Qe(this.#Xe("add_fx", e));
	}
	#it = /* @__PURE__ */ new Map();
	#at() {
		let e = this.#r;
		if (e) for (let t of new Set(e.peekUpcomingPicFn())) {
			let e;
			try {
				e = this.sys.cfg.searchPath(t, d.SP_GSM);
			} catch {
				continue;
			}
			if (!this.sys.crypto) {
				new Image().src = e;
				continue;
			}
			this.#it.has(e) || this.#it.set(e, this.#Qe(e));
		}
	}
	#ot(e) {
		switch (e.t) {
			case "addLay":
				switch (e.cls) {
					case "grp":
						this.$fncs.addLayer({
							cls: "grp",
							nm: e.nm,
							fn: "",
							src: "",
							isSheet: !1,
							isMovie: !1,
							aFace: []
						});
						break;
					case "txt":
						this.$fncs.addLayer({
							cls: "txt",
							nm: e.nm,
							str: "",
							aCh: [],
							aBtn: [],
							b_alpha: 1,
							enabled: !0
						});
						break;
					default: this.$fncs.addLayer({
						cls: e.cls,
						nm: e.nm,
						plg: !0
					}), this.#E.add(e.nm, e.cls);
				}
				break;
			case "layPlg": break;
			case "chgPic": {
				let t = this.#Xe("lay", e.fn), { isSheet: n, isMovie: r } = Ha(t), i = e.aFace?.map((e) => {
					let t = this.#Xe("add_face", e.fn);
					return {
						...e,
						src: t,
						...Ha(t)
					};
				});
				if (!this.sys.crypto) {
					this.$fncs.chgPic({
						nm: e.nm,
						page: e.page,
						fn: e.fn,
						src: t,
						isSheet: n,
						isMovie: r,
						...i && { aFace: i }
					});
					break;
				}
				let a = `${e.nm}:${e.page}`, o = (this.#$e.get(a) ?? 0) + 1;
				this.#$e.set(a, o), this.$fncs.chgPic({
					nm: e.nm,
					page: e.page,
					fn: e.fn,
					src: "",
					isSheet: n,
					isMovie: r,
					...i && { aFace: i.map((e) => ({
						...e,
						src: ""
					})) }
				});
				let s = this.#nt(e.page), c = (e) => {
					let t = this.#it.get(e);
					return t && this.#it.delete(e), t ?? this.#Qe(e);
				};
				Promise.all([c(t), ...i?.map((e) => c(e.src)) ?? []]).then(([t, ...c]) => {
					this.#$e.get(a) === o && this.$fncs.chgPic({
						nm: e.nm,
						page: s(),
						fn: e.fn,
						src: t,
						isSheet: n,
						isMovie: r,
						...i && { aFace: i.map((e, t) => ({
							...e,
							src: c[t] ?? ""
						})) }
					});
				});
				break;
			}
			case "chgBAlpha":
				this.$fncs.chgBAlpha({
					nm: e.nm,
					page: e.page,
					...e.b_alpha === void 0 ? {} : { b_alpha: e.b_alpha },
					...e.isFixed === void 0 ? {} : { isFixed: e.isFixed }
				});
				break;
			case "chgBPic": {
				if (!e.fn) {
					this.$fncs.chgBPic({
						nm: e.nm,
						page: e.page,
						fn: e.fn,
						src: ""
					});
					break;
				}
				let t = this.#Xe("lay b_pic", e.fn);
				if (!this.sys.crypto) {
					this.$fncs.chgBPic({
						nm: e.nm,
						page: e.page,
						fn: e.fn,
						src: t
					});
					break;
				}
				let n = `${e.nm}:${e.page}`, r = (this.#et.get(n) ?? 0) + 1;
				this.#et.set(n, r), this.$fncs.chgBPic({
					nm: e.nm,
					page: e.page,
					fn: e.fn,
					src: ""
				});
				let i = this.#nt(e.page);
				this.#Qe(t).then((t) => {
					this.#et.get(n) === r && this.$fncs.chgBPic({
						nm: e.nm,
						page: i(),
						fn: e.fn,
						src: t
					});
				});
				break;
			}
			case "chgBackClear":
				this.$fncs.chgBackClear({
					nm: e.nm,
					page: e.page
				});
				break;
			case "finishTrans":
				this.#q();
				break;
			case "trans": {
				this.#q();
				let t = this.$fncs.getForeIdx();
				this.$fncs.startTrans({
					aLayNm: e.aLayNm,
					time: e.time,
					...e.rule ? { ruleSrc: this.#Xe("trans", e.rule) } : {},
					...e.vague === void 0 ? {} : { vague: e.vague },
					...e.glsl === void 0 ? {} : { glslSrc: e.glsl }
				}), e.time <= 0 && this.#E.finishTrans(e.aLayNm, t, []), this.#K(e.time, e.aLayNm);
				break;
			}
			case "waitTrans": break;
			case "plgTag": break;
			case "chgStr":
				{
					let t = v(e.str);
					for (let e of t) e.pic && (e.src = this.#Xe("graph", e.pic));
					this.$fncs.chgStr({
						nm: e.nm,
						page: e.page,
						str: y(t),
						aCh: t,
						...e.hard ? { hard: !0 } : {}
					});
				}
				break;
			case "addBtn": {
				let t = e.sty && {
					...e.sty,
					...e.sty.pic ? { src: this.#Xe("button pic", e.sty.pic) } : {},
					...e.sty.b_pic ? { b_src: this.#Xe("button b_pic", e.sty.b_pic) } : {}
				};
				this.$fncs.addBtn({
					layerNm: e.layerNm,
					page: e.page,
					...e.nm === void 0 ? {} : { nm: e.nm },
					text: e.text,
					label: e.label,
					...e.call === void 0 ? {} : { call: e.call },
					...e.fn === void 0 ? {} : { fn: e.fn },
					...e.arg === void 0 ? {} : { arg: e.arg },
					...e.url === void 0 ? {} : { url: e.url },
					...t === void 0 ? {} : { sty: t }
				});
				break;
			}
			case "chgLay":
				this.$fncs.chgLay({
					nm: e.nm,
					page: e.page,
					sty: e.sty,
					...e.reposition ? { reposition: e.reposition } : {}
				});
				break;
			case "defChStyle":
				this.$fncs.defChStyle({
					kind: e.kind,
					nm: e.nm,
					sty: e.sty
				});
				break;
			case "autowc":
				this.$fncs.setAutowc({
					enabled: e.enabled,
					h: e.hWait
				});
				break;
			case "clearLay":
				this.#ue(e.aLayNm, e.page), this.#ve((t) => (e.page === "both" || t.page === "both" || t.page === e.page) && p.#be(t, e.aLayNm, null)), this.$fncs.clearLay({
					aLayNm: e.aLayNm,
					page: e.page
				}), this.#E.clearLay(e.aLayNm, e.page, this.$fncs.getForeIdx());
				break;
			case "clearTxtLay":
				this.#ue([e.nm], e.page), this.$fncs.clearTxtLay({
					nm: e.nm,
					page: e.page,
					clearFilter: e.clearFilter
				});
				break;
			case "addFilter":
				this.$fncs.chgFilter({
					aLayNm: e.aLayNm,
					page: e.page,
					mode: e.replace ? "replace" : "add",
					flt: e.flt
				});
				break;
			case "clearFilter":
				this.$fncs.chgFilter({
					aLayNm: e.aLayNm,
					page: e.page,
					mode: "clear"
				});
				break;
			case "enableFilter":
				this.$fncs.chgFilter({
					aLayNm: e.aLayNm,
					page: e.page,
					mode: "enable",
					index: e.index,
					enabled: e.enabled
				});
				break;
			case "defFx":
				m(e.name, e.glsl);
				break;
			case "addFx": {
				if (e.fx.tex === void 0) {
					this.$fncs.chgFx({
						aLayNm: e.aLayNm,
						page: e.page,
						mode: "add",
						fx: e.fx
					}), this.#me(e);
					break;
				}
				let t = `${e.aLayNm?.join(",") ?? ""}:${e.page}:${e.fx.name}`, n = (this.#tt.get(t) ?? 0) + 1;
				this.#tt.set(t, n);
				let r = e.page === "both" ? (() => "both") : this.#nt(e.page);
				this.#rt(e.fx.tex).then((i) => {
					this.#tt.get(t) === n && this.$fncs.chgFx({
						aLayNm: e.aLayNm,
						page: r(),
						mode: "add",
						fx: {
							...e.fx,
							texSrc: i
						}
					});
				}).catch((t) => this.myTrace(`[add_fx] tex= の解決に失敗しました fn:${e.fx.tex} ${String(t)}`, "E")), this.#me(e);
				break;
			}
			case "clearFx":
				this.$fncs.chgFx({
					aLayNm: e.aLayNm,
					page: e.page,
					mode: "clear",
					names: e.names
				}), this.#ve((t) => (e.page === "both" || t.page === "both" || t.page === e.page) && p.#be(t, e.aLayNm, e.names));
				break;
			case "enableFx":
				this.$fncs.chgFx({
					aLayNm: e.aLayNm,
					page: "both",
					mode: "enable",
					names: e.names,
					...e.index === null ? {} : { index: e.index },
					enabled: e.enabled
				}), this.#he((t) => p.#be(t, e.aLayNm, e.names), !e.enabled);
				break;
			case "moveLay":
				this.$fncs.moveLay({
					nm: e.nm,
					mode: e.mode,
					...e.index === void 0 ? {} : { index: e.index },
					...e.dive === void 0 ? {} : { dive: e.dive }
				});
				break;
			case "enableEvent":
				this.$fncs.enableEvent({
					nm: e.nm,
					enabled: e.enabled
				});
				break;
			case "wait": break;
			case "tsy":
				this.#ie(e);
				break;
			case "tsyFrame":
				this.#ae(e);
				break;
			case "quake":
				this.#Z(e);
				break;
			case "stopQuake":
				this.#Q();
				break;
			case "waitQuake": break;
			case "waitTsy": break;
			case "waitFx": break;
			case "stopTsy":
				this.#le(e.tw_nm);
				break;
			case "pauseTsy": {
				let t = this.#re[e.tw_nm]?.tw;
				e.paused ? t?.pause() : t?.resume();
				break;
			}
			case "playSnd":
				e.join || this.#Se(e).catch(this.#i);
				break;
			case "stopSnd":
				this.#O.stop(e.buf);
				break;
			case "stopAllSnd":
				this.#O.stopAll();
				break;
			case "xchgBufSnd":
				this.#je(e.buf), this.#je(e.buf2), this.#O.xchgBuf(e.buf, e.buf2);
				break;
			case "duckBgm":
				this.#O.setVol("BGM", e.volume);
				break;
			case "volumeSnd":
				this.#O.setVol(e.buf, e.volume);
				break;
			case "fadeSnd":
				this.#Oe(e);
				break;
			case "waitSnd": break;
			case "waitFade": break;
			case "waitVideo": break;
			case "title":
				this.$fncs.addTitle(e.text);
				break;
			case "toggleFullScr":
				this.$fncs.toggleFullScr();
				break;
			case "navigateTo":
				this.navigateTo(e.url);
				break;
			case "loadPlugin":
				e.join || this.#We(e.fn).catch(this.#i);
				break;
			case "snapshot": break;
			case "recordPlace":
				this.#y = this.#v();
				break;
			case "save":
				this.#m.setMark(e.place, {
					...this.#y ?? this.#v(),
					json: e.json
				}), this.#_();
				break;
			case "load":
			case "reloadScript": break;
			case "copyBookmark":
				this.#m.copyMark(e.from, e.to);
				break;
			case "eraseBookmark":
				this.#m.eraseMark(e.place);
				break;
			case "exportData":
				this.#_(), this.#m.export(), setTimeout(() => this.fireEvent("sn:exported"), 10);
				break;
			case "importData":
				this.#m.import().then((e) => {
					let t = this.#r;
					t && (t.setSys(e.sys), t.setKidoku(e.kidoku), this.fireEvent("sn:imported"));
				}).catch((e) => this.myTrace(`[import] ${String(e)}`, "E"));
				break;
			case "fullScrKey":
				this.#j.add(e.key);
				break;
			case "dumpLay": {
				let { fore: t, back: n } = this.$fncs.getPages(), r = (t) => e.aLayNm ? t.filter((t) => e.aLayNm.includes(t.nm)) : t;
				this.myTrace(`[dump_lay] ${JSON.stringify({
					fore: r(t),
					back: r(n)
				})}`, "D");
				break;
			}
			case "frame":
				this.#qe(this.#T.frame(e.id, e.sty, e.order, e.disabled));
				break;
			case "setFrame":
				this.#T.set(e.id, e.var_name, e.text);
				break;
			case "resvDomEvent": {
				let t = this.#T.resvDom(e.rawKey, e.key, e.del, e.needErr, (t) => {
					this.cancelAuto();
					for (let [e, n] of Object.entries(t.dataset)) this.#r?.setValNochk(`sn.event.domdata.${e}`, n ?? "");
					this.fireEvent(e.key);
				});
				!e.del && t[0] && r.add(t[0]);
				break;
			}
			case "setFocus":
				switch (e.mode) {
					case "add":
						for (let t of this.#T.resolveDom(e.rawKey, e.needErr ?? !0)) r.add(t);
						break;
					case "del":
						for (let t of this.#T.resolveDom(e.rawKey, e.needErr ?? !0)) r.remove(t);
						break;
					case "null":
						r.blur();
						break;
					case "next":
						r.next();
						break;
					case "prev": r.prev();
				}
				break;
			case "addFrame":
			case "letFrame": break;
			case "close":
				this.sys.close();
				break;
			case "window":
				this.sys.window(e);
				break;
			case "updateCheck":
				this.sys.updateCheck(e.url);
				break;
			case "clearPageLog":
				this.#c.clear(), this.#l = void 0, this.#r?.setPageLogKey(""), this.#r?.setValNochk("save:const.sn.styPaging", o), this.#f();
				break;
			case "pageStyle":
				this.#r?.setValNochk("save:const.sn.styPaging", e.style), this.#f();
				break;
			case "pageKeys":
				this.#u = e.aKey;
				break;
			case "pageTo":
			case "pageToPlace": break;
			case "trace":
				this.#ct({ text: e.text });
				break;
			case "log":
				this.#ut({ text: e.text }, e.fn, e.lineNum);
				break;
			case "dumpScript":
				this.#ht(e.setFnc, e.breakFnc, e.needErr);
				break;
			case "loadScript": break;
			case "stop": {
				let t = this.#l;
				if (this.#l = void 0, t && (this.#c.push(t.fn, t.idx, t.mark, t.clearOnResume), this.#r?.setPageLogKey(`${String(t.idx)}:${t.fn}`)), this.#d = !1, this.#f(), e.kind === "l" || e.kind === "p" || e.kind === "waitclick") {
					let t = e.kind === "waitclick" ? void 0 : this.#Ye(e.kind);
					this.$fncs.setWait({
						nm: e.nm,
						kind: e.kind,
						...t ? { src: t } : {},
						...e.mark,
						...e.noMark ? { noMark: !0 } : {}
					});
				}
				this.#P = e.kind === "s", e.resume ? this.#V(e.resume.mode, e.resume.msec) : this.$fncs.setSkipping(!1), this.#_(), this.$fncs.setBackAlpha(Number(this.#r?.getVal("sys:TextLayer.Back.Alpha") ?? 1)), this.$fncs.setNextChHint(this.#r?.peekNextDisplayChar()), this.$fncs.setBtnFont(String(this.#r?.getVal("tmp:sn.button.fontFamily") ?? "") || c), this.#r && this.$fncs.setChWait(this.#r.chWait), this.#gt(!0);
				break;
			}
		}
	}
	async #st(e) {
		try {
			let t = this.sys.cfg.searchPath(e, d.SCRIPT), n = "";
			try {
				n = this.sys.cfg.searchPath(e + "@", d.SCRIPT);
			} catch {}
			if (!n) {
				let e = await this.sys.fetch(t);
				if (!e.ok) throw Error(e.statusText);
				return await this.sys.dec(t, await e.text());
			}
			let [r, i] = await Promise.all([this.sys.fetch(t), this.sys.fetch(n)]);
			if (!r.ok) throw Error(r.statusText);
			if (!i.ok) throw Error(i.statusText);
			let [a, o] = await Promise.all([this.sys.dec(t, await r.text()), this.sys.dec(n, await i.text())]), s = a.split("\n"), c = o.split("\n");
			for (let e = 0; e < c.length && e < s.length; ++e) c[e] ||= s[e] ?? "";
			return c.join("\n");
		} catch (t) {
			throw this.myTrace(`[load] スクリプト読込に失敗しました fn:${e} ${String(t)}`, "ET"), t;
		}
	}
	#ct(e) {
		return this.myTrace(e.text || `(text is ${e.text})`, "I"), !1;
	}
	#lt = !0;
	#ut(n, r, i) {
		let a = "";
		return this.#lt && (this.#lt = !1, a = `== ${t.plat_desc} ==\n`), this.sys.appendFile(this.sys.path_downloads + "log.txt", `${a}--- ${e("-", "_", "")} [fn:${r} line:${String(i)}] prj:${this.sys.arg.cur}\n${n.text || `(text is ${String(n.text)})`}\n`), !1;
	}
	#dt;
	#ft;
	#pt = "";
	#mt = Object.create(null);
	#ht(e, t, n) {
		let r = globalThis, i = r[e];
		if (typeof i != "function") {
			n && this.myTrace(`[dump_script] globalThis に関数 ${e} が見つかりません`, "ET");
			return;
		}
		if (this.#dt = i, t) {
			let e = r[t];
			typeof e == "function" ? this.#ft = e : n && this.myTrace(`[dump_script] globalThis に関数 ${t} が見つかりません`, "ET");
		}
		this.#gt(!0);
	}
	#gt(e) {
		let t = this.#r;
		if (!this.#dt || !t) return;
		let n = t.lineNum;
		if (!Number.isFinite(n)) return;
		let r = t.fn;
		r !== this.#pt && (this.#pt = r, this.#dt(this.#mt[r] ??= this.#n[r]?.aToken.join("") ?? "")), this.#ft?.(n, t.colNum, e);
	}
	myTrace = (e, n = "E") => {
		let r = "";
		switch (n) {
			case "D":
				r = "color:#05A;";
				break;
			case "W":
				r = "color:#F80;";
				break;
			case "F":
				r = "color:#B00;";
				break;
			case "ET":
			case "E":
				r = "color:#F30;";
				break;
			default: r = "";
		}
		let i = `{${n}} ` + e;
		switch (this.#e.innerHTML += `<span style='${r}'>${i}</span><br/>`, this.#e.hidden = !1, n) {
			case "D":
				t.isDarkMode && (r = "color:#49F;");
				break;
			case "W":
			case "F": break;
			case "ET":
			case "E":
				if (this.#t.title({ text: e }), n === "ET") throw this.#a = i;
				break;
			default: r = "";
		}
		console.info("%c " + i, r);
	};
};
//#endregion
export { Ua as ScriptMng };

//# sourceMappingURL=ScriptMng.js.map