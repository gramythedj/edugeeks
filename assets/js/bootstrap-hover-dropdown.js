! function (n, e, o)
{
    var t = n();
    n.fn.dropdownHover = function (o)
    {
        return "ontouchstart" in document ? this : (t = t.add(this.parent()), this.each(function ()
        {
            var r, i = n(this),
                d = i.parent(),
                s = {
                    delay: n(this).data("delay"),
                    instantlyCloseOthers: n(this).data("close-others")
                },
                a = "show.bs.dropdown",
                u = n.extend(!0,
                {},
                {
                    delay: 500,
                    instantlyCloseOthers: !0
                }, o, s);

            function h(o)
            {
                n(document).width() > 760 && (t.find(":focus").blur(), !0 === u.instantlyCloseOthers && t.removeClass("open"), e.clearTimeout(r), d.addClass("open"), i.trigger(a))
            }
            d.hover(function (n)
            {
                if (!d.hasClass("open") && !i.is(n.target)) return !0;
                h(n)
            }, function ()
            {
                n(document).width() > 768 && (r = e.setTimeout(function ()
                {
                    d.removeClass("open"), i.trigger("hide.bs.dropdown")
                }, u.delay))
            }), i.hover(function (n)
            {
                if (!d.hasClass("open") && !d.is(n.target)) return !0;
                h(n)
            }), d.find(".dropdown-submenu").each(function ()
            {
                var o, t = n(this);
                t.hover(function ()
                {
                    e.clearTimeout(o), t.children(".dropdown-menu").show(), t.siblings().children(".dropdown-menu").hide()
                }, function ()
                {
                    var n = t.children(".dropdown-menu");
                    o = e.setTimeout(function ()
                    {
                        n.hide()
                    }, u.delay)
                })
            })
        }))
    }, n(document).ready(function ()
    {
        n('[data-hover="dropdown"]').dropdownHover()
    })
}(jQuery, this);