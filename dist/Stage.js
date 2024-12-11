import { j as i, F as H, s as W, h as y, a as g, b as C, c as L, u as v, d as $ } from "./Main.js";
import { S as w, C as a, u as p, B as A } from "./web2.js";
function P({ cmn: { styChild: e, sys: t }, fn: n }) {
  return /* @__PURE__ */ i(H, { children: /* @__PURE__ */ i("img", { css: e, src: ((c) => t.cfg.searchPath(c, w.SP_GSM))(n) }) });
}
function k({ cmn: { styChild: e } }) {
  return /* @__PURE__ */ i("div", { css: e, children: /* @__PURE__ */ i("span", {}) });
}
var S = function(t, n) {
  var r = arguments;
  if (n == null || !y.call(n, "css"))
    return g.createElement.apply(void 0, r);
  var c = r.length, o = new Array(c);
  o[0] = C, o[1] = L(t, n);
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
  return W(t);
}
function j({ arg: { sys: e, heStage: t }, onClick: n }) {
  const r = v((s) => s.aLay);
  h = JSON.stringify(r), console.log(`fn:Stage.tsx 0 stt=${h}`), e.caretaker.update();
  const c = v((s) => s.replace);
  g.useEffect(() => {
    E = t, t.addEventListener("restore", (s) => {
      console.log("fn:Stage.tsx line:46 / restore /"), c(s.detail);
    });
  }, []);
  const [o, l] = g.useState(x());
  g.useEffect(() => {
    function s() {
      l(x());
    }
    return globalThis.addEventListener("resize", s), () => globalThis.removeEventListener("resize", s);
  }, []);
  const { cvsScale: d } = T(o), b = f`
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
  return /* @__PURE__ */ $("div", { css: b, onClick: () => n(), children: [
    /* @__PURE__ */ i("button", { onClick: () => {
    }, css: u, children: "Click" }),
    /* @__PURE__ */ i("button", { onClick: () => {
    }, css: u, children: "Back" }),
    /* @__PURE__ */ i("button", { onClick: () => {
    }, css: u, children: "Prev" }),
    r.map((s) => s.cls === "GRP" ? /* @__PURE__ */ i(P, { cmn: { sys: e, styChild: m }, fn: s.fn }, s.nm) : /* @__PURE__ */ i(k, { cmn: { sys: e, styChild: m }, str: "てすと" }, s.nm))
  ] });
}
function T({ width: e, height: t }) {
  let n = 0, r = 0, c = 1;
  return a.stageW > e || a.stageH > t ? (a.stageW / a.stageH <= e / t ? (r = t, n = p(a.stageW / a.stageH * t)) : (n = e, r = p(a.stageH / a.stageW * e)), c = n / a.stageW) : (n = a.stageW, r = a.stageH, c = 1), { cvsScale: c, cvsWidth: n, cvsHeight: r };
}
function x() {
  const { innerWidth: e, innerHeight: t } = globalThis;
  return { width: e, height: t };
}
let E;
class z extends A {
  nm = "Stage";
  // this.stt から
  restore() {
    E.dispatchEvent(new CustomEvent("restore", { detail: this.stt }));
  }
}
let h = "";
const B = () => new z(h);
export {
  j as default,
  B as save
};
//# sourceMappingURL=Stage.js.map