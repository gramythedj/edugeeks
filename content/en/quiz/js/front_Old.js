function demo()
{
    $.cookie("theme_csspath") && $("link#theme-stylesheet").attr("href", $.cookie("theme_csspath")), $("#colour").change(function ()
    {
        if ("" !== $(this).val())
        {
            var t = "css/style." + $(this).val() + ".css";
            $("link#theme-stylesheet").attr("href", t), $.cookie("theme_csspath", t,
            {
                expires: 365,
                path: "/"
            })
        }
        return !1
    }), $("#layout").change(function ()
    {
        if ("" !== $(this).val())
        {
            var t = $(this).val();
            $("body").removeClass("wide"), $("body").removeClass("boxed"), $("body").addClass(t), $.cookie("theme_layout", t,
            {
                expires: 365,
                path: "/"
            })
        }
        return !1
    })
}

function sliderHomepage()
{
    if ($("#slider").length)
    {
        $("#slider");
        $("#slider").owlCarousel(
        {
            autoPlay: 3e3,
            items: 4,
            itemsDesktopSmall: [900, 3],
            itemsTablet: [600, 3],
            itemsMobile: [500, 2]
        })
    }
}

function sliders()
{
    $(".owl-carousel").length && ($(".customers").owlCarousel(
    {
        items: 6,
        itemsDesktopSmall: [990, 4],
        itemsTablet: [768, 2],
        itemsMobile: [480, 1]
    }), $(".testimonials").owlCarousel(
    {
        items: 4,
        itemsDesktopSmall: [990, 3],
        itemsTablet: [768, 2],
        itemsMobile: [480, 1]
    }), $(".project").owlCarousel(
    {
        navigation: !0,
        navigationText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"],
        slideSpeed: 300,
        paginationSpeed: 400,
        autoPlay: !0,
        stopOnHover: !0,
        singleItem: !0,
        afterInit: "",
        lazyLoad: !0
    }), $(".homepage").owlCarousel(
    {
        navigation: !1,
        navigationText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"],
        slideSpeed: 2e3,
        paginationSpeed: 1e3,
        autoPlay: !0,
        stopOnHover: !0,
        singleItem: !0,
        lazyLoad: !1,
        addClassActive: !0,
        afterInit: function () {},
        afterMove: function () {}
    }))
}

function menuSliding()
{
    $(".dropdown").on("show.bs.dropdown", function (t)
    {
        $(window).width() > 750 ? $(this).find(".dropdown-menu").first().stop(!0, !0).slideDown() : $(this).find(".dropdown-menu").first().stop(!0, !0).show()
    }), $(".dropdown").on("hide.bs.dropdown", function (t)
    {
        $(window).width() > 750 ? $(this).find(".dropdown-menu").first().stop(!0, !0).slideUp() : $(this).find(".dropdown-menu").first().stop(!0, !0).hide()
    })
}

function animations()
{
    delayTime = 0, $("[data-animate]").css(
    {
        opacity: "0"
    }), $("[data-animate]").waypoint(function (t)
    {
        delayTime += 150, $(this).delay(delayTime).queue(function (t)
        {
            $(this).toggleClass("animated"), $(this).toggleClass($(this).data("animate")), delayTime = 0, t()
        })
    },
    {
        offset: "90%",
        triggerOnce: !0
    }), $("[data-animate-hover]").hover(function ()
    {
        $(this).css(
        {
            opacity: 1
        }), $(this).addClass("animated"), $(this).removeClass($(this).data("animate")), $(this).addClass($(this).data("animate-hover"))
    }, function ()
    {
        $(this).removeClass("animated"), $(this).removeClass($(this).data("animate-hover"))
    })
}

function animationsSlider()
{
    var t = 400;
    $(".owl-item:not(.active) [data-animate-always]").each(function ()
    {
        $(this).removeClass("animated"), $(this).removeClass($(this).data("animate-always")), $(this).stop(!0, !0, !0).css(
        {
            opacity: 0
        })
    }), $(".owl-item.active [data-animate-always]").each(function ()
    {
        t += 500, $(this).delay(t).queue(function (t)
        {
            $(this).addClass("animated"), $(this).addClass($(this).data("animate-always")), console.log($(this).data("animate-always"))
        })
    })
}

function counters()
{
    $(".counter").counterUp(
    {
        delay: 10,
        time: 1e3
    })
}

function pictureZoom()
{
    $(".product .image, .post .image, .photostream div").each(function ()
    {
        var t = $(this).find("img").height();
        $(this).height(t)
    })
}

function fullScreenContainer()
{
    var t = $(window).width() + "px";
    if ($(window).height() > 500) var e = $(window).height() + "px";
    else e = "500px";
    $("#intro, #intro .item").css(
    {
        width: t,
        height: e
    })
}

function utils()
{
    $('[data-toggle="tooltip"]').tooltip(), $("#checkout").on("click", ".box.shipping-method, .box.payment-method", function (t)
    {
        $(this).find(":radio").prop("checked", !0)
    }), $(".box.clickable").on("click", function (t)
    {
        window.location = $(this).find("a").attr("href")
    }), $(".external").on("click", function (t)
    {
        t.preventDefault(), window.open($(this).attr("href"))
    }), $(".scroll-to, .scroll-to-top").click(function (t)
    {
        var e = this.href;
        e.split("#").length > 1 && (! function (t)
        {
            var e = t.split("#")[1],
                i = $("#" + e).offset().top - 100;
            i < 0 && (i = 0);
            $("html, body").animate(
            {
                scrollTop: i
            }, 1e3)
        }(e), t.preventDefault())
    })
}

function productDetailGallery(t)
{
    function e()
    {
        var t = $(".thumb.active").closest("div").next("div").find(".thumb");
        0 == t.length && (t = $(".thumb:first")), i(t)
    }

    function i(t)
    {
        $(".thumb").removeClass("active");
        var e = t.attr("href");
        t.addClass("active"), $("#mainImage img").attr("src", e)
    }
    $(".thumb:first").addClass("active"), timer = setInterval(e, t), $(".thumb").click(function (a)
    {
        i($(this)), clearInterval(timer), timer = setInterval(e, t), a.preventDefault()
    }), $("#mainImage").hover(function ()
    {
        clearInterval(timer)
    }, function ()
    {
        timer = setInterval(e, t)
    })
}

function productDetailSizes()
{
    $(".sizes a").click(function (t)
    {
        t.preventDefault(), $(".sizes a").removeClass("active"), $(".size-input").prop("checked", !1), $(this).addClass("active"), $(this).next("input").prop("checked", !0)
    })
}
$.cookie("theme_csspath") && $("link#theme-stylesheet").attr("href", $.cookie("theme_csspath")), $.cookie("theme_layout") && $("body").addClass($.cookie("theme_layout")), $(function ()
{
    sliderHomepage(), sliders(), fullScreenContainer(), productDetailGallery(4e3), menuSliding(), productDetailSizes(), utils(), animations(), counters(), demo()
}), $.fn.alignElementsSameHeight = function ()
{
    $(".same-height-row").each(function ()
    {
        var t = 0,
            e = $(this).find(".same-height");
        e.height("auto"), $(window).width() > 768 && (e.each(function ()
        {
            $(this).innerHeight() > t && (t = $(this).innerHeight())
        }), e.innerHeight(t)), t = 0, (e = $(this).find(".same-height-always")).height("auto"), e.each(function ()
        {
            $(this).height() > t && (t = $(this).innerHeight())
        }), e.innerHeight(t)
    })
}, $(window).load(function ()
{
    windowWidth = $(window).width(), $(this).alignElementsSameHeight(), pictureZoom()
}), $(window).resize(function ()
{
    newWindowWidth = $(window).width(), windowWidth !== newWindowWidth && (setTimeout(function ()
    {
        $(this).alignElementsSameHeight(), fullScreenContainer(), pictureZoom()
    }, 205), windowWidth = newWindowWidth)
});