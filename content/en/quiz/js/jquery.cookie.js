! function (e)
{
    "function" == typeof define && define.amd ? define(["jquery"], e) : "object" == typeof exports ? e(require("jquery")) : e(jQuery)
}(function (e)
{
    var o = /\+/g;

    function n(e)
    {
        return r.raw ? e : encodeURIComponent(e)
    }

    function i(n, i)
    {
        var t = r.raw ? n : function (e)
        {
            0 === e.indexOf('"') && (e = e.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, "\\"));
            try
            {
                return e = decodeURIComponent(e.replace(o, " ")), r.json ? JSON.parse(e) : e
            }
            catch (e)
            {}
        }(n);
        return e.isFunction(i) ? i(t) : t
    }
    var r = e.cookie = function (o, t, c)
    {
        if (void 0 !== t && !e.isFunction(t))
        {
            if ("number" == typeof (c = e.extend(
                {}, r.defaults, c)).expires)
            {
                var u = c.expires,
                    a = c.expires = new Date;
                a.setTime(+a + 864e5 * u)
            }
            return document.cookie = [n(o), "=", (d = t, n(r.json ? JSON.stringify(d) : String(d))), c.expires ? "; expires=" + c.expires.toUTCString() : "", c.path ? "; path=" + c.path : "", c.domain ? "; domain=" + c.domain : "", c.secure ? "; secure" : ""].join("")
        }
        for (var d, f, p = o ? void 0 :
            {}, s = document.cookie ? document.cookie.split("; ") : [], m = 0, v = s.length; m < v; m++)
        {
            var x = s[m].split("="),
                k = (f = x.shift(), r.raw ? f : decodeURIComponent(f)),
                l = x.join("=");
            if (o && o === k)
            {
                p = i(l, t);
                break
            }
            o || void 0 === (l = i(l)) || (p[k] = l)
        }
        return p
    };
    r.defaults = {}, e.removeCookie = function (o, n)
    {
        return void 0 !== e.cookie(o) && (e.cookie(o, "", e.extend(
        {}, n,
        {
            expires: -1
        })), !e.cookie(o))
    }
});