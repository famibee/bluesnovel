import { j as i, F as b, s as H, h as E, a as g, b as W, c as y, u as m, d as C } from "./Main.js";
import { S as L, C as a, B as w, u as p } from "./web2.js";
function A({ cmn: { styChild: e, sys: n }, fn: t }) {
  return /* @__PURE__ */ i(b, { children: /* @__PURE__ */ i("img", { css: e, src: ((c) => n.cfg.searchPath(c, L.SP_GSM))(t) }) });
}
function P({ cmn: { styChild: e } }) {
  return /* @__PURE__ */ i("div", { css: e, children: /* @__PURE__ */ i("span", {}) });
}
var v = function(n, t) {
  var r = arguments;
  if (t == null || !E.call(t, "css"))
    return g.createElement.apply(void 0, r);
  var c = r.length, o = new Array(c);
  o[0] = W, o[1] = y(n, t);
  for (var l = 2; l < c; l++)
    o[l] = r[l];
  return g.createElement.apply(null, o);
};
(function(e) {
  var n;
  n || (n = e.JSX || (e.JSX = {}));
})(v || (v = {}));
function h() {
  for (var e = arguments.length, n = new Array(e), t = 0; t < e; t++)
    n[t] = arguments[t];
  return H(n);
}
function z({ arg: { sys: e }, onClick: n }) {
  console.log("fn:Stage.tsx 0");
  const t = m((s) => s.aLay), r = m((s) => s.replace);
  class c extends w {
    nm = "Stage";
    restore() {
      r(this.stt);
    }
    // this.stt から
  }
  e.caretaker.update(() => new c(JSON.stringify(t)));
  const [o, l] = g.useState(S());
  g.useEffect(() => {
    function s() {
      l(S());
    }
    return globalThis.addEventListener("resize", s), () => globalThis.removeEventListener("resize", s);
  }, []);
  const { cvsScale: u } = $(o), x = h`
		position: relative;

		transform-origin: left top;
		transform: scale(${u});
		width	: calc(${a.stageW}px / ${u});
		height	: calc(${a.stageH}px / ${u});
`, f = h`position: absolute; top: 0; left: 0;`, d = h`
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
  return /* @__PURE__ */ C("div", { css: x, onClick: () => n(), children: [
    /* @__PURE__ */ i("button", { onClick: () => {
    }, css: d, children: "Click" }),
    /* @__PURE__ */ i("button", { onClick: () => {
    }, css: d, children: "Back" }),
    /* @__PURE__ */ i("button", { onClick: () => {
    }, css: d, children: "Prev" }),
    t.map((s) => s.cls === "GRP" ? /* @__PURE__ */ i(A, { cmn: { sys: e, styChild: f }, fn: s.fn }, s.nm) : /* @__PURE__ */ i(P, { cmn: { sys: e, styChild: f }, str: "てすと" }, s.nm))
  ] });
}
function $({ width: e, height: n }) {
  let t = 0, r = 0, c = 1;
  return a.stageW > e || a.stageH > n ? (a.stageW / a.stageH <= e / n ? (r = n, t = p(a.stageW / a.stageH * n)) : (t = e, r = p(a.stageH / a.stageW * e)), c = t / a.stageW) : (t = a.stageW, r = a.stageH, c = 1), { cvsScale: c, cvsWidth: t, cvsHeight: r };
}
function S() {
  const { innerWidth: e, innerHeight: n } = globalThis;
  return { width: e, height: n };
}
export {
  z as default
};
//# sourceMappingURL=Stage.js.map
