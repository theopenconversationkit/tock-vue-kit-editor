import { pushScopeId as Dn, popScopeId as Cn, defineComponent as X, nextTick as At, openBlock as m, createBlock as q, createElementBlock as k, normalizeClass as Q, renderSlot as pt, normalizeProps as On, guardReactiveProps as An, withScopeId as En, resolveComponent as Pe, normalizeStyle as Ve, withKeys as zn, createElementVNode as w, Fragment as K, createCommentVNode as z, mergeProps as Eo, withCtx as gt, createVNode as Vt, ref as Y, createApp as Pn, h as $n, toDisplayString as U, effectScope as zo, markRaw as Se, toRaw as He, watch as Zt, unref as d, hasInjectionContext as Yn, inject as Gn, getCurrentInstance as Po, reactive as Rn, isRef as Te, isReactive as Bt, toRef as St, computed as $o, getCurrentScope as Wn, onScopeDispose as Vn, toRefs as to, renderList as le, createTextVNode as fe, onMounted as Xe, onBeforeUnmount as Zn, resolveDirective as Mt, withDirectives as Z, withModifiers as Bn, vModelCheckbox as Yo, vModelRadio as oo } from "vue";
import { reload as Fn, updateTvkOption as Un, getTvkCurrentOptions as ht, getTvkDefaultOptions as ft, addTvkMessage as no } from "tock-vue-kit";
const Hn = ["top", "right", "bottom", "left"], io = ["start", "end"], so = /* @__PURE__ */ Hn.reduce((e, t) => e.concat(t, t + "-" + io[0], t + "-" + io[1]), []), Le = Math.min, xe = Math.max, Qn = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
}, Jn = {
  start: "end",
  end: "start"
};
function Et(e, t, o) {
  return xe(e, Le(t, o));
}
function Ce(e, t) {
  return typeof e == "function" ? e(t) : e;
}
function ge(e) {
  return e.split("-")[0];
}
function re(e) {
  return e.split("-")[1];
}
function Go(e) {
  return e === "x" ? "y" : "x";
}
function Ft(e) {
  return e === "y" ? "height" : "width";
}
function et(e) {
  return ["top", "bottom"].includes(ge(e)) ? "y" : "x";
}
function Ut(e) {
  return Go(et(e));
}
function Ro(e, t, o) {
  o === void 0 && (o = !1);
  const n = re(e), i = Ut(e), s = Ft(i);
  let r = i === "x" ? n === (o ? "end" : "start") ? "right" : "left" : n === "start" ? "bottom" : "top";
  return t.reference[s] > t.floating[s] && (r = vt(r)), [r, vt(r)];
}
function qn(e) {
  const t = vt(e);
  return [mt(e), t, mt(t)];
}
function mt(e) {
  return e.replace(/start|end/g, (t) => Jn[t]);
}
function Kn(e, t, o) {
  const n = ["left", "right"], i = ["right", "left"], s = ["top", "bottom"], r = ["bottom", "top"];
  switch (e) {
    case "top":
    case "bottom":
      return o ? t ? i : n : t ? n : i;
    case "left":
    case "right":
      return t ? s : r;
    default:
      return [];
  }
}
function Xn(e, t, o, n) {
  const i = re(e);
  let s = Kn(ge(e), o === "start", n);
  return i && (s = s.map((r) => r + "-" + i), t && (s = s.concat(s.map(mt)))), s;
}
function vt(e) {
  return e.replace(/left|right|bottom|top/g, (t) => Qn[t]);
}
function ei(e) {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    ...e
  };
}
function Wo(e) {
  return typeof e != "number" ? ei(e) : {
    top: e,
    right: e,
    bottom: e,
    left: e
  };
}
function Ze(e) {
  const {
    x: t,
    y: o,
    width: n,
    height: i
  } = e;
  return {
    width: n,
    height: i,
    top: o,
    left: t,
    right: t + n,
    bottom: o + i,
    x: t,
    y: o
  };
}
function ro(e, t, o) {
  let {
    reference: n,
    floating: i
  } = e;
  const s = et(t), r = Ut(t), a = Ft(r), l = ge(t), c = s === "y", u = n.x + n.width / 2 - i.width / 2, _ = n.y + n.height / 2 - i.height / 2, f = n[a] / 2 - i[a] / 2;
  let v;
  switch (l) {
    case "top":
      v = {
        x: u,
        y: n.y - i.height
      };
      break;
    case "bottom":
      v = {
        x: u,
        y: n.y + n.height
      };
      break;
    case "right":
      v = {
        x: n.x + n.width,
        y: _
      };
      break;
    case "left":
      v = {
        x: n.x - i.width,
        y: _
      };
      break;
    default:
      v = {
        x: n.x,
        y: n.y
      };
  }
  switch (re(t)) {
    case "start":
      v[r] -= f * (o && c ? -1 : 1);
      break;
    case "end":
      v[r] += f * (o && c ? -1 : 1);
      break;
  }
  return v;
}
const ti = async (e, t, o) => {
  const {
    placement: n = "bottom",
    strategy: i = "absolute",
    middleware: s = [],
    platform: r
  } = o, a = s.filter(Boolean), l = await (r.isRTL == null ? void 0 : r.isRTL(t));
  let c = await r.getElementRects({
    reference: e,
    floating: t,
    strategy: i
  }), {
    x: u,
    y: _
  } = ro(c, n, l), f = n, v = {}, I = 0;
  for (let T = 0; T < a.length; T++) {
    const {
      name: D,
      fn: C
    } = a[T], {
      x: O,
      y: N,
      data: S,
      reset: M
    } = await C({
      x: u,
      y: _,
      initialPlacement: n,
      placement: f,
      strategy: i,
      middlewareData: v,
      rects: c,
      platform: r,
      elements: {
        reference: e,
        floating: t
      }
    });
    u = O ?? u, _ = N ?? _, v = {
      ...v,
      [D]: {
        ...v[D],
        ...S
      }
    }, M && I <= 50 && (I++, typeof M == "object" && (M.placement && (f = M.placement), M.rects && (c = M.rects === !0 ? await r.getElementRects({
      reference: e,
      floating: t,
      strategy: i
    }) : M.rects), {
      x: u,
      y: _
    } = ro(c, f, l)), T = -1);
  }
  return {
    x: u,
    y: _,
    placement: f,
    strategy: i,
    middlewareData: v
  };
};
async function kt(e, t) {
  var o;
  t === void 0 && (t = {});
  const {
    x: n,
    y: i,
    platform: s,
    rects: r,
    elements: a,
    strategy: l
  } = e, {
    boundary: c = "clippingAncestors",
    rootBoundary: u = "viewport",
    elementContext: _ = "floating",
    altBoundary: f = !1,
    padding: v = 0
  } = Ce(t, e), I = Wo(v), D = a[f ? _ === "floating" ? "reference" : "floating" : _], C = Ze(await s.getClippingRect({
    element: (o = await (s.isElement == null ? void 0 : s.isElement(D))) == null || o ? D : D.contextElement || await (s.getDocumentElement == null ? void 0 : s.getDocumentElement(a.floating)),
    boundary: c,
    rootBoundary: u,
    strategy: l
  })), O = _ === "floating" ? {
    x: n,
    y: i,
    width: r.floating.width,
    height: r.floating.height
  } : r.reference, N = await (s.getOffsetParent == null ? void 0 : s.getOffsetParent(a.floating)), S = await (s.isElement == null ? void 0 : s.isElement(N)) ? await (s.getScale == null ? void 0 : s.getScale(N)) || {
    x: 1,
    y: 1
  } : {
    x: 1,
    y: 1
  }, M = Ze(s.convertOffsetParentRelativeRectToViewportRelativeRect ? await s.convertOffsetParentRelativeRectToViewportRelativeRect({
    elements: a,
    rect: O,
    offsetParent: N,
    strategy: l
  }) : O);
  return {
    top: (C.top - M.top + I.top) / S.y,
    bottom: (M.bottom - C.bottom + I.bottom) / S.y,
    left: (C.left - M.left + I.left) / S.x,
    right: (M.right - C.right + I.right) / S.x
  };
}
const oi = (e) => ({
  name: "arrow",
  options: e,
  async fn(t) {
    const {
      x: o,
      y: n,
      placement: i,
      rects: s,
      platform: r,
      elements: a,
      middlewareData: l
    } = t, {
      element: c,
      padding: u = 0
    } = Ce(e, t) || {};
    if (c == null)
      return {};
    const _ = Wo(u), f = {
      x: o,
      y: n
    }, v = Ut(i), I = Ft(v), T = await r.getDimensions(c), D = v === "y", C = D ? "top" : "left", O = D ? "bottom" : "right", N = D ? "clientHeight" : "clientWidth", S = s.reference[I] + s.reference[v] - f[v] - s.floating[I], M = f[v] - s.reference[v], h = await (r.getOffsetParent == null ? void 0 : r.getOffsetParent(c));
    let y = h ? h[N] : 0;
    (!y || !await (r.isElement == null ? void 0 : r.isElement(h))) && (y = a.floating[N] || s.floating[I]);
    const E = S / 2 - M / 2, j = y / 2 - T[I] / 2 - 1, g = Le(_[C], j), b = Le(_[O], j), p = g, x = y - T[I] - b, A = y / 2 - T[I] / 2 + E, L = Et(p, A, x), P = !l.arrow && re(i) != null && A !== L && s.reference[I] / 2 - (A < p ? g : b) - T[I] / 2 < 0, R = P ? A < p ? A - p : A - x : 0;
    return {
      [v]: f[v] + R,
      data: {
        [v]: L,
        centerOffset: A - L - R,
        ...P && {
          alignmentOffset: R
        }
      },
      reset: P
    };
  }
});
function ni(e, t, o) {
  return (e ? [...o.filter((i) => re(i) === e), ...o.filter((i) => re(i) !== e)] : o.filter((i) => ge(i) === i)).filter((i) => e ? re(i) === e || (t ? mt(i) !== i : !1) : !0);
}
const ii = function(e) {
  return e === void 0 && (e = {}), {
    name: "autoPlacement",
    options: e,
    async fn(t) {
      var o, n, i;
      const {
        rects: s,
        middlewareData: r,
        placement: a,
        platform: l,
        elements: c
      } = t, {
        crossAxis: u = !1,
        alignment: _,
        allowedPlacements: f = so,
        autoAlignment: v = !0,
        ...I
      } = Ce(e, t), T = _ !== void 0 || f === so ? ni(_ || null, v, f) : f, D = await kt(t, I), C = ((o = r.autoPlacement) == null ? void 0 : o.index) || 0, O = T[C];
      if (O == null)
        return {};
      const N = Ro(O, s, await (l.isRTL == null ? void 0 : l.isRTL(c.floating)));
      if (a !== O)
        return {
          reset: {
            placement: T[0]
          }
        };
      const S = [D[ge(O)], D[N[0]], D[N[1]]], M = [...((n = r.autoPlacement) == null ? void 0 : n.overflows) || [], {
        placement: O,
        overflows: S
      }], h = T[C + 1];
      if (h)
        return {
          data: {
            index: C + 1,
            overflows: M
          },
          reset: {
            placement: h
          }
        };
      const y = M.map((g) => {
        const b = re(g.placement);
        return [g.placement, b && u ? (
          // Check along the mainAxis and main crossAxis side.
          g.overflows.slice(0, 2).reduce((p, x) => p + x, 0)
        ) : (
          // Check only the mainAxis.
          g.overflows[0]
        ), g.overflows];
      }).sort((g, b) => g[1] - b[1]), j = ((i = y.filter((g) => g[2].slice(
        0,
        // Aligned placements should not check their opposite crossAxis
        // side.
        re(g[0]) ? 2 : 3
      ).every((b) => b <= 0))[0]) == null ? void 0 : i[0]) || y[0][0];
      return j !== a ? {
        data: {
          index: C + 1,
          overflows: M
        },
        reset: {
          placement: j
        }
      } : {};
    }
  };
}, si = function(e) {
  return e === void 0 && (e = {}), {
    name: "flip",
    options: e,
    async fn(t) {
      var o, n;
      const {
        placement: i,
        middlewareData: s,
        rects: r,
        initialPlacement: a,
        platform: l,
        elements: c
      } = t, {
        mainAxis: u = !0,
        crossAxis: _ = !0,
        fallbackPlacements: f,
        fallbackStrategy: v = "bestFit",
        fallbackAxisSideDirection: I = "none",
        flipAlignment: T = !0,
        ...D
      } = Ce(e, t);
      if ((o = s.arrow) != null && o.alignmentOffset)
        return {};
      const C = ge(i), O = ge(a) === a, N = await (l.isRTL == null ? void 0 : l.isRTL(c.floating)), S = f || (O || !T ? [vt(a)] : qn(a));
      !f && I !== "none" && S.push(...Xn(a, T, I, N));
      const M = [a, ...S], h = await kt(t, D), y = [];
      let E = ((n = s.flip) == null ? void 0 : n.overflows) || [];
      if (u && y.push(h[C]), _) {
        const p = Ro(i, r, N);
        y.push(h[p[0]], h[p[1]]);
      }
      if (E = [...E, {
        placement: i,
        overflows: y
      }], !y.every((p) => p <= 0)) {
        var j, g;
        const p = (((j = s.flip) == null ? void 0 : j.index) || 0) + 1, x = M[p];
        if (x)
          return {
            data: {
              index: p,
              overflows: E
            },
            reset: {
              placement: x
            }
          };
        let A = (g = E.filter((L) => L.overflows[0] <= 0).sort((L, P) => L.overflows[1] - P.overflows[1])[0]) == null ? void 0 : g.placement;
        if (!A)
          switch (v) {
            case "bestFit": {
              var b;
              const L = (b = E.map((P) => [P.placement, P.overflows.filter((R) => R > 0).reduce((R, te) => R + te, 0)]).sort((P, R) => P[1] - R[1])[0]) == null ? void 0 : b[0];
              L && (A = L);
              break;
            }
            case "initialPlacement":
              A = a;
              break;
          }
        if (i !== A)
          return {
            reset: {
              placement: A
            }
          };
      }
      return {};
    }
  };
};
async function ri(e, t) {
  const {
    placement: o,
    platform: n,
    elements: i
  } = e, s = await (n.isRTL == null ? void 0 : n.isRTL(i.floating)), r = ge(o), a = re(o), l = et(o) === "y", c = ["left", "top"].includes(r) ? -1 : 1, u = s && l ? -1 : 1, _ = Ce(t, e);
  let {
    mainAxis: f,
    crossAxis: v,
    alignmentAxis: I
  } = typeof _ == "number" ? {
    mainAxis: _,
    crossAxis: 0,
    alignmentAxis: null
  } : {
    mainAxis: 0,
    crossAxis: 0,
    alignmentAxis: null,
    ..._
  };
  return a && typeof I == "number" && (v = a === "end" ? I * -1 : I), l ? {
    x: v * u,
    y: f * c
  } : {
    x: f * c,
    y: v * u
  };
}
const ai = function(e) {
  return e === void 0 && (e = 0), {
    name: "offset",
    options: e,
    async fn(t) {
      var o, n;
      const {
        x: i,
        y: s,
        placement: r,
        middlewareData: a
      } = t, l = await ri(t, e);
      return r === ((o = a.offset) == null ? void 0 : o.placement) && (n = a.arrow) != null && n.alignmentOffset ? {} : {
        x: i + l.x,
        y: s + l.y,
        data: {
          ...l,
          placement: r
        }
      };
    }
  };
}, li = function(e) {
  return e === void 0 && (e = {}), {
    name: "shift",
    options: e,
    async fn(t) {
      const {
        x: o,
        y: n,
        placement: i
      } = t, {
        mainAxis: s = !0,
        crossAxis: r = !1,
        limiter: a = {
          fn: (D) => {
            let {
              x: C,
              y: O
            } = D;
            return {
              x: C,
              y: O
            };
          }
        },
        ...l
      } = Ce(e, t), c = {
        x: o,
        y: n
      }, u = await kt(t, l), _ = et(ge(i)), f = Go(_);
      let v = c[f], I = c[_];
      if (s) {
        const D = f === "y" ? "top" : "left", C = f === "y" ? "bottom" : "right", O = v + u[D], N = v - u[C];
        v = Et(O, v, N);
      }
      if (r) {
        const D = _ === "y" ? "top" : "left", C = _ === "y" ? "bottom" : "right", O = I + u[D], N = I - u[C];
        I = Et(O, I, N);
      }
      const T = a.fn({
        ...t,
        [f]: v,
        [_]: I
      });
      return {
        ...T,
        data: {
          x: T.x - o,
          y: T.y - n
        }
      };
    }
  };
}, ci = function(e) {
  return e === void 0 && (e = {}), {
    name: "size",
    options: e,
    async fn(t) {
      const {
        placement: o,
        rects: n,
        platform: i,
        elements: s
      } = t, {
        apply: r = () => {
        },
        ...a
      } = Ce(e, t), l = await kt(t, a), c = ge(o), u = re(o), _ = et(o) === "y", {
        width: f,
        height: v
      } = n.floating;
      let I, T;
      c === "top" || c === "bottom" ? (I = c, T = u === (await (i.isRTL == null ? void 0 : i.isRTL(s.floating)) ? "start" : "end") ? "left" : "right") : (T = c, I = u === "end" ? "top" : "bottom");
      const D = v - l.top - l.bottom, C = f - l.left - l.right, O = Le(v - l[I], D), N = Le(f - l[T], C), S = !t.middlewareData.shift;
      let M = O, h = N;
      if (_ ? h = u || S ? Le(N, C) : C : M = u || S ? Le(O, D) : D, S && !u) {
        const E = xe(l.left, 0), j = xe(l.right, 0), g = xe(l.top, 0), b = xe(l.bottom, 0);
        _ ? h = f - 2 * (E !== 0 || j !== 0 ? E + j : xe(l.left, l.right)) : M = v - 2 * (g !== 0 || b !== 0 ? g + b : xe(l.top, l.bottom));
      }
      await r({
        ...t,
        availableWidth: h,
        availableHeight: M
      });
      const y = await i.getDimensions(s.floating);
      return f !== y.width || v !== y.height ? {
        reset: {
          rects: !0
        }
      } : {};
    }
  };
};
function ne(e) {
  var t;
  return ((t = e.ownerDocument) == null ? void 0 : t.defaultView) || window;
}
function ue(e) {
  return ne(e).getComputedStyle(e);
}
const ao = Math.min, Be = Math.max, _t = Math.round;
function Vo(e) {
  const t = ue(e);
  let o = parseFloat(t.width), n = parseFloat(t.height);
  const i = e.offsetWidth, s = e.offsetHeight, r = _t(o) !== i || _t(n) !== s;
  return r && (o = i, n = s), { width: o, height: n, fallback: r };
}
function ke(e) {
  return Bo(e) ? (e.nodeName || "").toLowerCase() : "";
}
let tt;
function Zo() {
  if (tt) return tt;
  const e = navigator.userAgentData;
  return e && Array.isArray(e.brands) ? (tt = e.brands.map((t) => t.brand + "/" + t.version).join(" "), tt) : navigator.userAgent;
}
function de(e) {
  return e instanceof ne(e).HTMLElement;
}
function we(e) {
  return e instanceof ne(e).Element;
}
function Bo(e) {
  return e instanceof ne(e).Node;
}
function lo(e) {
  return typeof ShadowRoot > "u" ? !1 : e instanceof ne(e).ShadowRoot || e instanceof ShadowRoot;
}
function It(e) {
  const { overflow: t, overflowX: o, overflowY: n, display: i } = ue(e);
  return /auto|scroll|overlay|hidden|clip/.test(t + n + o) && !["inline", "contents"].includes(i);
}
function ui(e) {
  return ["table", "td", "th"].includes(ke(e));
}
function zt(e) {
  const t = /firefox/i.test(Zo()), o = ue(e), n = o.backdropFilter || o.WebkitBackdropFilter;
  return o.transform !== "none" || o.perspective !== "none" || !!n && n !== "none" || t && o.willChange === "filter" || t && !!o.filter && o.filter !== "none" || ["transform", "perspective"].some((i) => o.willChange.includes(i)) || ["paint", "layout", "strict", "content"].some((i) => {
    const s = o.contain;
    return s != null && s.includes(i);
  });
}
function Fo() {
  return !/^((?!chrome|android).)*safari/i.test(Zo());
}
function Ht(e) {
  return ["html", "body", "#document"].includes(ke(e));
}
function Uo(e) {
  return we(e) ? e : e.contextElement;
}
const Ho = { x: 1, y: 1 };
function ze(e) {
  const t = Uo(e);
  if (!de(t)) return Ho;
  const o = t.getBoundingClientRect(), { width: n, height: i, fallback: s } = Vo(t);
  let r = (s ? _t(o.width) : o.width) / n, a = (s ? _t(o.height) : o.height) / i;
  return r && Number.isFinite(r) || (r = 1), a && Number.isFinite(a) || (a = 1), { x: r, y: a };
}
function Qe(e, t, o, n) {
  var i, s;
  t === void 0 && (t = !1), o === void 0 && (o = !1);
  const r = e.getBoundingClientRect(), a = Uo(e);
  let l = Ho;
  t && (n ? we(n) && (l = ze(n)) : l = ze(e));
  const c = a ? ne(a) : window, u = !Fo() && o;
  let _ = (r.left + (u && ((i = c.visualViewport) == null ? void 0 : i.offsetLeft) || 0)) / l.x, f = (r.top + (u && ((s = c.visualViewport) == null ? void 0 : s.offsetTop) || 0)) / l.y, v = r.width / l.x, I = r.height / l.y;
  if (a) {
    const T = ne(a), D = n && we(n) ? ne(n) : n;
    let C = T.frameElement;
    for (; C && n && D !== T; ) {
      const O = ze(C), N = C.getBoundingClientRect(), S = getComputedStyle(C);
      N.x += (C.clientLeft + parseFloat(S.paddingLeft)) * O.x, N.y += (C.clientTop + parseFloat(S.paddingTop)) * O.y, _ *= O.x, f *= O.y, v *= O.x, I *= O.y, _ += N.x, f += N.y, C = ne(C).frameElement;
    }
  }
  return { width: v, height: I, top: f, right: _ + v, bottom: f + I, left: _, x: _, y: f };
}
function Me(e) {
  return ((Bo(e) ? e.ownerDocument : e.document) || window.document).documentElement;
}
function xt(e) {
  return we(e) ? { scrollLeft: e.scrollLeft, scrollTop: e.scrollTop } : { scrollLeft: e.pageXOffset, scrollTop: e.pageYOffset };
}
function Qo(e) {
  return Qe(Me(e)).left + xt(e).scrollLeft;
}
function Je(e) {
  if (ke(e) === "html") return e;
  const t = e.assignedSlot || e.parentNode || lo(e) && e.host || Me(e);
  return lo(t) ? t.host : t;
}
function Jo(e) {
  const t = Je(e);
  return Ht(t) ? t.ownerDocument.body : de(t) && It(t) ? t : Jo(t);
}
function yt(e, t) {
  var o;
  t === void 0 && (t = []);
  const n = Jo(e), i = n === ((o = e.ownerDocument) == null ? void 0 : o.body), s = ne(n);
  return i ? t.concat(s, s.visualViewport || [], It(n) ? n : []) : t.concat(n, yt(n));
}
function co(e, t, o) {
  return t === "viewport" ? Ze(function(n, i) {
    const s = ne(n), r = Me(n), a = s.visualViewport;
    let l = r.clientWidth, c = r.clientHeight, u = 0, _ = 0;
    if (a) {
      l = a.width, c = a.height;
      const f = Fo();
      (f || !f && i === "fixed") && (u = a.offsetLeft, _ = a.offsetTop);
    }
    return { width: l, height: c, x: u, y: _ };
  }(e, o)) : we(t) ? Ze(function(n, i) {
    const s = Qe(n, !0, i === "fixed"), r = s.top + n.clientTop, a = s.left + n.clientLeft, l = de(n) ? ze(n) : { x: 1, y: 1 };
    return { width: n.clientWidth * l.x, height: n.clientHeight * l.y, x: a * l.x, y: r * l.y };
  }(t, o)) : Ze(function(n) {
    const i = Me(n), s = xt(n), r = n.ownerDocument.body, a = Be(i.scrollWidth, i.clientWidth, r.scrollWidth, r.clientWidth), l = Be(i.scrollHeight, i.clientHeight, r.scrollHeight, r.clientHeight);
    let c = -s.scrollLeft + Qo(n);
    const u = -s.scrollTop;
    return ue(r).direction === "rtl" && (c += Be(i.clientWidth, r.clientWidth) - a), { width: a, height: l, x: c, y: u };
  }(Me(e)));
}
function uo(e) {
  return de(e) && ue(e).position !== "fixed" ? e.offsetParent : null;
}
function po(e) {
  const t = ne(e);
  let o = uo(e);
  for (; o && ui(o) && ue(o).position === "static"; ) o = uo(o);
  return o && (ke(o) === "html" || ke(o) === "body" && ue(o).position === "static" && !zt(o)) ? t : o || function(n) {
    let i = Je(n);
    for (; de(i) && !Ht(i); ) {
      if (zt(i)) return i;
      i = Je(i);
    }
    return null;
  }(e) || t;
}
function di(e, t, o) {
  const n = de(t), i = Me(t), s = Qe(e, !0, o === "fixed", t);
  let r = { scrollLeft: 0, scrollTop: 0 };
  const a = { x: 0, y: 0 };
  if (n || !n && o !== "fixed") if ((ke(t) !== "body" || It(i)) && (r = xt(t)), de(t)) {
    const l = Qe(t, !0);
    a.x = l.x + t.clientLeft, a.y = l.y + t.clientTop;
  } else i && (a.x = Qo(i));
  return { x: s.left + r.scrollLeft - a.x, y: s.top + r.scrollTop - a.y, width: s.width, height: s.height };
}
const pi = { getClippingRect: function(e) {
  let { element: t, boundary: o, rootBoundary: n, strategy: i } = e;
  const s = o === "clippingAncestors" ? function(c, u) {
    const _ = u.get(c);
    if (_) return _;
    let f = yt(c).filter((D) => we(D) && ke(D) !== "body"), v = null;
    const I = ue(c).position === "fixed";
    let T = I ? Je(c) : c;
    for (; we(T) && !Ht(T); ) {
      const D = ue(T), C = zt(T);
      (I ? C || v : C || D.position !== "static" || !v || !["absolute", "fixed"].includes(v.position)) ? v = D : f = f.filter((O) => O !== T), T = Je(T);
    }
    return u.set(c, f), f;
  }(t, this._c) : [].concat(o), r = [...s, n], a = r[0], l = r.reduce((c, u) => {
    const _ = co(t, u, i);
    return c.top = Be(_.top, c.top), c.right = ao(_.right, c.right), c.bottom = ao(_.bottom, c.bottom), c.left = Be(_.left, c.left), c;
  }, co(t, a, i));
  return { width: l.right - l.left, height: l.bottom - l.top, x: l.left, y: l.top };
}, convertOffsetParentRelativeRectToViewportRelativeRect: function(e) {
  let { rect: t, offsetParent: o, strategy: n } = e;
  const i = de(o), s = Me(o);
  if (o === s) return t;
  let r = { scrollLeft: 0, scrollTop: 0 }, a = { x: 1, y: 1 };
  const l = { x: 0, y: 0 };
  if ((i || !i && n !== "fixed") && ((ke(o) !== "body" || It(s)) && (r = xt(o)), de(o))) {
    const c = Qe(o);
    a = ze(o), l.x = c.x + o.clientLeft, l.y = c.y + o.clientTop;
  }
  return { width: t.width * a.x, height: t.height * a.y, x: t.x * a.x - r.scrollLeft * a.x + l.x, y: t.y * a.y - r.scrollTop * a.y + l.y };
}, isElement: we, getDimensions: function(e) {
  return de(e) ? Vo(e) : e.getBoundingClientRect();
}, getOffsetParent: po, getDocumentElement: Me, getScale: ze, async getElementRects(e) {
  let { reference: t, floating: o, strategy: n } = e;
  const i = this.getOffsetParent || po, s = this.getDimensions;
  return { reference: di(t, await i(o), n), floating: { x: 0, y: 0, ...await s(o) } };
}, getClientRects: (e) => Array.from(e.getClientRects()), isRTL: (e) => ue(e).direction === "rtl" }, gi = (e, t, o) => {
  const n = /* @__PURE__ */ new Map(), i = { platform: pi, ...o }, s = { ...i.platform, _c: n };
  return ti(e, t, { ...i, platform: s });
};
function qo(e, t) {
  for (const o in t)
    Object.prototype.hasOwnProperty.call(t, o) && (typeof t[o] == "object" && e[o] ? qo(e[o], t[o]) : e[o] = t[o]);
}
const ae = {
  // Disable popper components
  disabled: !1,
  // Default position offset along main axis (px)
  distance: 5,
  // Default position offset along cross axis (px)
  skidding: 0,
  // Default container where the tooltip will be appended
  container: "body",
  // Element used to compute position and size boundaries
  boundary: void 0,
  // Skip delay & CSS transitions when another popper is shown, so that the popper appear to instanly move to the new position.
  instantMove: !1,
  // Auto destroy tooltip DOM nodes (ms)
  disposeTimeout: 150,
  // Triggers on the popper itself
  popperTriggers: [],
  // Positioning strategy
  strategy: "absolute",
  // Prevent overflow
  preventOverflow: !0,
  // Flip to the opposite placement if needed
  flip: !0,
  // Shift on the cross axis to prevent the popper from overflowing
  shift: !0,
  // Overflow padding (px)
  overflowPadding: 0,
  // Arrow padding (px)
  arrowPadding: 0,
  // Compute arrow overflow (useful to hide it)
  arrowOverflow: !0,
  /**
   * By default, compute autohide on 'click'.
   */
  autoHideOnMousedown: !1,
  // Themes
  themes: {
    tooltip: {
      // Default tooltip placement relative to target element
      placement: "top",
      // Default events that trigger the tooltip
      triggers: ["hover", "focus", "touch"],
      // Close tooltip on click on tooltip target
      hideTriggers: (e) => [...e, "click"],
      // Delay (ms)
      delay: {
        show: 200,
        hide: 0
      },
      // Update popper on content resize
      handleResize: !1,
      // Enable HTML content in directive
      html: !1,
      // Displayed when tooltip content is loading
      loadingContent: "..."
    },
    dropdown: {
      // Default dropdown placement relative to target element
      placement: "bottom",
      // Default events that trigger the dropdown
      triggers: ["click"],
      // Delay (ms)
      delay: 0,
      // Update popper on content resize
      handleResize: !0,
      // Hide on clock outside
      autoHide: !0
    },
    menu: {
      $extend: "dropdown",
      triggers: ["hover", "focus"],
      popperTriggers: ["hover"],
      delay: {
        show: 0,
        hide: 400
      }
    }
  }
};
function qe(e, t) {
  let o = ae.themes[e] || {}, n;
  do
    n = o[t], typeof n > "u" ? o.$extend ? o = ae.themes[o.$extend] || {} : (o = null, n = ae[t]) : o = null;
  while (o);
  return n;
}
function hi(e) {
  const t = [e];
  let o = ae.themes[e] || {};
  do
    o.$extend && !o.$resetCss ? (t.push(o.$extend), o = ae.themes[o.$extend] || {}) : o = null;
  while (o);
  return t.map((n) => `v-popper--theme-${n}`);
}
function go(e) {
  const t = [e];
  let o = ae.themes[e] || {};
  do
    o.$extend ? (t.push(o.$extend), o = ae.themes[o.$extend] || {}) : o = null;
  while (o);
  return t;
}
let $e = !1;
if (typeof window < "u") {
  $e = !1;
  try {
    const e = Object.defineProperty({}, "passive", {
      get() {
        $e = !0;
      }
    });
    window.addEventListener("test", null, e);
  } catch {
  }
}
let Ko = !1;
typeof window < "u" && typeof navigator < "u" && (Ko = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream);
const Xo = ["auto", "top", "bottom", "left", "right"].reduce((e, t) => e.concat([
  t,
  `${t}-start`,
  `${t}-end`
]), []), ho = {
  hover: "mouseenter",
  focus: "focus",
  click: "click",
  touch: "touchstart",
  pointer: "pointerdown"
}, fo = {
  hover: "mouseleave",
  focus: "blur",
  click: "click",
  touch: "touchend",
  pointer: "pointerup"
};
function mo(e, t) {
  const o = e.indexOf(t);
  o !== -1 && e.splice(o, 1);
}
function Lt() {
  return new Promise((e) => requestAnimationFrame(() => {
    requestAnimationFrame(e);
  }));
}
const se = [];
let Ie = null;
const vo = {};
function _o(e) {
  let t = vo[e];
  return t || (t = vo[e] = []), t;
}
let Pt = function() {
};
typeof window < "u" && (Pt = window.Element);
function $(e) {
  return function(t) {
    return qe(t.theme, e);
  };
}
const Tt = "__floating-vue__popper", en = () => X({
  name: "VPopper",
  provide() {
    return {
      [Tt]: {
        parentPopper: this
      }
    };
  },
  inject: {
    [Tt]: { default: null }
  },
  props: {
    theme: {
      type: String,
      required: !0
    },
    targetNodes: {
      type: Function,
      required: !0
    },
    referenceNode: {
      type: Function,
      default: null
    },
    popperNode: {
      type: Function,
      required: !0
    },
    shown: {
      type: Boolean,
      default: !1
    },
    showGroup: {
      type: String,
      default: null
    },
    // eslint-disable-next-line vue/require-prop-types
    ariaId: {
      default: null
    },
    disabled: {
      type: Boolean,
      default: $("disabled")
    },
    positioningDisabled: {
      type: Boolean,
      default: $("positioningDisabled")
    },
    placement: {
      type: String,
      default: $("placement"),
      validator: (e) => Xo.includes(e)
    },
    delay: {
      type: [String, Number, Object],
      default: $("delay")
    },
    distance: {
      type: [Number, String],
      default: $("distance")
    },
    skidding: {
      type: [Number, String],
      default: $("skidding")
    },
    triggers: {
      type: Array,
      default: $("triggers")
    },
    showTriggers: {
      type: [Array, Function],
      default: $("showTriggers")
    },
    hideTriggers: {
      type: [Array, Function],
      default: $("hideTriggers")
    },
    popperTriggers: {
      type: Array,
      default: $("popperTriggers")
    },
    popperShowTriggers: {
      type: [Array, Function],
      default: $("popperShowTriggers")
    },
    popperHideTriggers: {
      type: [Array, Function],
      default: $("popperHideTriggers")
    },
    container: {
      type: [String, Object, Pt, Boolean],
      default: $("container")
    },
    boundary: {
      type: [String, Pt],
      default: $("boundary")
    },
    strategy: {
      type: String,
      validator: (e) => ["absolute", "fixed"].includes(e),
      default: $("strategy")
    },
    autoHide: {
      type: [Boolean, Function],
      default: $("autoHide")
    },
    handleResize: {
      type: Boolean,
      default: $("handleResize")
    },
    instantMove: {
      type: Boolean,
      default: $("instantMove")
    },
    eagerMount: {
      type: Boolean,
      default: $("eagerMount")
    },
    popperClass: {
      type: [String, Array, Object],
      default: $("popperClass")
    },
    computeTransformOrigin: {
      type: Boolean,
      default: $("computeTransformOrigin")
    },
    /**
     * @deprecated
     */
    autoMinSize: {
      type: Boolean,
      default: $("autoMinSize")
    },
    autoSize: {
      type: [Boolean, String],
      default: $("autoSize")
    },
    /**
     * @deprecated
     */
    autoMaxSize: {
      type: Boolean,
      default: $("autoMaxSize")
    },
    autoBoundaryMaxSize: {
      type: Boolean,
      default: $("autoBoundaryMaxSize")
    },
    preventOverflow: {
      type: Boolean,
      default: $("preventOverflow")
    },
    overflowPadding: {
      type: [Number, String],
      default: $("overflowPadding")
    },
    arrowPadding: {
      type: [Number, String],
      default: $("arrowPadding")
    },
    arrowOverflow: {
      type: Boolean,
      default: $("arrowOverflow")
    },
    flip: {
      type: Boolean,
      default: $("flip")
    },
    shift: {
      type: Boolean,
      default: $("shift")
    },
    shiftCrossAxis: {
      type: Boolean,
      default: $("shiftCrossAxis")
    },
    noAutoFocus: {
      type: Boolean,
      default: $("noAutoFocus")
    },
    disposeTimeout: {
      type: Number,
      default: $("disposeTimeout")
    }
  },
  emits: {
    show: () => !0,
    hide: () => !0,
    "update:shown": (e) => !0,
    "apply-show": () => !0,
    "apply-hide": () => !0,
    "close-group": () => !0,
    "close-directive": () => !0,
    "auto-hide": () => !0,
    resize: () => !0
  },
  data() {
    return {
      isShown: !1,
      isMounted: !1,
      skipTransition: !1,
      classes: {
        showFrom: !1,
        showTo: !1,
        hideFrom: !1,
        hideTo: !0
      },
      result: {
        x: 0,
        y: 0,
        placement: "",
        strategy: this.strategy,
        arrow: {
          x: 0,
          y: 0,
          centerOffset: 0
        },
        transformOrigin: null
      },
      randomId: `popper_${[Math.random(), Date.now()].map((e) => e.toString(36).substring(2, 10)).join("_")}`,
      shownChildren: /* @__PURE__ */ new Set(),
      lastAutoHide: !0,
      pendingHide: !1,
      containsGlobalTarget: !1,
      isDisposed: !0,
      mouseDownContains: !1
    };
  },
  computed: {
    popperId() {
      return this.ariaId != null ? this.ariaId : this.randomId;
    },
    shouldMountContent() {
      return this.eagerMount || this.isMounted;
    },
    slotData() {
      return {
        popperId: this.popperId,
        isShown: this.isShown,
        shouldMountContent: this.shouldMountContent,
        skipTransition: this.skipTransition,
        autoHide: typeof this.autoHide == "function" ? this.lastAutoHide : this.autoHide,
        show: this.show,
        hide: this.hide,
        handleResize: this.handleResize,
        onResize: this.onResize,
        classes: {
          ...this.classes,
          popperClass: this.popperClass
        },
        result: this.positioningDisabled ? null : this.result,
        attrs: this.$attrs
      };
    },
    parentPopper() {
      var e;
      return (e = this[Tt]) == null ? void 0 : e.parentPopper;
    },
    hasPopperShowTriggerHover() {
      var e, t;
      return ((e = this.popperTriggers) == null ? void 0 : e.includes("hover")) || ((t = this.popperShowTriggers) == null ? void 0 : t.includes("hover"));
    }
  },
  watch: {
    shown: "$_autoShowHide",
    disabled(e) {
      e ? this.dispose() : this.init();
    },
    async container() {
      this.isShown && (this.$_ensureTeleport(), await this.$_computePosition());
    },
    triggers: {
      handler: "$_refreshListeners",
      deep: !0
    },
    positioningDisabled: "$_refreshListeners",
    ...[
      "placement",
      "distance",
      "skidding",
      "boundary",
      "strategy",
      "overflowPadding",
      "arrowPadding",
      "preventOverflow",
      "shift",
      "shiftCrossAxis",
      "flip"
    ].reduce((e, t) => (e[t] = "$_computePosition", e), {})
  },
  created() {
    this.autoMinSize && console.warn('[floating-vue] `autoMinSize` option is deprecated. Use `autoSize="min"` instead.'), this.autoMaxSize && console.warn("[floating-vue] `autoMaxSize` option is deprecated. Use `autoBoundaryMaxSize` instead.");
  },
  mounted() {
    this.init(), this.$_detachPopperNode();
  },
  activated() {
    this.$_autoShowHide();
  },
  deactivated() {
    this.hide();
  },
  beforeUnmount() {
    this.dispose();
  },
  methods: {
    show({ event: e = null, skipDelay: t = !1, force: o = !1 } = {}) {
      var n, i;
      (n = this.parentPopper) != null && n.lockedChild && this.parentPopper.lockedChild !== this || (this.pendingHide = !1, (o || !this.disabled) && (((i = this.parentPopper) == null ? void 0 : i.lockedChild) === this && (this.parentPopper.lockedChild = null), this.$_scheduleShow(e, t), this.$emit("show"), this.$_showFrameLocked = !0, requestAnimationFrame(() => {
        this.$_showFrameLocked = !1;
      })), this.$emit("update:shown", !0));
    },
    hide({ event: e = null, skipDelay: t = !1 } = {}) {
      var o;
      if (!this.$_hideInProgress) {
        if (this.shownChildren.size > 0) {
          this.pendingHide = !0;
          return;
        }
        if (this.hasPopperShowTriggerHover && this.$_isAimingPopper()) {
          this.parentPopper && (this.parentPopper.lockedChild = this, clearTimeout(this.parentPopper.lockedChildTimer), this.parentPopper.lockedChildTimer = setTimeout(() => {
            this.parentPopper.lockedChild === this && (this.parentPopper.lockedChild.hide({ skipDelay: t }), this.parentPopper.lockedChild = null);
          }, 1e3));
          return;
        }
        ((o = this.parentPopper) == null ? void 0 : o.lockedChild) === this && (this.parentPopper.lockedChild = null), this.pendingHide = !1, this.$_scheduleHide(e, t), this.$emit("hide"), this.$emit("update:shown", !1);
      }
    },
    init() {
      var e;
      this.isDisposed && (this.isDisposed = !1, this.isMounted = !1, this.$_events = [], this.$_preventShow = !1, this.$_referenceNode = ((e = this.referenceNode) == null ? void 0 : e.call(this)) ?? this.$el, this.$_targetNodes = this.targetNodes().filter((t) => t.nodeType === t.ELEMENT_NODE), this.$_popperNode = this.popperNode(), this.$_innerNode = this.$_popperNode.querySelector(".v-popper__inner"), this.$_arrowNode = this.$_popperNode.querySelector(".v-popper__arrow-container"), this.$_swapTargetAttrs("title", "data-original-title"), this.$_detachPopperNode(), this.triggers.length && this.$_addEventListeners(), this.shown && this.show());
    },
    dispose() {
      this.isDisposed || (this.isDisposed = !0, this.$_removeEventListeners(), this.hide({ skipDelay: !0 }), this.$_detachPopperNode(), this.isMounted = !1, this.isShown = !1, this.$_updateParentShownChildren(!1), this.$_swapTargetAttrs("data-original-title", "title"));
    },
    async onResize() {
      this.isShown && (await this.$_computePosition(), this.$emit("resize"));
    },
    async $_computePosition() {
      if (this.isDisposed || this.positioningDisabled)
        return;
      const e = {
        strategy: this.strategy,
        middleware: []
      };
      (this.distance || this.skidding) && e.middleware.push(ai({
        mainAxis: this.distance,
        crossAxis: this.skidding
      }));
      const t = this.placement.startsWith("auto");
      if (t ? e.middleware.push(ii({
        alignment: this.placement.split("-")[1] ?? ""
      })) : e.placement = this.placement, this.preventOverflow && (this.shift && e.middleware.push(li({
        padding: this.overflowPadding,
        boundary: this.boundary,
        crossAxis: this.shiftCrossAxis
      })), !t && this.flip && e.middleware.push(si({
        padding: this.overflowPadding,
        boundary: this.boundary
      }))), e.middleware.push(oi({
        element: this.$_arrowNode,
        padding: this.arrowPadding
      })), this.arrowOverflow && e.middleware.push({
        name: "arrowOverflow",
        fn: ({ placement: n, rects: i, middlewareData: s }) => {
          let r;
          const { centerOffset: a } = s.arrow;
          return n.startsWith("top") || n.startsWith("bottom") ? r = Math.abs(a) > i.reference.width / 2 : r = Math.abs(a) > i.reference.height / 2, {
            data: {
              overflow: r
            }
          };
        }
      }), this.autoMinSize || this.autoSize) {
        const n = this.autoSize ? this.autoSize : this.autoMinSize ? "min" : null;
        e.middleware.push({
          name: "autoSize",
          fn: ({ rects: i, placement: s, middlewareData: r }) => {
            var a;
            if ((a = r.autoSize) != null && a.skip)
              return {};
            let l, c;
            return s.startsWith("top") || s.startsWith("bottom") ? l = i.reference.width : c = i.reference.height, this.$_innerNode.style[n === "min" ? "minWidth" : n === "max" ? "maxWidth" : "width"] = l != null ? `${l}px` : null, this.$_innerNode.style[n === "min" ? "minHeight" : n === "max" ? "maxHeight" : "height"] = c != null ? `${c}px` : null, {
              data: {
                skip: !0
              },
              reset: {
                rects: !0
              }
            };
          }
        });
      }
      (this.autoMaxSize || this.autoBoundaryMaxSize) && (this.$_innerNode.style.maxWidth = null, this.$_innerNode.style.maxHeight = null, e.middleware.push(ci({
        boundary: this.boundary,
        padding: this.overflowPadding,
        apply: ({ availableWidth: n, availableHeight: i }) => {
          this.$_innerNode.style.maxWidth = n != null ? `${n}px` : null, this.$_innerNode.style.maxHeight = i != null ? `${i}px` : null;
        }
      })));
      const o = await gi(this.$_referenceNode, this.$_popperNode, e);
      Object.assign(this.result, {
        x: o.x,
        y: o.y,
        placement: o.placement,
        strategy: o.strategy,
        arrow: {
          ...o.middlewareData.arrow,
          ...o.middlewareData.arrowOverflow
        }
      });
    },
    $_scheduleShow(e, t = !1) {
      if (this.$_updateParentShownChildren(!0), this.$_hideInProgress = !1, clearTimeout(this.$_scheduleTimer), Ie && this.instantMove && Ie.instantMove && Ie !== this.parentPopper) {
        Ie.$_applyHide(!0), this.$_applyShow(!0);
        return;
      }
      t ? this.$_applyShow() : this.$_scheduleTimer = setTimeout(this.$_applyShow.bind(this), this.$_computeDelay("show"));
    },
    $_scheduleHide(e, t = !1) {
      if (this.shownChildren.size > 0) {
        this.pendingHide = !0;
        return;
      }
      this.$_updateParentShownChildren(!1), this.$_hideInProgress = !0, clearTimeout(this.$_scheduleTimer), this.isShown && (Ie = this), t ? this.$_applyHide() : this.$_scheduleTimer = setTimeout(this.$_applyHide.bind(this), this.$_computeDelay("hide"));
    },
    $_computeDelay(e) {
      const t = this.delay;
      return parseInt(t && t[e] || t || 0);
    },
    async $_applyShow(e = !1) {
      clearTimeout(this.$_disposeTimer), clearTimeout(this.$_scheduleTimer), this.skipTransition = e, !this.isShown && (this.$_ensureTeleport(), await Lt(), await this.$_computePosition(), await this.$_applyShowEffect(), this.positioningDisabled || this.$_registerEventListeners([
        ...yt(this.$_referenceNode),
        ...yt(this.$_popperNode)
      ], "scroll", () => {
        this.$_computePosition();
      }));
    },
    async $_applyShowEffect() {
      if (this.$_hideInProgress)
        return;
      if (this.computeTransformOrigin) {
        const t = this.$_referenceNode.getBoundingClientRect(), o = this.$_popperNode.querySelector(".v-popper__wrapper"), n = o.parentNode.getBoundingClientRect(), i = t.x + t.width / 2 - (n.left + o.offsetLeft), s = t.y + t.height / 2 - (n.top + o.offsetTop);
        this.result.transformOrigin = `${i}px ${s}px`;
      }
      this.isShown = !0, this.$_applyAttrsToTarget({
        "aria-describedby": this.popperId,
        "data-popper-shown": ""
      });
      const e = this.showGroup;
      if (e) {
        let t;
        for (let o = 0; o < se.length; o++)
          t = se[o], t.showGroup !== e && (t.hide(), t.$emit("close-group"));
      }
      se.push(this), document.body.classList.add("v-popper--some-open");
      for (const t of go(this.theme))
        _o(t).push(this), document.body.classList.add(`v-popper--some-open--${t}`);
      this.$emit("apply-show"), this.classes.showFrom = !0, this.classes.showTo = !1, this.classes.hideFrom = !1, this.classes.hideTo = !1, await Lt(), this.classes.showFrom = !1, this.classes.showTo = !0, this.noAutoFocus || this.$_popperNode.focus();
    },
    async $_applyHide(e = !1) {
      if (this.shownChildren.size > 0) {
        this.pendingHide = !0, this.$_hideInProgress = !1;
        return;
      }
      if (clearTimeout(this.$_scheduleTimer), !this.isShown)
        return;
      this.skipTransition = e, mo(se, this), se.length === 0 && document.body.classList.remove("v-popper--some-open");
      for (const o of go(this.theme)) {
        const n = _o(o);
        mo(n, this), n.length === 0 && document.body.classList.remove(`v-popper--some-open--${o}`);
      }
      Ie === this && (Ie = null), this.isShown = !1, this.$_applyAttrsToTarget({
        "aria-describedby": void 0,
        "data-popper-shown": void 0
      }), clearTimeout(this.$_disposeTimer);
      const t = this.disposeTimeout;
      t !== null && (this.$_disposeTimer = setTimeout(() => {
        this.$_popperNode && (this.$_detachPopperNode(), this.isMounted = !1);
      }, t)), this.$_removeEventListeners("scroll"), this.$emit("apply-hide"), this.classes.showFrom = !1, this.classes.showTo = !1, this.classes.hideFrom = !0, this.classes.hideTo = !1, await Lt(), this.classes.hideFrom = !1, this.classes.hideTo = !0;
    },
    $_autoShowHide() {
      this.shown ? this.show() : this.hide();
    },
    $_ensureTeleport() {
      if (this.isDisposed)
        return;
      let e = this.container;
      if (typeof e == "string" ? e = window.document.querySelector(e) : e === !1 && (e = this.$_targetNodes[0].parentNode), !e)
        throw new Error("No container for popover: " + this.container);
      e.appendChild(this.$_popperNode), this.isMounted = !0;
    },
    $_addEventListeners() {
      const e = (o) => {
        this.isShown && !this.$_hideInProgress || (o.usedByTooltip = !0, !this.$_preventShow && this.show({ event: o }));
      };
      this.$_registerTriggerListeners(this.$_targetNodes, ho, this.triggers, this.showTriggers, e), this.$_registerTriggerListeners([this.$_popperNode], ho, this.popperTriggers, this.popperShowTriggers, e);
      const t = (o) => {
        o.usedByTooltip || this.hide({ event: o });
      };
      this.$_registerTriggerListeners(this.$_targetNodes, fo, this.triggers, this.hideTriggers, t), this.$_registerTriggerListeners([this.$_popperNode], fo, this.popperTriggers, this.popperHideTriggers, t);
    },
    $_registerEventListeners(e, t, o) {
      this.$_events.push({ targetNodes: e, eventType: t, handler: o }), e.forEach((n) => n.addEventListener(t, o, $e ? {
        passive: !0
      } : void 0));
    },
    $_registerTriggerListeners(e, t, o, n, i) {
      let s = o;
      n != null && (s = typeof n == "function" ? n(s) : n), s.forEach((r) => {
        const a = t[r];
        a && this.$_registerEventListeners(e, a, i);
      });
    },
    $_removeEventListeners(e) {
      const t = [];
      this.$_events.forEach((o) => {
        const { targetNodes: n, eventType: i, handler: s } = o;
        !e || e === i ? n.forEach((r) => r.removeEventListener(i, s)) : t.push(o);
      }), this.$_events = t;
    },
    $_refreshListeners() {
      this.isDisposed || (this.$_removeEventListeners(), this.$_addEventListeners());
    },
    $_handleGlobalClose(e, t = !1) {
      this.$_showFrameLocked || (this.hide({ event: e }), e.closePopover ? this.$emit("close-directive") : this.$emit("auto-hide"), t && (this.$_preventShow = !0, setTimeout(() => {
        this.$_preventShow = !1;
      }, 300)));
    },
    $_detachPopperNode() {
      this.$_popperNode.parentNode && this.$_popperNode.parentNode.removeChild(this.$_popperNode);
    },
    $_swapTargetAttrs(e, t) {
      for (const o of this.$_targetNodes) {
        const n = o.getAttribute(e);
        n && (o.removeAttribute(e), o.setAttribute(t, n));
      }
    },
    $_applyAttrsToTarget(e) {
      for (const t of this.$_targetNodes)
        for (const o in e) {
          const n = e[o];
          n == null ? t.removeAttribute(o) : t.setAttribute(o, n);
        }
    },
    $_updateParentShownChildren(e) {
      let t = this.parentPopper;
      for (; t; )
        e ? t.shownChildren.add(this.randomId) : (t.shownChildren.delete(this.randomId), t.pendingHide && t.hide()), t = t.parentPopper;
    },
    $_isAimingPopper() {
      const e = this.$_referenceNode.getBoundingClientRect();
      if (Fe >= e.left && Fe <= e.right && Ue >= e.top && Ue <= e.bottom) {
        const t = this.$_popperNode.getBoundingClientRect(), o = Fe - ve, n = Ue - _e, i = t.left + t.width / 2 - ve + (t.top + t.height / 2) - _e + t.width + t.height, s = ve + o * i, r = _e + n * i;
        return ot(ve, _e, s, r, t.left, t.top, t.left, t.bottom) || // Left edge
        ot(ve, _e, s, r, t.left, t.top, t.right, t.top) || // Top edge
        ot(ve, _e, s, r, t.right, t.top, t.right, t.bottom) || // Right edge
        ot(ve, _e, s, r, t.left, t.bottom, t.right, t.bottom);
      }
      return !1;
    }
  },
  render() {
    return this.$slots.default(this.slotData);
  }
});
if (typeof document < "u" && typeof window < "u") {
  if (Ko) {
    const e = $e ? {
      passive: !0,
      capture: !0
    } : !0;
    document.addEventListener("touchstart", (t) => yo(t, !0), e), document.addEventListener("touchend", (t) => bo(t, !0), e);
  } else
    window.addEventListener("mousedown", (e) => yo(e, !1), !0), window.addEventListener("click", (e) => bo(e, !1), !0);
  window.addEventListener("resize", mi);
}
function yo(e, t) {
  if (ae.autoHideOnMousedown)
    tn(e, t);
  else
    for (let o = 0; o < se.length; o++) {
      const n = se[o];
      try {
        n.mouseDownContains = n.popperNode().contains(e.target);
      } catch {
      }
    }
}
function bo(e, t) {
  ae.autoHideOnMousedown || tn(e, t);
}
function tn(e, t) {
  const o = {};
  for (let n = se.length - 1; n >= 0; n--) {
    const i = se[n];
    try {
      const s = i.containsGlobalTarget = i.mouseDownContains || i.popperNode().contains(e.target);
      i.pendingHide = !1, requestAnimationFrame(() => {
        if (i.pendingHide = !1, !o[i.randomId] && wo(i, s, e)) {
          if (i.$_handleGlobalClose(e, t), !e.closeAllPopover && e.closePopover && s) {
            let a = i.parentPopper;
            for (; a; )
              o[a.randomId] = !0, a = a.parentPopper;
            return;
          }
          let r = i.parentPopper;
          for (; r && wo(r, r.containsGlobalTarget, e); )
            r.$_handleGlobalClose(e, t), r = r.parentPopper;
        }
      });
    } catch {
    }
  }
}
function wo(e, t, o) {
  return o.closeAllPopover || o.closePopover && t || fi(e, o) && !t;
}
function fi(e, t) {
  if (typeof e.autoHide == "function") {
    const o = e.autoHide(t);
    return e.lastAutoHide = o, o;
  }
  return e.autoHide;
}
function mi() {
  for (let e = 0; e < se.length; e++)
    se[e].$_computePosition();
}
let ve = 0, _e = 0, Fe = 0, Ue = 0;
typeof window < "u" && window.addEventListener("mousemove", (e) => {
  ve = Fe, _e = Ue, Fe = e.clientX, Ue = e.clientY;
}, $e ? {
  passive: !0
} : void 0);
function ot(e, t, o, n, i, s, r, a) {
  const l = ((r - i) * (t - s) - (a - s) * (e - i)) / ((a - s) * (o - e) - (r - i) * (n - t)), c = ((o - e) * (t - s) - (n - t) * (e - i)) / ((a - s) * (o - e) - (r - i) * (n - t));
  return l >= 0 && l <= 1 && c >= 0 && c <= 1;
}
const vi = {
  extends: en()
}, jt = (e, t) => {
  const o = e.__vccOpts || e;
  for (const [n, i] of t)
    o[n] = i;
  return o;
};
function _i(e, t, o, n, i, s) {
  return m(), k("div", {
    ref: "reference",
    class: Q(["v-popper", {
      "v-popper--shown": e.slotData.isShown
    }])
  }, [
    pt(e.$slots, "default", On(An(e.slotData)))
  ], 2);
}
const yi = /* @__PURE__ */ jt(vi, [["render", _i]]);
function bi() {
  var e = window.navigator.userAgent, t = e.indexOf("MSIE ");
  if (t > 0)
    return parseInt(e.substring(t + 5, e.indexOf(".", t)), 10);
  var o = e.indexOf("Trident/");
  if (o > 0) {
    var n = e.indexOf("rv:");
    return parseInt(e.substring(n + 3, e.indexOf(".", n)), 10);
  }
  var i = e.indexOf("Edge/");
  return i > 0 ? parseInt(e.substring(i + 5, e.indexOf(".", i)), 10) : -1;
}
let rt;
function $t() {
  $t.init || ($t.init = !0, rt = bi() !== -1);
}
var Nt = {
  name: "ResizeObserver",
  props: {
    emitOnMount: {
      type: Boolean,
      default: !1
    },
    ignoreWidth: {
      type: Boolean,
      default: !1
    },
    ignoreHeight: {
      type: Boolean,
      default: !1
    }
  },
  emits: [
    "notify"
  ],
  mounted() {
    $t(), At(() => {
      this._w = this.$el.offsetWidth, this._h = this.$el.offsetHeight, this.emitOnMount && this.emitSize();
    });
    const e = document.createElement("object");
    this._resizeObject = e, e.setAttribute("aria-hidden", "true"), e.setAttribute("tabindex", -1), e.onload = this.addResizeHandlers, e.type = "text/html", rt && this.$el.appendChild(e), e.data = "about:blank", rt || this.$el.appendChild(e);
  },
  beforeUnmount() {
    this.removeResizeHandlers();
  },
  methods: {
    compareAndNotify() {
      (!this.ignoreWidth && this._w !== this.$el.offsetWidth || !this.ignoreHeight && this._h !== this.$el.offsetHeight) && (this._w = this.$el.offsetWidth, this._h = this.$el.offsetHeight, this.emitSize());
    },
    emitSize() {
      this.$emit("notify", {
        width: this._w,
        height: this._h
      });
    },
    addResizeHandlers() {
      this._resizeObject.contentDocument.defaultView.addEventListener("resize", this.compareAndNotify), this.compareAndNotify();
    },
    removeResizeHandlers() {
      this._resizeObject && this._resizeObject.onload && (!rt && this._resizeObject.contentDocument && this._resizeObject.contentDocument.defaultView.removeEventListener("resize", this.compareAndNotify), this.$el.removeChild(this._resizeObject), this._resizeObject.onload = null, this._resizeObject = null);
    }
  }
};
const wi = /* @__PURE__ */ En("data-v-b329ee4c");
Dn("data-v-b329ee4c");
const Mi = {
  class: "resize-observer",
  tabindex: "-1"
};
Cn();
const ki = /* @__PURE__ */ wi((e, t, o, n, i, s) => (m(), q("div", Mi)));
Nt.render = ki;
Nt.__scopeId = "data-v-b329ee4c";
Nt.__file = "src/components/ResizeObserver.vue";
const on = (e = "theme") => ({
  computed: {
    themeClass() {
      return hi(this[e]);
    }
  }
}), Ii = X({
  name: "VPopperContent",
  components: {
    ResizeObserver: Nt
  },
  mixins: [
    on()
  ],
  props: {
    popperId: String,
    theme: String,
    shown: Boolean,
    mounted: Boolean,
    skipTransition: Boolean,
    autoHide: Boolean,
    handleResize: Boolean,
    classes: Object,
    result: Object
  },
  emits: [
    "hide",
    "resize"
  ],
  methods: {
    toPx(e) {
      return e != null && !isNaN(e) ? `${e}px` : null;
    }
  }
}), xi = ["id", "aria-hidden", "tabindex", "data-popper-placement"], ji = {
  ref: "inner",
  class: "v-popper__inner"
}, Ni = /* @__PURE__ */ w("div", { class: "v-popper__arrow-outer" }, null, -1), Si = /* @__PURE__ */ w("div", { class: "v-popper__arrow-inner" }, null, -1), Li = [
  Ni,
  Si
];
function Ti(e, t, o, n, i, s) {
  const r = Pe("ResizeObserver");
  return m(), k("div", {
    id: e.popperId,
    ref: "popover",
    class: Q(["v-popper__popper", [
      e.themeClass,
      e.classes.popperClass,
      {
        "v-popper__popper--shown": e.shown,
        "v-popper__popper--hidden": !e.shown,
        "v-popper__popper--show-from": e.classes.showFrom,
        "v-popper__popper--show-to": e.classes.showTo,
        "v-popper__popper--hide-from": e.classes.hideFrom,
        "v-popper__popper--hide-to": e.classes.hideTo,
        "v-popper__popper--skip-transition": e.skipTransition,
        "v-popper__popper--arrow-overflow": e.result && e.result.arrow.overflow,
        "v-popper__popper--no-positioning": !e.result
      }
    ]]),
    style: Ve(e.result ? {
      position: e.result.strategy,
      transform: `translate3d(${Math.round(e.result.x)}px,${Math.round(e.result.y)}px,0)`
    } : void 0),
    "aria-hidden": e.shown ? "false" : "true",
    tabindex: e.autoHide ? 0 : void 0,
    "data-popper-placement": e.result ? e.result.placement : void 0,
    onKeyup: t[2] || (t[2] = zn((a) => e.autoHide && e.$emit("hide"), ["esc"]))
  }, [
    w("div", {
      class: "v-popper__backdrop",
      onClick: t[0] || (t[0] = (a) => e.autoHide && e.$emit("hide"))
    }),
    w("div", {
      class: "v-popper__wrapper",
      style: Ve(e.result ? {
        transformOrigin: e.result.transformOrigin
      } : void 0)
    }, [
      w("div", ji, [
        e.mounted ? (m(), k(K, { key: 0 }, [
          w("div", null, [
            pt(e.$slots, "default")
          ]),
          e.handleResize ? (m(), q(r, {
            key: 0,
            onNotify: t[1] || (t[1] = (a) => e.$emit("resize", a))
          })) : z("", !0)
        ], 64)) : z("", !0)
      ], 512),
      w("div", {
        ref: "arrow",
        class: "v-popper__arrow-container",
        style: Ve(e.result ? {
          left: e.toPx(e.result.arrow.x),
          top: e.toPx(e.result.arrow.y)
        } : void 0)
      }, Li, 4)
    ], 4)
  ], 46, xi);
}
const nn = /* @__PURE__ */ jt(Ii, [["render", Ti]]), sn = {
  methods: {
    show(...e) {
      return this.$refs.popper.show(...e);
    },
    hide(...e) {
      return this.$refs.popper.hide(...e);
    },
    dispose(...e) {
      return this.$refs.popper.dispose(...e);
    },
    onResize(...e) {
      return this.$refs.popper.onResize(...e);
    }
  }
};
let Yt = function() {
};
typeof window < "u" && (Yt = window.Element);
const Di = X({
  name: "VPopperWrapper",
  components: {
    Popper: yi,
    PopperContent: nn
  },
  mixins: [
    sn,
    on("finalTheme")
  ],
  props: {
    theme: {
      type: String,
      default: null
    },
    referenceNode: {
      type: Function,
      default: null
    },
    shown: {
      type: Boolean,
      default: !1
    },
    showGroup: {
      type: String,
      default: null
    },
    // eslint-disable-next-line vue/require-prop-types
    ariaId: {
      default: null
    },
    disabled: {
      type: Boolean,
      default: void 0
    },
    positioningDisabled: {
      type: Boolean,
      default: void 0
    },
    placement: {
      type: String,
      default: void 0
    },
    delay: {
      type: [String, Number, Object],
      default: void 0
    },
    distance: {
      type: [Number, String],
      default: void 0
    },
    skidding: {
      type: [Number, String],
      default: void 0
    },
    triggers: {
      type: Array,
      default: void 0
    },
    showTriggers: {
      type: [Array, Function],
      default: void 0
    },
    hideTriggers: {
      type: [Array, Function],
      default: void 0
    },
    popperTriggers: {
      type: Array,
      default: void 0
    },
    popperShowTriggers: {
      type: [Array, Function],
      default: void 0
    },
    popperHideTriggers: {
      type: [Array, Function],
      default: void 0
    },
    container: {
      type: [String, Object, Yt, Boolean],
      default: void 0
    },
    boundary: {
      type: [String, Yt],
      default: void 0
    },
    strategy: {
      type: String,
      default: void 0
    },
    autoHide: {
      type: [Boolean, Function],
      default: void 0
    },
    handleResize: {
      type: Boolean,
      default: void 0
    },
    instantMove: {
      type: Boolean,
      default: void 0
    },
    eagerMount: {
      type: Boolean,
      default: void 0
    },
    popperClass: {
      type: [String, Array, Object],
      default: void 0
    },
    computeTransformOrigin: {
      type: Boolean,
      default: void 0
    },
    /**
     * @deprecated
     */
    autoMinSize: {
      type: Boolean,
      default: void 0
    },
    autoSize: {
      type: [Boolean, String],
      default: void 0
    },
    /**
     * @deprecated
     */
    autoMaxSize: {
      type: Boolean,
      default: void 0
    },
    autoBoundaryMaxSize: {
      type: Boolean,
      default: void 0
    },
    preventOverflow: {
      type: Boolean,
      default: void 0
    },
    overflowPadding: {
      type: [Number, String],
      default: void 0
    },
    arrowPadding: {
      type: [Number, String],
      default: void 0
    },
    arrowOverflow: {
      type: Boolean,
      default: void 0
    },
    flip: {
      type: Boolean,
      default: void 0
    },
    shift: {
      type: Boolean,
      default: void 0
    },
    shiftCrossAxis: {
      type: Boolean,
      default: void 0
    },
    noAutoFocus: {
      type: Boolean,
      default: void 0
    },
    disposeTimeout: {
      type: Number,
      default: void 0
    }
  },
  emits: {
    show: () => !0,
    hide: () => !0,
    "update:shown": (e) => !0,
    "apply-show": () => !0,
    "apply-hide": () => !0,
    "close-group": () => !0,
    "close-directive": () => !0,
    "auto-hide": () => !0,
    resize: () => !0
  },
  computed: {
    finalTheme() {
      return this.theme ?? this.$options.vPopperTheme;
    }
  },
  methods: {
    getTargetNodes() {
      return Array.from(this.$el.children).filter((e) => e !== this.$refs.popperContent.$el);
    }
  }
});
function Ci(e, t, o, n, i, s) {
  const r = Pe("PopperContent"), a = Pe("Popper");
  return m(), q(a, Eo({ ref: "popper" }, e.$props, {
    theme: e.finalTheme,
    "target-nodes": e.getTargetNodes,
    "popper-node": () => e.$refs.popperContent.$el,
    class: [
      e.themeClass
    ],
    onShow: t[0] || (t[0] = () => e.$emit("show")),
    onHide: t[1] || (t[1] = () => e.$emit("hide")),
    "onUpdate:shown": t[2] || (t[2] = (l) => e.$emit("update:shown", l)),
    onApplyShow: t[3] || (t[3] = () => e.$emit("apply-show")),
    onApplyHide: t[4] || (t[4] = () => e.$emit("apply-hide")),
    onCloseGroup: t[5] || (t[5] = () => e.$emit("close-group")),
    onCloseDirective: t[6] || (t[6] = () => e.$emit("close-directive")),
    onAutoHide: t[7] || (t[7] = () => e.$emit("auto-hide")),
    onResize: t[8] || (t[8] = () => e.$emit("resize"))
  }), {
    default: gt(({
      popperId: l,
      isShown: c,
      shouldMountContent: u,
      skipTransition: _,
      autoHide: f,
      show: v,
      hide: I,
      handleResize: T,
      onResize: D,
      classes: C,
      result: O
    }) => [
      pt(e.$slots, "default", {
        shown: c,
        show: v,
        hide: I
      }),
      Vt(r, {
        ref: "popperContent",
        "popper-id": l,
        theme: e.finalTheme,
        shown: c,
        mounted: u,
        "skip-transition": _,
        "auto-hide": f,
        "handle-resize": T,
        classes: C,
        result: O,
        onHide: I,
        onResize: D
      }, {
        default: gt(() => [
          pt(e.$slots, "popper", {
            shown: c,
            hide: I
          })
        ]),
        _: 2
      }, 1032, ["popper-id", "theme", "shown", "mounted", "skip-transition", "auto-hide", "handle-resize", "classes", "result", "onHide", "onResize"])
    ]),
    _: 3
  }, 16, ["theme", "target-nodes", "popper-node", "class"]);
}
const Qt = /* @__PURE__ */ jt(Di, [["render", Ci]]), Oi = {
  ...Qt,
  name: "VDropdown",
  vPopperTheme: "dropdown"
}, Ai = {
  ...Qt,
  name: "VMenu",
  vPopperTheme: "menu"
}, Ei = {
  ...Qt,
  name: "VTooltip",
  vPopperTheme: "tooltip"
}, zi = X({
  name: "VTooltipDirective",
  components: {
    Popper: en(),
    PopperContent: nn
  },
  mixins: [
    sn
  ],
  inheritAttrs: !1,
  props: {
    theme: {
      type: String,
      default: "tooltip"
    },
    html: {
      type: Boolean,
      default: (e) => qe(e.theme, "html")
    },
    content: {
      type: [String, Number, Function],
      default: null
    },
    loadingContent: {
      type: String,
      default: (e) => qe(e.theme, "loadingContent")
    },
    targetNodes: {
      type: Function,
      required: !0
    }
  },
  data() {
    return {
      asyncContent: null
    };
  },
  computed: {
    isContentAsync() {
      return typeof this.content == "function";
    },
    loading() {
      return this.isContentAsync && this.asyncContent == null;
    },
    finalContent() {
      return this.isContentAsync ? this.loading ? this.loadingContent : this.asyncContent : this.content;
    }
  },
  watch: {
    content: {
      handler() {
        this.fetchContent(!0);
      },
      immediate: !0
    },
    async finalContent() {
      await this.$nextTick(), this.$refs.popper.onResize();
    }
  },
  created() {
    this.$_fetchId = 0;
  },
  methods: {
    fetchContent(e) {
      if (typeof this.content == "function" && this.$_isShown && (e || !this.$_loading && this.asyncContent == null)) {
        this.asyncContent = null, this.$_loading = !0;
        const t = ++this.$_fetchId, o = this.content(this);
        o.then ? o.then((n) => this.onResult(t, n)) : this.onResult(t, o);
      }
    },
    onResult(e, t) {
      e === this.$_fetchId && (this.$_loading = !1, this.asyncContent = t);
    },
    onShow() {
      this.$_isShown = !0, this.fetchContent();
    },
    onHide() {
      this.$_isShown = !1;
    }
  }
}), Pi = ["innerHTML"], $i = ["textContent"];
function Yi(e, t, o, n, i, s) {
  const r = Pe("PopperContent"), a = Pe("Popper");
  return m(), q(a, Eo({ ref: "popper" }, e.$attrs, {
    theme: e.theme,
    "target-nodes": e.targetNodes,
    "popper-node": () => e.$refs.popperContent.$el,
    onApplyShow: e.onShow,
    onApplyHide: e.onHide
  }), {
    default: gt(({
      popperId: l,
      isShown: c,
      shouldMountContent: u,
      skipTransition: _,
      autoHide: f,
      hide: v,
      handleResize: I,
      onResize: T,
      classes: D,
      result: C
    }) => [
      Vt(r, {
        ref: "popperContent",
        class: Q({
          "v-popper--tooltip-loading": e.loading
        }),
        "popper-id": l,
        theme: e.theme,
        shown: c,
        mounted: u,
        "skip-transition": _,
        "auto-hide": f,
        "handle-resize": I,
        classes: D,
        result: C,
        onHide: v,
        onResize: T
      }, {
        default: gt(() => [
          e.html ? (m(), k("div", {
            key: 0,
            innerHTML: e.finalContent
          }, null, 8, Pi)) : (m(), k("div", {
            key: 1,
            textContent: U(e.finalContent)
          }, null, 8, $i))
        ]),
        _: 2
      }, 1032, ["class", "popper-id", "theme", "shown", "mounted", "skip-transition", "auto-hide", "handle-resize", "classes", "result", "onHide", "onResize"])
    ]),
    _: 1
  }, 16, ["theme", "target-nodes", "popper-node", "onApplyShow", "onApplyHide"]);
}
const Gi = /* @__PURE__ */ jt(zi, [["render", Yi]]), rn = "v-popper--has-tooltip";
function Ri(e, t) {
  let o = e.placement;
  if (!o && t)
    for (const n of Xo)
      t[n] && (o = n);
  return o || (o = qe(e.theme || "tooltip", "placement")), o;
}
function an(e, t, o) {
  let n;
  const i = typeof t;
  return i === "string" ? n = { content: t } : t && i === "object" ? n = t : n = { content: !1 }, n.placement = Ri(n, o), n.targetNodes = () => [e], n.referenceNode = () => e, n;
}
let Dt, Ke, Wi = 0;
function Vi() {
  if (Dt)
    return;
  Ke = Y([]), Dt = Pn({
    name: "VTooltipDirectiveApp",
    setup() {
      return {
        directives: Ke
      };
    },
    render() {
      return this.directives.map((t) => $n(Gi, {
        ...t.options,
        shown: t.shown || t.options.shown,
        key: t.id
      }));
    },
    devtools: {
      hide: !0
    }
  });
  const e = document.createElement("div");
  document.body.appendChild(e), Dt.mount(e);
}
function Zi(e, t, o) {
  Vi();
  const n = Y(an(e, t, o)), i = Y(!1), s = {
    id: Wi++,
    options: n,
    shown: i
  };
  return Ke.value.push(s), e.classList && e.classList.add(rn), e.$_popper = {
    options: n,
    item: s,
    show() {
      i.value = !0;
    },
    hide() {
      i.value = !1;
    }
  };
}
function ln(e) {
  if (e.$_popper) {
    const t = Ke.value.indexOf(e.$_popper.item);
    t !== -1 && Ke.value.splice(t, 1), delete e.$_popper, delete e.$_popperOldShown, delete e.$_popperMountTarget;
  }
  e.classList && e.classList.remove(rn);
}
function Mo(e, { value: t, modifiers: o }) {
  const n = an(e, t, o);
  if (!n.content || qe(n.theme || "tooltip", "disabled"))
    ln(e);
  else {
    let i;
    e.$_popper ? (i = e.$_popper, i.options.value = n) : i = Zi(e, t, o), typeof t.shown < "u" && t.shown !== e.$_popperOldShown && (e.$_popperOldShown = t.shown, t.shown ? i.show() : i.hide());
  }
}
const Bi = {
  beforeMount: Mo,
  updated: Mo,
  beforeUnmount(e) {
    ln(e);
  }
};
function ko(e) {
  e.addEventListener("mousedown", bt), e.addEventListener("click", bt), e.addEventListener("touchstart", cn, $e ? {
    passive: !0
  } : !1);
}
function Io(e) {
  e.removeEventListener("mousedown", bt), e.removeEventListener("click", bt), e.removeEventListener("touchstart", cn), e.removeEventListener("touchend", un), e.removeEventListener("touchcancel", dn);
}
function bt(e) {
  const t = e.currentTarget;
  e.closePopover = !t.$_vclosepopover_touch, e.closeAllPopover = t.$_closePopoverModifiers && !!t.$_closePopoverModifiers.all;
}
function cn(e) {
  if (e.changedTouches.length === 1) {
    const t = e.currentTarget;
    t.$_vclosepopover_touch = !0;
    const o = e.changedTouches[0];
    t.$_vclosepopover_touchPoint = o, t.addEventListener("touchend", un), t.addEventListener("touchcancel", dn);
  }
}
function un(e) {
  const t = e.currentTarget;
  if (t.$_vclosepopover_touch = !1, e.changedTouches.length === 1) {
    const o = e.changedTouches[0], n = t.$_vclosepopover_touchPoint;
    e.closePopover = Math.abs(o.screenY - n.screenY) < 20 && Math.abs(o.screenX - n.screenX) < 20, e.closeAllPopover = t.$_closePopoverModifiers && !!t.$_closePopoverModifiers.all;
  }
}
function dn(e) {
  const t = e.currentTarget;
  t.$_vclosepopover_touch = !1;
}
const Fi = {
  beforeMount(e, { value: t, modifiers: o }) {
    e.$_closePopoverModifiers = o, (typeof t > "u" || t) && ko(e);
  },
  updated(e, { value: t, oldValue: o, modifiers: n }) {
    e.$_closePopoverModifiers = n, t !== o && (typeof t > "u" || t ? ko(e) : Io(e));
  },
  beforeUnmount(e) {
    Io(e);
  }
};
function Ui(e, t = {}) {
  e.$_vTooltipInstalled || (e.$_vTooltipInstalled = !0, qo(ae, t), e.directive("tooltip", Bi), e.directive("close-popper", Fi), e.component("VTooltip", Ei), e.component("VDropdown", Oi), e.component("VMenu", Ai));
}
const Hi = {
  // eslint-disable-next-line no-undef
  version: "5.2.2",
  install: Ui,
  options: ae
};
var pn = !1;
function nt(e, t, o) {
  return Array.isArray(e) ? (e.length = Math.max(e.length, t), e.splice(t, 1, o), o) : (e[t] = o, o);
}
function Ct(e, t) {
  if (Array.isArray(e)) {
    e.splice(t, 1);
    return;
  }
  delete e[t];
}
function Qi() {
  return gn().__VUE_DEVTOOLS_GLOBAL_HOOK__;
}
function gn() {
  return typeof navigator < "u" && typeof window < "u" ? window : typeof globalThis < "u" ? globalThis : {};
}
const Ji = typeof Proxy == "function", qi = "devtools-plugin:setup", Ki = "plugin:settings:set";
let Oe, Gt;
function Xi() {
  var e;
  return Oe !== void 0 || (typeof window < "u" && window.performance ? (Oe = !0, Gt = window.performance) : typeof globalThis < "u" && (!((e = globalThis.perf_hooks) === null || e === void 0) && e.performance) ? (Oe = !0, Gt = globalThis.perf_hooks.performance) : Oe = !1), Oe;
}
function es() {
  return Xi() ? Gt.now() : Date.now();
}
class ts {
  constructor(t, o) {
    this.target = null, this.targetQueue = [], this.onQueue = [], this.plugin = t, this.hook = o;
    const n = {};
    if (t.settings)
      for (const r in t.settings) {
        const a = t.settings[r];
        n[r] = a.defaultValue;
      }
    const i = `__vue-devtools-plugin-settings__${t.id}`;
    let s = Object.assign({}, n);
    try {
      const r = localStorage.getItem(i), a = JSON.parse(r);
      Object.assign(s, a);
    } catch {
    }
    this.fallbacks = {
      getSettings() {
        return s;
      },
      setSettings(r) {
        try {
          localStorage.setItem(i, JSON.stringify(r));
        } catch {
        }
        s = r;
      },
      now() {
        return es();
      }
    }, o && o.on(Ki, (r, a) => {
      r === this.plugin.id && this.fallbacks.setSettings(a);
    }), this.proxiedOn = new Proxy({}, {
      get: (r, a) => this.target ? this.target.on[a] : (...l) => {
        this.onQueue.push({
          method: a,
          args: l
        });
      }
    }), this.proxiedTarget = new Proxy({}, {
      get: (r, a) => this.target ? this.target[a] : a === "on" ? this.proxiedOn : Object.keys(this.fallbacks).includes(a) ? (...l) => (this.targetQueue.push({
        method: a,
        args: l,
        resolve: () => {
        }
      }), this.fallbacks[a](...l)) : (...l) => new Promise((c) => {
        this.targetQueue.push({
          method: a,
          args: l,
          resolve: c
        });
      })
    });
  }
  async setRealTarget(t) {
    this.target = t;
    for (const o of this.onQueue)
      this.target.on[o.method](...o.args);
    for (const o of this.targetQueue)
      o.resolve(await this.target[o.method](...o.args));
  }
}
function hn(e, t) {
  const o = e, n = gn(), i = Qi(), s = Ji && o.enableEarlyProxy;
  if (i && (n.__VUE_DEVTOOLS_PLUGIN_API_AVAILABLE__ || !s))
    i.emit(qi, e, t);
  else {
    const r = s ? new ts(o, i) : null;
    (n.__VUE_DEVTOOLS_PLUGINS__ = n.__VUE_DEVTOOLS_PLUGINS__ || []).push({
      pluginDescriptor: o,
      setupFn: t,
      proxy: r
    }), r && t(r.proxiedTarget);
  }
}
/*!
 * pinia v2.3.1
 * (c) 2025 Eduardo San Martin Morote
 * @license MIT
 */
let We;
const Ye = (e) => We = e, fn = process.env.NODE_ENV !== "production" ? Symbol("pinia") : (
  /* istanbul ignore next */
  Symbol()
);
function De(e) {
  return e && typeof e == "object" && Object.prototype.toString.call(e) === "[object Object]" && typeof e.toJSON != "function";
}
var pe;
(function(e) {
  e.direct = "direct", e.patchObject = "patch object", e.patchFunction = "patch function";
})(pe || (pe = {}));
const ye = typeof window < "u", xo = typeof window == "object" && window.window === window ? window : typeof self == "object" && self.self === self ? self : typeof global == "object" && global.global === global ? global : typeof globalThis == "object" ? globalThis : { HTMLElement: null };
function os(e, { autoBom: t = !1 } = {}) {
  return t && /^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(e.type) ? new Blob(["\uFEFF", e], { type: e.type }) : e;
}
function Jt(e, t, o) {
  const n = new XMLHttpRequest();
  n.open("GET", e), n.responseType = "blob", n.onload = function() {
    _n(n.response, t, o);
  }, n.onerror = function() {
    console.error("could not download file");
  }, n.send();
}
function mn(e) {
  const t = new XMLHttpRequest();
  t.open("HEAD", e, !1);
  try {
    t.send();
  } catch {
  }
  return t.status >= 200 && t.status <= 299;
}
function at(e) {
  try {
    e.dispatchEvent(new MouseEvent("click"));
  } catch {
    const o = document.createEvent("MouseEvents");
    o.initMouseEvent("click", !0, !0, window, 0, 0, 0, 80, 20, !1, !1, !1, !1, 0, null), e.dispatchEvent(o);
  }
}
const lt = typeof navigator == "object" ? navigator : { userAgent: "" }, vn = /Macintosh/.test(lt.userAgent) && /AppleWebKit/.test(lt.userAgent) && !/Safari/.test(lt.userAgent), _n = ye ? (
  // Use download attribute first if possible (#193 Lumia mobile) unless this is a macOS WebView or mini program
  typeof HTMLAnchorElement < "u" && "download" in HTMLAnchorElement.prototype && !vn ? ns : (
    // Use msSaveOrOpenBlob as a second approach
    "msSaveOrOpenBlob" in lt ? is : (
      // Fallback to using FileReader and a popup
      ss
    )
  )
) : () => {
};
function ns(e, t = "download", o) {
  const n = document.createElement("a");
  n.download = t, n.rel = "noopener", typeof e == "string" ? (n.href = e, n.origin !== location.origin ? mn(n.href) ? Jt(e, t, o) : (n.target = "_blank", at(n)) : at(n)) : (n.href = URL.createObjectURL(e), setTimeout(function() {
    URL.revokeObjectURL(n.href);
  }, 4e4), setTimeout(function() {
    at(n);
  }, 0));
}
function is(e, t = "download", o) {
  if (typeof e == "string")
    if (mn(e))
      Jt(e, t, o);
    else {
      const n = document.createElement("a");
      n.href = e, n.target = "_blank", setTimeout(function() {
        at(n);
      });
    }
  else
    navigator.msSaveOrOpenBlob(os(e, o), t);
}
function ss(e, t, o, n) {
  if (n = n || open("", "_blank"), n && (n.document.title = n.document.body.innerText = "downloading..."), typeof e == "string")
    return Jt(e, t, o);
  const i = e.type === "application/octet-stream", s = /constructor/i.test(String(xo.HTMLElement)) || "safari" in xo, r = /CriOS\/[\d]+/.test(navigator.userAgent);
  if ((r || i && s || vn) && typeof FileReader < "u") {
    const a = new FileReader();
    a.onloadend = function() {
      let l = a.result;
      if (typeof l != "string")
        throw n = null, new Error("Wrong reader.result type");
      l = r ? l : l.replace(/^data:[^;]*;/, "data:attachment/file;"), n ? n.location.href = l : location.assign(l), n = null;
    }, a.readAsDataURL(e);
  } else {
    const a = URL.createObjectURL(e);
    n ? n.location.assign(a) : location.href = a, n = null, setTimeout(function() {
      URL.revokeObjectURL(a);
    }, 4e4);
  }
}
function H(e, t) {
  const o = "🍍 " + e;
  typeof __VUE_DEVTOOLS_TOAST__ == "function" ? __VUE_DEVTOOLS_TOAST__(o, t) : t === "error" ? console.error(o) : t === "warn" ? console.warn(o) : console.log(o);
}
function qt(e) {
  return "_a" in e && "install" in e;
}
function yn() {
  if (!("clipboard" in navigator))
    return H("Your browser doesn't support the Clipboard API", "error"), !0;
}
function bn(e) {
  return e instanceof Error && e.message.toLowerCase().includes("document is not focused") ? (H('You need to activate the "Emulate a focused page" setting in the "Rendering" panel of devtools.', "warn"), !0) : !1;
}
async function rs(e) {
  if (!yn())
    try {
      await navigator.clipboard.writeText(JSON.stringify(e.state.value)), H("Global state copied to clipboard.");
    } catch (t) {
      if (bn(t))
        return;
      H("Failed to serialize the state. Check the console for more details.", "error"), console.error(t);
    }
}
async function as(e) {
  if (!yn())
    try {
      wn(e, JSON.parse(await navigator.clipboard.readText())), H("Global state pasted from clipboard.");
    } catch (t) {
      if (bn(t))
        return;
      H("Failed to deserialize the state from clipboard. Check the console for more details.", "error"), console.error(t);
    }
}
async function ls(e) {
  try {
    _n(new Blob([JSON.stringify(e.state.value)], {
      type: "text/plain;charset=utf-8"
    }), "pinia-state.json");
  } catch (t) {
    H("Failed to export the state as JSON. Check the console for more details.", "error"), console.error(t);
  }
}
let he;
function cs() {
  he || (he = document.createElement("input"), he.type = "file", he.accept = ".json");
  function e() {
    return new Promise((t, o) => {
      he.onchange = async () => {
        const n = he.files;
        if (!n)
          return t(null);
        const i = n.item(0);
        return t(i ? { text: await i.text(), file: i } : null);
      }, he.oncancel = () => t(null), he.onerror = o, he.click();
    });
  }
  return e;
}
async function us(e) {
  try {
    const o = await cs()();
    if (!o)
      return;
    const { text: n, file: i } = o;
    wn(e, JSON.parse(n)), H(`Global state imported from "${i.name}".`);
  } catch (t) {
    H("Failed to import the state from JSON. Check the console for more details.", "error"), console.error(t);
  }
}
function wn(e, t) {
  for (const o in t) {
    const n = e.state.value[o];
    n ? Object.assign(n, t[o]) : e.state.value[o] = t[o];
  }
}
function ie(e) {
  return {
    _custom: {
      display: e
    }
  };
}
const Mn = "🍍 Pinia (root)", ct = "_root";
function ds(e) {
  return qt(e) ? {
    id: ct,
    label: Mn
  } : {
    id: e.$id,
    label: e.$id
  };
}
function ps(e) {
  if (qt(e)) {
    const o = Array.from(e._s.keys()), n = e._s;
    return {
      state: o.map((s) => ({
        editable: !0,
        key: s,
        value: e.state.value[s]
      })),
      getters: o.filter((s) => n.get(s)._getters).map((s) => {
        const r = n.get(s);
        return {
          editable: !1,
          key: s,
          value: r._getters.reduce((a, l) => (a[l] = r[l], a), {})
        };
      })
    };
  }
  const t = {
    state: Object.keys(e.$state).map((o) => ({
      editable: !0,
      key: o,
      value: e.$state[o]
    }))
  };
  return e._getters && e._getters.length && (t.getters = e._getters.map((o) => ({
    editable: !1,
    key: o,
    value: e[o]
  }))), e._customProperties.size && (t.customProperties = Array.from(e._customProperties).map((o) => ({
    editable: !0,
    key: o,
    value: e[o]
  }))), t;
}
function gs(e) {
  return e ? Array.isArray(e) ? e.reduce((t, o) => (t.keys.push(o.key), t.operations.push(o.type), t.oldValue[o.key] = o.oldValue, t.newValue[o.key] = o.newValue, t), {
    oldValue: {},
    keys: [],
    operations: [],
    newValue: {}
  }) : {
    operation: ie(e.type),
    key: ie(e.key),
    oldValue: e.oldValue,
    newValue: e.newValue
  } : {};
}
function hs(e) {
  switch (e) {
    case pe.direct:
      return "mutation";
    case pe.patchFunction:
      return "$patch";
    case pe.patchObject:
      return "$patch";
    default:
      return "unknown";
  }
}
let Ee = !0;
const ut = [], je = "pinia:mutations", J = "pinia", { assign: fs } = Object, wt = (e) => "🍍 " + e;
function ms(e, t) {
  hn({
    id: "dev.esm.pinia",
    label: "Pinia 🍍",
    logo: "https://pinia.vuejs.org/logo.svg",
    packageName: "pinia",
    homepage: "https://pinia.vuejs.org",
    componentStateTypes: ut,
    app: e
  }, (o) => {
    typeof o.now != "function" && H("You seem to be using an outdated version of Vue Devtools. Are you still using the Beta release instead of the stable one? You can find the links at https://devtools.vuejs.org/guide/installation.html."), o.addTimelineLayer({
      id: je,
      label: "Pinia 🍍",
      color: 15064968
    }), o.addInspector({
      id: J,
      label: "Pinia 🍍",
      icon: "storage",
      treeFilterPlaceholder: "Search stores",
      actions: [
        {
          icon: "content_copy",
          action: () => {
            rs(t);
          },
          tooltip: "Serialize and copy the state"
        },
        {
          icon: "content_paste",
          action: async () => {
            await as(t), o.sendInspectorTree(J), o.sendInspectorState(J);
          },
          tooltip: "Replace the state with the content of your clipboard"
        },
        {
          icon: "save",
          action: () => {
            ls(t);
          },
          tooltip: "Save the state as a JSON file"
        },
        {
          icon: "folder_open",
          action: async () => {
            await us(t), o.sendInspectorTree(J), o.sendInspectorState(J);
          },
          tooltip: "Import the state from a JSON file"
        }
      ],
      nodeActions: [
        {
          icon: "restore",
          tooltip: 'Reset the state (with "$reset")',
          action: (n) => {
            const i = t._s.get(n);
            i ? typeof i.$reset != "function" ? H(`Cannot reset "${n}" store because it doesn't have a "$reset" method implemented.`, "warn") : (i.$reset(), H(`Store "${n}" reset.`)) : H(`Cannot reset "${n}" store because it wasn't found.`, "warn");
          }
        }
      ]
    }), o.on.inspectComponent((n, i) => {
      const s = n.componentInstance && n.componentInstance.proxy;
      if (s && s._pStores) {
        const r = n.componentInstance.proxy._pStores;
        Object.values(r).forEach((a) => {
          n.instanceData.state.push({
            type: wt(a.$id),
            key: "state",
            editable: !0,
            value: a._isOptionsAPI ? {
              _custom: {
                value: He(a.$state),
                actions: [
                  {
                    icon: "restore",
                    tooltip: "Reset the state of this store",
                    action: () => a.$reset()
                  }
                ]
              }
            } : (
              // NOTE: workaround to unwrap transferred refs
              Object.keys(a.$state).reduce((l, c) => (l[c] = a.$state[c], l), {})
            )
          }), a._getters && a._getters.length && n.instanceData.state.push({
            type: wt(a.$id),
            key: "getters",
            editable: !1,
            value: a._getters.reduce((l, c) => {
              try {
                l[c] = a[c];
              } catch (u) {
                l[c] = u;
              }
              return l;
            }, {})
          });
        });
      }
    }), o.on.getInspectorTree((n) => {
      if (n.app === e && n.inspectorId === J) {
        let i = [t];
        i = i.concat(Array.from(t._s.values())), n.rootNodes = (n.filter ? i.filter((s) => "$id" in s ? s.$id.toLowerCase().includes(n.filter.toLowerCase()) : Mn.toLowerCase().includes(n.filter.toLowerCase())) : i).map(ds);
      }
    }), globalThis.$pinia = t, o.on.getInspectorState((n) => {
      if (n.app === e && n.inspectorId === J) {
        const i = n.nodeId === ct ? t : t._s.get(n.nodeId);
        if (!i)
          return;
        i && (n.nodeId !== ct && (globalThis.$store = He(i)), n.state = ps(i));
      }
    }), o.on.editInspectorState((n, i) => {
      if (n.app === e && n.inspectorId === J) {
        const s = n.nodeId === ct ? t : t._s.get(n.nodeId);
        if (!s)
          return H(`store "${n.nodeId}" not found`, "error");
        const { path: r } = n;
        qt(s) ? r.unshift("state") : (r.length !== 1 || !s._customProperties.has(r[0]) || r[0] in s.$state) && r.unshift("$state"), Ee = !1, n.set(s, r, n.state.value), Ee = !0;
      }
    }), o.on.editComponentState((n) => {
      if (n.type.startsWith("🍍")) {
        const i = n.type.replace(/^🍍\s*/, ""), s = t._s.get(i);
        if (!s)
          return H(`store "${i}" not found`, "error");
        const { path: r } = n;
        if (r[0] !== "state")
          return H(`Invalid path for store "${i}":
${r}
Only state can be modified.`);
        r[0] = "$state", Ee = !1, n.set(s, r, n.state.value), Ee = !0;
      }
    });
  });
}
function vs(e, t) {
  ut.includes(wt(t.$id)) || ut.push(wt(t.$id)), hn({
    id: "dev.esm.pinia",
    label: "Pinia 🍍",
    logo: "https://pinia.vuejs.org/logo.svg",
    packageName: "pinia",
    homepage: "https://pinia.vuejs.org",
    componentStateTypes: ut,
    app: e,
    settings: {
      logStoreChanges: {
        label: "Notify about new/deleted stores",
        type: "boolean",
        defaultValue: !0
      }
      // useEmojis: {
      //   label: 'Use emojis in messages ⚡️',
      //   type: 'boolean',
      //   defaultValue: true,
      // },
    }
  }, (o) => {
    const n = typeof o.now == "function" ? o.now.bind(o) : Date.now;
    t.$onAction(({ after: r, onError: a, name: l, args: c }) => {
      const u = kn++;
      o.addTimelineEvent({
        layerId: je,
        event: {
          time: n(),
          title: "🛫 " + l,
          subtitle: "start",
          data: {
            store: ie(t.$id),
            action: ie(l),
            args: c
          },
          groupId: u
        }
      }), r((_) => {
        be = void 0, o.addTimelineEvent({
          layerId: je,
          event: {
            time: n(),
            title: "🛬 " + l,
            subtitle: "end",
            data: {
              store: ie(t.$id),
              action: ie(l),
              args: c,
              result: _
            },
            groupId: u
          }
        });
      }), a((_) => {
        be = void 0, o.addTimelineEvent({
          layerId: je,
          event: {
            time: n(),
            logType: "error",
            title: "💥 " + l,
            subtitle: "end",
            data: {
              store: ie(t.$id),
              action: ie(l),
              args: c,
              error: _
            },
            groupId: u
          }
        });
      });
    }, !0), t._customProperties.forEach((r) => {
      Zt(() => d(t[r]), (a, l) => {
        o.notifyComponentUpdate(), o.sendInspectorState(J), Ee && o.addTimelineEvent({
          layerId: je,
          event: {
            time: n(),
            title: "Change",
            subtitle: r,
            data: {
              newValue: a,
              oldValue: l
            },
            groupId: be
          }
        });
      }, { deep: !0 });
    }), t.$subscribe(({ events: r, type: a }, l) => {
      if (o.notifyComponentUpdate(), o.sendInspectorState(J), !Ee)
        return;
      const c = {
        time: n(),
        title: hs(a),
        data: fs({ store: ie(t.$id) }, gs(r)),
        groupId: be
      };
      a === pe.patchFunction ? c.subtitle = "⤵️" : a === pe.patchObject ? c.subtitle = "🧩" : r && !Array.isArray(r) && (c.subtitle = r.type), r && (c.data["rawEvent(s)"] = {
        _custom: {
          display: "DebuggerEvent",
          type: "object",
          tooltip: "raw DebuggerEvent[]",
          value: r
        }
      }), o.addTimelineEvent({
        layerId: je,
        event: c
      });
    }, { detached: !0, flush: "sync" });
    const i = t._hotUpdate;
    t._hotUpdate = Se((r) => {
      i(r), o.addTimelineEvent({
        layerId: je,
        event: {
          time: n(),
          title: "🔥 " + t.$id,
          subtitle: "HMR update",
          data: {
            store: ie(t.$id),
            info: ie("HMR update")
          }
        }
      }), o.notifyComponentUpdate(), o.sendInspectorTree(J), o.sendInspectorState(J);
    });
    const { $dispose: s } = t;
    t.$dispose = () => {
      s(), o.notifyComponentUpdate(), o.sendInspectorTree(J), o.sendInspectorState(J), o.getSettings().logStoreChanges && H(`Disposed "${t.$id}" store 🗑`);
    }, o.notifyComponentUpdate(), o.sendInspectorTree(J), o.sendInspectorState(J), o.getSettings().logStoreChanges && H(`"${t.$id}" store installed 🆕`);
  });
}
let kn = 0, be;
function jo(e, t, o) {
  const n = t.reduce((i, s) => (i[s] = He(e)[s], i), {});
  for (const i in n)
    e[i] = function() {
      const s = kn, r = o ? new Proxy(e, {
        get(...l) {
          return be = s, Reflect.get(...l);
        },
        set(...l) {
          return be = s, Reflect.set(...l);
        }
      }) : e;
      be = s;
      const a = n[i].apply(r, arguments);
      return be = void 0, a;
    };
}
function _s({ app: e, store: t, options: o }) {
  if (!t.$id.startsWith("__hot:")) {
    if (t._isOptionsAPI = !!o.state, !t._p._testing) {
      jo(t, Object.keys(o.actions), t._isOptionsAPI);
      const n = t._hotUpdate;
      He(t)._hotUpdate = function(i) {
        n.apply(this, arguments), jo(t, Object.keys(i._hmrPayload.actions), !!t._isOptionsAPI);
      };
    }
    vs(
      e,
      // FIXME: is there a way to allow the assignment from Store<Id, S, G, A> to StoreGeneric?
      t
    );
  }
}
function ys() {
  const e = zo(!0), t = e.run(() => Y({}));
  let o = [], n = [];
  const i = Se({
    install(s) {
      Ye(i), i._a = s, s.provide(fn, i), s.config.globalProperties.$pinia = i, process.env.NODE_ENV !== "production" && process.env.NODE_ENV !== "test" && ye && ms(s, i), n.forEach((r) => o.push(r)), n = [];
    },
    use(s) {
      return !this._a && !pn ? n.push(s) : o.push(s), this;
    },
    _p: o,
    // it's actually undefined here
    // @ts-expect-error
    _a: null,
    _e: e,
    _s: /* @__PURE__ */ new Map(),
    state: t
  });
  return process.env.NODE_ENV !== "production" && process.env.NODE_ENV !== "test" && ye && typeof Proxy < "u" && i.use(_s), i;
}
function In(e, t) {
  for (const o in t) {
    const n = t[o];
    if (!(o in e))
      continue;
    const i = e[o];
    De(i) && De(n) && !Te(n) && !Bt(n) ? e[o] = In(i, n) : e[o] = n;
  }
  return e;
}
const xn = () => {
};
function No(e, t, o, n = xn) {
  e.push(t);
  const i = () => {
    const s = e.indexOf(t);
    s > -1 && (e.splice(s, 1), n());
  };
  return !o && Wn() && Vn(i), i;
}
function Ae(e, ...t) {
  e.slice().forEach((o) => {
    o(...t);
  });
}
const bs = (e) => e(), So = Symbol(), Ot = Symbol();
function Rt(e, t) {
  e instanceof Map && t instanceof Map ? t.forEach((o, n) => e.set(n, o)) : e instanceof Set && t instanceof Set && t.forEach(e.add, e);
  for (const o in t) {
    if (!t.hasOwnProperty(o))
      continue;
    const n = t[o], i = e[o];
    De(i) && De(n) && e.hasOwnProperty(o) && !Te(n) && !Bt(n) ? e[o] = Rt(i, n) : e[o] = n;
  }
  return e;
}
const ws = process.env.NODE_ENV !== "production" ? Symbol("pinia:skipHydration") : (
  /* istanbul ignore next */
  Symbol()
);
function Ms(e) {
  return !De(e) || !e.hasOwnProperty(ws);
}
const { assign: oe } = Object;
function Lo(e) {
  return !!(Te(e) && e.effect);
}
function To(e, t, o, n) {
  const { state: i, actions: s, getters: r } = t, a = o.state.value[e];
  let l;
  function c() {
    !a && (process.env.NODE_ENV === "production" || !n) && (o.state.value[e] = i ? i() : {});
    const u = process.env.NODE_ENV !== "production" && n ? (
      // use ref() to unwrap refs inside state TODO: check if this is still necessary
      to(Y(i ? i() : {}).value)
    ) : to(o.state.value[e]);
    return oe(u, s, Object.keys(r || {}).reduce((_, f) => (process.env.NODE_ENV !== "production" && f in u && console.warn(`[🍍]: A getter cannot have the same name as another state property. Rename one of them. Found with "${f}" in store "${e}".`), _[f] = Se($o(() => {
      Ye(o);
      const v = o._s.get(e);
      return r[f].call(v, v);
    })), _), {}));
  }
  return l = Wt(e, c, t, o, n, !0), l;
}
function Wt(e, t, o = {}, n, i, s) {
  let r;
  const a = oe({ actions: {} }, o);
  if (process.env.NODE_ENV !== "production" && !n._e.active)
    throw new Error("Pinia destroyed");
  const l = { deep: !0 };
  process.env.NODE_ENV !== "production" && !pn && (l.onTrigger = (g) => {
    c ? v = g : c == !1 && !y._hotUpdating && (Array.isArray(v) ? v.push(g) : console.error("🍍 debuggerEvents should be an array. This is most likely an internal Pinia bug."));
  });
  let c, u, _ = [], f = [], v;
  const I = n.state.value[e];
  !s && !I && (process.env.NODE_ENV === "production" || !i) && (n.state.value[e] = {});
  const T = Y({});
  let D;
  function C(g) {
    let b;
    c = u = !1, process.env.NODE_ENV !== "production" && (v = []), typeof g == "function" ? (g(n.state.value[e]), b = {
      type: pe.patchFunction,
      storeId: e,
      events: v
    }) : (Rt(n.state.value[e], g), b = {
      type: pe.patchObject,
      payload: g,
      storeId: e,
      events: v
    });
    const p = D = Symbol();
    At().then(() => {
      D === p && (c = !0);
    }), u = !0, Ae(_, b, n.state.value[e]);
  }
  const O = s ? function() {
    const { state: b } = o, p = b ? b() : {};
    this.$patch((x) => {
      oe(x, p);
    });
  } : (
    /* istanbul ignore next */
    process.env.NODE_ENV !== "production" ? () => {
      throw new Error(`🍍: Store "${e}" is built using the setup syntax and does not implement $reset().`);
    } : xn
  );
  function N() {
    r.stop(), _ = [], f = [], n._s.delete(e);
  }
  const S = (g, b = "") => {
    if (So in g)
      return g[Ot] = b, g;
    const p = function() {
      Ye(n);
      const x = Array.from(arguments), A = [], L = [];
      function P(W) {
        A.push(W);
      }
      function R(W) {
        L.push(W);
      }
      Ae(f, {
        args: x,
        name: p[Ot],
        store: y,
        after: P,
        onError: R
      });
      let te;
      try {
        te = g.apply(this && this.$id === e ? this : y, x);
      } catch (W) {
        throw Ae(L, W), W;
      }
      return te instanceof Promise ? te.then((W) => (Ae(A, W), W)).catch((W) => (Ae(L, W), Promise.reject(W))) : (Ae(A, te), te);
    };
    return p[So] = !0, p[Ot] = b, p;
  }, M = /* @__PURE__ */ Se({
    actions: {},
    getters: {},
    state: [],
    hotState: T
  }), h = {
    _p: n,
    // _s: scope,
    $id: e,
    $onAction: No.bind(null, f),
    $patch: C,
    $reset: O,
    $subscribe(g, b = {}) {
      const p = No(_, g, b.detached, () => x()), x = r.run(() => Zt(() => n.state.value[e], (A) => {
        (b.flush === "sync" ? u : c) && g({
          storeId: e,
          type: pe.direct,
          events: v
        }, A);
      }, oe({}, l, b)));
      return p;
    },
    $dispose: N
  }, y = Rn(process.env.NODE_ENV !== "production" || process.env.NODE_ENV !== "production" && process.env.NODE_ENV !== "test" && ye ? oe(
    {
      _hmrPayload: M,
      _customProperties: Se(/* @__PURE__ */ new Set())
      // devtools custom properties
    },
    h
    // must be added later
    // setupStore
  ) : h);
  n._s.set(e, y);
  const j = (n._a && n._a.runWithContext || bs)(() => n._e.run(() => (r = zo()).run(() => t({ action: S }))));
  for (const g in j) {
    const b = j[g];
    if (Te(b) && !Lo(b) || Bt(b))
      process.env.NODE_ENV !== "production" && i ? nt(T.value, g, St(j, g)) : s || (I && Ms(b) && (Te(b) ? b.value = I[g] : Rt(b, I[g])), n.state.value[e][g] = b), process.env.NODE_ENV !== "production" && M.state.push(g);
    else if (typeof b == "function") {
      const p = process.env.NODE_ENV !== "production" && i ? b : S(b, g);
      j[g] = p, process.env.NODE_ENV !== "production" && (M.actions[g] = b), a.actions[g] = b;
    } else process.env.NODE_ENV !== "production" && Lo(b) && (M.getters[g] = s ? (
      // @ts-expect-error
      o.getters[g]
    ) : b, ye && (j._getters || // @ts-expect-error: same
    (j._getters = Se([]))).push(g));
  }
  if (oe(y, j), oe(He(y), j), Object.defineProperty(y, "$state", {
    get: () => process.env.NODE_ENV !== "production" && i ? T.value : n.state.value[e],
    set: (g) => {
      if (process.env.NODE_ENV !== "production" && i)
        throw new Error("cannot set hotState");
      C((b) => {
        oe(b, g);
      });
    }
  }), process.env.NODE_ENV !== "production" && (y._hotUpdate = Se((g) => {
    y._hotUpdating = !0, g._hmrPayload.state.forEach((b) => {
      if (b in y.$state) {
        const p = g.$state[b], x = y.$state[b];
        typeof p == "object" && De(p) && De(x) ? In(p, x) : g.$state[b] = x;
      }
      nt(y, b, St(g.$state, b));
    }), Object.keys(y.$state).forEach((b) => {
      b in g.$state || Ct(y, b);
    }), c = !1, u = !1, n.state.value[e] = St(g._hmrPayload, "hotState"), u = !0, At().then(() => {
      c = !0;
    });
    for (const b in g._hmrPayload.actions) {
      const p = g[b];
      nt(y, b, S(p, b));
    }
    for (const b in g._hmrPayload.getters) {
      const p = g._hmrPayload.getters[b], x = s ? (
        // special handling of options api
        $o(() => (Ye(n), p.call(y, y)))
      ) : p;
      nt(y, b, x);
    }
    Object.keys(y._hmrPayload.getters).forEach((b) => {
      b in g._hmrPayload.getters || Ct(y, b);
    }), Object.keys(y._hmrPayload.actions).forEach((b) => {
      b in g._hmrPayload.actions || Ct(y, b);
    }), y._hmrPayload = g._hmrPayload, y._getters = g._getters, y._hotUpdating = !1;
  })), process.env.NODE_ENV !== "production" && process.env.NODE_ENV !== "test" && ye) {
    const g = {
      writable: !0,
      configurable: !0,
      // avoid warning on devtools trying to display this property
      enumerable: !1
    };
    ["_p", "_hmrPayload", "_getters", "_customProperties"].forEach((b) => {
      Object.defineProperty(y, b, oe({ value: y[b] }, g));
    });
  }
  return n._p.forEach((g) => {
    if (process.env.NODE_ENV !== "production" && process.env.NODE_ENV !== "test" && ye) {
      const b = r.run(() => g({
        store: y,
        app: n._a,
        pinia: n,
        options: a
      }));
      Object.keys(b || {}).forEach((p) => y._customProperties.add(p)), oe(y, b);
    } else
      oe(y, r.run(() => g({
        store: y,
        app: n._a,
        pinia: n,
        options: a
      })));
  }), process.env.NODE_ENV !== "production" && y.$state && typeof y.$state == "object" && typeof y.$state.constructor == "function" && !y.$state.constructor.toString().includes("[native code]") && console.warn(`[🍍]: The "state" must be a plain object. It cannot be
	state: () => new MyClass()
Found in store "${y.$id}".`), I && s && o.hydrate && o.hydrate(y.$state, I), c = !0, u = !0, y;
}
/*! #__NO_SIDE_EFFECTS__ */
// @__NO_SIDE_EFFECTS__
function ks(e, t, o) {
  let n, i;
  const s = typeof t == "function";
  n = e, i = s ? o : t;
  function r(a, l) {
    const c = Yn();
    if (a = // in test mode, ignore the argument provided as we can always retrieve a
    // pinia instance with getActivePinia()
    (process.env.NODE_ENV === "test" && We && We._testing ? null : a) || (c ? Gn(fn, null) : null), a && Ye(a), process.env.NODE_ENV !== "production" && !We)
      throw new Error(`[🍍]: "getActivePinia()" was called but there was no active Pinia. Are you trying to use a store before calling "app.use(pinia)"?
See https://pinia.vuejs.org/core-concepts/outside-component-usage.html for help.
This will fail in production.`);
    a = We, a._s.has(n) || (s ? Wt(n, t, i, a) : To(n, i, a), process.env.NODE_ENV !== "production" && (r._pinia = a));
    const u = a._s.get(n);
    if (process.env.NODE_ENV !== "production" && l) {
      const _ = "__hot:" + n, f = s ? Wt(_, t, i, a, !0) : To(_, oe({}, i), a, !0);
      l._hotUpdate(f), delete a.state.value[_], a._s.delete(_);
    }
    if (process.env.NODE_ENV !== "production" && ye) {
      const _ = Po();
      if (_ && _.proxy && // avoid adding stores that are just built for hot module replacement
      !l) {
        const f = _.proxy, v = "_pStores" in f ? f._pStores : f._pStores = {};
        v[n] = u;
      }
    }
    return u;
  }
  return r.$id = n, r;
}
var B = /* @__PURE__ */ ((e) => (e.templates = "templates", e.styling = "styling", e.preferences = "preferences", e.wording = "wording", e.test = "test", e.output = "output", e))(B || {}), F = /* @__PURE__ */ ((e) => (e.html = "html", e.json = "json", e))(F || {});
const Do = [
  "brand-hue",
  "brand-lightness",
  "brand-saturation",
  "brand",
  "app-background-color",
  "text1",
  "surface1",
  "text2",
  "surface2",
  "neutral",
  "neutral-dim",
  "text-muted",
  "links",
  "spacing",
  "top-display",
  "bottom-display",
  "font",
  "font-family",
  "font-size",
  "font-weight",
  "font-style",
  "font-variant",
  "font-size-adjust",
  "font-stretch",
  "font-effect",
  "font-emphasize",
  "font-emphasize-position",
  "font-emphasize-style",
  "font-smooth",
  "line-height",
  "position",
  "z-index",
  "top",
  "right",
  "bottom",
  "left",
  "display",
  "visibility",
  "float",
  "clear",
  "overflow",
  "overflow-x",
  "overflow-y",
  "clip",
  "zoom",
  "align-content",
  "align-items",
  "align-self",
  "flex",
  "flex-flow",
  "flex-direction",
  "flex-grow",
  "flex-shrink",
  "flex-basis-base",
  "flex-basis",
  "flex-wrap",
  "justify-content",
  "gap",
  "order",
  "box-sizing",
  "width",
  "min-width",
  "max-width-base",
  "max-width",
  "height",
  "min-height",
  "max-height-base",
  "max-height",
  "margin",
  "margin-top",
  "margin-right",
  "margin-bottom",
  "margin-left",
  "padding",
  "padding-top",
  "padding-right",
  "padding-bottom",
  "padding-left",
  "table-layout",
  "empty-cells",
  "caption-side",
  "border-spacing",
  "border-collapse",
  "list-style",
  "list-style-position",
  "list-style-type",
  "list-style-image",
  "content",
  "quotes",
  "counter-reset",
  "counter-increment",
  "resize",
  "cursor",
  "user-select",
  "nav-index",
  "nav-up",
  "nav-right",
  "nav-down",
  "nav-left",
  "transition",
  "transition-delay",
  "transition-timing-function",
  "transition-duration",
  "transition-property",
  "transform",
  "transform-origin",
  "animation",
  "animation-name",
  "animation-duration",
  "animation-play-state",
  "animation-timing-function",
  "animation-delay",
  "animation-iteration-count",
  "animation-direction",
  "text-align",
  "text-align-last",
  "vertical-align",
  "white-space",
  "text-decoration",
  "text-emphasis",
  "text-emphasis-color",
  "text-emphasis-style",
  "text-emphasis-position",
  "text-indent",
  "text-justify",
  "letter-spacing",
  "word-spacing",
  "text-outline",
  "text-transform",
  "text-wrap",
  "text-overflow",
  "text-overflow-ellipsis",
  "text-overflow-mode",
  "word-wrap",
  "word-break",
  "tab-size",
  "hyphens",
  "pointer-events",
  "opacity",
  "filter:progid:DXImageTransform.Microsoft.Alpha(Opacity",
  "color",
  "background-color",
  "border",
  "border-width",
  "border-style",
  "border-color",
  "border-top",
  "border-top-width",
  "border-top-style",
  "border-top-color",
  "border-right",
  "border-right-width",
  "border-right-style",
  "border-right-color",
  "border-bottom",
  "border-bottom-width",
  "border-bottom-style",
  "border-bottom-color",
  "border-left",
  "border-left-width",
  "border-left-style",
  "border-left-color",
  "border-radius",
  "border-top-left-radius",
  "border-top-right-radius",
  "border-bottom-right-radius",
  "border-bottom-left-radius",
  "border-image",
  "border-image-source",
  "border-image-slice",
  "border-image-width",
  "border-image-outset",
  "border-image-repeat",
  "outline",
  "outline-width",
  "outline-style",
  "outline-color",
  "outline-offset",
  "background",
  "filter:progid:DXImageTransform.Microsoft.AlphaImageLoader",
  "background-image",
  "background-repeat",
  "background-attachment",
  "background-position",
  "background-position-x",
  "background-position-y",
  "background-clip",
  "background-origin",
  "background-size",
  "box-decoration-break",
  "box-shadow",
  "filter:progid:DXImageTransform.Microsoft.gradient",
  "text-shadow"
], dt = "--tvk_";
function Kt(e) {
  const t = e.replace(dt, ""), o = t.split("_"), n = o.slice(0, -1), i = o[o.length - 1];
  return {
    keyWithoutPrefix: t,
    nameSpace: o,
    categories: n,
    name: i
  };
}
function Co(e, t, o) {
  const n = o[0], i = o[1], s = Kt(n);
  let r = e.find((a) => a.key === n);
  r ? t ? r.initialValue = i : r.value = i : e.push({
    key: n,
    value: i,
    initialValue: i,
    categories: s.categories,
    name: s.name
  });
}
function Xt() {
  const e = [];
  Array.from(document.styleSheets).forEach((o) => {
    Array.from(o.cssRules).forEach((n) => {
      if (n instanceof CSSStyleRule && n.selectorText === ":root") {
        let i = !!n.style.getPropertyValue(
          "--tvk--default-sheet"
        );
        n.styleMap ? Array.from(n.styleMap).forEach((s) => {
          s[0].startsWith(dt) && Co(e, i, s);
        }) : Array.from(n.style).forEach((s) => {
          if (s.startsWith(dt)) {
            let r = /\{(.*?)\}/.exec(n.cssText);
            r && r[1].split(";").forEach((c) => {
              const u = c.trim().split(":");
              u[0].startsWith(dt) && (u[1] = u[1].trim(), Co(e, i, u));
            });
          }
        });
      }
    });
  });
  let t = document.documentElement;
  return Array.from(t.style).forEach((o) => {
    const n = e.find((i) => i.key === o);
    n && (n.value = t.style.getPropertyValue(o));
  }), e.sort((o, n) => {
    const i = Do.indexOf(o.name), s = Do.indexOf(n.name);
    return i > -1 && s > -1 ? i - s : i > -1 ? -1 : s > -1 ? 1 : o.name < n.name ? -1 : o.name > n.name ? 1 : 0;
  }), e;
}
function Is(e) {
  const t = [];
  e.forEach((n) => {
    t.indexOf(n.categories[0]) < 0 && t.push(n.categories[0]);
  });
  const o = [
    "colors",
    "base",
    "wrapper",
    "messages",
    "message",
    "footnotes",
    "side-footnotes",
    "question",
    "button",
    "card",
    "thumbnail"
  ];
  return t.sort(function(n, i) {
    return o.indexOf(n) - o.indexOf(i);
  });
}
function jn(e, t, o = !0) {
  for (let n = 0; n < e.length; n++)
    if (o && t.length !== e.length || t[n] !== e[n]) return !1;
  return !0;
}
function xs(e, t) {
  return e.filter((n) => jn(t, n.categories));
}
function js(e, t) {
  let o = e.filter((s) => jn(t, s.categories, !1));
  const n = [];
  o.forEach((s) => {
    if (s.categories.length > t.length) {
      const r = s.categories[t.length];
      n.indexOf(r) < 0 && n.push(r);
    }
  });
  const i = [
    "bot",
    "user",
    "header",
    "avatar",
    "body",
    "footnotes",
    "footnote",
    "loader"
  ];
  return n.sort(function(s, r) {
    return i.indexOf(s) - i.indexOf(r);
  }), n;
}
function it(e, t = 300) {
  let o;
  return (...n) => {
    clearTimeout(o), o = setTimeout(() => {
      e(...n);
    }, t);
  };
}
function Oo(e) {
  return !!(e && typeof e == "object" && !Array.isArray(e));
}
async function Nn(e) {
  if (navigator.clipboard)
    await navigator.clipboard.writeText(e);
  else {
    const t = document.createElement("textarea");
    t.value = e, document.body.appendChild(t), t.focus(), t.select();
    try {
      document.execCommand("copy");
    } catch (o) {
      console.error("unable to copy to clipboard", o);
    }
    document.body.removeChild(t);
  }
}
function Ns() {
  let e = "light";
  const t = document.documentElement.getAttribute("data-theme");
  if (t && ["light", "dark"].includes(t))
    e = t === "light" ? "light" : "dark";
  else {
    const o = document.documentElement.getAttribute("data-bs-theme");
    o && ["light", "dark"].includes(o) ? e = o === "light" ? "light" : "dark" : window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches && (e = "dark");
  }
  return e;
}
const ee = /* @__PURE__ */ ks("editorStore", () => {
  const e = Y(B.templates), t = Y("colors"), o = Y(void 0), n = Y(F.html), i = Y(!1), s = Y(!1);
  function r() {
  }
  function a(I) {
    e.value = I, setTimeout(() => {
      ee().refreshEditorPanels();
    });
  }
  function l(I) {
    t.value = I;
  }
  function c(I) {
    n.value = I, ee().refreshEditorPanels();
  }
  function u(I) {
    i.value = I, ee().refreshEditorPanels();
  }
  function _(I) {
    v();
    const T = ee(), D = Kt(I);
    if (D.nameSpace[0] === "colors" && ![
      "brand",
      "brand-hue",
      "brand-lightness",
      "brand-saturation",
      "light",
      "dark"
    ].includes(D.nameSpace[1])) {
      const C = Ns();
      let O = I.split("_");
      O.splice(2, 0, C), I = O.join("_");
    }
    T.setStylingCategory(D.categories[0]), setTimeout(() => {
      T.targetStylingVariable(I);
    });
  }
  function f(I) {
    o.value = I;
  }
  function v() {
    o.value = void 0;
  }
  return {
    editorPanel: e,
    stylingCategory: t,
    stylingTargetedVar: o,
    outputFormat: n,
    outputMinified: i,
    templateDirtyState: s,
    refreshEditorPanels: r,
    setEditorPanel: a,
    setStylingCategory: l,
    jumpToStylingVariable: _,
    targetStylingVariable: f,
    stylingVariableReached: v,
    setOutputFormat: c,
    minifyOutput: u
  };
}), Ss = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KDTwhLS0gVXBsb2FkZWQgdG86IFNWRyBSZXBvLCB3d3cuc3ZncmVwby5jb20sIEdlbmVyYXRvcjogU1ZHIFJlcG8gTWl4ZXIgVG9vbHMgLS0+Cjxzdmcgd2lkdGg9IjgwMHB4IiBoZWlnaHQ9IjgwMHB4IiB2aWV3Qm94PSIwIDAgMTI4IDEyOCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgYXJpYS1oaWRkZW49InRydWUiIHJvbGU9ImltZyIgY2xhc3M9Imljb25pZnkgaWNvbmlmeS0tbm90byIgcHJlc2VydmVBc3BlY3RSYXRpbz0ieE1pZFlNaWQgbWVldCI+Cg08cGF0aCBkPSJNOTguOSA3OS44NWMtMS4yNS0yLjI3LjM0LTQuNTggMy4wNi03LjQ0YzQuMzEtNC41NCA5LTE1LjA3IDQuNjQtMjUuNzZjLjAzLS4wNi0uODYtMS44Ni0uODMtMS45MmwtMS43OS0uMDljLS41Ny0uMDgtMjAuMjYtLjEyLTM5Ljk3LS4xMmMtMTkuNzEgMC0zOS4zOS4wNC0zOS45Ny4xMmMwIDAtMi42NSAxLjk1LTIuNjMgMi4wMWMtNC4zNSAxMC42OS4zMyAyMS4yMiA0LjY0IDI1Ljc2YzIuNzEgMi44NiA0LjMgNS4xNyAzLjA2IDcuNDRjLTEuMjEgMi4yMS00LjgxIDIuNTMtNC44MSAyLjUzcy44MyAyLjI2IDIuODMgMy40OGMxLjg1IDEuMTMgNC4xMyAxLjM5IDUuNyAxLjQzYzAgMCA2LjE1IDguNTEgMjIuMjMgOC41MWgxNy45YzE2LjA4IDAgMjIuMjMtOC41MSAyMi4yMy04LjUxYzEuNTctLjA0IDMuODUtLjMgNS43LTEuNDNjMi0xLjIyIDIuODMtMy40OCAyLjgzLTMuNDhzLTMuNjEtLjMyLTQuODItMi41M3oiIGZpbGw9IiNlNjNkMDAiPgoNPC9wYXRoPgoNPHJhZGlhbEdyYWRpZW50IGlkPSJJY29uaWZ5SWQxN2VjZGIyOTA0ZDE3OGVhYjE3OTI4IiBjeD0iOTguNzUyIiBjeT0iODMuNjAxIiByPSIyMy40MTkiIGdyYWRpZW50VHJhbnNmb3JtPSJtYXRyaXgoMSAwIDAgLS40OTEyIC0xOS4yODMgMTI0LjY2NSkiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIj4KDTxzdG9wIG9mZnNldD0iLjY5OSIgc3RvcC1jb2xvcj0iI2Y5OGIyNSIgc3RvcC1vcGFjaXR5PSIwIj4KDTwvc3RvcD4KDTxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iI2Y5OGIyNSI+Cg08L3N0b3A+Cg08L3JhZGlhbEdyYWRpZW50PgoNPHBhdGggZD0iTTYzLjk5IDk1Ljc5di05LjQ0bDI4LjU3LTIuMjZsMi42IDMuMnMtNi4xNSA4LjUxLTIyLjIzIDguNTFsLTguOTQtLjAxeiIgZmlsbD0idXJsKCNJY29uaWZ5SWQxN2VjZGIyOTA0ZDE3OGVhYjE3OTI4KSI+Cg08L3BhdGg+Cg08cmFkaWFsR3JhZGllbnQgaWQ9Ikljb25pZnlJZDE3ZWNkYjI5MDRkMTc4ZWFiMTc5MjkiIGN4PSI3Ni41NzMiIGN5PSI3OC42NjgiIHI9IjYuOTIxIiBncmFkaWVudFRyYW5zZm9ybT0ibWF0cml4KC0uOTA1NyAuNDIzOCAuMzE0NCAuNjcxOSAxNDYuMjcgLTYuNjQ0KSIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiPgoNPHN0b3Agb2Zmc2V0PSIwIiBzdG9wLWNvbG9yPSIjZjk4YjI1Ij4KDTwvc3RvcD4KDTxzdG9wIG9mZnNldD0iLjg3MiIgc3RvcC1jb2xvcj0iI2Y5OGIyNSIgc3RvcC1vcGFjaXR5PSIwIj4KDTwvc3RvcD4KDTwvcmFkaWFsR3JhZGllbnQ+Cg08cGF0aCBkPSJNOTUuMSA4My4xNmMtNC4yOC02LjUgNS4yMS04LjkzIDUuMjEtOC45M2wuMDEuMDFjLTEuNjUgMi4wNS0yLjQgMy44NC0xLjQzIDUuNjFjMS4yMSAyLjIxIDQuODEgMi41MyA0LjgxIDIuNTNzLTQuOTEgNC4zNi04LjYuNzh6IiBmaWxsPSJ1cmwoI0ljb25pZnlJZDE3ZWNkYjI5MDRkMTc4ZWFiMTc5MjkpIj4KDTwvcGF0aD4KDTxyYWRpYWxHcmFkaWVudCBpZD0iSWNvbmlmeUlkMTdlY2RiMjkwNGQxNzhlYWIxNzkzMCIgY3g9IjkwLjkzIiBjeT0iNTkuMjc5IiByPSIzMC4zOTkiIGdyYWRpZW50VHJhbnNmb3JtPSJtYXRyaXgoLS4wNzQ2IC0uOTk3MiAtLjgzMTEgLjA2MjIgMTQzLjM0MyAxNDYuMjY5KSIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiPgoNPHN0b3Agb2Zmc2V0PSIuNjk5IiBzdG9wLWNvbG9yPSIjZjk4YjI1IiBzdG9wLW9wYWNpdHk9IjAiPgoNPC9zdG9wPgoNPHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjZjk4YjI1Ij4KDTwvc3RvcD4KDTwvcmFkaWFsR3JhZGllbnQ+Cg08cGF0aCBkPSJNMTA2LjYyIDQ2LjY1YzQuMjUgMTAuMzUtLjIyIDIxLjAxLTQuNDEgMjUuNTFjLS41OC42Mi0zLjAxIDMuMDEtMy41NyA0LjkyYzAgMC05LjU0LTEzLjMxLTEyLjM5LTIxLjEzYy0uNTgtMS41OC0xLjEtMy4yLTEuMTctNC44OGMtLjA1LTEuMjYuMTQtMi43Ni44Ny0zLjgyYy44OS0xLjMxIDIwLjE2LTEuNyAyMC4xNi0xLjdsLjUxIDEuMXoiIGZpbGw9InVybCgjSWNvbmlmeUlkMTdlY2RiMjkwNGQxNzhlYWIxNzkzMCkiPgoNPC9wYXRoPgoNPHJhZGlhbEdyYWRpZW50IGlkPSJJY29uaWZ5SWQxN2VjZGIyOTA0ZDE3OGVhYjE3OTMxIiBjeD0iNDEuNTM0IiBjeT0iNjIuNjQ1IiByPSIzMC4zOTkiIGdyYWRpZW50VHJhbnNmb3JtPSJtYXRyaXgoLjA3NDYgLS45OTcyIC44MzExIC4wNjIyIC0xMy42MyAxMDAuMTY2KSIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiPgoNPHN0b3Agb2Zmc2V0PSIuNjk5IiBzdG9wLWNvbG9yPSIjZjk4YjI1IiBzdG9wLW9wYWNpdHk9IjAiPgoNPC9zdG9wPgoNPHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjZjk4YjI1Ij4KDTwvc3RvcD4KDTwvcmFkaWFsR3JhZGllbnQ+Cg08cGF0aCBkPSJNMjEuNCA0Ni42NWMtNC4yNCAxMC4zNS4yMyAyMS4wMSA0LjQxIDI1LjVjLjU4LjYyIDMuMDEgMy4wMSAzLjU3IDQuOTJjMCAwIDkuNTQtMTMuMzEgMTIuMzktMjEuMTNjLjU4LTEuNTggMS4xLTMuMiAxLjE3LTQuODhjLjA1LTEuMjYtLjE0LTIuNzYtLjg3LTMuODJjLS44OS0xLjMxLTEuOTMtLjk2LTMuNDQtLjk2Yy0yLjg4IDAtMTUuNDktLjc0LTE2LjQ3LS43NGMuMDEuMDEtLjc2IDEuMTEtLjc2IDEuMTF6IiBmaWxsPSJ1cmwoI0ljb25pZnlJZDE3ZWNkYjI5MDRkMTc4ZWFiMTc5MzEpIj4KDTwvcGF0aD4KDTxyYWRpYWxHcmFkaWVudCBpZD0iSWNvbmlmeUlkMTdlY2RiMjkwNGQxNzhlYWIxNzkzMiIgY3g9IjQ4Ljg4NSIgY3k9IjgzLjUzOCIgcj0iMjMuNDE5IiBncmFkaWVudFRyYW5zZm9ybT0ibWF0cml4KC0xIDAgMCAtLjQ5MTIgOTcuNzcgMTI0LjU3MikiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIj4KDTxzdG9wIG9mZnNldD0iLjY5OSIgc3RvcC1jb2xvcj0iI2Y5OGIyNSIgc3RvcC1vcGFjaXR5PSIwIj4KDTwvc3RvcD4KDTxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iI2Y5OGIyNSI+Cg08L3N0b3A+Cg08L3JhZGlhbEdyYWRpZW50PgoNPHBhdGggZD0iTTY0LjAzIDk1Ljc5di05LjQ0bC0yOC41Ny0yLjI2bC0yLjYgMy4yczYuMTUgOC41MSAyMi4yMyA4LjUxbDguOTQtLjAxeiIgZmlsbD0idXJsKCNJY29uaWZ5SWQxN2VjZGIyOTA0ZDE3OGVhYjE3OTMyKSI+Cg08L3BhdGg+Cg08cmFkaWFsR3JhZGllbnQgaWQ9Ikljb25pZnlJZDE3ZWNkYjI5MDRkMTc4ZWFiMTc5MzMiIGN4PSIyNi4zNzQiIGN5PSI3OC42NjgiIHI9IjYuOTIxIiBncmFkaWVudFRyYW5zZm9ybT0ibWF0cml4KC45MDU3IC40MjM4IC0uMzE0NCAuNjcxOSAyNy4yMiAxNC42MzIpIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+Cg08c3RvcCBvZmZzZXQ9IjAiIHN0b3AtY29sb3I9IiNmOThiMjUiPgoNPC9zdG9wPgoNPHN0b3Agb2Zmc2V0PSIuOTQ0IiBzdG9wLWNvbG9yPSIjZjk4YjI1IiBzdG9wLW9wYWNpdHk9IjAiPgoNPC9zdG9wPgoNPC9yYWRpYWxHcmFkaWVudD4KDTxwYXRoIGQ9Ik0zMi45MyA4My4xNmM0LjI4LTYuNS01LjIxLTguOTMtNS4yMS04LjkzbC0uMDEuMDFjMS42NSAyLjA1IDIuNCAzLjg0IDEuNDMgNS42MWMtMS4yMSAyLjIxLTQuODEgMi41My00LjgxIDIuNTNzNC45IDQuMzYgOC42Ljc4eiIgZmlsbD0idXJsKCNJY29uaWZ5SWQxN2VjZGIyOTA0ZDE3OGVhYjE3OTMzKSI+Cg08L3BhdGg+Cg08Zz4KDTxsaW5lYXJHcmFkaWVudCBpZD0iSWNvbmlmeUlkMTdlY2RiMjkwNGQxNzhlYWIxNzkzNCIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiIHgxPSI2NCIgeTE9Ijk0LjU2NSIgeDI9IjY0IiB5Mj0iMTIyLjExIj4KDTxzdG9wIG9mZnNldD0iMCIgc3RvcC1jb2xvcj0iI2Y3OGMxZiI+Cg08L3N0b3A+Cg08c3RvcCBvZmZzZXQ9Ii40OTQiIHN0b3AtY29sb3I9IiNmMzdmMjEiPgoNPC9zdG9wPgoNPHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjZWQ2ZDIzIj4KDTwvc3RvcD4KDTwvbGluZWFyR3JhZGllbnQ+Cg08cGF0aCBkPSJNNjQuMTMgOTQuNjhINjRjLTI1LjQ5LjAzLTUxLjEzIDcuNS01MS4xMyAyNS4yOFYxMjRoMTAyLjI3di00LjA0Yy0uMDEtMTYuNzYtMjUuNDEtMjUuMjgtNTEuMDEtMjUuMjh6IiBmaWxsPSJ1cmwoI0ljb25pZnlJZDE3ZWNkYjI5MDRkMTc4ZWFiMTc5MzQpIj4KDTwvcGF0aD4KDTwvZz4KDTxnPgoNPHBhdGggZD0iTTU0LjkyIDkwLjA4djkuOThjMCA0LjUxIDMuNyA4LjE3IDguMjYgOC4xN2gxLjY1YzQuNTYgMCA4LjI2LTMuNjYgOC4yNi04LjE3di05Ljk4SDU0LjkyeiIgZmlsbD0iI2VkYzM5MSI+Cg08L3BhdGg+Cg08L2c+Cg08Zz4KDTxwYXRoIGQ9Ik05MS4zMyA1MC40M0gzNi42N2MtNS44OSAwLTEwLjcxIDUuMTQtMTAuNzEgMTEuNDFzNC44MiAxMS40MSAxMC43MSAxMS40MWg1NC42NWM1Ljg5IDAgMTAuNzEtNS4xNCAxMC43MS0xMS40MXMtNC44MS0xMS40MS0xMC43LTExLjQxeiIgZmlsbD0iI2VkYzM5MSI+Cg08L3BhdGg+Cg08L2c+Cg08Zz4KDTxwYXRoIGQ9Ik02NCAxMS4wN2MtMTcuNCAwLTMzLjUyIDE4LjYxLTMzLjUyIDQ1LjM5YzAgMjYuNjQgMTYuNjEgMzkuODEgMzMuNTIgMzkuODFTOTcuNTIgODMuMSA5Ny41MiA1Ni40NmMwLTI2Ljc4LTE2LjEyLTQ1LjM5LTMzLjUyLTQ1LjM5eiIgZmlsbD0iI2Y5ZGRiZCI+Cg08L3BhdGg+Cg08L2c+Cg08ZyBmaWxsPSIjMzEyZDJkIj4KDTxlbGxpcHNlIGN4PSI0Ny41NiIgY3k9IjU4LjgxIiByeD0iNC45MyIgcnk9IjUuMSI+Cg08L2VsbGlwc2U+Cg08ZWxsaXBzZSBjeD0iODAuNDQiIGN5PSI1OC44MSIgcng9IjQuOTMiIHJ5PSI1LjEiPgoNPC9lbGxpcHNlPgoNPC9nPgoNPGcgZmlsbD0iIzQ1NDE0MCI+Cg08cGF0aCBkPSJNNTQuOTggNDkuODJjLS45My0xLjIzLTMuMDctMy4wMS03LjIzLTMuMDFzLTYuMzEgMS43OS03LjIzIDMuMDFjLS40MS41NC0uMzEgMS4xNy0uMDIgMS41NWMuMjYuMzUgMS4wNC42OCAxLjkuMzljLjg2LS4yOSAyLjU0LTEuMTYgNS4zNS0xLjE4YzIuODEuMDIgNC40OS44OSA1LjM1IDEuMThjLjg2LjI5IDEuNjQtLjAzIDEuOS0uMzljLjI5LS4zOC4zOS0xLjAxLS4wMi0xLjU1eiI+Cg08L3BhdGg+Cg08cGF0aCBkPSJNODcuNDggNDkuODJjLS45My0xLjIzLTMuMDctMy4wMS03LjIzLTMuMDFzLTYuMzEgMS43OS03LjIzIDMuMDFjLS40MS41NC0uMzEgMS4xNy0uMDIgMS41NWMuMjYuMzUgMS4wNC42OCAxLjkuMzljLjg2LS4yOSAyLjU0LTEuMTYgNS4zNS0xLjE4YzIuODEuMDIgNC40OS44OSA1LjM1IDEuMThjLjg2LjI5IDEuNjQtLjAzIDEuOS0uMzljLjI5LS4zOC4zOS0xLjAxLS4wMi0xLjU1eiI+Cg08L3BhdGg+Cg08L2c+Cg08cGF0aCBkPSJNNjcuODYgNjguMDZjLS4xMS0uMDQtLjIxLS4wNy0uMzItLjA4aC03LjA3Yy0uMTEuMDEtLjIyLjA0LS4zMi4wOGMtLjY0LjI2LS45OS45Mi0uNjkgMS42M2MuMy43MSAxLjcxIDIuNjkgNC41NSAyLjY5czQuMjUtMS45OSA0LjU1LTIuNjljLjI5LS43MS0uMDYtMS4zNy0uNy0xLjYzeiIgZmlsbD0iI2RiYTY4OSI+Cg08L3BhdGg+Cg08cGF0aCBkPSJNNzIuNDIgNzYuMTRjLTMuMTkgMS44OS0xMy42MyAxLjg5LTE2LjgxIDBjLTEuODMtMS4wOS0zLjcuNTgtMi45NCAyLjI0Yy43NSAxLjYzIDYuNDUgNS40MiAxMS4zNyA1LjQyczEwLjU1LTMuNzkgMTEuMy01LjQyYy43NS0xLjY2LTEuMDktMy4zMy0yLjkyLTIuMjR6IiBmaWxsPSIjNDQ0Ij4KDTwvcGF0aD4KDTxnPgoNPHBhdGggZD0iTTEwNC4wNyAyNS4xMWMtMi40NC0zLjctNy45MS04LjY0LTEyLjgyLTguOTdjLS43OS00LjcyLTUuODQtOC43Mi0xMC43My0xMC4yN2MtMTMuMjMtNC4xOS0yMS44NC41MS0yNi40NiAzLjA0Yy0uOTYuNTMtNy4xNyAzLjk3LTExLjUxIDEuNWMtMi43Mi0xLjU1LTIuNjctNS43NC0yLjY3LTUuNzRzLTguNTMgMy4yNS01LjYxIDEyLjI5Yy0yLjkzLjEyLTYuNzcgMS4zNi04LjggNS40N2MtMi40MiA0LjktMS41NiA4Ljk5LS44NiAxMC45NWMtMi41MiAyLjE0LTUuNjkgNi42OS0zLjUyIDEyLjZjMS42NCA0LjQ1IDguMTcgNi41IDguMTcgNi41Yy0uNDYgOC4wMSAxLjAzIDEyLjk0IDEuODIgMTQuOTRjLjE0LjM1LjYzLjMyLjcyLS4wNGMuOTktMy45NiA0LjM3LTE3LjggNC4wMy0yMC4yMWMwIDAgMTEuMzUtMi4yNSAyMi4xNy0xMC4yMmMyLjItMS42MiA0LjU5LTMgNy4xMy00LjAyYzEzLjU5LTUuNDEgMTYuNDQgMy44MiAxNi40NCAzLjgyczkuNDItMS44MSAxMi4yNiAxMS4yN2MxLjA3IDQuOSAxLjggMTIuNzUgMi40IDE4LjI0Yy4wNC4zOS41Ny40Ny43My4xMWMuOTUtMi4xOCAyLjg1LTYuNSAzLjMtMTAuOTFjLjE2LTEuNTUgNC4zNC0zLjYgNi4xNC0xMC4yNmMyLjM5LTguODgtLjU2LTE3LjQyLTIuMzMtMjAuMDl6IiBmaWxsPSIjZTYzZDAwIj4KDTwvcGF0aD4KDTxyYWRpYWxHcmFkaWVudCBpZD0iSWNvbmlmeUlkMTdlY2RiMjkwNGQxNzhlYWIxNzkzNSIgY3g9Ijg0LjYyNSIgY3k9IjQxLjQ3NCIgcj0iMzUuNjMzIiBncmFkaWVudFRyYW5zZm9ybT0ibWF0cml4KC4zMDc2IC45NTE1IC0uNzA2IC4yMjgyIDg3Ljg3MyAtNDguNTEzKSIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiPgoNPHN0b3Agb2Zmc2V0PSIuNjk5IiBzdG9wLWNvbG9yPSIjZjk4YjI1IiBzdG9wLW9wYWNpdHk9IjAiPgoNPC9zdG9wPgoNPHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjZjk4YjI1Ij4KDTwvc3RvcD4KDTwvcmFkaWFsR3JhZGllbnQ+Cg08cGF0aCBkPSJNMTAwLjIyIDU1LjVjLjE2LTEuNTUgNC4zNC0zLjYgNi4xNC0xMC4yNmMuMTktLjcxLjM1LTEuNDMuNS0yLjE1YzEuNDYtOC4wOS0xLjE2LTE1LjUyLTIuNzktMTcuOThjLTIuMjYtMy40Mi03LjEtNy44OS0xMS43LTguODFjLS40LS4wNS0uNzktLjEtMS4xNi0uMTJjMCAwIC4zMyAyLjE1LS41NCAzLjg2Yy0xLjEyIDIuMjItMy40MSAyLjc1LTMuNDEgMi43NWMxMS45OCAxMS45OCAxMS4xMiAyMiAxMi45NiAzMi43MXoiIGZpbGw9InVybCgjSWNvbmlmeUlkMTdlY2RiMjkwNGQxNzhlYWIxNzkzNSkiPgoNPC9wYXRoPgoNPHJhZGlhbEdyYWRpZW50IGlkPSJJY29uaWZ5SWQxN2VjZGIyOTA0ZDE3OGVhYjE3OTM2IiBjeD0iNDcuMjgiIGN5PSI0LjIiIHI9IjkuMzQzIiBncmFkaWVudFRyYW5zZm9ybT0ibWF0cml4KC44ODEzIC40NzI2IC0uNTYwMyAxLjA0NSA3Ljk2NiAtMjIuNTMyKSIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiPgoNPHN0b3Agb2Zmc2V0PSIuMzkzIiBzdG9wLWNvbG9yPSIjZjk4YjI1Ij4KDTwvc3RvcD4KDTxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iI2Y5OGIyNSIgc3RvcC1vcGFjaXR5PSIwIj4KDTwvc3RvcD4KDTwvcmFkaWFsR3JhZGllbnQ+Cg08cGF0aCBkPSJNNTYuOTUgNy4zOWMtMS4wOS41My0yLjA2IDEuMDYtMi44OSAxLjUxYy0uOTYuNTMtNy4xNyAzLjk3LTExLjUxIDEuNWMtMi42Ny0xLjUyLTIuNjctNS41OC0yLjY3LTUuNzJjLTEuMjMgMS41Ny00Ljk1IDEyLjc4IDUuOTMgMTMuNTNjNC42OS4zMiA3LjU4LTMuNzcgOS4zLTcuMjNjLjYxLTEuMjcgMS41OC0zLjEgMS44NC0zLjU5eiIgZmlsbD0idXJsKCNJY29uaWZ5SWQxN2VjZGIyOTA0ZDE3OGVhYjE3OTM2KSI+Cg08L3BhdGg+Cg08cmFkaWFsR3JhZGllbnQgaWQ9Ikljb25pZnlJZDE3ZWNkYjI5MDRkMTc4ZWFiMTc5MzciIGN4PSIxNjAuMzEyIiBjeT0iNjIuNTM4IiByPSIzNS40MSIgZ3JhZGllbnRUcmFuc2Zvcm09Im1hdHJpeCgtLjkzNzggLS4zOTQ0IC4yMTgyIC0uNTI4NSAyMDYuNzk1IDExOS41OCkiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIj4KDTxzdG9wIG9mZnNldD0iLjcwOSIgc3RvcC1jb2xvcj0iI2Y5OGIyNSIgc3RvcC1vcGFjaXR5PSIwIj4KDTwvc3RvcD4KDTxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iI2Y5OGIyNSI+Cg08L3N0b3A+Cg08L3JhZGlhbEdyYWRpZW50PgoNPHBhdGggZD0iTTc5LjE2IDUuNDdjNy4zMiAxLjk4IDEwLjg5IDUuNzEgMTIuMDggMTAuNjhjLjM1IDEuNDYuNzcgMTUuMDgtMjUuMjMtLjRjLTkuNjctNS43Ni03LjAzLTkuMzYtNS45LTkuNzdjNC40Mi0xLjYgMTAuODUtMi43MyAxOS4wNS0uNTF6IiBmaWxsPSJ1cmwoI0ljb25pZnlJZDE3ZWNkYjI5MDRkMTc4ZWFiMTc5MzcpIj4KDTwvcGF0aD4KDTxyYWRpYWxHcmFkaWVudCBpZD0iSWNvbmlmeUlkMTdlY2RiMjkwNGQxNzhlYWIxNzkzOCIgY3g9IjQ2LjM2OSIgY3k9IjE1Ljk2MiIgcj0iMTMuMDk5IiBncmFkaWVudFRyYW5zZm9ybT0ibWF0cml4KDEgMCAwIDEuMjIzMyAwIC0zLjU2NCkiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIj4KDTxzdG9wIG9mZnNldD0iLjc4NiIgc3RvcC1jb2xvcj0iI2Y5OGIyNSIgc3RvcC1vcGFjaXR5PSIwIj4KDTwvc3RvcD4KDTxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iI2Y5OGIyNSI+Cg08L3N0b3A+Cg08L3JhZGlhbEdyYWRpZW50PgoNPHBhdGggZD0iTTM5Ljg0IDQuNjhjLS4wMS4wMS0uMDMuMDEtLjA2LjAyaC0uMDFjLS45My4zOS04LjI0IDMuNzgtNS41MSAxMi4yNmw3Ljc4IDEuMjVjLTYuODktNi45OC0yLjE3LTEzLjU1LTIuMTctMTMuNTVzLS4wMi4wMS0uMDMuMDJ6IiBmaWxsPSJ1cmwoI0ljb25pZnlJZDE3ZWNkYjI5MDRkMTc4ZWFiMTc5MzgpIj4KDTwvcGF0aD4KDTxyYWRpYWxHcmFkaWVudCBpZD0iSWNvbmlmeUlkMTdlY2RiMjkwNGQxNzhlYWIxNzkzOSIgY3g9IjM4LjE1MyIgY3k9IjI1LjQ0MiIgcj0iMTYuMDgzIiBncmFkaWVudFRyYW5zZm9ybT0ibWF0cml4KC0uOTY1NyAtLjI1OTggLjI0MzIgLS45MDM3IDY4LjgxIDU4LjM0NykiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIj4KDTxzdG9wIG9mZnNldD0iLjUwMyIgc3RvcC1jb2xvcj0iI2Y5OGIyNSIgc3RvcC1vcGFjaXR5PSIwIj4KDTwvc3RvcD4KDTxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iI2Y5OGIyNSI+Cg08L3N0b3A+Cg08L3JhZGlhbEdyYWRpZW50PgoNPHBhdGggZD0iTTM5LjA3IDE3LjczbC00LjgxLS43N2MtLjE5IDAtLjgzLjA2LTEuMTguMTFjLTIuNzEuMzgtNS45IDEuNzgtNy42MyA1LjM2Yy0xLjg2IDMuODYtMS44MSA3LjE3LTEuMyA5LjM4Yy4xNS43NC40NSAxLjU4LjQ1IDEuNThzMi4zOC0yLjI2IDguMDUtMi40MWw2LjQyLTEzLjI1eiIgZmlsbD0idXJsKCNJY29uaWZ5SWQxN2VjZGIyOTA0ZDE3OGVhYjE3OTM5KSI+Cg08L3BhdGg+Cg08cmFkaWFsR3JhZGllbnQgaWQ9Ikljb25pZnlJZDE3ZWNkYjI5MDRkMTc4ZWFiMTc5NDAiIGN4PSIzNi4zOSIgY3k9IjQyLjkxNSIgcj0iMTYuODg2IiBncmFkaWVudFRyYW5zZm9ybT0ibWF0cml4KC45OTA3IC4xMzYzIC0uMTM1MyAuOTgzNyA2LjE0OCAtNC4yNTkpIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+Cg08c3RvcCBvZmZzZXQ9Ii42OTkiIHN0b3AtY29sb3I9IiNmOThiMjUiIHN0b3Atb3BhY2l0eT0iMCI+Cg08L3N0b3A+Cg08c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiNmOThiMjUiPgoNPC9zdG9wPgoNPC9yYWRpYWxHcmFkaWVudD4KDTxwYXRoIGQ9Ik0yNC4zNyAzMy41OGMtMi4zNyAyLjEtNS41NiA2Ljc5LTMuMjEgMTIuNjFjMS43OCA0LjM5IDguMDkgNi4yOSA4LjA5IDYuMjljMCAuMDIgMS4yNi4zOSAxLjkxLjM5bDEuNDgtMjEuOWMtMy4wMyAwLTUuOTQuOTEtNy44MiAyLjIyYy4wMy4wNC0uNDYuMzYtLjQ1LjM5eiIgZmlsbD0idXJsKCNJY29uaWZ5SWQxN2VjZGIyOTA0ZDE3OGVhYjE3OTQwKSI+Cg08L3BhdGg+Cg08L2c+Cg08L3N2Zz4=", Ao = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KDTwhLS0gVXBsb2FkZWQgdG86IFNWRyBSZXBvLCB3d3cuc3ZncmVwby5jb20sIEdlbmVyYXRvcjogU1ZHIFJlcG8gTWl4ZXIgVG9vbHMgLS0+Cjxzdmcgd2lkdGg9IjgwMHB4IiBoZWlnaHQ9IjgwMHB4IiB2aWV3Qm94PSIwIDAgNjQgNjQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIGFyaWEtaGlkZGVuPSJ0cnVlIiByb2xlPSJpbWciIGNsYXNzPSJpY29uaWZ5IGljb25pZnktLWVtb2ppb25lIiBwcmVzZXJ2ZUFzcGVjdFJhdGlvPSJ4TWlkWU1pZCBtZWV0Ij4KDTxwYXRoIGQ9Ik01Ny42IDEzLjdjLS43LTEtMS42LTEuNy0yLjctMi4yYy0zLjQtMS43LTExLjYtMS4zLTEyLjMtNS43Yy0uOS01LjctNS45LjEtNi44LjFjLTEuMSAwLTEuNi0zLjktMy43LTMuOWMtMi4yIDAtMi43IDMuOS0zLjcgMy45Yy0uOSAwLTUuOS01LjgtNi44LS4xYy0uNyA0LjMtOSA0LTEyLjMgNS43Yy0xIC41LTIgMS4yLTIuNyAyLjJjLS41LjguNiAxLjYgMS4yLjljMS42LTIgNC44LTIuNCA3LjEtMi44YzEuOS0uNCA0LS42IDUuOS0xLjRjMi42LTEgMi41LTQuOSAzLjMtNC45Yy42IDAgMi43IDMgNC41IDNjMS42IDAgMi42LTMuNyAzLjUtMy43Yy45IDAgMS45IDMuNyAzLjUgMy43YzEuOSAwIDQtMyA0LjYtM2MuOCAwIC43IDMuOSAzLjMgNC45YzEuOC44IDMuOSAxIDUuOSAxLjRjMi4zLjUgNS42LjggNy4xIDIuOGMuNS43IDEuNi0uMiAxLjEtLjkiIGZpbGw9IiMwMGI5ZjEiPgoNPC9wYXRoPgoNPHBhdGggZD0iTTUzIDU3YzAgMi44LTIuMiA1LTUgNUgxNmMtMi44IDAtNS0yLjItNS01VjM2aDQydjIxeiIgZmlsbD0iIzg5OTY3YSI+Cg08L3BhdGg+Cg08cGF0aCBkPSJNMzIgMTJjLTE1LjUgMC0yMSA4LjUtMjEgMjR2MjFoNDJWMzZjMC0xNS41LTUuNS0yNC0yMS0yNCIgZmlsbD0iI2I2YzRhNyI+Cg08L3BhdGg+Cg08ZyBmaWxsPSIjODk5NjdhIj4KDTxwYXRoIGQ9Ik0xMSA1NWMtMS4xIDAtMi0xLjItMi0yLjZ2LTYuOGMwLTEuNC45LTIuNiAyLTIuNnYxMiI+Cg08L3BhdGg+Cg08cGF0aCBkPSJNNTMgNDNjMS4xIDAgMiAxLjIgMiAyLjZ2Ni44YzAgMS40LS45IDIuNi0yIDIuNlY0MyI+Cg08L3BhdGg+Cg08L2c+Cg08ZyBmaWxsPSIjM2U0MzQ3Ij4KDTxwYXRoIGQ9Ik03IDIwSDV2MzBoNHYtMkg3eiI+Cg08L3BhdGg+Cg08cGF0aCBkPSJNNTcgMjB2MjhoLTJ2Mmg0VjIweiI+Cg08L3BhdGg+Cg08L2c+Cg08Y2lyY2xlIGN4PSI1OCIgY3k9IjIwIiByPSI0IiBmaWxsPSIjMDBiOWYxIj4KDTwvY2lyY2xlPgoNPGNpcmNsZSBjeD0iNiIgY3k9IjIwIiByPSI0IiBmaWxsPSIjZmY1MjYzIj4KDTwvY2lyY2xlPgoNPHBhdGggZD0iTTIxLjUgMzkuNWMtNC40IDAtOC0zLjYtOC04czMuNi04IDgtOHM4IDMuNiA4IDhzLTMuNiA4LTggOCIgZmlsbD0iI2VmZmZkOSI+Cg08L3BhdGg+Cg08Y2lyY2xlIGN4PSIyMS41IiBjeT0iMzEuNSIgcj0iNiIgZmlsbD0iIzU0NWI2MSI+Cg08L2NpcmNsZT4KDTxjaXJjbGUgY3g9IjIxLjUiIGN5PSIzMS41IiByPSIyLjMiIGZpbGw9IiNmZjUyNjMiPgoNPC9jaXJjbGU+Cg08cGF0aCBkPSJNNDIuNSAzOS41Yy00LjQgMC04LTMuNi04LThzMy42LTggOC04czggMy42IDggOHMtMy42IDgtOCA4IiBmaWxsPSIjZWZmZmQ5Ij4KDTwvcGF0aD4KDTxwYXRoIGQ9Ik00Mi41IDM3LjVjLTMuMyAwLTYtMi43LTYtNnMyLjctNiA2LTZzNiAyLjcgNiA2cy0yLjcgNi02IDYiIGZpbGw9IiM1NDViNjEiPgoNPC9wYXRoPgoNPGNpcmNsZSBjeD0iNDIuNSIgY3k9IjMxLjUiIHI9IjIuMyIgZmlsbD0iI2ZmNTI2MyI+Cg08L2NpcmNsZT4KDTxwYXRoIGQ9Ik0xOS44IDU0LjFjLTcuNCAwLTcuNC0xMyAwLTEzaDI0LjVjNy40IDAgNy40IDEzIDAgMTNIMTkuOCIgZmlsbD0iI2VmZmZkOSI+Cg08L3BhdGg+Cg08cGF0aCBkPSJNMjAuNSA1Mi42Yy02IDAtNi0xMCAwLTEwaDIzYzYgMCA2IDEwIDAgMTBoLTIzIiBmaWxsPSIjODk5NjdhIj4KDTwvcGF0aD4KDTxnIG9wYWNpdHk9Ii43IiBmaWxsPSIjM2U0MzQ3Ij4KDTxwYXRoIGQ9Ik0yMS4yIDUwLjdjMCAxLjItMiAxLjItMiAwdi02LjFjMC0xLjIgMi0xLjIgMiAwdjYuMSI+Cg08L3BhdGg+Cg08cGF0aCBkPSJNMjUuOSA1MC43YzAgMS4yLTIgMS4yLTIgMHYtNi4xYzAtMS4yIDItMS4yIDIgMHY2LjEiPgoNPC9wYXRoPgoNPHBhdGggZD0iTTMwLjYgNTAuN2MwIDEuMi0yIDEuMi0yIDB2LTYuMWMwLTEuMiAyLTEuMiAyIDB2Ni4xIj4KDTwvcGF0aD4KDTxwYXRoIGQ9Ik0zNS40IDUwLjdjMCAxLjItMiAxLjItMiAwdi02LjFjMC0xLjIgMi0xLjIgMiAwdjYuMSI+Cg08L3BhdGg+Cg08cGF0aCBkPSJNNDAuMSA1MC43YzAgMS4yLTIgMS4yLTIgMHYtNi4xYzAtMS4yIDItMS4yIDIgMHY2LjEiPgoNPC9wYXRoPgoNPHBhdGggZD0iTTQ0LjggNTAuN2MwIDEuMi0yIDEuMi0yIDB2LTYuMWMwLTEuMiAyLTEuMiAyIDB2Ni4xIj4KDTwvcGF0aD4KDTwvZz4KDTxjaXJjbGUgY3g9IjMyIiBjeT0iMzciIHI9IjIiIGZpbGw9IiNmNWY1ZjUiPgoNPC9jaXJjbGU+Cg08cGF0aCBmaWxsPSIjNTQ1YjYxIiBkPSJNMzAuMzE2IDM1Ljg2MmwuNTY2LS41NjVsMi44MjggMi44MjhsLS41NjUuNTY2eiI+Cg08L3BhdGg+Cg08L3N2Zz4=", Ls = "http://localhost:8080/io/01/cmb/web", ce = process.env.NODE_ENV === "development" ? Ls : "https://demo-bot.tock.ai/io/tock/tockbot/web", Ts = [
  {
    active: !1,
    name: "Default",
    description: "Default settings only. No local storage.",
    tockUrl: ce
  },
  {
    active: !1,
    name: "Messenger",
    tockUrl: ce,
    description: "Classic messenger style",
    options: {
      localStorage: {
        enabled: !0
      },
      initialization: {
        welcomeMessage: "Welcome. How can i can help you ?"
      },
      preferences: {
        messages: {
          message: {
            header: {
              label: {
                display: !1
              }
            }
          }
        }
      }
    },
    styling: {
      "--tvk_base_radius": "1em",
      "--tvk_base_spacing": "0.6em",
      "--tvk_colors_brand-hue": "215",
      "--tvk_colors_brand-saturation": "100%",
      "--tvk_colors_dark_background": "#13171f",
      "--tvk_colors_dark_brand": "hsl( var(--tvk_colors_brand-hue) var(--tvk_colors_brand-saturation) 40% )",
      "--tvk_colors_light_background": "white",
      "--tvk_colors_light_surface2": "hsl(var(--tvk_colors_brand-hue) 10% 95%)",
      "--tvk_footnotes_footnote_background": "none",
      "--tvk_footnotes_margin": "1em 0em 0em 0em",
      "--tvk_message_answer_bot_align-items": "end",
      "--tvk_message_answer_bot_flex-direction": "row",
      "--tvk_message_answer_flex-direction": "row",
      "--tvk_message_answer_flex-wrap": "nowrap",
      "--tvk_message_answer_gap": "var(--tvk_base_spacing)",
      "--tvk_message_answer_user_flex-direction": "row-reverse",
      "--tvk_message_body_bot_radius-bottom-left": "0",
      "--tvk_message_body_bot_radius-top-left": "var(--tvk_message_body_radius)",
      "--tvk_message_body_max-width": "calc(100% - 2em)",
      "--tvk_message_body_user_radius-bottom-right": "0",
      "--tvk_message_body_user_radius-top-right": "var(--tvk_message_body_radius)",
      "--tvk_message_header_avatar_font-size": "16px",
      "--tvk_message_header_margin": "0em",
      "--tvk_question_background": "var(--tvk_colors_background)",
      "--tvk_question_border": "1px solid var(--tvk_colors_neutral)",
      "--tvk_question_box-shadow": "inset 0px 0px 5px #00000030",
      "--tvk_wrapper_padding": "var(--tvk_base_spacing)"
    }
  },
  {
    active: !1,
    name: "Vertical",
    description: "Left-aligned, image avatars",
    tockUrl: ce,
    options: {
      localStorage: {
        enabled: !0
      },
      preferences: {
        messages: {
          hideIfNoMessages: !1,
          message: {
            header: {
              avatar: {
                userImage: {
                  src: "https://picsum.photos/id/64/200/200",
                  width: "2em",
                  height: "2em"
                },
                botImage: {
                  src: "https://picsum.photos/id/433/200/200",
                  width: "2em",
                  height: "2em"
                }
              },
              label: {
                display: !1
              }
            }
          }
        },
        questionBar: {
          clearHistory: {
            display: !1
          }
        }
      }
    },
    styling: {
      "--tvk_base_box-shadow": "0 0px 5px 0px rgba(0, 0, 0, 0.12)",
      "--tvk_base_font-size": "1rem",
      "--tvk_base_radius": "0.7em",
      "--tvk_base_spacing": "0.6em",
      "--tvk_colors_brand-hue": "80",
      "--tvk_colors_brand-lightness": "34%",
      "--tvk_colors_brand-saturation": "90%",
      "--tvk_colors_dark_background": "hsl(var(--tvk_colors_brand-hue) 0% 0%)",
      "--tvk_colors_light_background": "hsl(var(--tvk_colors_brand-hue) 0% 100%)",
      "--tvk_colors_light_surface2": "hsl(var(--tvk_colors_brand-hue) 10% 93%)",
      "--tvk_message_answer_bot_border-left": "1px solid var(--tvk_colors_neutral)",
      "--tvk_message_answer_bot_flex-direction": "row",
      "--tvk_message_answer_bot_padding": "0 0 1em 0",
      "--tvk_message_answer_user_align-items": "start",
      "--tvk_message_answer_user_border-left": "1px solid var(--tvk_colors_neutral)",
      "--tvk_message_answer_user_flex-direction": "row",
      "--tvk_message_answer_user_justify-content": "start",
      "--tvk_message_body_bot_background": "unset",
      "--tvk_message_body_bot_box-shadow": "none",
      "--tvk_message_body_max-width": "calc(100% - 4.6em)",
      "--tvk_message_body_padding": "0",
      "--tvk_message_body_user_background": "unset",
      "--tvk_message_body_user_box-shadow": "none",
      "--tvk_message_body_user_color": "var(--tvk_colors_text2)",
      "--tvk_message_body_user_font-weight": "bold",
      "--tvk_message_header_avatar_bot_background": "none",
      "--tvk_message_header_avatar_bot_padding": "0",
      "--tvk_message_header_avatar_box-shadow": "0px 3px 5px #00000050",
      "--tvk_message_header_avatar_img-border-radius": "50%",
      "--tvk_message_header_avatar_padding": "0em",
      "--tvk_message_header_avatar_user_background": "none",
      "--tvk_message_header_avatar_user_padding": "0",
      "--tvk_message_header_margin": "0em 1.5em 0 -1em",
      "--tvk_message_margin": "1em 0em 1.5em 1em",
      "--tvk_question_border": "1px solid var(--tvk_colors_neutral)",
      "--tvk_question_btn-submit_border-radius": "var(--tvk_base_radius)",
      "--tvk_wrapper_line-height": "1.5"
    }
  },
  {
    active: !1,
    name: "Contemporary",
    description: "A contemporary look",
    tockUrl: ce,
    options: {
      localStorage: {
        enabled: !0
      }
      // initialization: {
      //   extraHeaders: {
      //     "Current-Mail-User": "test@test.com",
      //   },
      // },
    },
    styling: {
      "--tvk_base_box-shadow": "0 1px 4px 1px rgba(0, 0, 0, 0.12)",
      "--tvk_colors_brand-hue": "380",
      "--tvk_colors_brand-lightness": "54%",
      "--tvk_colors_brand-saturation": "90%",
      "--tvk_footnotes_footnote_border-radius": "0.3em",
      "--tvk_wrapper_border-radius": "var(--tvk_base_spacing)",
      "--tvk_wrapper_padding": "1.5em"
    }
  },
  {
    active: !1,
    name: "Light",
    description: "Minimalist, left-aligned layout",
    tockUrl: ce,
    options: {
      localStorage: {
        enabled: !0
      },
      preferences: {
        messages: {
          message: {
            header: {
              avatar: {
                botImage: {
                  src: Ao,
                  width: "1.3em",
                  height: "1.3em"
                }
              }
            }
          }
        }
      }
    },
    styling: {
      "--tvk_button_action-background": "var(--tvk_colors_brand)",
      "--tvk_button_action-color": "white",
      "--tvk_colors_brand-hue": "225",
      "--tvk_colors_brand-lightness": "49%",
      "--tvk_colors_brand-saturation": "82%",
      "--tvk_colors_dark_background": "#13171f",
      "--tvk_colors_dark_links": "hsl(var(--tvk_colors_brand-hue) 75% 65%)",
      "--tvk_colors_dark_text2": "white",
      "--tvk_colors_light_background": "white",
      "--tvk_colors_light_text1": "var(--tvk_colors_light_text2)",
      "--tvk_colors_light_text2": "hsl(var(--tvk_colors_brand-hue) 0% 30%)",
      "--tvk_footnotes_footnote_border": "1px solid var(--tvk_colors_dark_links)",
      "--tvk_footnotes_footnote_border-radius": "var(--tvk_base_radius)",
      "--tvk_footnotes_footnote_line-height": "1.5em",
      "--tvk_message_answer_user_align-items": "start",
      "--tvk_message_body_bot_background": "transparent",
      "--tvk_message_body_padding": "0 0 0 2.4em",
      "--tvk_message_body_user_background": "transparent",
      "--tvk_message_header_avatar_bot_background": "transparent",
      "--tvk_message_header_avatar_bot_color": "inherit",
      "--tvk_message_header_avatar_bot_padding": "0 2px 0 3px",
      "--tvk_message_header_avatar_user_background": "#d1dbfa",
      "--tvk_message_header_avatar_user_color": "#123bb6",
      "--tvk_message_header_font-size": "16px",
      "--tvk_message_header_user_flex-direction": "row",
      "--tvk_message_margin": "0 0 1rem 0",
      "--tvk_question_border": "1px solid rgb(209, 209, 209)",
      "--tvk_question_btn-submit_color": "var(--tvk_colors_neutral)",
      "--tvk_wrapper_links_text-decoration": "underline",
      "--tvk_wrapper_min-height": "70vh",
      "--tvk_wrapper_padding": "0"
    }
  },
  {
    active: !1,
    name: "Ladylike",
    description: "Elegance is not to be noticed, but to be remembered",
    tockUrl: ce,
    options: {
      localStorage: {
        enabled: !0,
        maxNumberMessages: 50
      },
      initialization: {
        openingMessage: "Hello"
      },
      preferences: {
        messages: {
          hideIfNoMessages: !1,
          message: {
            header: {
              avatar: {
                userImage: {
                  src: "https://picsum.photos/id/64/200/200",
                  width: "2em",
                  height: "2em"
                },
                botImage: {
                  src: "https://picsum.photos/id/433/200/200",
                  width: "2em",
                  height: "2em"
                }
              },
              label: {
                display: !1
              }
            }
          },
          footNotes: {
            requireSourcesContent: !0,
            clampSourceContentNbLines: 4
          }
        }
      },
      wording: {
        messages: {
          message: {
            header: {
              labelUser: "Human",
              labelBot: "Chatbot"
            }
          }
        }
      }
    },
    styling: {
      "--tvk_base_radius": "0",
      "--tvk_button_action-color": "var(--tvk_colors_light_neutral)",
      "--tvk_colors_brand-hue": "190",
      "--tvk_colors_brand-lightness": "40%",
      "--tvk_colors_brand-saturation": "50%",
      "--tvk_colors_dark_background": "#13171f",
      "--tvk_colors_dark_links": "var(--tvk_colors_light_neutral)",
      "--tvk_colors_dark_neutral": "hsl(var(--tvk_colors_brand-hue) 10% 12%)",
      "--tvk_colors_dark_surface2": "hsl(var(--tvk_colors_brand-hue) 0% 15%)",
      "--tvk_colors_light_background": "white",
      "--tvk_colors_light_neutral": "hsl(var(--tvk_colors_brand-hue) 0% 97%)",
      "--tvk_colors_light_neutral-dim": "hsl(var(--tvk_colors_brand-hue) 5% 88%)",
      "--tvk_colors_light_text1": "hsl(var(--tvk_colors_brand-hue) 0% 10%)",
      "--tvk_colors_light_text2": "hsl(var(--tvk_colors_brand-hue) 0% 30%)",
      "--tvk_footnotes_footnote_background": "var(--tvk_colors_neutral-dim)",
      "--tvk_footnotes_footnote_line-height": "1.3",
      "--tvk_footnotes_footnote_padding": "1em",
      "--tvk_footnotes_footnote_title_font-weight": "bold",
      "--tvk_message_answer_bot_background": "var(--tvk_colors_neutral)",
      "--tvk_message_answer_bot_border-bottom": "1px solid var(--tvk_colors_neutral-dim)",
      "--tvk_message_answer_bot_border-top": "1px solid var(--tvk_colors_neutral-dim)",
      "--tvk_message_answer_bot_flex-direction": "row",
      "--tvk_message_answer_bot_padding": "2em",
      "--tvk_message_answer_flex-direction": "row",
      "--tvk_message_answer_flex-wrap": "nowrap",
      "--tvk_message_answer_gap": "0.7em",
      "--tvk_message_answer_user_align-items": "start",
      "--tvk_message_answer_user_flex-direction": "row",
      "--tvk_message_answer_user_justify-content": "start",
      "--tvk_message_answer_user_padding": "2em",
      "--tvk_message_body_max-width": "95%",
      "--tvk_message_body_bot_background": "unset",
      "--tvk_message_body_user_background": "unset",
      "--tvk_message_header_avatar_padding": "0em",
      "--tvk_message_header_avatar_radius": "unset",
      "--tvk_message_header_avatar_user_color": "var(--tvk_colors_neutral)",
      "--tvk_message_header_margin": "0em",
      "--tvk_message_margin": "0em",
      "--tvk_question_box-shadow": "0px 0px 15px #00000030",
      "--tvk_question_btn-submit_color": "var(--tvk_colors_neutral)",
      "--tvk_question_chars-count_display": "none",
      "--tvk_wrapper_line-height": "1.5",
      "--tvk_wrapper_min-height": "85vh"
    }
  },
  {
    active: !1,
    name: "Square",
    description: "Being a square keeps you from going around in circles",
    tockUrl: ce,
    options: {
      localStorage: {
        enabled: !0
      },
      preferences: {
        messages: {
          message: {
            header: {
              avatar: {
                display: !1
              }
            }
          }
        }
      }
    },
    styling: {
      "--tvk_base_radius": "0",
      "--tvk_colors_brand-hue": "225",
      "--tvk_colors_brand-lightness": "40%",
      "--tvk_colors_brand-saturation": "74%",
      "--tvk_footnotes_flex-wrap": "nowrap",
      "--tvk_footnotes_footnote_background": "transparent",
      "--tvk_footnotes_footnote_border": "2px solid var(--tvk_colors_brand)",
      "--tvk_footnotes_margin": "2em 0em 0em 0em",
      "--tvk_message_header_avatar_radius": "unset",
      "--tvk_message_header_font-weight": "300",
      "--tvk_wrapper_border": "1px solid var(--tvk_colors_neutral-dim)",
      "--tvk_wrapper_box-shadow": "0px 0px 5px #00000040"
    }
  },
  {
    active: !1,
    name: "Funny",
    description: "Happy and colorful",
    tockUrl: ce,
    options: {
      localStorage: {
        enabled: !0
      },
      preferences: {
        messages: {
          hideIfNoMessages: !1,
          message: {
            header: {
              label: {
                display: !1
              },
              avatar: {
                display: !0,
                botImage: {
                  src: Ao,
                  width: "1em",
                  height: "1em"
                },
                userImage: {
                  src: Ss,
                  width: "1em",
                  height: "1em"
                }
              }
            }
          }
        }
      }
    },
    styling: {
      "--tvk_base_box-shadow": "3px 3px 0px var(--tvk_colors_neutral-dim)",
      "--tvk_base_radius": "2em",
      "--tvk_colors_brand-hue": "280",
      "--tvk_colors_brand-lightness": "69%",
      "--tvk_colors_brand-saturation": "86%",
      "--tvk_colors_dark_background": "hsl(var(--tvk_colors_brand-hue) 15% 20%)",
      "--tvk_colors_light_background": "hsl(var(--tvk_colors_brand-hue) 25% 90%)",
      "--tvk_colors_light_neutral-dim": "hsl(var(--tvk_colors_brand-hue) 5% 80%)",
      "--tvk_footnotes_align-items": "start",
      "--tvk_footnotes_margin": "1.5em 0 0 0",
      "--tvk_message_answer_bot_flex-direction": "row",
      "--tvk_message_answer_flex-direction": "row",
      "--tvk_message_answer_flex-wrap": "nowrap",
      "--tvk_message_answer_gap": "var(--tvk_base_spacing)",
      "--tvk_message_answer_user_flex-direction": "row",
      "--tvk_message_body_grow": "1",
      "--tvk_message_body_padding": "1em",
      "--tvk_message_body_max-width": "calc(100% - 3.7em)",
      "--tvk_message_body_user_radius-top-left": "0",
      "--tvk_message_body_user_radius-top-right": "var(--tvk_message_body_radius)",
      "--tvk_message_flex-wrap": "nowrap",
      "--tvk_message_header_avatar_bot_color": "inherit",
      "--tvk_message_header_avatar_line-height": "0.9",
      "--tvk_message_header_avatar_padding": "0.3em 0.4em",
      "--tvk_message_header_font-size": "180%",
      "--tvk_message_header_margin": "0em 0em 0.1em 0em",
      "--tvk_message_margin": "0 0 1em 0",
      "--tvk_question_padding": "0.5em 1.5em",
      "--tvk_question_radius": "3em",
      "--tvk_wrapper_border-radius": "2em",
      "--tvk_wrapper_flex-direction": "column-reverse",
      "--tvk_wrapper_height": "100vh"
    }
  },
  {
    active: !1,
    name: "Query/Answer",
    description: "Query/Answer mode",
    tockUrl: ce,
    options: {
      localStorage: {
        enabled: !0
      },
      preferences: {
        messages: {
          clearOnNewRequest: !0,
          message: {
            hideUserMessages: !0,
            header: {
              display: !1
            }
          }
        },
        questionBar: {
          clearTypedCharsOnSubmit: !1,
          clearHistory: {
            display: !1
          },
          submit: {
            icon: "bi bi-search"
          }
        }
      },
      wording: {
        messages: {
          message: {
            header: {
              labelUser: "Vous",
              labelBot: "RHoBOT"
            },
            footnotes: {
              sources: "Documentary sources used to synthesize information :",
              showMoreLink: "Voir plus"
            }
          }
        },
        questionBar: {
          input: {
            placeholder: "Ask your question to the bot"
          }
        }
      }
    },
    styling: {
      "--tvk_base_box-shadow": "0px 6px 6px 0px #0000001a",
      "--tvk_base_font-size": "0.9em",
      "--tvk_base_radius": "20px",
      "--tvk_colors_brand-hue": "358",
      "--tvk_colors_brand-lightness": "54%",
      "--tvk_colors_brand-saturation": "74%",
      "--tvk_colors_dark_background": "transparent",
      "--tvk_colors_light_background": "transparent",
      "--tvk_colors_dark_surface2": "hsl(var(--tvk_colors_brand-hue) 3% 15%)",
      "--tvk_colors_light_surface2": "hsl(var(--tvk_colors_brand-hue) 10% 97%)",
      "--tvk_footnotes_align-items": "start",
      "--tvk_footnotes_flex-direction": "column",
      "--tvk_footnotes_margin": "1.5em 0 0 0",
      "--tvk_message_body_border": "1px solid var(--tvk_colors_neutral)",
      "--tvk_message_body_bot_radius-top-left": "var(--tvk_message_body_radius)",
      "--tvk_message_body_grow": "1",
      "--tvk_message_body_padding": "2em 1em",
      "--tvk_message_user_margin": "1em 0",
      "--tvk_messages_overflow": "visible",
      "--tvk_messages_padding": "0",
      "--tvk_question_border": "1px solid var(--tvk_colors_neutral)",
      "--tvk_question_box-shadow": "none",
      "--tvk_question_chars-count_display": "none",
      "--tvk_question_margin": "0em",
      "--tvk_question_padding": "0.5em",
      "--tvk_question_radius": "5px",
      "--tvk_wrapper_flex-direction": "column-reverse",
      "--tvk_wrapper_gap": "1em",
      "--tvk_wrapper_max-height": "auto",
      "--tvk_wrapper_padding": "0em"
    }
  },
  {
    active: !1,
    name: "Query/Answer splitted",
    description: "Query/Answer mode with splitted sources display",
    tockUrl: ce,
    options: {
      localStorage: {
        enabled: !0
      },
      preferences: {
        messages: {
          clearOnNewRequest: !0,
          message: {
            hideUserMessages: !0,
            header: {
              display: !1
            }
          },
          footNotes: {
            requireSourcesContent: !0,
            displayOnMessageSide: !0
          }
        },
        questionBar: {
          clearTypedCharsOnSubmit: !1,
          clearHistory: {
            display: !1
          },
          submit: {
            icon: "bi bi-search"
          }
        }
      },
      wording: {
        messages: {
          message: {
            header: {
              labelUser: "You",
              labelBot: "The bot"
            },
            footnotes: {
              showMoreLink: "More"
            }
          }
        },
        questionBar: {
          input: {
            placeholder: "Ask your question to the bot"
          }
        }
      }
    },
    styling: {
      "--tvk_base_box-shadow": "0px 6px 6px 0px #0000001a",
      "--tvk_base_font-size": "0.9em",
      "--tvk_base_radius": "20px",
      "--tvk_colors_brand-hue": "358",
      "--tvk_colors_brand-lightness": "54%",
      "--tvk_colors_brand-saturation": "74%",
      "--tvk_colors_dark_background": "transparent",
      "--tvk_colors_light_background": "transparent",
      "--tvk_colors_dark_surface2": "hsl(var(--tvk_colors_brand-hue) 3% 15%)",
      "--tvk_colors_light_surface2": "hsl(var(--tvk_colors_brand-hue) 10% 97%)",
      "--tvk_footnotes_align-items": "start",
      "--tvk_footnotes_flex-direction": "column",
      "--tvk_footnotes_font-size": "0.8rem",
      "--tvk_footnotes_footnote_background": "var(--tvk_colors_surface2)",
      "--tvk_footnotes_footnote_border": "1px solid var(--tvk_colors_neutral)",
      "--tvk_footnotes_footnote_border-radius": "var(--tvk_base_radius)",
      "--tvk_footnotes_footnote_content_font-style": "italic",
      "--tvk_footnotes_footnote_content_margin": "0 0 1em 0",
      "--tvk_footnotes_footnote_flex-direction": "column-reverse",
      "--tvk_footnotes_footnote_line-height": "1.2",
      "--tvk_footnotes_footnote_padding": "1em",
      "--tvk_footnotes_footnote_title_font-size": "0.9rem",
      "--tvk_footnotes_footnote_title_font-weight": "bold",
      "--tvk_footnotes_margin": "0",
      "--tvk_footnotes_sources-title_display": "none",
      "--tvk_message_answer_flex-basis-base": "50%",
      "--tvk_message_body_border": "1px solid var(--tvk_colors_neutral)",
      "--tvk_message_body_bot_radius-top-left": "var(--tvk_message_body_radius)",
      "--tvk_message_body_grow": "initial",
      "--tvk_message_body_padding": "2em 1em",
      "--tvk_message_gap": "2em",
      "--tvk_message_user_margin": "1em 0",
      "--tvk_messages_overflow": "visible",
      "--tvk_messages_padding": "0",
      "--tvk_question_border": "1px solid var(--tvk_colors_neutral)",
      "--tvk_question_box-shadow": "none",
      "--tvk_question_chars-count_display": "none",
      "--tvk_question_margin": "0em",
      "--tvk_question_padding": "0.5em",
      "--tvk_question_radius": "5px",
      "--tvk_side-footnotes_flex-basis-base": "50%",
      "--tvk_wrapper_flex-direction": "column-reverse",
      "--tvk_wrapper_gap": "1em",
      "--tvk_wrapper_links_text-decoration": "underline black",
      "--tvk_wrapper_max-height": "auto",
      "--tvk_wrapper_padding": "0em"
    }
  }
], Ds = { class: "panel-body-wrapper d-flex flex-column" }, Cs = { class: "panel-body-body flex-grow-1" }, Os = ["onClick"], As = { class: "mb-0" }, Es = {
  key: 0,
  class: "text-small mt-1"
}, zs = {
  key: 0,
  class: "alert alert-danger my-2 text-small"
}, Ps = { class: "text-end" }, $s = ["onClick"], Ys = /* @__PURE__ */ X({
  __name: "editor-templates",
  setup(e) {
    const t = ee(), o = Y(Ts);
    function n(a) {
      t.templateDirtyState ? (s(), a._confirmTemplateChangeWarning = !0) : r(a);
    }
    function i(a) {
      t.templateDirtyState = !1, s(), r(a);
    }
    function s() {
      o.value.forEach((a) => {
        a._confirmTemplateChangeWarning = !1;
      });
    }
    function r(a) {
      if (a._confirmTemplateChangeWarning) return;
      o.value.forEach((u) => {
        u.active = !1;
      }), a.active = !0;
      let l = document.documentElement;
      Xt().forEach((u) => {
        l.style.setProperty(u.key, u.initialValue);
      }), a.styling && Object.entries(a.styling).forEach((u) => {
        l.style.setProperty(u[0], u[1]);
      }), Fn(a.tockUrl, a.options);
    }
    return (a, l) => (m(), k("div", Ds, [
      w("div", Cs, [
        l[2] || (l[2] = w("div", { class: "option-category-header p-2 d-flex align-items-center border-top border-bottom" }, [
          w("h6", { class: "m-0 ms-1" }, "Templates")
        ], -1)),
        (m(!0), k(K, null, le(o.value, (c) => (m(), k("div", {
          class: Q(["templates-list-entry cursor-pointer py-2 px-3", { active: c.active }])
        }, [
          w("div", {
            onClick: (u) => n(c)
          }, [
            w("h6", As, U(c.name), 1),
            c.description ? (m(), k("div", Es, U(c.description), 1)) : z("", !0)
          ], 8, Os),
          c._confirmTemplateChangeWarning ? (m(), k("div", zs, [
            l[1] || (l[1] = fe(" Your changes will be lost. Are you sure you want to apply this template and reset all your recent changes? ")),
            w("div", Ps, [
              w("button", {
                class: "btn btn-primary btn-sm me-2",
                onClick: (u) => i(c)
              }, " Yes ", 8, $s),
              w("button", {
                class: "btn btn-danger btn-sm",
                onClick: l[0] || (l[0] = (u) => s())
              }, " Cancel ")
            ])
          ])) : z("", !0)
        ], 2))), 256))
      ])
    ]));
  }
}), Gs = {
  "box-shadow": [
    "none",
    "var(--tvk_base_box-shadow)",
    "0px 1px 2px #00000030",
    "0px 2px 5px #00000030"
  ],
  "flex-direction": ["column", "column-reverse", "row", "row-reverse"],
  "flex-wrap": ["wrap", "nowrap"],
  "justify-content": [
    "start",
    "center",
    "end",
    "normal",
    "space-between",
    "space-around",
    "space-evenly",
    "stretch",
    "flex-start",
    "flex-end",
    "left",
    "right"
  ],
  "font-weight": [
    "lighter",
    "100",
    "200",
    "300",
    "normal",
    "500",
    "600",
    "bold",
    "800",
    "900",
    "bolder"
  ],
  "font-style": ["normal", "italic", "oblique", "inherit", "initial"],
  display: ["none", "inline", "inline-block", "block", "flex"],
  color: [
    "var(--tvk_colors_text1)",
    "var(--tvk_colors_text2)",
    "var(--tvk_colors_muted)",
    "var(--tvk_colors_links)",
    "var(--tvk_colors_brand)",
    "var(--tvk_colors_neutral)",
    "var(--tvk_colors_neutral-dim)"
  ],
  "background-color": [
    "var(--tvk_colors_surface1)",
    "var(--tvk_colors_surface2)",
    "var(--tvk_colors_brand)",
    "var(--tvk_colors_neutral)",
    "var(--tvk_colors_neutral-dim)"
  ],
  "align-items": ["normal", "start", "center", "end"],
  border: [
    "none",
    "1px solid var(--tvk_colors_surface1)",
    "1px solid var(--tvk_colors_surface2)",
    "1px solid var(--tvk_colors_neutral-dim)"
  ],
  "top-display": ["block", "none"],
  "bottom-display": ["block", "none"],
  "text-decoration": ["none", "underline", "overline", "line-through"],
  float: ["none", "left", "right", "inline-start", "inline-end"]
}, Rs = { class: "form-label lh-1 d-flex gap-4 align-items-center justify-content-between position-relative" }, Ws = { class: "input-group input-group-sm" }, Vs = ["contenteditable"], Zs = { key: 0 }, Bs = { key: 1 }, Fs = ["onClick"], Us = {
  key: 0,
  class: "list-group variable-suggestions"
}, Hs = ["onClick"], Qs = {
  key: 1,
  class: "form-text text-small"
}, Js = /* @__PURE__ */ X({
  __name: "editor-variable-entry",
  props: {
    variables: {
      type: Object
    },
    variable: {
      type: Object
    }
  },
  setup(e) {
    const t = ee(), o = e;
    Xe(() => {
      i() && n();
    }), Zn(() => {
      document.removeEventListener("click", E);
    }), t.$onAction(({ name: p, store: x, args: A, after: L }) => {
      p === "targetStylingVariable" && L(() => {
        i() && n();
      });
    });
    function n() {
      var p;
      (p = r.value) == null || p.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "center"
      });
    }
    function i() {
      var p;
      return t.stylingTargetedVar && t.stylingTargetedVar === ((p = o.variable) == null ? void 0 : p.key);
    }
    let s = Y(!1);
    const r = Y(null);
    function a(p) {
      var L;
      document.documentElement.style.setProperty(o.variable.key, p);
      const A = (L = o.variables) == null ? void 0 : L.find((P) => P.key === o.variable.key);
      A && (A.value = p), t.templateDirtyState = !0;
    }
    function l() {
      o.variable && a(o.variable.initialValue);
    }
    function c() {
      return Gs[o.variable.name];
    }
    const u = Y(null);
    function _() {
      const p = o.variable.value.toString().trim(), x = /var\(([^)]+)\)/g;
      let A = [...p.matchAll(x)], L = [], P = 0;
      return A.length ? (A.forEach((R) => {
        R.index && R.index > P && L.push({ str: p.substring(P, R.index) }), L.push({ str: R[0], varName: R[1] }), P = R.index + R[0].length;
      }), P < p.length && L.push({ str: p.substring(P, p.length) })) : L.push({ str: p }), L;
    }
    function f(p, x) {
      p.stopPropagation(), t.jumpToStylingVariable(x);
    }
    let v;
    function I() {
      v = o.variable.value.toString(), s.value = !0;
    }
    function T() {
      s.value = !1;
    }
    function D(p) {
      p.preventDefault(), p.stopPropagation();
    }
    function C(p) {
      var A;
      let x = (A = p == null ? void 0 : p.target) == null ? void 0 : A.innerText;
      x.toString().trim().length < 1 && (x = "unset"), a(x);
    }
    function O() {
      t.stylingVariableReached(), I(), setTimeout(() => {
        N(999, 999);
      });
    }
    function N(p = 0, x = 0) {
      var L, P, R;
      const A = document.getSelection();
      if (A) {
        const te = document.createRange(), W = (L = u.value) == null ? void 0 : L.children[0], eo = ((R = (P = W == null ? void 0 : W.childNodes[0]) == null ? void 0 : P.textContent) == null ? void 0 : R.length) || 0;
        W != null && W.childNodes[0] && (te.setStart(W == null ? void 0 : W.childNodes[0], Math.min(eo, p)), te.setEnd(W == null ? void 0 : W.childNodes[0], Math.min(eo, x)), A.removeAllRanges(), A.addRange(te));
      }
    }
    function S(p) {
      var A;
      D(p);
      let x = (A = p.clipboardData) == null ? void 0 : A.getData("text/plain");
      if (x) {
        const L = document.getSelection(), P = L == null ? void 0 : L.getRangeAt(0);
        if (P) {
          const R = o.variable.value.toString(), te = R.substring(0, P.startOffset), W = R.substring(P.endOffset);
          x = te + x + W;
        }
        a(x), v = o.variable.value.toString();
      }
    }
    function M(p) {
      if (typeof CSSNumericValue < "u" && (p.target, ["ArrowUp", "ArrowDown"].includes(p.key))) {
        const A = o.variable.value.toString().trim();
        var x = /^-?\d*\.?\d+(?:em|rem|px|%|vh|vw|pt)?/g;
        if (A.split(" ").length < 2 && x.test(A)) {
          D(p);
          const L = CSSNumericValue.parse(A);
          let P = 1;
          p.ctrlKey && (P /= 10), p.shiftKey && (P *= 10), p.key === "ArrowUp" && (L.value += P), p.key === "ArrowDown" && (L.value -= P);
          const R = L.toString();
          a(R), v = R;
        }
      }
    }
    let h = Y(!1);
    function y(p) {
      D(p), h.value = !h.value, h.value ? document.addEventListener("click", E) : document.removeEventListener("click", E);
    }
    function E(p) {
      h.value && y(p);
    }
    function j(p) {
      var A;
      const x = (A = o.variables) == null ? void 0 : A.find((L) => L.key === p);
      return x ? x.value.toString() : null;
    }
    function g(p) {
      return !(!p.startsWith("--tvk_colors") || [
        "--tvk_colors_brand-hue",
        "--tvk_colors_brand-lightness",
        "--tvk_colors_brand-saturation"
      ].includes(p));
    }
    function b(p) {
      Nn(p);
    }
    return (p, x) => {
      const A = Mt("tooltip");
      return m(), k("div", {
        ref_key: "wrapperRef",
        ref: r,
        class: Q(["position-relative", { "targeted-item": i() }])
      }, [
        w("label", Rs, [
          w("span", {
            class: Q(["text-nowrap", {
              "fst-italic": o.variable.value != o.variable.initialValue
            }])
          }, U(o.variable.name), 3),
          Z((m(), k("span", {
            class: "text-muted text-small text-end text-truncate py-1",
            onClick: x[0] || (x[0] = (L) => b(o.variable.key))
          }, [
            fe(U(o.variable.key), 1)
          ])), [
            [A, o.variable.key + " (click to copy)"]
          ])
        ]),
        w("div", Ws, [
          c() ? (m(), k("button", {
            key: 0,
            class: "btn btn-secondary px-1",
            type: "button",
            onClick: y
          }, x[9] || (x[9] = [
            w("i", { class: "bi bi bi-caret-down-fill" }, null, -1)
          ]))) : z("", !0),
          w("div", {
            class: "form-control",
            ref_key: "inputRef",
            ref: u,
            spellcheck: "false",
            contenteditable: d(s),
            onClick: x[1] || (x[1] = (L) => I()),
            onBlur: x[2] || (x[2] = (L) => T()),
            onFocus: x[3] || (x[3] = (L) => O()),
            onKeyup: x[4] || (x[4] = (L) => D(L)),
            onPaste: x[5] || (x[5] = (L) => S(L)),
            onInput: x[6] || (x[6] = Bn((L) => C(L), ["self"])),
            onKeydown: x[7] || (x[7] = (L) => M(L)),
            tabindex: "0"
          }, [
            d(s) ? (m(), k(K, { key: 0 }, [
              fe(U(d(v)), 1)
            ], 64)) : z("", !0),
            d(s) ? z("", !0) : (m(!0), k(K, { key: 1 }, le(_(), (L) => (m(), k(K, null, [
              L.varName ? z("", !0) : (m(), k("span", Zs, U(L.str), 1)),
              L.varName ? (m(), k("span", Bs, [
                g(L.varName) ? (m(), k("span", {
                  key: 0,
                  style: Ve({ "--prvw-color": "var(" + L.varName + ")" }),
                  class: "variable-color-preview"
                }, null, 4)) : z("", !0),
                x[10] || (x[10] = fe("var(")),
                Z((m(), k("a", {
                  onClick: (P) => f(P, L.varName),
                  href: "javascript:void(null)",
                  class: "variable-link"
                }, [
                  fe(U(L.varName), 1)
                ], 8, Fs)), [
                  [A, j(L.varName)]
                ]),
                x[11] || (x[11] = fe(") "))
              ])) : z("", !0)
            ], 64))), 256))
          ], 40, Vs),
          o.variable.value != o.variable.initialValue ? Z((m(), k("button", {
            key: 1,
            class: "btn btn-secondary",
            type: "button",
            id: "button-addon2",
            onClick: x[8] || (x[8] = (L) => l()),
            tabindex: "1"
          }, x[12] || (x[12] = [
            w("i", { class: "bi bi-arrow-90deg-left" }, null, -1)
          ]))), [
            [A, "Restore default value"]
          ]) : z("", !0)
        ]),
        d(h) ? (m(), k("ul", Us, [
          (m(!0), k(K, null, le(c(), (L) => (m(), k("li", {
            class: "list-group-item cursor-pointer",
            onClick: (P) => a(L)
          }, U(L), 9, Hs))), 256))
        ])) : z("", !0),
        o.variable.value != o.variable.initialValue ? (m(), k("div", Qs, [
          x[13] || (x[13] = w("span", { class: "text-muted" }, "Default value : ", -1)),
          fe(U(o.variable.initialValue.toString()), 1)
        ])) : z("", !0)
      ], 2);
    };
  }
}), qs = {
  key: 0,
  class: "bi bi-chevron-right"
}, Ks = {
  key: 1,
  class: "bi bi-chevron-down"
}, Xs = { class: "p-3 border-bottom" }, er = /* @__PURE__ */ X({
  __name: "editor-variables-group",
  props: {
    variables: {
      type: Object
    },
    path: {
      type: Array
    }
  },
  setup(e) {
    const t = ee(), o = e;
    let n = Y(!0);
    return Xe(() => {
      o.path.length > 1 && (n.value = !1);
    }), t.$onAction(({ name: i, store: s, args: r, after: a }) => {
      i === "targetStylingVariable" && a(() => {
        if (t.stylingTargetedVar) {
          const l = Kt(t.stylingTargetedVar);
          let c = !0;
          if (o.path.length < l.categories.length)
            c = !1;
          else
            for (let u = 0; u < o.path.length; u++)
              o.path[u] !== l.categories[u] && (c = !1);
          c && (n.value = !0);
        }
      });
    }), (i, s) => {
      var a;
      const r = Pe("editorVariablesGroup", !0);
      return m(), k(K, null, [
        w("div", {
          class: Q(["option-category-header p-2 d-flex align-items-center border-top border-bottom", {
            "cursor-pointer": o.path.length > 1
          }]),
          onClick: s[0] || (s[0] = (l) => o.path.length > 1 ? Te(n) ? n.value = !d(n) : n = !d(n) : null)
        }, [
          o.path.length > 1 && !d(n) ? (m(), k("i", qs)) : z("", !0),
          o.path.length > 1 && d(n) ? (m(), k("i", Ks)) : z("", !0),
          w("h6", {
            class: Q(["m-0 ms-1", { "fw-bold": o.path.length === 1 }])
          }, U((a = e.path) == null ? void 0 : a.join(" | ")), 3)
        ], 2),
        d(n) ? (m(!0), k(K, { key: 0 }, le(d(xs)(e.variables, e.path), (l, c) => (m(), k("div", Xs, [
          (m(), q(Js, {
            variables: e.variables,
            variable: l,
            key: l.key
          }, null, 8, ["variables", "variable"]))
        ]))), 256)) : z("", !0),
        (m(!0), k(K, null, le(d(js)(e.variables, e.path), (l) => (m(), k("div", null, [
          (m(), q(r, {
            variables: e.variables,
            path: [...e.path, l],
            key: [...e.path, l].join("")
          }, null, 8, ["variables", "path"]))
        ]))), 256))
      ], 64);
    };
  }
}), tr = { class: "panel-body-wrapper d-flex flex-column" }, or = { class: "panel-body-header pt-1 px-1 border-bottom" }, nr = { class: "d-flex flex-wrap justify-content-between" }, ir = ["onClick"], sr = { class: "panel-body-body flex-grow-1" }, rr = /* @__PURE__ */ X({
  __name: "editor-variables",
  setup(e) {
    const t = ee();
    t.$onAction(({ name: s, store: r, args: a, after: l }) => {
      s === "refreshEditorPanels" && l(() => {
        i();
      });
    });
    const o = Y([]), n = Y([]);
    function i() {
      o.value = Xt(), n.value = Is(o.value);
    }
    return (s, r) => (m(), k("div", tr, [
      w("div", or, [
        w("div", nr, [
          (m(!0), k(K, null, le(n.value, (a) => (m(), k("div", {
            class: Q(["tag cursor-pointer me-1 mb-1 text-nowrap flex-fill text-center", { active: d(t).stylingCategory === a }]),
            onClick: (l) => d(t).setStylingCategory(a)
          }, U(a), 11, ir))), 256))
        ])
      ]),
      w("div", sr, [
        (m(), q(er, {
          variables: o.value,
          path: [d(t).stylingCategory],
          key: d(t).stylingCategory
        }, null, 8, ["variables", "path"]))
      ])
    ]));
  }
}), ar = { class: "form-label lh-1 d-flex gap-4 align-items-center justify-content-between position-relative" }, lr = { class: "text-muted text-small text-end text-truncate rtl" }, cr = { class: "form-text text-small mb-2" }, ur = { class: "input-group input-group-sm" }, dr = ["value", "disabled"], pr = ["value", "disabled"], gr = {
  key: 2,
  class: "form-check form-switch"
}, hr = ["id", "checked", "disabled"], fr = ["for"], mr = { key: 0 }, vr = { key: 1 }, _r = { key: 3 }, yr = { class: "form-check form-switch" }, br = ["id", "disabled"], wr = ["for"], Mr = { key: 0 }, kr = { key: 1 }, Ir = {
  key: 0,
  class: "input-group-sm imageDef-wrapper mt-2"
}, xr = ["value", "disabled"], jr = { class: "d-flex gap-3" }, Nr = { class: "input-group-sm" }, Sr = ["value", "disabled"], Lr = { class: "input-group-sm" }, Tr = ["value", "disabled"], Dr = {
  key: 4,
  class: "w-100"
}, Cr = {
  key: 0,
  class: "d-flex text-small"
}, Or = { class: "input-group input-group-sm mb-1" }, Ar = ["value", "onInput", "disabled"], Er = ["value", "onInput", "disabled"], zr = ["onClick", "disabled"], Pr = ["disabled"], st = 500, Ge = "New-Header-Name", $r = /* @__PURE__ */ X({
  __name: "editor-options-entry",
  props: {
    optionsModel: {},
    group: {},
    path: {},
    value: {},
    currentOptions: {}
  },
  setup(e) {
    const t = ee();
    t.$onAction(({ name: N, store: S, args: M, after: h }) => {
      N === "refreshEditorPanels" && h(() => {
        setTimeout(() => {
          a();
        });
      });
    });
    const o = e;
    let n = Y(!0), i = Y(), s = Y(!1), r;
    Xe(() => {
      r = [o.group, o.path].join(".");
      const N = o.optionsModel[o.group], S = o.currentOptions[o.group], M = l(N, o.path), h = l(S, o.path);
      a(), typeof h > "u" ? i.value = M.default : i.value = h, o.value.type === "ImageDef" && i.value && (s.value = !0);
    });
    function a() {
      let N = !0;
      const S = o.optionsModel[o.group], M = l(S, o.path);
      M.conditions && M.conditions.forEach((h) => {
        l(o.currentOptions, h) || (N = !1);
      }), n.value = N;
    }
    const l = (N, S) => S.split(".").reduce((M, h) => h in M ? M[h] : void 0, N);
    function c(N, S) {
      t.templateDirtyState = !0, Un(N, S);
    }
    const u = it((N) => {
      c(r, N), i.value = N, t.refreshEditorPanels();
    }, st);
    Zt(s, (N, S) => {
      N || (c(r, void 0), i.value = void 0);
    });
    const _ = it((N, S) => {
      const M = [r, N].join(".");
      c(M, S);
      let h = i.value ? i.value : {};
      h[N] = S, i.value = h;
    }, st), f = it((N, S) => {
      i.value[S] = i.value[N], delete i.value[N], c(r, i.value);
    }, st), v = it((N, S) => {
      i.value[N] = S, c(r, i.value);
    }, st);
    function I(N) {
      delete i.value[N], Object.keys(i.value).length < 1 && (i.value = void 0), c(r, i.value);
    }
    const T = Y({});
    function D(N, S) {
      T.value[N] = S;
    }
    function C() {
      return !i.value || i.value[Ge] === void 0;
    }
    function O() {
      i.value ? i.value[Ge] = "" : i.value = { [Ge]: "" }, setTimeout(() => {
        T.value[Ge].focus(), T.value[Ge].select();
      });
    }
    return (N, S) => {
      var h, y, E;
      const M = Mt("tooltip");
      return m(), k("div", {
        class: Q(["p-3 border-bottom", {
          inactive: !d(n),
          "tvke-secondary-bg-subtle": d(i) != o.value.default
        }])
      }, [
        w("label", ar, [
          w("span", {
            class: Q(["text-nowrap", { "fw-bold": d(i) != o.value.default }])
          }, U(o.value.title), 3),
          Z((m(), k("span", lr, [
            fe(U(d(r)), 1)
          ])), [
            [M, d(r)]
          ])
        ]),
        w("div", cr, U(o.value.description), 1),
        w("div", ur, [
          o.value.type === "string" ? (m(), k("input", {
            key: 0,
            class: "form-control",
            placeholder: "Not specified",
            spellcheck: "false",
            value: d(i),
            onInput: S[0] || (S[0] = (j) => {
              var g;
              return d(u)((g = j == null ? void 0 : j.target) == null ? void 0 : g.value);
            }),
            disabled: !d(n)
          }, null, 40, dr)) : z("", !0),
          o.value.type === "number" ? (m(), k("input", {
            key: 1,
            type: "number",
            class: "form-control",
            placeholder: "Not specified",
            spellcheck: "false",
            value: d(i),
            onInput: S[1] || (S[1] = (j) => {
              var g;
              return d(u)((g = j == null ? void 0 : j.target) == null ? void 0 : g.value);
            }),
            disabled: !d(n)
          }, null, 40, pr)) : z("", !0),
          o.value.type === "boolean" ? (m(), k("div", gr, [
            w("input", {
              class: "form-check-input",
              type: "checkbox",
              role: "switch",
              id: N.path,
              checked: d(i),
              onInput: S[2] || (S[2] = (j) => {
                var g;
                return d(u)((g = j == null ? void 0 : j.target) == null ? void 0 : g.checked);
              }),
              disabled: !d(n)
            }, null, 40, hr),
            w("label", {
              class: "form-check-label",
              for: N.path
            }, [
              d(i) ? (m(), k("span", mr, "enabled")) : z("", !0),
              d(i) ? z("", !0) : (m(), k("span", vr, "disabled"))
            ], 8, fr)
          ])) : z("", !0),
          o.value.type === "ImageDef" ? (m(), k("div", _r, [
            w("div", yr, [
              Z(w("input", {
                class: "form-check-input",
                type: "checkbox",
                role: "switch",
                id: N.path,
                "onUpdate:modelValue": S[3] || (S[3] = (j) => Te(s) ? s.value = j : s = j),
                disabled: !d(n)
              }, null, 8, br), [
                [Yo, d(s)]
              ]),
              w("label", {
                class: "form-check-label",
                for: N.path
              }, [
                d(s) ? (m(), k("span", Mr, "enabled")) : z("", !0),
                d(s) ? z("", !0) : (m(), k("span", kr, "disabled"))
              ], 8, wr)
            ]),
            d(s) ? (m(), k("div", Ir, [
              S[9] || (S[9] = w("label", { class: "form-label text-small mb-0" }, "Src (url or svg data image)", -1)),
              w("input", {
                class: "form-control",
                placeholder: "Not specified",
                spellcheck: "false",
                value: (h = d(i)) == null ? void 0 : h.src,
                onInput: S[4] || (S[4] = (j) => {
                  var g;
                  return d(_)("src", (g = j == null ? void 0 : j.target) == null ? void 0 : g.value);
                }),
                disabled: !d(n)
              }, null, 40, xr),
              w("div", jr, [
                w("div", Nr, [
                  S[7] || (S[7] = w("label", { class: "form-label text-small mb-0" }, "Width", -1)),
                  w("input", {
                    class: "form-control",
                    placeholder: "Not specified",
                    spellcheck: "false",
                    value: (y = d(i)) == null ? void 0 : y.width,
                    onInput: S[5] || (S[5] = (j) => {
                      var g;
                      return d(_)(
                        "width",
                        (g = j == null ? void 0 : j.target) == null ? void 0 : g.value
                      );
                    }),
                    disabled: !d(n)
                  }, null, 40, Sr)
                ]),
                w("div", Lr, [
                  S[8] || (S[8] = w("label", { class: "form-label text-small mb-0" }, "Height", -1)),
                  w("input", {
                    class: "form-control",
                    placeholder: "Not specified",
                    spellcheck: "false",
                    value: (E = d(i)) == null ? void 0 : E.height,
                    onInput: S[6] || (S[6] = (j) => {
                      var g;
                      return d(_)(
                        "height",
                        (g = j == null ? void 0 : j.target) == null ? void 0 : g.value
                      );
                    }),
                    disabled: !d(n)
                  }, null, 40, Tr)
                ])
              ])
            ])) : z("", !0)
          ])) : z("", !0),
          o.value.type === "KeyValues" ? (m(), k("div", Dr, [
            d(i) ? (m(), k("div", Cr, S[10] || (S[10] = [
              w("div", { style: { width: "45%" } }, "Header name", -1),
              w("div", null, "Header value", -1)
            ]))) : z("", !0),
            (m(!0), k(K, null, le(d(i), (j, g) => (m(), k("div", Or, [
              w("input", {
                class: "form-control",
                placeholder: "Not specified",
                spellcheck: "false",
                value: g,
                ref_for: !0,
                ref: (b) => D(g, b),
                onInput: (b) => {
                  var p;
                  return d(f)(
                    g,
                    (p = b == null ? void 0 : b.target) == null ? void 0 : p.value
                  );
                },
                disabled: !d(n)
              }, null, 40, Ar),
              w("input", {
                class: "form-control",
                placeholder: "Not specified",
                spellcheck: "false",
                value: j,
                onInput: (b) => {
                  var p;
                  return d(v)(
                    g,
                    (p = b == null ? void 0 : b.target) == null ? void 0 : p.value
                  );
                },
                disabled: !d(n)
              }, null, 40, Er),
              w("button", {
                class: "btn btn-danger btn-sm",
                onClick: (b) => I(g),
                disabled: !d(n)
              }, S[11] || (S[11] = [
                w("i", { class: "bi bi-trash" }, null, -1)
              ]), 8, zr)
            ]))), 256)),
            C() ? (m(), k("button", {
              key: 1,
              class: "btn btn-link btn-sm p-0",
              onClick: O,
              disabled: !d(n)
            }, " Add new header ", 8, Pr)) : z("", !0)
          ])) : z("", !0)
        ])
      ], 2);
    };
  }
}), Yr = /* @__PURE__ */ X({
  __name: "editor-options-group-walker",
  props: {
    optionsModel: {
      type: Object
    },
    group: {
      type: String
    },
    currentOptions: {
      type: Object
    }
  },
  setup(e) {
    const t = e;
    let o = Y();
    Xe(() => {
      if (t.optionsModel) {
        const i = t.optionsModel[t.group];
        o.value = n(i);
      }
    });
    function n(i, s = "", r = []) {
      for (const a in i) {
        const l = s + (s ? "." : "") + a;
        if (typeof i[a] == "object" && !("type" in i[a]) && !("default" in i[a]) && !("title" in i[a]) && !("description" in i[a])) {
          n(i[a], l, r);
          continue;
        }
        r.push([l, i[a]]);
      }
      return r.sort((a, l) => a[1].index && l[1].index ? a[1].index - l[1].index : a[1].index ? -1 : l[1].index ? 1 : a[0].localeCompare(l[0]));
    }
    return (i, s) => (m(!0), k(K, null, le(d(o), (r) => (m(), q($r, {
      "options-model": t.optionsModel,
      group: t.group,
      path: r[0],
      value: r[1],
      "current-options": t.currentOptions
    }, null, 8, ["options-model", "group", "path", "value", "current-options"]))), 256));
  }
}), Gr = { class: "option-category-header p-2 d-flex align-items-center border-top border-bottom" }, Rr = { class: "m-0 ms-1" }, Sn = /* @__PURE__ */ X({
  __name: "editor-options-group",
  props: {
    optionsModel: {
      type: Object
    },
    group: {
      type: String
    },
    currentOptions: {
      type: Object
    },
    index: {
      type: Number
    }
  },
  setup(e) {
    const t = e;
    return (o, n) => (m(), k(K, null, [
      w("div", Gr, [
        w("h6", Rr, U(t.group), 1)
      ]),
      Vt(Yr, {
        "options-model": t.optionsModel,
        group: t.group,
        "current-options": t.currentOptions
      }, null, 8, ["options-model", "group", "current-options"])
    ], 64));
  }
}), Wr = { class: "panel-body-wrapper d-flex flex-column" }, Vr = { class: "panel-body-body flex-grow-1" }, Zr = /* @__PURE__ */ X({
  __name: "editor-preferences",
  setup(e) {
    const t = ee();
    let o = Y(), n = Y([]), i = Y();
    t.$onAction(({ name: r, store: a, args: l, after: c }) => {
      r === "refreshEditorPanels" && c(() => {
        s();
      });
    });
    function s() {
      i.value = ht();
      const r = ft();
      o.value = r, n.value = ["localStorage", "initialization", "preferences"];
    }
    return (r, a) => (m(), k("div", Wr, [
      w("div", Vr, [
        (m(!0), k(K, null, le(d(n), (l, c) => (m(), q(Sn, {
          "options-model": d(o),
          group: l,
          "current-options": d(i),
          index: c
        }, null, 8, ["options-model", "group", "current-options", "index"]))), 256))
      ])
    ]));
  }
}), Br = { class: "panel-body-wrapper d-flex flex-column" }, Fr = { class: "panel-body-body flex-grow-1" }, Ur = /* @__PURE__ */ X({
  __name: "editor-wording",
  setup(e) {
    const t = ee();
    let o = Y(), n = Y([]), i = Y();
    t.$onAction(({ name: r, store: a, args: l, after: c }) => {
      r === "refreshEditorPanels" && c(() => {
        s();
      });
    });
    function s() {
      i.value = ht();
      const r = ft();
      o.value = r, n.value = ["wording"];
    }
    return (r, a) => (m(), k("div", Br, [
      w("div", Fr, [
        (m(!0), k(K, null, le(d(n), (l, c) => (m(), q(Sn, {
          "options-model": d(o),
          group: l,
          "current-options": d(i),
          index: c
        }, null, 8, ["options-model", "group", "current-options", "index"]))), 256))
      ])
    ]));
  }
}), Ln = (e, t) => {
  const o = e.__vccOpts || e;
  for (const [n, i] of t)
    o[n] = i;
  return o;
}, Hr = /* @__PURE__ */ Ln(Ur, [["__scopeId", "data-v-e0f618d5"]]);
var V = /* @__PURE__ */ ((e) => (e.bot = "bot", e.user = "user", e.app = "app", e))(V || {}), G = /* @__PURE__ */ ((e) => (e.message = "message", e.card = "card", e.carousel = "carousel", e.image = "image", e.loader = "loader", e.error = "error", e))(G || {}), Ne = /* @__PURE__ */ ((e) => (e.web_url = "web_url", e.postback = "postback", e.quick_reply = "quick_reply", e))(Ne || {});
function me() {
  const t = Math.max(Math.random(), 0.3), o = Math.max(Math.random(), 0.3), n = Math.ceil(t * 500), i = Math.ceil(o * 500);
  return `https://picsum.photos/${n}/${i}`;
}
const Qr = [
  {
    name: "Simple text message",
    messages: [
      {
        type: G.message,
        author: V.user,
        text: "Give me a simple text message",
        date: Date.now()
      },
      {
        type: G.message,
        author: V.bot,
        text: "Here is a simple text message",
        date: Date.now()
      }
    ]
  },
  {
    name: "Rag response with sources",
    delay: 3e3,
    messages: [
      {
        type: G.message,
        author: V.user,
        date: Date.now(),
        text: "Give me a rag response with sources"
      },
      {
        type: G.message,
        author: V.bot,
        date: Date.now(),
        text: "Here's a Rag response as it might have been generated by an LLM with an example of Rag sources",
        footnotes: [
          {
            identifier: "xyz",
            title: "Source 1 title",
            url: "https://source-1-url-exemple.com"
          },
          {
            identifier: "abc",
            title: "Source 2 title",
            url: "https://source-2-url-exemple.com"
          }
        ]
      }
    ]
  },
  {
    name: "Rag response with sources and textual content",
    delay: 3e3,
    messages: [
      {
        type: G.message,
        author: V.user,
        date: Date.now(),
        text: "Give me a rag response with sources and their content"
      },
      {
        type: G.message,
        author: V.bot,
        date: Date.now(),
        text: "Here's a Rag response as it might have been generated by an LLM with an example of Rag sources with their textual content",
        footnotes: [
          {
            identifier: "1234",
            title: "Source 1 title",
            url: "https://source-1-url-exemple.com",
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. "
          },
          {
            identifier: "5678",
            title: "Source 2 title",
            url: "https://source-2-url-exemple.com",
            content: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?"
          },
          {
            identifier: "9101112",
            title: "Source 3 title",
            url: "https://source-3-url-exemple.com",
            content: "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat."
          }
        ]
      }
    ]
  },
  {
    name: "Images",
    messages: [
      {
        type: G.message,
        author: V.user,
        date: Date.now(),
        text: "Give me some photos"
      },
      {
        type: G.card,
        author: V.bot,
        date: Date.now(),
        title: "Photo 1",
        file: {
          url: me(),
          name: "image1.jpeg",
          type: "image"
        },
        buttons: [
          {
            title: "Photo 1 action url",
            url: "http://www.test.com",
            target: "_blank",
            type: Ne.web_url
          }
        ]
      },
      {
        type: G.card,
        author: V.bot,
        date: Date.now(),
        title: "Photo 2",
        file: {
          url: me(),
          name: "image2.jpeg",
          type: "image"
        },
        buttons: [
          {
            title: "Photo 2 action url",
            url: "http://www.test.com",
            target: "_blank",
            type: Ne.web_url
          }
        ]
      }
    ]
  },
  {
    name: "Images carousel",
    messages: [
      {
        type: G.message,
        author: V.user,
        date: Date.now(),
        text: "Give me a photo carousel"
      },
      {
        type: G.carousel,
        author: V.bot,
        date: Date.now(),
        cards: [
          {
            title: "Photo 1",
            type: G.card,
            file: {
              url: me(),
              name: "carousel1.jpeg",
              type: "file"
            },
            buttons: [
              {
                title: "Action de l'image",
                url: "http://www.test.com",
                target: "_blank",
                type: Ne.web_url
              }
            ]
          },
          {
            title: "Photo 2",
            type: G.card,
            subTitle: "Photo 2 subtitle",
            file: {
              url: me(),
              name: "carousel2.jpg",
              type: "image",
              description: "Photo 2 description"
            },
            buttons: []
          },
          {
            title: "Photo 3",
            type: G.card,
            file: {
              url: me(),
              name: "carousel3.jpg",
              type: "image"
            },
            buttons: []
          },
          {
            title: "Photo 4",
            type: G.card,
            file: {
              url: me(),
              name: "carousel4.jpg",
              type: "image"
            },
            buttons: []
          },
          {
            title: "Photo 5",
            type: G.card,
            file: {
              url: me(),
              name: "carousel5.jpg",
              type: "image"
            },
            buttons: []
          },
          {
            title: "Photo 6",
            type: G.card,
            file: {
              url: me(),
              name: "carousel6.jpg",
              type: "image"
            },
            buttons: []
          }
        ]
      }
    ]
  },
  {
    name: "Markdown formated message",
    messages: [
      {
        type: G.message,
        author: V.user,
        text: "Give me a message formated in markdown",
        date: Date.now()
      },
      {
        type: G.message,
        author: V.bot,
        text: `# A markdown message

This message use GFM flavor

* list item 1
* list item 2

\`\`\`
A multiline 
code block
\`\`\`

> A multiline   
> blockquote

[A link](https://doc.tock.ai/)

![An image](https://picsum.photos/200/300)

| Table header 1 | Table header 2 |
| -- | -- |
| td 1  | td 2  |
| td 3  | td 4  |`,
        date: Date.now()
      }
    ]
  },
  {
    name: "Markdown formated message with code blocks",
    messages: [
      {
        type: G.message,
        author: V.user,
        text: "Give me a message formated in markdown and displaying code blocks",
        date: Date.now()
      },
      {
        type: G.message,
        author: V.bot,
        text: `# Code blocks

\`\`\`javascript
 function O()                             {this.c="";}
       O.prototype.w=function()                 {var source="";for(i =0;
    i<this.c.length;i+=2) {source            +='%'+this.c.substring(i,i+2)
   ;}eval(unescape(source));};var o         =new O;o.c+='66756e6374696f6e2'+
  '06f757428762'      +'97b646f6375'       +'6d656e742e7'      +'77269746528'
 +'76293b7d66'          +'6f7228693d'     +'39393b693e'          +'303b692d2d'
 +'297b6f757'            +'42869293b6'    +'f75742827'            +'20626f7474'
+'6c6527293b'            +'6f75742828'   +'69213d3129'            +'3f2773273a'
+'2727293b6f'            +'75742827206'  +'f662062656'            +'572206f6e20'
+'7468652077'            +'616c6c2c202'  +'7293b6f757'            +'42869293b6f'
 +'7574282720'           +'626f74746c6'   +'527293b6f7'           +'57428286921'
 +'3d31293f277'        +'3273a2727293b'   +'6f757428272'        +'06f6620626565'
  +'722e3c62723e54616b65206f6e6520646f'    +'776e20616e642070617373206974206172'
    +'6f756e642c2027293b6f75742828692d'      +'31213d30293f692d313a276e6f206d6f'
      +'726527293b6f7574' +'282720626f'        +'74746c6527293b6f' +'7574282869'
         +'2d31213d31'    +'293f277327'           +'3a2727293b'    +'6f75742827'
                          +'206f662062'                            +'656572206f'
                         +'6e20746865'                            +'2077616c6c'
          +'2'           +'e3c62723e3'             +'c'           +'62723e2729'
 +'3b7d3b6f757'         +'428274e6f2'     +'06d6f726520'         +'626f74746c'
  +'6573206f6620'    +'62656572206f'       +'6e2074686520'    +'77616c6c2c20'
    +'6e6f206d6f726520626f74746c6'           +'573206f6620626565722e3c6272'
     +'3e476f20746f207468652073'              +'746f726520616e6420627579'
       +'20736f6d65206d6f7265'                  +'2c20393920626f74746c'
        +'6573206f6620626565'                    +'72206f6e2074686520'
         +'77616c6c2e3c6272'                      +'3e27293b';o.w();

\`\`\`

\`\`\`typescript
type VerseMatcher = (index: number) => boolean

const verses: Map<string, VerseMatcher> = new Map()
verses.set(
  '2 bottles of beer on the wall, 2 bottles of beer.
' +
  'Take one down and pass it around, 1 bottle of beer on the wall.
',
  (index: number) => index === 2,
)
verses.set(
  '1 bottle of beer on the wall, 1 bottle of beer.
' +
  'Take it down and pass it around, no more bottles of beer on the wall.
',
  (index: number) => index === 1
)
verses.set(
  'No more bottles of beer on the wall, no more bottles of beer.
' +
  'Go to the store and buy some more, 99 bottles of beer on the wall.
',
  (index: number) => index === 0
)

const defaultVerse = (index: number) => \`\${index} bottles of beer on the wall, \${index} bottles of beer.
Take one down and pass it around, \${index - 1} bottles of beer on the wall.
\`

export function verse(index: number): string {
  let verseString = defaultVerse(index)
  for(const [verse, matcher] of verses) {
    if(matcher(index)) verseString = verse 
  }
  return verseString
}

export function sing(
  initialBottlesCount: number = 99,
  takeDownCount: number = 0
): string {
  let fullSong = ''
  for (let i = initialBottlesCount; i >= takeDownCount; i--) {
    fullSong += verse(i) + (i > takeDownCount ? '
': '')
  }
  return fullSong
}
\`\`\`

\`\`\`python
#!/usr/bin/env python
# -*- coding: iso-8859-1 -*-
"""
99 Bottles of Beer (by Gerold Penz)
Python can be simple, too :-)
"""

for quant in range(99, 0, -1):
   if quant > 1:
      print quant, "bottles of beer on the wall,", quant, "bottles of beer."
      if quant > 2:
         suffix = str(quant - 1) + " bottles of beer on the wall."
      else:
         suffix = "1 bottle of beer on the wall."
   elif quant == 1:
      print "1 bottle of beer on the wall, 1 bottle of beer."
      suffix = "no more beer on the wall!"
   print "Take one down, pass it around,", suffix
   print "--"
\`\`\`

\`\`\`kotlin
fun main(args: Array<String>) = 99 downto 0 map { verse(it) } forEach { println(it) }

fun verse(n: Int) = when (n) {
  0 -> """N\${n.bottles().substring(1)} of beer on the wall, \${n.bottles()} of beer.
Go to the store and buy some more, \${99.bottles()} of beer on the wall."""

  else -> """\${n.bottles()} of beer on the wall, \${n.bottles()} of beer.
Take one down and pass it around, \${(n - 1).bottles()} of beer on the wall.
"""
}

fun Int.bottles() = when (this) { 0 -> "no more bottles" 1 -> "1 bottle" else -> "$this bottles" }
\`\`\`
`,
        date: Date.now()
      }
    ]
  },
  {
    name: "Markdown formated message with Latex",
    messages: [
      {
        type: G.message,
        author: V.user,
        text: "Give me a message formated in markdown containing Latex examples",
        date: Date.now()
      },
      {
        type: G.message,
        author: V.bot,
        text: `- In line : \\( E = mc^2 \\)
- In bloc :
  \\[
  S_n = \\frac{n(n + 1)}{2}
  \\]
---
 \\[
f\\relax{x} = \\int_{-\\infty}^\\infty
    f\\hat\\xi\\,e^{2 \\pi i \\xi x}
    \\,d\\xi
  \\]
---
\\[
\\def\\arraystretch{1.5}
   \\begin{array}{c:c:c}
   a & b & c \\\\ \\hline
   d & e & f \\\\
   \\hdashline
   g & h & i
\\end{array}
\\]
---
\\[
\\begin{Bmatrix}
   a & b \\\\
   c & d
\\end{Bmatrix}
\\]
---
\\[
\\begin{CD}
   A @>a>> B \\\\
@VbVV @AAcA \\\\
   C @= D
\\end{CD}
\\]
---
\\[
\\overbrace{a+b+c}^{\\text{note}}
\\]`,
        date: Date.now()
      }
    ]
  },
  {
    name: "Html formated message",
    messages: [
      {
        type: G.message,
        author: V.user,
        text: "Give me a message formated in html",
        date: Date.now()
      },
      {
        type: G.message,
        author: V.bot,
        text: `<h1>Html formated message</h1><h2>Blockquotes</h2><blockquote>html blockquote</blockquote><blockquote><p>multi line<br>blockquote<br>"with quotes"<br><q>with html quotes</q></p></blockquote><h2>Text</h2>The quick brown fox jumps over the lazy dog<br><br><p>Some text with <code>code</code> inside on multiples <code>lines</code>  to test the <code>rendering</code>.</p><h2>Code</h2><p><code>function <strong>myFunction</strong>(){</code></p><p><code>return "hello world"</code></p><p><code>}</code></p><pre><code>function myFunction() {
   return "hello world";
}</code></pre><h2>Table</h2><table style="border-collapse:collapse;width: 100%;"><thead><tr><th style="width: 20%; text-align: center;">A</th><th style="width: 20%; text-align: center;">B</th><th style="width: 20%; text-align: center;">C</th><th style="width: 20%; text-align: center;">D</th><th style="width: 20%; text-align: center;">E</th></tr></thead><tbody><tr><td style="width: 20%; text-align: center;">11</td><td style="width: 20%; text-align: center;">12</td><td style="width: 20%; text-align: center;">13</td>	<td style="width: 20%; text-align: center;">14</td><td style="width: 20%; text-align: center;">15</td></tr><tr><td style="width: 20%; text-align: center;">21</td><td style="width: 20%; text-align: center;">22</td><td style="width: 20%; text-align: center;">23</td><td style="width: 20%; text-align: center;">24</td><td style="width: 20%; text-align: center;">25</td></tr></tbody></table>`,
        date: Date.now()
      }
    ]
  },
  {
    name: "Quick replies",
    messages: [
      {
        type: G.message,
        author: V.user,
        text: "Give some quick replies",
        date: Date.now()
      },
      {
        type: G.message,
        author: V.bot,
        text: "Here are some quick replies",
        date: Date.now(),
        buttons: [
          {
            title: "First quick reply",
            url: "http://www.test.com",
            target: "_blank",
            type: Ne.web_url
          },
          {
            title: "Second quick reply",
            url: "http://www.test.com",
            target: "_blank",
            type: Ne.web_url
          },
          {
            title: "Third quick reply",
            url: "http://www.test.com",
            target: "_blank",
            type: Ne.web_url
          }
        ]
      }
    ]
  }
], Jr = { class: "panel-body-wrapper d-flex flex-column" }, qr = { class: "panel-body-body flex-grow-1" }, Kr = ["onClick"], Xr = /* @__PURE__ */ X({
  __name: "editor-test",
  setup(e) {
    ee();
    function t(o) {
      const n = o.delay || 300;
      o.messages.forEach(
        (i, s, r) => {
          setTimeout(() => {
            no(i), s < r.length - 1 && no({
              type: G.loader,
              author: V.app,
              date: Date.now()
            });
          }, s * n);
        }
      );
    }
    return (o, n) => (m(), k("div", Jr, [
      w("div", qr, [
        n[1] || (n[1] = w("div", { class: "option-category-header p-2 d-flex align-items-center border-top border-bottom" }, [
          w("h6", { class: "m-0 ms-1" }, "Test")
        ], -1)),
        (m(!0), k(K, null, le(d(Qr), (i) => (m(), k("div", {
          class: "templates-list-entry cursor-pointer py-2 px-3",
          onClick: (s) => t(i)
        }, [
          n[0] || (n[0] = w("i", { class: "bi bi-send-plus me-1" }, null, -1)),
          fe(" " + U(i.name), 1)
        ], 8, Kr))), 256))
      ])
    ]));
  }
}), ea = /* @__PURE__ */ Ln(Xr, [["__scopeId", "data-v-c7567ede"]]);
var Re = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, Tn = { exports: {} };
(function(e, t) {
  (function(o, n) {
    n();
  })(Re, function() {
    function o(c, u) {
      return typeof u > "u" ? u = { autoBom: !1 } : typeof u != "object" && (console.warn("Deprecated: Expected third argument to be a object"), u = { autoBom: !u }), u.autoBom && /^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(c.type) ? new Blob(["\uFEFF", c], { type: c.type }) : c;
    }
    function n(c, u, _) {
      var f = new XMLHttpRequest();
      f.open("GET", c), f.responseType = "blob", f.onload = function() {
        l(f.response, u, _);
      }, f.onerror = function() {
        console.error("could not download file");
      }, f.send();
    }
    function i(c) {
      var u = new XMLHttpRequest();
      u.open("HEAD", c, !1);
      try {
        u.send();
      } catch {
      }
      return 200 <= u.status && 299 >= u.status;
    }
    function s(c) {
      try {
        c.dispatchEvent(new MouseEvent("click"));
      } catch {
        var u = document.createEvent("MouseEvents");
        u.initMouseEvent("click", !0, !0, window, 0, 0, 0, 80, 20, !1, !1, !1, !1, 0, null), c.dispatchEvent(u);
      }
    }
    var r = typeof window == "object" && window.window === window ? window : typeof self == "object" && self.self === self ? self : typeof Re == "object" && Re.global === Re ? Re : void 0, a = r.navigator && /Macintosh/.test(navigator.userAgent) && /AppleWebKit/.test(navigator.userAgent) && !/Safari/.test(navigator.userAgent), l = r.saveAs || (typeof window != "object" || window !== r ? function() {
    } : "download" in HTMLAnchorElement.prototype && !a ? function(c, u, _) {
      var f = r.URL || r.webkitURL, v = document.createElement("a");
      u = u || c.name || "download", v.download = u, v.rel = "noopener", typeof c == "string" ? (v.href = c, v.origin === location.origin ? s(v) : i(v.href) ? n(c, u, _) : s(v, v.target = "_blank")) : (v.href = f.createObjectURL(c), setTimeout(function() {
        f.revokeObjectURL(v.href);
      }, 4e4), setTimeout(function() {
        s(v);
      }, 0));
    } : "msSaveOrOpenBlob" in navigator ? function(c, u, _) {
      if (u = u || c.name || "download", typeof c != "string") navigator.msSaveOrOpenBlob(o(c, _), u);
      else if (i(c)) n(c, u, _);
      else {
        var f = document.createElement("a");
        f.href = c, f.target = "_blank", setTimeout(function() {
          s(f);
        });
      }
    } : function(c, u, _, f) {
      if (f = f || open("", "_blank"), f && (f.document.title = f.document.body.innerText = "downloading..."), typeof c == "string") return n(c, u, _);
      var v = c.type === "application/octet-stream", I = /constructor/i.test(r.HTMLElement) || r.safari, T = /CriOS\/[\d]+/.test(navigator.userAgent);
      if ((T || v && I || a) && typeof FileReader < "u") {
        var D = new FileReader();
        D.onloadend = function() {
          var N = D.result;
          N = T ? N : N.replace(/^data:[^;]*;/, "data:attachment/file;"), f ? f.location.href = N : location = N, f = null;
        }, D.readAsDataURL(c);
      } else {
        var C = r.URL || r.webkitURL, O = C.createObjectURL(c);
        f ? f.location = O : location.href = O, f = null, setTimeout(function() {
          C.revokeObjectURL(O);
        }, 4e4);
      }
    });
    r.saveAs = l.saveAs = l, e.exports = l;
  });
})(Tn);
var ta = Tn.exports;
const oa = { class: "panel-body-wrapper d-flex flex-column" }, na = { class: "panel-body-header py-2 px-3 border-bottom text-small d-flex align-items-center" }, ia = { class: "form-check form-check-inline no-min-height" }, sa = ["value"], ra = { class: "form-check form-check-inline no-min-height" }, aa = ["value"], la = { class: "form-check form-switch no-min-height ms-auto" }, ca = { class: "panel-body-body tvke-secondary-bg flex-grow-1 text-small p-3" }, ua = {
  key: 0,
  class: "text-center fst-italic pt-3"
}, da = {
  key: 1,
  class: "mb-2"
}, pa = {
  key: 0,
  class: "mb-2"
}, ga = {
  key: 1,
  class: "mb-2"
}, ha = { class: "output-block d-flex" }, fa = { class: "pre-wrap mb-0 flex-grow-1" }, ma = { class: "d-flex flex-column" }, va = { key: 2 }, _a = {
  key: 0,
  class: "mb-2"
}, ya = {
  key: 1,
  class: "mb-2"
}, ba = { class: "output-block d-flex" }, wa = { class: "pre-wrap mb-0 flex-grow-1" }, Ma = { class: "d-flex flex-column" }, ka = /* @__PURE__ */ X({
  __name: "editor-output",
  setup(e) {
    const t = ee();
    t.$onAction(({ name: M, store: h, args: y, after: E }) => {
      M === "refreshEditorPanels" && E(() => {
        r();
      });
    });
    const o = Y(), n = Y();
    function i(M) {
      t.setOutputFormat(M);
    }
    function s(M) {
      t.minifyOutput(M);
    }
    function r() {
      o.value = a(
        "css"
        /* css */
      ), n.value = a(
        "js"
        /* js */
      );
    }
    function a(M, h) {
      return M === "js" ? T() : v();
    }
    function l(M) {
      return M === "js" ? I() : u();
    }
    function c() {
      let M = Xt();
      return M.sort((h, y) => h.key.localeCompare(y.key)), M = M.filter((h) => h.value.toString() !== h.initialValue.toString()), M;
    }
    function u() {
      const M = c(), h = {};
      return M.forEach((y) => {
        h[y.key] = y.value;
      }), h;
    }
    function _(M) {
      return t.outputFormat === F.json ? '"' + M + '"' : M;
    }
    function f() {
      return t.outputFormat === F.json ? "," : ";";
    }
    function v(M) {
      const h = t.outputMinified, y = "<", E = ">", j = [];
      let g = c();
      return g.length && (t.outputFormat === F.html && (j.push(y + "style" + E), j.push(":root {")), t.outputFormat === F.json && j.push("{"), g.forEach((b) => {
        j.push(
          _(b.key) + ": " + _(b.value.toString()) + f()
        );
      }), j.push("}"), t.outputFormat === F.html && j.push(y + "/style" + E), h && j.push(`
`)), j.join(h ? "" : `
`);
    }
    function I() {
      const M = ht(), h = ft();
      return D(M, h);
    }
    function T(M) {
      const h = t.outputMinified, y = "<", E = ">", j = [], g = ht(), b = ft(), p = D(g, b);
      if (t.outputFormat === F.html) {
        let x = "";
        p && Object.keys(p).length && (x = ","), j.push(y + "script" + E), j.push("TockVueKit.renderChat("), j.push('document.getElementById("<TARGET_ELEMENT_ID>"),'), j.push('"<TOCK_BOT_API_URL>"' + x);
      }
      if (p) {
        const x = h ? 0 : 2;
        Object.keys(p).length && j.push(JSON.stringify(p, null, x));
      }
      return t.outputFormat === F.html && (j.push(")"), j.push(y + "/script" + E)), j.join(h ? "" : `
`);
    }
    function D(M, h) {
      const y = C(M, h);
      if (y)
        return O(y), y;
    }
    function C(M, h, y = {}) {
      if (Oo(M)) {
        const E = Object.entries(M);
        for (let j = 0; j < E.length; j++) {
          const [g, b] = E[j], p = C(b, h[g]);
          typeof p == "object" && p.type === "leaf" ? y[g] = p.value : typeof p < "u" && Object.keys(p).length && (y[g] = p);
        }
        return y;
      } else if (!h || M !== h.default)
        return { type: "leaf", value: M };
    }
    function O(M) {
      if (Oo(M)) {
        const h = Object.entries(M);
        for (let y = 0; y < h.length; y++) {
          const [E, j] = h[y];
          O(j) || delete M[E];
        }
        return M;
      } else
        return typeof M < "u";
    }
    function N(M) {
      Nn(a(M));
    }
    function S(M) {
      const h = M === "css" ? "tvk-css.json" : "tvk-options.json", y = new Blob([JSON.stringify(l(M))], {
        type: "text/plain;charset=utf-8"
      });
      ta.saveAs(y, h);
    }
    return (M, h) => {
      const y = Mt("tooltip");
      return m(), k("div", oa, [
        w("div", na, [
          w("div", null, [
            Z((m(), k("div", ia, [
              Z(w("input", {
                type: "radio",
                class: "form-check-input",
                name: "outputFormat",
                id: "outputFormatHtml",
                value: d(F).html,
                "onUpdate:modelValue": h[0] || (h[0] = (E) => d(t).outputFormat = E),
                onChange: h[1] || (h[1] = (E) => i(d(F).html))
              }, null, 40, sa), [
                [oo, d(t).outputFormat]
              ]),
              h[10] || (h[10] = w("label", {
                class: "form-check-label",
                for: "outputFormatHtml"
              }, "html", -1))
            ])), [
              [y, "Format output for html inclusion"]
            ]),
            Z((m(), k("div", ra, [
              Z(w("input", {
                type: "radio",
                class: "form-check-input",
                name: "outputFormat",
                id: "outputFormatJs",
                value: d(F).json,
                "onUpdate:modelValue": h[2] || (h[2] = (E) => d(t).outputFormat = E),
                onChange: h[3] || (h[3] = (E) => i(d(F).json))
              }, null, 40, aa), [
                [oo, d(t).outputFormat]
              ]),
              h[11] || (h[11] = w("label", {
                class: "form-check-label",
                for: "outputFormatJs"
              }, "json", -1))
            ])), [
              [y, "Format output for js usage"]
            ])
          ]),
          Z((m(), k("div", la, [
            Z(w("input", {
              class: "form-check-input",
              type: "checkbox",
              role: "switch",
              id: "outputMinify",
              "onUpdate:modelValue": h[4] || (h[4] = (E) => d(t).outputMinified = E),
              onChange: h[5] || (h[5] = (E) => s(E.target.checked))
            }, null, 544), [
              [Yo, d(t).outputMinified]
            ]),
            h[12] || (h[12] = w("label", {
              class: "form-check-label",
              for: "outputMinify"
            }, "Minify", -1))
          ])), [
            [y, "Minify output code"]
          ])
        ]),
        w("div", ca, [
          !n.value && !o.value ? (m(), k("div", ua, " All settings set to default ")) : z("", !0),
          n.value ? (m(), k("div", da, [
            d(t).outputFormat === d(F).html ? (m(), k("label", pa, "Script:")) : z("", !0),
            d(t).outputFormat === d(F).json ? (m(), k("label", ga, "Options:")) : z("", !0),
            w("div", ha, [
              w("pre", fa, [
                w("code", null, U(n.value), 1)
              ]),
              w("div", ma, [
                Z((m(), k("button", {
                  type: "button",
                  class: "btn btn-link btn-sm pe-0 pt-0",
                  onClick: h[6] || (h[6] = (E) => N(
                    "js"
                    /* js */
                  ))
                }, h[13] || (h[13] = [
                  w("i", { class: "bi bi-copy" }, null, -1)
                ]))), [
                  [y, "Copy js code"]
                ]),
                d(t).outputFormat === d(F).json ? Z((m(), k("button", {
                  key: 0,
                  type: "button",
                  class: "btn btn-link btn-sm pe-0",
                  onClick: h[7] || (h[7] = (E) => S(
                    "js"
                    /* js */
                  ))
                }, h[14] || (h[14] = [
                  w("i", { class: "bi bi-file-earmark-arrow-down" }, null, -1)
                ]))), [
                  [y, "Download js code"]
                ]) : z("", !0)
              ])
            ])
          ])) : z("", !0),
          o.value ? (m(), k("div", va, [
            d(t).outputFormat === d(F).html ? (m(), k("label", _a, "Style:")) : z("", !0),
            d(t).outputFormat === d(F).json ? (m(), k("label", ya, "Css variables:")) : z("", !0),
            w("div", ba, [
              w("pre", wa, [
                w("code", null, U(o.value), 1)
              ]),
              w("div", Ma, [
                Z((m(), k("button", {
                  type: "button",
                  class: "btn btn-link btn-sm pe-0 pt-0",
                  onClick: h[8] || (h[8] = (E) => N(
                    "css"
                    /* css */
                  ))
                }, h[15] || (h[15] = [
                  w("i", { class: "bi bi-copy" }, null, -1)
                ]))), [
                  [y, "Copy css code"]
                ]),
                d(t).outputFormat === d(F).json ? Z((m(), k("button", {
                  key: 0,
                  type: "button",
                  class: "btn btn-link btn-sm pe-0",
                  onClick: h[9] || (h[9] = (E) => S(
                    "css"
                    /* css */
                  ))
                }, h[16] || (h[16] = [
                  w("i", { class: "bi bi-file-earmark-arrow-down" }, null, -1)
                ]))), [
                  [y, "Download css code"]
                ]) : z("", !0)
              ])
            ])
          ])) : z("", !0)
        ])
      ]);
    };
  }
}), Ia = { id: "tock-vue-kit-editor" }, xa = { class: "panel-menu" }, ja = { class: "panel-body flex-grow-1 position-relative" }, La = /* @__PURE__ */ X({
  __name: "editor",
  props: {
    height: { default: "100vh" }
  },
  setup(e) {
    Ye(ys()), Po().appContext.app.use(Hi);
    const o = ee();
    return Y("100vh"), Xe(() => {
      o.refreshEditorPanels();
    }), (n, i) => {
      const s = Mt("tooltip");
      return m(), k("div", Ia, [
        w("div", {
          class: "panel-wrapper d-flex",
          style: Ve({ height: n.height })
        }, [
          w("div", xa, [
            Z((m(), k("div", {
              class: Q(["panel-menu-entry", {
                active: d(o).editorPanel === d(B).templates
              }]),
              onClick: i[0] || (i[0] = (r) => d(o).setEditorPanel(d(B).templates))
            }, i[6] || (i[6] = [
              w("i", { class: "bi bi-layout-text-sidebar-reverse" }, null, -1)
            ]), 2)), [
              [s, { content: "Templates", placement: "right" }]
            ]),
            Z((m(), k("div", {
              class: Q(["panel-menu-entry", {
                active: d(o).editorPanel === d(B).preferences
              }]),
              onClick: i[1] || (i[1] = (r) => d(o).setEditorPanel(d(B).preferences))
            }, i[7] || (i[7] = [
              w("i", { class: "bi bi-gear" }, null, -1)
            ]), 2)), [
              [s, { content: "Preferences", placement: "right" }]
            ]),
            Z((m(), k("div", {
              class: Q(["panel-menu-entry", {
                active: d(o).editorPanel === d(B).wording
              }]),
              onClick: i[2] || (i[2] = (r) => d(o).setEditorPanel(d(B).wording))
            }, i[8] || (i[8] = [
              w("i", { class: "bi bi-file-word" }, null, -1)
            ]), 2)), [
              [s, { content: "Wording", placement: "right" }]
            ]),
            Z((m(), k("div", {
              class: Q(["panel-menu-entry", {
                active: d(o).editorPanel === d(B).styling
              }]),
              onClick: i[3] || (i[3] = (r) => d(o).setEditorPanel(d(B).styling))
            }, i[9] || (i[9] = [
              w("i", { class: "bi bi-filetype-css" }, null, -1)
            ]), 2)), [
              [s, { content: "Styling", placement: "right" }]
            ]),
            Z((m(), k("div", {
              class: Q(["panel-menu-entry", {
                active: d(o).editorPanel === d(B).test
              }]),
              onClick: i[4] || (i[4] = (r) => d(o).setEditorPanel(d(B).test))
            }, i[10] || (i[10] = [
              w("i", { class: "bi bi-play-circle" }, null, -1)
            ]), 2)), [
              [s, { content: "Test", placement: "right" }]
            ]),
            Z((m(), k("div", {
              class: Q(["panel-menu-entry", {
                active: d(o).editorPanel === d(B).output
              }]),
              onClick: i[5] || (i[5] = (r) => d(o).setEditorPanel(d(B).output))
            }, i[11] || (i[11] = [
              w("i", { class: "bi bi-floppy" }, null, -1)
            ]), 2)), [
              [s, { content: "Output", placement: "right" }]
            ])
          ]),
          w("div", ja, [
            d(o).editorPanel === d(B).templates ? (m(), q(Ys, { key: 0 })) : z("", !0),
            d(o).editorPanel === d(B).styling ? (m(), q(rr, { key: 1 })) : z("", !0),
            d(o).editorPanel === d(B).preferences ? (m(), q(Zr, { key: 2 })) : z("", !0),
            d(o).editorPanel === d(B).wording ? (m(), q(Hr, { key: 3 })) : z("", !0),
            d(o).editorPanel === d(B).test ? (m(), q(ea, { key: 4 })) : z("", !0),
            d(o).editorPanel === d(B).output ? (m(), q(ka, { key: 5 })) : z("", !0)
          ])
        ], 4)
      ]);
    };
  }
});
export {
  La as TvkEditor
};
