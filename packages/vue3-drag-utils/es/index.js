import { provide as Ue, inject as $e, defineComponent as A, onUnmounted as Ve, watchEffect as E, computed as T, unref as f, ref as Fe, reactive as qe, openBlock as De, createBlock as Ge, withCtx as Be, renderSlot as Se, createElementBlock as Ye, pushScopeId as We, popScopeId as Xe, createElementVNode as ze } from "vue";
function re(t, e, r) {
  return Array.isArray(t) ? (t.length = Math.max(t.length, e), t.splice(e, 1, r), r) : (t[e] = r, r);
}
var Oe = Symbol("DndContextType");
function Qe(t) {
  Ue(Oe, t);
}
function Ke() {
  return $e(Oe);
}
var b;
(function(t) {
  t.SOURCE = "SOURCE", t.TARGET = "TARGET";
})(b || (b = {}));
function d(t, e, ...r) {
  if (Je() && e === void 0)
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
function Je() {
  return typeof process < "u" && process.env.NODE_ENV === "production";
}
const X = "dnd-core/INIT_COORDS", M = "dnd-core/BEGIN_DRAG", z = "dnd-core/PUBLISH_DRAG_SOURCE", L = "dnd-core/HOVER", k = "dnd-core/DROP", H = "dnd-core/END_DRAG";
function ne(t, e) {
  return {
    type: X,
    payload: {
      sourceClientOffset: e || null,
      clientOffset: t || null
    }
  };
}
function Ze(t, e, r) {
  return e.split(".").reduce(
    (n, i) => n && n[i] ? n[i] : r || null,
    t
  );
}
function et(t, e) {
  return t.filter(
    (r) => r !== e
  );
}
function be(t) {
  return typeof t == "object";
}
function tt(t, e) {
  const r = /* @__PURE__ */ new Map(), n = (o) => {
    r.set(o, r.has(o) ? r.get(o) + 1 : 1);
  };
  t.forEach(n), e.forEach(n);
  const i = [];
  return r.forEach((o, s) => {
    o === 1 && i.push(s);
  }), i;
}
function rt(t, e) {
  return t.filter(
    (r) => e.indexOf(r) > -1
  );
}
const nt = {
  type: X,
  payload: {
    clientOffset: null,
    sourceClientOffset: null
  }
};
function it(t) {
  return function(r = [], n = {
    publishSource: !0
  }) {
    const { publishSource: i = !0, clientOffset: o, getSourceClientOffset: s } = n, a = t.getMonitor(), u = t.getRegistry();
    t.dispatch(ne(o)), ot(r, a, u);
    const c = ut(r, a);
    if (c == null) {
      t.dispatch(nt);
      return;
    }
    let h = null;
    if (o) {
      if (!s)
        throw new Error("getSourceClientOffset must be defined");
      st(s), h = s(c);
    }
    t.dispatch(ne(o, h));
    const p = u.getSource(c).beginDrag(a, c);
    if (p == null)
      return;
    at(p), u.pinSource(c);
    const l = u.getSourceType(c);
    return {
      type: M,
      payload: {
        itemType: l,
        item: p,
        sourceId: c,
        clientOffset: o || null,
        sourceClientOffset: h || null,
        isSourcePublic: !!i
      }
    };
  };
}
function ot(t, e, r) {
  d(!e.isDragging(), "Cannot call beginDrag while dragging."), t.forEach(function(n) {
    d(r.getSource(n), "Expected sourceIds to be registered.");
  });
}
function st(t) {
  d(typeof t == "function", "When clientOffset is provided, getSourceClientOffset must be a function.");
}
function at(t) {
  d(be(t), "Item must be an object.");
}
function ut(t, e) {
  let r = null;
  for (let n = t.length - 1; n >= 0; n--)
    if (e.canDragSource(t[n])) {
      r = t[n];
      break;
    }
  return r;
}
function ct(t) {
  return function() {
    if (t.getMonitor().isDragging())
      return {
        type: z
      };
  };
}
function B(t, e) {
  return e === null ? t === null : Array.isArray(t) ? t.some(
    (r) => r === e
  ) : t === e;
}
function lt(t) {
  return function(r, { clientOffset: n } = {}) {
    dt(r);
    const i = r.slice(0), o = t.getMonitor(), s = t.getRegistry();
    ft(i, o, s);
    const a = o.getItemType();
    return gt(i, s, a), ht(i, o, s), {
      type: L,
      payload: {
        targetIds: i,
        clientOffset: n || null
      }
    };
  };
}
function dt(t) {
  d(Array.isArray(t), "Expected targetIds to be an array.");
}
function ft(t, e, r) {
  d(e.isDragging(), "Cannot call hover while not dragging."), d(!e.didDrop(), "Cannot call hover after drop.");
  for (let n = 0; n < t.length; n++) {
    const i = t[n];
    d(t.lastIndexOf(i) === n, "Expected targetIds to be unique in the passed array.");
    const o = r.getTarget(i);
    d(o, "Expected targetIds to be registered.");
  }
}
function gt(t, e, r) {
  for (let n = t.length - 1; n >= 0; n--) {
    const i = t[n], o = e.getTargetType(i);
    B(o, r) || t.splice(n, 1);
  }
}
function ht(t, e, r) {
  t.forEach(function(n) {
    r.getTarget(n).hover(e, n);
  });
}
function pt(t, e, r) {
  return e in t ? Object.defineProperty(t, e, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : t[e] = r, t;
}
function vt(t) {
  for (var e = 1; e < arguments.length; e++) {
    var r = arguments[e] != null ? arguments[e] : {}, n = Object.keys(r);
    typeof Object.getOwnPropertySymbols == "function" && (n = n.concat(Object.getOwnPropertySymbols(r).filter(function(i) {
      return Object.getOwnPropertyDescriptor(r, i).enumerable;
    }))), n.forEach(function(i) {
      pt(t, i, r[i]);
    });
  }
  return t;
}
function mt(t) {
  return function(r = {}) {
    const n = t.getMonitor(), i = t.getRegistry();
    yt(n), Ot(n).forEach((s, a) => {
      const u = Dt(s, a, i, n), c = {
        type: k,
        payload: {
          dropResult: vt({}, r, u)
        }
      };
      t.dispatch(c);
    });
  };
}
function yt(t) {
  d(t.isDragging(), "Cannot call drop while not dragging."), d(!t.didDrop(), "Cannot call drop twice during one drag operation.");
}
function Dt(t, e, r, n) {
  const i = r.getTarget(t);
  let o = i ? i.drop(n, t) : void 0;
  return St(o), typeof o > "u" && (o = e === 0 ? {} : n.getDropResult()), o;
}
function St(t) {
  d(typeof t > "u" || be(t), "Drop result must either be an object or undefined.");
}
function Ot(t) {
  const e = t.getTargetIds().filter(t.canDropOnTarget, t);
  return e.reverse(), e;
}
function bt(t) {
  return function() {
    const r = t.getMonitor(), n = t.getRegistry();
    Tt(r);
    const i = r.getSourceId();
    return i != null && (n.getSource(i, !0).endDrag(r, i), n.unpinSource()), {
      type: H
    };
  };
}
function Tt(t) {
  d(t.isDragging(), "Cannot call endDrag while not dragging.");
}
function Et(t) {
  return {
    beginDrag: it(t),
    publishDragSource: ct(t),
    hover: lt(t),
    drop: mt(t),
    endDrag: bt(t)
  };
}
class It {
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
    const i = Et(this);
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
function O(t) {
  return "Minified Redux error #" + t + "; visit https://redux.js.org/Errors?code=" + t + " for the full message or use the non-minified dev environment for full errors. ";
}
var ie = function() {
  return typeof Symbol == "function" && Symbol.observable || "@@observable";
}(), $ = function() {
  return Math.random().toString(36).substring(7).split("").join(".");
}, oe = {
  INIT: "@@redux/INIT" + $(),
  REPLACE: "@@redux/REPLACE" + $(),
  PROBE_UNKNOWN_ACTION: function() {
    return "@@redux/PROBE_UNKNOWN_ACTION" + $();
  }
};
function wt(t) {
  if (typeof t != "object" || t === null)
    return !1;
  for (var e = t; Object.getPrototypeOf(e) !== null; )
    e = Object.getPrototypeOf(e);
  return Object.getPrototypeOf(t) === e;
}
function Ct(t) {
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
  if (Pt(t))
    return "date";
  if (Nt(t))
    return "error";
  var r = _t(t);
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
function _t(t) {
  return typeof t.constructor == "function" ? t.constructor.name : null;
}
function Nt(t) {
  return t instanceof Error || typeof t.message == "string" && t.constructor && typeof t.constructor.stackTraceLimit == "number";
}
function Pt(t) {
  return t instanceof Date ? !0 : typeof t.toDateString == "function" && typeof t.getDate == "function" && typeof t.setDate == "function";
}
function w(t) {
  var e = typeof t;
  return process.env.NODE_ENV !== "production" && (e = Ct(t)), e;
}
function Te(t, e, r) {
  var n;
  if (typeof e == "function" && typeof r == "function" || typeof r == "function" && typeof arguments[3] == "function")
    throw new Error(process.env.NODE_ENV === "production" ? O(0) : "It looks like you are passing several store enhancers to createStore(). This is not supported. Instead, compose them together to a single function. See https://redux.js.org/tutorials/fundamentals/part-4-store#creating-a-store-with-enhancers for an example.");
  if (typeof e == "function" && typeof r > "u" && (r = e, e = void 0), typeof r < "u") {
    if (typeof r != "function")
      throw new Error(process.env.NODE_ENV === "production" ? O(1) : "Expected the enhancer to be a function. Instead, received: '" + w(r) + "'");
    return r(Te)(t, e);
  }
  if (typeof t != "function")
    throw new Error(process.env.NODE_ENV === "production" ? O(2) : "Expected the root reducer to be a function. Instead, received: '" + w(t) + "'");
  var i = t, o = e, s = [], a = s, u = !1;
  function c() {
    a === s && (a = s.slice());
  }
  function h() {
    if (u)
      throw new Error(process.env.NODE_ENV === "production" ? O(3) : "You may not call store.getState() while the reducer is executing. The reducer has already received the state as an argument. Pass it down from the top reducer instead of reading it from the store.");
    return o;
  }
  function v(g) {
    if (typeof g != "function")
      throw new Error(process.env.NODE_ENV === "production" ? O(4) : "Expected the listener to be a function. Instead, received: '" + w(g) + "'");
    if (u)
      throw new Error(process.env.NODE_ENV === "production" ? O(5) : "You may not call store.subscribe() while the reducer is executing. If you would like to be notified after the store has been updated, subscribe from a component and invoke store.getState() in the callback to access the latest state. See https://redux.js.org/api/store#subscribelistener for more details.");
    var m = !0;
    return c(), a.push(g), function() {
      if (m) {
        if (u)
          throw new Error(process.env.NODE_ENV === "production" ? O(6) : "You may not unsubscribe from a store listener while the reducer is executing. See https://redux.js.org/api/store#subscribelistener for more details.");
        m = !1, c();
        var S = a.indexOf(g);
        a.splice(S, 1), s = null;
      }
    };
  }
  function p(g) {
    if (!wt(g))
      throw new Error(process.env.NODE_ENV === "production" ? O(7) : "Actions must be plain objects. Instead, the actual type was: '" + w(g) + "'. You may need to add middleware to your store setup to handle dispatching other values, such as 'redux-thunk' to handle dispatching functions. See https://redux.js.org/tutorials/fundamentals/part-4-store#middleware and https://redux.js.org/tutorials/fundamentals/part-6-async-logic#using-the-redux-thunk-middleware for examples.");
    if (typeof g.type > "u")
      throw new Error(process.env.NODE_ENV === "production" ? O(8) : 'Actions may not have an undefined "type" property. You may have misspelled an action type string constant.');
    if (u)
      throw new Error(process.env.NODE_ENV === "production" ? O(9) : "Reducers may not dispatch actions.");
    try {
      u = !0, o = i(o, g);
    } finally {
      u = !1;
    }
    for (var m = s = a, D = 0; D < m.length; D++) {
      var S = m[D];
      S();
    }
    return g;
  }
  function l(g) {
    if (typeof g != "function")
      throw new Error(process.env.NODE_ENV === "production" ? O(10) : "Expected the nextReducer to be a function. Instead, received: '" + w(g));
    i = g, p({
      type: oe.REPLACE
    });
  }
  function y() {
    var g, m = v;
    return g = {
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
          throw new Error(process.env.NODE_ENV === "production" ? O(11) : "Expected the observer to be an object. Instead, received: '" + w(S) + "'");
        function I() {
          S.next && S.next(h());
        }
        I();
        var U = m(I);
        return {
          unsubscribe: U
        };
      }
    }, g[ie] = function() {
      return this;
    }, g;
  }
  return p({
    type: oe.INIT
  }), n = {
    dispatch: p,
    subscribe: v,
    getState: h,
    replaceReducer: l
  }, n[ie] = y, n;
}
const xt = (t, e) => t === e;
function Rt(t, e) {
  return !t && !e ? !0 : !t || !e ? !1 : t.x === e.x && t.y === e.y;
}
function At(t, e, r = xt) {
  if (t.length !== e.length)
    return !1;
  for (let n = 0; n < t.length; ++n)
    if (!r(t[n], e[n]))
      return !1;
  return !0;
}
function Mt(t, e, r) {
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
      Mt(t, i, r[i]);
    });
  }
  return t;
}
const se = {
  initialSourceClientOffset: null,
  initialClientOffset: null,
  clientOffset: null
};
function kt(t = se, e) {
  const { payload: r } = e;
  switch (e.type) {
    case X:
    case M:
      return {
        initialSourceClientOffset: r.sourceClientOffset,
        initialClientOffset: r.clientOffset,
        clientOffset: r.clientOffset
      };
    case L:
      return Rt(t.clientOffset, r.clientOffset) ? t : Lt({}, t, {
        clientOffset: r.clientOffset
      });
    case H:
    case k:
      return se;
    default:
      return t;
  }
}
const Q = "dnd-core/ADD_SOURCE", K = "dnd-core/ADD_TARGET", J = "dnd-core/REMOVE_SOURCE", j = "dnd-core/REMOVE_TARGET";
function Ht(t) {
  return {
    type: Q,
    payload: {
      sourceId: t
    }
  };
}
function jt(t) {
  return {
    type: K,
    payload: {
      targetId: t
    }
  };
}
function Ut(t) {
  return {
    type: J,
    payload: {
      sourceId: t
    }
  };
}
function $t(t) {
  return {
    type: j,
    payload: {
      targetId: t
    }
  };
}
function Vt(t, e, r) {
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
      Vt(t, i, r[i]);
    });
  }
  return t;
}
const Ft = {
  itemType: null,
  item: null,
  sourceId: null,
  targetIds: [],
  dropResult: null,
  didDrop: !1,
  isSourcePublic: null
};
function qt(t = Ft, e) {
  const { payload: r } = e;
  switch (e.type) {
    case M:
      return C({}, t, {
        itemType: r.itemType,
        item: r.item,
        sourceId: r.sourceId,
        isSourcePublic: r.isSourcePublic,
        dropResult: null,
        didDrop: !1
      });
    case z:
      return C({}, t, {
        isSourcePublic: !0
      });
    case L:
      return C({}, t, {
        targetIds: r.targetIds
      });
    case j:
      return t.targetIds.indexOf(r.targetId) === -1 ? t : C({}, t, {
        targetIds: et(t.targetIds, r.targetId)
      });
    case k:
      return C({}, t, {
        dropResult: r.dropResult,
        didDrop: !0,
        targetIds: []
      });
    case H:
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
function Gt(t = 0, e) {
  switch (e.type) {
    case Q:
    case K:
      return t + 1;
    case J:
    case j:
      return t - 1;
    default:
      return t;
  }
}
const _ = [], Z = [];
_.__IS_NONE__ = !0;
Z.__IS_ALL__ = !0;
function Bt(t, e) {
  return t === _ ? !1 : t === Z || typeof e > "u" ? !0 : rt(e, t).length > 0;
}
function Yt(t = _, e) {
  switch (e.type) {
    case L:
      break;
    case Q:
    case K:
    case j:
    case J:
      return _;
    case M:
    case z:
    case H:
    case k:
    default:
      return Z;
  }
  const { targetIds: r = [], prevTargetIds: n = [] } = e.payload, i = tt(r, n);
  if (!(i.length > 0 || !At(r, n)))
    return _;
  const s = n[n.length - 1], a = r[r.length - 1];
  return s !== a && (s && i.push(s), a && i.push(a)), i;
}
function Wt(t = 0) {
  return t + 1;
}
function Xt(t, e, r) {
  return e in t ? Object.defineProperty(t, e, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : t[e] = r, t;
}
function zt(t) {
  for (var e = 1; e < arguments.length; e++) {
    var r = arguments[e] != null ? arguments[e] : {}, n = Object.keys(r);
    typeof Object.getOwnPropertySymbols == "function" && (n = n.concat(Object.getOwnPropertySymbols(r).filter(function(i) {
      return Object.getOwnPropertyDescriptor(r, i).enumerable;
    }))), n.forEach(function(i) {
      Xt(t, i, r[i]);
    });
  }
  return t;
}
function Qt(t = {}, e) {
  return {
    dirtyHandlerIds: Yt(t.dirtyHandlerIds, {
      type: e.type,
      payload: zt({}, e.payload, {
        prevTargetIds: Ze(t, "dragOperation.targetIds", [])
      })
    }),
    dragOffset: kt(t.dragOffset, e),
    refCount: Gt(t.refCount, e),
    dragOperation: qt(t.dragOperation, e),
    stateId: Wt(t.stateId)
  };
}
function Kt(t, e) {
  return {
    x: t.x + e.x,
    y: t.y + e.y
  };
}
function Ee(t, e) {
  return {
    x: t.x - e.x,
    y: t.y - e.y
  };
}
function Jt(t) {
  const { clientOffset: e, initialClientOffset: r, initialSourceClientOffset: n } = t;
  return !e || !r || !n ? null : Ee(Kt(e, n), r);
}
function Zt(t) {
  const { clientOffset: e, initialClientOffset: r } = t;
  return !e || !r ? null : Ee(e, r);
}
class er {
  subscribeToStateChange(e, r = {}) {
    const { handlerIds: n } = r;
    d(typeof e == "function", "listener must be a function."), d(typeof n > "u" || Array.isArray(n), "handlerIds, when specified, must be an array of strings.");
    let i = this.store.getState().stateId;
    const o = () => {
      const s = this.store.getState(), a = s.stateId;
      try {
        a === i || a === i + 1 && !Bt(s.dirtyHandlerIds, n) || e();
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
    return B(n, i) && r.canDrop(this, e);
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
    if (o && !B(i, o))
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
    return Jt(this.store.getState().dragOffset);
  }
  getDifferenceFromInitialOffset() {
    return Zt(this.store.getState().dragOffset);
  }
  constructor(e, r) {
    this.store = e, this.registry = r;
  }
}
let tr = 0;
function rr() {
  return tr++;
}
function nr(t) {
  d(typeof t.canDrag == "function", "Expected canDrag to be a function."), d(typeof t.beginDrag == "function", "Expected beginDrag to be a function."), d(typeof t.endDrag == "function", "Expected endDrag to be a function.");
}
function ir(t) {
  d(typeof t.canDrop == "function", "Expected canDrop to be a function."), d(typeof t.hover == "function", "Expected hover to be a function."), d(typeof t.drop == "function", "Expected beginDrag to be a function.");
}
function Y(t, e) {
  if (e && Array.isArray(t)) {
    t.forEach(
      (r) => Y(r, !1)
    );
    return;
  }
  d(typeof t == "string" || typeof t == "symbol", e ? "Type can only be a string, a symbol, or an array of either." : "Type can only be a string or a symbol.");
}
const ae = typeof global < "u" ? global : self, Ie = ae.MutationObserver || ae.WebKitMutationObserver;
function we(t) {
  return function() {
    const r = setTimeout(i, 0), n = setInterval(i, 50);
    function i() {
      clearTimeout(r), clearInterval(n), t();
    }
  };
}
function or(t) {
  let e = 1;
  const r = new Ie(t), n = document.createTextNode("");
  return r.observe(n, {
    characterData: !0
  }), function() {
    e = -e, n.data = e;
  };
}
const sr = typeof Ie == "function" ? (
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
  or
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
  we
);
class ar {
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
    }, this.requestFlush = sr(this.flush), this.requestErrorThrow = we(() => {
      if (this.pendingErrors.length)
        throw this.pendingErrors.shift();
    });
  }
}
class ur {
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
class cr {
  create(e) {
    const r = this.freeTasks, n = r.length ? r.pop() : new ur(
      this.onError,
      (i) => r[r.length] = i
    );
    return n.task = e, n;
  }
  constructor(e) {
    this.onError = e, this.freeTasks = [];
  }
}
const Ce = new ar(), lr = new cr(Ce.registerPendingError);
function dr(t) {
  Ce.enqueueTask(lr.create(t));
}
function fr(t) {
  const e = rr().toString();
  switch (t) {
    case b.SOURCE:
      return `S${e}`;
    case b.TARGET:
      return `T${e}`;
    default:
      throw new Error(`Unknown Handler Role: ${t}`);
  }
}
function ue(t) {
  switch (t[0]) {
    case "S":
      return b.SOURCE;
    case "T":
      return b.TARGET;
    default:
      throw new Error(`Cannot parse handler ID: ${t}`);
  }
}
function ce(t, e) {
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
class gr {
  addSource(e, r) {
    Y(e), nr(r);
    const n = this.addHandler(b.SOURCE, e, r);
    return this.store.dispatch(Ht(n)), n;
  }
  addTarget(e, r) {
    Y(e, !0), ir(r);
    const n = this.addHandler(b.TARGET, e, r);
    return this.store.dispatch(jt(n)), n;
  }
  containsHandler(e) {
    return ce(this.dragSources, e) || ce(this.dropTargets, e);
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
    return ue(e) === b.SOURCE;
  }
  isTargetId(e) {
    return ue(e) === b.TARGET;
  }
  removeSource(e) {
    d(this.getSource(e), "Expected an existing source."), this.store.dispatch(Ut(e)), dr(() => {
      this.dragSources.delete(e), this.types.delete(e);
    });
  }
  removeTarget(e) {
    d(this.getTarget(e), "Expected an existing target."), this.store.dispatch($t(e)), this.dropTargets.delete(e), this.types.delete(e);
  }
  pinSource(e) {
    const r = this.getSource(e);
    d(r, "Expected an existing source."), this.pinnedSourceId = e, this.pinnedSource = r;
  }
  unpinSource() {
    d(this.pinnedSource, "No source is pinned at the time."), this.pinnedSourceId = null, this.pinnedSource = null;
  }
  addHandler(e, r, n) {
    const i = fr(e);
    return this.types.set(i, r), e === b.SOURCE ? this.dragSources.set(i, n) : e === b.TARGET && this.dropTargets.set(i, n), i;
  }
  constructor(e) {
    this.types = /* @__PURE__ */ new Map(), this.dragSources = /* @__PURE__ */ new Map(), this.dropTargets = /* @__PURE__ */ new Map(), this.pinnedSourceId = null, this.pinnedSource = null, this.store = e;
  }
}
function hr(t, e = void 0, r = {}, n = !1) {
  const i = pr(n), o = new er(i, new gr(i)), s = new It(i, o), a = t(s, e, r);
  return s.receiveBackend(a), s;
}
function pr(t) {
  const e = typeof window < "u" && window.__REDUX_DEVTOOLS_EXTENSION__;
  return Te(Qt, t && e && e({
    name: "dnd-core",
    instanceId: "dnd-core"
  }));
}
function le(t, e) {
  (e == null || e > t.length) && (e = t.length);
  for (var r = 0, n = new Array(e); r < e; r++)
    n[r] = t[r];
  return n;
}
function vr(t) {
  if (Array.isArray(t))
    return t;
}
function mr(t, e) {
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
function yr() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function Dr(t, e) {
  return vr(t) || mr(t, e) || Sr(t, e) || yr();
}
function Sr(t, e) {
  if (t) {
    if (typeof t == "string")
      return le(t, e);
    var r = Object.prototype.toString.call(t).slice(8, -1);
    if (r === "Object" && t.constructor && (r = t.constructor.name), r === "Map" || r === "Set")
      return Array.from(r);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))
      return le(t, e);
  }
}
var de = 0, P = Symbol.for("__VUE_DND_CONTEXT_INSTANCE__");
function Or(t) {
  return "manager" in t && t.manager;
}
function br(t) {
  if (Or(t)) {
    var e = t.manager;
    return [
      e,
      !1
    ];
  }
  var r = Tr(t.backend, t.context, t.options, t.debugMode), n = !t.context;
  return [
    r,
    n
  ];
}
function Tr(t) {
  var e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : _e(), r = arguments.length > 2 ? arguments[2] : void 0, n = arguments.length > 3 ? arguments[3] : void 0, i = e;
  return i[P] || (i[P] = hr(t, e, r, n)), i[P];
}
function _e() {
  return typeof globalThis < "u" ? globalThis : typeof global < "u" ? global : window;
}
const Er = A({
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
    var n = r.slots, i = Dr(br(e), 2), o = i[0], s = i[1];
    s && ++de, Ve(function() {
      if (s) {
        var u = _e();
        --de === 0 && (u[P] = null);
      }
    }), Qe(o);
    var a;
    return function() {
      var u;
      return (a = (u = n.default) === null || u === void 0 ? void 0 : u.call(n)) !== null && a !== void 0 ? a : null;
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
function Ir(t, e) {
  if (!(t instanceof e))
    throw new TypeError("Cannot call a class as a function");
}
var V = !1, F = !1, wr = /* @__PURE__ */ function() {
  function t(r) {
    Ir(this, t), this.sourceId = null, this.internalMonitor = r.getMonitor();
  }
  var e = t.prototype;
  return e.receiveHandlerId = function(n) {
    this.sourceId = n;
  }, e.getHandlerId = function() {
    return this.sourceId;
  }, e.canDrag = function() {
    d(!V, "You may not call monitor.canDrag() inside your canDrag() implementation. Read more: http://react-dnd.github.io/react-dnd/docs/api/drag-source-monitor");
    try {
      return V = !0, this.internalMonitor.canDragSource(this.sourceId);
    } finally {
      V = !1;
    }
  }, e.isDragging = function() {
    if (!this.sourceId)
      return !1;
    d(!F, "You may not call monitor.isDragging() inside your isDragging() implementation. Read more: http://react-dnd.github.io/react-dnd/docs/api/drag-source-monitor");
    try {
      return F = !0, this.internalMonitor.isDraggingSource(this.sourceId);
    } finally {
      F = !1;
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
}(), Cr = function(t) {
  return t && typeof Symbol < "u" && t.constructor === Symbol ? "symbol" : typeof t;
};
function _r(t) {
  return t ? t.__v_isVNode === !0 : !1;
}
function Nr(t) {
  return t ? t.__v_skip : !1;
}
function Pr(t) {
  return _r(t) && Cr(t.type) !== "symbol";
}
function xr() {
  throw new Error("Only native element nodes can now be passed to Vue DnD connectors.You can either wrap Component into a <div>, or turn it into a drag source or a drop target itself.");
}
function Rr(t) {
  return function() {
    var e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : null, r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null;
    if (Nr(e) && xr(), !Pr(e)) {
      var n = e;
      return t(n, r), n;
    }
  };
}
function Ar(t) {
  var e = {};
  return Object.keys(t).forEach(function(r) {
    var n = t[r];
    if (r.endsWith("Ref"))
      e[r] = t[r];
    else {
      var i = Rr(n);
      e[r] = function() {
        return i;
      };
    }
  }), e;
}
function fe(t, e, r, n) {
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
    const c = o[u];
    if (!a(c))
      return !1;
    const h = t[c], v = e[c];
    if (i = r ? r.call(n, h, v, c) : void 0, i === !1 || i === void 0 && h !== v)
      return !1;
  }
  return !0;
}
function Mr(t, e) {
  if (!(t instanceof e))
    throw new TypeError("Cannot call a class as a function");
}
function ge(t, e) {
  for (var r = 0; r < e.length; r++) {
    var n = e[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, n.key, n);
  }
}
function Lr(t, e, r) {
  return e && ge(t.prototype, e), r && ge(t, r), t;
}
var kr = /* @__PURE__ */ function() {
  function t(r) {
    var n = this;
    Mr(this, t), this.hooks = Ar({
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
    return !fe(this.lastConnectedDragSourceOptions, this.dragSourceOptions);
  }, e.didDragPreviewOptionsChange = function() {
    return !fe(this.lastConnectedDragPreviewOptions, this.dragPreviewOptions);
  }, e.disconnectDragSource = function() {
    this.dragSourceUnsubscribe && (this.dragSourceUnsubscribe(), this.dragSourceUnsubscribe = void 0);
  }, e.disconnectDragPreview = function() {
    this.dragPreviewUnsubscribe && (this.dragPreviewUnsubscribe(), this.dragPreviewUnsubscribe = void 0, this.dragPreviewNode = null);
  }, e.clearDragSource = function() {
    this.dragSourceNode = null;
  }, e.clearDragPreview = function() {
    this.dragPreviewNode = null;
  }, Lr(t, [
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
function Hr(t, e, r) {
  var n = r.getRegistry(), i = n.addSource(t, e);
  return [
    i,
    function() {
      return n.removeSource(i);
    }
  ];
}
function jr(t, e) {
  if (!(t instanceof e))
    throw new TypeError("Cannot call a class as a function");
}
var Ur = /* @__PURE__ */ function() {
  function t(r, n, i) {
    jr(this, t), this.spec = r, this.monitor = n, this.connector = i;
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
function $r(t, e, r) {
  var n = T(function() {
    return new Ur(f(t), f(e), f(r));
  });
  return E(function() {
    n.value.spec = f(t);
  }), n;
}
function ee() {
  var t = Ke();
  return d(t != null, "Expected drag drop context"), t;
}
function Vr(t) {
  return T(function() {
    var e = f(t).type;
    return d(e != null, "spec.type must be defined"), e;
  });
}
function he(t, e) {
  (e == null || e > t.length) && (e = t.length);
  for (var r = 0, n = new Array(e); r < e; r++)
    n[r] = t[r];
  return n;
}
function Fr(t) {
  if (Array.isArray(t))
    return t;
}
function qr(t, e) {
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
function Gr() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function Br(t, e) {
  return Fr(t) || qr(t, e) || Yr(t, e) || Gr();
}
function Yr(t, e) {
  if (t) {
    if (typeof t == "string")
      return he(t, e);
    var r = Object.prototype.toString.call(t).slice(8, -1);
    if (r === "Object" && t.constructor && (r = t.constructor.name), r === "Map" || r === "Set")
      return Array.from(r);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))
      return he(t, e);
  }
}
function Wr(t, e, r) {
  var n = ee(), i = $r(t, e, r), o = Vr(t);
  E(function(a) {
    if (f(o) != null) {
      var u = Br(Hr(f(o), f(i), f(n)), 2), c = u[0], h = u[1];
      f(e).receiveHandlerId(c), f(r).receiveHandlerId(c), a(h);
    }
  });
}
function Xr(t) {
  return T(function() {
    return typeof t == "function" ? t() : t;
  });
}
function zr() {
  var t = ee();
  return T(function() {
    return new wr(f(t));
  });
}
function Qr(t, e) {
  var r = ee(), n = T(function() {
    return new kr(f(r).getBackend());
  });
  return E(function(i) {
    n.value.dragSourceOptions = f(t) || null, f(n).reconnect(), i(function() {
      n.value.disconnectDragSource();
    });
  }), E(function(i) {
    n.value.dragPreviewOptions = f(e) || null, f(n).reconnect(), i(function() {
      n.value.disconnectDragPreview();
    });
  }), n;
}
var Ne = function t(e, r) {
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
function Kr(t, e, r) {
  var n = Fe(f(e)(f(t))), i = function() {
    var o = f(e)(f(t));
    Ne(n, o) || (n.value = o, r && r());
  };
  return E(i), [
    n,
    i
  ];
}
function pe(t, e) {
  (e == null || e > t.length) && (e = t.length);
  for (var r = 0, n = new Array(e); r < e; r++)
    n[r] = t[r];
  return n;
}
function Jr(t) {
  if (Array.isArray(t))
    return t;
}
function Zr(t, e) {
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
function en() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function tn(t, e) {
  return Jr(t) || Zr(t, e) || rn(t, e) || en();
}
function rn(t, e) {
  if (t) {
    if (typeof t == "string")
      return pe(t, e);
    var r = Object.prototype.toString.call(t).slice(8, -1);
    if (r === "Object" && t.constructor && (r = t.constructor.name), r === "Map" || r === "Set")
      return Array.from(r);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))
      return pe(t, e);
  }
}
function nn(t, e, r) {
  var n = tn(Kr(t, e, r), 2), i = n[0], o = n[1];
  return E(function(a) {
    var u = f(t).getHandlerId();
    u != null && a(f(t).subscribeToStateChange(o, {
      handlerIds: [
        u
      ]
    }));
  }), i;
}
function on(t, e, r) {
  var n = function() {
    return {};
  };
  return nn(e, t || n, function() {
    return f(r).reconnect();
  });
}
function Pe(t, e) {
  var r = qe({
    el: null,
    options: f(e)
  });
  E(function() {
    t(r);
  }, {
    flush: "post"
  });
  var n = function(i, o) {
    re(r, "el", i);
    var s = f(e) || o;
    return Ne(r.options, s) || re(r, "options", s), f(i);
  };
  return n;
}
function sn(t, e) {
  return Pe(function(r) {
    f(t).hooks.dragSource()(r.el, r.options);
  }, T(function() {
    return f(e).options;
  }));
}
function an(t, e) {
  return Pe(function(r) {
    f(t).hooks.dragPreview()(r.el, r.options);
  }, T(function() {
    return f(e).previewOptions;
  }));
}
function un(t) {
  var e = Xr(t), r = zr(), n = Qr(T(function() {
    return f(e).options;
  }), T(function() {
    return f(e).previewOptions;
  }));
  return Wr(e, r, n), [
    on(T(function() {
      return f(e).collect || function() {
        return {};
      };
    }), r, n),
    sn(n, e),
    an(n, e)
  ];
}
function xe(t) {
  let e = null;
  return () => (e == null && (e = t()), e);
}
function cn(t, e) {
  return t.filter(
    (r) => r !== e
  );
}
function ln(t, e) {
  const r = /* @__PURE__ */ new Set(), n = (o) => r.add(o);
  t.forEach(n), e.forEach(n);
  const i = [];
  return r.forEach(
    (o) => i.push(o)
  ), i;
}
class dn {
  enter(e) {
    const r = this.entered.length, n = (i) => this.isNodeInDocument(i) && (!i.contains || i.contains(e));
    return this.entered = ln(this.entered.filter(n), [
      e
    ]), r === 0 && this.entered.length > 0;
  }
  leave(e) {
    const r = this.entered.length;
    return this.entered = cn(this.entered.filter(this.isNodeInDocument), e), r > 0 && this.entered.length === 0;
  }
  reset() {
    this.entered = [];
  }
  constructor(e) {
    this.entered = [], this.isNodeInDocument = e;
  }
}
class fn {
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
const Re = "__NATIVE_FILE__", Ae = "__NATIVE_URL__", Me = "__NATIVE_TEXT__", Le = "__NATIVE_HTML__", ve = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  FILE: Re,
  HTML: Le,
  TEXT: Me,
  URL: Ae
}, Symbol.toStringTag, { value: "Module" }));
function q(t, e, r) {
  const n = e.reduce(
    (i, o) => i || t.getData(o),
    ""
  );
  return n ?? r;
}
const W = {
  [Re]: {
    exposeProperties: {
      files: (t) => Array.prototype.slice.call(t.files),
      items: (t) => t.items,
      dataTransfer: (t) => t
    },
    matchesTypes: [
      "Files"
    ]
  },
  [Le]: {
    exposeProperties: {
      html: (t, e) => q(t, e, ""),
      dataTransfer: (t) => t
    },
    matchesTypes: [
      "Html",
      "text/html"
    ]
  },
  [Ae]: {
    exposeProperties: {
      urls: (t, e) => q(t, e, "").split(`
`),
      dataTransfer: (t) => t
    },
    matchesTypes: [
      "Url",
      "text/uri-list"
    ]
  },
  [Me]: {
    exposeProperties: {
      text: (t, e) => q(t, e, ""),
      dataTransfer: (t) => t
    },
    matchesTypes: [
      "Text",
      "text/plain"
    ]
  }
};
function gn(t, e) {
  const r = W[t];
  if (!r)
    throw new Error(`native type ${t} has no configuration`);
  const n = new fn(r);
  return n.loadDataTransfer(e), n;
}
function G(t) {
  if (!t)
    return null;
  const e = Array.prototype.slice.call(t.types || []);
  return Object.keys(W).filter((r) => {
    const n = W[r];
    return n != null && n.matchesTypes ? n.matchesTypes.some(
      (i) => e.indexOf(i) > -1
    ) : !1;
  })[0] || null;
}
const hn = xe(
  () => /firefox/i.test(navigator.userAgent)
), ke = xe(
  () => !!window.safari
);
class me {
  interpolate(e) {
    const { xs: r, ys: n, c1s: i, c2s: o, c3s: s } = this;
    let a = r.length - 1;
    if (e === r[a])
      return n[a];
    let u = 0, c = s.length - 1, h;
    for (; u <= c; ) {
      h = Math.floor(0.5 * (u + c));
      const l = r[h];
      if (l < e)
        u = h + 1;
      else if (l > e)
        c = h - 1;
      else
        return n[h];
    }
    a = Math.max(0, c);
    const v = e - r[a], p = v * v;
    return n[a] + i[a] * v + o[a] * p + s[a] * v * p;
  }
  constructor(e, r) {
    const { length: n } = e, i = [];
    for (let l = 0; l < n; l++)
      i.push(l);
    i.sort(
      (l, y) => e[l] < e[y] ? -1 : 1
    );
    const o = [], s = [];
    let a, u;
    for (let l = 0; l < n - 1; l++)
      a = e[l + 1] - e[l], u = r[l + 1] - r[l], o.push(a), s.push(u / a);
    const c = [
      s[0]
    ];
    for (let l = 0; l < o.length - 1; l++) {
      const y = s[l], g = s[l + 1];
      if (y * g <= 0)
        c.push(0);
      else {
        a = o[l];
        const m = o[l + 1], D = a + m;
        c.push(3 * D / ((D + m) / y + (D + a) / g));
      }
    }
    c.push(s[s.length - 1]);
    const h = [], v = [];
    let p;
    for (let l = 0; l < c.length - 1; l++) {
      p = s[l];
      const y = c[l], g = 1 / o[l], m = y + c[l + 1] - p - p;
      h.push((p - y - m) * g), v.push(m * g * g);
    }
    this.xs = e, this.ys = r, this.c1s = c, this.c2s = h, this.c3s = v;
  }
}
const pn = 1;
function He(t) {
  const e = t.nodeType === pn ? t : t.parentElement;
  if (!e)
    return null;
  const { top: r, left: n } = e.getBoundingClientRect();
  return {
    x: n,
    y: r
  };
}
function N(t) {
  return {
    x: t.clientX,
    y: t.clientY
  };
}
function vn(t) {
  var e;
  return t.nodeName === "IMG" && (hn() || !(!((e = document.documentElement) === null || e === void 0) && e.contains(t)));
}
function mn(t, e, r, n) {
  let i = t ? e.width : r, o = t ? e.height : n;
  return ke() && t && (o /= window.devicePixelRatio, i /= window.devicePixelRatio), {
    dragPreviewWidth: i,
    dragPreviewHeight: o
  };
}
function yn(t, e, r, n, i) {
  const o = vn(e), a = He(o ? t : e), u = {
    x: r.x - a.x,
    y: r.y - a.y
  }, { offsetWidth: c, offsetHeight: h } = t, { anchorX: v, anchorY: p } = n, { dragPreviewWidth: l, dragPreviewHeight: y } = mn(o, e, c, h), g = () => {
    let te = new me([
      0,
      0.5,
      1
    ], [
      // Dock to the top
      u.y,
      // Align at the center
      u.y / h * y,
      // Dock to the bottom
      u.y + y - h
    ]).interpolate(p);
    return ke() && o && (te += (window.devicePixelRatio - 1) * y), te;
  }, m = () => new me([
    0,
    0.5,
    1
  ], [
    // Dock to the left
    u.x,
    // Align at the center
    u.x / c * l,
    // Dock to the right
    u.x + l - c
  ]).interpolate(v), { offsetX: D, offsetY: S } = i, I = D === 0 || D, U = S === 0 || S;
  return {
    x: I ? D : m(),
    y: U ? S : g()
  };
}
class Dn {
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
function Sn(t, e, r) {
  return e in t ? Object.defineProperty(t, e, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : t[e] = r, t;
}
function ye(t) {
  for (var e = 1; e < arguments.length; e++) {
    var r = arguments[e] != null ? arguments[e] : {}, n = Object.keys(r);
    typeof Object.getOwnPropertySymbols == "function" && (n = n.concat(Object.getOwnPropertySymbols(r).filter(function(i) {
      return Object.getOwnPropertyDescriptor(r, i).enumerable;
    }))), n.forEach(function(i) {
      Sn(t, i, r[i]);
    });
  }
  return t;
}
class On {
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
    return ye({
      dropEffect: this.altKeyPressed ? "copy" : "move"
    }, r || {});
  }
  getCurrentDropEffect() {
    return this.isDraggingNativeItem() ? "copy" : this.getCurrentSourceNodeOptions().dropEffect;
  }
  getCurrentSourcePreviewNodeOptions() {
    const e = this.monitor.getSourceId(), r = this.sourcePreviewNodeOptions.get(e);
    return ye({
      anchorX: 0.5,
      anchorY: 0.5,
      captureDraggingState: !1
    }, r || {});
  }
  isDraggingNativeItem() {
    const e = this.monitor.getItemType();
    return Object.keys(ve).some(
      (r) => ve[r] === e
    );
  }
  beginDragNativeItem(e, r) {
    this.clearCurrentDragSourceNode(), this.currentNativeSource = gn(e, r), this.currentNativeHandle = this.registry.addSource(e, this.currentNativeSource), this.actions.beginDrag([
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
      return o && He(o) || null;
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
      const s = N(i);
      this.monitor.isDragging() && (this.actions.endDrag(), this.cancelHover()), this.actions.beginDrag(o || [], {
        publishSource: !1,
        getSourceClientOffset: this.getSourceClientOffset,
        clientOffset: s
      });
      const { dataTransfer: a } = i, u = G(a);
      if (this.monitor.isDragging()) {
        if (a && typeof a.setDragImage == "function") {
          const h = this.monitor.getSourceId(), v = this.sourceNodes.get(h), p = this.sourcePreviewNodes.get(h) || v;
          if (p) {
            const { anchorX: l, anchorY: y, offsetX: g, offsetY: m } = this.getCurrentSourcePreviewNodeOptions(), I = yn(v, p, s, {
              anchorX: l,
              anchorY: y
            }, {
              offsetX: g,
              offsetY: m
            });
            a.setDragImage(p, I.x, I.y);
          }
        }
        try {
          a == null || a.setData("application/json", {});
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
      const { dataTransfer: a } = i, u = G(a);
      u && this.beginDragNativeItem(u, a);
    }, this.handleTopDragEnter = (i) => {
      const { dragEnterTargetIds: o } = this;
      if (this.dragEnterTargetIds = [], !this.monitor.isDragging())
        return;
      this.altKeyPressed = i.altKey, o.length > 0 && this.actions.hover(o, {
        clientOffset: N(i)
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
      this.altKeyPressed = i.altKey, this.lastClientOffset = N(i), this.scheduleHover(o), (o || []).some(
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
        G(i.dataTransfer) && i.preventDefault();
      this.enterLeaveCounter.reset();
    }, this.handleTopDrop = (i) => {
      const { dropTargetIds: o } = this;
      this.dropTargetIds = [], this.actions.hover(o, {
        clientOffset: N(i)
      }), this.actions.drop({
        dropEffect: this.getCurrentDropEffect()
      }), this.isDraggingNativeItem() ? this.endDragNativeItem() : this.monitor.isDragging() && this.actions.endDrag(), this.cancelHover();
    }, this.handleSelectStart = (i) => {
      const o = i.target;
      typeof o.dragDrop == "function" && (o.tagName === "INPUT" || o.tagName === "SELECT" || o.tagName === "TEXTAREA" || o.isContentEditable || (i.preventDefault(), o.dragDrop()));
    }, this.options = new Dn(r, n), this.actions = e.getActions(), this.monitor = e.getMonitor(), this.registry = e.getRegistry(), this.enterLeaveCounter = new dn(this.isNodeInDocument);
  }
}
const bn = function(e, r, n) {
  return new On(e, r, n);
}, x = /* @__PURE__ */ A({
  __name: "DndProvider",
  setup(t) {
    return (e, r) => (De(), Ge(f(Er), { backend: f(bn) }, {
      default: Be(() => [
        Se(e.$slots, "default")
      ]),
      _: 3
    }, 8, ["backend"]));
  }
});
x.install = (t) => {
  t.component(x.__name, x);
};
const Tn = (t) => (We("data-v-2646bd48"), t = t(), Xe(), t), En = /* @__PURE__ */ Tn(() => /* @__PURE__ */ ze("div", null, "111", -1)), In = /* @__PURE__ */ A({
  __name: "Draggable",
  setup(t) {
    const [e, r] = un(() => ({
      type: "CommonDrag",
      canDrag: !0,
      collect: (n) => ({
        isDragging: n.isDragging(),
        handlerId: n.getHandlerId()
      })
    }));
    return (n, i) => (De(), Ye("div", {
      class: "box",
      ref: f(r)
    }, [
      En,
      Se(n.$slots, "default", {}, void 0, !0)
    ], 512));
  }
});
const wn = (t, e) => {
  const r = t.__vccOpts || t;
  for (const [n, i] of e)
    r[n] = i;
  return r;
}, R = /* @__PURE__ */ wn(In, [["__scopeId", "data-v-2646bd48"]]);
R.install = (t) => {
  t.component(R.__name, R);
};
const Cn = [R, x], _n = (t) => {
  Cn.forEach((e) => {
    t.component(e.__name, e);
  });
}, Pn = {
  install: _n
};
export {
  Pn as default,
  R as draggable
};
