import { provide as P, inject as x, defineComponent as k, onUnmounted as rt, watchEffect as E, isRef as nt, unref as l, computed as D, ref as w, reactive as it, openBlock as M, createBlock as Z, withCtx as ee, renderSlot as oe, withDirectives as ot, createElementBlock as Ae, createTextVNode as st, toDisplayString as he, vShow as at, TransitionGroup as ut, Fragment as ct, renderList as lt } from "vue";
function pe(t, e, r) {
  return Array.isArray(t) ? (t.length = Math.max(t.length, e), t.splice(e, 1, r), r) : (t[e] = r, r);
}
var ke = Symbol("DndContextType");
function dt(t) {
  P(ke, t);
}
function ft() {
  return x(ke);
}
var I;
(function(t) {
  t.SOURCE = "SOURCE", t.TARGET = "TARGET";
})(I || (I = {}));
function g(t, e, ...r) {
  if (gt() && e === void 0)
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
function gt() {
  return typeof process < "u" && process.env.NODE_ENV === "production";
}
const se = "dnd-core/INIT_COORDS", V = "dnd-core/BEGIN_DRAG", ae = "dnd-core/PUBLISH_DRAG_SOURCE", F = "dnd-core/HOVER", q = "dnd-core/DROP", G = "dnd-core/END_DRAG";
function ve(t, e) {
  return {
    type: se,
    payload: {
      sourceClientOffset: e || null,
      clientOffset: t || null
    }
  };
}
function ht(t, e, r) {
  return e.split(".").reduce(
    (n, i) => n && n[i] ? n[i] : r || null,
    t
  );
}
function pt(t, e) {
  return t.filter(
    (r) => r !== e
  );
}
function Le(t) {
  return typeof t == "object";
}
function vt(t, e) {
  const r = /* @__PURE__ */ new Map(), n = (o) => {
    r.set(o, r.has(o) ? r.get(o) + 1 : 1);
  };
  t.forEach(n), e.forEach(n);
  const i = [];
  return r.forEach((o, s) => {
    o === 1 && i.push(s);
  }), i;
}
function mt(t, e) {
  return t.filter(
    (r) => e.indexOf(r) > -1
  );
}
const yt = {
  type: se,
  payload: {
    clientOffset: null,
    sourceClientOffset: null
  }
};
function Dt(t) {
  return function(r = [], n = {
    publishSource: !0
  }) {
    const { publishSource: i = !0, clientOffset: o, getSourceClientOffset: s } = n, a = t.getMonitor(), c = t.getRegistry();
    t.dispatch(ve(o)), St(r, a, c);
    const d = bt(r, a);
    if (d == null) {
      t.dispatch(yt);
      return;
    }
    let p = null;
    if (o) {
      if (!s)
        throw new Error("getSourceClientOffset must be defined");
      Ot(s), p = s(d);
    }
    t.dispatch(ve(o, p));
    const h = c.getSource(d).beginDrag(a, d);
    if (h == null)
      return;
    Tt(h), c.pinSource(d);
    const u = c.getSourceType(d);
    return {
      type: V,
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
function St(t, e, r) {
  g(!e.isDragging(), "Cannot call beginDrag while dragging."), t.forEach(function(n) {
    g(r.getSource(n), "Expected sourceIds to be registered.");
  });
}
function Ot(t) {
  g(typeof t == "function", "When clientOffset is provided, getSourceClientOffset must be a function.");
}
function Tt(t) {
  g(Le(t), "Item must be an object.");
}
function bt(t, e) {
  let r = null;
  for (let n = t.length - 1; n >= 0; n--)
    if (e.canDragSource(t[n])) {
      r = t[n];
      break;
    }
  return r;
}
function It(t) {
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
function Et(t) {
  return function(r, { clientOffset: n } = {}) {
    Ct(r);
    const i = r.slice(0), o = t.getMonitor(), s = t.getRegistry();
    wt(i, o, s);
    const a = o.getItemType();
    return _t(i, s, a), Nt(i, o, s), {
      type: F,
      payload: {
        targetIds: i,
        clientOffset: n || null
      }
    };
  };
}
function Ct(t) {
  g(Array.isArray(t), "Expected targetIds to be an array.");
}
function wt(t, e, r) {
  g(e.isDragging(), "Cannot call hover while not dragging."), g(!e.didDrop(), "Cannot call hover after drop.");
  for (let n = 0; n < t.length; n++) {
    const i = t[n];
    g(t.lastIndexOf(i) === n, "Expected targetIds to be unique in the passed array.");
    const o = r.getTarget(i);
    g(o, "Expected targetIds to be registered.");
  }
}
function _t(t, e, r) {
  for (let n = t.length - 1; n >= 0; n--) {
    const i = t[n], o = e.getTargetType(i);
    te(o, r) || t.splice(n, 1);
  }
}
function Nt(t, e, r) {
  t.forEach(function(n) {
    r.getTarget(n).hover(e, n);
  });
}
function Pt(t, e, r) {
  return e in t ? Object.defineProperty(t, e, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : t[e] = r, t;
}
function xt(t) {
  for (var e = 1; e < arguments.length; e++) {
    var r = arguments[e] != null ? arguments[e] : {}, n = Object.keys(r);
    typeof Object.getOwnPropertySymbols == "function" && (n = n.concat(Object.getOwnPropertySymbols(r).filter(function(i) {
      return Object.getOwnPropertyDescriptor(r, i).enumerable;
    }))), n.forEach(function(i) {
      Pt(t, i, r[i]);
    });
  }
  return t;
}
function Rt(t) {
  return function(r = {}) {
    const n = t.getMonitor(), i = t.getRegistry();
    Mt(n), Lt(n).forEach((s, a) => {
      const c = At(s, a, i, n), d = {
        type: q,
        payload: {
          dropResult: xt({}, r, c)
        }
      };
      t.dispatch(d);
    });
  };
}
function Mt(t) {
  g(t.isDragging(), "Cannot call drop while not dragging."), g(!t.didDrop(), "Cannot call drop twice during one drag operation.");
}
function At(t, e, r, n) {
  const i = r.getTarget(t);
  let o = i ? i.drop(n, t) : void 0;
  return kt(o), typeof o > "u" && (o = e === 0 ? {} : n.getDropResult()), o;
}
function kt(t) {
  g(typeof t > "u" || Le(t), "Drop result must either be an object or undefined.");
}
function Lt(t) {
  const e = t.getTargetIds().filter(t.canDropOnTarget, t);
  return e.reverse(), e;
}
function Ht(t) {
  return function() {
    const r = t.getMonitor(), n = t.getRegistry();
    jt(r);
    const i = r.getSourceId();
    return i != null && (n.getSource(i, !0).endDrag(r, i), n.unpinSource()), {
      type: G
    };
  };
}
function jt(t) {
  g(t.isDragging(), "Cannot call endDrag while not dragging.");
}
function Ut(t) {
  return {
    beginDrag: Dt(t),
    publishDragSource: It(t),
    hover: Et(t),
    drop: Rt(t),
    endDrag: Ht(t)
  };
}
class $t {
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
    const i = Ut(this);
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
var me = function() {
  return typeof Symbol == "function" && Symbol.observable || "@@observable";
}(), W = function() {
  return Math.random().toString(36).substring(7).split("").join(".");
}, ye = {
  INIT: "@@redux/INIT" + W(),
  REPLACE: "@@redux/REPLACE" + W(),
  PROBE_UNKNOWN_ACTION: function() {
    return "@@redux/PROBE_UNKNOWN_ACTION" + W();
  }
};
function Vt(t) {
  if (typeof t != "object" || t === null)
    return !1;
  for (var e = t; Object.getPrototypeOf(e) !== null; )
    e = Object.getPrototypeOf(e);
  return Object.getPrototypeOf(t) === e;
}
function Ft(t) {
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
  if (Bt(t))
    return "date";
  if (Gt(t))
    return "error";
  var r = qt(t);
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
function qt(t) {
  return typeof t.constructor == "function" ? t.constructor.name : null;
}
function Gt(t) {
  return t instanceof Error || typeof t.message == "string" && t.constructor && typeof t.constructor.stackTraceLimit == "number";
}
function Bt(t) {
  return t instanceof Date ? !0 : typeof t.toDateString == "function" && typeof t.getDate == "function" && typeof t.setDate == "function";
}
function _(t) {
  var e = typeof t;
  return process.env.NODE_ENV !== "production" && (e = Ft(t)), e;
}
function He(t, e, r) {
  var n;
  if (typeof e == "function" && typeof r == "function" || typeof r == "function" && typeof arguments[3] == "function")
    throw new Error(process.env.NODE_ENV === "production" ? b(0) : "It looks like you are passing several store enhancers to createStore(). This is not supported. Instead, compose them together to a single function. See https://redux.js.org/tutorials/fundamentals/part-4-store#creating-a-store-with-enhancers for an example.");
  if (typeof e == "function" && typeof r > "u" && (r = e, e = void 0), typeof r < "u") {
    if (typeof r != "function")
      throw new Error(process.env.NODE_ENV === "production" ? b(1) : "Expected the enhancer to be a function. Instead, received: '" + _(r) + "'");
    return r(He)(t, e);
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
    if (!Vt(f))
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
    for (var v = s = a, S = 0; S < v.length; S++) {
      var T = v[S];
      T();
    }
    return f;
  }
  function u(f) {
    if (typeof f != "function")
      throw new Error(process.env.NODE_ENV === "production" ? b(10) : "Expected the nextReducer to be a function. Instead, received: '" + _(f));
    i = f, h({
      type: ye.REPLACE
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
        function C() {
          T.next && T.next(p());
        }
        C();
        var Y = v(C);
        return {
          unsubscribe: Y
        };
      }
    }, f[me] = function() {
      return this;
    }, f;
  }
  return h({
    type: ye.INIT
  }), n = {
    dispatch: h,
    subscribe: y,
    getState: p,
    replaceReducer: u
  }, n[me] = m, n;
}
const Yt = (t, e) => t === e;
function Wt(t, e) {
  return !t && !e ? !0 : !t || !e ? !1 : t.x === e.x && t.y === e.y;
}
function Xt(t, e, r = Yt) {
  if (t.length !== e.length)
    return !1;
  for (let n = 0; n < t.length; ++n)
    if (!r(t[n], e[n]))
      return !1;
  return !0;
}
function zt(t, e, r) {
  return e in t ? Object.defineProperty(t, e, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : t[e] = r, t;
}
function Kt(t) {
  for (var e = 1; e < arguments.length; e++) {
    var r = arguments[e] != null ? arguments[e] : {}, n = Object.keys(r);
    typeof Object.getOwnPropertySymbols == "function" && (n = n.concat(Object.getOwnPropertySymbols(r).filter(function(i) {
      return Object.getOwnPropertyDescriptor(r, i).enumerable;
    }))), n.forEach(function(i) {
      zt(t, i, r[i]);
    });
  }
  return t;
}
const De = {
  initialSourceClientOffset: null,
  initialClientOffset: null,
  clientOffset: null
};
function Qt(t = De, e) {
  const { payload: r } = e;
  switch (e.type) {
    case se:
    case V:
      return {
        initialSourceClientOffset: r.sourceClientOffset,
        initialClientOffset: r.clientOffset,
        clientOffset: r.clientOffset
      };
    case F:
      return Wt(t.clientOffset, r.clientOffset) ? t : Kt({}, t, {
        clientOffset: r.clientOffset
      });
    case G:
    case q:
      return De;
    default:
      return t;
  }
}
const ue = "dnd-core/ADD_SOURCE", ce = "dnd-core/ADD_TARGET", le = "dnd-core/REMOVE_SOURCE", B = "dnd-core/REMOVE_TARGET";
function Jt(t) {
  return {
    type: ue,
    payload: {
      sourceId: t
    }
  };
}
function Zt(t) {
  return {
    type: ce,
    payload: {
      targetId: t
    }
  };
}
function er(t) {
  return {
    type: le,
    payload: {
      sourceId: t
    }
  };
}
function tr(t) {
  return {
    type: B,
    payload: {
      targetId: t
    }
  };
}
function rr(t, e, r) {
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
      rr(t, i, r[i]);
    });
  }
  return t;
}
const nr = {
  itemType: null,
  item: null,
  sourceId: null,
  targetIds: [],
  dropResult: null,
  didDrop: !1,
  isSourcePublic: null
};
function ir(t = nr, e) {
  const { payload: r } = e;
  switch (e.type) {
    case V:
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
    case F:
      return N({}, t, {
        targetIds: r.targetIds
      });
    case B:
      return t.targetIds.indexOf(r.targetId) === -1 ? t : N({}, t, {
        targetIds: pt(t.targetIds, r.targetId)
      });
    case q:
      return N({}, t, {
        dropResult: r.dropResult,
        didDrop: !0,
        targetIds: []
      });
    case G:
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
function or(t = 0, e) {
  switch (e.type) {
    case ue:
    case ce:
      return t + 1;
    case le:
    case B:
      return t - 1;
    default:
      return t;
  }
}
const A = [], de = [];
A.__IS_NONE__ = !0;
de.__IS_ALL__ = !0;
function sr(t, e) {
  return t === A ? !1 : t === de || typeof e > "u" ? !0 : mt(e, t).length > 0;
}
function ar(t = A, e) {
  switch (e.type) {
    case F:
      break;
    case ue:
    case ce:
    case B:
    case le:
      return A;
    case V:
    case ae:
    case G:
    case q:
    default:
      return de;
  }
  const { targetIds: r = [], prevTargetIds: n = [] } = e.payload, i = vt(r, n);
  if (!(i.length > 0 || !Xt(r, n)))
    return A;
  const s = n[n.length - 1], a = r[r.length - 1];
  return s !== a && (s && i.push(s), a && i.push(a)), i;
}
function ur(t = 0) {
  return t + 1;
}
function cr(t, e, r) {
  return e in t ? Object.defineProperty(t, e, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : t[e] = r, t;
}
function lr(t) {
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
function dr(t = {}, e) {
  return {
    dirtyHandlerIds: ar(t.dirtyHandlerIds, {
      type: e.type,
      payload: lr({}, e.payload, {
        prevTargetIds: ht(t, "dragOperation.targetIds", [])
      })
    }),
    dragOffset: Qt(t.dragOffset, e),
    refCount: or(t.refCount, e),
    dragOperation: ir(t.dragOperation, e),
    stateId: ur(t.stateId)
  };
}
function fr(t, e) {
  return {
    x: t.x + e.x,
    y: t.y + e.y
  };
}
function je(t, e) {
  return {
    x: t.x - e.x,
    y: t.y - e.y
  };
}
function gr(t) {
  const { clientOffset: e, initialClientOffset: r, initialSourceClientOffset: n } = t;
  return !e || !r || !n ? null : je(fr(e, n), r);
}
function hr(t) {
  const { clientOffset: e, initialClientOffset: r } = t;
  return !e || !r ? null : je(e, r);
}
class pr {
  subscribeToStateChange(e, r = {}) {
    const { handlerIds: n } = r;
    g(typeof e == "function", "listener must be a function."), g(typeof n > "u" || Array.isArray(n), "handlerIds, when specified, must be an array of strings.");
    let i = this.store.getState().stateId;
    const o = () => {
      const s = this.store.getState(), a = s.stateId;
      try {
        a === i || a === i + 1 && !sr(s.dirtyHandlerIds, n) || e();
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
    return gr(this.store.getState().dragOffset);
  }
  getDifferenceFromInitialOffset() {
    return hr(this.store.getState().dragOffset);
  }
  constructor(e, r) {
    this.store = e, this.registry = r;
  }
}
let vr = 0;
function mr() {
  return vr++;
}
function yr(t) {
  g(typeof t.canDrag == "function", "Expected canDrag to be a function."), g(typeof t.beginDrag == "function", "Expected beginDrag to be a function."), g(typeof t.endDrag == "function", "Expected endDrag to be a function.");
}
function Dr(t) {
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
const Se = typeof global < "u" ? global : self, Ue = Se.MutationObserver || Se.WebKitMutationObserver;
function $e(t) {
  return function() {
    const r = setTimeout(i, 0), n = setInterval(i, 50);
    function i() {
      clearTimeout(r), clearInterval(n), t();
    }
  };
}
function Sr(t) {
  let e = 1;
  const r = new Ue(t), n = document.createTextNode("");
  return r.observe(n, {
    characterData: !0
  }), function() {
    e = -e, n.data = e;
  };
}
const Or = typeof Ue == "function" ? (
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
  Sr
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
  $e
);
class Tr {
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
    }, this.requestFlush = Or(this.flush), this.requestErrorThrow = $e(() => {
      if (this.pendingErrors.length)
        throw this.pendingErrors.shift();
    });
  }
}
class br {
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
class Ir {
  create(e) {
    const r = this.freeTasks, n = r.length ? r.pop() : new br(
      this.onError,
      (i) => r[r.length] = i
    );
    return n.task = e, n;
  }
  constructor(e) {
    this.onError = e, this.freeTasks = [];
  }
}
const Ve = new Tr(), Er = new Ir(Ve.registerPendingError);
function Cr(t) {
  Ve.enqueueTask(Er.create(t));
}
function wr(t) {
  const e = mr().toString();
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
function Te(t, e) {
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
class _r {
  addSource(e, r) {
    re(e), yr(r);
    const n = this.addHandler(I.SOURCE, e, r);
    return this.store.dispatch(Jt(n)), n;
  }
  addTarget(e, r) {
    re(e, !0), Dr(r);
    const n = this.addHandler(I.TARGET, e, r);
    return this.store.dispatch(Zt(n)), n;
  }
  containsHandler(e) {
    return Te(this.dragSources, e) || Te(this.dropTargets, e);
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
    g(this.getSource(e), "Expected an existing source."), this.store.dispatch(er(e)), Cr(() => {
      this.dragSources.delete(e), this.types.delete(e);
    });
  }
  removeTarget(e) {
    g(this.getTarget(e), "Expected an existing target."), this.store.dispatch(tr(e)), this.dropTargets.delete(e), this.types.delete(e);
  }
  pinSource(e) {
    const r = this.getSource(e);
    g(r, "Expected an existing source."), this.pinnedSourceId = e, this.pinnedSource = r;
  }
  unpinSource() {
    g(this.pinnedSource, "No source is pinned at the time."), this.pinnedSourceId = null, this.pinnedSource = null;
  }
  addHandler(e, r, n) {
    const i = wr(e);
    return this.types.set(i, r), e === I.SOURCE ? this.dragSources.set(i, n) : e === I.TARGET && this.dropTargets.set(i, n), i;
  }
  constructor(e) {
    this.types = /* @__PURE__ */ new Map(), this.dragSources = /* @__PURE__ */ new Map(), this.dropTargets = /* @__PURE__ */ new Map(), this.pinnedSourceId = null, this.pinnedSource = null, this.store = e;
  }
}
function Nr(t, e = void 0, r = {}, n = !1) {
  const i = Pr(n), o = new pr(i, new _r(i)), s = new $t(i, o), a = t(s, e, r);
  return s.receiveBackend(a), s;
}
function Pr(t) {
  const e = typeof window < "u" && window.__REDUX_DEVTOOLS_EXTENSION__;
  return He(dr, t && e && e({
    name: "dnd-core",
    instanceId: "dnd-core"
  }));
}
function be(t, e) {
  (e == null || e > t.length) && (e = t.length);
  for (var r = 0, n = new Array(e); r < e; r++)
    n[r] = t[r];
  return n;
}
function xr(t) {
  if (Array.isArray(t))
    return t;
}
function Rr(t, e) {
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
function Mr() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function Ar(t, e) {
  return xr(t) || Rr(t, e) || kr(t, e) || Mr();
}
function kr(t, e) {
  if (t) {
    if (typeof t == "string")
      return be(t, e);
    var r = Object.prototype.toString.call(t).slice(8, -1);
    if (r === "Object" && t.constructor && (r = t.constructor.name), r === "Map" || r === "Set")
      return Array.from(r);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))
      return be(t, e);
  }
}
var Ie = 0, j = Symbol.for("__VUE_DND_CONTEXT_INSTANCE__");
function Lr(t) {
  return "manager" in t && t.manager;
}
function Hr(t) {
  if (Lr(t)) {
    var e = t.manager;
    return [
      e,
      !1
    ];
  }
  var r = jr(t.backend, t.context, t.options, t.debugMode), n = !t.context;
  return [
    r,
    n
  ];
}
function jr(t) {
  var e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : Fe(), r = arguments.length > 2 ? arguments[2] : void 0, n = arguments.length > 3 ? arguments[3] : void 0, i = e;
  return i[j] || (i[j] = Nr(t, e, r, n)), i[j];
}
function Fe() {
  return typeof globalThis < "u" ? globalThis : typeof global < "u" ? global : window;
}
const Ur = k({
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
    var n = r.slots, i = Ar(Hr(e), 2), o = i[0], s = i[1];
    s && ++Ie, rt(function() {
      if (s) {
        var c = Fe();
        --Ie === 0 && (c[j] = null);
      }
    }), dt(o);
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
function $r(t, e) {
  if (!(t instanceof e))
    throw new TypeError("Cannot call a class as a function");
}
var X = !1, z = !1, Vr = /* @__PURE__ */ function() {
  function t(r) {
    $r(this, t), this.sourceId = null, this.internalMonitor = r.getMonitor();
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
function Fr(t, e) {
  if (!(t instanceof e))
    throw new TypeError("Cannot call a class as a function");
}
var K = !1, qr = /* @__PURE__ */ function() {
  function t(r) {
    Fr(this, t), this.targetId = null, this.internalMonitor = r.getMonitor();
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
    g(!K, "You may not call monitor.canDrop() inside your canDrop() implementation. Read more: http://react-dnd.github.io/react-dnd/docs/api/drop-target-monitor");
    try {
      return K = !0, this.internalMonitor.canDropOnTarget(this.targetId);
    } finally {
      K = !1;
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
}(), Gr = function(t) {
  return t && typeof Symbol < "u" && t.constructor === Symbol ? "symbol" : typeof t;
};
function Br(t) {
  return t ? t.__v_isVNode === !0 : !1;
}
function Yr(t) {
  return t ? t.__v_skip : !1;
}
function Wr(t) {
  return Br(t) && Gr(t.type) !== "symbol";
}
function Xr() {
  throw new Error("Only native element nodes can now be passed to Vue DnD connectors.You can either wrap Component into a <div>, or turn it into a drag source or a drop target itself.");
}
function zr(t) {
  return function() {
    var e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : null, r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null;
    if (Yr(e) && Xr(), !Wr(e)) {
      var n = e;
      return t(n, r), n;
    }
  };
}
function qe(t) {
  var e = {};
  return Object.keys(t).forEach(function(r) {
    var n = t[r];
    if (r.endsWith("Ref"))
      e[r] = t[r];
    else {
      var i = zr(n);
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
function Kr(t, e) {
  if (!(t instanceof e))
    throw new TypeError("Cannot call a class as a function");
}
function Ee(t, e) {
  for (var r = 0; r < e.length; r++) {
    var n = e[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, n.key, n);
  }
}
function Qr(t, e, r) {
  return e && Ee(t.prototype, e), r && Ee(t, r), t;
}
var Jr = /* @__PURE__ */ function() {
  function t(r) {
    var n = this;
    Kr(this, t), this.hooks = qe({
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
  }, Qr(t, [
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
function Zr(t, e) {
  if (!(t instanceof e))
    throw new TypeError("Cannot call a class as a function");
}
function Ce(t, e) {
  for (var r = 0; r < e.length; r++) {
    var n = e[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, n.key, n);
  }
}
function en(t, e, r) {
  return e && Ce(t.prototype, e), r && Ce(t, r), t;
}
var tn = /* @__PURE__ */ function() {
  function t(r) {
    var n = this;
    Zr(this, t), this.hooks = qe({
      dropTarget: function(i, o) {
        n.clearDropTarget(), n.dropTargetOptions = o, nt(i) ? n.dropTargetRef = i : n.dropTargetNode = i, n.reconnect();
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
  }, en(t, [
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
function rn(t, e, r) {
  var n = l(r).getRegistry(), i = n.addTarget(l(t), l(e));
  return [
    i,
    function() {
      return n.removeTarget(i);
    }
  ];
}
function nn(t, e, r) {
  var n = r.getRegistry(), i = n.addSource(t, e);
  return [
    i,
    function() {
      return n.removeSource(i);
    }
  ];
}
function on(t, e) {
  if (!(t instanceof e))
    throw new TypeError("Cannot call a class as a function");
}
var sn = /* @__PURE__ */ function() {
  function t(r, n, i) {
    on(this, t), this.spec = r, this.monitor = n, this.connector = i;
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
function an(t, e, r) {
  var n = D(function() {
    return new sn(l(t), l(e), l(r));
  });
  return E(function() {
    n.value.spec = l(t);
  }), n;
}
function R() {
  var t = ft();
  return g(t != null, "Expected drag drop context"), t;
}
function un(t) {
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
function cn(t) {
  if (Array.isArray(t))
    return t;
}
function ln(t, e) {
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
function dn() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function fn(t, e) {
  return cn(t) || ln(t, e) || gn(t, e) || dn();
}
function gn(t, e) {
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
function hn(t, e, r) {
  var n = R(), i = an(t, e, r), o = un(t);
  E(function(a) {
    if (l(o) != null) {
      var c = fn(nn(l(o), l(i), l(n)), 2), d = c[0], p = c[1];
      l(e).receiveHandlerId(d), l(r).receiveHandlerId(d), a(p);
    }
  });
}
function Ge(t) {
  return D(function() {
    return typeof t == "function" ? t() : t;
  });
}
function pn() {
  var t = R();
  return D(function() {
    return new Vr(l(t));
  });
}
function vn(t, e) {
  var r = R(), n = D(function() {
    return new Jr(l(r).getBackend());
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
var Be = function t(e, r) {
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
function mn(t, e, r) {
  var n = w(l(e)(l(t))), i = function() {
    var o = l(e)(l(t));
    Be(n, o) || (n.value = o, r && r());
  };
  return E(i), [
    n,
    i
  ];
}
function _e(t, e) {
  (e == null || e > t.length) && (e = t.length);
  for (var r = 0, n = new Array(e); r < e; r++)
    n[r] = t[r];
  return n;
}
function yn(t) {
  if (Array.isArray(t))
    return t;
}
function Dn(t, e) {
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
function Sn() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function On(t, e) {
  return yn(t) || Dn(t, e) || Tn(t, e) || Sn();
}
function Tn(t, e) {
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
function bn(t, e, r) {
  var n = On(mn(t, e, r), 2), i = n[0], o = n[1];
  return E(function(a) {
    var c = l(t).getHandlerId();
    c != null && a(l(t).subscribeToStateChange(o, {
      handlerIds: [
        c
      ]
    }));
  }), i;
}
function Ye(t, e, r) {
  var n = function() {
    return {};
  };
  return bn(e, t || n, function() {
    return l(r).reconnect();
  });
}
function fe(t, e) {
  var r = it({
    el: null,
    options: l(e)
  });
  E(function() {
    t(r);
  }, {
    flush: "post"
  });
  var n = function(i, o) {
    pe(r, "el", i);
    var s = l(e) || o;
    return Be(r.options, s) || pe(r, "options", s), l(i);
  };
  return n;
}
function In(t, e) {
  return fe(function(r) {
    l(t).hooks.dragSource()(r.el, r.options);
  }, D(function() {
    return l(e).options;
  }));
}
function En(t, e) {
  return fe(function(r) {
    l(t).hooks.dragPreview()(r.el, r.options);
  }, D(function() {
    return l(e).previewOptions;
  }));
}
function Cn(t) {
  var e = Ge(t), r = pn(), n = vn(D(function() {
    return l(e).options;
  }), D(function() {
    return l(e).previewOptions;
  }));
  return hn(e, r, n), [
    Ye(D(function() {
      return l(e).collect || function() {
        return {};
      };
    }), r, n),
    In(n, e),
    En(n, e)
  ];
}
function wn(t) {
  return D(function() {
    var e = l(t).accept;
    return g(e != null, "accept must be defined"), Array.isArray(e) ? e : [
      e
    ];
  });
}
function _n(t, e) {
  if (!(t instanceof e))
    throw new TypeError("Cannot call a class as a function");
}
var Nn = /* @__PURE__ */ function() {
  function t(r, n) {
    _n(this, t), this.spec = r, this.monitor = n;
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
function Pn(t, e) {
  var r = D(function() {
    return new Nn(l(t), l(e));
  });
  return E(function() {
    r.value.spec = l(t);
  }), r;
}
function Ne(t, e) {
  (e == null || e > t.length) && (e = t.length);
  for (var r = 0, n = new Array(e); r < e; r++)
    n[r] = t[r];
  return n;
}
function xn(t) {
  if (Array.isArray(t))
    return t;
}
function Rn(t, e) {
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
function Mn() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function An(t, e) {
  return xn(t) || Rn(t, e) || kn(t, e) || Mn();
}
function kn(t, e) {
  if (t) {
    if (typeof t == "string")
      return Ne(t, e);
    var r = Object.prototype.toString.call(t).slice(8, -1);
    if (r === "Object" && t.constructor && (r = t.constructor.name), r === "Map" || r === "Set")
      return Array.from(r);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))
      return Ne(t, e);
  }
}
function Ln(t, e, r) {
  var n = R(), i = Pn(t, e), o = wn(t);
  E(function(a) {
    var c = An(rn(o, i, n), 2), d = c[0], p = c[1];
    l(e).receiveHandlerId(d), l(r).receiveHandlerId(d), a(p);
  });
}
function Hn() {
  var t = R();
  return D(function() {
    return new qr(l(t));
  });
}
function jn(t) {
  var e = R(), r = D(function() {
    return new tn(l(e).getBackend());
  });
  return E(function(n) {
    r.value.dropTargetOptions = l(t) || null, r.value.reconnect(), n(function() {
      return r.value.disconnectDropTarget();
    });
  }), r;
}
function Un(t, e) {
  return fe(function(r) {
    l(t).hooks.dropTarget()(r.el, r.options);
  }, D(function() {
    return l(e).options;
  }));
}
function $n(t) {
  var e = Ge(t), r = Hn(), n = jn(D(function() {
    return l(e).options;
  }));
  return Ln(e, r, n), [
    Ye(D(function() {
      return l(e).collect || function() {
        return {};
      };
    }), r, n),
    Un(n, e)
  ];
}
function We(t) {
  let e = null;
  return () => (e == null && (e = t()), e);
}
function Vn(t, e) {
  return t.filter(
    (r) => r !== e
  );
}
function Fn(t, e) {
  const r = /* @__PURE__ */ new Set(), n = (o) => r.add(o);
  t.forEach(n), e.forEach(n);
  const i = [];
  return r.forEach(
    (o) => i.push(o)
  ), i;
}
class qn {
  enter(e) {
    const r = this.entered.length, n = (i) => this.isNodeInDocument(i) && (!i.contains || i.contains(e));
    return this.entered = Fn(this.entered.filter(n), [
      e
    ]), r === 0 && this.entered.length > 0;
  }
  leave(e) {
    const r = this.entered.length;
    return this.entered = Vn(this.entered.filter(this.isNodeInDocument), e), r > 0 && this.entered.length === 0;
  }
  reset() {
    this.entered = [];
  }
  constructor(e) {
    this.entered = [], this.isNodeInDocument = e;
  }
}
class Gn {
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
const Xe = "__NATIVE_FILE__", ze = "__NATIVE_URL__", Ke = "__NATIVE_TEXT__", Qe = "__NATIVE_HTML__", Pe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  FILE: Xe,
  HTML: Qe,
  TEXT: Ke,
  URL: ze
}, Symbol.toStringTag, { value: "Module" }));
function Q(t, e, r) {
  const n = e.reduce(
    (i, o) => i || t.getData(o),
    ""
  );
  return n ?? r;
}
const ie = {
  [Xe]: {
    exposeProperties: {
      files: (t) => Array.prototype.slice.call(t.files),
      items: (t) => t.items,
      dataTransfer: (t) => t
    },
    matchesTypes: [
      "Files"
    ]
  },
  [Qe]: {
    exposeProperties: {
      html: (t, e) => Q(t, e, ""),
      dataTransfer: (t) => t
    },
    matchesTypes: [
      "Html",
      "text/html"
    ]
  },
  [ze]: {
    exposeProperties: {
      urls: (t, e) => Q(t, e, "").split(`
`),
      dataTransfer: (t) => t
    },
    matchesTypes: [
      "Url",
      "text/uri-list"
    ]
  },
  [Ke]: {
    exposeProperties: {
      text: (t, e) => Q(t, e, ""),
      dataTransfer: (t) => t
    },
    matchesTypes: [
      "Text",
      "text/plain"
    ]
  }
};
function Bn(t, e) {
  const r = ie[t];
  if (!r)
    throw new Error(`native type ${t} has no configuration`);
  const n = new Gn(r);
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
const Yn = We(
  () => /firefox/i.test(navigator.userAgent)
), Je = We(
  () => !!window.safari
);
class xe {
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
        const v = o[u + 1], S = a + v;
        d.push(3 * S / ((S + v) / m + (S + a) / f));
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
const Wn = 1;
function Ze(t) {
  const e = t.nodeType === Wn ? t : t.parentElement;
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
function Xn(t) {
  var e;
  return t.nodeName === "IMG" && (Yn() || !(!((e = document.documentElement) === null || e === void 0) && e.contains(t)));
}
function zn(t, e, r, n) {
  let i = t ? e.width : r, o = t ? e.height : n;
  return Je() && t && (o /= window.devicePixelRatio, i /= window.devicePixelRatio), {
    dragPreviewWidth: i,
    dragPreviewHeight: o
  };
}
function Kn(t, e, r, n, i) {
  const o = Xn(e), a = Ze(o ? t : e), c = {
    x: r.x - a.x,
    y: r.y - a.y
  }, { offsetWidth: d, offsetHeight: p } = t, { anchorX: y, anchorY: h } = n, { dragPreviewWidth: u, dragPreviewHeight: m } = zn(o, e, d, p), f = () => {
    let ge = new xe([
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
    return Je() && o && (ge += (window.devicePixelRatio - 1) * m), ge;
  }, v = () => new xe([
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
  ]).interpolate(y), { offsetX: S, offsetY: T } = i, C = S === 0 || S, Y = T === 0 || T;
  return {
    x: C ? S : v(),
    y: Y ? T : f()
  };
}
class Qn {
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
function Jn(t, e, r) {
  return e in t ? Object.defineProperty(t, e, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : t[e] = r, t;
}
function Re(t) {
  for (var e = 1; e < arguments.length; e++) {
    var r = arguments[e] != null ? arguments[e] : {}, n = Object.keys(r);
    typeof Object.getOwnPropertySymbols == "function" && (n = n.concat(Object.getOwnPropertySymbols(r).filter(function(i) {
      return Object.getOwnPropertyDescriptor(r, i).enumerable;
    }))), n.forEach(function(i) {
      Jn(t, i, r[i]);
    });
  }
  return t;
}
class Zn {
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
    return Re({
      dropEffect: this.altKeyPressed ? "copy" : "move"
    }, r || {});
  }
  getCurrentDropEffect() {
    return this.isDraggingNativeItem() ? "copy" : this.getCurrentSourceNodeOptions().dropEffect;
  }
  getCurrentSourcePreviewNodeOptions() {
    const e = this.monitor.getSourceId(), r = this.sourcePreviewNodeOptions.get(e);
    return Re({
      anchorX: 0.5,
      anchorY: 0.5,
      captureDraggingState: !1
    }, r || {});
  }
  isDraggingNativeItem() {
    const e = this.monitor.getItemType();
    return Object.keys(Pe).some(
      (r) => Pe[r] === e
    );
  }
  beginDragNativeItem(e, r) {
    this.clearCurrentDragSourceNode(), this.currentNativeSource = Bn(e, r), this.currentNativeHandle = this.registry.addSource(e, this.currentNativeSource), this.actions.beginDrag([
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
      return o && Ze(o) || null;
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
            const { anchorX: u, anchorY: m, offsetX: f, offsetY: v } = this.getCurrentSourcePreviewNodeOptions(), C = Kn(y, h, s, {
              anchorX: u,
              anchorY: m
            }, {
              offsetX: f,
              offsetY: v
            });
            a.setDragImage(h, C.x, C.y);
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
    }, this.options = new Qn(r, n), this.actions = e.getActions(), this.monitor = e.getMonitor(), this.registry = e.getRegistry(), this.enterLeaveCounter = new qn(this.isNodeInDocument);
  }
}
const ei = function(e, r, n) {
  return new Zn(e, r, n);
}, U = /* @__PURE__ */ k({
  __name: "DndProvider",
  setup(t) {
    return (e, r) => (M(), Z(l(Ur), { backend: l(ei) }, {
      default: ee(() => [
        oe(e.$slots, "default")
      ]),
      _: 3
    }, 8, ["backend"]));
  }
});
U.install = (t) => {
  t.component(U.__name, U);
};
const ti = /* @__PURE__ */ k({
  __name: "DraggableItem",
  props: {
    index: null,
    data: null,
    dragEnd: null,
    dropMove: null
  },
  setup(t) {
    const e = t, r = w(x("uuid")), n = w(x("typeName")), i = w(x("acceptName")), o = w(x("canDrag", !0)), s = w(x("dropEffect")), [a, c] = Cn(() => ({
      type: n.value,
      canDrag: () => o.value,
      item: () => ({ index: e.index, uuid: r.value, data: e.data }),
      options: {
        dropEffect: s.value
      },
      collect: (u) => ({
        canDrag: u.canDrag(),
        getItem: u.getItem(),
        getItemType: u.getItemType(),
        isDragging: u.isDragging(),
        uuid: r.value
      }),
      end: (u, m) => {
        console.log("end", r.value);
        const f = m.didDrop(), v = m.getDropResult(), S = r.value === (v == null ? void 0 : v.uuid);
        f && v && e.dragEnd({ ...u, isSelf: S });
      }
    })), [d, p] = $n(() => ({
      accept: i.value,
      hover: (u, m) => ({ test: 123 }),
      drop: (u, m) => {
        const f = u.index, v = e.index, S = r.value === u.uuid;
        return e.dropMove(u.data, f, v, S), { ...u, uuid: r.value };
      },
      collect: (u) => ({
        isOver: u.isOver(),
        canDrop: u.canDrop(),
        getItem: u.getItem(),
        getDropResult: u.getDropResult(),
        uuid: r.value
      })
    })), y = w(), h = (u) => {
      y.value = c(p(u));
    };
    return (u, m) => ot((M(), Ae("div", {
      class: "draggable-item",
      ref: h,
      key: t.index
    }, [
      st(he(l(r)) + " " + he(JSON.stringify(l(a), null, 2)) + " ", 1),
      oe(u.$slots, "default", {}, void 0, !0)
    ])), [
      [
        at,
        l(s) === "copy" || l(s) === "move" && !l(a).isDragging
      ]
    ]);
  }
});
const et = (t, e) => {
  const r = t.__vccOpts || t;
  for (const [n, i] of e)
    r[n] = i;
  return r;
}, ri = /* @__PURE__ */ et(ti, [["__scopeId", "data-v-98055016"]]);
let H;
const ni = new Uint8Array(16);
function ii() {
  if (!H && (H = typeof crypto < "u" && crypto.getRandomValues && crypto.getRandomValues.bind(crypto), !H))
    throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");
  return H(ni);
}
const O = [];
for (let t = 0; t < 256; ++t)
  O.push((t + 256).toString(16).slice(1));
function oi(t, e = 0) {
  return (O[t[e + 0]] + O[t[e + 1]] + O[t[e + 2]] + O[t[e + 3]] + "-" + O[t[e + 4]] + O[t[e + 5]] + "-" + O[t[e + 6]] + O[t[e + 7]] + "-" + O[t[e + 8]] + O[t[e + 9]] + "-" + O[t[e + 10]] + O[t[e + 11]] + O[t[e + 12]] + O[t[e + 13]] + O[t[e + 14]] + O[t[e + 15]]).toLowerCase();
}
const si = typeof crypto < "u" && crypto.randomUUID && crypto.randomUUID.bind(crypto), Me = {
  randomUUID: si
};
function ai(t, e, r) {
  if (Me.randomUUID && !e && !t)
    return Me.randomUUID();
  t = t || {};
  const n = t.random || (t.rng || ii)();
  if (n[6] = n[6] & 15 | 64, n[8] = n[8] & 63 | 128, e) {
    r = r || 0;
    for (let i = 0; i < 16; ++i)
      e[r + i] = n[i];
    return e;
  }
  return oi(n);
}
const ui = /* @__PURE__ */ k({
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
    const r = t, n = ai(), i = (h) => {
      let u = [];
      return typeof h == "string" ? u = [h, n] : Array.isArray(h) ? u = [...h, n] : u = [n], u;
    }, o = D(() => r.dragName || n), s = D(() => i(r.dropName)), a = D(() => !r.disabled), c = D(() => r.dropEffect);
    P("uuid", n), P("typeName", o), P("acceptName", s), P("canDrag", a), P("dropEffect", c);
    const d = D({
      get() {
        return r.list;
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
      const m = ri;
      return M(), Z(ut, {
        name: "list",
        tag: "div"
      }, {
        default: ee(() => [
          (M(!0), Ae(ct, null, lt(l(d), (f, v) => (M(), Z(m, {
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
const $ = /* @__PURE__ */ et(ui, [["__scopeId", "data-v-4a4acd6d"]]);
$.install = (t) => {
  t.component($.__name, $);
};
const ci = [$, U], li = (t) => {
  ci.forEach((e) => {
    t.component(e.__name, e);
  });
}, fi = {
  install: li
};
export {
  U as DndProvider,
  fi as default,
  $ as draggable
};
//# sourceMappingURL=index.js.map
