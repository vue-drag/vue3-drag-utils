import { provide as K, inject as P, defineComponent as A, onUnmounted as dt, watchEffect as E, isRef as Fe, unref as l, computed as m, ref as ie, reactive as ft, openBlock as x, createBlock as J, withCtx as Z, renderSlot as oe, watch as Ve, createElementBlock as qe, TransitionGroup as gt, Fragment as ht, renderList as pt } from "vue";
function he(t, e, r) {
  return Array.isArray(t) ? (t.length = Math.max(t.length, e), t.splice(e, 1, r), r) : (t[e] = r, r);
}
var Be = Symbol("DndContextType");
function vt(t) {
  K(Be, t);
}
function mt() {
  return P(Be);
}
var I;
(function(t) {
  t.SOURCE = "SOURCE", t.TARGET = "TARGET";
})(I || (I = {}));
function g(t, e, ...r) {
  if (yt() && e === void 0)
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
function yt() {
  return typeof process < "u" && process.env.NODE_ENV === "production";
}
const se = "dnd-core/INIT_COORDS", $ = "dnd-core/BEGIN_DRAG", ae = "dnd-core/PUBLISH_DRAG_SOURCE", U = "dnd-core/HOVER", F = "dnd-core/DROP", V = "dnd-core/END_DRAG";
function pe(t, e) {
  return {
    type: se,
    payload: {
      sourceClientOffset: e || null,
      clientOffset: t || null
    }
  };
}
function Dt(t, e, r) {
  return e.split(".").reduce(
    (n, i) => n && n[i] ? n[i] : r || null,
    t
  );
}
function Ot(t, e) {
  return t.filter(
    (r) => r !== e
  );
}
function Ge(t) {
  return typeof t == "object";
}
function St(t, e) {
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
const bt = {
  type: se,
  payload: {
    clientOffset: null,
    sourceClientOffset: null
  }
};
function It(t) {
  return function(r = [], n = {
    publishSource: !0
  }) {
    const { publishSource: i = !0, clientOffset: o, getSourceClientOffset: a } = n, s = t.getMonitor(), u = t.getRegistry();
    t.dispatch(pe(o)), Et(r, s, u);
    const c = _t(r, s);
    if (c == null) {
      t.dispatch(bt);
      return;
    }
    let f = null;
    if (o) {
      if (!a)
        throw new Error("getSourceClientOffset must be defined");
      wt(a), f = a(c);
    }
    t.dispatch(pe(o, f));
    const h = u.getSource(c).beginDrag(s, c);
    if (h == null)
      return;
    Ct(h), u.pinSource(c);
    const d = u.getSourceType(c);
    return {
      type: $,
      payload: {
        itemType: d,
        item: h,
        sourceId: c,
        clientOffset: o || null,
        sourceClientOffset: f || null,
        isSourcePublic: !!i
      }
    };
  };
}
function Et(t, e, r) {
  g(!e.isDragging(), "Cannot call beginDrag while dragging."), t.forEach(function(n) {
    g(r.getSource(n), "Expected sourceIds to be registered.");
  });
}
function wt(t) {
  g(typeof t == "function", "When clientOffset is provided, getSourceClientOffset must be a function.");
}
function Ct(t) {
  g(Ge(t), "Item must be an object.");
}
function _t(t, e) {
  let r = null;
  for (let n = t.length - 1; n >= 0; n--)
    if (e.canDragSource(t[n])) {
      r = t[n];
      break;
    }
  return r;
}
function Nt(t) {
  return function() {
    if (t.getMonitor().isDragging())
      return {
        type: ae
      };
  };
}
function ee(t, e) {
  return e === null ? t === null : Array.isArray(t) ? t.some(
    (r) => r === e
  ) : t === e;
}
function Pt(t) {
  return function(r, { clientOffset: n } = {}) {
    xt(r);
    const i = r.slice(0), o = t.getMonitor(), a = t.getRegistry();
    Rt(i, o, a);
    const s = o.getItemType();
    return At(i, a, s), Mt(i, o, a), {
      type: U,
      payload: {
        targetIds: i,
        clientOffset: n || null
      }
    };
  };
}
function xt(t) {
  g(Array.isArray(t), "Expected targetIds to be an array.");
}
function Rt(t, e, r) {
  g(e.isDragging(), "Cannot call hover while not dragging."), g(!e.didDrop(), "Cannot call hover after drop.");
  for (let n = 0; n < t.length; n++) {
    const i = t[n];
    g(t.lastIndexOf(i) === n, "Expected targetIds to be unique in the passed array.");
    const o = r.getTarget(i);
    g(o, "Expected targetIds to be registered.");
  }
}
function At(t, e, r) {
  for (let n = t.length - 1; n >= 0; n--) {
    const i = t[n], o = e.getTargetType(i);
    ee(o, r) || t.splice(n, 1);
  }
}
function Mt(t, e, r) {
  t.forEach(function(n) {
    r.getTarget(n).hover(e, n);
  });
}
function kt(t, e, r) {
  return e in t ? Object.defineProperty(t, e, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : t[e] = r, t;
}
function Lt(t) {
  for (var e = 1; e < arguments.length; e++) {
    var r = arguments[e] != null ? arguments[e] : {}, n = Object.keys(r);
    typeof Object.getOwnPropertySymbols == "function" && (n = n.concat(Object.getOwnPropertySymbols(r).filter(function(i) {
      return Object.getOwnPropertyDescriptor(r, i).enumerable;
    }))), n.forEach(function(i) {
      kt(t, i, r[i]);
    });
  }
  return t;
}
function Ht(t) {
  return function(r = {}) {
    const n = t.getMonitor(), i = t.getRegistry();
    jt(n), Ft(n).forEach((a, s) => {
      const u = $t(a, s, i, n), c = {
        type: F,
        payload: {
          dropResult: Lt({}, r, u)
        }
      };
      t.dispatch(c);
    });
  };
}
function jt(t) {
  g(t.isDragging(), "Cannot call drop while not dragging."), g(!t.didDrop(), "Cannot call drop twice during one drag operation.");
}
function $t(t, e, r, n) {
  const i = r.getTarget(t);
  let o = i ? i.drop(n, t) : void 0;
  return Ut(o), typeof o > "u" && (o = e === 0 ? {} : n.getDropResult()), o;
}
function Ut(t) {
  g(typeof t > "u" || Ge(t), "Drop result must either be an object or undefined.");
}
function Ft(t) {
  const e = t.getTargetIds().filter(t.canDropOnTarget, t);
  return e.reverse(), e;
}
function Vt(t) {
  return function() {
    const r = t.getMonitor(), n = t.getRegistry();
    qt(r);
    const i = r.getSourceId();
    return i != null && (n.getSource(i, !0).endDrag(r, i), n.unpinSource()), {
      type: V
    };
  };
}
function qt(t) {
  g(t.isDragging(), "Cannot call endDrag while not dragging.");
}
function Bt(t) {
  return {
    beginDrag: It(t),
    publishDragSource: Nt(t),
    hover: Pt(t),
    drop: Ht(t),
    endDrag: Vt(t)
  };
}
class Gt {
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
    const i = Bt(this);
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
function b(t) {
  return "Minified Redux error #" + t + "; visit https://redux.js.org/Errors?code=" + t + " for the full message or use the non-minified dev environment for full errors. ";
}
var ve = function() {
  return typeof Symbol == "function" && Symbol.observable || "@@observable";
}(), G = function() {
  return Math.random().toString(36).substring(7).split("").join(".");
}, me = {
  INIT: "@@redux/INIT" + G(),
  REPLACE: "@@redux/REPLACE" + G(),
  PROBE_UNKNOWN_ACTION: function() {
    return "@@redux/PROBE_UNKNOWN_ACTION" + G();
  }
};
function Wt(t) {
  if (typeof t != "object" || t === null)
    return !1;
  for (var e = t; Object.getPrototypeOf(e) !== null; )
    e = Object.getPrototypeOf(e);
  return Object.getPrototypeOf(t) === e;
}
function Yt(t) {
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
  if (Qt(t))
    return "date";
  if (zt(t))
    return "error";
  var r = Xt(t);
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
function Xt(t) {
  return typeof t.constructor == "function" ? t.constructor.name : null;
}
function zt(t) {
  return t instanceof Error || typeof t.message == "string" && t.constructor && typeof t.constructor.stackTraceLimit == "number";
}
function Qt(t) {
  return t instanceof Date ? !0 : typeof t.toDateString == "function" && typeof t.getDate == "function" && typeof t.setDate == "function";
}
function C(t) {
  var e = typeof t;
  return process.env.NODE_ENV !== "production" && (e = Yt(t)), e;
}
function We(t, e, r) {
  var n;
  if (typeof e == "function" && typeof r == "function" || typeof r == "function" && typeof arguments[3] == "function")
    throw new Error(process.env.NODE_ENV === "production" ? b(0) : "It looks like you are passing several store enhancers to createStore(). This is not supported. Instead, compose them together to a single function. See https://redux.js.org/tutorials/fundamentals/part-4-store#creating-a-store-with-enhancers for an example.");
  if (typeof e == "function" && typeof r > "u" && (r = e, e = void 0), typeof r < "u") {
    if (typeof r != "function")
      throw new Error(process.env.NODE_ENV === "production" ? b(1) : "Expected the enhancer to be a function. Instead, received: '" + C(r) + "'");
    return r(We)(t, e);
  }
  if (typeof t != "function")
    throw new Error(process.env.NODE_ENV === "production" ? b(2) : "Expected the root reducer to be a function. Instead, received: '" + C(t) + "'");
  var i = t, o = e, a = [], s = a, u = !1;
  function c() {
    s === a && (s = a.slice());
  }
  function f() {
    if (u)
      throw new Error(process.env.NODE_ENV === "production" ? b(3) : "You may not call store.getState() while the reducer is executing. The reducer has already received the state as an argument. Pass it down from the top reducer instead of reading it from the store.");
    return o;
  }
  function v(p) {
    if (typeof p != "function")
      throw new Error(process.env.NODE_ENV === "production" ? b(4) : "Expected the listener to be a function. Instead, received: '" + C(p) + "'");
    if (u)
      throw new Error(process.env.NODE_ENV === "production" ? b(5) : "You may not call store.subscribe() while the reducer is executing. If you would like to be notified after the store has been updated, subscribe from a component and invoke store.getState() in the callback to access the latest state. See https://redux.js.org/api/store#subscribelistener for more details.");
    var D = !0;
    return c(), s.push(p), function() {
      if (D) {
        if (u)
          throw new Error(process.env.NODE_ENV === "production" ? b(6) : "You may not unsubscribe from a store listener while the reducer is executing. See https://redux.js.org/api/store#subscribelistener for more details.");
        D = !1, c();
        var T = s.indexOf(p);
        s.splice(T, 1), a = null;
      }
    };
  }
  function h(p) {
    if (!Wt(p))
      throw new Error(process.env.NODE_ENV === "production" ? b(7) : "Actions must be plain objects. Instead, the actual type was: '" + C(p) + "'. You may need to add middleware to your store setup to handle dispatching other values, such as 'redux-thunk' to handle dispatching functions. See https://redux.js.org/tutorials/fundamentals/part-4-store#middleware and https://redux.js.org/tutorials/fundamentals/part-6-async-logic#using-the-redux-thunk-middleware for examples.");
    if (typeof p.type > "u")
      throw new Error(process.env.NODE_ENV === "production" ? b(8) : 'Actions may not have an undefined "type" property. You may have misspelled an action type string constant.');
    if (u)
      throw new Error(process.env.NODE_ENV === "production" ? b(9) : "Reducers may not dispatch actions.");
    try {
      u = !0, o = i(o, p);
    } finally {
      u = !1;
    }
    for (var D = a = s, S = 0; S < D.length; S++) {
      var T = D[S];
      T();
    }
    return p;
  }
  function d(p) {
    if (typeof p != "function")
      throw new Error(process.env.NODE_ENV === "production" ? b(10) : "Expected the nextReducer to be a function. Instead, received: '" + C(p));
    i = p, h({
      type: me.REPLACE
    });
  }
  function y() {
    var p, D = v;
    return p = {
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
          throw new Error(process.env.NODE_ENV === "production" ? b(11) : "Expected the observer to be an object. Instead, received: '" + C(T) + "'");
        function w() {
          T.next && T.next(f());
        }
        w();
        var B = D(w);
        return {
          unsubscribe: B
        };
      }
    }, p[ve] = function() {
      return this;
    }, p;
  }
  return h({
    type: me.INIT
  }), n = {
    dispatch: h,
    subscribe: v,
    getState: f,
    replaceReducer: d
  }, n[ve] = y, n;
}
const Kt = (t, e) => t === e;
function Jt(t, e) {
  return !t && !e ? !0 : !t || !e ? !1 : t.x === e.x && t.y === e.y;
}
function Zt(t, e, r = Kt) {
  if (t.length !== e.length)
    return !1;
  for (let n = 0; n < t.length; ++n)
    if (!r(t[n], e[n]))
      return !1;
  return !0;
}
function er(t, e, r) {
  return e in t ? Object.defineProperty(t, e, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : t[e] = r, t;
}
function tr(t) {
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
const ye = {
  initialSourceClientOffset: null,
  initialClientOffset: null,
  clientOffset: null
};
function rr(t = ye, e) {
  const { payload: r } = e;
  switch (e.type) {
    case se:
    case $:
      return {
        initialSourceClientOffset: r.sourceClientOffset,
        initialClientOffset: r.clientOffset,
        clientOffset: r.clientOffset
      };
    case U:
      return Jt(t.clientOffset, r.clientOffset) ? t : tr({}, t, {
        clientOffset: r.clientOffset
      });
    case V:
    case F:
      return ye;
    default:
      return t;
  }
}
const ue = "dnd-core/ADD_SOURCE", ce = "dnd-core/ADD_TARGET", le = "dnd-core/REMOVE_SOURCE", q = "dnd-core/REMOVE_TARGET";
function nr(t) {
  return {
    type: ue,
    payload: {
      sourceId: t
    }
  };
}
function ir(t) {
  return {
    type: ce,
    payload: {
      targetId: t
    }
  };
}
function or(t) {
  return {
    type: le,
    payload: {
      sourceId: t
    }
  };
}
function sr(t) {
  return {
    type: q,
    payload: {
      targetId: t
    }
  };
}
function ar(t, e, r) {
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
      ar(t, i, r[i]);
    });
  }
  return t;
}
const ur = {
  itemType: null,
  item: null,
  sourceId: null,
  targetIds: [],
  dropResult: null,
  didDrop: !1,
  isSourcePublic: null
};
function cr(t = ur, e) {
  const { payload: r } = e;
  switch (e.type) {
    case $:
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
    case U:
      return _({}, t, {
        targetIds: r.targetIds
      });
    case q:
      return t.targetIds.indexOf(r.targetId) === -1 ? t : _({}, t, {
        targetIds: Ot(t.targetIds, r.targetId)
      });
    case F:
      return _({}, t, {
        dropResult: r.dropResult,
        didDrop: !0,
        targetIds: []
      });
    case V:
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
function lr(t = 0, e) {
  switch (e.type) {
    case ue:
    case ce:
      return t + 1;
    case le:
    case q:
      return t - 1;
    default:
      return t;
  }
}
const R = [], de = [];
R.__IS_NONE__ = !0;
de.__IS_ALL__ = !0;
function dr(t, e) {
  return t === R ? !1 : t === de || typeof e > "u" ? !0 : Tt(e, t).length > 0;
}
function fr(t = R, e) {
  switch (e.type) {
    case U:
      break;
    case ue:
    case ce:
    case q:
    case le:
      return R;
    case $:
    case ae:
    case V:
    case F:
    default:
      return de;
  }
  const { targetIds: r = [], prevTargetIds: n = [] } = e.payload, i = St(r, n);
  if (!(i.length > 0 || !Zt(r, n)))
    return R;
  const a = n[n.length - 1], s = r[r.length - 1];
  return a !== s && (a && i.push(a), s && i.push(s)), i;
}
function gr(t = 0) {
  return t + 1;
}
function hr(t, e, r) {
  return e in t ? Object.defineProperty(t, e, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : t[e] = r, t;
}
function pr(t) {
  for (var e = 1; e < arguments.length; e++) {
    var r = arguments[e] != null ? arguments[e] : {}, n = Object.keys(r);
    typeof Object.getOwnPropertySymbols == "function" && (n = n.concat(Object.getOwnPropertySymbols(r).filter(function(i) {
      return Object.getOwnPropertyDescriptor(r, i).enumerable;
    }))), n.forEach(function(i) {
      hr(t, i, r[i]);
    });
  }
  return t;
}
function vr(t = {}, e) {
  return {
    dirtyHandlerIds: fr(t.dirtyHandlerIds, {
      type: e.type,
      payload: pr({}, e.payload, {
        prevTargetIds: Dt(t, "dragOperation.targetIds", [])
      })
    }),
    dragOffset: rr(t.dragOffset, e),
    refCount: lr(t.refCount, e),
    dragOperation: cr(t.dragOperation, e),
    stateId: gr(t.stateId)
  };
}
function mr(t, e) {
  return {
    x: t.x + e.x,
    y: t.y + e.y
  };
}
function Ye(t, e) {
  return {
    x: t.x - e.x,
    y: t.y - e.y
  };
}
function yr(t) {
  const { clientOffset: e, initialClientOffset: r, initialSourceClientOffset: n } = t;
  return !e || !r || !n ? null : Ye(mr(e, n), r);
}
function Dr(t) {
  const { clientOffset: e, initialClientOffset: r } = t;
  return !e || !r ? null : Ye(e, r);
}
class Or {
  subscribeToStateChange(e, r = {}) {
    const { handlerIds: n } = r;
    g(typeof e == "function", "listener must be a function."), g(typeof n > "u" || Array.isArray(n), "handlerIds, when specified, must be an array of strings.");
    let i = this.store.getState().stateId;
    const o = () => {
      const a = this.store.getState(), s = a.stateId;
      try {
        s === i || s === i + 1 && !dr(a.dirtyHandlerIds, n) || e();
      } finally {
        i = s;
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
    return yr(this.store.getState().dragOffset);
  }
  getDifferenceFromInitialOffset() {
    return Dr(this.store.getState().dragOffset);
  }
  constructor(e, r) {
    this.store = e, this.registry = r;
  }
}
let Sr = 0;
function Tr() {
  return Sr++;
}
function br(t) {
  g(typeof t.canDrag == "function", "Expected canDrag to be a function."), g(typeof t.beginDrag == "function", "Expected beginDrag to be a function."), g(typeof t.endDrag == "function", "Expected endDrag to be a function.");
}
function Ir(t) {
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
const De = typeof global < "u" ? global : self, Xe = De.MutationObserver || De.WebKitMutationObserver;
function ze(t) {
  return function() {
    const r = setTimeout(i, 0), n = setInterval(i, 50);
    function i() {
      clearTimeout(r), clearInterval(n), t();
    }
  };
}
function Er(t) {
  let e = 1;
  const r = new Xe(t), n = document.createTextNode("");
  return r.observe(n, {
    characterData: !0
  }), function() {
    e = -e, n.data = e;
  };
}
const wr = typeof Xe == "function" ? (
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
  Er
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
  ze
);
class Cr {
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
    }, this.requestFlush = wr(this.flush), this.requestErrorThrow = ze(() => {
      if (this.pendingErrors.length)
        throw this.pendingErrors.shift();
    });
  }
}
class _r {
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
class Nr {
  create(e) {
    const r = this.freeTasks, n = r.length ? r.pop() : new _r(
      this.onError,
      (i) => r[r.length] = i
    );
    return n.task = e, n;
  }
  constructor(e) {
    this.onError = e, this.freeTasks = [];
  }
}
const Qe = new Cr(), Pr = new Nr(Qe.registerPendingError);
function xr(t) {
  Qe.enqueueTask(Pr.create(t));
}
function Rr(t) {
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
class Ar {
  addSource(e, r) {
    te(e), br(r);
    const n = this.addHandler(I.SOURCE, e, r);
    return this.store.dispatch(nr(n)), n;
  }
  addTarget(e, r) {
    te(e, !0), Ir(r);
    const n = this.addHandler(I.TARGET, e, r);
    return this.store.dispatch(ir(n)), n;
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
    g(this.getSource(e), "Expected an existing source."), this.store.dispatch(or(e)), xr(() => {
      this.dragSources.delete(e), this.types.delete(e);
    });
  }
  removeTarget(e) {
    g(this.getTarget(e), "Expected an existing target."), this.store.dispatch(sr(e)), this.dropTargets.delete(e), this.types.delete(e);
  }
  pinSource(e) {
    const r = this.getSource(e);
    g(r, "Expected an existing source."), this.pinnedSourceId = e, this.pinnedSource = r;
  }
  unpinSource() {
    g(this.pinnedSource, "No source is pinned at the time."), this.pinnedSourceId = null, this.pinnedSource = null;
  }
  addHandler(e, r, n) {
    const i = Rr(e);
    return this.types.set(i, r), e === I.SOURCE ? this.dragSources.set(i, n) : e === I.TARGET && this.dropTargets.set(i, n), i;
  }
  constructor(e) {
    this.types = /* @__PURE__ */ new Map(), this.dragSources = /* @__PURE__ */ new Map(), this.dropTargets = /* @__PURE__ */ new Map(), this.pinnedSourceId = null, this.pinnedSource = null, this.store = e;
  }
}
function Mr(t, e = void 0, r = {}, n = !1) {
  const i = kr(n), o = new Or(i, new Ar(i)), a = new Gt(i, o), s = t(a, e, r);
  return a.receiveBackend(s), a;
}
function kr(t) {
  const e = typeof window < "u" && window.__REDUX_DEVTOOLS_EXTENSION__;
  return We(vr, t && e && e({
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
function Lr(t) {
  if (Array.isArray(t))
    return t;
}
function Hr(t, e) {
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
function $r(t, e) {
  return Lr(t) || Hr(t, e) || Ur(t, e) || jr();
}
function Ur(t, e) {
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
var be = 0, L = Symbol.for("__VUE_DND_CONTEXT_INSTANCE__");
function Fr(t) {
  return "manager" in t && t.manager;
}
function Vr(t) {
  if (Fr(t)) {
    var e = t.manager;
    return [
      e,
      !1
    ];
  }
  var r = qr(t.backend, t.context, t.options, t.debugMode), n = !t.context;
  return [
    r,
    n
  ];
}
function qr(t) {
  var e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : Ke(), r = arguments.length > 2 ? arguments[2] : void 0, n = arguments.length > 3 ? arguments[3] : void 0, i = e;
  return i[L] || (i[L] = Mr(t, e, r, n)), i[L];
}
function Ke() {
  return typeof globalThis < "u" ? globalThis : typeof global < "u" ? global : window;
}
const Br = A({
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
    var n = r.slots, i = $r(Vr(e), 2), o = i[0], a = i[1];
    a && ++be, dt(function() {
      if (a) {
        var u = Ke();
        --be === 0 && (u[L] = null);
      }
    }), vt(o);
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
function Gr(t, e) {
  if (!(t instanceof e))
    throw new TypeError("Cannot call a class as a function");
}
var W = !1, Y = !1, Wr = /* @__PURE__ */ function() {
  function t(r) {
    Gr(this, t), this.sourceId = null, this.internalMonitor = r.getMonitor();
  }
  var e = t.prototype;
  return e.receiveHandlerId = function(n) {
    this.sourceId = n;
  }, e.getHandlerId = function() {
    return this.sourceId;
  }, e.canDrag = function() {
    g(!W, "You may not call monitor.canDrag() inside your canDrag() implementation. Read more: http://react-dnd.github.io/react-dnd/docs/api/drag-source-monitor");
    try {
      return W = !0, this.internalMonitor.canDragSource(this.sourceId);
    } finally {
      W = !1;
    }
  }, e.isDragging = function() {
    if (!this.sourceId)
      return !1;
    g(!Y, "You may not call monitor.isDragging() inside your isDragging() implementation. Read more: http://react-dnd.github.io/react-dnd/docs/api/drag-source-monitor");
    try {
      return Y = !0, this.internalMonitor.isDraggingSource(this.sourceId);
    } finally {
      Y = !1;
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
function Yr(t, e) {
  if (!(t instanceof e))
    throw new TypeError("Cannot call a class as a function");
}
var X = !1, Xr = /* @__PURE__ */ function() {
  function t(r) {
    Yr(this, t), this.targetId = null, this.internalMonitor = r.getMonitor();
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
    g(!X, "You may not call monitor.canDrop() inside your canDrop() implementation. Read more: http://react-dnd.github.io/react-dnd/docs/api/drop-target-monitor");
    try {
      return X = !0, this.internalMonitor.canDropOnTarget(this.targetId);
    } finally {
      X = !1;
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
}(), zr = function(t) {
  return t && typeof Symbol < "u" && t.constructor === Symbol ? "symbol" : typeof t;
};
function Qr(t) {
  return t ? t.__v_isVNode === !0 : !1;
}
function Kr(t) {
  return t ? t.__v_skip : !1;
}
function Jr(t) {
  return Qr(t) && zr(t.type) !== "symbol";
}
function Zr() {
  throw new Error("Only native element nodes can now be passed to Vue DnD connectors.You can either wrap Component into a <div>, or turn it into a drag source or a drop target itself.");
}
function en(t) {
  return function() {
    var e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : null, r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null;
    if (Kr(e) && Zr(), !Jr(e)) {
      var n = e;
      return t(n, r), n;
    }
  };
}
function Je(t) {
  var e = {};
  return Object.keys(t).forEach(function(r) {
    var n = t[r];
    if (r.endsWith("Ref"))
      e[r] = t[r];
    else {
      var i = en(n);
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
  const o = Object.keys(t), a = Object.keys(e);
  if (o.length !== a.length)
    return !1;
  const s = Object.prototype.hasOwnProperty.bind(e);
  for (let u = 0; u < o.length; u++) {
    const c = o[u];
    if (!s(c))
      return !1;
    const f = t[c], v = e[c];
    if (i = r ? r.call(n, f, v, c) : void 0, i === !1 || i === void 0 && f !== v)
      return !1;
  }
  return !0;
}
function tn(t, e) {
  if (!(t instanceof e))
    throw new TypeError("Cannot call a class as a function");
}
function Ie(t, e) {
  for (var r = 0; r < e.length; r++) {
    var n = e[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, n.key, n);
  }
}
function rn(t, e, r) {
  return e && Ie(t.prototype, e), r && Ie(t, r), t;
}
var nn = /* @__PURE__ */ function() {
  function t(r) {
    var n = this;
    tn(this, t), this.hooks = Je({
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
  }, rn(t, [
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
function on(t, e) {
  if (!(t instanceof e))
    throw new TypeError("Cannot call a class as a function");
}
function Ee(t, e) {
  for (var r = 0; r < e.length; r++) {
    var n = e[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, n.key, n);
  }
}
function sn(t, e, r) {
  return e && Ee(t.prototype, e), r && Ee(t, r), t;
}
var an = /* @__PURE__ */ function() {
  function t(r) {
    var n = this;
    on(this, t), this.hooks = Je({
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
    return !re(this.lastConnectedDropTargetOptions, this.dropTargetOptions);
  }, e.disconnectDropTarget = function() {
    this.unsubscribeDropTarget && (this.unsubscribeDropTarget(), this.unsubscribeDropTarget = void 0);
  }, e.clearDropTarget = function() {
    this.dropTargetRef = null, this.dropTargetNode = null;
  }, sn(t, [
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
function un(t, e, r) {
  var n = l(r).getRegistry(), i = n.addTarget(l(t), l(e));
  return [
    i,
    function() {
      return n.removeTarget(i);
    }
  ];
}
function cn(t, e, r) {
  var n = r.getRegistry(), i = n.addSource(t, e);
  return [
    i,
    function() {
      return n.removeSource(i);
    }
  ];
}
function ln(t, e) {
  if (!(t instanceof e))
    throw new TypeError("Cannot call a class as a function");
}
var dn = /* @__PURE__ */ function() {
  function t(r, n, i) {
    ln(this, t), this.spec = r, this.monitor = n, this.connector = i;
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
function fn(t, e, r) {
  var n = m(function() {
    return new dn(l(t), l(e), l(r));
  });
  return E(function() {
    n.value.spec = l(t);
  }), n;
}
function N() {
  var t = mt();
  return g(t != null, "Expected drag drop context"), t;
}
function gn(t) {
  return m(function() {
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
function hn(t) {
  if (Array.isArray(t))
    return t;
}
function pn(t, e) {
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
function vn() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function mn(t, e) {
  return hn(t) || pn(t, e) || yn(t, e) || vn();
}
function yn(t, e) {
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
function Dn(t, e, r) {
  var n = N(), i = fn(t, e, r), o = gn(t);
  E(function(s) {
    if (l(o) != null) {
      var u = mn(cn(l(o), l(i), l(n)), 2), c = u[0], f = u[1];
      l(e).receiveHandlerId(c), l(r).receiveHandlerId(c), s(f);
    }
  });
}
function Ze(t) {
  return m(function() {
    return typeof t == "function" ? t() : t;
  });
}
function On() {
  var t = N();
  return m(function() {
    return new Wr(l(t));
  });
}
function Sn(t, e) {
  var r = N(), n = m(function() {
    return new nn(l(r).getBackend());
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
var et = function t(e, r) {
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
  var n = ie(l(e)(l(t))), i = function() {
    var o = l(e)(l(t));
    et(n, o) || (n.value = o, r && r());
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
function bn(t) {
  if (Array.isArray(t))
    return t;
}
function In(t, e) {
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
function En() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function wn(t, e) {
  return bn(t) || In(t, e) || Cn(t, e) || En();
}
function Cn(t, e) {
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
function _n(t, e, r) {
  var n = wn(Tn(t, e, r), 2), i = n[0], o = n[1];
  return E(function(s) {
    var u = l(t).getHandlerId();
    u != null && s(l(t).subscribeToStateChange(o, {
      handlerIds: [
        u
      ]
    }));
  }), i;
}
function tt(t, e, r) {
  var n = function() {
    return {};
  };
  return _n(e, t || n, function() {
    return l(r).reconnect();
  });
}
function fe(t, e) {
  var r = ft({
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
    var a = l(e) || o;
    return et(r.options, a) || he(r, "options", a), l(i);
  };
  return n;
}
function Nn(t, e) {
  return fe(function(r) {
    l(t).hooks.dragSource()(r.el, r.options);
  }, m(function() {
    return l(e).options;
  }));
}
function Pn(t, e) {
  return fe(function(r) {
    l(t).hooks.dragPreview()(r.el, r.options);
  }, m(function() {
    return l(e).previewOptions;
  }));
}
function xn(t) {
  var e = Ze(t), r = On(), n = Sn(m(function() {
    return l(e).options;
  }), m(function() {
    return l(e).previewOptions;
  }));
  return Dn(e, r, n), [
    tt(m(function() {
      return l(e).collect || function() {
        return {};
      };
    }), r, n),
    Nn(n, e),
    Pn(n, e)
  ];
}
function Rn(t) {
  return m(function() {
    var e = l(t).accept;
    return g(e != null, "accept must be defined"), Array.isArray(e) ? e : [
      e
    ];
  });
}
function An(t, e) {
  if (!(t instanceof e))
    throw new TypeError("Cannot call a class as a function");
}
var Mn = /* @__PURE__ */ function() {
  function t(r, n) {
    An(this, t), this.spec = r, this.monitor = n;
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
function kn(t, e) {
  var r = m(function() {
    return new Mn(l(t), l(e));
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
function Ln(t) {
  if (Array.isArray(t))
    return t;
}
function Hn(t, e) {
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
function $n(t, e) {
  return Ln(t) || Hn(t, e) || Un(t, e) || jn();
}
function Un(t, e) {
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
function Fn(t, e, r) {
  var n = N(), i = kn(t, e), o = Rn(t);
  E(function(s) {
    var u = $n(un(o, i, n), 2), c = u[0], f = u[1];
    l(e).receiveHandlerId(c), l(r).receiveHandlerId(c), s(f);
  });
}
function Vn() {
  var t = N();
  return m(function() {
    return new Xr(l(t));
  });
}
function qn(t) {
  var e = N(), r = m(function() {
    return new an(l(e).getBackend());
  });
  return E(function(n) {
    r.value.dropTargetOptions = l(t) || null, r.value.reconnect(), n(function() {
      return r.value.disconnectDropTarget();
    });
  }), r;
}
function Bn(t, e) {
  return fe(function(r) {
    l(t).hooks.dropTarget()(r.el, r.options);
  }, m(function() {
    return l(e).options;
  }));
}
function Gn(t) {
  var e = Ze(t), r = Vn(), n = qn(m(function() {
    return l(e).options;
  }));
  return Fn(e, r, n), [
    tt(m(function() {
      return l(e).collect || function() {
        return {};
      };
    }), r, n),
    Bn(n, e)
  ];
}
function rt(t) {
  let e = null;
  return () => (e == null && (e = t()), e);
}
function Wn(t, e) {
  return t.filter(
    (r) => r !== e
  );
}
function Yn(t, e) {
  const r = /* @__PURE__ */ new Set(), n = (o) => r.add(o);
  t.forEach(n), e.forEach(n);
  const i = [];
  return r.forEach(
    (o) => i.push(o)
  ), i;
}
class Xn {
  enter(e) {
    const r = this.entered.length, n = (i) => this.isNodeInDocument(i) && (!i.contains || i.contains(e));
    return this.entered = Yn(this.entered.filter(n), [
      e
    ]), r === 0 && this.entered.length > 0;
  }
  leave(e) {
    const r = this.entered.length;
    return this.entered = Wn(this.entered.filter(this.isNodeInDocument), e), r > 0 && this.entered.length === 0;
  }
  reset() {
    this.entered = [];
  }
  constructor(e) {
    this.entered = [], this.isNodeInDocument = e;
  }
}
class zn {
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
const nt = "__NATIVE_FILE__", it = "__NATIVE_URL__", ot = "__NATIVE_TEXT__", st = "__NATIVE_HTML__", Ne = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  FILE: nt,
  HTML: st,
  TEXT: ot,
  URL: it
}, Symbol.toStringTag, { value: "Module" }));
function z(t, e, r) {
  const n = e.reduce(
    (i, o) => i || t.getData(o),
    ""
  );
  return n ?? r;
}
const ne = {
  [nt]: {
    exposeProperties: {
      files: (t) => Array.prototype.slice.call(t.files),
      items: (t) => t.items,
      dataTransfer: (t) => t
    },
    matchesTypes: [
      "Files"
    ]
  },
  [st]: {
    exposeProperties: {
      html: (t, e) => z(t, e, ""),
      dataTransfer: (t) => t
    },
    matchesTypes: [
      "Html",
      "text/html"
    ]
  },
  [it]: {
    exposeProperties: {
      urls: (t, e) => z(t, e, "").split(`
`),
      dataTransfer: (t) => t
    },
    matchesTypes: [
      "Url",
      "text/uri-list"
    ]
  },
  [ot]: {
    exposeProperties: {
      text: (t, e) => z(t, e, ""),
      dataTransfer: (t) => t
    },
    matchesTypes: [
      "Text",
      "text/plain"
    ]
  }
};
function Qn(t, e) {
  const r = ne[t];
  if (!r)
    throw new Error(`native type ${t} has no configuration`);
  const n = new zn(r);
  return n.loadDataTransfer(e), n;
}
function Q(t) {
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
const Kn = rt(
  () => /firefox/i.test(navigator.userAgent)
), at = rt(
  () => !!window.safari
);
class Pe {
  interpolate(e) {
    const { xs: r, ys: n, c1s: i, c2s: o, c3s: a } = this;
    let s = r.length - 1;
    if (e === r[s])
      return n[s];
    let u = 0, c = a.length - 1, f;
    for (; u <= c; ) {
      f = Math.floor(0.5 * (u + c));
      const d = r[f];
      if (d < e)
        u = f + 1;
      else if (d > e)
        c = f - 1;
      else
        return n[f];
    }
    s = Math.max(0, c);
    const v = e - r[s], h = v * v;
    return n[s] + i[s] * v + o[s] * h + a[s] * v * h;
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
    const f = [], v = [];
    let h;
    for (let d = 0; d < c.length - 1; d++) {
      h = a[d];
      const y = c[d], p = 1 / o[d], D = y + c[d + 1] - h - h;
      f.push((h - y - D) * p), v.push(D * p * p);
    }
    this.xs = e, this.ys = r, this.c1s = c, this.c2s = f, this.c3s = v;
  }
}
const Jn = 1;
function ut(t) {
  const e = t.nodeType === Jn ? t : t.parentElement;
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
function Zn(t) {
  var e;
  return t.nodeName === "IMG" && (Kn() || !(!((e = document.documentElement) === null || e === void 0) && e.contains(t)));
}
function ei(t, e, r, n) {
  let i = t ? e.width : r, o = t ? e.height : n;
  return at() && t && (o /= window.devicePixelRatio, i /= window.devicePixelRatio), {
    dragPreviewWidth: i,
    dragPreviewHeight: o
  };
}
function ti(t, e, r, n, i) {
  const o = Zn(e), s = ut(o ? t : e), u = {
    x: r.x - s.x,
    y: r.y - s.y
  }, { offsetWidth: c, offsetHeight: f } = t, { anchorX: v, anchorY: h } = n, { dragPreviewWidth: d, dragPreviewHeight: y } = ei(o, e, c, f), p = () => {
    let ge = new Pe([
      0,
      0.5,
      1
    ], [
      // Dock to the top
      u.y,
      // Align at the center
      u.y / f * y,
      // Dock to the bottom
      u.y + y - f
    ]).interpolate(h);
    return at() && o && (ge += (window.devicePixelRatio - 1) * y), ge;
  }, D = () => new Pe([
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
  ]).interpolate(v), { offsetX: S, offsetY: T } = i, w = S === 0 || S, B = T === 0 || T;
  return {
    x: w ? S : D(),
    y: B ? T : p()
  };
}
class ri {
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
function ni(t, e, r) {
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
      ni(t, i, r[i]);
    });
  }
  return t;
}
class ii {
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
    this.clearCurrentDragSourceNode(), this.currentNativeSource = Qn(e, r), this.currentNativeHandle = this.registry.addSource(e, this.currentNativeSource), this.actions.beginDrag([
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
      return o && ut(o) || null;
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
      const { dataTransfer: s } = i, u = Q(s);
      if (this.monitor.isDragging()) {
        if (s && typeof s.setDragImage == "function") {
          const f = this.monitor.getSourceId(), v = this.sourceNodes.get(f), h = this.sourcePreviewNodes.get(f) || v;
          if (h) {
            const { anchorX: d, anchorY: y, offsetX: p, offsetY: D } = this.getCurrentSourcePreviewNodeOptions(), w = ti(v, h, a, {
              anchorX: d,
              anchorY: y
            }, {
              offsetX: p,
              offsetY: D
            });
            s.setDragImage(h, w.x, w.y);
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
      const { dataTransfer: s } = i, u = Q(s);
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
        Q(i.dataTransfer) && i.preventDefault();
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
    }, this.options = new ri(r, n), this.actions = e.getActions(), this.monitor = e.getMonitor(), this.registry = e.getRegistry(), this.enterLeaveCounter = new Xn(this.isNodeInDocument);
  }
}
const oi = function(e, r, n) {
  return new ii(e, r, n);
}, H = /* @__PURE__ */ A({
  __name: "DndProvider",
  setup(t) {
    return (e, r) => (x(), J(l(Br), { backend: l(oi) }, {
      default: Z(() => [
        oe(e.$slots, "default")
      ]),
      _: 3
    }, 8, ["backend"]));
  }
});
H.install = (t) => {
  t.component(H.__name, H);
};
const si = /* @__PURE__ */ A({
  __name: "DraggableItem",
  props: {
    index: null,
    data: null,
    move: null
  },
  setup(t) {
    const e = t;
    console.log("inject('typeName')", P("typeName"));
    const r = P("typeName"), n = P("acceptName");
    console.log("inject('acceptName')", P("acceptName"));
    const [, i] = xn(() => ({
      type: r,
      canDrag: !0,
      item: () => ({ index: e.index, data: e.data }),
      collect: (u) => ({
        isDragging: u.isDragging(),
        handlerId: u.getHandlerId()
      })
    })), [, o] = Gn(() => ({
      accept: n,
      hover: (u, c) => {
        var y;
        if (console.log("hover", u, c), !a.value)
          return;
        const f = u.index, v = e.index;
        if (f === v)
          return;
        const h = (y = a.value) == null ? void 0 : y.getBoundingClientRect(), d = c.getClientOffset();
        console.log("monitor", h, d), e.move(f, v), u.index = v;
      },
      drop: (u, c) => {
        console.log("drop", u, c);
      }
    })), a = ie(), s = (u) => {
      a.value = i(o(u));
    };
    return Ve(
      () => e.index,
      (u, c) => {
        console.log("index", u, c);
      }
    ), (u, c) => (x(), qe("div", {
      class: "draggable-item",
      ref: s,
      key: t.index
    }, [
      oe(u.$slots, "default", {}, void 0, !0)
    ]));
  }
});
const ct = (t, e) => {
  const r = t.__vccOpts || t;
  for (const [n, i] of e)
    r[n] = i;
  return r;
}, ai = /* @__PURE__ */ ct(si, [["__scopeId", "data-v-89ae33fa"]]);
let k;
const ui = new Uint8Array(16);
function ci() {
  if (!k && (k = typeof crypto < "u" && crypto.getRandomValues && crypto.getRandomValues.bind(crypto), !k))
    throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");
  return k(ui);
}
const O = [];
for (let t = 0; t < 256; ++t)
  O.push((t + 256).toString(16).slice(1));
function li(t, e = 0) {
  return (O[t[e + 0]] + O[t[e + 1]] + O[t[e + 2]] + O[t[e + 3]] + "-" + O[t[e + 4]] + O[t[e + 5]] + "-" + O[t[e + 6]] + O[t[e + 7]] + "-" + O[t[e + 8]] + O[t[e + 9]] + "-" + O[t[e + 10]] + O[t[e + 11]] + O[t[e + 12]] + O[t[e + 13]] + O[t[e + 14]] + O[t[e + 15]]).toLowerCase();
}
const di = typeof crypto < "u" && crypto.randomUUID && crypto.randomUUID.bind(crypto), Re = {
  randomUUID: di
};
function fi(t, e, r) {
  if (Re.randomUUID && !e && !t)
    return Re.randomUUID();
  t = t || {};
  const n = t.random || (t.rng || ci)();
  if (n[6] = n[6] & 15 | 64, n[8] = n[8] & 63 | 128, e) {
    r = r || 0;
    for (let i = 0; i < 16; ++i)
      e[r + i] = n[i];
    return e;
  }
  return li(n);
}
var Ae;
const gi = typeof window < "u";
gi && ((Ae = window == null ? void 0 : window.navigator) != null && Ae.userAgent) && /iP(ad|hone|od)/.test(window.navigator.userAgent);
function hi(t) {
  return t;
}
var pi = Object.defineProperty, vi = Object.defineProperties, mi = Object.getOwnPropertyDescriptors, Me = Object.getOwnPropertySymbols, yi = Object.prototype.hasOwnProperty, Di = Object.prototype.propertyIsEnumerable, ke = (t, e, r) => e in t ? pi(t, e, { enumerable: !0, configurable: !0, writable: !0, value: r }) : t[e] = r, Oi = (t, e) => {
  for (var r in e || (e = {}))
    yi.call(e, r) && ke(t, r, e[r]);
  if (Me)
    for (var r of Me(e))
      Di.call(e, r) && ke(t, r, e[r]);
  return t;
}, Si = (t, e) => vi(t, mi(e));
function Ti(t) {
  return JSON.parse(JSON.stringify(t));
}
function bi(t, e = {}) {
  const r = ie({}), {
    manual: n,
    clone: i = Ti,
    deep: o = !0,
    immediate: a = !0
  } = e;
  function s() {
    r.value = i(l(t));
  }
  return !n && Fe(t) ? Ve(t, s, Si(Oi({}, e), {
    deep: o,
    immediate: a
  })) : s(), { cloned: r, sync: s };
}
const Le = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, He = "__vueuse_ssr_handlers__";
Le[He] = Le[He] || {};
var je;
(function(t) {
  t.UP = "UP", t.RIGHT = "RIGHT", t.DOWN = "DOWN", t.LEFT = "LEFT", t.NONE = "NONE";
})(je || (je = {}));
var Ii = Object.defineProperty, $e = Object.getOwnPropertySymbols, Ei = Object.prototype.hasOwnProperty, wi = Object.prototype.propertyIsEnumerable, Ue = (t, e, r) => e in t ? Ii(t, e, { enumerable: !0, configurable: !0, writable: !0, value: r }) : t[e] = r, Ci = (t, e) => {
  for (var r in e || (e = {}))
    Ei.call(e, r) && Ue(t, r, e[r]);
  if ($e)
    for (var r of $e(e))
      wi.call(e, r) && Ue(t, r, e[r]);
  return t;
};
const _i = {
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
Ci({
  linear: hi
}, _i);
const Ni = /* @__PURE__ */ A({
  __name: "Draggable",
  props: {
    name: { default: "drag" },
    dragName: null,
    dropName: null,
    list: null,
    itemKey: { default: "id" }
  },
  emits: ["update:list"],
  setup(t, { emit: e }) {
    const r = t, n = fi(), i = (c) => {
      let f = [];
      return typeof c == "string" ? f.push(c) : Array.isArray(c) ? f = [...c] : f = [n], f;
    }, o = m(() => r.dragName || n), a = m(() => i(r.dropName));
    K("typeName", o.value), K("acceptName", a.value);
    const s = m({
      get() {
        return bi(r.list).cloned.value;
      },
      set(c) {
        e("update:list", c);
      }
    }), u = (c, f) => {
      const h = [...s.value][c];
      s.value.splice(c, 1), s.value.splice(f, 0, h);
    };
    return (c, f) => {
      const v = ai;
      return x(), J(gt, {
        name: "list",
        tag: "div"
      }, {
        default: Z(() => [
          (x(!0), qe(ht, null, pt(l(s), (h, d) => (x(), J(v, {
            key: t.itemKey ? h[t.itemKey] : h,
            move: u,
            index: d,
            data: h
          }, {
            default: Z(() => [
              oe(c.$slots, "item", {
                data: h,
                index: d
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
const j = /* @__PURE__ */ ct(Ni, [["__scopeId", "data-v-57ee5765"]]);
j.install = (t) => {
  t.component(j.__name, j);
};
const Pi = [j, H], xi = (t) => {
  Pi.forEach((e) => {
    t.component(e.__name, e);
  });
}, Ai = {
  install: xi
};
export {
  H as DndProvider,
  Ai as default,
  j as draggable
};
//# sourceMappingURL=index.js.map
