import { j as i, F as W, s as C, h as y, a as d, b as L, c as $, u as m, d as w } from "./Main.js";
import { S as k, C as a, u as v, B as A } from "./web2.js";
function P({ cmn: { styChild: e, sys: t }, fn: n }) {
  return /* @__PURE__ */ i(W, { children: /* @__PURE__ */ i("img", { css: e, src: ((c) => t.cfg.searchPath(c, k.SP_GSM))(n) }) });
}
function T({ cmn: { styChild: e } }) {
  return /* @__PURE__ */ i("div", { css: e, children: /* @__PURE__ */ i("span", {}) });
}
var p = function(t, n) {
  var r = arguments;
  if (n == null || !y.call(n, "css"))
    return d.createElement.apply(void 0, r);
  var c = r.length, o = new Array(c);
  o[0] = L, o[1] = $(t, n);
  for (var l = 2; l < c; l++)
    o[l] = r[l];
  return d.createElement.apply(null, o);
};
(function(e) {
  var t;
  t || (t = e.JSX || (e.JSX = {}));
})(p || (p = {}));
function f() {
  for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++)
    t[n] = arguments[n];
  return C(t);
}
function B({ arg: { sys: e, heStage: t }, onClick: n }) {
  const r = m((s) => s.aLay), c = JSON.stringify(r);
  console.log(`fn:Stage.tsx 0 stt=${c}`), x(), d.useEffect(() => {
    const s = () => new J(c);
    e.caretaker.add(s), x = () => e.caretaker.update();
  }, []);
  const o = m((s) => s.replace);
  d.useEffect(() => {
    E = t, t.addEventListener("restore", (s) => {
      o(s.detail);
    });
  }, []);
  const [l, b] = d.useState(S());
  d.useEffect(() => {
    function s() {
      b(S());
    }
    return globalThis.addEventListener("resize", s), () => globalThis.removeEventListener("resize", s);
  }, []);
  const { cvsScale: g } = z(l), H = f`
		position: relative;

		transform-origin: left top;
		transform: scale(${g});
		width	: calc(${a.stageW}px / ${g});
		height	: calc(${a.stageH}px / ${g});
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
  return /* @__PURE__ */ w("div", { css: H, onClick: () => n(), children: [
    /* @__PURE__ */ i("button", { onClick: () => {
    }, css: u, children: "Click" }),
    /* @__PURE__ */ i("button", { onClick: () => {
    }, css: u, children: "Back" }),
    /* @__PURE__ */ i("button", { onClick: () => {
    }, css: u, children: "Prev" }),
    r.map((s) => s.cls === "GRP" ? /* @__PURE__ */ i(P, { cmn: { sys: e, styChild: h }, fn: s.fn }, s.nm) : /* @__PURE__ */ i(T, { cmn: { sys: e, styChild: h }, str: "てすと" }, s.nm))
  ] });
}
function z({ width: e, height: t }) {
  let n = 0, r = 0, c = 1;
  return a.stageW > e || a.stageH > t ? (a.stageW / a.stageH <= e / t ? (r = t, n = v(a.stageW / a.stageH * t)) : (n = e, r = v(a.stageH / a.stageW * e)), c = n / a.stageW) : (n = a.stageW, r = a.stageH, c = 1), { cvsScale: c, cvsWidth: n, cvsHeight: r };
}
function S() {
  const { innerWidth: e, innerHeight: t } = globalThis;
  return { width: e, height: t };
}
let E, x = () => {
};
class J extends A {
  nm = "Stage";
  restore() {
    console.log("fn:Stage.tsx line:162 / restore /"), E.dispatchEvent(new CustomEvent("restore", { detail: this.stt }));
  }
}
export {
  B as default
};
//# sourceMappingURL=Stage.js.map
