import { i as e, t } from "./CmnLib.js";
import { t as n } from "./SaveMng.js";
import { t as r } from "./FocusMng.js";
import { f as i, n as a, p as o, r as s } from "./PageLog.js";
import { DEF_BTN_FONT as c } from "./store.js";
import { o as l, r as u } from "./Sprite.js";
import { n as d } from "./ConfigBase.js";
import { PROTOCOL_USERDATA as f } from "./Config.js";
import { n as p } from "./LayCls.js";
import { ScriptEngine as m, a as h, c as g, i as _, n as v, o as y, r as b, s as x, t as S } from "./ScriptEngine.js";
import { a as C, i as w, n as T, r as ee, t as te } from "./Snapshot.js";
//#region src/ts/FrameMng.ts
var ne = class e {
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
}, re = class {
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
		for (let i of Object.keys(this.#t)) e && !e.includes(i) || this.#e[`${i}:${String(t)}`]?.copy(this.#e[`${i}:${String(r)}`], n);
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
function ie(e) {
	return e.matchPath(".+", d.FONT).flatMap((e) => Object.values(e)).filter((e) => typeof e == "string").map((t) => `@font-face {
	font-family: ${JSON.stringify(t)};
	src: url(${JSON.stringify(e.searchPath(t, d.FONT))});
}`).join("\n");
}
function ae(e, t = document) {
	let n = ie(e);
	if (!n) return;
	let r = t.createElement("style");
	r.dataset.sn = "font", r.textContent = n, t.head.appendChild(r);
}
//#endregion
//#region src/ts/SndBuf.ts
var oe = 999e3, se = class {
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
}, ce = {
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
}, le = class {
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
		for (let [n, r] of Object.entries(ce)) t[n] = e.canPlayType(r) !== "";
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
		let { ctx: a, gn: o } = this.#n(), s = new se(a, o, e, t, n);
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
function ue(e, t) {
	e.indexOf(t) === -1 && e.push(t);
}
function de(e, t) {
	let n = e.indexOf(t);
	n > -1 && e.splice(n, 1);
}
//#endregion
//#region node_modules/motion-utils/dist/es/clamp.mjs
var E = (e, t, n) => n > t ? t : n < e ? e : n;
//#endregion
//#region node_modules/motion-utils/dist/es/format-error-message.mjs
function fe(e, t) {
	return t ? `${e}. For more information and steps for solving, visit https://motion.dev/troubleshooting/${t}` : e;
}
//#endregion
//#region node_modules/motion-utils/dist/es/errors.mjs
var D = () => {}, O = () => {};
typeof process < "u" && process.env.NODE_ENV !== "production" && (D = (e, t, n) => {
	!e && typeof console < "u" && console.warn(fe(t, n));
}, O = (e, t, n) => {
	if (!e) throw Error(fe(t, n));
});
//#endregion
//#region node_modules/motion-utils/dist/es/global-config.mjs
var k = {}, pe = (e) => /^-?(?:\d+(?:\.\d+)?|\.\d+)$/u.test(e), me = (e) => typeof e == "object" && !!e, he = (e) => /^0[^.\s]+$/u.test(e);
//#endregion
//#region node_modules/motion-utils/dist/es/memo.mjs
/*#__NO_SIDE_EFFECTS__*/
function ge(e) {
	let t;
	return () => (t === void 0 && (t = e()), t);
}
//#endregion
//#region node_modules/motion-utils/dist/es/noop.mjs
var A = /* @__NO_SIDE_EFFECTS__ */ (e) => e, _e = (...e) => e.reduce((e, t) => (n) => t(e(n))), ve = /* @__NO_SIDE_EFFECTS__ */ (e, t, n) => {
	let r = t - e;
	return r ? (n - e) / r : 1;
}, ye = class {
	constructor() {
		this.subscriptions = [];
	}
	add(e) {
		return ue(this.subscriptions, e), () => de(this.subscriptions, e);
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
}, j = /* @__NO_SIDE_EFFECTS__ */ (e) => e * 1e3, M = /* @__NO_SIDE_EFFECTS__ */ (e) => e / 1e3, be = /* @__NO_SIDE_EFFECTS__ */ (e, t) => t ? 1e3 / t * e : 0, xe = /* @__PURE__ */ new Set();
function Se(e, t, n) {
	e || xe.has(t) || (console.warn(fe(t, n)), xe.add(t));
}
//#endregion
//#region node_modules/motion-utils/dist/es/wrap.mjs
var Ce = (e, t, n) => {
	let r = t - e;
	return ((n - e) % r + r) % r + e;
}, we = (e, t, n) => (((1 - 3 * n + 3 * t) * e + (3 * n - 6 * t)) * e + 3 * t) * e, Te = 1e-7, Ee = 12;
function De(e, t, n, r, i) {
	let a, o, s = 0;
	do
		o = t + (n - t) / 2, a = we(o, r, i) - e, a > 0 ? n = o : t = o;
	while (Math.abs(a) > Te && ++s < Ee);
	return o;
}
/*#__NO_SIDE_EFFECTS__*/
function Oe(e, t, n, r) {
	if (e === t && n === r) return A;
	let i = (t) => De(t, 0, 1, e, n);
	return (e) => e === 0 || e === 1 ? e : we(i(e), t, r);
}
//#endregion
//#region node_modules/motion-utils/dist/es/easing/modifiers/mirror.mjs
var ke = /* @__NO_SIDE_EFFECTS__ */ (e) => (t) => t <= .5 ? e(2 * t) / 2 : (2 - e(2 * (1 - t))) / 2, Ae = /* @__NO_SIDE_EFFECTS__ */ (e) => (t) => 1 - e(1 - t), je = /*@__PURE__*/ Oe(.33, 1.53, .69, .99), Me = /*@__PURE__*/ Ae(je), Ne = /*@__PURE__*/ ke(Me), Pe = (e) => e >= 1 ? 1 : (e *= 2) < 1 ? .5 * Me(e) : .5 * (2 - 2 ** (-10 * (e - 1))), Fe = (e) => 1 - Math.sin(Math.acos(e)), Ie = /* @__PURE__ */ Ae(Fe), Le = /* @__PURE__ */ ke(Fe), Re = /*@__PURE__*/ Oe(.42, 0, 1, 1), ze = /*@__PURE__*/ Oe(0, 0, .58, 1), Be = /*@__PURE__*/ Oe(.42, 0, .58, 1), Ve = /* @__NO_SIDE_EFFECTS__ */ (e) => Array.isArray(e) && typeof e[0] != "number";
//#endregion
//#region node_modules/motion-utils/dist/es/easing/utils/get-easing-for-segment.mjs
/*#__NO_SIDE_EFFECTS__*/
function He(e, t) {
	return /* @__PURE__ */ Ve(e) ? e[Ce(0, e.length, t)] : e;
}
//#endregion
//#region node_modules/motion-utils/dist/es/easing/utils/is-bezier-definition.mjs
var Ue = /* @__NO_SIDE_EFFECTS__ */ (e) => Array.isArray(e) && typeof e[0] == "number", We = {
	linear: A,
	easeIn: Re,
	easeInOut: Be,
	easeOut: ze,
	circIn: Fe,
	circInOut: Le,
	circOut: Ie,
	backIn: Me,
	backInOut: Ne,
	backOut: je,
	anticipate: Pe
}, Ge = (e) => typeof e == "string", Ke = (e) => {
	if (/* @__PURE__ */ Ue(e)) {
		O(e.length === 4, "Cubic bezier arrays must contain four numerical values.", "cubic-bezier-length");
		let [t, n, r, i] = e;
		return /* @__PURE__ */ Oe(t, n, r, i);
	}
	return Ge(e) ? (O(We[e] !== void 0, `Invalid easing type '${e}'`, "invalid-easing-type"), We[e]) : e;
}, qe = [
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
function Je(e) {
	let t = /* @__PURE__ */ new Set(), n = /* @__PURE__ */ new Set(), r = !1, i = !1, a = /* @__PURE__ */ new WeakSet(), o = {
		delta: 0,
		timestamp: 0,
		isProcessing: !1
	};
	function s(t) {
		a.has(t) && (c.schedule(t), e()), t(o);
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
var Ye = 40;
function Xe(e, t) {
	let n = !1, r = !0, i = {
		delta: 0,
		timestamp: 0,
		isProcessing: !1
	}, a = () => n = !0, o = qe.reduce((e, t) => (e[t] = Je(a), e), {}), { setup: s, read: c, resolveKeyframes: l, preUpdate: u, update: d, preRender: f, render: p, postRender: m } = o, h = () => {
		let a = k.useManualTiming, o = a ? i.timestamp : performance.now();
		n = !1, a || (i.delta = r ? 1e3 / 60 : Math.max(Math.min(o - i.timestamp, Ye), 1)), i.timestamp = o, i.isProcessing = !0, s.process(i), c.process(i), l.process(i), u.process(i), d.process(i), f.process(i), p.process(i), m.process(i), i.isProcessing = !1, n && t && (r = !1, e(h));
	}, g = () => {
		n = !0, r = !0, i.isProcessing || e(h);
	};
	return {
		schedule: qe.reduce((e, t) => {
			let r = o[t];
			return e[t] = (e, t = !1, i = !1) => (n || g(), r.schedule(e, t, i)), e;
		}, {}),
		cancel: (e) => {
			for (let t = 0; t < qe.length; t++) o[qe[t]].cancel(e);
		},
		state: i,
		steps: o
	};
}
//#endregion
//#region node_modules/motion-dom/dist/es/frameloop/frame.mjs
var { schedule: N, cancel: Ze, state: Qe, steps: $e } = /* @__PURE__ */ Xe(typeof requestAnimationFrame < "u" ? requestAnimationFrame : A, !0), et;
function tt() {
	et = void 0;
}
var P = {
	now: () => (et === void 0 && P.set(Qe.isProcessing || k.useManualTiming ? Qe.timestamp : performance.now()), et),
	set: (e) => {
		et = e, queueMicrotask(tt);
	}
}, nt = (e) => (t) => typeof t == "string" && t.startsWith(e), rt = /*@__PURE__*/ nt("--"), it = /*@__PURE__*/ nt("var(--"), at = (e) => it(e) ? ot.test(e.split("/*")[0].trim()) : !1, ot = /var\(--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)$/iu;
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
	transform: (e) => E(0, 1, e)
}, lt = {
	...F,
	default: 1
}, ut = (e) => Math.round(e * 1e5) / 1e5, dt = /-?(?:\d+(?:\.\d+)?|\.\d+)/gu;
//#endregion
//#region node_modules/motion-dom/dist/es/value/types/utils/is-nullish.mjs
function ft(e) {
	return e == null;
}
//#endregion
//#region node_modules/motion-dom/dist/es/value/types/utils/single-color-regex.mjs
var pt = /^(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))$/iu, mt = (e, t) => (n) => !!(typeof n == "string" && pt.test(n) && n.startsWith(e) || t && !ft(n) && Object.prototype.hasOwnProperty.call(n, t)), ht = (e, t, n) => (r) => {
	if (typeof r != "string") return r;
	let [i, a, o, s] = r.match(dt);
	return {
		[e]: parseFloat(i),
		[t]: parseFloat(a),
		[n]: parseFloat(o),
		alpha: s === void 0 ? 1 : parseFloat(s)
	};
}, gt = (e) => E(0, 255, e), _t = {
	...F,
	transform: (e) => Math.round(gt(e))
}, I = {
	test: /*@__PURE__*/ mt("rgb", "red"),
	parse: /*@__PURE__*/ ht("red", "green", "blue"),
	transform: ({ red: e, green: t, blue: n, alpha: r = 1 }) => "rgba(" + _t.transform(e) + ", " + _t.transform(t) + ", " + _t.transform(n) + ", " + ut(ct.transform(r)) + ")"
};
//#endregion
//#region node_modules/motion-dom/dist/es/value/types/color/hex.mjs
function vt(e) {
	let t = "", n = "", r = "", i = "";
	return e.length > 5 ? (t = e.substring(1, 3), n = e.substring(3, 5), r = e.substring(5, 7), i = e.substring(7, 9)) : (t = e.substring(1, 2), n = e.substring(2, 3), r = e.substring(3, 4), i = e.substring(4, 5), t += t, n += n, r += r, i += i), {
		red: parseInt(t, 16),
		green: parseInt(n, 16),
		blue: parseInt(r, 16),
		alpha: i ? parseInt(i, 16) / 255 : 1
	};
}
var yt = {
	test: /*@__PURE__*/ mt("#"),
	parse: vt,
	transform: I.transform
}, bt = /* @__NO_SIDE_EFFECTS__ */ (e) => ({
	test: (t) => typeof t == "string" && t.endsWith(e) && t.split(" ").length === 1,
	parse: parseFloat,
	transform: (t) => `${t}${e}`
}), L = /*@__PURE__*/ bt("deg"), R = /*@__PURE__*/ bt("%"), z = /*@__PURE__*/ bt("px"), xt = /*@__PURE__*/ bt("vh"), St = /*@__PURE__*/ bt("vw"), Ct = {
	...R,
	parse: (e) => R.parse(e) / 100,
	transform: (e) => R.transform(e * 100)
}, B = {
	test: /*@__PURE__*/ mt("hsl", "hue"),
	parse: /*@__PURE__*/ ht("hue", "saturation", "lightness"),
	transform: ({ hue: e, saturation: t, lightness: n, alpha: r = 1 }) => "hsla(" + Math.round(e) + ", " + R.transform(ut(t)) + ", " + R.transform(ut(n)) + ", " + ut(ct.transform(r)) + ")"
}, V = {
	test: (e) => I.test(e) || yt.test(e) || B.test(e),
	parse: (e) => I.test(e) ? I.parse(e) : B.test(e) ? B.parse(e) : yt.parse(e),
	transform: (e) => typeof e == "string" ? e : e.hasOwnProperty("red") ? I.transform(e) : B.transform(e),
	getAnimatableNone: (e) => {
		let t = V.parse(e);
		return t.alpha = 0, V.transform(t);
	}
}, wt = /(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))/giu;
//#endregion
//#region node_modules/motion-dom/dist/es/value/types/complex/index.mjs
function Tt(e) {
	return isNaN(e) && typeof e == "string" && (e.match(dt)?.length || 0) + (e.match(wt)?.length || 0) > 0;
}
var Et = "number", Dt = "color", Ot = "var", kt = "var(", At = "${}", jt = /var\s*\(\s*--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)|#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\)|-?(?:\d+(?:\.\d+)?|\.\d+)/giu;
function H(e) {
	let t = e.toString(), n = [], r = {
		color: [],
		number: [],
		var: []
	}, i = [], a = 0;
	return {
		values: n,
		split: t.replace(jt, (e) => (V.test(e) ? (r.color.push(a), i.push(Dt), n.push(V.parse(e))) : e.startsWith(kt) ? (r.var.push(a), i.push(Ot), n.push(e)) : (r.number.push(a), i.push(Et), n.push(parseFloat(e))), ++a, At)).split(At),
		indexes: r,
		types: i
	};
}
function Mt(e) {
	return H(e).values;
}
function Nt({ split: e, types: t }) {
	let n = e.length;
	return (r) => {
		let i = "";
		for (let a = 0; a < n; a++) if (i += e[a], r[a] !== void 0) {
			let e = t[a];
			i += e === Et ? ut(r[a]) : e === Dt ? V.transform(r[a]) : r[a];
		}
		return i;
	};
}
function Pt(e) {
	return Nt(H(e));
}
var Ft = (e) => typeof e == "number" ? 0 : V.test(e) ? V.getAnimatableNone(e) : e, It = (e, t) => typeof e == "number" ? t?.trim().endsWith("/") ? e : 0 : Ft(e);
function Lt(e) {
	let t = H(e);
	return Nt(t)(t.values.map((e, n) => It(e, t.split[n])));
}
var U = {
	test: Tt,
	parse: Mt,
	createTransformer: Pt,
	getAnimatableNone: Lt
};
//#endregion
//#region node_modules/motion-dom/dist/es/value/types/color/hsla-to-rgba.mjs
function Rt(e, t, n) {
	return n < 0 && (n += 1), n > 1 && --n, n < 1 / 6 ? e + (t - e) * 6 * n : n < 1 / 2 ? t : n < 2 / 3 ? e + (t - e) * (2 / 3 - n) * 6 : e;
}
function zt({ hue: e, saturation: t, lightness: n, alpha: r }) {
	e /= 360, t /= 100, n /= 100;
	let i = 0, a = 0, o = 0;
	if (!t) i = a = o = n;
	else {
		let r = n < .5 ? n * (1 + t) : n + t - n * t, s = 2 * n - r;
		i = Rt(s, r, e + 1 / 3), a = Rt(s, r, e), o = Rt(s, r, e - 1 / 3);
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
function Bt(e, t) {
	return (n) => n > 0 ? t : e;
}
//#endregion
//#region node_modules/motion-dom/dist/es/utils/mix/number.mjs
var W = (e, t, n) => e + (t - e) * n, Vt = (e, t, n) => {
	let r = e * e, i = n * (t * t - r) + r;
	return i < 0 ? 0 : Math.sqrt(i);
}, Ht = [
	yt,
	I,
	B
], Ut = (e) => Ht.find((t) => t.test(e));
function Wt(e) {
	let t = Ut(e);
	if (D(!!t, `'${e}' is not an animatable color. Use the equivalent color code instead.`, "color-not-animatable"), !t) return !1;
	let n = t.parse(e);
	return t === B && (n = zt(n)), n;
}
var Gt = (e, t) => {
	let n = Wt(e), r = Wt(t);
	if (!n || !r) return Bt(e, t);
	let i = { ...n };
	return (e) => (i.red = Vt(n.red, r.red, e), i.green = Vt(n.green, r.green, e), i.blue = Vt(n.blue, r.blue, e), i.alpha = W(n.alpha, r.alpha, e), I.transform(i));
}, Kt = /* @__PURE__ */ new Set(["none", "hidden"]);
function qt(e, t) {
	return Kt.has(e) ? (n) => n <= 0 ? e : t : (n) => n >= 1 ? t : e;
}
//#endregion
//#region node_modules/motion-dom/dist/es/utils/mix/complex.mjs
function Jt(e, t) {
	return (n) => W(e, t, n);
}
function Yt(e) {
	return typeof e == "number" ? Jt : typeof e == "string" ? at(e) ? Bt : V.test(e) ? Gt : $t : Array.isArray(e) ? Xt : typeof e == "object" ? V.test(e) ? Gt : Zt : Bt;
}
function Xt(e, t) {
	let n = [...e], r = n.length, i = e.map((e, n) => Yt(e)(e, t[n]));
	return (e) => {
		for (let t = 0; t < r; t++) n[t] = i[t](e);
		return n;
	};
}
function Zt(e, t) {
	let n = {
		...e,
		...t
	}, r = {};
	for (let i in n) e[i] !== void 0 && t[i] !== void 0 && (r[i] = Yt(e[i])(e[i], t[i]));
	return (e) => {
		for (let t in r) n[t] = r[t](e);
		return n;
	};
}
function Qt(e, t) {
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
var $t = (e, t) => {
	let n = U.createTransformer(t), r = H(e), i = H(t);
	return r.indexes.var.length === i.indexes.var.length && r.indexes.color.length === i.indexes.color.length && r.indexes.number.length >= i.indexes.number.length ? Kt.has(e) && !i.values.length || Kt.has(t) && !r.values.length ? qt(e, t) : _e(Xt(Qt(r, i), i.values), n) : (D(!0, `Complex values '${e}' and '${t}' too different to mix. Ensure all colors are of the same type, and that each contains the same quantity of number and color values. Falling back to instant transition.`, "complex-values-different"), Bt(e, t));
};
//#endregion
//#region node_modules/motion-dom/dist/es/utils/mix/index.mjs
function en(e, t, n) {
	return typeof e == "number" && typeof t == "number" && typeof n == "number" ? W(e, t, n) : Yt(e)(e, t);
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/drivers/frame.mjs
var tn = (e) => {
	let t = ({ timestamp: t }) => e(t);
	return {
		start: (e = !0) => N.update(t, e),
		stop: () => Ze(t),
		now: () => Qe.isProcessing ? Qe.timestamp : P.now()
	};
}, nn = (e, t, n = 10) => {
	let r = "", i = Math.max(Math.round(t / n), 2);
	for (let t = 0; t < i; t++) r += Math.round(e(t / (i - 1)) * 1e4) / 1e4 + ", ";
	return `linear(${r.substring(0, r.length - 2)})`;
}, rn = 2e4;
function an(e) {
	let t = 0, n = e.next(t);
	for (; !n.done && t < 2e4;) t += 50, n = e.next(t);
	return t >= 2e4 ? Infinity : t;
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/generators/utils/create-generator-easing.mjs
function on(e, t = 100, n) {
	let r = n({
		...e,
		keyframes: [0, t]
	}), i = Math.min(an(r), rn);
	return {
		type: "keyframes",
		ease: (e) => r.next(i * e).value / t,
		duration: /* @__PURE__ */ M(i)
	};
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/generators/spring.mjs
var G = {
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
function sn(e, t) {
	return e * Math.sqrt(1 - t * t);
}
var cn = 12;
function ln(e, t, n) {
	let r = n;
	for (let n = 1; n < cn; n++) r -= e(r) / t(r);
	return r;
}
var un = .001;
function dn({ duration: e = G.duration, bounce: t = G.bounce, velocity: n = G.velocity, mass: r = G.mass }) {
	let i, a;
	D(e <= /* @__PURE__ */ j(G.maxDuration), "Spring duration must be 10 seconds or less", "spring-duration-limit");
	let o = 1 - t;
	o = E(G.minDamping, G.maxDamping, o), e = E(G.minDuration, G.maxDuration, /* @__PURE__ */ M(e)), o < 1 ? (i = (t) => {
		let r = t * o, i = r * e, a = r - n, s = sn(t, o), c = Math.exp(-i);
		return un - a / s * c;
	}, a = (t) => {
		let r = t * o * e, a = r * n + n, s = o ** 2 * t ** 2 * e, c = Math.exp(-r), l = sn(t ** 2, o);
		return (-i(t) + un > 0 ? -1 : 1) * ((a - s) * c) / l;
	}) : (i = (t) => -.001 + Math.exp(-t * e) * ((t - n) * e + 1), a = (t) => Math.exp(-t * e) * ((n - t) * (e * e)));
	let s = 5 / e, c = ln(i, a, s);
	if (e = /* @__PURE__ */ j(e), isNaN(c)) return {
		stiffness: G.stiffness,
		damping: G.damping,
		duration: e
	};
	{
		let t = c ** 2 * r;
		return {
			stiffness: t,
			damping: o * 2 * Math.sqrt(r * t),
			duration: e
		};
	}
}
var fn = ["duration", "bounce"], pn = [
	"stiffness",
	"damping",
	"mass"
];
function mn(e, t) {
	return t.some((t) => e[t] !== void 0);
}
function hn(e) {
	let t = {
		velocity: G.velocity,
		stiffness: G.stiffness,
		damping: G.damping,
		mass: G.mass,
		isResolvedFromDuration: !1,
		...e
	};
	if (!mn(e, pn) && mn(e, fn)) {
		if (t.velocity = 0, e.visualDuration) {
			let n = e.visualDuration, r = 2 * Math.PI / (n * 1.2), i = r * r, a = 2 * E(.05, 1, 1 - (e.bounce || 0)) * Math.sqrt(i);
			t = {
				...t,
				mass: G.mass,
				stiffness: i,
				damping: a
			};
		} else {
			let n = dn({
				...e,
				velocity: 0
			});
			t = {
				...t,
				...n,
				mass: G.mass
			}, t.isResolvedFromDuration = !0;
		}
	}
	return t;
}
function gn(e = G.visualDuration, t = G.bounce) {
	let n = typeof e == "object" ? e : {
		visualDuration: e,
		keyframes: [0, 1],
		bounce: t
	}, { restSpeed: r, restDelta: i } = n, a = n.keyframes[0], o = n.keyframes[n.keyframes.length - 1], s = {
		done: !1,
		value: a
	}, { stiffness: c, damping: l, mass: u, duration: d, velocity: f, isResolvedFromDuration: p } = hn({
		...n,
		velocity: -/* @__PURE__ */ M(n.velocity || 0)
	}), m = f || 0, h = l / (2 * Math.sqrt(c * u)), g = o - a, _ = /* @__PURE__ */ M(Math.sqrt(c / u)), v = Math.abs(g) < 5;
	r ||= v ? G.restSpeed.granular : G.restSpeed.default, i ||= v ? G.restDelta.granular : G.restDelta.default;
	let y, b, x, S, C, w;
	if (h < 1) x = sn(_, h), S = (m + h * _ * g) / x, y = (e) => {
		let t = Math.exp(-h * _ * e);
		return o - t * (S * Math.sin(x * e) + g * Math.cos(x * e));
	}, C = h * _ * S + g * x, w = h * _ * g - S * x, b = (e) => Math.exp(-h * _ * e) * (C * Math.sin(x * e) + w * Math.cos(x * e));
	else if (h === 1) {
		y = (e) => o - Math.exp(-_ * e) * (g + (m + _ * g) * e);
		let e = m + _ * g;
		b = (t) => Math.exp(-_ * t) * (_ * e * t - m);
	} else {
		let e = _ * Math.sqrt(h * h - 1);
		y = (t) => {
			let n = Math.exp(-h * _ * t), r = Math.min(e * t, 300);
			return o - n * ((m + h * _ * g) * Math.sinh(r) + e * g * Math.cosh(r)) / e;
		};
		let t = (m + h * _ * g) / e, n = h * _ * t - g * e, r = h * _ * g - t * e;
		b = (t) => {
			let i = Math.exp(-h * _ * t), a = Math.min(e * t, 300);
			return i * (n * Math.sinh(a) + r * Math.cosh(a));
		};
	}
	let T = {
		calculatedDuration: p && d || null,
		velocity: (e) => /* @__PURE__ */ j(b(e)),
		next: (e) => {
			if (!p && h < 1) {
				let t = Math.exp(-h * _ * e), n = Math.sin(x * e), a = Math.cos(x * e), c = o - t * (S * n + g * a), l = /* @__PURE__ */ j(t * (C * n + w * a));
				return s.done = Math.abs(l) <= r && Math.abs(o - c) <= i, s.value = s.done ? o : c, s;
			}
			let t = y(e);
			if (p) s.done = e >= d;
			else {
				let n = /* @__PURE__ */ j(b(e));
				s.done = Math.abs(n) <= r && Math.abs(o - t) <= i;
			}
			return s.value = s.done ? o : t, s;
		},
		toString: () => {
			let e = Math.min(an(T), rn), t = nn((t) => T.next(e * t).value, e, 30);
			return e + "ms " + t;
		},
		toTransition: () => {}
	};
	return T;
}
gn.applyToOptions = (e) => {
	let t = on(e, 100, gn);
	return e.ease = t.ease, e.duration = /* @__PURE__ */ j(t.duration), e.type = "keyframes", e;
};
//#endregion
//#region node_modules/motion-dom/dist/es/animation/generators/utils/velocity.mjs
var _n = 5;
function vn(e, t, n) {
	let r = Math.max(t - _n, 0);
	return /* @__PURE__ */ be(n - e(r), t - r);
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/generators/inertia.mjs
function yn({ keyframes: e, velocity: t = 0, power: n = .8, timeConstant: r = 325, bounceDamping: i = 10, bounceStiffness: a = 500, modifyTarget: o, min: s, max: c, restDelta: l = .5, restSpeed: u }) {
	let d = e[0], f = {
		done: !1,
		value: d
	}, p = (e) => s !== void 0 && e < s || c !== void 0 && e > c, m = (e) => s === void 0 ? c : c === void 0 || Math.abs(s - e) < Math.abs(c - e) ? s : c, h = n * t, g = d + h, _ = o === void 0 ? g : o(g);
	_ !== g && (h = _ - d);
	let v = (e) => -h * Math.exp(-e / r), y = (e) => _ + v(e), b = (e) => {
		let t = v(e), n = y(e);
		f.done = Math.abs(t) <= l, f.value = f.done ? _ : n;
	}, x, S, C = (e) => {
		p(f.value) && (x = e, S = gn({
			keyframes: [f.value, m(f.value)],
			velocity: vn(y, e, f.value),
			damping: i,
			stiffness: a,
			restDelta: l,
			restSpeed: u
		}));
	};
	return C(0), {
		calculatedDuration: null,
		next: (e) => {
			let t = !1;
			return !S && x === void 0 && (t = !0, b(e), C(e)), x !== void 0 && e >= x ? S.next(e - x) : (!t && b(e), f);
		}
	};
}
//#endregion
//#region node_modules/motion-dom/dist/es/utils/interpolate.mjs
function bn(e, t, n) {
	let r = [], i = n || k.mix || en, a = e.length - 1;
	for (let n = 0; n < a; n++) {
		let a = i(e[n], e[n + 1]);
		t && (a = _e(Array.isArray(t) ? t[n] || A : t, a)), r.push(a);
	}
	return r;
}
function xn(e, t, { clamp: n = !0, ease: r, mixer: i } = {}) {
	let a = e.length;
	if (O(a === t.length, "Both input and output ranges must be the same length", "range-length"), a === 1) return () => t[0];
	if (a === 2 && t[0] === t[1]) return () => t[1];
	let o = e[0] === e[1];
	e[0] > e[a - 1] && (e = [...e].reverse(), t = [...t].reverse());
	let s = bn(t, r, i), c = s.length, l = (n) => {
		if (o && n < e[0]) return t[0];
		let r = 0;
		if (c > 1) for (; r < e.length - 2 && !(n < e[r + 1]); r++);
		let i = /* @__PURE__ */ ve(e[r], e[r + 1], n);
		return s[r](i);
	};
	return n ? (t) => l(E(e[0], e[a - 1], t)) : l;
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/keyframes/offsets/fill.mjs
function Sn(e, t) {
	let n = e[e.length - 1];
	for (let r = 1; r <= t; r++) {
		let i = /* @__PURE__ */ ve(0, t, r);
		e.push(W(n, 1, i));
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
	return e.map(() => t || Be).splice(0, e.length - 1);
}
function K({ duration: e = 300, keyframes: t, times: n, ease: r = "easeInOut" }) {
	let i = /* @__PURE__ */ Ve(r) ? r.map(Ke) : Ke(r), a = {
		done: !1,
		value: t[0]
	}, o = xn(wn(n && n.length === t.length ? n : Cn(t), e), t, { ease: Array.isArray(i) ? i : Tn(t, i) });
	return {
		calculatedDuration: e,
		next: (t) => (a.value = o(t), a.done = t >= e, a)
	};
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/keyframes/get-final.mjs
var En = (e) => e !== null;
function Dn(e, { repeat: t, repeatType: n = "loop" }, r, i = 1) {
	let a = e.filter(En), o = i < 0 || t && n !== "loop" && t % 2 == 1 ? 0 : a.length - 1;
	return !o || r === void 0 ? a[o] : r;
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/utils/replace-transition-type.mjs
var On = {
	decay: yn,
	inertia: yn,
	tween: K,
	keyframes: K,
	spring: gn
};
function kn(e) {
	typeof e.type == "string" && (e.type = On[e.type]);
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/utils/WithPromise.mjs
var An = class {
	constructor() {
		this.updateFinished();
	}
	get finished() {
		return this._finished;
	}
	updateFinished() {
		this._finished = new Promise((e) => {
			this.resolve = e;
		});
	}
	notifyFinished() {
		this.resolve();
	}
	then(e, t) {
		return this.finished.then(e, t);
	}
}, jn = (e) => e / 100, Mn = class extends An {
	constructor(e) {
		super(), this.state = "idle", this.startTime = null, this.isStopped = !1, this.currentTime = 0, this.holdTime = null, this.playbackSpeed = 1, this.delayState = {
			done: !1,
			value: void 0
		}, this.stop = () => {
			let { motionValue: e } = this.options;
			e && e.updatedAt !== P.now() && this.tick(P.now()), this.isStopped = !0, this.state !== "idle" && (this.teardown(), this.options.onStop?.());
		}, this.options = e, this.initAnimation(), this.play(), e.autoplay === !1 && this.pause();
	}
	initAnimation() {
		let { options: e } = this;
		kn(e);
		let { type: t = K, repeat: n = 0, repeatDelay: r = 0, repeatType: i, velocity: a = 0 } = e, { keyframes: o } = e, s = t || K;
		process.env.NODE_ENV !== "production" && s !== K && O(o.length <= 2, `Only two keyframes currently supported with spring and inertia animations. Trying to animate ${o}`, "spring-two-frames"), s !== K && typeof o[0] != "number" && (this.mixKeyframes = _e(jn, en(o[0], o[1])), o = [0, 100]);
		let c = s({
			...e,
			keyframes: o
		});
		i === "mirror" && (this.mirroredGenerator = s({
			...e,
			keyframes: [...o].reverse(),
			velocity: -a
		})), c.calculatedDuration === null && (c.calculatedDuration = an(c));
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
			!n && e >= 1 && (n = 1), n === 1 && t--, t = Math.min(t, u + 1), t % 2 && (d === "reverse" ? (n = 1 - n, f && (n -= f / o)) : d === "mirror" && (y = a)), v = E(0, 1, n) * o;
		}
		let b;
		_ ? (this.delayState.value = l[0], b = this.delayState) : b = y.next(v), i && !_ && (b.value = i(b.value));
		let { done: x } = b;
		!_ && s !== null && (x = this.playbackSpeed >= 0 ? this.currentTime >= r : this.currentTime <= 0);
		let S = this.holdTime === null && (this.state === "finished" || this.state === "running" && x);
		return S && p !== yn && (b.value = Dn(l, this.options, h, this.speed)), m && m(b.value), S && this.finish(), b;
	}
	then(e, t) {
		return this.finished.then(e, t);
	}
	get duration() {
		return /* @__PURE__ */ M(this.calculatedDuration);
	}
	get iterationDuration() {
		let { delay: e = 0 } = this.options || {};
		return this.duration + /* @__PURE__ */ M(e);
	}
	get time() {
		return /* @__PURE__ */ M(this.currentTime);
	}
	set time(e) {
		e = /* @__PURE__ */ j(e), this.currentTime = e, this.startTime === null || this.holdTime !== null || this.playbackSpeed === 0 ? this.holdTime = e : this.driver && (this.startTime = this.driver.now() - e / this.playbackSpeed), this.driver ? this.driver.start(!1) : (this.startTime = 0, this.state = "paused", this.holdTime = e, this.tick(e));
	}
	getGeneratorVelocity() {
		let e = this.currentTime;
		if (e <= 0) return this.options.velocity || 0;
		if (this.generator.velocity) return this.generator.velocity(e);
		let t = this.generator.next(e).value;
		return vn((e) => this.generator.next(e).value, e, t);
	}
	get speed() {
		return this.playbackSpeed;
	}
	set speed(e) {
		let t = this.playbackSpeed !== e;
		t && this.driver && this.updateTime(P.now()), this.playbackSpeed = e, t && this.driver && (this.time = /* @__PURE__ */ M(this.currentTime));
	}
	play() {
		if (this.isStopped) return;
		let { driver: e = tn, startTime: t } = this.options;
		this.driver ||= e((e) => this.tick(e)), this.options.onPlay?.();
		let n = this.driver.now();
		this.state === "finished" ? (this.updateFinished(), this.startTime = n) : this.holdTime === null ? this.startTime ||= t ?? n : this.startTime = n - this.holdTime, this.state === "finished" && this.speed < 0 && (this.startTime += this.calculatedDuration), this.holdTime = null, this.state = "running", this.driver.start();
	}
	pause() {
		this.state = "paused", this.updateTime(P.now()), this.holdTime = this.currentTime;
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
};
//#endregion
//#region node_modules/motion-dom/dist/es/animation/keyframes/utils/fill-wildcards.mjs
function Nn(e) {
	for (let t = 1; t < e.length; t++) e[t] ?? (e[t] = e[t - 1]);
}
//#endregion
//#region node_modules/motion-dom/dist/es/render/dom/parse-transform.mjs
var q = (e) => e * 180 / Math.PI, Pn = (e) => In(q(Math.atan2(e[1], e[0]))), Fn = {
	x: 4,
	y: 5,
	translateX: 4,
	translateY: 5,
	scaleX: 0,
	scaleY: 3,
	scale: (e) => (Math.abs(e[0]) + Math.abs(e[3])) / 2,
	rotate: Pn,
	rotateZ: Pn,
	skewX: (e) => q(Math.atan(e[1])),
	skewY: (e) => q(Math.atan(e[2])),
	skew: (e) => (Math.abs(e[1]) + Math.abs(e[2])) / 2
}, In = (e) => (e %= 360, e < 0 && (e += 360), e), Ln = Pn, Rn = (e) => Math.sqrt(e[0] * e[0] + e[1] * e[1]), zn = (e) => Math.sqrt(e[4] * e[4] + e[5] * e[5]), Bn = {
	x: 12,
	y: 13,
	z: 14,
	translateX: 12,
	translateY: 13,
	translateZ: 14,
	scaleX: Rn,
	scaleY: zn,
	scale: (e) => (Rn(e) + zn(e)) / 2,
	rotateX: (e) => In(q(Math.atan2(e[6], e[5]))),
	rotateY: (e) => In(q(Math.atan2(-e[2], e[0]))),
	rotateZ: Ln,
	rotate: Ln,
	skewX: (e) => q(Math.atan(e[4])),
	skewY: (e) => q(Math.atan(e[1])),
	skew: (e) => (Math.abs(e[1]) + Math.abs(e[4])) / 2
};
function Vn(e) {
	return +!!e.includes("scale");
}
function Hn(e, t) {
	if (!e || e === "none") return Vn(t);
	let n = e.match(/^matrix3d\(([-\d.e\s,]+)\)$/u), r, i;
	if (n) r = Bn, i = n;
	else {
		let t = e.match(/^matrix\(([-\d.e\s,]+)\)$/u);
		r = Fn, i = t;
	}
	if (!i) return Vn(t);
	let a = r[t], o = i[1].split(",").map(Wn);
	return typeof a == "function" ? a(o) : o[a];
}
var Un = (e, t) => {
	let { transform: n = "none" } = getComputedStyle(e);
	return Hn(n, t);
};
function Wn(e) {
	return parseFloat(e.trim());
}
//#endregion
//#region node_modules/motion-dom/dist/es/render/utils/keys-transform.mjs
var J = [
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
], Y = /* @__PURE__ */ new Set([...J, "pathRotation"]), Gn = (e) => e === F || e === z, Kn = /* @__PURE__ */ new Set([
	"x",
	"y",
	"z"
]), qn = J.filter((e) => !Kn.has(e));
function Jn(e) {
	let t = [];
	return qn.forEach((n) => {
		let r = e.getValue(n);
		r !== void 0 && (t.push([n, r.get()]), r.set(+!!n.startsWith("scale")));
	}), t;
}
var X = {
	width: ({ x: e }, { paddingLeft: t = "0", paddingRight: n = "0", boxSizing: r }) => {
		let i = e.max - e.min;
		return r === "border-box" ? i : i - parseFloat(t) - parseFloat(n);
	},
	height: ({ y: e }, { paddingTop: t = "0", paddingBottom: n = "0", boxSizing: r }) => {
		let i = e.max - e.min;
		return r === "border-box" ? i : i - parseFloat(t) - parseFloat(n);
	},
	top: (e, { top: t }) => parseFloat(t),
	left: (e, { left: t }) => parseFloat(t),
	bottom: ({ y: e }, { top: t }) => parseFloat(t) + (e.max - e.min),
	right: ({ x: e }, { left: t }) => parseFloat(t) + (e.max - e.min),
	x: (e, { transform: t }) => Hn(t, "x"),
	y: (e, { transform: t }) => Hn(t, "y")
};
X.translateX = X.x, X.translateY = X.y;
//#endregion
//#region node_modules/motion-dom/dist/es/animation/keyframes/KeyframesResolver.mjs
var Z = /* @__PURE__ */ new Set(), Yn = !1, Xn = !1, Zn = !1;
function Qn() {
	if (Xn) {
		let e = Array.from(Z).filter((e) => e.needsMeasurement), t = new Set(e.map((e) => e.element)), n = /* @__PURE__ */ new Map();
		t.forEach((e) => {
			let t = Jn(e);
			t.length && (n.set(e, t), e.render());
		}), e.forEach((e) => e.measureInitialState()), t.forEach((e) => {
			e.render();
			let t = n.get(e);
			t && t.forEach(([t, n]) => {
				e.getValue(t)?.set(n);
			});
		}), e.forEach((e) => e.measureEndState()), e.forEach((e) => {
			e.suspendedScrollY !== void 0 && window.scrollTo(0, e.suspendedScrollY);
		});
	}
	Xn = !1, Yn = !1, Z.forEach((e) => e.complete(Zn)), Z.clear();
}
function $n() {
	Z.forEach((e) => {
		e.readKeyframes(), e.needsMeasurement && (Xn = !0);
	});
}
function er() {
	Zn = !0, $n(), Qn(), Zn = !1;
}
var tr = class {
	constructor(e, t, n, r, i, a = !1) {
		this.state = "pending", this.isAsync = !1, this.needsMeasurement = !1, this.unresolvedKeyframes = [...e], this.onComplete = t, this.name = n, this.motionValue = r, this.element = i, this.isAsync = a;
	}
	scheduleResolve() {
		this.state = "scheduled", this.isAsync ? (Z.add(this), Yn || (Yn = !0, N.read($n), N.resolveKeyframes(Qn))) : (this.readKeyframes(), this.complete());
	}
	readKeyframes() {
		let { unresolvedKeyframes: e, name: t, element: n, motionValue: r } = this;
		if (e[0] === null) {
			let i = r?.get(), a = e[e.length - 1];
			if (i !== void 0) e[0] = i;
			else if (n && t) {
				let r = n.readValue(t, a);
				r != null && (e[0] = r);
			}
			e[0] === void 0 && (e[0] = a), r && i === void 0 && r.set(e[0]);
		}
		Nn(e);
	}
	setFinalKeyframe() {}
	measureInitialState() {}
	renderEndStyles() {}
	measureEndState() {}
	complete(e = !1) {
		this.state = "complete", this.onComplete(this.unresolvedKeyframes, this.finalKeyframe, e), Z.delete(this);
	}
	cancel() {
		this.state === "scheduled" && (Z.delete(this), this.state = "pending");
	}
	resume() {
		this.state === "pending" && this.scheduleResolve();
	}
}, nr = (e) => e.startsWith("--");
//#endregion
//#region node_modules/motion-dom/dist/es/render/dom/style-set.mjs
function rr(e, t, n) {
	nr(t) ? e.style.setProperty(t, n) : e.style[t] = n;
}
//#endregion
//#region node_modules/motion-dom/dist/es/utils/supports/flags.mjs
var ir = {};
//#endregion
//#region node_modules/motion-dom/dist/es/utils/supports/memo.mjs
function ar(e, t) {
	let n = /* @__PURE__ */ ge(e);
	return () => ir[t] ?? n();
}
//#endregion
//#region node_modules/motion-dom/dist/es/utils/supports/scroll-timeline.mjs
var or = /* @__PURE__ */ ar(() => window.ScrollTimeline !== void 0, "scrollTimeline"), sr = /*@__PURE__*/ ar(() => {
	try {
		document.createElement("div").animate({ opacity: 0 }, { easing: "linear(0, 1)" });
	} catch {
		return !1;
	}
	return !0;
}, "linearEasing"), cr = ([e, t, n, r]) => `cubic-bezier(${e}, ${t}, ${n}, ${r})`, lr = {
	linear: "linear",
	ease: "ease",
	easeIn: "ease-in",
	easeOut: "ease-out",
	easeInOut: "ease-in-out",
	circIn: /*@__PURE__*/ cr([
		0,
		.65,
		.55,
		1
	]),
	circOut: /*@__PURE__*/ cr([
		.55,
		0,
		1,
		.45
	]),
	backIn: /*@__PURE__*/ cr([
		.31,
		.01,
		.66,
		-.59
	]),
	backOut: /*@__PURE__*/ cr([
		.33,
		1.53,
		.69,
		.99
	])
};
//#endregion
//#region node_modules/motion-dom/dist/es/animation/waapi/easing/map-easing.mjs
function ur(e, t) {
	if (e) return typeof e == "function" ? sr() ? nn(e, t) : "ease-out" : /* @__PURE__ */ Ue(e) ? cr(e) : Array.isArray(e) ? e.map((e) => ur(e, t) || lr.easeOut) : lr[e];
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/waapi/start-waapi-animation.mjs
function dr(e, t, n, { delay: r = 0, duration: i = 300, repeat: a = 0, repeatType: o = "loop", ease: s = "easeOut", times: c } = {}, l = void 0) {
	let u = { [t]: n };
	c && (u.offset = c);
	let d = ur(s, i);
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
function fr(e) {
	return typeof e == "function" && "applyToOptions" in e;
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/waapi/utils/apply-generator.mjs
function pr({ type: e, ...t }) {
	return fr(e) && sr() ? e.applyToOptions(t) : (t.duration ??= 300, t.ease ??= "easeOut", t);
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/NativeAnimation.mjs
var mr = class extends An {
	constructor(e) {
		if (super(), this.finishedTime = null, this.isStopped = !1, this.manualStartTime = null, !e) return;
		let { element: t, name: n, keyframes: r, pseudoElement: i, allowFlatten: a = !1, finalKeyframe: o, onComplete: s } = e;
		this.isPseudoElement = !!i, this.allowFlatten = a, this.options = e, O(typeof e.type != "string", "Mini animate() doesn't support \"type\" as a string.", "mini-spring");
		let c = pr(e);
		this.animation = dr(t, n, r, c, i), c.autoplay === !1 && this.animation.pause(), this.animation.onfinish = () => {
			if (this.finishedTime = this.time, !i) {
				let e = Dn(r, this.options, o, this.speed);
				this.updateMotionValue && this.updateMotionValue(e), rr(t, n, e), this.animation.cancel();
			}
			s?.(), this.notifyFinished();
		};
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
		return /* @__PURE__ */ M(Number(e));
	}
	get iterationDuration() {
		let { delay: e = 0 } = this.options || {};
		return this.duration + /* @__PURE__ */ M(e);
	}
	get time() {
		return /* @__PURE__ */ M(Number(this.animation.currentTime) || 0);
	}
	set time(e) {
		let t = this.finishedTime !== null;
		this.manualStartTime = null, this.finishedTime = null, this.animation.currentTime = /* @__PURE__ */ j(e), t && this.animation.pause();
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
		return this.allowFlatten && this.animation.effect?.updateTiming({ easing: "linear" }), this.animation.onfinish = null, e && or() ? (this.animation.timeline = e, t && (this.animation.rangeStart = t), n && (this.animation.rangeEnd = n), A) : r(this);
	}
}, hr = {
	anticipate: Pe,
	backInOut: Ne,
	circInOut: Le
};
function gr(e) {
	return e in hr;
}
function _r(e) {
	typeof e.ease == "string" && gr(e.ease) && (e.ease = hr[e.ease]);
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/NativeAnimationExtended.mjs
var vr = 10, yr = class extends mr {
	constructor(e) {
		_r(e), kn(e), super(e), e.startTime !== void 0 && e.autoplay !== !1 && (this.startTime = e.startTime), this.options = e;
	}
	updateMotionValue(e) {
		let { motionValue: t, onUpdate: n, onComplete: r, element: i, ...a } = this.options;
		if (!t) return;
		if (e !== void 0) {
			t.set(e);
			return;
		}
		let o = new Mn({
			...a,
			autoplay: !1
		}), s = Math.max(vr, P.now() - this.startTime), c = E(0, vr, s - vr), l = o.sample(s).value, { name: u } = this.options;
		i && u && rr(i, u, l), t.setWithVelocity(o.sample(Math.max(0, s - c)).value, l, c), o.stop();
	}
}, br = (e, t) => t !== "zIndex" && !!(typeof e == "number" || Array.isArray(e) || typeof e == "string" && (U.test(e) || e === "0") && !e.startsWith("url("));
//#endregion
//#region node_modules/motion-dom/dist/es/animation/utils/can-animate.mjs
function xr(e) {
	let t = e[0];
	if (e.length === 1) return !0;
	for (let n = 0; n < e.length; n++) if (e[n] !== t) return !0;
}
function Sr(e, t, n, r) {
	let i = e[0];
	if (i === null) return !1;
	if (t === "display" || t === "visibility") return !0;
	let a = e[e.length - 1], o = br(i, t), s = br(a, t);
	return D(o === s, `You are trying to animate ${t} from "${i}" to "${a}". "${o ? a : i}" is not an animatable value.`, "value-not-animatable"), !o || !s ? !1 : xr(e) || (n === "spring" || fr(n)) && r;
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/utils/make-animation-instant.mjs
function Cr(e) {
	e.duration = 0, e.type = "keyframes";
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/waapi/utils/accelerated-values.mjs
var wr = /* @__PURE__ */ new Set([
	"opacity",
	"clipPath",
	"filter",
	"transform",
	"backgroundColor"
]), Tr = /^(?:oklch|oklab|lab|lch|color|color-mix|light-dark)\(/;
function Er(e) {
	for (let t = 0; t < e.length; t++) if (typeof e[t] == "string" && Tr.test(e[t])) return !0;
	return !1;
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/waapi/supports/waapi.mjs
var Dr = /* @__PURE__ */ new Set([
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
]), Or = /*@__PURE__*/ ge(() => Object.hasOwnProperty.call(Element.prototype, "animate"));
function kr(e) {
	let { motionValue: t, name: n, repeatDelay: r, repeatType: i, damping: a, type: o, keyframes: s } = e, c = t?.owner?.current;
	if (!(c instanceof HTMLElement) && !(c instanceof SVGElement)) return !1;
	let { onUpdate: l, transformTemplate: u } = t.owner.getProps();
	return Or() && n && (wr.has(n) || Dr.has(n) && Er(s)) && (n !== "transform" || !u) && !l && !r && i !== "mirror" && a !== 0 && o !== "inertia";
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/AsyncMotionValueAnimation.mjs
var Ar = 40, jr = class extends An {
	constructor({ autoplay: e = !0, delay: t = 0, type: n = "keyframes", repeat: r = 0, repeatDelay: i = 0, repeatType: a = "loop", keyframes: o, name: s, motionValue: c, element: l, ...u }) {
		super(), this.stop = () => {
			this._animation && (this._animation.stop(), this.stopTimeline?.()), this.keyframeResolver?.cancel();
		}, this.createdAt = P.now();
		let d = {
			autoplay: e,
			delay: t,
			type: n,
			repeat: r,
			repeatDelay: i,
			repeatType: a,
			name: s,
			motionValue: c,
			element: l,
			...u
		}, f = l?.KeyframeResolver || tr;
		this.keyframeResolver = new f(o, (e, t, n) => this.onKeyframesResolved(e, t, d, !n), s, c, l), this.keyframeResolver?.scheduleResolve();
	}
	onKeyframesResolved(e, t, n, r) {
		this.keyframeResolver = void 0;
		let { name: i, type: a, velocity: o, delay: s, isHandoff: c, onUpdate: l } = n;
		this.resolvedAt = P.now();
		let u = !0;
		Sr(e, i, a, o) || (u = !1, (k.instantAnimations || !s) && l?.(Dn(e, n, t)), e[0] = e[e.length - 1], Cr(n), n.repeat = 0);
		let d = {
			startTime: r ? this.resolvedAt && this.resolvedAt - this.createdAt > Ar ? this.resolvedAt : this.createdAt : void 0,
			finalKeyframe: t,
			...n,
			keyframes: e
		}, f = u && !c && kr(d), p = d.motionValue?.owner?.current, m;
		if (f) try {
			m = new yr({
				...d,
				element: p
			});
		} catch {
			m = new Mn(d);
		}
		else m = new Mn(d);
		m.finished.then(() => {
			this.notifyFinished();
		}).catch(A), this.pendingTimeline &&= (this.stopTimeline = m.attachTimeline(this.pendingTimeline), void 0), this._animation = m;
	}
	get finished() {
		return this._animation ? this.animation.finished : this._finished;
	}
	then(e, t) {
		return this.finished.finally(e).then(() => {});
	}
	get animation() {
		return this._animation || (this.keyframeResolver?.resume(), er()), this._animation;
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
}, Mr = class {
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
		return Nr(this.animations, "duration");
	}
	get iterationDuration() {
		return Nr(this.animations, "iterationDuration");
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
function Nr(e, t) {
	let n = 0;
	for (let r = 0; r < e.length; r++) {
		let i = e[r][t];
		i !== null && i > n && (n = i);
	}
	return n;
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/GroupAnimationWithThen.mjs
var Pr = class extends Mr {
	then(e, t) {
		return this.finished.finally(e).then(() => {});
	}
}, Fr = 30, Ir = (e) => !isNaN(parseFloat(e)), Lr = { current: void 0 }, Rr = class {
	constructor(e, t = {}) {
		this.canTrackVelocity = null, this.events = {}, this.updateAndNotify = (e) => {
			let t = P.now();
			if (this.updatedAt !== t && this.setPrevFrameValue(), this.prev = this.current, this.setCurrent(e), this.current !== this.prev && (this.events.change?.notify(this.current), this.dependents)) for (let e of this.dependents) e.dirty();
		}, this.hasAnimated = !1, this.setCurrent(e), this.owner = t.owner;
	}
	setCurrent(e) {
		this.current = e, this.updatedAt = P.now(), this.canTrackVelocity === null && e !== void 0 && (this.canTrackVelocity = Ir(this.current));
	}
	setPrevFrameValue(e = this.current) {
		this.prevFrameValue = e, this.prevUpdatedAt = this.updatedAt;
	}
	onChange(e) {
		return process.env.NODE_ENV !== "production" && Se(!1, "value.onChange(callback) is deprecated. Switch to value.on(\"change\", callback)."), this.on("change", e);
	}
	on(e, t) {
		this.events[e] || (this.events[e] = new ye());
		let n = this.events[e].add(t);
		return e === "change" ? () => {
			n(), N.read(() => {
				this.events.change.getSize() || this.stop();
			});
		} : n;
	}
	clearListeners() {
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
		this.events.change?.notify(this.current);
	}
	addDependent(e) {
		this.dependents ||= /* @__PURE__ */ new Set(), this.dependents.add(e);
	}
	removeDependent(e) {
		this.dependents && this.dependents.delete(e);
	}
	get() {
		return Lr.current && Lr.current.push(this), this.current;
	}
	getPrevious() {
		return this.prev;
	}
	getVelocity() {
		let e = P.now();
		if (!this.canTrackVelocity || this.prevFrameValue === void 0 || e - this.updatedAt > Fr) return 0;
		let t = Math.min(this.updatedAt - this.prevUpdatedAt, Fr);
		return /* @__PURE__ */ be(parseFloat(this.current) - parseFloat(this.prevFrameValue), t);
	}
	start(e) {
		return this.stop(), new Promise((t) => {
			this.hasAnimated = !0, this.animation = e(t), this.events.animationStart && this.events.animationStart.notify();
		}).then(() => {
			this.events.animationComplete && this.events.animationComplete.notify(), this.clearAnimation();
		});
	}
	stop() {
		this.animation && (this.animation.stop(), this.events.animationCancel && this.events.animationCancel.notify()), this.clearAnimation();
	}
	isAnimating() {
		return !!this.animation;
	}
	clearAnimation() {
		delete this.animation;
	}
	destroy() {
		this.dependents?.clear(), this.events.destroy?.notify(), this.clearListeners(), this.stop(), this.stopPassiveEffect && this.stopPassiveEffect();
	}
};
function Q(e, t) {
	return new Rr(e, t);
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/utils/resolve-transition.mjs
function zr(e, t) {
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
function Br(e, t) {
	let n = e?.[t] ?? e?.default ?? e;
	return n === e ? n : zr(n, e);
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/utils/default-transitions.mjs
var Vr = {
	type: "spring",
	stiffness: 500,
	damping: 25,
	restSpeed: 10
}, Hr = (e) => ({
	type: "spring",
	stiffness: 550,
	damping: e === 0 ? 2 * Math.sqrt(550) : 30,
	restSpeed: 10
}), Ur = {
	type: "keyframes",
	duration: .8
}, Wr = {
	type: "keyframes",
	ease: [
		.25,
		.1,
		.35,
		1
	],
	duration: .3
}, Gr = (e, { keyframes: t }) => t.length > 2 ? Ur : Y.has(e) ? e.startsWith("scale") ? Hr(t[1]) : Vr : Wr, Kr = /* @__PURE__ */ new Set([
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
function qr(e) {
	for (let t in e) if (!Kr.has(t)) return !0;
	return !1;
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/interfaces/motion-value.mjs
var Jr = (e, t, n, r = {}, i, a) => (o) => {
	let s = Br(r, e) || {}, c = s.delay || r.delay || 0, { elapsed: l = 0 } = r;
	l -= /* @__PURE__ */ j(c);
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
	qr(s) || Object.assign(u, Gr(e, u)), u.duration &&= /* @__PURE__ */ j(u.duration), u.repeatDelay &&= /* @__PURE__ */ j(u.repeatDelay), u.from !== void 0 && (u.keyframes[0] = u.from);
	let d = !1;
	if ((u.type === !1 || u.duration === 0 && !u.repeatDelay) && (Cr(u), u.delay === 0 && (d = !0)), (k.instantAnimations || k.skipAnimations || i?.shouldSkipAnimations || s.skipAnimations) && (d = !0, Cr(u), u.delay = 0), u.allowFlatten = !s.type && !s.ease, d && !a && t.get() !== void 0) {
		let e = Dn(u.keyframes, s);
		if (e !== void 0) {
			N.update(() => {
				u.onUpdate(e), u.onComplete();
			});
			return;
		}
	}
	return s.isSync ? new Mn(u) : new jr(u);
}, Yr = /^var\(--(?:([\w-]+)|([\w-]+), ?([a-zA-Z\d ()%#.,-]+))\)/u;
function Xr(e) {
	let t = Yr.exec(e);
	if (!t) return [,];
	let [, n, r, i] = t;
	return [`--${n ?? r}`, i];
}
var Zr = 4;
function Qr(e, t, n = 1) {
	O(n <= Zr, `Max CSS variable fallback depth detected in property "${e}". This may indicate a circular fallback dependency.`, "max-css-var-depth");
	let [r, i] = Xr(e);
	if (!r) return;
	let a = window.getComputedStyle(t).getPropertyValue(r);
	if (a) {
		let e = a.trim();
		return pe(e) ? parseFloat(e) : e;
	}
	return at(i) ? Qr(i, t, n + 1) : i;
}
//#endregion
//#region node_modules/motion-dom/dist/es/render/utils/resolve-variants.mjs
function $r(e) {
	let t = [{}, {}];
	return e?.values.forEach((e, n) => {
		t[0][n] = e.get(), t[1][n] = e.getVelocity();
	}), t;
}
function ei(e, t, n, r) {
	if (typeof t == "function") {
		let [i, a] = $r(r);
		t = t(n === void 0 ? e.custom : n, i, a);
	}
	if (typeof t == "string" && (t = e.variants && e.variants[t]), typeof t == "function") {
		let [i, a] = $r(r);
		t = t(n === void 0 ? e.custom : n, i, a);
	}
	return t;
}
//#endregion
//#region node_modules/motion-dom/dist/es/render/utils/resolve-dynamic-variants.mjs
function ti(e, t, n) {
	let r = e.getProps();
	return ei(r, t, n === void 0 ? r.custom : n, e);
}
//#endregion
//#region node_modules/motion-dom/dist/es/render/utils/keys-position.mjs
var ni = /* @__PURE__ */ new Set([
	"width",
	"height",
	"top",
	"left",
	"right",
	"bottom",
	...J
]), ri = (e) => Array.isArray(e);
//#endregion
//#region node_modules/motion-dom/dist/es/render/utils/setters.mjs
function ii(e, t, n) {
	e.hasValue(t) ? e.getValue(t).set(n) : e.addValue(t, Q(n));
}
function ai(e) {
	return ri(e) ? e[e.length - 1] || 0 : e;
}
function oi(e, t) {
	let { transitionEnd: n = {}, transition: r = {}, ...i } = ti(e, t) || {};
	i = {
		...i,
		...n
	};
	for (let t in i) ii(e, t, ai(i[t]));
}
//#endregion
//#region node_modules/motion-dom/dist/es/value/utils/is-motion-value.mjs
var $ = (e) => !!(e && e.getVelocity);
//#endregion
//#region node_modules/motion-dom/dist/es/value/will-change/is.mjs
function si(e) {
	return !!($(e) && e.add);
}
//#endregion
//#region node_modules/motion-dom/dist/es/value/will-change/add-will-change.mjs
function ci(e, t) {
	let n = e.getValue("willChange");
	if (si(n)) return n.add(t);
	if (!n && k.WillChange) {
		let n = new k.WillChange("auto");
		e.addValue("willChange", n), n.add(t);
	}
}
//#endregion
//#region node_modules/motion-dom/dist/es/render/dom/utils/camel-to-dash.mjs
function li(e) {
	return e.replace(/([A-Z])/g, (e) => `-${e.toLowerCase()}`);
}
var ui = "data-" + li("framerAppearId");
//#endregion
//#region node_modules/motion-dom/dist/es/animation/optimized-appear/get-appear-id.mjs
function di(e) {
	return e.props[ui];
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/interfaces/visual-element-target.mjs
var fi = typeof window < "u";
function pi({ protectedKeys: e, needsAnimating: t }, n) {
	let r = e.hasOwnProperty(n) && t[n] !== !0;
	return t[n] = !1, r;
}
function mi(e, t, { delay: n = 0, transitionOverride: r, type: i } = {}) {
	let { transition: a, transitionEnd: o, ...s } = t, c = e.getDefaultTransition();
	a = a ? zr(a, c) : c;
	let l = a?.reduceMotion, u = a?.skipAnimations;
	r && (a = r);
	let d = [], f = i && e.animationState && e.animationState.getState()[i], p = a?.path;
	p && p.animateVisualElement(e, s, a, n, d);
	for (let t in s) {
		let r = e.getValue(t, e.latestValues[t] ?? null), i = s[t];
		if (i === void 0 || f && pi(f, t)) continue;
		let o = {
			delay: n,
			...Br(a || {}, t)
		};
		u && (o.skipAnimations = !0);
		let c = r.get();
		if (c !== void 0 && !r.isAnimating() && !Array.isArray(i) && i === c && !o.velocity) {
			N.update(() => r.set(i));
			continue;
		}
		let p = !1;
		if (fi && window.MotionHandoffAnimation) {
			let n = di(e);
			if (n) {
				let e = window.MotionHandoffAnimation(n, t, N);
				e !== null && (o.startTime = e, p = !0);
			}
		}
		ci(e, t);
		let m = l ?? e.shouldReduceMotion;
		r.start(Jr(t, r, i, m && ni.has(t) ? { type: !1 } : o, e, p));
		let h = r.animation;
		h && d.push(h);
	}
	if (o) {
		let t = () => N.update(() => {
			o && oi(e, o);
		});
		d.length ? Promise.all(d).then(t) : t();
	}
	return d;
}
//#endregion
//#region node_modules/motion-dom/dist/es/value/types/auto.mjs
var hi = {
	test: (e) => e === "auto",
	parse: (e) => e
}, gi = (e) => (t) => t.test(e), _i = [
	F,
	z,
	R,
	L,
	St,
	xt,
	hi
], vi = (e) => _i.find(gi(e));
//#endregion
//#region node_modules/motion-dom/dist/es/animation/keyframes/utils/is-none.mjs
function yi(e) {
	return typeof e == "number" ? e === 0 : e === null || e === "none" || e === "0" || he(e);
}
//#endregion
//#region node_modules/motion-dom/dist/es/value/types/complex/filter.mjs
var bi = /* @__PURE__ */ new Set([
	"brightness",
	"contrast",
	"saturate",
	"opacity"
]);
function xi(e) {
	let [t, n] = e.slice(0, -1).split("(");
	if (t === "drop-shadow") return e;
	let [r] = n.match(dt) || [];
	if (!r) return e;
	let i = n.replace(r, ""), a = +!!bi.has(t);
	return r !== n && (a *= 100), t + "(" + a + i + ")";
}
var Si = /\b([a-z-]*)\(.*?\)/gu, Ci = {
	...U,
	getAnimatableNone: (e) => {
		let t = e.match(Si);
		return t ? t.map(xi).join(" ") : e;
	}
}, wi = {
	...U,
	getAnimatableNone: (e) => {
		let t = U.parse(e);
		return U.createTransformer(e)(t.map((e) => typeof e == "number" ? 0 : typeof e == "object" ? {
			...e,
			alpha: 1
		} : e));
	}
}, Ti = {
	...F,
	transform: Math.round
}, Ei = {
	borderWidth: z,
	borderTopWidth: z,
	borderRightWidth: z,
	borderBottomWidth: z,
	borderLeftWidth: z,
	borderRadius: z,
	borderTopLeftRadius: z,
	borderTopRightRadius: z,
	borderBottomRightRadius: z,
	borderBottomLeftRadius: z,
	width: z,
	maxWidth: z,
	height: z,
	maxHeight: z,
	top: z,
	right: z,
	bottom: z,
	left: z,
	inset: z,
	insetBlock: z,
	insetBlockStart: z,
	insetBlockEnd: z,
	insetInline: z,
	insetInlineStart: z,
	insetInlineEnd: z,
	padding: z,
	paddingTop: z,
	paddingRight: z,
	paddingBottom: z,
	paddingLeft: z,
	paddingBlock: z,
	paddingBlockStart: z,
	paddingBlockEnd: z,
	paddingInline: z,
	paddingInlineStart: z,
	paddingInlineEnd: z,
	margin: z,
	marginTop: z,
	marginRight: z,
	marginBottom: z,
	marginLeft: z,
	marginBlock: z,
	marginBlockStart: z,
	marginBlockEnd: z,
	marginInline: z,
	marginInlineStart: z,
	marginInlineEnd: z,
	fontSize: z,
	backgroundPositionX: z,
	backgroundPositionY: z,
	rotate: L,
	pathRotation: L,
	rotateX: L,
	rotateY: L,
	rotateZ: L,
	scale: lt,
	scaleX: lt,
	scaleY: lt,
	scaleZ: lt,
	skew: L,
	skewX: L,
	skewY: L,
	distance: z,
	translateX: z,
	translateY: z,
	translateZ: z,
	x: z,
	y: z,
	z,
	perspective: z,
	transformPerspective: z,
	opacity: ct,
	originX: Ct,
	originY: Ct,
	originZ: z,
	zIndex: Ti,
	fillOpacity: ct,
	strokeOpacity: ct,
	numOctaves: Ti
}, Di = {
	...Ei,
	color: V,
	backgroundColor: V,
	outlineColor: V,
	fill: V,
	stroke: V,
	borderColor: V,
	borderTopColor: V,
	borderRightColor: V,
	borderBottomColor: V,
	borderLeftColor: V,
	filter: Ci,
	WebkitFilter: Ci,
	mask: wi,
	WebkitMask: wi
}, Oi = (e) => Di[e], ki = /*@__PURE__*/ new Set([Ci, wi]);
function Ai(e, t) {
	let n = Oi(e);
	return ki.has(n) || (n = U), n.getAnimatableNone ? n.getAnimatableNone(t) : void 0;
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/keyframes/utils/make-none-animatable.mjs
var ji = /* @__PURE__ */ new Set([
	"auto",
	"none",
	"0"
]);
function Mi(e, t, n) {
	let r = 0, i;
	for (; r < e.length && !i;) {
		let t = e[r];
		typeof t == "string" && !ji.has(t) && H(t).values.length && (i = e[r]), r++;
	}
	if (i && n) for (let r of t) e[r] = Ai(n, i);
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/keyframes/DOMKeyframesResolver.mjs
var Ni = class extends tr {
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
				let i = Qr(r, t.current);
				i !== void 0 && (e[n] = i), n === e.length - 1 && (this.finalKeyframe = r);
			}
		}
		if (this.resolveNoneKeyframes(), !ni.has(n) || e.length !== 2) return;
		let [r, i] = e, a = vi(r), o = vi(i);
		if (st(r) !== st(i) && X[n]) {
			this.needsMeasurement = !0;
			return;
		}
		if (a !== o) {
			if (Gn(a) && Gn(o)) for (let t = 0; t < e.length; t++) {
				let n = e[t];
				typeof n == "string" && (e[t] = parseFloat(n));
			}
			else X[n] && (this.needsMeasurement = !0);
		}
	}
	resolveNoneKeyframes() {
		let { unresolvedKeyframes: e, name: t } = this, n = [];
		for (let t = 0; t < e.length; t++) (e[t] === null || yi(e[t])) && n.push(t);
		n.length && Mi(e, n, t);
	}
	measureInitialState() {
		let { element: e, unresolvedKeyframes: t, name: n } = this;
		if (!e || !e.current) return;
		n === "height" && (this.suspendedScrollY = window.pageYOffset), this.measuredOrigin = X[n](e.measureViewportBox(), window.getComputedStyle(e.current)), t[0] = this.measuredOrigin;
		let r = t[t.length - 1];
		r !== void 0 && e.getValue(n, r).jump(r, !1);
	}
	measureEndState() {
		let { element: e, name: t, unresolvedKeyframes: n } = this;
		if (!e || !e.current) return;
		let r = e.getValue(t);
		r && r.jump(this.measuredOrigin, !1);
		let i = n.length - 1, a = n[i];
		n[i] = X[t](e.measureViewportBox(), window.getComputedStyle(e.current)), a !== null && this.finalKeyframe === void 0 && (this.finalKeyframe = a), this.removedTransforms?.length && this.removedTransforms.forEach(([t, n]) => {
			e.getValue(t).set(n);
		}), this.resolveNoneKeyframes();
	}
}, Pi = [
	"borderTopLeftRadius",
	"borderTopRightRadius",
	"borderBottomRightRadius",
	"borderBottomLeftRadius"
];
//#endregion
//#region node_modules/motion-dom/dist/es/utils/resolve-elements.mjs
function Fi(e, t, n) {
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
//#region node_modules/motion-dom/dist/es/value/types/utils/get-as-type.mjs
var Ii = (e, t) => t && typeof e == "number" ? t.transform(e) : e, { schedule: Li, cancel: Ri } = /* @__PURE__ */ Xe(queueMicrotask, !1);
//#endregion
//#region node_modules/motion-dom/dist/es/utils/is-svg-element.mjs
function zi(e) {
	return me(e) && "ownerSVGElement" in e;
}
//#endregion
//#region node_modules/motion-dom/dist/es/utils/is-svg-svg-element.mjs
function Bi(e) {
	return zi(e) && e.tagName === "svg";
}
//#endregion
//#region node_modules/motion-dom/dist/es/value/types/utils/find.mjs
var Vi = [
	..._i,
	V,
	U
], Hi = (e) => Vi.find(gi(e)), Ui = () => ({
	min: 0,
	max: 0
}), Wi = () => ({
	x: Ui(),
	y: Ui()
}), Gi = /* @__PURE__ */ new WeakMap();
//#endregion
//#region node_modules/motion-dom/dist/es/render/utils/is-animation-controls.mjs
function Ki(e) {
	return typeof e == "object" && !!e && typeof e.start == "function";
}
//#endregion
//#region node_modules/motion-dom/dist/es/render/utils/is-variant-label.mjs
function qi(e) {
	return typeof e == "string" || Array.isArray(e);
}
var Ji = [
	"initial",
	"animate",
	"whileInView",
	"whileFocus",
	"whileHover",
	"whileTap",
	"whileDrag",
	"exit"
];
//#endregion
//#region node_modules/motion-dom/dist/es/render/utils/is-controlling-variants.mjs
function Yi(e) {
	return Ki(e.animate) || Ji.some((t) => qi(e[t]));
}
function Xi(e) {
	return !!(Yi(e) || e.variants);
}
//#endregion
//#region node_modules/motion-dom/dist/es/render/utils/motion-values.mjs
function Zi(e, t, n) {
	for (let r in t) {
		let i = t[r], a = n[r];
		if ($(i)) e.addValue(r, i);
		else if ($(a)) e.addValue(r, Q(i, { owner: e }));
		else if (a !== i) {
			if (e.hasValue(r)) {
				let t = e.getValue(r);
				t.liveStyle === !0 ? t.jump(i) : t.hasAnimated || t.set(i);
			} else {
				let t = e.getStaticValue(r);
				e.addValue(r, Q(t === void 0 ? i : t, { owner: e }));
			}
		}
	}
	for (let r in n) t[r] === void 0 && e.removeValue(r);
	return t;
}
//#endregion
//#region node_modules/motion-dom/dist/es/render/utils/reduced-motion/state.mjs
var Qi = { current: null }, $i = { current: !1 }, ea = typeof window < "u";
function ta() {
	if ($i.current = !0, ea) {
		if (window.matchMedia) {
			let e = window.matchMedia("(prefers-reduced-motion)"), t = () => Qi.current = e.matches;
			e.addEventListener("change", t), t();
		} else Qi.current = !1;
	}
}
//#endregion
//#region node_modules/motion-dom/dist/es/render/VisualElement.mjs
var na = [
	"AnimationStart",
	"AnimationComplete",
	"Update",
	"BeforeLayoutMeasure",
	"LayoutMeasure",
	"LayoutAnimationStart",
	"LayoutAnimationComplete"
], ra = {}, ia = class {
	scrapeMotionValuesFromProps(e, t, n) {
		return {};
	}
	constructor({ parent: e, props: t, presenceContext: n, reducedMotionConfig: r, skipAnimations: i, blockInitialAnimation: a, visualState: o }, s = {}) {
		this.current = null, this.children = /* @__PURE__ */ new Set(), this.isVariantNode = !1, this.isControllingVariants = !1, this.shouldReduceMotion = null, this.shouldSkipAnimations = !1, this.values = /* @__PURE__ */ new Map(), this.KeyframeResolver = tr, this.features = {}, this.valueSubscriptions = /* @__PURE__ */ new Map(), this.prevMotionValues = {}, this.hasBeenMounted = !1, this.events = {}, this.propEventSubscriptions = {}, this.notifyUpdate = () => this.notify("Update", this.latestValues), this.render = () => {
			this.current && (this.triggerBuild(), this.renderInstance(this.current, this.renderState, this.props.style, this.projection));
		}, this.renderScheduledAt = 0, this.scheduleRender = () => {
			let e = P.now();
			this.renderScheduledAt < e && (this.renderScheduledAt = e, N.render(this.render, !1, !0));
		};
		let { latestValues: c, renderState: l } = o;
		this.latestValues = c, this.baseTarget = { ...c }, this.initialValues = t.initial ? { ...c } : {}, this.renderState = l, this.parent = e, this.props = t, this.presenceContext = n, this.depth = e ? e.depth + 1 : 0, this.reducedMotionConfig = r, this.skipAnimationsConfig = i, this.options = s, this.blockInitialAnimation = !!a, this.isControllingVariants = Yi(t), this.isVariantNode = Xi(t), this.isVariantNode && (this.variantChildren = /* @__PURE__ */ new Set()), this.manuallyAnimateOnMount = !!(e && e.current);
		let { willChange: u, ...d } = this.scrapeMotionValuesFromProps(t, {}, this);
		for (let e in d) {
			let t = d[e];
			c[e] !== void 0 && $(t) && t.set(c[e]);
		}
	}
	mount(e) {
		if (this.hasBeenMounted) for (let e in this.initialValues) this.values.get(e)?.jump(this.initialValues[e]), this.latestValues[e] = this.initialValues[e];
		this.current = e, Gi.set(e, this), this.projection && !this.projection.instance && this.projection.mount(e), this.parent && this.isVariantNode && !this.isControllingVariants && (this.removeFromVariantTree = this.parent.addVariantChild(this)), this.values.forEach((e, t) => this.bindToMotionValue(t, e)), this.reducedMotionConfig === "never" ? this.shouldReduceMotion = !1 : this.reducedMotionConfig === "always" ? this.shouldReduceMotion = !0 : ($i.current || ta(), this.shouldReduceMotion = Qi.current), process.env.NODE_ENV !== "production" && Se(this.shouldReduceMotion !== !0, "You have Reduced Motion enabled on your device. Animations may not appear as expected.", "reduced-motion-disabled"), this.shouldSkipAnimations = this.skipAnimationsConfig ?? !1, this.parent?.addChild(this), this.update(this.props, this.presenceContext), this.hasBeenMounted = !0;
	}
	unmount() {
		this.projection && this.projection.unmount(), Ze(this.notifyUpdate), Ze(this.render), this.valueSubscriptions.forEach((e) => e()), this.valueSubscriptions.clear(), this.removeFromVariantTree && this.removeFromVariantTree(), this.parent?.removeChild(this);
		for (let e in this.events) this.events[e].clear();
		for (let e in this.features) {
			let t = this.features[e];
			t && (t.unmount(), t.isMounted = !1);
		}
		this.current = null;
	}
	addChild(e) {
		this.children.add(e), this.enteringChildren ??= /* @__PURE__ */ new Set(), this.enteringChildren.add(e);
	}
	removeChild(e) {
		this.children.delete(e), this.enteringChildren && this.enteringChildren.delete(e);
	}
	bindToMotionValue(e, t) {
		if (this.valueSubscriptions.has(e) && this.valueSubscriptions.get(e)(), t.accelerate && wr.has(e) && this.current instanceof HTMLElement) {
			let { factory: n, keyframes: r, times: i, ease: a, duration: o } = t.accelerate, s = new mr({
				element: this.current,
				name: e,
				keyframes: r,
				times: i,
				ease: a,
				duration: /* @__PURE__ */ j(o)
			}), c = n(s);
			this.valueSubscriptions.set(e, () => {
				c(), s.cancel();
			});
			return;
		}
		let n = Y.has(e);
		n && this.onBindTransform && this.onBindTransform();
		let r = t.on("change", (t) => {
			this.latestValues[e] = t, this.props.onUpdate && N.preRender(this.notifyUpdate), n && this.projection && (this.projection.isTransformDirty = !0), this.scheduleRender();
		}), i;
		typeof window < "u" && window.MotionCheckAppearSync && (i = window.MotionCheckAppearSync(this, e, t)), this.valueSubscriptions.set(e, () => {
			r(), i && i();
		});
	}
	sortNodePosition(e) {
		return !this.current || !this.sortInstanceNodePosition || this.type !== e.type ? 0 : this.sortInstanceNodePosition(this.current, e.current);
	}
	updateFeatures() {
		let e = "animation";
		for (e in ra) {
			let t = ra[e];
			if (!t) continue;
			let { isEnabled: n, Feature: r } = t;
			if (!this.features[e] && r && n(this.props) && (this.features[e] = new r(this)), this.features[e]) {
				let t = this.features[e];
				t.isMounted ? t.update() : (t.mount(), t.isMounted = !0);
			}
		}
	}
	triggerBuild() {
		this.build(this.renderState, this.latestValues, this.props);
	}
	measureViewportBox() {
		return this.current ? this.measureInstanceViewportBox(this.current, this.props) : Wi();
	}
	getStaticValue(e) {
		return this.latestValues[e];
	}
	setStaticValue(e, t) {
		this.latestValues[e] = t;
	}
	update(e, t) {
		(e.transformTemplate || this.props.transformTemplate) && this.scheduleRender(), this.prevProps = this.props, this.props = e, this.prevPresenceContext = this.presenceContext, this.presenceContext = t;
		for (let t = 0; t < na.length; t++) {
			let n = na[t];
			this.propEventSubscriptions[n] && (this.propEventSubscriptions[n](), delete this.propEventSubscriptions[n]);
			let r = e["on" + n];
			r && (this.propEventSubscriptions[n] = this.on(n, r));
		}
		this.prevMotionValues = Zi(this, this.scrapeMotionValuesFromProps(e, this.prevProps || {}, this), this.prevMotionValues), this.handleChildMotionValue && this.handleChildMotionValue();
	}
	getProps() {
		return this.props;
	}
	getVariant(e) {
		return this.props.variants ? this.props.variants[e] : void 0;
	}
	getDefaultTransition() {
		return this.props.transition;
	}
	getTransformPagePoint() {
		return this.props.transformPagePoint;
	}
	getClosestVariantNode() {
		return this.isVariantNode ? this : this.parent ? this.parent.getClosestVariantNode() : void 0;
	}
	addVariantChild(e) {
		let t = this.getClosestVariantNode();
		if (t) return t.variantChildren && t.variantChildren.add(e), () => t.variantChildren.delete(e);
	}
	addValue(e, t) {
		let n = this.values.get(e);
		t !== n && (n && this.removeValue(e), this.bindToMotionValue(e, t), this.values.set(e, t), this.latestValues[e] = t.get());
	}
	removeValue(e) {
		this.values.delete(e);
		let t = this.valueSubscriptions.get(e);
		t && (t(), this.valueSubscriptions.delete(e)), delete this.latestValues[e], this.removeValueFromRenderState(e, this.renderState);
	}
	hasValue(e) {
		return this.values.has(e);
	}
	getValue(e, t) {
		if (this.props.values && this.props.values[e]) return this.props.values[e];
		let n = this.values.get(e);
		return n === void 0 && t !== void 0 && (n = Q(t === null ? void 0 : t, { owner: this }), this.addValue(e, n)), n;
	}
	readValue(e, t) {
		let n = this.latestValues[e] !== void 0 || !this.current ? this.latestValues[e] : this.getBaseTargetFromProps(this.props, e) ?? this.readValueFromInstance(this.current, e, this.options);
		return n != null && (typeof n == "string" && (pe(n) || he(n)) ? n = parseFloat(n) : !Hi(n) && U.test(t) && (n = Ai(e, t)), this.setBaseTarget(e, $(n) ? n.get() : n)), $(n) ? n.get() : n;
	}
	setBaseTarget(e, t) {
		this.baseTarget[e] = t;
	}
	getBaseTarget(e) {
		let { initial: t } = this.props, n;
		if (typeof t == "string" || typeof t == "object") {
			let r = ei(this.props, t, this.presenceContext?.custom);
			r && (n = r[e]);
		}
		if (t && n !== void 0) return n;
		let r = this.getBaseTargetFromProps(this.props, e);
		return r !== void 0 && !$(r) ? r : this.initialValues[e] !== void 0 && n === void 0 ? void 0 : this.baseTarget[e];
	}
	on(e, t) {
		return this.events[e] || (this.events[e] = new ye()), this.events[e].add(t);
	}
	notify(e, ...t) {
		this.events[e] && this.events[e].notify(...t);
	}
	scheduleRenderMicrotask() {
		Li.render(this.render);
	}
}, aa = class extends ia {
	constructor() {
		super(...arguments), this.KeyframeResolver = Ni;
	}
	sortInstanceNodePosition(e, t) {
		return e.compareDocumentPosition(t) & 2 ? 1 : -1;
	}
	getBaseTargetFromProps(e, t) {
		let n = e.style;
		return n ? n[t] : void 0;
	}
	removeValueFromRenderState(e, { vars: t, style: n }) {
		delete t[e], delete n[e];
	}
	handleChildMotionValue() {
		this.childSubscription && (this.childSubscription(), delete this.childSubscription);
		let { children: e } = this.props;
		$(e) && (this.childSubscription = e.on("change", (e) => {
			this.current && (this.current.textContent = `${e}`);
		}));
	}
};
//#endregion
//#region node_modules/motion-dom/dist/es/projection/geometry/conversion.mjs
function oa({ top: e, left: t, right: n, bottom: r }) {
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
function sa(e, t) {
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
function ca(e, t) {
	return oa(sa(e.getBoundingClientRect(), t));
}
//#endregion
//#region node_modules/motion-dom/dist/es/render/html/utils/build-transform.mjs
var la = {
	x: "translateX",
	y: "translateY",
	z: "translateZ",
	transformPerspective: "perspective"
}, ua = J.length;
function da(e, t, n) {
	let r = "", i = !0;
	for (let a = 0; a < ua; a++) {
		let o = J[a], s = e[o];
		if (s === void 0) continue;
		let c = !0;
		if (typeof s == "number") c = s === +!!o.startsWith("scale");
		else {
			let e = parseFloat(s);
			c = o.startsWith("scale") ? e === 1 : e === 0;
		}
		if (!c || n) {
			let e = Ii(s, Ei[o]);
			if (!c) {
				i = !1;
				let t = la[o] || o;
				r += `${t}(${e}) `;
			}
			n && (t[o] = e);
		}
	}
	let a = e.pathRotation;
	return a && (i = !1, r += `rotate(${Ii(a, Ei.pathRotation)}) `), r = r.trim(), n ? r = n(t, i ? "" : r) : i && (r = "none"), r;
}
//#endregion
//#region node_modules/motion-dom/dist/es/render/html/utils/build-styles.mjs
function fa(e, t, n) {
	let { style: r, vars: i, transformOrigin: a } = e, o = !1, s = !1;
	for (let e in t) {
		let n = t[e];
		if (Y.has(e)) {
			o = !0;
			continue;
		}
		if (rt(e)) {
			i[e] = n;
			continue;
		}
		{
			let t = Ii(n, Ei[e]);
			e.startsWith("origin") ? (s = !0, a[e] = t) : r[e] = t;
		}
	}
	if (t.transform || (o || n ? r.transform = da(t, e.transform, n) : r.transform &&= "none"), s) {
		let { originX: e = "50%", originY: t = "50%", originZ: n = 0 } = a;
		r.transformOrigin = `${e} ${t} ${n}`;
	}
}
//#endregion
//#region node_modules/motion-dom/dist/es/render/html/utils/render.mjs
function pa(e, { style: t, vars: n }, r, i) {
	let a = e.style, o;
	for (o in t) a[o] = t[o];
	for (o in i?.applyProjectionStyles(a, r), n) a.setProperty(o, n[o]);
}
//#endregion
//#region node_modules/motion-dom/dist/es/projection/styles/scale-border-radius.mjs
function ma(e, t) {
	return t.max === t.min ? 0 : e / (t.max - t.min) * 100;
}
var ha = { correct: (e, t) => {
	if (!t.target) return e;
	if (typeof e == "string") {
		if (z.test(e)) e = parseFloat(e);
		else return e;
	}
	return `${ma(e, t.target.x)}% ${ma(e, t.target.y)}%`;
} }, ga = { correct: (e, { treeScale: t, projectionDelta: n }) => {
	let r = e, i = U.parse(e);
	if (i.length > 5) return r;
	let a = U.createTransformer(e), o = typeof i[0] == "number" ? 0 : 1, s = n.x.scale * t.x, c = n.y.scale * t.y;
	i[0 + o] /= s, i[1 + o] /= c;
	let l = W(s, c, .5);
	return typeof i[2 + o] == "number" && (i[2 + o] /= l), typeof i[3 + o] == "number" && (i[3 + o] /= l), a(i);
} }, _a = {
	borderRadius: {
		...ha,
		applyTo: [...Pi]
	},
	borderTopLeftRadius: ha,
	borderTopRightRadius: ha,
	borderBottomLeftRadius: ha,
	borderBottomRightRadius: ha,
	boxShadow: ga
};
//#endregion
//#region node_modules/motion-dom/dist/es/render/utils/is-forced-motion-value.mjs
function va(e, { layout: t, layoutId: n }) {
	return Y.has(e) || e.startsWith("origin") || (t || n !== void 0) && (!!_a[e] || e === "opacity");
}
//#endregion
//#region node_modules/motion-dom/dist/es/render/html/utils/scrape-motion-values.mjs
function ya(e, t, n) {
	let r = e.style, i = t?.style, a = {};
	if (!r) return a;
	for (let t in r) ($(r[t]) || i && $(i[t]) || va(t, e) || n?.getValue(t)?.liveStyle !== void 0) && (a[t] = r[t]);
	return a;
}
//#endregion
//#region node_modules/motion-dom/dist/es/render/html/HTMLVisualElement.mjs
function ba(e) {
	return window.getComputedStyle(e);
}
var xa = class extends aa {
	constructor() {
		super(...arguments), this.type = "html", this.renderInstance = pa;
	}
	mount(e) {
		O(!!e.style, "motion.create() components must forward their ref to a HTML or SVG element", "custom-component-ref"), super.mount(e);
	}
	readValueFromInstance(e, t) {
		if (Y.has(t)) return this.projection?.isProjecting ? Vn(t) : Un(e, t);
		{
			let n = ba(e), r = (rt(t) ? n.getPropertyValue(t) : n[t]) || 0;
			return typeof r == "string" ? r.trim() : r;
		}
	}
	measureInstanceViewportBox(e, { transformPagePoint: t }) {
		return ca(e, t);
	}
	build(e, t, n) {
		fa(e, t, n.transformTemplate);
	}
	scrapeMotionValuesFromProps(e, t, n) {
		return ya(e, t, n);
	}
};
//#endregion
//#region node_modules/motion-dom/dist/es/render/object/ObjectVisualElement.mjs
function Sa(e, t) {
	return e in t;
}
var Ca = class extends ia {
	constructor() {
		super(...arguments), this.type = "object";
	}
	readValueFromInstance(e, t) {
		if (Sa(t, e)) {
			let n = e[t];
			if (typeof n == "string" || typeof n == "number") return n;
		}
	}
	getBaseTargetFromProps() {}
	removeValueFromRenderState(e, t) {
		delete t.output[e];
	}
	measureInstanceViewportBox() {
		return Wi();
	}
	build(e, t) {
		Object.assign(e.output, t);
	}
	renderInstance(e, { output: t }) {
		Object.assign(e, t);
	}
	sortInstanceNodePosition() {
		return 0;
	}
}, wa = {
	offset: "stroke-dashoffset",
	array: "stroke-dasharray"
}, Ta = {
	offset: "strokeDashoffset",
	array: "strokeDasharray"
};
function Ea(e, t, n = 1, r = 0, i = !0) {
	e.pathLength = 1;
	let a = i ? wa : Ta;
	e[a.offset] = `${-r}`, e[a.array] = `${t} ${n}`;
}
//#endregion
//#region node_modules/motion-dom/dist/es/render/svg/utils/build-attrs.mjs
var Da = [
	"transform",
	"opacity",
	"offsetDistance",
	"offsetPath",
	"offsetRotate",
	"offsetAnchor"
];
function Oa(e, { attrX: t, attrY: n, attrScale: r, pathLength: i, pathSpacing: a = 1, pathOffset: o = 0, ...s }, c, l, u) {
	if (fa(e, s, l), c) {
		e.style.viewBox && (e.attrs.viewBox = e.style.viewBox);
		return;
	}
	e.attrs = e.style, e.style = {};
	let { attrs: d, style: f } = e;
	for (let e of Da) d[e] !== void 0 && (f[e] = d[e], delete d[e]);
	(f.transform || d.transformOrigin) && (f.transformOrigin = d.transformOrigin ?? "50% 50%", delete d.transformOrigin), f.transform && (f.transformBox = u?.transformBox ?? "fill-box", delete d.transformBox), t !== void 0 && (d.x = t), n !== void 0 && (d.y = n), r !== void 0 && (d.scale = r), i !== void 0 && Ea(d, i, a, o, !1);
}
//#endregion
//#region node_modules/motion-dom/dist/es/render/svg/utils/camel-case-attrs.mjs
var ka = /* @__PURE__ */ new Set([
	"baseFrequency",
	"diffuseConstant",
	"kernelMatrix",
	"kernelUnitLength",
	"keySplines",
	"keyTimes",
	"limitingConeAngle",
	"markerHeight",
	"markerWidth",
	"numOctaves",
	"targetX",
	"targetY",
	"surfaceScale",
	"specularConstant",
	"specularExponent",
	"stdDeviation",
	"tableValues",
	"viewBox",
	"gradientTransform",
	"pathLength",
	"startOffset",
	"textLength",
	"lengthAdjust"
]), Aa = (e) => typeof e == "string" && e.toLowerCase() === "svg";
//#endregion
//#region node_modules/motion-dom/dist/es/render/svg/utils/render.mjs
function ja(e, t, n, r) {
	pa(e, t, void 0, r);
	for (let n in t.attrs) e.setAttribute(ka.has(n) ? n : li(n), t.attrs[n]);
}
//#endregion
//#region node_modules/motion-dom/dist/es/render/svg/utils/scrape-motion-values.mjs
function Ma(e, t, n) {
	let r = ya(e, t, n);
	for (let n in e) if ($(e[n]) || $(t[n])) {
		let t = J.indexOf(n) === -1 ? n : "attr" + n.charAt(0).toUpperCase() + n.substring(1);
		r[t] = e[n];
	}
	return r;
}
//#endregion
//#region node_modules/motion-dom/dist/es/render/svg/SVGVisualElement.mjs
var Na = class extends aa {
	constructor() {
		super(...arguments), this.type = "svg", this.isSVGTag = !1, this.measureInstanceViewportBox = Wi;
	}
	getBaseTargetFromProps(e, t) {
		return e[t];
	}
	readValueFromInstance(e, t) {
		if (Y.has(t)) {
			let e = Oi(t);
			return e && e.default || 0;
		}
		if (Da.includes(t)) {
			let n = getComputedStyle(e)[t];
			if (typeof n == "string" && n) return n.trim();
		}
		return t = ka.has(t) ? t : li(t), e.getAttribute(t);
	}
	scrapeMotionValuesFromProps(e, t, n) {
		return Ma(e, t, n);
	}
	build(e, t, n) {
		Oa(e, t, this.isSVGTag, n.transformTemplate, n.style);
	}
	renderInstance(e, t, n, r) {
		ja(e, t, n, r);
	}
	mount(e) {
		this.isSVGTag = Aa(e.tagName), super.mount(e);
	}
};
//#endregion
//#region node_modules/motion-dom/dist/es/animation/animate/single-value.mjs
function Pa(e, t, n) {
	let r = $(e) ? e : Q(e);
	return r.start(Jr("", r, t, n)), r.animation;
}
//#endregion
//#region node_modules/framer-motion/dist/es/animation/utils/is-dom-keyframes.mjs
function Fa(e) {
	return typeof e == "object" && !Array.isArray(e);
}
//#endregion
//#region node_modules/framer-motion/dist/es/animation/animate/resolve-subjects.mjs
function Ia(e, t, n, r) {
	return e == null ? [] : typeof e == "string" && Fa(t) ? Fi(e, n, r) : e instanceof NodeList ? Array.from(e) : Array.isArray(e) ? e.filter((e) => e != null) : [e];
}
//#endregion
//#region node_modules/framer-motion/dist/es/animation/sequence/utils/calc-repeat-duration.mjs
function La(e, t, n) {
	return e * (t + 1) + n * t;
}
//#endregion
//#region node_modules/framer-motion/dist/es/animation/sequence/utils/calc-time.mjs
function Ra(e, t, n, r) {
	return typeof t == "number" ? t : t.startsWith("-") || t.startsWith("+") ? Math.max(0, e + parseFloat(t)) : t === "<" ? n : t.startsWith("<") ? Math.max(0, n + parseFloat(t.slice(1))) : r.get(t) ?? e;
}
//#endregion
//#region node_modules/framer-motion/dist/es/animation/sequence/utils/edit.mjs
function za(e, t, n) {
	for (let r = 0; r < e.length; r++) {
		let i = e[r];
		i.at > t && i.at < n && (de(e, i), r--);
	}
}
function Ba(e, t, n, r, i, a) {
	za(e, i, a);
	for (let o = 0; o < t.length; o++) e.push({
		value: t[o],
		at: W(i, a, r[o]),
		easing: /* @__PURE__ */ He(n, o)
	});
}
//#endregion
//#region node_modules/framer-motion/dist/es/animation/sequence/utils/normalize-times.mjs
function Va(e, t, n = 0) {
	let r = t + 1 + t * n;
	for (let t = 0; t < e.length; t++) e[t] = e[t] / r;
}
//#endregion
//#region node_modules/framer-motion/dist/es/animation/sequence/utils/sort.mjs
function Ha(e, t) {
	return e.at === t.at ? e.value === null ? 1 : t.value === null ? -1 : 0 : e.at - t.at;
}
//#endregion
//#region node_modules/framer-motion/dist/es/animation/sequence/create.mjs
var Ua = "easeInOut", Wa = 20;
function Ga(e, { defaultTransition: t = {}, ...n } = {}, r, i) {
	let a = t.duration || .3, o = /* @__PURE__ */ new Map(), s = /* @__PURE__ */ new Map(), c = {}, l = /* @__PURE__ */ new Map(), u = 0, d = 0, f = 0;
	for (let n = 0; n < e.length; n++) {
		let o = e[n];
		if (typeof o == "string") {
			l.set(o, d);
			continue;
		}
		if (!Array.isArray(o)) {
			l.set(o.name, Ra(d, o.at, u, l));
			continue;
		}
		let [p, m, h = {}] = o;
		h.at !== void 0 && (d = Ra(d, h.at, u, l));
		let g = 0, _ = (e, n, r, o = 0, s = 0) => {
			let c = Ja(e), { delay: l = 0, times: u = Cn(c), type: p = t.type || "keyframes", repeat: m, repeatType: h, repeatDelay: _ = 0, ...v } = n, { ease: y = t.ease || "easeOut", duration: b } = n, x = typeof l == "function" ? l(o, s) : l, S = c.length, C = fr(p) ? p : i?.[p || "keyframes"];
			if (S <= 2 && C) {
				let e = 100;
				if (S === 2 && Za(c)) {
					let t = c[1] - c[0];
					e = Math.abs(t);
				}
				let n = {
					...t,
					...v
				};
				b !== void 0 && (n.duration = /* @__PURE__ */ j(b));
				let r = on(n, e, C);
				y = r.ease, b = r.duration;
			}
			b ??= a;
			let w = d + x;
			u.length === 1 && u[0] === 0 && (u[1] = 1);
			let T = u.length - c.length;
			if (T > 0 && Sn(u, T), c.length === 1 && c.unshift(null), m && D(m < Wa, `Sequence segments can't repeat ${m} times — ignoring repeat option. Use a value below ${Wa} or apply repeat at the sequence level instead.`), m && m < Wa) {
				let e = b > 0 ? _ / b : 0;
				b = La(b, m, _);
				let t = [...c], n = [...u];
				y = Array.isArray(y) ? [...y] : [y];
				let r = [...y], i = h === "reverse" || h === "mirror", a = t, o = r;
				i && (a = [...t].reverse(), h === "reverse" && (o = [...r].reverse().map((e) => typeof e == "function" ? /* @__PURE__ */ Ae(e) : e)));
				for (let s = 0; s < m; s++) {
					let l = i && s % 2 == 0, d = l ? a : t, f = l ? o : r, p = (s + 1) * (1 + e);
					e > 0 && (c.push(c[c.length - 1]), u.push(p), y.push("linear")), c.push(...d);
					for (let e = 0; e < d.length; e++) u.push(n[e] + p), y.push(e === 0 ? "linear" : /* @__PURE__ */ He(f, e - 1));
				}
				Va(u, m, e);
			}
			let ee = w + b;
			Ba(r, c, y, u, w, ee), g = Math.max(x + b, g), f = Math.max(ee, f);
		};
		if ($(p)) {
			let e = Ka(p, s);
			_(m, h, qa("default", e));
		} else {
			let e = Ia(p, m, r, c), t = e.length;
			for (let n = 0; n < t; n++) {
				m = m, h = h;
				let r = e[n], i = Ka(r, s);
				for (let e in m) _(m[e], Ya(h, e), qa(e, i), n, t);
			}
		}
		u = d, d += g;
	}
	return s.forEach((e, r) => {
		for (let i in e) {
			let a = e[i];
			a.sort(Ha);
			let s = [], c = [], l = [];
			for (let e = 0; e < a.length; e++) {
				let { at: t, value: n, easing: r } = a[e];
				s.push(n), c.push(/* @__PURE__ */ ve(0, f, t)), l.push(r || "easeOut");
			}
			c[0] !== 0 && (c.unshift(0), s.unshift(s[0]), l.unshift(Ua)), c[c.length - 1] !== 1 && (c.push(1), s.push(null)), o.has(r) || o.set(r, {
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
function Ka(e, t) {
	return !t.has(e) && t.set(e, {}), t.get(e);
}
function qa(e, t) {
	return t[e] || (t[e] = []), t[e];
}
function Ja(e) {
	return Array.isArray(e) ? e : [e];
}
function Ya(e, t) {
	return e && e[t] ? {
		...e,
		...e[t]
	} : { ...e };
}
var Xa = (e) => typeof e == "number", Za = (e) => e.every(Xa);
//#endregion
//#region node_modules/framer-motion/dist/es/animation/utils/create-visual-element.mjs
function Qa(e) {
	let t = {
		presenceContext: null,
		props: {},
		visualState: {
			renderState: {
				transform: {},
				transformOrigin: {},
				style: {},
				vars: {},
				attrs: {}
			},
			latestValues: {}
		}
	}, n = zi(e) && !Bi(e) ? new Na(t) : new xa(t);
	n.mount(e), Gi.set(e, n);
}
function $a(e) {
	let t = new Ca({
		presenceContext: null,
		props: {},
		visualState: {
			renderState: { output: {} },
			latestValues: {}
		}
	});
	t.mount(e), Gi.set(e, t);
}
//#endregion
//#region node_modules/framer-motion/dist/es/animation/animate/subject.mjs
function eo(e, t) {
	return $(e) || typeof e == "number" || typeof e == "string" && !Fa(t);
}
function to(e, t, n, r) {
	let i = [];
	if (eo(e, t)) i.push(Pa(e, Fa(t) && t.default || t, n && (n.default || n)));
	else {
		if (e == null) return i;
		let a = Ia(e, t, r), o = a.length;
		O(!!o, "No valid elements provided.", "no-valid-elements");
		for (let e = 0; e < o; e++) {
			let r = a[e], s = r instanceof Element ? Qa : $a;
			Gi.has(r) || s(r);
			let c = Gi.get(r), l = { ...n };
			"delay" in l && typeof l.delay == "function" && (l.delay = l.delay(e, o)), i.push(...mi(c, {
				...t,
				transition: l
			}, {}));
		}
	}
	return i;
}
//#endregion
//#region node_modules/framer-motion/dist/es/animation/animate/sequence.mjs
function no(e, t, n) {
	let r = [];
	return Ga(e.map((e) => {
		if (Array.isArray(e) && typeof e[0] == "function") {
			let t = e[0], n = Q(0);
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
	}), t, n, { spring: gn }).forEach(({ keyframes: e, transition: t }, n) => {
		r.push(...to(n, e, t));
	}), r;
}
//#endregion
//#region node_modules/framer-motion/dist/es/animation/animate/index.mjs
function ro(e) {
	return Array.isArray(e) && e.some(Array.isArray);
}
function io(e = {}) {
	let { scope: t, reduceMotion: n, skipAnimations: r } = e;
	function i(e, i, a) {
		let o = [], s, c = {};
		if (n !== void 0 && (c.reduceMotion = n), r !== void 0 && (c.skipAnimations = r), ro(e)) {
			let { onComplete: n, ...r } = i || {};
			typeof n == "function" && (s = n), o = no(e, {
				...c,
				...r
			}, t);
		} else {
			let { onComplete: n, ...r } = a || {};
			typeof n == "function" && (s = n), o = to(e, i, {
				...c,
				...r
			}, t);
		}
		let l = new Pr(o);
		return s && l.finished.then(s), t && (t.animations.push(l), l.finished.then(() => {
			de(t.animations, l);
		})), l;
	}
	return i;
}
var ao = io(), oo = class {
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
		return this.#d = ao(e, this.#t, {
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
};
//#endregion
//#region src/ts/ScriptMng.ts
function so(e, t) {
	let n = e?.match(RegExp(`(?:^|;)\\s*${t}\\s*:\\s*([\\d.]+)px`, "i"));
	return n ? Number(n[1]) : void 0;
}
var co = class p {
	sys;
	#e;
	constructor(e) {
		this.sys = e, this.#m = new n(e, ""), this.#w = new ne((t, n) => e.cfg.searchPath(t, n), (t, n) => e.fetch(t, n), (t, n) => e.dec(t, n), (t) => e.decAB(t), e.crypto), this.#e = document.createElement("span"), this.#e.hidden = !0, this.#e.textContent = "", this.#e.style.cssText = `	z-index: ${2 ** 53 - 1};
			position: absolute; left: 0; top: 0;
			color: black;
			background-color: rgba(255, 255, 255, 0.7);`, document.body.appendChild(this.#e), this.#t.trace = (e) => this.#ct(e), this.#t.log = (e) => this.#ut(e, this.#r?.fn ?? "", this.#r?.lineNum ?? NaN);
	}
	destroy() {
		this.cancelAuto(), clearTimeout(this.#z), clearTimeout(this.#K), clearTimeout(this.#Q?.timer);
		for (let { tw: e } of Object.values(this.#te)) e.kill();
		for (let { tw: e } of Object.values(this.#Oe)) e.kill();
		this.#D.stopAll(), this.#e.remove(), this.#T.destroy();
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
			let e = this.#r = new m(t);
			this.#s(e), e.defSetTrigger("sys:sn.sound.global_volume", (e) => {
				this.#D.setGlobalVol(Number(e)), this.#k();
			}), e.defSetTriggerSoundVol((t, n) => {
				let r = Number(e.getVal(`save:const.sn.sound.${t}.volume`) ?? 1);
				this.#D.setVol(t, r * Number(n));
			}), e.defSetTrigger("sys:sn.sound.movie_volume", () => this.#k()), e.defSetTrigger("save:sn.userFnTail", (e) => {
				let t = String(e);
				if (t.includes("@")) throw "この変数では文字「@」は禁止です";
				this.sys.cfg.userFnTail = t;
			}), await this.#g(e), ae(this.sys.cfg);
		}
		this.go = () => this.#M(), this.$trgNext();
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
			"const.sn.needClick2Play": () => this.#D.needClick2Play(),
			"const.sn.sound.codecs": () => this.#D.codecs(),
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
				let n = e.left ?? 0, r = e.top ?? 0, a = i(e) ? (() => {
					let t = u(e.src);
					return {
						w: t?.w ?? 0,
						h: t?.h ?? 0
					};
				})() : o(e) ? {
					w: so(e.style, "width") ?? t.stageW,
					h: so(e.style, "height") ?? t.stageH
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
					width: e.width ?? a.w,
					height: e.height ?? a.h
				};
			}, a = {};
			for (let t of e) a[t.nm] = {
				fore: r(t),
				back: r(n.find((e) => e.nm === t.nm))
			};
			return JSON.stringify(a);
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
		this.#P || (this.#P = !0, this.#p(e).catch(this.#i));
	}
	async #p(e) {
		let t = this.#r;
		if (!t) {
			this.#P = !1;
			return;
		}
		try {
			let n = this.#c.move(e);
			if (!n) {
				this.#f(), this.#P = !1;
				return;
			}
			this.#d = !0, this.#f(), t.restoreMarkPart(n.mark), t.clearOnResume = n.clearOnResume, this.#le(null, "both"), this.#_e(() => !0), this.$fncs.replace(n.mark.sPages), this.#T.setPageState(this.$fncs.getForeIdx(), !1), this.#T.playback(n.mark.hPlgLay, []), this.#N = !1, this.#l = void 0, t.switchScript(await this.#b(n.fn), "", n.idx);
		} catch (e) {
			this.#d = !1, this.#P = !1, this.myTrace(`[page] ${String(e)}`, "ET");
			return;
		}
		this.#P = !1, this.#M();
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
		this.#h || (e.setSys(this.#m.data.sys), e.setKidoku(this.#m.data.kidoku), this.#D.setGlobalVol(Number(e.getVal("sys:sn.sound.global_volume") ?? 1)), this.#k()), e.setValNochk("sys:const.sn.cfg.ns", this.sys.cfg.oCfg.save_ns), this.#_();
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
			hPlgLay: this.#T.record(),
			json: e
		};
	}
	#y;
	async #b(e) {
		return this.#n[e] ??= new x(e, await this.#st(e), this.#S());
	}
	#x;
	#S() {
		if (this.#x) return this.#x;
		let e = this.#x = new g(this.sys.cfg);
		return e.setEscape(this.sys.cfg.oCfg.init.escape), b(this.sys.cfg.oCfg.init.escape), e;
	}
	go() {}
	resumePlg() {
		this.#P = !1, this.#M();
	}
	navigateTo(e) {
		globalThis.open(e, "_blank");
	}
	jumpToLabelAndGo(e, t, n = "", r) {
		this.#r?.setValNochk("tmp:sn.eventArg", r ?? ""), this.#r?.setValNochk("tmp:sn.eventLabel", e), this.#j(e, t, n).catch(this.#i);
	}
	#C = !1;
	hoverCall(e, t = "") {
		let n = this.#r;
		!n || !e || this.#C || this.#Be || this.#P || this.#V || this.#Q || this.#J || this.#Te || this.#je || this.#Fe || (this.#C = !0, n.setValNochk("tmp:sn.eventArg", ""), n.setValNochk("tmp:sn.eventLabel", e), this.#j(e, !0, t).catch(this.#i).finally(() => {
			this.#C = !1;
		}));
	}
	#w;
	attachFrameBox(e) {
		this.#w.attachBox(e);
	}
	#T = new re();
	attachPlgBox(e, t, n) {
		this.#T.attachBox(e, t, n);
	}
	getVal(e, t) {
		return this.#r?.getVal(e) ?? t;
	}
	#E(e) {
		let t = this.$fncs.getForeIdx();
		return e === "fore" ? t : 1 - t;
	}
	#D = new le((e, t) => this.myTrace(e, t), (e, t) => this.sys.fetch(e, t), (e) => this.sys.decAB(e));
	unlockAudio() {
		this.#D.unlock();
	}
	needClick2Play() {
		return this.#D.needClick2Play();
	}
	playButtonSe(e, t) {
		if (!e) return;
		let n = this.#tt("button", e);
		if (!n) return;
		let r = Number(this.#r?.getVal(`sys:const.sn.sound.${t}.volume`) ?? 1);
		this.#D.play(t, n, {
			loop: !1,
			volume: r,
			speed: 1,
			pan: 0,
			start_ms: 0,
			end_ms: oe,
			ret_ms: 0
		}).catch(this.#i);
	}
	#O;
	attachStageBox(e) {
		this.#O = e;
	}
	getMovieVolume() {
		let e = Number(this.#r?.getVal("sys:sn.sound.movie_volume") ?? 1) * Number(this.#r?.getVal("sys:sn.sound.global_volume") ?? 1);
		return e < 0 ? 0 : e > 1 ? 1 : e;
	}
	#k() {
		let e = this.#O;
		if (!e) return;
		let t = this.getMovieVolume();
		for (let n of e.querySelectorAll("video")) n.volume = t;
	}
	#A = /* @__PURE__ */ new Set();
	fireFullScrKey(e) {
		return this.#A.has(e) ? (this.$fncs.toggleFullScr(), !0) : !1;
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
	async #j(e, t, n) {
		let r = this.#r;
		if (r) {
			this.#N = !1;
			try {
				if (n && (n !== r.fn || !e)) {
					let i = await this.#b(n);
					t ? r.callToScript(i, e) : r.switchScript(i, e);
				} else t ? r.callToLabel(e) : r.jumpToLabel(e);
			} catch (e) {
				this.myTrace(`[button]/[event] ジャンプ先エラー fn:${n || r.fn} ${String(e)}`, "ET");
				return;
			}
			this.#M(!0);
		}
	}
	#M(e = !1) {
		if (!this.#N && !(this.#C && !e)) {
			if (this.#V) {
				this.#V.canskip && (this.#W(), this.$fncs.requestSkip());
				return;
			}
			if (this.#Q) {
				this.#Q.canskip && this.#ee();
				return;
			}
			if (this.#ne && !e) {
				this.#ne.canskip && this.#ce(this.#ne.tw_nm);
				return;
			}
			if (this.#pe && !e) {
				this.#pe.canskip && this.#be();
				return;
			}
			if (this.#J) {
				this.#J.canskip && this.#X();
				return;
			}
			if (this.#Te) {
				this.#Te.canskip && this.#De();
				return;
			}
			if (this.#je) {
				this.#je.canskip && this.#Ne();
				return;
			}
			if (this.#Fe) {
				this.#Fe.canskip && this.#Re();
				return;
			}
			this.#P || this.#He().catch(this.#i);
		}
	}
	#N = !1;
	#P = !1;
	#F;
	#I;
	#L(e, t) {
		if (clearTimeout(this.#F), this.#I = void 0, this.$fncs.setSkipping(e === "skip"), this.$fncs.isTyping()) {
			this.#I = {
				mode: e,
				msec: t
			};
			return;
		}
		this.#R(e, t);
	}
	#R(e, t) {
		this.#F = setTimeout(() => {
			this.#F = void 0, e === "skip" && this.$fncs.requestSkip(), this.#M();
		}, t);
	}
	onTypingDone() {
		if (!this.#I) return;
		let { mode: e, msec: t } = this.#I;
		this.#I = void 0, this.#R(e, t);
	}
	get isAutoPending() {
		return this.#I !== void 0 || this.#F !== void 0;
	}
	cancelAuto() {
		clearTimeout(this.#F), this.#F = void 0, this.#I = void 0, this.$fncs?.setSkipping(!1), this.#r?.cancelAutoSkip();
	}
	#z;
	#B = !1;
	#V;
	#H = null;
	#U(e, t) {
		clearTimeout(this.#z), this.#B = e > 0, this.#H = t, this.#z = this.#B ? setTimeout(() => this.#W(), e) : void 0, this.#B ? this.#T.setPageState(this.$fncs.getForeIdx(), !0) : this.#r?.transDone(t);
	}
	#W() {
		clearTimeout(this.#z), this.#z = void 0;
		let e = this.#B;
		this.#B = !1;
		let t = this.$fncs.getForeIdx();
		this.$fncs.finishTrans(), e && (this.#r?.transDone(this.#H), this.#T.finishTrans(this.#H, t, [])), this.#V && (this.#V = void 0, this.#M());
	}
	#G(e) {
		if (this.#B) {
			this.#V = { canskip: e };
			return;
		}
		setTimeout(() => this.#M(), 0);
	}
	#K;
	#q = !1;
	#J;
	#Y(e) {
		clearTimeout(this.#K), this.#q = !0, this.#K = setTimeout(() => this.#X(), e.msec), this.$fncs.startQuake({
			hmax: e.hmax,
			vmax: e.vmax
		});
	}
	#X() {
		clearTimeout(this.#K), this.#K = void 0, this.#q = !1, this.$fncs.finishQuake(), this.#J && (this.#J = void 0, this.#M());
	}
	#Z(e) {
		if (this.#q) {
			this.#J = { canskip: e };
			return;
		}
		setTimeout(() => this.#M(), 0);
	}
	#Q;
	#$(e, t) {
		this.#Q = {
			canskip: t,
			timer: setTimeout(() => this.#ee(), Math.max(0, e))
		};
	}
	#ee() {
		this.#Q && (clearTimeout(this.#Q.timer), this.#Q = void 0, this.#M());
	}
	#te = Object.create(null);
	#ne;
	#re(e) {
		let t = this.$fncs.getLaySty(e.nm, e.page), { from: n, aTo: r, aPrp: i } = p.#ae(e, (e) => {
			let n = t[e] ?? h[e];
			if (n === void 0) throw `[tsy] ${e} は [lay ${e}=…] で寸法を明示したレイヤにしか使えません`;
			return n;
		}), a = [e.hTo, ...e.aPath ?? []], o = (e) => a.every((t) => !t[e] || t[e].rel), s = (e) => (i.includes("left") && o("left") && t.align_x !== void 0 && (e.align_x = t.align_x), i.includes("top") && o("top") && t.align_y !== void 0 && (e.align_y = t.align_y), e);
		this.#oe(e, n, r, () => {
			let t = {};
			for (let e of i) Object.assign(t, { [e]: n[e] });
			this.$fncs.chgLay({
				nm: e.nm,
				page: e.page,
				sty: s(t)
			});
		}, e.backlay ? () => {
			let t = {};
			for (let e of i) Object.assign(t, { [e]: n[e] });
			this.$fncs.chgLay({
				nm: e.nm,
				page: e.page === "fore" ? "back" : "fore",
				sty: s(t)
			});
		} : void 0);
	}
	#ie(e) {
		let t = this.#w.getSty(e.id), { from: n, aTo: r, aPrp: i } = p.#ae(e, (e) => t[e] ?? 0);
		this.#oe(e, n, r, () => {
			let t = {};
			for (let e of i) Object.assign(t, { [e]: n[e] });
			this.#Ze(this.#w.frame(e.id, t));
		});
	}
	static #ae(e, t) {
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
	#oe(e, t, n, r, i) {
		let a = e.t === "tsy" ? {
			nm: e.nm,
			page: e.page
		} : {};
		this.#te[e.tw_nm]?.tw.kill(), delete this.#te[e.tw_nm];
		let o = {};
		for (let e of n) Object.assign(o, e);
		let s = () => {
			Object.assign(t, o), r(), i?.();
		};
		if (e.msec <= 0 && e.delay <= 0) {
			s(), this.#se(e.tw_nm);
			return;
		}
		let c = y(e.ease), l = n.map((n) => {
			let i = new oo(t).to(n, e.msec).delay(e.delay).easing(c).repeat(e.repeat).yoyo(e.yoyo).onUpdate(r);
			return i.onStart(() => {
				this.#te[e.tw_nm] = {
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
			s(), this.#se(e.tw_nm);
		}), this.#te[e.tw_nm] = {
			end: s,
			tw: u,
			...a
		}, !e.chain) {
			u.start();
			return;
		}
		let d = this.#te[e.chain];
		if (!d) throw `${e.chain}は存在しない・または終了したトゥイーンです`;
		d.next = () => u.start();
	}
	#se(e) {
		let { next: t } = this.#te[e] ?? {};
		delete this.#te[e], t?.(), this.#ne?.tw_nm === e && (this.#ne = void 0, setTimeout(() => this.#M(), 0));
	}
	#ce(e) {
		let t = this.#te[e];
		t && (t.tw.kill(), t.end()), this.#se(e);
	}
	#le(e, t) {
		for (let [n, r] of Object.entries(this.#te)) r.nm !== void 0 && (e && !e.includes(r.nm) || (t === "both" || r.page === t) && (r.tw.kill(), delete this.#te[n]));
	}
	#ue(e, t) {
		if (!this.#te[e]) {
			setTimeout(() => this.#M(), 0);
			return;
		}
		this.#ne = {
			tw_nm: e,
			canskip: t
		};
	}
	#de = [];
	#fe = 0;
	#pe;
	#me(e) {
		if (e.fx.time <= 0) return;
		let t = ++this.#fe, n = setTimeout(() => this.#ge(t), e.fx.time);
		this.#de.push({
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
		for (let r of this.#de) if (e(r)) {
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
		let t = this.#de.findIndex((t) => t.id === e);
		t >= 0 && (clearTimeout(this.#de[t].timer), this.#de.splice(t, 1)), this.#pe && (this.#pe.ids.delete(e), !(this.#pe.ids.size > 0) && (this.#pe = void 0, setTimeout(() => this.#M(), 0)));
	}
	#_e(e) {
		for (let t = this.#de.length; --t >= 0;) {
			let n = this.#de[t];
			e(n) && (clearTimeout(n.timer), this.#de.splice(t, 1));
		}
	}
	#ve(e, t, n) {
		let r = this.#de.filter((n) => p.#ye(n, e, t));
		if (r.length === 0) {
			setTimeout(() => this.#M(), 0);
			return;
		}
		this.#pe = {
			ids: new Set(r.map((e) => e.id)),
			canskip: n
		};
	}
	static #ye(e, t, n) {
		return !(n && (!e.name || !n.includes(e.name)) || t && e.aLayNm && !e.aLayNm.some((e) => t.includes(e)));
	}
	#be() {
		if (this.#pe) {
			for (let e of this.#pe.ids) {
				let t = this.#de.findIndex((t) => t.id === e);
				t >= 0 && (clearTimeout(this.#de[t].timer), this.#de.splice(t, 1));
			}
			this.#pe = void 0, this.#M();
		}
	}
	async #xe(e) {
		let t = e.buf === "BGM" ? "playbgm" : "playse", n = this.#tt(t, e.fn);
		n && (this.#r?.setValNochk(`tmp:const.sn.sound.${e.buf}.playing`, !0), await this.#D.play(e.buf, n, e, (e) => {
			this.#r?.setValNochk(`tmp:const.sn.sound.${e}.playing`, !1), e === "VOICE" && this.#Se();
		}));
	}
	#Se() {
		let e = this.#r;
		if (!e) return;
		e.resetVolMulTalking();
		let t = "const.sn.sound.BGM.", n = Number(e.getVal(`save:${t}volume`) ?? 1), r = Number(e.getVal(`sys:${t}volume`) ?? 1);
		this.#D.setVol("BGM", n * r);
	}
	#Ce(e) {
		let t;
		try {
			t = JSON.parse(String(e.getVal("save:const.sn.loopPlaying") ?? "{}"));
		} catch {
			t = {};
		}
		for (let e of this.#D.bufs()) e in t || this.#D.stop(e);
		for (let [n, r] of Object.entries(t)) {
			if (!r) continue;
			let t = `const.sn.sound.${n}.`, i = Number(e.getVal(`save:${t}volume`) ?? 1), a = Number(e.getVal(`sys:${t}volume`) ?? 1);
			this.#xe({
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
	async #we(e) {
		try {
			await this.#xe(e);
		} catch (t) {
			this.#P = !1, this.myTrace(`[playse] エラー fn:${e.fn} ${String(t)}`, "E");
			return;
		}
		this.#P = !1, this.#M();
	}
	#Te;
	#Ee(e, t, n) {
		if (!this.#D.waitEnd(e, () => {
			this.#Te?.buf === e && (this.#Te = void 0, this.#M());
		})) {
			setTimeout(() => this.#M(), 0);
			return;
		}
		this.#Te = {
			buf: e,
			canskip: t,
			stop: n
		};
	}
	#De() {
		let e = this.#Te;
		e && (this.#Te = void 0, this.#D.cancelWaitEnd(e.buf), e.stop && this.#D.stop(e.buf), this.#M());
	}
	#Oe = Object.create(null);
	#ke(e) {
		this.#Oe[e.buf]?.tw.kill(), delete this.#Oe[e.buf];
		let t = () => {
			this.#D.setVol(e.buf, e.volume), e.stop && this.#D.stop(e.buf);
		}, n = this.#D.gainNode(e.buf);
		if (!n || e.msec <= 0 && e.delay <= 0) {
			t(), this.#Ae(e.buf);
			return;
		}
		let r = new oo(n.gain).to({ value: e.volume }, e.msec).delay(e.delay).onComplete(() => {
			t(), this.#Ae(e.buf);
		}).start();
		this.#Oe[e.buf] = {
			tw: r,
			end: t
		};
	}
	#Ae(e) {
		delete this.#Oe[e], this.#je?.buf === e && (this.#je = void 0, setTimeout(() => this.#M(), 0));
	}
	#je;
	#Me(e, t) {
		if (!this.#Oe[e]) {
			setTimeout(() => this.#M(), 0);
			return;
		}
		this.#je = {
			buf: e,
			canskip: t
		};
	}
	#Ne() {
		let e = this.#je;
		e && this.#Pe(e.buf);
	}
	#Pe(e) {
		let t = this.#Oe[e];
		t && (t.tw.kill(), t.end()), this.#Ae(e);
	}
	#Fe;
	#Ie(e) {
		return this.#O?.querySelector(`video[data-fn="${CSS.escape(e)}"]`) ?? void 0;
	}
	#Le(e, t, n, r = 30) {
		let i = this.#Ie(e);
		if (!i) {
			if (r > 0) {
				requestAnimationFrame(() => this.#Le(e, t, n, r - 1));
				return;
			}
			this.#M();
			return;
		}
		if (i.loop || i.ended) {
			i.ended && n && this.#ze(i), this.#M();
			return;
		}
		i.paused && i.play().catch(() => {}), this.#Fe = {
			fn: e,
			canskip: t,
			stop: n
		};
		let a = () => {
			if (this.#Fe?.fn !== e) return;
			let t = this.#Ie(e);
			if (!t || t.loop || t.ended) {
				this.#Fe = void 0, t?.ended && n && this.#ze(t), this.#M();
				return;
			}
			t.paused && t.play().catch(() => {}), requestAnimationFrame(a);
		};
		requestAnimationFrame(a);
	}
	#Re() {
		let e = this.#Fe;
		if (e) {
			if (this.#Fe = void 0, e.stop) {
				let t = this.#Ie(e.fn);
				t && this.#ze(t);
			}
			this.#M();
		}
	}
	#ze(e) {
		e.pause(), e.currentTime = e.duration;
	}
	#Be = !1;
	#Ve = 0;
	async #He() {
		let e = this.#r;
		if (e) {
			if (this.#Be) {
				++this.#Ve;
				return;
			}
			this.#Be = !0, this.#l ??= {
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
						this.#G(n.canskip);
						return;
					}
					if (n?.t === "wait") {
						this.#$(n.msec, n.canskip);
						return;
					}
					if (n?.t === "waitTsy") {
						this.#ue(n.tw_nm, n.canskip);
						return;
					}
					if (n?.t === "waitFx") {
						this.#ve(n.aLayNm, n.names, n.canskip);
						return;
					}
					if (n?.t === "waitQuake") {
						this.#Z(n.canskip);
						return;
					}
					if (n?.t === "waitSnd") {
						this.#Ee(n.buf, n.canskip, n.stop);
						return;
					}
					if (n?.t === "waitFade") {
						this.#Me(n.buf, n.canskip);
						return;
					}
					if (n?.t === "waitVideo") {
						this.#Le(n.fn, n.canskip, n.stop);
						return;
					}
					if (n?.t === "playSnd" && n.join) {
						this.#P = !0, this.#we(n).catch(this.#i);
						return;
					}
					if (n?.t === "addFrame" || n?.t === "letFrame") {
						this.#P = !0, this.#Ge(n).catch(this.#i);
						return;
					}
					if (n?.t === "loadPlugin" || n?.t === "snapshot") {
						this.#P = !0, this.#qe(n).catch(this.#i);
						return;
					}
					if (n?.t === "load" || n?.t === "reloadScript") {
						this.#P = !0, this.#Ke(n).catch(this.#i);
						return;
					}
					if (n?.t === "pageTo") {
						this.#P = !0, this.#p(n.to).catch(this.#i);
						return;
					}
					if (n?.t === "plgTag") {
						this.#Ue(n);
						return;
					}
					if (t.some((e) => e.t === "layPlg")) {
						this.#We(t);
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
				this.#Be = !1, this.#Ve > 0 && (--this.#Ve, this.#M());
			}
		}
	}
	#Ue(e) {
		let t = S(e.name);
		if (!t) {
			this.#M();
			return;
		}
		this.#P = !0;
		let n;
		try {
			n = t(e.hArg);
		} catch (t) {
			this.#P = !1, this.myTrace(`[${e.name}] エラー ${String(t)}`, "ET");
			return;
		}
		n || (this.#P = !1, this.#M());
	}
	#We(e) {
		this.#P = !0;
		let t = !1;
		try {
			for (let n of e) n.t === "layPlg" && (t = this.#T.lay(n.nm, this.#E(n.page), n.hArg) || t);
		} catch (e) {
			this.#P = !1, this.myTrace(`[lay] エラー ${String(e)}`, "ET");
			return;
		}
		t || (this.#P = !1, this.#M());
	}
	async #Ge(e) {
		try {
			e.t === "addFrame" ? this.#Ze(await this.#w.add(e.id, e.src, e.sty)) : this.#Ze({ [`const.sn.frm.${e.id}.${e.var_name}`]: this.#w.get(e.id, e.var_name, e.fnc) });
		} catch (t) {
			this.#P = !1, this.myTrace(`[${e.t === "addFrame" ? "add_frame" : "let_frame"}] エラー id:${e.id} ${String(t)}`, "ET");
			return;
		}
		this.#P = !1, this.#M();
	}
	async #Ke(e) {
		let t = this.#r;
		if (!t) {
			this.#P = !1;
			return;
		}
		try {
			let n = e.t === "reloadScript" ? this.#y : this.#m.getMark(e.place);
			if (!n) throw e.t === "reloadScript" ? "[record_place]がまだ実行されていません" : `place=${String(e.place)} は存在しません`;
			if (t.restoreMarkPart(n), this.#Ce(t), this.$fncs.replace(n.sPages), this.#T.setPageState(this.$fncs.getForeIdx(), !1), this.#T.playback(n.hPlgLay, []), this.#c.clear(), this.#l = void 0, this.#N = !1, e.t === "load" && e.doRec !== !1 && (this.#y = { ...n }), e.t === "load" && e.index !== void 0) {
				let n = await this.#b(e.fn || t.fn);
				t.switchScript(n, "", e.index), this.#P = !1, this.#M();
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
			this.#P = !1, this.myTrace(`[${e.t === "reloadScript" ? "reload_script" : "load"}] ${String(t)}`, "ET");
			return;
		}
		this.#P = !1, this.#M();
	}
	async #qe(e) {
		try {
			e.t === "loadPlugin" ? await this.#Je(e.fn) : await this.#Ye(e);
		} catch (t) {
			this.myTrace(`[${e.t === "loadPlugin" ? "loadplugin" : "snapshot"}] ${String(t)}`, "E");
		}
		this.#P = !1, this.#M();
	}
	async #Je(e) {
		let t = await this.sys.fetch(e);
		if (!t.ok) throw `cssが取得できません fn:${e}`;
		let n = document.createElement("style");
		n.textContent = await t.text(), document.head.appendChild(n);
	}
	async #Ye(e) {
		let n = this.#O;
		if (!n) throw "ステージがまだ表示されていません";
		let r = e.fn.startsWith(f), i = r ? e.fn : te(e.fn || "snapshot"), a = T(i), { stageW: o, stageH: s } = t, c = e.width || o, l = e.height || s, u = (e.aLayNm === null && e.page === "fore" && e.b_color === void 0 ? await this.sys.capturePage(this.#Xe(n), c, l, a) : "") || await C({
			el: n,
			sw: o,
			sh: s,
			width: c,
			height: l,
			bgColor: e.b_color === void 0 ? "black" : ee(e.b_color),
			page: e.page,
			aLayNm: e.aLayNm,
			mime: a,
			smoothing: e.smoothing
		});
		r ? this.#m.putFile(i, u) : w(i, u);
	}
	#Xe(e) {
		let t = e.getBoundingClientRect();
		return {
			x: Math.round(t.x),
			y: Math.round(t.y),
			width: Math.round(t.width),
			height: Math.round(t.height)
		};
	}
	#Ze(e) {
		for (let [t, n] of Object.entries(e)) this.#r?.setValNochk(t, n);
	}
	#Qe = Object.create(null);
	#$e(e) {
		let t = e === "l" ? "breakline" : "breakpage";
		return this.#Qe[e] ??= this.sys.cfg.matchPath(`^${t}$`, d.SP_GSM).length > 0 ? this.sys.cfg.searchPath(t, d.SP_GSM) : "";
	}
	#et(e, t) {
		if (!t) return "";
		if (t.startsWith("userdata:/")) return this.#m.getFile(t) || (this.myTrace(`[${e}] 保存された画像がありません fn:${t}`, "E"), "");
		try {
			return this.sys.cfg.searchPath(t, d.SP_GSM);
		} catch (n) {
			return this.myTrace(`[${e}] 画像が見つかりません fn:${t} ${String(n)}`, "E"), "";
		}
	}
	#tt(e, t) {
		if (!t) return "";
		try {
			return this.sys.cfg.searchPath(t, d.SOUND);
		} catch (n) {
			return this.myTrace(`[${e}] 音声ファイルが見つかりません fn:${t} ${String(n)}`, "E"), "";
		}
	}
	#nt(e) {
		return l(e, this.sys.crypto, this.sys.fetch, (e) => this.sys.decAB(e));
	}
	#rt = /* @__PURE__ */ new Map();
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
			this.#it.has(e) || this.#it.set(e, this.#nt(e));
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
					}), this.#T.add(e.nm, e.cls);
				}
				break;
			case "layPlg": break;
			case "chgPic": {
				let t = this.#et("lay", e.fn), n = t.endsWith(".json"), r = /\.(?:mp4|webm)$/i.test(t), i = e.aFace?.map((e) => {
					let t = this.#et("add_face", e.fn);
					return {
						...e,
						src: t,
						isSheet: t.endsWith(".json"),
						isMovie: /\.(?:mp4|webm)$/i.test(t)
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
				let a = `${e.nm}:${e.page}`, o = (this.#rt.get(a) ?? 0) + 1;
				this.#rt.set(a, o), this.$fncs.chgPic({
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
				let s = (e) => {
					let t = this.#it.get(e);
					return t && this.#it.delete(e), t ?? this.#nt(e);
				};
				Promise.all([s(t), ...i?.map((e) => s(e.src)) ?? []]).then(([t, ...s]) => {
					this.#rt.get(a) === o && this.$fncs.chgPic({
						nm: e.nm,
						page: e.page,
						fn: e.fn,
						src: t,
						isSheet: n,
						isMovie: r,
						...i && { aFace: i.map((e, t) => ({
							...e,
							src: s[t] ?? ""
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
			case "chgBPic":
				this.$fncs.chgBPic({
					nm: e.nm,
					page: e.page,
					fn: e.fn,
					src: e.fn ? this.#et("lay b_pic", e.fn) : ""
				});
				break;
			case "chgBackClear":
				this.$fncs.chgBackClear({
					nm: e.nm,
					page: e.page
				});
				break;
			case "finishTrans":
				this.#W();
				break;
			case "trans": {
				this.#W();
				let t = this.$fncs.getForeIdx();
				this.$fncs.startTrans({
					aLayNm: e.aLayNm,
					time: e.time,
					...e.rule ? { ruleSrc: this.#et("trans", e.rule) } : {},
					...e.vague === void 0 ? {} : { vague: e.vague },
					...e.glsl === void 0 ? {} : { glslSrc: e.glsl }
				}), e.time <= 0 && this.#T.finishTrans(e.aLayNm, t, []), this.#U(e.time, e.aLayNm);
				break;
			}
			case "waitTrans": break;
			case "plgTag": break;
			case "chgStr":
				{
					let t = _(e.str);
					for (let e of t) e.pic && (e.src = this.#et("graph", e.pic));
					this.$fncs.chgStr({
						nm: e.nm,
						page: e.page,
						str: v(t),
						aCh: t,
						...e.hard ? { hard: !0 } : {}
					});
				}
				break;
			case "addBtn": {
				let t = e.sty && {
					...e.sty,
					...e.sty.pic ? { src: this.#et("button pic", e.sty.pic) } : {},
					...e.sty.b_pic ? { b_src: this.#et("button b_pic", e.sty.b_pic) } : {}
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
					sty: e.sty
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
				this.#le(e.aLayNm, e.page), this.#_e((t) => (e.page === "both" || t.page === "both" || t.page === e.page) && p.#ye(t, e.aLayNm, null)), this.$fncs.clearLay({
					aLayNm: e.aLayNm,
					page: e.page
				}), this.#T.clearLay(e.aLayNm, e.page, this.$fncs.getForeIdx());
				break;
			case "clearTxtLay":
				this.#le([e.nm], e.page), this.$fncs.clearTxtLay({
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
			case "addFx":
				this.$fncs.chgFx({
					aLayNm: e.aLayNm,
					page: e.page,
					mode: "add",
					fx: e.fx
				}), this.#me(e);
				break;
			case "clearFx":
				this.$fncs.chgFx({
					aLayNm: e.aLayNm,
					page: e.page,
					mode: "clear",
					names: e.names
				}), this.#_e((t) => (e.page === "both" || t.page === "both" || t.page === e.page) && p.#ye(t, e.aLayNm, e.names));
				break;
			case "enableFx":
				this.$fncs.chgFx({
					aLayNm: e.aLayNm,
					page: "both",
					mode: "enable",
					names: e.names,
					...e.index === null ? {} : { index: e.index },
					enabled: e.enabled
				}), this.#he((t) => p.#ye(t, e.aLayNm, e.names), !e.enabled);
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
				this.#re(e);
				break;
			case "tsyFrame":
				this.#ie(e);
				break;
			case "quake":
				this.#Y(e);
				break;
			case "stopQuake":
				this.#X();
				break;
			case "waitQuake": break;
			case "waitTsy": break;
			case "waitFx": break;
			case "stopTsy":
				this.#ce(e.tw_nm);
				break;
			case "pauseTsy": {
				let t = this.#te[e.tw_nm]?.tw;
				e.paused ? t?.pause() : t?.resume();
				break;
			}
			case "playSnd":
				e.join || this.#xe(e).catch(this.#i);
				break;
			case "stopSnd":
				this.#D.stop(e.buf);
				break;
			case "stopAllSnd":
				this.#D.stopAll();
				break;
			case "xchgBufSnd":
				this.#Pe(e.buf), this.#Pe(e.buf2), this.#D.xchgBuf(e.buf, e.buf2);
				break;
			case "duckBgm":
				this.#D.setVol("BGM", e.volume);
				break;
			case "volumeSnd":
				this.#D.setVol(e.buf, e.volume);
				break;
			case "fadeSnd":
				this.#ke(e);
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
				e.join || this.#Je(e.fn).catch(this.#i);
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
				this.#A.add(e.key);
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
				this.#Ze(this.#w.frame(e.id, e.sty, e.order, e.disabled));
				break;
			case "setFrame":
				this.#w.set(e.id, e.var_name, e.text);
				break;
			case "resvDomEvent": {
				let t = this.#w.resvDom(e.rawKey, e.key, e.del, e.needErr, (t) => {
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
						for (let t of this.#w.resolveDom(e.rawKey, e.needErr ?? !0)) r.add(t);
						break;
					case "del":
						for (let t of this.#w.resolveDom(e.rawKey, e.needErr ?? !0)) r.remove(t);
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
				this.#c.clear(), this.#l = void 0, this.#r?.setValNochk("save:const.sn.styPaging", a), this.#f();
				break;
			case "pageStyle":
				this.#r?.setValNochk("save:const.sn.styPaging", e.style), this.#f();
				break;
			case "pageKeys":
				this.#u = e.aKey;
				break;
			case "pageTo": break;
			case "trace":
				this.#ct({ text: e.text });
				break;
			case "log":
				this.#ut({ text: e.text }, e.fn, e.lineNum);
				break;
			case "loadScript": break;
			case "stop": {
				let t = this.#l;
				if (this.#l = void 0, t && this.#c.push(t.fn, t.idx, t.mark, t.clearOnResume), this.#d = !1, this.#f(), e.kind === "l" || e.kind === "p" || e.kind === "waitclick") {
					let t = e.kind === "waitclick" ? void 0 : this.#$e(e.kind);
					this.$fncs.setWait({
						nm: e.nm,
						kind: e.kind,
						...t ? { src: t } : {},
						...e.mark
					});
				}
				this.#N = e.kind === "s", e.resume ? this.#L(e.resume.mode, e.resume.msec) : this.$fncs.setSkipping(!1), this.#_(), this.$fncs.setBackAlpha(Number(this.#r?.getVal("sys:TextLayer.Back.Alpha") ?? 1)), this.$fncs.setBtnFont(String(this.#r?.getVal("tmp:sn.button.fontFamily") ?? "") || c), this.#r && this.$fncs.setChWait(this.#r.chWait);
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
export { co as ScriptMng };

//# sourceMappingURL=ScriptMng.js.map