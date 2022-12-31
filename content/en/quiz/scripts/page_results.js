//=========================================
// File name: page_results.js
//-----------------------------------------
// Project : QuizFaber 4.0.20
// Licence : GNU General Public License v3.0
// Author  : Luca Galli
// Email   : info@quizfaber.com
//-----------------------------------------
// Functions included in this file:
// - ready()
// - on beforeunload
// - GetTypeOfSubstitution() - code generated
// - GetRemFromMark() - code generated
// - GetLinkFromMark() - code generated
//=========================================

$(document).ready(function () {
	PageLoadResult();
});

$(window).on("beforeunload", function ()
{
	if (!closedFromBrowser) {
		PageUnloadIndex();
	}
	else {
		ClearQuiz();
	}
});

/* Code generated function */
function GetTypeOfSubstitution(aMark)
{
    return QMAKE_NO_VALUATION;

}


/* Code generated function */
function GetRemFromMark(aMark)
{
    return "";

}


/* Code generated function */
function GetLinkFromMark(aMark)
{
    return "";

}



