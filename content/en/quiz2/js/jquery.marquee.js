! function (t)
{
    t.fn.marquee = function (i)
    {
        var a = [],
            e = this.length;

        function r(t, i, a)
        {
            var e = a.behavior,
                r = a.width,
                s = a.dir;
            return "alternate" == e ? 1 == t ? i[a.widthAxis] - 2 * r : r : "slide" == e ? -1 == t ? -1 == s ? i[a.widthAxis] : r : -1 == s ? i[a.widthAxis] - 2 * r : 0 : -1 == t ? i[a.widthAxis] : 0
        }

        function s()
        {
            for (var i = a.length, e = null, d = null, l = {}, o = [], n = !1; i--;) e = a[i], l = (d = t(e)).data("marqueeState"), !0 !== d.data("paused") ? (e[l.axis] += l.scrollamount * l.dir, n = -1 == l.dir ? e[l.axis] <= r(-1 * l.dir, e, l) : e[l.axis] >= r(-1 * l.dir, e, l), "scroll" == l.behavior && l.last == e[l.axis] || "alternate" == l.behavior && n && -1 != l.last || "slide" == l.behavior && n && -1 != l.last ? ("alternate" == l.behavior && (l.dir *= -1), l.last = -1, d.trigger("stop"), l.loops--, 0 === l.loops ? ("slide" != l.behavior ? e[l.axis] = r(l.dir, e, l) : e[l.axis] = r(-1 * l.dir, e, l), d.trigger("end")) : (o.push(e), d.trigger("start"), e[l.axis] = r(l.dir, e, l))) : o.push(e), l.last = e[l.axis], d.data("marqueeState", l)) : o.push(e);
            (a = o).length && setTimeout(s, 25)
        }
        return this.each(function (d)
        {
            var l = t(this),
                o = l.attr("width") || l.width(),
                n = l.attr("height") || l.height(),
                h = l.after("<div " + (i ? 'class="' + i + '" ' : "") + 'style="display: block-inline; width: ' + o + "px; height: " + n + 'px; overflow: hidden;"><div style="float: left; white-space: nowrap;">' + l.html() + "</div></div>").next(),
                u = h.get(0),
                p = (l.attr("direction") || "left").toLowerCase(),
                c = {
                    dir: /down|right/.test(p) ? -1 : 1,
                    axis: /left|right/.test(p) ? "scrollLeft" : "scrollTop",
                    widthAxis: /left|right/.test(p) ? "scrollWidth" : "scrollHeight",
                    last: -1,
                    loops: l.attr("loop") || -1,
                    scrollamount: l.attr("scrollamount") || this.scrollAmount || 2,
                    behavior: (l.attr("behavior") || "scroll").toLowerCase(),
                    width: /left|right/.test(p) ? o : n
                }; - 1 == l.attr("loop") && "slide" == c.behavior && (c.loops = 1), l.remove(), /left|right/.test(p) ? h.find("> div").css("padding", "0 " + o + "px") : h.find("> div").css("padding", n + "px 0"), h.bind("stop", function ()
            {
                h.data("paused", !0)
            }).bind("pause", function ()
            {
                h.data("paused", !0)
            }).bind("start", function ()
            {
                h.data("paused", !1)
            }).bind("unpause", function ()
            {
                h.data("paused", !1)
            }).data("marqueeState", c), a.push(u), u[c.axis] = r(c.dir, u, c), h.trigger("start"), d + 1 == e && s()
        }), t(a)
    }
}(jQuery);