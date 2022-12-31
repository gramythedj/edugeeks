//=========================================
// File name: error.js
//-----------------------------------------
// Project : QuizFaber 4.0.20
// Licence : GNU General Public License v3.0
// Author  : Luca Galli
// Email   : info@quizfaber.com
//-----------------------------------------
// Functions included in this file:
// - onerror()
//=========================================

// do not use jquery to avoid errors bring from framework
window.onerror = function (msg)
{
    alert("An error occurred: " + msg + ". Please open your JavaScript debugger (F12) and report the red error message in 'Console' tab");
    return false;
}