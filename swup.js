!(function (t, e) {
  "object" == typeof exports && "undefined" != typeof module
    ? (module.exports = e())
    : "function" == typeof define && define.amd
    ? define(e)
    : ((t || self).Swup = e());
})(this, function () {
  const t = new WeakMap();
  function e(e, n, o, i) {
    if (!e && !t.has(n)) return !1;
    const r = t.get(n) ?? new WeakMap();
    t.set(n, r);
    const s = r.get(o) ?? new Set();
    r.set(o, s);
    const a = s.has(i);
    return e ? s.add(i) : s.delete(i), a && e;
  }
  const n = (t, e) =>
      String(t)
        .toLowerCase()
        .replace(/[\s/_.]+/g, "-")
        .replace(/[^\w-]+/g, "")
        .replace(/--+/g, "-")
        .replace(/^-+|-+$/g, "") ||
      e ||
      "",
    o = function (t) {
      let { hash: e } = void 0 === t ? {} : t;
      return (
        window.location.pathname +
        window.location.search +
        (e ? window.location.hash : "")
      );
    },
    i = function (t, e) {
      void 0 === t && (t = null),
        void 0 === e && (e = {}),
        (t = t || o({ hash: !0 }));
      const n = {
        ...(window.history.state || {}),
        url: t,
        random: Math.random(),
        source: "swup",
        ...e,
      };
      window.history.replaceState(n, "", t);
    },
    r = (t, n, o, i) => {
      const r = new AbortController();
      return (
        (function (t, n, o, i = {}) {
          const { signal: r, base: s = document } = i;
          if (r?.aborted) return;
          const { once: a, ...c } = i,
            l = s instanceof Document ? s.documentElement : s,
            h = Boolean("object" == typeof i ? i.capture : i),
            u = (i) => {
              const r = (function (t, e) {
                let n = t.target;
                if (
                  (n instanceof Text && (n = n.parentElement),
                  n instanceof Element && t.currentTarget instanceof Element)
                ) {
                  const o = n.closest(e);
                  if (o && t.currentTarget.contains(o)) return o;
                }
              })(i, t);
              if (r) {
                const t = Object.assign(i, { delegateTarget: r });
                o.call(l, t),
                  a && (l.removeEventListener(n, u, c), e(!1, l, o, d));
              }
            },
            d = JSON.stringify({ selector: t, type: n, capture: h });
          e(!0, l, o, d) || l.addEventListener(n, u, c),
            r?.addEventListener("abort", () => {
              e(!1, l, o, d);
            });
        })(t, n, o, (i = { ...i, signal: r.signal })),
        { destroy: () => r.abort() }
      );
    };
  class s extends URL {
    constructor(t, e) {
      void 0 === e && (e = document.baseURI),
        super(t.toString(), e),
        Object.setPrototypeOf(this, s.prototype);
    }
    get url() {
      return this.pathname + this.search;
    }
    static fromElement(t) {
      const e = t.getAttribute("href") || t.getAttribute("xlink:href") || "";
      return new s(e);
    }
    static fromUrl(t) {
      return new s(t);
    }
  }
  const a = function (t, e) {
    void 0 === e && (e = {});
    try {
      const o = this;
      function n(n) {
        const { status: r, url: a } = u;
        return Promise.resolve(u.text()).then(function (n) {
          if (500 === r)
            throw (
              (o.hooks.call("fetch:error", i, {
                status: r,
                response: u,
                url: a,
              }),
              new c(`Server error: ${a}`, { status: r, url: a }))
            );
          if (!n) throw new c(`Empty response: ${a}`, { status: r, url: a });
          const { url: l } = s.fromUrl(a),
            h = { url: l, html: n };
          return (
            !i.cache.write ||
              (e.method && "GET" !== e.method) ||
              t !== l ||
              o.cache.set(h.url, h),
            h
          );
        });
      }
      t = s.fromUrl(t).url;
      const { visit: i = o.visit } = e,
        r = { ...o.options.requestHeaders, ...e.headers },
        a = e.timeout ?? o.options.timeout,
        l = new AbortController(),
        { signal: h } = l;
      e = { ...e, headers: r, signal: h };
      let u,
        d = !1,
        f = null;
      a &&
        a > 0 &&
        (f = setTimeout(() => {
          (d = !0), l.abort("timeout");
        }, a));
      const m = (function (n, r) {
        try {
          var s = Promise.resolve(
            o.hooks.call("fetch:request", i, { url: t, options: e }, (t, e) => {
              let { url: n, options: o } = e;
              return fetch(n, o);
            })
          ).then(function (t) {
            (u = t), f && clearTimeout(f);
          });
        } catch (t) {
          return r(t);
        }
        return s && s.then ? s.then(void 0, r) : s;
      })(0, function (e) {
        if (d)
          throw (
            (o.hooks.call("fetch:timeout", i, { url: t }),
            new c(`Request timed out: ${t}`, { url: t, timedOut: d }))
          );
        if ("AbortError" === e?.name || h.aborted)
          throw new c(`Request aborted: ${t}`, { url: t, aborted: !0 });
        throw e;
      });
      return Promise.resolve(m && m.then ? m.then(n) : n());
    } catch (p) {
      return Promise.reject(p);
    }
  };
  class c extends Error {
    constructor(t, e) {
      super(t),
        (this.url = void 0),
        (this.status = void 0),
        (this.aborted = void 0),
        (this.timedOut = void 0),
        (this.name = "FetchError"),
        (this.url = e.url),
        (this.status = e.status),
        (this.aborted = e.aborted || !1),
        (this.timedOut = e.timedOut || !1);
    }
  }
  class l {
    constructor(t) {
      (this.swup = void 0), (this.pages = new Map()), (this.swup = t);
    }
    get size() {
      return this.pages.size;
    }
    get all() {
      const t = new Map();
      return (
        this.pages.forEach((e, n) => {
          t.set(n, { ...e });
        }),
        t
      );
    }
    has(t) {
      return this.pages.has(this.resolve(t));
    }
    get(t) {
      const e = this.pages.get(this.resolve(t));
      return e ? { ...e } : e;
    }
    set(t, e) {
      (t = this.resolve(t)),
        (e = { ...e, url: t }),
        this.pages.set(t, e),
        this.swup.hooks.callSync("cache:set", void 0, { page: e });
    }
    update(t, e) {
      t = this.resolve(t);
      const n = { ...this.get(t), ...e, url: t };
      this.pages.set(t, n);
    }
    delete(t) {
      this.pages.delete(this.resolve(t));
    }
    clear() {
      this.pages.clear(),
        this.swup.hooks.callSync("cache:clear", void 0, void 0);
    }
    prune(t) {
      this.pages.forEach((e, n) => {
        t(n, e) && this.delete(n);
      });
    }
    resolve(t) {
      const { url: e } = s.fromUrl(t);
      return this.swup.resolveUrl(e);
    }
  }
  const h = function (t, e) {
      return void 0 === e && (e = document), e.querySelector(t);
    },
    u = function (t, e) {
      return void 0 === e && (e = document), Array.from(e.querySelectorAll(t));
    },
    d = () =>
      new Promise((t) => {
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            t();
          });
        });
      });
  function f(t) {
    return (
      !!t &&
      ("object" == typeof t || "function" == typeof t) &&
      "function" == typeof t.then
    );
  }
  function m(t, e) {
    const n = t?.closest(`[${e}]`);
    return n?.hasAttribute(e) ? n?.getAttribute(e) || !0 : void 0;
  }
  class p {
    constructor(t) {
      (this.swup = void 0),
        (this.swupClasses = [
          "to-",
          "is-changing",
          "is-rendering",
          "is-popstate",
          "is-animating",
          "is-leaving",
        ]),
        (this.swup = t);
    }
    get selectors() {
      const { scope: t } = this.swup.visit.animation;
      return "containers" === t
        ? this.swup.visit.containers
        : "html" === t
        ? ["html"]
        : Array.isArray(t)
        ? t
        : [];
    }
    get selector() {
      return this.selectors.join(",");
    }
    get targets() {
      return this.selector.trim() ? u(this.selector) : [];
    }
    add() {
      this.targets.forEach((t) => t.classList.add(...[].slice.call(arguments)));
    }
    remove() {
      this.targets.forEach((t) =>
        t.classList.remove(...[].slice.call(arguments))
      );
    }
    clear() {
      this.targets.forEach((t) => {
        const e = t.className.split(" ").filter((t) => this.isSwupClass(t));
        t.classList.remove(...e);
      });
    }
    isSwupClass(t) {
      return this.swupClasses.some((e) => t.startsWith(e));
    }
  }
  class v {
    constructor(t, e) {
      (this.id = void 0),
        (this.state = void 0),
        (this.from = void 0),
        (this.to = void 0),
        (this.containers = void 0),
        (this.animation = void 0),
        (this.trigger = void 0),
        (this.cache = void 0),
        (this.history = void 0),
        (this.scroll = void 0);
      const { to: n, from: o, hash: i, el: r, event: s } = e;
      (this.id = Math.random()),
        (this.state = 1),
        (this.from = { url: o ?? t.location.url, hash: t.location.hash }),
        (this.to = { url: n, hash: i }),
        (this.containers = t.options.containers),
        (this.animation = {
          animate: !0,
          wait: !1,
          name: void 0,
          native: t.options.native,
          scope: t.options.animationScope,
          selector: t.options.animationSelector,
        }),
        (this.trigger = { el: r, event: s }),
        (this.cache = { read: t.options.cache, write: t.options.cache }),
        (this.history = { action: "push", popstate: !1, direction: void 0 }),
        (this.scroll = { reset: !0, target: void 0 });
    }
    advance(t) {
      this.state < t && (this.state = t);
    }
    abort() {
      this.state = 8;
    }
    get done() {
      return this.state >= 7;
    }
  }
  function g(t) {
    return new v(this, t);
  }
  const w =
    "undefined" != typeof Symbol
      ? Symbol.iterator || (Symbol.iterator = Symbol("Symbol.iterator"))
      : "@@iterator";
  function y(t, e, n) {
    if (!t.s) {
      if (n instanceof k) {
        if (!n.s) return void (n.o = y.bind(null, t, e));
        1 & e && (e = n.s), (n = n.v);
      }
      if (n && n.then)
        return void n.then(y.bind(null, t, e), y.bind(null, t, 2));
      (t.s = e), (t.v = n);
      const o = t.o;
      o && o(t);
    }
  }
  const k = /*#__PURE__*/ (function () {
    function t() {}
    return (
      (t.prototype.then = function (e, n) {
        const o = new t(),
          i = this.s;
        if (i) {
          const t = 1 & i ? e : n;
          if (t) {
            try {
              y(o, 1, t(this.v));
            } catch (t) {
              y(o, 2, t);
            }
            return o;
          }
          return this;
        }
        return (
          (this.o = function (t) {
            try {
              const i = t.v;
              1 & t.s ? y(o, 1, e ? e(i) : i) : n ? y(o, 1, n(i)) : y(o, 2, i);
            } catch (t) {
              y(o, 2, t);
            }
          }),
          o
        );
      }),
      t
    );
  })();
  function P(t) {
    return t instanceof k && 1 & t.s;
  }
  class b {
    constructor(t) {
      (this.swup = void 0),
        (this.registry = new Map()),
        (this.hooks = [
          "animation:out:start",
          "animation:out:await",
          "animation:out:end",
          "animation:in:start",
          "animation:in:await",
          "animation:in:end",
          "animation:skip",
          "cache:clear",
          "cache:set",
          "content:replace",
          "content:scroll",
          "enable",
          "disable",
          "fetch:request",
          "fetch:error",
          "fetch:timeout",
          "history:popstate",
          "link:click",
          "link:self",
          "link:anchor",
          "link:newtab",
          "page:load",
          "page:view",
          "scroll:top",
          "scroll:anchor",
          "visit:start",
          "visit:transition",
          "visit:abort",
          "visit:end",
        ]),
        (this.swup = t),
        this.init();
    }
    init() {
      this.hooks.forEach((t) => this.create(t));
    }
    create(t) {
      this.registry.has(t) || this.registry.set(t, new Map());
    }
    exists(t) {
      return this.registry.has(t);
    }
    get(t) {
      const e = this.registry.get(t);
      if (e) return e;
      console.error(`Unknown hook '${t}'`);
    }
    clear() {
      this.registry.forEach((t) => t.clear());
    }
    on(t, e, n) {
      void 0 === n && (n = {});
      const o = this.get(t);
      if (!o) return console.warn(`Hook '${t}' not found.`), () => {};
      const i = o.size + 1,
        r = { ...n, id: i, hook: t, handler: e };
      return o.set(e, r), () => this.off(t, e);
    }
    before(t, e, n) {
      return void 0 === n && (n = {}), this.on(t, e, { ...n, before: !0 });
    }
    replace(t, e, n) {
      return void 0 === n && (n = {}), this.on(t, e, { ...n, replace: !0 });
    }
    once(t, e, n) {
      return void 0 === n && (n = {}), this.on(t, e, { ...n, once: !0 });
    }
    off(t, e) {
      const n = this.get(t);
      n && e
        ? n.delete(e) || console.warn(`Handler for hook '${t}' not found.`)
        : n && n.clear();
    }
    call(t, e, n, o) {
      try {
        const i = this,
          [r, s, a] = i.parseCallArgs(t, e, n, o),
          { before: c, handler: l, after: h } = i.getHandlers(t, a);
        return Promise.resolve(i.run(c, r, s)).then(function () {
          return Promise.resolve(i.run(l, r, s, !0)).then(function (e) {
            let [n] = e;
            return Promise.resolve(i.run(h, r, s)).then(function () {
              return i.dispatchDomEvent(t, r, s), n;
            });
          });
        });
      } catch (t) {
        return Promise.reject(t);
      }
    }
    callSync(t, e, n, o) {
      const [i, r, s] = this.parseCallArgs(t, e, n, o),
        { before: a, handler: c, after: l } = this.getHandlers(t, s);
      this.runSync(a, i, r);
      const [h] = this.runSync(c, i, r, !0);
      return this.runSync(l, i, r), this.dispatchDomEvent(t, i, r), h;
    }
    parseCallArgs(t, e, n, o) {
      return e instanceof v || ("object" != typeof e && "function" != typeof n)
        ? [e, n, o]
        : [void 0, e, n];
    }
    run(t, e, n, o) {
      void 0 === o && (o = !1);
      try {
        let i;
        const r = this;
        void 0 === e && (e = r.swup.visit);
        const s = [],
          a = (function (t, e, n) {
            if ("function" == typeof t[w]) {
              var o,
                i,
                r,
                s = t[w]();
              if (
                ((function t(a) {
                  try {
                    for (; !((o = s.next()).done || (n && n())); )
                      if ((a = e(o.value)) && a.then) {
                        if (!P(a))
                          return void a.then(
                            t,
                            r || (r = y.bind(null, (i = new k()), 2))
                          );
                        a = a.v;
                      }
                    i ? y(i, 1, a) : (i = a);
                  } catch (t) {
                    y(i || (i = new k()), 2, t);
                  }
                })(),
                s.return)
              ) {
                var a = function (t) {
                  try {
                    o.done || s.return();
                  } catch (t) {}
                  return t;
                };
                if (i && i.then)
                  return i.then(a, function (t) {
                    throw a(t);
                  });
                a();
              }
              return i;
            }
            if (!("length" in t)) throw new TypeError("Object is not iterable");
            for (var c = [], l = 0; l < t.length; l++) c.push(t[l]);
            return (function (t, e, n) {
              var o,
                i,
                r = -1;
              return (
                (function s(a) {
                  try {
                    for (; ++r < t.length && (!n || !n()); )
                      if ((a = e(r)) && a.then) {
                        if (!P(a))
                          return void a.then(
                            s,
                            i || (i = y.bind(null, (o = new k()), 2))
                          );
                        a = a.v;
                      }
                    o ? y(o, 1, a) : (o = a);
                  } catch (t) {
                    y(o || (o = new k()), 2, t);
                  }
                })(),
                o
              );
            })(
              c,
              function (t) {
                return e(c[t]);
              },
              n
            );
          })(
            t,
            function (t) {
              let { hook: i, handler: a, defaultHandler: c, once: l } = t;
              if (!e?.done)
                return (
                  l && r.off(i, a),
                  (function (t, o) {
                    try {
                      var i = Promise.resolve(
                        (function (t, e) {
                          return (
                            void 0 === e && (e = []),
                            new Promise((n, o) => {
                              const i = t(...e);
                              f(i) ? i.then(n, o) : n(i);
                            })
                          );
                        })(a, [e, n, c])
                      ).then(function (t) {
                        s.push(t);
                      });
                    } catch (t) {
                      return o(t);
                    }
                    return i && i.then ? i.then(void 0, o) : i;
                  })(0, function (t) {
                    if (o) throw t;
                    console.error(`Error in hook '${i}':`, t);
                  })
                );
            },
            function () {
              return i;
            }
          );
        return Promise.resolve(
          a && a.then
            ? a.then(function (t) {
                return i ? t : s;
              })
            : i
            ? a
            : s
        );
      } catch (t) {
        return Promise.reject(t);
      }
    }
    runSync(t, e, n, o) {
      void 0 === e && (e = this.swup.visit), void 0 === o && (o = !1);
      const i = [];
      for (const { hook: r, handler: s, defaultHandler: a, once: c } of t)
        if (!e?.done) {
          c && this.off(r, s);
          try {
            const t = s(e, n, a);
            i.push(t),
              f(t) &&
                console.warn(
                  `Swup will not await Promises in handler for synchronous hook '${r}'.`
                );
          } catch (t) {
            if (o) throw t;
            console.error(`Error in hook '${r}':`, t);
          }
        }
      return i;
    }
    getHandlers(t, e) {
      const n = this.get(t);
      if (!n)
        return { found: !1, before: [], handler: [], after: [], replaced: !1 };
      const o = Array.from(n.values()),
        i = this.sortRegistrations,
        r = o
          .filter((t) => {
            let { before: e, replace: n } = t;
            return e && !n;
          })
          .sort(i),
        s = o
          .filter((t) => {
            let { replace: e } = t;
            return e;
          })
          .filter((t) => !0)
          .sort(i),
        a = o
          .filter((t) => {
            let { before: e, replace: n } = t;
            return !e && !n;
          })
          .sort(i),
        c = s.length > 0;
      let l = [];
      if (e && ((l = [{ id: 0, hook: t, handler: e }]), c)) {
        const n = s.length - 1,
          o = (t) => {
            const n = s[t - 1];
            return n ? (e, i) => n.handler(e, i, o(t - 1)) : e;
          };
        l = [{ id: 0, hook: t, handler: s[n].handler, defaultHandler: o(n) }];
      }
      return { found: !0, before: r, handler: l, after: a, replaced: c };
    }
    sortRegistrations(t, e) {
      return (t.priority ?? 0) - (e.priority ?? 0) || t.id - e.id || 0;
    }
    dispatchDomEvent(t, e, n) {
      if (e?.done) return;
      const o = { hook: t, args: n, visit: e || this.swup.visit };
      document.dispatchEvent(
        new CustomEvent("swup:any", { detail: o, bubbles: !0 })
      ),
        document.dispatchEvent(
          new CustomEvent(`swup:${t}`, { detail: o, bubbles: !0 })
        );
    }
  }
  const S = (t) => {
      if ((t && "#" === t.charAt(0) && (t = t.substring(1)), !t)) return null;
      const e = decodeURIComponent(t);
      let n =
        document.getElementById(t) ||
        document.getElementById(e) ||
        h(`a[name='${CSS.escape(t)}']`) ||
        h(`a[name='${CSS.escape(e)}']`);
      return n || "top" !== t || (n = document.body), n;
    },
    E = function (t) {
      let { selector: e, elements: n } = t;
      try {
        if (!1 === e && !n) return Promise.resolve();
        let t = [];
        if (n) t = Array.from(n);
        else if (e && ((t = u(e, document.body)), !t.length))
          return (
            console.warn(
              `[swup] No elements found matching animationSelector \`${e}\``
            ),
            Promise.resolve()
          );
        const o = t.map((t) =>
          (function (t) {
            const {
              type: e,
              timeout: n,
              propCount: o,
            } = (function (t) {
              const e = window.getComputedStyle(t),
                n = x(e, `${C}Delay`),
                o = x(e, `${C}Duration`),
                i = $(n, o),
                r = x(e, `${U}Delay`),
                s = x(e, `${U}Duration`),
                a = $(r, s),
                c = Math.max(i, a),
                l = c > 0 ? (i > a ? C : U) : null;
              return {
                type: l,
                timeout: c,
                propCount: l ? (l === C ? o.length : s.length) : 0,
              };
            })(t);
            return (
              !(!e || !n) &&
              new Promise((i) => {
                const r = `${e}end`,
                  s = performance.now();
                let a = 0;
                const c = () => {
                    t.removeEventListener(r, l), i();
                  },
                  l = (e) => {
                    e.target === t &&
                      ((performance.now() - s) / 1e3 < e.elapsedTime ||
                        (++a >= o && c()));
                  };
                setTimeout(() => {
                  a < o && c();
                }, n + 1),
                  t.addEventListener(r, l);
              })
            );
          })(t)
        );
        return o.filter(Boolean).length > 0
          ? Promise.resolve(Promise.all(o)).then(function () {})
          : (e &&
              console.warn(
                `[swup] No CSS animation duration defined on elements matching \`${e}\``
              ),
            Promise.resolve());
      } catch (t) {
        return Promise.reject(t);
      }
    },
    C = "transition",
    U = "animation";
  function x(t, e) {
    return (t[e] || "").split(", ");
  }
  function $(t, e) {
    for (; t.length < e.length; ) t = t.concat(t);
    return Math.max(...e.map((e, n) => A(e) + A(t[n])));
  }
  function A(t) {
    return 1e3 * parseFloat(t);
  }
  const H = function (t, e) {
    void 0 === e && (e = {});
    try {
      let a;
      const c = this;
      function r(r) {
        if (a) return r;
        (c.navigating = !0), (c.visit = t);
        const { el: l } = t.trigger;
        (e.referrer = e.referrer || c.location.url),
          !1 === e.animate && (t.animation.animate = !1),
          t.animation.animate || c.classes.clear();
        const h = e.history || m(l, "data-swup-history");
        "string" == typeof h &&
          ["push", "replace"].includes(h) &&
          (t.history.action = h);
        const u = e.animation || m(l, "data-swup-animation");
        return (
          "string" == typeof u && (t.animation.name = u),
          "object" == typeof e.cache
            ? ((t.cache.read = e.cache.read ?? t.cache.read),
              (t.cache.write = e.cache.write ?? t.cache.write))
            : void 0 !== e.cache &&
              (t.cache = { read: !!e.cache, write: !!e.cache }),
          delete e.cache,
          (function (r, a) {
            try {
              var l = (function (r, a) {
                try {
                  var l = Promise.resolve(
                    c.hooks.call("visit:start", t, void 0)
                  ).then(function () {
                    function r() {
                      if (!t.done)
                        return Promise.resolve(
                          c.hooks.call(
                            "visit:transition",
                            t,
                            void 0,
                            function () {
                              try {
                                let n;
                                function e(e) {
                                  return n
                                    ? e
                                    : (t.advance(4),
                                      Promise.resolve(c.animatePageOut(t)).then(
                                        function () {
                                          function e() {
                                            return Promise.resolve(
                                              c.animatePageIn(t)
                                            ).then(function () {});
                                          }
                                          const n = (function () {
                                            if (
                                              t.animation.native &&
                                              document.startViewTransition
                                            )
                                              return Promise.resolve(
                                                document.startViewTransition(
                                                  function () {
                                                    try {
                                                      const e = c.renderPage;
                                                      return Promise.resolve(
                                                        a
                                                      ).then(function (n) {
                                                        return Promise.resolve(
                                                          e.call(c, t, n)
                                                        );
                                                      });
                                                    } catch (t) {
                                                      return Promise.reject(t);
                                                    }
                                                  }
                                                ).finished
                                              ).then(function () {});
                                            {
                                              const e = c.renderPage;
                                              return Promise.resolve(a).then(
                                                function (n) {
                                                  return Promise.resolve(
                                                    e.call(c, t, n)
                                                  ).then(function () {});
                                                }
                                              );
                                            }
                                          })();
                                          return n && n.then ? n.then(e) : e();
                                        }
                                      ));
                                }
                                const o = (function () {
                                  if (!t.animation.animate)
                                    return Promise.resolve(
                                      c.hooks.call("animation:skip", void 0)
                                    ).then(function () {
                                      const e = c.renderPage;
                                      return Promise.resolve(a).then(function (
                                        o
                                      ) {
                                        return Promise.resolve(
                                          e.call(c, t, o)
                                        ).then(function () {
                                          n = 1;
                                        });
                                      });
                                    });
                                })();
                                return Promise.resolve(
                                  o && o.then ? o.then(e) : e(o)
                                );
                              } catch (i) {
                                return Promise.reject(i);
                              }
                            }
                          )
                        ).then(function () {
                          if (!t.done)
                            return Promise.resolve(
                              c.hooks.call("visit:end", t, void 0, () =>
                                c.classes.clear()
                              )
                            ).then(function () {
                              (t.state = 7),
                                (c.navigating = !1),
                                c.onVisitEnd &&
                                  (c.onVisitEnd(), (c.onVisitEnd = void 0));
                            });
                        });
                    }
                    t.state = 3;
                    const a = c.hooks.call(
                      "page:load",
                      t,
                      { options: e },
                      function (t, e) {
                        try {
                          function n(t) {
                            return (e.page = t), (e.cache = !!o), e.page;
                          }
                          let o;
                          return (
                            t.cache.read && (o = c.cache.get(t.to.url)),
                            Promise.resolve(
                              o
                                ? n(o)
                                : Promise.resolve(
                                    c.fetchPage(t.to.url, e.options)
                                  ).then(n)
                            )
                          );
                        } catch (i) {
                          return Promise.reject(i);
                        }
                      }
                    );
                    a.then((e) => {
                      let { html: n } = e;
                      t.advance(5),
                        (t.to.html = n),
                        (t.to.document = new DOMParser().parseFromString(
                          n,
                          "text/html"
                        ));
                    });
                    const l = t.to.url + t.to.hash;
                    t.history.popstate ||
                      ("replace" === t.history.action ||
                      t.to.url === c.location.url
                        ? i(l)
                        : (c.currentHistoryIndex++,
                          (function (t, e) {
                            void 0 === e && (e = {});
                            const n = {
                              url: (t = t || o({ hash: !0 })),
                              random: Math.random(),
                              source: "swup",
                              ...e,
                            };
                            window.history.pushState(n, "", t);
                          })(l, { index: c.currentHistoryIndex }))),
                      (c.location = s.fromUrl(l)),
                      t.history.popstate && c.classes.add("is-popstate"),
                      t.animation.name &&
                        c.classes.add(`to-${n(t.animation.name)}`);
                    const h = (function () {
                      if (t.animation.wait)
                        return Promise.resolve(a).then(function () {});
                    })();
                    return h && h.then ? h.then(r) : r();
                  });
                } catch (t) {
                  return a(t);
                }
                return l && l.then ? l.then(void 0, a) : l;
              })(0, function (e) {
                e && !e?.aborted
                  ? ((t.state = 9),
                    console.error(e),
                    (c.options.skipPopStateHandling = () => (
                      window.location.assign(t.to.url + t.to.hash), !0
                    )),
                    window.history.back())
                  : (t.state = 8);
              });
            } catch (t) {
              return a(!0, t);
            }
            return l && l.then
              ? l.then(a.bind(null, !1), a.bind(null, !0))
              : a(!1, l);
          })(0, function (e, n) {
            if ((delete t.to.document, e)) throw n;
            return n;
          })
        );
      }
      const l = (function () {
        if (c.navigating)
          return (function () {
            if (!(c.visit.state >= 6))
              return Promise.resolve(
                c.hooks.call("visit:abort", c.visit, void 0)
              ).then(function () {
                delete c.visit.to.document, (c.visit.state = 8);
              });
            (t.state = 2),
              (c.onVisitEnd = () => c.performNavigation(t, e)),
              (a = 1);
          })();
      })();
      return Promise.resolve(l && l.then ? l.then(r) : r(l));
    } catch (h) {
      return Promise.reject(h);
    }
  };
  function T(t, e, n) {
    if (
      (void 0 === e && (e = {}), void 0 === n && (n = {}), "string" != typeof t)
    )
      throw new Error("swup.navigate() requires a URL parameter");
    if (this.shouldIgnoreVisit(t, { el: n.el, event: n.event }))
      return void window.location.assign(t);
    const { url: o, hash: i } = s.fromUrl(t),
      r = this.createVisit({ ...n, to: o, hash: i });
    this.performNavigation(r, e);
  }
  const j = function (t) {
      try {
        const e = this;
        return Promise.resolve(
          e.hooks.call("animation:out:start", t, void 0, () => {
            e.classes.add("is-changing", "is-animating", "is-leaving");
          })
        ).then(function () {
          return Promise.resolve(
            e.hooks.call("animation:out:await", t, { skip: !1 }, (t, n) => {
              let { skip: o } = n;
              if (!o)
                return e.awaitAnimations({ selector: t.animation.selector });
            })
          ).then(function () {
            return Promise.resolve(
              e.hooks.call("animation:out:end", t, void 0)
            ).then(function () {});
          });
        });
      } catch (t) {
        return Promise.reject(t);
      }
    },
    L = function (t) {
      const e = t.to.document;
      if (!e) return !1;
      const n = e.querySelector("title")?.innerText || "";
      document.title = n;
      const o = u('[data-swup-persist]:not([data-swup-persist=""])'),
        i = t.containers
          .map((t) => {
            const n = document.querySelector(t),
              o = e.querySelector(t);
            return n && o
              ? (n.replaceWith(o.cloneNode(!0)), !0)
              : (n ||
                  console.warn(
                    `[swup] Container missing in current document: ${t}`
                  ),
                o ||
                  console.warn(
                    `[swup] Container missing in incoming document: ${t}`
                  ),
                !1);
          })
          .filter(Boolean);
      return (
        o.forEach((t) => {
          const e = t.getAttribute("data-swup-persist"),
            n = h(`[data-swup-persist="${e}"]`);
          n && n !== t && n.replaceWith(t);
        }),
        i.length === t.containers.length
      );
    },
    V = function (t) {
      const e = { behavior: "auto" },
        { target: n, reset: o } = t.scroll,
        i = n ?? t.to.hash;
      let r = !1;
      return (
        i &&
          (r = this.hooks.callSync(
            "scroll:anchor",
            t,
            { hash: i, options: e },
            (t, e) => {
              let { hash: n, options: o } = e;
              const i = this.getAnchorElement(n);
              return i && i.scrollIntoView(o), !!i;
            }
          )),
        o &&
          !r &&
          (r = this.hooks.callSync("scroll:top", t, { options: e }, (t, e) => {
            let { options: n } = e;
            return window.scrollTo({ top: 0, left: 0, ...n }), !0;
          })),
        r
      );
    },
    I = function (t) {
      try {
        const e = this;
        if (t.done) return Promise.resolve();
        const n = e.hooks.call(
          "animation:in:await",
          t,
          { skip: !1 },
          (t, n) => {
            let { skip: o } = n;
            if (!o)
              return e.awaitAnimations({ selector: t.animation.selector });
          }
        );
        return Promise.resolve(d()).then(function () {
          return Promise.resolve(
            e.hooks.call("animation:in:start", t, void 0, () => {
              e.classes.remove("is-animating");
            })
          ).then(function () {
            return Promise.resolve(n).then(function () {
              return Promise.resolve(
                e.hooks.call("animation:in:end", t, void 0)
              ).then(function () {});
            });
          });
        });
      } catch (t) {
        return Promise.reject(t);
      }
    },
    q = function (t, e) {
      try {
        const r = this;
        if (t.done) return Promise.resolve();
        t.advance(6);
        const { url: a } = e;
        return (
          r.isSameResolvedUrl(o(), a) ||
            (i(a),
            (r.location = s.fromUrl(a)),
            (t.to.url = r.location.url),
            (t.to.hash = r.location.hash)),
          Promise.resolve(
            r.hooks.call("content:replace", t, { page: e }, (t, e) => {
              if (
                (r.classes.remove("is-leaving"),
                t.animation.animate && r.classes.add("is-rendering"),
                !r.replaceContent(t))
              )
                throw new Error("[swup] Container mismatch, aborting");
              t.animation.animate &&
                (r.classes.add("is-changing", "is-animating", "is-rendering"),
                t.animation.name && r.classes.add(`to-${n(t.animation.name)}`));
            })
          ).then(function () {
            return Promise.resolve(
              r.hooks.call("content:scroll", t, void 0, () =>
                r.scrollToContent(t)
              )
            ).then(function () {
              return Promise.resolve(
                r.hooks.call("page:view", t, {
                  url: r.location.url,
                  title: document.title,
                })
              ).then(function () {});
            });
          })
        );
      } catch (t) {
        return Promise.reject(t);
      }
    },
    R = function (t) {
      var e;
      if (((e = t), Boolean(e?.isSwupPlugin))) {
        if (((t.swup = this), !t._checkRequirements || t._checkRequirements()))
          return (
            t._beforeMount && t._beforeMount(),
            t.mount(),
            this.plugins.push(t),
            this.plugins
          );
      } else console.error("Not a swup plugin instance", t);
    };
  function N(t) {
    const e = this.findPlugin(t);
    if (e)
      return (
        e.unmount(),
        e._afterUnmount && e._afterUnmount(),
        (this.plugins = this.plugins.filter((t) => t !== e)),
        this.plugins
      );
    console.error("No such plugin", e);
  }
  function D(t) {
    return this.plugins.find(
      (e) => e === t || e.name === t || e.name === `Swup${String(t)}`
    );
  }
  function M(t) {
    if ("function" != typeof this.options.resolveUrl)
      return (
        console.warn("[swup] options.resolveUrl expects a callback function."),
        t
      );
    const e = this.options.resolveUrl(t);
    return e && "string" == typeof e
      ? e.startsWith("//") || e.startsWith("http")
        ? (console.warn(
            "[swup] options.resolveUrl needs to return a relative url"
          ),
          t)
        : e
      : (console.warn("[swup] options.resolveUrl needs to return a url"), t);
  }
  function O(t, e) {
    return this.resolveUrl(t) === this.resolveUrl(e);
  }
  const W = {
    animateHistoryBrowsing: !1,
    animationSelector: '[class*="transition-"]',
    animationScope: "html",
    cache: !0,
    containers: ["#swup"],
    ignoreVisit: function (t, e) {
      let { el: n } = void 0 === e ? {} : e;
      return !!n?.closest("[data-no-swup]");
    },
    linkSelector: "a[href]",
    linkToSelf: "scroll",
    native: !1,
    plugins: [],
    resolveUrl: (t) => t,
    requestHeaders: {
      "X-Requested-With": "swup",
      Accept: "text/html, application/xhtml+xml",
    },
    skipPopStateHandling: (t) => "swup" !== t.state?.source,
    timeout: 0,
  };
  return class {
    get currentPageUrl() {
      return this.location.url;
    }
    constructor(t) {
      void 0 === t && (t = {}),
        (this.version = "4.7.0"),
        (this.options = void 0),
        (this.defaults = W),
        (this.plugins = []),
        (this.visit = void 0),
        (this.cache = void 0),
        (this.hooks = void 0),
        (this.classes = void 0),
        (this.location = s.fromUrl(window.location.href)),
        (this.currentHistoryIndex = void 0),
        (this.clickDelegate = void 0),
        (this.navigating = !1),
        (this.onVisitEnd = void 0),
        (this.use = R),
        (this.unuse = N),
        (this.findPlugin = D),
        (this.log = () => {}),
        (this.navigate = T),
        (this.performNavigation = H),
        (this.createVisit = g),
        (this.delegateEvent = r),
        (this.fetchPage = a),
        (this.awaitAnimations = E),
        (this.renderPage = q),
        (this.replaceContent = L),
        (this.animatePageIn = I),
        (this.animatePageOut = j),
        (this.scrollToContent = V),
        (this.getAnchorElement = S),
        (this.getCurrentUrl = o),
        (this.resolveUrl = M),
        (this.isSameResolvedUrl = O),
        (this.options = { ...this.defaults, ...t }),
        (this.handleLinkClick = this.handleLinkClick.bind(this)),
        (this.handlePopState = this.handlePopState.bind(this)),
        (this.cache = new l(this)),
        (this.classes = new p(this)),
        (this.hooks = new b(this)),
        (this.visit = this.createVisit({ to: "" })),
        (this.currentHistoryIndex = window.history.state?.index ?? 1),
        this.enable();
    }
    enable() {
      try {
        const t = this,
          { linkSelector: e } = t.options;
        return (
          (t.clickDelegate = t.delegateEvent(e, "click", t.handleLinkClick)),
          window.addEventListener("popstate", t.handlePopState),
          t.options.animateHistoryBrowsing &&
            (window.history.scrollRestoration = "manual"),
          (t.options.native =
            t.options.native && !!document.startViewTransition),
          t.options.plugins.forEach((e) => t.use(e)),
          "swup" !== window.history.state?.source &&
            i(null, { index: t.currentHistoryIndex }),
          Promise.resolve(d()).then(function () {
            return Promise.resolve(
              t.hooks.call("enable", void 0, void 0, () => {
                const e = document.documentElement;
                e.classList.add("swup-enabled"),
                  e.classList.toggle("swup-native", t.options.native);
              })
            ).then(function () {});
          })
        );
      } catch (t) {
        return Promise.reject(t);
      }
    }
    destroy() {
      try {
        const t = this;
        return (
          t.clickDelegate.destroy(),
          window.removeEventListener("popstate", t.handlePopState),
          t.cache.clear(),
          t.options.plugins.forEach((e) => t.unuse(e)),
          Promise.resolve(
            t.hooks.call("disable", void 0, void 0, () => {
              const t = document.documentElement;
              t.classList.remove("swup-enabled"),
                t.classList.remove("swup-native");
            })
          ).then(function () {
            t.hooks.clear();
          })
        );
      } catch (t) {
        return Promise.reject(t);
      }
    }
    shouldIgnoreVisit(t, e) {
      let { el: n, event: o } = void 0 === e ? {} : e;
      const { origin: i, url: r, hash: a } = s.fromUrl(t);
      return (
        i !== window.location.origin ||
        !(!n || !this.triggerWillOpenNewWindow(n)) ||
        !!this.options.ignoreVisit(r + a, { el: n, event: o })
      );
    }
    handleLinkClick(t) {
      const e = t.delegateTarget,
        { href: n, url: o, hash: r } = s.fromElement(e);
      if (this.shouldIgnoreVisit(n, { el: e, event: t })) return;
      if (this.navigating && o === this.visit.to.url)
        return void t.preventDefault();
      const a = this.createVisit({ to: o, hash: r, el: e, event: t });
      t.metaKey || t.ctrlKey || t.shiftKey || t.altKey
        ? this.hooks.callSync("link:newtab", a, { href: n })
        : 0 === t.button &&
          this.hooks.callSync("link:click", a, { el: e, event: t }, () => {
            const e = a.from.url ?? "";
            t.preventDefault(),
              o && o !== e
                ? this.isSameResolvedUrl(o, e) || this.performNavigation(a)
                : r
                ? this.hooks.callSync("link:anchor", a, { hash: r }, () => {
                    i(o + r), this.scrollToContent(a);
                  })
                : this.hooks.callSync("link:self", a, void 0, () => {
                    "navigate" === this.options.linkToSelf
                      ? this.performNavigation(a)
                      : (i(o), this.scrollToContent(a));
                  });
          });
    }
    handlePopState(t) {
      const e = t.state?.url ?? window.location.href;
      if (this.options.skipPopStateHandling(t)) return;
      if (this.isSameResolvedUrl(o(), this.location.url)) return;
      const { url: n, hash: i } = s.fromUrl(e),
        r = this.createVisit({ to: n, hash: i, event: t });
      r.history.popstate = !0;
      const a = t.state?.index ?? 0;
      a &&
        a !== this.currentHistoryIndex &&
        ((r.history.direction =
          a - this.currentHistoryIndex > 0 ? "forwards" : "backwards"),
        (this.currentHistoryIndex = a)),
        (r.animation.animate = !1),
        (r.scroll.reset = !1),
        (r.scroll.target = !1),
        this.options.animateHistoryBrowsing &&
          ((r.animation.animate = !0), (r.scroll.reset = !0)),
        this.hooks.callSync("history:popstate", r, { event: t }, () => {
          this.performNavigation(r);
        });
    }
    triggerWillOpenNewWindow(t) {
      return !!t.matches('[download], [target="_blank"]');
    }
  };
});
