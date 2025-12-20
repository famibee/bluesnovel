import { t as CmnLib } from "./CmnLib.js";
var ScriptMng = class {
	#e;
	constructor(e) {
		this.sys = e, this.#e = document.createElement("span"), this.#e.hidden = !0, this.#e.textContent = "", this.#e.style.cssText = `	z-index: ${2 ** 53 - 1};
			position: absolute; left: 0; top: 0;
			color: black;
			background-color: rgba(255, 255, 255, 0.7);`, document.body.appendChild(this.#e), this.#t.trace = (e) => this.#n(e);
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
	async load(e) {
		function* t() {
			yield {
				cls: "GRP",
				nm: "base",
				fn: "yun_1184"
			}, yield {
				cls: "TXT",
				nm: "mes",
				str: "あいうえお"
			}, yield {
				nm: "mes",
				str: "かきくけこ"
			}, yield {
				cls: "GRP",
				nm: "fg0",
				fn: "F_1024a"
			}, yield {
				nm: "base",
				fn: "yun_1317"
			};
		}
		let n = t(), r = 0;
		this.go = () => {
			for (console.log("fn:ScriptMng.ts == go ==");;) {
				let { done: t, value: i } = n.next();
				if (t) break;
				this.sys.caretaker.push(e + ":" + ++r), "cls" in i ? this.$fncs.addLayer(i) : "fn" in i ? this.$fncs.chgPic(i) : this.$fncs.chgStr(i);
				break;
			}
		}, this.$trgNext();
	}
	go() {}
	#n(e) {
		return this.myTrace(e.text || `(text is ${e.text})`, "I"), !1;
	}
	myTrace = (t, n = "E") => {
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
		let i = `{${n}} ` + t;
		switch (this.#e.innerHTML += `<span style='${r}'>${i}</span><br/>`, this.#e.hidden = !1, n) {
			case "D":
				CmnLib.isDarkMode && (r = "color:#49F;");
				break;
			case "W":
			case "F": break;
			case "ET":
			case "E":
				if (this.#t.title({ text: t }), n === "ET") throw i;
				break;
			default: r = "";
		}
		console.info("%c " + i, r);
	};
};
export { ScriptMng };

//# sourceMappingURL=ScriptMng.js.map