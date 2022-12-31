//=========================================
// File name: page_final.js
//-----------------------------------------
// Project : QuizFaber 4.0.20
// Licence : GNU General Public License v3.0
// Author  : Luca Galli
// Email   : info@quizfaber.com
//-----------------------------------------
// Functions included in this file:
// - ready()
// - on beforeunload
// - PrintHeader()
//=========================================

$(document).ready(function () {
	document.title = options.name;
	PrintTitleAndDescription();
	PrintStatusBar();
	PrintCopyrightMsg();
	RestoreQuiz();
	PrintHeader();
});

$(window).on("beforeunload", function () {
	ClearQuiz();
});

function PrintHeader() {
	if (quiz.isQuizCompleted) {
		$('#idHeaderLastPage').text('Quiz completed');
	}
	else if (quiz.isQuizAbandoned) {
		$('#idHeaderLastPage').text('Quiz abandoned');
	}
}