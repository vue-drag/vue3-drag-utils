import { defineComponent as c, openBlock as a, createElementBlock as s, renderSlot as p, pushScopeId as d, popScopeId as u, createElementVNode as i } from "vue";
const m = (t) => (d("data-v-a2b3914b"), t = t(), u(), t), b = { class: "box" }, v = /* @__PURE__ */ m(() => /* @__PURE__ */ i("div", null, "998989898", -1)), f = /* @__PURE__ */ c({
  __name: "Draggable",
  setup(t) {
    return (e, o) => (a(), s("div", b, [
      v,
      p(e.$slots, "default", {}, void 0, !0)
    ]));
  }
});
const g = (t, e) => {
  const o = t.__vccOpts || t;
  for (const [r, l] of e)
    o[r] = l;
  return o;
}, n = /* @__PURE__ */ g(f, [["__scopeId", "data-v-a2b3914b"]]);
n.install = (t) => {
  t.component(n.__name, n);
};
const _ = /* @__PURE__ */ c({
  __name: "HButton",
  setup(t) {
    return (e, o) => (a(), s("div", null, "button"));
  }
});
_.install = (t) => {
  t.component(_.__name, _);
};
const h = [n, _], x = (t) => {
  h.forEach((e) => {
    t.component(e.__name, e);
  });
}, S = {
  install: x
};
export {
  _ as button,
  S as default,
  n as draggable
};
