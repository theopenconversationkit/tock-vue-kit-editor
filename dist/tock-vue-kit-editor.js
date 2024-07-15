import { pushScopeId as Co, popScopeId as Oo, defineComponent as X, nextTick as Ct, openBlock as f, createBlock as K, createElementBlock as I, normalizeClass as Q, renderSlot as ct, normalizeProps as Cn, guardReactiveProps as On, withScopeId as An, resolveComponent as ze, normalizeStyle as We, withKeys as En, createElementVNode as w, Fragment as q, createCommentVNode as z, mergeProps as Ao, withCtx as ut, createVNode as Wt, ref as $, createApp as zn, h as Pn, toDisplayString as F, effectScope as Eo, markRaw as xe, toRaw as yt, watch as Zt, unref as d, hasInjectionContext as $n, inject as Yn, getCurrentInstance as zo, reactive as Gn, isRef as Le, isReactive as Vt, toRef as xt, computed as Po, getCurrentScope as Rn, onScopeDispose as Wn, toRefs as eo, renderList as le, createTextVNode as fe, onMounted as qe, onBeforeUnmount as Zn, resolveDirective as bt, withDirectives as W, withModifiers as Vn, vModelCheckbox as $o, vModelRadio as to } from "vue";
import { reload as Bn, updateTvkOption as Fn, getTvkCurrentOptions as dt, getTvkDefaultOptions as pt, addTvkMessage as oo } from "tock-vue-kit";
const Un = ["top", "right", "bottom", "left"], no = ["start", "end"], io = /* @__PURE__ */ Un.reduce((e, t) => e.concat(t, t + "-" + no[0], t + "-" + no[1]), []), Se = Math.min, ke = Math.max, Hn = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
}, Qn = {
  start: "end",
  end: "start"
};
function Ot(e, t, o) {
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
function Yo(e) {
  return e === "x" ? "y" : "x";
}
function Bt(e) {
  return e === "y" ? "height" : "width";
}
function Xe(e) {
  return ["top", "bottom"].includes(he(e)) ? "y" : "x";
}
function Ft(e) {
  return Yo(Xe(e));
}
function Go(e, t, o) {
  o === void 0 && (o = !1);
  const n = re(e), i = Ft(e), s = Bt(i);
  let r = i === "x" ? n === (o ? "end" : "start") ? "right" : "left" : n === "start" ? "bottom" : "top";
  return t.reference[s] > t.floating[s] && (r = gt(r)), [r, gt(r)];
}
function Jn(e) {
  const t = gt(e);
  return [ht(e), t, ht(t)];
}
function ht(e) {
  return e.replace(/start|end/g, (t) => Qn[t]);
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
function qn(e, t, o, n) {
  const i = re(e);
  let s = Kn(he(e), o === "start", n);
  return i && (s = s.map((r) => r + "-" + i), t && (s = s.concat(s.map(ht)))), s;
}
function gt(e) {
  return e.replace(/left|right|bottom|top/g, (t) => Hn[t]);
}
function Xn(e) {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    ...e
  };
}
function Ro(e) {
  return typeof e != "number" ? Xn(e) : {
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
function so(e, t, o) {
  let {
    reference: n,
    floating: i
  } = e;
  const s = Xe(t), r = Ft(t), a = Bt(r), l = he(t), c = s === "y", u = n.x + n.width / 2 - i.width / 2, m = n.y + n.height / 2 - i.height / 2, g = n[a] / 2 - i[a] / 2;
  let _;
  switch (l) {
    case "top":
      _ = {
        x: u,
        y: n.y - i.height
      };
      break;
    case "bottom":
      _ = {
        x: u,
        y: n.y + n.height
      };
      break;
    case "right":
      _ = {
        x: n.x + n.width,
        y: m
      };
      break;
    case "left":
      _ = {
        x: n.x - i.width,
        y: m
      };
      break;
    default:
      _ = {
        x: n.x,
        y: n.y
      };
  }
  switch (re(t)) {
    case "start":
      _[r] -= g * (o && c ? -1 : 1);
      break;
    case "end":
      _[r] += g * (o && c ? -1 : 1);
      break;
  }
  return _;
}
const ei = async (e, t, o) => {
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
    y: m
  } = so(c, n, l), g = n, _ = {}, S = 0;
  for (let C = 0; C < a.length; C++) {
    const {
      name: N,
      fn: D
    } = a[C], {
      x: O,
      y: k,
      data: L,
      reset: M
    } = await D({
      x: u,
      y: m,
      initialPlacement: n,
      placement: g,
      strategy: i,
      middlewareData: _,
      rects: c,
      platform: r,
      elements: {
        reference: e,
        floating: t
      }
    });
    u = O ?? u, m = k ?? m, _ = {
      ..._,
      [N]: {
        ..._[N],
        ...L
      }
    }, M && S <= 50 && (S++, typeof M == "object" && (M.placement && (g = M.placement), M.rects && (c = M.rects === !0 ? await r.getElementRects({
      reference: e,
      floating: t,
      strategy: i
    }) : M.rects), {
      x: u,
      y: m
    } = so(c, g, l)), C = -1);
  }
  return {
    x: u,
    y: m,
    placement: g,
    strategy: i,
    middlewareData: _
  };
};
async function wt(e, t) {
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
    elementContext: m = "floating",
    altBoundary: g = !1,
    padding: _ = 0
  } = De(t, e), S = Ro(_), N = a[g ? m === "floating" ? "reference" : "floating" : m], D = Ze(await s.getClippingRect({
    element: (o = await (s.isElement == null ? void 0 : s.isElement(N))) == null || o ? N : N.contextElement || await (s.getDocumentElement == null ? void 0 : s.getDocumentElement(a.floating)),
    boundary: c,
    rootBoundary: u,
    strategy: l
  })), O = m === "floating" ? {
    x: n,
    y: i,
    width: r.floating.width,
    height: r.floating.height
  } : r.reference, k = await (s.getOffsetParent == null ? void 0 : s.getOffsetParent(a.floating)), L = await (s.isElement == null ? void 0 : s.isElement(k)) ? await (s.getScale == null ? void 0 : s.getScale(k)) || {
    x: 1,
    y: 1
  } : {
    x: 1,
    y: 1
  }, M = Ze(s.convertOffsetParentRelativeRectToViewportRelativeRect ? await s.convertOffsetParentRelativeRectToViewportRelativeRect({
    elements: a,
    rect: O,
    offsetParent: k,
    strategy: l
  }) : O);
  return {
    top: (D.top - M.top + S.top) / L.y,
    bottom: (M.bottom - D.bottom + S.bottom) / L.y,
    left: (D.left - M.left + S.left) / L.x,
    right: (M.right - D.right + S.right) / L.x
  };
}
const ti = (e) => ({
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
    const m = Ro(u), g = {
      x: o,
      y: n
    }, _ = Ft(i), S = Bt(_), C = await r.getDimensions(c), N = _ === "y", D = N ? "top" : "left", O = N ? "bottom" : "right", k = N ? "clientHeight" : "clientWidth", L = s.reference[S] + s.reference[_] - g[_] - s.floating[S], M = g[_] - s.reference[_], b = await (r.getOffsetParent == null ? void 0 : r.getOffsetParent(c));
    let v = b ? b[k] : 0;
    (!v || !await (r.isElement == null ? void 0 : r.isElement(b))) && (v = a.floating[k] || s.floating[S]);
    const E = L / 2 - M / 2, j = v / 2 - C[S] / 2 - 1, h = Se(m[D], j), y = Se(m[O], j), p = h, x = v - C[S] - y, A = v / 2 - C[S] / 2 + E, T = Ot(p, A, x), P = !l.arrow && re(i) != null && A !== T && s.reference[S] / 2 - (A < p ? h : y) - C[S] / 2 < 0, G = P ? A < p ? A - p : A - x : 0;
    return {
      [_]: g[_] + G,
      data: {
        [_]: T,
        centerOffset: A - T - G,
        ...P && {
          alignmentOffset: G
        }
      },
      reset: P
    };
  }
});
function oi(e, t, o) {
  return (e ? [...o.filter((i) => re(i) === e), ...o.filter((i) => re(i) !== e)] : o.filter((i) => he(i) === i)).filter((i) => e ? re(i) === e || (t ? ht(i) !== i : !1) : !0);
}
const ni = function(e) {
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
        alignment: m,
        allowedPlacements: g = io,
        autoAlignment: _ = !0,
        ...S
      } = De(e, t), C = m !== void 0 || g === io ? oi(m || null, _, g) : g, N = await wt(t, S), D = ((o = r.autoPlacement) == null ? void 0 : o.index) || 0, O = C[D];
      if (O == null)
        return {};
      const k = Go(O, s, await (l.isRTL == null ? void 0 : l.isRTL(c.floating)));
      if (a !== O)
        return {
          reset: {
            placement: C[0]
          }
        };
      const L = [N[he(O)], N[k[0]], N[k[1]]], M = [...((n = r.autoPlacement) == null ? void 0 : n.overflows) || [], {
        placement: O,
        overflows: L
      }], b = C[D + 1];
      if (b)
        return {
          data: {
            index: D + 1,
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
          index: D + 1,
          overflows: M
        },
        reset: {
          placement: j
        }
      } : {};
    }
  };
}, ii = function(e) {
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
        crossAxis: m = !0,
        fallbackPlacements: g,
        fallbackStrategy: _ = "bestFit",
        fallbackAxisSideDirection: S = "none",
        flipAlignment: C = !0,
        ...N
      } = De(e, t);
      if ((o = s.arrow) != null && o.alignmentOffset)
        return {};
      const D = he(i), O = he(a) === a, k = await (l.isRTL == null ? void 0 : l.isRTL(c.floating)), L = g || (O || !C ? [gt(a)] : Jn(a));
      !g && S !== "none" && L.push(...qn(a, C, S, k));
      const M = [a, ...L], b = await wt(t, N), v = [];
      let E = ((n = s.flip) == null ? void 0 : n.overflows) || [];
      if (u && v.push(b[D]), m) {
        const p = Go(i, r, k);
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
          switch (_) {
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
async function si(e, t) {
  const {
    placement: o,
    platform: n,
    elements: i
  } = e, s = await (n.isRTL == null ? void 0 : n.isRTL(i.floating)), r = he(o), a = re(o), l = Xe(o) === "y", c = ["left", "top"].includes(r) ? -1 : 1, u = s && l ? -1 : 1, m = De(t, e);
  let {
    mainAxis: g,
    crossAxis: _,
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
  return a && typeof S == "number" && (_ = a === "end" ? S * -1 : S), l ? {
    x: _ * u,
    y: g * c
  } : {
    x: g * c,
    y: _ * u
  };
}
const ri = function(e) {
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
      } = t, l = await si(t, e);
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
}, ai = function(e) {
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
          fn: (N) => {
            let {
              x: D,
              y: O
            } = N;
            return {
              x: D,
              y: O
            };
          }
        },
        ...l
      } = De(e, t), c = {
        x: o,
        y: n
      }, u = await wt(t, l), m = Xe(he(i)), g = Yo(m);
      let _ = c[g], S = c[m];
      if (s) {
        const N = g === "y" ? "top" : "left", D = g === "y" ? "bottom" : "right", O = _ + u[N], k = _ - u[D];
        _ = Ot(O, _, k);
      }
      if (r) {
        const N = m === "y" ? "top" : "left", D = m === "y" ? "bottom" : "right", O = S + u[N], k = S - u[D];
        S = Ot(O, S, k);
      }
      const C = a.fn({
        ...t,
        [g]: _,
        [m]: S
      });
      return {
        ...C,
        data: {
          x: C.x - o,
          y: C.y - n
        }
      };
    }
  };
}, li = function(e) {
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
      } = De(e, t), l = await wt(t, a), c = he(o), u = re(o), m = Xe(o) === "y", {
        width: g,
        height: _
      } = n.floating;
      let S, C;
      c === "top" || c === "bottom" ? (S = c, C = u === (await (i.isRTL == null ? void 0 : i.isRTL(s.floating)) ? "start" : "end") ? "left" : "right") : (C = c, S = u === "end" ? "top" : "bottom");
      const N = _ - l.top - l.bottom, D = g - l.left - l.right, O = Se(_ - l[S], N), k = Se(g - l[C], D), L = !t.middlewareData.shift;
      let M = O, b = k;
      if (m ? b = u || L ? Se(k, D) : D : M = u || L ? Se(O, N) : N, L && !u) {
        const E = ke(l.left, 0), j = ke(l.right, 0), h = ke(l.top, 0), y = ke(l.bottom, 0);
        m ? b = g - 2 * (E !== 0 || j !== 0 ? E + j : ke(l.left, l.right)) : M = _ - 2 * (h !== 0 || y !== 0 ? h + y : ke(l.top, l.bottom));
      }
      await r({
        ...t,
        availableWidth: b,
        availableHeight: M
      });
      const v = await i.getDimensions(s.floating);
      return g !== v.width || _ !== v.height ? {
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
const ro = Math.min, Ve = Math.max, ft = Math.round;
function Wo(e) {
  const t = ue(e);
  let o = parseFloat(t.width), n = parseFloat(t.height);
  const i = e.offsetWidth, s = e.offsetHeight, r = ft(o) !== i || ft(n) !== s;
  return r && (o = i, n = s), { width: o, height: n, fallback: r };
}
function Me(e) {
  return Vo(e) ? (e.nodeName || "").toLowerCase() : "";
}
let et;
function Zo() {
  if (et)
    return et;
  const e = navigator.userAgentData;
  return e && Array.isArray(e.brands) ? (et = e.brands.map((t) => t.brand + "/" + t.version).join(" "), et) : navigator.userAgent;
}
function de(e) {
  return e instanceof ne(e).HTMLElement;
}
function be(e) {
  return e instanceof ne(e).Element;
}
function Vo(e) {
  return e instanceof ne(e).Node;
}
function ao(e) {
  return typeof ShadowRoot > "u" ? !1 : e instanceof ne(e).ShadowRoot || e instanceof ShadowRoot;
}
function Mt(e) {
  const { overflow: t, overflowX: o, overflowY: n, display: i } = ue(e);
  return /auto|scroll|overlay|hidden|clip/.test(t + n + o) && !["inline", "contents"].includes(i);
}
function ci(e) {
  return ["table", "td", "th"].includes(Me(e));
}
function At(e) {
  const t = /firefox/i.test(Zo()), o = ue(e), n = o.backdropFilter || o.WebkitBackdropFilter;
  return o.transform !== "none" || o.perspective !== "none" || !!n && n !== "none" || t && o.willChange === "filter" || t && !!o.filter && o.filter !== "none" || ["transform", "perspective"].some((i) => o.willChange.includes(i)) || ["paint", "layout", "strict", "content"].some((i) => {
    const s = o.contain;
    return s != null && s.includes(i);
  });
}
function Bo() {
  return !/^((?!chrome|android).)*safari/i.test(Zo());
}
function Ut(e) {
  return ["html", "body", "#document"].includes(Me(e));
}
function Fo(e) {
  return be(e) ? e : e.contextElement;
}
const Uo = { x: 1, y: 1 };
function Ee(e) {
  const t = Fo(e);
  if (!de(t))
    return Uo;
  const o = t.getBoundingClientRect(), { width: n, height: i, fallback: s } = Wo(t);
  let r = (s ? ft(o.width) : o.width) / n, a = (s ? ft(o.height) : o.height) / i;
  return r && Number.isFinite(r) || (r = 1), a && Number.isFinite(a) || (a = 1), { x: r, y: a };
}
function He(e, t, o, n) {
  var i, s;
  t === void 0 && (t = !1), o === void 0 && (o = !1);
  const r = e.getBoundingClientRect(), a = Fo(e);
  let l = Uo;
  t && (n ? be(n) && (l = Ee(n)) : l = Ee(e));
  const c = a ? ne(a) : window, u = !Bo() && o;
  let m = (r.left + (u && ((i = c.visualViewport) == null ? void 0 : i.offsetLeft) || 0)) / l.x, g = (r.top + (u && ((s = c.visualViewport) == null ? void 0 : s.offsetTop) || 0)) / l.y, _ = r.width / l.x, S = r.height / l.y;
  if (a) {
    const C = ne(a), N = n && be(n) ? ne(n) : n;
    let D = C.frameElement;
    for (; D && n && N !== C; ) {
      const O = Ee(D), k = D.getBoundingClientRect(), L = getComputedStyle(D);
      k.x += (D.clientLeft + parseFloat(L.paddingLeft)) * O.x, k.y += (D.clientTop + parseFloat(L.paddingTop)) * O.y, m *= O.x, g *= O.y, _ *= O.x, S *= O.y, m += k.x, g += k.y, D = ne(D).frameElement;
    }
  }
  return { width: _, height: S, top: g, right: m + _, bottom: g + S, left: m, x: m, y: g };
}
function we(e) {
  return ((Vo(e) ? e.ownerDocument : e.document) || window.document).documentElement;
}
function It(e) {
  return be(e) ? { scrollLeft: e.scrollLeft, scrollTop: e.scrollTop } : { scrollLeft: e.pageXOffset, scrollTop: e.pageYOffset };
}
function Ho(e) {
  return He(we(e)).left + It(e).scrollLeft;
}
function Qe(e) {
  if (Me(e) === "html")
    return e;
  const t = e.assignedSlot || e.parentNode || ao(e) && e.host || we(e);
  return ao(t) ? t.host : t;
}
function Qo(e) {
  const t = Qe(e);
  return Ut(t) ? t.ownerDocument.body : de(t) && Mt(t) ? t : Qo(t);
}
function mt(e, t) {
  var o;
  t === void 0 && (t = []);
  const n = Qo(e), i = n === ((o = e.ownerDocument) == null ? void 0 : o.body), s = ne(n);
  return i ? t.concat(s, s.visualViewport || [], Mt(n) ? n : []) : t.concat(n, mt(n));
}
function lo(e, t, o) {
  return t === "viewport" ? Ze(function(n, i) {
    const s = ne(n), r = we(n), a = s.visualViewport;
    let l = r.clientWidth, c = r.clientHeight, u = 0, m = 0;
    if (a) {
      l = a.width, c = a.height;
      const g = Bo();
      (g || !g && i === "fixed") && (u = a.offsetLeft, m = a.offsetTop);
    }
    return { width: l, height: c, x: u, y: m };
  }(e, o)) : be(t) ? Ze(function(n, i) {
    const s = He(n, !0, i === "fixed"), r = s.top + n.clientTop, a = s.left + n.clientLeft, l = de(n) ? Ee(n) : { x: 1, y: 1 };
    return { width: n.clientWidth * l.x, height: n.clientHeight * l.y, x: a * l.x, y: r * l.y };
  }(t, o)) : Ze(function(n) {
    const i = we(n), s = It(n), r = n.ownerDocument.body, a = Ve(i.scrollWidth, i.clientWidth, r.scrollWidth, r.clientWidth), l = Ve(i.scrollHeight, i.clientHeight, r.scrollHeight, r.clientHeight);
    let c = -s.scrollLeft + Ho(n);
    const u = -s.scrollTop;
    return ue(r).direction === "rtl" && (c += Ve(i.clientWidth, r.clientWidth) - a), { width: a, height: l, x: c, y: u };
  }(we(e)));
}
function co(e) {
  return de(e) && ue(e).position !== "fixed" ? e.offsetParent : null;
}
function uo(e) {
  const t = ne(e);
  let o = co(e);
  for (; o && ci(o) && ue(o).position === "static"; )
    o = co(o);
  return o && (Me(o) === "html" || Me(o) === "body" && ue(o).position === "static" && !At(o)) ? t : o || function(n) {
    let i = Qe(n);
    for (; de(i) && !Ut(i); ) {
      if (At(i))
        return i;
      i = Qe(i);
    }
    return null;
  }(e) || t;
}
function ui(e, t, o) {
  const n = de(t), i = we(t), s = He(e, !0, o === "fixed", t);
  let r = { scrollLeft: 0, scrollTop: 0 };
  const a = { x: 0, y: 0 };
  if (n || !n && o !== "fixed")
    if ((Me(t) !== "body" || Mt(i)) && (r = It(t)), de(t)) {
      const l = He(t, !0);
      a.x = l.x + t.clientLeft, a.y = l.y + t.clientTop;
    } else
      i && (a.x = Ho(i));
  return { x: s.left + r.scrollLeft - a.x, y: s.top + r.scrollTop - a.y, width: s.width, height: s.height };
}
const di = { getClippingRect: function(e) {
  let { element: t, boundary: o, rootBoundary: n, strategy: i } = e;
  const s = o === "clippingAncestors" ? function(c, u) {
    const m = u.get(c);
    if (m)
      return m;
    let g = mt(c).filter((N) => be(N) && Me(N) !== "body"), _ = null;
    const S = ue(c).position === "fixed";
    let C = S ? Qe(c) : c;
    for (; be(C) && !Ut(C); ) {
      const N = ue(C), D = At(C);
      (S ? D || _ : D || N.position !== "static" || !_ || !["absolute", "fixed"].includes(_.position)) ? _ = N : g = g.filter((O) => O !== C), C = Qe(C);
    }
    return u.set(c, g), g;
  }(t, this._c) : [].concat(o), r = [...s, n], a = r[0], l = r.reduce((c, u) => {
    const m = lo(t, u, i);
    return c.top = Ve(m.top, c.top), c.right = ro(m.right, c.right), c.bottom = ro(m.bottom, c.bottom), c.left = Ve(m.left, c.left), c;
  }, lo(t, a, i));
  return { width: l.right - l.left, height: l.bottom - l.top, x: l.left, y: l.top };
}, convertOffsetParentRelativeRectToViewportRelativeRect: function(e) {
  let { rect: t, offsetParent: o, strategy: n } = e;
  const i = de(o), s = we(o);
  if (o === s)
    return t;
  let r = { scrollLeft: 0, scrollTop: 0 }, a = { x: 1, y: 1 };
  const l = { x: 0, y: 0 };
  if ((i || !i && n !== "fixed") && ((Me(o) !== "body" || Mt(s)) && (r = It(o)), de(o))) {
    const c = He(o);
    a = Ee(o), l.x = c.x + o.clientLeft, l.y = c.y + o.clientTop;
  }
  return { width: t.width * a.x, height: t.height * a.y, x: t.x * a.x - r.scrollLeft * a.x + l.x, y: t.y * a.y - r.scrollTop * a.y + l.y };
}, isElement: be, getDimensions: function(e) {
  return de(e) ? Wo(e) : e.getBoundingClientRect();
}, getOffsetParent: uo, getDocumentElement: we, getScale: Ee, async getElementRects(e) {
  let { reference: t, floating: o, strategy: n } = e;
  const i = this.getOffsetParent || uo, s = this.getDimensions;
  return { reference: ui(t, await i(o), n), floating: { x: 0, y: 0, ...await s(o) } };
}, getClientRects: (e) => Array.from(e.getClientRects()), isRTL: (e) => ue(e).direction === "rtl" }, pi = (e, t, o) => {
  const n = /* @__PURE__ */ new Map(), i = { platform: di, ...o }, s = { ...i.platform, _c: n };
  return ei(e, t, { ...i, platform: s });
};
function Jo(e, t) {
  for (const o in t)
    Object.prototype.hasOwnProperty.call(t, o) && (typeof t[o] == "object" && e[o] ? Jo(e[o], t[o]) : e[o] = t[o]);
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
function hi(e) {
  const t = [e];
  let o = ae.themes[e] || {};
  do
    o.$extend && !o.$resetCss ? (t.push(o.$extend), o = ae.themes[o.$extend] || {}) : o = null;
  while (o);
  return t.map((n) => `v-popper--theme-${n}`);
}
function po(e) {
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
let Ko = !1;
typeof window < "u" && typeof navigator < "u" && (Ko = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream);
const qo = ["auto", "top", "bottom", "left", "right"].reduce((e, t) => e.concat([
  t,
  `${t}-start`,
  `${t}-end`
]), []), ho = {
  hover: "mouseenter",
  focus: "focus",
  click: "click",
  touch: "touchstart",
  pointer: "pointerdown"
}, go = {
  hover: "mouseleave",
  focus: "blur",
  click: "click",
  touch: "touchend",
  pointer: "pointerup"
};
function fo(e, t) {
  const o = e.indexOf(t);
  o !== -1 && e.splice(o, 1);
}
function St() {
  return new Promise((e) => requestAnimationFrame(() => {
    requestAnimationFrame(e);
  }));
}
const se = [];
let Ie = null;
const mo = {};
function _o(e) {
  let t = mo[e];
  return t || (t = mo[e] = []), t;
}
let Et = function() {
};
typeof window < "u" && (Et = window.Element);
function Y(e) {
  return function(t) {
    return Je(t.theme, e);
  };
}
const Lt = "__floating-vue__popper", Xo = () => X({
  name: "VPopper",
  provide() {
    return {
      [Lt]: {
        parentPopper: this
      }
    };
  },
  inject: {
    [Lt]: { default: null }
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
      default: Y("disabled")
    },
    positioningDisabled: {
      type: Boolean,
      default: Y("positioningDisabled")
    },
    placement: {
      type: String,
      default: Y("placement"),
      validator: (e) => qo.includes(e)
    },
    delay: {
      type: [String, Number, Object],
      default: Y("delay")
    },
    distance: {
      type: [Number, String],
      default: Y("distance")
    },
    skidding: {
      type: [Number, String],
      default: Y("skidding")
    },
    triggers: {
      type: Array,
      default: Y("triggers")
    },
    showTriggers: {
      type: [Array, Function],
      default: Y("showTriggers")
    },
    hideTriggers: {
      type: [Array, Function],
      default: Y("hideTriggers")
    },
    popperTriggers: {
      type: Array,
      default: Y("popperTriggers")
    },
    popperShowTriggers: {
      type: [Array, Function],
      default: Y("popperShowTriggers")
    },
    popperHideTriggers: {
      type: [Array, Function],
      default: Y("popperHideTriggers")
    },
    container: {
      type: [String, Object, Et, Boolean],
      default: Y("container")
    },
    boundary: {
      type: [String, Et],
      default: Y("boundary")
    },
    strategy: {
      type: String,
      validator: (e) => ["absolute", "fixed"].includes(e),
      default: Y("strategy")
    },
    autoHide: {
      type: [Boolean, Function],
      default: Y("autoHide")
    },
    handleResize: {
      type: Boolean,
      default: Y("handleResize")
    },
    instantMove: {
      type: Boolean,
      default: Y("instantMove")
    },
    eagerMount: {
      type: Boolean,
      default: Y("eagerMount")
    },
    popperClass: {
      type: [String, Array, Object],
      default: Y("popperClass")
    },
    computeTransformOrigin: {
      type: Boolean,
      default: Y("computeTransformOrigin")
    },
    /**
     * @deprecated
     */
    autoMinSize: {
      type: Boolean,
      default: Y("autoMinSize")
    },
    autoSize: {
      type: [Boolean, String],
      default: Y("autoSize")
    },
    /**
     * @deprecated
     */
    autoMaxSize: {
      type: Boolean,
      default: Y("autoMaxSize")
    },
    autoBoundaryMaxSize: {
      type: Boolean,
      default: Y("autoBoundaryMaxSize")
    },
    preventOverflow: {
      type: Boolean,
      default: Y("preventOverflow")
    },
    overflowPadding: {
      type: [Number, String],
      default: Y("overflowPadding")
    },
    arrowPadding: {
      type: [Number, String],
      default: Y("arrowPadding")
    },
    arrowOverflow: {
      type: Boolean,
      default: Y("arrowOverflow")
    },
    flip: {
      type: Boolean,
      default: Y("flip")
    },
    shift: {
      type: Boolean,
      default: Y("shift")
    },
    shiftCrossAxis: {
      type: Boolean,
      default: Y("shiftCrossAxis")
    },
    noAutoFocus: {
      type: Boolean,
      default: Y("noAutoFocus")
    },
    disposeTimeout: {
      type: Number,
      default: Y("disposeTimeout")
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
      return (e = this[Lt]) == null ? void 0 : e.parentPopper;
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
      (this.distance || this.skidding) && e.middleware.push(ri({
        mainAxis: this.distance,
        crossAxis: this.skidding
      }));
      const t = this.placement.startsWith("auto");
      if (t ? e.middleware.push(ni({
        alignment: this.placement.split("-")[1] ?? ""
      })) : e.placement = this.placement, this.preventOverflow && (this.shift && e.middleware.push(ai({
        padding: this.overflowPadding,
        boundary: this.boundary,
        crossAxis: this.shiftCrossAxis
      })), !t && this.flip && e.middleware.push(ii({
        padding: this.overflowPadding,
        boundary: this.boundary
      }))), e.middleware.push(ti({
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
      (this.autoMaxSize || this.autoBoundaryMaxSize) && (this.$_innerNode.style.maxWidth = null, this.$_innerNode.style.maxHeight = null, e.middleware.push(li({
        boundary: this.boundary,
        padding: this.overflowPadding,
        apply: ({ availableWidth: n, availableHeight: i }) => {
          this.$_innerNode.style.maxWidth = n != null ? `${n}px` : null, this.$_innerNode.style.maxHeight = i != null ? `${i}px` : null;
        }
      })));
      const o = await pi(this.$_referenceNode, this.$_popperNode, e);
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
      clearTimeout(this.$_disposeTimer), clearTimeout(this.$_scheduleTimer), this.skipTransition = e, !this.isShown && (this.$_ensureTeleport(), await St(), await this.$_computePosition(), await this.$_applyShowEffect(), this.positioningDisabled || this.$_registerEventListeners([
        ...mt(this.$_referenceNode),
        ...mt(this.$_popperNode)
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
      for (const t of po(this.theme))
        _o(t).push(this), document.body.classList.add(`v-popper--some-open--${t}`);
      this.$emit("apply-show"), this.classes.showFrom = !0, this.classes.showTo = !1, this.classes.hideFrom = !1, this.classes.hideTo = !1, await St(), this.classes.showFrom = !1, this.classes.showTo = !0, this.noAutoFocus || this.$_popperNode.focus();
    },
    async $_applyHide(e = !1) {
      if (this.shownChildren.size > 0) {
        this.pendingHide = !0, this.$_hideInProgress = !1;
        return;
      }
      if (clearTimeout(this.$_scheduleTimer), !this.isShown)
        return;
      this.skipTransition = e, fo(se, this), se.length === 0 && document.body.classList.remove("v-popper--some-open");
      for (const o of po(this.theme)) {
        const n = _o(o);
        fo(n, this), n.length === 0 && document.body.classList.remove(`v-popper--some-open--${o}`);
      }
      Ie === this && (Ie = null), this.isShown = !1, this.$_applyAttrsToTarget({
        "aria-describedby": void 0,
        "data-popper-shown": void 0
      }), clearTimeout(this.$_disposeTimer);
      const t = this.disposeTimeout;
      t !== null && (this.$_disposeTimer = setTimeout(() => {
        this.$_popperNode && (this.$_detachPopperNode(), this.isMounted = !1);
      }, t)), this.$_removeEventListeners("scroll"), this.$emit("apply-hide"), this.classes.showFrom = !1, this.classes.showTo = !1, this.classes.hideFrom = !0, this.classes.hideTo = !1, await St(), this.classes.hideFrom = !1, this.classes.hideTo = !0;
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
      this.$_registerTriggerListeners(this.$_targetNodes, go, this.triggers, this.hideTriggers, t), this.$_registerTriggerListeners([this.$_popperNode], go, this.popperTriggers, this.popperHideTriggers, t);
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
  if (Ko) {
    const e = Pe ? {
      passive: !0,
      capture: !0
    } : !0;
    document.addEventListener("touchstart", (t) => vo(t, !0), e), document.addEventListener("touchend", (t) => yo(t, !0), e);
  } else
    window.addEventListener("mousedown", (e) => vo(e, !1), !0), window.addEventListener("click", (e) => yo(e, !1), !0);
  window.addEventListener("resize", fi);
}
function vo(e, t) {
  if (ae.autoHideOnMousedown)
    en(e, t);
  else
    for (let o = 0; o < se.length; o++) {
      const n = se[o];
      try {
        n.mouseDownContains = n.popperNode().contains(e.target);
      } catch {
      }
    }
}
function yo(e, t) {
  ae.autoHideOnMousedown || en(e, t);
}
function en(e, t) {
  const o = {};
  for (let n = se.length - 1; n >= 0; n--) {
    const i = se[n];
    try {
      const s = i.containsGlobalTarget = i.mouseDownContains || i.popperNode().contains(e.target);
      i.pendingHide = !1, requestAnimationFrame(() => {
        if (i.pendingHide = !1, !o[i.randomId] && bo(i, s, e)) {
          if (i.$_handleGlobalClose(e, t), !e.closeAllPopover && e.closePopover && s) {
            let a = i.parentPopper;
            for (; a; )
              o[a.randomId] = !0, a = a.parentPopper;
            return;
          }
          let r = i.parentPopper;
          for (; r && bo(r, r.containsGlobalTarget, e); )
            r.$_handleGlobalClose(e, t), r = r.parentPopper;
        }
      });
    } catch {
    }
  }
}
function bo(e, t, o) {
  return o.closeAllPopover || o.closePopover && t || gi(e, o) && !t;
}
function gi(e, t) {
  if (typeof e.autoHide == "function") {
    const o = e.autoHide(t);
    return e.lastAutoHide = o, o;
  }
  return e.autoHide;
}
function fi() {
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
const mi = {
  extends: Xo()
}, kt = (e, t) => {
  const o = e.__vccOpts || e;
  for (const [n, i] of t)
    o[n] = i;
  return o;
};
function _i(e, t, o, n, i, s) {
  return f(), I("div", {
    ref: "reference",
    class: Q(["v-popper", {
      "v-popper--shown": e.slotData.isShown
    }])
  }, [
    ct(e.$slots, "default", Cn(On(e.slotData)))
  ], 2);
}
const vi = /* @__PURE__ */ kt(mi, [["render", _i]]);
function yi() {
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
function zt() {
  zt.init || (zt.init = !0, st = yi() !== -1);
}
var jt = {
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
    zt(), Ct(() => {
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
const bi = /* @__PURE__ */ An("data-v-b329ee4c");
Co("data-v-b329ee4c");
const wi = {
  class: "resize-observer",
  tabindex: "-1"
};
Oo();
const Mi = /* @__PURE__ */ bi((e, t, o, n, i, s) => (f(), K("div", wi)));
jt.render = Mi;
jt.__scopeId = "data-v-b329ee4c";
jt.__file = "src/components/ResizeObserver.vue";
const tn = (e = "theme") => ({
  computed: {
    themeClass() {
      return hi(this[e]);
    }
  }
}), Ii = X({
  name: "VPopperContent",
  components: {
    ResizeObserver: jt
  },
  mixins: [
    tn()
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
}), ki = ["id", "aria-hidden", "tabindex", "data-popper-placement"], ji = {
  ref: "inner",
  class: "v-popper__inner"
}, Ni = /* @__PURE__ */ w("div", { class: "v-popper__arrow-outer" }, null, -1), xi = /* @__PURE__ */ w("div", { class: "v-popper__arrow-inner" }, null, -1), Si = [
  Ni,
  xi
];
function Li(e, t, o, n, i, s) {
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
    onKeyup: t[2] || (t[2] = En((a) => e.autoHide && e.$emit("hide"), ["esc"]))
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
      w("div", ji, [
        e.mounted ? (f(), I(q, { key: 0 }, [
          w("div", null, [
            ct(e.$slots, "default")
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
      }, Si, 4)
    ], 4)
  ], 46, ki);
}
const on = /* @__PURE__ */ kt(Ii, [["render", Li]]), nn = {
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
let Pt = function() {
};
typeof window < "u" && (Pt = window.Element);
const Ti = X({
  name: "VPopperWrapper",
  components: {
    Popper: vi,
    PopperContent: on
  },
  mixins: [
    nn,
    tn("finalTheme")
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
      type: [String, Object, Pt, Boolean],
      default: void 0
    },
    boundary: {
      type: [String, Pt],
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
function Di(e, t, o, n, i, s) {
  const r = ze("PopperContent"), a = ze("Popper");
  return f(), K(a, Ao({ ref: "popper" }, e.$props, {
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
    default: ut(({
      popperId: l,
      isShown: c,
      shouldMountContent: u,
      skipTransition: m,
      autoHide: g,
      show: _,
      hide: S,
      handleResize: C,
      onResize: N,
      classes: D,
      result: O
    }) => [
      ct(e.$slots, "default", {
        shown: c,
        show: _,
        hide: S
      }),
      Wt(r, {
        ref: "popperContent",
        "popper-id": l,
        theme: e.finalTheme,
        shown: c,
        mounted: u,
        "skip-transition": m,
        "auto-hide": g,
        "handle-resize": C,
        classes: D,
        result: O,
        onHide: S,
        onResize: N
      }, {
        default: ut(() => [
          ct(e.$slots, "popper", {
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
const Ht = /* @__PURE__ */ kt(Ti, [["render", Di]]), Ci = {
  ...Ht,
  name: "VDropdown",
  vPopperTheme: "dropdown"
}, Oi = {
  ...Ht,
  name: "VMenu",
  vPopperTheme: "menu"
}, Ai = {
  ...Ht,
  name: "VTooltip",
  vPopperTheme: "tooltip"
}, Ei = X({
  name: "VTooltipDirective",
  components: {
    Popper: Xo(),
    PopperContent: on
  },
  mixins: [
    nn
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
}), zi = ["innerHTML"], Pi = ["textContent"];
function $i(e, t, o, n, i, s) {
  const r = ze("PopperContent"), a = ze("Popper");
  return f(), K(a, Ao({ ref: "popper" }, e.$attrs, {
    theme: e.theme,
    "target-nodes": e.targetNodes,
    "popper-node": () => e.$refs.popperContent.$el,
    onApplyShow: e.onShow,
    onApplyHide: e.onHide
  }), {
    default: ut(({
      popperId: l,
      isShown: c,
      shouldMountContent: u,
      skipTransition: m,
      autoHide: g,
      hide: _,
      handleResize: S,
      onResize: C,
      classes: N,
      result: D
    }) => [
      Wt(r, {
        ref: "popperContent",
        class: Q({
          "v-popper--tooltip-loading": e.loading
        }),
        "popper-id": l,
        theme: e.theme,
        shown: c,
        mounted: u,
        "skip-transition": m,
        "auto-hide": g,
        "handle-resize": S,
        classes: N,
        result: D,
        onHide: _,
        onResize: C
      }, {
        default: ut(() => [
          e.html ? (f(), I("div", {
            key: 0,
            innerHTML: e.finalContent
          }, null, 8, zi)) : (f(), I("div", {
            key: 1,
            textContent: F(e.finalContent)
          }, null, 8, Pi))
        ]),
        _: 2
      }, 1032, ["class", "popper-id", "theme", "shown", "mounted", "skip-transition", "auto-hide", "handle-resize", "classes", "result", "onHide", "onResize"])
    ]),
    _: 1
  }, 16, ["theme", "target-nodes", "popper-node", "onApplyShow", "onApplyHide"]);
}
const Yi = /* @__PURE__ */ kt(Ei, [["render", $i]]), sn = "v-popper--has-tooltip";
function Gi(e, t) {
  let o = e.placement;
  if (!o && t)
    for (const n of qo)
      t[n] && (o = n);
  return o || (o = Je(e.theme || "tooltip", "placement")), o;
}
function rn(e, t, o) {
  let n;
  const i = typeof t;
  return i === "string" ? n = { content: t } : t && i === "object" ? n = t : n = { content: !1 }, n.placement = Gi(n, o), n.targetNodes = () => [e], n.referenceNode = () => e, n;
}
let Tt, Ke, Ri = 0;
function Wi() {
  if (Tt)
    return;
  Ke = $([]), Tt = zn({
    name: "VTooltipDirectiveApp",
    setup() {
      return {
        directives: Ke
      };
    },
    render() {
      return this.directives.map((t) => Pn(Yi, {
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
  document.body.appendChild(e), Tt.mount(e);
}
function Zi(e, t, o) {
  Wi();
  const n = $(rn(e, t, o)), i = $(!1), s = {
    id: Ri++,
    options: n,
    shown: i
  };
  return Ke.value.push(s), e.classList && e.classList.add(sn), e.$_popper = {
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
function an(e) {
  if (e.$_popper) {
    const t = Ke.value.indexOf(e.$_popper.item);
    t !== -1 && Ke.value.splice(t, 1), delete e.$_popper, delete e.$_popperOldShown, delete e.$_popperMountTarget;
  }
  e.classList && e.classList.remove(sn);
}
function wo(e, { value: t, modifiers: o }) {
  const n = rn(e, t, o);
  if (!n.content || Je(n.theme || "tooltip", "disabled"))
    an(e);
  else {
    let i;
    e.$_popper ? (i = e.$_popper, i.options.value = n) : i = Zi(e, t, o), typeof t.shown < "u" && t.shown !== e.$_popperOldShown && (e.$_popperOldShown = t.shown, t.shown ? i.show() : i.hide());
  }
}
const Vi = {
  beforeMount: wo,
  updated: wo,
  beforeUnmount(e) {
    an(e);
  }
};
function Mo(e) {
  e.addEventListener("mousedown", _t), e.addEventListener("click", _t), e.addEventListener("touchstart", ln, Pe ? {
    passive: !0
  } : !1);
}
function Io(e) {
  e.removeEventListener("mousedown", _t), e.removeEventListener("click", _t), e.removeEventListener("touchstart", ln), e.removeEventListener("touchend", cn), e.removeEventListener("touchcancel", un);
}
function _t(e) {
  const t = e.currentTarget;
  e.closePopover = !t.$_vclosepopover_touch, e.closeAllPopover = t.$_closePopoverModifiers && !!t.$_closePopoverModifiers.all;
}
function ln(e) {
  if (e.changedTouches.length === 1) {
    const t = e.currentTarget;
    t.$_vclosepopover_touch = !0;
    const o = e.changedTouches[0];
    t.$_vclosepopover_touchPoint = o, t.addEventListener("touchend", cn), t.addEventListener("touchcancel", un);
  }
}
function cn(e) {
  const t = e.currentTarget;
  if (t.$_vclosepopover_touch = !1, e.changedTouches.length === 1) {
    const o = e.changedTouches[0], n = t.$_vclosepopover_touchPoint;
    e.closePopover = Math.abs(o.screenY - n.screenY) < 20 && Math.abs(o.screenX - n.screenX) < 20, e.closeAllPopover = t.$_closePopoverModifiers && !!t.$_closePopoverModifiers.all;
  }
}
function un(e) {
  const t = e.currentTarget;
  t.$_vclosepopover_touch = !1;
}
const Bi = {
  beforeMount(e, { value: t, modifiers: o }) {
    e.$_closePopoverModifiers = o, (typeof t > "u" || t) && Mo(e);
  },
  updated(e, { value: t, oldValue: o, modifiers: n }) {
    e.$_closePopoverModifiers = n, t !== o && (typeof t > "u" || t ? Mo(e) : Io(e));
  },
  beforeUnmount(e) {
    Io(e);
  }
};
function Fi(e, t = {}) {
  e.$_vTooltipInstalled || (e.$_vTooltipInstalled = !0, Jo(ae, t), e.directive("tooltip", Vi), e.directive("close-popper", Bi), e.component("VTooltip", Ai), e.component("VDropdown", Ci), e.component("VMenu", Oi));
}
const Ui = {
  // eslint-disable-next-line no-undef
  version: "5.2.2",
  install: Fi,
  options: ae
};
var dn = !1;
function ot(e, t, o) {
  return Array.isArray(e) ? (e.length = Math.max(e.length, t), e.splice(t, 1, o), o) : (e[t] = o, o);
}
function Dt(e, t) {
  if (Array.isArray(e)) {
    e.splice(t, 1);
    return;
  }
  delete e[t];
}
function Hi() {
  return pn().__VUE_DEVTOOLS_GLOBAL_HOOK__;
}
function pn() {
  return typeof navigator < "u" && typeof window < "u" ? window : typeof globalThis < "u" ? globalThis : {};
}
const Qi = typeof Proxy == "function", Ji = "devtools-plugin:setup", Ki = "plugin:settings:set";
let Ce, $t;
function qi() {
  var e;
  return Ce !== void 0 || (typeof window < "u" && window.performance ? (Ce = !0, $t = window.performance) : typeof globalThis < "u" && (!((e = globalThis.perf_hooks) === null || e === void 0) && e.performance) ? (Ce = !0, $t = globalThis.perf_hooks.performance) : Ce = !1), Ce;
}
function Xi() {
  return qi() ? $t.now() : Date.now();
}
class es {
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
        return Xi();
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
  const o = e, n = pn(), i = Hi(), s = Qi && o.enableEarlyProxy;
  if (i && (n.__VUE_DEVTOOLS_PLUGIN_API_AVAILABLE__ || !s))
    i.emit(Ji, e, t);
  else {
    const r = s ? new es(o, i) : null;
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
const $e = (e) => Re = e, gn = process.env.NODE_ENV !== "production" ? Symbol("pinia") : (
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
const Nt = typeof window < "u", Ue = (process.env.NODE_ENV !== "production" || !1) && process.env.NODE_ENV !== "test" && Nt, ko = typeof window == "object" && window.window === window ? window : typeof self == "object" && self.self === self ? self : typeof global == "object" && global.global === global ? global : typeof globalThis == "object" ? globalThis : { HTMLElement: null };
function ts(e, { autoBom: t = !1 } = {}) {
  return t && /^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(e.type) ? new Blob(["\uFEFF", e], { type: e.type }) : e;
}
function Qt(e, t, o) {
  const n = new XMLHttpRequest();
  n.open("GET", e), n.responseType = "blob", n.onload = function() {
    _n(n.response, t, o);
  }, n.onerror = function() {
    console.error("could not download file");
  }, n.send();
}
function fn(e) {
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
const at = typeof navigator == "object" ? navigator : { userAgent: "" }, mn = /Macintosh/.test(at.userAgent) && /AppleWebKit/.test(at.userAgent) && !/Safari/.test(at.userAgent), _n = Nt ? (
  // Use download attribute first if possible (#193 Lumia mobile) unless this is a macOS WebView or mini program
  typeof HTMLAnchorElement < "u" && "download" in HTMLAnchorElement.prototype && !mn ? os : (
    // Use msSaveOrOpenBlob as a second approach
    "msSaveOrOpenBlob" in at ? ns : (
      // Fallback to using FileReader and a popup
      is
    )
  )
) : () => {
};
function os(e, t = "download", o) {
  const n = document.createElement("a");
  n.download = t, n.rel = "noopener", typeof e == "string" ? (n.href = e, n.origin !== location.origin ? fn(n.href) ? Qt(e, t, o) : (n.target = "_blank", rt(n)) : rt(n)) : (n.href = URL.createObjectURL(e), setTimeout(function() {
    URL.revokeObjectURL(n.href);
  }, 4e4), setTimeout(function() {
    rt(n);
  }, 0));
}
function ns(e, t = "download", o) {
  if (typeof e == "string")
    if (fn(e))
      Qt(e, t, o);
    else {
      const n = document.createElement("a");
      n.href = e, n.target = "_blank", setTimeout(function() {
        rt(n);
      });
    }
  else
    navigator.msSaveOrOpenBlob(ts(e, o), t);
}
function is(e, t, o, n) {
  if (n = n || open("", "_blank"), n && (n.document.title = n.document.body.innerText = "downloading..."), typeof e == "string")
    return Qt(e, t, o);
  const i = e.type === "application/octet-stream", s = /constructor/i.test(String(ko.HTMLElement)) || "safari" in ko, r = /CriOS\/[\d]+/.test(navigator.userAgent);
  if ((r || i && s || mn) && typeof FileReader < "u") {
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
function Jt(e) {
  return "_a" in e && "install" in e;
}
function vn() {
  if (!("clipboard" in navigator))
    return U("Your browser doesn't support the Clipboard API", "error"), !0;
}
function yn(e) {
  return e instanceof Error && e.message.toLowerCase().includes("document is not focused") ? (U('You need to activate the "Emulate a focused page" setting in the "Rendering" panel of devtools.', "warn"), !0) : !1;
}
async function ss(e) {
  if (!vn())
    try {
      await navigator.clipboard.writeText(JSON.stringify(e.state.value)), U("Global state copied to clipboard.");
    } catch (t) {
      if (yn(t))
        return;
      U("Failed to serialize the state. Check the console for more details.", "error"), console.error(t);
    }
}
async function rs(e) {
  if (!vn())
    try {
      bn(e, JSON.parse(await navigator.clipboard.readText())), U("Global state pasted from clipboard.");
    } catch (t) {
      if (yn(t))
        return;
      U("Failed to deserialize the state from clipboard. Check the console for more details.", "error"), console.error(t);
    }
}
async function as(e) {
  try {
    _n(new Blob([JSON.stringify(e.state.value)], {
      type: "text/plain;charset=utf-8"
    }), "pinia-state.json");
  } catch (t) {
    U("Failed to export the state as JSON. Check the console for more details.", "error"), console.error(t);
  }
}
let ge;
function ls() {
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
async function cs(e) {
  try {
    const o = await ls()();
    if (!o)
      return;
    const { text: n, file: i } = o;
    bn(e, JSON.parse(n)), U(`Global state imported from "${i.name}".`);
  } catch (t) {
    U("Failed to import the state from JSON. Check the console for more details.", "error"), console.error(t);
  }
}
function bn(e, t) {
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
const wn = "🍍 Pinia (root)", Yt = "_root";
function us(e) {
  return Jt(e) ? {
    id: Yt,
    label: wn
  } : {
    id: e.$id,
    label: e.$id
  };
}
function ds(e) {
  if (Jt(e)) {
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
function ps(e) {
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
let Ae = !0;
const lt = [], je = "pinia:mutations", J = "pinia", { assign: gs } = Object, vt = (e) => "🍍 " + e;
function fs(e, t) {
  hn({
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
            ss(t);
          },
          tooltip: "Serialize and copy the state"
        },
        {
          icon: "content_paste",
          action: async () => {
            await rs(t), o.sendInspectorTree(J), o.sendInspectorState(J);
          },
          tooltip: "Replace the state with the content of your clipboard"
        },
        {
          icon: "save",
          action: () => {
            as(t);
          },
          tooltip: "Save the state as a JSON file"
        },
        {
          icon: "folder_open",
          action: async () => {
            await cs(t), o.sendInspectorTree(J), o.sendInspectorState(J);
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
            type: vt(a.$id),
            key: "state",
            editable: !0,
            value: a._isOptionsAPI ? {
              _custom: {
                value: yt(a.$state),
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
            type: vt(a.$id),
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
        i = i.concat(Array.from(t._s.values())), n.rootNodes = (n.filter ? i.filter((s) => "$id" in s ? s.$id.toLowerCase().includes(n.filter.toLowerCase()) : wn.toLowerCase().includes(n.filter.toLowerCase())) : i).map(us);
      }
    }), o.on.getInspectorState((n) => {
      if (n.app === e && n.inspectorId === J) {
        const i = n.nodeId === Yt ? t : t._s.get(n.nodeId);
        if (!i)
          return;
        i && (n.state = ds(i));
      }
    }), o.on.editInspectorState((n, i) => {
      if (n.app === e && n.inspectorId === J) {
        const s = n.nodeId === Yt ? t : t._s.get(n.nodeId);
        if (!s)
          return U(`store "${n.nodeId}" not found`, "error");
        const { path: r } = n;
        Jt(s) ? r.unshift("state") : (r.length !== 1 || !s._customProperties.has(r[0]) || r[0] in s.$state) && r.unshift("$state"), Ae = !1, n.set(s, r, n.state.value), Ae = !0;
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
function ms(e, t) {
  lt.includes(vt(t.$id)) || lt.push(vt(t.$id)), hn({
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
      const u = Mn++;
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
      }), r((m) => {
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
              result: m
            },
            groupId: u
          }
        });
      }), a((m) => {
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
              error: m
            },
            groupId: u
          }
        });
      });
    }, !0), t._customProperties.forEach((r) => {
      Zt(() => d(t[r]), (a, l) => {
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
        title: hs(a),
        data: gs({ store: ie(t.$id) }, ps(r)),
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
let Mn = 0, ye;
function jo(e, t, o) {
  const n = t.reduce((i, s) => (i[s] = yt(e)[s], i), {});
  for (const i in n)
    e[i] = function() {
      const s = Mn, r = o ? new Proxy(e, {
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
function _s({ app: e, store: t, options: o }) {
  if (t.$id.startsWith("__hot:"))
    return;
  t._isOptionsAPI = !!o.state, jo(t, Object.keys(o.actions), t._isOptionsAPI);
  const n = t._hotUpdate;
  yt(t)._hotUpdate = function(i) {
    n.apply(this, arguments), jo(t, Object.keys(i._hmrPayload.actions), !!t._isOptionsAPI);
  }, ms(
    e,
    // FIXME: is there a way to allow the assignment from Store<Id, S, G, A> to StoreGeneric?
    t
  );
}
function vs() {
  const e = Eo(!0), t = e.run(() => $({}));
  let o = [], n = [];
  const i = xe({
    install(s) {
      $e(i), i._a = s, s.provide(gn, i), s.config.globalProperties.$pinia = i, Ue && fs(s, i), n.forEach((r) => o.push(r)), n = [];
    },
    use(s) {
      return !this._a && !dn ? n.push(s) : o.push(s), this;
    },
    _p: o,
    // it's actually undefined here
    // @ts-expect-error
    _a: null,
    _e: e,
    _s: /* @__PURE__ */ new Map(),
    state: t
  });
  return Ue && typeof Proxy < "u" && i.use(_s), i;
}
function In(e, t) {
  for (const o in t) {
    const n = t[o];
    if (!(o in e))
      continue;
    const i = e[o];
    Te(i) && Te(n) && !Le(n) && !Vt(n) ? e[o] = In(i, n) : e[o] = n;
  }
  return e;
}
const kn = () => {
};
function No(e, t, o, n = kn) {
  e.push(t);
  const i = () => {
    const s = e.indexOf(t);
    s > -1 && (e.splice(s, 1), n());
  };
  return !o && Rn() && Wn(i), i;
}
function Oe(e, ...t) {
  e.slice().forEach((o) => {
    o(...t);
  });
}
const ys = (e) => e();
function Gt(e, t) {
  e instanceof Map && t instanceof Map && t.forEach((o, n) => e.set(n, o)), e instanceof Set && t instanceof Set && t.forEach(e.add, e);
  for (const o in t) {
    if (!t.hasOwnProperty(o))
      continue;
    const n = t[o], i = e[o];
    Te(i) && Te(n) && e.hasOwnProperty(o) && !Le(n) && !Vt(n) ? e[o] = Gt(i, n) : e[o] = n;
  }
  return e;
}
const bs = process.env.NODE_ENV !== "production" ? Symbol("pinia:skipHydration") : (
  /* istanbul ignore next */
  Symbol()
);
function ws(e) {
  return !Te(e) || !e.hasOwnProperty(bs);
}
const { assign: oe } = Object;
function xo(e) {
  return !!(Le(e) && e.effect);
}
function So(e, t, o, n) {
  const { state: i, actions: s, getters: r } = t, a = o.state.value[e];
  let l;
  function c() {
    !a && (process.env.NODE_ENV === "production" || !n) && (o.state.value[e] = i ? i() : {});
    const u = process.env.NODE_ENV !== "production" && n ? (
      // use ref() to unwrap refs inside state TODO: check if this is still necessary
      eo($(i ? i() : {}).value)
    ) : eo(o.state.value[e]);
    return oe(u, s, Object.keys(r || {}).reduce((m, g) => (process.env.NODE_ENV !== "production" && g in u && console.warn(`[🍍]: A getter cannot have the same name as another state property. Rename one of them. Found with "${g}" in store "${e}".`), m[g] = xe(Po(() => {
      $e(o);
      const _ = o._s.get(e);
      return r[g].call(_, _);
    })), m), {}));
  }
  return l = Rt(e, c, t, o, n, !0), l;
}
function Rt(e, t, o = {}, n, i, s) {
  let r;
  const a = oe({ actions: {} }, o);
  if (process.env.NODE_ENV !== "production" && !n._e.active)
    throw new Error("Pinia destroyed");
  const l = {
    deep: !0
    // flush: 'post',
  };
  process.env.NODE_ENV !== "production" && !dn && (l.onTrigger = (h) => {
    c ? _ = h : c == !1 && !v._hotUpdating && (Array.isArray(_) ? _.push(h) : console.error("🍍 debuggerEvents should be an array. This is most likely an internal Pinia bug."));
  });
  let c, u, m = [], g = [], _;
  const S = n.state.value[e];
  !s && !S && (process.env.NODE_ENV === "production" || !i) && (n.state.value[e] = {});
  const C = $({});
  let N;
  function D(h) {
    let y;
    c = u = !1, process.env.NODE_ENV !== "production" && (_ = []), typeof h == "function" ? (h(n.state.value[e]), y = {
      type: pe.patchFunction,
      storeId: e,
      events: _
    }) : (Gt(n.state.value[e], h), y = {
      type: pe.patchObject,
      payload: h,
      storeId: e,
      events: _
    });
    const p = N = Symbol();
    Ct().then(() => {
      N === p && (c = !0);
    }), u = !0, Oe(m, y, n.state.value[e]);
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
    } : kn
  );
  function k() {
    r.stop(), m = [], g = [], n._s.delete(e);
  }
  function L(h, y) {
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
    hotState: C
  }), b = {
    _p: n,
    // _s: scope,
    $id: e,
    $onAction: No.bind(null, g),
    $patch: D,
    $reset: O,
    $subscribe(h, y = {}) {
      const p = No(m, h, y.detached, () => x()), x = r.run(() => Zt(() => n.state.value[e], (A) => {
        (y.flush === "sync" ? u : c) && h({
          storeId: e,
          type: pe.direct,
          events: _
        }, A);
      }, oe({}, l, y)));
      return p;
    },
    $dispose: k
  }, v = Gn(process.env.NODE_ENV !== "production" || Ue ? oe(
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
  const j = (n._a && n._a.runWithContext || ys)(() => n._e.run(() => (r = Eo()).run(t)));
  for (const h in j) {
    const y = j[h];
    if (Le(y) && !xo(y) || Vt(y))
      process.env.NODE_ENV !== "production" && i ? ot(C.value, h, xt(j, h)) : s || (S && ws(y) && (Le(y) ? y.value = S[h] : Gt(y, S[h])), n.state.value[e][h] = y), process.env.NODE_ENV !== "production" && M.state.push(h);
    else if (typeof y == "function") {
      const p = process.env.NODE_ENV !== "production" && i ? y : L(h, y);
      j[h] = p, process.env.NODE_ENV !== "production" && (M.actions[h] = y), a.actions[h] = y;
    } else
      process.env.NODE_ENV !== "production" && xo(y) && (M.getters[h] = s ? (
        // @ts-expect-error
        o.getters[h]
      ) : y, Nt && (j._getters || // @ts-expect-error: same
      (j._getters = xe([]))).push(h));
  }
  if (oe(v, j), oe(yt(v), j), Object.defineProperty(v, "$state", {
    get: () => process.env.NODE_ENV !== "production" && i ? C.value : n.state.value[e],
    set: (h) => {
      if (process.env.NODE_ENV !== "production" && i)
        throw new Error("cannot set hotState");
      D((y) => {
        oe(y, h);
      });
    }
  }), process.env.NODE_ENV !== "production" && (v._hotUpdate = xe((h) => {
    v._hotUpdating = !0, h._hmrPayload.state.forEach((y) => {
      if (y in v.$state) {
        const p = h.$state[y], x = v.$state[y];
        typeof p == "object" && Te(p) && Te(x) ? In(p, x) : h.$state[y] = x;
      }
      ot(v, y, xt(h.$state, y));
    }), Object.keys(v.$state).forEach((y) => {
      y in h.$state || Dt(v, y);
    }), c = !1, u = !1, n.state.value[e] = xt(h._hmrPayload, "hotState"), u = !0, Ct().then(() => {
      c = !0;
    });
    for (const y in h._hmrPayload.actions) {
      const p = h[y];
      ot(v, y, L(y, p));
    }
    for (const y in h._hmrPayload.getters) {
      const p = h._hmrPayload.getters[y], x = s ? (
        // special handling of options api
        Po(() => ($e(n), p.call(v, v)))
      ) : p;
      ot(v, y, x);
    }
    Object.keys(v._hmrPayload.getters).forEach((y) => {
      y in h._hmrPayload.getters || Dt(v, y);
    }), Object.keys(v._hmrPayload.actions).forEach((y) => {
      y in h._hmrPayload.actions || Dt(v, y);
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
Found in store "${v.$id}".`), S && s && o.hydrate && o.hydrate(v.$state, S), c = !0, u = !0, v;
}
function Ms(e, t, o) {
  let n, i;
  const s = typeof t == "function";
  n = e, i = s ? o : t;
  function r(a, l) {
    const c = $n();
    if (a = // in test mode, ignore the argument provided as we can always retrieve a
    // pinia instance with getActivePinia()
    (process.env.NODE_ENV === "test" && Re && Re._testing ? null : a) || (c ? Yn(gn, null) : null), a && $e(a), process.env.NODE_ENV !== "production" && !Re)
      throw new Error(`[🍍]: "getActivePinia()" was called but there was no active Pinia. Are you trying to use a store before calling "app.use(pinia)"?
See https://pinia.vuejs.org/core-concepts/outside-component-usage.html for help.
This will fail in production.`);
    a = Re, a._s.has(n) || (s ? Rt(n, t, i, a) : So(n, i, a), process.env.NODE_ENV !== "production" && (r._pinia = a));
    const u = a._s.get(n);
    if (process.env.NODE_ENV !== "production" && l) {
      const m = "__hot:" + n, g = s ? Rt(m, t, i, a, !0) : So(m, oe({}, i), a, !0);
      l._hotUpdate(g), delete a.state.value[m], a._s.delete(m);
    }
    if (process.env.NODE_ENV !== "production" && Nt) {
      const m = zo();
      if (m && m.proxy && // avoid adding stores that are just built for hot module replacement
      !l) {
        const g = m.proxy, _ = "_pStores" in g ? g._pStores : g._pStores = {};
        _[n] = u;
      }
    }
    return u;
  }
  return r.$id = n, r;
}
var V = /* @__PURE__ */ ((e) => (e.templates = "templates", e.styling = "styling", e.preferences = "preferences", e.wording = "wording", e.test = "test", e.output = "output", e))(V || {}), B = /* @__PURE__ */ ((e) => (e.html = "html", e.json = "json", e))(B || {});
const Lo = [
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
], jn = "--tvk_";
function Kt(e) {
  const t = e.replace(jn, ""), o = t.split("_"), n = o.slice(0, -1), i = o[o.length - 1];
  return {
    keyWithoutPrefix: t,
    nameSpace: o,
    categories: n,
    name: i
  };
}
function qt() {
  const e = [];
  Array.from(document.styleSheets).forEach((o) => {
    Array.from(o.cssRules).forEach((n) => {
      if (n instanceof CSSStyleRule && n.selectorText === ":root") {
        let i = !!n.style.getPropertyValue(
          "--tvk--default-sheet"
        );
        Array.from(n.styleMap).forEach((s) => {
          if (s[0].startsWith(jn)) {
            const r = s[0], a = s[1], l = Kt(r);
            let c = e.find((u) => u.key === r);
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
    const i = Lo.indexOf(o.name), s = Lo.indexOf(n.name);
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
function Nn(e, t, o = !0) {
  for (let n = 0; n < e.length; n++)
    if (o && t.length !== e.length || t[n] !== e[n])
      return !1;
  return !0;
}
function ks(e, t) {
  return e.filter((n) => Nn(t, n.categories));
}
function js(e, t) {
  let o = e.filter((s) => Nn(t, s.categories, !1));
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
function To(e) {
  return !!(e && typeof e == "object" && !Array.isArray(e));
}
async function xn(e) {
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
const ee = Ms("editorStore", () => {
  const e = $(void 0), t = $(V.templates), o = $("colors"), n = $(void 0), i = $(B.html), s = $(!1), r = $(!1);
  function a() {
  }
  function l(N) {
    e.value = N, setTimeout(() => {
      ee().refreshEditorPanels();
    });
  }
  function c(N) {
    t.value = N, setTimeout(() => {
      ee().refreshEditorPanels();
    });
  }
  function u(N) {
    o.value = N;
  }
  function m(N) {
    i.value = N, ee().refreshEditorPanels();
  }
  function g(N) {
    s.value = N, ee().refreshEditorPanels();
  }
  function _(N) {
    C();
    const D = ee(), O = Kt(N);
    if (O.nameSpace[0] === "colors" && ![
      "brand",
      "brand-hue",
      "brand-lightness",
      "brand-saturation",
      "light",
      "dark"
    ].includes(O.nameSpace[1])) {
      const k = Ns();
      let L = N.split("_");
      L.splice(2, 0, k), N = L.join("_");
    }
    D.setStylingCategory(O.categories[0]), setTimeout(() => {
      D.targetStylingVariable(N);
    });
  }
  function S(N) {
    n.value = N;
  }
  function C() {
    n.value = void 0;
  }
  return {
    currentCustomizationName: e,
    editorPanel: t,
    stylingCategory: o,
    stylingTargetedVar: n,
    outputFormat: i,
    outputMinified: s,
    templateDirtyState: r,
    setCurrentCustomizationName: l,
    refreshEditorPanels: a,
    setEditorPanel: c,
    setStylingCategory: u,
    jumpToStylingVariable: _,
    targetStylingVariable: S,
    stylingVariableReached: C,
    setOutputFormat: m,
    minifyOutput: g
  };
}), xs = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KDTwhLS0gVXBsb2FkZWQgdG86IFNWRyBSZXBvLCB3d3cuc3ZncmVwby5jb20sIEdlbmVyYXRvcjogU1ZHIFJlcG8gTWl4ZXIgVG9vbHMgLS0+Cjxzdmcgd2lkdGg9IjgwMHB4IiBoZWlnaHQ9IjgwMHB4IiB2aWV3Qm94PSIwIDAgMTI4IDEyOCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgYXJpYS1oaWRkZW49InRydWUiIHJvbGU9ImltZyIgY2xhc3M9Imljb25pZnkgaWNvbmlmeS0tbm90byIgcHJlc2VydmVBc3BlY3RSYXRpbz0ieE1pZFlNaWQgbWVldCI+Cg08cGF0aCBkPSJNOTguOSA3OS44NWMtMS4yNS0yLjI3LjM0LTQuNTggMy4wNi03LjQ0YzQuMzEtNC41NCA5LTE1LjA3IDQuNjQtMjUuNzZjLjAzLS4wNi0uODYtMS44Ni0uODMtMS45MmwtMS43OS0uMDljLS41Ny0uMDgtMjAuMjYtLjEyLTM5Ljk3LS4xMmMtMTkuNzEgMC0zOS4zOS4wNC0zOS45Ny4xMmMwIDAtMi42NSAxLjk1LTIuNjMgMi4wMWMtNC4zNSAxMC42OS4zMyAyMS4yMiA0LjY0IDI1Ljc2YzIuNzEgMi44NiA0LjMgNS4xNyAzLjA2IDcuNDRjLTEuMjEgMi4yMS00LjgxIDIuNTMtNC44MSAyLjUzcy44MyAyLjI2IDIuODMgMy40OGMxLjg1IDEuMTMgNC4xMyAxLjM5IDUuNyAxLjQzYzAgMCA2LjE1IDguNTEgMjIuMjMgOC41MWgxNy45YzE2LjA4IDAgMjIuMjMtOC41MSAyMi4yMy04LjUxYzEuNTctLjA0IDMuODUtLjMgNS43LTEuNDNjMi0xLjIyIDIuODMtMy40OCAyLjgzLTMuNDhzLTMuNjEtLjMyLTQuODItMi41M3oiIGZpbGw9IiNlNjNkMDAiPgoNPC9wYXRoPgoNPHJhZGlhbEdyYWRpZW50IGlkPSJJY29uaWZ5SWQxN2VjZGIyOTA0ZDE3OGVhYjE3OTI4IiBjeD0iOTguNzUyIiBjeT0iODMuNjAxIiByPSIyMy40MTkiIGdyYWRpZW50VHJhbnNmb3JtPSJtYXRyaXgoMSAwIDAgLS40OTEyIC0xOS4yODMgMTI0LjY2NSkiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIj4KDTxzdG9wIG9mZnNldD0iLjY5OSIgc3RvcC1jb2xvcj0iI2Y5OGIyNSIgc3RvcC1vcGFjaXR5PSIwIj4KDTwvc3RvcD4KDTxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iI2Y5OGIyNSI+Cg08L3N0b3A+Cg08L3JhZGlhbEdyYWRpZW50PgoNPHBhdGggZD0iTTYzLjk5IDk1Ljc5di05LjQ0bDI4LjU3LTIuMjZsMi42IDMuMnMtNi4xNSA4LjUxLTIyLjIzIDguNTFsLTguOTQtLjAxeiIgZmlsbD0idXJsKCNJY29uaWZ5SWQxN2VjZGIyOTA0ZDE3OGVhYjE3OTI4KSI+Cg08L3BhdGg+Cg08cmFkaWFsR3JhZGllbnQgaWQ9Ikljb25pZnlJZDE3ZWNkYjI5MDRkMTc4ZWFiMTc5MjkiIGN4PSI3Ni41NzMiIGN5PSI3OC42NjgiIHI9IjYuOTIxIiBncmFkaWVudFRyYW5zZm9ybT0ibWF0cml4KC0uOTA1NyAuNDIzOCAuMzE0NCAuNjcxOSAxNDYuMjcgLTYuNjQ0KSIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiPgoNPHN0b3Agb2Zmc2V0PSIwIiBzdG9wLWNvbG9yPSIjZjk4YjI1Ij4KDTwvc3RvcD4KDTxzdG9wIG9mZnNldD0iLjg3MiIgc3RvcC1jb2xvcj0iI2Y5OGIyNSIgc3RvcC1vcGFjaXR5PSIwIj4KDTwvc3RvcD4KDTwvcmFkaWFsR3JhZGllbnQ+Cg08cGF0aCBkPSJNOTUuMSA4My4xNmMtNC4yOC02LjUgNS4yMS04LjkzIDUuMjEtOC45M2wuMDEuMDFjLTEuNjUgMi4wNS0yLjQgMy44NC0xLjQzIDUuNjFjMS4yMSAyLjIxIDQuODEgMi41MyA0LjgxIDIuNTNzLTQuOTEgNC4zNi04LjYuNzh6IiBmaWxsPSJ1cmwoI0ljb25pZnlJZDE3ZWNkYjI5MDRkMTc4ZWFiMTc5MjkpIj4KDTwvcGF0aD4KDTxyYWRpYWxHcmFkaWVudCBpZD0iSWNvbmlmeUlkMTdlY2RiMjkwNGQxNzhlYWIxNzkzMCIgY3g9IjkwLjkzIiBjeT0iNTkuMjc5IiByPSIzMC4zOTkiIGdyYWRpZW50VHJhbnNmb3JtPSJtYXRyaXgoLS4wNzQ2IC0uOTk3MiAtLjgzMTEgLjA2MjIgMTQzLjM0MyAxNDYuMjY5KSIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiPgoNPHN0b3Agb2Zmc2V0PSIuNjk5IiBzdG9wLWNvbG9yPSIjZjk4YjI1IiBzdG9wLW9wYWNpdHk9IjAiPgoNPC9zdG9wPgoNPHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjZjk4YjI1Ij4KDTwvc3RvcD4KDTwvcmFkaWFsR3JhZGllbnQ+Cg08cGF0aCBkPSJNMTA2LjYyIDQ2LjY1YzQuMjUgMTAuMzUtLjIyIDIxLjAxLTQuNDEgMjUuNTFjLS41OC42Mi0zLjAxIDMuMDEtMy41NyA0LjkyYzAgMC05LjU0LTEzLjMxLTEyLjM5LTIxLjEzYy0uNTgtMS41OC0xLjEtMy4yLTEuMTctNC44OGMtLjA1LTEuMjYuMTQtMi43Ni44Ny0zLjgyYy44OS0xLjMxIDIwLjE2LTEuNyAyMC4xNi0xLjdsLjUxIDEuMXoiIGZpbGw9InVybCgjSWNvbmlmeUlkMTdlY2RiMjkwNGQxNzhlYWIxNzkzMCkiPgoNPC9wYXRoPgoNPHJhZGlhbEdyYWRpZW50IGlkPSJJY29uaWZ5SWQxN2VjZGIyOTA0ZDE3OGVhYjE3OTMxIiBjeD0iNDEuNTM0IiBjeT0iNjIuNjQ1IiByPSIzMC4zOTkiIGdyYWRpZW50VHJhbnNmb3JtPSJtYXRyaXgoLjA3NDYgLS45OTcyIC44MzExIC4wNjIyIC0xMy42MyAxMDAuMTY2KSIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiPgoNPHN0b3Agb2Zmc2V0PSIuNjk5IiBzdG9wLWNvbG9yPSIjZjk4YjI1IiBzdG9wLW9wYWNpdHk9IjAiPgoNPC9zdG9wPgoNPHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjZjk4YjI1Ij4KDTwvc3RvcD4KDTwvcmFkaWFsR3JhZGllbnQ+Cg08cGF0aCBkPSJNMjEuNCA0Ni42NWMtNC4yNCAxMC4zNS4yMyAyMS4wMSA0LjQxIDI1LjVjLjU4LjYyIDMuMDEgMy4wMSAzLjU3IDQuOTJjMCAwIDkuNTQtMTMuMzEgMTIuMzktMjEuMTNjLjU4LTEuNTggMS4xLTMuMiAxLjE3LTQuODhjLjA1LTEuMjYtLjE0LTIuNzYtLjg3LTMuODJjLS44OS0xLjMxLTEuOTMtLjk2LTMuNDQtLjk2Yy0yLjg4IDAtMTUuNDktLjc0LTE2LjQ3LS43NGMuMDEuMDEtLjc2IDEuMTEtLjc2IDEuMTF6IiBmaWxsPSJ1cmwoI0ljb25pZnlJZDE3ZWNkYjI5MDRkMTc4ZWFiMTc5MzEpIj4KDTwvcGF0aD4KDTxyYWRpYWxHcmFkaWVudCBpZD0iSWNvbmlmeUlkMTdlY2RiMjkwNGQxNzhlYWIxNzkzMiIgY3g9IjQ4Ljg4NSIgY3k9IjgzLjUzOCIgcj0iMjMuNDE5IiBncmFkaWVudFRyYW5zZm9ybT0ibWF0cml4KC0xIDAgMCAtLjQ5MTIgOTcuNzcgMTI0LjU3MikiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIj4KDTxzdG9wIG9mZnNldD0iLjY5OSIgc3RvcC1jb2xvcj0iI2Y5OGIyNSIgc3RvcC1vcGFjaXR5PSIwIj4KDTwvc3RvcD4KDTxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iI2Y5OGIyNSI+Cg08L3N0b3A+Cg08L3JhZGlhbEdyYWRpZW50PgoNPHBhdGggZD0iTTY0LjAzIDk1Ljc5di05LjQ0bC0yOC41Ny0yLjI2bC0yLjYgMy4yczYuMTUgOC41MSAyMi4yMyA4LjUxbDguOTQtLjAxeiIgZmlsbD0idXJsKCNJY29uaWZ5SWQxN2VjZGIyOTA0ZDE3OGVhYjE3OTMyKSI+Cg08L3BhdGg+Cg08cmFkaWFsR3JhZGllbnQgaWQ9Ikljb25pZnlJZDE3ZWNkYjI5MDRkMTc4ZWFiMTc5MzMiIGN4PSIyNi4zNzQiIGN5PSI3OC42NjgiIHI9IjYuOTIxIiBncmFkaWVudFRyYW5zZm9ybT0ibWF0cml4KC45MDU3IC40MjM4IC0uMzE0NCAuNjcxOSAyNy4yMiAxNC42MzIpIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+Cg08c3RvcCBvZmZzZXQ9IjAiIHN0b3AtY29sb3I9IiNmOThiMjUiPgoNPC9zdG9wPgoNPHN0b3Agb2Zmc2V0PSIuOTQ0IiBzdG9wLWNvbG9yPSIjZjk4YjI1IiBzdG9wLW9wYWNpdHk9IjAiPgoNPC9zdG9wPgoNPC9yYWRpYWxHcmFkaWVudD4KDTxwYXRoIGQ9Ik0zMi45MyA4My4xNmM0LjI4LTYuNS01LjIxLTguOTMtNS4yMS04LjkzbC0uMDEuMDFjMS42NSAyLjA1IDIuNCAzLjg0IDEuNDMgNS42MWMtMS4yMSAyLjIxLTQuODEgMi41My00LjgxIDIuNTNzNC45IDQuMzYgOC42Ljc4eiIgZmlsbD0idXJsKCNJY29uaWZ5SWQxN2VjZGIyOTA0ZDE3OGVhYjE3OTMzKSI+Cg08L3BhdGg+Cg08Zz4KDTxsaW5lYXJHcmFkaWVudCBpZD0iSWNvbmlmeUlkMTdlY2RiMjkwNGQxNzhlYWIxNzkzNCIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiIHgxPSI2NCIgeTE9Ijk0LjU2NSIgeDI9IjY0IiB5Mj0iMTIyLjExIj4KDTxzdG9wIG9mZnNldD0iMCIgc3RvcC1jb2xvcj0iI2Y3OGMxZiI+Cg08L3N0b3A+Cg08c3RvcCBvZmZzZXQ9Ii40OTQiIHN0b3AtY29sb3I9IiNmMzdmMjEiPgoNPC9zdG9wPgoNPHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjZWQ2ZDIzIj4KDTwvc3RvcD4KDTwvbGluZWFyR3JhZGllbnQ+Cg08cGF0aCBkPSJNNjQuMTMgOTQuNjhINjRjLTI1LjQ5LjAzLTUxLjEzIDcuNS01MS4xMyAyNS4yOFYxMjRoMTAyLjI3di00LjA0Yy0uMDEtMTYuNzYtMjUuNDEtMjUuMjgtNTEuMDEtMjUuMjh6IiBmaWxsPSJ1cmwoI0ljb25pZnlJZDE3ZWNkYjI5MDRkMTc4ZWFiMTc5MzQpIj4KDTwvcGF0aD4KDTwvZz4KDTxnPgoNPHBhdGggZD0iTTU0LjkyIDkwLjA4djkuOThjMCA0LjUxIDMuNyA4LjE3IDguMjYgOC4xN2gxLjY1YzQuNTYgMCA4LjI2LTMuNjYgOC4yNi04LjE3di05Ljk4SDU0LjkyeiIgZmlsbD0iI2VkYzM5MSI+Cg08L3BhdGg+Cg08L2c+Cg08Zz4KDTxwYXRoIGQ9Ik05MS4zMyA1MC40M0gzNi42N2MtNS44OSAwLTEwLjcxIDUuMTQtMTAuNzEgMTEuNDFzNC44MiAxMS40MSAxMC43MSAxMS40MWg1NC42NWM1Ljg5IDAgMTAuNzEtNS4xNCAxMC43MS0xMS40MXMtNC44MS0xMS40MS0xMC43LTExLjQxeiIgZmlsbD0iI2VkYzM5MSI+Cg08L3BhdGg+Cg08L2c+Cg08Zz4KDTxwYXRoIGQ9Ik02NCAxMS4wN2MtMTcuNCAwLTMzLjUyIDE4LjYxLTMzLjUyIDQ1LjM5YzAgMjYuNjQgMTYuNjEgMzkuODEgMzMuNTIgMzkuODFTOTcuNTIgODMuMSA5Ny41MiA1Ni40NmMwLTI2Ljc4LTE2LjEyLTQ1LjM5LTMzLjUyLTQ1LjM5eiIgZmlsbD0iI2Y5ZGRiZCI+Cg08L3BhdGg+Cg08L2c+Cg08ZyBmaWxsPSIjMzEyZDJkIj4KDTxlbGxpcHNlIGN4PSI0Ny41NiIgY3k9IjU4LjgxIiByeD0iNC45MyIgcnk9IjUuMSI+Cg08L2VsbGlwc2U+Cg08ZWxsaXBzZSBjeD0iODAuNDQiIGN5PSI1OC44MSIgcng9IjQuOTMiIHJ5PSI1LjEiPgoNPC9lbGxpcHNlPgoNPC9nPgoNPGcgZmlsbD0iIzQ1NDE0MCI+Cg08cGF0aCBkPSJNNTQuOTggNDkuODJjLS45My0xLjIzLTMuMDctMy4wMS03LjIzLTMuMDFzLTYuMzEgMS43OS03LjIzIDMuMDFjLS40MS41NC0uMzEgMS4xNy0uMDIgMS41NWMuMjYuMzUgMS4wNC42OCAxLjkuMzljLjg2LS4yOSAyLjU0LTEuMTYgNS4zNS0xLjE4YzIuODEuMDIgNC40OS44OSA1LjM1IDEuMThjLjg2LjI5IDEuNjQtLjAzIDEuOS0uMzljLjI5LS4zOC4zOS0xLjAxLS4wMi0xLjU1eiI+Cg08L3BhdGg+Cg08cGF0aCBkPSJNODcuNDggNDkuODJjLS45My0xLjIzLTMuMDctMy4wMS03LjIzLTMuMDFzLTYuMzEgMS43OS03LjIzIDMuMDFjLS40MS41NC0uMzEgMS4xNy0uMDIgMS41NWMuMjYuMzUgMS4wNC42OCAxLjkuMzljLjg2LS4yOSAyLjU0LTEuMTYgNS4zNS0xLjE4YzIuODEuMDIgNC40OS44OSA1LjM1IDEuMThjLjg2LjI5IDEuNjQtLjAzIDEuOS0uMzljLjI5LS4zOC4zOS0xLjAxLS4wMi0xLjU1eiI+Cg08L3BhdGg+Cg08L2c+Cg08cGF0aCBkPSJNNjcuODYgNjguMDZjLS4xMS0uMDQtLjIxLS4wNy0uMzItLjA4aC03LjA3Yy0uMTEuMDEtLjIyLjA0LS4zMi4wOGMtLjY0LjI2LS45OS45Mi0uNjkgMS42M2MuMy43MSAxLjcxIDIuNjkgNC41NSAyLjY5czQuMjUtMS45OSA0LjU1LTIuNjljLjI5LS43MS0uMDYtMS4zNy0uNy0xLjYzeiIgZmlsbD0iI2RiYTY4OSI+Cg08L3BhdGg+Cg08cGF0aCBkPSJNNzIuNDIgNzYuMTRjLTMuMTkgMS44OS0xMy42MyAxLjg5LTE2LjgxIDBjLTEuODMtMS4wOS0zLjcuNTgtMi45NCAyLjI0Yy43NSAxLjYzIDYuNDUgNS40MiAxMS4zNyA1LjQyczEwLjU1LTMuNzkgMTEuMy01LjQyYy43NS0xLjY2LTEuMDktMy4zMy0yLjkyLTIuMjR6IiBmaWxsPSIjNDQ0Ij4KDTwvcGF0aD4KDTxnPgoNPHBhdGggZD0iTTEwNC4wNyAyNS4xMWMtMi40NC0zLjctNy45MS04LjY0LTEyLjgyLTguOTdjLS43OS00LjcyLTUuODQtOC43Mi0xMC43My0xMC4yN2MtMTMuMjMtNC4xOS0yMS44NC41MS0yNi40NiAzLjA0Yy0uOTYuNTMtNy4xNyAzLjk3LTExLjUxIDEuNWMtMi43Mi0xLjU1LTIuNjctNS43NC0yLjY3LTUuNzRzLTguNTMgMy4yNS01LjYxIDEyLjI5Yy0yLjkzLjEyLTYuNzcgMS4zNi04LjggNS40N2MtMi40MiA0LjktMS41NiA4Ljk5LS44NiAxMC45NWMtMi41MiAyLjE0LTUuNjkgNi42OS0zLjUyIDEyLjZjMS42NCA0LjQ1IDguMTcgNi41IDguMTcgNi41Yy0uNDYgOC4wMSAxLjAzIDEyLjk0IDEuODIgMTQuOTRjLjE0LjM1LjYzLjMyLjcyLS4wNGMuOTktMy45NiA0LjM3LTE3LjggNC4wMy0yMC4yMWMwIDAgMTEuMzUtMi4yNSAyMi4xNy0xMC4yMmMyLjItMS42MiA0LjU5LTMgNy4xMy00LjAyYzEzLjU5LTUuNDEgMTYuNDQgMy44MiAxNi40NCAzLjgyczkuNDItMS44MSAxMi4yNiAxMS4yN2MxLjA3IDQuOSAxLjggMTIuNzUgMi40IDE4LjI0Yy4wNC4zOS41Ny40Ny43My4xMWMuOTUtMi4xOCAyLjg1LTYuNSAzLjMtMTAuOTFjLjE2LTEuNTUgNC4zNC0zLjYgNi4xNC0xMC4yNmMyLjM5LTguODgtLjU2LTE3LjQyLTIuMzMtMjAuMDl6IiBmaWxsPSIjZTYzZDAwIj4KDTwvcGF0aD4KDTxyYWRpYWxHcmFkaWVudCBpZD0iSWNvbmlmeUlkMTdlY2RiMjkwNGQxNzhlYWIxNzkzNSIgY3g9Ijg0LjYyNSIgY3k9IjQxLjQ3NCIgcj0iMzUuNjMzIiBncmFkaWVudFRyYW5zZm9ybT0ibWF0cml4KC4zMDc2IC45NTE1IC0uNzA2IC4yMjgyIDg3Ljg3MyAtNDguNTEzKSIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiPgoNPHN0b3Agb2Zmc2V0PSIuNjk5IiBzdG9wLWNvbG9yPSIjZjk4YjI1IiBzdG9wLW9wYWNpdHk9IjAiPgoNPC9zdG9wPgoNPHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjZjk4YjI1Ij4KDTwvc3RvcD4KDTwvcmFkaWFsR3JhZGllbnQ+Cg08cGF0aCBkPSJNMTAwLjIyIDU1LjVjLjE2LTEuNTUgNC4zNC0zLjYgNi4xNC0xMC4yNmMuMTktLjcxLjM1LTEuNDMuNS0yLjE1YzEuNDYtOC4wOS0xLjE2LTE1LjUyLTIuNzktMTcuOThjLTIuMjYtMy40Mi03LjEtNy44OS0xMS43LTguODFjLS40LS4wNS0uNzktLjEtMS4xNi0uMTJjMCAwIC4zMyAyLjE1LS41NCAzLjg2Yy0xLjEyIDIuMjItMy40MSAyLjc1LTMuNDEgMi43NWMxMS45OCAxMS45OCAxMS4xMiAyMiAxMi45NiAzMi43MXoiIGZpbGw9InVybCgjSWNvbmlmeUlkMTdlY2RiMjkwNGQxNzhlYWIxNzkzNSkiPgoNPC9wYXRoPgoNPHJhZGlhbEdyYWRpZW50IGlkPSJJY29uaWZ5SWQxN2VjZGIyOTA0ZDE3OGVhYjE3OTM2IiBjeD0iNDcuMjgiIGN5PSI0LjIiIHI9IjkuMzQzIiBncmFkaWVudFRyYW5zZm9ybT0ibWF0cml4KC44ODEzIC40NzI2IC0uNTYwMyAxLjA0NSA3Ljk2NiAtMjIuNTMyKSIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiPgoNPHN0b3Agb2Zmc2V0PSIuMzkzIiBzdG9wLWNvbG9yPSIjZjk4YjI1Ij4KDTwvc3RvcD4KDTxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iI2Y5OGIyNSIgc3RvcC1vcGFjaXR5PSIwIj4KDTwvc3RvcD4KDTwvcmFkaWFsR3JhZGllbnQ+Cg08cGF0aCBkPSJNNTYuOTUgNy4zOWMtMS4wOS41My0yLjA2IDEuMDYtMi44OSAxLjUxYy0uOTYuNTMtNy4xNyAzLjk3LTExLjUxIDEuNWMtMi42Ny0xLjUyLTIuNjctNS41OC0yLjY3LTUuNzJjLTEuMjMgMS41Ny00Ljk1IDEyLjc4IDUuOTMgMTMuNTNjNC42OS4zMiA3LjU4LTMuNzcgOS4zLTcuMjNjLjYxLTEuMjcgMS41OC0zLjEgMS44NC0zLjU5eiIgZmlsbD0idXJsKCNJY29uaWZ5SWQxN2VjZGIyOTA0ZDE3OGVhYjE3OTM2KSI+Cg08L3BhdGg+Cg08cmFkaWFsR3JhZGllbnQgaWQ9Ikljb25pZnlJZDE3ZWNkYjI5MDRkMTc4ZWFiMTc5MzciIGN4PSIxNjAuMzEyIiBjeT0iNjIuNTM4IiByPSIzNS40MSIgZ3JhZGllbnRUcmFuc2Zvcm09Im1hdHJpeCgtLjkzNzggLS4zOTQ0IC4yMTgyIC0uNTI4NSAyMDYuNzk1IDExOS41OCkiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIj4KDTxzdG9wIG9mZnNldD0iLjcwOSIgc3RvcC1jb2xvcj0iI2Y5OGIyNSIgc3RvcC1vcGFjaXR5PSIwIj4KDTwvc3RvcD4KDTxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iI2Y5OGIyNSI+Cg08L3N0b3A+Cg08L3JhZGlhbEdyYWRpZW50PgoNPHBhdGggZD0iTTc5LjE2IDUuNDdjNy4zMiAxLjk4IDEwLjg5IDUuNzEgMTIuMDggMTAuNjhjLjM1IDEuNDYuNzcgMTUuMDgtMjUuMjMtLjRjLTkuNjctNS43Ni03LjAzLTkuMzYtNS45LTkuNzdjNC40Mi0xLjYgMTAuODUtMi43MyAxOS4wNS0uNTF6IiBmaWxsPSJ1cmwoI0ljb25pZnlJZDE3ZWNkYjI5MDRkMTc4ZWFiMTc5MzcpIj4KDTwvcGF0aD4KDTxyYWRpYWxHcmFkaWVudCBpZD0iSWNvbmlmeUlkMTdlY2RiMjkwNGQxNzhlYWIxNzkzOCIgY3g9IjQ2LjM2OSIgY3k9IjE1Ljk2MiIgcj0iMTMuMDk5IiBncmFkaWVudFRyYW5zZm9ybT0ibWF0cml4KDEgMCAwIDEuMjIzMyAwIC0zLjU2NCkiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIj4KDTxzdG9wIG9mZnNldD0iLjc4NiIgc3RvcC1jb2xvcj0iI2Y5OGIyNSIgc3RvcC1vcGFjaXR5PSIwIj4KDTwvc3RvcD4KDTxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iI2Y5OGIyNSI+Cg08L3N0b3A+Cg08L3JhZGlhbEdyYWRpZW50PgoNPHBhdGggZD0iTTM5Ljg0IDQuNjhjLS4wMS4wMS0uMDMuMDEtLjA2LjAyaC0uMDFjLS45My4zOS04LjI0IDMuNzgtNS41MSAxMi4yNmw3Ljc4IDEuMjVjLTYuODktNi45OC0yLjE3LTEzLjU1LTIuMTctMTMuNTVzLS4wMi4wMS0uMDMuMDJ6IiBmaWxsPSJ1cmwoI0ljb25pZnlJZDE3ZWNkYjI5MDRkMTc4ZWFiMTc5MzgpIj4KDTwvcGF0aD4KDTxyYWRpYWxHcmFkaWVudCBpZD0iSWNvbmlmeUlkMTdlY2RiMjkwNGQxNzhlYWIxNzkzOSIgY3g9IjM4LjE1MyIgY3k9IjI1LjQ0MiIgcj0iMTYuMDgzIiBncmFkaWVudFRyYW5zZm9ybT0ibWF0cml4KC0uOTY1NyAtLjI1OTggLjI0MzIgLS45MDM3IDY4LjgxIDU4LjM0NykiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIj4KDTxzdG9wIG9mZnNldD0iLjUwMyIgc3RvcC1jb2xvcj0iI2Y5OGIyNSIgc3RvcC1vcGFjaXR5PSIwIj4KDTwvc3RvcD4KDTxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iI2Y5OGIyNSI+Cg08L3N0b3A+Cg08L3JhZGlhbEdyYWRpZW50PgoNPHBhdGggZD0iTTM5LjA3IDE3LjczbC00LjgxLS43N2MtLjE5IDAtLjgzLjA2LTEuMTguMTFjLTIuNzEuMzgtNS45IDEuNzgtNy42MyA1LjM2Yy0xLjg2IDMuODYtMS44MSA3LjE3LTEuMyA5LjM4Yy4xNS43NC40NSAxLjU4LjQ1IDEuNThzMi4zOC0yLjI2IDguMDUtMi40MWw2LjQyLTEzLjI1eiIgZmlsbD0idXJsKCNJY29uaWZ5SWQxN2VjZGIyOTA0ZDE3OGVhYjE3OTM5KSI+Cg08L3BhdGg+Cg08cmFkaWFsR3JhZGllbnQgaWQ9Ikljb25pZnlJZDE3ZWNkYjI5MDRkMTc4ZWFiMTc5NDAiIGN4PSIzNi4zOSIgY3k9IjQyLjkxNSIgcj0iMTYuODg2IiBncmFkaWVudFRyYW5zZm9ybT0ibWF0cml4KC45OTA3IC4xMzYzIC0uMTM1MyAuOTgzNyA2LjE0OCAtNC4yNTkpIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+Cg08c3RvcCBvZmZzZXQ9Ii42OTkiIHN0b3AtY29sb3I9IiNmOThiMjUiIHN0b3Atb3BhY2l0eT0iMCI+Cg08L3N0b3A+Cg08c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiNmOThiMjUiPgoNPC9zdG9wPgoNPC9yYWRpYWxHcmFkaWVudD4KDTxwYXRoIGQ9Ik0yNC4zNyAzMy41OGMtMi4zNyAyLjEtNS41NiA2Ljc5LTMuMjEgMTIuNjFjMS43OCA0LjM5IDguMDkgNi4yOSA4LjA5IDYuMjljMCAuMDIgMS4yNi4zOSAxLjkxLjM5bDEuNDgtMjEuOWMtMy4wMyAwLTUuOTQuOTEtNy44MiAyLjIyYy4wMy4wNC0uNDYuMzYtLjQ1LjM5eiIgZmlsbD0idXJsKCNJY29uaWZ5SWQxN2VjZGIyOTA0ZDE3OGVhYjE3OTQwKSI+Cg08L3BhdGg+Cg08L2c+Cg08L3N2Zz4=", Do = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KDTwhLS0gVXBsb2FkZWQgdG86IFNWRyBSZXBvLCB3d3cuc3ZncmVwby5jb20sIEdlbmVyYXRvcjogU1ZHIFJlcG8gTWl4ZXIgVG9vbHMgLS0+Cjxzdmcgd2lkdGg9IjgwMHB4IiBoZWlnaHQ9IjgwMHB4IiB2aWV3Qm94PSIwIDAgNjQgNjQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIGFyaWEtaGlkZGVuPSJ0cnVlIiByb2xlPSJpbWciIGNsYXNzPSJpY29uaWZ5IGljb25pZnktLWVtb2ppb25lIiBwcmVzZXJ2ZUFzcGVjdFJhdGlvPSJ4TWlkWU1pZCBtZWV0Ij4KDTxwYXRoIGQ9Ik01Ny42IDEzLjdjLS43LTEtMS42LTEuNy0yLjctMi4yYy0zLjQtMS43LTExLjYtMS4zLTEyLjMtNS43Yy0uOS01LjctNS45LjEtNi44LjFjLTEuMSAwLTEuNi0zLjktMy43LTMuOWMtMi4yIDAtMi43IDMuOS0zLjcgMy45Yy0uOSAwLTUuOS01LjgtNi44LS4xYy0uNyA0LjMtOSA0LTEyLjMgNS43Yy0xIC41LTIgMS4yLTIuNyAyLjJjLS41LjguNiAxLjYgMS4yLjljMS42LTIgNC44LTIuNCA3LjEtMi44YzEuOS0uNCA0LS42IDUuOS0xLjRjMi42LTEgMi41LTQuOSAzLjMtNC45Yy42IDAgMi43IDMgNC41IDNjMS42IDAgMi42LTMuNyAzLjUtMy43Yy45IDAgMS45IDMuNyAzLjUgMy43YzEuOSAwIDQtMyA0LjYtM2MuOCAwIC43IDMuOSAzLjMgNC45YzEuOC44IDMuOSAxIDUuOSAxLjRjMi4zLjUgNS42LjggNy4xIDIuOGMuNS43IDEuNi0uMiAxLjEtLjkiIGZpbGw9IiMwMGI5ZjEiPgoNPC9wYXRoPgoNPHBhdGggZD0iTTUzIDU3YzAgMi44LTIuMiA1LTUgNUgxNmMtMi44IDAtNS0yLjItNS01VjM2aDQydjIxeiIgZmlsbD0iIzg5OTY3YSI+Cg08L3BhdGg+Cg08cGF0aCBkPSJNMzIgMTJjLTE1LjUgMC0yMSA4LjUtMjEgMjR2MjFoNDJWMzZjMC0xNS41LTUuNS0yNC0yMS0yNCIgZmlsbD0iI2I2YzRhNyI+Cg08L3BhdGg+Cg08ZyBmaWxsPSIjODk5NjdhIj4KDTxwYXRoIGQ9Ik0xMSA1NWMtMS4xIDAtMi0xLjItMi0yLjZ2LTYuOGMwLTEuNC45LTIuNiAyLTIuNnYxMiI+Cg08L3BhdGg+Cg08cGF0aCBkPSJNNTMgNDNjMS4xIDAgMiAxLjIgMiAyLjZ2Ni44YzAgMS40LS45IDIuNi0yIDIuNlY0MyI+Cg08L3BhdGg+Cg08L2c+Cg08ZyBmaWxsPSIjM2U0MzQ3Ij4KDTxwYXRoIGQ9Ik03IDIwSDV2MzBoNHYtMkg3eiI+Cg08L3BhdGg+Cg08cGF0aCBkPSJNNTcgMjB2MjhoLTJ2Mmg0VjIweiI+Cg08L3BhdGg+Cg08L2c+Cg08Y2lyY2xlIGN4PSI1OCIgY3k9IjIwIiByPSI0IiBmaWxsPSIjMDBiOWYxIj4KDTwvY2lyY2xlPgoNPGNpcmNsZSBjeD0iNiIgY3k9IjIwIiByPSI0IiBmaWxsPSIjZmY1MjYzIj4KDTwvY2lyY2xlPgoNPHBhdGggZD0iTTIxLjUgMzkuNWMtNC40IDAtOC0zLjYtOC04czMuNi04IDgtOHM4IDMuNiA4IDhzLTMuNiA4LTggOCIgZmlsbD0iI2VmZmZkOSI+Cg08L3BhdGg+Cg08Y2lyY2xlIGN4PSIyMS41IiBjeT0iMzEuNSIgcj0iNiIgZmlsbD0iIzU0NWI2MSI+Cg08L2NpcmNsZT4KDTxjaXJjbGUgY3g9IjIxLjUiIGN5PSIzMS41IiByPSIyLjMiIGZpbGw9IiNmZjUyNjMiPgoNPC9jaXJjbGU+Cg08cGF0aCBkPSJNNDIuNSAzOS41Yy00LjQgMC04LTMuNi04LThzMy42LTggOC04czggMy42IDggOHMtMy42IDgtOCA4IiBmaWxsPSIjZWZmZmQ5Ij4KDTwvcGF0aD4KDTxwYXRoIGQ9Ik00Mi41IDM3LjVjLTMuMyAwLTYtMi43LTYtNnMyLjctNiA2LTZzNiAyLjcgNiA2cy0yLjcgNi02IDYiIGZpbGw9IiM1NDViNjEiPgoNPC9wYXRoPgoNPGNpcmNsZSBjeD0iNDIuNSIgY3k9IjMxLjUiIHI9IjIuMyIgZmlsbD0iI2ZmNTI2MyI+Cg08L2NpcmNsZT4KDTxwYXRoIGQ9Ik0xOS44IDU0LjFjLTcuNCAwLTcuNC0xMyAwLTEzaDI0LjVjNy40IDAgNy40IDEzIDAgMTNIMTkuOCIgZmlsbD0iI2VmZmZkOSI+Cg08L3BhdGg+Cg08cGF0aCBkPSJNMjAuNSA1Mi42Yy02IDAtNi0xMCAwLTEwaDIzYzYgMCA2IDEwIDAgMTBoLTIzIiBmaWxsPSIjODk5NjdhIj4KDTwvcGF0aD4KDTxnIG9wYWNpdHk9Ii43IiBmaWxsPSIjM2U0MzQ3Ij4KDTxwYXRoIGQ9Ik0yMS4yIDUwLjdjMCAxLjItMiAxLjItMiAwdi02LjFjMC0xLjIgMi0xLjIgMiAwdjYuMSI+Cg08L3BhdGg+Cg08cGF0aCBkPSJNMjUuOSA1MC43YzAgMS4yLTIgMS4yLTIgMHYtNi4xYzAtMS4yIDItMS4yIDIgMHY2LjEiPgoNPC9wYXRoPgoNPHBhdGggZD0iTTMwLjYgNTAuN2MwIDEuMi0yIDEuMi0yIDB2LTYuMWMwLTEuMiAyLTEuMiAyIDB2Ni4xIj4KDTwvcGF0aD4KDTxwYXRoIGQ9Ik0zNS40IDUwLjdjMCAxLjItMiAxLjItMiAwdi02LjFjMC0xLjIgMi0xLjIgMiAwdjYuMSI+Cg08L3BhdGg+Cg08cGF0aCBkPSJNNDAuMSA1MC43YzAgMS4yLTIgMS4yLTIgMHYtNi4xYzAtMS4yIDItMS4yIDIgMHY2LjEiPgoNPC9wYXRoPgoNPHBhdGggZD0iTTQ0LjggNTAuN2MwIDEuMi0yIDEuMi0yIDB2LTYuMWMwLTEuMiAyLTEuMiAyIDB2Ni4xIj4KDTwvcGF0aD4KDTwvZz4KDTxjaXJjbGUgY3g9IjMyIiBjeT0iMzciIHI9IjIiIGZpbGw9IiNmNWY1ZjUiPgoNPC9jaXJjbGU+Cg08cGF0aCBmaWxsPSIjNTQ1YjYxIiBkPSJNMzAuMzE2IDM1Ljg2MmwuNTY2LS41NjVsMi44MjggMi44MjhsLS41NjUuNTY2eiI+Cg08L3BhdGg+Cg08L3N2Zz4=", ce = "https://demo-bot.tock.ai/io/tock/tockbot/web", Ss = [
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
                  src: Do,
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
                  src: Do,
                  width: "1em",
                  height: "1em"
                },
                userImage: {
                  src: xs,
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
], Ls = { class: "panel-body-wrapper d-flex flex-column" }, Ts = { class: "panel-body-body flex-grow-1" }, Ds = /* @__PURE__ */ w("div", { class: "option-category-header p-2 d-flex align-items-center border-top border-bottom" }, [
  /* @__PURE__ */ w("h6", { class: "m-0 ms-1" }, "Templates")
], -1), Cs = ["onClick"], Os = { class: "mb-0" }, As = {
  key: 0,
  class: "text-small mt-1"
}, Es = {
  key: 0,
  class: "alert alert-danger my-2 text-small"
}, zs = { class: "text-end" }, Ps = ["onClick"], $s = /* @__PURE__ */ X({
  __name: "editor-templates",
  setup(e) {
    const t = ee(), o = $(Ss);
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
      if (a._confirmTemplateChangeWarning)
        return;
      o.value.forEach((u) => {
        u.active = !1;
      }), a.active = !0;
      let l = document.documentElement;
      qt().forEach((u) => {
        l.style.setProperty(u.key, u.initialValue);
      }), a.styling && Object.entries(a.styling).forEach((u) => {
        l.style.setProperty(u[0], u[1]);
      }), Bn(a.tockUrl, a.options);
    }
    return (a, l) => (f(), I("div", Ls, [
      w("div", Ts, [
        Ds,
        (f(!0), I(q, null, le(o.value, (c) => (f(), I("div", {
          class: Q(["templates-list-entry cursor-pointer py-2 px-3", { active: c.active }])
        }, [
          w("div", {
            onClick: (u) => n(c)
          }, [
            w("h6", Os, F(c.name), 1),
            c.description ? (f(), I("div", As, F(c.description), 1)) : z("", !0)
          ], 8, Cs),
          c._confirmTemplateChangeWarning ? (f(), I("div", Es, [
            fe(" Your changes will be lost. Are you sure you want to apply this template and reset all your recent changes? "),
            w("div", zs, [
              w("button", {
                class: "btn btn-primary btn-sm me-2",
                onClick: (u) => i(c)
              }, " Yes ", 8, Ps),
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
}), Ys = {
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
}, Gs = { class: "form-label lh-1 d-flex gap-4 align-items-center justify-content-between position-relative" }, Rs = { class: "input-group input-group-sm" }, Ws = /* @__PURE__ */ w("i", { class: "bi bi bi-caret-down-fill" }, null, -1), Zs = [
  Ws
], Vs = ["contenteditable"], Bs = { key: 0 }, Fs = { key: 1 }, Us = ["onClick"], Hs = /* @__PURE__ */ w("i", { class: "bi bi-arrow-90deg-left" }, null, -1), Qs = [
  Hs
], Js = {
  key: 0,
  class: "list-group variable-suggestions"
}, Ks = ["onClick"], qs = {
  key: 1,
  class: "form-text text-small"
}, Xs = /* @__PURE__ */ w("span", { class: "text-muted" }, "Default value : ", -1), er = /* @__PURE__ */ X({
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
    qe(() => {
      i() && n();
    }), Zn(() => {
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
    let s = $(!1);
    const r = $(null);
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
      return Ys[o.variable.name];
    }
    const u = $(null);
    function m() {
      const p = o.variable.value.toString().trim(), x = /var\(([^)]+)\)/g;
      let A = [...p.matchAll(x)], T = [], P = 0;
      return A.length ? (A.forEach((G) => {
        G.index && G.index > P && T.push({ str: p.substring(P, G.index) }), T.push({ str: G[0], varName: G[1] }), P = G.index + G[0].length;
      }), P < p.length && T.push({ str: p.substring(P, p.length) })) : T.push({ str: p }), T;
    }
    function g(p, x) {
      p.stopPropagation(), t.jumpToStylingVariable(x);
    }
    let _;
    function S() {
      s.value = !0, _ = o.variable.value.toString();
    }
    function C() {
      s.value = !1;
    }
    function N(p) {
      p.preventDefault(), p.stopPropagation();
    }
    function D(p) {
      var A;
      let x = (A = p == null ? void 0 : p.target) == null ? void 0 : A.innerText;
      x.toString().trim().length < 1 && (x = "unset"), a(x);
    }
    function O() {
      t.stylingVariableReached(), S(), setTimeout(() => {
        k(999, 999);
      });
    }
    function k(p = 0, x = 0) {
      var T, P, G;
      const A = document.getSelection();
      if (A) {
        const Z = document.createRange(), te = (T = u.value) == null ? void 0 : T.children[0], Xt = ((G = (P = te == null ? void 0 : te.childNodes[0]) == null ? void 0 : P.textContent) == null ? void 0 : G.length) || 0;
        te != null && te.childNodes[0] && (Z.setStart(te == null ? void 0 : te.childNodes[0], Math.min(Xt, p)), Z.setEnd(te == null ? void 0 : te.childNodes[0], Math.min(Xt, x)), A.removeAllRanges(), A.addRange(Z));
      }
    }
    function L(p) {
      var A;
      N(p);
      let x = (A = p.clipboardData) == null ? void 0 : A.getData("text/plain");
      if (x) {
        const T = document.getSelection(), P = T == null ? void 0 : T.getRangeAt(0);
        if (P) {
          const G = o.variable.value.toString(), Z = G.substring(0, P.startOffset), te = G.substring(P.endOffset);
          x = Z + x + te;
        }
        a(x), _ = o.variable.value.toString();
      }
    }
    function M(p) {
      if (p.target, ["ArrowUp", "ArrowDown"].includes(p.key)) {
        const A = o.variable.value.toString().trim();
        var x = /^-?\d*\.?\d+(?:em|rem|px|%|vh|vw|pt)?/g;
        if (console.clear(), A.split(" ").length < 2 && x.test(A)) {
          N(p);
          const T = CSSNumericValue.parse(A);
          console.log(T);
          let P = 1;
          p.ctrlKey && (P /= 10), p.shiftKey && (P *= 10), p.key === "ArrowUp" && (T.value += P), p.key === "ArrowDown" && (T.value -= P);
          const G = T.toString();
          a(G), _ = G;
        }
      }
    }
    let b = $(!1);
    function v(p) {
      N(p), b.value = !b.value, b.value ? document.addEventListener("click", E) : document.removeEventListener("click", E);
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
      xn(p);
    }
    return (p, x) => {
      const A = bt("tooltip");
      return f(), I("div", {
        ref_key: "wrapperRef",
        ref: r,
        class: Q(["position-relative", { "targeted-item": i() }])
      }, [
        w("label", Gs, [
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
        w("div", Rs, [
          c() ? (f(), I("button", {
            key: 0,
            class: "btn btn-secondary px-1",
            type: "button",
            onClick: v
          }, Zs)) : z("", !0),
          w("div", {
            class: "form-control",
            ref_key: "inputRef",
            ref: u,
            spellcheck: "false",
            contenteditable: d(s),
            onClick: x[1] || (x[1] = (T) => S()),
            onBlur: x[2] || (x[2] = (T) => C()),
            onFocus: x[3] || (x[3] = (T) => O()),
            onKeyup: x[4] || (x[4] = (T) => N(T)),
            onPaste: x[5] || (x[5] = (T) => L(T)),
            onInput: x[6] || (x[6] = Vn((T) => D(T), ["self"])),
            onKeydown: x[7] || (x[7] = (T) => M(T)),
            tabindex: "0"
          }, [
            d(s) ? (f(), I(q, { key: 0 }, [
              fe(F(d(_)), 1)
            ], 64)) : z("", !0),
            d(s) ? z("", !0) : (f(!0), I(q, { key: 1 }, le(m(), (T) => (f(), I(q, null, [
              T.varName ? z("", !0) : (f(), I("span", Bs, F(T.str), 1)),
              T.varName ? (f(), I("span", Fs, [
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
                ], 8, Us)), [
                  [A, j(T.varName)]
                ]),
                fe(") ")
              ])) : z("", !0)
            ], 64))), 256))
          ], 40, Vs),
          o.variable.value != o.variable.initialValue ? W((f(), I("button", {
            key: 1,
            class: "btn btn-secondary",
            type: "button",
            id: "button-addon2",
            onClick: x[8] || (x[8] = (T) => l()),
            tabindex: "1"
          }, Qs)), [
            [A, "Restore default value"]
          ]) : z("", !0)
        ]),
        d(b) ? (f(), I("ul", Js, [
          (f(!0), I(q, null, le(c(), (T) => (f(), I("li", {
            class: "list-group-item cursor-pointer",
            onClick: (P) => a(T)
          }, F(T), 9, Ks))), 256))
        ])) : z("", !0),
        o.variable.value != o.variable.initialValue ? (f(), I("div", qs, [
          Xs,
          fe(F(o.variable.initialValue.toString()), 1)
        ])) : z("", !0)
      ], 2);
    };
  }
}), tr = {
  key: 0,
  class: "bi bi-chevron-right"
}, or = {
  key: 1,
  class: "bi bi-chevron-down"
}, nr = { class: "p-3 border-bottom" }, ir = /* @__PURE__ */ X({
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
    let n = $(!0);
    return qe(() => {
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
      const r = ze("editorVariablesGroup", !0);
      return f(), I(q, null, [
        w("div", {
          class: Q(["option-category-header p-2 d-flex align-items-center border-top border-bottom", {
            "cursor-pointer": o.path.length > 1
          }]),
          onClick: s[0] || (s[0] = (l) => o.path.length > 1 ? Le(n) ? n.value = !d(n) : n = !d(n) : null)
        }, [
          o.path.length > 1 && !d(n) ? (f(), I("i", tr)) : z("", !0),
          o.path.length > 1 && d(n) ? (f(), I("i", or)) : z("", !0),
          w("h6", {
            class: Q(["m-0 ms-1", { "fw-bold": o.path.length === 1 }])
          }, F((a = e.path) == null ? void 0 : a.join(" | ")), 3)
        ], 2),
        d(n) ? (f(!0), I(q, { key: 0 }, le(d(ks)(e.variables, e.path), (l, c) => (f(), I("div", nr, [
          (f(), K(er, {
            variables: e.variables,
            variable: l,
            key: l.key
          }, null, 8, ["variables", "variable"]))
        ]))), 256)) : z("", !0),
        (f(!0), I(q, null, le(d(js)(e.variables, e.path), (l) => (f(), I("div", null, [
          (f(), K(r, {
            variables: e.variables,
            path: [...e.path, l],
            key: [...e.path, l].join("")
          }, null, 8, ["variables", "path"]))
        ]))), 256))
      ], 64);
    };
  }
}), sr = { class: "panel-body-wrapper d-flex flex-column" }, rr = { class: "panel-body-header pt-1 px-1 border-bottom" }, ar = { class: "d-flex flex-wrap justify-content-between" }, lr = ["onClick"], cr = { class: "panel-body-body flex-grow-1" }, ur = /* @__PURE__ */ X({
  __name: "editor-variables",
  setup(e) {
    const t = ee();
    t.$onAction(({ name: s, store: r, args: a, after: l }) => {
      s === "refreshEditorPanels" && l(() => {
        i();
      });
    });
    const o = $([]), n = $([]);
    function i() {
      o.value = qt(), n.value = Is(o.value);
    }
    return (s, r) => (f(), I("div", sr, [
      w("div", rr, [
        w("div", ar, [
          (f(!0), I(q, null, le(n.value, (a) => (f(), I("div", {
            class: Q(["tag cursor-pointer me-1 mb-1 text-nowrap flex-fill text-center", { active: d(t).stylingCategory === a }]),
            onClick: (l) => d(t).setStylingCategory(a)
          }, F(a), 11, lr))), 256))
        ])
      ]),
      w("div", cr, [
        (f(), K(ir, {
          variables: o.value,
          path: [d(t).stylingCategory],
          key: d(t).currentCustomizationName + d(t).stylingCategory
        }, null, 8, ["variables", "path"]))
      ])
    ]));
  }
}), dr = { class: "form-label lh-1 d-flex gap-4 align-items-center justify-content-between position-relative" }, pr = { class: "text-muted text-small text-end text-truncate rtl" }, hr = { class: "form-text text-small mb-2" }, gr = { class: "input-group input-group-sm" }, fr = ["value", "disabled"], mr = ["value", "disabled"], _r = {
  key: 2,
  class: "form-check form-switch"
}, vr = ["id", "checked", "disabled"], yr = ["for"], br = { key: 0 }, wr = { key: 1 }, Mr = { key: 3 }, Ir = { class: "form-check form-switch" }, kr = ["id", "disabled"], jr = ["for"], Nr = { key: 0 }, xr = { key: 1 }, Sr = {
  key: 0,
  class: "input-group-sm imageDef-wrapper mt-2"
}, Lr = /* @__PURE__ */ w("label", { class: "form-label text-small mb-0" }, "Src (url or svg data image)", -1), Tr = ["value", "disabled"], Dr = { class: "d-flex gap-3" }, Cr = { class: "input-group-sm" }, Or = /* @__PURE__ */ w("label", { class: "form-label text-small mb-0" }, "Width", -1), Ar = ["value", "disabled"], Er = { class: "input-group-sm" }, zr = /* @__PURE__ */ w("label", { class: "form-label text-small mb-0" }, "Height", -1), Pr = ["value", "disabled"], $r = {
  key: 4,
  class: "w-100"
}, Yr = {
  key: 0,
  class: "d-flex text-small"
}, Gr = /* @__PURE__ */ w("div", { style: { width: "45%" } }, "Header name", -1), Rr = /* @__PURE__ */ w("div", null, "Header value", -1), Wr = [
  Gr,
  Rr
], Zr = { class: "input-group input-group-sm mb-1" }, Vr = ["value", "onInput", "disabled"], Br = ["value", "onInput", "disabled"], Fr = ["onClick", "disabled"], Ur = /* @__PURE__ */ w("i", { class: "bi bi-trash" }, null, -1), Hr = [
  Ur
], Qr = ["disabled"], it = 500, Ye = "New-Header-Name", Jr = /* @__PURE__ */ X({
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
    t.$onAction(({ name: k, store: L, args: M, after: b }) => {
      k === "refreshEditorPanels" && b(() => {
        setTimeout(() => {
          a();
        });
      });
    });
    const o = e;
    let n = $(!0), i = $(), s = $(!1), r;
    qe(() => {
      r = [o.group, o.path].join(".");
      const k = o.optionsModel[o.group], L = o.currentOptions[o.group], M = l(k, o.path), b = l(L, o.path);
      a(), typeof b > "u" ? i.value = M.default : i.value = b, o.value.type === "ImageDef" && i.value && (s.value = !0);
    });
    function a() {
      let k = !0;
      const L = o.optionsModel[o.group], M = l(L, o.path);
      M.conditions && M.conditions.forEach((b) => {
        l(o.currentOptions, b) || (k = !1);
      }), n.value = k;
    }
    const l = (k, L) => L.split(".").reduce((M, b) => b in M ? M[b] : void 0, k);
    function c(k, L) {
      t.templateDirtyState = !0, Fn(k, L);
    }
    const u = nt((k) => {
      c(r, k), i.value = k, t.refreshEditorPanels();
    }, it);
    Zt(s, (k, L) => {
      k || (c(r, void 0), i.value = void 0);
    });
    const m = nt((k, L) => {
      const M = [r, k].join(".");
      c(M, L);
      let b = i.value ? i.value : {};
      b[k] = L, i.value = b;
    }, it), g = nt((k, L) => {
      i.value[L] = i.value[k], delete i.value[k], c(r, i.value);
    }, it), _ = nt((k, L) => {
      i.value[k] = L, c(r, i.value);
    }, it);
    function S(k) {
      delete i.value[k], Object.keys(i.value).length < 1 && (i.value = void 0), c(r, i.value);
    }
    const C = $({});
    function N(k, L) {
      C.value[k] = L;
    }
    function D() {
      return !i.value || i.value[Ye] === void 0;
    }
    function O() {
      i.value ? i.value[Ye] = "" : i.value = { [Ye]: "" }, setTimeout(() => {
        C.value[Ye].focus(), C.value[Ye].select();
      });
    }
    return (k, L) => {
      var b, v, E;
      const M = bt("tooltip");
      return f(), I("div", {
        class: Q(["p-3 border-bottom", {
          inactive: !d(n),
          "tvke-secondary-bg-subtle": d(i) != o.value.default
        }])
      }, [
        w("label", dr, [
          w("span", {
            class: Q(["text-nowrap", { "fw-bold": d(i) != o.value.default }])
          }, F(o.value.title), 3),
          W((f(), I("span", pr, [
            fe(F(d(r)), 1)
          ])), [
            [M, d(r)]
          ])
        ]),
        w("div", hr, F(o.value.description), 1),
        w("div", gr, [
          o.value.type === "string" ? (f(), I("input", {
            key: 0,
            class: "form-control",
            placeholder: "Not specified",
            spellcheck: "false",
            value: d(i),
            onInput: L[0] || (L[0] = (j) => {
              var h;
              return d(u)((h = j == null ? void 0 : j.target) == null ? void 0 : h.value);
            }),
            disabled: !d(n)
          }, null, 40, fr)) : z("", !0),
          o.value.type === "number" ? (f(), I("input", {
            key: 1,
            type: "number",
            class: "form-control",
            placeholder: "Not specified",
            spellcheck: "false",
            value: d(i),
            onInput: L[1] || (L[1] = (j) => {
              var h;
              return d(u)((h = j == null ? void 0 : j.target) == null ? void 0 : h.value);
            }),
            disabled: !d(n)
          }, null, 40, mr)) : z("", !0),
          o.value.type === "boolean" ? (f(), I("div", _r, [
            w("input", {
              class: "form-check-input",
              type: "checkbox",
              role: "switch",
              id: k.path,
              checked: d(i),
              onInput: L[2] || (L[2] = (j) => {
                var h;
                return d(u)((h = j == null ? void 0 : j.target) == null ? void 0 : h.checked);
              }),
              disabled: !d(n)
            }, null, 40, vr),
            w("label", {
              class: "form-check-label",
              for: k.path
            }, [
              d(i) ? (f(), I("span", br, "enabled")) : z("", !0),
              d(i) ? z("", !0) : (f(), I("span", wr, "disabled"))
            ], 8, yr)
          ])) : z("", !0),
          o.value.type === "ImageDef" ? (f(), I("div", Mr, [
            w("div", Ir, [
              W(w("input", {
                class: "form-check-input",
                type: "checkbox",
                role: "switch",
                id: k.path,
                "onUpdate:modelValue": L[3] || (L[3] = (j) => Le(s) ? s.value = j : s = j),
                disabled: !d(n)
              }, null, 8, kr), [
                [$o, d(s)]
              ]),
              w("label", {
                class: "form-check-label",
                for: k.path
              }, [
                d(s) ? (f(), I("span", Nr, "enabled")) : z("", !0),
                d(s) ? z("", !0) : (f(), I("span", xr, "disabled"))
              ], 8, jr)
            ]),
            d(s) ? (f(), I("div", Sr, [
              Lr,
              w("input", {
                class: "form-control",
                placeholder: "Not specified",
                spellcheck: "false",
                value: (b = d(i)) == null ? void 0 : b.src,
                onInput: L[4] || (L[4] = (j) => {
                  var h;
                  return d(m)("src", (h = j == null ? void 0 : j.target) == null ? void 0 : h.value);
                }),
                disabled: !d(n)
              }, null, 40, Tr),
              w("div", Dr, [
                w("div", Cr, [
                  Or,
                  w("input", {
                    class: "form-control",
                    placeholder: "Not specified",
                    spellcheck: "false",
                    value: (v = d(i)) == null ? void 0 : v.width,
                    onInput: L[5] || (L[5] = (j) => {
                      var h;
                      return d(m)(
                        "width",
                        (h = j == null ? void 0 : j.target) == null ? void 0 : h.value
                      );
                    }),
                    disabled: !d(n)
                  }, null, 40, Ar)
                ]),
                w("div", Er, [
                  zr,
                  w("input", {
                    class: "form-control",
                    placeholder: "Not specified",
                    spellcheck: "false",
                    value: (E = d(i)) == null ? void 0 : E.height,
                    onInput: L[6] || (L[6] = (j) => {
                      var h;
                      return d(m)(
                        "height",
                        (h = j == null ? void 0 : j.target) == null ? void 0 : h.value
                      );
                    }),
                    disabled: !d(n)
                  }, null, 40, Pr)
                ])
              ])
            ])) : z("", !0)
          ])) : z("", !0),
          o.value.type === "KeyValues" ? (f(), I("div", $r, [
            d(i) ? (f(), I("div", Yr, Wr)) : z("", !0),
            (f(!0), I(q, null, le(d(i), (j, h) => (f(), I("div", Zr, [
              w("input", {
                class: "form-control",
                placeholder: "Not specified",
                spellcheck: "false",
                value: h,
                ref_for: !0,
                ref: (y) => N(h, y),
                onInput: (y) => {
                  var p;
                  return d(g)(
                    h,
                    (p = y == null ? void 0 : y.target) == null ? void 0 : p.value
                  );
                },
                disabled: !d(n)
              }, null, 40, Vr),
              w("input", {
                class: "form-control",
                placeholder: "Not specified",
                spellcheck: "false",
                value: j,
                onInput: (y) => {
                  var p;
                  return d(_)(
                    h,
                    (p = y == null ? void 0 : y.target) == null ? void 0 : p.value
                  );
                },
                disabled: !d(n)
              }, null, 40, Br),
              w("button", {
                class: "btn btn-danger btn-sm",
                onClick: (y) => S(h),
                disabled: !d(n)
              }, Hr, 8, Fr)
            ]))), 256)),
            D() ? (f(), I("button", {
              key: 1,
              class: "btn btn-link btn-sm p-0",
              onClick: O,
              disabled: !d(n)
            }, " Add new header ", 8, Qr)) : z("", !0)
          ])) : z("", !0)
        ])
      ], 2);
    };
  }
}), Kr = /* @__PURE__ */ X({
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
    let o = $();
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
    return (i, s) => (f(!0), I(q, null, le(d(o), (r) => (f(), K(Jr, {
      "options-model": t.optionsModel,
      group: t.group,
      path: r[0],
      value: r[1],
      "current-options": t.currentOptions
    }, null, 8, ["options-model", "group", "path", "value", "current-options"]))), 256));
  }
}), qr = { class: "option-category-header p-2 d-flex align-items-center border-top border-bottom" }, Xr = { class: "m-0 ms-1" }, Sn = /* @__PURE__ */ X({
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
      w("div", qr, [
        w("h6", Xr, F(t.group), 1)
      ]),
      Wt(Kr, {
        "options-model": t.optionsModel,
        group: t.group,
        "current-options": t.currentOptions
      }, null, 8, ["options-model", "group", "current-options"])
    ], 64));
  }
}), ea = { class: "panel-body-wrapper d-flex flex-column" }, ta = { class: "panel-body-body flex-grow-1" }, oa = /* @__PURE__ */ X({
  __name: "editor-preferences",
  setup(e) {
    const t = ee();
    let o = $(), n = $([]), i = $();
    t.$onAction(({ name: r, store: a, args: l, after: c }) => {
      r === "refreshEditorPanels" && c(() => {
        s();
      });
    });
    function s() {
      i.value = dt();
      const r = pt();
      o.value = r, n.value = ["localStorage", "initialization", "preferences"];
    }
    return (r, a) => (f(), I("div", ea, [
      w("div", ta, [
        (f(!0), I(q, null, le(d(n), (l, c) => (f(), K(Sn, {
          "options-model": d(o),
          group: l,
          "current-options": d(i),
          index: c
        }, null, 8, ["options-model", "group", "current-options", "index"]))), 256))
      ])
    ]));
  }
}), na = { class: "panel-body-wrapper d-flex flex-column" }, ia = { class: "panel-body-body flex-grow-1" }, sa = /* @__PURE__ */ X({
  __name: "editor-wording",
  setup(e) {
    const t = ee();
    let o = $(), n = $([]), i = $();
    t.$onAction(({ name: r, store: a, args: l, after: c }) => {
      r === "refreshEditorPanels" && c(() => {
        s();
      });
    });
    function s() {
      i.value = dt();
      const r = pt();
      o.value = r, n.value = ["wording"];
    }
    return (r, a) => (f(), I("div", na, [
      w("div", ia, [
        (f(!0), I(q, null, le(d(n), (l, c) => (f(), K(Sn, {
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
}, ra = /* @__PURE__ */ Ln(sa, [["__scopeId", "data-v-e0f618d5"]]);
var H = /* @__PURE__ */ ((e) => (e.bot = "bot", e.user = "user", e.app = "app", e))(H || {}), R = /* @__PURE__ */ ((e) => (e.message = "message", e.card = "card", e.carousel = "carousel", e.image = "image", e.loader = "loader", e.error = "error", e))(R || {}), Ne = /* @__PURE__ */ ((e) => (e.web_url = "web_url", e.postback = "postback", e.quick_reply = "quick_reply", e))(Ne || {});
function me() {
  const t = Math.max(Math.random(), 0.3), o = Math.max(Math.random(), 0.3), n = Math.ceil(t * 500), i = Math.ceil(o * 500);
  return `https://picsum.photos/${n}/${i}`;
}
const aa = [
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
          type: "file"
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
          type: "file"
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
], Tn = (e) => (Co("data-v-c7567ede"), e = e(), Oo(), e), la = { class: "panel-body-wrapper d-flex flex-column" }, ca = { class: "panel-body-body flex-grow-1" }, ua = /* @__PURE__ */ Tn(() => /* @__PURE__ */ w("div", { class: "option-category-header p-2 d-flex align-items-center border-top border-bottom" }, [
  /* @__PURE__ */ w("h6", { class: "m-0 ms-1" }, "Test")
], -1)), da = ["onClick"], pa = /* @__PURE__ */ Tn(() => /* @__PURE__ */ w("i", { class: "bi bi-send-plus me-1" }, null, -1)), ha = /* @__PURE__ */ X({
  __name: "editor-test",
  setup(e) {
    ee();
    function t(o) {
      const n = o.delay || 300;
      o.messages.forEach(
        (i, s, r) => {
          setTimeout(() => {
            oo(i), s < r.length - 1 && oo({
              type: R.loader,
              author: H.app,
              date: Date.now()
            });
          }, s * n);
        }
      );
    }
    return (o, n) => (f(), I("div", la, [
      w("div", ca, [
        ua,
        (f(!0), I(q, null, le(d(aa), (i) => (f(), I("div", {
          class: "templates-list-entry cursor-pointer py-2 px-3",
          onClick: (s) => t(i)
        }, [
          pa,
          fe(" " + F(i.name), 1)
        ], 8, da))), 256))
      ])
    ]));
  }
}), ga = /* @__PURE__ */ Ln(ha, [["__scopeId", "data-v-c7567ede"]]);
var Ge = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, Dn = { exports: {} };
(function(e, t) {
  (function(o, n) {
    n();
  })(Ge, function() {
    function o(c, u) {
      return typeof u > "u" ? u = { autoBom: !1 } : typeof u != "object" && (console.warn("Deprecated: Expected third argument to be a object"), u = { autoBom: !u }), u.autoBom && /^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(c.type) ? new Blob(["\uFEFF", c], { type: c.type }) : c;
    }
    function n(c, u, m) {
      var g = new XMLHttpRequest();
      g.open("GET", c), g.responseType = "blob", g.onload = function() {
        l(g.response, u, m);
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
    } : "download" in HTMLAnchorElement.prototype && !a ? function(c, u, m) {
      var g = r.URL || r.webkitURL, _ = document.createElement("a");
      u = u || c.name || "download", _.download = u, _.rel = "noopener", typeof c == "string" ? (_.href = c, _.origin === location.origin ? s(_) : i(_.href) ? n(c, u, m) : s(_, _.target = "_blank")) : (_.href = g.createObjectURL(c), setTimeout(function() {
        g.revokeObjectURL(_.href);
      }, 4e4), setTimeout(function() {
        s(_);
      }, 0));
    } : "msSaveOrOpenBlob" in navigator ? function(c, u, m) {
      if (u = u || c.name || "download", typeof c != "string")
        navigator.msSaveOrOpenBlob(o(c, m), u);
      else if (i(c))
        n(c, u, m);
      else {
        var g = document.createElement("a");
        g.href = c, g.target = "_blank", setTimeout(function() {
          s(g);
        });
      }
    } : function(c, u, m, g) {
      if (g = g || open("", "_blank"), g && (g.document.title = g.document.body.innerText = "downloading..."), typeof c == "string")
        return n(c, u, m);
      var _ = c.type === "application/octet-stream", S = /constructor/i.test(r.HTMLElement) || r.safari, C = /CriOS\/[\d]+/.test(navigator.userAgent);
      if ((C || _ && S || a) && typeof FileReader < "u") {
        var N = new FileReader();
        N.onloadend = function() {
          var k = N.result;
          k = C ? k : k.replace(/^data:[^;]*;/, "data:attachment/file;"), g ? g.location.href = k : location = k, g = null;
        }, N.readAsDataURL(c);
      } else {
        var D = r.URL || r.webkitURL, O = D.createObjectURL(c);
        g ? g.location = O : location.href = O, g = null, setTimeout(function() {
          D.revokeObjectURL(O);
        }, 4e4);
      }
    });
    r.saveAs = l.saveAs = l, e.exports = l;
  });
})(Dn);
var fa = Dn.exports;
const ma = { class: "panel-body-wrapper d-flex flex-column" }, _a = { class: "panel-body-header py-2 px-3 border-bottom text-small d-flex align-items-center" }, va = { class: "form-check form-check-inline no-min-height" }, ya = ["value"], ba = /* @__PURE__ */ w("label", {
  class: "form-check-label",
  for: "outputFormatHtml"
}, "html", -1), wa = { class: "form-check form-check-inline no-min-height" }, Ma = ["value"], Ia = /* @__PURE__ */ w("label", {
  class: "form-check-label",
  for: "outputFormatJs"
}, "json", -1), ka = { class: "form-check form-switch no-min-height ms-auto" }, ja = /* @__PURE__ */ w("label", {
  class: "form-check-label",
  for: "outputMinify"
}, "Minify", -1), Na = { class: "panel-body-body tvke-secondary-bg flex-grow-1 text-small p-3" }, xa = {
  key: 0,
  class: "text-center fst-italic pt-3"
}, Sa = {
  key: 1,
  class: "mb-2"
}, La = {
  key: 0,
  class: "mb-2"
}, Ta = {
  key: 1,
  class: "mb-2"
}, Da = { class: "output-block d-flex" }, Ca = { class: "pre-wrap mb-0 flex-grow-1" }, Oa = { class: "d-flex flex-column" }, Aa = /* @__PURE__ */ w("i", { class: "bi bi-copy" }, null, -1), Ea = [
  Aa
], za = /* @__PURE__ */ w("i", { class: "bi bi-file-earmark-arrow-down" }, null, -1), Pa = [
  za
], $a = { key: 2 }, Ya = {
  key: 0,
  class: "mb-2"
}, Ga = {
  key: 1,
  class: "mb-2"
}, Ra = { class: "output-block d-flex" }, Wa = { class: "pre-wrap mb-0 flex-grow-1" }, Za = { class: "d-flex flex-column" }, Va = /* @__PURE__ */ w("i", { class: "bi bi-copy" }, null, -1), Ba = [
  Va
], Fa = /* @__PURE__ */ w("i", { class: "bi bi-file-earmark-arrow-down" }, null, -1), Ua = [
  Fa
], Ha = /* @__PURE__ */ X({
  __name: "editor-output",
  setup(e) {
    const t = ee();
    t.$onAction(({ name: M, store: b, args: v, after: E }) => {
      M === "refreshEditorPanels" && E(() => {
        r();
      });
    });
    const o = $(), n = $();
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
      return M === "js" ? C() : _();
    }
    function l(M) {
      return M === "js" ? S() : u();
    }
    function c() {
      let M = qt();
      return M.sort((b, v) => b.key.localeCompare(v.key)), M = M.filter((b) => b.value.toString() !== b.initialValue.toString()), M;
    }
    function u() {
      const M = c(), b = {};
      return M.forEach((v) => {
        b[v.key] = v.value;
      }), b;
    }
    function m(M) {
      return t.outputFormat === B.json ? '"' + M + '"' : M;
    }
    function g() {
      return t.outputFormat === B.json ? "," : ";";
    }
    function _(M) {
      const b = t.outputMinified, v = "<", E = ">", j = [];
      let h = c();
      return h.length && (t.outputFormat === B.html && (j.push(v + "style" + E), j.push(":root {")), t.outputFormat === B.json && j.push("{"), h.forEach((y) => {
        j.push(
          m(y.key) + ": " + m(y.value.toString()) + g()
        );
      }), j.push("}"), t.outputFormat === B.html && j.push(v + "/style" + E), b && j.push(`
`)), j.join(b ? "" : `
`);
    }
    function S() {
      const M = dt(), b = pt();
      return N(M, b);
    }
    function C(M) {
      const b = t.outputMinified, v = "<", E = ">", j = [], h = dt(), y = pt(), p = N(h, y);
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
    function N(M, b) {
      const v = D(M, b);
      if (v)
        return O(v), v;
    }
    function D(M, b, v = {}) {
      if (To(M)) {
        const E = Object.entries(M);
        for (let j = 0; j < E.length; j++) {
          const [h, y] = E[j], p = D(y, b[h]);
          typeof p == "object" && p.type === "leaf" ? v[h] = p.value : typeof p < "u" && Object.keys(p).length && (v[h] = p);
        }
        return v;
      } else if (!b || M !== b.default)
        return { type: "leaf", value: M };
    }
    function O(M) {
      if (To(M)) {
        const b = Object.entries(M);
        for (let v = 0; v < b.length; v++) {
          const [E, j] = b[v];
          O(j) || delete M[E];
        }
        return M;
      } else
        return typeof M < "u";
    }
    function k(M) {
      xn(a(M));
    }
    function L(M) {
      const b = M === "css" ? "tvk-css.json" : "tvk-options.json", v = new Blob([JSON.stringify(l(M))], {
        type: "text/plain;charset=utf-8"
      });
      fa.saveAs(v, b);
    }
    return (M, b) => {
      const v = bt("tooltip");
      return f(), I("div", ma, [
        w("div", _a, [
          w("div", null, [
            W((f(), I("div", va, [
              W(w("input", {
                type: "radio",
                class: "form-check-input",
                name: "outputFormat",
                id: "outputFormatHtml",
                value: d(B).html,
                "onUpdate:modelValue": b[0] || (b[0] = (E) => d(t).outputFormat = E),
                onChange: b[1] || (b[1] = (E) => i(d(B).html))
              }, null, 40, ya), [
                [to, d(t).outputFormat]
              ]),
              ba
            ])), [
              [v, "Format output for html inclusion"]
            ]),
            W((f(), I("div", wa, [
              W(w("input", {
                type: "radio",
                class: "form-check-input",
                name: "outputFormat",
                id: "outputFormatJs",
                value: d(B).json,
                "onUpdate:modelValue": b[2] || (b[2] = (E) => d(t).outputFormat = E),
                onChange: b[3] || (b[3] = (E) => i(d(B).json))
              }, null, 40, Ma), [
                [to, d(t).outputFormat]
              ]),
              Ia
            ])), [
              [v, "Format output for js usage"]
            ])
          ]),
          W((f(), I("div", ka, [
            W(w("input", {
              class: "form-check-input",
              type: "checkbox",
              role: "switch",
              id: "outputMinify",
              "onUpdate:modelValue": b[4] || (b[4] = (E) => d(t).outputMinified = E),
              onChange: b[5] || (b[5] = (E) => s(E.target.checked))
            }, null, 544), [
              [$o, d(t).outputMinified]
            ]),
            ja
          ])), [
            [v, "Minify output code"]
          ])
        ]),
        w("div", Na, [
          !n.value && !o.value ? (f(), I("div", xa, " All settings set to default ")) : z("", !0),
          n.value ? (f(), I("div", Sa, [
            d(t).outputFormat === d(B).html ? (f(), I("label", La, "Script:")) : z("", !0),
            d(t).outputFormat === d(B).json ? (f(), I("label", Ta, "Options:")) : z("", !0),
            w("div", Da, [
              w("pre", Ca, [
                w("code", null, F(n.value), 1)
              ]),
              w("div", Oa, [
                W((f(), I("button", {
                  type: "button",
                  class: "btn btn-link btn-sm pe-0 pt-0",
                  onClick: b[6] || (b[6] = (E) => k(
                    "js"
                    /* js */
                  ))
                }, Ea)), [
                  [v, "Copy js code"]
                ]),
                d(t).outputFormat === d(B).json ? W((f(), I("button", {
                  key: 0,
                  type: "button",
                  class: "btn btn-link btn-sm pe-0",
                  onClick: b[7] || (b[7] = (E) => L(
                    "js"
                    /* js */
                  ))
                }, Pa)), [
                  [v, "Download js code"]
                ]) : z("", !0)
              ])
            ])
          ])) : z("", !0),
          o.value ? (f(), I("div", $a, [
            d(t).outputFormat === d(B).html ? (f(), I("label", Ya, "Style:")) : z("", !0),
            d(t).outputFormat === d(B).json ? (f(), I("label", Ga, "Css variables:")) : z("", !0),
            w("div", Ra, [
              w("pre", Wa, [
                w("code", null, F(o.value), 1)
              ]),
              w("div", Za, [
                W((f(), I("button", {
                  type: "button",
                  class: "btn btn-link btn-sm pe-0 pt-0",
                  onClick: b[8] || (b[8] = (E) => k(
                    "css"
                    /* css */
                  ))
                }, Ba)), [
                  [v, "Copy css code"]
                ]),
                d(t).outputFormat === d(B).json ? W((f(), I("button", {
                  key: 0,
                  type: "button",
                  class: "btn btn-link btn-sm pe-0",
                  onClick: b[9] || (b[9] = (E) => L(
                    "css"
                    /* css */
                  ))
                }, Ua)), [
                  [v, "Download css code"]
                ]) : z("", !0)
              ])
            ])
          ])) : z("", !0)
        ])
      ]);
    };
  }
}), Qa = { id: "tock-vue-kit-editor" }, Ja = { class: "panel-menu" }, Ka = /* @__PURE__ */ w("i", { class: "bi bi-layout-text-sidebar-reverse" }, null, -1), qa = [
  Ka
], Xa = /* @__PURE__ */ w("i", { class: "bi bi-gear" }, null, -1), el = [
  Xa
], tl = /* @__PURE__ */ w("i", { class: "bi bi-file-word" }, null, -1), ol = [
  tl
], nl = /* @__PURE__ */ w("i", { class: "bi bi-filetype-css" }, null, -1), il = [
  nl
], sl = /* @__PURE__ */ w("i", { class: "bi bi-play-circle" }, null, -1), rl = [
  sl
], al = /* @__PURE__ */ w("i", { class: "bi bi-floppy" }, null, -1), ll = [
  al
], cl = { class: "panel-body flex-grow-1 position-relative" }, pl = /* @__PURE__ */ X({
  __name: "editor",
  props: {
    height: { default: "100vh" }
  },
  setup(e) {
    $e(vs()), zo().appContext.app.use(Ui);
    const o = ee();
    return $("100vh"), qe(() => {
      o.refreshEditorPanels();
    }), (n, i) => {
      const s = bt("tooltip");
      return f(), I("div", Qa, [
        w("div", {
          class: "panel-wrapper d-flex",
          style: We({ height: n.height })
        }, [
          w("div", Ja, [
            W((f(), I("div", {
              class: Q(["panel-menu-entry", {
                active: d(o).editorPanel === d(V).templates
              }]),
              onClick: i[0] || (i[0] = (r) => d(o).setEditorPanel(d(V).templates))
            }, qa, 2)), [
              [s, { content: "Templates", placement: "right" }]
            ]),
            W((f(), I("div", {
              class: Q(["panel-menu-entry", {
                active: d(o).editorPanel === d(V).preferences
              }]),
              onClick: i[1] || (i[1] = (r) => d(o).setEditorPanel(d(V).preferences))
            }, el, 2)), [
              [s, { content: "Preferences", placement: "right" }]
            ]),
            W((f(), I("div", {
              class: Q(["panel-menu-entry", {
                active: d(o).editorPanel === d(V).wording
              }]),
              onClick: i[2] || (i[2] = (r) => d(o).setEditorPanel(d(V).wording))
            }, ol, 2)), [
              [s, { content: "Wording", placement: "right" }]
            ]),
            W((f(), I("div", {
              class: Q(["panel-menu-entry", {
                active: d(o).editorPanel === d(V).styling
              }]),
              onClick: i[3] || (i[3] = (r) => d(o).setEditorPanel(d(V).styling))
            }, il, 2)), [
              [s, { content: "Styling", placement: "right" }]
            ]),
            W((f(), I("div", {
              class: Q(["panel-menu-entry", {
                active: d(o).editorPanel === d(V).test
              }]),
              onClick: i[4] || (i[4] = (r) => d(o).setEditorPanel(d(V).test))
            }, rl, 2)), [
              [s, { content: "Test", placement: "right" }]
            ]),
            W((f(), I("div", {
              class: Q(["panel-menu-entry", {
                active: d(o).editorPanel === d(V).output
              }]),
              onClick: i[5] || (i[5] = (r) => d(o).setEditorPanel(d(V).output))
            }, ll, 2)), [
              [s, { content: "Output", placement: "right" }]
            ])
          ]),
          w("div", cl, [
            d(o).editorPanel === d(V).templates ? (f(), K($s, { key: 0 })) : z("", !0),
            d(o).editorPanel === d(V).styling ? (f(), K(ur, { key: 1 })) : z("", !0),
            d(o).editorPanel === d(V).preferences ? (f(), K(oa, { key: 2 })) : z("", !0),
            d(o).editorPanel === d(V).wording ? (f(), K(ra, { key: 3 })) : z("", !0),
            d(o).editorPanel === d(V).test ? (f(), K(ga, { key: 4 })) : z("", !0),
            d(o).editorPanel === d(V).output ? (f(), K(Ha, { key: 5 })) : z("", !0)
          ])
        ], 4)
      ]);
    };
  }
});
export {
  pl as TvkEditor
};
