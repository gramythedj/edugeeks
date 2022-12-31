//=========================================
// File Name: utility.js
// Utility functions
//-----------------------------------------
// Project : QuizFaber 4.0.20
// Licence : GNU General Public License v3.0
// Author  : Luca Galli
// Email   : info@quizfaber.com
//=========================================

function rand(n)
{
    return Math.floor(Math.random() * n);
}

// --------------------------------------
// Restituisce la data odierna in stringa
// --------------------------------------
function DateToString(timestamp)
{
    var obj = new Date(timestamp);
    var mese;
    var strData = "";

    mese = obj.getMonth() + 1;

    strData += obj.getDate() + "/" + mese + "/" + obj.getFullYear();

    strData += " - ";
    if (obj.getHours() < 10)
        strData += "0" + obj.getHours();
    else
        strData += obj.getHours();
    strData += ":";

    if (obj.getMinutes() < 10)
        strData += "0" + obj.getMinutes();
    else
        strData += obj.getMinutes();
    strData += ":";

    if (obj.getSeconds() < 10)
        strData += "0" + obj.getSeconds();
    else
        strData += obj.getSeconds();

    return strData;
}

function DisableRightClickMenu()
{
    if (options.disableRightClickMenu)
    {
        document.addEventListener("contextmenu", function (e) { e.preventDefault(); }, false);
    }
}

function ValidateEmail(email)
{
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function GetStringFromCurrentUtcDate()
{
    var myDate = new Date();
    var month = myDate.getUTCMonth() + 1;
    return (myDate.getUTCFullYear() + "-" + month + "-" + myDate.getUTCDate() + " " + myDate.getUTCHours() + ":" + myDate.getUTCMinutes() + ":" + myDate.getUTCSeconds());
}

function GetStringFromCurrentDate()
{
    var currentdate = new Date();
    return GetStringFromDate(currentdate);
}

function GetStringFromDate(myDate)
{
    var month = myDate.getMonth() + 1;
    return (myDate.getFullYear() + "-" + month + "-" + myDate.getDate() + " " + myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds());
}

// -----------------------------------
// Riordina un array, dato 0,1,2... ritorna a caso 2,1,3...
// -----------------------------------
function shuffle(array)
{
    var tmp, current, top = array.length;
    if (top) while (--top)
    {
        current = Math.floor(Math.random() * (top + 1));
        tmp = array[current];
        array[current] = array[top];
        array[top] = tmp;
    }
    return array;
}

// -----------------------------------
// dato numero 0,1,2... ritorna A,B,C...
// -----------------------------------
// Se il numero supera il 25 (Z), viene
// costruita la stringa 1A, 1B, 1C, ...
function NumberToLetter(cc)
{
    var c, chr = 65;
    var a = 0, b = 0;

    if (cc <= 25) {
        chr += cc;
        c = unescape("%" + dec_to_hex(chr));
    }
    else {
        a = Math.floor(cc / 26);
        b = cc % 26;
        chr += b;
        c = unescape("%" + dec_to_hex(chr));
        c = "" + a + c;
    }
    return c;
}


// -----------------------------------
// CONVERSIONE Decimale -> Esadecimale
// -----------------------------------
function dec_to_hex(str_dec) {
    var H = 0, L = 0;
    var S = "";
    var dec = 0;

    dec = eval(str_dec);
    H = Math.floor(dec / 16);
    L = dec % 16;
    S += valore_hex(H);
    S += valore_hex(L);
    return S;
}

// ---------------------------
// converte una cifra dececimale -> esadecimale
// ---------------------------
function valore_hex(n) {
    if (n <= 9) return n;
    if (n == 10) return 'A';
    if (n == 11) return 'B';
    if (n == 12) return 'C';
    if (n == 13) return 'D';
    if (n == 14) return 'E';
    if (n == 15) return 'F';
}

// ---------------------------
// get a string which is not parsed as html
// ---------------------------
function getTextToDisplay(str)
{
    return str.replace(/&/g, "&amp;").replace(/>/g, "&gt;").replace(/</g, "&lt;").replace(/"/g, "&quot;").replace(/\n/g, "<br />");    
}