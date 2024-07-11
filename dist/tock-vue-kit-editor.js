import { pushScopeId as In, popScopeId as kn, defineComponent as K, nextTick as St, openBlock as y, createBlock as Q, createElementBlock as I, normalizeClass as H, renderSlot as st, normalizeProps as jn, guardReactiveProps as Nn, withScopeId as xn, resolveComponent as Ce, normalizeStyle as $e, withKeys as Sn, createElementVNode as M, Fragment as J, createCommentVNode as z, mergeProps as xo, withCtx as rt, createVNode as $t, ref as $, createApp as Ln, h as Tn, toDisplayString as V, effectScope as So, markRaw as Ie, toRaw as ft, watch as Yt, unref as d, hasInjectionContext as Dn, inject as Cn, getCurrentInstance as Lo, reactive as On, isRef as je, isReactive as Gt, toRef as It, computed as To, getCurrentScope as An, onScopeDispose as En, toRefs as Jt, renderList as ue, createTextVNode as fe, onMounted as He, onBeforeUnmount as zn, resolveDirective as mt, withDirectives as W, withModifiers as Pn, vModelCheckbox as Do, vModelRadio as Kt } from "vue";
import { reload as $n, updateTvkOption as Yn, getTvkCurrentOptions as at, getTvkDefaultOptions as lt } from "tock-vue-kit";
const Gn = ["top", "right", "bottom", "left"], Xt = ["start", "end"], qt = /* @__PURE__ */ Gn.reduce((e, t) => e.concat(t, t + "-" + Xt[0], t + "-" + Xt[1]), []), ke = Math.min, we = Math.max, Rn = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
}, Wn = {
  start: "end",
  end: "start"
};
function Lt(e, t, o) {
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
function Co(e) {
  return e === "x" ? "y" : "x";
}
function Rt(e) {
  return e === "y" ? "height" : "width";
}
function Qe(e) {
  return ["top", "bottom"].includes(de(e)) ? "y" : "x";
}
function Wt(e) {
  return Co(Qe(e));
}
function Oo(e, t, o) {
  o === void 0 && (o = !1);
  const n = ie(e), i = Wt(e), s = Rt(i);
  let r = i === "x" ? n === (o ? "end" : "start") ? "right" : "left" : n === "start" ? "bottom" : "top";
  return t.reference[s] > t.floating[s] && (r = ut(r)), [r, ut(r)];
}
function Zn(e) {
  const t = ut(e);
  return [ct(e), t, ct(t)];
}
function ct(e) {
  return e.replace(/start|end/g, (t) => Wn[t]);
}
function Vn(e, t, o) {
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
function Bn(e, t, o, n) {
  const i = ie(e);
  let s = Vn(de(e), o === "start", n);
  return i && (s = s.map((r) => r + "-" + i), t && (s = s.concat(s.map(ct)))), s;
}
function ut(e) {
  return e.replace(/left|right|bottom|top/g, (t) => Rn[t]);
}
function Fn(e) {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    ...e
  };
}
function Ao(e) {
  return typeof e != "number" ? Fn(e) : {
    top: e,
    right: e,
    bottom: e,
    left: e
  };
}
function Ye(e) {
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
function eo(e, t, o) {
  let {
    reference: n,
    floating: i
  } = e;
  const s = Qe(t), r = Wt(t), a = Rt(r), l = de(t), c = s === "y", u = n.x + n.width / 2 - i.width / 2, f = n.y + n.height / 2 - i.height / 2, g = n[a] / 2 - i[a] / 2;
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
        y: f
      };
      break;
    case "left":
      m = {
        x: n.x - i.width,
        y: f
      };
      break;
    default:
      m = {
        x: n.x,
        y: n.y
      };
  }
  switch (ie(t)) {
    case "start":
      m[r] -= g * (o && c ? -1 : 1);
      break;
    case "end":
      m[r] += g * (o && c ? -1 : 1);
      break;
  }
  return m;
}
const Un = async (e, t, o) => {
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
    y: f
  } = eo(c, n, l), g = n, m = {}, S = 0;
  for (let C = 0; C < a.length; C++) {
    const {
      name: N,
      fn: D
    } = a[C], {
      x: O,
      y: k,
      data: L,
      reset: w
    } = await D({
      x: u,
      y: f,
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
    u = O ?? u, f = k ?? f, m = {
      ...m,
      [N]: {
        ...m[N],
        ...L
      }
    }, w && S <= 50 && (S++, typeof w == "object" && (w.placement && (g = w.placement), w.rects && (c = w.rects === !0 ? await r.getElementRects({
      reference: e,
      floating: t,
      strategy: i
    }) : w.rects), {
      x: u,
      y: f
    } = eo(c, g, l)), C = -1);
  }
  return {
    x: u,
    y: f,
    placement: g,
    strategy: i,
    middlewareData: m
  };
};
async function _t(e, t) {
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
    elementContext: f = "floating",
    altBoundary: g = !1,
    padding: m = 0
  } = xe(t, e), S = Ao(m), N = a[g ? f === "floating" ? "reference" : "floating" : f], D = Ye(await s.getClippingRect({
    element: (o = await (s.isElement == null ? void 0 : s.isElement(N))) == null || o ? N : N.contextElement || await (s.getDocumentElement == null ? void 0 : s.getDocumentElement(a.floating)),
    boundary: c,
    rootBoundary: u,
    strategy: l
  })), O = f === "floating" ? {
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
  }, w = Ye(s.convertOffsetParentRelativeRectToViewportRelativeRect ? await s.convertOffsetParentRelativeRectToViewportRelativeRect({
    elements: a,
    rect: O,
    offsetParent: k,
    strategy: l
  }) : O);
  return {
    top: (D.top - w.top + S.top) / L.y,
    bottom: (w.bottom - D.bottom + S.bottom) / L.y,
    left: (D.left - w.left + S.left) / L.x,
    right: (w.right - D.right + S.right) / L.x
  };
}
const Hn = (e) => ({
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
    } = xe(e, t) || {};
    if (c == null)
      return {};
    const f = Ao(u), g = {
      x: o,
      y: n
    }, m = Wt(i), S = Rt(m), C = await r.getDimensions(c), N = m === "y", D = N ? "top" : "left", O = N ? "bottom" : "right", k = N ? "clientHeight" : "clientWidth", L = s.reference[S] + s.reference[m] - g[m] - s.floating[S], w = g[m] - s.reference[m], b = await (r.getOffsetParent == null ? void 0 : r.getOffsetParent(c));
    let _ = b ? b[k] : 0;
    (!_ || !await (r.isElement == null ? void 0 : r.isElement(b))) && (_ = a.floating[k] || s.floating[S]);
    const E = L / 2 - w / 2, j = _ / 2 - C[S] / 2 - 1, h = ke(f[D], j), v = ke(f[O], j), p = h, x = _ - C[S] - v, A = _ / 2 - C[S] / 2 + E, T = Lt(p, A, x), P = !l.arrow && ie(i) != null && A !== T && s.reference[S] / 2 - (A < p ? h : v) - C[S] / 2 < 0, G = P ? A < p ? A - p : A - x : 0;
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
function Qn(e, t, o) {
  return (e ? [...o.filter((i) => ie(i) === e), ...o.filter((i) => ie(i) !== e)] : o.filter((i) => de(i) === i)).filter((i) => e ? ie(i) === e || (t ? ct(i) !== i : !1) : !0);
}
const Jn = function(e) {
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
        alignment: f,
        allowedPlacements: g = qt,
        autoAlignment: m = !0,
        ...S
      } = xe(e, t), C = f !== void 0 || g === qt ? Qn(f || null, m, g) : g, N = await _t(t, S), D = ((o = r.autoPlacement) == null ? void 0 : o.index) || 0, O = C[D];
      if (O == null)
        return {};
      const k = Oo(O, s, await (l.isRTL == null ? void 0 : l.isRTL(c.floating)));
      if (a !== O)
        return {
          reset: {
            placement: C[0]
          }
        };
      const L = [N[de(O)], N[k[0]], N[k[1]]], w = [...((n = r.autoPlacement) == null ? void 0 : n.overflows) || [], {
        placement: O,
        overflows: L
      }], b = C[D + 1];
      if (b)
        return {
          data: {
            index: D + 1,
            overflows: w
          },
          reset: {
            placement: b
          }
        };
      const _ = w.map((h) => {
        const v = ie(h.placement);
        return [h.placement, v && u ? (
          // Check along the mainAxis and main crossAxis side.
          h.overflows.slice(0, 2).reduce((p, x) => p + x, 0)
        ) : (
          // Check only the mainAxis.
          h.overflows[0]
        ), h.overflows];
      }).sort((h, v) => h[1] - v[1]), j = ((i = _.filter((h) => h[2].slice(
        0,
        // Aligned placements should not check their opposite crossAxis
        // side.
        ie(h[0]) ? 2 : 3
      ).every((v) => v <= 0))[0]) == null ? void 0 : i[0]) || _[0][0];
      return j !== a ? {
        data: {
          index: D + 1,
          overflows: w
        },
        reset: {
          placement: j
        }
      } : {};
    }
  };
}, Kn = function(e) {
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
        crossAxis: f = !0,
        fallbackPlacements: g,
        fallbackStrategy: m = "bestFit",
        fallbackAxisSideDirection: S = "none",
        flipAlignment: C = !0,
        ...N
      } = xe(e, t);
      if ((o = s.arrow) != null && o.alignmentOffset)
        return {};
      const D = de(i), O = de(a) === a, k = await (l.isRTL == null ? void 0 : l.isRTL(c.floating)), L = g || (O || !C ? [ut(a)] : Zn(a));
      !g && S !== "none" && L.push(...Bn(a, C, S, k));
      const w = [a, ...L], b = await _t(t, N), _ = [];
      let E = ((n = s.flip) == null ? void 0 : n.overflows) || [];
      if (u && _.push(b[D]), f) {
        const p = Oo(i, r, k);
        _.push(b[p[0]], b[p[1]]);
      }
      if (E = [...E, {
        placement: i,
        overflows: _
      }], !_.every((p) => p <= 0)) {
        var j, h;
        const p = (((j = s.flip) == null ? void 0 : j.index) || 0) + 1, x = w[p];
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
              var v;
              const T = (v = E.map((P) => [P.placement, P.overflows.filter((G) => G > 0).reduce((G, R) => G + R, 0)]).sort((P, G) => P[1] - G[1])[0]) == null ? void 0 : v[0];
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
async function Xn(e, t) {
  const {
    placement: o,
    platform: n,
    elements: i
  } = e, s = await (n.isRTL == null ? void 0 : n.isRTL(i.floating)), r = de(o), a = ie(o), l = Qe(o) === "y", c = ["left", "top"].includes(r) ? -1 : 1, u = s && l ? -1 : 1, f = xe(t, e);
  let {
    mainAxis: g,
    crossAxis: m,
    alignmentAxis: S
  } = typeof f == "number" ? {
    mainAxis: f,
    crossAxis: 0,
    alignmentAxis: null
  } : {
    mainAxis: 0,
    crossAxis: 0,
    alignmentAxis: null,
    ...f
  };
  return a && typeof S == "number" && (m = a === "end" ? S * -1 : S), l ? {
    x: m * u,
    y: g * c
  } : {
    x: g * c,
    y: m * u
  };
}
const qn = function(e) {
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
      } = t, l = await Xn(t, e);
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
}, ei = function(e) {
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
      } = xe(e, t), c = {
        x: o,
        y: n
      }, u = await _t(t, l), f = Qe(de(i)), g = Co(f);
      let m = c[g], S = c[f];
      if (s) {
        const N = g === "y" ? "top" : "left", D = g === "y" ? "bottom" : "right", O = m + u[N], k = m - u[D];
        m = Lt(O, m, k);
      }
      if (r) {
        const N = f === "y" ? "top" : "left", D = f === "y" ? "bottom" : "right", O = S + u[N], k = S - u[D];
        S = Lt(O, S, k);
      }
      const C = a.fn({
        ...t,
        [g]: m,
        [f]: S
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
}, ti = function(e) {
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
      } = xe(e, t), l = await _t(t, a), c = de(o), u = ie(o), f = Qe(o) === "y", {
        width: g,
        height: m
      } = n.floating;
      let S, C;
      c === "top" || c === "bottom" ? (S = c, C = u === (await (i.isRTL == null ? void 0 : i.isRTL(s.floating)) ? "start" : "end") ? "left" : "right") : (C = c, S = u === "end" ? "top" : "bottom");
      const N = m - l.top - l.bottom, D = g - l.left - l.right, O = ke(m - l[S], N), k = ke(g - l[C], D), L = !t.middlewareData.shift;
      let w = O, b = k;
      if (f ? b = u || L ? ke(k, D) : D : w = u || L ? ke(O, N) : N, L && !u) {
        const E = we(l.left, 0), j = we(l.right, 0), h = we(l.top, 0), v = we(l.bottom, 0);
        f ? b = g - 2 * (E !== 0 || j !== 0 ? E + j : we(l.left, l.right)) : w = m - 2 * (h !== 0 || v !== 0 ? h + v : we(l.top, l.bottom));
      }
      await r({
        ...t,
        availableWidth: b,
        availableHeight: w
      });
      const _ = await i.getDimensions(s.floating);
      return g !== _.width || m !== _.height ? {
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
const to = Math.min, Ge = Math.max, dt = Math.round;
function Eo(e) {
  const t = ae(e);
  let o = parseFloat(t.width), n = parseFloat(t.height);
  const i = e.offsetWidth, s = e.offsetHeight, r = dt(o) !== i || dt(n) !== s;
  return r && (o = i, n = s), { width: o, height: n, fallback: r };
}
function ye(e) {
  return Po(e) ? (e.nodeName || "").toLowerCase() : "";
}
let Je;
function zo() {
  if (Je)
    return Je;
  const e = navigator.userAgentData;
  return e && Array.isArray(e.brands) ? (Je = e.brands.map((t) => t.brand + "/" + t.version).join(" "), Je) : navigator.userAgent;
}
function le(e) {
  return e instanceof te(e).HTMLElement;
}
function _e(e) {
  return e instanceof te(e).Element;
}
function Po(e) {
  return e instanceof te(e).Node;
}
function oo(e) {
  return typeof ShadowRoot > "u" ? !1 : e instanceof te(e).ShadowRoot || e instanceof ShadowRoot;
}
function vt(e) {
  const { overflow: t, overflowX: o, overflowY: n, display: i } = ae(e);
  return /auto|scroll|overlay|hidden|clip/.test(t + n + o) && !["inline", "contents"].includes(i);
}
function oi(e) {
  return ["table", "td", "th"].includes(ye(e));
}
function Tt(e) {
  const t = /firefox/i.test(zo()), o = ae(e), n = o.backdropFilter || o.WebkitBackdropFilter;
  return o.transform !== "none" || o.perspective !== "none" || !!n && n !== "none" || t && o.willChange === "filter" || t && !!o.filter && o.filter !== "none" || ["transform", "perspective"].some((i) => o.willChange.includes(i)) || ["paint", "layout", "strict", "content"].some((i) => {
    const s = o.contain;
    return s != null && s.includes(i);
  });
}
function $o() {
  return !/^((?!chrome|android).)*safari/i.test(zo());
}
function Zt(e) {
  return ["html", "body", "#document"].includes(ye(e));
}
function Yo(e) {
  return _e(e) ? e : e.contextElement;
}
const Go = { x: 1, y: 1 };
function De(e) {
  const t = Yo(e);
  if (!le(t))
    return Go;
  const o = t.getBoundingClientRect(), { width: n, height: i, fallback: s } = Eo(t);
  let r = (s ? dt(o.width) : o.width) / n, a = (s ? dt(o.height) : o.height) / i;
  return r && Number.isFinite(r) || (r = 1), a && Number.isFinite(a) || (a = 1), { x: r, y: a };
}
function Ve(e, t, o, n) {
  var i, s;
  t === void 0 && (t = !1), o === void 0 && (o = !1);
  const r = e.getBoundingClientRect(), a = Yo(e);
  let l = Go;
  t && (n ? _e(n) && (l = De(n)) : l = De(e));
  const c = a ? te(a) : window, u = !$o() && o;
  let f = (r.left + (u && ((i = c.visualViewport) == null ? void 0 : i.offsetLeft) || 0)) / l.x, g = (r.top + (u && ((s = c.visualViewport) == null ? void 0 : s.offsetTop) || 0)) / l.y, m = r.width / l.x, S = r.height / l.y;
  if (a) {
    const C = te(a), N = n && _e(n) ? te(n) : n;
    let D = C.frameElement;
    for (; D && n && N !== C; ) {
      const O = De(D), k = D.getBoundingClientRect(), L = getComputedStyle(D);
      k.x += (D.clientLeft + parseFloat(L.paddingLeft)) * O.x, k.y += (D.clientTop + parseFloat(L.paddingTop)) * O.y, f *= O.x, g *= O.y, m *= O.x, S *= O.y, f += k.x, g += k.y, D = te(D).frameElement;
    }
  }
  return { width: m, height: S, top: g, right: f + m, bottom: g + S, left: f, x: f, y: g };
}
function ve(e) {
  return ((Po(e) ? e.ownerDocument : e.document) || window.document).documentElement;
}
function yt(e) {
  return _e(e) ? { scrollLeft: e.scrollLeft, scrollTop: e.scrollTop } : { scrollLeft: e.pageXOffset, scrollTop: e.pageYOffset };
}
function Ro(e) {
  return Ve(ve(e)).left + yt(e).scrollLeft;
}
function Be(e) {
  if (ye(e) === "html")
    return e;
  const t = e.assignedSlot || e.parentNode || oo(e) && e.host || ve(e);
  return oo(t) ? t.host : t;
}
function Wo(e) {
  const t = Be(e);
  return Zt(t) ? t.ownerDocument.body : le(t) && vt(t) ? t : Wo(t);
}
function pt(e, t) {
  var o;
  t === void 0 && (t = []);
  const n = Wo(e), i = n === ((o = e.ownerDocument) == null ? void 0 : o.body), s = te(n);
  return i ? t.concat(s, s.visualViewport || [], vt(n) ? n : []) : t.concat(n, pt(n));
}
function no(e, t, o) {
  return t === "viewport" ? Ye(function(n, i) {
    const s = te(n), r = ve(n), a = s.visualViewport;
    let l = r.clientWidth, c = r.clientHeight, u = 0, f = 0;
    if (a) {
      l = a.width, c = a.height;
      const g = $o();
      (g || !g && i === "fixed") && (u = a.offsetLeft, f = a.offsetTop);
    }
    return { width: l, height: c, x: u, y: f };
  }(e, o)) : _e(t) ? Ye(function(n, i) {
    const s = Ve(n, !0, i === "fixed"), r = s.top + n.clientTop, a = s.left + n.clientLeft, l = le(n) ? De(n) : { x: 1, y: 1 };
    return { width: n.clientWidth * l.x, height: n.clientHeight * l.y, x: a * l.x, y: r * l.y };
  }(t, o)) : Ye(function(n) {
    const i = ve(n), s = yt(n), r = n.ownerDocument.body, a = Ge(i.scrollWidth, i.clientWidth, r.scrollWidth, r.clientWidth), l = Ge(i.scrollHeight, i.clientHeight, r.scrollHeight, r.clientHeight);
    let c = -s.scrollLeft + Ro(n);
    const u = -s.scrollTop;
    return ae(r).direction === "rtl" && (c += Ge(i.clientWidth, r.clientWidth) - a), { width: a, height: l, x: c, y: u };
  }(ve(e)));
}
function io(e) {
  return le(e) && ae(e).position !== "fixed" ? e.offsetParent : null;
}
function so(e) {
  const t = te(e);
  let o = io(e);
  for (; o && oi(o) && ae(o).position === "static"; )
    o = io(o);
  return o && (ye(o) === "html" || ye(o) === "body" && ae(o).position === "static" && !Tt(o)) ? t : o || function(n) {
    let i = Be(n);
    for (; le(i) && !Zt(i); ) {
      if (Tt(i))
        return i;
      i = Be(i);
    }
    return null;
  }(e) || t;
}
function ni(e, t, o) {
  const n = le(t), i = ve(t), s = Ve(e, !0, o === "fixed", t);
  let r = { scrollLeft: 0, scrollTop: 0 };
  const a = { x: 0, y: 0 };
  if (n || !n && o !== "fixed")
    if ((ye(t) !== "body" || vt(i)) && (r = yt(t)), le(t)) {
      const l = Ve(t, !0);
      a.x = l.x + t.clientLeft, a.y = l.y + t.clientTop;
    } else
      i && (a.x = Ro(i));
  return { x: s.left + r.scrollLeft - a.x, y: s.top + r.scrollTop - a.y, width: s.width, height: s.height };
}
const ii = { getClippingRect: function(e) {
  let { element: t, boundary: o, rootBoundary: n, strategy: i } = e;
  const s = o === "clippingAncestors" ? function(c, u) {
    const f = u.get(c);
    if (f)
      return f;
    let g = pt(c).filter((N) => _e(N) && ye(N) !== "body"), m = null;
    const S = ae(c).position === "fixed";
    let C = S ? Be(c) : c;
    for (; _e(C) && !Zt(C); ) {
      const N = ae(C), D = Tt(C);
      (S ? D || m : D || N.position !== "static" || !m || !["absolute", "fixed"].includes(m.position)) ? m = N : g = g.filter((O) => O !== C), C = Be(C);
    }
    return u.set(c, g), g;
  }(t, this._c) : [].concat(o), r = [...s, n], a = r[0], l = r.reduce((c, u) => {
    const f = no(t, u, i);
    return c.top = Ge(f.top, c.top), c.right = to(f.right, c.right), c.bottom = to(f.bottom, c.bottom), c.left = Ge(f.left, c.left), c;
  }, no(t, a, i));
  return { width: l.right - l.left, height: l.bottom - l.top, x: l.left, y: l.top };
}, convertOffsetParentRelativeRectToViewportRelativeRect: function(e) {
  let { rect: t, offsetParent: o, strategy: n } = e;
  const i = le(o), s = ve(o);
  if (o === s)
    return t;
  let r = { scrollLeft: 0, scrollTop: 0 }, a = { x: 1, y: 1 };
  const l = { x: 0, y: 0 };
  if ((i || !i && n !== "fixed") && ((ye(o) !== "body" || vt(s)) && (r = yt(o)), le(o))) {
    const c = Ve(o);
    a = De(o), l.x = c.x + o.clientLeft, l.y = c.y + o.clientTop;
  }
  return { width: t.width * a.x, height: t.height * a.y, x: t.x * a.x - r.scrollLeft * a.x + l.x, y: t.y * a.y - r.scrollTop * a.y + l.y };
}, isElement: _e, getDimensions: function(e) {
  return le(e) ? Eo(e) : e.getBoundingClientRect();
}, getOffsetParent: so, getDocumentElement: ve, getScale: De, async getElementRects(e) {
  let { reference: t, floating: o, strategy: n } = e;
  const i = this.getOffsetParent || so, s = this.getDimensions;
  return { reference: ni(t, await i(o), n), floating: { x: 0, y: 0, ...await s(o) } };
}, getClientRects: (e) => Array.from(e.getClientRects()), isRTL: (e) => ae(e).direction === "rtl" }, si = (e, t, o) => {
  const n = /* @__PURE__ */ new Map(), i = { platform: ii, ...o }, s = { ...i.platform, _c: n };
  return Un(e, t, { ...i, platform: s });
};
function Zo(e, t) {
  for (const o in t)
    Object.prototype.hasOwnProperty.call(t, o) && (typeof t[o] == "object" && e[o] ? Zo(e[o], t[o]) : e[o] = t[o]);
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
function Fe(e, t) {
  let o = se.themes[e] || {}, n;
  do
    n = o[t], typeof n > "u" ? o.$extend ? o = se.themes[o.$extend] || {} : (o = null, n = se[t]) : o = null;
  while (o);
  return n;
}
function ri(e) {
  const t = [e];
  let o = se.themes[e] || {};
  do
    o.$extend && !o.$resetCss ? (t.push(o.$extend), o = se.themes[o.$extend] || {}) : o = null;
  while (o);
  return t.map((n) => `v-popper--theme-${n}`);
}
function ro(e) {
  const t = [e];
  let o = se.themes[e] || {};
  do
    o.$extend ? (t.push(o.$extend), o = se.themes[o.$extend] || {}) : o = null;
  while (o);
  return t;
}
let Oe = !1;
if (typeof window < "u") {
  Oe = !1;
  try {
    const e = Object.defineProperty({}, "passive", {
      get() {
        Oe = !0;
      }
    });
    window.addEventListener("test", null, e);
  } catch {
  }
}
let Vo = !1;
typeof window < "u" && typeof navigator < "u" && (Vo = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream);
const Bo = ["auto", "top", "bottom", "left", "right"].reduce((e, t) => e.concat([
  t,
  `${t}-start`,
  `${t}-end`
]), []), ao = {
  hover: "mouseenter",
  focus: "focus",
  click: "click",
  touch: "touchstart",
  pointer: "pointerdown"
}, lo = {
  hover: "mouseleave",
  focus: "blur",
  click: "click",
  touch: "touchend",
  pointer: "pointerup"
};
function co(e, t) {
  const o = e.indexOf(t);
  o !== -1 && e.splice(o, 1);
}
function kt() {
  return new Promise((e) => requestAnimationFrame(() => {
    requestAnimationFrame(e);
  }));
}
const ne = [];
let be = null;
const uo = {};
function po(e) {
  let t = uo[e];
  return t || (t = uo[e] = []), t;
}
let Dt = function() {
};
typeof window < "u" && (Dt = window.Element);
function Y(e) {
  return function(t) {
    return Fe(t.theme, e);
  };
}
const jt = "__floating-vue__popper", Fo = () => K({
  name: "VPopper",
  provide() {
    return {
      [jt]: {
        parentPopper: this
      }
    };
  },
  inject: {
    [jt]: { default: null }
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
      validator: (e) => Bo.includes(e)
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
      type: [String, Object, Dt, Boolean],
      default: Y("container")
    },
    boundary: {
      type: [String, Dt],
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
      return (e = this[jt]) == null ? void 0 : e.parentPopper;
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
      (this.distance || this.skidding) && e.middleware.push(qn({
        mainAxis: this.distance,
        crossAxis: this.skidding
      }));
      const t = this.placement.startsWith("auto");
      if (t ? e.middleware.push(Jn({
        alignment: this.placement.split("-")[1] ?? ""
      })) : e.placement = this.placement, this.preventOverflow && (this.shift && e.middleware.push(ei({
        padding: this.overflowPadding,
        boundary: this.boundary,
        crossAxis: this.shiftCrossAxis
      })), !t && this.flip && e.middleware.push(Kn({
        padding: this.overflowPadding,
        boundary: this.boundary
      }))), e.middleware.push(Hn({
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
      (this.autoMaxSize || this.autoBoundaryMaxSize) && (this.$_innerNode.style.maxWidth = null, this.$_innerNode.style.maxHeight = null, e.middleware.push(ti({
        boundary: this.boundary,
        padding: this.overflowPadding,
        apply: ({ availableWidth: n, availableHeight: i }) => {
          this.$_innerNode.style.maxWidth = n != null ? `${n}px` : null, this.$_innerNode.style.maxHeight = i != null ? `${i}px` : null;
        }
      })));
      const o = await si(this.$_referenceNode, this.$_popperNode, e);
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
      if (this.$_updateParentShownChildren(!0), this.$_hideInProgress = !1, clearTimeout(this.$_scheduleTimer), be && this.instantMove && be.instantMove && be !== this.parentPopper) {
        be.$_applyHide(!0), this.$_applyShow(!0);
        return;
      }
      t ? this.$_applyShow() : this.$_scheduleTimer = setTimeout(this.$_applyShow.bind(this), this.$_computeDelay("show"));
    },
    $_scheduleHide(e, t = !1) {
      if (this.shownChildren.size > 0) {
        this.pendingHide = !0;
        return;
      }
      this.$_updateParentShownChildren(!1), this.$_hideInProgress = !0, clearTimeout(this.$_scheduleTimer), this.isShown && (be = this), t ? this.$_applyHide() : this.$_scheduleTimer = setTimeout(this.$_applyHide.bind(this), this.$_computeDelay("hide"));
    },
    $_computeDelay(e) {
      const t = this.delay;
      return parseInt(t && t[e] || t || 0);
    },
    async $_applyShow(e = !1) {
      clearTimeout(this.$_disposeTimer), clearTimeout(this.$_scheduleTimer), this.skipTransition = e, !this.isShown && (this.$_ensureTeleport(), await kt(), await this.$_computePosition(), await this.$_applyShowEffect(), this.positioningDisabled || this.$_registerEventListeners([
        ...pt(this.$_referenceNode),
        ...pt(this.$_popperNode)
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
      for (const t of ro(this.theme))
        po(t).push(this), document.body.classList.add(`v-popper--some-open--${t}`);
      this.$emit("apply-show"), this.classes.showFrom = !0, this.classes.showTo = !1, this.classes.hideFrom = !1, this.classes.hideTo = !1, await kt(), this.classes.showFrom = !1, this.classes.showTo = !0, this.noAutoFocus || this.$_popperNode.focus();
    },
    async $_applyHide(e = !1) {
      if (this.shownChildren.size > 0) {
        this.pendingHide = !0, this.$_hideInProgress = !1;
        return;
      }
      if (clearTimeout(this.$_scheduleTimer), !this.isShown)
        return;
      this.skipTransition = e, co(ne, this), ne.length === 0 && document.body.classList.remove("v-popper--some-open");
      for (const o of ro(this.theme)) {
        const n = po(o);
        co(n, this), n.length === 0 && document.body.classList.remove(`v-popper--some-open--${o}`);
      }
      be === this && (be = null), this.isShown = !1, this.$_applyAttrsToTarget({
        "aria-describedby": void 0,
        "data-popper-shown": void 0
      }), clearTimeout(this.$_disposeTimer);
      const t = this.disposeTimeout;
      t !== null && (this.$_disposeTimer = setTimeout(() => {
        this.$_popperNode && (this.$_detachPopperNode(), this.isMounted = !1);
      }, t)), this.$_removeEventListeners("scroll"), this.$emit("apply-hide"), this.classes.showFrom = !1, this.classes.showTo = !1, this.classes.hideFrom = !0, this.classes.hideTo = !1, await kt(), this.classes.hideFrom = !1, this.classes.hideTo = !0;
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
      this.$_registerTriggerListeners(this.$_targetNodes, ao, this.triggers, this.showTriggers, e), this.$_registerTriggerListeners([this.$_popperNode], ao, this.popperTriggers, this.popperShowTriggers, e);
      const t = (o) => {
        o.usedByTooltip || this.hide({ event: o });
      };
      this.$_registerTriggerListeners(this.$_targetNodes, lo, this.triggers, this.hideTriggers, t), this.$_registerTriggerListeners([this.$_popperNode], lo, this.popperTriggers, this.popperHideTriggers, t);
    },
    $_registerEventListeners(e, t, o) {
      this.$_events.push({ targetNodes: e, eventType: t, handler: o }), e.forEach((n) => n.addEventListener(t, o, Oe ? {
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
      if (Re >= e.left && Re <= e.right && We >= e.top && We <= e.bottom) {
        const t = this.$_popperNode.getBoundingClientRect(), o = Re - he, n = We - ge, i = t.left + t.width / 2 - he + (t.top + t.height / 2) - ge + t.width + t.height, s = he + o * i, r = ge + n * i;
        return Ke(he, ge, s, r, t.left, t.top, t.left, t.bottom) || // Left edge
        Ke(he, ge, s, r, t.left, t.top, t.right, t.top) || // Top edge
        Ke(he, ge, s, r, t.right, t.top, t.right, t.bottom) || // Right edge
        Ke(he, ge, s, r, t.left, t.bottom, t.right, t.bottom);
      }
      return !1;
    }
  },
  render() {
    return this.$slots.default(this.slotData);
  }
});
if (typeof document < "u" && typeof window < "u") {
  if (Vo) {
    const e = Oe ? {
      passive: !0,
      capture: !0
    } : !0;
    document.addEventListener("touchstart", (t) => ho(t, !0), e), document.addEventListener("touchend", (t) => go(t, !0), e);
  } else
    window.addEventListener("mousedown", (e) => ho(e, !1), !0), window.addEventListener("click", (e) => go(e, !1), !0);
  window.addEventListener("resize", li);
}
function ho(e, t) {
  if (se.autoHideOnMousedown)
    Uo(e, t);
  else
    for (let o = 0; o < ne.length; o++) {
      const n = ne[o];
      try {
        n.mouseDownContains = n.popperNode().contains(e.target);
      } catch {
      }
    }
}
function go(e, t) {
  se.autoHideOnMousedown || Uo(e, t);
}
function Uo(e, t) {
  const o = {};
  for (let n = ne.length - 1; n >= 0; n--) {
    const i = ne[n];
    try {
      const s = i.containsGlobalTarget = i.mouseDownContains || i.popperNode().contains(e.target);
      i.pendingHide = !1, requestAnimationFrame(() => {
        if (i.pendingHide = !1, !o[i.randomId] && fo(i, s, e)) {
          if (i.$_handleGlobalClose(e, t), !e.closeAllPopover && e.closePopover && s) {
            let a = i.parentPopper;
            for (; a; )
              o[a.randomId] = !0, a = a.parentPopper;
            return;
          }
          let r = i.parentPopper;
          for (; r && fo(r, r.containsGlobalTarget, e); )
            r.$_handleGlobalClose(e, t), r = r.parentPopper;
        }
      });
    } catch {
    }
  }
}
function fo(e, t, o) {
  return o.closeAllPopover || o.closePopover && t || ai(e, o) && !t;
}
function ai(e, t) {
  if (typeof e.autoHide == "function") {
    const o = e.autoHide(t);
    return e.lastAutoHide = o, o;
  }
  return e.autoHide;
}
function li() {
  for (let e = 0; e < ne.length; e++)
    ne[e].$_computePosition();
}
let he = 0, ge = 0, Re = 0, We = 0;
typeof window < "u" && window.addEventListener("mousemove", (e) => {
  he = Re, ge = We, Re = e.clientX, We = e.clientY;
}, Oe ? {
  passive: !0
} : void 0);
function Ke(e, t, o, n, i, s, r, a) {
  const l = ((r - i) * (t - s) - (a - s) * (e - i)) / ((a - s) * (o - e) - (r - i) * (n - t)), c = ((o - e) * (t - s) - (n - t) * (e - i)) / ((a - s) * (o - e) - (r - i) * (n - t));
  return l >= 0 && l <= 1 && c >= 0 && c <= 1;
}
const ci = {
  extends: Fo()
}, bt = (e, t) => {
  const o = e.__vccOpts || e;
  for (const [n, i] of t)
    o[n] = i;
  return o;
};
function ui(e, t, o, n, i, s) {
  return y(), I("div", {
    ref: "reference",
    class: H(["v-popper", {
      "v-popper--shown": e.slotData.isShown
    }])
  }, [
    st(e.$slots, "default", jn(Nn(e.slotData)))
  ], 2);
}
const di = /* @__PURE__ */ bt(ci, [["render", ui]]);
function pi() {
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
let tt;
function Ct() {
  Ct.init || (Ct.init = !0, tt = pi() !== -1);
}
var wt = {
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
    Ct(), St(() => {
      this._w = this.$el.offsetWidth, this._h = this.$el.offsetHeight, this.emitOnMount && this.emitSize();
    });
    const e = document.createElement("object");
    this._resizeObject = e, e.setAttribute("aria-hidden", "true"), e.setAttribute("tabindex", -1), e.onload = this.addResizeHandlers, e.type = "text/html", tt && this.$el.appendChild(e), e.data = "about:blank", tt || this.$el.appendChild(e);
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
      this._resizeObject && this._resizeObject.onload && (!tt && this._resizeObject.contentDocument && this._resizeObject.contentDocument.defaultView.removeEventListener("resize", this.compareAndNotify), this.$el.removeChild(this._resizeObject), this._resizeObject.onload = null, this._resizeObject = null);
    }
  }
};
const hi = /* @__PURE__ */ xn("data-v-b329ee4c");
In("data-v-b329ee4c");
const gi = {
  class: "resize-observer",
  tabindex: "-1"
};
kn();
const fi = /* @__PURE__ */ hi((e, t, o, n, i, s) => (y(), Q("div", gi)));
wt.render = fi;
wt.__scopeId = "data-v-b329ee4c";
wt.__file = "src/components/ResizeObserver.vue";
const Ho = (e = "theme") => ({
  computed: {
    themeClass() {
      return ri(this[e]);
    }
  }
}), mi = K({
  name: "VPopperContent",
  components: {
    ResizeObserver: wt
  },
  mixins: [
    Ho()
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
}), _i = ["id", "aria-hidden", "tabindex", "data-popper-placement"], vi = {
  ref: "inner",
  class: "v-popper__inner"
}, yi = /* @__PURE__ */ M("div", { class: "v-popper__arrow-outer" }, null, -1), bi = /* @__PURE__ */ M("div", { class: "v-popper__arrow-inner" }, null, -1), wi = [
  yi,
  bi
];
function Mi(e, t, o, n, i, s) {
  const r = Ce("ResizeObserver");
  return y(), I("div", {
    id: e.popperId,
    ref: "popover",
    class: H(["v-popper__popper", [
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
    style: $e(e.result ? {
      position: e.result.strategy,
      transform: `translate3d(${Math.round(e.result.x)}px,${Math.round(e.result.y)}px,0)`
    } : void 0),
    "aria-hidden": e.shown ? "false" : "true",
    tabindex: e.autoHide ? 0 : void 0,
    "data-popper-placement": e.result ? e.result.placement : void 0,
    onKeyup: t[2] || (t[2] = Sn((a) => e.autoHide && e.$emit("hide"), ["esc"]))
  }, [
    M("div", {
      class: "v-popper__backdrop",
      onClick: t[0] || (t[0] = (a) => e.autoHide && e.$emit("hide"))
    }),
    M("div", {
      class: "v-popper__wrapper",
      style: $e(e.result ? {
        transformOrigin: e.result.transformOrigin
      } : void 0)
    }, [
      M("div", vi, [
        e.mounted ? (y(), I(J, { key: 0 }, [
          M("div", null, [
            st(e.$slots, "default")
          ]),
          e.handleResize ? (y(), Q(r, {
            key: 0,
            onNotify: t[1] || (t[1] = (a) => e.$emit("resize", a))
          })) : z("", !0)
        ], 64)) : z("", !0)
      ], 512),
      M("div", {
        ref: "arrow",
        class: "v-popper__arrow-container",
        style: $e(e.result ? {
          left: e.toPx(e.result.arrow.x),
          top: e.toPx(e.result.arrow.y)
        } : void 0)
      }, wi, 4)
    ], 4)
  ], 46, _i);
}
const Qo = /* @__PURE__ */ bt(mi, [["render", Mi]]), Jo = {
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
let Ot = function() {
};
typeof window < "u" && (Ot = window.Element);
const Ii = K({
  name: "VPopperWrapper",
  components: {
    Popper: di,
    PopperContent: Qo
  },
  mixins: [
    Jo,
    Ho("finalTheme")
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
      type: [String, Object, Ot, Boolean],
      default: void 0
    },
    boundary: {
      type: [String, Ot],
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
function ki(e, t, o, n, i, s) {
  const r = Ce("PopperContent"), a = Ce("Popper");
  return y(), Q(a, xo({ ref: "popper" }, e.$props, {
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
    default: rt(({
      popperId: l,
      isShown: c,
      shouldMountContent: u,
      skipTransition: f,
      autoHide: g,
      show: m,
      hide: S,
      handleResize: C,
      onResize: N,
      classes: D,
      result: O
    }) => [
      st(e.$slots, "default", {
        shown: c,
        show: m,
        hide: S
      }),
      $t(r, {
        ref: "popperContent",
        "popper-id": l,
        theme: e.finalTheme,
        shown: c,
        mounted: u,
        "skip-transition": f,
        "auto-hide": g,
        "handle-resize": C,
        classes: D,
        result: O,
        onHide: S,
        onResize: N
      }, {
        default: rt(() => [
          st(e.$slots, "popper", {
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
const Vt = /* @__PURE__ */ bt(Ii, [["render", ki]]), ji = {
  ...Vt,
  name: "VDropdown",
  vPopperTheme: "dropdown"
}, Ni = {
  ...Vt,
  name: "VMenu",
  vPopperTheme: "menu"
}, xi = {
  ...Vt,
  name: "VTooltip",
  vPopperTheme: "tooltip"
}, Si = K({
  name: "VTooltipDirective",
  components: {
    Popper: Fo(),
    PopperContent: Qo
  },
  mixins: [
    Jo
  ],
  inheritAttrs: !1,
  props: {
    theme: {
      type: String,
      default: "tooltip"
    },
    html: {
      type: Boolean,
      default: (e) => Fe(e.theme, "html")
    },
    content: {
      type: [String, Number, Function],
      default: null
    },
    loadingContent: {
      type: String,
      default: (e) => Fe(e.theme, "loadingContent")
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
}), Li = ["innerHTML"], Ti = ["textContent"];
function Di(e, t, o, n, i, s) {
  const r = Ce("PopperContent"), a = Ce("Popper");
  return y(), Q(a, xo({ ref: "popper" }, e.$attrs, {
    theme: e.theme,
    "target-nodes": e.targetNodes,
    "popper-node": () => e.$refs.popperContent.$el,
    onApplyShow: e.onShow,
    onApplyHide: e.onHide
  }), {
    default: rt(({
      popperId: l,
      isShown: c,
      shouldMountContent: u,
      skipTransition: f,
      autoHide: g,
      hide: m,
      handleResize: S,
      onResize: C,
      classes: N,
      result: D
    }) => [
      $t(r, {
        ref: "popperContent",
        class: H({
          "v-popper--tooltip-loading": e.loading
        }),
        "popper-id": l,
        theme: e.theme,
        shown: c,
        mounted: u,
        "skip-transition": f,
        "auto-hide": g,
        "handle-resize": S,
        classes: N,
        result: D,
        onHide: m,
        onResize: C
      }, {
        default: rt(() => [
          e.html ? (y(), I("div", {
            key: 0,
            innerHTML: e.finalContent
          }, null, 8, Li)) : (y(), I("div", {
            key: 1,
            textContent: V(e.finalContent)
          }, null, 8, Ti))
        ]),
        _: 2
      }, 1032, ["class", "popper-id", "theme", "shown", "mounted", "skip-transition", "auto-hide", "handle-resize", "classes", "result", "onHide", "onResize"])
    ]),
    _: 1
  }, 16, ["theme", "target-nodes", "popper-node", "onApplyShow", "onApplyHide"]);
}
const Ci = /* @__PURE__ */ bt(Si, [["render", Di]]), Ko = "v-popper--has-tooltip";
function Oi(e, t) {
  let o = e.placement;
  if (!o && t)
    for (const n of Bo)
      t[n] && (o = n);
  return o || (o = Fe(e.theme || "tooltip", "placement")), o;
}
function Xo(e, t, o) {
  let n;
  const i = typeof t;
  return i === "string" ? n = { content: t } : t && i === "object" ? n = t : n = { content: !1 }, n.placement = Oi(n, o), n.targetNodes = () => [e], n.referenceNode = () => e, n;
}
let Nt, Ue, Ai = 0;
function Ei() {
  if (Nt)
    return;
  Ue = $([]), Nt = Ln({
    name: "VTooltipDirectiveApp",
    setup() {
      return {
        directives: Ue
      };
    },
    render() {
      return this.directives.map((t) => Tn(Ci, {
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
  document.body.appendChild(e), Nt.mount(e);
}
function zi(e, t, o) {
  Ei();
  const n = $(Xo(e, t, o)), i = $(!1), s = {
    id: Ai++,
    options: n,
    shown: i
  };
  return Ue.value.push(s), e.classList && e.classList.add(Ko), e.$_popper = {
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
function qo(e) {
  if (e.$_popper) {
    const t = Ue.value.indexOf(e.$_popper.item);
    t !== -1 && Ue.value.splice(t, 1), delete e.$_popper, delete e.$_popperOldShown, delete e.$_popperMountTarget;
  }
  e.classList && e.classList.remove(Ko);
}
function mo(e, { value: t, modifiers: o }) {
  const n = Xo(e, t, o);
  if (!n.content || Fe(n.theme || "tooltip", "disabled"))
    qo(e);
  else {
    let i;
    e.$_popper ? (i = e.$_popper, i.options.value = n) : i = zi(e, t, o), typeof t.shown < "u" && t.shown !== e.$_popperOldShown && (e.$_popperOldShown = t.shown, t.shown ? i.show() : i.hide());
  }
}
const Pi = {
  beforeMount: mo,
  updated: mo,
  beforeUnmount(e) {
    qo(e);
  }
};
function _o(e) {
  e.addEventListener("mousedown", ht), e.addEventListener("click", ht), e.addEventListener("touchstart", en, Oe ? {
    passive: !0
  } : !1);
}
function vo(e) {
  e.removeEventListener("mousedown", ht), e.removeEventListener("click", ht), e.removeEventListener("touchstart", en), e.removeEventListener("touchend", tn), e.removeEventListener("touchcancel", on);
}
function ht(e) {
  const t = e.currentTarget;
  e.closePopover = !t.$_vclosepopover_touch, e.closeAllPopover = t.$_closePopoverModifiers && !!t.$_closePopoverModifiers.all;
}
function en(e) {
  if (e.changedTouches.length === 1) {
    const t = e.currentTarget;
    t.$_vclosepopover_touch = !0;
    const o = e.changedTouches[0];
    t.$_vclosepopover_touchPoint = o, t.addEventListener("touchend", tn), t.addEventListener("touchcancel", on);
  }
}
function tn(e) {
  const t = e.currentTarget;
  if (t.$_vclosepopover_touch = !1, e.changedTouches.length === 1) {
    const o = e.changedTouches[0], n = t.$_vclosepopover_touchPoint;
    e.closePopover = Math.abs(o.screenY - n.screenY) < 20 && Math.abs(o.screenX - n.screenX) < 20, e.closeAllPopover = t.$_closePopoverModifiers && !!t.$_closePopoverModifiers.all;
  }
}
function on(e) {
  const t = e.currentTarget;
  t.$_vclosepopover_touch = !1;
}
const $i = {
  beforeMount(e, { value: t, modifiers: o }) {
    e.$_closePopoverModifiers = o, (typeof t > "u" || t) && _o(e);
  },
  updated(e, { value: t, oldValue: o, modifiers: n }) {
    e.$_closePopoverModifiers = n, t !== o && (typeof t > "u" || t ? _o(e) : vo(e));
  },
  beforeUnmount(e) {
    vo(e);
  }
};
function Yi(e, t = {}) {
  e.$_vTooltipInstalled || (e.$_vTooltipInstalled = !0, Zo(se, t), e.directive("tooltip", Pi), e.directive("close-popper", $i), e.component("VTooltip", xi), e.component("VDropdown", ji), e.component("VMenu", Ni));
}
const Gi = {
  // eslint-disable-next-line no-undef
  version: "5.2.2",
  install: Yi,
  options: se
};
var nn = !1;
function Xe(e, t, o) {
  return Array.isArray(e) ? (e.length = Math.max(e.length, t), e.splice(t, 1, o), o) : (e[t] = o, o);
}
function xt(e, t) {
  if (Array.isArray(e)) {
    e.splice(t, 1);
    return;
  }
  delete e[t];
}
function Ri() {
  return sn().__VUE_DEVTOOLS_GLOBAL_HOOK__;
}
function sn() {
  return typeof navigator < "u" && typeof window < "u" ? window : typeof globalThis < "u" ? globalThis : {};
}
const Wi = typeof Proxy == "function", Zi = "devtools-plugin:setup", Vi = "plugin:settings:set";
let Se, At;
function Bi() {
  var e;
  return Se !== void 0 || (typeof window < "u" && window.performance ? (Se = !0, At = window.performance) : typeof globalThis < "u" && (!((e = globalThis.perf_hooks) === null || e === void 0) && e.performance) ? (Se = !0, At = globalThis.perf_hooks.performance) : Se = !1), Se;
}
function Fi() {
  return Bi() ? At.now() : Date.now();
}
class Ui {
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
        return Fi();
      }
    }, o && o.on(Vi, (r, a) => {
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
function rn(e, t) {
  const o = e, n = sn(), i = Ri(), s = Wi && o.enableEarlyProxy;
  if (i && (n.__VUE_DEVTOOLS_PLUGIN_API_AVAILABLE__ || !s))
    i.emit(Zi, e, t);
  else {
    const r = s ? new Ui(o, i) : null;
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
let Pe;
const Ae = (e) => Pe = e, an = process.env.NODE_ENV !== "production" ? Symbol("pinia") : (
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
const Mt = typeof window < "u", Ze = (process.env.NODE_ENV !== "production" || !1) && process.env.NODE_ENV !== "test" && Mt, yo = typeof window == "object" && window.window === window ? window : typeof self == "object" && self.self === self ? self : typeof global == "object" && global.global === global ? global : typeof globalThis == "object" ? globalThis : { HTMLElement: null };
function Hi(e, { autoBom: t = !1 } = {}) {
  return t && /^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(e.type) ? new Blob(["\uFEFF", e], { type: e.type }) : e;
}
function Bt(e, t, o) {
  const n = new XMLHttpRequest();
  n.open("GET", e), n.responseType = "blob", n.onload = function() {
    un(n.response, t, o);
  }, n.onerror = function() {
    console.error("could not download file");
  }, n.send();
}
function ln(e) {
  const t = new XMLHttpRequest();
  t.open("HEAD", e, !1);
  try {
    t.send();
  } catch {
  }
  return t.status >= 200 && t.status <= 299;
}
function ot(e) {
  try {
    e.dispatchEvent(new MouseEvent("click"));
  } catch {
    const o = document.createEvent("MouseEvents");
    o.initMouseEvent("click", !0, !0, window, 0, 0, 0, 80, 20, !1, !1, !1, !1, 0, null), e.dispatchEvent(o);
  }
}
const nt = typeof navigator == "object" ? navigator : { userAgent: "" }, cn = /Macintosh/.test(nt.userAgent) && /AppleWebKit/.test(nt.userAgent) && !/Safari/.test(nt.userAgent), un = Mt ? (
  // Use download attribute first if possible (#193 Lumia mobile) unless this is a macOS WebView or mini program
  typeof HTMLAnchorElement < "u" && "download" in HTMLAnchorElement.prototype && !cn ? Qi : (
    // Use msSaveOrOpenBlob as a second approach
    "msSaveOrOpenBlob" in nt ? Ji : (
      // Fallback to using FileReader and a popup
      Ki
    )
  )
) : () => {
};
function Qi(e, t = "download", o) {
  const n = document.createElement("a");
  n.download = t, n.rel = "noopener", typeof e == "string" ? (n.href = e, n.origin !== location.origin ? ln(n.href) ? Bt(e, t, o) : (n.target = "_blank", ot(n)) : ot(n)) : (n.href = URL.createObjectURL(e), setTimeout(function() {
    URL.revokeObjectURL(n.href);
  }, 4e4), setTimeout(function() {
    ot(n);
  }, 0));
}
function Ji(e, t = "download", o) {
  if (typeof e == "string")
    if (ln(e))
      Bt(e, t, o);
    else {
      const n = document.createElement("a");
      n.href = e, n.target = "_blank", setTimeout(function() {
        ot(n);
      });
    }
  else
    navigator.msSaveOrOpenBlob(Hi(e, o), t);
}
function Ki(e, t, o, n) {
  if (n = n || open("", "_blank"), n && (n.document.title = n.document.body.innerText = "downloading..."), typeof e == "string")
    return Bt(e, t, o);
  const i = e.type === "application/octet-stream", s = /constructor/i.test(String(yo.HTMLElement)) || "safari" in yo, r = /CriOS\/[\d]+/.test(navigator.userAgent);
  if ((r || i && s || cn) && typeof FileReader < "u") {
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
function Ft(e) {
  return "_a" in e && "install" in e;
}
function dn() {
  if (!("clipboard" in navigator))
    return B("Your browser doesn't support the Clipboard API", "error"), !0;
}
function pn(e) {
  return e instanceof Error && e.message.toLowerCase().includes("document is not focused") ? (B('You need to activate the "Emulate a focused page" setting in the "Rendering" panel of devtools.', "warn"), !0) : !1;
}
async function Xi(e) {
  if (!dn())
    try {
      await navigator.clipboard.writeText(JSON.stringify(e.state.value)), B("Global state copied to clipboard.");
    } catch (t) {
      if (pn(t))
        return;
      B("Failed to serialize the state. Check the console for more details.", "error"), console.error(t);
    }
}
async function qi(e) {
  if (!dn())
    try {
      hn(e, JSON.parse(await navigator.clipboard.readText())), B("Global state pasted from clipboard.");
    } catch (t) {
      if (pn(t))
        return;
      B("Failed to deserialize the state from clipboard. Check the console for more details.", "error"), console.error(t);
    }
}
async function es(e) {
  try {
    un(new Blob([JSON.stringify(e.state.value)], {
      type: "text/plain;charset=utf-8"
    }), "pinia-state.json");
  } catch (t) {
    B("Failed to export the state as JSON. Check the console for more details.", "error"), console.error(t);
  }
}
let pe;
function ts() {
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
async function os(e) {
  try {
    const o = await ts()();
    if (!o)
      return;
    const { text: n, file: i } = o;
    hn(e, JSON.parse(n)), B(`Global state imported from "${i.name}".`);
  } catch (t) {
    B("Failed to import the state from JSON. Check the console for more details.", "error"), console.error(t);
  }
}
function hn(e, t) {
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
const gn = "🍍 Pinia (root)", Et = "_root";
function ns(e) {
  return Ft(e) ? {
    id: Et,
    label: gn
  } : {
    id: e.$id,
    label: e.$id
  };
}
function is(e) {
  if (Ft(e)) {
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
function ss(e) {
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
function rs(e) {
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
let Te = !0;
const it = [], Me = "pinia:mutations", U = "pinia", { assign: as } = Object, gt = (e) => "🍍 " + e;
function ls(e, t) {
  rn({
    id: "dev.esm.pinia",
    label: "Pinia 🍍",
    logo: "https://pinia.vuejs.org/logo.svg",
    packageName: "pinia",
    homepage: "https://pinia.vuejs.org",
    componentStateTypes: it,
    app: e
  }, (o) => {
    typeof o.now != "function" && B("You seem to be using an outdated version of Vue Devtools. Are you still using the Beta release instead of the stable one? You can find the links at https://devtools.vuejs.org/guide/installation.html."), o.addTimelineLayer({
      id: Me,
      label: "Pinia 🍍",
      color: 15064968
    }), o.addInspector({
      id: U,
      label: "Pinia 🍍",
      icon: "storage",
      treeFilterPlaceholder: "Search stores",
      actions: [
        {
          icon: "content_copy",
          action: () => {
            Xi(t);
          },
          tooltip: "Serialize and copy the state"
        },
        {
          icon: "content_paste",
          action: async () => {
            await qi(t), o.sendInspectorTree(U), o.sendInspectorState(U);
          },
          tooltip: "Replace the state with the content of your clipboard"
        },
        {
          icon: "save",
          action: () => {
            es(t);
          },
          tooltip: "Save the state as a JSON file"
        },
        {
          icon: "folder_open",
          action: async () => {
            await os(t), o.sendInspectorTree(U), o.sendInspectorState(U);
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
            type: gt(a.$id),
            key: "state",
            editable: !0,
            value: a._isOptionsAPI ? {
              _custom: {
                value: ft(a.$state),
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
            type: gt(a.$id),
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
      if (n.app === e && n.inspectorId === U) {
        let i = [t];
        i = i.concat(Array.from(t._s.values())), n.rootNodes = (n.filter ? i.filter((s) => "$id" in s ? s.$id.toLowerCase().includes(n.filter.toLowerCase()) : gn.toLowerCase().includes(n.filter.toLowerCase())) : i).map(ns);
      }
    }), o.on.getInspectorState((n) => {
      if (n.app === e && n.inspectorId === U) {
        const i = n.nodeId === Et ? t : t._s.get(n.nodeId);
        if (!i)
          return;
        i && (n.state = is(i));
      }
    }), o.on.editInspectorState((n, i) => {
      if (n.app === e && n.inspectorId === U) {
        const s = n.nodeId === Et ? t : t._s.get(n.nodeId);
        if (!s)
          return B(`store "${n.nodeId}" not found`, "error");
        const { path: r } = n;
        Ft(s) ? r.unshift("state") : (r.length !== 1 || !s._customProperties.has(r[0]) || r[0] in s.$state) && r.unshift("$state"), Te = !1, n.set(s, r, n.state.value), Te = !0;
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
        r[0] = "$state", Te = !1, n.set(s, r, n.state.value), Te = !0;
      }
    });
  });
}
function cs(e, t) {
  it.includes(gt(t.$id)) || it.push(gt(t.$id)), rn({
    id: "dev.esm.pinia",
    label: "Pinia 🍍",
    logo: "https://pinia.vuejs.org/logo.svg",
    packageName: "pinia",
    homepage: "https://pinia.vuejs.org",
    componentStateTypes: it,
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
      const u = fn++;
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
          groupId: u
        }
      }), r((f) => {
        me = void 0, o.addTimelineEvent({
          layerId: Me,
          event: {
            time: n(),
            title: "🛬 " + l,
            subtitle: "end",
            data: {
              store: oe(t.$id),
              action: oe(l),
              args: c,
              result: f
            },
            groupId: u
          }
        });
      }), a((f) => {
        me = void 0, o.addTimelineEvent({
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
              error: f
            },
            groupId: u
          }
        });
      });
    }, !0), t._customProperties.forEach((r) => {
      Yt(() => d(t[r]), (a, l) => {
        o.notifyComponentUpdate(), o.sendInspectorState(U), Te && o.addTimelineEvent({
          layerId: Me,
          event: {
            time: n(),
            title: "Change",
            subtitle: r,
            data: {
              newValue: a,
              oldValue: l
            },
            groupId: me
          }
        });
      }, { deep: !0 });
    }), t.$subscribe(({ events: r, type: a }, l) => {
      if (o.notifyComponentUpdate(), o.sendInspectorState(U), !Te)
        return;
      const c = {
        time: n(),
        title: rs(a),
        data: as({ store: oe(t.$id) }, ss(r)),
        groupId: me
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
      }), o.notifyComponentUpdate(), o.sendInspectorTree(U), o.sendInspectorState(U);
    });
    const { $dispose: s } = t;
    t.$dispose = () => {
      s(), o.notifyComponentUpdate(), o.sendInspectorTree(U), o.sendInspectorState(U), o.getSettings().logStoreChanges && B(`Disposed "${t.$id}" store 🗑`);
    }, o.notifyComponentUpdate(), o.sendInspectorTree(U), o.sendInspectorState(U), o.getSettings().logStoreChanges && B(`"${t.$id}" store installed 🆕`);
  });
}
let fn = 0, me;
function bo(e, t, o) {
  const n = t.reduce((i, s) => (i[s] = ft(e)[s], i), {});
  for (const i in n)
    e[i] = function() {
      const s = fn, r = o ? new Proxy(e, {
        get(...l) {
          return me = s, Reflect.get(...l);
        },
        set(...l) {
          return me = s, Reflect.set(...l);
        }
      }) : e;
      me = s;
      const a = n[i].apply(r, arguments);
      return me = void 0, a;
    };
}
function us({ app: e, store: t, options: o }) {
  if (t.$id.startsWith("__hot:"))
    return;
  t._isOptionsAPI = !!o.state, bo(t, Object.keys(o.actions), t._isOptionsAPI);
  const n = t._hotUpdate;
  ft(t)._hotUpdate = function(i) {
    n.apply(this, arguments), bo(t, Object.keys(i._hmrPayload.actions), !!t._isOptionsAPI);
  }, cs(
    e,
    // FIXME: is there a way to allow the assignment from Store<Id, S, G, A> to StoreGeneric?
    t
  );
}
function ds() {
  const e = So(!0), t = e.run(() => $({}));
  let o = [], n = [];
  const i = Ie({
    install(s) {
      Ae(i), i._a = s, s.provide(an, i), s.config.globalProperties.$pinia = i, Ze && ls(s, i), n.forEach((r) => o.push(r)), n = [];
    },
    use(s) {
      return !this._a && !nn ? n.push(s) : o.push(s), this;
    },
    _p: o,
    // it's actually undefined here
    // @ts-expect-error
    _a: null,
    _e: e,
    _s: /* @__PURE__ */ new Map(),
    state: t
  });
  return Ze && typeof Proxy < "u" && i.use(us), i;
}
function mn(e, t) {
  for (const o in t) {
    const n = t[o];
    if (!(o in e))
      continue;
    const i = e[o];
    Ne(i) && Ne(n) && !je(n) && !Gt(n) ? e[o] = mn(i, n) : e[o] = n;
  }
  return e;
}
const _n = () => {
};
function wo(e, t, o, n = _n) {
  e.push(t);
  const i = () => {
    const s = e.indexOf(t);
    s > -1 && (e.splice(s, 1), n());
  };
  return !o && An() && En(i), i;
}
function Le(e, ...t) {
  e.slice().forEach((o) => {
    o(...t);
  });
}
const ps = (e) => e();
function zt(e, t) {
  e instanceof Map && t instanceof Map && t.forEach((o, n) => e.set(n, o)), e instanceof Set && t instanceof Set && t.forEach(e.add, e);
  for (const o in t) {
    if (!t.hasOwnProperty(o))
      continue;
    const n = t[o], i = e[o];
    Ne(i) && Ne(n) && e.hasOwnProperty(o) && !je(n) && !Gt(n) ? e[o] = zt(i, n) : e[o] = n;
  }
  return e;
}
const hs = process.env.NODE_ENV !== "production" ? Symbol("pinia:skipHydration") : (
  /* istanbul ignore next */
  Symbol()
);
function gs(e) {
  return !Ne(e) || !e.hasOwnProperty(hs);
}
const { assign: ee } = Object;
function Mo(e) {
  return !!(je(e) && e.effect);
}
function Io(e, t, o, n) {
  const { state: i, actions: s, getters: r } = t, a = o.state.value[e];
  let l;
  function c() {
    !a && (process.env.NODE_ENV === "production" || !n) && (o.state.value[e] = i ? i() : {});
    const u = process.env.NODE_ENV !== "production" && n ? (
      // use ref() to unwrap refs inside state TODO: check if this is still necessary
      Jt($(i ? i() : {}).value)
    ) : Jt(o.state.value[e]);
    return ee(u, s, Object.keys(r || {}).reduce((f, g) => (process.env.NODE_ENV !== "production" && g in u && console.warn(`[🍍]: A getter cannot have the same name as another state property. Rename one of them. Found with "${g}" in store "${e}".`), f[g] = Ie(To(() => {
      Ae(o);
      const m = o._s.get(e);
      return r[g].call(m, m);
    })), f), {}));
  }
  return l = Pt(e, c, t, o, n, !0), l;
}
function Pt(e, t, o = {}, n, i, s) {
  let r;
  const a = ee({ actions: {} }, o);
  if (process.env.NODE_ENV !== "production" && !n._e.active)
    throw new Error("Pinia destroyed");
  const l = {
    deep: !0
    // flush: 'post',
  };
  process.env.NODE_ENV !== "production" && !nn && (l.onTrigger = (h) => {
    c ? m = h : c == !1 && !_._hotUpdating && (Array.isArray(m) ? m.push(h) : console.error("🍍 debuggerEvents should be an array. This is most likely an internal Pinia bug."));
  });
  let c, u, f = [], g = [], m;
  const S = n.state.value[e];
  !s && !S && (process.env.NODE_ENV === "production" || !i) && (n.state.value[e] = {});
  const C = $({});
  let N;
  function D(h) {
    let v;
    c = u = !1, process.env.NODE_ENV !== "production" && (m = []), typeof h == "function" ? (h(n.state.value[e]), v = {
      type: ce.patchFunction,
      storeId: e,
      events: m
    }) : (zt(n.state.value[e], h), v = {
      type: ce.patchObject,
      payload: h,
      storeId: e,
      events: m
    });
    const p = N = Symbol();
    St().then(() => {
      N === p && (c = !0);
    }), u = !0, Le(f, v, n.state.value[e]);
  }
  const O = s ? function() {
    const { state: v } = o, p = v ? v() : {};
    this.$patch((x) => {
      ee(x, p);
    });
  } : (
    /* istanbul ignore next */
    process.env.NODE_ENV !== "production" ? () => {
      throw new Error(`🍍: Store "${e}" is built using the setup syntax and does not implement $reset().`);
    } : _n
  );
  function k() {
    r.stop(), f = [], g = [], n._s.delete(e);
  }
  function L(h, v) {
    return function() {
      Ae(n);
      const p = Array.from(arguments), x = [], A = [];
      function T(R) {
        x.push(R);
      }
      function P(R) {
        A.push(R);
      }
      Le(g, {
        args: p,
        name: h,
        store: _,
        after: T,
        onError: P
      });
      let G;
      try {
        G = v.apply(this && this.$id === e ? this : _, p);
      } catch (R) {
        throw Le(A, R), R;
      }
      return G instanceof Promise ? G.then((R) => (Le(x, R), R)).catch((R) => (Le(A, R), Promise.reject(R))) : (Le(x, G), G);
    };
  }
  const w = /* @__PURE__ */ Ie({
    actions: {},
    getters: {},
    state: [],
    hotState: C
  }), b = {
    _p: n,
    // _s: scope,
    $id: e,
    $onAction: wo.bind(null, g),
    $patch: D,
    $reset: O,
    $subscribe(h, v = {}) {
      const p = wo(f, h, v.detached, () => x()), x = r.run(() => Yt(() => n.state.value[e], (A) => {
        (v.flush === "sync" ? u : c) && h({
          storeId: e,
          type: ce.direct,
          events: m
        }, A);
      }, ee({}, l, v)));
      return p;
    },
    $dispose: k
  }, _ = On(process.env.NODE_ENV !== "production" || Ze ? ee(
    {
      _hmrPayload: w,
      _customProperties: Ie(/* @__PURE__ */ new Set())
      // devtools custom properties
    },
    b
    // must be added later
    // setupStore
  ) : b);
  n._s.set(e, _);
  const j = (n._a && n._a.runWithContext || ps)(() => n._e.run(() => (r = So()).run(t)));
  for (const h in j) {
    const v = j[h];
    if (je(v) && !Mo(v) || Gt(v))
      process.env.NODE_ENV !== "production" && i ? Xe(C.value, h, It(j, h)) : s || (S && gs(v) && (je(v) ? v.value = S[h] : zt(v, S[h])), n.state.value[e][h] = v), process.env.NODE_ENV !== "production" && w.state.push(h);
    else if (typeof v == "function") {
      const p = process.env.NODE_ENV !== "production" && i ? v : L(h, v);
      j[h] = p, process.env.NODE_ENV !== "production" && (w.actions[h] = v), a.actions[h] = v;
    } else
      process.env.NODE_ENV !== "production" && Mo(v) && (w.getters[h] = s ? (
        // @ts-expect-error
        o.getters[h]
      ) : v, Mt && (j._getters || // @ts-expect-error: same
      (j._getters = Ie([]))).push(h));
  }
  if (ee(_, j), ee(ft(_), j), Object.defineProperty(_, "$state", {
    get: () => process.env.NODE_ENV !== "production" && i ? C.value : n.state.value[e],
    set: (h) => {
      if (process.env.NODE_ENV !== "production" && i)
        throw new Error("cannot set hotState");
      D((v) => {
        ee(v, h);
      });
    }
  }), process.env.NODE_ENV !== "production" && (_._hotUpdate = Ie((h) => {
    _._hotUpdating = !0, h._hmrPayload.state.forEach((v) => {
      if (v in _.$state) {
        const p = h.$state[v], x = _.$state[v];
        typeof p == "object" && Ne(p) && Ne(x) ? mn(p, x) : h.$state[v] = x;
      }
      Xe(_, v, It(h.$state, v));
    }), Object.keys(_.$state).forEach((v) => {
      v in h.$state || xt(_, v);
    }), c = !1, u = !1, n.state.value[e] = It(h._hmrPayload, "hotState"), u = !0, St().then(() => {
      c = !0;
    });
    for (const v in h._hmrPayload.actions) {
      const p = h[v];
      Xe(_, v, L(v, p));
    }
    for (const v in h._hmrPayload.getters) {
      const p = h._hmrPayload.getters[v], x = s ? (
        // special handling of options api
        To(() => (Ae(n), p.call(_, _)))
      ) : p;
      Xe(_, v, x);
    }
    Object.keys(_._hmrPayload.getters).forEach((v) => {
      v in h._hmrPayload.getters || xt(_, v);
    }), Object.keys(_._hmrPayload.actions).forEach((v) => {
      v in h._hmrPayload.actions || xt(_, v);
    }), _._hmrPayload = h._hmrPayload, _._getters = h._getters, _._hotUpdating = !1;
  })), Ze) {
    const h = {
      writable: !0,
      configurable: !0,
      // avoid warning on devtools trying to display this property
      enumerable: !1
    };
    ["_p", "_hmrPayload", "_getters", "_customProperties"].forEach((v) => {
      Object.defineProperty(_, v, ee({ value: _[v] }, h));
    });
  }
  return n._p.forEach((h) => {
    if (Ze) {
      const v = r.run(() => h({
        store: _,
        app: n._a,
        pinia: n,
        options: a
      }));
      Object.keys(v || {}).forEach((p) => _._customProperties.add(p)), ee(_, v);
    } else
      ee(_, r.run(() => h({
        store: _,
        app: n._a,
        pinia: n,
        options: a
      })));
  }), process.env.NODE_ENV !== "production" && _.$state && typeof _.$state == "object" && typeof _.$state.constructor == "function" && !_.$state.constructor.toString().includes("[native code]") && console.warn(`[🍍]: The "state" must be a plain object. It cannot be
	state: () => new MyClass()
Found in store "${_.$id}".`), S && s && o.hydrate && o.hydrate(_.$state, S), c = !0, u = !0, _;
}
function fs(e, t, o) {
  let n, i;
  const s = typeof t == "function";
  n = e, i = s ? o : t;
  function r(a, l) {
    const c = Dn();
    if (a = // in test mode, ignore the argument provided as we can always retrieve a
    // pinia instance with getActivePinia()
    (process.env.NODE_ENV === "test" && Pe && Pe._testing ? null : a) || (c ? Cn(an, null) : null), a && Ae(a), process.env.NODE_ENV !== "production" && !Pe)
      throw new Error(`[🍍]: "getActivePinia()" was called but there was no active Pinia. Are you trying to use a store before calling "app.use(pinia)"?
See https://pinia.vuejs.org/core-concepts/outside-component-usage.html for help.
This will fail in production.`);
    a = Pe, a._s.has(n) || (s ? Pt(n, t, i, a) : Io(n, i, a), process.env.NODE_ENV !== "production" && (r._pinia = a));
    const u = a._s.get(n);
    if (process.env.NODE_ENV !== "production" && l) {
      const f = "__hot:" + n, g = s ? Pt(f, t, i, a, !0) : Io(f, ee({}, i), a, !0);
      l._hotUpdate(g), delete a.state.value[f], a._s.delete(f);
    }
    if (process.env.NODE_ENV !== "production" && Mt) {
      const f = Lo();
      if (f && f.proxy && // avoid adding stores that are just built for hot module replacement
      !l) {
        const g = f.proxy, m = "_pStores" in g ? g._pStores : g._pStores = {};
        m[n] = u;
      }
    }
    return u;
  }
  return r.$id = n, r;
}
var F = /* @__PURE__ */ ((e) => (e.templates = "templates", e.styling = "styling", e.preferences = "preferences", e.wording = "wording", e.output = "output", e))(F || {}), Z = /* @__PURE__ */ ((e) => (e.html = "html", e.json = "json", e))(Z || {});
const ko = [
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
], vn = "--tvk_";
function Ut(e) {
  const t = e.replace(vn, ""), o = t.split("_"), n = o.slice(0, -1), i = o[o.length - 1];
  return {
    keyWithoutPrefix: t,
    nameSpace: o,
    categories: n,
    name: i
  };
}
function Ht() {
  const e = [];
  Array.from(document.styleSheets).forEach((o) => {
    Array.from(o.cssRules).forEach((n) => {
      if (n instanceof CSSStyleRule && n.selectorText === ":root") {
        let i = !!n.style.getPropertyValue(
          "--tvk--default-sheet"
        );
        Array.from(n.styleMap).forEach((s) => {
          if (s[0].startsWith(vn)) {
            const r = s[0], a = s[1], l = Ut(r);
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
    const i = ko.indexOf(o.name), s = ko.indexOf(n.name);
    return i > -1 && s > -1 ? i - s : i > -1 ? -1 : s > -1 ? 1 : o.name < n.name ? -1 : o.name > n.name ? 1 : 0;
  }), e;
}
function ms(e) {
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
function yn(e, t, o = !0) {
  for (let n = 0; n < e.length; n++)
    if (o && t.length !== e.length || t[n] !== e[n])
      return !1;
  return !0;
}
function _s(e, t) {
  return e.filter((n) => yn(t, n.categories));
}
function vs(e, t) {
  let o = e.filter((s) => yn(t, s.categories, !1));
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
function qe(e, t = 300) {
  let o;
  return (...n) => {
    clearTimeout(o), o = setTimeout(() => {
      e(...n);
    }, t);
  };
}
function jo(e) {
  return !!(e && typeof e == "object" && !Array.isArray(e));
}
async function bn(e) {
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
function ys() {
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
const q = fs("editorStore", () => {
  const e = $(void 0), t = $(F.templates), o = $("colors"), n = $(void 0), i = $(Z.html), s = $(!1), r = $(!1);
  function a() {
  }
  function l(N) {
    e.value = N, setTimeout(() => {
      q().refreshEditorPanels();
    });
  }
  function c(N) {
    t.value = N, setTimeout(() => {
      q().refreshEditorPanels();
    });
  }
  function u(N) {
    o.value = N;
  }
  function f(N) {
    i.value = N, q().refreshEditorPanels();
  }
  function g(N) {
    s.value = N, q().refreshEditorPanels();
  }
  function m(N) {
    C();
    const D = q(), O = Ut(N);
    if (O.nameSpace[0] === "colors" && ![
      "brand",
      "brand-hue",
      "brand-lightness",
      "brand-saturation",
      "light",
      "dark"
    ].includes(O.nameSpace[1])) {
      const k = ys();
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
    jumpToStylingVariable: m,
    targetStylingVariable: S,
    stylingVariableReached: C,
    setOutputFormat: f,
    minifyOutput: g
  };
}), bs = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KDTwhLS0gVXBsb2FkZWQgdG86IFNWRyBSZXBvLCB3d3cuc3ZncmVwby5jb20sIEdlbmVyYXRvcjogU1ZHIFJlcG8gTWl4ZXIgVG9vbHMgLS0+Cjxzdmcgd2lkdGg9IjgwMHB4IiBoZWlnaHQ9IjgwMHB4IiB2aWV3Qm94PSIwIDAgMTI4IDEyOCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgYXJpYS1oaWRkZW49InRydWUiIHJvbGU9ImltZyIgY2xhc3M9Imljb25pZnkgaWNvbmlmeS0tbm90byIgcHJlc2VydmVBc3BlY3RSYXRpbz0ieE1pZFlNaWQgbWVldCI+Cg08cGF0aCBkPSJNOTguOSA3OS44NWMtMS4yNS0yLjI3LjM0LTQuNTggMy4wNi03LjQ0YzQuMzEtNC41NCA5LTE1LjA3IDQuNjQtMjUuNzZjLjAzLS4wNi0uODYtMS44Ni0uODMtMS45MmwtMS43OS0uMDljLS41Ny0uMDgtMjAuMjYtLjEyLTM5Ljk3LS4xMmMtMTkuNzEgMC0zOS4zOS4wNC0zOS45Ny4xMmMwIDAtMi42NSAxLjk1LTIuNjMgMi4wMWMtNC4zNSAxMC42OS4zMyAyMS4yMiA0LjY0IDI1Ljc2YzIuNzEgMi44NiA0LjMgNS4xNyAzLjA2IDcuNDRjLTEuMjEgMi4yMS00LjgxIDIuNTMtNC44MSAyLjUzcy44MyAyLjI2IDIuODMgMy40OGMxLjg1IDEuMTMgNC4xMyAxLjM5IDUuNyAxLjQzYzAgMCA2LjE1IDguNTEgMjIuMjMgOC41MWgxNy45YzE2LjA4IDAgMjIuMjMtOC41MSAyMi4yMy04LjUxYzEuNTctLjA0IDMuODUtLjMgNS43LTEuNDNjMi0xLjIyIDIuODMtMy40OCAyLjgzLTMuNDhzLTMuNjEtLjMyLTQuODItMi41M3oiIGZpbGw9IiNlNjNkMDAiPgoNPC9wYXRoPgoNPHJhZGlhbEdyYWRpZW50IGlkPSJJY29uaWZ5SWQxN2VjZGIyOTA0ZDE3OGVhYjE3OTI4IiBjeD0iOTguNzUyIiBjeT0iODMuNjAxIiByPSIyMy40MTkiIGdyYWRpZW50VHJhbnNmb3JtPSJtYXRyaXgoMSAwIDAgLS40OTEyIC0xOS4yODMgMTI0LjY2NSkiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIj4KDTxzdG9wIG9mZnNldD0iLjY5OSIgc3RvcC1jb2xvcj0iI2Y5OGIyNSIgc3RvcC1vcGFjaXR5PSIwIj4KDTwvc3RvcD4KDTxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iI2Y5OGIyNSI+Cg08L3N0b3A+Cg08L3JhZGlhbEdyYWRpZW50PgoNPHBhdGggZD0iTTYzLjk5IDk1Ljc5di05LjQ0bDI4LjU3LTIuMjZsMi42IDMuMnMtNi4xNSA4LjUxLTIyLjIzIDguNTFsLTguOTQtLjAxeiIgZmlsbD0idXJsKCNJY29uaWZ5SWQxN2VjZGIyOTA0ZDE3OGVhYjE3OTI4KSI+Cg08L3BhdGg+Cg08cmFkaWFsR3JhZGllbnQgaWQ9Ikljb25pZnlJZDE3ZWNkYjI5MDRkMTc4ZWFiMTc5MjkiIGN4PSI3Ni41NzMiIGN5PSI3OC42NjgiIHI9IjYuOTIxIiBncmFkaWVudFRyYW5zZm9ybT0ibWF0cml4KC0uOTA1NyAuNDIzOCAuMzE0NCAuNjcxOSAxNDYuMjcgLTYuNjQ0KSIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiPgoNPHN0b3Agb2Zmc2V0PSIwIiBzdG9wLWNvbG9yPSIjZjk4YjI1Ij4KDTwvc3RvcD4KDTxzdG9wIG9mZnNldD0iLjg3MiIgc3RvcC1jb2xvcj0iI2Y5OGIyNSIgc3RvcC1vcGFjaXR5PSIwIj4KDTwvc3RvcD4KDTwvcmFkaWFsR3JhZGllbnQ+Cg08cGF0aCBkPSJNOTUuMSA4My4xNmMtNC4yOC02LjUgNS4yMS04LjkzIDUuMjEtOC45M2wuMDEuMDFjLTEuNjUgMi4wNS0yLjQgMy44NC0xLjQzIDUuNjFjMS4yMSAyLjIxIDQuODEgMi41MyA0LjgxIDIuNTNzLTQuOTEgNC4zNi04LjYuNzh6IiBmaWxsPSJ1cmwoI0ljb25pZnlJZDE3ZWNkYjI5MDRkMTc4ZWFiMTc5MjkpIj4KDTwvcGF0aD4KDTxyYWRpYWxHcmFkaWVudCBpZD0iSWNvbmlmeUlkMTdlY2RiMjkwNGQxNzhlYWIxNzkzMCIgY3g9IjkwLjkzIiBjeT0iNTkuMjc5IiByPSIzMC4zOTkiIGdyYWRpZW50VHJhbnNmb3JtPSJtYXRyaXgoLS4wNzQ2IC0uOTk3MiAtLjgzMTEgLjA2MjIgMTQzLjM0MyAxNDYuMjY5KSIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiPgoNPHN0b3Agb2Zmc2V0PSIuNjk5IiBzdG9wLWNvbG9yPSIjZjk4YjI1IiBzdG9wLW9wYWNpdHk9IjAiPgoNPC9zdG9wPgoNPHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjZjk4YjI1Ij4KDTwvc3RvcD4KDTwvcmFkaWFsR3JhZGllbnQ+Cg08cGF0aCBkPSJNMTA2LjYyIDQ2LjY1YzQuMjUgMTAuMzUtLjIyIDIxLjAxLTQuNDEgMjUuNTFjLS41OC42Mi0zLjAxIDMuMDEtMy41NyA0LjkyYzAgMC05LjU0LTEzLjMxLTEyLjM5LTIxLjEzYy0uNTgtMS41OC0xLjEtMy4yLTEuMTctNC44OGMtLjA1LTEuMjYuMTQtMi43Ni44Ny0zLjgyYy44OS0xLjMxIDIwLjE2LTEuNyAyMC4xNi0xLjdsLjUxIDEuMXoiIGZpbGw9InVybCgjSWNvbmlmeUlkMTdlY2RiMjkwNGQxNzhlYWIxNzkzMCkiPgoNPC9wYXRoPgoNPHJhZGlhbEdyYWRpZW50IGlkPSJJY29uaWZ5SWQxN2VjZGIyOTA0ZDE3OGVhYjE3OTMxIiBjeD0iNDEuNTM0IiBjeT0iNjIuNjQ1IiByPSIzMC4zOTkiIGdyYWRpZW50VHJhbnNmb3JtPSJtYXRyaXgoLjA3NDYgLS45OTcyIC44MzExIC4wNjIyIC0xMy42MyAxMDAuMTY2KSIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiPgoNPHN0b3Agb2Zmc2V0PSIuNjk5IiBzdG9wLWNvbG9yPSIjZjk4YjI1IiBzdG9wLW9wYWNpdHk9IjAiPgoNPC9zdG9wPgoNPHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjZjk4YjI1Ij4KDTwvc3RvcD4KDTwvcmFkaWFsR3JhZGllbnQ+Cg08cGF0aCBkPSJNMjEuNCA0Ni42NWMtNC4yNCAxMC4zNS4yMyAyMS4wMSA0LjQxIDI1LjVjLjU4LjYyIDMuMDEgMy4wMSAzLjU3IDQuOTJjMCAwIDkuNTQtMTMuMzEgMTIuMzktMjEuMTNjLjU4LTEuNTggMS4xLTMuMiAxLjE3LTQuODhjLjA1LTEuMjYtLjE0LTIuNzYtLjg3LTMuODJjLS44OS0xLjMxLTEuOTMtLjk2LTMuNDQtLjk2Yy0yLjg4IDAtMTUuNDktLjc0LTE2LjQ3LS43NGMuMDEuMDEtLjc2IDEuMTEtLjc2IDEuMTF6IiBmaWxsPSJ1cmwoI0ljb25pZnlJZDE3ZWNkYjI5MDRkMTc4ZWFiMTc5MzEpIj4KDTwvcGF0aD4KDTxyYWRpYWxHcmFkaWVudCBpZD0iSWNvbmlmeUlkMTdlY2RiMjkwNGQxNzhlYWIxNzkzMiIgY3g9IjQ4Ljg4NSIgY3k9IjgzLjUzOCIgcj0iMjMuNDE5IiBncmFkaWVudFRyYW5zZm9ybT0ibWF0cml4KC0xIDAgMCAtLjQ5MTIgOTcuNzcgMTI0LjU3MikiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIj4KDTxzdG9wIG9mZnNldD0iLjY5OSIgc3RvcC1jb2xvcj0iI2Y5OGIyNSIgc3RvcC1vcGFjaXR5PSIwIj4KDTwvc3RvcD4KDTxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iI2Y5OGIyNSI+Cg08L3N0b3A+Cg08L3JhZGlhbEdyYWRpZW50PgoNPHBhdGggZD0iTTY0LjAzIDk1Ljc5di05LjQ0bC0yOC41Ny0yLjI2bC0yLjYgMy4yczYuMTUgOC41MSAyMi4yMyA4LjUxbDguOTQtLjAxeiIgZmlsbD0idXJsKCNJY29uaWZ5SWQxN2VjZGIyOTA0ZDE3OGVhYjE3OTMyKSI+Cg08L3BhdGg+Cg08cmFkaWFsR3JhZGllbnQgaWQ9Ikljb25pZnlJZDE3ZWNkYjI5MDRkMTc4ZWFiMTc5MzMiIGN4PSIyNi4zNzQiIGN5PSI3OC42NjgiIHI9IjYuOTIxIiBncmFkaWVudFRyYW5zZm9ybT0ibWF0cml4KC45MDU3IC40MjM4IC0uMzE0NCAuNjcxOSAyNy4yMiAxNC42MzIpIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+Cg08c3RvcCBvZmZzZXQ9IjAiIHN0b3AtY29sb3I9IiNmOThiMjUiPgoNPC9zdG9wPgoNPHN0b3Agb2Zmc2V0PSIuOTQ0IiBzdG9wLWNvbG9yPSIjZjk4YjI1IiBzdG9wLW9wYWNpdHk9IjAiPgoNPC9zdG9wPgoNPC9yYWRpYWxHcmFkaWVudD4KDTxwYXRoIGQ9Ik0zMi45MyA4My4xNmM0LjI4LTYuNS01LjIxLTguOTMtNS4yMS04LjkzbC0uMDEuMDFjMS42NSAyLjA1IDIuNCAzLjg0IDEuNDMgNS42MWMtMS4yMSAyLjIxLTQuODEgMi41My00LjgxIDIuNTNzNC45IDQuMzYgOC42Ljc4eiIgZmlsbD0idXJsKCNJY29uaWZ5SWQxN2VjZGIyOTA0ZDE3OGVhYjE3OTMzKSI+Cg08L3BhdGg+Cg08Zz4KDTxsaW5lYXJHcmFkaWVudCBpZD0iSWNvbmlmeUlkMTdlY2RiMjkwNGQxNzhlYWIxNzkzNCIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiIHgxPSI2NCIgeTE9Ijk0LjU2NSIgeDI9IjY0IiB5Mj0iMTIyLjExIj4KDTxzdG9wIG9mZnNldD0iMCIgc3RvcC1jb2xvcj0iI2Y3OGMxZiI+Cg08L3N0b3A+Cg08c3RvcCBvZmZzZXQ9Ii40OTQiIHN0b3AtY29sb3I9IiNmMzdmMjEiPgoNPC9zdG9wPgoNPHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjZWQ2ZDIzIj4KDTwvc3RvcD4KDTwvbGluZWFyR3JhZGllbnQ+Cg08cGF0aCBkPSJNNjQuMTMgOTQuNjhINjRjLTI1LjQ5LjAzLTUxLjEzIDcuNS01MS4xMyAyNS4yOFYxMjRoMTAyLjI3di00LjA0Yy0uMDEtMTYuNzYtMjUuNDEtMjUuMjgtNTEuMDEtMjUuMjh6IiBmaWxsPSJ1cmwoI0ljb25pZnlJZDE3ZWNkYjI5MDRkMTc4ZWFiMTc5MzQpIj4KDTwvcGF0aD4KDTwvZz4KDTxnPgoNPHBhdGggZD0iTTU0LjkyIDkwLjA4djkuOThjMCA0LjUxIDMuNyA4LjE3IDguMjYgOC4xN2gxLjY1YzQuNTYgMCA4LjI2LTMuNjYgOC4yNi04LjE3di05Ljk4SDU0LjkyeiIgZmlsbD0iI2VkYzM5MSI+Cg08L3BhdGg+Cg08L2c+Cg08Zz4KDTxwYXRoIGQ9Ik05MS4zMyA1MC40M0gzNi42N2MtNS44OSAwLTEwLjcxIDUuMTQtMTAuNzEgMTEuNDFzNC44MiAxMS40MSAxMC43MSAxMS40MWg1NC42NWM1Ljg5IDAgMTAuNzEtNS4xNCAxMC43MS0xMS40MXMtNC44MS0xMS40MS0xMC43LTExLjQxeiIgZmlsbD0iI2VkYzM5MSI+Cg08L3BhdGg+Cg08L2c+Cg08Zz4KDTxwYXRoIGQ9Ik02NCAxMS4wN2MtMTcuNCAwLTMzLjUyIDE4LjYxLTMzLjUyIDQ1LjM5YzAgMjYuNjQgMTYuNjEgMzkuODEgMzMuNTIgMzkuODFTOTcuNTIgODMuMSA5Ny41MiA1Ni40NmMwLTI2Ljc4LTE2LjEyLTQ1LjM5LTMzLjUyLTQ1LjM5eiIgZmlsbD0iI2Y5ZGRiZCI+Cg08L3BhdGg+Cg08L2c+Cg08ZyBmaWxsPSIjMzEyZDJkIj4KDTxlbGxpcHNlIGN4PSI0Ny41NiIgY3k9IjU4LjgxIiByeD0iNC45MyIgcnk9IjUuMSI+Cg08L2VsbGlwc2U+Cg08ZWxsaXBzZSBjeD0iODAuNDQiIGN5PSI1OC44MSIgcng9IjQuOTMiIHJ5PSI1LjEiPgoNPC9lbGxpcHNlPgoNPC9nPgoNPGcgZmlsbD0iIzQ1NDE0MCI+Cg08cGF0aCBkPSJNNTQuOTggNDkuODJjLS45My0xLjIzLTMuMDctMy4wMS03LjIzLTMuMDFzLTYuMzEgMS43OS03LjIzIDMuMDFjLS40MS41NC0uMzEgMS4xNy0uMDIgMS41NWMuMjYuMzUgMS4wNC42OCAxLjkuMzljLjg2LS4yOSAyLjU0LTEuMTYgNS4zNS0xLjE4YzIuODEuMDIgNC40OS44OSA1LjM1IDEuMThjLjg2LjI5IDEuNjQtLjAzIDEuOS0uMzljLjI5LS4zOC4zOS0xLjAxLS4wMi0xLjU1eiI+Cg08L3BhdGg+Cg08cGF0aCBkPSJNODcuNDggNDkuODJjLS45My0xLjIzLTMuMDctMy4wMS03LjIzLTMuMDFzLTYuMzEgMS43OS03LjIzIDMuMDFjLS40MS41NC0uMzEgMS4xNy0uMDIgMS41NWMuMjYuMzUgMS4wNC42OCAxLjkuMzljLjg2LS4yOSAyLjU0LTEuMTYgNS4zNS0xLjE4YzIuODEuMDIgNC40OS44OSA1LjM1IDEuMThjLjg2LjI5IDEuNjQtLjAzIDEuOS0uMzljLjI5LS4zOC4zOS0xLjAxLS4wMi0xLjU1eiI+Cg08L3BhdGg+Cg08L2c+Cg08cGF0aCBkPSJNNjcuODYgNjguMDZjLS4xMS0uMDQtLjIxLS4wNy0uMzItLjA4aC03LjA3Yy0uMTEuMDEtLjIyLjA0LS4zMi4wOGMtLjY0LjI2LS45OS45Mi0uNjkgMS42M2MuMy43MSAxLjcxIDIuNjkgNC41NSAyLjY5czQuMjUtMS45OSA0LjU1LTIuNjljLjI5LS43MS0uMDYtMS4zNy0uNy0xLjYzeiIgZmlsbD0iI2RiYTY4OSI+Cg08L3BhdGg+Cg08cGF0aCBkPSJNNzIuNDIgNzYuMTRjLTMuMTkgMS44OS0xMy42MyAxLjg5LTE2LjgxIDBjLTEuODMtMS4wOS0zLjcuNTgtMi45NCAyLjI0Yy43NSAxLjYzIDYuNDUgNS40MiAxMS4zNyA1LjQyczEwLjU1LTMuNzkgMTEuMy01LjQyYy43NS0xLjY2LTEuMDktMy4zMy0yLjkyLTIuMjR6IiBmaWxsPSIjNDQ0Ij4KDTwvcGF0aD4KDTxnPgoNPHBhdGggZD0iTTEwNC4wNyAyNS4xMWMtMi40NC0zLjctNy45MS04LjY0LTEyLjgyLTguOTdjLS43OS00LjcyLTUuODQtOC43Mi0xMC43My0xMC4yN2MtMTMuMjMtNC4xOS0yMS44NC41MS0yNi40NiAzLjA0Yy0uOTYuNTMtNy4xNyAzLjk3LTExLjUxIDEuNWMtMi43Mi0xLjU1LTIuNjctNS43NC0yLjY3LTUuNzRzLTguNTMgMy4yNS01LjYxIDEyLjI5Yy0yLjkzLjEyLTYuNzcgMS4zNi04LjggNS40N2MtMi40MiA0LjktMS41NiA4Ljk5LS44NiAxMC45NWMtMi41MiAyLjE0LTUuNjkgNi42OS0zLjUyIDEyLjZjMS42NCA0LjQ1IDguMTcgNi41IDguMTcgNi41Yy0uNDYgOC4wMSAxLjAzIDEyLjk0IDEuODIgMTQuOTRjLjE0LjM1LjYzLjMyLjcyLS4wNGMuOTktMy45NiA0LjM3LTE3LjggNC4wMy0yMC4yMWMwIDAgMTEuMzUtMi4yNSAyMi4xNy0xMC4yMmMyLjItMS42MiA0LjU5LTMgNy4xMy00LjAyYzEzLjU5LTUuNDEgMTYuNDQgMy44MiAxNi40NCAzLjgyczkuNDItMS44MSAxMi4yNiAxMS4yN2MxLjA3IDQuOSAxLjggMTIuNzUgMi40IDE4LjI0Yy4wNC4zOS41Ny40Ny43My4xMWMuOTUtMi4xOCAyLjg1LTYuNSAzLjMtMTAuOTFjLjE2LTEuNTUgNC4zNC0zLjYgNi4xNC0xMC4yNmMyLjM5LTguODgtLjU2LTE3LjQyLTIuMzMtMjAuMDl6IiBmaWxsPSIjZTYzZDAwIj4KDTwvcGF0aD4KDTxyYWRpYWxHcmFkaWVudCBpZD0iSWNvbmlmeUlkMTdlY2RiMjkwNGQxNzhlYWIxNzkzNSIgY3g9Ijg0LjYyNSIgY3k9IjQxLjQ3NCIgcj0iMzUuNjMzIiBncmFkaWVudFRyYW5zZm9ybT0ibWF0cml4KC4zMDc2IC45NTE1IC0uNzA2IC4yMjgyIDg3Ljg3MyAtNDguNTEzKSIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiPgoNPHN0b3Agb2Zmc2V0PSIuNjk5IiBzdG9wLWNvbG9yPSIjZjk4YjI1IiBzdG9wLW9wYWNpdHk9IjAiPgoNPC9zdG9wPgoNPHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjZjk4YjI1Ij4KDTwvc3RvcD4KDTwvcmFkaWFsR3JhZGllbnQ+Cg08cGF0aCBkPSJNMTAwLjIyIDU1LjVjLjE2LTEuNTUgNC4zNC0zLjYgNi4xNC0xMC4yNmMuMTktLjcxLjM1LTEuNDMuNS0yLjE1YzEuNDYtOC4wOS0xLjE2LTE1LjUyLTIuNzktMTcuOThjLTIuMjYtMy40Mi03LjEtNy44OS0xMS43LTguODFjLS40LS4wNS0uNzktLjEtMS4xNi0uMTJjMCAwIC4zMyAyLjE1LS41NCAzLjg2Yy0xLjEyIDIuMjItMy40MSAyLjc1LTMuNDEgMi43NWMxMS45OCAxMS45OCAxMS4xMiAyMiAxMi45NiAzMi43MXoiIGZpbGw9InVybCgjSWNvbmlmeUlkMTdlY2RiMjkwNGQxNzhlYWIxNzkzNSkiPgoNPC9wYXRoPgoNPHJhZGlhbEdyYWRpZW50IGlkPSJJY29uaWZ5SWQxN2VjZGIyOTA0ZDE3OGVhYjE3OTM2IiBjeD0iNDcuMjgiIGN5PSI0LjIiIHI9IjkuMzQzIiBncmFkaWVudFRyYW5zZm9ybT0ibWF0cml4KC44ODEzIC40NzI2IC0uNTYwMyAxLjA0NSA3Ljk2NiAtMjIuNTMyKSIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiPgoNPHN0b3Agb2Zmc2V0PSIuMzkzIiBzdG9wLWNvbG9yPSIjZjk4YjI1Ij4KDTwvc3RvcD4KDTxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iI2Y5OGIyNSIgc3RvcC1vcGFjaXR5PSIwIj4KDTwvc3RvcD4KDTwvcmFkaWFsR3JhZGllbnQ+Cg08cGF0aCBkPSJNNTYuOTUgNy4zOWMtMS4wOS41My0yLjA2IDEuMDYtMi44OSAxLjUxYy0uOTYuNTMtNy4xNyAzLjk3LTExLjUxIDEuNWMtMi42Ny0xLjUyLTIuNjctNS41OC0yLjY3LTUuNzJjLTEuMjMgMS41Ny00Ljk1IDEyLjc4IDUuOTMgMTMuNTNjNC42OS4zMiA3LjU4LTMuNzcgOS4zLTcuMjNjLjYxLTEuMjcgMS41OC0zLjEgMS44NC0zLjU5eiIgZmlsbD0idXJsKCNJY29uaWZ5SWQxN2VjZGIyOTA0ZDE3OGVhYjE3OTM2KSI+Cg08L3BhdGg+Cg08cmFkaWFsR3JhZGllbnQgaWQ9Ikljb25pZnlJZDE3ZWNkYjI5MDRkMTc4ZWFiMTc5MzciIGN4PSIxNjAuMzEyIiBjeT0iNjIuNTM4IiByPSIzNS40MSIgZ3JhZGllbnRUcmFuc2Zvcm09Im1hdHJpeCgtLjkzNzggLS4zOTQ0IC4yMTgyIC0uNTI4NSAyMDYuNzk1IDExOS41OCkiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIj4KDTxzdG9wIG9mZnNldD0iLjcwOSIgc3RvcC1jb2xvcj0iI2Y5OGIyNSIgc3RvcC1vcGFjaXR5PSIwIj4KDTwvc3RvcD4KDTxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iI2Y5OGIyNSI+Cg08L3N0b3A+Cg08L3JhZGlhbEdyYWRpZW50PgoNPHBhdGggZD0iTTc5LjE2IDUuNDdjNy4zMiAxLjk4IDEwLjg5IDUuNzEgMTIuMDggMTAuNjhjLjM1IDEuNDYuNzcgMTUuMDgtMjUuMjMtLjRjLTkuNjctNS43Ni03LjAzLTkuMzYtNS45LTkuNzdjNC40Mi0xLjYgMTAuODUtMi43MyAxOS4wNS0uNTF6IiBmaWxsPSJ1cmwoI0ljb25pZnlJZDE3ZWNkYjI5MDRkMTc4ZWFiMTc5MzcpIj4KDTwvcGF0aD4KDTxyYWRpYWxHcmFkaWVudCBpZD0iSWNvbmlmeUlkMTdlY2RiMjkwNGQxNzhlYWIxNzkzOCIgY3g9IjQ2LjM2OSIgY3k9IjE1Ljk2MiIgcj0iMTMuMDk5IiBncmFkaWVudFRyYW5zZm9ybT0ibWF0cml4KDEgMCAwIDEuMjIzMyAwIC0zLjU2NCkiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIj4KDTxzdG9wIG9mZnNldD0iLjc4NiIgc3RvcC1jb2xvcj0iI2Y5OGIyNSIgc3RvcC1vcGFjaXR5PSIwIj4KDTwvc3RvcD4KDTxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iI2Y5OGIyNSI+Cg08L3N0b3A+Cg08L3JhZGlhbEdyYWRpZW50PgoNPHBhdGggZD0iTTM5Ljg0IDQuNjhjLS4wMS4wMS0uMDMuMDEtLjA2LjAyaC0uMDFjLS45My4zOS04LjI0IDMuNzgtNS41MSAxMi4yNmw3Ljc4IDEuMjVjLTYuODktNi45OC0yLjE3LTEzLjU1LTIuMTctMTMuNTVzLS4wMi4wMS0uMDMuMDJ6IiBmaWxsPSJ1cmwoI0ljb25pZnlJZDE3ZWNkYjI5MDRkMTc4ZWFiMTc5MzgpIj4KDTwvcGF0aD4KDTxyYWRpYWxHcmFkaWVudCBpZD0iSWNvbmlmeUlkMTdlY2RiMjkwNGQxNzhlYWIxNzkzOSIgY3g9IjM4LjE1MyIgY3k9IjI1LjQ0MiIgcj0iMTYuMDgzIiBncmFkaWVudFRyYW5zZm9ybT0ibWF0cml4KC0uOTY1NyAtLjI1OTggLjI0MzIgLS45MDM3IDY4LjgxIDU4LjM0NykiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIj4KDTxzdG9wIG9mZnNldD0iLjUwMyIgc3RvcC1jb2xvcj0iI2Y5OGIyNSIgc3RvcC1vcGFjaXR5PSIwIj4KDTwvc3RvcD4KDTxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iI2Y5OGIyNSI+Cg08L3N0b3A+Cg08L3JhZGlhbEdyYWRpZW50PgoNPHBhdGggZD0iTTM5LjA3IDE3LjczbC00LjgxLS43N2MtLjE5IDAtLjgzLjA2LTEuMTguMTFjLTIuNzEuMzgtNS45IDEuNzgtNy42MyA1LjM2Yy0xLjg2IDMuODYtMS44MSA3LjE3LTEuMyA5LjM4Yy4xNS43NC40NSAxLjU4LjQ1IDEuNThzMi4zOC0yLjI2IDguMDUtMi40MWw2LjQyLTEzLjI1eiIgZmlsbD0idXJsKCNJY29uaWZ5SWQxN2VjZGIyOTA0ZDE3OGVhYjE3OTM5KSI+Cg08L3BhdGg+Cg08cmFkaWFsR3JhZGllbnQgaWQ9Ikljb25pZnlJZDE3ZWNkYjI5MDRkMTc4ZWFiMTc5NDAiIGN4PSIzNi4zOSIgY3k9IjQyLjkxNSIgcj0iMTYuODg2IiBncmFkaWVudFRyYW5zZm9ybT0ibWF0cml4KC45OTA3IC4xMzYzIC0uMTM1MyAuOTgzNyA2LjE0OCAtNC4yNTkpIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+Cg08c3RvcCBvZmZzZXQ9Ii42OTkiIHN0b3AtY29sb3I9IiNmOThiMjUiIHN0b3Atb3BhY2l0eT0iMCI+Cg08L3N0b3A+Cg08c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiNmOThiMjUiPgoNPC9zdG9wPgoNPC9yYWRpYWxHcmFkaWVudD4KDTxwYXRoIGQ9Ik0yNC4zNyAzMy41OGMtMi4zNyAyLjEtNS41NiA2Ljc5LTMuMjEgMTIuNjFjMS43OCA0LjM5IDguMDkgNi4yOSA4LjA5IDYuMjljMCAuMDIgMS4yNi4zOSAxLjkxLjM5bDEuNDgtMjEuOWMtMy4wMyAwLTUuOTQuOTEtNy44MiAyLjIyYy4wMy4wNC0uNDYuMzYtLjQ1LjM5eiIgZmlsbD0idXJsKCNJY29uaWZ5SWQxN2VjZGIyOTA0ZDE3OGVhYjE3OTQwKSI+Cg08L3BhdGg+Cg08L2c+Cg08L3N2Zz4=", No = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KDTwhLS0gVXBsb2FkZWQgdG86IFNWRyBSZXBvLCB3d3cuc3ZncmVwby5jb20sIEdlbmVyYXRvcjogU1ZHIFJlcG8gTWl4ZXIgVG9vbHMgLS0+Cjxzdmcgd2lkdGg9IjgwMHB4IiBoZWlnaHQ9IjgwMHB4IiB2aWV3Qm94PSIwIDAgNjQgNjQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIGFyaWEtaGlkZGVuPSJ0cnVlIiByb2xlPSJpbWciIGNsYXNzPSJpY29uaWZ5IGljb25pZnktLWVtb2ppb25lIiBwcmVzZXJ2ZUFzcGVjdFJhdGlvPSJ4TWlkWU1pZCBtZWV0Ij4KDTxwYXRoIGQ9Ik01Ny42IDEzLjdjLS43LTEtMS42LTEuNy0yLjctMi4yYy0zLjQtMS43LTExLjYtMS4zLTEyLjMtNS43Yy0uOS01LjctNS45LjEtNi44LjFjLTEuMSAwLTEuNi0zLjktMy43LTMuOWMtMi4yIDAtMi43IDMuOS0zLjcgMy45Yy0uOSAwLTUuOS01LjgtNi44LS4xYy0uNyA0LjMtOSA0LTEyLjMgNS43Yy0xIC41LTIgMS4yLTIuNyAyLjJjLS41LjguNiAxLjYgMS4yLjljMS42LTIgNC44LTIuNCA3LjEtMi44YzEuOS0uNCA0LS42IDUuOS0xLjRjMi42LTEgMi41LTQuOSAzLjMtNC45Yy42IDAgMi43IDMgNC41IDNjMS42IDAgMi42LTMuNyAzLjUtMy43Yy45IDAgMS45IDMuNyAzLjUgMy43YzEuOSAwIDQtMyA0LjYtM2MuOCAwIC43IDMuOSAzLjMgNC45YzEuOC44IDMuOSAxIDUuOSAxLjRjMi4zLjUgNS42LjggNy4xIDIuOGMuNS43IDEuNi0uMiAxLjEtLjkiIGZpbGw9IiMwMGI5ZjEiPgoNPC9wYXRoPgoNPHBhdGggZD0iTTUzIDU3YzAgMi44LTIuMiA1LTUgNUgxNmMtMi44IDAtNS0yLjItNS01VjM2aDQydjIxeiIgZmlsbD0iIzg5OTY3YSI+Cg08L3BhdGg+Cg08cGF0aCBkPSJNMzIgMTJjLTE1LjUgMC0yMSA4LjUtMjEgMjR2MjFoNDJWMzZjMC0xNS41LTUuNS0yNC0yMS0yNCIgZmlsbD0iI2I2YzRhNyI+Cg08L3BhdGg+Cg08ZyBmaWxsPSIjODk5NjdhIj4KDTxwYXRoIGQ9Ik0xMSA1NWMtMS4xIDAtMi0xLjItMi0yLjZ2LTYuOGMwLTEuNC45LTIuNiAyLTIuNnYxMiI+Cg08L3BhdGg+Cg08cGF0aCBkPSJNNTMgNDNjMS4xIDAgMiAxLjIgMiAyLjZ2Ni44YzAgMS40LS45IDIuNi0yIDIuNlY0MyI+Cg08L3BhdGg+Cg08L2c+Cg08ZyBmaWxsPSIjM2U0MzQ3Ij4KDTxwYXRoIGQ9Ik03IDIwSDV2MzBoNHYtMkg3eiI+Cg08L3BhdGg+Cg08cGF0aCBkPSJNNTcgMjB2MjhoLTJ2Mmg0VjIweiI+Cg08L3BhdGg+Cg08L2c+Cg08Y2lyY2xlIGN4PSI1OCIgY3k9IjIwIiByPSI0IiBmaWxsPSIjMDBiOWYxIj4KDTwvY2lyY2xlPgoNPGNpcmNsZSBjeD0iNiIgY3k9IjIwIiByPSI0IiBmaWxsPSIjZmY1MjYzIj4KDTwvY2lyY2xlPgoNPHBhdGggZD0iTTIxLjUgMzkuNWMtNC40IDAtOC0zLjYtOC04czMuNi04IDgtOHM4IDMuNiA4IDhzLTMuNiA4LTggOCIgZmlsbD0iI2VmZmZkOSI+Cg08L3BhdGg+Cg08Y2lyY2xlIGN4PSIyMS41IiBjeT0iMzEuNSIgcj0iNiIgZmlsbD0iIzU0NWI2MSI+Cg08L2NpcmNsZT4KDTxjaXJjbGUgY3g9IjIxLjUiIGN5PSIzMS41IiByPSIyLjMiIGZpbGw9IiNmZjUyNjMiPgoNPC9jaXJjbGU+Cg08cGF0aCBkPSJNNDIuNSAzOS41Yy00LjQgMC04LTMuNi04LThzMy42LTggOC04czggMy42IDggOHMtMy42IDgtOCA4IiBmaWxsPSIjZWZmZmQ5Ij4KDTwvcGF0aD4KDTxwYXRoIGQ9Ik00Mi41IDM3LjVjLTMuMyAwLTYtMi43LTYtNnMyLjctNiA2LTZzNiAyLjcgNiA2cy0yLjcgNi02IDYiIGZpbGw9IiM1NDViNjEiPgoNPC9wYXRoPgoNPGNpcmNsZSBjeD0iNDIuNSIgY3k9IjMxLjUiIHI9IjIuMyIgZmlsbD0iI2ZmNTI2MyI+Cg08L2NpcmNsZT4KDTxwYXRoIGQ9Ik0xOS44IDU0LjFjLTcuNCAwLTcuNC0xMyAwLTEzaDI0LjVjNy40IDAgNy40IDEzIDAgMTNIMTkuOCIgZmlsbD0iI2VmZmZkOSI+Cg08L3BhdGg+Cg08cGF0aCBkPSJNMjAuNSA1Mi42Yy02IDAtNi0xMCAwLTEwaDIzYzYgMCA2IDEwIDAgMTBoLTIzIiBmaWxsPSIjODk5NjdhIj4KDTwvcGF0aD4KDTxnIG9wYWNpdHk9Ii43IiBmaWxsPSIjM2U0MzQ3Ij4KDTxwYXRoIGQ9Ik0yMS4yIDUwLjdjMCAxLjItMiAxLjItMiAwdi02LjFjMC0xLjIgMi0xLjIgMiAwdjYuMSI+Cg08L3BhdGg+Cg08cGF0aCBkPSJNMjUuOSA1MC43YzAgMS4yLTIgMS4yLTIgMHYtNi4xYzAtMS4yIDItMS4yIDIgMHY2LjEiPgoNPC9wYXRoPgoNPHBhdGggZD0iTTMwLjYgNTAuN2MwIDEuMi0yIDEuMi0yIDB2LTYuMWMwLTEuMiAyLTEuMiAyIDB2Ni4xIj4KDTwvcGF0aD4KDTxwYXRoIGQ9Ik0zNS40IDUwLjdjMCAxLjItMiAxLjItMiAwdi02LjFjMC0xLjIgMi0xLjIgMiAwdjYuMSI+Cg08L3BhdGg+Cg08cGF0aCBkPSJNNDAuMSA1MC43YzAgMS4yLTIgMS4yLTIgMHYtNi4xYzAtMS4yIDItMS4yIDIgMHY2LjEiPgoNPC9wYXRoPgoNPHBhdGggZD0iTTQ0LjggNTAuN2MwIDEuMi0yIDEuMi0yIDB2LTYuMWMwLTEuMiAyLTEuMiAyIDB2Ni4xIj4KDTwvcGF0aD4KDTwvZz4KDTxjaXJjbGUgY3g9IjMyIiBjeT0iMzciIHI9IjIiIGZpbGw9IiNmNWY1ZjUiPgoNPC9jaXJjbGU+Cg08cGF0aCBmaWxsPSIjNTQ1YjYxIiBkPSJNMzAuMzE2IDM1Ljg2MmwuNTY2LS41NjVsMi44MjggMi44MjhsLS41NjUuNTY2eiI+Cg08L3BhdGg+Cg08L3N2Zz4=", re = "https://demo-bot.tock.ai/io/tock/tockbot/web", ws = [
  {
    active: !1,
    name: "Default",
    description: "Default settings only. No local storage.",
    tockUrl: re
  },
  {
    active: !1,
    name: "Messenger",
    tockUrl: re,
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
    tockUrl: re,
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
    tockUrl: re,
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
    tockUrl: re,
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
                  src: No,
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
    tockUrl: re,
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
    tockUrl: re,
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
    tockUrl: re,
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
                  src: No,
                  width: "1em",
                  height: "1em"
                },
                userImage: {
                  src: bs,
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
    tockUrl: re,
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
    tockUrl: re,
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
], Ms = { class: "panel-body-wrapper d-flex flex-column" }, Is = { class: "panel-body-body flex-grow-1" }, ks = /* @__PURE__ */ M("div", { class: "option-category-header p-2 d-flex align-items-center border-top border-bottom" }, [
  /* @__PURE__ */ M("h6", { class: "m-0 ms-1" }, "Templates")
], -1), js = ["onClick"], Ns = { class: "mb-0" }, xs = {
  key: 0,
  class: "text-small mt-1"
}, Ss = {
  key: 0,
  class: "alert alert-danger my-2 text-small"
}, Ls = { class: "text-end" }, Ts = ["onClick"], Ds = /* @__PURE__ */ K({
  __name: "editor-templates",
  setup(e) {
    const t = q(), o = $(ws);
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
      Ht().forEach((u) => {
        l.style.setProperty(u.key, u.initialValue);
      }), a.styling && Object.entries(a.styling).forEach((u) => {
        l.style.setProperty(u[0], u[1]);
      }), $n(a.tockUrl, a.options);
    }
    return (a, l) => (y(), I("div", Ms, [
      M("div", Is, [
        ks,
        (y(!0), I(J, null, ue(o.value, (c) => (y(), I("div", {
          class: H(["templates-list-entry cursor-pointer py-2 px-3", { active: c.active }])
        }, [
          M("div", {
            onClick: (u) => n(c)
          }, [
            M("h6", Ns, V(c.name), 1),
            c.description ? (y(), I("div", xs, V(c.description), 1)) : z("", !0)
          ], 8, js),
          c._confirmTemplateChangeWarning ? (y(), I("div", Ss, [
            fe(" Your changes will be lost. Are you sure you want to apply this template and reset all your recent changes? "),
            M("div", Ls, [
              M("button", {
                class: "btn btn-primary btn-sm me-2",
                onClick: (u) => i(c)
              }, " Yes ", 8, Ts),
              M("button", {
                class: "btn btn-danger btn-sm",
                onClick: l[0] || (l[0] = (u) => s())
              }, " Cancel ")
            ])
          ])) : z("", !0)
        ], 2))), 256))
      ])
    ]));
  }
}), Cs = {
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
}, Os = { class: "form-label lh-1 d-flex gap-4 align-items-center justify-content-between position-relative" }, As = { class: "input-group input-group-sm" }, Es = /* @__PURE__ */ M("i", { class: "bi bi bi-caret-down-fill" }, null, -1), zs = [
  Es
], Ps = ["contenteditable"], $s = { key: 0 }, Ys = { key: 1 }, Gs = ["onClick"], Rs = /* @__PURE__ */ M("i", { class: "bi bi-arrow-90deg-left" }, null, -1), Ws = [
  Rs
], Zs = {
  key: 0,
  class: "list-group variable-suggestions"
}, Vs = ["onClick"], Bs = {
  key: 1,
  class: "form-text text-small"
}, Fs = /* @__PURE__ */ M("span", { class: "text-muted" }, "Default value : ", -1), Us = /* @__PURE__ */ K({
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
    He(() => {
      i() && n();
    }), zn(() => {
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
      return Cs[o.variable.name];
    }
    const u = $(null);
    function f() {
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
    function S() {
      s.value = !0, m = o.variable.value.toString();
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
        const R = document.createRange(), X = (T = u.value) == null ? void 0 : T.children[0], Qt = ((G = (P = X == null ? void 0 : X.childNodes[0]) == null ? void 0 : P.textContent) == null ? void 0 : G.length) || 0;
        X != null && X.childNodes[0] && (R.setStart(X == null ? void 0 : X.childNodes[0], Math.min(Qt, p)), R.setEnd(X == null ? void 0 : X.childNodes[0], Math.min(Qt, x)), A.removeAllRanges(), A.addRange(R));
      }
    }
    function L(p) {
      var A;
      N(p);
      let x = (A = p.clipboardData) == null ? void 0 : A.getData("text/plain");
      if (x) {
        const T = document.getSelection(), P = T == null ? void 0 : T.getRangeAt(0);
        if (P) {
          const G = o.variable.value.toString(), R = G.substring(0, P.startOffset), X = G.substring(P.endOffset);
          x = R + x + X;
        }
        a(x), m = o.variable.value.toString();
      }
    }
    function w(p) {
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
          a(G), m = G;
        }
      }
    }
    let b = $(!1);
    function _(p) {
      N(p), b.value = !b.value, b.value ? document.addEventListener("click", E) : document.removeEventListener("click", E);
    }
    function E(p) {
      b.value && _(p);
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
    function v(p) {
      bn(p);
    }
    return (p, x) => {
      const A = mt("tooltip");
      return y(), I("div", {
        ref_key: "wrapperRef",
        ref: r,
        class: H(["position-relative", { "targeted-item": i() }])
      }, [
        M("label", Os, [
          M("span", {
            class: H(["text-nowrap", {
              "fst-italic": o.variable.value != o.variable.initialValue
            }])
          }, V(o.variable.name), 3),
          W((y(), I("span", {
            class: "text-muted text-small text-end text-truncate py-1",
            onClick: x[0] || (x[0] = (T) => v(o.variable.key))
          }, [
            fe(V(o.variable.key), 1)
          ])), [
            [A, o.variable.key + " (click to copy)"]
          ])
        ]),
        M("div", As, [
          c() ? (y(), I("button", {
            key: 0,
            class: "btn btn-secondary px-1",
            type: "button",
            onClick: _
          }, zs)) : z("", !0),
          M("div", {
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
            onInput: x[6] || (x[6] = Pn((T) => D(T), ["self"])),
            onKeydown: x[7] || (x[7] = (T) => w(T)),
            tabindex: "0"
          }, [
            d(s) ? (y(), I(J, { key: 0 }, [
              fe(V(d(m)), 1)
            ], 64)) : z("", !0),
            d(s) ? z("", !0) : (y(!0), I(J, { key: 1 }, ue(f(), (T) => (y(), I(J, null, [
              T.varName ? z("", !0) : (y(), I("span", $s, V(T.str), 1)),
              T.varName ? (y(), I("span", Ys, [
                h(T.varName) ? (y(), I("span", {
                  key: 0,
                  style: $e({ "--prvw-color": "var(" + T.varName + ")" }),
                  class: "variable-color-preview"
                }, null, 4)) : z("", !0),
                fe("var("),
                W((y(), I("a", {
                  onClick: (P) => g(P, T.varName),
                  href: "javascript:void(null)",
                  class: "variable-link"
                }, [
                  fe(V(T.varName), 1)
                ], 8, Gs)), [
                  [A, j(T.varName)]
                ]),
                fe(") ")
              ])) : z("", !0)
            ], 64))), 256))
          ], 40, Ps),
          o.variable.value != o.variable.initialValue ? W((y(), I("button", {
            key: 1,
            class: "btn btn-secondary",
            type: "button",
            id: "button-addon2",
            onClick: x[8] || (x[8] = (T) => l()),
            tabindex: "1"
          }, Ws)), [
            [A, "Restore default value"]
          ]) : z("", !0)
        ]),
        d(b) ? (y(), I("ul", Zs, [
          (y(!0), I(J, null, ue(c(), (T) => (y(), I("li", {
            class: "list-group-item cursor-pointer",
            onClick: (P) => a(T)
          }, V(T), 9, Vs))), 256))
        ])) : z("", !0),
        o.variable.value != o.variable.initialValue ? (y(), I("div", Bs, [
          Fs,
          fe(V(o.variable.initialValue.toString()), 1)
        ])) : z("", !0)
      ], 2);
    };
  }
}), Hs = {
  key: 0,
  class: "bi bi-chevron-right"
}, Qs = {
  key: 1,
  class: "bi bi-chevron-down"
}, Js = { class: "p-3 border-bottom" }, Ks = /* @__PURE__ */ K({
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
    let n = $(!0);
    return He(() => {
      o.path.length > 1 && (n.value = !1);
    }), t.$onAction(({ name: i, store: s, args: r, after: a }) => {
      i === "targetStylingVariable" && a(() => {
        if (t.stylingTargetedVar) {
          const l = Ut(t.stylingTargetedVar);
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
      const r = Ce("editorVariablesGroup", !0);
      return y(), I(J, null, [
        M("div", {
          class: H(["option-category-header p-2 d-flex align-items-center border-top border-bottom", {
            "cursor-pointer": o.path.length > 1
          }]),
          onClick: s[0] || (s[0] = (l) => o.path.length > 1 ? je(n) ? n.value = !d(n) : n = !d(n) : null)
        }, [
          o.path.length > 1 && !d(n) ? (y(), I("i", Hs)) : z("", !0),
          o.path.length > 1 && d(n) ? (y(), I("i", Qs)) : z("", !0),
          M("h6", {
            class: H(["m-0 ms-1", { "fw-bold": o.path.length === 1 }])
          }, V((a = e.path) == null ? void 0 : a.join(" | ")), 3)
        ], 2),
        d(n) ? (y(!0), I(J, { key: 0 }, ue(d(_s)(e.variables, e.path), (l, c) => (y(), I("div", Js, [
          (y(), Q(Us, {
            variables: e.variables,
            variable: l,
            key: l.key
          }, null, 8, ["variables", "variable"]))
        ]))), 256)) : z("", !0),
        (y(!0), I(J, null, ue(d(vs)(e.variables, e.path), (l) => (y(), I("div", null, [
          (y(), Q(r, {
            variables: e.variables,
            path: [...e.path, l],
            key: [...e.path, l].join("")
          }, null, 8, ["variables", "path"]))
        ]))), 256))
      ], 64);
    };
  }
}), Xs = { class: "panel-body-wrapper d-flex flex-column" }, qs = { class: "panel-body-header pt-1 px-1 border-bottom" }, er = { class: "d-flex flex-wrap justify-content-between" }, tr = ["onClick"], or = { class: "panel-body-body flex-grow-1" }, nr = /* @__PURE__ */ K({
  __name: "editor-variables",
  setup(e) {
    const t = q();
    t.$onAction(({ name: s, store: r, args: a, after: l }) => {
      s === "refreshEditorPanels" && l(() => {
        i();
      });
    });
    const o = $([]), n = $([]);
    function i() {
      o.value = Ht(), n.value = ms(o.value);
    }
    return (s, r) => (y(), I("div", Xs, [
      M("div", qs, [
        M("div", er, [
          (y(!0), I(J, null, ue(n.value, (a) => (y(), I("div", {
            class: H(["tag cursor-pointer me-1 mb-1 text-nowrap flex-fill text-center", { active: d(t).stylingCategory === a }]),
            onClick: (l) => d(t).setStylingCategory(a)
          }, V(a), 11, tr))), 256))
        ])
      ]),
      M("div", or, [
        (y(), Q(Ks, {
          variables: o.value,
          path: [d(t).stylingCategory],
          key: d(t).currentCustomizationName + d(t).stylingCategory
        }, null, 8, ["variables", "path"]))
      ])
    ]));
  }
}), ir = { class: "form-label lh-1 d-flex gap-4 align-items-center justify-content-between position-relative" }, sr = { class: "text-muted text-small text-end text-truncate rtl" }, rr = { class: "form-text text-small mb-2" }, ar = { class: "input-group input-group-sm" }, lr = ["value", "disabled"], cr = ["value", "disabled"], ur = {
  key: 2,
  class: "form-check form-switch"
}, dr = ["id", "checked", "disabled"], pr = ["for"], hr = { key: 0 }, gr = { key: 1 }, fr = { key: 3 }, mr = { class: "form-check form-switch" }, _r = ["id", "disabled"], vr = ["for"], yr = { key: 0 }, br = { key: 1 }, wr = {
  key: 0,
  class: "input-group-sm imageDef-wrapper mt-2"
}, Mr = /* @__PURE__ */ M("label", { class: "form-label text-small mb-0" }, "Src (url or svg data image)", -1), Ir = ["value", "disabled"], kr = { class: "d-flex gap-3" }, jr = { class: "input-group-sm" }, Nr = /* @__PURE__ */ M("label", { class: "form-label text-small mb-0" }, "Width", -1), xr = ["value", "disabled"], Sr = { class: "input-group-sm" }, Lr = /* @__PURE__ */ M("label", { class: "form-label text-small mb-0" }, "Height", -1), Tr = ["value", "disabled"], Dr = {
  key: 4,
  class: "w-100"
}, Cr = {
  key: 0,
  class: "d-flex text-small"
}, Or = /* @__PURE__ */ M("div", { style: { width: "45%" } }, "Header name", -1), Ar = /* @__PURE__ */ M("div", null, "Header value", -1), Er = [
  Or,
  Ar
], zr = { class: "input-group input-group-sm mb-1" }, Pr = ["value", "onInput", "disabled"], $r = ["value", "onInput", "disabled"], Yr = ["onClick", "disabled"], Gr = /* @__PURE__ */ M("i", { class: "bi bi-trash" }, null, -1), Rr = [
  Gr
], Wr = ["disabled"], et = 500, Ee = "New-Header-Name", Zr = /* @__PURE__ */ K({
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
    t.$onAction(({ name: k, store: L, args: w, after: b }) => {
      k === "refreshEditorPanels" && b(() => {
        setTimeout(() => {
          a();
        });
      });
    });
    const o = e;
    let n = $(!0), i = $(), s = $(!1), r;
    He(() => {
      r = [o.group, o.path].join(".");
      const k = o.optionsModel[o.group], L = o.currentOptions[o.group], w = l(k, o.path), b = l(L, o.path);
      a(), typeof b > "u" ? i.value = w.default : i.value = b, o.value.type === "ImageDef" && i.value && (s.value = !0);
    });
    function a() {
      let k = !0;
      const L = o.optionsModel[o.group], w = l(L, o.path);
      w.conditions && w.conditions.forEach((b) => {
        l(o.currentOptions, b) || (k = !1);
      }), n.value = k;
    }
    const l = (k, L) => L.split(".").reduce((w, b) => b in w ? w[b] : void 0, k);
    function c(k, L) {
      t.templateDirtyState = !0, Yn(k, L);
    }
    const u = qe((k) => {
      c(r, k), i.value = k, t.refreshEditorPanels();
    }, et);
    Yt(s, (k, L) => {
      k || (c(r, void 0), i.value = void 0);
    });
    const f = qe((k, L) => {
      const w = [r, k].join(".");
      c(w, L);
      let b = i.value ? i.value : {};
      b[k] = L, i.value = b;
    }, et), g = qe((k, L) => {
      i.value[L] = i.value[k], delete i.value[k], c(r, i.value);
    }, et), m = qe((k, L) => {
      i.value[k] = L, c(r, i.value);
    }, et);
    function S(k) {
      delete i.value[k], Object.keys(i.value).length < 1 && (i.value = void 0), c(r, i.value);
    }
    const C = $({});
    function N(k, L) {
      C.value[k] = L;
    }
    function D() {
      return !i.value || i.value[Ee] === void 0;
    }
    function O() {
      i.value ? i.value[Ee] = "" : i.value = { [Ee]: "" }, setTimeout(() => {
        C.value[Ee].focus(), C.value[Ee].select();
      });
    }
    return (k, L) => {
      var b, _, E;
      const w = mt("tooltip");
      return y(), I("div", {
        class: H(["p-3 border-bottom", {
          inactive: !d(n),
          "tvke-secondary-bg-subtle": d(i) != o.value.default
        }])
      }, [
        M("label", ir, [
          M("span", {
            class: H(["text-nowrap", { "fw-bold": d(i) != o.value.default }])
          }, V(o.value.title), 3),
          W((y(), I("span", sr, [
            fe(V(d(r)), 1)
          ])), [
            [w, d(r)]
          ])
        ]),
        M("div", rr, V(o.value.description), 1),
        M("div", ar, [
          o.value.type === "string" ? (y(), I("input", {
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
          }, null, 40, lr)) : z("", !0),
          o.value.type === "number" ? (y(), I("input", {
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
          }, null, 40, cr)) : z("", !0),
          o.value.type === "boolean" ? (y(), I("div", ur, [
            M("input", {
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
            }, null, 40, dr),
            M("label", {
              class: "form-check-label",
              for: k.path
            }, [
              d(i) ? (y(), I("span", hr, "enabled")) : z("", !0),
              d(i) ? z("", !0) : (y(), I("span", gr, "disabled"))
            ], 8, pr)
          ])) : z("", !0),
          o.value.type === "ImageDef" ? (y(), I("div", fr, [
            M("div", mr, [
              W(M("input", {
                class: "form-check-input",
                type: "checkbox",
                role: "switch",
                id: k.path,
                "onUpdate:modelValue": L[3] || (L[3] = (j) => je(s) ? s.value = j : s = j),
                disabled: !d(n)
              }, null, 8, _r), [
                [Do, d(s)]
              ]),
              M("label", {
                class: "form-check-label",
                for: k.path
              }, [
                d(s) ? (y(), I("span", yr, "enabled")) : z("", !0),
                d(s) ? z("", !0) : (y(), I("span", br, "disabled"))
              ], 8, vr)
            ]),
            d(s) ? (y(), I("div", wr, [
              Mr,
              M("input", {
                class: "form-control",
                placeholder: "Not specified",
                spellcheck: "false",
                value: (b = d(i)) == null ? void 0 : b.src,
                onInput: L[4] || (L[4] = (j) => {
                  var h;
                  return d(f)("src", (h = j == null ? void 0 : j.target) == null ? void 0 : h.value);
                }),
                disabled: !d(n)
              }, null, 40, Ir),
              M("div", kr, [
                M("div", jr, [
                  Nr,
                  M("input", {
                    class: "form-control",
                    placeholder: "Not specified",
                    spellcheck: "false",
                    value: (_ = d(i)) == null ? void 0 : _.width,
                    onInput: L[5] || (L[5] = (j) => {
                      var h;
                      return d(f)(
                        "width",
                        (h = j == null ? void 0 : j.target) == null ? void 0 : h.value
                      );
                    }),
                    disabled: !d(n)
                  }, null, 40, xr)
                ]),
                M("div", Sr, [
                  Lr,
                  M("input", {
                    class: "form-control",
                    placeholder: "Not specified",
                    spellcheck: "false",
                    value: (E = d(i)) == null ? void 0 : E.height,
                    onInput: L[6] || (L[6] = (j) => {
                      var h;
                      return d(f)(
                        "height",
                        (h = j == null ? void 0 : j.target) == null ? void 0 : h.value
                      );
                    }),
                    disabled: !d(n)
                  }, null, 40, Tr)
                ])
              ])
            ])) : z("", !0)
          ])) : z("", !0),
          o.value.type === "KeyValues" ? (y(), I("div", Dr, [
            d(i) ? (y(), I("div", Cr, Er)) : z("", !0),
            (y(!0), I(J, null, ue(d(i), (j, h) => (y(), I("div", zr, [
              M("input", {
                class: "form-control",
                placeholder: "Not specified",
                spellcheck: "false",
                value: h,
                ref_for: !0,
                ref: (v) => N(h, v),
                onInput: (v) => {
                  var p;
                  return d(g)(
                    h,
                    (p = v == null ? void 0 : v.target) == null ? void 0 : p.value
                  );
                },
                disabled: !d(n)
              }, null, 40, Pr),
              M("input", {
                class: "form-control",
                placeholder: "Not specified",
                spellcheck: "false",
                value: j,
                onInput: (v) => {
                  var p;
                  return d(m)(
                    h,
                    (p = v == null ? void 0 : v.target) == null ? void 0 : p.value
                  );
                },
                disabled: !d(n)
              }, null, 40, $r),
              M("button", {
                class: "btn btn-danger btn-sm",
                onClick: (v) => S(h),
                disabled: !d(n)
              }, Rr, 8, Yr)
            ]))), 256)),
            D() ? (y(), I("button", {
              key: 1,
              class: "btn btn-link btn-sm p-0",
              onClick: O,
              disabled: !d(n)
            }, " Add new header ", 8, Wr)) : z("", !0)
          ])) : z("", !0)
        ])
      ], 2);
    };
  }
}), Vr = /* @__PURE__ */ K({
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
    He(() => {
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
    return (i, s) => (y(!0), I(J, null, ue(d(o), (r) => (y(), Q(Zr, {
      "options-model": t.optionsModel,
      group: t.group,
      path: r[0],
      value: r[1],
      "current-options": t.currentOptions
    }, null, 8, ["options-model", "group", "path", "value", "current-options"]))), 256));
  }
}), Br = { class: "option-category-header p-2 d-flex align-items-center border-top border-bottom" }, Fr = { class: "m-0 ms-1" }, wn = /* @__PURE__ */ K({
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
    return (o, n) => (y(), I(J, null, [
      M("div", Br, [
        M("h6", Fr, V(t.group), 1)
      ]),
      $t(Vr, {
        "options-model": t.optionsModel,
        group: t.group,
        "current-options": t.currentOptions
      }, null, 8, ["options-model", "group", "current-options"])
    ], 64));
  }
}), Ur = { class: "panel-body-wrapper d-flex flex-column" }, Hr = { class: "panel-body-body flex-grow-1" }, Qr = /* @__PURE__ */ K({
  __name: "editor-preferences",
  setup(e) {
    const t = q();
    let o = $(), n = $([]), i = $();
    t.$onAction(({ name: r, store: a, args: l, after: c }) => {
      r === "refreshEditorPanels" && c(() => {
        s();
      });
    });
    function s() {
      i.value = at();
      const r = lt();
      o.value = r, n.value = ["localStorage", "initialization", "preferences"];
    }
    return (r, a) => (y(), I("div", Ur, [
      M("div", Hr, [
        (y(!0), I(J, null, ue(d(n), (l, c) => (y(), Q(wn, {
          "options-model": d(o),
          group: l,
          "current-options": d(i),
          index: c
        }, null, 8, ["options-model", "group", "current-options", "index"]))), 256))
      ])
    ]));
  }
}), Jr = { class: "panel-body-wrapper d-flex flex-column" }, Kr = { class: "panel-body-body flex-grow-1" }, Xr = /* @__PURE__ */ K({
  __name: "editor-wording",
  setup(e) {
    const t = q();
    let o = $(), n = $([]), i = $();
    t.$onAction(({ name: r, store: a, args: l, after: c }) => {
      r === "refreshEditorPanels" && c(() => {
        s();
      });
    });
    function s() {
      i.value = at();
      const r = lt();
      o.value = r, n.value = ["wording"];
    }
    return (r, a) => (y(), I("div", Jr, [
      M("div", Kr, [
        (y(!0), I(J, null, ue(d(n), (l, c) => (y(), Q(wn, {
          "options-model": d(o),
          group: l,
          "current-options": d(i),
          index: c
        }, null, 8, ["options-model", "group", "current-options", "index"]))), 256))
      ])
    ]));
  }
}), qr = (e, t) => {
  const o = e.__vccOpts || e;
  for (const [n, i] of t)
    o[n] = i;
  return o;
}, ea = /* @__PURE__ */ qr(Xr, [["__scopeId", "data-v-8ed05402"]]);
var ze = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, Mn = { exports: {} };
(function(e, t) {
  (function(o, n) {
    n();
  })(ze, function() {
    function o(c, u) {
      return typeof u > "u" ? u = { autoBom: !1 } : typeof u != "object" && (console.warn("Deprecated: Expected third argument to be a object"), u = { autoBom: !u }), u.autoBom && /^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(c.type) ? new Blob(["\uFEFF", c], { type: c.type }) : c;
    }
    function n(c, u, f) {
      var g = new XMLHttpRequest();
      g.open("GET", c), g.responseType = "blob", g.onload = function() {
        l(g.response, u, f);
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
    var r = typeof window == "object" && window.window === window ? window : typeof self == "object" && self.self === self ? self : typeof ze == "object" && ze.global === ze ? ze : void 0, a = r.navigator && /Macintosh/.test(navigator.userAgent) && /AppleWebKit/.test(navigator.userAgent) && !/Safari/.test(navigator.userAgent), l = r.saveAs || (typeof window != "object" || window !== r ? function() {
    } : "download" in HTMLAnchorElement.prototype && !a ? function(c, u, f) {
      var g = r.URL || r.webkitURL, m = document.createElement("a");
      u = u || c.name || "download", m.download = u, m.rel = "noopener", typeof c == "string" ? (m.href = c, m.origin === location.origin ? s(m) : i(m.href) ? n(c, u, f) : s(m, m.target = "_blank")) : (m.href = g.createObjectURL(c), setTimeout(function() {
        g.revokeObjectURL(m.href);
      }, 4e4), setTimeout(function() {
        s(m);
      }, 0));
    } : "msSaveOrOpenBlob" in navigator ? function(c, u, f) {
      if (u = u || c.name || "download", typeof c != "string")
        navigator.msSaveOrOpenBlob(o(c, f), u);
      else if (i(c))
        n(c, u, f);
      else {
        var g = document.createElement("a");
        g.href = c, g.target = "_blank", setTimeout(function() {
          s(g);
        });
      }
    } : function(c, u, f, g) {
      if (g = g || open("", "_blank"), g && (g.document.title = g.document.body.innerText = "downloading..."), typeof c == "string")
        return n(c, u, f);
      var m = c.type === "application/octet-stream", S = /constructor/i.test(r.HTMLElement) || r.safari, C = /CriOS\/[\d]+/.test(navigator.userAgent);
      if ((C || m && S || a) && typeof FileReader < "u") {
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
})(Mn);
var ta = Mn.exports;
const oa = { class: "panel-body-wrapper d-flex flex-column" }, na = { class: "panel-body-header py-2 px-3 border-bottom text-small d-flex align-items-center" }, ia = { class: "form-check form-check-inline no-min-height" }, sa = ["value"], ra = /* @__PURE__ */ M("label", {
  class: "form-check-label",
  for: "outputFormatHtml"
}, "html", -1), aa = { class: "form-check form-check-inline no-min-height" }, la = ["value"], ca = /* @__PURE__ */ M("label", {
  class: "form-check-label",
  for: "outputFormatJs"
}, "json", -1), ua = { class: "form-check form-switch no-min-height ms-auto" }, da = /* @__PURE__ */ M("label", {
  class: "form-check-label",
  for: "outputMinify"
}, "Minify", -1), pa = { class: "panel-body-body tvke-secondary-bg flex-grow-1 text-small p-3" }, ha = {
  key: 0,
  class: "text-center fst-italic pt-3"
}, ga = {
  key: 1,
  class: "mb-2"
}, fa = {
  key: 0,
  class: "mb-2"
}, ma = {
  key: 1,
  class: "mb-2"
}, _a = { class: "output-block d-flex" }, va = { class: "pre-wrap mb-0 flex-grow-1" }, ya = { class: "d-flex flex-column" }, ba = /* @__PURE__ */ M("i", { class: "bi bi-copy" }, null, -1), wa = [
  ba
], Ma = /* @__PURE__ */ M("i", { class: "bi bi-file-earmark-arrow-down" }, null, -1), Ia = [
  Ma
], ka = { key: 2 }, ja = {
  key: 0,
  class: "mb-2"
}, Na = {
  key: 1,
  class: "mb-2"
}, xa = { class: "output-block d-flex" }, Sa = { class: "pre-wrap mb-0 flex-grow-1" }, La = { class: "d-flex flex-column" }, Ta = /* @__PURE__ */ M("i", { class: "bi bi-copy" }, null, -1), Da = [
  Ta
], Ca = /* @__PURE__ */ M("i", { class: "bi bi-file-earmark-arrow-down" }, null, -1), Oa = [
  Ca
], Aa = /* @__PURE__ */ K({
  __name: "editor-output",
  setup(e) {
    const t = q();
    t.$onAction(({ name: w, store: b, args: _, after: E }) => {
      w === "refreshEditorPanels" && E(() => {
        r();
      });
    });
    const o = $(), n = $();
    function i(w) {
      t.setOutputFormat(w);
    }
    function s(w) {
      t.minifyOutput(w);
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
    function a(w, b) {
      return w === "js" ? C() : m();
    }
    function l(w) {
      return w === "js" ? S() : u();
    }
    function c() {
      let w = Ht();
      return w.sort((b, _) => b.key.localeCompare(_.key)), w = w.filter((b) => b.value.toString() !== b.initialValue.toString()), w;
    }
    function u() {
      const w = c(), b = {};
      return w.forEach((_) => {
        b[_.key] = _.value;
      }), b;
    }
    function f(w) {
      return t.outputFormat === Z.json ? '"' + w + '"' : w;
    }
    function g() {
      return t.outputFormat === Z.json ? "," : ";";
    }
    function m(w) {
      const b = t.outputMinified, _ = "<", E = ">", j = [];
      let h = c();
      return h.length && (t.outputFormat === Z.html && (j.push(_ + "style" + E), j.push(":root {")), t.outputFormat === Z.json && j.push("{"), h.forEach((v) => {
        j.push(
          f(v.key) + ": " + f(v.value.toString()) + g()
        );
      }), j.push("}"), t.outputFormat === Z.html && j.push(_ + "/style" + E), b && j.push(`
`)), j.join(b ? "" : `
`);
    }
    function S() {
      const w = at(), b = lt();
      return N(w, b);
    }
    function C(w) {
      const b = t.outputMinified, _ = "<", E = ">", j = [], h = at(), v = lt(), p = N(h, v);
      if (t.outputFormat === Z.html) {
        let x = "";
        p && Object.keys(p).length && (x = ","), j.push(_ + "script" + E), j.push("TockVueKit.renderChat("), j.push('document.getElementById("<TARGET_ELEMENT_ID>"),'), j.push('"<TOCK_BOT_API_URL>"' + x);
      }
      if (p) {
        const x = b ? 0 : 2;
        Object.keys(p).length && j.push(JSON.stringify(p, null, x));
      }
      return t.outputFormat === Z.html && (j.push(")"), j.push(_ + "/script" + E)), j.join(b ? "" : `
`);
    }
    function N(w, b) {
      const _ = D(w, b);
      if (_)
        return O(_), _;
    }
    function D(w, b, _ = {}) {
      if (jo(w)) {
        const E = Object.entries(w);
        for (let j = 0; j < E.length; j++) {
          const [h, v] = E[j], p = D(v, b[h]);
          typeof p == "object" && p.type === "leaf" ? _[h] = p.value : typeof p < "u" && Object.keys(p).length && (_[h] = p);
        }
        return _;
      } else if (!b || w !== b.default)
        return { type: "leaf", value: w };
    }
    function O(w) {
      if (jo(w)) {
        const b = Object.entries(w);
        for (let _ = 0; _ < b.length; _++) {
          const [E, j] = b[_];
          O(j) || delete w[E];
        }
        return w;
      } else
        return typeof w < "u";
    }
    function k(w) {
      bn(a(w));
    }
    function L(w) {
      const b = w === "css" ? "tvk-css.json" : "tvk-options.json", _ = new Blob([JSON.stringify(l(w))], {
        type: "text/plain;charset=utf-8"
      });
      ta.saveAs(_, b);
    }
    return (w, b) => {
      const _ = mt("tooltip");
      return y(), I("div", oa, [
        M("div", na, [
          M("div", null, [
            W((y(), I("div", ia, [
              W(M("input", {
                type: "radio",
                class: "form-check-input",
                name: "outputFormat",
                id: "outputFormatHtml",
                value: d(Z).html,
                "onUpdate:modelValue": b[0] || (b[0] = (E) => d(t).outputFormat = E),
                onChange: b[1] || (b[1] = (E) => i(d(Z).html))
              }, null, 40, sa), [
                [Kt, d(t).outputFormat]
              ]),
              ra
            ])), [
              [_, "Format output for html inclusion"]
            ]),
            W((y(), I("div", aa, [
              W(M("input", {
                type: "radio",
                class: "form-check-input",
                name: "outputFormat",
                id: "outputFormatJs",
                value: d(Z).json,
                "onUpdate:modelValue": b[2] || (b[2] = (E) => d(t).outputFormat = E),
                onChange: b[3] || (b[3] = (E) => i(d(Z).json))
              }, null, 40, la), [
                [Kt, d(t).outputFormat]
              ]),
              ca
            ])), [
              [_, "Format output for js usage"]
            ])
          ]),
          W((y(), I("div", ua, [
            W(M("input", {
              class: "form-check-input",
              type: "checkbox",
              role: "switch",
              id: "outputMinify",
              "onUpdate:modelValue": b[4] || (b[4] = (E) => d(t).outputMinified = E),
              onChange: b[5] || (b[5] = (E) => s(E.target.checked))
            }, null, 544), [
              [Do, d(t).outputMinified]
            ]),
            da
          ])), [
            [_, "Minify output code"]
          ])
        ]),
        M("div", pa, [
          !n.value && !o.value ? (y(), I("div", ha, " All settings set to default ")) : z("", !0),
          n.value ? (y(), I("div", ga, [
            d(t).outputFormat === d(Z).html ? (y(), I("label", fa, "Script:")) : z("", !0),
            d(t).outputFormat === d(Z).json ? (y(), I("label", ma, "Options:")) : z("", !0),
            M("div", _a, [
              M("pre", va, [
                M("code", null, V(n.value), 1)
              ]),
              M("div", ya, [
                W((y(), I("button", {
                  type: "button",
                  class: "btn btn-link btn-sm pe-0 pt-0",
                  onClick: b[6] || (b[6] = (E) => k(
                    "js"
                    /* js */
                  ))
                }, wa)), [
                  [_, "Copy js code"]
                ]),
                d(t).outputFormat === d(Z).json ? W((y(), I("button", {
                  key: 0,
                  type: "button",
                  class: "btn btn-link btn-sm pe-0",
                  onClick: b[7] || (b[7] = (E) => L(
                    "js"
                    /* js */
                  ))
                }, Ia)), [
                  [_, "Download js code"]
                ]) : z("", !0)
              ])
            ])
          ])) : z("", !0),
          o.value ? (y(), I("div", ka, [
            d(t).outputFormat === d(Z).html ? (y(), I("label", ja, "Style:")) : z("", !0),
            d(t).outputFormat === d(Z).json ? (y(), I("label", Na, "Css variables:")) : z("", !0),
            M("div", xa, [
              M("pre", Sa, [
                M("code", null, V(o.value), 1)
              ]),
              M("div", La, [
                W((y(), I("button", {
                  type: "button",
                  class: "btn btn-link btn-sm pe-0 pt-0",
                  onClick: b[8] || (b[8] = (E) => k(
                    "css"
                    /* css */
                  ))
                }, Da)), [
                  [_, "Copy css code"]
                ]),
                d(t).outputFormat === d(Z).json ? W((y(), I("button", {
                  key: 0,
                  type: "button",
                  class: "btn btn-link btn-sm pe-0",
                  onClick: b[9] || (b[9] = (E) => L(
                    "css"
                    /* css */
                  ))
                }, Oa)), [
                  [_, "Download css code"]
                ]) : z("", !0)
              ])
            ])
          ])) : z("", !0)
        ])
      ]);
    };
  }
}), Ea = { id: "tock-vue-kit-editor" }, za = { class: "panel-menu" }, Pa = /* @__PURE__ */ M("i", { class: "bi bi-layout-text-sidebar-reverse" }, null, -1), $a = [
  Pa
], Ya = /* @__PURE__ */ M("i", { class: "bi bi-gear" }, null, -1), Ga = [
  Ya
], Ra = /* @__PURE__ */ M("i", { class: "bi bi-file-word" }, null, -1), Wa = [
  Ra
], Za = /* @__PURE__ */ M("i", { class: "bi bi-filetype-css" }, null, -1), Va = [
  Za
], Ba = /* @__PURE__ */ M("i", { class: "bi bi-floppy" }, null, -1), Fa = [
  Ba
], Ua = { class: "panel-body flex-grow-1 position-relative" }, Ja = /* @__PURE__ */ K({
  __name: "editor",
  props: {
    height: { default: "100vh" }
  },
  setup(e) {
    Ae(ds()), Lo().appContext.app.use(Gi);
    const o = q();
    return $("100vh"), He(() => {
      o.refreshEditorPanels();
    }), (n, i) => {
      const s = mt("tooltip");
      return y(), I("div", Ea, [
        M("div", {
          class: "panel-wrapper d-flex",
          style: $e({ height: n.height })
        }, [
          M("div", za, [
            W((y(), I("div", {
              class: H(["panel-menu-entry", {
                active: d(o).editorPanel === d(F).templates
              }]),
              onClick: i[0] || (i[0] = (r) => d(o).setEditorPanel(d(F).templates))
            }, $a, 2)), [
              [s, { content: "Templates", placement: "right" }]
            ]),
            W((y(), I("div", {
              class: H(["panel-menu-entry", {
                active: d(o).editorPanel === d(F).preferences
              }]),
              onClick: i[1] || (i[1] = (r) => d(o).setEditorPanel(d(F).preferences))
            }, Ga, 2)), [
              [s, { content: "Preferences", placement: "right" }]
            ]),
            W((y(), I("div", {
              class: H(["panel-menu-entry", {
                active: d(o).editorPanel === d(F).wording
              }]),
              onClick: i[2] || (i[2] = (r) => d(o).setEditorPanel(d(F).wording))
            }, Wa, 2)), [
              [s, { content: "Wording", placement: "right" }]
            ]),
            W((y(), I("div", {
              class: H(["panel-menu-entry", {
                active: d(o).editorPanel === d(F).styling
              }]),
              onClick: i[3] || (i[3] = (r) => d(o).setEditorPanel(d(F).styling))
            }, Va, 2)), [
              [s, { content: "Styling", placement: "right" }]
            ]),
            W((y(), I("div", {
              class: H(["panel-menu-entry", {
                active: d(o).editorPanel === d(F).output
              }]),
              onClick: i[4] || (i[4] = (r) => d(o).setEditorPanel(d(F).output))
            }, Fa, 2)), [
              [s, { content: "Output", placement: "right" }]
            ])
          ]),
          M("div", Ua, [
            d(o).editorPanel === d(F).templates ? (y(), Q(Ds, { key: 0 })) : z("", !0),
            d(o).editorPanel === d(F).styling ? (y(), Q(nr, { key: 1 })) : z("", !0),
            d(o).editorPanel === d(F).preferences ? (y(), Q(Qr, {
              key: d(o).currentCustomizationName
            })) : z("", !0),
            d(o).editorPanel === d(F).wording ? (y(), Q(ea, {
              key: d(o).currentCustomizationName
            })) : z("", !0),
            d(o).editorPanel === d(F).output ? (y(), Q(Aa, {
              key: d(o).currentCustomizationName
            })) : z("", !0)
          ])
        ], 4)
      ]);
    };
  }
});
export {
  Ja as TvkEditor
};
