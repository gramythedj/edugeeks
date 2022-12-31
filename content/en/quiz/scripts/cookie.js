//=========================================
// File name: cookie.js
//-----------------------------------------
// Project : QuizFaber 4.0.20
// Licence : GNU General Public License v3.0
// Author  : Luca Galli
// Email   : info@quizfaber.com
//-----------------------------------------
// Functions included in this file:
// - setCookie()
// - getCookie()
// - setSessionCookie()
// - deleteCookie()
//=========================================

//----------------
// SALVA il cookie
//----------------
// Memorizza il cookie nel seguente formato:
//
// cookie_name=cookie_value; expires=time
//
// dove:
// - cookie_name   = "Qmake" + numero di versione
// - cookie_value  = titolo del quiz
// - time          = durata (in minuti)
// ---------------------------
function setCookie(cookie_name,cookie_value,minuti)
{
  var expdate= new Date();  // data di scadenza

  expdate.setTime(expdate.getTime()+(60000*minuti));

    document.cookie = cookie_name + "=" + escape(cookie_value) + "; expires=" + expdate.toGMTString() + "; samesite=strict";
}

//----------------
// SALVA il cookie che dura finchè il browser è aperto, ovvero durata di una sessione
//----------------
function setSessionCookie(cookie_name,cookie_value)
{
    document.cookie = cookie_name + "=" + escape(cookie_value) +"; samesite=strict";
}

//----------------
// SALVA un cookie temporaneo (con durata prestabilita)
//----------------
function setShortCookie(cookie_name, cookie_value, millisec)
{
    var expdate = new Date();  // data di scadenza

    expdate.setTime(expdate.getTime() + millisec);

    document.cookie = cookie_name + "=" + escape(cookie_value) + "; expires=" + expdate.toGMTString() + "; samesite=strict";
}

//-----------------
// CARICA il cookie
//-----------------
function getCookie(cookie_name)
{
    var nameEq = cookie_name + "=";
    var ca = document.cookie.split(";");
    for (var i = 0; i < ca.length; i++)
    {
        var c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEq) === 0) return unescape(c.substring(nameEq.length, c.length));
    }
    return "";  // lettura fallita
}

//-----------------
// ELIMINA il cookie
//-----------------
function deleteCookie(cookie_name) 
{
    document.cookie = cookie_name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT; samesite=strict';
}

//-----------------
// Remove cookie from session
//-----------------
function deleteSessionCookie(cookie_name)
{
    document.cookie = cookie_name + "=; samesite=strict";
}
