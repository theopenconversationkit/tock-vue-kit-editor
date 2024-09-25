import { pushScopeId as Ao, popScopeId as Eo, defineComponent as X, nextTick as Ot, openBlock as f, createBlock as K, createElementBlock as I, normalizeClass as Q, renderSlot as ut, normalizeProps as On, guardReactiveProps as An, withScopeId as En, resolveComponent as ze, normalizeStyle as We, withKeys as zn, createElementVNode as w, Fragment as q, createCommentVNode as z, mergeProps as zo, withCtx as dt, createVNode as Zt, ref as Y, createApp as Pn, h as $n, toDisplayString as F, effectScope as Po, markRaw as xe, toRaw as bt, watch as Vt, unref as d, hasInjectionContext as Yn, inject as Gn, getCurrentInstance as $o, reactive as Rn, isRef as Le, isReactive as Bt, toRef as St, computed as Yo, getCurrentScope as Wn, onScopeDispose as Zn, toRefs as to, renderList as le, createTextVNode as fe, onMounted as qe, onBeforeUnmount as Vn, resolveDirective as wt, withDirectives as W, withModifiers as Bn, vModelCheckbox as Go, vModelRadio as oo } from "vue";
import { reload as Fn, updateTvkOption as Un, getTvkCurrentOptions as pt, getTvkDefaultOptions as ht, addTvkMessage as no } from "tock-vue-kit";
const Hn = ["top", "right", "bottom", "left"], io = ["start", "end"], so = /* @__PURE__ */ Hn.reduce((e, t) => e.concat(t, t + "-" + io[0], t + "-" + io[1]), []), Se = Math.min, ke = Math.max, Qn = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
}, Jn = {
  start: "end",
  end: "start"
};
function At(e, t, o) {
  return ke(e, Se(t, o));
}
function De(e, t) {
  return typeof e == "function" ? e(t) : e;
}
function he(e) {
  return e.split("-")[0];
}
function re(e) {
  return e.split("-")[1];
}
function Ro(e) {
  return e === "x" ? "y" : "x";
}
function Ft(e) {
  return e === "y" ? "height" : "width";
}
function Xe(e) {
  return ["top", "bottom"].includes(he(e)) ? "y" : "x";
}
function Ut(e) {
  return Ro(Xe(e));
}
function Wo(e, t, o) {
  o === void 0 && (o = !1);
  const n = re(e), i = Ut(e), s = Ft(i);
  let r = i === "x" ? n === (o ? "end" : "start") ? "right" : "left" : n === "start" ? "bottom" : "top";
  return t.reference[s] > t.floating[s] && (r = ft(r)), [r, ft(r)];
}
function Kn(e) {
  const t = ft(e);
  return [gt(e), t, gt(t)];
}
function gt(e) {
  return e.replace(/start|end/g, (t) => Jn[t]);
}
function qn(e, t, o) {
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
  let s = qn(he(e), o === "start", n);
  return i && (s = s.map((r) => r + "-" + i), t && (s = s.concat(s.map(gt)))), s;
}
function ft(e) {
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
function Zo(e) {
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
  const s = Xe(t), r = Ut(t), a = Ft(r), l = he(t), c = s === "y", u = n.x + n.width / 2 - i.width / 2, _ = n.y + n.height / 2 - i.height / 2, g = n[a] / 2 - i[a] / 2;
  let m;
  switch (l) {
    case "top":
      m = {
        x: u,
        y: n.y - i.height
      };
      break;
    case "bottom":
      m = {
        x: u,
        y: n.y + n.height
      };
      break;
    case "right":
      m = {
        x: n.x + n.width,
        y: _
      };
      break;
    case "left":
      m = {
        x: n.x - i.width,
        y: _
      };
      break;
    default:
      m = {
        x: n.x,
        y: n.y
      };
  }
  switch (re(t)) {
    case "start":
      m[r] -= g * (o && c ? -1 : 1);
      break;
    case "end":
      m[r] += g * (o && c ? -1 : 1);
      break;
  }
  return m;
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
  } = ro(c, n, l), g = n, m = {}, k = 0;
  for (let L = 0; L < a.length; L++) {
    const {
      name: D,
      fn: C
    } = a[L], {
      x: O,
      y: N,
      data: S,
      reset: M
    } = await C({
      x: u,
      y: _,
      initialPlacement: n,
      placement: g,
      strategy: i,
      middlewareData: m,
      rects: c,
      platform: r,
      elements: {
        reference: e,
        floating: t
      }
    });
    u = O ?? u, _ = N ?? _, m = {
      ...m,
      [D]: {
        ...m[D],
        ...S
      }
    }, M && k <= 50 && (k++, typeof M == "object" && (M.placement && (g = M.placement), M.rects && (c = M.rects === !0 ? await r.getElementRects({
      reference: e,
      floating: t,
      strategy: i
    }) : M.rects), {
      x: u,
      y: _
    } = ro(c, g, l)), L = -1);
  }
  return {
    x: u,
    y: _,
    placement: g,
    strategy: i,
    middlewareData: m
  };
};
async function Mt(e, t) {
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
    altBoundary: g = !1,
    padding: m = 0
  } = De(t, e), k = Zo(m), D = a[g ? _ === "floating" ? "reference" : "floating" : _], C = Ze(await s.getClippingRect({
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
    top: (C.top - M.top + k.top) / S.y,
    bottom: (M.bottom - C.bottom + k.bottom) / S.y,
    left: (C.left - M.left + k.left) / S.x,
    right: (M.right - C.right + k.right) / S.x
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
    } = De(e, t) || {};
    if (c == null)
      return {};
    const _ = Zo(u), g = {
      x: o,
      y: n
    }, m = Ut(i), k = Ft(m), L = await r.getDimensions(c), D = m === "y", C = D ? "top" : "left", O = D ? "bottom" : "right", N = D ? "clientHeight" : "clientWidth", S = s.reference[k] + s.reference[m] - g[m] - s.floating[k], M = g[m] - s.reference[m], b = await (r.getOffsetParent == null ? void 0 : r.getOffsetParent(c));
    let v = b ? b[N] : 0;
    (!v || !await (r.isElement == null ? void 0 : r.isElement(b))) && (v = a.floating[N] || s.floating[k]);
    const E = S / 2 - M / 2, j = v / 2 - L[k] / 2 - 1, h = Se(_[C], j), y = Se(_[O], j), p = h, x = v - L[k] - y, A = v / 2 - L[k] / 2 + E, T = At(p, A, x), P = !l.arrow && re(i) != null && A !== T && s.reference[k] / 2 - (A < p ? h : y) - L[k] / 2 < 0, G = P ? A < p ? A - p : A - x : 0;
    return {
      [m]: g[m] + G,
      data: {
        [m]: T,
        centerOffset: A - T - G,
        ...P && {
          alignmentOffset: G
        }
      },
      reset: P
    };
  }
});
function ni(e, t, o) {
  return (e ? [...o.filter((i) => re(i) === e), ...o.filter((i) => re(i) !== e)] : o.filter((i) => he(i) === i)).filter((i) => e ? re(i) === e || (t ? gt(i) !== i : !1) : !0);
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
        allowedPlacements: g = so,
        autoAlignment: m = !0,
        ...k
      } = De(e, t), L = _ !== void 0 || g === so ? ni(_ || null, m, g) : g, D = await Mt(t, k), C = ((o = r.autoPlacement) == null ? void 0 : o.index) || 0, O = L[C];
      if (O == null)
        return {};
      const N = Wo(O, s, await (l.isRTL == null ? void 0 : l.isRTL(c.floating)));
      if (a !== O)
        return {
          reset: {
            placement: L[0]
          }
        };
      const S = [D[he(O)], D[N[0]], D[N[1]]], M = [...((n = r.autoPlacement) == null ? void 0 : n.overflows) || [], {
        placement: O,
        overflows: S
      }], b = L[C + 1];
      if (b)
        return {
          data: {
            index: C + 1,
            overflows: M
          },
          reset: {
            placement: b
          }
        };
      const v = M.map((h) => {
        const y = re(h.placement);
        return [h.placement, y && u ? (
          // Check along the mainAxis and main crossAxis side.
          h.overflows.slice(0, 2).reduce((p, x) => p + x, 0)
        ) : (
          // Check only the mainAxis.
          h.overflows[0]
        ), h.overflows];
      }).sort((h, y) => h[1] - y[1]), j = ((i = v.filter((h) => h[2].slice(
        0,
        // Aligned placements should not check their opposite crossAxis
        // side.
        re(h[0]) ? 2 : 3
      ).every((y) => y <= 0))[0]) == null ? void 0 : i[0]) || v[0][0];
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
        fallbackPlacements: g,
        fallbackStrategy: m = "bestFit",
        fallbackAxisSideDirection: k = "none",
        flipAlignment: L = !0,
        ...D
      } = De(e, t);
      if ((o = s.arrow) != null && o.alignmentOffset)
        return {};
      const C = he(i), O = he(a) === a, N = await (l.isRTL == null ? void 0 : l.isRTL(c.floating)), S = g || (O || !L ? [ft(a)] : Kn(a));
      !g && k !== "none" && S.push(...Xn(a, L, k, N));
      const M = [a, ...S], b = await Mt(t, D), v = [];
      let E = ((n = s.flip) == null ? void 0 : n.overflows) || [];
      if (u && v.push(b[C]), _) {
        const p = Wo(i, r, N);
        v.push(b[p[0]], b[p[1]]);
      }
      if (E = [...E, {
        placement: i,
        overflows: v
      }], !v.every((p) => p <= 0)) {
        var j, h;
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
        let A = (h = E.filter((T) => T.overflows[0] <= 0).sort((T, P) => T.overflows[1] - P.overflows[1])[0]) == null ? void 0 : h.placement;
        if (!A)
          switch (m) {
            case "bestFit": {
              var y;
              const T = (y = E.map((P) => [P.placement, P.overflows.filter((G) => G > 0).reduce((G, Z) => G + Z, 0)]).sort((P, G) => P[1] - G[1])[0]) == null ? void 0 : y[0];
              T && (A = T);
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
  } = e, s = await (n.isRTL == null ? void 0 : n.isRTL(i.floating)), r = he(o), a = re(o), l = Xe(o) === "y", c = ["left", "top"].includes(r) ? -1 : 1, u = s && l ? -1 : 1, _ = De(t, e);
  let {
    mainAxis: g,
    crossAxis: m,
    alignmentAxis: k
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
  return a && typeof k == "number" && (m = a === "end" ? k * -1 : k), l ? {
    x: m * u,
    y: g * c
  } : {
    x: g * c,
    y: m * u
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
      } = De(e, t), c = {
        x: o,
        y: n
      }, u = await Mt(t, l), _ = Xe(he(i)), g = Ro(_);
      let m = c[g], k = c[_];
      if (s) {
        const D = g === "y" ? "top" : "left", C = g === "y" ? "bottom" : "right", O = m + u[D], N = m - u[C];
        m = At(O, m, N);
      }
      if (r) {
        const D = _ === "y" ? "top" : "left", C = _ === "y" ? "bottom" : "right", O = k + u[D], N = k - u[C];
        k = At(O, k, N);
      }
      const L = a.fn({
        ...t,
        [g]: m,
        [_]: k
      });
      return {
        ...L,
        data: {
          x: L.x - o,
          y: L.y - n
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
      } = De(e, t), l = await Mt(t, a), c = he(o), u = re(o), _ = Xe(o) === "y", {
        width: g,
        height: m
      } = n.floating;
      let k, L;
      c === "top" || c === "bottom" ? (k = c, L = u === (await (i.isRTL == null ? void 0 : i.isRTL(s.floating)) ? "start" : "end") ? "left" : "right") : (L = c, k = u === "end" ? "top" : "bottom");
      const D = m - l.top - l.bottom, C = g - l.left - l.right, O = Se(m - l[k], D), N = Se(g - l[L], C), S = !t.middlewareData.shift;
      let M = O, b = N;
      if (_ ? b = u || S ? Se(N, C) : C : M = u || S ? Se(O, D) : D, S && !u) {
        const E = ke(l.left, 0), j = ke(l.right, 0), h = ke(l.top, 0), y = ke(l.bottom, 0);
        _ ? b = g - 2 * (E !== 0 || j !== 0 ? E + j : ke(l.left, l.right)) : M = m - 2 * (h !== 0 || y !== 0 ? h + y : ke(l.top, l.bottom));
      }
      await r({
        ...t,
        availableWidth: b,
        availableHeight: M
      });
      const v = await i.getDimensions(s.floating);
      return g !== v.width || m !== v.height ? {
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
const ao = Math.min, Ve = Math.max, mt = Math.round;
function Vo(e) {
  const t = ue(e);
  let o = parseFloat(t.width), n = parseFloat(t.height);
  const i = e.offsetWidth, s = e.offsetHeight, r = mt(o) !== i || mt(n) !== s;
  return r && (o = i, n = s), { width: o, height: n, fallback: r };
}
function Me(e) {
  return Fo(e) ? (e.nodeName || "").toLowerCase() : "";
}
let et;
function Bo() {
  if (et) return et;
  const e = navigator.userAgentData;
  return e && Array.isArray(e.brands) ? (et = e.brands.map((t) => t.brand + "/" + t.version).join(" "), et) : navigator.userAgent;
}
function de(e) {
  return e instanceof ne(e).HTMLElement;
}
function be(e) {
  return e instanceof ne(e).Element;
}
function Fo(e) {
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
  return ["table", "td", "th"].includes(Me(e));
}
function Et(e) {
  const t = /firefox/i.test(Bo()), o = ue(e), n = o.backdropFilter || o.WebkitBackdropFilter;
  return o.transform !== "none" || o.perspective !== "none" || !!n && n !== "none" || t && o.willChange === "filter" || t && !!o.filter && o.filter !== "none" || ["transform", "perspective"].some((i) => o.willChange.includes(i)) || ["paint", "layout", "strict", "content"].some((i) => {
    const s = o.contain;
    return s != null && s.includes(i);
  });
}
function Uo() {
  return !/^((?!chrome|android).)*safari/i.test(Bo());
}
function Ht(e) {
  return ["html", "body", "#document"].includes(Me(e));
}
function Ho(e) {
  return be(e) ? e : e.contextElement;
}
const Qo = { x: 1, y: 1 };
function Ee(e) {
  const t = Ho(e);
  if (!de(t)) return Qo;
  const o = t.getBoundingClientRect(), { width: n, height: i, fallback: s } = Vo(t);
  let r = (s ? mt(o.width) : o.width) / n, a = (s ? mt(o.height) : o.height) / i;
  return r && Number.isFinite(r) || (r = 1), a && Number.isFinite(a) || (a = 1), { x: r, y: a };
}
function He(e, t, o, n) {
  var i, s;
  t === void 0 && (t = !1), o === void 0 && (o = !1);
  const r = e.getBoundingClientRect(), a = Ho(e);
  let l = Qo;
  t && (n ? be(n) && (l = Ee(n)) : l = Ee(e));
  const c = a ? ne(a) : window, u = !Uo() && o;
  let _ = (r.left + (u && ((i = c.visualViewport) == null ? void 0 : i.offsetLeft) || 0)) / l.x, g = (r.top + (u && ((s = c.visualViewport) == null ? void 0 : s.offsetTop) || 0)) / l.y, m = r.width / l.x, k = r.height / l.y;
  if (a) {
    const L = ne(a), D = n && be(n) ? ne(n) : n;
    let C = L.frameElement;
    for (; C && n && D !== L; ) {
      const O = Ee(C), N = C.getBoundingClientRect(), S = getComputedStyle(C);
      N.x += (C.clientLeft + parseFloat(S.paddingLeft)) * O.x, N.y += (C.clientTop + parseFloat(S.paddingTop)) * O.y, _ *= O.x, g *= O.y, m *= O.x, k *= O.y, _ += N.x, g += N.y, C = ne(C).frameElement;
    }
  }
  return { width: m, height: k, top: g, right: _ + m, bottom: g + k, left: _, x: _, y: g };
}
function we(e) {
  return ((Fo(e) ? e.ownerDocument : e.document) || window.document).documentElement;
}
function kt(e) {
  return be(e) ? { scrollLeft: e.scrollLeft, scrollTop: e.scrollTop } : { scrollLeft: e.pageXOffset, scrollTop: e.pageYOffset };
}
function Jo(e) {
  return He(we(e)).left + kt(e).scrollLeft;
}
function Qe(e) {
  if (Me(e) === "html") return e;
  const t = e.assignedSlot || e.parentNode || lo(e) && e.host || we(e);
  return lo(t) ? t.host : t;
}
function Ko(e) {
  const t = Qe(e);
  return Ht(t) ? t.ownerDocument.body : de(t) && It(t) ? t : Ko(t);
}
function _t(e, t) {
  var o;
  t === void 0 && (t = []);
  const n = Ko(e), i = n === ((o = e.ownerDocument) == null ? void 0 : o.body), s = ne(n);
  return i ? t.concat(s, s.visualViewport || [], It(n) ? n : []) : t.concat(n, _t(n));
}
function co(e, t, o) {
  return t === "viewport" ? Ze(function(n, i) {
    const s = ne(n), r = we(n), a = s.visualViewport;
    let l = r.clientWidth, c = r.clientHeight, u = 0, _ = 0;
    if (a) {
      l = a.width, c = a.height;
      const g = Uo();
      (g || !g && i === "fixed") && (u = a.offsetLeft, _ = a.offsetTop);
    }
    return { width: l, height: c, x: u, y: _ };
  }(e, o)) : be(t) ? Ze(function(n, i) {
    const s = He(n, !0, i === "fixed"), r = s.top + n.clientTop, a = s.left + n.clientLeft, l = de(n) ? Ee(n) : { x: 1, y: 1 };
    return { width: n.clientWidth * l.x, height: n.clientHeight * l.y, x: a * l.x, y: r * l.y };
  }(t, o)) : Ze(function(n) {
    const i = we(n), s = kt(n), r = n.ownerDocument.body, a = Ve(i.scrollWidth, i.clientWidth, r.scrollWidth, r.clientWidth), l = Ve(i.scrollHeight, i.clientHeight, r.scrollHeight, r.clientHeight);
    let c = -s.scrollLeft + Jo(n);
    const u = -s.scrollTop;
    return ue(r).direction === "rtl" && (c += Ve(i.clientWidth, r.clientWidth) - a), { width: a, height: l, x: c, y: u };
  }(we(e)));
}
function uo(e) {
  return de(e) && ue(e).position !== "fixed" ? e.offsetParent : null;
}
function po(e) {
  const t = ne(e);
  let o = uo(e);
  for (; o && ui(o) && ue(o).position === "static"; ) o = uo(o);
  return o && (Me(o) === "html" || Me(o) === "body" && ue(o).position === "static" && !Et(o)) ? t : o || function(n) {
    let i = Qe(n);
    for (; de(i) && !Ht(i); ) {
      if (Et(i)) return i;
      i = Qe(i);
    }
    return null;
  }(e) || t;
}
function di(e, t, o) {
  const n = de(t), i = we(t), s = He(e, !0, o === "fixed", t);
  let r = { scrollLeft: 0, scrollTop: 0 };
  const a = { x: 0, y: 0 };
  if (n || !n && o !== "fixed") if ((Me(t) !== "body" || It(i)) && (r = kt(t)), de(t)) {
    const l = He(t, !0);
    a.x = l.x + t.clientLeft, a.y = l.y + t.clientTop;
  } else i && (a.x = Jo(i));
  return { x: s.left + r.scrollLeft - a.x, y: s.top + r.scrollTop - a.y, width: s.width, height: s.height };
}
const pi = { getClippingRect: function(e) {
  let { element: t, boundary: o, rootBoundary: n, strategy: i } = e;
  const s = o === "clippingAncestors" ? function(c, u) {
    const _ = u.get(c);
    if (_) return _;
    let g = _t(c).filter((D) => be(D) && Me(D) !== "body"), m = null;
    const k = ue(c).position === "fixed";
    let L = k ? Qe(c) : c;
    for (; be(L) && !Ht(L); ) {
      const D = ue(L), C = Et(L);
      (k ? C || m : C || D.position !== "static" || !m || !["absolute", "fixed"].includes(m.position)) ? m = D : g = g.filter((O) => O !== L), L = Qe(L);
    }
    return u.set(c, g), g;
  }(t, this._c) : [].concat(o), r = [...s, n], a = r[0], l = r.reduce((c, u) => {
    const _ = co(t, u, i);
    return c.top = Ve(_.top, c.top), c.right = ao(_.right, c.right), c.bottom = ao(_.bottom, c.bottom), c.left = Ve(_.left, c.left), c;
  }, co(t, a, i));
  return { width: l.right - l.left, height: l.bottom - l.top, x: l.left, y: l.top };
}, convertOffsetParentRelativeRectToViewportRelativeRect: function(e) {
  let { rect: t, offsetParent: o, strategy: n } = e;
  const i = de(o), s = we(o);
  if (o === s) return t;
  let r = { scrollLeft: 0, scrollTop: 0 }, a = { x: 1, y: 1 };
  const l = { x: 0, y: 0 };
  if ((i || !i && n !== "fixed") && ((Me(o) !== "body" || It(s)) && (r = kt(o)), de(o))) {
    const c = He(o);
    a = Ee(o), l.x = c.x + o.clientLeft, l.y = c.y + o.clientTop;
  }
  return { width: t.width * a.x, height: t.height * a.y, x: t.x * a.x - r.scrollLeft * a.x + l.x, y: t.y * a.y - r.scrollTop * a.y + l.y };
}, isElement: be, getDimensions: function(e) {
  return de(e) ? Vo(e) : e.getBoundingClientRect();
}, getOffsetParent: po, getDocumentElement: we, getScale: Ee, async getElementRects(e) {
  let { reference: t, floating: o, strategy: n } = e;
  const i = this.getOffsetParent || po, s = this.getDimensions;
  return { reference: di(t, await i(o), n), floating: { x: 0, y: 0, ...await s(o) } };
}, getClientRects: (e) => Array.from(e.getClientRects()), isRTL: (e) => ue(e).direction === "rtl" }, hi = (e, t, o) => {
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
function Je(e, t) {
  let o = ae.themes[e] || {}, n;
  do
    n = o[t], typeof n > "u" ? o.$extend ? o = ae.themes[o.$extend] || {} : (o = null, n = ae[t]) : o = null;
  while (o);
  return n;
}
function gi(e) {
  const t = [e];
  let o = ae.themes[e] || {};
  do
    o.$extend && !o.$resetCss ? (t.push(o.$extend), o = ae.themes[o.$extend] || {}) : o = null;
  while (o);
  return t.map((n) => `v-popper--theme-${n}`);
}
function ho(e) {
  const t = [e];
  let o = ae.themes[e] || {};
  do
    o.$extend ? (t.push(o.$extend), o = ae.themes[o.$extend] || {}) : o = null;
  while (o);
  return t;
}
let Pe = !1;
if (typeof window < "u") {
  Pe = !1;
  try {
    const e = Object.defineProperty({}, "passive", {
      get() {
        Pe = !0;
      }
    });
    window.addEventListener("test", null, e);
  } catch {
  }
}
let Xo = !1;
typeof window < "u" && typeof navigator < "u" && (Xo = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream);
const en = ["auto", "top", "bottom", "left", "right"].reduce((e, t) => e.concat([
  t,
  `${t}-start`,
  `${t}-end`
]), []), go = {
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
const _o = {};
function vo(e) {
  let t = _o[e];
  return t || (t = _o[e] = []), t;
}
let zt = function() {
};
typeof window < "u" && (zt = window.Element);
function $(e) {
  return function(t) {
    return Je(t.theme, e);
  };
}
const Tt = "__floating-vue__popper", tn = () => X({
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
      validator: (e) => en.includes(e)
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
      type: [String, Object, zt, Boolean],
      default: $("container")
    },
    boundary: {
      type: [String, zt],
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
      const o = await hi(this.$_referenceNode, this.$_popperNode, e);
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
        ..._t(this.$_referenceNode),
        ..._t(this.$_popperNode)
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
      for (const t of ho(this.theme))
        vo(t).push(this), document.body.classList.add(`v-popper--some-open--${t}`);
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
      for (const o of ho(this.theme)) {
        const n = vo(o);
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
      this.$_registerTriggerListeners(this.$_targetNodes, go, this.triggers, this.showTriggers, e), this.$_registerTriggerListeners([this.$_popperNode], go, this.popperTriggers, this.popperShowTriggers, e);
      const t = (o) => {
        o.usedByTooltip || this.hide({ event: o });
      };
      this.$_registerTriggerListeners(this.$_targetNodes, fo, this.triggers, this.hideTriggers, t), this.$_registerTriggerListeners([this.$_popperNode], fo, this.popperTriggers, this.popperHideTriggers, t);
    },
    $_registerEventListeners(e, t, o) {
      this.$_events.push({ targetNodes: e, eventType: t, handler: o }), e.forEach((n) => n.addEventListener(t, o, Pe ? {
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
      if (Be >= e.left && Be <= e.right && Fe >= e.top && Fe <= e.bottom) {
        const t = this.$_popperNode.getBoundingClientRect(), o = Be - _e, n = Fe - ve, i = t.left + t.width / 2 - _e + (t.top + t.height / 2) - ve + t.width + t.height, s = _e + o * i, r = ve + n * i;
        return tt(_e, ve, s, r, t.left, t.top, t.left, t.bottom) || // Left edge
        tt(_e, ve, s, r, t.left, t.top, t.right, t.top) || // Top edge
        tt(_e, ve, s, r, t.right, t.top, t.right, t.bottom) || // Right edge
        tt(_e, ve, s, r, t.left, t.bottom, t.right, t.bottom);
      }
      return !1;
    }
  },
  render() {
    return this.$slots.default(this.slotData);
  }
});
if (typeof document < "u" && typeof window < "u") {
  if (Xo) {
    const e = Pe ? {
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
    on(e, t);
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
  ae.autoHideOnMousedown || on(e, t);
}
function on(e, t) {
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
let _e = 0, ve = 0, Be = 0, Fe = 0;
typeof window < "u" && window.addEventListener("mousemove", (e) => {
  _e = Be, ve = Fe, Be = e.clientX, Fe = e.clientY;
}, Pe ? {
  passive: !0
} : void 0);
function tt(e, t, o, n, i, s, r, a) {
  const l = ((r - i) * (t - s) - (a - s) * (e - i)) / ((a - s) * (o - e) - (r - i) * (n - t)), c = ((o - e) * (t - s) - (n - t) * (e - i)) / ((a - s) * (o - e) - (r - i) * (n - t));
  return l >= 0 && l <= 1 && c >= 0 && c <= 1;
}
const _i = {
  extends: tn()
}, jt = (e, t) => {
  const o = e.__vccOpts || e;
  for (const [n, i] of t)
    o[n] = i;
  return o;
};
function vi(e, t, o, n, i, s) {
  return f(), I("div", {
    ref: "reference",
    class: Q(["v-popper", {
      "v-popper--shown": e.slotData.isShown
    }])
  }, [
    ut(e.$slots, "default", On(An(e.slotData)))
  ], 2);
}
const yi = /* @__PURE__ */ jt(_i, [["render", vi]]);
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
let st;
function Pt() {
  Pt.init || (Pt.init = !0, st = bi() !== -1);
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
    Pt(), Ot(() => {
      this._w = this.$el.offsetWidth, this._h = this.$el.offsetHeight, this.emitOnMount && this.emitSize();
    });
    const e = document.createElement("object");
    this._resizeObject = e, e.setAttribute("aria-hidden", "true"), e.setAttribute("tabindex", -1), e.onload = this.addResizeHandlers, e.type = "text/html", st && this.$el.appendChild(e), e.data = "about:blank", st || this.$el.appendChild(e);
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
      this._resizeObject && this._resizeObject.onload && (!st && this._resizeObject.contentDocument && this._resizeObject.contentDocument.defaultView.removeEventListener("resize", this.compareAndNotify), this.$el.removeChild(this._resizeObject), this._resizeObject.onload = null, this._resizeObject = null);
    }
  }
};
const wi = /* @__PURE__ */ En("data-v-b329ee4c");
Ao("data-v-b329ee4c");
const Mi = {
  class: "resize-observer",
  tabindex: "-1"
};
Eo();
const Ii = /* @__PURE__ */ wi((e, t, o, n, i, s) => (f(), K("div", Mi)));
Nt.render = Ii;
Nt.__scopeId = "data-v-b329ee4c";
Nt.__file = "src/components/ResizeObserver.vue";
const nn = (e = "theme") => ({
  computed: {
    themeClass() {
      return gi(this[e]);
    }
  }
}), ki = X({
  name: "VPopperContent",
  components: {
    ResizeObserver: Nt
  },
  mixins: [
    nn()
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
}), ji = ["id", "aria-hidden", "tabindex", "data-popper-placement"], Ni = {
  ref: "inner",
  class: "v-popper__inner"
}, xi = /* @__PURE__ */ w("div", { class: "v-popper__arrow-outer" }, null, -1), Si = /* @__PURE__ */ w("div", { class: "v-popper__arrow-inner" }, null, -1), Li = [
  xi,
  Si
];
function Ti(e, t, o, n, i, s) {
  const r = ze("ResizeObserver");
  return f(), I("div", {
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
    style: We(e.result ? {
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
      style: We(e.result ? {
        transformOrigin: e.result.transformOrigin
      } : void 0)
    }, [
      w("div", Ni, [
        e.mounted ? (f(), I(q, { key: 0 }, [
          w("div", null, [
            ut(e.$slots, "default")
          ]),
          e.handleResize ? (f(), K(r, {
            key: 0,
            onNotify: t[1] || (t[1] = (a) => e.$emit("resize", a))
          })) : z("", !0)
        ], 64)) : z("", !0)
      ], 512),
      w("div", {
        ref: "arrow",
        class: "v-popper__arrow-container",
        style: We(e.result ? {
          left: e.toPx(e.result.arrow.x),
          top: e.toPx(e.result.arrow.y)
        } : void 0)
      }, Li, 4)
    ], 4)
  ], 46, ji);
}
const sn = /* @__PURE__ */ jt(ki, [["render", Ti]]), rn = {
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
let $t = function() {
};
typeof window < "u" && ($t = window.Element);
const Di = X({
  name: "VPopperWrapper",
  components: {
    Popper: yi,
    PopperContent: sn
  },
  mixins: [
    rn,
    nn("finalTheme")
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
      type: [String, Object, $t, Boolean],
      default: void 0
    },
    boundary: {
      type: [String, $t],
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
  const r = ze("PopperContent"), a = ze("Popper");
  return f(), K(a, zo({ ref: "popper" }, e.$props, {
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
    default: dt(({
      popperId: l,
      isShown: c,
      shouldMountContent: u,
      skipTransition: _,
      autoHide: g,
      show: m,
      hide: k,
      handleResize: L,
      onResize: D,
      classes: C,
      result: O
    }) => [
      ut(e.$slots, "default", {
        shown: c,
        show: m,
        hide: k
      }),
      Zt(r, {
        ref: "popperContent",
        "popper-id": l,
        theme: e.finalTheme,
        shown: c,
        mounted: u,
        "skip-transition": _,
        "auto-hide": g,
        "handle-resize": L,
        classes: C,
        result: O,
        onHide: k,
        onResize: D
      }, {
        default: dt(() => [
          ut(e.$slots, "popper", {
            shown: c,
            hide: k
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
    Popper: tn(),
    PopperContent: sn
  },
  mixins: [
    rn
  ],
  inheritAttrs: !1,
  props: {
    theme: {
      type: String,
      default: "tooltip"
    },
    html: {
      type: Boolean,
      default: (e) => Je(e.theme, "html")
    },
    content: {
      type: [String, Number, Function],
      default: null
    },
    loadingContent: {
      type: String,
      default: (e) => Je(e.theme, "loadingContent")
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
  const r = ze("PopperContent"), a = ze("Popper");
  return f(), K(a, zo({ ref: "popper" }, e.$attrs, {
    theme: e.theme,
    "target-nodes": e.targetNodes,
    "popper-node": () => e.$refs.popperContent.$el,
    onApplyShow: e.onShow,
    onApplyHide: e.onHide
  }), {
    default: dt(({
      popperId: l,
      isShown: c,
      shouldMountContent: u,
      skipTransition: _,
      autoHide: g,
      hide: m,
      handleResize: k,
      onResize: L,
      classes: D,
      result: C
    }) => [
      Zt(r, {
        ref: "popperContent",
        class: Q({
          "v-popper--tooltip-loading": e.loading
        }),
        "popper-id": l,
        theme: e.theme,
        shown: c,
        mounted: u,
        "skip-transition": _,
        "auto-hide": g,
        "handle-resize": k,
        classes: D,
        result: C,
        onHide: m,
        onResize: L
      }, {
        default: dt(() => [
          e.html ? (f(), I("div", {
            key: 0,
            innerHTML: e.finalContent
          }, null, 8, Pi)) : (f(), I("div", {
            key: 1,
            textContent: F(e.finalContent)
          }, null, 8, $i))
        ]),
        _: 2
      }, 1032, ["class", "popper-id", "theme", "shown", "mounted", "skip-transition", "auto-hide", "handle-resize", "classes", "result", "onHide", "onResize"])
    ]),
    _: 1
  }, 16, ["theme", "target-nodes", "popper-node", "onApplyShow", "onApplyHide"]);
}
const Gi = /* @__PURE__ */ jt(zi, [["render", Yi]]), an = "v-popper--has-tooltip";
function Ri(e, t) {
  let o = e.placement;
  if (!o && t)
    for (const n of en)
      t[n] && (o = n);
  return o || (o = Je(e.theme || "tooltip", "placement")), o;
}
function ln(e, t, o) {
  let n;
  const i = typeof t;
  return i === "string" ? n = { content: t } : t && i === "object" ? n = t : n = { content: !1 }, n.placement = Ri(n, o), n.targetNodes = () => [e], n.referenceNode = () => e, n;
}
let Dt, Ke, Wi = 0;
function Zi() {
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
function Vi(e, t, o) {
  Zi();
  const n = Y(ln(e, t, o)), i = Y(!1), s = {
    id: Wi++,
    options: n,
    shown: i
  };
  return Ke.value.push(s), e.classList && e.classList.add(an), e.$_popper = {
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
function cn(e) {
  if (e.$_popper) {
    const t = Ke.value.indexOf(e.$_popper.item);
    t !== -1 && Ke.value.splice(t, 1), delete e.$_popper, delete e.$_popperOldShown, delete e.$_popperMountTarget;
  }
  e.classList && e.classList.remove(an);
}
function Mo(e, { value: t, modifiers: o }) {
  const n = ln(e, t, o);
  if (!n.content || Je(n.theme || "tooltip", "disabled"))
    cn(e);
  else {
    let i;
    e.$_popper ? (i = e.$_popper, i.options.value = n) : i = Vi(e, t, o), typeof t.shown < "u" && t.shown !== e.$_popperOldShown && (e.$_popperOldShown = t.shown, t.shown ? i.show() : i.hide());
  }
}
const Bi = {
  beforeMount: Mo,
  updated: Mo,
  beforeUnmount(e) {
    cn(e);
  }
};
function Io(e) {
  e.addEventListener("mousedown", vt), e.addEventListener("click", vt), e.addEventListener("touchstart", un, Pe ? {
    passive: !0
  } : !1);
}
function ko(e) {
  e.removeEventListener("mousedown", vt), e.removeEventListener("click", vt), e.removeEventListener("touchstart", un), e.removeEventListener("touchend", dn), e.removeEventListener("touchcancel", pn);
}
function vt(e) {
  const t = e.currentTarget;
  e.closePopover = !t.$_vclosepopover_touch, e.closeAllPopover = t.$_closePopoverModifiers && !!t.$_closePopoverModifiers.all;
}
function un(e) {
  if (e.changedTouches.length === 1) {
    const t = e.currentTarget;
    t.$_vclosepopover_touch = !0;
    const o = e.changedTouches[0];
    t.$_vclosepopover_touchPoint = o, t.addEventListener("touchend", dn), t.addEventListener("touchcancel", pn);
  }
}
function dn(e) {
  const t = e.currentTarget;
  if (t.$_vclosepopover_touch = !1, e.changedTouches.length === 1) {
    const o = e.changedTouches[0], n = t.$_vclosepopover_touchPoint;
    e.closePopover = Math.abs(o.screenY - n.screenY) < 20 && Math.abs(o.screenX - n.screenX) < 20, e.closeAllPopover = t.$_closePopoverModifiers && !!t.$_closePopoverModifiers.all;
  }
}
function pn(e) {
  const t = e.currentTarget;
  t.$_vclosepopover_touch = !1;
}
const Fi = {
  beforeMount(e, { value: t, modifiers: o }) {
    e.$_closePopoverModifiers = o, (typeof t > "u" || t) && Io(e);
  },
  updated(e, { value: t, oldValue: o, modifiers: n }) {
    e.$_closePopoverModifiers = n, t !== o && (typeof t > "u" || t ? Io(e) : ko(e));
  },
  beforeUnmount(e) {
    ko(e);
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
var hn = !1;
function ot(e, t, o) {
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
const Ji = typeof Proxy == "function", Ki = "devtools-plugin:setup", qi = "plugin:settings:set";
let Ce, Yt;
function Xi() {
  var e;
  return Ce !== void 0 || (typeof window < "u" && window.performance ? (Ce = !0, Yt = window.performance) : typeof globalThis < "u" && (!((e = globalThis.perf_hooks) === null || e === void 0) && e.performance) ? (Ce = !0, Yt = globalThis.perf_hooks.performance) : Ce = !1), Ce;
}
function es() {
  return Xi() ? Yt.now() : Date.now();
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
    }, o && o.on(qi, (r, a) => {
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
function fn(e, t) {
  const o = e, n = gn(), i = Qi(), s = Ji && o.enableEarlyProxy;
  if (i && (n.__VUE_DEVTOOLS_PLUGIN_API_AVAILABLE__ || !s))
    i.emit(Ki, e, t);
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
 * pinia v2.1.7
 * (c) 2023 Eduardo San Martin Morote
 * @license MIT
 */
let Re;
const $e = (e) => Re = e, mn = process.env.NODE_ENV !== "production" ? Symbol("pinia") : (
  /* istanbul ignore next */
  Symbol()
);
function Te(e) {
  return e && typeof e == "object" && Object.prototype.toString.call(e) === "[object Object]" && typeof e.toJSON != "function";
}
var pe;
(function(e) {
  e.direct = "direct", e.patchObject = "patch object", e.patchFunction = "patch function";
})(pe || (pe = {}));
const xt = typeof window < "u", Ue = (process.env.NODE_ENV !== "production" || !1) && process.env.NODE_ENV !== "test" && xt, jo = typeof window == "object" && window.window === window ? window : typeof self == "object" && self.self === self ? self : typeof global == "object" && global.global === global ? global : typeof globalThis == "object" ? globalThis : { HTMLElement: null };
function os(e, { autoBom: t = !1 } = {}) {
  return t && /^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(e.type) ? new Blob(["\uFEFF", e], { type: e.type }) : e;
}
function Jt(e, t, o) {
  const n = new XMLHttpRequest();
  n.open("GET", e), n.responseType = "blob", n.onload = function() {
    yn(n.response, t, o);
  }, n.onerror = function() {
    console.error("could not download file");
  }, n.send();
}
function _n(e) {
  const t = new XMLHttpRequest();
  t.open("HEAD", e, !1);
  try {
    t.send();
  } catch {
  }
  return t.status >= 200 && t.status <= 299;
}
function rt(e) {
  try {
    e.dispatchEvent(new MouseEvent("click"));
  } catch {
    const o = document.createEvent("MouseEvents");
    o.initMouseEvent("click", !0, !0, window, 0, 0, 0, 80, 20, !1, !1, !1, !1, 0, null), e.dispatchEvent(o);
  }
}
const at = typeof navigator == "object" ? navigator : { userAgent: "" }, vn = /Macintosh/.test(at.userAgent) && /AppleWebKit/.test(at.userAgent) && !/Safari/.test(at.userAgent), yn = xt ? (
  // Use download attribute first if possible (#193 Lumia mobile) unless this is a macOS WebView or mini program
  typeof HTMLAnchorElement < "u" && "download" in HTMLAnchorElement.prototype && !vn ? ns : (
    // Use msSaveOrOpenBlob as a second approach
    "msSaveOrOpenBlob" in at ? is : (
      // Fallback to using FileReader and a popup
      ss
    )
  )
) : () => {
};
function ns(e, t = "download", o) {
  const n = document.createElement("a");
  n.download = t, n.rel = "noopener", typeof e == "string" ? (n.href = e, n.origin !== location.origin ? _n(n.href) ? Jt(e, t, o) : (n.target = "_blank", rt(n)) : rt(n)) : (n.href = URL.createObjectURL(e), setTimeout(function() {
    URL.revokeObjectURL(n.href);
  }, 4e4), setTimeout(function() {
    rt(n);
  }, 0));
}
function is(e, t = "download", o) {
  if (typeof e == "string")
    if (_n(e))
      Jt(e, t, o);
    else {
      const n = document.createElement("a");
      n.href = e, n.target = "_blank", setTimeout(function() {
        rt(n);
      });
    }
  else
    navigator.msSaveOrOpenBlob(os(e, o), t);
}
function ss(e, t, o, n) {
  if (n = n || open("", "_blank"), n && (n.document.title = n.document.body.innerText = "downloading..."), typeof e == "string")
    return Jt(e, t, o);
  const i = e.type === "application/octet-stream", s = /constructor/i.test(String(jo.HTMLElement)) || "safari" in jo, r = /CriOS\/[\d]+/.test(navigator.userAgent);
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
function U(e, t) {
  const o = "🍍 " + e;
  typeof __VUE_DEVTOOLS_TOAST__ == "function" ? __VUE_DEVTOOLS_TOAST__(o, t) : t === "error" ? console.error(o) : t === "warn" ? console.warn(o) : console.log(o);
}
function Kt(e) {
  return "_a" in e && "install" in e;
}
function bn() {
  if (!("clipboard" in navigator))
    return U("Your browser doesn't support the Clipboard API", "error"), !0;
}
function wn(e) {
  return e instanceof Error && e.message.toLowerCase().includes("document is not focused") ? (U('You need to activate the "Emulate a focused page" setting in the "Rendering" panel of devtools.', "warn"), !0) : !1;
}
async function rs(e) {
  if (!bn())
    try {
      await navigator.clipboard.writeText(JSON.stringify(e.state.value)), U("Global state copied to clipboard.");
    } catch (t) {
      if (wn(t))
        return;
      U("Failed to serialize the state. Check the console for more details.", "error"), console.error(t);
    }
}
async function as(e) {
  if (!bn())
    try {
      Mn(e, JSON.parse(await navigator.clipboard.readText())), U("Global state pasted from clipboard.");
    } catch (t) {
      if (wn(t))
        return;
      U("Failed to deserialize the state from clipboard. Check the console for more details.", "error"), console.error(t);
    }
}
async function ls(e) {
  try {
    yn(new Blob([JSON.stringify(e.state.value)], {
      type: "text/plain;charset=utf-8"
    }), "pinia-state.json");
  } catch (t) {
    U("Failed to export the state as JSON. Check the console for more details.", "error"), console.error(t);
  }
}
let ge;
function cs() {
  ge || (ge = document.createElement("input"), ge.type = "file", ge.accept = ".json");
  function e() {
    return new Promise((t, o) => {
      ge.onchange = async () => {
        const n = ge.files;
        if (!n)
          return t(null);
        const i = n.item(0);
        return t(i ? { text: await i.text(), file: i } : null);
      }, ge.oncancel = () => t(null), ge.onerror = o, ge.click();
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
    Mn(e, JSON.parse(n)), U(`Global state imported from "${i.name}".`);
  } catch (t) {
    U("Failed to import the state from JSON. Check the console for more details.", "error"), console.error(t);
  }
}
function Mn(e, t) {
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
const In = "🍍 Pinia (root)", Gt = "_root";
function ds(e) {
  return Kt(e) ? {
    id: Gt,
    label: In
  } : {
    id: e.$id,
    label: e.$id
  };
}
function ps(e) {
  if (Kt(e)) {
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
function hs(e) {
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
function gs(e) {
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
let Ae = !0;
const lt = [], je = "pinia:mutations", J = "pinia", { assign: fs } = Object, yt = (e) => "🍍 " + e;
function ms(e, t) {
  fn({
    id: "dev.esm.pinia",
    label: "Pinia 🍍",
    logo: "https://pinia.vuejs.org/logo.svg",
    packageName: "pinia",
    homepage: "https://pinia.vuejs.org",
    componentStateTypes: lt,
    app: e
  }, (o) => {
    typeof o.now != "function" && U("You seem to be using an outdated version of Vue Devtools. Are you still using the Beta release instead of the stable one? You can find the links at https://devtools.vuejs.org/guide/installation.html."), o.addTimelineLayer({
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
            i ? typeof i.$reset != "function" ? U(`Cannot reset "${n}" store because it doesn't have a "$reset" method implemented.`, "warn") : (i.$reset(), U(`Store "${n}" reset.`)) : U(`Cannot reset "${n}" store because it wasn't found.`, "warn");
          }
        }
      ]
    }), o.on.inspectComponent((n, i) => {
      const s = n.componentInstance && n.componentInstance.proxy;
      if (s && s._pStores) {
        const r = n.componentInstance.proxy._pStores;
        Object.values(r).forEach((a) => {
          n.instanceData.state.push({
            type: yt(a.$id),
            key: "state",
            editable: !0,
            value: a._isOptionsAPI ? {
              _custom: {
                value: bt(a.$state),
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
            type: yt(a.$id),
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
        i = i.concat(Array.from(t._s.values())), n.rootNodes = (n.filter ? i.filter((s) => "$id" in s ? s.$id.toLowerCase().includes(n.filter.toLowerCase()) : In.toLowerCase().includes(n.filter.toLowerCase())) : i).map(ds);
      }
    }), o.on.getInspectorState((n) => {
      if (n.app === e && n.inspectorId === J) {
        const i = n.nodeId === Gt ? t : t._s.get(n.nodeId);
        if (!i)
          return;
        i && (n.state = ps(i));
      }
    }), o.on.editInspectorState((n, i) => {
      if (n.app === e && n.inspectorId === J) {
        const s = n.nodeId === Gt ? t : t._s.get(n.nodeId);
        if (!s)
          return U(`store "${n.nodeId}" not found`, "error");
        const { path: r } = n;
        Kt(s) ? r.unshift("state") : (r.length !== 1 || !s._customProperties.has(r[0]) || r[0] in s.$state) && r.unshift("$state"), Ae = !1, n.set(s, r, n.state.value), Ae = !0;
      }
    }), o.on.editComponentState((n) => {
      if (n.type.startsWith("🍍")) {
        const i = n.type.replace(/^🍍\s*/, ""), s = t._s.get(i);
        if (!s)
          return U(`store "${i}" not found`, "error");
        const { path: r } = n;
        if (r[0] !== "state")
          return U(`Invalid path for store "${i}":
${r}
Only state can be modified.`);
        r[0] = "$state", Ae = !1, n.set(s, r, n.state.value), Ae = !0;
      }
    });
  });
}
function _s(e, t) {
  lt.includes(yt(t.$id)) || lt.push(yt(t.$id)), fn({
    id: "dev.esm.pinia",
    label: "Pinia 🍍",
    logo: "https://pinia.vuejs.org/logo.svg",
    packageName: "pinia",
    homepage: "https://pinia.vuejs.org",
    componentStateTypes: lt,
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
        ye = void 0, o.addTimelineEvent({
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
        ye = void 0, o.addTimelineEvent({
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
      Vt(() => d(t[r]), (a, l) => {
        o.notifyComponentUpdate(), o.sendInspectorState(J), Ae && o.addTimelineEvent({
          layerId: je,
          event: {
            time: n(),
            title: "Change",
            subtitle: r,
            data: {
              newValue: a,
              oldValue: l
            },
            groupId: ye
          }
        });
      }, { deep: !0 });
    }), t.$subscribe(({ events: r, type: a }, l) => {
      if (o.notifyComponentUpdate(), o.sendInspectorState(J), !Ae)
        return;
      const c = {
        time: n(),
        title: gs(a),
        data: fs({ store: ie(t.$id) }, hs(r)),
        groupId: ye
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
    t._hotUpdate = xe((r) => {
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
      s(), o.notifyComponentUpdate(), o.sendInspectorTree(J), o.sendInspectorState(J), o.getSettings().logStoreChanges && U(`Disposed "${t.$id}" store 🗑`);
    }, o.notifyComponentUpdate(), o.sendInspectorTree(J), o.sendInspectorState(J), o.getSettings().logStoreChanges && U(`"${t.$id}" store installed 🆕`);
  });
}
let kn = 0, ye;
function No(e, t, o) {
  const n = t.reduce((i, s) => (i[s] = bt(e)[s], i), {});
  for (const i in n)
    e[i] = function() {
      const s = kn, r = o ? new Proxy(e, {
        get(...l) {
          return ye = s, Reflect.get(...l);
        },
        set(...l) {
          return ye = s, Reflect.set(...l);
        }
      }) : e;
      ye = s;
      const a = n[i].apply(r, arguments);
      return ye = void 0, a;
    };
}
function vs({ app: e, store: t, options: o }) {
  if (t.$id.startsWith("__hot:"))
    return;
  t._isOptionsAPI = !!o.state, No(t, Object.keys(o.actions), t._isOptionsAPI);
  const n = t._hotUpdate;
  bt(t)._hotUpdate = function(i) {
    n.apply(this, arguments), No(t, Object.keys(i._hmrPayload.actions), !!t._isOptionsAPI);
  }, _s(
    e,
    // FIXME: is there a way to allow the assignment from Store<Id, S, G, A> to StoreGeneric?
    t
  );
}
function ys() {
  const e = Po(!0), t = e.run(() => Y({}));
  let o = [], n = [];
  const i = xe({
    install(s) {
      $e(i), i._a = s, s.provide(mn, i), s.config.globalProperties.$pinia = i, Ue && ms(s, i), n.forEach((r) => o.push(r)), n = [];
    },
    use(s) {
      return !this._a && !hn ? n.push(s) : o.push(s), this;
    },
    _p: o,
    // it's actually undefined here
    // @ts-expect-error
    _a: null,
    _e: e,
    _s: /* @__PURE__ */ new Map(),
    state: t
  });
  return Ue && typeof Proxy < "u" && i.use(vs), i;
}
function jn(e, t) {
  for (const o in t) {
    const n = t[o];
    if (!(o in e))
      continue;
    const i = e[o];
    Te(i) && Te(n) && !Le(n) && !Bt(n) ? e[o] = jn(i, n) : e[o] = n;
  }
  return e;
}
const Nn = () => {
};
function xo(e, t, o, n = Nn) {
  e.push(t);
  const i = () => {
    const s = e.indexOf(t);
    s > -1 && (e.splice(s, 1), n());
  };
  return !o && Wn() && Zn(i), i;
}
function Oe(e, ...t) {
  e.slice().forEach((o) => {
    o(...t);
  });
}
const bs = (e) => e();
function Rt(e, t) {
  e instanceof Map && t instanceof Map && t.forEach((o, n) => e.set(n, o)), e instanceof Set && t instanceof Set && t.forEach(e.add, e);
  for (const o in t) {
    if (!t.hasOwnProperty(o))
      continue;
    const n = t[o], i = e[o];
    Te(i) && Te(n) && e.hasOwnProperty(o) && !Le(n) && !Bt(n) ? e[o] = Rt(i, n) : e[o] = n;
  }
  return e;
}
const ws = process.env.NODE_ENV !== "production" ? Symbol("pinia:skipHydration") : (
  /* istanbul ignore next */
  Symbol()
);
function Ms(e) {
  return !Te(e) || !e.hasOwnProperty(ws);
}
const { assign: oe } = Object;
function So(e) {
  return !!(Le(e) && e.effect);
}
function Lo(e, t, o, n) {
  const { state: i, actions: s, getters: r } = t, a = o.state.value[e];
  let l;
  function c() {
    !a && (process.env.NODE_ENV === "production" || !n) && (o.state.value[e] = i ? i() : {});
    const u = process.env.NODE_ENV !== "production" && n ? (
      // use ref() to unwrap refs inside state TODO: check if this is still necessary
      to(Y(i ? i() : {}).value)
    ) : to(o.state.value[e]);
    return oe(u, s, Object.keys(r || {}).reduce((_, g) => (process.env.NODE_ENV !== "production" && g in u && console.warn(`[🍍]: A getter cannot have the same name as another state property. Rename one of them. Found with "${g}" in store "${e}".`), _[g] = xe(Yo(() => {
      $e(o);
      const m = o._s.get(e);
      return r[g].call(m, m);
    })), _), {}));
  }
  return l = Wt(e, c, t, o, n, !0), l;
}
function Wt(e, t, o = {}, n, i, s) {
  let r;
  const a = oe({ actions: {} }, o);
  if (process.env.NODE_ENV !== "production" && !n._e.active)
    throw new Error("Pinia destroyed");
  const l = {
    deep: !0
    // flush: 'post',
  };
  process.env.NODE_ENV !== "production" && !hn && (l.onTrigger = (h) => {
    c ? m = h : c == !1 && !v._hotUpdating && (Array.isArray(m) ? m.push(h) : console.error("🍍 debuggerEvents should be an array. This is most likely an internal Pinia bug."));
  });
  let c, u, _ = [], g = [], m;
  const k = n.state.value[e];
  !s && !k && (process.env.NODE_ENV === "production" || !i) && (n.state.value[e] = {});
  const L = Y({});
  let D;
  function C(h) {
    let y;
    c = u = !1, process.env.NODE_ENV !== "production" && (m = []), typeof h == "function" ? (h(n.state.value[e]), y = {
      type: pe.patchFunction,
      storeId: e,
      events: m
    }) : (Rt(n.state.value[e], h), y = {
      type: pe.patchObject,
      payload: h,
      storeId: e,
      events: m
    });
    const p = D = Symbol();
    Ot().then(() => {
      D === p && (c = !0);
    }), u = !0, Oe(_, y, n.state.value[e]);
  }
  const O = s ? function() {
    const { state: y } = o, p = y ? y() : {};
    this.$patch((x) => {
      oe(x, p);
    });
  } : (
    /* istanbul ignore next */
    process.env.NODE_ENV !== "production" ? () => {
      throw new Error(`🍍: Store "${e}" is built using the setup syntax and does not implement $reset().`);
    } : Nn
  );
  function N() {
    r.stop(), _ = [], g = [], n._s.delete(e);
  }
  function S(h, y) {
    return function() {
      $e(n);
      const p = Array.from(arguments), x = [], A = [];
      function T(Z) {
        x.push(Z);
      }
      function P(Z) {
        A.push(Z);
      }
      Oe(g, {
        args: p,
        name: h,
        store: v,
        after: T,
        onError: P
      });
      let G;
      try {
        G = y.apply(this && this.$id === e ? this : v, p);
      } catch (Z) {
        throw Oe(A, Z), Z;
      }
      return G instanceof Promise ? G.then((Z) => (Oe(x, Z), Z)).catch((Z) => (Oe(A, Z), Promise.reject(Z))) : (Oe(x, G), G);
    };
  }
  const M = /* @__PURE__ */ xe({
    actions: {},
    getters: {},
    state: [],
    hotState: L
  }), b = {
    _p: n,
    // _s: scope,
    $id: e,
    $onAction: xo.bind(null, g),
    $patch: C,
    $reset: O,
    $subscribe(h, y = {}) {
      const p = xo(_, h, y.detached, () => x()), x = r.run(() => Vt(() => n.state.value[e], (A) => {
        (y.flush === "sync" ? u : c) && h({
          storeId: e,
          type: pe.direct,
          events: m
        }, A);
      }, oe({}, l, y)));
      return p;
    },
    $dispose: N
  }, v = Rn(process.env.NODE_ENV !== "production" || Ue ? oe(
    {
      _hmrPayload: M,
      _customProperties: xe(/* @__PURE__ */ new Set())
      // devtools custom properties
    },
    b
    // must be added later
    // setupStore
  ) : b);
  n._s.set(e, v);
  const j = (n._a && n._a.runWithContext || bs)(() => n._e.run(() => (r = Po()).run(t)));
  for (const h in j) {
    const y = j[h];
    if (Le(y) && !So(y) || Bt(y))
      process.env.NODE_ENV !== "production" && i ? ot(L.value, h, St(j, h)) : s || (k && Ms(y) && (Le(y) ? y.value = k[h] : Rt(y, k[h])), n.state.value[e][h] = y), process.env.NODE_ENV !== "production" && M.state.push(h);
    else if (typeof y == "function") {
      const p = process.env.NODE_ENV !== "production" && i ? y : S(h, y);
      j[h] = p, process.env.NODE_ENV !== "production" && (M.actions[h] = y), a.actions[h] = y;
    } else process.env.NODE_ENV !== "production" && So(y) && (M.getters[h] = s ? (
      // @ts-expect-error
      o.getters[h]
    ) : y, xt && (j._getters || // @ts-expect-error: same
    (j._getters = xe([]))).push(h));
  }
  if (oe(v, j), oe(bt(v), j), Object.defineProperty(v, "$state", {
    get: () => process.env.NODE_ENV !== "production" && i ? L.value : n.state.value[e],
    set: (h) => {
      if (process.env.NODE_ENV !== "production" && i)
        throw new Error("cannot set hotState");
      C((y) => {
        oe(y, h);
      });
    }
  }), process.env.NODE_ENV !== "production" && (v._hotUpdate = xe((h) => {
    v._hotUpdating = !0, h._hmrPayload.state.forEach((y) => {
      if (y in v.$state) {
        const p = h.$state[y], x = v.$state[y];
        typeof p == "object" && Te(p) && Te(x) ? jn(p, x) : h.$state[y] = x;
      }
      ot(v, y, St(h.$state, y));
    }), Object.keys(v.$state).forEach((y) => {
      y in h.$state || Ct(v, y);
    }), c = !1, u = !1, n.state.value[e] = St(h._hmrPayload, "hotState"), u = !0, Ot().then(() => {
      c = !0;
    });
    for (const y in h._hmrPayload.actions) {
      const p = h[y];
      ot(v, y, S(y, p));
    }
    for (const y in h._hmrPayload.getters) {
      const p = h._hmrPayload.getters[y], x = s ? (
        // special handling of options api
        Yo(() => ($e(n), p.call(v, v)))
      ) : p;
      ot(v, y, x);
    }
    Object.keys(v._hmrPayload.getters).forEach((y) => {
      y in h._hmrPayload.getters || Ct(v, y);
    }), Object.keys(v._hmrPayload.actions).forEach((y) => {
      y in h._hmrPayload.actions || Ct(v, y);
    }), v._hmrPayload = h._hmrPayload, v._getters = h._getters, v._hotUpdating = !1;
  })), Ue) {
    const h = {
      writable: !0,
      configurable: !0,
      // avoid warning on devtools trying to display this property
      enumerable: !1
    };
    ["_p", "_hmrPayload", "_getters", "_customProperties"].forEach((y) => {
      Object.defineProperty(v, y, oe({ value: v[y] }, h));
    });
  }
  return n._p.forEach((h) => {
    if (Ue) {
      const y = r.run(() => h({
        store: v,
        app: n._a,
        pinia: n,
        options: a
      }));
      Object.keys(y || {}).forEach((p) => v._customProperties.add(p)), oe(v, y);
    } else
      oe(v, r.run(() => h({
        store: v,
        app: n._a,
        pinia: n,
        options: a
      })));
  }), process.env.NODE_ENV !== "production" && v.$state && typeof v.$state == "object" && typeof v.$state.constructor == "function" && !v.$state.constructor.toString().includes("[native code]") && console.warn(`[🍍]: The "state" must be a plain object. It cannot be
	state: () => new MyClass()
Found in store "${v.$id}".`), k && s && o.hydrate && o.hydrate(v.$state, k), c = !0, u = !0, v;
}
function Is(e, t, o) {
  let n, i;
  const s = typeof t == "function";
  n = e, i = s ? o : t;
  function r(a, l) {
    const c = Yn();
    if (a = // in test mode, ignore the argument provided as we can always retrieve a
    // pinia instance with getActivePinia()
    (process.env.NODE_ENV === "test" && Re && Re._testing ? null : a) || (c ? Gn(mn, null) : null), a && $e(a), process.env.NODE_ENV !== "production" && !Re)
      throw new Error(`[🍍]: "getActivePinia()" was called but there was no active Pinia. Are you trying to use a store before calling "app.use(pinia)"?
See https://pinia.vuejs.org/core-concepts/outside-component-usage.html for help.
This will fail in production.`);
    a = Re, a._s.has(n) || (s ? Wt(n, t, i, a) : Lo(n, i, a), process.env.NODE_ENV !== "production" && (r._pinia = a));
    const u = a._s.get(n);
    if (process.env.NODE_ENV !== "production" && l) {
      const _ = "__hot:" + n, g = s ? Wt(_, t, i, a, !0) : Lo(_, oe({}, i), a, !0);
      l._hotUpdate(g), delete a.state.value[_], a._s.delete(_);
    }
    if (process.env.NODE_ENV !== "production" && xt) {
      const _ = $o();
      if (_ && _.proxy && // avoid adding stores that are just built for hot module replacement
      !l) {
        const g = _.proxy, m = "_pStores" in g ? g._pStores : g._pStores = {};
        m[n] = u;
      }
    }
    return u;
  }
  return r.$id = n, r;
}
var V = /* @__PURE__ */ ((e) => (e.templates = "templates", e.styling = "styling", e.preferences = "preferences", e.wording = "wording", e.test = "test", e.output = "output", e))(V || {}), B = /* @__PURE__ */ ((e) => (e.html = "html", e.json = "json", e))(B || {});
const To = [
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
], ct = "--tvk_";
function qt(e) {
  const t = e.replace(ct, ""), o = t.split("_"), n = o.slice(0, -1), i = o[o.length - 1];
  return {
    keyWithoutPrefix: t,
    nameSpace: o,
    categories: n,
    name: i
  };
}
function Do(e, t, o) {
  const n = o[0], i = o[1], s = qt(n);
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
          s[0].startsWith(ct) && Do(e, i, s);
        }) : Array.from(n.style).forEach((s) => {
          if (s.startsWith(ct)) {
            let r = /\{(.*?)\}/.exec(n.cssText);
            r && r[1].split(";").forEach((c) => {
              const u = c.trim().split(":");
              u[0].startsWith(ct) && (u[1] = u[1].trim(), Do(e, i, u));
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
    const i = To.indexOf(o.name), s = To.indexOf(n.name);
    return i > -1 && s > -1 ? i - s : i > -1 ? -1 : s > -1 ? 1 : o.name < n.name ? -1 : o.name > n.name ? 1 : 0;
  }), e;
}
function ks(e) {
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
function xn(e, t, o = !0) {
  for (let n = 0; n < e.length; n++)
    if (o && t.length !== e.length || t[n] !== e[n]) return !1;
  return !0;
}
function js(e, t) {
  return e.filter((n) => xn(t, n.categories));
}
function Ns(e, t) {
  let o = e.filter((s) => xn(t, s.categories, !1));
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
function nt(e, t = 300) {
  let o;
  return (...n) => {
    clearTimeout(o), o = setTimeout(() => {
      e(...n);
    }, t);
  };
}
function Co(e) {
  return !!(e && typeof e == "object" && !Array.isArray(e));
}
async function Sn(e) {
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
function xs() {
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
const te = Is("editorStore", () => {
  const e = Y(V.templates), t = Y("colors"), o = Y(void 0), n = Y(B.html), i = Y(!1), s = Y(!1);
  function r() {
  }
  function a(k) {
    e.value = k, setTimeout(() => {
      te().refreshEditorPanels();
    });
  }
  function l(k) {
    t.value = k;
  }
  function c(k) {
    n.value = k, te().refreshEditorPanels();
  }
  function u(k) {
    i.value = k, te().refreshEditorPanels();
  }
  function _(k) {
    m();
    const L = te(), D = qt(k);
    if (D.nameSpace[0] === "colors" && ![
      "brand",
      "brand-hue",
      "brand-lightness",
      "brand-saturation",
      "light",
      "dark"
    ].includes(D.nameSpace[1])) {
      const C = xs();
      let O = k.split("_");
      O.splice(2, 0, C), k = O.join("_");
    }
    L.setStylingCategory(D.categories[0]), setTimeout(() => {
      L.targetStylingVariable(k);
    });
  }
  function g(k) {
    o.value = k;
  }
  function m() {
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
    targetStylingVariable: g,
    stylingVariableReached: m,
    setOutputFormat: c,
    minifyOutput: u
  };
}), Ss = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KDTwhLS0gVXBsb2FkZWQgdG86IFNWRyBSZXBvLCB3d3cuc3ZncmVwby5jb20sIEdlbmVyYXRvcjogU1ZHIFJlcG8gTWl4ZXIgVG9vbHMgLS0+Cjxzdmcgd2lkdGg9IjgwMHB4IiBoZWlnaHQ9IjgwMHB4IiB2aWV3Qm94PSIwIDAgMTI4IDEyOCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgYXJpYS1oaWRkZW49InRydWUiIHJvbGU9ImltZyIgY2xhc3M9Imljb25pZnkgaWNvbmlmeS0tbm90byIgcHJlc2VydmVBc3BlY3RSYXRpbz0ieE1pZFlNaWQgbWVldCI+Cg08cGF0aCBkPSJNOTguOSA3OS44NWMtMS4yNS0yLjI3LjM0LTQuNTggMy4wNi03LjQ0YzQuMzEtNC41NCA5LTE1LjA3IDQuNjQtMjUuNzZjLjAzLS4wNi0uODYtMS44Ni0uODMtMS45MmwtMS43OS0uMDljLS41Ny0uMDgtMjAuMjYtLjEyLTM5Ljk3LS4xMmMtMTkuNzEgMC0zOS4zOS4wNC0zOS45Ny4xMmMwIDAtMi42NSAxLjk1LTIuNjMgMi4wMWMtNC4zNSAxMC42OS4zMyAyMS4yMiA0LjY0IDI1Ljc2YzIuNzEgMi44NiA0LjMgNS4xNyAzLjA2IDcuNDRjLTEuMjEgMi4yMS00LjgxIDIuNTMtNC44MSAyLjUzcy44MyAyLjI2IDIuODMgMy40OGMxLjg1IDEuMTMgNC4xMyAxLjM5IDUuNyAxLjQzYzAgMCA2LjE1IDguNTEgMjIuMjMgOC41MWgxNy45YzE2LjA4IDAgMjIuMjMtOC41MSAyMi4yMy04LjUxYzEuNTctLjA0IDMuODUtLjMgNS43LTEuNDNjMi0xLjIyIDIuODMtMy40OCAyLjgzLTMuNDhzLTMuNjEtLjMyLTQuODItMi41M3oiIGZpbGw9IiNlNjNkMDAiPgoNPC9wYXRoPgoNPHJhZGlhbEdyYWRpZW50IGlkPSJJY29uaWZ5SWQxN2VjZGIyOTA0ZDE3OGVhYjE3OTI4IiBjeD0iOTguNzUyIiBjeT0iODMuNjAxIiByPSIyMy40MTkiIGdyYWRpZW50VHJhbnNmb3JtPSJtYXRyaXgoMSAwIDAgLS40OTEyIC0xOS4yODMgMTI0LjY2NSkiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIj4KDTxzdG9wIG9mZnNldD0iLjY5OSIgc3RvcC1jb2xvcj0iI2Y5OGIyNSIgc3RvcC1vcGFjaXR5PSIwIj4KDTwvc3RvcD4KDTxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iI2Y5OGIyNSI+Cg08L3N0b3A+Cg08L3JhZGlhbEdyYWRpZW50PgoNPHBhdGggZD0iTTYzLjk5IDk1Ljc5di05LjQ0bDI4LjU3LTIuMjZsMi42IDMuMnMtNi4xNSA4LjUxLTIyLjIzIDguNTFsLTguOTQtLjAxeiIgZmlsbD0idXJsKCNJY29uaWZ5SWQxN2VjZGIyOTA0ZDE3OGVhYjE3OTI4KSI+Cg08L3BhdGg+Cg08cmFkaWFsR3JhZGllbnQgaWQ9Ikljb25pZnlJZDE3ZWNkYjI5MDRkMTc4ZWFiMTc5MjkiIGN4PSI3Ni41NzMiIGN5PSI3OC42NjgiIHI9IjYuOTIxIiBncmFkaWVudFRyYW5zZm9ybT0ibWF0cml4KC0uOTA1NyAuNDIzOCAuMzE0NCAuNjcxOSAxNDYuMjcgLTYuNjQ0KSIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiPgoNPHN0b3Agb2Zmc2V0PSIwIiBzdG9wLWNvbG9yPSIjZjk4YjI1Ij4KDTwvc3RvcD4KDTxzdG9wIG9mZnNldD0iLjg3MiIgc3RvcC1jb2xvcj0iI2Y5OGIyNSIgc3RvcC1vcGFjaXR5PSIwIj4KDTwvc3RvcD4KDTwvcmFkaWFsR3JhZGllbnQ+Cg08cGF0aCBkPSJNOTUuMSA4My4xNmMtNC4yOC02LjUgNS4yMS04LjkzIDUuMjEtOC45M2wuMDEuMDFjLTEuNjUgMi4wNS0yLjQgMy44NC0xLjQzIDUuNjFjMS4yMSAyLjIxIDQuODEgMi41MyA0LjgxIDIuNTNzLTQuOTEgNC4zNi04LjYuNzh6IiBmaWxsPSJ1cmwoI0ljb25pZnlJZDE3ZWNkYjI5MDRkMTc4ZWFiMTc5MjkpIj4KDTwvcGF0aD4KDTxyYWRpYWxHcmFkaWVudCBpZD0iSWNvbmlmeUlkMTdlY2RiMjkwNGQxNzhlYWIxNzkzMCIgY3g9IjkwLjkzIiBjeT0iNTkuMjc5IiByPSIzMC4zOTkiIGdyYWRpZW50VHJhbnNmb3JtPSJtYXRyaXgoLS4wNzQ2IC0uOTk3MiAtLjgzMTEgLjA2MjIgMTQzLjM0MyAxNDYuMjY5KSIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiPgoNPHN0b3Agb2Zmc2V0PSIuNjk5IiBzdG9wLWNvbG9yPSIjZjk4YjI1IiBzdG9wLW9wYWNpdHk9IjAiPgoNPC9zdG9wPgoNPHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjZjk4YjI1Ij4KDTwvc3RvcD4KDTwvcmFkaWFsR3JhZGllbnQ+Cg08cGF0aCBkPSJNMTA2LjYyIDQ2LjY1YzQuMjUgMTAuMzUtLjIyIDIxLjAxLTQuNDEgMjUuNTFjLS41OC42Mi0zLjAxIDMuMDEtMy41NyA0LjkyYzAgMC05LjU0LTEzLjMxLTEyLjM5LTIxLjEzYy0uNTgtMS41OC0xLjEtMy4yLTEuMTctNC44OGMtLjA1LTEuMjYuMTQtMi43Ni44Ny0zLjgyYy44OS0xLjMxIDIwLjE2LTEuNyAyMC4xNi0xLjdsLjUxIDEuMXoiIGZpbGw9InVybCgjSWNvbmlmeUlkMTdlY2RiMjkwNGQxNzhlYWIxNzkzMCkiPgoNPC9wYXRoPgoNPHJhZGlhbEdyYWRpZW50IGlkPSJJY29uaWZ5SWQxN2VjZGIyOTA0ZDE3OGVhYjE3OTMxIiBjeD0iNDEuNTM0IiBjeT0iNjIuNjQ1IiByPSIzMC4zOTkiIGdyYWRpZW50VHJhbnNmb3JtPSJtYXRyaXgoLjA3NDYgLS45OTcyIC44MzExIC4wNjIyIC0xMy42MyAxMDAuMTY2KSIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiPgoNPHN0b3Agb2Zmc2V0PSIuNjk5IiBzdG9wLWNvbG9yPSIjZjk4YjI1IiBzdG9wLW9wYWNpdHk9IjAiPgoNPC9zdG9wPgoNPHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjZjk4YjI1Ij4KDTwvc3RvcD4KDTwvcmFkaWFsR3JhZGllbnQ+Cg08cGF0aCBkPSJNMjEuNCA0Ni42NWMtNC4yNCAxMC4zNS4yMyAyMS4wMSA0LjQxIDI1LjVjLjU4LjYyIDMuMDEgMy4wMSAzLjU3IDQuOTJjMCAwIDkuNTQtMTMuMzEgMTIuMzktMjEuMTNjLjU4LTEuNTggMS4xLTMuMiAxLjE3LTQuODhjLjA1LTEuMjYtLjE0LTIuNzYtLjg3LTMuODJjLS44OS0xLjMxLTEuOTMtLjk2LTMuNDQtLjk2Yy0yLjg4IDAtMTUuNDktLjc0LTE2LjQ3LS43NGMuMDEuMDEtLjc2IDEuMTEtLjc2IDEuMTF6IiBmaWxsPSJ1cmwoI0ljb25pZnlJZDE3ZWNkYjI5MDRkMTc4ZWFiMTc5MzEpIj4KDTwvcGF0aD4KDTxyYWRpYWxHcmFkaWVudCBpZD0iSWNvbmlmeUlkMTdlY2RiMjkwNGQxNzhlYWIxNzkzMiIgY3g9IjQ4Ljg4NSIgY3k9IjgzLjUzOCIgcj0iMjMuNDE5IiBncmFkaWVudFRyYW5zZm9ybT0ibWF0cml4KC0xIDAgMCAtLjQ5MTIgOTcuNzcgMTI0LjU3MikiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIj4KDTxzdG9wIG9mZnNldD0iLjY5OSIgc3RvcC1jb2xvcj0iI2Y5OGIyNSIgc3RvcC1vcGFjaXR5PSIwIj4KDTwvc3RvcD4KDTxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iI2Y5OGIyNSI+Cg08L3N0b3A+Cg08L3JhZGlhbEdyYWRpZW50PgoNPHBhdGggZD0iTTY0LjAzIDk1Ljc5di05LjQ0bC0yOC41Ny0yLjI2bC0yLjYgMy4yczYuMTUgOC41MSAyMi4yMyA4LjUxbDguOTQtLjAxeiIgZmlsbD0idXJsKCNJY29uaWZ5SWQxN2VjZGIyOTA0ZDE3OGVhYjE3OTMyKSI+Cg08L3BhdGg+Cg08cmFkaWFsR3JhZGllbnQgaWQ9Ikljb25pZnlJZDE3ZWNkYjI5MDRkMTc4ZWFiMTc5MzMiIGN4PSIyNi4zNzQiIGN5PSI3OC42NjgiIHI9IjYuOTIxIiBncmFkaWVudFRyYW5zZm9ybT0ibWF0cml4KC45MDU3IC40MjM4IC0uMzE0NCAuNjcxOSAyNy4yMiAxNC42MzIpIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+Cg08c3RvcCBvZmZzZXQ9IjAiIHN0b3AtY29sb3I9IiNmOThiMjUiPgoNPC9zdG9wPgoNPHN0b3Agb2Zmc2V0PSIuOTQ0IiBzdG9wLWNvbG9yPSIjZjk4YjI1IiBzdG9wLW9wYWNpdHk9IjAiPgoNPC9zdG9wPgoNPC9yYWRpYWxHcmFkaWVudD4KDTxwYXRoIGQ9Ik0zMi45MyA4My4xNmM0LjI4LTYuNS01LjIxLTguOTMtNS4yMS04LjkzbC0uMDEuMDFjMS42NSAyLjA1IDIuNCAzLjg0IDEuNDMgNS42MWMtMS4yMSAyLjIxLTQuODEgMi41My00LjgxIDIuNTNzNC45IDQuMzYgOC42Ljc4eiIgZmlsbD0idXJsKCNJY29uaWZ5SWQxN2VjZGIyOTA0ZDE3OGVhYjE3OTMzKSI+Cg08L3BhdGg+Cg08Zz4KDTxsaW5lYXJHcmFkaWVudCBpZD0iSWNvbmlmeUlkMTdlY2RiMjkwNGQxNzhlYWIxNzkzNCIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiIHgxPSI2NCIgeTE9Ijk0LjU2NSIgeDI9IjY0IiB5Mj0iMTIyLjExIj4KDTxzdG9wIG9mZnNldD0iMCIgc3RvcC1jb2xvcj0iI2Y3OGMxZiI+Cg08L3N0b3A+Cg08c3RvcCBvZmZzZXQ9Ii40OTQiIHN0b3AtY29sb3I9IiNmMzdmMjEiPgoNPC9zdG9wPgoNPHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjZWQ2ZDIzIj4KDTwvc3RvcD4KDTwvbGluZWFyR3JhZGllbnQ+Cg08cGF0aCBkPSJNNjQuMTMgOTQuNjhINjRjLTI1LjQ5LjAzLTUxLjEzIDcuNS01MS4xMyAyNS4yOFYxMjRoMTAyLjI3di00LjA0Yy0uMDEtMTYuNzYtMjUuNDEtMjUuMjgtNTEuMDEtMjUuMjh6IiBmaWxsPSJ1cmwoI0ljb25pZnlJZDE3ZWNkYjI5MDRkMTc4ZWFiMTc5MzQpIj4KDTwvcGF0aD4KDTwvZz4KDTxnPgoNPHBhdGggZD0iTTU0LjkyIDkwLjA4djkuOThjMCA0LjUxIDMuNyA4LjE3IDguMjYgOC4xN2gxLjY1YzQuNTYgMCA4LjI2LTMuNjYgOC4yNi04LjE3di05Ljk4SDU0LjkyeiIgZmlsbD0iI2VkYzM5MSI+Cg08L3BhdGg+Cg08L2c+Cg08Zz4KDTxwYXRoIGQ9Ik05MS4zMyA1MC40M0gzNi42N2MtNS44OSAwLTEwLjcxIDUuMTQtMTAuNzEgMTEuNDFzNC44MiAxMS40MSAxMC43MSAxMS40MWg1NC42NWM1Ljg5IDAgMTAuNzEtNS4xNCAxMC43MS0xMS40MXMtNC44MS0xMS40MS0xMC43LTExLjQxeiIgZmlsbD0iI2VkYzM5MSI+Cg08L3BhdGg+Cg08L2c+Cg08Zz4KDTxwYXRoIGQ9Ik02NCAxMS4wN2MtMTcuNCAwLTMzLjUyIDE4LjYxLTMzLjUyIDQ1LjM5YzAgMjYuNjQgMTYuNjEgMzkuODEgMzMuNTIgMzkuODFTOTcuNTIgODMuMSA5Ny41MiA1Ni40NmMwLTI2Ljc4LTE2LjEyLTQ1LjM5LTMzLjUyLTQ1LjM5eiIgZmlsbD0iI2Y5ZGRiZCI+Cg08L3BhdGg+Cg08L2c+Cg08ZyBmaWxsPSIjMzEyZDJkIj4KDTxlbGxpcHNlIGN4PSI0Ny41NiIgY3k9IjU4LjgxIiByeD0iNC45MyIgcnk9IjUuMSI+Cg08L2VsbGlwc2U+Cg08ZWxsaXBzZSBjeD0iODAuNDQiIGN5PSI1OC44MSIgcng9IjQuOTMiIHJ5PSI1LjEiPgoNPC9lbGxpcHNlPgoNPC9nPgoNPGcgZmlsbD0iIzQ1NDE0MCI+Cg08cGF0aCBkPSJNNTQuOTggNDkuODJjLS45My0xLjIzLTMuMDctMy4wMS03LjIzLTMuMDFzLTYuMzEgMS43OS03LjIzIDMuMDFjLS40MS41NC0uMzEgMS4xNy0uMDIgMS41NWMuMjYuMzUgMS4wNC42OCAxLjkuMzljLjg2LS4yOSAyLjU0LTEuMTYgNS4zNS0xLjE4YzIuODEuMDIgNC40OS44OSA1LjM1IDEuMThjLjg2LjI5IDEuNjQtLjAzIDEuOS0uMzljLjI5LS4zOC4zOS0xLjAxLS4wMi0xLjU1eiI+Cg08L3BhdGg+Cg08cGF0aCBkPSJNODcuNDggNDkuODJjLS45My0xLjIzLTMuMDctMy4wMS03LjIzLTMuMDFzLTYuMzEgMS43OS03LjIzIDMuMDFjLS40MS41NC0uMzEgMS4xNy0uMDIgMS41NWMuMjYuMzUgMS4wNC42OCAxLjkuMzljLjg2LS4yOSAyLjU0LTEuMTYgNS4zNS0xLjE4YzIuODEuMDIgNC40OS44OSA1LjM1IDEuMThjLjg2LjI5IDEuNjQtLjAzIDEuOS0uMzljLjI5LS4zOC4zOS0xLjAxLS4wMi0xLjU1eiI+Cg08L3BhdGg+Cg08L2c+Cg08cGF0aCBkPSJNNjcuODYgNjguMDZjLS4xMS0uMDQtLjIxLS4wNy0uMzItLjA4aC03LjA3Yy0uMTEuMDEtLjIyLjA0LS4zMi4wOGMtLjY0LjI2LS45OS45Mi0uNjkgMS42M2MuMy43MSAxLjcxIDIuNjkgNC41NSAyLjY5czQuMjUtMS45OSA0LjU1LTIuNjljLjI5LS43MS0uMDYtMS4zNy0uNy0xLjYzeiIgZmlsbD0iI2RiYTY4OSI+Cg08L3BhdGg+Cg08cGF0aCBkPSJNNzIuNDIgNzYuMTRjLTMuMTkgMS44OS0xMy42MyAxLjg5LTE2LjgxIDBjLTEuODMtMS4wOS0zLjcuNTgtMi45NCAyLjI0Yy43NSAxLjYzIDYuNDUgNS40MiAxMS4zNyA1LjQyczEwLjU1LTMuNzkgMTEuMy01LjQyYy43NS0xLjY2LTEuMDktMy4zMy0yLjkyLTIuMjR6IiBmaWxsPSIjNDQ0Ij4KDTwvcGF0aD4KDTxnPgoNPHBhdGggZD0iTTEwNC4wNyAyNS4xMWMtMi40NC0zLjctNy45MS04LjY0LTEyLjgyLTguOTdjLS43OS00LjcyLTUuODQtOC43Mi0xMC43My0xMC4yN2MtMTMuMjMtNC4xOS0yMS44NC41MS0yNi40NiAzLjA0Yy0uOTYuNTMtNy4xNyAzLjk3LTExLjUxIDEuNWMtMi43Mi0xLjU1LTIuNjctNS43NC0yLjY3LTUuNzRzLTguNTMgMy4yNS01LjYxIDEyLjI5Yy0yLjkzLjEyLTYuNzcgMS4zNi04LjggNS40N2MtMi40MiA0LjktMS41NiA4Ljk5LS44NiAxMC45NWMtMi41MiAyLjE0LTUuNjkgNi42OS0zLjUyIDEyLjZjMS42NCA0LjQ1IDguMTcgNi41IDguMTcgNi41Yy0uNDYgOC4wMSAxLjAzIDEyLjk0IDEuODIgMTQuOTRjLjE0LjM1LjYzLjMyLjcyLS4wNGMuOTktMy45NiA0LjM3LTE3LjggNC4wMy0yMC4yMWMwIDAgMTEuMzUtMi4yNSAyMi4xNy0xMC4yMmMyLjItMS42MiA0LjU5LTMgNy4xMy00LjAyYzEzLjU5LTUuNDEgMTYuNDQgMy44MiAxNi40NCAzLjgyczkuNDItMS44MSAxMi4yNiAxMS4yN2MxLjA3IDQuOSAxLjggMTIuNzUgMi40IDE4LjI0Yy4wNC4zOS41Ny40Ny43My4xMWMuOTUtMi4xOCAyLjg1LTYuNSAzLjMtMTAuOTFjLjE2LTEuNTUgNC4zNC0zLjYgNi4xNC0xMC4yNmMyLjM5LTguODgtLjU2LTE3LjQyLTIuMzMtMjAuMDl6IiBmaWxsPSIjZTYzZDAwIj4KDTwvcGF0aD4KDTxyYWRpYWxHcmFkaWVudCBpZD0iSWNvbmlmeUlkMTdlY2RiMjkwNGQxNzhlYWIxNzkzNSIgY3g9Ijg0LjYyNSIgY3k9IjQxLjQ3NCIgcj0iMzUuNjMzIiBncmFkaWVudFRyYW5zZm9ybT0ibWF0cml4KC4zMDc2IC45NTE1IC0uNzA2IC4yMjgyIDg3Ljg3MyAtNDguNTEzKSIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiPgoNPHN0b3Agb2Zmc2V0PSIuNjk5IiBzdG9wLWNvbG9yPSIjZjk4YjI1IiBzdG9wLW9wYWNpdHk9IjAiPgoNPC9zdG9wPgoNPHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjZjk4YjI1Ij4KDTwvc3RvcD4KDTwvcmFkaWFsR3JhZGllbnQ+Cg08cGF0aCBkPSJNMTAwLjIyIDU1LjVjLjE2LTEuNTUgNC4zNC0zLjYgNi4xNC0xMC4yNmMuMTktLjcxLjM1LTEuNDMuNS0yLjE1YzEuNDYtOC4wOS0xLjE2LTE1LjUyLTIuNzktMTcuOThjLTIuMjYtMy40Mi03LjEtNy44OS0xMS43LTguODFjLS40LS4wNS0uNzktLjEtMS4xNi0uMTJjMCAwIC4zMyAyLjE1LS41NCAzLjg2Yy0xLjEyIDIuMjItMy40MSAyLjc1LTMuNDEgMi43NWMxMS45OCAxMS45OCAxMS4xMiAyMiAxMi45NiAzMi43MXoiIGZpbGw9InVybCgjSWNvbmlmeUlkMTdlY2RiMjkwNGQxNzhlYWIxNzkzNSkiPgoNPC9wYXRoPgoNPHJhZGlhbEdyYWRpZW50IGlkPSJJY29uaWZ5SWQxN2VjZGIyOTA0ZDE3OGVhYjE3OTM2IiBjeD0iNDcuMjgiIGN5PSI0LjIiIHI9IjkuMzQzIiBncmFkaWVudFRyYW5zZm9ybT0ibWF0cml4KC44ODEzIC40NzI2IC0uNTYwMyAxLjA0NSA3Ljk2NiAtMjIuNTMyKSIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiPgoNPHN0b3Agb2Zmc2V0PSIuMzkzIiBzdG9wLWNvbG9yPSIjZjk4YjI1Ij4KDTwvc3RvcD4KDTxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iI2Y5OGIyNSIgc3RvcC1vcGFjaXR5PSIwIj4KDTwvc3RvcD4KDTwvcmFkaWFsR3JhZGllbnQ+Cg08cGF0aCBkPSJNNTYuOTUgNy4zOWMtMS4wOS41My0yLjA2IDEuMDYtMi44OSAxLjUxYy0uOTYuNTMtNy4xNyAzLjk3LTExLjUxIDEuNWMtMi42Ny0xLjUyLTIuNjctNS41OC0yLjY3LTUuNzJjLTEuMjMgMS41Ny00Ljk1IDEyLjc4IDUuOTMgMTMuNTNjNC42OS4zMiA3LjU4LTMuNzcgOS4zLTcuMjNjLjYxLTEuMjcgMS41OC0zLjEgMS44NC0zLjU5eiIgZmlsbD0idXJsKCNJY29uaWZ5SWQxN2VjZGIyOTA0ZDE3OGVhYjE3OTM2KSI+Cg08L3BhdGg+Cg08cmFkaWFsR3JhZGllbnQgaWQ9Ikljb25pZnlJZDE3ZWNkYjI5MDRkMTc4ZWFiMTc5MzciIGN4PSIxNjAuMzEyIiBjeT0iNjIuNTM4IiByPSIzNS40MSIgZ3JhZGllbnRUcmFuc2Zvcm09Im1hdHJpeCgtLjkzNzggLS4zOTQ0IC4yMTgyIC0uNTI4NSAyMDYuNzk1IDExOS41OCkiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIj4KDTxzdG9wIG9mZnNldD0iLjcwOSIgc3RvcC1jb2xvcj0iI2Y5OGIyNSIgc3RvcC1vcGFjaXR5PSIwIj4KDTwvc3RvcD4KDTxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iI2Y5OGIyNSI+Cg08L3N0b3A+Cg08L3JhZGlhbEdyYWRpZW50PgoNPHBhdGggZD0iTTc5LjE2IDUuNDdjNy4zMiAxLjk4IDEwLjg5IDUuNzEgMTIuMDggMTAuNjhjLjM1IDEuNDYuNzcgMTUuMDgtMjUuMjMtLjRjLTkuNjctNS43Ni03LjAzLTkuMzYtNS45LTkuNzdjNC40Mi0xLjYgMTAuODUtMi43MyAxOS4wNS0uNTF6IiBmaWxsPSJ1cmwoI0ljb25pZnlJZDE3ZWNkYjI5MDRkMTc4ZWFiMTc5MzcpIj4KDTwvcGF0aD4KDTxyYWRpYWxHcmFkaWVudCBpZD0iSWNvbmlmeUlkMTdlY2RiMjkwNGQxNzhlYWIxNzkzOCIgY3g9IjQ2LjM2OSIgY3k9IjE1Ljk2MiIgcj0iMTMuMDk5IiBncmFkaWVudFRyYW5zZm9ybT0ibWF0cml4KDEgMCAwIDEuMjIzMyAwIC0zLjU2NCkiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIj4KDTxzdG9wIG9mZnNldD0iLjc4NiIgc3RvcC1jb2xvcj0iI2Y5OGIyNSIgc3RvcC1vcGFjaXR5PSIwIj4KDTwvc3RvcD4KDTxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iI2Y5OGIyNSI+Cg08L3N0b3A+Cg08L3JhZGlhbEdyYWRpZW50PgoNPHBhdGggZD0iTTM5Ljg0IDQuNjhjLS4wMS4wMS0uMDMuMDEtLjA2LjAyaC0uMDFjLS45My4zOS04LjI0IDMuNzgtNS41MSAxMi4yNmw3Ljc4IDEuMjVjLTYuODktNi45OC0yLjE3LTEzLjU1LTIuMTctMTMuNTVzLS4wMi4wMS0uMDMuMDJ6IiBmaWxsPSJ1cmwoI0ljb25pZnlJZDE3ZWNkYjI5MDRkMTc4ZWFiMTc5MzgpIj4KDTwvcGF0aD4KDTxyYWRpYWxHcmFkaWVudCBpZD0iSWNvbmlmeUlkMTdlY2RiMjkwNGQxNzhlYWIxNzkzOSIgY3g9IjM4LjE1MyIgY3k9IjI1LjQ0MiIgcj0iMTYuMDgzIiBncmFkaWVudFRyYW5zZm9ybT0ibWF0cml4KC0uOTY1NyAtLjI1OTggLjI0MzIgLS45MDM3IDY4LjgxIDU4LjM0NykiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIj4KDTxzdG9wIG9mZnNldD0iLjUwMyIgc3RvcC1jb2xvcj0iI2Y5OGIyNSIgc3RvcC1vcGFjaXR5PSIwIj4KDTwvc3RvcD4KDTxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iI2Y5OGIyNSI+Cg08L3N0b3A+Cg08L3JhZGlhbEdyYWRpZW50PgoNPHBhdGggZD0iTTM5LjA3IDE3LjczbC00LjgxLS43N2MtLjE5IDAtLjgzLjA2LTEuMTguMTFjLTIuNzEuMzgtNS45IDEuNzgtNy42MyA1LjM2Yy0xLjg2IDMuODYtMS44MSA3LjE3LTEuMyA5LjM4Yy4xNS43NC40NSAxLjU4LjQ1IDEuNThzMi4zOC0yLjI2IDguMDUtMi40MWw2LjQyLTEzLjI1eiIgZmlsbD0idXJsKCNJY29uaWZ5SWQxN2VjZGIyOTA0ZDE3OGVhYjE3OTM5KSI+Cg08L3BhdGg+Cg08cmFkaWFsR3JhZGllbnQgaWQ9Ikljb25pZnlJZDE3ZWNkYjI5MDRkMTc4ZWFiMTc5NDAiIGN4PSIzNi4zOSIgY3k9IjQyLjkxNSIgcj0iMTYuODg2IiBncmFkaWVudFRyYW5zZm9ybT0ibWF0cml4KC45OTA3IC4xMzYzIC0uMTM1MyAuOTgzNyA2LjE0OCAtNC4yNTkpIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+Cg08c3RvcCBvZmZzZXQ9Ii42OTkiIHN0b3AtY29sb3I9IiNmOThiMjUiIHN0b3Atb3BhY2l0eT0iMCI+Cg08L3N0b3A+Cg08c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiNmOThiMjUiPgoNPC9zdG9wPgoNPC9yYWRpYWxHcmFkaWVudD4KDTxwYXRoIGQ9Ik0yNC4zNyAzMy41OGMtMi4zNyAyLjEtNS41NiA2Ljc5LTMuMjEgMTIuNjFjMS43OCA0LjM5IDguMDkgNi4yOSA4LjA5IDYuMjljMCAuMDIgMS4yNi4zOSAxLjkxLjM5bDEuNDgtMjEuOWMtMy4wMyAwLTUuOTQuOTEtNy44MiAyLjIyYy4wMy4wNC0uNDYuMzYtLjQ1LjM5eiIgZmlsbD0idXJsKCNJY29uaWZ5SWQxN2VjZGIyOTA0ZDE3OGVhYjE3OTQwKSI+Cg08L3BhdGg+Cg08L2c+Cg08L3N2Zz4=", Oo = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KDTwhLS0gVXBsb2FkZWQgdG86IFNWRyBSZXBvLCB3d3cuc3ZncmVwby5jb20sIEdlbmVyYXRvcjogU1ZHIFJlcG8gTWl4ZXIgVG9vbHMgLS0+Cjxzdmcgd2lkdGg9IjgwMHB4IiBoZWlnaHQ9IjgwMHB4IiB2aWV3Qm94PSIwIDAgNjQgNjQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIGFyaWEtaGlkZGVuPSJ0cnVlIiByb2xlPSJpbWciIGNsYXNzPSJpY29uaWZ5IGljb25pZnktLWVtb2ppb25lIiBwcmVzZXJ2ZUFzcGVjdFJhdGlvPSJ4TWlkWU1pZCBtZWV0Ij4KDTxwYXRoIGQ9Ik01Ny42IDEzLjdjLS43LTEtMS42LTEuNy0yLjctMi4yYy0zLjQtMS43LTExLjYtMS4zLTEyLjMtNS43Yy0uOS01LjctNS45LjEtNi44LjFjLTEuMSAwLTEuNi0zLjktMy43LTMuOWMtMi4yIDAtMi43IDMuOS0zLjcgMy45Yy0uOSAwLTUuOS01LjgtNi44LS4xYy0uNyA0LjMtOSA0LTEyLjMgNS43Yy0xIC41LTIgMS4yLTIuNyAyLjJjLS41LjguNiAxLjYgMS4yLjljMS42LTIgNC44LTIuNCA3LjEtMi44YzEuOS0uNCA0LS42IDUuOS0xLjRjMi42LTEgMi41LTQuOSAzLjMtNC45Yy42IDAgMi43IDMgNC41IDNjMS42IDAgMi42LTMuNyAzLjUtMy43Yy45IDAgMS45IDMuNyAzLjUgMy43YzEuOSAwIDQtMyA0LjYtM2MuOCAwIC43IDMuOSAzLjMgNC45YzEuOC44IDMuOSAxIDUuOSAxLjRjMi4zLjUgNS42LjggNy4xIDIuOGMuNS43IDEuNi0uMiAxLjEtLjkiIGZpbGw9IiMwMGI5ZjEiPgoNPC9wYXRoPgoNPHBhdGggZD0iTTUzIDU3YzAgMi44LTIuMiA1LTUgNUgxNmMtMi44IDAtNS0yLjItNS01VjM2aDQydjIxeiIgZmlsbD0iIzg5OTY3YSI+Cg08L3BhdGg+Cg08cGF0aCBkPSJNMzIgMTJjLTE1LjUgMC0yMSA4LjUtMjEgMjR2MjFoNDJWMzZjMC0xNS41LTUuNS0yNC0yMS0yNCIgZmlsbD0iI2I2YzRhNyI+Cg08L3BhdGg+Cg08ZyBmaWxsPSIjODk5NjdhIj4KDTxwYXRoIGQ9Ik0xMSA1NWMtMS4xIDAtMi0xLjItMi0yLjZ2LTYuOGMwLTEuNC45LTIuNiAyLTIuNnYxMiI+Cg08L3BhdGg+Cg08cGF0aCBkPSJNNTMgNDNjMS4xIDAgMiAxLjIgMiAyLjZ2Ni44YzAgMS40LS45IDIuNi0yIDIuNlY0MyI+Cg08L3BhdGg+Cg08L2c+Cg08ZyBmaWxsPSIjM2U0MzQ3Ij4KDTxwYXRoIGQ9Ik03IDIwSDV2MzBoNHYtMkg3eiI+Cg08L3BhdGg+Cg08cGF0aCBkPSJNNTcgMjB2MjhoLTJ2Mmg0VjIweiI+Cg08L3BhdGg+Cg08L2c+Cg08Y2lyY2xlIGN4PSI1OCIgY3k9IjIwIiByPSI0IiBmaWxsPSIjMDBiOWYxIj4KDTwvY2lyY2xlPgoNPGNpcmNsZSBjeD0iNiIgY3k9IjIwIiByPSI0IiBmaWxsPSIjZmY1MjYzIj4KDTwvY2lyY2xlPgoNPHBhdGggZD0iTTIxLjUgMzkuNWMtNC40IDAtOC0zLjYtOC04czMuNi04IDgtOHM4IDMuNiA4IDhzLTMuNiA4LTggOCIgZmlsbD0iI2VmZmZkOSI+Cg08L3BhdGg+Cg08Y2lyY2xlIGN4PSIyMS41IiBjeT0iMzEuNSIgcj0iNiIgZmlsbD0iIzU0NWI2MSI+Cg08L2NpcmNsZT4KDTxjaXJjbGUgY3g9IjIxLjUiIGN5PSIzMS41IiByPSIyLjMiIGZpbGw9IiNmZjUyNjMiPgoNPC9jaXJjbGU+Cg08cGF0aCBkPSJNNDIuNSAzOS41Yy00LjQgMC04LTMuNi04LThzMy42LTggOC04czggMy42IDggOHMtMy42IDgtOCA4IiBmaWxsPSIjZWZmZmQ5Ij4KDTwvcGF0aD4KDTxwYXRoIGQ9Ik00Mi41IDM3LjVjLTMuMyAwLTYtMi43LTYtNnMyLjctNiA2LTZzNiAyLjcgNiA2cy0yLjcgNi02IDYiIGZpbGw9IiM1NDViNjEiPgoNPC9wYXRoPgoNPGNpcmNsZSBjeD0iNDIuNSIgY3k9IjMxLjUiIHI9IjIuMyIgZmlsbD0iI2ZmNTI2MyI+Cg08L2NpcmNsZT4KDTxwYXRoIGQ9Ik0xOS44IDU0LjFjLTcuNCAwLTcuNC0xMyAwLTEzaDI0LjVjNy40IDAgNy40IDEzIDAgMTNIMTkuOCIgZmlsbD0iI2VmZmZkOSI+Cg08L3BhdGg+Cg08cGF0aCBkPSJNMjAuNSA1Mi42Yy02IDAtNi0xMCAwLTEwaDIzYzYgMCA2IDEwIDAgMTBoLTIzIiBmaWxsPSIjODk5NjdhIj4KDTwvcGF0aD4KDTxnIG9wYWNpdHk9Ii43IiBmaWxsPSIjM2U0MzQ3Ij4KDTxwYXRoIGQ9Ik0yMS4yIDUwLjdjMCAxLjItMiAxLjItMiAwdi02LjFjMC0xLjIgMi0xLjIgMiAwdjYuMSI+Cg08L3BhdGg+Cg08cGF0aCBkPSJNMjUuOSA1MC43YzAgMS4yLTIgMS4yLTIgMHYtNi4xYzAtMS4yIDItMS4yIDIgMHY2LjEiPgoNPC9wYXRoPgoNPHBhdGggZD0iTTMwLjYgNTAuN2MwIDEuMi0yIDEuMi0yIDB2LTYuMWMwLTEuMiAyLTEuMiAyIDB2Ni4xIj4KDTwvcGF0aD4KDTxwYXRoIGQ9Ik0zNS40IDUwLjdjMCAxLjItMiAxLjItMiAwdi02LjFjMC0xLjIgMi0xLjIgMiAwdjYuMSI+Cg08L3BhdGg+Cg08cGF0aCBkPSJNNDAuMSA1MC43YzAgMS4yLTIgMS4yLTIgMHYtNi4xYzAtMS4yIDItMS4yIDIgMHY2LjEiPgoNPC9wYXRoPgoNPHBhdGggZD0iTTQ0LjggNTAuN2MwIDEuMi0yIDEuMi0yIDB2LTYuMWMwLTEuMiAyLTEuMiAyIDB2Ni4xIj4KDTwvcGF0aD4KDTwvZz4KDTxjaXJjbGUgY3g9IjMyIiBjeT0iMzciIHI9IjIiIGZpbGw9IiNmNWY1ZjUiPgoNPC9jaXJjbGU+Cg08cGF0aCBmaWxsPSIjNTQ1YjYxIiBkPSJNMzAuMzE2IDM1Ljg2MmwuNTY2LS41NjVsMi44MjggMi44MjhsLS41NjUuNTY2eiI+Cg08L3BhdGg+Cg08L3N2Zz4=", ce = "https://demo-bot.tock.ai/io/tock/tockbot/web", Ls = [
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
                  src: Oo,
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
                  src: Oo,
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
], Ts = { class: "panel-body-wrapper d-flex flex-column" }, Ds = { class: "panel-body-body flex-grow-1" }, Cs = /* @__PURE__ */ w("div", { class: "option-category-header p-2 d-flex align-items-center border-top border-bottom" }, [
  /* @__PURE__ */ w("h6", { class: "m-0 ms-1" }, "Templates")
], -1), Os = ["onClick"], As = { class: "mb-0" }, Es = {
  key: 0,
  class: "text-small mt-1"
}, zs = {
  key: 0,
  class: "alert alert-danger my-2 text-small"
}, Ps = { class: "text-end" }, $s = ["onClick"], Ys = /* @__PURE__ */ X({
  __name: "editor-templates",
  setup(e) {
    const t = te(), o = Y(Ls);
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
    return (a, l) => (f(), I("div", Ts, [
      w("div", Ds, [
        Cs,
        (f(!0), I(q, null, le(o.value, (c) => (f(), I("div", {
          class: Q(["templates-list-entry cursor-pointer py-2 px-3", { active: c.active }])
        }, [
          w("div", {
            onClick: (u) => n(c)
          }, [
            w("h6", As, F(c.name), 1),
            c.description ? (f(), I("div", Es, F(c.description), 1)) : z("", !0)
          ], 8, Os),
          c._confirmTemplateChangeWarning ? (f(), I("div", zs, [
            fe(" Your changes will be lost. Are you sure you want to apply this template and reset all your recent changes? "),
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
}, Rs = { class: "form-label lh-1 d-flex gap-4 align-items-center justify-content-between position-relative" }, Ws = { class: "input-group input-group-sm" }, Zs = /* @__PURE__ */ w("i", { class: "bi bi bi-caret-down-fill" }, null, -1), Vs = [
  Zs
], Bs = ["contenteditable"], Fs = { key: 0 }, Us = { key: 1 }, Hs = ["onClick"], Qs = /* @__PURE__ */ w("i", { class: "bi bi-arrow-90deg-left" }, null, -1), Js = [
  Qs
], Ks = {
  key: 0,
  class: "list-group variable-suggestions"
}, qs = ["onClick"], Xs = {
  key: 1,
  class: "form-text text-small"
}, er = /* @__PURE__ */ w("span", { class: "text-muted" }, "Default value : ", -1), tr = /* @__PURE__ */ X({
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
    const t = te(), o = e;
    qe(() => {
      i() && n();
    }), Vn(() => {
      document.removeEventListener("click", E);
    }), t.$onAction(({ name: p, store: x, args: A, after: T }) => {
      p === "targetStylingVariable" && T(() => {
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
      var T;
      document.documentElement.style.setProperty(o.variable.key, p);
      const A = (T = o.variables) == null ? void 0 : T.find((P) => P.key === o.variable.key);
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
      let A = [...p.matchAll(x)], T = [], P = 0;
      return A.length ? (A.forEach((G) => {
        G.index && G.index > P && T.push({ str: p.substring(P, G.index) }), T.push({ str: G[0], varName: G[1] }), P = G.index + G[0].length;
      }), P < p.length && T.push({ str: p.substring(P, p.length) })) : T.push({ str: p }), T;
    }
    function g(p, x) {
      p.stopPropagation(), t.jumpToStylingVariable(x);
    }
    let m;
    function k() {
      m = o.variable.value.toString(), s.value = !0;
    }
    function L() {
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
      t.stylingVariableReached(), k(), setTimeout(() => {
        N(999, 999);
      });
    }
    function N(p = 0, x = 0) {
      var T, P, G;
      const A = document.getSelection();
      if (A) {
        const Z = document.createRange(), ee = (T = u.value) == null ? void 0 : T.children[0], eo = ((G = (P = ee == null ? void 0 : ee.childNodes[0]) == null ? void 0 : P.textContent) == null ? void 0 : G.length) || 0;
        ee != null && ee.childNodes[0] && (Z.setStart(ee == null ? void 0 : ee.childNodes[0], Math.min(eo, p)), Z.setEnd(ee == null ? void 0 : ee.childNodes[0], Math.min(eo, x)), A.removeAllRanges(), A.addRange(Z));
      }
    }
    function S(p) {
      var A;
      D(p);
      let x = (A = p.clipboardData) == null ? void 0 : A.getData("text/plain");
      if (x) {
        const T = document.getSelection(), P = T == null ? void 0 : T.getRangeAt(0);
        if (P) {
          const G = o.variable.value.toString(), Z = G.substring(0, P.startOffset), ee = G.substring(P.endOffset);
          x = Z + x + ee;
        }
        a(x), m = o.variable.value.toString();
      }
    }
    function M(p) {
      if (typeof CSSNumericValue < "u" && (p.target, ["ArrowUp", "ArrowDown"].includes(p.key))) {
        const A = o.variable.value.toString().trim();
        var x = /^-?\d*\.?\d+(?:em|rem|px|%|vh|vw|pt)?/g;
        if (A.split(" ").length < 2 && x.test(A)) {
          D(p);
          const T = CSSNumericValue.parse(A);
          let P = 1;
          p.ctrlKey && (P /= 10), p.shiftKey && (P *= 10), p.key === "ArrowUp" && (T.value += P), p.key === "ArrowDown" && (T.value -= P);
          const G = T.toString();
          a(G), m = G;
        }
      }
    }
    let b = Y(!1);
    function v(p) {
      D(p), b.value = !b.value, b.value ? document.addEventListener("click", E) : document.removeEventListener("click", E);
    }
    function E(p) {
      b.value && v(p);
    }
    function j(p) {
      var A;
      const x = (A = o.variables) == null ? void 0 : A.find((T) => T.key === p);
      return x ? x.value.toString() : null;
    }
    function h(p) {
      return !(!p.startsWith("--tvk_colors") || [
        "--tvk_colors_brand-hue",
        "--tvk_colors_brand-lightness",
        "--tvk_colors_brand-saturation"
      ].includes(p));
    }
    function y(p) {
      Sn(p);
    }
    return (p, x) => {
      const A = wt("tooltip");
      return f(), I("div", {
        ref_key: "wrapperRef",
        ref: r,
        class: Q(["position-relative", { "targeted-item": i() }])
      }, [
        w("label", Rs, [
          w("span", {
            class: Q(["text-nowrap", {
              "fst-italic": o.variable.value != o.variable.initialValue
            }])
          }, F(o.variable.name), 3),
          W((f(), I("span", {
            class: "text-muted text-small text-end text-truncate py-1",
            onClick: x[0] || (x[0] = (T) => y(o.variable.key))
          }, [
            fe(F(o.variable.key), 1)
          ])), [
            [A, o.variable.key + " (click to copy)"]
          ])
        ]),
        w("div", Ws, [
          c() ? (f(), I("button", {
            key: 0,
            class: "btn btn-secondary px-1",
            type: "button",
            onClick: v
          }, Vs)) : z("", !0),
          w("div", {
            class: "form-control",
            ref_key: "inputRef",
            ref: u,
            spellcheck: "false",
            contenteditable: d(s),
            onClick: x[1] || (x[1] = (T) => k()),
            onBlur: x[2] || (x[2] = (T) => L()),
            onFocus: x[3] || (x[3] = (T) => O()),
            onKeyup: x[4] || (x[4] = (T) => D(T)),
            onPaste: x[5] || (x[5] = (T) => S(T)),
            onInput: x[6] || (x[6] = Bn((T) => C(T), ["self"])),
            onKeydown: x[7] || (x[7] = (T) => M(T)),
            tabindex: "0"
          }, [
            d(s) ? (f(), I(q, { key: 0 }, [
              fe(F(d(m)), 1)
            ], 64)) : z("", !0),
            d(s) ? z("", !0) : (f(!0), I(q, { key: 1 }, le(_(), (T) => (f(), I(q, null, [
              T.varName ? z("", !0) : (f(), I("span", Fs, F(T.str), 1)),
              T.varName ? (f(), I("span", Us, [
                h(T.varName) ? (f(), I("span", {
                  key: 0,
                  style: We({ "--prvw-color": "var(" + T.varName + ")" }),
                  class: "variable-color-preview"
                }, null, 4)) : z("", !0),
                fe("var("),
                W((f(), I("a", {
                  onClick: (P) => g(P, T.varName),
                  href: "javascript:void(null)",
                  class: "variable-link"
                }, [
                  fe(F(T.varName), 1)
                ], 8, Hs)), [
                  [A, j(T.varName)]
                ]),
                fe(") ")
              ])) : z("", !0)
            ], 64))), 256))
          ], 40, Bs),
          o.variable.value != o.variable.initialValue ? W((f(), I("button", {
            key: 1,
            class: "btn btn-secondary",
            type: "button",
            id: "button-addon2",
            onClick: x[8] || (x[8] = (T) => l()),
            tabindex: "1"
          }, Js)), [
            [A, "Restore default value"]
          ]) : z("", !0)
        ]),
        d(b) ? (f(), I("ul", Ks, [
          (f(!0), I(q, null, le(c(), (T) => (f(), I("li", {
            class: "list-group-item cursor-pointer",
            onClick: (P) => a(T)
          }, F(T), 9, qs))), 256))
        ])) : z("", !0),
        o.variable.value != o.variable.initialValue ? (f(), I("div", Xs, [
          er,
          fe(F(o.variable.initialValue.toString()), 1)
        ])) : z("", !0)
      ], 2);
    };
  }
}), or = {
  key: 0,
  class: "bi bi-chevron-right"
}, nr = {
  key: 1,
  class: "bi bi-chevron-down"
}, ir = { class: "p-3 border-bottom" }, sr = /* @__PURE__ */ X({
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
    const t = te(), o = e;
    let n = Y(!0);
    return qe(() => {
      o.path.length > 1 && (n.value = !1);
    }), t.$onAction(({ name: i, store: s, args: r, after: a }) => {
      i === "targetStylingVariable" && a(() => {
        if (t.stylingTargetedVar) {
          const l = qt(t.stylingTargetedVar);
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
      const r = ze("editorVariablesGroup", !0);
      return f(), I(q, null, [
        w("div", {
          class: Q(["option-category-header p-2 d-flex align-items-center border-top border-bottom", {
            "cursor-pointer": o.path.length > 1
          }]),
          onClick: s[0] || (s[0] = (l) => o.path.length > 1 ? Le(n) ? n.value = !d(n) : n = !d(n) : null)
        }, [
          o.path.length > 1 && !d(n) ? (f(), I("i", or)) : z("", !0),
          o.path.length > 1 && d(n) ? (f(), I("i", nr)) : z("", !0),
          w("h6", {
            class: Q(["m-0 ms-1", { "fw-bold": o.path.length === 1 }])
          }, F((a = e.path) == null ? void 0 : a.join(" | ")), 3)
        ], 2),
        d(n) ? (f(!0), I(q, { key: 0 }, le(d(js)(e.variables, e.path), (l, c) => (f(), I("div", ir, [
          (f(), K(tr, {
            variables: e.variables,
            variable: l,
            key: l.key
          }, null, 8, ["variables", "variable"]))
        ]))), 256)) : z("", !0),
        (f(!0), I(q, null, le(d(Ns)(e.variables, e.path), (l) => (f(), I("div", null, [
          (f(), K(r, {
            variables: e.variables,
            path: [...e.path, l],
            key: [...e.path, l].join("")
          }, null, 8, ["variables", "path"]))
        ]))), 256))
      ], 64);
    };
  }
}), rr = { class: "panel-body-wrapper d-flex flex-column" }, ar = { class: "panel-body-header pt-1 px-1 border-bottom" }, lr = { class: "d-flex flex-wrap justify-content-between" }, cr = ["onClick"], ur = { class: "panel-body-body flex-grow-1" }, dr = /* @__PURE__ */ X({
  __name: "editor-variables",
  setup(e) {
    const t = te();
    t.$onAction(({ name: s, store: r, args: a, after: l }) => {
      s === "refreshEditorPanels" && l(() => {
        i();
      });
    });
    const o = Y([]), n = Y([]);
    function i() {
      o.value = Xt(), n.value = ks(o.value);
    }
    return (s, r) => (f(), I("div", rr, [
      w("div", ar, [
        w("div", lr, [
          (f(!0), I(q, null, le(n.value, (a) => (f(), I("div", {
            class: Q(["tag cursor-pointer me-1 mb-1 text-nowrap flex-fill text-center", { active: d(t).stylingCategory === a }]),
            onClick: (l) => d(t).setStylingCategory(a)
          }, F(a), 11, cr))), 256))
        ])
      ]),
      w("div", ur, [
        (f(), K(sr, {
          variables: o.value,
          path: [d(t).stylingCategory],
          key: d(t).stylingCategory
        }, null, 8, ["variables", "path"]))
      ])
    ]));
  }
}), pr = { class: "form-label lh-1 d-flex gap-4 align-items-center justify-content-between position-relative" }, hr = { class: "text-muted text-small text-end text-truncate rtl" }, gr = { class: "form-text text-small mb-2" }, fr = { class: "input-group input-group-sm" }, mr = ["value", "disabled"], _r = ["value", "disabled"], vr = {
  key: 2,
  class: "form-check form-switch"
}, yr = ["id", "checked", "disabled"], br = ["for"], wr = { key: 0 }, Mr = { key: 1 }, Ir = { key: 3 }, kr = { class: "form-check form-switch" }, jr = ["id", "disabled"], Nr = ["for"], xr = { key: 0 }, Sr = { key: 1 }, Lr = {
  key: 0,
  class: "input-group-sm imageDef-wrapper mt-2"
}, Tr = /* @__PURE__ */ w("label", { class: "form-label text-small mb-0" }, "Src (url or svg data image)", -1), Dr = ["value", "disabled"], Cr = { class: "d-flex gap-3" }, Or = { class: "input-group-sm" }, Ar = /* @__PURE__ */ w("label", { class: "form-label text-small mb-0" }, "Width", -1), Er = ["value", "disabled"], zr = { class: "input-group-sm" }, Pr = /* @__PURE__ */ w("label", { class: "form-label text-small mb-0" }, "Height", -1), $r = ["value", "disabled"], Yr = {
  key: 4,
  class: "w-100"
}, Gr = {
  key: 0,
  class: "d-flex text-small"
}, Rr = /* @__PURE__ */ w("div", { style: { width: "45%" } }, "Header name", -1), Wr = /* @__PURE__ */ w("div", null, "Header value", -1), Zr = [
  Rr,
  Wr
], Vr = { class: "input-group input-group-sm mb-1" }, Br = ["value", "onInput", "disabled"], Fr = ["value", "onInput", "disabled"], Ur = ["onClick", "disabled"], Hr = /* @__PURE__ */ w("i", { class: "bi bi-trash" }, null, -1), Qr = [
  Hr
], Jr = ["disabled"], it = 500, Ye = "New-Header-Name", Kr = /* @__PURE__ */ X({
  __name: "editor-options-entry",
  props: {
    optionsModel: {},
    group: {},
    path: {},
    value: {},
    currentOptions: {}
  },
  setup(e) {
    const t = te();
    t.$onAction(({ name: N, store: S, args: M, after: b }) => {
      N === "refreshEditorPanels" && b(() => {
        setTimeout(() => {
          a();
        });
      });
    });
    const o = e;
    let n = Y(!0), i = Y(), s = Y(!1), r;
    qe(() => {
      r = [o.group, o.path].join(".");
      const N = o.optionsModel[o.group], S = o.currentOptions[o.group], M = l(N, o.path), b = l(S, o.path);
      a(), typeof b > "u" ? i.value = M.default : i.value = b, o.value.type === "ImageDef" && i.value && (s.value = !0);
    });
    function a() {
      let N = !0;
      const S = o.optionsModel[o.group], M = l(S, o.path);
      M.conditions && M.conditions.forEach((b) => {
        l(o.currentOptions, b) || (N = !1);
      }), n.value = N;
    }
    const l = (N, S) => S.split(".").reduce((M, b) => b in M ? M[b] : void 0, N);
    function c(N, S) {
      t.templateDirtyState = !0, Un(N, S);
    }
    const u = nt((N) => {
      c(r, N), i.value = N, t.refreshEditorPanels();
    }, it);
    Vt(s, (N, S) => {
      N || (c(r, void 0), i.value = void 0);
    });
    const _ = nt((N, S) => {
      const M = [r, N].join(".");
      c(M, S);
      let b = i.value ? i.value : {};
      b[N] = S, i.value = b;
    }, it), g = nt((N, S) => {
      i.value[S] = i.value[N], delete i.value[N], c(r, i.value);
    }, it), m = nt((N, S) => {
      i.value[N] = S, c(r, i.value);
    }, it);
    function k(N) {
      delete i.value[N], Object.keys(i.value).length < 1 && (i.value = void 0), c(r, i.value);
    }
    const L = Y({});
    function D(N, S) {
      L.value[N] = S;
    }
    function C() {
      return !i.value || i.value[Ye] === void 0;
    }
    function O() {
      i.value ? i.value[Ye] = "" : i.value = { [Ye]: "" }, setTimeout(() => {
        L.value[Ye].focus(), L.value[Ye].select();
      });
    }
    return (N, S) => {
      var b, v, E;
      const M = wt("tooltip");
      return f(), I("div", {
        class: Q(["p-3 border-bottom", {
          inactive: !d(n),
          "tvke-secondary-bg-subtle": d(i) != o.value.default
        }])
      }, [
        w("label", pr, [
          w("span", {
            class: Q(["text-nowrap", { "fw-bold": d(i) != o.value.default }])
          }, F(o.value.title), 3),
          W((f(), I("span", hr, [
            fe(F(d(r)), 1)
          ])), [
            [M, d(r)]
          ])
        ]),
        w("div", gr, F(o.value.description), 1),
        w("div", fr, [
          o.value.type === "string" ? (f(), I("input", {
            key: 0,
            class: "form-control",
            placeholder: "Not specified",
            spellcheck: "false",
            value: d(i),
            onInput: S[0] || (S[0] = (j) => {
              var h;
              return d(u)((h = j == null ? void 0 : j.target) == null ? void 0 : h.value);
            }),
            disabled: !d(n)
          }, null, 40, mr)) : z("", !0),
          o.value.type === "number" ? (f(), I("input", {
            key: 1,
            type: "number",
            class: "form-control",
            placeholder: "Not specified",
            spellcheck: "false",
            value: d(i),
            onInput: S[1] || (S[1] = (j) => {
              var h;
              return d(u)((h = j == null ? void 0 : j.target) == null ? void 0 : h.value);
            }),
            disabled: !d(n)
          }, null, 40, _r)) : z("", !0),
          o.value.type === "boolean" ? (f(), I("div", vr, [
            w("input", {
              class: "form-check-input",
              type: "checkbox",
              role: "switch",
              id: N.path,
              checked: d(i),
              onInput: S[2] || (S[2] = (j) => {
                var h;
                return d(u)((h = j == null ? void 0 : j.target) == null ? void 0 : h.checked);
              }),
              disabled: !d(n)
            }, null, 40, yr),
            w("label", {
              class: "form-check-label",
              for: N.path
            }, [
              d(i) ? (f(), I("span", wr, "enabled")) : z("", !0),
              d(i) ? z("", !0) : (f(), I("span", Mr, "disabled"))
            ], 8, br)
          ])) : z("", !0),
          o.value.type === "ImageDef" ? (f(), I("div", Ir, [
            w("div", kr, [
              W(w("input", {
                class: "form-check-input",
                type: "checkbox",
                role: "switch",
                id: N.path,
                "onUpdate:modelValue": S[3] || (S[3] = (j) => Le(s) ? s.value = j : s = j),
                disabled: !d(n)
              }, null, 8, jr), [
                [Go, d(s)]
              ]),
              w("label", {
                class: "form-check-label",
                for: N.path
              }, [
                d(s) ? (f(), I("span", xr, "enabled")) : z("", !0),
                d(s) ? z("", !0) : (f(), I("span", Sr, "disabled"))
              ], 8, Nr)
            ]),
            d(s) ? (f(), I("div", Lr, [
              Tr,
              w("input", {
                class: "form-control",
                placeholder: "Not specified",
                spellcheck: "false",
                value: (b = d(i)) == null ? void 0 : b.src,
                onInput: S[4] || (S[4] = (j) => {
                  var h;
                  return d(_)("src", (h = j == null ? void 0 : j.target) == null ? void 0 : h.value);
                }),
                disabled: !d(n)
              }, null, 40, Dr),
              w("div", Cr, [
                w("div", Or, [
                  Ar,
                  w("input", {
                    class: "form-control",
                    placeholder: "Not specified",
                    spellcheck: "false",
                    value: (v = d(i)) == null ? void 0 : v.width,
                    onInput: S[5] || (S[5] = (j) => {
                      var h;
                      return d(_)(
                        "width",
                        (h = j == null ? void 0 : j.target) == null ? void 0 : h.value
                      );
                    }),
                    disabled: !d(n)
                  }, null, 40, Er)
                ]),
                w("div", zr, [
                  Pr,
                  w("input", {
                    class: "form-control",
                    placeholder: "Not specified",
                    spellcheck: "false",
                    value: (E = d(i)) == null ? void 0 : E.height,
                    onInput: S[6] || (S[6] = (j) => {
                      var h;
                      return d(_)(
                        "height",
                        (h = j == null ? void 0 : j.target) == null ? void 0 : h.value
                      );
                    }),
                    disabled: !d(n)
                  }, null, 40, $r)
                ])
              ])
            ])) : z("", !0)
          ])) : z("", !0),
          o.value.type === "KeyValues" ? (f(), I("div", Yr, [
            d(i) ? (f(), I("div", Gr, Zr)) : z("", !0),
            (f(!0), I(q, null, le(d(i), (j, h) => (f(), I("div", Vr, [
              w("input", {
                class: "form-control",
                placeholder: "Not specified",
                spellcheck: "false",
                value: h,
                ref_for: !0,
                ref: (y) => D(h, y),
                onInput: (y) => {
                  var p;
                  return d(g)(
                    h,
                    (p = y == null ? void 0 : y.target) == null ? void 0 : p.value
                  );
                },
                disabled: !d(n)
              }, null, 40, Br),
              w("input", {
                class: "form-control",
                placeholder: "Not specified",
                spellcheck: "false",
                value: j,
                onInput: (y) => {
                  var p;
                  return d(m)(
                    h,
                    (p = y == null ? void 0 : y.target) == null ? void 0 : p.value
                  );
                },
                disabled: !d(n)
              }, null, 40, Fr),
              w("button", {
                class: "btn btn-danger btn-sm",
                onClick: (y) => k(h),
                disabled: !d(n)
              }, Qr, 8, Ur)
            ]))), 256)),
            C() ? (f(), I("button", {
              key: 1,
              class: "btn btn-link btn-sm p-0",
              onClick: O,
              disabled: !d(n)
            }, " Add new header ", 8, Jr)) : z("", !0)
          ])) : z("", !0)
        ])
      ], 2);
    };
  }
}), qr = /* @__PURE__ */ X({
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
    qe(() => {
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
    return (i, s) => (f(!0), I(q, null, le(d(o), (r) => (f(), K(Kr, {
      "options-model": t.optionsModel,
      group: t.group,
      path: r[0],
      value: r[1],
      "current-options": t.currentOptions
    }, null, 8, ["options-model", "group", "path", "value", "current-options"]))), 256));
  }
}), Xr = { class: "option-category-header p-2 d-flex align-items-center border-top border-bottom" }, ea = { class: "m-0 ms-1" }, Ln = /* @__PURE__ */ X({
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
    return (o, n) => (f(), I(q, null, [
      w("div", Xr, [
        w("h6", ea, F(t.group), 1)
      ]),
      Zt(qr, {
        "options-model": t.optionsModel,
        group: t.group,
        "current-options": t.currentOptions
      }, null, 8, ["options-model", "group", "current-options"])
    ], 64));
  }
}), ta = { class: "panel-body-wrapper d-flex flex-column" }, oa = { class: "panel-body-body flex-grow-1" }, na = /* @__PURE__ */ X({
  __name: "editor-preferences",
  setup(e) {
    const t = te();
    let o = Y(), n = Y([]), i = Y();
    t.$onAction(({ name: r, store: a, args: l, after: c }) => {
      r === "refreshEditorPanels" && c(() => {
        s();
      });
    });
    function s() {
      i.value = pt();
      const r = ht();
      o.value = r, n.value = ["localStorage", "initialization", "preferences"];
    }
    return (r, a) => (f(), I("div", ta, [
      w("div", oa, [
        (f(!0), I(q, null, le(d(n), (l, c) => (f(), K(Ln, {
          "options-model": d(o),
          group: l,
          "current-options": d(i),
          index: c
        }, null, 8, ["options-model", "group", "current-options", "index"]))), 256))
      ])
    ]));
  }
}), ia = { class: "panel-body-wrapper d-flex flex-column" }, sa = { class: "panel-body-body flex-grow-1" }, ra = /* @__PURE__ */ X({
  __name: "editor-wording",
  setup(e) {
    const t = te();
    let o = Y(), n = Y([]), i = Y();
    t.$onAction(({ name: r, store: a, args: l, after: c }) => {
      r === "refreshEditorPanels" && c(() => {
        s();
      });
    });
    function s() {
      i.value = pt();
      const r = ht();
      o.value = r, n.value = ["wording"];
    }
    return (r, a) => (f(), I("div", ia, [
      w("div", sa, [
        (f(!0), I(q, null, le(d(n), (l, c) => (f(), K(Ln, {
          "options-model": d(o),
          group: l,
          "current-options": d(i),
          index: c
        }, null, 8, ["options-model", "group", "current-options", "index"]))), 256))
      ])
    ]));
  }
}), Tn = (e, t) => {
  const o = e.__vccOpts || e;
  for (const [n, i] of t)
    o[n] = i;
  return o;
}, aa = /* @__PURE__ */ Tn(ra, [["__scopeId", "data-v-e0f618d5"]]);
var H = /* @__PURE__ */ ((e) => (e.bot = "bot", e.user = "user", e.app = "app", e))(H || {}), R = /* @__PURE__ */ ((e) => (e.message = "message", e.card = "card", e.carousel = "carousel", e.image = "image", e.loader = "loader", e.error = "error", e))(R || {}), Ne = /* @__PURE__ */ ((e) => (e.web_url = "web_url", e.postback = "postback", e.quick_reply = "quick_reply", e))(Ne || {});
function me() {
  const t = Math.max(Math.random(), 0.3), o = Math.max(Math.random(), 0.3), n = Math.ceil(t * 500), i = Math.ceil(o * 500);
  return `https://picsum.photos/${n}/${i}`;
}
const la = [
  {
    name: "Simple text message",
    messages: [
      {
        type: R.message,
        author: H.user,
        text: "Give me a simple text message",
        date: Date.now()
      },
      {
        type: R.message,
        author: H.bot,
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
        type: R.message,
        author: H.user,
        date: Date.now(),
        text: "Give me a rag response with sources"
      },
      {
        type: R.message,
        author: H.bot,
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
        type: R.message,
        author: H.user,
        date: Date.now(),
        text: "Give me a rag response with sources and their content"
      },
      {
        type: R.message,
        author: H.bot,
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
        type: R.message,
        author: H.user,
        date: Date.now(),
        text: "Give me some photos"
      },
      {
        type: R.card,
        author: H.bot,
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
        type: R.card,
        author: H.bot,
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
        type: R.message,
        author: H.user,
        date: Date.now(),
        text: "Give me a photo carousel"
      },
      {
        type: R.carousel,
        author: H.bot,
        date: Date.now(),
        cards: [
          {
            title: "Photo 1",
            type: R.card,
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
            type: R.card,
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
            type: R.card,
            file: {
              url: me(),
              name: "carousel3.jpg",
              type: "image"
            },
            buttons: []
          },
          {
            title: "Photo 4",
            type: R.card,
            file: {
              url: me(),
              name: "carousel4.jpg",
              type: "image"
            },
            buttons: []
          },
          {
            title: "Photo 5",
            type: R.card,
            file: {
              url: me(),
              name: "carousel5.jpg",
              type: "image"
            },
            buttons: []
          },
          {
            title: "Photo 6",
            type: R.card,
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
    name: "Formated message",
    messages: [
      {
        type: R.message,
        author: H.user,
        text: "Give me a message formated in html",
        date: Date.now()
      },
      {
        type: R.message,
        author: H.bot,
        text: '<h1>Here is a formated message</h1><p><i>It use</i> <u>Html</u> <b>markup</b> to <span style="color:var(--tvk_colors_brand)">render!</span></p>',
        date: Date.now()
      }
    ]
  },
  {
    name: "Quick replies",
    messages: [
      {
        type: R.message,
        author: H.user,
        text: "Give some quick replies",
        date: Date.now()
      },
      {
        type: R.message,
        author: H.bot,
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
], Dn = (e) => (Ao("data-v-c7567ede"), e = e(), Eo(), e), ca = { class: "panel-body-wrapper d-flex flex-column" }, ua = { class: "panel-body-body flex-grow-1" }, da = /* @__PURE__ */ Dn(() => /* @__PURE__ */ w("div", { class: "option-category-header p-2 d-flex align-items-center border-top border-bottom" }, [
  /* @__PURE__ */ w("h6", { class: "m-0 ms-1" }, "Test")
], -1)), pa = ["onClick"], ha = /* @__PURE__ */ Dn(() => /* @__PURE__ */ w("i", { class: "bi bi-send-plus me-1" }, null, -1)), ga = /* @__PURE__ */ X({
  __name: "editor-test",
  setup(e) {
    te();
    function t(o) {
      const n = o.delay || 300;
      o.messages.forEach(
        (i, s, r) => {
          setTimeout(() => {
            no(i), s < r.length - 1 && no({
              type: R.loader,
              author: H.app,
              date: Date.now()
            });
          }, s * n);
        }
      );
    }
    return (o, n) => (f(), I("div", ca, [
      w("div", ua, [
        da,
        (f(!0), I(q, null, le(d(la), (i) => (f(), I("div", {
          class: "templates-list-entry cursor-pointer py-2 px-3",
          onClick: (s) => t(i)
        }, [
          ha,
          fe(" " + F(i.name), 1)
        ], 8, pa))), 256))
      ])
    ]));
  }
}), fa = /* @__PURE__ */ Tn(ga, [["__scopeId", "data-v-c7567ede"]]);
var Ge = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, Cn = { exports: {} };
(function(e, t) {
  (function(o, n) {
    n();
  })(Ge, function() {
    function o(c, u) {
      return typeof u > "u" ? u = { autoBom: !1 } : typeof u != "object" && (console.warn("Deprecated: Expected third argument to be a object"), u = { autoBom: !u }), u.autoBom && /^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(c.type) ? new Blob(["\uFEFF", c], { type: c.type }) : c;
    }
    function n(c, u, _) {
      var g = new XMLHttpRequest();
      g.open("GET", c), g.responseType = "blob", g.onload = function() {
        l(g.response, u, _);
      }, g.onerror = function() {
        console.error("could not download file");
      }, g.send();
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
    var r = typeof window == "object" && window.window === window ? window : typeof self == "object" && self.self === self ? self : typeof Ge == "object" && Ge.global === Ge ? Ge : void 0, a = r.navigator && /Macintosh/.test(navigator.userAgent) && /AppleWebKit/.test(navigator.userAgent) && !/Safari/.test(navigator.userAgent), l = r.saveAs || (typeof window != "object" || window !== r ? function() {
    } : "download" in HTMLAnchorElement.prototype && !a ? function(c, u, _) {
      var g = r.URL || r.webkitURL, m = document.createElement("a");
      u = u || c.name || "download", m.download = u, m.rel = "noopener", typeof c == "string" ? (m.href = c, m.origin === location.origin ? s(m) : i(m.href) ? n(c, u, _) : s(m, m.target = "_blank")) : (m.href = g.createObjectURL(c), setTimeout(function() {
        g.revokeObjectURL(m.href);
      }, 4e4), setTimeout(function() {
        s(m);
      }, 0));
    } : "msSaveOrOpenBlob" in navigator ? function(c, u, _) {
      if (u = u || c.name || "download", typeof c != "string") navigator.msSaveOrOpenBlob(o(c, _), u);
      else if (i(c)) n(c, u, _);
      else {
        var g = document.createElement("a");
        g.href = c, g.target = "_blank", setTimeout(function() {
          s(g);
        });
      }
    } : function(c, u, _, g) {
      if (g = g || open("", "_blank"), g && (g.document.title = g.document.body.innerText = "downloading..."), typeof c == "string") return n(c, u, _);
      var m = c.type === "application/octet-stream", k = /constructor/i.test(r.HTMLElement) || r.safari, L = /CriOS\/[\d]+/.test(navigator.userAgent);
      if ((L || m && k || a) && typeof FileReader < "u") {
        var D = new FileReader();
        D.onloadend = function() {
          var N = D.result;
          N = L ? N : N.replace(/^data:[^;]*;/, "data:attachment/file;"), g ? g.location.href = N : location = N, g = null;
        }, D.readAsDataURL(c);
      } else {
        var C = r.URL || r.webkitURL, O = C.createObjectURL(c);
        g ? g.location = O : location.href = O, g = null, setTimeout(function() {
          C.revokeObjectURL(O);
        }, 4e4);
      }
    });
    r.saveAs = l.saveAs = l, e.exports = l;
  });
})(Cn);
var ma = Cn.exports;
const _a = { class: "panel-body-wrapper d-flex flex-column" }, va = { class: "panel-body-header py-2 px-3 border-bottom text-small d-flex align-items-center" }, ya = { class: "form-check form-check-inline no-min-height" }, ba = ["value"], wa = /* @__PURE__ */ w("label", {
  class: "form-check-label",
  for: "outputFormatHtml"
}, "html", -1), Ma = { class: "form-check form-check-inline no-min-height" }, Ia = ["value"], ka = /* @__PURE__ */ w("label", {
  class: "form-check-label",
  for: "outputFormatJs"
}, "json", -1), ja = { class: "form-check form-switch no-min-height ms-auto" }, Na = /* @__PURE__ */ w("label", {
  class: "form-check-label",
  for: "outputMinify"
}, "Minify", -1), xa = { class: "panel-body-body tvke-secondary-bg flex-grow-1 text-small p-3" }, Sa = {
  key: 0,
  class: "text-center fst-italic pt-3"
}, La = {
  key: 1,
  class: "mb-2"
}, Ta = {
  key: 0,
  class: "mb-2"
}, Da = {
  key: 1,
  class: "mb-2"
}, Ca = { class: "output-block d-flex" }, Oa = { class: "pre-wrap mb-0 flex-grow-1" }, Aa = { class: "d-flex flex-column" }, Ea = /* @__PURE__ */ w("i", { class: "bi bi-copy" }, null, -1), za = [
  Ea
], Pa = /* @__PURE__ */ w("i", { class: "bi bi-file-earmark-arrow-down" }, null, -1), $a = [
  Pa
], Ya = { key: 2 }, Ga = {
  key: 0,
  class: "mb-2"
}, Ra = {
  key: 1,
  class: "mb-2"
}, Wa = { class: "output-block d-flex" }, Za = { class: "pre-wrap mb-0 flex-grow-1" }, Va = { class: "d-flex flex-column" }, Ba = /* @__PURE__ */ w("i", { class: "bi bi-copy" }, null, -1), Fa = [
  Ba
], Ua = /* @__PURE__ */ w("i", { class: "bi bi-file-earmark-arrow-down" }, null, -1), Ha = [
  Ua
], Qa = /* @__PURE__ */ X({
  __name: "editor-output",
  setup(e) {
    const t = te();
    t.$onAction(({ name: M, store: b, args: v, after: E }) => {
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
    function a(M, b) {
      return M === "js" ? L() : m();
    }
    function l(M) {
      return M === "js" ? k() : u();
    }
    function c() {
      let M = Xt();
      return M.sort((b, v) => b.key.localeCompare(v.key)), M = M.filter((b) => b.value.toString() !== b.initialValue.toString()), M;
    }
    function u() {
      const M = c(), b = {};
      return M.forEach((v) => {
        b[v.key] = v.value;
      }), b;
    }
    function _(M) {
      return t.outputFormat === B.json ? '"' + M + '"' : M;
    }
    function g() {
      return t.outputFormat === B.json ? "," : ";";
    }
    function m(M) {
      const b = t.outputMinified, v = "<", E = ">", j = [];
      let h = c();
      return h.length && (t.outputFormat === B.html && (j.push(v + "style" + E), j.push(":root {")), t.outputFormat === B.json && j.push("{"), h.forEach((y) => {
        j.push(
          _(y.key) + ": " + _(y.value.toString()) + g()
        );
      }), j.push("}"), t.outputFormat === B.html && j.push(v + "/style" + E), b && j.push(`
`)), j.join(b ? "" : `
`);
    }
    function k() {
      const M = pt(), b = ht();
      return D(M, b);
    }
    function L(M) {
      const b = t.outputMinified, v = "<", E = ">", j = [], h = pt(), y = ht(), p = D(h, y);
      if (t.outputFormat === B.html) {
        let x = "";
        p && Object.keys(p).length && (x = ","), j.push(v + "script" + E), j.push("TockVueKit.renderChat("), j.push('document.getElementById("<TARGET_ELEMENT_ID>"),'), j.push('"<TOCK_BOT_API_URL>"' + x);
      }
      if (p) {
        const x = b ? 0 : 2;
        Object.keys(p).length && j.push(JSON.stringify(p, null, x));
      }
      return t.outputFormat === B.html && (j.push(")"), j.push(v + "/script" + E)), j.join(b ? "" : `
`);
    }
    function D(M, b) {
      const v = C(M, b);
      if (v)
        return O(v), v;
    }
    function C(M, b, v = {}) {
      if (Co(M)) {
        const E = Object.entries(M);
        for (let j = 0; j < E.length; j++) {
          const [h, y] = E[j], p = C(y, b[h]);
          typeof p == "object" && p.type === "leaf" ? v[h] = p.value : typeof p < "u" && Object.keys(p).length && (v[h] = p);
        }
        return v;
      } else if (!b || M !== b.default)
        return { type: "leaf", value: M };
    }
    function O(M) {
      if (Co(M)) {
        const b = Object.entries(M);
        for (let v = 0; v < b.length; v++) {
          const [E, j] = b[v];
          O(j) || delete M[E];
        }
        return M;
      } else
        return typeof M < "u";
    }
    function N(M) {
      Sn(a(M));
    }
    function S(M) {
      const b = M === "css" ? "tvk-css.json" : "tvk-options.json", v = new Blob([JSON.stringify(l(M))], {
        type: "text/plain;charset=utf-8"
      });
      ma.saveAs(v, b);
    }
    return (M, b) => {
      const v = wt("tooltip");
      return f(), I("div", _a, [
        w("div", va, [
          w("div", null, [
            W((f(), I("div", ya, [
              W(w("input", {
                type: "radio",
                class: "form-check-input",
                name: "outputFormat",
                id: "outputFormatHtml",
                value: d(B).html,
                "onUpdate:modelValue": b[0] || (b[0] = (E) => d(t).outputFormat = E),
                onChange: b[1] || (b[1] = (E) => i(d(B).html))
              }, null, 40, ba), [
                [oo, d(t).outputFormat]
              ]),
              wa
            ])), [
              [v, "Format output for html inclusion"]
            ]),
            W((f(), I("div", Ma, [
              W(w("input", {
                type: "radio",
                class: "form-check-input",
                name: "outputFormat",
                id: "outputFormatJs",
                value: d(B).json,
                "onUpdate:modelValue": b[2] || (b[2] = (E) => d(t).outputFormat = E),
                onChange: b[3] || (b[3] = (E) => i(d(B).json))
              }, null, 40, Ia), [
                [oo, d(t).outputFormat]
              ]),
              ka
            ])), [
              [v, "Format output for js usage"]
            ])
          ]),
          W((f(), I("div", ja, [
            W(w("input", {
              class: "form-check-input",
              type: "checkbox",
              role: "switch",
              id: "outputMinify",
              "onUpdate:modelValue": b[4] || (b[4] = (E) => d(t).outputMinified = E),
              onChange: b[5] || (b[5] = (E) => s(E.target.checked))
            }, null, 544), [
              [Go, d(t).outputMinified]
            ]),
            Na
          ])), [
            [v, "Minify output code"]
          ])
        ]),
        w("div", xa, [
          !n.value && !o.value ? (f(), I("div", Sa, " All settings set to default ")) : z("", !0),
          n.value ? (f(), I("div", La, [
            d(t).outputFormat === d(B).html ? (f(), I("label", Ta, "Script:")) : z("", !0),
            d(t).outputFormat === d(B).json ? (f(), I("label", Da, "Options:")) : z("", !0),
            w("div", Ca, [
              w("pre", Oa, [
                w("code", null, F(n.value), 1)
              ]),
              w("div", Aa, [
                W((f(), I("button", {
                  type: "button",
                  class: "btn btn-link btn-sm pe-0 pt-0",
                  onClick: b[6] || (b[6] = (E) => N(
                    "js"
                    /* js */
                  ))
                }, za)), [
                  [v, "Copy js code"]
                ]),
                d(t).outputFormat === d(B).json ? W((f(), I("button", {
                  key: 0,
                  type: "button",
                  class: "btn btn-link btn-sm pe-0",
                  onClick: b[7] || (b[7] = (E) => S(
                    "js"
                    /* js */
                  ))
                }, $a)), [
                  [v, "Download js code"]
                ]) : z("", !0)
              ])
            ])
          ])) : z("", !0),
          o.value ? (f(), I("div", Ya, [
            d(t).outputFormat === d(B).html ? (f(), I("label", Ga, "Style:")) : z("", !0),
            d(t).outputFormat === d(B).json ? (f(), I("label", Ra, "Css variables:")) : z("", !0),
            w("div", Wa, [
              w("pre", Za, [
                w("code", null, F(o.value), 1)
              ]),
              w("div", Va, [
                W((f(), I("button", {
                  type: "button",
                  class: "btn btn-link btn-sm pe-0 pt-0",
                  onClick: b[8] || (b[8] = (E) => N(
                    "css"
                    /* css */
                  ))
                }, Fa)), [
                  [v, "Copy css code"]
                ]),
                d(t).outputFormat === d(B).json ? W((f(), I("button", {
                  key: 0,
                  type: "button",
                  class: "btn btn-link btn-sm pe-0",
                  onClick: b[9] || (b[9] = (E) => S(
                    "css"
                    /* css */
                  ))
                }, Ha)), [
                  [v, "Download css code"]
                ]) : z("", !0)
              ])
            ])
          ])) : z("", !0)
        ])
      ]);
    };
  }
}), Ja = { id: "tock-vue-kit-editor" }, Ka = { class: "panel-menu" }, qa = /* @__PURE__ */ w("i", { class: "bi bi-layout-text-sidebar-reverse" }, null, -1), Xa = [
  qa
], el = /* @__PURE__ */ w("i", { class: "bi bi-gear" }, null, -1), tl = [
  el
], ol = /* @__PURE__ */ w("i", { class: "bi bi-file-word" }, null, -1), nl = [
  ol
], il = /* @__PURE__ */ w("i", { class: "bi bi-filetype-css" }, null, -1), sl = [
  il
], rl = /* @__PURE__ */ w("i", { class: "bi bi-play-circle" }, null, -1), al = [
  rl
], ll = /* @__PURE__ */ w("i", { class: "bi bi-floppy" }, null, -1), cl = [
  ll
], ul = { class: "panel-body flex-grow-1 position-relative" }, hl = /* @__PURE__ */ X({
  __name: "editor",
  props: {
    height: { default: "100vh" }
  },
  setup(e) {
    $e(ys()), $o().appContext.app.use(Hi);
    const o = te();
    return Y("100vh"), qe(() => {
      o.refreshEditorPanels();
    }), (n, i) => {
      const s = wt("tooltip");
      return f(), I("div", Ja, [
        w("div", {
          class: "panel-wrapper d-flex",
          style: We({ height: n.height })
        }, [
          w("div", Ka, [
            W((f(), I("div", {
              class: Q(["panel-menu-entry", {
                active: d(o).editorPanel === d(V).templates
              }]),
              onClick: i[0] || (i[0] = (r) => d(o).setEditorPanel(d(V).templates))
            }, Xa, 2)), [
              [s, { content: "Templates", placement: "right" }]
            ]),
            W((f(), I("div", {
              class: Q(["panel-menu-entry", {
                active: d(o).editorPanel === d(V).preferences
              }]),
              onClick: i[1] || (i[1] = (r) => d(o).setEditorPanel(d(V).preferences))
            }, tl, 2)), [
              [s, { content: "Preferences", placement: "right" }]
            ]),
            W((f(), I("div", {
              class: Q(["panel-menu-entry", {
                active: d(o).editorPanel === d(V).wording
              }]),
              onClick: i[2] || (i[2] = (r) => d(o).setEditorPanel(d(V).wording))
            }, nl, 2)), [
              [s, { content: "Wording", placement: "right" }]
            ]),
            W((f(), I("div", {
              class: Q(["panel-menu-entry", {
                active: d(o).editorPanel === d(V).styling
              }]),
              onClick: i[3] || (i[3] = (r) => d(o).setEditorPanel(d(V).styling))
            }, sl, 2)), [
              [s, { content: "Styling", placement: "right" }]
            ]),
            W((f(), I("div", {
              class: Q(["panel-menu-entry", {
                active: d(o).editorPanel === d(V).test
              }]),
              onClick: i[4] || (i[4] = (r) => d(o).setEditorPanel(d(V).test))
            }, al, 2)), [
              [s, { content: "Test", placement: "right" }]
            ]),
            W((f(), I("div", {
              class: Q(["panel-menu-entry", {
                active: d(o).editorPanel === d(V).output
              }]),
              onClick: i[5] || (i[5] = (r) => d(o).setEditorPanel(d(V).output))
            }, cl, 2)), [
              [s, { content: "Output", placement: "right" }]
            ])
          ]),
          w("div", ul, [
            d(o).editorPanel === d(V).templates ? (f(), K(Ys, { key: 0 })) : z("", !0),
            d(o).editorPanel === d(V).styling ? (f(), K(dr, { key: 1 })) : z("", !0),
            d(o).editorPanel === d(V).preferences ? (f(), K(na, { key: 2 })) : z("", !0),
            d(o).editorPanel === d(V).wording ? (f(), K(aa, { key: 3 })) : z("", !0),
            d(o).editorPanel === d(V).test ? (f(), K(fa, { key: 4 })) : z("", !0),
            d(o).editorPanel === d(V).output ? (f(), K(Qa, { key: 5 })) : z("", !0)
          ])
        ], 4)
      ]);
    };
  }
});
export {
  hl as TvkEditor
};
