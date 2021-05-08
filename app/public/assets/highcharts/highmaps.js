/*
 Highmaps JS v9.1.0 (2021-05-03)

 (c) 2011-2021 Torstein Honsi

 License: www.highcharts.com/license
*/
(function (X, J) {
    "object" === typeof module && module.exports ? (J["default"] = J, module.exports = X.document ? J(X) : J) : "function" === typeof define && define.amd ? define("highcharts/highmaps", function () {
        return J(X)
    }) : (X.Highcharts && X.Highcharts.error(16, !0), X.Highcharts = J(X))
})("undefined" !== typeof window ? window : this, function (X) {
    function J(b, f, D, y) {
        b.hasOwnProperty(f) || (b[f] = y.apply(null, D))
    }

    var b = {};
    J(b, "Core/Globals.js", [], function () {
        var b = "undefined" !== typeof X ? X : "undefined" !== typeof window ? window : {}, f;
        (function (f) {
            f.SVG_NS =
                "http://www.w3.org/2000/svg";
            f.product = "Highcharts";
            f.version = "9.1.0";
            f.win = b;
            f.doc = f.win.document;
            f.svg = f.doc && f.doc.createElementNS && !!f.doc.createElementNS(f.SVG_NS, "svg").createSVGRect;
            f.userAgent = f.win.navigator && f.win.navigator.userAgent || "";
            f.isChrome = -1 !== f.userAgent.indexOf("Chrome");
            f.isFirefox = -1 !== f.userAgent.indexOf("Firefox");
            f.isMS = /(edge|msie|trident)/i.test(f.userAgent) && !f.win.opera;
            f.isSafari = !f.isChrome && -1 !== f.userAgent.indexOf("Safari");
            f.isTouchDevice = /(Mobile|Android|Windows Phone)/.test(f.userAgent);
            f.isWebKit = -1 !== f.userAgent.indexOf("AppleWebKit");
            f.deg2rad = 2 * Math.PI / 360;
            f.hasBidiBug = f.isFirefox && 4 > parseInt(f.userAgent.split("Firefox/")[1], 10);
            f.hasTouch = !!f.win.TouchEvent;
            f.marginNames = ["plotTop", "marginRight", "marginBottom", "plotLeft"];
            f.noop = function () {
            };
            f.supportsPassiveEvents = function () {
                var b = !1;
                if (!f.isMS) {
                    var B = Object.defineProperty({}, "passive", {
                        get: function () {
                            b = !0
                        }
                    });
                    f.win.addEventListener && f.win.removeEventListener && (f.win.addEventListener("testPassive", f.noop, B), f.win.removeEventListener("testPassive",
                        f.noop, B))
                }
                return b
            }();
            f.charts = [];
            f.dateFormats = {};
            f.seriesTypes = {};
            f.symbolSizes = {}
        })(f || (f = {}));
        return f
    });
    J(b, "Core/Utilities.js", [b["Core/Globals.js"]], function (b) {
        function f(a, c, h, k) {
            var E = c ? "Highcharts error" : "Highcharts warning";
            32 === a && (a = E + ": Deprecated member");
            var m = l(a), v = m ? E + " #" + a + ": www.highcharts.com/errors/" + a + "/" : a.toString();
            if ("undefined" !== typeof k) {
                var G = "";
                m && (v += "?");
                w(k, function (x, a) {
                    G += "\n - " + a + ": " + x;
                    m && (v += encodeURI(a) + "=" + encodeURI(x))
                });
                v += G
            }
            q(Highcharts, "displayError",
                {chart: h, code: a, message: v, params: k}, function () {
                    if (c) throw Error(v);
                    n.console && -1 === f.messages.indexOf(v) && console.warn(v)
                });
            f.messages.push(v)
        }

        function B(a, c) {
            var h = {};
            w(a, function (E, k) {
                if (t(a[k], !0) && !a.nodeType && c[k]) E = B(a[k], c[k]), Object.keys(E).length && (h[k] = E); else if (t(a[k]) || a[k] !== c[k]) h[k] = a[k]
            });
            return h
        }

        function y(a, c) {
            return parseInt(a, c || 10)
        }

        function C(a) {
            return "string" === typeof a
        }

        function A(a) {
            a = Object.prototype.toString.call(a);
            return "[object Array]" === a || "[object Array Iterator]" ===
                a
        }

        function t(a, c) {
            return !!a && "object" === typeof a && (!c || !A(a))
        }

        function r(a) {
            return t(a) && "number" === typeof a.nodeType
        }

        function p(a) {
            var c = a && a.constructor;
            return !(!t(a, !0) || r(a) || !c || !c.name || "Object" === c.name)
        }

        function l(a) {
            return "number" === typeof a && !isNaN(a) && Infinity > a && -Infinity < a
        }

        function g(a) {
            return "undefined" !== typeof a && null !== a
        }

        function e(a, c, h) {
            var k;
            C(c) ? g(h) ? a.setAttribute(c, h) : a && a.getAttribute && ((k = a.getAttribute(c)) || "class" !== c || (k = a.getAttribute(c + "Name"))) : w(c, function (c, h) {
                a.setAttribute(h,
                    c)
            });
            return k
        }

        function d(a, c) {
            var h;
            a || (a = {});
            for (h in c) a[h] = c[h];
            return a
        }

        function u() {
            for (var a = arguments, c = a.length, h = 0; h < c; h++) {
                var k = a[h];
                if ("undefined" !== typeof k && null !== k) return k
            }
        }

        function H(a, c) {
            b.isMS && !b.svg && c && "undefined" !== typeof c.opacity && (c.filter = "alpha(opacity=" + 100 * c.opacity + ")");
            d(a.style, c)
        }

        function I(a, h, k, n, m) {
            a = c.createElement(a);
            h && d(a, h);
            m && H(a, {padding: "0", border: "none", margin: "0"});
            k && H(a, k);
            n && n.appendChild(a);
            return a
        }

        function K(a, c) {
            return parseFloat(a.toPrecision(c ||
                14))
        }

        function F(a, c, h) {
            var k = b.getStyle || F;
            if ("width" === c) return c = Math.min(a.offsetWidth, a.scrollWidth), h = a.getBoundingClientRect && a.getBoundingClientRect().width, h < c && h >= c - 1 && (c = Math.floor(h)), Math.max(0, c - (k(a, "padding-left", !0) || 0) - (k(a, "padding-right", !0) || 0));
            if ("height" === c) return Math.max(0, Math.min(a.offsetHeight, a.scrollHeight) - (k(a, "padding-top", !0) || 0) - (k(a, "padding-bottom", !0) || 0));
            n.getComputedStyle || f(27, !0);
            if (a = n.getComputedStyle(a, void 0)) {
                var m = a.getPropertyValue(c);
                u(h, "opacity" !==
                    c) && (m = y(m))
            }
            return m
        }

        function w(a, c, h) {
            for (var k in a) Object.hasOwnProperty.call(a, k) && c.call(h || a[k], a[k], k, a)
        }

        function z(a, c, h) {
            function k(c, x) {
                var G = a.removeEventListener || b.removeEventListenerPolyfill;
                G && G.call(a, c, x, !1)
            }

            function n(G) {
                var x;
                if (a.nodeName) {
                    if (c) {
                        var h = {};
                        h[c] = !0
                    } else h = G;
                    w(h, function (a, c) {
                        if (G[c]) for (x = G[c].length; x--;) k(c, G[c][x].fn)
                    })
                }
            }

            var m = "function" === typeof a && a.prototype || a;
            if (Object.hasOwnProperty.call(m, "hcEvents")) {
                var v = m.hcEvents;
                c ? (m = v[c] || [], h ? (v[c] = m.filter(function (a) {
                    return h !==
                        a.fn
                }), k(c, h)) : (n(v), v[c] = [])) : (n(v), delete m.hcEvents)
            }
        }

        function q(a, h, k, n) {
            k = k || {};
            if (c.createEvent && (a.dispatchEvent || a.fireEvent && a !== b)) {
                var m = c.createEvent("Events");
                m.initEvent(h, !0, !0);
                k = d(m, k);
                a.dispatchEvent ? a.dispatchEvent(k) : a.fireEvent(h, k)
            } else if (a.hcEvents) {
                k.target || d(k, {
                    preventDefault: function () {
                        k.defaultPrevented = !0
                    }, target: a, type: h
                });
                m = [];
                for (var v = a, E = !1; v.hcEvents;) Object.hasOwnProperty.call(v, "hcEvents") && v.hcEvents[h] && (m.length && (E = !0), m.unshift.apply(m, v.hcEvents[h])), v =
                    Object.getPrototypeOf(v);
                E && m.sort(function (a, x) {
                    return a.order - x.order
                });
                m.forEach(function (c) {
                    !1 === c.fn.call(a, k) && k.preventDefault()
                })
            }
            n && !k.defaultPrevented && n.call(a, k)
        }

        var m = b.charts, c = b.doc, n = b.win;
        "";
        (f || (f = {})).messages = [];
        var a;
        Math.easeInOutSine = function (a) {
            return -.5 * (Math.cos(Math.PI * a) - 1)
        };
        var k = Array.prototype.find ? function (a, c) {
            return a.find(c)
        } : function (a, c) {
            var h, k = a.length;
            for (h = 0; h < k; h++) if (c(a[h], h)) return a[h]
        };
        w({map: "map", each: "forEach", grep: "filter", reduce: "reduce", some: "some"},
            function (a, c) {
                b[c] = function (h) {
                    var k;
                    f(32, !1, void 0, (k = {}, k["Highcharts." + c] = "use Array." + a, k));
                    return Array.prototype[a].apply(h, [].slice.call(arguments, 1))
                }
            });
        var h, v = function () {
            var a = Math.random().toString(36).substring(2, 9) + "-", c = 0;
            return function () {
                return "highcharts-" + (h ? "" : a) + c++
            }
        }();
        n.jQuery && (n.jQuery.fn.highcharts = function () {
            var a = [].slice.call(arguments);
            if (this[0]) return a[0] ? (new (b[C(a[0]) ? a.shift() : "Chart"])(this[0], a[0], a[1]), this) : m[e(this[0], "data-highcharts-chart")]
        });
        return {
            addEvent: function (a,
                                c, h, k) {
                void 0 === k && (k = {});
                var n = "function" === typeof a && a.prototype || a;
                Object.hasOwnProperty.call(n, "hcEvents") || (n.hcEvents = {});
                n = n.hcEvents;
                b.Point && a instanceof b.Point && a.series && a.series.chart && (a.series.chart.runTrackerClick = !0);
                var m = a.addEventListener || b.addEventListenerPolyfill;
                m && m.call(a, c, h, b.supportsPassiveEvents ? {
                    passive: void 0 === k.passive ? -1 !== c.indexOf("touch") : k.passive,
                    capture: !1
                } : !1);
                n[c] || (n[c] = []);
                n[c].push({fn: h, order: "number" === typeof k.order ? k.order : Infinity});
                n[c].sort(function (a,
                                    c) {
                    return a.order - c.order
                });
                return function () {
                    z(a, c, h)
                }
            },
            arrayMax: function (a) {
                for (var c = a.length, h = a[0]; c--;) a[c] > h && (h = a[c]);
                return h
            },
            arrayMin: function (a) {
                for (var c = a.length, h = a[0]; c--;) a[c] < h && (h = a[c]);
                return h
            },
            attr: e,
            clamp: function (a, c, h) {
                return a > c ? a < h ? a : h : c
            },
            cleanRecursively: B,
            clearTimeout: function (a) {
                g(a) && clearTimeout(a)
            },
            correctFloat: K,
            createElement: I,
            css: H,
            defined: g,
            destroyObjectProperties: function (a, c) {
                w(a, function (h, k) {
                    h && h !== c && h.destroy && h.destroy();
                    delete a[k]
                })
            },
            discardElement: function (c) {
                a ||
                (a = I("div"));
                c && a.appendChild(c);
                a.innerHTML = ""
            },
            erase: function (a, c) {
                for (var h = a.length; h--;) if (a[h] === c) {
                    a.splice(h, 1);
                    break
                }
            },
            error: f,
            extend: d,
            extendClass: function (a, c) {
                var h = function () {
                };
                h.prototype = new a;
                d(h.prototype, c);
                return h
            },
            find: k,
            fireEvent: q,
            getMagnitude: function (a) {
                return Math.pow(10, Math.floor(Math.log(a) / Math.LN10))
            },
            getNestedProperty: function (a, c) {
                for (a = a.split("."); a.length && g(c);) {
                    var h = a.shift();
                    if ("undefined" === typeof h || "__proto__" === h) return;
                    c = c[h];
                    if (!g(c) || "function" === typeof c ||
                        "number" === typeof c.nodeType || c === n) return
                }
                return c
            },
            getStyle: F,
            inArray: function (a, c, h) {
                f(32, !1, void 0, {"Highcharts.inArray": "use Array.indexOf"});
                return c.indexOf(a, h)
            },
            isArray: A,
            isClass: p,
            isDOMElement: r,
            isFunction: function (a) {
                return "function" === typeof a
            },
            isNumber: l,
            isObject: t,
            isString: C,
            keys: function (a) {
                f(32, !1, void 0, {"Highcharts.keys": "use Object.keys"});
                return Object.keys(a)
            },
            merge: function () {
                var a, c = arguments, h = {}, k = function (a, c) {
                    "object" !== typeof a && (a = {});
                    w(c, function (h, x) {
                        "__proto__" !== x &&
                        "constructor" !== x && (!t(h, !0) || p(h) || r(h) ? a[x] = c[x] : a[x] = k(a[x] || {}, h))
                    });
                    return a
                };
                !0 === c[0] && (h = c[1], c = Array.prototype.slice.call(c, 2));
                var n = c.length;
                for (a = 0; a < n; a++) h = k(h, c[a]);
                return h
            },
            normalizeTickInterval: function (a, c, h, k, n) {
                var m = a;
                h = u(h, 1);
                var v = a / h;
                c || (c = n ? [1, 1.2, 1.5, 2, 2.5, 3, 4, 5, 6, 8, 10] : [1, 2, 2.5, 5, 10], !1 === k && (1 === h ? c = c.filter(function (a) {
                    return 0 === a % 1
                }) : .1 >= h && (c = [1 / h])));
                for (k = 0; k < c.length && !(m = c[k], n && m * h >= a || !n && v <= (c[k] + (c[k + 1] || c[k])) / 2); k++) ;
                return m = K(m * h, -Math.round(Math.log(.001) /
                    Math.LN10))
            },
            objectEach: w,
            offset: function (a) {
                var h = c.documentElement;
                a = a.parentElement || a.parentNode ? a.getBoundingClientRect() : {
                    top: 0,
                    left: 0,
                    width: 0,
                    height: 0
                };
                return {
                    top: a.top + (n.pageYOffset || h.scrollTop) - (h.clientTop || 0),
                    left: a.left + (n.pageXOffset || h.scrollLeft) - (h.clientLeft || 0),
                    width: a.width,
                    height: a.height
                }
            },
            pad: function (a, c, h) {
                return Array((c || 2) + 1 - String(a).replace("-", "").length).join(h || "0") + a
            },
            pick: u,
            pInt: y,
            relativeLength: function (a, c, h) {
                return /%$/.test(a) ? c * parseFloat(a) / 100 + (h || 0) : parseFloat(a)
            },
            removeEvent: z,
            splat: function (a) {
                return A(a) ? a : [a]
            },
            stableSort: function (a, c) {
                var h = a.length, k, n;
                for (n = 0; n < h; n++) a[n].safeI = n;
                a.sort(function (a, h) {
                    k = c(a, h);
                    return 0 === k ? a.safeI - h.safeI : k
                });
                for (n = 0; n < h; n++) delete a[n].safeI
            },
            syncTimeout: function (a, c, h) {
                if (0 < c) return setTimeout(a, c, h);
                a.call(0, h);
                return -1
            },
            timeUnits: {
                millisecond: 1,
                second: 1E3,
                minute: 6E4,
                hour: 36E5,
                day: 864E5,
                week: 6048E5,
                month: 24192E5,
                year: 314496E5
            },
            uniqueKey: v,
            useSerialIds: function (a) {
                return h = u(a, h)
            },
            wrap: function (a, c, h) {
                var k = a[c];
                a[c] =
                    function () {
                        var a = Array.prototype.slice.call(arguments), c = arguments, n = this;
                        n.proceed = function () {
                            k.apply(n, arguments.length ? arguments : c)
                        };
                        a.unshift(k);
                        a = h.apply(this, a);
                        n.proceed = null;
                        return a
                    }
            }
        }
    });
    J(b, "Core/Color/Color.js", [b["Core/Globals.js"], b["Core/Utilities.js"]], function (b, f) {
        var B = f.isNumber, y = f.merge, C = f.pInt;
        "";
        f = function () {
            function f(t) {
                this.parsers = [{
                    regex: /rgba\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]?(?:\.[0-9]+)?)\s*\)/,
                    parse: function (f) {
                        return [C(f[1]), C(f[2]),
                            C(f[3]), parseFloat(f[4], 10)]
                    }
                }, {
                    regex: /rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/, parse: function (f) {
                        return [C(f[1]), C(f[2]), C(f[3]), 1]
                    }
                }];
                this.rgba = [];
                if (b.Color !== f) return new b.Color(t);
                if (!(this instanceof f)) return new f(t);
                this.init(t)
            }

            f.parse = function (t) {
                return new f(t)
            };
            f.prototype.init = function (t) {
                var r, p;
                if ((this.input = t = f.names[t && t.toLowerCase ? t.toLowerCase() : ""] || t) && t.stops) this.stops = t.stops.map(function (e) {
                    return new f(e[1])
                }); else {
                    if (t && t.charAt && "#" === t.charAt()) {
                        var l =
                            t.length;
                        t = parseInt(t.substr(1), 16);
                        7 === l ? r = [(t & 16711680) >> 16, (t & 65280) >> 8, t & 255, 1] : 4 === l && (r = [(t & 3840) >> 4 | (t & 3840) >> 8, (t & 240) >> 4 | t & 240, (t & 15) << 4 | t & 15, 1])
                    }
                    if (!r) for (p = this.parsers.length; p-- && !r;) {
                        var g = this.parsers[p];
                        (l = g.regex.exec(t)) && (r = g.parse(l))
                    }
                }
                this.rgba = r || []
            };
            f.prototype.get = function (f) {
                var r = this.input, p = this.rgba;
                if ("undefined" !== typeof this.stops) {
                    var l = y(r);
                    l.stops = [].concat(l.stops);
                    this.stops.forEach(function (g, e) {
                        l.stops[e] = [l.stops[e][0], g.get(f)]
                    })
                } else l = p && B(p[0]) ? "rgb" ===
                f || !f && 1 === p[3] ? "rgb(" + p[0] + "," + p[1] + "," + p[2] + ")" : "a" === f ? p[3] : "rgba(" + p.join(",") + ")" : r;
                return l
            };
            f.prototype.brighten = function (f) {
                var r, p = this.rgba;
                if (this.stops) this.stops.forEach(function (l) {
                    l.brighten(f)
                }); else if (B(f) && 0 !== f) for (r = 0; 3 > r; r++) p[r] += C(255 * f), 0 > p[r] && (p[r] = 0), 255 < p[r] && (p[r] = 255);
                return this
            };
            f.prototype.setOpacity = function (f) {
                this.rgba[3] = f;
                return this
            };
            f.prototype.tweenTo = function (f, r) {
                var p = this.rgba, l = f.rgba;
                l.length && p && p.length ? (f = 1 !== l[3] || 1 !== p[3], r = (f ? "rgba(" : "rgb(") + Math.round(l[0] +
                    (p[0] - l[0]) * (1 - r)) + "," + Math.round(l[1] + (p[1] - l[1]) * (1 - r)) + "," + Math.round(l[2] + (p[2] - l[2]) * (1 - r)) + (f ? "," + (l[3] + (p[3] - l[3]) * (1 - r)) : "") + ")") : r = f.input || "none";
                return r
            };
            f.names = {white: "#ffffff", black: "#000000"};
            return f
        }();
        b.Color = f;
        b.color = f.parse;
        return f
    });
    J(b, "Core/Color/Palette.js", [], function () {
        return {
            colors: "#7cb5ec #434348 #90ed7d #f7a35c #8085e9 #f15c80 #e4d354 #2b908f #f45b5b #91e8e1".split(" "),
            backgroundColor: "#ffffff",
            neutralColor100: "#000000",
            neutralColor80: "#333333",
            neutralColor60: "#666666",
            neutralColor40: "#999999",
            neutralColor20: "#cccccc",
            neutralColor10: "#e6e6e6",
            neutralColor5: "#f2f2f2",
            neutralColor3: "#f7f7f7",
            highlightColor100: "#003399",
            highlightColor80: "#335cad",
            highlightColor60: "#6685c2",
            highlightColor20: "#ccd6eb",
            highlightColor10: "#e6ebf5",
            positiveColor: "#06b535",
            negativeColor: "#f21313"
        }
    });
    J(b, "Core/Time.js", [b["Core/Globals.js"], b["Core/Utilities.js"]], function (b, f) {
        var B = b.win, y = f.defined, C = f.error, A = f.extend, t = f.isObject, r = f.merge, p = f.objectEach,
            l = f.pad, g = f.pick, e = f.splat, d =
                f.timeUnits;
        "";
        f = function () {
            function u(d) {
                this.options = {};
                this.variableTimezone = this.useUTC = !1;
                this.Date = B.Date;
                this.getTimezoneOffset = this.timezoneOffsetFunction();
                this.update(d)
            }

            u.prototype.get = function (d, e) {
                if (this.variableTimezone || this.timezoneOffset) {
                    var g = e.getTime(), u = g - this.getTimezoneOffset(e);
                    e.setTime(u);
                    d = e["getUTC" + d]();
                    e.setTime(g);
                    return d
                }
                return this.useUTC ? e["getUTC" + d]() : e["get" + d]()
            };
            u.prototype.set = function (d, e, g) {
                if (this.variableTimezone || this.timezoneOffset) {
                    if ("Milliseconds" ===
                        d || "Seconds" === d || "Minutes" === d && 0 === this.getTimezoneOffset(e) % 36E5) return e["setUTC" + d](g);
                    var u = this.getTimezoneOffset(e);
                    u = e.getTime() - u;
                    e.setTime(u);
                    e["setUTC" + d](g);
                    d = this.getTimezoneOffset(e);
                    u = e.getTime() + d;
                    return e.setTime(u)
                }
                return this.useUTC ? e["setUTC" + d](g) : e["set" + d](g)
            };
            u.prototype.update = function (d) {
                var e = g(d && d.useUTC, !0);
                this.options = d = r(!0, this.options || {}, d);
                this.Date = d.Date || B.Date || Date;
                this.timezoneOffset = (this.useUTC = e) && d.timezoneOffset;
                this.getTimezoneOffset = this.timezoneOffsetFunction();
                this.variableTimezone = e && !(!d.getTimezoneOffset && !d.timezone)
            };
            u.prototype.makeTime = function (d, e, u, l, w, z) {
                if (this.useUTC) {
                    var q = this.Date.UTC.apply(0, arguments);
                    var m = this.getTimezoneOffset(q);
                    q += m;
                    var c = this.getTimezoneOffset(q);
                    m !== c ? q += c - m : m - 36E5 !== this.getTimezoneOffset(q - 36E5) || b.isSafari || (q -= 36E5)
                } else q = (new this.Date(d, e, g(u, 1), g(l, 0), g(w, 0), g(z, 0))).getTime();
                return q
            };
            u.prototype.timezoneOffsetFunction = function () {
                var d = this, e = this.options, g = e.moment || B.moment;
                if (!this.useUTC) return function (d) {
                    return 6E4 *
                        (new Date(d.toString())).getTimezoneOffset()
                };
                if (e.timezone) {
                    if (g) return function (d) {
                        return 6E4 * -g.tz(d, e.timezone).utcOffset()
                    };
                    C(25)
                }
                return this.useUTC && e.getTimezoneOffset ? function (d) {
                    return 6E4 * e.getTimezoneOffset(d.valueOf())
                } : function () {
                    return 6E4 * (d.timezoneOffset || 0)
                }
            };
            u.prototype.dateFormat = function (d, e, u) {
                if (!y(e) || isNaN(e)) return b.defaultOptions.lang && b.defaultOptions.lang.invalidDate || "";
                d = g(d, "%Y-%m-%d %H:%M:%S");
                var F = this, w = new this.Date(e), z = this.get("Hours", w), q = this.get("Day", w),
                    m = this.get("Date", w), c = this.get("Month", w), n = this.get("FullYear", w),
                    a = b.defaultOptions.lang, k = a && a.weekdays, h = a && a.shortWeekdays;
                w = A({
                    a: h ? h[q] : k[q].substr(0, 3),
                    A: k[q],
                    d: l(m),
                    e: l(m, 2, " "),
                    w: q,
                    b: a.shortMonths[c],
                    B: a.months[c],
                    m: l(c + 1),
                    o: c + 1,
                    y: n.toString().substr(2, 2),
                    Y: n,
                    H: l(z),
                    k: z,
                    I: l(z % 12 || 12),
                    l: z % 12 || 12,
                    M: l(this.get("Minutes", w)),
                    p: 12 > z ? "AM" : "PM",
                    P: 12 > z ? "am" : "pm",
                    S: l(w.getSeconds()),
                    L: l(Math.floor(e % 1E3), 3)
                }, b.dateFormats);
                p(w, function (a, c) {
                    for (; -1 !== d.indexOf("%" + c);) d = d.replace("%" + c, "function" ===
                    typeof a ? a.call(F, e) : a)
                });
                return u ? d.substr(0, 1).toUpperCase() + d.substr(1) : d
            };
            u.prototype.resolveDTLFormat = function (d) {
                return t(d, !0) ? d : (d = e(d), {main: d[0], from: d[1], to: d[2]})
            };
            u.prototype.getTimeTicks = function (e, u, l, F) {
                var w = this, z = [], q = {};
                var m = new w.Date(u);
                var c = e.unitRange, n = e.count || 1, a;
                F = g(F, 1);
                if (y(u)) {
                    w.set("Milliseconds", m, c >= d.second ? 0 : n * Math.floor(w.get("Milliseconds", m) / n));
                    c >= d.second && w.set("Seconds", m, c >= d.minute ? 0 : n * Math.floor(w.get("Seconds", m) / n));
                    c >= d.minute && w.set("Minutes", m,
                        c >= d.hour ? 0 : n * Math.floor(w.get("Minutes", m) / n));
                    c >= d.hour && w.set("Hours", m, c >= d.day ? 0 : n * Math.floor(w.get("Hours", m) / n));
                    c >= d.day && w.set("Date", m, c >= d.month ? 1 : Math.max(1, n * Math.floor(w.get("Date", m) / n)));
                    if (c >= d.month) {
                        w.set("Month", m, c >= d.year ? 0 : n * Math.floor(w.get("Month", m) / n));
                        var k = w.get("FullYear", m)
                    }
                    c >= d.year && w.set("FullYear", m, k - k % n);
                    c === d.week && (k = w.get("Day", m), w.set("Date", m, w.get("Date", m) - k + F + (k < F ? -7 : 0)));
                    k = w.get("FullYear", m);
                    F = w.get("Month", m);
                    var h = w.get("Date", m), v = w.get("Hours", m);
                    u = m.getTime();
                    !w.variableTimezone && w.useUTC || !y(l) || (a = l - u > 4 * d.month || w.getTimezoneOffset(u) !== w.getTimezoneOffset(l));
                    u = m.getTime();
                    for (m = 1; u < l;) z.push(u), u = c === d.year ? w.makeTime(k + m * n, 0) : c === d.month ? w.makeTime(k, F + m * n) : !a || c !== d.day && c !== d.week ? a && c === d.hour && 1 < n ? w.makeTime(k, F, h, v + m * n) : u + c * n : w.makeTime(k, F, h + m * n * (c === d.day ? 1 : 7)), m++;
                    z.push(u);
                    c <= d.hour && 1E4 > z.length && z.forEach(function (a) {
                        0 === a % 18E5 && "000000000" === w.dateFormat("%H%M%S%L", a) && (q[a] = "day")
                    })
                }
                z.info = A(e, {
                    higherRanks: q, totalRange: c *
                        n
                });
                return z
            };
            return u
        }();
        b.Time = f;
        return b.Time
    });
    J(b, "Core/Options.js", [b["Core/Globals.js"], b["Core/Color/Color.js"], b["Core/Color/Palette.js"], b["Core/Time.js"], b["Core/Utilities.js"]], function (b, f, D, y, C) {
        var B = b.isTouchDevice, t = b.svg;
        f = f.parse;
        var r = C.merge;
        "";
        var p = {
            colors: D.colors,
            symbols: ["circle", "diamond", "square", "triangle", "triangle-down"],
            lang: {
                loading: "Loading...",
                months: "January February March April May June July August September October November December".split(" "),
                shortMonths: "Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" "),
                weekdays: "Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "),
                decimalPoint: ".",
                numericSymbols: "kMGTPE".split(""),
                resetZoom: "Reset zoom",
                resetZoomTitle: "Reset zoom level 1:1",
                thousandsSep: " "
            },
            global: {},
            time: {Date: void 0, getTimezoneOffset: void 0, timezone: void 0, timezoneOffset: 0, useUTC: !0},
            chart: {
                panning: {enabled: !1, type: "x"},
                styledMode: !1,
                borderRadius: 0,
                colorCount: 10,
                defaultSeriesType: "line",
                ignoreHiddenSeries: !0,
                spacing: [10, 10, 15, 10],
                resetZoomButton: {
                    theme: {zIndex: 6}, position: {
                        align: "right",
                        x: -10, y: 10
                    }
                },
                zoomBySingleTouch: !1,
                width: null,
                height: null,
                borderColor: D.highlightColor80,
                backgroundColor: D.backgroundColor,
                plotBorderColor: D.neutralColor20
            },
            title: {text: "Chart title", align: "center", margin: 15, widthAdjust: -44},
            subtitle: {text: "", align: "center", widthAdjust: -44},
            caption: {margin: 15, text: "", align: "left", verticalAlign: "bottom"},
            plotOptions: {},
            labels: {style: {position: "absolute", color: D.neutralColor80}},
            legend: {
                enabled: !0,
                align: "center",
                alignColumns: !0,
                layout: "horizontal",
                labelFormatter: function () {
                    return this.name
                },
                borderColor: D.neutralColor40,
                borderRadius: 0,
                navigation: {activeColor: D.highlightColor100, inactiveColor: D.neutralColor20},
                itemStyle: {
                    color: D.neutralColor80,
                    cursor: "pointer",
                    fontSize: "12px",
                    fontWeight: "bold",
                    textOverflow: "ellipsis"
                },
                itemHoverStyle: {color: D.neutralColor100},
                itemHiddenStyle: {color: D.neutralColor20},
                shadow: !1,
                itemCheckboxStyle: {position: "absolute", width: "13px", height: "13px"},
                squareSymbol: !0,
                symbolPadding: 5,
                verticalAlign: "bottom",
                x: 0,
                y: 0,
                title: {style: {fontWeight: "bold"}}
            },
            loading: {
                labelStyle: {
                    fontWeight: "bold",
                    position: "relative", top: "45%"
                }, style: {position: "absolute", backgroundColor: D.backgroundColor, opacity: .5, textAlign: "center"}
            },
            tooltip: {
                enabled: !0,
                animation: t,
                borderRadius: 3,
                dateTimeLabelFormats: {
                    millisecond: "%A, %b %e, %H:%M:%S.%L",
                    second: "%A, %b %e, %H:%M:%S",
                    minute: "%A, %b %e, %H:%M",
                    hour: "%A, %b %e, %H:%M",
                    day: "%A, %b %e, %Y",
                    week: "Week from %A, %b %e, %Y",
                    month: "%B %Y",
                    year: "%Y"
                },
                footerFormat: "",
                padding: 8,
                snap: B ? 25 : 10,
                headerFormat: '<span style="font-size: 10px">{point.key}</span><br/>',
                pointFormat: '<span style="color:{point.color}">\u25cf</span> {series.name}: <b>{point.y}</b><br/>',
                backgroundColor: f(D.neutralColor3).setOpacity(.85).get(),
                borderWidth: 1,
                shadow: !0,
                style: {color: D.neutralColor80, cursor: "default", fontSize: "12px", whiteSpace: "nowrap"}
            },
            credits: {
                enabled: !0,
                href: "https://www.highcharts.com?credits",
                position: {align: "right", x: -10, verticalAlign: "bottom", y: -5},
                style: {cursor: "pointer", color: D.neutralColor40, fontSize: "9px"},
                text: "Highcharts.com"
            }
        };
        p.chart.styledMode = !1;
        "";
        var l = new y(r(p.global, p.time));
        return {
            defaultOptions: p, defaultTime: l, getOptions: function () {
                return p
            },
            setOptions: function (g) {
                r(!0, p, g);
                if (g.time || g.global) b.time ? b.time.update(r(p.global, p.time, g.global, g.time)) : b.time = l;
                return p
            }
        }
    });
    J(b, "Core/Animation/Fx.js", [b["Core/Color/Color.js"], b["Core/Globals.js"], b["Core/Utilities.js"]], function (b, f, D) {
        var B = b.parse, C = f.win, A = D.isNumber, t = D.objectEach;
        return function () {
            function f(p, l, g) {
                this.pos = NaN;
                this.options = l;
                this.elem = p;
                this.prop = g
            }

            f.prototype.dSetter = function () {
                var p = this.paths, l = p && p[0];
                p = p && p[1];
                var g = this.now || 0, e = [];
                if (1 !== g && l && p) if (l.length ===
                    p.length && 1 > g) for (var d = 0; d < p.length; d++) {
                    for (var u = l[d], f = p[d], I = [], K = 0; K < f.length; K++) {
                        var F = u[K], w = f[K];
                        A(F) && A(w) && ("A" !== f[0] || 4 !== K && 5 !== K) ? I[K] = F + g * (w - F) : I[K] = w
                    }
                    e.push(I)
                } else e = p; else e = this.toD || [];
                this.elem.attr("d", e, void 0, !0)
            };
            f.prototype.update = function () {
                var p = this.elem, l = this.prop, g = this.now, e = this.options.step;
                if (this[l + "Setter"]) this[l + "Setter"](); else p.attr ? p.element && p.attr(l, g, null, !0) : p.style[l] = g + this.unit;
                e && e.call(p, g, this)
            };
            f.prototype.run = function (p, l, g) {
                var e = this, d = e.options,
                    u = function (d) {
                        return u.stopped ? !1 : e.step(d)
                    }, H = C.requestAnimationFrame || function (d) {
                        setTimeout(d, 13)
                    }, I = function () {
                        for (var d = 0; d < f.timers.length; d++) f.timers[d]() || f.timers.splice(d--, 1);
                        f.timers.length && H(I)
                    };
                p !== l || this.elem["forceAnimate:" + this.prop] ? (this.startTime = +new Date, this.start = p, this.end = l, this.unit = g, this.now = this.start, this.pos = 0, u.elem = this.elem, u.prop = this.prop, u() && 1 === f.timers.push(u) && H(I)) : (delete d.curAnim[this.prop], d.complete && 0 === Object.keys(d.curAnim).length && d.complete.call(this.elem))
            };
            f.prototype.step = function (p) {
                var l = +new Date, g = this.options, e = this.elem, d = g.complete, u = g.duration, f = g.curAnim;
                if (e.attr && !e.element) p = !1; else if (p || l >= u + this.startTime) {
                    this.now = this.end;
                    this.pos = 1;
                    this.update();
                    var I = f[this.prop] = !0;
                    t(f, function (d) {
                        !0 !== d && (I = !1)
                    });
                    I && d && d.call(e);
                    p = !1
                } else this.pos = g.easing((l - this.startTime) / u), this.now = this.start + (this.end - this.start) * this.pos, this.update(), p = !0;
                return p
            };
            f.prototype.initPath = function (p, l, g) {
                function e(d, m) {
                    for (; d.length < z;) {
                        var c = d[0], n = m[z -
                        d.length];
                        n && "M" === c[0] && (d[0] = "C" === n[0] ? ["C", c[1], c[2], c[1], c[2], c[1], c[2]] : ["L", c[1], c[2]]);
                        d.unshift(c);
                        I && (c = d.pop(), d.push(d[d.length - 1], c))
                    }
                }

                function d(d, m) {
                    for (; d.length < z;) if (m = d[Math.floor(d.length / K) - 1].slice(), "C" === m[0] && (m[1] = m[5], m[2] = m[6]), I) {
                        var c = d[Math.floor(d.length / K)].slice();
                        d.splice(d.length / 2, 0, m, c)
                    } else d.push(m)
                }

                var u = p.startX, f = p.endX;
                g = g.slice();
                var I = p.isArea, K = I ? 2 : 1;
                l = l && l.slice();
                if (!l) return [g, g];
                if (u && f && f.length) {
                    for (p = 0; p < u.length; p++) if (u[p] === f[0]) {
                        var F = p;
                        break
                    } else if (u[0] ===
                        f[f.length - u.length + p]) {
                        F = p;
                        var w = !0;
                        break
                    } else if (u[u.length - 1] === f[f.length - u.length + p]) {
                        F = u.length - p;
                        break
                    }
                    "undefined" === typeof F && (l = [])
                }
                if (l.length && A(F)) {
                    var z = g.length + F * K;
                    w ? (e(l, g), d(g, l)) : (e(g, l), d(l, g))
                }
                return [l, g]
            };
            f.prototype.fillSetter = function () {
                f.prototype.strokeSetter.apply(this, arguments)
            };
            f.prototype.strokeSetter = function () {
                this.elem.attr(this.prop, B(this.start).tweenTo(B(this.end), this.pos), null, !0)
            };
            f.timers = [];
            return f
        }()
    });
    J(b, "Core/Animation/AnimationUtilities.js", [b["Core/Animation/Fx.js"],
        b["Core/Utilities.js"]], function (b, f) {
        function B(d) {
            return p(d) ? l({duration: 500, defer: 0}, d) : {duration: d ? 500 : 0, defer: 0}
        }

        function y(d, e) {
            for (var g = b.timers.length; g--;) b.timers[g].elem !== d || e && e !== b.timers[g].prop || (b.timers[g].stopped = !0)
        }

        var C = f.defined, A = f.getStyle, t = f.isArray, r = f.isNumber, p = f.isObject, l = f.merge, g = f.objectEach,
            e = f.pick;
        return {
            animate: function (d, e, f) {
                var u, K = "", F, w;
                if (!p(f)) {
                    var z = arguments;
                    f = {duration: z[2], easing: z[3], complete: z[4]}
                }
                r(f.duration) || (f.duration = 400);
                f.easing = "function" ===
                typeof f.easing ? f.easing : Math[f.easing] || Math.easeInOutSine;
                f.curAnim = l(e);
                g(e, function (q, m) {
                    y(d, m);
                    w = new b(d, f, m);
                    F = void 0;
                    "d" === m && t(e.d) ? (w.paths = w.initPath(d, d.pathArray, e.d), w.toD = e.d, u = 0, F = 1) : d.attr ? u = d.attr(m) : (u = parseFloat(A(d, m)) || 0, "opacity" !== m && (K = "px"));
                    F || (F = q);
                    "string" === typeof F && F.match("px") && (F = F.replace(/px/g, ""));
                    w.run(u, F, K)
                })
            }, animObject: B, getDeferredAnimation: function (d, e, g) {
                var u = B(e), l = 0, f = 0;
                (g ? [g] : d.series).forEach(function (d) {
                    d = B(d.options.animation);
                    l = e && C(e.defer) ? u.defer :
                        Math.max(l, d.duration + d.defer);
                    f = Math.min(u.duration, d.duration)
                });
                d.renderer.forExport && (l = 0);
                return {defer: Math.max(0, l - f), duration: Math.min(l, f)}
            }, setAnimation: function (d, g) {
                g.renderer.globalAnimation = e(d, g.options.chart.animation, !0)
            }, stop: y
        }
    });
    J(b, "Core/Renderer/HTML/AST.js", [b["Core/Globals.js"], b["Core/Utilities.js"]], function (b, f) {
        var B = b.SVG_NS, y = f.attr, C = f.createElement, A = f.discardElement, t = f.error, r = f.isString,
            p = f.objectEach, l = f.splat;
        "";
        var g = !1;
        try {
            g = !!(new DOMParser).parseFromString("",
                "text/html")
        } catch (e) {
        }
        return function () {
            function e(d) {
                this.nodes = "string" === typeof d ? this.parseMarkup(d) : d
            }

            e.filterUserAttributes = function (d) {
                p(d, function (g, l) {
                    var u = !0;
                    -1 === e.allowedAttributes.indexOf(l) && (u = !1);
                    -1 !== ["background", "dynsrc", "href", "lowsrc", "src"].indexOf(l) && (u = r(g) && e.allowedReferences.some(function (d) {
                        return 0 === g.indexOf(d)
                    }));
                    u || (t("Highcharts warning: Invalid attribute '" + l + "' in config"), delete d[l])
                });
                return d
            };
            e.setElementHTML = function (d, g) {
                d.innerHTML = "";
                g && (new e(g)).addToDOM(d)
            };
            e.prototype.addToDOM = function (d) {
                function g(d, u) {
                    var f;
                    l(d).forEach(function (d) {
                        var w = d.tagName, l = d.textContent ? b.doc.createTextNode(d.textContent) : void 0;
                        if (w) if ("#text" === w) var q = l; else if (-1 !== e.allowedTags.indexOf(w)) {
                            w = b.doc.createElementNS("svg" === w ? B : u.namespaceURI || B, w);
                            var m = d.attributes || {};
                            p(d, function (c, n) {
                                "tagName" !== n && "attributes" !== n && "children" !== n && "textContent" !== n && (m[n] = c)
                            });
                            y(w, e.filterUserAttributes(m));
                            l && w.appendChild(l);
                            g(d.children || [], w);
                            q = w
                        } else t("Highcharts warning: Invalid tagName '" +
                            w + "' in config");
                        q && u.appendChild(q);
                        f = q
                    });
                    return f
                }

                return g(this.nodes, d)
            };
            e.prototype.parseMarkup = function (d) {
                var e = [];
                if (g) d = (new DOMParser).parseFromString(d, "text/html"); else {
                    var l = C("div");
                    l.innerHTML = d;
                    d = {body: l}
                }
                var f = function (d, e) {
                    var g = d.nodeName.toLowerCase(), l = {tagName: g};
                    if ("#text" === g) {
                        g = d.textContent || "";
                        if (/^[\s]*$/.test(g)) return;
                        l.textContent = g
                    }
                    if (g = d.attributes) {
                        var q = {};
                        [].forEach.call(g, function (c) {
                            q[c.name] = c.value
                        });
                        l.attributes = q
                    }
                    if (d.childNodes.length) {
                        var m = [];
                        [].forEach.call(d.childNodes,
                            function (c) {
                                f(c, m)
                            });
                        m.length && (l.children = m)
                    }
                    e.push(l)
                };
                [].forEach.call(d.body.childNodes, function (d) {
                    return f(d, e)
                });
                l && A(l);
                return e
            };
            e.allowedTags = "a b br button caption circle clipPath code dd defs div dl dt em feComponentTransfer feFuncA feFuncB feFuncG feFuncR feGaussianBlur feOffset feMerge feMergeNode filter h1 h2 h3 h4 h5 h6 hr i img li linearGradient marker ol p path pattern pre rect small span stop strong style sub sup svg table text thead tbody tspan td th tr u ul #text".split(" ");
            e.allowedAttributes =
                "aria-controls aria-describedby aria-expanded aria-haspopup aria-hidden aria-label aria-labelledby aria-live aria-pressed aria-readonly aria-roledescription aria-selected class clip-path color colspan cx cy d dx dy disabled fill height href id in markerHeight markerWidth offset opacity orient padding paddingLeft patternUnits r refX refY role scope slope src startOffset stdDeviation stroke stroke-linecap stroke-width style result rowspan summary target tabindex text-align textAnchor textLength type valign width x x1 x2 y y1 y2 zIndex".split(" ");
            e.allowedReferences = "https:// http:// mailto: / ../ ./ #".split(" ");
            return e
        }()
    });
    J(b, "Core/FormatUtilities.js", [b["Core/Options.js"], b["Core/Utilities.js"]], function (b, f) {
        function B(l, g, e, d) {
            l = +l || 0;
            g = +g;
            var u = y.lang, f = (l.toString().split(".")[1] || "").split("e")[0].length, I = l.toString().split("e"),
                K = g;
            if (-1 === g) g = Math.min(f, 20); else if (!t(g)) g = 2; else if (g && I[1] && 0 > I[1]) {
                var F = g + +I[1];
                0 <= F ? (I[0] = (+I[0]).toExponential(F).split("e")[0], g = F) : (I[0] = I[0].split(".")[0] || 0, l = 20 > g ? (I[0] * Math.pow(10, I[1])).toFixed(g) :
                    0, I[1] = 0)
            }
            F = (Math.abs(I[1] ? I[0] : l) + Math.pow(10, -Math.max(g, f) - 1)).toFixed(g);
            f = String(p(F));
            var w = 3 < f.length ? f.length % 3 : 0;
            e = r(e, u.decimalPoint);
            d = r(d, u.thousandsSep);
            l = (0 > l ? "-" : "") + (w ? f.substr(0, w) + d : "");
            l = 0 > +I[1] && !K ? "0" : l + f.substr(w).replace(/(\d{3})(?=\d)/g, "$1" + d);
            g && (l += e + F.slice(-g));
            I[1] && 0 !== +l && (l += "e" + I[1]);
            return l
        }

        var y = b.defaultOptions, C = b.defaultTime, A = f.getNestedProperty, t = f.isNumber, r = f.pick, p = f.pInt;
        return {
            dateFormat: function (l, g, e) {
                return C.dateFormat(l, g, e)
            }, format: function (l, g,
                                 e) {
                var d = "{", u = !1, f = /f$/, p = /\.([0-9])/, K = y.lang, F = e && e.time || C;
                e = e && e.numberFormatter || B;
                for (var w = []; l;) {
                    var z = l.indexOf(d);
                    if (-1 === z) break;
                    var q = l.slice(0, z);
                    if (u) {
                        q = q.split(":");
                        d = A(q.shift() || "", g);
                        if (q.length && "number" === typeof d) if (q = q.join(":"), f.test(q)) {
                            var m = parseInt((q.match(p) || ["", "-1"])[1], 10);
                            null !== d && (d = e(d, m, K.decimalPoint, -1 < q.indexOf(",") ? K.thousandsSep : ""))
                        } else d = F.dateFormat(q, d);
                        w.push(d)
                    } else w.push(q);
                    l = l.slice(z + 1);
                    d = (u = !u) ? "}" : "{"
                }
                w.push(l);
                return w.join("")
            }, numberFormat: B
        }
    });
    J(b, "Core/Renderer/SVG/SVGElement.js", [b["Core/Animation/AnimationUtilities.js"], b["Core/Renderer/HTML/AST.js"], b["Core/Color/Color.js"], b["Core/Globals.js"], b["Core/Color/Palette.js"], b["Core/Utilities.js"]], function (b, f, D, y, C, A) {
        var t = b.animate, r = b.animObject, p = b.stop, l = y.deg2rad, g = y.doc, e = y.noop, d = y.svg, u = y.SVG_NS,
            H = y.win, I = A.addEvent, K = A.attr, F = A.createElement, w = A.css, z = A.defined, q = A.erase,
            m = A.extend, c = A.fireEvent, n = A.isArray, a = A.isFunction, k = A.isNumber, h = A.isString, v = A.merge,
            E = A.objectEach, L =
                A.pick, M = A.pInt, S = A.syncTimeout, B = A.uniqueKey;
        b = function () {
            function b() {
                this.element = void 0;
                this.onEvents = {};
                this.opacity = 1;
                this.renderer = void 0;
                this.SVG_NS = u;
                this.symbolCustomAttribs = "x y width height r start end innerR anchorX anchorY rounded".split(" ")
            }

            b.prototype._defaultGetter = function (a) {
                a = L(this[a + "Value"], this[a], this.element ? this.element.getAttribute(a) : null, 0);
                /^[\-0-9\.]+$/.test(a) && (a = parseFloat(a));
                return a
            };
            b.prototype._defaultSetter = function (a, c, x) {
                x.setAttribute(c, a)
            };
            b.prototype.add =
                function (a) {
                    var c = this.renderer, x = this.element;
                    a && (this.parentGroup = a);
                    this.parentInverted = a && a.inverted;
                    "undefined" !== typeof this.textStr && "text" === this.element.nodeName && c.buildText(this);
                    this.added = !0;
                    if (!a || a.handleZ || this.zIndex) var h = this.zIndexSetter();
                    h || (a ? a.element : c.box).appendChild(x);
                    if (this.onAdd) this.onAdd();
                    return this
                };
            b.prototype.addClass = function (a, c) {
                var x = c ? "" : this.attr("class") || "";
                a = (a || "").split(/ /g).reduce(function (a, c) {
                    -1 === x.indexOf(c) && a.push(c);
                    return a
                }, x ? [x] : []).join(" ");
                a !== x && this.attr("class", a);
                return this
            };
            b.prototype.afterSetters = function () {
                this.doTransform && (this.updateTransform(), this.doTransform = !1)
            };
            b.prototype.align = function (a, c, x) {
                var G = {}, k = this.renderer, n = k.alignedObjects, d, m, v;
                if (a) {
                    if (this.alignOptions = a, this.alignByTranslate = c, !x || h(x)) this.alignTo = d = x || "renderer", q(n, this), n.push(this), x = void 0
                } else a = this.alignOptions, c = this.alignByTranslate, d = this.alignTo;
                x = L(x, k[d], "scrollablePlotBox" === d ? k.plotBox : void 0, k);
                d = a.align;
                var e = a.verticalAlign;
                k =
                    (x.x || 0) + (a.x || 0);
                n = (x.y || 0) + (a.y || 0);
                "right" === d ? m = 1 : "center" === d && (m = 2);
                m && (k += (x.width - (a.width || 0)) / m);
                G[c ? "translateX" : "x"] = Math.round(k);
                "bottom" === e ? v = 1 : "middle" === e && (v = 2);
                v && (n += (x.height - (a.height || 0)) / v);
                G[c ? "translateY" : "y"] = Math.round(n);
                this[this.placed ? "animate" : "attr"](G);
                this.placed = !0;
                this.alignAttr = G;
                return this
            };
            b.prototype.alignSetter = function (a) {
                var c = {left: "start", center: "middle", right: "end"};
                c[a] && (this.alignValue = a, this.element.setAttribute("text-anchor", c[a]))
            };
            b.prototype.animate =
                function (a, c, x) {
                    var h = this, k = r(L(c, this.renderer.globalAnimation, !0));
                    c = k.defer;
                    L(g.hidden, g.msHidden, g.webkitHidden, !1) && (k.duration = 0);
                    0 !== k.duration ? (x && (k.complete = x), S(function () {
                        h.element && t(h, a, k)
                    }, c)) : (this.attr(a, void 0, x), E(a, function (a, c) {
                        k.step && k.step.call(this, a, {prop: c, pos: 1, elem: this})
                    }, this));
                    return this
                };
            b.prototype.applyTextOutline = function (a) {
                var c = this.element;
                -1 !== a.indexOf("contrast") && (a = a.replace(/contrast/g, this.renderer.getContrast(c.style.fill)));
                var x = a.split(" ");
                a = x[x.length -
                1];
                if ((x = x[0]) && "none" !== x && y.svg) {
                    this.fakeTS = !0;
                    this.ySetter = this.xSetter;
                    x = x.replace(/(^[\d\.]+)(.*?)$/g, function (a, c, x) {
                        return 2 * Number(c) + x
                    });
                    this.removeTextOutline();
                    var h = g.createElementNS(u, "tspan");
                    K(h, {
                        "class": "highcharts-text-outline",
                        fill: a,
                        stroke: a,
                        "stroke-width": x,
                        "stroke-linejoin": "round"
                    });
                    [].forEach.call(c.childNodes, function (a) {
                        var c = a.cloneNode(!0);
                        c.removeAttribute && ["fill", "stroke", "stroke-width", "stroke"].forEach(function (a) {
                            return c.removeAttribute(a)
                        });
                        h.appendChild(c)
                    });
                    var k =
                        g.createElementNS(u, "tspan");
                    k.textContent = "\u200b";
                    ["x", "y"].forEach(function (a) {
                        var x = c.getAttribute(a);
                        x && k.setAttribute(a, x)
                    });
                    h.appendChild(k);
                    c.insertBefore(h, c.firstChild)
                }
            };
            b.prototype.attr = function (a, c, x, h) {
                var k = this.element, G = this.symbolCustomAttribs, n, d = this, m, v;
                if ("string" === typeof a && "undefined" !== typeof c) {
                    var e = a;
                    a = {};
                    a[e] = c
                }
                "string" === typeof a ? d = (this[a + "Getter"] || this._defaultGetter).call(this, a, k) : (E(a, function (c, x) {
                    m = !1;
                    h || p(this, x);
                    this.symbolName && -1 !== G.indexOf(x) && (n || (this.symbolAttr(a),
                        n = !0), m = !0);
                    !this.rotation || "x" !== x && "y" !== x || (this.doTransform = !0);
                    m || (v = this[x + "Setter"] || this._defaultSetter, v.call(this, c, x, k), !this.styledMode && this.shadows && /^(width|height|visibility|x|y|d|transform|cx|cy|r)$/.test(x) && this.updateShadows(x, c, v))
                }, this), this.afterSetters());
                x && x.call(this);
                return d
            };
            b.prototype.clip = function (a) {
                return this.attr("clip-path", a ? "url(" + this.renderer.url + "#" + a.id + ")" : "none")
            };
            b.prototype.crisp = function (a, c) {
                c = c || a.strokeWidth || 0;
                var x = Math.round(c) % 2 / 2;
                a.x = Math.floor(a.x ||
                    this.x || 0) + x;
                a.y = Math.floor(a.y || this.y || 0) + x;
                a.width = Math.floor((a.width || this.width || 0) - 2 * x);
                a.height = Math.floor((a.height || this.height || 0) - 2 * x);
                z(a.strokeWidth) && (a.strokeWidth = c);
                return a
            };
            b.prototype.complexColor = function (a, h, x) {
                var k = this.renderer, G, d, m, e, N, g, q, O, l, w, u = [], f;
                c(this.renderer, "complexColor", {args: arguments}, function () {
                    a.radialGradient ? d = "radialGradient" : a.linearGradient && (d = "linearGradient");
                    if (d) {
                        m = a[d];
                        N = k.gradients;
                        g = a.stops;
                        l = x.radialReference;
                        n(m) && (a[d] = m = {
                            x1: m[0], y1: m[1],
                            x2: m[2], y2: m[3], gradientUnits: "userSpaceOnUse"
                        });
                        "radialGradient" === d && l && !z(m.gradientUnits) && (e = m, m = v(m, k.getRadialAttr(l, e), {gradientUnits: "userSpaceOnUse"}));
                        E(m, function (a, c) {
                            "id" !== c && u.push(c, a)
                        });
                        E(g, function (a) {
                            u.push(a)
                        });
                        u = u.join(",");
                        if (N[u]) w = N[u].attr("id"); else {
                            m.id = w = B();
                            var c = N[u] = k.createElement(d).attr(m).add(k.defs);
                            c.radAttr = e;
                            c.stops = [];
                            g.forEach(function (a) {
                                0 === a[1].indexOf("rgba") ? (G = D.parse(a[1]), q = G.get("rgb"), O = G.get("a")) : (q = a[1], O = 1);
                                a = k.createElement("stop").attr({
                                    offset: a[0],
                                    "stop-color": q, "stop-opacity": O
                                }).add(c);
                                c.stops.push(a)
                            })
                        }
                        f = "url(" + k.url + "#" + w + ")";
                        x.setAttribute(h, f);
                        x.gradient = u;
                        a.toString = function () {
                            return f
                        }
                    }
                })
            };
            b.prototype.css = function (a) {
                var c = this.styles, x = {}, h = this.element, k = ["textOutline", "textOverflow", "width"], n = "",
                    v = !c;
                a && a.color && (a.fill = a.color);
                c && E(a, function (a, h) {
                    c && c[h] !== a && (x[h] = a, v = !0)
                });
                if (v) {
                    c && (a = m(c, x));
                    if (a) if (null === a.width || "auto" === a.width) delete this.textWidth; else if ("text" === h.nodeName.toLowerCase() && a.width) var e = this.textWidth =
                        M(a.width);
                    this.styles = a;
                    e && !d && this.renderer.forExport && delete a.width;
                    if (h.namespaceURI === this.SVG_NS) {
                        var N = function (a, c) {
                            return "-" + c.toLowerCase()
                        };
                        E(a, function (a, c) {
                            -1 === k.indexOf(c) && (n += c.replace(/([A-Z])/g, N) + ":" + a + ";")
                        });
                        n && K(h, "style", n)
                    } else w(h, a);
                    this.added && ("text" === this.element.nodeName && this.renderer.buildText(this), a && a.textOutline && this.applyTextOutline(a.textOutline))
                }
                return this
            };
            b.prototype.dashstyleSetter = function (a) {
                var c = this["stroke-width"];
                "inherit" === c && (c = 1);
                if (a = a && a.toLowerCase()) {
                    var x =
                        a.replace("shortdashdotdot", "3,1,1,1,1,1,").replace("shortdashdot", "3,1,1,1").replace("shortdot", "1,1,").replace("shortdash", "3,1,").replace("longdash", "8,3,").replace(/dot/g, "1,3,").replace("dash", "4,3,").replace(/,$/, "").split(",");
                    for (a = x.length; a--;) x[a] = "" + M(x[a]) * L(c, NaN);
                    a = x.join(",").replace(/NaN/g, "none");
                    this.element.setAttribute("stroke-dasharray", a)
                }
            };
            b.prototype.destroy = function () {
                var a = this, c = a.element || {}, x = a.renderer, h = c.ownerSVGElement,
                    k = x.isSVG && "SPAN" === c.nodeName && a.parentGroup ||
                        void 0;
                c.onclick = c.onmouseout = c.onmouseover = c.onmousemove = c.point = null;
                p(a);
                if (a.clipPath && h) {
                    var n = a.clipPath;
                    [].forEach.call(h.querySelectorAll("[clip-path],[CLIP-PATH]"), function (a) {
                        -1 < a.getAttribute("clip-path").indexOf(n.element.id) && a.removeAttribute("clip-path")
                    });
                    a.clipPath = n.destroy()
                }
                if (a.stops) {
                    for (h = 0; h < a.stops.length; h++) a.stops[h].destroy();
                    a.stops.length = 0;
                    a.stops = void 0
                }
                a.safeRemoveChild(c);
                for (x.styledMode || a.destroyShadows(); k && k.div && 0 === k.div.childNodes.length;) c = k.parentGroup,
                    a.safeRemoveChild(k.div), delete k.div, k = c;
                a.alignTo && q(x.alignedObjects, a);
                E(a, function (c, x) {
                    a[x] && a[x].parentGroup === a && a[x].destroy && a[x].destroy();
                    delete a[x]
                })
            };
            b.prototype.destroyShadows = function () {
                (this.shadows || []).forEach(function (a) {
                    this.safeRemoveChild(a)
                }, this);
                this.shadows = void 0
            };
            b.prototype.destroyTextPath = function (a, c) {
                var x = a.getElementsByTagName("text")[0];
                if (x) {
                    if (x.removeAttribute("dx"), x.removeAttribute("dy"), c.element.setAttribute("id", ""), this.textPathWrapper && x.getElementsByTagName("textPath").length) {
                        for (a =
                                 this.textPathWrapper.element.childNodes; a.length;) x.appendChild(a[0]);
                        x.removeChild(this.textPathWrapper.element)
                    }
                } else if (a.getAttribute("dx") || a.getAttribute("dy")) a.removeAttribute("dx"), a.removeAttribute("dy");
                this.textPathWrapper && (this.textPathWrapper = this.textPathWrapper.destroy())
            };
            b.prototype.dSetter = function (a, c, x) {
                n(a) && ("string" === typeof a[0] && (a = this.renderer.pathToSegments(a)), this.pathArray = a, a = a.reduce(function (a, c, x) {
                    return c && c.join ? (x ? a + " " : "") + c.join(" ") : (c || "").toString()
                }, ""));
                /(NaN| {2}|^$)/.test(a) && (a = "M 0 0");
                this[c] !== a && (x.setAttribute(c, a), this[c] = a)
            };
            b.prototype.fadeOut = function (a) {
                var c = this;
                c.animate({opacity: 0}, {
                    duration: L(a, 150), complete: function () {
                        c.attr({y: -9999}).hide()
                    }
                })
            };
            b.prototype.fillSetter = function (a, c, x) {
                "string" === typeof a ? x.setAttribute(c, a) : a && this.complexColor(a, c, x)
            };
            b.prototype.getBBox = function (c, h) {
                var x = this.renderer, k = this.element, n = this.styles, d = this.textStr, G = x.cache,
                    v = x.cacheKeys, e = k.namespaceURI === this.SVG_NS;
                h = L(h, this.rotation, 0);
                var g =
                    x.styledMode ? k && b.prototype.getStyle.call(k, "font-size") : n && n.fontSize, q;
                if (z(d)) {
                    var E = d.toString();
                    -1 === E.indexOf("<") && (E = E.replace(/[0-9]/g, "0"));
                    E += ["", h, g, this.textWidth, n && n.textOverflow, n && n.fontWeight].join()
                }
                E && !c && (q = G[E]);
                if (!q) {
                    if (e || x.forExport) {
                        try {
                            var u = this.fakeTS && function (a) {
                                var c = k.querySelector(".highcharts-text-outline");
                                c && w(c, {display: a})
                            };
                            a(u) && u("none");
                            q = k.getBBox ? m({}, k.getBBox()) : {width: k.offsetWidth, height: k.offsetHeight};
                            a(u) && u("")
                        } catch (U) {
                            ""
                        }
                        if (!q || 0 > q.width) q = {
                            width: 0,
                            height: 0
                        }
                    } else q = this.htmlGetBBox();
                    x.isSVG && (c = q.width, x = q.height, e && (q.height = x = {
                        "11px,17": 14,
                        "13px,20": 16
                    }[n && n.fontSize + "," + Math.round(x)] || x), h && (n = h * l, q.width = Math.abs(x * Math.sin(n)) + Math.abs(c * Math.cos(n)), q.height = Math.abs(x * Math.cos(n)) + Math.abs(c * Math.sin(n))));
                    if (E && 0 < q.height) {
                        for (; 250 < v.length;) delete G[v.shift()];
                        G[E] || v.push(E);
                        G[E] = q
                    }
                }
                return q
            };
            b.prototype.getStyle = function (a) {
                return H.getComputedStyle(this.element || this, "").getPropertyValue(a)
            };
            b.prototype.hasClass = function (a) {
                return -1 !==
                    ("" + this.attr("class")).split(" ").indexOf(a)
            };
            b.prototype.hide = function (a) {
                a ? this.attr({y: -9999}) : this.attr({visibility: "hidden"});
                return this
            };
            b.prototype.htmlGetBBox = function () {
                return {height: 0, width: 0, x: 0, y: 0}
            };
            b.prototype.init = function (a, h) {
                this.element = "span" === h ? F(h) : g.createElementNS(this.SVG_NS, h);
                this.renderer = a;
                c(this, "afterInit")
            };
            b.prototype.invert = function (a) {
                this.inverted = a;
                this.updateTransform();
                return this
            };
            b.prototype.on = function (a, c) {
                var h = this.onEvents;
                if (h[a]) h[a]();
                h[a] = I(this.element,
                    a, c);
                return this
            };
            b.prototype.opacitySetter = function (a, c, h) {
                this.opacity = a = Number(Number(a).toFixed(3));
                h.setAttribute(c, a)
            };
            b.prototype.removeClass = function (a) {
                return this.attr("class", ("" + this.attr("class")).replace(h(a) ? new RegExp("(^| )" + a + "( |$)") : a, " ").replace(/ +/g, " ").trim())
            };
            b.prototype.removeTextOutline = function () {
                var a = this.element.querySelector("tspan.highcharts-text-outline");
                a && this.safeRemoveChild(a)
            };
            b.prototype.safeRemoveChild = function (a) {
                var c = a.parentNode;
                c && c.removeChild(a)
            };
            b.prototype.setRadialReference = function (a) {
                var c = this.element.gradient && this.renderer.gradients[this.element.gradient];
                this.element.radialReference = a;
                c && c.radAttr && c.animate(this.renderer.getRadialAttr(a, c.radAttr));
                return this
            };
            b.prototype.setTextPath = function (a, c) {
                var h = this.element, n = this.text ? this.text.element : h, d = {textAnchor: "text-anchor"}, m = !1,
                    G = this.textPathWrapper, q = !G;
                c = v(!0, {enabled: !0, attributes: {dy: -5, startOffset: "50%", textAnchor: "middle"}}, c);
                var N = f.filterUserAttributes(c.attributes);
                if (a && c && c.enabled) {
                    G && null === G.element.parentNode ? (q = !0, G = G.destroy()) : G && this.removeTextOutline.call(G.parentGroup);
                    this.options && this.options.padding && (N.dx = -this.options.padding);
                    G || (this.textPathWrapper = G = this.renderer.createElement("textPath"), m = !0);
                    var g = G.element;
                    (c = a.element.getAttribute("id")) || a.element.setAttribute("id", c = B());
                    if (q) for (n.setAttribute("y", 0), k(N.dx) && n.setAttribute("x", -N.dx), a = [].slice.call(n.childNodes), q = 0; q < a.length; q++) {
                        var l = a[q];
                        l.nodeType !== Node.TEXT_NODE && "tspan" !==
                        l.nodeName || g.appendChild(l)
                    }
                    m && G && G.add({element: n});
                    g.setAttributeNS("http://www.w3.org/1999/xlink", "href", this.renderer.url + "#" + c);
                    z(N.dy) && (g.parentNode.setAttribute("dy", N.dy), delete N.dy);
                    z(N.dx) && (g.parentNode.setAttribute("dx", N.dx), delete N.dx);
                    E(N, function (a, c) {
                        g.setAttribute(d[c] || c, a)
                    });
                    h.removeAttribute("transform");
                    this.removeTextOutline.call(G);
                    this.text && !this.renderer.styledMode && this.attr({fill: "none", "stroke-width": 0});
                    this.applyTextOutline = this.updateTransform = e
                } else G && (delete this.updateTransform,
                    delete this.applyTextOutline, this.destroyTextPath(h, a), this.updateTransform(), this.options && this.options.rotation && this.applyTextOutline(this.options.style.textOutline));
                return this
            };
            b.prototype.shadow = function (a, c, h) {
                var x = [], k = this.element, n = this.oldShadowOptions,
                    d = {color: C.neutralColor100, offsetX: 1, offsetY: 1, opacity: .15, width: 3}, G = !1, v;
                !0 === a ? v = d : "object" === typeof a && (v = m(d, a));
                v && (v && n && E(v, function (a, c) {
                    a !== n[c] && (G = !0)
                }), G && this.destroyShadows(), this.oldShadowOptions = v);
                if (!v) this.destroyShadows();
                else if (!this.shadows) {
                    var e = v.opacity / v.width;
                    var q = this.parentInverted ? "translate(-1,-1)" : "translate(" + v.offsetX + ", " + v.offsetY + ")";
                    for (d = 1; d <= v.width; d++) {
                        var g = k.cloneNode(!1);
                        var l = 2 * v.width + 1 - 2 * d;
                        K(g, {
                            stroke: a.color || C.neutralColor100,
                            "stroke-opacity": e * d,
                            "stroke-width": l,
                            transform: q,
                            fill: "none"
                        });
                        g.setAttribute("class", (g.getAttribute("class") || "") + " highcharts-shadow");
                        h && (K(g, "height", Math.max(K(g, "height") - l, 0)), g.cutHeight = l);
                        c ? c.element.appendChild(g) : k.parentNode && k.parentNode.insertBefore(g,
                            k);
                        x.push(g)
                    }
                    this.shadows = x
                }
                return this
            };
            b.prototype.show = function (a) {
                return this.attr({visibility: a ? "inherit" : "visible"})
            };
            b.prototype.strokeSetter = function (a, c, h) {
                this[c] = a;
                this.stroke && this["stroke-width"] ? (b.prototype.fillSetter.call(this, this.stroke, "stroke", h), h.setAttribute("stroke-width", this["stroke-width"]), this.hasStroke = !0) : "stroke-width" === c && 0 === a && this.hasStroke ? (h.removeAttribute("stroke"), this.hasStroke = !1) : this.renderer.styledMode && this["stroke-width"] && (h.setAttribute("stroke-width",
                    this["stroke-width"]), this.hasStroke = !0)
            };
            b.prototype.strokeWidth = function () {
                if (!this.renderer.styledMode) return this["stroke-width"] || 0;
                var a = this.getStyle("stroke-width"), c = 0;
                if (a.indexOf("px") === a.length - 2) c = M(a); else if ("" !== a) {
                    var h = g.createElementNS(u, "rect");
                    K(h, {width: a, "stroke-width": 0});
                    this.element.parentNode.appendChild(h);
                    c = h.getBBox().width;
                    h.parentNode.removeChild(h)
                }
                return c
            };
            b.prototype.symbolAttr = function (a) {
                var c = this;
                "x y r start end width height innerR anchorX anchorY clockwise".split(" ").forEach(function (h) {
                    c[h] =
                        L(a[h], c[h])
                });
                c.attr({d: c.renderer.symbols[c.symbolName](c.x, c.y, c.width, c.height, c)})
            };
            b.prototype.textSetter = function (a) {
                a !== this.textStr && (delete this.textPxLength, this.textStr = a, this.added && this.renderer.buildText(this))
            };
            b.prototype.titleSetter = function (a) {
                var c = this.element, h = c.getElementsByTagName("title")[0] || g.createElementNS(this.SVG_NS, "title");
                c.insertBefore ? c.insertBefore(h, c.firstChild) : c.appendChild(h);
                h.textContent = String(L(a, "")).replace(/<[^>]*>/g, "").replace(/&lt;/g, "<").replace(/&gt;/g,
                    ">")
            };
            b.prototype.toFront = function () {
                var a = this.element;
                a.parentNode.appendChild(a);
                return this
            };
            b.prototype.translate = function (a, c) {
                return this.attr({translateX: a, translateY: c})
            };
            b.prototype.updateShadows = function (a, c, h) {
                var x = this.shadows;
                if (x) for (var k = x.length; k--;) h.call(x[k], "height" === a ? Math.max(c - (x[k].cutHeight || 0), 0) : "d" === a ? this.d : c, a, x[k])
            };
            b.prototype.updateTransform = function () {
                var a = this.scaleX, c = this.scaleY, h = this.inverted, k = this.rotation, n = this.matrix,
                    d = this.element, m = this.translateX ||
                    0, v = this.translateY || 0;
                h && (m += this.width, v += this.height);
                m = ["translate(" + m + "," + v + ")"];
                z(n) && m.push("matrix(" + n.join(",") + ")");
                h ? m.push("rotate(90) scale(-1,1)") : k && m.push("rotate(" + k + " " + L(this.rotationOriginX, d.getAttribute("x"), 0) + " " + L(this.rotationOriginY, d.getAttribute("y") || 0) + ")");
                (z(a) || z(c)) && m.push("scale(" + L(a, 1) + " " + L(c, 1) + ")");
                m.length && d.setAttribute("transform", m.join(" "))
            };
            b.prototype.visibilitySetter = function (a, c, h) {
                "inherit" === a ? h.removeAttribute(c) : this[c] !== a && h.setAttribute(c,
                    a);
                this[c] = a
            };
            b.prototype.xGetter = function (a) {
                "circle" === this.element.nodeName && ("x" === a ? a = "cx" : "y" === a && (a = "cy"));
                return this._defaultGetter(a)
            };
            b.prototype.zIndexSetter = function (a, c) {
                var h = this.renderer, k = this.parentGroup, n = (k || h).element || h.box, d = this.element;
                h = n === h.box;
                var m = !1;
                var v = this.added;
                var G;
                z(a) ? (d.setAttribute("data-z-index", a), a = +a, this[c] === a && (v = !1)) : z(this[c]) && d.removeAttribute("data-z-index");
                this[c] = a;
                if (v) {
                    (a = this.zIndex) && k && (k.handleZ = !0);
                    c = n.childNodes;
                    for (G = c.length - 1; 0 <=
                    G && !m; G--) {
                        k = c[G];
                        v = k.getAttribute("data-z-index");
                        var e = !z(v);
                        if (k !== d) if (0 > a && e && !h && !G) n.insertBefore(d, c[G]), m = !0; else if (M(v) <= a || e && (!z(a) || 0 <= a)) n.insertBefore(d, c[G + 1] || null), m = !0
                    }
                    m || (n.insertBefore(d, c[h ? 3 : 0] || null), m = !0)
                }
                return m
            };
            return b
        }();
        b.prototype["stroke-widthSetter"] = b.prototype.strokeSetter;
        b.prototype.yGetter = b.prototype.xGetter;
        b.prototype.matrixSetter = b.prototype.rotationOriginXSetter = b.prototype.rotationOriginYSetter = b.prototype.rotationSetter = b.prototype.scaleXSetter = b.prototype.scaleYSetter =
            b.prototype.translateXSetter = b.prototype.translateYSetter = b.prototype.verticalAlignSetter = function (a, c) {
                this[c] = a;
                this.doTransform = !0
            };
        "";
        return b
    });
    J(b, "Core/Renderer/SVG/SVGLabel.js", [b["Core/Renderer/SVG/SVGElement.js"], b["Core/Utilities.js"]], function (b, f) {
        function B(g, e) {
            t(g) ? g !== this[e] && (this[e] = g, this.updateTextPadding()) : this[e] = void 0
        }

        var y = this && this.__extends || function () {
            var g = function (e, d) {
                g = Object.setPrototypeOf || {__proto__: []} instanceof Array && function (d, e) {
                    d.__proto__ = e
                } || function (d,
                               e) {
                    for (var g in e) e.hasOwnProperty(g) && (d[g] = e[g])
                };
                return g(e, d)
            };
            return function (e, d) {
                function l() {
                    this.constructor = e
                }

                g(e, d);
                e.prototype = null === d ? Object.create(d) : (l.prototype = d.prototype, new l)
            }
        }(), C = f.defined, A = f.extend, t = f.isNumber, r = f.merge, p = f.pick, l = f.removeEvent;
        return function (g) {
            function e(d, l, f, b, p, F, w, z, q, m) {
                var c = g.call(this) || this;
                c.paddingSetter = B;
                c.paddingLeftSetter = B;
                c.paddingRightSetter = B;
                c.init(d, "g");
                c.textStr = l;
                c.x = f;
                c.y = b;
                c.anchorX = F;
                c.anchorY = w;
                c.baseline = q;
                c.className = m;
                "button" !==
                m && c.addClass("highcharts-label");
                m && c.addClass("highcharts-" + m);
                c.text = d.text("", 0, 0, z).attr({zIndex: 1});
                if ("string" === typeof p) {
                    var n = /^url\((.*?)\)$/.test(p);
                    if (c.renderer.symbols[p] || n) c.symbolKey = p
                }
                c.bBox = e.emptyBBox;
                c.padding = 3;
                c.baselineOffset = 0;
                c.needsBox = d.styledMode || n;
                c.deferredAttr = {};
                c.alignFactor = 0;
                return c
            }

            y(e, g);
            e.prototype.alignSetter = function (d) {
                d = {left: 0, center: .5, right: 1}[d];
                d !== this.alignFactor && (this.alignFactor = d, this.bBox && t(this.xSetting) && this.attr({x: this.xSetting}))
            };
            e.prototype.anchorXSetter =
                function (d, e) {
                    this.anchorX = d;
                    this.boxAttr(e, Math.round(d) - this.getCrispAdjust() - this.xSetting)
                };
            e.prototype.anchorYSetter = function (d, e) {
                this.anchorY = d;
                this.boxAttr(e, d - this.ySetting)
            };
            e.prototype.boxAttr = function (d, e) {
                this.box ? this.box.attr(d, e) : this.deferredAttr[d] = e
            };
            e.prototype.css = function (d) {
                if (d) {
                    var g = {}, l = void 0;
                    d = r(d);
                    e.textProps.forEach(function (e) {
                        "undefined" !== typeof d[e] && (g[e] = d[e], delete d[e])
                    });
                    this.text.css(g);
                    l = "width" in g;
                    "fontSize" in g || "fontWeight" in g ? this.updateTextPadding() :
                        l && this.updateBoxSize()
                }
                return b.prototype.css.call(this, d)
            };
            e.prototype.destroy = function () {
                l(this.element, "mouseenter");
                l(this.element, "mouseleave");
                this.text && this.text.destroy();
                this.box && (this.box = this.box.destroy());
                b.prototype.destroy.call(this)
            };
            e.prototype.fillSetter = function (d, e) {
                d && (this.needsBox = !0);
                this.fill = d;
                this.boxAttr(e, d)
            };
            e.prototype.getBBox = function () {
                this.textStr && 0 === this.bBox.width && 0 === this.bBox.height && this.updateBoxSize();
                var d = this.padding, e = p(this.paddingLeft, d);
                return {
                    width: this.width,
                    height: this.height, x: this.bBox.x - e, y: this.bBox.y - d
                }
            };
            e.prototype.getCrispAdjust = function () {
                return this.renderer.styledMode && this.box ? this.box.strokeWidth() % 2 / 2 : (this["stroke-width"] ? parseInt(this["stroke-width"], 10) : 0) % 2 / 2
            };
            e.prototype.heightSetter = function (d) {
                this.heightSetting = d
            };
            e.prototype.on = function (d, e) {
                var g = this, l = g.text, f = l && "SPAN" === l.element.tagName ? l : void 0;
                if (f) {
                    var u = function (l) {
                        ("mouseenter" === d || "mouseleave" === d) && l.relatedTarget instanceof Element && (g.element.compareDocumentPosition(l.relatedTarget) &
                            Node.DOCUMENT_POSITION_CONTAINED_BY || f.element.compareDocumentPosition(l.relatedTarget) & Node.DOCUMENT_POSITION_CONTAINED_BY) || e.call(g.element, l)
                    };
                    f.on(d, u)
                }
                b.prototype.on.call(g, d, u || e);
                return g
            };
            e.prototype.onAdd = function () {
                var d = this.textStr;
                this.text.add(this);
                this.attr({text: C(d) ? d : "", x: this.x, y: this.y});
                this.box && C(this.anchorX) && this.attr({anchorX: this.anchorX, anchorY: this.anchorY})
            };
            e.prototype.rSetter = function (d, e) {
                this.boxAttr(e, d)
            };
            e.prototype.shadow = function (d) {
                d && !this.renderer.styledMode &&
                (this.updateBoxSize(), this.box && this.box.shadow(d));
                return this
            };
            e.prototype.strokeSetter = function (d, e) {
                this.stroke = d;
                this.boxAttr(e, d)
            };
            e.prototype["stroke-widthSetter"] = function (d, e) {
                d && (this.needsBox = !0);
                this["stroke-width"] = d;
                this.boxAttr(e, d)
            };
            e.prototype["text-alignSetter"] = function (d) {
                this.textAlign = d
            };
            e.prototype.textSetter = function (d) {
                "undefined" !== typeof d && this.text.attr({text: d});
                this.updateTextPadding()
            };
            e.prototype.updateBoxSize = function () {
                var d = this.text.element.style, g = {}, l = this.padding,
                    f = this.bBox = t(this.widthSetting) && t(this.heightSetting) && !this.textAlign || !C(this.text.textStr) ? e.emptyBBox : this.text.getBBox();
                this.width = this.getPaddedWidth();
                this.height = (this.heightSetting || f.height || 0) + 2 * l;
                this.baselineOffset = l + Math.min(this.renderer.fontMetrics(d && d.fontSize, this.text).b, f.height || Infinity);
                this.needsBox && (this.box || (d = this.box = this.symbolKey ? this.renderer.symbol(this.symbolKey) : this.renderer.rect(), d.addClass(("button" === this.className ? "" : "highcharts-label-box") + (this.className ?
                    " highcharts-" + this.className + "-box" : "")), d.add(this)), d = this.getCrispAdjust(), g.x = d, g.y = (this.baseline ? -this.baselineOffset : 0) + d, g.width = Math.round(this.width), g.height = Math.round(this.height), this.box.attr(A(g, this.deferredAttr)), this.deferredAttr = {})
            };
            e.prototype.updateTextPadding = function () {
                var d = this.text;
                this.updateBoxSize();
                var e = this.baseline ? 0 : this.baselineOffset, g = p(this.paddingLeft, this.padding);
                C(this.widthSetting) && this.bBox && ("center" === this.textAlign || "right" === this.textAlign) && (g +=
                    {center: .5, right: 1}[this.textAlign] * (this.widthSetting - this.bBox.width));
                if (g !== d.x || e !== d.y) d.attr("x", g), d.hasBoxWidthChanged && (this.bBox = d.getBBox(!0)), "undefined" !== typeof e && d.attr("y", e);
                d.x = g;
                d.y = e
            };
            e.prototype.widthSetter = function (d) {
                this.widthSetting = t(d) ? d : void 0
            };
            e.prototype.getPaddedWidth = function () {
                var d = this.padding, e = p(this.paddingLeft, d);
                d = p(this.paddingRight, d);
                return (this.widthSetting || this.bBox.width || 0) + e + d
            };
            e.prototype.xSetter = function (d) {
                this.x = d;
                this.alignFactor && (d -= this.alignFactor *
                    this.getPaddedWidth(), this["forceAnimate:x"] = !0);
                this.xSetting = Math.round(d);
                this.attr("translateX", this.xSetting)
            };
            e.prototype.ySetter = function (d) {
                this.ySetting = this.y = Math.round(d);
                this.attr("translateY", this.ySetting)
            };
            e.emptyBBox = {width: 0, height: 0, x: 0, y: 0};
            e.textProps = "color direction fontFamily fontSize fontStyle fontWeight lineHeight textAlign textDecoration textOutline textOverflow width".split(" ");
            return e
        }(b)
    });
    J(b, "Core/Renderer/SVG/TextBuilder.js", [b["Core/Globals.js"], b["Core/Utilities.js"],
        b["Core/Renderer/HTML/AST.js"]], function (b, f, D) {
        var B = b.doc, C = b.SVG_NS, A = f.attr, t = f.isString, r = f.objectEach, p = f.pick;
        return function () {
            function l(g) {
                var e = g.styles;
                this.renderer = g.renderer;
                this.svgElement = g;
                this.width = g.textWidth;
                this.textLineHeight = e && e.lineHeight;
                this.textOutline = e && e.textOutline;
                this.ellipsis = !(!e || "ellipsis" !== e.textOverflow);
                this.noWrap = !(!e || "nowrap" !== e.whiteSpace);
                this.fontSize = e && e.fontSize
            }

            l.prototype.buildSVG = function () {
                var g = this.svgElement, e = g.element, d = g.renderer, l =
                    p(g.textStr, "").toString(), f = -1 !== l.indexOf("<"), b = e.childNodes, K = b.length;
                d = this.width && !g.added && d.box;
                var F = /<br.*?>/g;
                var w = [l, this.ellipsis, this.noWrap, this.textLineHeight, this.textOutline, this.fontSize, this.width].join();
                if (w !== g.textCache) {
                    g.textCache = w;
                    for (delete g.actualWidth; K--;) e.removeChild(b[K]);
                    f || this.ellipsis || this.width || -1 !== l.indexOf(" ") && (!this.noWrap || F.test(l)) ? "" !== l && (d && d.appendChild(e), l = new D(l), this.modifyTree(l.nodes), l.addToDOM(g.element), this.modifyDOM(), this.ellipsis &&
                    -1 !== (e.textContent || "").indexOf("\u2026") && g.attr("title", this.unescapeEntities(g.textStr || "", ["&lt;", "&gt;"])), d && d.removeChild(e)) : e.appendChild(B.createTextNode(this.unescapeEntities(l)));
                    t(this.textOutline) && g.applyTextOutline && g.applyTextOutline(this.textOutline)
                }
            };
            l.prototype.modifyDOM = function () {
                var g = this, e = this.svgElement, d = A(e.element, "x");
                [].forEach.call(e.element.querySelectorAll("tspan.highcharts-br"), function (e) {
                    e.nextSibling && e.previousSibling && A(e, {
                        dy: g.getLineHeight(e.nextSibling),
                        x: d
                    })
                });
                var l = this.width || 0;
                if (l) {
                    var f = function (f, b) {
                        var w = f.textContent || "", z = w.replace(/([^\^])-/g, "$1- ").split(" "),
                            q = !g.noWrap && (1 < z.length || 1 < e.element.childNodes.length), m = g.getLineHeight(b),
                            c = 0, n = e.actualWidth;
                        if (g.ellipsis) w && g.truncate(f, w, void 0, 0, Math.max(0, l - parseInt(g.fontSize || 12, 10)), function (a, c) {
                            return a.substring(0, c) + "\u2026"
                        }); else if (q) {
                            w = [];
                            for (q = []; b.firstChild && b.firstChild !== f;) q.push(b.firstChild), b.removeChild(b.firstChild);
                            for (; z.length;) z.length && !g.noWrap && 0 < c && (w.push(f.textContent ||
                                ""), f.textContent = z.join(" ").replace(/- /g, "-")), g.truncate(f, void 0, z, 0 === c ? n || 0 : 0, l, function (a, c) {
                                return z.slice(0, c).join(" ").replace(/- /g, "-")
                            }), n = e.actualWidth, c++;
                            q.forEach(function (a) {
                                b.insertBefore(a, f)
                            });
                            w.forEach(function (a) {
                                b.insertBefore(B.createTextNode(a), f);
                                a = B.createElementNS(C, "tspan");
                                a.textContent = "\u200b";
                                A(a, {dy: m, x: d});
                                b.insertBefore(a, f)
                            })
                        }
                    }, b = function (d) {
                        [].slice.call(d.childNodes).forEach(function (g) {
                            g.nodeType === Node.TEXT_NODE ? f(g, d) : (-1 !== g.className.baseVal.indexOf("highcharts-br") &&
                            (e.actualWidth = 0), b(g))
                        })
                    };
                    b(e.element)
                }
            };
            l.prototype.getLineHeight = function (g) {
                var e;
                g = g.nodeType === Node.TEXT_NODE ? g.parentElement : g;
                this.renderer.styledMode || (e = g && /(px|em)$/.test(g.style.fontSize) ? g.style.fontSize : this.fontSize || this.renderer.style.fontSize || 12);
                return this.textLineHeight ? parseInt(this.textLineHeight.toString(), 10) : this.renderer.fontMetrics(e, g || this.svgElement.element).h
            };
            l.prototype.modifyTree = function (g) {
                var e = this, d = function (l, f) {
                    var b = l.tagName, p = e.renderer.styledMode, u = l.attributes ||
                        {};
                    if ("b" === b || "strong" === b) p ? u["class"] = "highcharts-strong" : u.style = "font-weight:bold;" + (u.style || ""); else if ("i" === b || "em" === b) p ? u["class"] = "highcharts-emphasized" : u.style = "font-style:italic;" + (u.style || "");
                    t(u.style) && (u.style = u.style.replace(/(;| |^)color([ :])/, "$1fill$2"));
                    "br" === b && (u["class"] = "highcharts-br", l.textContent = "\u200b", (f = g[f + 1]) && f.textContent && (f.textContent = f.textContent.replace(/^ +/gm, "")));
                    "#text" !== b && "a" !== b && (l.tagName = "tspan");
                    l.attributes = u;
                    l.children && l.children.filter(function (d) {
                        return "#text" !==
                            d.tagName
                    }).forEach(d)
                };
                for (g.forEach(d); g[0] && "tspan" === g[0].tagName && !g[0].children;) g.splice(0, 1)
            };
            l.prototype.truncate = function (g, e, d, l, f, b) {
                var p = this.svgElement, u = p.renderer, w = p.rotation, z = [], q = d ? 1 : 0,
                    m = (e || d || "").length, c = m, n, a = function (a, c) {
                        c = c || a;
                        var h = g.parentNode;
                        if (h && "undefined" === typeof z[c]) if (h.getSubStringLength) try {
                            z[c] = l + h.getSubStringLength(0, d ? c + 1 : c)
                        } catch (L) {
                            ""
                        } else u.getSpanWidth && (g.textContent = b(e || d, a), z[c] = l + u.getSpanWidth(p, g));
                        return z[c]
                    };
                p.rotation = 0;
                var k = a(g.textContent.length);
                if (l + k > f) {
                    for (; q <= m;) c = Math.ceil((q + m) / 2), d && (n = b(d, c)), k = a(c, n && n.length - 1), q === m ? q = m + 1 : k > f ? m = c - 1 : q = c;
                    0 === m ? g.textContent = "" : e && m === e.length - 1 || (g.textContent = n || b(e || d, c))
                }
                d && d.splice(0, c);
                p.actualWidth = k;
                p.rotation = w
            };
            l.prototype.unescapeEntities = function (g, e) {
                r(this.renderer.escapes, function (d, l) {
                    e && -1 !== e.indexOf(d) || (g = g.toString().replace(new RegExp(d, "g"), l))
                });
                return g
            };
            return l
        }()
    });
    J(b, "Core/Renderer/SVG/SVGRenderer.js", [b["Core/Color/Color.js"], b["Core/Globals.js"], b["Core/Color/Palette.js"],
        b["Core/Renderer/SVG/SVGElement.js"], b["Core/Renderer/SVG/SVGLabel.js"], b["Core/Renderer/HTML/AST.js"], b["Core/Renderer/SVG/TextBuilder.js"], b["Core/Utilities.js"]], function (b, f, D, y, C, A, t, r) {
        var p = r.addEvent, l = r.attr, g = r.createElement, e = r.css, d = r.defined, u = r.destroyObjectProperties,
            H = r.extend, I = r.isArray, K = r.isNumber, F = r.isObject, w = r.isString, z = r.merge, q = r.pick,
            m = r.pInt, c = r.uniqueKey, n = f.charts, a = f.deg2rad, k = f.doc, h = f.isFirefox, v = f.isMS,
            E = f.isWebKit, L = f.noop, M = f.SVG_NS, S = f.symbolSizes, B = f.win, R;
        r =
            function () {
                function G(a, c, h, k, n, d, m) {
                    this.width = this.url = this.style = this.isSVG = this.imgCount = this.height = this.gradients = this.globalAnimation = this.defs = this.chartIndex = this.cacheKeys = this.cache = this.boxWrapper = this.box = this.alignedObjects = void 0;
                    this.init(a, c, h, k, n, d, m)
                }

                G.prototype.init = function (a, c, n, d, m, G, v) {
                    var x = this.createElement("svg").attr({version: "1.1", "class": "highcharts-root"});
                    v || x.css(this.getStyle(d));
                    d = x.element;
                    a.appendChild(d);
                    l(a, "dir", "ltr");
                    -1 === a.innerHTML.indexOf("xmlns") && l(d,
                        "xmlns", this.SVG_NS);
                    this.isSVG = !0;
                    this.box = d;
                    this.boxWrapper = x;
                    this.alignedObjects = [];
                    this.url = this.getReferenceURL();
                    this.createElement("desc").add().element.appendChild(k.createTextNode("Created with Highcharts 9.1.0"));
                    this.defs = this.createElement("defs").add();
                    this.allowHTML = G;
                    this.forExport = m;
                    this.styledMode = v;
                    this.gradients = {};
                    this.cache = {};
                    this.cacheKeys = [];
                    this.imgCount = 0;
                    this.setSize(c, n, !1);
                    var g;
                    h && a.getBoundingClientRect && (c = function () {
                        e(a, {left: 0, top: 0});
                        g = a.getBoundingClientRect();
                        e(a, {left: Math.ceil(g.left) - g.left + "px", top: Math.ceil(g.top) - g.top + "px"})
                    }, c(), this.unSubPixelFix = p(B, "resize", c))
                };
                G.prototype.definition = function (a) {
                    return (new A([a])).addToDOM(this.defs.element)
                };
                G.prototype.getReferenceURL = function () {
                    if ((h || E) && k.getElementsByTagName("base").length) {
                        if (!d(R)) {
                            var a = c();
                            a = (new A([{
                                tagName: "svg",
                                attributes: {width: 8, height: 8},
                                children: [{
                                    tagName: "defs",
                                    children: [{
                                        tagName: "clipPath",
                                        attributes: {id: a},
                                        children: [{tagName: "rect", attributes: {width: 4, height: 4}}]
                                    }]
                                }, {
                                    tagName: "rect",
                                    attributes: {
                                        id: "hitme",
                                        width: 8,
                                        height: 8,
                                        "clip-path": "url(#" + a + ")",
                                        fill: "rgba(0,0,0,0.001)"
                                    }
                                }]
                            }])).addToDOM(k.body);
                            e(a, {position: "fixed", top: 0, left: 0, zIndex: 9E5});
                            var n = k.elementFromPoint(6, 6);
                            R = "hitme" === (n && n.id);
                            k.body.removeChild(a)
                        }
                        if (R) return B.location.href.split("#")[0].replace(/<[^>]*>/g, "").replace(/([\('\)])/g, "\\$1").replace(/ /g, "%20")
                    }
                    return ""
                };
                G.prototype.getStyle = function (a) {
                    return this.style = H({
                            fontFamily: '"Lucida Grande", "Lucida Sans Unicode", Arial, Helvetica, sans-serif',
                            fontSize: "12px"
                        },
                        a)
                };
                G.prototype.setStyle = function (a) {
                    this.boxWrapper.css(this.getStyle(a))
                };
                G.prototype.isHidden = function () {
                    return !this.boxWrapper.getBBox().width
                };
                G.prototype.destroy = function () {
                    var a = this.defs;
                    this.box = null;
                    this.boxWrapper = this.boxWrapper.destroy();
                    u(this.gradients || {});
                    this.gradients = null;
                    a && (this.defs = a.destroy());
                    this.unSubPixelFix && this.unSubPixelFix();
                    return this.alignedObjects = null
                };
                G.prototype.createElement = function (a) {
                    var c = new this.Element;
                    c.init(this, a);
                    return c
                };
                G.prototype.getRadialAttr =
                    function (a, c) {
                        return {
                            cx: a[0] - a[2] / 2 + (c.cx || 0) * a[2],
                            cy: a[1] - a[2] / 2 + (c.cy || 0) * a[2],
                            r: (c.r || 0) * a[2]
                        }
                    };
                G.prototype.buildText = function (a) {
                    (new t(a)).buildSVG()
                };
                G.prototype.getContrast = function (a) {
                    a = b.parse(a).rgba;
                    a[0] *= 1;
                    a[1] *= 1.2;
                    a[2] *= .5;
                    return 459 < a[0] + a[1] + a[2] ? "#000000" : "#FFFFFF"
                };
                G.prototype.button = function (a, c, h, k, n, d, m, e, G, g) {
                    var x = this.label(a, c, h, G, void 0, void 0, g, void 0, "button"), q = 0, l = this.styledMode,
                        P = n ? z(n) : {};
                    a = P && P.style || {};
                    P = A.filterUserAttributes(P);
                    x.attr(z({padding: 8, r: 2}, P));
                    if (!l) {
                        P =
                            z({
                                fill: D.neutralColor3,
                                stroke: D.neutralColor20,
                                "stroke-width": 1,
                                style: {color: D.neutralColor80, cursor: "pointer", fontWeight: "normal"}
                            }, {style: a}, P);
                        var E = P.style;
                        delete P.style;
                        d = z(P, {fill: D.neutralColor10}, A.filterUserAttributes(d || {}));
                        var N = d.style;
                        delete d.style;
                        m = z(P, {
                            fill: D.highlightColor10,
                            style: {color: D.neutralColor100, fontWeight: "bold"}
                        }, A.filterUserAttributes(m || {}));
                        var f = m.style;
                        delete m.style;
                        e = z(P, {style: {color: D.neutralColor20}}, A.filterUserAttributes(e || {}));
                        var w = e.style;
                        delete e.style
                    }
                    p(x.element,
                        v ? "mouseover" : "mouseenter", function () {
                            3 !== q && x.setState(1)
                        });
                    p(x.element, v ? "mouseout" : "mouseleave", function () {
                        3 !== q && x.setState(q)
                    });
                    x.setState = function (a) {
                        1 !== a && (x.state = q = a);
                        x.removeClass(/highcharts-button-(normal|hover|pressed|disabled)/).addClass("highcharts-button-" + ["normal", "hover", "pressed", "disabled"][a || 0]);
                        l || x.attr([P, d, m, e][a || 0]).css([E, N, f, w][a || 0])
                    };
                    l || x.attr(P).css(H({cursor: "default"}, E));
                    return x.on("touchstart", function (a) {
                        return a.stopPropagation()
                    }).on("click", function (a) {
                        3 !==
                        q && k.call(x, a)
                    })
                };
                G.prototype.crispLine = function (a, c, h) {
                    void 0 === h && (h = "round");
                    var k = a[0], x = a[1];
                    k[1] === x[1] && (k[1] = x[1] = Math[h](k[1]) - c % 2 / 2);
                    k[2] === x[2] && (k[2] = x[2] = Math[h](k[2]) + c % 2 / 2);
                    return a
                };
                G.prototype.path = function (a) {
                    var c = this.styledMode ? {} : {fill: "none"};
                    I(a) ? c.d = a : F(a) && H(c, a);
                    return this.createElement("path").attr(c)
                };
                G.prototype.circle = function (a, c, h) {
                    a = F(a) ? a : "undefined" === typeof a ? {} : {x: a, y: c, r: h};
                    c = this.createElement("circle");
                    c.xSetter = c.ySetter = function (a, c, h) {
                        h.setAttribute("c" +
                            c, a)
                    };
                    return c.attr(a)
                };
                G.prototype.arc = function (a, c, h, k, n, d) {
                    F(a) ? (k = a, c = k.y, h = k.r, a = k.x) : k = {innerR: k, start: n, end: d};
                    a = this.symbol("arc", a, c, h, h, k);
                    a.r = h;
                    return a
                };
                G.prototype.rect = function (a, c, h, k, n, d) {
                    n = F(a) ? a.r : n;
                    var x = this.createElement("rect");
                    a = F(a) ? a : "undefined" === typeof a ? {} : {
                        x: a,
                        y: c,
                        width: Math.max(h, 0),
                        height: Math.max(k, 0)
                    };
                    this.styledMode || ("undefined" !== typeof d && (a["stroke-width"] = d, a = x.crisp(a)), a.fill = "none");
                    n && (a.r = n);
                    x.rSetter = function (a, c, h) {
                        x.r = a;
                        l(h, {rx: a, ry: a})
                    };
                    x.rGetter = function () {
                        return x.r ||
                            0
                    };
                    return x.attr(a)
                };
                G.prototype.setSize = function (a, c, h) {
                    this.width = a;
                    this.height = c;
                    this.boxWrapper.animate({width: a, height: c}, {
                        step: function () {
                            this.attr({viewBox: "0 0 " + this.attr("width") + " " + this.attr("height")})
                        }, duration: q(h, !0) ? void 0 : 0
                    });
                    this.alignElements()
                };
                G.prototype.g = function (a) {
                    var c = this.createElement("g");
                    return a ? c.attr({"class": "highcharts-" + a}) : c
                };
                G.prototype.image = function (a, c, h, k, n, d) {
                    var x = {preserveAspectRatio: "none"}, m = function (a, c) {
                        a.setAttributeNS ? a.setAttributeNS("http://www.w3.org/1999/xlink",
                            "href", c) : a.setAttribute("hc-svg-href", c)
                    }, e = function (c) {
                        m(G.element, a);
                        d.call(G, c)
                    };
                    1 < arguments.length && H(x, {x: c, y: h, width: k, height: n});
                    var G = this.createElement("image").attr(x);
                    d ? (m(G.element, "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="), x = new B.Image, p(x, "load", e), x.src = a, x.complete && e({})) : m(G.element, a);
                    return G
                };
                G.prototype.symbol = function (a, c, h, m, G, v) {
                    var x = this, l = /^url\((.*?)\)$/, P = l.test(a), E = !P && (this.symbols[a] ? a : "circle"),
                        f = E && this.symbols[E], w;
                    if (f) {
                        "number" ===
                        typeof c && (w = f.call(this.symbols, Math.round(c || 0), Math.round(h || 0), m || 0, G || 0, v));
                        var b = this.path(w);
                        x.styledMode || b.attr("fill", "none");
                        H(b, {symbolName: E, x: c, y: h, width: m, height: G});
                        v && H(b, v)
                    } else if (P) {
                        var z = a.match(l)[1];
                        b = this.image(z);
                        b.imgwidth = q(S[z] && S[z].width, v && v.width);
                        b.imgheight = q(S[z] && S[z].height, v && v.height);
                        var p = function () {
                            b.attr({width: b.width, height: b.height})
                        };
                        ["width", "height"].forEach(function (a) {
                            b[a + "Setter"] = function (a, c) {
                                var h = this["img" + c];
                                this[c] = a;
                                d(h) && (v && "within" ===
                                v.backgroundSize && this.width && this.height && (h = Math.round(h * Math.min(this.width / this.imgwidth, this.height / this.imgheight))), this.element && this.element.setAttribute(c, h), this.alignByTranslate || (a = ((this[c] || 0) - h) / 2, this.attr("width" === c ? {translateX: a} : {translateY: a})))
                            }
                        });
                        d(c) && b.attr({x: c, y: h});
                        b.isImg = !0;
                        d(b.imgwidth) && d(b.imgheight) ? p() : (b.attr({width: 0, height: 0}), g("img", {
                            onload: function () {
                                var a = n[x.chartIndex];
                                0 === this.width && (e(this, {
                                    position: "absolute",
                                    top: "-999em"
                                }), k.body.appendChild(this));
                                S[z] = {width: this.width, height: this.height};
                                b.imgwidth = this.width;
                                b.imgheight = this.height;
                                b.element && p();
                                this.parentNode && this.parentNode.removeChild(this);
                                x.imgCount--;
                                if (!x.imgCount && a && !a.hasLoaded) a.onload()
                            }, src: z
                        }), this.imgCount++)
                    }
                    return b
                };
                G.prototype.clipRect = function (a, h, k, n) {
                    var d = c() + "-", x = this.createElement("clipPath").attr({id: d}).add(this.defs);
                    a = this.rect(a, h, k, n, 0).add(x);
                    a.id = d;
                    a.clipPath = x;
                    a.count = 0;
                    return a
                };
                G.prototype.text = function (a, c, h, k) {
                    var n = {};
                    if (k && (this.allowHTML || !this.forExport)) return this.html(a,
                        c, h);
                    n.x = Math.round(c || 0);
                    h && (n.y = Math.round(h));
                    d(a) && (n.text = a);
                    a = this.createElement("text").attr(n);
                    k || (a.xSetter = function (a, c, h) {
                        var k = h.getElementsByTagName("tspan"), n = h.getAttribute(c), d;
                        for (d = 0; d < k.length; d++) {
                            var x = k[d];
                            x.getAttribute(c) === n && x.setAttribute(c, a)
                        }
                        h.setAttribute(c, a)
                    });
                    return a
                };
                G.prototype.fontMetrics = function (a, c) {
                    a = !this.styledMode && /px/.test(a) || !B.getComputedStyle ? a || c && c.style && c.style.fontSize || this.style && this.style.fontSize : c && y.prototype.getStyle.call(c, "font-size");
                    a = /px/.test(a) ? m(a) : 12;
                    c = 24 > a ? a + 3 : Math.round(1.2 * a);
                    return {h: c, b: Math.round(.8 * c), f: a}
                };
                G.prototype.rotCorr = function (c, h, k) {
                    var n = c;
                    h && k && (n = Math.max(n * Math.cos(h * a), 4));
                    return {x: -c / 3 * Math.sin(h * a), y: n}
                };
                G.prototype.pathToSegments = function (a) {
                    for (var c = [], h = [], k = {
                        A: 8,
                        C: 7,
                        H: 2,
                        L: 3,
                        M: 3,
                        Q: 5,
                        S: 5,
                        T: 3,
                        V: 2
                    }, n = 0; n < a.length; n++) w(h[0]) && K(a[n]) && h.length === k[h[0].toUpperCase()] && a.splice(n, 0, h[0].replace("M", "L").replace("m", "l")), "string" === typeof a[n] && (h.length && c.push(h.slice(0)), h.length = 0), h.push(a[n]);
                    c.push(h.slice(0));
                    return c
                };
                G.prototype.label = function (a, c, h, k, n, d, m, e, G) {
                    return new C(this, a, c, h, k, n, d, m, e, G)
                };
                G.prototype.alignElements = function () {
                    this.alignedObjects.forEach(function (a) {
                        return a.align()
                    })
                };
                return G
            }();
        r.prototype.Element = y;
        r.prototype.SVG_NS = M;
        r.prototype.draw = L;
        r.prototype.escapes = {"&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;"};
        var O = function (a, c, h, k, n) {
            n = n && n.r || 0;
            return [["M", a + n, c], ["L", a + h - n, c], ["C", a + h, c, a + h, c, a + h, c + n], ["L", a + h, c + k - n], ["C", a + h, c + k, a + h, c + k, a +
            h - n, c + k], ["L", a + n, c + k], ["C", a, c + k, a, c + k, a, c + k - n], ["L", a, c + n], ["C", a, c, a, c, a + n, c]]
        };
        L = function (a, c, h, k, n) {
            return n && n.r ? O(a, c, h, k, n) : [["M", a, c], ["L", a + h, c], ["L", a + h, c + k], ["L", a, c + k], ["Z"]]
        };
        r.prototype.symbols = {
            circle: function (a, c, h, k) {
                return this.arc(a + h / 2, c + k / 2, h / 2, k / 2, {start: .5 * Math.PI, end: 2.5 * Math.PI, open: !1})
            }, rect: L, square: L, triangle: function (a, c, h, k) {
                return [["M", a + h / 2, c], ["L", a + h, c + k], ["L", a, c + k], ["Z"]]
            }, "triangle-down": function (a, c, h, k) {
                return [["M", a, c], ["L", a + h, c], ["L", a + h / 2, c + k], ["Z"]]
            },
            diamond: function (a, c, h, k) {
                return [["M", a + h / 2, c], ["L", a + h, c + k / 2], ["L", a + h / 2, c + k], ["L", a, c + k / 2], ["Z"]]
            }, arc: function (a, c, h, k, n) {
                var m = [];
                if (n) {
                    var x = n.start || 0, e = q(n.r, h);
                    h = q(n.r, k || h);
                    var v = (n.end || 0) - .001;
                    k = n.innerR;
                    var G = q(n.open, .001 > Math.abs((n.end || 0) - x - 2 * Math.PI)), g = Math.cos(x),
                        l = Math.sin(x), E = Math.cos(v), f = Math.sin(v);
                    x = q(n.longArc, .001 > v - x - Math.PI ? 0 : 1);
                    m.push(["M", a + e * g, c + h * l], ["A", e, h, 0, x, q(n.clockwise, 1), a + e * E, c + h * f]);
                    d(k) && m.push(G ? ["M", a + k * E, c + k * f] : ["L", a + k * E, c + k * f], ["A", k, k, 0, x, d(n.clockwise) ?
                        1 - n.clockwise : 0, a + k * g, c + k * l]);
                    G || m.push(["Z"])
                }
                return m
            }, callout: function (a, c, h, k, n) {
                var d = Math.min(n && n.r || 0, h, k), m = d + 6, e = n && n.anchorX;
                n = n && n.anchorY || 0;
                var x = O(a, c, h, k, {r: d});
                if (!K(e)) return x;
                a + e >= h ? n > c + m && n < c + k - m ? x.splice(3, 1, ["L", a + h, n - 6], ["L", a + h + 6, n], ["L", a + h, n + 6], ["L", a + h, c + k - d]) : x.splice(3, 1, ["L", a + h, k / 2], ["L", e, n], ["L", a + h, k / 2], ["L", a + h, c + k - d]) : 0 >= a + e ? n > c + m && n < c + k - m ? x.splice(7, 1, ["L", a, n + 6], ["L", a - 6, n], ["L", a, n - 6], ["L", a, c + d]) : x.splice(7, 1, ["L", a, k / 2], ["L", e, n], ["L", a, k / 2], ["L", a, c + d]) :
                    n && n > k && e > a + m && e < a + h - m ? x.splice(5, 1, ["L", e + 6, c + k], ["L", e, c + k + 6], ["L", e - 6, c + k], ["L", a + d, c + k]) : n && 0 > n && e > a + m && e < a + h - m && x.splice(1, 1, ["L", e - 6, c], ["L", e, c - 6], ["L", e + 6, c], ["L", h - d, c]);
                return x
            }
        };
        f.SVGRenderer = r;
        f.Renderer = f.SVGRenderer;
        return f.Renderer
    });
    J(b, "Core/Renderer/HTML/HTMLElement.js", [b["Core/Globals.js"], b["Core/Renderer/SVG/SVGElement.js"], b["Core/Utilities.js"]], function (b, f, D) {
        var B = b.isFirefox, C = b.isMS, A = b.isWebKit, t = b.win, r = D.css, p = D.defined, l = D.extend, g = D.pick,
            e = D.pInt;
        l(f.prototype,
            {
                htmlCss: function (d) {
                    var e = "SPAN" === this.element.tagName && d && "width" in d, f = g(e && d.width, void 0);
                    if (e) {
                        delete d.width;
                        this.textWidth = f;
                        var b = !0
                    }
                    d && "ellipsis" === d.textOverflow && (d.whiteSpace = "nowrap", d.overflow = "hidden");
                    this.styles = l(this.styles, d);
                    r(this.element, d);
                    b && this.htmlUpdateTransform();
                    return this
                }, htmlGetBBox: function () {
                    var d = this.element;
                    return {x: d.offsetLeft, y: d.offsetTop, width: d.offsetWidth, height: d.offsetHeight}
                }, htmlUpdateTransform: function () {
                    if (this.added) {
                        var d = this.renderer, g = this.element,
                            l = this.translateX || 0, f = this.translateY || 0, b = this.x || 0, F = this.y || 0,
                            w = this.textAlign || "left", z = {left: 0, center: .5, right: 1}[w], q = this.styles;
                        q = q && q.whiteSpace;
                        r(g, {marginLeft: l, marginTop: f});
                        !d.styledMode && this.shadows && this.shadows.forEach(function (a) {
                            r(a, {marginLeft: l + 1, marginTop: f + 1})
                        });
                        this.inverted && [].forEach.call(g.childNodes, function (a) {
                            d.invertChild(a, g)
                        });
                        if ("SPAN" === g.tagName) {
                            var m = this.rotation, c = void 0;
                            c = this.textWidth && e(this.textWidth);
                            var n = [m, w, g.innerHTML, this.textWidth, this.textAlign].join(),
                                a;
                            (a = c !== this.oldTextWidth) && !(a = c > this.oldTextWidth) && ((a = this.textPxLength) || (r(g, {
                                width: "",
                                whiteSpace: q || "nowrap"
                            }), a = g.offsetWidth), a = a > c);
                            a && (/[ \-]/.test(g.textContent || g.innerText) || "ellipsis" === g.style.textOverflow) ? (r(g, {
                                width: c + "px",
                                display: "block",
                                whiteSpace: q || "normal"
                            }), this.oldTextWidth = c, this.hasBoxWidthChanged = !0) : this.hasBoxWidthChanged = !1;
                            n !== this.cTT && (c = d.fontMetrics(g.style.fontSize, g).b, !p(m) || m === (this.oldRotation || 0) && w === this.oldAlign || this.setSpanRotation(m, z, c), this.getSpanCorrection(!p(m) &&
                                this.textPxLength || g.offsetWidth, c, z, m, w));
                            r(g, {left: b + (this.xCorr || 0) + "px", top: F + (this.yCorr || 0) + "px"});
                            this.cTT = n;
                            this.oldRotation = m;
                            this.oldAlign = w
                        }
                    } else this.alignOnAdd = !0
                }, setSpanRotation: function (d, e, g) {
                    var l = {},
                        f = C && !/Edge/.test(t.navigator.userAgent) ? "-ms-transform" : A ? "-webkit-transform" : B ? "MozTransform" : t.opera ? "-o-transform" : void 0;
                    f && (l[f] = l.transform = "rotate(" + d + "deg)", l[f + (B ? "Origin" : "-origin")] = l.transformOrigin = 100 * e + "% " + g + "px", r(this.element, l))
                }, getSpanCorrection: function (d, e, g) {
                    this.xCorr =
                        -d * g;
                    this.yCorr = -e
                }
            });
        return f
    });
    J(b, "Core/Renderer/HTML/HTMLRenderer.js", [b["Core/Renderer/HTML/AST.js"], b["Core/Renderer/SVG/SVGElement.js"], b["Core/Renderer/SVG/SVGRenderer.js"], b["Core/Utilities.js"]], function (b, f, D, y) {
        var B = y.attr, A = y.createElement, t = y.extend, r = y.pick;
        t(D.prototype, {
            html: function (p, l, g) {
                var e = this.createElement("span"), d = e.element, u = e.renderer, H = u.isSVG, I = function (d, e) {
                    ["opacity", "visibility"].forEach(function (g) {
                        d[g + "Setter"] = function (l, q, m) {
                            var c = d.div ? d.div.style : e;
                            f.prototype[g +
                            "Setter"].call(this, l, q, m);
                            c && (c[q] = l)
                        }
                    });
                    d.addedSetters = !0
                };
                e.textSetter = function (d) {
                    d !== this.textStr && (delete this.bBox, delete this.oldTextWidth, b.setElementHTML(this.element, r(d, "")), this.textStr = d, e.doTransform = !0)
                };
                H && I(e, e.element.style);
                e.xSetter = e.ySetter = e.alignSetter = e.rotationSetter = function (d, g) {
                    "align" === g ? e.alignValue = e.textAlign = d : e[g] = d;
                    e.doTransform = !0
                };
                e.afterSetters = function () {
                    this.doTransform && (this.htmlUpdateTransform(), this.doTransform = !1)
                };
                e.attr({text: p, x: Math.round(l), y: Math.round(g)}).css({position: "absolute"});
                u.styledMode || e.css({fontFamily: this.style.fontFamily, fontSize: this.style.fontSize});
                d.style.whiteSpace = "nowrap";
                e.css = e.htmlCss;
                H && (e.add = function (g) {
                    var l = u.box.parentNode, f = [];
                    if (this.parentGroup = g) {
                        var b = g.div;
                        if (!b) {
                            for (; g;) f.push(g), g = g.parentGroup;
                            f.reverse().forEach(function (d) {
                                function m(c, h) {
                                    d[h] = c;
                                    "translateX" === h ? a.left = c + "px" : a.top = c + "px";
                                    d.doTransform = !0
                                }

                                var c = B(d.element, "class"), n = d.styles || {};
                                b = d.div = d.div || A("div", c ? {className: c} : void 0, {
                                    position: "absolute",
                                    left: (d.translateX || 0) +
                                        "px",
                                    top: (d.translateY || 0) + "px",
                                    display: d.display,
                                    opacity: d.opacity,
                                    cursor: n.cursor,
                                    pointerEvents: n.pointerEvents
                                }, b || l);
                                var a = b.style;
                                t(d, {
                                    classSetter: function (a) {
                                        return function (c) {
                                            this.element.setAttribute("class", c);
                                            a.className = c
                                        }
                                    }(b), on: function () {
                                        f[0].div && e.on.apply({element: f[0].div, onEvents: e.onEvents}, arguments);
                                        return d
                                    }, translateXSetter: m, translateYSetter: m
                                });
                                d.addedSetters || I(d)
                            })
                        }
                    } else b = l;
                    b.appendChild(d);
                    e.added = !0;
                    e.alignOnAdd && e.htmlUpdateTransform();
                    return e
                });
                return e
            }
        });
        return D
    });
    J(b, "Core/Axis/Tick.js", [b["Core/FormatUtilities.js"], b["Core/Globals.js"], b["Core/Utilities.js"]], function (b, f, D) {
        var B = f.deg2rad, C = D.clamp, A = D.correctFloat, t = D.defined, r = D.destroyObjectProperties, p = D.extend,
            l = D.fireEvent, g = D.isNumber, e = D.merge, d = D.objectEach, u = D.pick;
        "";
        D = function () {
            function f(d, e, g, f, b) {
                this.isNewLabel = this.isNew = !0;
                this.axis = d;
                this.pos = e;
                this.type = g || "";
                this.parameters = b || {};
                this.tickmarkOffset = this.parameters.tickmarkOffset;
                this.options = this.parameters.options;
                l(this, "init");
                g || f || this.addLabel()
            }

            f.prototype.addLabel = function () {
                var d = this, e = d.axis, f = e.options, w = e.chart, z = e.categories, q = e.logarithmic, m = e.names,
                    c = d.pos, n = u(d.options && d.options.labels, f.labels), a = e.tickPositions, k = c === a[0],
                    h = c === a[a.length - 1], v = d.label, E = (!n.step || 1 === n.step) && 1 === e.tickInterval;
                a = a.info;
                var L, M;
                z = this.parameters.category || (z ? u(z[c], m[c], c) : c);
                q && g(z) && (z = A(q.lin2log(z)));
                if (e.dateTime && a) {
                    var r = w.time.resolveDTLFormat(f.dateTimeLabelFormats[!f.grid && a.higherRanks[c] || a.unitName]);
                    var H =
                        r.main
                }
                d.isFirst = k;
                d.isLast = h;
                var R = {
                    axis: e,
                    chart: w,
                    dateTimeLabelFormat: H,
                    isFirst: k,
                    isLast: h,
                    pos: c,
                    tick: d,
                    tickPositionInfo: a,
                    value: z
                };
                l(this, "labelFormat", R);
                var O = function (a) {
                    return n.formatter ? n.formatter.call(a, a) : n.format ? (a.text = e.defaultLabelFormatter.call(a), b.format(n.format, a, w)) : e.defaultLabelFormatter.call(a, a)
                };
                f = O.call(R, R);
                if (M = r && r.list) d.shortenLabel = function () {
                    for (L = 0; L < M.length; L++) if (p(R, {dateTimeLabelFormat: M[L]}), v.attr({text: O.call(R, R)}), v.getBBox().width < e.getSlotWidth(d) -
                    2 * n.padding) return;
                    v.attr({text: ""})
                };
                E && e._addedPlotLB && d.moveLabel(f, n);
                t(v) || d.movedLabel ? v && v.textStr !== f && !E && (!v.textWidth || n.style.width || v.styles.width || v.css({width: null}), v.attr({text: f}), v.textPxLength = v.getBBox().width) : (d.label = v = d.createLabel({
                    x: 0,
                    y: 0
                }, f, n), d.rotation = 0)
            };
            f.prototype.createLabel = function (d, g, l) {
                var f = this.axis, b = f.chart;
                if (d = t(g) && l.enabled ? b.renderer.text(g, d.x, d.y, l.useHTML).add(f.labelGroup) : null) b.styledMode || d.css(e(l.style)), d.textPxLength = d.getBBox().width;
                return d
            };
            f.prototype.destroy = function () {
                r(this, this.axis)
            };
            f.prototype.getPosition = function (d, e, g, f) {
                var b = this.axis, q = b.chart, m = f && q.oldChartHeight || q.chartHeight;
                d = {
                    x: d ? A(b.translate(e + g, null, null, f) + b.transB) : b.left + b.offset + (b.opposite ? (f && q.oldChartWidth || q.chartWidth) - b.right - b.left : 0),
                    y: d ? m - b.bottom + b.offset - (b.opposite ? b.height : 0) : A(m - b.translate(e + g, null, null, f) - b.transB)
                };
                d.y = C(d.y, -1E5, 1E5);
                l(this, "afterGetPosition", {pos: d});
                return d
            };
            f.prototype.getLabelPosition = function (d, e, g, f, b, q, m, c) {
                var n =
                        this.axis, a = n.transA, k = n.isLinked && n.linkedParent ? n.linkedParent.reversed : n.reversed,
                    h = n.staggerLines, v = n.tickRotCorr || {x: 0, y: 0}, E = b.y,
                    w = f || n.reserveSpaceDefault ? 0 : -n.labelOffset * ("center" === n.labelAlign ? .5 : 1), p = {};
                t(E) || (E = 0 === n.side ? g.rotation ? -8 : -g.getBBox().height : 2 === n.side ? v.y + 8 : Math.cos(g.rotation * B) * (v.y - g.getBBox(!1, 0).height / 2));
                d = d + b.x + w + v.x - (q && f ? q * a * (k ? -1 : 1) : 0);
                e = e + E - (q && !f ? q * a * (k ? 1 : -1) : 0);
                h && (g = m / (c || 1) % h, n.opposite && (g = h - g - 1), e += n.labelOffset / h * g);
                p.x = d;
                p.y = Math.round(e);
                l(this, "afterGetLabelPosition",
                    {pos: p, tickmarkOffset: q, index: m});
                return p
            };
            f.prototype.getLabelSize = function () {
                return this.label ? this.label.getBBox()[this.axis.horiz ? "height" : "width"] : 0
            };
            f.prototype.getMarkPath = function (d, e, g, l, f, q) {
                return q.crispLine([["M", d, e], ["L", d + (f ? 0 : -g), e + (f ? g : 0)]], l)
            };
            f.prototype.handleOverflow = function (d) {
                var e = this.axis, g = e.options.labels, l = d.x, f = e.chart.chartWidth, q = e.chart.spacing,
                    m = u(e.labelLeft, Math.min(e.pos, q[3]));
                q = u(e.labelRight, Math.max(e.isRadial ? 0 : e.pos + e.len, f - q[1]));
                var c = this.label, n = this.rotation,
                    a = {left: 0, center: .5, right: 1}[e.labelAlign || c.attr("align")], k = c.getBBox().width,
                    h = e.getSlotWidth(this), v = h, b = 1, p, M = {};
                if (n || "justify" !== g.overflow) 0 > n && l - a * k < m ? p = Math.round(l / Math.cos(n * B) - m) : 0 < n && l + a * k > q && (p = Math.round((f - l) / Math.cos(n * B))); else if (f = l + (1 - a) * k, l - a * k < m ? v = d.x + v * (1 - a) - m : f > q && (v = q - d.x + v * a, b = -1), v = Math.min(h, v), v < h && "center" === e.labelAlign && (d.x += b * (h - v - a * (h - Math.min(k, v)))), k > v || e.autoRotation && (c.styles || {}).width) p = v;
                p && (this.shortenLabel ? this.shortenLabel() : (M.width = Math.floor(p) +
                    "px", (g.style || {}).textOverflow || (M.textOverflow = "ellipsis"), c.css(M)))
            };
            f.prototype.moveLabel = function (e, g) {
                var l = this, f = l.label, b = !1, q = l.axis, m = q.reversed;
                f && f.textStr === e ? (l.movedLabel = f, b = !0, delete l.label) : d(q.ticks, function (c) {
                    b || c.isNew || c === l || !c.label || c.label.textStr !== e || (l.movedLabel = c.label, b = !0, c.labelPos = l.movedLabel.xy, delete c.label)
                });
                if (!b && (l.labelPos || f)) {
                    var c = l.labelPos || f.xy;
                    f = q.horiz ? m ? 0 : q.width + q.left : c.x;
                    q = q.horiz ? c.y : m ? q.width + q.left : 0;
                    l.movedLabel = l.createLabel({x: f, y: q},
                        e, g);
                    l.movedLabel && l.movedLabel.attr({opacity: 0})
                }
            };
            f.prototype.render = function (d, e, g) {
                var f = this.axis, b = f.horiz, q = this.pos, m = u(this.tickmarkOffset, f.tickmarkOffset);
                q = this.getPosition(b, q, m, e);
                m = q.x;
                var c = q.y;
                f = b && m === f.pos + f.len || !b && c === f.pos ? -1 : 1;
                b = u(g, this.label && this.label.newOpacity, 1);
                g = u(g, 1);
                this.isActive = !0;
                this.renderGridLine(e, g, f);
                this.renderMark(q, g, f);
                this.renderLabel(q, e, b, d);
                this.isNew = !1;
                l(this, "afterRender")
            };
            f.prototype.renderGridLine = function (d, e, g) {
                var l = this.axis, f = l.options,
                    b = this.gridLine, m = {}, c = this.pos, n = this.type,
                    a = u(this.tickmarkOffset, l.tickmarkOffset), k = l.chart.renderer, h = f.gridLineWidth,
                    v = f.gridLineColor, E = f.gridLineDashStyle;
                "minor" === this.type && (h = f.minorGridLineWidth, v = f.minorGridLineColor, E = f.minorGridLineDashStyle);
                b || (l.chart.styledMode || (m.stroke = v, m["stroke-width"] = h || 0, m.dashstyle = E), n || (m.zIndex = 1), d && (e = 0), this.gridLine = b = k.path().attr(m).addClass("highcharts-" + (n ? n + "-" : "") + "grid-line").add(l.gridGroup));
                if (b && (g = l.getPlotLinePath({
                    value: c + a, lineWidth: b.strokeWidth() *
                        g, force: "pass", old: d
                }))) b[d || this.isNew ? "attr" : "animate"]({d: g, opacity: e})
            };
            f.prototype.renderMark = function (d, e, g) {
                var l = this.axis, f = l.options, b = l.chart.renderer, m = this.type,
                    c = l.tickSize(m ? m + "Tick" : "tick"), n = this.mark, a = !n, k = d.x;
                d = d.y;
                var h = u(f["minor" !== m ? "tickWidth" : "minorTickWidth"], !m && l.isXAxis ? 1 : 0);
                f = f["minor" !== m ? "tickColor" : "minorTickColor"];
                c && (l.opposite && (c[0] = -c[0]), a && (this.mark = n = b.path().addClass("highcharts-" + (m ? m + "-" : "") + "tick").add(l.axisGroup), l.chart.styledMode || n.attr({
                    stroke: f,
                    "stroke-width": h
                })), n[a ? "attr" : "animate"]({
                    d: this.getMarkPath(k, d, c[0], n.strokeWidth() * g, l.horiz, b),
                    opacity: e
                }))
            };
            f.prototype.renderLabel = function (d, e, l, f) {
                var b = this.axis, q = b.horiz, m = b.options, c = this.label, n = m.labels, a = n.step;
                b = u(this.tickmarkOffset, b.tickmarkOffset);
                var k = !0, h = d.x;
                d = d.y;
                c && g(h) && (c.xy = d = this.getLabelPosition(h, d, c, q, n, b, f, a), this.isFirst && !this.isLast && !m.showFirstLabel || this.isLast && !this.isFirst && !m.showLastLabel ? k = !1 : !q || n.step || n.rotation || e || 0 === l || this.handleOverflow(d), a &&
                f % a && (k = !1), k && g(d.y) ? (d.opacity = l, c[this.isNewLabel ? "attr" : "animate"](d), this.isNewLabel = !1) : (c.attr("y", -9999), this.isNewLabel = !0))
            };
            f.prototype.replaceMovedLabel = function () {
                var d = this.label, e = this.axis, g = e.reversed;
                if (d && !this.isNew) {
                    var l = e.horiz ? g ? e.left : e.width + e.left : d.xy.x;
                    g = e.horiz ? d.xy.y : g ? e.width + e.top : e.top;
                    d.animate({x: l, y: g, opacity: 0}, void 0, d.destroy);
                    delete this.label
                }
                e.isDirty = !0;
                this.label = this.movedLabel;
                delete this.movedLabel
            };
            return f
        }();
        f.Tick = D;
        return f.Tick
    });
    J(b, "Core/Axis/Axis.js",
        [b["Core/Animation/AnimationUtilities.js"], b["Core/Color/Color.js"], b["Core/Globals.js"], b["Core/Color/Palette.js"], b["Core/Options.js"], b["Core/Axis/Tick.js"], b["Core/Utilities.js"]], function (b, f, D, y, C, A, t) {
            var r = b.animObject, p = C.defaultOptions, l = t.addEvent, g = t.arrayMax, e = t.arrayMin, d = t.clamp,
                u = t.correctFloat, H = t.defined, I = t.destroyObjectProperties, B = t.erase, F = t.error,
                w = t.extend, z = t.fireEvent, q = t.getMagnitude, m = t.isArray, c = t.isFunction, n = t.isNumber,
                a = t.isString, k = t.merge, h = t.normalizeTickInterval,
                v = t.objectEach, E = t.pick, L = t.relativeLength, M = t.removeEvent, S = t.splat, Y = t.syncTimeout;
            "";
            var R = D.deg2rad;
            b = function () {
                function b(a, c) {
                    this.zoomEnabled = this.width = this.visible = this.userOptions = this.translationSlope = this.transB = this.transA = this.top = this.ticks = this.tickRotCorr = this.tickPositions = this.tickmarkOffset = this.tickInterval = this.tickAmount = this.side = this.series = this.right = this.positiveValuesOnly = this.pos = this.pointRangePadding = this.pointRange = this.plotLinesAndBandsGroups = this.plotLinesAndBands =
                        this.paddedTicks = this.overlap = this.options = this.offset = this.names = this.minPixelPadding = this.minorTicks = this.minorTickInterval = this.min = this.maxLabelLength = this.max = this.len = this.left = this.labelFormatter = this.labelEdge = this.isLinked = this.height = this.hasVisibleSeries = this.hasNames = this.coll = this.closestPointRange = this.chart = this.categories = this.bottom = this.alternateBands = void 0;
                    this.init(a, c)
                }

                b.prototype.init = function (a, h) {
                    var k = h.isX, d = this;
                    d.chart = a;
                    d.horiz = a.inverted && !d.isZAxis ? !k : k;
                    d.isXAxis = k;
                    d.coll = d.coll || (k ? "xAxis" : "yAxis");
                    z(this, "init", {userOptions: h});
                    d.opposite = E(h.opposite, d.opposite);
                    d.side = E(h.side, d.side, d.horiz ? d.opposite ? 0 : 2 : d.opposite ? 1 : 3);
                    d.setOptions(h);
                    var e = this.options, m = e.labels, x = e.type;
                    d.userOptions = h;
                    d.minPixelPadding = 0;
                    d.reversed = E(e.reversed, d.reversed);
                    d.visible = e.visible;
                    d.zoomEnabled = e.zoomEnabled;
                    d.hasNames = "category" === x || !0 === e.categories;
                    d.categories = e.categories || d.hasNames;
                    d.names || (d.names = [], d.names.keys = {});
                    d.plotLinesAndBandsGroups = {};
                    d.positiveValuesOnly =
                        !!d.logarithmic;
                    d.isLinked = H(e.linkedTo);
                    d.ticks = {};
                    d.labelEdge = [];
                    d.minorTicks = {};
                    d.plotLinesAndBands = [];
                    d.alternateBands = {};
                    d.len = 0;
                    d.minRange = d.userMinRange = e.minRange || e.maxZoom;
                    d.range = e.range;
                    d.offset = e.offset || 0;
                    d.max = null;
                    d.min = null;
                    h = E(e.crosshair, S(a.options.tooltip.crosshairs)[k ? 0 : 1]);
                    d.crosshair = !0 === h ? {} : h;
                    h = d.options.events;
                    -1 === a.axes.indexOf(d) && (k ? a.axes.splice(a.xAxis.length, 0, d) : a.axes.push(d), a[d.coll].push(d));
                    d.series = d.series || [];
                    a.inverted && !d.isZAxis && k && "undefined" === typeof d.reversed &&
                    (d.reversed = !0);
                    d.labelRotation = n(m.rotation) ? m.rotation : void 0;
                    v(h, function (a, h) {
                        c(a) && l(d, h, a)
                    });
                    z(this, "afterInit")
                };
                b.prototype.setOptions = function (a) {
                    this.options = k(b.defaultOptions, "yAxis" === this.coll && b.defaultYAxisOptions, [b.defaultTopAxisOptions, b.defaultRightAxisOptions, b.defaultBottomAxisOptions, b.defaultLeftAxisOptions][this.side], k(p[this.coll], a));
                    z(this, "afterSetOptions", {userOptions: a})
                };
                b.prototype.defaultLabelFormatter = function () {
                    var a = this.axis, c = n(this.value) ? this.value : NaN, h =
                        a.chart.time, d = this.dateTimeLabelFormat, k = p.lang, e = k.numericSymbols;
                    k = k.numericSymbolMagnitude || 1E3;
                    var m = e && e.length, v = a.logarithmic ? Math.abs(c) : a.tickInterval,
                        g = this.chart.numberFormatter;
                    if (a.categories) var b = "" + this.value; else if (d) b = h.dateFormat(d, c); else if (m && 1E3 <= v) for (; m-- && "undefined" === typeof b;) a = Math.pow(k, m + 1), v >= a && 0 === 10 * c % a && null !== e[m] && 0 !== c && (b = g(c / a, -1) + e[m]);
                    "undefined" === typeof b && (b = 1E4 <= Math.abs(c) ? g(c, -1) : g(c, -1, void 0, ""));
                    return b
                };
                b.prototype.getSeriesExtremes = function () {
                    var a =
                        this, c = a.chart, h;
                    z(this, "getSeriesExtremes", null, function () {
                        a.hasVisibleSeries = !1;
                        a.dataMin = a.dataMax = a.threshold = null;
                        a.softThreshold = !a.isXAxis;
                        a.stacking && a.stacking.buildStacks();
                        a.series.forEach(function (d) {
                            if (d.visible || !c.options.chart.ignoreHiddenSeries) {
                                var k = d.options, e = k.threshold;
                                a.hasVisibleSeries = !0;
                                a.positiveValuesOnly && 0 >= e && (e = null);
                                if (a.isXAxis) {
                                    if (k = d.xData, k.length) {
                                        k = a.logarithmic ? k.filter(a.validatePositiveValue) : k;
                                        h = d.getXExtremes(k);
                                        var m = h.min;
                                        var v = h.max;
                                        n(m) || m instanceof
                                        Date || (k = k.filter(n), h = d.getXExtremes(k), m = h.min, v = h.max);
                                        k.length && (a.dataMin = Math.min(E(a.dataMin, m), m), a.dataMax = Math.max(E(a.dataMax, v), v))
                                    }
                                } else if (d = d.applyExtremes(), n(d.dataMin) && (m = d.dataMin, a.dataMin = Math.min(E(a.dataMin, m), m)), n(d.dataMax) && (v = d.dataMax, a.dataMax = Math.max(E(a.dataMax, v), v)), H(e) && (a.threshold = e), !k.softThreshold || a.positiveValuesOnly) a.softThreshold = !1
                            }
                        })
                    });
                    z(this, "afterGetSeriesExtremes")
                };
                b.prototype.translate = function (a, c, h, d, k, e) {
                    var m = this.linkedParent || this, v = 1, x =
                        0, g = d && m.old ? m.old.transA : m.transA;
                    d = d && m.old ? m.old.min : m.min;
                    var b = m.minPixelPadding;
                    k = (m.isOrdinal || m.brokenAxis && m.brokenAxis.hasBreaks || m.logarithmic && k) && m.lin2val;
                    g || (g = m.transA);
                    h && (v *= -1, x = m.len);
                    m.reversed && (v *= -1, x -= v * (m.sector || m.len));
                    c ? (a = (a * v + x - b) / g + d, k && (a = m.lin2val(a))) : (k && (a = m.val2lin(a)), a = n(d) ? v * (a - d) * g + x + v * b + (n(e) ? g * e : 0) : void 0);
                    return a
                };
                b.prototype.toPixels = function (a, c) {
                    return this.translate(a, !1, !this.horiz, null, !0) + (c ? 0 : this.pos)
                };
                b.prototype.toValue = function (a, c) {
                    return this.translate(a -
                        (c ? 0 : this.pos), !0, !this.horiz, null, !0)
                };
                b.prototype.getPlotLinePath = function (a) {
                    function c(a, c, h) {
                        if ("pass" !== f && a < c || a > h) f ? a = d(a, c, h) : M = !0;
                        return a
                    }

                    var h = this, k = h.chart, e = h.left, m = h.top, v = a.old, g = a.value, b = a.translatedValue,
                        l = a.lineWidth, f = a.force, G, q, p, L, w = v && k.oldChartHeight || k.chartHeight,
                        u = v && k.oldChartWidth || k.chartWidth, M, r = h.transB;
                    a = {value: g, lineWidth: l, old: v, force: f, acrossPanes: a.acrossPanes, translatedValue: b};
                    z(this, "getPlotLinePath", a, function (a) {
                        b = E(b, h.translate(g, null, null, v));
                        b = d(b,
                            -1E5, 1E5);
                        G = p = Math.round(b + r);
                        q = L = Math.round(w - b - r);
                        n(b) ? h.horiz ? (q = m, L = w - h.bottom, G = p = c(G, e, e + h.width)) : (G = e, p = u - h.right, q = L = c(q, m, m + h.height)) : (M = !0, f = !1);
                        a.path = M && !f ? null : k.renderer.crispLine([["M", G, q], ["L", p, L]], l || 1)
                    });
                    return a.path
                };
                b.prototype.getLinearTickPositions = function (a, c, h) {
                    var d = u(Math.floor(c / a) * a);
                    h = u(Math.ceil(h / a) * a);
                    var k = [], n;
                    u(d + a) === d && (n = 20);
                    if (this.single) return [c];
                    for (c = d; c <= h;) {
                        k.push(c);
                        c = u(c + a, n);
                        if (c === e) break;
                        var e = c
                    }
                    return k
                };
                b.prototype.getMinorTickInterval = function () {
                    var a =
                        this.options;
                    return !0 === a.minorTicks ? E(a.minorTickInterval, "auto") : !1 === a.minorTicks ? null : a.minorTickInterval
                };
                b.prototype.getMinorTickPositions = function () {
                    var a = this.options, c = this.tickPositions, h = this.minorTickInterval, d = [],
                        k = this.pointRangePadding || 0, n = this.min - k;
                    k = this.max + k;
                    var e = k - n;
                    if (e && e / h < this.len / 3) {
                        var m = this.logarithmic;
                        if (m) this.paddedTicks.forEach(function (a, c, k) {
                            c && d.push.apply(d, m.getLogTickPositions(h, k[c - 1], k[c], !0))
                        }); else if (this.dateTime && "auto" === this.getMinorTickInterval()) d =
                            d.concat(this.getTimeTicks(this.dateTime.normalizeTimeTickInterval(h), n, k, a.startOfWeek)); else for (a = n + (c[0] - n) % h; a <= k && a !== d[0]; a += h) d.push(a)
                    }
                    0 !== d.length && this.trimTicks(d);
                    return d
                };
                b.prototype.adjustForMinRange = function () {
                    var a = this.options, c = this.min, h = this.max, d = this.logarithmic, k = 0, n, m, v, b;
                    this.isXAxis && "undefined" === typeof this.minRange && !d && (H(a.min) || H(a.max) ? this.minRange = null : (this.series.forEach(function (a) {
                        v = a.xData;
                        b = a.xIncrement ? 1 : v.length - 1;
                        if (1 < v.length) for (n = b; 0 < n; n--) if (m = v[n] -
                            v[n - 1], !k || m < k) k = m
                    }), this.minRange = Math.min(5 * k, this.dataMax - this.dataMin)));
                    if (h - c < this.minRange) {
                        var l = this.dataMax - this.dataMin >= this.minRange;
                        var f = this.minRange;
                        var q = (f - h + c) / 2;
                        q = [c - q, E(a.min, c - q)];
                        l && (q[2] = this.logarithmic ? this.logarithmic.log2lin(this.dataMin) : this.dataMin);
                        c = g(q);
                        h = [c + f, E(a.max, c + f)];
                        l && (h[2] = d ? d.log2lin(this.dataMax) : this.dataMax);
                        h = e(h);
                        h - c < f && (q[0] = h - f, q[1] = E(a.min, h - f), c = g(q))
                    }
                    this.min = c;
                    this.max = h
                };
                b.prototype.getClosest = function () {
                    var a;
                    this.categories ? a = 1 : this.series.forEach(function (c) {
                        var h =
                            c.closestPointRange, d = c.visible || !c.chart.options.chart.ignoreHiddenSeries;
                        !c.noSharedTooltip && H(h) && d && (a = H(a) ? Math.min(a, h) : h)
                    });
                    return a
                };
                b.prototype.nameToX = function (a) {
                    var c = m(this.categories), h = c ? this.categories : this.names, d = a.options.x;
                    a.series.requireSorting = !1;
                    H(d) || (d = this.options.uniqueNames ? c ? h.indexOf(a.name) : E(h.keys[a.name], -1) : a.series.autoIncrement());
                    if (-1 === d) {
                        if (!c) var k = h.length
                    } else k = d;
                    "undefined" !== typeof k && (this.names[k] = a.name, this.names.keys[a.name] = k);
                    return k
                };
                b.prototype.updateNames =
                    function () {
                        var a = this, c = this.names;
                        0 < c.length && (Object.keys(c.keys).forEach(function (a) {
                            delete c.keys[a]
                        }), c.length = 0, this.minRange = this.userMinRange, (this.series || []).forEach(function (c) {
                            c.xIncrement = null;
                            if (!c.points || c.isDirtyData) a.max = Math.max(a.max, c.xData.length - 1), c.processData(), c.generatePoints();
                            c.data.forEach(function (h, d) {
                                if (h && h.options && "undefined" !== typeof h.name) {
                                    var k = a.nameToX(h);
                                    "undefined" !== typeof k && k !== h.x && (h.x = k, c.xData[d] = k)
                                }
                            })
                        }))
                    };
                b.prototype.setAxisTranslation = function () {
                    var c =
                            this, h = c.max - c.min, d = c.axisPointRange || 0, k = 0, n = 0, e = c.linkedParent,
                        m = !!c.categories, v = c.transA, g = c.isXAxis;
                    if (g || m || d) {
                        var b = c.getClosest();
                        e ? (k = e.minPointOffset, n = e.pointRangePadding) : c.series.forEach(function (h) {
                            var e = m ? 1 : g ? E(h.options.pointRange, b, 0) : c.axisPointRange || 0,
                                v = h.options.pointPlacement;
                            d = Math.max(d, e);
                            if (!c.single || m) h = h.is("xrange") ? !g : g, k = Math.max(k, h && a(v) ? 0 : e / 2), n = Math.max(n, h && "on" === v ? 0 : e)
                        });
                        e = c.ordinal && c.ordinal.slope && b ? c.ordinal.slope / b : 1;
                        c.minPointOffset = k *= e;
                        c.pointRangePadding =
                            n *= e;
                        c.pointRange = Math.min(d, c.single && m ? 1 : h);
                        g && (c.closestPointRange = b)
                    }
                    c.translationSlope = c.transA = v = c.staticScale || c.len / (h + n || 1);
                    c.transB = c.horiz ? c.left : c.bottom;
                    c.minPixelPadding = v * k;
                    z(this, "afterSetAxisTranslation")
                };
                b.prototype.minFromRange = function () {
                    return this.max - this.range
                };
                b.prototype.setTickInterval = function (a) {
                    var c = this, d = c.chart, k = c.logarithmic, e = c.options, m = c.isXAxis, v = c.isLinked,
                        g = e.maxPadding, b = e.minPadding, l = e.tickInterval, f = e.tickPixelInterval,
                        G = c.categories, p = n(c.threshold) ?
                        c.threshold : null, L = c.softThreshold;
                    c.dateTime || G || v || this.getTickAmount();
                    var w = E(c.userMin, e.min);
                    var M = E(c.userMax, e.max);
                    if (v) {
                        c.linkedParent = d[c.coll][e.linkedTo];
                        var r = c.linkedParent.getExtremes();
                        c.min = E(r.min, r.dataMin);
                        c.max = E(r.max, r.dataMax);
                        e.type !== c.linkedParent.options.type && F(11, 1, d)
                    } else {
                        if (L && H(p)) if (c.dataMin >= p) r = p, b = 0; else if (c.dataMax <= p) {
                            var t = p;
                            g = 0
                        }
                        c.min = E(w, r, c.dataMin);
                        c.max = E(M, t, c.dataMax)
                    }
                    k && (c.positiveValuesOnly && !a && 0 >= Math.min(c.min, E(c.dataMin, c.min)) && F(10, 1, d), c.min =
                        u(k.log2lin(c.min), 16), c.max = u(k.log2lin(c.max), 16));
                    c.range && H(c.max) && (c.userMin = c.min = w = Math.max(c.dataMin, c.minFromRange()), c.userMax = M = c.max, c.range = null);
                    z(c, "foundExtremes");
                    c.beforePadding && c.beforePadding();
                    c.adjustForMinRange();
                    !(G || c.axisPointRange || c.stacking && c.stacking.usePercentage || v) && H(c.min) && H(c.max) && (d = c.max - c.min) && (!H(w) && b && (c.min -= d * b), !H(M) && g && (c.max += d * g));
                    n(c.userMin) || (n(e.softMin) && e.softMin < c.min && (c.min = w = e.softMin), n(e.floor) && (c.min = Math.max(c.min, e.floor)));
                    n(c.userMax) ||
                    (n(e.softMax) && e.softMax > c.max && (c.max = M = e.softMax), n(e.ceiling) && (c.max = Math.min(c.max, e.ceiling)));
                    L && H(c.dataMin) && (p = p || 0, !H(w) && c.min < p && c.dataMin >= p ? c.min = c.options.minRange ? Math.min(p, c.max - c.minRange) : p : !H(M) && c.max > p && c.dataMax <= p && (c.max = c.options.minRange ? Math.max(p, c.min + c.minRange) : p));
                    n(c.min) && n(c.max) && !this.chart.polar && c.min > c.max && (H(c.options.min) ? c.max = c.min : H(c.options.max) && (c.min = c.max));
                    c.tickInterval = c.min === c.max || "undefined" === typeof c.min || "undefined" === typeof c.max ? 1 :
                        v && c.linkedParent && !l && f === c.linkedParent.options.tickPixelInterval ? l = c.linkedParent.tickInterval : E(l, this.tickAmount ? (c.max - c.min) / Math.max(this.tickAmount - 1, 1) : void 0, G ? 1 : (c.max - c.min) * f / Math.max(c.len, f));
                    m && !a && c.series.forEach(function (a) {
                        a.processData(c.min !== (c.old && c.old.min) || c.max !== (c.old && c.old.max))
                    });
                    c.setAxisTranslation();
                    z(this, "initialAxisTranslation");
                    c.pointRange && !l && (c.tickInterval = Math.max(c.pointRange, c.tickInterval));
                    a = E(e.minTickInterval, c.dateTime && !c.series.some(function (a) {
                        return a.noSharedTooltip
                    }) ?
                        c.closestPointRange : 0);
                    !l && c.tickInterval < a && (c.tickInterval = a);
                    c.dateTime || c.logarithmic || l || (c.tickInterval = h(c.tickInterval, void 0, q(c.tickInterval), E(e.allowDecimals, .5 > c.tickInterval || void 0 !== this.tickAmount), !!this.tickAmount));
                    this.tickAmount || (c.tickInterval = c.unsquish());
                    this.setTickPositions()
                };
                b.prototype.setTickPositions = function () {
                    var a = this.options, c = a.tickPositions;
                    var h = this.getMinorTickInterval();
                    var d = a.tickPositioner, k = this.hasVerticalPanning(), n = "colorAxis" === this.coll, e = (n ||
                        !k) && a.startOnTick;
                    k = (n || !k) && a.endOnTick;
                    this.tickmarkOffset = this.categories && "between" === a.tickmarkPlacement && 1 === this.tickInterval ? .5 : 0;
                    this.minorTickInterval = "auto" === h && this.tickInterval ? this.tickInterval / 5 : h;
                    this.single = this.min === this.max && H(this.min) && !this.tickAmount && (parseInt(this.min, 10) === this.min || !1 !== a.allowDecimals);
                    this.tickPositions = h = c && c.slice();
                    !h && (this.ordinal && this.ordinal.positions || !((this.max - this.min) / this.tickInterval > Math.max(2 * this.len, 200)) ? h = this.dateTime ? this.getTimeTicks(this.dateTime.normalizeTimeTickInterval(this.tickInterval,
                        a.units), this.min, this.max, a.startOfWeek, this.ordinal && this.ordinal.positions, this.closestPointRange, !0) : this.logarithmic ? this.logarithmic.getLogTickPositions(this.tickInterval, this.min, this.max) : this.getLinearTickPositions(this.tickInterval, this.min, this.max) : (h = [this.min, this.max], F(19, !1, this.chart)), h.length > this.len && (h = [h[0], h.pop()], h[0] === h[1] && (h.length = 1)), this.tickPositions = h, d && (d = d.apply(this, [this.min, this.max]))) && (this.tickPositions = h = d);
                    this.paddedTicks = h.slice(0);
                    this.trimTicks(h,
                        e, k);
                    this.isLinked || (this.single && 2 > h.length && !this.categories && !this.series.some(function (a) {
                        return a.is("heatmap") && "between" === a.options.pointPlacement
                    }) && (this.min -= .5, this.max += .5), c || d || this.adjustTickAmount());
                    z(this, "afterSetTickPositions")
                };
                b.prototype.trimTicks = function (a, c, h) {
                    var d = a[0], k = a[a.length - 1], n = !this.isOrdinal && this.minPointOffset || 0;
                    z(this, "trimTicks");
                    if (!this.isLinked) {
                        if (c && -Infinity !== d) this.min = d; else for (; this.min - n > a[0];) a.shift();
                        if (h) this.max = k; else for (; this.max + n <
                                                         a[a.length - 1];) a.pop();
                        0 === a.length && H(d) && !this.options.tickPositions && a.push((k + d) / 2)
                    }
                };
                b.prototype.alignToOthers = function () {
                    var a = {}, c, h = this.options;
                    !1 !== this.chart.options.chart.alignTicks && h.alignTicks && !1 !== h.startOnTick && !1 !== h.endOnTick && !this.logarithmic && this.chart[this.coll].forEach(function (h) {
                        var d = h.options;
                        d = [h.horiz ? d.left : d.top, d.width, d.height, d.pane].join();
                        h.series.length && (a[d] ? c = !0 : a[d] = 1)
                    });
                    return c
                };
                b.prototype.getTickAmount = function () {
                    var a = this.options, c = a.tickAmount, h =
                        a.tickPixelInterval;
                    !H(a.tickInterval) && !c && this.len < h && !this.isRadial && !this.logarithmic && a.startOnTick && a.endOnTick && (c = 2);
                    !c && this.alignToOthers() && (c = Math.ceil(this.len / h) + 1);
                    4 > c && (this.finalTickAmt = c, c = 5);
                    this.tickAmount = c
                };
                b.prototype.adjustTickAmount = function () {
                    var a = this.options, c = this.tickInterval, h = this.tickPositions, d = this.tickAmount,
                        k = this.finalTickAmt, e = h && h.length, m = E(this.threshold, this.softThreshold ? 0 : null);
                    if (this.hasData() && n(this.min) && n(this.max)) {
                        if (e < d) {
                            for (; h.length < d;) h.length %
                            2 || this.min === m ? h.push(u(h[h.length - 1] + c)) : h.unshift(u(h[0] - c));
                            this.transA *= (e - 1) / (d - 1);
                            this.min = a.startOnTick ? h[0] : Math.min(this.min, h[0]);
                            this.max = a.endOnTick ? h[h.length - 1] : Math.max(this.max, h[h.length - 1])
                        } else e > d && (this.tickInterval *= 2, this.setTickPositions());
                        if (H(k)) {
                            for (c = a = h.length; c--;) (3 === k && 1 === c % 2 || 2 >= k && 0 < c && c < a - 1) && h.splice(c, 1);
                            this.finalTickAmt = void 0
                        }
                    }
                };
                b.prototype.setScale = function () {
                    var a, c = !1, h = !1;
                    this.series.forEach(function (a) {
                        c = c || a.isDirtyData || a.isDirty;
                        h = h || a.xAxis && a.xAxis.isDirty ||
                            !1
                    });
                    this.setAxisSize();
                    (a = this.len !== (this.old && this.old.len)) || c || h || this.isLinked || this.forceRedraw || this.userMin !== (this.old && this.old.userMin) || this.userMax !== (this.old && this.old.userMax) || this.alignToOthers() ? (this.stacking && this.stacking.resetStacks(), this.forceRedraw = !1, this.getSeriesExtremes(), this.setTickInterval(), this.isDirty || (this.isDirty = a || this.min !== (this.old && this.old.min) || this.max !== (this.old && this.old.max))) : this.stacking && this.stacking.cleanStacks();
                    c && this.panningState && (this.panningState.isDirty =
                        !0);
                    z(this, "afterSetScale")
                };
                b.prototype.setExtremes = function (a, c, h, d, k) {
                    var n = this, e = n.chart;
                    h = E(h, !0);
                    n.series.forEach(function (a) {
                        delete a.kdTree
                    });
                    k = w(k, {min: a, max: c});
                    z(n, "setExtremes", k, function () {
                        n.userMin = a;
                        n.userMax = c;
                        n.eventArgs = k;
                        h && e.redraw(d)
                    })
                };
                b.prototype.zoom = function (a, c) {
                    var h = this, d = this.dataMin, k = this.dataMax, n = this.options, e = Math.min(d, E(n.min, d)),
                        m = Math.max(k, E(n.max, k));
                    a = {newMin: a, newMax: c};
                    z(this, "zoom", a, function (a) {
                        var c = a.newMin, n = a.newMax;
                        if (c !== h.min || n !== h.max) h.allowZoomOutside ||
                        (H(d) && (c < e && (c = e), c > m && (c = m)), H(k) && (n < e && (n = e), n > m && (n = m))), h.displayBtn = "undefined" !== typeof c || "undefined" !== typeof n, h.setExtremes(c, n, !1, void 0, {trigger: "zoom"});
                        a.zoomed = !0
                    });
                    return a.zoomed
                };
                b.prototype.setAxisSize = function () {
                    var a = this.chart, c = this.options, h = c.offsets || [0, 0, 0, 0], d = this.horiz,
                        k = this.width = Math.round(L(E(c.width, a.plotWidth - h[3] + h[1]), a.plotWidth)),
                        n = this.height = Math.round(L(E(c.height, a.plotHeight - h[0] + h[2]), a.plotHeight)),
                        e = this.top = Math.round(L(E(c.top, a.plotTop + h[0]), a.plotHeight,
                            a.plotTop));
                    c = this.left = Math.round(L(E(c.left, a.plotLeft + h[3]), a.plotWidth, a.plotLeft));
                    this.bottom = a.chartHeight - n - e;
                    this.right = a.chartWidth - k - c;
                    this.len = Math.max(d ? k : n, 0);
                    this.pos = d ? c : e
                };
                b.prototype.getExtremes = function () {
                    var a = this.logarithmic;
                    return {
                        min: a ? u(a.lin2log(this.min)) : this.min,
                        max: a ? u(a.lin2log(this.max)) : this.max,
                        dataMin: this.dataMin,
                        dataMax: this.dataMax,
                        userMin: this.userMin,
                        userMax: this.userMax
                    }
                };
                b.prototype.getThreshold = function (a) {
                    var c = this.logarithmic, h = c ? c.lin2log(this.min) : this.min;
                    c = c ? c.lin2log(this.max) : this.max;
                    null === a || -Infinity === a ? a = h : Infinity === a ? a = c : h > a ? a = h : c < a && (a = c);
                    return this.translate(a, 0, 1, 0, 1)
                };
                b.prototype.autoLabelAlign = function (a) {
                    var c = (E(a, 0) - 90 * this.side + 720) % 360;
                    a = {align: "center"};
                    z(this, "autoLabelAlign", a, function (a) {
                        15 < c && 165 > c ? a.align = "right" : 195 < c && 345 > c && (a.align = "left")
                    });
                    return a.align
                };
                b.prototype.tickSize = function (a) {
                    var c = this.options, h = c["tick" === a ? "tickLength" : "minorTickLength"],
                        d = E(c["tick" === a ? "tickWidth" : "minorTickWidth"], "tick" === a && this.isXAxis &&
                        !this.categories ? 1 : 0);
                    if (d && h) {
                        "inside" === c[a + "Position"] && (h = -h);
                        var k = [h, d]
                    }
                    a = {tickSize: k};
                    z(this, "afterTickSize", a);
                    return a.tickSize
                };
                b.prototype.labelMetrics = function () {
                    var a = this.tickPositions && this.tickPositions[0] || 0;
                    return this.chart.renderer.fontMetrics(this.options.labels.style.fontSize, this.ticks[a] && this.ticks[a].label)
                };
                b.prototype.unsquish = function () {
                    var a = this.options.labels, c = this.horiz, h = this.tickInterval, d = h,
                        k = this.len / (((this.categories ? 1 : 0) + this.max - this.min) / h), e, m = a.rotation,
                        v = this.labelMetrics(), g, b = Number.MAX_VALUE, l = Math.max(this.max - this.min, 0),
                        f = function (a) {
                            var c = a / (k || 1);
                            c = 1 < c ? Math.ceil(c) : 1;
                            c * h > l && Infinity !== a && Infinity !== k && l && (c = Math.ceil(l / h));
                            return u(c * h)
                        };
                    if (c) {
                        if (!a.staggerLines && !a.step) if (n(m)) var q = [m]; else k < a.autoRotationLimit && (q = a.autoRotation);
                        q && q.forEach(function (a) {
                            if (a === m || a && -90 <= a && 90 >= a) {
                                g = f(Math.abs(v.h / Math.sin(R * a)));
                                var c = g + Math.abs(a / 360);
                                c < b && (b = c, e = a, d = g)
                            }
                        })
                    } else a.step || (d = f(v.h));
                    this.autoRotation = q;
                    this.labelRotation = E(e, n(m) ? m :
                        0);
                    return d
                };
                b.prototype.getSlotWidth = function (a) {
                    var c = this.chart, h = this.horiz, d = this.options.labels,
                        k = Math.max(this.tickPositions.length - (this.categories ? 0 : 1), 1), e = c.margin[3];
                    if (a && n(a.slotWidth)) return a.slotWidth;
                    if (h && 2 > d.step) return d.rotation ? 0 : (this.staggerLines || 1) * this.len / k;
                    if (!h) {
                        a = d.style.width;
                        if (void 0 !== a) return parseInt(String(a), 10);
                        if (e) return e - c.spacing[3]
                    }
                    return .33 * c.chartWidth
                };
                b.prototype.renderUnsquish = function () {
                    var c = this.chart, h = c.renderer, d = this.tickPositions, k = this.ticks,
                        n = this.options.labels, e = n.style, m = this.horiz, v = this.getSlotWidth(),
                        g = Math.max(1, Math.round(v - 2 * n.padding)), b = {}, l = this.labelMetrics(),
                        f = e.textOverflow, q = 0;
                    a(n.rotation) || (b.rotation = n.rotation || 0);
                    d.forEach(function (a) {
                        a = k[a];
                        a.movedLabel && a.replaceMovedLabel();
                        a && a.label && a.label.textPxLength > q && (q = a.label.textPxLength)
                    });
                    this.maxLabelLength = q;
                    if (this.autoRotation) q > g && q > l.h ? b.rotation = this.labelRotation : this.labelRotation = 0; else if (v) {
                        var E = g;
                        if (!f) {
                            var p = "clip";
                            for (g = d.length; !m && g--;) {
                                var L = d[g];
                                if (L = k[L].label) L.styles && "ellipsis" === L.styles.textOverflow ? L.css({textOverflow: "clip"}) : L.textPxLength > v && L.css({width: v + "px"}), L.getBBox().height > this.len / d.length - (l.h - l.f) && (L.specificTextOverflow = "ellipsis")
                            }
                        }
                    }
                    b.rotation && (E = q > .5 * c.chartHeight ? .33 * c.chartHeight : q, f || (p = "ellipsis"));
                    if (this.labelAlign = n.align || this.autoLabelAlign(this.labelRotation)) b.align = this.labelAlign;
                    d.forEach(function (a) {
                        var c = (a = k[a]) && a.label, h = e.width, d = {};
                        c && (c.attr(b), a.shortenLabel ? a.shortenLabel() : E && !h && "nowrap" !==
                        e.whiteSpace && (E < c.textPxLength || "SPAN" === c.element.tagName) ? (d.width = E + "px", f || (d.textOverflow = c.specificTextOverflow || p), c.css(d)) : c.styles && c.styles.width && !d.width && !h && c.css({width: null}), delete c.specificTextOverflow, a.rotation = b.rotation)
                    }, this);
                    this.tickRotCorr = h.rotCorr(l.b, this.labelRotation || 0, 0 !== this.side)
                };
                b.prototype.hasData = function () {
                    return this.series.some(function (a) {
                        return a.hasData()
                    }) || this.options.showEmpty && H(this.min) && H(this.max)
                };
                b.prototype.addTitle = function (a) {
                    var c = this.chart.renderer,
                        h = this.horiz, d = this.opposite, n = this.options.title, e, m = this.chart.styledMode;
                    this.axisTitle || ((e = n.textAlign) || (e = (h ? {
                        low: "left",
                        middle: "center",
                        high: "right"
                    } : {
                        low: d ? "right" : "left",
                        middle: "center",
                        high: d ? "left" : "right"
                    })[n.align]), this.axisTitle = c.text(n.text || "", 0, 0, n.useHTML).attr({
                        zIndex: 7,
                        rotation: n.rotation,
                        align: e
                    }).addClass("highcharts-axis-title"), m || this.axisTitle.css(k(n.style)), this.axisTitle.add(this.axisGroup), this.axisTitle.isNew = !0);
                    m || n.style.width || this.isRadial || this.axisTitle.css({
                        width: this.len +
                            "px"
                    });
                    this.axisTitle[a ? "show" : "hide"](a)
                };
                b.prototype.generateTick = function (a) {
                    var c = this.ticks;
                    c[a] ? c[a].addLabel() : c[a] = new A(this, a)
                };
                b.prototype.getOffset = function () {
                    var a = this, c = this, h = c.chart, d = h.renderer, k = c.options, n = c.tickPositions,
                        e = c.ticks, m = c.horiz, g = c.side, b = h.inverted && !c.isZAxis ? [1, 0, 3, 2][g] : g, l,
                        f = 0, q = 0, p = k.title, L = k.labels, w = 0, M = h.axisOffset;
                    h = h.clipOffset;
                    var u = [-1, 1, 1, -1][g], r = k.className, t = c.axisParent;
                    var F = c.hasData();
                    c.showAxis = l = F || k.showEmpty;
                    c.staggerLines = c.horiz && L.staggerLines ||
                        void 0;
                    if (!c.axisGroup) {
                        var S = function (c, h, k) {
                            return d.g(c).attr({zIndex: k}).addClass("highcharts-" + a.coll.toLowerCase() + h + " " + (a.isRadial ? "highcharts-radial-axis" + h + " " : "") + (r || "")).add(t)
                        };
                        c.gridGroup = S("grid", "-grid", k.gridZIndex);
                        c.axisGroup = S("axis", "", k.zIndex);
                        c.labelGroup = S("axis-labels", "-labels", L.zIndex)
                    }
                    F || c.isLinked ? (n.forEach(function (a, h) {
                        c.generateTick(a, h)
                    }), c.renderUnsquish(), c.reserveSpaceDefault = 0 === g || 2 === g || {
                        1: "left",
                        3: "right"
                    }[g] === c.labelAlign, E(L.reserveSpace, "center" === c.labelAlign ?
                        !0 : null, c.reserveSpaceDefault) && n.forEach(function (a) {
                        w = Math.max(e[a].getLabelSize(), w)
                    }), c.staggerLines && (w *= c.staggerLines), c.labelOffset = w * (c.opposite ? -1 : 1)) : v(e, function (a, c) {
                        a.destroy();
                        delete e[c]
                    });
                    if (p && p.text && !1 !== p.enabled && (c.addTitle(l), l && !1 !== p.reserveSpace)) {
                        c.titleOffset = f = c.axisTitle.getBBox()[m ? "height" : "width"];
                        var R = p.offset;
                        q = H(R) ? 0 : E(p.margin, m ? 5 : 10)
                    }
                    c.renderLine();
                    c.offset = u * E(k.offset, M[g] ? M[g] + (k.margin || 0) : 0);
                    c.tickRotCorr = c.tickRotCorr || {x: 0, y: 0};
                    p = 0 === g ? -c.labelMetrics().h :
                        2 === g ? c.tickRotCorr.y : 0;
                    q = Math.abs(w) + q;
                    w && (q = q - p + u * (m ? E(L.y, c.tickRotCorr.y + 8 * u) : L.x));
                    c.axisTitleMargin = E(R, q);
                    c.getMaxLabelDimensions && (c.maxLabelDimensions = c.getMaxLabelDimensions(e, n));
                    m = this.tickSize("tick");
                    M[g] = Math.max(M[g], (c.axisTitleMargin || 0) + f + u * c.offset, q, n && n.length && m ? m[0] + u * c.offset : 0);
                    k = k.offset ? 0 : 2 * Math.floor(c.axisLine.strokeWidth() / 2);
                    h[b] = Math.max(h[b], k);
                    z(this, "afterGetOffset")
                };
                b.prototype.getLinePath = function (a) {
                    var c = this.chart, h = this.opposite, d = this.offset, k = this.horiz,
                        n = this.left + (h ? this.width : 0) + d;
                    d = c.chartHeight - this.bottom - (h ? this.height : 0) + d;
                    h && (a *= -1);
                    return c.renderer.crispLine([["M", k ? this.left : n, k ? d : this.top], ["L", k ? c.chartWidth - this.right : n, k ? d : c.chartHeight - this.bottom]], a)
                };
                b.prototype.renderLine = function () {
                    this.axisLine || (this.axisLine = this.chart.renderer.path().addClass("highcharts-axis-line").add(this.axisGroup), this.chart.styledMode || this.axisLine.attr({
                        stroke: this.options.lineColor,
                        "stroke-width": this.options.lineWidth,
                        zIndex: 7
                    }))
                };
                b.prototype.getTitlePosition =
                    function () {
                        var a = this.horiz, c = this.left, h = this.top, d = this.len, k = this.options.title,
                            n = a ? c : h, e = this.opposite, m = this.offset, v = k.x, g = k.y, b = this.axisTitle,
                            l = this.chart.renderer.fontMetrics(k.style.fontSize, b);
                        b = Math.max(b.getBBox(null, 0).height - l.h - 1, 0);
                        d = {low: n + (a ? 0 : d), middle: n + d / 2, high: n + (a ? d : 0)}[k.align];
                        c = (a ? h + this.height : c) + (a ? 1 : -1) * (e ? -1 : 1) * this.axisTitleMargin + [-b, b, l.f, -b][this.side];
                        a = {
                            x: a ? d + v : c + (e ? this.width : 0) + m + v,
                            y: a ? c + g - (e ? this.height : 0) + m : d + g
                        };
                        z(this, "afterGetTitlePosition", {titlePosition: a});
                        return a
                    };
                b.prototype.renderMinorTick = function (a) {
                    var c = this.chart.hasRendered && this.old, h = this.minorTicks;
                    h[a] || (h[a] = new A(this, a, "minor"));
                    c && h[a].isNew && h[a].render(null, !0);
                    h[a].render(null, !1, 1)
                };
                b.prototype.renderTick = function (a, c) {
                    var h = this.ticks, d = this.chart.hasRendered && this.old;
                    if (!this.isLinked || a >= this.min && a <= this.max || this.grid && this.grid.isColumn) h[a] || (h[a] = new A(this, a)), d && h[a].isNew && h[a].render(c, !0, -1), h[a].render(c)
                };
                b.prototype.render = function () {
                    var a = this, c = a.chart, h = a.logarithmic,
                        d = a.options, k = a.isLinked, e = a.tickPositions, m = a.axisTitle, g = a.ticks,
                        b = a.minorTicks, l = a.alternateBands, f = d.stackLabels, q = d.alternateGridColor,
                        E = a.tickmarkOffset, p = a.axisLine, L = a.showAxis, w = r(c.renderer.globalAnimation), M, u;
                    a.labelEdge.length = 0;
                    a.overlap = !1;
                    [g, b, l].forEach(function (a) {
                        v(a, function (a) {
                            a.isActive = !1
                        })
                    });
                    if (a.hasData() || k) a.minorTickInterval && !a.categories && a.getMinorTickPositions().forEach(function (c) {
                        a.renderMinorTick(c)
                    }), e.length && (e.forEach(function (c, h) {
                        a.renderTick(c, h)
                    }), E && (0 ===
                        a.min || a.single) && (g[-1] || (g[-1] = new A(a, -1, null, !0)), g[-1].render(-1))), q && e.forEach(function (d, k) {
                        u = "undefined" !== typeof e[k + 1] ? e[k + 1] + E : a.max - E;
                        0 === k % 2 && d < a.max && u <= a.max + (c.polar ? -E : E) && (l[d] || (l[d] = new D.PlotLineOrBand(a)), M = d + E, l[d].options = {
                            from: h ? h.lin2log(M) : M,
                            to: h ? h.lin2log(u) : u,
                            color: q,
                            className: "highcharts-alternate-grid"
                        }, l[d].render(), l[d].isActive = !0)
                    }), a._addedPlotLB || (a._addedPlotLB = !0, (d.plotLines || []).concat(d.plotBands || []).forEach(function (c) {
                        a.addPlotBandOrLine(c)
                    }));
                    [g, b, l].forEach(function (a) {
                        var h,
                            d = [], k = w.duration;
                        v(a, function (a, c) {
                            a.isActive || (a.render(c, !1, 0), a.isActive = !1, d.push(c))
                        });
                        Y(function () {
                            for (h = d.length; h--;) a[d[h]] && !a[d[h]].isActive && (a[d[h]].destroy(), delete a[d[h]])
                        }, a !== l && c.hasRendered && k ? k : 0)
                    });
                    p && (p[p.isPlaced ? "animate" : "attr"]({d: this.getLinePath(p.strokeWidth())}), p.isPlaced = !0, p[L ? "show" : "hide"](L));
                    m && L && (d = a.getTitlePosition(), n(d.y) ? (m[m.isNew ? "attr" : "animate"](d), m.isNew = !1) : (m.attr("y", -9999), m.isNew = !0));
                    f && f.enabled && a.stacking && a.stacking.renderStackTotals();
                    a.old = {
                        len: a.len,
                        max: a.max,
                        min: a.min,
                        transA: a.transA,
                        userMax: a.userMax,
                        userMin: a.userMin
                    };
                    a.isDirty = !1;
                    z(this, "afterRender")
                };
                b.prototype.redraw = function () {
                    this.visible && (this.render(), this.plotLinesAndBands.forEach(function (a) {
                        a.render()
                    }));
                    this.series.forEach(function (a) {
                        a.isDirty = !0
                    })
                };
                b.prototype.getKeepProps = function () {
                    return this.keepProps || b.keepProps
                };
                b.prototype.destroy = function (a) {
                    var c = this, h = c.plotLinesAndBands, d;
                    z(this, "destroy", {keepEvents: a});
                    a || M(c);
                    [c.ticks, c.minorTicks, c.alternateBands].forEach(function (a) {
                        I(a)
                    });
                    if (h) for (a = h.length; a--;) h[a].destroy();
                    "axisLine axisTitle axisGroup gridGroup labelGroup cross scrollbar".split(" ").forEach(function (a) {
                        c[a] && (c[a] = c[a].destroy())
                    });
                    for (d in c.plotLinesAndBandsGroups) c.plotLinesAndBandsGroups[d] = c.plotLinesAndBandsGroups[d].destroy();
                    v(c, function (a, h) {
                        -1 === c.getKeepProps().indexOf(h) && delete c[h]
                    })
                };
                b.prototype.drawCrosshair = function (a, c) {
                    var h = this.crosshair, d = E(h && h.snap, !0), k, n = this.cross, e = this.chart;
                    z(this, "drawCrosshair", {e: a, point: c});
                    a || (a = this.cross &&
                        this.cross.e);
                    if (h && !1 !== (H(c) || !d)) {
                        d ? H(c) && (k = E("colorAxis" !== this.coll ? c.crosshairPos : null, this.isXAxis ? c.plotX : this.len - c.plotY)) : k = a && (this.horiz ? a.chartX - this.pos : this.len - a.chartY + this.pos);
                        if (H(k)) {
                            var m = {value: c && (this.isXAxis ? c.x : E(c.stackY, c.y)), translatedValue: k};
                            e.polar && w(m, {isCrosshair: !0, chartX: a && a.chartX, chartY: a && a.chartY, point: c});
                            m = this.getPlotLinePath(m) || null
                        }
                        if (!H(m)) {
                            this.hideCrosshair();
                            return
                        }
                        d = this.categories && !this.isRadial;
                        n || (this.cross = n = e.renderer.path().addClass("highcharts-crosshair highcharts-crosshair-" +
                            (d ? "category " : "thin ") + (h.className || "")).attr({zIndex: E(h.zIndex, 2)}).add(), e.styledMode || (n.attr({
                            stroke: h.color || (d ? f.parse(y.highlightColor20).setOpacity(.25).get() : y.neutralColor20),
                            "stroke-width": E(h.width, 1)
                        }).css({"pointer-events": "none"}), h.dashStyle && n.attr({dashstyle: h.dashStyle})));
                        n.show().attr({d: m});
                        d && !h.width && n.attr({"stroke-width": this.transA});
                        this.cross.e = a
                    } else this.hideCrosshair();
                    z(this, "afterDrawCrosshair", {e: a, point: c})
                };
                b.prototype.hideCrosshair = function () {
                    this.cross &&
                    this.cross.hide();
                    z(this, "afterHideCrosshair")
                };
                b.prototype.hasVerticalPanning = function () {
                    var a = this.chart.options.chart.panning;
                    return !!(a && a.enabled && /y/.test(a.type))
                };
                b.prototype.validatePositiveValue = function (a) {
                    return n(a) && 0 < a
                };
                b.prototype.update = function (a, c) {
                    var h = this.chart, d = a && a.events || {};
                    a = k(this.userOptions, a);
                    v(h.options[this.coll].events, function (a, c) {
                        "undefined" === typeof d[c] && (d[c] = void 0)
                    });
                    this.destroy(!0);
                    this.init(h, w(a, {events: d}));
                    h.isDirtyBox = !0;
                    E(c, !0) && h.redraw()
                };
                b.prototype.remove =
                    function (a) {
                        for (var c = this.chart, h = this.coll, d = this.series, k = d.length; k--;) d[k] && d[k].remove(!1);
                        B(c.axes, this);
                        B(c[h], this);
                        c[h].forEach(function (a, c) {
                            a.options.index = a.userOptions.index = c
                        });
                        this.destroy();
                        c.isDirtyBox = !0;
                        E(a, !0) && c.redraw()
                    };
                b.prototype.setTitle = function (a, c) {
                    this.update({title: a}, c)
                };
                b.prototype.setCategories = function (a, c) {
                    this.update({categories: a}, c)
                };
                b.defaultOptions = {
                    alignTicks: !0,
                    allowDecimals: void 0,
                    zIndex: 2,
                    zoomEnabled: !0,
                    dateTimeLabelFormats: {
                        millisecond: {
                            main: "%H:%M:%S.%L",
                            range: !1
                        },
                        second: {main: "%H:%M:%S", range: !1},
                        minute: {main: "%H:%M", range: !1},
                        hour: {main: "%H:%M", range: !1},
                        day: {main: "%e. %b"},
                        week: {main: "%e. %b"},
                        month: {main: "%b '%y"},
                        year: {main: "%Y"}
                    },
                    endOnTick: !1,
                    gridLineDashStyle: "Solid",
                    gridZIndex: 1,
                    labels: {
                        autoRotation: void 0,
                        autoRotationLimit: 80,
                        distance: void 0,
                        enabled: !0,
                        indentation: 10,
                        overflow: "justify",
                        padding: 5,
                        reserveSpace: void 0,
                        rotation: void 0,
                        staggerLines: 0,
                        step: 0,
                        useHTML: !1,
                        x: 0,
                        zIndex: 7,
                        style: {color: y.neutralColor60, cursor: "default", fontSize: "11px"}
                    },
                    maxPadding: .01,
                    minorGridLineDashStyle: "Solid",
                    minorTickLength: 2,
                    minorTickPosition: "outside",
                    minPadding: .01,
                    offset: void 0,
                    opposite: !1,
                    reversed: void 0,
                    reversedStacks: !1,
                    showEmpty: !0,
                    showFirstLabel: !0,
                    showLastLabel: !0,
                    startOfWeek: 1,
                    startOnTick: !1,
                    tickLength: 10,
                    tickPixelInterval: 100,
                    tickmarkPlacement: "between",
                    tickPosition: "outside",
                    title: {align: "middle", rotation: 0, useHTML: !1, x: 0, y: 0, style: {color: y.neutralColor60}},
                    type: "linear",
                    uniqueNames: !0,
                    visible: !0,
                    minorGridLineColor: y.neutralColor5,
                    minorGridLineWidth: 1,
                    minorTickColor: y.neutralColor40,
                    lineColor: y.highlightColor20,
                    lineWidth: 1,
                    gridLineColor: y.neutralColor10,
                    gridLineWidth: void 0,
                    tickColor: y.highlightColor20
                };
                b.defaultYAxisOptions = {
                    reversedStacks: !0,
                    endOnTick: !0,
                    maxPadding: .05,
                    minPadding: .05,
                    tickPixelInterval: 72,
                    showLastLabel: !0,
                    labels: {x: -8},
                    startOnTick: !0,
                    title: {rotation: 270, text: "Values"},
                    stackLabels: {
                        animation: {},
                        allowOverlap: !1,
                        enabled: !1,
                        crop: !0,
                        overflow: "justify",
                        formatter: function () {
                            var a = this.axis.chart.numberFormatter;
                            return a(this.total, -1)
                        },
                        style: {
                            color: y.neutralColor100,
                            fontSize: "11px",
                            fontWeight: "bold",
                            textOutline: "1px contrast"
                        }
                    },
                    gridLineWidth: 1,
                    lineWidth: 0
                };
                b.defaultLeftAxisOptions = {labels: {x: -15}, title: {rotation: 270}};
                b.defaultRightAxisOptions = {labels: {x: 15}, title: {rotation: 90}};
                b.defaultBottomAxisOptions = {labels: {autoRotation: [-45], x: 0}, margin: 15, title: {rotation: 0}};
                b.defaultTopAxisOptions = {labels: {autoRotation: [-45], x: 0}, margin: 15, title: {rotation: 0}};
                b.keepProps = "extKey hcEvents names series userMax userMin".split(" ");
                return b
            }();
            D.Axis = b;
            return D.Axis
        });
    J(b, "Core/Axis/DateTimeAxis.js", [b["Core/Axis/Axis.js"], b["Core/Utilities.js"]], function (b, f) {
        var B = f.addEvent, y = f.getMagnitude, C = f.normalizeTickInterval, A = f.timeUnits, t = function () {
            function b(b) {
                this.axis = b
            }

            b.prototype.normalizeTimeTickInterval = function (b, l) {
                var g = l || [["millisecond", [1, 2, 5, 10, 20, 25, 50, 100, 200, 500]], ["second", [1, 2, 5, 10, 15, 30]], ["minute", [1, 2, 5, 10, 15, 30]], ["hour", [1, 2, 3, 4, 6, 8, 12]], ["day", [1, 2]], ["week", [1, 2]], ["month", [1, 2, 3, 4, 6]], ["year", null]];
                l = g[g.length -
                1];
                var e = A[l[0]], d = l[1], f;
                for (f = 0; f < g.length && !(l = g[f], e = A[l[0]], d = l[1], g[f + 1] && b <= (e * d[d.length - 1] + A[g[f + 1][0]]) / 2); f++) ;
                e === A.year && b < 5 * e && (d = [1, 2, 5]);
                b = C(b / e, d, "year" === l[0] ? Math.max(y(b / e), 1) : 1);
                return {unitRange: e, count: b, unitName: l[0]}
            };
            return b
        }();
        f = function () {
            function b() {
            }

            b.compose = function (b) {
                b.keepProps.push("dateTime");
                b.prototype.getTimeTicks = function () {
                    return this.chart.time.getTimeTicks.apply(this.chart.time, arguments)
                };
                B(b, "init", function (b) {
                    "datetime" !== b.userOptions.type ? this.dateTime =
                        void 0 : this.dateTime || (this.dateTime = new t(this))
                })
            };
            b.AdditionsClass = t;
            return b
        }();
        f.compose(b);
        return f
    });
    J(b, "Core/Axis/LogarithmicAxis.js", [b["Core/Axis/Axis.js"], b["Core/Utilities.js"]], function (b, f) {
        var B = f.addEvent, y = f.getMagnitude, C = f.normalizeTickInterval, A = f.pick, t = function () {
            function b(b) {
                this.axis = b
            }

            b.prototype.getLogTickPositions = function (b, l, g, e) {
                var d = this.axis, f = d.len, p = d.options, r = [];
                e || (this.minorAutoInterval = void 0);
                if (.5 <= b) b = Math.round(b), r = d.getLinearTickPositions(b, l, g); else if (.08 <=
                    b) {
                    var t = Math.floor(l), F, w = p = void 0;
                    for (f = .3 < b ? [1, 2, 4] : .15 < b ? [1, 2, 4, 6, 8] : [1, 2, 3, 4, 5, 6, 7, 8, 9]; t < g + 1 && !w; t++) {
                        var z = f.length;
                        for (F = 0; F < z && !w; F++) {
                            var q = this.log2lin(this.lin2log(t) * f[F]);
                            q > l && (!e || p <= g) && "undefined" !== typeof p && r.push(p);
                            p > g && (w = !0);
                            p = q
                        }
                    }
                } else l = this.lin2log(l), g = this.lin2log(g), b = e ? d.getMinorTickInterval() : p.tickInterval, b = A("auto" === b ? null : b, this.minorAutoInterval, p.tickPixelInterval / (e ? 5 : 1) * (g - l) / ((e ? f / d.tickPositions.length : f) || 1)), b = C(b, void 0, y(b)), r = d.getLinearTickPositions(b,
                    l, g).map(this.log2lin), e || (this.minorAutoInterval = b / 5);
                e || (d.tickInterval = b);
                return r
            };
            b.prototype.lin2log = function (b) {
                return Math.pow(10, b)
            };
            b.prototype.log2lin = function (b) {
                return Math.log(b) / Math.LN10
            };
            return b
        }();
        f = function () {
            function b() {
            }

            b.compose = function (b) {
                b.keepProps.push("logarithmic");
                B(b, "init", function (b) {
                    var g = this.logarithmic;
                    "logarithmic" !== b.userOptions.type ? this.logarithmic = void 0 : g || (this.logarithmic = new t(this))
                });
                B(b, "afterInit", function () {
                    var b = this.logarithmic;
                    b && (this.lin2val =
                        function (g) {
                            return b.lin2log(g)
                        }, this.val2lin = function (g) {
                        return b.log2lin(g)
                    })
                })
            };
            return b
        }();
        f.compose(b);
        return f
    });
    J(b, "Core/Axis/PlotLineOrBand.js", [b["Core/Axis/Axis.js"], b["Core/Globals.js"], b["Core/Color/Palette.js"], b["Core/Utilities.js"]], function (b, f, D, y) {
        var B = y.arrayMax, A = y.arrayMin, t = y.defined, r = y.destroyObjectProperties, p = y.erase, l = y.extend,
            g = y.fireEvent, e = y.isNumber, d = y.merge, u = y.objectEach, H = y.pick;
        y = function () {
            function e(d, e) {
                this.axis = d;
                e && (this.options = e, this.id = e.id)
            }

            e.prototype.render =
                function () {
                    g(this, "render");
                    var e = this, b = e.axis, l = b.horiz, f = b.logarithmic, q = e.options, m = q.label, c = e.label,
                        n = q.to, a = q.from, k = q.value, h = t(a) && t(n), v = t(k), E = e.svgElem, p = !E, M = [],
                        r = q.color, B = H(q.zIndex, 0), R = q.events;
                    M = {"class": "highcharts-plot-" + (h ? "band " : "line ") + (q.className || "")};
                    var O = {}, G = b.chart.renderer, x = h ? "bands" : "lines";
                    f && (a = f.log2lin(a), n = f.log2lin(n), k = f.log2lin(k));
                    b.chart.styledMode || (v ? (M.stroke = r || D.neutralColor40, M["stroke-width"] = H(q.width, 1), q.dashStyle && (M.dashstyle = q.dashStyle)) :
                        h && (M.fill = r || D.highlightColor10, q.borderWidth && (M.stroke = q.borderColor, M["stroke-width"] = q.borderWidth)));
                    O.zIndex = B;
                    x += "-" + B;
                    (f = b.plotLinesAndBandsGroups[x]) || (b.plotLinesAndBandsGroups[x] = f = G.g("plot-" + x).attr(O).add());
                    p && (e.svgElem = E = G.path().attr(M).add(f));
                    if (v) M = b.getPlotLinePath({
                        value: k,
                        lineWidth: E.strokeWidth(),
                        acrossPanes: q.acrossPanes
                    }); else if (h) M = b.getPlotBandPath(a, n, q); else return;
                    !e.eventsAdded && R && (u(R, function (a, c) {
                        E.on(c, function (a) {
                            R[c].apply(e, [a])
                        })
                    }), e.eventsAdded = !0);
                    (p ||
                        !E.d) && M && M.length ? E.attr({d: M}) : E && (M ? (E.show(!0), E.animate({d: M})) : E.d && (E.hide(), c && (e.label = c = c.destroy())));
                    m && (t(m.text) || t(m.formatter)) && M && M.length && 0 < b.width && 0 < b.height && !M.isFlat ? (m = d({
                        align: l && h && "center",
                        x: l ? !h && 4 : 10,
                        verticalAlign: !l && h && "middle",
                        y: l ? h ? 16 : 10 : h ? 6 : -4,
                        rotation: l && !h && 90
                    }, m), this.renderLabel(m, M, h, B)) : c && c.hide();
                    return e
                };
            e.prototype.renderLabel = function (d, e, b, g) {
                var l = this.label, m = this.axis.chart.renderer;
                l || (l = {
                    align: d.textAlign || d.align, rotation: d.rotation, "class": "highcharts-plot-" +
                        (b ? "band" : "line") + "-label " + (d.className || "")
                }, l.zIndex = g, g = this.getLabelText(d), this.label = l = m.text(g, 0, 0, d.useHTML).attr(l).add(), this.axis.chart.styledMode || l.css(d.style));
                m = e.xBounds || [e[0][1], e[1][1], b ? e[2][1] : e[0][1]];
                e = e.yBounds || [e[0][2], e[1][2], b ? e[2][2] : e[0][2]];
                b = A(m);
                g = A(e);
                l.align(d, !1, {x: b, y: g, width: B(m) - b, height: B(e) - g});
                l.show(!0)
            };
            e.prototype.getLabelText = function (d) {
                return t(d.formatter) ? d.formatter.call(this) : d.text
            };
            e.prototype.destroy = function () {
                p(this.axis.plotLinesAndBands,
                    this);
                delete this.axis;
                r(this)
            };
            return e
        }();
        l(b.prototype, {
            getPlotBandPath: function (d, b, g) {
                void 0 === g && (g = this.options);
                var l = this.getPlotLinePath({value: b, force: !0, acrossPanes: g.acrossPanes});
                g = this.getPlotLinePath({value: d, force: !0, acrossPanes: g.acrossPanes});
                var f = [], q = this.horiz, m = 1;
                d = !e(this.min) || !e(this.max) || d < this.min && b < this.min || d > this.max && b > this.max;
                if (g && l) {
                    if (d) {
                        var c = g.toString() === l.toString();
                        m = 0
                    }
                    for (d = 0; d < g.length; d += 2) {
                        b = g[d];
                        var n = g[d + 1], a = l[d], k = l[d + 1];
                        "M" !== b[0] && "L" !== b[0] ||
                        "M" !== n[0] && "L" !== n[0] || "M" !== a[0] && "L" !== a[0] || "M" !== k[0] && "L" !== k[0] || (q && a[1] === b[1] ? (a[1] += m, k[1] += m) : q || a[2] !== b[2] || (a[2] += m, k[2] += m), f.push(["M", b[1], b[2]], ["L", n[1], n[2]], ["L", k[1], k[2]], ["L", a[1], a[2]], ["Z"]));
                        f.isFlat = c
                    }
                }
                return f
            }, addPlotBand: function (d) {
                return this.addPlotBandOrLine(d, "plotBands")
            }, addPlotLine: function (d) {
                return this.addPlotBandOrLine(d, "plotLines")
            }, addPlotBandOrLine: function (d, e) {
                var b = this, g = new f.PlotLineOrBand(this, d), l = this.userOptions;
                this.visible && (g = g.render());
                if (g) {
                    this._addedPlotLB || (this._addedPlotLB = !0, (l.plotLines || []).concat(l.plotBands || []).forEach(function (d) {
                        b.addPlotBandOrLine(d)
                    }));
                    if (e) {
                        var q = l[e] || [];
                        q.push(d);
                        l[e] = q
                    }
                    this.plotLinesAndBands.push(g)
                }
                return g
            }, removePlotBandOrLine: function (d) {
                for (var e = this.plotLinesAndBands, b = this.options, g = this.userOptions, l = e.length; l--;) e[l].id === d && e[l].destroy();
                [b.plotLines || [], g.plotLines || [], b.plotBands || [], g.plotBands || []].forEach(function (e) {
                    for (l = e.length; l--;) (e[l] || {}).id === d && p(e, e[l])
                })
            }, removePlotBand: function (d) {
                this.removePlotBandOrLine(d)
            },
            removePlotLine: function (d) {
                this.removePlotBandOrLine(d)
            }
        });
        f.PlotLineOrBand = y;
        return f.PlotLineOrBand
    });
    J(b, "Core/Tooltip.js", [b["Core/FormatUtilities.js"], b["Core/Globals.js"], b["Core/Color/Palette.js"], b["Core/Utilities.js"]], function (b, f, D, y) {
        var B = b.format, A = f.doc, t = y.clamp, r = y.css, p = y.defined, l = y.discardElement, g = y.extend,
            e = y.fireEvent, d = y.isArray, u = y.isNumber, H = y.isString, I = y.merge, K = y.pick, F = y.splat,
            w = y.syncTimeout, z = y.timeUnits;
        "";
        b = function () {
            function b(d, c) {
                this.container = void 0;
                this.crosshairs =
                    [];
                this.distance = 0;
                this.isHidden = !0;
                this.isSticky = !1;
                this.now = {};
                this.options = {};
                this.outside = !1;
                this.chart = d;
                this.init(d, c)
            }

            b.prototype.applyFilter = function () {
                var d = this.chart;
                d.renderer.definition({
                    tagName: "filter",
                    attributes: {id: "drop-shadow-" + d.index, opacity: .5},
                    children: [{
                        tagName: "feGaussianBlur",
                        attributes: {"in": "SourceAlpha", stdDeviation: 1}
                    }, {tagName: "feOffset", attributes: {dx: 1, dy: 1}}, {
                        tagName: "feComponentTransfer",
                        children: [{tagName: "feFuncA", attributes: {type: "linear", slope: .3}}]
                    }, {
                        tagName: "feMerge",
                        children: [{tagName: "feMergeNode"}, {
                            tagName: "feMergeNode",
                            attributes: {"in": "SourceGraphic"}
                        }]
                    }]
                });
                d.renderer.definition({
                    tagName: "style",
                    textContent: ".highcharts-tooltip-" + d.index + "{filter:url(#drop-shadow-" + d.index + ")}"
                })
            };
            b.prototype.bodyFormatter = function (d) {
                return d.map(function (c) {
                    var d = c.series.tooltipOptions;
                    return (d[(c.point.formatPrefix || "point") + "Formatter"] || c.point.tooltipFormatter).call(c.point, d[(c.point.formatPrefix || "point") + "Format"] || "")
                })
            };
            b.prototype.cleanSplit = function (d) {
                this.chart.series.forEach(function (c) {
                    var e =
                        c && c.tt;
                    e && (!e.isActive || d ? c.tt = e.destroy() : e.isActive = !1)
                })
            };
            b.prototype.defaultFormatter = function (d) {
                var c = this.points || F(this);
                var e = [d.tooltipFooterHeaderFormatter(c[0])];
                e = e.concat(d.bodyFormatter(c));
                e.push(d.tooltipFooterHeaderFormatter(c[0], !0));
                return e
            };
            b.prototype.destroy = function () {
                this.label && (this.label = this.label.destroy());
                this.split && this.tt && (this.cleanSplit(this.chart, !0), this.tt = this.tt.destroy());
                this.renderer && (this.renderer = this.renderer.destroy(), l(this.container));
                y.clearTimeout(this.hideTimer);
                y.clearTimeout(this.tooltipTimeout)
            };
            b.prototype.getAnchor = function (d, c) {
                var e = this.chart;
                var a = e.pointer;
                var k = e.inverted, h = e.plotTop, m = e.plotLeft, b = 0, g = 0, l, f;
                d = F(d);
                this.followPointer && c ? ("undefined" === typeof c.chartX && (c = a.normalize(c)), a = [c.chartX - m, c.chartY - h]) : d[0].tooltipPos ? a = d[0].tooltipPos : (d.forEach(function (a) {
                    l = a.series.yAxis;
                    f = a.series.xAxis;
                    b += a.plotX || 0;
                    g += a.plotLow ? (a.plotLow + (a.plotHigh || 0)) / 2 : a.plotY || 0;
                    f && l && (k ? (b += h + e.plotHeight - f.len - f.pos, g += m + e.plotWidth - l.len - l.pos) : (b += f.pos -
                        m, g += l.pos - h))
                }), b /= d.length, g /= d.length, a = [k ? e.plotWidth - g : b, k ? e.plotHeight - b : g], this.shared && 1 < d.length && c && (k ? a[0] = c.chartX - m : a[1] = c.chartY - h));
                return a.map(Math.round)
            };
            b.prototype.getDateFormat = function (d, c, e, a) {
                var k = this.chart.time, h = k.dateFormat("%m-%d %H:%M:%S.%L", c),
                    n = {millisecond: 15, second: 12, minute: 9, hour: 6, day: 3}, m = "millisecond";
                for (b in z) {
                    if (d === z.week && +k.dateFormat("%w", c) === e && "00:00:00.000" === h.substr(6)) {
                        var b = "week";
                        break
                    }
                    if (z[b] > d) {
                        b = m;
                        break
                    }
                    if (n[b] && h.substr(n[b]) !== "01-01 00:00:00.000".substr(n[b])) break;
                    "week" !== b && (m = b)
                }
                if (b) var g = k.resolveDTLFormat(a[b]).main;
                return g
            };
            b.prototype.getLabel = function () {
                var d = this, c = this.chart.renderer, e = this.chart.styledMode, a = this.options,
                    k = "tooltip" + (p(a.className) ? " " + a.className : ""),
                    h = a.style && a.style.pointerEvents || (!this.followPointer && a.stickOnContact ? "auto" : "none"),
                    b, g = function () {
                        d.inContact = !0
                    }, l = function () {
                        var a = d.chart.hoverSeries;
                        d.inContact = !1;
                        if (a && a.onMouseOut) a.onMouseOut()
                    };
                if (!this.label) {
                    if (this.outside) {
                        var q = this.chart.options.chart.style;
                        this.container =
                            b = f.doc.createElement("div");
                        b.className = "highcharts-tooltip-container";
                        r(b, {
                            position: "absolute",
                            top: "1px",
                            pointerEvents: h,
                            zIndex: Math.max(this.options.style && this.options.style.zIndex || 0, (q && q.zIndex || 0) + 3)
                        });
                        f.doc.body.appendChild(b);
                        this.renderer = c = new f.Renderer(b, 0, 0, q, void 0, void 0, c.styledMode)
                    }
                    this.split ? this.label = c.g(k) : (this.label = c.label("", 0, 0, a.shape || "callout", null, null, a.useHTML, null, k).attr({
                        padding: a.padding,
                        r: a.borderRadius
                    }), e || this.label.attr({
                        fill: a.backgroundColor,
                        "stroke-width": a.borderWidth
                    }).css(a.style).css({pointerEvents: h}).shadow(a.shadow));
                    e && (this.applyFilter(), this.label.addClass("highcharts-tooltip-" + this.chart.index));
                    if (d.outside && !d.split) {
                        var u = this.label, w = u.xSetter, z = u.ySetter;
                        u.xSetter = function (a) {
                            w.call(u, d.distance);
                            b.style.left = a + "px"
                        };
                        u.ySetter = function (a) {
                            z.call(u, d.distance);
                            b.style.top = a + "px"
                        }
                    }
                    this.label.on("mouseenter", g).on("mouseleave", l).attr({zIndex: 8}).add()
                }
                return this.label
            };
            b.prototype.getPosition = function (d, c, e) {
                var a = this.chart, k = this.distance, h = {}, n = a.inverted && e.h || 0, b, m = this.outside,
                    g = m ? A.documentElement.clientWidth -
                        2 * k : a.chartWidth,
                    l = m ? Math.max(A.body.scrollHeight, A.documentElement.scrollHeight, A.body.offsetHeight, A.documentElement.offsetHeight, A.documentElement.clientHeight) : a.chartHeight,
                    f = a.pointer.getChartPosition(), q = function (h) {
                        var n = "x" === h;
                        return [h, n ? g : l, n ? d : c].concat(m ? [n ? d * f.scaleX : c * f.scaleY, n ? f.left - k + (e.plotX + a.plotLeft) * f.scaleX : f.top - k + (e.plotY + a.plotTop) * f.scaleY, 0, n ? g : l] : [n ? d : c, n ? e.plotX + a.plotLeft : e.plotY + a.plotTop, n ? a.plotLeft : a.plotTop, n ? a.plotLeft + a.plotWidth : a.plotTop + a.plotHeight])
                    }, p =
                        q("y"), u = q("x"), w = !this.followPointer && K(e.ttBelow, !a.inverted === !!e.negative),
                    z = function (a, c, d, e, b, g, v) {
                        var l = m ? "y" === a ? k * f.scaleY : k * f.scaleX : k, q = (d - e) / 2, E = e < b - k,
                            p = b + k + e < c, u = b - l - d + q;
                        b = b + l - q;
                        if (w && p) h[a] = b; else if (!w && E) h[a] = u; else if (E) h[a] = Math.min(v - e, 0 > u - n ? u : u - n); else if (p) h[a] = Math.max(g, b + n + d > c ? b : b + n); else return !1
                    }, r = function (a, c, d, e, n) {
                        var b;
                        n < k || n > c - k ? b = !1 : h[a] = n < d / 2 ? 1 : n > c - e / 2 ? c - e - 2 : n - d / 2;
                        return b
                    }, t = function (a) {
                        var c = p;
                        p = u;
                        u = c;
                        b = a
                    }, P = function () {
                        !1 !== z.apply(0, p) ? !1 !== r.apply(0, u) || b || (t(!0),
                            P()) : b ? h.x = h.y = 0 : (t(!0), P())
                    };
                (a.inverted || 1 < this.len) && t();
                P();
                return h
            };
            b.prototype.getXDateFormat = function (d, c, e) {
                c = c.dateTimeLabelFormats;
                var a = e && e.closestPointRange;
                return (a ? this.getDateFormat(a, d.x, e.options.startOfWeek, c) : c.day) || c.year
            };
            b.prototype.hide = function (d) {
                var c = this;
                y.clearTimeout(this.hideTimer);
                d = K(d, this.options.hideDelay, 500);
                this.isHidden || (this.hideTimer = w(function () {
                    c.getLabel().fadeOut(d ? void 0 : d);
                    c.isHidden = !0
                }, d))
            };
            b.prototype.init = function (d, c) {
                this.chart = d;
                this.options =
                    c;
                this.crosshairs = [];
                this.now = {x: 0, y: 0};
                this.isHidden = !0;
                this.split = c.split && !d.inverted && !d.polar;
                this.shared = c.shared || this.split;
                this.outside = K(c.outside, !(!d.scrollablePixelsX && !d.scrollablePixelsY))
            };
            b.prototype.isStickyOnContact = function () {
                return !(this.followPointer || !this.options.stickOnContact || !this.inContact)
            };
            b.prototype.move = function (d, c, e, a) {
                var k = this, h = k.now,
                    n = !1 !== k.options.animation && !k.isHidden && (1 < Math.abs(d - h.x) || 1 < Math.abs(c - h.y)),
                    b = k.followPointer || 1 < k.len;
                g(h, {
                    x: n ? (2 * h.x + d) /
                        3 : d,
                    y: n ? (h.y + c) / 2 : c,
                    anchorX: b ? void 0 : n ? (2 * h.anchorX + e) / 3 : e,
                    anchorY: b ? void 0 : n ? (h.anchorY + a) / 2 : a
                });
                k.getLabel().attr(h);
                k.drawTracker();
                n && (y.clearTimeout(this.tooltipTimeout), this.tooltipTimeout = setTimeout(function () {
                    k && k.move(d, c, e, a)
                }, 32))
            };
            b.prototype.refresh = function (b, c) {
                var n = this.chart, a = this.options, k = F(b), h = k[0], m = {}, g = [],
                    l = a.formatter || this.defaultFormatter;
                m = this.shared;
                var f = n.styledMode;
                if (a.enabled) {
                    y.clearTimeout(this.hideTimer);
                    this.followPointer = !this.split && h.series.tooltipOptions.followPointer;
                    var q = this.getAnchor(b, c);
                    var p = q[0];
                    var u = q[1];
                    !m || !d(b) && b.series && b.series.noSharedTooltip ? m = h.getLabelConfig() : (n.pointer.applyInactiveState(k), k.forEach(function (a) {
                        a.setState("hover");
                        g.push(a.getLabelConfig())
                    }), m = {x: h.category, y: h.y}, m.points = g);
                    this.len = g.length;
                    b = l.call(m, this);
                    l = h.series;
                    this.distance = K(l.tooltipOptions.distance, 16);
                    if (!1 === b) this.hide(); else {
                        if (this.split) this.renderSplit(b, k); else if (k = p, m = u, c && n.pointer.isDirectTouch && (k = c.chartX - n.plotLeft, m = c.chartY - n.plotTop), n.polar ||
                        !1 === l.options.clip || l.shouldShowTooltip(k, m)) c = this.getLabel(), a.style.width && !f || c.css({width: this.chart.spacingBox.width + "px"}), c.attr({text: b && b.join ? b.join("") : b}), c.removeClass(/highcharts-color-[\d]+/g).addClass("highcharts-color-" + K(h.colorIndex, l.colorIndex)), f || c.attr({stroke: a.borderColor || h.color || l.color || D.neutralColor60}), this.updatePosition({
                            plotX: p,
                            plotY: u,
                            negative: h.negative,
                            ttBelow: h.ttBelow,
                            h: q[2] || 0
                        }); else {
                            this.hide();
                            return
                        }
                        this.isHidden && this.label && this.label.attr({opacity: 1}).show();
                        this.isHidden = !1
                    }
                    e(this, "refresh")
                }
            };
            b.prototype.renderSplit = function (d, c) {
                function e(c, h, d, k, e) {
                    void 0 === e && (e = !0);
                    d ? (h = I ? 0 : da, c = t(c - k / 2, Q.left, Q.right - k - (a.outside ? y : 0))) : (h -= W, c = e ? c - k - B : c + B, c = t(c, e ? c : Q.left, Q.right));
                    return {x: c, y: h}
                }

                var a = this, k = a.chart, h = a.chart, b = h.chartWidth, m = h.chartHeight, l = h.plotHeight,
                    q = h.plotLeft, p = h.plotTop, u = h.pointer, w = h.scrollablePixelsY;
                w = void 0 === w ? 0 : w;
                var z = h.scrollablePixelsX, r = h.scrollingContainer;
                r = void 0 === r ? {scrollLeft: 0, scrollTop: 0} : r;
                var x = r.scrollLeft;
                r =
                    r.scrollTop;
                var F = h.styledMode, B = a.distance, C = a.options, P = a.options.positioner,
                    Q = a.outside && "number" !== typeof z ? A.documentElement.getBoundingClientRect() : {
                        left: x,
                        right: x + b,
                        top: r,
                        bottom: r + m
                    }, N = a.getLabel(), T = this.renderer || k.renderer, I = !(!k.xAxis[0] || !k.xAxis[0].opposite);
                k = u.getChartPosition();
                var y = k.left;
                k = k.top;
                var W = p + r, U = 0, da = l - w;
                H(d) && (d = [!1, d]);
                d = d.slice(0, c.length + 1).reduce(function (h, d, k) {
                    if (!1 !== d && "" !== d) {
                        k = c[k - 1] || {isHeader: !0, plotX: c[0].plotX, plotY: l, series: {}};
                        var n = k.isHeader, b = n ? a :
                            k.series;
                        d = d.toString();
                        var m = b.tt, g = k.isHeader;
                        var v = k.series;
                        var f = "highcharts-color-" + K(k.colorIndex, v.colorIndex, "none");
                        m || (m = {
                            padding: C.padding,
                            r: C.borderRadius
                        }, F || (m.fill = C.backgroundColor, m["stroke-width"] = C.borderWidth), m = T.label("", 0, 0, C[g ? "headerShape" : "shape"] || "callout", void 0, void 0, C.useHTML).addClass((g ? "highcharts-tooltip-header " : "") + "highcharts-tooltip-box " + f).attr(m).add(N));
                        m.isActive = !0;
                        m.attr({text: d});
                        F || m.css(C.style).shadow(C.shadow).attr({
                            stroke: C.borderColor || k.color ||
                                v.color || D.neutralColor80
                        });
                        b = b.tt = m;
                        g = b.getBBox();
                        d = g.width + b.strokeWidth();
                        n && (U = g.height, da += U, I && (W -= U));
                        v = k.plotX;
                        v = void 0 === v ? 0 : v;
                        f = k.plotY;
                        f = void 0 === f ? 0 : f;
                        m = k.series;
                        if (k.isHeader) {
                            v = q + v;
                            var E = p + l / 2
                        } else {
                            var u = m.xAxis, w = m.yAxis;
                            v = u.pos + t(v, -B, u.len + B);
                            m.shouldShowTooltip(0, w.pos - p + f, {ignoreX: !0}) && (E = w.pos + f)
                        }
                        v = t(v, Q.left - B, Q.right + B);
                        "number" === typeof E ? (g = g.height + 1, f = P ? P.call(a, d, g, k) : e(v, E, n, d), h.push({
                            align: P ? 0 : void 0,
                            anchorX: v,
                            anchorY: E,
                            boxWidth: d,
                            point: k,
                            rank: K(f.rank, n ? 1 : 0),
                            size: g,
                            target: f.y,
                            tt: b,
                            x: f.x
                        })) : b.isActive = !1
                    }
                    return h
                }, []);
                !P && d.some(function (c) {
                    var h = (a.outside ? y : 0) + c.anchorX;
                    return h < Q.left && h + c.boxWidth < Q.right ? !0 : h < y - Q.left + c.boxWidth && Q.right - h > h
                }) && (d = d.map(function (a) {
                    var c = e(a.anchorX, a.anchorY, a.point.isHeader, a.boxWidth, !1);
                    return g(a, {target: c.y, x: c.x})
                }));
                a.cleanSplit();
                f.distribute(d, da);
                var ba = y, J = y;
                d.forEach(function (c) {
                    var h = c.x, d = c.boxWidth;
                    c = c.isHeader;
                    c || (a.outside && y + h < ba && (ba = y + h), !c && a.outside && ba + d > J && (J = y + h))
                });
                d.forEach(function (c) {
                    var h =
                        c.x, d = c.anchorX, k = c.pos, e = c.point.isHeader;
                    k = {
                        visibility: "undefined" === typeof k ? "hidden" : "inherit",
                        x: h,
                        y: k + W,
                        anchorX: d,
                        anchorY: c.anchorY
                    };
                    if (a.outside && h < d) {
                        var n = y - ba;
                        0 < n && (e || (k.x = h + n, k.anchorX = d + n), e && (k.x = (J - ba) / 2, k.anchorX = d + n))
                    }
                    c.tt.attr(k)
                });
                d = a.container;
                w = a.renderer;
                a.outside && d && w && (h = N.getBBox(), w.setSize(h.width + h.x, h.height + h.y, !1), d.style.left = ba + "px", d.style.top = k + "px")
            };
            b.prototype.drawTracker = function () {
                if (this.followPointer || !this.options.stickOnContact) this.tracker && this.tracker.destroy();
                else {
                    var d = this.chart, c = this.label, e = d.hoverPoint;
                    if (c && e) {
                        var a = {x: 0, y: 0, width: 0, height: 0};
                        e = this.getAnchor(e);
                        var k = c.getBBox();
                        e[0] += d.plotLeft - c.translateX;
                        e[1] += d.plotTop - c.translateY;
                        a.x = Math.min(0, e[0]);
                        a.y = Math.min(0, e[1]);
                        a.width = 0 > e[0] ? Math.max(Math.abs(e[0]), k.width - e[0]) : Math.max(Math.abs(e[0]), k.width);
                        a.height = 0 > e[1] ? Math.max(Math.abs(e[1]), k.height - Math.abs(e[1])) : Math.max(Math.abs(e[1]), k.height);
                        this.tracker ? this.tracker.attr(a) : (this.tracker = c.renderer.rect(a).addClass("highcharts-tracker").add(c),
                        d.styledMode || this.tracker.attr({fill: "rgba(0,0,0,0)"}))
                    }
                }
            };
            b.prototype.styledModeFormat = function (d) {
                return d.replace('style="font-size: 10px"', 'class="highcharts-header"').replace(/style="color:{(point|series)\.color}"/g, 'class="highcharts-color-{$1.colorIndex}"')
            };
            b.prototype.tooltipFooterHeaderFormatter = function (d, c) {
                var n = c ? "footer" : "header", a = d.series, k = a.tooltipOptions, h = k.xDateFormat, b = a.xAxis,
                    m = b && "datetime" === b.options.type && u(d.key), g = k[n + "Format"];
                c = {isFooter: c, labelConfig: d};
                e(this, "headerFormatter",
                    c, function (c) {
                        m && !h && (h = this.getXDateFormat(d, k, b));
                        m && h && (d.point && d.point.tooltipDateKeys || ["key"]).forEach(function (a) {
                            g = g.replace("{point." + a + "}", "{point." + a + ":" + h + "}")
                        });
                        a.chart.styledMode && (g = this.styledModeFormat(g));
                        c.text = B(g, {point: d, series: a}, this.chart)
                    });
                return c.text
            };
            b.prototype.update = function (d) {
                this.destroy();
                I(!0, this.chart.options.tooltip.userOptions, d);
                this.init(this.chart, I(!0, this.options, d))
            };
            b.prototype.updatePosition = function (d) {
                var c = this.chart, e = c.pointer, a = this.getLabel(),
                    k = d.plotX + c.plotLeft;
                c = d.plotY + c.plotTop;
                e = e.getChartPosition();
                d = (this.options.positioner || this.getPosition).call(this, a.width, a.height, d);
                if (this.outside) {
                    var h = (this.options.borderWidth || 0) + 2 * this.distance;
                    this.renderer.setSize(a.width + h, a.height + h, !1);
                    if (1 !== e.scaleX || 1 !== e.scaleY) r(this.container, {transform: "scale(" + e.scaleX + ", " + e.scaleY + ")"}), k *= e.scaleX, c *= e.scaleY;
                    k += e.left - d.x;
                    c += e.top - d.y
                }
                this.move(Math.round(d.x), Math.round(d.y || 0), k, c)
            };
            return b
        }();
        f.Tooltip = b;
        return f.Tooltip
    });
    J(b,
        "Core/Pointer.js", [b["Core/Color/Color.js"], b["Core/Globals.js"], b["Core/Color/Palette.js"], b["Core/Tooltip.js"], b["Core/Utilities.js"]], function (b, f, D, y, C) {
            var B = b.parse, t = f.charts, r = f.noop, p = C.addEvent, l = C.attr, g = C.css, e = C.defined,
                d = C.extend, u = C.find, H = C.fireEvent, I = C.isNumber, K = C.isObject, F = C.objectEach,
                w = C.offset, z = C.pick, q = C.splat;
            "";
            b = function () {
                function b(c, d) {
                    this.lastValidTouch = {};
                    this.pinchDown = [];
                    this.runChartClick = !1;
                    this.eventsToUnbind = [];
                    this.chart = c;
                    this.hasDragged = !1;
                    this.options =
                        d;
                    this.init(c, d)
                }

                b.prototype.applyInactiveState = function (c) {
                    var d = [], a;
                    (c || []).forEach(function (c) {
                        a = c.series;
                        d.push(a);
                        a.linkedParent && d.push(a.linkedParent);
                        a.linkedSeries && (d = d.concat(a.linkedSeries));
                        a.navigatorSeries && d.push(a.navigatorSeries)
                    });
                    this.chart.series.forEach(function (a) {
                        -1 === d.indexOf(a) ? a.setState("inactive", !0) : a.options.inactiveOtherPoints && a.setAllPointsToState("inactive")
                    })
                };
                b.prototype.destroy = function () {
                    var c = this;
                    this.eventsToUnbind.forEach(function (c) {
                        return c()
                    });
                    this.eventsToUnbind =
                        [];
                    f.chartCount || (f.unbindDocumentMouseUp && (f.unbindDocumentMouseUp = f.unbindDocumentMouseUp()), f.unbindDocumentTouchEnd && (f.unbindDocumentTouchEnd = f.unbindDocumentTouchEnd()));
                    clearInterval(c.tooltipTimeout);
                    F(c, function (d, a) {
                        c[a] = void 0
                    })
                };
                b.prototype.drag = function (c) {
                    var d = this.chart, a = d.options.chart, k = c.chartX, h = c.chartY, e = this.zoomHor,
                        b = this.zoomVert, g = d.plotLeft, m = d.plotTop, l = d.plotWidth, f = d.plotHeight,
                        q = this.selectionMarker, p = this.mouseDownX || 0, u = this.mouseDownY || 0,
                        w = K(a.panning) ? a.panning &&
                            a.panning.enabled : a.panning, z = a.panKey && c[a.panKey + "Key"];
                    if (!q || !q.touch) if (k < g ? k = g : k > g + l && (k = g + l), h < m ? h = m : h > m + f && (h = m + f), this.hasDragged = Math.sqrt(Math.pow(p - k, 2) + Math.pow(u - h, 2)), 10 < this.hasDragged) {
                        var r = d.isInsidePlot(p - g, u - m, {visiblePlotOnly: !0});
                        d.hasCartesianSeries && (this.zoomX || this.zoomY) && r && !z && !q && (this.selectionMarker = q = d.renderer.rect(g, m, e ? 1 : l, b ? 1 : f, 0).attr({
                            "class": "highcharts-selection-marker",
                            zIndex: 7
                        }).add(), d.styledMode || q.attr({fill: a.selectionMarkerFill || B(D.highlightColor80).setOpacity(.25).get()}));
                        q && e && (k -= p, q.attr({width: Math.abs(k), x: (0 < k ? 0 : k) + p}));
                        q && b && (k = h - u, q.attr({height: Math.abs(k), y: (0 < k ? 0 : k) + u}));
                        r && !q && w && d.pan(c, a.panning)
                    }
                };
                b.prototype.dragStart = function (c) {
                    var d = this.chart;
                    d.mouseIsDown = c.type;
                    d.cancelClick = !1;
                    d.mouseDownX = this.mouseDownX = c.chartX;
                    d.mouseDownY = this.mouseDownY = c.chartY
                };
                b.prototype.drop = function (c) {
                    var b = this, a = this.chart, k = this.hasPinched;
                    if (this.selectionMarker) {
                        var h = {originalEvent: c, xAxis: [], yAxis: []}, m = this.selectionMarker,
                            l = m.attr ? m.attr("x") : m.x, f = m.attr ?
                            m.attr("y") : m.y, q = m.attr ? m.attr("width") : m.width,
                            p = m.attr ? m.attr("height") : m.height, u;
                        if (this.hasDragged || k) a.axes.forEach(function (a) {
                            if (a.zoomEnabled && e(a.min) && (k || b[{
                                xAxis: "zoomX",
                                yAxis: "zoomY"
                            }[a.coll]]) && I(l) && I(f)) {
                                var d = a.horiz, n = "touchend" === c.type ? a.minPixelPadding : 0,
                                    g = a.toValue((d ? l : f) + n);
                                d = a.toValue((d ? l + q : f + p) - n);
                                h[a.coll].push({axis: a, min: Math.min(g, d), max: Math.max(g, d)});
                                u = !0
                            }
                        }), u && H(a, "selection", h, function (c) {
                            a.zoom(d(c, k ? {animation: !1} : null))
                        });
                        I(a.index) && (this.selectionMarker =
                            this.selectionMarker.destroy());
                        k && this.scaleGroups()
                    }
                    a && I(a.index) && (g(a.container, {cursor: a._cursor}), a.cancelClick = 10 < this.hasDragged, a.mouseIsDown = this.hasDragged = this.hasPinched = !1, this.pinchDown = [])
                };
                b.prototype.findNearestKDPoint = function (c, d, a) {
                    var k = this.chart, h = k.hoverPoint;
                    k = k.tooltip;
                    if (h && k && k.isStickyOnContact()) return h;
                    var e;
                    c.forEach(function (c) {
                        var h = !(c.noSharedTooltip && d) && 0 > c.options.findNearestPointBy.indexOf("y");
                        c = c.searchPoint(a, h);
                        if ((h = K(c, !0) && c.series) && !(h = !K(e, !0))) {
                            h =
                                e.distX - c.distX;
                            var k = e.dist - c.dist,
                                b = (c.series.group && c.series.group.zIndex) - (e.series.group && e.series.group.zIndex);
                            h = 0 < (0 !== h && d ? h : 0 !== k ? k : 0 !== b ? b : e.series.index > c.series.index ? -1 : 1)
                        }
                        h && (e = c)
                    });
                    return e
                };
                b.prototype.getChartCoordinatesFromPoint = function (c, d) {
                    var a = c.series, k = a.xAxis;
                    a = a.yAxis;
                    var h = c.shapeArgs;
                    if (k && a) {
                        var e = z(c.clientX, c.plotX), b = c.plotY || 0;
                        c.isNode && h && I(h.x) && I(h.y) && (e = h.x, b = h.y);
                        return d ? {chartX: a.len + a.pos - b, chartY: k.len + k.pos - e} : {
                            chartX: e + k.pos,
                            chartY: b + a.pos
                        }
                    }
                    if (h && h.x &&
                        h.y) return {chartX: h.x, chartY: h.y}
                };
                b.prototype.getChartPosition = function () {
                    if (this.chartPosition) return this.chartPosition;
                    var c = this.chart.container, d = w(c);
                    this.chartPosition = {left: d.left, top: d.top, scaleX: 1, scaleY: 1};
                    var a = c.offsetWidth;
                    c = c.offsetHeight;
                    2 < a && 2 < c && (this.chartPosition.scaleX = d.width / a, this.chartPosition.scaleY = d.height / c);
                    return this.chartPosition
                };
                b.prototype.getCoordinates = function (c) {
                    var d = {xAxis: [], yAxis: []};
                    this.chart.axes.forEach(function (a) {
                        d[a.isXAxis ? "xAxis" : "yAxis"].push({
                            axis: a,
                            value: a.toValue(c[a.horiz ? "chartX" : "chartY"])
                        })
                    });
                    return d
                };
                b.prototype.getHoverData = function (c, d, a, k, h, e) {
                    var b, n = [];
                    k = !(!k || !c);
                    var g = d && !d.stickyTracking,
                        m = {chartX: e ? e.chartX : void 0, chartY: e ? e.chartY : void 0, shared: h};
                    H(this, "beforeGetHoverData", m);
                    g = g ? [d] : a.filter(function (a) {
                        return m.filter ? m.filter(a) : a.visible && !(!h && a.directTouch) && z(a.options.enableMouseTracking, !0) && a.stickyTracking
                    });
                    d = (b = k || !e ? c : this.findNearestKDPoint(g, h, e)) && b.series;
                    b && (h && !d.noSharedTooltip ? (g = a.filter(function (a) {
                        return m.filter ?
                            m.filter(a) : a.visible && !(!h && a.directTouch) && z(a.options.enableMouseTracking, !0) && !a.noSharedTooltip
                    }), g.forEach(function (a) {
                        var c = u(a.points, function (a) {
                            return a.x === b.x && !a.isNull
                        });
                        K(c) && (a.chart.isBoosting && (c = a.getPoint(c)), n.push(c))
                    })) : n.push(b));
                    m = {hoverPoint: b};
                    H(this, "afterGetHoverData", m);
                    return {hoverPoint: m.hoverPoint, hoverSeries: d, hoverPoints: n}
                };
                b.prototype.getPointFromEvent = function (c) {
                    c = c.target;
                    for (var d; c && !d;) d = c.point, c = c.parentNode;
                    return d
                };
                b.prototype.onTrackerMouseOut = function (c) {
                    c =
                        c.relatedTarget || c.toElement;
                    var d = this.chart.hoverSeries;
                    this.isDirectTouch = !1;
                    if (!(!d || !c || d.stickyTracking || this.inClass(c, "highcharts-tooltip") || this.inClass(c, "highcharts-series-" + d.index) && this.inClass(c, "highcharts-tracker"))) d.onMouseOut()
                };
                b.prototype.inClass = function (c, d) {
                    for (var a; c;) {
                        if (a = l(c, "class")) {
                            if (-1 !== a.indexOf(d)) return !0;
                            if (-1 !== a.indexOf("highcharts-container")) return !1
                        }
                        c = c.parentNode
                    }
                };
                b.prototype.init = function (c, d) {
                    this.options = d;
                    this.chart = c;
                    this.runChartClick = !(!d.chart.events ||
                        !d.chart.events.click);
                    this.pinchDown = [];
                    this.lastValidTouch = {};
                    y && (c.tooltip = new y(c, d.tooltip), this.followTouchMove = z(d.tooltip.followTouchMove, !0));
                    this.setDOMEvents()
                };
                b.prototype.normalize = function (c, e) {
                    var a = c.touches, k = a ? a.length ? a.item(0) : z(a.changedTouches, c.changedTouches)[0] : c;
                    e || (e = this.getChartPosition());
                    a = k.pageX - e.left;
                    k = k.pageY - e.top;
                    a /= e.scaleX;
                    k /= e.scaleY;
                    return d(c, {chartX: Math.round(a), chartY: Math.round(k)})
                };
                b.prototype.onContainerClick = function (c) {
                    var e = this.chart, a = e.hoverPoint;
                    c = this.normalize(c);
                    var k = e.plotLeft, h = e.plotTop;
                    e.cancelClick || (a && this.inClass(c.target, "highcharts-tracker") ? (H(a.series, "click", d(c, {point: a})), e.hoverPoint && a.firePointEvent("click", c)) : (d(c, this.getCoordinates(c)), e.isInsidePlot(c.chartX - k, c.chartY - h, {visiblePlotOnly: !0}) && H(e, "click", c)))
                };
                b.prototype.onContainerMouseDown = function (c) {
                    var d = 1 === ((c.buttons || c.button) & 1);
                    c = this.normalize(c);
                    if (f.isFirefox && 0 !== c.button) this.onContainerMouseMove(c);
                    if ("undefined" === typeof c.button || d) this.zoomOption(c),
                    d && c.preventDefault && c.preventDefault(), this.dragStart(c)
                };
                b.prototype.onContainerMouseLeave = function (c) {
                    var d = t[z(f.hoverChartIndex, -1)], a = this.chart.tooltip;
                    c = this.normalize(c);
                    d && (c.relatedTarget || c.toElement) && (d.pointer.reset(), d.pointer.chartPosition = void 0);
                    a && !a.isHidden && this.reset()
                };
                b.prototype.onContainerMouseEnter = function (c) {
                    delete this.chartPosition
                };
                b.prototype.onContainerMouseMove = function (c) {
                    var d = this.chart;
                    c = this.normalize(c);
                    this.setHoverChartIndex();
                    c.preventDefault || (c.returnValue =
                        !1);
                    ("mousedown" === d.mouseIsDown || this.touchSelect(c)) && this.drag(c);
                    d.openMenu || !this.inClass(c.target, "highcharts-tracker") && !d.isInsidePlot(c.chartX - d.plotLeft, c.chartY - d.plotTop, {visiblePlotOnly: !0}) || this.runPointActions(c)
                };
                b.prototype.onDocumentTouchEnd = function (c) {
                    t[f.hoverChartIndex] && t[f.hoverChartIndex].pointer.drop(c)
                };
                b.prototype.onContainerTouchMove = function (c) {
                    if (this.touchSelect(c)) this.onContainerMouseMove(c); else this.touch(c)
                };
                b.prototype.onContainerTouchStart = function (c) {
                    if (this.touchSelect(c)) this.onContainerMouseDown(c);
                    else this.zoomOption(c), this.touch(c, !0)
                };
                b.prototype.onDocumentMouseMove = function (c) {
                    var d = this.chart, a = this.chartPosition;
                    c = this.normalize(c, a);
                    var k = d.tooltip;
                    !a || k && k.isStickyOnContact() || d.isInsidePlot(c.chartX - d.plotLeft, c.chartY - d.plotTop, {visiblePlotOnly: !0}) || this.inClass(c.target, "highcharts-tracker") || this.reset()
                };
                b.prototype.onDocumentMouseUp = function (c) {
                    var d = t[z(f.hoverChartIndex, -1)];
                    d && d.pointer.drop(c)
                };
                b.prototype.pinch = function (c) {
                    var e = this, a = e.chart, k = e.pinchDown, h = c.touches ||
                        [], b = h.length, g = e.lastValidTouch, m = e.hasZoom, l = e.selectionMarker, f = {},
                        q = 1 === b && (e.inClass(c.target, "highcharts-tracker") && a.runTrackerClick || e.runChartClick),
                        p = {};
                    1 < b && (e.initiated = !0);
                    m && e.initiated && !q && !1 !== c.cancelable && c.preventDefault();
                    [].map.call(h, function (a) {
                        return e.normalize(a)
                    });
                    "touchstart" === c.type ? ([].forEach.call(h, function (a, c) {
                        k[c] = {chartX: a.chartX, chartY: a.chartY}
                    }), g.x = [k[0].chartX, k[1] && k[1].chartX], g.y = [k[0].chartY, k[1] && k[1].chartY], a.axes.forEach(function (c) {
                        if (c.zoomEnabled) {
                            var d =
                                    a.bounds[c.horiz ? "h" : "v"], h = c.minPixelPadding,
                                e = c.toPixels(Math.min(z(c.options.min, c.dataMin), c.dataMin)),
                                k = c.toPixels(Math.max(z(c.options.max, c.dataMax), c.dataMax)), b = Math.max(e, k);
                            d.min = Math.min(c.pos, Math.min(e, k) - h);
                            d.max = Math.max(c.pos + c.len, b + h)
                        }
                    }), e.res = !0) : e.followTouchMove && 1 === b ? this.runPointActions(e.normalize(c)) : k.length && (l || (e.selectionMarker = l = d({
                        destroy: r,
                        touch: !0
                    }, a.plotBox)), e.pinchTranslate(k, h, f, l, p, g), e.hasPinched = m, e.scaleGroups(f, p), e.res && (e.res = !1, this.reset(!1, 0)))
                };
                b.prototype.pinchTranslate =
                    function (c, d, a, e, h, b) {
                        this.zoomHor && this.pinchTranslateDirection(!0, c, d, a, e, h, b);
                        this.zoomVert && this.pinchTranslateDirection(!1, c, d, a, e, h, b)
                    };
                b.prototype.pinchTranslateDirection = function (c, d, a, e, h, b, g, m) {
                    var k = this.chart, n = c ? "x" : "y", l = c ? "X" : "Y", f = "chart" + l,
                        v = c ? "width" : "height", q = k["plot" + (c ? "Left" : "Top")], p, E, u = m || 1,
                        w = k.inverted, P = k.bounds[c ? "h" : "v"], z = 1 === d.length, r = d[0][f], L = a[0][f],
                        t = !z && d[1][f], H = !z && a[1][f];
                    a = function () {
                        "number" === typeof H && 20 < Math.abs(r - t) && (u = m || Math.abs(L - H) / Math.abs(r - t));
                        E = (q - L) / u + r;
                        p = k["plot" + (c ? "Width" : "Height")] / u
                    };
                    a();
                    d = E;
                    if (d < P.min) {
                        d = P.min;
                        var F = !0
                    } else d + p > P.max && (d = P.max - p, F = !0);
                    F ? (L -= .8 * (L - g[n][0]), "number" === typeof H && (H -= .8 * (H - g[n][1])), a()) : g[n] = [L, H];
                    w || (b[n] = E - q, b[v] = p);
                    b = w ? 1 / u : u;
                    h[v] = p;
                    h[n] = d;
                    e[w ? c ? "scaleY" : "scaleX" : "scale" + l] = u;
                    e["translate" + l] = b * q + (L - b * r)
                };
                b.prototype.reset = function (c, d) {
                    var a = this.chart, e = a.hoverSeries, h = a.hoverPoint, b = a.hoverPoints, g = a.tooltip,
                        m = g && g.shared ? b : h;
                    c && m && q(m).forEach(function (a) {
                        a.series.isCartesian && "undefined" ===
                        typeof a.plotX && (c = !1)
                    });
                    if (c) g && m && q(m).length && (g.refresh(m), g.shared && b ? b.forEach(function (a) {
                        a.setState(a.state, !0);
                        a.series.isCartesian && (a.series.xAxis.crosshair && a.series.xAxis.drawCrosshair(null, a), a.series.yAxis.crosshair && a.series.yAxis.drawCrosshair(null, a))
                    }) : h && (h.setState(h.state, !0), a.axes.forEach(function (a) {
                        a.crosshair && h.series[a.coll] === a && a.drawCrosshair(null, h)
                    }))); else {
                        if (h) h.onMouseOut();
                        b && b.forEach(function (a) {
                            a.setState()
                        });
                        if (e) e.onMouseOut();
                        g && g.hide(d);
                        this.unDocMouseMove &&
                        (this.unDocMouseMove = this.unDocMouseMove());
                        a.axes.forEach(function (a) {
                            a.hideCrosshair()
                        });
                        this.hoverX = a.hoverPoints = a.hoverPoint = null
                    }
                };
                b.prototype.runPointActions = function (c, d) {
                    var a = this.chart, e = a.tooltip && a.tooltip.options.enabled ? a.tooltip : void 0,
                        h = e ? e.shared : !1, b = d || a.hoverPoint, g = b && b.series || a.hoverSeries;
                    g = this.getHoverData(b, g, a.series, (!c || "touchmove" !== c.type) && (!!d || g && g.directTouch && this.isDirectTouch), h, c);
                    b = g.hoverPoint;
                    var m = g.hoverPoints;
                    d = (g = g.hoverSeries) && g.tooltipOptions.followPointer &&
                        !g.tooltipOptions.split;
                    h = h && g && !g.noSharedTooltip;
                    if (b && (b !== a.hoverPoint || e && e.isHidden)) {
                        (a.hoverPoints || []).forEach(function (a) {
                            -1 === m.indexOf(a) && a.setState()
                        });
                        if (a.hoverSeries !== g) g.onMouseOver();
                        this.applyInactiveState(m);
                        (m || []).forEach(function (a) {
                            a.setState("hover")
                        });
                        a.hoverPoint && a.hoverPoint.firePointEvent("mouseOut");
                        if (!b.series) return;
                        a.hoverPoints = m;
                        a.hoverPoint = b;
                        b.firePointEvent("mouseOver");
                        e && e.refresh(h ? m : b, c)
                    } else d && e && !e.isHidden && (b = e.getAnchor([{}], c), a.isInsidePlot(b[0],
                        b[1], {visiblePlotOnly: !0}) && e.updatePosition({plotX: b[0], plotY: b[1]}));
                    this.unDocMouseMove || (this.unDocMouseMove = p(a.container.ownerDocument, "mousemove", function (a) {
                        var c = t[f.hoverChartIndex];
                        if (c) c.pointer.onDocumentMouseMove(a)
                    }), this.eventsToUnbind.push(this.unDocMouseMove));
                    a.axes.forEach(function (d) {
                        var h = z((d.crosshair || {}).snap, !0), e;
                        h && ((e = a.hoverPoint) && e.series[d.coll] === d || (e = u(m, function (a) {
                            return a.series[d.coll] === d
                        })));
                        e || !h ? d.drawCrosshair(c, e) : d.hideCrosshair()
                    })
                };
                b.prototype.scaleGroups =
                    function (c, d) {
                        var a = this.chart, e;
                        a.series.forEach(function (h) {
                            e = c || h.getPlotBox();
                            h.xAxis && h.xAxis.zoomEnabled && h.group && (h.group.attr(e), h.markerGroup && (h.markerGroup.attr(e), h.markerGroup.clip(d ? a.clipRect : null)), h.dataLabelsGroup && h.dataLabelsGroup.attr(e))
                        });
                        a.clipRect.attr(d || a.clipBox)
                    };
                b.prototype.setDOMEvents = function () {
                    var c = this, d = this.chart.container, a = d.ownerDocument;
                    d.onmousedown = this.onContainerMouseDown.bind(this);
                    d.onmousemove = this.onContainerMouseMove.bind(this);
                    d.onclick = this.onContainerClick.bind(this);
                    this.eventsToUnbind.push(p(d, "mouseenter", this.onContainerMouseEnter.bind(this)));
                    this.eventsToUnbind.push(p(d, "mouseleave", this.onContainerMouseLeave.bind(this)));
                    f.unbindDocumentMouseUp || (f.unbindDocumentMouseUp = p(a, "mouseup", this.onDocumentMouseUp.bind(this)));
                    for (var e = this.chart.renderTo.parentElement; e && "BODY" !== e.tagName;) this.eventsToUnbind.push(p(e, "scroll", function () {
                        delete c.chartPosition
                    })), e = e.parentElement;
                    f.hasTouch && (this.eventsToUnbind.push(p(d, "touchstart", this.onContainerTouchStart.bind(this),
                        {passive: !1})), this.eventsToUnbind.push(p(d, "touchmove", this.onContainerTouchMove.bind(this), {passive: !1})), f.unbindDocumentTouchEnd || (f.unbindDocumentTouchEnd = p(a, "touchend", this.onDocumentTouchEnd.bind(this), {passive: !1})))
                };
                b.prototype.setHoverChartIndex = function () {
                    var c = this.chart, d = f.charts[z(f.hoverChartIndex, -1)];
                    if (d && d !== c) d.pointer.onContainerMouseLeave({relatedTarget: !0});
                    d && d.mouseIsDown || (f.hoverChartIndex = c.index)
                };
                b.prototype.touch = function (c, d) {
                    var a = this.chart, e;
                    this.setHoverChartIndex();
                    if (1 === c.touches.length) if (c = this.normalize(c), (e = a.isInsidePlot(c.chartX - a.plotLeft, c.chartY - a.plotTop, {visiblePlotOnly: !0})) && !a.openMenu) {
                        d && this.runPointActions(c);
                        if ("touchmove" === c.type) {
                            d = this.pinchDown;
                            var h = d[0] ? 4 <= Math.sqrt(Math.pow(d[0].chartX - c.chartX, 2) + Math.pow(d[0].chartY - c.chartY, 2)) : !1
                        }
                        z(h, !0) && this.pinch(c)
                    } else d && this.reset(); else 2 === c.touches.length && this.pinch(c)
                };
                b.prototype.touchSelect = function (c) {
                    return !(!this.chart.options.chart.zoomBySingleTouch || !c.touches || 1 !== c.touches.length)
                };
                b.prototype.zoomOption = function (c) {
                    var d = this.chart, a = d.options.chart, e = a.zoomType || "";
                    d = d.inverted;
                    /touch/.test(c.type) && (e = z(a.pinchType, e));
                    this.zoomX = c = /x/.test(e);
                    this.zoomY = e = /y/.test(e);
                    this.zoomHor = c && !d || e && d;
                    this.zoomVert = e && !d || c && d;
                    this.hasZoom = c || e
                };
                return b
            }();
            return f.Pointer = b
        });
    J(b, "Core/MSPointer.js", [b["Core/Globals.js"], b["Core/Pointer.js"], b["Core/Utilities.js"]], function (b, f, D) {
        function B() {
            var d = [];
            d.item = function (d) {
                return this[d]
            };
            e(u, function (e) {
                d.push({
                    pageX: e.pageX, pageY: e.pageY,
                    target: e.target
                })
            });
            return d
        }

        function C(d, e, g, l) {
            "touch" !== d.pointerType && d.pointerType !== d.MSPOINTER_TYPE_TOUCH || !t[b.hoverChartIndex] || (l(d), l = t[b.hoverChartIndex].pointer, l[e]({
                type: g,
                target: d.currentTarget,
                preventDefault: p,
                touches: B()
            }))
        }

        var A = this && this.__extends || function () {
                var d = function (e, b) {
                    d = Object.setPrototypeOf || {__proto__: []} instanceof Array && function (d, e) {
                        d.__proto__ = e
                    } || function (d, e) {
                        for (var b in e) e.hasOwnProperty(b) && (d[b] = e[b])
                    };
                    return d(e, b)
                };
                return function (e, b) {
                    function g() {
                        this.constructor =
                            e
                    }

                    d(e, b);
                    e.prototype = null === b ? Object.create(b) : (g.prototype = b.prototype, new g)
                }
            }(), t = b.charts, r = b.doc, p = b.noop, l = D.addEvent, g = D.css, e = D.objectEach, d = D.removeEvent,
            u = {}, H = !!b.win.PointerEvent;
        return function (e) {
            function b() {
                return null !== e && e.apply(this, arguments) || this
            }

            A(b, e);
            b.prototype.batchMSEvents = function (d) {
                d(this.chart.container, H ? "pointerdown" : "MSPointerDown", this.onContainerPointerDown);
                d(this.chart.container, H ? "pointermove" : "MSPointerMove", this.onContainerPointerMove);
                d(r, H ? "pointerup" :
                    "MSPointerUp", this.onDocumentPointerUp)
            };
            b.prototype.destroy = function () {
                this.batchMSEvents(d);
                e.prototype.destroy.call(this)
            };
            b.prototype.init = function (d, b) {
                e.prototype.init.call(this, d, b);
                this.hasZoom && g(d.container, {"-ms-touch-action": "none", "touch-action": "none"})
            };
            b.prototype.onContainerPointerDown = function (d) {
                C(d, "onContainerTouchStart", "touchstart", function (d) {
                    u[d.pointerId] = {pageX: d.pageX, pageY: d.pageY, target: d.currentTarget}
                })
            };
            b.prototype.onContainerPointerMove = function (d) {
                C(d, "onContainerTouchMove",
                    "touchmove", function (d) {
                        u[d.pointerId] = {pageX: d.pageX, pageY: d.pageY};
                        u[d.pointerId].target || (u[d.pointerId].target = d.currentTarget)
                    })
            };
            b.prototype.onDocumentPointerUp = function (d) {
                C(d, "onDocumentTouchEnd", "touchend", function (d) {
                    delete u[d.pointerId]
                })
            };
            b.prototype.setDOMEvents = function () {
                e.prototype.setDOMEvents.call(this);
                (this.hasZoom || this.followTouchMove) && this.batchMSEvents(l)
            };
            return b
        }(f)
    });
    J(b, "Core/Series/Point.js", [b["Core/Renderer/HTML/AST.js"], b["Core/Animation/AnimationUtilities.js"],
        b["Core/FormatUtilities.js"], b["Core/Globals.js"], b["Core/Options.js"], b["Core/Utilities.js"]], function (b, f, D, y, C, A) {
        var t = f.animObject, r = D.format, p = C.defaultOptions, l = A.addEvent, g = A.defined, e = A.erase,
            d = A.extend, u = A.fireEvent, H = A.getNestedProperty, B = A.isArray, K = A.isFunction, F = A.isNumber,
            w = A.isObject, z = A.merge, q = A.objectEach, m = A.pick, c = A.syncTimeout, n = A.removeEvent,
            a = A.uniqueKey;
        "";
        f = function () {
            function k() {
                this.colorIndex = this.category = void 0;
                this.formatPrefix = "point";
                this.id = void 0;
                this.isNull = !1;
                this.percentage = this.options = this.name = void 0;
                this.selected = !1;
                this.total = this.series = void 0;
                this.visible = !0;
                this.x = void 0
            }

            k.prototype.animateBeforeDestroy = function () {
                var a = this, c = {x: a.startXPos, opacity: 0}, e, k = a.getGraphicalProps();
                k.singular.forEach(function (d) {
                    e = "dataLabel" === d;
                    a[d] = a[d].animate(e ? {x: a[d].startXPos, y: a[d].startYPos, opacity: 0} : c)
                });
                k.plural.forEach(function (c) {
                    a[c].forEach(function (c) {
                        c.element && c.animate(d({x: a.startXPos}, c.startYPos ? {x: c.startXPos, y: c.startYPos} : {}))
                    })
                })
            };
            k.prototype.applyOptions =
                function (a, c) {
                    var h = this.series, e = h.options.pointValKey || h.pointValKey;
                    a = k.prototype.optionsToObject.call(this, a);
                    d(this, a);
                    this.options = this.options ? d(this.options, a) : a;
                    a.group && delete this.group;
                    a.dataLabels && delete this.dataLabels;
                    e && (this.y = k.prototype.getNestedProperty.call(this, e));
                    this.formatPrefix = (this.isNull = m(this.isValid && !this.isValid(), null === this.x || !F(this.y))) ? "null" : "point";
                    this.selected && (this.state = "select");
                    "name" in this && "undefined" === typeof c && h.xAxis && h.xAxis.hasNames && (this.x =
                        h.xAxis.nameToX(this));
                    "undefined" === typeof this.x && h && (this.x = "undefined" === typeof c ? h.autoIncrement(this) : c);
                    return this
                };
            k.prototype.destroy = function () {
                function a() {
                    if (d.graphic || d.dataLabel || d.dataLabels) n(d), d.destroyElements();
                    for (l in d) d[l] = null
                }

                var d = this, k = d.series, b = k.chart;
                k = k.options.dataSorting;
                var g = b.hoverPoints, m = t(d.series.chart.renderer.globalAnimation), l;
                d.legendItem && b.legend.destroyItem(d);
                g && (d.setState(), e(g, d), g.length || (b.hoverPoints = null));
                if (d === b.hoverPoint) d.onMouseOut();
                k && k.enabled ? (this.animateBeforeDestroy(), c(a, m.duration)) : a();
                b.pointCount--
            };
            k.prototype.destroyElements = function (a) {
                var c = this;
                a = c.getGraphicalProps(a);
                a.singular.forEach(function (a) {
                    c[a] = c[a].destroy()
                });
                a.plural.forEach(function (a) {
                    c[a].forEach(function (a) {
                        a.element && a.destroy()
                    });
                    delete c[a]
                })
            };
            k.prototype.firePointEvent = function (a, c, d) {
                var h = this, e = this.series.options;
                (e.point.events[a] || h.options && h.options.events && h.options.events[a]) && h.importEvents();
                "click" === a && e.allowPointSelect && (d =
                    function (a) {
                        h.select && h.select(null, a.ctrlKey || a.metaKey || a.shiftKey)
                    });
                u(h, a, c, d)
            };
            k.prototype.getClassName = function () {
                return "highcharts-point" + (this.selected ? " highcharts-point-select" : "") + (this.negative ? " highcharts-negative" : "") + (this.isNull ? " highcharts-null-point" : "") + ("undefined" !== typeof this.colorIndex ? " highcharts-color-" + this.colorIndex : "") + (this.options.className ? " " + this.options.className : "") + (this.zone && this.zone.className ? " " + this.zone.className.replace("highcharts-negative", "") : "")
            };
            k.prototype.getGraphicalProps = function (a) {
                var c = this, d = [], h, e = {singular: [], plural: []};
                a = a || {graphic: 1, dataLabel: 1};
                a.graphic && d.push("graphic", "upperGraphic", "shadowGroup");
                a.dataLabel && d.push("dataLabel", "dataLabelUpper", "connector");
                for (h = d.length; h--;) {
                    var k = d[h];
                    c[k] && e.singular.push(k)
                }
                ["dataLabel", "connector"].forEach(function (d) {
                    var h = d + "s";
                    a[d] && c[h] && e.plural.push(h)
                });
                return e
            };
            k.prototype.getLabelConfig = function () {
                return {
                    x: this.category,
                    y: this.y,
                    color: this.color,
                    colorIndex: this.colorIndex,
                    key: this.name || this.category,
                    series: this.series,
                    point: this,
                    percentage: this.percentage,
                    total: this.total || this.stackTotal
                }
            };
            k.prototype.getNestedProperty = function (a) {
                if (a) return 0 === a.indexOf("custom.") ? H(a, this.options) : this[a]
            };
            k.prototype.getZone = function () {
                var a = this.series, c = a.zones;
                a = a.zoneAxis || "y";
                var d = 0, e;
                for (e = c[d]; this[a] >= e.value;) e = c[++d];
                this.nonZonedColor || (this.nonZonedColor = this.color);
                this.color = e && e.color && !this.options.color ? e.color : this.nonZonedColor;
                return e
            };
            k.prototype.hasNewShapeType =
                function () {
                    return (this.graphic && (this.graphic.symbolName || this.graphic.element.nodeName)) !== this.shapeType
                };
            k.prototype.init = function (c, d, e) {
                this.series = c;
                this.applyOptions(d, e);
                this.id = g(this.id) ? this.id : a();
                this.resolveColor();
                c.chart.pointCount++;
                u(this, "afterInit");
                return this
            };
            k.prototype.optionsToObject = function (a) {
                var c = {}, d = this.series, h = d.options.keys, e = h || d.pointArrayMap || ["y"], b = e.length, g = 0,
                    m = 0;
                if (F(a) || null === a) c[e[0]] = a; else if (B(a)) for (!h && a.length > b && (d = typeof a[0], "string" === d ? c.name =
                    a[0] : "number" === d && (c.x = a[0]), g++); m < b;) h && "undefined" === typeof a[g] || (0 < e[m].indexOf(".") ? k.prototype.setNestedProperty(c, a[g], e[m]) : c[e[m]] = a[g]), g++, m++; else "object" === typeof a && (c = a, a.dataLabels && (d._hasPointLabels = !0), a.marker && (d._hasPointMarkers = !0));
                return c
            };
            k.prototype.resolveColor = function () {
                var a = this.series;
                var c = a.chart.options.chart.colorCount;
                var d = a.chart.styledMode;
                delete this.nonZonedColor;
                if (a.options.colorByPoint) {
                    if (!d) {
                        c = a.options.colors || a.chart.options.colors;
                        var e = c[a.colorCounter];
                        c = c.length
                    }
                    d = a.colorCounter;
                    a.colorCounter++;
                    a.colorCounter === c && (a.colorCounter = 0)
                } else d || (e = a.color), d = a.colorIndex;
                this.colorIndex = m(this.options.colorIndex, d);
                this.color = m(this.options.color, e)
            };
            k.prototype.setNestedProperty = function (a, c, d) {
                d.split(".").reduce(function (a, d, h, e) {
                    a[d] = e.length - 1 === h ? c : w(a[d], !0) ? a[d] : {};
                    return a[d]
                }, a);
                return a
            };
            k.prototype.tooltipFormatter = function (a) {
                var c = this.series, d = c.tooltipOptions, h = m(d.valueDecimals, ""), e = d.valuePrefix || "",
                    k = d.valueSuffix || "";
                c.chart.styledMode &&
                (a = c.chart.tooltip.styledModeFormat(a));
                (c.pointArrayMap || ["y"]).forEach(function (c) {
                    c = "{point." + c;
                    if (e || k) a = a.replace(RegExp(c + "}", "g"), e + c + "}" + k);
                    a = a.replace(RegExp(c + "}", "g"), c + ":,." + h + "f}")
                });
                return r(a, {point: this, series: this.series}, c.chart)
            };
            k.prototype.update = function (a, c, d, e) {
                function h() {
                    k.applyOptions(a);
                    var h = g && k.hasDummyGraphic;
                    h = null === k.y ? !h : h;
                    g && h && (k.graphic = g.destroy(), delete k.hasDummyGraphic);
                    w(a, !0) && (g && g.element && a && a.marker && "undefined" !== typeof a.marker.symbol && (k.graphic =
                        g.destroy()), a && a.dataLabels && k.dataLabel && (k.dataLabel = k.dataLabel.destroy()), k.connector && (k.connector = k.connector.destroy()));
                    n = k.index;
                    b.updateParallelArrays(k, n);
                    f.data[n] = w(f.data[n], !0) || w(a, !0) ? k.options : m(a, f.data[n]);
                    b.isDirty = b.isDirtyData = !0;
                    !b.fixedBox && b.hasCartesianSeries && (l.isDirtyBox = !0);
                    "point" === f.legendType && (l.isDirtyLegend = !0);
                    c && l.redraw(d)
                }

                var k = this, b = k.series, g = k.graphic, n, l = b.chart, f = b.options;
                c = m(c, !0);
                !1 === e ? h() : k.firePointEvent("update", {options: a}, h)
            };
            k.prototype.remove =
                function (a, c) {
                    this.series.removePoint(this.series.data.indexOf(this), a, c)
                };
            k.prototype.select = function (a, c) {
                var d = this, h = d.series, e = h.chart;
                this.selectedStaging = a = m(a, !d.selected);
                d.firePointEvent(a ? "select" : "unselect", {accumulate: c}, function () {
                    d.selected = d.options.selected = a;
                    h.options.data[h.data.indexOf(d)] = d.options;
                    d.setState(a && "select");
                    c || e.getSelectedPoints().forEach(function (a) {
                        var c = a.series;
                        a.selected && a !== d && (a.selected = a.options.selected = !1, c.options.data[c.data.indexOf(a)] = a.options,
                            a.setState(e.hoverPoints && c.options.inactiveOtherPoints ? "inactive" : ""), a.firePointEvent("unselect"))
                    })
                });
                delete this.selectedStaging
            };
            k.prototype.onMouseOver = function (a) {
                var c = this.series.chart, d = c.pointer;
                a = a ? d.normalize(a) : d.getChartCoordinatesFromPoint(this, c.inverted);
                d.runPointActions(a, this)
            };
            k.prototype.onMouseOut = function () {
                var a = this.series.chart;
                this.firePointEvent("mouseOut");
                this.series.options.inactiveOtherPoints || (a.hoverPoints || []).forEach(function (a) {
                    a.setState()
                });
                a.hoverPoints = a.hoverPoint =
                    null
            };
            k.prototype.importEvents = function () {
                if (!this.hasImportedEvents) {
                    var a = this, c = z(a.series.options.point, a.options).events;
                    a.events = c;
                    q(c, function (c, d) {
                        K(c) && l(a, d, c)
                    });
                    this.hasImportedEvents = !0
                }
            };
            k.prototype.setState = function (a, c) {
                var h = this.series, e = this.state, k = h.options.states[a || "normal"] || {},
                    g = p.plotOptions[h.type].marker && h.options.marker, n = g && !1 === g.enabled,
                    l = g && g.states && g.states[a || "normal"] || {}, f = !1 === l.enabled, v = h.stateMarkerGraphic,
                    q = this.marker || {}, w = h.chart, z = h.halo, r, P = g && h.markerAttribs;
                a = a || "";
                if (!(a === this.state && !c || this.selected && "select" !== a || !1 === k.enabled || a && (f || n && !1 === l.enabled) || a && q.states && q.states[a] && !1 === q.states[a].enabled)) {
                    this.state = a;
                    P && (r = h.markerAttribs(this, a));
                    if (this.graphic && !this.hasDummyGraphic) {
                        e && this.graphic.removeClass("highcharts-point-" + e);
                        a && this.graphic.addClass("highcharts-point-" + a);
                        if (!w.styledMode) {
                            var t = h.pointAttribs(this, a);
                            var N = m(w.options.chart.animation, k.animation);
                            h.options.inactiveOtherPoints && F(t.opacity) && ((this.dataLabels || []).forEach(function (a) {
                                a &&
                                a.animate({opacity: t.opacity}, N)
                            }), this.connector && this.connector.animate({opacity: t.opacity}, N));
                            this.graphic.animate(t, N)
                        }
                        r && this.graphic.animate(r, m(w.options.chart.animation, l.animation, g.animation));
                        v && v.hide()
                    } else {
                        if (a && l) {
                            e = q.symbol || h.symbol;
                            v && v.currentSymbol !== e && (v = v.destroy());
                            if (r) if (v) v[c ? "animate" : "attr"]({
                                x: r.x,
                                y: r.y
                            }); else e && (h.stateMarkerGraphic = v = w.renderer.symbol(e, r.x, r.y, r.width, r.height).add(h.markerGroup), v.currentSymbol = e);
                            !w.styledMode && v && v.attr(h.pointAttribs(this, a))
                        }
                        v &&
                        (v[a && this.isInside ? "show" : "hide"](), v.element.point = this)
                    }
                    k = k.halo;
                    r = (v = this.graphic || v) && v.visibility || "inherit";
                    k && k.size && v && "hidden" !== r && !this.isCluster ? (z || (h.halo = z = w.renderer.path().add(v.parentGroup)), z.show()[c ? "animate" : "attr"]({d: this.haloPath(k.size)}), z.attr({
                        "class": "highcharts-halo highcharts-color-" + m(this.colorIndex, h.colorIndex) + (this.className ? " " + this.className : ""),
                        visibility: r,
                        zIndex: -1
                    }), z.point = this, w.styledMode || z.attr(d({
                            fill: this.color || h.color,
                            "fill-opacity": k.opacity
                        },
                        b.filterUserAttributes(k.attributes || {})))) : z && z.point && z.point.haloPath && z.animate({d: z.point.haloPath(0)}, null, z.hide);
                    u(this, "afterSetState", {state: a})
                }
            };
            k.prototype.haloPath = function (a) {
                return this.series.chart.renderer.symbols.circle(Math.floor(this.plotX) - a, this.plotY - a, 2 * a, 2 * a)
            };
            return k
        }();
        return y.Point = f
    });
    J(b, "Core/Legend.js", [b["Core/Animation/AnimationUtilities.js"], b["Core/FormatUtilities.js"], b["Core/Globals.js"], b["Core/Series/Point.js"], b["Core/Utilities.js"]], function (b, f, D, y, C) {
        var B =
            b.animObject, t = b.setAnimation, r = f.format;
        b = D.isFirefox;
        var p = D.marginNames;
        f = D.win;
        var l = C.addEvent, g = C.createElement, e = C.css, d = C.defined, u = C.discardElement, H = C.find,
            I = C.fireEvent, K = C.isNumber, F = C.merge, w = C.pick, z = C.relativeLength, q = C.stableSort,
            m = C.syncTimeout;
        C = C.wrap;
        var c = function () {
            function c(a, c) {
                this.allItems = [];
                this.contentGroup = this.box = void 0;
                this.display = !1;
                this.group = void 0;
                this.offsetWidth = this.maxLegendWidth = this.maxItemWidth = this.legendWidth = this.legendHeight = this.lastLineHeight = this.lastItemY =
                    this.itemY = this.itemX = this.itemMarginTop = this.itemMarginBottom = this.itemHeight = this.initialItemY = 0;
                this.options = {};
                this.padding = 0;
                this.pages = [];
                this.proximate = !1;
                this.scrollGroup = void 0;
                this.widthOption = this.totalItemWidth = this.titleHeight = this.symbolWidth = this.symbolHeight = 0;
                this.chart = a;
                this.init(a, c)
            }

            c.prototype.init = function (a, c) {
                this.chart = a;
                this.setOptions(c);
                c.enabled && (this.render(), l(this.chart, "endResize", function () {
                    this.legend.positionCheckboxes()
                }), this.proximate ? this.unchartrender = l(this.chart,
                    "render", function () {
                        this.legend.proximatePositions();
                        this.legend.positionItems()
                    }) : this.unchartrender && this.unchartrender())
            };
            c.prototype.setOptions = function (a) {
                var c = w(a.padding, 8);
                this.options = a;
                this.chart.styledMode || (this.itemStyle = a.itemStyle, this.itemHiddenStyle = F(this.itemStyle, a.itemHiddenStyle));
                this.itemMarginTop = a.itemMarginTop || 0;
                this.itemMarginBottom = a.itemMarginBottom || 0;
                this.padding = c;
                this.initialItemY = c - 5;
                this.symbolWidth = w(a.symbolWidth, 16);
                this.pages = [];
                this.proximate = "proximate" ===
                    a.layout && !this.chart.inverted;
                this.baseline = void 0
            };
            c.prototype.update = function (a, c) {
                var d = this.chart;
                this.setOptions(F(!0, this.options, a));
                this.destroy();
                d.isDirtyLegend = d.isDirtyBox = !0;
                w(c, !0) && d.redraw();
                I(this, "afterUpdate")
            };
            c.prototype.colorizeItem = function (a, c) {
                a.legendGroup[c ? "removeClass" : "addClass"]("highcharts-legend-item-hidden");
                if (!this.chart.styledMode) {
                    var d = this.options, e = a.legendItem, k = a.legendLine, b = a.legendSymbol,
                        g = this.itemHiddenStyle.color;
                    d = c ? d.itemStyle.color : g;
                    var m = c ? a.color ||
                        g : g, l = a.options && a.options.marker, n = {fill: m};
                    e && e.css({fill: d, color: d});
                    k && k.attr({stroke: m});
                    b && (l && b.isMarker && (n = a.pointAttribs(), c || (n.stroke = n.fill = g)), b.attr(n))
                }
                I(this, "afterColorizeItem", {item: a, visible: c})
            };
            c.prototype.positionItems = function () {
                this.allItems.forEach(this.positionItem, this);
                this.chart.isResizing || this.positionCheckboxes()
            };
            c.prototype.positionItem = function (a) {
                var c = this, e = this.options, b = e.symbolPadding, g = !e.rtl, m = a._legendItemPos;
                e = m[0];
                m = m[1];
                var l = a.checkbox, n = a.legendGroup;
                n && n.element && (b = {
                    translateX: g ? e : this.legendWidth - e - 2 * b - 4,
                    translateY: m
                }, g = function () {
                    I(c, "afterPositionItem", {item: a})
                }, d(n.translateY) ? n.animate(b, void 0, g) : (n.attr(b), g()));
                l && (l.x = e, l.y = m)
            };
            c.prototype.destroyItem = function (a) {
                var c = a.checkbox;
                ["legendItem", "legendLine", "legendSymbol", "legendGroup"].forEach(function (c) {
                    a[c] && (a[c] = a[c].destroy())
                });
                c && u(a.checkbox)
            };
            c.prototype.destroy = function () {
                function a(a) {
                    this[a] && (this[a] = this[a].destroy())
                }

                this.getAllItems().forEach(function (c) {
                    ["legendItem",
                        "legendGroup"].forEach(a, c)
                });
                "clipRect up down pager nav box title group".split(" ").forEach(a, this);
                this.display = null
            };
            c.prototype.positionCheckboxes = function () {
                var a = this.group && this.group.alignAttr, c = this.clipHeight || this.legendHeight,
                    d = this.titleHeight;
                if (a) {
                    var b = a.translateY;
                    this.allItems.forEach(function (h) {
                        var k = h.checkbox;
                        if (k) {
                            var g = b + d + k.y + (this.scrollOffset || 0) + 3;
                            e(k, {
                                left: a.translateX + h.checkboxOffset + k.x - 20 + "px",
                                top: g + "px",
                                display: this.proximate || g > b - 6 && g < b + c - 6 ? "" : "none"
                            })
                        }
                    }, this)
                }
            };
            c.prototype.renderTitle = function () {
                var a = this.options, c = this.padding, d = a.title, e = 0;
                d.text && (this.title || (this.title = this.chart.renderer.label(d.text, c - 3, c - 4, null, null, null, a.useHTML, null, "legend-title").attr({zIndex: 1}), this.chart.styledMode || this.title.css(d.style), this.title.add(this.group)), d.width || this.title.css({width: this.maxLegendWidth + "px"}), a = this.title.getBBox(), e = a.height, this.offsetWidth = a.width, this.contentGroup.attr({translateY: e}));
                this.titleHeight = e
            };
            c.prototype.setText = function (a) {
                var c =
                    this.options;
                a.legendItem.attr({text: c.labelFormat ? r(c.labelFormat, a, this.chart) : c.labelFormatter.call(a)})
            };
            c.prototype.renderItem = function (a) {
                var c = this.chart, d = c.renderer, e = this.options, b = this.symbolWidth, g = e.symbolPadding || 0,
                    m = this.itemStyle, n = this.itemHiddenStyle,
                    l = "horizontal" === e.layout ? w(e.itemDistance, 20) : 0, f = !e.rtl, q = a.legendItem,
                    p = !a.series, u = !p && a.series.drawLegendSymbol ? a.series : a, r = u.options,
                    z = this.createCheckboxForItem && r && r.showCheckbox;
                r = b + g + l + (z ? 20 : 0);
                var t = e.useHTML, P = a.options.className;
                q || (a.legendGroup = d.g("legend-item").addClass("highcharts-" + u.type + "-series highcharts-color-" + a.colorIndex + (P ? " " + P : "") + (p ? " highcharts-series-" + a.index : "")).attr({zIndex: 1}).add(this.scrollGroup), a.legendItem = q = d.text("", f ? b + g : -g, this.baseline || 0, t), c.styledMode || q.css(F(a.visible ? m : n)), q.attr({
                    align: f ? "left" : "right",
                    zIndex: 2
                }).add(a.legendGroup), this.baseline || (this.fontMetrics = d.fontMetrics(c.styledMode ? 12 : m.fontSize, q), this.baseline = this.fontMetrics.f + 3 + this.itemMarginTop, q.attr("y", this.baseline),
                    this.symbolHeight = e.symbolHeight || this.fontMetrics.f, e.squareSymbol && (this.symbolWidth = w(e.symbolWidth, Math.max(this.symbolHeight, 16)), r = this.symbolWidth + g + l + (z ? 20 : 0), f && q.attr("x", this.symbolWidth + g))), u.drawLegendSymbol(this, a), this.setItemEvents && this.setItemEvents(a, q, t));
                z && !a.checkbox && this.createCheckboxForItem && this.createCheckboxForItem(a);
                this.colorizeItem(a, a.visible);
                !c.styledMode && m.width || q.css({width: (e.itemWidth || this.widthOption || c.spacingBox.width) - r + "px"});
                this.setText(a);
                c = q.getBBox();
                a.itemWidth = a.checkboxOffset = e.itemWidth || a.legendItemWidth || c.width + r;
                this.maxItemWidth = Math.max(this.maxItemWidth, a.itemWidth);
                this.totalItemWidth += a.itemWidth;
                this.itemHeight = a.itemHeight = Math.round(a.legendItemHeight || c.height || this.symbolHeight)
            };
            c.prototype.layoutItem = function (a) {
                var c = this.options, d = this.padding, e = "horizontal" === c.layout, b = a.itemHeight,
                    g = this.itemMarginBottom, m = this.itemMarginTop, l = e ? w(c.itemDistance, 20) : 0,
                    n = this.maxLegendWidth;
                c = c.alignColumns && this.totalItemWidth > n ? this.maxItemWidth :
                    a.itemWidth;
                e && this.itemX - d + c > n && (this.itemX = d, this.lastLineHeight && (this.itemY += m + this.lastLineHeight + g), this.lastLineHeight = 0);
                this.lastItemY = m + this.itemY + g;
                this.lastLineHeight = Math.max(b, this.lastLineHeight);
                a._legendItemPos = [this.itemX, this.itemY];
                e ? this.itemX += c : (this.itemY += m + b + g, this.lastLineHeight = b);
                this.offsetWidth = this.widthOption || Math.max((e ? this.itemX - d - (a.checkbox ? 0 : l) : c) + d, this.offsetWidth)
            };
            c.prototype.getAllItems = function () {
                var a = [];
                this.chart.series.forEach(function (c) {
                    var e = c &&
                        c.options;
                    c && w(e.showInLegend, d(e.linkedTo) ? !1 : void 0, !0) && (a = a.concat(c.legendItems || ("point" === e.legendType ? c.data : c)))
                });
                I(this, "afterGetAllItems", {allItems: a});
                return a
            };
            c.prototype.getAlignment = function () {
                var a = this.options;
                return this.proximate ? a.align.charAt(0) + "tv" : a.floating ? "" : a.align.charAt(0) + a.verticalAlign.charAt(0) + a.layout.charAt(0)
            };
            c.prototype.adjustMargins = function (a, c) {
                var e = this.chart, b = this.options, k = this.getAlignment();
                k && [/(lth|ct|rth)/, /(rtv|rm|rbv)/, /(rbh|cb|lbh)/, /(lbv|lm|ltv)/].forEach(function (h,
                                                                                                        g) {
                    h.test(k) && !d(a[g]) && (e[p[g]] = Math.max(e[p[g]], e.legend[(g + 1) % 2 ? "legendHeight" : "legendWidth"] + [1, -1, -1, 1][g] * b[g % 2 ? "x" : "y"] + w(b.margin, 12) + c[g] + (e.titleOffset[g] || 0)))
                })
            };
            c.prototype.proximatePositions = function () {
                var a = this.chart, c = [], d = "left" === this.options.align;
                this.allItems.forEach(function (e) {
                    var h;
                    var b = d;
                    if (e.yAxis) {
                        e.xAxis.options.reversed && (b = !b);
                        e.points && (h = H(b ? e.points : e.points.slice(0).reverse(), function (a) {
                            return K(a.plotY)
                        }));
                        b = this.itemMarginTop + e.legendItem.getBBox().height + this.itemMarginBottom;
                        var k = e.yAxis.top - a.plotTop;
                        e.visible ? (h = h ? h.plotY : e.yAxis.height, h += k - .3 * b) : h = k + e.yAxis.height;
                        c.push({target: h, size: b, item: e})
                    }
                }, this);
                D.distribute(c, a.plotHeight);
                c.forEach(function (c) {
                    c.item._legendItemPos[1] = a.plotTop - a.spacing[0] + c.pos
                })
            };
            c.prototype.render = function () {
                var a = this.chart, c = a.renderer, d = this.group, e = this.box, b = this.options, g = this.padding;
                this.itemX = g;
                this.itemY = this.initialItemY;
                this.lastItemY = this.offsetWidth = 0;
                this.widthOption = z(b.width, a.spacingBox.width - g);
                var m = a.spacingBox.width -
                    2 * g - b.x;
                -1 < ["rm", "lm"].indexOf(this.getAlignment().substring(0, 2)) && (m /= 2);
                this.maxLegendWidth = this.widthOption || m;
                d || (this.group = d = c.g("legend").attr({zIndex: 7}).add(), this.contentGroup = c.g().attr({zIndex: 1}).add(d), this.scrollGroup = c.g().add(this.contentGroup));
                this.renderTitle();
                var n = this.getAllItems();
                q(n, function (a, c) {
                    return (a.options && a.options.legendIndex || 0) - (c.options && c.options.legendIndex || 0)
                });
                b.reversed && n.reverse();
                this.allItems = n;
                this.display = m = !!n.length;
                this.itemHeight = this.totalItemWidth =
                    this.maxItemWidth = this.lastLineHeight = 0;
                n.forEach(this.renderItem, this);
                n.forEach(this.layoutItem, this);
                n = (this.widthOption || this.offsetWidth) + g;
                var l = this.lastItemY + this.lastLineHeight + this.titleHeight;
                l = this.handleOverflow(l);
                l += g;
                e || (this.box = e = c.rect().addClass("highcharts-legend-box").attr({r: b.borderRadius}).add(d), e.isNew = !0);
                a.styledMode || e.attr({
                    stroke: b.borderColor,
                    "stroke-width": b.borderWidth || 0,
                    fill: b.backgroundColor || "none"
                }).shadow(b.shadow);
                0 < n && 0 < l && (e[e.isNew ? "attr" : "animate"](e.crisp.call({},
                    {x: 0, y: 0, width: n, height: l}, e.strokeWidth())), e.isNew = !1);
                e[m ? "show" : "hide"]();
                a.styledMode && "none" === d.getStyle("display") && (n = l = 0);
                this.legendWidth = n;
                this.legendHeight = l;
                m && this.align();
                this.proximate || this.positionItems();
                I(this, "afterRender")
            };
            c.prototype.align = function (a) {
                void 0 === a && (a = this.chart.spacingBox);
                var c = this.chart, d = this.options, e = a.y;
                /(lth|ct|rth)/.test(this.getAlignment()) && 0 < c.titleOffset[0] ? e += c.titleOffset[0] : /(lbh|cb|rbh)/.test(this.getAlignment()) && 0 < c.titleOffset[2] && (e -= c.titleOffset[2]);
                e !== a.y && (a = F(a, {y: e}));
                this.group.align(F(d, {
                    width: this.legendWidth,
                    height: this.legendHeight,
                    verticalAlign: this.proximate ? "top" : d.verticalAlign
                }), !0, a)
            };
            c.prototype.handleOverflow = function (a) {
                var c = this, d = this.chart, e = d.renderer, b = this.options, g = b.y, m = this.padding;
                g = d.spacingBox.height + ("top" === b.verticalAlign ? -g : g) - m;
                var n = b.maxHeight, l, f = this.clipRect, q = b.navigation, p = w(q.animation, !0),
                    u = q.arrowSize || 12, r = this.nav, z = this.pages, t, P = this.allItems, H = function (a) {
                        "number" === typeof a ? f.attr({height: a}) :
                            f && (c.clipRect = f.destroy(), c.contentGroup.clip());
                        c.contentGroup.div && (c.contentGroup.div.style.clip = a ? "rect(" + m + "px,9999px," + (m + a) + "px,0)" : "auto")
                    }, N = function (a) {
                        c[a] = e.circle(0, 0, 1.3 * u).translate(u / 2, u / 2).add(r);
                        d.styledMode || c[a].attr("fill", "rgba(0,0,0,0.0001)");
                        return c[a]
                    };
                "horizontal" !== b.layout || "middle" === b.verticalAlign || b.floating || (g /= 2);
                n && (g = Math.min(g, n));
                z.length = 0;
                a && 0 < g && a > g && !1 !== q.enabled ? (this.clipHeight = l = Math.max(g - 20 - this.titleHeight - m, 0), this.currentPage = w(this.currentPage,
                    1), this.fullHeight = a, P.forEach(function (a, c) {
                    var d = a._legendItemPos[1], e = Math.round(a.legendItem.getBBox().height), h = z.length;
                    if (!h || d - z[h - 1] > l && (t || d) !== z[h - 1]) z.push(t || d), h++;
                    a.pageIx = h - 1;
                    t && (P[c - 1].pageIx = h - 1);
                    c === P.length - 1 && d + e - z[h - 1] > l && d !== t && (z.push(d), a.pageIx = h);
                    d !== t && (t = d)
                }), f || (f = c.clipRect = e.clipRect(0, m, 9999, 0), c.contentGroup.clip(f)), H(l), r || (this.nav = r = e.g().attr({zIndex: 1}).add(this.group), this.up = e.symbol("triangle", 0, 0, u, u).add(r), N("upTracker").on("click", function () {
                    c.scroll(-1,
                        p)
                }), this.pager = e.text("", 15, 10).addClass("highcharts-legend-navigation"), d.styledMode || this.pager.css(q.style), this.pager.add(r), this.down = e.symbol("triangle-down", 0, 0, u, u).add(r), N("downTracker").on("click", function () {
                    c.scroll(1, p)
                })), c.scroll(0), a = g) : r && (H(), this.nav = r.destroy(), this.scrollGroup.attr({translateY: 1}), this.clipHeight = 0);
                return a
            };
            c.prototype.scroll = function (a, c) {
                var d = this, e = this.chart, b = this.pages, k = b.length, g = this.currentPage + a;
                a = this.clipHeight;
                var n = this.options.navigation, l =
                    this.pager, f = this.padding;
                g > k && (g = k);
                0 < g && ("undefined" !== typeof c && t(c, e), this.nav.attr({
                    translateX: f,
                    translateY: a + this.padding + 7 + this.titleHeight,
                    visibility: "visible"
                }), [this.up, this.upTracker].forEach(function (a) {
                    a.attr({"class": 1 === g ? "highcharts-legend-nav-inactive" : "highcharts-legend-nav-active"})
                }), l.attr({text: g + "/" + k}), [this.down, this.downTracker].forEach(function (a) {
                    a.attr({
                        x: 18 + this.pager.getBBox().width,
                        "class": g === k ? "highcharts-legend-nav-inactive" : "highcharts-legend-nav-active"
                    })
                }, this),
                e.styledMode || (this.up.attr({fill: 1 === g ? n.inactiveColor : n.activeColor}), this.upTracker.css({cursor: 1 === g ? "default" : "pointer"}), this.down.attr({fill: g === k ? n.inactiveColor : n.activeColor}), this.downTracker.css({cursor: g === k ? "default" : "pointer"})), this.scrollOffset = -b[g - 1] + this.initialItemY, this.scrollGroup.animate({translateY: this.scrollOffset}), this.currentPage = g, this.positionCheckboxes(), c = B(w(c, e.renderer.globalAnimation, !0)), m(function () {
                    I(d, "afterScroll", {currentPage: g})
                }, c.duration))
            };
            c.prototype.setItemEvents =
                function (a, c, d) {
                    var e = this, h = e.chart.renderer.boxWrapper, b = a instanceof y,
                        k = "highcharts-legend-" + (b ? "point" : "series") + "-active", g = e.chart.styledMode;
                    (d ? [c, a.legendSymbol] : [a.legendGroup]).forEach(function (d) {
                        if (d) d.on("mouseover", function () {
                            a.visible && e.allItems.forEach(function (c) {
                                a !== c && c.setState("inactive", !b)
                            });
                            a.setState("hover");
                            a.visible && h.addClass(k);
                            g || c.css(e.options.itemHoverStyle)
                        }).on("mouseout", function () {
                            e.chart.styledMode || c.css(F(a.visible ? e.itemStyle : e.itemHiddenStyle));
                            e.allItems.forEach(function (c) {
                                a !==
                                c && c.setState("", !b)
                            });
                            h.removeClass(k);
                            a.setState()
                        }).on("click", function (c) {
                            var d = function () {
                                a.setVisible && a.setVisible();
                                e.allItems.forEach(function (c) {
                                    a !== c && c.setState(a.visible ? "inactive" : "", !b)
                                })
                            };
                            h.removeClass(k);
                            c = {browserEvent: c};
                            a.firePointEvent ? a.firePointEvent("legendItemClick", c, d) : I(a, "legendItemClick", c, d)
                        })
                    })
                };
            c.prototype.createCheckboxForItem = function (a) {
                a.checkbox = g("input", {
                        type: "checkbox",
                        className: "highcharts-legend-checkbox",
                        checked: a.selected,
                        defaultChecked: a.selected
                    }, this.options.itemCheckboxStyle,
                    this.chart.container);
                l(a.checkbox, "click", function (c) {
                    I(a.series || a, "checkboxClick", {checked: c.target.checked, item: a}, function () {
                        a.select()
                    })
                })
            };
            return c
        }();
        (/Trident\/7\.0/.test(f.navigator && f.navigator.userAgent) || b) && C(c.prototype, "positionItem", function (c, a) {
            var d = this, e = function () {
                a._legendItemPos && c.call(d, a)
            };
            e();
            d.bubbleLegend || setTimeout(e)
        });
        D.Legend = c;
        return D.Legend
    });
    J(b, "Core/Series/SeriesRegistry.js", [b["Core/Globals.js"], b["Core/Options.js"], b["Core/Series/Point.js"], b["Core/Utilities.js"]],
        function (b, f, D, y) {
            var B = f.defaultOptions, A = y.error, t = y.extendClass, r = y.merge, p;
            (function (l) {
                function g(e, d) {
                    var b = B.plotOptions || {}, g = d.defaultOptions;
                    d.prototype.pointClass || (d.prototype.pointClass = D);
                    d.prototype.type = e;
                    g && (b[e] = g);
                    l.seriesTypes[e] = d
                }

                l.seriesTypes = b.seriesTypes;
                l.getSeries = function (e, d) {
                    void 0 === d && (d = {});
                    var b = e.options.chart;
                    b = d.type || b.type || b.defaultSeriesType || "";
                    var g = l.seriesTypes[b];
                    l || A(17, !0, e, {missingModuleFor: b});
                    b = new g;
                    "function" === typeof b.init && b.init(e, d);
                    return b
                };
                l.registerSeriesType = g;
                l.seriesType = function (e, d, b, f, p) {
                    var u = B.plotOptions || {};
                    d = d || "";
                    u[e] = r(u[d], b);
                    g(e, t(l.seriesTypes[d] || function () {
                    }, f));
                    l.seriesTypes[e].prototype.type = e;
                    p && (l.seriesTypes[e].prototype.pointClass = t(D, p));
                    return l.seriesTypes[e]
                }
            })(p || (p = {}));
            b.seriesType = p.seriesType;
            return p
        });
    J(b, "Core/Chart/Chart.js", [b["Core/Animation/AnimationUtilities.js"], b["Core/Axis/Axis.js"], b["Core/FormatUtilities.js"], b["Core/Globals.js"], b["Core/Legend.js"], b["Core/MSPointer.js"], b["Core/Options.js"],
        b["Core/Color/Palette.js"], b["Core/Pointer.js"], b["Core/Series/SeriesRegistry.js"], b["Core/Time.js"], b["Core/Utilities.js"], b["Core/Renderer/HTML/AST.js"]], function (b, f, D, y, C, A, t, r, p, l, g, e, d) {
        var u = b.animate, H = b.animObject, B = b.setAnimation, K = D.numberFormat, F = y.charts, w = y.doc, z = y.win,
            q = t.defaultOptions, m = t.defaultTime, c = l.seriesTypes, n = e.addEvent, a = e.attr,
            k = e.cleanRecursively, h = e.createElement, v = e.css, E = e.defined, L = e.discardElement, M = e.erase,
            S = e.error, Y = e.extend, R = e.find, O = e.fireEvent, G = e.getStyle,
            x = e.isArray, J = e.isFunction, Z = e.isNumber, ea = e.isObject, P = e.isString, Q = e.merge,
            N = e.objectEach, T = e.pick, aa = e.pInt, V = e.relativeLength, W = e.removeEvent, U = e.splat,
            da = e.syncTimeout, ba = e.uniqueKey, fa = y.marginNames, ca = function () {
                function b(a, c, d) {
                    this.series = this.renderTo = this.renderer = this.pointer = this.pointCount = this.plotWidth = this.plotTop = this.plotLeft = this.plotHeight = this.plotBox = this.options = this.numberFormatter = this.margin = this.legend = this.labelCollectors = this.isResizing = this.index = this.container = this.colorCounter =
                        this.clipBox = this.chartWidth = this.chartHeight = this.bounds = this.axisOffset = this.axes = void 0;
                    this.sharedClips = {};
                    this.yAxis = this.xAxis = this.userOptions = this.titleOffset = this.time = this.symbolCounter = this.spacingBox = this.spacing = void 0;
                    this.getArgs(a, c, d)
                }

                b.prototype.getArgs = function (a, c, d) {
                    P(a) || a.nodeName ? (this.renderTo = a, this.init(c, d)) : this.init(a, c)
                };
                b.prototype.init = function (a, c) {
                    var d = a.plotOptions || {};
                    O(this, "init", {args: arguments}, function () {
                        var e = Q(q, a), h = e.chart;
                        N(e.plotOptions, function (a,
                                                   c) {
                            ea(a) && (a.tooltip = d[c] && Q(d[c].tooltip) || void 0)
                        });
                        e.tooltip.userOptions = a.chart && a.chart.forExport && a.tooltip.userOptions || a.tooltip;
                        this.userOptions = a;
                        var b = h.events;
                        this.margin = [];
                        this.spacing = [];
                        this.bounds = {h: {}, v: {}};
                        this.labelCollectors = [];
                        this.callback = c;
                        this.isResizing = 0;
                        this.options = e;
                        this.axes = [];
                        this.series = [];
                        this.time = a.time && Object.keys(a.time).length ? new g(a.time) : y.time;
                        this.numberFormatter = h.numberFormatter || K;
                        this.styledMode = h.styledMode;
                        this.hasCartesianSeries = h.showAxes;
                        var k =
                            this;
                        k.index = F.length;
                        F.push(k);
                        y.chartCount++;
                        b && N(b, function (a, c) {
                            J(a) && n(k, c, a)
                        });
                        k.xAxis = [];
                        k.yAxis = [];
                        k.pointCount = k.colorCounter = k.symbolCounter = 0;
                        O(k, "afterInit");
                        k.firstRender()
                    })
                };
                b.prototype.initSeries = function (a) {
                    var d = this.options.chart;
                    d = a.type || d.type || d.defaultSeriesType;
                    var e = c[d];
                    e || S(17, !0, this, {missingModuleFor: d});
                    d = new e;
                    "function" === typeof d.init && d.init(this, a);
                    return d
                };
                b.prototype.setSeriesData = function () {
                    this.getSeriesOrderByLinks().forEach(function (a) {
                        a.points || a.data ||
                        !a.enabledDataSorting || a.setData(a.options.data, !1)
                    })
                };
                b.prototype.getSeriesOrderByLinks = function () {
                    return this.series.concat().sort(function (a, c) {
                        return a.linkedSeries.length || c.linkedSeries.length ? c.linkedSeries.length - a.linkedSeries.length : 0
                    })
                };
                b.prototype.orderSeries = function (a) {
                    var c = this.series;
                    for (a = a || 0; a < c.length; a++) c[a] && (c[a].index = a, c[a].name = c[a].getName())
                };
                b.prototype.isInsidePlot = function (a, c, d) {
                    void 0 === d && (d = {});
                    var e = this.inverted, h = this.plotBox, b = this.plotLeft, k = this.plotTop,
                        g = this.scrollablePlotBox, m = this.scrollingContainer;
                    m = void 0 === m ? {scrollLeft: 0, scrollTop: 0} : m;
                    var n = m.scrollLeft;
                    m = m.scrollTop;
                    var l = d.series;
                    h = d.visiblePlotOnly && g || h;
                    g = d.inverted ? c : a;
                    c = d.inverted ? a : c;
                    a = {x: g, y: c, isInsidePlot: !0};
                    if (!d.ignoreX) {
                        var f = l && (e ? l.yAxis : l.xAxis) || {pos: b, len: Infinity};
                        g = d.paneCoordinates ? f.pos + g : b + g;
                        g >= Math.max(n + b, f.pos) && g <= Math.min(n + b + h.width, f.pos + f.len) || (a.isInsidePlot = !1)
                    }
                    !d.ignoreY && a.isInsidePlot && (e = l && (e ? l.xAxis : l.yAxis) || {
                        pos: k,
                        len: Infinity
                    }, d = d.paneCoordinates ?
                        e.pos + c : k + c, d >= Math.max(m + k, e.pos) && d <= Math.min(m + k + h.height, e.pos + e.len) || (a.isInsidePlot = !1));
                    O(this, "afterIsInsidePlot", a);
                    return a.isInsidePlot
                };
                b.prototype.redraw = function (a) {
                    O(this, "beforeRedraw");
                    var c = this.hasCartesianSeries ? this.axes : this.colorAxis || [], d = this.series, e = this.pointer,
                        h = this.legend, b = this.userOptions.legend, k = this.isDirtyLegend, g = this.isDirtyBox,
                        m = this.renderer, l = m.isHidden(), n = [];
                    this.setResponsive && this.setResponsive(!1);
                    B(this.hasRendered ? a : !1, this);
                    l && this.temporaryDisplay();
                    this.layOutTitles();
                    for (a = d.length; a--;) {
                        var f = d[a];
                        if (f.options.stacking || f.options.centerInCategory) {
                            var q = !0;
                            if (f.isDirty) {
                                var v = !0;
                                break
                            }
                        }
                    }
                    if (v) for (a = d.length; a--;) f = d[a], f.options.stacking && (f.isDirty = !0);
                    d.forEach(function (a) {
                        a.isDirty && ("point" === a.options.legendType ? ("function" === typeof a.updateTotals && a.updateTotals(), k = !0) : b && (b.labelFormatter || b.labelFormat) && (k = !0));
                        a.isDirtyData && O(a, "updatedData")
                    });
                    k && h && h.options.enabled && (h.render(), this.isDirtyLegend = !1);
                    q && this.getStacks();
                    c.forEach(function (a) {
                        a.updateNames();
                        a.setScale()
                    });
                    this.getMargins();
                    c.forEach(function (a) {
                        a.isDirty && (g = !0)
                    });
                    c.forEach(function (a) {
                        var c = a.min + "," + a.max;
                        a.extKey !== c && (a.extKey = c, n.push(function () {
                            O(a, "afterSetExtremes", Y(a.eventArgs, a.getExtremes()));
                            delete a.eventArgs
                        }));
                        (g || q) && a.redraw()
                    });
                    g && this.drawChartBox();
                    O(this, "predraw");
                    d.forEach(function (a) {
                        (g || a.isDirty) && a.visible && a.redraw();
                        a.isDirtyData = !1
                    });
                    e && e.reset(!0);
                    m.draw();
                    O(this, "redraw");
                    O(this, "render");
                    l && this.temporaryDisplay(!0);
                    n.forEach(function (a) {
                        a.call()
                    })
                };
                b.prototype.get = function (a) {
                    function c(c) {
                        return c.id === a || c.options && c.options.id === a
                    }

                    var d = this.series, e;
                    var h = R(this.axes, c) || R(this.series, c);
                    for (e = 0; !h && e < d.length; e++) h = R(d[e].points || [], c);
                    return h
                };
                b.prototype.getAxes = function () {
                    var a = this, c = this.options, d = c.xAxis = U(c.xAxis || {});
                    c = c.yAxis = U(c.yAxis || {});
                    O(this, "getAxes");
                    d.forEach(function (a, c) {
                        a.index = c;
                        a.isX = !0
                    });
                    c.forEach(function (a, c) {
                        a.index = c
                    });
                    d.concat(c).forEach(function (c) {
                        new f(a, c)
                    });
                    O(this, "afterGetAxes")
                };
                b.prototype.getSelectedPoints =
                    function () {
                        var a = [];
                        this.series.forEach(function (c) {
                            a = a.concat(c.getPointsCollection().filter(function (a) {
                                return T(a.selectedStaging, a.selected)
                            }))
                        });
                        return a
                    };
                b.prototype.getSelectedSeries = function () {
                    return this.series.filter(function (a) {
                        return a.selected
                    })
                };
                b.prototype.setTitle = function (a, c, d) {
                    this.applyDescription("title", a);
                    this.applyDescription("subtitle", c);
                    this.applyDescription("caption", void 0);
                    this.layOutTitles(d)
                };
                b.prototype.applyDescription = function (a, c) {
                    var d = this, e = "title" === a ? {
                        color: r.neutralColor80,
                        fontSize: this.options.isStock ? "16px" : "18px"
                    } : {color: r.neutralColor60};
                    e = this.options[a] = Q(!this.styledMode && {style: e}, this.options[a], c);
                    var h = this[a];
                    h && c && (this[a] = h = h.destroy());
                    e && !h && (h = this.renderer.text(e.text, 0, 0, e.useHTML).attr({
                        align: e.align,
                        "class": "highcharts-" + a,
                        zIndex: e.zIndex || 4
                    }).add(), h.update = function (c) {
                        d[{title: "setTitle", subtitle: "setSubtitle", caption: "setCaption"}[a]](c)
                    }, this.styledMode || h.css(e.style), this[a] = h)
                };
                b.prototype.layOutTitles = function (a) {
                    var c = [0, 0, 0], d = this.renderer,
                        e = this.spacingBox;
                    ["title", "subtitle", "caption"].forEach(function (a) {
                        var h = this[a], b = this.options[a], k = b.verticalAlign || "top";
                        a = "title" === a ? -3 : "top" === k ? c[0] + 2 : 0;
                        if (h) {
                            if (!this.styledMode) var g = b.style.fontSize;
                            g = d.fontMetrics(g, h).b;
                            h.css({width: (b.width || e.width + (b.widthAdjust || 0)) + "px"});
                            var m = Math.round(h.getBBox(b.useHTML).height);
                            h.align(Y({y: "bottom" === k ? g : a + g, height: m}, b), !1, "spacingBox");
                            b.floating || ("top" === k ? c[0] = Math.ceil(c[0] + m) : "bottom" === k && (c[2] = Math.ceil(c[2] + m)))
                        }
                    }, this);
                    c[0] && "top" ===
                    (this.options.title.verticalAlign || "top") && (c[0] += this.options.title.margin);
                    c[2] && "bottom" === this.options.caption.verticalAlign && (c[2] += this.options.caption.margin);
                    var h = !this.titleOffset || this.titleOffset.join(",") !== c.join(",");
                    this.titleOffset = c;
                    O(this, "afterLayOutTitles");
                    !this.isDirtyBox && h && (this.isDirtyBox = this.isDirtyLegend = h, this.hasRendered && T(a, !0) && this.isDirtyBox && this.redraw())
                };
                b.prototype.getChartSize = function () {
                    var a = this.options.chart, c = a.width;
                    a = a.height;
                    var d = this.renderTo;
                    E(c) ||
                    (this.containerWidth = G(d, "width"));
                    E(a) || (this.containerHeight = G(d, "height"));
                    this.chartWidth = Math.max(0, c || this.containerWidth || 600);
                    this.chartHeight = Math.max(0, V(a, this.chartWidth) || (1 < this.containerHeight ? this.containerHeight : 400))
                };
                b.prototype.temporaryDisplay = function (a) {
                    var c = this.renderTo;
                    if (a) for (; c && c.style;) c.hcOrigStyle && (v(c, c.hcOrigStyle), delete c.hcOrigStyle), c.hcOrigDetached && (w.body.removeChild(c), c.hcOrigDetached = !1), c = c.parentNode; else for (; c && c.style;) {
                        w.body.contains(c) || c.parentNode ||
                        (c.hcOrigDetached = !0, w.body.appendChild(c));
                        if ("none" === G(c, "display", !1) || c.hcOricDetached) c.hcOrigStyle = {
                            display: c.style.display,
                            height: c.style.height,
                            overflow: c.style.overflow
                        }, a = {
                            display: "block",
                            overflow: "hidden"
                        }, c !== this.renderTo && (a.height = 0), v(c, a), c.offsetWidth || c.style.setProperty("display", "block", "important");
                        c = c.parentNode;
                        if (c === w.body) break
                    }
                };
                b.prototype.setClassName = function (a) {
                    this.container.className = "highcharts-container " + (a || "")
                };
                b.prototype.getContainer = function () {
                    var c = this.options,
                        d = c.chart;
                    var e = this.renderTo;
                    var b = ba(), k, g;
                    e || (this.renderTo = e = d.renderTo);
                    P(e) && (this.renderTo = e = w.getElementById(e));
                    e || S(13, !0, this);
                    var m = aa(a(e, "data-highcharts-chart"));
                    Z(m) && F[m] && F[m].hasRendered && F[m].destroy();
                    a(e, "data-highcharts-chart", this.index);
                    e.innerHTML = "";
                    d.skipClone || e.offsetWidth || this.temporaryDisplay();
                    this.getChartSize();
                    m = this.chartWidth;
                    var l = this.chartHeight;
                    v(e, {overflow: "hidden"});
                    this.styledMode || (k = Y({
                        position: "relative",
                        overflow: "hidden",
                        width: m + "px",
                        height: l + "px",
                        textAlign: "left",
                        lineHeight: "normal",
                        zIndex: 0,
                        "-webkit-tap-highlight-color": "rgba(0,0,0,0)",
                        userSelect: "none",
                        "touch-action": "manipulation",
                        outline: "none"
                    }, d.style || {}));
                    this.container = e = h("div", {id: b}, k, e);
                    this._cursor = e.style.cursor;
                    this.renderer = new (y[d.renderer] || y.Renderer)(e, m, l, null, d.forExport, c.exporting && c.exporting.allowHTML, this.styledMode);
                    B(void 0, this);
                    this.setClassName(d.className);
                    if (this.styledMode) for (g in c.defs) this.renderer.definition(c.defs[g]); else this.renderer.setStyle(d.style);
                    this.renderer.chartIndex = this.index;
                    O(this, "afterGetContainer")
                };
                b.prototype.getMargins = function (a) {
                    var c = this.spacing, d = this.margin, e = this.titleOffset;
                    this.resetMargins();
                    e[0] && !E(d[0]) && (this.plotTop = Math.max(this.plotTop, e[0] + c[0]));
                    e[2] && !E(d[2]) && (this.marginBottom = Math.max(this.marginBottom, e[2] + c[2]));
                    this.legend && this.legend.display && this.legend.adjustMargins(d, c);
                    O(this, "getMargins");
                    a || this.getAxisMargins()
                };
                b.prototype.getAxisMargins = function () {
                    var a = this, c = a.axisOffset = [0, 0, 0, 0], d = a.colorAxis,
                        e = a.margin, h = function (a) {
                            a.forEach(function (a) {
                                a.visible && a.getOffset()
                            })
                        };
                    a.hasCartesianSeries ? h(a.axes) : d && d.length && h(d);
                    fa.forEach(function (d, h) {
                        E(e[h]) || (a[d] += c[h])
                    });
                    a.setChartSize()
                };
                b.prototype.reflow = function (a) {
                    var c = this, d = c.options.chart, h = c.renderTo, b = E(d.width) && E(d.height),
                        k = d.width || G(h, "width");
                    d = d.height || G(h, "height");
                    h = a ? a.target : z;
                    delete c.pointer.chartPosition;
                    if (!b && !c.isPrinting && k && d && (h === z || h === w)) {
                        if (k !== c.containerWidth || d !== c.containerHeight) e.clearTimeout(c.reflowTimeout),
                            c.reflowTimeout = da(function () {
                                c.container && c.setSize(void 0, void 0, !1)
                            }, a ? 100 : 0);
                        c.containerWidth = k;
                        c.containerHeight = d
                    }
                };
                b.prototype.setReflow = function (a) {
                    var c = this;
                    !1 === a || this.unbindReflow ? !1 === a && this.unbindReflow && (this.unbindReflow = this.unbindReflow()) : (this.unbindReflow = n(z, "resize", function (a) {
                        c.options && c.reflow(a)
                    }), n(this, "destroy", this.unbindReflow))
                };
                b.prototype.setSize = function (a, c, d) {
                    var e = this, h = e.renderer;
                    e.isResizing += 1;
                    B(d, e);
                    d = h.globalAnimation;
                    e.oldChartHeight = e.chartHeight;
                    e.oldChartWidth = e.chartWidth;
                    "undefined" !== typeof a && (e.options.chart.width = a);
                    "undefined" !== typeof c && (e.options.chart.height = c);
                    e.getChartSize();
                    e.styledMode || (d ? u : v)(e.container, {width: e.chartWidth + "px", height: e.chartHeight + "px"}, d);
                    e.setChartSize(!0);
                    h.setSize(e.chartWidth, e.chartHeight, d);
                    e.axes.forEach(function (a) {
                        a.isDirty = !0;
                        a.setScale()
                    });
                    e.isDirtyLegend = !0;
                    e.isDirtyBox = !0;
                    e.layOutTitles();
                    e.getMargins();
                    e.redraw(d);
                    e.oldChartHeight = null;
                    O(e, "resize");
                    da(function () {
                        e && O(e, "endResize", null,
                            function () {
                                --e.isResizing
                            })
                    }, H(d).duration)
                };
                b.prototype.setChartSize = function (a) {
                    var c = this.inverted, d = this.renderer, e = this.chartWidth, h = this.chartHeight,
                        b = this.options.chart, k = this.spacing, g = this.clipOffset, m, l, n, f;
                    this.plotLeft = m = Math.round(this.plotLeft);
                    this.plotTop = l = Math.round(this.plotTop);
                    this.plotWidth = n = Math.max(0, Math.round(e - m - this.marginRight));
                    this.plotHeight = f = Math.max(0, Math.round(h - l - this.marginBottom));
                    this.plotSizeX = c ? f : n;
                    this.plotSizeY = c ? n : f;
                    this.plotBorderWidth = b.plotBorderWidth ||
                        0;
                    this.spacingBox = d.spacingBox = {x: k[3], y: k[0], width: e - k[3] - k[1], height: h - k[0] - k[2]};
                    this.plotBox = d.plotBox = {x: m, y: l, width: n, height: f};
                    h = 2 * Math.floor(this.plotBorderWidth / 2);
                    c = Math.ceil(Math.max(h, g[3]) / 2);
                    e = Math.ceil(Math.max(h, g[0]) / 2);
                    this.clipBox = {
                        x: c,
                        y: e,
                        width: Math.floor(this.plotSizeX - Math.max(h, g[1]) / 2 - c),
                        height: Math.max(0, Math.floor(this.plotSizeY - Math.max(h, g[2]) / 2 - e))
                    };
                    a || (this.axes.forEach(function (a) {
                        a.setAxisSize();
                        a.setAxisTranslation()
                    }), d.alignElements());
                    O(this, "afterSetChartSize",
                        {skipAxes: a})
                };
                b.prototype.resetMargins = function () {
                    O(this, "resetMargins");
                    var a = this, c = a.options.chart;
                    ["margin", "spacing"].forEach(function (d) {
                        var e = c[d], h = ea(e) ? e : [e, e, e, e];
                        ["Top", "Right", "Bottom", "Left"].forEach(function (e, b) {
                            a[d][b] = T(c[d + e], h[b])
                        })
                    });
                    fa.forEach(function (c, d) {
                        a[c] = T(a.margin[d], a.spacing[d])
                    });
                    a.axisOffset = [0, 0, 0, 0];
                    a.clipOffset = [0, 0, 0, 0]
                };
                b.prototype.drawChartBox = function () {
                    var a = this.options.chart, c = this.renderer, d = this.chartWidth, e = this.chartHeight,
                        h = this.chartBackground, b =
                            this.plotBackground, k = this.plotBorder, g = this.styledMode, m = this.plotBGImage,
                        l = a.backgroundColor, n = a.plotBackgroundColor, f = a.plotBackgroundImage, q, v = this.plotLeft,
                        p = this.plotTop, u = this.plotWidth, w = this.plotHeight, r = this.plotBox, z = this.clipRect,
                        P = this.clipBox, N = "animate";
                    h || (this.chartBackground = h = c.rect().addClass("highcharts-background").add(), N = "attr");
                    if (g) var t = q = h.strokeWidth(); else {
                        t = a.borderWidth || 0;
                        q = t + (a.shadow ? 8 : 0);
                        l = {fill: l || "none"};
                        if (t || h["stroke-width"]) l.stroke = a.borderColor, l["stroke-width"] =
                            t;
                        h.attr(l).shadow(a.shadow)
                    }
                    h[N]({x: q / 2, y: q / 2, width: d - q - t % 2, height: e - q - t % 2, r: a.borderRadius});
                    N = "animate";
                    b || (N = "attr", this.plotBackground = b = c.rect().addClass("highcharts-plot-background").add());
                    b[N](r);
                    g || (b.attr({fill: n || "none"}).shadow(a.plotShadow), f && (m ? (f !== m.attr("href") && m.attr("href", f), m.animate(r)) : this.plotBGImage = c.image(f, v, p, u, w).add()));
                    z ? z.animate({width: P.width, height: P.height}) : this.clipRect = c.clipRect(P);
                    N = "animate";
                    k || (N = "attr", this.plotBorder = k = c.rect().addClass("highcharts-plot-border").attr({zIndex: 1}).add());
                    g || k.attr({stroke: a.plotBorderColor, "stroke-width": a.plotBorderWidth || 0, fill: "none"});
                    k[N](k.crisp({x: v, y: p, width: u, height: w}, -k.strokeWidth()));
                    this.isDirtyBox = !1;
                    O(this, "afterDrawChartBox")
                };
                b.prototype.propFromSeries = function () {
                    var a = this, d = a.options.chart, e, h = a.options.series, b, k;
                    ["inverted", "angular", "polar"].forEach(function (g) {
                        e = c[d.type || d.defaultSeriesType];
                        k = d[g] || e && e.prototype[g];
                        for (b = h && h.length; !k && b--;) (e = c[h[b].type]) && e.prototype[g] && (k = !0);
                        a[g] = k
                    })
                };
                b.prototype.linkSeries = function () {
                    var a =
                        this, c = a.series;
                    c.forEach(function (a) {
                        a.linkedSeries.length = 0
                    });
                    c.forEach(function (c) {
                        var d = c.options.linkedTo;
                        P(d) && (d = ":previous" === d ? a.series[c.index - 1] : a.get(d)) && d.linkedParent !== c && (d.linkedSeries.push(c), c.linkedParent = d, d.enabledDataSorting && c.setDataSortingOptions(), c.visible = T(c.options.visible, d.options.visible, c.visible))
                    });
                    O(this, "afterLinkSeries")
                };
                b.prototype.renderSeries = function () {
                    this.series.forEach(function (a) {
                        a.translate();
                        a.render()
                    })
                };
                b.prototype.renderLabels = function () {
                    var a =
                        this, c = a.options.labels;
                    c.items && c.items.forEach(function (d) {
                        var e = Y(c.style, d.style), h = aa(e.left) + a.plotLeft, b = aa(e.top) + a.plotTop + 12;
                        delete e.left;
                        delete e.top;
                        a.renderer.text(d.html, h, b).attr({zIndex: 2}).css(e).add()
                    })
                };
                b.prototype.render = function () {
                    var a = this.axes, c = this.colorAxis, d = this.renderer, e = this.options, h = 0, b = function (a) {
                        a.forEach(function (a) {
                            a.visible && a.render()
                        })
                    };
                    this.setTitle();
                    this.legend = new C(this, e.legend);
                    this.getStacks && this.getStacks();
                    this.getMargins(!0);
                    this.setChartSize();
                    e = this.plotWidth;
                    a.some(function (a) {
                        if (a.horiz && a.visible && a.options.labels.enabled && a.series.length) return h = 21, !0
                    });
                    var k = this.plotHeight = Math.max(this.plotHeight - h, 0);
                    a.forEach(function (a) {
                        a.setScale()
                    });
                    this.getAxisMargins();
                    var g = 1.1 < e / this.plotWidth;
                    var m = 1.05 < k / this.plotHeight;
                    if (g || m) a.forEach(function (a) {
                        (a.horiz && g || !a.horiz && m) && a.setTickInterval(!0)
                    }), this.getMargins();
                    this.drawChartBox();
                    this.hasCartesianSeries ? b(a) : c && c.length && b(c);
                    this.seriesGroup || (this.seriesGroup = d.g("series-group").attr({zIndex: 3}).add());
                    this.renderSeries();
                    this.renderLabels();
                    this.addCredits();
                    this.setResponsive && this.setResponsive();
                    this.hasRendered = !0
                };
                b.prototype.addCredits = function (a) {
                    var c = this, d = Q(!0, this.options.credits, a);
                    d.enabled && !this.credits && (this.credits = this.renderer.text(d.text + (this.mapCredits || ""), 0, 0).addClass("highcharts-credits").on("click", function () {
                        d.href && (z.location.href = d.href)
                    }).attr({
                        align: d.position.align,
                        zIndex: 8
                    }), c.styledMode || this.credits.css(d.style), this.credits.add().align(d.position), this.credits.update =
                        function (a) {
                            c.credits = c.credits.destroy();
                            c.addCredits(a)
                        })
                };
                b.prototype.destroy = function () {
                    var a = this, c = a.axes, d = a.series, e = a.container, h, b = e && e.parentNode;
                    O(a, "destroy");
                    a.renderer.forExport ? M(F, a) : F[a.index] = void 0;
                    y.chartCount--;
                    a.renderTo.removeAttribute("data-highcharts-chart");
                    W(a);
                    for (h = c.length; h--;) c[h] = c[h].destroy();
                    this.scroller && this.scroller.destroy && this.scroller.destroy();
                    for (h = d.length; h--;) d[h] = d[h].destroy();
                    "title subtitle chartBackground plotBackground plotBGImage plotBorder seriesGroup clipRect credits pointer rangeSelector legend resetZoomButton tooltip renderer".split(" ").forEach(function (c) {
                        var d =
                            a[c];
                        d && d.destroy && (a[c] = d.destroy())
                    });
                    e && (e.innerHTML = "", W(e), b && L(e));
                    N(a, function (c, d) {
                        delete a[d]
                    })
                };
                b.prototype.firstRender = function () {
                    var a = this, c = a.options;
                    if (!a.isReadyToRender || a.isReadyToRender()) {
                        a.getContainer();
                        a.resetMargins();
                        a.setChartSize();
                        a.propFromSeries();
                        a.getAxes();
                        (x(c.series) ? c.series : []).forEach(function (c) {
                            a.initSeries(c)
                        });
                        a.linkSeries();
                        a.setSeriesData();
                        O(a, "beforeRender");
                        p && (a.pointer = y.hasTouch || !z.PointerEvent && !z.MSPointerEvent ? new p(a, c) : new A(a, c));
                        a.render();
                        a.pointer.getChartPosition();
                        if (!a.renderer.imgCount && !a.hasLoaded) a.onload();
                        a.temporaryDisplay(!0)
                    }
                };
                b.prototype.onload = function () {
                    this.callbacks.concat([this.callback]).forEach(function (a) {
                        a && "undefined" !== typeof this.index && a.apply(this, [this])
                    }, this);
                    O(this, "load");
                    O(this, "render");
                    E(this.index) && this.setReflow(this.options.chart.reflow);
                    this.hasLoaded = !0
                };
                b.prototype.addSeries = function (a, c, d) {
                    var e, h = this;
                    a && (c = T(c, !0), O(h, "addSeries", {options: a}, function () {
                        e = h.initSeries(a);
                        h.isDirtyLegend =
                            !0;
                        h.linkSeries();
                        e.enabledDataSorting && e.setData(a.data, !1);
                        O(h, "afterAddSeries", {series: e});
                        c && h.redraw(d)
                    }));
                    return e
                };
                b.prototype.addAxis = function (a, c, d, e) {
                    return this.createAxis(c ? "xAxis" : "yAxis", {axis: a, redraw: d, animation: e})
                };
                b.prototype.addColorAxis = function (a, c, d) {
                    return this.createAxis("colorAxis", {axis: a, redraw: c, animation: d})
                };
                b.prototype.createAxis = function (a, c) {
                    var d = "colorAxis" === a, e = c.redraw, h = c.animation;
                    a = Q(c.axis, {index: this[a].length, isX: "xAxis" === a});
                    a = d ? new y.ColorAxis(this,
                        a) : new f(this, a);
                    d && (this.isDirtyLegend = !0, this.axes.forEach(function (a) {
                        a.series = []
                    }), this.series.forEach(function (a) {
                        a.bindAxes();
                        a.isDirtyData = !0
                    }));
                    T(e, !0) && this.redraw(h);
                    return a
                };
                b.prototype.showLoading = function (a) {
                    var c = this, e = c.options, b = c.loadingDiv, k = c.loadingSpan, g = e.loading, m = function () {
                        b && v(b, {
                            left: c.plotLeft + "px",
                            top: c.plotTop + "px",
                            width: c.plotWidth + "px",
                            height: c.plotHeight + "px"
                        })
                    };
                    b || (c.loadingDiv = b = h("div", {className: "highcharts-loading highcharts-loading-hidden"}, null, c.container));
                    k || (c.loadingSpan = k = h("span", {className: "highcharts-loading-inner"}, null, b), n(c, "redraw", m));
                    b.className = "highcharts-loading";
                    d.setElementHTML(k, T(a, e.lang.loading, ""));
                    c.styledMode || (v(b, Y(g.style, {zIndex: 10})), v(k, g.labelStyle), c.loadingShown || (v(b, {
                        opacity: 0,
                        display: ""
                    }), u(b, {opacity: g.style.opacity || .5}, {duration: g.showDuration || 0})));
                    c.loadingShown = !0;
                    m()
                };
                b.prototype.hideLoading = function () {
                    var a = this.options, c = this.loadingDiv;
                    c && (c.className = "highcharts-loading highcharts-loading-hidden", this.styledMode ||
                    u(c, {opacity: 0}, {
                        duration: a.loading.hideDuration || 100, complete: function () {
                            v(c, {display: "none"})
                        }
                    }));
                    this.loadingShown = !1
                };
                b.prototype.update = function (a, c, d, e) {
                    var h = this,
                        b = {credits: "addCredits", title: "setTitle", subtitle: "setSubtitle", caption: "setCaption"}, l,
                        n, f, q = a.isResponsiveOptions, v = [];
                    O(h, "update", {options: a});
                    q || h.setResponsive(!1, !0);
                    a = k(a, h.options);
                    h.userOptions = Q(h.userOptions, a);
                    if (l = a.chart) {
                        Q(!0, h.options.chart, l);
                        "className" in l && h.setClassName(l.className);
                        "reflow" in l && h.setReflow(l.reflow);
                        if ("inverted" in l || "polar" in l || "type" in l) {
                            h.propFromSeries();
                            var p = !0
                        }
                        "alignTicks" in l && (p = !0);
                        N(l, function (a, c) {
                            -1 !== h.propsRequireUpdateSeries.indexOf("chart." + c) && (n = !0);
                            -1 !== h.propsRequireDirtyBox.indexOf(c) && (h.isDirtyBox = !0);
                            -1 !== h.propsRequireReflow.indexOf(c) && (q ? h.isDirtyBox = !0 : f = !0)
                        });
                        !h.styledMode && "style" in l && h.renderer.setStyle(l.style)
                    }
                    !h.styledMode && a.colors && (this.options.colors = a.colors);
                    a.time && (this.time === m && (this.time = new g(a.time)), Q(!0, h.options.time, a.time));
                    N(a, function (c,
                                   d) {
                        if (h[d] && "function" === typeof h[d].update) h[d].update(c, !1); else if ("function" === typeof h[b[d]]) h[b[d]](c); else "colors" !== d && -1 === h.collectionsWithUpdate.indexOf(d) && Q(!0, h.options[d], a[d]);
                        "chart" !== d && -1 !== h.propsRequireUpdateSeries.indexOf(d) && (n = !0)
                    });
                    this.collectionsWithUpdate.forEach(function (c) {
                        if (a[c]) {
                            var e = [];
                            h[c].forEach(function (a, c) {
                                a.options.isInternal || e.push(T(a.options.index, c))
                            });
                            U(a[c]).forEach(function (a, b) {
                                var k = E(a.id), g;
                                k && (g = h.get(a.id));
                                !g && h[c] && (g = h[c][e ? e[b] : b]) && k &&
                                E(g.options.id) && (g = void 0);
                                g && g.coll === c && (g.update(a, !1), d && (g.touched = !0));
                                !g && d && h.collectionsWithInit[c] && (h.collectionsWithInit[c][0].apply(h, [a].concat(h.collectionsWithInit[c][1] || []).concat([!1])).touched = !0)
                            });
                            d && h[c].forEach(function (a) {
                                a.touched || a.options.isInternal ? delete a.touched : v.push(a)
                            })
                        }
                    });
                    v.forEach(function (a) {
                        a.chart && a.remove(!1)
                    });
                    p && h.axes.forEach(function (a) {
                        a.update({}, !1)
                    });
                    n && h.getSeriesOrderByLinks().forEach(function (a) {
                        a.chart && a.update({}, !1)
                    }, this);
                    p = l && l.width;
                    l =
                        l && l.height;
                    P(l) && (l = V(l, p || h.chartWidth));
                    f || Z(p) && p !== h.chartWidth || Z(l) && l !== h.chartHeight ? h.setSize(p, l, e) : T(c, !0) && h.redraw(e);
                    O(h, "afterUpdate", {options: a, redraw: c, animation: e})
                };
                b.prototype.setSubtitle = function (a, c) {
                    this.applyDescription("subtitle", a);
                    this.layOutTitles(c)
                };
                b.prototype.setCaption = function (a, c) {
                    this.applyDescription("caption", a);
                    this.layOutTitles(c)
                };
                b.prototype.showResetZoom = function () {
                    function a() {
                        c.zoomOut()
                    }

                    var c = this, d = q.lang, e = c.options.chart.resetZoomButton, h = e.theme,
                        b = h.states,
                        k = "chart" === e.relativeTo || "spacingBox" === e.relativeTo ? null : "scrollablePlotBox";
                    O(this, "beforeShowResetZoom", null, function () {
                        c.resetZoomButton = c.renderer.button(d.resetZoom, null, null, a, h, b && b.hover).attr({
                            align: e.position.align,
                            title: d.resetZoomTitle
                        }).addClass("highcharts-reset-zoom").add().align(e.position, !1, k)
                    });
                    O(this, "afterShowResetZoom")
                };
                b.prototype.zoomOut = function () {
                    O(this, "selection", {resetSelection: !0}, this.zoom)
                };
                b.prototype.zoom = function (a) {
                    var c = this, d, e = c.pointer, h = !1, b =
                        c.inverted ? e.mouseDownX : e.mouseDownY;
                    !a || a.resetSelection ? (c.axes.forEach(function (a) {
                        d = a.zoom()
                    }), e.initiated = !1) : a.xAxis.concat(a.yAxis).forEach(function (a) {
                        var k = a.axis, g = c.inverted ? k.left : k.top, m = c.inverted ? g + k.width : g + k.height,
                            l = k.isXAxis, n = !1;
                        if (!l && b >= g && b <= m || l || !E(b)) n = !0;
                        e[l ? "zoomX" : "zoomY"] && n && (d = k.zoom(a.min, a.max), k.displayBtn && (h = !0))
                    });
                    var k = c.resetZoomButton;
                    h && !k ? c.showResetZoom() : !h && ea(k) && (c.resetZoomButton = k.destroy());
                    d && c.redraw(T(c.options.chart.animation, a && a.animation, 100 >
                        c.pointCount))
                };
                b.prototype.pan = function (a, c) {
                    var d = this, e = d.hoverPoints, h = d.options.chart,
                        b = d.options.mapNavigation && d.options.mapNavigation.enabled, k;
                    c = "object" === typeof c ? c : {enabled: c, type: "x"};
                    h && h.panning && (h.panning = c);
                    var g = c.type;
                    O(this, "pan", {originalEvent: a}, function () {
                        e && e.forEach(function (a) {
                            a.setState()
                        });
                        var c = [1];
                        "xy" === g ? c = [1, 0] : "y" === g && (c = [0]);
                        c.forEach(function (c) {
                            var e = d[c ? "xAxis" : "yAxis"][0], h = e.horiz, m = a[h ? "chartX" : "chartY"];
                            h = h ? "mouseDownX" : "mouseDownY";
                            var l = d[h], n = (e.pointRange ||
                                0) / 2, f = e.reversed && !d.inverted || !e.reversed && d.inverted ? -1 : 1,
                                q = e.getExtremes(), p = e.toValue(l - m, !0) + n * f;
                            f = e.toValue(l + e.len - m, !0) - n * f;
                            var v = f < p;
                            l = v ? f : p;
                            p = v ? p : f;
                            f = e.hasVerticalPanning();
                            var u = e.panningState;
                            !f || c || u && !u.isDirty || e.series.forEach(function (a) {
                                var c = a.getProcessedData(!0);
                                c = a.getExtremes(c.yData, !0);
                                u || (u = {startMin: Number.MAX_VALUE, startMax: -Number.MAX_VALUE});
                                Z(c.dataMin) && Z(c.dataMax) && (u.startMin = Math.min(T(a.options.threshold, Infinity), c.dataMin, u.startMin), u.startMax = Math.max(T(a.options.threshold,
                                    -Infinity), c.dataMax, u.startMax))
                            });
                            c = Math.min(T(u && u.startMin, q.dataMin), n ? q.min : e.toValue(e.toPixels(q.min) - e.minPixelPadding));
                            n = Math.max(T(u && u.startMax, q.dataMax), n ? q.max : e.toValue(e.toPixels(q.max) + e.minPixelPadding));
                            e.panningState = u;
                            e.isOrdinal || (f = c - l, 0 < f && (p += f, l = c), f = p - n, 0 < f && (p = n, l -= f), e.series.length && l !== q.min && p !== q.max && l >= c && p <= n && (e.setExtremes(l, p, !1, !1, {trigger: "pan"}), d.resetZoomButton || b || l === c || p === n || !g.match("y") || (d.showResetZoom(), e.displayBtn = !1), k = !0), d[h] = m)
                        });
                        k && d.redraw(!1);
                        v(d.container, {cursor: "move"})
                    })
                };
                return b
            }();
        Y(ca.prototype, {
            callbacks: [],
            collectionsWithInit: {
                xAxis: [ca.prototype.addAxis, [!0]],
                yAxis: [ca.prototype.addAxis, [!1]],
                series: [ca.prototype.addSeries]
            },
            collectionsWithUpdate: ["xAxis", "yAxis", "zAxis", "series"],
            propsRequireDirtyBox: "backgroundColor borderColor borderWidth borderRadius plotBackgroundColor plotBackgroundImage plotBorderColor plotBorderWidth plotShadow shadow".split(" "),
            propsRequireReflow: "margin marginTop marginRight marginBottom marginLeft spacing spacingTop spacingRight spacingBottom spacingLeft".split(" "),
            propsRequireUpdateSeries: "chart.inverted chart.polar chart.ignoreHiddenSeries chart.type colors plotOptions time tooltip".split(" ")
        });
        y.chart = function (a, c, d) {
            return new ca(a, c, d)
        };
        y.Chart = ca;
        "";
        return ca
    });
    J(b, "Mixins/LegendSymbol.js", [b["Core/Globals.js"], b["Core/Utilities.js"]], function (b, f) {
        var B = f.merge, y = f.pick;
        return b.LegendSymbolMixin = {
            drawRectangle: function (b, f) {
                var t = b.symbolHeight, r = b.options.squareSymbol;
                f.legendSymbol = this.chart.renderer.rect(r ? (b.symbolWidth - t) / 2 : 0, b.baseline - t + 1, r ?
                    t : b.symbolWidth, t, y(b.options.symbolRadius, t / 2)).addClass("highcharts-point").attr({zIndex: 3}).add(f.legendGroup)
            }, drawLineMarker: function (b) {
                var f = this.options, t = f.marker, r = b.symbolWidth, p = b.symbolHeight, l = p / 2,
                    g = this.chart.renderer, e = this.legendGroup;
                b = b.baseline - Math.round(.3 * b.fontMetrics.b);
                var d = {};
                this.chart.styledMode || (d = {"stroke-width": f.lineWidth || 0}, f.dashStyle && (d.dashstyle = f.dashStyle));
                this.legendLine = g.path([["M", 0, b], ["L", r, b]]).addClass("highcharts-graph").attr(d).add(e);
                t && !1 !==
                t.enabled && r && (f = Math.min(y(t.radius, l), l), 0 === this.symbol.indexOf("url") && (t = B(t, {
                    width: p,
                    height: p
                }), f = 0), this.legendSymbol = t = g.symbol(this.symbol, r / 2 - f, b - f, 2 * f, 2 * f, t).addClass("highcharts-point").add(e), t.isMarker = !0)
            }
        }
    });
    J(b, "Core/Series/Series.js", [b["Core/Animation/AnimationUtilities.js"], b["Core/Globals.js"], b["Mixins/LegendSymbol.js"], b["Core/Options.js"], b["Core/Color/Palette.js"], b["Core/Series/Point.js"], b["Core/Series/SeriesRegistry.js"], b["Core/Renderer/SVG/SVGElement.js"], b["Core/Utilities.js"]],
        function (b, f, D, y, C, A, t, r, p) {
            var l = b.animObject, g = b.setAnimation, e = f.hasTouch, d = f.svg, u = f.win, H = y.defaultOptions,
                B = t.seriesTypes, K = p.addEvent, F = p.arrayMax, w = p.arrayMin, z = p.clamp, q = p.cleanRecursively,
                m = p.correctFloat, c = p.defined, n = p.erase, a = p.error, k = p.extend, h = p.find, v = p.fireEvent,
                E = p.getNestedProperty, L = p.isArray, M = p.isFunction, S = p.isNumber, Y = p.isString, R = p.merge,
                O = p.objectEach, G = p.pick, x = p.removeEvent, J = p.splat, Z = p.syncTimeout;
            b = function () {
                function b() {
                    this.zones = this.yAxis = this.xAxis = this.userOptions =
                        this.tooltipOptions = this.processedYData = this.processedXData = this.points = this.options = this.linkedSeries = this.index = this.eventsToUnbind = this.eventOptions = this.data = this.chart = this._i = void 0
                }

                b.prototype.init = function (a, c) {
                    v(this, "init", {options: c});
                    var d = this, e = a.series, h;
                    this.eventOptions = this.eventOptions || {};
                    this.eventsToUnbind = [];
                    d.chart = a;
                    d.options = d.setOptions(c);
                    var b = d.options;
                    d.linkedSeries = [];
                    d.bindAxes();
                    k(d, {name: b.name, state: "", visible: !1 !== b.visible, selected: !0 === b.selected});
                    c = b.events;
                    O(c, function (a, c) {
                        M(a) && d.eventOptions[c] !== a && (M(d.eventOptions[c]) && x(d, c, d.eventOptions[c]), d.eventOptions[c] = a, K(d, c, a))
                    });
                    if (c && c.click || b.point && b.point.events && b.point.events.click || b.allowPointSelect) a.runTrackerClick = !0;
                    d.getColor();
                    d.getSymbol();
                    d.parallelArrays.forEach(function (a) {
                        d[a + "Data"] || (d[a + "Data"] = [])
                    });
                    d.isCartesian && (a.hasCartesianSeries = !0);
                    e.length && (h = e[e.length - 1]);
                    d._i = G(h && h._i, -1) + 1;
                    d.opacity = d.options.opacity;
                    a.orderSeries(this.insert(e));
                    b.dataSorting && b.dataSorting.enabled ?
                        d.setDataSortingOptions() : d.points || d.data || d.setData(b.data, !1);
                    v(this, "afterInit")
                };
                b.prototype.is = function (a) {
                    return B[a] && this instanceof B[a]
                };
                b.prototype.insert = function (a) {
                    var c = this.options.index, d;
                    if (S(c)) {
                        for (d = a.length; d--;) if (c >= G(a[d].options.index, a[d]._i)) {
                            a.splice(d + 1, 0, this);
                            break
                        }
                        -1 === d && a.unshift(this);
                        d += 1
                    } else a.push(this);
                    return G(d, a.length - 1)
                };
                b.prototype.bindAxes = function () {
                    var c = this, d = c.options, e = c.chart, h;
                    v(this, "bindAxes", null, function () {
                        (c.axisTypes || []).forEach(function (b) {
                            var k =
                                0;
                            e[b].forEach(function (a) {
                                h = a.options;
                                if (d[b] === k && !h.isInternal || "undefined" !== typeof d[b] && d[b] === h.id || "undefined" === typeof d[b] && 0 === h.index) c.insert(a.series), c[b] = a, a.isDirty = !0;
                                h.isInternal || k++
                            });
                            c[b] || c.optionalAxis === b || a(18, !0, e)
                        })
                    });
                    v(this, "afterBindAxes")
                };
                b.prototype.updateParallelArrays = function (a, c) {
                    var d = a.series, e = arguments, h = S(c) ? function (e) {
                        var h = "y" === e && d.toYData ? d.toYData(a) : a[e];
                        d[e + "Data"][c] = h
                    } : function (a) {
                        Array.prototype[c].apply(d[a + "Data"], Array.prototype.slice.call(e,
                            2))
                    };
                    d.parallelArrays.forEach(h)
                };
                b.prototype.hasData = function () {
                    return this.visible && "undefined" !== typeof this.dataMax && "undefined" !== typeof this.dataMin || this.visible && this.yData && 0 < this.yData.length
                };
                b.prototype.autoIncrement = function () {
                    var a = this.options, c = this.xIncrement, d, e = a.pointIntervalUnit, h = this.chart.time;
                    c = G(c, a.pointStart, 0);
                    this.pointInterval = d = G(this.pointInterval, a.pointInterval, 1);
                    e && (a = new h.Date(c), "day" === e ? h.set("Date", a, h.get("Date", a) + d) : "month" === e ? h.set("Month", a, h.get("Month",
                        a) + d) : "year" === e && h.set("FullYear", a, h.get("FullYear", a) + d), d = a.getTime() - c);
                    this.xIncrement = c + d;
                    return c
                };
                b.prototype.setDataSortingOptions = function () {
                    var a = this.options;
                    k(this, {requireSorting: !1, sorted: !1, enabledDataSorting: !0, allowDG: !1});
                    c(a.pointRange) || (a.pointRange = 1)
                };
                b.prototype.setOptions = function (a) {
                    var d = this.chart, e = d.options, h = e.plotOptions, b = d.userOptions || {};
                    a = R(a);
                    d = d.styledMode;
                    var k = {plotOptions: h, userOptions: a};
                    v(this, "setOptions", k);
                    var g = k.plotOptions[this.type], m = b.plotOptions ||
                        {};
                    this.userOptions = k.userOptions;
                    b = R(g, h.series, b.plotOptions && b.plotOptions[this.type], a);
                    this.tooltipOptions = R(H.tooltip, H.plotOptions.series && H.plotOptions.series.tooltip, H.plotOptions[this.type].tooltip, e.tooltip.userOptions, h.series && h.series.tooltip, h[this.type].tooltip, a.tooltip);
                    this.stickyTracking = G(a.stickyTracking, m[this.type] && m[this.type].stickyTracking, m.series && m.series.stickyTracking, this.tooltipOptions.shared && !this.noSharedTooltip ? !0 : b.stickyTracking);
                    null === g.marker && delete b.marker;
                    this.zoneAxis = b.zoneAxis;
                    e = this.zones = (b.zones || []).slice();
                    !b.negativeColor && !b.negativeFillColor || b.zones || (h = {
                        value: b[this.zoneAxis + "Threshold"] || b.threshold || 0,
                        className: "highcharts-negative"
                    }, d || (h.color = b.negativeColor, h.fillColor = b.negativeFillColor), e.push(h));
                    e.length && c(e[e.length - 1].value) && e.push(d ? {} : {
                        color: this.color,
                        fillColor: this.fillColor
                    });
                    v(this, "afterSetOptions", {options: b});
                    return b
                };
                b.prototype.getName = function () {
                    return G(this.options.name, "Series " + (this.index + 1))
                };
                b.prototype.getCyclic =
                    function (a, d, e) {
                        var h = this.chart, b = this.userOptions, k = a + "Index", g = a + "Counter",
                            m = e ? e.length : G(h.options.chart[a + "Count"], h[a + "Count"]);
                        if (!d) {
                            var l = G(b[k], b["_" + k]);
                            c(l) || (h.series.length || (h[g] = 0), b["_" + k] = l = h[g] % m, h[g] += 1);
                            e && (d = e[l])
                        }
                        "undefined" !== typeof l && (this[k] = l);
                        this[a] = d
                    };
                b.prototype.getColor = function () {
                    this.chart.styledMode ? this.getCyclic("color") : this.options.colorByPoint ? this.color = C.neutralColor20 : this.getCyclic("color", this.options.color || H.plotOptions[this.type].color, this.chart.options.colors)
                };
                b.prototype.getPointsCollection = function () {
                    return (this.hasGroupedData ? this.points : this.data) || []
                };
                b.prototype.getSymbol = function () {
                    this.getCyclic("symbol", this.options.marker.symbol, this.chart.options.symbols)
                };
                b.prototype.findPointIndex = function (a, c) {
                    var d = a.id, e = a.x, b = this.points, k, g = this.options.dataSorting;
                    if (d) var m = this.chart.get(d); else if (this.linkedParent || this.enabledDataSorting) {
                        var l = g && g.matchByName ? "name" : "index";
                        m = h(b, function (c) {
                            return !c.touched && c[l] === a[l]
                        });
                        if (!m) return
                    }
                    if (m) {
                        var n =
                            m && m.index;
                        "undefined" !== typeof n && (k = !0)
                    }
                    "undefined" === typeof n && S(e) && (n = this.xData.indexOf(e, c));
                    -1 !== n && "undefined" !== typeof n && this.cropped && (n = n >= this.cropStart ? n - this.cropStart : n);
                    !k && b[n] && b[n].touched && (n = void 0);
                    return n
                };
                b.prototype.updateData = function (a, d) {
                    var e = this.options, h = e.dataSorting, b = this.points, k = [], g, m, l, n = this.requireSorting,
                        f = a.length === b.length, q = !0;
                    this.xIncrement = null;
                    a.forEach(function (a, d) {
                        var m = c(a) && this.pointClass.prototype.optionsToObject.call({series: this}, a) || {};
                        var q = m.x;
                        if (m.id || S(q)) {
                            if (q = this.findPointIndex(m, l), -1 === q || "undefined" === typeof q ? k.push(a) : b[q] && a !== e.data[q] ? (b[q].update(a, !1, null, !1), b[q].touched = !0, n && (l = q + 1)) : b[q] && (b[q].touched = !0), !f || d !== q || h && h.enabled || this.hasDerivedData) g = !0
                        } else k.push(a)
                    }, this);
                    if (g) for (a = b.length; a--;) (m = b[a]) && !m.touched && m.remove && m.remove(!1, d); else !f || h && h.enabled ? q = !1 : (a.forEach(function (a, c) {
                        b[c].update && a !== b[c].y && b[c].update(a, !1, null, !1)
                    }), k.length = 0);
                    b.forEach(function (a) {
                        a && (a.touched = !1)
                    });
                    if (!q) return !1;
                    k.forEach(function (a) {
                        this.addPoint(a, !1, null, null, !1)
                    }, this);
                    null === this.xIncrement && this.xData && this.xData.length && (this.xIncrement = F(this.xData), this.autoIncrement());
                    return !0
                };
                b.prototype.setData = function (c, d, e, h) {
                    var b = this, k = b.points, g = k && k.length || 0, m, l = b.options, n = b.chart,
                        f = l.dataSorting, q = null, p = b.xAxis;
                    q = l.turboThreshold;
                    var v = this.xData, u = this.yData, w = (m = b.pointArrayMap) && m.length, r = l.keys, z = 0, t = 1,
                        E;
                    c = c || [];
                    m = c.length;
                    d = G(d, !0);
                    f && f.enabled && (c = this.sortData(c));
                    !1 !== h && m && g && !b.cropped &&
                    !b.hasGroupedData && b.visible && !b.isSeriesBoosting && (E = this.updateData(c, e));
                    if (!E) {
                        b.xIncrement = null;
                        b.colorCounter = 0;
                        this.parallelArrays.forEach(function (a) {
                            b[a + "Data"].length = 0
                        });
                        if (q && m > q) if (q = b.getFirstValidPoint(c), S(q)) for (e = 0; e < m; e++) v[e] = this.autoIncrement(), u[e] = c[e]; else if (L(q)) if (w) for (e = 0; e < m; e++) h = c[e], v[e] = h[0], u[e] = h.slice(1, w + 1); else for (r && (z = r.indexOf("x"), t = r.indexOf("y"), z = 0 <= z ? z : 0, t = 0 <= t ? t : 1), e = 0; e < m; e++) h = c[e], v[e] = h[z], u[e] = h[t]; else a(12, !1, n); else for (e = 0; e < m; e++) "undefined" !==
                        typeof c[e] && (h = {series: b}, b.pointClass.prototype.applyOptions.apply(h, [c[e]]), b.updateParallelArrays(h, e));
                        u && Y(u[0]) && a(14, !0, n);
                        b.data = [];
                        b.options.data = b.userOptions.data = c;
                        for (e = g; e--;) k[e] && k[e].destroy && k[e].destroy();
                        p && (p.minRange = p.userMinRange);
                        b.isDirty = n.isDirtyBox = !0;
                        b.isDirtyData = !!k;
                        e = !1
                    }
                    "point" === l.legendType && (this.processData(), this.generatePoints());
                    d && n.redraw(e)
                };
                b.prototype.sortData = function (a) {
                    var d = this, e = d.options.dataSorting.sortKey || "y", h = function (a, d) {
                        return c(d) && a.pointClass.prototype.optionsToObject.call({series: a},
                            d) || {}
                    };
                    a.forEach(function (c, e) {
                        a[e] = h(d, c);
                        a[e].index = e
                    }, this);
                    a.concat().sort(function (a, c) {
                        a = E(e, a);
                        c = E(e, c);
                        return c < a ? -1 : c > a ? 1 : 0
                    }).forEach(function (a, c) {
                        a.x = c
                    }, this);
                    d.linkedSeries && d.linkedSeries.forEach(function (c) {
                        var d = c.options, e = d.data;
                        d.dataSorting && d.dataSorting.enabled || !e || (e.forEach(function (d, b) {
                            e[b] = h(c, d);
                            a[b] && (e[b].x = a[b].x, e[b].index = b)
                        }), c.setData(e, !1))
                    });
                    return a
                };
                b.prototype.getProcessedData = function (c) {
                    var d = this.xData, e = this.yData, b = d.length;
                    var h = 0;
                    var k = this.xAxis, g =
                        this.options;
                    var m = g.cropThreshold;
                    var l = c || this.getExtremesFromAll || g.getExtremesFromAll, n = this.isCartesian;
                    c = k && k.val2lin;
                    g = !(!k || !k.logarithmic);
                    var f = this.requireSorting;
                    if (k) {
                        k = k.getExtremes();
                        var q = k.min;
                        var p = k.max
                    }
                    if (n && this.sorted && !l && (!m || b > m || this.forceCrop)) if (d[b - 1] < q || d[0] > p) d = [], e = []; else if (this.yData && (d[0] < q || d[b - 1] > p)) {
                        h = this.cropData(this.xData, this.yData, q, p);
                        d = h.xData;
                        e = h.yData;
                        h = h.start;
                        var v = !0
                    }
                    for (m = d.length || 1; --m;) if (b = g ? c(d[m]) - c(d[m - 1]) : d[m] - d[m - 1], 0 < b && ("undefined" ===
                        typeof u || b < u)) var u = b; else 0 > b && f && (a(15, !1, this.chart), f = !1);
                    return {xData: d, yData: e, cropped: v, cropStart: h, closestPointRange: u}
                };
                b.prototype.processData = function (a) {
                    var c = this.xAxis;
                    if (this.isCartesian && !this.isDirty && !c.isDirty && !this.yAxis.isDirty && !a) return !1;
                    a = this.getProcessedData();
                    this.cropped = a.cropped;
                    this.cropStart = a.cropStart;
                    this.processedXData = a.xData;
                    this.processedYData = a.yData;
                    this.closestPointRange = this.basePointRange = a.closestPointRange
                };
                b.prototype.cropData = function (a, c, d, e, b) {
                    var h =
                        a.length, k = 0, g = h, m;
                    b = G(b, this.cropShoulder);
                    for (m = 0; m < h; m++) if (a[m] >= d) {
                        k = Math.max(0, m - b);
                        break
                    }
                    for (d = m; d < h; d++) if (a[d] > e) {
                        g = d + b;
                        break
                    }
                    return {xData: a.slice(k, g), yData: c.slice(k, g), start: k, end: g}
                };
                b.prototype.generatePoints = function () {
                    var a = this.options, c = a.data, d = this.data, e, b = this.processedXData,
                        h = this.processedYData, g = this.pointClass, m = b.length, l = this.cropStart || 0,
                        n = this.hasGroupedData, f = a.keys, q = [], p;
                    a = a.dataGrouping && a.dataGrouping.groupAll ? l : 0;
                    d || n || (d = [], d.length = c.length, d = this.data = d);
                    f &&
                    n && (this.options.keys = !1);
                    for (p = 0; p < m; p++) {
                        var u = l + p;
                        if (n) {
                            var w = (new g).init(this, [b[p]].concat(J(h[p])));
                            w.dataGroup = this.groupMap[a + p];
                            w.dataGroup.options && (w.options = w.dataGroup.options, k(w, w.dataGroup.options), delete w.dataLabels)
                        } else (w = d[u]) || "undefined" === typeof c[u] || (d[u] = w = (new g).init(this, c[u], b[p]));
                        w && (w.index = n ? a + p : u, q[p] = w)
                    }
                    this.options.keys = f;
                    if (d && (m !== (e = d.length) || n)) for (p = 0; p < e; p++) p !== l || n || (p += m), d[p] && (d[p].destroyElements(), d[p].plotX = void 0);
                    this.data = d;
                    this.points = q;
                    v(this,
                        "afterGeneratePoints")
                };
                b.prototype.getXExtremes = function (a) {
                    return {min: w(a), max: F(a)}
                };
                b.prototype.getExtremes = function (a, c) {
                    var d = this.xAxis, e = this.yAxis, b = this.processedXData || this.xData, h = [], k = 0, g = 0;
                    var m = 0;
                    var l = this.requireSorting ? this.cropShoulder : 0, n = e ? e.positiveValuesOnly : !1, f;
                    a = a || this.stackedYData || this.processedYData || [];
                    e = a.length;
                    d && (m = d.getExtremes(), g = m.min, m = m.max);
                    for (f = 0; f < e; f++) {
                        var q = b[f];
                        var p = a[f];
                        var u = (S(p) || L(p)) && (p.length || 0 < p || !n);
                        q = c || this.getExtremesFromAll || this.options.getExtremesFromAll ||
                            this.cropped || !d || (b[f + l] || q) >= g && (b[f - l] || q) <= m;
                        if (u && q) if (u = p.length) for (; u--;) S(p[u]) && (h[k++] = p[u]); else h[k++] = p
                    }
                    a = {dataMin: w(h), dataMax: F(h)};
                    v(this, "afterGetExtremes", {dataExtremes: a});
                    return a
                };
                b.prototype.applyExtremes = function () {
                    var a = this.getExtremes();
                    this.dataMin = a.dataMin;
                    this.dataMax = a.dataMax;
                    return a
                };
                b.prototype.getFirstValidPoint = function (a) {
                    for (var c = null, d = a.length, e = 0; null === c && e < d;) c = a[e], e++;
                    return c
                };
                b.prototype.translate = function () {
                    this.processedXData || this.processData();
                    this.generatePoints();
                    var a = this.options, d = a.stacking, e = this.xAxis, b = e.categories, h = this.enabledDataSorting,
                        k = this.yAxis, g = this.points, l = g.length, n = !!this.modifyValue, f,
                        q = this.pointPlacementToXValue(), p = !!q, u = a.threshold, w = a.startFromThreshold ? u : 0,
                        r, t = this.zoneAxis || "y", E = Number.MAX_VALUE;
                    for (f = 0; f < l; f++) {
                        var x = g[f], H = x.x, F = x.y, B = x.low,
                            M = d && k.stacking && k.stacking.stacks[(this.negStacks && F < (w ? 0 : u) ? "-" : "") + this.stackKey],
                            C = void 0, A = void 0;
                        if (k.positiveValuesOnly && !k.validatePositiveValue(F) || e.positiveValuesOnly &&
                            !e.validatePositiveValue(H)) x.isNull = !0;
                        x.plotX = r = m(z(e.translate(H, 0, 0, 0, 1, q, "flags" === this.type), -1E5, 1E5));
                        if (d && this.visible && M && M[H]) {
                            var y = this.getStackIndicator(y, H, this.index);
                            x.isNull || (C = M[H], A = C.points[y.key])
                        }
                        L(A) && (B = A[0], F = A[1], B === w && y.key === M[H].base && (B = G(S(u) && u, k.min)), k.positiveValuesOnly && 0 >= B && (B = null), x.total = x.stackTotal = C.total, x.percentage = C.total && x.y / C.total * 100, x.stackY = F, this.irregularWidths || C.setOffset(this.pointXOffset || 0, this.barW || 0));
                        x.yBottom = c(B) ? z(k.translate(B,
                            0, 1, 0, 1), -1E5, 1E5) : null;
                        n && (F = this.modifyValue(F, x));
                        x.plotY = void 0;
                        S(F) && (F = k.translate(F, !1, !0, !1, !0), "undefined" !== typeof F && (x.plotY = z(F, -1E5, 1E5)));
                        x.isInside = this.isPointInside(x);
                        x.clientX = p ? m(e.translate(H, 0, 0, 0, 1, q)) : r;
                        x.negative = x[t] < (a[t + "Threshold"] || u || 0);
                        x.category = b && "undefined" !== typeof b[x.x] ? b[x.x] : x.x;
                        if (!x.isNull && !1 !== x.visible) {
                            "undefined" !== typeof I && (E = Math.min(E, Math.abs(r - I)));
                            var I = r
                        }
                        x.zone = this.zones.length && x.getZone();
                        !x.graphic && this.group && h && (x.isNew = !0)
                    }
                    this.closestPointRangePx =
                        E;
                    v(this, "afterTranslate")
                };
                b.prototype.getValidPoints = function (a, c, d) {
                    var e = this.chart;
                    return (a || this.points || []).filter(function (a) {
                        return c && !e.isInsidePlot(a.plotX, a.plotY, {inverted: e.inverted}) ? !1 : !1 !== a.visible && (d || !a.isNull)
                    })
                };
                b.prototype.getClipBox = function (a, c) {
                    var d = this.options, e = this.chart, b = e.inverted, h = this.xAxis, k = h && this.yAxis,
                        g = e.options.chart.scrollablePlotArea || {};
                    a && !1 === d.clip && k ? a = b ? {
                        y: -e.chartWidth + k.len + k.pos,
                        height: e.chartWidth,
                        width: e.chartHeight,
                        x: -e.chartHeight + h.len +
                            h.pos
                    } : {
                        y: -k.pos,
                        height: e.chartHeight,
                        width: e.chartWidth,
                        x: -h.pos
                    } : (a = this.clipBox || e.clipBox, c && (a.width = e.plotSizeX, a.x = (e.scrollablePixelsX || 0) * (g.scrollPositionX || 0)));
                    return c ? {width: a.width, x: a.x} : a
                };
                b.prototype.getSharedClipKey = function (a) {
                    if (this.sharedClipKey) return this.sharedClipKey;
                    var c = [a && a.duration, a && a.easing, a && a.defer, this.getClipBox(a).height, this.options.xAxis, this.options.yAxis].join();
                    if (!1 !== this.options.clip || a) this.sharedClipKey = c;
                    return c
                };
                b.prototype.setClip = function (a) {
                    var c =
                            this.chart, d = this.options, e = c.renderer, b = c.inverted, h = this.clipBox,
                        k = this.getClipBox(a), g = this.getSharedClipKey(a), m = c.sharedClips[g],
                        l = c.sharedClips[g + "m"];
                    a && (k.width = 0, b && (k.x = c.plotHeight + (!1 !== d.clip ? 0 : c.plotTop)));
                    m ? c.hasLoaded || m.attr(k) : (a && (c.sharedClips[g + "m"] = l = e.clipRect(b ? (c.plotSizeX || 0) + 99 : -99, b ? -c.plotLeft : -c.plotTop, 99, b ? c.chartWidth : c.chartHeight)), c.sharedClips[g] = m = e.clipRect(k), m.count = {length: 0});
                    a && !m.count[this.index] && (m.count[this.index] = !0, m.count.length += 1);
                    if (!1 !== d.clip ||
                        a) this.group.clip(a || h ? m : c.clipRect), this.markerGroup.clip(l);
                    a || (m.count[this.index] && (delete m.count[this.index], --m.count.length), 0 === m.count.length && (h || (c.sharedClips[g] = m.destroy()), l && (c.sharedClips[g + "m"] = l.destroy())))
                };
                b.prototype.animate = function (a) {
                    var c = this.chart, d = l(this.options.animation), e = this.sharedClipKey;
                    if (a) this.setClip(d); else if (e) {
                        a = c.sharedClips[e];
                        e = c.sharedClips[e + "m"];
                        var b = this.getClipBox(d, !0);
                        a && a.animate(b, d);
                        e && e.animate({width: b.width + 99, x: b.x - (c.inverted ? 0 : 99)},
                            d)
                    }
                };
                b.prototype.afterAnimate = function () {
                    this.setClip();
                    v(this, "afterAnimate");
                    this.finishedAnimating = !0
                };
                b.prototype.drawPoints = function () {
                    var a = this.points, c = this.chart, d, e, b = this.options.marker,
                        h = this[this.specialGroup] || this.markerGroup, k = this.xAxis,
                        g = G(b.enabled, !k || k.isRadial ? !0 : null, this.closestPointRangePx >= b.enabledThreshold * b.radius);
                    if (!1 !== b.enabled || this._hasPointMarkers) for (d = 0; d < a.length; d++) {
                        var m = a[d];
                        var l = (e = m.graphic) ? "animate" : "attr";
                        var n = m.marker || {};
                        var f = !!m.marker;
                        if ((g &&
                            "undefined" === typeof n.enabled || n.enabled) && !m.isNull && !1 !== m.visible) {
                            var q = G(n.symbol, this.symbol);
                            var p = this.markerAttribs(m, m.selected && "select");
                            this.enabledDataSorting && (m.startXPos = k.reversed ? -(p.width || 0) : k.width);
                            var v = !1 !== m.isInside;
                            e ? e[v ? "show" : "hide"](v).animate(p) : v && (0 < (p.width || 0) || m.hasImage) && (m.graphic = e = c.renderer.symbol(q, p.x, p.y, p.width, p.height, f ? n : b).add(h), this.enabledDataSorting && c.hasRendered && (e.attr({x: m.startXPos}), l = "animate"));
                            e && "animate" === l && e[v ? "show" : "hide"](v).animate(p);
                            if (e && !c.styledMode) e[l](this.pointAttribs(m, m.selected && "select"));
                            e && e.addClass(m.getClassName(), !0)
                        } else e && (m.graphic = e.destroy())
                    }
                };
                b.prototype.markerAttribs = function (a, c) {
                    var d = this.options, e = d.marker, b = a.marker || {}, h = b.symbol || e.symbol,
                        k = G(b.radius, e.radius);
                    c && (e = e.states[c], c = b.states && b.states[c], k = G(c && c.radius, e && e.radius, k + (e && e.radiusPlus || 0)));
                    a.hasImage = h && 0 === h.indexOf("url");
                    a.hasImage && (k = 0);
                    a = {x: d.crisp ? Math.floor(a.plotX - k) : a.plotX - k, y: a.plotY - k};
                    k && (a.width = a.height = 2 * k);
                    return a
                };
                b.prototype.pointAttribs = function (a, c) {
                    var d = this.options.marker, e = a && a.options, b = e && e.marker || {}, h = this.color,
                        k = e && e.color, g = a && a.color;
                    e = G(b.lineWidth, d.lineWidth);
                    var m = a && a.zone && a.zone.color;
                    a = 1;
                    h = k || m || g || h;
                    k = b.fillColor || d.fillColor || h;
                    h = b.lineColor || d.lineColor || h;
                    c = c || "normal";
                    d = d.states[c];
                    c = b.states && b.states[c] || {};
                    e = G(c.lineWidth, d.lineWidth, e + G(c.lineWidthPlus, d.lineWidthPlus, 0));
                    k = c.fillColor || d.fillColor || k;
                    h = c.lineColor || d.lineColor || h;
                    a = G(c.opacity, d.opacity, a);
                    return {
                        stroke: h, "stroke-width": e,
                        fill: k, opacity: a
                    }
                };
                b.prototype.destroy = function (a) {
                    var c = this, d = c.chart, e = /AppleWebKit\/533/.test(u.navigator.userAgent), b, h,
                        k = c.data || [], g, m;
                    v(c, "destroy");
                    this.removeEvents(a);
                    (c.axisTypes || []).forEach(function (a) {
                        (m = c[a]) && m.series && (n(m.series, c), m.isDirty = m.forceRedraw = !0)
                    });
                    c.legendItem && c.chart.legend.destroyItem(c);
                    for (h = k.length; h--;) (g = k[h]) && g.destroy && g.destroy();
                    c.clips && c.clips.forEach(function (a) {
                        return a.destroy()
                    });
                    p.clearTimeout(c.animationTimeout);
                    O(c, function (a, c) {
                        a instanceof
                        r && !a.survive && (b = e && "group" === c ? "hide" : "destroy", a[b]())
                    });
                    d.hoverSeries === c && (d.hoverSeries = void 0);
                    n(d.series, c);
                    d.orderSeries();
                    O(c, function (d, e) {
                        a && "hcEvents" === e || delete c[e]
                    })
                };
                b.prototype.applyZones = function () {
                    var a = this, c = this.chart, d = c.renderer, e = this.zones, b, h, k = this.clips || [], g,
                        m = this.graph, l = this.area, n = Math.max(c.chartWidth, c.chartHeight),
                        f = this[(this.zoneAxis || "y") + "Axis"], q = c.inverted, p, v, u, w = !1, r, t;
                    if (e.length && (m || l) && f && "undefined" !== typeof f.min) {
                        var x = f.reversed;
                        var E = f.horiz;
                        m && !this.showLine && m.hide();
                        l && l.hide();
                        var H = f.getExtremes();
                        e.forEach(function (e, F) {
                            b = x ? E ? c.plotWidth : 0 : E ? 0 : f.toPixels(H.min) || 0;
                            b = z(G(h, b), 0, n);
                            h = z(Math.round(f.toPixels(G(e.value, H.max), !0) || 0), 0, n);
                            w && (b = h = f.toPixels(H.max));
                            p = Math.abs(b - h);
                            v = Math.min(b, h);
                            u = Math.max(b, h);
                            f.isXAxis ? (g = {
                                x: q ? u : v,
                                y: 0,
                                width: p,
                                height: n
                            }, E || (g.x = c.plotHeight - g.x)) : (g = {
                                x: 0,
                                y: q ? u : v,
                                width: n,
                                height: p
                            }, E && (g.y = c.plotWidth - g.y));
                            q && d.isVML && (g = f.isXAxis ? {
                                x: 0,
                                y: x ? v : u,
                                height: g.width,
                                width: c.chartWidth
                            } : {
                                x: g.y - c.plotLeft - c.spacingBox.x,
                                y: 0, width: g.height, height: c.chartHeight
                            });
                            k[F] ? k[F].animate(g) : k[F] = d.clipRect(g);
                            r = a["zone-area-" + F];
                            t = a["zone-graph-" + F];
                            m && t && t.clip(k[F]);
                            l && r && r.clip(k[F]);
                            w = e.value > H.max;
                            a.resetZones && 0 === h && (h = void 0)
                        });
                        this.clips = k
                    } else a.visible && (m && m.show(!0), l && l.show(!0))
                };
                b.prototype.invertGroups = function (a) {
                    function c() {
                        ["group", "markerGroup"].forEach(function (c) {
                            d[c] && (e.renderer.isVML && d[c].attr({
                                width: d.yAxis.len,
                                height: d.xAxis.len
                            }), d[c].width = d.yAxis.len, d[c].height = d.xAxis.len, d[c].invert(d.isRadialSeries ?
                                !1 : a))
                        })
                    }

                    var d = this, e = d.chart;
                    d.xAxis && (d.eventsToUnbind.push(K(e, "resize", c)), c(), d.invertGroups = c)
                };
                b.prototype.plotGroup = function (a, d, e, b, h) {
                    var k = this[a], g = !k;
                    e = {visibility: e, zIndex: b || .1};
                    "undefined" === typeof this.opacity || this.chart.styledMode || "inactive" === this.state || (e.opacity = this.opacity);
                    g && (this[a] = k = this.chart.renderer.g().add(h));
                    k.addClass("highcharts-" + d + " highcharts-series-" + this.index + " highcharts-" + this.type + "-series " + (c(this.colorIndex) ? "highcharts-color-" + this.colorIndex + " " :
                        "") + (this.options.className || "") + (k.hasClass("highcharts-tracker") ? " highcharts-tracker" : ""), !0);
                    k.attr(e)[g ? "attr" : "animate"](this.getPlotBox());
                    return k
                };
                b.prototype.getPlotBox = function () {
                    var a = this.chart, c = this.xAxis, d = this.yAxis;
                    a.inverted && (c = d, d = this.xAxis);
                    return {
                        translateX: c ? c.left : a.plotLeft,
                        translateY: d ? d.top : a.plotTop,
                        scaleX: 1,
                        scaleY: 1
                    }
                };
                b.prototype.removeEvents = function (a) {
                    a || x(this);
                    this.eventsToUnbind.length && (this.eventsToUnbind.forEach(function (a) {
                        a()
                    }), this.eventsToUnbind.length =
                        0)
                };
                b.prototype.render = function () {
                    var a = this, c = a.chart, d = a.options, e = l(d.animation),
                        b = !a.finishedAnimating && c.renderer.isSVG && e.duration,
                        h = a.visible ? "inherit" : "hidden", k = d.zIndex, g = a.hasRendered, m = c.seriesGroup,
                        n = c.inverted;
                    v(this, "render");
                    var f = a.plotGroup("group", "series", h, k, m);
                    a.markerGroup = a.plotGroup("markerGroup", "markers", h, k, m);
                    b && a.animate && a.animate(!0);
                    f.inverted = G(a.invertible, a.isCartesian) ? n : !1;
                    a.drawGraph && (a.drawGraph(), a.applyZones());
                    a.visible && a.drawPoints();
                    a.drawDataLabels &&
                    a.drawDataLabels();
                    a.redrawPoints && a.redrawPoints();
                    a.drawTracker && !1 !== a.options.enableMouseTracking && a.drawTracker();
                    a.invertGroups(n);
                    !1 === d.clip || a.sharedClipKey || g || f.clip(c.clipRect);
                    b && a.animate && a.animate();
                    g || (b && e.defer && (b += e.defer), a.animationTimeout = Z(function () {
                        a.afterAnimate()
                    }, b || 0));
                    a.isDirty = !1;
                    a.hasRendered = !0;
                    v(a, "afterRender")
                };
                b.prototype.redraw = function () {
                    var a = this.chart, c = this.isDirty || this.isDirtyData, d = this.group, e = this.xAxis,
                        b = this.yAxis;
                    d && (a.inverted && d.attr({
                        width: a.plotWidth,
                        height: a.plotHeight
                    }), d.animate({translateX: G(e && e.left, a.plotLeft), translateY: G(b && b.top, a.plotTop)}));
                    this.translate();
                    this.render();
                    c && delete this.kdTree
                };
                b.prototype.searchPoint = function (a, c) {
                    var d = this.xAxis, e = this.yAxis, b = this.chart.inverted;
                    return this.searchKDTree({
                        clientX: b ? d.len - a.chartY + d.pos : a.chartX - d.pos,
                        plotY: b ? e.len - a.chartX + e.pos : a.chartY - e.pos
                    }, c, a)
                };
                b.prototype.buildKDTree = function (a) {
                    function c(a, e, b) {
                        var h;
                        if (h = a && a.length) {
                            var k = d.kdAxisArray[e % b];
                            a.sort(function (a, c) {
                                return a[k] -
                                    c[k]
                            });
                            h = Math.floor(h / 2);
                            return {point: a[h], left: c(a.slice(0, h), e + 1, b), right: c(a.slice(h + 1), e + 1, b)}
                        }
                    }

                    this.buildingKdTree = !0;
                    var d = this, e = -1 < d.options.findNearestPointBy.indexOf("y") ? 2 : 1;
                    delete d.kdTree;
                    Z(function () {
                        d.kdTree = c(d.getValidPoints(null, !d.directTouch), e, e);
                        d.buildingKdTree = !1
                    }, d.options.kdNow || a && "touchstart" === a.type ? 0 : 1)
                };
                b.prototype.searchKDTree = function (a, d, e) {
                    function b(a, d, e, l) {
                        var n = d.point, f = h.kdAxisArray[e % l], q = n;
                        var p = c(a[k]) && c(n[k]) ? Math.pow(a[k] - n[k], 2) : null;
                        var v = c(a[g]) &&
                        c(n[g]) ? Math.pow(a[g] - n[g], 2) : null;
                        v = (p || 0) + (v || 0);
                        n.dist = c(v) ? Math.sqrt(v) : Number.MAX_VALUE;
                        n.distX = c(p) ? Math.sqrt(p) : Number.MAX_VALUE;
                        f = a[f] - n[f];
                        v = 0 > f ? "left" : "right";
                        p = 0 > f ? "right" : "left";
                        d[v] && (v = b(a, d[v], e + 1, l), q = v[m] < q[m] ? v : n);
                        d[p] && Math.sqrt(f * f) < q[m] && (a = b(a, d[p], e + 1, l), q = a[m] < q[m] ? a : q);
                        return q
                    }

                    var h = this, k = this.kdAxisArray[0], g = this.kdAxisArray[1], m = d ? "distX" : "dist";
                    d = -1 < h.options.findNearestPointBy.indexOf("y") ? 2 : 1;
                    this.kdTree || this.buildingKdTree || this.buildKDTree(e);
                    if (this.kdTree) return b(a,
                        this.kdTree, d, d)
                };
                b.prototype.pointPlacementToXValue = function () {
                    var a = this.options, c = a.pointRange, d = this.xAxis;
                    a = a.pointPlacement;
                    "between" === a && (a = d.reversed ? -.5 : .5);
                    return S(a) ? a * (c || d.pointRange) : 0
                };
                b.prototype.isPointInside = function (a) {
                    return "undefined" !== typeof a.plotY && "undefined" !== typeof a.plotX && 0 <= a.plotY && a.plotY <= this.yAxis.len && 0 <= a.plotX && a.plotX <= this.xAxis.len
                };
                b.prototype.drawTracker = function () {
                    var a = this, c = a.options, b = c.trackByArea, h = [].concat(b ? a.areaPath : a.graphPath),
                        k = a.chart,
                        g = k.pointer, m = k.renderer, l = k.options.tooltip.snap, n = a.tracker, f = function (c) {
                            if (k.hoverSeries !== a) a.onMouseOver()
                        }, q = "rgba(192,192,192," + (d ? .0001 : .002) + ")";
                    n ? n.attr({d: h}) : a.graph && (a.tracker = m.path(h).attr({
                        visibility: a.visible ? "visible" : "hidden",
                        zIndex: 2
                    }).addClass(b ? "highcharts-tracker-area" : "highcharts-tracker-line").add(a.group), k.styledMode || a.tracker.attr({
                        "stroke-linecap": "round",
                        "stroke-linejoin": "round",
                        stroke: q,
                        fill: b ? q : "none",
                        "stroke-width": a.graph.strokeWidth() + (b ? 0 : 2 * l)
                    }), [a.tracker,
                        a.markerGroup, a.dataLabelsGroup].forEach(function (a) {
                        if (a && (a.addClass("highcharts-tracker").on("mouseover", f).on("mouseout", function (a) {
                            g.onTrackerMouseOut(a)
                        }), c.cursor && !k.styledMode && a.css({cursor: c.cursor}), e)) a.on("touchstart", f)
                    }));
                    v(this, "afterDrawTracker")
                };
                b.prototype.addPoint = function (a, c, d, e, b) {
                    var h = this.options, k = this.data, g = this.chart, m = this.xAxis;
                    m = m && m.hasNames && m.names;
                    var l = h.data, n = this.xData, f;
                    c = G(c, !0);
                    var q = {series: this};
                    this.pointClass.prototype.applyOptions.apply(q, [a]);
                    var p =
                        q.x;
                    var u = n.length;
                    if (this.requireSorting && p < n[u - 1]) for (f = !0; u && n[u - 1] > p;) u--;
                    this.updateParallelArrays(q, "splice", u, 0, 0);
                    this.updateParallelArrays(q, u);
                    m && q.name && (m[p] = q.name);
                    l.splice(u, 0, a);
                    f && (this.data.splice(u, 0, null), this.processData());
                    "point" === h.legendType && this.generatePoints();
                    d && (k[0] && k[0].remove ? k[0].remove(!1) : (k.shift(), this.updateParallelArrays(q, "shift"), l.shift()));
                    !1 !== b && v(this, "addPoint", {point: q});
                    this.isDirtyData = this.isDirty = !0;
                    c && g.redraw(e)
                };
                b.prototype.removePoint = function (a,
                                                    c, d) {
                    var e = this, b = e.data, h = b[a], k = e.points, m = e.chart, l = function () {
                        k && k.length === b.length && k.splice(a, 1);
                        b.splice(a, 1);
                        e.options.data.splice(a, 1);
                        e.updateParallelArrays(h || {series: e}, "splice", a, 1);
                        h && h.destroy();
                        e.isDirty = !0;
                        e.isDirtyData = !0;
                        c && m.redraw()
                    };
                    g(d, m);
                    c = G(c, !0);
                    h ? h.firePointEvent("remove", null, l) : l()
                };
                b.prototype.remove = function (a, c, d, e) {
                    function b() {
                        h.destroy(e);
                        k.isDirtyLegend = k.isDirtyBox = !0;
                        k.linkSeries();
                        G(a, !0) && k.redraw(c)
                    }

                    var h = this, k = h.chart;
                    !1 !== d ? v(h, "remove", null, b) : b()
                };
                b.prototype.update =
                    function (c, d) {
                        c = q(c, this.userOptions);
                        v(this, "update", {options: c});
                        var e = this, b = e.chart, h = e.userOptions, g = e.initialType || e.type,
                            m = b.options.plotOptions, l = c.type || h.type || b.options.chart.type,
                            n = !(this.hasDerivedData || l && l !== this.type || "undefined" !== typeof c.pointStart || "undefined" !== typeof c.pointInterval || e.hasOptionChanged("dataGrouping") || e.hasOptionChanged("pointStart") || e.hasOptionChanged("pointInterval") || e.hasOptionChanged("pointIntervalUnit") || e.hasOptionChanged("keys")),
                            f = B[g].prototype, p,
                            u = ["eventOptions", "navigatorSeries", "baseSeries"],
                            w = e.finishedAnimating && {animation: !1}, r = {};
                        l = l || g;
                        n && (u.push("data", "isDirtyData", "points", "processedXData", "processedYData", "xIncrement", "cropped", "_hasPointMarkers", "_hasPointLabels", "clips", "nodes", "layout", "mapMap", "mapData", "minY", "maxY", "minX", "maxX"), !1 !== c.visible && u.push("area", "graph"), e.parallelArrays.forEach(function (a) {
                            u.push(a + "Data")
                        }), c.data && (c.dataSorting && k(e.options.dataSorting, c.dataSorting), this.setData(c.data, !1)));
                        c = R(h, w, {
                            index: "undefined" ===
                            typeof h.index ? e.index : h.index,
                            pointStart: G(m && m.series && m.series.pointStart, h.pointStart, e.xData[0])
                        }, !n && {data: e.options.data}, c);
                        n && c.data && (c.data = e.options.data);
                        u = ["group", "markerGroup", "dataLabelsGroup", "transformGroup"].concat(u);
                        u.forEach(function (a) {
                            u[a] = e[a];
                            delete e[a]
                        });
                        h = !1;
                        if (B[l]) {
                            if (h = l !== e.type, e.remove(!1, !1, !1, !0), h) if (Object.setPrototypeOf) Object.setPrototypeOf(e, B[l].prototype); else {
                                m = Object.hasOwnProperty.call(e, "hcEvents") && e.hcEvents;
                                for (p in f) e[p] = void 0;
                                k(e, B[l].prototype);
                                m ? e.hcEvents = m : delete e.hcEvents
                            }
                        } else a(17, !0, b, {missingModuleFor: l});
                        u.forEach(function (a) {
                            e[a] = u[a]
                        });
                        e.init(b, c);
                        if (n && this.points) {
                            var z = e.options;
                            !1 === z.visible ? (r.graphic = 1, r.dataLabel = 1) : e._hasPointLabels || (c = z.marker, l = z.dataLabels, c && (!1 === c.enabled || "symbol" in c) && (r.graphic = 1), l && !1 === l.enabled && (r.dataLabel = 1));
                            this.points.forEach(function (a) {
                                a && a.series && (a.resolveColor(), Object.keys(r).length && a.destroyElements(r), !1 === z.showInLegend && a.legendItem && b.legend.destroyItem(a))
                            }, this)
                        }
                        e.initialType =
                            g;
                        b.linkSeries();
                        h && e.linkedSeries.length && (e.isDirtyData = !0);
                        v(this, "afterUpdate");
                        G(d, !0) && b.redraw(n ? void 0 : !1)
                    };
                b.prototype.setName = function (a) {
                    this.name = this.options.name = this.userOptions.name = a;
                    this.chart.isDirtyLegend = !0
                };
                b.prototype.hasOptionChanged = function (a) {
                    var c = this.options[a], d = this.chart.options.plotOptions, e = this.userOptions[a];
                    return e ? c !== e : c !== G(d && d[this.type] && d[this.type][a], d && d.series && d.series[a], c)
                };
                b.prototype.onMouseOver = function () {
                    var a = this.chart, c = a.hoverSeries;
                    a.pointer.setHoverChartIndex();
                    if (c && c !== this) c.onMouseOut();
                    this.options.events.mouseOver && v(this, "mouseOver");
                    this.setState("hover");
                    a.hoverSeries = this
                };
                b.prototype.onMouseOut = function () {
                    var a = this.options, c = this.chart, d = c.tooltip, e = c.hoverPoint;
                    c.hoverSeries = null;
                    if (e) e.onMouseOut();
                    this && a.events.mouseOut && v(this, "mouseOut");
                    !d || this.stickyTracking || d.shared && !this.noSharedTooltip || d.hide();
                    c.series.forEach(function (a) {
                        a.setState("", !0)
                    })
                };
                b.prototype.setState = function (a, c) {
                    var d = this, e = d.options, b = d.graph, h = e.inactiveOtherPoints,
                        k = e.states, g = e.lineWidth, m = e.opacity,
                        l = G(k[a || "normal"] && k[a || "normal"].animation, d.chart.options.chart.animation);
                    e = 0;
                    a = a || "";
                    if (d.state !== a && ([d.group, d.markerGroup, d.dataLabelsGroup].forEach(function (c) {
                        c && (d.state && c.removeClass("highcharts-series-" + d.state), a && c.addClass("highcharts-series-" + a))
                    }), d.state = a, !d.chart.styledMode)) {
                        if (k[a] && !1 === k[a].enabled) return;
                        a && (g = k[a].lineWidth || g + (k[a].lineWidthPlus || 0), m = G(k[a].opacity, m));
                        if (b && !b.dashstyle) for (k = {"stroke-width": g}, b.animate(k, l); d["zone-graph-" +
                        e];) d["zone-graph-" + e].animate(k, l), e += 1;
                        h || [d.group, d.markerGroup, d.dataLabelsGroup, d.labelBySeries].forEach(function (a) {
                            a && a.animate({opacity: m}, l)
                        })
                    }
                    c && h && d.points && d.setAllPointsToState(a || void 0)
                };
                b.prototype.setAllPointsToState = function (a) {
                    this.points.forEach(function (c) {
                        c.setState && c.setState(a)
                    })
                };
                b.prototype.setVisible = function (a, c) {
                    var d = this, e = d.chart, b = d.legendItem, h = e.options.chart.ignoreHiddenSeries, k = d.visible;
                    var g = (d.visible = a = d.options.visible = d.userOptions.visible = "undefined" ===
                    typeof a ? !k : a) ? "show" : "hide";
                    ["group", "dataLabelsGroup", "markerGroup", "tracker", "tt"].forEach(function (a) {
                        if (d[a]) d[a][g]()
                    });
                    if (e.hoverSeries === d || (e.hoverPoint && e.hoverPoint.series) === d) d.onMouseOut();
                    b && e.legend.colorizeItem(d, a);
                    d.isDirty = !0;
                    d.options.stacking && e.series.forEach(function (a) {
                        a.options.stacking && a.visible && (a.isDirty = !0)
                    });
                    d.linkedSeries.forEach(function (c) {
                        c.setVisible(a, !1)
                    });
                    h && (e.isDirtyBox = !0);
                    v(d, g);
                    !1 !== c && e.redraw()
                };
                b.prototype.show = function () {
                    this.setVisible(!0)
                };
                b.prototype.hide =
                    function () {
                        this.setVisible(!1)
                    };
                b.prototype.select = function (a) {
                    this.selected = a = this.options.selected = "undefined" === typeof a ? !this.selected : a;
                    this.checkbox && (this.checkbox.checked = a);
                    v(this, a ? "select" : "unselect")
                };
                b.prototype.shouldShowTooltip = function (a, c, d) {
                    void 0 === d && (d = {});
                    d.series = this;
                    d.visiblePlotOnly = !0;
                    return this.chart.isInsidePlot(a, c, d)
                };
                b.defaultOptions = {
                    lineWidth: 2,
                    allowPointSelect: !1,
                    crisp: !0,
                    showCheckbox: !1,
                    animation: {duration: 1E3},
                    events: {},
                    marker: {
                        enabledThreshold: 2,
                        lineColor: C.backgroundColor,
                        lineWidth: 0,
                        radius: 4,
                        states: {
                            normal: {animation: !0},
                            hover: {animation: {duration: 50}, enabled: !0, radiusPlus: 2, lineWidthPlus: 1},
                            select: {fillColor: C.neutralColor20, lineColor: C.neutralColor100, lineWidth: 2}
                        }
                    },
                    point: {events: {}},
                    dataLabels: {
                        animation: {},
                        align: "center",
                        defer: !0,
                        formatter: function () {
                            var a = this.series.chart.numberFormatter;
                            return "number" !== typeof this.y ? "" : a(this.y, -1)
                        },
                        padding: 5,
                        style: {fontSize: "11px", fontWeight: "bold", color: "contrast", textOutline: "1px contrast"},
                        verticalAlign: "bottom",
                        x: 0,
                        y: 0
                    },
                    cropThreshold: 300,
                    opacity: 1,
                    pointRange: 0,
                    softThreshold: !0,
                    states: {
                        normal: {animation: !0},
                        hover: {
                            animation: {duration: 50},
                            lineWidthPlus: 1,
                            marker: {},
                            halo: {size: 10, opacity: .25}
                        },
                        select: {animation: {duration: 0}},
                        inactive: {animation: {duration: 50}, opacity: .2}
                    },
                    stickyTracking: !0,
                    turboThreshold: 1E3,
                    findNearestPointBy: "x"
                };
                return b
            }();
            k(b.prototype, {
                axisTypes: ["xAxis", "yAxis"],
                coll: "series",
                colorCounter: 0,
                cropShoulder: 1,
                directTouch: !1,
                drawLegendSymbol: D.drawLineMarker,
                isCartesian: !0,
                kdAxisArray: ["clientX", "plotY"],
                parallelArrays: ["x", "y"],
                pointClass: A,
                requireSorting: !0,
                sorted: !0
            });
            t.series = b;
            "";
            "";
            return b
        });
    J(b, "Extensions/ScrollablePlotArea.js", [b["Core/Animation/AnimationUtilities.js"], b["Core/Axis/Axis.js"], b["Core/Chart/Chart.js"], b["Core/Series/Series.js"], b["Core/Globals.js"], b["Core/Utilities.js"]], function (b, f, D, y, C, A) {
        var t = b.stop, r = A.addEvent, p = A.createElement, l = A.merge, g = A.pick;
        "";
        r(D, "afterSetChartSize", function (e) {
            var d = this.options.chart.scrollablePlotArea, b = d && d.minWidth;
            d = d && d.minHeight;
            if (!this.renderer.forExport) {
                if (b) {
                    if (this.scrollablePixelsX =
                        b = Math.max(0, b - this.chartWidth)) {
                        this.scrollablePlotBox = this.renderer.scrollablePlotBox = l(this.plotBox);
                        this.plotBox.width = this.plotWidth += b;
                        this.inverted ? this.clipBox.height += b : this.clipBox.width += b;
                        var g = {1: {name: "right", value: b}}
                    }
                } else d && (this.scrollablePixelsY = b = Math.max(0, d - this.chartHeight)) && (this.scrollablePlotBox = this.renderer.scrollablePlotBox = l(this.plotBox), this.plotBox.height = this.plotHeight += b, this.inverted ? this.clipBox.width += b : this.clipBox.height += b, g = {
                    2: {
                        name: "bottom",
                        value: b
                    }
                });
                g && !e.skipAxes && this.axes.forEach(function (d) {
                    g[d.side] ? d.getPlotLinePath = function () {
                        var e = g[d.side].name, b = this[e];
                        this[e] = b - g[d.side].value;
                        var l = C.Axis.prototype.getPlotLinePath.apply(this, arguments);
                        this[e] = b;
                        return l
                    } : (d.setAxisSize(), d.setAxisTranslation())
                })
            }
        });
        r(D, "render", function () {
            this.scrollablePixelsX || this.scrollablePixelsY ? (this.setUpScrolling && this.setUpScrolling(), this.applyFixed()) : this.fixedDiv && this.applyFixed()
        });
        D.prototype.setUpScrolling = function () {
            var e = this, d = {
                WebkitOverflowScrolling: "touch",
                overflowX: "hidden", overflowY: "hidden"
            };
            this.scrollablePixelsX && (d.overflowX = "auto");
            this.scrollablePixelsY && (d.overflowY = "auto");
            this.scrollingParent = p("div", {className: "highcharts-scrolling-parent"}, {position: "relative"}, this.renderTo);
            this.scrollingContainer = p("div", {className: "highcharts-scrolling"}, d, this.scrollingParent);
            r(this.scrollingContainer, "scroll", function () {
                e.pointer && delete e.pointer.chartPosition
            });
            this.innerContainer = p("div", {className: "highcharts-inner-container"}, null, this.scrollingContainer);
            this.innerContainer.appendChild(this.container);
            this.setUpScrolling = null
        };
        D.prototype.moveFixedElements = function () {
            var e = this.container, d = this.fixedRenderer,
                b = ".highcharts-contextbutton .highcharts-credits .highcharts-legend .highcharts-legend-checkbox .highcharts-navigator-series .highcharts-navigator-xaxis .highcharts-navigator-yaxis .highcharts-navigator .highcharts-reset-zoom .highcharts-drillup-button .highcharts-scrollbar .highcharts-subtitle .highcharts-title".split(" "),
                g;
            this.scrollablePixelsX &&
            !this.inverted ? g = ".highcharts-yaxis" : this.scrollablePixelsX && this.inverted ? g = ".highcharts-xaxis" : this.scrollablePixelsY && !this.inverted ? g = ".highcharts-xaxis" : this.scrollablePixelsY && this.inverted && (g = ".highcharts-yaxis");
            g && b.push(g + ":not(.highcharts-radial-axis)", g + "-labels:not(.highcharts-radial-axis-labels)");
            b.forEach(function (b) {
                [].forEach.call(e.querySelectorAll(b), function (e) {
                    (e.namespaceURI === d.SVG_NS ? d.box : d.box.parentNode).appendChild(e);
                    e.style.pointerEvents = "auto"
                })
            })
        };
        D.prototype.applyFixed =
            function () {
                var e = !this.fixedDiv;
                var d = this.options.chart;
                var b = d.scrollablePlotArea;
                e ? (this.fixedDiv = p("div", {className: "highcharts-fixed"}, {
                    position: "absolute",
                    overflow: "hidden",
                    pointerEvents: "none",
                    zIndex: (d.style && d.style.zIndex || 0) + 2,
                    top: 0
                }, null, !0), this.scrollingContainer && this.scrollingContainer.parentNode.insertBefore(this.fixedDiv, this.scrollingContainer), this.renderTo.style.overflow = "visible", this.fixedRenderer = d = new C.Renderer(this.fixedDiv, this.chartWidth, this.chartHeight, this.options.chart.style),
                    this.scrollableMask = d.path().attr({
                        fill: this.options.chart.backgroundColor || "#fff",
                        "fill-opacity": g(b.opacity, .85),
                        zIndex: -1
                    }).addClass("highcharts-scrollable-mask").add(), r(this, "afterShowResetZoom", this.moveFixedElements), r(this, "afterDrilldown", this.moveFixedElements), r(this, "afterLayOutTitles", this.moveFixedElements)) : this.fixedRenderer.setSize(this.chartWidth, this.chartHeight);
                if (this.scrollableDirty || e) this.scrollableDirty = !1, this.moveFixedElements();
                d = this.chartWidth + (this.scrollablePixelsX ||
                    0);
                var l = this.chartHeight + (this.scrollablePixelsY || 0);
                t(this.container);
                this.container.style.width = d + "px";
                this.container.style.height = l + "px";
                this.renderer.boxWrapper.attr({width: d, height: l, viewBox: [0, 0, d, l].join(" ")});
                this.chartBackground.attr({width: d, height: l});
                this.scrollingContainer.style.height = this.chartHeight + "px";
                e && (b.scrollPositionX && (this.scrollingContainer.scrollLeft = this.scrollablePixelsX * b.scrollPositionX), b.scrollPositionY && (this.scrollingContainer.scrollTop = this.scrollablePixelsY *
                    b.scrollPositionY));
                l = this.axisOffset;
                e = this.plotTop - l[0] - 1;
                b = this.plotLeft - l[3] - 1;
                d = this.plotTop + this.plotHeight + l[2] + 1;
                l = this.plotLeft + this.plotWidth + l[1] + 1;
                var f = this.plotLeft + this.plotWidth - (this.scrollablePixelsX || 0),
                    B = this.plotTop + this.plotHeight - (this.scrollablePixelsY || 0);
                e = this.scrollablePixelsX ? [["M", 0, e], ["L", this.plotLeft - 1, e], ["L", this.plotLeft - 1, d], ["L", 0, d], ["Z"], ["M", f, e], ["L", this.chartWidth, e], ["L", this.chartWidth, d], ["L", f, d], ["Z"]] : this.scrollablePixelsY ? [["M", b, 0], ["L", b, this.plotTop -
                1], ["L", l, this.plotTop - 1], ["L", l, 0], ["Z"], ["M", b, B], ["L", b, this.chartHeight], ["L", l, this.chartHeight], ["L", l, B], ["Z"]] : [["M", 0, 0]];
                "adjustHeight" !== this.redrawTrigger && this.scrollableMask.attr({d: e})
            };
        r(f, "afterInit", function () {
            this.chart.scrollableDirty = !0
        });
        r(y, "show", function () {
            this.chart.scrollableDirty = !0
        })
    });
    J(b, "Core/Axis/StackingAxis.js", [b["Core/Animation/AnimationUtilities.js"], b["Core/Utilities.js"]], function (b, f) {
        var B = b.getDeferredAnimation, y = f.addEvent, C = f.destroyObjectProperties, A =
            f.fireEvent, t = f.isNumber, r = f.objectEach, p = function () {
            function b(b) {
                this.oldStacks = {};
                this.stacks = {};
                this.stacksTouched = 0;
                this.axis = b
            }

            b.prototype.buildStacks = function () {
                var b = this.axis, e = b.series, d = b.options.reversedStacks, l = e.length, f;
                if (!b.isXAxis) {
                    this.usePercentage = !1;
                    for (f = l; f--;) {
                        var p = e[d ? f : l - f - 1];
                        p.setStackedPoints();
                        p.setGroupedPoints()
                    }
                    for (f = 0; f < l; f++) e[f].modifyStacks();
                    A(b, "afterBuildStacks")
                }
            };
            b.prototype.cleanStacks = function () {
                if (!this.axis.isXAxis) {
                    if (this.oldStacks) var b = this.stacks =
                        this.oldStacks;
                    r(b, function (e) {
                        r(e, function (d) {
                            d.cumulative = d.total
                        })
                    })
                }
            };
            b.prototype.resetStacks = function () {
                var b = this, e = this.stacks;
                this.axis.isXAxis || r(e, function (d) {
                    r(d, function (e, g) {
                        t(e.touched) && e.touched < b.stacksTouched ? (e.destroy(), delete d[g]) : (e.total = null, e.cumulative = null)
                    })
                })
            };
            b.prototype.renderStackTotals = function () {
                var b = this.axis, e = b.chart, d = e.renderer, l = this.stacks;
                b = B(e, b.options.stackLabels && b.options.stackLabels.animation || !1);
                var f = this.stackTotalGroup = this.stackTotalGroup || d.g("stack-labels").attr({
                    visibility: "visible",
                    zIndex: 6, opacity: 0
                }).add();
                f.translate(e.plotLeft, e.plotTop);
                r(l, function (d) {
                    r(d, function (d) {
                        d.render(f)
                    })
                });
                f.animate({opacity: 1}, b)
            };
            return b
        }();
        return function () {
            function b() {
            }

            b.compose = function (g) {
                y(g, "init", b.onInit);
                y(g, "destroy", b.onDestroy)
            };
            b.onDestroy = function () {
                var b = this.stacking;
                if (b) {
                    var e = b.stacks;
                    r(e, function (d, b) {
                        C(d);
                        e[b] = null
                    });
                    b && b.stackTotalGroup && b.stackTotalGroup.destroy()
                }
            };
            b.onInit = function () {
                this.stacking || (this.stacking = new p(this))
            };
            return b
        }()
    });
    J(b, "Extensions/Stacking.js",
        [b["Core/Axis/Axis.js"], b["Core/Chart/Chart.js"], b["Core/FormatUtilities.js"], b["Core/Globals.js"], b["Core/Series/Series.js"], b["Core/Axis/StackingAxis.js"], b["Core/Utilities.js"]], function (b, f, D, y, C, A, t) {
            var r = D.format, p = t.correctFloat, l = t.defined, g = t.destroyObjectProperties, e = t.isArray,
                d = t.isNumber, u = t.objectEach, H = t.pick;
            "";
            var B = function () {
                function e(d, e, b, g, m) {
                    var c = d.chart.inverted;
                    this.axis = d;
                    this.isNegative = b;
                    this.options = e = e || {};
                    this.x = g;
                    this.total = null;
                    this.points = {};
                    this.hasValidPoints =
                        !1;
                    this.stack = m;
                    this.rightCliff = this.leftCliff = 0;
                    this.alignOptions = {
                        align: e.align || (c ? b ? "left" : "right" : "center"),
                        verticalAlign: e.verticalAlign || (c ? "middle" : b ? "bottom" : "top"),
                        y: e.y,
                        x: e.x
                    };
                    this.textAlign = e.textAlign || (c ? b ? "right" : "left" : "center")
                }

                e.prototype.destroy = function () {
                    g(this, this.axis)
                };
                e.prototype.render = function (d) {
                    var e = this.axis.chart, b = this.options, g = b.format;
                    g = g ? r(g, this, e) : b.formatter.call(this);
                    this.label ? this.label.attr({text: g, visibility: "hidden"}) : (this.label = e.renderer.label(g,
                        null, null, b.shape, null, null, b.useHTML, !1, "stack-labels"), g = {
                        r: b.borderRadius || 0,
                        text: g,
                        rotation: b.rotation,
                        padding: H(b.padding, 5),
                        visibility: "hidden"
                    }, e.styledMode || (g.fill = b.backgroundColor, g.stroke = b.borderColor, g["stroke-width"] = b.borderWidth, this.label.css(b.style)), this.label.attr(g), this.label.added || this.label.add(d));
                    this.label.labelrank = e.plotSizeY
                };
                e.prototype.setOffset = function (e, b, g, f, m) {
                    var c = this.axis, n = c.chart;
                    f = c.translate(c.stacking.usePercentage ? 100 : f ? f : this.total, 0, 0, 0, 1);
                    g = c.translate(g ?
                        g : 0);
                    g = l(f) && Math.abs(f - g);
                    e = H(m, n.xAxis[0].translate(this.x)) + e;
                    c = l(f) && this.getStackBox(n, this, e, f, b, g, c);
                    b = this.label;
                    g = this.isNegative;
                    e = "justify" === H(this.options.overflow, "justify");
                    var a = this.textAlign;
                    b && c && (m = b.getBBox(), f = b.padding, a = "left" === a ? n.inverted ? -f : f : "right" === a ? m.width : n.inverted && "center" === a ? m.width / 2 : n.inverted ? g ? m.width + f : -f : m.width / 2, g = n.inverted ? m.height / 2 : g ? -f : m.height, this.alignOptions.x = H(this.options.x, 0), this.alignOptions.y = H(this.options.y, 0), c.x -= a, c.y -= g, b.align(this.alignOptions,
                        null, c), n.isInsidePlot(b.alignAttr.x + a - this.alignOptions.x, b.alignAttr.y + g - this.alignOptions.y) ? b.show() : (b.alignAttr.y = -9999, e = !1), e && C.prototype.justifyDataLabel.call(this.axis, b, this.alignOptions, b.alignAttr, m, c), b.attr({
                        x: b.alignAttr.x,
                        y: b.alignAttr.y
                    }), H(!e && this.options.crop, !0) && ((n = d(b.x) && d(b.y) && n.isInsidePlot(b.x - f + b.width, b.y) && n.isInsidePlot(b.x + f, b.y)) || b.hide()))
                };
                e.prototype.getStackBox = function (d, e, b, g, m, c, l) {
                    var a = e.axis.reversed, k = d.inverted, h = l.height + l.pos - (k ? d.plotLeft : d.plotTop);
                    e = e.isNegative && !a || !e.isNegative && a;
                    return {
                        x: k ? e ? g - l.right : g - c + l.pos - d.plotLeft : b + d.xAxis[0].transB - d.plotLeft,
                        y: k ? l.height - b - m : e ? h - g - c : h - g,
                        width: k ? c : m,
                        height: k ? m : c
                    }
                };
                return e
            }();
            f.prototype.getStacks = function () {
                var d = this, e = d.inverted;
                d.yAxis.forEach(function (d) {
                    d.stacking && d.stacking.stacks && d.hasVisibleSeries && (d.stacking.oldStacks = d.stacking.stacks)
                });
                d.series.forEach(function (b) {
                    var g = b.xAxis && b.xAxis.options || {};
                    !b.options.stacking || !0 !== b.visible && !1 !== d.options.chart.ignoreHiddenSeries ||
                    (b.stackKey = [b.type, H(b.options.stack, ""), e ? g.top : g.left, e ? g.height : g.width].join())
                })
            };
            A.compose(b);
            C.prototype.setGroupedPoints = function () {
                var d = this.yAxis.stacking;
                this.options.centerInCategory && (this.is("column") || this.is("columnrange")) && !this.options.stacking && 1 < this.chart.series.length ? C.prototype.setStackedPoints.call(this, "group") : d && u(d.stacks, function (e, b) {
                    "group" === b.slice(-5) && (u(e, function (d) {
                        return d.destroy()
                    }), delete d.stacks[b])
                })
            };
            C.prototype.setStackedPoints = function (d) {
                var b =
                    d || this.options.stacking;
                if (b && (!0 === this.visible || !1 === this.chart.options.chart.ignoreHiddenSeries)) {
                    var g = this.processedXData, f = this.processedYData, q = [], m = f.length, c = this.options,
                        n = c.threshold, a = H(c.startFromThreshold && n, 0);
                    c = c.stack;
                    d = d ? this.type + "," + b : this.stackKey;
                    var k = "-" + d, h = this.negStacks, v = this.yAxis, u = v.stacking.stacks,
                        r = v.stacking.oldStacks, t, C;
                    v.stacking.stacksTouched += 1;
                    for (C = 0; C < m; C++) {
                        var A = g[C];
                        var y = f[C];
                        var D = this.getStackIndicator(D, A, this.index);
                        var G = D.key;
                        var x = (t = h && y < (a ? 0 :
                            n)) ? k : d;
                        u[x] || (u[x] = {});
                        u[x][A] || (r[x] && r[x][A] ? (u[x][A] = r[x][A], u[x][A].total = null) : u[x][A] = new B(v, v.options.stackLabels, t, A, c));
                        x = u[x][A];
                        null !== y ? (x.points[G] = x.points[this.index] = [H(x.cumulative, a)], l(x.cumulative) || (x.base = G), x.touched = v.stacking.stacksTouched, 0 < D.index && !1 === this.singleStacks && (x.points[G][0] = x.points[this.index + "," + A + ",0"][0])) : x.points[G] = x.points[this.index] = null;
                        "percent" === b ? (t = t ? d : k, h && u[t] && u[t][A] ? (t = u[t][A], x.total = t.total = Math.max(t.total, x.total) + Math.abs(y) || 0) :
                            x.total = p(x.total + (Math.abs(y) || 0))) : "group" === b ? (e(y) && (y = y[0]), null !== y && (x.total = (x.total || 0) + 1)) : x.total = p(x.total + (y || 0));
                        x.cumulative = "group" === b ? (x.total || 1) - 1 : H(x.cumulative, a) + (y || 0);
                        null !== y && (x.points[G].push(x.cumulative), q[C] = x.cumulative, x.hasValidPoints = !0)
                    }
                    "percent" === b && (v.stacking.usePercentage = !0);
                    "group" !== b && (this.stackedYData = q);
                    v.stacking.oldStacks = {}
                }
            };
            C.prototype.modifyStacks = function () {
                var d = this, e = d.stackKey, b = d.yAxis.stacking.stacks, g = d.processedXData, l,
                    m = d.options.stacking;
                d[m + "Stacker"] && [e, "-" + e].forEach(function (c) {
                    for (var e = g.length, a, k; e--;) if (a = g[e], l = d.getStackIndicator(l, a, d.index, c), k = (a = b[c] && b[c][a]) && a.points[l.key]) d[m + "Stacker"](k, a, e)
                })
            };
            C.prototype.percentStacker = function (d, e, b) {
                e = e.total ? 100 / e.total : 0;
                d[0] = p(d[0] * e);
                d[1] = p(d[1] * e);
                this.stackedYData[b] = d[1]
            };
            C.prototype.getStackIndicator = function (d, e, b, g) {
                !l(d) || d.x !== e || g && d.key !== g ? d = {x: e, index: 0, key: g} : d.index++;
                d.key = [b, e, d.index].join();
                return d
            };
            y.StackItem = B;
            return y.StackItem
        });
    J(b, "Series/Line/LineSeries.js",
        [b["Core/Color/Palette.js"], b["Core/Series/Series.js"], b["Core/Series/SeriesRegistry.js"], b["Core/Utilities.js"]], function (b, f, D, y) {
            var B = this && this.__extends || function () {
                    var b = function (f, l) {
                        b = Object.setPrototypeOf || {__proto__: []} instanceof Array && function (b, e) {
                            b.__proto__ = e
                        } || function (b, e) {
                            for (var d in e) e.hasOwnProperty(d) && (b[d] = e[d])
                        };
                        return b(f, l)
                    };
                    return function (f, l) {
                        function g() {
                            this.constructor = f
                        }

                        b(f, l);
                        f.prototype = null === l ? Object.create(l) : (g.prototype = l.prototype, new g)
                    }
                }(), A = y.defined,
                t = y.merge;
            y = function (r) {
                function p() {
                    var b = null !== r && r.apply(this, arguments) || this;
                    b.data = void 0;
                    b.options = void 0;
                    b.points = void 0;
                    return b
                }

                B(p, r);
                p.prototype.drawGraph = function () {
                    var l = this, g = this.options, e = (this.gappedPath || this.getGraphPath).call(this),
                        d = this.chart.styledMode, f = [["graph", "highcharts-graph"]];
                    d || f[0].push(g.lineColor || this.color || b.neutralColor20, g.dashStyle);
                    f = l.getZonesGraphs(f);
                    f.forEach(function (b, f) {
                        var p = b[0], u = l[p], r = u ? "animate" : "attr";
                        u ? (u.endX = l.preventGraphAnimation ? null :
                            e.xMap, u.animate({d: e})) : e.length && (l[p] = u = l.chart.renderer.path(e).addClass(b[1]).attr({zIndex: 1}).add(l.group));
                        u && !d && (p = {
                            stroke: b[2],
                            "stroke-width": g.lineWidth,
                            fill: l.fillGraph && l.color || "none"
                        }, b[3] ? p.dashstyle = b[3] : "square" !== g.linecap && (p["stroke-linecap"] = p["stroke-linejoin"] = "round"), u[r](p).shadow(2 > f && g.shadow));
                        u && (u.startX = e.xMap, u.isArea = e.isArea)
                    })
                };
                p.prototype.getGraphPath = function (b, g, e) {
                    var d = this, l = d.options, f = l.step, p, r = [], t = [], w;
                    b = b || d.points;
                    (p = b.reversed) && b.reverse();
                    (f = {
                        right: 1,
                        center: 2
                    }[f] || f && 3) && p && (f = 4 - f);
                    b = this.getValidPoints(b, !1, !(l.connectNulls && !g && !e));
                    b.forEach(function (p, q) {
                        var m = p.plotX, c = p.plotY, n = b[q - 1];
                        (p.leftCliff || n && n.rightCliff) && !e && (w = !0);
                        p.isNull && !A(g) && 0 < q ? w = !l.connectNulls : p.isNull && !g ? w = !0 : (0 === q || w ? q = [["M", p.plotX, p.plotY]] : d.getPointSpline ? q = [d.getPointSpline(b, p, q)] : f ? (q = 1 === f ? [["L", n.plotX, c]] : 2 === f ? [["L", (n.plotX + m) / 2, n.plotY], ["L", (n.plotX + m) / 2, c]] : [["L", m, n.plotY]], q.push(["L", m, c])) : q = [["L", m, c]], t.push(p.x), f && (t.push(p.x), 2 === f && t.push(p.x)),
                            r.push.apply(r, q), w = !1)
                    });
                    r.xMap = t;
                    return d.graphPath = r
                };
                p.prototype.getZonesGraphs = function (b) {
                    this.zones.forEach(function (g, e) {
                        e = ["zone-graph-" + e, "highcharts-graph highcharts-zone-graph-" + e + " " + (g.className || "")];
                        this.chart.styledMode || e.push(g.color || this.color, g.dashStyle || this.options.dashStyle);
                        b.push(e)
                    }, this);
                    return b
                };
                p.defaultOptions = t(f.defaultOptions, {});
                return p
            }(f);
            D.registerSeriesType("line", y);
            "";
            return y
        });
    J(b, "Series/Area/AreaSeries.js", [b["Core/Color/Color.js"], b["Mixins/LegendSymbol.js"],
        b["Core/Series/SeriesRegistry.js"], b["Core/Utilities.js"]], function (b, f, D, y) {
        var B = this && this.__extends || function () {
            var b = function (e, d) {
                b = Object.setPrototypeOf || {__proto__: []} instanceof Array && function (d, e) {
                    d.__proto__ = e
                } || function (d, e) {
                    for (var b in e) e.hasOwnProperty(b) && (d[b] = e[b])
                };
                return b(e, d)
            };
            return function (e, d) {
                function g() {
                    this.constructor = e
                }

                b(e, d);
                e.prototype = null === d ? Object.create(d) : (g.prototype = d.prototype, new g)
            }
        }(), A = b.parse, t = D.seriesTypes.line;
        b = y.extend;
        var r = y.merge, p = y.objectEach,
            l = y.pick;
        y = function (b) {
            function e() {
                var d = null !== b && b.apply(this, arguments) || this;
                d.data = void 0;
                d.options = void 0;
                d.points = void 0;
                return d
            }

            B(e, b);
            e.prototype.drawGraph = function () {
                this.areaPath = [];
                b.prototype.drawGraph.apply(this);
                var d = this, e = this.areaPath, g = this.options,
                    f = [["area", "highcharts-area", this.color, g.fillColor]];
                this.zones.forEach(function (e, b) {
                    f.push(["zone-area-" + b, "highcharts-area highcharts-zone-area-" + b + " " + e.className, e.color || d.color, e.fillColor || g.fillColor])
                });
                f.forEach(function (b) {
                    var f =
                        b[0], p = d[f], u = p ? "animate" : "attr", q = {};
                    p ? (p.endX = d.preventGraphAnimation ? null : e.xMap, p.animate({d: e})) : (q.zIndex = 0, p = d[f] = d.chart.renderer.path(e).addClass(b[1]).add(d.group), p.isArea = !0);
                    d.chart.styledMode || (q.fill = l(b[3], A(b[2]).setOpacity(l(g.fillOpacity, .75)).get()));
                    p[u](q);
                    p.startX = e.xMap;
                    p.shiftUnit = g.step ? 2 : 1
                })
            };
            e.prototype.getGraphPath = function (d) {
                var e = t.prototype.getGraphPath, b = this.options, g = b.stacking, f = this.yAxis, p, r = [], z = [],
                    q = this.index, m = f.stacking.stacks[this.stackKey], c = b.threshold,
                    n = Math.round(f.getThreshold(b.threshold));
                b = l(b.connectNulls, "percent" === g);
                var a = function (a, e, b) {
                    var k = d[a];
                    a = g && m[k.x].points[q];
                    var l = k[b + "Null"] || 0;
                    b = k[b + "Cliff"] || 0;
                    k = !0;
                    if (b || l) {
                        var p = (l ? a[0] : a[1]) + b;
                        var v = a[0] + b;
                        k = !!l
                    } else !g && d[e] && d[e].isNull && (p = v = c);
                    "undefined" !== typeof p && (z.push({
                        plotX: h,
                        plotY: null === p ? n : f.getThreshold(p),
                        isNull: k,
                        isCliff: !0
                    }), r.push({plotX: h, plotY: null === v ? n : f.getThreshold(v), doCurve: !1}))
                };
                d = d || this.points;
                g && (d = this.getStackPoints(d));
                for (p = 0; p < d.length; p++) {
                    g || (d[p].leftCliff =
                        d[p].rightCliff = d[p].leftNull = d[p].rightNull = void 0);
                    var k = d[p].isNull;
                    var h = l(d[p].rectPlotX, d[p].plotX);
                    var v = g ? l(d[p].yBottom, n) : n;
                    if (!k || b) b || a(p, p - 1, "left"), k && !g && b || (z.push(d[p]), r.push({
                        x: p,
                        plotX: h,
                        plotY: v
                    })), b || a(p, p + 1, "right")
                }
                p = e.call(this, z, !0, !0);
                r.reversed = !0;
                k = e.call(this, r, !0, !0);
                (v = k[0]) && "M" === v[0] && (k[0] = ["L", v[1], v[2]]);
                k = p.concat(k);
                k.length && k.push(["Z"]);
                e = e.call(this, z, !1, b);
                k.xMap = p.xMap;
                this.areaPath = k;
                return e
            };
            e.prototype.getStackPoints = function (d) {
                var e = this, b = [], g = [],
                    f = this.xAxis, r = this.yAxis, t = r.stacking.stacks[this.stackKey], z = {}, q = r.series,
                    m = q.length, c = r.options.reversedStacks ? 1 : -1, n = q.indexOf(e);
                d = d || this.points;
                if (this.options.stacking) {
                    for (var a = 0; a < d.length; a++) d[a].leftNull = d[a].rightNull = void 0, z[d[a].x] = d[a];
                    p(t, function (a, c) {
                        null !== a.total && g.push(c)
                    });
                    g.sort(function (a, c) {
                        return a - c
                    });
                    var k = q.map(function (a) {
                        return a.visible
                    });
                    g.forEach(function (a, d) {
                        var h = 0, p, v;
                        if (z[a] && !z[a].isNull) b.push(z[a]), [-1, 1].forEach(function (b) {
                            var h = 1 === b ? "rightNull" :
                                "leftNull", l = 0, f = t[g[d + b]];
                            if (f) for (var u = n; 0 <= u && u < m;) {
                                var r = q[u].index;
                                p = f.points[r];
                                p || (r === e.index ? z[a][h] = !0 : k[u] && (v = t[a].points[r]) && (l -= v[1] - v[0]));
                                u += c
                            }
                            z[a][1 === b ? "rightCliff" : "leftCliff"] = l
                        }); else {
                            for (var u = n; 0 <= u && u < m;) {
                                if (p = t[a].points[q[u].index]) {
                                    h = p[1];
                                    break
                                }
                                u += c
                            }
                            h = l(h, 0);
                            h = r.translate(h, 0, 1, 0, 1);
                            b.push({isNull: !0, plotX: f.translate(a, 0, 0, 0, 1), x: a, plotY: h, yBottom: h})
                        }
                    })
                }
                return b
            };
            e.defaultOptions = r(t.defaultOptions, {threshold: 0});
            return e
        }(t);
        b(y.prototype, {singleStacks: !1, drawLegendSymbol: f.drawRectangle});
        D.registerSeriesType("area", y);
        "";
        return y
    });
    J(b, "Series/Spline/SplineSeries.js", [b["Core/Series/SeriesRegistry.js"], b["Core/Utilities.js"]], function (b, f) {
        var B = this && this.__extends || function () {
            var b = function (f, p) {
                b = Object.setPrototypeOf || {__proto__: []} instanceof Array && function (b, g) {
                    b.__proto__ = g
                } || function (b, g) {
                    for (var e in g) g.hasOwnProperty(e) && (b[e] = g[e])
                };
                return b(f, p)
            };
            return function (f, p) {
                function l() {
                    this.constructor = f
                }

                b(f, p);
                f.prototype = null === p ? Object.create(p) : (l.prototype = p.prototype,
                    new l)
            }
        }(), y = b.seriesTypes.line, C = f.merge, A = f.pick;
        f = function (b) {
            function f() {
                var f = null !== b && b.apply(this, arguments) || this;
                f.data = void 0;
                f.options = void 0;
                f.points = void 0;
                return f
            }

            B(f, b);
            f.prototype.getPointSpline = function (b, f, g) {
                var e = f.plotX || 0, d = f.plotY || 0, l = b[g - 1];
                g = b[g + 1];
                if (l && !l.isNull && !1 !== l.doCurve && !f.isCliff && g && !g.isNull && !1 !== g.doCurve && !f.isCliff) {
                    b = l.plotY || 0;
                    var p = g.plotX || 0;
                    g = g.plotY || 0;
                    var r = 0;
                    var t = (1.5 * e + (l.plotX || 0)) / 2.5;
                    var B = (1.5 * d + b) / 2.5;
                    p = (1.5 * e + p) / 2.5;
                    var w = (1.5 * d + g) / 2.5;
                    p !== t && (r = (w - B) * (p - e) / (p - t) + d - w);
                    B += r;
                    w += r;
                    B > b && B > d ? (B = Math.max(b, d), w = 2 * d - B) : B < b && B < d && (B = Math.min(b, d), w = 2 * d - B);
                    w > g && w > d ? (w = Math.max(g, d), B = 2 * d - w) : w < g && w < d && (w = Math.min(g, d), B = 2 * d - w);
                    f.rightContX = p;
                    f.rightContY = w
                }
                f = ["C", A(l.rightContX, l.plotX, 0), A(l.rightContY, l.plotY, 0), A(t, e, 0), A(B, d, 0), e, d];
                l.rightContX = l.rightContY = void 0;
                return f
            };
            f.defaultOptions = C(y.defaultOptions);
            return f
        }(y);
        b.registerSeriesType("spline", f);
        "";
        return f
    });
    J(b, "Series/AreaSpline/AreaSplineSeries.js", [b["Series/Area/AreaSeries.js"],
        b["Series/Spline/SplineSeries.js"], b["Mixins/LegendSymbol.js"], b["Core/Series/SeriesRegistry.js"], b["Core/Utilities.js"]], function (b, f, D, y, C) {
        var B = this && this.__extends || function () {
            var b = function (g, e) {
                b = Object.setPrototypeOf || {__proto__: []} instanceof Array && function (d, e) {
                    d.__proto__ = e
                } || function (d, e) {
                    for (var b in e) e.hasOwnProperty(b) && (d[b] = e[b])
                };
                return b(g, e)
            };
            return function (g, e) {
                function d() {
                    this.constructor = g
                }

                b(g, e);
                g.prototype = null === e ? Object.create(e) : (d.prototype = e.prototype, new d)
            }
        }(), t =
            b.prototype, r = C.extend, p = C.merge;
        C = function (l) {
            function g() {
                var e = null !== l && l.apply(this, arguments) || this;
                e.data = void 0;
                e.points = void 0;
                e.options = void 0;
                return e
            }

            B(g, l);
            g.defaultOptions = p(f.defaultOptions, b.defaultOptions);
            return g
        }(f);
        r(C.prototype, {
            getGraphPath: t.getGraphPath,
            getStackPoints: t.getStackPoints,
            drawGraph: t.drawGraph,
            drawLegendSymbol: D.drawRectangle
        });
        y.registerSeriesType("areaspline", C);
        "";
        return C
    });
    J(b, "Series/Column/ColumnSeries.js", [b["Core/Animation/AnimationUtilities.js"], b["Core/Color/Color.js"],
        b["Core/Globals.js"], b["Mixins/LegendSymbol.js"], b["Core/Color/Palette.js"], b["Core/Series/Series.js"], b["Core/Series/SeriesRegistry.js"], b["Core/Utilities.js"]], function (b, f, D, y, C, A, t, r) {
        var p = this && this.__extends || function () {
            var c = function (d, a) {
                c = Object.setPrototypeOf || {__proto__: []} instanceof Array && function (a, c) {
                    a.__proto__ = c
                } || function (a, c) {
                    for (var d in c) c.hasOwnProperty(d) && (a[d] = c[d])
                };
                return c(d, a)
            };
            return function (d, a) {
                function e() {
                    this.constructor = d
                }

                c(d, a);
                d.prototype = null === a ? Object.create(a) :
                    (e.prototype = a.prototype, new e)
            }
        }(), l = b.animObject, g = f.parse, e = D.hasTouch;
        b = D.noop;
        var d = r.clamp, u = r.css, B = r.defined, I = r.extend, K = r.fireEvent, F = r.isArray, w = r.isNumber,
            z = r.merge, q = r.pick, m = r.objectEach;
        r = function (c) {
            function b() {
                var a = null !== c && c.apply(this, arguments) || this;
                a.borderWidth = void 0;
                a.data = void 0;
                a.group = void 0;
                a.options = void 0;
                a.points = void 0;
                return a
            }

            p(b, c);
            b.prototype.animate = function (a) {
                var c = this, e = this.yAxis, b = c.options, g = this.chart.inverted, m = {},
                    f = g ? "translateX" : "translateY";
                if (a) m.scaleY =
                    .001, a = d(e.toPixels(b.threshold), e.pos, e.pos + e.len), g ? m.translateX = a - e.len : m.translateY = a, c.clipBox && c.setClip(), c.group.attr(m); else {
                    var n = Number(c.group.attr(f));
                    c.group.animate({scaleY: 1}, I(l(c.options.animation), {
                        step: function (a, d) {
                            c.group && (m[f] = n + d.pos * (e.pos - n), c.group.attr(m))
                        }
                    }))
                }
            };
            b.prototype.init = function (a, d) {
                c.prototype.init.apply(this, arguments);
                var e = this;
                a = e.chart;
                a.hasRendered && a.series.forEach(function (a) {
                    a.type === e.type && (a.isDirty = !0)
                })
            };
            b.prototype.getColumnMetrics = function () {
                var a =
                    this, c = a.options, d = a.xAxis, e = a.yAxis, b = d.options.reversedStacks;
                b = d.reversed && !b || !d.reversed && b;
                var g, m = {}, f = 0;
                !1 === c.grouping ? f = 1 : a.chart.series.forEach(function (c) {
                    var d = c.yAxis, b = c.options;
                    if (c.type === a.type && (c.visible || !a.chart.options.chart.ignoreHiddenSeries) && e.len === d.len && e.pos === d.pos) {
                        if (b.stacking && "group" !== b.stacking) {
                            g = c.stackKey;
                            "undefined" === typeof m[g] && (m[g] = f++);
                            var h = m[g]
                        } else !1 !== b.grouping && (h = f++);
                        c.columnIndex = h
                    }
                });
                var l = Math.min(Math.abs(d.transA) * (d.ordinal && d.ordinal.slope ||
                    c.pointRange || d.closestPointRange || d.tickInterval || 1), d.len), n = l * c.groupPadding,
                    p = (l - 2 * n) / (f || 1);
                c = Math.min(c.maxPointWidth || d.len, q(c.pointWidth, p * (1 - 2 * c.pointPadding)));
                a.columnMetrics = {
                    width: c,
                    offset: (p - c) / 2 + (n + ((a.columnIndex || 0) + (b ? 1 : 0)) * p - l / 2) * (b ? -1 : 1),
                    paddedWidth: p,
                    columnCount: f
                };
                return a.columnMetrics
            };
            b.prototype.crispCol = function (a, c, d, e) {
                var b = this.chart, h = this.borderWidth, k = -(h % 2 ? .5 : 0);
                h = h % 2 ? .5 : 1;
                b.inverted && b.renderer.isVML && (h += 1);
                this.options.crisp && (d = Math.round(a + d) + k, a = Math.round(a) +
                    k, d -= a);
                e = Math.round(c + e) + h;
                k = .5 >= Math.abs(c) && .5 < e;
                c = Math.round(c) + h;
                e -= c;
                k && e && (--c, e += 1);
                return {x: a, y: c, width: d, height: e}
            };
            b.prototype.adjustForMissingColumns = function (a, c, d, e) {
                var b = this, h = this.options.stacking;
                if (!d.isNull && 1 < e.columnCount) {
                    var k = 0, g = 0;
                    m(this.yAxis.stacking && this.yAxis.stacking.stacks, function (a) {
                        if ("number" === typeof d.x && (a = a[d.x.toString()])) {
                            var c = a.points[b.index], e = a.total;
                            h ? (c && (k = g), a.hasValidPoints && g++) : F(c) && (k = c[1], g = e || 0)
                        }
                    });
                    a = (d.plotX || 0) + ((g - 1) * e.paddedWidth + c) /
                        2 - c - k * e.paddedWidth
                }
                return a
            };
            b.prototype.translate = function () {
                var a = this, c = a.chart, e = a.options, b = a.dense = 2 > a.closestPointRange * a.xAxis.transA;
                b = a.borderWidth = q(e.borderWidth, b ? 0 : 1);
                var g = a.xAxis, m = a.yAxis, f = e.threshold, l = a.translatedThreshold = m.getThreshold(f),
                    n = q(e.minPointLength, 5), p = a.getColumnMetrics(), u = p.width,
                    r = a.barW = Math.max(u, 1 + 2 * b), t = a.pointXOffset = p.offset, z = a.dataMin, C = a.dataMax;
                c.inverted && (l -= .5);
                e.pointPadding && (r = Math.ceil(r));
                A.prototype.translate.apply(a);
                a.points.forEach(function (b) {
                    var h =
                        q(b.yBottom, l), k = 999 + Math.abs(h), v = u, x = b.plotX || 0;
                    k = d(b.plotY, -k, m.len + k);
                    x += t;
                    var E = r, A = Math.min(k, h), y = Math.max(k, h) - A;
                    if (n && Math.abs(y) < n) {
                        y = n;
                        var H = !m.reversed && !b.negative || m.reversed && b.negative;
                        w(f) && w(C) && b.y === f && C <= f && (m.min || 0) < f && (z !== C || (m.max || 0) <= f) && (H = !H);
                        A = Math.abs(A - l) > n ? h - n : l - (H ? n : 0)
                    }
                    B(b.options.pointWidth) && (v = E = Math.ceil(b.options.pointWidth), x -= Math.round((v - u) / 2));
                    e.centerInCategory && (x = a.adjustForMissingColumns(x, v, b, p));
                    b.barX = x;
                    b.pointWidth = v;
                    b.tooltipPos = c.inverted ? [d(m.len +
                        m.pos - c.plotLeft - k, m.pos - c.plotLeft, m.len + m.pos - c.plotLeft), g.len + g.pos - c.plotTop - x - E / 2, y] : [g.left - c.plotLeft + x + E / 2, d(k + m.pos - c.plotTop, m.pos - c.plotTop, m.len + m.pos - c.plotTop), y];
                    b.shapeType = a.pointClass.prototype.shapeType || "rect";
                    b.shapeArgs = a.crispCol.apply(a, b.isNull ? [x, l, E, 0] : [x, A, E, y])
                })
            };
            b.prototype.drawGraph = function () {
                this.group[this.dense ? "addClass" : "removeClass"]("highcharts-dense-data")
            };
            b.prototype.pointAttribs = function (a, c) {
                var d = this.options, e = this.pointAttrToOptions || {};
                var b = e.stroke ||
                    "borderColor";
                var k = e["stroke-width"] || "borderWidth", m = a && a.color || this.color, f = a && a[b] || d[b] || m,
                    l = a && a[k] || d[k] || this[k] || 0;
                e = a && a.options.dashStyle || d.dashStyle;
                var n = q(a && a.opacity, d.opacity, 1);
                if (a && this.zones.length) {
                    var p = a.getZone();
                    m = a.options.color || p && (p.color || a.nonZonedColor) || this.color;
                    p && (f = p.borderColor || f, e = p.dashStyle || e, l = p.borderWidth || l)
                }
                c && a && (a = z(d.states[c], a.options.states && a.options.states[c] || {}), c = a.brightness, m = a.color || "undefined" !== typeof c && g(m).brighten(a.brightness).get() ||
                    m, f = a[b] || f, l = a[k] || l, e = a.dashStyle || e, n = q(a.opacity, n));
                b = {fill: m, stroke: f, "stroke-width": l, opacity: n};
                e && (b.dashstyle = e);
                return b
            };
            b.prototype.drawPoints = function () {
                var a = this, c = this.chart, d = a.options, e = c.renderer, b = d.animationLimit || 250, g;
                a.points.forEach(function (h) {
                    var k = h.graphic, m = !!k, f = k && c.pointCount < b ? "animate" : "attr";
                    if (w(h.plotY) && null !== h.y) {
                        g = h.shapeArgs;
                        k && h.hasNewShapeType() && (k = k.destroy());
                        a.enabledDataSorting && (h.startXPos = a.xAxis.reversed ? -(g ? g.width || 0 : 0) : a.xAxis.width);
                        k || (h.graphic =
                            k = e[h.shapeType](g).add(h.group || a.group)) && a.enabledDataSorting && c.hasRendered && c.pointCount < b && (k.attr({x: h.startXPos}), m = !0, f = "animate");
                        if (k && m) k[f](z(g));
                        if (d.borderRadius) k[f]({r: d.borderRadius});
                        c.styledMode || k[f](a.pointAttribs(h, h.selected && "select")).shadow(!1 !== h.allowShadow && d.shadow, null, d.stacking && !d.borderRadius);
                        k && (k.addClass(h.getClassName(), !0), k.attr({visibility: h.visible ? "inherit" : "hidden"}))
                    } else k && (h.graphic = k.destroy())
                })
            };
            b.prototype.drawTracker = function () {
                var a = this, c =
                    a.chart, d = c.pointer, b = function (a) {
                    var c = d.getPointFromEvent(a);
                    "undefined" !== typeof c && (d.isDirectTouch = !0, c.onMouseOver(a))
                }, g;
                a.points.forEach(function (a) {
                    g = F(a.dataLabels) ? a.dataLabels : a.dataLabel ? [a.dataLabel] : [];
                    a.graphic && (a.graphic.element.point = a);
                    g.forEach(function (c) {
                        c.div ? c.div.point = a : c.element.point = a
                    })
                });
                a._hasTracking || (a.trackerGroups.forEach(function (h) {
                    if (a[h]) {
                        a[h].addClass("highcharts-tracker").on("mouseover", b).on("mouseout", function (a) {
                            d.onTrackerMouseOut(a)
                        });
                        if (e) a[h].on("touchstart",
                            b);
                        !c.styledMode && a.options.cursor && a[h].css(u).css({cursor: a.options.cursor})
                    }
                }), a._hasTracking = !0);
                K(this, "afterDrawTracker")
            };
            b.prototype.remove = function () {
                var a = this, c = a.chart;
                c.hasRendered && c.series.forEach(function (c) {
                    c.type === a.type && (c.isDirty = !0)
                });
                A.prototype.remove.apply(a, arguments)
            };
            b.defaultOptions = z(A.defaultOptions, {
                borderRadius: 0,
                centerInCategory: !1,
                groupPadding: .2,
                marker: null,
                pointPadding: .1,
                minPointLength: 0,
                cropThreshold: 50,
                pointRange: null,
                states: {
                    hover: {halo: !1, brightness: .1},
                    select: {color: C.neutralColor20, borderColor: C.neutralColor100}
                },
                dataLabels: {align: void 0, verticalAlign: void 0, y: void 0},
                startFromThreshold: !0,
                stickyTracking: !1,
                tooltip: {distance: 6},
                threshold: 0,
                borderColor: C.backgroundColor
            });
            return b
        }(A);
        I(r.prototype, {
            cropShoulder: 0,
            directTouch: !0,
            drawLegendSymbol: y.drawRectangle,
            getSymbol: b,
            negStacks: !0,
            trackerGroups: ["group", "dataLabelsGroup"]
        });
        t.registerSeriesType("column", r);
        "";
        "";
        return r
    });
    J(b, "Series/Bar/BarSeries.js", [b["Series/Column/ColumnSeries.js"], b["Core/Series/SeriesRegistry.js"],
        b["Core/Utilities.js"]], function (b, f, D) {
        var B = this && this.__extends || function () {
            var b = function (f, p) {
                b = Object.setPrototypeOf || {__proto__: []} instanceof Array && function (b, g) {
                    b.__proto__ = g
                } || function (b, g) {
                    for (var e in g) g.hasOwnProperty(e) && (b[e] = g[e])
                };
                return b(f, p)
            };
            return function (f, p) {
                function l() {
                    this.constructor = f
                }

                b(f, p);
                f.prototype = null === p ? Object.create(p) : (l.prototype = p.prototype, new l)
            }
        }(), C = D.extend, A = D.merge;
        D = function (f) {
            function r() {
                var b = null !== f && f.apply(this, arguments) || this;
                b.data = void 0;
                b.options = void 0;
                b.points = void 0;
                return b
            }

            B(r, f);
            r.defaultOptions = A(b.defaultOptions, {});
            return r
        }(b);
        C(D.prototype, {inverted: !0});
        f.registerSeriesType("bar", D);
        "";
        return D
    });
    J(b, "Series/Scatter/ScatterSeries.js", [b["Series/Column/ColumnSeries.js"], b["Series/Line/LineSeries.js"], b["Core/Series/SeriesRegistry.js"], b["Core/Utilities.js"]], function (b, f, D, y) {
        var B = this && this.__extends || function () {
            var b = function (f, g) {
                b = Object.setPrototypeOf || {__proto__: []} instanceof Array && function (e, d) {
                        e.__proto__ = d
                    } ||
                    function (e, d) {
                        for (var b in d) d.hasOwnProperty(b) && (e[b] = d[b])
                    };
                return b(f, g)
            };
            return function (f, g) {
                function e() {
                    this.constructor = f
                }

                b(f, g);
                f.prototype = null === g ? Object.create(g) : (e.prototype = g.prototype, new e)
            }
        }(), A = y.addEvent, t = y.extend, r = y.merge;
        y = function (b) {
            function l() {
                var g = null !== b && b.apply(this, arguments) || this;
                g.data = void 0;
                g.options = void 0;
                g.points = void 0;
                return g
            }

            B(l, b);
            l.prototype.applyJitter = function () {
                var b = this, e = this.options.jitter, d = this.points.length;
                e && this.points.forEach(function (g,
                                                   f) {
                    ["x", "y"].forEach(function (l, p) {
                        var u = "plot" + l.toUpperCase();
                        if (e[l] && !g.isNull) {
                            var r = b[l + "Axis"];
                            var t = e[l] * r.transA;
                            if (r && !r.isLog) {
                                var q = Math.max(0, g[u] - t);
                                r = Math.min(r.len, g[u] + t);
                                p = 1E4 * Math.sin(f + p * d);
                                g[u] = q + (r - q) * (p - Math.floor(p));
                                "x" === l && (g.clientX = g.plotX)
                            }
                        }
                    })
                })
            };
            l.prototype.drawGraph = function () {
                (this.options.lineWidth || 0 === this.options.lineWidth && this.graph && this.graph.strokeWidth()) && b.prototype.drawGraph.call(this)
            };
            l.defaultOptions = r(f.defaultOptions, {
                lineWidth: 0,
                findNearestPointBy: "xy",
                jitter: {x: 0, y: 0},
                marker: {enabled: !0},
                tooltip: {
                    headerFormat: '<span style="color:{point.color}">\u25cf</span> <span style="font-size: 10px"> {series.name}</span><br/>',
                    pointFormat: "x: <b>{point.x}</b><br/>y: <b>{point.y}</b><br/>"
                }
            });
            return l
        }(f);
        t(y.prototype, {
            drawTracker: b.prototype.drawTracker,
            sorted: !1,
            requireSorting: !1,
            noSharedTooltip: !0,
            trackerGroups: ["group", "markerGroup", "dataLabelsGroup"],
            takeOrdinalPosition: !1
        });
        A(y, "afterTranslate", function () {
            this.applyJitter()
        });
        D.registerSeriesType("scatter",
            y);
        "";
        return y
    });
    J(b, "Mixins/CenteredSeries.js", [b["Core/Globals.js"], b["Core/Series/Series.js"], b["Core/Utilities.js"]], function (b, f, D) {
        var B = D.isNumber, C = D.pick, A = D.relativeLength, t = b.deg2rad;
        return b.CenteredSeriesMixin = {
            getCenter: function () {
                var b = this.options, p = this.chart, l = 2 * (b.slicedOffset || 0), g = p.plotWidth - 2 * l,
                    e = p.plotHeight - 2 * l, d = b.center, u = Math.min(g, e), t = b.size, B = b.innerSize || 0;
                "string" === typeof t && (t = parseFloat(t));
                "string" === typeof B && (B = parseFloat(B));
                b = [C(d[0], "50%"), C(d[1], "50%"), C(t &&
                0 > t ? void 0 : b.size, "100%"), C(B && 0 > B ? void 0 : b.innerSize || 0, "0%")];
                !p.angular || this instanceof f || (b[3] = 0);
                for (d = 0; 4 > d; ++d) t = b[d], p = 2 > d || 2 === d && /%$/.test(t), b[d] = A(t, [g, e, u, b[2]][d]) + (p ? l : 0);
                b[3] > b[2] && (b[3] = b[2]);
                return b
            }, getStartAndEndRadians: function (b, f) {
                b = B(b) ? b : 0;
                f = B(f) && f > b && 360 > f - b ? f : b + 360;
                return {start: t * (b + -90), end: t * (f + -90)}
            }
        }
    });
    J(b, "Series/Pie/PiePoint.js", [b["Core/Animation/AnimationUtilities.js"], b["Core/Series/Point.js"], b["Core/Utilities.js"]], function (b, f, D) {
        var B = this && this.__extends ||
            function () {
                var b = function (e, d) {
                    b = Object.setPrototypeOf || {__proto__: []} instanceof Array && function (d, e) {
                        d.__proto__ = e
                    } || function (d, e) {
                        for (var b in e) e.hasOwnProperty(b) && (d[b] = e[b])
                    };
                    return b(e, d)
                };
                return function (e, d) {
                    function g() {
                        this.constructor = e
                    }

                    b(e, d);
                    e.prototype = null === d ? Object.create(d) : (g.prototype = d.prototype, new g)
                }
            }(), C = b.setAnimation, A = D.addEvent, t = D.defined;
        b = D.extend;
        var r = D.isNumber, p = D.pick, l = D.relativeLength;
        D = function (b) {
            function e() {
                var d = null !== b && b.apply(this, arguments) || this;
                d.labelDistance = void 0;
                d.options = void 0;
                d.series = void 0;
                return d
            }

            B(e, b);
            e.prototype.getConnectorPath = function () {
                var d = this.labelPosition, e = this.series.options.dataLabels, b = e.connectorShape,
                    g = this.connectorShapes;
                g[b] && (b = g[b]);
                return b.call(this, {x: d.final.x, y: d.final.y, alignment: d.alignment}, d.connectorPosition, e)
            };
            e.prototype.getTranslate = function () {
                return this.sliced ? this.slicedTranslation : {translateX: 0, translateY: 0}
            };
            e.prototype.haloPath = function (d) {
                var e = this.shapeArgs;
                return this.sliced || !this.visible ?
                    [] : this.series.chart.renderer.symbols.arc(e.x, e.y, e.r + d, e.r + d, {
                        innerR: e.r - 1,
                        start: e.start,
                        end: e.end
                    })
            };
            e.prototype.init = function () {
                f.prototype.init.apply(this, arguments);
                var d = this;
                d.name = p(d.name, "Slice");
                var e = function (e) {
                    d.slice("select" === e.type)
                };
                A(d, "select", e);
                A(d, "unselect", e);
                return d
            };
            e.prototype.isValid = function () {
                return r(this.y) && 0 <= this.y
            };
            e.prototype.setVisible = function (d, e) {
                var b = this, g = b.series, f = g.chart, l = g.options.ignoreHiddenPoint;
                e = p(e, l);
                d !== b.visible && (b.visible = b.options.visible =
                    d = "undefined" === typeof d ? !b.visible : d, g.options.data[g.data.indexOf(b)] = b.options, ["graphic", "dataLabel", "connector", "shadowGroup"].forEach(function (e) {
                    if (b[e]) b[e][d ? "show" : "hide"](d)
                }), b.legendItem && f.legend.colorizeItem(b, d), d || "hover" !== b.state || b.setState(""), l && (g.isDirty = !0), e && f.redraw())
            };
            e.prototype.slice = function (d, e, b) {
                var g = this.series;
                C(b, g.chart);
                p(e, !0);
                this.sliced = this.options.sliced = t(d) ? d : !this.sliced;
                g.options.data[g.data.indexOf(this)] = this.options;
                this.graphic && this.graphic.animate(this.getTranslate());
                this.shadowGroup && this.shadowGroup.animate(this.getTranslate())
            };
            return e
        }(f);
        b(D.prototype, {
            connectorShapes: {
                fixedOffset: function (b, e, d) {
                    var g = e.breakAt;
                    e = e.touchingSliceAt;
                    return [["M", b.x, b.y], d.softConnector ? ["C", b.x + ("left" === b.alignment ? -5 : 5), b.y, 2 * g.x - e.x, 2 * g.y - e.y, g.x, g.y] : ["L", g.x, g.y], ["L", e.x, e.y]]
                }, straight: function (b, e) {
                    e = e.touchingSliceAt;
                    return [["M", b.x, b.y], ["L", e.x, e.y]]
                }, crookedLine: function (b, e, d) {
                    e = e.touchingSliceAt;
                    var g = this.series, f = g.center[0], p = g.chart.plotWidth, r = g.chart.plotLeft;
                    g = b.alignment;
                    var t = this.shapeArgs.r;
                    d = l(d.crookDistance, 1);
                    p = "left" === g ? f + t + (p + r - f - t) * (1 - d) : r + (f - t) * d;
                    d = ["L", p, b.y];
                    f = !0;
                    if ("left" === g ? p > b.x || p < e.x : p < b.x || p > e.x) f = !1;
                    b = [["M", b.x, b.y]];
                    f && b.push(d);
                    b.push(["L", e.x, e.y]);
                    return b
                }
            }
        });
        return D
    });
    J(b, "Series/Pie/PieSeries.js", [b["Mixins/CenteredSeries.js"], b["Series/Column/ColumnSeries.js"], b["Core/Globals.js"], b["Mixins/LegendSymbol.js"], b["Core/Color/Palette.js"], b["Series/Pie/PiePoint.js"], b["Core/Series/Series.js"], b["Core/Series/SeriesRegistry.js"],
        b["Core/Renderer/SVG/SVGRenderer.js"], b["Core/Utilities.js"]], function (b, f, D, y, C, A, t, r, p, l) {
        var g = this && this.__extends || function () {
            var d = function (b, e) {
                d = Object.setPrototypeOf || {__proto__: []} instanceof Array && function (d, c) {
                    d.__proto__ = c
                } || function (d, c) {
                    for (var b in c) c.hasOwnProperty(b) && (d[b] = c[b])
                };
                return d(b, e)
            };
            return function (b, e) {
                function g() {
                    this.constructor = b
                }

                d(b, e);
                b.prototype = null === e ? Object.create(e) : (g.prototype = e.prototype, new g)
            }
        }(), e = b.getStartAndEndRadians;
        D = D.noop;
        var d = l.clamp, u =
            l.extend, B = l.fireEvent, I = l.merge, K = l.pick, F = l.relativeLength;
        l = function (b) {
            function f() {
                var d = null !== b && b.apply(this, arguments) || this;
                d.center = void 0;
                d.data = void 0;
                d.maxLabelDistance = void 0;
                d.options = void 0;
                d.points = void 0;
                return d
            }

            g(f, b);
            f.prototype.animate = function (d) {
                var b = this, c = b.points, e = b.startAngleRad;
                d || c.forEach(function (a) {
                    var c = a.graphic, d = a.shapeArgs;
                    c && d && (c.attr({
                        r: K(a.startR, b.center && b.center[3] / 2),
                        start: e,
                        end: e
                    }), c.animate({r: d.r, start: d.start, end: d.end}, b.options.animation))
                })
            };
            f.prototype.drawEmpty = function () {
                var d = this.startAngleRad, b = this.endAngleRad, c = this.options;
                if (0 === this.total && this.center) {
                    var e = this.center[0];
                    var a = this.center[1];
                    this.graph || (this.graph = this.chart.renderer.arc(e, a, this.center[1] / 2, 0, d, b).addClass("highcharts-empty-series").add(this.group));
                    this.graph.attr({
                        d: p.prototype.symbols.arc(e, a, this.center[2] / 2, 0, {
                            start: d,
                            end: b,
                            innerR: this.center[3] / 2
                        })
                    });
                    this.chart.styledMode || this.graph.attr({
                        "stroke-width": c.borderWidth, fill: c.fillColor || "none", stroke: c.color ||
                            C.neutralColor20
                    })
                } else this.graph && (this.graph = this.graph.destroy())
            };
            f.prototype.drawPoints = function () {
                var d = this.chart.renderer;
                this.points.forEach(function (b) {
                    b.graphic && b.hasNewShapeType() && (b.graphic = b.graphic.destroy());
                    b.graphic || (b.graphic = d[b.shapeType](b.shapeArgs).add(b.series.group), b.delayedRendering = !0)
                })
            };
            f.prototype.generatePoints = function () {
                b.prototype.generatePoints.call(this);
                this.updateTotals()
            };
            f.prototype.getX = function (b, e, c) {
                var g = this.center, a = this.radii ? this.radii[c.index] ||
                    0 : g[2] / 2;
                b = Math.asin(d((b - g[1]) / (a + c.labelDistance), -1, 1));
                return g[0] + (e ? -1 : 1) * Math.cos(b) * (a + c.labelDistance) + (0 < c.labelDistance ? (e ? -1 : 1) * this.options.dataLabels.padding : 0)
            };
            f.prototype.hasData = function () {
                return !!this.processedXData.length
            };
            f.prototype.redrawPoints = function () {
                var d = this, b = d.chart, c = b.renderer, e, a, k, h, g = d.options.shadow;
                this.drawEmpty();
                !g || d.shadowGroup || b.styledMode || (d.shadowGroup = c.g("shadow").attr({zIndex: -1}).add(d.group));
                d.points.forEach(function (m) {
                    var f = {};
                    a = m.graphic;
                    if (!m.isNull && a) {
                        var l = void 0;
                        h = m.shapeArgs;
                        e = m.getTranslate();
                        b.styledMode || (l = m.shadowGroup, g && !l && (l = m.shadowGroup = c.g("shadow").add(d.shadowGroup)), l && l.attr(e), k = d.pointAttribs(m, m.selected && "select"));
                        m.delayedRendering ? (a.setRadialReference(d.center).attr(h).attr(e), b.styledMode || a.attr(k).attr({"stroke-linejoin": "round"}).shadow(g, l), m.delayedRendering = !1) : (a.setRadialReference(d.center), b.styledMode || I(!0, f, k), I(!0, f, h, e), a.animate(f));
                        a.attr({visibility: m.visible ? "inherit" : "hidden"});
                        a.addClass(m.getClassName(),
                            !0)
                    } else a && (m.graphic = a.destroy())
                })
            };
            f.prototype.sortByAngle = function (d, b) {
                d.sort(function (c, d) {
                    return "undefined" !== typeof c.angle && (d.angle - c.angle) * b
                })
            };
            f.prototype.translate = function (d) {
                this.generatePoints();
                var b = 0, c = this.options, g = c.slicedOffset, a = g + (c.borderWidth || 0),
                    k = e(c.startAngle, c.endAngle), h = this.startAngleRad = k.start;
                k = (this.endAngleRad = k.end) - h;
                var f = this.points, l = c.dataLabels.distance;
                c = c.ignoreHiddenPoint;
                var p, q = f.length;
                d || (this.center = d = this.getCenter());
                for (p = 0; p < q; p++) {
                    var r =
                        f[p];
                    var u = h + b * k;
                    !r.isValid() || c && !r.visible || (b += r.percentage / 100);
                    var t = h + b * k;
                    var z = {
                        x: d[0],
                        y: d[1],
                        r: d[2] / 2,
                        innerR: d[3] / 2,
                        start: Math.round(1E3 * u) / 1E3,
                        end: Math.round(1E3 * t) / 1E3
                    };
                    r.shapeType = "arc";
                    r.shapeArgs = z;
                    r.labelDistance = K(r.options.dataLabels && r.options.dataLabels.distance, l);
                    r.labelDistance = F(r.labelDistance, z.r);
                    this.maxLabelDistance = Math.max(this.maxLabelDistance || 0, r.labelDistance);
                    t = (t + u) / 2;
                    t > 1.5 * Math.PI ? t -= 2 * Math.PI : t < -Math.PI / 2 && (t += 2 * Math.PI);
                    r.slicedTranslation = {
                        translateX: Math.round(Math.cos(t) *
                            g), translateY: Math.round(Math.sin(t) * g)
                    };
                    z = Math.cos(t) * d[2] / 2;
                    var w = Math.sin(t) * d[2] / 2;
                    r.tooltipPos = [d[0] + .7 * z, d[1] + .7 * w];
                    r.half = t < -Math.PI / 2 || t > Math.PI / 2 ? 1 : 0;
                    r.angle = t;
                    u = Math.min(a, r.labelDistance / 5);
                    r.labelPosition = {
                        natural: {
                            x: d[0] + z + Math.cos(t) * r.labelDistance,
                            y: d[1] + w + Math.sin(t) * r.labelDistance
                        },
                        "final": {},
                        alignment: 0 > r.labelDistance ? "center" : r.half ? "right" : "left",
                        connectorPosition: {
                            breakAt: {x: d[0] + z + Math.cos(t) * u, y: d[1] + w + Math.sin(t) * u},
                            touchingSliceAt: {x: d[0] + z, y: d[1] + w}
                        }
                    }
                }
                B(this, "afterTranslate")
            };
            f.prototype.updateTotals = function () {
                var d, b = 0, c = this.points, e = c.length, a = this.options.ignoreHiddenPoint;
                for (d = 0; d < e; d++) {
                    var k = c[d];
                    !k.isValid() || a && !k.visible || (b += k.y)
                }
                this.total = b;
                for (d = 0; d < e; d++) k = c[d], k.percentage = 0 < b && (k.visible || !a) ? k.y / b * 100 : 0, k.total = b
            };
            f.defaultOptions = I(t.defaultOptions, {
                center: [null, null],
                clip: !1,
                colorByPoint: !0,
                dataLabels: {
                    allowOverlap: !0,
                    connectorPadding: 5,
                    connectorShape: "fixedOffset",
                    crookDistance: "70%",
                    distance: 30,
                    enabled: !0,
                    formatter: function () {
                        return this.point.isNull ?
                            void 0 : this.point.name
                    },
                    softConnector: !0,
                    x: 0
                },
                fillColor: void 0,
                ignoreHiddenPoint: !0,
                inactiveOtherPoints: !0,
                legendType: "point",
                marker: null,
                size: null,
                showInLegend: !1,
                slicedOffset: 10,
                stickyTracking: !1,
                tooltip: {followPointer: !0},
                borderColor: C.backgroundColor,
                borderWidth: 1,
                lineWidth: void 0,
                states: {hover: {brightness: .1}}
            });
            return f
        }(t);
        u(l.prototype, {
            axisTypes: [],
            directTouch: !0,
            drawGraph: void 0,
            drawLegendSymbol: y.drawRectangle,
            drawTracker: f.prototype.drawTracker,
            getCenter: b.getCenter,
            getSymbol: D,
            isCartesian: !1,
            noSharedTooltip: !0,
            pointAttribs: f.prototype.pointAttribs,
            pointClass: A,
            requireSorting: !1,
            searchPoint: D,
            trackerGroups: ["group", "dataLabelsGroup"]
        });
        r.registerSeriesType("pie", l);
        "";
        return l
    });
    J(b, "Core/Series/DataLabels.js", [b["Core/Animation/AnimationUtilities.js"], b["Core/FormatUtilities.js"], b["Core/Globals.js"], b["Core/Color/Palette.js"], b["Core/Series/Series.js"], b["Core/Series/SeriesRegistry.js"], b["Core/Utilities.js"]], function (b, f, D, y, C, A, t) {
        var r = b.getDeferredAnimation, p = f.format;
        b = D.noop;
        A = A.seriesTypes;
        var l = t.arrayMax, g = t.clamp, e = t.defined, d = t.extend, u = t.fireEvent, B = t.isArray, I = t.merge,
            K = t.objectEach, F = t.pick, w = t.relativeLength, z = t.splat, q = t.stableSort;
        "";
        D.distribute = function (d, c, b) {
            function a(a, c) {
                return a.target - c.target
            }

            var e, h = !0, f = d, m = [];
            var l = 0;
            var n = f.reducedLen || c;
            for (e = d.length; e--;) l += d[e].size;
            if (l > n) {
                q(d, function (a, c) {
                    return (c.rank || 0) - (a.rank || 0)
                });
                for (l = e = 0; l <= n;) l += d[e].size, e++;
                m = d.splice(e - 1, d.length)
            }
            q(d, a);
            for (d = d.map(function (a) {
                return {
                    size: a.size, targets: [a.target],
                    align: F(a.align, .5)
                }
            }); h;) {
                for (e = d.length; e--;) h = d[e], l = (Math.min.apply(0, h.targets) + Math.max.apply(0, h.targets)) / 2, h.pos = g(l - h.size * h.align, 0, c - h.size);
                e = d.length;
                for (h = !1; e--;) 0 < e && d[e - 1].pos + d[e - 1].size > d[e].pos && (d[e - 1].size += d[e].size, d[e - 1].targets = d[e - 1].targets.concat(d[e].targets), d[e - 1].align = .5, d[e - 1].pos + d[e - 1].size > c && (d[e - 1].pos = c - d[e - 1].size), d.splice(e, 1), h = !0)
            }
            f.push.apply(f, m);
            e = 0;
            d.some(function (a) {
                var d = 0;
                if (a.targets.some(function () {
                    f[e].pos = a.pos + d;
                    if ("undefined" !== typeof b &&
                        Math.abs(f[e].pos - f[e].target) > b) return f.slice(0, e + 1).forEach(function (a) {
                        delete a.pos
                    }), f.reducedLen = (f.reducedLen || c) - .1 * c, f.reducedLen > .1 * c && D.distribute(f, c, b), !0;
                    d += f[e].size;
                    e++
                })) return !0
            });
            q(f, a)
        };
        C.prototype.drawDataLabels = function () {
            function d(a, c) {
                var d = c.filter;
                return d ? (c = d.operator, a = a[d.property], d = d.value, ">" === c && a > d || "<" === c && a < d || ">=" === c && a >= d || "<=" === c && a <= d || "==" === c && a == d || "===" === c && a === d ? !0 : !1) : !0
            }

            function c(a, c) {
                var d = [], b;
                if (B(a) && !B(c)) d = a.map(function (a) {
                    return I(a, c)
                });
                else if (B(c) && !B(a)) d = c.map(function (c) {
                    return I(a, c)
                }); else if (B(a) || B(c)) for (b = Math.max(a.length, c.length); b--;) d[b] = I(a[b], c[b]); else d = I(a, c);
                return d
            }

            var b = this, a = b.chart, k = b.options, h = k.dataLabels, g = b.points, f, l = b.hasRendered || 0,
                q = h.animation;
            q = h.defer ? r(a, q, b) : {defer: 0, duration: 0};
            var t = a.renderer;
            h = c(c(a.options.plotOptions && a.options.plotOptions.series && a.options.plotOptions.series.dataLabels, a.options.plotOptions && a.options.plotOptions[b.type] && a.options.plotOptions[b.type].dataLabels),
                h);
            u(this, "drawDataLabels");
            if (B(h) || h.enabled || b._hasPointLabels) {
                var w = b.plotGroup("dataLabelsGroup", "data-labels", l ? "inherit" : "hidden", h.zIndex || 6);
                w.attr({opacity: +l});
                !l && (l = b.dataLabelsGroup) && (b.visible && w.show(!0), l[k.animation ? "animate" : "attr"]({opacity: 1}, q));
                g.forEach(function (g) {
                    f = z(c(h, g.dlOptions || g.options && g.options.dataLabels));
                    f.forEach(function (c, h) {
                        var f = c.enabled && (!g.isNull || g.dataLabelOnNull) && d(g, c),
                            m = g.dataLabels ? g.dataLabels[h] : g.dataLabel, l = g.connectors ? g.connectors[h] :
                            g.connector, n = F(c.distance, g.labelDistance), q = !m;
                        if (f) {
                            var v = g.getLabelConfig();
                            var r = F(c[g.formatPrefix + "Format"], c.format);
                            v = e(r) ? p(r, v, a) : (c[g.formatPrefix + "Formatter"] || c.formatter).call(v, c);
                            r = c.style;
                            var u = c.rotation;
                            a.styledMode || (r.color = F(c.color, r.color, b.color, y.neutralColor100), "contrast" === r.color ? (g.contrastColor = t.getContrast(g.color || b.color), r.color = !e(n) && c.inside || 0 > n || k.stacking ? g.contrastColor : y.neutralColor100) : delete g.contrastColor, k.cursor && (r.cursor = k.cursor));
                            var z = {
                                r: c.borderRadius ||
                                    0, rotation: u, padding: c.padding, zIndex: 1
                            };
                            a.styledMode || (z.fill = c.backgroundColor, z.stroke = c.borderColor, z["stroke-width"] = c.borderWidth);
                            K(z, function (a, c) {
                                "undefined" === typeof a && delete z[c]
                            })
                        }
                        !m || f && e(v) ? f && e(v) && (m ? z.text = v : (g.dataLabels = g.dataLabels || [], m = g.dataLabels[h] = u ? t.text(v, 0, -9999, c.useHTML).addClass("highcharts-data-label") : t.label(v, 0, -9999, c.shape, null, null, c.useHTML, null, "data-label"), h || (g.dataLabel = m), m.addClass(" highcharts-data-label-color-" + g.colorIndex + " " + (c.className || "") +
                            (c.useHTML ? " highcharts-tracker" : ""))), m.options = c, m.attr(z), a.styledMode || m.css(r).shadow(c.shadow), m.added || m.add(w), c.textPath && !c.useHTML && (m.setTextPath(g.getDataLabelPath && g.getDataLabelPath(m) || g.graphic, c.textPath), g.dataLabelPath && !c.textPath.enabled && (g.dataLabelPath = g.dataLabelPath.destroy())), b.alignDataLabel(g, m, c, null, q)) : (g.dataLabel = g.dataLabel && g.dataLabel.destroy(), g.dataLabels && (1 === g.dataLabels.length ? delete g.dataLabels : delete g.dataLabels[h]), h || delete g.dataLabel, l && (g.connector =
                            g.connector.destroy(), g.connectors && (1 === g.connectors.length ? delete g.connectors : delete g.connectors[h])))
                    })
                })
            }
            u(this, "afterDrawDataLabels")
        };
        C.prototype.alignDataLabel = function (b, c, e, a, g) {
            var h = this, k = this.chart, f = this.isCartesian && k.inverted, m = this.enabledDataSorting,
                l = F(b.dlBox && b.dlBox.centerX, b.plotX, -9999), n = F(b.plotY, -9999), p = c.getBBox(),
                q = e.rotation, r = e.align,
                u = k.isInsidePlot(l, Math.round(n), {inverted: f, paneCoordinates: !0, series: h}),
                t = "justify" === F(e.overflow, m ? "none" : "justify"), z = this.visible &&
                !1 !== b.visible && (b.series.forceDL || m && !t || u || F(e.inside, !!this.options.stacking) && a && k.isInsidePlot(l, f ? a.x + 1 : a.y + a.height - 1, {
                    inverted: f,
                    paneCoordinates: !0,
                    series: h
                }));
            var w = function (a) {
                m && h.xAxis && !t && h.setDataLabelStartPos(b, c, g, u, a)
            };
            if (z) {
                var B = k.renderer.fontMetrics(k.styledMode ? void 0 : e.style.fontSize, c).b;
                a = d({
                    x: f ? this.yAxis.len - n : l,
                    y: Math.round(f ? this.xAxis.len - l : n),
                    width: 0,
                    height: 0
                }, a);
                d(e, {width: p.width, height: p.height});
                q ? (t = !1, l = k.renderer.rotCorr(B, q), l = {
                    x: a.x + (e.x || 0) + a.width / 2 + l.x,
                    y: a.y + (e.y || 0) + {top: 0, middle: .5, bottom: 1}[e.verticalAlign] * a.height
                }, w(l), c[g ? "attr" : "animate"](l).attr({align: r}), w = (q + 720) % 360, w = 180 < w && 360 > w, "left" === r ? l.y -= w ? p.height : 0 : "center" === r ? (l.x -= p.width / 2, l.y -= p.height / 2) : "right" === r && (l.x -= p.width, l.y -= w ? 0 : p.height), c.placed = !0, c.alignAttr = l) : (w(a), c.align(e, void 0, a), l = c.alignAttr);
                t && 0 <= a.height ? this.justifyDataLabel(c, e, l, p, a, g) : F(e.crop, !0) && (z = k.isInsidePlot(l.x, l.y, {
                    paneCoordinates: !0,
                    series: h
                }) && k.isInsidePlot(l.x + p.width, l.y + p.height, {
                    paneCoordinates: !0,
                    series: h
                }));
                if (e.shape && !q) c[g ? "attr" : "animate"]({
                    anchorX: f ? k.plotWidth - b.plotY : b.plotX,
                    anchorY: f ? k.plotHeight - b.plotX : b.plotY
                })
            }
            g && m && (c.placed = !1);
            z || m && !t || (c.hide(!0), c.placed = !1)
        };
        C.prototype.setDataLabelStartPos = function (d, c, b, a, e) {
            var h = this.chart, g = h.inverted, k = this.xAxis, f = k.reversed, m = g ? c.height / 2 : c.width / 2;
            d = (d = d.pointWidth) ? d / 2 : 0;
            k = g ? e.x : f ? -m - d : k.width - m + d;
            e = g ? f ? this.yAxis.height - m + d : -m - d : e.y;
            c.startXPos = k;
            c.startYPos = e;
            a ? "hidden" === c.visibility && (c.show(), c.attr({opacity: 0}).animate({opacity: 1})) :
                c.attr({opacity: 1}).animate({opacity: 0}, void 0, c.hide);
            h.hasRendered && (b && c.attr({x: c.startXPos, y: c.startYPos}), c.placed = !0)
        };
        C.prototype.justifyDataLabel = function (d, c, b, a, e, h) {
            var g = this.chart, k = c.align, f = c.verticalAlign, m = d.box ? 0 : d.padding || 0, l = c.x;
            l = void 0 === l ? 0 : l;
            var n = c.y;
            var p = void 0 === n ? 0 : n;
            n = (b.x || 0) + m;
            if (0 > n) {
                "right" === k && 0 <= l ? (c.align = "left", c.inside = !0) : l -= n;
                var q = !0
            }
            n = (b.x || 0) + a.width - m;
            n > g.plotWidth && ("left" === k && 0 >= l ? (c.align = "right", c.inside = !0) : l += g.plotWidth - n, q = !0);
            n = b.y + m;
            0 > n &&
            ("bottom" === f && 0 <= p ? (c.verticalAlign = "top", c.inside = !0) : p -= n, q = !0);
            n = (b.y || 0) + a.height - m;
            n > g.plotHeight && ("top" === f && 0 >= p ? (c.verticalAlign = "bottom", c.inside = !0) : p += g.plotHeight - n, q = !0);
            q && (c.x = l, c.y = p, d.placed = !h, d.align(c, void 0, e));
            return q
        };
        A.pie && (A.pie.prototype.dataLabelPositioners = {
            radialDistributionY: function (d) {
                return d.top + d.distributeBox.pos
            }, radialDistributionX: function (d, c, b, a) {
                return d.getX(b < c.top + 2 || b > c.bottom - 2 ? a : b, c.half, c)
            }, justify: function (d, c, b) {
                return b[0] + (d.half ? -1 : 1) * (c + d.labelDistance)
            },
            alignToPlotEdges: function (d, c, b, a) {
                d = d.getBBox().width;
                return c ? d + a : b - d - a
            }, alignToConnectors: function (d, c, b, a) {
                var e = 0, h;
                d.forEach(function (a) {
                    h = a.dataLabel.getBBox().width;
                    h > e && (e = h)
                });
                return c ? e + a : b - e - a
            }
        }, A.pie.prototype.drawDataLabels = function () {
            var d = this, c = d.data, b, a = d.chart, g = d.options.dataLabels || {}, h = g.connectorPadding, f,
                p = a.plotWidth, q = a.plotHeight, r = a.plotLeft, u = Math.round(a.chartWidth / 3), t, z = d.center,
                w = z[2] / 2, B = z[1], x, A, H, K, J = [[], []], Q, N, T, aa, V = [0, 0, 0, 0],
                W = d.dataLabelPositioners, U;
            d.visible &&
            (g.enabled || d._hasPointLabels) && (c.forEach(function (a) {
                a.dataLabel && a.visible && a.dataLabel.shortened && (a.dataLabel.attr({width: "auto"}).css({
                    width: "auto",
                    textOverflow: "clip"
                }), a.dataLabel.shortened = !1)
            }), C.prototype.drawDataLabels.apply(d), c.forEach(function (a) {
                a.dataLabel && (a.visible ? (J[a.half].push(a), a.dataLabel._pos = null, !e(g.style.width) && !e(a.options.dataLabels && a.options.dataLabels.style && a.options.dataLabels.style.width) && a.dataLabel.getBBox().width > u && (a.dataLabel.css({
                    width: Math.round(.7 *
                        u) + "px"
                }), a.dataLabel.shortened = !0)) : (a.dataLabel = a.dataLabel.destroy(), a.dataLabels && 1 === a.dataLabels.length && delete a.dataLabels))
            }), J.forEach(function (c, k) {
                var f = c.length, l = [], m;
                if (f) {
                    d.sortByAngle(c, k - .5);
                    if (0 < d.maxLabelDistance) {
                        var n = Math.max(0, B - w - d.maxLabelDistance);
                        var v = Math.min(B + w + d.maxLabelDistance, a.plotHeight);
                        c.forEach(function (c) {
                            0 < c.labelDistance && c.dataLabel && (c.top = Math.max(0, B - w - c.labelDistance), c.bottom = Math.min(B + w + c.labelDistance, a.plotHeight), m = c.dataLabel.getBBox().height ||
                                21, c.distributeBox = {
                                target: c.labelPosition.natural.y - c.top + m / 2,
                                size: m,
                                rank: c.y
                            }, l.push(c.distributeBox))
                        });
                        n = v + m - n;
                        D.distribute(l, n, n / 5)
                    }
                    for (aa = 0; aa < f; aa++) {
                        b = c[aa];
                        H = b.labelPosition;
                        x = b.dataLabel;
                        T = !1 === b.visible ? "hidden" : "inherit";
                        N = n = H.natural.y;
                        l && e(b.distributeBox) && ("undefined" === typeof b.distributeBox.pos ? T = "hidden" : (K = b.distributeBox.size, N = W.radialDistributionY(b)));
                        delete b.positionIndex;
                        if (g.justify) Q = W.justify(b, w, z); else switch (g.alignTo) {
                            case "connectors":
                                Q = W.alignToConnectors(c, k, p,
                                    r);
                                break;
                            case "plotEdges":
                                Q = W.alignToPlotEdges(x, k, p, r);
                                break;
                            default:
                                Q = W.radialDistributionX(d, b, N, n)
                        }
                        x._attr = {visibility: T, align: H.alignment};
                        U = b.options.dataLabels || {};
                        x._pos = {
                            x: Q + F(U.x, g.x) + ({left: h, right: -h}[H.alignment] || 0),
                            y: N + F(U.y, g.y) - 10
                        };
                        H.final.x = Q;
                        H.final.y = N;
                        F(g.crop, !0) && (A = x.getBBox().width, n = null, Q - A < h && 1 === k ? (n = Math.round(A - Q + h), V[3] = Math.max(n, V[3])) : Q + A > p - h && 0 === k && (n = Math.round(Q + A - p + h), V[1] = Math.max(n, V[1])), 0 > N - K / 2 ? V[0] = Math.max(Math.round(-N + K / 2), V[0]) : N + K / 2 > q && (V[2] = Math.max(Math.round(N +
                            K / 2 - q), V[2])), x.sideOverflow = n)
                    }
                }
            }), 0 === l(V) || this.verifyDataLabelOverflow(V)) && (this.placeDataLabels(), this.points.forEach(function (c) {
                U = I(g, c.options.dataLabels);
                if (f = F(U.connectorWidth, 1)) {
                    var b;
                    t = c.connector;
                    if ((x = c.dataLabel) && x._pos && c.visible && 0 < c.labelDistance) {
                        T = x._attr.visibility;
                        if (b = !t) c.connector = t = a.renderer.path().addClass("highcharts-data-label-connector  highcharts-color-" + c.colorIndex + (c.className ? " " + c.className : "")).add(d.dataLabelsGroup), a.styledMode || t.attr({
                            "stroke-width": f,
                            stroke: U.connectorColor || c.color || y.neutralColor60
                        });
                        t[b ? "attr" : "animate"]({d: c.getConnectorPath()});
                        t.attr("visibility", T)
                    } else t && (c.connector = t.destroy())
                }
            }))
        }, A.pie.prototype.placeDataLabels = function () {
            this.points.forEach(function (d) {
                var c = d.dataLabel, b;
                c && d.visible && ((b = c._pos) ? (c.sideOverflow && (c._attr.width = Math.max(c.getBBox().width - c.sideOverflow, 0), c.css({
                    width: c._attr.width + "px",
                    textOverflow: (this.options.dataLabels.style || {}).textOverflow || "ellipsis"
                }), c.shortened = !0), c.attr(c._attr),
                    c[c.moved ? "animate" : "attr"](b), c.moved = !0) : c && c.attr({y: -9999}));
                delete d.distributeBox
            }, this)
        }, A.pie.prototype.alignDataLabel = b, A.pie.prototype.verifyDataLabelOverflow = function (d) {
            var c = this.center, b = this.options, a = b.center, e = b.minSize || 80, h = null !== b.size;
            if (!h) {
                if (null !== a[0]) var f = Math.max(c[2] - Math.max(d[1], d[3]), e); else f = Math.max(c[2] - d[1] - d[3], e), c[0] += (d[3] - d[1]) / 2;
                null !== a[1] ? f = g(f, e, c[2] - Math.max(d[0], d[2])) : (f = g(f, e, c[2] - d[0] - d[2]), c[1] += (d[0] - d[2]) / 2);
                f < c[2] ? (c[2] = f, c[3] = Math.min(w(b.innerSize ||
                    0, f), f), this.translate(c), this.drawDataLabels && this.drawDataLabels()) : h = !0
            }
            return h
        });
        A.column && (A.column.prototype.alignDataLabel = function (d, c, b, a, e) {
            var h = this.chart.inverted, g = d.series, k = d.dlBox || d.shapeArgs,
                f = F(d.below, d.plotY > F(this.translatedThreshold, g.yAxis.len)),
                l = F(b.inside, !!this.options.stacking);
            k && (a = I(k), 0 > a.y && (a.height += a.y, a.y = 0), k = a.y + a.height - g.yAxis.len, 0 < k && k < a.height && (a.height -= k), h && (a = {
                x: g.yAxis.len - a.y - a.height,
                y: g.xAxis.len - a.x - a.width,
                width: a.height,
                height: a.width
            }), l ||
            (h ? (a.x += f ? 0 : a.width, a.width = 0) : (a.y += f ? a.height : 0, a.height = 0)));
            b.align = F(b.align, !h || l ? "center" : f ? "right" : "left");
            b.verticalAlign = F(b.verticalAlign, h || l ? "middle" : f ? "top" : "bottom");
            C.prototype.alignDataLabel.call(this, d, c, b, a, e);
            b.inside && d.contrastColor && c.css({color: d.contrastColor})
        })
    });
    J(b, "Extensions/OverlappingDataLabels.js", [b["Core/Chart/Chart.js"], b["Core/Utilities.js"]], function (b, f) {
        function B(b, g) {
            var e = !1;
            if (b) {
                var d = b.newOpacity;
                b.oldOpacity !== d && (b.alignAttr && b.placed ? (b[d ? "removeClass" :
                    "addClass"]("highcharts-data-label-hidden"), e = !0, b.alignAttr.opacity = d, b[b.isOld ? "animate" : "attr"](b.alignAttr, null, function () {
                    g.styledMode || b.css({pointerEvents: d ? "auto" : "none"});
                    b.visibility = d ? "inherit" : "hidden"
                }), C(g, "afterHideOverlappingLabel")) : b.attr({opacity: d}));
                b.isOld = !0
            }
            return e
        }

        var y = f.addEvent, C = f.fireEvent, A = f.isArray, t = f.isNumber, r = f.objectEach, p = f.pick;
        y(b, "render", function () {
            var b = this, g = [];
            (this.labelCollectors || []).forEach(function (b) {
                g = g.concat(b())
            });
            (this.yAxis || []).forEach(function (b) {
                b.stacking &&
                b.options.stackLabels && !b.options.stackLabels.allowOverlap && r(b.stacking.stacks, function (d) {
                    r(d, function (d) {
                        g.push(d.label)
                    })
                })
            });
            (this.series || []).forEach(function (e) {
                var d = e.options.dataLabels;
                e.visible && (!1 !== d.enabled || e._hasPointLabels) && (d = function (d) {
                    return d.forEach(function (d) {
                        d.visible && (A(d.dataLabels) ? d.dataLabels : d.dataLabel ? [d.dataLabel] : []).forEach(function (e) {
                            var f = e.options;
                            e.labelrank = p(f.labelrank, d.labelrank, d.shapeArgs && d.shapeArgs.height);
                            f.allowOverlap ? (e.oldOpacity = e.opacity,
                                e.newOpacity = 1, B(e, b)) : g.push(e)
                        })
                    })
                }, d(e.nodes || []), d(e.points))
            });
            this.hideOverlappingLabels(g)
        });
        b.prototype.hideOverlappingLabels = function (b) {
            var g = this, e = b.length, d = g.renderer, f, l, p, r = !1;
            var A = function (b) {
                var e, c = b.box ? 0 : b.padding || 0, g = e = 0, a;
                if (b && (!b.alignAttr || b.placed)) {
                    var k = b.alignAttr || {x: b.attr("x"), y: b.attr("y")};
                    var h = b.parentGroup;
                    b.width || (e = b.getBBox(), b.width = e.width, b.height = e.height, e = d.fontMetrics(null, b.element).h);
                    var f = b.width - 2 * c;
                    (a = {left: "0", center: "0.5", right: "1"}[b.alignValue]) ?
                        g = +a * f : t(b.x) && Math.round(b.x) !== b.translateX && (g = b.x - b.translateX);
                    return {
                        x: k.x + (h.translateX || 0) + c - (g || 0),
                        y: k.y + (h.translateY || 0) + c - e,
                        width: b.width - 2 * c,
                        height: b.height - 2 * c
                    }
                }
            };
            for (l = 0; l < e; l++) if (f = b[l]) f.oldOpacity = f.opacity, f.newOpacity = 1, f.absoluteBox = A(f);
            b.sort(function (d, b) {
                return (b.labelrank || 0) - (d.labelrank || 0)
            });
            for (l = 0; l < e; l++) {
                var w = (A = b[l]) && A.absoluteBox;
                for (f = l + 1; f < e; ++f) {
                    var z = (p = b[f]) && p.absoluteBox;
                    !w || !z || A === p || 0 === A.newOpacity || 0 === p.newOpacity || z.x >= w.x + w.width || z.x + z.width <=
                    w.x || z.y >= w.y + w.height || z.y + z.height <= w.y || ((A.labelrank < p.labelrank ? A : p).newOpacity = 0)
                }
            }
            b.forEach(function (d) {
                B(d, g) && (r = !0)
            });
            r && C(g, "afterHideAllOverlappingLabels")
        }
    });
    J(b, "Core/Responsive.js", [b["Core/Chart/Chart.js"], b["Core/Utilities.js"]], function (b, f) {
        var B = f.find, y = f.isArray, C = f.isObject, A = f.merge, t = f.objectEach, r = f.pick, p = f.splat,
            l = f.uniqueKey;
        b.prototype.setResponsive = function (b, e) {
            var d = this.options.responsive, g = [], f = this.currentResponsive;
            !e && d && d.rules && d.rules.forEach(function (d) {
                "undefined" ===
                typeof d._id && (d._id = l());
                this.matchResponsiveRule(d, g)
            }, this);
            e = A.apply(0, g.map(function (b) {
                return B(d.rules, function (d) {
                    return d._id === b
                }).chartOptions
            }));
            e.isResponsiveOptions = !0;
            g = g.toString() || void 0;
            g !== (f && f.ruleIds) && (f && this.update(f.undoOptions, b, !0), g ? (f = this.currentOptions(e), f.isResponsiveOptions = !0, this.currentResponsive = {
                ruleIds: g,
                mergedOptions: e,
                undoOptions: f
            }, this.update(e, b, !0)) : this.currentResponsive = void 0)
        };
        b.prototype.matchResponsiveRule = function (b, e) {
            var d = b.condition;
            (d.callback ||
                function () {
                    return this.chartWidth <= r(d.maxWidth, Number.MAX_VALUE) && this.chartHeight <= r(d.maxHeight, Number.MAX_VALUE) && this.chartWidth >= r(d.minWidth, 0) && this.chartHeight >= r(d.minHeight, 0)
                }).call(this) && e.push(b._id)
        };
        b.prototype.currentOptions = function (b) {
            function e(b, g, f, l) {
                var r;
                t(b, function (b, q) {
                    if (!l && -1 < d.collectionsWithUpdate.indexOf(q) && g[q]) for (b = p(b), f[q] = [], r = 0; r < Math.max(b.length, g[q].length); r++) g[q][r] && (void 0 === b[r] ? f[q][r] = g[q][r] : (f[q][r] = {}, e(b[r], g[q][r], f[q][r], l + 1))); else C(b) ?
                        (f[q] = y(b) ? [] : {}, e(b, g[q] || {}, f[q], l + 1)) : f[q] = "undefined" === typeof g[q] ? null : g[q]
                })
            }

            var d = this, g = {};
            e(b, this.options, g, 0);
            return g
        }
    });
    J(b, "masters/highcharts.src.js", [b["Core/Globals.js"], b["Core/Utilities.js"], b["Core/Options.js"], b["Core/Animation/Fx.js"], b["Core/Animation/AnimationUtilities.js"], b["Core/Renderer/HTML/AST.js"], b["Core/FormatUtilities.js"], b["Core/Renderer/SVG/SVGElement.js"], b["Core/Series/Series.js"]], function (b, f, D, y, C, A, t, r, p) {
        b.animate = C.animate;
        b.animObject = C.animObject;
        b.getDeferredAnimation =
            C.getDeferredAnimation;
        b.setAnimation = C.setAnimation;
        b.stop = C.stop;
        b.timers = y.timers;
        b.AST = A;
        b.Fx = y;
        b.Series = p;
        b.SVGElement = r;
        b.dateFormat = t.dateFormat;
        b.format = t.format;
        b.numberFormat = t.numberFormat;
        b.defaultOptions = D.defaultOptions;
        b.getOptions = D.getOptions;
        b.time = D.defaultTime;
        b.setOptions = D.setOptions;
        b.addEvent = f.addEvent;
        b.arrayMax = f.arrayMax;
        b.arrayMin = f.arrayMin;
        b.attr = f.attr;
        b.clearTimeout = f.clearTimeout;
        b.correctFloat = f.correctFloat;
        b.createElement = f.createElement;
        b.css = f.css;
        b.defined =
            f.defined;
        b.destroyObjectProperties = f.destroyObjectProperties;
        b.discardElement = f.discardElement;
        b.erase = f.erase;
        b.error = f.error;
        b.extend = f.extend;
        b.extendClass = f.extendClass;
        b.find = f.find;
        b.fireEvent = f.fireEvent;
        b.getMagnitude = f.getMagnitude;
        b.getStyle = f.getStyle;
        b.inArray = f.inArray;
        b.isArray = f.isArray;
        b.isClass = f.isClass;
        b.isDOMElement = f.isDOMElement;
        b.isFunction = f.isFunction;
        b.isNumber = f.isNumber;
        b.isObject = f.isObject;
        b.isString = f.isString;
        b.keys = f.keys;
        b.merge = f.merge;
        b.normalizeTickInterval = f.normalizeTickInterval;
        b.objectEach = f.objectEach;
        b.offset = f.offset;
        b.pad = f.pad;
        b.pick = f.pick;
        b.pInt = f.pInt;
        b.relativeLength = f.relativeLength;
        b.removeEvent = f.removeEvent;
        b.splat = f.splat;
        b.stableSort = f.stableSort;
        b.syncTimeout = f.syncTimeout;
        b.timeUnits = f.timeUnits;
        b.uniqueKey = f.uniqueKey;
        b.useSerialIds = f.useSerialIds;
        b.wrap = f.wrap;
        return b
    });
    J(b, "Core/Axis/MapAxis.js", [b["Core/Axis/Axis.js"], b["Core/Utilities.js"]], function (b, f) {
        var B = f.addEvent, y = f.pick, C = function () {
            return function (b) {
                this.axis = b
            }
        }();
        f = function () {
            function b() {
            }

            b.compose = function (b) {
                b.keepProps.push("mapAxis");
                B(b, "init", function () {
                    this.mapAxis || (this.mapAxis = new C(this))
                });
                B(b, "getSeriesExtremes", function () {
                    if (this.mapAxis) {
                        var b = [];
                        this.isXAxis && (this.series.forEach(function (f, l) {
                            f.useMapGeometry && (b[l] = f.xData, f.xData = [])
                        }), this.mapAxis.seriesXData = b)
                    }
                });
                B(b, "afterGetSeriesExtremes", function () {
                    if (this.mapAxis) {
                        var b = this.mapAxis.seriesXData || [], f;
                        if (this.isXAxis) {
                            var l = y(this.dataMin, Number.MAX_VALUE);
                            var g = y(this.dataMax, -Number.MAX_VALUE);
                            this.series.forEach(function (e,
                                                          d) {
                                e.useMapGeometry && (l = Math.min(l, y(e.minX, l)), g = Math.max(g, y(e.maxX, g)), e.xData = b[d], f = !0)
                            });
                            f && (this.dataMin = l, this.dataMax = g);
                            this.mapAxis.seriesXData = void 0
                        }
                    }
                });
                B(b, "afterSetAxisTranslation", function () {
                    if (this.mapAxis) {
                        var b = this.chart, f = b.plotWidth / b.plotHeight;
                        b = b.xAxis[0];
                        var l;
                        "yAxis" === this.coll && "undefined" !== typeof b.transA && this.series.forEach(function (b) {
                            b.preserveAspectRatio && (l = !0)
                        });
                        if (l && (this.transA = b.transA = Math.min(this.transA, b.transA), f /= (b.max - b.min) / (this.max - this.min), f =
                            1 > f ? this : b, b = (f.max - f.min) * f.transA, f.mapAxis.pixelPadding = f.len - b, f.minPixelPadding = f.mapAxis.pixelPadding / 2, b = f.mapAxis.fixTo)) {
                            b = b[1] - f.toValue(b[0], !0);
                            b *= f.transA;
                            if (Math.abs(b) > f.minPixelPadding || f.min === f.dataMin && f.max === f.dataMax) b = 0;
                            f.minPixelPadding -= b
                        }
                    }
                });
                B(b, "render", function () {
                    this.mapAxis && (this.mapAxis.fixTo = void 0)
                })
            };
            return b
        }();
        f.compose(b);
        return f
    });
    J(b, "Mixins/ColorSeries.js", [], function () {
        return {
            colorPointMixin: {
                setVisible: function (b) {
                    var f = this, B = b ? "show" : "hide";
                    f.visible =
                        f.options.visible = !!b;
                    ["graphic", "dataLabel"].forEach(function (b) {
                        if (f[b]) f[b][B]()
                    });
                    this.series.buildKDTree()
                }
            }, colorSeriesMixin: {
                optionalAxis: "colorAxis", colorAxis: 0, translateColors: function () {
                    var b = this, f = this.options.nullColor, D = this.colorAxis, y = this.colorKey;
                    (this.data.length ? this.data : this.points).forEach(function (C) {
                        var A = C.getNestedProperty(y);
                        (A = C.options.color || (C.isNull || null === C.value ? f : D && "undefined" !== typeof A ? D.toColor(A, C) : C.color || b.color)) && C.color !== A && (C.color = A, "point" === b.options.legendType &&
                        C.legendItem && b.chart.legend.colorizeItem(C, C.visible))
                    })
                }
            }
        }
    });
    J(b, "Core/Axis/ColorAxis.js", [b["Core/Axis/Axis.js"], b["Core/Chart/Chart.js"], b["Core/Color/Color.js"], b["Mixins/ColorSeries.js"], b["Core/Animation/Fx.js"], b["Core/Globals.js"], b["Core/Legend.js"], b["Mixins/LegendSymbol.js"], b["Core/Color/Palette.js"], b["Core/Series/Point.js"], b["Core/Series/Series.js"], b["Core/Utilities.js"]], function (b, f, D, y, C, A, t, r, p, l, g, e) {
        var d = this && this.__extends || function () {
            var c = function (d, a) {
                c = Object.setPrototypeOf ||
                    {__proto__: []} instanceof Array && function (a, c) {
                        a.__proto__ = c
                    } || function (a, c) {
                        for (var d in c) c.hasOwnProperty(d) && (a[d] = c[d])
                    };
                return c(d, a)
            };
            return function (d, a) {
                function b() {
                    this.constructor = d
                }

                c(d, a);
                d.prototype = null === a ? Object.create(a) : (b.prototype = a.prototype, new b)
            }
        }(), u = D.parse;
        D = y.colorPointMixin;
        y = y.colorSeriesMixin;
        var B = A.noop, I = e.addEvent, K = e.extend, F = e.isNumber, w = e.merge, z = e.pick, q = e.splat;
        "";
        K(g.prototype, y);
        K(l.prototype, D);
        f.prototype.collectionsWithUpdate.push("colorAxis");
        f.prototype.collectionsWithInit.colorAxis =
            [f.prototype.addColorAxis];
        var m = function (c) {
            function b(a, d) {
                var b = c.call(this, a, d) || this;
                b.beforePadding = !1;
                b.chart = void 0;
                b.coll = "colorAxis";
                b.dataClasses = void 0;
                b.legendItem = void 0;
                b.legendItems = void 0;
                b.name = "";
                b.options = void 0;
                b.stops = void 0;
                b.visible = !0;
                b.init(a, d);
                return b
            }

            d(b, c);
            b.prototype.init = function (a, d) {
                var e = a.options.legend || {}, g = d.layout ? "vertical" !== d.layout : "vertical" !== e.layout;
                e = w(b.defaultColorAxisOptions, d, {
                    showEmpty: !1,
                    title: null,
                    visible: e.enabled && (d ? !1 !== d.visible : !0)
                });
                this.coll = "colorAxis";
                this.side = d.side || g ? 2 : 1;
                this.reversed = d.reversed || !g;
                this.opposite = !g;
                c.prototype.init.call(this, a, e);
                d.dataClasses && this.initDataClasses(d);
                this.initStops();
                this.horiz = g;
                this.zoomEnabled = !1
            };
            b.prototype.initDataClasses = function (a) {
                var c = this.chart, d, b = 0, e = c.options.chart.colorCount, g = this.options,
                    f = a.dataClasses.length;
                this.dataClasses = d = [];
                this.legendItems = [];
                a.dataClasses.forEach(function (a, h) {
                    a = w(a);
                    d.push(a);
                    if (c.styledMode || !a.color) "category" === g.dataClassColor ? (c.styledMode ||
                    (h = c.options.colors, e = h.length, a.color = h[b]), a.colorIndex = b, b++, b === e && (b = 0)) : a.color = u(g.minColor).tweenTo(u(g.maxColor), 2 > f ? .5 : h / (f - 1))
                })
            };
            b.prototype.hasData = function () {
                return !!(this.tickPositions || []).length
            };
            b.prototype.setTickPositions = function () {
                if (!this.dataClasses) return c.prototype.setTickPositions.call(this)
            };
            b.prototype.initStops = function () {
                this.stops = this.options.stops || [[0, this.options.minColor], [1, this.options.maxColor]];
                this.stops.forEach(function (a) {
                    a.color = u(a[1])
                })
            };
            b.prototype.setOptions =
                function (a) {
                    c.prototype.setOptions.call(this, a);
                    this.options.crosshair = this.options.marker
                };
            b.prototype.setAxisSize = function () {
                var a = this.legendSymbol, c = this.chart, d = c.options.legend || {}, e, g;
                a ? (this.left = d = a.attr("x"), this.top = e = a.attr("y"), this.width = g = a.attr("width"), this.height = a = a.attr("height"), this.right = c.chartWidth - d - g, this.bottom = c.chartHeight - e - a, this.len = this.horiz ? g : a, this.pos = this.horiz ? d : e) : this.len = (this.horiz ? d.symbolWidth : d.symbolHeight) || b.defaultLegendLength
            };
            b.prototype.normalizedValue =
                function (a) {
                    this.logarithmic && (a = this.logarithmic.log2lin(a));
                    return 1 - (this.max - a) / (this.max - this.min || 1)
                };
            b.prototype.toColor = function (a, c) {
                var d = this.dataClasses, b = this.stops, e;
                if (d) for (e = d.length; e--;) {
                    var g = d[e];
                    var k = g.from;
                    b = g.to;
                    if (("undefined" === typeof k || a >= k) && ("undefined" === typeof b || a <= b)) {
                        var f = g.color;
                        c && (c.dataClass = e, c.colorIndex = g.colorIndex);
                        break
                    }
                } else {
                    a = this.normalizedValue(a);
                    for (e = b.length; e-- && !(a > b[e][0]);) ;
                    k = b[e] || b[e + 1];
                    b = b[e + 1] || k;
                    a = 1 - (b[0] - a) / (b[0] - k[0] || 1);
                    f = k.color.tweenTo(b.color,
                        a)
                }
                return f
            };
            b.prototype.getOffset = function () {
                var a = this.legendGroup, d = this.chart.axisOffset[this.side];
                a && (this.axisParent = a, c.prototype.getOffset.call(this), this.added || (this.added = !0, this.labelLeft = 0, this.labelRight = this.width), this.chart.axisOffset[this.side] = d)
            };
            b.prototype.setLegendColor = function () {
                var a = this.reversed, c = a ? 1 : 0;
                a = a ? 0 : 1;
                c = this.horiz ? [c, 0, a, 0] : [0, a, 0, c];
                this.legendColor = {linearGradient: {x1: c[0], y1: c[1], x2: c[2], y2: c[3]}, stops: this.stops}
            };
            b.prototype.drawLegendSymbol = function (a,
                                                     c) {
                var d = a.padding, e = a.options, g = this.horiz, k = z(e.symbolWidth, g ? b.defaultLegendLength : 12),
                    f = z(e.symbolHeight, g ? 12 : b.defaultLegendLength), l = z(e.labelPadding, g ? 16 : 30);
                e = z(e.itemDistance, 10);
                this.setLegendColor();
                c.legendSymbol = this.chart.renderer.rect(0, a.baseline - 11, k, f).attr({zIndex: 1}).add(c.legendGroup);
                this.legendItemWidth = k + d + (g ? e : l);
                this.legendItemHeight = f + d + (g ? l : 0)
            };
            b.prototype.setState = function (a) {
                this.series.forEach(function (c) {
                    c.setState(a)
                })
            };
            b.prototype.setVisible = function () {
            };
            b.prototype.getSeriesExtremes =
                function () {
                    var a = this.series, c = a.length, d;
                    this.dataMin = Infinity;
                    for (this.dataMax = -Infinity; c--;) {
                        var b = a[c];
                        var e = b.colorKey = z(b.options.colorKey, b.colorKey, b.pointValKey, b.zoneAxis, "y");
                        var f = b.pointArrayMap;
                        var l = b[e + "Min"] && b[e + "Max"];
                        if (b[e + "Data"]) var m = b[e + "Data"]; else if (f) {
                            m = [];
                            f = f.indexOf(e);
                            var n = b.yData;
                            if (0 <= f && n) for (d = 0; d < n.length; d++) m.push(z(n[d][f], n[d]))
                        } else m = b.yData;
                        l ? (b.minColorValue = b[e + "Min"], b.maxColorValue = b[e + "Max"]) : (m = g.prototype.getExtremes.call(b, m), b.minColorValue = m.dataMin,
                            b.maxColorValue = m.dataMax);
                        "undefined" !== typeof b.minColorValue && (this.dataMin = Math.min(this.dataMin, b.minColorValue), this.dataMax = Math.max(this.dataMax, b.maxColorValue));
                        l || g.prototype.applyExtremes.call(b)
                    }
                };
            b.prototype.drawCrosshair = function (a, d) {
                var b = d && d.plotX, e = d && d.plotY, g = this.pos, k = this.len;
                if (d) {
                    var f = this.toPixels(d.getNestedProperty(d.series.colorKey));
                    f < g ? f = g - 2 : f > g + k && (f = g + k + 2);
                    d.plotX = f;
                    d.plotY = this.len - f;
                    c.prototype.drawCrosshair.call(this, a, d);
                    d.plotX = b;
                    d.plotY = e;
                    this.cross && !this.cross.addedToColorAxis &&
                    this.legendGroup && (this.cross.addClass("highcharts-coloraxis-marker").add(this.legendGroup), this.cross.addedToColorAxis = !0, this.chart.styledMode || "object" !== typeof this.crosshair || this.cross.attr({fill: this.crosshair.color}))
                }
            };
            b.prototype.getPlotLinePath = function (a) {
                var d = this.left, b = a.translatedValue, e = this.top;
                return F(b) ? this.horiz ? [["M", b - 4, e - 6], ["L", b + 4, e - 6], ["L", b, e], ["Z"]] : [["M", d, b], ["L", d - 6, b + 6], ["L", d - 6, b - 6], ["Z"]] : c.prototype.getPlotLinePath.call(this, a)
            };
            b.prototype.update = function (a,
                                           d) {
                var b = this.chart.legend;
                this.series.forEach(function (a) {
                    a.isDirtyData = !0
                });
                (a.dataClasses && b.allItems || this.dataClasses) && this.destroyItems();
                c.prototype.update.call(this, a, d);
                this.legendItem && (this.setLegendColor(), b.colorizeItem(this, !0))
            };
            b.prototype.destroyItems = function () {
                var a = this.chart;
                this.legendItem ? a.legend.destroyItem(this) : this.legendItems && this.legendItems.forEach(function (c) {
                    a.legend.destroyItem(c)
                });
                a.isDirtyLegend = !0
            };
            b.prototype.destroy = function () {
                this.chart.isDirtyLegend = !0;
                this.destroyItems();
                c.prototype.destroy.apply(this, [].slice.call(arguments))
            };
            b.prototype.remove = function (a) {
                this.destroyItems();
                c.prototype.remove.call(this, a)
            };
            b.prototype.getDataClassLegendSymbols = function () {
                var a = this, c = a.chart, d = a.legendItems, b = c.options.legend, e = b.valueDecimals,
                    g = b.valueSuffix || "", f;
                d.length || a.dataClasses.forEach(function (b, h) {
                    var k = !0, l = b.from, m = b.to, n = c.numberFormatter;
                    f = "";
                    "undefined" === typeof l ? f = "< " : "undefined" === typeof m && (f = "> ");
                    "undefined" !== typeof l && (f += n(l, e) +
                        g);
                    "undefined" !== typeof l && "undefined" !== typeof m && (f += " - ");
                    "undefined" !== typeof m && (f += n(m, e) + g);
                    d.push(K({
                        chart: c,
                        name: f,
                        options: {},
                        drawLegendSymbol: r.drawRectangle,
                        visible: !0,
                        setState: B,
                        isDataClass: !0,
                        setVisible: function () {
                            k = a.visible = !k;
                            a.series.forEach(function (a) {
                                a.points.forEach(function (a) {
                                    a.dataClass === h && a.setVisible(k)
                                })
                            });
                            c.legend.colorizeItem(this, k)
                        }
                    }, b))
                });
                return d
            };
            b.defaultLegendLength = 200;
            b.defaultColorAxisOptions = {
                lineWidth: 0,
                minPadding: 0,
                maxPadding: 0,
                gridLineWidth: 1,
                tickPixelInterval: 72,
                startOnTick: !0,
                endOnTick: !0,
                offset: 0,
                marker: {animation: {duration: 50}, width: .01, color: p.neutralColor40},
                labels: {overflow: "justify", rotation: 0},
                minColor: p.highlightColor10,
                maxColor: p.highlightColor100,
                tickLength: 5,
                showInLegend: !0
            };
            b.keepProps = ["legendGroup", "legendItemHeight", "legendItemWidth", "legendItem", "legendSymbol"];
            return b
        }(b);
        Array.prototype.push.apply(b.keepProps, m.keepProps);
        A.ColorAxis = m;
        ["fill", "stroke"].forEach(function (c) {
            C.prototype[c + "Setter"] = function () {
                this.elem.attr(c, u(this.start).tweenTo(u(this.end),
                    this.pos), null, !0)
            }
        });
        I(f, "afterGetAxes", function () {
            var c = this, d = c.options;
            this.colorAxis = [];
            d.colorAxis && (d.colorAxis = q(d.colorAxis), d.colorAxis.forEach(function (a, d) {
                a.index = d;
                new m(c, a)
            }))
        });
        I(g, "bindAxes", function () {
            var c = this.axisTypes;
            c ? -1 === c.indexOf("colorAxis") && c.push("colorAxis") : this.axisTypes = ["colorAxis"]
        });
        I(t, "afterGetAllItems", function (c) {
            var d = this, a = [], b, e, g = function (a) {
                a = c.allItems.indexOf(a);
                -1 !== a && (d.destroyItem(c.allItems[a]), c.allItems.splice(a, 1))
            };
            (this.chart.colorAxis ||
                []).forEach(function (c) {
                (b = c.options) && b.showInLegend && (b.dataClasses && b.visible ? a = a.concat(c.getDataClassLegendSymbols()) : b.visible && a.push(c), c.series.forEach(function (a) {
                    if (!a.options.showInLegend || b.dataClasses) "point" === a.options.legendType ? a.points.forEach(function (a) {
                        g(a)
                    }) : g(a)
                }))
            });
            for (e = a.length; e--;) c.allItems.unshift(a[e])
        });
        I(t, "afterColorizeItem", function (c) {
            c.visible && c.item.legendColor && c.item.legendSymbol.attr({fill: c.item.legendColor})
        });
        I(t, "afterUpdate", function () {
            var c = this.chart.colorAxis;
            c && c.forEach(function (c, a, d) {
                c.update({}, d)
            })
        });
        I(g, "afterTranslate", function () {
            (this.chart.colorAxis && this.chart.colorAxis.length || this.colorAttribs) && this.translateColors()
        });
        return m
    });
    J(b, "Mixins/ColorMapSeries.js", [b["Core/Globals.js"], b["Core/Series/Point.js"], b["Core/Utilities.js"]], function (b, f, D) {
        var y = D.defined;
        D = D.addEvent;
        var C = b.noop;
        b = b.seriesTypes;
        D(f, "afterSetState", function (b) {
            this.moveToTopOnHover && this.graphic && this.graphic.attr({zIndex: b && "hover" === b.state ? 1 : 0})
        });
        return {
            colorMapPointMixin: {
                dataLabelOnNull: !0,
                moveToTopOnHover: !0, isValid: function () {
                    return null !== this.value && Infinity !== this.value && -Infinity !== this.value
                }
            },
            colorMapSeriesMixin: {
                pointArrayMap: ["value"],
                axisTypes: ["xAxis", "yAxis", "colorAxis"],
                trackerGroups: ["group", "markerGroup", "dataLabelsGroup"],
                getSymbol: C,
                parallelArrays: ["x", "y", "value"],
                colorKey: "value",
                pointAttribs: b.column.prototype.pointAttribs,
                colorAttribs: function (b) {
                    var f = {};
                    y(b.color) && (f[this.colorProp || "fill"] = b.color);
                    return f
                }
            }
        }
    });
    J(b, "Maps/MapNavigationOptionsDefault.js", [b["Core/Options.js"],
        b["Core/Utilities.js"]], function (b, f) {
        f = f.extend;
        var B = {
            buttonOptions: {
                alignTo: "plotBox",
                align: "left",
                verticalAlign: "top",
                x: 0,
                width: 18,
                height: 18,
                padding: 5,
                style: {fontSize: "15px", fontWeight: "bold"},
                theme: {"stroke-width": 1, "text-align": "center"}
            }, buttons: {
                zoomIn: {
                    onclick: function () {
                        this.mapZoom(.5)
                    }, text: "+", y: 0
                }, zoomOut: {
                    onclick: function () {
                        this.mapZoom(2)
                    }, text: "-", y: 28
                }
            }, mouseWheelSensitivity: 1.1
        };
        f(b.defaultOptions.lang, {zoomIn: "Zoom in", zoomOut: "Zoom out"});
        return b.defaultOptions.mapNavigation =
            B
    });
    J(b, "Maps/MapNavigation.js", [b["Core/Chart/Chart.js"], b["Core/Globals.js"], b["Core/Utilities.js"]], function (b, f, D) {
        function y(b) {
            b && (b.preventDefault && b.preventDefault(), b.stopPropagation && b.stopPropagation(), b.cancelBubble = !0)
        }

        function C(b) {
            this.init(b)
        }

        var A = f.doc, t = D.addEvent, r = D.extend, p = D.merge, l = D.objectEach, g = D.pick;
        C.prototype.init = function (b) {
            this.chart = b;
            b.mapNavButtons = []
        };
        C.prototype.update = function (b) {
            var d = this.chart, e = d.options.mapNavigation, f, A, C, B, w = function (b) {
                this.handler.call(d,
                    b);
                y(b)
            }, z = d.mapNavButtons;
            b && (e = d.options.mapNavigation = p(d.options.mapNavigation, b));
            for (; z.length;) z.pop().destroy();
            g(e.enableButtons, e.enabled) && !d.renderer.forExport && l(e.buttons, function (b, g) {
                b = p(e.buttonOptions, b);
                !d.styledMode && b.theme && (f = b.theme, f.style = p(b.theme.style, b.style), C = (A = f.states) && A.hover, B = A && A.select, delete f.states);
                var c = d.renderer.button(b.text || "", 0, 0, w, f, C, B, void 0, "zoomIn" === g ? "topbutton" : "bottombutton").addClass("highcharts-map-navigation highcharts-" + {
                    zoomIn: "zoom-in",
                    zoomOut: "zoom-out"
                }[g]).attr({
                    width: b.width,
                    height: b.height,
                    title: d.options.lang[g],
                    padding: b.padding,
                    zIndex: 5
                }).add();
                c.handler = b.onclick;
                t(c.element, "dblclick", y);
                z.push(c);
                r(b, {width: c.width, height: 2 * c.height});
                if (d.hasLoaded) c.align(b, !1, b.alignTo); else var l = t(d, "load", function () {
                    c.element && c.align(b, !1, b.alignTo);
                    l()
                })
            });
            this.updateEvents(e)
        };
        C.prototype.updateEvents = function (b) {
            var d = this.chart;
            g(b.enableDoubleClickZoom, b.enabled) || b.enableDoubleClickZoomTo ? this.unbindDblClick = this.unbindDblClick ||
                t(d.container, "dblclick", function (b) {
                    d.pointer.onContainerDblClick(b)
                }) : this.unbindDblClick && (this.unbindDblClick = this.unbindDblClick());
            g(b.enableMouseWheelZoom, b.enabled) ? this.unbindMouseWheel = this.unbindMouseWheel || t(d.container, void 0 !== A.onwheel ? "wheel" : void 0 !== A.onmousewheel ? "mousewheel" : "DOMMouseScroll", function (b) {
                d.pointer.inClass(b.target, "highcharts-no-mousewheel") || (d.pointer.onContainerMouseWheel(b), y(b));
                return !1
            }) : this.unbindMouseWheel && (this.unbindMouseWheel = this.unbindMouseWheel())
        };
        r(b.prototype, {
            fitToBox: function (b, d) {
                [["x", "width"], ["y", "height"]].forEach(function (e) {
                    var g = e[0];
                    e = e[1];
                    b[g] + b[e] > d[g] + d[e] && (b[e] > d[e] ? (b[e] = d[e], b[g] = d[g]) : b[g] = d[g] + d[e] - b[e]);
                    b[e] > d[e] && (b[e] = d[e]);
                    b[g] < d[g] && (b[g] = d[g])
                });
                return b
            }, mapZoom: function (b, d, f, l, p, r) {
                var e = this.xAxis[0], t = e.max - e.min, u = g(d, e.min + t / 2), q = t * b;
                t = this.yAxis[0];
                var m = t.max - t.min, c = g(f, t.min + m / 2);
                m *= b;
                u = this.fitToBox({
                    x: u - q * (l ? (l - e.pos) / e.len : .5),
                    y: c - m * (p ? (p - t.pos) / t.len : .5),
                    width: q,
                    height: m
                }, {
                    x: e.dataMin, y: t.dataMin,
                    width: e.dataMax - e.dataMin, height: t.dataMax - t.dataMin
                });
                q = u.x <= e.dataMin && u.width >= e.dataMax - e.dataMin && u.y <= t.dataMin && u.height >= t.dataMax - t.dataMin;
                l && e.mapAxis && (e.mapAxis.fixTo = [l - e.pos, d]);
                p && t.mapAxis && (t.mapAxis.fixTo = [p - t.pos, f]);
                "undefined" === typeof b || q ? (e.setExtremes(void 0, void 0, !1), t.setExtremes(void 0, void 0, !1)) : (e.setExtremes(u.x, u.x + u.width, !1), t.setExtremes(u.y, u.y + u.height, !1));
                this.redraw(r)
            }
        });
        t(b, "beforeRender", function () {
            this.mapNavigation = new C(this);
            this.mapNavigation.update()
        });
        f.MapNavigation = C
    });
    J(b, "Maps/MapPointer.js", [b["Core/Pointer.js"], b["Core/Utilities.js"]], function (b, f) {
        var B = f.extend, y = f.pick;
        f = f.wrap;
        var C = 0, A;
        B(b.prototype, {
            onContainerDblClick: function (b) {
                var f = this.chart;
                b = this.normalize(b);
                f.options.mapNavigation.enableDoubleClickZoomTo ? f.pointer.inClass(b.target, "highcharts-tracker") && f.hoverPoint && f.hoverPoint.zoomTo() : f.isInsidePlot(b.chartX - f.plotLeft, b.chartY - f.plotTop) && f.mapZoom(.5, f.xAxis[0].toValue(b.chartX), f.yAxis[0].toValue(b.chartY), b.chartX,
                    b.chartY)
            }, onContainerMouseWheel: function (b) {
                var f = this.chart;
                b = this.normalize(b);
                var p = b.deltaY || b.detail || -(b.wheelDelta / 120);
                1 <= Math.abs(p) && (C += Math.abs(p), A && clearTimeout(A), A = setTimeout(function () {
                    C = 0
                }, 50));
                10 > C && f.isInsidePlot(b.chartX - f.plotLeft, b.chartY - f.plotTop) && f.mapZoom(Math.pow(f.options.mapNavigation.mouseWheelSensitivity, p), f.xAxis[0].toValue(b.chartX), f.yAxis[0].toValue(b.chartY), b.chartX, b.chartY, 1 > Math.abs(p) ? !1 : void 0)
            }
        });
        f(b.prototype, "zoomOption", function (b) {
            var f = this.chart.options.mapNavigation;
            y(f.enableTouchZoom, f.enabled) && (this.chart.options.chart.pinchType = "xy");
            b.apply(this, [].slice.call(arguments, 1))
        });
        f(b.prototype, "pinchTranslate", function (b, f, p, l, g, e, d) {
            b.call(this, f, p, l, g, e, d);
            "map" === this.chart.options.chart.type && this.hasZoom && (b = l.scaleX > l.scaleY, this.pinchTranslateDirection(!b, f, p, l, g, e, d, b ? l.scaleX : l.scaleY))
        })
    });
    J(b, "Maps/MapSymbols.js", [b["Core/Globals.js"], b["Core/Renderer/SVG/SVGRenderer.js"]], function (b, f) {
        function B(b, f, t, r, p, l, g, e) {
            return [["M", b + p, f], ["L", b + t - l, f],
                ["C", b + t - l / 2, f, b + t, f + l / 2, b + t, f + l], ["L", b + t, f + r - g], ["C", b + t, f + r - g / 2, b + t - g / 2, f + r, b + t - g, f + r], ["L", b + e, f + r], ["C", b + e / 2, f + r, b, f + r - e / 2, b, f + r - e], ["L", b, f + p], ["C", b, f + p / 2, b + p / 2, f, b + p, f], ["Z"]]
        }

        var y = b.Renderer;
        f.prototype.symbols.topbutton = function (b, f, t, r, p) {
            p = p && p.r || 0;
            return B(b - 1, f - 1, t, r, p, p, 0, 0)
        };
        f.prototype.symbols.bottombutton = function (b, f, t, r, p) {
            p = p && p.r || 0;
            return B(b - 1, f - 1, t, r, 0, 0, p, p)
        };
        y !== f && ["topbutton", "bottombutton"].forEach(function (b) {
            y.prototype.symbols[b] = f.prototype.symbols[b]
        });
        return f.prototype.symbols
    });
    J(b, "Core/Chart/MapChart.js", [b["Core/Chart/Chart.js"], b["Core/Options.js"], b["Core/Renderer/SVG/SVGRenderer.js"], b["Core/Utilities.js"]], function (b, f, D, y) {
        var B = this && this.__extends || function () {
            var b = function (f, g) {
                b = Object.setPrototypeOf || {__proto__: []} instanceof Array && function (b, d) {
                    b.__proto__ = d
                } || function (b, d) {
                    for (var e in d) d.hasOwnProperty(e) && (b[e] = d[e])
                };
                return b(f, g)
            };
            return function (f, g) {
                function e() {
                    this.constructor = f
                }

                b(f, g);
                f.prototype = null === g ? Object.create(g) : (e.prototype = g.prototype,
                    new e)
            }
        }(), A = f.getOptions, t = y.merge, r = y.pick;
        b = function (b) {
            function f() {
                return null !== b && b.apply(this, arguments) || this
            }

            B(f, b);
            f.prototype.init = function (g, e) {
                var d = {endOnTick: !1, visible: !1, minPadding: 0, maxPadding: 0, startOnTick: !1}, f = g.series,
                    l = A().credits;
                g.series = void 0;
                g = t({
                    chart: {panning: {enabled: !0, type: "xy"}, type: "map"},
                    credits: {
                        mapText: r(l.mapText, ' \u00a9 <a href="{geojson.copyrightUrl}">{geojson.copyrightShort}</a>'),
                        mapTextFull: r(l.mapTextFull, "{geojson.copyright}")
                    },
                    tooltip: {followTouchMove: !1},
                    xAxis: d,
                    yAxis: t(d, {reversed: !0})
                }, g, {chart: {inverted: !1, alignTicks: !1}});
                g.series = f;
                b.prototype.init.call(this, g, e)
            };
            return f
        }(b);
        (function (b) {
            b.maps = {};
            b.mapChart = function (f, g, e) {
                return new b(f, g, e)
            };
            b.splitPath = function (b) {
                "string" === typeof b && (b = b.replace(/([A-Za-z])/g, " $1 ").replace(/^\s*/, "").replace(/\s*$/, ""), b = b.split(/[ ,;]+/).map(function (b) {
                    return /[A-za-z]/.test(b) ? b : parseFloat(b)
                }));
                return D.prototype.pathToSegments(b)
            }
        })(b || (b = {}));
        return b
    });
    J(b, "Series/Map/MapPoint.js", [b["Mixins/ColorMapSeries.js"],
        b["Core/Series/SeriesRegistry.js"], b["Core/Utilities.js"]], function (b, f, D) {
        var y = this && this.__extends || function () {
            var b = function (f, r) {
                b = Object.setPrototypeOf || {__proto__: []} instanceof Array && function (b, f) {
                    b.__proto__ = f
                } || function (b, f) {
                    for (var g in f) f.hasOwnProperty(g) && (b[g] = f[g])
                };
                return b(f, r)
            };
            return function (f, r) {
                function p() {
                    this.constructor = f
                }

                b(f, r);
                f.prototype = null === r ? Object.create(r) : (p.prototype = r.prototype, new p)
            }
        }();
        b = b.colorMapPointMixin;
        var B = D.extend;
        f = function (b) {
            function f() {
                var f =
                    null !== b && b.apply(this, arguments) || this;
                f.options = void 0;
                f.path = void 0;
                f.series = void 0;
                return f
            }

            y(f, b);
            f.prototype.applyOptions = function (f, p) {
                var l = this.series;
                f = b.prototype.applyOptions.call(this, f, p);
                p = l.joinBy;
                l.mapData && l.mapMap && (p = b.prototype.getNestedProperty.call(f, p[1]), (p = "undefined" !== typeof p && l.mapMap[p]) ? (l.xyFromShape && (f.x = p._midX, f.y = p._midY), B(f, p)) : f.value = f.value || null);
                return f
            };
            f.prototype.onMouseOver = function (f) {
                D.clearTimeout(this.colorInterval);
                if (null !== this.value || this.series.options.nullInteraction) b.prototype.onMouseOver.call(this,
                    f); else this.series.onMouseOut(f)
            };
            f.prototype.zoomTo = function () {
                var b = this.series;
                b.xAxis.setExtremes(this._minX, this._maxX, !1);
                b.yAxis.setExtremes(this._minY, this._maxY, !1);
                b.chart.redraw()
            };
            return f
        }(f.seriesTypes.scatter.prototype.pointClass);
        B(f.prototype, {dataLabelOnNull: b.dataLabelOnNull, isValid: b.isValid, moveToTopOnHover: b.moveToTopOnHover});
        return f
    });
    J(b, "Series/Map/MapSeries.js", [b["Mixins/ColorMapSeries.js"], b["Core/Globals.js"], b["Mixins/LegendSymbol.js"], b["Core/Chart/MapChart.js"],
        b["Series/Map/MapPoint.js"], b["Core/Color/Palette.js"], b["Core/Series/Series.js"], b["Core/Series/SeriesRegistry.js"], b["Core/Renderer/SVG/SVGRenderer.js"], b["Core/Utilities.js"]], function (b, f, D, y, C, A, t, r, p, l) {
        var g = this && this.__extends || function () {
            var a = function (c, b) {
                a = Object.setPrototypeOf || {__proto__: []} instanceof Array && function (a, c) {
                    a.__proto__ = c
                } || function (a, c) {
                    for (var b in c) c.hasOwnProperty(b) && (a[b] = c[b])
                };
                return a(c, b)
            };
            return function (c, b) {
                function d() {
                    this.constructor = c
                }

                a(c, b);
                c.prototype =
                    null === b ? Object.create(b) : (d.prototype = b.prototype, new d)
            }
        }();
        b = b.colorMapSeriesMixin;
        var e = f.noop, d = y.maps, u = y.splitPath;
        y = r.seriesTypes;
        var B = y.column, I = y.scatter;
        y = l.extend;
        var K = l.fireEvent, F = l.getNestedProperty, w = l.isArray, z = l.isNumber, q = l.merge, m = l.objectEach,
            c = l.pick, n = l.splat;
        l = function (a) {
            function b() {
                var c = null !== a && a.apply(this, arguments) || this;
                c.baseTrans = void 0;
                c.chart = void 0;
                c.data = void 0;
                c.group = void 0;
                c.joinBy = void 0;
                c.options = void 0;
                c.points = void 0;
                c.transformGroup = void 0;
                return c
            }

            g(b, a);
            b.prototype.animate = function (a) {
                var c = this.options.animation, b = this.group, d = this.xAxis, e = this.yAxis, h = d.pos, g = e.pos;
                this.chart.renderer.isSVG && (!0 === c && (c = {duration: 1E3}), a ? b.attr({
                    translateX: h + d.len / 2,
                    translateY: g + e.len / 2,
                    scaleX: .001,
                    scaleY: .001
                }) : b.animate({translateX: h, translateY: g, scaleX: 1, scaleY: 1}, c))
            };
            b.prototype.animateDrilldown = function (a) {
                var c = this.chart.plotBox, b = this.chart.drilldownLevels[this.chart.drilldownLevels.length - 1],
                    d = b.bBox, e = this.chart.options.drilldown.animation;
                a ||
                (a = Math.min(d.width / c.width, d.height / c.height), b.shapeArgs = {
                    scaleX: a,
                    scaleY: a,
                    translateX: d.x,
                    translateY: d.y
                }, this.points.forEach(function (a) {
                    a.graphic && a.graphic.attr(b.shapeArgs).animate({
                        scaleX: 1,
                        scaleY: 1,
                        translateX: 0,
                        translateY: 0
                    }, e)
                }))
            };
            b.prototype.animateDrillupFrom = function (a) {
                B.prototype.animateDrillupFrom.call(this, a)
            };
            b.prototype.animateDrillupTo = function (a) {
                B.prototype.animateDrillupTo.call(this, a)
            };
            b.prototype.doFullTranslate = function () {
                return this.isDirtyData || this.chart.isResizing || this.chart.renderer.isVML ||
                    !this.baseTrans
            };
            b.prototype.drawMapDataLabels = function () {
                t.prototype.drawDataLabels.call(this);
                this.dataLabelsGroup && this.dataLabelsGroup.clip(this.chart.clipRect)
            };
            b.prototype.drawPoints = function () {
                var a = this, b = a.xAxis, d = a.yAxis, e = a.group, g = a.chart, f = g.renderer, k = this.baseTrans;
                a.transformGroup || (a.transformGroup = f.g().attr({
                    scaleX: 1,
                    scaleY: 1
                }).add(e), a.transformGroup.survive = !0);
                if (a.doFullTranslate()) g.hasRendered && !g.styledMode && a.points.forEach(function (c) {
                    c.shapeArgs && (c.shapeArgs.fill = a.pointAttribs(c,
                        c.state).fill)
                }), a.group = a.transformGroup, B.prototype.drawPoints.apply(a), a.group = e, a.points.forEach(function (c) {
                    if (c.graphic) {
                        var b = "";
                        c.name && (b += "highcharts-name-" + c.name.replace(/ /g, "-").toLowerCase());
                        c.properties && c.properties["hc-key"] && (b += " highcharts-key-" + c.properties["hc-key"].toLowerCase());
                        b && c.graphic.addClass(b);
                        g.styledMode && c.graphic.css(a.pointAttribs(c, c.selected && "select" || void 0))
                    }
                }), this.baseTrans = {
                    originX: b.min - b.minPixelPadding / b.transA, originY: d.min - d.minPixelPadding / d.transA +
                        (d.reversed ? 0 : d.len / d.transA), transAX: b.transA, transAY: d.transA
                }, this.transformGroup.animate({translateX: 0, translateY: 0, scaleX: 1, scaleY: 1}); else {
                    var l = b.transA / k.transAX;
                    var m = d.transA / k.transAY;
                    var n = b.toPixels(k.originX, !0);
                    var p = d.toPixels(k.originY, !0);
                    .99 < l && 1.01 > l && .99 < m && 1.01 > m && (m = l = 1, n = Math.round(n), p = Math.round(p));
                    var q = this.transformGroup;
                    if (g.renderer.globalAnimation) {
                        var r = q.attr("translateX");
                        var t = q.attr("translateY");
                        var u = q.attr("scaleX");
                        var z = q.attr("scaleY");
                        q.attr({animator: 0}).animate({animator: 1},
                            {
                                step: function (a, c) {
                                    q.attr({
                                        translateX: r + (n - r) * c.pos,
                                        translateY: t + (p - t) * c.pos,
                                        scaleX: u + (l - u) * c.pos,
                                        scaleY: z + (m - z) * c.pos
                                    })
                                }
                            })
                    } else q.attr({translateX: n, translateY: p, scaleX: l, scaleY: m})
                }
                g.styledMode || e.element.setAttribute("stroke-width", c(a.options[a.pointAttrToOptions && a.pointAttrToOptions["stroke-width"] || "borderWidth"], 1) / (l || 1));
                this.drawMapDataLabels()
            };
            b.prototype.getBox = function (a) {
                var b = Number.MAX_VALUE, d = -b, e = b, h = -b, g = b, f = b, k = this.xAxis, l = this.yAxis, m;
                (a || []).forEach(function (a) {
                    if (a.path) {
                        "string" ===
                        typeof a.path ? a.path = u(a.path) : "M" === a.path[0] && (a.path = p.prototype.pathToSegments(a.path));
                        var k = a.path || [], l = -b, n = b, q = -b, r = b, t = a.properties;
                        a._foundBox || (k.forEach(function (a) {
                            var c = a[a.length - 2];
                            a = a[a.length - 1];
                            "number" === typeof c && "number" === typeof a && (n = Math.min(n, c), l = Math.max(l, c), r = Math.min(r, a), q = Math.max(q, a))
                        }), a._midX = n + (l - n) * c(a.middleX, t && t["hc-middle-x"], .5), a._midY = r + (q - r) * c(a.middleY, t && t["hc-middle-y"], .5), a._maxX = l, a._minX = n, a._maxY = q, a._minY = r, a.labelrank = c(a.labelrank, (l - n) * (q -
                            r)), a._foundBox = !0);
                        d = Math.max(d, a._maxX);
                        e = Math.min(e, a._minX);
                        h = Math.max(h, a._maxY);
                        g = Math.min(g, a._minY);
                        f = Math.min(a._maxX - a._minX, a._maxY - a._minY, f);
                        m = !0
                    }
                });
                m && (this.minY = Math.min(g, c(this.minY, b)), this.maxY = Math.max(h, c(this.maxY, -b)), this.minX = Math.min(e, c(this.minX, b)), this.maxX = Math.max(d, c(this.maxX, -b)), k && "undefined" === typeof k.options.minRange && (k.minRange = Math.min(5 * f, (this.maxX - this.minX) / 5, k.minRange || b)), l && "undefined" === typeof l.options.minRange && (l.minRange = Math.min(5 * f, (this.maxY -
                    this.minY) / 5, l.minRange || b)))
            };
            b.prototype.getExtremes = function () {
                var a = t.prototype.getExtremes.call(this, this.valueData), c = a.dataMin;
                a = a.dataMax;
                this.chart.hasRendered && this.isDirtyData && this.getBox(this.options.data);
                z(c) && (this.valueMin = c);
                z(a) && (this.valueMax = a);
                return {dataMin: this.minY, dataMax: this.maxY}
            };
            b.prototype.hasData = function () {
                return !!this.processedXData.length
            };
            b.prototype.pointAttribs = function (a, b) {
                b = a.series.chart.styledMode ? this.colorAttribs(a) : B.prototype.pointAttribs.call(this,
                    a, b);
                b["stroke-width"] = c(a.options[this.pointAttrToOptions && this.pointAttrToOptions["stroke-width"] || "borderWidth"], "inherit");
                return b
            };
            b.prototype.render = function () {
                var a = this, c = t.prototype.render;
                a.chart.renderer.isVML && 3E3 < a.data.length ? setTimeout(function () {
                    c.call(a)
                }) : c.call(a)
            };
            b.prototype.setData = function (a, c, b, e) {
                var h = this.options, g = this.chart.options.chart, k = g && g.map, l = h.mapData, n = this.joinBy,
                    p = h.keys || this.pointArrayMap, r = [], u = {}, v = this.chart.mapTransforms;
                !l && k && (l = "string" === typeof k ?
                    d[k] : k);
                a && a.forEach(function (c, b) {
                    var d = 0;
                    if (z(c)) a[b] = {value: c}; else if (w(c)) {
                        a[b] = {};
                        !h.keys && c.length > p.length && "string" === typeof c[0] && (a[b]["hc-key"] = c[0], ++d);
                        for (var e = 0; e < p.length; ++e, ++d) p[e] && "undefined" !== typeof c[d] && (0 < p[e].indexOf(".") ? C.prototype.setNestedProperty(a[b], c[d], p[e]) : a[b][p[e]] = c[d])
                    }
                    n && "_i" === n[0] && (a[b]._i = b)
                });
                this.getBox(a);
                (this.chart.mapTransforms = v = g.mapTransforms || l && l["hc-transform"] || v) && m(v, function (a) {
                    a.rotation && (a.cosAngle = Math.cos(a.rotation), a.sinAngle =
                        Math.sin(a.rotation))
                });
                if (l) {
                    "FeatureCollection" === l.type && (this.mapTitle = l.title, l = f.geojson(l, this.type, this));
                    this.mapData = l;
                    this.mapMap = {};
                    for (v = 0; v < l.length; v++) g = l[v], k = g.properties, g._i = v, n[0] && k && k[n[0]] && (g[n[0]] = k[n[0]]), u[g[n[0]]] = g;
                    this.mapMap = u;
                    if (a && n[1]) {
                        var y = n[1];
                        a.forEach(function (a) {
                            a = F(y, a);
                            u[a] && r.push(u[a])
                        })
                    }
                    if (h.allAreas) {
                        this.getBox(l);
                        a = a || [];
                        if (n[1]) {
                            var A = n[1];
                            a.forEach(function (a) {
                                r.push(F(A, a))
                            })
                        }
                        r = "|" + r.map(function (a) {
                            return a && a[n[0]]
                        }).join("|") + "|";
                        l.forEach(function (c) {
                            n[0] &&
                            -1 !== r.indexOf("|" + c[n[0]] + "|") || (a.push(q(c, {value: null})), e = !1)
                        })
                    } else this.getBox(r)
                }
                t.prototype.setData.call(this, a, c, b, e)
            };
            b.prototype.setOptions = function (a) {
                a = t.prototype.setOptions.call(this, a);
                var c = a.joinBy;
                null === c && (c = "_i");
                c = this.joinBy = n(c);
                c[1] || (c[1] = c[0]);
                return a
            };
            b.prototype.translate = function () {
                var a = this, c = a.xAxis, b = a.yAxis, d = a.doFullTranslate();
                a.generatePoints();
                a.data.forEach(function (e) {
                    z(e._midX) && z(e._midY) && (e.plotX = c.toPixels(e._midX, !0), e.plotY = b.toPixels(e._midY, !0));
                    d && (e.shapeType = "path", e.shapeArgs = {d: a.translatePath(e.path)})
                });
                K(a, "afterTranslate")
            };
            b.prototype.translatePath = function (a) {
                var c = this.xAxis, b = this.yAxis, d = c.min, e = c.transA, h = c.minPixelPadding, g = b.min,
                    f = b.transA, k = b.minPixelPadding, l = [];
                a && a.forEach(function (a) {
                    "M" === a[0] ? l.push(["M", (a[1] - (d || 0)) * e + h, (a[2] - (g || 0)) * f + k]) : "L" === a[0] ? l.push(["L", (a[1] - (d || 0)) * e + h, (a[2] - (g || 0)) * f + k]) : "C" === a[0] ? l.push(["C", (a[1] - (d || 0)) * e + h, (a[2] - (g || 0)) * f + k, (a[3] - (d || 0)) * e + h, (a[4] - (g || 0)) * f + k, (a[5] - (d || 0)) * e + h, (a[6] -
                        (g || 0)) * f + k]) : "Q" === a[0] ? l.push(["Q", (a[1] - (d || 0)) * e + h, (a[2] - (g || 0)) * f + k, (a[3] - (d || 0)) * e + h, (a[4] - (g || 0)) * f + k]) : "Z" === a[0] && l.push(["Z"])
                });
                return l
            };
            b.defaultOptions = q(I.defaultOptions, {
                animation: !1,
                dataLabels: {
                    crop: !1, formatter: function () {
                        return this.point.value
                    }, inside: !0, overflow: !1, padding: 0, verticalAlign: "middle"
                },
                marker: null,
                nullColor: A.neutralColor3,
                stickyTracking: !1,
                tooltip: {followPointer: !0, pointFormat: "{point.name}: {point.value}<br/>"},
                turboThreshold: 0,
                allAreas: !0,
                borderColor: A.neutralColor20,
                borderWidth: 1,
                joinBy: "hc-key",
                states: {
                    hover: {halo: null, brightness: .2},
                    normal: {animation: !0},
                    select: {color: A.neutralColor20},
                    inactive: {opacity: 1}
                }
            });
            return b
        }(I);
        y(l.prototype, {
            type: "map",
            axisTypes: b.axisTypes,
            colorAttribs: b.colorAttribs,
            colorKey: b.colorKey,
            directTouch: !0,
            drawDataLabels: e,
            drawGraph: e,
            drawLegendSymbol: D.drawRectangle,
            forceDL: !0,
            getExtremesFromAll: !0,
            getSymbol: b.getSymbol,
            parallelArrays: b.parallelArrays,
            pointArrayMap: b.pointArrayMap,
            pointClass: C,
            preserveAspectRatio: !0,
            searchPoint: e,
            trackerGroups: b.trackerGroups,
            useMapGeometry: !0
        });
        r.registerSeriesType("map", l);
        "";
        return l
    });
    J(b, "Series/MapLine/MapLineSeries.js", [b["Series/Map/MapSeries.js"], b["Core/Series/SeriesRegistry.js"], b["Core/Utilities.js"]], function (b, f, D) {
        var y = this && this.__extends || function () {
            var b = function (f, l) {
                b = Object.setPrototypeOf || {__proto__: []} instanceof Array && function (b, e) {
                    b.__proto__ = e
                } || function (b, e) {
                    for (var d in e) e.hasOwnProperty(d) && (b[d] = e[d])
                };
                return b(f, l)
            };
            return function (f, l) {
                function g() {
                    this.constructor =
                        f
                }

                b(f, l);
                f.prototype = null === l ? Object.create(l) : (g.prototype = l.prototype, new g)
            }
        }(), C = f.series, A = D.extend, t = D.merge;
        D = function (f) {
            function p() {
                var b = null !== f && f.apply(this, arguments) || this;
                b.data = void 0;
                b.options = void 0;
                b.points = void 0;
                return b
            }

            y(p, f);
            p.prototype.pointAttribs = function (f, g) {
                f = b.prototype.pointAttribs.call(this, f, g);
                f.fill = this.options.fillColor;
                return f
            };
            p.defaultOptions = t(b.defaultOptions, {lineWidth: 1, fillColor: "none"});
            return p
        }(b);
        A(D.prototype, {
            type: "mapline",
            colorProp: "stroke",
            drawLegendSymbol: C.prototype.drawLegendSymbol,
            pointAttrToOptions: {stroke: "color", "stroke-width": "lineWidth"}
        });
        f.registerSeriesType("mapline", D);
        "";
        return D
    });
    J(b, "Series/MapPoint/MapPointPoint.js", [b["Core/Series/SeriesRegistry.js"], b["Core/Utilities.js"]], function (b, f) {
        var B = this && this.__extends || function () {
            var b = function (f, t) {
                b = Object.setPrototypeOf || {__proto__: []} instanceof Array && function (b, f) {
                    b.__proto__ = f
                } || function (b, f) {
                    for (var l in f) f.hasOwnProperty(l) && (b[l] = f[l])
                };
                return b(f, t)
            };
            return function (f,
                             t) {
                function r() {
                    this.constructor = f
                }

                b(f, t);
                f.prototype = null === t ? Object.create(t) : (r.prototype = t.prototype, new r)
            }
        }(), y = f.merge;
        return function (b) {
            function f() {
                var f = null !== b && b.apply(this, arguments) || this;
                f.options = void 0;
                f.series = void 0;
                return f
            }

            B(f, b);
            f.prototype.applyOptions = function (f, r) {
                f = "undefined" !== typeof f.lat && "undefined" !== typeof f.lon ? y(f, this.series.chart.fromLatLonToPoint(f)) : f;
                return b.prototype.applyOptions.call(this, f, r)
            };
            return f
        }(b.seriesTypes.scatter.prototype.pointClass)
    });
    J(b,
        "Series/MapPoint/MapPointSeries.js", [b["Series/MapPoint/MapPointPoint.js"], b["Core/Color/Palette.js"], b["Core/Series/SeriesRegistry.js"], b["Core/Utilities.js"]], function (b, f, D, y) {
            var B = this && this.__extends || function () {
                var b = function (f, g) {
                    b = Object.setPrototypeOf || {__proto__: []} instanceof Array && function (b, d) {
                        b.__proto__ = d
                    } || function (b, d) {
                        for (var e in d) d.hasOwnProperty(e) && (b[e] = d[e])
                    };
                    return b(f, g)
                };
                return function (f, g) {
                    function e() {
                        this.constructor = f
                    }

                    b(f, g);
                    f.prototype = null === g ? Object.create(g) :
                        (e.prototype = g.prototype, new e)
                }
            }(), A = D.seriesTypes.scatter, t = y.extend, r = y.merge;
            y = function (b) {
                function l() {
                    var g = null !== b && b.apply(this, arguments) || this;
                    g.data = void 0;
                    g.options = void 0;
                    g.points = void 0;
                    return g
                }

                B(l, b);
                l.prototype.drawDataLabels = function () {
                    b.prototype.drawDataLabels.call(this);
                    this.dataLabelsGroup && this.dataLabelsGroup.clip(this.chart.clipRect)
                };
                l.defaultOptions = r(A.defaultOptions, {
                    dataLabels: {
                        crop: !1,
                        defer: !1,
                        enabled: !0,
                        formatter: function () {
                            return this.point.name
                        },
                        overflow: !1,
                        style: {color: f.neutralColor100}
                    }
                });
                return l
            }(A);
            t(y.prototype, {type: "mappoint", forceDL: !0, pointClass: b});
            D.registerSeriesType("mappoint", y);
            "";
            return y
        });
    J(b, "Series/Bubble/BubblePoint.js", [b["Core/Series/Point.js"], b["Core/Series/SeriesRegistry.js"], b["Core/Utilities.js"]], function (b, f, D) {
        var y = this && this.__extends || function () {
            var b = function (f, t) {
                b = Object.setPrototypeOf || {__proto__: []} instanceof Array && function (b, f) {
                    b.__proto__ = f
                } || function (b, f) {
                    for (var l in f) f.hasOwnProperty(l) && (b[l] = f[l])
                };
                return b(f, t)
            };
            return function (f, t) {
                function r() {
                    this.constructor =
                        f
                }

                b(f, t);
                f.prototype = null === t ? Object.create(t) : (r.prototype = t.prototype, new r)
            }
        }();
        D = D.extend;
        f = function (f) {
            function B() {
                var b = null !== f && f.apply(this, arguments) || this;
                b.options = void 0;
                b.series = void 0;
                return b
            }

            y(B, f);
            B.prototype.haloPath = function (f) {
                return b.prototype.haloPath.call(this, 0 === f ? 0 : (this.marker ? this.marker.radius || 0 : 0) + f)
            };
            return B
        }(f.seriesTypes.scatter.prototype.pointClass);
        D(f.prototype, {ttBelow: !1});
        return f
    });
    J(b, "Series/Bubble/BubbleLegend.js", [b["Core/Chart/Chart.js"], b["Core/Color/Color.js"],
        b["Core/FormatUtilities.js"], b["Core/Globals.js"], b["Core/Legend.js"], b["Core/Options.js"], b["Core/Color/Palette.js"], b["Core/Series/Series.js"], b["Core/Utilities.js"]], function (b, f, D, y, C, A, t, r, p) {
        var l = f.parse, g = y.noop;
        A = A.setOptions;
        f = p.addEvent;
        var e = p.arrayMax, d = p.arrayMin, u = p.isNumber, B = p.merge, I = p.objectEach, K = p.pick, F = p.stableSort;
        p = p.wrap;
        "";
        A({
            legend: {
                bubbleLegend: {
                    borderColor: void 0,
                    borderWidth: 2,
                    className: void 0,
                    color: void 0,
                    connectorClassName: void 0,
                    connectorColor: void 0,
                    connectorDistance: 60,
                    connectorWidth: 1,
                    enabled: !1,
                    labels: {
                        className: void 0,
                        allowOverlap: !1,
                        format: "",
                        formatter: void 0,
                        align: "right",
                        style: {fontSize: "10px", color: t.neutralColor100},
                        x: 0,
                        y: 0
                    },
                    maxSize: 60,
                    minSize: 10,
                    legendIndex: 0,
                    ranges: {value: void 0, borderColor: void 0, color: void 0, connectorColor: void 0},
                    sizeBy: "area",
                    sizeByAbsoluteValue: !1,
                    zIndex: 1,
                    zThreshold: 0
                }
            }
        });
        t = function () {
            function b(b, d) {
                this.options = this.symbols = this.visible = this.ranges = this.movementX = this.maxLabel = this.legendSymbol = this.legendItemWidth = this.legendItemHeight =
                    this.legendItem = this.legendGroup = this.legend = this.fontMetrics = this.chart = void 0;
                this.setState = g;
                this.init(b, d)
            }

            b.prototype.init = function (b, d) {
                this.options = b;
                this.visible = !0;
                this.chart = d.chart;
                this.legend = d
            };
            b.prototype.addToLegend = function (b) {
                b.splice(this.options.legendIndex, 0, this)
            };
            b.prototype.drawLegendSymbol = function (b) {
                var d = this.chart, e = this.options, c = K(b.options.itemDistance, 20), f = e.ranges;
                var a = e.connectorDistance;
                this.fontMetrics = d.renderer.fontMetrics(e.labels.style.fontSize);
                f && f.length &&
                u(f[0].value) ? (F(f, function (a, c) {
                    return c.value - a.value
                }), this.ranges = f, this.setOptions(), this.render(), d = this.getMaxLabelSize(), f = this.ranges[0].radius, b = 2 * f, a = a - f + d.width, a = 0 < a ? a : 0, this.maxLabel = d, this.movementX = "left" === e.labels.align ? a : 0, this.legendItemWidth = b + a + c, this.legendItemHeight = b + this.fontMetrics.h / 2) : b.options.bubbleLegend.autoRanges = !0
            };
            b.prototype.setOptions = function () {
                var b = this.ranges, d = this.options, e = this.chart.series[d.seriesIndex], c = this.legend.baseline,
                    f = {zIndex: d.zIndex, "stroke-width": d.borderWidth},
                    a = {zIndex: d.zIndex, "stroke-width": d.connectorWidth}, g = {
                        align: this.legend.options.rtl || "left" === d.labels.align ? "right" : "left",
                        zIndex: d.zIndex
                    }, h = e.options.marker.fillOpacity, p = this.chart.styledMode;
                b.forEach(function (k, m) {
                    p || (f.stroke = K(k.borderColor, d.borderColor, e.color), f.fill = K(k.color, d.color, 1 !== h ? l(e.color).setOpacity(h).get("rgba") : e.color), a.stroke = K(k.connectorColor, d.connectorColor, e.color));
                    b[m].radius = this.getRangeRadius(k.value);
                    b[m] = B(b[m], {center: b[0].radius - b[m].radius + c});
                    p || B(!0,
                        b[m], {bubbleAttribs: B(f), connectorAttribs: B(a), labelAttribs: g})
                }, this)
            };
            b.prototype.getRangeRadius = function (b) {
                var d = this.options;
                return this.chart.series[this.options.seriesIndex].getRadius.call(this, d.ranges[d.ranges.length - 1].value, d.ranges[0].value, d.minSize, d.maxSize, b)
            };
            b.prototype.render = function () {
                var b = this.chart.renderer, d = this.options.zThreshold;
                this.symbols || (this.symbols = {connectors: [], bubbleItems: [], labels: []});
                this.legendSymbol = b.g("bubble-legend");
                this.legendItem = b.g("bubble-legend-item");
                this.legendSymbol.translateX = 0;
                this.legendSymbol.translateY = 0;
                this.ranges.forEach(function (b) {
                    b.value >= d && this.renderRange(b)
                }, this);
                this.legendSymbol.add(this.legendItem);
                this.legendItem.add(this.legendGroup);
                this.hideOverlappingLabels()
            };
            b.prototype.renderRange = function (b) {
                var d = this.options, e = d.labels, c = this.chart, f = c.series[d.seriesIndex], a = c.renderer,
                    g = this.symbols;
                c = g.labels;
                var h = b.center, l = Math.abs(b.radius), p = d.connectorDistance || 0, r = e.align;
                p = this.legend.options.rtl || "left" === r ? -p : p;
                var t =
                        d.connectorWidth, u = this.ranges[0].radius || 0, w = h - l - d.borderWidth / 2 + t / 2,
                    z = this.fontMetrics;
                z = z.f / 2 - (z.h - z.f) / 2;
                var y = a.styledMode;
                "center" === r && (p = 0, d.connectorDistance = 0, b.labelAttribs.align = "center");
                r = w + d.labels.y;
                var B = u + p + d.labels.x;
                g.bubbleItems.push(a.circle(u, h + ((w % 1 ? 1 : .5) - (t % 2 ? 0 : .5)), l).attr(y ? {} : b.bubbleAttribs).addClass((y ? "highcharts-color-" + f.colorIndex + " " : "") + "highcharts-bubble-legend-symbol " + (d.className || "")).add(this.legendSymbol));
                g.connectors.push(a.path(a.crispLine([["M", u, w],
                    ["L", u + p, w]], d.connectorWidth)).attr(y ? {} : b.connectorAttribs).addClass((y ? "highcharts-color-" + this.options.seriesIndex + " " : "") + "highcharts-bubble-legend-connectors " + (d.connectorClassName || "")).add(this.legendSymbol));
                b = a.text(this.formatLabel(b), B, r + z).attr(y ? {} : b.labelAttribs).css(y ? {} : e.style).addClass("highcharts-bubble-legend-labels " + (d.labels.className || "")).add(this.legendSymbol);
                c.push(b);
                b.placed = !0;
                b.alignAttr = {x: B, y: r + z}
            };
            b.prototype.getMaxLabelSize = function () {
                var b, d;
                this.symbols.labels.forEach(function (e) {
                    d =
                        e.getBBox(!0);
                    b = b ? d.width > b.width ? d : b : d
                });
                return b || {}
            };
            b.prototype.formatLabel = function (b) {
                var d = this.options, e = d.labels.formatter;
                d = d.labels.format;
                var c = this.chart.numberFormatter;
                return d ? D.format(d, b) : e ? e.call(b) : c(b.value, 1)
            };
            b.prototype.hideOverlappingLabels = function () {
                var b = this.chart, d = this.symbols;
                !this.options.labels.allowOverlap && d && (b.hideOverlappingLabels(d.labels), d.labels.forEach(function (b, c) {
                    b.newOpacity ? b.newOpacity !== b.oldOpacity && d.connectors[c].show() : d.connectors[c].hide()
                }))
            };
            b.prototype.getRanges = function () {
                var b = this.legend.bubbleLegend, f = b.options.ranges, g, c = Number.MAX_VALUE, l = -Number.MAX_VALUE;
                b.chart.series.forEach(function (a) {
                    a.isBubble && !a.ignoreSeries && (g = a.zData.filter(u), g.length && (c = K(a.options.zMin, Math.min(c, Math.max(d(g), !1 === a.options.displayNegative ? a.options.zThreshold : -Number.MAX_VALUE))), l = K(a.options.zMax, Math.max(l, e(g)))))
                });
                var a = c === l ? [{value: l}] : [{value: c}, {value: (c + l) / 2}, {value: l, autoRanges: !0}];
                f.length && f[0].radius && a.reverse();
                a.forEach(function (c,
                                    b) {
                    f && f[b] && (a[b] = B(f[b], c))
                });
                return a
            };
            b.prototype.predictBubbleSizes = function () {
                var b = this.chart, d = this.fontMetrics, e = b.legend.options, c = "horizontal" === e.layout,
                    f = c ? b.legend.lastLineHeight : 0, a = b.plotSizeX, g = b.plotSizeY,
                    h = b.series[this.options.seriesIndex];
                b = Math.ceil(h.minPxSize);
                var l = Math.ceil(h.maxPxSize);
                h = h.options.maxSize;
                var p = Math.min(g, a);
                if (e.floating || !/%$/.test(h)) d = l; else if (h = parseFloat(h), d = (p + f - d.h / 2) * h / 100 / (h / 100 + 1), c && g - d >= a || !c && a - d >= g) d = l;
                return [b, Math.ceil(d)]
            };
            b.prototype.updateRanges =
                function (b, d) {
                    var e = this.legend.options.bubbleLegend;
                    e.minSize = b;
                    e.maxSize = d;
                    e.ranges = this.getRanges()
                };
            b.prototype.correctSizes = function () {
                var b = this.legend, d = this.chart.series[this.options.seriesIndex];
                1 < Math.abs(Math.ceil(d.maxPxSize) - this.options.maxSize) && (this.updateRanges(this.options.minSize, d.maxPxSize), b.render())
            };
            return b
        }();
        f(C, "afterGetAllItems", function (b) {
            var d = this.bubbleLegend, e = this.options, f = e.bubbleLegend,
                c = this.chart.getVisibleBubbleSeriesIndex();
            d && d.ranges && d.ranges.length &&
            (f.ranges.length && (f.autoRanges = !!f.ranges[0].autoRanges), this.destroyItem(d));
            0 <= c && e.enabled && f.enabled && (f.seriesIndex = c, this.bubbleLegend = new y.BubbleLegend(f, this), this.bubbleLegend.addToLegend(b.allItems))
        });
        b.prototype.getVisibleBubbleSeriesIndex = function () {
            for (var b = this.series, d = 0; d < b.length;) {
                if (b[d] && b[d].isBubble && b[d].visible && b[d].zData.length) return d;
                d++
            }
            return -1
        };
        C.prototype.getLinesHeights = function () {
            var b = this.allItems, d = [], e = b.length, f, c = 0;
            for (f = 0; f < e; f++) if (b[f].legendItemHeight &&
            (b[f].itemHeight = b[f].legendItemHeight), b[f] === b[e - 1] || b[f + 1] && b[f]._legendItemPos[1] !== b[f + 1]._legendItemPos[1]) {
                d.push({height: 0});
                var g = d[d.length - 1];
                for (c; c <= f; c++) b[c].itemHeight > g.height && (g.height = b[c].itemHeight);
                g.step = f
            }
            return d
        };
        C.prototype.retranslateItems = function (b) {
            var d, e, f, c = this.options.rtl, g = 0;
            this.allItems.forEach(function (a, k) {
                d = a.legendGroup.translateX;
                e = a._legendItemPos[1];
                if ((f = a.movementX) || c && a.ranges) f = c ? d - a.options.maxSize / 2 : d + f, a.legendGroup.attr({translateX: f});
                k > b[g].step &&
                g++;
                a.legendGroup.attr({translateY: Math.round(e + b[g].height / 2)});
                a._legendItemPos[1] = e + b[g].height / 2
            })
        };
        f(r, "legendItemClick", function () {
            var b = this.chart, d = this.visible, e = this.chart.legend;
            e && e.bubbleLegend && (this.visible = !d, this.ignoreSeries = d, b = 0 <= b.getVisibleBubbleSeriesIndex(), e.bubbleLegend.visible !== b && (e.update({bubbleLegend: {enabled: b}}), e.bubbleLegend.visible = b), this.visible = d)
        });
        p(b.prototype, "drawChartBox", function (b, d, e) {
            var f = this.legend, c = 0 <= this.getVisibleBubbleSeriesIndex();
            if (f &&
                f.options.enabled && f.bubbleLegend && f.options.bubbleLegend.autoRanges && c) {
                var g = f.bubbleLegend.options;
                c = f.bubbleLegend.predictBubbleSizes();
                f.bubbleLegend.updateRanges(c[0], c[1]);
                g.placed || (f.group.placed = !1, f.allItems.forEach(function (a) {
                    a.legendGroup.translateY = null
                }));
                f.render();
                this.getMargins();
                this.axes.forEach(function (a) {
                    a.visible && a.render();
                    g.placed || (a.setScale(), a.updateNames(), I(a.ticks, function (a) {
                        a.isNew = !0;
                        a.isNewLabel = !0
                    }))
                });
                g.placed = !0;
                this.getMargins();
                b.call(this, d, e);
                f.bubbleLegend.correctSizes();
                f.retranslateItems(f.getLinesHeights())
            } else b.call(this, d, e), f && f.options.enabled && f.bubbleLegend && (f.render(), f.retranslateItems(f.getLinesHeights()))
        });
        y.BubbleLegend = t;
        return y.BubbleLegend
    });
    J(b, "Series/Bubble/BubbleSeries.js", [b["Core/Axis/Axis.js"], b["Series/Bubble/BubblePoint.js"], b["Core/Color/Color.js"], b["Core/Globals.js"], b["Core/Series/Series.js"], b["Core/Series/SeriesRegistry.js"], b["Core/Utilities.js"]], function (b, f, D, y, C, A, t) {
        var r = this && this.__extends || function () {
            var b = function (d,
                              e) {
                b = Object.setPrototypeOf || {__proto__: []} instanceof Array && function (c, b) {
                    c.__proto__ = b
                } || function (c, b) {
                    for (var a in b) b.hasOwnProperty(a) && (c[a] = b[a])
                };
                return b(d, e)
            };
            return function (d, e) {
                function c() {
                    this.constructor = d
                }

                b(d, e);
                d.prototype = null === e ? Object.create(e) : (c.prototype = e.prototype, new c)
            }
        }(), p = D.parse;
        D = y.noop;
        var l = A.seriesTypes;
        y = l.column;
        var g = l.scatter, e = t.arrayMax, d = t.arrayMin, u = t.clamp, B = t.extend, I = t.isNumber, K = t.merge,
            F = t.pick, w = t.pInt;
        t = function (b) {
            function d() {
                var d = null !== b && b.apply(this,
                    arguments) || this;
                d.data = void 0;
                d.maxPxSize = void 0;
                d.minPxSize = void 0;
                d.options = void 0;
                d.points = void 0;
                d.radii = void 0;
                d.yData = void 0;
                d.zData = void 0;
                return d
            }

            r(d, b);
            d.prototype.animate = function (b) {
                !b && this.points.length < this.options.animationLimit && this.points.forEach(function (b) {
                    var c = b.graphic;
                    c && c.width && (this.hasRendered || c.attr({
                        x: b.plotX,
                        y: b.plotY,
                        width: 1,
                        height: 1
                    }), c.animate(this.markerAttribs(b), this.options.animation))
                }, this)
            };
            d.prototype.getRadii = function (b, c, d) {
                var a = this.zData, e = this.yData,
                    f = d.minPxSize, g = d.maxPxSize, l = [];
                var m = 0;
                for (d = a.length; m < d; m++) {
                    var n = a[m];
                    l.push(this.getRadius(b, c, f, g, n, e[m]))
                }
                this.radii = l
            };
            d.prototype.getRadius = function (b, c, d, a, e, f) {
                var g = this.options, h = "width" !== g.sizeBy, k = g.zThreshold, l = c - b, m = .5;
                if (null === f || null === e) return null;
                if (I(e)) {
                    g.sizeByAbsoluteValue && (e = Math.abs(e - k), l = Math.max(c - k, Math.abs(b - k)), b = 0);
                    if (e < b) return d / 2 - 1;
                    0 < l && (m = (e - b) / l)
                }
                h && 0 <= m && (m = Math.sqrt(m));
                return Math.ceil(d + m * (a - d)) / 2
            };
            d.prototype.hasData = function () {
                return !!this.processedXData.length
            };
            d.prototype.pointAttribs = function (b, c) {
                var d = this.options.marker.fillOpacity;
                b = C.prototype.pointAttribs.call(this, b, c);
                1 !== d && (b.fill = p(b.fill).setOpacity(d).get("rgba"));
                return b
            };
            d.prototype.translate = function () {
                var d, c = this.data, e = this.radii;
                b.prototype.translate.call(this);
                for (d = c.length; d--;) {
                    var a = c[d];
                    var f = e ? e[d] : 0;
                    I(f) && f >= this.minPxSize / 2 ? (a.marker = B(a.marker, {
                        radius: f,
                        width: 2 * f,
                        height: 2 * f
                    }), a.dlBox = {
                        x: a.plotX - f,
                        y: a.plotY - f,
                        width: 2 * f,
                        height: 2 * f
                    }) : a.shapeArgs = a.plotY = a.dlBox = void 0
                }
            };
            d.defaultOptions =
                K(g.defaultOptions, {
                    dataLabels: {
                        formatter: function () {
                            return this.point.z
                        }, inside: !0, verticalAlign: "middle"
                    },
                    animationLimit: 250,
                    marker: {
                        lineColor: null,
                        lineWidth: 1,
                        fillOpacity: .5,
                        radius: null,
                        states: {hover: {radiusPlus: 0}},
                        symbol: "circle"
                    },
                    minSize: 8,
                    maxSize: "20%",
                    softThreshold: !1,
                    states: {hover: {halo: {size: 5}}},
                    tooltip: {pointFormat: "({point.x}, {point.y}), Size: {point.z}"},
                    turboThreshold: 0,
                    zThreshold: 0,
                    zoneAxis: "z"
                });
            return d
        }(g);
        B(t.prototype, {
            alignDataLabel: y.prototype.alignDataLabel,
            applyZones: D,
            bubblePadding: !0,
            buildKDTree: D,
            directTouch: !0,
            isBubble: !0,
            pointArrayMap: ["y", "z"],
            pointClass: f,
            parallelArrays: ["x", "y", "z"],
            trackerGroups: ["group", "dataLabelsGroup"],
            specialGroup: "group",
            zoneAxis: "z"
        });
        b.prototype.beforePadding = function () {
            var b = this, f = this.len, g = this.chart, c = 0, l = f, a = this.isXAxis, k = a ? "xData" : "yData",
                h = this.min, p = {}, r = Math.min(g.plotWidth, g.plotHeight), t = Number.MAX_VALUE,
                y = -Number.MAX_VALUE, B = this.max - h, A = f / B, C = [];
            this.series.forEach(function (c) {
                var f = c.options;
                !c.bubblePadding || !c.visible && g.options.chart.ignoreHiddenSeries ||
                (b.allowZoomOutside = !0, C.push(c), a && (["minSize", "maxSize"].forEach(function (a) {
                    var b = f[a], c = /%$/.test(b);
                    b = w(b);
                    p[a] = c ? r * b / 100 : b
                }), c.minPxSize = p.minSize, c.maxPxSize = Math.max(p.maxSize, p.minSize), c = c.zData.filter(I), c.length && (t = F(f.zMin, u(d(c), !1 === f.displayNegative ? f.zThreshold : -Number.MAX_VALUE, t)), y = F(f.zMax, Math.max(y, e(c))))))
            });
            C.forEach(function (d) {
                var e = d[k], f = e.length;
                a && d.getRadii(t, y, d);
                if (0 < B) for (; f--;) if (I(e[f]) && b.dataMin <= e[f] && e[f] <= b.max) {
                    var g = d.radii ? d.radii[f] : 0;
                    c = Math.min((e[f] -
                        h) * A - g, c);
                    l = Math.max((e[f] - h) * A + g, l)
                }
            });
            C.length && 0 < B && !this.logarithmic && (l -= f, A *= (f + Math.max(0, c) - Math.min(l, f)) / f, [["min", "userMin", c], ["max", "userMax", l]].forEach(function (a) {
                "undefined" === typeof F(b.options[a[0]], b[a[1]]) && (b[a[0]] += a[2] / A)
            }))
        };
        A.registerSeriesType("bubble", t);
        "";
        "";
        return t
    });
    J(b, "Series/MapBubble/MapBubblePoint.js", [b["Core/Series/SeriesRegistry.js"], b["Core/Utilities.js"]], function (b, f) {
        var B = this && this.__extends || function () {
            var b = function (f, p) {
                b = Object.setPrototypeOf || {__proto__: []} instanceof
                    Array && function (b, f) {
                        b.__proto__ = f
                    } || function (b, f) {
                        for (var e in f) f.hasOwnProperty(e) && (b[e] = f[e])
                    };
                return b(f, p)
            };
            return function (f, p) {
                function l() {
                    this.constructor = f
                }

                b(f, p);
                f.prototype = null === p ? Object.create(p) : (l.prototype = p.prototype, new l)
            }
        }(), y = b.seriesTypes, C = y.map;
        b = f.extend;
        var A = f.merge;
        f = function (b) {
            function f() {
                return null !== b && b.apply(this, arguments) || this
            }

            B(f, b);
            f.prototype.applyOptions = function (f, l) {
                return f && "undefined" !== typeof f.lat && "undefined" !== typeof f.lon ? b.prototype.applyOptions.call(this,
                    A(f, this.series.chart.fromLatLonToPoint(f)), l) : C.prototype.pointClass.prototype.applyOptions.call(this, f, l)
            };
            f.prototype.isValid = function () {
                return "number" === typeof this.z
            };
            return f
        }(y.bubble.prototype.pointClass);
        b(f.prototype, {ttBelow: !1});
        return f
    });
    J(b, "Series/MapBubble/MapBubbleSeries.js", [b["Series/Bubble/BubbleSeries.js"], b["Series/MapBubble/MapBubblePoint.js"], b["Series/Map/MapSeries.js"], b["Core/Series/SeriesRegistry.js"], b["Core/Utilities.js"]], function (b, f, D, y, C) {
        var B = this && this.__extends ||
            function () {
                var b = function (f, g) {
                    b = Object.setPrototypeOf || {__proto__: []} instanceof Array && function (b, d) {
                        b.__proto__ = d
                    } || function (b, d) {
                        for (var e in d) d.hasOwnProperty(e) && (b[e] = d[e])
                    };
                    return b(f, g)
                };
                return function (f, g) {
                    function e() {
                        this.constructor = f
                    }

                    b(f, g);
                    f.prototype = null === g ? Object.create(g) : (e.prototype = g.prototype, new e)
                }
            }(), t = C.extend, r = C.merge;
        C = function (f) {
            function l() {
                var b = null !== f && f.apply(this, arguments) || this;
                b.data = void 0;
                b.options = void 0;
                b.points = void 0;
                return b
            }

            B(l, f);
            l.defaultOptions =
                r(b.defaultOptions, {animationLimit: 500, tooltip: {pointFormat: "{point.name}: {point.z}"}});
            return l
        }(b);
        t(C.prototype, {
            type: "mapbubble",
            getBox: D.prototype.getBox,
            pointArrayMap: ["z"],
            pointClass: f,
            setData: D.prototype.setData,
            setOptions: D.prototype.setOptions,
            xyFromShape: !0
        });
        y.registerSeriesType("mapbubble", C);
        "";
        return C
    });
    J(b, "Series/Heatmap/HeatmapPoint.js", [b["Mixins/ColorMapSeries.js"], b["Core/Series/SeriesRegistry.js"], b["Core/Utilities.js"]], function (b, f, D) {
        var y = this && this.__extends || function () {
            var b =
                function (f, l) {
                    b = Object.setPrototypeOf || {__proto__: []} instanceof Array && function (b, e) {
                        b.__proto__ = e
                    } || function (b, e) {
                        for (var d in e) e.hasOwnProperty(d) && (b[d] = e[d])
                    };
                    return b(f, l)
                };
            return function (f, l) {
                function g() {
                    this.constructor = f
                }

                b(f, l);
                f.prototype = null === l ? Object.create(l) : (g.prototype = l.prototype, new g)
            }
        }();
        b = b.colorMapPointMixin;
        var B = D.clamp, A = D.extend, t = D.pick;
        f = function (b) {
            function f() {
                var f = null !== b && b.apply(this, arguments) || this;
                f.options = void 0;
                f.series = void 0;
                f.value = void 0;
                f.x = void 0;
                f.y = void 0;
                return f
            }

            y(f, b);
            f.prototype.applyOptions = function (f, g) {
                f = b.prototype.applyOptions.call(this, f, g);
                f.formatPrefix = f.isNull || null === f.value ? "null" : "point";
                return f
            };
            f.prototype.getCellAttributes = function () {
                var b = this.series, f = b.options, e = (f.colsize || 1) / 2, d = (f.rowsize || 1) / 2, p = b.xAxis,
                    r = b.yAxis, y = this.options.marker || b.options.marker;
                b = b.pointPlacementToXValue();
                var A = t(this.pointPadding, f.pointPadding, 0), C = {
                    x1: B(Math.round(p.len - (p.translate(this.x - e, !1, !0, !1, !0, -b) || 0)), -p.len, 2 * p.len),
                    x2: B(Math.round(p.len -
                        (p.translate(this.x + e, !1, !0, !1, !0, -b) || 0)), -p.len, 2 * p.len),
                    y1: B(Math.round(r.translate(this.y - d, !1, !0, !1, !0) || 0), -r.len, 2 * r.len),
                    y2: B(Math.round(r.translate(this.y + d, !1, !0, !1, !0) || 0), -r.len, 2 * r.len)
                };
                [["width", "x"], ["height", "y"]].forEach(function (b) {
                    var d = b[0];
                    b = b[1];
                    var e = b + "1", f = b + "2", c = Math.abs(C[e] - C[f]), g = y && y.lineWidth || 0,
                        a = Math.abs(C[e] + C[f]) / 2;
                    y[d] && y[d] < c && (C[e] = a - y[d] / 2 - g / 2, C[f] = a + y[d] / 2 + g / 2);
                    A && ("y" === b && (e = f, f = b + "1"), C[e] += A, C[f] -= A)
                });
                return C
            };
            f.prototype.haloPath = function (b) {
                if (!b) return [];
                var f = this.shapeArgs;
                return ["M", f.x - b, f.y - b, "L", f.x - b, f.y + f.height + b, f.x + f.width + b, f.y + f.height + b, f.x + f.width + b, f.y - b, "Z"]
            };
            f.prototype.isValid = function () {
                return Infinity !== this.value && -Infinity !== this.value
            };
            return f
        }(f.seriesTypes.scatter.prototype.pointClass);
        A(f.prototype, {dataLabelOnNull: b.dataLabelOnNull, moveToTopOnHover: b.moveToTopOnHover});
        return f
    });
    J(b, "Series/Heatmap/HeatmapSeries.js", [b["Mixins/ColorMapSeries.js"], b["Core/Globals.js"], b["Series/Heatmap/HeatmapPoint.js"], b["Mixins/LegendSymbol.js"],
        b["Core/Color/Palette.js"], b["Core/Series/SeriesRegistry.js"], b["Core/Renderer/SVG/SVGRenderer.js"], b["Core/Utilities.js"]], function (b, f, D, y, C, A, t, r) {
        var p = this && this.__extends || function () {
            var b = function (d, e) {
                b = Object.setPrototypeOf || {__proto__: []} instanceof Array && function (b, d) {
                    b.__proto__ = d
                } || function (b, d) {
                    for (var a in d) d.hasOwnProperty(a) && (b[a] = d[a])
                };
                return b(d, e)
            };
            return function (d, e) {
                function c() {
                    this.constructor = d
                }

                b(d, e);
                d.prototype = null === e ? Object.create(e) : (c.prototype = e.prototype, new c)
            }
        }();
        b = b.colorMapSeriesMixin;
        var l = A.series, g = A.seriesTypes, e = g.column, d = g.scatter, u = t.prototype.symbols, B = r.extend,
            I = r.fireEvent, K = r.isNumber, F = r.merge, w = r.pick;
        t = function (b) {
            function e() {
                var d = null !== b && b.apply(this, arguments) || this;
                d.colorAxis = void 0;
                d.data = void 0;
                d.options = void 0;
                d.points = void 0;
                d.valueMax = NaN;
                d.valueMin = NaN;
                return d
            }

            p(e, b);
            e.prototype.drawPoints = function () {
                var b = this;
                if ((this.options.marker || {}).enabled || this._hasPointMarkers) l.prototype.drawPoints.call(this), this.points.forEach(function (c) {
                    c.graphic &&
                    c.graphic[b.chart.styledMode ? "css" : "animate"](b.colorAttribs(c))
                })
            };
            e.prototype.getExtremes = function () {
                var b = l.prototype.getExtremes.call(this, this.valueData), c = b.dataMin;
                b = b.dataMax;
                K(c) && (this.valueMin = c);
                K(b) && (this.valueMax = b);
                return l.prototype.getExtremes.call(this)
            };
            e.prototype.getValidPoints = function (b, c) {
                return l.prototype.getValidPoints.call(this, b, c, !0)
            };
            e.prototype.hasData = function () {
                return !!this.processedXData.length
            };
            e.prototype.init = function () {
                l.prototype.init.apply(this, arguments);
                var b = this.options;
                b.pointRange = w(b.pointRange, b.colsize || 1);
                this.yAxis.axisPointRange = b.rowsize || 1;
                B(u, {ellipse: u.circle})
            };
            e.prototype.markerAttribs = function (b, c) {
                var d = b.marker || {}, a = this.options.marker || {}, e = b.shapeArgs || {}, f = {};
                if (b.hasImage) return {x: b.plotX, y: b.plotY};
                if (c) {
                    var g = a.states[c] || {};
                    var l = d.states && d.states[c] || {};
                    [["width", "x"], ["height", "y"]].forEach(function (a) {
                        f[a[0]] = (l[a[0]] || g[a[0]] || e[a[0]]) + (l[a[0] + "Plus"] || g[a[0] + "Plus"] || 0);
                        f[a[1]] = e[a[1]] + (e[a[0]] - f[a[0]]) / 2
                    })
                }
                return c ?
                    f : e
            };
            e.prototype.pointAttribs = function (b, c) {
                var d = l.prototype.pointAttribs.call(this, b, c), a = this.options || {},
                    e = this.chart.options.plotOptions || {}, g = e.series || {}, m = e.heatmap || {};
                e = a.borderColor || m.borderColor || g.borderColor;
                g = a.borderWidth || m.borderWidth || g.borderWidth || d["stroke-width"];
                d.stroke = b && b.marker && b.marker.lineColor || a.marker && a.marker.lineColor || e || this.color;
                d["stroke-width"] = g;
                c && (b = F(a.states[c], a.marker && a.marker.states[c], b && b.options.states && b.options.states[c] || {}), c = b.brightness,
                    d.fill = b.color || f.color(d.fill).brighten(c || 0).get(), d.stroke = b.lineColor);
                return d
            };
            e.prototype.setClip = function (b) {
                var c = this.chart;
                l.prototype.setClip.apply(this, arguments);
                (!1 !== this.options.clip || b) && this.markerGroup.clip((b || this.clipBox) && this.sharedClipKey ? c.sharedClips[this.sharedClipKey] : c.clipRect)
            };
            e.prototype.translate = function () {
                var b = this.options, c = b.marker && b.marker.symbol || "", d = u[c] ? c : "rect",
                    a = -1 !== ["circle", "square"].indexOf(d);
                this.generatePoints();
                this.points.forEach(function (b) {
                    var e =
                        b.getCellAttributes(), f = {};
                    f.x = Math.min(e.x1, e.x2);
                    f.y = Math.min(e.y1, e.y2);
                    f.width = Math.max(Math.abs(e.x2 - e.x1), 0);
                    f.height = Math.max(Math.abs(e.y2 - e.y1), 0);
                    var g = b.hasImage = 0 === (b.marker && b.marker.symbol || c || "").indexOf("url");
                    if (a) {
                        var k = Math.abs(f.width - f.height);
                        f.x = Math.min(e.x1, e.x2) + (f.width < f.height ? 0 : k / 2);
                        f.y = Math.min(e.y1, e.y2) + (f.width < f.height ? k / 2 : 0);
                        f.width = f.height = Math.min(f.width, f.height)
                    }
                    k = {
                        plotX: (e.x1 + e.x2) / 2,
                        plotY: (e.y1 + e.y2) / 2,
                        clientX: (e.x1 + e.x2) / 2,
                        shapeType: "path",
                        shapeArgs: F(!0,
                            f, {d: u[d](f.x, f.y, f.width, f.height)})
                    };
                    g && (b.marker = {width: f.width, height: f.height});
                    B(b, k)
                });
                I(this, "afterTranslate")
            };
            e.defaultOptions = F(d.defaultOptions, {
                animation: !1,
                borderWidth: 0,
                nullColor: C.neutralColor3,
                dataLabels: {
                    formatter: function () {
                        return this.point.value
                    }, inside: !0, verticalAlign: "middle", crop: !1, overflow: !1, padding: 0
                },
                marker: {symbol: "rect", radius: 0, lineColor: void 0, states: {hover: {lineWidthPlus: 0}, select: {}}},
                clip: !0,
                pointRange: null,
                tooltip: {pointFormat: "{point.x}, {point.y}: {point.value}<br/>"},
                states: {hover: {halo: !1, brightness: .2}}
            });
            return e
        }(d);
        B(t.prototype, {
            alignDataLabel: e.prototype.alignDataLabel,
            axisTypes: b.axisTypes,
            colorAttribs: b.colorAttribs,
            colorKey: b.colorKey,
            directTouch: !0,
            drawLegendSymbol: y.drawRectangle,
            getExtremesFromAll: !0,
            getSymbol: l.prototype.getSymbol,
            parallelArrays: b.parallelArrays,
            pointArrayMap: ["y", "value"],
            pointClass: D,
            trackerGroups: b.trackerGroups
        });
        A.registerSeriesType("heatmap", t);
        "";
        "";
        return t
    });
    J(b, "Extensions/GeoJSON.js", [b["Core/Chart/Chart.js"], b["Core/FormatUtilities.js"],
        b["Core/Globals.js"], b["Core/Utilities.js"]], function (b, f, D, y) {
        function B(b, e) {
            var d, f = !1, g = b.x, l = b.y;
            b = 0;
            for (d = e.length - 1; b < e.length; d = b++) {
                var p = e[b][1] > l;
                var r = e[d][1] > l;
                p !== r && g < (e[d][0] - e[b][0]) * (l - e[b][1]) / (e[d][1] - e[b][1]) + e[b][0] && (f = !f)
            }
            return f
        }

        var A = f.format, t = D.win, r = y.error, p = y.extend, l = y.merge;
        f = y.wrap;
        "";
        b.prototype.transformFromLatLon = function (b, e) {
            var d = this.userOptions.chart && this.userOptions.chart.proj4 || t.proj4;
            if (!d) return r(21, !1, this), {x: 0, y: null};
            b = d(e.crs, [b.lon, b.lat]);
            d =
                e.cosAngle || e.rotation && Math.cos(e.rotation);
            var f = e.sinAngle || e.rotation && Math.sin(e.rotation);
            b = e.rotation ? [b[0] * d + b[1] * f, -b[0] * f + b[1] * d] : b;
            return {
                x: ((b[0] - (e.xoffset || 0)) * (e.scale || 1) + (e.xpan || 0)) * (e.jsonres || 1) + (e.jsonmarginX || 0),
                y: (((e.yoffset || 0) - b[1]) * (e.scale || 1) + (e.ypan || 0)) * (e.jsonres || 1) - (e.jsonmarginY || 0)
            }
        };
        b.prototype.transformToLatLon = function (b, e) {
            if ("undefined" === typeof t.proj4) r(21, !1, this); else {
                b = {
                    x: ((b.x - (e.jsonmarginX || 0)) / (e.jsonres || 1) - (e.xpan || 0)) / (e.scale || 1) + (e.xoffset || 0),
                    y: ((-b.y - (e.jsonmarginY || 0)) / (e.jsonres || 1) + (e.ypan || 0)) / (e.scale || 1) + (e.yoffset || 0)
                };
                var d = e.cosAngle || e.rotation && Math.cos(e.rotation),
                    f = e.sinAngle || e.rotation && Math.sin(e.rotation);
                e = t.proj4(e.crs, "WGS84", e.rotation ? {x: b.x * d + b.y * -f, y: b.x * f + b.y * d} : b);
                return {lat: e.y, lon: e.x}
            }
        };
        b.prototype.fromPointToLatLon = function (b) {
            var e = this.mapTransforms, d;
            if (e) {
                for (d in e) if (Object.hasOwnProperty.call(e, d) && e[d].hitZone && B({
                    x: b.x,
                    y: -b.y
                }, e[d].hitZone.coordinates[0])) return this.transformToLatLon(b, e[d]);
                return this.transformToLatLon(b,
                    e["default"])
            }
            r(22, !1, this)
        };
        b.prototype.fromLatLonToPoint = function (b) {
            var e = this.mapTransforms, d;
            if (!e) return r(22, !1, this), {x: 0, y: null};
            for (d in e) if (Object.hasOwnProperty.call(e, d) && e[d].hitZone) {
                var f = this.transformFromLatLon(b, e[d]);
                if (B({x: f.x, y: -f.y}, e[d].hitZone.coordinates[0])) return f
            }
            return this.transformFromLatLon(b, e["default"])
        };
        D.geojson = function (b, e, d) {
            var f = [], g = [], l = function (b) {
                b.forEach(function (b, d) {
                    0 === d ? g.push(["M", b[0], -b[1]]) : g.push(["L", b[0], -b[1]])
                })
            };
            e = e || "map";
            b.features.forEach(function (b) {
                var d =
                    b.geometry, r = d.type;
                d = d.coordinates;
                b = b.properties;
                var t;
                g = [];
                "map" === e || "mapbubble" === e ? ("Polygon" === r ? (d.forEach(l), g.push(["Z"])) : "MultiPolygon" === r && (d.forEach(function (b) {
                    b.forEach(l)
                }), g.push(["Z"])), g.length && (t = {path: g})) : "mapline" === e ? ("LineString" === r ? l(d) : "MultiLineString" === r && d.forEach(l), g.length && (t = {path: g})) : "mappoint" === e && "Point" === r && (t = {
                    x: d[0],
                    y: -d[1]
                });
                t && f.push(p(t, {name: b.name || b.NAME, properties: b}))
            });
            d && b.copyrightShort && (d.chart.mapCredits = A(d.chart.options.credits.mapText,
                {geojson: b}), d.chart.mapCreditsFull = A(d.chart.options.credits.mapTextFull, {geojson: b}));
            return f
        };
        f(b.prototype, "addCredits", function (b, e) {
            e = l(!0, this.options.credits, e);
            this.mapCredits && (e.href = null);
            b.call(this, e);
            this.credits && this.mapCreditsFull && this.credits.attr({title: this.mapCreditsFull})
        })
    });
    J(b, "masters/modules/map.src.js", [b["Core/Globals.js"], b["Core/Chart/MapChart.js"]], function (b, f) {
        b.MapChart = f;
        b.mapChart = b.Map = f.mapChart;
        b.maps = f.maps
    });
    J(b, "masters/highmaps.src.js", [b["masters/highcharts.src.js"]],
        function (b) {
            b.product = "Highmaps";
            return b
        });
    b["masters/highmaps.src.js"]._modules = b;
    return b["masters/highmaps.src.js"]
});
//# sourceMappingURL=highmaps.js.map
