import { pushScopeId as Nn, popScopeId as xn, defineComponent as X, nextTick as Dt, openBlock as v, createBlock as J, createElementBlock as I, normalizeClass as Q, renderSlot as lt, normalizeProps as Sn, guardReactiveProps as Ln, withScopeId as Tn, resolveComponent as Oe, normalizeStyle as Ge, withKeys as Dn, createElementVNode as w, Fragment as K, createCommentVNode as z, mergeProps as To, withCtx as ct, createVNode as Rt, ref as Y, createApp as Cn, h as On, toDisplayString as V, effectScope as Do, markRaw as Ie, toRaw as vt, watch as Wt, unref as u, hasInjectionContext as An, inject as En, getCurrentInstance as Co, reactive as zn, isRef as je, isReactive as Zt, toRef as Nt, computed as Oo, getCurrentScope as Pn, onScopeDispose as $n, toRefs as qt, renderList as ue, onMounted as Je, onBeforeUnmount as Yn, resolveDirective as yt, withDirectives as W, createTextVNode as be, withModifiers as Gn, vModelCheckbox as Ao, vModelRadio as eo } from "vue";
import { reload as Rn, updateTvkOption as Se, getTvkCurrentOptions as ut, getTvkDefaultOptions as dt } from "tock-vue-kit";
const Wn = ["top", "right", "bottom", "left"], to = ["start", "end"], oo = /* @__PURE__ */ Wn.reduce((e, t) => e.concat(t, t + "-" + to[0], t + "-" + to[1]), []), ke = Math.min, we = Math.max, Zn = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
}, Vn = {
  start: "end",
  end: "start"
};
function Ct(e, t, o) {
  return we(e, ke(t, o));
}
function xe(e, t) {
  return typeof e == "function" ? e(t) : e;
}
function de(e) {
  return e.split("-")[0];
}
function ie(e) {
  return e.split("-")[1];
}
function Eo(e) {
  return e === "x" ? "y" : "x";
}
function Vt(e) {
  return e === "y" ? "height" : "width";
}
function Ke(e) {
  return ["top", "bottom"].includes(de(e)) ? "y" : "x";
}
function Bt(e) {
  return Eo(Ke(e));
}
function zo(e, t, o) {
  o === void 0 && (o = !1);
  const n = ie(e), i = Bt(e), s = Vt(i);
  let r = i === "x" ? n === (o ? "end" : "start") ? "right" : "left" : n === "start" ? "bottom" : "top";
  return t.reference[s] > t.floating[s] && (r = ht(r)), [r, ht(r)];
}
function Bn(e) {
  const t = ht(e);
  return [pt(e), t, pt(t)];
}
function pt(e) {
  return e.replace(/start|end/g, (t) => Vn[t]);
}
function Fn(e, t, o) {
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
function Un(e, t, o, n) {
  const i = ie(e);
  let s = Fn(de(e), o === "start", n);
  return i && (s = s.map((r) => r + "-" + i), t && (s = s.concat(s.map(pt)))), s;
}
function ht(e) {
  return e.replace(/left|right|bottom|top/g, (t) => Zn[t]);
}
function Hn(e) {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    ...e
  };
}
function Po(e) {
  return typeof e != "number" ? Hn(e) : {
    top: e,
    right: e,
    bottom: e,
    left: e
  };
}
function Re(e) {
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
function no(e, t, o) {
  let {
    reference: n,
    floating: i
  } = e;
  const s = Ke(t), r = Bt(t), a = Vt(r), l = de(t), c = s === "y", d = n.x + n.width / 2 - i.width / 2, m = n.y + n.height / 2 - i.height / 2, h = n[a] / 2 - i[a] / 2;
  let g;
  switch (l) {
    case "top":
      g = {
        x: d,
        y: n.y - i.height
      };
      break;
    case "bottom":
      g = {
        x: d,
        y: n.y + n.height
      };
      break;
    case "right":
      g = {
        x: n.x + n.width,
        y: m
      };
      break;
    case "left":
      g = {
        x: n.x - i.width,
        y: m
      };
      break;
    default:
      g = {
        x: n.x,
        y: n.y
      };
  }
  switch (ie(t)) {
    case "start":
      g[r] -= h * (o && c ? -1 : 1);
      break;
    case "end":
      g[r] += h * (o && c ? -1 : 1);
      break;
  }
  return g;
}
const Qn = async (e, t, o) => {
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
    x: d,
    y: m
  } = no(c, n, l), h = n, g = {}, S = 0;
  for (let L = 0; L < a.length; L++) {
    const {
      name: C,
      fn: O
    } = a[L], {
      x: M,
      y: j,
      data: E,
      reset: y
    } = await O({
      x: d,
      y: m,
      initialPlacement: n,
      placement: h,
      strategy: i,
      middlewareData: g,
      rects: c,
      platform: r,
      elements: {
        reference: e,
        floating: t
      }
    });
    d = M ?? d, m = j ?? m, g = {
      ...g,
      [C]: {
        ...g[C],
        ...E
      }
    }, y && S <= 50 && (S++, typeof y == "object" && (y.placement && (h = y.placement), y.rects && (c = y.rects === !0 ? await r.getElementRects({
      reference: e,
      floating: t,
      strategy: i
    }) : y.rects), {
      x: d,
      y: m
    } = no(c, h, l)), L = -1);
  }
  return {
    x: d,
    y: m,
    placement: h,
    strategy: i,
    middlewareData: g
  };
};
async function bt(e, t) {
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
    rootBoundary: d = "viewport",
    elementContext: m = "floating",
    altBoundary: h = !1,
    padding: g = 0
  } = xe(t, e), S = Po(g), C = a[h ? m === "floating" ? "reference" : "floating" : m], O = Re(await s.getClippingRect({
    element: (o = await (s.isElement == null ? void 0 : s.isElement(C))) == null || o ? C : C.contextElement || await (s.getDocumentElement == null ? void 0 : s.getDocumentElement(a.floating)),
    boundary: c,
    rootBoundary: d,
    strategy: l
  })), M = m === "floating" ? {
    x: n,
    y: i,
    width: r.floating.width,
    height: r.floating.height
  } : r.reference, j = await (s.getOffsetParent == null ? void 0 : s.getOffsetParent(a.floating)), E = await (s.isElement == null ? void 0 : s.isElement(j)) ? await (s.getScale == null ? void 0 : s.getScale(j)) || {
    x: 1,
    y: 1
  } : {
    x: 1,
    y: 1
  }, y = Re(s.convertOffsetParentRelativeRectToViewportRelativeRect ? await s.convertOffsetParentRelativeRectToViewportRelativeRect({
    elements: a,
    rect: M,
    offsetParent: j,
    strategy: l
  }) : M);
  return {
    top: (O.top - y.top + S.top) / E.y,
    bottom: (y.bottom - O.bottom + S.bottom) / E.y,
    left: (O.left - y.left + S.left) / E.x,
    right: (y.right - O.right + S.right) / E.x
  };
}
const Jn = (e) => ({
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
      padding: d = 0
    } = xe(e, t) || {};
    if (c == null)
      return {};
    const m = Po(d), h = {
      x: o,
      y: n
    }, g = Bt(i), S = Vt(g), L = await r.getDimensions(c), C = g === "y", O = C ? "top" : "left", M = C ? "bottom" : "right", j = C ? "clientHeight" : "clientWidth", E = s.reference[S] + s.reference[g] - h[g] - s.floating[S], y = h[g] - s.reference[g], k = await (r.getOffsetParent == null ? void 0 : r.getOffsetParent(c));
    let f = k ? k[j] : 0;
    (!f || !await (r.isElement == null ? void 0 : r.isElement(k))) && (f = a.floating[j] || s.floating[S]);
    const N = E / 2 - y / 2, x = f / 2 - L[S] / 2 - 1, _ = ke(m[O], x), b = ke(m[M], x), p = _, T = f - L[S] - b, A = f / 2 - L[S] / 2 + N, D = Ct(p, A, T), G = !l.arrow && ie(i) != null && A !== D && s.reference[S] / 2 - (A < p ? _ : b) - L[S] / 2 < 0, P = G ? A < p ? A - p : A - T : 0;
    return {
      [g]: h[g] + P,
      data: {
        [g]: D,
        centerOffset: A - D - P,
        ...G && {
          alignmentOffset: P
        }
      },
      reset: G
    };
  }
});
function Kn(e, t, o) {
  return (e ? [...o.filter((i) => ie(i) === e), ...o.filter((i) => ie(i) !== e)] : o.filter((i) => de(i) === i)).filter((i) => e ? ie(i) === e || (t ? pt(i) !== i : !1) : !0);
}
const Xn = function(e) {
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
        crossAxis: d = !1,
        alignment: m,
        allowedPlacements: h = oo,
        autoAlignment: g = !0,
        ...S
      } = xe(e, t), L = m !== void 0 || h === oo ? Kn(m || null, g, h) : h, C = await bt(t, S), O = ((o = r.autoPlacement) == null ? void 0 : o.index) || 0, M = L[O];
      if (M == null)
        return {};
      const j = zo(M, s, await (l.isRTL == null ? void 0 : l.isRTL(c.floating)));
      if (a !== M)
        return {
          reset: {
            placement: L[0]
          }
        };
      const E = [C[de(M)], C[j[0]], C[j[1]]], y = [...((n = r.autoPlacement) == null ? void 0 : n.overflows) || [], {
        placement: M,
        overflows: E
      }], k = L[O + 1];
      if (k)
        return {
          data: {
            index: O + 1,
            overflows: y
          },
          reset: {
            placement: k
          }
        };
      const f = y.map((_) => {
        const b = ie(_.placement);
        return [_.placement, b && d ? (
          // Check along the mainAxis and main crossAxis side.
          _.overflows.slice(0, 2).reduce((p, T) => p + T, 0)
        ) : (
          // Check only the mainAxis.
          _.overflows[0]
        ), _.overflows];
      }).sort((_, b) => _[1] - b[1]), x = ((i = f.filter((_) => _[2].slice(
        0,
        // Aligned placements should not check their opposite crossAxis
        // side.
        ie(_[0]) ? 2 : 3
      ).every((b) => b <= 0))[0]) == null ? void 0 : i[0]) || f[0][0];
      return x !== a ? {
        data: {
          index: O + 1,
          overflows: y
        },
        reset: {
          placement: x
        }
      } : {};
    }
  };
}, qn = function(e) {
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
        mainAxis: d = !0,
        crossAxis: m = !0,
        fallbackPlacements: h,
        fallbackStrategy: g = "bestFit",
        fallbackAxisSideDirection: S = "none",
        flipAlignment: L = !0,
        ...C
      } = xe(e, t);
      if ((o = s.arrow) != null && o.alignmentOffset)
        return {};
      const O = de(i), M = de(a) === a, j = await (l.isRTL == null ? void 0 : l.isRTL(c.floating)), E = h || (M || !L ? [ht(a)] : Bn(a));
      !h && S !== "none" && E.push(...Un(a, L, S, j));
      const y = [a, ...E], k = await bt(t, C), f = [];
      let N = ((n = s.flip) == null ? void 0 : n.overflows) || [];
      if (d && f.push(k[O]), m) {
        const p = zo(i, r, j);
        f.push(k[p[0]], k[p[1]]);
      }
      if (N = [...N, {
        placement: i,
        overflows: f
      }], !f.every((p) => p <= 0)) {
        var x, _;
        const p = (((x = s.flip) == null ? void 0 : x.index) || 0) + 1, T = y[p];
        if (T)
          return {
            data: {
              index: p,
              overflows: N
            },
            reset: {
              placement: T
            }
          };
        let A = (_ = N.filter((D) => D.overflows[0] <= 0).sort((D, G) => D.overflows[1] - G.overflows[1])[0]) == null ? void 0 : _.placement;
        if (!A)
          switch (g) {
            case "bestFit": {
              var b;
              const D = (b = N.map((G) => [G.placement, G.overflows.filter((P) => P > 0).reduce((P, R) => P + R, 0)]).sort((G, P) => G[1] - P[1])[0]) == null ? void 0 : b[0];
              D && (A = D);
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
async function ei(e, t) {
  const {
    placement: o,
    platform: n,
    elements: i
  } = e, s = await (n.isRTL == null ? void 0 : n.isRTL(i.floating)), r = de(o), a = ie(o), l = Ke(o) === "y", c = ["left", "top"].includes(r) ? -1 : 1, d = s && l ? -1 : 1, m = xe(t, e);
  let {
    mainAxis: h,
    crossAxis: g,
    alignmentAxis: S
  } = typeof m == "number" ? {
    mainAxis: m,
    crossAxis: 0,
    alignmentAxis: null
  } : {
    mainAxis: 0,
    crossAxis: 0,
    alignmentAxis: null,
    ...m
  };
  return a && typeof S == "number" && (g = a === "end" ? S * -1 : S), l ? {
    x: g * d,
    y: h * c
  } : {
    x: h * c,
    y: g * d
  };
}
const ti = function(e) {
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
      } = t, l = await ei(t, e);
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
}, oi = function(e) {
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
          fn: (C) => {
            let {
              x: O,
              y: M
            } = C;
            return {
              x: O,
              y: M
            };
          }
        },
        ...l
      } = xe(e, t), c = {
        x: o,
        y: n
      }, d = await bt(t, l), m = Ke(de(i)), h = Eo(m);
      let g = c[h], S = c[m];
      if (s) {
        const C = h === "y" ? "top" : "left", O = h === "y" ? "bottom" : "right", M = g + d[C], j = g - d[O];
        g = Ct(M, g, j);
      }
      if (r) {
        const C = m === "y" ? "top" : "left", O = m === "y" ? "bottom" : "right", M = S + d[C], j = S - d[O];
        S = Ct(M, S, j);
      }
      const L = a.fn({
        ...t,
        [h]: g,
        [m]: S
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
}, ni = function(e) {
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
      } = xe(e, t), l = await bt(t, a), c = de(o), d = ie(o), m = Ke(o) === "y", {
        width: h,
        height: g
      } = n.floating;
      let S, L;
      c === "top" || c === "bottom" ? (S = c, L = d === (await (i.isRTL == null ? void 0 : i.isRTL(s.floating)) ? "start" : "end") ? "left" : "right") : (L = c, S = d === "end" ? "top" : "bottom");
      const C = g - l.top - l.bottom, O = h - l.left - l.right, M = ke(g - l[S], C), j = ke(h - l[L], O), E = !t.middlewareData.shift;
      let y = M, k = j;
      if (m ? k = d || E ? ke(j, O) : O : y = d || E ? ke(M, C) : C, E && !d) {
        const N = we(l.left, 0), x = we(l.right, 0), _ = we(l.top, 0), b = we(l.bottom, 0);
        m ? k = h - 2 * (N !== 0 || x !== 0 ? N + x : we(l.left, l.right)) : y = g - 2 * (_ !== 0 || b !== 0 ? _ + b : we(l.top, l.bottom));
      }
      await r({
        ...t,
        availableWidth: k,
        availableHeight: y
      });
      const f = await i.getDimensions(s.floating);
      return h !== f.width || g !== f.height ? {
        reset: {
          rects: !0
        }
      } : {};
    }
  };
};
function te(e) {
  var t;
  return ((t = e.ownerDocument) == null ? void 0 : t.defaultView) || window;
}
function ae(e) {
  return te(e).getComputedStyle(e);
}
const io = Math.min, We = Math.max, gt = Math.round;
function $o(e) {
  const t = ae(e);
  let o = parseFloat(t.width), n = parseFloat(t.height);
  const i = e.offsetWidth, s = e.offsetHeight, r = gt(o) !== i || gt(n) !== s;
  return r && (o = i, n = s), { width: o, height: n, fallback: r };
}
function ve(e) {
  return Go(e) ? (e.nodeName || "").toLowerCase() : "";
}
let qe;
function Yo() {
  if (qe)
    return qe;
  const e = navigator.userAgentData;
  return e && Array.isArray(e.brands) ? (qe = e.brands.map((t) => t.brand + "/" + t.version).join(" "), qe) : navigator.userAgent;
}
function le(e) {
  return e instanceof te(e).HTMLElement;
}
function me(e) {
  return e instanceof te(e).Element;
}
function Go(e) {
  return e instanceof te(e).Node;
}
function so(e) {
  return typeof ShadowRoot > "u" ? !1 : e instanceof te(e).ShadowRoot || e instanceof ShadowRoot;
}
function wt(e) {
  const { overflow: t, overflowX: o, overflowY: n, display: i } = ae(e);
  return /auto|scroll|overlay|hidden|clip/.test(t + n + o) && !["inline", "contents"].includes(i);
}
function ii(e) {
  return ["table", "td", "th"].includes(ve(e));
}
function Ot(e) {
  const t = /firefox/i.test(Yo()), o = ae(e), n = o.backdropFilter || o.WebkitBackdropFilter;
  return o.transform !== "none" || o.perspective !== "none" || !!n && n !== "none" || t && o.willChange === "filter" || t && !!o.filter && o.filter !== "none" || ["transform", "perspective"].some((i) => o.willChange.includes(i)) || ["paint", "layout", "strict", "content"].some((i) => {
    const s = o.contain;
    return s != null && s.includes(i);
  });
}
function Ro() {
  return !/^((?!chrome|android).)*safari/i.test(Yo());
}
function Ft(e) {
  return ["html", "body", "#document"].includes(ve(e));
}
function Wo(e) {
  return me(e) ? e : e.contextElement;
}
const Zo = { x: 1, y: 1 };
function Ce(e) {
  const t = Wo(e);
  if (!le(t))
    return Zo;
  const o = t.getBoundingClientRect(), { width: n, height: i, fallback: s } = $o(t);
  let r = (s ? gt(o.width) : o.width) / n, a = (s ? gt(o.height) : o.height) / i;
  return r && Number.isFinite(r) || (r = 1), a && Number.isFinite(a) || (a = 1), { x: r, y: a };
}
function Fe(e, t, o, n) {
  var i, s;
  t === void 0 && (t = !1), o === void 0 && (o = !1);
  const r = e.getBoundingClientRect(), a = Wo(e);
  let l = Zo;
  t && (n ? me(n) && (l = Ce(n)) : l = Ce(e));
  const c = a ? te(a) : window, d = !Ro() && o;
  let m = (r.left + (d && ((i = c.visualViewport) == null ? void 0 : i.offsetLeft) || 0)) / l.x, h = (r.top + (d && ((s = c.visualViewport) == null ? void 0 : s.offsetTop) || 0)) / l.y, g = r.width / l.x, S = r.height / l.y;
  if (a) {
    const L = te(a), C = n && me(n) ? te(n) : n;
    let O = L.frameElement;
    for (; O && n && C !== L; ) {
      const M = Ce(O), j = O.getBoundingClientRect(), E = getComputedStyle(O);
      j.x += (O.clientLeft + parseFloat(E.paddingLeft)) * M.x, j.y += (O.clientTop + parseFloat(E.paddingTop)) * M.y, m *= M.x, h *= M.y, g *= M.x, S *= M.y, m += j.x, h += j.y, O = te(O).frameElement;
    }
  }
  return { width: g, height: S, top: h, right: m + g, bottom: h + S, left: m, x: m, y: h };
}
function _e(e) {
  return ((Go(e) ? e.ownerDocument : e.document) || window.document).documentElement;
}
function Mt(e) {
  return me(e) ? { scrollLeft: e.scrollLeft, scrollTop: e.scrollTop } : { scrollLeft: e.pageXOffset, scrollTop: e.pageYOffset };
}
function Vo(e) {
  return Fe(_e(e)).left + Mt(e).scrollLeft;
}
function Ue(e) {
  if (ve(e) === "html")
    return e;
  const t = e.assignedSlot || e.parentNode || so(e) && e.host || _e(e);
  return so(t) ? t.host : t;
}
function Bo(e) {
  const t = Ue(e);
  return Ft(t) ? t.ownerDocument.body : le(t) && wt(t) ? t : Bo(t);
}
function ft(e, t) {
  var o;
  t === void 0 && (t = []);
  const n = Bo(e), i = n === ((o = e.ownerDocument) == null ? void 0 : o.body), s = te(n);
  return i ? t.concat(s, s.visualViewport || [], wt(n) ? n : []) : t.concat(n, ft(n));
}
function ro(e, t, o) {
  return t === "viewport" ? Re(function(n, i) {
    const s = te(n), r = _e(n), a = s.visualViewport;
    let l = r.clientWidth, c = r.clientHeight, d = 0, m = 0;
    if (a) {
      l = a.width, c = a.height;
      const h = Ro();
      (h || !h && i === "fixed") && (d = a.offsetLeft, m = a.offsetTop);
    }
    return { width: l, height: c, x: d, y: m };
  }(e, o)) : me(t) ? Re(function(n, i) {
    const s = Fe(n, !0, i === "fixed"), r = s.top + n.clientTop, a = s.left + n.clientLeft, l = le(n) ? Ce(n) : { x: 1, y: 1 };
    return { width: n.clientWidth * l.x, height: n.clientHeight * l.y, x: a * l.x, y: r * l.y };
  }(t, o)) : Re(function(n) {
    const i = _e(n), s = Mt(n), r = n.ownerDocument.body, a = We(i.scrollWidth, i.clientWidth, r.scrollWidth, r.clientWidth), l = We(i.scrollHeight, i.clientHeight, r.scrollHeight, r.clientHeight);
    let c = -s.scrollLeft + Vo(n);
    const d = -s.scrollTop;
    return ae(r).direction === "rtl" && (c += We(i.clientWidth, r.clientWidth) - a), { width: a, height: l, x: c, y: d };
  }(_e(e)));
}
function ao(e) {
  return le(e) && ae(e).position !== "fixed" ? e.offsetParent : null;
}
function lo(e) {
  const t = te(e);
  let o = ao(e);
  for (; o && ii(o) && ae(o).position === "static"; )
    o = ao(o);
  return o && (ve(o) === "html" || ve(o) === "body" && ae(o).position === "static" && !Ot(o)) ? t : o || function(n) {
    let i = Ue(n);
    for (; le(i) && !Ft(i); ) {
      if (Ot(i))
        return i;
      i = Ue(i);
    }
    return null;
  }(e) || t;
}
function si(e, t, o) {
  const n = le(t), i = _e(t), s = Fe(e, !0, o === "fixed", t);
  let r = { scrollLeft: 0, scrollTop: 0 };
  const a = { x: 0, y: 0 };
  if (n || !n && o !== "fixed")
    if ((ve(t) !== "body" || wt(i)) && (r = Mt(t)), le(t)) {
      const l = Fe(t, !0);
      a.x = l.x + t.clientLeft, a.y = l.y + t.clientTop;
    } else
      i && (a.x = Vo(i));
  return { x: s.left + r.scrollLeft - a.x, y: s.top + r.scrollTop - a.y, width: s.width, height: s.height };
}
const ri = { getClippingRect: function(e) {
  let { element: t, boundary: o, rootBoundary: n, strategy: i } = e;
  const s = o === "clippingAncestors" ? function(c, d) {
    const m = d.get(c);
    if (m)
      return m;
    let h = ft(c).filter((C) => me(C) && ve(C) !== "body"), g = null;
    const S = ae(c).position === "fixed";
    let L = S ? Ue(c) : c;
    for (; me(L) && !Ft(L); ) {
      const C = ae(L), O = Ot(L);
      (S ? O || g : O || C.position !== "static" || !g || !["absolute", "fixed"].includes(g.position)) ? g = C : h = h.filter((M) => M !== L), L = Ue(L);
    }
    return d.set(c, h), h;
  }(t, this._c) : [].concat(o), r = [...s, n], a = r[0], l = r.reduce((c, d) => {
    const m = ro(t, d, i);
    return c.top = We(m.top, c.top), c.right = io(m.right, c.right), c.bottom = io(m.bottom, c.bottom), c.left = We(m.left, c.left), c;
  }, ro(t, a, i));
  return { width: l.right - l.left, height: l.bottom - l.top, x: l.left, y: l.top };
}, convertOffsetParentRelativeRectToViewportRelativeRect: function(e) {
  let { rect: t, offsetParent: o, strategy: n } = e;
  const i = le(o), s = _e(o);
  if (o === s)
    return t;
  let r = { scrollLeft: 0, scrollTop: 0 }, a = { x: 1, y: 1 };
  const l = { x: 0, y: 0 };
  if ((i || !i && n !== "fixed") && ((ve(o) !== "body" || wt(s)) && (r = Mt(o)), le(o))) {
    const c = Fe(o);
    a = Ce(o), l.x = c.x + o.clientLeft, l.y = c.y + o.clientTop;
  }
  return { width: t.width * a.x, height: t.height * a.y, x: t.x * a.x - r.scrollLeft * a.x + l.x, y: t.y * a.y - r.scrollTop * a.y + l.y };
}, isElement: me, getDimensions: function(e) {
  return le(e) ? $o(e) : e.getBoundingClientRect();
}, getOffsetParent: lo, getDocumentElement: _e, getScale: Ce, async getElementRects(e) {
  let { reference: t, floating: o, strategy: n } = e;
  const i = this.getOffsetParent || lo, s = this.getDimensions;
  return { reference: si(t, await i(o), n), floating: { x: 0, y: 0, ...await s(o) } };
}, getClientRects: (e) => Array.from(e.getClientRects()), isRTL: (e) => ae(e).direction === "rtl" }, ai = (e, t, o) => {
  const n = /* @__PURE__ */ new Map(), i = { platform: ri, ...o }, s = { ...i.platform, _c: n };
  return Qn(e, t, { ...i, platform: s });
};
function Fo(e, t) {
  for (const o in t)
    Object.prototype.hasOwnProperty.call(t, o) && (typeof t[o] == "object" && e[o] ? Fo(e[o], t[o]) : e[o] = t[o]);
}
const se = {
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
function He(e, t) {
  let o = se.themes[e] || {}, n;
  do
    n = o[t], typeof n > "u" ? o.$extend ? o = se.themes[o.$extend] || {} : (o = null, n = se[t]) : o = null;
  while (o);
  return n;
}
function li(e) {
  const t = [e];
  let o = se.themes[e] || {};
  do
    o.$extend && !o.$resetCss ? (t.push(o.$extend), o = se.themes[o.$extend] || {}) : o = null;
  while (o);
  return t.map((n) => `v-popper--theme-${n}`);
}
function co(e) {
  const t = [e];
  let o = se.themes[e] || {};
  do
    o.$extend ? (t.push(o.$extend), o = se.themes[o.$extend] || {}) : o = null;
  while (o);
  return t;
}
let Ae = !1;
if (typeof window < "u") {
  Ae = !1;
  try {
    const e = Object.defineProperty({}, "passive", {
      get() {
        Ae = !0;
      }
    });
    window.addEventListener("test", null, e);
  } catch {
  }
}
let Uo = !1;
typeof window < "u" && typeof navigator < "u" && (Uo = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream);
const Ho = ["auto", "top", "bottom", "left", "right"].reduce((e, t) => e.concat([
  t,
  `${t}-start`,
  `${t}-end`
]), []), uo = {
  hover: "mouseenter",
  focus: "focus",
  click: "click",
  touch: "touchstart",
  pointer: "pointerdown"
}, po = {
  hover: "mouseleave",
  focus: "blur",
  click: "click",
  touch: "touchend",
  pointer: "pointerup"
};
function ho(e, t) {
  const o = e.indexOf(t);
  o !== -1 && e.splice(o, 1);
}
function xt() {
  return new Promise((e) => requestAnimationFrame(() => {
    requestAnimationFrame(e);
  }));
}
const ne = [];
let ye = null;
const go = {};
function fo(e) {
  let t = go[e];
  return t || (t = go[e] = []), t;
}
let At = function() {
};
typeof window < "u" && (At = window.Element);
function $(e) {
  return function(t) {
    return He(t.theme, e);
  };
}
const St = "__floating-vue__popper", Qo = () => X({
  name: "VPopper",
  provide() {
    return {
      [St]: {
        parentPopper: this
      }
    };
  },
  inject: {
    [St]: { default: null }
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
      validator: (e) => Ho.includes(e)
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
      type: [String, Object, At, Boolean],
      default: $("container")
    },
    boundary: {
      type: [String, At],
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
      return (e = this[St]) == null ? void 0 : e.parentPopper;
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
      (this.distance || this.skidding) && e.middleware.push(ti({
        mainAxis: this.distance,
        crossAxis: this.skidding
      }));
      const t = this.placement.startsWith("auto");
      if (t ? e.middleware.push(Xn({
        alignment: this.placement.split("-")[1] ?? ""
      })) : e.placement = this.placement, this.preventOverflow && (this.shift && e.middleware.push(oi({
        padding: this.overflowPadding,
        boundary: this.boundary,
        crossAxis: this.shiftCrossAxis
      })), !t && this.flip && e.middleware.push(qn({
        padding: this.overflowPadding,
        boundary: this.boundary
      }))), e.middleware.push(Jn({
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
      (this.autoMaxSize || this.autoBoundaryMaxSize) && (this.$_innerNode.style.maxWidth = null, this.$_innerNode.style.maxHeight = null, e.middleware.push(ni({
        boundary: this.boundary,
        padding: this.overflowPadding,
        apply: ({ availableWidth: n, availableHeight: i }) => {
          this.$_innerNode.style.maxWidth = n != null ? `${n}px` : null, this.$_innerNode.style.maxHeight = i != null ? `${i}px` : null;
        }
      })));
      const o = await ai(this.$_referenceNode, this.$_popperNode, e);
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
      if (this.$_updateParentShownChildren(!0), this.$_hideInProgress = !1, clearTimeout(this.$_scheduleTimer), ye && this.instantMove && ye.instantMove && ye !== this.parentPopper) {
        ye.$_applyHide(!0), this.$_applyShow(!0);
        return;
      }
      t ? this.$_applyShow() : this.$_scheduleTimer = setTimeout(this.$_applyShow.bind(this), this.$_computeDelay("show"));
    },
    $_scheduleHide(e, t = !1) {
      if (this.shownChildren.size > 0) {
        this.pendingHide = !0;
        return;
      }
      this.$_updateParentShownChildren(!1), this.$_hideInProgress = !0, clearTimeout(this.$_scheduleTimer), this.isShown && (ye = this), t ? this.$_applyHide() : this.$_scheduleTimer = setTimeout(this.$_applyHide.bind(this), this.$_computeDelay("hide"));
    },
    $_computeDelay(e) {
      const t = this.delay;
      return parseInt(t && t[e] || t || 0);
    },
    async $_applyShow(e = !1) {
      clearTimeout(this.$_disposeTimer), clearTimeout(this.$_scheduleTimer), this.skipTransition = e, !this.isShown && (this.$_ensureTeleport(), await xt(), await this.$_computePosition(), await this.$_applyShowEffect(), this.positioningDisabled || this.$_registerEventListeners([
        ...ft(this.$_referenceNode),
        ...ft(this.$_popperNode)
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
        for (let o = 0; o < ne.length; o++)
          t = ne[o], t.showGroup !== e && (t.hide(), t.$emit("close-group"));
      }
      ne.push(this), document.body.classList.add("v-popper--some-open");
      for (const t of co(this.theme))
        fo(t).push(this), document.body.classList.add(`v-popper--some-open--${t}`);
      this.$emit("apply-show"), this.classes.showFrom = !0, this.classes.showTo = !1, this.classes.hideFrom = !1, this.classes.hideTo = !1, await xt(), this.classes.showFrom = !1, this.classes.showTo = !0, this.noAutoFocus || this.$_popperNode.focus();
    },
    async $_applyHide(e = !1) {
      if (this.shownChildren.size > 0) {
        this.pendingHide = !0, this.$_hideInProgress = !1;
        return;
      }
      if (clearTimeout(this.$_scheduleTimer), !this.isShown)
        return;
      this.skipTransition = e, ho(ne, this), ne.length === 0 && document.body.classList.remove("v-popper--some-open");
      for (const o of co(this.theme)) {
        const n = fo(o);
        ho(n, this), n.length === 0 && document.body.classList.remove(`v-popper--some-open--${o}`);
      }
      ye === this && (ye = null), this.isShown = !1, this.$_applyAttrsToTarget({
        "aria-describedby": void 0,
        "data-popper-shown": void 0
      }), clearTimeout(this.$_disposeTimer);
      const t = this.disposeTimeout;
      t !== null && (this.$_disposeTimer = setTimeout(() => {
        this.$_popperNode && (this.$_detachPopperNode(), this.isMounted = !1);
      }, t)), this.$_removeEventListeners("scroll"), this.$emit("apply-hide"), this.classes.showFrom = !1, this.classes.showTo = !1, this.classes.hideFrom = !0, this.classes.hideTo = !1, await xt(), this.classes.hideFrom = !1, this.classes.hideTo = !0;
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
      this.$_registerTriggerListeners(this.$_targetNodes, uo, this.triggers, this.showTriggers, e), this.$_registerTriggerListeners([this.$_popperNode], uo, this.popperTriggers, this.popperShowTriggers, e);
      const t = (o) => {
        o.usedByTooltip || this.hide({ event: o });
      };
      this.$_registerTriggerListeners(this.$_targetNodes, po, this.triggers, this.hideTriggers, t), this.$_registerTriggerListeners([this.$_popperNode], po, this.popperTriggers, this.popperHideTriggers, t);
    },
    $_registerEventListeners(e, t, o) {
      this.$_events.push({ targetNodes: e, eventType: t, handler: o }), e.forEach((n) => n.addEventListener(t, o, Ae ? {
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
      if (Ze >= e.left && Ze <= e.right && Ve >= e.top && Ve <= e.bottom) {
        const t = this.$_popperNode.getBoundingClientRect(), o = Ze - he, n = Ve - ge, i = t.left + t.width / 2 - he + (t.top + t.height / 2) - ge + t.width + t.height, s = he + o * i, r = ge + n * i;
        return et(he, ge, s, r, t.left, t.top, t.left, t.bottom) || // Left edge
        et(he, ge, s, r, t.left, t.top, t.right, t.top) || // Top edge
        et(he, ge, s, r, t.right, t.top, t.right, t.bottom) || // Right edge
        et(he, ge, s, r, t.left, t.bottom, t.right, t.bottom);
      }
      return !1;
    }
  },
  render() {
    return this.$slots.default(this.slotData);
  }
});
if (typeof document < "u" && typeof window < "u") {
  if (Uo) {
    const e = Ae ? {
      passive: !0,
      capture: !0
    } : !0;
    document.addEventListener("touchstart", (t) => mo(t, !0), e), document.addEventListener("touchend", (t) => _o(t, !0), e);
  } else
    window.addEventListener("mousedown", (e) => mo(e, !1), !0), window.addEventListener("click", (e) => _o(e, !1), !0);
  window.addEventListener("resize", ui);
}
function mo(e, t) {
  if (se.autoHideOnMousedown)
    Jo(e, t);
  else
    for (let o = 0; o < ne.length; o++) {
      const n = ne[o];
      try {
        n.mouseDownContains = n.popperNode().contains(e.target);
      } catch {
      }
    }
}
function _o(e, t) {
  se.autoHideOnMousedown || Jo(e, t);
}
function Jo(e, t) {
  const o = {};
  for (let n = ne.length - 1; n >= 0; n--) {
    const i = ne[n];
    try {
      const s = i.containsGlobalTarget = i.mouseDownContains || i.popperNode().contains(e.target);
      i.pendingHide = !1, requestAnimationFrame(() => {
        if (i.pendingHide = !1, !o[i.randomId] && vo(i, s, e)) {
          if (i.$_handleGlobalClose(e, t), !e.closeAllPopover && e.closePopover && s) {
            let a = i.parentPopper;
            for (; a; )
              o[a.randomId] = !0, a = a.parentPopper;
            return;
          }
          let r = i.parentPopper;
          for (; r && vo(r, r.containsGlobalTarget, e); )
            r.$_handleGlobalClose(e, t), r = r.parentPopper;
        }
      });
    } catch {
    }
  }
}
function vo(e, t, o) {
  return o.closeAllPopover || o.closePopover && t || ci(e, o) && !t;
}
function ci(e, t) {
  if (typeof e.autoHide == "function") {
    const o = e.autoHide(t);
    return e.lastAutoHide = o, o;
  }
  return e.autoHide;
}
function ui() {
  for (let e = 0; e < ne.length; e++)
    ne[e].$_computePosition();
}
let he = 0, ge = 0, Ze = 0, Ve = 0;
typeof window < "u" && window.addEventListener("mousemove", (e) => {
  he = Ze, ge = Ve, Ze = e.clientX, Ve = e.clientY;
}, Ae ? {
  passive: !0
} : void 0);
function et(e, t, o, n, i, s, r, a) {
  const l = ((r - i) * (t - s) - (a - s) * (e - i)) / ((a - s) * (o - e) - (r - i) * (n - t)), c = ((o - e) * (t - s) - (n - t) * (e - i)) / ((a - s) * (o - e) - (r - i) * (n - t));
  return l >= 0 && l <= 1 && c >= 0 && c <= 1;
}
const di = {
  extends: Qo()
}, It = (e, t) => {
  const o = e.__vccOpts || e;
  for (const [n, i] of t)
    o[n] = i;
  return o;
};
function pi(e, t, o, n, i, s) {
  return v(), I("div", {
    ref: "reference",
    class: Q(["v-popper", {
      "v-popper--shown": e.slotData.isShown
    }])
  }, [
    lt(e.$slots, "default", Sn(Ln(e.slotData)))
  ], 2);
}
const hi = /* @__PURE__ */ It(di, [["render", pi]]);
function gi() {
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
let it;
function Et() {
  Et.init || (Et.init = !0, it = gi() !== -1);
}
var kt = {
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
    Et(), Dt(() => {
      this._w = this.$el.offsetWidth, this._h = this.$el.offsetHeight, this.emitOnMount && this.emitSize();
    });
    const e = document.createElement("object");
    this._resizeObject = e, e.setAttribute("aria-hidden", "true"), e.setAttribute("tabindex", -1), e.onload = this.addResizeHandlers, e.type = "text/html", it && this.$el.appendChild(e), e.data = "about:blank", it || this.$el.appendChild(e);
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
      this._resizeObject && this._resizeObject.onload && (!it && this._resizeObject.contentDocument && this._resizeObject.contentDocument.defaultView.removeEventListener("resize", this.compareAndNotify), this.$el.removeChild(this._resizeObject), this._resizeObject.onload = null, this._resizeObject = null);
    }
  }
};
const fi = /* @__PURE__ */ Tn("data-v-b329ee4c");
Nn("data-v-b329ee4c");
const mi = {
  class: "resize-observer",
  tabindex: "-1"
};
xn();
const _i = /* @__PURE__ */ fi((e, t, o, n, i, s) => (v(), J("div", mi)));
kt.render = _i;
kt.__scopeId = "data-v-b329ee4c";
kt.__file = "src/components/ResizeObserver.vue";
const Ko = (e = "theme") => ({
  computed: {
    themeClass() {
      return li(this[e]);
    }
  }
}), vi = X({
  name: "VPopperContent",
  components: {
    ResizeObserver: kt
  },
  mixins: [
    Ko()
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
}), yi = ["id", "aria-hidden", "tabindex", "data-popper-placement"], bi = {
  ref: "inner",
  class: "v-popper__inner"
}, wi = /* @__PURE__ */ w("div", { class: "v-popper__arrow-outer" }, null, -1), Mi = /* @__PURE__ */ w("div", { class: "v-popper__arrow-inner" }, null, -1), Ii = [
  wi,
  Mi
];
function ki(e, t, o, n, i, s) {
  const r = Oe("ResizeObserver");
  return v(), I("div", {
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
    style: Ge(e.result ? {
      position: e.result.strategy,
      transform: `translate3d(${Math.round(e.result.x)}px,${Math.round(e.result.y)}px,0)`
    } : void 0),
    "aria-hidden": e.shown ? "false" : "true",
    tabindex: e.autoHide ? 0 : void 0,
    "data-popper-placement": e.result ? e.result.placement : void 0,
    onKeyup: t[2] || (t[2] = Dn((a) => e.autoHide && e.$emit("hide"), ["esc"]))
  }, [
    w("div", {
      class: "v-popper__backdrop",
      onClick: t[0] || (t[0] = (a) => e.autoHide && e.$emit("hide"))
    }),
    w("div", {
      class: "v-popper__wrapper",
      style: Ge(e.result ? {
        transformOrigin: e.result.transformOrigin
      } : void 0)
    }, [
      w("div", bi, [
        e.mounted ? (v(), I(K, { key: 0 }, [
          w("div", null, [
            lt(e.$slots, "default")
          ]),
          e.handleResize ? (v(), J(r, {
            key: 0,
            onNotify: t[1] || (t[1] = (a) => e.$emit("resize", a))
          })) : z("", !0)
        ], 64)) : z("", !0)
      ], 512),
      w("div", {
        ref: "arrow",
        class: "v-popper__arrow-container",
        style: Ge(e.result ? {
          left: e.toPx(e.result.arrow.x),
          top: e.toPx(e.result.arrow.y)
        } : void 0)
      }, Ii, 4)
    ], 4)
  ], 46, yi);
}
const Xo = /* @__PURE__ */ It(vi, [["render", ki]]), qo = {
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
let zt = function() {
};
typeof window < "u" && (zt = window.Element);
const ji = X({
  name: "VPopperWrapper",
  components: {
    Popper: hi,
    PopperContent: Xo
  },
  mixins: [
    qo,
    Ko("finalTheme")
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
      type: [String, Object, zt, Boolean],
      default: void 0
    },
    boundary: {
      type: [String, zt],
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
function Ni(e, t, o, n, i, s) {
  const r = Oe("PopperContent"), a = Oe("Popper");
  return v(), J(a, To({ ref: "popper" }, e.$props, {
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
    default: ct(({
      popperId: l,
      isShown: c,
      shouldMountContent: d,
      skipTransition: m,
      autoHide: h,
      show: g,
      hide: S,
      handleResize: L,
      onResize: C,
      classes: O,
      result: M
    }) => [
      lt(e.$slots, "default", {
        shown: c,
        show: g,
        hide: S
      }),
      Rt(r, {
        ref: "popperContent",
        "popper-id": l,
        theme: e.finalTheme,
        shown: c,
        mounted: d,
        "skip-transition": m,
        "auto-hide": h,
        "handle-resize": L,
        classes: O,
        result: M,
        onHide: S,
        onResize: C
      }, {
        default: ct(() => [
          lt(e.$slots, "popper", {
            shown: c,
            hide: S
          })
        ]),
        _: 2
      }, 1032, ["popper-id", "theme", "shown", "mounted", "skip-transition", "auto-hide", "handle-resize", "classes", "result", "onHide", "onResize"])
    ]),
    _: 3
  }, 16, ["theme", "target-nodes", "popper-node", "class"]);
}
const Ut = /* @__PURE__ */ It(ji, [["render", Ni]]), xi = {
  ...Ut,
  name: "VDropdown",
  vPopperTheme: "dropdown"
}, Si = {
  ...Ut,
  name: "VMenu",
  vPopperTheme: "menu"
}, Li = {
  ...Ut,
  name: "VTooltip",
  vPopperTheme: "tooltip"
}, Ti = X({
  name: "VTooltipDirective",
  components: {
    Popper: Qo(),
    PopperContent: Xo
  },
  mixins: [
    qo
  ],
  inheritAttrs: !1,
  props: {
    theme: {
      type: String,
      default: "tooltip"
    },
    html: {
      type: Boolean,
      default: (e) => He(e.theme, "html")
    },
    content: {
      type: [String, Number, Function],
      default: null
    },
    loadingContent: {
      type: String,
      default: (e) => He(e.theme, "loadingContent")
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
}), Di = ["innerHTML"], Ci = ["textContent"];
function Oi(e, t, o, n, i, s) {
  const r = Oe("PopperContent"), a = Oe("Popper");
  return v(), J(a, To({ ref: "popper" }, e.$attrs, {
    theme: e.theme,
    "target-nodes": e.targetNodes,
    "popper-node": () => e.$refs.popperContent.$el,
    onApplyShow: e.onShow,
    onApplyHide: e.onHide
  }), {
    default: ct(({
      popperId: l,
      isShown: c,
      shouldMountContent: d,
      skipTransition: m,
      autoHide: h,
      hide: g,
      handleResize: S,
      onResize: L,
      classes: C,
      result: O
    }) => [
      Rt(r, {
        ref: "popperContent",
        class: Q({
          "v-popper--tooltip-loading": e.loading
        }),
        "popper-id": l,
        theme: e.theme,
        shown: c,
        mounted: d,
        "skip-transition": m,
        "auto-hide": h,
        "handle-resize": S,
        classes: C,
        result: O,
        onHide: g,
        onResize: L
      }, {
        default: ct(() => [
          e.html ? (v(), I("div", {
            key: 0,
            innerHTML: e.finalContent
          }, null, 8, Di)) : (v(), I("div", {
            key: 1,
            textContent: V(e.finalContent)
          }, null, 8, Ci))
        ]),
        _: 2
      }, 1032, ["class", "popper-id", "theme", "shown", "mounted", "skip-transition", "auto-hide", "handle-resize", "classes", "result", "onHide", "onResize"])
    ]),
    _: 1
  }, 16, ["theme", "target-nodes", "popper-node", "onApplyShow", "onApplyHide"]);
}
const Ai = /* @__PURE__ */ It(Ti, [["render", Oi]]), en = "v-popper--has-tooltip";
function Ei(e, t) {
  let o = e.placement;
  if (!o && t)
    for (const n of Ho)
      t[n] && (o = n);
  return o || (o = He(e.theme || "tooltip", "placement")), o;
}
function tn(e, t, o) {
  let n;
  const i = typeof t;
  return i === "string" ? n = { content: t } : t && i === "object" ? n = t : n = { content: !1 }, n.placement = Ei(n, o), n.targetNodes = () => [e], n.referenceNode = () => e, n;
}
let Lt, Qe, zi = 0;
function Pi() {
  if (Lt)
    return;
  Qe = Y([]), Lt = Cn({
    name: "VTooltipDirectiveApp",
    setup() {
      return {
        directives: Qe
      };
    },
    render() {
      return this.directives.map((t) => On(Ai, {
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
  document.body.appendChild(e), Lt.mount(e);
}
function $i(e, t, o) {
  Pi();
  const n = Y(tn(e, t, o)), i = Y(!1), s = {
    id: zi++,
    options: n,
    shown: i
  };
  return Qe.value.push(s), e.classList && e.classList.add(en), e.$_popper = {
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
function on(e) {
  if (e.$_popper) {
    const t = Qe.value.indexOf(e.$_popper.item);
    t !== -1 && Qe.value.splice(t, 1), delete e.$_popper, delete e.$_popperOldShown, delete e.$_popperMountTarget;
  }
  e.classList && e.classList.remove(en);
}
function yo(e, { value: t, modifiers: o }) {
  const n = tn(e, t, o);
  if (!n.content || He(n.theme || "tooltip", "disabled"))
    on(e);
  else {
    let i;
    e.$_popper ? (i = e.$_popper, i.options.value = n) : i = $i(e, t, o), typeof t.shown < "u" && t.shown !== e.$_popperOldShown && (e.$_popperOldShown = t.shown, t.shown ? i.show() : i.hide());
  }
}
const Yi = {
  beforeMount: yo,
  updated: yo,
  beforeUnmount(e) {
    on(e);
  }
};
function bo(e) {
  e.addEventListener("mousedown", mt), e.addEventListener("click", mt), e.addEventListener("touchstart", nn, Ae ? {
    passive: !0
  } : !1);
}
function wo(e) {
  e.removeEventListener("mousedown", mt), e.removeEventListener("click", mt), e.removeEventListener("touchstart", nn), e.removeEventListener("touchend", sn), e.removeEventListener("touchcancel", rn);
}
function mt(e) {
  const t = e.currentTarget;
  e.closePopover = !t.$_vclosepopover_touch, e.closeAllPopover = t.$_closePopoverModifiers && !!t.$_closePopoverModifiers.all;
}
function nn(e) {
  if (e.changedTouches.length === 1) {
    const t = e.currentTarget;
    t.$_vclosepopover_touch = !0;
    const o = e.changedTouches[0];
    t.$_vclosepopover_touchPoint = o, t.addEventListener("touchend", sn), t.addEventListener("touchcancel", rn);
  }
}
function sn(e) {
  const t = e.currentTarget;
  if (t.$_vclosepopover_touch = !1, e.changedTouches.length === 1) {
    const o = e.changedTouches[0], n = t.$_vclosepopover_touchPoint;
    e.closePopover = Math.abs(o.screenY - n.screenY) < 20 && Math.abs(o.screenX - n.screenX) < 20, e.closeAllPopover = t.$_closePopoverModifiers && !!t.$_closePopoverModifiers.all;
  }
}
function rn(e) {
  const t = e.currentTarget;
  t.$_vclosepopover_touch = !1;
}
const Gi = {
  beforeMount(e, { value: t, modifiers: o }) {
    e.$_closePopoverModifiers = o, (typeof t > "u" || t) && bo(e);
  },
  updated(e, { value: t, oldValue: o, modifiers: n }) {
    e.$_closePopoverModifiers = n, t !== o && (typeof t > "u" || t ? bo(e) : wo(e));
  },
  beforeUnmount(e) {
    wo(e);
  }
};
function Ri(e, t = {}) {
  e.$_vTooltipInstalled || (e.$_vTooltipInstalled = !0, Fo(se, t), e.directive("tooltip", Yi), e.directive("close-popper", Gi), e.component("VTooltip", Li), e.component("VDropdown", xi), e.component("VMenu", Si));
}
const Wi = {
  // eslint-disable-next-line no-undef
  version: "5.2.2",
  install: Ri,
  options: se
};
var an = !1;
function tt(e, t, o) {
  return Array.isArray(e) ? (e.length = Math.max(e.length, t), e.splice(t, 1, o), o) : (e[t] = o, o);
}
function Tt(e, t) {
  if (Array.isArray(e)) {
    e.splice(t, 1);
    return;
  }
  delete e[t];
}
function Zi() {
  return ln().__VUE_DEVTOOLS_GLOBAL_HOOK__;
}
function ln() {
  return typeof navigator < "u" && typeof window < "u" ? window : typeof globalThis < "u" ? globalThis : {};
}
const Vi = typeof Proxy == "function", Bi = "devtools-plugin:setup", Fi = "plugin:settings:set";
let Le, Pt;
function Ui() {
  var e;
  return Le !== void 0 || (typeof window < "u" && window.performance ? (Le = !0, Pt = window.performance) : typeof globalThis < "u" && (!((e = globalThis.perf_hooks) === null || e === void 0) && e.performance) ? (Le = !0, Pt = globalThis.perf_hooks.performance) : Le = !1), Le;
}
function Hi() {
  return Ui() ? Pt.now() : Date.now();
}
class Qi {
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
        return Hi();
      }
    }, o && o.on(Fi, (r, a) => {
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
function cn(e, t) {
  const o = e, n = ln(), i = Zi(), s = Vi && o.enableEarlyProxy;
  if (i && (n.__VUE_DEVTOOLS_PLUGIN_API_AVAILABLE__ || !s))
    i.emit(Bi, e, t);
  else {
    const r = s ? new Qi(o, i) : null;
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
let Ye;
const Ee = (e) => Ye = e, un = process.env.NODE_ENV !== "production" ? Symbol("pinia") : (
  /* istanbul ignore next */
  Symbol()
);
function Ne(e) {
  return e && typeof e == "object" && Object.prototype.toString.call(e) === "[object Object]" && typeof e.toJSON != "function";
}
var ce;
(function(e) {
  e.direct = "direct", e.patchObject = "patch object", e.patchFunction = "patch function";
})(ce || (ce = {}));
const jt = typeof window < "u", Be = (process.env.NODE_ENV !== "production" || !1) && process.env.NODE_ENV !== "test" && jt, Mo = typeof window == "object" && window.window === window ? window : typeof self == "object" && self.self === self ? self : typeof global == "object" && global.global === global ? global : typeof globalThis == "object" ? globalThis : { HTMLElement: null };
function Ji(e, { autoBom: t = !1 } = {}) {
  return t && /^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(e.type) ? new Blob(["\uFEFF", e], { type: e.type }) : e;
}
function Ht(e, t, o) {
  const n = new XMLHttpRequest();
  n.open("GET", e), n.responseType = "blob", n.onload = function() {
    hn(n.response, t, o);
  }, n.onerror = function() {
    console.error("could not download file");
  }, n.send();
}
function dn(e) {
  const t = new XMLHttpRequest();
  t.open("HEAD", e, !1);
  try {
    t.send();
  } catch {
  }
  return t.status >= 200 && t.status <= 299;
}
function st(e) {
  try {
    e.dispatchEvent(new MouseEvent("click"));
  } catch {
    const o = document.createEvent("MouseEvents");
    o.initMouseEvent("click", !0, !0, window, 0, 0, 0, 80, 20, !1, !1, !1, !1, 0, null), e.dispatchEvent(o);
  }
}
const rt = typeof navigator == "object" ? navigator : { userAgent: "" }, pn = /Macintosh/.test(rt.userAgent) && /AppleWebKit/.test(rt.userAgent) && !/Safari/.test(rt.userAgent), hn = jt ? (
  // Use download attribute first if possible (#193 Lumia mobile) unless this is a macOS WebView or mini program
  typeof HTMLAnchorElement < "u" && "download" in HTMLAnchorElement.prototype && !pn ? Ki : (
    // Use msSaveOrOpenBlob as a second approach
    "msSaveOrOpenBlob" in rt ? Xi : (
      // Fallback to using FileReader and a popup
      qi
    )
  )
) : () => {
};
function Ki(e, t = "download", o) {
  const n = document.createElement("a");
  n.download = t, n.rel = "noopener", typeof e == "string" ? (n.href = e, n.origin !== location.origin ? dn(n.href) ? Ht(e, t, o) : (n.target = "_blank", st(n)) : st(n)) : (n.href = URL.createObjectURL(e), setTimeout(function() {
    URL.revokeObjectURL(n.href);
  }, 4e4), setTimeout(function() {
    st(n);
  }, 0));
}
function Xi(e, t = "download", o) {
  if (typeof e == "string")
    if (dn(e))
      Ht(e, t, o);
    else {
      const n = document.createElement("a");
      n.href = e, n.target = "_blank", setTimeout(function() {
        st(n);
      });
    }
  else
    navigator.msSaveOrOpenBlob(Ji(e, o), t);
}
function qi(e, t, o, n) {
  if (n = n || open("", "_blank"), n && (n.document.title = n.document.body.innerText = "downloading..."), typeof e == "string")
    return Ht(e, t, o);
  const i = e.type === "application/octet-stream", s = /constructor/i.test(String(Mo.HTMLElement)) || "safari" in Mo, r = /CriOS\/[\d]+/.test(navigator.userAgent);
  if ((r || i && s || pn) && typeof FileReader < "u") {
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
function B(e, t) {
  const o = "🍍 " + e;
  typeof __VUE_DEVTOOLS_TOAST__ == "function" ? __VUE_DEVTOOLS_TOAST__(o, t) : t === "error" ? console.error(o) : t === "warn" ? console.warn(o) : console.log(o);
}
function Qt(e) {
  return "_a" in e && "install" in e;
}
function gn() {
  if (!("clipboard" in navigator))
    return B("Your browser doesn't support the Clipboard API", "error"), !0;
}
function fn(e) {
  return e instanceof Error && e.message.toLowerCase().includes("document is not focused") ? (B('You need to activate the "Emulate a focused page" setting in the "Rendering" panel of devtools.', "warn"), !0) : !1;
}
async function es(e) {
  if (!gn())
    try {
      await navigator.clipboard.writeText(JSON.stringify(e.state.value)), B("Global state copied to clipboard.");
    } catch (t) {
      if (fn(t))
        return;
      B("Failed to serialize the state. Check the console for more details.", "error"), console.error(t);
    }
}
async function ts(e) {
  if (!gn())
    try {
      mn(e, JSON.parse(await navigator.clipboard.readText())), B("Global state pasted from clipboard.");
    } catch (t) {
      if (fn(t))
        return;
      B("Failed to deserialize the state from clipboard. Check the console for more details.", "error"), console.error(t);
    }
}
async function os(e) {
  try {
    hn(new Blob([JSON.stringify(e.state.value)], {
      type: "text/plain;charset=utf-8"
    }), "pinia-state.json");
  } catch (t) {
    B("Failed to export the state as JSON. Check the console for more details.", "error"), console.error(t);
  }
}
let pe;
function ns() {
  pe || (pe = document.createElement("input"), pe.type = "file", pe.accept = ".json");
  function e() {
    return new Promise((t, o) => {
      pe.onchange = async () => {
        const n = pe.files;
        if (!n)
          return t(null);
        const i = n.item(0);
        return t(i ? { text: await i.text(), file: i } : null);
      }, pe.oncancel = () => t(null), pe.onerror = o, pe.click();
    });
  }
  return e;
}
async function is(e) {
  try {
    const o = await ns()();
    if (!o)
      return;
    const { text: n, file: i } = o;
    mn(e, JSON.parse(n)), B(`Global state imported from "${i.name}".`);
  } catch (t) {
    B("Failed to import the state from JSON. Check the console for more details.", "error"), console.error(t);
  }
}
function mn(e, t) {
  for (const o in t) {
    const n = e.state.value[o];
    n ? Object.assign(n, t[o]) : e.state.value[o] = t[o];
  }
}
function oe(e) {
  return {
    _custom: {
      display: e
    }
  };
}
const _n = "🍍 Pinia (root)", $t = "_root";
function ss(e) {
  return Qt(e) ? {
    id: $t,
    label: _n
  } : {
    id: e.$id,
    label: e.$id
  };
}
function rs(e) {
  if (Qt(e)) {
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
function as(e) {
  return e ? Array.isArray(e) ? e.reduce((t, o) => (t.keys.push(o.key), t.operations.push(o.type), t.oldValue[o.key] = o.oldValue, t.newValue[o.key] = o.newValue, t), {
    oldValue: {},
    keys: [],
    operations: [],
    newValue: {}
  }) : {
    operation: oe(e.type),
    key: oe(e.key),
    oldValue: e.oldValue,
    newValue: e.newValue
  } : {};
}
function ls(e) {
  switch (e) {
    case ce.direct:
      return "mutation";
    case ce.patchFunction:
      return "$patch";
    case ce.patchObject:
      return "$patch";
    default:
      return "unknown";
  }
}
let De = !0;
const at = [], Me = "pinia:mutations", H = "pinia", { assign: cs } = Object, _t = (e) => "🍍 " + e;
function us(e, t) {
  cn({
    id: "dev.esm.pinia",
    label: "Pinia 🍍",
    logo: "https://pinia.vuejs.org/logo.svg",
    packageName: "pinia",
    homepage: "https://pinia.vuejs.org",
    componentStateTypes: at,
    app: e
  }, (o) => {
    typeof o.now != "function" && B("You seem to be using an outdated version of Vue Devtools. Are you still using the Beta release instead of the stable one? You can find the links at https://devtools.vuejs.org/guide/installation.html."), o.addTimelineLayer({
      id: Me,
      label: "Pinia 🍍",
      color: 15064968
    }), o.addInspector({
      id: H,
      label: "Pinia 🍍",
      icon: "storage",
      treeFilterPlaceholder: "Search stores",
      actions: [
        {
          icon: "content_copy",
          action: () => {
            es(t);
          },
          tooltip: "Serialize and copy the state"
        },
        {
          icon: "content_paste",
          action: async () => {
            await ts(t), o.sendInspectorTree(H), o.sendInspectorState(H);
          },
          tooltip: "Replace the state with the content of your clipboard"
        },
        {
          icon: "save",
          action: () => {
            os(t);
          },
          tooltip: "Save the state as a JSON file"
        },
        {
          icon: "folder_open",
          action: async () => {
            await is(t), o.sendInspectorTree(H), o.sendInspectorState(H);
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
            i ? typeof i.$reset != "function" ? B(`Cannot reset "${n}" store because it doesn't have a "$reset" method implemented.`, "warn") : (i.$reset(), B(`Store "${n}" reset.`)) : B(`Cannot reset "${n}" store because it wasn't found.`, "warn");
          }
        }
      ]
    }), o.on.inspectComponent((n, i) => {
      const s = n.componentInstance && n.componentInstance.proxy;
      if (s && s._pStores) {
        const r = n.componentInstance.proxy._pStores;
        Object.values(r).forEach((a) => {
          n.instanceData.state.push({
            type: _t(a.$id),
            key: "state",
            editable: !0,
            value: a._isOptionsAPI ? {
              _custom: {
                value: vt(a.$state),
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
            type: _t(a.$id),
            key: "getters",
            editable: !1,
            value: a._getters.reduce((l, c) => {
              try {
                l[c] = a[c];
              } catch (d) {
                l[c] = d;
              }
              return l;
            }, {})
          });
        });
      }
    }), o.on.getInspectorTree((n) => {
      if (n.app === e && n.inspectorId === H) {
        let i = [t];
        i = i.concat(Array.from(t._s.values())), n.rootNodes = (n.filter ? i.filter((s) => "$id" in s ? s.$id.toLowerCase().includes(n.filter.toLowerCase()) : _n.toLowerCase().includes(n.filter.toLowerCase())) : i).map(ss);
      }
    }), o.on.getInspectorState((n) => {
      if (n.app === e && n.inspectorId === H) {
        const i = n.nodeId === $t ? t : t._s.get(n.nodeId);
        if (!i)
          return;
        i && (n.state = rs(i));
      }
    }), o.on.editInspectorState((n, i) => {
      if (n.app === e && n.inspectorId === H) {
        const s = n.nodeId === $t ? t : t._s.get(n.nodeId);
        if (!s)
          return B(`store "${n.nodeId}" not found`, "error");
        const { path: r } = n;
        Qt(s) ? r.unshift("state") : (r.length !== 1 || !s._customProperties.has(r[0]) || r[0] in s.$state) && r.unshift("$state"), De = !1, n.set(s, r, n.state.value), De = !0;
      }
    }), o.on.editComponentState((n) => {
      if (n.type.startsWith("🍍")) {
        const i = n.type.replace(/^🍍\s*/, ""), s = t._s.get(i);
        if (!s)
          return B(`store "${i}" not found`, "error");
        const { path: r } = n;
        if (r[0] !== "state")
          return B(`Invalid path for store "${i}":
${r}
Only state can be modified.`);
        r[0] = "$state", De = !1, n.set(s, r, n.state.value), De = !0;
      }
    });
  });
}
function ds(e, t) {
  at.includes(_t(t.$id)) || at.push(_t(t.$id)), cn({
    id: "dev.esm.pinia",
    label: "Pinia 🍍",
    logo: "https://pinia.vuejs.org/logo.svg",
    packageName: "pinia",
    homepage: "https://pinia.vuejs.org",
    componentStateTypes: at,
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
      const d = vn++;
      o.addTimelineEvent({
        layerId: Me,
        event: {
          time: n(),
          title: "🛫 " + l,
          subtitle: "start",
          data: {
            store: oe(t.$id),
            action: oe(l),
            args: c
          },
          groupId: d
        }
      }), r((m) => {
        fe = void 0, o.addTimelineEvent({
          layerId: Me,
          event: {
            time: n(),
            title: "🛬 " + l,
            subtitle: "end",
            data: {
              store: oe(t.$id),
              action: oe(l),
              args: c,
              result: m
            },
            groupId: d
          }
        });
      }), a((m) => {
        fe = void 0, o.addTimelineEvent({
          layerId: Me,
          event: {
            time: n(),
            logType: "error",
            title: "💥 " + l,
            subtitle: "end",
            data: {
              store: oe(t.$id),
              action: oe(l),
              args: c,
              error: m
            },
            groupId: d
          }
        });
      });
    }, !0), t._customProperties.forEach((r) => {
      Wt(() => u(t[r]), (a, l) => {
        o.notifyComponentUpdate(), o.sendInspectorState(H), De && o.addTimelineEvent({
          layerId: Me,
          event: {
            time: n(),
            title: "Change",
            subtitle: r,
            data: {
              newValue: a,
              oldValue: l
            },
            groupId: fe
          }
        });
      }, { deep: !0 });
    }), t.$subscribe(({ events: r, type: a }, l) => {
      if (o.notifyComponentUpdate(), o.sendInspectorState(H), !De)
        return;
      const c = {
        time: n(),
        title: ls(a),
        data: cs({ store: oe(t.$id) }, as(r)),
        groupId: fe
      };
      a === ce.patchFunction ? c.subtitle = "⤵️" : a === ce.patchObject ? c.subtitle = "🧩" : r && !Array.isArray(r) && (c.subtitle = r.type), r && (c.data["rawEvent(s)"] = {
        _custom: {
          display: "DebuggerEvent",
          type: "object",
          tooltip: "raw DebuggerEvent[]",
          value: r
        }
      }), o.addTimelineEvent({
        layerId: Me,
        event: c
      });
    }, { detached: !0, flush: "sync" });
    const i = t._hotUpdate;
    t._hotUpdate = Ie((r) => {
      i(r), o.addTimelineEvent({
        layerId: Me,
        event: {
          time: n(),
          title: "🔥 " + t.$id,
          subtitle: "HMR update",
          data: {
            store: oe(t.$id),
            info: oe("HMR update")
          }
        }
      }), o.notifyComponentUpdate(), o.sendInspectorTree(H), o.sendInspectorState(H);
    });
    const { $dispose: s } = t;
    t.$dispose = () => {
      s(), o.notifyComponentUpdate(), o.sendInspectorTree(H), o.sendInspectorState(H), o.getSettings().logStoreChanges && B(`Disposed "${t.$id}" store 🗑`);
    }, o.notifyComponentUpdate(), o.sendInspectorTree(H), o.sendInspectorState(H), o.getSettings().logStoreChanges && B(`"${t.$id}" store installed 🆕`);
  });
}
let vn = 0, fe;
function Io(e, t, o) {
  const n = t.reduce((i, s) => (i[s] = vt(e)[s], i), {});
  for (const i in n)
    e[i] = function() {
      const s = vn, r = o ? new Proxy(e, {
        get(...l) {
          return fe = s, Reflect.get(...l);
        },
        set(...l) {
          return fe = s, Reflect.set(...l);
        }
      }) : e;
      fe = s;
      const a = n[i].apply(r, arguments);
      return fe = void 0, a;
    };
}
function ps({ app: e, store: t, options: o }) {
  if (t.$id.startsWith("__hot:"))
    return;
  t._isOptionsAPI = !!o.state, Io(t, Object.keys(o.actions), t._isOptionsAPI);
  const n = t._hotUpdate;
  vt(t)._hotUpdate = function(i) {
    n.apply(this, arguments), Io(t, Object.keys(i._hmrPayload.actions), !!t._isOptionsAPI);
  }, ds(
    e,
    // FIXME: is there a way to allow the assignment from Store<Id, S, G, A> to StoreGeneric?
    t
  );
}
function hs() {
  const e = Do(!0), t = e.run(() => Y({}));
  let o = [], n = [];
  const i = Ie({
    install(s) {
      Ee(i), i._a = s, s.provide(un, i), s.config.globalProperties.$pinia = i, Be && us(s, i), n.forEach((r) => o.push(r)), n = [];
    },
    use(s) {
      return !this._a && !an ? n.push(s) : o.push(s), this;
    },
    _p: o,
    // it's actually undefined here
    // @ts-expect-error
    _a: null,
    _e: e,
    _s: /* @__PURE__ */ new Map(),
    state: t
  });
  return Be && typeof Proxy < "u" && i.use(ps), i;
}
function yn(e, t) {
  for (const o in t) {
    const n = t[o];
    if (!(o in e))
      continue;
    const i = e[o];
    Ne(i) && Ne(n) && !je(n) && !Zt(n) ? e[o] = yn(i, n) : e[o] = n;
  }
  return e;
}
const bn = () => {
};
function ko(e, t, o, n = bn) {
  e.push(t);
  const i = () => {
    const s = e.indexOf(t);
    s > -1 && (e.splice(s, 1), n());
  };
  return !o && Pn() && $n(i), i;
}
function Te(e, ...t) {
  e.slice().forEach((o) => {
    o(...t);
  });
}
const gs = (e) => e();
function Yt(e, t) {
  e instanceof Map && t instanceof Map && t.forEach((o, n) => e.set(n, o)), e instanceof Set && t instanceof Set && t.forEach(e.add, e);
  for (const o in t) {
    if (!t.hasOwnProperty(o))
      continue;
    const n = t[o], i = e[o];
    Ne(i) && Ne(n) && e.hasOwnProperty(o) && !je(n) && !Zt(n) ? e[o] = Yt(i, n) : e[o] = n;
  }
  return e;
}
const fs = process.env.NODE_ENV !== "production" ? Symbol("pinia:skipHydration") : (
  /* istanbul ignore next */
  Symbol()
);
function ms(e) {
  return !Ne(e) || !e.hasOwnProperty(fs);
}
const { assign: ee } = Object;
function jo(e) {
  return !!(je(e) && e.effect);
}
function No(e, t, o, n) {
  const { state: i, actions: s, getters: r } = t, a = o.state.value[e];
  let l;
  function c() {
    !a && (process.env.NODE_ENV === "production" || !n) && (o.state.value[e] = i ? i() : {});
    const d = process.env.NODE_ENV !== "production" && n ? (
      // use ref() to unwrap refs inside state TODO: check if this is still necessary
      qt(Y(i ? i() : {}).value)
    ) : qt(o.state.value[e]);
    return ee(d, s, Object.keys(r || {}).reduce((m, h) => (process.env.NODE_ENV !== "production" && h in d && console.warn(`[🍍]: A getter cannot have the same name as another state property. Rename one of them. Found with "${h}" in store "${e}".`), m[h] = Ie(Oo(() => {
      Ee(o);
      const g = o._s.get(e);
      return r[h].call(g, g);
    })), m), {}));
  }
  return l = Gt(e, c, t, o, n, !0), l;
}
function Gt(e, t, o = {}, n, i, s) {
  let r;
  const a = ee({ actions: {} }, o);
  if (process.env.NODE_ENV !== "production" && !n._e.active)
    throw new Error("Pinia destroyed");
  const l = {
    deep: !0
    // flush: 'post',
  };
  process.env.NODE_ENV !== "production" && !an && (l.onTrigger = (_) => {
    c ? g = _ : c == !1 && !f._hotUpdating && (Array.isArray(g) ? g.push(_) : console.error("🍍 debuggerEvents should be an array. This is most likely an internal Pinia bug."));
  });
  let c, d, m = [], h = [], g;
  const S = n.state.value[e];
  !s && !S && (process.env.NODE_ENV === "production" || !i) && (n.state.value[e] = {});
  const L = Y({});
  let C;
  function O(_) {
    let b;
    c = d = !1, process.env.NODE_ENV !== "production" && (g = []), typeof _ == "function" ? (_(n.state.value[e]), b = {
      type: ce.patchFunction,
      storeId: e,
      events: g
    }) : (Yt(n.state.value[e], _), b = {
      type: ce.patchObject,
      payload: _,
      storeId: e,
      events: g
    });
    const p = C = Symbol();
    Dt().then(() => {
      C === p && (c = !0);
    }), d = !0, Te(m, b, n.state.value[e]);
  }
  const M = s ? function() {
    const { state: b } = o, p = b ? b() : {};
    this.$patch((T) => {
      ee(T, p);
    });
  } : (
    /* istanbul ignore next */
    process.env.NODE_ENV !== "production" ? () => {
      throw new Error(`🍍: Store "${e}" is built using the setup syntax and does not implement $reset().`);
    } : bn
  );
  function j() {
    r.stop(), m = [], h = [], n._s.delete(e);
  }
  function E(_, b) {
    return function() {
      Ee(n);
      const p = Array.from(arguments), T = [], A = [];
      function D(R) {
        T.push(R);
      }
      function G(R) {
        A.push(R);
      }
      Te(h, {
        args: p,
        name: _,
        store: f,
        after: D,
        onError: G
      });
      let P;
      try {
        P = b.apply(this && this.$id === e ? this : f, p);
      } catch (R) {
        throw Te(A, R), R;
      }
      return P instanceof Promise ? P.then((R) => (Te(T, R), R)).catch((R) => (Te(A, R), Promise.reject(R))) : (Te(T, P), P);
    };
  }
  const y = /* @__PURE__ */ Ie({
    actions: {},
    getters: {},
    state: [],
    hotState: L
  }), k = {
    _p: n,
    // _s: scope,
    $id: e,
    $onAction: ko.bind(null, h),
    $patch: O,
    $reset: M,
    $subscribe(_, b = {}) {
      const p = ko(m, _, b.detached, () => T()), T = r.run(() => Wt(() => n.state.value[e], (A) => {
        (b.flush === "sync" ? d : c) && _({
          storeId: e,
          type: ce.direct,
          events: g
        }, A);
      }, ee({}, l, b)));
      return p;
    },
    $dispose: j
  }, f = zn(process.env.NODE_ENV !== "production" || Be ? ee(
    {
      _hmrPayload: y,
      _customProperties: Ie(/* @__PURE__ */ new Set())
      // devtools custom properties
    },
    k
    // must be added later
    // setupStore
  ) : k);
  n._s.set(e, f);
  const x = (n._a && n._a.runWithContext || gs)(() => n._e.run(() => (r = Do()).run(t)));
  for (const _ in x) {
    const b = x[_];
    if (je(b) && !jo(b) || Zt(b))
      process.env.NODE_ENV !== "production" && i ? tt(L.value, _, Nt(x, _)) : s || (S && ms(b) && (je(b) ? b.value = S[_] : Yt(b, S[_])), n.state.value[e][_] = b), process.env.NODE_ENV !== "production" && y.state.push(_);
    else if (typeof b == "function") {
      const p = process.env.NODE_ENV !== "production" && i ? b : E(_, b);
      x[_] = p, process.env.NODE_ENV !== "production" && (y.actions[_] = b), a.actions[_] = b;
    } else
      process.env.NODE_ENV !== "production" && jo(b) && (y.getters[_] = s ? (
        // @ts-expect-error
        o.getters[_]
      ) : b, jt && (x._getters || // @ts-expect-error: same
      (x._getters = Ie([]))).push(_));
  }
  if (ee(f, x), ee(vt(f), x), Object.defineProperty(f, "$state", {
    get: () => process.env.NODE_ENV !== "production" && i ? L.value : n.state.value[e],
    set: (_) => {
      if (process.env.NODE_ENV !== "production" && i)
        throw new Error("cannot set hotState");
      O((b) => {
        ee(b, _);
      });
    }
  }), process.env.NODE_ENV !== "production" && (f._hotUpdate = Ie((_) => {
    f._hotUpdating = !0, _._hmrPayload.state.forEach((b) => {
      if (b in f.$state) {
        const p = _.$state[b], T = f.$state[b];
        typeof p == "object" && Ne(p) && Ne(T) ? yn(p, T) : _.$state[b] = T;
      }
      tt(f, b, Nt(_.$state, b));
    }), Object.keys(f.$state).forEach((b) => {
      b in _.$state || Tt(f, b);
    }), c = !1, d = !1, n.state.value[e] = Nt(_._hmrPayload, "hotState"), d = !0, Dt().then(() => {
      c = !0;
    });
    for (const b in _._hmrPayload.actions) {
      const p = _[b];
      tt(f, b, E(b, p));
    }
    for (const b in _._hmrPayload.getters) {
      const p = _._hmrPayload.getters[b], T = s ? (
        // special handling of options api
        Oo(() => (Ee(n), p.call(f, f)))
      ) : p;
      tt(f, b, T);
    }
    Object.keys(f._hmrPayload.getters).forEach((b) => {
      b in _._hmrPayload.getters || Tt(f, b);
    }), Object.keys(f._hmrPayload.actions).forEach((b) => {
      b in _._hmrPayload.actions || Tt(f, b);
    }), f._hmrPayload = _._hmrPayload, f._getters = _._getters, f._hotUpdating = !1;
  })), Be) {
    const _ = {
      writable: !0,
      configurable: !0,
      // avoid warning on devtools trying to display this property
      enumerable: !1
    };
    ["_p", "_hmrPayload", "_getters", "_customProperties"].forEach((b) => {
      Object.defineProperty(f, b, ee({ value: f[b] }, _));
    });
  }
  return n._p.forEach((_) => {
    if (Be) {
      const b = r.run(() => _({
        store: f,
        app: n._a,
        pinia: n,
        options: a
      }));
      Object.keys(b || {}).forEach((p) => f._customProperties.add(p)), ee(f, b);
    } else
      ee(f, r.run(() => _({
        store: f,
        app: n._a,
        pinia: n,
        options: a
      })));
  }), process.env.NODE_ENV !== "production" && f.$state && typeof f.$state == "object" && typeof f.$state.constructor == "function" && !f.$state.constructor.toString().includes("[native code]") && console.warn(`[🍍]: The "state" must be a plain object. It cannot be
	state: () => new MyClass()
Found in store "${f.$id}".`), S && s && o.hydrate && o.hydrate(f.$state, S), c = !0, d = !0, f;
}
function _s(e, t, o) {
  let n, i;
  const s = typeof t == "function";
  n = e, i = s ? o : t;
  function r(a, l) {
    const c = An();
    if (a = // in test mode, ignore the argument provided as we can always retrieve a
    // pinia instance with getActivePinia()
    (process.env.NODE_ENV === "test" && Ye && Ye._testing ? null : a) || (c ? En(un, null) : null), a && Ee(a), process.env.NODE_ENV !== "production" && !Ye)
      throw new Error(`[🍍]: "getActivePinia()" was called but there was no active Pinia. Are you trying to use a store before calling "app.use(pinia)"?
See https://pinia.vuejs.org/core-concepts/outside-component-usage.html for help.
This will fail in production.`);
    a = Ye, a._s.has(n) || (s ? Gt(n, t, i, a) : No(n, i, a), process.env.NODE_ENV !== "production" && (r._pinia = a));
    const d = a._s.get(n);
    if (process.env.NODE_ENV !== "production" && l) {
      const m = "__hot:" + n, h = s ? Gt(m, t, i, a, !0) : No(m, ee({}, i), a, !0);
      l._hotUpdate(h), delete a.state.value[m], a._s.delete(m);
    }
    if (process.env.NODE_ENV !== "production" && jt) {
      const m = Co();
      if (m && m.proxy && // avoid adding stores that are just built for hot module replacement
      !l) {
        const h = m.proxy, g = "_pStores" in h ? h._pStores : h._pStores = {};
        g[n] = d;
      }
    }
    return d;
  }
  return r.$id = n, r;
}
var U = /* @__PURE__ */ ((e) => (e.templates = "templates", e.styling = "styling", e.preferences = "preferences", e.wording = "wording", e.output = "output", e))(U || {}), Z = /* @__PURE__ */ ((e) => (e.html = "html", e.json = "json", e))(Z || {});
const xo = [
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
], wn = "--tvk_";
function Jt(e) {
  const t = e.replace(wn, ""), o = t.split("_"), n = o.slice(0, -1), i = o[o.length - 1];
  return {
    keyWithoutPrefix: t,
    nameSpace: o,
    categories: n,
    name: i
  };
}
function Kt() {
  const e = [];
  Array.from(document.styleSheets).forEach((o) => {
    o.href || Array.from(o.cssRules).forEach((n) => {
      if (n instanceof CSSStyleRule && n.selectorText === ":root") {
        let i = !!n.style.getPropertyValue(
          "--tvk--default-sheet"
        );
        Array.from(n.styleMap).forEach((s) => {
          if (s[0].startsWith(wn)) {
            const r = s[0], a = s[1], l = Jt(r);
            let c = e.find((d) => d.key === r);
            c ? i ? c.initialValue = a : c.value = a : e.push({
              key: r,
              value: a,
              initialValue: a,
              categories: l.categories,
              name: l.name
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
    const i = xo.indexOf(o.name), s = xo.indexOf(n.name);
    return i > -1 && s > -1 ? i - s : i > -1 ? -1 : s > -1 ? 1 : o.name < n.name ? -1 : o.name > n.name ? 1 : 0;
  }), e;
}
function vs(e) {
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
function Mn(e, t, o = !0) {
  for (let n = 0; n < e.length; n++)
    if (o && t.length !== e.length || t[n] !== e[n])
      return !1;
  return !0;
}
function ys(e, t) {
  return e.filter((n) => Mn(t, n.categories));
}
function bs(e, t) {
  let o = e.filter((s) => Mn(t, s.categories, !1));
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
const q = _s("editorStore", () => {
  const e = Y(void 0), t = Y(U.templates), o = Y("colors"), n = Y(void 0), i = Y(Z.html), s = Y(!1);
  function r() {
  }
  function a(L) {
    e.value = L, setTimeout(() => {
      q().refreshEditorPanels();
    });
  }
  function l(L) {
    t.value = L, setTimeout(() => {
      q().refreshEditorPanels();
    });
  }
  function c(L) {
    o.value = L;
  }
  function d(L) {
    i.value = L, q().refreshEditorPanels();
  }
  function m(L) {
    s.value = L, q().refreshEditorPanels();
  }
  function h(L) {
    S();
    const C = q(), O = Jt(L);
    C.setStylingCategory(O.categories[0]), C.targetStylingVariable(L);
  }
  function g(L) {
    n.value = L;
  }
  function S() {
    n.value = void 0;
  }
  return {
    currentCustomizationName: e,
    editorPanel: t,
    stylingCategory: o,
    stylingTargetedVar: n,
    outputFormat: i,
    outputMinified: s,
    // initStudio,
    setCurrentCustomizationName: a,
    refreshEditorPanels: r,
    setEditorPanel: l,
    setStylingCategory: c,
    jumpToStylingVariable: h,
    targetStylingVariable: g,
    stylingVariableReached: S,
    setOutputFormat: d,
    minifyOutput: m
  };
}), ws = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KDTwhLS0gVXBsb2FkZWQgdG86IFNWRyBSZXBvLCB3d3cuc3ZncmVwby5jb20sIEdlbmVyYXRvcjogU1ZHIFJlcG8gTWl4ZXIgVG9vbHMgLS0+Cjxzdmcgd2lkdGg9IjgwMHB4IiBoZWlnaHQ9IjgwMHB4IiB2aWV3Qm94PSIwIDAgMTI4IDEyOCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgYXJpYS1oaWRkZW49InRydWUiIHJvbGU9ImltZyIgY2xhc3M9Imljb25pZnkgaWNvbmlmeS0tbm90byIgcHJlc2VydmVBc3BlY3RSYXRpbz0ieE1pZFlNaWQgbWVldCI+Cg08cGF0aCBkPSJNOTguOSA3OS44NWMtMS4yNS0yLjI3LjM0LTQuNTggMy4wNi03LjQ0YzQuMzEtNC41NCA5LTE1LjA3IDQuNjQtMjUuNzZjLjAzLS4wNi0uODYtMS44Ni0uODMtMS45MmwtMS43OS0uMDljLS41Ny0uMDgtMjAuMjYtLjEyLTM5Ljk3LS4xMmMtMTkuNzEgMC0zOS4zOS4wNC0zOS45Ny4xMmMwIDAtMi42NSAxLjk1LTIuNjMgMi4wMWMtNC4zNSAxMC42OS4zMyAyMS4yMiA0LjY0IDI1Ljc2YzIuNzEgMi44NiA0LjMgNS4xNyAzLjA2IDcuNDRjLTEuMjEgMi4yMS00LjgxIDIuNTMtNC44MSAyLjUzcy44MyAyLjI2IDIuODMgMy40OGMxLjg1IDEuMTMgNC4xMyAxLjM5IDUuNyAxLjQzYzAgMCA2LjE1IDguNTEgMjIuMjMgOC41MWgxNy45YzE2LjA4IDAgMjIuMjMtOC41MSAyMi4yMy04LjUxYzEuNTctLjA0IDMuODUtLjMgNS43LTEuNDNjMi0xLjIyIDIuODMtMy40OCAyLjgzLTMuNDhzLTMuNjEtLjMyLTQuODItMi41M3oiIGZpbGw9IiNlNjNkMDAiPgoNPC9wYXRoPgoNPHJhZGlhbEdyYWRpZW50IGlkPSJJY29uaWZ5SWQxN2VjZGIyOTA0ZDE3OGVhYjE3OTI4IiBjeD0iOTguNzUyIiBjeT0iODMuNjAxIiByPSIyMy40MTkiIGdyYWRpZW50VHJhbnNmb3JtPSJtYXRyaXgoMSAwIDAgLS40OTEyIC0xOS4yODMgMTI0LjY2NSkiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIj4KDTxzdG9wIG9mZnNldD0iLjY5OSIgc3RvcC1jb2xvcj0iI2Y5OGIyNSIgc3RvcC1vcGFjaXR5PSIwIj4KDTwvc3RvcD4KDTxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iI2Y5OGIyNSI+Cg08L3N0b3A+Cg08L3JhZGlhbEdyYWRpZW50PgoNPHBhdGggZD0iTTYzLjk5IDk1Ljc5di05LjQ0bDI4LjU3LTIuMjZsMi42IDMuMnMtNi4xNSA4LjUxLTIyLjIzIDguNTFsLTguOTQtLjAxeiIgZmlsbD0idXJsKCNJY29uaWZ5SWQxN2VjZGIyOTA0ZDE3OGVhYjE3OTI4KSI+Cg08L3BhdGg+Cg08cmFkaWFsR3JhZGllbnQgaWQ9Ikljb25pZnlJZDE3ZWNkYjI5MDRkMTc4ZWFiMTc5MjkiIGN4PSI3Ni41NzMiIGN5PSI3OC42NjgiIHI9IjYuOTIxIiBncmFkaWVudFRyYW5zZm9ybT0ibWF0cml4KC0uOTA1NyAuNDIzOCAuMzE0NCAuNjcxOSAxNDYuMjcgLTYuNjQ0KSIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiPgoNPHN0b3Agb2Zmc2V0PSIwIiBzdG9wLWNvbG9yPSIjZjk4YjI1Ij4KDTwvc3RvcD4KDTxzdG9wIG9mZnNldD0iLjg3MiIgc3RvcC1jb2xvcj0iI2Y5OGIyNSIgc3RvcC1vcGFjaXR5PSIwIj4KDTwvc3RvcD4KDTwvcmFkaWFsR3JhZGllbnQ+Cg08cGF0aCBkPSJNOTUuMSA4My4xNmMtNC4yOC02LjUgNS4yMS04LjkzIDUuMjEtOC45M2wuMDEuMDFjLTEuNjUgMi4wNS0yLjQgMy44NC0xLjQzIDUuNjFjMS4yMSAyLjIxIDQuODEgMi41MyA0LjgxIDIuNTNzLTQuOTEgNC4zNi04LjYuNzh6IiBmaWxsPSJ1cmwoI0ljb25pZnlJZDE3ZWNkYjI5MDRkMTc4ZWFiMTc5MjkpIj4KDTwvcGF0aD4KDTxyYWRpYWxHcmFkaWVudCBpZD0iSWNvbmlmeUlkMTdlY2RiMjkwNGQxNzhlYWIxNzkzMCIgY3g9IjkwLjkzIiBjeT0iNTkuMjc5IiByPSIzMC4zOTkiIGdyYWRpZW50VHJhbnNmb3JtPSJtYXRyaXgoLS4wNzQ2IC0uOTk3MiAtLjgzMTEgLjA2MjIgMTQzLjM0MyAxNDYuMjY5KSIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiPgoNPHN0b3Agb2Zmc2V0PSIuNjk5IiBzdG9wLWNvbG9yPSIjZjk4YjI1IiBzdG9wLW9wYWNpdHk9IjAiPgoNPC9zdG9wPgoNPHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjZjk4YjI1Ij4KDTwvc3RvcD4KDTwvcmFkaWFsR3JhZGllbnQ+Cg08cGF0aCBkPSJNMTA2LjYyIDQ2LjY1YzQuMjUgMTAuMzUtLjIyIDIxLjAxLTQuNDEgMjUuNTFjLS41OC42Mi0zLjAxIDMuMDEtMy41NyA0LjkyYzAgMC05LjU0LTEzLjMxLTEyLjM5LTIxLjEzYy0uNTgtMS41OC0xLjEtMy4yLTEuMTctNC44OGMtLjA1LTEuMjYuMTQtMi43Ni44Ny0zLjgyYy44OS0xLjMxIDIwLjE2LTEuNyAyMC4xNi0xLjdsLjUxIDEuMXoiIGZpbGw9InVybCgjSWNvbmlmeUlkMTdlY2RiMjkwNGQxNzhlYWIxNzkzMCkiPgoNPC9wYXRoPgoNPHJhZGlhbEdyYWRpZW50IGlkPSJJY29uaWZ5SWQxN2VjZGIyOTA0ZDE3OGVhYjE3OTMxIiBjeD0iNDEuNTM0IiBjeT0iNjIuNjQ1IiByPSIzMC4zOTkiIGdyYWRpZW50VHJhbnNmb3JtPSJtYXRyaXgoLjA3NDYgLS45OTcyIC44MzExIC4wNjIyIC0xMy42MyAxMDAuMTY2KSIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiPgoNPHN0b3Agb2Zmc2V0PSIuNjk5IiBzdG9wLWNvbG9yPSIjZjk4YjI1IiBzdG9wLW9wYWNpdHk9IjAiPgoNPC9zdG9wPgoNPHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjZjk4YjI1Ij4KDTwvc3RvcD4KDTwvcmFkaWFsR3JhZGllbnQ+Cg08cGF0aCBkPSJNMjEuNCA0Ni42NWMtNC4yNCAxMC4zNS4yMyAyMS4wMSA0LjQxIDI1LjVjLjU4LjYyIDMuMDEgMy4wMSAzLjU3IDQuOTJjMCAwIDkuNTQtMTMuMzEgMTIuMzktMjEuMTNjLjU4LTEuNTggMS4xLTMuMiAxLjE3LTQuODhjLjA1LTEuMjYtLjE0LTIuNzYtLjg3LTMuODJjLS44OS0xLjMxLTEuOTMtLjk2LTMuNDQtLjk2Yy0yLjg4IDAtMTUuNDktLjc0LTE2LjQ3LS43NGMuMDEuMDEtLjc2IDEuMTEtLjc2IDEuMTF6IiBmaWxsPSJ1cmwoI0ljb25pZnlJZDE3ZWNkYjI5MDRkMTc4ZWFiMTc5MzEpIj4KDTwvcGF0aD4KDTxyYWRpYWxHcmFkaWVudCBpZD0iSWNvbmlmeUlkMTdlY2RiMjkwNGQxNzhlYWIxNzkzMiIgY3g9IjQ4Ljg4NSIgY3k9IjgzLjUzOCIgcj0iMjMuNDE5IiBncmFkaWVudFRyYW5zZm9ybT0ibWF0cml4KC0xIDAgMCAtLjQ5MTIgOTcuNzcgMTI0LjU3MikiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIj4KDTxzdG9wIG9mZnNldD0iLjY5OSIgc3RvcC1jb2xvcj0iI2Y5OGIyNSIgc3RvcC1vcGFjaXR5PSIwIj4KDTwvc3RvcD4KDTxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iI2Y5OGIyNSI+Cg08L3N0b3A+Cg08L3JhZGlhbEdyYWRpZW50PgoNPHBhdGggZD0iTTY0LjAzIDk1Ljc5di05LjQ0bC0yOC41Ny0yLjI2bC0yLjYgMy4yczYuMTUgOC41MSAyMi4yMyA4LjUxbDguOTQtLjAxeiIgZmlsbD0idXJsKCNJY29uaWZ5SWQxN2VjZGIyOTA0ZDE3OGVhYjE3OTMyKSI+Cg08L3BhdGg+Cg08cmFkaWFsR3JhZGllbnQgaWQ9Ikljb25pZnlJZDE3ZWNkYjI5MDRkMTc4ZWFiMTc5MzMiIGN4PSIyNi4zNzQiIGN5PSI3OC42NjgiIHI9IjYuOTIxIiBncmFkaWVudFRyYW5zZm9ybT0ibWF0cml4KC45MDU3IC40MjM4IC0uMzE0NCAuNjcxOSAyNy4yMiAxNC42MzIpIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+Cg08c3RvcCBvZmZzZXQ9IjAiIHN0b3AtY29sb3I9IiNmOThiMjUiPgoNPC9zdG9wPgoNPHN0b3Agb2Zmc2V0PSIuOTQ0IiBzdG9wLWNvbG9yPSIjZjk4YjI1IiBzdG9wLW9wYWNpdHk9IjAiPgoNPC9zdG9wPgoNPC9yYWRpYWxHcmFkaWVudD4KDTxwYXRoIGQ9Ik0zMi45MyA4My4xNmM0LjI4LTYuNS01LjIxLTguOTMtNS4yMS04LjkzbC0uMDEuMDFjMS42NSAyLjA1IDIuNCAzLjg0IDEuNDMgNS42MWMtMS4yMSAyLjIxLTQuODEgMi41My00LjgxIDIuNTNzNC45IDQuMzYgOC42Ljc4eiIgZmlsbD0idXJsKCNJY29uaWZ5SWQxN2VjZGIyOTA0ZDE3OGVhYjE3OTMzKSI+Cg08L3BhdGg+Cg08Zz4KDTxsaW5lYXJHcmFkaWVudCBpZD0iSWNvbmlmeUlkMTdlY2RiMjkwNGQxNzhlYWIxNzkzNCIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiIHgxPSI2NCIgeTE9Ijk0LjU2NSIgeDI9IjY0IiB5Mj0iMTIyLjExIj4KDTxzdG9wIG9mZnNldD0iMCIgc3RvcC1jb2xvcj0iI2Y3OGMxZiI+Cg08L3N0b3A+Cg08c3RvcCBvZmZzZXQ9Ii40OTQiIHN0b3AtY29sb3I9IiNmMzdmMjEiPgoNPC9zdG9wPgoNPHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjZWQ2ZDIzIj4KDTwvc3RvcD4KDTwvbGluZWFyR3JhZGllbnQ+Cg08cGF0aCBkPSJNNjQuMTMgOTQuNjhINjRjLTI1LjQ5LjAzLTUxLjEzIDcuNS01MS4xMyAyNS4yOFYxMjRoMTAyLjI3di00LjA0Yy0uMDEtMTYuNzYtMjUuNDEtMjUuMjgtNTEuMDEtMjUuMjh6IiBmaWxsPSJ1cmwoI0ljb25pZnlJZDE3ZWNkYjI5MDRkMTc4ZWFiMTc5MzQpIj4KDTwvcGF0aD4KDTwvZz4KDTxnPgoNPHBhdGggZD0iTTU0LjkyIDkwLjA4djkuOThjMCA0LjUxIDMuNyA4LjE3IDguMjYgOC4xN2gxLjY1YzQuNTYgMCA4LjI2LTMuNjYgOC4yNi04LjE3di05Ljk4SDU0LjkyeiIgZmlsbD0iI2VkYzM5MSI+Cg08L3BhdGg+Cg08L2c+Cg08Zz4KDTxwYXRoIGQ9Ik05MS4zMyA1MC40M0gzNi42N2MtNS44OSAwLTEwLjcxIDUuMTQtMTAuNzEgMTEuNDFzNC44MiAxMS40MSAxMC43MSAxMS40MWg1NC42NWM1Ljg5IDAgMTAuNzEtNS4xNCAxMC43MS0xMS40MXMtNC44MS0xMS40MS0xMC43LTExLjQxeiIgZmlsbD0iI2VkYzM5MSI+Cg08L3BhdGg+Cg08L2c+Cg08Zz4KDTxwYXRoIGQ9Ik02NCAxMS4wN2MtMTcuNCAwLTMzLjUyIDE4LjYxLTMzLjUyIDQ1LjM5YzAgMjYuNjQgMTYuNjEgMzkuODEgMzMuNTIgMzkuODFTOTcuNTIgODMuMSA5Ny41MiA1Ni40NmMwLTI2Ljc4LTE2LjEyLTQ1LjM5LTMzLjUyLTQ1LjM5eiIgZmlsbD0iI2Y5ZGRiZCI+Cg08L3BhdGg+Cg08L2c+Cg08ZyBmaWxsPSIjMzEyZDJkIj4KDTxlbGxpcHNlIGN4PSI0Ny41NiIgY3k9IjU4LjgxIiByeD0iNC45MyIgcnk9IjUuMSI+Cg08L2VsbGlwc2U+Cg08ZWxsaXBzZSBjeD0iODAuNDQiIGN5PSI1OC44MSIgcng9IjQuOTMiIHJ5PSI1LjEiPgoNPC9lbGxpcHNlPgoNPC9nPgoNPGcgZmlsbD0iIzQ1NDE0MCI+Cg08cGF0aCBkPSJNNTQuOTggNDkuODJjLS45My0xLjIzLTMuMDctMy4wMS03LjIzLTMuMDFzLTYuMzEgMS43OS03LjIzIDMuMDFjLS40MS41NC0uMzEgMS4xNy0uMDIgMS41NWMuMjYuMzUgMS4wNC42OCAxLjkuMzljLjg2LS4yOSAyLjU0LTEuMTYgNS4zNS0xLjE4YzIuODEuMDIgNC40OS44OSA1LjM1IDEuMThjLjg2LjI5IDEuNjQtLjAzIDEuOS0uMzljLjI5LS4zOC4zOS0xLjAxLS4wMi0xLjU1eiI+Cg08L3BhdGg+Cg08cGF0aCBkPSJNODcuNDggNDkuODJjLS45My0xLjIzLTMuMDctMy4wMS03LjIzLTMuMDFzLTYuMzEgMS43OS03LjIzIDMuMDFjLS40MS41NC0uMzEgMS4xNy0uMDIgMS41NWMuMjYuMzUgMS4wNC42OCAxLjkuMzljLjg2LS4yOSAyLjU0LTEuMTYgNS4zNS0xLjE4YzIuODEuMDIgNC40OS44OSA1LjM1IDEuMThjLjg2LjI5IDEuNjQtLjAzIDEuOS0uMzljLjI5LS4zOC4zOS0xLjAxLS4wMi0xLjU1eiI+Cg08L3BhdGg+Cg08L2c+Cg08cGF0aCBkPSJNNjcuODYgNjguMDZjLS4xMS0uMDQtLjIxLS4wNy0uMzItLjA4aC03LjA3Yy0uMTEuMDEtLjIyLjA0LS4zMi4wOGMtLjY0LjI2LS45OS45Mi0uNjkgMS42M2MuMy43MSAxLjcxIDIuNjkgNC41NSAyLjY5czQuMjUtMS45OSA0LjU1LTIuNjljLjI5LS43MS0uMDYtMS4zNy0uNy0xLjYzeiIgZmlsbD0iI2RiYTY4OSI+Cg08L3BhdGg+Cg08cGF0aCBkPSJNNzIuNDIgNzYuMTRjLTMuMTkgMS44OS0xMy42MyAxLjg5LTE2LjgxIDBjLTEuODMtMS4wOS0zLjcuNTgtMi45NCAyLjI0Yy43NSAxLjYzIDYuNDUgNS40MiAxMS4zNyA1LjQyczEwLjU1LTMuNzkgMTEuMy01LjQyYy43NS0xLjY2LTEuMDktMy4zMy0yLjkyLTIuMjR6IiBmaWxsPSIjNDQ0Ij4KDTwvcGF0aD4KDTxnPgoNPHBhdGggZD0iTTEwNC4wNyAyNS4xMWMtMi40NC0zLjctNy45MS04LjY0LTEyLjgyLTguOTdjLS43OS00LjcyLTUuODQtOC43Mi0xMC43My0xMC4yN2MtMTMuMjMtNC4xOS0yMS44NC41MS0yNi40NiAzLjA0Yy0uOTYuNTMtNy4xNyAzLjk3LTExLjUxIDEuNWMtMi43Mi0xLjU1LTIuNjctNS43NC0yLjY3LTUuNzRzLTguNTMgMy4yNS01LjYxIDEyLjI5Yy0yLjkzLjEyLTYuNzcgMS4zNi04LjggNS40N2MtMi40MiA0LjktMS41NiA4Ljk5LS44NiAxMC45NWMtMi41MiAyLjE0LTUuNjkgNi42OS0zLjUyIDEyLjZjMS42NCA0LjQ1IDguMTcgNi41IDguMTcgNi41Yy0uNDYgOC4wMSAxLjAzIDEyLjk0IDEuODIgMTQuOTRjLjE0LjM1LjYzLjMyLjcyLS4wNGMuOTktMy45NiA0LjM3LTE3LjggNC4wMy0yMC4yMWMwIDAgMTEuMzUtMi4yNSAyMi4xNy0xMC4yMmMyLjItMS42MiA0LjU5LTMgNy4xMy00LjAyYzEzLjU5LTUuNDEgMTYuNDQgMy44MiAxNi40NCAzLjgyczkuNDItMS44MSAxMi4yNiAxMS4yN2MxLjA3IDQuOSAxLjggMTIuNzUgMi40IDE4LjI0Yy4wNC4zOS41Ny40Ny43My4xMWMuOTUtMi4xOCAyLjg1LTYuNSAzLjMtMTAuOTFjLjE2LTEuNTUgNC4zNC0zLjYgNi4xNC0xMC4yNmMyLjM5LTguODgtLjU2LTE3LjQyLTIuMzMtMjAuMDl6IiBmaWxsPSIjZTYzZDAwIj4KDTwvcGF0aD4KDTxyYWRpYWxHcmFkaWVudCBpZD0iSWNvbmlmeUlkMTdlY2RiMjkwNGQxNzhlYWIxNzkzNSIgY3g9Ijg0LjYyNSIgY3k9IjQxLjQ3NCIgcj0iMzUuNjMzIiBncmFkaWVudFRyYW5zZm9ybT0ibWF0cml4KC4zMDc2IC45NTE1IC0uNzA2IC4yMjgyIDg3Ljg3MyAtNDguNTEzKSIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiPgoNPHN0b3Agb2Zmc2V0PSIuNjk5IiBzdG9wLWNvbG9yPSIjZjk4YjI1IiBzdG9wLW9wYWNpdHk9IjAiPgoNPC9zdG9wPgoNPHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjZjk4YjI1Ij4KDTwvc3RvcD4KDTwvcmFkaWFsR3JhZGllbnQ+Cg08cGF0aCBkPSJNMTAwLjIyIDU1LjVjLjE2LTEuNTUgNC4zNC0zLjYgNi4xNC0xMC4yNmMuMTktLjcxLjM1LTEuNDMuNS0yLjE1YzEuNDYtOC4wOS0xLjE2LTE1LjUyLTIuNzktMTcuOThjLTIuMjYtMy40Mi03LjEtNy44OS0xMS43LTguODFjLS40LS4wNS0uNzktLjEtMS4xNi0uMTJjMCAwIC4zMyAyLjE1LS41NCAzLjg2Yy0xLjEyIDIuMjItMy40MSAyLjc1LTMuNDEgMi43NWMxMS45OCAxMS45OCAxMS4xMiAyMiAxMi45NiAzMi43MXoiIGZpbGw9InVybCgjSWNvbmlmeUlkMTdlY2RiMjkwNGQxNzhlYWIxNzkzNSkiPgoNPC9wYXRoPgoNPHJhZGlhbEdyYWRpZW50IGlkPSJJY29uaWZ5SWQxN2VjZGIyOTA0ZDE3OGVhYjE3OTM2IiBjeD0iNDcuMjgiIGN5PSI0LjIiIHI9IjkuMzQzIiBncmFkaWVudFRyYW5zZm9ybT0ibWF0cml4KC44ODEzIC40NzI2IC0uNTYwMyAxLjA0NSA3Ljk2NiAtMjIuNTMyKSIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiPgoNPHN0b3Agb2Zmc2V0PSIuMzkzIiBzdG9wLWNvbG9yPSIjZjk4YjI1Ij4KDTwvc3RvcD4KDTxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iI2Y5OGIyNSIgc3RvcC1vcGFjaXR5PSIwIj4KDTwvc3RvcD4KDTwvcmFkaWFsR3JhZGllbnQ+Cg08cGF0aCBkPSJNNTYuOTUgNy4zOWMtMS4wOS41My0yLjA2IDEuMDYtMi44OSAxLjUxYy0uOTYuNTMtNy4xNyAzLjk3LTExLjUxIDEuNWMtMi42Ny0xLjUyLTIuNjctNS41OC0yLjY3LTUuNzJjLTEuMjMgMS41Ny00Ljk1IDEyLjc4IDUuOTMgMTMuNTNjNC42OS4zMiA3LjU4LTMuNzcgOS4zLTcuMjNjLjYxLTEuMjcgMS41OC0zLjEgMS44NC0zLjU5eiIgZmlsbD0idXJsKCNJY29uaWZ5SWQxN2VjZGIyOTA0ZDE3OGVhYjE3OTM2KSI+Cg08L3BhdGg+Cg08cmFkaWFsR3JhZGllbnQgaWQ9Ikljb25pZnlJZDE3ZWNkYjI5MDRkMTc4ZWFiMTc5MzciIGN4PSIxNjAuMzEyIiBjeT0iNjIuNTM4IiByPSIzNS40MSIgZ3JhZGllbnRUcmFuc2Zvcm09Im1hdHJpeCgtLjkzNzggLS4zOTQ0IC4yMTgyIC0uNTI4NSAyMDYuNzk1IDExOS41OCkiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIj4KDTxzdG9wIG9mZnNldD0iLjcwOSIgc3RvcC1jb2xvcj0iI2Y5OGIyNSIgc3RvcC1vcGFjaXR5PSIwIj4KDTwvc3RvcD4KDTxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iI2Y5OGIyNSI+Cg08L3N0b3A+Cg08L3JhZGlhbEdyYWRpZW50PgoNPHBhdGggZD0iTTc5LjE2IDUuNDdjNy4zMiAxLjk4IDEwLjg5IDUuNzEgMTIuMDggMTAuNjhjLjM1IDEuNDYuNzcgMTUuMDgtMjUuMjMtLjRjLTkuNjctNS43Ni03LjAzLTkuMzYtNS45LTkuNzdjNC40Mi0xLjYgMTAuODUtMi43MyAxOS4wNS0uNTF6IiBmaWxsPSJ1cmwoI0ljb25pZnlJZDE3ZWNkYjI5MDRkMTc4ZWFiMTc5MzcpIj4KDTwvcGF0aD4KDTxyYWRpYWxHcmFkaWVudCBpZD0iSWNvbmlmeUlkMTdlY2RiMjkwNGQxNzhlYWIxNzkzOCIgY3g9IjQ2LjM2OSIgY3k9IjE1Ljk2MiIgcj0iMTMuMDk5IiBncmFkaWVudFRyYW5zZm9ybT0ibWF0cml4KDEgMCAwIDEuMjIzMyAwIC0zLjU2NCkiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIj4KDTxzdG9wIG9mZnNldD0iLjc4NiIgc3RvcC1jb2xvcj0iI2Y5OGIyNSIgc3RvcC1vcGFjaXR5PSIwIj4KDTwvc3RvcD4KDTxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iI2Y5OGIyNSI+Cg08L3N0b3A+Cg08L3JhZGlhbEdyYWRpZW50PgoNPHBhdGggZD0iTTM5Ljg0IDQuNjhjLS4wMS4wMS0uMDMuMDEtLjA2LjAyaC0uMDFjLS45My4zOS04LjI0IDMuNzgtNS41MSAxMi4yNmw3Ljc4IDEuMjVjLTYuODktNi45OC0yLjE3LTEzLjU1LTIuMTctMTMuNTVzLS4wMi4wMS0uMDMuMDJ6IiBmaWxsPSJ1cmwoI0ljb25pZnlJZDE3ZWNkYjI5MDRkMTc4ZWFiMTc5MzgpIj4KDTwvcGF0aD4KDTxyYWRpYWxHcmFkaWVudCBpZD0iSWNvbmlmeUlkMTdlY2RiMjkwNGQxNzhlYWIxNzkzOSIgY3g9IjM4LjE1MyIgY3k9IjI1LjQ0MiIgcj0iMTYuMDgzIiBncmFkaWVudFRyYW5zZm9ybT0ibWF0cml4KC0uOTY1NyAtLjI1OTggLjI0MzIgLS45MDM3IDY4LjgxIDU4LjM0NykiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIj4KDTxzdG9wIG9mZnNldD0iLjUwMyIgc3RvcC1jb2xvcj0iI2Y5OGIyNSIgc3RvcC1vcGFjaXR5PSIwIj4KDTwvc3RvcD4KDTxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iI2Y5OGIyNSI+Cg08L3N0b3A+Cg08L3JhZGlhbEdyYWRpZW50PgoNPHBhdGggZD0iTTM5LjA3IDE3LjczbC00LjgxLS43N2MtLjE5IDAtLjgzLjA2LTEuMTguMTFjLTIuNzEuMzgtNS45IDEuNzgtNy42MyA1LjM2Yy0xLjg2IDMuODYtMS44MSA3LjE3LTEuMyA5LjM4Yy4xNS43NC40NSAxLjU4LjQ1IDEuNThzMi4zOC0yLjI2IDguMDUtMi40MWw2LjQyLTEzLjI1eiIgZmlsbD0idXJsKCNJY29uaWZ5SWQxN2VjZGIyOTA0ZDE3OGVhYjE3OTM5KSI+Cg08L3BhdGg+Cg08cmFkaWFsR3JhZGllbnQgaWQ9Ikljb25pZnlJZDE3ZWNkYjI5MDRkMTc4ZWFiMTc5NDAiIGN4PSIzNi4zOSIgY3k9IjQyLjkxNSIgcj0iMTYuODg2IiBncmFkaWVudFRyYW5zZm9ybT0ibWF0cml4KC45OTA3IC4xMzYzIC0uMTM1MyAuOTgzNyA2LjE0OCAtNC4yNTkpIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+Cg08c3RvcCBvZmZzZXQ9Ii42OTkiIHN0b3AtY29sb3I9IiNmOThiMjUiIHN0b3Atb3BhY2l0eT0iMCI+Cg08L3N0b3A+Cg08c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiNmOThiMjUiPgoNPC9zdG9wPgoNPC9yYWRpYWxHcmFkaWVudD4KDTxwYXRoIGQ9Ik0yNC4zNyAzMy41OGMtMi4zNyAyLjEtNS41NiA2Ljc5LTMuMjEgMTIuNjFjMS43OCA0LjM5IDguMDkgNi4yOSA4LjA5IDYuMjljMCAuMDIgMS4yNi4zOSAxLjkxLjM5bDEuNDgtMjEuOWMtMy4wMyAwLTUuOTQuOTEtNy44MiAyLjIyYy4wMy4wNC0uNDYuMzYtLjQ1LjM5eiIgZmlsbD0idXJsKCNJY29uaWZ5SWQxN2VjZGIyOTA0ZDE3OGVhYjE3OTQwKSI+Cg08L3BhdGg+Cg08L2c+Cg08L3N2Zz4=", So = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KDTwhLS0gVXBsb2FkZWQgdG86IFNWRyBSZXBvLCB3d3cuc3ZncmVwby5jb20sIEdlbmVyYXRvcjogU1ZHIFJlcG8gTWl4ZXIgVG9vbHMgLS0+Cjxzdmcgd2lkdGg9IjgwMHB4IiBoZWlnaHQ9IjgwMHB4IiB2aWV3Qm94PSIwIDAgNjQgNjQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIGFyaWEtaGlkZGVuPSJ0cnVlIiByb2xlPSJpbWciIGNsYXNzPSJpY29uaWZ5IGljb25pZnktLWVtb2ppb25lIiBwcmVzZXJ2ZUFzcGVjdFJhdGlvPSJ4TWlkWU1pZCBtZWV0Ij4KDTxwYXRoIGQ9Ik01Ny42IDEzLjdjLS43LTEtMS42LTEuNy0yLjctMi4yYy0zLjQtMS43LTExLjYtMS4zLTEyLjMtNS43Yy0uOS01LjctNS45LjEtNi44LjFjLTEuMSAwLTEuNi0zLjktMy43LTMuOWMtMi4yIDAtMi43IDMuOS0zLjcgMy45Yy0uOSAwLTUuOS01LjgtNi44LS4xYy0uNyA0LjMtOSA0LTEyLjMgNS43Yy0xIC41LTIgMS4yLTIuNyAyLjJjLS41LjguNiAxLjYgMS4yLjljMS42LTIgNC44LTIuNCA3LjEtMi44YzEuOS0uNCA0LS42IDUuOS0xLjRjMi42LTEgMi41LTQuOSAzLjMtNC45Yy42IDAgMi43IDMgNC41IDNjMS42IDAgMi42LTMuNyAzLjUtMy43Yy45IDAgMS45IDMuNyAzLjUgMy43YzEuOSAwIDQtMyA0LjYtM2MuOCAwIC43IDMuOSAzLjMgNC45YzEuOC44IDMuOSAxIDUuOSAxLjRjMi4zLjUgNS42LjggNy4xIDIuOGMuNS43IDEuNi0uMiAxLjEtLjkiIGZpbGw9IiMwMGI5ZjEiPgoNPC9wYXRoPgoNPHBhdGggZD0iTTUzIDU3YzAgMi44LTIuMiA1LTUgNUgxNmMtMi44IDAtNS0yLjItNS01VjM2aDQydjIxeiIgZmlsbD0iIzg5OTY3YSI+Cg08L3BhdGg+Cg08cGF0aCBkPSJNMzIgMTJjLTE1LjUgMC0yMSA4LjUtMjEgMjR2MjFoNDJWMzZjMC0xNS41LTUuNS0yNC0yMS0yNCIgZmlsbD0iI2I2YzRhNyI+Cg08L3BhdGg+Cg08ZyBmaWxsPSIjODk5NjdhIj4KDTxwYXRoIGQ9Ik0xMSA1NWMtMS4xIDAtMi0xLjItMi0yLjZ2LTYuOGMwLTEuNC45LTIuNiAyLTIuNnYxMiI+Cg08L3BhdGg+Cg08cGF0aCBkPSJNNTMgNDNjMS4xIDAgMiAxLjIgMiAyLjZ2Ni44YzAgMS40LS45IDIuNi0yIDIuNlY0MyI+Cg08L3BhdGg+Cg08L2c+Cg08ZyBmaWxsPSIjM2U0MzQ3Ij4KDTxwYXRoIGQ9Ik03IDIwSDV2MzBoNHYtMkg3eiI+Cg08L3BhdGg+Cg08cGF0aCBkPSJNNTcgMjB2MjhoLTJ2Mmg0VjIweiI+Cg08L3BhdGg+Cg08L2c+Cg08Y2lyY2xlIGN4PSI1OCIgY3k9IjIwIiByPSI0IiBmaWxsPSIjMDBiOWYxIj4KDTwvY2lyY2xlPgoNPGNpcmNsZSBjeD0iNiIgY3k9IjIwIiByPSI0IiBmaWxsPSIjZmY1MjYzIj4KDTwvY2lyY2xlPgoNPHBhdGggZD0iTTIxLjUgMzkuNWMtNC40IDAtOC0zLjYtOC04czMuNi04IDgtOHM4IDMuNiA4IDhzLTMuNiA4LTggOCIgZmlsbD0iI2VmZmZkOSI+Cg08L3BhdGg+Cg08Y2lyY2xlIGN4PSIyMS41IiBjeT0iMzEuNSIgcj0iNiIgZmlsbD0iIzU0NWI2MSI+Cg08L2NpcmNsZT4KDTxjaXJjbGUgY3g9IjIxLjUiIGN5PSIzMS41IiByPSIyLjMiIGZpbGw9IiNmZjUyNjMiPgoNPC9jaXJjbGU+Cg08cGF0aCBkPSJNNDIuNSAzOS41Yy00LjQgMC04LTMuNi04LThzMy42LTggOC04czggMy42IDggOHMtMy42IDgtOCA4IiBmaWxsPSIjZWZmZmQ5Ij4KDTwvcGF0aD4KDTxwYXRoIGQ9Ik00Mi41IDM3LjVjLTMuMyAwLTYtMi43LTYtNnMyLjctNiA2LTZzNiAyLjcgNiA2cy0yLjcgNi02IDYiIGZpbGw9IiM1NDViNjEiPgoNPC9wYXRoPgoNPGNpcmNsZSBjeD0iNDIuNSIgY3k9IjMxLjUiIHI9IjIuMyIgZmlsbD0iI2ZmNTI2MyI+Cg08L2NpcmNsZT4KDTxwYXRoIGQ9Ik0xOS44IDU0LjFjLTcuNCAwLTcuNC0xMyAwLTEzaDI0LjVjNy40IDAgNy40IDEzIDAgMTNIMTkuOCIgZmlsbD0iI2VmZmZkOSI+Cg08L3BhdGg+Cg08cGF0aCBkPSJNMjAuNSA1Mi42Yy02IDAtNi0xMCAwLTEwaDIzYzYgMCA2IDEwIDAgMTBoLTIzIiBmaWxsPSIjODk5NjdhIj4KDTwvcGF0aD4KDTxnIG9wYWNpdHk9Ii43IiBmaWxsPSIjM2U0MzQ3Ij4KDTxwYXRoIGQ9Ik0yMS4yIDUwLjdjMCAxLjItMiAxLjItMiAwdi02LjFjMC0xLjIgMi0xLjIgMiAwdjYuMSI+Cg08L3BhdGg+Cg08cGF0aCBkPSJNMjUuOSA1MC43YzAgMS4yLTIgMS4yLTIgMHYtNi4xYzAtMS4yIDItMS4yIDIgMHY2LjEiPgoNPC9wYXRoPgoNPHBhdGggZD0iTTMwLjYgNTAuN2MwIDEuMi0yIDEuMi0yIDB2LTYuMWMwLTEuMiAyLTEuMiAyIDB2Ni4xIj4KDTwvcGF0aD4KDTxwYXRoIGQ9Ik0zNS40IDUwLjdjMCAxLjItMiAxLjItMiAwdi02LjFjMC0xLjIgMi0xLjIgMiAwdjYuMSI+Cg08L3BhdGg+Cg08cGF0aCBkPSJNNDAuMSA1MC43YzAgMS4yLTIgMS4yLTIgMHYtNi4xYzAtMS4yIDItMS4yIDIgMHY2LjEiPgoNPC9wYXRoPgoNPHBhdGggZD0iTTQ0LjggNTAuN2MwIDEuMi0yIDEuMi0yIDB2LTYuMWMwLTEuMiAyLTEuMiAyIDB2Ni4xIj4KDTwvcGF0aD4KDTwvZz4KDTxjaXJjbGUgY3g9IjMyIiBjeT0iMzciIHI9IjIiIGZpbGw9IiNmNWY1ZjUiPgoNPC9jaXJjbGU+Cg08cGF0aCBmaWxsPSIjNTQ1YjYxIiBkPSJNMzAuMzE2IDM1Ljg2MmwuNTY2LS41NjVsMi44MjggMi44MjhsLS41NjUuNTY2eiI+Cg08L3BhdGg+Cg08L3N2Zz4=", Ms = [
  {
    active: !1,
    name: "Default",
    description: "Default settings only",
    tockUrl: "http://localhost:8080/io/01/cmb/web"
  },
  {
    active: !1,
    name: "Messenger",
    tockUrl: "http://localhost:8080/io/01/cmb/web",
    description: "Classic messenger style",
    options: {
      localStorage: {
        enabled: !0,
        prefix: "messenger"
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
    tockUrl: "http://localhost:8080/io/01/cmb/web",
    options: {
      localStorage: {
        enabled: !0,
        prefix: "vertical"
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
    tockUrl: "http://localhost:8080/io/01/cmb/web",
    options: {
      localStorage: {
        enabled: !0,
        prefix: "contemporary"
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
    tockUrl: "http://localhost:8080/io/01/cmb/web",
    options: {
      localStorage: {
        enabled: !0,
        prefix: "light"
      },
      preferences: {
        messages: {
          message: {
            header: {
              avatar: {
                botImage: {
                  src: So,
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
    tockUrl: "http://localhost:8080/io/01/cmb/web",
    options: {
      localStorage: {
        enabled: !0,
        prefix: "ladylike",
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
    tockUrl: "http://localhost:8080/io/01/cmb/web",
    options: {
      localStorage: {
        enabled: !0,
        prefix: "square"
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
    tockUrl: "http://localhost:8080/io/01/cmb/web",
    options: {
      localStorage: {
        enabled: !0,
        prefix: "funny"
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
                  src: So,
                  width: "1em",
                  height: "1em"
                },
                userImage: {
                  src: ws,
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
    tockUrl: "http://localhost:8080/io/01/cmb/web",
    options: {
      localStorage: {
        enabled: !0,
        prefix: "query_answer"
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
    tockUrl: "http://localhost:8080/io/01/cmb/web",
    options: {
      localStorage: {
        enabled: !0,
        prefix: "qa_mode_splitted"
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
], Is = { class: "panel-body-wrapper d-flex flex-column" }, ks = { class: "panel-body-body flex-grow-1" }, js = /* @__PURE__ */ w("div", { class: "option-category-header p-2 d-flex align-items-center border-top border-bottom" }, [
  /* @__PURE__ */ w("h6", { class: "m-0 ms-1" }, "Templates")
], -1), Ns = ["onClick"], xs = { class: "mb-0" }, Ss = {
  key: 0,
  class: "text-small mt-1"
}, Ls = /* @__PURE__ */ X({
  __name: "editor-templates",
  setup(e) {
    q();
    const t = Y(Ms);
    function o(n) {
      t.value.forEach((r) => {
        r.active = !1;
      }), n.active = !0;
      let i = document.documentElement;
      Kt().forEach((r) => {
        i.style.setProperty(r.key, r.initialValue);
      }), n.styling && Object.entries(n.styling).forEach((r) => {
        i.style.setProperty(r[0], r[1]);
      }), Rn(n.tockUrl, n.options);
    }
    return (n, i) => (v(), I("div", Is, [
      w("div", ks, [
        js,
        (v(!0), I(K, null, ue(t.value, (s) => (v(), I("div", {
          class: Q(["templates-list-entry cursor-pointer py-2 px-3", { active: s.active }]),
          onClick: (r) => o(s)
        }, [
          w("h6", xs, V(s.name), 1),
          s.description ? (v(), I("div", Ss, V(s.description), 1)) : z("", !0)
        ], 10, Ns))), 256))
      ])
    ]));
  }
});
function ot(e, t = 300) {
  let o;
  return (...n) => {
    clearTimeout(o), o = setTimeout(() => {
      e(...n);
    }, t);
  };
}
function Lo(e) {
  return !!(e && typeof e == "object" && !Array.isArray(e));
}
async function In(e) {
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
const Ts = {
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
}, Ds = { class: "form-label lh-1 d-flex gap-4 align-items-center justify-content-between position-relative" }, Cs = { class: "input-group input-group-sm" }, Os = /* @__PURE__ */ w("i", { class: "bi bi bi-caret-down-fill" }, null, -1), As = [
  Os
], Es = ["contenteditable"], zs = { key: 0 }, Ps = { key: 1 }, $s = ["onClick"], Ys = /* @__PURE__ */ w("i", { class: "bi bi-arrow-90deg-left" }, null, -1), Gs = [
  Ys
], Rs = {
  key: 0,
  class: "list-group variable-suggestions"
}, Ws = ["onClick"], Zs = {
  key: 1,
  class: "form-text text-small"
}, Vs = /* @__PURE__ */ w("span", { class: "text-muted" }, "Default value : ", -1), Bs = /* @__PURE__ */ X({
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
    const t = q(), o = e;
    Je(() => {
      i() && n();
    }), Yn(() => {
      document.removeEventListener("click", N);
    }), t.$onAction(({ name: p, store: T, args: A, after: D }) => {
      p === "targetStylingVariable" && D(() => {
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
      var D;
      document.documentElement.style.setProperty(o.variable.key, p);
      const A = (D = o.variables) == null ? void 0 : D.find((G) => G.key === o.variable.key);
      A && (A.value = p);
    }
    function l() {
      o.variable && a(o.variable.initialValue);
    }
    function c() {
      return Ts[o.variable.name];
    }
    const d = Y(null);
    function m() {
      const p = o.variable.value.toString().trim(), T = /var\(([^)]+)\)/g;
      let A = [...p.matchAll(T)], D = [], G = 0;
      return A.length ? (A.forEach((P) => {
        P.index && P.index > G && D.push({ str: p.substring(G, P.index) }), D.push({ str: P[0], varName: P[1] }), G = P.index + P[0].length;
      }), G < p.length && D.push({ str: p.substring(G, p.length) })) : D.push({ str: p }), D;
    }
    function h(p, T) {
      p.stopPropagation(), t.jumpToStylingVariable(T);
    }
    let g;
    function S() {
      s.value = !0, g = o.variable.value.toString();
    }
    function L() {
      s.value = !1;
    }
    function C(p) {
      p.preventDefault(), p.stopPropagation();
    }
    function O(p) {
      var A;
      let T = (A = p == null ? void 0 : p.target) == null ? void 0 : A.innerText;
      T.toString().trim().length < 1 && (T = "unset"), a(T);
    }
    function M() {
      t.stylingVariableReached(), S(), setTimeout(() => {
        j(999, 999);
      });
    }
    function j(p = 0, T = 0) {
      var D, G, P;
      const A = document.getSelection();
      if (A) {
        const R = document.createRange(), F = (D = d.value) == null ? void 0 : D.children[0], ze = ((P = (G = F == null ? void 0 : F.childNodes[0]) == null ? void 0 : G.textContent) == null ? void 0 : P.length) || 0;
        F != null && F.childNodes[0] && (R.setStart(F == null ? void 0 : F.childNodes[0], Math.min(ze, p)), R.setEnd(F == null ? void 0 : F.childNodes[0], Math.min(ze, T)), A.removeAllRanges(), A.addRange(R));
      }
    }
    function E(p) {
      var A;
      C(p);
      let T = (A = p.clipboardData) == null ? void 0 : A.getData("text/plain");
      if (T) {
        const D = document.getSelection(), G = D == null ? void 0 : D.getRangeAt(0);
        if (G) {
          const P = o.variable.value.toString(), R = P.substring(0, G.startOffset), F = P.substring(G.endOffset);
          T = R + T + F;
        }
        a(T), g = o.variable.value.toString();
      }
    }
    function y(p) {
      if (p.target, ["ArrowUp", "ArrowDown"].includes(p.key)) {
        C(p);
        const D = o.variable.value.toString().split(" ");
        let G = document.getSelection(), P = 0;
        G && (P = G.getRangeAt(0).startOffset);
        let R, F, ze = 0;
        for (let re = 0; re < D.length; re++) {
          if (P <= ze + D[re].length) {
            R = D[re], F = re;
            break;
          }
          ze += D[re].length + 1;
        }
        var T = /^\d*\.?\d+(?:em|rem|px|%|vh|vw|pt)?/g;
        if (T.test(R)) {
          const re = CSSNumericValue.parse(R);
          let Xe = 1;
          p.ctrlKey && (Xe /= 10), p.shiftKey && (Xe *= 10), p.key === "ArrowUp" && (re.value += Xe), p.key === "ArrowDown" && (re.value -= Xe), D[F] = re.toString();
          const Xt = D.join(" ");
          a(Xt), g = Xt, setTimeout(() => {
            j(P, P);
          });
        }
      }
    }
    let k = Y(!1);
    function f(p) {
      C(p), k.value = !k.value, k.value ? document.addEventListener("click", N) : document.removeEventListener("click", N);
    }
    function N(p) {
      k.value && f(p);
    }
    function x(p) {
      var A;
      const T = (A = o.variables) == null ? void 0 : A.find((D) => D.key === p);
      return T ? T.value.toString() : null;
    }
    function _(p) {
      return !(!p.startsWith("--tvk_colors") || [
        "--tvk_colors_brand-hue",
        "--tvk_colors_brand-lightness",
        "--tvk_colors_brand-saturation"
      ].includes(p));
    }
    function b(p) {
      In(p);
    }
    return (p, T) => {
      const A = yt("tooltip");
      return v(), I("div", {
        ref_key: "wrapperRef",
        ref: r,
        class: Q(["position-relative", { "targeted-item": i() }])
      }, [
        w("label", Ds, [
          w("span", {
            class: Q(["text-nowrap", {
              "fst-italic": o.variable.value != o.variable.initialValue
            }])
          }, V(o.variable.name), 3),
          W((v(), I("span", {
            class: "text-muted text-small text-end text-truncate py-1",
            onClick: T[0] || (T[0] = (D) => b(o.variable.key))
          }, [
            be(V(o.variable.key), 1)
          ])), [
            [A, o.variable.key + " (click to copy)"]
          ])
        ]),
        w("div", Cs, [
          c() ? (v(), I("button", {
            key: 0,
            class: "btn btn-secondary px-1",
            type: "button",
            onClick: f
          }, As)) : z("", !0),
          w("div", {
            class: "form-control",
            ref_key: "inputRef",
            ref: d,
            spellcheck: "false",
            contenteditable: u(s),
            onClick: T[1] || (T[1] = (D) => S()),
            onBlur: T[2] || (T[2] = (D) => L()),
            onFocus: T[3] || (T[3] = (D) => M()),
            onKeyup: T[4] || (T[4] = (D) => C(D)),
            onPaste: T[5] || (T[5] = (D) => E(D)),
            onInput: T[6] || (T[6] = Gn((D) => O(D), ["self"])),
            onKeydown: T[7] || (T[7] = (D) => y(D)),
            tabindex: "0"
          }, [
            u(s) ? (v(), I(K, { key: 0 }, [
              be(V(u(g)), 1)
            ], 64)) : z("", !0),
            u(s) ? z("", !0) : (v(!0), I(K, { key: 1 }, ue(m(), (D) => (v(), I(K, null, [
              D.varName ? z("", !0) : (v(), I("span", zs, V(D.str), 1)),
              D.varName ? (v(), I("span", Ps, [
                _(D.varName) ? (v(), I("span", {
                  key: 0,
                  style: Ge({ "--prvw-color": "var(" + D.varName + ")" }),
                  class: "variable-color-preview"
                }, null, 4)) : z("", !0),
                be("var("),
                W((v(), I("a", {
                  onClick: (G) => h(G, D.varName),
                  href: "javascript:void(null)",
                  class: "variable-link"
                }, [
                  be(V(D.varName), 1)
                ], 8, $s)), [
                  [A, x(D.varName)]
                ]),
                be(") ")
              ])) : z("", !0)
            ], 64))), 256))
          ], 40, Es),
          o.variable.value != o.variable.initialValue ? W((v(), I("button", {
            key: 1,
            class: "btn btn-secondary",
            type: "button",
            id: "button-addon2",
            onClick: T[8] || (T[8] = (D) => l()),
            tabindex: "1"
          }, Gs)), [
            [A, "Restore default value"]
          ]) : z("", !0)
        ]),
        u(k) ? (v(), I("ul", Rs, [
          (v(!0), I(K, null, ue(c(), (D) => (v(), I("li", {
            class: "list-group-item cursor-pointer",
            onClick: (G) => a(D)
          }, V(D), 9, Ws))), 256))
        ])) : z("", !0),
        o.variable.value != o.variable.initialValue ? (v(), I("div", Zs, [
          Vs,
          be(V(o.variable.initialValue.toString()), 1)
        ])) : z("", !0)
      ], 2);
    };
  }
}), Fs = {
  key: 0,
  class: "bi bi-chevron-right"
}, Us = {
  key: 1,
  class: "bi bi-chevron-down"
}, Hs = { class: "p-3 border-bottom" }, Qs = /* @__PURE__ */ X({
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
    const t = q(), o = e;
    let n = Y(!0);
    return Je(() => {
      o.path.length > 1 && (n.value = !1);
    }), t.$onAction(({ name: i, store: s, args: r, after: a }) => {
      i === "targetStylingVariable" && a(() => {
        if (t.stylingTargetedVar) {
          const l = Jt(t.stylingTargetedVar);
          let c = !0;
          if (o.path.length < l.categories.length)
            c = !1;
          else
            for (let d = 0; d < o.path.length; d++)
              o.path[d] !== l.categories[d] && (c = !1);
          c && (n.value = !0);
        }
      });
    }), (i, s) => {
      var a;
      const r = Oe("editorVariablesGroup", !0);
      return v(), I(K, null, [
        w("div", {
          class: Q(["option-category-header p-2 d-flex align-items-center border-top border-bottom", {
            "cursor-pointer": o.path.length > 1
          }]),
          onClick: s[0] || (s[0] = (l) => o.path.length > 1 ? je(n) ? n.value = !u(n) : n = !u(n) : null)
        }, [
          o.path.length > 1 && !u(n) ? (v(), I("i", Fs)) : z("", !0),
          o.path.length > 1 && u(n) ? (v(), I("i", Us)) : z("", !0),
          w("h6", {
            class: Q(["m-0 ms-1", { "fw-bold": o.path.length === 1 }])
          }, V((a = e.path) == null ? void 0 : a.join(" | ")), 3)
        ], 2),
        u(n) ? (v(!0), I(K, { key: 0 }, ue(u(ys)(e.variables, e.path), (l, c) => (v(), I("div", Hs, [
          (v(), J(Bs, {
            variables: e.variables,
            variable: l,
            key: l.key
          }, null, 8, ["variables", "variable"]))
        ]))), 256)) : z("", !0),
        (v(!0), I(K, null, ue(u(bs)(e.variables, e.path), (l) => (v(), I("div", null, [
          (v(), J(r, {
            variables: e.variables,
            path: [...e.path, l],
            key: [...e.path, l].join("")
          }, null, 8, ["variables", "path"]))
        ]))), 256))
      ], 64);
    };
  }
}), Js = { class: "panel-body-wrapper d-flex flex-column" }, Ks = { class: "panel-body-header pt-1 px-1 border-bottom" }, Xs = { class: "d-flex flex-wrap justify-content-between" }, qs = ["onClick"], er = { class: "panel-body-body flex-grow-1" }, tr = /* @__PURE__ */ X({
  __name: "editor-variables",
  setup(e) {
    const t = q();
    t.$onAction(({ name: s, store: r, args: a, after: l }) => {
      s === "refreshEditorPanels" && l(() => {
        i();
      });
    });
    const o = Y([]), n = Y([]);
    function i() {
      o.value = Kt(), n.value = vs(o.value);
    }
    return (s, r) => (v(), I("div", Js, [
      w("div", Ks, [
        w("div", Xs, [
          (v(!0), I(K, null, ue(n.value, (a) => (v(), I("div", {
            class: Q(["tag cursor-pointer me-1 mb-1 text-nowrap flex-fill text-center", { active: u(t).stylingCategory === a }]),
            onClick: (l) => u(t).setStylingCategory(a)
          }, V(a), 11, qs))), 256))
        ])
      ]),
      w("div", er, [
        (v(), J(Qs, {
          variables: o.value,
          path: [u(t).stylingCategory],
          key: u(t).currentCustomizationName + u(t).stylingCategory
        }, null, 8, ["variables", "path"]))
      ])
    ]));
  }
}), or = { class: "form-label lh-1 d-flex gap-4 align-items-center justify-content-between position-relative" }, nr = { class: "text-muted text-small text-end text-truncate rtl" }, ir = { class: "form-text text-small mb-2" }, sr = { class: "input-group input-group-sm" }, rr = ["value", "disabled"], ar = ["value", "disabled"], lr = {
  key: 2,
  class: "form-check form-switch"
}, cr = ["id", "checked", "disabled"], ur = ["for"], dr = { key: 0 }, pr = { key: 1 }, hr = { key: 3 }, gr = { class: "form-check form-switch" }, fr = ["id", "disabled"], mr = ["for"], _r = { key: 0 }, vr = { key: 1 }, yr = {
  key: 0,
  class: "input-group-sm imageDef-wrapper mt-2"
}, br = /* @__PURE__ */ w("label", { class: "form-label text-small mb-0" }, "Src (url or svg data image)", -1), wr = ["value", "disabled"], Mr = { class: "d-flex gap-3" }, Ir = { class: "input-group-sm" }, kr = /* @__PURE__ */ w("label", { class: "form-label text-small mb-0" }, "Width", -1), jr = ["value", "disabled"], Nr = { class: "input-group-sm" }, xr = /* @__PURE__ */ w("label", { class: "form-label text-small mb-0" }, "Height", -1), Sr = ["value", "disabled"], Lr = {
  key: 4,
  class: "w-100"
}, Tr = {
  key: 0,
  class: "d-flex text-small"
}, Dr = /* @__PURE__ */ w("div", { style: { width: "45%" } }, "Header name", -1), Cr = /* @__PURE__ */ w("div", null, "Header value", -1), Or = [
  Dr,
  Cr
], Ar = { class: "input-group input-group-sm mb-1" }, Er = ["value", "onInput", "disabled"], zr = ["value", "onInput", "disabled"], Pr = ["onClick", "disabled"], $r = /* @__PURE__ */ w("i", { class: "bi bi-trash" }, null, -1), Yr = [
  $r
], Gr = ["disabled"], nt = 500, Pe = "New-Header-Name", Rr = /* @__PURE__ */ X({
  __name: "editor-options-entry",
  props: {
    optionsModel: {},
    group: {},
    path: {},
    value: {},
    currentOptions: {}
  },
  setup(e) {
    const t = q();
    t.$onAction(({ name: M, store: j, args: E, after: y }) => {
      M === "refreshEditorPanels" && y(() => {
        setTimeout(() => {
          a();
        });
      });
    });
    const o = e;
    let n = Y(!0), i = Y(), s = Y(!1), r;
    Je(() => {
      r = [o.group, o.path].join(".");
      const M = o.optionsModel[o.group], j = o.currentOptions[o.group], E = l(M, o.path), y = l(j, o.path);
      a(), typeof y > "u" ? i.value = E.default : i.value = y, o.value.type === "ImageDef" && i.value && (s.value = !0);
    });
    function a() {
      let M = !0;
      const j = o.optionsModel[o.group], E = l(j, o.path);
      E.conditions && E.conditions.forEach((y) => {
        l(o.currentOptions, y) || (M = !1);
      }), n.value = M;
    }
    const l = (M, j) => j.split(".").reduce((E, y) => y in E ? E[y] : void 0, M), c = ot((M) => {
      Se(r, M), i.value = M, t.refreshEditorPanels();
    }, nt);
    Wt(s, (M, j) => {
      M || (Se(r, void 0), i.value = void 0);
    });
    const d = ot((M, j) => {
      const E = [r, M].join(".");
      Se(E, j);
      let y = i.value ? i.value : {};
      y[M] = j, i.value = y;
    }, nt), m = ot((M, j) => {
      i.value[j] = i.value[M], delete i.value[M], Se(r, i.value);
    }, nt), h = ot((M, j) => {
      i.value[M] = j, Se(r, i.value);
    }, nt);
    function g(M) {
      delete i.value[M], Object.keys(i.value).length < 1 && (i.value = void 0), Se(r, i.value);
    }
    const S = Y({});
    function L(M, j) {
      S.value[M] = j;
    }
    function C() {
      return !i.value || i.value[Pe] === void 0;
    }
    function O() {
      i.value ? i.value[Pe] = "" : i.value = { [Pe]: "" }, setTimeout(() => {
        S.value[Pe].focus(), S.value[Pe].select();
      });
    }
    return (M, j) => {
      var y, k, f;
      const E = yt("tooltip");
      return v(), I("div", {
        class: Q(["p-3 border-bottom", { inactive: !u(n) }])
      }, [
        w("label", or, [
          w("span", {
            class: Q(["text-nowrap", { "fst-italic": u(i) != o.value.default }])
          }, V(o.value.title), 3),
          W((v(), I("span", nr, [
            be(V(u(r)), 1)
          ])), [
            [E, u(r)]
          ])
        ]),
        w("div", ir, V(o.value.description), 1),
        w("div", sr, [
          o.value.type === "string" ? (v(), I("input", {
            key: 0,
            class: "form-control",
            placeholder: "Not specified",
            spellcheck: "false",
            value: u(i),
            onInput: j[0] || (j[0] = (N) => {
              var x;
              return u(c)((x = N == null ? void 0 : N.target) == null ? void 0 : x.value);
            }),
            disabled: !u(n)
          }, null, 40, rr)) : z("", !0),
          o.value.type === "number" ? (v(), I("input", {
            key: 1,
            type: "number",
            class: "form-control",
            placeholder: "Not specified",
            spellcheck: "false",
            value: u(i),
            onInput: j[1] || (j[1] = (N) => {
              var x;
              return u(c)((x = N == null ? void 0 : N.target) == null ? void 0 : x.value);
            }),
            disabled: !u(n)
          }, null, 40, ar)) : z("", !0),
          o.value.type === "boolean" ? (v(), I("div", lr, [
            w("input", {
              class: "form-check-input",
              type: "checkbox",
              role: "switch",
              id: M.path,
              checked: u(i),
              onInput: j[2] || (j[2] = (N) => {
                var x;
                return u(c)((x = N == null ? void 0 : N.target) == null ? void 0 : x.checked);
              }),
              disabled: !u(n)
            }, null, 40, cr),
            w("label", {
              class: "form-check-label",
              for: M.path
            }, [
              u(i) ? (v(), I("span", dr, "enabled")) : z("", !0),
              u(i) ? z("", !0) : (v(), I("span", pr, "disabled"))
            ], 8, ur)
          ])) : z("", !0),
          o.value.type === "ImageDef" ? (v(), I("div", hr, [
            w("div", gr, [
              W(w("input", {
                class: "form-check-input",
                type: "checkbox",
                role: "switch",
                id: M.path,
                "onUpdate:modelValue": j[3] || (j[3] = (N) => je(s) ? s.value = N : s = N),
                disabled: !u(n)
              }, null, 8, fr), [
                [Ao, u(s)]
              ]),
              w("label", {
                class: "form-check-label",
                for: M.path
              }, [
                u(s) ? (v(), I("span", _r, "enabled")) : z("", !0),
                u(s) ? z("", !0) : (v(), I("span", vr, "disabled"))
              ], 8, mr)
            ]),
            u(s) ? (v(), I("div", yr, [
              br,
              w("input", {
                class: "form-control",
                placeholder: "Not specified",
                spellcheck: "false",
                value: (y = u(i)) == null ? void 0 : y.src,
                onInput: j[4] || (j[4] = (N) => {
                  var x;
                  return u(d)("src", (x = N == null ? void 0 : N.target) == null ? void 0 : x.value);
                }),
                disabled: !u(n)
              }, null, 40, wr),
              w("div", Mr, [
                w("div", Ir, [
                  kr,
                  w("input", {
                    class: "form-control",
                    placeholder: "Not specified",
                    spellcheck: "false",
                    value: (k = u(i)) == null ? void 0 : k.width,
                    onInput: j[5] || (j[5] = (N) => {
                      var x;
                      return u(d)(
                        "width",
                        (x = N == null ? void 0 : N.target) == null ? void 0 : x.value
                      );
                    }),
                    disabled: !u(n)
                  }, null, 40, jr)
                ]),
                w("div", Nr, [
                  xr,
                  w("input", {
                    class: "form-control",
                    placeholder: "Not specified",
                    spellcheck: "false",
                    value: (f = u(i)) == null ? void 0 : f.height,
                    onInput: j[6] || (j[6] = (N) => {
                      var x;
                      return u(d)(
                        "height",
                        (x = N == null ? void 0 : N.target) == null ? void 0 : x.value
                      );
                    }),
                    disabled: !u(n)
                  }, null, 40, Sr)
                ])
              ])
            ])) : z("", !0)
          ])) : z("", !0),
          o.value.type === "KeyValues" ? (v(), I("div", Lr, [
            u(i) ? (v(), I("div", Tr, Or)) : z("", !0),
            (v(!0), I(K, null, ue(u(i), (N, x) => (v(), I("div", Ar, [
              w("input", {
                class: "form-control",
                placeholder: "Not specified",
                spellcheck: "false",
                value: x,
                ref_for: !0,
                ref: (_) => L(x, _),
                onInput: (_) => {
                  var b;
                  return u(m)(
                    x,
                    (b = _ == null ? void 0 : _.target) == null ? void 0 : b.value
                  );
                },
                disabled: !u(n)
              }, null, 40, Er),
              w("input", {
                class: "form-control",
                placeholder: "Not specified",
                spellcheck: "false",
                value: N,
                onInput: (_) => {
                  var b;
                  return u(h)(
                    x,
                    (b = _ == null ? void 0 : _.target) == null ? void 0 : b.value
                  );
                },
                disabled: !u(n)
              }, null, 40, zr),
              w("button", {
                class: "btn btn-danger btn-sm",
                onClick: (_) => g(x),
                disabled: !u(n)
              }, Yr, 8, Pr)
            ]))), 256)),
            C() ? (v(), I("button", {
              key: 1,
              class: "btn btn-link btn-sm p-0",
              onClick: O,
              disabled: !u(n)
            }, " Add new header ", 8, Gr)) : z("", !0)
          ])) : z("", !0)
        ])
      ], 2);
    };
  }
}), Wr = /* @__PURE__ */ X({
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
    Je(() => {
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
    return (i, s) => (v(!0), I(K, null, ue(u(o), (r) => (v(), J(Rr, {
      "options-model": t.optionsModel,
      group: t.group,
      path: r[0],
      value: r[1],
      "current-options": t.currentOptions
    }, null, 8, ["options-model", "group", "path", "value", "current-options"]))), 256));
  }
}), Zr = { class: "option-category-header p-2 d-flex align-items-center border-top border-bottom" }, Vr = { class: "m-0 ms-1" }, kn = /* @__PURE__ */ X({
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
    return (o, n) => (v(), I(K, null, [
      w("div", Zr, [
        w("h6", Vr, V(t.group), 1)
      ]),
      Rt(Wr, {
        "options-model": t.optionsModel,
        group: t.group,
        "current-options": t.currentOptions
      }, null, 8, ["options-model", "group", "current-options"])
    ], 64));
  }
}), Br = { class: "panel-body-wrapper d-flex flex-column" }, Fr = { class: "panel-body-body flex-grow-1" }, Ur = /* @__PURE__ */ X({
  __name: "editor-preferences",
  setup(e) {
    const t = q();
    let o = Y(), n = Y([]), i = Y();
    t.$onAction(({ name: r, store: a, args: l, after: c }) => {
      r === "refreshEditorPanels" && c(() => {
        s();
      });
    });
    function s() {
      i.value = ut();
      const r = dt();
      o.value = r, n.value = ["localStorage", "initialization", "preferences"];
    }
    return (r, a) => (v(), I("div", Br, [
      w("div", Fr, [
        (v(!0), I(K, null, ue(u(n), (l, c) => (v(), J(kn, {
          "options-model": u(o),
          group: l,
          "current-options": u(i),
          index: c
        }, null, 8, ["options-model", "group", "current-options", "index"]))), 256))
      ])
    ]));
  }
}), Hr = { class: "panel-body-wrapper d-flex flex-column" }, Qr = { class: "panel-body-body flex-grow-1" }, Jr = /* @__PURE__ */ X({
  __name: "editor-wording",
  setup(e) {
    const t = q();
    let o = Y(), n = Y([]), i = Y();
    t.$onAction(({ name: r, store: a, args: l, after: c }) => {
      r === "refreshEditorPanels" && c(() => {
        s();
      });
    });
    function s() {
      i.value = ut();
      const r = dt();
      o.value = r, n.value = ["wording"];
    }
    return (r, a) => (v(), I("div", Hr, [
      w("div", Qr, [
        (v(!0), I(K, null, ue(u(n), (l, c) => (v(), J(kn, {
          "options-model": u(o),
          group: l,
          "current-options": u(i),
          index: c
        }, null, 8, ["options-model", "group", "current-options", "index"]))), 256))
      ])
    ]));
  }
}), Kr = (e, t) => {
  const o = e.__vccOpts || e;
  for (const [n, i] of t)
    o[n] = i;
  return o;
}, Xr = /* @__PURE__ */ Kr(Jr, [["__scopeId", "data-v-8ed05402"]]);
var $e = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, jn = { exports: {} };
(function(e, t) {
  (function(o, n) {
    n();
  })($e, function() {
    function o(c, d) {
      return typeof d > "u" ? d = { autoBom: !1 } : typeof d != "object" && (console.warn("Deprecated: Expected third argument to be a object"), d = { autoBom: !d }), d.autoBom && /^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(c.type) ? new Blob(["\uFEFF", c], { type: c.type }) : c;
    }
    function n(c, d, m) {
      var h = new XMLHttpRequest();
      h.open("GET", c), h.responseType = "blob", h.onload = function() {
        l(h.response, d, m);
      }, h.onerror = function() {
        console.error("could not download file");
      }, h.send();
    }
    function i(c) {
      var d = new XMLHttpRequest();
      d.open("HEAD", c, !1);
      try {
        d.send();
      } catch {
      }
      return 200 <= d.status && 299 >= d.status;
    }
    function s(c) {
      try {
        c.dispatchEvent(new MouseEvent("click"));
      } catch {
        var d = document.createEvent("MouseEvents");
        d.initMouseEvent("click", !0, !0, window, 0, 0, 0, 80, 20, !1, !1, !1, !1, 0, null), c.dispatchEvent(d);
      }
    }
    var r = typeof window == "object" && window.window === window ? window : typeof self == "object" && self.self === self ? self : typeof $e == "object" && $e.global === $e ? $e : void 0, a = r.navigator && /Macintosh/.test(navigator.userAgent) && /AppleWebKit/.test(navigator.userAgent) && !/Safari/.test(navigator.userAgent), l = r.saveAs || (typeof window != "object" || window !== r ? function() {
    } : "download" in HTMLAnchorElement.prototype && !a ? function(c, d, m) {
      var h = r.URL || r.webkitURL, g = document.createElement("a");
      d = d || c.name || "download", g.download = d, g.rel = "noopener", typeof c == "string" ? (g.href = c, g.origin === location.origin ? s(g) : i(g.href) ? n(c, d, m) : s(g, g.target = "_blank")) : (g.href = h.createObjectURL(c), setTimeout(function() {
        h.revokeObjectURL(g.href);
      }, 4e4), setTimeout(function() {
        s(g);
      }, 0));
    } : "msSaveOrOpenBlob" in navigator ? function(c, d, m) {
      if (d = d || c.name || "download", typeof c != "string")
        navigator.msSaveOrOpenBlob(o(c, m), d);
      else if (i(c))
        n(c, d, m);
      else {
        var h = document.createElement("a");
        h.href = c, h.target = "_blank", setTimeout(function() {
          s(h);
        });
      }
    } : function(c, d, m, h) {
      if (h = h || open("", "_blank"), h && (h.document.title = h.document.body.innerText = "downloading..."), typeof c == "string")
        return n(c, d, m);
      var g = c.type === "application/octet-stream", S = /constructor/i.test(r.HTMLElement) || r.safari, L = /CriOS\/[\d]+/.test(navigator.userAgent);
      if ((L || g && S || a) && typeof FileReader < "u") {
        var C = new FileReader();
        C.onloadend = function() {
          var j = C.result;
          j = L ? j : j.replace(/^data:[^;]*;/, "data:attachment/file;"), h ? h.location.href = j : location = j, h = null;
        }, C.readAsDataURL(c);
      } else {
        var O = r.URL || r.webkitURL, M = O.createObjectURL(c);
        h ? h.location = M : location.href = M, h = null, setTimeout(function() {
          O.revokeObjectURL(M);
        }, 4e4);
      }
    });
    r.saveAs = l.saveAs = l, e.exports = l;
  });
})(jn);
var qr = jn.exports;
const ea = { class: "panel-body-wrapper d-flex flex-column" }, ta = { class: "panel-body-header py-2 px-3 border-bottom text-small d-flex align-items-center" }, oa = { class: "form-check form-check-inline no-min-height" }, na = ["value"], ia = /* @__PURE__ */ w("label", {
  class: "form-check-label",
  for: "outputFormatHtml"
}, "html", -1), sa = { class: "form-check form-check-inline no-min-height" }, ra = ["value"], aa = /* @__PURE__ */ w("label", {
  class: "form-check-label",
  for: "outputFormatJs"
}, "json", -1), la = { class: "form-check form-switch no-min-height ms-auto" }, ca = /* @__PURE__ */ w("label", {
  class: "form-check-label",
  for: "outputMinify"
}, "Minify", -1), ua = { class: "panel-body-body tvke-secondary-bg flex-grow-1 text-small p-3" }, da = {
  key: 0,
  class: "text-center fst-italic pt-3"
}, pa = {
  key: 1,
  class: "mb-2"
}, ha = {
  key: 0,
  class: "mb-2"
}, ga = {
  key: 1,
  class: "mb-2"
}, fa = { class: "output-block d-flex" }, ma = { class: "pre-wrap mb-0 flex-grow-1" }, _a = { class: "d-flex flex-column" }, va = /* @__PURE__ */ w("i", { class: "bi bi-copy" }, null, -1), ya = [
  va
], ba = /* @__PURE__ */ w("i", { class: "bi bi-file-earmark-arrow-down" }, null, -1), wa = [
  ba
], Ma = { key: 2 }, Ia = {
  key: 0,
  class: "mb-2"
}, ka = {
  key: 1,
  class: "mb-2"
}, ja = { class: "output-block d-flex" }, Na = { class: "pre-wrap mb-0 flex-grow-1" }, xa = { class: "d-flex flex-column" }, Sa = /* @__PURE__ */ w("i", { class: "bi bi-copy" }, null, -1), La = [
  Sa
], Ta = /* @__PURE__ */ w("i", { class: "bi bi-file-earmark-arrow-down" }, null, -1), Da = [
  Ta
], Ca = /* @__PURE__ */ X({
  __name: "editor-output",
  setup(e) {
    const t = q();
    t.$onAction(({ name: y, store: k, args: f, after: N }) => {
      y === "refreshEditorPanels" && N(() => {
        r();
      });
    });
    const o = Y(), n = Y();
    function i(y) {
      t.setOutputFormat(y);
    }
    function s(y) {
      t.minifyOutput(y);
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
    function a(y, k) {
      return y === "js" ? L() : g();
    }
    function l(y) {
      return y === "js" ? S() : d();
    }
    function c() {
      let y = Kt();
      return y.sort((k, f) => k.key.localeCompare(f.key)), y = y.filter((k) => k.value.toString() !== k.initialValue.toString()), y;
    }
    function d() {
      const y = c(), k = {};
      return y.forEach((f) => {
        k[f.key] = f.value;
      }), k;
    }
    function m(y) {
      return t.outputFormat === Z.json ? '"' + y + '"' : y;
    }
    function h() {
      return t.outputFormat === Z.json ? "," : ";";
    }
    function g(y) {
      const k = t.outputMinified, f = "<", N = ">", x = [];
      let _ = c();
      return _.length && (t.outputFormat === Z.html && (x.push(f + "style" + N), x.push(":root {")), t.outputFormat === Z.json && x.push("{"), _.forEach((b) => {
        x.push(
          m(b.key) + ": " + m(b.value.toString()) + h()
        );
      }), x.push("}"), t.outputFormat === Z.html && x.push(f + "/style" + N), k && x.push(`
`)), x.join(k ? "" : `
`);
    }
    function S() {
      const y = ut(), k = dt();
      return C(y, k);
    }
    function L(y) {
      const k = t.outputMinified, f = "<", N = ">", x = [], _ = ut(), b = dt(), p = C(_, b);
      if (t.outputFormat === Z.html) {
        let T = "";
        p && Object.keys(p).length && (T = ","), x.push(f + "script" + N), x.push("TockVueKit.renderChat("), x.push('document.getElementById("<TARGET_ELEMENT_ID>"),'), x.push('"<TOCK_BOT_API_URL>"' + T);
      }
      if (p) {
        const T = k ? 0 : 2;
        Object.keys(p).length && x.push(JSON.stringify(p, null, T));
      }
      return t.outputFormat === Z.html && (x.push(")"), x.push(f + "/script" + N)), x.join(k ? "" : `
`);
    }
    function C(y, k) {
      const f = O(y, k);
      if (f)
        return M(f), f;
    }
    function O(y, k, f = {}) {
      if (Lo(y)) {
        const N = Object.entries(y);
        for (let x = 0; x < N.length; x++) {
          const [_, b] = N[x], p = O(b, k[_]);
          typeof p == "object" && p.type === "leaf" ? f[_] = p.value : typeof p < "u" && Object.keys(p).length && (f[_] = p);
        }
        return f;
      } else if (!k || y !== k.default)
        return { type: "leaf", value: y };
    }
    function M(y) {
      if (Lo(y)) {
        const k = Object.entries(y);
        for (let f = 0; f < k.length; f++) {
          const [N, x] = k[f];
          M(x) || delete y[N];
        }
        return y;
      } else
        return typeof y < "u";
    }
    function j(y) {
      In(a(y));
    }
    function E(y) {
      const k = y === "css" ? "tvk-css.json" : "tvk-options.json", f = new Blob([JSON.stringify(l(y))], {
        type: "text/plain;charset=utf-8"
      });
      qr.saveAs(f, k);
    }
    return (y, k) => {
      const f = yt("tooltip");
      return v(), I("div", ea, [
        w("div", ta, [
          w("div", null, [
            W((v(), I("div", oa, [
              W(w("input", {
                type: "radio",
                class: "form-check-input",
                name: "outputFormat",
                id: "outputFormatHtml",
                value: u(Z).html,
                "onUpdate:modelValue": k[0] || (k[0] = (N) => u(t).outputFormat = N),
                onChange: k[1] || (k[1] = (N) => i(u(Z).html))
              }, null, 40, na), [
                [eo, u(t).outputFormat]
              ]),
              ia
            ])), [
              [f, "Format output for html inclusion"]
            ]),
            W((v(), I("div", sa, [
              W(w("input", {
                type: "radio",
                class: "form-check-input",
                name: "outputFormat",
                id: "outputFormatJs",
                value: u(Z).json,
                "onUpdate:modelValue": k[2] || (k[2] = (N) => u(t).outputFormat = N),
                onChange: k[3] || (k[3] = (N) => i(u(Z).json))
              }, null, 40, ra), [
                [eo, u(t).outputFormat]
              ]),
              aa
            ])), [
              [f, "Format output for js usage"]
            ])
          ]),
          W((v(), I("div", la, [
            W(w("input", {
              class: "form-check-input",
              type: "checkbox",
              role: "switch",
              id: "outputMinify",
              "onUpdate:modelValue": k[4] || (k[4] = (N) => u(t).outputMinified = N),
              onChange: k[5] || (k[5] = (N) => s(N.target.checked))
            }, null, 544), [
              [Ao, u(t).outputMinified]
            ]),
            ca
          ])), [
            [f, "Minify output code"]
          ])
        ]),
        w("div", ua, [
          !n.value && !o.value ? (v(), I("div", da, " All settings set to default ")) : z("", !0),
          n.value ? (v(), I("div", pa, [
            u(t).outputFormat === u(Z).html ? (v(), I("label", ha, "Script:")) : z("", !0),
            u(t).outputFormat === u(Z).json ? (v(), I("label", ga, "Options:")) : z("", !0),
            w("div", fa, [
              w("pre", ma, [
                w("code", null, V(n.value), 1)
              ]),
              w("div", _a, [
                W((v(), I("button", {
                  type: "button",
                  class: "btn btn-link btn-sm pe-0 pt-0",
                  onClick: k[6] || (k[6] = (N) => j(
                    "js"
                    /* js */
                  ))
                }, ya)), [
                  [f, "Copy js code"]
                ]),
                u(t).outputFormat === u(Z).json ? W((v(), I("button", {
                  key: 0,
                  type: "button",
                  class: "btn btn-link btn-sm pe-0",
                  onClick: k[7] || (k[7] = (N) => E(
                    "js"
                    /* js */
                  ))
                }, wa)), [
                  [f, "Download js code"]
                ]) : z("", !0)
              ])
            ])
          ])) : z("", !0),
          o.value ? (v(), I("div", Ma, [
            u(t).outputFormat === u(Z).html ? (v(), I("label", Ia, "Style:")) : z("", !0),
            u(t).outputFormat === u(Z).json ? (v(), I("label", ka, "Css variables:")) : z("", !0),
            w("div", ja, [
              w("pre", Na, [
                w("code", null, V(o.value), 1)
              ]),
              w("div", xa, [
                W((v(), I("button", {
                  type: "button",
                  class: "btn btn-link btn-sm pe-0 pt-0",
                  onClick: k[8] || (k[8] = (N) => j(
                    "css"
                    /* css */
                  ))
                }, La)), [
                  [f, "Copy css code"]
                ]),
                u(t).outputFormat === u(Z).json ? W((v(), I("button", {
                  key: 0,
                  type: "button",
                  class: "btn btn-link btn-sm pe-0",
                  onClick: k[9] || (k[9] = (N) => E(
                    "css"
                    /* css */
                  ))
                }, Da)), [
                  [f, "Download css code"]
                ]) : z("", !0)
              ])
            ])
          ])) : z("", !0)
        ])
      ]);
    };
  }
}), Oa = { id: "tock-vue-kit-editor" }, Aa = { class: "panel-menu" }, Ea = /* @__PURE__ */ w("i", { class: "bi bi-layout-text-sidebar-reverse" }, null, -1), za = [
  Ea
], Pa = /* @__PURE__ */ w("i", { class: "bi bi-gear" }, null, -1), $a = [
  Pa
], Ya = /* @__PURE__ */ w("i", { class: "bi bi-file-word" }, null, -1), Ga = [
  Ya
], Ra = /* @__PURE__ */ w("i", { class: "bi bi-filetype-css" }, null, -1), Wa = [
  Ra
], Za = /* @__PURE__ */ w("i", { class: "bi bi-floppy" }, null, -1), Va = [
  Za
], Ba = { class: "panel-body flex-grow-1 position-relative" }, Ha = /* @__PURE__ */ X({
  __name: "editor",
  props: {
    height: { default: "100vh" }
  },
  setup(e) {
    Ee(hs()), Co().appContext.app.use(Wi);
    const o = q();
    return Y("100vh"), Je(() => {
      o.refreshEditorPanels();
    }), (n, i) => {
      const s = yt("tooltip");
      return v(), I("div", Oa, [
        w("div", {
          class: "panel-wrapper d-flex",
          style: Ge({ height: n.height })
        }, [
          w("div", Aa, [
            W((v(), I("div", {
              class: Q(["panel-menu-entry", {
                active: u(o).editorPanel === u(U).templates
              }]),
              onClick: i[0] || (i[0] = (r) => u(o).setEditorPanel(u(U).templates))
            }, za, 2)), [
              [s, { content: "Templates", placement: "right" }]
            ]),
            W((v(), I("div", {
              class: Q(["panel-menu-entry", {
                active: u(o).editorPanel === u(U).preferences
              }]),
              onClick: i[1] || (i[1] = (r) => u(o).setEditorPanel(u(U).preferences))
            }, $a, 2)), [
              [s, { content: "Preferences", placement: "right" }]
            ]),
            W((v(), I("div", {
              class: Q(["panel-menu-entry", {
                active: u(o).editorPanel === u(U).wording
              }]),
              onClick: i[2] || (i[2] = (r) => u(o).setEditorPanel(u(U).wording))
            }, Ga, 2)), [
              [s, { content: "Wording", placement: "right" }]
            ]),
            W((v(), I("div", {
              class: Q(["panel-menu-entry", {
                active: u(o).editorPanel === u(U).styling
              }]),
              onClick: i[3] || (i[3] = (r) => u(o).setEditorPanel(u(U).styling))
            }, Wa, 2)), [
              [s, { content: "Styling", placement: "right" }]
            ]),
            W((v(), I("div", {
              class: Q(["panel-menu-entry", {
                active: u(o).editorPanel === u(U).output
              }]),
              onClick: i[4] || (i[4] = (r) => u(o).setEditorPanel(u(U).output))
            }, Va, 2)), [
              [s, { content: "Output", placement: "right" }]
            ])
          ]),
          w("div", Ba, [
            u(o).editorPanel === u(U).templates ? (v(), J(Ls, { key: 0 })) : z("", !0),
            u(o).editorPanel === u(U).styling ? (v(), J(tr, { key: 1 })) : z("", !0),
            u(o).editorPanel === u(U).preferences ? (v(), J(Ur, {
              key: u(o).currentCustomizationName
            })) : z("", !0),
            u(o).editorPanel === u(U).wording ? (v(), J(Xr, {
              key: u(o).currentCustomizationName
            })) : z("", !0),
            u(o).editorPanel === u(U).output ? (v(), J(Ca, {
              key: u(o).currentCustomizationName
            })) : z("", !0)
          ])
        ], 4)
      ]);
    };
  }
});
export {
  Ha as TvkEditor
};
