import { provide as _, inject as N, defineComponent as k, onUnmounted as tt, watchEffect as C, isRef as rt, unref as l, computed as O, ref as w, reactive as nt, openBlock as R, createBlock as ie, withCtx as oe, renderSlot as se, Transition as it, withDirectives as ot, createElementBlock as Z, vShow as st, Fragment as at, renderList as ut } from "vue";
function pe(t, e, r) {
  return Array.isArray(t) ? (t.length = Math.max(t.length, e), t.splice(e, 1, r), r) : (t[e] = r, r);
}
var Ae = Symbol("DndContextType");
function ct(t) {
  _(Ae, t);
}
function lt() {
  return N(Ae);
}
var I;
(function(t) {
  t.SOURCE = "SOURCE", t.TARGET = "TARGET";
})(I || (I = {}));
function g(t, e, ...r) {
  if (dt() && e === void 0)
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
function dt() {
  return typeof process < "u" && process.env.NODE_ENV === "production";
}
const ae = "dnd-core/INIT_COORDS", F = "dnd-core/BEGIN_DRAG", ue = "dnd-core/PUBLISH_DRAG_SOURCE", V = "dnd-core/HOVER", q = "dnd-core/DROP", B = "dnd-core/END_DRAG";
function ve(t, e) {
  return {
    type: ae,
    payload: {
      sourceClientOffset: e || null,
      clientOffset: t || null
    }
  };
}
function ft(t, e, r) {
  return e.split(".").reduce(
    (n, i) => n && n[i] ? n[i] : r || null,
    t
  );
}
function gt(t, e) {
  return t.filter(
    (r) => r !== e
  );
}
function ke(t) {
  return typeof t == "object";
}
function ht(t, e) {
  const r = /* @__PURE__ */ new Map(), n = (o) => {
    r.set(o, r.has(o) ? r.get(o) + 1 : 1);
  };
  t.forEach(n), e.forEach(n);
  const i = [];
  return r.forEach((o, s) => {
    o === 1 && i.push(s);
  }), i;
}
function pt(t, e) {
  return t.filter(
    (r) => e.indexOf(r) > -1
  );
}
const vt = {
  type: ae,
  payload: {
    clientOffset: null,
    sourceClientOffset: null
  }
};
function mt(t) {
  return function(r = [], n = {
    publishSource: !0
  }) {
    const { publishSource: i = !0, clientOffset: o, getSourceClientOffset: s } = n, a = t.getMonitor(), u = t.getRegistry();
    t.dispatch(ve(o)), yt(r, a, u);
    const d = Ot(r, a);
    if (d == null) {
      t.dispatch(vt);
      return;
    }
    let h = null;
    if (o) {
      if (!s)
        throw new Error("getSourceClientOffset must be defined");
      Dt(s), h = s(d);
    }
    t.dispatch(ve(o, h));
    const y = u.getSource(d).beginDrag(a, d);
    if (y == null)
      return;
    St(y), u.pinSource(d);
    const f = u.getSourceType(d);
    return {
      type: F,
      payload: {
        itemType: f,
        item: y,
        sourceId: d,
        clientOffset: o || null,
        sourceClientOffset: h || null,
        isSourcePublic: !!i
      }
    };
  };
}
function yt(t, e, r) {
  g(!e.isDragging(), "Cannot call beginDrag while dragging."), t.forEach(function(n) {
    g(r.getSource(n), "Expected sourceIds to be registered.");
  });
}
function Dt(t) {
  g(typeof t == "function", "When clientOffset is provided, getSourceClientOffset must be a function.");
}
function St(t) {
  g(ke(t), "Item must be an object.");
}
function Ot(t, e) {
  let r = null;
  for (let n = t.length - 1; n >= 0; n--)
    if (e.canDragSource(t[n])) {
      r = t[n];
      break;
    }
  return r;
}
function Tt(t) {
  return function() {
    if (t.getMonitor().isDragging())
      return {
        type: ue
      };
  };
}
function ee(t, e) {
  return e === null ? t === null : Array.isArray(t) ? t.some(
    (r) => r === e
  ) : t === e;
}
function bt(t) {
  return function(r, { clientOffset: n } = {}) {
    It(r);
    const i = r.slice(0), o = t.getMonitor(), s = t.getRegistry();
    Et(i, o, s);
    const a = o.getItemType();
    return Ct(i, s, a), wt(i, o, s), {
      type: V,
      payload: {
        targetIds: i,
        clientOffset: n || null
      }
    };
  };
}
function It(t) {
  g(Array.isArray(t), "Expected targetIds to be an array.");
}
function Et(t, e, r) {
  g(e.isDragging(), "Cannot call hover while not dragging."), g(!e.didDrop(), "Cannot call hover after drop.");
  for (let n = 0; n < t.length; n++) {
    const i = t[n];
    g(t.lastIndexOf(i) === n, "Expected targetIds to be unique in the passed array.");
    const o = r.getTarget(i);
    g(o, "Expected targetIds to be registered.");
  }
}
function Ct(t, e, r) {
  for (let n = t.length - 1; n >= 0; n--) {
    const i = t[n], o = e.getTargetType(i);
    ee(o, r) || t.splice(n, 1);
  }
}
function wt(t, e, r) {
  t.forEach(function(n) {
    r.getTarget(n).hover(e, n);
  });
}
function _t(t, e, r) {
  return e in t ? Object.defineProperty(t, e, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : t[e] = r, t;
}
function Nt(t) {
  for (var e = 1; e < arguments.length; e++) {
    var r = arguments[e] != null ? arguments[e] : {}, n = Object.keys(r);
    typeof Object.getOwnPropertySymbols == "function" && (n = n.concat(Object.getOwnPropertySymbols(r).filter(function(i) {
      return Object.getOwnPropertyDescriptor(r, i).enumerable;
    }))), n.forEach(function(i) {
      _t(t, i, r[i]);
    });
  }
  return t;
}
function Pt(t) {
  return function(r = {}) {
    const n = t.getMonitor(), i = t.getRegistry();
    xt(n), At(n).forEach((s, a) => {
      const u = Rt(s, a, i, n), d = {
        type: q,
        payload: {
          dropResult: Nt({}, r, u)
        }
      };
      t.dispatch(d);
    });
  };
}
function xt(t) {
  g(t.isDragging(), "Cannot call drop while not dragging."), g(!t.didDrop(), "Cannot call drop twice during one drag operation.");
}
function Rt(t, e, r, n) {
  const i = r.getTarget(t);
  let o = i ? i.drop(n, t) : void 0;
  return Mt(o), typeof o > "u" && (o = e === 0 ? {} : n.getDropResult()), o;
}
function Mt(t) {
  g(typeof t > "u" || ke(t), "Drop result must either be an object or undefined.");
}
function At(t) {
  const e = t.getTargetIds().filter(t.canDropOnTarget, t);
  return e.reverse(), e;
}
function kt(t) {
  return function() {
    const r = t.getMonitor(), n = t.getRegistry();
    Lt(r);
    const i = r.getSourceId();
    return i != null && (n.getSource(i, !0).endDrag(r, i), n.unpinSource()), {
      type: B
    };
  };
}
function Lt(t) {
  g(t.isDragging(), "Cannot call endDrag while not dragging.");
}
function Ht(t) {
  return {
    beginDrag: mt(t),
    publishDragSource: Tt(t),
    hover: bt(t),
    drop: Pt(t),
    endDrag: kt(t)
  };
}
class jt {
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
    const i = Ht(this);
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
function Ut(t) {
  if (typeof t != "object" || t === null)
    return !1;
  for (var e = t; Object.getPrototypeOf(e) !== null; )
    e = Object.getPrototypeOf(e);
  return Object.getPrototypeOf(t) === e;
}
function $t(t) {
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
  if (qt(t))
    return "date";
  if (Vt(t))
    return "error";
  var r = Ft(t);
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
function Ft(t) {
  return typeof t.constructor == "function" ? t.constructor.name : null;
}
function Vt(t) {
  return t instanceof Error || typeof t.message == "string" && t.constructor && typeof t.constructor.stackTraceLimit == "number";
}
function qt(t) {
  return t instanceof Date ? !0 : typeof t.toDateString == "function" && typeof t.getDate == "function" && typeof t.setDate == "function";
}
function P(t) {
  var e = typeof t;
  return process.env.NODE_ENV !== "production" && (e = $t(t)), e;
}
function Le(t, e, r) {
  var n;
  if (typeof e == "function" && typeof r == "function" || typeof r == "function" && typeof arguments[3] == "function")
    throw new Error(process.env.NODE_ENV === "production" ? b(0) : "It looks like you are passing several store enhancers to createStore(). This is not supported. Instead, compose them together to a single function. See https://redux.js.org/tutorials/fundamentals/part-4-store#creating-a-store-with-enhancers for an example.");
  if (typeof e == "function" && typeof r > "u" && (r = e, e = void 0), typeof r < "u") {
    if (typeof r != "function")
      throw new Error(process.env.NODE_ENV === "production" ? b(1) : "Expected the enhancer to be a function. Instead, received: '" + P(r) + "'");
    return r(Le)(t, e);
  }
  if (typeof t != "function")
    throw new Error(process.env.NODE_ENV === "production" ? b(2) : "Expected the root reducer to be a function. Instead, received: '" + P(t) + "'");
  var i = t, o = e, s = [], a = s, u = !1;
  function d() {
    a === s && (a = s.slice());
  }
  function h() {
    if (u)
      throw new Error(process.env.NODE_ENV === "production" ? b(3) : "You may not call store.getState() while the reducer is executing. The reducer has already received the state as an argument. Pass it down from the top reducer instead of reading it from the store.");
    return o;
  }
  function S(c) {
    if (typeof c != "function")
      throw new Error(process.env.NODE_ENV === "production" ? b(4) : "Expected the listener to be a function. Instead, received: '" + P(c) + "'");
    if (u)
      throw new Error(process.env.NODE_ENV === "production" ? b(5) : "You may not call store.subscribe() while the reducer is executing. If you would like to be notified after the store has been updated, subscribe from a component and invoke store.getState() in the callback to access the latest state. See https://redux.js.org/api/store#subscribelistener for more details.");
    var v = !0;
    return d(), a.push(c), function() {
      if (v) {
        if (u)
          throw new Error(process.env.NODE_ENV === "production" ? b(6) : "You may not unsubscribe from a store listener while the reducer is executing. See https://redux.js.org/api/store#subscribelistener for more details.");
        v = !1, d();
        var m = a.indexOf(c);
        a.splice(m, 1), s = null;
      }
    };
  }
  function y(c) {
    if (!Ut(c))
      throw new Error(process.env.NODE_ENV === "production" ? b(7) : "Actions must be plain objects. Instead, the actual type was: '" + P(c) + "'. You may need to add middleware to your store setup to handle dispatching other values, such as 'redux-thunk' to handle dispatching functions. See https://redux.js.org/tutorials/fundamentals/part-4-store#middleware and https://redux.js.org/tutorials/fundamentals/part-6-async-logic#using-the-redux-thunk-middleware for examples.");
    if (typeof c.type > "u")
      throw new Error(process.env.NODE_ENV === "production" ? b(8) : 'Actions may not have an undefined "type" property. You may have misspelled an action type string constant.');
    if (u)
      throw new Error(process.env.NODE_ENV === "production" ? b(9) : "Reducers may not dispatch actions.");
    try {
      u = !0, o = i(o, c);
    } finally {
      u = !1;
    }
    for (var v = s = a, D = 0; D < v.length; D++) {
      var m = v[D];
      m();
    }
    return c;
  }
  function f(c) {
    if (typeof c != "function")
      throw new Error(process.env.NODE_ENV === "production" ? b(10) : "Expected the nextReducer to be a function. Instead, received: '" + P(c));
    i = c, y({
      type: ye.REPLACE
    });
  }
  function p() {
    var c, v = S;
    return c = {
      /**
       * The minimal observable subscription method.
       * @param {Object} observer Any object that can be used as an observer.
       * The observer object should have a `next` method.
       * @returns {subscription} An object with an `unsubscribe` method that can
       * be used to unsubscribe the observable from the store, and prevent further
       * emission of values from the observable.
       */
      subscribe: function(m) {
        if (typeof m != "object" || m === null)
          throw new Error(process.env.NODE_ENV === "production" ? b(11) : "Expected the observer to be an object. Instead, received: '" + P(m) + "'");
        function E() {
          m.next && m.next(h());
        }
        E();
        var Y = v(E);
        return {
          unsubscribe: Y
        };
      }
    }, c[me] = function() {
      return this;
    }, c;
  }
  return y({
    type: ye.INIT
  }), n = {
    dispatch: y,
    subscribe: S,
    getState: h,
    replaceReducer: f
  }, n[me] = p, n;
}
const Bt = (t, e) => t === e;
function Gt(t, e) {
  return !t && !e ? !0 : !t || !e ? !1 : t.x === e.x && t.y === e.y;
}
function Yt(t, e, r = Bt) {
  if (t.length !== e.length)
    return !1;
  for (let n = 0; n < t.length; ++n)
    if (!r(t[n], e[n]))
      return !1;
  return !0;
}
function Wt(t, e, r) {
  return e in t ? Object.defineProperty(t, e, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : t[e] = r, t;
}
function Xt(t) {
  for (var e = 1; e < arguments.length; e++) {
    var r = arguments[e] != null ? arguments[e] : {}, n = Object.keys(r);
    typeof Object.getOwnPropertySymbols == "function" && (n = n.concat(Object.getOwnPropertySymbols(r).filter(function(i) {
      return Object.getOwnPropertyDescriptor(r, i).enumerable;
    }))), n.forEach(function(i) {
      Wt(t, i, r[i]);
    });
  }
  return t;
}
const De = {
  initialSourceClientOffset: null,
  initialClientOffset: null,
  clientOffset: null
};
function zt(t = De, e) {
  const { payload: r } = e;
  switch (e.type) {
    case ae:
    case F:
      return {
        initialSourceClientOffset: r.sourceClientOffset,
        initialClientOffset: r.clientOffset,
        clientOffset: r.clientOffset
      };
    case V:
      return Gt(t.clientOffset, r.clientOffset) ? t : Xt({}, t, {
        clientOffset: r.clientOffset
      });
    case B:
    case q:
      return De;
    default:
      return t;
  }
}
const ce = "dnd-core/ADD_SOURCE", le = "dnd-core/ADD_TARGET", de = "dnd-core/REMOVE_SOURCE", G = "dnd-core/REMOVE_TARGET";
function Kt(t) {
  return {
    type: ce,
    payload: {
      sourceId: t
    }
  };
}
function Qt(t) {
  return {
    type: le,
    payload: {
      targetId: t
    }
  };
}
function Jt(t) {
  return {
    type: de,
    payload: {
      sourceId: t
    }
  };
}
function Zt(t) {
  return {
    type: G,
    payload: {
      targetId: t
    }
  };
}
function er(t, e, r) {
  return e in t ? Object.defineProperty(t, e, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : t[e] = r, t;
}
function x(t) {
  for (var e = 1; e < arguments.length; e++) {
    var r = arguments[e] != null ? arguments[e] : {}, n = Object.keys(r);
    typeof Object.getOwnPropertySymbols == "function" && (n = n.concat(Object.getOwnPropertySymbols(r).filter(function(i) {
      return Object.getOwnPropertyDescriptor(r, i).enumerable;
    }))), n.forEach(function(i) {
      er(t, i, r[i]);
    });
  }
  return t;
}
const tr = {
  itemType: null,
  item: null,
  sourceId: null,
  targetIds: [],
  dropResult: null,
  didDrop: !1,
  isSourcePublic: null
};
function rr(t = tr, e) {
  const { payload: r } = e;
  switch (e.type) {
    case F:
      return x({}, t, {
        itemType: r.itemType,
        item: r.item,
        sourceId: r.sourceId,
        isSourcePublic: r.isSourcePublic,
        dropResult: null,
        didDrop: !1
      });
    case ue:
      return x({}, t, {
        isSourcePublic: !0
      });
    case V:
      return x({}, t, {
        targetIds: r.targetIds
      });
    case G:
      return t.targetIds.indexOf(r.targetId) === -1 ? t : x({}, t, {
        targetIds: gt(t.targetIds, r.targetId)
      });
    case q:
      return x({}, t, {
        dropResult: r.dropResult,
        didDrop: !0,
        targetIds: []
      });
    case B:
      return x({}, t, {
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
function nr(t = 0, e) {
  switch (e.type) {
    case ce:
    case le:
      return t + 1;
    case de:
    case G:
      return t - 1;
    default:
      return t;
  }
}
const A = [], fe = [];
A.__IS_NONE__ = !0;
fe.__IS_ALL__ = !0;
function ir(t, e) {
  return t === A ? !1 : t === fe || typeof e > "u" ? !0 : pt(e, t).length > 0;
}
function or(t = A, e) {
  switch (e.type) {
    case V:
      break;
    case ce:
    case le:
    case G:
    case de:
      return A;
    case F:
    case ue:
    case B:
    case q:
    default:
      return fe;
  }
  const { targetIds: r = [], prevTargetIds: n = [] } = e.payload, i = ht(r, n);
  if (!(i.length > 0 || !Yt(r, n)))
    return A;
  const s = n[n.length - 1], a = r[r.length - 1];
  return s !== a && (s && i.push(s), a && i.push(a)), i;
}
function sr(t = 0) {
  return t + 1;
}
function ar(t, e, r) {
  return e in t ? Object.defineProperty(t, e, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : t[e] = r, t;
}
function ur(t) {
  for (var e = 1; e < arguments.length; e++) {
    var r = arguments[e] != null ? arguments[e] : {}, n = Object.keys(r);
    typeof Object.getOwnPropertySymbols == "function" && (n = n.concat(Object.getOwnPropertySymbols(r).filter(function(i) {
      return Object.getOwnPropertyDescriptor(r, i).enumerable;
    }))), n.forEach(function(i) {
      ar(t, i, r[i]);
    });
  }
  return t;
}
function cr(t = {}, e) {
  return {
    dirtyHandlerIds: or(t.dirtyHandlerIds, {
      type: e.type,
      payload: ur({}, e.payload, {
        prevTargetIds: ft(t, "dragOperation.targetIds", [])
      })
    }),
    dragOffset: zt(t.dragOffset, e),
    refCount: nr(t.refCount, e),
    dragOperation: rr(t.dragOperation, e),
    stateId: sr(t.stateId)
  };
}
function lr(t, e) {
  return {
    x: t.x + e.x,
    y: t.y + e.y
  };
}
function He(t, e) {
  return {
    x: t.x - e.x,
    y: t.y - e.y
  };
}
function dr(t) {
  const { clientOffset: e, initialClientOffset: r, initialSourceClientOffset: n } = t;
  return !e || !r || !n ? null : He(lr(e, n), r);
}
function fr(t) {
  const { clientOffset: e, initialClientOffset: r } = t;
  return !e || !r ? null : He(e, r);
}
class gr {
  subscribeToStateChange(e, r = {}) {
    const { handlerIds: n } = r;
    g(typeof e == "function", "listener must be a function."), g(typeof n > "u" || Array.isArray(n), "handlerIds, when specified, must be an array of strings.");
    let i = this.store.getState().stateId;
    const o = () => {
      const s = this.store.getState(), a = s.stateId;
      try {
        a === i || a === i + 1 && !ir(s.dirtyHandlerIds, n) || e();
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
    return ee(n, i) && r.canDrop(this, e);
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
    if (o && !ee(i, o))
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
    return dr(this.store.getState().dragOffset);
  }
  getDifferenceFromInitialOffset() {
    return fr(this.store.getState().dragOffset);
  }
  constructor(e, r) {
    this.store = e, this.registry = r;
  }
}
let hr = 0;
function pr() {
  return hr++;
}
function vr(t) {
  g(typeof t.canDrag == "function", "Expected canDrag to be a function."), g(typeof t.beginDrag == "function", "Expected beginDrag to be a function."), g(typeof t.endDrag == "function", "Expected endDrag to be a function.");
}
function mr(t) {
  g(typeof t.canDrop == "function", "Expected canDrop to be a function."), g(typeof t.hover == "function", "Expected hover to be a function."), g(typeof t.drop == "function", "Expected beginDrag to be a function.");
}
function te(t, e) {
  if (e && Array.isArray(t)) {
    t.forEach(
      (r) => te(r, !1)
    );
    return;
  }
  g(typeof t == "string" || typeof t == "symbol", e ? "Type can only be a string, a symbol, or an array of either." : "Type can only be a string or a symbol.");
}
const Se = typeof global < "u" ? global : self, je = Se.MutationObserver || Se.WebKitMutationObserver;
function Ue(t) {
  return function() {
    const r = setTimeout(i, 0), n = setInterval(i, 50);
    function i() {
      clearTimeout(r), clearInterval(n), t();
    }
  };
}
function yr(t) {
  let e = 1;
  const r = new je(t), n = document.createTextNode("");
  return r.observe(n, {
    characterData: !0
  }), function() {
    e = -e, n.data = e;
  };
}
const Dr = typeof je == "function" ? (
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
  yr
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
  Ue
);
class Sr {
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
    }, this.requestFlush = Dr(this.flush), this.requestErrorThrow = Ue(() => {
      if (this.pendingErrors.length)
        throw this.pendingErrors.shift();
    });
  }
}
class Or {
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
class Tr {
  create(e) {
    const r = this.freeTasks, n = r.length ? r.pop() : new Or(
      this.onError,
      (i) => r[r.length] = i
    );
    return n.task = e, n;
  }
  constructor(e) {
    this.onError = e, this.freeTasks = [];
  }
}
const $e = new Sr(), br = new Tr($e.registerPendingError);
function Ir(t) {
  $e.enqueueTask(br.create(t));
}
function Er(t) {
  const e = pr().toString();
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
class Cr {
  addSource(e, r) {
    te(e), vr(r);
    const n = this.addHandler(I.SOURCE, e, r);
    return this.store.dispatch(Kt(n)), n;
  }
  addTarget(e, r) {
    te(e, !0), mr(r);
    const n = this.addHandler(I.TARGET, e, r);
    return this.store.dispatch(Qt(n)), n;
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
    g(this.getSource(e), "Expected an existing source."), this.store.dispatch(Jt(e)), Ir(() => {
      this.dragSources.delete(e), this.types.delete(e);
    });
  }
  removeTarget(e) {
    g(this.getTarget(e), "Expected an existing target."), this.store.dispatch(Zt(e)), this.dropTargets.delete(e), this.types.delete(e);
  }
  pinSource(e) {
    const r = this.getSource(e);
    g(r, "Expected an existing source."), this.pinnedSourceId = e, this.pinnedSource = r;
  }
  unpinSource() {
    g(this.pinnedSource, "No source is pinned at the time."), this.pinnedSourceId = null, this.pinnedSource = null;
  }
  addHandler(e, r, n) {
    const i = Er(e);
    return this.types.set(i, r), e === I.SOURCE ? this.dragSources.set(i, n) : e === I.TARGET && this.dropTargets.set(i, n), i;
  }
  constructor(e) {
    this.types = /* @__PURE__ */ new Map(), this.dragSources = /* @__PURE__ */ new Map(), this.dropTargets = /* @__PURE__ */ new Map(), this.pinnedSourceId = null, this.pinnedSource = null, this.store = e;
  }
}
function wr(t, e = void 0, r = {}, n = !1) {
  const i = _r(n), o = new gr(i, new Cr(i)), s = new jt(i, o), a = t(s, e, r);
  return s.receiveBackend(a), s;
}
function _r(t) {
  const e = typeof window < "u" && window.__REDUX_DEVTOOLS_EXTENSION__;
  return Le(cr, t && e && e({
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
function Nr(t) {
  if (Array.isArray(t))
    return t;
}
function Pr(t, e) {
  var r = t == null ? null : typeof Symbol < "u" && t[Symbol.iterator] || t["@@iterator"];
  if (r != null) {
    var n = [], i = !0, o = !1, s, a;
    try {
      for (r = r.call(t); !(i = (s = r.next()).done) && (n.push(s.value), !(e && n.length === e)); i = !0)
        ;
    } catch (u) {
      o = !0, a = u;
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
function xr() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function Rr(t, e) {
  return Nr(t) || Pr(t, e) || Mr(t, e) || xr();
}
function Mr(t, e) {
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
function Ar(t) {
  return "manager" in t && t.manager;
}
function kr(t) {
  if (Ar(t)) {
    var e = t.manager;
    return [
      e,
      !1
    ];
  }
  var r = Lr(t.backend, t.context, t.options, t.debugMode), n = !t.context;
  return [
    r,
    n
  ];
}
function Lr(t) {
  var e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : Fe(), r = arguments.length > 2 ? arguments[2] : void 0, n = arguments.length > 3 ? arguments[3] : void 0, i = e;
  return i[j] || (i[j] = wr(t, e, r, n)), i[j];
}
function Fe() {
  return typeof globalThis < "u" ? globalThis : typeof global < "u" ? global : window;
}
const Hr = k({
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
    var n = r.slots, i = Rr(kr(e), 2), o = i[0], s = i[1];
    s && ++Ie, tt(function() {
      if (s) {
        var u = Fe();
        --Ie === 0 && (u[j] = null);
      }
    }), ct(o);
    var a;
    return function() {
      var u;
      return (a = (u = n.default) === null || u === void 0 ? void 0 : u.call(n)) !== null && a !== void 0 ? a : null;
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
    return C(function() {
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
function jr(t, e) {
  if (!(t instanceof e))
    throw new TypeError("Cannot call a class as a function");
}
var X = !1, z = !1, Ur = /* @__PURE__ */ function() {
  function t(r) {
    jr(this, t), this.sourceId = null, this.internalMonitor = r.getMonitor();
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
function $r(t, e) {
  if (!(t instanceof e))
    throw new TypeError("Cannot call a class as a function");
}
var K = !1, Fr = /* @__PURE__ */ function() {
  function t(r) {
    $r(this, t), this.targetId = null, this.internalMonitor = r.getMonitor();
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
}(), Vr = function(t) {
  return t && typeof Symbol < "u" && t.constructor === Symbol ? "symbol" : typeof t;
};
function qr(t) {
  return t ? t.__v_isVNode === !0 : !1;
}
function Br(t) {
  return t ? t.__v_skip : !1;
}
function Gr(t) {
  return qr(t) && Vr(t.type) !== "symbol";
}
function Yr() {
  throw new Error("Only native element nodes can now be passed to Vue DnD connectors.You can either wrap Component into a <div>, or turn it into a drag source or a drop target itself.");
}
function Wr(t) {
  return function() {
    var e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : null, r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null;
    if (Br(e) && Yr(), !Gr(e)) {
      var n = e;
      return t(n, r), n;
    }
  };
}
function Ve(t) {
  var e = {};
  return Object.keys(t).forEach(function(r) {
    var n = t[r];
    if (r.endsWith("Ref"))
      e[r] = t[r];
    else {
      var i = Wr(n);
      e[r] = function() {
        return i;
      };
    }
  }), e;
}
function re(t, e, r, n) {
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
  for (let u = 0; u < o.length; u++) {
    const d = o[u];
    if (!a(d))
      return !1;
    const h = t[d], S = e[d];
    if (i = r ? r.call(n, h, S, d) : void 0, i === !1 || i === void 0 && h !== S)
      return !1;
  }
  return !0;
}
function Xr(t, e) {
  if (!(t instanceof e))
    throw new TypeError("Cannot call a class as a function");
}
function Ee(t, e) {
  for (var r = 0; r < e.length; r++) {
    var n = e[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, n.key, n);
  }
}
function zr(t, e, r) {
  return e && Ee(t.prototype, e), r && Ee(t, r), t;
}
var Kr = /* @__PURE__ */ function() {
  function t(r) {
    var n = this;
    Xr(this, t), this.hooks = Ve({
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
    return !re(this.lastConnectedDragSourceOptions, this.dragSourceOptions);
  }, e.didDragPreviewOptionsChange = function() {
    return !re(this.lastConnectedDragPreviewOptions, this.dragPreviewOptions);
  }, e.disconnectDragSource = function() {
    this.dragSourceUnsubscribe && (this.dragSourceUnsubscribe(), this.dragSourceUnsubscribe = void 0);
  }, e.disconnectDragPreview = function() {
    this.dragPreviewUnsubscribe && (this.dragPreviewUnsubscribe(), this.dragPreviewUnsubscribe = void 0, this.dragPreviewNode = null);
  }, e.clearDragSource = function() {
    this.dragSourceNode = null;
  }, e.clearDragPreview = function() {
    this.dragPreviewNode = null;
  }, zr(t, [
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
function Qr(t, e) {
  if (!(t instanceof e))
    throw new TypeError("Cannot call a class as a function");
}
function Ce(t, e) {
  for (var r = 0; r < e.length; r++) {
    var n = e[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, n.key, n);
  }
}
function Jr(t, e, r) {
  return e && Ce(t.prototype, e), r && Ce(t, r), t;
}
var Zr = /* @__PURE__ */ function() {
  function t(r) {
    var n = this;
    Qr(this, t), this.hooks = Ve({
      dropTarget: function(i, o) {
        n.clearDropTarget(), n.dropTargetOptions = o, rt(i) ? n.dropTargetRef = i : n.dropTargetNode = i, n.reconnect();
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
    return !re(this.lastConnectedDropTargetOptions, this.dropTargetOptions);
  }, e.disconnectDropTarget = function() {
    this.unsubscribeDropTarget && (this.unsubscribeDropTarget(), this.unsubscribeDropTarget = void 0);
  }, e.clearDropTarget = function() {
    this.dropTargetRef = null, this.dropTargetNode = null;
  }, Jr(t, [
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
function en(t, e, r) {
  var n = l(r).getRegistry(), i = n.addTarget(l(t), l(e));
  return [
    i,
    function() {
      return n.removeTarget(i);
    }
  ];
}
function tn(t, e, r) {
  var n = r.getRegistry(), i = n.addSource(t, e);
  return [
    i,
    function() {
      return n.removeSource(i);
    }
  ];
}
function rn(t, e) {
  if (!(t instanceof e))
    throw new TypeError("Cannot call a class as a function");
}
var nn = /* @__PURE__ */ function() {
  function t(r, n, i) {
    rn(this, t), this.spec = r, this.monitor = n, this.connector = i;
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
function on(t, e, r) {
  var n = O(function() {
    return new nn(l(t), l(e), l(r));
  });
  return C(function() {
    n.value.spec = l(t);
  }), n;
}
function M() {
  var t = lt();
  return g(t != null, "Expected drag drop context"), t;
}
function sn(t) {
  return O(function() {
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
function an(t) {
  if (Array.isArray(t))
    return t;
}
function un(t, e) {
  var r = t == null ? null : typeof Symbol < "u" && t[Symbol.iterator] || t["@@iterator"];
  if (r != null) {
    var n = [], i = !0, o = !1, s, a;
    try {
      for (r = r.call(t); !(i = (s = r.next()).done) && (n.push(s.value), !(e && n.length === e)); i = !0)
        ;
    } catch (u) {
      o = !0, a = u;
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
function cn() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function ln(t, e) {
  return an(t) || un(t, e) || dn(t, e) || cn();
}
function dn(t, e) {
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
function fn(t, e, r) {
  var n = M(), i = on(t, e, r), o = sn(t);
  C(function(a) {
    if (l(o) != null) {
      var u = ln(tn(l(o), l(i), l(n)), 2), d = u[0], h = u[1];
      l(e).receiveHandlerId(d), l(r).receiveHandlerId(d), a(h);
    }
  });
}
function qe(t) {
  return O(function() {
    return typeof t == "function" ? t() : t;
  });
}
function gn() {
  var t = M();
  return O(function() {
    return new Ur(l(t));
  });
}
function hn(t, e) {
  var r = M(), n = O(function() {
    return new Kr(l(r).getBackend());
  });
  return C(function(i) {
    n.value.dragSourceOptions = l(t) || null, l(n).reconnect(), i(function() {
      n.value.disconnectDragSource();
    });
  }), C(function(i) {
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
function pn(t, e, r) {
  var n = w(l(e)(l(t))), i = function() {
    var o = l(e)(l(t));
    Be(n, o) || (n.value = o, r && r());
  };
  return C(i), [
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
    } catch (u) {
      o = !0, a = u;
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
  return vn(t) || mn(t, e) || Sn(t, e) || yn();
}
function Sn(t, e) {
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
function On(t, e, r) {
  var n = Dn(pn(t, e, r), 2), i = n[0], o = n[1];
  return C(function(a) {
    var u = l(t).getHandlerId();
    u != null && a(l(t).subscribeToStateChange(o, {
      handlerIds: [
        u
      ]
    }));
  }), i;
}
function Ge(t, e, r) {
  var n = function() {
    return {};
  };
  return On(e, t || n, function() {
    return l(r).reconnect();
  });
}
function ge(t, e) {
  var r = nt({
    el: null,
    options: l(e)
  });
  C(function() {
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
function Tn(t, e) {
  return ge(function(r) {
    l(t).hooks.dragSource()(r.el, r.options);
  }, O(function() {
    return l(e).options;
  }));
}
function bn(t, e) {
  return ge(function(r) {
    l(t).hooks.dragPreview()(r.el, r.options);
  }, O(function() {
    return l(e).previewOptions;
  }));
}
function In(t) {
  var e = qe(t), r = gn(), n = hn(O(function() {
    return l(e).options;
  }), O(function() {
    return l(e).previewOptions;
  }));
  return fn(e, r, n), [
    Ge(O(function() {
      return l(e).collect || function() {
        return {};
      };
    }), r, n),
    Tn(n, e),
    bn(n, e)
  ];
}
function En(t) {
  return O(function() {
    var e = l(t).accept;
    return g(e != null, "accept must be defined"), Array.isArray(e) ? e : [
      e
    ];
  });
}
function Cn(t, e) {
  if (!(t instanceof e))
    throw new TypeError("Cannot call a class as a function");
}
var wn = /* @__PURE__ */ function() {
  function t(r, n) {
    Cn(this, t), this.spec = r, this.monitor = n;
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
function _n(t, e) {
  var r = O(function() {
    return new wn(l(t), l(e));
  });
  return C(function() {
    r.value.spec = l(t);
  }), r;
}
function Ne(t, e) {
  (e == null || e > t.length) && (e = t.length);
  for (var r = 0, n = new Array(e); r < e; r++)
    n[r] = t[r];
  return n;
}
function Nn(t) {
  if (Array.isArray(t))
    return t;
}
function Pn(t, e) {
  var r = t == null ? null : typeof Symbol < "u" && t[Symbol.iterator] || t["@@iterator"];
  if (r != null) {
    var n = [], i = !0, o = !1, s, a;
    try {
      for (r = r.call(t); !(i = (s = r.next()).done) && (n.push(s.value), !(e && n.length === e)); i = !0)
        ;
    } catch (u) {
      o = !0, a = u;
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
function xn() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function Rn(t, e) {
  return Nn(t) || Pn(t, e) || Mn(t, e) || xn();
}
function Mn(t, e) {
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
function An(t, e, r) {
  var n = M(), i = _n(t, e), o = En(t);
  C(function(a) {
    var u = Rn(en(o, i, n), 2), d = u[0], h = u[1];
    l(e).receiveHandlerId(d), l(r).receiveHandlerId(d), a(h);
  });
}
function kn() {
  var t = M();
  return O(function() {
    return new Fr(l(t));
  });
}
function Ln(t) {
  var e = M(), r = O(function() {
    return new Zr(l(e).getBackend());
  });
  return C(function(n) {
    r.value.dropTargetOptions = l(t) || null, r.value.reconnect(), n(function() {
      return r.value.disconnectDropTarget();
    });
  }), r;
}
function Hn(t, e) {
  return ge(function(r) {
    l(t).hooks.dropTarget()(r.el, r.options);
  }, O(function() {
    return l(e).options;
  }));
}
function Ye(t) {
  var e = qe(t), r = kn(), n = Ln(O(function() {
    return l(e).options;
  }));
  return An(e, r, n), [
    Ge(O(function() {
      return l(e).collect || function() {
        return {};
      };
    }), r, n),
    Hn(n, e)
  ];
}
function We(t) {
  let e = null;
  return () => (e == null && (e = t()), e);
}
function jn(t, e) {
  return t.filter(
    (r) => r !== e
  );
}
function Un(t, e) {
  const r = /* @__PURE__ */ new Set(), n = (o) => r.add(o);
  t.forEach(n), e.forEach(n);
  const i = [];
  return r.forEach(
    (o) => i.push(o)
  ), i;
}
class $n {
  enter(e) {
    const r = this.entered.length, n = (i) => this.isNodeInDocument(i) && (!i.contains || i.contains(e));
    return this.entered = Un(this.entered.filter(n), [
      e
    ]), r === 0 && this.entered.length > 0;
  }
  leave(e) {
    const r = this.entered.length;
    return this.entered = jn(this.entered.filter(this.isNodeInDocument), e), r > 0 && this.entered.length === 0;
  }
  reset() {
    this.entered = [];
  }
  constructor(e) {
    this.entered = [], this.isNodeInDocument = e;
  }
}
class Fn {
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
const ne = {
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
function Vn(t, e) {
  const r = ne[t];
  if (!r)
    throw new Error(`native type ${t} has no configuration`);
  const n = new Fn(r);
  return n.loadDataTransfer(e), n;
}
function J(t) {
  if (!t)
    return null;
  const e = Array.prototype.slice.call(t.types || []);
  return Object.keys(ne).filter((r) => {
    const n = ne[r];
    return n != null && n.matchesTypes ? n.matchesTypes.some(
      (i) => e.indexOf(i) > -1
    ) : !1;
  })[0] || null;
}
const qn = We(
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
    let u = 0, d = s.length - 1, h;
    for (; u <= d; ) {
      h = Math.floor(0.5 * (u + d));
      const f = r[h];
      if (f < e)
        u = h + 1;
      else if (f > e)
        d = h - 1;
      else
        return n[h];
    }
    a = Math.max(0, d);
    const S = e - r[a], y = S * S;
    return n[a] + i[a] * S + o[a] * y + s[a] * S * y;
  }
  constructor(e, r) {
    const { length: n } = e, i = [];
    for (let f = 0; f < n; f++)
      i.push(f);
    i.sort(
      (f, p) => e[f] < e[p] ? -1 : 1
    );
    const o = [], s = [];
    let a, u;
    for (let f = 0; f < n - 1; f++)
      a = e[f + 1] - e[f], u = r[f + 1] - r[f], o.push(a), s.push(u / a);
    const d = [
      s[0]
    ];
    for (let f = 0; f < o.length - 1; f++) {
      const p = s[f], c = s[f + 1];
      if (p * c <= 0)
        d.push(0);
      else {
        a = o[f];
        const v = o[f + 1], D = a + v;
        d.push(3 * D / ((D + v) / p + (D + a) / c));
      }
    }
    d.push(s[s.length - 1]);
    const h = [], S = [];
    let y;
    for (let f = 0; f < d.length - 1; f++) {
      y = s[f];
      const p = d[f], c = 1 / o[f], v = p + d[f + 1] - y - y;
      h.push((y - p - v) * c), S.push(v * c * c);
    }
    this.xs = e, this.ys = r, this.c1s = d, this.c2s = h, this.c3s = S;
  }
}
const Bn = 1;
function Ze(t) {
  const e = t.nodeType === Bn ? t : t.parentElement;
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
function Gn(t) {
  var e;
  return t.nodeName === "IMG" && (qn() || !(!((e = document.documentElement) === null || e === void 0) && e.contains(t)));
}
function Yn(t, e, r, n) {
  let i = t ? e.width : r, o = t ? e.height : n;
  return Je() && t && (o /= window.devicePixelRatio, i /= window.devicePixelRatio), {
    dragPreviewWidth: i,
    dragPreviewHeight: o
  };
}
function Wn(t, e, r, n, i) {
  const o = Gn(e), a = Ze(o ? t : e), u = {
    x: r.x - a.x,
    y: r.y - a.y
  }, { offsetWidth: d, offsetHeight: h } = t, { anchorX: S, anchorY: y } = n, { dragPreviewWidth: f, dragPreviewHeight: p } = Yn(o, e, d, h), c = () => {
    let he = new xe([
      0,
      0.5,
      1
    ], [
      // Dock to the top
      u.y,
      // Align at the center
      u.y / h * p,
      // Dock to the bottom
      u.y + p - h
    ]).interpolate(y);
    return Je() && o && (he += (window.devicePixelRatio - 1) * p), he;
  }, v = () => new xe([
    0,
    0.5,
    1
  ], [
    // Dock to the left
    u.x,
    // Align at the center
    u.x / d * f,
    // Dock to the right
    u.x + f - d
  ]).interpolate(S), { offsetX: D, offsetY: m } = i, E = D === 0 || D, Y = m === 0 || m;
  return {
    x: E ? D : v(),
    y: Y ? m : c()
  };
}
class Xn {
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
function zn(t, e, r) {
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
      zn(t, i, r[i]);
    });
  }
  return t;
}
class Kn {
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
    this.clearCurrentDragSourceNode(), this.currentNativeSource = Vn(e, r), this.currentNativeHandle = this.registry.addSource(e, this.currentNativeSource), this.actions.beginDrag([
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
      const { dataTransfer: a } = i, u = J(a);
      if (this.monitor.isDragging()) {
        if (a && typeof a.setDragImage == "function") {
          const h = this.monitor.getSourceId(), S = this.sourceNodes.get(h), y = this.sourcePreviewNodes.get(h) || S;
          if (y) {
            const { anchorX: f, anchorY: p, offsetX: c, offsetY: v } = this.getCurrentSourcePreviewNodeOptions(), E = Wn(S, y, s, {
              anchorX: f,
              anchorY: p
            }, {
              offsetX: c,
              offsetY: v
            });
            a.setDragImage(y, E.x, E.y);
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
      } else if (u)
        this.beginDragNativeItem(u);
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
      const { dataTransfer: a } = i, u = J(a);
      u && this.beginDragNativeItem(u, a);
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
    }, this.options = new Xn(r, n), this.actions = e.getActions(), this.monitor = e.getMonitor(), this.registry = e.getRegistry(), this.enterLeaveCounter = new $n(this.isNodeInDocument);
  }
}
const Qn = function(e, r, n) {
  return new Kn(e, r, n);
}, U = /* @__PURE__ */ k({
  __name: "DndProvider",
  setup(t) {
    return (e, r) => (R(), ie(l(Hr), { backend: l(Qn) }, {
      default: oe(() => [
        se(e.$slots, "default")
      ]),
      _: 3
    }, 8, ["backend"]));
  }
});
U.install = (t) => {
  t.component(U.__name, U);
};
const Jn = /* @__PURE__ */ k({
  __name: "DraggableItem",
  props: {
    index: null,
    data: null,
    dragEnd: null,
    dropMove: null
  },
  setup(t) {
    const e = t, r = w(N("uuid")), n = w(N("typeName")), i = w(N("acceptName")), o = w(N("canDrag", !0)), s = w(N("dropEffect")), a = w(N("mainDropCollect")), [u, d] = In(() => ({
      type: n.value,
      canDrag: () => o.value,
      item: () => ({ index: e.index, uuid: r.value, data: e.data }),
      options: {
        dropEffect: s.value
      },
      collect: (c) => ({
        canDrag: c.canDrag(),
        getItem: c.getItem(),
        getItemType: c.getItemType(),
        isDragging: c.isDragging(),
        uuid: r.value
      }),
      end: (c, v) => {
        const D = v.didDrop(), m = v.getDropResult(), E = r.value === (m == null ? void 0 : m.uuid);
        D && m && e.dragEnd({ ...c, isSelf: E });
      }
    })), [h, S] = Ye(() => ({
      accept: i.value,
      hover: (c, v) => {
      },
      drop: (c, v) => {
        const D = c.index, m = e.index, E = r.value === c.uuid;
        return e.dropMove(c.data, D, m, E), { ...c, uuid: r.value };
      },
      collect: (c) => ({
        isOver: c.isOver(),
        canDrop: c.canDrop(),
        getItem: c.getItem(),
        getDropResult: c.getDropResult(),
        uuid: r.value
      })
    })), y = w(), f = (c) => {
      y.value = d(S(c));
    }, p = (c, v) => !(c === "move" && !a.value.isOver && v.isDragging && r.value === v.getItem.uuid);
    return (c, v) => (R(), ie(it, null, {
      default: oe(() => [
        ot((R(), Z("div", {
          class: "draggable-item",
          ref: f,
          key: t.index
        }, [
          se(c.$slots, "default", {}, void 0, !0)
        ])), [
          [st, p(l(s), l(u))]
        ])
      ]),
      _: 3
    }));
  }
});
const Zn = (t, e) => {
  const r = t.__vccOpts || t;
  for (const [n, i] of e)
    r[n] = i;
  return r;
}, ei = /* @__PURE__ */ Zn(Jn, [["__scopeId", "data-v-9b2b7838"]]);
let H;
const ti = new Uint8Array(16);
function ri() {
  if (!H && (H = typeof crypto < "u" && crypto.getRandomValues && crypto.getRandomValues.bind(crypto), !H))
    throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");
  return H(ti);
}
const T = [];
for (let t = 0; t < 256; ++t)
  T.push((t + 256).toString(16).slice(1));
function ni(t, e = 0) {
  return (T[t[e + 0]] + T[t[e + 1]] + T[t[e + 2]] + T[t[e + 3]] + "-" + T[t[e + 4]] + T[t[e + 5]] + "-" + T[t[e + 6]] + T[t[e + 7]] + "-" + T[t[e + 8]] + T[t[e + 9]] + "-" + T[t[e + 10]] + T[t[e + 11]] + T[t[e + 12]] + T[t[e + 13]] + T[t[e + 14]] + T[t[e + 15]]).toLowerCase();
}
const ii = typeof crypto < "u" && crypto.randomUUID && crypto.randomUUID.bind(crypto), Me = {
  randomUUID: ii
};
function oi(t, e, r) {
  if (Me.randomUUID && !e && !t)
    return Me.randomUUID();
  t = t || {};
  const n = t.random || (t.rng || ri)();
  if (n[6] = n[6] & 15 | 64, n[8] = n[8] & 63 | 128, e) {
    r = r || 0;
    for (let i = 0; i < 16; ++i)
      e[r + i] = n[i];
    return e;
  }
  return ni(n);
}
const $ = /* @__PURE__ */ k({
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
    const r = t, n = oi(), i = (p) => {
      let c = [];
      return typeof p == "string" ? c = [p, n] : Array.isArray(p) ? c = [...p, n] : c = [n], c;
    }, o = O(() => r.dragName || n), s = O(() => i(r.dropName)), a = O(() => !r.disabled), u = O(() => r.dropEffect);
    _("uuid", n), _("typeName", o), _("acceptName", s), _("canDrag", a), _("dropEffect", u);
    const d = O({
      get() {
        return r.list;
      },
      set(p) {
        e("update:list", p);
      }
    }), h = (p) => {
      u.value === "move" && !p.isSelf && d.value.splice(p.index, 1);
    }, S = (p, c, v, D) => {
      const m = [...d.value];
      D && m.splice(c, 1), m.splice(v, 0, p), d.value = m;
    }, [y, f] = Ye(() => ({
      accept: s.value,
      collect: (p) => ({
        isOver: p.isOver()
      })
    }));
    return _("mainDropCollect", y), (p, c) => {
      const v = ei;
      return R(), Z("div", { ref: l(f) }, [
        (R(!0), Z(at, null, ut(l(d), (D, m) => (R(), ie(v, {
          key: t.itemKey ? D[t.itemKey] : D,
          index: m,
          data: D,
          dragEnd: h,
          dropMove: S
        }, {
          default: oe(() => [
            se(p.$slots, "item", {
              data: D,
              index: m
            })
          ]),
          _: 2
        }, 1032, ["index", "data"]))), 128))
      ], 512);
    };
  }
});
$.install = (t) => {
  t.component($.__name, $);
};
const si = [$, U], ai = (t) => {
  si.forEach((e) => {
    t.component(e.__name, e);
  });
}, ci = {
  install: ai
};
export {
  U as DndProvider,
  ci as default,
  $ as draggable
};
//# sourceMappingURL=index.js.map
