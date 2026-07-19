//#region src/ts/Memento.ts
var e = class {
	stt;
	constructor(e = "") {
		this.stt = e;
	}
}, t = class {
	#e = "";
	push(e) {
		this.update = this.#n, this.push = (e) => {
			this.#e = e, this.#i = this.#r.push(e) - 1, this.#t[e] = {};
		}, this.push(e);
	}
	#t = {};
	update(e) {}
	#n(e) {
		if (this.#i < this.#r.length - 1) return;
		let t = e();
		this.#t[this.#e][t.nm] = t, console.log(`fn:Memento.ts update -- key(${this.#e}) MeMe:%o`, t);
	}
	undo(e) {
		console.log(`fn:Memento.ts = undo key=(${e})`);
		let t = this.#t[e];
		if (!t) throw `undo Err key:${e}`;
		for (let e of Object.values(t)) e.restore();
	}
	#r = [];
	#i = 0;
	prevKey() {
		return console.log("fn:Memento.ts -- beforeKey --"), this.#i <= 0 ? !1 : (this.undo(this.#r[--this.#i]), !0);
	}
	nextKey() {
		return console.log("fn:Memento.ts -- afterKey --"), this.#r.length - 1 <= this.#i ? !1 : (this.undo(this.#r[++this.#i]), !0);
	}
	isLast() {
		return this.#r.length - 1 === this.#i;
	}
};
//#endregion
export { t as n, e as t };

//# sourceMappingURL=Memento.js.map