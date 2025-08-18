var Da = Object.defineProperty;
var Ls = (e) => {
  throw TypeError(e);
};
var qa = (e, t, r) => t in e ? Da(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[t] = r;
var kn = (e, t, r) => qa(e, typeof t != "symbol" ? t + "" : t, r), Dn = (e, t, r) => t.has(e) || Ls("Cannot " + r);
var I = (e, t, r) => (Dn(e, t, "read from private field"), r ? r.call(e) : t.get(e)), oe = (e, t, r) => t.has(e) ? Ls("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, r), Q = (e, t, r, n) => (Dn(e, t, "write to private field"), n ? n.call(e, r) : t.set(e, r), r), ae = (e, t, r) => (Dn(e, t, "access private method"), r);
/**
* @vue/shared v3.5.17
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
/*! #__NO_SIDE_EFFECTS__ */
// @__NO_SIDE_EFFECTS__
function Aa(e) {
  const t = /* @__PURE__ */ Object.create(null);
  for (const r of e.split(",")) t[r] = 1;
  return (r) => r in t;
}
const nr = process.env.NODE_ENV !== "production" ? Object.freeze({}) : {}, Ma = process.env.NODE_ENV !== "production" ? Object.freeze([]) : [], qt = () => {
}, Va = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // uppercase letter
(e.charCodeAt(2) > 122 || e.charCodeAt(2) < 97), Xe = Object.assign, Fa = Object.prototype.hasOwnProperty, es = (e, t) => Fa.call(e, t), ue = Array.isArray, Rt = (e) => _n(e) === "[object Map]", No = (e) => _n(e) === "[object Set]", le = (e) => typeof e == "function", Le = (e) => typeof e == "string", Pt = (e) => typeof e == "symbol", be = (e) => e !== null && typeof e == "object", Ua = (e) => (be(e) || le(e)) && le(e.then) && le(e.catch), Po = Object.prototype.toString, _n = (e) => Po.call(e), jo = (e) => _n(e).slice(8, -1), To = (e) => _n(e) === "[object Object]", ws = (e) => Le(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e, Co = (e) => {
  const t = /* @__PURE__ */ Object.create(null);
  return (r) => t[r] || (t[r] = e(r));
}, La = /-(\w)/g, sn = Co(
  (e) => e.replace(La, (t, r) => r ? r.toUpperCase() : "")
), on = Co((e) => e.charAt(0).toUpperCase() + e.slice(1)), ht = (e, t) => !Object.is(e, t);
let zs;
const gn = () => zs || (zs = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
function Es(e) {
  if (ue(e)) {
    const t = {};
    for (let r = 0; r < e.length; r++) {
      const n = e[r], i = Le(n) ? xa(n) : Es(n);
      if (i)
        for (const s in i)
          t[s] = i[s];
    }
    return t;
  } else if (Le(e) || be(e))
    return e;
}
const za = /;(?![^(]*\))/g, Ka = /:([^]+)/, Ha = /\/\*[^]*?\*\//g;
function xa(e) {
  const t = {};
  return e.replace(Ha, "").split(za).forEach((r) => {
    if (r) {
      const n = r.split(Ka);
      n.length > 1 && (t[n[0].trim()] = n[1].trim());
    }
  }), t;
}
function Ss(e) {
  let t = "";
  if (Le(e))
    t = e;
  else if (ue(e))
    for (let r = 0; r < e.length; r++) {
      const n = Ss(e[r]);
      n && (t += n + " ");
    }
  else if (be(e))
    for (const r in e)
      e[r] && (t += r + " ");
  return t.trim();
}
const Io = (e) => !!(e && e.__v_isRef === !0), Je = (e) => Le(e) ? e : e == null ? "" : ue(e) || be(e) && (e.toString === Po || !le(e.toString)) ? Io(e) ? Je(e.value) : JSON.stringify(e, ko, 2) : String(e), ko = (e, t) => Io(t) ? ko(e, t.value) : Rt(t) ? {
  [`Map(${t.size})`]: [...t.entries()].reduce(
    (r, [n, i], s) => (r[qn(n, s) + " =>"] = i, r),
    {}
  )
} : No(t) ? {
  [`Set(${t.size})`]: [...t.values()].map((r) => qn(r))
} : Pt(t) ? qn(t) : be(t) && !ue(t) && !To(t) ? String(t) : t, qn = (e, t = "") => {
  var r;
  return (
    // Symbol.description in es2019+ so we need to cast here to pass
    // the lib: es2016 check
    Pt(e) ? `Symbol(${(r = e.description) != null ? r : t})` : e
  );
};
/**
* @vue/reactivity v3.5.17
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
function Ve(e, ...t) {
  console.warn(`[Vue warn] ${e}`, ...t);
}
function Do(e, t = !1) {
  process.env.NODE_ENV !== "production" && !t && Ve(
    "onScopeDispose() is called when there is no active effect scope to be associated with."
  );
}
let ne;
const An = /* @__PURE__ */ new WeakSet();
class Ja {
  constructor(t) {
    this.fn = t, this.deps = void 0, this.depsTail = void 0, this.flags = 5, this.next = void 0, this.cleanup = void 0, this.scheduler = void 0;
  }
  pause() {
    this.flags |= 64;
  }
  resume() {
    this.flags & 64 && (this.flags &= -65, An.has(this) && (An.delete(this), this.trigger()));
  }
  /**
   * @internal
   */
  notify() {
    this.flags & 2 && !(this.flags & 32) || this.flags & 8 || Ao(this);
  }
  run() {
    if (!(this.flags & 1))
      return this.fn();
    this.flags |= 2, Ks(this), Mo(this);
    const t = ne, r = Me;
    ne = this, Me = !0;
    try {
      return this.fn();
    } finally {
      process.env.NODE_ENV !== "production" && ne !== this && Ve(
        "Active effect was not restored correctly - this is likely a Vue internal bug."
      ), Vo(this), ne = t, Me = r, this.flags &= -3;
    }
  }
  stop() {
    if (this.flags & 1) {
      for (let t = this.deps; t; t = t.nextDep)
        Ns(t);
      this.deps = this.depsTail = void 0, Ks(this), this.onStop && this.onStop(), this.flags &= -2;
    }
  }
  trigger() {
    this.flags & 64 ? An.add(this) : this.scheduler ? this.scheduler() : this.runIfDirty();
  }
  /**
   * @internal
   */
  runIfDirty() {
    ts(this) && this.run();
  }
  get dirty() {
    return ts(this);
  }
}
let qo = 0, Xt, Zt;
function Ao(e, t = !1) {
  if (e.flags |= 8, t) {
    e.next = Zt, Zt = e;
    return;
  }
  e.next = Xt, Xt = e;
}
function Rs() {
  qo++;
}
function Os() {
  if (--qo > 0)
    return;
  if (Zt) {
    let t = Zt;
    for (Zt = void 0; t; ) {
      const r = t.next;
      t.next = void 0, t.flags &= -9, t = r;
    }
  }
  let e;
  for (; Xt; ) {
    let t = Xt;
    for (Xt = void 0; t; ) {
      const r = t.next;
      if (t.next = void 0, t.flags &= -9, t.flags & 1)
        try {
          t.trigger();
        } catch (n) {
          e || (e = n);
        }
      t = r;
    }
  }
  if (e) throw e;
}
function Mo(e) {
  for (let t = e.deps; t; t = t.nextDep)
    t.version = -1, t.prevActiveLink = t.dep.activeLink, t.dep.activeLink = t;
}
function Vo(e) {
  let t, r = e.depsTail, n = r;
  for (; n; ) {
    const i = n.prevDep;
    n.version === -1 ? (n === r && (r = i), Ns(n), Wa(n)) : t = n, n.dep.activeLink = n.prevActiveLink, n.prevActiveLink = void 0, n = i;
  }
  e.deps = t, e.depsTail = r;
}
function ts(e) {
  for (let t = e.deps; t; t = t.nextDep)
    if (t.dep.version !== t.version || t.dep.computed && (Fo(t.dep.computed) || t.dep.version !== t.version))
      return !0;
  return !!e._dirty;
}
function Fo(e) {
  if (e.flags & 4 && !(e.flags & 16) || (e.flags &= -17, e.globalVersion === sr) || (e.globalVersion = sr, !e.isSSR && e.flags & 128 && (!e.deps && !e._dirty || !ts(e))))
    return;
  e.flags |= 2;
  const t = e.dep, r = ne, n = Me;
  ne = e, Me = !0;
  try {
    Mo(e);
    const i = e.fn(e._value);
    (t.version === 0 || ht(i, e._value)) && (e.flags |= 128, e._value = i, t.version++);
  } catch (i) {
    throw t.version++, i;
  } finally {
    ne = r, Me = n, Vo(e), e.flags &= -3;
  }
}
function Ns(e, t = !1) {
  const { dep: r, prevSub: n, nextSub: i } = e;
  if (n && (n.nextSub = i, e.prevSub = void 0), i && (i.prevSub = n, e.nextSub = void 0), process.env.NODE_ENV !== "production" && r.subsHead === e && (r.subsHead = i), r.subs === e && (r.subs = n, !n && r.computed)) {
    r.computed.flags &= -5;
    for (let s = r.computed.deps; s; s = s.nextDep)
      Ns(s, !0);
  }
  !t && !--r.sc && r.map && r.map.delete(r.key);
}
function Wa(e) {
  const { prevDep: t, nextDep: r } = e;
  t && (t.nextDep = r, e.prevDep = void 0), r && (r.prevDep = t, e.nextDep = void 0);
}
let Me = !0;
const Uo = [];
function fr() {
  Uo.push(Me), Me = !1;
}
function dr() {
  const e = Uo.pop();
  Me = e === void 0 ? !0 : e;
}
function Ks(e) {
  const { cleanup: t } = e;
  if (e.cleanup = void 0, t) {
    const r = ne;
    ne = void 0;
    try {
      t();
    } finally {
      ne = r;
    }
  }
}
let sr = 0;
class Ga {
  constructor(t, r) {
    this.sub = t, this.dep = r, this.version = r.version, this.nextDep = this.prevDep = this.nextSub = this.prevSub = this.prevActiveLink = void 0;
  }
}
class Ps {
  // TODO isolatedDeclarations "__v_skip"
  constructor(t) {
    this.computed = t, this.version = 0, this.activeLink = void 0, this.subs = void 0, this.map = void 0, this.key = void 0, this.sc = 0, this.__v_skip = !0, process.env.NODE_ENV !== "production" && (this.subsHead = void 0);
  }
  track(t) {
    if (!ne || !Me || ne === this.computed)
      return;
    let r = this.activeLink;
    if (r === void 0 || r.sub !== ne)
      r = this.activeLink = new Ga(ne, this), ne.deps ? (r.prevDep = ne.depsTail, ne.depsTail.nextDep = r, ne.depsTail = r) : ne.deps = ne.depsTail = r, Lo(r);
    else if (r.version === -1 && (r.version = this.version, r.nextDep)) {
      const n = r.nextDep;
      n.prevDep = r.prevDep, r.prevDep && (r.prevDep.nextDep = n), r.prevDep = ne.depsTail, r.nextDep = void 0, ne.depsTail.nextDep = r, ne.depsTail = r, ne.deps === r && (ne.deps = n);
    }
    return process.env.NODE_ENV !== "production" && ne.onTrack && ne.onTrack(
      Xe(
        {
          effect: ne
        },
        t
      )
    ), r;
  }
  trigger(t) {
    this.version++, sr++, this.notify(t);
  }
  notify(t) {
    Rs();
    try {
      if (process.env.NODE_ENV !== "production")
        for (let r = this.subsHead; r; r = r.nextSub)
          r.sub.onTrigger && !(r.sub.flags & 8) && r.sub.onTrigger(
            Xe(
              {
                effect: r.sub
              },
              t
            )
          );
      for (let r = this.subs; r; r = r.prevSub)
        r.sub.notify() && r.sub.dep.notify();
    } finally {
      Os();
    }
  }
}
function Lo(e) {
  if (e.dep.sc++, e.sub.flags & 4) {
    const t = e.dep.computed;
    if (t && !e.dep.subs) {
      t.flags |= 20;
      for (let n = t.deps; n; n = n.nextDep)
        Lo(n);
    }
    const r = e.dep.subs;
    r !== e && (e.prevSub = r, r && (r.nextSub = e)), process.env.NODE_ENV !== "production" && e.dep.subsHead === void 0 && (e.dep.subsHead = e), e.dep.subs = e;
  }
}
const an = /* @__PURE__ */ new WeakMap(), Ot = Symbol(
  process.env.NODE_ENV !== "production" ? "Object iterate" : ""
), rs = Symbol(
  process.env.NODE_ENV !== "production" ? "Map keys iterate" : ""
), ir = Symbol(
  process.env.NODE_ENV !== "production" ? "Array iterate" : ""
);
function Ne(e, t, r) {
  if (Me && ne) {
    let n = an.get(e);
    n || an.set(e, n = /* @__PURE__ */ new Map());
    let i = n.get(r);
    i || (n.set(r, i = new Ps()), i.map = n, i.key = r), process.env.NODE_ENV !== "production" ? i.track({
      target: e,
      type: t,
      key: r
    }) : i.track();
  }
}
function nt(e, t, r, n, i, s) {
  const c = an.get(e);
  if (!c) {
    sr++;
    return;
  }
  const a = (f) => {
    f && (process.env.NODE_ENV !== "production" ? f.trigger({
      target: e,
      type: t,
      key: r,
      newValue: n,
      oldValue: i,
      oldTarget: s
    }) : f.trigger());
  };
  if (Rs(), t === "clear")
    c.forEach(a);
  else {
    const f = ue(e), _ = f && ws(r);
    if (f && r === "length") {
      const p = Number(n);
      c.forEach((h, b) => {
        (b === "length" || b === ir || !Pt(b) && b >= p) && a(h);
      });
    } else
      switch ((r !== void 0 || c.has(void 0)) && a(c.get(r)), _ && a(c.get(ir)), t) {
        case "add":
          f ? _ && a(c.get("length")) : (a(c.get(Ot)), Rt(e) && a(c.get(rs)));
          break;
        case "delete":
          f || (a(c.get(Ot)), Rt(e) && a(c.get(rs)));
          break;
        case "set":
          Rt(e) && a(c.get(Ot));
          break;
      }
  }
  Os();
}
function Qa(e, t) {
  const r = an.get(e);
  return r && r.get(t);
}
function Tt(e) {
  const t = X(e);
  return t === e ? t : (Ne(t, "iterate", ir), Pe(e) ? t : t.map($e));
}
function js(e) {
  return Ne(e = X(e), "iterate", ir), e;
}
const Ba = {
  __proto__: null,
  [Symbol.iterator]() {
    return Mn(this, Symbol.iterator, $e);
  },
  concat(...e) {
    return Tt(this).concat(
      ...e.map((t) => ue(t) ? Tt(t) : t)
    );
  },
  entries() {
    return Mn(this, "entries", (e) => (e[1] = $e(e[1]), e));
  },
  every(e, t) {
    return ze(this, "every", e, t, void 0, arguments);
  },
  filter(e, t) {
    return ze(this, "filter", e, t, (r) => r.map($e), arguments);
  },
  find(e, t) {
    return ze(this, "find", e, t, $e, arguments);
  },
  findIndex(e, t) {
    return ze(this, "findIndex", e, t, void 0, arguments);
  },
  findLast(e, t) {
    return ze(this, "findLast", e, t, $e, arguments);
  },
  findLastIndex(e, t) {
    return ze(this, "findLastIndex", e, t, void 0, arguments);
  },
  // flat, flatMap could benefit from ARRAY_ITERATE but are not straight-forward to implement
  forEach(e, t) {
    return ze(this, "forEach", e, t, void 0, arguments);
  },
  includes(...e) {
    return Vn(this, "includes", e);
  },
  indexOf(...e) {
    return Vn(this, "indexOf", e);
  },
  join(e) {
    return Tt(this).join(e);
  },
  // keys() iterator only reads `length`, no optimisation required
  lastIndexOf(...e) {
    return Vn(this, "lastIndexOf", e);
  },
  map(e, t) {
    return ze(this, "map", e, t, void 0, arguments);
  },
  pop() {
    return Jt(this, "pop");
  },
  push(...e) {
    return Jt(this, "push", e);
  },
  reduce(e, ...t) {
    return Hs(this, "reduce", e, t);
  },
  reduceRight(e, ...t) {
    return Hs(this, "reduceRight", e, t);
  },
  shift() {
    return Jt(this, "shift");
  },
  // slice could use ARRAY_ITERATE but also seems to beg for range tracking
  some(e, t) {
    return ze(this, "some", e, t, void 0, arguments);
  },
  splice(...e) {
    return Jt(this, "splice", e);
  },
  toReversed() {
    return Tt(this).toReversed();
  },
  toSorted(e) {
    return Tt(this).toSorted(e);
  },
  toSpliced(...e) {
    return Tt(this).toSpliced(...e);
  },
  unshift(...e) {
    return Jt(this, "unshift", e);
  },
  values() {
    return Mn(this, "values", $e);
  }
};
function Mn(e, t, r) {
  const n = js(e), i = n[t]();
  return n !== e && !Pe(e) && (i._next = i.next, i.next = () => {
    const s = i._next();
    return s.value && (s.value = r(s.value)), s;
  }), i;
}
const Ya = Array.prototype;
function ze(e, t, r, n, i, s) {
  const c = js(e), a = c !== e && !Pe(e), f = c[t];
  if (f !== Ya[t]) {
    const h = f.apply(e, s);
    return a ? $e(h) : h;
  }
  let _ = r;
  c !== e && (a ? _ = function(h, b) {
    return r.call(this, $e(h), b, e);
  } : r.length > 2 && (_ = function(h, b) {
    return r.call(this, h, b, e);
  }));
  const p = f.call(c, _, n);
  return a && i ? i(p) : p;
}
function Hs(e, t, r, n) {
  const i = js(e);
  let s = r;
  return i !== e && (Pe(e) ? r.length > 3 && (s = function(c, a, f) {
    return r.call(this, c, a, f, e);
  }) : s = function(c, a, f) {
    return r.call(this, c, $e(a), f, e);
  }), i[t](s, ...n);
}
function Vn(e, t, r) {
  const n = X(e);
  Ne(n, "iterate", ir);
  const i = n[t](...r);
  return (i === -1 || i === !1) && or(r[0]) ? (r[0] = X(r[0]), n[t](...r)) : i;
}
function Jt(e, t, r = []) {
  fr(), Rs();
  const n = X(e)[t].apply(e, r);
  return Os(), dr(), n;
}
const Xa = /* @__PURE__ */ Aa("__proto__,__v_isRef,__isVue"), zo = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((e) => e !== "arguments" && e !== "caller").map((e) => Symbol[e]).filter(Pt)
);
function Za(e) {
  Pt(e) || (e = String(e));
  const t = X(this);
  return Ne(t, "has", e), t.hasOwnProperty(e);
}
class Ko {
  constructor(t = !1, r = !1) {
    this._isReadonly = t, this._isShallow = r;
  }
  get(t, r, n) {
    if (r === "__v_skip") return t.__v_skip;
    const i = this._isReadonly, s = this._isShallow;
    if (r === "__v_isReactive")
      return !i;
    if (r === "__v_isReadonly")
      return i;
    if (r === "__v_isShallow")
      return s;
    if (r === "__v_raw")
      return n === (i ? s ? Qo : Go : s ? Wo : Jo).get(t) || // receiver is not the reactive proxy, but has the same prototype
      // this means the receiver is a user proxy of the reactive proxy
      Object.getPrototypeOf(t) === Object.getPrototypeOf(n) ? t : void 0;
    const c = ue(t);
    if (!i) {
      let f;
      if (c && (f = Ba[r]))
        return f;
      if (r === "hasOwnProperty")
        return Za;
    }
    const a = Reflect.get(
      t,
      r,
      // if this is a proxy wrapping a ref, return methods using the raw ref
      // as receiver so that we don't have to call `toRaw` on the ref in all
      // its class methods
      ye(t) ? t : n
    );
    return (Pt(r) ? zo.has(r) : Xa(r)) || (i || Ne(t, "get", r), s) ? a : ye(a) ? c && ws(r) ? a : a.value : be(a) ? i ? bn(a) : $n(a) : a;
  }
}
class Ho extends Ko {
  constructor(t = !1) {
    super(!1, t);
  }
  set(t, r, n, i) {
    let s = t[r];
    if (!this._isShallow) {
      const f = Ze(s);
      if (!Pe(n) && !Ze(n) && (s = X(s), n = X(n)), !ue(t) && ye(s) && !ye(n))
        return f ? !1 : (s.value = n, !0);
    }
    const c = ue(t) && ws(r) ? Number(r) < t.length : es(t, r), a = Reflect.set(
      t,
      r,
      n,
      ye(t) ? t : i
    );
    return t === X(i) && (c ? ht(n, s) && nt(t, "set", r, n, s) : nt(t, "add", r, n)), a;
  }
  deleteProperty(t, r) {
    const n = es(t, r), i = t[r], s = Reflect.deleteProperty(t, r);
    return s && n && nt(t, "delete", r, void 0, i), s;
  }
  has(t, r) {
    const n = Reflect.has(t, r);
    return (!Pt(r) || !zo.has(r)) && Ne(t, "has", r), n;
  }
  ownKeys(t) {
    return Ne(
      t,
      "iterate",
      ue(t) ? "length" : Ot
    ), Reflect.ownKeys(t);
  }
}
class xo extends Ko {
  constructor(t = !1) {
    super(!0, t);
  }
  set(t, r) {
    return process.env.NODE_ENV !== "production" && Ve(
      `Set operation on key "${String(r)}" failed: target is readonly.`,
      t
    ), !0;
  }
  deleteProperty(t, r) {
    return process.env.NODE_ENV !== "production" && Ve(
      `Delete operation on key "${String(r)}" failed: target is readonly.`,
      t
    ), !0;
  }
}
const ec = /* @__PURE__ */ new Ho(), tc = /* @__PURE__ */ new xo(), rc = /* @__PURE__ */ new Ho(!0), nc = /* @__PURE__ */ new xo(!0), ns = (e) => e, hr = (e) => Reflect.getPrototypeOf(e);
function sc(e, t, r) {
  return function(...n) {
    const i = this.__v_raw, s = X(i), c = Rt(s), a = e === "entries" || e === Symbol.iterator && c, f = e === "keys" && c, _ = i[e](...n), p = r ? ns : t ? ss : $e;
    return !t && Ne(
      s,
      "iterate",
      f ? rs : Ot
    ), {
      // iterator protocol
      next() {
        const { value: h, done: b } = _.next();
        return b ? { value: h, done: b } : {
          value: a ? [p(h[0]), p(h[1])] : p(h),
          done: b
        };
      },
      // iterable protocol
      [Symbol.iterator]() {
        return this;
      }
    };
  };
}
function pr(e) {
  return function(...t) {
    if (process.env.NODE_ENV !== "production") {
      const r = t[0] ? `on key "${t[0]}" ` : "";
      Ve(
        `${on(e)} operation ${r}failed: target is readonly.`,
        X(this)
      );
    }
    return e === "delete" ? !1 : e === "clear" ? void 0 : this;
  };
}
function ic(e, t) {
  const r = {
    get(i) {
      const s = this.__v_raw, c = X(s), a = X(i);
      e || (ht(i, a) && Ne(c, "get", i), Ne(c, "get", a));
      const { has: f } = hr(c), _ = t ? ns : e ? ss : $e;
      if (f.call(c, i))
        return _(s.get(i));
      if (f.call(c, a))
        return _(s.get(a));
      s !== c && s.get(i);
    },
    get size() {
      const i = this.__v_raw;
      return !e && Ne(X(i), "iterate", Ot), Reflect.get(i, "size", i);
    },
    has(i) {
      const s = this.__v_raw, c = X(s), a = X(i);
      return e || (ht(i, a) && Ne(c, "has", i), Ne(c, "has", a)), i === a ? s.has(i) : s.has(i) || s.has(a);
    },
    forEach(i, s) {
      const c = this, a = c.__v_raw, f = X(a), _ = t ? ns : e ? ss : $e;
      return !e && Ne(f, "iterate", Ot), a.forEach((p, h) => i.call(s, _(p), _(h), c));
    }
  };
  return Xe(
    r,
    e ? {
      add: pr("add"),
      set: pr("set"),
      delete: pr("delete"),
      clear: pr("clear")
    } : {
      add(i) {
        !t && !Pe(i) && !Ze(i) && (i = X(i));
        const s = X(this);
        return hr(s).has.call(s, i) || (s.add(i), nt(s, "add", i, i)), this;
      },
      set(i, s) {
        !t && !Pe(s) && !Ze(s) && (s = X(s));
        const c = X(this), { has: a, get: f } = hr(c);
        let _ = a.call(c, i);
        _ ? process.env.NODE_ENV !== "production" && xs(c, a, i) : (i = X(i), _ = a.call(c, i));
        const p = f.call(c, i);
        return c.set(i, s), _ ? ht(s, p) && nt(c, "set", i, s, p) : nt(c, "add", i, s), this;
      },
      delete(i) {
        const s = X(this), { has: c, get: a } = hr(s);
        let f = c.call(s, i);
        f ? process.env.NODE_ENV !== "production" && xs(s, c, i) : (i = X(i), f = c.call(s, i));
        const _ = a ? a.call(s, i) : void 0, p = s.delete(i);
        return f && nt(s, "delete", i, void 0, _), p;
      },
      clear() {
        const i = X(this), s = i.size !== 0, c = process.env.NODE_ENV !== "production" ? Rt(i) ? new Map(i) : new Set(i) : void 0, a = i.clear();
        return s && nt(
          i,
          "clear",
          void 0,
          void 0,
          c
        ), a;
      }
    }
  ), [
    "keys",
    "values",
    "entries",
    Symbol.iterator
  ].forEach((i) => {
    r[i] = sc(i, e, t);
  }), r;
}
function vn(e, t) {
  const r = ic(e, t);
  return (n, i, s) => i === "__v_isReactive" ? !e : i === "__v_isReadonly" ? e : i === "__v_raw" ? n : Reflect.get(
    es(r, i) && i in n ? r : n,
    i,
    s
  );
}
const oc = {
  get: /* @__PURE__ */ vn(!1, !1)
}, ac = {
  get: /* @__PURE__ */ vn(!1, !0)
}, cc = {
  get: /* @__PURE__ */ vn(!0, !1)
}, uc = {
  get: /* @__PURE__ */ vn(!0, !0)
};
function xs(e, t, r) {
  const n = X(r);
  if (n !== r && t.call(e, n)) {
    const i = jo(e);
    Ve(
      `Reactive ${i} contains both the raw and reactive versions of the same object${i === "Map" ? " as keys" : ""}, which can lead to inconsistencies. Avoid differentiating between the raw and reactive versions of an object and only use the reactive version if possible.`
    );
  }
}
const Jo = /* @__PURE__ */ new WeakMap(), Wo = /* @__PURE__ */ new WeakMap(), Go = /* @__PURE__ */ new WeakMap(), Qo = /* @__PURE__ */ new WeakMap();
function lc(e) {
  switch (e) {
    case "Object":
    case "Array":
      return 1;
    case "Map":
    case "Set":
    case "WeakMap":
    case "WeakSet":
      return 2;
    default:
      return 0;
  }
}
function fc(e) {
  return e.__v_skip || !Object.isExtensible(e) ? 0 : lc(jo(e));
}
function $n(e) {
  return Ze(e) ? e : wn(
    e,
    !1,
    ec,
    oc,
    Jo
  );
}
function Bo(e) {
  return wn(
    e,
    !1,
    rc,
    ac,
    Wo
  );
}
function bn(e) {
  return wn(
    e,
    !0,
    tc,
    cc,
    Go
  );
}
function Yo(e) {
  return wn(
    e,
    !0,
    nc,
    uc,
    Qo
  );
}
function wn(e, t, r, n, i) {
  if (!be(e))
    return process.env.NODE_ENV !== "production" && Ve(
      `value cannot be made ${t ? "readonly" : "reactive"}: ${String(
        e
      )}`
    ), e;
  if (e.__v_raw && !(t && e.__v_isReactive))
    return e;
  const s = fc(e);
  if (s === 0)
    return e;
  const c = i.get(e);
  if (c)
    return c;
  const a = new Proxy(
    e,
    s === 2 ? n : r
  );
  return i.set(e, a), a;
}
function er(e) {
  return Ze(e) ? er(e.__v_raw) : !!(e && e.__v_isReactive);
}
function Ze(e) {
  return !!(e && e.__v_isReadonly);
}
function Pe(e) {
  return !!(e && e.__v_isShallow);
}
function or(e) {
  return e ? !!e.__v_raw : !1;
}
function X(e) {
  const t = e && e.__v_raw;
  return t ? X(t) : e;
}
const $e = (e) => be(e) ? $n(e) : e, ss = (e) => be(e) ? bn(e) : e;
function ye(e) {
  return e ? e.__v_isRef === !0 : !1;
}
function dc(e) {
  return hc(e, !1);
}
function hc(e, t) {
  return ye(e) ? e : new pc(e, t);
}
class pc {
  constructor(t, r) {
    this.dep = new Ps(), this.__v_isRef = !0, this.__v_isShallow = !1, this._rawValue = r ? t : X(t), this._value = r ? t : $e(t), this.__v_isShallow = r;
  }
  get value() {
    return process.env.NODE_ENV !== "production" ? this.dep.track({
      target: this,
      type: "get",
      key: "value"
    }) : this.dep.track(), this._value;
  }
  set value(t) {
    const r = this._rawValue, n = this.__v_isShallow || Pe(t) || Ze(t);
    t = n ? t : X(t), ht(t, r) && (this._rawValue = t, this._value = n ? t : $e(t), process.env.NODE_ENV !== "production" ? this.dep.trigger({
      target: this,
      type: "set",
      key: "value",
      newValue: t,
      oldValue: r
    }) : this.dep.trigger());
  }
}
function Te(e) {
  return ye(e) ? e.value : e;
}
function Xo(e) {
  process.env.NODE_ENV !== "production" && !or(e) && Ve("toRefs() expects a reactive object but received a plain one.");
  const t = ue(e) ? new Array(e.length) : {};
  for (const r in e)
    t[r] = yc(e, r);
  return t;
}
class mc {
  constructor(t, r, n) {
    this._object = t, this._key = r, this._defaultValue = n, this.__v_isRef = !0, this._value = void 0;
  }
  get value() {
    const t = this._object[this._key];
    return this._value = t === void 0 ? this._defaultValue : t;
  }
  set value(t) {
    this._object[this._key] = t;
  }
  get dep() {
    return Qa(X(this._object), this._key);
  }
}
function yc(e, t, r) {
  const n = e[t];
  return ye(n) ? n : new mc(e, t, r);
}
class _c {
  constructor(t, r, n) {
    this.fn = t, this.setter = r, this._value = void 0, this.dep = new Ps(this), this.__v_isRef = !0, this.deps = void 0, this.depsTail = void 0, this.flags = 16, this.globalVersion = sr - 1, this.next = void 0, this.effect = this, this.__v_isReadonly = !r, this.isSSR = n;
  }
  /**
   * @internal
   */
  notify() {
    if (this.flags |= 16, !(this.flags & 8) && // avoid infinite self recursion
    ne !== this)
      return Ao(this, !0), !0;
    process.env.NODE_ENV;
  }
  get value() {
    const t = process.env.NODE_ENV !== "production" ? this.dep.track({
      target: this,
      type: "get",
      key: "value"
    }) : this.dep.track();
    return Fo(this), t && (t.version = this.dep.version), this._value;
  }
  set value(t) {
    this.setter ? this.setter(t) : process.env.NODE_ENV !== "production" && Ve("Write operation failed: computed value is readonly");
  }
}
function gc(e, t, r = !1) {
  let n, i;
  le(e) ? n = e : (n = e.get, i = e.set);
  const s = new _c(n, i, r);
  return process.env.NODE_ENV, s;
}
const mr = {}, cn = /* @__PURE__ */ new WeakMap();
let gt;
function vc(e, t = !1, r = gt) {
  if (r) {
    let n = cn.get(r);
    n || cn.set(r, n = []), n.push(e);
  } else process.env.NODE_ENV !== "production" && !t && Ve(
    "onWatcherCleanup() was called when there was no active watcher to associate with."
  );
}
function $c(e, t, r = nr) {
  const { immediate: n, deep: i, once: s, scheduler: c, augmentJob: a, call: f } = r, _ = (m) => {
    (r.onWarn || Ve)(
      "Invalid watch source: ",
      m,
      "A watch source can only be a getter/effect function, a ref, a reactive object, or an array of these types."
    );
  }, p = (m) => i ? m : Pe(m) || i === !1 || i === 0 ? st(m, 1) : st(m);
  let h, b, w, S, v = !1, d = !1;
  if (ye(e) ? (b = () => e.value, v = Pe(e)) : er(e) ? (b = () => p(e), v = !0) : ue(e) ? (d = !0, v = e.some((m) => er(m) || Pe(m)), b = () => e.map((m) => {
    if (ye(m))
      return m.value;
    if (er(m))
      return p(m);
    if (le(m))
      return f ? f(m, 2) : m();
    process.env.NODE_ENV !== "production" && _(m);
  })) : le(e) ? t ? b = f ? () => f(e, 2) : e : b = () => {
    if (w) {
      fr();
      try {
        w();
      } finally {
        dr();
      }
    }
    const m = gt;
    gt = h;
    try {
      return f ? f(e, 3, [S]) : e(S);
    } finally {
      gt = m;
    }
  } : (b = qt, process.env.NODE_ENV !== "production" && _(e)), t && i) {
    const m = b, $ = i === !0 ? 1 / 0 : i;
    b = () => st(m(), $);
  }
  const u = () => {
    h.stop();
  };
  if (s && t) {
    const m = t;
    t = (...$) => {
      m(...$), u();
    };
  }
  let o = d ? new Array(e.length).fill(mr) : mr;
  const l = (m) => {
    if (!(!(h.flags & 1) || !h.dirty && !m))
      if (t) {
        const $ = h.run();
        if (i || v || (d ? $.some((g, E) => ht(g, o[E])) : ht($, o))) {
          w && w();
          const g = gt;
          gt = h;
          try {
            const E = [
              $,
              // pass undefined as the old value when it's changed for the first time
              o === mr ? void 0 : d && o[0] === mr ? [] : o,
              S
            ];
            o = $, f ? f(t, 3, E) : (
              // @ts-expect-error
              t(...E)
            );
          } finally {
            gt = g;
          }
        }
      } else
        h.run();
  };
  return a && a(l), h = new Ja(b), h.scheduler = c ? () => c(l, !1) : l, S = (m) => vc(m, !1, h), w = h.onStop = () => {
    const m = cn.get(h);
    if (m) {
      if (f)
        f(m, 4);
      else
        for (const $ of m) $();
      cn.delete(h);
    }
  }, process.env.NODE_ENV !== "production" && (h.onTrack = r.onTrack, h.onTrigger = r.onTrigger), t ? n ? l(!0) : o = h.run() : c ? c(l.bind(null, !0), !0) : h.run(), u.pause = h.pause.bind(h), u.resume = h.resume.bind(h), u.stop = u, u;
}
function st(e, t = 1 / 0, r) {
  if (t <= 0 || !be(e) || e.__v_skip || (r = r || /* @__PURE__ */ new Set(), r.has(e)))
    return e;
  if (r.add(e), t--, ye(e))
    st(e.value, t, r);
  else if (ue(e))
    for (let n = 0; n < e.length; n++)
      st(e[n], t, r);
  else if (No(e) || Rt(e))
    e.forEach((n) => {
      st(n, t, r);
    });
  else if (To(e)) {
    for (const n in e)
      st(e[n], t, r);
    for (const n of Object.getOwnPropertySymbols(e))
      Object.prototype.propertyIsEnumerable.call(e, n) && st(e[n], t, r);
  }
  return e;
}
/**
* @vue/runtime-core v3.5.17
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
const Nt = [];
function bc(e) {
  Nt.push(e);
}
function wc() {
  Nt.pop();
}
let Fn = !1;
function pe(e, ...t) {
  if (Fn) return;
  Fn = !0, fr();
  const r = Nt.length ? Nt[Nt.length - 1].component : null, n = r && r.appContext.config.warnHandler, i = Ec();
  if (n)
    En(
      n,
      r,
      11,
      [
        // eslint-disable-next-line no-restricted-syntax
        e + t.map((s) => {
          var c, a;
          return (a = (c = s.toString) == null ? void 0 : c.call(s)) != null ? a : JSON.stringify(s);
        }).join(""),
        r && r.proxy,
        i.map(
          ({ vnode: s }) => `at <${ga(r, s.type)}>`
        ).join(`
`),
        i
      ]
    );
  else {
    const s = [`[Vue warn]: ${e}`, ...t];
    i.length && s.push(`
`, ...Sc(i)), console.warn(...s);
  }
  dr(), Fn = !1;
}
function Ec() {
  let e = Nt[Nt.length - 1];
  if (!e)
    return [];
  const t = [];
  for (; e; ) {
    const r = t[0];
    r && r.vnode === e ? r.recurseCount++ : t.push({
      vnode: e,
      recurseCount: 0
    });
    const n = e.component && e.component.parent;
    e = n && n.vnode;
  }
  return t;
}
function Sc(e) {
  const t = [];
  return e.forEach((r, n) => {
    t.push(...n === 0 ? [] : [`
`], ...Rc(r));
  }), t;
}
function Rc({ vnode: e, recurseCount: t }) {
  const r = t > 0 ? `... (${t} recursive calls)` : "", n = e.component ? e.component.parent == null : !1, i = ` at <${ga(
    e.component,
    e.type,
    n
  )}`, s = ">" + r;
  return e.props ? [i, ...Oc(e.props), s] : [i + s];
}
function Oc(e) {
  const t = [], r = Object.keys(e);
  return r.slice(0, 3).forEach((n) => {
    t.push(...Zo(n, e[n]));
  }), r.length > 3 && t.push(" ..."), t;
}
function Zo(e, t, r) {
  return Le(t) ? (t = JSON.stringify(t), r ? t : [`${e}=${t}`]) : typeof t == "number" || typeof t == "boolean" || t == null ? r ? t : [`${e}=${t}`] : ye(t) ? (t = Zo(e, X(t.value), !0), r ? t : [`${e}=Ref<`, t, ">"]) : le(t) ? [`${e}=fn${t.name ? `<${t.name}>` : ""}`] : (t = X(t), r ? t : [`${e}=`, t]);
}
const ea = {
  sp: "serverPrefetch hook",
  bc: "beforeCreate hook",
  c: "created hook",
  bm: "beforeMount hook",
  m: "mounted hook",
  bu: "beforeUpdate hook",
  u: "updated",
  bum: "beforeUnmount hook",
  um: "unmounted hook",
  a: "activated hook",
  da: "deactivated hook",
  ec: "errorCaptured hook",
  rtc: "renderTracked hook",
  rtg: "renderTriggered hook",
  0: "setup function",
  1: "render function",
  2: "watcher getter",
  3: "watcher callback",
  4: "watcher cleanup function",
  5: "native event handler",
  6: "component event handler",
  7: "vnode hook",
  8: "directive hook",
  9: "transition hook",
  10: "app errorHandler",
  11: "app warnHandler",
  12: "ref function",
  13: "async component loader",
  14: "scheduler flush",
  15: "component update",
  16: "app unmount cleanup function"
};
function En(e, t, r, n) {
  try {
    return n ? e(...n) : e();
  } catch (i) {
    Ts(i, t, r);
  }
}
function ta(e, t, r, n) {
  if (le(e)) {
    const i = En(e, t, r, n);
    return i && Ua(i) && i.catch((s) => {
      Ts(s, t, r);
    }), i;
  }
  if (ue(e)) {
    const i = [];
    for (let s = 0; s < e.length; s++)
      i.push(ta(e[s], t, r, n));
    return i;
  } else process.env.NODE_ENV !== "production" && pe(
    `Invalid value type passed to callWithAsyncErrorHandling(): ${typeof e}`
  );
}
function Ts(e, t, r, n = !0) {
  const i = t ? t.vnode : null, { errorHandler: s, throwUnhandledErrorInProduction: c } = t && t.appContext.config || nr;
  if (t) {
    let a = t.parent;
    const f = t.proxy, _ = process.env.NODE_ENV !== "production" ? ea[r] : `https://vuejs.org/error-reference/#runtime-${r}`;
    for (; a; ) {
      const p = a.ec;
      if (p) {
        for (let h = 0; h < p.length; h++)
          if (p[h](e, f, _) === !1)
            return;
      }
      a = a.parent;
    }
    if (s) {
      fr(), En(s, null, 10, [
        e,
        f,
        _
      ]), dr();
      return;
    }
  }
  Nc(e, r, i, n, c);
}
function Nc(e, t, r, n = !0, i = !1) {
  if (process.env.NODE_ENV !== "production") {
    const s = ea[t];
    if (r && bc(r), pe(`Unhandled error${s ? ` during execution of ${s}` : ""}`), r && wc(), n)
      throw e;
    console.error(e);
  } else {
    if (i)
      throw e;
    console.error(e);
  }
}
const De = [];
let We = -1;
const At = [];
let rt = null, kt = 0;
const Pc = /* @__PURE__ */ Promise.resolve();
let is = null;
const jc = 100;
function Tc(e) {
  let t = We + 1, r = De.length;
  for (; t < r; ) {
    const n = t + r >>> 1, i = De[n], s = ar(i);
    s < e || s === e && i.flags & 2 ? t = n + 1 : r = n;
  }
  return t;
}
function ra(e) {
  if (!(e.flags & 1)) {
    const t = ar(e), r = De[De.length - 1];
    !r || // fast path when the job id is larger than the tail
    !(e.flags & 2) && t >= ar(r) ? De.push(e) : De.splice(Tc(t), 0, e), e.flags |= 1, na();
  }
}
function na() {
  is || (is = Pc.then(ia));
}
function sa(e) {
  ue(e) ? At.push(...e) : rt && e.id === -1 ? rt.splice(kt + 1, 0, e) : e.flags & 1 || (At.push(e), e.flags |= 1), na();
}
function Cc(e) {
  if (At.length) {
    const t = [...new Set(At)].sort(
      (r, n) => ar(r) - ar(n)
    );
    if (At.length = 0, rt) {
      rt.push(...t);
      return;
    }
    for (rt = t, process.env.NODE_ENV !== "production" && (e = e || /* @__PURE__ */ new Map()), kt = 0; kt < rt.length; kt++) {
      const r = rt[kt];
      process.env.NODE_ENV !== "production" && oa(e, r) || (r.flags & 4 && (r.flags &= -2), r.flags & 8 || r(), r.flags &= -2);
    }
    rt = null, kt = 0;
  }
}
const ar = (e) => e.id == null ? e.flags & 2 ? -1 : 1 / 0 : e.id;
function ia(e) {
  process.env.NODE_ENV !== "production" && (e = e || /* @__PURE__ */ new Map());
  const t = process.env.NODE_ENV !== "production" ? (r) => oa(e, r) : qt;
  try {
    for (We = 0; We < De.length; We++) {
      const r = De[We];
      if (r && !(r.flags & 8)) {
        if (process.env.NODE_ENV !== "production" && t(r))
          continue;
        r.flags & 4 && (r.flags &= -2), En(
          r,
          r.i,
          r.i ? 15 : 14
        ), r.flags & 4 || (r.flags &= -2);
      }
    }
  } finally {
    for (; We < De.length; We++) {
      const r = De[We];
      r && (r.flags &= -2);
    }
    We = -1, De.length = 0, Cc(e), is = null, (De.length || At.length) && ia(e);
  }
}
function oa(e, t) {
  const r = e.get(t) || 0;
  if (r > jc) {
    const n = t.i, i = n && ks(n.type);
    return Ts(
      `Maximum recursive updates exceeded${i ? ` in component <${i}>` : ""}. This means you have a reactive effect that is mutating its own dependencies and thus recursively triggering itself. Possible sources include component template, render function, updated hook or watcher source function.`,
      null,
      10
    ), !0;
  }
  return e.set(t, r + 1), !1;
}
const Un = /* @__PURE__ */ new Map();
process.env.NODE_ENV !== "production" && (gn().__VUE_HMR_RUNTIME__ = {
  createRecord: Ln(Ic),
  rerender: Ln(kc),
  reload: Ln(Dc)
});
const un = /* @__PURE__ */ new Map();
function Ic(e, t) {
  return un.has(e) ? !1 : (un.set(e, {
    initialDef: ln(t),
    instances: /* @__PURE__ */ new Set()
  }), !0);
}
function ln(e) {
  return va(e) ? e.__vccOpts : e;
}
function kc(e, t) {
  const r = un.get(e);
  r && (r.initialDef.render = t, [...r.instances].forEach((n) => {
    t && (n.render = t, ln(n.type).render = t), n.renderCache = [], n.update();
  }));
}
function Dc(e, t) {
  const r = un.get(e);
  if (!r) return;
  t = ln(t), Js(r.initialDef, t);
  const n = [...r.instances];
  for (let i = 0; i < n.length; i++) {
    const s = n[i], c = ln(s.type);
    let a = Un.get(c);
    a || (c !== r.initialDef && Js(c, t), Un.set(c, a = /* @__PURE__ */ new Set())), a.add(s), s.appContext.propsCache.delete(s.type), s.appContext.emitsCache.delete(s.type), s.appContext.optionsCache.delete(s.type), s.ceReload ? (a.add(s), s.ceReload(t.styles), a.delete(s)) : s.parent ? ra(() => {
      s.parent.update(), a.delete(s);
    }) : s.appContext.reload ? s.appContext.reload() : typeof window < "u" ? window.location.reload() : console.warn(
      "[HMR] Root or manually mounted instance modified. Full reload required."
    ), s.root.ce && s !== s.root && s.root.ce._removeChildStyle(c);
  }
  sa(() => {
    Un.clear();
  });
}
function Js(e, t) {
  Xe(e, t);
  for (const r in e)
    r !== "__file" && !(r in t) && delete e[r];
}
function Ln(e) {
  return (t, r) => {
    try {
      return e(t, r);
    } catch (n) {
      console.error(n), console.warn(
        "[HMR] Something went wrong during Vue component hot-reload. Full reload required."
      );
    }
  };
}
let it, Bt = [], os = !1;
function qc(e, ...t) {
  it ? it.emit(e, ...t) : os || Bt.push({ event: e, args: t });
}
function aa(e, t) {
  var r, n;
  it = e, it ? (it.enabled = !0, Bt.forEach(({ event: i, args: s }) => it.emit(i, ...s)), Bt = []) : /* handle late devtools injection - only do this if we are in an actual */ /* browser environment to avoid the timer handle stalling test runner exit */ /* (#4815) */ typeof window < "u" && // some envs mock window but not fully
  window.HTMLElement && // also exclude jsdom
  // eslint-disable-next-line no-restricted-syntax
  !((n = (r = window.navigator) == null ? void 0 : r.userAgent) != null && n.includes("jsdom")) ? ((t.__VUE_DEVTOOLS_HOOK_REPLAY__ = t.__VUE_DEVTOOLS_HOOK_REPLAY__ || []).push((s) => {
    aa(s, t);
  }), setTimeout(() => {
    it || (t.__VUE_DEVTOOLS_HOOK_REPLAY__ = null, os = !0, Bt = []);
  }, 3e3)) : (os = !0, Bt = []);
}
const Ac = /* @__PURE__ */ Mc(
  "component:updated"
  /* COMPONENT_UPDATED */
);
/*! #__NO_SIDE_EFFECTS__ */
// @__NO_SIDE_EFFECTS__
function Mc(e) {
  return (t) => {
    qc(
      e,
      t.appContext.app,
      t.uid,
      t.parent ? t.parent.uid : void 0,
      t
    );
  };
}
let Ce = null, ca = null;
function Ws(e) {
  const t = Ce;
  return Ce = e, ca = e && e.type.__scopeId || null, t;
}
function _e(e, t = Ce, r) {
  if (!t || e._n)
    return e;
  const n = (...i) => {
    n._d && Qs(-1);
    const s = Ws(t);
    let c;
    try {
      c = e(...i);
    } finally {
      Ws(s), n._d && Qs(1);
    }
    return process.env.NODE_ENV !== "production" && Ac(t), c;
  };
  return n._n = !0, n._c = !0, n._d = !0, n;
}
const Vc = (e) => e.__isTeleport;
function ua(e, t) {
  e.shapeFlag & 6 && e.component ? (e.transition = t, ua(e.component.subTree, t)) : e.shapeFlag & 128 ? (e.ssContent.transition = t.clone(e.ssContent), e.ssFallback.transition = t.clone(e.ssFallback)) : e.transition = t;
}
/*! #__NO_SIDE_EFFECTS__ */
// @__NO_SIDE_EFFECTS__
function Fc(e, t) {
  return le(e) ? (
    // #8236: extend call and options.name access are considered side-effects
    // by Rollup, so we have to wrap it in a pure-annotated IIFE.
    Xe({ name: e.name }, t, { setup: e })
  ) : e;
}
gn().requestIdleCallback;
gn().cancelIdleCallback;
const Uc = "components";
function et(e, t) {
  return zc(Uc, e, !0, t) || e;
}
const Lc = Symbol.for("v-ndc");
function zc(e, t, r = !0, n = !1) {
  const i = Ce || Ht;
  if (i) {
    const s = i.type;
    {
      const a = ks(
        s,
        !1
      );
      if (a && (a === t || a === sn(t) || a === on(sn(t))))
        return s;
    }
    const c = (
      // local registration
      // check instance[type] first which is resolved for options API
      Gs(i[e] || s[e], t) || // global registration
      Gs(i.appContext[e], t)
    );
    return !c && n ? s : (process.env.NODE_ENV !== "production" && r && !c && pe(`Failed to resolve ${e.slice(0, -1)}: ${t}
If this is a native custom element, make sure to exclude it from component resolution via compilerOptions.isCustomElement.`), c);
  } else process.env.NODE_ENV !== "production" && pe(
    `resolve${on(e.slice(0, -1))} can only be used in render() or setup().`
  );
}
function Gs(e, t) {
  return e && (e[t] || e[sn(t)] || e[on(sn(t))]);
}
const Kc = {};
process.env.NODE_ENV !== "production" && (Kc.ownKeys = (e) => (pe(
  "Avoid app logic that relies on enumerating keys on a component instance. The keys will be empty in production mode to avoid performance overhead."
), Reflect.ownKeys(e)));
let la = null;
function fa(e, t, r = !1) {
  const n = Ht || Ce;
  if (n || la) {
    let i = n ? n.parent == null || n.ce ? n.vnode.appContext && n.vnode.appContext.provides : n.parent.provides : void 0;
    if (i && e in i)
      return i[e];
    if (arguments.length > 1)
      return r && le(t) ? t.call(n && n.proxy) : t;
    process.env.NODE_ENV !== "production" && pe(`injection "${String(e)}" not found.`);
  } else process.env.NODE_ENV !== "production" && pe("inject() can only be used inside setup() or functional components.");
}
function Hc() {
  return !!(Ht || Ce || la);
}
const xc = {}, da = (e) => Object.getPrototypeOf(e) === xc, Jc = Yc, Wc = Symbol.for("v-scx"), Gc = () => {
  {
    const e = fa(Wc);
    return e || process.env.NODE_ENV !== "production" && pe(
      "Server rendering context not provided. Make sure to only call useSSRContext() conditionally in the server build."
    ), e;
  }
};
function Dt(e, t, r) {
  return process.env.NODE_ENV !== "production" && !le(t) && pe(
    "`watch(fn, options?)` signature has been moved to a separate API. Use `watchEffect(fn, options?)` instead. `watch` now only supports `watch(source, cb, options?) signature."
  ), Qc(e, t, r);
}
function Qc(e, t, r = nr) {
  const { immediate: n, deep: i, flush: s, once: c } = r;
  process.env.NODE_ENV !== "production" && !t && (n !== void 0 && pe(
    'watch() "immediate" option is only respected when using the watch(source, callback, options?) signature.'
  ), i !== void 0 && pe(
    'watch() "deep" option is only respected when using the watch(source, callback, options?) signature.'
  ), c !== void 0 && pe(
    'watch() "once" option is only respected when using the watch(source, callback, options?) signature.'
  ));
  const a = Xe({}, r);
  process.env.NODE_ENV !== "production" && (a.onWarn = pe);
  const f = t && n || !t && s !== "post";
  let _;
  if (dn) {
    if (s === "sync") {
      const w = Gc();
      _ = w.__watcherHandles || (w.__watcherHandles = []);
    } else if (!f) {
      const w = () => {
      };
      return w.stop = qt, w.resume = qt, w.pause = qt, w;
    }
  }
  const p = Ht;
  a.call = (w, S, v) => ta(w, p, S, v);
  let h = !1;
  s === "post" ? a.scheduler = (w) => {
    Jc(w, p && p.suspense);
  } : s !== "sync" && (h = !0, a.scheduler = (w, S) => {
    S ? w() : ra(w);
  }), a.augmentJob = (w) => {
    t && (w.flags |= 4), h && (w.flags |= 2, p && (w.id = p.uid, w.i = p));
  };
  const b = $c(e, t, a);
  return dn && (_ ? _.push(b) : f && b()), b;
}
const Bc = (e) => e.__isSuspense;
function Yc(e, t) {
  t && t.pendingBranch ? ue(e) ? t.effects.push(...e) : t.effects.push(e) : sa(e);
}
const ha = Symbol.for("v-fgt"), Xc = Symbol.for("v-txt"), as = Symbol.for("v-cmt"), tn = [];
let Ie = null;
function Ge(e = !1) {
  tn.push(Ie = e ? null : []);
}
function Zc() {
  tn.pop(), Ie = tn[tn.length - 1] || null;
}
let cr = 1;
function Qs(e, t = !1) {
  cr += e, e < 0 && Ie && t && (Ie.hasOnce = !0);
}
function pa(e) {
  return e.dynamicChildren = cr > 0 ? Ie || Ma : null, Zc(), cr > 0 && Ie && Ie.push(e), e;
}
function Bs(e, t, r, n, i, s) {
  return pa(
    Cs(
      e,
      t,
      r,
      n,
      i,
      s,
      !0
    )
  );
}
function vt(e, t, r, n, i) {
  return pa(
    $t(
      e,
      t,
      r,
      n,
      i,
      !0
    )
  );
}
function eu(e) {
  return e ? e.__v_isVNode === !0 : !1;
}
const tu = (...e) => ya(
  ...e
), ma = ({ key: e }) => e ?? null, rn = ({
  ref: e,
  ref_key: t,
  ref_for: r
}) => (typeof e == "number" && (e = "" + e), e != null ? Le(e) || ye(e) || le(e) ? { i: Ce, r: e, k: t, f: !!r } : e : null);
function Cs(e, t = null, r = null, n = 0, i = null, s = e === ha ? 0 : 1, c = !1, a = !1) {
  const f = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && ma(t),
    ref: t && rn(t),
    scopeId: ca,
    slotScopeIds: null,
    children: r,
    component: null,
    suspense: null,
    ssContent: null,
    ssFallback: null,
    dirs: null,
    transition: null,
    el: null,
    anchor: null,
    target: null,
    targetStart: null,
    targetAnchor: null,
    staticCount: 0,
    shapeFlag: s,
    patchFlag: n,
    dynamicProps: i,
    dynamicChildren: null,
    appContext: null,
    ctx: Ce
  };
  return a ? (Is(f, r), s & 128 && e.normalize(f)) : r && (f.shapeFlag |= Le(r) ? 8 : 16), process.env.NODE_ENV !== "production" && f.key !== f.key && pe("VNode created with invalid key (NaN). VNode type:", f.type), cr > 0 && // avoid a block node from tracking itself
  !c && // has current parent block
  Ie && // presence of a patch flag indicates this node needs patching on updates.
  // component nodes also should always be patched, because even if the
  // component doesn't need to update, it needs to persist the instance on to
  // the next vnode so that it can be properly unmounted later.
  (f.patchFlag > 0 || s & 6) && // the EVENTS flag is only for hydration and if it is the only flag, the
  // vnode should not be considered dynamic due to handler caching.
  f.patchFlag !== 32 && Ie.push(f), f;
}
const $t = process.env.NODE_ENV !== "production" ? tu : ya;
function ya(e, t = null, r = null, n = 0, i = null, s = !1) {
  if ((!e || e === Lc) && (process.env.NODE_ENV !== "production" && !e && pe(`Invalid vnode type when creating vnode: ${e}.`), e = as), eu(e)) {
    const a = fn(
      e,
      t,
      !0
      /* mergeRef: true */
    );
    return r && Is(a, r), cr > 0 && !s && Ie && (a.shapeFlag & 6 ? Ie[Ie.indexOf(e)] = a : Ie.push(a)), a.patchFlag = -2, a;
  }
  if (va(e) && (e = e.__vccOpts), t) {
    t = ru(t);
    let { class: a, style: f } = t;
    a && !Le(a) && (t.class = Ss(a)), be(f) && (or(f) && !ue(f) && (f = Xe({}, f)), t.style = Es(f));
  }
  const c = Le(e) ? 1 : Bc(e) ? 128 : Vc(e) ? 64 : be(e) ? 4 : le(e) ? 2 : 0;
  return process.env.NODE_ENV !== "production" && c & 4 && or(e) && (e = X(e), pe(
    "Vue received a Component that was made a reactive object. This can lead to unnecessary performance overhead and should be avoided by marking the component with `markRaw` or using `shallowRef` instead of `ref`.",
    `
Component that was made reactive: `,
    e
  )), Cs(
    e,
    t,
    r,
    n,
    i,
    c,
    s,
    !0
  );
}
function ru(e) {
  return e ? or(e) || da(e) ? Xe({}, e) : e : null;
}
function fn(e, t, r = !1, n = !1) {
  const { props: i, ref: s, patchFlag: c, children: a, transition: f } = e, _ = t ? nu(i || {}, t) : i, p = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: _,
    key: _ && ma(_),
    ref: t && t.ref ? (
      // #2078 in the case of <component :is="vnode" ref="extra"/>
      // if the vnode itself already has a ref, cloneVNode will need to merge
      // the refs so the single vnode can be set on multiple refs
      r && s ? ue(s) ? s.concat(rn(t)) : [s, rn(t)] : rn(t)
    ) : s,
    scopeId: e.scopeId,
    slotScopeIds: e.slotScopeIds,
    children: process.env.NODE_ENV !== "production" && c === -1 && ue(a) ? a.map(_a) : a,
    target: e.target,
    targetStart: e.targetStart,
    targetAnchor: e.targetAnchor,
    staticCount: e.staticCount,
    shapeFlag: e.shapeFlag,
    // if the vnode is cloned with extra props, we can no longer assume its
    // existing patch flag to be reliable and need to add the FULL_PROPS flag.
    // note: preserve flag for fragments since they use the flag for children
    // fast paths only.
    patchFlag: t && e.type !== ha ? c === -1 ? 16 : c | 16 : c,
    dynamicProps: e.dynamicProps,
    dynamicChildren: e.dynamicChildren,
    appContext: e.appContext,
    dirs: e.dirs,
    transition: f,
    // These should technically only be non-null on mounted VNodes. However,
    // they *should* be copied for kept-alive vnodes. So we just always copy
    // them since them being non-null during a mount doesn't affect the logic as
    // they will simply be overwritten.
    component: e.component,
    suspense: e.suspense,
    ssContent: e.ssContent && fn(e.ssContent),
    ssFallback: e.ssFallback && fn(e.ssFallback),
    el: e.el,
    anchor: e.anchor,
    ctx: e.ctx,
    ce: e.ce
  };
  return f && n && ua(
    p,
    f.clone(p)
  ), p;
}
function _a(e) {
  const t = fn(e);
  return ue(e.children) && (t.children = e.children.map(_a)), t;
}
function Qe(e = " ", t = 0) {
  return $t(Xc, null, e, t);
}
function yr(e = "", t = !1) {
  return t ? (Ge(), vt(as, null, e)) : $t(as, null, e);
}
function Is(e, t) {
  let r = 0;
  const { shapeFlag: n } = e;
  if (t == null)
    t = null;
  else if (ue(t))
    r = 16;
  else if (typeof t == "object")
    if (n & 65) {
      const i = t.default;
      i && (i._c && (i._d = !1), Is(e, i()), i._c && (i._d = !0));
      return;
    } else {
      r = 32;
      const i = t._;
      !i && !da(t) ? t._ctx = Ce : i === 3 && Ce && (Ce.slots._ === 1 ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024));
    }
  else le(t) ? (t = { default: t, _ctx: Ce }, r = 32) : (t = String(t), n & 64 ? (r = 16, t = [Qe(t)]) : r = 8);
  e.children = t, e.shapeFlag |= r;
}
function nu(...e) {
  const t = {};
  for (let r = 0; r < e.length; r++) {
    const n = e[r];
    for (const i in n)
      if (i === "class")
        t.class !== n.class && (t.class = Ss([t.class, n.class]));
      else if (i === "style")
        t.style = Es([t.style, n.style]);
      else if (Va(i)) {
        const s = t[i], c = n[i];
        c && s !== c && !(ue(s) && s.includes(c)) && (t[i] = s ? [].concat(s, c) : c);
      } else i !== "" && (t[i] = n[i]);
  }
  return t;
}
let Ht = null;
const su = () => Ht || Ce;
{
  const e = gn(), t = (r, n) => {
    let i;
    return (i = e[r]) || (i = e[r] = []), i.push(n), (s) => {
      i.length > 1 ? i.forEach((c) => c(s)) : i[0](s);
    };
  };
  t(
    "__VUE_INSTANCE_SETTERS__",
    (r) => Ht = r
  ), t(
    "__VUE_SSR_SETTERS__",
    (r) => dn = r
  );
}
let dn = !1;
process.env.NODE_ENV;
const iu = /(?:^|[-_])(\w)/g, ou = (e) => e.replace(iu, (t) => t.toUpperCase()).replace(/[-_]/g, "");
function ks(e, t = !0) {
  return le(e) ? e.displayName || e.name : e.name || t && e.__name;
}
function ga(e, t, r = !1) {
  let n = ks(t);
  if (!n && t.__file) {
    const i = t.__file.match(/([^/\\]+)\.\w+$/);
    i && (n = i[1]);
  }
  if (!n && e && e.parent) {
    const i = (s) => {
      for (const c in s)
        if (s[c] === t)
          return c;
    };
    n = i(
      e.components || e.parent.type.components
    ) || i(e.appContext.components);
  }
  return n ? ou(n) : r ? "App" : "Anonymous";
}
function va(e) {
  return le(e) && "__vccOpts" in e;
}
const $a = (e, t) => {
  const r = gc(e, t, dn);
  if (process.env.NODE_ENV !== "production") {
    const n = su();
    n && n.appContext.config.warnRecursiveComputed && (r._warnRecursive = !0);
  }
  return r;
};
function au() {
  if (process.env.NODE_ENV === "production" || typeof window > "u")
    return;
  const e = { style: "color:#3ba776" }, t = { style: "color:#1677ff" }, r = { style: "color:#f5222d" }, n = { style: "color:#eb2f96" }, i = {
    __vue_custom_formatter: !0,
    header(h) {
      if (!be(h))
        return null;
      if (h.__isVue)
        return ["div", e, "VueInstance"];
      if (ye(h)) {
        fr();
        const b = h.value;
        return dr(), [
          "div",
          {},
          ["span", e, p(h)],
          "<",
          a(b),
          ">"
        ];
      } else {
        if (er(h))
          return [
            "div",
            {},
            ["span", e, Pe(h) ? "ShallowReactive" : "Reactive"],
            "<",
            a(h),
            `>${Ze(h) ? " (readonly)" : ""}`
          ];
        if (Ze(h))
          return [
            "div",
            {},
            ["span", e, Pe(h) ? "ShallowReadonly" : "Readonly"],
            "<",
            a(h),
            ">"
          ];
      }
      return null;
    },
    hasBody(h) {
      return h && h.__isVue;
    },
    body(h) {
      if (h && h.__isVue)
        return [
          "div",
          {},
          ...s(h.$)
        ];
    }
  };
  function s(h) {
    const b = [];
    h.type.props && h.props && b.push(c("props", X(h.props))), h.setupState !== nr && b.push(c("setup", h.setupState)), h.data !== nr && b.push(c("data", X(h.data)));
    const w = f(h, "computed");
    w && b.push(c("computed", w));
    const S = f(h, "inject");
    return S && b.push(c("injected", S)), b.push([
      "div",
      {},
      [
        "span",
        {
          style: n.style + ";opacity:0.66"
        },
        "$ (internal): "
      ],
      ["object", { object: h }]
    ]), b;
  }
  function c(h, b) {
    return b = Xe({}, b), Object.keys(b).length ? [
      "div",
      { style: "line-height:1.25em;margin-bottom:0.6em" },
      [
        "div",
        {
          style: "color:#476582"
        },
        h
      ],
      [
        "div",
        {
          style: "padding-left:1.25em"
        },
        ...Object.keys(b).map((w) => [
          "div",
          {},
          ["span", n, w + ": "],
          a(b[w], !1)
        ])
      ]
    ] : ["span", {}];
  }
  function a(h, b = !0) {
    return typeof h == "number" ? ["span", t, h] : typeof h == "string" ? ["span", r, JSON.stringify(h)] : typeof h == "boolean" ? ["span", n, h] : be(h) ? ["object", { object: b ? X(h) : h }] : ["span", r, String(h)];
  }
  function f(h, b) {
    const w = h.type;
    if (le(w))
      return;
    const S = {};
    for (const v in h.ctx)
      _(w, v, b) && (S[v] = h.ctx[v]);
    return S;
  }
  function _(h, b, w) {
    const S = h[w];
    if (ue(S) && S.includes(b) || be(S) && b in S || h.extends && _(h.extends, b, w) || h.mixins && h.mixins.some((v) => _(v, b, w)))
      return !0;
  }
  function p(h) {
    return Pe(h) ? "ShallowRef" : h.effect ? "ComputedRef" : "Ref";
  }
  window.devtoolsFormatters ? window.devtoolsFormatters.push(i) : window.devtoolsFormatters = [i];
}
process.env.NODE_ENV;
process.env.NODE_ENV;
process.env.NODE_ENV;
/**
* vue v3.5.17
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
function cu() {
  au();
}
process.env.NODE_ENV !== "production" && cu();
var Sn = class {
  constructor() {
    this.listeners = /* @__PURE__ */ new Set(), this.subscribe = this.subscribe.bind(this);
  }
  subscribe(e) {
    return this.listeners.add(e), this.onSubscribe(), () => {
      this.listeners.delete(e), this.onUnsubscribe();
    };
  }
  hasListeners() {
    return this.listeners.size > 0;
  }
  onSubscribe() {
  }
  onUnsubscribe() {
  }
}, hn = typeof window > "u" || "Deno" in globalThis;
function uu() {
}
function Ys(e) {
  return typeof e == "number" && e >= 0 && e !== 1 / 0;
}
function lu(e, t) {
  return Math.max(e + (t || 0) - Date.now(), 0);
}
function tr(e, t) {
  return typeof e == "function" ? e(t) : e;
}
function Ue(e, t) {
  return typeof e == "function" ? e(t) : e;
}
function Xs(e) {
  return JSON.stringify(
    e,
    (t, r) => us(r) ? Object.keys(r).sort().reduce((n, i) => (n[i] = r[i], n), {}) : r
  );
}
function cs(e, t) {
  if (e === t)
    return e;
  const r = Zs(e) && Zs(t);
  if (r || us(e) && us(t)) {
    const n = r ? e : Object.keys(e), i = n.length, s = r ? t : Object.keys(t), c = s.length, a = r ? [] : {}, f = new Set(n);
    let _ = 0;
    for (let p = 0; p < c; p++) {
      const h = r ? p : s[p];
      (!r && f.has(h) || r) && e[h] === void 0 && t[h] === void 0 ? (a[h] = void 0, _++) : (a[h] = cs(e[h], t[h]), a[h] === e[h] && e[h] !== void 0 && _++);
    }
    return i === c && _ === i ? e : a;
  }
  return t;
}
function pn(e, t) {
  if (!t || Object.keys(e).length !== Object.keys(t).length)
    return !1;
  for (const r in e)
    if (e[r] !== t[r])
      return !1;
  return !0;
}
function Zs(e) {
  return Array.isArray(e) && e.length === Object.keys(e).length;
}
function us(e) {
  if (!ei(e))
    return !1;
  const t = e.constructor;
  if (t === void 0)
    return !0;
  const r = t.prototype;
  return !(!ei(r) || !r.hasOwnProperty("isPrototypeOf") || Object.getPrototypeOf(e) !== Object.prototype);
}
function ei(e) {
  return Object.prototype.toString.call(e) === "[object Object]";
}
function ti(e, t, r) {
  if (typeof r.structuralSharing == "function")
    return r.structuralSharing(e, t);
  if (r.structuralSharing !== !1) {
    if (process.env.NODE_ENV !== "production")
      try {
        return cs(e, t);
      } catch (n) {
        throw console.error(
          `Structural sharing requires data to be JSON serializable. To fix this, turn off structuralSharing or return JSON-serializable data from your queryFn. [${r.queryHash}]: ${n}`
        ), n;
      }
    return cs(e, t);
  }
  return t;
}
function ls(e, t) {
  return typeof e == "function" ? e(...t) : !!e;
}
var bt, ot, Mt, Eo, fu = (Eo = class extends Sn {
  constructor() {
    super();
    oe(this, bt);
    oe(this, ot);
    oe(this, Mt);
    Q(this, Mt, (t) => {
      if (!hn && window.addEventListener) {
        const r = () => t();
        return window.addEventListener("visibilitychange", r, !1), () => {
          window.removeEventListener("visibilitychange", r);
        };
      }
    });
  }
  onSubscribe() {
    I(this, ot) || this.setEventListener(I(this, Mt));
  }
  onUnsubscribe() {
    var t;
    this.hasListeners() || ((t = I(this, ot)) == null || t.call(this), Q(this, ot, void 0));
  }
  setEventListener(t) {
    var r;
    Q(this, Mt, t), (r = I(this, ot)) == null || r.call(this), Q(this, ot, t((n) => {
      typeof n == "boolean" ? this.setFocused(n) : this.onFocus();
    }));
  }
  setFocused(t) {
    I(this, bt) !== t && (Q(this, bt, t), this.onFocus());
  }
  onFocus() {
    const t = this.isFocused();
    this.listeners.forEach((r) => {
      r(t);
    });
  }
  isFocused() {
    var t;
    return typeof I(this, bt) == "boolean" ? I(this, bt) : ((t = globalThis.document) == null ? void 0 : t.visibilityState) !== "hidden";
  }
}, bt = new WeakMap(), ot = new WeakMap(), Mt = new WeakMap(), Eo), du = new fu(), Vt, at, Ft, So, hu = (So = class extends Sn {
  constructor() {
    super();
    oe(this, Vt, !0);
    oe(this, at);
    oe(this, Ft);
    Q(this, Ft, (t) => {
      if (!hn && window.addEventListener) {
        const r = () => t(!0), n = () => t(!1);
        return window.addEventListener("online", r, !1), window.addEventListener("offline", n, !1), () => {
          window.removeEventListener("online", r), window.removeEventListener("offline", n);
        };
      }
    });
  }
  onSubscribe() {
    I(this, at) || this.setEventListener(I(this, Ft));
  }
  onUnsubscribe() {
    var t;
    this.hasListeners() || ((t = I(this, at)) == null || t.call(this), Q(this, at, void 0));
  }
  setEventListener(t) {
    var r;
    Q(this, Ft, t), (r = I(this, at)) == null || r.call(this), Q(this, at, t(this.setOnline.bind(this)));
  }
  setOnline(t) {
    I(this, Vt) !== t && (Q(this, Vt, t), this.listeners.forEach((n) => {
      n(t);
    }));
  }
  isOnline() {
    return I(this, Vt);
  }
}, Vt = new WeakMap(), at = new WeakMap(), Ft = new WeakMap(), So), pu = new hu();
function ri() {
  let e, t;
  const r = new Promise((i, s) => {
    e = i, t = s;
  });
  r.status = "pending", r.catch(() => {
  });
  function n(i) {
    Object.assign(r, i), delete r.resolve, delete r.reject;
  }
  return r.resolve = (i) => {
    n({
      status: "fulfilled",
      value: i
    }), e(i);
  }, r.reject = (i) => {
    n({
      status: "rejected",
      reason: i
    }), t(i);
  }, r;
}
function mu(e) {
  return (e ?? "online") === "online" ? pu.isOnline() : !0;
}
var yu = (e) => setTimeout(e, 0);
function _u() {
  let e = [], t = 0, r = (a) => {
    a();
  }, n = (a) => {
    a();
  }, i = yu;
  const s = (a) => {
    t ? e.push(a) : i(() => {
      r(a);
    });
  }, c = () => {
    const a = e;
    e = [], a.length && i(() => {
      n(() => {
        a.forEach((f) => {
          r(f);
        });
      });
    });
  };
  return {
    batch: (a) => {
      let f;
      t++;
      try {
        f = a();
      } finally {
        t--, t || c();
      }
      return f;
    },
    /**
     * All calls to the wrapped function will be batched.
     */
    batchCalls: (a) => (...f) => {
      s(() => {
        a(...f);
      });
    },
    schedule: s,
    /**
     * Use this method to set a custom notify function.
     * This can be used to for example wrap notifications with `React.act` while running tests.
     */
    setNotifyFunction: (a) => {
      r = a;
    },
    /**
     * Use this method to set a custom function to batch notifications together into a single tick.
     * By default React Query will use the batch function provided by ReactDOM or React Native.
     */
    setBatchNotifyFunction: (a) => {
      n = a;
    },
    setScheduler: (a) => {
      i = a;
    }
  };
}
var ba = _u();
function gu(e, t) {
  return {
    fetchFailureCount: 0,
    fetchFailureReason: null,
    fetchStatus: mu(t.networkMode) ? "fetching" : "paused",
    ...e === void 0 && {
      error: null,
      status: "pending"
    }
  };
}
function vu() {
  return {
    context: void 0,
    data: void 0,
    error: null,
    failureCount: 0,
    failureReason: null,
    isPaused: !1,
    status: "idle",
    variables: void 0,
    submittedAt: 0
  };
}
var Re, Z, ur, ve, wt, Ut, ct, ut, lr, Lt, zt, Et, St, lt, Kt, se, Yt, fs, ds, hs, ps, ms, ys, _s, wa, Ro, $u = (Ro = class extends Sn {
  constructor(t, r) {
    super();
    oe(this, se);
    oe(this, Re);
    oe(this, Z);
    oe(this, ur);
    oe(this, ve);
    oe(this, wt);
    oe(this, Ut);
    oe(this, ct);
    oe(this, ut);
    oe(this, lr);
    oe(this, Lt);
    // This property keeps track of the last query with defined data.
    // It will be used to pass the previous data and query to the placeholder function between renders.
    oe(this, zt);
    oe(this, Et);
    oe(this, St);
    oe(this, lt);
    oe(this, Kt, /* @__PURE__ */ new Set());
    this.options = r, Q(this, Re, t), Q(this, ut, null), Q(this, ct, ri()), this.options.experimental_prefetchInRender || I(this, ct).reject(
      new Error("experimental_prefetchInRender feature flag is not enabled")
    ), this.bindMethods(), this.setOptions(r);
  }
  bindMethods() {
    this.refetch = this.refetch.bind(this);
  }
  onSubscribe() {
    this.listeners.size === 1 && (I(this, Z).addObserver(this), ni(I(this, Z), this.options) ? ae(this, se, Yt).call(this) : this.updateResult(), ae(this, se, ps).call(this));
  }
  onUnsubscribe() {
    this.hasListeners() || this.destroy();
  }
  shouldFetchOnReconnect() {
    return gs(
      I(this, Z),
      this.options,
      this.options.refetchOnReconnect
    );
  }
  shouldFetchOnWindowFocus() {
    return gs(
      I(this, Z),
      this.options,
      this.options.refetchOnWindowFocus
    );
  }
  destroy() {
    this.listeners = /* @__PURE__ */ new Set(), ae(this, se, ms).call(this), ae(this, se, ys).call(this), I(this, Z).removeObserver(this);
  }
  setOptions(t) {
    const r = this.options, n = I(this, Z);
    if (this.options = I(this, Re).defaultQueryOptions(t), this.options.enabled !== void 0 && typeof this.options.enabled != "boolean" && typeof this.options.enabled != "function" && typeof Ue(this.options.enabled, I(this, Z)) != "boolean")
      throw new Error(
        "Expected enabled to be a boolean or a callback that returns a boolean"
      );
    ae(this, se, _s).call(this), I(this, Z).setOptions(this.options), r._defaulted && !pn(this.options, r) && I(this, Re).getQueryCache().notify({
      type: "observerOptionsUpdated",
      query: I(this, Z),
      observer: this
    });
    const i = this.hasListeners();
    i && si(
      I(this, Z),
      n,
      this.options,
      r
    ) && ae(this, se, Yt).call(this), this.updateResult(), i && (I(this, Z) !== n || Ue(this.options.enabled, I(this, Z)) !== Ue(r.enabled, I(this, Z)) || tr(this.options.staleTime, I(this, Z)) !== tr(r.staleTime, I(this, Z))) && ae(this, se, fs).call(this);
    const s = ae(this, se, ds).call(this);
    i && (I(this, Z) !== n || Ue(this.options.enabled, I(this, Z)) !== Ue(r.enabled, I(this, Z)) || s !== I(this, lt)) && ae(this, se, hs).call(this, s);
  }
  getOptimisticResult(t) {
    const r = I(this, Re).getQueryCache().build(I(this, Re), t), n = this.createResult(r, t);
    return wu(this, n) && (Q(this, ve, n), Q(this, Ut, this.options), Q(this, wt, I(this, Z).state)), n;
  }
  getCurrentResult() {
    return I(this, ve);
  }
  trackResult(t, r) {
    return new Proxy(t, {
      get: (n, i) => (this.trackProp(i), r == null || r(i), Reflect.get(n, i))
    });
  }
  trackProp(t) {
    I(this, Kt).add(t);
  }
  getCurrentQuery() {
    return I(this, Z);
  }
  refetch({ ...t } = {}) {
    return this.fetch({
      ...t
    });
  }
  fetchOptimistic(t) {
    const r = I(this, Re).defaultQueryOptions(t), n = I(this, Re).getQueryCache().build(I(this, Re), r);
    return n.fetch().then(() => this.createResult(n, r));
  }
  fetch(t) {
    return ae(this, se, Yt).call(this, {
      ...t,
      cancelRefetch: t.cancelRefetch ?? !0
    }).then(() => (this.updateResult(), I(this, ve)));
  }
  createResult(t, r) {
    var D;
    const n = I(this, Z), i = this.options, s = I(this, ve), c = I(this, wt), a = I(this, Ut), _ = t !== n ? t.state : I(this, ur), { state: p } = t;
    let h = { ...p }, b = !1, w;
    if (r._optimisticResults) {
      const V = this.hasListeners(), F = !V && ni(t, r), K = V && si(t, n, r, i);
      (F || K) && (h = {
        ...h,
        ...gu(p.data, t.options)
      }), r._optimisticResults === "isRestoring" && (h.fetchStatus = "idle");
    }
    let { error: S, errorUpdatedAt: v, status: d } = h;
    w = h.data;
    let u = !1;
    if (r.placeholderData !== void 0 && w === void 0 && d === "pending") {
      let V;
      s != null && s.isPlaceholderData && r.placeholderData === (a == null ? void 0 : a.placeholderData) ? (V = s.data, u = !0) : V = typeof r.placeholderData == "function" ? r.placeholderData(
        (D = I(this, zt)) == null ? void 0 : D.state.data,
        I(this, zt)
      ) : r.placeholderData, V !== void 0 && (d = "success", w = ti(
        s == null ? void 0 : s.data,
        V,
        r
      ), b = !0);
    }
    if (r.select && w !== void 0 && !u)
      if (s && w === (c == null ? void 0 : c.data) && r.select === I(this, lr))
        w = I(this, Lt);
      else
        try {
          Q(this, lr, r.select), w = r.select(w), w = ti(s == null ? void 0 : s.data, w, r), Q(this, Lt, w), Q(this, ut, null);
        } catch (V) {
          Q(this, ut, V);
        }
    I(this, ut) && (S = I(this, ut), w = I(this, Lt), v = Date.now(), d = "error");
    const o = h.fetchStatus === "fetching", l = d === "pending", m = d === "error", $ = l && o, g = w !== void 0, P = {
      status: d,
      fetchStatus: h.fetchStatus,
      isPending: l,
      isSuccess: d === "success",
      isError: m,
      isInitialLoading: $,
      isLoading: $,
      data: w,
      dataUpdatedAt: h.dataUpdatedAt,
      error: S,
      errorUpdatedAt: v,
      failureCount: h.fetchFailureCount,
      failureReason: h.fetchFailureReason,
      errorUpdateCount: h.errorUpdateCount,
      isFetched: h.dataUpdateCount > 0 || h.errorUpdateCount > 0,
      isFetchedAfterMount: h.dataUpdateCount > _.dataUpdateCount || h.errorUpdateCount > _.errorUpdateCount,
      isFetching: o,
      isRefetching: o && !l,
      isLoadingError: m && !g,
      isPaused: h.fetchStatus === "paused",
      isPlaceholderData: b,
      isRefetchError: m && g,
      isStale: Ds(t, r),
      refetch: this.refetch,
      promise: I(this, ct)
    };
    if (this.options.experimental_prefetchInRender) {
      const V = (L) => {
        P.status === "error" ? L.reject(P.error) : P.data !== void 0 && L.resolve(P.data);
      }, F = () => {
        const L = Q(this, ct, P.promise = ri());
        V(L);
      }, K = I(this, ct);
      switch (K.status) {
        case "pending":
          t.queryHash === n.queryHash && V(K);
          break;
        case "fulfilled":
          (P.status === "error" || P.data !== K.value) && F();
          break;
        case "rejected":
          (P.status !== "error" || P.error !== K.reason) && F();
          break;
      }
    }
    return P;
  }
  updateResult() {
    const t = I(this, ve), r = this.createResult(I(this, Z), this.options);
    if (Q(this, wt, I(this, Z).state), Q(this, Ut, this.options), I(this, wt).data !== void 0 && Q(this, zt, I(this, Z)), pn(r, t))
      return;
    Q(this, ve, r);
    const n = () => {
      if (!t)
        return !0;
      const { notifyOnChangeProps: i } = this.options, s = typeof i == "function" ? i() : i;
      if (s === "all" || !s && !I(this, Kt).size)
        return !0;
      const c = new Set(
        s ?? I(this, Kt)
      );
      return this.options.throwOnError && c.add("error"), Object.keys(I(this, ve)).some((a) => {
        const f = a;
        return I(this, ve)[f] !== t[f] && c.has(f);
      });
    };
    ae(this, se, wa).call(this, { listeners: n() });
  }
  onQueryUpdate() {
    this.updateResult(), this.hasListeners() && ae(this, se, ps).call(this);
  }
}, Re = new WeakMap(), Z = new WeakMap(), ur = new WeakMap(), ve = new WeakMap(), wt = new WeakMap(), Ut = new WeakMap(), ct = new WeakMap(), ut = new WeakMap(), lr = new WeakMap(), Lt = new WeakMap(), zt = new WeakMap(), Et = new WeakMap(), St = new WeakMap(), lt = new WeakMap(), Kt = new WeakMap(), se = new WeakSet(), Yt = function(t) {
  ae(this, se, _s).call(this);
  let r = I(this, Z).fetch(
    this.options,
    t
  );
  return t != null && t.throwOnError || (r = r.catch(uu)), r;
}, fs = function() {
  ae(this, se, ms).call(this);
  const t = tr(
    this.options.staleTime,
    I(this, Z)
  );
  if (hn || I(this, ve).isStale || !Ys(t))
    return;
  const n = lu(I(this, ve).dataUpdatedAt, t) + 1;
  Q(this, Et, setTimeout(() => {
    I(this, ve).isStale || this.updateResult();
  }, n));
}, ds = function() {
  return (typeof this.options.refetchInterval == "function" ? this.options.refetchInterval(I(this, Z)) : this.options.refetchInterval) ?? !1;
}, hs = function(t) {
  ae(this, se, ys).call(this), Q(this, lt, t), !(hn || Ue(this.options.enabled, I(this, Z)) === !1 || !Ys(I(this, lt)) || I(this, lt) === 0) && Q(this, St, setInterval(() => {
    (this.options.refetchIntervalInBackground || du.isFocused()) && ae(this, se, Yt).call(this);
  }, I(this, lt)));
}, ps = function() {
  ae(this, se, fs).call(this), ae(this, se, hs).call(this, ae(this, se, ds).call(this));
}, ms = function() {
  I(this, Et) && (clearTimeout(I(this, Et)), Q(this, Et, void 0));
}, ys = function() {
  I(this, St) && (clearInterval(I(this, St)), Q(this, St, void 0));
}, _s = function() {
  const t = I(this, Re).getQueryCache().build(I(this, Re), this.options);
  if (t === I(this, Z))
    return;
  const r = I(this, Z);
  Q(this, Z, t), Q(this, ur, t.state), this.hasListeners() && (r == null || r.removeObserver(this), t.addObserver(this));
}, wa = function(t) {
  ba.batch(() => {
    t.listeners && this.listeners.forEach((r) => {
      r(I(this, ve));
    }), I(this, Re).getQueryCache().notify({
      query: I(this, Z),
      type: "observerResultsUpdated"
    });
  });
}, Ro);
function bu(e, t) {
  return Ue(t.enabled, e) !== !1 && e.state.data === void 0 && !(e.state.status === "error" && t.retryOnMount === !1);
}
function ni(e, t) {
  return bu(e, t) || e.state.data !== void 0 && gs(e, t, t.refetchOnMount);
}
function gs(e, t, r) {
  if (Ue(t.enabled, e) !== !1 && tr(t.staleTime, e) !== "static") {
    const n = typeof r == "function" ? r(e) : r;
    return n === "always" || n !== !1 && Ds(e, t);
  }
  return !1;
}
function si(e, t, r, n) {
  return (e !== t || Ue(n.enabled, e) === !1) && (!r.suspense || e.state.status !== "error") && Ds(e, r);
}
function Ds(e, t) {
  return Ue(t.enabled, e) !== !1 && e.isStaleByTime(tr(t.staleTime, e));
}
function wu(e, t) {
  return !pn(e.getCurrentResult(), t);
}
var ft, dt, Oe, Be, Ye, nn, vs, Oo, Eu = (Oo = class extends Sn {
  constructor(t, r) {
    super();
    oe(this, Ye);
    oe(this, ft);
    oe(this, dt);
    oe(this, Oe);
    oe(this, Be);
    Q(this, ft, t), this.setOptions(r), this.bindMethods(), ae(this, Ye, nn).call(this);
  }
  bindMethods() {
    this.mutate = this.mutate.bind(this), this.reset = this.reset.bind(this);
  }
  setOptions(t) {
    var n;
    const r = this.options;
    this.options = I(this, ft).defaultMutationOptions(t), pn(this.options, r) || I(this, ft).getMutationCache().notify({
      type: "observerOptionsUpdated",
      mutation: I(this, Oe),
      observer: this
    }), r != null && r.mutationKey && this.options.mutationKey && Xs(r.mutationKey) !== Xs(this.options.mutationKey) ? this.reset() : ((n = I(this, Oe)) == null ? void 0 : n.state.status) === "pending" && I(this, Oe).setOptions(this.options);
  }
  onUnsubscribe() {
    var t;
    this.hasListeners() || (t = I(this, Oe)) == null || t.removeObserver(this);
  }
  onMutationUpdate(t) {
    ae(this, Ye, nn).call(this), ae(this, Ye, vs).call(this, t);
  }
  getCurrentResult() {
    return I(this, dt);
  }
  reset() {
    var t;
    (t = I(this, Oe)) == null || t.removeObserver(this), Q(this, Oe, void 0), ae(this, Ye, nn).call(this), ae(this, Ye, vs).call(this);
  }
  mutate(t, r) {
    var n;
    return Q(this, Be, r), (n = I(this, Oe)) == null || n.removeObserver(this), Q(this, Oe, I(this, ft).getMutationCache().build(I(this, ft), this.options)), I(this, Oe).addObserver(this), I(this, Oe).execute(t);
  }
}, ft = new WeakMap(), dt = new WeakMap(), Oe = new WeakMap(), Be = new WeakMap(), Ye = new WeakSet(), nn = function() {
  var r;
  const t = ((r = I(this, Oe)) == null ? void 0 : r.state) ?? vu();
  Q(this, dt, {
    ...t,
    isPending: t.status === "pending",
    isSuccess: t.status === "success",
    isError: t.status === "error",
    isIdle: t.status === "idle",
    mutate: this.mutate,
    reset: this.reset
  });
}, vs = function(t) {
  ba.batch(() => {
    var r, n, i, s, c, a, f, _;
    if (I(this, Be) && this.hasListeners()) {
      const p = I(this, dt).variables, h = I(this, dt).context;
      (t == null ? void 0 : t.type) === "success" ? ((n = (r = I(this, Be)).onSuccess) == null || n.call(r, t.data, p, h), (s = (i = I(this, Be)).onSettled) == null || s.call(i, t.data, null, p, h)) : (t == null ? void 0 : t.type) === "error" && ((a = (c = I(this, Be)).onError) == null || a.call(c, t.error, p, h), (_ = (f = I(this, Be)).onSettled) == null || _.call(
        f,
        void 0,
        t.error,
        p,
        h
      ));
    }
    this.listeners.forEach((p) => {
      p(I(this, dt));
    });
  });
}, Oo), Su = "VUE_QUERY_CLIENT";
function Ru(e) {
  const t = e ? `:${e}` : "";
  return `${Su}${t}`;
}
function $s(e, t) {
  Object.keys(e).forEach((r) => {
    e[r] = t[r];
  });
}
function bs(e, t, r = "", n = 0) {
  if (t) {
    const i = t(e, r, n);
    if (i === void 0 && ye(e) || i !== void 0)
      return i;
  }
  if (Array.isArray(e))
    return e.map(
      (i, s) => bs(i, t, String(s), n + 1)
    );
  if (typeof e == "object" && Nu(e)) {
    const i = Object.entries(e).map(([s, c]) => [
      s,
      bs(c, t, s, n + 1)
    ]);
    return Object.fromEntries(i);
  }
  return e;
}
function Ou(e, t) {
  return bs(e, t);
}
function rr(e, t = !1) {
  return Ou(e, (r, n, i) => {
    if (i === 1 && n === "queryKey")
      return rr(r, !0);
    if (t && Pu(r))
      return rr(r(), t);
    if (ye(r))
      return rr(Te(r), t);
  });
}
function Nu(e) {
  if (Object.prototype.toString.call(e) !== "[object Object]")
    return !1;
  const t = Object.getPrototypeOf(e);
  return t === null || t === Object.prototype;
}
function Pu(e) {
  return typeof e == "function";
}
function qs(e = "") {
  if (!Hc())
    throw new Error(
      "vue-query hooks can only be used inside setup() function or functions that support injection context."
    );
  const t = Ru(e), r = fa(t);
  if (!r)
    throw new Error(
      "No 'queryClient' found in Vue context, use 'VueQueryPlugin' to properly initialize the library."
    );
  return r;
}
function ju(e, t, r) {
  process.env.NODE_ENV === "development" && console.warn(
    'vue-query composable like "useQuery()" should only be used inside a "setup()" function or a running effect scope. They might otherwise lead to memory leaks.'
  );
  const n = qs(), i = $a(() => {
    var v;
    const w = rr(t);
    typeof w.enabled == "function" && (w.enabled = w.enabled());
    const S = n.defaultQueryOptions(w);
    return S._optimisticResults = (v = n.isRestoring) != null && v.value ? "isRestoring" : "optimistic", S;
  }), s = new e(n, i.value), c = i.value.shallow ? Bo(s.getCurrentResult()) : $n(s.getCurrentResult());
  let a = () => {
  };
  n.isRestoring && Dt(
    n.isRestoring,
    (w) => {
      w || (a(), a = s.subscribe((S) => {
        $s(c, S);
      }));
    },
    { immediate: !0 }
  );
  const f = () => {
    s.setOptions(i.value), $s(c, s.getCurrentResult());
  };
  Dt(i, f), Do();
  const _ = (...w) => (f(), c.refetch(...w)), p = () => new Promise(
    (w, S) => {
      let v = () => {
      };
      const d = () => {
        if (i.value.enabled !== !1) {
          s.setOptions(i.value);
          const u = s.getOptimisticResult(
            i.value
          );
          u.isStale ? (v(), s.fetchOptimistic(i.value).then(w, (o) => {
            ls(i.value.throwOnError, [
              o,
              s.getCurrentQuery()
            ]) ? S(o) : w(s.getCurrentResult());
          })) : (v(), w(u));
        }
      };
      d(), v = Dt(i, d);
    }
  );
  Dt(
    () => c.error,
    (w) => {
      if (c.isError && !c.isFetching && ls(i.value.throwOnError, [
        w,
        s.getCurrentQuery()
      ]))
        throw w;
    }
  );
  const h = i.value.shallow ? Yo(c) : bn(c), b = Xo(h);
  for (const w in c)
    typeof c[w] == "function" && (b[w] = c[w]);
  return b.suspense = p, b.refetch = _, b;
}
function Tu(e, t) {
  return ju($u, e);
}
function Cu(e, t) {
  process.env.NODE_ENV === "development" && console.warn(
    'vue-query composable like "useQuery()" should only be used inside a "setup()" function or a running effect scope. They might otherwise lead to memory leaks.'
  );
  const r = qs(), n = $a(() => r.defaultMutationOptions(rr(e))), i = new Eu(r, n.value), s = n.value.shallow ? Bo(i.getCurrentResult()) : $n(i.getCurrentResult());
  i.subscribe((_) => {
    $s(s, _);
  });
  const c = (_, p) => {
    i.mutate(_, p).catch(() => {
    });
  };
  Dt(n, () => {
    i.setOptions(n.value);
  }), Do();
  const a = n.value.shallow ? Yo(s) : bn(s), f = Xo(a);
  return Dt(
    () => s.error,
    (_) => {
      if (_ && ls(n.value.throwOnError, [_]))
        throw _;
    }
  ), {
    ...f,
    mutate: c,
    mutateAsync: s.mutate,
    reset: s.reset
  };
}
var _r = { exports: {} }, zn = {}, Ke = {}, mt = {}, Kn = {}, Hn = {}, xn = {}, ii;
function mn() {
  return ii || (ii = 1, function(e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.regexpCode = e.getEsmExportName = e.getProperty = e.safeStringify = e.stringify = e.strConcat = e.addCodeArg = e.str = e._ = e.nil = e._Code = e.Name = e.IDENTIFIER = e._CodeOrName = void 0;
    class t {
    }
    e._CodeOrName = t, e.IDENTIFIER = /^[a-z$_][a-z$_0-9]*$/i;
    class r extends t {
      constructor(o) {
        if (super(), !e.IDENTIFIER.test(o))
          throw new Error("CodeGen: name must be a valid identifier");
        this.str = o;
      }
      toString() {
        return this.str;
      }
      emptyStr() {
        return !1;
      }
      get names() {
        return { [this.str]: 1 };
      }
    }
    e.Name = r;
    class n extends t {
      constructor(o) {
        super(), this._items = typeof o == "string" ? [o] : o;
      }
      toString() {
        return this.str;
      }
      emptyStr() {
        if (this._items.length > 1)
          return !1;
        const o = this._items[0];
        return o === "" || o === '""';
      }
      get str() {
        var o;
        return (o = this._str) !== null && o !== void 0 ? o : this._str = this._items.reduce((l, m) => `${l}${m}`, "");
      }
      get names() {
        var o;
        return (o = this._names) !== null && o !== void 0 ? o : this._names = this._items.reduce((l, m) => (m instanceof r && (l[m.str] = (l[m.str] || 0) + 1), l), {});
      }
    }
    e._Code = n, e.nil = new n("");
    function i(u, ...o) {
      const l = [u[0]];
      let m = 0;
      for (; m < o.length; )
        a(l, o[m]), l.push(u[++m]);
      return new n(l);
    }
    e._ = i;
    const s = new n("+");
    function c(u, ...o) {
      const l = [w(u[0])];
      let m = 0;
      for (; m < o.length; )
        l.push(s), a(l, o[m]), l.push(s, w(u[++m]));
      return f(l), new n(l);
    }
    e.str = c;
    function a(u, o) {
      o instanceof n ? u.push(...o._items) : o instanceof r ? u.push(o) : u.push(h(o));
    }
    e.addCodeArg = a;
    function f(u) {
      let o = 1;
      for (; o < u.length - 1; ) {
        if (u[o] === s) {
          const l = _(u[o - 1], u[o + 1]);
          if (l !== void 0) {
            u.splice(o - 1, 3, l);
            continue;
          }
          u[o++] = "+";
        }
        o++;
      }
    }
    function _(u, o) {
      if (o === '""')
        return u;
      if (u === '""')
        return o;
      if (typeof u == "string")
        return o instanceof r || u[u.length - 1] !== '"' ? void 0 : typeof o != "string" ? `${u.slice(0, -1)}${o}"` : o[0] === '"' ? u.slice(0, -1) + o.slice(1) : void 0;
      if (typeof o == "string" && o[0] === '"' && !(u instanceof r))
        return `"${u}${o.slice(1)}`;
    }
    function p(u, o) {
      return o.emptyStr() ? u : u.emptyStr() ? o : c`${u}${o}`;
    }
    e.strConcat = p;
    function h(u) {
      return typeof u == "number" || typeof u == "boolean" || u === null ? u : w(Array.isArray(u) ? u.join(",") : u);
    }
    function b(u) {
      return new n(w(u));
    }
    e.stringify = b;
    function w(u) {
      return JSON.stringify(u).replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029");
    }
    e.safeStringify = w;
    function S(u) {
      return typeof u == "string" && e.IDENTIFIER.test(u) ? new n(`.${u}`) : i`[${u}]`;
    }
    e.getProperty = S;
    function v(u) {
      if (typeof u == "string" && e.IDENTIFIER.test(u))
        return new n(`${u}`);
      throw new Error(`CodeGen: invalid export name: ${u}, use explicit $id name mapping`);
    }
    e.getEsmExportName = v;
    function d(u) {
      return new n(u.toString());
    }
    e.regexpCode = d;
  }(xn)), xn;
}
var Jn = {}, oi;
function ai() {
  return oi || (oi = 1, function(e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.ValueScope = e.ValueScopeName = e.Scope = e.varKinds = e.UsedValueState = void 0;
    const t = mn();
    class r extends Error {
      constructor(_) {
        super(`CodeGen: "code" for ${_} not defined`), this.value = _.value;
      }
    }
    var n;
    (function(f) {
      f[f.Started = 0] = "Started", f[f.Completed = 1] = "Completed";
    })(n || (e.UsedValueState = n = {})), e.varKinds = {
      const: new t.Name("const"),
      let: new t.Name("let"),
      var: new t.Name("var")
    };
    class i {
      constructor({ prefixes: _, parent: p } = {}) {
        this._names = {}, this._prefixes = _, this._parent = p;
      }
      toName(_) {
        return _ instanceof t.Name ? _ : this.name(_);
      }
      name(_) {
        return new t.Name(this._newName(_));
      }
      _newName(_) {
        const p = this._names[_] || this._nameGroup(_);
        return `${_}${p.index++}`;
      }
      _nameGroup(_) {
        var p, h;
        if (!((h = (p = this._parent) === null || p === void 0 ? void 0 : p._prefixes) === null || h === void 0) && h.has(_) || this._prefixes && !this._prefixes.has(_))
          throw new Error(`CodeGen: prefix "${_}" is not allowed in this scope`);
        return this._names[_] = { prefix: _, index: 0 };
      }
    }
    e.Scope = i;
    class s extends t.Name {
      constructor(_, p) {
        super(p), this.prefix = _;
      }
      setValue(_, { property: p, itemIndex: h }) {
        this.value = _, this.scopePath = (0, t._)`.${new t.Name(p)}[${h}]`;
      }
    }
    e.ValueScopeName = s;
    const c = (0, t._)`\n`;
    class a extends i {
      constructor(_) {
        super(_), this._values = {}, this._scope = _.scope, this.opts = { ..._, _n: _.lines ? c : t.nil };
      }
      get() {
        return this._scope;
      }
      name(_) {
        return new s(_, this._newName(_));
      }
      value(_, p) {
        var h;
        if (p.ref === void 0)
          throw new Error("CodeGen: ref must be passed in value");
        const b = this.toName(_), { prefix: w } = b, S = (h = p.key) !== null && h !== void 0 ? h : p.ref;
        let v = this._values[w];
        if (v) {
          const o = v.get(S);
          if (o)
            return o;
        } else
          v = this._values[w] = /* @__PURE__ */ new Map();
        v.set(S, b);
        const d = this._scope[w] || (this._scope[w] = []), u = d.length;
        return d[u] = p.ref, b.setValue(p, { property: w, itemIndex: u }), b;
      }
      getValue(_, p) {
        const h = this._values[_];
        if (h)
          return h.get(p);
      }
      scopeRefs(_, p = this._values) {
        return this._reduceValues(p, (h) => {
          if (h.scopePath === void 0)
            throw new Error(`CodeGen: name "${h}" has no value`);
          return (0, t._)`${_}${h.scopePath}`;
        });
      }
      scopeCode(_ = this._values, p, h) {
        return this._reduceValues(_, (b) => {
          if (b.value === void 0)
            throw new Error(`CodeGen: name "${b}" has no value`);
          return b.value.code;
        }, p, h);
      }
      _reduceValues(_, p, h = {}, b) {
        let w = t.nil;
        for (const S in _) {
          const v = _[S];
          if (!v)
            continue;
          const d = h[S] = h[S] || /* @__PURE__ */ new Map();
          v.forEach((u) => {
            if (d.has(u))
              return;
            d.set(u, n.Started);
            let o = p(u);
            if (o) {
              const l = this.opts.es5 ? e.varKinds.var : e.varKinds.const;
              w = (0, t._)`${w}${l} ${u} = ${o};${this.opts._n}`;
            } else if (o = b == null ? void 0 : b(u))
              w = (0, t._)`${w}${o}${this.opts._n}`;
            else
              throw new r(u);
            d.set(u, n.Completed);
          });
        }
        return w;
      }
    }
    e.ValueScope = a;
  }(Jn)), Jn;
}
var ci;
function Y() {
  return ci || (ci = 1, function(e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.or = e.and = e.not = e.CodeGen = e.operators = e.varKinds = e.ValueScopeName = e.ValueScope = e.Scope = e.Name = e.regexpCode = e.stringify = e.getProperty = e.nil = e.strConcat = e.str = e._ = void 0;
    const t = mn(), r = ai();
    var n = mn();
    Object.defineProperty(e, "_", { enumerable: !0, get: function() {
      return n._;
    } }), Object.defineProperty(e, "str", { enumerable: !0, get: function() {
      return n.str;
    } }), Object.defineProperty(e, "strConcat", { enumerable: !0, get: function() {
      return n.strConcat;
    } }), Object.defineProperty(e, "nil", { enumerable: !0, get: function() {
      return n.nil;
    } }), Object.defineProperty(e, "getProperty", { enumerable: !0, get: function() {
      return n.getProperty;
    } }), Object.defineProperty(e, "stringify", { enumerable: !0, get: function() {
      return n.stringify;
    } }), Object.defineProperty(e, "regexpCode", { enumerable: !0, get: function() {
      return n.regexpCode;
    } }), Object.defineProperty(e, "Name", { enumerable: !0, get: function() {
      return n.Name;
    } });
    var i = ai();
    Object.defineProperty(e, "Scope", { enumerable: !0, get: function() {
      return i.Scope;
    } }), Object.defineProperty(e, "ValueScope", { enumerable: !0, get: function() {
      return i.ValueScope;
    } }), Object.defineProperty(e, "ValueScopeName", { enumerable: !0, get: function() {
      return i.ValueScopeName;
    } }), Object.defineProperty(e, "varKinds", { enumerable: !0, get: function() {
      return i.varKinds;
    } }), e.operators = {
      GT: new t._Code(">"),
      GTE: new t._Code(">="),
      LT: new t._Code("<"),
      LTE: new t._Code("<="),
      EQ: new t._Code("==="),
      NEQ: new t._Code("!=="),
      NOT: new t._Code("!"),
      OR: new t._Code("||"),
      AND: new t._Code("&&"),
      ADD: new t._Code("+")
    };
    class s {
      optimizeNodes() {
        return this;
      }
      optimizeNames(y, R) {
        return this;
      }
    }
    class c extends s {
      constructor(y, R, C) {
        super(), this.varKind = y, this.name = R, this.rhs = C;
      }
      render({ es5: y, _n: R }) {
        const C = y ? r.varKinds.var : this.varKind, U = this.rhs === void 0 ? "" : ` = ${this.rhs}`;
        return `${C} ${this.name}${U};` + R;
      }
      optimizeNames(y, R) {
        if (y[this.name.str])
          return this.rhs && (this.rhs = J(this.rhs, y, R)), this;
      }
      get names() {
        return this.rhs instanceof t._CodeOrName ? this.rhs.names : {};
      }
    }
    class a extends s {
      constructor(y, R, C) {
        super(), this.lhs = y, this.rhs = R, this.sideEffects = C;
      }
      render({ _n: y }) {
        return `${this.lhs} = ${this.rhs};` + y;
      }
      optimizeNames(y, R) {
        if (!(this.lhs instanceof t.Name && !y[this.lhs.str] && !this.sideEffects))
          return this.rhs = J(this.rhs, y, R), this;
      }
      get names() {
        const y = this.lhs instanceof t.Name ? {} : { ...this.lhs.names };
        return L(y, this.rhs);
      }
    }
    class f extends a {
      constructor(y, R, C, U) {
        super(y, C, U), this.op = R;
      }
      render({ _n: y }) {
        return `${this.lhs} ${this.op}= ${this.rhs};` + y;
      }
    }
    class _ extends s {
      constructor(y) {
        super(), this.label = y, this.names = {};
      }
      render({ _n: y }) {
        return `${this.label}:` + y;
      }
    }
    class p extends s {
      constructor(y) {
        super(), this.label = y, this.names = {};
      }
      render({ _n: y }) {
        return `break${this.label ? ` ${this.label}` : ""};` + y;
      }
    }
    class h extends s {
      constructor(y) {
        super(), this.error = y;
      }
      render({ _n: y }) {
        return `throw ${this.error};` + y;
      }
      get names() {
        return this.error.names;
      }
    }
    class b extends s {
      constructor(y) {
        super(), this.code = y;
      }
      render({ _n: y }) {
        return `${this.code};` + y;
      }
      optimizeNodes() {
        return `${this.code}` ? this : void 0;
      }
      optimizeNames(y, R) {
        return this.code = J(this.code, y, R), this;
      }
      get names() {
        return this.code instanceof t._CodeOrName ? this.code.names : {};
      }
    }
    class w extends s {
      constructor(y = []) {
        super(), this.nodes = y;
      }
      render(y) {
        return this.nodes.reduce((R, C) => R + C.render(y), "");
      }
      optimizeNodes() {
        const { nodes: y } = this;
        let R = y.length;
        for (; R--; ) {
          const C = y[R].optimizeNodes();
          Array.isArray(C) ? y.splice(R, 1, ...C) : C ? y[R] = C : y.splice(R, 1);
        }
        return y.length > 0 ? this : void 0;
      }
      optimizeNames(y, R) {
        const { nodes: C } = this;
        let U = C.length;
        for (; U--; ) {
          const H = C[U];
          H.optimizeNames(y, R) || (B(y, H.names), C.splice(U, 1));
        }
        return C.length > 0 ? this : void 0;
      }
      get names() {
        return this.nodes.reduce((y, R) => K(y, R.names), {});
      }
    }
    class S extends w {
      render(y) {
        return "{" + y._n + super.render(y) + "}" + y._n;
      }
    }
    class v extends w {
    }
    class d extends S {
    }
    d.kind = "else";
    class u extends S {
      constructor(y, R) {
        super(R), this.condition = y;
      }
      render(y) {
        let R = `if(${this.condition})` + super.render(y);
        return this.else && (R += "else " + this.else.render(y)), R;
      }
      optimizeNodes() {
        super.optimizeNodes();
        const y = this.condition;
        if (y === !0)
          return this.nodes;
        let R = this.else;
        if (R) {
          const C = R.optimizeNodes();
          R = this.else = Array.isArray(C) ? new d(C) : C;
        }
        if (R)
          return y === !1 ? R instanceof u ? R : R.nodes : this.nodes.length ? this : new u(we(y), R instanceof u ? [R] : R.nodes);
        if (!(y === !1 || !this.nodes.length))
          return this;
      }
      optimizeNames(y, R) {
        var C;
        if (this.else = (C = this.else) === null || C === void 0 ? void 0 : C.optimizeNames(y, R), !!(super.optimizeNames(y, R) || this.else))
          return this.condition = J(this.condition, y, R), this;
      }
      get names() {
        const y = super.names;
        return L(y, this.condition), this.else && K(y, this.else.names), y;
      }
    }
    u.kind = "if";
    class o extends S {
    }
    o.kind = "for";
    class l extends o {
      constructor(y) {
        super(), this.iteration = y;
      }
      render(y) {
        return `for(${this.iteration})` + super.render(y);
      }
      optimizeNames(y, R) {
        if (super.optimizeNames(y, R))
          return this.iteration = J(this.iteration, y, R), this;
      }
      get names() {
        return K(super.names, this.iteration.names);
      }
    }
    class m extends o {
      constructor(y, R, C, U) {
        super(), this.varKind = y, this.name = R, this.from = C, this.to = U;
      }
      render(y) {
        const R = y.es5 ? r.varKinds.var : this.varKind, { name: C, from: U, to: H } = this;
        return `for(${R} ${C}=${U}; ${C}<${H}; ${C}++)` + super.render(y);
      }
      get names() {
        const y = L(super.names, this.from);
        return L(y, this.to);
      }
    }
    class $ extends o {
      constructor(y, R, C, U) {
        super(), this.loop = y, this.varKind = R, this.name = C, this.iterable = U;
      }
      render(y) {
        return `for(${this.varKind} ${this.name} ${this.loop} ${this.iterable})` + super.render(y);
      }
      optimizeNames(y, R) {
        if (super.optimizeNames(y, R))
          return this.iterable = J(this.iterable, y, R), this;
      }
      get names() {
        return K(super.names, this.iterable.names);
      }
    }
    class g extends S {
      constructor(y, R, C) {
        super(), this.name = y, this.args = R, this.async = C;
      }
      render(y) {
        return `${this.async ? "async " : ""}function ${this.name}(${this.args})` + super.render(y);
      }
    }
    g.kind = "func";
    class E extends w {
      render(y) {
        return "return " + super.render(y);
      }
    }
    E.kind = "return";
    class P extends S {
      render(y) {
        let R = "try" + super.render(y);
        return this.catch && (R += this.catch.render(y)), this.finally && (R += this.finally.render(y)), R;
      }
      optimizeNodes() {
        var y, R;
        return super.optimizeNodes(), (y = this.catch) === null || y === void 0 || y.optimizeNodes(), (R = this.finally) === null || R === void 0 || R.optimizeNodes(), this;
      }
      optimizeNames(y, R) {
        var C, U;
        return super.optimizeNames(y, R), (C = this.catch) === null || C === void 0 || C.optimizeNames(y, R), (U = this.finally) === null || U === void 0 || U.optimizeNames(y, R), this;
      }
      get names() {
        const y = super.names;
        return this.catch && K(y, this.catch.names), this.finally && K(y, this.finally.names), y;
      }
    }
    class D extends S {
      constructor(y) {
        super(), this.error = y;
      }
      render(y) {
        return `catch(${this.error})` + super.render(y);
      }
    }
    D.kind = "catch";
    class V extends S {
      render(y) {
        return "finally" + super.render(y);
      }
    }
    V.kind = "finally";
    class F {
      constructor(y, R = {}) {
        this._values = {}, this._blockStarts = [], this._constants = {}, this.opts = { ...R, _n: R.lines ? `
` : "" }, this._extScope = y, this._scope = new r.Scope({ parent: y }), this._nodes = [new v()];
      }
      toString() {
        return this._root.render(this.opts);
      }
      // returns unique name in the internal scope
      name(y) {
        return this._scope.name(y);
      }
      // reserves unique name in the external scope
      scopeName(y) {
        return this._extScope.name(y);
      }
      // reserves unique name in the external scope and assigns value to it
      scopeValue(y, R) {
        const C = this._extScope.value(y, R);
        return (this._values[C.prefix] || (this._values[C.prefix] = /* @__PURE__ */ new Set())).add(C), C;
      }
      getScopeValue(y, R) {
        return this._extScope.getValue(y, R);
      }
      // return code that assigns values in the external scope to the names that are used internally
      // (same names that were returned by gen.scopeName or gen.scopeValue)
      scopeRefs(y) {
        return this._extScope.scopeRefs(y, this._values);
      }
      scopeCode() {
        return this._extScope.scopeCode(this._values);
      }
      _def(y, R, C, U) {
        const H = this._scope.toName(R);
        return C !== void 0 && U && (this._constants[H.str] = C), this._leafNode(new c(y, H, C)), H;
      }
      // `const` declaration (`var` in es5 mode)
      const(y, R, C) {
        return this._def(r.varKinds.const, y, R, C);
      }
      // `let` declaration with optional assignment (`var` in es5 mode)
      let(y, R, C) {
        return this._def(r.varKinds.let, y, R, C);
      }
      // `var` declaration with optional assignment
      var(y, R, C) {
        return this._def(r.varKinds.var, y, R, C);
      }
      // assignment code
      assign(y, R, C) {
        return this._leafNode(new a(y, R, C));
      }
      // `+=` code
      add(y, R) {
        return this._leafNode(new f(y, e.operators.ADD, R));
      }
      // appends passed SafeExpr to code or executes Block
      code(y) {
        return typeof y == "function" ? y() : y !== t.nil && this._leafNode(new b(y)), this;
      }
      // returns code for object literal for the passed argument list of key-value pairs
      object(...y) {
        const R = ["{"];
        for (const [C, U] of y)
          R.length > 1 && R.push(","), R.push(C), (C !== U || this.opts.es5) && (R.push(":"), (0, t.addCodeArg)(R, U));
        return R.push("}"), new t._Code(R);
      }
      // `if` clause (or statement if `thenBody` and, optionally, `elseBody` are passed)
      if(y, R, C) {
        if (this._blockNode(new u(y)), R && C)
          this.code(R).else().code(C).endIf();
        else if (R)
          this.code(R).endIf();
        else if (C)
          throw new Error('CodeGen: "else" body without "then" body');
        return this;
      }
      // `else if` clause - invalid without `if` or after `else` clauses
      elseIf(y) {
        return this._elseNode(new u(y));
      }
      // `else` clause - only valid after `if` or `else if` clauses
      else() {
        return this._elseNode(new d());
      }
      // end `if` statement (needed if gen.if was used only with condition)
      endIf() {
        return this._endBlockNode(u, d);
      }
      _for(y, R) {
        return this._blockNode(y), R && this.code(R).endFor(), this;
      }
      // a generic `for` clause (or statement if `forBody` is passed)
      for(y, R) {
        return this._for(new l(y), R);
      }
      // `for` statement for a range of values
      forRange(y, R, C, U, H = this.opts.es5 ? r.varKinds.var : r.varKinds.let) {
        const re = this._scope.toName(y);
        return this._for(new m(H, re, R, C), () => U(re));
      }
      // `for-of` statement (in es5 mode replace with a normal for loop)
      forOf(y, R, C, U = r.varKinds.const) {
        const H = this._scope.toName(y);
        if (this.opts.es5) {
          const re = R instanceof t.Name ? R : this.var("_arr", R);
          return this.forRange("_i", 0, (0, t._)`${re}.length`, (ee) => {
            this.var(H, (0, t._)`${re}[${ee}]`), C(H);
          });
        }
        return this._for(new $("of", U, H, R), () => C(H));
      }
      // `for-in` statement.
      // With option `ownProperties` replaced with a `for-of` loop for object keys
      forIn(y, R, C, U = this.opts.es5 ? r.varKinds.var : r.varKinds.const) {
        if (this.opts.ownProperties)
          return this.forOf(y, (0, t._)`Object.keys(${R})`, C);
        const H = this._scope.toName(y);
        return this._for(new $("in", U, H, R), () => C(H));
      }
      // end `for` loop
      endFor() {
        return this._endBlockNode(o);
      }
      // `label` statement
      label(y) {
        return this._leafNode(new _(y));
      }
      // `break` statement
      break(y) {
        return this._leafNode(new p(y));
      }
      // `return` statement
      return(y) {
        const R = new E();
        if (this._blockNode(R), this.code(y), R.nodes.length !== 1)
          throw new Error('CodeGen: "return" should have one node');
        return this._endBlockNode(E);
      }
      // `try` statement
      try(y, R, C) {
        if (!R && !C)
          throw new Error('CodeGen: "try" without "catch" and "finally"');
        const U = new P();
        if (this._blockNode(U), this.code(y), R) {
          const H = this.name("e");
          this._currNode = U.catch = new D(H), R(H);
        }
        return C && (this._currNode = U.finally = new V(), this.code(C)), this._endBlockNode(D, V);
      }
      // `throw` statement
      throw(y) {
        return this._leafNode(new h(y));
      }
      // start self-balancing block
      block(y, R) {
        return this._blockStarts.push(this._nodes.length), y && this.code(y).endBlock(R), this;
      }
      // end the current self-balancing block
      endBlock(y) {
        const R = this._blockStarts.pop();
        if (R === void 0)
          throw new Error("CodeGen: not in self-balancing block");
        const C = this._nodes.length - R;
        if (C < 0 || y !== void 0 && C !== y)
          throw new Error(`CodeGen: wrong number of nodes: ${C} vs ${y} expected`);
        return this._nodes.length = R, this;
      }
      // `function` heading (or definition if funcBody is passed)
      func(y, R = t.nil, C, U) {
        return this._blockNode(new g(y, R, C)), U && this.code(U).endFunc(), this;
      }
      // end function definition
      endFunc() {
        return this._endBlockNode(g);
      }
      optimize(y = 1) {
        for (; y-- > 0; )
          this._root.optimizeNodes(), this._root.optimizeNames(this._root.names, this._constants);
      }
      _leafNode(y) {
        return this._currNode.nodes.push(y), this;
      }
      _blockNode(y) {
        this._currNode.nodes.push(y), this._nodes.push(y);
      }
      _endBlockNode(y, R) {
        const C = this._currNode;
        if (C instanceof y || R && C instanceof R)
          return this._nodes.pop(), this;
        throw new Error(`CodeGen: not in block "${R ? `${y.kind}/${R.kind}` : y.kind}"`);
      }
      _elseNode(y) {
        const R = this._currNode;
        if (!(R instanceof u))
          throw new Error('CodeGen: "else" without "if"');
        return this._currNode = R.else = y, this;
      }
      get _root() {
        return this._nodes[0];
      }
      get _currNode() {
        const y = this._nodes;
        return y[y.length - 1];
      }
      set _currNode(y) {
        const R = this._nodes;
        R[R.length - 1] = y;
      }
    }
    e.CodeGen = F;
    function K(T, y) {
      for (const R in y)
        T[R] = (T[R] || 0) + (y[R] || 0);
      return T;
    }
    function L(T, y) {
      return y instanceof t._CodeOrName ? K(T, y.names) : T;
    }
    function J(T, y, R) {
      if (T instanceof t.Name)
        return C(T);
      if (!U(T))
        return T;
      return new t._Code(T._items.reduce((H, re) => (re instanceof t.Name && (re = C(re)), re instanceof t._Code ? H.push(...re._items) : H.push(re), H), []));
      function C(H) {
        const re = R[H.str];
        return re === void 0 || y[H.str] !== 1 ? H : (delete y[H.str], re);
      }
      function U(H) {
        return H instanceof t._Code && H._items.some((re) => re instanceof t.Name && y[re.str] === 1 && R[re.str] !== void 0);
      }
    }
    function B(T, y) {
      for (const R in y)
        T[R] = (T[R] || 0) - (y[R] || 0);
    }
    function we(T) {
      return typeof T == "boolean" || typeof T == "number" || T === null ? !T : (0, t._)`!${q(T)}`;
    }
    e.not = we;
    const ce = N(e.operators.AND);
    function x(...T) {
      return T.reduce(ce);
    }
    e.and = x;
    const me = N(e.operators.OR);
    function A(...T) {
      return T.reduce(me);
    }
    e.or = A;
    function N(T) {
      return (y, R) => y === t.nil ? R : R === t.nil ? y : (0, t._)`${q(y)} ${T} ${q(R)}`;
    }
    function q(T) {
      return T instanceof t.Name ? T : (0, t._)`(${T})`;
    }
  }(Hn)), Hn;
}
var W = {}, ui;
function te() {
  if (ui) return W;
  ui = 1, Object.defineProperty(W, "__esModule", { value: !0 }), W.checkStrictMode = W.getErrorPath = W.Type = W.useFunc = W.setEvaluated = W.evaluatedPropsToName = W.mergeEvaluated = W.eachItem = W.unescapeJsonPointer = W.escapeJsonPointer = W.escapeFragment = W.unescapeFragment = W.schemaRefOrVal = W.schemaHasRulesButRef = W.schemaHasRules = W.checkUnknownRules = W.alwaysValidSchema = W.toHash = void 0;
  const e = Y(), t = mn();
  function r($) {
    const g = {};
    for (const E of $)
      g[E] = !0;
    return g;
  }
  W.toHash = r;
  function n($, g) {
    return typeof g == "boolean" ? g : Object.keys(g).length === 0 ? !0 : (i($, g), !s(g, $.self.RULES.all));
  }
  W.alwaysValidSchema = n;
  function i($, g = $.schema) {
    const { opts: E, self: P } = $;
    if (!E.strictSchema || typeof g == "boolean")
      return;
    const D = P.RULES.keywords;
    for (const V in g)
      D[V] || m($, `unknown keyword: "${V}"`);
  }
  W.checkUnknownRules = i;
  function s($, g) {
    if (typeof $ == "boolean")
      return !$;
    for (const E in $)
      if (g[E])
        return !0;
    return !1;
  }
  W.schemaHasRules = s;
  function c($, g) {
    if (typeof $ == "boolean")
      return !$;
    for (const E in $)
      if (E !== "$ref" && g.all[E])
        return !0;
    return !1;
  }
  W.schemaHasRulesButRef = c;
  function a({ topSchemaRef: $, schemaPath: g }, E, P, D) {
    if (!D) {
      if (typeof E == "number" || typeof E == "boolean")
        return E;
      if (typeof E == "string")
        return (0, e._)`${E}`;
    }
    return (0, e._)`${$}${g}${(0, e.getProperty)(P)}`;
  }
  W.schemaRefOrVal = a;
  function f($) {
    return h(decodeURIComponent($));
  }
  W.unescapeFragment = f;
  function _($) {
    return encodeURIComponent(p($));
  }
  W.escapeFragment = _;
  function p($) {
    return typeof $ == "number" ? `${$}` : $.replace(/~/g, "~0").replace(/\//g, "~1");
  }
  W.escapeJsonPointer = p;
  function h($) {
    return $.replace(/~1/g, "/").replace(/~0/g, "~");
  }
  W.unescapeJsonPointer = h;
  function b($, g) {
    if (Array.isArray($))
      for (const E of $)
        g(E);
    else
      g($);
  }
  W.eachItem = b;
  function w({ mergeNames: $, mergeToName: g, mergeValues: E, resultToName: P }) {
    return (D, V, F, K) => {
      const L = F === void 0 ? V : F instanceof e.Name ? (V instanceof e.Name ? $(D, V, F) : g(D, V, F), F) : V instanceof e.Name ? (g(D, F, V), V) : E(V, F);
      return K === e.Name && !(L instanceof e.Name) ? P(D, L) : L;
    };
  }
  W.mergeEvaluated = {
    props: w({
      mergeNames: ($, g, E) => $.if((0, e._)`${E} !== true && ${g} !== undefined`, () => {
        $.if((0, e._)`${g} === true`, () => $.assign(E, !0), () => $.assign(E, (0, e._)`${E} || {}`).code((0, e._)`Object.assign(${E}, ${g})`));
      }),
      mergeToName: ($, g, E) => $.if((0, e._)`${E} !== true`, () => {
        g === !0 ? $.assign(E, !0) : ($.assign(E, (0, e._)`${E} || {}`), v($, E, g));
      }),
      mergeValues: ($, g) => $ === !0 ? !0 : { ...$, ...g },
      resultToName: S
    }),
    items: w({
      mergeNames: ($, g, E) => $.if((0, e._)`${E} !== true && ${g} !== undefined`, () => $.assign(E, (0, e._)`${g} === true ? true : ${E} > ${g} ? ${E} : ${g}`)),
      mergeToName: ($, g, E) => $.if((0, e._)`${E} !== true`, () => $.assign(E, g === !0 ? !0 : (0, e._)`${E} > ${g} ? ${E} : ${g}`)),
      mergeValues: ($, g) => $ === !0 ? !0 : Math.max($, g),
      resultToName: ($, g) => $.var("items", g)
    })
  };
  function S($, g) {
    if (g === !0)
      return $.var("props", !0);
    const E = $.var("props", (0, e._)`{}`);
    return g !== void 0 && v($, E, g), E;
  }
  W.evaluatedPropsToName = S;
  function v($, g, E) {
    Object.keys(E).forEach((P) => $.assign((0, e._)`${g}${(0, e.getProperty)(P)}`, !0));
  }
  W.setEvaluated = v;
  const d = {};
  function u($, g) {
    return $.scopeValue("func", {
      ref: g,
      code: d[g.code] || (d[g.code] = new t._Code(g.code))
    });
  }
  W.useFunc = u;
  var o;
  (function($) {
    $[$.Num = 0] = "Num", $[$.Str = 1] = "Str";
  })(o || (W.Type = o = {}));
  function l($, g, E) {
    if ($ instanceof e.Name) {
      const P = g === o.Num;
      return E ? P ? (0, e._)`"[" + ${$} + "]"` : (0, e._)`"['" + ${$} + "']"` : P ? (0, e._)`"/" + ${$}` : (0, e._)`"/" + ${$}.replace(/~/g, "~0").replace(/\\//g, "~1")`;
    }
    return E ? (0, e.getProperty)($).toString() : "/" + p($);
  }
  W.getErrorPath = l;
  function m($, g, E = $.opts.strictSchema) {
    if (E) {
      if (g = `strict mode: ${g}`, E === !0)
        throw new Error(g);
      $.self.logger.warn(g);
    }
  }
  return W.checkStrictMode = m, W;
}
var gr = {}, li;
function pt() {
  if (li) return gr;
  li = 1, Object.defineProperty(gr, "__esModule", { value: !0 });
  const e = Y(), t = {
    // validation function arguments
    data: new e.Name("data"),
    // data passed to validation function
    // args passed from referencing schema
    valCxt: new e.Name("valCxt"),
    // validation/data context - should not be used directly, it is destructured to the names below
    instancePath: new e.Name("instancePath"),
    parentData: new e.Name("parentData"),
    parentDataProperty: new e.Name("parentDataProperty"),
    rootData: new e.Name("rootData"),
    // root data - same as the data passed to the first/top validation function
    dynamicAnchors: new e.Name("dynamicAnchors"),
    // used to support recursiveRef and dynamicRef
    // function scoped variables
    vErrors: new e.Name("vErrors"),
    // null or array of validation errors
    errors: new e.Name("errors"),
    // counter of validation errors
    this: new e.Name("this"),
    // "globals"
    self: new e.Name("self"),
    scope: new e.Name("scope"),
    // JTD serialize/parse name for JSON string and position
    json: new e.Name("json"),
    jsonPos: new e.Name("jsonPos"),
    jsonLen: new e.Name("jsonLen"),
    jsonPart: new e.Name("jsonPart")
  };
  return gr.default = t, gr;
}
var fi;
function Rn() {
  return fi || (fi = 1, function(e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.extendErrors = e.resetErrorsCount = e.reportExtraError = e.reportError = e.keyword$DataError = e.keywordError = void 0;
    const t = Y(), r = te(), n = pt();
    e.keywordError = {
      message: ({ keyword: d }) => (0, t.str)`must pass "${d}" keyword validation`
    }, e.keyword$DataError = {
      message: ({ keyword: d, schemaType: u }) => u ? (0, t.str)`"${d}" keyword must be ${u} ($data)` : (0, t.str)`"${d}" keyword is invalid ($data)`
    };
    function i(d, u = e.keywordError, o, l) {
      const { it: m } = d, { gen: $, compositeRule: g, allErrors: E } = m, P = h(d, u, o);
      l ?? (g || E) ? f($, P) : _(m, (0, t._)`[${P}]`);
    }
    e.reportError = i;
    function s(d, u = e.keywordError, o) {
      const { it: l } = d, { gen: m, compositeRule: $, allErrors: g } = l, E = h(d, u, o);
      f(m, E), $ || g || _(l, n.default.vErrors);
    }
    e.reportExtraError = s;
    function c(d, u) {
      d.assign(n.default.errors, u), d.if((0, t._)`${n.default.vErrors} !== null`, () => d.if(u, () => d.assign((0, t._)`${n.default.vErrors}.length`, u), () => d.assign(n.default.vErrors, null)));
    }
    e.resetErrorsCount = c;
    function a({ gen: d, keyword: u, schemaValue: o, data: l, errsCount: m, it: $ }) {
      if (m === void 0)
        throw new Error("ajv implementation error");
      const g = d.name("err");
      d.forRange("i", m, n.default.errors, (E) => {
        d.const(g, (0, t._)`${n.default.vErrors}[${E}]`), d.if((0, t._)`${g}.instancePath === undefined`, () => d.assign((0, t._)`${g}.instancePath`, (0, t.strConcat)(n.default.instancePath, $.errorPath))), d.assign((0, t._)`${g}.schemaPath`, (0, t.str)`${$.errSchemaPath}/${u}`), $.opts.verbose && (d.assign((0, t._)`${g}.schema`, o), d.assign((0, t._)`${g}.data`, l));
      });
    }
    e.extendErrors = a;
    function f(d, u) {
      const o = d.const("err", u);
      d.if((0, t._)`${n.default.vErrors} === null`, () => d.assign(n.default.vErrors, (0, t._)`[${o}]`), (0, t._)`${n.default.vErrors}.push(${o})`), d.code((0, t._)`${n.default.errors}++`);
    }
    function _(d, u) {
      const { gen: o, validateName: l, schemaEnv: m } = d;
      m.$async ? o.throw((0, t._)`new ${d.ValidationError}(${u})`) : (o.assign((0, t._)`${l}.errors`, u), o.return(!1));
    }
    const p = {
      keyword: new t.Name("keyword"),
      schemaPath: new t.Name("schemaPath"),
      // also used in JTD errors
      params: new t.Name("params"),
      propertyName: new t.Name("propertyName"),
      message: new t.Name("message"),
      schema: new t.Name("schema"),
      parentSchema: new t.Name("parentSchema")
    };
    function h(d, u, o) {
      const { createErrors: l } = d.it;
      return l === !1 ? (0, t._)`{}` : b(d, u, o);
    }
    function b(d, u, o = {}) {
      const { gen: l, it: m } = d, $ = [
        w(m, o),
        S(d, o)
      ];
      return v(d, u, $), l.object(...$);
    }
    function w({ errorPath: d }, { instancePath: u }) {
      const o = u ? (0, t.str)`${d}${(0, r.getErrorPath)(u, r.Type.Str)}` : d;
      return [n.default.instancePath, (0, t.strConcat)(n.default.instancePath, o)];
    }
    function S({ keyword: d, it: { errSchemaPath: u } }, { schemaPath: o, parentSchema: l }) {
      let m = l ? u : (0, t.str)`${u}/${d}`;
      return o && (m = (0, t.str)`${m}${(0, r.getErrorPath)(o, r.Type.Str)}`), [p.schemaPath, m];
    }
    function v(d, { params: u, message: o }, l) {
      const { keyword: m, data: $, schemaValue: g, it: E } = d, { opts: P, propertyName: D, topSchemaRef: V, schemaPath: F } = E;
      l.push([p.keyword, m], [p.params, typeof u == "function" ? u(d) : u || (0, t._)`{}`]), P.messages && l.push([p.message, typeof o == "function" ? o(d) : o]), P.verbose && l.push([p.schema, g], [p.parentSchema, (0, t._)`${V}${F}`], [n.default.data, $]), D && l.push([p.propertyName, D]);
    }
  }(Kn)), Kn;
}
var di;
function Iu() {
  if (di) return mt;
  di = 1, Object.defineProperty(mt, "__esModule", { value: !0 }), mt.boolOrEmptySchema = mt.topBoolOrEmptySchema = void 0;
  const e = Rn(), t = Y(), r = pt(), n = {
    message: "boolean schema is false"
  };
  function i(a) {
    const { gen: f, schema: _, validateName: p } = a;
    _ === !1 ? c(a, !1) : typeof _ == "object" && _.$async === !0 ? f.return(r.default.data) : (f.assign((0, t._)`${p}.errors`, null), f.return(!0));
  }
  mt.topBoolOrEmptySchema = i;
  function s(a, f) {
    const { gen: _, schema: p } = a;
    p === !1 ? (_.var(f, !1), c(a)) : _.var(f, !0);
  }
  mt.boolOrEmptySchema = s;
  function c(a, f) {
    const { gen: _, data: p } = a, h = {
      gen: _,
      keyword: "false schema",
      data: p,
      schema: !1,
      schemaCode: !1,
      schemaValue: !1,
      params: {},
      it: a
    };
    (0, e.reportError)(h, n, void 0, f);
  }
  return mt;
}
var he = {}, yt = {}, hi;
function Ea() {
  if (hi) return yt;
  hi = 1, Object.defineProperty(yt, "__esModule", { value: !0 }), yt.getRules = yt.isJSONType = void 0;
  const e = ["string", "number", "integer", "boolean", "null", "object", "array"], t = new Set(e);
  function r(i) {
    return typeof i == "string" && t.has(i);
  }
  yt.isJSONType = r;
  function n() {
    const i = {
      number: { type: "number", rules: [] },
      string: { type: "string", rules: [] },
      array: { type: "array", rules: [] },
      object: { type: "object", rules: [] }
    };
    return {
      types: { ...i, integer: !0, boolean: !0, null: !0 },
      rules: [{ rules: [] }, i.number, i.string, i.array, i.object],
      post: { rules: [] },
      all: {},
      keywords: {}
    };
  }
  return yt.getRules = n, yt;
}
var He = {}, pi;
function Sa() {
  if (pi) return He;
  pi = 1, Object.defineProperty(He, "__esModule", { value: !0 }), He.shouldUseRule = He.shouldUseGroup = He.schemaHasRulesForType = void 0;
  function e({ schema: n, self: i }, s) {
    const c = i.RULES.types[s];
    return c && c !== !0 && t(n, c);
  }
  He.schemaHasRulesForType = e;
  function t(n, i) {
    return i.rules.some((s) => r(n, s));
  }
  He.shouldUseGroup = t;
  function r(n, i) {
    var s;
    return n[i.keyword] !== void 0 || ((s = i.definition.implements) === null || s === void 0 ? void 0 : s.some((c) => n[c] !== void 0));
  }
  return He.shouldUseRule = r, He;
}
var mi;
function yn() {
  if (mi) return he;
  mi = 1, Object.defineProperty(he, "__esModule", { value: !0 }), he.reportTypeError = he.checkDataTypes = he.checkDataType = he.coerceAndCheckDataType = he.getJSONTypes = he.getSchemaTypes = he.DataType = void 0;
  const e = Ea(), t = Sa(), r = Rn(), n = Y(), i = te();
  var s;
  (function(o) {
    o[o.Correct = 0] = "Correct", o[o.Wrong = 1] = "Wrong";
  })(s || (he.DataType = s = {}));
  function c(o) {
    const l = a(o.type);
    if (l.includes("null")) {
      if (o.nullable === !1)
        throw new Error("type: null contradicts nullable: false");
    } else {
      if (!l.length && o.nullable !== void 0)
        throw new Error('"nullable" cannot be used without "type"');
      o.nullable === !0 && l.push("null");
    }
    return l;
  }
  he.getSchemaTypes = c;
  function a(o) {
    const l = Array.isArray(o) ? o : o ? [o] : [];
    if (l.every(e.isJSONType))
      return l;
    throw new Error("type must be JSONType or JSONType[]: " + l.join(","));
  }
  he.getJSONTypes = a;
  function f(o, l) {
    const { gen: m, data: $, opts: g } = o, E = p(l, g.coerceTypes), P = l.length > 0 && !(E.length === 0 && l.length === 1 && (0, t.schemaHasRulesForType)(o, l[0]));
    if (P) {
      const D = S(l, $, g.strictNumbers, s.Wrong);
      m.if(D, () => {
        E.length ? h(o, l, E) : d(o);
      });
    }
    return P;
  }
  he.coerceAndCheckDataType = f;
  const _ = /* @__PURE__ */ new Set(["string", "number", "integer", "boolean", "null"]);
  function p(o, l) {
    return l ? o.filter((m) => _.has(m) || l === "array" && m === "array") : [];
  }
  function h(o, l, m) {
    const { gen: $, data: g, opts: E } = o, P = $.let("dataType", (0, n._)`typeof ${g}`), D = $.let("coerced", (0, n._)`undefined`);
    E.coerceTypes === "array" && $.if((0, n._)`${P} == 'object' && Array.isArray(${g}) && ${g}.length == 1`, () => $.assign(g, (0, n._)`${g}[0]`).assign(P, (0, n._)`typeof ${g}`).if(S(l, g, E.strictNumbers), () => $.assign(D, g))), $.if((0, n._)`${D} !== undefined`);
    for (const F of m)
      (_.has(F) || F === "array" && E.coerceTypes === "array") && V(F);
    $.else(), d(o), $.endIf(), $.if((0, n._)`${D} !== undefined`, () => {
      $.assign(g, D), b(o, D);
    });
    function V(F) {
      switch (F) {
        case "string":
          $.elseIf((0, n._)`${P} == "number" || ${P} == "boolean"`).assign(D, (0, n._)`"" + ${g}`).elseIf((0, n._)`${g} === null`).assign(D, (0, n._)`""`);
          return;
        case "number":
          $.elseIf((0, n._)`${P} == "boolean" || ${g} === null
              || (${P} == "string" && ${g} && ${g} == +${g})`).assign(D, (0, n._)`+${g}`);
          return;
        case "integer":
          $.elseIf((0, n._)`${P} === "boolean" || ${g} === null
              || (${P} === "string" && ${g} && ${g} == +${g} && !(${g} % 1))`).assign(D, (0, n._)`+${g}`);
          return;
        case "boolean":
          $.elseIf((0, n._)`${g} === "false" || ${g} === 0 || ${g} === null`).assign(D, !1).elseIf((0, n._)`${g} === "true" || ${g} === 1`).assign(D, !0);
          return;
        case "null":
          $.elseIf((0, n._)`${g} === "" || ${g} === 0 || ${g} === false`), $.assign(D, null);
          return;
        case "array":
          $.elseIf((0, n._)`${P} === "string" || ${P} === "number"
              || ${P} === "boolean" || ${g} === null`).assign(D, (0, n._)`[${g}]`);
      }
    }
  }
  function b({ gen: o, parentData: l, parentDataProperty: m }, $) {
    o.if((0, n._)`${l} !== undefined`, () => o.assign((0, n._)`${l}[${m}]`, $));
  }
  function w(o, l, m, $ = s.Correct) {
    const g = $ === s.Correct ? n.operators.EQ : n.operators.NEQ;
    let E;
    switch (o) {
      case "null":
        return (0, n._)`${l} ${g} null`;
      case "array":
        E = (0, n._)`Array.isArray(${l})`;
        break;
      case "object":
        E = (0, n._)`${l} && typeof ${l} == "object" && !Array.isArray(${l})`;
        break;
      case "integer":
        E = P((0, n._)`!(${l} % 1) && !isNaN(${l})`);
        break;
      case "number":
        E = P();
        break;
      default:
        return (0, n._)`typeof ${l} ${g} ${o}`;
    }
    return $ === s.Correct ? E : (0, n.not)(E);
    function P(D = n.nil) {
      return (0, n.and)((0, n._)`typeof ${l} == "number"`, D, m ? (0, n._)`isFinite(${l})` : n.nil);
    }
  }
  he.checkDataType = w;
  function S(o, l, m, $) {
    if (o.length === 1)
      return w(o[0], l, m, $);
    let g;
    const E = (0, i.toHash)(o);
    if (E.array && E.object) {
      const P = (0, n._)`typeof ${l} != "object"`;
      g = E.null ? P : (0, n._)`!${l} || ${P}`, delete E.null, delete E.array, delete E.object;
    } else
      g = n.nil;
    E.number && delete E.integer;
    for (const P in E)
      g = (0, n.and)(g, w(P, l, m, $));
    return g;
  }
  he.checkDataTypes = S;
  const v = {
    message: ({ schema: o }) => `must be ${o}`,
    params: ({ schema: o, schemaValue: l }) => typeof o == "string" ? (0, n._)`{type: ${o}}` : (0, n._)`{type: ${l}}`
  };
  function d(o) {
    const l = u(o);
    (0, r.reportError)(l, v);
  }
  he.reportTypeError = d;
  function u(o) {
    const { gen: l, data: m, schema: $ } = o, g = (0, i.schemaRefOrVal)(o, $, "type");
    return {
      gen: l,
      keyword: "type",
      data: m,
      schema: $.type,
      schemaCode: g,
      schemaValue: g,
      parentSchema: $,
      params: {},
      it: o
    };
  }
  return he;
}
var Wt = {}, yi;
function ku() {
  if (yi) return Wt;
  yi = 1, Object.defineProperty(Wt, "__esModule", { value: !0 }), Wt.assignDefaults = void 0;
  const e = Y(), t = te();
  function r(i, s) {
    const { properties: c, items: a } = i.schema;
    if (s === "object" && c)
      for (const f in c)
        n(i, f, c[f].default);
    else s === "array" && Array.isArray(a) && a.forEach((f, _) => n(i, _, f.default));
  }
  Wt.assignDefaults = r;
  function n(i, s, c) {
    const { gen: a, compositeRule: f, data: _, opts: p } = i;
    if (c === void 0)
      return;
    const h = (0, e._)`${_}${(0, e.getProperty)(s)}`;
    if (f) {
      (0, t.checkStrictMode)(i, `default is ignored for: ${h}`);
      return;
    }
    let b = (0, e._)`${h} === undefined`;
    p.useDefaults === "empty" && (b = (0, e._)`${b} || ${h} === null || ${h} === ""`), a.if(b, (0, e._)`${h} = ${(0, e.stringify)(c)}`);
  }
  return Wt;
}
var Ae = {}, ie = {}, _i;
function Fe() {
  if (_i) return ie;
  _i = 1, Object.defineProperty(ie, "__esModule", { value: !0 }), ie.validateUnion = ie.validateArray = ie.usePattern = ie.callValidateCode = ie.schemaProperties = ie.allSchemaProperties = ie.noPropertyInData = ie.propertyInData = ie.isOwnProperty = ie.hasPropFunc = ie.reportMissingProp = ie.checkMissingProp = ie.checkReportMissingProp = void 0;
  const e = Y(), t = te(), r = pt(), n = te();
  function i(o, l) {
    const { gen: m, data: $, it: g } = o;
    m.if(p(m, $, l, g.opts.ownProperties), () => {
      o.setParams({ missingProperty: (0, e._)`${l}` }, !0), o.error();
    });
  }
  ie.checkReportMissingProp = i;
  function s({ gen: o, data: l, it: { opts: m } }, $, g) {
    return (0, e.or)(...$.map((E) => (0, e.and)(p(o, l, E, m.ownProperties), (0, e._)`${g} = ${E}`)));
  }
  ie.checkMissingProp = s;
  function c(o, l) {
    o.setParams({ missingProperty: l }, !0), o.error();
  }
  ie.reportMissingProp = c;
  function a(o) {
    return o.scopeValue("func", {
      // eslint-disable-next-line @typescript-eslint/unbound-method
      ref: Object.prototype.hasOwnProperty,
      code: (0, e._)`Object.prototype.hasOwnProperty`
    });
  }
  ie.hasPropFunc = a;
  function f(o, l, m) {
    return (0, e._)`${a(o)}.call(${l}, ${m})`;
  }
  ie.isOwnProperty = f;
  function _(o, l, m, $) {
    const g = (0, e._)`${l}${(0, e.getProperty)(m)} !== undefined`;
    return $ ? (0, e._)`${g} && ${f(o, l, m)}` : g;
  }
  ie.propertyInData = _;
  function p(o, l, m, $) {
    const g = (0, e._)`${l}${(0, e.getProperty)(m)} === undefined`;
    return $ ? (0, e.or)(g, (0, e.not)(f(o, l, m))) : g;
  }
  ie.noPropertyInData = p;
  function h(o) {
    return o ? Object.keys(o).filter((l) => l !== "__proto__") : [];
  }
  ie.allSchemaProperties = h;
  function b(o, l) {
    return h(l).filter((m) => !(0, t.alwaysValidSchema)(o, l[m]));
  }
  ie.schemaProperties = b;
  function w({ schemaCode: o, data: l, it: { gen: m, topSchemaRef: $, schemaPath: g, errorPath: E }, it: P }, D, V, F) {
    const K = F ? (0, e._)`${o}, ${l}, ${$}${g}` : l, L = [
      [r.default.instancePath, (0, e.strConcat)(r.default.instancePath, E)],
      [r.default.parentData, P.parentData],
      [r.default.parentDataProperty, P.parentDataProperty],
      [r.default.rootData, r.default.rootData]
    ];
    P.opts.dynamicRef && L.push([r.default.dynamicAnchors, r.default.dynamicAnchors]);
    const J = (0, e._)`${K}, ${m.object(...L)}`;
    return V !== e.nil ? (0, e._)`${D}.call(${V}, ${J})` : (0, e._)`${D}(${J})`;
  }
  ie.callValidateCode = w;
  const S = (0, e._)`new RegExp`;
  function v({ gen: o, it: { opts: l } }, m) {
    const $ = l.unicodeRegExp ? "u" : "", { regExp: g } = l.code, E = g(m, $);
    return o.scopeValue("pattern", {
      key: E.toString(),
      ref: E,
      code: (0, e._)`${g.code === "new RegExp" ? S : (0, n.useFunc)(o, g)}(${m}, ${$})`
    });
  }
  ie.usePattern = v;
  function d(o) {
    const { gen: l, data: m, keyword: $, it: g } = o, E = l.name("valid");
    if (g.allErrors) {
      const D = l.let("valid", !0);
      return P(() => l.assign(D, !1)), D;
    }
    return l.var(E, !0), P(() => l.break()), E;
    function P(D) {
      const V = l.const("len", (0, e._)`${m}.length`);
      l.forRange("i", 0, V, (F) => {
        o.subschema({
          keyword: $,
          dataProp: F,
          dataPropType: t.Type.Num
        }, E), l.if((0, e.not)(E), D);
      });
    }
  }
  ie.validateArray = d;
  function u(o) {
    const { gen: l, schema: m, keyword: $, it: g } = o;
    if (!Array.isArray(m))
      throw new Error("ajv implementation error");
    if (m.some((V) => (0, t.alwaysValidSchema)(g, V)) && !g.opts.unevaluated)
      return;
    const P = l.let("valid", !1), D = l.name("_valid");
    l.block(() => m.forEach((V, F) => {
      const K = o.subschema({
        keyword: $,
        schemaProp: F,
        compositeRule: !0
      }, D);
      l.assign(P, (0, e._)`${P} || ${D}`), o.mergeValidEvaluated(K, D) || l.if((0, e.not)(P));
    })), o.result(P, () => o.reset(), () => o.error(!0));
  }
  return ie.validateUnion = u, ie;
}
var gi;
function Du() {
  if (gi) return Ae;
  gi = 1, Object.defineProperty(Ae, "__esModule", { value: !0 }), Ae.validateKeywordUsage = Ae.validSchemaType = Ae.funcKeywordCode = Ae.macroKeywordCode = void 0;
  const e = Y(), t = pt(), r = Fe(), n = Rn();
  function i(b, w) {
    const { gen: S, keyword: v, schema: d, parentSchema: u, it: o } = b, l = w.macro.call(o.self, d, u, o), m = _(S, v, l);
    o.opts.validateSchema !== !1 && o.self.validateSchema(l, !0);
    const $ = S.name("valid");
    b.subschema({
      schema: l,
      schemaPath: e.nil,
      errSchemaPath: `${o.errSchemaPath}/${v}`,
      topSchemaRef: m,
      compositeRule: !0
    }, $), b.pass($, () => b.error(!0));
  }
  Ae.macroKeywordCode = i;
  function s(b, w) {
    var S;
    const { gen: v, keyword: d, schema: u, parentSchema: o, $data: l, it: m } = b;
    f(m, w);
    const $ = !l && w.compile ? w.compile.call(m.self, u, o, m) : w.validate, g = _(v, d, $), E = v.let("valid");
    b.block$data(E, P), b.ok((S = w.valid) !== null && S !== void 0 ? S : E);
    function P() {
      if (w.errors === !1)
        F(), w.modifying && c(b), K(() => b.error());
      else {
        const L = w.async ? D() : V();
        w.modifying && c(b), K(() => a(b, L));
      }
    }
    function D() {
      const L = v.let("ruleErrs", null);
      return v.try(() => F((0, e._)`await `), (J) => v.assign(E, !1).if((0, e._)`${J} instanceof ${m.ValidationError}`, () => v.assign(L, (0, e._)`${J}.errors`), () => v.throw(J))), L;
    }
    function V() {
      const L = (0, e._)`${g}.errors`;
      return v.assign(L, null), F(e.nil), L;
    }
    function F(L = w.async ? (0, e._)`await ` : e.nil) {
      const J = m.opts.passContext ? t.default.this : t.default.self, B = !("compile" in w && !l || w.schema === !1);
      v.assign(E, (0, e._)`${L}${(0, r.callValidateCode)(b, g, J, B)}`, w.modifying);
    }
    function K(L) {
      var J;
      v.if((0, e.not)((J = w.valid) !== null && J !== void 0 ? J : E), L);
    }
  }
  Ae.funcKeywordCode = s;
  function c(b) {
    const { gen: w, data: S, it: v } = b;
    w.if(v.parentData, () => w.assign(S, (0, e._)`${v.parentData}[${v.parentDataProperty}]`));
  }
  function a(b, w) {
    const { gen: S } = b;
    S.if((0, e._)`Array.isArray(${w})`, () => {
      S.assign(t.default.vErrors, (0, e._)`${t.default.vErrors} === null ? ${w} : ${t.default.vErrors}.concat(${w})`).assign(t.default.errors, (0, e._)`${t.default.vErrors}.length`), (0, n.extendErrors)(b);
    }, () => b.error());
  }
  function f({ schemaEnv: b }, w) {
    if (w.async && !b.$async)
      throw new Error("async keyword in sync schema");
  }
  function _(b, w, S) {
    if (S === void 0)
      throw new Error(`keyword "${w}" failed to compile`);
    return b.scopeValue("keyword", typeof S == "function" ? { ref: S } : { ref: S, code: (0, e.stringify)(S) });
  }
  function p(b, w, S = !1) {
    return !w.length || w.some((v) => v === "array" ? Array.isArray(b) : v === "object" ? b && typeof b == "object" && !Array.isArray(b) : typeof b == v || S && typeof b > "u");
  }
  Ae.validSchemaType = p;
  function h({ schema: b, opts: w, self: S, errSchemaPath: v }, d, u) {
    if (Array.isArray(d.keyword) ? !d.keyword.includes(u) : d.keyword !== u)
      throw new Error("ajv implementation error");
    const o = d.dependencies;
    if (o != null && o.some((l) => !Object.prototype.hasOwnProperty.call(b, l)))
      throw new Error(`parent schema must have dependencies of ${u}: ${o.join(",")}`);
    if (d.validateSchema && !d.validateSchema(b[u])) {
      const m = `keyword "${u}" value is invalid at path "${v}": ` + S.errorsText(d.validateSchema.errors);
      if (w.validateSchema === "log")
        S.logger.error(m);
      else
        throw new Error(m);
    }
  }
  return Ae.validateKeywordUsage = h, Ae;
}
var xe = {}, vi;
function qu() {
  if (vi) return xe;
  vi = 1, Object.defineProperty(xe, "__esModule", { value: !0 }), xe.extendSubschemaMode = xe.extendSubschemaData = xe.getSubschema = void 0;
  const e = Y(), t = te();
  function r(s, { keyword: c, schemaProp: a, schema: f, schemaPath: _, errSchemaPath: p, topSchemaRef: h }) {
    if (c !== void 0 && f !== void 0)
      throw new Error('both "keyword" and "schema" passed, only one allowed');
    if (c !== void 0) {
      const b = s.schema[c];
      return a === void 0 ? {
        schema: b,
        schemaPath: (0, e._)`${s.schemaPath}${(0, e.getProperty)(c)}`,
        errSchemaPath: `${s.errSchemaPath}/${c}`
      } : {
        schema: b[a],
        schemaPath: (0, e._)`${s.schemaPath}${(0, e.getProperty)(c)}${(0, e.getProperty)(a)}`,
        errSchemaPath: `${s.errSchemaPath}/${c}/${(0, t.escapeFragment)(a)}`
      };
    }
    if (f !== void 0) {
      if (_ === void 0 || p === void 0 || h === void 0)
        throw new Error('"schemaPath", "errSchemaPath" and "topSchemaRef" are required with "schema"');
      return {
        schema: f,
        schemaPath: _,
        topSchemaRef: h,
        errSchemaPath: p
      };
    }
    throw new Error('either "keyword" or "schema" must be passed');
  }
  xe.getSubschema = r;
  function n(s, c, { dataProp: a, dataPropType: f, data: _, dataTypes: p, propertyName: h }) {
    if (_ !== void 0 && a !== void 0)
      throw new Error('both "data" and "dataProp" passed, only one allowed');
    const { gen: b } = c;
    if (a !== void 0) {
      const { errorPath: S, dataPathArr: v, opts: d } = c, u = b.let("data", (0, e._)`${c.data}${(0, e.getProperty)(a)}`, !0);
      w(u), s.errorPath = (0, e.str)`${S}${(0, t.getErrorPath)(a, f, d.jsPropertySyntax)}`, s.parentDataProperty = (0, e._)`${a}`, s.dataPathArr = [...v, s.parentDataProperty];
    }
    if (_ !== void 0) {
      const S = _ instanceof e.Name ? _ : b.let("data", _, !0);
      w(S), h !== void 0 && (s.propertyName = h);
    }
    p && (s.dataTypes = p);
    function w(S) {
      s.data = S, s.dataLevel = c.dataLevel + 1, s.dataTypes = [], c.definedProperties = /* @__PURE__ */ new Set(), s.parentData = c.data, s.dataNames = [...c.dataNames, S];
    }
  }
  xe.extendSubschemaData = n;
  function i(s, { jtdDiscriminator: c, jtdMetadata: a, compositeRule: f, createErrors: _, allErrors: p }) {
    f !== void 0 && (s.compositeRule = f), _ !== void 0 && (s.createErrors = _), p !== void 0 && (s.allErrors = p), s.jtdDiscriminator = c, s.jtdMetadata = a;
  }
  return xe.extendSubschemaMode = i, xe;
}
var ge = {}, Wn, $i;
function Ra() {
  return $i || ($i = 1, Wn = function e(t, r) {
    if (t === r) return !0;
    if (t && r && typeof t == "object" && typeof r == "object") {
      if (t.constructor !== r.constructor) return !1;
      var n, i, s;
      if (Array.isArray(t)) {
        if (n = t.length, n != r.length) return !1;
        for (i = n; i-- !== 0; )
          if (!e(t[i], r[i])) return !1;
        return !0;
      }
      if (t.constructor === RegExp) return t.source === r.source && t.flags === r.flags;
      if (t.valueOf !== Object.prototype.valueOf) return t.valueOf() === r.valueOf();
      if (t.toString !== Object.prototype.toString) return t.toString() === r.toString();
      if (s = Object.keys(t), n = s.length, n !== Object.keys(r).length) return !1;
      for (i = n; i-- !== 0; )
        if (!Object.prototype.hasOwnProperty.call(r, s[i])) return !1;
      for (i = n; i-- !== 0; ) {
        var c = s[i];
        if (!e(t[c], r[c])) return !1;
      }
      return !0;
    }
    return t !== t && r !== r;
  }), Wn;
}
var Gn = { exports: {} }, bi;
function Au() {
  if (bi) return Gn.exports;
  bi = 1;
  var e = Gn.exports = function(n, i, s) {
    typeof i == "function" && (s = i, i = {}), s = i.cb || s;
    var c = typeof s == "function" ? s : s.pre || function() {
    }, a = s.post || function() {
    };
    t(i, c, a, n, "", n);
  };
  e.keywords = {
    additionalItems: !0,
    items: !0,
    contains: !0,
    additionalProperties: !0,
    propertyNames: !0,
    not: !0,
    if: !0,
    then: !0,
    else: !0
  }, e.arrayKeywords = {
    items: !0,
    allOf: !0,
    anyOf: !0,
    oneOf: !0
  }, e.propsKeywords = {
    $defs: !0,
    definitions: !0,
    properties: !0,
    patternProperties: !0,
    dependencies: !0
  }, e.skipKeywords = {
    default: !0,
    enum: !0,
    const: !0,
    required: !0,
    maximum: !0,
    minimum: !0,
    exclusiveMaximum: !0,
    exclusiveMinimum: !0,
    multipleOf: !0,
    maxLength: !0,
    minLength: !0,
    pattern: !0,
    format: !0,
    maxItems: !0,
    minItems: !0,
    uniqueItems: !0,
    maxProperties: !0,
    minProperties: !0
  };
  function t(n, i, s, c, a, f, _, p, h, b) {
    if (c && typeof c == "object" && !Array.isArray(c)) {
      i(c, a, f, _, p, h, b);
      for (var w in c) {
        var S = c[w];
        if (Array.isArray(S)) {
          if (w in e.arrayKeywords)
            for (var v = 0; v < S.length; v++)
              t(n, i, s, S[v], a + "/" + w + "/" + v, f, a, w, c, v);
        } else if (w in e.propsKeywords) {
          if (S && typeof S == "object")
            for (var d in S)
              t(n, i, s, S[d], a + "/" + w + "/" + r(d), f, a, w, c, d);
        } else (w in e.keywords || n.allKeys && !(w in e.skipKeywords)) && t(n, i, s, S, a + "/" + w, f, a, w, c);
      }
      s(c, a, f, _, p, h, b);
    }
  }
  function r(n) {
    return n.replace(/~/g, "~0").replace(/\//g, "~1");
  }
  return Gn.exports;
}
var wi;
function On() {
  if (wi) return ge;
  wi = 1, Object.defineProperty(ge, "__esModule", { value: !0 }), ge.getSchemaRefs = ge.resolveUrl = ge.normalizeId = ge._getFullPath = ge.getFullPath = ge.inlineRef = void 0;
  const e = te(), t = Ra(), r = Au(), n = /* @__PURE__ */ new Set([
    "type",
    "format",
    "pattern",
    "maxLength",
    "minLength",
    "maxProperties",
    "minProperties",
    "maxItems",
    "minItems",
    "maximum",
    "minimum",
    "uniqueItems",
    "multipleOf",
    "required",
    "enum",
    "const"
  ]);
  function i(v, d = !0) {
    return typeof v == "boolean" ? !0 : d === !0 ? !c(v) : d ? a(v) <= d : !1;
  }
  ge.inlineRef = i;
  const s = /* @__PURE__ */ new Set([
    "$ref",
    "$recursiveRef",
    "$recursiveAnchor",
    "$dynamicRef",
    "$dynamicAnchor"
  ]);
  function c(v) {
    for (const d in v) {
      if (s.has(d))
        return !0;
      const u = v[d];
      if (Array.isArray(u) && u.some(c) || typeof u == "object" && c(u))
        return !0;
    }
    return !1;
  }
  function a(v) {
    let d = 0;
    for (const u in v) {
      if (u === "$ref")
        return 1 / 0;
      if (d++, !n.has(u) && (typeof v[u] == "object" && (0, e.eachItem)(v[u], (o) => d += a(o)), d === 1 / 0))
        return 1 / 0;
    }
    return d;
  }
  function f(v, d = "", u) {
    u !== !1 && (d = h(d));
    const o = v.parse(d);
    return _(v, o);
  }
  ge.getFullPath = f;
  function _(v, d) {
    return v.serialize(d).split("#")[0] + "#";
  }
  ge._getFullPath = _;
  const p = /#\/?$/;
  function h(v) {
    return v ? v.replace(p, "") : "";
  }
  ge.normalizeId = h;
  function b(v, d, u) {
    return u = h(u), v.resolve(d, u);
  }
  ge.resolveUrl = b;
  const w = /^[a-z_][-a-z0-9._]*$/i;
  function S(v, d) {
    if (typeof v == "boolean")
      return {};
    const { schemaId: u, uriResolver: o } = this.opts, l = h(v[u] || d), m = { "": l }, $ = f(o, l, !1), g = {}, E = /* @__PURE__ */ new Set();
    return r(v, { allKeys: !0 }, (V, F, K, L) => {
      if (L === void 0)
        return;
      const J = $ + F;
      let B = m[L];
      typeof V[u] == "string" && (B = we.call(this, V[u])), ce.call(this, V.$anchor), ce.call(this, V.$dynamicAnchor), m[F] = B;
      function we(x) {
        const me = this.opts.uriResolver.resolve;
        if (x = h(B ? me(B, x) : x), E.has(x))
          throw D(x);
        E.add(x);
        let A = this.refs[x];
        return typeof A == "string" && (A = this.refs[A]), typeof A == "object" ? P(V, A.schema, x) : x !== h(J) && (x[0] === "#" ? (P(V, g[x], x), g[x] = V) : this.refs[x] = J), x;
      }
      function ce(x) {
        if (typeof x == "string") {
          if (!w.test(x))
            throw new Error(`invalid anchor "${x}"`);
          we.call(this, `#${x}`);
        }
      }
    }), g;
    function P(V, F, K) {
      if (F !== void 0 && !t(V, F))
        throw D(K);
    }
    function D(V) {
      return new Error(`reference "${V}" resolves to more than one schema`);
    }
  }
  return ge.getSchemaRefs = S, ge;
}
var Ei;
function Nn() {
  if (Ei) return Ke;
  Ei = 1, Object.defineProperty(Ke, "__esModule", { value: !0 }), Ke.getData = Ke.KeywordCxt = Ke.validateFunctionCode = void 0;
  const e = Iu(), t = yn(), r = Sa(), n = yn(), i = ku(), s = Du(), c = qu(), a = Y(), f = pt(), _ = On(), p = te(), h = Rn();
  function b(O) {
    if ($(O) && (E(O), m(O))) {
      d(O);
      return;
    }
    w(O, () => (0, e.topBoolOrEmptySchema)(O));
  }
  Ke.validateFunctionCode = b;
  function w({ gen: O, validateName: j, schema: k, schemaEnv: M, opts: z }, G) {
    z.code.es5 ? O.func(j, (0, a._)`${f.default.data}, ${f.default.valCxt}`, M.$async, () => {
      O.code((0, a._)`"use strict"; ${o(k, z)}`), v(O, z), O.code(G);
    }) : O.func(j, (0, a._)`${f.default.data}, ${S(z)}`, M.$async, () => O.code(o(k, z)).code(G));
  }
  function S(O) {
    return (0, a._)`{${f.default.instancePath}="", ${f.default.parentData}, ${f.default.parentDataProperty}, ${f.default.rootData}=${f.default.data}${O.dynamicRef ? (0, a._)`, ${f.default.dynamicAnchors}={}` : a.nil}}={}`;
  }
  function v(O, j) {
    O.if(f.default.valCxt, () => {
      O.var(f.default.instancePath, (0, a._)`${f.default.valCxt}.${f.default.instancePath}`), O.var(f.default.parentData, (0, a._)`${f.default.valCxt}.${f.default.parentData}`), O.var(f.default.parentDataProperty, (0, a._)`${f.default.valCxt}.${f.default.parentDataProperty}`), O.var(f.default.rootData, (0, a._)`${f.default.valCxt}.${f.default.rootData}`), j.dynamicRef && O.var(f.default.dynamicAnchors, (0, a._)`${f.default.valCxt}.${f.default.dynamicAnchors}`);
    }, () => {
      O.var(f.default.instancePath, (0, a._)`""`), O.var(f.default.parentData, (0, a._)`undefined`), O.var(f.default.parentDataProperty, (0, a._)`undefined`), O.var(f.default.rootData, f.default.data), j.dynamicRef && O.var(f.default.dynamicAnchors, (0, a._)`{}`);
    });
  }
  function d(O) {
    const { schema: j, opts: k, gen: M } = O;
    w(O, () => {
      k.$comment && j.$comment && L(O), V(O), M.let(f.default.vErrors, null), M.let(f.default.errors, 0), k.unevaluated && u(O), P(O), J(O);
    });
  }
  function u(O) {
    const { gen: j, validateName: k } = O;
    O.evaluated = j.const("evaluated", (0, a._)`${k}.evaluated`), j.if((0, a._)`${O.evaluated}.dynamicProps`, () => j.assign((0, a._)`${O.evaluated}.props`, (0, a._)`undefined`)), j.if((0, a._)`${O.evaluated}.dynamicItems`, () => j.assign((0, a._)`${O.evaluated}.items`, (0, a._)`undefined`));
  }
  function o(O, j) {
    const k = typeof O == "object" && O[j.schemaId];
    return k && (j.code.source || j.code.process) ? (0, a._)`/*# sourceURL=${k} */` : a.nil;
  }
  function l(O, j) {
    if ($(O) && (E(O), m(O))) {
      g(O, j);
      return;
    }
    (0, e.boolOrEmptySchema)(O, j);
  }
  function m({ schema: O, self: j }) {
    if (typeof O == "boolean")
      return !O;
    for (const k in O)
      if (j.RULES.all[k])
        return !0;
    return !1;
  }
  function $(O) {
    return typeof O.schema != "boolean";
  }
  function g(O, j) {
    const { schema: k, gen: M, opts: z } = O;
    z.$comment && k.$comment && L(O), F(O), K(O);
    const G = M.const("_errs", f.default.errors);
    P(O, G), M.var(j, (0, a._)`${G} === ${f.default.errors}`);
  }
  function E(O) {
    (0, p.checkUnknownRules)(O), D(O);
  }
  function P(O, j) {
    if (O.opts.jtd)
      return we(O, [], !1, j);
    const k = (0, t.getSchemaTypes)(O.schema), M = (0, t.coerceAndCheckDataType)(O, k);
    we(O, k, !M, j);
  }
  function D(O) {
    const { schema: j, errSchemaPath: k, opts: M, self: z } = O;
    j.$ref && M.ignoreKeywordsWithRef && (0, p.schemaHasRulesButRef)(j, z.RULES) && z.logger.warn(`$ref: keywords ignored in schema at path "${k}"`);
  }
  function V(O) {
    const { schema: j, opts: k } = O;
    j.default !== void 0 && k.useDefaults && k.strictSchema && (0, p.checkStrictMode)(O, "default is ignored in the schema root");
  }
  function F(O) {
    const j = O.schema[O.opts.schemaId];
    j && (O.baseId = (0, _.resolveUrl)(O.opts.uriResolver, O.baseId, j));
  }
  function K(O) {
    if (O.schema.$async && !O.schemaEnv.$async)
      throw new Error("async schema in sync schema");
  }
  function L({ gen: O, schemaEnv: j, schema: k, errSchemaPath: M, opts: z }) {
    const G = k.$comment;
    if (z.$comment === !0)
      O.code((0, a._)`${f.default.self}.logger.log(${G})`);
    else if (typeof z.$comment == "function") {
      const fe = (0, a.str)`${M}/$comment`, qe = O.scopeValue("root", { ref: j.root });
      O.code((0, a._)`${f.default.self}.opts.$comment(${G}, ${fe}, ${qe}.schema)`);
    }
  }
  function J(O) {
    const { gen: j, schemaEnv: k, validateName: M, ValidationError: z, opts: G } = O;
    k.$async ? j.if((0, a._)`${f.default.errors} === 0`, () => j.return(f.default.data), () => j.throw((0, a._)`new ${z}(${f.default.vErrors})`)) : (j.assign((0, a._)`${M}.errors`, f.default.vErrors), G.unevaluated && B(O), j.return((0, a._)`${f.default.errors} === 0`));
  }
  function B({ gen: O, evaluated: j, props: k, items: M }) {
    k instanceof a.Name && O.assign((0, a._)`${j}.props`, k), M instanceof a.Name && O.assign((0, a._)`${j}.items`, M);
  }
  function we(O, j, k, M) {
    const { gen: z, schema: G, data: fe, allErrors: qe, opts: Ee, self: Se } = O, { RULES: de } = Se;
    if (G.$ref && (Ee.ignoreKeywordsWithRef || !(0, p.schemaHasRulesButRef)(G, de))) {
      z.block(() => U(O, "$ref", de.all.$ref.definition));
      return;
    }
    Ee.jtd || x(O, j), z.block(() => {
      for (const ke of de.rules)
        jt(ke);
      jt(de.post);
    });
    function jt(ke) {
      (0, r.shouldUseGroup)(G, ke) && (ke.type ? (z.if((0, n.checkDataType)(ke.type, fe, Ee.strictNumbers)), ce(O, ke), j.length === 1 && j[0] === ke.type && k && (z.else(), (0, n.reportTypeError)(O)), z.endIf()) : ce(O, ke), qe || z.if((0, a._)`${f.default.errors} === ${M || 0}`));
    }
  }
  function ce(O, j) {
    const { gen: k, schema: M, opts: { useDefaults: z } } = O;
    z && (0, i.assignDefaults)(O, j.type), k.block(() => {
      for (const G of j.rules)
        (0, r.shouldUseRule)(M, G) && U(O, G.keyword, G.definition, j.type);
    });
  }
  function x(O, j) {
    O.schemaEnv.meta || !O.opts.strictTypes || (me(O, j), O.opts.allowUnionTypes || A(O, j), N(O, O.dataTypes));
  }
  function me(O, j) {
    if (j.length) {
      if (!O.dataTypes.length) {
        O.dataTypes = j;
        return;
      }
      j.forEach((k) => {
        T(O.dataTypes, k) || R(O, `type "${k}" not allowed by context "${O.dataTypes.join(",")}"`);
      }), y(O, j);
    }
  }
  function A(O, j) {
    j.length > 1 && !(j.length === 2 && j.includes("null")) && R(O, "use allowUnionTypes to allow union type keyword");
  }
  function N(O, j) {
    const k = O.self.RULES.all;
    for (const M in k) {
      const z = k[M];
      if (typeof z == "object" && (0, r.shouldUseRule)(O.schema, z)) {
        const { type: G } = z.definition;
        G.length && !G.some((fe) => q(j, fe)) && R(O, `missing type "${G.join(",")}" for keyword "${M}"`);
      }
    }
  }
  function q(O, j) {
    return O.includes(j) || j === "number" && O.includes("integer");
  }
  function T(O, j) {
    return O.includes(j) || j === "integer" && O.includes("number");
  }
  function y(O, j) {
    const k = [];
    for (const M of O.dataTypes)
      T(j, M) ? k.push(M) : j.includes("integer") && M === "number" && k.push("integer");
    O.dataTypes = k;
  }
  function R(O, j) {
    const k = O.schemaEnv.baseId + O.errSchemaPath;
    j += ` at "${k}" (strictTypes)`, (0, p.checkStrictMode)(O, j, O.opts.strictTypes);
  }
  class C {
    constructor(j, k, M) {
      if ((0, s.validateKeywordUsage)(j, k, M), this.gen = j.gen, this.allErrors = j.allErrors, this.keyword = M, this.data = j.data, this.schema = j.schema[M], this.$data = k.$data && j.opts.$data && this.schema && this.schema.$data, this.schemaValue = (0, p.schemaRefOrVal)(j, this.schema, M, this.$data), this.schemaType = k.schemaType, this.parentSchema = j.schema, this.params = {}, this.it = j, this.def = k, this.$data)
        this.schemaCode = j.gen.const("vSchema", ee(this.$data, j));
      else if (this.schemaCode = this.schemaValue, !(0, s.validSchemaType)(this.schema, k.schemaType, k.allowUndefined))
        throw new Error(`${M} value must be ${JSON.stringify(k.schemaType)}`);
      ("code" in k ? k.trackErrors : k.errors !== !1) && (this.errsCount = j.gen.const("_errs", f.default.errors));
    }
    result(j, k, M) {
      this.failResult((0, a.not)(j), k, M);
    }
    failResult(j, k, M) {
      this.gen.if(j), M ? M() : this.error(), k ? (this.gen.else(), k(), this.allErrors && this.gen.endIf()) : this.allErrors ? this.gen.endIf() : this.gen.else();
    }
    pass(j, k) {
      this.failResult((0, a.not)(j), void 0, k);
    }
    fail(j) {
      if (j === void 0) {
        this.error(), this.allErrors || this.gen.if(!1);
        return;
      }
      this.gen.if(j), this.error(), this.allErrors ? this.gen.endIf() : this.gen.else();
    }
    fail$data(j) {
      if (!this.$data)
        return this.fail(j);
      const { schemaCode: k } = this;
      this.fail((0, a._)`${k} !== undefined && (${(0, a.or)(this.invalid$data(), j)})`);
    }
    error(j, k, M) {
      if (k) {
        this.setParams(k), this._error(j, M), this.setParams({});
        return;
      }
      this._error(j, M);
    }
    _error(j, k) {
      (j ? h.reportExtraError : h.reportError)(this, this.def.error, k);
    }
    $dataError() {
      (0, h.reportError)(this, this.def.$dataError || h.keyword$DataError);
    }
    reset() {
      if (this.errsCount === void 0)
        throw new Error('add "trackErrors" to keyword definition');
      (0, h.resetErrorsCount)(this.gen, this.errsCount);
    }
    ok(j) {
      this.allErrors || this.gen.if(j);
    }
    setParams(j, k) {
      k ? Object.assign(this.params, j) : this.params = j;
    }
    block$data(j, k, M = a.nil) {
      this.gen.block(() => {
        this.check$data(j, M), k();
      });
    }
    check$data(j = a.nil, k = a.nil) {
      if (!this.$data)
        return;
      const { gen: M, schemaCode: z, schemaType: G, def: fe } = this;
      M.if((0, a.or)((0, a._)`${z} === undefined`, k)), j !== a.nil && M.assign(j, !0), (G.length || fe.validateSchema) && (M.elseIf(this.invalid$data()), this.$dataError(), j !== a.nil && M.assign(j, !1)), M.else();
    }
    invalid$data() {
      const { gen: j, schemaCode: k, schemaType: M, def: z, it: G } = this;
      return (0, a.or)(fe(), qe());
      function fe() {
        if (M.length) {
          if (!(k instanceof a.Name))
            throw new Error("ajv implementation error");
          const Ee = Array.isArray(M) ? M : [M];
          return (0, a._)`${(0, n.checkDataTypes)(Ee, k, G.opts.strictNumbers, n.DataType.Wrong)}`;
        }
        return a.nil;
      }
      function qe() {
        if (z.validateSchema) {
          const Ee = j.scopeValue("validate$data", { ref: z.validateSchema });
          return (0, a._)`!${Ee}(${k})`;
        }
        return a.nil;
      }
    }
    subschema(j, k) {
      const M = (0, c.getSubschema)(this.it, j);
      (0, c.extendSubschemaData)(M, this.it, j), (0, c.extendSubschemaMode)(M, j);
      const z = { ...this.it, ...M, items: void 0, props: void 0 };
      return l(z, k), z;
    }
    mergeEvaluated(j, k) {
      const { it: M, gen: z } = this;
      M.opts.unevaluated && (M.props !== !0 && j.props !== void 0 && (M.props = p.mergeEvaluated.props(z, j.props, M.props, k)), M.items !== !0 && j.items !== void 0 && (M.items = p.mergeEvaluated.items(z, j.items, M.items, k)));
    }
    mergeValidEvaluated(j, k) {
      const { it: M, gen: z } = this;
      if (M.opts.unevaluated && (M.props !== !0 || M.items !== !0))
        return z.if(k, () => this.mergeEvaluated(j, a.Name)), !0;
    }
  }
  Ke.KeywordCxt = C;
  function U(O, j, k, M) {
    const z = new C(O, k, j);
    "code" in k ? k.code(z, M) : z.$data && k.validate ? (0, s.funcKeywordCode)(z, k) : "macro" in k ? (0, s.macroKeywordCode)(z, k) : (k.compile || k.validate) && (0, s.funcKeywordCode)(z, k);
  }
  const H = /^\/(?:[^~]|~0|~1)*$/, re = /^([0-9]+)(#|\/(?:[^~]|~0|~1)*)?$/;
  function ee(O, { dataLevel: j, dataNames: k, dataPathArr: M }) {
    let z, G;
    if (O === "")
      return f.default.rootData;
    if (O[0] === "/") {
      if (!H.test(O))
        throw new Error(`Invalid JSON-pointer: ${O}`);
      z = O, G = f.default.rootData;
    } else {
      const Se = re.exec(O);
      if (!Se)
        throw new Error(`Invalid JSON-pointer: ${O}`);
      const de = +Se[1];
      if (z = Se[2], z === "#") {
        if (de >= j)
          throw new Error(Ee("property/index", de));
        return M[j - de];
      }
      if (de > j)
        throw new Error(Ee("data", de));
      if (G = k[j - de], !z)
        return G;
    }
    let fe = G;
    const qe = z.split("/");
    for (const Se of qe)
      Se && (G = (0, a._)`${G}${(0, a.getProperty)((0, p.unescapeJsonPointer)(Se))}`, fe = (0, a._)`${fe} && ${G}`);
    return fe;
    function Ee(Se, de) {
      return `Cannot access ${Se} ${de} levels up, current level is ${j}`;
    }
  }
  return Ke.getData = ee, Ke;
}
var vr = {}, Si;
function As() {
  if (Si) return vr;
  Si = 1, Object.defineProperty(vr, "__esModule", { value: !0 });
  class e extends Error {
    constructor(r) {
      super("validation failed"), this.errors = r, this.ajv = this.validation = !0;
    }
  }
  return vr.default = e, vr;
}
var $r = {}, Ri;
function Pn() {
  if (Ri) return $r;
  Ri = 1, Object.defineProperty($r, "__esModule", { value: !0 });
  const e = On();
  class t extends Error {
    constructor(n, i, s, c) {
      super(c || `can't resolve reference ${s} from id ${i}`), this.missingRef = (0, e.resolveUrl)(n, i, s), this.missingSchema = (0, e.normalizeId)((0, e.getFullPath)(n, this.missingRef));
    }
  }
  return $r.default = t, $r;
}
var je = {}, Oi;
function Ms() {
  if (Oi) return je;
  Oi = 1, Object.defineProperty(je, "__esModule", { value: !0 }), je.resolveSchema = je.getCompilingSchema = je.resolveRef = je.compileSchema = je.SchemaEnv = void 0;
  const e = Y(), t = As(), r = pt(), n = On(), i = te(), s = Nn();
  class c {
    constructor(u) {
      var o;
      this.refs = {}, this.dynamicAnchors = {};
      let l;
      typeof u.schema == "object" && (l = u.schema), this.schema = u.schema, this.schemaId = u.schemaId, this.root = u.root || this, this.baseId = (o = u.baseId) !== null && o !== void 0 ? o : (0, n.normalizeId)(l == null ? void 0 : l[u.schemaId || "$id"]), this.schemaPath = u.schemaPath, this.localRefs = u.localRefs, this.meta = u.meta, this.$async = l == null ? void 0 : l.$async, this.refs = {};
    }
  }
  je.SchemaEnv = c;
  function a(d) {
    const u = p.call(this, d);
    if (u)
      return u;
    const o = (0, n.getFullPath)(this.opts.uriResolver, d.root.baseId), { es5: l, lines: m } = this.opts.code, { ownProperties: $ } = this.opts, g = new e.CodeGen(this.scope, { es5: l, lines: m, ownProperties: $ });
    let E;
    d.$async && (E = g.scopeValue("Error", {
      ref: t.default,
      code: (0, e._)`require("ajv/dist/runtime/validation_error").default`
    }));
    const P = g.scopeName("validate");
    d.validateName = P;
    const D = {
      gen: g,
      allErrors: this.opts.allErrors,
      data: r.default.data,
      parentData: r.default.parentData,
      parentDataProperty: r.default.parentDataProperty,
      dataNames: [r.default.data],
      dataPathArr: [e.nil],
      // TODO can its length be used as dataLevel if nil is removed?
      dataLevel: 0,
      dataTypes: [],
      definedProperties: /* @__PURE__ */ new Set(),
      topSchemaRef: g.scopeValue("schema", this.opts.code.source === !0 ? { ref: d.schema, code: (0, e.stringify)(d.schema) } : { ref: d.schema }),
      validateName: P,
      ValidationError: E,
      schema: d.schema,
      schemaEnv: d,
      rootId: o,
      baseId: d.baseId || o,
      schemaPath: e.nil,
      errSchemaPath: d.schemaPath || (this.opts.jtd ? "" : "#"),
      errorPath: (0, e._)`""`,
      opts: this.opts,
      self: this
    };
    let V;
    try {
      this._compilations.add(d), (0, s.validateFunctionCode)(D), g.optimize(this.opts.code.optimize);
      const F = g.toString();
      V = `${g.scopeRefs(r.default.scope)}return ${F}`, this.opts.code.process && (V = this.opts.code.process(V, d));
      const L = new Function(`${r.default.self}`, `${r.default.scope}`, V)(this, this.scope.get());
      if (this.scope.value(P, { ref: L }), L.errors = null, L.schema = d.schema, L.schemaEnv = d, d.$async && (L.$async = !0), this.opts.code.source === !0 && (L.source = { validateName: P, validateCode: F, scopeValues: g._values }), this.opts.unevaluated) {
        const { props: J, items: B } = D;
        L.evaluated = {
          props: J instanceof e.Name ? void 0 : J,
          items: B instanceof e.Name ? void 0 : B,
          dynamicProps: J instanceof e.Name,
          dynamicItems: B instanceof e.Name
        }, L.source && (L.source.evaluated = (0, e.stringify)(L.evaluated));
      }
      return d.validate = L, d;
    } catch (F) {
      throw delete d.validate, delete d.validateName, V && this.logger.error("Error compiling schema, function code:", V), F;
    } finally {
      this._compilations.delete(d);
    }
  }
  je.compileSchema = a;
  function f(d, u, o) {
    var l;
    o = (0, n.resolveUrl)(this.opts.uriResolver, u, o);
    const m = d.refs[o];
    if (m)
      return m;
    let $ = b.call(this, d, o);
    if ($ === void 0) {
      const g = (l = d.localRefs) === null || l === void 0 ? void 0 : l[o], { schemaId: E } = this.opts;
      g && ($ = new c({ schema: g, schemaId: E, root: d, baseId: u }));
    }
    if ($ !== void 0)
      return d.refs[o] = _.call(this, $);
  }
  je.resolveRef = f;
  function _(d) {
    return (0, n.inlineRef)(d.schema, this.opts.inlineRefs) ? d.schema : d.validate ? d : a.call(this, d);
  }
  function p(d) {
    for (const u of this._compilations)
      if (h(u, d))
        return u;
  }
  je.getCompilingSchema = p;
  function h(d, u) {
    return d.schema === u.schema && d.root === u.root && d.baseId === u.baseId;
  }
  function b(d, u) {
    let o;
    for (; typeof (o = this.refs[u]) == "string"; )
      u = o;
    return o || this.schemas[u] || w.call(this, d, u);
  }
  function w(d, u) {
    const o = this.opts.uriResolver.parse(u), l = (0, n._getFullPath)(this.opts.uriResolver, o);
    let m = (0, n.getFullPath)(this.opts.uriResolver, d.baseId, void 0);
    if (Object.keys(d.schema).length > 0 && l === m)
      return v.call(this, o, d);
    const $ = (0, n.normalizeId)(l), g = this.refs[$] || this.schemas[$];
    if (typeof g == "string") {
      const E = w.call(this, d, g);
      return typeof (E == null ? void 0 : E.schema) != "object" ? void 0 : v.call(this, o, E);
    }
    if (typeof (g == null ? void 0 : g.schema) == "object") {
      if (g.validate || a.call(this, g), $ === (0, n.normalizeId)(u)) {
        const { schema: E } = g, { schemaId: P } = this.opts, D = E[P];
        return D && (m = (0, n.resolveUrl)(this.opts.uriResolver, m, D)), new c({ schema: E, schemaId: P, root: d, baseId: m });
      }
      return v.call(this, o, g);
    }
  }
  je.resolveSchema = w;
  const S = /* @__PURE__ */ new Set([
    "properties",
    "patternProperties",
    "enum",
    "dependencies",
    "definitions"
  ]);
  function v(d, { baseId: u, schema: o, root: l }) {
    var m;
    if (((m = d.fragment) === null || m === void 0 ? void 0 : m[0]) !== "/")
      return;
    for (const E of d.fragment.slice(1).split("/")) {
      if (typeof o == "boolean")
        return;
      const P = o[(0, i.unescapeFragment)(E)];
      if (P === void 0)
        return;
      o = P;
      const D = typeof o == "object" && o[this.opts.schemaId];
      !S.has(E) && D && (u = (0, n.resolveUrl)(this.opts.uriResolver, u, D));
    }
    let $;
    if (typeof o != "boolean" && o.$ref && !(0, i.schemaHasRulesButRef)(o, this.RULES)) {
      const E = (0, n.resolveUrl)(this.opts.uriResolver, u, o.$ref);
      $ = w.call(this, l, E);
    }
    const { schemaId: g } = this.opts;
    if ($ = $ || new c({ schema: o, schemaId: g, root: l, baseId: u }), $.schema !== $.root.schema)
      return $;
  }
  return je;
}
const Mu = "https://raw.githubusercontent.com/ajv-validator/ajv/master/lib/refs/data.json#", Vu = "Meta-schema for $data reference (JSON AnySchema extension proposal)", Fu = "object", Uu = ["$data"], Lu = { $data: { type: "string", anyOf: [{ format: "relative-json-pointer" }, { format: "json-pointer" }] } }, zu = !1, Ku = {
  $id: Mu,
  description: Vu,
  type: Fu,
  required: Uu,
  properties: Lu,
  additionalProperties: zu
};
var br = {}, Gt = { exports: {} }, Qn, Ni;
function Hu() {
  return Ni || (Ni = 1, Qn = {
    HEX: {
      0: 0,
      1: 1,
      2: 2,
      3: 3,
      4: 4,
      5: 5,
      6: 6,
      7: 7,
      8: 8,
      9: 9,
      a: 10,
      A: 10,
      b: 11,
      B: 11,
      c: 12,
      C: 12,
      d: 13,
      D: 13,
      e: 14,
      E: 14,
      f: 15,
      F: 15
    }
  }), Qn;
}
var Bn, Pi;
function xu() {
  if (Pi) return Bn;
  Pi = 1;
  const { HEX: e } = Hu(), t = /^(?:(?:25[0-5]|2[0-4]\d|1\d{2}|[1-9]\d|\d)\.){3}(?:25[0-5]|2[0-4]\d|1\d{2}|[1-9]\d|\d)$/u;
  function r(v) {
    if (a(v, ".") < 3)
      return { host: v, isIPV4: !1 };
    const d = v.match(t) || [], [u] = d;
    return u ? { host: c(u, "."), isIPV4: !0 } : { host: v, isIPV4: !1 };
  }
  function n(v, d = !1) {
    let u = "", o = !0;
    for (const l of v) {
      if (e[l] === void 0) return;
      l !== "0" && o === !0 && (o = !1), o || (u += l);
    }
    return d && u.length === 0 && (u = "0"), u;
  }
  function i(v) {
    let d = 0;
    const u = { error: !1, address: "", zone: "" }, o = [], l = [];
    let m = !1, $ = !1, g = !1;
    function E() {
      if (l.length) {
        if (m === !1) {
          const P = n(l);
          if (P !== void 0)
            o.push(P);
          else
            return u.error = !0, !1;
        }
        l.length = 0;
      }
      return !0;
    }
    for (let P = 0; P < v.length; P++) {
      const D = v[P];
      if (!(D === "[" || D === "]"))
        if (D === ":") {
          if ($ === !0 && (g = !0), !E())
            break;
          if (d++, o.push(":"), d > 7) {
            u.error = !0;
            break;
          }
          P - 1 >= 0 && v[P - 1] === ":" && ($ = !0);
          continue;
        } else if (D === "%") {
          if (!E())
            break;
          m = !0;
        } else {
          l.push(D);
          continue;
        }
    }
    return l.length && (m ? u.zone = l.join("") : g ? o.push(l.join("")) : o.push(n(l))), u.address = o.join(""), u;
  }
  function s(v) {
    if (a(v, ":") < 2)
      return { host: v, isIPV6: !1 };
    const d = i(v);
    if (d.error)
      return { host: v, isIPV6: !1 };
    {
      let u = d.address, o = d.address;
      return d.zone && (u += "%" + d.zone, o += "%25" + d.zone), { host: u, escapedHost: o, isIPV6: !0 };
    }
  }
  function c(v, d) {
    let u = "", o = !0;
    const l = v.length;
    for (let m = 0; m < l; m++) {
      const $ = v[m];
      $ === "0" && o ? (m + 1 <= l && v[m + 1] === d || m + 1 === l) && (u += $, o = !1) : ($ === d ? o = !0 : o = !1, u += $);
    }
    return u;
  }
  function a(v, d) {
    let u = 0;
    for (let o = 0; o < v.length; o++)
      v[o] === d && u++;
    return u;
  }
  const f = /^\.\.?\//u, _ = /^\/\.(?:\/|$)/u, p = /^\/\.\.(?:\/|$)/u, h = /^\/?(?:.|\n)*?(?=\/|$)/u;
  function b(v) {
    const d = [];
    for (; v.length; )
      if (v.match(f))
        v = v.replace(f, "");
      else if (v.match(_))
        v = v.replace(_, "/");
      else if (v.match(p))
        v = v.replace(p, "/"), d.pop();
      else if (v === "." || v === "..")
        v = "";
      else {
        const u = v.match(h);
        if (u) {
          const o = u[0];
          v = v.slice(o.length), d.push(o);
        } else
          throw new Error("Unexpected dot segment condition");
      }
    return d.join("");
  }
  function w(v, d) {
    const u = d !== !0 ? escape : unescape;
    return v.scheme !== void 0 && (v.scheme = u(v.scheme)), v.userinfo !== void 0 && (v.userinfo = u(v.userinfo)), v.host !== void 0 && (v.host = u(v.host)), v.path !== void 0 && (v.path = u(v.path)), v.query !== void 0 && (v.query = u(v.query)), v.fragment !== void 0 && (v.fragment = u(v.fragment)), v;
  }
  function S(v) {
    const d = [];
    if (v.userinfo !== void 0 && (d.push(v.userinfo), d.push("@")), v.host !== void 0) {
      let u = unescape(v.host);
      const o = r(u);
      if (o.isIPV4)
        u = o.host;
      else {
        const l = s(o.host);
        l.isIPV6 === !0 ? u = `[${l.escapedHost}]` : u = v.host;
      }
      d.push(u);
    }
    return (typeof v.port == "number" || typeof v.port == "string") && (d.push(":"), d.push(String(v.port))), d.length ? d.join("") : void 0;
  }
  return Bn = {
    recomposeAuthority: S,
    normalizeComponentEncoding: w,
    removeDotSegments: b,
    normalizeIPv4: r,
    normalizeIPv6: s,
    stringArrayToHexStripped: n
  }, Bn;
}
var Yn, ji;
function Ju() {
  if (ji) return Yn;
  ji = 1;
  const e = /^[\da-f]{8}-[\da-f]{4}-[\da-f]{4}-[\da-f]{4}-[\da-f]{12}$/iu, t = /([\da-z][\d\-a-z]{0,31}):((?:[\w!$'()*+,\-.:;=@]|%[\da-f]{2})+)/iu;
  function r(o) {
    return typeof o.secure == "boolean" ? o.secure : String(o.scheme).toLowerCase() === "wss";
  }
  function n(o) {
    return o.host || (o.error = o.error || "HTTP URIs must have a host."), o;
  }
  function i(o) {
    const l = String(o.scheme).toLowerCase() === "https";
    return (o.port === (l ? 443 : 80) || o.port === "") && (o.port = void 0), o.path || (o.path = "/"), o;
  }
  function s(o) {
    return o.secure = r(o), o.resourceName = (o.path || "/") + (o.query ? "?" + o.query : ""), o.path = void 0, o.query = void 0, o;
  }
  function c(o) {
    if ((o.port === (r(o) ? 443 : 80) || o.port === "") && (o.port = void 0), typeof o.secure == "boolean" && (o.scheme = o.secure ? "wss" : "ws", o.secure = void 0), o.resourceName) {
      const [l, m] = o.resourceName.split("?");
      o.path = l && l !== "/" ? l : void 0, o.query = m, o.resourceName = void 0;
    }
    return o.fragment = void 0, o;
  }
  function a(o, l) {
    if (!o.path)
      return o.error = "URN can not be parsed", o;
    const m = o.path.match(t);
    if (m) {
      const $ = l.scheme || o.scheme || "urn";
      o.nid = m[1].toLowerCase(), o.nss = m[2];
      const g = `${$}:${l.nid || o.nid}`, E = u[g];
      o.path = void 0, E && (o = E.parse(o, l));
    } else
      o.error = o.error || "URN can not be parsed.";
    return o;
  }
  function f(o, l) {
    const m = l.scheme || o.scheme || "urn", $ = o.nid.toLowerCase(), g = `${m}:${l.nid || $}`, E = u[g];
    E && (o = E.serialize(o, l));
    const P = o, D = o.nss;
    return P.path = `${$ || l.nid}:${D}`, l.skipEscape = !0, P;
  }
  function _(o, l) {
    const m = o;
    return m.uuid = m.nss, m.nss = void 0, !l.tolerant && (!m.uuid || !e.test(m.uuid)) && (m.error = m.error || "UUID is not valid."), m;
  }
  function p(o) {
    const l = o;
    return l.nss = (o.uuid || "").toLowerCase(), l;
  }
  const h = {
    scheme: "http",
    domainHost: !0,
    parse: n,
    serialize: i
  }, b = {
    scheme: "https",
    domainHost: h.domainHost,
    parse: n,
    serialize: i
  }, w = {
    scheme: "ws",
    domainHost: !0,
    parse: s,
    serialize: c
  }, S = {
    scheme: "wss",
    domainHost: w.domainHost,
    parse: w.parse,
    serialize: w.serialize
  }, u = {
    http: h,
    https: b,
    ws: w,
    wss: S,
    urn: {
      scheme: "urn",
      parse: a,
      serialize: f,
      skipNormalize: !0
    },
    "urn:uuid": {
      scheme: "urn:uuid",
      parse: _,
      serialize: p,
      skipNormalize: !0
    }
  };
  return Yn = u, Yn;
}
var Ti;
function Wu() {
  if (Ti) return Gt.exports;
  Ti = 1;
  const { normalizeIPv6: e, normalizeIPv4: t, removeDotSegments: r, recomposeAuthority: n, normalizeComponentEncoding: i } = xu(), s = Ju();
  function c(d, u) {
    return typeof d == "string" ? d = p(S(d, u), u) : typeof d == "object" && (d = S(p(d, u), u)), d;
  }
  function a(d, u, o) {
    const l = Object.assign({ scheme: "null" }, o), m = f(S(d, l), S(u, l), l, !0);
    return p(m, { ...l, skipEscape: !0 });
  }
  function f(d, u, o, l) {
    const m = {};
    return l || (d = S(p(d, o), o), u = S(p(u, o), o)), o = o || {}, !o.tolerant && u.scheme ? (m.scheme = u.scheme, m.userinfo = u.userinfo, m.host = u.host, m.port = u.port, m.path = r(u.path || ""), m.query = u.query) : (u.userinfo !== void 0 || u.host !== void 0 || u.port !== void 0 ? (m.userinfo = u.userinfo, m.host = u.host, m.port = u.port, m.path = r(u.path || ""), m.query = u.query) : (u.path ? (u.path.charAt(0) === "/" ? m.path = r(u.path) : ((d.userinfo !== void 0 || d.host !== void 0 || d.port !== void 0) && !d.path ? m.path = "/" + u.path : d.path ? m.path = d.path.slice(0, d.path.lastIndexOf("/") + 1) + u.path : m.path = u.path, m.path = r(m.path)), m.query = u.query) : (m.path = d.path, u.query !== void 0 ? m.query = u.query : m.query = d.query), m.userinfo = d.userinfo, m.host = d.host, m.port = d.port), m.scheme = d.scheme), m.fragment = u.fragment, m;
  }
  function _(d, u, o) {
    return typeof d == "string" ? (d = unescape(d), d = p(i(S(d, o), !0), { ...o, skipEscape: !0 })) : typeof d == "object" && (d = p(i(d, !0), { ...o, skipEscape: !0 })), typeof u == "string" ? (u = unescape(u), u = p(i(S(u, o), !0), { ...o, skipEscape: !0 })) : typeof u == "object" && (u = p(i(u, !0), { ...o, skipEscape: !0 })), d.toLowerCase() === u.toLowerCase();
  }
  function p(d, u) {
    const o = {
      host: d.host,
      scheme: d.scheme,
      userinfo: d.userinfo,
      port: d.port,
      path: d.path,
      query: d.query,
      nid: d.nid,
      nss: d.nss,
      uuid: d.uuid,
      fragment: d.fragment,
      reference: d.reference,
      resourceName: d.resourceName,
      secure: d.secure,
      error: ""
    }, l = Object.assign({}, u), m = [], $ = s[(l.scheme || o.scheme || "").toLowerCase()];
    $ && $.serialize && $.serialize(o, l), o.path !== void 0 && (l.skipEscape ? o.path = unescape(o.path) : (o.path = escape(o.path), o.scheme !== void 0 && (o.path = o.path.split("%3A").join(":")))), l.reference !== "suffix" && o.scheme && m.push(o.scheme, ":");
    const g = n(o);
    if (g !== void 0 && (l.reference !== "suffix" && m.push("//"), m.push(g), o.path && o.path.charAt(0) !== "/" && m.push("/")), o.path !== void 0) {
      let E = o.path;
      !l.absolutePath && (!$ || !$.absolutePath) && (E = r(E)), g === void 0 && (E = E.replace(/^\/\//u, "/%2F")), m.push(E);
    }
    return o.query !== void 0 && m.push("?", o.query), o.fragment !== void 0 && m.push("#", o.fragment), m.join("");
  }
  const h = Array.from({ length: 127 }, (d, u) => /[^!"$&'()*+,\-.;=_`a-z{}~]/u.test(String.fromCharCode(u)));
  function b(d) {
    let u = 0;
    for (let o = 0, l = d.length; o < l; ++o)
      if (u = d.charCodeAt(o), u > 126 || h[u])
        return !0;
    return !1;
  }
  const w = /^(?:([^#/:?]+):)?(?:\/\/((?:([^#/?@]*)@)?(\[[^#/?\]]+\]|[^#/:?]*)(?::(\d*))?))?([^#?]*)(?:\?([^#]*))?(?:#((?:.|[\n\r])*))?/u;
  function S(d, u) {
    const o = Object.assign({}, u), l = {
      scheme: void 0,
      userinfo: void 0,
      host: "",
      port: void 0,
      path: "",
      query: void 0,
      fragment: void 0
    }, m = d.indexOf("%") !== -1;
    let $ = !1;
    o.reference === "suffix" && (d = (o.scheme ? o.scheme + ":" : "") + "//" + d);
    const g = d.match(w);
    if (g) {
      if (l.scheme = g[1], l.userinfo = g[3], l.host = g[4], l.port = parseInt(g[5], 10), l.path = g[6] || "", l.query = g[7], l.fragment = g[8], isNaN(l.port) && (l.port = g[5]), l.host) {
        const P = t(l.host);
        if (P.isIPV4 === !1) {
          const D = e(P.host);
          l.host = D.host.toLowerCase(), $ = D.isIPV6;
        } else
          l.host = P.host, $ = !0;
      }
      l.scheme === void 0 && l.userinfo === void 0 && l.host === void 0 && l.port === void 0 && l.query === void 0 && !l.path ? l.reference = "same-document" : l.scheme === void 0 ? l.reference = "relative" : l.fragment === void 0 ? l.reference = "absolute" : l.reference = "uri", o.reference && o.reference !== "suffix" && o.reference !== l.reference && (l.error = l.error || "URI is not a " + o.reference + " reference.");
      const E = s[(o.scheme || l.scheme || "").toLowerCase()];
      if (!o.unicodeSupport && (!E || !E.unicodeSupport) && l.host && (o.domainHost || E && E.domainHost) && $ === !1 && b(l.host))
        try {
          l.host = URL.domainToASCII(l.host.toLowerCase());
        } catch (P) {
          l.error = l.error || "Host's domain name can not be converted to ASCII: " + P;
        }
      (!E || E && !E.skipNormalize) && (m && l.scheme !== void 0 && (l.scheme = unescape(l.scheme)), m && l.host !== void 0 && (l.host = unescape(l.host)), l.path && (l.path = escape(unescape(l.path))), l.fragment && (l.fragment = encodeURI(decodeURIComponent(l.fragment)))), E && E.parse && E.parse(l, o);
    } else
      l.error = l.error || "URI can not be parsed.";
    return l;
  }
  const v = {
    SCHEMES: s,
    normalize: c,
    resolve: a,
    resolveComponents: f,
    equal: _,
    serialize: p,
    parse: S
  };
  return Gt.exports = v, Gt.exports.default = v, Gt.exports.fastUri = v, Gt.exports;
}
var Ci;
function Gu() {
  if (Ci) return br;
  Ci = 1, Object.defineProperty(br, "__esModule", { value: !0 });
  const e = Wu();
  return e.code = 'require("ajv/dist/runtime/uri").default', br.default = e, br;
}
var Ii;
function Qu() {
  return Ii || (Ii = 1, function(e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.CodeGen = e.Name = e.nil = e.stringify = e.str = e._ = e.KeywordCxt = void 0;
    var t = Nn();
    Object.defineProperty(e, "KeywordCxt", { enumerable: !0, get: function() {
      return t.KeywordCxt;
    } });
    var r = Y();
    Object.defineProperty(e, "_", { enumerable: !0, get: function() {
      return r._;
    } }), Object.defineProperty(e, "str", { enumerable: !0, get: function() {
      return r.str;
    } }), Object.defineProperty(e, "stringify", { enumerable: !0, get: function() {
      return r.stringify;
    } }), Object.defineProperty(e, "nil", { enumerable: !0, get: function() {
      return r.nil;
    } }), Object.defineProperty(e, "Name", { enumerable: !0, get: function() {
      return r.Name;
    } }), Object.defineProperty(e, "CodeGen", { enumerable: !0, get: function() {
      return r.CodeGen;
    } });
    const n = As(), i = Pn(), s = Ea(), c = Ms(), a = Y(), f = On(), _ = yn(), p = te(), h = Ku, b = Gu(), w = (A, N) => new RegExp(A, N);
    w.code = "new RegExp";
    const S = ["removeAdditional", "useDefaults", "coerceTypes"], v = /* @__PURE__ */ new Set([
      "validate",
      "serialize",
      "parse",
      "wrapper",
      "root",
      "schema",
      "keyword",
      "pattern",
      "formats",
      "validate$data",
      "func",
      "obj",
      "Error"
    ]), d = {
      errorDataPath: "",
      format: "`validateFormats: false` can be used instead.",
      nullable: '"nullable" keyword is supported by default.',
      jsonPointers: "Deprecated jsPropertySyntax can be used instead.",
      extendRefs: "Deprecated ignoreKeywordsWithRef can be used instead.",
      missingRefs: "Pass empty schema with $id that should be ignored to ajv.addSchema.",
      processCode: "Use option `code: {process: (code, schemaEnv: object) => string}`",
      sourceCode: "Use option `code: {source: true}`",
      strictDefaults: "It is default now, see option `strict`.",
      strictKeywords: "It is default now, see option `strict`.",
      uniqueItems: '"uniqueItems" keyword is always validated.',
      unknownFormats: "Disable strict mode or pass `true` to `ajv.addFormat` (or `formats` option).",
      cache: "Map is used as cache, schema object as key.",
      serialize: "Map is used as cache, schema object as key.",
      ajvErrors: "It is default now."
    }, u = {
      ignoreKeywordsWithRef: "",
      jsPropertySyntax: "",
      unicode: '"minLength"/"maxLength" account for unicode characters by default.'
    }, o = 200;
    function l(A) {
      var N, q, T, y, R, C, U, H, re, ee, O, j, k, M, z, G, fe, qe, Ee, Se, de, jt, ke, Tn, Cn;
      const xt = A.strict, In = (N = A.code) === null || N === void 0 ? void 0 : N.optimize, Fs = In === !0 || In === void 0 ? 1 : In || 0, Us = (T = (q = A.code) === null || q === void 0 ? void 0 : q.regExp) !== null && T !== void 0 ? T : w, ka = (y = A.uriResolver) !== null && y !== void 0 ? y : b.default;
      return {
        strictSchema: (C = (R = A.strictSchema) !== null && R !== void 0 ? R : xt) !== null && C !== void 0 ? C : !0,
        strictNumbers: (H = (U = A.strictNumbers) !== null && U !== void 0 ? U : xt) !== null && H !== void 0 ? H : !0,
        strictTypes: (ee = (re = A.strictTypes) !== null && re !== void 0 ? re : xt) !== null && ee !== void 0 ? ee : "log",
        strictTuples: (j = (O = A.strictTuples) !== null && O !== void 0 ? O : xt) !== null && j !== void 0 ? j : "log",
        strictRequired: (M = (k = A.strictRequired) !== null && k !== void 0 ? k : xt) !== null && M !== void 0 ? M : !1,
        code: A.code ? { ...A.code, optimize: Fs, regExp: Us } : { optimize: Fs, regExp: Us },
        loopRequired: (z = A.loopRequired) !== null && z !== void 0 ? z : o,
        loopEnum: (G = A.loopEnum) !== null && G !== void 0 ? G : o,
        meta: (fe = A.meta) !== null && fe !== void 0 ? fe : !0,
        messages: (qe = A.messages) !== null && qe !== void 0 ? qe : !0,
        inlineRefs: (Ee = A.inlineRefs) !== null && Ee !== void 0 ? Ee : !0,
        schemaId: (Se = A.schemaId) !== null && Se !== void 0 ? Se : "$id",
        addUsedSchema: (de = A.addUsedSchema) !== null && de !== void 0 ? de : !0,
        validateSchema: (jt = A.validateSchema) !== null && jt !== void 0 ? jt : !0,
        validateFormats: (ke = A.validateFormats) !== null && ke !== void 0 ? ke : !0,
        unicodeRegExp: (Tn = A.unicodeRegExp) !== null && Tn !== void 0 ? Tn : !0,
        int32range: (Cn = A.int32range) !== null && Cn !== void 0 ? Cn : !0,
        uriResolver: ka
      };
    }
    class m {
      constructor(N = {}) {
        this.schemas = {}, this.refs = {}, this.formats = {}, this._compilations = /* @__PURE__ */ new Set(), this._loading = {}, this._cache = /* @__PURE__ */ new Map(), N = this.opts = { ...N, ...l(N) };
        const { es5: q, lines: T } = this.opts.code;
        this.scope = new a.ValueScope({ scope: {}, prefixes: v, es5: q, lines: T }), this.logger = K(N.logger);
        const y = N.validateFormats;
        N.validateFormats = !1, this.RULES = (0, s.getRules)(), $.call(this, d, N, "NOT SUPPORTED"), $.call(this, u, N, "DEPRECATED", "warn"), this._metaOpts = V.call(this), N.formats && P.call(this), this._addVocabularies(), this._addDefaultMetaSchema(), N.keywords && D.call(this, N.keywords), typeof N.meta == "object" && this.addMetaSchema(N.meta), E.call(this), N.validateFormats = y;
      }
      _addVocabularies() {
        this.addKeyword("$async");
      }
      _addDefaultMetaSchema() {
        const { $data: N, meta: q, schemaId: T } = this.opts;
        let y = h;
        T === "id" && (y = { ...h }, y.id = y.$id, delete y.$id), q && N && this.addMetaSchema(y, y[T], !1);
      }
      defaultMeta() {
        const { meta: N, schemaId: q } = this.opts;
        return this.opts.defaultMeta = typeof N == "object" ? N[q] || N : void 0;
      }
      validate(N, q) {
        let T;
        if (typeof N == "string") {
          if (T = this.getSchema(N), !T)
            throw new Error(`no schema with key or ref "${N}"`);
        } else
          T = this.compile(N);
        const y = T(q);
        return "$async" in T || (this.errors = T.errors), y;
      }
      compile(N, q) {
        const T = this._addSchema(N, q);
        return T.validate || this._compileSchemaEnv(T);
      }
      compileAsync(N, q) {
        if (typeof this.opts.loadSchema != "function")
          throw new Error("options.loadSchema should be a function");
        const { loadSchema: T } = this.opts;
        return y.call(this, N, q);
        async function y(ee, O) {
          await R.call(this, ee.$schema);
          const j = this._addSchema(ee, O);
          return j.validate || C.call(this, j);
        }
        async function R(ee) {
          ee && !this.getSchema(ee) && await y.call(this, { $ref: ee }, !0);
        }
        async function C(ee) {
          try {
            return this._compileSchemaEnv(ee);
          } catch (O) {
            if (!(O instanceof i.default))
              throw O;
            return U.call(this, O), await H.call(this, O.missingSchema), C.call(this, ee);
          }
        }
        function U({ missingSchema: ee, missingRef: O }) {
          if (this.refs[ee])
            throw new Error(`AnySchema ${ee} is loaded but ${O} cannot be resolved`);
        }
        async function H(ee) {
          const O = await re.call(this, ee);
          this.refs[ee] || await R.call(this, O.$schema), this.refs[ee] || this.addSchema(O, ee, q);
        }
        async function re(ee) {
          const O = this._loading[ee];
          if (O)
            return O;
          try {
            return await (this._loading[ee] = T(ee));
          } finally {
            delete this._loading[ee];
          }
        }
      }
      // Adds schema to the instance
      addSchema(N, q, T, y = this.opts.validateSchema) {
        if (Array.isArray(N)) {
          for (const C of N)
            this.addSchema(C, void 0, T, y);
          return this;
        }
        let R;
        if (typeof N == "object") {
          const { schemaId: C } = this.opts;
          if (R = N[C], R !== void 0 && typeof R != "string")
            throw new Error(`schema ${C} must be string`);
        }
        return q = (0, f.normalizeId)(q || R), this._checkUnique(q), this.schemas[q] = this._addSchema(N, T, q, y, !0), this;
      }
      // Add schema that will be used to validate other schemas
      // options in META_IGNORE_OPTIONS are alway set to false
      addMetaSchema(N, q, T = this.opts.validateSchema) {
        return this.addSchema(N, q, !0, T), this;
      }
      //  Validate schema against its meta-schema
      validateSchema(N, q) {
        if (typeof N == "boolean")
          return !0;
        let T;
        if (T = N.$schema, T !== void 0 && typeof T != "string")
          throw new Error("$schema must be a string");
        if (T = T || this.opts.defaultMeta || this.defaultMeta(), !T)
          return this.logger.warn("meta-schema not available"), this.errors = null, !0;
        const y = this.validate(T, N);
        if (!y && q) {
          const R = "schema is invalid: " + this.errorsText();
          if (this.opts.validateSchema === "log")
            this.logger.error(R);
          else
            throw new Error(R);
        }
        return y;
      }
      // Get compiled schema by `key` or `ref`.
      // (`key` that was passed to `addSchema` or full schema reference - `schema.$id` or resolved id)
      getSchema(N) {
        let q;
        for (; typeof (q = g.call(this, N)) == "string"; )
          N = q;
        if (q === void 0) {
          const { schemaId: T } = this.opts, y = new c.SchemaEnv({ schema: {}, schemaId: T });
          if (q = c.resolveSchema.call(this, y, N), !q)
            return;
          this.refs[N] = q;
        }
        return q.validate || this._compileSchemaEnv(q);
      }
      // Remove cached schema(s).
      // If no parameter is passed all schemas but meta-schemas are removed.
      // If RegExp is passed all schemas with key/id matching pattern but meta-schemas are removed.
      // Even if schema is referenced by other schemas it still can be removed as other schemas have local references.
      removeSchema(N) {
        if (N instanceof RegExp)
          return this._removeAllSchemas(this.schemas, N), this._removeAllSchemas(this.refs, N), this;
        switch (typeof N) {
          case "undefined":
            return this._removeAllSchemas(this.schemas), this._removeAllSchemas(this.refs), this._cache.clear(), this;
          case "string": {
            const q = g.call(this, N);
            return typeof q == "object" && this._cache.delete(q.schema), delete this.schemas[N], delete this.refs[N], this;
          }
          case "object": {
            const q = N;
            this._cache.delete(q);
            let T = N[this.opts.schemaId];
            return T && (T = (0, f.normalizeId)(T), delete this.schemas[T], delete this.refs[T]), this;
          }
          default:
            throw new Error("ajv.removeSchema: invalid parameter");
        }
      }
      // add "vocabulary" - a collection of keywords
      addVocabulary(N) {
        for (const q of N)
          this.addKeyword(q);
        return this;
      }
      addKeyword(N, q) {
        let T;
        if (typeof N == "string")
          T = N, typeof q == "object" && (this.logger.warn("these parameters are deprecated, see docs for addKeyword"), q.keyword = T);
        else if (typeof N == "object" && q === void 0) {
          if (q = N, T = q.keyword, Array.isArray(T) && !T.length)
            throw new Error("addKeywords: keyword must be string or non-empty array");
        } else
          throw new Error("invalid addKeywords parameters");
        if (J.call(this, T, q), !q)
          return (0, p.eachItem)(T, (R) => B.call(this, R)), this;
        ce.call(this, q);
        const y = {
          ...q,
          type: (0, _.getJSONTypes)(q.type),
          schemaType: (0, _.getJSONTypes)(q.schemaType)
        };
        return (0, p.eachItem)(T, y.type.length === 0 ? (R) => B.call(this, R, y) : (R) => y.type.forEach((C) => B.call(this, R, y, C))), this;
      }
      getKeyword(N) {
        const q = this.RULES.all[N];
        return typeof q == "object" ? q.definition : !!q;
      }
      // Remove keyword
      removeKeyword(N) {
        const { RULES: q } = this;
        delete q.keywords[N], delete q.all[N];
        for (const T of q.rules) {
          const y = T.rules.findIndex((R) => R.keyword === N);
          y >= 0 && T.rules.splice(y, 1);
        }
        return this;
      }
      // Add format
      addFormat(N, q) {
        return typeof q == "string" && (q = new RegExp(q)), this.formats[N] = q, this;
      }
      errorsText(N = this.errors, { separator: q = ", ", dataVar: T = "data" } = {}) {
        return !N || N.length === 0 ? "No errors" : N.map((y) => `${T}${y.instancePath} ${y.message}`).reduce((y, R) => y + q + R);
      }
      $dataMetaSchema(N, q) {
        const T = this.RULES.all;
        N = JSON.parse(JSON.stringify(N));
        for (const y of q) {
          const R = y.split("/").slice(1);
          let C = N;
          for (const U of R)
            C = C[U];
          for (const U in T) {
            const H = T[U];
            if (typeof H != "object")
              continue;
            const { $data: re } = H.definition, ee = C[U];
            re && ee && (C[U] = me(ee));
          }
        }
        return N;
      }
      _removeAllSchemas(N, q) {
        for (const T in N) {
          const y = N[T];
          (!q || q.test(T)) && (typeof y == "string" ? delete N[T] : y && !y.meta && (this._cache.delete(y.schema), delete N[T]));
        }
      }
      _addSchema(N, q, T, y = this.opts.validateSchema, R = this.opts.addUsedSchema) {
        let C;
        const { schemaId: U } = this.opts;
        if (typeof N == "object")
          C = N[U];
        else {
          if (this.opts.jtd)
            throw new Error("schema must be object");
          if (typeof N != "boolean")
            throw new Error("schema must be object or boolean");
        }
        let H = this._cache.get(N);
        if (H !== void 0)
          return H;
        T = (0, f.normalizeId)(C || T);
        const re = f.getSchemaRefs.call(this, N, T);
        return H = new c.SchemaEnv({ schema: N, schemaId: U, meta: q, baseId: T, localRefs: re }), this._cache.set(H.schema, H), R && !T.startsWith("#") && (T && this._checkUnique(T), this.refs[T] = H), y && this.validateSchema(N, !0), H;
      }
      _checkUnique(N) {
        if (this.schemas[N] || this.refs[N])
          throw new Error(`schema with key or id "${N}" already exists`);
      }
      _compileSchemaEnv(N) {
        if (N.meta ? this._compileMetaSchema(N) : c.compileSchema.call(this, N), !N.validate)
          throw new Error("ajv implementation error");
        return N.validate;
      }
      _compileMetaSchema(N) {
        const q = this.opts;
        this.opts = this._metaOpts;
        try {
          c.compileSchema.call(this, N);
        } finally {
          this.opts = q;
        }
      }
    }
    m.ValidationError = n.default, m.MissingRefError = i.default, e.default = m;
    function $(A, N, q, T = "error") {
      for (const y in A) {
        const R = y;
        R in N && this.logger[T](`${q}: option ${y}. ${A[R]}`);
      }
    }
    function g(A) {
      return A = (0, f.normalizeId)(A), this.schemas[A] || this.refs[A];
    }
    function E() {
      const A = this.opts.schemas;
      if (A)
        if (Array.isArray(A))
          this.addSchema(A);
        else
          for (const N in A)
            this.addSchema(A[N], N);
    }
    function P() {
      for (const A in this.opts.formats) {
        const N = this.opts.formats[A];
        N && this.addFormat(A, N);
      }
    }
    function D(A) {
      if (Array.isArray(A)) {
        this.addVocabulary(A);
        return;
      }
      this.logger.warn("keywords option as map is deprecated, pass array");
      for (const N in A) {
        const q = A[N];
        q.keyword || (q.keyword = N), this.addKeyword(q);
      }
    }
    function V() {
      const A = { ...this.opts };
      for (const N of S)
        delete A[N];
      return A;
    }
    const F = { log() {
    }, warn() {
    }, error() {
    } };
    function K(A) {
      if (A === !1)
        return F;
      if (A === void 0)
        return console;
      if (A.log && A.warn && A.error)
        return A;
      throw new Error("logger must implement log, warn and error methods");
    }
    const L = /^[a-z_$][a-z0-9_$:-]*$/i;
    function J(A, N) {
      const { RULES: q } = this;
      if ((0, p.eachItem)(A, (T) => {
        if (q.keywords[T])
          throw new Error(`Keyword ${T} is already defined`);
        if (!L.test(T))
          throw new Error(`Keyword ${T} has invalid name`);
      }), !!N && N.$data && !("code" in N || "validate" in N))
        throw new Error('$data keyword must have "code" or "validate" function');
    }
    function B(A, N, q) {
      var T;
      const y = N == null ? void 0 : N.post;
      if (q && y)
        throw new Error('keyword with "post" flag cannot have "type"');
      const { RULES: R } = this;
      let C = y ? R.post : R.rules.find(({ type: H }) => H === q);
      if (C || (C = { type: q, rules: [] }, R.rules.push(C)), R.keywords[A] = !0, !N)
        return;
      const U = {
        keyword: A,
        definition: {
          ...N,
          type: (0, _.getJSONTypes)(N.type),
          schemaType: (0, _.getJSONTypes)(N.schemaType)
        }
      };
      N.before ? we.call(this, C, U, N.before) : C.rules.push(U), R.all[A] = U, (T = N.implements) === null || T === void 0 || T.forEach((H) => this.addKeyword(H));
    }
    function we(A, N, q) {
      const T = A.rules.findIndex((y) => y.keyword === q);
      T >= 0 ? A.rules.splice(T, 0, N) : (A.rules.push(N), this.logger.warn(`rule ${q} is not defined`));
    }
    function ce(A) {
      let { metaSchema: N } = A;
      N !== void 0 && (A.$data && this.opts.$data && (N = me(N)), A.validateSchema = this.compile(N, !0));
    }
    const x = {
      $ref: "https://raw.githubusercontent.com/ajv-validator/ajv/master/lib/refs/data.json#"
    };
    function me(A) {
      return { anyOf: [A, x] };
    }
  }(zn)), zn;
}
var wr = {}, Er = {}, Sr = {}, ki;
function Bu() {
  if (ki) return Sr;
  ki = 1, Object.defineProperty(Sr, "__esModule", { value: !0 });
  const e = {
    keyword: "id",
    code() {
      throw new Error('NOT SUPPORTED: keyword "id", use "$id" for schema ID');
    }
  };
  return Sr.default = e, Sr;
}
var tt = {}, Di;
function Yu() {
  if (Di) return tt;
  Di = 1, Object.defineProperty(tt, "__esModule", { value: !0 }), tt.callRef = tt.getValidate = void 0;
  const e = Pn(), t = Fe(), r = Y(), n = pt(), i = Ms(), s = te(), c = {
    keyword: "$ref",
    schemaType: "string",
    code(_) {
      const { gen: p, schema: h, it: b } = _, { baseId: w, schemaEnv: S, validateName: v, opts: d, self: u } = b, { root: o } = S;
      if ((h === "#" || h === "#/") && w === o.baseId)
        return m();
      const l = i.resolveRef.call(u, o, w, h);
      if (l === void 0)
        throw new e.default(b.opts.uriResolver, w, h);
      if (l instanceof i.SchemaEnv)
        return $(l);
      return g(l);
      function m() {
        if (S === o)
          return f(_, v, S, S.$async);
        const E = p.scopeValue("root", { ref: o });
        return f(_, (0, r._)`${E}.validate`, o, o.$async);
      }
      function $(E) {
        const P = a(_, E);
        f(_, P, E, E.$async);
      }
      function g(E) {
        const P = p.scopeValue("schema", d.code.source === !0 ? { ref: E, code: (0, r.stringify)(E) } : { ref: E }), D = p.name("valid"), V = _.subschema({
          schema: E,
          dataTypes: [],
          schemaPath: r.nil,
          topSchemaRef: P,
          errSchemaPath: h
        }, D);
        _.mergeEvaluated(V), _.ok(D);
      }
    }
  };
  function a(_, p) {
    const { gen: h } = _;
    return p.validate ? h.scopeValue("validate", { ref: p.validate }) : (0, r._)`${h.scopeValue("wrapper", { ref: p })}.validate`;
  }
  tt.getValidate = a;
  function f(_, p, h, b) {
    const { gen: w, it: S } = _, { allErrors: v, schemaEnv: d, opts: u } = S, o = u.passContext ? n.default.this : r.nil;
    b ? l() : m();
    function l() {
      if (!d.$async)
        throw new Error("async schema referenced by sync schema");
      const E = w.let("valid");
      w.try(() => {
        w.code((0, r._)`await ${(0, t.callValidateCode)(_, p, o)}`), g(p), v || w.assign(E, !0);
      }, (P) => {
        w.if((0, r._)`!(${P} instanceof ${S.ValidationError})`, () => w.throw(P)), $(P), v || w.assign(E, !1);
      }), _.ok(E);
    }
    function m() {
      _.result((0, t.callValidateCode)(_, p, o), () => g(p), () => $(p));
    }
    function $(E) {
      const P = (0, r._)`${E}.errors`;
      w.assign(n.default.vErrors, (0, r._)`${n.default.vErrors} === null ? ${P} : ${n.default.vErrors}.concat(${P})`), w.assign(n.default.errors, (0, r._)`${n.default.vErrors}.length`);
    }
    function g(E) {
      var P;
      if (!S.opts.unevaluated)
        return;
      const D = (P = h == null ? void 0 : h.validate) === null || P === void 0 ? void 0 : P.evaluated;
      if (S.props !== !0)
        if (D && !D.dynamicProps)
          D.props !== void 0 && (S.props = s.mergeEvaluated.props(w, D.props, S.props));
        else {
          const V = w.var("props", (0, r._)`${E}.evaluated.props`);
          S.props = s.mergeEvaluated.props(w, V, S.props, r.Name);
        }
      if (S.items !== !0)
        if (D && !D.dynamicItems)
          D.items !== void 0 && (S.items = s.mergeEvaluated.items(w, D.items, S.items));
        else {
          const V = w.var("items", (0, r._)`${E}.evaluated.items`);
          S.items = s.mergeEvaluated.items(w, V, S.items, r.Name);
        }
    }
  }
  return tt.callRef = f, tt.default = c, tt;
}
var qi;
function Xu() {
  if (qi) return Er;
  qi = 1, Object.defineProperty(Er, "__esModule", { value: !0 });
  const e = Bu(), t = Yu(), r = [
    "$schema",
    "$id",
    "$defs",
    "$vocabulary",
    { keyword: "$comment" },
    "definitions",
    e.default,
    t.default
  ];
  return Er.default = r, Er;
}
var Rr = {}, Or = {}, Ai;
function Zu() {
  if (Ai) return Or;
  Ai = 1, Object.defineProperty(Or, "__esModule", { value: !0 });
  const e = Y(), t = e.operators, r = {
    maximum: { okStr: "<=", ok: t.LTE, fail: t.GT },
    minimum: { okStr: ">=", ok: t.GTE, fail: t.LT },
    exclusiveMaximum: { okStr: "<", ok: t.LT, fail: t.GTE },
    exclusiveMinimum: { okStr: ">", ok: t.GT, fail: t.LTE }
  }, n = {
    message: ({ keyword: s, schemaCode: c }) => (0, e.str)`must be ${r[s].okStr} ${c}`,
    params: ({ keyword: s, schemaCode: c }) => (0, e._)`{comparison: ${r[s].okStr}, limit: ${c}}`
  }, i = {
    keyword: Object.keys(r),
    type: "number",
    schemaType: "number",
    $data: !0,
    error: n,
    code(s) {
      const { keyword: c, data: a, schemaCode: f } = s;
      s.fail$data((0, e._)`${a} ${r[c].fail} ${f} || isNaN(${a})`);
    }
  };
  return Or.default = i, Or;
}
var Nr = {}, Mi;
function el() {
  if (Mi) return Nr;
  Mi = 1, Object.defineProperty(Nr, "__esModule", { value: !0 });
  const e = Y(), r = {
    keyword: "multipleOf",
    type: "number",
    schemaType: "number",
    $data: !0,
    error: {
      message: ({ schemaCode: n }) => (0, e.str)`must be multiple of ${n}`,
      params: ({ schemaCode: n }) => (0, e._)`{multipleOf: ${n}}`
    },
    code(n) {
      const { gen: i, data: s, schemaCode: c, it: a } = n, f = a.opts.multipleOfPrecision, _ = i.let("res"), p = f ? (0, e._)`Math.abs(Math.round(${_}) - ${_}) > 1e-${f}` : (0, e._)`${_} !== parseInt(${_})`;
      n.fail$data((0, e._)`(${c} === 0 || (${_} = ${s}/${c}, ${p}))`);
    }
  };
  return Nr.default = r, Nr;
}
var Pr = {}, jr = {}, Vi;
function tl() {
  if (Vi) return jr;
  Vi = 1, Object.defineProperty(jr, "__esModule", { value: !0 });
  function e(t) {
    const r = t.length;
    let n = 0, i = 0, s;
    for (; i < r; )
      n++, s = t.charCodeAt(i++), s >= 55296 && s <= 56319 && i < r && (s = t.charCodeAt(i), (s & 64512) === 56320 && i++);
    return n;
  }
  return jr.default = e, e.code = 'require("ajv/dist/runtime/ucs2length").default', jr;
}
var Fi;
function rl() {
  if (Fi) return Pr;
  Fi = 1, Object.defineProperty(Pr, "__esModule", { value: !0 });
  const e = Y(), t = te(), r = tl(), i = {
    keyword: ["maxLength", "minLength"],
    type: "string",
    schemaType: "number",
    $data: !0,
    error: {
      message({ keyword: s, schemaCode: c }) {
        const a = s === "maxLength" ? "more" : "fewer";
        return (0, e.str)`must NOT have ${a} than ${c} characters`;
      },
      params: ({ schemaCode: s }) => (0, e._)`{limit: ${s}}`
    },
    code(s) {
      const { keyword: c, data: a, schemaCode: f, it: _ } = s, p = c === "maxLength" ? e.operators.GT : e.operators.LT, h = _.opts.unicode === !1 ? (0, e._)`${a}.length` : (0, e._)`${(0, t.useFunc)(s.gen, r.default)}(${a})`;
      s.fail$data((0, e._)`${h} ${p} ${f}`);
    }
  };
  return Pr.default = i, Pr;
}
var Tr = {}, Ui;
function nl() {
  if (Ui) return Tr;
  Ui = 1, Object.defineProperty(Tr, "__esModule", { value: !0 });
  const e = Fe(), t = Y(), n = {
    keyword: "pattern",
    type: "string",
    schemaType: "string",
    $data: !0,
    error: {
      message: ({ schemaCode: i }) => (0, t.str)`must match pattern "${i}"`,
      params: ({ schemaCode: i }) => (0, t._)`{pattern: ${i}}`
    },
    code(i) {
      const { data: s, $data: c, schema: a, schemaCode: f, it: _ } = i, p = _.opts.unicodeRegExp ? "u" : "", h = c ? (0, t._)`(new RegExp(${f}, ${p}))` : (0, e.usePattern)(i, a);
      i.fail$data((0, t._)`!${h}.test(${s})`);
    }
  };
  return Tr.default = n, Tr;
}
var Cr = {}, Li;
function sl() {
  if (Li) return Cr;
  Li = 1, Object.defineProperty(Cr, "__esModule", { value: !0 });
  const e = Y(), r = {
    keyword: ["maxProperties", "minProperties"],
    type: "object",
    schemaType: "number",
    $data: !0,
    error: {
      message({ keyword: n, schemaCode: i }) {
        const s = n === "maxProperties" ? "more" : "fewer";
        return (0, e.str)`must NOT have ${s} than ${i} properties`;
      },
      params: ({ schemaCode: n }) => (0, e._)`{limit: ${n}}`
    },
    code(n) {
      const { keyword: i, data: s, schemaCode: c } = n, a = i === "maxProperties" ? e.operators.GT : e.operators.LT;
      n.fail$data((0, e._)`Object.keys(${s}).length ${a} ${c}`);
    }
  };
  return Cr.default = r, Cr;
}
var Ir = {}, zi;
function il() {
  if (zi) return Ir;
  zi = 1, Object.defineProperty(Ir, "__esModule", { value: !0 });
  const e = Fe(), t = Y(), r = te(), i = {
    keyword: "required",
    type: "object",
    schemaType: "array",
    $data: !0,
    error: {
      message: ({ params: { missingProperty: s } }) => (0, t.str)`must have required property '${s}'`,
      params: ({ params: { missingProperty: s } }) => (0, t._)`{missingProperty: ${s}}`
    },
    code(s) {
      const { gen: c, schema: a, schemaCode: f, data: _, $data: p, it: h } = s, { opts: b } = h;
      if (!p && a.length === 0)
        return;
      const w = a.length >= b.loopRequired;
      if (h.allErrors ? S() : v(), b.strictRequired) {
        const o = s.parentSchema.properties, { definedProperties: l } = s.it;
        for (const m of a)
          if ((o == null ? void 0 : o[m]) === void 0 && !l.has(m)) {
            const $ = h.schemaEnv.baseId + h.errSchemaPath, g = `required property "${m}" is not defined at "${$}" (strictRequired)`;
            (0, r.checkStrictMode)(h, g, h.opts.strictRequired);
          }
      }
      function S() {
        if (w || p)
          s.block$data(t.nil, d);
        else
          for (const o of a)
            (0, e.checkReportMissingProp)(s, o);
      }
      function v() {
        const o = c.let("missing");
        if (w || p) {
          const l = c.let("valid", !0);
          s.block$data(l, () => u(o, l)), s.ok(l);
        } else
          c.if((0, e.checkMissingProp)(s, a, o)), (0, e.reportMissingProp)(s, o), c.else();
      }
      function d() {
        c.forOf("prop", f, (o) => {
          s.setParams({ missingProperty: o }), c.if((0, e.noPropertyInData)(c, _, o, b.ownProperties), () => s.error());
        });
      }
      function u(o, l) {
        s.setParams({ missingProperty: o }), c.forOf(o, f, () => {
          c.assign(l, (0, e.propertyInData)(c, _, o, b.ownProperties)), c.if((0, t.not)(l), () => {
            s.error(), c.break();
          });
        }, t.nil);
      }
    }
  };
  return Ir.default = i, Ir;
}
var kr = {}, Ki;
function ol() {
  if (Ki) return kr;
  Ki = 1, Object.defineProperty(kr, "__esModule", { value: !0 });
  const e = Y(), r = {
    keyword: ["maxItems", "minItems"],
    type: "array",
    schemaType: "number",
    $data: !0,
    error: {
      message({ keyword: n, schemaCode: i }) {
        const s = n === "maxItems" ? "more" : "fewer";
        return (0, e.str)`must NOT have ${s} than ${i} items`;
      },
      params: ({ schemaCode: n }) => (0, e._)`{limit: ${n}}`
    },
    code(n) {
      const { keyword: i, data: s, schemaCode: c } = n, a = i === "maxItems" ? e.operators.GT : e.operators.LT;
      n.fail$data((0, e._)`${s}.length ${a} ${c}`);
    }
  };
  return kr.default = r, kr;
}
var Dr = {}, qr = {}, Hi;
function Vs() {
  if (Hi) return qr;
  Hi = 1, Object.defineProperty(qr, "__esModule", { value: !0 });
  const e = Ra();
  return e.code = 'require("ajv/dist/runtime/equal").default', qr.default = e, qr;
}
var xi;
function al() {
  if (xi) return Dr;
  xi = 1, Object.defineProperty(Dr, "__esModule", { value: !0 });
  const e = yn(), t = Y(), r = te(), n = Vs(), s = {
    keyword: "uniqueItems",
    type: "array",
    schemaType: "boolean",
    $data: !0,
    error: {
      message: ({ params: { i: c, j: a } }) => (0, t.str)`must NOT have duplicate items (items ## ${a} and ${c} are identical)`,
      params: ({ params: { i: c, j: a } }) => (0, t._)`{i: ${c}, j: ${a}}`
    },
    code(c) {
      const { gen: a, data: f, $data: _, schema: p, parentSchema: h, schemaCode: b, it: w } = c;
      if (!_ && !p)
        return;
      const S = a.let("valid"), v = h.items ? (0, e.getSchemaTypes)(h.items) : [];
      c.block$data(S, d, (0, t._)`${b} === false`), c.ok(S);
      function d() {
        const m = a.let("i", (0, t._)`${f}.length`), $ = a.let("j");
        c.setParams({ i: m, j: $ }), a.assign(S, !0), a.if((0, t._)`${m} > 1`, () => (u() ? o : l)(m, $));
      }
      function u() {
        return v.length > 0 && !v.some((m) => m === "object" || m === "array");
      }
      function o(m, $) {
        const g = a.name("item"), E = (0, e.checkDataTypes)(v, g, w.opts.strictNumbers, e.DataType.Wrong), P = a.const("indices", (0, t._)`{}`);
        a.for((0, t._)`;${m}--;`, () => {
          a.let(g, (0, t._)`${f}[${m}]`), a.if(E, (0, t._)`continue`), v.length > 1 && a.if((0, t._)`typeof ${g} == "string"`, (0, t._)`${g} += "_"`), a.if((0, t._)`typeof ${P}[${g}] == "number"`, () => {
            a.assign($, (0, t._)`${P}[${g}]`), c.error(), a.assign(S, !1).break();
          }).code((0, t._)`${P}[${g}] = ${m}`);
        });
      }
      function l(m, $) {
        const g = (0, r.useFunc)(a, n.default), E = a.name("outer");
        a.label(E).for((0, t._)`;${m}--;`, () => a.for((0, t._)`${$} = ${m}; ${$}--;`, () => a.if((0, t._)`${g}(${f}[${m}], ${f}[${$}])`, () => {
          c.error(), a.assign(S, !1).break(E);
        })));
      }
    }
  };
  return Dr.default = s, Dr;
}
var Ar = {}, Ji;
function cl() {
  if (Ji) return Ar;
  Ji = 1, Object.defineProperty(Ar, "__esModule", { value: !0 });
  const e = Y(), t = te(), r = Vs(), i = {
    keyword: "const",
    $data: !0,
    error: {
      message: "must be equal to constant",
      params: ({ schemaCode: s }) => (0, e._)`{allowedValue: ${s}}`
    },
    code(s) {
      const { gen: c, data: a, $data: f, schemaCode: _, schema: p } = s;
      f || p && typeof p == "object" ? s.fail$data((0, e._)`!${(0, t.useFunc)(c, r.default)}(${a}, ${_})`) : s.fail((0, e._)`${p} !== ${a}`);
    }
  };
  return Ar.default = i, Ar;
}
var Mr = {}, Wi;
function ul() {
  if (Wi) return Mr;
  Wi = 1, Object.defineProperty(Mr, "__esModule", { value: !0 });
  const e = Y(), t = te(), r = Vs(), i = {
    keyword: "enum",
    schemaType: "array",
    $data: !0,
    error: {
      message: "must be equal to one of the allowed values",
      params: ({ schemaCode: s }) => (0, e._)`{allowedValues: ${s}}`
    },
    code(s) {
      const { gen: c, data: a, $data: f, schema: _, schemaCode: p, it: h } = s;
      if (!f && _.length === 0)
        throw new Error("enum must have non-empty array");
      const b = _.length >= h.opts.loopEnum;
      let w;
      const S = () => w ?? (w = (0, t.useFunc)(c, r.default));
      let v;
      if (b || f)
        v = c.let("valid"), s.block$data(v, d);
      else {
        if (!Array.isArray(_))
          throw new Error("ajv implementation error");
        const o = c.const("vSchema", p);
        v = (0, e.or)(..._.map((l, m) => u(o, m)));
      }
      s.pass(v);
      function d() {
        c.assign(v, !1), c.forOf("v", p, (o) => c.if((0, e._)`${S()}(${a}, ${o})`, () => c.assign(v, !0).break()));
      }
      function u(o, l) {
        const m = _[l];
        return typeof m == "object" && m !== null ? (0, e._)`${S()}(${a}, ${o}[${l}])` : (0, e._)`${a} === ${m}`;
      }
    }
  };
  return Mr.default = i, Mr;
}
var Gi;
function ll() {
  if (Gi) return Rr;
  Gi = 1, Object.defineProperty(Rr, "__esModule", { value: !0 });
  const e = Zu(), t = el(), r = rl(), n = nl(), i = sl(), s = il(), c = ol(), a = al(), f = cl(), _ = ul(), p = [
    // number
    e.default,
    t.default,
    // string
    r.default,
    n.default,
    // object
    i.default,
    s.default,
    // array
    c.default,
    a.default,
    // any
    { keyword: "type", schemaType: ["string", "array"] },
    { keyword: "nullable", schemaType: "boolean" },
    f.default,
    _.default
  ];
  return Rr.default = p, Rr;
}
var Vr = {}, Ct = {}, Qi;
function Oa() {
  if (Qi) return Ct;
  Qi = 1, Object.defineProperty(Ct, "__esModule", { value: !0 }), Ct.validateAdditionalItems = void 0;
  const e = Y(), t = te(), n = {
    keyword: "additionalItems",
    type: "array",
    schemaType: ["boolean", "object"],
    before: "uniqueItems",
    error: {
      message: ({ params: { len: s } }) => (0, e.str)`must NOT have more than ${s} items`,
      params: ({ params: { len: s } }) => (0, e._)`{limit: ${s}}`
    },
    code(s) {
      const { parentSchema: c, it: a } = s, { items: f } = c;
      if (!Array.isArray(f)) {
        (0, t.checkStrictMode)(a, '"additionalItems" is ignored when "items" is not an array of schemas');
        return;
      }
      i(s, f);
    }
  };
  function i(s, c) {
    const { gen: a, schema: f, data: _, keyword: p, it: h } = s;
    h.items = !0;
    const b = a.const("len", (0, e._)`${_}.length`);
    if (f === !1)
      s.setParams({ len: c.length }), s.pass((0, e._)`${b} <= ${c.length}`);
    else if (typeof f == "object" && !(0, t.alwaysValidSchema)(h, f)) {
      const S = a.var("valid", (0, e._)`${b} <= ${c.length}`);
      a.if((0, e.not)(S), () => w(S)), s.ok(S);
    }
    function w(S) {
      a.forRange("i", c.length, b, (v) => {
        s.subschema({ keyword: p, dataProp: v, dataPropType: t.Type.Num }, S), h.allErrors || a.if((0, e.not)(S), () => a.break());
      });
    }
  }
  return Ct.validateAdditionalItems = i, Ct.default = n, Ct;
}
var Fr = {}, It = {}, Bi;
function Na() {
  if (Bi) return It;
  Bi = 1, Object.defineProperty(It, "__esModule", { value: !0 }), It.validateTuple = void 0;
  const e = Y(), t = te(), r = Fe(), n = {
    keyword: "items",
    type: "array",
    schemaType: ["object", "array", "boolean"],
    before: "uniqueItems",
    code(s) {
      const { schema: c, it: a } = s;
      if (Array.isArray(c))
        return i(s, "additionalItems", c);
      a.items = !0, !(0, t.alwaysValidSchema)(a, c) && s.ok((0, r.validateArray)(s));
    }
  };
  function i(s, c, a = s.schema) {
    const { gen: f, parentSchema: _, data: p, keyword: h, it: b } = s;
    v(_), b.opts.unevaluated && a.length && b.items !== !0 && (b.items = t.mergeEvaluated.items(f, a.length, b.items));
    const w = f.name("valid"), S = f.const("len", (0, e._)`${p}.length`);
    a.forEach((d, u) => {
      (0, t.alwaysValidSchema)(b, d) || (f.if((0, e._)`${S} > ${u}`, () => s.subschema({
        keyword: h,
        schemaProp: u,
        dataProp: u
      }, w)), s.ok(w));
    });
    function v(d) {
      const { opts: u, errSchemaPath: o } = b, l = a.length, m = l === d.minItems && (l === d.maxItems || d[c] === !1);
      if (u.strictTuples && !m) {
        const $ = `"${h}" is ${l}-tuple, but minItems or maxItems/${c} are not specified or different at path "${o}"`;
        (0, t.checkStrictMode)(b, $, u.strictTuples);
      }
    }
  }
  return It.validateTuple = i, It.default = n, It;
}
var Yi;
function fl() {
  if (Yi) return Fr;
  Yi = 1, Object.defineProperty(Fr, "__esModule", { value: !0 });
  const e = Na(), t = {
    keyword: "prefixItems",
    type: "array",
    schemaType: ["array"],
    before: "uniqueItems",
    code: (r) => (0, e.validateTuple)(r, "items")
  };
  return Fr.default = t, Fr;
}
var Ur = {}, Xi;
function dl() {
  if (Xi) return Ur;
  Xi = 1, Object.defineProperty(Ur, "__esModule", { value: !0 });
  const e = Y(), t = te(), r = Fe(), n = Oa(), s = {
    keyword: "items",
    type: "array",
    schemaType: ["object", "boolean"],
    before: "uniqueItems",
    error: {
      message: ({ params: { len: c } }) => (0, e.str)`must NOT have more than ${c} items`,
      params: ({ params: { len: c } }) => (0, e._)`{limit: ${c}}`
    },
    code(c) {
      const { schema: a, parentSchema: f, it: _ } = c, { prefixItems: p } = f;
      _.items = !0, !(0, t.alwaysValidSchema)(_, a) && (p ? (0, n.validateAdditionalItems)(c, p) : c.ok((0, r.validateArray)(c)));
    }
  };
  return Ur.default = s, Ur;
}
var Lr = {}, Zi;
function hl() {
  if (Zi) return Lr;
  Zi = 1, Object.defineProperty(Lr, "__esModule", { value: !0 });
  const e = Y(), t = te(), n = {
    keyword: "contains",
    type: "array",
    schemaType: ["object", "boolean"],
    before: "uniqueItems",
    trackErrors: !0,
    error: {
      message: ({ params: { min: i, max: s } }) => s === void 0 ? (0, e.str)`must contain at least ${i} valid item(s)` : (0, e.str)`must contain at least ${i} and no more than ${s} valid item(s)`,
      params: ({ params: { min: i, max: s } }) => s === void 0 ? (0, e._)`{minContains: ${i}}` : (0, e._)`{minContains: ${i}, maxContains: ${s}}`
    },
    code(i) {
      const { gen: s, schema: c, parentSchema: a, data: f, it: _ } = i;
      let p, h;
      const { minContains: b, maxContains: w } = a;
      _.opts.next ? (p = b === void 0 ? 1 : b, h = w) : p = 1;
      const S = s.const("len", (0, e._)`${f}.length`);
      if (i.setParams({ min: p, max: h }), h === void 0 && p === 0) {
        (0, t.checkStrictMode)(_, '"minContains" == 0 without "maxContains": "contains" keyword ignored');
        return;
      }
      if (h !== void 0 && p > h) {
        (0, t.checkStrictMode)(_, '"minContains" > "maxContains" is always invalid'), i.fail();
        return;
      }
      if ((0, t.alwaysValidSchema)(_, c)) {
        let l = (0, e._)`${S} >= ${p}`;
        h !== void 0 && (l = (0, e._)`${l} && ${S} <= ${h}`), i.pass(l);
        return;
      }
      _.items = !0;
      const v = s.name("valid");
      h === void 0 && p === 1 ? u(v, () => s.if(v, () => s.break())) : p === 0 ? (s.let(v, !0), h !== void 0 && s.if((0, e._)`${f}.length > 0`, d)) : (s.let(v, !1), d()), i.result(v, () => i.reset());
      function d() {
        const l = s.name("_valid"), m = s.let("count", 0);
        u(l, () => s.if(l, () => o(m)));
      }
      function u(l, m) {
        s.forRange("i", 0, S, ($) => {
          i.subschema({
            keyword: "contains",
            dataProp: $,
            dataPropType: t.Type.Num,
            compositeRule: !0
          }, l), m();
        });
      }
      function o(l) {
        s.code((0, e._)`${l}++`), h === void 0 ? s.if((0, e._)`${l} >= ${p}`, () => s.assign(v, !0).break()) : (s.if((0, e._)`${l} > ${h}`, () => s.assign(v, !1).break()), p === 1 ? s.assign(v, !0) : s.if((0, e._)`${l} >= ${p}`, () => s.assign(v, !0)));
      }
    }
  };
  return Lr.default = n, Lr;
}
var Xn = {}, eo;
function pl() {
  return eo || (eo = 1, function(e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.validateSchemaDeps = e.validatePropertyDeps = e.error = void 0;
    const t = Y(), r = te(), n = Fe();
    e.error = {
      message: ({ params: { property: f, depsCount: _, deps: p } }) => {
        const h = _ === 1 ? "property" : "properties";
        return (0, t.str)`must have ${h} ${p} when property ${f} is present`;
      },
      params: ({ params: { property: f, depsCount: _, deps: p, missingProperty: h } }) => (0, t._)`{property: ${f},
    missingProperty: ${h},
    depsCount: ${_},
    deps: ${p}}`
      // TODO change to reference
    };
    const i = {
      keyword: "dependencies",
      type: "object",
      schemaType: "object",
      error: e.error,
      code(f) {
        const [_, p] = s(f);
        c(f, _), a(f, p);
      }
    };
    function s({ schema: f }) {
      const _ = {}, p = {};
      for (const h in f) {
        if (h === "__proto__")
          continue;
        const b = Array.isArray(f[h]) ? _ : p;
        b[h] = f[h];
      }
      return [_, p];
    }
    function c(f, _ = f.schema) {
      const { gen: p, data: h, it: b } = f;
      if (Object.keys(_).length === 0)
        return;
      const w = p.let("missing");
      for (const S in _) {
        const v = _[S];
        if (v.length === 0)
          continue;
        const d = (0, n.propertyInData)(p, h, S, b.opts.ownProperties);
        f.setParams({
          property: S,
          depsCount: v.length,
          deps: v.join(", ")
        }), b.allErrors ? p.if(d, () => {
          for (const u of v)
            (0, n.checkReportMissingProp)(f, u);
        }) : (p.if((0, t._)`${d} && (${(0, n.checkMissingProp)(f, v, w)})`), (0, n.reportMissingProp)(f, w), p.else());
      }
    }
    e.validatePropertyDeps = c;
    function a(f, _ = f.schema) {
      const { gen: p, data: h, keyword: b, it: w } = f, S = p.name("valid");
      for (const v in _)
        (0, r.alwaysValidSchema)(w, _[v]) || (p.if(
          (0, n.propertyInData)(p, h, v, w.opts.ownProperties),
          () => {
            const d = f.subschema({ keyword: b, schemaProp: v }, S);
            f.mergeValidEvaluated(d, S);
          },
          () => p.var(S, !0)
          // TODO var
        ), f.ok(S));
    }
    e.validateSchemaDeps = a, e.default = i;
  }(Xn)), Xn;
}
var zr = {}, to;
function ml() {
  if (to) return zr;
  to = 1, Object.defineProperty(zr, "__esModule", { value: !0 });
  const e = Y(), t = te(), n = {
    keyword: "propertyNames",
    type: "object",
    schemaType: ["object", "boolean"],
    error: {
      message: "property name must be valid",
      params: ({ params: i }) => (0, e._)`{propertyName: ${i.propertyName}}`
    },
    code(i) {
      const { gen: s, schema: c, data: a, it: f } = i;
      if ((0, t.alwaysValidSchema)(f, c))
        return;
      const _ = s.name("valid");
      s.forIn("key", a, (p) => {
        i.setParams({ propertyName: p }), i.subschema({
          keyword: "propertyNames",
          data: p,
          dataTypes: ["string"],
          propertyName: p,
          compositeRule: !0
        }, _), s.if((0, e.not)(_), () => {
          i.error(!0), f.allErrors || s.break();
        });
      }), i.ok(_);
    }
  };
  return zr.default = n, zr;
}
var Kr = {}, ro;
function Pa() {
  if (ro) return Kr;
  ro = 1, Object.defineProperty(Kr, "__esModule", { value: !0 });
  const e = Fe(), t = Y(), r = pt(), n = te(), s = {
    keyword: "additionalProperties",
    type: ["object"],
    schemaType: ["boolean", "object"],
    allowUndefined: !0,
    trackErrors: !0,
    error: {
      message: "must NOT have additional properties",
      params: ({ params: c }) => (0, t._)`{additionalProperty: ${c.additionalProperty}}`
    },
    code(c) {
      const { gen: a, schema: f, parentSchema: _, data: p, errsCount: h, it: b } = c;
      if (!h)
        throw new Error("ajv implementation error");
      const { allErrors: w, opts: S } = b;
      if (b.props = !0, S.removeAdditional !== "all" && (0, n.alwaysValidSchema)(b, f))
        return;
      const v = (0, e.allSchemaProperties)(_.properties), d = (0, e.allSchemaProperties)(_.patternProperties);
      u(), c.ok((0, t._)`${h} === ${r.default.errors}`);
      function u() {
        a.forIn("key", p, (g) => {
          !v.length && !d.length ? m(g) : a.if(o(g), () => m(g));
        });
      }
      function o(g) {
        let E;
        if (v.length > 8) {
          const P = (0, n.schemaRefOrVal)(b, _.properties, "properties");
          E = (0, e.isOwnProperty)(a, P, g);
        } else v.length ? E = (0, t.or)(...v.map((P) => (0, t._)`${g} === ${P}`)) : E = t.nil;
        return d.length && (E = (0, t.or)(E, ...d.map((P) => (0, t._)`${(0, e.usePattern)(c, P)}.test(${g})`))), (0, t.not)(E);
      }
      function l(g) {
        a.code((0, t._)`delete ${p}[${g}]`);
      }
      function m(g) {
        if (S.removeAdditional === "all" || S.removeAdditional && f === !1) {
          l(g);
          return;
        }
        if (f === !1) {
          c.setParams({ additionalProperty: g }), c.error(), w || a.break();
          return;
        }
        if (typeof f == "object" && !(0, n.alwaysValidSchema)(b, f)) {
          const E = a.name("valid");
          S.removeAdditional === "failing" ? ($(g, E, !1), a.if((0, t.not)(E), () => {
            c.reset(), l(g);
          })) : ($(g, E), w || a.if((0, t.not)(E), () => a.break()));
        }
      }
      function $(g, E, P) {
        const D = {
          keyword: "additionalProperties",
          dataProp: g,
          dataPropType: n.Type.Str
        };
        P === !1 && Object.assign(D, {
          compositeRule: !0,
          createErrors: !1,
          allErrors: !1
        }), c.subschema(D, E);
      }
    }
  };
  return Kr.default = s, Kr;
}
var Hr = {}, no;
function yl() {
  if (no) return Hr;
  no = 1, Object.defineProperty(Hr, "__esModule", { value: !0 });
  const e = Nn(), t = Fe(), r = te(), n = Pa(), i = {
    keyword: "properties",
    type: "object",
    schemaType: "object",
    code(s) {
      const { gen: c, schema: a, parentSchema: f, data: _, it: p } = s;
      p.opts.removeAdditional === "all" && f.additionalProperties === void 0 && n.default.code(new e.KeywordCxt(p, n.default, "additionalProperties"));
      const h = (0, t.allSchemaProperties)(a);
      for (const d of h)
        p.definedProperties.add(d);
      p.opts.unevaluated && h.length && p.props !== !0 && (p.props = r.mergeEvaluated.props(c, (0, r.toHash)(h), p.props));
      const b = h.filter((d) => !(0, r.alwaysValidSchema)(p, a[d]));
      if (b.length === 0)
        return;
      const w = c.name("valid");
      for (const d of b)
        S(d) ? v(d) : (c.if((0, t.propertyInData)(c, _, d, p.opts.ownProperties)), v(d), p.allErrors || c.else().var(w, !0), c.endIf()), s.it.definedProperties.add(d), s.ok(w);
      function S(d) {
        return p.opts.useDefaults && !p.compositeRule && a[d].default !== void 0;
      }
      function v(d) {
        s.subschema({
          keyword: "properties",
          schemaProp: d,
          dataProp: d
        }, w);
      }
    }
  };
  return Hr.default = i, Hr;
}
var xr = {}, so;
function _l() {
  if (so) return xr;
  so = 1, Object.defineProperty(xr, "__esModule", { value: !0 });
  const e = Fe(), t = Y(), r = te(), n = te(), i = {
    keyword: "patternProperties",
    type: "object",
    schemaType: "object",
    code(s) {
      const { gen: c, schema: a, data: f, parentSchema: _, it: p } = s, { opts: h } = p, b = (0, e.allSchemaProperties)(a), w = b.filter((m) => (0, r.alwaysValidSchema)(p, a[m]));
      if (b.length === 0 || w.length === b.length && (!p.opts.unevaluated || p.props === !0))
        return;
      const S = h.strictSchema && !h.allowMatchingProperties && _.properties, v = c.name("valid");
      p.props !== !0 && !(p.props instanceof t.Name) && (p.props = (0, n.evaluatedPropsToName)(c, p.props));
      const { props: d } = p;
      u();
      function u() {
        for (const m of b)
          S && o(m), p.allErrors ? l(m) : (c.var(v, !0), l(m), c.if(v));
      }
      function o(m) {
        for (const $ in S)
          new RegExp(m).test($) && (0, r.checkStrictMode)(p, `property ${$} matches pattern ${m} (use allowMatchingProperties)`);
      }
      function l(m) {
        c.forIn("key", f, ($) => {
          c.if((0, t._)`${(0, e.usePattern)(s, m)}.test(${$})`, () => {
            const g = w.includes(m);
            g || s.subschema({
              keyword: "patternProperties",
              schemaProp: m,
              dataProp: $,
              dataPropType: n.Type.Str
            }, v), p.opts.unevaluated && d !== !0 ? c.assign((0, t._)`${d}[${$}]`, !0) : !g && !p.allErrors && c.if((0, t.not)(v), () => c.break());
          });
        });
      }
    }
  };
  return xr.default = i, xr;
}
var Jr = {}, io;
function gl() {
  if (io) return Jr;
  io = 1, Object.defineProperty(Jr, "__esModule", { value: !0 });
  const e = te(), t = {
    keyword: "not",
    schemaType: ["object", "boolean"],
    trackErrors: !0,
    code(r) {
      const { gen: n, schema: i, it: s } = r;
      if ((0, e.alwaysValidSchema)(s, i)) {
        r.fail();
        return;
      }
      const c = n.name("valid");
      r.subschema({
        keyword: "not",
        compositeRule: !0,
        createErrors: !1,
        allErrors: !1
      }, c), r.failResult(c, () => r.reset(), () => r.error());
    },
    error: { message: "must NOT be valid" }
  };
  return Jr.default = t, Jr;
}
var Wr = {}, oo;
function vl() {
  if (oo) return Wr;
  oo = 1, Object.defineProperty(Wr, "__esModule", { value: !0 });
  const t = {
    keyword: "anyOf",
    schemaType: "array",
    trackErrors: !0,
    code: Fe().validateUnion,
    error: { message: "must match a schema in anyOf" }
  };
  return Wr.default = t, Wr;
}
var Gr = {}, ao;
function $l() {
  if (ao) return Gr;
  ao = 1, Object.defineProperty(Gr, "__esModule", { value: !0 });
  const e = Y(), t = te(), n = {
    keyword: "oneOf",
    schemaType: "array",
    trackErrors: !0,
    error: {
      message: "must match exactly one schema in oneOf",
      params: ({ params: i }) => (0, e._)`{passingSchemas: ${i.passing}}`
    },
    code(i) {
      const { gen: s, schema: c, parentSchema: a, it: f } = i;
      if (!Array.isArray(c))
        throw new Error("ajv implementation error");
      if (f.opts.discriminator && a.discriminator)
        return;
      const _ = c, p = s.let("valid", !1), h = s.let("passing", null), b = s.name("_valid");
      i.setParams({ passing: h }), s.block(w), i.result(p, () => i.reset(), () => i.error(!0));
      function w() {
        _.forEach((S, v) => {
          let d;
          (0, t.alwaysValidSchema)(f, S) ? s.var(b, !0) : d = i.subschema({
            keyword: "oneOf",
            schemaProp: v,
            compositeRule: !0
          }, b), v > 0 && s.if((0, e._)`${b} && ${p}`).assign(p, !1).assign(h, (0, e._)`[${h}, ${v}]`).else(), s.if(b, () => {
            s.assign(p, !0), s.assign(h, v), d && i.mergeEvaluated(d, e.Name);
          });
        });
      }
    }
  };
  return Gr.default = n, Gr;
}
var Qr = {}, co;
function bl() {
  if (co) return Qr;
  co = 1, Object.defineProperty(Qr, "__esModule", { value: !0 });
  const e = te(), t = {
    keyword: "allOf",
    schemaType: "array",
    code(r) {
      const { gen: n, schema: i, it: s } = r;
      if (!Array.isArray(i))
        throw new Error("ajv implementation error");
      const c = n.name("valid");
      i.forEach((a, f) => {
        if ((0, e.alwaysValidSchema)(s, a))
          return;
        const _ = r.subschema({ keyword: "allOf", schemaProp: f }, c);
        r.ok(c), r.mergeEvaluated(_);
      });
    }
  };
  return Qr.default = t, Qr;
}
var Br = {}, uo;
function wl() {
  if (uo) return Br;
  uo = 1, Object.defineProperty(Br, "__esModule", { value: !0 });
  const e = Y(), t = te(), n = {
    keyword: "if",
    schemaType: ["object", "boolean"],
    trackErrors: !0,
    error: {
      message: ({ params: s }) => (0, e.str)`must match "${s.ifClause}" schema`,
      params: ({ params: s }) => (0, e._)`{failingKeyword: ${s.ifClause}}`
    },
    code(s) {
      const { gen: c, parentSchema: a, it: f } = s;
      a.then === void 0 && a.else === void 0 && (0, t.checkStrictMode)(f, '"if" without "then" and "else" is ignored');
      const _ = i(f, "then"), p = i(f, "else");
      if (!_ && !p)
        return;
      const h = c.let("valid", !0), b = c.name("_valid");
      if (w(), s.reset(), _ && p) {
        const v = c.let("ifClause");
        s.setParams({ ifClause: v }), c.if(b, S("then", v), S("else", v));
      } else _ ? c.if(b, S("then")) : c.if((0, e.not)(b), S("else"));
      s.pass(h, () => s.error(!0));
      function w() {
        const v = s.subschema({
          keyword: "if",
          compositeRule: !0,
          createErrors: !1,
          allErrors: !1
        }, b);
        s.mergeEvaluated(v);
      }
      function S(v, d) {
        return () => {
          const u = s.subschema({ keyword: v }, b);
          c.assign(h, b), s.mergeValidEvaluated(u, h), d ? c.assign(d, (0, e._)`${v}`) : s.setParams({ ifClause: v });
        };
      }
    }
  };
  function i(s, c) {
    const a = s.schema[c];
    return a !== void 0 && !(0, t.alwaysValidSchema)(s, a);
  }
  return Br.default = n, Br;
}
var Yr = {}, lo;
function El() {
  if (lo) return Yr;
  lo = 1, Object.defineProperty(Yr, "__esModule", { value: !0 });
  const e = te(), t = {
    keyword: ["then", "else"],
    schemaType: ["object", "boolean"],
    code({ keyword: r, parentSchema: n, it: i }) {
      n.if === void 0 && (0, e.checkStrictMode)(i, `"${r}" without "if" is ignored`);
    }
  };
  return Yr.default = t, Yr;
}
var fo;
function Sl() {
  if (fo) return Vr;
  fo = 1, Object.defineProperty(Vr, "__esModule", { value: !0 });
  const e = Oa(), t = fl(), r = Na(), n = dl(), i = hl(), s = pl(), c = ml(), a = Pa(), f = yl(), _ = _l(), p = gl(), h = vl(), b = $l(), w = bl(), S = wl(), v = El();
  function d(u = !1) {
    const o = [
      // any
      p.default,
      h.default,
      b.default,
      w.default,
      S.default,
      v.default,
      // object
      c.default,
      a.default,
      s.default,
      f.default,
      _.default
    ];
    return u ? o.push(t.default, n.default) : o.push(e.default, r.default), o.push(i.default), o;
  }
  return Vr.default = d, Vr;
}
var Xr = {}, Zr = {}, ho;
function Rl() {
  if (ho) return Zr;
  ho = 1, Object.defineProperty(Zr, "__esModule", { value: !0 });
  const e = Y(), r = {
    keyword: "format",
    type: ["number", "string"],
    schemaType: "string",
    $data: !0,
    error: {
      message: ({ schemaCode: n }) => (0, e.str)`must match format "${n}"`,
      params: ({ schemaCode: n }) => (0, e._)`{format: ${n}}`
    },
    code(n, i) {
      const { gen: s, data: c, $data: a, schema: f, schemaCode: _, it: p } = n, { opts: h, errSchemaPath: b, schemaEnv: w, self: S } = p;
      if (!h.validateFormats)
        return;
      a ? v() : d();
      function v() {
        const u = s.scopeValue("formats", {
          ref: S.formats,
          code: h.code.formats
        }), o = s.const("fDef", (0, e._)`${u}[${_}]`), l = s.let("fType"), m = s.let("format");
        s.if((0, e._)`typeof ${o} == "object" && !(${o} instanceof RegExp)`, () => s.assign(l, (0, e._)`${o}.type || "string"`).assign(m, (0, e._)`${o}.validate`), () => s.assign(l, (0, e._)`"string"`).assign(m, o)), n.fail$data((0, e.or)($(), g()));
        function $() {
          return h.strictSchema === !1 ? e.nil : (0, e._)`${_} && !${m}`;
        }
        function g() {
          const E = w.$async ? (0, e._)`(${o}.async ? await ${m}(${c}) : ${m}(${c}))` : (0, e._)`${m}(${c})`, P = (0, e._)`(typeof ${m} == "function" ? ${E} : ${m}.test(${c}))`;
          return (0, e._)`${m} && ${m} !== true && ${l} === ${i} && !${P}`;
        }
      }
      function d() {
        const u = S.formats[f];
        if (!u) {
          $();
          return;
        }
        if (u === !0)
          return;
        const [o, l, m] = g(u);
        o === i && n.pass(E());
        function $() {
          if (h.strictSchema === !1) {
            S.logger.warn(P());
            return;
          }
          throw new Error(P());
          function P() {
            return `unknown format "${f}" ignored in schema at path "${b}"`;
          }
        }
        function g(P) {
          const D = P instanceof RegExp ? (0, e.regexpCode)(P) : h.code.formats ? (0, e._)`${h.code.formats}${(0, e.getProperty)(f)}` : void 0, V = s.scopeValue("formats", { key: f, ref: P, code: D });
          return typeof P == "object" && !(P instanceof RegExp) ? [P.type || "string", P.validate, (0, e._)`${V}.validate`] : ["string", P, V];
        }
        function E() {
          if (typeof u == "object" && !(u instanceof RegExp) && u.async) {
            if (!w.$async)
              throw new Error("async format in sync schema");
            return (0, e._)`await ${m}(${c})`;
          }
          return typeof l == "function" ? (0, e._)`${m}(${c})` : (0, e._)`${m}.test(${c})`;
        }
      }
    }
  };
  return Zr.default = r, Zr;
}
var po;
function Ol() {
  if (po) return Xr;
  po = 1, Object.defineProperty(Xr, "__esModule", { value: !0 });
  const t = [Rl().default];
  return Xr.default = t, Xr;
}
var _t = {}, mo;
function Nl() {
  return mo || (mo = 1, Object.defineProperty(_t, "__esModule", { value: !0 }), _t.contentVocabulary = _t.metadataVocabulary = void 0, _t.metadataVocabulary = [
    "title",
    "description",
    "default",
    "deprecated",
    "readOnly",
    "writeOnly",
    "examples"
  ], _t.contentVocabulary = [
    "contentMediaType",
    "contentEncoding",
    "contentSchema"
  ]), _t;
}
var yo;
function Pl() {
  if (yo) return wr;
  yo = 1, Object.defineProperty(wr, "__esModule", { value: !0 });
  const e = Xu(), t = ll(), r = Sl(), n = Ol(), i = Nl(), s = [
    e.default,
    t.default,
    (0, r.default)(),
    n.default,
    i.metadataVocabulary,
    i.contentVocabulary
  ];
  return wr.default = s, wr;
}
var en = {}, Qt = {}, _o;
function jl() {
  if (_o) return Qt;
  _o = 1, Object.defineProperty(Qt, "__esModule", { value: !0 }), Qt.DiscrError = void 0;
  var e;
  return function(t) {
    t.Tag = "tag", t.Mapping = "mapping";
  }(e || (Qt.DiscrError = e = {})), Qt;
}
var go;
function Tl() {
  if (go) return en;
  go = 1, Object.defineProperty(en, "__esModule", { value: !0 });
  const e = Y(), t = jl(), r = Ms(), n = Pn(), i = te(), c = {
    keyword: "discriminator",
    type: "object",
    schemaType: "object",
    error: {
      message: ({ params: { discrError: a, tagName: f } }) => a === t.DiscrError.Tag ? `tag "${f}" must be string` : `value of tag "${f}" must be in oneOf`,
      params: ({ params: { discrError: a, tag: f, tagName: _ } }) => (0, e._)`{error: ${a}, tag: ${_}, tagValue: ${f}}`
    },
    code(a) {
      const { gen: f, data: _, schema: p, parentSchema: h, it: b } = a, { oneOf: w } = h;
      if (!b.opts.discriminator)
        throw new Error("discriminator: requires discriminator option");
      const S = p.propertyName;
      if (typeof S != "string")
        throw new Error("discriminator: requires propertyName");
      if (p.mapping)
        throw new Error("discriminator: mapping is not supported");
      if (!w)
        throw new Error("discriminator: requires oneOf keyword");
      const v = f.let("valid", !1), d = f.const("tag", (0, e._)`${_}${(0, e.getProperty)(S)}`);
      f.if((0, e._)`typeof ${d} == "string"`, () => u(), () => a.error(!1, { discrError: t.DiscrError.Tag, tag: d, tagName: S })), a.ok(v);
      function u() {
        const m = l();
        f.if(!1);
        for (const $ in m)
          f.elseIf((0, e._)`${d} === ${$}`), f.assign(v, o(m[$]));
        f.else(), a.error(!1, { discrError: t.DiscrError.Mapping, tag: d, tagName: S }), f.endIf();
      }
      function o(m) {
        const $ = f.name("valid"), g = a.subschema({ keyword: "oneOf", schemaProp: m }, $);
        return a.mergeEvaluated(g, e.Name), $;
      }
      function l() {
        var m;
        const $ = {}, g = P(h);
        let E = !0;
        for (let F = 0; F < w.length; F++) {
          let K = w[F];
          if (K != null && K.$ref && !(0, i.schemaHasRulesButRef)(K, b.self.RULES)) {
            const J = K.$ref;
            if (K = r.resolveRef.call(b.self, b.schemaEnv.root, b.baseId, J), K instanceof r.SchemaEnv && (K = K.schema), K === void 0)
              throw new n.default(b.opts.uriResolver, b.baseId, J);
          }
          const L = (m = K == null ? void 0 : K.properties) === null || m === void 0 ? void 0 : m[S];
          if (typeof L != "object")
            throw new Error(`discriminator: oneOf subschemas (or referenced schemas) must have "properties/${S}"`);
          E = E && (g || P(K)), D(L, F);
        }
        if (!E)
          throw new Error(`discriminator: "${S}" must be required`);
        return $;
        function P({ required: F }) {
          return Array.isArray(F) && F.includes(S);
        }
        function D(F, K) {
          if (F.const)
            V(F.const, K);
          else if (F.enum)
            for (const L of F.enum)
              V(L, K);
          else
            throw new Error(`discriminator: "properties/${S}" must have "const" or "enum"`);
        }
        function V(F, K) {
          if (typeof F != "string" || F in $)
            throw new Error(`discriminator: "${S}" values must be unique strings`);
          $[F] = K;
        }
      }
    }
  };
  return en.default = c, en;
}
const Cl = "http://json-schema.org/draft-07/schema#", Il = "http://json-schema.org/draft-07/schema#", kl = "Core schema meta-schema", Dl = { schemaArray: { type: "array", minItems: 1, items: { $ref: "#" } }, nonNegativeInteger: { type: "integer", minimum: 0 }, nonNegativeIntegerDefault0: { allOf: [{ $ref: "#/definitions/nonNegativeInteger" }, { default: 0 }] }, simpleTypes: { enum: ["array", "boolean", "integer", "null", "number", "object", "string"] }, stringArray: { type: "array", items: { type: "string" }, uniqueItems: !0, default: [] } }, ql = ["object", "boolean"], Al = { $id: { type: "string", format: "uri-reference" }, $schema: { type: "string", format: "uri" }, $ref: { type: "string", format: "uri-reference" }, $comment: { type: "string" }, title: { type: "string" }, description: { type: "string" }, default: !0, readOnly: { type: "boolean", default: !1 }, examples: { type: "array", items: !0 }, multipleOf: { type: "number", exclusiveMinimum: 0 }, maximum: { type: "number" }, exclusiveMaximum: { type: "number" }, minimum: { type: "number" }, exclusiveMinimum: { type: "number" }, maxLength: { $ref: "#/definitions/nonNegativeInteger" }, minLength: { $ref: "#/definitions/nonNegativeIntegerDefault0" }, pattern: { type: "string", format: "regex" }, additionalItems: { $ref: "#" }, items: { anyOf: [{ $ref: "#" }, { $ref: "#/definitions/schemaArray" }], default: !0 }, maxItems: { $ref: "#/definitions/nonNegativeInteger" }, minItems: { $ref: "#/definitions/nonNegativeIntegerDefault0" }, uniqueItems: { type: "boolean", default: !1 }, contains: { $ref: "#" }, maxProperties: { $ref: "#/definitions/nonNegativeInteger" }, minProperties: { $ref: "#/definitions/nonNegativeIntegerDefault0" }, required: { $ref: "#/definitions/stringArray" }, additionalProperties: { $ref: "#" }, definitions: { type: "object", additionalProperties: { $ref: "#" }, default: {} }, properties: { type: "object", additionalProperties: { $ref: "#" }, default: {} }, patternProperties: { type: "object", additionalProperties: { $ref: "#" }, propertyNames: { format: "regex" }, default: {} }, dependencies: { type: "object", additionalProperties: { anyOf: [{ $ref: "#" }, { $ref: "#/definitions/stringArray" }] } }, propertyNames: { $ref: "#" }, const: !0, enum: { type: "array", items: !0, minItems: 1, uniqueItems: !0 }, type: { anyOf: [{ $ref: "#/definitions/simpleTypes" }, { type: "array", items: { $ref: "#/definitions/simpleTypes" }, minItems: 1, uniqueItems: !0 }] }, format: { type: "string" }, contentMediaType: { type: "string" }, contentEncoding: { type: "string" }, if: { $ref: "#" }, then: { $ref: "#" }, else: { $ref: "#" }, allOf: { $ref: "#/definitions/schemaArray" }, anyOf: { $ref: "#/definitions/schemaArray" }, oneOf: { $ref: "#/definitions/schemaArray" }, not: { $ref: "#" } }, Ml = {
  $schema: Cl,
  $id: Il,
  title: kl,
  definitions: Dl,
  type: ql,
  properties: Al,
  default: !0
};
var vo;
function Vl() {
  return vo || (vo = 1, function(e, t) {
    Object.defineProperty(t, "__esModule", { value: !0 }), t.MissingRefError = t.ValidationError = t.CodeGen = t.Name = t.nil = t.stringify = t.str = t._ = t.KeywordCxt = t.Ajv = void 0;
    const r = Qu(), n = Pl(), i = Tl(), s = Ml, c = ["/properties"], a = "http://json-schema.org/draft-07/schema";
    class f extends r.default {
      _addVocabularies() {
        super._addVocabularies(), n.default.forEach((S) => this.addVocabulary(S)), this.opts.discriminator && this.addKeyword(i.default);
      }
      _addDefaultMetaSchema() {
        if (super._addDefaultMetaSchema(), !this.opts.meta)
          return;
        const S = this.opts.$data ? this.$dataMetaSchema(s, c) : s;
        this.addMetaSchema(S, a, !1), this.refs["http://json-schema.org/schema"] = a;
      }
      defaultMeta() {
        return this.opts.defaultMeta = super.defaultMeta() || (this.getSchema(a) ? a : void 0);
      }
    }
    t.Ajv = f, e.exports = t = f, e.exports.Ajv = f, Object.defineProperty(t, "__esModule", { value: !0 }), t.default = f;
    var _ = Nn();
    Object.defineProperty(t, "KeywordCxt", { enumerable: !0, get: function() {
      return _.KeywordCxt;
    } });
    var p = Y();
    Object.defineProperty(t, "_", { enumerable: !0, get: function() {
      return p._;
    } }), Object.defineProperty(t, "str", { enumerable: !0, get: function() {
      return p.str;
    } }), Object.defineProperty(t, "stringify", { enumerable: !0, get: function() {
      return p.stringify;
    } }), Object.defineProperty(t, "nil", { enumerable: !0, get: function() {
      return p.nil;
    } }), Object.defineProperty(t, "Name", { enumerable: !0, get: function() {
      return p.Name;
    } }), Object.defineProperty(t, "CodeGen", { enumerable: !0, get: function() {
      return p.CodeGen;
    } });
    var h = As();
    Object.defineProperty(t, "ValidationError", { enumerable: !0, get: function() {
      return h.default;
    } });
    var b = Pn();
    Object.defineProperty(t, "MissingRefError", { enumerable: !0, get: function() {
      return b.default;
    } });
  }(_r, _r.exports)), _r.exports;
}
Vl();
globalThis.process && process.env;
const Fl = /\{[^{}]+\}/g, Ul = () => {
  var e, t;
  return typeof process == "object" && Number.parseInt((t = (e = process == null ? void 0 : process.versions) == null ? void 0 : e.node) == null ? void 0 : t.substring(0, 2)) >= 18 && process.versions.undici;
};
function Ll() {
  return Math.random().toString(36).slice(2, 11);
}
function zl(e) {
  let {
    baseUrl: t = "",
    Request: r = globalThis.Request,
    fetch: n = globalThis.fetch,
    querySerializer: i,
    bodySerializer: s,
    headers: c,
    requestInitExt: a = void 0,
    ...f
  } = { ...e };
  a = Ul() ? a : void 0, t = wo(t);
  const _ = [];
  async function p(h, b) {
    const {
      baseUrl: w,
      fetch: S = n,
      Request: v = r,
      headers: d,
      params: u = {},
      parseAs: o = "json",
      querySerializer: l,
      bodySerializer: m = s ?? Hl,
      body: $,
      ...g
    } = b || {};
    let E = t;
    w && (E = wo(w) ?? t);
    let P = typeof i == "function" ? i : $o(i);
    l && (P = typeof l == "function" ? l : $o({
      ...typeof i == "object" ? i : {},
      ...l
    }));
    const D = $ === void 0 ? void 0 : m(
      $,
      // Note: we declare mergeHeaders() both here and below because it’s a bit of a chicken-or-egg situation:
      // bodySerializer() needs all headers so we aren’t dropping ones set by the user, however,
      // the result of this ALSO sets the lowest-priority content-type header. So we re-merge below,
      // setting the content-type at the very beginning to be overwritten.
      // Lastly, based on the way headers work, it’s not a simple “present-or-not” check becauase null intentionally un-sets headers.
      bo(c, d, u.header)
    ), V = bo(
      // with no body, we should not to set Content-Type
      D === void 0 || // if serialized body is FormData; browser will correctly set Content-Type & boundary expression
      D instanceof FormData ? {} : {
        "Content-Type": "application/json"
      },
      c,
      d,
      u.header
    ), F = {
      redirect: "follow",
      ...f,
      ...g,
      body: D,
      headers: V
    };
    let K, L, J = new r(
      xl(h, { baseUrl: E, params: u, querySerializer: P }),
      F
    ), B;
    for (const ce in g)
      ce in J || (J[ce] = g[ce]);
    if (_.length) {
      K = Ll(), L = Object.freeze({
        baseUrl: E,
        fetch: S,
        parseAs: o,
        querySerializer: P,
        bodySerializer: m
      });
      for (const ce of _)
        if (ce && typeof ce == "object" && typeof ce.onRequest == "function") {
          const x = await ce.onRequest({
            request: J,
            schemaPath: h,
            params: u,
            options: L,
            id: K
          });
          if (x)
            if (x instanceof r)
              J = x;
            else if (x instanceof Response) {
              B = x;
              break;
            } else
              throw new Error("onRequest: must return new Request() or Response() when modifying the request");
        }
    }
    if (!B) {
      try {
        B = await S(J, a);
      } catch (ce) {
        let x = ce;
        if (_.length)
          for (let me = _.length - 1; me >= 0; me--) {
            const A = _[me];
            if (A && typeof A == "object" && typeof A.onError == "function") {
              const N = await A.onError({
                request: J,
                error: x,
                schemaPath: h,
                params: u,
                options: L,
                id: K
              });
              if (N) {
                if (N instanceof Response) {
                  x = void 0, B = N;
                  break;
                }
                if (N instanceof Error) {
                  x = N;
                  continue;
                }
                throw new Error("onError: must return new Response() or instance of Error");
              }
            }
          }
        if (x)
          throw x;
      }
      if (_.length)
        for (let ce = _.length - 1; ce >= 0; ce--) {
          const x = _[ce];
          if (x && typeof x == "object" && typeof x.onResponse == "function") {
            const me = await x.onResponse({
              request: J,
              response: B,
              schemaPath: h,
              params: u,
              options: L,
              id: K
            });
            if (me) {
              if (!(me instanceof Response))
                throw new Error("onResponse: must return new Response() when modifying the response");
              B = me;
            }
          }
        }
    }
    if (B.status === 204 || J.method === "HEAD" || B.headers.get("Content-Length") === "0")
      return B.ok ? { data: void 0, response: B } : { error: void 0, response: B };
    if (B.ok)
      return o === "stream" ? { data: B.body, response: B } : { data: await B[o](), response: B };
    let we = await B.text();
    try {
      we = JSON.parse(we);
    } catch {
    }
    return { error: we, response: B };
  }
  return {
    request(h, b, w) {
      return p(b, { ...w, method: h.toUpperCase() });
    },
    /** Call a GET endpoint */
    GET(h, b) {
      return p(h, { ...b, method: "GET" });
    },
    /** Call a PUT endpoint */
    PUT(h, b) {
      return p(h, { ...b, method: "PUT" });
    },
    /** Call a POST endpoint */
    POST(h, b) {
      return p(h, { ...b, method: "POST" });
    },
    /** Call a DELETE endpoint */
    DELETE(h, b) {
      return p(h, { ...b, method: "DELETE" });
    },
    /** Call a OPTIONS endpoint */
    OPTIONS(h, b) {
      return p(h, { ...b, method: "OPTIONS" });
    },
    /** Call a HEAD endpoint */
    HEAD(h, b) {
      return p(h, { ...b, method: "HEAD" });
    },
    /** Call a PATCH endpoint */
    PATCH(h, b) {
      return p(h, { ...b, method: "PATCH" });
    },
    /** Call a TRACE endpoint */
    TRACE(h, b) {
      return p(h, { ...b, method: "TRACE" });
    },
    /** Register middleware */
    use(...h) {
      for (const b of h)
        if (b) {
          if (typeof b != "object" || !("onRequest" in b || "onResponse" in b || "onError" in b))
            throw new Error("Middleware must be an object with one of `onRequest()`, `onResponse() or `onError()`");
          _.push(b);
        }
    },
    /** Unregister middleware */
    eject(...h) {
      for (const b of h) {
        const w = _.indexOf(b);
        w !== -1 && _.splice(w, 1);
      }
    }
  };
}
function jn(e, t, r) {
  if (t == null)
    return "";
  if (typeof t == "object")
    throw new Error(
      "Deeply-nested arrays/objects aren’t supported. Provide your own `querySerializer()` to handle these."
    );
  return `${e}=${(r == null ? void 0 : r.allowReserved) === !0 ? t : encodeURIComponent(t)}`;
}
function ja(e, t, r) {
  if (!t || typeof t != "object")
    return "";
  const n = [], i = {
    simple: ",",
    label: ".",
    matrix: ";"
  }[r.style] || "&";
  if (r.style !== "deepObject" && r.explode === !1) {
    for (const a in t)
      n.push(a, r.allowReserved === !0 ? t[a] : encodeURIComponent(t[a]));
    const c = n.join(",");
    switch (r.style) {
      case "form":
        return `${e}=${c}`;
      case "label":
        return `.${c}`;
      case "matrix":
        return `;${e}=${c}`;
      default:
        return c;
    }
  }
  for (const c in t) {
    const a = r.style === "deepObject" ? `${e}[${c}]` : c;
    n.push(jn(a, t[c], r));
  }
  const s = n.join(i);
  return r.style === "label" || r.style === "matrix" ? `${i}${s}` : s;
}
function Ta(e, t, r) {
  if (!Array.isArray(t))
    return "";
  if (r.explode === !1) {
    const s = { form: ",", spaceDelimited: "%20", pipeDelimited: "|" }[r.style] || ",", c = (r.allowReserved === !0 ? t : t.map((a) => encodeURIComponent(a))).join(s);
    switch (r.style) {
      case "simple":
        return c;
      case "label":
        return `.${c}`;
      case "matrix":
        return `;${e}=${c}`;
      // case "spaceDelimited":
      // case "pipeDelimited":
      default:
        return `${e}=${c}`;
    }
  }
  const n = { simple: ",", label: ".", matrix: ";" }[r.style] || "&", i = [];
  for (const s of t)
    r.style === "simple" || r.style === "label" ? i.push(r.allowReserved === !0 ? s : encodeURIComponent(s)) : i.push(jn(e, s, r));
  return r.style === "label" || r.style === "matrix" ? `${n}${i.join(n)}` : i.join(n);
}
function $o(e) {
  return function(r) {
    const n = [];
    if (r && typeof r == "object")
      for (const i in r) {
        const s = r[i];
        if (s != null) {
          if (Array.isArray(s)) {
            if (s.length === 0)
              continue;
            n.push(
              Ta(i, s, {
                style: "form",
                explode: !0,
                ...e == null ? void 0 : e.array,
                allowReserved: (e == null ? void 0 : e.allowReserved) || !1
              })
            );
            continue;
          }
          if (typeof s == "object") {
            n.push(
              ja(i, s, {
                style: "deepObject",
                explode: !0,
                ...e == null ? void 0 : e.object,
                allowReserved: (e == null ? void 0 : e.allowReserved) || !1
              })
            );
            continue;
          }
          n.push(jn(i, s, e));
        }
      }
    return n.join("&");
  };
}
function Kl(e, t) {
  let r = e;
  for (const n of e.match(Fl) ?? []) {
    let i = n.substring(1, n.length - 1), s = !1, c = "simple";
    if (i.endsWith("*") && (s = !0, i = i.substring(0, i.length - 1)), i.startsWith(".") ? (c = "label", i = i.substring(1)) : i.startsWith(";") && (c = "matrix", i = i.substring(1)), !t || t[i] === void 0 || t[i] === null)
      continue;
    const a = t[i];
    if (Array.isArray(a)) {
      r = r.replace(n, Ta(i, a, { style: c, explode: s }));
      continue;
    }
    if (typeof a == "object") {
      r = r.replace(n, ja(i, a, { style: c, explode: s }));
      continue;
    }
    if (c === "matrix") {
      r = r.replace(n, `;${jn(i, a)}`);
      continue;
    }
    r = r.replace(n, c === "label" ? `.${encodeURIComponent(a)}` : encodeURIComponent(a));
  }
  return r;
}
function Hl(e, t) {
  return e instanceof FormData ? e : t && (t.get instanceof Function ? t.get("Content-Type") ?? t.get("content-type") : t["Content-Type"] ?? t["content-type"]) === "application/x-www-form-urlencoded" ? new URLSearchParams(e).toString() : JSON.stringify(e);
}
function xl(e, t) {
  var i;
  let r = `${t.baseUrl}${e}`;
  (i = t.params) != null && i.path && (r = Kl(r, t.params.path));
  let n = t.querySerializer(t.params.query ?? {});
  return n.startsWith("?") && (n = n.substring(1)), n && (r += `?${n}`), r;
}
function bo(...e) {
  const t = new Headers();
  for (const r of e) {
    if (!r || typeof r != "object")
      continue;
    const n = r instanceof Headers ? r.entries() : Object.entries(r);
    for (const [i, s] of n)
      if (s === null)
        t.delete(i);
      else if (Array.isArray(s))
        for (const c of s)
          t.append(i, c);
      else s !== void 0 && t.set(i, s);
  }
  return t;
}
function wo(e) {
  return e.endsWith("/") ? e.substring(0, e.length - 1) : e;
}
const Jl = (e) => {
  let t = "http", r = "localhost:3000";
  return typeof document < "u" && (t = document.location.protocol, r = document.location.host.split(".").slice(-2).join(".")), zl({
    baseUrl: `${t}//${e}.${r}`,
    credentials: "include",
    fetch: (n) => {
      var s;
      const i = (s = document.cookie.split("; ").find((c) => c.startsWith("_csrf_token="))) == null ? void 0 : s.split("=")[1];
      return i && n.headers.set("X-CSRF-Token", i), fetch(n);
    }
  });
};
class Zn extends Error {
  constructor(r, n) {
    super("Network error caught by Tanstack");
    kn(this, "status");
    kn(this, "code");
    this.status = r, this.code = n;
  }
}
const Ca = async (e) => {
  let t;
  try {
    t = await e;
  } catch {
    throw new Zn(0, "Network error");
  }
  if (t.error !== void 0)
    throw new Zn(t.response.status, t.error.code);
  if (t.data === void 0) {
    if (t.response.status === 204)
      return;
    throw new Zn(t.response.status, "No data returned");
  }
  return t.data;
}, Ia = Jl("caller");
function Wl() {
  return Tu({
    queryKey: ["cron", "jobs"],
    queryFn: () => Ca(Ia.GET("/cron/jobs", {}))
  });
}
function Gl() {
  const e = qs();
  return Cu({
    mutationFn: (t) => Ca(Ia.PUT("/cron/jobs/settings", { body: t })),
    onSuccess: () => {
      e.invalidateQueries({ queryKey: ["cron", "jobs"] });
    }
  });
}
const Ql = { key: 1 }, Bl = {
  key: 4,
  class: "text-body-1"
}, Xl = /* @__PURE__ */ Fc({
  __name: "CronJobsPage",
  setup(e) {
    const t = dc(null), r = [
      { title: "Job Name", key: "jobName", sortable: !0 },
      { title: "Status", key: "enabled", sortable: !0 },
      { title: "Last Run Status", key: "lastRunStatus", sortable: !0 },
      { title: "Last Run At", key: "lastRunAt", sortable: !0 },
      { title: "Created At", key: "createdAt", sortable: !0 },
      { title: "Updated At", key: "updatedAt", sortable: !0 },
      { title: "Actions", key: "actions", sortable: !1 }
    ], {
      data: n,
      isLoading: i,
      error: s
    } = Wl(), {
      mutate: c,
      isPending: a,
      error: f
    } = Gl(), _ = (b, w) => {
      t.value = b, c(
        { jobName: b, enabled: w },
        {
          onSettled: () => {
            t.value = null;
          }
        }
      );
    }, p = (b) => {
      if (!b) return "N/A";
      try {
        return new Intl.DateTimeFormat(void 0, {
          dateStyle: "medium",
          timeStyle: "short"
        }).format(new Date(b));
      } catch (w) {
        return console.error("Error formatting date:", w), b;
      }
    }, h = (b) => {
      switch (b) {
        case "success":
          return "success";
        case "fail":
          return "error";
        case "running":
          return "info";
        case "timed out":
          return "warning";
        default:
          return "grey";
      }
    };
    return (b, w) => {
      const S = et("v-progress-linear"), v = et("v-alert"), d = et("v-chip"), u = et("v-btn"), o = et("v-data-table"), l = et("v-col"), m = et("v-row"), $ = et("v-container");
      return Ge(), vt($, null, {
        default: _e(() => [
          $t(m, null, {
            default: _e(() => [
              $t(l, null, {
                default: _e(() => [
                  w[1] || (w[1] = Cs("h1", { class: "text-h4 mb-4" }, "Cron Jobs", -1)),
                  Te(i) ? (Ge(), vt(S, {
                    key: 0,
                    indeterminate: ""
                  })) : yr("", !0),
                  Te(s) ? (Ge(), vt(v, {
                    key: 1,
                    type: "error",
                    class: "mb-4"
                  }, {
                    default: _e(() => [
                      Qe(" Error loading cron jobs: " + Je(Te(s).message), 1)
                    ]),
                    _: 1
                  })) : yr("", !0),
                  Te(f) ? (Ge(), vt(v, {
                    key: 2,
                    type: "error",
                    class: "mb-4"
                  }, {
                    default: _e(() => [
                      Qe(" Error updating cron job: " + Je(Te(f).message), 1)
                    ]),
                    _: 1
                  })) : yr("", !0),
                  Te(n) && Te(n).length > 0 ? (Ge(), vt(o, {
                    key: 3,
                    headers: r,
                    items: Te(n),
                    "item-value": "jobName",
                    class: "elevation-1"
                  }, {
                    "item.enabled": _e(({ item: g }) => [
                      $t(d, {
                        color: g.enabled ? "success" : "error"
                      }, {
                        default: _e(() => [
                          Qe(Je(g.enabled ? "Enabled" : "Disabled"), 1)
                        ]),
                        _: 2
                      }, 1032, ["color"])
                    ]),
                    "item.lastRunStatus": _e(({ item: g }) => [
                      g.lastRunStatus ? (Ge(), vt(d, {
                        key: 0,
                        color: h(g.lastRunStatus)
                      }, {
                        default: _e(() => [
                          Qe(Je(g.lastRunStatus), 1)
                        ]),
                        _: 2
                      }, 1032, ["color"])) : (Ge(), Bs("span", Ql, "N/A"))
                    ]),
                    "item.lastRunAt": _e(({ item: g }) => [
                      Qe(Je(p(g.lastRunAt)), 1)
                    ]),
                    "item.createdAt": _e(({ item: g }) => [
                      Qe(Je(p(g.createdAt)), 1)
                    ]),
                    "item.updatedAt": _e(({ item: g }) => [
                      Qe(Je(p(g.updatedAt)), 1)
                    ]),
                    "item.actions": _e(({ item: g }) => [
                      $t(u, {
                        size: "small",
                        loading: Te(a) && t.value === g.jobName,
                        disabled: Te(a),
                        onClick: (E) => _(g.jobName, !g.enabled)
                      }, {
                        default: _e(() => [
                          Qe(Je(g.enabled ? "Disable" : "Enable"), 1)
                        ]),
                        _: 2
                      }, 1032, ["loading", "disabled", "onClick"])
                    ]),
                    bottom: _e(() => w[0] || (w[0] = [])),
                    _: 2
                  }, 1032, ["items"])) : !Te(i) && !Te(s) ? (Ge(), Bs("p", Bl, " No cron jobs found. ")) : yr("", !0)
                ]),
                _: 1,
                __: [1]
              })
            ]),
            _: 1
          })
        ]),
        _: 1
      });
    };
  }
});
export {
  Xl as CronJobsPage
};
