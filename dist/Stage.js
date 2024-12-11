import { j as c, F as S, s as H, h as y, a as d, b as E, c as W, u as f, d as C } from "./Main.js";
import { S as w, C as r, B as L, u as p } from "./web2.js";
function k({ cmn: { styChild: t, sys: n }, fn: e }) {
  return /* @__PURE__ */ c(S, { children: /* @__PURE__ */ c("img", { css: t, src: ((i) => n.cfg.searchPath(i, w.SP_GSM))(e) }) });
}
var v = function(n, e) {
  var s = arguments;
  if (e == null || !y.call(e, "css"))
    return d.createElement.apply(void 0, s);
  var i = s.length, o = new Array(i);
  o[0] = E, o[1] = W(n, e);
  for (var l = 2; l < i; l++)
    o[l] = s[l];
  return d.createElement.apply(null, o);
};
(function(t) {
  var n;
  n || (n = t.JSX || (t.JSX = {}));
})(v || (v = {}));
function g() {
  for (var t = arguments.length, n = new Array(t), e = 0; e < t; e++)
    n[e] = arguments[e];
  return H(n);
}
function A({ cmn: { styChild: t }, str: n }) {
  const e = g`
		padding: 1em 1.5em;
		margin: 2em 0;
		background-color: aquamarine;
		border: dotted 6px #ffa500;

		font-size: xxx-large;
		top: 48%;
		width: 70%;
	`;
  return /* @__PURE__ */ c(S, { children: /* @__PURE__ */ c("span", { css: [t, e], children: n }) });
}
function z({ arg: { sys: t }, onClick: n }) {
  const e = f((a) => a.aLay), s = f((a) => a.replace);
  class i extends L {
    nm = "Stage";
    restore() {
      s(this.stt);
    }
    // this.stt から
  }
  t.caretaker.update(() => new i(JSON.stringify(e)));
  const [o, l] = d.useState(x());
  d.useEffect(() => {
    function a() {
      l(x());
    }
    return globalThis.addEventListener("resize", a), () => globalThis.removeEventListener("resize", a);
  }, []);
  const { cvsScale: u } = P(o), b = g`
		position: relative;

		transform-origin: left top;
		transform: scale(${u});
		width	: calc(${r.stageW}px / ${u});
		height	: calc(${r.stageH}px / ${u});
	`, m = g`position: absolute; top: 0; left: 0;`, h = g`
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
		top: 48%;
		&:hover {
			color: #fff;
			background: #27acd9;
		}
	`;
  return /* @__PURE__ */ C("div", { css: b, onClick: () => n(), children: [
    /* @__PURE__ */ c("button", { onClick: () => {
    }, css: h, children: "Click" }),
    /* @__PURE__ */ c("button", { onClick: () => {
    }, css: h, children: "Back" }),
    /* @__PURE__ */ c("button", { onClick: () => {
    }, css: h, children: "Prev" }),
    e.map((a) => a.cls === "GRP" ? /* @__PURE__ */ c(k, { cmn: { sys: t, styChild: m }, fn: a.fn }, a.nm) : /* @__PURE__ */ c(A, { cmn: { sys: t, styChild: m }, str: a.str }, a.nm))
  ] });
}
function P({ width: t, height: n }) {
  let e = 0, s = 0, i = 1;
  return r.stageW > t || r.stageH > n ? (r.stageW / r.stageH <= t / n ? (s = n, e = p(r.stageW / r.stageH * n)) : (e = t, s = p(r.stageH / r.stageW * t)), i = e / r.stageW) : (e = r.stageW, s = r.stageH, i = 1), { cvsScale: i, cvsWidth: e, cvsHeight: s };
}
function x() {
  const { innerWidth: t, innerHeight: n } = globalThis;
  return { width: t, height: n };
}
export {
  z as default
};
//# sourceMappingURL=Stage.js.map
