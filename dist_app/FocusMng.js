//#region src/sn/RubySpliter.ts
var e = class e {
	static #e = "ヽ";
	static setting(t) {
		t.sesame && (e.#e = t.sesame);
	}
	static getSesame() {
		return e.#e;
	}
	static destroy() {
		e.#e = "ヽ";
	}
	#t = () => {};
	init(e) {
		this.#t = e;
	}
	static #n;
	static setEscape(t) {
		e.#n = RegExp((t ? `(?<ce>\\${t}\\S)|` : "") + e.#r, "gs");
	}
	static #r = "｜(?<str>[^《\\n]+)《(?<ruby>[^》\\n]+)》|(?:(?<kan>[⺀-⿟々〇〻㐀-鿿豈-﫿]+[ぁ-ヿ]*|[^　｜《》\\n])《(?<kan_ruby>[^》\\n]+)》)|(?<txt>[\\uD800-\\uDBFF][\\uDC00-\\uDFFF]|[^｜《》]+?|.)";
	putTxt(t) {
		for (let { groups: n } of t.matchAll(e.#n)) {
			let { ruby: e, kan_ruby: t, kan: r = "", ce: i, txt: a = "", str: o = "" } = n;
			if (e) {
				this.putTxtRb(decodeURIComponent(o), e);
				continue;
			}
			if (t) {
				this.putTxtRb(r, t);
				continue;
			}
			if (i) {
				this.#t(i.slice(1), "");
				continue;
			}
			for (let e of Array.from(a)) this.#t(e, "");
		}
	}
	putTxtRb(t, n) {
		if (/^\w+｜{"/.test(n)) {
			this.#t(t, n);
			return;
		}
		let r = Array.from(t), i = r.length;
		if (/^\*.?$/.test(n)) {
			let t = "center｜" + (n === "*" ? e.#e : n.charAt(1));
			for (let e of r) this.#t(e, t);
			return;
		}
		if (i === 1 || !n.includes(" ")) {
			this.#t(t, decodeURIComponent(n));
			return;
		}
		let a = n.split(" "), o = a.length, s = o > i ? o : i;
		for (let e = 0; e < s; ++e) this.#t(e < i ? r[e] : "", e < o ? decodeURIComponent(a[e]) : "");
	}
};
//#endregion
//#region src/ts/Txt.ts
function t(t) {
	e.setEscape(t);
}
t("");
var n = [
	"span",
	"add",
	"add_close",
	"grp",
	"tcy",
	"link",
	"endlink",
	"del",
	"gotxt"
];
function r(e) {
	if (e === void 0) return;
	let t = Number(e);
	return Number.isFinite(t) ? t : void 0;
}
function i(e) {
	let t = e.indexOf("｜");
	if (t < 1) return;
	let r = e.slice(0, t);
	if (!n.includes(r)) return;
	let i = e.slice(t + 1);
	try {
		return {
			cmd: r,
			o: i ? JSON.parse(i) : {}
		};
	} catch {
		return {
			cmd: r,
			o: {}
		};
	}
}
function a(t) {
	let n = [], a = "", o = "", s, c, l, u, d, f = [], p = (e, t, i, f) => {
		let p = a + (u?.style ?? "") + (i?.style ?? ""), m = o + (u?.r_style ?? "") + (i?.r_style ?? ""), h = i?.ch_in_style ?? u?.ch_in_style ?? s, g = i?.ch_out_style ?? u?.ch_out_style ?? c, _ = r(i?.wait) ?? r(u?.wait) ?? l;
		n.push({
			c: e,
			...t ? { r: t } : {},
			...p ? { s: p } : {},
			...m ? { rs: m } : {},
			...f ? { tcy: f } : {},
			...d ? { lnk: d } : {},
			...h === void 0 ? {} : { cis: h },
			...g === void 0 ? {} : { cos: g },
			..._ === void 0 ? {} : { w: _ }
		});
	}, m = new e();
	return m.init((e, t) => {
		let m = t ? i(t) : void 0;
		if (!m) {
			p(e, t);
			return;
		}
		let { o: h } = m;
		switch (m.cmd) {
			case "span":
				a = h.style ?? "", o = h.r_style ?? "", s = h.ch_in_style, c = h.ch_out_style, l = r(h.wait);
				break;
			case "add":
				u = h;
				break;
			case "add_close":
				u = void 0;
				break;
			case "link":
				f.push({
					sty: a,
					rSty: o
				}), a += h.style ?? "", o += h.r_style ?? "", d = {
					label: h.label ?? "",
					fn: h.fn ?? "",
					call: h.call === "true",
					arg: h.arg ?? "",
					...h.url ? { url: h.url } : {},
					...h.style_hover ? { sh: h.style_hover } : {},
					...h.hint ? { hint: h.hint } : {},
					...h.hint_style ? { hs: h.hint_style } : {},
					...h.hint_opt ? { ho: h.hint_opt } : {}
				};
				break;
			case "endlink": {
				let e = f.pop();
				e && (a = e.sty, o = e.rSty), d = void 0;
				break;
			}
			case "tcy":
				p(h.t ?? "", h.r, h, !0);
				break;
			case "grp": h.pic && (p("　", h.r, h), Object.assign(n.at(-1), {
				pic: h.pic,
				...r(h.width) === void 0 ? {} : { gw: r(h.width) },
				...r(h.height) === void 0 ? {} : { gh: r(h.height) },
				...r(h.x) === void 0 ? {} : { gx: r(h.x) },
				...r(h.y) === void 0 ? {} : { gy: r(h.y) }
			}));
		}
	}), m.putTxt(t), n;
}
function o(e) {
	return e.map((e) => e.c).join("");
}
function s(e) {
	return o(a(e));
}
function c(e) {
	let t = e.indexOf("｜");
	return t > 0 && /^[0-9a-z]+$/.test(e.slice(0, t)) ? e.slice(t + 1) : e;
}
var l = new class e {
	#e = [];
	#t = -1;
	static #n(e) {
		if (e.disabled || e.getClientRects().length === 0) return !1;
		try {
			for (let t = e.ownerDocument.defaultView; t && t !== t.parent;) {
				let e = t.frameElement;
				if (!e) break;
				if (e.getClientRects().length === 0) return !1;
				t = e.ownerDocument.defaultView;
			}
		} catch {}
		return !0;
	}
	#r = /* @__PURE__ */ new Map();
	#i(e) {
		this.#r.get(e)?.(), this.#r.delete(e);
	}
	add(e) {
		if (this.#e.includes(e)) return;
		let t = () => {
			this.#t = this.#e.indexOf(e);
		};
		e.addEventListener("focus", t), this.#r.set(e, () => {
			e.removeEventListener("focus", t);
		}), this.#e.push(e);
	}
	remove(e) {
		let t = this.#e.indexOf(e);
		t < 0 || (this.#i(e), this.#e.splice(t, 1), this.#e.length === 0 ? this.#t = -1 : t <= this.#t && --this.#t);
	}
	clear() {
		for (let e of this.#e) this.#i(e);
		this.#e = [], this.#t = -1;
	}
	isFocus(e) {
		return this.#t >= 0 && this.#e[this.#t] === e;
	}
	get length() {
		return this.#e.length;
	}
	get idx() {
		return this.#t;
	}
	next() {
		this.#a(1);
	}
	prev() {
		this.#a(-1);
	}
	#a(t) {
		let n = this.#e.length;
		if (n === 0) return;
		let r = this.#t + t;
		r >= n ? r = 0 : r < 0 && (r = n - 1);
		for (let i = 0; i < n; ++i) {
			let a = ((r + t * i) % n + n) % n, o = this.#e[a];
			if (e.#n(o)) {
				this.#t = a, o.focus();
				return;
			}
		}
		this.#t = -1;
	}
	blur() {
		this.#e[this.#t]?.blur(), this.#t = -1, document.activeElement?.blur(), globalThis.focus();
	}
}();
//#endregion
export { t as a, c as i, o as n, a as o, s as r, l as t };

//# sourceMappingURL=FocusMng.js.map