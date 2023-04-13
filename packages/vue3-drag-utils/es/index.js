import { provide as L, inject as H, defineComponent as A, onUnmounted as ft, watchEffect as E, isRef as Ve, unref as l, computed as m, ref as N, reactive as gt, openBlock as x, createBlock as Z, withCtx as ee, renderSlot as oe, watch as qe, createElementBlock as Be, TransitionGroup as ht, Fragment as pt, renderList as vt, toRaw as he } from "vue";
function pe(t, e, r) {
  return Array.isArray(t) ? (t.length = Math.max(t.length, e), t.splice(e, 1, r), r) : (t[e] = r, r);
}
var Ge = Symbol("DndContextType");
function mt(t) {
  L(Ge, t);
}
function yt() {
  return H(Ge);
}
var I;
(function(t) {
  t.SOURCE = "SOURCE", t.TARGET = "TARGET";
})(I || (I = {}));
function f(t, e, ...r) {
  if (Dt() && e === void 0)
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
function Dt() {
  return typeof process < "u" && process.env.NODE_ENV === "production";
}
const se = "dnd-core/INIT_COORDS", F = "dnd-core/BEGIN_DRAG", ae = "dnd-core/PUBLISH_DRAG_SOURCE", V = "dnd-core/HOVER", q = "dnd-core/DROP", B = "dnd-core/END_DRAG";
function ve(t, e) {
  return {
    type: se,
    payload: {
      sourceClientOffset: e || null,
      clientOffset: t || null
    }
  };
}
function Ot(t, e, r) {
  return e.split(".").reduce(
    (n, i) => n && n[i] ? n[i] : r || null,
    t
  );
}
function St(t, e) {
  return t.filter(
    (r) => r !== e
  );
}
function We(t) {
  return typeof t == "object";
}
function bt(t, e) {
  const r = /* @__PURE__ */ new Map(), n = (o) => {
    r.set(o, r.has(o) ? r.get(o) + 1 : 1);
  };
  t.forEach(n), e.forEach(n);
  const i = [];
  return r.forEach((o, a) => {
    o === 1 && i.push(a);
  }), i;
}
function Tt(t, e) {
  return t.filter(
    (r) => e.indexOf(r) > -1
  );
}
const It = {
  type: se,
  payload: {
    clientOffset: null,
    sourceClientOffset: null
  }
};
function Et(t) {
  return function(r = [], n = {
    publishSource: !0
  }) {
    const { publishSource: i = !0, clientOffset: o, getSourceClientOffset: a } = n, s = t.getMonitor(), u = t.getRegistry();
    t.dispatch(ve(o)), wt(r, s, u);
    const c = Nt(r, s);
    if (c == null) {
      t.dispatch(It);
      return;
    }
    let g = null;
    if (o) {
      if (!a)
        throw new Error("getSourceClientOffset must be defined");
      Ct(a), g = a(c);
    }
    t.dispatch(ve(o, g));
    const v = u.getSource(c).beginDrag(s, c);
    if (v == null)
      return;
    _t(v), u.pinSource(c);
    const d = u.getSourceType(c);
    return {
      type: F,
      payload: {
        itemType: d,
        item: v,
        sourceId: c,
        clientOffset: o || null,
        sourceClientOffset: g || null,
        isSourcePublic: !!i
      }
    };
  };
}
function wt(t, e, r) {
  f(!e.isDragging(), "Cannot call beginDrag while dragging."), t.forEach(function(n) {
    f(r.getSource(n), "Expected sourceIds to be registered.");
  });
}
function Ct(t) {
  f(typeof t == "function", "When clientOffset is provided, getSourceClientOffset must be a function.");
}
function _t(t) {
  f(We(t), "Item must be an object.");
}
function Nt(t, e) {
  let r = null;
  for (let n = t.length - 1; n >= 0; n--)
    if (e.canDragSource(t[n])) {
      r = t[n];
      break;
    }
  return r;
}
function Pt(t) {
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
function xt(t) {
  return function(r, { clientOffset: n } = {}) {
    Rt(r);
    const i = r.slice(0), o = t.getMonitor(), a = t.getRegistry();
    At(i, o, a);
    const s = o.getItemType();
    return Mt(i, a, s), kt(i, o, a), {
      type: V,
      payload: {
        targetIds: i,
        clientOffset: n || null
      }
    };
  };
}
function Rt(t) {
  f(Array.isArray(t), "Expected targetIds to be an array.");
}
function At(t, e, r) {
  f(e.isDragging(), "Cannot call hover while not dragging."), f(!e.didDrop(), "Cannot call hover after drop.");
  for (let n = 0; n < t.length; n++) {
    const i = t[n];
    f(t.lastIndexOf(i) === n, "Expected targetIds to be unique in the passed array.");
    const o = r.getTarget(i);
    f(o, "Expected targetIds to be registered.");
  }
}
function Mt(t, e, r) {
  for (let n = t.length - 1; n >= 0; n--) {
    const i = t[n], o = e.getTargetType(i);
    te(o, r) || t.splice(n, 1);
  }
}
function kt(t, e, r) {
  t.forEach(function(n) {
    r.getTarget(n).hover(e, n);
  });
}
function Lt(t, e, r) {
  return e in t ? Object.defineProperty(t, e, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : t[e] = r, t;
}
function Ht(t) {
  for (var e = 1; e < arguments.length; e++) {
    var r = arguments[e] != null ? arguments[e] : {}, n = Object.keys(r);
    typeof Object.getOwnPropertySymbols == "function" && (n = n.concat(Object.getOwnPropertySymbols(r).filter(function(i) {
      return Object.getOwnPropertyDescriptor(r, i).enumerable;
    }))), n.forEach(function(i) {
      Lt(t, i, r[i]);
    });
  }
  return t;
}
function $t(t) {
  return function(r = {}) {
    const n = t.getMonitor(), i = t.getRegistry();
    jt(n), Vt(n).forEach((a, s) => {
      const u = Ut(a, s, i, n), c = {
        type: q,
        payload: {
          dropResult: Ht({}, r, u)
        }
      };
      t.dispatch(c);
    });
  };
}
function jt(t) {
  f(t.isDragging(), "Cannot call drop while not dragging."), f(!t.didDrop(), "Cannot call drop twice during one drag operation.");
}
function Ut(t, e, r, n) {
  const i = r.getTarget(t);
  let o = i ? i.drop(n, t) : void 0;
  return Ft(o), typeof o > "u" && (o = e === 0 ? {} : n.getDropResult()), o;
}
function Ft(t) {
  f(typeof t > "u" || We(t), "Drop result must either be an object or undefined.");
}
function Vt(t) {
  const e = t.getTargetIds().filter(t.canDropOnTarget, t);
  return e.reverse(), e;
}
function qt(t) {
  return function() {
    const r = t.getMonitor(), n = t.getRegistry();
    Bt(r);
    const i = r.getSourceId();
    return i != null && (n.getSource(i, !0).endDrag(r, i), n.unpinSource()), {
      type: B
    };
  };
}
function Bt(t) {
  f(t.isDragging(), "Cannot call endDrag while not dragging.");
}
function Gt(t) {
  return {
    beginDrag: Et(t),
    publishDragSource: Pt(t),
    hover: xt(t),
    drop: $t(t),
    endDrag: qt(t)
  };
}
class Wt {
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
      return (...a) => {
        const s = o.apply(e, a);
        typeof s < "u" && r(s);
      };
    }
    const i = Gt(this);
    return Object.keys(i).reduce((o, a) => {
      const s = i[a];
      return o[a] = n(s), o;
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
function T(t) {
  return "Minified Redux error #" + t + "; visit https://redux.js.org/Errors?code=" + t + " for the full message or use the non-minified dev environment for full errors. ";
}
var me = function() {
  return typeof Symbol == "function" && Symbol.observable || "@@observable";
}(), Y = function() {
  return Math.random().toString(36).substring(7).split("").join(".");
}, ye = {
  INIT: "@@redux/INIT" + Y(),
  REPLACE: "@@redux/REPLACE" + Y(),
  PROBE_UNKNOWN_ACTION: function() {
    return "@@redux/PROBE_UNKNOWN_ACTION" + Y();
  }
};
function Yt(t) {
  if (typeof t != "object" || t === null)
    return !1;
  for (var e = t; Object.getPrototypeOf(e) !== null; )
    e = Object.getPrototypeOf(e);
  return Object.getPrototypeOf(t) === e;
}
function Xt(t) {
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
  if (Qt(t))
    return "error";
  var r = zt(t);
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
function zt(t) {
  return typeof t.constructor == "function" ? t.constructor.name : null;
}
function Qt(t) {
  return t instanceof Error || typeof t.message == "string" && t.constructor && typeof t.constructor.stackTraceLimit == "number";
}
function Jt(t) {
  return t instanceof Date ? !0 : typeof t.toDateString == "function" && typeof t.getDate == "function" && typeof t.setDate == "function";
}
function C(t) {
  var e = typeof t;
  return process.env.NODE_ENV !== "production" && (e = Xt(t)), e;
}
function Ye(t, e, r) {
  var n;
  if (typeof e == "function" && typeof r == "function" || typeof r == "function" && typeof arguments[3] == "function")
    throw new Error(process.env.NODE_ENV === "production" ? T(0) : "It looks like you are passing several store enhancers to createStore(). This is not supported. Instead, compose them together to a single function. See https://redux.js.org/tutorials/fundamentals/part-4-store#creating-a-store-with-enhancers for an example.");
  if (typeof e == "function" && typeof r > "u" && (r = e, e = void 0), typeof r < "u") {
    if (typeof r != "function")
      throw new Error(process.env.NODE_ENV === "production" ? T(1) : "Expected the enhancer to be a function. Instead, received: '" + C(r) + "'");
    return r(Ye)(t, e);
  }
  if (typeof t != "function")
    throw new Error(process.env.NODE_ENV === "production" ? T(2) : "Expected the root reducer to be a function. Instead, received: '" + C(t) + "'");
  var i = t, o = e, a = [], s = a, u = !1;
  function c() {
    s === a && (s = a.slice());
  }
  function g() {
    if (u)
      throw new Error(process.env.NODE_ENV === "production" ? T(3) : "You may not call store.getState() while the reducer is executing. The reducer has already received the state as an argument. Pass it down from the top reducer instead of reading it from the store.");
    return o;
  }
  function h(p) {
    if (typeof p != "function")
      throw new Error(process.env.NODE_ENV === "production" ? T(4) : "Expected the listener to be a function. Instead, received: '" + C(p) + "'");
    if (u)
      throw new Error(process.env.NODE_ENV === "production" ? T(5) : "You may not call store.subscribe() while the reducer is executing. If you would like to be notified after the store has been updated, subscribe from a component and invoke store.getState() in the callback to access the latest state. See https://redux.js.org/api/store#subscribelistener for more details.");
    var D = !0;
    return c(), s.push(p), function() {
      if (D) {
        if (u)
          throw new Error(process.env.NODE_ENV === "production" ? T(6) : "You may not unsubscribe from a store listener while the reducer is executing. See https://redux.js.org/api/store#subscribelistener for more details.");
        D = !1, c();
        var b = s.indexOf(p);
        s.splice(b, 1), a = null;
      }
    };
  }
  function v(p) {
    if (!Yt(p))
      throw new Error(process.env.NODE_ENV === "production" ? T(7) : "Actions must be plain objects. Instead, the actual type was: '" + C(p) + "'. You may need to add middleware to your store setup to handle dispatching other values, such as 'redux-thunk' to handle dispatching functions. See https://redux.js.org/tutorials/fundamentals/part-4-store#middleware and https://redux.js.org/tutorials/fundamentals/part-6-async-logic#using-the-redux-thunk-middleware for examples.");
    if (typeof p.type > "u")
      throw new Error(process.env.NODE_ENV === "production" ? T(8) : 'Actions may not have an undefined "type" property. You may have misspelled an action type string constant.');
    if (u)
      throw new Error(process.env.NODE_ENV === "production" ? T(9) : "Reducers may not dispatch actions.");
    try {
      u = !0, o = i(o, p);
    } finally {
      u = !1;
    }
    for (var D = a = s, S = 0; S < D.length; S++) {
      var b = D[S];
      b();
    }
    return p;
  }
  function d(p) {
    if (typeof p != "function")
      throw new Error(process.env.NODE_ENV === "production" ? T(10) : "Expected the nextReducer to be a function. Instead, received: '" + C(p));
    i = p, v({
      type: ye.REPLACE
    });
  }
  function y() {
    var p, D = h;
    return p = {
      /**
       * The minimal observable subscription method.
       * @param {Object} observer Any object that can be used as an observer.
       * The observer object should have a `next` method.
       * @returns {subscription} An object with an `unsubscribe` method that can
       * be used to unsubscribe the observable from the store, and prevent further
       * emission of values from the observable.
       */
      subscribe: function(b) {
        if (typeof b != "object" || b === null)
          throw new Error(process.env.NODE_ENV === "production" ? T(11) : "Expected the observer to be an object. Instead, received: '" + C(b) + "'");
        function w() {
          b.next && b.next(g());
        }
        w();
        var W = D(w);
        return {
          unsubscribe: W
        };
      }
    }, p[me] = function() {
      return this;
    }, p;
  }
  return v({
    type: ye.INIT
  }), n = {
    dispatch: v,
    subscribe: h,
    getState: g,
    replaceReducer: d
  }, n[me] = y, n;
}
const Kt = (t, e) => t === e;
function Zt(t, e) {
  return !t && !e ? !0 : !t || !e ? !1 : t.x === e.x && t.y === e.y;
}
function er(t, e, r = Kt) {
  if (t.length !== e.length)
    return !1;
  for (let n = 0; n < t.length; ++n)
    if (!r(t[n], e[n]))
      return !1;
  return !0;
}
function tr(t, e, r) {
  return e in t ? Object.defineProperty(t, e, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : t[e] = r, t;
}
function rr(t) {
  for (var e = 1; e < arguments.length; e++) {
    var r = arguments[e] != null ? arguments[e] : {}, n = Object.keys(r);
    typeof Object.getOwnPropertySymbols == "function" && (n = n.concat(Object.getOwnPropertySymbols(r).filter(function(i) {
      return Object.getOwnPropertyDescriptor(r, i).enumerable;
    }))), n.forEach(function(i) {
      tr(t, i, r[i]);
    });
  }
  return t;
}
const De = {
  initialSourceClientOffset: null,
  initialClientOffset: null,
  clientOffset: null
};
function nr(t = De, e) {
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
      return Zt(t.clientOffset, r.clientOffset) ? t : rr({}, t, {
        clientOffset: r.clientOffset
      });
    case B:
    case q:
      return De;
    default:
      return t;
  }
}
const ue = "dnd-core/ADD_SOURCE", ce = "dnd-core/ADD_TARGET", le = "dnd-core/REMOVE_SOURCE", G = "dnd-core/REMOVE_TARGET";
function ir(t) {
  return {
    type: ue,
    payload: {
      sourceId: t
    }
  };
}
function or(t) {
  return {
    type: ce,
    payload: {
      targetId: t
    }
  };
}
function sr(t) {
  return {
    type: le,
    payload: {
      sourceId: t
    }
  };
}
function ar(t) {
  return {
    type: G,
    payload: {
      targetId: t
    }
  };
}
function ur(t, e, r) {
  return e in t ? Object.defineProperty(t, e, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : t[e] = r, t;
}
function _(t) {
  for (var e = 1; e < arguments.length; e++) {
    var r = arguments[e] != null ? arguments[e] : {}, n = Object.keys(r);
    typeof Object.getOwnPropertySymbols == "function" && (n = n.concat(Object.getOwnPropertySymbols(r).filter(function(i) {
      return Object.getOwnPropertyDescriptor(r, i).enumerable;
    }))), n.forEach(function(i) {
      ur(t, i, r[i]);
    });
  }
  return t;
}
const cr = {
  itemType: null,
  item: null,
  sourceId: null,
  targetIds: [],
  dropResult: null,
  didDrop: !1,
  isSourcePublic: null
};
function lr(t = cr, e) {
  const { payload: r } = e;
  switch (e.type) {
    case F:
      return _({}, t, {
        itemType: r.itemType,
        item: r.item,
        sourceId: r.sourceId,
        isSourcePublic: r.isSourcePublic,
        dropResult: null,
        didDrop: !1
      });
    case ae:
      return _({}, t, {
        isSourcePublic: !0
      });
    case V:
      return _({}, t, {
        targetIds: r.targetIds
      });
    case G:
      return t.targetIds.indexOf(r.targetId) === -1 ? t : _({}, t, {
        targetIds: St(t.targetIds, r.targetId)
      });
    case q:
      return _({}, t, {
        dropResult: r.dropResult,
        didDrop: !0,
        targetIds: []
      });
    case B:
      return _({}, t, {
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
function dr(t = 0, e) {
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
const R = [], de = [];
R.__IS_NONE__ = !0;
de.__IS_ALL__ = !0;
function fr(t, e) {
  return t === R ? !1 : t === de || typeof e > "u" ? !0 : Tt(e, t).length > 0;
}
function gr(t = R, e) {
  switch (e.type) {
    case V:
      break;
    case ue:
    case ce:
    case G:
    case le:
      return R;
    case F:
    case ae:
    case B:
    case q:
    default:
      return de;
  }
  const { targetIds: r = [], prevTargetIds: n = [] } = e.payload, i = bt(r, n);
  if (!(i.length > 0 || !er(r, n)))
    return R;
  const a = n[n.length - 1], s = r[r.length - 1];
  return a !== s && (a && i.push(a), s && i.push(s)), i;
}
function hr(t = 0) {
  return t + 1;
}
function pr(t, e, r) {
  return e in t ? Object.defineProperty(t, e, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : t[e] = r, t;
}
function vr(t) {
  for (var e = 1; e < arguments.length; e++) {
    var r = arguments[e] != null ? arguments[e] : {}, n = Object.keys(r);
    typeof Object.getOwnPropertySymbols == "function" && (n = n.concat(Object.getOwnPropertySymbols(r).filter(function(i) {
      return Object.getOwnPropertyDescriptor(r, i).enumerable;
    }))), n.forEach(function(i) {
      pr(t, i, r[i]);
    });
  }
  return t;
}
function mr(t = {}, e) {
  return {
    dirtyHandlerIds: gr(t.dirtyHandlerIds, {
      type: e.type,
      payload: vr({}, e.payload, {
        prevTargetIds: Ot(t, "dragOperation.targetIds", [])
      })
    }),
    dragOffset: nr(t.dragOffset, e),
    refCount: dr(t.refCount, e),
    dragOperation: lr(t.dragOperation, e),
    stateId: hr(t.stateId)
  };
}
function yr(t, e) {
  return {
    x: t.x + e.x,
    y: t.y + e.y
  };
}
function Xe(t, e) {
  return {
    x: t.x - e.x,
    y: t.y - e.y
  };
}
function Dr(t) {
  const { clientOffset: e, initialClientOffset: r, initialSourceClientOffset: n } = t;
  return !e || !r || !n ? null : Xe(yr(e, n), r);
}
function Or(t) {
  const { clientOffset: e, initialClientOffset: r } = t;
  return !e || !r ? null : Xe(e, r);
}
class Sr {
  subscribeToStateChange(e, r = {}) {
    const { handlerIds: n } = r;
    f(typeof e == "function", "listener must be a function."), f(typeof n > "u" || Array.isArray(n), "handlerIds, when specified, must be an array of strings.");
    let i = this.store.getState().stateId;
    const o = () => {
      const a = this.store.getState(), s = a.stateId;
      try {
        s === i || s === i + 1 && !fr(a.dirtyHandlerIds, n) || e();
      } finally {
        i = s;
      }
    };
    return this.store.subscribe(o);
  }
  subscribeToOffsetChange(e) {
    f(typeof e == "function", "listener must be a function.");
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
    return f(r, `Expected to find a valid source. sourceId=${e}`), this.isDragging() ? !1 : r.canDrag(this, e);
  }
  canDropOnTarget(e) {
    if (!e)
      return !1;
    const r = this.registry.getTarget(e);
    if (f(r, `Expected to find a valid target. targetId=${e}`), !this.isDragging() || this.didDrop())
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
    if (f(r, `Expected to find a valid source. sourceId=${e}`), !this.isDragging() || !this.isSourcePublic())
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
    const a = this.getTargetIds();
    if (!a.length)
      return !1;
    const s = a.indexOf(e);
    return n ? s === a.length - 1 : s > -1;
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
    return Dr(this.store.getState().dragOffset);
  }
  getDifferenceFromInitialOffset() {
    return Or(this.store.getState().dragOffset);
  }
  constructor(e, r) {
    this.store = e, this.registry = r;
  }
}
let br = 0;
function Tr() {
  return br++;
}
function Ir(t) {
  f(typeof t.canDrag == "function", "Expected canDrag to be a function."), f(typeof t.beginDrag == "function", "Expected beginDrag to be a function."), f(typeof t.endDrag == "function", "Expected endDrag to be a function.");
}
function Er(t) {
  f(typeof t.canDrop == "function", "Expected canDrop to be a function."), f(typeof t.hover == "function", "Expected hover to be a function."), f(typeof t.drop == "function", "Expected beginDrag to be a function.");
}
function re(t, e) {
  if (e && Array.isArray(t)) {
    t.forEach(
      (r) => re(r, !1)
    );
    return;
  }
  f(typeof t == "string" || typeof t == "symbol", e ? "Type can only be a string, a symbol, or an array of either." : "Type can only be a string or a symbol.");
}
const Oe = typeof global < "u" ? global : self, ze = Oe.MutationObserver || Oe.WebKitMutationObserver;
function Qe(t) {
  return function() {
    const r = setTimeout(i, 0), n = setInterval(i, 50);
    function i() {
      clearTimeout(r), clearInterval(n), t();
    }
  };
}
function wr(t) {
  let e = 1;
  const r = new ze(t), n = document.createTextNode("");
  return r.observe(n, {
    characterData: !0
  }), function() {
    e = -e, n.data = e;
  };
}
const Cr = typeof ze == "function" ? (
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
  wr
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
  Qe
);
class _r {
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
    }, this.requestFlush = Cr(this.flush), this.requestErrorThrow = Qe(() => {
      if (this.pendingErrors.length)
        throw this.pendingErrors.shift();
    });
  }
}
class Nr {
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
class Pr {
  create(e) {
    const r = this.freeTasks, n = r.length ? r.pop() : new Nr(
      this.onError,
      (i) => r[r.length] = i
    );
    return n.task = e, n;
  }
  constructor(e) {
    this.onError = e, this.freeTasks = [];
  }
}
const Je = new _r(), xr = new Pr(Je.registerPendingError);
function Rr(t) {
  Je.enqueueTask(xr.create(t));
}
function Ar(t) {
  const e = Tr().toString();
  switch (t) {
    case I.SOURCE:
      return `S${e}`;
    case I.TARGET:
      return `T${e}`;
    default:
      throw new Error(`Unknown Handler Role: ${t}`);
  }
}
function Se(t) {
  switch (t[0]) {
    case "S":
      return I.SOURCE;
    case "T":
      return I.TARGET;
    default:
      throw new Error(`Cannot parse handler ID: ${t}`);
  }
}
function be(t, e) {
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
class Mr {
  addSource(e, r) {
    re(e), Ir(r);
    const n = this.addHandler(I.SOURCE, e, r);
    return this.store.dispatch(ir(n)), n;
  }
  addTarget(e, r) {
    re(e, !0), Er(r);
    const n = this.addHandler(I.TARGET, e, r);
    return this.store.dispatch(or(n)), n;
  }
  containsHandler(e) {
    return be(this.dragSources, e) || be(this.dropTargets, e);
  }
  getSource(e, r = !1) {
    return f(this.isSourceId(e), "Expected a valid source ID."), r && e === this.pinnedSourceId ? this.pinnedSource : this.dragSources.get(e);
  }
  getTarget(e) {
    return f(this.isTargetId(e), "Expected a valid target ID."), this.dropTargets.get(e);
  }
  getSourceType(e) {
    return f(this.isSourceId(e), "Expected a valid source ID."), this.types.get(e);
  }
  getTargetType(e) {
    return f(this.isTargetId(e), "Expected a valid target ID."), this.types.get(e);
  }
  isSourceId(e) {
    return Se(e) === I.SOURCE;
  }
  isTargetId(e) {
    return Se(e) === I.TARGET;
  }
  removeSource(e) {
    f(this.getSource(e), "Expected an existing source."), this.store.dispatch(sr(e)), Rr(() => {
      this.dragSources.delete(e), this.types.delete(e);
    });
  }
  removeTarget(e) {
    f(this.getTarget(e), "Expected an existing target."), this.store.dispatch(ar(e)), this.dropTargets.delete(e), this.types.delete(e);
  }
  pinSource(e) {
    const r = this.getSource(e);
    f(r, "Expected an existing source."), this.pinnedSourceId = e, this.pinnedSource = r;
  }
  unpinSource() {
    f(this.pinnedSource, "No source is pinned at the time."), this.pinnedSourceId = null, this.pinnedSource = null;
  }
  addHandler(e, r, n) {
    const i = Ar(e);
    return this.types.set(i, r), e === I.SOURCE ? this.dragSources.set(i, n) : e === I.TARGET && this.dropTargets.set(i, n), i;
  }
  constructor(e) {
    this.types = /* @__PURE__ */ new Map(), this.dragSources = /* @__PURE__ */ new Map(), this.dropTargets = /* @__PURE__ */ new Map(), this.pinnedSourceId = null, this.pinnedSource = null, this.store = e;
  }
}
function kr(t, e = void 0, r = {}, n = !1) {
  const i = Lr(n), o = new Sr(i, new Mr(i)), a = new Wt(i, o), s = t(a, e, r);
  return a.receiveBackend(s), a;
}
function Lr(t) {
  const e = typeof window < "u" && window.__REDUX_DEVTOOLS_EXTENSION__;
  return Ye(mr, t && e && e({
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
function Hr(t) {
  if (Array.isArray(t))
    return t;
}
function $r(t, e) {
  var r = t == null ? null : typeof Symbol < "u" && t[Symbol.iterator] || t["@@iterator"];
  if (r != null) {
    var n = [], i = !0, o = !1, a, s;
    try {
      for (r = r.call(t); !(i = (a = r.next()).done) && (n.push(a.value), !(e && n.length === e)); i = !0)
        ;
    } catch (u) {
      o = !0, s = u;
    } finally {
      try {
        !i && r.return != null && r.return();
      } finally {
        if (o)
          throw s;
      }
    }
    return n;
  }
}
function jr() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function Ur(t, e) {
  return Hr(t) || $r(t, e) || Fr(t, e) || jr();
}
function Fr(t, e) {
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
var Ie = 0, $ = Symbol.for("__VUE_DND_CONTEXT_INSTANCE__");
function Vr(t) {
  return "manager" in t && t.manager;
}
function qr(t) {
  if (Vr(t)) {
    var e = t.manager;
    return [
      e,
      !1
    ];
  }
  var r = Br(t.backend, t.context, t.options, t.debugMode), n = !t.context;
  return [
    r,
    n
  ];
}
function Br(t) {
  var e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : Ke(), r = arguments.length > 2 ? arguments[2] : void 0, n = arguments.length > 3 ? arguments[3] : void 0, i = e;
  return i[$] || (i[$] = kr(t, e, r, n)), i[$];
}
function Ke() {
  return typeof globalThis < "u" ? globalThis : typeof global < "u" ? global : window;
}
const Gr = A({
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
    var n = r.slots, i = Ur(qr(e), 2), o = i[0], a = i[1];
    a && ++Ie, ft(function() {
      if (a) {
        var u = Ke();
        --Ie === 0 && (u[$] = null);
      }
    }), mt(o);
    var s;
    return function() {
      var u;
      return (s = (u = n.default) === null || u === void 0 ? void 0 : u.call(n)) !== null && s !== void 0 ? s : null;
    };
  }
});
A({
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
function Wr(t, e) {
  if (!(t instanceof e))
    throw new TypeError("Cannot call a class as a function");
}
var X = !1, z = !1, Yr = /* @__PURE__ */ function() {
  function t(r) {
    Wr(this, t), this.sourceId = null, this.internalMonitor = r.getMonitor();
  }
  var e = t.prototype;
  return e.receiveHandlerId = function(n) {
    this.sourceId = n;
  }, e.getHandlerId = function() {
    return this.sourceId;
  }, e.canDrag = function() {
    f(!X, "You may not call monitor.canDrag() inside your canDrag() implementation. Read more: http://react-dnd.github.io/react-dnd/docs/api/drag-source-monitor");
    try {
      return X = !0, this.internalMonitor.canDragSource(this.sourceId);
    } finally {
      X = !1;
    }
  }, e.isDragging = function() {
    if (!this.sourceId)
      return !1;
    f(!z, "You may not call monitor.isDragging() inside your isDragging() implementation. Read more: http://react-dnd.github.io/react-dnd/docs/api/drag-source-monitor");
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
function Xr(t, e) {
  if (!(t instanceof e))
    throw new TypeError("Cannot call a class as a function");
}
var Q = !1, zr = /* @__PURE__ */ function() {
  function t(r) {
    Xr(this, t), this.targetId = null, this.internalMonitor = r.getMonitor();
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
    f(!Q, "You may not call monitor.canDrop() inside your canDrop() implementation. Read more: http://react-dnd.github.io/react-dnd/docs/api/drop-target-monitor");
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
}(), Qr = function(t) {
  return t && typeof Symbol < "u" && t.constructor === Symbol ? "symbol" : typeof t;
};
function Jr(t) {
  return t ? t.__v_isVNode === !0 : !1;
}
function Kr(t) {
  return t ? t.__v_skip : !1;
}
function Zr(t) {
  return Jr(t) && Qr(t.type) !== "symbol";
}
function en() {
  throw new Error("Only native element nodes can now be passed to Vue DnD connectors.You can either wrap Component into a <div>, or turn it into a drag source or a drop target itself.");
}
function tn(t) {
  return function() {
    var e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : null, r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null;
    if (Kr(e) && en(), !Zr(e)) {
      var n = e;
      return t(n, r), n;
    }
  };
}
function Ze(t) {
  var e = {};
  return Object.keys(t).forEach(function(r) {
    var n = t[r];
    if (r.endsWith("Ref"))
      e[r] = t[r];
    else {
      var i = tn(n);
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
  const o = Object.keys(t), a = Object.keys(e);
  if (o.length !== a.length)
    return !1;
  const s = Object.prototype.hasOwnProperty.bind(e);
  for (let u = 0; u < o.length; u++) {
    const c = o[u];
    if (!s(c))
      return !1;
    const g = t[c], h = e[c];
    if (i = r ? r.call(n, g, h, c) : void 0, i === !1 || i === void 0 && g !== h)
      return !1;
  }
  return !0;
}
function rn(t, e) {
  if (!(t instanceof e))
    throw new TypeError("Cannot call a class as a function");
}
function Ee(t, e) {
  for (var r = 0; r < e.length; r++) {
    var n = e[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, n.key, n);
  }
}
function nn(t, e, r) {
  return e && Ee(t.prototype, e), r && Ee(t, r), t;
}
var on = /* @__PURE__ */ function() {
  function t(r) {
    var n = this;
    rn(this, t), this.hooks = Ze({
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
  }, nn(t, [
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
function sn(t, e) {
  if (!(t instanceof e))
    throw new TypeError("Cannot call a class as a function");
}
function we(t, e) {
  for (var r = 0; r < e.length; r++) {
    var n = e[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, n.key, n);
  }
}
function an(t, e, r) {
  return e && we(t.prototype, e), r && we(t, r), t;
}
var un = /* @__PURE__ */ function() {
  function t(r) {
    var n = this;
    sn(this, t), this.hooks = Ze({
      dropTarget: function(i, o) {
        n.clearDropTarget(), n.dropTargetOptions = o, Ve(i) ? n.dropTargetRef = i : n.dropTargetNode = i, n.reconnect();
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
  }, an(t, [
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
function cn(t, e, r) {
  var n = l(r).getRegistry(), i = n.addTarget(l(t), l(e));
  return [
    i,
    function() {
      return n.removeTarget(i);
    }
  ];
}
function ln(t, e, r) {
  var n = r.getRegistry(), i = n.addSource(t, e);
  return [
    i,
    function() {
      return n.removeSource(i);
    }
  ];
}
function dn(t, e) {
  if (!(t instanceof e))
    throw new TypeError("Cannot call a class as a function");
}
var fn = /* @__PURE__ */ function() {
  function t(r, n, i) {
    dn(this, t), this.spec = r, this.monitor = n, this.connector = i;
  }
  var e = t.prototype;
  return e.beginDrag = function() {
    var n = this.spec, i = this.monitor, o = null;
    return typeof n.item == "object" ? o = n.item : typeof n.item == "function" ? o = n.item(i) : o = {}, o ?? null;
  }, e.canDrag = function() {
    var n = this.spec, i = this.monitor;
    return typeof n.canDrag == "boolean" ? n.canDrag : typeof n.canDrag == "function" ? n.canDrag(i) : !0;
  }, e.isDragging = function(n, i) {
    var o = this.spec, a = this.monitor, s = o.isDragging;
    return s ? s(a) : i === n.getSourceId();
  }, e.endDrag = function() {
    var n = this.spec, i = this.monitor, o = this.connector, a = n.end;
    a && a(i.getItem(), i), o.reconnect();
  }, t;
}();
function gn(t, e, r) {
  var n = m(function() {
    return new fn(l(t), l(e), l(r));
  });
  return E(function() {
    n.value.spec = l(t);
  }), n;
}
function P() {
  var t = yt();
  return f(t != null, "Expected drag drop context"), t;
}
function hn(t) {
  return m(function() {
    var e = l(t).type;
    return f(e != null, "spec.type must be defined"), e;
  });
}
function Ce(t, e) {
  (e == null || e > t.length) && (e = t.length);
  for (var r = 0, n = new Array(e); r < e; r++)
    n[r] = t[r];
  return n;
}
function pn(t) {
  if (Array.isArray(t))
    return t;
}
function vn(t, e) {
  var r = t == null ? null : typeof Symbol < "u" && t[Symbol.iterator] || t["@@iterator"];
  if (r != null) {
    var n = [], i = !0, o = !1, a, s;
    try {
      for (r = r.call(t); !(i = (a = r.next()).done) && (n.push(a.value), !(e && n.length === e)); i = !0)
        ;
    } catch (u) {
      o = !0, s = u;
    } finally {
      try {
        !i && r.return != null && r.return();
      } finally {
        if (o)
          throw s;
      }
    }
    return n;
  }
}
function mn() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function yn(t, e) {
  return pn(t) || vn(t, e) || Dn(t, e) || mn();
}
function Dn(t, e) {
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
function On(t, e, r) {
  var n = P(), i = gn(t, e, r), o = hn(t);
  E(function(s) {
    if (l(o) != null) {
      var u = yn(ln(l(o), l(i), l(n)), 2), c = u[0], g = u[1];
      l(e).receiveHandlerId(c), l(r).receiveHandlerId(c), s(g);
    }
  });
}
function et(t) {
  return m(function() {
    return typeof t == "function" ? t() : t;
  });
}
function Sn() {
  var t = P();
  return m(function() {
    return new Yr(l(t));
  });
}
function bn(t, e) {
  var r = P(), n = m(function() {
    return new on(l(r).getBackend());
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
var tt = function t(e, r) {
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
      var a = o[i];
      if (!t(e[a], r[a]))
        return !1;
    }
    return !0;
  }
  return e !== e && r !== r;
};
function Tn(t, e, r) {
  var n = N(l(e)(l(t))), i = function() {
    var o = l(e)(l(t));
    tt(n, o) || (n.value = o, r && r());
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
function In(t) {
  if (Array.isArray(t))
    return t;
}
function En(t, e) {
  var r = t == null ? null : typeof Symbol < "u" && t[Symbol.iterator] || t["@@iterator"];
  if (r != null) {
    var n = [], i = !0, o = !1, a, s;
    try {
      for (r = r.call(t); !(i = (a = r.next()).done) && (n.push(a.value), !(e && n.length === e)); i = !0)
        ;
    } catch (u) {
      o = !0, s = u;
    } finally {
      try {
        !i && r.return != null && r.return();
      } finally {
        if (o)
          throw s;
      }
    }
    return n;
  }
}
function wn() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function Cn(t, e) {
  return In(t) || En(t, e) || _n(t, e) || wn();
}
function _n(t, e) {
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
function Nn(t, e, r) {
  var n = Cn(Tn(t, e, r), 2), i = n[0], o = n[1];
  return E(function(s) {
    var u = l(t).getHandlerId();
    u != null && s(l(t).subscribeToStateChange(o, {
      handlerIds: [
        u
      ]
    }));
  }), i;
}
function rt(t, e, r) {
  var n = function() {
    return {};
  };
  return Nn(e, t || n, function() {
    return l(r).reconnect();
  });
}
function fe(t, e) {
  var r = gt({
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
    var a = l(e) || o;
    return tt(r.options, a) || pe(r, "options", a), l(i);
  };
  return n;
}
function Pn(t, e) {
  return fe(function(r) {
    l(t).hooks.dragSource()(r.el, r.options);
  }, m(function() {
    return l(e).options;
  }));
}
function xn(t, e) {
  return fe(function(r) {
    l(t).hooks.dragPreview()(r.el, r.options);
  }, m(function() {
    return l(e).previewOptions;
  }));
}
function Rn(t) {
  var e = et(t), r = Sn(), n = bn(m(function() {
    return l(e).options;
  }), m(function() {
    return l(e).previewOptions;
  }));
  return On(e, r, n), [
    rt(m(function() {
      return l(e).collect || function() {
        return {};
      };
    }), r, n),
    Pn(n, e),
    xn(n, e)
  ];
}
function An(t) {
  return m(function() {
    var e = l(t).accept;
    return f(e != null, "accept must be defined"), Array.isArray(e) ? e : [
      e
    ];
  });
}
function Mn(t, e) {
  if (!(t instanceof e))
    throw new TypeError("Cannot call a class as a function");
}
var kn = /* @__PURE__ */ function() {
  function t(r, n) {
    Mn(this, t), this.spec = r, this.monitor = n;
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
function Ln(t, e) {
  var r = m(function() {
    return new kn(l(t), l(e));
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
function Hn(t) {
  if (Array.isArray(t))
    return t;
}
function $n(t, e) {
  var r = t == null ? null : typeof Symbol < "u" && t[Symbol.iterator] || t["@@iterator"];
  if (r != null) {
    var n = [], i = !0, o = !1, a, s;
    try {
      for (r = r.call(t); !(i = (a = r.next()).done) && (n.push(a.value), !(e && n.length === e)); i = !0)
        ;
    } catch (u) {
      o = !0, s = u;
    } finally {
      try {
        !i && r.return != null && r.return();
      } finally {
        if (o)
          throw s;
      }
    }
    return n;
  }
}
function jn() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function Un(t, e) {
  return Hn(t) || $n(t, e) || Fn(t, e) || jn();
}
function Fn(t, e) {
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
function Vn(t, e, r) {
  var n = P(), i = Ln(t, e), o = An(t);
  E(function(s) {
    var u = Un(cn(o, i, n), 2), c = u[0], g = u[1];
    l(e).receiveHandlerId(c), l(r).receiveHandlerId(c), s(g);
  });
}
function qn() {
  var t = P();
  return m(function() {
    return new zr(l(t));
  });
}
function Bn(t) {
  var e = P(), r = m(function() {
    return new un(l(e).getBackend());
  });
  return E(function(n) {
    r.value.dropTargetOptions = l(t) || null, r.value.reconnect(), n(function() {
      return r.value.disconnectDropTarget();
    });
  }), r;
}
function Gn(t, e) {
  return fe(function(r) {
    l(t).hooks.dropTarget()(r.el, r.options);
  }, m(function() {
    return l(e).options;
  }));
}
function Wn(t) {
  var e = et(t), r = qn(), n = Bn(m(function() {
    return l(e).options;
  }));
  return Vn(e, r, n), [
    rt(m(function() {
      return l(e).collect || function() {
        return {};
      };
    }), r, n),
    Gn(n, e)
  ];
}
function nt(t) {
  let e = null;
  return () => (e == null && (e = t()), e);
}
function Yn(t, e) {
  return t.filter(
    (r) => r !== e
  );
}
function Xn(t, e) {
  const r = /* @__PURE__ */ new Set(), n = (o) => r.add(o);
  t.forEach(n), e.forEach(n);
  const i = [];
  return r.forEach(
    (o) => i.push(o)
  ), i;
}
class zn {
  enter(e) {
    const r = this.entered.length, n = (i) => this.isNodeInDocument(i) && (!i.contains || i.contains(e));
    return this.entered = Xn(this.entered.filter(n), [
      e
    ]), r === 0 && this.entered.length > 0;
  }
  leave(e) {
    const r = this.entered.length;
    return this.entered = Yn(this.entered.filter(this.isNodeInDocument), e), r > 0 && this.entered.length === 0;
  }
  reset() {
    this.entered = [];
  }
  constructor(e) {
    this.entered = [], this.isNodeInDocument = e;
  }
}
class Qn {
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
const it = "__NATIVE_FILE__", ot = "__NATIVE_URL__", st = "__NATIVE_TEXT__", at = "__NATIVE_HTML__", Pe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  FILE: it,
  HTML: at,
  TEXT: st,
  URL: ot
}, Symbol.toStringTag, { value: "Module" }));
function J(t, e, r) {
  const n = e.reduce(
    (i, o) => i || t.getData(o),
    ""
  );
  return n ?? r;
}
const ie = {
  [it]: {
    exposeProperties: {
      files: (t) => Array.prototype.slice.call(t.files),
      items: (t) => t.items,
      dataTransfer: (t) => t
    },
    matchesTypes: [
      "Files"
    ]
  },
  [at]: {
    exposeProperties: {
      html: (t, e) => J(t, e, ""),
      dataTransfer: (t) => t
    },
    matchesTypes: [
      "Html",
      "text/html"
    ]
  },
  [ot]: {
    exposeProperties: {
      urls: (t, e) => J(t, e, "").split(`
`),
      dataTransfer: (t) => t
    },
    matchesTypes: [
      "Url",
      "text/uri-list"
    ]
  },
  [st]: {
    exposeProperties: {
      text: (t, e) => J(t, e, ""),
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
  const n = new Qn(r);
  return n.loadDataTransfer(e), n;
}
function K(t) {
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
const Kn = nt(
  () => /firefox/i.test(navigator.userAgent)
), ut = nt(
  () => !!window.safari
);
class xe {
  interpolate(e) {
    const { xs: r, ys: n, c1s: i, c2s: o, c3s: a } = this;
    let s = r.length - 1;
    if (e === r[s])
      return n[s];
    let u = 0, c = a.length - 1, g;
    for (; u <= c; ) {
      g = Math.floor(0.5 * (u + c));
      const d = r[g];
      if (d < e)
        u = g + 1;
      else if (d > e)
        c = g - 1;
      else
        return n[g];
    }
    s = Math.max(0, c);
    const h = e - r[s], v = h * h;
    return n[s] + i[s] * h + o[s] * v + a[s] * h * v;
  }
  constructor(e, r) {
    const { length: n } = e, i = [];
    for (let d = 0; d < n; d++)
      i.push(d);
    i.sort(
      (d, y) => e[d] < e[y] ? -1 : 1
    );
    const o = [], a = [];
    let s, u;
    for (let d = 0; d < n - 1; d++)
      s = e[d + 1] - e[d], u = r[d + 1] - r[d], o.push(s), a.push(u / s);
    const c = [
      a[0]
    ];
    for (let d = 0; d < o.length - 1; d++) {
      const y = a[d], p = a[d + 1];
      if (y * p <= 0)
        c.push(0);
      else {
        s = o[d];
        const D = o[d + 1], S = s + D;
        c.push(3 * S / ((S + D) / y + (S + s) / p));
      }
    }
    c.push(a[a.length - 1]);
    const g = [], h = [];
    let v;
    for (let d = 0; d < c.length - 1; d++) {
      v = a[d];
      const y = c[d], p = 1 / o[d], D = y + c[d + 1] - v - v;
      g.push((v - y - D) * p), h.push(D * p * p);
    }
    this.xs = e, this.ys = r, this.c1s = c, this.c2s = g, this.c3s = h;
  }
}
const Zn = 1;
function ct(t) {
  const e = t.nodeType === Zn ? t : t.parentElement;
  if (!e)
    return null;
  const { top: r, left: n } = e.getBoundingClientRect();
  return {
    x: n,
    y: r
  };
}
function M(t) {
  return {
    x: t.clientX,
    y: t.clientY
  };
}
function ei(t) {
  var e;
  return t.nodeName === "IMG" && (Kn() || !(!((e = document.documentElement) === null || e === void 0) && e.contains(t)));
}
function ti(t, e, r, n) {
  let i = t ? e.width : r, o = t ? e.height : n;
  return ut() && t && (o /= window.devicePixelRatio, i /= window.devicePixelRatio), {
    dragPreviewWidth: i,
    dragPreviewHeight: o
  };
}
function ri(t, e, r, n, i) {
  const o = ei(e), s = ct(o ? t : e), u = {
    x: r.x - s.x,
    y: r.y - s.y
  }, { offsetWidth: c, offsetHeight: g } = t, { anchorX: h, anchorY: v } = n, { dragPreviewWidth: d, dragPreviewHeight: y } = ti(o, e, c, g), p = () => {
    let ge = new xe([
      0,
      0.5,
      1
    ], [
      // Dock to the top
      u.y,
      // Align at the center
      u.y / g * y,
      // Dock to the bottom
      u.y + y - g
    ]).interpolate(v);
    return ut() && o && (ge += (window.devicePixelRatio - 1) * y), ge;
  }, D = () => new xe([
    0,
    0.5,
    1
  ], [
    // Dock to the left
    u.x,
    // Align at the center
    u.x / c * d,
    // Dock to the right
    u.x + d - c
  ]).interpolate(h), { offsetX: S, offsetY: b } = i, w = S === 0 || S, W = b === 0 || b;
  return {
    x: w ? S : D(),
    y: W ? b : p()
  };
}
class ni {
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
function ii(t, e, r) {
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
      ii(t, i, r[i]);
    });
  }
  return t;
}
class oi {
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
    const i = (a) => this.handleDragStart(a, e), o = (a) => this.handleSelectStart(a);
    return r.setAttribute("draggable", "true"), r.addEventListener("dragstart", i), r.addEventListener("selectstart", o), () => {
      this.sourceNodes.delete(e), this.sourceNodeOptions.delete(e), r.removeEventListener("dragstart", i), r.removeEventListener("selectstart", o), r.setAttribute("draggable", "false");
    };
  }
  connectDropTarget(e, r) {
    const n = (a) => this.handleDragEnter(a, e), i = (a) => this.handleDragOver(a, e), o = (a) => this.handleDrop(a, e);
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
      return o && ct(o) || null;
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
      const a = M(i);
      this.monitor.isDragging() && (this.actions.endDrag(), this.cancelHover()), this.actions.beginDrag(o || [], {
        publishSource: !1,
        getSourceClientOffset: this.getSourceClientOffset,
        clientOffset: a
      });
      const { dataTransfer: s } = i, u = K(s);
      if (this.monitor.isDragging()) {
        if (s && typeof s.setDragImage == "function") {
          const g = this.monitor.getSourceId(), h = this.sourceNodes.get(g), v = this.sourcePreviewNodes.get(g) || h;
          if (v) {
            const { anchorX: d, anchorY: y, offsetX: p, offsetY: D } = this.getCurrentSourcePreviewNodeOptions(), w = ri(h, v, a, {
              anchorX: d,
              anchorY: y
            }, {
              offsetX: p,
              offsetY: D
            });
            s.setDragImage(v, w.x, w.y);
          }
        }
        try {
          s == null || s.setData("application/json", {});
        } catch {
        }
        this.setCurrentDragSourceNode(i.target);
        const { captureDraggingState: c } = this.getCurrentSourcePreviewNodeOptions();
        c ? this.actions.publishDragSource() : setTimeout(
          () => this.actions.publishDragSource(),
          0
        );
      } else if (u)
        this.beginDragNativeItem(u);
      else {
        if (s && !s.types && (i.target && !i.target.hasAttribute || !i.target.hasAttribute("draggable")))
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
      const { dataTransfer: s } = i, u = K(s);
      u && this.beginDragNativeItem(u, s);
    }, this.handleTopDragEnter = (i) => {
      const { dragEnterTargetIds: o } = this;
      if (this.dragEnterTargetIds = [], !this.monitor.isDragging())
        return;
      this.altKeyPressed = i.altKey, o.length > 0 && this.actions.hover(o, {
        clientOffset: M(i)
      }), o.some(
        (s) => this.monitor.canDropOnTarget(s)
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
      this.altKeyPressed = i.altKey, this.lastClientOffset = M(i), this.scheduleHover(o), (o || []).some(
        (s) => this.monitor.canDropOnTarget(s)
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
        K(i.dataTransfer) && i.preventDefault();
      this.enterLeaveCounter.reset();
    }, this.handleTopDrop = (i) => {
      const { dropTargetIds: o } = this;
      this.dropTargetIds = [], this.actions.hover(o, {
        clientOffset: M(i)
      }), this.actions.drop({
        dropEffect: this.getCurrentDropEffect()
      }), this.isDraggingNativeItem() ? this.endDragNativeItem() : this.monitor.isDragging() && this.actions.endDrag(), this.cancelHover();
    }, this.handleSelectStart = (i) => {
      const o = i.target;
      typeof o.dragDrop == "function" && (o.tagName === "INPUT" || o.tagName === "SELECT" || o.tagName === "TEXTAREA" || o.isContentEditable || (i.preventDefault(), o.dragDrop()));
    }, this.options = new ni(r, n), this.actions = e.getActions(), this.monitor = e.getMonitor(), this.registry = e.getRegistry(), this.enterLeaveCounter = new zn(this.isNodeInDocument);
  }
}
const si = function(e, r, n) {
  return new oi(e, r, n);
}, j = /* @__PURE__ */ A({
  __name: "DndProvider",
  setup(t) {
    return (e, r) => (x(), Z(l(Gr), { backend: l(si) }, {
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
const ai = (t, e, r, n, i) => {
  const o = [...t.value];
  i && o.splice(e, 1), o.splice(r, 0, n), t.value = o;
}, ui = (t, e, r, n) => {
  if (!t.value)
    return;
  const i = e.index, o = r.index;
  i === o && r.hasItem(e) || (r.move(e.data, i, o), e.index = o);
}, ci = /* @__PURE__ */ A({
  __name: "DraggableItem",
  props: {
    index: null,
    data: null,
    disabled: { type: Boolean },
    move: null,
    hasItem: null
  },
  setup(t) {
    const e = t, r = N(H("typeName")), n = N(H("acceptName")), i = N(H("canDrag", !0)), [, o] = Rn(() => ({
      type: r.value,
      item: () => ({ index: e.index, data: e.data }),
      collect: (c) => ({
        isDragging: c.isDragging(),
        handlerId: c.getHandlerId()
      }),
      canDrag: () => i.value
    })), [, a] = Wn(() => ({
      accept: n.value,
      hover: (c, g) => {
        ui(s, c, e);
      },
      drop: (c, g) => {
      },
      collect: (c) => ({
        isOver: c.isOver(),
        canDrop: c.canDrop()
      })
    })), s = N(), u = (c) => {
      s.value = o(a(c));
    };
    return qe(
      () => e.index,
      (c, g) => {
        console.log("index", c, g);
      }
    ), (c, g) => (x(), Be("div", {
      class: "draggable-item",
      ref: u,
      key: t.index
    }, [
      oe(c.$slots, "default", {}, void 0, !0)
    ]));
  }
});
const lt = (t, e) => {
  const r = t.__vccOpts || t;
  for (const [n, i] of e)
    r[n] = i;
  return r;
}, li = /* @__PURE__ */ lt(ci, [["__scopeId", "data-v-429f5cbe"]]);
let k;
const di = new Uint8Array(16);
function fi() {
  if (!k && (k = typeof crypto < "u" && crypto.getRandomValues && crypto.getRandomValues.bind(crypto), !k))
    throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");
  return k(di);
}
const O = [];
for (let t = 0; t < 256; ++t)
  O.push((t + 256).toString(16).slice(1));
function gi(t, e = 0) {
  return (O[t[e + 0]] + O[t[e + 1]] + O[t[e + 2]] + O[t[e + 3]] + "-" + O[t[e + 4]] + O[t[e + 5]] + "-" + O[t[e + 6]] + O[t[e + 7]] + "-" + O[t[e + 8]] + O[t[e + 9]] + "-" + O[t[e + 10]] + O[t[e + 11]] + O[t[e + 12]] + O[t[e + 13]] + O[t[e + 14]] + O[t[e + 15]]).toLowerCase();
}
const hi = typeof crypto < "u" && crypto.randomUUID && crypto.randomUUID.bind(crypto), Ae = {
  randomUUID: hi
};
function pi(t, e, r) {
  if (Ae.randomUUID && !e && !t)
    return Ae.randomUUID();
  t = t || {};
  const n = t.random || (t.rng || fi)();
  if (n[6] = n[6] & 15 | 64, n[8] = n[8] & 63 | 128, e) {
    r = r || 0;
    for (let i = 0; i < 16; ++i)
      e[r + i] = n[i];
    return e;
  }
  return gi(n);
}
var Me;
const vi = typeof window < "u";
vi && ((Me = window == null ? void 0 : window.navigator) != null && Me.userAgent) && /iP(ad|hone|od)/.test(window.navigator.userAgent);
function mi(t) {
  return t;
}
var yi = Object.defineProperty, Di = Object.defineProperties, Oi = Object.getOwnPropertyDescriptors, ke = Object.getOwnPropertySymbols, Si = Object.prototype.hasOwnProperty, bi = Object.prototype.propertyIsEnumerable, Le = (t, e, r) => e in t ? yi(t, e, { enumerable: !0, configurable: !0, writable: !0, value: r }) : t[e] = r, Ti = (t, e) => {
  for (var r in e || (e = {}))
    Si.call(e, r) && Le(t, r, e[r]);
  if (ke)
    for (var r of ke(e))
      bi.call(e, r) && Le(t, r, e[r]);
  return t;
}, Ii = (t, e) => Di(t, Oi(e));
function Ei(t) {
  return JSON.parse(JSON.stringify(t));
}
function wi(t, e = {}) {
  const r = N({}), {
    manual: n,
    clone: i = Ei,
    deep: o = !0,
    immediate: a = !0
  } = e;
  function s() {
    r.value = i(l(t));
  }
  return !n && Ve(t) ? qe(t, s, Ii(Ti({}, e), {
    deep: o,
    immediate: a
  })) : s(), { cloned: r, sync: s };
}
const He = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, $e = "__vueuse_ssr_handlers__";
He[$e] = He[$e] || {};
var je;
(function(t) {
  t.UP = "UP", t.RIGHT = "RIGHT", t.DOWN = "DOWN", t.LEFT = "LEFT", t.NONE = "NONE";
})(je || (je = {}));
var Ci = Object.defineProperty, Ue = Object.getOwnPropertySymbols, _i = Object.prototype.hasOwnProperty, Ni = Object.prototype.propertyIsEnumerable, Fe = (t, e, r) => e in t ? Ci(t, e, { enumerable: !0, configurable: !0, writable: !0, value: r }) : t[e] = r, Pi = (t, e) => {
  for (var r in e || (e = {}))
    _i.call(e, r) && Fe(t, r, e[r]);
  if (Ue)
    for (var r of Ue(e))
      Ni.call(e, r) && Fe(t, r, e[r]);
  return t;
};
const xi = {
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
Pi({
  linear: mi
}, xi);
const Ri = /* @__PURE__ */ A({
  __name: "Draggable",
  props: {
    disabled: { type: Boolean, default: !1 },
    dragName: null,
    dropName: null,
    list: null,
    itemKey: { default: "id" }
  },
  emits: ["update:list"],
  setup(t, { emit: e }) {
    const r = t, n = pi(), i = (h) => {
      let v = [];
      return typeof h == "string" ? v = [h, n] : Array.isArray(h) ? v = [...h, n] : v = [n], v;
    }, o = m(() => r.dragName || n), a = m(() => i(r.dropName)), s = m(() => !r.disabled);
    L("typeName", o), L("acceptName", a), L("canDrag", s);
    const u = m({
      get() {
        return wi(r.list).cloned.value;
      },
      set(h) {
        e("update:list", h);
      }
    }), c = (h, v, d) => ai(u, v, d, h, g(h)), g = (h) => u.value.map((v) => JSON.stringify(he(v))).includes(JSON.stringify(he(h)));
    return (h, v) => {
      const d = li;
      return x(), Z(ht, {
        name: "list",
        tag: "div"
      }, {
        default: ee(() => [
          (x(!0), Be(pt, null, vt(l(u), (y, p) => (x(), Z(d, {
            key: t.itemKey ? y[t.itemKey] : y,
            move: c,
            index: p,
            data: y,
            disabled: t.disabled,
            hasItem: g
          }, {
            default: ee(() => [
              oe(h.$slots, "item", {
                data: y,
                index: p
              }, void 0, !0)
            ]),
            _: 2
          }, 1032, ["index", "data", "disabled"]))), 128))
        ]),
        _: 3
      });
    };
  }
});
const U = /* @__PURE__ */ lt(Ri, [["__scopeId", "data-v-557b7704"]]);
U.install = (t) => {
  t.component(U.__name, U);
};
const Ai = [U, j], Mi = (t) => {
  Ai.forEach((e) => {
    t.component(e.__name, e);
  });
}, Li = {
  install: Mi
};
export {
  j as DndProvider,
  Li as default,
  U as draggable
};
//# sourceMappingURL=index.js.map
