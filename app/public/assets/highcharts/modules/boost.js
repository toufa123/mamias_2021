/*
 Highcharts JS v9.0.0 (2021-02-02)

 Boost module

 (c) 2010-2019 Highsoft AS
 Author: Torstein Honsi

 License: www.highcharts.com/license

*/
(function (b) {
    "object" === typeof module && module.exports ? (b["default"] = b, module.exports = b) : "function" === typeof define && define.amd ? define("highcharts/modules/boost", ["highcharts"], function (q) {
        b(q);
        b.Highcharts = q;
        return b
    }) : b("undefined" !== typeof Highcharts ? Highcharts : void 0)
})(function (b) {
    function q(b, E, h, x) {
        b.hasOwnProperty(E) || (b[E] = x.apply(null, h))
    }

    b = b ? b._modules : {};
    q(b, "Extensions/Boost/Boostables.js", [], function () {
        return "area arearange column columnrange bar line scatter heatmap bubble treemap".split(" ")
    });
    q(b, "Extensions/Boost/BoostableMap.js", [b["Extensions/Boost/Boostables.js"]], function (b) {
        var H = {};
        b.forEach(function (b) {
            H[b] = 1
        });
        return H
    });
    q(b, "Extensions/Boost/WGLShader.js", [b["Core/Utilities.js"]], function (b) {
        var H = b.clamp, h = b.error, x = b.pick;
        return function (c) {
            function b() {
                r.length && h("[highcharts boost] shader error - " + r.join("\n"))
            }

            function u(a, k) {
                var d = c.createShader("vertex" === k ? c.VERTEX_SHADER : c.FRAGMENT_SHADER);
                c.shaderSource(d, a);
                c.compileShader(d);
                return c.getShaderParameter(d, c.COMPILE_STATUS) ?
                    d : (r.push("when compiling " + k + " shader:\n" + c.getShaderInfoLog(d)), !1)
            }

            function n() {
                function d(a) {
                    return c.getUniformLocation(e, a)
                }

                var K = u("#version 100\n#define LN10 2.302585092994046\nprecision highp float;\nattribute vec4 aVertexPosition;\nattribute vec4 aColor;\nvarying highp vec2 position;\nvarying highp vec4 vColor;\nuniform mat4 uPMatrix;\nuniform float pSize;\nuniform float translatedThreshold;\nuniform bool hasThreshold;\nuniform bool skipTranslation;\nuniform float xAxisTrans;\nuniform float xAxisMin;\nuniform float xAxisMinPad;\nuniform float xAxisPointRange;\nuniform float xAxisLen;\nuniform bool  xAxisPostTranslate;\nuniform float xAxisOrdinalSlope;\nuniform float xAxisOrdinalOffset;\nuniform float xAxisPos;\nuniform bool  xAxisCVSCoord;\nuniform bool  xAxisIsLog;\nuniform bool  xAxisReversed;\nuniform float yAxisTrans;\nuniform float yAxisMin;\nuniform float yAxisMinPad;\nuniform float yAxisPointRange;\nuniform float yAxisLen;\nuniform bool  yAxisPostTranslate;\nuniform float yAxisOrdinalSlope;\nuniform float yAxisOrdinalOffset;\nuniform float yAxisPos;\nuniform bool  yAxisCVSCoord;\nuniform bool  yAxisIsLog;\nuniform bool  yAxisReversed;\nuniform bool  isBubble;\nuniform bool  bubbleSizeByArea;\nuniform float bubbleZMin;\nuniform float bubbleZMax;\nuniform float bubbleZThreshold;\nuniform float bubbleMinSize;\nuniform float bubbleMaxSize;\nuniform bool  bubbleSizeAbs;\nuniform bool  isInverted;\nfloat bubbleRadius(){\nfloat value = aVertexPosition.w;\nfloat zMax = bubbleZMax;\nfloat zMin = bubbleZMin;\nfloat radius = 0.0;\nfloat pos = 0.0;\nfloat zRange = zMax - zMin;\nif (bubbleSizeAbs){\nvalue = value - bubbleZThreshold;\nzMax = max(zMax - bubbleZThreshold, zMin - bubbleZThreshold);\nzMin = 0.0;\n}\nif (value < zMin){\nradius = bubbleZMin / 2.0 - 1.0;\n} else {\npos = zRange > 0.0 ? (value - zMin) / zRange : 0.5;\nif (bubbleSizeByArea && pos > 0.0){\npos = sqrt(pos);\n}\nradius = ceil(bubbleMinSize + pos * (bubbleMaxSize - bubbleMinSize)) / 2.0;\n}\nreturn radius * 2.0;\n}\nfloat translate(float val,\nfloat pointPlacement,\nfloat localA,\nfloat localMin,\nfloat minPixelPadding,\nfloat pointRange,\nfloat len,\nbool  cvsCoord,\nbool  isLog,\nbool  reversed\n){\nfloat sign = 1.0;\nfloat cvsOffset = 0.0;\nif (cvsCoord) {\nsign *= -1.0;\ncvsOffset = len;\n}\nif (isLog) {\nval = log(val) / LN10;\n}\nif (reversed) {\nsign *= -1.0;\ncvsOffset -= sign * len;\n}\nreturn sign * (val - localMin) * localA + cvsOffset + \n(sign * minPixelPadding);\n}\nfloat xToPixels(float value) {\nif (skipTranslation){\nreturn value;// + xAxisPos;\n}\nreturn translate(value, 0.0, xAxisTrans, xAxisMin, xAxisMinPad, xAxisPointRange, xAxisLen, xAxisCVSCoord, xAxisIsLog, xAxisReversed);// + xAxisPos;\n}\nfloat yToPixels(float value, float checkTreshold) {\nfloat v;\nif (skipTranslation){\nv = value;// + yAxisPos;\n} else {\nv = translate(value, 0.0, yAxisTrans, yAxisMin, yAxisMinPad, yAxisPointRange, yAxisLen, yAxisCVSCoord, yAxisIsLog, yAxisReversed);// + yAxisPos;\nif (v > yAxisLen) {\nv = yAxisLen;\n}\n}\nif (checkTreshold > 0.0 && hasThreshold) {\nv = min(v, translatedThreshold);\n}\nreturn v;\n}\nvoid main(void) {\nif (isBubble){\ngl_PointSize = bubbleRadius();\n} else {\ngl_PointSize = pSize;\n}\nvColor = aColor;\nif (skipTranslation && isInverted) {\ngl_Position = uPMatrix * vec4(aVertexPosition.y + yAxisPos, aVertexPosition.x + xAxisPos, 0.0, 1.0);\n} else if (isInverted) {\ngl_Position = uPMatrix * vec4(yToPixels(aVertexPosition.y, aVertexPosition.z) + yAxisPos, xToPixels(aVertexPosition.x) + xAxisPos, 0.0, 1.0);\n} else {\ngl_Position = uPMatrix * vec4(xToPixels(aVertexPosition.x) + xAxisPos, yToPixels(aVertexPosition.y, aVertexPosition.z) + yAxisPos, 0.0, 1.0);\n}\n}",
                    "vertex"),
                    n = u("precision highp float;\nuniform vec4 fillColor;\nvarying highp vec2 position;\nvarying highp vec4 vColor;\nuniform sampler2D uSampler;\nuniform bool isCircle;\nuniform bool hasColor;\nvoid main(void) {\nvec4 col = fillColor;\nvec4 tcol = texture2D(uSampler, gl_PointCoord.st);\nif (hasColor) {\ncol = vColor;\n}\nif (isCircle) {\ncol *= tcol;\nif (tcol.r < 0.0) {\ndiscard;\n} else {\ngl_FragColor = col;\n}\n} else {\ngl_FragColor = col;\n}\n}", "fragment");
                if (!K || !n) return e = !1, b(), !1;
                e = c.createProgram();
                c.attachShader(e, K);
                c.attachShader(e, n);
                c.linkProgram(e);
                if (!c.getProgramParameter(e, c.LINK_STATUS)) return r.push(c.getProgramInfoLog(e)), b(), e = !1;
                c.useProgram(e);
                c.bindAttribLocation(e, 0, "aVertexPosition");
                f = d("uPMatrix");
                m = d("pSize");
                p = d("fillColor");
                z = d("isBubble");
                N = d("bubbleSizeAbs");
                y = d("bubbleSizeByArea");
                k = d("uSampler");
                O = d("skipTranslation");
                D = d("isCircle");
                a = d("isInverted");
                return !0
            }

            function t(a, k) {
                c && e && (a = v[a] = v[a] || c.getUniformLocation(e, a), c.uniform1f(a, k))
            }

            var v =
                {}, e, f, m, p, z, N, y, O, D, a, r = [], k;
            return c && !n() ? !1 : {
                psUniform: function () {
                    return m
                }, pUniform: function () {
                    return f
                }, fillColorUniform: function () {
                    return p
                }, setBubbleUniforms: function (a, k, f) {
                    var d = a.options, b = Number.MAX_VALUE, K = -Number.MAX_VALUE;
                    c && e && "bubble" === a.type && (b = x(d.zMin, H(k, !1 === d.displayNegative ? d.zThreshold : -Number.MAX_VALUE, b)), K = x(d.zMax, Math.max(K, f)), c.uniform1i(z, 1), c.uniform1i(D, 1), c.uniform1i(y, "width" !== a.options.sizeBy), c.uniform1i(N, a.options.sizeByAbsoluteValue), t("bubbleZMin", b),
                        t("bubbleZMax", K), t("bubbleZThreshold", a.options.zThreshold), t("bubbleMinSize", a.minPxSize), t("bubbleMaxSize", a.maxPxSize))
                }, bind: function () {
                    c && e && c.useProgram(e)
                }, program: function () {
                    return e
                }, create: n, setUniform: t, setPMatrix: function (a) {
                    c && e && c.uniformMatrix4fv(f, !1, a)
                }, setColor: function (a) {
                    c && e && c.uniform4f(p, a[0] / 255, a[1] / 255, a[2] / 255, a[3])
                }, setPointSize: function (a) {
                    c && e && c.uniform1f(m, a)
                }, setSkipTranslation: function (a) {
                    c && e && c.uniform1i(O, !0 === a ? 1 : 0)
                }, setTexture: function (a) {
                    c && e && c.uniform1i(k,
                        a)
                }, setDrawAsCircle: function (a) {
                    c && e && c.uniform1i(D, a ? 1 : 0)
                }, reset: function () {
                    c && e && (c.uniform1i(z, 0), c.uniform1i(D, 0))
                }, setInverted: function (d) {
                    c && e && c.uniform1i(a, d)
                }, destroy: function () {
                    c && e && (c.deleteProgram(e), e = !1)
                }
            }
        }
    });
    q(b, "Extensions/Boost/WGLVBuffer.js", [], function () {
        return function (b, E, h) {
            function H() {
                c && (b.deleteBuffer(c), l = c = !1);
                t = 0;
                u = h || 2;
                v = []
            }

            var c = !1, l = !1, u = h || 2, n = !1, t = 0, v;
            return {
                destroy: H, bind: function () {
                    if (!c) return !1;
                    b.vertexAttribPointer(l, u, b.FLOAT, !1, 0, 0)
                }, data: v, build: function (e,
                                             f, m) {
                    var p;
                    v = e || [];
                    if (!(v && 0 !== v.length || n)) return H(), !1;
                    u = m || u;
                    c && b.deleteBuffer(c);
                    n || (p = new Float32Array(v));
                    c = b.createBuffer();
                    b.bindBuffer(b.ARRAY_BUFFER, c);
                    b.bufferData(b.ARRAY_BUFFER, n || p, b.STATIC_DRAW);
                    l = b.getAttribLocation(E.program(), f);
                    b.enableVertexAttribArray(l);
                    return !0
                }, render: function (e, f, m) {
                    var p = n ? n.length : v.length;
                    if (!c || !p) return !1;
                    if (!e || e > p || 0 > e) e = 0;
                    if (!f || f > p) f = p;
                    b.drawArrays(b[(m || "points").toUpperCase()], e / u, (f - e) / u);
                    return !0
                }, allocate: function (b) {
                    t = -1;
                    n = new Float32Array(4 *
                        b)
                }, push: function (b, f, c, p) {
                    n && (n[++t] = b, n[++t] = f, n[++t] = c, n[++t] = p)
                }
            }
        }
    });
    q(b, "Extensions/Boost/WGLRenderer.js", [b["Core/Color/Color.js"], b["Extensions/Boost/WGLShader.js"], b["Extensions/Boost/WGLVBuffer.js"], b["Core/Globals.js"], b["Core/Utilities.js"]], function (b, E, h, x, c) {
        var H = b.parse, u = x.doc, n = c.isNumber, t = c.isObject, v = c.merge, e = c.objectEach, f = c.pick;
        return function (c) {
            function m(a) {
                if (a.isSeriesBoosting) {
                    var d = !!a.options.stacking;
                    var b = a.xData || a.options.xData || a.processedXData;
                    d = (d ? a.data : b ||
                        a.options.data).length;
                    "treemap" === a.type ? d *= 12 : "heatmap" === a.type ? d *= 6 : ha[a.type] && (d *= 2);
                    return d
                }
                return 0
            }

            function z() {
                g.clear(g.COLOR_BUFFER_BIT | g.DEPTH_BUFFER_BIT)
            }

            function N(a, d) {
                function g(a) {
                    a && (d.colorData.push(a[0]), d.colorData.push(a[1]), d.colorData.push(a[2]), d.colorData.push(a[3]))
                }

                function k(a, d, b, k, c) {
                    g(c);
                    B.usePreallocated ? (K.push(a, d, b ? 1 : 0, k || 1), ma += 4) : (S.push(a), S.push(d), S.push(b ? 1 : 0), S.push(k || 1))
                }

                function c() {
                    d.segments.length && (d.segments[d.segments.length - 1].to = S.length || ma)
                }

                function f() {
                    d.segments.length && d.segments[d.segments.length - 1].from === (S.length || ma) || (c(), d.segments.push({from: S.length || ma}))
                }

                function D(a, d, b, c, f) {
                    g(f);
                    k(a + b, d);
                    g(f);
                    k(a, d);
                    g(f);
                    k(a, d + c);
                    g(f);
                    k(a, d + c);
                    g(f);
                    k(a + b, d + c);
                    g(f);
                    k(a + b, d)
                }

                function r(a, b) {
                    B.useGPUTranslations || (d.skipTranslation = !0, a.x = x.toPixels(a.x, !0), a.y = v.toPixels(a.y, !0));
                    b ? S = [a.x, a.y, 0, 2].concat(S) : k(a.x, a.y, 0, 2)
                }

                var m = a.pointArrayMap && "low,high" === a.pointArrayMap.join(","), e = a.chart, A = a.options,
                    Y = !!A.stacking, p = A.data, n = a.xAxis.getExtremes(),
                    h = n.min;
                n = n.max;
                var z = a.yAxis.getExtremes(), u = z.min;
                z = z.max;
                var y = a.xData || A.xData || a.processedXData, N = a.yData || A.yData || a.processedYData,
                    l = a.zData || A.zData || a.processedZData, v = a.yAxis, x = a.xAxis, O = a.chart.plotWidth,
                    R = !y || 0 === y.length, E = A.connectNulls, w = a.points || !1, q = !1, I = !1, G;
                y = Y ? a.data : y || p;
                var Q = {x: Number.MAX_VALUE, y: 0}, M = {x: -Number.MAX_VALUE, y: 0}, P = 0, Ga = !1, L = -1, X = !1,
                    ea = !1, W = "undefined" === typeof e.index, ya = !1, Ba = !1;
                var C = !1;
                var Oa = ha[a.type], za = !1, Ha = !0, Ca = !0, la = A.zones || !1, fa = !1, Ia = A.threshold,
                    Aa = !1;
                if (!(A.boostData && 0 < A.boostData.length)) {
                    A.gapSize && (Aa = "value" !== A.gapUnit ? A.gapSize * a.closestPointRange : A.gapSize);
                    la && (la.some(function (a) {
                        return "undefined" === typeof a.value ? (fa = new b(a.color), !0) : !1
                    }), fa || (fa = a.pointAttribs && a.pointAttribs().fill || a.color, fa = new b(fa)));
                    e.inverted && (O = a.chart.plotHeight);
                    a.closestPointRangePx = Number.MAX_VALUE;
                    f();
                    if (w && 0 < w.length) d.skipTranslation = !0, d.drawMode = "triangles", w[0].node && w[0].node.levelDynamic && w.sort(function (a, d) {
                        if (a.node) {
                            if (a.node.levelDynamic >
                                d.node.levelDynamic) return 1;
                            if (a.node.levelDynamic < d.node.levelDynamic) return -1
                        }
                        return 0
                    }), w.forEach(function (d) {
                        var b = d.plotY;
                        if ("undefined" !== typeof b && !isNaN(b) && null !== d.y) {
                            b = d.shapeArgs;
                            var g = e.styledMode ? d.series.colorAttribs(d) : g = d.series.pointAttribs(d);
                            d = g["stroke-width"] || 0;
                            C = H(g.fill).rgba;
                            C[0] /= 255;
                            C[1] /= 255;
                            C[2] /= 255;
                            "treemap" === a.type && (d = d || 1, G = H(g.stroke).rgba, G[0] /= 255, G[1] /= 255, G[2] /= 255, D(b.x, b.y, b.width, b.height, G), d /= 2);
                            "heatmap" === a.type && e.inverted && (b.x = x.len - b.x, b.y = v.len -
                                b.y, b.width = -b.width, b.height = -b.height);
                            D(b.x + d, b.y + d, b.width - 2 * d, b.height - 2 * d, C)
                        }
                    }); else {
                        for (; L < y.length - 1;) {
                            var J = y[++L];
                            if (W) break;
                            w = p && p[L];
                            !R && t(w, !0) && w.color && (C = H(w.color).rgba, C[0] /= 255, C[1] /= 255, C[2] /= 255);
                            if (R) {
                                w = J[0];
                                var F = J[1];
                                y[L + 1] && (ea = y[L + 1][0]);
                                y[L - 1] && (X = y[L - 1][0]);
                                if (3 <= J.length) {
                                    var Ja = J[2];
                                    J[2] > d.zMax && (d.zMax = J[2]);
                                    J[2] < d.zMin && (d.zMin = J[2])
                                }
                            } else w = J, F = N[L], y[L + 1] && (ea = y[L + 1]), y[L - 1] && (X = y[L - 1]), l && l.length && (Ja = l[L], l[L] > d.zMax && (d.zMax = l[L]), l[L] < d.zMin && (d.zMin = l[L]));
                            if (E || null !== w && null !== F) {
                                ea && ea >= h && ea <= n && (ya = !0);
                                X && X >= h && X <= n && (Ba = !0);
                                if (m) {
                                    R && (F = J.slice(1, 3));
                                    var sa = F[0];
                                    F = F[1]
                                } else Y && (w = J.x, F = J.stackY, sa = F - J.y);
                                null !== u && "undefined" !== typeof u && null !== z && "undefined" !== typeof z && (Ha = F >= u && F <= z);
                                w > n && M.x < n && (M.x = w, M.y = F);
                                w < h && Q.x > h && (Q.x = w, Q.y = F);
                                if (null !== F || !E) if (null !== F && (Ha || ya || Ba)) {
                                    if ((ea >= h || w >= h) && (X <= n || w <= n) && (za = !0), za || ya || Ba) {
                                        Aa && w - X > Aa && f();
                                        la && (C = fa.rgba, la.some(function (a, d) {
                                            d = la[d - 1];
                                            if ("undefined" !== typeof a.value && F <= a.value) {
                                                if (!d ||
                                                    F >= d.value) C = H(a.color).rgba;
                                                return !0
                                            }
                                            return !1
                                        }), C[0] /= 255, C[1] /= 255, C[2] /= 255);
                                        if (!B.useGPUTranslations && (d.skipTranslation = !0, w = x.toPixels(w, !0), F = v.toPixels(F, !0), w > O && "points" === d.drawMode)) continue;
                                        if (Oa) {
                                            J = sa;
                                            if (!1 === sa || "undefined" === typeof sa) J = 0 > F ? F : 0;
                                            m || Y || (J = Math.max(null === Ia ? u : Ia, u));
                                            B.useGPUTranslations || (J = v.toPixels(J, !0));
                                            k(w, J, 0, 0, C)
                                        }
                                        d.hasMarkers && za && !1 !== q && (a.closestPointRangePx = Math.min(a.closestPointRangePx, Math.abs(w - q)));
                                        !B.useGPUTranslations && !B.usePreallocated && q && 1 > Math.abs(w -
                                            q) && I && 1 > Math.abs(F - I) ? B.debug.showSkipSummary && ++P : (A.step && !Ca && k(w, I, 0, 2, C), k(w, F, 0, "bubble" === a.type ? Ja || 1 : 2, C), q = w, I = F, Ga = !0, Ca = !1)
                                    }
                                } else f()
                            } else f()
                        }
                        B.debug.showSkipSummary && console.log("skipped points:", P);
                        Ga || !1 === E || "line_strip" !== a.drawMode || (Q.x < Number.MAX_VALUE && r(Q, !0), M.x > -Number.MAX_VALUE && r(M))
                    }
                    c()
                }
            }

            function y() {
                G = [];
                q.data = S = [];
                I = [];
                K && K.destroy()
            }

            function O(a) {
                d && (d.setUniform("xAxisTrans", a.transA), d.setUniform("xAxisMin", a.min), d.setUniform("xAxisMinPad", a.minPixelPadding), d.setUniform("xAxisPointRange",
                    a.pointRange), d.setUniform("xAxisLen", a.len), d.setUniform("xAxisPos", a.pos), d.setUniform("xAxisCVSCoord", !a.horiz), d.setUniform("xAxisIsLog", !!a.logarithmic), d.setUniform("xAxisReversed", !!a.reversed))
            }

            function D(a) {
                d && (d.setUniform("yAxisTrans", a.transA), d.setUniform("yAxisMin", a.min), d.setUniform("yAxisMinPad", a.minPixelPadding), d.setUniform("yAxisPointRange", a.pointRange), d.setUniform("yAxisLen", a.len), d.setUniform("yAxisPos", a.pos), d.setUniform("yAxisCVSCoord", !a.horiz), d.setUniform("yAxisIsLog",
                    !!a.logarithmic), d.setUniform("yAxisReversed", !!a.reversed))
            }

            function a(a, b) {
                d.setUniform("hasThreshold", a);
                d.setUniform("translatedThreshold", b)
            }

            function r(k) {
                if (k) R = k.chartWidth || 800, l = k.chartHeight || 400; else return !1;
                if (!(g && R && l && d)) return !1;
                B.debug.timeRendering && console.time("gl rendering");
                g.canvas.width = R;
                g.canvas.height = l;
                d.bind();
                g.viewport(0, 0, R, l);
                d.setPMatrix([2 / R, 0, 0, 0, 0, -(2 / l), 0, 0, 0, 0, -2, 0, -1, 1, -1, 1]);
                1 < B.lineWidth && !x.isMS && g.lineWidth(B.lineWidth);
                K.build(q.data, "aVertexPosition",
                    4);
                K.bind();
                d.setInverted(k.inverted);
                G.forEach(function (c, r) {
                    var m = c.series.options, e = m.marker;
                    var p = "undefined" !== typeof m.lineWidth ? m.lineWidth : 1;
                    var A = m.threshold, y = n(A), z = c.series.yAxis.getThreshold(A);
                    A = f(m.marker ? m.marker.enabled : null, c.series.xAxis.isRadial ? !0 : null, c.series.closestPointRangePx > 2 * ((m.marker ? m.marker.radius : 10) || 10));
                    e = W[e && e.symbol || c.series.symbol] || W.circle;
                    if (!(0 === c.segments.length || c.segmentslength && c.segments[0].from === c.segments[0].to)) {
                        e.isReady && (g.bindTexture(g.TEXTURE_2D,
                            e.handle), d.setTexture(e.handle));
                        k.styledMode ? e = c.series.markerGroup && c.series.markerGroup.getStyle("fill") : (e = "points" === c.drawMode && c.series.pointAttribs && c.series.pointAttribs().fill || c.series.color, m.colorByPoint && (e = c.series.chart.options.colors[r]));
                        c.series.fillOpacity && m.fillOpacity && (e = (new b(e)).setOpacity(f(m.fillOpacity, 1)).get());
                        e = H(e).rgba;
                        B.useAlpha || (e[3] = 1);
                        "lines" === c.drawMode && B.useAlpha && 1 > e[3] && (e[3] /= 10);
                        "add" === m.boostBlending ? (g.blendFunc(g.SRC_ALPHA, g.ONE), g.blendEquation(g.FUNC_ADD)) :
                            "mult" === m.boostBlending || "multiply" === m.boostBlending ? g.blendFunc(g.DST_COLOR, g.ZERO) : "darken" === m.boostBlending ? (g.blendFunc(g.ONE, g.ONE), g.blendEquation(g.FUNC_MIN)) : g.blendFuncSeparate(g.SRC_ALPHA, g.ONE_MINUS_SRC_ALPHA, g.ONE, g.ONE_MINUS_SRC_ALPHA);
                        d.reset();
                        0 < c.colorData.length && (d.setUniform("hasColor", 1), r = h(g, d), r.build(c.colorData, "aColor", 4), r.bind());
                        d.setColor(e);
                        O(c.series.xAxis);
                        D(c.series.yAxis);
                        a(y, z);
                        "points" === c.drawMode && (m.marker && n(m.marker.radius) ? d.setPointSize(2 * m.marker.radius) :
                            d.setPointSize(1));
                        d.setSkipTranslation(c.skipTranslation);
                        "bubble" === c.series.type && d.setBubbleUniforms(c.series, c.zMin, c.zMax);
                        d.setDrawAsCircle(M[c.series.type] || !1);
                        if (0 < p || "line_strip" !== c.drawMode) for (p = 0; p < c.segments.length; p++) K.render(c.segments[p].from, c.segments[p].to, c.drawMode);
                        if (c.hasMarkers && A) for (m.marker && n(m.marker.radius) ? d.setPointSize(2 * m.marker.radius) : d.setPointSize(10), d.setDrawAsCircle(!0), p = 0; p < c.segments.length; p++) K.render(c.segments[p].from, c.segments[p].to, "POINTS")
                    }
                });
                B.debug.timeRendering && console.timeEnd("gl rendering");
                c && c();
                y()
            }

            function k(a) {
                z();
                if (a.renderer.forExport) return r(a);
                Q ? r(a) : setTimeout(function () {
                    k(a)
                }, 1)
            }

            var d = !1, K = !1, ma = 0, g = !1, R = 0, l = 0, S = !1, I = !1, q = {}, Q = !1, G = [], W = {},
                ha = {column: !0, columnrange: !0, bar: !0, area: !0, arearange: !0}, M = {scatter: !0, bubble: !0},
                B = {
                    pointSize: 1,
                    lineWidth: 1,
                    fillColor: "#AA00AA",
                    useAlpha: !0,
                    usePreallocated: !1,
                    useGPUTranslations: !1,
                    debug: {
                        timeRendering: !1,
                        timeSeriesProcessing: !1,
                        timeSetup: !1,
                        timeBufferCopy: !1,
                        timeKDTree: !1,
                        showSkipSummary: !1
                    }
                };
            return q = {
                allocateBufferForSingleSeries: function (a) {
                    var d = 0;
                    B.usePreallocated && (a.isSeriesBoosting && (d = m(a)), K.allocate(d))
                }, pushSeries: function (a) {
                    0 < G.length && G[G.length - 1].hasMarkers && (G[G.length - 1].markerTo = I.length);
                    B.debug.timeSeriesProcessing && console.time("building " + a.type + " series");
                    G.push({
                        segments: [],
                        markerFrom: I.length,
                        colorData: [],
                        series: a,
                        zMin: Number.MAX_VALUE,
                        zMax: -Number.MAX_VALUE,
                        hasMarkers: a.options.marker ? !1 !== a.options.marker.enabled : !1,
                        showMarkers: !0,
                        drawMode: {
                            area: "lines",
                            arearange: "lines",
                            areaspline: "line_strip",
                            column: "lines",
                            columnrange: "lines",
                            bar: "lines",
                            line: "line_strip",
                            scatter: "points",
                            heatmap: "triangles",
                            treemap: "triangles",
                            bubble: "points"
                        }[a.type] || "line_strip"
                    });
                    N(a, G[G.length - 1]);
                    B.debug.timeSeriesProcessing && console.timeEnd("building " + a.type + " series")
                }, setSize: function (a, b) {
                    R === a && l === b || !d || (R = a, l = b, d.bind(), d.setPMatrix([2 / R, 0, 0, 0, 0, -(2 / l), 0, 0, 0, 0, -2, 0, -1, 1, -1, 1]))
                }, inited: function () {
                    return Q
                }, setThreshold: a, init: function (a, b) {
                    function c(a, d) {
                        var b = {
                            isReady: !1, texture: u.createElement("canvas"),
                            handle: g.createTexture()
                        }, c = b.texture.getContext("2d");
                        W[a] = b;
                        b.texture.width = 512;
                        b.texture.height = 512;
                        c.mozImageSmoothingEnabled = !1;
                        c.webkitImageSmoothingEnabled = !1;
                        c.msImageSmoothingEnabled = !1;
                        c.imageSmoothingEnabled = !1;
                        c.strokeStyle = "rgba(255, 255, 255, 0)";
                        c.fillStyle = "#FFF";
                        d(c);
                        try {
                            g.activeTexture(g.TEXTURE0), g.bindTexture(g.TEXTURE_2D, b.handle), g.texImage2D(g.TEXTURE_2D, 0, g.RGBA, g.RGBA, g.UNSIGNED_BYTE, b.texture), g.texParameteri(g.TEXTURE_2D, g.TEXTURE_WRAP_S, g.CLAMP_TO_EDGE), g.texParameteri(g.TEXTURE_2D,
                                g.TEXTURE_WRAP_T, g.CLAMP_TO_EDGE), g.texParameteri(g.TEXTURE_2D, g.TEXTURE_MAG_FILTER, g.LINEAR), g.texParameteri(g.TEXTURE_2D, g.TEXTURE_MIN_FILTER, g.LINEAR), g.bindTexture(g.TEXTURE_2D, null), b.isReady = !0
                        } catch (U) {
                        }
                    }

                    var k = 0, f = ["webgl", "experimental-webgl", "moz-webgl", "webkit-3d"];
                    Q = !1;
                    if (!a) return !1;
                    for (B.debug.timeSetup && console.time("gl setup"); k < f.length && !(g = a.getContext(f[k], {})); k++) ;
                    if (g) b || y(); else return !1;
                    g.enable(g.BLEND);
                    g.blendFunc(g.SRC_ALPHA, g.ONE_MINUS_SRC_ALPHA);
                    g.disable(g.DEPTH_TEST);
                    g.depthFunc(g.LESS);
                    d = E(g);
                    if (!d) return !1;
                    K = h(g, d);
                    c("circle", function (a) {
                        a.beginPath();
                        a.arc(256, 256, 256, 0, 2 * Math.PI);
                        a.stroke();
                        a.fill()
                    });
                    c("square", function (a) {
                        a.fillRect(0, 0, 512, 512)
                    });
                    c("diamond", function (a) {
                        a.beginPath();
                        a.moveTo(256, 0);
                        a.lineTo(512, 256);
                        a.lineTo(256, 512);
                        a.lineTo(0, 256);
                        a.lineTo(256, 0);
                        a.fill()
                    });
                    c("triangle", function (a) {
                        a.beginPath();
                        a.moveTo(0, 512);
                        a.lineTo(256, 0);
                        a.lineTo(512, 512);
                        a.lineTo(0, 512);
                        a.fill()
                    });
                    c("triangle-down", function (a) {
                        a.beginPath();
                        a.moveTo(0, 0);
                        a.lineTo(256,
                            512);
                        a.lineTo(512, 0);
                        a.lineTo(0, 0);
                        a.fill()
                    });
                    Q = !0;
                    B.debug.timeSetup && console.timeEnd("gl setup");
                    return !0
                }, render: k, settings: B, valid: function () {
                    return !1 !== g
                }, clear: z, flush: y, setXAxis: O, setYAxis: D, data: S, gl: function () {
                    return g
                }, allocateBuffer: function (a) {
                    var d = 0;
                    B.usePreallocated && (a.series.forEach(function (a) {
                        a.isSeriesBoosting && (d += m(a))
                    }), K.allocate(d))
                }, destroy: function () {
                    y();
                    K.destroy();
                    d.destroy();
                    g && (e(W, function (a) {
                        a.handle && g.deleteTexture(a.handle)
                    }), g.canvas.width = 1, g.canvas.height = 1)
                },
                setOptions: function (a) {
                    v(!0, B, a)
                }
            }
        }
    });
    q(b, "Extensions/Boost/BoostAttach.js", [b["Core/Chart/Chart.js"], b["Extensions/Boost/WGLRenderer.js"], b["Core/Globals.js"], b["Core/Utilities.js"]], function (b, q, h, x) {
        var c = h.doc, l = x.error, u;
        return function (n, h) {
            var v = n.chartWidth, e = n.chartHeight, f = n, m = n.seriesGroup || h.group,
                p = c.implementation.hasFeature("www.http://w3.org/TR/SVG11/feature#Extensibility", "1.1");
            f = n.isChartSeriesBoosting() ? n : h;
            p = !1;
            u || (u = c.createElement("canvas"));
            f.renderTarget || (f.canvas = u, n.renderer.forExport ||
            !p ? (f.renderTarget = n.renderer.image("", 0, 0, v, e).addClass("highcharts-boost-canvas").add(m), f.boostClear = function () {
                f.renderTarget.attr({href: ""})
            }, f.boostCopy = function () {
                f.boostResizeTarget();
                f.renderTarget.attr({href: f.canvas.toDataURL("image/png")})
            }) : (f.renderTargetFo = n.renderer.createElement("foreignObject").add(m), f.renderTarget = c.createElement("canvas"), f.renderTargetCtx = f.renderTarget.getContext("2d"), f.renderTargetFo.element.appendChild(f.renderTarget), f.boostClear = function () {
                f.renderTarget.width =
                    f.canvas.width;
                f.renderTarget.height = f.canvas.height
            }, f.boostCopy = function () {
                f.renderTarget.width = f.canvas.width;
                f.renderTarget.height = f.canvas.height;
                f.renderTargetCtx.drawImage(f.canvas, 0, 0)
            }), f.boostResizeTarget = function () {
                v = n.chartWidth;
                e = n.chartHeight;
                (f.renderTargetFo || f.renderTarget).attr({x: 0, y: 0, width: v, height: e}).css({
                    pointerEvents: "none",
                    mixedBlendMode: "normal",
                    opacity: 1
                });
                f instanceof b && f.markerGroup.translate(n.plotLeft, n.plotTop)
            }, f.boostClipRect = n.renderer.clipRect(), (f.renderTargetFo ||
                f.renderTarget).clip(f.boostClipRect), f instanceof b && (f.markerGroup = f.renderer.g().add(m), f.markerGroup.translate(h.xAxis.pos, h.yAxis.pos)));
            f.canvas.width = v;
            f.canvas.height = e;
            f.boostClipRect.attr(n.getBoostClipRect(f));
            f.boostResizeTarget();
            f.boostClear();
            f.ogl || (f.ogl = q(function () {
                f.ogl.settings.debug.timeBufferCopy && console.time("buffer copy");
                f.boostCopy();
                f.ogl.settings.debug.timeBufferCopy && console.timeEnd("buffer copy")
            }), f.ogl.init(f.canvas) || l("[highcharts boost] - unable to init WebGL renderer"),
                f.ogl.setOptions(n.options.boost || {}), f instanceof b && f.ogl.allocateBuffer(n));
            f.ogl.setSize(v, e);
            return f.ogl
        }
    });
    q(b, "Extensions/Boost/BoostUtils.js", [b["Core/Globals.js"], b["Extensions/Boost/BoostableMap.js"], b["Extensions/Boost/BoostAttach.js"], b["Core/Utilities.js"]], function (b, q, h, x) {
        function c() {
            for (var b = [], c = 0; c < arguments.length; c++) b[c] = arguments[c];
            var f = -Number.MAX_VALUE;
            b.forEach(function (b) {
                if ("undefined" !== typeof b && null !== b && "undefined" !== typeof b.length && 0 < b.length) return f = b.length,
                    !0
            });
            return f
        }

        function l(b, c, f) {
            b && c.renderTarget && c.canvas && !(f || c.chart).isChartSeriesBoosting() && b.render(f || c.chart)
        }

        function u(b, c) {
            b && c.renderTarget && c.canvas && !c.chart.isChartSeriesBoosting() && b.allocateBufferForSingleSeries(c)
        }

        function n(b, c, f, e, h, l) {
            h = h || 0;
            e = e || 3E3;
            for (var D = h + e, a = !0; a && h < D && h < b.length;) a = c(b[h], h), ++h;
            a && (h < b.length ? l ? n(b, c, f, e, h, l) : v.requestAnimationFrame ? v.requestAnimationFrame(function () {
                n(b, c, f, e, h)
            }) : setTimeout(function () {
                n(b, c, f, e, h)
            }) : f && f())
        }

        function t() {
            var b = 0,
                c, f = ["webgl", "experimental-webgl", "moz-webgl", "webkit-3d"], h = !1;
            if ("undefined" !== typeof v.WebGLRenderingContext) for (c = e.createElement("canvas"); b < f.length; b++) try {
                if (h = c.getContext(f[b]), "undefined" !== typeof h && null !== h) return !0
            } catch (y) {
            }
            return !1
        }

        var v = b.win, e = b.doc, f = x.pick;
        x = {
            patientMax: c,
            boostEnabled: function (b) {
                return f(b && b.options && b.options.boost && b.options.boost.enabled, !0)
            },
            shouldForceChartSeriesBoosting: function (b) {
                var e = 0, h = 0, n = f(b.options.boost && b.options.boost.allowForce, !0);
                if ("undefined" !==
                    typeof b.boostForceChartBoost) return b.boostForceChartBoost;
                if (1 < b.series.length) for (var m = 0; m < b.series.length; m++) {
                    var l = b.series[m];
                    0 !== l.options.boostThreshold && !1 !== l.visible && "heatmap" !== l.type && (q[l.type] && ++h, c(l.processedXData, l.options.data, l.points) >= (l.options.boostThreshold || Number.MAX_VALUE) && ++e)
                }
                b.boostForceChartBoost = n && (h === b.series.length && 0 < e || 5 < e);
                return b.boostForceChartBoost
            },
            renderIfNotSeriesBoosting: l,
            allocateIfNotSeriesBoosting: u,
            eachAsync: n,
            hasWebGLSupport: t,
            pointDrawHandler: function (b) {
                var c =
                    !0;
                this.chart.options && this.chart.options.boost && (c = "undefined" === typeof this.chart.options.boost.enabled ? !0 : this.chart.options.boost.enabled);
                if (!c || !this.isSeriesBoosting) return b.call(this);
                this.chart.isBoosting = !0;
                if (b = h(this.chart, this)) u(b, this), b.pushSeries(this);
                l(b, this)
            }
        };
        b.hasWebGLSupport = t;
        return x
    });
    q(b, "Extensions/Boost/BoostInit.js", [b["Core/Chart/Chart.js"], b["Core/Globals.js"], b["Core/Series/Series.js"], b["Core/Series/SeriesRegistry.js"], b["Core/Utilities.js"], b["Extensions/Boost/BoostUtils.js"],
        b["Extensions/Boost/BoostAttach.js"]], function (b, q, h, x, c, l, u) {
        var n = q.noop, t = x.seriesTypes, v = c.addEvent, e = c.extend, f = c.fireEvent, m = c.wrap, p = l.eachAsync,
            z = l.pointDrawHandler, H = l.allocateIfNotSeriesBoosting, y = l.renderIfNotSeriesBoosting,
            E = l.shouldForceChartSeriesBoosting, D;
        return function () {
            e(h.prototype, {
                renderCanvas: function () {
                    function a(a, b) {
                        var c = !1, d = "undefined" === typeof h.index, f = !0;
                        if (!d) {
                            if (ja) {
                                var e = a[0];
                                var k = a[1]
                            } else e = a, k = v[b];
                            Z ? (ja && (k = a.slice(1, 3)), c = k[0], k = k[1]) : ia && (e = a.x, k = a.stackY,
                                c = k - a.y);
                            ta || (f = k >= z && k <= E);
                            if (null !== k && e >= q && e <= x && f) if (a = g.toPixels(e, !0), B) {
                                if ("undefined" === typeof U || a === M) {
                                    Z || (c = k);
                                    if ("undefined" === typeof ca || k > ba) ba = k, ca = b;
                                    if ("undefined" === typeof U || c < T) T = c, U = b
                                }
                                a !== M && ("undefined" !== typeof U && (k = m.toPixels(ba, !0), N = m.toPixels(T, !0), da(a, k, ca), N !== k && da(a, N, U)), U = ca = void 0, M = a)
                            } else k = Math.ceil(m.toPixels(k, !0)), da(a, k, b)
                        }
                        return !d
                    }

                    function b() {
                        f(c, "renderedCanvas");
                        delete c.buildKDTree;
                        c.buildKDTree();
                        qa.debug.timeKDTree && console.timeEnd("kd tree building")
                    }

                    var c = this, d = c.options || {}, e = !1, h = c.chart, g = this.xAxis, m = this.yAxis,
                        l = d.xData || c.processedXData, v = d.yData || c.processedYData, t = d.data;
                    e = g.getExtremes();
                    var q = e.min, x = e.max;
                    e = m.getExtremes();
                    var z = e.min, E = e.max, O = {}, M, B = !!c.sampling, A = !1 !== d.enableMouseTracking,
                        N = m.getThreshold(d.threshold),
                        Z = c.pointArrayMap && "low,high" === c.pointArrayMap.join(","), ia = !!d.stacking,
                        na = c.cropStart || 0, ta = c.requireSorting, ja = !l, T, ba, U, ca,
                        pa = "x" === d.findNearestPointBy,
                        ka = this.xData || this.options.xData || this.processedXData ||
                            !1, da = function (a, b, c) {
                            a = Math.ceil(a);
                            D = pa ? a : a + "," + b;
                            A && !O[D] && (O[D] = !0, h.inverted && (a = g.len - a, b = m.len - b), ra.push({
                                x: ka ? ka[na + c] : !1,
                                clientX: a,
                                plotX: a,
                                plotY: b,
                                i: na + c
                            }))
                        };
                    e = u(h, c);
                    h.isBoosting = !0;
                    var qa = e.settings;
                    if (this.visible) {
                        (this.points || this.graph) && this.destroyGraphics();
                        h.isChartSeriesBoosting() ? (this.markerGroup && this.markerGroup !== h.markerGroup && this.markerGroup.destroy(), this.markerGroup = h.markerGroup, this.renderTarget && (this.renderTarget = this.renderTarget.destroy())) : (this.markerGroup ===
                        h.markerGroup && (this.markerGroup = void 0), this.markerGroup = c.plotGroup("markerGroup", "markers", !0, 1, h.seriesGroup));
                        var ra = this.points = [];
                        c.buildKDTree = n;
                        e && (H(e, this), e.pushSeries(c), y(e, this, h));
                        h.renderer.forExport || (qa.debug.timeKDTree && console.time("kd tree building"), p(ia ? c.data : l || t, a, b))
                    }
                }
            });
            ["heatmap", "treemap"].forEach(function (a) {
                t[a] && m(t[a].prototype, "drawPoints", z)
            });
            t.bubble && (delete t.bubble.prototype.buildKDTree, m(t.bubble.prototype, "markerAttribs", function (a) {
                return this.isSeriesBoosting ?
                    !1 : a.apply(this, [].slice.call(arguments, 1))
            }));
            t.scatter.prototype.fill = !0;
            e(t.area.prototype, {fill: !0, fillOpacity: !0, sampling: !0});
            e(t.column.prototype, {fill: !0, sampling: !0});
            b.prototype.callbacks.push(function (a) {
                v(a, "predraw", function () {
                    a.boostForceChartBoost = void 0;
                    a.boostForceChartBoost = E(a);
                    a.isBoosting = !1;
                    !a.isChartSeriesBoosting() && a.didBoost && (a.didBoost = !1);
                    a.boostClear && a.boostClear();
                    a.canvas && a.ogl && a.isChartSeriesBoosting() && (a.didBoost = !0, a.ogl.allocateBuffer(a));
                    a.markerGroup && a.xAxis &&
                    0 < a.xAxis.length && a.yAxis && 0 < a.yAxis.length && a.markerGroup.translate(a.xAxis[0].pos, a.yAxis[0].pos)
                });
                v(a, "render", function () {
                    a.ogl && a.isChartSeriesBoosting() && a.ogl.render(a)
                })
            })
        }
    });
    q(b, "Extensions/BoostCanvas.js", [b["Core/Chart/Chart.js"], b["Core/Color/Color.js"], b["Core/Globals.js"], b["Core/Color/Palette.js"], b["Core/Series/Series.js"], b["Core/Series/SeriesRegistry.js"], b["Core/Utilities.js"]], function (b, q, h, x, c, l, u) {
        var n = q.parse, t = h.doc, v = h.noop, e = l.seriesTypes, f = u.addEvent, m = u.extend, p = u.fireEvent,
            z = u.isNumber, H = u.merge, y = u.pick, E = u.wrap, D;
        return function () {
            h.seriesTypes.heatmap && E(h.seriesTypes.heatmap.prototype, "drawPoints", function () {
                var a = this.chart, b = this.getContext(), c = this.chart.inverted, d = this.xAxis, f = this.yAxis;
                b ? (this.points.forEach(function (k) {
                    var e = k.plotY;
                    "undefined" === typeof e || isNaN(e) || null === k.y || (e = k.shapeArgs, k = a.styledMode ? k.series.colorAttribs(k) : k.series.pointAttribs(k), b.fillStyle = k.fill, c ? b.fillRect(f.len - e.y + d.left, d.len - e.x + f.top, -e.height, -e.width) : b.fillRect(e.x +
                        d.left, e.y + f.top, e.width, e.height))
                }), this.canvasToSVG()) : this.chart.showLoading("Your browser doesn't support HTML5 canvas, <br>please use a modern browser")
            });
            m(c.prototype, {
                getContext: function () {
                    var a = this.chart, b = a.chartWidth, c = a.chartHeight, d = a.seriesGroup || this.group, e = this,
                        f = function (a, b, c, d, e, f, k) {
                            a.call(this, c, b, d, e, f, k)
                        };
                    a.isChartSeriesBoosting() && (e = a, d = a.seriesGroup);
                    var g = e.ctx;
                    e.canvas || (e.canvas = t.createElement("canvas"), e.renderTarget = a.renderer.image("", 0, 0, b, c).addClass("highcharts-boost-canvas").add(d),
                        e.ctx = g = e.canvas.getContext("2d"), a.inverted && ["moveTo", "lineTo", "rect", "arc"].forEach(function (a) {
                        E(g, a, f)
                    }), e.boostCopy = function () {
                        e.renderTarget.attr({href: e.canvas.toDataURL("image/png")})
                    }, e.boostClear = function () {
                        g.clearRect(0, 0, e.canvas.width, e.canvas.height);
                        e === this && e.renderTarget.attr({href: ""})
                    }, e.boostClipRect = a.renderer.clipRect(), e.renderTarget.clip(e.boostClipRect));
                    e.canvas.width !== b && (e.canvas.width = b);
                    e.canvas.height !== c && (e.canvas.height = c);
                    e.renderTarget.attr({
                        x: 0, y: 0, width: b,
                        height: c, style: "pointer-events: none", href: ""
                    });
                    e.boostClipRect.attr(a.getBoostClipRect(e));
                    return g
                }, canvasToSVG: function () {
                    this.chart.isChartSeriesBoosting() ? this.boostClear && this.boostClear() : (this.boostCopy || this.chart.boostCopy) && (this.boostCopy || this.chart.boostCopy)()
                }, cvsLineTo: function (a, b, c) {
                    a.lineTo(b, c)
                }, renderCanvas: function () {
                    var a = this, b = a.options, c = a.chart, d = this.xAxis, e = this.yAxis,
                        l = (c.options.boost || {}).timeRendering || !1, g = 0, t = a.processedXData,
                        E = a.processedYData, O = b.data, I = d.getExtremes(),
                        N = I.min, Q = I.max;
                    I = e.getExtremes();
                    var G = I.min, W = I.max, ha = {}, M, B = !!a.sampling, A = b.marker && b.marker.radius,
                        Y = this.cvsDrawPoint, Z = b.lineWidth ? this.cvsLineTo : void 0,
                        ia = A && 1 >= A ? this.cvsMarkerSquare : this.cvsMarkerCircle, na = this.cvsStrokeBatch || 1E3,
                        ta = !1 !== b.enableMouseTracking, ja;
                    I = b.threshold;
                    var T = e.getThreshold(I), ba = z(I), U = T, ca = this.fill,
                        pa = a.pointArrayMap && "low,high" === a.pointArrayMap.join(","), ka = !!b.stacking,
                        da = a.cropStart || 0;
                    I = c.options.loading;
                    var qa = a.requireSorting, ra, Ka = b.connectNulls, Da = !t,
                        ua, va, aa, oa, wa, V = ka ? a.data : t || O,
                        La = a.fillOpacity ? (new q(a.color)).setOpacity(y(b.fillOpacity, .75)).get() : a.color,
                        w = function () {
                            ca ? (P.fillStyle = La, P.fill()) : (P.strokeStyle = a.color, P.lineWidth = b.lineWidth, P.stroke())
                        }, Ea = function (b, d, e, f) {
                            0 === g && (P.beginPath(), Z && (P.lineJoin = "round"));
                            c.scroller && "highcharts-navigator-series" === a.options.className ? (d += c.scroller.top, e && (e += c.scroller.top)) : d += c.plotTop;
                            b += c.plotLeft;
                            ra ? P.moveTo(b, d) : Y ? Y(P, b, d, e, ja) : Z ? Z(P, b, d) : ia && ia.call(a, P, b, d, A, f);
                            g += 1;
                            g === na && (w(),
                                g = 0);
                            ja = {clientX: b, plotY: d, yBottom: e}
                        }, Ma = "x" === b.findNearestPointBy,
                        Fa = this.xData || this.options.xData || this.processedXData || !1, xa = function (a, b, f) {
                            wa = Ma ? a : a + "," + b;
                            ta && !ha[wa] && (ha[wa] = !0, c.inverted && (a = d.len - a, b = e.len - b), Na.push({
                                x: Fa ? Fa[da + f] : !1,
                                clientX: a,
                                plotX: a,
                                plotY: b,
                                i: da + f
                            }))
                        };
                    this.renderTarget && this.renderTarget.attr({href: ""});
                    (this.points || this.graph) && this.destroyGraphics();
                    a.plotGroup("group", "series", a.visible ? "visible" : "hidden", b.zIndex, c.seriesGroup);
                    a.markerGroup = a.group;
                    f(a, "destroy",
                        function () {
                            a.markerGroup = null
                        });
                    var Na = this.points = [];
                    var P = this.getContext();
                    a.buildKDTree = v;
                    this.boostClear && this.boostClear();
                    this.visible && (99999 < O.length && (c.options.loading = H(I, {
                        labelStyle: {
                            backgroundColor: n(x.backgroundColor).setOpacity(.75).get(),
                            padding: "1em",
                            borderRadius: "0.5em"
                        }, style: {backgroundColor: "none", opacity: 1}
                    }), u.clearTimeout(D), c.showLoading("Drawing..."), c.options.loading = I), l && console.time("canvas rendering"), h.eachAsync(V, function (b, f) {
                        var k = !1, g = !1, D = !1, h = !1, m = "undefined" ===
                            typeof c.index, n = !0;
                        if (!m) {
                            if (Da) {
                                var l = b[0];
                                var r = b[1];
                                V[f + 1] && (D = V[f + 1][0]);
                                V[f - 1] && (h = V[f - 1][0])
                            } else l = b, r = E[f], V[f + 1] && (D = V[f + 1]), V[f - 1] && (h = V[f - 1]);
                            D && D >= N && D <= Q && (k = !0);
                            h && h >= N && h <= Q && (g = !0);
                            if (pa) {
                                Da && (r = b.slice(1, 3));
                                var p = r[0];
                                r = r[1]
                            } else ka && (l = b.x, r = b.stackY, p = r - b.y);
                            b = null === r;
                            qa || (n = r >= G && r <= W);
                            if (!b && (l >= N && l <= Q && n || k || g)) if (l = Math.round(d.toPixels(l, !0)), B) {
                                if ("undefined" === typeof aa || l === M) {
                                    pa || (p = r);
                                    if ("undefined" === typeof oa || r > va) va = r, oa = f;
                                    if ("undefined" === typeof aa || p < ua) ua = p,
                                        aa = f
                                }
                                l !== M && ("undefined" !== typeof aa && (r = e.toPixels(va, !0), T = e.toPixels(ua, !0), Ea(l, ba ? Math.min(r, U) : r, ba ? Math.max(T, U) : T, f), xa(l, r, oa), T !== r && xa(l, T, aa)), aa = oa = void 0, M = l)
                            } else r = Math.round(e.toPixels(r, !0)), Ea(l, r, T, f), xa(l, r, f);
                            ra = b && !Ka;
                            0 === f % 5E4 && (a.boostCopy || a.chart.boostCopy) && (a.boostCopy || a.chart.boostCopy)()
                        }
                        return !m
                    }, function () {
                        var b = c.loadingDiv, d = c.loadingShown;
                        w();
                        a.canvasToSVG();
                        l && console.timeEnd("canvas rendering");
                        p(a, "renderedCanvas");
                        d && (m(b.style, {
                            transition: "opacity 250ms",
                            opacity: 0
                        }), c.loadingShown = !1, D = setTimeout(function () {
                            b.parentNode && b.parentNode.removeChild(b);
                            c.loadingDiv = c.loadingSpan = null
                        }, 250));
                        delete a.buildKDTree;
                        a.buildKDTree()
                    }, c.renderer.forExport ? Number.MAX_VALUE : void 0))
                }
            });
            e.scatter.prototype.cvsMarkerCircle = function (a, b, c, d) {
                a.moveTo(b, c);
                a.arc(b, c, d, 0, 2 * Math.PI, !1)
            };
            e.scatter.prototype.cvsMarkerSquare = function (a, b, c, d) {
                a.rect(b - d, c - d, 2 * d, 2 * d)
            };
            e.scatter.prototype.fill = !0;
            e.bubble && (e.bubble.prototype.cvsMarkerCircle = function (a, b, c, d, e) {
                a.moveTo(b,
                    c);
                a.arc(b, c, this.radii && this.radii[e], 0, 2 * Math.PI, !1)
            }, e.bubble.prototype.cvsStrokeBatch = 1);
            m(e.area.prototype, {
                cvsDrawPoint: function (a, b, c, d, e) {
                    e && b !== e.clientX && (a.moveTo(e.clientX, e.yBottom), a.lineTo(e.clientX, e.plotY), a.lineTo(b, c), a.lineTo(b, d))
                }, fill: !0, fillOpacity: !0, sampling: !0
            });
            m(e.column.prototype, {
                cvsDrawPoint: function (a, b, c, d) {
                    a.rect(b - 1, c, 1, d - c)
                }, fill: !0, sampling: !0
            });
            b.prototype.callbacks.push(function (a) {
                f(a, "predraw", function () {
                    a.renderTarget && a.renderTarget.attr({href: ""});
                    a.canvas &&
                    a.canvas.getContext("2d").clearRect(0, 0, a.canvas.width, a.canvas.height)
                });
                f(a, "render", function () {
                    a.boostCopy && a.boostCopy()
                })
            })
        }
    });
    q(b, "Extensions/Boost/BoostOverrides.js", [b["Core/Chart/Chart.js"], b["Core/Series/Point.js"], b["Core/Series/Series.js"], b["Core/Series/SeriesRegistry.js"], b["Core/Utilities.js"], b["Extensions/Boost/BoostUtils.js"], b["Extensions/Boost/Boostables.js"], b["Extensions/Boost/BoostableMap.js"]], function (b, q, h, x, c, l, u, n) {
        var t = x.seriesTypes;
        x = c.addEvent;
        var v = c.error, e = c.getOptions,
            f = c.isArray, m = c.isNumber, p = c.pick, z = c.wrap, H = l.boostEnabled,
            y = l.shouldForceChartSeriesBoosting, E = e().plotOptions;
        b.prototype.isChartSeriesBoosting = function () {
            return p(this.options.boost && this.options.boost.seriesThreshold, 50) <= this.series.length || y(this)
        };
        b.prototype.getBoostClipRect = function (b) {
            var a = {x: this.plotLeft, y: this.plotTop, width: this.plotWidth, height: this.plotHeight};
            b === this && (b = this.inverted ? this.xAxis : this.yAxis, 1 >= b.length ? (a.y = Math.min(b[0].pos, a.y), a.height = b[0].pos - this.plotTop + b[0].len) :
                a.height = this.plotHeight);
            return a
        };
        h.prototype.getPoint = function (b) {
            var a = b, c = this.xData || this.options.xData || this.processedXData || !1;
            !b || b instanceof this.pointClass || (a = (new this.pointClass).init(this, this.options.data[b.i], c ? c[b.i] : void 0), a.category = p(this.xAxis.categories ? this.xAxis.categories[a.x] : a.x, a.x), a.dist = b.dist, a.distX = b.distX, a.plotX = b.plotX, a.plotY = b.plotY, a.index = b.i, a.isInside = this.isPointInside(b));
            return a
        };
        z(h.prototype, "searchPoint", function (b) {
            return this.getPoint(b.apply(this,
                [].slice.call(arguments, 1)))
        });
        z(q.prototype, "haloPath", function (b) {
            var a = this.series, c = this.plotX, e = this.plotY, d = a.chart.inverted;
            a.isSeriesBoosting && d && (this.plotX = a.yAxis.len - e, this.plotY = a.xAxis.len - c);
            var f = b.apply(this, Array.prototype.slice.call(arguments, 1));
            a.isSeriesBoosting && d && (this.plotX = c, this.plotY = e);
            return f
        });
        z(h.prototype, "markerAttribs", function (b, a) {
            var c = a.plotX, e = a.plotY, d = this.chart.inverted;
            this.isSeriesBoosting && d && (a.plotX = this.yAxis.len - e, a.plotY = this.xAxis.len - c);
            var f =
                b.apply(this, Array.prototype.slice.call(arguments, 1));
            this.isSeriesBoosting && d && (a.plotX = c, a.plotY = e);
            return f
        });
        x(h, "destroy", function () {
            var b = this, a = b.chart;
            a.markerGroup === b.markerGroup && (b.markerGroup = null);
            a.hoverPoints && (a.hoverPoints = a.hoverPoints.filter(function (a) {
                return a.series === b
            }));
            a.hoverPoint && a.hoverPoint.series === b && (a.hoverPoint = null)
        });
        z(h.prototype, "getExtremes", function (b) {
            return this.isSeriesBoosting && this.hasExtremes && this.hasExtremes() ? {} : b.apply(this, Array.prototype.slice.call(arguments,
                1))
        });
        ["translate", "generatePoints", "drawTracker", "drawPoints", "render"].forEach(function (b) {
            function a(a) {
                var c = this.options.stacking && ("translate" === b || "generatePoints" === b);
                if (!this.isSeriesBoosting || c || !H(this.chart) || "heatmap" === this.type || "treemap" === this.type || !n[this.type] || 0 === this.options.boostThreshold) a.call(this); else if (this[b + "Canvas"]) this[b + "Canvas"]()
            }

            z(h.prototype, b, a);
            "translate" === b && "column bar arearange columnrange heatmap treemap".split(" ").forEach(function (c) {
                t[c] && z(t[c].prototype,
                    b, a)
            })
        });
        z(h.prototype, "processData", function (b) {
            function a(a) {
                return c.chart.isChartSeriesBoosting() || (a ? a.length : 0) >= (c.options.boostThreshold || Number.MAX_VALUE)
            }

            var c = this, e = this.options.data;
            H(this.chart) && n[this.type] ? (a(e) && "heatmap" !== this.type && "treemap" !== this.type && !this.options.stacking && this.hasExtremes && this.hasExtremes(!0) || (b.apply(this, Array.prototype.slice.call(arguments, 1)), e = this.processedXData), (this.isSeriesBoosting = a(e)) ? (e = this.getFirstValidPoint(this.options.data), m(e) || f(e) ||
            v(12, !1, this.chart), this.enterBoost()) : this.exitBoost && this.exitBoost()) : b.apply(this, Array.prototype.slice.call(arguments, 1))
        });
        x(h, "hide", function () {
            this.canvas && this.renderTarget && (this.ogl && this.ogl.clear(), this.boostClear())
        });
        h.prototype.enterBoost = function () {
            this.alteredByBoost = [];
            ["allowDG", "directTouch", "stickyTracking"].forEach(function (b) {
                this.alteredByBoost.push({prop: b, val: this[b], own: Object.hasOwnProperty.call(this, b)})
            }, this);
            this.directTouch = this.allowDG = !1;
            this.finishedAnimating =
                this.stickyTracking = !0;
            this.labelBySeries && (this.labelBySeries = this.labelBySeries.destroy())
        };
        h.prototype.exitBoost = function () {
            (this.alteredByBoost || []).forEach(function (b) {
                b.own ? this[b.prop] = b.val : delete this[b.prop]
            }, this);
            this.boostClear && this.boostClear()
        };
        h.prototype.hasExtremes = function (b) {
            var a = this.options, c = this.xAxis && this.xAxis.options, e = this.yAxis && this.yAxis.options,
                d = this.colorAxis && this.colorAxis.options;
            return a.data.length > (a.boostThreshold || Number.MAX_VALUE) && m(e.min) && m(e.max) &&
                (!b || m(c.min) && m(c.max)) && (!d || m(d.min) && m(d.max))
        };
        h.prototype.destroyGraphics = function () {
            var b = this, a = this.points, c, e;
            if (a) for (e = 0; e < a.length; e += 1) (c = a[e]) && c.destroyElements && c.destroyElements();
            ["graph", "area", "tracker"].forEach(function (a) {
                b[a] && (b[a] = b[a].destroy())
            })
        };
        u.forEach(function (b) {
            E[b] && (E[b].boostThreshold = 5E3, E[b].boostData = [], t[b].prototype.fillOpacity = !0)
        })
    });
    q(b, "Extensions/Boost/NamedColors.js", [b["Core/Color/Color.js"]], function (b) {
        var q = {
            aliceblue: "#f0f8ff",
            antiquewhite: "#faebd7",
            aqua: "#00ffff",
            aquamarine: "#7fffd4",
            azure: "#f0ffff",
            beige: "#f5f5dc",
            bisque: "#ffe4c4",
            black: "#000000",
            blanchedalmond: "#ffebcd",
            blue: "#0000ff",
            blueviolet: "#8a2be2",
            brown: "#a52a2a",
            burlywood: "#deb887",
            cadetblue: "#5f9ea0",
            chartreuse: "#7fff00",
            chocolate: "#d2691e",
            coral: "#ff7f50",
            cornflowerblue: "#6495ed",
            cornsilk: "#fff8dc",
            crimson: "#dc143c",
            cyan: "#00ffff",
            darkblue: "#00008b",
            darkcyan: "#008b8b",
            darkgoldenrod: "#b8860b",
            darkgray: "#a9a9a9",
            darkgreen: "#006400",
            darkkhaki: "#bdb76b",
            darkmagenta: "#8b008b",
            darkolivegreen: "#556b2f",
            darkorange: "#ff8c00",
            darkorchid: "#9932cc",
            darkred: "#8b0000",
            darksalmon: "#e9967a",
            darkseagreen: "#8fbc8f",
            darkslateblue: "#483d8b",
            darkslategray: "#2f4f4f",
            darkturquoise: "#00ced1",
            darkviolet: "#9400d3",
            deeppink: "#ff1493",
            deepskyblue: "#00bfff",
            dimgray: "#696969",
            dodgerblue: "#1e90ff",
            feldspar: "#d19275",
            firebrick: "#b22222",
            floralwhite: "#fffaf0",
            forestgreen: "#228b22",
            fuchsia: "#ff00ff",
            gainsboro: "#dcdcdc",
            ghostwhite: "#f8f8ff",
            gold: "#ffd700",
            goldenrod: "#daa520",
            gray: "#808080",
            green: "#008000",
            greenyellow: "#adff2f",
            honeydew: "#f0fff0",
            hotpink: "#ff69b4",
            indianred: "#cd5c5c",
            indigo: "#4b0082",
            ivory: "#fffff0",
            khaki: "#f0e68c",
            lavender: "#e6e6fa",
            lavenderblush: "#fff0f5",
            lawngreen: "#7cfc00",
            lemonchiffon: "#fffacd",
            lightblue: "#add8e6",
            lightcoral: "#f08080",
            lightcyan: "#e0ffff",
            lightgoldenrodyellow: "#fafad2",
            lightgrey: "#d3d3d3",
            lightgreen: "#90ee90",
            lightpink: "#ffb6c1",
            lightsalmon: "#ffa07a",
            lightseagreen: "#20b2aa",
            lightskyblue: "#87cefa",
            lightslateblue: "#8470ff",
            lightslategray: "#778899",
            lightsteelblue: "#b0c4de",
            lightyellow: "#ffffe0",
            lime: "#00ff00",
            limegreen: "#32cd32",
            linen: "#faf0e6",
            magenta: "#ff00ff",
            maroon: "#800000",
            mediumaquamarine: "#66cdaa",
            mediumblue: "#0000cd",
            mediumorchid: "#ba55d3",
            mediumpurple: "#9370d8",
            mediumseagreen: "#3cb371",
            mediumslateblue: "#7b68ee",
            mediumspringgreen: "#00fa9a",
            mediumturquoise: "#48d1cc",
            mediumvioletred: "#c71585",
            midnightblue: "#191970",
            mintcream: "#f5fffa",
            mistyrose: "#ffe4e1",
            moccasin: "#ffe4b5",
            navajowhite: "#ffdead",
            navy: "#000080",
            oldlace: "#fdf5e6",
            olive: "#808000",
            olivedrab: "#6b8e23",
            orange: "#ffa500",
            orangered: "#ff4500",
            orchid: "#da70d6",
            palegoldenrod: "#eee8aa",
            palegreen: "#98fb98",
            paleturquoise: "#afeeee",
            palevioletred: "#d87093",
            papayawhip: "#ffefd5",
            peachpuff: "#ffdab9",
            peru: "#cd853f",
            pink: "#ffc0cb",
            plum: "#dda0dd",
            powderblue: "#b0e0e6",
            purple: "#800080",
            red: "#ff0000",
            rosybrown: "#bc8f8f",
            royalblue: "#4169e1",
            saddlebrown: "#8b4513",
            salmon: "#fa8072",
            sandybrown: "#f4a460",
            seagreen: "#2e8b57",
            seashell: "#fff5ee",
            sienna: "#a0522d",
            silver: "#c0c0c0",
            skyblue: "#87ceeb",
            slateblue: "#6a5acd",
            slategray: "#708090",
            snow: "#fffafa",
            springgreen: "#00ff7f",
            steelblue: "#4682b4",
            tan: "#d2b48c",
            teal: "#008080",
            thistle: "#d8bfd8",
            tomato: "#ff6347",
            turquoise: "#40e0d0",
            violet: "#ee82ee",
            violetred: "#d02090",
            wheat: "#f5deb3",
            white: "#ffffff",
            whitesmoke: "#f5f5f5",
            yellow: "#ffff00",
            yellowgreen: "#9acd32"
        };
        return b.names = q
    });
    q(b, "Extensions/Boost/Boost.js", [b["Extensions/Boost/BoostUtils.js"], b["Extensions/Boost/BoostInit.js"], b["Extensions/BoostCanvas.js"], b["Core/Utilities.js"]], function (b, q, h, x) {
        x = x.error;
        b = b.hasWebGLSupport;
        b() ? q() : "undefined" !==
        typeof h ? h() : x(26)
    });
    q(b, "masters/modules/boost.src.js", [], function () {
    })
});
//# sourceMappingURL=boost.js.map
