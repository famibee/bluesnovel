import { n as __toDynamicImportESM } from "./chunk.js";
import { n as Caretaker } from "./Memento.js";
window.__REACT_DEVTOOLS_GLOBAL_HOOK__ = { isDisabled: !0 };
var SN_ID = "skynovel", SysBase = class {
	constructor(e = {}, n) {
		this.hPlg = e, this.arg = n;
	}
	async loaded(...[n]) {
		document.head.insertAdjacentHTML("beforeend", "<style type=\"text/css\">\n	body {\n		background-color: black;\n	}\n	:-webkit-full-screen canvas#skynovel {width: 100%; height: 100%; object-fit: contain;}\n	:-moz-full-screen canvas#skynovel {width: 100%; height: 100%; object-fit: contain;}\n	:full-screen canvas#skynovel {width: 100%; height: 100%; object-fit: contain;}\n</style>"), await Promise.all([
			import("./client.js").then(__toDynamicImportESM(1)),
			import("./Main.js"),
			import("./Config.js"),
			import("./ScriptMng.js")
		]).then(async ([{ createRoot: e }, { initMain: n }, { Config: r }, { ScriptMng: i }]) => {
			let a = await r.generate(this);
			this.setMain(a), document.body.style.backgroundColor = String(a.oCfg.init.bg_color);
			let o = document.getElementById(SN_ID);
			if (o) {
				let e = o.cloneNode(!0);
				e.id = SN_ID;
			} else o = document.createElement("div"), o.id = SN_ID, document.body.appendChild(o);
			let s = new i(this);
			n(e(o), {
				heStage: o,
				sys: this,
				scrMng: s
			}, () => {
				queueMicrotask(() => s.load("title"));
			});
		});
	}
	#e = new Caretaker();
	get caretaker() {
		return this.#e;
	}
	cfg;
	setMain(e) {
		this.cfg = e;
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
	dec = (e, n) => Promise.resolve(n);
	hash = (e) => "";
}, SysWeb = class extends SysBase {
	constructor(...[e = {}, n = {
		cur: "prj/",
		crypto: !1,
		dip: ""
	}]) {
		super(e, n), queueMicrotask(async () => this.loaded(e, n));
	}
};
export { SysWeb };

//# sourceMappingURL=web.js.map