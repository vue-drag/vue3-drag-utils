import { provide as ot, inject as st, defineComponent as x, onUnmounted as at, watchEffect as I, isRef as Le, unref as c, computed as m, ref as ee, reactive as ut, openBlock as N, createBlock as X, withCtx as z, renderSlot as te, watch as He, createElementBlock as $e, TransitionGroup as ct, Fragment as lt, renderList as dt } from "vue";
function le(t, e, r) {
  return Array.isArray(t) ? (t.length = Math.max(t.length, e), t.splice(e, 1, r), r) : (t[e] = r, r);
}
var je = Symbol("DndContextType");
function ft(t) {
  ot(je, t);
}
function gt() {
  return st(je);
}
var b;
(function(t) {
  t.SOURCE = "SOURCE", t.TARGET = "TARGET";
})(b || (b = {}));
function d(t, e, ...r) {
  if (ht() && e === void 0)
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
function ht() {
  return typeof process < "u" && process.env.NODE_ENV === "production";
}
const re = "dnd-core/INIT_COORDS", L = "dnd-core/BEGIN_DRAG", ne = "dnd-core/PUBLISH_DRAG_SOURCE", H = "dnd-core/HOVER", $ = "dnd-core/DROP", j = "dnd-core/END_DRAG";
function de(t, e) {
  return {
    type: re,
    payload: {
      sourceClientOffset: e || null,
      clientOffset: t || null
    }
  };
}
function pt(t, e, r) {
  return e.split(".").reduce(
    (n, i) => n && n[i] ? n[i] : r || null,
    t
  );
}
function vt(t, e) {
  return t.filter(
    (r) => r !== e
  );
}
function Ue(t) {
  return typeof t == "object";
}
function mt(t, e) {
  const r = /* @__PURE__ */ new Map(), n = (o) => {
    r.set(o, r.has(o) ? r.get(o) + 1 : 1);
  };
  t.forEach(n), e.forEach(n);
  const i = [];
  return r.forEach((o, s) => {
    o === 1 && i.push(s);
  }), i;
}
function yt(t, e) {
  return t.filter(
    (r) => e.indexOf(r) > -1
  );
}
const Dt = {
  type: re,
  payload: {
    clientOffset: null,
    sourceClientOffset: null
  }
};
function Ot(t) {
  return function(r = [], n = {
    publishSource: !0
  }) {
    const { publishSource: i = !0, clientOffset: o, getSourceClientOffset: s } = n, a = t.getMonitor(), u = t.getRegistry();
    t.dispatch(de(o)), St(r, a, u);
    const l = It(r, a);
    if (l == null) {
      t.dispatch(Dt);
      return;
    }
    let g = null;
    if (o) {
      if (!s)
        throw new Error("getSourceClientOffset must be defined");
      Tt(s), g = s(l);
    }
    t.dispatch(de(o, g));
    const p = u.getSource(l).beginDrag(a, l);
    if (p == null)
      return;
    bt(p), u.pinSource(l);
    const f = u.getSourceType(l);
    return {
      type: L,
      payload: {
        itemType: f,
        item: p,
        sourceId: l,
        clientOffset: o || null,
        sourceClientOffset: g || null,
        isSourcePublic: !!i
      }
    };
  };
}
function St(t, e, r) {
  d(!e.isDragging(), "Cannot call beginDrag while dragging."), t.forEach(function(n) {
    d(r.getSource(n), "Expected sourceIds to be registered.");
  });
}
function Tt(t) {
  d(typeof t == "function", "When clientOffset is provided, getSourceClientOffset must be a function.");
}
function bt(t) {
  d(Ue(t), "Item must be an object.");
}
function It(t, e) {
  let r = null;
  for (let n = t.length - 1; n >= 0; n--)
    if (e.canDragSource(t[n])) {
      r = t[n];
      break;
    }
  return r;
}
function Et(t) {
  return function() {
    if (t.getMonitor().isDragging())
      return {
        type: ne
      };
  };
}
function Q(t, e) {
  return e === null ? t === null : Array.isArray(t) ? t.some(
    (r) => r === e
  ) : t === e;
}
function wt(t) {
  return function(r, { clientOffset: n } = {}) {
    Ct(r);
    const i = r.slice(0), o = t.getMonitor(), s = t.getRegistry();
    _t(i, o, s);
    const a = o.getItemType();
    return Nt(i, s, a), Pt(i, o, s), {
      type: H,
      payload: {
        targetIds: i,
        clientOffset: n || null
      }
    };
  };
}
function Ct(t) {
  d(Array.isArray(t), "Expected targetIds to be an array.");
}
function _t(t, e, r) {
  d(e.isDragging(), "Cannot call hover while not dragging."), d(!e.didDrop(), "Cannot call hover after drop.");
  for (let n = 0; n < t.length; n++) {
    const i = t[n];
    d(t.lastIndexOf(i) === n, "Expected targetIds to be unique in the passed array.");
    const o = r.getTarget(i);
    d(o, "Expected targetIds to be registered.");
  }
}
function Nt(t, e, r) {
  for (let n = t.length - 1; n >= 0; n--) {
    const i = t[n], o = e.getTargetType(i);
    Q(o, r) || t.splice(n, 1);
  }
}
function Pt(t, e, r) {
  t.forEach(function(n) {
    r.getTarget(n).hover(e, n);
  });
}
function xt(t, e, r) {
  return e in t ? Object.defineProperty(t, e, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : t[e] = r, t;
}
function Rt(t) {
  for (var e = 1; e < arguments.length; e++) {
    var r = arguments[e] != null ? arguments[e] : {}, n = Object.keys(r);
    typeof Object.getOwnPropertySymbols == "function" && (n = n.concat(Object.getOwnPropertySymbols(r).filter(function(i) {
      return Object.getOwnPropertyDescriptor(r, i).enumerable;
    }))), n.forEach(function(i) {
      xt(t, i, r[i]);
    });
  }
  return t;
}
function At(t) {
  return function(r = {}) {
    const n = t.getMonitor(), i = t.getRegistry();
    Mt(n), Ht(n).forEach((s, a) => {
      const u = kt(s, a, i, n), l = {
        type: $,
        payload: {
          dropResult: Rt({}, r, u)
        }
      };
      t.dispatch(l);
    });
  };
}
function Mt(t) {
  d(t.isDragging(), "Cannot call drop while not dragging."), d(!t.didDrop(), "Cannot call drop twice during one drag operation.");
}
function kt(t, e, r, n) {
  const i = r.getTarget(t);
  let o = i ? i.drop(n, t) : void 0;
  return Lt(o), typeof o > "u" && (o = e === 0 ? {} : n.getDropResult()), o;
}
function Lt(t) {
  d(typeof t > "u" || Ue(t), "Drop result must either be an object or undefined.");
}
function Ht(t) {
  const e = t.getTargetIds().filter(t.canDropOnTarget, t);
  return e.reverse(), e;
}
function $t(t) {
  return function() {
    const r = t.getMonitor(), n = t.getRegistry();
    jt(r);
    const i = r.getSourceId();
    return i != null && (n.getSource(i, !0).endDrag(r, i), n.unpinSource()), {
      type: j
    };
  };
}
function jt(t) {
  d(t.isDragging(), "Cannot call endDrag while not dragging.");
}
function Ut(t) {
  return {
    beginDrag: Ot(t),
    publishDragSource: Et(t),
    hover: wt(t),
    drop: At(t),
    endDrag: $t(t)
  };
}
class Ft {
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
function T(t) {
  return "Minified Redux error #" + t + "; visit https://redux.js.org/Errors?code=" + t + " for the full message or use the non-minified dev environment for full errors. ";
}
var fe = function() {
  return typeof Symbol == "function" && Symbol.observable || "@@observable";
}(), V = function() {
  return Math.random().toString(36).substring(7).split("").join(".");
}, ge = {
  INIT: "@@redux/INIT" + V(),
  REPLACE: "@@redux/REPLACE" + V(),
  PROBE_UNKNOWN_ACTION: function() {
    return "@@redux/PROBE_UNKNOWN_ACTION" + V();
  }
};
function Vt(t) {
  if (typeof t != "object" || t === null)
    return !1;
  for (var e = t; Object.getPrototypeOf(e) !== null; )
    e = Object.getPrototypeOf(e);
  return Object.getPrototypeOf(t) === e;
}
function qt(t) {
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
  if (Wt(t))
    return "date";
  if (Gt(t))
    return "error";
  var r = Bt(t);
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
function Bt(t) {
  return typeof t.constructor == "function" ? t.constructor.name : null;
}
function Gt(t) {
  return t instanceof Error || typeof t.message == "string" && t.constructor && typeof t.constructor.stackTraceLimit == "number";
}
function Wt(t) {
  return t instanceof Date ? !0 : typeof t.toDateString == "function" && typeof t.getDate == "function" && typeof t.setDate == "function";
}
function w(t) {
  var e = typeof t;
  return process.env.NODE_ENV !== "production" && (e = qt(t)), e;
}
function Fe(t, e, r) {
  var n;
  if (typeof e == "function" && typeof r == "function" || typeof r == "function" && typeof arguments[3] == "function")
    throw new Error(process.env.NODE_ENV === "production" ? T(0) : "It looks like you are passing several store enhancers to createStore(). This is not supported. Instead, compose them together to a single function. See https://redux.js.org/tutorials/fundamentals/part-4-store#creating-a-store-with-enhancers for an example.");
  if (typeof e == "function" && typeof r > "u" && (r = e, e = void 0), typeof r < "u") {
    if (typeof r != "function")
      throw new Error(process.env.NODE_ENV === "production" ? T(1) : "Expected the enhancer to be a function. Instead, received: '" + w(r) + "'");
    return r(Fe)(t, e);
  }
  if (typeof t != "function")
    throw new Error(process.env.NODE_ENV === "production" ? T(2) : "Expected the root reducer to be a function. Instead, received: '" + w(t) + "'");
  var i = t, o = e, s = [], a = s, u = !1;
  function l() {
    a === s && (a = s.slice());
  }
  function g() {
    if (u)
      throw new Error(process.env.NODE_ENV === "production" ? T(3) : "You may not call store.getState() while the reducer is executing. The reducer has already received the state as an argument. Pass it down from the top reducer instead of reading it from the store.");
    return o;
  }
  function v(h) {
    if (typeof h != "function")
      throw new Error(process.env.NODE_ENV === "production" ? T(4) : "Expected the listener to be a function. Instead, received: '" + w(h) + "'");
    if (u)
      throw new Error(process.env.NODE_ENV === "production" ? T(5) : "You may not call store.subscribe() while the reducer is executing. If you would like to be notified after the store has been updated, subscribe from a component and invoke store.getState() in the callback to access the latest state. See https://redux.js.org/api/store#subscribelistener for more details.");
    var y = !0;
    return l(), a.push(h), function() {
      if (y) {
        if (u)
          throw new Error(process.env.NODE_ENV === "production" ? T(6) : "You may not unsubscribe from a store listener while the reducer is executing. See https://redux.js.org/api/store#subscribelistener for more details.");
        y = !1, l();
        var S = a.indexOf(h);
        a.splice(S, 1), s = null;
      }
    };
  }
  function p(h) {
    if (!Vt(h))
      throw new Error(process.env.NODE_ENV === "production" ? T(7) : "Actions must be plain objects. Instead, the actual type was: '" + w(h) + "'. You may need to add middleware to your store setup to handle dispatching other values, such as 'redux-thunk' to handle dispatching functions. See https://redux.js.org/tutorials/fundamentals/part-4-store#middleware and https://redux.js.org/tutorials/fundamentals/part-6-async-logic#using-the-redux-thunk-middleware for examples.");
    if (typeof h.type > "u")
      throw new Error(process.env.NODE_ENV === "production" ? T(8) : 'Actions may not have an undefined "type" property. You may have misspelled an action type string constant.');
    if (u)
      throw new Error(process.env.NODE_ENV === "production" ? T(9) : "Reducers may not dispatch actions.");
    try {
      u = !0, o = i(o, h);
    } finally {
      u = !1;
    }
    for (var y = s = a, O = 0; O < y.length; O++) {
      var S = y[O];
      S();
    }
    return h;
  }
  function f(h) {
    if (typeof h != "function")
      throw new Error(process.env.NODE_ENV === "production" ? T(10) : "Expected the nextReducer to be a function. Instead, received: '" + w(h));
    i = h, p({
      type: ge.REPLACE
    });
  }
  function D() {
    var h, y = v;
    return h = {
      /**
       * The minimal observable subscription method.
       * @param {Object} observer Any object that can be used as an observer.
       * The observer object should have a `next` method.
       * @returns {subscription} An object with an `unsubscribe` method that can
       * be used to unsubscribe the observable from the store, and prevent further
       * emission of values from the observable.
       */
      subscribe: function(S) {
        if (typeof S != "object" || S === null)
          throw new Error(process.env.NODE_ENV === "production" ? T(11) : "Expected the observer to be an object. Instead, received: '" + w(S) + "'");
        function E() {
          S.next && S.next(g());
        }
        E();
        var F = y(E);
        return {
          unsubscribe: F
        };
      }
    }, h[fe] = function() {
      return this;
    }, h;
  }
  return p({
    type: ge.INIT
  }), n = {
    dispatch: p,
    subscribe: v,
    getState: g,
    replaceReducer: f
  }, n[fe] = D, n;
}
const Yt = (t, e) => t === e;
function Xt(t, e) {
  return !t && !e ? !0 : !t || !e ? !1 : t.x === e.x && t.y === e.y;
}
function zt(t, e, r = Yt) {
  if (t.length !== e.length)
    return !1;
  for (let n = 0; n < t.length; ++n)
    if (!r(t[n], e[n]))
      return !1;
  return !0;
}
function Qt(t, e, r) {
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
      Qt(t, i, r[i]);
    });
  }
  return t;
}
const he = {
  initialSourceClientOffset: null,
  initialClientOffset: null,
  clientOffset: null
};
function Jt(t = he, e) {
  const { payload: r } = e;
  switch (e.type) {
    case re:
    case L:
      return {
        initialSourceClientOffset: r.sourceClientOffset,
        initialClientOffset: r.clientOffset,
        clientOffset: r.clientOffset
      };
    case H:
      return Xt(t.clientOffset, r.clientOffset) ? t : Kt({}, t, {
        clientOffset: r.clientOffset
      });
    case j:
    case $:
      return he;
    default:
      return t;
  }
}
const ie = "dnd-core/ADD_SOURCE", oe = "dnd-core/ADD_TARGET", se = "dnd-core/REMOVE_SOURCE", U = "dnd-core/REMOVE_TARGET";
function Zt(t) {
  return {
    type: ie,
    payload: {
      sourceId: t
    }
  };
}
function er(t) {
  return {
    type: oe,
    payload: {
      targetId: t
    }
  };
}
function tr(t) {
  return {
    type: se,
    payload: {
      sourceId: t
    }
  };
}
function rr(t) {
  return {
    type: U,
    payload: {
      targetId: t
    }
  };
}
function nr(t, e, r) {
  return e in t ? Object.defineProperty(t, e, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : t[e] = r, t;
}
function C(t) {
  for (var e = 1; e < arguments.length; e++) {
    var r = arguments[e] != null ? arguments[e] : {}, n = Object.keys(r);
    typeof Object.getOwnPropertySymbols == "function" && (n = n.concat(Object.getOwnPropertySymbols(r).filter(function(i) {
      return Object.getOwnPropertyDescriptor(r, i).enumerable;
    }))), n.forEach(function(i) {
      nr(t, i, r[i]);
    });
  }
  return t;
}
const ir = {
  itemType: null,
  item: null,
  sourceId: null,
  targetIds: [],
  dropResult: null,
  didDrop: !1,
  isSourcePublic: null
};
function or(t = ir, e) {
  const { payload: r } = e;
  switch (e.type) {
    case L:
      return C({}, t, {
        itemType: r.itemType,
        item: r.item,
        sourceId: r.sourceId,
        isSourcePublic: r.isSourcePublic,
        dropResult: null,
        didDrop: !1
      });
    case ne:
      return C({}, t, {
        isSourcePublic: !0
      });
    case H:
      return C({}, t, {
        targetIds: r.targetIds
      });
    case U:
      return t.targetIds.indexOf(r.targetId) === -1 ? t : C({}, t, {
        targetIds: vt(t.targetIds, r.targetId)
      });
    case $:
      return C({}, t, {
        dropResult: r.dropResult,
        didDrop: !0,
        targetIds: []
      });
    case j:
      return C({}, t, {
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
function sr(t = 0, e) {
  switch (e.type) {
    case ie:
    case oe:
      return t + 1;
    case se:
    case U:
      return t - 1;
    default:
      return t;
  }
}
const P = [], ae = [];
P.__IS_NONE__ = !0;
ae.__IS_ALL__ = !0;
function ar(t, e) {
  return t === P ? !1 : t === ae || typeof e > "u" ? !0 : yt(e, t).length > 0;
}
function ur(t = P, e) {
  switch (e.type) {
    case H:
      break;
    case ie:
    case oe:
    case U:
    case se:
      return P;
    case L:
    case ne:
    case j:
    case $:
    default:
      return ae;
  }
  const { targetIds: r = [], prevTargetIds: n = [] } = e.payload, i = mt(r, n);
  if (!(i.length > 0 || !zt(r, n)))
    return P;
  const s = n[n.length - 1], a = r[r.length - 1];
  return s !== a && (s && i.push(s), a && i.push(a)), i;
}
function cr(t = 0) {
  return t + 1;
}
function lr(t, e, r) {
  return e in t ? Object.defineProperty(t, e, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : t[e] = r, t;
}
function dr(t) {
  for (var e = 1; e < arguments.length; e++) {
    var r = arguments[e] != null ? arguments[e] : {}, n = Object.keys(r);
    typeof Object.getOwnPropertySymbols == "function" && (n = n.concat(Object.getOwnPropertySymbols(r).filter(function(i) {
      return Object.getOwnPropertyDescriptor(r, i).enumerable;
    }))), n.forEach(function(i) {
      lr(t, i, r[i]);
    });
  }
  return t;
}
function fr(t = {}, e) {
  return {
    dirtyHandlerIds: ur(t.dirtyHandlerIds, {
      type: e.type,
      payload: dr({}, e.payload, {
        prevTargetIds: pt(t, "dragOperation.targetIds", [])
      })
    }),
    dragOffset: Jt(t.dragOffset, e),
    refCount: sr(t.refCount, e),
    dragOperation: or(t.dragOperation, e),
    stateId: cr(t.stateId)
  };
}
function gr(t, e) {
  return {
    x: t.x + e.x,
    y: t.y + e.y
  };
}
function Ve(t, e) {
  return {
    x: t.x - e.x,
    y: t.y - e.y
  };
}
function hr(t) {
  const { clientOffset: e, initialClientOffset: r, initialSourceClientOffset: n } = t;
  return !e || !r || !n ? null : Ve(gr(e, n), r);
}
function pr(t) {
  const { clientOffset: e, initialClientOffset: r } = t;
  return !e || !r ? null : Ve(e, r);
}
class vr {
  subscribeToStateChange(e, r = {}) {
    const { handlerIds: n } = r;
    d(typeof e == "function", "listener must be a function."), d(typeof n > "u" || Array.isArray(n), "handlerIds, when specified, must be an array of strings.");
    let i = this.store.getState().stateId;
    const o = () => {
      const s = this.store.getState(), a = s.stateId;
      try {
        a === i || a === i + 1 && !ar(s.dirtyHandlerIds, n) || e();
      } finally {
        i = a;
      }
    };
    return this.store.subscribe(o);
  }
  subscribeToOffsetChange(e) {
    d(typeof e == "function", "listener must be a function.");
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
    return d(r, `Expected to find a valid source. sourceId=${e}`), this.isDragging() ? !1 : r.canDrag(this, e);
  }
  canDropOnTarget(e) {
    if (!e)
      return !1;
    const r = this.registry.getTarget(e);
    if (d(r, `Expected to find a valid target. targetId=${e}`), !this.isDragging() || this.didDrop())
      return !1;
    const n = this.registry.getTargetType(e), i = this.getItemType();
    return Q(n, i) && r.canDrop(this, e);
  }
  isDragging() {
    return !!this.getItemType();
  }
  isDraggingSource(e) {
    if (!e)
      return !1;
    const r = this.registry.getSource(e, !0);
    if (d(r, `Expected to find a valid source. sourceId=${e}`), !this.isDragging() || !this.isSourcePublic())
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
    if (o && !Q(i, o))
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
    return hr(this.store.getState().dragOffset);
  }
  getDifferenceFromInitialOffset() {
    return pr(this.store.getState().dragOffset);
  }
  constructor(e, r) {
    this.store = e, this.registry = r;
  }
}
let mr = 0;
function yr() {
  return mr++;
}
function Dr(t) {
  d(typeof t.canDrag == "function", "Expected canDrag to be a function."), d(typeof t.beginDrag == "function", "Expected beginDrag to be a function."), d(typeof t.endDrag == "function", "Expected endDrag to be a function.");
}
function Or(t) {
  d(typeof t.canDrop == "function", "Expected canDrop to be a function."), d(typeof t.hover == "function", "Expected hover to be a function."), d(typeof t.drop == "function", "Expected beginDrag to be a function.");
}
function K(t, e) {
  if (e && Array.isArray(t)) {
    t.forEach(
      (r) => K(r, !1)
    );
    return;
  }
  d(typeof t == "string" || typeof t == "symbol", e ? "Type can only be a string, a symbol, or an array of either." : "Type can only be a string or a symbol.");
}
const pe = typeof global < "u" ? global : self, qe = pe.MutationObserver || pe.WebKitMutationObserver;
function Be(t) {
  return function() {
    const r = setTimeout(i, 0), n = setInterval(i, 50);
    function i() {
      clearTimeout(r), clearInterval(n), t();
    }
  };
}
function Sr(t) {
  let e = 1;
  const r = new qe(t), n = document.createTextNode("");
  return r.observe(n, {
    characterData: !0
  }), function() {
    e = -e, n.data = e;
  };
}
const Tr = typeof qe == "function" ? (
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
  Be
);
class br {
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
    }, this.requestFlush = Tr(this.flush), this.requestErrorThrow = Be(() => {
      if (this.pendingErrors.length)
        throw this.pendingErrors.shift();
    });
  }
}
class Ir {
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
class Er {
  create(e) {
    const r = this.freeTasks, n = r.length ? r.pop() : new Ir(
      this.onError,
      (i) => r[r.length] = i
    );
    return n.task = e, n;
  }
  constructor(e) {
    this.onError = e, this.freeTasks = [];
  }
}
const Ge = new br(), wr = new Er(Ge.registerPendingError);
function Cr(t) {
  Ge.enqueueTask(wr.create(t));
}
function _r(t) {
  const e = yr().toString();
  switch (t) {
    case b.SOURCE:
      return `S${e}`;
    case b.TARGET:
      return `T${e}`;
    default:
      throw new Error(`Unknown Handler Role: ${t}`);
  }
}
function ve(t) {
  switch (t[0]) {
    case "S":
      return b.SOURCE;
    case "T":
      return b.TARGET;
    default:
      throw new Error(`Cannot parse handler ID: ${t}`);
  }
}
function me(t, e) {
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
class Nr {
  addSource(e, r) {
    K(e), Dr(r);
    const n = this.addHandler(b.SOURCE, e, r);
    return this.store.dispatch(Zt(n)), n;
  }
  addTarget(e, r) {
    K(e, !0), Or(r);
    const n = this.addHandler(b.TARGET, e, r);
    return this.store.dispatch(er(n)), n;
  }
  containsHandler(e) {
    return me(this.dragSources, e) || me(this.dropTargets, e);
  }
  getSource(e, r = !1) {
    return d(this.isSourceId(e), "Expected a valid source ID."), r && e === this.pinnedSourceId ? this.pinnedSource : this.dragSources.get(e);
  }
  getTarget(e) {
    return d(this.isTargetId(e), "Expected a valid target ID."), this.dropTargets.get(e);
  }
  getSourceType(e) {
    return d(this.isSourceId(e), "Expected a valid source ID."), this.types.get(e);
  }
  getTargetType(e) {
    return d(this.isTargetId(e), "Expected a valid target ID."), this.types.get(e);
  }
  isSourceId(e) {
    return ve(e) === b.SOURCE;
  }
  isTargetId(e) {
    return ve(e) === b.TARGET;
  }
  removeSource(e) {
    d(this.getSource(e), "Expected an existing source."), this.store.dispatch(tr(e)), Cr(() => {
      this.dragSources.delete(e), this.types.delete(e);
    });
  }
  removeTarget(e) {
    d(this.getTarget(e), "Expected an existing target."), this.store.dispatch(rr(e)), this.dropTargets.delete(e), this.types.delete(e);
  }
  pinSource(e) {
    const r = this.getSource(e);
    d(r, "Expected an existing source."), this.pinnedSourceId = e, this.pinnedSource = r;
  }
  unpinSource() {
    d(this.pinnedSource, "No source is pinned at the time."), this.pinnedSourceId = null, this.pinnedSource = null;
  }
  addHandler(e, r, n) {
    const i = _r(e);
    return this.types.set(i, r), e === b.SOURCE ? this.dragSources.set(i, n) : e === b.TARGET && this.dropTargets.set(i, n), i;
  }
  constructor(e) {
    this.types = /* @__PURE__ */ new Map(), this.dragSources = /* @__PURE__ */ new Map(), this.dropTargets = /* @__PURE__ */ new Map(), this.pinnedSourceId = null, this.pinnedSource = null, this.store = e;
  }
}
function Pr(t, e = void 0, r = {}, n = !1) {
  const i = xr(n), o = new vr(i, new Nr(i)), s = new Ft(i, o), a = t(s, e, r);
  return s.receiveBackend(a), s;
}
function xr(t) {
  const e = typeof window < "u" && window.__REDUX_DEVTOOLS_EXTENSION__;
  return Fe(fr, t && e && e({
    name: "dnd-core",
    instanceId: "dnd-core"
  }));
}
function ye(t, e) {
  (e == null || e > t.length) && (e = t.length);
  for (var r = 0, n = new Array(e); r < e; r++)
    n[r] = t[r];
  return n;
}
function Rr(t) {
  if (Array.isArray(t))
    return t;
}
function Ar(t, e) {
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
function Mr() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function kr(t, e) {
  return Rr(t) || Ar(t, e) || Lr(t, e) || Mr();
}
function Lr(t, e) {
  if (t) {
    if (typeof t == "string")
      return ye(t, e);
    var r = Object.prototype.toString.call(t).slice(8, -1);
    if (r === "Object" && t.constructor && (r = t.constructor.name), r === "Map" || r === "Set")
      return Array.from(r);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))
      return ye(t, e);
  }
}
var De = 0, A = Symbol.for("__VUE_DND_CONTEXT_INSTANCE__");
function Hr(t) {
  return "manager" in t && t.manager;
}
function $r(t) {
  if (Hr(t)) {
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
  var e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : We(), r = arguments.length > 2 ? arguments[2] : void 0, n = arguments.length > 3 ? arguments[3] : void 0, i = e;
  return i[A] || (i[A] = Pr(t, e, r, n)), i[A];
}
function We() {
  return typeof globalThis < "u" ? globalThis : typeof global < "u" ? global : window;
}
const Ur = x({
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
    var n = r.slots, i = kr($r(e), 2), o = i[0], s = i[1];
    s && ++De, at(function() {
      if (s) {
        var u = We();
        --De === 0 && (u[A] = null);
      }
    }), ft(o);
    var a;
    return function() {
      var u;
      return (a = (u = n.default) === null || u === void 0 ? void 0 : u.call(n)) !== null && a !== void 0 ? a : null;
    };
  }
});
x({
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
    return I(function() {
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
function Fr(t, e) {
  if (!(t instanceof e))
    throw new TypeError("Cannot call a class as a function");
}
var q = !1, B = !1, Vr = /* @__PURE__ */ function() {
  function t(r) {
    Fr(this, t), this.sourceId = null, this.internalMonitor = r.getMonitor();
  }
  var e = t.prototype;
  return e.receiveHandlerId = function(n) {
    this.sourceId = n;
  }, e.getHandlerId = function() {
    return this.sourceId;
  }, e.canDrag = function() {
    d(!q, "You may not call monitor.canDrag() inside your canDrag() implementation. Read more: http://react-dnd.github.io/react-dnd/docs/api/drag-source-monitor");
    try {
      return q = !0, this.internalMonitor.canDragSource(this.sourceId);
    } finally {
      q = !1;
    }
  }, e.isDragging = function() {
    if (!this.sourceId)
      return !1;
    d(!B, "You may not call monitor.isDragging() inside your isDragging() implementation. Read more: http://react-dnd.github.io/react-dnd/docs/api/drag-source-monitor");
    try {
      return B = !0, this.internalMonitor.isDraggingSource(this.sourceId);
    } finally {
      B = !1;
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
function qr(t, e) {
  if (!(t instanceof e))
    throw new TypeError("Cannot call a class as a function");
}
var G = !1, Br = /* @__PURE__ */ function() {
  function t(r) {
    qr(this, t), this.targetId = null, this.internalMonitor = r.getMonitor();
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
    d(!G, "You may not call monitor.canDrop() inside your canDrop() implementation. Read more: http://react-dnd.github.io/react-dnd/docs/api/drop-target-monitor");
    try {
      return G = !0, this.internalMonitor.canDropOnTarget(this.targetId);
    } finally {
      G = !1;
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
function Wr(t) {
  return t ? t.__v_isVNode === !0 : !1;
}
function Yr(t) {
  return t ? t.__v_skip : !1;
}
function Xr(t) {
  return Wr(t) && Gr(t.type) !== "symbol";
}
function zr() {
  throw new Error("Only native element nodes can now be passed to Vue DnD connectors.You can either wrap Component into a <div>, or turn it into a drag source or a drop target itself.");
}
function Qr(t) {
  return function() {
    var e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : null, r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null;
    if (Yr(e) && zr(), !Xr(e)) {
      var n = e;
      return t(n, r), n;
    }
  };
}
function Ye(t) {
  var e = {};
  return Object.keys(t).forEach(function(r) {
    var n = t[r];
    if (r.endsWith("Ref"))
      e[r] = t[r];
    else {
      var i = Qr(n);
      e[r] = function() {
        return i;
      };
    }
  }), e;
}
function J(t, e, r, n) {
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
    const l = o[u];
    if (!a(l))
      return !1;
    const g = t[l], v = e[l];
    if (i = r ? r.call(n, g, v, l) : void 0, i === !1 || i === void 0 && g !== v)
      return !1;
  }
  return !0;
}
function Kr(t, e) {
  if (!(t instanceof e))
    throw new TypeError("Cannot call a class as a function");
}
function Oe(t, e) {
  for (var r = 0; r < e.length; r++) {
    var n = e[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, n.key, n);
  }
}
function Jr(t, e, r) {
  return e && Oe(t.prototype, e), r && Oe(t, r), t;
}
var Zr = /* @__PURE__ */ function() {
  function t(r) {
    var n = this;
    Kr(this, t), this.hooks = Ye({
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
    return !J(this.lastConnectedDragSourceOptions, this.dragSourceOptions);
  }, e.didDragPreviewOptionsChange = function() {
    return !J(this.lastConnectedDragPreviewOptions, this.dragPreviewOptions);
  }, e.disconnectDragSource = function() {
    this.dragSourceUnsubscribe && (this.dragSourceUnsubscribe(), this.dragSourceUnsubscribe = void 0);
  }, e.disconnectDragPreview = function() {
    this.dragPreviewUnsubscribe && (this.dragPreviewUnsubscribe(), this.dragPreviewUnsubscribe = void 0, this.dragPreviewNode = null);
  }, e.clearDragSource = function() {
    this.dragSourceNode = null;
  }, e.clearDragPreview = function() {
    this.dragPreviewNode = null;
  }, Jr(t, [
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
function en(t, e) {
  if (!(t instanceof e))
    throw new TypeError("Cannot call a class as a function");
}
function Se(t, e) {
  for (var r = 0; r < e.length; r++) {
    var n = e[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, n.key, n);
  }
}
function tn(t, e, r) {
  return e && Se(t.prototype, e), r && Se(t, r), t;
}
var rn = /* @__PURE__ */ function() {
  function t(r) {
    var n = this;
    en(this, t), this.hooks = Ye({
      dropTarget: function(i, o) {
        n.clearDropTarget(), n.dropTargetOptions = o, Le(i) ? n.dropTargetRef = i : n.dropTargetNode = i, n.reconnect();
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
    return !J(this.lastConnectedDropTargetOptions, this.dropTargetOptions);
  }, e.disconnectDropTarget = function() {
    this.unsubscribeDropTarget && (this.unsubscribeDropTarget(), this.unsubscribeDropTarget = void 0);
  }, e.clearDropTarget = function() {
    this.dropTargetRef = null, this.dropTargetNode = null;
  }, tn(t, [
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
function nn(t, e, r) {
  var n = c(r).getRegistry(), i = n.addTarget(c(t), c(e));
  return [
    i,
    function() {
      return n.removeTarget(i);
    }
  ];
}
function on(t, e, r) {
  var n = r.getRegistry(), i = n.addSource(t, e);
  return [
    i,
    function() {
      return n.removeSource(i);
    }
  ];
}
function sn(t, e) {
  if (!(t instanceof e))
    throw new TypeError("Cannot call a class as a function");
}
var an = /* @__PURE__ */ function() {
  function t(r, n, i) {
    sn(this, t), this.spec = r, this.monitor = n, this.connector = i;
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
function un(t, e, r) {
  var n = m(function() {
    return new an(c(t), c(e), c(r));
  });
  return I(function() {
    n.value.spec = c(t);
  }), n;
}
function _() {
  var t = gt();
  return d(t != null, "Expected drag drop context"), t;
}
function cn(t) {
  return m(function() {
    var e = c(t).type;
    return d(e != null, "spec.type must be defined"), e;
  });
}
function Te(t, e) {
  (e == null || e > t.length) && (e = t.length);
  for (var r = 0, n = new Array(e); r < e; r++)
    n[r] = t[r];
  return n;
}
function ln(t) {
  if (Array.isArray(t))
    return t;
}
function dn(t, e) {
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
function fn() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function gn(t, e) {
  return ln(t) || dn(t, e) || hn(t, e) || fn();
}
function hn(t, e) {
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
function pn(t, e, r) {
  var n = _(), i = un(t, e, r), o = cn(t);
  I(function(a) {
    if (c(o) != null) {
      var u = gn(on(c(o), c(i), c(n)), 2), l = u[0], g = u[1];
      c(e).receiveHandlerId(l), c(r).receiveHandlerId(l), a(g);
    }
  });
}
function Xe(t) {
  return m(function() {
    return typeof t == "function" ? t() : t;
  });
}
function vn() {
  var t = _();
  return m(function() {
    return new Vr(c(t));
  });
}
function mn(t, e) {
  var r = _(), n = m(function() {
    return new Zr(c(r).getBackend());
  });
  return I(function(i) {
    n.value.dragSourceOptions = c(t) || null, c(n).reconnect(), i(function() {
      n.value.disconnectDragSource();
    });
  }), I(function(i) {
    n.value.dragPreviewOptions = c(e) || null, c(n).reconnect(), i(function() {
      n.value.disconnectDragPreview();
    });
  }), n;
}
var ze = function t(e, r) {
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
function yn(t, e, r) {
  var n = ee(c(e)(c(t))), i = function() {
    var o = c(e)(c(t));
    ze(n, o) || (n.value = o, r && r());
  };
  return I(i), [
    n,
    i
  ];
}
function be(t, e) {
  (e == null || e > t.length) && (e = t.length);
  for (var r = 0, n = new Array(e); r < e; r++)
    n[r] = t[r];
  return n;
}
function Dn(t) {
  if (Array.isArray(t))
    return t;
}
function On(t, e) {
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
function Sn() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function Tn(t, e) {
  return Dn(t) || On(t, e) || bn(t, e) || Sn();
}
function bn(t, e) {
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
function In(t, e, r) {
  var n = Tn(yn(t, e, r), 2), i = n[0], o = n[1];
  return I(function(a) {
    var u = c(t).getHandlerId();
    u != null && a(c(t).subscribeToStateChange(o, {
      handlerIds: [
        u
      ]
    }));
  }), i;
}
function Qe(t, e, r) {
  var n = function() {
    return {};
  };
  return In(e, t || n, function() {
    return c(r).reconnect();
  });
}
function ue(t, e) {
  var r = ut({
    el: null,
    options: c(e)
  });
  I(function() {
    t(r);
  }, {
    flush: "post"
  });
  var n = function(i, o) {
    le(r, "el", i);
    var s = c(e) || o;
    return ze(r.options, s) || le(r, "options", s), c(i);
  };
  return n;
}
function En(t, e) {
  return ue(function(r) {
    c(t).hooks.dragSource()(r.el, r.options);
  }, m(function() {
    return c(e).options;
  }));
}
function wn(t, e) {
  return ue(function(r) {
    c(t).hooks.dragPreview()(r.el, r.options);
  }, m(function() {
    return c(e).previewOptions;
  }));
}
function Cn(t) {
  var e = Xe(t), r = vn(), n = mn(m(function() {
    return c(e).options;
  }), m(function() {
    return c(e).previewOptions;
  }));
  return pn(e, r, n), [
    Qe(m(function() {
      return c(e).collect || function() {
        return {};
      };
    }), r, n),
    En(n, e),
    wn(n, e)
  ];
}
function _n(t) {
  return m(function() {
    var e = c(t).accept;
    return d(e != null, "accept must be defined"), Array.isArray(e) ? e : [
      e
    ];
  });
}
function Nn(t, e) {
  if (!(t instanceof e))
    throw new TypeError("Cannot call a class as a function");
}
var Pn = /* @__PURE__ */ function() {
  function t(r, n) {
    Nn(this, t), this.spec = r, this.monitor = n;
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
function xn(t, e) {
  var r = m(function() {
    return new Pn(c(t), c(e));
  });
  return I(function() {
    r.value.spec = c(t);
  }), r;
}
function Ie(t, e) {
  (e == null || e > t.length) && (e = t.length);
  for (var r = 0, n = new Array(e); r < e; r++)
    n[r] = t[r];
  return n;
}
function Rn(t) {
  if (Array.isArray(t))
    return t;
}
function An(t, e) {
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
function Mn() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function kn(t, e) {
  return Rn(t) || An(t, e) || Ln(t, e) || Mn();
}
function Ln(t, e) {
  if (t) {
    if (typeof t == "string")
      return Ie(t, e);
    var r = Object.prototype.toString.call(t).slice(8, -1);
    if (r === "Object" && t.constructor && (r = t.constructor.name), r === "Map" || r === "Set")
      return Array.from(r);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))
      return Ie(t, e);
  }
}
function Hn(t, e, r) {
  var n = _(), i = xn(t, e), o = _n(t);
  I(function(a) {
    var u = kn(nn(o, i, n), 2), l = u[0], g = u[1];
    c(e).receiveHandlerId(l), c(r).receiveHandlerId(l), a(g);
  });
}
function $n() {
  var t = _();
  return m(function() {
    return new Br(c(t));
  });
}
function jn(t) {
  var e = _(), r = m(function() {
    return new rn(c(e).getBackend());
  });
  return I(function(n) {
    r.value.dropTargetOptions = c(t) || null, r.value.reconnect(), n(function() {
      return r.value.disconnectDropTarget();
    });
  }), r;
}
function Un(t, e) {
  return ue(function(r) {
    c(t).hooks.dropTarget()(r.el, r.options);
  }, m(function() {
    return c(e).options;
  }));
}
function Fn(t) {
  var e = Xe(t), r = $n(), n = jn(m(function() {
    return c(e).options;
  }));
  return Hn(e, r, n), [
    Qe(m(function() {
      return c(e).collect || function() {
        return {};
      };
    }), r, n),
    Un(n, e)
  ];
}
function Ke(t) {
  let e = null;
  return () => (e == null && (e = t()), e);
}
function Vn(t, e) {
  return t.filter(
    (r) => r !== e
  );
}
function qn(t, e) {
  const r = /* @__PURE__ */ new Set(), n = (o) => r.add(o);
  t.forEach(n), e.forEach(n);
  const i = [];
  return r.forEach(
    (o) => i.push(o)
  ), i;
}
class Bn {
  enter(e) {
    const r = this.entered.length, n = (i) => this.isNodeInDocument(i) && (!i.contains || i.contains(e));
    return this.entered = qn(this.entered.filter(n), [
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
const Je = "__NATIVE_FILE__", Ze = "__NATIVE_URL__", et = "__NATIVE_TEXT__", tt = "__NATIVE_HTML__", Ee = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  FILE: Je,
  HTML: tt,
  TEXT: et,
  URL: Ze
}, Symbol.toStringTag, { value: "Module" }));
function W(t, e, r) {
  const n = e.reduce(
    (i, o) => i || t.getData(o),
    ""
  );
  return n ?? r;
}
const Z = {
  [Je]: {
    exposeProperties: {
      files: (t) => Array.prototype.slice.call(t.files),
      items: (t) => t.items,
      dataTransfer: (t) => t
    },
    matchesTypes: [
      "Files"
    ]
  },
  [tt]: {
    exposeProperties: {
      html: (t, e) => W(t, e, ""),
      dataTransfer: (t) => t
    },
    matchesTypes: [
      "Html",
      "text/html"
    ]
  },
  [Ze]: {
    exposeProperties: {
      urls: (t, e) => W(t, e, "").split(`
`),
      dataTransfer: (t) => t
    },
    matchesTypes: [
      "Url",
      "text/uri-list"
    ]
  },
  [et]: {
    exposeProperties: {
      text: (t, e) => W(t, e, ""),
      dataTransfer: (t) => t
    },
    matchesTypes: [
      "Text",
      "text/plain"
    ]
  }
};
function Wn(t, e) {
  const r = Z[t];
  if (!r)
    throw new Error(`native type ${t} has no configuration`);
  const n = new Gn(r);
  return n.loadDataTransfer(e), n;
}
function Y(t) {
  if (!t)
    return null;
  const e = Array.prototype.slice.call(t.types || []);
  return Object.keys(Z).filter((r) => {
    const n = Z[r];
    return n != null && n.matchesTypes ? n.matchesTypes.some(
      (i) => e.indexOf(i) > -1
    ) : !1;
  })[0] || null;
}
const Yn = Ke(
  () => /firefox/i.test(navigator.userAgent)
), rt = Ke(
  () => !!window.safari
);
class we {
  interpolate(e) {
    const { xs: r, ys: n, c1s: i, c2s: o, c3s: s } = this;
    let a = r.length - 1;
    if (e === r[a])
      return n[a];
    let u = 0, l = s.length - 1, g;
    for (; u <= l; ) {
      g = Math.floor(0.5 * (u + l));
      const f = r[g];
      if (f < e)
        u = g + 1;
      else if (f > e)
        l = g - 1;
      else
        return n[g];
    }
    a = Math.max(0, l);
    const v = e - r[a], p = v * v;
    return n[a] + i[a] * v + o[a] * p + s[a] * v * p;
  }
  constructor(e, r) {
    const { length: n } = e, i = [];
    for (let f = 0; f < n; f++)
      i.push(f);
    i.sort(
      (f, D) => e[f] < e[D] ? -1 : 1
    );
    const o = [], s = [];
    let a, u;
    for (let f = 0; f < n - 1; f++)
      a = e[f + 1] - e[f], u = r[f + 1] - r[f], o.push(a), s.push(u / a);
    const l = [
      s[0]
    ];
    for (let f = 0; f < o.length - 1; f++) {
      const D = s[f], h = s[f + 1];
      if (D * h <= 0)
        l.push(0);
      else {
        a = o[f];
        const y = o[f + 1], O = a + y;
        l.push(3 * O / ((O + y) / D + (O + a) / h));
      }
    }
    l.push(s[s.length - 1]);
    const g = [], v = [];
    let p;
    for (let f = 0; f < l.length - 1; f++) {
      p = s[f];
      const D = l[f], h = 1 / o[f], y = D + l[f + 1] - p - p;
      g.push((p - D - y) * h), v.push(y * h * h);
    }
    this.xs = e, this.ys = r, this.c1s = l, this.c2s = g, this.c3s = v;
  }
}
const Xn = 1;
function nt(t) {
  const e = t.nodeType === Xn ? t : t.parentElement;
  if (!e)
    return null;
  const { top: r, left: n } = e.getBoundingClientRect();
  return {
    x: n,
    y: r
  };
}
function R(t) {
  return {
    x: t.clientX,
    y: t.clientY
  };
}
function zn(t) {
  var e;
  return t.nodeName === "IMG" && (Yn() || !(!((e = document.documentElement) === null || e === void 0) && e.contains(t)));
}
function Qn(t, e, r, n) {
  let i = t ? e.width : r, o = t ? e.height : n;
  return rt() && t && (o /= window.devicePixelRatio, i /= window.devicePixelRatio), {
    dragPreviewWidth: i,
    dragPreviewHeight: o
  };
}
function Kn(t, e, r, n, i) {
  const o = zn(e), a = nt(o ? t : e), u = {
    x: r.x - a.x,
    y: r.y - a.y
  }, { offsetWidth: l, offsetHeight: g } = t, { anchorX: v, anchorY: p } = n, { dragPreviewWidth: f, dragPreviewHeight: D } = Qn(o, e, l, g), h = () => {
    let ce = new we([
      0,
      0.5,
      1
    ], [
      // Dock to the top
      u.y,
      // Align at the center
      u.y / g * D,
      // Dock to the bottom
      u.y + D - g
    ]).interpolate(p);
    return rt() && o && (ce += (window.devicePixelRatio - 1) * D), ce;
  }, y = () => new we([
    0,
    0.5,
    1
  ], [
    // Dock to the left
    u.x,
    // Align at the center
    u.x / l * f,
    // Dock to the right
    u.x + f - l
  ]).interpolate(v), { offsetX: O, offsetY: S } = i, E = O === 0 || O, F = S === 0 || S;
  return {
    x: E ? O : y(),
    y: F ? S : h()
  };
}
class Jn {
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
function Zn(t, e, r) {
  return e in t ? Object.defineProperty(t, e, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : t[e] = r, t;
}
function Ce(t) {
  for (var e = 1; e < arguments.length; e++) {
    var r = arguments[e] != null ? arguments[e] : {}, n = Object.keys(r);
    typeof Object.getOwnPropertySymbols == "function" && (n = n.concat(Object.getOwnPropertySymbols(r).filter(function(i) {
      return Object.getOwnPropertyDescriptor(r, i).enumerable;
    }))), n.forEach(function(i) {
      Zn(t, i, r[i]);
    });
  }
  return t;
}
class ei {
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
    return Ce({
      dropEffect: this.altKeyPressed ? "copy" : "move"
    }, r || {});
  }
  getCurrentDropEffect() {
    return this.isDraggingNativeItem() ? "copy" : this.getCurrentSourceNodeOptions().dropEffect;
  }
  getCurrentSourcePreviewNodeOptions() {
    const e = this.monitor.getSourceId(), r = this.sourcePreviewNodeOptions.get(e);
    return Ce({
      anchorX: 0.5,
      anchorY: 0.5,
      captureDraggingState: !1
    }, r || {});
  }
  isDraggingNativeItem() {
    const e = this.monitor.getItemType();
    return Object.keys(Ee).some(
      (r) => Ee[r] === e
    );
  }
  beginDragNativeItem(e, r) {
    this.clearCurrentDragSourceNode(), this.currentNativeSource = Wn(e, r), this.currentNativeHandle = this.registry.addSource(e, this.currentNativeSource), this.actions.beginDrag([
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
      return o && nt(o) || null;
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
      const s = R(i);
      this.monitor.isDragging() && (this.actions.endDrag(), this.cancelHover()), this.actions.beginDrag(o || [], {
        publishSource: !1,
        getSourceClientOffset: this.getSourceClientOffset,
        clientOffset: s
      });
      const { dataTransfer: a } = i, u = Y(a);
      if (this.monitor.isDragging()) {
        if (a && typeof a.setDragImage == "function") {
          const g = this.monitor.getSourceId(), v = this.sourceNodes.get(g), p = this.sourcePreviewNodes.get(g) || v;
          if (p) {
            const { anchorX: f, anchorY: D, offsetX: h, offsetY: y } = this.getCurrentSourcePreviewNodeOptions(), E = Kn(v, p, s, {
              anchorX: f,
              anchorY: D
            }, {
              offsetX: h,
              offsetY: y
            });
            a.setDragImage(p, E.x, E.y);
          }
        }
        try {
          a == null || a.setData("application/json", {});
        } catch {
        }
        this.setCurrentDragSourceNode(i.target);
        const { captureDraggingState: l } = this.getCurrentSourcePreviewNodeOptions();
        l ? this.actions.publishDragSource() : setTimeout(
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
      const { dataTransfer: a } = i, u = Y(a);
      u && this.beginDragNativeItem(u, a);
    }, this.handleTopDragEnter = (i) => {
      const { dragEnterTargetIds: o } = this;
      if (this.dragEnterTargetIds = [], !this.monitor.isDragging())
        return;
      this.altKeyPressed = i.altKey, o.length > 0 && this.actions.hover(o, {
        clientOffset: R(i)
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
      this.altKeyPressed = i.altKey, this.lastClientOffset = R(i), this.scheduleHover(o), (o || []).some(
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
        Y(i.dataTransfer) && i.preventDefault();
      this.enterLeaveCounter.reset();
    }, this.handleTopDrop = (i) => {
      const { dropTargetIds: o } = this;
      this.dropTargetIds = [], this.actions.hover(o, {
        clientOffset: R(i)
      }), this.actions.drop({
        dropEffect: this.getCurrentDropEffect()
      }), this.isDraggingNativeItem() ? this.endDragNativeItem() : this.monitor.isDragging() && this.actions.endDrag(), this.cancelHover();
    }, this.handleSelectStart = (i) => {
      const o = i.target;
      typeof o.dragDrop == "function" && (o.tagName === "INPUT" || o.tagName === "SELECT" || o.tagName === "TEXTAREA" || o.isContentEditable || (i.preventDefault(), o.dragDrop()));
    }, this.options = new Jn(r, n), this.actions = e.getActions(), this.monitor = e.getMonitor(), this.registry = e.getRegistry(), this.enterLeaveCounter = new Bn(this.isNodeInDocument);
  }
}
const ti = function(e, r, n) {
  return new ei(e, r, n);
}, M = /* @__PURE__ */ x({
  __name: "DndProvider",
  setup(t) {
    return (e, r) => (N(), X(c(Ur), { backend: c(ti) }, {
      default: z(() => [
        te(e.$slots, "default")
      ]),
      _: 3
    }, 8, ["backend"]));
  }
});
M.install = (t) => {
  t.component(M.__name, M);
};
const ri = /* @__PURE__ */ x({
  __name: "DraggableItem",
  props: {
    index: null,
    data: null,
    move: null
  },
  setup(t) {
    const e = t, [, r] = Cn(() => ({
      type: "drag",
      canDrag: !0,
      item: () => ({ index: e.index, data: e.data }),
      collect: (s) => ({
        isDragging: s.isDragging(),
        handlerId: s.getHandlerId()
      })
    })), [, n] = Fn(() => ({
      accept: ["drag"],
      hover: (s, a) => {
        var p;
        if (!i.value)
          return;
        const u = s.index, l = e.index;
        if (u === l)
          return;
        const g = (p = i.value) == null ? void 0 : p.getBoundingClientRect(), v = a.getClientOffset();
        console.log("monitor", g, v), e.move(u, l), s.index = l;
      }
    })), i = ee(), o = (s) => {
      i.value = r(n(s));
    };
    return He(
      () => e.index,
      (s, a) => {
        console.log("index", s, a);
      }
    ), (s, a) => (N(), $e("div", {
      ref: o,
      key: t.index
    }, [
      te(s.$slots, "default")
    ]));
  }
});
var _e;
const ni = typeof window < "u";
ni && ((_e = window == null ? void 0 : window.navigator) != null && _e.userAgent) && /iP(ad|hone|od)/.test(window.navigator.userAgent);
function ii(t) {
  return t;
}
var oi = Object.defineProperty, si = Object.defineProperties, ai = Object.getOwnPropertyDescriptors, Ne = Object.getOwnPropertySymbols, ui = Object.prototype.hasOwnProperty, ci = Object.prototype.propertyIsEnumerable, Pe = (t, e, r) => e in t ? oi(t, e, { enumerable: !0, configurable: !0, writable: !0, value: r }) : t[e] = r, li = (t, e) => {
  for (var r in e || (e = {}))
    ui.call(e, r) && Pe(t, r, e[r]);
  if (Ne)
    for (var r of Ne(e))
      ci.call(e, r) && Pe(t, r, e[r]);
  return t;
}, di = (t, e) => si(t, ai(e));
function fi(t) {
  return JSON.parse(JSON.stringify(t));
}
function gi(t, e = {}) {
  const r = ee({}), {
    manual: n,
    clone: i = fi,
    deep: o = !0,
    immediate: s = !0
  } = e;
  function a() {
    r.value = i(c(t));
  }
  return !n && Le(t) ? He(t, a, di(li({}, e), {
    deep: o,
    immediate: s
  })) : a(), { cloned: r, sync: a };
}
const xe = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, Re = "__vueuse_ssr_handlers__";
xe[Re] = xe[Re] || {};
var Ae;
(function(t) {
  t.UP = "UP", t.RIGHT = "RIGHT", t.DOWN = "DOWN", t.LEFT = "LEFT", t.NONE = "NONE";
})(Ae || (Ae = {}));
var hi = Object.defineProperty, Me = Object.getOwnPropertySymbols, pi = Object.prototype.hasOwnProperty, vi = Object.prototype.propertyIsEnumerable, ke = (t, e, r) => e in t ? hi(t, e, { enumerable: !0, configurable: !0, writable: !0, value: r }) : t[e] = r, mi = (t, e) => {
  for (var r in e || (e = {}))
    pi.call(e, r) && ke(t, r, e[r]);
  if (Me)
    for (var r of Me(e))
      vi.call(e, r) && ke(t, r, e[r]);
  return t;
};
const yi = {
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
mi({
  linear: ii
}, yi);
const Di = /* @__PURE__ */ x({
  __name: "Draggable",
  props: {
    name: { default: "drag" },
    list: null,
    itemKey: { default: "id" }
  },
  emits: ["update:list"],
  setup(t, { emit: e }) {
    const r = t, n = m({
      get() {
        return gi(r.list).cloned.value;
      },
      set(o) {
        console.log("dragList", o), e("update:list", o);
      }
    }), i = (o, s) => {
      const u = [...n.value][o];
      n.value.splice(o, 1), n.value.splice(s, 0, u);
    };
    return (o, s) => {
      const a = ri;
      return N(), X(ct, {
        name: "list",
        tag: "div"
      }, {
        default: z(() => [
          (N(!0), $e(lt, null, dt(c(n), (u, l) => (N(), X(a, {
            key: t.itemKey ? u[t.itemKey] : u,
            move: i,
            index: l,
            data: u
          }, {
            default: z(() => [
              te(o.$slots, "item", {
                data: u,
                index: l
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
const Oi = (t, e) => {
  const r = t.__vccOpts || t;
  for (const [n, i] of e)
    r[n] = i;
  return r;
}, k = /* @__PURE__ */ Oi(Di, [["__scopeId", "data-v-a12ad917"]]);
k.install = (t) => {
  t.component(k.__name, k);
};
const Si = [k, M], Ti = (t) => {
  Si.forEach((e) => {
    t.component(e.__name, e);
  });
}, Ii = {
  install: Ti
};
export {
  Ii as default,
  k as draggable
};
