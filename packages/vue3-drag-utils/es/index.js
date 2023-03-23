import { defineComponent as _, openBlock as s, createElementBlock as a, renderSlot as d, pushScopeId as p, popScopeId as u, createElementVNode as i } from "vue";
const m = (e) => (p("data-v-c335c7e5"), e = e(), u(), e), v = { class: "box" }, g = /* @__PURE__ */ m(() => /* @__PURE__ */ i("div", null, "12313", -1)), f = /* @__PURE__ */ _({
  __name: "draggable",
  setup(e) {
    return (o, n) => (s(), a("div", v, [
      g,
      d(o.$slots, "default", {}, void 0, !0)
    ]));
  }
});
const b = (e, o) => {
  const n = e.__vccOpts || e;
  for (const [l, r] of o)
    n[l] = r;
  return n;
}, c = /* @__PURE__ */ b(f, [["__scopeId", "data-v-c335c7e5"]]);
c.install = (e) => {
  e.component(c.__name, c);
};
const t = /* @__PURE__ */ _({
  __name: "HButton",
  setup(e) {
    return (o, n) => (s(), a("div", null, "button"));
  }
});
t.install = (e) => {
  e.component(t.__name, t);
};
const h = (e) => {
  console.log("button1", e, t, t.__name), e.component("HButton", t);
}, B = {
  install: h
};
export {
  t as button,
  B as default,
  c as draggable
};
