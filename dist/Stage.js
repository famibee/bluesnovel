import { j as c, F as b, s as H, h as W, a as g, b as y, c as C, u as m, d as L } from "./Main.js";
import { S as w, C as a, u as v, B as $ } from "./web2.js";
function A({ cmn: { styChild: e, sys: t }, fn: n }) {
  return /* @__PURE__ */ c(b, { children: /* @__PURE__ */ c("img", { css: e, src: ((i) => t.cfg.searchPath(i, w.SP_GSM))(n) }) });
}
function P({ cmn: { styChild: e } }) {
  return /* @__PURE__ */ c("div", { css: e, children: /* @__PURE__ */ c("span", {}) });
}
var p = function(t, n) {
  var r = arguments;
  if (n == null || !W.call(n, "css"))
    return g.createElement.apply(void 0, r);
  var i = r.length, o = new Array(i);
  o[0] = y, o[1] = C(t, n);
  for (var l = 2; l < i; l++)
    o[l] = r[l];
  return g.createElement.apply(null, o);
};
(function(e) {
  var t;
  t || (t = e.JSX || (e.JSX = {}));
})(p || (p = {}));
function f() {
  for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++)
    t[n] = arguments[n];
  return H(t);
}
function X({ arg: { sys: e, heStage: t }, onClick: n }) {
  const r = m((s) => s.aLay);
  console.log("fn:Stage.tsx 0"), e.caretaker.update(() => new T(JSON.stringify(r)));
  const i = m((s) => s.replace);
  g.useEffect(() => {
    x = t, t.addEventListener("restore", (s) => {
      console.log("fn:Stage.tsx line:42 / restore /"), i(s.detail);
    });
  }, []);
  const [o, l] = g.useState(S());
  g.useEffect(() => {
    function s() {
      l(S());
    }
    return globalThis.addEventListener("resize", s), () => globalThis.removeEventListener("resize", s);
  }, []);
  const { cvsScale: d } = k(o), E = f`
		position: relative;

		transform-origin: left top;
		transform: scale(${d});
		width	: calc(${a.stageW}px / ${d});
		height	: calc(${a.stageH}px / ${d});
`, h = f`position: absolute; top: 0; left: 0;`, u = f`
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
  return /* @__PURE__ */ L("div", { css: E, onClick: () => n(), children: [
    /* @__PURE__ */ c("button", { onClick: () => {
    }, css: u, children: "Click" }),
    /* @__PURE__ */ c("button", { onClick: () => {
    }, css: u, children: "Back" }),
    /* @__PURE__ */ c("button", { onClick: () => {
    }, css: u, children: "Prev" }),
    r.map((s) => s.cls === "GRP" ? /* @__PURE__ */ c(A, { cmn: { sys: e, styChild: h }, fn: s.fn }, s.nm) : /* @__PURE__ */ c(P, { cmn: { sys: e, styChild: h }, str: "てすと" }, s.nm))
  ] });
}
function k({ width: e, height: t }) {
  let n = 0, r = 0, i = 1;
  return a.stageW > e || a.stageH > t ? (a.stageW / a.stageH <= e / t ? (r = t, n = v(a.stageW / a.stageH * t)) : (n = e, r = v(a.stageH / a.stageW * e)), i = n / a.stageW) : (n = a.stageW, r = a.stageH, i = 1), { cvsScale: i, cvsWidth: n, cvsHeight: r };
}
function S() {
  const { innerWidth: e, innerHeight: t } = globalThis;
  return { width: e, height: t };
}
let x;
class T extends $ {
  nm = "Stage";
  // this.stt から
  restore() {
    x.dispatchEvent(new CustomEvent("restore", { detail: this.stt }));
  }
}
export {
  X as default
};
//# sourceMappingURL=Stage.js.map
