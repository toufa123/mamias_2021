/*
 Highcharts JS v9.1.0 (2021-05-03)

 Boost module

 (c) 2010-2021 Highsoft AS
 Author: Torstein Honsi

 License: www.highcharts.com/license

*/
(function (b) {
    "object" === typeof module && module.exports ? (b["default"] = b, module.exports = b) : "function" === typeof define && define.amd ? define("highcharts/modules/boost", ["highcharts"], function (r) {
        b(r);
        b.Highcharts = r;
        return b
    }) : b("undefined" !== typeof Highcharts ? Highcharts : void 0)
})(function (b) {
    function r(b, D, u, h) {
        b.hasOwnProperty(D) || (b[D] = h.apply(null, u))
    }

    b = b ? b._modules : {};
    r(b, "Extensions/Boost/Boostables.js", [], function () {
        return "area arearange column columnrange bar line scatter heatmap bubble treemap".split(" ")
    });
    r(b, "Extensions/Boost/BoostableMap.js", [b["Extensions/Boost/Boostables.js"]], function (b) {
        var q = {};
        b.forEach(function (b) {
            q[b] = 1
        });
        return q
    });
    r(b, "Extensions/Boost/WGLShader.js", [b["Core/Utilities.js"]], function (b) {
        var q = b.clamp, u = b.error, h = b.pick;
        return function (c) {
            function b() {
                K.length && u("[highcharts boost] shader error - " + K.join("\n"))
            }

            function l(a, n) {
                var d = c.createShader("vertex" === n ? c.VERTEX_SHADER : c.FRAGMENT_SHADER);
                c.shaderSource(d, a);
                c.compileShader(d);
                return c.getShaderParameter(d, c.COMPILE_STATUS) ?
                    d : (K.push("when compiling " + n + " shader:\n" + c.getShaderInfoLog(d)), !1)
            }

            function k() {
                function d(a) {
                    return c.getUniformLocation(e, a)
                }

                var n = l("#version 100\n#define LN10 2.302585092994046\nprecision highp float;\nattribute vec4 aVertexPosition;\nattribute vec4 aColor;\nvarying highp vec2 position;\nvarying highp vec4 vColor;\nuniform mat4 uPMatrix;\nuniform float pSize;\nuniform float translatedThreshold;\nuniform bool hasThreshold;\nuniform bool skipTranslation;\nuniform float xAxisTrans;\nuniform float xAxisMin;\nuniform float xAxisMinPad;\nuniform float xAxisPointRange;\nuniform float xAxisLen;\nuniform bool  xAxisPostTranslate;\nuniform float xAxisOrdinalSlope;\nuniform float xAxisOrdinalOffset;\nuniform float xAxisPos;\nuniform bool  xAxisCVSCoord;\nuniform bool  xAxisIsLog;\nuniform bool  xAxisReversed;\nuniform float yAxisTrans;\nuniform float yAxisMin;\nuniform float yAxisMinPad;\nuniform float yAxisPointRange;\nuniform float yAxisLen;\nuniform bool  yAxisPostTranslate;\nuniform float yAxisOrdinalSlope;\nuniform float yAxisOrdinalOffset;\nuniform float yAxisPos;\nuniform bool  yAxisCVSCoord;\nuniform bool  yAxisIsLog;\nuniform bool  yAxisReversed;\nuniform bool  isBubble;\nuniform bool  bubbleSizeByArea;\nuniform float bubbleZMin;\nuniform float bubbleZMax;\nuniform float bubbleZThreshold;\nuniform float bubbleMinSize;\nuniform float bubbleMaxSize;\nuniform bool  bubbleSizeAbs;\nuniform bool  isInverted;\nfloat bubbleRadius(){\nfloat value = aVertexPosition.w;\nfloat zMax = bubbleZMax;\nfloat zMin = bubbleZMin;\nfloat radius = 0.0;\nfloat pos = 0.0;\nfloat zRange = zMax - zMin;\nif (bubbleSizeAbs){\nvalue = value - bubbleZThreshold;\nzMax = max(zMax - bubbleZThreshold, zMin - bubbleZThreshold);\nzMin = 0.0;\n}\nif (value < zMin){\nradius = bubbleZMin / 2.0 - 1.0;\n} else {\npos = zRange > 0.0 ? (value - zMin) / zRange : 0.5;\nif (bubbleSizeByArea && pos > 0.0){\npos = sqrt(pos);\n}\nradius = ceil(bubbleMinSize + pos * (bubbleMaxSize - bubbleMinSize)) / 2.0;\n}\nreturn radius * 2.0;\n}\nfloat translate(float val,\nfloat pointPlacement,\nfloat localA,\nfloat localMin,\nfloat minPixelPadding,\nfloat pointRange,\nfloat len,\nbool  cvsCoord,\nbool  isLog,\nbool  reversed\n){\nfloat sign = 1.0;\nfloat cvsOffset = 0.0;\nif (cvsCoord) {\nsign *= -1.0;\ncvsOffset = len;\n}\nif (isLog) {\nval = log(val) / LN10;\n}\nif (reversed) {\nsign *= -1.0;\ncvsOffset -= sign * len;\n}\nreturn sign * (val - localMin) * localA + cvsOffset + \n(sign * minPixelPadding);\n}\nfloat xToPixels(float value) {\nif (skipTranslation){\nreturn value;// + xAxisPos;\n}\nreturn translate(value, 0.0, xAxisTrans, xAxisMin, xAxisMinPad, xAxisPointRange, xAxisLen, xAxisCVSCoord, xAxisIsLog, xAxisReversed);// + xAxisPos;\n}\nfloat yToPixels(float value, float checkTreshold) {\nfloat v;\nif (skipTranslation){\nv = value;// + yAxisPos;\n} else {\nv = translate(value, 0.0, yAxisTrans, yAxisMin, yAxisMinPad, yAxisPointRange, yAxisLen, yAxisCVSCoord, yAxisIsLog, yAxisReversed);// + yAxisPos;\nif (v > yAxisLen) {\nv = yAxisLen;\n}\n}\nif (checkTreshold > 0.0 && hasThreshold) {\nv = min(v, translatedThreshold);\n}\nreturn v;\n}\nvoid main(void) {\nif (isBubble){\ngl_PointSize = bubbleRadius();\n} else {\ngl_PointSize = pSize;\n}\nvColor = aColor;\nif (skipTranslation && isInverted) {\ngl_Position = uPMatrix * vec4(aVertexPosition.y + yAxisPos, aVertexPosition.x + xAxisPos, 0.0, 1.0);\n} else if (isInverted) {\ngl_Position = uPMatrix * vec4(yToPixels(aVertexPosition.y, aVertexPosition.z) + yAxisPos, xToPixels(aVertexPosition.x) + xAxisPos, 0.0, 1.0);\n} else {\ngl_Position = uPMatrix * vec4(xToPixels(aVertexPosition.x) + xAxisPos, yToPixels(aVertexPosition.y, aVertexPosition.z) + yAxisPos, 0.0, 1.0);\n}\n}",
                    "vertex"),
                    k = l("precision highp float;\nuniform vec4 fillColor;\nvarying highp vec2 position;\nvarying highp vec4 vColor;\nuniform sampler2D uSampler;\nuniform bool isCircle;\nuniform bool hasColor;\nvoid main(void) {\nvec4 col = fillColor;\nvec4 tcol = texture2D(uSampler, gl_PointCoord.st);\nif (hasColor) {\ncol = vColor;\n}\nif (isCircle) {\ncol *= tcol;\nif (tcol.r < 0.0) {\ndiscard;\n} else {\ngl_FragColor = col;\n}\n} else {\ngl_FragColor = col;\n}\n}", "fragment");
                if (!n || !k) return e = !1, b(), !1;
                e = c.createProgram();
                c.attachShader(e, n);
                c.attachShader(e, k);
                c.linkProgram(e);
                if (!c.getProgramParameter(e, c.LINK_STATUS)) return K.push(c.getProgramInfoLog(e)), b(), e = !1;
                c.useProgram(e);
                c.bindAttribLocation(e, 0, "aVertexPosition");
                f = d("uPMatrix");
                m = d("pSize");
                t = d("fillColor");
                y = d("isBubble");
                L = d("bubbleSizeAbs");
                G = d("bubbleSizeByArea");
                p = d("uSampler");
                E = d("skipTranslation");
                w = d("isCircle");
                a = d("isInverted");
                return !0
            }

            function A(a, n) {
                c && e && (a = v[a] = v[a] || c.getUniformLocation(e, a), c.uniform1f(a, n))
            }

            var v =
                {}, e, f, m, t, y, L, G, E, w, a, K = [], p;
            return c && !k() ? !1 : {
                psUniform: function () {
                    return m
                }, pUniform: function () {
                    return f
                }, fillColorUniform: function () {
                    return t
                }, setBubbleUniforms: function (a, n, p) {
                    var d = a.options, f = Number.MAX_VALUE, b = -Number.MAX_VALUE;
                    c && e && "bubble" === a.type && (f = h(d.zMin, q(n, !1 === d.displayNegative ? d.zThreshold : -Number.MAX_VALUE, f)), b = h(d.zMax, Math.max(b, p)), c.uniform1i(y, 1), c.uniform1i(w, 1), c.uniform1i(G, "width" !== a.options.sizeBy), c.uniform1i(L, a.options.sizeByAbsoluteValue), A("bubbleZMin", f),
                        A("bubbleZMax", b), A("bubbleZThreshold", a.options.zThreshold), A("bubbleMinSize", a.minPxSize), A("bubbleMaxSize", a.maxPxSize))
                }, bind: function () {
                    c && e && c.useProgram(e)
                }, program: function () {
                    return e
                }, create: k, setUniform: A, setPMatrix: function (a) {
                    c && e && c.uniformMatrix4fv(f, !1, a)
                }, setColor: function (a) {
                    c && e && c.uniform4f(t, a[0] / 255, a[1] / 255, a[2] / 255, a[3])
                }, setPointSize: function (a) {
                    c && e && c.uniform1f(m, a)
                }, setSkipTranslation: function (a) {
                    c && e && c.uniform1i(E, !0 === a ? 1 : 0)
                }, setTexture: function (a) {
                    c && e && c.uniform1i(p,
                        a)
                }, setDrawAsCircle: function (a) {
                    c && e && c.uniform1i(w, a ? 1 : 0)
                }, reset: function () {
                    c && e && (c.uniform1i(y, 0), c.uniform1i(w, 0))
                }, setInverted: function (d) {
                    c && e && c.uniform1i(a, d)
                }, destroy: function () {
                    c && e && (c.deleteProgram(e), e = !1)
                }
            }
        }
    });
    r(b, "Extensions/Boost/WGLVBuffer.js", [], function () {
        return function (b, D, u) {
            function h() {
                c && (b.deleteBuffer(c), q = c = !1);
                A = 0;
                l = u || 2;
                v = []
            }

            var c = !1, q = !1, l = u || 2, k = !1, A = 0, v;
            return {
                destroy: h, bind: function () {
                    if (!c) return !1;
                    b.vertexAttribPointer(q, l, b.FLOAT, !1, 0, 0)
                }, data: v, build: function (e,
                                             f, m) {
                    var t;
                    v = e || [];
                    if (!(v && 0 !== v.length || k)) return h(), !1;
                    l = m || l;
                    c && b.deleteBuffer(c);
                    k || (t = new Float32Array(v));
                    c = b.createBuffer();
                    b.bindBuffer(b.ARRAY_BUFFER, c);
                    b.bufferData(b.ARRAY_BUFFER, k || t, b.STATIC_DRAW);
                    q = b.getAttribLocation(D.program(), f);
                    b.enableVertexAttribArray(q);
                    return !0
                }, render: function (e, f, m) {
                    var t = k ? k.length : v.length;
                    if (!c || !t) return !1;
                    if (!e || e > t || 0 > e) e = 0;
                    if (!f || f > t) f = t;
                    b.drawArrays(b[(m || "points").toUpperCase()], e / l, (f - e) / l);
                    return !0
                }, allocate: function (b) {
                    A = -1;
                    k = new Float32Array(4 *
                        b)
                }, push: function (b, f, c, t) {
                    k && (k[++A] = b, k[++A] = f, k[++A] = c, k[++A] = t)
                }
            }
        }
    });
    r(b, "Extensions/Boost/WGLRenderer.js", [b["Core/Color/Color.js"], b["Extensions/Boost/WGLShader.js"], b["Extensions/Boost/WGLVBuffer.js"], b["Core/Globals.js"], b["Core/Utilities.js"]], function (b, D, u, h, c) {
        var q = b.parse, l = h.doc, k = c.isNumber, A = c.isObject, v = c.merge, e = c.objectEach, f = c.pick;
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

            function y() {
                g.clear(g.COLOR_BUFFER_BIT | g.DEPTH_BUFFER_BIT)
            }

            function L(a, d) {
                function g(a) {
                    a && (d.colorData.push(a[0]), d.colorData.push(a[1]), d.colorData.push(a[2]), d.colorData.push(a[3]))
                }

                function p(a, d, b, p, c) {
                    g(c);
                    B.usePreallocated ? (n.push(a, d, b ? 1 : 0, p || 1), na += 4) : (Q.push(a), Q.push(d), Q.push(b ? 1 : 0), Q.push(p || 1))
                }

                function f() {
                    d.segments.length && (d.segments[d.segments.length - 1].to = Q.length || na)
                }

                function c() {
                    d.segments.length && d.segments[d.segments.length - 1].from === (Q.length || na) || (f(), d.segments.push({from: Q.length || na}))
                }

                function w(a, d, b, n, c) {
                    g(c);
                    p(a + b, d);
                    g(c);
                    p(a, d);
                    g(c);
                    p(a, d + n);
                    g(c);
                    p(a, d + n);
                    g(c);
                    p(a + b, d + n);
                    g(c);
                    p(a + b, d)
                }

                function K(a, b) {
                    B.useGPUTranslations || (d.skipTranslation = !0, a.x = u.toPixels(a.x, !0), a.y = L.toPixels(a.y, !0));
                    b ? Q = [a.x, a.y, 0, 2].concat(Q) : p(a.x, a.y, 0, 2)
                }

                var m = a.pointArrayMap && "low,high" === a.pointArrayMap.join(","), S = a.chart, e = a.options,
                    T = !!e.stacking, t = e.data, k = a.xAxis.getExtremes(),
                    h = k.min;
                k = k.max;
                var y = a.yAxis.getExtremes(), N = y.min;
                y = y.max;
                var l = a.xData || e.xData || a.processedXData, v = a.yData || e.yData || a.processedYData,
                    G = a.zData || e.zData || a.processedZData, L = a.yAxis, u = a.xAxis, E = a.chart.plotWidth,
                    D = !l || 0 === l.length, x = e.connectNulls, C = a.points || !1, H = !1, r = !1, J;
                l = T ? a.data : l || t;
                var ma = {x: Number.MAX_VALUE, y: 0}, P = {x: -Number.MAX_VALUE, y: 0}, O = 0, Ga = !1, M = -1, X = !1,
                    ea = !1, Y = "undefined" === typeof S.index, za = !1, V = !1, z = !1, Pa = ha[a.type], Aa = !1,
                    Ka = !0, Ha = !0, Qa = e.zoneAxis || "y", la = e.zones || !1, fa = !1, Ia =
                        e.threshold, Ba = !1;
                if (!(e.boostData && 0 < e.boostData.length)) {
                    e.gapSize && (Ba = "value" !== e.gapUnit ? e.gapSize * a.closestPointRange : e.gapSize);
                    la && (la.some(function (a) {
                        return "undefined" === typeof a.value ? (fa = new b(a.color), !0) : !1
                    }), fa || (fa = a.pointAttribs && a.pointAttribs().fill || a.color, fa = new b(fa)));
                    S.inverted && (E = a.chart.plotHeight);
                    a.closestPointRangePx = Number.MAX_VALUE;
                    c();
                    if (C && 0 < C.length) d.skipTranslation = !0, d.drawMode = "triangles", C[0].node && C[0].node.levelDynamic && C.sort(function (a, d) {
                        if (a.node) {
                            if (a.node.levelDynamic >
                                d.node.levelDynamic) return 1;
                            if (a.node.levelDynamic < d.node.levelDynamic) return -1
                        }
                        return 0
                    }), C.forEach(function (d) {
                        var b = d.plotY;
                        if ("undefined" !== typeof b && !isNaN(b) && null !== d.y && d.shapeArgs) {
                            var g = d.shapeArgs;
                            b = g.x;
                            b = void 0 === b ? 0 : b;
                            var p = g.y;
                            p = void 0 === p ? 0 : p;
                            var c = g.width;
                            c = void 0 === c ? 0 : c;
                            g = g.height;
                            g = void 0 === g ? 0 : g;
                            var n = S.styledMode ? d.series.colorAttribs(d) : n = d.series.pointAttribs(d);
                            d = n["stroke-width"] || 0;
                            z = q(n.fill).rgba;
                            z[0] /= 255;
                            z[1] /= 255;
                            z[2] /= 255;
                            "treemap" === a.type && (d = d || 1, J = q(n.stroke).rgba,
                                J[0] /= 255, J[1] /= 255, J[2] /= 255, w(b, p, c, g, J), d /= 2);
                            "heatmap" === a.type && S.inverted && (b = u.len - b, p = L.len - p, c = -c, g = -g);
                            w(b + d, p + d, c - 2 * d, g - 2 * d, z)
                        }
                    }); else {
                        for (; M < l.length - 1;) if (C = l[++M], "undefined" !== typeof C) {
                            if (Y) break;
                            var Ca = t && t[M];
                            !D && A(Ca, !0) && Ca.color && (z = q(Ca.color).rgba, z[0] /= 255, z[1] /= 255, z[2] /= 255);
                            if (D) {
                                var I = C[0];
                                var F = C[1];
                                l[M + 1] && (ea = l[M + 1][0]);
                                l[M - 1] && (X = l[M - 1][0]);
                                if (3 <= C.length) {
                                    var Ja = C[2];
                                    C[2] > d.zMax && (d.zMax = C[2]);
                                    C[2] < d.zMin && (d.zMin = C[2])
                                }
                            } else I = C, F = v[M], l[M + 1] && (ea = l[M + 1]), l[M - 1] &&
                            (X = l[M - 1]), G && G.length && (Ja = G[M], G[M] > d.zMax && (d.zMax = G[M]), G[M] < d.zMin && (d.zMin = G[M]));
                            if (x || null !== I && null !== F) {
                                ea && ea >= h && ea <= k && (za = !0);
                                X && X >= h && X <= k && (V = !0);
                                if (m) {
                                    D && (F = C.slice(1, 3));
                                    var ta = F[0];
                                    F = F[1]
                                } else T && (I = C.x, F = C.stackY, ta = F - C.y);
                                null !== N && "undefined" !== typeof N && null !== y && "undefined" !== typeof y && (Ka = F >= N && F <= y);
                                I > k && P.x < k && (P.x = I, P.y = F);
                                I < h && ma.x > h && (ma.x = I, ma.y = F);
                                if (null !== F || !x) if (null !== F && (Ka || za || V)) {
                                    if ((ea >= h || I >= h) && (X <= k || I <= k) && (Aa = !0), Aa || za || V) {
                                        Ba && I - X > Ba && c();
                                        la && (z = fa.rgba.slice(),
                                            la.some(function (a, d) {
                                                d = la[d - 1];
                                                if ("x" === Qa) {
                                                    if ("undefined" !== typeof a.value && I <= a.value) {
                                                        if (!d || I >= d.value) z = q(a.color).rgba;
                                                        return !0
                                                    }
                                                    return !1
                                                }
                                                if ("undefined" !== typeof a.value && F <= a.value) {
                                                    if (!d || F >= d.value) z = q(a.color).rgba;
                                                    return !0
                                                }
                                                return !1
                                            }), z[0] /= 255, z[1] /= 255, z[2] /= 255);
                                        if (!B.useGPUTranslations && (d.skipTranslation = !0, I = u.toPixels(I, !0), F = L.toPixels(F, !0), I > E && "points" === d.drawMode)) continue;
                                        d.hasMarkers && Aa && !1 !== H && (a.closestPointRangePx = Math.min(a.closestPointRangePx, Math.abs(I - H)));
                                        if (!B.useGPUTranslations &&
                                            !B.usePreallocated && H && 1 > Math.abs(I - H) && r && 1 > Math.abs(F - r)) B.debug.showSkipSummary && ++O; else {
                                            if (Pa) {
                                                H = ta;
                                                if (!1 === ta || "undefined" === typeof ta) H = 0 > F ? F : 0;
                                                m || T || (H = Math.max(null === Ia ? N : Ia, N));
                                                B.useGPUTranslations || (H = L.toPixels(H, !0));
                                                p(I, H, 0, 0, z)
                                            }
                                            e.step && !Ha && p(I, r, 0, 2, z);
                                            p(I, F, 0, "bubble" === a.type ? Ja || 1 : 2, z);
                                            H = I;
                                            r = F;
                                            Ga = !0;
                                            Ha = !1
                                        }
                                    }
                                } else c()
                            } else c()
                        }
                        B.debug.showSkipSummary && console.log("skipped points:", O);
                        Ga || !1 === x || "line_strip" !== a.drawMode || (ma.x < Number.MAX_VALUE && K(ma, !0), P.x > -Number.MAX_VALUE && K(P))
                    }
                    f()
                }
            }

            function G() {
                J = [];
                r.data = Q = [];
                x = [];
                n && n.destroy()
            }

            function E(a) {
                d && (d.setUniform("xAxisTrans", a.transA), d.setUniform("xAxisMin", a.min), d.setUniform("xAxisMinPad", a.minPixelPadding), d.setUniform("xAxisPointRange", a.pointRange), d.setUniform("xAxisLen", a.len), d.setUniform("xAxisPos", a.pos), d.setUniform("xAxisCVSCoord", !a.horiz), d.setUniform("xAxisIsLog", !!a.logarithmic), d.setUniform("xAxisReversed", !!a.reversed))
            }

            function w(a) {
                d && (d.setUniform("yAxisTrans", a.transA), d.setUniform("yAxisMin", a.min), d.setUniform("yAxisMinPad",
                    a.minPixelPadding), d.setUniform("yAxisPointRange", a.pointRange), d.setUniform("yAxisLen", a.len), d.setUniform("yAxisPos", a.pos), d.setUniform("yAxisCVSCoord", !a.horiz), d.setUniform("yAxisIsLog", !!a.logarithmic), d.setUniform("yAxisReversed", !!a.reversed))
            }

            function a(a, b) {
                d.setUniform("hasThreshold", a);
                d.setUniform("translatedThreshold", b)
            }

            function K(p) {
                if (p) N = p.chartWidth || 800, H = p.chartHeight || 400; else return !1;
                if (!(g && N && H && d)) return !1;
                B.debug.timeRendering && console.time("gl rendering");
                g.canvas.width =
                    N;
                g.canvas.height = H;
                d.bind();
                g.viewport(0, 0, N, H);
                d.setPMatrix([2 / N, 0, 0, 0, 0, -(2 / H), 0, 0, 0, 0, -2, 0, -1, 1, -1, 1]);
                1 < B.lineWidth && !h.isMS && g.lineWidth(B.lineWidth);
                n.build(r.data, "aVertexPosition", 4);
                n.bind();
                d.setInverted(p.inverted);
                J.forEach(function (c, K) {
                    var e = c.series.options, m = e.marker;
                    var t = "undefined" !== typeof e.lineWidth ? e.lineWidth : 1;
                    var l = e.threshold, h = k(l), y = c.series.yAxis.getThreshold(l);
                    l = f(e.marker ? e.marker.enabled : null, c.series.xAxis.isRadial ? !0 : null, c.series.closestPointRangePx > 2 * ((e.marker ?
                        e.marker.radius : 10) || 10));
                    m = V[m && m.symbol || c.series.symbol] || V.circle;
                    if (!(0 === c.segments.length || c.segmentslength && c.segments[0].from === c.segments[0].to)) {
                        m.isReady && (g.bindTexture(g.TEXTURE_2D, m.handle), d.setTexture(m.handle));
                        p.styledMode ? m = c.series.markerGroup && c.series.markerGroup.getStyle("fill") : (m = "points" === c.drawMode && c.series.pointAttribs && c.series.pointAttribs().fill || c.series.color, e.colorByPoint && (m = c.series.chart.options.colors[K]));
                        c.series.fillOpacity && e.fillOpacity && (m = (new b(m)).setOpacity(f(e.fillOpacity,
                            1)).get());
                        m = q(m).rgba;
                        B.useAlpha || (m[3] = 1);
                        "lines" === c.drawMode && B.useAlpha && 1 > m[3] && (m[3] /= 10);
                        "add" === e.boostBlending ? (g.blendFunc(g.SRC_ALPHA, g.ONE), g.blendEquation(g.FUNC_ADD)) : "mult" === e.boostBlending || "multiply" === e.boostBlending ? g.blendFunc(g.DST_COLOR, g.ZERO) : "darken" === e.boostBlending ? (g.blendFunc(g.ONE, g.ONE), g.blendEquation(g.FUNC_MIN)) : g.blendFuncSeparate(g.SRC_ALPHA, g.ONE_MINUS_SRC_ALPHA, g.ONE, g.ONE_MINUS_SRC_ALPHA);
                        d.reset();
                        0 < c.colorData.length && (d.setUniform("hasColor", 1), K = u(g, d),
                            K.build(c.colorData, "aColor", 4), K.bind());
                        d.setColor(m);
                        E(c.series.xAxis);
                        w(c.series.yAxis);
                        a(h, y);
                        "points" === c.drawMode && (e.marker && k(e.marker.radius) ? d.setPointSize(2 * e.marker.radius) : d.setPointSize(1));
                        d.setSkipTranslation(c.skipTranslation);
                        "bubble" === c.series.type && d.setBubbleUniforms(c.series, c.zMin, c.zMax);
                        d.setDrawAsCircle(Y[c.series.type] || !1);
                        if (0 < t || "line_strip" !== c.drawMode) for (t = 0; t < c.segments.length; t++) n.render(c.segments[t].from, c.segments[t].to, c.drawMode);
                        if (c.hasMarkers && l) for (e.marker &&
                                                    k(e.marker.radius) ? d.setPointSize(2 * e.marker.radius) : d.setPointSize(10), d.setDrawAsCircle(!0), t = 0; t < c.segments.length; t++) n.render(c.segments[t].from, c.segments[t].to, "POINTS")
                    }
                });
                B.debug.timeRendering && console.timeEnd("gl rendering");
                c && c();
                G()
            }

            function p(a) {
                y();
                if (a.renderer.forExport) return K(a);
                P ? K(a) : setTimeout(function () {
                    p(a)
                }, 1)
            }

            var d = !1, n = !1, na = 0, g = !1, N = 0, H = 0, Q = !1, x = !1, r = {}, P = !1, J = [], V = {},
                ha = {column: !0, columnrange: !0, bar: !0, area: !0, arearange: !0}, Y = {scatter: !0, bubble: !0},
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
            return r = {
                allocateBufferForSingleSeries: function (a) {
                    var d = 0;
                    B.usePreallocated && (a.isSeriesBoosting && (d = m(a)), n.allocate(d))
                }, pushSeries: function (a) {
                    0 < J.length && J[J.length - 1].hasMarkers && (J[J.length - 1].markerTo = x.length);
                    B.debug.timeSeriesProcessing && console.time("building " + a.type + " series");
                    var d = {
                        segments: [],
                        markerFrom: x.length,
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
                    };
                    a.index >= J.length ? J.push(d) : J[a.index] = d;
                    L(a, d);
                    B.debug.timeSeriesProcessing && console.timeEnd("building " + a.type + " series")
                }, setSize: function (a,
                                      c) {
                    N === a && H === c || !d || (N = a, H = c, d.bind(), d.setPMatrix([2 / N, 0, 0, 0, 0, -(2 / H), 0, 0, 0, 0, -2, 0, -1, 1, -1, 1]))
                }, inited: function () {
                    return P
                }, setThreshold: a, init: function (a, c) {
                    function b(a, d) {
                        var c = {isReady: !1, texture: l.createElement("canvas"), handle: g.createTexture()},
                            b = c.texture.getContext("2d");
                        V[a] = c;
                        c.texture.width = 512;
                        c.texture.height = 512;
                        b.mozImageSmoothingEnabled = !1;
                        b.webkitImageSmoothingEnabled = !1;
                        b.msImageSmoothingEnabled = !1;
                        b.imageSmoothingEnabled = !1;
                        b.strokeStyle = "rgba(255, 255, 255, 0)";
                        b.fillStyle =
                            "#FFF";
                        d(b);
                        try {
                            g.activeTexture(g.TEXTURE0), g.bindTexture(g.TEXTURE_2D, c.handle), g.texImage2D(g.TEXTURE_2D, 0, g.RGBA, g.RGBA, g.UNSIGNED_BYTE, c.texture), g.texParameteri(g.TEXTURE_2D, g.TEXTURE_WRAP_S, g.CLAMP_TO_EDGE), g.texParameteri(g.TEXTURE_2D, g.TEXTURE_WRAP_T, g.CLAMP_TO_EDGE), g.texParameteri(g.TEXTURE_2D, g.TEXTURE_MAG_FILTER, g.LINEAR), g.texParameteri(g.TEXTURE_2D, g.TEXTURE_MIN_FILTER, g.LINEAR), g.bindTexture(g.TEXTURE_2D, null), c.isReady = !0
                        } catch (U) {
                        }
                    }

                    var p = 0, e = ["webgl", "experimental-webgl", "moz-webgl",
                        "webkit-3d"];
                    P = !1;
                    if (!a) return !1;
                    for (B.debug.timeSetup && console.time("gl setup"); p < e.length && !(g = a.getContext(e[p], {})); p++) ;
                    if (g) c || G(); else return !1;
                    g.enable(g.BLEND);
                    g.blendFunc(g.SRC_ALPHA, g.ONE_MINUS_SRC_ALPHA);
                    g.disable(g.DEPTH_TEST);
                    g.depthFunc(g.LESS);
                    d = D(g);
                    if (!d) return !1;
                    n = u(g, d);
                    b("circle", function (a) {
                        a.beginPath();
                        a.arc(256, 256, 256, 0, 2 * Math.PI);
                        a.stroke();
                        a.fill()
                    });
                    b("square", function (a) {
                        a.fillRect(0, 0, 512, 512)
                    });
                    b("diamond", function (a) {
                        a.beginPath();
                        a.moveTo(256, 0);
                        a.lineTo(512, 256);
                        a.lineTo(256, 512);
                        a.lineTo(0, 256);
                        a.lineTo(256, 0);
                        a.fill()
                    });
                    b("triangle", function (a) {
                        a.beginPath();
                        a.moveTo(0, 512);
                        a.lineTo(256, 0);
                        a.lineTo(512, 512);
                        a.lineTo(0, 512);
                        a.fill()
                    });
                    b("triangle-down", function (a) {
                        a.beginPath();
                        a.moveTo(0, 0);
                        a.lineTo(256, 512);
                        a.lineTo(512, 0);
                        a.lineTo(0, 0);
                        a.fill()
                    });
                    P = !0;
                    B.debug.timeSetup && console.timeEnd("gl setup");
                    return !0
                }, render: p, settings: B, valid: function () {
                    return !1 !== g
                }, clear: y, flush: G, setXAxis: E, setYAxis: w, data: Q, gl: function () {
                    return g
                }, allocateBuffer: function (a) {
                    var d =
                        0;
                    B.usePreallocated && (a.series.forEach(function (a) {
                        a.isSeriesBoosting && (d += m(a))
                    }), n.allocate(d))
                }, destroy: function () {
                    G();
                    n.destroy();
                    d.destroy();
                    g && (e(V, function (a) {
                        a.handle && g.deleteTexture(a.handle)
                    }), g.canvas.width = 1, g.canvas.height = 1)
                }, setOptions: function (a) {
                    v(!0, B, a)
                }
            }
        }
    });
    r(b, "Extensions/Boost/BoostAttach.js", [b["Core/Chart/Chart.js"], b["Extensions/Boost/WGLRenderer.js"], b["Core/Globals.js"], b["Core/Utilities.js"]], function (b, D, u, h) {
        var c = u.doc, q = h.error, l;
        return function (k, h) {
            var v = k.chartWidth,
                e = k.chartHeight, f = k, m = k.seriesGroup || h.group,
                t = c.implementation.hasFeature("www.http://w3.org/TR/SVG11/feature#Extensibility", "1.1");
            f = k.isChartSeriesBoosting() ? k : h;
            t = !1;
            l || (l = c.createElement("canvas"));
            f.renderTarget || (f.canvas = l, k.renderer.forExport || !t ? (f.renderTarget = k.renderer.image("", 0, 0, v, e).addClass("highcharts-boost-canvas").add(m), f.boostClear = function () {
                    f.renderTarget.attr({href: ""})
                }, f.boostCopy = function () {
                    f.boostResizeTarget();
                    f.renderTarget.attr({href: f.canvas.toDataURL("image/png")})
                }) :
                (f.renderTargetFo = k.renderer.createElement("foreignObject").add(m), f.renderTarget = c.createElement("canvas"), f.renderTargetCtx = f.renderTarget.getContext("2d"), f.renderTargetFo.element.appendChild(f.renderTarget), f.boostClear = function () {
                    f.renderTarget.width = f.canvas.width;
                    f.renderTarget.height = f.canvas.height
                }, f.boostCopy = function () {
                    f.renderTarget.width = f.canvas.width;
                    f.renderTarget.height = f.canvas.height;
                    f.renderTargetCtx.drawImage(f.canvas, 0, 0)
                }), f.boostResizeTarget = function () {
                v = k.chartWidth;
                e = k.chartHeight;
                (f.renderTargetFo || f.renderTarget).attr({x: 0, y: 0, width: v, height: e}).css({
                    pointerEvents: "none",
                    mixedBlendMode: "normal",
                    opacity: 1
                });
                f instanceof b && f.markerGroup.translate(k.plotLeft, k.plotTop)
            }, f.boostClipRect = k.renderer.clipRect(), (f.renderTargetFo || f.renderTarget).clip(f.boostClipRect), f instanceof b && (f.markerGroup = f.renderer.g().add(m), f.markerGroup.translate(h.xAxis.pos, h.yAxis.pos)));
            f.canvas.width = v;
            f.canvas.height = e;
            f.boostClipRect.attr(k.getBoostClipRect(f));
            f.boostResizeTarget();
            f.boostClear();
            f.ogl || (f.ogl = D(function () {
                f.ogl.settings.debug.timeBufferCopy && console.time("buffer copy");
                f.boostCopy();
                f.ogl.settings.debug.timeBufferCopy && console.timeEnd("buffer copy")
            }), f.ogl.init(f.canvas) || q("[highcharts boost] - unable to init WebGL renderer"), f.ogl.setOptions(k.options.boost || {}), f instanceof b && f.ogl.allocateBuffer(k));
            f.ogl.setSize(v, e);
            return f.ogl
        }
    });
    r(b, "Extensions/Boost/BoostUtils.js", [b["Core/Globals.js"], b["Extensions/Boost/BoostableMap.js"], b["Extensions/Boost/BoostAttach.js"],
        b["Core/Utilities.js"]], function (b, D, u, h) {
        function c() {
            for (var c = [], b = 0; b < arguments.length; b++) c[b] = arguments[b];
            var e = -Number.MAX_VALUE;
            c.forEach(function (c) {
                if ("undefined" !== typeof c && null !== c && "undefined" !== typeof c.length && 0 < c.length) return e = c.length, !0
            });
            return e
        }

        function q(c, b, e) {
            c && b.renderTarget && b.canvas && !(e || b.chart).isChartSeriesBoosting() && c.render(e || b.chart)
        }

        function l(c, b) {
            c && b.renderTarget && b.canvas && !b.chart.isChartSeriesBoosting() && c.allocateBufferForSingleSeries(b)
        }

        function k(c,
                   b, e, f, l, h) {
            l = l || 0;
            f = f || 3E3;
            for (var w = l + f, a = !0; a && l < w && l < c.length;) a = b(c[l], l), ++l;
            a && (l < c.length ? h ? k(c, b, e, f, l, h) : v.requestAnimationFrame ? v.requestAnimationFrame(function () {
                k(c, b, e, f, l)
            }) : setTimeout(function () {
                k(c, b, e, f, l)
            }) : e && e())
        }

        function A() {
            var c = 0, b, f = ["webgl", "experimental-webgl", "moz-webgl", "webkit-3d"], l = !1;
            if ("undefined" !== typeof v.WebGLRenderingContext) for (b = e.createElement("canvas"); c < f.length; c++) try {
                if (l = b.getContext(f[c]), "undefined" !== typeof l && null !== l) return !0
            } catch (G) {
            }
            return !1
        }

        var v = b.win, e = b.doc, f = h.pick;
        h = {
            patientMax: c,
            boostEnabled: function (c) {
                return f(c && c.options && c.options.boost && c.options.boost.enabled, !0)
            },
            shouldForceChartSeriesBoosting: function (b) {
                var e = 0, l = 0, k = f(b.options.boost && b.options.boost.allowForce, !0);
                if ("undefined" !== typeof b.boostForceChartBoost) return b.boostForceChartBoost;
                if (1 < b.series.length) for (var m = 0; m < b.series.length; m++) {
                    var h = b.series[m];
                    0 !== h.options.boostThreshold && !1 !== h.visible && "heatmap" !== h.type && (D[h.type] && ++l, c(h.processedXData, h.options.data,
                        h.points) >= (h.options.boostThreshold || Number.MAX_VALUE) && ++e)
                }
                b.boostForceChartBoost = k && (l === b.series.length && 0 < e || 5 < e);
                return b.boostForceChartBoost
            },
            renderIfNotSeriesBoosting: q,
            allocateIfNotSeriesBoosting: l,
            eachAsync: k,
            hasWebGLSupport: A,
            pointDrawHandler: function (c) {
                var b = !0;
                this.chart.options && this.chart.options.boost && (b = "undefined" === typeof this.chart.options.boost.enabled ? !0 : this.chart.options.boost.enabled);
                if (!b || !this.isSeriesBoosting) return c.call(this);
                this.chart.isBoosting = !0;
                if (c = u(this.chart,
                    this)) l(c, this), c.pushSeries(this);
                q(c, this)
            }
        };
        b.hasWebGLSupport = A;
        return h
    });
    r(b, "Extensions/Boost/BoostInit.js", [b["Core/Chart/Chart.js"], b["Core/Globals.js"], b["Core/Series/Series.js"], b["Core/Series/SeriesRegistry.js"], b["Core/Utilities.js"], b["Extensions/Boost/BoostUtils.js"], b["Extensions/Boost/BoostAttach.js"]], function (b, D, u, h, c, r, l) {
        var k = D.noop, q = h.seriesTypes, v = c.addEvent, e = c.extend, f = c.fireEvent, m = c.wrap, t = r.eachAsync,
            y = r.pointDrawHandler, x = r.allocateIfNotSeriesBoosting, G = r.renderIfNotSeriesBoosting,
            E = r.shouldForceChartSeriesBoosting, w;
        return function () {
            e(u.prototype, {
                renderCanvas: function () {
                    function a(a, b) {
                        var d = !1, c = "undefined" === typeof h.index, e = !0;
                        if ("undefined" === typeof a) return !0;
                        if (!c) {
                            if (ja) {
                                var p = a[0];
                                var f = a[1]
                            } else p = a, f = v[b];
                            Z ? (ja && (f = a.slice(1, 3)), d = f[0], f = f[1]) : ia && (p = a.x, f = a.stackY, d = f - a.y);
                            ua || (e = f >= y && f <= A);
                            if (null !== f && p >= u && p <= D && e) if (a = g.toPixels(p, !0), B) {
                                if ("undefined" === typeof U || a === L) {
                                    Z || (d = f);
                                    if ("undefined" === typeof ca || f > ba) ba = f, ca = b;
                                    if ("undefined" === typeof U || d < R) R =
                                        d, U = b
                                }
                                a !== L && ("undefined" !== typeof U && (f = m.toPixels(ba, !0), T = m.toPixels(R, !0), da(a, f, ca), T !== f && da(a, T, U)), U = ca = void 0, L = a)
                            } else f = Math.ceil(m.toPixels(f, !0)), da(a, f, b)
                        }
                        return !c
                    }

                    function c() {
                        f(b, "renderedCanvas");
                        delete b.buildKDTree;
                        b.buildKDTree();
                        ra.debug.timeKDTree && console.timeEnd("kd tree building")
                    }

                    var b = this, d = b.options || {}, e = !1, h = b.chart, g = this.xAxis, m = this.yAxis,
                        q = d.xData || b.processedXData, v = d.yData || b.processedYData, r = d.data;
                    e = g.getExtremes();
                    var u = e.min, D = e.max;
                    e = m.getExtremes();
                    var y =
                            e.min, A = e.max, E = {}, L, B = !!b.sampling, S = !1 !== d.enableMouseTracking,
                        T = m.getThreshold(d.threshold),
                        Z = b.pointArrayMap && "low,high" === b.pointArrayMap.join(","), ia = !!d.stacking,
                        oa = b.cropStart || 0, ua = b.requireSorting, ja = !q, R, ba, U, ca,
                        qa = "x" === d.findNearestPointBy,
                        ka = this.xData || this.options.xData || this.processedXData || !1, da = function (a, b, d) {
                            a = Math.ceil(a);
                            w = qa ? a : a + "," + b;
                            S && !E[w] && (E[w] = !0, h.inverted && (a = g.len - a, b = m.len - b), sa.push({
                                x: ka ? ka[oa + d] : !1,
                                clientX: a,
                                plotX: a,
                                plotY: b,
                                i: oa + d
                            }))
                        };
                    e = l(h, b);
                    h.isBoosting = !0;
                    var ra = e.settings;
                    if (this.visible) {
                        (this.points || this.graph) && this.destroyGraphics();
                        h.isChartSeriesBoosting() ? (this.markerGroup && this.markerGroup !== h.markerGroup && this.markerGroup.destroy(), this.markerGroup = h.markerGroup, this.renderTarget && (this.renderTarget = this.renderTarget.destroy())) : (this.markerGroup === h.markerGroup && (this.markerGroup = void 0), this.markerGroup = b.plotGroup("markerGroup", "markers", !0, 1, h.seriesGroup));
                        var sa = this.points = [];
                        b.buildKDTree = k;
                        e && (x(e, this), e.pushSeries(b), G(e, this,
                            h));
                        h.renderer.forExport || (ra.debug.timeKDTree && console.time("kd tree building"), t(ia ? b.data : q || r, a, c))
                    }
                }
            });
            ["heatmap", "treemap"].forEach(function (a) {
                q[a] && m(q[a].prototype, "drawPoints", y)
            });
            q.bubble && (delete q.bubble.prototype.buildKDTree, m(q.bubble.prototype, "markerAttribs", function (a) {
                return this.isSeriesBoosting ? !1 : a.apply(this, [].slice.call(arguments, 1))
            }));
            q.scatter.prototype.fill = !0;
            e(q.area.prototype, {fill: !0, fillOpacity: !0, sampling: !0});
            e(q.column.prototype, {fill: !0, sampling: !0});
            b.prototype.propsRequireUpdateSeries.push("boost");
            b.prototype.callbacks.push(function (a) {
                v(a, "predraw", function () {
                    a.boostForceChartBoost = void 0;
                    a.boostForceChartBoost = E(a);
                    a.isBoosting = !1;
                    !a.isChartSeriesBoosting() && a.didBoost && (a.didBoost = !1);
                    a.boostClear && a.boostClear();
                    a.canvas && a.ogl && a.isChartSeriesBoosting() && (a.didBoost = !0, a.ogl.allocateBuffer(a));
                    a.markerGroup && a.xAxis && 0 < a.xAxis.length && a.yAxis && 0 < a.yAxis.length && a.markerGroup.translate(a.xAxis[0].pos, a.yAxis[0].pos)
                });
                v(a, "render", function () {
                    a.ogl && a.isChartSeriesBoosting() && a.ogl.render(a)
                });
                var b = -1, c = -1;
                v(a.pointer, "afterGetHoverData", function () {
                    var d = a.hoverSeries;
                    if (a.markerGroup && d) {
                        var e = a.inverted ? d.yAxis : d.xAxis;
                        d = a.inverted ? d.xAxis : d.yAxis;
                        if (e && e.pos !== b || d && d.pos !== c) a.markerGroup.translate(e.pos, d.pos), b = e.pos, c = d.pos
                    }
                })
            })
        }
    });
    r(b, "Extensions/BoostCanvas.js", [b["Core/Chart/Chart.js"], b["Core/Color/Color.js"], b["Core/Globals.js"], b["Core/Color/Palette.js"], b["Core/Series/Series.js"], b["Core/Series/SeriesRegistry.js"], b["Core/Utilities.js"]], function (b, r, u, h, c, x, l) {
        var k = r.parse,
            q = u.doc, v = u.noop, e = x.seriesTypes, f = l.addEvent, m = l.extend, t = l.fireEvent, y = l.isNumber,
            D = l.merge, G = l.pick, E = l.wrap, w;
        return function () {
            u.seriesTypes.heatmap && E(u.seriesTypes.heatmap.prototype, "drawPoints", function () {
                var a = this.chart, b = this.getContext(), c = this.chart.inverted, d = this.xAxis, e = this.yAxis;
                b ? (this.points.forEach(function (f) {
                    var g = f.plotY;
                    if ("undefined" !== typeof g && !isNaN(g) && null !== f.y && b) {
                        var p = f.shapeArgs || {};
                        g = p.x;
                        g = void 0 === g ? 0 : g;
                        var n = p.y;
                        n = void 0 === n ? 0 : n;
                        var w = p.width;
                        w = void 0 === w ? 0 :
                            w;
                        p = p.height;
                        p = void 0 === p ? 0 : p;
                        f = a.styledMode ? f.series.colorAttribs(f) : f.series.pointAttribs(f);
                        b.fillStyle = f.fill;
                        c ? b.fillRect(e.len - n + d.left, d.len - g + e.top, -p, -w) : b.fillRect(g + d.left, n + e.top, w, p)
                    }
                }), this.canvasToSVG()) : this.chart.showLoading("Your browser doesn't support HTML5 canvas, <br>please use a modern browser")
            });
            m(c.prototype, {
                getContext: function () {
                    var a = this.chart, b = a.chartWidth, c = a.chartHeight, d = a.seriesGroup || this.group, e = this,
                        f = function (a, b, d, c, e, f, g) {
                            a.call(this, d, b, c, e, f, g)
                        };
                    a.isChartSeriesBoosting() &&
                    (e = a, d = a.seriesGroup);
                    var g = e.ctx;
                    e.canvas || (e.canvas = q.createElement("canvas"), e.renderTarget = a.renderer.image("", 0, 0, b, c).addClass("highcharts-boost-canvas").add(d), e.ctx = g = e.canvas.getContext("2d"), a.inverted && ["moveTo", "lineTo", "rect", "arc"].forEach(function (a) {
                        E(g, a, f)
                    }), e.boostCopy = function () {
                        e.renderTarget.attr({href: e.canvas.toDataURL("image/png")})
                    }, e.boostClear = function () {
                        g.clearRect(0, 0, e.canvas.width, e.canvas.height);
                        e === this && e.renderTarget.attr({href: ""})
                    }, e.boostClipRect = a.renderer.clipRect(),
                        e.renderTarget.clip(e.boostClipRect));
                    e.canvas.width !== b && (e.canvas.width = b);
                    e.canvas.height !== c && (e.canvas.height = c);
                    e.renderTarget.attr({x: 0, y: 0, width: b, height: c, style: "pointer-events: none", href: ""});
                    e.boostClipRect.attr(a.getBoostClipRect(e));
                    return g
                }, canvasToSVG: function () {
                    this.chart.isChartSeriesBoosting() ? this.boostClear && this.boostClear() : (this.boostCopy || this.chart.boostCopy) && (this.boostCopy || this.chart.boostCopy)()
                }, cvsLineTo: function (a, b, c) {
                    a.lineTo(b, c)
                }, renderCanvas: function () {
                    var a =
                            this, b = a.options, c = a.chart, d = this.xAxis, e = this.yAxis,
                        q = (c.options.boost || {}).timeRendering || !1, g = 0, A = a.processedXData,
                        H = a.processedYData, E = b.data, x = d.getExtremes(), L = x.min, P = x.max;
                    x = e.getExtremes();
                    var J = x.min, V = x.max, ha = {}, Y, B = !!a.sampling, S = b.marker && b.marker.radius,
                        T = this.cvsDrawPoint, Z = b.lineWidth ? this.cvsLineTo : void 0,
                        ia = S && 1 >= S ? this.cvsMarkerSquare : this.cvsMarkerCircle, oa = this.cvsStrokeBatch || 1E3,
                        ua = !1 !== b.enableMouseTracking, ja;
                    x = b.threshold;
                    var R = e.getThreshold(x), ba = y(x), U = R, ca = this.fill,
                        qa = a.pointArrayMap && "low,high" === a.pointArrayMap.join(","), ka = !!b.stacking,
                        da = a.cropStart || 0;
                    x = c.options.loading;
                    var ra = a.requireSorting, sa, La = b.connectNulls, Da = !A, va, wa, aa, pa, xa,
                        W = ka ? a.data : A || E,
                        Ma = a.fillOpacity ? (new r(a.color)).setOpacity(G(b.fillOpacity, .75)).get() : a.color,
                        C = function () {
                            ca ? (O.fillStyle = Ma, O.fill()) : (O.strokeStyle = a.color, O.lineWidth = b.lineWidth, O.stroke())
                        }, Ea = function (b, d, e, f) {
                            0 === g && (O.beginPath(), Z && (O.lineJoin = "round"));
                            c.scroller && "highcharts-navigator-series" === a.options.className ?
                                (d += c.scroller.top, e && (e += c.scroller.top)) : d += c.plotTop;
                            b += c.plotLeft;
                            sa ? O.moveTo(b, d) : T ? T(O, b, d, e, ja) : Z ? Z(O, b, d) : ia && ia.call(a, O, b, d, S, f);
                            g += 1;
                            g === oa && (C(), g = 0);
                            ja = {clientX: b, plotY: d, yBottom: e}
                        }, Na = "x" === b.findNearestPointBy,
                        Fa = this.xData || this.options.xData || this.processedXData || !1, ya = function (a, b, f) {
                            xa = Na ? a : a + "," + b;
                            ua && !ha[xa] && (ha[xa] = !0, c.inverted && (a = d.len - a, b = e.len - b), Oa.push({
                                x: Fa ? Fa[da + f] : !1,
                                clientX: a,
                                plotX: a,
                                plotY: b,
                                i: da + f
                            }))
                        };
                    this.renderTarget && this.renderTarget.attr({href: ""});
                    (this.points ||
                        this.graph) && this.destroyGraphics();
                    a.plotGroup("group", "series", a.visible ? "visible" : "hidden", b.zIndex, c.seriesGroup);
                    a.markerGroup = a.group;
                    f(a, "destroy", function () {
                        a.markerGroup = null
                    });
                    var Oa = this.points = [];
                    var O = this.getContext();
                    a.buildKDTree = v;
                    this.boostClear && this.boostClear();
                    this.visible && (99999 < E.length && (c.options.loading = D(x, {
                        labelStyle: {
                            backgroundColor: k(h.backgroundColor).setOpacity(.75).get(),
                            padding: "1em",
                            borderRadius: "0.5em"
                        }, style: {backgroundColor: "none", opacity: 1}
                    }), l.clearTimeout(w),
                        c.showLoading("Drawing..."), c.options.loading = x), q && console.time("canvas rendering"), u.eachAsync(W, function (b, f) {
                        var g = !1, p = !1, w = !1, h = !1, l = "undefined" === typeof c.index, m = !0;
                        if (!l) {
                            if (Da) {
                                var k = b[0];
                                var n = b[1];
                                W[f + 1] && (w = W[f + 1][0]);
                                W[f - 1] && (h = W[f - 1][0])
                            } else k = b, n = H[f], W[f + 1] && (w = W[f + 1]), W[f - 1] && (h = W[f - 1]);
                            w && w >= L && w <= P && (g = !0);
                            h && h >= L && h <= P && (p = !0);
                            if (qa) {
                                Da && (n = b.slice(1, 3));
                                var K = n[0];
                                n = n[1]
                            } else ka && (k = b.x, n = b.stackY, K = n - b.y);
                            b = null === n;
                            ra || (m = n >= J && n <= V);
                            if (!b && (k >= L && k <= P && m || g || p)) if (k = Math.round(d.toPixels(k,
                                !0)), B) {
                                if ("undefined" === typeof aa || k === Y) {
                                    qa || (K = n);
                                    if ("undefined" === typeof pa || n > wa) wa = n, pa = f;
                                    if ("undefined" === typeof aa || K < va) va = K, aa = f
                                }
                                k !== Y && ("undefined" !== typeof aa && (n = e.toPixels(wa, !0), R = e.toPixels(va, !0), Ea(k, ba ? Math.min(n, U) : n, ba ? Math.max(R, U) : R, f), ya(k, n, pa), R !== n && ya(k, R, aa)), aa = pa = void 0, Y = k)
                            } else n = Math.round(e.toPixels(n, !0)), Ea(k, n, R, f), ya(k, n, f);
                            sa = b && !La;
                            0 === f % 5E4 && (a.boostCopy || a.chart.boostCopy) && (a.boostCopy || a.chart.boostCopy)()
                        }
                        return !l
                    }, function () {
                        var b = c.loadingDiv, d = c.loadingShown;
                        C();
                        a.canvasToSVG();
                        q && console.timeEnd("canvas rendering");
                        t(a, "renderedCanvas");
                        d && (m(b.style, {
                            transition: "opacity 250ms",
                            opacity: 0
                        }), c.loadingShown = !1, w = setTimeout(function () {
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
                a.rect(b -
                    d, c - d, 2 * d, 2 * d)
            };
            e.scatter.prototype.fill = !0;
            e.bubble && (e.bubble.prototype.cvsMarkerCircle = function (a, b, c, d, e) {
                a.moveTo(b, c);
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
                    a.canvas && a.canvas.getContext("2d").clearRect(0, 0, a.canvas.width, a.canvas.height)
                });
                f(a, "render", function () {
                    a.boostCopy && a.boostCopy()
                })
            })
        }
    });
    r(b, "Extensions/Boost/BoostOverrides.js", [b["Core/Chart/Chart.js"], b["Core/Options.js"], b["Core/Series/Point.js"], b["Core/Series/Series.js"], b["Core/Series/SeriesRegistry.js"], b["Core/Utilities.js"], b["Extensions/Boost/BoostUtils.js"], b["Extensions/Boost/Boostables.js"],
        b["Extensions/Boost/BoostableMap.js"]], function (b, r, u, h, c, x, l, k, A) {
        r = r.getOptions;
        var q = c.seriesTypes;
        c = x.addEvent;
        var e = x.error, f = x.isArray, m = x.isNumber, t = x.pick, y = x.wrap, D = l.boostEnabled,
            G = l.shouldForceChartSeriesBoosting, E = r().plotOptions;
        b.prototype.isChartSeriesBoosting = function () {
            return t(this.options.boost && this.options.boost.seriesThreshold, 50) <= this.series.length || G(this)
        };
        b.prototype.getBoostClipRect = function (b) {
            var a = {x: this.plotLeft, y: this.plotTop, width: this.plotWidth, height: this.plotHeight};
            b === this && (b = this.inverted ? this.xAxis : this.yAxis, 1 >= b.length ? (a.y = Math.min(b[0].pos, a.y), a.height = b[0].pos - this.plotTop + b[0].len) : a.height = this.plotHeight);
            return a
        };
        h.prototype.getPoint = function (b) {
            var a = b, c = this.xData || this.options.xData || this.processedXData || !1;
            !b || b instanceof this.pointClass || (a = (new this.pointClass).init(this, this.options.data[b.i], c ? c[b.i] : void 0), a.category = t(this.xAxis.categories ? this.xAxis.categories[a.x] : a.x, a.x), a.dist = b.dist, a.distX = b.distX, a.plotX = b.plotX, a.plotY = b.plotY,
                a.index = b.i, a.isInside = this.isPointInside(b));
            return a
        };
        y(h.prototype, "searchPoint", function (b) {
            return this.getPoint(b.apply(this, [].slice.call(arguments, 1)))
        });
        y(u.prototype, "haloPath", function (b) {
            var a = this.series, c = this.plotX, e = this.plotY, d = a.chart.inverted;
            a.isSeriesBoosting && d && (this.plotX = a.yAxis.len - e, this.plotY = a.xAxis.len - c);
            var f = b.apply(this, Array.prototype.slice.call(arguments, 1));
            a.isSeriesBoosting && d && (this.plotX = c, this.plotY = e);
            return f
        });
        y(h.prototype, "markerAttribs", function (b, a) {
            var c =
                a.plotX, e = a.plotY, d = this.chart.inverted;
            this.isSeriesBoosting && d && (a.plotX = this.yAxis.len - e, a.plotY = this.xAxis.len - c);
            var f = b.apply(this, Array.prototype.slice.call(arguments, 1));
            this.isSeriesBoosting && d && (a.plotX = c, a.plotY = e);
            return f
        });
        c(h, "destroy", function () {
            var b = this, a = b.chart;
            a.markerGroup === b.markerGroup && (b.markerGroup = null);
            a.hoverPoints && (a.hoverPoints = a.hoverPoints.filter(function (a) {
                return a.series === b
            }));
            a.hoverPoint && a.hoverPoint.series === b && (a.hoverPoint = null)
        });
        y(h.prototype, "getExtremes",
            function (b) {
                return this.isSeriesBoosting && this.hasExtremes && this.hasExtremes() ? {} : b.apply(this, Array.prototype.slice.call(arguments, 1))
            });
        ["translate", "generatePoints", "drawTracker", "drawPoints", "render"].forEach(function (b) {
            function a(a) {
                var c = this.options.stacking && ("translate" === b || "generatePoints" === b);
                if (!this.isSeriesBoosting || c || !D(this.chart) || "heatmap" === this.type || "treemap" === this.type || !A[this.type] || 0 === this.options.boostThreshold) a.call(this); else if (this[b + "Canvas"]) this[b + "Canvas"]()
            }

            y(h.prototype, b, a);
            "translate" === b && "column bar arearange columnrange heatmap treemap".split(" ").forEach(function (c) {
                q[c] && y(q[c].prototype, b, a)
            })
        });
        y(h.prototype, "processData", function (b) {
            function a(a) {
                return c.chart.isChartSeriesBoosting() || (a ? a.length : 0) >= (c.options.boostThreshold || Number.MAX_VALUE)
            }

            var c = this, h = this.options.data;
            D(this.chart) && A[this.type] ? (a(h) && "heatmap" !== this.type && "treemap" !== this.type && !this.options.stacking && this.hasExtremes && this.hasExtremes(!0) || (b.apply(this, Array.prototype.slice.call(arguments,
                1)), h = this.processedXData), (this.isSeriesBoosting = a(h)) ? (this.options.data && this.options.data.length && (h = this.getFirstValidPoint(this.options.data), m(h) || f(h) || e(12, !1, this.chart)), this.enterBoost()) : this.exitBoost && this.exitBoost()) : b.apply(this, Array.prototype.slice.call(arguments, 1))
        });
        c(h, "hide", function () {
            this.canvas && this.renderTarget && (this.ogl && this.ogl.clear(), this.boostClear())
        });
        h.prototype.enterBoost = function () {
            this.alteredByBoost = [];
            ["allowDG", "directTouch", "stickyTracking"].forEach(function (b) {
                this.alteredByBoost.push({
                    prop: b,
                    val: this[b], own: Object.hasOwnProperty.call(this, b)
                })
            }, this);
            this.directTouch = this.allowDG = !1;
            this.finishedAnimating = this.stickyTracking = !0;
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
                d = this.colorAxis &&
                    this.colorAxis.options;
            return a.data.length > (a.boostThreshold || Number.MAX_VALUE) && m(e.min) && m(e.max) && (!b || m(c.min) && m(c.max)) && (!d || m(d.min) && m(d.max))
        };
        h.prototype.destroyGraphics = function () {
            var b = this, a = this, c = this.points, e, d;
            if (c) for (d = 0; d < c.length; d += 1) (e = c[d]) && e.destroyElements && e.destroyElements();
            ["graph", "area", "tracker"].forEach(function (b) {
                a[b] && (a[b] = a[b].destroy())
            });
            this.getZonesGraphs && this.getZonesGraphs([["graph", "highcharts-graph"]]).forEach(function (a) {
                var c = b[a[0]];
                c && (b[a[0]] =
                    c.destroy())
            })
        };
        k.forEach(function (b) {
            E[b] && (E[b].boostThreshold = 5E3, E[b].boostData = [], q[b].prototype.fillOpacity = !0)
        })
    });
    r(b, "Extensions/Boost/NamedColors.js", [b["Core/Color/Color.js"]], function (b) {
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
    r(b, "Extensions/Boost/Boost.js", [b["Extensions/Boost/BoostUtils.js"], b["Extensions/Boost/BoostInit.js"], b["Extensions/BoostCanvas.js"], b["Core/Utilities.js"]], function (b, r, u, h) {
        h = h.error;
        b = b.hasWebGLSupport;
        b() ? r() : "undefined" !== typeof u ? u() : h(26)
    });
    r(b, "masters/modules/boost.src.js", [], function () {
    })
});
//# sourceMappingURL=boost.js.map
