/*
 Highcharts JS v9.0.0 (2021-02-02)

 Bullet graph series type for Highcharts

 (c) 2010-2019 Kacper Madej

 License: www.highcharts.com/license
*/
(function (b) {
    "object" === typeof module && module.exports ? (b["default"] = b, module.exports = b) : "function" === typeof define && define.amd ? define("highcharts/modules/bullet", ["highcharts"], function (d) {
        b(d);
        b.Highcharts = d;
        return b
    }) : b("undefined" !== typeof Highcharts ? Highcharts : void 0)
})(function (b) {
    function d(b, f, a, q) {
        b.hasOwnProperty(f) || (b[f] = q.apply(null, a))
    }

    b = b ? b._modules : {};
    d(b, "Series/Bullet/BulletPoint.js", [b["Series/Column/ColumnSeries.js"]], function (b) {
        var f = this && this.__extends || function () {
            var b = function (a,
                              c) {
                b = Object.setPrototypeOf || {__proto__: []} instanceof Array && function (b, a) {
                    b.__proto__ = a
                } || function (b, a) {
                    for (var c in a) a.hasOwnProperty(c) && (b[c] = a[c])
                };
                return b(a, c)
            };
            return function (a, c) {
                function f() {
                    this.constructor = a
                }

                b(a, c);
                a.prototype = null === c ? Object.create(c) : (f.prototype = c.prototype, new f)
            }
        }();
        return function (b) {
            function a() {
                var a = null !== b && b.apply(this, arguments) || this;
                a.options = void 0;
                a.series = void 0;
                return a
            }

            f(a, b);
            a.prototype.destroy = function () {
                this.targetGraphic && (this.targetGraphic = this.targetGraphic.destroy());
                b.prototype.destroy.apply(this, arguments)
            };
            return a
        }(b.prototype.pointClass)
    });
    d(b, "Series/Bullet/BulletSeries.js", [b["Series/Bullet/BulletPoint.js"], b["Core/Series/SeriesRegistry.js"], b["Core/Utilities.js"]], function (b, f, a) {
        var d = this && this.__extends || function () {
            var b = function (a, e) {
                b = Object.setPrototypeOf || {__proto__: []} instanceof Array && function (b, a) {
                    b.__proto__ = a
                } || function (b, a) {
                    for (var e in a) a.hasOwnProperty(e) && (b[e] = a[e])
                };
                return b(a, e)
            };
            return function (a, e) {
                function h() {
                    this.constructor = a
                }

                b(a, e);
                a.prototype = null === e ? Object.create(e) : (h.prototype = e.prototype, new h)
            }
        }(), c = f.seriesTypes.column, r = a.extend, m = a.isNumber, t = a.merge, n = a.pick, v = a.relativeLength;
        a = function (b) {
            function a() {
                var a = null !== b && b.apply(this, arguments) || this;
                a.data = void 0;
                a.options = void 0;
                a.points = void 0;
                a.targetData = void 0;
                return a
            }

            d(a, b);
            a.prototype.drawPoints = function () {
                var a = this, h = a.chart, c = a.options, f = c.animationLimit || 250;
                b.prototype.drawPoints.apply(this, arguments);
                a.points.forEach(function (b) {
                    var e = b.options,
                        g = b.targetGraphic, d = b.target, p = b.y;
                    if (m(d) && null !== d) {
                        var k = t(c.targetOptions, e.targetOptions);
                        var q = k.height;
                        var l = b.shapeArgs;
                        var u = v(k.width, l.width);
                        var r = a.yAxis.translate(d, !1, !0, !1, !0) - k.height / 2 - .5;
                        l = a.crispCol.apply({
                            chart: h,
                            borderWidth: k.borderWidth,
                            options: {crisp: c.crisp}
                        }, [l.x + l.width / 2 - u / 2, r, u, q]);
                        g ? (g[h.pointCount < f ? "animate" : "attr"](l), m(p) && null !== p ? g.element.point = b : g.element.point = void 0) : b.targetGraphic = g = h.renderer.rect().attr(l).add(a.group);
                        h.styledMode || g.attr({
                            fill: n(k.color,
                                e.color, a.zones.length && (b.getZone.call({
                                series: a,
                                x: b.x,
                                y: d,
                                options: {}
                            }).color || a.color) || void 0, b.color, a.color),
                            stroke: n(k.borderColor, b.borderColor, a.options.borderColor),
                            "stroke-width": k.borderWidth
                        });
                        m(p) && null !== p && (g.element.point = b);
                        g.addClass(b.getClassName() + " highcharts-bullet-target", !0)
                    } else g && (b.targetGraphic = g.destroy())
                })
            };
            a.prototype.getExtremes = function (a) {
                var c = this.targetData;
                a = b.prototype.getExtremes.call(this, a);
                c && c.length && (c = b.prototype.getExtremes.call(this, c), m(c.dataMin) &&
                (a.dataMin = Math.min(n(a.dataMin, Infinity), c.dataMin)), m(c.dataMax) && (a.dataMax = Math.max(n(a.dataMax, -Infinity), c.dataMax)));
                return a
            };
            a.defaultOptions = t(c.defaultOptions, {
                targetOptions: {width: "140%", height: 3, borderWidth: 0},
                tooltip: {pointFormat: '<span style="color:{series.color}">\u25cf</span> {series.name}: <b>{point.y}</b>. Target: <b>{point.target}</b><br/>'}
            });
            return a
        }(c);
        r(a.prototype, {parallelArrays: ["x", "y", "target"], pointArrayMap: ["y", "target"]});
        a.prototype.pointClass = b;
        f.registerSeriesType("bullet",
            a);
        "";
        return a
    });
    d(b, "masters/modules/bullet.src.js", [], function () {
    })
});
//# sourceMappingURL=bullet.js.map
