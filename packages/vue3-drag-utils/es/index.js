import { provide as P, inject as x, defineComponent as k, onUnmounted as lt, watchEffect as E, isRef as Fe, unref as l, computed as D, ref as C, reactive as dt, openBlock as A, createBlock as Z, withCtx as ee, renderSlot as oe, withDirectives as ft, createElementBlock as Ve, vShow as gt, watch as ht, TransitionGroup as pt, Fragment as vt, renderList as mt } from "vue";
function he(t, e, r) {
  return Array.isArray(t) ? (t.length = Math.max(t.length, e), t.splice(e, 1, r), r) : (t[e] = r, r);
}
var qe = Symbol("DndContextType");
function yt(t) {
  P(qe, t);
}
function Dt() {
  return x(qe);
}
var I;
(function(t) {
  t.SOURCE = "SOURCE", t.TARGET = "TARGET";
})(I || (I = {}));
function g(t, e, ...r) {
  if (Ot() && e === void 0)
    throw new Error("invariant requires an error message argument");
  if (!t) {
    let n;
    if (e === void 0)
      n = new Error("Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings.");
    else {
      let i = 0;
      n = new Error(e.replace(/%s/g, function() {
        return r[i++];
      })), n.name = "Invariant Violation";
    }
    throw n.framesToPop = 1, n;
  }
}
function Ot() {
  return typeof process < "u" && process.env.NODE_ENV === "production";
}
const se = "dnd-core/INIT_COORDS", F = "dnd-core/BEGIN_DRAG", ae = "dnd-core/PUBLISH_DRAG_SOURCE", V = "dnd-core/HOVER", q = "dnd-core/DROP", B = "dnd-core/END_DRAG";
function pe(t, e) {
  return {
    type: se,
    payload: {
      sourceClientOffset: e || null,
      clientOffset: t || null
    }
  };
}
function St(t, e, r) {
  return e.split(".").reduce(
    (n, i) => n && n[i] ? n[i] : r || null,
    t
  );
}
function Tt(t, e) {
  return t.filter(
    (r) => r !== e
  );
}
function Be(t) {
  return typeof t == "object";
}
function bt(t, e) {
  const r = /* @__PURE__ */ new Map(), n = (o) => {
    r.set(o, r.has(o) ? r.get(o) + 1 : 1);
  };
  t.forEach(n), e.forEach(n);
  const i = [];
  return r.forEach((o, s) => {
    o === 1 && i.push(s);
  }), i;
}
function It(t, e) {
  return t.filter(
    (r) => e.indexOf(r) > -1
  );
}
const Et = {
  type: se,
  payload: {
    clientOffset: null,
    sourceClientOffset: null
  }
};
function wt(t) {
  return function(r = [], n = {
    publishSource: !0
  }) {
    const { publishSource: i = !0, clientOffset: o, getSourceClientOffset: s } = n, a = t.getMonitor(), c = t.getRegistry();
    t.dispatch(pe(o)), Ct(r, a, c);
    const d = Pt(r, a);
    if (d == null) {
      t.dispatch(Et);
      return;
    }
    let p = null;
    if (o) {
      if (!s)
        throw new Error("getSourceClientOffset must be defined");
      _t(s), p = s(d);
    }
    t.dispatch(pe(o, p));
    const h = c.getSource(d).beginDrag(a, d);
    if (h == null)
      return;
    Nt(h), c.pinSource(d);
    const u = c.getSourceType(d);
    return {
      type: F,
      payload: {
        itemType: u,
        item: h,
        sourceId: d,
        clientOffset: o || null,
        sourceClientOffset: p || null,
        isSourcePublic: !!i
      }
    };
  };
}
function Ct(t, e, r) {
  g(!e.isDragging(), "Cannot call beginDrag while dragging."), t.forEach(function(n) {
    g(r.getSource(n), "Expected sourceIds to be registered.");
  });
}
function _t(t) {
  g(typeof t == "function", "When clientOffset is provided, getSourceClientOffset must be a function.");
}
function Nt(t) {
  g(Be(t), "Item must be an object.");
}
function Pt(t, e) {
  let r = null;
  for (let n = t.length - 1; n >= 0; n--)
    if (e.canDragSource(t[n])) {
      r = t[n];
      break;
    }
  return r;
}
function xt(t) {
  return function() {
    if (t.getMonitor().isDragging())
      return {
        type: ae
      };
  };
}
function te(t, e) {
  return e === null ? t === null : Array.isArray(t) ? t.some(
    (r) => r === e
  ) : t === e;
}
function Rt(t) {
  return function(r, { clientOffset: n } = {}) {
    At(r);
    const i = r.slice(0), o = t.getMonitor(), s = t.getRegistry();
    Mt(i, o, s);
    const a = o.getItemType();
    return kt(i, s, a), Lt(i, o, s), {
      type: V,
      payload: {
        targetIds: i,
        clientOffset: n || null
      }
    };
  };
}
function At(t) {
  g(Array.isArray(t), "Expected targetIds to be an array.");
}
function Mt(t, e, r) {
  g(e.isDragging(), "Cannot call hover while not dragging."), g(!e.didDrop(), "Cannot call hover after drop.");
  for (let n = 0; n < t.length; n++) {
    const i = t[n];
    g(t.lastIndexOf(i) === n, "Expected targetIds to be unique in the passed array.");
    const o = r.getTarget(i);
    g(o, "Expected targetIds to be registered.");
  }
}
function kt(t, e, r) {
  for (let n = t.length - 1; n >= 0; n--) {
    const i = t[n], o = e.getTargetType(i);
    te(o, r) || t.splice(n, 1);
  }
}
function Lt(t, e, r) {
  t.forEach(function(n) {
    r.getTarget(n).hover(e, n);
  });
}
function Ht(t, e, r) {
  return e in t ? Object.defineProperty(t, e, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : t[e] = r, t;
}
function $t(t) {
  for (var e = 1; e < arguments.length; e++) {
    var r = arguments[e] != null ? arguments[e] : {}, n = Object.keys(r);
    typeof Object.getOwnPropertySymbols == "function" && (n = n.concat(Object.getOwnPropertySymbols(r).filter(function(i) {
      return Object.getOwnPropertyDescriptor(r, i).enumerable;
    }))), n.forEach(function(i) {
      Ht(t, i, r[i]);
    });
  }
  return t;
}
function jt(t) {
  return function(r = {}) {
    const n = t.getMonitor(), i = t.getRegistry();
    Ut(n), qt(n).forEach((s, a) => {
      const c = Ft(s, a, i, n), d = {
        type: q,
        payload: {
          dropResult: $t({}, r, c)
        }
      };
      t.dispatch(d);
    });
  };
}
function Ut(t) {
  g(t.isDragging(), "Cannot call drop while not dragging."), g(!t.didDrop(), "Cannot call drop twice during one drag operation.");
}
function Ft(t, e, r, n) {
  const i = r.getTarget(t);
  let o = i ? i.drop(n, t) : void 0;
  return Vt(o), typeof o > "u" && (o = e === 0 ? {} : n.getDropResult()), o;
}
function Vt(t) {
  g(typeof t > "u" || Be(t), "Drop result must either be an object or undefined.");
}
function qt(t) {
  const e = t.getTargetIds().filter(t.canDropOnTarget, t);
  return e.reverse(), e;
}
function Bt(t) {
  return function() {
    const r = t.getMonitor(), n = t.getRegistry();
    Gt(r);
    const i = r.getSourceId();
    return i != null && (n.getSource(i, !0).endDrag(r, i), n.unpinSource()), {
      type: B
    };
  };
}
function Gt(t) {
  g(t.isDragging(), "Cannot call endDrag while not dragging.");
}
function Wt(t) {
  return {
    beginDrag: wt(t),
    publishDragSource: xt(t),
    hover: Rt(t),
    drop: jt(t),
    endDrag: Bt(t)
  };
}
class Yt {
  receiveBackend(e) {
    this.backend = e;
  }
  getMonitor() {
    return this.monitor;
  }
  getBackend() {
    return this.backend;
  }
  getRegistry() {
    return this.monitor.registry;
  }
  getActions() {
    const e = this, { dispatch: r } = this.store;
    function n(o) {
      return (...s) => {
        const a = o.apply(e, s);
        typeof a < "u" && r(a);
      };
    }
    const i = Wt(this);
    return Object.keys(i).reduce((o, s) => {
      const a = i[s];
      return o[s] = n(a), o;
    }, {});
  }
  dispatch(e) {
    this.store.dispatch(e);
  }
  constructor(e, r) {
    this.isSetUp = !1, this.handleRefCountChange = () => {
      const n = this.store.getState().refCount > 0;
      this.backend && (n && !this.isSetUp ? (this.backend.setup(), this.isSetUp = !0) : !n && this.isSetUp && (this.backend.teardown(), this.isSetUp = !1));
    }, this.store = e, this.monitor = r, e.subscribe(this.handleRefCountChange);
  }
}
function b(t) {
  return "Minified Redux error #" + t + "; visit https://redux.js.org/Errors?code=" + t + " for the full message or use the non-minified dev environment for full errors. ";
}
var ve = function() {
  return typeof Symbol == "function" && Symbol.observable || "@@observable";
}(), Y = function() {
  return Math.random().toString(36).substring(7).split("").join(".");
}, me = {
  INIT: "@@redux/INIT" + Y(),
  REPLACE: "@@redux/REPLACE" + Y(),
  PROBE_UNKNOWN_ACTION: function() {
    return "@@redux/PROBE_UNKNOWN_ACTION" + Y();
  }
};
function Xt(t) {
  if (typeof t != "object" || t === null)
    return !1;
  for (var e = t; Object.getPrototypeOf(e) !== null; )
    e = Object.getPrototypeOf(e);
  return Object.getPrototypeOf(t) === e;
}
function zt(t) {
  if (t === void 0)
    return "undefined";
  if (t === null)
    return "null";
  var e = typeof t;
  switch (e) {
    case "boolean":
    case "string":
    case "number":
    case "symbol":
    case "function":
      return e;
  }
  if (Array.isArray(t))
    return "array";
  if (Jt(t))
    return "date";
  if (Kt(t))
    return "error";
  var r = Qt(t);
  switch (r) {
    case "Symbol":
    case "Promise":
    case "WeakMap":
    case "WeakSet":
    case "Map":
    case "Set":
      return r;
  }
  return e.slice(8, -1).toLowerCase().replace(/\s/g, "");
}
function Qt(t) {
  return typeof t.constructor == "function" ? t.constructor.name : null;
}
function Kt(t) {
  return t instanceof Error || typeof t.message == "string" && t.constructor && typeof t.constructor.stackTraceLimit == "number";
}
function Jt(t) {
  return t instanceof Date ? !0 : typeof t.toDateString == "function" && typeof t.getDate == "function" && typeof t.setDate == "function";
}
function _(t) {
  var e = typeof t;
  return process.env.NODE_ENV !== "production" && (e = zt(t)), e;
}
function Ge(t, e, r) {
  var n;
  if (typeof e == "function" && typeof r == "function" || typeof r == "function" && typeof arguments[3] == "function")
    throw new Error(process.env.NODE_ENV === "production" ? b(0) : "It looks like you are passing several store enhancers to createStore(). This is not supported. Instead, compose them together to a single function. See https://redux.js.org/tutorials/fundamentals/part-4-store#creating-a-store-with-enhancers for an example.");
  if (typeof e == "function" && typeof r > "u" && (r = e, e = void 0), typeof r < "u") {
    if (typeof r != "function")
      throw new Error(process.env.NODE_ENV === "production" ? b(1) : "Expected the enhancer to be a function. Instead, received: '" + _(r) + "'");
    return r(Ge)(t, e);
  }
  if (typeof t != "function")
    throw new Error(process.env.NODE_ENV === "production" ? b(2) : "Expected the root reducer to be a function. Instead, received: '" + _(t) + "'");
  var i = t, o = e, s = [], a = s, c = !1;
  function d() {
    a === s && (a = s.slice());
  }
  function p() {
    if (c)
      throw new Error(process.env.NODE_ENV === "production" ? b(3) : "You may not call store.getState() while the reducer is executing. The reducer has already received the state as an argument. Pass it down from the top reducer instead of reading it from the store.");
    return o;
  }
  function y(f) {
    if (typeof f != "function")
      throw new Error(process.env.NODE_ENV === "production" ? b(4) : "Expected the listener to be a function. Instead, received: '" + _(f) + "'");
    if (c)
      throw new Error(process.env.NODE_ENV === "production" ? b(5) : "You may not call store.subscribe() while the reducer is executing. If you would like to be notified after the store has been updated, subscribe from a component and invoke store.getState() in the callback to access the latest state. See https://redux.js.org/api/store#subscribelistener for more details.");
    var v = !0;
    return d(), a.push(f), function() {
      if (v) {
        if (c)
          throw new Error(process.env.NODE_ENV === "production" ? b(6) : "You may not unsubscribe from a store listener while the reducer is executing. See https://redux.js.org/api/store#subscribelistener for more details.");
        v = !1, d();
        var T = a.indexOf(f);
        a.splice(T, 1), s = null;
      }
    };
  }
  function h(f) {
    if (!Xt(f))
      throw new Error(process.env.NODE_ENV === "production" ? b(7) : "Actions must be plain objects. Instead, the actual type was: '" + _(f) + "'. You may need to add middleware to your store setup to handle dispatching other values, such as 'redux-thunk' to handle dispatching functions. See https://redux.js.org/tutorials/fundamentals/part-4-store#middleware and https://redux.js.org/tutorials/fundamentals/part-6-async-logic#using-the-redux-thunk-middleware for examples.");
    if (typeof f.type > "u")
      throw new Error(process.env.NODE_ENV === "production" ? b(8) : 'Actions may not have an undefined "type" property. You may have misspelled an action type string constant.');
    if (c)
      throw new Error(process.env.NODE_ENV === "production" ? b(9) : "Reducers may not dispatch actions.");
    try {
      c = !0, o = i(o, f);
    } finally {
      c = !1;
    }
    for (var v = s = a, O = 0; O < v.length; O++) {
      var T = v[O];
      T();
    }
    return f;
  }
  function u(f) {
    if (typeof f != "function")
      throw new Error(process.env.NODE_ENV === "production" ? b(10) : "Expected the nextReducer to be a function. Instead, received: '" + _(f));
    i = f, h({
      type: me.REPLACE
    });
  }
  function m() {
    var f, v = y;
    return f = {
      /**
       * The minimal observable subscription method.
       * @param {Object} observer Any object that can be used as an observer.
       * The observer object should have a `next` method.
       * @returns {subscription} An object with an `unsubscribe` method that can
       * be used to unsubscribe the observable from the store, and prevent further
       * emission of values from the observable.
       */
      subscribe: function(T) {
        if (typeof T != "object" || T === null)
          throw new Error(process.env.NODE_ENV === "production" ? b(11) : "Expected the observer to be an object. Instead, received: '" + _(T) + "'");
        function w() {
          T.next && T.next(p());
        }
        w();
        var W = v(w);
        return {
          unsubscribe: W
        };
      }
    }, f[ve] = function() {
      return this;
    }, f;
  }
  return h({
    type: me.INIT
  }), n = {
    dispatch: h,
    subscribe: y,
    getState: p,
    replaceReducer: u
  }, n[ve] = m, n;
}
const Zt = (t, e) => t === e;
function er(t, e) {
  return !t && !e ? !0 : !t || !e ? !1 : t.x === e.x && t.y === e.y;
}
function tr(t, e, r = Zt) {
  if (t.length !== e.length)
    return !1;
  for (let n = 0; n < t.length; ++n)
    if (!r(t[n], e[n]))
      return !1;
  return !0;
}
function rr(t, e, r) {
  return e in t ? Object.defineProperty(t, e, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : t[e] = r, t;
}
function nr(t) {
  for (var e = 1; e < arguments.length; e++) {
    var r = arguments[e] != null ? arguments[e] : {}, n = Object.keys(r);
    typeof Object.getOwnPropertySymbols == "function" && (n = n.concat(Object.getOwnPropertySymbols(r).filter(function(i) {
      return Object.getOwnPropertyDescriptor(r, i).enumerable;
    }))), n.forEach(function(i) {
      rr(t, i, r[i]);
    });
  }
  return t;
}
const ye = {
  initialSourceClientOffset: null,
  initialClientOffset: null,
  clientOffset: null
};
function ir(t = ye, e) {
  const { payload: r } = e;
  switch (e.type) {
    case se:
    case F:
      return {
        initialSourceClientOffset: r.sourceClientOffset,
        initialClientOffset: r.clientOffset,
        clientOffset: r.clientOffset
      };
    case V:
      return er(t.clientOffset, r.clientOffset) ? t : nr({}, t, {
        clientOffset: r.clientOffset
      });
    case B:
    case q:
      return ye;
    default:
      return t;
  }
}
const ue = "dnd-core/ADD_SOURCE", ce = "dnd-core/ADD_TARGET", le = "dnd-core/REMOVE_SOURCE", G = "dnd-core/REMOVE_TARGET";
function or(t) {
  return {
    type: ue,
    payload: {
      sourceId: t
    }
  };
}
function sr(t) {
  return {
    type: ce,
    payload: {
      targetId: t
    }
  };
}
function ar(t) {
  return {
    type: le,
    payload: {
      sourceId: t
    }
  };
}
function ur(t) {
  return {
    type: G,
    payload: {
      targetId: t
    }
  };
}
function cr(t, e, r) {
  return e in t ? Object.defineProperty(t, e, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : t[e] = r, t;
}
function N(t) {
  for (var e = 1; e < arguments.length; e++) {
    var r = arguments[e] != null ? arguments[e] : {}, n = Object.keys(r);
    typeof Object.getOwnPropertySymbols == "function" && (n = n.concat(Object.getOwnPropertySymbols(r).filter(function(i) {
      return Object.getOwnPropertyDescriptor(r, i).enumerable;
    }))), n.forEach(function(i) {
      cr(t, i, r[i]);
    });
  }
  return t;
}
const lr = {
  itemType: null,
  item: null,
  sourceId: null,
  targetIds: [],
  dropResult: null,
  didDrop: !1,
  isSourcePublic: null
};
function dr(t = lr, e) {
  const { payload: r } = e;
  switch (e.type) {
    case F:
      return N({}, t, {
        itemType: r.itemType,
        item: r.item,
        sourceId: r.sourceId,
        isSourcePublic: r.isSourcePublic,
        dropResult: null,
        didDrop: !1
      });
    case ae:
      return N({}, t, {
        isSourcePublic: !0
      });
    case V:
      return N({}, t, {
        targetIds: r.targetIds
      });
    case G:
      return t.targetIds.indexOf(r.targetId) === -1 ? t : N({}, t, {
        targetIds: Tt(t.targetIds, r.targetId)
      });
    case q:
      return N({}, t, {
        dropResult: r.dropResult,
        didDrop: !0,
        targetIds: []
      });
    case B:
      return N({}, t, {
        itemType: null,
        item: null,
        sourceId: null,
        dropResult: null,
        didDrop: !1,
        isSourcePublic: null,
        targetIds: []
      });
    default:
      return t;
  }
}
function fr(t = 0, e) {
  switch (e.type) {
    case ue:
    case ce:
      return t + 1;
    case le:
    case G:
      return t - 1;
    default:
      return t;
  }
}
const M = [], de = [];
M.__IS_NONE__ = !0;
de.__IS_ALL__ = !0;
function gr(t, e) {
  return t === M ? !1 : t === de || typeof e > "u" ? !0 : It(e, t).length > 0;
}
function hr(t = M, e) {
  switch (e.type) {
    case V:
      break;
    case ue:
    case ce:
    case G:
    case le:
      return M;
    case F:
    case ae:
    case B:
    case q:
    default:
      return de;
  }
  const { targetIds: r = [], prevTargetIds: n = [] } = e.payload, i = bt(r, n);
  if (!(i.length > 0 || !tr(r, n)))
    return M;
  const s = n[n.length - 1], a = r[r.length - 1];
  return s !== a && (s && i.push(s), a && i.push(a)), i;
}
function pr(t = 0) {
  return t + 1;
}
function vr(t, e, r) {
  return e in t ? Object.defineProperty(t, e, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : t[e] = r, t;
}
function mr(t) {
  for (var e = 1; e < arguments.length; e++) {
    var r = arguments[e] != null ? arguments[e] : {}, n = Object.keys(r);
    typeof Object.getOwnPropertySymbols == "function" && (n = n.concat(Object.getOwnPropertySymbols(r).filter(function(i) {
      return Object.getOwnPropertyDescriptor(r, i).enumerable;
    }))), n.forEach(function(i) {
      vr(t, i, r[i]);
    });
  }
  return t;
}
function yr(t = {}, e) {
  return {
    dirtyHandlerIds: hr(t.dirtyHandlerIds, {
      type: e.type,
      payload: mr({}, e.payload, {
        prevTargetIds: St(t, "dragOperation.targetIds", [])
      })
    }),
    dragOffset: ir(t.dragOffset, e),
    refCount: fr(t.refCount, e),
    dragOperation: dr(t.dragOperation, e),
    stateId: pr(t.stateId)
  };
}
function Dr(t, e) {
  return {
    x: t.x + e.x,
    y: t.y + e.y
  };
}
function We(t, e) {
  return {
    x: t.x - e.x,
    y: t.y - e.y
  };
}
function Or(t) {
  const { clientOffset: e, initialClientOffset: r, initialSourceClientOffset: n } = t;
  return !e || !r || !n ? null : We(Dr(e, n), r);
}
function Sr(t) {
  const { clientOffset: e, initialClientOffset: r } = t;
  return !e || !r ? null : We(e, r);
}
class Tr {
  subscribeToStateChange(e, r = {}) {
    const { handlerIds: n } = r;
    g(typeof e == "function", "listener must be a function."), g(typeof n > "u" || Array.isArray(n), "handlerIds, when specified, must be an array of strings.");
    let i = this.store.getState().stateId;
    const o = () => {
      const s = this.store.getState(), a = s.stateId;
      try {
        a === i || a === i + 1 && !gr(s.dirtyHandlerIds, n) || e();
      } finally {
        i = a;
      }
    };
    return this.store.subscribe(o);
  }
  subscribeToOffsetChange(e) {
    g(typeof e == "function", "listener must be a function.");
    let r = this.store.getState().dragOffset;
    const n = () => {
      const i = this.store.getState().dragOffset;
      i !== r && (r = i, e());
    };
    return this.store.subscribe(n);
  }
  canDragSource(e) {
    if (!e)
      return !1;
    const r = this.registry.getSource(e);
    return g(r, `Expected to find a valid source. sourceId=${e}`), this.isDragging() ? !1 : r.canDrag(this, e);
  }
  canDropOnTarget(e) {
    if (!e)
      return !1;
    const r = this.registry.getTarget(e);
    if (g(r, `Expected to find a valid target. targetId=${e}`), !this.isDragging() || this.didDrop())
      return !1;
    const n = this.registry.getTargetType(e), i = this.getItemType();
    return te(n, i) && r.canDrop(this, e);
  }
  isDragging() {
    return !!this.getItemType();
  }
  isDraggingSource(e) {
    if (!e)
      return !1;
    const r = this.registry.getSource(e, !0);
    if (g(r, `Expected to find a valid source. sourceId=${e}`), !this.isDragging() || !this.isSourcePublic())
      return !1;
    const n = this.registry.getSourceType(e), i = this.getItemType();
    return n !== i ? !1 : r.isDragging(this, e);
  }
  isOverTarget(e, r = {
    shallow: !1
  }) {
    if (!e)
      return !1;
    const { shallow: n } = r;
    if (!this.isDragging())
      return !1;
    const i = this.registry.getTargetType(e), o = this.getItemType();
    if (o && !te(i, o))
      return !1;
    const s = this.getTargetIds();
    if (!s.length)
      return !1;
    const a = s.indexOf(e);
    return n ? a === s.length - 1 : a > -1;
  }
  getItemType() {
    return this.store.getState().dragOperation.itemType;
  }
  getItem() {
    return this.store.getState().dragOperation.item;
  }
  getSourceId() {
    return this.store.getState().dragOperation.sourceId;
  }
  getTargetIds() {
    return this.store.getState().dragOperation.targetIds;
  }
  getDropResult() {
    return this.store.getState().dragOperation.dropResult;
  }
  didDrop() {
    return this.store.getState().dragOperation.didDrop;
  }
  isSourcePublic() {
    return !!this.store.getState().dragOperation.isSourcePublic;
  }
  getInitialClientOffset() {
    return this.store.getState().dragOffset.initialClientOffset;
  }
  getInitialSourceClientOffset() {
    return this.store.getState().dragOffset.initialSourceClientOffset;
  }
  getClientOffset() {
    return this.store.getState().dragOffset.clientOffset;
  }
  getSourceClientOffset() {
    return Or(this.store.getState().dragOffset);
  }
  getDifferenceFromInitialOffset() {
    return Sr(this.store.getState().dragOffset);
  }
  constructor(e, r) {
    this.store = e, this.registry = r;
  }
}
let br = 0;
function Ir() {
  return br++;
}
function Er(t) {
  g(typeof t.canDrag == "function", "Expected canDrag to be a function."), g(typeof t.beginDrag == "function", "Expected beginDrag to be a function."), g(typeof t.endDrag == "function", "Expected endDrag to be a function.");
}
function wr(t) {
  g(typeof t.canDrop == "function", "Expected canDrop to be a function."), g(typeof t.hover == "function", "Expected hover to be a function."), g(typeof t.drop == "function", "Expected beginDrag to be a function.");
}
function re(t, e) {
  if (e && Array.isArray(t)) {
    t.forEach(
      (r) => re(r, !1)
    );
    return;
  }
  g(typeof t == "string" || typeof t == "symbol", e ? "Type can only be a string, a symbol, or an array of either." : "Type can only be a string or a symbol.");
}
const De = typeof global < "u" ? global : self, Ye = De.MutationObserver || De.WebKitMutationObserver;
function Xe(t) {
  return function() {
    const r = setTimeout(i, 0), n = setInterval(i, 50);
    function i() {
      clearTimeout(r), clearInterval(n), t();
    }
  };
}
function Cr(t) {
  let e = 1;
  const r = new Ye(t), n = document.createTextNode("");
  return r.observe(n, {
    characterData: !0
  }), function() {
    e = -e, n.data = e;
  };
}
const _r = typeof Ye == "function" ? (
  // reliably everywhere they are implemented.
  // They are implemented in all modern browsers.
  //
  // - Android 4-4.3
  // - Chrome 26-34
  // - Firefox 14-29
  // - Internet Explorer 11
  // - iPad Safari 6-7.1
  // - iPhone Safari 7-7.1
  // - Safari 6-7
  Cr
) : (
  // task queue, are implemented in Internet Explorer 10, Safari 5.0-1, and Opera
  // 11-12, and in web workers in many engines.
  // Although message channels yield to any queued rendering and IO tasks, they
  // would be better than imposing the 4ms delay of timers.
  // However, they do not work reliably in Internet Explorer or Safari.
  // Internet Explorer 10 is the only browser that has setImmediate but does
  // not have MutationObservers.
  // Although setImmediate yields to the browser's renderer, it would be
  // preferrable to falling back to setTimeout since it does not have
  // the minimum 4ms penalty.
  // Unfortunately there appears to be a bug in Internet Explorer 10 Mobile (and
  // Desktop to a lesser extent) that renders both setImmediate and
  // MessageChannel useless for the purposes of ASAP.
  // https://github.com/kriskowal/q/issues/396
  // Timers are implemented universally.
  // We fall back to timers in workers in most engines, and in foreground
  // contexts in the following browsers.
  // However, note that even this simple case requires nuances to operate in a
  // broad spectrum of browsers.
  //
  // - Firefox 3-13
  // - Internet Explorer 6-9
  // - iPad Safari 4.3
  // - Lynx 2.8.7
  Xe
);
class Nr {
  // Use the fastest means possible to execute a task in its own turn, with
  // priority over other events including IO, animation, reflow, and redraw
  // events in browsers.
  //
  // An exception thrown by a task will permanently interrupt the processing of
  // subsequent tasks. The higher level `asap` function ensures that if an
  // exception is thrown by a task, that the task queue will continue flushing as
  // soon as possible, but if you use `rawAsap` directly, you are responsible to
  // either ensure that no exceptions are thrown from your task, or to manually
  // call `rawAsap.requestFlush` if an exception is thrown.
  enqueueTask(e) {
    const { queue: r, requestFlush: n } = this;
    r.length || (n(), this.flushing = !0), r[r.length] = e;
  }
  constructor() {
    this.queue = [], this.pendingErrors = [], this.flushing = !1, this.index = 0, this.capacity = 1024, this.flush = () => {
      const { queue: e } = this;
      for (; this.index < e.length; ) {
        const r = this.index;
        if (this.index++, e[r].call(), this.index > this.capacity) {
          for (let n = 0, i = e.length - this.index; n < i; n++)
            e[n] = e[n + this.index];
          e.length -= this.index, this.index = 0;
        }
      }
      e.length = 0, this.index = 0, this.flushing = !1;
    }, this.registerPendingError = (e) => {
      this.pendingErrors.push(e), this.requestErrorThrow();
    }, this.requestFlush = _r(this.flush), this.requestErrorThrow = Xe(() => {
      if (this.pendingErrors.length)
        throw this.pendingErrors.shift();
    });
  }
}
class Pr {
  call() {
    try {
      this.task && this.task();
    } catch (e) {
      this.onError(e);
    } finally {
      this.task = null, this.release(this);
    }
  }
  constructor(e, r) {
    this.onError = e, this.release = r, this.task = null;
  }
}
class xr {
  create(e) {
    const r = this.freeTasks, n = r.length ? r.pop() : new Pr(
      this.onError,
      (i) => r[r.length] = i
    );
    return n.task = e, n;
  }
  constructor(e) {
    this.onError = e, this.freeTasks = [];
  }
}
const ze = new Nr(), Rr = new xr(ze.registerPendingError);
function Ar(t) {
  ze.enqueueTask(Rr.create(t));
}
function Mr(t) {
  const e = Ir().toString();
  switch (t) {
    case I.SOURCE:
      return `S${e}`;
    case I.TARGET:
      return `T${e}`;
    default:
      throw new Error(`Unknown Handler Role: ${t}`);
  }
}
function Oe(t) {
  switch (t[0]) {
    case "S":
      return I.SOURCE;
    case "T":
      return I.TARGET;
    default:
      throw new Error(`Cannot parse handler ID: ${t}`);
  }
}
function Se(t, e) {
  const r = t.entries();
  let n = !1;
  do {
    const { done: i, value: [, o] } = r.next();
    if (o === e)
      return !0;
    n = !!i;
  } while (!n);
  return !1;
}
class kr {
  addSource(e, r) {
    re(e), Er(r);
    const n = this.addHandler(I.SOURCE, e, r);
    return this.store.dispatch(or(n)), n;
  }
  addTarget(e, r) {
    re(e, !0), wr(r);
    const n = this.addHandler(I.TARGET, e, r);
    return this.store.dispatch(sr(n)), n;
  }
  containsHandler(e) {
    return Se(this.dragSources, e) || Se(this.dropTargets, e);
  }
  getSource(e, r = !1) {
    return g(this.isSourceId(e), "Expected a valid source ID."), r && e === this.pinnedSourceId ? this.pinnedSource : this.dragSources.get(e);
  }
  getTarget(e) {
    return g(this.isTargetId(e), "Expected a valid target ID."), this.dropTargets.get(e);
  }
  getSourceType(e) {
    return g(this.isSourceId(e), "Expected a valid source ID."), this.types.get(e);
  }
  getTargetType(e) {
    return g(this.isTargetId(e), "Expected a valid target ID."), this.types.get(e);
  }
  isSourceId(e) {
    return Oe(e) === I.SOURCE;
  }
  isTargetId(e) {
    return Oe(e) === I.TARGET;
  }
  removeSource(e) {
    g(this.getSource(e), "Expected an existing source."), this.store.dispatch(ar(e)), Ar(() => {
      this.dragSources.delete(e), this.types.delete(e);
    });
  }
  removeTarget(e) {
    g(this.getTarget(e), "Expected an existing target."), this.store.dispatch(ur(e)), this.dropTargets.delete(e), this.types.delete(e);
  }
  pinSource(e) {
    const r = this.getSource(e);
    g(r, "Expected an existing source."), this.pinnedSourceId = e, this.pinnedSource = r;
  }
  unpinSource() {
    g(this.pinnedSource, "No source is pinned at the time."), this.pinnedSourceId = null, this.pinnedSource = null;
  }
  addHandler(e, r, n) {
    const i = Mr(e);
    return this.types.set(i, r), e === I.SOURCE ? this.dragSources.set(i, n) : e === I.TARGET && this.dropTargets.set(i, n), i;
  }
  constructor(e) {
    this.types = /* @__PURE__ */ new Map(), this.dragSources = /* @__PURE__ */ new Map(), this.dropTargets = /* @__PURE__ */ new Map(), this.pinnedSourceId = null, this.pinnedSource = null, this.store = e;
  }
}
function Lr(t, e = void 0, r = {}, n = !1) {
  const i = Hr(n), o = new Tr(i, new kr(i)), s = new Yt(i, o), a = t(s, e, r);
  return s.receiveBackend(a), s;
}
function Hr(t) {
  const e = typeof window < "u" && window.__REDUX_DEVTOOLS_EXTENSION__;
  return Ge(yr, t && e && e({
    name: "dnd-core",
    instanceId: "dnd-core"
  }));
}
function Te(t, e) {
  (e == null || e > t.length) && (e = t.length);
  for (var r = 0, n = new Array(e); r < e; r++)
    n[r] = t[r];
  return n;
}
function $r(t) {
  if (Array.isArray(t))
    return t;
}
function jr(t, e) {
  var r = t == null ? null : typeof Symbol < "u" && t[Symbol.iterator] || t["@@iterator"];
  if (r != null) {
    var n = [], i = !0, o = !1, s, a;
    try {
      for (r = r.call(t); !(i = (s = r.next()).done) && (n.push(s.value), !(e && n.length === e)); i = !0)
        ;
    } catch (c) {
      o = !0, a = c;
    } finally {
      try {
        !i && r.return != null && r.return();
      } finally {
        if (o)
          throw a;
      }
    }
    return n;
  }
}
function Ur() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function Fr(t, e) {
  return $r(t) || jr(t, e) || Vr(t, e) || Ur();
}
function Vr(t, e) {
  if (t) {
    if (typeof t == "string")
      return Te(t, e);
    var r = Object.prototype.toString.call(t).slice(8, -1);
    if (r === "Object" && t.constructor && (r = t.constructor.name), r === "Map" || r === "Set")
      return Array.from(r);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))
      return Te(t, e);
  }
}
var be = 0, $ = Symbol.for("__VUE_DND_CONTEXT_INSTANCE__");
function qr(t) {
  return "manager" in t && t.manager;
}
function Br(t) {
  if (qr(t)) {
    var e = t.manager;
    return [
      e,
      !1
    ];
  }
  var r = Gr(t.backend, t.context, t.options, t.debugMode), n = !t.context;
  return [
    r,
    n
  ];
}
function Gr(t) {
  var e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : Qe(), r = arguments.length > 2 ? arguments[2] : void 0, n = arguments.length > 3 ? arguments[3] : void 0, i = e;
  return i[$] || (i[$] = Lr(t, e, r, n)), i[$];
}
function Qe() {
  return typeof globalThis < "u" ? globalThis : typeof global < "u" ? global : window;
}
const Wr = k({
  name: "DndProvider",
  props: {
    manager: {
      type: Object
    },
    backend: {
      type: Function
    },
    context: {
      type: Object
    },
    options: {
      type: Object
    },
    debugMode: {
      type: Boolean
    }
  },
  setup: function(e, r) {
    var n = r.slots, i = Fr(Br(e), 2), o = i[0], s = i[1];
    s && ++be, lt(function() {
      if (s) {
        var c = Qe();
        --be === 0 && (c[$] = null);
      }
    }), yt(o);
    var a;
    return function() {
      var c;
      return (a = (c = n.default) === null || c === void 0 ? void 0 : c.call(n)) !== null && a !== void 0 ? a : null;
    };
  }
});
k({
  props: {
    connect: {
      type: Function,
      required: !0
    },
    src: {
      type: String,
      required: !0
    }
  },
  setup: function(e) {
    return E(function() {
      if (!(typeof Image > "u")) {
        var r = !1, n = new Image();
        return n.src = e.src, n.onload = function() {
          e.connect(n), r = !0;
        }, function() {
          r && e.connect(null);
        };
      }
    }), function() {
      return null;
    };
  }
});
function Yr(t, e) {
  if (!(t instanceof e))
    throw new TypeError("Cannot call a class as a function");
}
var X = !1, z = !1, Xr = /* @__PURE__ */ function() {
  function t(r) {
    Yr(this, t), this.sourceId = null, this.internalMonitor = r.getMonitor();
  }
  var e = t.prototype;
  return e.receiveHandlerId = function(n) {
    this.sourceId = n;
  }, e.getHandlerId = function() {
    return this.sourceId;
  }, e.canDrag = function() {
    g(!X, "You may not call monitor.canDrag() inside your canDrag() implementation. Read more: http://react-dnd.github.io/react-dnd/docs/api/drag-source-monitor");
    try {
      return X = !0, this.internalMonitor.canDragSource(this.sourceId);
    } finally {
      X = !1;
    }
  }, e.isDragging = function() {
    if (!this.sourceId)
      return !1;
    g(!z, "You may not call monitor.isDragging() inside your isDragging() implementation. Read more: http://react-dnd.github.io/react-dnd/docs/api/drag-source-monitor");
    try {
      return z = !0, this.internalMonitor.isDraggingSource(this.sourceId);
    } finally {
      z = !1;
    }
  }, e.subscribeToStateChange = function(n, i) {
    return this.internalMonitor.subscribeToStateChange(n, i);
  }, e.isDraggingSource = function(n) {
    return this.internalMonitor.isDraggingSource(n);
  }, e.isOverTarget = function(n, i) {
    return this.internalMonitor.isOverTarget(n, i);
  }, e.getTargetIds = function() {
    return this.internalMonitor.getTargetIds();
  }, e.isSourcePublic = function() {
    return this.internalMonitor.isSourcePublic();
  }, e.getSourceId = function() {
    return this.internalMonitor.getSourceId();
  }, e.subscribeToOffsetChange = function(n) {
    return this.internalMonitor.subscribeToOffsetChange(n);
  }, e.canDragSource = function(n) {
    return this.internalMonitor.canDragSource(n);
  }, e.canDropOnTarget = function(n) {
    return this.internalMonitor.canDropOnTarget(n);
  }, e.getItemType = function() {
    return this.internalMonitor.getItemType();
  }, e.getItem = function() {
    return this.internalMonitor.getItem();
  }, e.getDropResult = function() {
    return this.internalMonitor.getDropResult();
  }, e.didDrop = function() {
    return this.internalMonitor.didDrop();
  }, e.getInitialClientOffset = function() {
    return this.internalMonitor.getInitialClientOffset();
  }, e.getInitialSourceClientOffset = function() {
    return this.internalMonitor.getInitialSourceClientOffset();
  }, e.getSourceClientOffset = function() {
    return this.internalMonitor.getSourceClientOffset();
  }, e.getClientOffset = function() {
    return this.internalMonitor.getClientOffset();
  }, e.getDifferenceFromInitialOffset = function() {
    return this.internalMonitor.getDifferenceFromInitialOffset();
  }, t;
}();
function zr(t, e) {
  if (!(t instanceof e))
    throw new TypeError("Cannot call a class as a function");
}
var Q = !1, Qr = /* @__PURE__ */ function() {
  function t(r) {
    zr(this, t), this.targetId = null, this.internalMonitor = r.getMonitor();
  }
  var e = t.prototype;
  return e.receiveHandlerId = function(n) {
    this.targetId = n;
  }, e.getHandlerId = function() {
    return this.targetId;
  }, e.subscribeToStateChange = function(n, i) {
    return this.internalMonitor.subscribeToStateChange(n, i);
  }, e.canDrop = function() {
    if (!this.targetId)
      return !1;
    g(!Q, "You may not call monitor.canDrop() inside your canDrop() implementation. Read more: http://react-dnd.github.io/react-dnd/docs/api/drop-target-monitor");
    try {
      return Q = !0, this.internalMonitor.canDropOnTarget(this.targetId);
    } finally {
      Q = !1;
    }
  }, e.isOver = function(n) {
    return this.targetId ? this.internalMonitor.isOverTarget(this.targetId, n) : !1;
  }, e.getItemType = function() {
    return this.internalMonitor.getItemType();
  }, e.getItem = function() {
    return this.internalMonitor.getItem();
  }, e.getDropResult = function() {
    return this.internalMonitor.getDropResult();
  }, e.didDrop = function() {
    return this.internalMonitor.didDrop();
  }, e.getInitialClientOffset = function() {
    return this.internalMonitor.getInitialClientOffset();
  }, e.getInitialSourceClientOffset = function() {
    return this.internalMonitor.getInitialSourceClientOffset();
  }, e.getSourceClientOffset = function() {
    return this.internalMonitor.getSourceClientOffset();
  }, e.getClientOffset = function() {
    return this.internalMonitor.getClientOffset();
  }, e.getDifferenceFromInitialOffset = function() {
    return this.internalMonitor.getDifferenceFromInitialOffset();
  }, t;
}(), Kr = function(t) {
  return t && typeof Symbol < "u" && t.constructor === Symbol ? "symbol" : typeof t;
};
function Jr(t) {
  return t ? t.__v_isVNode === !0 : !1;
}
function Zr(t) {
  return t ? t.__v_skip : !1;
}
function en(t) {
  return Jr(t) && Kr(t.type) !== "symbol";
}
function tn() {
  throw new Error("Only native element nodes can now be passed to Vue DnD connectors.You can either wrap Component into a <div>, or turn it into a drag source or a drop target itself.");
}
function rn(t) {
  return function() {
    var e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : null, r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null;
    if (Zr(e) && tn(), !en(e)) {
      var n = e;
      return t(n, r), n;
    }
  };
}
function Ke(t) {
  var e = {};
  return Object.keys(t).forEach(function(r) {
    var n = t[r];
    if (r.endsWith("Ref"))
      e[r] = t[r];
    else {
      var i = rn(n);
      e[r] = function() {
        return i;
      };
    }
  }), e;
}
function ne(t, e, r, n) {
  let i = r ? r.call(n, t, e) : void 0;
  if (i !== void 0)
    return !!i;
  if (t === e)
    return !0;
  if (typeof t != "object" || !t || typeof e != "object" || !e)
    return !1;
  const o = Object.keys(t), s = Object.keys(e);
  if (o.length !== s.length)
    return !1;
  const a = Object.prototype.hasOwnProperty.bind(e);
  for (let c = 0; c < o.length; c++) {
    const d = o[c];
    if (!a(d))
      return !1;
    const p = t[d], y = e[d];
    if (i = r ? r.call(n, p, y, d) : void 0, i === !1 || i === void 0 && p !== y)
      return !1;
  }
  return !0;
}
function nn(t, e) {
  if (!(t instanceof e))
    throw new TypeError("Cannot call a class as a function");
}
function Ie(t, e) {
  for (var r = 0; r < e.length; r++) {
    var n = e[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, n.key, n);
  }
}
function on(t, e, r) {
  return e && Ie(t.prototype, e), r && Ie(t, r), t;
}
var sn = /* @__PURE__ */ function() {
  function t(r) {
    var n = this;
    nn(this, t), this.hooks = Ke({
      dragSource: function(i, o) {
        n.clearDragSource(), n.dragSourceOptions = o || null, n.dragSourceNode = i, n.reconnectDragSource();
      },
      dragPreview: function(i, o) {
        n.clearDragPreview(), n.dragPreviewOptions = o || null, n.dragPreviewNode = i, n.reconnectDragPreview();
      }
    }), this.handlerId = null, this.dragSourceOptionsInternal = null, this.dragPreviewOptionsInternal = null, this.lastConnectedHandlerId = null, this.lastConnectedDragSource = null, this.lastConnectedDragSourceOptions = null, this.lastConnectedDragPreview = null, this.lastConnectedDragPreviewOptions = null, this.backend = r;
  }
  var e = t.prototype;
  return e.receiveHandlerId = function(n) {
    this.handlerId !== n && (this.handlerId = n, this.reconnect());
  }, e.reconnect = function() {
    var n = this.reconnectDragSource();
    this.reconnectDragPreview(n);
  }, e.reconnectDragSource = function() {
    var n = this.dragSource, i = this.didHandlerIdChange() || this.didConnectedDragSourceChange() || this.didDragSourceOptionsChange();
    return i && this.disconnectDragSource(), this.handlerId ? n ? (i && (this.lastConnectedHandlerId = this.handlerId, this.lastConnectedDragSource = n, this.lastConnectedDragSourceOptions = this.dragSourceOptions, this.dragSourceUnsubscribe = this.backend.connectDragSource(this.handlerId, n, this.dragSourceOptions)), i) : (this.lastConnectedDragSource = n, i) : i;
  }, e.reconnectDragPreview = function() {
    var n = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !1, i = this.dragPreview, o = n || this.didHandlerIdChange() || this.didConnectedDragPreviewChange() || this.didDragPreviewOptionsChange();
    if (o && this.disconnectDragPreview(), !!this.handlerId) {
      if (!i) {
        this.lastConnectedDragPreview = i;
        return;
      }
      o && (this.lastConnectedHandlerId = this.handlerId, this.lastConnectedDragPreview = i, this.lastConnectedDragPreviewOptions = this.dragPreviewOptions, this.dragPreviewUnsubscribe = this.backend.connectDragPreview(this.handlerId, i, this.dragPreviewOptions));
    }
  }, e.didHandlerIdChange = function() {
    return this.lastConnectedHandlerId !== this.handlerId;
  }, e.didConnectedDragSourceChange = function() {
    return this.lastConnectedDragSource !== this.dragSource;
  }, e.didConnectedDragPreviewChange = function() {
    return this.lastConnectedDragPreview !== this.dragPreview;
  }, e.didDragSourceOptionsChange = function() {
    return !ne(this.lastConnectedDragSourceOptions, this.dragSourceOptions);
  }, e.didDragPreviewOptionsChange = function() {
    return !ne(this.lastConnectedDragPreviewOptions, this.dragPreviewOptions);
  }, e.disconnectDragSource = function() {
    this.dragSourceUnsubscribe && (this.dragSourceUnsubscribe(), this.dragSourceUnsubscribe = void 0);
  }, e.disconnectDragPreview = function() {
    this.dragPreviewUnsubscribe && (this.dragPreviewUnsubscribe(), this.dragPreviewUnsubscribe = void 0, this.dragPreviewNode = null);
  }, e.clearDragSource = function() {
    this.dragSourceNode = null;
  }, e.clearDragPreview = function() {
    this.dragPreviewNode = null;
  }, on(t, [
    {
      key: "connectTarget",
      get: function() {
        return this.dragSource;
      }
    },
    {
      key: "dragSourceOptions",
      get: function() {
        return this.dragSourceOptionsInternal;
      },
      set: function(n) {
        this.dragSourceOptionsInternal = n;
      }
    },
    {
      key: "dragPreviewOptions",
      get: function() {
        return this.dragPreviewOptionsInternal;
      },
      set: function(n) {
        this.dragPreviewOptionsInternal = n;
      }
    },
    {
      key: "dragSource",
      get: function() {
        return this.dragSourceNode;
      }
    },
    {
      key: "dragPreview",
      get: function() {
        return this.dragPreviewNode;
      }
    }
  ]), t;
}();
function an(t, e) {
  if (!(t instanceof e))
    throw new TypeError("Cannot call a class as a function");
}
function Ee(t, e) {
  for (var r = 0; r < e.length; r++) {
    var n = e[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, n.key, n);
  }
}
function un(t, e, r) {
  return e && Ee(t.prototype, e), r && Ee(t, r), t;
}
var cn = /* @__PURE__ */ function() {
  function t(r) {
    var n = this;
    an(this, t), this.hooks = Ke({
      dropTarget: function(i, o) {
        n.clearDropTarget(), n.dropTargetOptions = o, Fe(i) ? n.dropTargetRef = i : n.dropTargetNode = i, n.reconnect();
      }
    }), this.handlerId = null, this.dropTargetRef = null, this.dropTargetOptionsInternal = null, this.lastConnectedHandlerId = null, this.lastConnectedDropTarget = null, this.lastConnectedDropTargetOptions = null, this.backend = r;
  }
  var e = t.prototype;
  return e.reconnect = function() {
    var n = this.didHandlerIdChange() || this.didDropTargetChange() || this.didOptionsChange();
    n && this.disconnectDropTarget();
    var i = this.dropTarget;
    if (this.handlerId) {
      if (!i) {
        this.lastConnectedDropTarget = i;
        return;
      }
      n && (this.lastConnectedHandlerId = this.handlerId, this.lastConnectedDropTarget = i, this.lastConnectedDropTargetOptions = this.dropTargetOptions, this.unsubscribeDropTarget = this.backend.connectDropTarget(this.handlerId, i, this.dropTargetOptions));
    }
  }, e.receiveHandlerId = function(n) {
    n !== this.handlerId && (this.handlerId = n, this.reconnect());
  }, e.didHandlerIdChange = function() {
    return this.lastConnectedHandlerId !== this.handlerId;
  }, e.didDropTargetChange = function() {
    return this.lastConnectedDropTarget !== this.dropTarget;
  }, e.didOptionsChange = function() {
    return !ne(this.lastConnectedDropTargetOptions, this.dropTargetOptions);
  }, e.disconnectDropTarget = function() {
    this.unsubscribeDropTarget && (this.unsubscribeDropTarget(), this.unsubscribeDropTarget = void 0);
  }, e.clearDropTarget = function() {
    this.dropTargetRef = null, this.dropTargetNode = null;
  }, un(t, [
    {
      key: "connectTarget",
      get: function() {
        return this.dropTarget;
      }
    },
    {
      key: "dropTargetOptions",
      get: function() {
        return this.dropTargetOptionsInternal;
      },
      set: function(n) {
        this.dropTargetOptionsInternal = n;
      }
    },
    {
      key: "dropTarget",
      get: function() {
        return this.dropTargetNode || this.dropTargetRef && this.dropTargetRef.value;
      }
    }
  ]), t;
}();
function ln(t, e, r) {
  var n = l(r).getRegistry(), i = n.addTarget(l(t), l(e));
  return [
    i,
    function() {
      return n.removeTarget(i);
    }
  ];
}
function dn(t, e, r) {
  var n = r.getRegistry(), i = n.addSource(t, e);
  return [
    i,
    function() {
      return n.removeSource(i);
    }
  ];
}
function fn(t, e) {
  if (!(t instanceof e))
    throw new TypeError("Cannot call a class as a function");
}
var gn = /* @__PURE__ */ function() {
  function t(r, n, i) {
    fn(this, t), this.spec = r, this.monitor = n, this.connector = i;
  }
  var e = t.prototype;
  return e.beginDrag = function() {
    var n = this.spec, i = this.monitor, o = null;
    return typeof n.item == "object" ? o = n.item : typeof n.item == "function" ? o = n.item(i) : o = {}, o ?? null;
  }, e.canDrag = function() {
    var n = this.spec, i = this.monitor;
    return typeof n.canDrag == "boolean" ? n.canDrag : typeof n.canDrag == "function" ? n.canDrag(i) : !0;
  }, e.isDragging = function(n, i) {
    var o = this.spec, s = this.monitor, a = o.isDragging;
    return a ? a(s) : i === n.getSourceId();
  }, e.endDrag = function() {
    var n = this.spec, i = this.monitor, o = this.connector, s = n.end;
    s && s(i.getItem(), i), o.reconnect();
  }, t;
}();
function hn(t, e, r) {
  var n = D(function() {
    return new gn(l(t), l(e), l(r));
  });
  return E(function() {
    n.value.spec = l(t);
  }), n;
}
function R() {
  var t = Dt();
  return g(t != null, "Expected drag drop context"), t;
}
function pn(t) {
  return D(function() {
    var e = l(t).type;
    return g(e != null, "spec.type must be defined"), e;
  });
}
function we(t, e) {
  (e == null || e > t.length) && (e = t.length);
  for (var r = 0, n = new Array(e); r < e; r++)
    n[r] = t[r];
  return n;
}
function vn(t) {
  if (Array.isArray(t))
    return t;
}
function mn(t, e) {
  var r = t == null ? null : typeof Symbol < "u" && t[Symbol.iterator] || t["@@iterator"];
  if (r != null) {
    var n = [], i = !0, o = !1, s, a;
    try {
      for (r = r.call(t); !(i = (s = r.next()).done) && (n.push(s.value), !(e && n.length === e)); i = !0)
        ;
    } catch (c) {
      o = !0, a = c;
    } finally {
      try {
        !i && r.return != null && r.return();
      } finally {
        if (o)
          throw a;
      }
    }
    return n;
  }
}
function yn() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function Dn(t, e) {
  return vn(t) || mn(t, e) || On(t, e) || yn();
}
function On(t, e) {
  if (t) {
    if (typeof t == "string")
      return we(t, e);
    var r = Object.prototype.toString.call(t).slice(8, -1);
    if (r === "Object" && t.constructor && (r = t.constructor.name), r === "Map" || r === "Set")
      return Array.from(r);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))
      return we(t, e);
  }
}
function Sn(t, e, r) {
  var n = R(), i = hn(t, e, r), o = pn(t);
  E(function(a) {
    if (l(o) != null) {
      var c = Dn(dn(l(o), l(i), l(n)), 2), d = c[0], p = c[1];
      l(e).receiveHandlerId(d), l(r).receiveHandlerId(d), a(p);
    }
  });
}
function Je(t) {
  return D(function() {
    return typeof t == "function" ? t() : t;
  });
}
function Tn() {
  var t = R();
  return D(function() {
    return new Xr(l(t));
  });
}
function bn(t, e) {
  var r = R(), n = D(function() {
    return new sn(l(r).getBackend());
  });
  return E(function(i) {
    n.value.dragSourceOptions = l(t) || null, l(n).reconnect(), i(function() {
      n.value.disconnectDragSource();
    });
  }), E(function(i) {
    n.value.dragPreviewOptions = l(e) || null, l(n).reconnect(), i(function() {
      n.value.disconnectDragPreview();
    });
  }), n;
}
var Ze = function t(e, r) {
  if (e === r)
    return !0;
  if (e && r && typeof e == "object" && typeof r == "object") {
    if (e.constructor !== r.constructor)
      return !1;
    var n, i, o;
    if (Array.isArray(e)) {
      if (n = e.length, n != r.length)
        return !1;
      for (i = n; i-- !== 0; )
        if (!t(e[i], r[i]))
          return !1;
      return !0;
    }
    if (e.constructor === RegExp)
      return e.source === r.source && e.flags === r.flags;
    if (e.valueOf !== Object.prototype.valueOf)
      return e.valueOf() === r.valueOf();
    if (e.toString !== Object.prototype.toString)
      return e.toString() === r.toString();
    if (o = Object.keys(e), n = o.length, n !== Object.keys(r).length)
      return !1;
    for (i = n; i-- !== 0; )
      if (!Object.prototype.hasOwnProperty.call(r, o[i]))
        return !1;
    for (i = n; i-- !== 0; ) {
      var s = o[i];
      if (!t(e[s], r[s]))
        return !1;
    }
    return !0;
  }
  return e !== e && r !== r;
};
function In(t, e, r) {
  var n = C(l(e)(l(t))), i = function() {
    var o = l(e)(l(t));
    Ze(n, o) || (n.value = o, r && r());
  };
  return E(i), [
    n,
    i
  ];
}
function Ce(t, e) {
  (e == null || e > t.length) && (e = t.length);
  for (var r = 0, n = new Array(e); r < e; r++)
    n[r] = t[r];
  return n;
}
function En(t) {
  if (Array.isArray(t))
    return t;
}
function wn(t, e) {
  var r = t == null ? null : typeof Symbol < "u" && t[Symbol.iterator] || t["@@iterator"];
  if (r != null) {
    var n = [], i = !0, o = !1, s, a;
    try {
      for (r = r.call(t); !(i = (s = r.next()).done) && (n.push(s.value), !(e && n.length === e)); i = !0)
        ;
    } catch (c) {
      o = !0, a = c;
    } finally {
      try {
        !i && r.return != null && r.return();
      } finally {
        if (o)
          throw a;
      }
    }
    return n;
  }
}
function Cn() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _n(t, e) {
  return En(t) || wn(t, e) || Nn(t, e) || Cn();
}
function Nn(t, e) {
  if (t) {
    if (typeof t == "string")
      return Ce(t, e);
    var r = Object.prototype.toString.call(t).slice(8, -1);
    if (r === "Object" && t.constructor && (r = t.constructor.name), r === "Map" || r === "Set")
      return Array.from(r);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))
      return Ce(t, e);
  }
}
function Pn(t, e, r) {
  var n = _n(In(t, e, r), 2), i = n[0], o = n[1];
  return E(function(a) {
    var c = l(t).getHandlerId();
    c != null && a(l(t).subscribeToStateChange(o, {
      handlerIds: [
        c
      ]
    }));
  }), i;
}
function et(t, e, r) {
  var n = function() {
    return {};
  };
  return Pn(e, t || n, function() {
    return l(r).reconnect();
  });
}
function fe(t, e) {
  var r = dt({
    el: null,
    options: l(e)
  });
  E(function() {
    t(r);
  }, {
    flush: "post"
  });
  var n = function(i, o) {
    he(r, "el", i);
    var s = l(e) || o;
    return Ze(r.options, s) || he(r, "options", s), l(i);
  };
  return n;
}
function xn(t, e) {
  return fe(function(r) {
    l(t).hooks.dragSource()(r.el, r.options);
  }, D(function() {
    return l(e).options;
  }));
}
function Rn(t, e) {
  return fe(function(r) {
    l(t).hooks.dragPreview()(r.el, r.options);
  }, D(function() {
    return l(e).previewOptions;
  }));
}
function An(t) {
  var e = Je(t), r = Tn(), n = bn(D(function() {
    return l(e).options;
  }), D(function() {
    return l(e).previewOptions;
  }));
  return Sn(e, r, n), [
    et(D(function() {
      return l(e).collect || function() {
        return {};
      };
    }), r, n),
    xn(n, e),
    Rn(n, e)
  ];
}
function Mn(t) {
  return D(function() {
    var e = l(t).accept;
    return g(e != null, "accept must be defined"), Array.isArray(e) ? e : [
      e
    ];
  });
}
function kn(t, e) {
  if (!(t instanceof e))
    throw new TypeError("Cannot call a class as a function");
}
var Ln = /* @__PURE__ */ function() {
  function t(r, n) {
    kn(this, t), this.spec = r, this.monitor = n;
  }
  var e = t.prototype;
  return e.canDrop = function() {
    var n = this.spec, i = this.monitor;
    return n.canDrop ? n.canDrop(i.getItem(), i) : !0;
  }, e.hover = function() {
    var n = this.spec, i = this.monitor;
    n.hover && n.hover(i.getItem(), i);
  }, e.drop = function() {
    var n = this.spec, i = this.monitor;
    if (n.drop)
      return n.drop(i.getItem(), i);
  }, t;
}();
function Hn(t, e) {
  var r = D(function() {
    return new Ln(l(t), l(e));
  });
  return E(function() {
    r.value.spec = l(t);
  }), r;
}
function _e(t, e) {
  (e == null || e > t.length) && (e = t.length);
  for (var r = 0, n = new Array(e); r < e; r++)
    n[r] = t[r];
  return n;
}
function $n(t) {
  if (Array.isArray(t))
    return t;
}
function jn(t, e) {
  var r = t == null ? null : typeof Symbol < "u" && t[Symbol.iterator] || t["@@iterator"];
  if (r != null) {
    var n = [], i = !0, o = !1, s, a;
    try {
      for (r = r.call(t); !(i = (s = r.next()).done) && (n.push(s.value), !(e && n.length === e)); i = !0)
        ;
    } catch (c) {
      o = !0, a = c;
    } finally {
      try {
        !i && r.return != null && r.return();
      } finally {
        if (o)
          throw a;
      }
    }
    return n;
  }
}
function Un() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function Fn(t, e) {
  return $n(t) || jn(t, e) || Vn(t, e) || Un();
}
function Vn(t, e) {
  if (t) {
    if (typeof t == "string")
      return _e(t, e);
    var r = Object.prototype.toString.call(t).slice(8, -1);
    if (r === "Object" && t.constructor && (r = t.constructor.name), r === "Map" || r === "Set")
      return Array.from(r);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))
      return _e(t, e);
  }
}
function qn(t, e, r) {
  var n = R(), i = Hn(t, e), o = Mn(t);
  E(function(a) {
    var c = Fn(ln(o, i, n), 2), d = c[0], p = c[1];
    l(e).receiveHandlerId(d), l(r).receiveHandlerId(d), a(p);
  });
}
function Bn() {
  var t = R();
  return D(function() {
    return new Qr(l(t));
  });
}
function Gn(t) {
  var e = R(), r = D(function() {
    return new cn(l(e).getBackend());
  });
  return E(function(n) {
    r.value.dropTargetOptions = l(t) || null, r.value.reconnect(), n(function() {
      return r.value.disconnectDropTarget();
    });
  }), r;
}
function Wn(t, e) {
  return fe(function(r) {
    l(t).hooks.dropTarget()(r.el, r.options);
  }, D(function() {
    return l(e).options;
  }));
}
function Yn(t) {
  var e = Je(t), r = Bn(), n = Gn(D(function() {
    return l(e).options;
  }));
  return qn(e, r, n), [
    et(D(function() {
      return l(e).collect || function() {
        return {};
      };
    }), r, n),
    Wn(n, e)
  ];
}
function tt(t) {
  let e = null;
  return () => (e == null && (e = t()), e);
}
function Xn(t, e) {
  return t.filter(
    (r) => r !== e
  );
}
function zn(t, e) {
  const r = /* @__PURE__ */ new Set(), n = (o) => r.add(o);
  t.forEach(n), e.forEach(n);
  const i = [];
  return r.forEach(
    (o) => i.push(o)
  ), i;
}
class Qn {
  enter(e) {
    const r = this.entered.length, n = (i) => this.isNodeInDocument(i) && (!i.contains || i.contains(e));
    return this.entered = zn(this.entered.filter(n), [
      e
    ]), r === 0 && this.entered.length > 0;
  }
  leave(e) {
    const r = this.entered.length;
    return this.entered = Xn(this.entered.filter(this.isNodeInDocument), e), r > 0 && this.entered.length === 0;
  }
  reset() {
    this.entered = [];
  }
  constructor(e) {
    this.entered = [], this.isNodeInDocument = e;
  }
}
class Kn {
  initializeExposedProperties() {
    Object.keys(this.config.exposeProperties).forEach((e) => {
      Object.defineProperty(this.item, e, {
        configurable: !0,
        enumerable: !0,
        get() {
          return console.warn(`Browser doesn't allow reading "${e}" until the drop event.`), null;
        }
      });
    });
  }
  loadDataTransfer(e) {
    if (e) {
      const r = {};
      Object.keys(this.config.exposeProperties).forEach((n) => {
        const i = this.config.exposeProperties[n];
        i != null && (r[n] = {
          value: i(e, this.config.matchesTypes),
          configurable: !0,
          enumerable: !0
        });
      }), Object.defineProperties(this.item, r);
    }
  }
  canDrag() {
    return !0;
  }
  beginDrag() {
    return this.item;
  }
  isDragging(e, r) {
    return r === e.getSourceId();
  }
  endDrag() {
  }
  constructor(e) {
    this.config = e, this.item = {}, this.initializeExposedProperties();
  }
}
const rt = "__NATIVE_FILE__", nt = "__NATIVE_URL__", it = "__NATIVE_TEXT__", ot = "__NATIVE_HTML__", Ne = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  FILE: rt,
  HTML: ot,
  TEXT: it,
  URL: nt
}, Symbol.toStringTag, { value: "Module" }));
function K(t, e, r) {
  const n = e.reduce(
    (i, o) => i || t.getData(o),
    ""
  );
  return n ?? r;
}
const ie = {
  [rt]: {
    exposeProperties: {
      files: (t) => Array.prototype.slice.call(t.files),
      items: (t) => t.items,
      dataTransfer: (t) => t
    },
    matchesTypes: [
      "Files"
    ]
  },
  [ot]: {
    exposeProperties: {
      html: (t, e) => K(t, e, ""),
      dataTransfer: (t) => t
    },
    matchesTypes: [
      "Html",
      "text/html"
    ]
  },
  [nt]: {
    exposeProperties: {
      urls: (t, e) => K(t, e, "").split(`
`),
      dataTransfer: (t) => t
    },
    matchesTypes: [
      "Url",
      "text/uri-list"
    ]
  },
  [it]: {
    exposeProperties: {
      text: (t, e) => K(t, e, ""),
      dataTransfer: (t) => t
    },
    matchesTypes: [
      "Text",
      "text/plain"
    ]
  }
};
function Jn(t, e) {
  const r = ie[t];
  if (!r)
    throw new Error(`native type ${t} has no configuration`);
  const n = new Kn(r);
  return n.loadDataTransfer(e), n;
}
function J(t) {
  if (!t)
    return null;
  const e = Array.prototype.slice.call(t.types || []);
  return Object.keys(ie).filter((r) => {
    const n = ie[r];
    return n != null && n.matchesTypes ? n.matchesTypes.some(
      (i) => e.indexOf(i) > -1
    ) : !1;
  })[0] || null;
}
const Zn = tt(
  () => /firefox/i.test(navigator.userAgent)
), st = tt(
  () => !!window.safari
);
class Pe {
  interpolate(e) {
    const { xs: r, ys: n, c1s: i, c2s: o, c3s: s } = this;
    let a = r.length - 1;
    if (e === r[a])
      return n[a];
    let c = 0, d = s.length - 1, p;
    for (; c <= d; ) {
      p = Math.floor(0.5 * (c + d));
      const u = r[p];
      if (u < e)
        c = p + 1;
      else if (u > e)
        d = p - 1;
      else
        return n[p];
    }
    a = Math.max(0, d);
    const y = e - r[a], h = y * y;
    return n[a] + i[a] * y + o[a] * h + s[a] * y * h;
  }
  constructor(e, r) {
    const { length: n } = e, i = [];
    for (let u = 0; u < n; u++)
      i.push(u);
    i.sort(
      (u, m) => e[u] < e[m] ? -1 : 1
    );
    const o = [], s = [];
    let a, c;
    for (let u = 0; u < n - 1; u++)
      a = e[u + 1] - e[u], c = r[u + 1] - r[u], o.push(a), s.push(c / a);
    const d = [
      s[0]
    ];
    for (let u = 0; u < o.length - 1; u++) {
      const m = s[u], f = s[u + 1];
      if (m * f <= 0)
        d.push(0);
      else {
        a = o[u];
        const v = o[u + 1], O = a + v;
        d.push(3 * O / ((O + v) / m + (O + a) / f));
      }
    }
    d.push(s[s.length - 1]);
    const p = [], y = [];
    let h;
    for (let u = 0; u < d.length - 1; u++) {
      h = s[u];
      const m = d[u], f = 1 / o[u], v = m + d[u + 1] - h - h;
      p.push((h - m - v) * f), y.push(v * f * f);
    }
    this.xs = e, this.ys = r, this.c1s = d, this.c2s = p, this.c3s = y;
  }
}
const ei = 1;
function at(t) {
  const e = t.nodeType === ei ? t : t.parentElement;
  if (!e)
    return null;
  const { top: r, left: n } = e.getBoundingClientRect();
  return {
    x: n,
    y: r
  };
}
function L(t) {
  return {
    x: t.clientX,
    y: t.clientY
  };
}
function ti(t) {
  var e;
  return t.nodeName === "IMG" && (Zn() || !(!((e = document.documentElement) === null || e === void 0) && e.contains(t)));
}
function ri(t, e, r, n) {
  let i = t ? e.width : r, o = t ? e.height : n;
  return st() && t && (o /= window.devicePixelRatio, i /= window.devicePixelRatio), {
    dragPreviewWidth: i,
    dragPreviewHeight: o
  };
}
function ni(t, e, r, n, i) {
  const o = ti(e), a = at(o ? t : e), c = {
    x: r.x - a.x,
    y: r.y - a.y
  }, { offsetWidth: d, offsetHeight: p } = t, { anchorX: y, anchorY: h } = n, { dragPreviewWidth: u, dragPreviewHeight: m } = ri(o, e, d, p), f = () => {
    let ge = new Pe([
      0,
      0.5,
      1
    ], [
      // Dock to the top
      c.y,
      // Align at the center
      c.y / p * m,
      // Dock to the bottom
      c.y + m - p
    ]).interpolate(h);
    return st() && o && (ge += (window.devicePixelRatio - 1) * m), ge;
  }, v = () => new Pe([
    0,
    0.5,
    1
  ], [
    // Dock to the left
    c.x,
    // Align at the center
    c.x / d * u,
    // Dock to the right
    c.x + u - d
  ]).interpolate(y), { offsetX: O, offsetY: T } = i, w = O === 0 || O, W = T === 0 || T;
  return {
    x: w ? O : v(),
    y: W ? T : f()
  };
}
class ii {
  get window() {
    if (this.globalContext)
      return this.globalContext;
    if (typeof window < "u")
      return window;
  }
  get document() {
    var e;
    return !((e = this.globalContext) === null || e === void 0) && e.document ? this.globalContext.document : this.window ? this.window.document : void 0;
  }
  get rootElement() {
    var e;
    return ((e = this.optionsArgs) === null || e === void 0 ? void 0 : e.rootElement) || this.window;
  }
  constructor(e, r) {
    this.ownerDocument = null, this.globalContext = e, this.optionsArgs = r;
  }
}
function oi(t, e, r) {
  return e in t ? Object.defineProperty(t, e, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : t[e] = r, t;
}
function xe(t) {
  for (var e = 1; e < arguments.length; e++) {
    var r = arguments[e] != null ? arguments[e] : {}, n = Object.keys(r);
    typeof Object.getOwnPropertySymbols == "function" && (n = n.concat(Object.getOwnPropertySymbols(r).filter(function(i) {
      return Object.getOwnPropertyDescriptor(r, i).enumerable;
    }))), n.forEach(function(i) {
      oi(t, i, r[i]);
    });
  }
  return t;
}
class si {
  /**
  * Generate profiling statistics for the HTML5Backend.
  */
  profile() {
    var e, r;
    return {
      sourcePreviewNodes: this.sourcePreviewNodes.size,
      sourcePreviewNodeOptions: this.sourcePreviewNodeOptions.size,
      sourceNodeOptions: this.sourceNodeOptions.size,
      sourceNodes: this.sourceNodes.size,
      dragStartSourceIds: ((e = this.dragStartSourceIds) === null || e === void 0 ? void 0 : e.length) || 0,
      dropTargetIds: this.dropTargetIds.length,
      dragEnterTargetIds: this.dragEnterTargetIds.length,
      dragOverTargetIds: ((r = this.dragOverTargetIds) === null || r === void 0 ? void 0 : r.length) || 0
    };
  }
  // public for test
  get window() {
    return this.options.window;
  }
  get document() {
    return this.options.document;
  }
  /**
  * Get the root element to use for event subscriptions
  */
  get rootElement() {
    return this.options.rootElement;
  }
  setup() {
    const e = this.rootElement;
    if (e !== void 0) {
      if (e.__isReactDndBackendSetUp)
        throw new Error("Cannot have two HTML5 backends at the same time.");
      e.__isReactDndBackendSetUp = !0, this.addEventListeners(e);
    }
  }
  teardown() {
    const e = this.rootElement;
    if (e !== void 0 && (e.__isReactDndBackendSetUp = !1, this.removeEventListeners(this.rootElement), this.clearCurrentDragSourceNode(), this.asyncEndDragFrameId)) {
      var r;
      (r = this.window) === null || r === void 0 || r.cancelAnimationFrame(this.asyncEndDragFrameId);
    }
  }
  connectDragPreview(e, r, n) {
    return this.sourcePreviewNodeOptions.set(e, n), this.sourcePreviewNodes.set(e, r), () => {
      this.sourcePreviewNodes.delete(e), this.sourcePreviewNodeOptions.delete(e);
    };
  }
  connectDragSource(e, r, n) {
    this.sourceNodes.set(e, r), this.sourceNodeOptions.set(e, n);
    const i = (s) => this.handleDragStart(s, e), o = (s) => this.handleSelectStart(s);
    return r.setAttribute("draggable", "true"), r.addEventListener("dragstart", i), r.addEventListener("selectstart", o), () => {
      this.sourceNodes.delete(e), this.sourceNodeOptions.delete(e), r.removeEventListener("dragstart", i), r.removeEventListener("selectstart", o), r.setAttribute("draggable", "false");
    };
  }
  connectDropTarget(e, r) {
    const n = (s) => this.handleDragEnter(s, e), i = (s) => this.handleDragOver(s, e), o = (s) => this.handleDrop(s, e);
    return r.addEventListener("dragenter", n), r.addEventListener("dragover", i), r.addEventListener("drop", o), () => {
      r.removeEventListener("dragenter", n), r.removeEventListener("dragover", i), r.removeEventListener("drop", o);
    };
  }
  addEventListeners(e) {
    e.addEventListener && (e.addEventListener("dragstart", this.handleTopDragStart), e.addEventListener("dragstart", this.handleTopDragStartCapture, !0), e.addEventListener("dragend", this.handleTopDragEndCapture, !0), e.addEventListener("dragenter", this.handleTopDragEnter), e.addEventListener("dragenter", this.handleTopDragEnterCapture, !0), e.addEventListener("dragleave", this.handleTopDragLeaveCapture, !0), e.addEventListener("dragover", this.handleTopDragOver), e.addEventListener("dragover", this.handleTopDragOverCapture, !0), e.addEventListener("drop", this.handleTopDrop), e.addEventListener("drop", this.handleTopDropCapture, !0));
  }
  removeEventListeners(e) {
    e.removeEventListener && (e.removeEventListener("dragstart", this.handleTopDragStart), e.removeEventListener("dragstart", this.handleTopDragStartCapture, !0), e.removeEventListener("dragend", this.handleTopDragEndCapture, !0), e.removeEventListener("dragenter", this.handleTopDragEnter), e.removeEventListener("dragenter", this.handleTopDragEnterCapture, !0), e.removeEventListener("dragleave", this.handleTopDragLeaveCapture, !0), e.removeEventListener("dragover", this.handleTopDragOver), e.removeEventListener("dragover", this.handleTopDragOverCapture, !0), e.removeEventListener("drop", this.handleTopDrop), e.removeEventListener("drop", this.handleTopDropCapture, !0));
  }
  getCurrentSourceNodeOptions() {
    const e = this.monitor.getSourceId(), r = this.sourceNodeOptions.get(e);
    return xe({
      dropEffect: this.altKeyPressed ? "copy" : "move"
    }, r || {});
  }
  getCurrentDropEffect() {
    return this.isDraggingNativeItem() ? "copy" : this.getCurrentSourceNodeOptions().dropEffect;
  }
  getCurrentSourcePreviewNodeOptions() {
    const e = this.monitor.getSourceId(), r = this.sourcePreviewNodeOptions.get(e);
    return xe({
      anchorX: 0.5,
      anchorY: 0.5,
      captureDraggingState: !1
    }, r || {});
  }
  isDraggingNativeItem() {
    const e = this.monitor.getItemType();
    return Object.keys(Ne).some(
      (r) => Ne[r] === e
    );
  }
  beginDragNativeItem(e, r) {
    this.clearCurrentDragSourceNode(), this.currentNativeSource = Jn(e, r), this.currentNativeHandle = this.registry.addSource(e, this.currentNativeSource), this.actions.beginDrag([
      this.currentNativeHandle
    ]);
  }
  setCurrentDragSourceNode(e) {
    this.clearCurrentDragSourceNode(), this.currentDragSourceNode = e;
    const r = 1e3;
    this.mouseMoveTimeoutTimer = setTimeout(() => {
      var n;
      return (n = this.rootElement) === null || n === void 0 ? void 0 : n.addEventListener("mousemove", this.endDragIfSourceWasRemovedFromDOM, !0);
    }, r);
  }
  clearCurrentDragSourceNode() {
    if (this.currentDragSourceNode) {
      if (this.currentDragSourceNode = null, this.rootElement) {
        var e;
        (e = this.window) === null || e === void 0 || e.clearTimeout(this.mouseMoveTimeoutTimer || void 0), this.rootElement.removeEventListener("mousemove", this.endDragIfSourceWasRemovedFromDOM, !0);
      }
      return this.mouseMoveTimeoutTimer = null, !0;
    }
    return !1;
  }
  handleDragStart(e, r) {
    e.defaultPrevented || (this.dragStartSourceIds || (this.dragStartSourceIds = []), this.dragStartSourceIds.unshift(r));
  }
  handleDragEnter(e, r) {
    this.dragEnterTargetIds.unshift(r);
  }
  handleDragOver(e, r) {
    this.dragOverTargetIds === null && (this.dragOverTargetIds = []), this.dragOverTargetIds.unshift(r);
  }
  handleDrop(e, r) {
    this.dropTargetIds.unshift(r);
  }
  constructor(e, r, n) {
    this.sourcePreviewNodes = /* @__PURE__ */ new Map(), this.sourcePreviewNodeOptions = /* @__PURE__ */ new Map(), this.sourceNodes = /* @__PURE__ */ new Map(), this.sourceNodeOptions = /* @__PURE__ */ new Map(), this.dragStartSourceIds = null, this.dropTargetIds = [], this.dragEnterTargetIds = [], this.currentNativeSource = null, this.currentNativeHandle = null, this.currentDragSourceNode = null, this.altKeyPressed = !1, this.mouseMoveTimeoutTimer = null, this.asyncEndDragFrameId = null, this.dragOverTargetIds = null, this.lastClientOffset = null, this.hoverRafId = null, this.getSourceClientOffset = (i) => {
      const o = this.sourceNodes.get(i);
      return o && at(o) || null;
    }, this.endDragNativeItem = () => {
      this.isDraggingNativeItem() && (this.actions.endDrag(), this.currentNativeHandle && this.registry.removeSource(this.currentNativeHandle), this.currentNativeHandle = null, this.currentNativeSource = null);
    }, this.isNodeInDocument = (i) => !!(i && this.document && this.document.body && this.document.body.contains(i)), this.endDragIfSourceWasRemovedFromDOM = () => {
      const i = this.currentDragSourceNode;
      i == null || this.isNodeInDocument(i) || (this.clearCurrentDragSourceNode() && this.monitor.isDragging() && this.actions.endDrag(), this.cancelHover());
    }, this.scheduleHover = (i) => {
      this.hoverRafId === null && typeof requestAnimationFrame < "u" && (this.hoverRafId = requestAnimationFrame(() => {
        this.monitor.isDragging() && this.actions.hover(i || [], {
          clientOffset: this.lastClientOffset
        }), this.hoverRafId = null;
      }));
    }, this.cancelHover = () => {
      this.hoverRafId !== null && typeof cancelAnimationFrame < "u" && (cancelAnimationFrame(this.hoverRafId), this.hoverRafId = null);
    }, this.handleTopDragStartCapture = () => {
      this.clearCurrentDragSourceNode(), this.dragStartSourceIds = [];
    }, this.handleTopDragStart = (i) => {
      if (i.defaultPrevented)
        return;
      const { dragStartSourceIds: o } = this;
      this.dragStartSourceIds = null;
      const s = L(i);
      this.monitor.isDragging() && (this.actions.endDrag(), this.cancelHover()), this.actions.beginDrag(o || [], {
        publishSource: !1,
        getSourceClientOffset: this.getSourceClientOffset,
        clientOffset: s
      });
      const { dataTransfer: a } = i, c = J(a);
      if (this.monitor.isDragging()) {
        if (a && typeof a.setDragImage == "function") {
          const p = this.monitor.getSourceId(), y = this.sourceNodes.get(p), h = this.sourcePreviewNodes.get(p) || y;
          if (h) {
            const { anchorX: u, anchorY: m, offsetX: f, offsetY: v } = this.getCurrentSourcePreviewNodeOptions(), w = ni(y, h, s, {
              anchorX: u,
              anchorY: m
            }, {
              offsetX: f,
              offsetY: v
            });
            a.setDragImage(h, w.x, w.y);
          }
        }
        try {
          a == null || a.setData("application/json", {});
        } catch {
        }
        this.setCurrentDragSourceNode(i.target);
        const { captureDraggingState: d } = this.getCurrentSourcePreviewNodeOptions();
        d ? this.actions.publishDragSource() : setTimeout(
          () => this.actions.publishDragSource(),
          0
        );
      } else if (c)
        this.beginDragNativeItem(c);
      else {
        if (a && !a.types && (i.target && !i.target.hasAttribute || !i.target.hasAttribute("draggable")))
          return;
        i.preventDefault();
      }
    }, this.handleTopDragEndCapture = () => {
      this.clearCurrentDragSourceNode() && this.monitor.isDragging() && this.actions.endDrag(), this.cancelHover();
    }, this.handleTopDragEnterCapture = (i) => {
      if (this.dragEnterTargetIds = [], this.isDraggingNativeItem()) {
        var o;
        (o = this.currentNativeSource) === null || o === void 0 || o.loadDataTransfer(i.dataTransfer);
      }
      if (!this.enterLeaveCounter.enter(i.target) || this.monitor.isDragging())
        return;
      const { dataTransfer: a } = i, c = J(a);
      c && this.beginDragNativeItem(c, a);
    }, this.handleTopDragEnter = (i) => {
      const { dragEnterTargetIds: o } = this;
      if (this.dragEnterTargetIds = [], !this.monitor.isDragging())
        return;
      this.altKeyPressed = i.altKey, o.length > 0 && this.actions.hover(o, {
        clientOffset: L(i)
      }), o.some(
        (a) => this.monitor.canDropOnTarget(a)
      ) && (i.preventDefault(), i.dataTransfer && (i.dataTransfer.dropEffect = this.getCurrentDropEffect()));
    }, this.handleTopDragOverCapture = (i) => {
      if (this.dragOverTargetIds = [], this.isDraggingNativeItem()) {
        var o;
        (o = this.currentNativeSource) === null || o === void 0 || o.loadDataTransfer(i.dataTransfer);
      }
    }, this.handleTopDragOver = (i) => {
      const { dragOverTargetIds: o } = this;
      if (this.dragOverTargetIds = [], !this.monitor.isDragging()) {
        i.preventDefault(), i.dataTransfer && (i.dataTransfer.dropEffect = "none");
        return;
      }
      this.altKeyPressed = i.altKey, this.lastClientOffset = L(i), this.scheduleHover(o), (o || []).some(
        (a) => this.monitor.canDropOnTarget(a)
      ) ? (i.preventDefault(), i.dataTransfer && (i.dataTransfer.dropEffect = this.getCurrentDropEffect())) : this.isDraggingNativeItem() ? i.preventDefault() : (i.preventDefault(), i.dataTransfer && (i.dataTransfer.dropEffect = "none"));
    }, this.handleTopDragLeaveCapture = (i) => {
      this.isDraggingNativeItem() && i.preventDefault(), this.enterLeaveCounter.leave(i.target) && (this.isDraggingNativeItem() && setTimeout(
        () => this.endDragNativeItem(),
        0
      ), this.cancelHover());
    }, this.handleTopDropCapture = (i) => {
      if (this.dropTargetIds = [], this.isDraggingNativeItem()) {
        var o;
        i.preventDefault(), (o = this.currentNativeSource) === null || o === void 0 || o.loadDataTransfer(i.dataTransfer);
      } else
        J(i.dataTransfer) && i.preventDefault();
      this.enterLeaveCounter.reset();
    }, this.handleTopDrop = (i) => {
      const { dropTargetIds: o } = this;
      this.dropTargetIds = [], this.actions.hover(o, {
        clientOffset: L(i)
      }), this.actions.drop({
        dropEffect: this.getCurrentDropEffect()
      }), this.isDraggingNativeItem() ? this.endDragNativeItem() : this.monitor.isDragging() && this.actions.endDrag(), this.cancelHover();
    }, this.handleSelectStart = (i) => {
      const o = i.target;
      typeof o.dragDrop == "function" && (o.tagName === "INPUT" || o.tagName === "SELECT" || o.tagName === "TEXTAREA" || o.isContentEditable || (i.preventDefault(), o.dragDrop()));
    }, this.options = new ii(r, n), this.actions = e.getActions(), this.monitor = e.getMonitor(), this.registry = e.getRegistry(), this.enterLeaveCounter = new Qn(this.isNodeInDocument);
  }
}
const ai = function(e, r, n) {
  return new si(e, r, n);
}, j = /* @__PURE__ */ k({
  __name: "DndProvider",
  setup(t) {
    return (e, r) => (A(), Z(l(Wr), { backend: l(ai) }, {
      default: ee(() => [
        oe(e.$slots, "default")
      ]),
      _: 3
    }, 8, ["backend"]));
  }
});
j.install = (t) => {
  t.component(j.__name, j);
};
const ui = /* @__PURE__ */ k({
  __name: "DraggableItem",
  props: {
    index: null,
    data: null,
    dragEnd: null,
    dropMove: null
  },
  setup(t) {
    const e = t, r = x("uuid"), n = C(x("typeName")), i = C(x("acceptName")), o = C(x("canDrag", !0)), s = C(x("dropEffect")), [a, c] = An(() => ({
      type: n.value,
      canDrag: () => o.value,
      item: () => ({ index: e.index, uuid: r, data: e.data }),
      options: {
        dropEffect: s.value
      },
      collect: (u) => ({
        canDrag: u.canDrag(),
        getItem: u.getItem(),
        getItemType: u.getItemType(),
        isDragging: u.isDragging()
      }),
      end: (u, m) => {
        const f = m.didDrop(), v = m.getDropResult(), O = r === v.uuid;
        f && v && e.dragEnd({ ...u, isSelf: O });
      }
    })), [d, p] = Yn(() => ({
      accept: i.value,
      hover: (u, m) => {
      },
      drop: (u, m) => {
        const f = u.index, v = e.index, O = r === u.uuid;
        return e.dropMove(u.data, f, v, O), { ...u, uuid: r };
      },
      collect: (u) => ({
        isOver: u.isOver(),
        canDrop: u.canDrop(),
        getItem: u.getItem(),
        getDropResult: u.getDropResult()
      })
    })), y = C(), h = (u) => {
      y.value = c(p(u));
    };
    return (u, m) => ft((A(), Ve("div", {
      class: "draggable-item",
      ref: h,
      key: t.index
    }, [
      oe(u.$slots, "default", {}, void 0, !0)
    ])), [
      [
        gt,
        l(s) === "copy" || l(s) === "move" && !l(a).isDragging
      ]
    ]);
  }
});
const ut = (t, e) => {
  const r = t.__vccOpts || t;
  for (const [n, i] of e)
    r[n] = i;
  return r;
}, ci = /* @__PURE__ */ ut(ui, [["__scopeId", "data-v-d1d9099d"]]);
let H;
const li = new Uint8Array(16);
function di() {
  if (!H && (H = typeof crypto < "u" && crypto.getRandomValues && crypto.getRandomValues.bind(crypto), !H))
    throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");
  return H(li);
}
const S = [];
for (let t = 0; t < 256; ++t)
  S.push((t + 256).toString(16).slice(1));
function fi(t, e = 0) {
  return (S[t[e + 0]] + S[t[e + 1]] + S[t[e + 2]] + S[t[e + 3]] + "-" + S[t[e + 4]] + S[t[e + 5]] + "-" + S[t[e + 6]] + S[t[e + 7]] + "-" + S[t[e + 8]] + S[t[e + 9]] + "-" + S[t[e + 10]] + S[t[e + 11]] + S[t[e + 12]] + S[t[e + 13]] + S[t[e + 14]] + S[t[e + 15]]).toLowerCase();
}
const gi = typeof crypto < "u" && crypto.randomUUID && crypto.randomUUID.bind(crypto), Re = {
  randomUUID: gi
};
function hi(t, e, r) {
  if (Re.randomUUID && !e && !t)
    return Re.randomUUID();
  t = t || {};
  const n = t.random || (t.rng || di)();
  if (n[6] = n[6] & 15 | 64, n[8] = n[8] & 63 | 128, e) {
    r = r || 0;
    for (let i = 0; i < 16; ++i)
      e[r + i] = n[i];
    return e;
  }
  return fi(n);
}
var Ae;
const pi = typeof window < "u";
pi && ((Ae = window == null ? void 0 : window.navigator) != null && Ae.userAgent) && /iP(ad|hone|od)/.test(window.navigator.userAgent);
function vi(t) {
  return t;
}
var mi = Object.defineProperty, yi = Object.defineProperties, Di = Object.getOwnPropertyDescriptors, Me = Object.getOwnPropertySymbols, Oi = Object.prototype.hasOwnProperty, Si = Object.prototype.propertyIsEnumerable, ke = (t, e, r) => e in t ? mi(t, e, { enumerable: !0, configurable: !0, writable: !0, value: r }) : t[e] = r, Ti = (t, e) => {
  for (var r in e || (e = {}))
    Oi.call(e, r) && ke(t, r, e[r]);
  if (Me)
    for (var r of Me(e))
      Si.call(e, r) && ke(t, r, e[r]);
  return t;
}, bi = (t, e) => yi(t, Di(e));
function Ii(t) {
  return JSON.parse(JSON.stringify(t));
}
function Ei(t, e = {}) {
  const r = C({}), {
    manual: n,
    clone: i = Ii,
    deep: o = !0,
    immediate: s = !0
  } = e;
  function a() {
    r.value = i(l(t));
  }
  return !n && Fe(t) ? ht(t, a, bi(Ti({}, e), {
    deep: o,
    immediate: s
  })) : a(), { cloned: r, sync: a };
}
const Le = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, He = "__vueuse_ssr_handlers__";
Le[He] = Le[He] || {};
var $e;
(function(t) {
  t.UP = "UP", t.RIGHT = "RIGHT", t.DOWN = "DOWN", t.LEFT = "LEFT", t.NONE = "NONE";
})($e || ($e = {}));
var wi = Object.defineProperty, je = Object.getOwnPropertySymbols, Ci = Object.prototype.hasOwnProperty, _i = Object.prototype.propertyIsEnumerable, Ue = (t, e, r) => e in t ? wi(t, e, { enumerable: !0, configurable: !0, writable: !0, value: r }) : t[e] = r, Ni = (t, e) => {
  for (var r in e || (e = {}))
    Ci.call(e, r) && Ue(t, r, e[r]);
  if (je)
    for (var r of je(e))
      _i.call(e, r) && Ue(t, r, e[r]);
  return t;
};
const Pi = {
  easeInSine: [0.12, 0, 0.39, 0],
  easeOutSine: [0.61, 1, 0.88, 1],
  easeInOutSine: [0.37, 0, 0.63, 1],
  easeInQuad: [0.11, 0, 0.5, 0],
  easeOutQuad: [0.5, 1, 0.89, 1],
  easeInOutQuad: [0.45, 0, 0.55, 1],
  easeInCubic: [0.32, 0, 0.67, 0],
  easeOutCubic: [0.33, 1, 0.68, 1],
  easeInOutCubic: [0.65, 0, 0.35, 1],
  easeInQuart: [0.5, 0, 0.75, 0],
  easeOutQuart: [0.25, 1, 0.5, 1],
  easeInOutQuart: [0.76, 0, 0.24, 1],
  easeInQuint: [0.64, 0, 0.78, 0],
  easeOutQuint: [0.22, 1, 0.36, 1],
  easeInOutQuint: [0.83, 0, 0.17, 1],
  easeInExpo: [0.7, 0, 0.84, 0],
  easeOutExpo: [0.16, 1, 0.3, 1],
  easeInOutExpo: [0.87, 0, 0.13, 1],
  easeInCirc: [0.55, 0, 1, 0.45],
  easeOutCirc: [0, 0.55, 0.45, 1],
  easeInOutCirc: [0.85, 0, 0.15, 1],
  easeInBack: [0.36, 0, 0.66, -0.56],
  easeOutBack: [0.34, 1.56, 0.64, 1],
  easeInOutBack: [0.68, -0.6, 0.32, 1.6]
};
Ni({
  linear: vi
}, Pi);
const xi = /* @__PURE__ */ k({
  __name: "Draggable",
  props: {
    disabled: { type: Boolean, default: !1 },
    dragName: null,
    dropName: null,
    dropEffect: { default: "move" },
    list: null,
    itemKey: { default: "id" }
  },
  emits: ["update:list"],
  setup(t, { emit: e }) {
    const r = t, n = hi(), i = (h) => {
      let u = [];
      return typeof h == "string" ? u = [h, n] : Array.isArray(h) ? u = [...h, n] : u = [n], u;
    }, o = D(() => r.dragName || n), s = D(() => i(r.dropName)), a = D(() => !r.disabled), c = D(() => r.dropEffect);
    P("uuid", n), P("typeName", o), P("acceptName", s), P("canDrag", a), P("dropEffect", c);
    const d = D({
      get() {
        return Ei(r.list).cloned.value;
      },
      set(h) {
        e("update:list", h);
      }
    }), p = (h) => {
      c.value === "move" && !h.isSelf && d.value.splice(h.index, 1);
    }, y = (h, u, m, f) => {
      const v = [...d.value];
      f && v.splice(u, 1), v.splice(m, 0, h), d.value = v;
    };
    return (h, u) => {
      const m = ci;
      return A(), Z(pt, {
        name: "list",
        tag: "div"
      }, {
        default: ee(() => [
          (A(!0), Ve(vt, null, mt(l(d), (f, v) => (A(), Z(m, {
            key: t.itemKey ? f[t.itemKey] : f,
            index: v,
            data: f,
            dragEnd: p,
            dropMove: y
          }, {
            default: ee(() => [
              oe(h.$slots, "item", {
                data: f,
                index: v
              }, void 0, !0)
            ]),
            _: 2
          }, 1032, ["index", "data"]))), 128))
        ]),
        _: 3
      });
    };
  }
});
const U = /* @__PURE__ */ ut(xi, [["__scopeId", "data-v-a2c339e0"]]);
U.install = (t) => {
  t.component(U.__name, U);
};
const Ri = [U, j], Ai = (t) => {
  Ri.forEach((e) => {
    t.component(e.__name, e);
  });
}, ki = {
  install: Ai
};
export {
  j as DndProvider,
  ki as default,
  U as draggable
};
//# sourceMappingURL=index.js.map
