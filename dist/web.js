import { n as __toDynamicImportESM } from "./chunk.js";
import { n as Caretaker } from "./Memento.js";
window.__REACT_DEVTOOLS_GLOBAL_HOOK__ = { isDisabled: !0 };
var SN_ID = "skynovel", SysBase = class {
	constructor(e = {}, t) {
		this.hPlg = e, this.arg = t;
	}
	async loaded(...[t]) {
		document.head.insertAdjacentHTML("beforeend", "<style type=\"text/css\">\n	body {\n		background-color: black;\n	}\n	:-webkit-full-screen canvas#skynovel {width: 100%; height: 100%; object-fit: contain;}\n	:-moz-full-screen canvas#skynovel {width: 100%; height: 100%; object-fit: contain;}\n	:full-screen canvas#skynovel {width: 100%; height: 100%; object-fit: contain;}\n</style>"), Promise.all([
			import("./client.js").then(__toDynamicImportESM(1)),
			import("./Main.js"),
			import("./Config.js"),
			import("./ScriptMng.js")
		]).then(async ([{ createRoot: e }, { initMain: t }, { Config: r }, { ScriptMng: i }]) => {
			let { oCfg: a } = await r.generate(this);
			document.body.style.backgroundColor = a.init.bg_color;
			let o = document.getElementById(SN_ID);
			if (o) {
				let e = o.cloneNode(!0);
				e.id = SN_ID;
			} else o = document.createElement("div"), o.id = SN_ID, document.body.appendChild(o);
			let s = new i(this);
			t(e(o), {
				heStage: o,
				sys: this,
				scrMng: s
			}, () => {
				Promise.all([]).then(async ([]) => {
					await s.load("title");
				});
			});
		});
	}
	#e = new Caretaker();
	get caretaker() {
		return this.#e;
	}
	cfg;
	async loadPath(e, t) {
		this.cfg = t;
		let n = this.arg.cur + "path.json", r = await fetch(n);
		if (!r.ok) throw Error(r.statusText);
		let i = await r.text(), a = JSON.parse(await this.dec(n, i));
		for (let [t, n] of Object.entries(a)) {
			let r = e[t] = n;
			for (let [e, t] of Object.entries(r)) e !== ":cnt" && (r[e] = this.arg.cur + t);
		}
	}
	async run() {}
	$path_downloads = "";
	get path_downloads() {
		return this.$path_downloads;
	}
	$path_userdata = "";
	get path_userdata() {
		return this.$path_userdata;
	}
	dec = (e, t) => Promise.resolve(t);
	hash = (e) => "";
}, SysWeb = class extends SysBase {
	constructor(...[e = {}, t = {
		cur: "prj/",
		crypto: !1,
		dip: ""
	}]) {
		super(e, t), queueMicrotask(async () => this.loaded(e, t));
	}
};
export { SysWeb };

//# sourceMappingURL=web.js.map