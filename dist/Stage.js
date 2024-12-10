import { j as i, F as W, s as y, h as C, a as g, b as L, c as $, u as v, d as w } from "./Main.js";
import { S as A, C as a, u as p, B as P } from "./web2.js";
function k({ cmn: { styChild: e, sys: t }, fn: n }) {
  return /* @__PURE__ */ i(W, { children: /* @__PURE__ */ i("img", { css: e, src: ((c) => t.cfg.searchPath(c, A.SP_GSM))(n) }) });
}
function T({ cmn: { styChild: e } }) {
  return /* @__PURE__ */ i("div", { css: e, children: /* @__PURE__ */ i("span", {}) });
}
var S = function(t, n) {
  var r = arguments;
  if (n == null || !C.call(n, "css"))
    return g.createElement.apply(void 0, r);
  var c = r.length, o = new Array(c);
  o[0] = L, o[1] = $(t, n);
  for (var l = 2; l < c; l++)
    o[l] = r[l];
  return g.createElement.apply(null, o);
};
(function(e) {
  var t;
  t || (t = e.JSX || (e.JSX = {}));
})(S || (S = {}));
function f() {
  for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++)
    t[n] = arguments[n];
  return y(t);
}
function B({ arg: { sys: e, heStage: t }, onClick: n }) {
  const r = v((s) => s.aLay);
  h = JSON.stringify(r), console.log(`fn:Stage.tsx 0 stt=${h}`), E(), g.useEffect(() => {
    E = () => e.caretaker.update();
  }, []);
  const c = v((s) => s.replace);
  g.useEffect(() => {
    b = t, t.addEventListener("restore", (s) => {
      c(s.detail);
    });
  }, []);
  const [o, l] = g.useState(x());
  g.useEffect(() => {
    function s() {
      l(x());
    }
    return globalThis.addEventListener("resize", s), () => globalThis.removeEventListener("resize", s);
  }, []);
  const { cvsScale: d } = z(o), H = f`
		position: relative;

		transform-origin: left top;
		transform: scale(${d});
		width	: calc(${a.stageW}px / ${d});
		height	: calc(${a.stageH}px / ${d});
`, m = f`position: absolute; top: 0; left: 0;`, u = f`
position: relative; z-index: 1;

display: inline-block;
text-align: center;
vertical-align: middle;
text-decoration: none;
width: 120px;
margin: auto;
padding: 1rem 4rem;
font-weight: bold;
border: 2px solid #27acd9;
color: #27acd9;
border-radius: 100vh;
transition: 0.5s;
&:hover {
	color: #fff;
	background: #27acd9;
}`;
  return /* @__PURE__ */ w("div", { css: H, onClick: () => n(), children: [
    /* @__PURE__ */ i("button", { onClick: () => {
    }, css: u, children: "Click" }),
    /* @__PURE__ */ i("button", { onClick: () => {
    }, css: u, children: "Back" }),
    /* @__PURE__ */ i("button", { onClick: () => {
    }, css: u, children: "Prev" }),
    r.map((s) => s.cls === "GRP" ? /* @__PURE__ */ i(k, { cmn: { sys: e, styChild: m }, fn: s.fn }, s.nm) : /* @__PURE__ */ i(T, { cmn: { sys: e, styChild: m }, str: "てすと" }, s.nm))
  ] });
}
function z({ width: e, height: t }) {
  let n = 0, r = 0, c = 1;
  return a.stageW > e || a.stageH > t ? (a.stageW / a.stageH <= e / t ? (r = t, n = p(a.stageW / a.stageH * t)) : (n = e, r = p(a.stageH / a.stageW * e)), c = n / a.stageW) : (n = a.stageW, r = a.stageH, c = 1), { cvsScale: c, cvsWidth: n, cvsHeight: r };
}
function x() {
  const { innerWidth: e, innerHeight: t } = globalThis;
  return { width: e, height: t };
}
let b, E = () => {
};
class J extends P {
  nm = "Stage";
  restore() {
    console.log("fn:Stage.tsx line:162 / restore /"), b.dispatchEvent(new CustomEvent("restore", { detail: this.stt }));
  }
}
let h = "";
const G = () => new J(h);
export {
  B as default,
  G as save
};
//# sourceMappingURL=Stage.js.map
