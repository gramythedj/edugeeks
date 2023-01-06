/*!
 * beagle v1.2.1-prerelease (http://foxythemes.net/themes/beagle)
 * Copyright 2014-2017 Foxy Themes all rights reserved
 */
function FastClick(a, b) {
  "use strict";
  function c(a, b) {
    return function () {
      return a.apply(b, arguments);
    };
  }
  var d;
  if (
    ((b = b || {}),
    (this.trackingClick = !1),
    (this.trackingClickStart = 0),
    (this.targetElement = null),
    (this.touchStartX = 0),
    (this.touchStartY = 0),
    (this.lastTouchIdentifier = 0),
    (this.touchBoundary = b.touchBoundary || 10),
    (this.layer = a),
    (this.tapDelay = b.tapDelay || 200),
    !FastClick.notNeeded(a))
  ) {
    for (
      var e = [
          "onMouse",
          "onClick",
          "onTouchStart",
          "onTouchMove",
          "onTouchEnd",
          "onTouchCancel",
        ],
        f = this,
        g = 0,
        h = e.length;
      g < h;
      g++
    )
      f[e[g]] = c(f[e[g]], f);
    deviceIsAndroid &&
      (a.addEventListener("mouseover", this.onMouse, !0),
      a.addEventListener("mousedown", this.onMouse, !0),
      a.addEventListener("mouseup", this.onMouse, !0)),
      a.addEventListener("click", this.onClick, !0),
      a.addEventListener("touchstart", this.onTouchStart, !1),
      a.addEventListener("touchmove", this.onTouchMove, !1),
      a.addEventListener("touchend", this.onTouchEnd, !1),
      a.addEventListener("touchcancel", this.onTouchCancel, !1),
      Event.prototype.stopImmediatePropagation ||
        ((a.removeEventListener = function (b, c, d) {
          var e = Node.prototype.removeEventListener;
          "click" === b ? e.call(a, b, c.hijacked || c, d) : e.call(a, b, c, d);
        }),
        (a.addEventListener = function (b, c, d) {
          var e = Node.prototype.addEventListener;
          "click" === b
            ? e.call(
                a,
                b,
                c.hijacked ||
                  (c.hijacked = function (a) {
                    a.propagationStopped || c(a);
                  }),
                d
              )
            : e.call(a, b, c, d);
        })),
      "function" == typeof a.onclick &&
        ((d = a.onclick),
        a.addEventListener(
          "click",
          function (a) {
            d(a);
          },
          !1
        ),
        (a.onclick = null));
  }
}
var App = (function () {
    "use strict";
    function a(a) {
      var b = $("<div>", { class: a }).appendTo("body"),
        c = b.css("background-color");
      return b.remove(), c;
    }
    function b() {
      function a() {
        l.hasClass("be-fixed-sidebar") && r.perfectScrollbar("update");
      }
      function b() {
        var a = $(".be-toggle-left-sidebar");
        a.on("click", function () {
          l.hasClass(i.collapsibleSidebarCollapsedClass)
            ? (l.removeClass(i.collapsibleSidebarCollapsedClass),
              $("li.open", m).removeClass("open"),
              $("li.active", m).parents(".parent").addClass("active open"),
              $(".be-scroller", m).perfectScrollbar("destroy"))
            : (l.addClass(i.collapsibleSidebarCollapsedClass),
              $("li.active", m).parents(".parent").removeClass("open"),
              $("li.open", m).removeClass("open"));
        });
      }
      function c(a) {
        var b;
        (b = "undefined" != typeof a ? a : $(".sidebar-elements > li", m)),
          $.each(b, function () {
            var a = $(this).find("> a span").html(),
              b = $(this).find("> ul"),
              c = $("> li", b);
            a = $('<li class="title">' + a + "</li>");
            var d = $(
              '<li class="nav-items"><div class="be-scroller"><div class="content"><ul></ul></div></div></li>'
            );
            b.find("> li.title").length ||
              (b.prepend(a), c.appendTo(d.find(".content ul")), d.appendTo(b));
          });
      }
      function e() {
        return l.hasClass(i.collapsibleSidebarCollapsedClass);
      }
      function f() {
        return l.hasClass(i.collapsibleSidebarClass);
      }
      function g(b, c) {
        var d = $(c.currentTarget),
          f = $(b).parent(),
          g = $("li.open", f),
          h = !d.closest(m).length,
          j = i.leftSidebarSlideSpeed,
          k = d.parents().eq(1).hasClass("sidebar-elements");
        !$.isXs() && e() && (k || h)
          ? (f.removeClass("open"),
            b.removeClass("visible"),
            g.removeClass("open").removeAttr("style"))
          : b.slideUp({
              duration: j,
              complete: function () {
                f.removeClass("open"),
                  $(this).removeAttr("style"),
                  g.removeClass("open").removeAttr("style"),
                  a();
              },
            });
      }
      function h(b, c) {
        var d = $(b),
          f = $(d).parent(),
          h = $(d).next(),
          j = i.leftSidebarSlideSpeed,
          k = $(c.currentTarget).parents().eq(1).hasClass("sidebar-elements"),
          l = f.siblings(".open");
        if ((l && g($("> ul", l), c), !$.isXs() && e() && k)) {
          var m = f.find(".be-scroller");
          f.addClass("open"),
            h.addClass("visible"),
            m.perfectScrollbar("destroy"),
            m.perfectScrollbar();
        } else
          h.slideDown({
            duration: j,
            complete: function () {
              f.addClass("open"), $(this).removeAttr("style"), a();
            },
          });
      }
      function j() {
        i.toggleLeftSidebarButton.on("click", function (a) {
          o && k.hasClass(i.openLeftSidebarClass)
            ? (k.removeClass(i.openLeftSidebarClass), d())
            : (k.addClass(i.openLeftSidebarClass + " " + i.transitionClass),
              (o = !0)),
            a.preventDefault();
        }),
          $(document).on("mousedown touchstart", function (a) {
            $(a.target).closest(m).length ||
              $(a.target).closest(i.toggleLeftSidebarButton).length ||
              !k.hasClass(i.openLeftSidebarClass) ||
              (k.removeClass(i.openLeftSidebarClass), d());
          });
      }
      var n = $(".sidebar-elements > li > a", m),
        q = $(".sidebar-elements li a", m),
        r = $(".left-sidebar-scroll", m),
        s = $(".left-sidebar-toggle", m),
        t = !!i.openLeftSidebarOnClick;
      f() &&
        (c(),
        b(),
        t ||
          (n.on("mouseover", function (a) {
            e() && h(this, a);
          }),
          n.on("touchstart", function (a) {
            var b = $(this),
              c = b.parent(),
              d = b.next();
            e() &&
              !$.isXs() &&
              (c.hasClass("open") ? g(d, a) : h(this, a),
              $(this).next().is("ul") && a.preventDefault());
          }),
          n.on("mouseleave", function (a) {
            var b = $(this),
              c = b.parent(),
              d = c.find("> ul");
            !$.isXs() &&
              e() &&
              (d.length > 0
                ? setTimeout(function () {
                    d.is(":hover")
                      ? d.on("mouseleave", function () {
                          setTimeout(function () {
                            b.is(":hover") || (g(d, a), d.off("mouseleave"));
                          }, 300);
                        })
                      : g(d, a);
                  }, 300)
                : c.removeClass("open"));
          })),
        $(document).on("mousedown touchstart", function (a) {
          $(a.target).closest(m).length || $.isXs() || g($("ul.visible", m), a);
        })),
        q.on("click", function (a) {
          var b,
            c = $(this),
            d = c.parent(),
            e = c.next();
          c.parents().eq(1).hasClass("sidebar-elements");
          (b = d.siblings(".open")),
            d.hasClass("open") ? g(e, a) : h(this, a),
            c.next().is("ul") && a.preventDefault();
        }),
        l.hasClass(i.collapsibleSidebarCollapsedClass)
          ? $("li.active", m).parents(".parent").addClass("active")
          : $("li.active", m).parents(".parent").addClass("active open"),
        l.hasClass("be-fixed-sidebar") &&
          (($.isXs() && !l.hasClass(i.offCanvasLeftSidebarClass)) ||
            r.perfectScrollbar(),
          $(window).resize(function () {
            p(
              function () {
                $.isXs() && !l.hasClass(i.offCanvasLeftSidebarClass)
                  ? r.perfectScrollbar("destroy")
                  : r.hasClass("ps-container")
                  ? r.perfectScrollbar("update")
                  : r.perfectScrollbar();
              },
              500,
              "be_update_scroller"
            );
          })),
        s.on("click", function (a) {
          var b = $(this).next(".left-sidebar-spacer"),
            c = $(this);
          c.toggleClass("open"),
            b.slideToggle(i.leftSidebarToggleSpeed, function () {
              $(this).removeAttr("style").toggleClass("open");
            });
        }),
        l.hasClass(i.offCanvasLeftSidebarClass) && j();
    }
    function c() {
      function a() {
        k.addClass(i.openRightSidebarClass + " " + i.transitionClass), (o = !0);
      }
      function b() {
        k.removeClass(i.openRightSidebarClass).addClass(i.transitionClass), d();
      }
      var c = $(".be-scroller", n);
      n.length > 0 &&
        ($(".be-toggle-right-sidebar").on("click", function (c) {
          o && k.hasClass(i.openRightSidebarClass) ? b() : o || a(),
            c.preventDefault();
        }),
        $(document).on("mousedown touchstart", function (a) {
          !$(a.target).closest(n).length &&
            k.hasClass(i.openRightSidebarClass) &&
            (i.closeRsOnClickOutside || $.isXs()) &&
            b();
        })),
        c.perfectScrollbar(),
        $(window).resize(function () {
          p(
            function () {
              c.perfectScrollbar("update");
            },
            500,
            "be_rs_update_scroller"
          );
        }),
        $('a[data-toggle="tab"]', n).on("shown.bs.tab", function (a) {
          var b = $(a.target.getAttribute("href")).find(".be-scroller");
          b.length && b.perfectScrollbar("update");
        });
    }
    function d() {
      (o = !0),
        setTimeout(function () {
          o = !1;
        }, i.openSidebarDelay);
    }
    function e() {
      l.swipe({
        allowPageScroll: "vertical",
        preventDefaultEvents: !1,
        fallbackToMouseEvents: !1,
        swipeLeft: function (a) {
          !o &&
            n.length > 0 &&
            (k.addClass(i.openRightSidebarClass + " " + i.transitionClass),
            (o = !0));
        },
        threshold: i.swipeTreshold,
      });
    }
    function f() {
      function a() {
        d.hasClass("chat-opened") || d.addClass("chat-opened");
      }
      function b() {
        d.hasClass("chat-opened") && d.removeClass("chat-opened");
      }
      function c(a, b) {
        var c = $('<li class="' + (b ? "self" : "friend") + '"></li>');
        "" != a &&
          ($('<div class="msg">' + a + "</div>").appendTo(c),
          c.appendTo(i),
          j.stop().animate({ scrollTop: j.prop("scrollHeight") }, 900, "swing"),
          j.perfectScrollbar("update"));
      }
      var d = $(".be-right-sidebar .tab-chat"),
        e = $(".chat-contacts", d),
        f = $(".chat-window", d),
        h = $(".chat-messages", f),
        i = $(".content ul", h),
        j = $(".be-scroller", h),
        k = $(".chat-input", f),
        l = $("input", k),
        m = $(".send-msg", k);
      $(".user a", e).on("click", function (b) {
        a(), b.preventDefault();
      }),
        $(".title .return", f).on("click", function (a) {
          b(), g();
        }),
        l.keypress(function (a) {
          var b = a.keyCode ? a.keyCode : a.which,
            d = $(this).val();
          "13" == b && (c(d, !0), $(this).val("")), a.stopPropagation();
        }),
        m.on("click", function () {
          var a = l.val();
          c(a, !0), l.val("");
        });
    }
    function g() {
      $(".be-scroller").perfectScrollbar();
    }
    function h() {
      var a = 220,
        b = 500,
        c = $('<div class="be-scroll-top"></div>');
      c.appendTo("body"),
        $(window).on("scroll", function () {
          $(this).scrollTop() > a ? c.fadeIn(b) : c.fadeOut(b);
        }),
        c.on("touchstart mouseup", function (a) {
          $("html, body").animate({ scrollTop: 0 }, b), a.preventDefault();
        });
    }
    var i = {
        assetsPath: "assets",
        imgPath: "img",
        jsPath: "js",
        libsPath: "lib",
        leftSidebarSlideSpeed: 200,
        leftSidebarToggleSpeed: 300,
        enableSwipe: !0,
        swipeTreshold: 100,
        scrollTop: !0,
        openRightSidebarClass: "open-right-sidebar",
        openLeftSidebarClass: "open-left-sidebar",
        offCanvasLeftSidebarClass: "be-offcanvas-menu",
        toggleLeftSidebarButton: $(".be-toggle-left-sidebar"),
        closeRsOnClickOutside: !0,
        removeLeftSidebarClass: "be-nosidebar-left",
        collapsibleSidebarClass: "be-collapsible-sidebar",
        collapsibleSidebarCollapsedClass: "be-collapsible-sidebar-collapsed",
        openLeftSidebarOnClick: !0,
        transitionClass: "be-animate",
        openSidebarDelay: 400,
      },
      j = {},
      k = $("body"),
      l = $(".be-wrapper"),
      m = $(".be-left-sidebar"),
      n = $(".be-right-sidebar"),
      o = !1,
      p = (function () {
        var a = {};
        return function (b, c, d) {
          d || (d = "x1x2x3x4"),
            a[d] && clearTimeout(a[d]),
            (a[d] = setTimeout(b, c));
        };
      })();
    return {
      conf: i,
      color: j,
      init: function (d) {
        $.extend(i, d),
          FastClick.attach(document.body),
          b(),
          c(),
          f(),
          i.enableSwipe && e(),
          i.scrollTop && h(),
          (j.primary = a("clr-primary")),
          (j.success = a("clr-success")),
          (j.warning = a("clr-warning")),
          (j.danger = a("clr-danger")),
          (j.grey = a("clr-grey")),
          $(".be-connections").on("click", function (a) {
            a.stopPropagation();
          }),
          g(),
          $(".dropdown").on("shown.bs.dropdown", function () {
            $(".be-scroller").perfectScrollbar("update");
          }),
          $(".nav-tabs").on("shown.bs.tab", function (a) {
            $(".be-scroller").perfectScrollbar("update");
          }),
          $('[data-toggle="tooltip"]').tooltip(),
          $('[data-toggle="popover"]').popover(),
          $(".modal").on("show.bs.modal", function () {
            $("html").addClass("be-modal-open");
          }),
          $(".modal").on("hidden.bs.modal", function () {
            $("html").removeClass("be-modal-open");
          });
      },
    };
  })(),
  deviceIsAndroid = navigator.userAgent.indexOf("Android") > 0,
  deviceIsIOS = /iP(ad|hone|od)/.test(navigator.userAgent),
  deviceIsIOS4 = deviceIsIOS && /OS 4_\d(_\d)?/.test(navigator.userAgent),
  deviceIsIOSWithBadTarget =
    deviceIsIOS && /OS ([6-9]|\d{2})_\d/.test(navigator.userAgent),
  deviceIsBlackBerry10 = navigator.userAgent.indexOf("BB10") > 0;
(FastClick.prototype.needsClick = function (a) {
  "use strict";
  switch (a.nodeName.toLowerCase()) {
    case "button":
    case "select":
    case "textarea":
      if (a.disabled) return !0;
      break;
    case "input":
      if ((deviceIsIOS && "file" === a.type) || a.disabled) return !0;
      break;
    case "label":
    case "video":
      return !0;
  }
  return /\bneedsclick\b/.test(a.className);
}),
  (FastClick.prototype.needsFocus = function (a) {
    "use strict";
    switch (a.nodeName.toLowerCase()) {
      case "textarea":
        return !0;
      case "select":
        return !deviceIsAndroid;
      case "input":
        switch (a.type) {
          case "button":
          case "checkbox":
          case "file":
          case "image":
          case "radio":
          case "submit":
            return !1;
        }
        return !a.disabled && !a.readOnly;
      default:
        return /\bneedsfocus\b/.test(a.className);
    }
  }),
  (FastClick.prototype.sendClick = function (a, b) {
    "use strict";
    var c, d, e, f;
    document.activeElement &&
      document.activeElement !== a &&
      document.activeElement.blur(),
      (f = b.changedTouches[0]),
      (e = document.createEvent("MouseEvents")),
      e.initMouseEvent(
        "mousedown",
        !0,
        !0,
        window,
        1,
        f.screenX,
        f.screenY,
        f.clientX,
        f.clientY,
        !1,
        !1,
        !1,
        !1,
        0,
        null
      ),
      (e.forwardedTouchEvent = !0),
      a.dispatchEvent(e),
      (d = document.createEvent("MouseEvents")),
      d.initMouseEvent(
        "mouseup",
        !0,
        !0,
        window,
        1,
        f.screenX,
        f.screenY,
        f.clientX,
        f.clientY,
        !1,
        !1,
        !1,
        !1,
        0,
        null
      ),
      (d.forwardedTouchEvent = !0),
      a.dispatchEvent(d),
      (c = document.createEvent("MouseEvents")),
      c.initMouseEvent(
        this.determineEventType(a),
        !0,
        !0,
        window,
        1,
        f.screenX,
        f.screenY,
        f.clientX,
        f.clientY,
        !1,
        !1,
        !1,
        !1,
        0,
        null
      ),
      (c.forwardedTouchEvent = !0),
      a.dispatchEvent(c);
  }),
  (FastClick.prototype.determineEventType = function (a) {
    "use strict";
    return deviceIsAndroid && "select" === a.tagName.toLowerCase()
      ? "mousedown"
      : "click";
  }),
  (FastClick.prototype.focus = function (a) {
    "use strict";
    var b;
    deviceIsIOS &&
    a.setSelectionRange &&
    0 !== a.type.indexOf("date") &&
    "time" !== a.type
      ? ((b = a.value.length), a.setSelectionRange(b, b))
      : a.focus();
  }),
  (FastClick.prototype.updateScrollParent = function (a) {
    "use strict";
    var b, c;
    if (((b = a.fastClickScrollParent), !b || !b.contains(a))) {
      c = a;
      do {
        if (c.scrollHeight > c.offsetHeight) {
          (b = c), (a.fastClickScrollParent = c);
          break;
        }
        c = c.parentElement;
      } while (c);
    }
    b && (b.fastClickLastScrollTop = b.scrollTop);
  }),
  (FastClick.prototype.getTargetElementFromEventTarget = function (a) {
    "use strict";
    return a.nodeType === Node.TEXT_NODE ? a.parentNode : a;
  }),
  (FastClick.prototype.onTouchStart = function (a) {
    "use strict";
    var b, c, d;
    if (a.targetTouches.length > 1) return !0;
    if (
      ((b = this.getTargetElementFromEventTarget(a.target)),
      (c = a.targetTouches[0]),
      deviceIsIOS)
    ) {
      if (((d = window.getSelection()), d.rangeCount && !d.isCollapsed))
        return !0;
      if (!deviceIsIOS4) {
        if (c.identifier && c.identifier === this.lastTouchIdentifier)
          return a.preventDefault(), !1;
        (this.lastTouchIdentifier = c.identifier), this.updateScrollParent(b);
      }
    }
    return (
      (this.trackingClick = !0),
      (this.trackingClickStart = a.timeStamp),
      (this.targetElement = b),
      (this.touchStartX = c.pageX),
      (this.touchStartY = c.pageY),
      a.timeStamp - this.lastClickTime < this.tapDelay && a.preventDefault(),
      !0
    );
  }),
  (FastClick.prototype.touchHasMoved = function (a) {
    "use strict";
    var b = a.changedTouches[0],
      c = this.touchBoundary;
    return (
      Math.abs(b.pageX - this.touchStartX) > c ||
      Math.abs(b.pageY - this.touchStartY) > c
    );
  }),
  (FastClick.prototype.onTouchMove = function (a) {
    "use strict";
    return (
      !this.trackingClick ||
      ((this.targetElement !== this.getTargetElementFromEventTarget(a.target) ||
        this.touchHasMoved(a)) &&
        ((this.trackingClick = !1), (this.targetElement = null)),
      !0)
    );
  }),
  (FastClick.prototype.findControl = function (a) {
    "use strict";
    return void 0 !== a.control
      ? a.control
      : a.htmlFor
      ? document.getElementById(a.htmlFor)
      : a.querySelector(
          "button, input:not([type=hidden]), keygen, meter, output, progress, select, textarea"
        );
  }),
  (FastClick.prototype.onTouchEnd = function (a) {
    "use strict";
    var b,
      c,
      d,
      e,
      f,
      g = this.targetElement;
    if (!this.trackingClick) return !0;
    if (a.timeStamp - this.lastClickTime < this.tapDelay)
      return (this.cancelNextClick = !0), !0;
    if (
      ((this.cancelNextClick = !1),
      (this.lastClickTime = a.timeStamp),
      (c = this.trackingClickStart),
      (this.trackingClick = !1),
      (this.trackingClickStart = 0),
      deviceIsIOSWithBadTarget &&
        ((f = a.changedTouches[0]),
        (g =
          document.elementFromPoint(
            f.pageX - window.pageXOffset,
            f.pageY - window.pageYOffset
          ) || g),
        (g.fastClickScrollParent = this.targetElement.fastClickScrollParent)),
      (d = g.tagName.toLowerCase()),
      "label" === d)
    ) {
      if ((b = this.findControl(g))) {
        if ((this.focus(g), deviceIsAndroid)) return !1;
        g = b;
      }
    } else if (this.needsFocus(g))
      return a.timeStamp - c > 100 ||
        (deviceIsIOS && window.top !== window && "input" === d)
        ? ((this.targetElement = null), !1)
        : (this.focus(g),
          this.sendClick(g, a),
          (deviceIsIOS && "select" === d) ||
            ((this.targetElement = null), a.preventDefault()),
          !1);
    return (
      !(
        !deviceIsIOS ||
        deviceIsIOS4 ||
        ((e = g.fastClickScrollParent),
        !e || e.fastClickLastScrollTop === e.scrollTop)
      ) ||
      (this.needsClick(g) || (a.preventDefault(), this.sendClick(g, a)), !1)
    );
  }),
  (FastClick.prototype.onTouchCancel = function () {
    "use strict";
    (this.trackingClick = !1), (this.targetElement = null);
  }),
  (FastClick.prototype.onMouse = function (a) {
    "use strict";
    return !(
      this.targetElement &&
      !a.forwardedTouchEvent &&
      a.cancelable &&
      (!this.needsClick(this.targetElement) || this.cancelNextClick) &&
      (a.stopImmediatePropagation
        ? a.stopImmediatePropagation()
        : (a.propagationStopped = !0),
      a.stopPropagation(),
      a.preventDefault(),
      1)
    );
  }),
  (FastClick.prototype.onClick = function (a) {
    "use strict";
    var b;
    return this.trackingClick
      ? ((this.targetElement = null), (this.trackingClick = !1), !0)
      : ("submit" === a.target.type && 0 === a.detail) ||
          ((b = this.onMouse(a)), b || (this.targetElement = null), b);
  }),
  (FastClick.prototype.destroy = function () {
    "use strict";
    var a = this.layer;
    deviceIsAndroid &&
      (a.removeEventListener("mouseover", this.onMouse, !0),
      a.removeEventListener("mousedown", this.onMouse, !0),
      a.removeEventListener("mouseup", this.onMouse, !0)),
      a.removeEventListener("click", this.onClick, !0),
      a.removeEventListener("touchstart", this.onTouchStart, !1),
      a.removeEventListener("touchmove", this.onTouchMove, !1),
      a.removeEventListener("touchend", this.onTouchEnd, !1),
      a.removeEventListener("touchcancel", this.onTouchCancel, !1);
  }),
  (FastClick.notNeeded = function (a) {
    "use strict";
    var b, c, d;
    if ("undefined" == typeof window.ontouchstart) return !0;
    if ((c = +(/Chrome\/([0-9]+)/.exec(navigator.userAgent) || [, 0])[1])) {
      if (!deviceIsAndroid) return !0;
      if ((b = document.querySelector("meta[name=viewport]"))) {
        if (b.content.indexOf("user-scalable=no") !== -1) return !0;
        if (c > 31 && document.documentElement.scrollWidth <= window.outerWidth)
          return !0;
      }
    }
    if (
      deviceIsBlackBerry10 &&
      ((d = navigator.userAgent.match(/Version\/([0-9]*)\.([0-9]*)/)),
      d[1] >= 10 &&
        d[2] >= 3 &&
        (b = document.querySelector("meta[name=viewport]")))
    ) {
      if (b.content.indexOf("user-scalable=no") !== -1) return !0;
      if (document.documentElement.scrollWidth <= window.outerWidth) return !0;
    }
    return "none" === a.style.msTouchAction;
  }),
  (FastClick.attach = function (a, b) {
    "use strict";
    return new FastClick(a, b);
  }),
  "function" == typeof define && "object" == typeof define.amd && define.amd
    ? define(function () {
        "use strict";
        return FastClick;
      })
    : "undefined" != typeof module && module.exports
    ? ((module.exports = FastClick.attach),
      (module.exports.FastClick = FastClick))
    : (window.FastClick = FastClick),
  !(function () {
    function a(c, d) {
      if (((c = c ? c : ""), (d = d || {}), c instanceof a)) return c;
      if (!(this instanceof a)) return new a(c, d);
      var e = b(c);
      (this._originalInput = c),
        (this._r = e.r),
        (this._g = e.g),
        (this._b = e.b),
        (this._a = e.a),
        (this._roundA = N(100 * this._a) / 100),
        (this._format = d.format || e.format),
        (this._gradientType = d.gradientType),
        this._r < 1 && (this._r = N(this._r)),
        this._g < 1 && (this._g = N(this._g)),
        this._b < 1 && (this._b = N(this._b)),
        (this._ok = e.ok),
        (this._tc_id = L++);
    }
    function b(a) {
      var b = { r: 0, g: 0, b: 0 },
        d = 1,
        f = !1,
        h = !1;
      return (
        "string" == typeof a && (a = H(a)),
        "object" == typeof a &&
          (a.hasOwnProperty("r") &&
          a.hasOwnProperty("g") &&
          a.hasOwnProperty("b")
            ? ((b = c(a.r, a.g, a.b)),
              (f = !0),
              (h = "%" === String(a.r).substr(-1) ? "prgb" : "rgb"))
            : a.hasOwnProperty("h") &&
              a.hasOwnProperty("s") &&
              a.hasOwnProperty("v")
            ? ((a.s = E(a.s)),
              (a.v = E(a.v)),
              (b = g(a.h, a.s, a.v)),
              (f = !0),
              (h = "hsv"))
            : a.hasOwnProperty("h") &&
              a.hasOwnProperty("s") &&
              a.hasOwnProperty("l") &&
              ((a.s = E(a.s)),
              (a.l = E(a.l)),
              (b = e(a.h, a.s, a.l)),
              (f = !0),
              (h = "hsl")),
          a.hasOwnProperty("a") && (d = a.a)),
        (d = x(d)),
        {
          ok: f,
          format: a.format || h,
          r: O(255, P(b.r, 0)),
          g: O(255, P(b.g, 0)),
          b: O(255, P(b.b, 0)),
          a: d,
        }
      );
    }
    function c(a, b, c) {
      return { r: 255 * y(a, 255), g: 255 * y(b, 255), b: 255 * y(c, 255) };
    }
    function d(a, b, c) {
      (a = y(a, 255)), (b = y(b, 255)), (c = y(c, 255));
      var d,
        e,
        f = P(a, b, c),
        g = O(a, b, c),
        h = (f + g) / 2;
      if (f == g) d = e = 0;
      else {
        var i = f - g;
        switch (((e = h > 0.5 ? i / (2 - f - g) : i / (f + g)), f)) {
          case a:
            d = (b - c) / i + (c > b ? 6 : 0);
            break;
          case b:
            d = (c - a) / i + 2;
            break;
          case c:
            d = (a - b) / i + 4;
        }
        d /= 6;
      }
      return { h: d, s: e, l: h };
    }
    function e(a, b, c) {
      function d(a, b, c) {
        return (
          0 > c && (c += 1),
          c > 1 && (c -= 1),
          1 / 6 > c
            ? a + 6 * (b - a) * c
            : 0.5 > c
            ? b
            : 2 / 3 > c
            ? a + 6 * (b - a) * (2 / 3 - c)
            : a
        );
      }
      var e, f, g;
      if (((a = y(a, 360)), (b = y(b, 100)), (c = y(c, 100)), 0 === b))
        e = f = g = c;
      else {
        var h = 0.5 > c ? c * (1 + b) : c + b - c * b,
          i = 2 * c - h;
        (e = d(i, h, a + 1 / 3)), (f = d(i, h, a)), (g = d(i, h, a - 1 / 3));
      }
      return { r: 255 * e, g: 255 * f, b: 255 * g };
    }
    function f(a, b, c) {
      (a = y(a, 255)), (b = y(b, 255)), (c = y(c, 255));
      var d,
        e,
        f = P(a, b, c),
        g = O(a, b, c),
        h = f,
        i = f - g;
      if (((e = 0 === f ? 0 : i / f), f == g)) d = 0;
      else {
        switch (f) {
          case a:
            d = (b - c) / i + (c > b ? 6 : 0);
            break;
          case b:
            d = (c - a) / i + 2;
            break;
          case c:
            d = (a - b) / i + 4;
        }
        d /= 6;
      }
      return { h: d, s: e, v: h };
    }
    function g(a, b, c) {
      (a = 6 * y(a, 360)), (b = y(b, 100)), (c = y(c, 100));
      var d = M.floor(a),
        e = a - d,
        f = c * (1 - b),
        g = c * (1 - e * b),
        h = c * (1 - (1 - e) * b),
        i = d % 6,
        j = [c, g, f, f, h, c][i],
        k = [h, c, c, g, f, f][i],
        l = [f, f, h, c, c, g][i];
      return { r: 255 * j, g: 255 * k, b: 255 * l };
    }
    function h(a, b, c, d) {
      var e = [
        D(N(a).toString(16)),
        D(N(b).toString(16)),
        D(N(c).toString(16)),
      ];
      return d &&
        e[0].charAt(0) == e[0].charAt(1) &&
        e[1].charAt(0) == e[1].charAt(1) &&
        e[2].charAt(0) == e[2].charAt(1)
        ? e[0].charAt(0) + e[1].charAt(0) + e[2].charAt(0)
        : e.join("");
    }
    function i(a, b, c, d) {
      var e = [
        D(F(d)),
        D(N(a).toString(16)),
        D(N(b).toString(16)),
        D(N(c).toString(16)),
      ];
      return e.join("");
    }
    function j(b, c) {
      c = 0 === c ? 0 : c || 10;
      var d = a(b).toHsl();
      return (d.s -= c / 100), (d.s = z(d.s)), a(d);
    }
    function k(b, c) {
      c = 0 === c ? 0 : c || 10;
      var d = a(b).toHsl();
      return (d.s += c / 100), (d.s = z(d.s)), a(d);
    }
    function l(b) {
      return a(b).desaturate(100);
    }
    function m(b, c) {
      c = 0 === c ? 0 : c || 10;
      var d = a(b).toHsl();
      return (d.l += c / 100), (d.l = z(d.l)), a(d);
    }
    function n(b, c) {
      c = 0 === c ? 0 : c || 10;
      var d = a(b).toRgb();
      return (
        (d.r = P(0, O(255, d.r - N(255 * -(c / 100))))),
        (d.g = P(0, O(255, d.g - N(255 * -(c / 100))))),
        (d.b = P(0, O(255, d.b - N(255 * -(c / 100))))),
        a(d)
      );
    }
    function o(b, c) {
      c = 0 === c ? 0 : c || 10;
      var d = a(b).toHsl();
      return (d.l -= c / 100), (d.l = z(d.l)), a(d);
    }
    function p(b, c) {
      var d = a(b).toHsl(),
        e = (N(d.h) + c) % 360;
      return (d.h = 0 > e ? 360 + e : e), a(d);
    }
    function q(b) {
      var c = a(b).toHsl();
      return (c.h = (c.h + 180) % 360), a(c);
    }
    function r(b) {
      var c = a(b).toHsl(),
        d = c.h;
      return [
        a(b),
        a({ h: (d + 120) % 360, s: c.s, l: c.l }),
        a({ h: (d + 240) % 360, s: c.s, l: c.l }),
      ];
    }
    function s(b) {
      var c = a(b).toHsl(),
        d = c.h;
      return [
        a(b),
        a({ h: (d + 90) % 360, s: c.s, l: c.l }),
        a({ h: (d + 180) % 360, s: c.s, l: c.l }),
        a({ h: (d + 270) % 360, s: c.s, l: c.l }),
      ];
    }
    function t(b) {
      var c = a(b).toHsl(),
        d = c.h;
      return [
        a(b),
        a({ h: (d + 72) % 360, s: c.s, l: c.l }),
        a({ h: (d + 216) % 360, s: c.s, l: c.l }),
      ];
    }
    function u(b, c, d) {
      (c = c || 6), (d = d || 30);
      var e = a(b).toHsl(),
        f = 360 / d,
        g = [a(b)];
      for (e.h = (e.h - ((f * c) >> 1) + 720) % 360; --c; )
        (e.h = (e.h + f) % 360), g.push(a(e));
      return g;
    }
    function v(b, c) {
      c = c || 6;
      for (
        var d = a(b).toHsv(), e = d.h, f = d.s, g = d.v, h = [], i = 1 / c;
        c--;

      )
        h.push(a({ h: e, s: f, v: g })), (g = (g + i) % 1);
      return h;
    }
    function w(a) {
      var b = {};
      for (var c in a) a.hasOwnProperty(c) && (b[a[c]] = c);
      return b;
    }
    function x(a) {
      return (a = parseFloat(a)), (isNaN(a) || 0 > a || a > 1) && (a = 1), a;
    }
    function y(a, b) {
      B(a) && (a = "100%");
      var c = C(a);
      return (
        (a = O(b, P(0, parseFloat(a)))),
        c && (a = parseInt(a * b, 10) / 100),
        M.abs(a - b) < 1e-6 ? 1 : (a % b) / parseFloat(b)
      );
    }
    function z(a) {
      return O(1, P(0, a));
    }
    function A(a) {
      return parseInt(a, 16);
    }
    function B(a) {
      return (
        "string" == typeof a && -1 != a.indexOf(".") && 1 === parseFloat(a)
      );
    }
    function C(a) {
      return "string" == typeof a && -1 != a.indexOf("%");
    }
    function D(a) {
      return 1 == a.length ? "0" + a : "" + a;
    }
    function E(a) {
      return 1 >= a && (a = 100 * a + "%"), a;
    }
    function F(a) {
      return Math.round(255 * parseFloat(a)).toString(16);
    }
    function G(a) {
      return A(a) / 255;
    }
    function H(a) {
      a = a.replace(J, "").replace(K, "").toLowerCase();
      var b = !1;
      if (R[a]) (a = R[a]), (b = !0);
      else if ("transparent" == a)
        return { r: 0, g: 0, b: 0, a: 0, format: "name" };
      var c;
      return (c = T.rgb.exec(a))
        ? { r: c[1], g: c[2], b: c[3] }
        : (c = T.rgba.exec(a))
        ? { r: c[1], g: c[2], b: c[3], a: c[4] }
        : (c = T.hsl.exec(a))
        ? { h: c[1], s: c[2], l: c[3] }
        : (c = T.hsla.exec(a))
        ? { h: c[1], s: c[2], l: c[3], a: c[4] }
        : (c = T.hsv.exec(a))
        ? { h: c[1], s: c[2], v: c[3] }
        : (c = T.hsva.exec(a))
        ? { h: c[1], s: c[2], v: c[3], a: c[4] }
        : (c = T.hex8.exec(a))
        ? {
            a: G(c[1]),
            r: A(c[2]),
            g: A(c[3]),
            b: A(c[4]),
            format: b ? "name" : "hex8",
          }
        : (c = T.hex6.exec(a))
        ? { r: A(c[1]), g: A(c[2]), b: A(c[3]), format: b ? "name" : "hex" }
        : !!(c = T.hex3.exec(a)) && {
            r: A(c[1] + "" + c[1]),
            g: A(c[2] + "" + c[2]),
            b: A(c[3] + "" + c[3]),
            format: b ? "name" : "hex",
          };
    }
    function I(a) {
      var b, c;
      return (
        (a = a || { level: "AA", size: "small" }),
        (b = (a.level || "AA").toUpperCase()),
        (c = (a.size || "small").toLowerCase()),
        "AA" !== b && "AAA" !== b && (b = "AA"),
        "small" !== c && "large" !== c && (c = "small"),
        { level: b, size: c }
      );
    }
    var J = /^[\s,#]+/,
      K = /\s+$/,
      L = 0,
      M = Math,
      N = M.round,
      O = M.min,
      P = M.max,
      Q = M.random;
    (a.prototype = {
      isDark: function () {
        return this.getBrightness() < 128;
      },
      isLight: function () {
        return !this.isDark();
      },
      isValid: function () {
        return this._ok;
      },
      getOriginalInput: function () {
        return this._originalInput;
      },
      getFormat: function () {
        return this._format;
      },
      getAlpha: function () {
        return this._a;
      },
      getBrightness: function () {
        var a = this.toRgb();
        return (299 * a.r + 587 * a.g + 114 * a.b) / 1e3;
      },
      getLuminance: function () {
        var a,
          b,
          c,
          d,
          e,
          f,
          g = this.toRgb();
        return (
          (a = g.r / 255),
          (b = g.g / 255),
          (c = g.b / 255),
          (d = 0.03928 >= a ? a / 12.92 : Math.pow((a + 0.055) / 1.055, 2.4)),
          (e = 0.03928 >= b ? b / 12.92 : Math.pow((b + 0.055) / 1.055, 2.4)),
          (f = 0.03928 >= c ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)),
          0.2126 * d + 0.7152 * e + 0.0722 * f
        );
      },
      setAlpha: function (a) {
        return (this._a = x(a)), (this._roundA = N(100 * this._a) / 100), this;
      },
      toHsv: function () {
        var a = f(this._r, this._g, this._b);
        return { h: 360 * a.h, s: a.s, v: a.v, a: this._a };
      },
      toHsvString: function () {
        var a = f(this._r, this._g, this._b),
          b = N(360 * a.h),
          c = N(100 * a.s),
          d = N(100 * a.v);
        return 1 == this._a
          ? "hsv(" + b + ", " + c + "%, " + d + "%)"
          : "hsva(" + b + ", " + c + "%, " + d + "%, " + this._roundA + ")";
      },
      toHsl: function () {
        var a = d(this._r, this._g, this._b);
        return { h: 360 * a.h, s: a.s, l: a.l, a: this._a };
      },
      toHslString: function () {
        var a = d(this._r, this._g, this._b),
          b = N(360 * a.h),
          c = N(100 * a.s),
          e = N(100 * a.l);
        return 1 == this._a
          ? "hsl(" + b + ", " + c + "%, " + e + "%)"
          : "hsla(" + b + ", " + c + "%, " + e + "%, " + this._roundA + ")";
      },
      toHex: function (a) {
        return h(this._r, this._g, this._b, a);
      },
      toHexString: function (a) {
        return "#" + this.toHex(a);
      },
      toHex8: function () {
        return i(this._r, this._g, this._b, this._a);
      },
      toHex8String: function () {
        return "#" + this.toHex8();
      },
      toRgb: function () {
        return { r: N(this._r), g: N(this._g), b: N(this._b), a: this._a };
      },
      toRgbString: function () {
        return 1 == this._a
          ? "rgb(" + N(this._r) + ", " + N(this._g) + ", " + N(this._b) + ")"
          : "rgba(" +
              N(this._r) +
              ", " +
              N(this._g) +
              ", " +
              N(this._b) +
              ", " +
              this._roundA +
              ")";
      },
      toPercentageRgb: function () {
        return {
          r: N(100 * y(this._r, 255)) + "%",
          g: N(100 * y(this._g, 255)) + "%",
          b: N(100 * y(this._b, 255)) + "%",
          a: this._a,
        };
      },
      toPercentageRgbString: function () {
        return 1 == this._a
          ? "rgb(" +
              N(100 * y(this._r, 255)) +
              "%, " +
              N(100 * y(this._g, 255)) +
              "%, " +
              N(100 * y(this._b, 255)) +
              "%)"
          : "rgba(" +
              N(100 * y(this._r, 255)) +
              "%, " +
              N(100 * y(this._g, 255)) +
              "%, " +
              N(100 * y(this._b, 255)) +
              "%, " +
              this._roundA +
              ")";
      },
      toName: function () {
        return 0 === this._a
          ? "transparent"
          : !(this._a < 1) && (S[h(this._r, this._g, this._b, !0)] || !1);
      },
      toFilter: function (b) {
        var c = "#" + i(this._r, this._g, this._b, this._a),
          d = c,
          e = this._gradientType ? "GradientType = 1, " : "";
        if (b) {
          var f = a(b);
          d = f.toHex8String();
        }
        return (
          "progid:DXImageTransform.Microsoft.gradient(" +
          e +
          "startColorstr=" +
          c +
          ",endColorstr=" +
          d +
          ")"
        );
      },
      toString: function (a) {
        var b = !!a;
        a = a || this._format;
        var c = !1,
          d = this._a < 1 && this._a >= 0,
          e =
            !b &&
            d &&
            ("hex" === a || "hex6" === a || "hex3" === a || "name" === a);
        return e
          ? "name" === a && 0 === this._a
            ? this.toName()
            : this.toRgbString()
          : ("rgb" === a && (c = this.toRgbString()),
            "prgb" === a && (c = this.toPercentageRgbString()),
            ("hex" === a || "hex6" === a) && (c = this.toHexString()),
            "hex3" === a && (c = this.toHexString(!0)),
            "hex8" === a && (c = this.toHex8String()),
            "name" === a && (c = this.toName()),
            "hsl" === a && (c = this.toHslString()),
            "hsv" === a && (c = this.toHsvString()),
            c || this.toHexString());
      },
      _applyModification: function (a, b) {
        var c = a.apply(null, [this].concat([].slice.call(b)));
        return (
          (this._r = c._r),
          (this._g = c._g),
          (this._b = c._b),
          this.setAlpha(c._a),
          this
        );
      },
      lighten: function () {
        return this._applyModification(m, arguments);
      },
      brighten: function () {
        return this._applyModification(n, arguments);
      },
      darken: function () {
        return this._applyModification(o, arguments);
      },
      desaturate: function () {
        return this._applyModification(j, arguments);
      },
      saturate: function () {
        return this._applyModification(k, arguments);
      },
      greyscale: function () {
        return this._applyModification(l, arguments);
      },
      spin: function () {
        return this._applyModification(p, arguments);
      },
      _applyCombination: function (a, b) {
        return a.apply(null, [this].concat([].slice.call(b)));
      },
      analogous: function () {
        return this._applyCombination(u, arguments);
      },
      complement: function () {
        return this._applyCombination(q, arguments);
      },
      monochromatic: function () {
        return this._applyCombination(v, arguments);
      },
      splitcomplement: function () {
        return this._applyCombination(t, arguments);
      },
      triad: function () {
        return this._applyCombination(r, arguments);
      },
      tetrad: function () {
        return this._applyCombination(s, arguments);
      },
    }),
      (a.fromRatio = function (b, c) {
        if ("object" == typeof b) {
          var d = {};
          for (var e in b)
            b.hasOwnProperty(e) && (d[e] = "a" === e ? b[e] : E(b[e]));
          b = d;
        }
        return a(b, c);
      }),
      (a.equals = function (b, c) {
        return !(!b || !c) && a(b).toRgbString() == a(c).toRgbString();
      }),
      (a.random = function () {
        return a.fromRatio({ r: Q(), g: Q(), b: Q() });
      }),
      (a.mix = function (b, c, d) {
        d = 0 === d ? 0 : d || 50;
        var e,
          f = a(b).toRgb(),
          g = a(c).toRgb(),
          h = d / 100,
          i = 2 * h - 1,
          j = g.a - f.a;
        (e = -1 == i * j ? i : (i + j) / (1 + i * j)), (e = (e + 1) / 2);
        var k = 1 - e,
          l = {
            r: g.r * e + f.r * k,
            g: g.g * e + f.g * k,
            b: g.b * e + f.b * k,
            a: g.a * h + f.a * (1 - h),
          };
        return a(l);
      }),
      (a.readability = function (b, c) {
        var d = a(b),
          e = a(c);
        return (
          (Math.max(d.getLuminance(), e.getLuminance()) + 0.05) /
          (Math.min(d.getLuminance(), e.getLuminance()) + 0.05)
        );
      }),
      (a.isReadable = function (b, c, d) {
        var e,
          f,
          g = a.readability(b, c);
        switch (((f = !1), (e = I(d)), e.level + e.size)) {
          case "AAsmall":
          case "AAAlarge":
            f = g >= 4.5;
            break;
          case "AAlarge":
            f = g >= 3;
            break;
          case "AAAsmall":
            f = g >= 7;
        }
        return f;
      }),
      (a.mostReadable = function (b, c, d) {
        var e,
          f,
          g,
          h,
          i = null,
          j = 0;
        (d = d || {}),
          (f = d.includeFallbackColors),
          (g = d.level),
          (h = d.size);
        for (var k = 0; k < c.length; k++)
          (e = a.readability(b, c[k])), e > j && ((j = e), (i = a(c[k])));
        return a.isReadable(b, i, { level: g, size: h }) || !f
          ? i
          : ((d.includeFallbackColors = !1),
            a.mostReadable(b, ["#fff", "#000"], d));
      });
    var R = (a.names = {
        aliceblue: "f0f8ff",
        antiquewhite: "faebd7",
        aqua: "0ff",
        aquamarine: "7fffd4",
        azure: "f0ffff",
        beige: "f5f5dc",
        bisque: "ffe4c4",
        black: "000",
        blanchedalmond: "ffebcd",
        blue: "00f",
        blueviolet: "8a2be2",
        brown: "a52a2a",
        burlywood: "deb887",
        burntsienna: "ea7e5d",
        cadetblue: "5f9ea0",
        chartreuse: "7fff00",
        chocolate: "d2691e",
        coral: "ff7f50",
        cornflowerblue: "6495ed",
        cornsilk: "fff8dc",
        crimson: "dc143c",
        cyan: "0ff",
        darkblue: "00008b",
        darkcyan: "008b8b",
        darkgoldenrod: "b8860b",
        darkgray: "a9a9a9",
        darkgreen: "006400",
        darkgrey: "a9a9a9",
        darkkhaki: "bdb76b",
        darkmagenta: "8b008b",
        darkolivegreen: "556b2f",
        darkorange: "ff8c00",
        darkorchid: "9932cc",
        darkred: "8b0000",
        darksalmon: "e9967a",
        darkseagreen: "8fbc8f",
        darkslateblue: "483d8b",
        darkslategray: "2f4f4f",
        darkslategrey: "2f4f4f",
        darkturquoise: "00ced1",
        darkviolet: "9400d3",
        deeppink: "ff1493",
        deepskyblue: "00bfff",
        dimgray: "696969",
        dimgrey: "696969",
        dodgerblue: "1e90ff",
        firebrick: "b22222",
        floralwhite: "fffaf0",
        forestgreen: "228b22",
        fuchsia: "f0f",
        gainsboro: "dcdcdc",
        ghostwhite: "f8f8ff",
        gold: "ffd700",
        goldenrod: "daa520",
        gray: "808080",
        green: "008000",
        greenyellow: "adff2f",
        grey: "808080",
        honeydew: "f0fff0",
        hotpink: "ff69b4",
        indianred: "cd5c5c",
        indigo: "4b0082",
        ivory: "fffff0",
        khaki: "f0e68c",
        lavender: "e6e6fa",
        lavenderblush: "fff0f5",
        lawngreen: "7cfc00",
        lemonchiffon: "fffacd",
        lightblue: "add8e6",
        lightcoral: "f08080",
        lightcyan: "e0ffff",
        lightgoldenrodyellow: "fafad2",
        lightgray: "d3d3d3",
        lightgreen: "90ee90",
        lightgrey: "d3d3d3",
        lightpink: "ffb6c1",
        lightsalmon: "ffa07a",
        lightseagreen: "20b2aa",
        lightskyblue: "87cefa",
        lightslategray: "789",
        lightslategrey: "789",
        lightsteelblue: "b0c4de",
        lightyellow: "ffffe0",
        lime: "0f0",
        limegreen: "32cd32",
        linen: "faf0e6",
        magenta: "f0f",
        maroon: "800000",
        mediumaquamarine: "66cdaa",
        mediumblue: "0000cd",
        mediumorchid: "ba55d3",
        mediumpurple: "9370db",
        mediumseagreen: "3cb371",
        mediumslateblue: "7b68ee",
        mediumspringgreen: "00fa9a",
        mediumturquoise: "48d1cc",
        mediumvioletred: "c71585",
        midnightblue: "191970",
        mintcream: "f5fffa",
        mistyrose: "ffe4e1",
        moccasin: "ffe4b5",
        navajowhite: "ffdead",
        navy: "000080",
        oldlace: "fdf5e6",
        olive: "808000",
        olivedrab: "6b8e23",
        orange: "ffa500",
        orangered: "ff4500",
        orchid: "da70d6",
        palegoldenrod: "eee8aa",
        palegreen: "98fb98",
        paleturquoise: "afeeee",
        palevioletred: "db7093",
        papayawhip: "ffefd5",
        peachpuff: "ffdab9",
        peru: "cd853f",
        pink: "ffc0cb",
        plum: "dda0dd",
        powderblue: "b0e0e6",
        purple: "800080",
        rebeccapurple: "663399",
        red: "f00",
        rosybrown: "bc8f8f",
        royalblue: "4169e1",
        saddlebrown: "8b4513",
        salmon: "fa8072",
        sandybrown: "f4a460",
        seagreen: "2e8b57",
        seashell: "fff5ee",
        sienna: "a0522d",
        silver: "c0c0c0",
        skyblue: "87ceeb",
        slateblue: "6a5acd",
        slategray: "708090",
        slategrey: "708090",
        snow: "fffafa",
        springgreen: "00ff7f",
        steelblue: "4682b4",
        tan: "d2b48c",
        teal: "008080",
        thistle: "d8bfd8",
        tomato: "ff6347",
        turquoise: "40e0d0",
        violet: "ee82ee",
        wheat: "f5deb3",
        white: "fff",
        whitesmoke: "f5f5f5",
        yellow: "ff0",
        yellowgreen: "9acd32",
      }),
      S = (a.hexNames = w(R)),
      T = (function () {
        var a = "[-\\+]?\\d+%?",
          b = "[-\\+]?\\d*\\.\\d+%?",
          c = "(?:" + b + ")|(?:" + a + ")",
          d =
            "[\\s|\\(]+(" +
            c +
            ")[,|\\s]+(" +
            c +
            ")[,|\\s]+(" +
            c +
            ")\\s*\\)?",
          e =
            "[\\s|\\(]+(" +
            c +
            ")[,|\\s]+(" +
            c +
            ")[,|\\s]+(" +
            c +
            ")[,|\\s]+(" +
            c +
            ")\\s*\\)?";
        return {
          rgb: new RegExp("rgb" + d),
          rgba: new RegExp("rgba" + e),
          hsl: new RegExp("hsl" + d),
          hsla: new RegExp("hsla" + e),
          hsv: new RegExp("hsv" + d),
          hsva: new RegExp("hsva" + e),
          hex3: /^([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
          hex6: /^([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,
          hex8: /^([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,
        };
      })();
    "undefined" != typeof module && module.exports
      ? (module.exports = a)
      : "function" == typeof define && define.amd
      ? define(function () {
          return a;
        })
      : (window.tinycolor = a);
  })(),
  !(function (a) {
    "function" == typeof define && define.amd && define.amd.jQuery
      ? define(["jquery"], a)
      : a(
          "undefined" != typeof module && module.exports
            ? require("jquery")
            : jQuery
        );
  })(function (a) {
    "use strict";
    function b(b) {
      return (
        !b ||
          void 0 !== b.allowPageScroll ||
          (void 0 === b.swipe && void 0 === b.swipeStatus) ||
          (b.allowPageScroll = k),
        void 0 !== b.click && void 0 === b.tap && (b.tap = b.click),
        b || (b = {}),
        (b = a.extend({}, a.fn.swipe.defaults, b)),
        this.each(function () {
          var d = a(this),
            e = d.data(C);
          e || ((e = new c(this, b)), d.data(C, e));
        })
      );
    }
    function c(b, c) {
      function d(b) {
        if (!(ja() || a(b.target).closest(c.excludedElements, Ta).length > 0)) {
          var d = b.originalEvent ? b.originalEvent : b;
          if (
            !d.pointerType ||
            "mouse" != d.pointerType ||
            0 != c.fallbackToMouseEvents
          ) {
            var e,
              f = d.touches,
              g = f ? f[0] : d;
            return (
              (Ua = v),
              f
                ? (Va = f.length)
                : c.preventDefaultEvents !== !1 && b.preventDefault(),
              (Ja = 0),
              (Ka = null),
              (La = null),
              (Ra = null),
              (Ma = 0),
              (Na = 0),
              (Oa = 0),
              (Pa = 1),
              (Qa = 0),
              (Sa = qa()),
              ha(),
              la(0, g),
              !f || Va === c.fingers || c.fingers === t || R()
                ? ((Xa = za()),
                  2 == Va &&
                    (la(1, f[1]), (Na = Oa = ta(Wa[0].start, Wa[1].start))),
                  (c.swipeStatus || c.pinchStatus) && (e = J(d, Ua)))
                : (e = !1),
              e === !1
                ? ((Ua = y), J(d, Ua), e)
                : (c.hold &&
                    (bb = setTimeout(
                      a.proxy(function () {
                        Ta.trigger("hold", [d.target]),
                          c.hold && (e = c.hold.call(Ta, d, d.target));
                      }, this),
                      c.longTapThreshold
                    )),
                  ka(!0),
                  null)
            );
          }
        }
      }
      function D(a) {
        var b = a.originalEvent ? a.originalEvent : a;
        if (Ua !== x && Ua !== y && !ia()) {
          var d,
            e = b.touches,
            f = e ? e[0] : b,
            g = ma(f);
          if (
            ((Ya = za()),
            e && (Va = e.length),
            c.hold && clearTimeout(bb),
            (Ua = w),
            2 == Va &&
              (0 == Na
                ? (la(1, e[1]), (Na = Oa = ta(Wa[0].start, Wa[1].start)))
                : (ma(e[1]),
                  (Oa = ta(Wa[0].end, Wa[1].end)),
                  (Ra = va(Wa[0].end, Wa[1].end))),
              (Pa = ua(Na, Oa)),
              (Qa = Math.abs(Na - Oa))),
            Va === c.fingers || c.fingers === t || !e || R())
          ) {
            if (
              ((Ka = ya(g.start, g.end)),
              (La = ya(g.last, g.end)),
              P(a, La),
              (Ja = wa(g.start, g.end)),
              (Ma = sa()),
              oa(Ka, Ja),
              (d = J(b, Ua)),
              !c.triggerOnTouchEnd || c.triggerOnTouchLeave)
            ) {
              var h = !0;
              if (c.triggerOnTouchLeave) {
                var i = Aa(this);
                h = Ba(g.end, i);
              }
              !c.triggerOnTouchEnd && h
                ? (Ua = I(w))
                : c.triggerOnTouchLeave && !h && (Ua = I(x)),
                (Ua != y && Ua != x) || J(b, Ua);
            }
          } else (Ua = y), J(b, Ua);
          d === !1 && ((Ua = y), J(b, Ua));
        }
      }
      function E(a) {
        var b = a.originalEvent ? a.originalEvent : a,
          d = b.touches;
        if (d) {
          if (d.length && !ia()) return ga(b), !0;
          if (d.length && ia()) return !0;
        }
        return (
          ia() && (Va = $a),
          (Ya = za()),
          (Ma = sa()),
          M() || !L()
            ? ((Ua = y), J(b, Ua))
            : c.triggerOnTouchEnd || (c.triggerOnTouchEnd === !1 && Ua === w)
            ? (c.preventDefaultEvents !== !1 && a.preventDefault(),
              (Ua = x),
              J(b, Ua))
            : !c.triggerOnTouchEnd && Y()
            ? ((Ua = x), K(b, Ua, o))
            : Ua === w && ((Ua = y), J(b, Ua)),
          ka(!1),
          null
        );
      }
      function F() {
        (Va = 0),
          (Ya = 0),
          (Xa = 0),
          (Na = 0),
          (Oa = 0),
          (Pa = 1),
          ha(),
          ka(!1);
      }
      function G(a) {
        var b = a.originalEvent ? a.originalEvent : a;
        c.triggerOnTouchLeave && ((Ua = I(x)), J(b, Ua));
      }
      function H() {
        Ta.unbind(Ea, d),
          Ta.unbind(Ia, F),
          Ta.unbind(Fa, D),
          Ta.unbind(Ga, E),
          Ha && Ta.unbind(Ha, G),
          ka(!1);
      }
      function I(a) {
        var b = a,
          d = O(),
          e = L(),
          f = M();
        return (
          !d || f
            ? (b = y)
            : !e || a != w || (c.triggerOnTouchEnd && !c.triggerOnTouchLeave)
            ? !e && a == x && c.triggerOnTouchLeave && (b = y)
            : (b = x),
          b
        );
      }
      function J(a, b) {
        var c,
          d = a.touches;
        return (
          (V() || U()) && (c = K(a, b, m)),
          (S() || R()) && c !== !1 && (c = K(a, b, n)),
          ea() && c !== !1
            ? (c = K(a, b, p))
            : fa() && c !== !1
            ? (c = K(a, b, q))
            : da() && c !== !1 && (c = K(a, b, o)),
          b === y && F(a),
          b === x && (d ? d.length || F(a) : F(a)),
          c
        );
      }
      function K(b, d, k) {
        var l;
        if (k == m) {
          if (
            (Ta.trigger("swipeStatus", [
              d,
              Ka || null,
              Ja || 0,
              Ma || 0,
              Va,
              Wa,
              La,
            ]),
            c.swipeStatus &&
              ((l = c.swipeStatus.call(
                Ta,
                b,
                d,
                Ka || null,
                Ja || 0,
                Ma || 0,
                Va,
                Wa,
                La
              )),
              l === !1))
          )
            return !1;
          if (d == x && T()) {
            if (
              (clearTimeout(ab),
              clearTimeout(bb),
              Ta.trigger("swipe", [Ka, Ja, Ma, Va, Wa, La]),
              c.swipe &&
                ((l = c.swipe.call(Ta, b, Ka, Ja, Ma, Va, Wa, La)), l === !1))
            )
              return !1;
            switch (Ka) {
              case e:
                Ta.trigger("swipeLeft", [Ka, Ja, Ma, Va, Wa, La]),
                  c.swipeLeft &&
                    (l = c.swipeLeft.call(Ta, b, Ka, Ja, Ma, Va, Wa, La));
                break;
              case f:
                Ta.trigger("swipeRight", [Ka, Ja, Ma, Va, Wa, La]),
                  c.swipeRight &&
                    (l = c.swipeRight.call(Ta, b, Ka, Ja, Ma, Va, Wa, La));
                break;
              case g:
                Ta.trigger("swipeUp", [Ka, Ja, Ma, Va, Wa, La]),
                  c.swipeUp &&
                    (l = c.swipeUp.call(Ta, b, Ka, Ja, Ma, Va, Wa, La));
                break;
              case h:
                Ta.trigger("swipeDown", [Ka, Ja, Ma, Va, Wa, La]),
                  c.swipeDown &&
                    (l = c.swipeDown.call(Ta, b, Ka, Ja, Ma, Va, Wa, La));
            }
          }
        }
        if (k == n) {
          if (
            (Ta.trigger("pinchStatus", [
              d,
              Ra || null,
              Qa || 0,
              Ma || 0,
              Va,
              Pa,
              Wa,
            ]),
            c.pinchStatus &&
              ((l = c.pinchStatus.call(
                Ta,
                b,
                d,
                Ra || null,
                Qa || 0,
                Ma || 0,
                Va,
                Pa,
                Wa
              )),
              l === !1))
          )
            return !1;
          if (d == x && Q())
            switch (Ra) {
              case i:
                Ta.trigger("pinchIn", [
                  Ra || null,
                  Qa || 0,
                  Ma || 0,
                  Va,
                  Pa,
                  Wa,
                ]),
                  c.pinchIn &&
                    (l = c.pinchIn.call(
                      Ta,
                      b,
                      Ra || null,
                      Qa || 0,
                      Ma || 0,
                      Va,
                      Pa,
                      Wa
                    ));
                break;
              case j:
                Ta.trigger("pinchOut", [
                  Ra || null,
                  Qa || 0,
                  Ma || 0,
                  Va,
                  Pa,
                  Wa,
                ]),
                  c.pinchOut &&
                    (l = c.pinchOut.call(
                      Ta,
                      b,
                      Ra || null,
                      Qa || 0,
                      Ma || 0,
                      Va,
                      Pa,
                      Wa
                    ));
            }
        }
        return (
          k == o
            ? (d !== y && d !== x) ||
              (clearTimeout(ab),
              clearTimeout(bb),
              Z() && !aa()
                ? ((_a = za()),
                  (ab = setTimeout(
                    a.proxy(function () {
                      (_a = null),
                        Ta.trigger("tap", [b.target]),
                        c.tap && (l = c.tap.call(Ta, b, b.target));
                    }, this),
                    c.doubleTapThreshold
                  )))
                : ((_a = null),
                  Ta.trigger("tap", [b.target]),
                  c.tap && (l = c.tap.call(Ta, b, b.target))))
            : k == p
            ? (d !== y && d !== x) ||
              (clearTimeout(ab),
              clearTimeout(bb),
              (_a = null),
              Ta.trigger("doubletap", [b.target]),
              c.doubleTap && (l = c.doubleTap.call(Ta, b, b.target)))
            : k == q &&
              ((d !== y && d !== x) ||
                (clearTimeout(ab),
                (_a = null),
                Ta.trigger("longtap", [b.target]),
                c.longTap && (l = c.longTap.call(Ta, b, b.target)))),
          l
        );
      }
      function L() {
        var a = !0;
        return null !== c.threshold && (a = Ja >= c.threshold), a;
      }
      function M() {
        var a = !1;
        return (
          null !== c.cancelThreshold &&
            null !== Ka &&
            (a = pa(Ka) - Ja >= c.cancelThreshold),
          a
        );
      }
      function N() {
        return null === c.pinchThreshold || Qa >= c.pinchThreshold;
      }
      function O() {
        var a;
        return (a = !c.maxTimeThreshold || !(Ma >= c.maxTimeThreshold));
      }
      function P(a, b) {
        if (c.preventDefaultEvents !== !1)
          if (c.allowPageScroll === k) a.preventDefault();
          else {
            var d = c.allowPageScroll === l;
            switch (b) {
              case e:
                ((c.swipeLeft && d) || (!d && c.allowPageScroll != r)) &&
                  a.preventDefault();
                break;
              case f:
                ((c.swipeRight && d) || (!d && c.allowPageScroll != r)) &&
                  a.preventDefault();
                break;
              case g:
                ((c.swipeUp && d) || (!d && c.allowPageScroll != s)) &&
                  a.preventDefault();
                break;
              case h:
                ((c.swipeDown && d) || (!d && c.allowPageScroll != s)) &&
                  a.preventDefault();
                break;
              case k:
            }
          }
      }
      function Q() {
        var a = W(),
          b = X(),
          c = N();
        return a && b && c;
      }
      function R() {
        return !!(c.pinchStatus || c.pinchIn || c.pinchOut);
      }
      function S() {
        return !(!Q() || !R());
      }
      function T() {
        var a = O(),
          b = L(),
          c = W(),
          d = X(),
          e = M(),
          f = !e && d && c && b && a;
        return f;
      }
      function U() {
        return !!(
          c.swipe ||
          c.swipeStatus ||
          c.swipeLeft ||
          c.swipeRight ||
          c.swipeUp ||
          c.swipeDown
        );
      }
      function V() {
        return !(!T() || !U());
      }
      function W() {
        return Va === c.fingers || c.fingers === t || !z;
      }
      function X() {
        return 0 !== Wa[0].end.x;
      }
      function Y() {
        return !!c.tap;
      }
      function Z() {
        return !!c.doubleTap;
      }
      function $() {
        return !!c.longTap;
      }
      function _() {
        if (null == _a) return !1;
        var a = za();
        return Z() && a - _a <= c.doubleTapThreshold;
      }
      function aa() {
        return _();
      }
      function ba() {
        return (1 === Va || !z) && (isNaN(Ja) || Ja < c.threshold);
      }
      function ca() {
        return Ma > c.longTapThreshold && u > Ja;
      }
      function da() {
        return !(!ba() || !Y());
      }
      function ea() {
        return !(!_() || !Z());
      }
      function fa() {
        return !(!ca() || !$());
      }
      function ga(a) {
        (Za = za()), ($a = a.touches.length + 1);
      }
      function ha() {
        (Za = 0), ($a = 0);
      }
      function ia() {
        var a = !1;
        if (Za) {
          var b = za() - Za;
          b <= c.fingerReleaseThreshold && (a = !0);
        }
        return a;
      }
      function ja() {
        return !(Ta.data(C + "_intouch") !== !0);
      }
      function ka(a) {
        Ta &&
          (a === !0
            ? (Ta.bind(Fa, D), Ta.bind(Ga, E), Ha && Ta.bind(Ha, G))
            : (Ta.unbind(Fa, D, !1),
              Ta.unbind(Ga, E, !1),
              Ha && Ta.unbind(Ha, G, !1)),
          Ta.data(C + "_intouch", a === !0));
      }
      function la(a, b) {
        var c = {
          start: { x: 0, y: 0 },
          last: { x: 0, y: 0 },
          end: { x: 0, y: 0 },
        };
        return (
          (c.start.x = c.last.x = c.end.x = b.pageX || b.clientX),
          (c.start.y = c.last.y = c.end.y = b.pageY || b.clientY),
          (Wa[a] = c),
          c
        );
      }
      function ma(a) {
        var b = void 0 !== a.identifier ? a.identifier : 0,
          c = na(b);
        return (
          null === c && (c = la(b, a)),
          (c.last.x = c.end.x),
          (c.last.y = c.end.y),
          (c.end.x = a.pageX || a.clientX),
          (c.end.y = a.pageY || a.clientY),
          c
        );
      }
      function na(a) {
        return Wa[a] || null;
      }
      function oa(a, b) {
        a != k && ((b = Math.max(b, pa(a))), (Sa[a].distance = b));
      }
      function pa(a) {
        return Sa[a] ? Sa[a].distance : void 0;
      }
      function qa() {
        var a = {};
        return (
          (a[e] = ra(e)), (a[f] = ra(f)), (a[g] = ra(g)), (a[h] = ra(h)), a
        );
      }
      function ra(a) {
        return { direction: a, distance: 0 };
      }
      function sa() {
        return Ya - Xa;
      }
      function ta(a, b) {
        var c = Math.abs(a.x - b.x),
          d = Math.abs(a.y - b.y);
        return Math.round(Math.sqrt(c * c + d * d));
      }
      function ua(a, b) {
        var c = (b / a) * 1;
        return c.toFixed(2);
      }
      function va() {
        return 1 > Pa ? j : i;
      }
      function wa(a, b) {
        return Math.round(
          Math.sqrt(Math.pow(b.x - a.x, 2) + Math.pow(b.y - a.y, 2))
        );
      }
      function xa(a, b) {
        var c = a.x - b.x,
          d = b.y - a.y,
          e = Math.atan2(d, c),
          f = Math.round((180 * e) / Math.PI);
        return 0 > f && (f = 360 - Math.abs(f)), f;
      }
      function ya(a, b) {
        if (Ca(a, b)) return k;
        var c = xa(a, b);
        return 45 >= c && c >= 0
          ? e
          : 360 >= c && c >= 315
          ? e
          : c >= 135 && 225 >= c
          ? f
          : c > 45 && 135 > c
          ? h
          : g;
      }
      function za() {
        var a = new Date();
        return a.getTime();
      }
      function Aa(b) {
        b = a(b);
        var c = b.offset(),
          d = {
            left: c.left,
            right: c.left + b.outerWidth(),
            top: c.top,
            bottom: c.top + b.outerHeight(),
          };
        return d;
      }
      function Ba(a, b) {
        return a.x > b.left && a.x < b.right && a.y > b.top && a.y < b.bottom;
      }
      function Ca(a, b) {
        return a.x == b.x && a.y == b.y;
      }
      var c = a.extend({}, c),
        Da = z || B || !c.fallbackToMouseEvents,
        Ea = Da
          ? B
            ? A
              ? "MSPointerDown"
              : "pointerdown"
            : "touchstart"
          : "mousedown",
        Fa = Da
          ? B
            ? A
              ? "MSPointerMove"
              : "pointermove"
            : "touchmove"
          : "mousemove",
        Ga = Da
          ? B
            ? A
              ? "MSPointerUp"
              : "pointerup"
            : "touchend"
          : "mouseup",
        Ha = Da ? (B ? "mouseleave" : null) : "mouseleave",
        Ia = B ? (A ? "MSPointerCancel" : "pointercancel") : "touchcancel",
        Ja = 0,
        Ka = null,
        La = null,
        Ma = 0,
        Na = 0,
        Oa = 0,
        Pa = 1,
        Qa = 0,
        Ra = 0,
        Sa = null,
        Ta = a(b),
        Ua = "start",
        Va = 0,
        Wa = {},
        Xa = 0,
        Ya = 0,
        Za = 0,
        $a = 0,
        _a = 0,
        ab = null,
        bb = null;
      try {
        Ta.bind(Ea, d), Ta.bind(Ia, F);
      } catch (b) {
        a.error("events not supported " + Ea + "," + Ia + " on jQuery.swipe");
      }
      (this.enable = function () {
        return this.disable(), Ta.bind(Ea, d), Ta.bind(Ia, F), Ta;
      }),
        (this.disable = function () {
          return H(), Ta;
        }),
        (this.destroy = function () {
          H(), Ta.data(C, null), (Ta = null);
        }),
        (this.option = function (b, d) {
          if ("object" == typeof b) c = a.extend(c, b);
          else if (void 0 !== c[b]) {
            if (void 0 === d) return c[b];
            c[b] = d;
          } else {
            if (!b) return c;
            a.error("Option " + b + " does not exist on jQuery.swipe.options");
          }
          return null;
        });
    }
    var d = "1.6.18",
      e = "left",
      f = "right",
      g = "up",
      h = "down",
      i = "in",
      j = "out",
      k = "none",
      l = "auto",
      m = "swipe",
      n = "pinch",
      o = "tap",
      p = "doubletap",
      q = "longtap",
      r = "horizontal",
      s = "vertical",
      t = "all",
      u = 10,
      v = "start",
      w = "move",
      x = "end",
      y = "cancel",
      z = "ontouchstart" in window,
      A =
        window.navigator.msPointerEnabled &&
        !window.navigator.pointerEnabled &&
        !z,
      B =
        (window.navigator.pointerEnabled ||
          window.navigator.msPointerEnabled) &&
        !z,
      C = "TouchSwipe",
      D = {
        fingers: 1,
        threshold: 75,
        cancelThreshold: null,
        pinchThreshold: 20,
        maxTimeThreshold: null,
        fingerReleaseThreshold: 250,
        longTapThreshold: 500,
        doubleTapThreshold: 200,
        swipe: null,
        swipeLeft: null,
        swipeRight: null,
        swipeUp: null,
        swipeDown: null,
        swipeStatus: null,
        pinchIn: null,
        pinchOut: null,
        pinchStatus: null,
        click: null,
        tap: null,
        doubleTap: null,
        longTap: null,
        hold: null,
        triggerOnTouchEnd: !0,
        triggerOnTouchLeave: !1,
        allowPageScroll: "auto",
        fallbackToMouseEvents: !0,
        excludedElements: ".noSwipe",
        preventDefaultEvents: !0,
      };
    (a.fn.swipe = function (c) {
      var d = a(this),
        e = d.data(C);
      if (e && "string" == typeof c) {
        if (e[c])
          return e[c].apply(e, Array.prototype.slice.call(arguments, 1));
        a.error("Method " + c + " does not exist on jQuery.swipe");
      } else if (e && "object" == typeof c) e.option.apply(e, arguments);
      else if (!(e || ("object" != typeof c && c)))
        return b.apply(this, arguments);
      return d;
    }),
      (a.fn.swipe.version = d),
      (a.fn.swipe.defaults = D),
      (a.fn.swipe.phases = {
        PHASE_START: v,
        PHASE_MOVE: w,
        PHASE_END: x,
        PHASE_CANCEL: y,
      }),
      (a.fn.swipe.directions = {
        LEFT: e,
        RIGHT: f,
        UP: g,
        DOWN: h,
        IN: i,
        OUT: j,
      }),
      (a.fn.swipe.pageScroll = {
        NONE: k,
        HORIZONTAL: r,
        VERTICAL: s,
        AUTO: l,
      }),
      (a.fn.swipe.fingers = {
        ONE: 1,
        TWO: 2,
        THREE: 3,
        FOUR: 4,
        FIVE: 5,
        ALL: t,
      });
  }),
  !(function (a) {
    (a.isBreakpoint = function (b) {
      var c, d;
      return (
        (c = a("<div/>", { class: "visible-" + b }).appendTo("body")),
        (d = c.is(":visible")),
        c.remove(),
        d
      );
    }),
      a.extend(a, {
        isXs: function () {
          return a.isBreakpoint("xs");
        },
        isSm: function () {
          return a.isBreakpoint("sm");
        },
        isMd: function () {
          return a.isBreakpoint("md");
        },
        isLg: function () {
          return a.isBreakpoint("lg");
        },
      });
  })(jQuery);
var App = (function () {
    "use strict";
    return (
      (App.ChartJs = function () {
        function a() {
          var a = tinycolor(App.color.primary),
            b = tinycolor(App.color.primary).lighten(22),
            c = document.getElementById("line-chart"),
            d = {
              labels: [
                "January",
                "February",
                "March",
                "April",
                "May",
                "June",
                "July",
              ],
              datasets: [
                {
                  label: "My First dataset",
                  borderColor: a,
                  backgroundColor: a.setAlpha(0.8),
                  data: [g(), g(), g(), g(), g(), g(), g()],
                },
                {
                  label: "My Second dataset",
                  borderColor: b,
                  backgroundColor: b.setAlpha(0.5),
                  data: [g(), g(), g(), g(), g(), g(), g()],
                },
              ],
            };
          new Chart(c, { type: "line", data: d });
        }
        function b() {
          var a = tinycolor(App.color.success),
            b = tinycolor(App.color.warning),
            c = document.getElementById("bar-chart"),
            d = {
              labels: [
                "January",
                "February",
                "March",
                "April",
                "May",
                "June",
                "July",
              ],
              datasets: [
                {
                  label: "Credit",
                  borderColor: a,
                  backgroundColor: a.setAlpha(0.8),
                  data: [g(), g(), g(), g(), g(), g(), g()],
                },
                {
                  label: "Debit",
                  borderColor: b,
                  backgroundColor: b.setAlpha(0.5),
                  data: [g(), g(), g(), g(), g(), g(), g()],
                },
              ],
            };
          new Chart(c, {
            type: "bar",
            data: d,
            options: {
              elements: {
                rectangle: {
                  borderWidth: 2,
                  borderColor: "rgb(0, 255, 0)",
                  borderSkipped: "bottom",
                },
              },
            },
          });
        }
        function c() {
          var a = tinycolor(App.color.grey),
            b = tinycolor(App.color.danger),
            c = document.getElementById("radar-chart"),
            d = {
              labels: [
                "Eating",
                "Drinking",
                "Sleeping",
                "Designing",
                "Coding",
                "Cycling",
                "Running",
              ],
              datasets: [
                {
                  label: "First Year",
                  backgroundColor: a.setAlpha(0.3),
                  borderColor: a,
                  pointBackgroundColor: a,
                  pointBorderColor: "#fff",
                  pointHoverBackgroundColor: "#fff",
                  pointHoverBorderColor: a,
                  data: [65, 59, 90, 81, 56, 55, 40],
                },
                {
                  label: "Second Year",
                  backgroundColor: b.setAlpha(0.4),
                  borderColor: b,
                  pointBackgroundColor: b,
                  pointBorderColor: "#fff",
                  pointHoverBackgroundColor: "#fff",
                  pointHoverBorderColor: b,
                  data: [28, 48, 40, 19, 96, 27, 100],
                },
              ],
            };
          new Chart(c, { type: "radar", data: d });
        }
        function d() {
          var a = App.color.primary,
            b = App.color.success,
            c = App.color.warning,
            d = App.color.danger,
            e = App.color.grey,
            f = document.getElementById("polar-chart"),
            g = {
              datasets: [
                {
                  data: [11, 16, 7, 3, 14],
                  backgroundColor: [d, b, c, e, a],
                  label: "My dataset",
                },
              ],
              labels: ["Red", "Green", "Yellow", "Grey", "Blue"],
            };
          new Chart(f, { type: "polarArea", data: g });
        }
        function e() {
          var a = App.color.primary,
            b = tinycolor(App.color.primary).lighten(12),
            c = tinycolor(App.color.primary).lighten(22),
            d = document.getElementById("pie-chart"),
            e = {
              labels: ["Red", "Blue", "Yellow"],
              datasets: [
                {
                  data: [300, 50, 100],
                  backgroundColor: [a, b, c],
                  hoverBackgroundColor: [a, b, c],
                },
              ],
            };
          new Chart(d, { type: "pie", data: e });
        }
        function f() {
          var a = App.color.success,
            b = tinycolor(App.color.success).lighten(12),
            c = tinycolor(App.color.success).lighten(22),
            d = document.getElementById("donut-chart"),
            e = {
              labels: ["Red", "Blue", "Yellow"],
              datasets: [
                {
                  data: [300, 50, 100],
                  backgroundColor: [a, b, c],
                  hoverBackgroundColor: [a, b, c],
                },
              ],
            };
          new Chart(d, { type: "doughnut", data: e });
        }
        var g = function () {
          return Math.round(100 * Math.random());
        };
        a(), b(), c(), d(), e(), f();
      }),
      App
    );
  })(App || {}),
  App = (function () {
    "use strict";
    return (
      (App.chartsMorris = function () {
        function a() {
          var a = App.color.primary,
            b = tinycolor(App.color.primary).lighten(15).toString();
          new Morris.Line({
            element: "line-chart",
            data: e,
            xkey: "period",
            ykeys: ["licensed", "sorned"],
            labels: ["Licensed", "Off the road"],
            lineColors: [a, b],
          });
        }
        function b() {
          var a = tinycolor(App.color.success).lighten(15).toString(),
            b = tinycolor(App.color.success).brighten(3).toString();
          Morris.Bar({
            element: "bar-chart",
            data: [
              { device: "iPhone", geekbench: 136, macbench: 180 },
              { device: "iPhone 3G", geekbench: 137, macbench: 200 },
              { device: "iPhone 3GS", geekbench: 275, macbench: 350 },
              { device: "iPhone 4", geekbench: 380, macbench: 500 },
              { device: "iPhone 4S", geekbench: 655, macbench: 900 },
              { device: "iPhone 5", geekbench: 1571, macbench: 1700 },
            ],
            xkey: "device",
            ykeys: ["geekbench", "macbench"],
            labels: ["Geekbench", "Macbench"],
            barColors: [a, b],
            barRatio: 0.4,
            xLabelAngle: 35,
            hideHover: "auto",
          });
        }
        function c() {
          var a = App.color.warning,
            b = App.color.success,
            c = App.color.primary;
          Morris.Donut({
            element: "donut-chart",
            data: [
              { label: "Facebook", value: 33 },
              { label: "Google", value: 33 },
              { label: "Twitter", value: 33 },
            ],
            colors: [a, b, c],
            formatter: function (a) {
              return a + "%";
            },
          });
        }
        function d() {
          var a = App.color.primary,
            b = App.color.success,
            c = App.color.warning;
          Morris.Area({
            element: "area-chart",
            data: [
              { period: "2010 Q1", iphone: 2666, ipad: null, itouch: 2647 },
              { period: "2010 Q2", iphone: 2778, ipad: 2294, itouch: 2441 },
              { period: "2010 Q3", iphone: 4912, ipad: 1969, itouch: 2501 },
              { period: "2010 Q4", iphone: 3767, ipad: 3597, itouch: 5689 },
              { period: "2011 Q1", iphone: 6810, ipad: 1914, itouch: 2293 },
              { period: "2011 Q2", iphone: 5670, ipad: 4293, itouch: 1881 },
              { period: "2011 Q3", iphone: 4820, ipad: 3795, itouch: 1588 },
              { period: "2011 Q4", iphone: 15073, ipad: 5967, itouch: 5175 },
              { period: "2012 Q1", iphone: 10687, ipad: 4460, itouch: 2028 },
              { period: "2012 Q2", iphone: 8432, ipad: 5713, itouch: 1791 },
            ],
            xkey: "period",
            ykeys: ["iphone", "ipad", "itouch"],
            labels: ["iPhone", "iPad", "iPod Touch"],
            lineColors: [a, b, c],
            pointSize: 2,
            hideHover: "auto",
          });
        }
        var e = [
          { period: "2013", licensed: 400, sorned: 550 },
          { period: "2012", licensed: 450, sorned: 400 },
          { period: "2011", licensed: 350, sorned: 550 },
          { period: "2010", licensed: 500, sorned: 700 },
          { period: "2009", licensed: 250, sorned: 380 },
          { period: "2008", licensed: 350, sorned: 240 },
          { period: "2007", licensed: 180, sorned: 300 },
          { period: "2006", licensed: 300, sorned: 250 },
          { period: "2005", licensed: 200, sorned: 150 },
        ];
        a(), b(), c(), d();
      }),
      App
    );
  })(App || {}),
  App = (function () {
    "use strict";
    return (
      (App.chartsSparklines = function () {
        var a = App.color.primary,
          b = App.color.warning,
          c = App.color.success,
          d = App.color.danger;
        $("#spark1").sparkline("html", {
          width: "85",
          height: "35",
          lineColor: a,
          highlightSpotColor: a,
          highlightLineColor: a,
          fillColor: !1,
          spotColor: !1,
          minSpotColor: !1,
          maxSpotColor: !1,
          lineWidth: 1.15,
        }),
          $("#spark2").sparkline("html", {
            type: "bar",
            width: "85",
            height: "35",
            barWidth: 3,
            barSpacing: 3,
            chartRangeMin: 0,
            barColor: b,
          }),
          $("#spark3").sparkline("html", {
            type: "discrete",
            width: "85",
            height: "35",
            lineHeight: 20,
            lineColor: c,
            xwidth: 18,
          }),
          $("#spark4").sparkline("html", {
            width: "85",
            height: "35",
            lineColor: d,
            highlightSpotColor: d,
            highlightLineColor: d,
            fillColor: !1,
            spotColor: !1,
            minSpotColor: !1,
            maxSpotColor: !1,
            lineWidth: 1.15,
          });
        var e = tinycolor(App.color.primary),
          f = tinycolor(App.color.danger),
          g = tinycolor(App.color.warning),
          h = tinycolor(App.color.success),
          a = e.toString(),
          b = f.toString(),
          c = g.toString(),
          d = h.toString();
        ($.fn.sparkline.defaults.common.lineColor = a),
          ($.fn.sparkline.defaults.common.fillColor = e
            .setAlpha(0.3)
            .toString()),
          ($.fn.sparkline.defaults.line.spotColor = a),
          ($.fn.sparkline.defaults.line.minSpotColor = a),
          ($.fn.sparkline.defaults.line.maxSpotColor = a),
          ($.fn.sparkline.defaults.line.highlightSpotColor = a),
          ($.fn.sparkline.defaults.line.highlightLineColor = a),
          ($.fn.sparkline.defaults.bar.barColor = a),
          ($.fn.sparkline.defaults.bar.negBarColor = b),
          ($.fn.sparkline.defaults.bar.stackedBarColor[0] = a),
          ($.fn.sparkline.defaults.bar.stackedBarColor[1] = b),
          ($.fn.sparkline.defaults.tristate.posBarColor = a),
          ($.fn.sparkline.defaults.tristate.negBarColor = b),
          ($.fn.sparkline.defaults.discrete.thresholdColor = b),
          ($.fn.sparkline.defaults.bullet.targetColor = a),
          ($.fn.sparkline.defaults.bullet.performanceColor = b),
          ($.fn.sparkline.defaults.bullet.rangeColors[0] = f
            .setAlpha(0.2)
            .toString()),
          ($.fn.sparkline.defaults.bullet.rangeColors[1] = f
            .setAlpha(0.5)
            .toString()),
          ($.fn.sparkline.defaults.bullet.rangeColors[2] = f
            .setAlpha(0.45)
            .toString()),
          ($.fn.sparkline.defaults.pie.sliceColors[0] = a),
          ($.fn.sparkline.defaults.pie.sliceColors[1] = b),
          ($.fn.sparkline.defaults.pie.sliceColors[2] = c),
          ($.fn.sparkline.defaults.box.medianColor = a),
          ($.fn.sparkline.defaults.box.boxFillColor = f
            .setAlpha(0.5)
            .toString()),
          ($.fn.sparkline.defaults.box.boxLineColor = a),
          ($.fn.sparkline.defaults.box.whiskerColor = d),
          $(".compositebar").sparkline("html", { type: "bar", barColor: b }),
          $(".compositebar").sparkline(
            [4, 1, 5, 7, 9, 9, 8, 7, 6, 6, 4, 7, 8, 4, 3, 2, 2, 5, 6, 7],
            { composite: !0, fillColor: !1 }
          ),
          $(".sparklinebasic").sparkline(),
          $(".linecustom").sparkline("html", {
            height: "1.5em",
            width: "8em",
            lineColor: c,
            fillColor: g.setAlpha(0.4).toString(),
            minSpotColor: !1,
            maxSpotColor: !1,
            spotColor: d,
            spotRadius: 3,
          }),
          $(".sparkbar").sparkline("html", { type: "bar" }),
          $(".sparktristate").sparkline("html", { type: "tristate" }),
          $(".compositeline").sparkline("html", {
            fillColor: !1,
            changeRangeMin: 0,
            chartRangeMax: 10,
          }),
          $(".compositeline").sparkline(
            [4, 1, 5, 7, 9, 9, 8, 7, 6, 6, 4, 7, 8, 4, 3, 2, 2, 5, 6, 7],
            {
              composite: !0,
              fillColor: !1,
              lineColor: b,
              changeRangeMin: 0,
              chartRangeMax: 10,
            }
          ),
          $(".normalline").sparkline("html", {
            fillColor: !1,
            normalRangeMin: -1,
            normalRangeMax: 8,
          }),
          $(".discrete1").sparkline("html", { type: "discrete", xwidth: 18 }),
          $(".discrete2").sparkline("html", {
            type: "discrete",
            thresholdValue: 4,
          }),
          $(".sparkbullet").sparkline("html", { type: "bullet" }),
          $(".sparkpie").sparkline("html", { type: "pie", height: "1.0em" }),
          $(".sparkboxplot").sparkline("html", { type: "box" });
      }),
      App
    );
  })(App || {}),
  App = (function () {
    "use strict";
    return (
      (App.charts = function () {
        function a() {
          return Math.floor(31 * Math.random()) + 10;
        }
        function b() {
          var a = App.color.primary;
          $.plot(
            $("#line-chart1"),
            [
              {
                data: [
                  [0, 20],
                  [1, 30],
                  [2, 25],
                  [3, 39],
                  [4, 35],
                  [5, 40],
                  [6, 30],
                  [7, 45],
                ],
                label: "Page Views",
              },
            ],
            {
              series: {
                lines: {
                  show: !0,
                  lineWidth: 2,
                  fill: !0,
                  fillColor: { colors: [{ opacity: 0.35 }, { opacity: 0.35 }] },
                },
                points: { show: !0 },
                shadowSize: 0,
              },
              legend: { show: !1 },
              grid: {
                margin: { left: -8, right: -8, top: 0, bottom: 0 },
                show: !1,
                labelMargin: 15,
                axisMargin: 500,
                hoverable: !0,
                clickable: !0,
                tickColor: "rgba(0,0,0,0.15)",
                borderWidth: 0,
              },
              colors: [a],
              xaxis: { ticks: 11, tickDecimals: 0 },
              yaxis: { autoscaleMargin: 0.5, ticks: 4, tickDecimals: 0 },
            }
          );
        }
        function c() {
          var a = [
              { label: "Google", data: 45 },
              { label: "Dribbble", data: 25 },
              { label: "Twitter", data: 20 },
              { label: "Facebook", data: 10 },
            ],
            b = tinycolor(App.color.danger).brighten(9).toString(),
            c = tinycolor(App.color.danger).lighten(13).toString(),
            d = tinycolor(App.color.danger).lighten(20).toString(),
            e = tinycolor(App.color.danger).lighten(27).toString();
          $.plot("#pie-chart4", a, {
            series: {
              pie: {
                show: !0,
                innerRadius: 0.35,
                shadow: { top: 5, left: 15, alpha: 0.3 },
                stroke: { width: 0 },
                label: {
                  show: !0,
                  formatter: function (a, b) {
                    return (
                      '<div style="font-size:12px;text-align:center;padding:2px;color:#333;">' +
                      a +
                      "</div>"
                    );
                  },
                },
                highlight: { opacity: 0.08 },
              },
            },
            grid: { hoverable: !0, clickable: !0 },
            colors: [b, c, d, e],
            legend: { show: !1 },
          });
        }
        function d() {
          var a = tinycolor(App.color.warning).lighten(25).toString(),
            b = tinycolor(App.color.warning).brighten(3).toString();
          $.plot(
            $("#bar-chart1"),
            [
              {
                data: [
                  [0, 15],
                  [1, 15],
                  [2, 19],
                  [3, 28],
                  [4, 30],
                  [5, 37],
                  [6, 35],
                  [7, 38],
                  [8, 48],
                  [9, 43],
                  [10, 38],
                  [11, 32],
                  [12, 38],
                ],
                label: "Page Views",
              },
              {
                data: [
                  [0, 7],
                  [1, 10],
                  [2, 15],
                  [3, 23],
                  [4, 24],
                  [5, 29],
                  [6, 25],
                  [7, 33],
                  [8, 35],
                  [9, 38],
                  [10, 32],
                  [11, 27],
                  [12, 32],
                ],
                label: "Unique Visitor",
              },
            ],
            {
              series: {
                bars: {
                  align: "center",
                  show: !0,
                  lineWidth: 1,
                  barWidth: 0.6,
                  fill: !0,
                  fillColor: { colors: [{ opacity: 1 }, { opacity: 1 }] },
                },
                shadowSize: 2,
              },
              legend: { show: !1 },
              grid: {
                margin: 0,
                show: !1,
                labelMargin: 10,
                axisMargin: 500,
                hoverable: !0,
                clickable: !0,
                tickColor: "rgba(0,0,0,0.15)",
                borderWidth: 0,
              },
              colors: [a, b],
              xaxis: { ticks: 11, tickDecimals: 0 },
              yaxis: { autoscaleMargin: 0.5, ticks: 4, tickDecimals: 0 },
            }
          );
        }
        function e() {
          var a = tinycolor(App.color.success).lighten(7).toString(),
            b = App.color.success,
            c = [
              [1, 20],
              [2, 50],
              [3, 35],
              [4, 50],
              [5, 25],
            ],
            d = [
              [1, 50],
              [2, 20],
              [3, 55],
              [4, 30],
              [5, 65],
            ];
          $.plot(
            "#linechart-mini1",
            [
              { data: c, canvasRender: !0 },
              { data: d, canvasRender: !0 },
            ],
            {
              series: {
                lines: {
                  show: !0,
                  lineWidth: 0,
                  fill: !0,
                  fillColor: { colors: [{ opacity: 0.7 }, { opacity: 0.7 }] },
                },
                fillColor: "rgba(0, 0, 0, 1)",
                shadowSize: 0,
                curvedLines: { apply: !0, active: !0, monotonicFit: !0 },
              },
              legend: { show: !1 },
              grid: { show: !1, hoverable: !0, clickable: !0 },
              colors: [a, b],
              xaxis: { autoscaleMargin: 0, ticks: 11, tickDecimals: 0 },
              yaxis: { autoscaleMargin: 0.5, ticks: 5, tickDecimals: 0 },
            }
          );
        }
        function f() {
          function a() {
            for (d.length > 0 && (d = d.slice(1)); d.length < e; ) {
              var a = d.length > 0 ? d[d.length - 1] : 50,
                b = a + 10 * Math.random() - 5;
              b < 0 ? (b = 0) : b > 100 && (b = 100), d.push(b);
            }
            for (var c = [], f = 0; f < d.length; ++f) c.push([f, d[f]]);
            return c;
          }
          function b() {
            g.setData([a()]), g.draw(), setTimeout(b, f);
          }
          var c = App.color.success,
            d = [],
            e = 100,
            f = 500,
            g = $.plot("#live-data", [a()], {
              series: {
                shadowSize: 0,
                lines: {
                  show: !0,
                  lineWidth: 1,
                  fill: !0,
                  fillColor: { colors: [{ opacity: 0.35 }, { opacity: 0.35 }] },
                },
              },
              grid: {
                show: !0,
                margin: { top: 3, bottom: 0, left: 0, right: 0 },
                labelMargin: 0,
                axisMargin: 0,
                hoverable: !0,
                clickable: !0,
                tickColor: "rgba(0,0,0,0)",
                borderWidth: 0,
                minBorderMargin: 0,
              },
              colors: [c],
              yaxis: {
                show: !1,
                autoscaleMargin: 0.2,
                ticks: 5,
                tickDecimals: 0,
              },
              xaxis: { show: !1, autoscaleMargin: 0 },
            });
          b();
        }
        function g() {
          var b = tinycolor(App.color.primary).lighten(22),
            c = App.color.primary,
            d = [
              [1, a()],
              [2, a()],
              [3, 2 + a()],
              [4, 3 + a()],
              [5, 5 + a()],
              [6, 10 + a()],
              [7, 15 + a()],
              [8, 20 + a()],
              [9, 25 + a()],
              [10, 30 + a()],
              [11, 35 + a()],
              [12, 25 + a()],
              [13, 15 + a()],
              [14, 20 + a()],
              [15, 45 + a()],
              [16, 50 + a()],
              [17, 65 + a()],
              [18, 70 + a()],
              [19, 85 + a()],
              [20, 80 + a()],
              [21, 75 + a()],
              [22, 80 + a()],
              [23, 75 + a()],
            ],
            e = [
              [1, a()],
              [2, a()],
              [3, 10 + a()],
              [4, 15 + a()],
              [5, 20 + a()],
              [6, 25 + a()],
              [7, 30 + a()],
              [8, 35 + a()],
              [9, 40 + a()],
              [10, 45 + a()],
              [11, 50 + a()],
              [12, 55 + a()],
              [13, 60 + a()],
              [14, 70 + a()],
              [15, 75 + a()],
              [16, 80 + a()],
              [17, 85 + a()],
              [18, 90 + a()],
              [19, 95 + a()],
              [20, 100 + a()],
              [21, 110 + a()],
              [22, 120 + a()],
              [23, 130 + a()],
            ];
          $.plot(
            $("#line-chart-live"),
            [
              {
                data: e,
                showLabels: !0,
                label: "New Visitors",
                labelPlacement: "below",
                canvasRender: !0,
                cColor: "#FFFFFF",
              },
              {
                data: d,
                showLabels: !0,
                label: "Old Visitors",
                labelPlacement: "below",
                canvasRender: !0,
                cColor: "#FFFFFF",
              },
            ],
            {
              series: {
                lines: {
                  show: !0,
                  lineWidth: 1.5,
                  fill: !0,
                  fillColor: { colors: [{ opacity: 0.5 }, { opacity: 0.5 }] },
                },
                fillColor: "rgba(0, 0, 0, 1)",
                points: { show: !1, fill: !0 },
                shadowSize: 0,
              },
              legend: { show: !1 },
              grid: {
                show: !1,
                margin: { top: -20, bottom: 0, left: 0, right: 0 },
                labelMargin: 0,
                axisMargin: 0,
                hoverable: !0,
                clickable: !0,
                tickColor: "rgba(0,0,0,0)",
                borderWidth: 0,
                minBorderMargin: 0,
              },
              colors: [b, c],
              xaxis: { autoscaleMargin: 0, ticks: 11, tickDecimals: 0 },
              yaxis: { autoscaleMargin: 0.2, ticks: 5, tickDecimals: 0 },
            }
          );
        }
        function h() {
          var a = App.color.primary,
            b =
              ($("#line-chart2"),
              [
                [1, 10],
                [2, 30],
                [3, 55],
                [4, 36],
                [5, 57],
                [6, 80],
                [7, 65],
                [8, 50],
                [9, 80],
                [10, 70],
                [11, 90],
                [12, 67],
                [12, 67],
              ]);
          $.plot(
            "#line-chart2",
            [
              {
                data: b,
                showLabels: !0,
                label: "New Visitors",
                labelPlacement: "below",
                canvasRender: !0,
                cColor: "#FFFFFF",
              },
            ],
            {
              series: {
                lines: {
                  show: !0,
                  lineWidth: 2,
                  fill: !0,
                  fillColor: { colors: [{ opacity: 0.35 }, { opacity: 0.35 }] },
                },
                fillColor: "rgba(0, 0, 0, 1)",
                points: { show: !0, fill: !0, fillColor: a },
                shadowSize: 0,
              },
              legend: { show: !1 },
              grid: {
                show: !1,
                margin: { left: -8, right: -8, top: 0, botttom: 0 },
                labelMargin: 0,
                axisMargin: 0,
                hoverable: !0,
                clickable: !0,
                tickColor: "rgba(0, 0, 0, 0)",
                borderWidth: 0,
              },
              colors: [a],
              xaxis: { autoscaleMargin: 0, ticks: 11, tickDecimals: 0 },
              yaxis: { autoscaleMargin: 0.5, ticks: 5, tickDecimals: 0 },
            }
          );
        }
        function i() {
          var a = tinycolor(App.color.primary).lighten(5).toString();
          $.plot(
            $("#line-chart3"),
            [
              {
                data: [
                  [0, 20],
                  [1, 30],
                  [2, 25],
                  [3, 39],
                  [4, 35],
                  [5, 40],
                  [6, 30],
                  [7, 45],
                ],
                label: "Page Views",
              },
            ],
            {
              series: {
                lines: {
                  show: !0,
                  lineWidth: 2,
                  fill: !0,
                  fillColor: { colors: [{ opacity: 0.1 }, { opacity: 0.1 }] },
                },
                points: { show: !0 },
                shadowSize: 0,
              },
              legend: { show: !1 },
              grid: {
                margin: { left: 23, right: 30, top: 20, botttom: 40 },
                labelMargin: 15,
                axisMargin: 500,
                hoverable: !0,
                clickable: !0,
                tickColor: "rgba(0,0,0,0.15)",
                borderWidth: 0,
              },
              colors: [a],
              xaxis: { ticks: 11, tickDecimals: 0 },
              yaxis: { ticks: 4, tickSize: 15, tickDecimals: 0 },
            }
          );
        }
        function j() {
          var a = App.color.success,
            b = tinycolor(App.color.success).lighten(22).toString();
          $.plot(
            $("#bar-chart2"),
            [
              {
                data: [
                  [0, 7],
                  [1, 13],
                  [2, 17],
                  [3, 20],
                  [4, 26],
                  [5, 37],
                  [6, 35],
                  [7, 28],
                  [8, 38],
                  [9, 38],
                  [10, 32],
                ],
                label: "Page Views",
              },
              {
                data: [
                  [0, 15],
                  [1, 10],
                  [2, 15],
                  [3, 25],
                  [4, 30],
                  [5, 29],
                  [6, 25],
                  [7, 33],
                  [8, 45],
                  [9, 43],
                  [10, 38],
                ],
                label: "Unique Visitor",
              },
            ],
            {
              series: {
                bars: {
                  order: 2,
                  align: "center",
                  show: !0,
                  lineWidth: 1,
                  barWidth: 0.35,
                  fill: !0,
                  fillColor: { colors: [{ opacity: 1 }, { opacity: 1 }] },
                },
                shadowSize: 2,
              },
              legend: { show: !1 },
              grid: {
                margin: { left: 23, right: 30, top: 20, botttom: 40 },
                labelMargin: 10,
                axisMargin: 200,
                hoverable: !0,
                clickable: !0,
                tickColor: "rgba(0,0,0,0.15)",
                borderWidth: 1,
                borderColor: "rgba(0,0,0,0.15)",
              },
              colors: [a, b],
              xaxis: { ticks: 11, tickDecimals: 0 },
              yaxis: { ticks: 4, tickDecimals: 0 },
            }
          );
        }
        i(), j(), b(), c(), d(), e(), f(), g(), h();
      }),
      App
    );
  })(App || {}),
  App = (function () {
    "use strict";
    return (
      (App.dashboard = function () {
        function a() {
          $('[data-toggle="counter"]').each(function (a, b) {
            var c = $(this),
              d = "",
              e = "",
              f = 0,
              g = 0,
              h = 0,
              i = 2.5;
            c.data("prefix") && (d = c.data("prefix")),
              c.data("suffix") && (e = c.data("suffix")),
              c.data("start") && (f = c.data("start")),
              c.data("end") && (g = c.data("end")),
              c.data("decimals") && (h = c.data("decimals")),
              c.data("duration") && (i = c.data("duration"));
            var j = new CountUp(c.get(0), f, g, h, i, { suffix: e, prefix: d });
            j.start();
          });
        }
        function b() {
          $(".toggle-loading").on("click", function () {
            var a = $(this).parents(".widget, .panel");
            a.length &&
              (a.addClass("be-loading-active"),
              setTimeout(function () {
                a.removeClass("be-loading-active");
              }, 3e3));
          });
        }
        function c() {
          var a = App.color.primary,
            b = App.color.warning,
            c = App.color.success,
            d = App.color.danger;
          $("#spark1").sparkline([0, 5, 3, 7, 5, 10, 3, 6, 5, 10], {
            width: "85",
            height: "35",
            lineColor: a,
            highlightSpotColor: a,
            highlightLineColor: a,
            fillColor: !1,
            spotColor: !1,
            minSpotColor: !1,
            maxSpotColor: !1,
            lineWidth: 1.15,
          }),
            $("#spark2").sparkline(
              [5, 8, 7, 10, 9, 10, 8, 6, 4, 6, 8, 7, 6, 8],
              {
                type: "bar",
                width: "85",
                height: "35",
                barWidth: 3,
                barSpacing: 3,
                chartRangeMin: 0,
                barColor: b,
              }
            ),
            $("#spark3").sparkline(
              [2, 3, 4, 5, 4, 3, 2, 3, 4, 5, 6, 5, 4, 3, 4, 5, 6, 5, 4, 4, 5],
              {
                type: "discrete",
                width: "85",
                height: "35",
                lineHeight: 20,
                lineColor: c,
                xwidth: 18,
              }
            ),
            $("#spark4").sparkline([2, 5, 3, 7, 5, 10, 3, 6, 5, 7], {
              width: "85",
              height: "35",
              lineColor: d,
              highlightSpotColor: d,
              highlightLineColor: d,
              fillColor: !1,
              spotColor: !1,
              minSpotColor: !1,
              maxSpotColor: !1,
              lineWidth: 1.15,
            });
        }
        function d() {
          var a = App.color.primary,
            b = tinycolor(App.color.primary).lighten(13).toString(),
            c = tinycolor(App.color.primary).lighten(20).toString(),
            d = [
              [1, 35],
              [2, 60],
              [3, 40],
              [4, 65],
              [5, 45],
              [6, 75],
              [7, 35],
              [8, 40],
              [9, 60],
            ],
            e = [
              [1, 20],
              [2, 40],
              [3, 25],
              [4, 45],
              [5, 25],
              [6, 50],
              [7, 35],
              [8, 60],
              [9, 30],
            ],
            f = [
              [1, 35],
              [2, 15],
              [3, 20],
              [4, 30],
              [5, 15],
              [6, 18],
              [7, 28],
              [8, 10],
              [9, 30],
            ];
          $.plot(
            "#main-chart",
            [
              { data: d, canvasRender: !0 },
              { data: e, canvasRender: !0 },
              { data: f, canvasRender: !0 },
            ],
            {
              series: {
                lines: {
                  show: !0,
                  lineWidth: 0,
                  fill: !0,
                  fillColor: { colors: [{ opacity: 1 }, { opacity: 1 }] },
                },
                fillColor: "rgba(0, 0, 0, 1)",
                shadowSize: 0,
                curvedLines: { apply: !0, active: !0, monotonicFit: !0 },
              },
              legend: { show: !1 },
              grid: {
                show: !0,
                margin: { top: 20, bottom: 0, left: 0, right: 0 },
                labelMargin: 0,
                minBorderMargin: 0,
                axisMargin: 0,
                tickColor: "rgba(0,0,0,0.05)",
                borderWidth: 0,
                hoverable: !0,
                clickable: !0,
              },
              colors: [a, b, c],
              xaxis: {
                tickFormatter: function () {
                  return "";
                },
                autoscaleMargin: 0,
                ticks: 11,
                tickDecimals: 0,
                tickLength: 0,
              },
              yaxis: {
                tickFormatter: function () {
                  return "";
                },
                ticks: 4,
                tickDecimals: 0,
              },
            }
          );
          $('[data-color="main-chart-color1"]').css({ "background-color": a }),
            $('[data-color="main-chart-color2"]').css({
              "background-color": b,
            }),
            $('[data-color="main-chart-color3"]').css({
              "background-color": c,
            });
        }
        function e() {
          var a = [
              { label: "Services", data: 33 },
              { label: "Standard Plans", data: 33 },
              { label: "Services", data: 33 },
            ],
            b = App.color.success,
            c = App.color.warning,
            d = App.color.primary;
          $.plot("#top-sales", a, {
            series: {
              pie: {
                radius: 0.75,
                innerRadius: 0.58,
                show: !0,
                highlight: { opacity: 0.1 },
                label: { show: !1 },
              },
            },
            grid: { hoverable: !0 },
            legend: { show: !1 },
            colors: [b, c, d],
          }),
            $('[data-color="top-sales-color1"]').css({ "background-color": b }),
            $('[data-color="top-sales-color2"]').css({ "background-color": c }),
            $('[data-color="top-sales-color3"]').css({ "background-color": d });
        }
        function f() {
          function a(a) {
            var b = a.dpDiv,
              c = $("tbody tr", b).length;
            6 == c
              ? b.addClass("ui-datepicker-6rows")
              : b.removeClass("ui-datepicker-6rows");
          }
          var b = $("#calendar-widget"),
            c = new Date(),
            d = c.getFullYear(),
            e = c.getMonth(),
            f = [d + "-" + (e + 1) + "-16", d + "-" + (e + 1) + "-20"];
          $.extend($.datepicker, {
            _updateDatepicker_original: $.datepicker._updateDatepicker,
            _updateDatepicker: function (a) {
              this._updateDatepicker_original(a);
              var b = this._get(a, "afterShow");
              b && b.apply(a, [a]);
            },
          }),
            "undefined" != typeof jQuery.ui &&
              b.datepicker({
                showOtherMonths: !0,
                selectOtherMonths: !0,
                beforeShowDay: function (a) {
                  var b = a.getMonth(),
                    c = a.getDate(),
                    d = a.getFullYear();
                  return $.inArray(d + "-" + (b + 1) + "-" + c, f) != -1
                    ? [!0, "has-events", "This day has events!"]
                    : [!0, "", ""];
                },
                afterShow: function (b) {
                  a(b);
                },
              });
        }
        function g() {
          var a = tinycolor(App.color.primary).lighten(15).toHexString(),
            b = tinycolor(App.color.primary).lighten(8).toHexString(),
            c =
              (tinycolor(App.color.primary).toHexString(),
              {
                ru: "14",
                us: "14",
                ca: "10",
                br: "10",
                au: "11",
                uk: "3",
                cn: "12",
              });
          $("#map-widget").vectorMap({
            map: "world_en",
            backgroundColor: null,
            color: a,
            hoverOpacity: 0.7,
            selectedColor: b,
            enableZoom: !0,
            showTooltip: !0,
            values: c,
            scaleColors: [a, b],
            normalizeFunction: "polynomial",
          });
        }
        a(), b(), c(), d(), e(), f(), g();
      }),
      App
    );
  })(App || {}),
  App = (function () {
    "use strict";
    return (
      (App.formEditable = function () {
        ($.fn.editable.defaults.mode = "popup"),
          $("#username").editable(),
          $("#firstname").editable({
            validate: function (a) {
              if ("" == $.trim(a)) return "This field is required";
            },
          }),
          $("#sex").editable({
            prepend: "not selected",
            source: [
              { value: 1, text: "Male" },
              { value: 2, text: "Female" },
            ],
            display: function (a, b) {
              var c = { "": "gray", 1: "green", 2: "blue" },
                d = $.grep(b, function (b) {
                  return b.value == a;
                });
              d.length
                ? $(this).text(d[0].text).css("color", c[a])
                : $(this).empty();
            },
          }),
          $("#group").editable({
            showbuttons: !1,
            source: [
              { value: 1, text: "Admin" },
              { value: 2, text: "Support" },
              { value: 3, text: "Operator" },
              { value: 4, text: "Customer" },
              { value: 5, text: "Service" },
            ],
          }),
          $("#status").editable({
            type: "select",
            title: "Select status",
            placement: "right",
            value: 2,
            source: [
              { value: 1, text: "status 1" },
              { value: 2, text: "status 2" },
              { value: 3, text: "status 3" },
            ],
          }),
          $("#dob").editable({
            format: "dd-mm-yyyy",
            viewformat: "dd/mm/yyyy",
            datepicker: { weekStart: 1 },
          }),
          $("#event").editable({
            placement: "right",
            combodate: { firstItem: "name" },
          }),
          $("#comments").editable({ showbuttons: "bottom" }),
          $("#state2").editable({
            value: "California",
            typeahead: {
              name: "state",
              local: [
                "Alabama",
                "Alaska",
                "Arizona",
                "Arkansas",
                "California",
                "Colorado",
                "Connecticut",
                "Delaware",
                "Florida",
                "Georgia",
                "Hawaii",
                "Idaho",
                "Illinois",
                "Indiana",
                "Iowa",
                "Kansas",
                "Kentucky",
                "Louisiana",
                "Maine",
                "Maryland",
                "Massachusetts",
                "Michigan",
                "Minnesota",
                "Mississippi",
                "Missouri",
                "Montana",
                "Nebraska",
                "Nevada",
                "New Hampshire",
                "New Jersey",
                "New Mexico",
                "New York",
                "North Dakota",
                "North Carolina",
                "Ohio",
                "Oklahoma",
                "Oregon",
                "Pennsylvania",
                "Rhode Island",
                "South Carolina",
                "South Dakota",
                "Tennessee",
                "Texas",
                "Utah",
                "Vermont",
                "Virginia",
                "Washington",
                "West Virginia",
                "Wisconsin",
                "Wyoming",
              ],
            },
          }),
          $("#fruits").editable({
            pk: 1,
            limit: 3,
            source: [
              { value: 1, text: "banana" },
              { value: 2, text: "peach" },
              { value: 3, text: "apple" },
              { value: 4, text: "watermelon" },
              { value: 5, text: "orange" },
            ],
          });
      }),
      App
    );
  })(App || {}),
  App = (function () {
    "use strict";
    return (
      (App.formElements = function () {
        function a(a, b) {
          $(".reportrange span").html(
            a.format("MMMM D, YYYY") + " - " + b.format("MMMM D, YYYY")
          );
        }
        $(".datetimepicker").datetimepicker({
          autoclose: !0,
          componentIcon: ".mdi.mdi-calendar",
          navIcons: {
            rightIcon: "mdi mdi-chevron-right",
            leftIcon: "mdi mdi-chevron-left",
          },
        }),
          $(".daterange").daterangepicker(),
          $(".datetimerange").daterangepicker({
            timePicker: !0,
            timePickerIncrement: 30,
            locale: { format: "MM/DD/YYYY h:mm A" },
          });
        var b = moment().subtract(29, "days"),
          c = moment();
        $(".reportrange").daterangepicker(
          {
            startDate: b,
            endDate: c,
            ranges: {
              Today: [moment(), moment()],
              Yesterday: [
                moment().subtract(1, "days"),
                moment().subtract(1, "days"),
              ],
              "Last 7 Days": [moment().subtract(6, "days"), moment()],
              "Last 30 Days": [moment().subtract(29, "days"), moment()],
              "This Month": [
                moment().startOf("month"),
                moment().endOf("month"),
              ],
              "Last Month": [
                moment().subtract(1, "month").startOf("month"),
                moment().subtract(1, "month").endOf("month"),
              ],
            },
          },
          a
        ),
          a(b, c),
          $(".select2").select2({ width: "100%" }),
          $(".tags").select2({ tags: !0, width: "100%" }),
          $(".bslider").bootstrapSlider(),
          $(".inputfile").each(function () {
            var a = $(this),
              b = a.next("label"),
              c = b.html();
            a.on("change", function (a) {
              var d = "";
              this.files && this.files.length > 1
                ? (d = (
                    this.getAttribute("data-multiple-caption") || ""
                  ).replace("{count}", this.files.length))
                : a.target.value && (d = a.target.value.split("\\").pop()),
                d ? b.find("span").html(d) : b.html(c);
            });
          });
      }),
      App
    );
  })(App || {}),
  App = (function () {
    "use strict";
    return (
      (App.masks = function () {
        $("[data-mask='date']").mask("99/99/9999"),
          $("[data-mask='phone']").mask("(999) 999-9999"),
          $("[data-mask='phone-ext']").mask("(999) 999-9999? x99999"),
          $("[data-mask='phone-int']").mask("+33 999 999 999"),
          $("[data-mask='taxid']").mask("99-9999999"),
          $("[data-mask='ssn']").mask("999-99-9999"),
          $("[data-mask='product-key']").mask("a*-999-a999"),
          $("[data-mask='percent']").mask("99%"),
          $("[data-mask='currency']").mask("$999,999,999.99");
      }),
      App
    );
  })(App || {}),
  App = (function () {
    "use strict";
    return (
      (App.formMultiselect = function () {
        $("#example1").multiselect(),
          $("#example2").multiselect(),
          $("#example3").multiselect({ buttonClass: "btn btn-link" }),
          $("#example4").multiselect({ buttonClass: "btn btn-default btn-sm" }),
          $("#example6").multiselect(),
          $("#example9").multiselect({
            onChange: function (a, b) {
              alert("Change event invoked!"), console.log(a);
            },
          });
        for (var a = 1; a <= 100; a++)
          $("#example11").append(
            '<option value="' + a + '">Options ' + a + "</option>"
          );
        $("#example11").multiselect({ maxHeight: 150 }),
          $("#example13").multiselect(),
          $("#example14").multiselect({
            buttonWidth: "500px",
            buttonText: function (a) {
              if (0 === a.length) return "None selected";
              var b = "";
              return (
                a.each(function () {
                  b += $(this).text() + ", ";
                }),
                b.substr(0, b.length - 2) + ' <b class="caret"></b>'
              );
            },
          }),
          $("#example16").multiselect({
            onChange: function (a, b) {
              b === !1 && $("#example16").multiselect("select", a.val());
            },
          }),
          $("#example19").multiselect(),
          $("#example20").multiselect({ selectedClass: null }),
          $("#example23").multiselect(),
          $("#example24").multiselect(),
          $("#example25").multiselect({ dropRight: !0, buttonWidth: "300px" }),
          $("#example27").multiselect({ includeSelectAllOption: !0 }),
          $("#example28").multiselect({ enableFiltering: !0, maxHeight: 150 }),
          $("#example32").multiselect(),
          $("#example39").multiselect({
            includeSelectAllOption: !0,
            enableCaseInsensitiveFiltering: !0,
          }),
          $("#example41").multiselect({ includeSelectAllOption: !0 }),
          $("#my-select").multiSelect(),
          $("#pre-selected-options").multiSelect(),
          $("#callbacks").multiSelect({
            afterSelect: function (a) {
              alert("Select value: " + a);
            },
            afterDeselect: function (a) {
              alert("Deselect value: " + a);
            },
          }),
          $("#optgroup").multiSelect({ selectableOptgroup: !0 }),
          $("#disabled-attribute").multiSelect(),
          $("#custom-headers").multiSelect({
            selectableHeader:
              "<div class='custom-header'>Selectable items</div>",
            selectionHeader: "<div class='custom-header'>Selection items</div>",
          }),
          $("#searchable").multiSelect({
            selectableHeader:
              "<input type='text' class='form-control search-input' autocomplete='off' placeholder='Search'>",
            selectionHeader:
              "<input type='text' class='form-control search-input' autocomplete='off' placeholder='Search'>",
            afterInit: function (a) {
              var b = this,
                c = b.$selectableUl.prev(),
                d = b.$selectionUl.prev(),
                e =
                  "#" +
                  b.$container.attr("id") +
                  " .ms-elem-selectable:not(.ms-selected)",
                f =
                  "#" +
                  b.$container.attr("id") +
                  " .ms-elem-selection.ms-selected";
              (b.qs1 = c.quicksearch(e).on("keydown", function (a) {
                if (40 === a.which) return b.$selectableUl.focus(), !1;
              })),
                (b.qs2 = d.quicksearch(f).on("keydown", function (a) {
                  if (40 == a.which) return b.$selectionUl.focus(), !1;
                }));
            },
            afterSelect: function () {
              this.qs1.cache(), this.qs2.cache();
            },
            afterDeselect: function () {
              this.qs1.cache(), this.qs2.cache();
            },
          });
      }),
      App
    );
  })(App || {}),
  App = (function () {
    "use strict";
    return (
      (App.wizard = function () {
        $(".wizard-ux").wizard(),
          $(".wizard-ux").on("changed.fu.wizard", function () {
            $(".bslider").slider();
          }),
          $(".wizard-next").click(function (a) {
            var b = $(this).data("wizard");
            $(b).wizard("next"), a.preventDefault();
          }),
          $(".wizard-previous").click(function (a) {
            var b = $(this).data("wizard");
            $(b).wizard("previous"), a.preventDefault();
          }),
          $(".select2").select2({ width: "100%" }),
          $(".tags").select2({ tags: !0, width: "100%" }),
          $("#credit_slider")
            .slider()
            .on("slide", function (a) {
              $("#credits").html("$" + a.value);
            }),
          $("#rate_slider")
            .slider()
            .on("slide", function (a) {
              $("#rate").html(a.value + "%");
            });
      }),
      App
    );
  })(App || {}),
  App = (function () {
    "use strict";
    return (
      (App.textEditors = function () {
        $("#editor1").summernote({ height: 300 }),
          $("#editor2").markdown({ buttonSize: "normal" });
      }),
      App
    );
  })(App || {}),
  App = (function () {
    "use strict";
    return (
      (App.IconsFilter = function () {
        $(".select2").select2({ width: "100%" });
        var a = [],
          b = $(".be-icons-list"),
          c = $(".icon-category", b),
          d = $(".input-search input", b),
          e = $("#icon-category", b);
        c.each(function (b, c) {
          $(".icon-class", c).each(function (b, d) {
            var e = { name: d.innerHTML, element: d, category: c };
            a.push(e);
          });
        }),
          d.on("keyup", function () {
            var d = [],
              f = $(this).val().toLowerCase();
            if (("all" == e.val() ? c.show() : $("#" + e.val()).show(), f)) {
              $(".icon-visible", c).removeClass("icon-visible");
              var g = $.grep(a, function (a, b) {
                var c = a.name.search(f) > -1;
                return c && d.indexOf(a.category) < 0 && d.push(a.category), c;
              });
              $.each(g, function (a, b) {
                $(b.element).parents(".col-xs-6").addClass("icon-visible");
              }),
                b.addClass("hide-icons"),
                c.not(d).hide().addClass("icon-category--hide-icons");
            } else b.removeClass("hide-icons");
          }),
          e.on("change", function () {
            var a = $(this).val();
            "all" == a ? c.show() : (c.hide(), $("#" + a).show());
          });
      }),
      App
    );
  })(App || {}),
  App = (function () {
    "use strict";
    return (
      (App.mailCompose = function () {
        $(".tags").select2({ tags: 0, width: "100%" }),
          $("#email-editor").summernote({ height: 200 });
      }),
      App
    );
  })(App || {}),
  App = (function () {
    "use strict";
    return (
      (App.mailInbox = function () {
        $(".be-select-all input").on("change", function () {
          var a = $(".email-list").find('input[type="checkbox"]');
          $(this).is(":checked")
            ? a.prop("checked", !0)
            : a.prop("checked", !1);
        });
      }),
      App
    );
  })(App || {}),
  App = (function () {
    "use strict";
    return (
      (App.mapsGoogle = function () {
        var a,
          b = {
            zoom: 14,
            center: new google.maps.LatLng(-33.877827, 151.188598),
            mapTypeId: google.maps.MapTypeId.ROADMAP,
          };
        a = new google.maps.Map(document.getElementById("map_one"), b);
        var c,
          b = {
            zoom: 14,
            center: new google.maps.LatLng(-33.877827, 151.188598),
            mapTypeId: google.maps.MapTypeId.HYBRID,
          };
        c = new google.maps.Map(document.getElementById("map_two"), b);
        var d,
          b = {
            zoom: 14,
            center: new google.maps.LatLng(-33.877827, 151.188598),
            mapTypeId: google.maps.MapTypeId.TERRAIN,
          };
        d = new google.maps.Map(document.getElementById("map_three"), b);
      }),
      App
    );
  })(App || {}),
  App = (function () {
    "use strict";
    return (
      (App.mapsVector = function () {
        var a = App.color.primary,
          b = App.color.success,
          c = App.color.danger,
          d = App.color.warning,
          e = App.color.success,
          f = App.color.primary,
          g = tinycolor(App.color.grey).lighten(5).toString(),
          h = App.color.danger;
        $("#usa-map").vectorMap({
          map: "us_merc_en",
          backgroundColor: "transparent",
          regionStyle: { initial: { fill: a }, hover: { "fill-opacity": 0.8 } },
        }),
          $("#france-map").vectorMap({
            map: "fr_merc_en",
            backgroundColor: "transparent",
            regionStyle: {
              initial: { fill: b },
              hover: { "fill-opacity": 0.8 },
            },
          }),
          $("#uk-map").vectorMap({
            map: "uk_mill_en",
            backgroundColor: "transparent",
            regionStyle: {
              initial: { fill: c },
              hover: { "fill-opacity": 0.8 },
            },
          }),
          $("#chicago-map").vectorMap({
            map: "us-il-chicago_mill_en",
            backgroundColor: "transparent",
            regionStyle: {
              initial: { fill: d },
              hover: { "fill-opacity": 0.8 },
            },
          }),
          $("#australia-map").vectorMap({
            map: "au_mill_en",
            backgroundColor: "transparent",
            regionStyle: {
              initial: { fill: e },
              hover: { "fill-opacity": 0.8 },
            },
          }),
          $("#india-map").vectorMap({
            map: "in_mill_en",
            backgroundColor: "transparent",
            regionStyle: {
              initial: { fill: f },
              hover: { "fill-opacity": 0.8 },
            },
          }),
          $("#vector-map").vectorMap({
            map: "map",
            backgroundColor: "transparent",
            regionStyle: {
              initial: {
                fill: g,
                "fill-opacity": 0.8,
                stroke: "none",
                "stroke-width": 0,
                "stroke-opacity": 1,
              },
              hover: { "fill-opacity": 0.8 },
            },
            markerStyle: { initial: { r: 10 } },
            markers: [
              {
                coords: [100, 100],
                name: "Marker 1",
                style: {
                  fill: "#acb1b6",
                  stroke: "#cfd5db",
                  "stroke-width": 3,
                },
              },
              {
                coords: [200, 200],
                name: "Marker 2",
                style: {
                  fill: "#acb1b6",
                  stroke: "#cfd5db",
                  "stroke-width": 3,
                },
              },
            ],
          }),
          $("#canada-map").vectorMap({
            map: "ca_lcc_en",
            backgroundColor: "transparent",
            regionStyle: {
              initial: { fill: h },
              hover: { "fill-opacity": 0.8 },
            },
          });
      }),
      App
    );
  })(App || {}),
  App = (function () {
    "use strict";
    return (
      (App.pageCalendar = function () {
        $("#external-events .fc-event").each(function () {
          $(this).data("event", { title: $.trim($(this).text()), stick: !0 }),
            $(this).draggable({ zIndex: 999, revert: !0, revertDuration: 0 });
        }),
          $("#calendar").fullCalendar({
            header: {
              left: "title",
              center: "",
              right: "month,agendaWeek,agendaDay, today, prev,next",
            },
            defaultDate: "2016-06-12",
            editable: !0,
            eventLimit: !0,
            droppable: !0,
            drop: function () {
              $("#drop-remove").is(":checked") && $(this).remove();
            },
            events: [
              { title: "All Day Event", start: "2016-06-01" },
              { title: "Long Event", start: "2016-06-07", end: "2016-06-10" },
              {
                id: 999,
                title: "Repeating Event",
                start: "2016-06-09T16:00:00",
              },
              {
                id: 999,
                title: "Repeating Event",
                start: "2016-06-16T16:00:00",
              },
              { title: "Conference", start: "2016-06-11", end: "2016-06-13" },
              {
                title: "Meeting",
                start: "2016-06-12T10:30:00",
                end: "2016-06-12T12:30:00",
              },
              { title: "Lunch", start: "2016-06-12T12:00:00" },
              { title: "Meeting", start: "2016-06-12T14:30:00" },
              { title: "Happy Hour", start: "2016-06-12T17:30:00" },
              { title: "Dinner", start: "2016-06-12T20:00:00" },
              { title: "Birthday Party", start: "2016-06-13T07:00:00" },
              {
                title: "Click for Google",
                url: "http://google.com/",
                start: "2016-06-28",
              },
            ],
          });
      }),
      App
    );
  })(App || {}),
  App = (function () {
    "use strict";
    return (
      (App.pageGallery = function () {
        var a = $(".gallery-container");
        a.masonry({ columnWidth: 0, itemSelector: ".item" }),
          $("#sidebar-collapse").click(function () {
            a.masonry();
          }),
          $(".image-zoom").magnificPopup({
            type: "image",
            mainClass: "mfp-with-zoom",
            zoom: {
              enabled: !0,
              duration: 300,
              easing: "ease-in-out",
              opener: function (a) {
                var b = $(a).parents("div.img");
                return b;
              },
            },
          }),
          a.masonry();
      }),
      App
    );
  })(App || {}),
  App = (function () {
    "use strict";
    return (
      (App.pageProfile = function () {
        function a() {
          var a = App.color.primary,
            b = tinycolor(App.color.primary).lighten(22).toString();
          $.plot(
            $("#bar-chart1"),
            [
              {
                data: [
                  [0, 7],
                  [1, 13],
                  [2, 17],
                  [3, 20],
                  [4, 26],
                  [5, 37],
                  [6, 35],
                  [7, 28],
                  [8, 38],
                  [9, 38],
                  [10, 32],
                  [11, 25],
                ],
                label: "Page Views",
              },
              {
                data: [
                  [0, 15],
                  [1, 10],
                  [2, 15],
                  [3, 25],
                  [4, 30],
                  [5, 29],
                  [6, 25],
                  [7, 33],
                  [8, 45],
                  [9, 43],
                  [10, 38],
                  [11, 36],
                ],
                label: "Unique Visitor",
              },
            ],
            {
              series: {
                bars: {
                  order: 2,
                  align: "center",
                  show: !0,
                  barWidth: 0.3,
                  lineWidth: 0.7,
                  fill: !0,
                  fillColor: { colors: [{ opacity: 1 }, { opacity: 1 }] },
                },
                shadowSize: 2,
              },
              legend: { show: !1 },
              grid: { show: !1 },
              colors: [a, b],
              xaxis: { ticks: 11, tickDecimals: 0 },
              yaxis: { ticks: 4, tickDecimals: 0 },
            }
          );
        }
        a();
      }),
      App
    );
  })(App || {}),
  App = (function () {
    "use strict";
    return (
      (App.dataTables = function () {
        $.extend(!0, $.fn.dataTable.defaults, {
          dom: "<'row be-datatable-header'<'col-sm-6'l><'col-sm-6'f>><'row be-datatable-body'<'col-sm-12'tr>><'row be-datatable-footer'<'col-sm-5'i><'col-sm-7'p>>",
        }),
          $("#table1").dataTable(),
          $("#table2").dataTable({
            pageLength: 6,
            dom: "<'row be-datatable-body'<'col-sm-12'tr>><'row be-datatable-footer'<'col-sm-5'i><'col-sm-7'p>>",
          }),
          $("#table3").dataTable({
            buttons: ["copy", "excel", "pdf", "print"],
            lengthMenu: [
              [6, 10, 25, 50, -1],
              [6, 10, 25, 50, "All"],
            ],
            dom: "<'row be-datatable-header'<'col-sm-6'l><'col-sm-6 text-right'B>><'row be-datatable-body'<'col-sm-12'tr>><'row be-datatable-footer'<'col-sm-5'i><'col-sm-7'p>>",
          });
      }),
      App
    );
  })(App || {}),
  App = (function () {
    "use strict";
    return (
      (App.uiNestableLists = function () {
        function a(a, b) {
          var c = $(a).nestable("serialize");
          $(b).html(window.JSON.stringify(c));
        }
        $(".dd").nestable(),
          a("#list1", "#out1"),
          a("#list2", "#out2"),
          $("#list1").on("change", function () {
            a("#list1", "#out1");
          }),
          $("#list2").on("change", function () {
            a("#list2", "#out2");
          });
      }),
      App
    );
  })(App || {}),
  App = (function () {
    "use strict";
    return (
      (App.uiNotifications = function () {
        $("#not-basic").click(function () {
          return (
            $.gritter.add({
              title: "Samantha new msg!",
              text: "You have a new Thomas message, let's checkout your inbox.",
              image:
                App.conf.assetsPath + "/" + App.conf.imgPath + "/avatar.png",
              time: "",
              class_name: "img-rounded",
            }),
            !1
          );
        }),
          $("#not-theme").click(function () {
            return (
              $.gritter.add({
                title: "Welcome home!",
                text: "You can start your day checking the new messages.",
                image:
                  App.conf.assetsPath + "/" + App.conf.imgPath + "/avatar5.png",
                class_name: "clean img-rounded",
                time: "",
              }),
              !1
            );
          }),
          $("#not-sticky").click(function () {
            return (
              $.gritter.add({
                title: "Sticky Note",
                text: "Your daily goal is 130 new code lines, don't forget to update your work.",
                image:
                  App.conf.assetsPath +
                  "/" +
                  App.conf.imgPath +
                  "/slack_logo.png",
                class_name: "clean",
                sticky: !0,
                time: "",
              }),
              !1
            );
          }),
          $("#not-text").click(function () {
            return (
              $.gritter.add({
                title: "Just Text",
                text: "This is a simple Gritter Notification. Etiam efficitur efficitur nisl eu dictum, nullam non orci elementum.",
                class_name: "clean",
                time: "",
              }),
              !1
            );
          }),
          $("#not-tr").click(function () {
            return (
              $.extend($.gritter.options, { position: "top-right" }),
              $.gritter.add({
                title: "Top Right",
                text: "This is a simple Gritter Notification. Etiam efficitur efficitur nisl eu dictum, nullam non orci elementum",
                class_name: "clean",
              }),
              !1
            );
          }),
          $("#not-tl").click(function () {
            return (
              $.extend($.gritter.options, { position: "top-left" }),
              $.gritter.add({
                title: "Top Left",
                text: "This is a simple Gritter Notification. Etiam efficitur efficitur nisl eu dictum, nullam non orci elementum",
                class_name: "clean",
              }),
              !1
            );
          }),
          $("#not-bl").click(function () {
            return (
              $.extend($.gritter.options, { position: "bottom-left" }),
              $.gritter.add({
                title: "Bottom Left",
                text: "This is a simple Gritter Notification. Etiam efficitur efficitur nisl eu dictum, nullam non orci elementum",
                class_name: "clean",
              }),
              !1
            );
          }),
          $("#not-br").click(function () {
            return (
              $.extend($.gritter.options, { position: "bottom-right" }),
              $.gritter.add({
                title: "Bottom Right",
                text: "This is a simple Gritter Notification. Etiam efficitur efficitur nisl eu dictum, nullam non orci elementum",
                class_name: "clean",
              }),
              !1
            );
          }),
          $("#not-facebook").click(function () {
            return (
              $.gritter.add({
                title: "You have comments!",
                text: "You can start your day checking the new messages.",
                image:
                  App.conf.assetsPath + "/" + App.conf.imgPath + "/fb-icon.png",
                class_name: "color facebook",
              }),
              !1
            );
          }),
          $("#not-twitter").click(function () {
            return (
              $.gritter.add({
                title: "You have new followers!",
                text: "You can start your day checking the new messages.",
                image:
                  App.conf.assetsPath + "/" + App.conf.imgPath + "/tw-icon.png",
                class_name: "color twitter",
              }),
              !1
            );
          }),
          $("#not-google-plus").click(function () {
            return (
              $.gritter.add({
                title: "You have new +1!",
                text: "You can start your day checking the new messages.",
                image:
                  App.conf.assetsPath + "/" + App.conf.imgPath + "/gp-icon.png",
                class_name: "color google-plus",
              }),
              !1
            );
          }),
          $("#not-dribbble").click(function () {
            return (
              $.gritter.add({
                title: "You have new comments!",
                text: "You can start your day checking the new comments.",
                image:
                  App.conf.assetsPath + "/" + App.conf.imgPath + "/db-icon.png",
                class_name: "color dribbble",
              }),
              !1
            );
          }),
          $("#not-flickr").click(function () {
            return (
              $.gritter.add({
                title: "You have new comments!",
                text: "You can start your day checking the new comments.",
                image:
                  App.conf.assetsPath + "/" + App.conf.imgPath + "/fl-icon.png",
                class_name: "color flickr",
              }),
              !1
            );
          }),
          $("#not-linkedin").click(function () {
            return (
              $.gritter.add({
                title: "You have new comments!",
                text: "You can start your day checking the new comments.",
                image:
                  App.conf.assetsPath + "/" + App.conf.imgPath + "/in-icon.png",
                class_name: "color linkedin",
              }),
              !1
            );
          }),
          $("#not-youtube").click(function () {
            return (
              $.gritter.add({
                title: "You have new comments!",
                text: "You can start your day checking the new comments.",
                image:
                  App.conf.assetsPath + "/" + App.conf.imgPath + "/yt-icon.png",
                class_name: "color youtube",
              }),
              !1
            );
          }),
          $("#not-pinterest").click(function () {
            return (
              $.gritter.add({
                title: "You have new comments!",
                text: "You can start your day checking the new comments.",
                image:
                  App.conf.assetsPath + "/" + App.conf.imgPath + "/pi-icon.png",
                class_name: "color pinterest",
              }),
              !1
            );
          }),
          $("#not-github").click(function () {
            return (
              $.gritter.add({
                title: "You have new forks!",
                text: "You can start your day checking the new comments.",
                image:
                  App.conf.assetsPath + "/" + App.conf.imgPath + "/gh-icon.png",
                class_name: "color github",
              }),
              !1
            );
          }),
          $("#not-tumblr").click(function () {
            return (
              $.gritter.add({
                title: "You have new comments!",
                text: "You can start your day checking the new comments.",
                image:
                  App.conf.assetsPath + "/" + App.conf.imgPath + "/tu-icon.png",
                class_name: "color tumblr",
              }),
              !1
            );
          }),
          $("#not-primary").click(function () {
            $.gritter.add({
              title: "Primary",
              text: "This is a simple Gritter Notification.",
              class_name: "color primary",
            });
          }),
          $("#not-success").click(function () {
            $.gritter.add({
              title: "Success",
              text: "This is a simple Gritter Notification.",
              class_name: "color success",
            });
          }),
          $("#not-warning").click(function () {
            $.gritter.add({
              title: "Warning",
              text: "This is a simple Gritter Notification.",
              class_name: "color warning",
            });
          }),
          $("#not-danger").click(function () {
            $.gritter.add({
              title: "Danger",
              text: "This is a simple Gritter Notification.",
              class_name: "color danger",
            });
          }),
          $("#not-dark").click(function () {
            $.gritter.add({
              title: "Dark Color",
              text: "This is a simple Gritter Notification.",
              class_name: "color dark",
            });
          });
      }),
      App
    );
  })(App || {});
