import { g as p } from "./_commonjsHelpers.js";
import { r as x } from "./index3.js";
function j(e, t) {
  for (var r = 0; r < t.length; r++) {
    const o = t[r];
    if (typeof o != "string" && !Array.isArray(o)) {
      for (const n in o)
        if (n !== "default" && !(n in e)) {
          const a = Object.getOwnPropertyDescriptor(o, n);
          a && Object.defineProperty(e, n, a.get ? a : {
            enumerable: !0,
            get: () => o[n]
          });
        }
    }
  }
  return Object.freeze(Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }));
}
var g = x();
const u = /* @__PURE__ */ p(g), I = /* @__PURE__ */ j({
  __proto__: null,
  default: u
}, [g]), S = (e) => {
  let t;
  const r = /* @__PURE__ */ new Set(), o = (c, l) => {
    const s = typeof c == "function" ? c(t) : c;
    if (!Object.is(s, t)) {
      const b = t;
      t = l ?? (typeof s != "object" || s === null) ? s : Object.assign({}, t, s), r.forEach((d) => d(t, b));
    }
  }, n = () => t, f = { setState: o, getState: n, getInitialState: () => y, subscribe: (c) => (r.add(c), () => r.delete(c)) }, y = t = e(o, n, f);
  return f;
}, L = (e) => e ? S(e) : S, O = (e) => e;
function h(e, t = O) {
  const r = u.useSyncExternalStore(
    e.subscribe,
    () => t(e.getState()),
    () => t(e.getInitialState())
  );
  return u.useDebugValue(r), r;
}
const m = (e) => {
  const t = L(e), r = (o) => h(t, o);
  return Object.assign(r, t), r;
}, w = (e) => m, P = w()((e) => ({
  // わざとカーリー化
  txt: "",
  addTxt: (t) => e((r) => ({ txt: r.txt + t })),
  clearTxt: () => e(() => ({ txt: "" })),
  aLay: [],
  replace: (t) => e((r) => ({ aLay: JSON.parse(t) })),
  addLayer: (t) => e((r) => ({ aLay: [...r.aLay, t] })),
  chgPic: ({ nm: t, fn: r }) => e((o) => {
    const n = [...o.aLay], a = n.find((i) => i.nm === t);
    if (!a) throw `存在しないレイヤ ${t} です`;
    if (a.cls !== "GRP") throw `${t} は画像レイヤではありません`;
    return a.fn = r, { aLay: n };
  }),
  chgStr: ({ nm: t, str: r }) => e((o) => {
    const n = [...o.aLay], a = n.find((i) => i.nm === t);
    if (!a) throw `存在しないレイヤ ${t} です`;
    if (a.cls !== "TXT") throw `${t} は文字レイヤではありません`;
    return a.str = r, { aLay: n };
  })
}));
export {
  I as R,
  g as r,
  P as u
};
//# sourceMappingURL=store.js.map
