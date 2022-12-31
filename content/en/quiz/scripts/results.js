//=========================================
// File Name: results.js
// Functions for view quiz results
//-----------------------------------------
// Project : QuizFaber 4.0.20
// Licence : GNU General Public License v3.0
// Author  : Luca Galli
// Email   : info@quizfaber.com
//=========================================

function PageLoadResult()
{
	document.title = options.name;
	PrintTitleAndDescription();
	PrintStatusBar();
	PrintCopyrightMsg();
	RestoreQuiz();
	EndQuiz();
	var reportHtml = PrintReport();
	PrintFinalButtons();
	DisableRightClickMenu();
	closedFromBrowser = true;

	if (quiz.computeMarkErr !== 0)
	{
		PrintErrorComputeMark('R');
		deleteCookie("qmake.quiz");
	}
	else
	{
		if (options.needValuateQuiz && options.warnNeedRetake && options.allowRetakeQuiz && (quiz.mark <= options.upperMarkForRetake) && (quiz.numOfRetake < options.maxNumRetake))
		{
			PrintWarning("You have to retake the quiz because the mark is less than " + options.upperMarkForRetake, 'R');
		}

		if (options.needSaveQuiz) {
			quiz.questions = RemoveUndefinedQuestions();
			PostResults(reportHtml);
		}
		else {
			deleteCookie("qmake.quiz");
		}
	}
}

function PrintReport()
{
	var reportHtml = "";

	if (GetTypeOfSubstitution(quiz.mark) === QMAKE_VALUATION_WITH_LINK)
	{
		var url = GetLinkFromMark(quiz.mark);
		GoToPage(url);
	}
	else
	{
		if (options.needValuateQuiz)
		{
			PrintReportSummary();

			if (options.showFullReport)
			{
				PrintReportDetails();
			}
		}
		else
		{
			$('#idReportSummary').hide();
			PrintReportFinalMessage(options.msgForNoValuateQuiz);
        }
	}

	reportHtml += '<div id="idReport" class="container">' + $('#idReport').html() + '</div>';
	return reportHtml;
}

function PrintReportSummary()
{
	$('#idStartDate').text(DateToString(new Date(quiz.dateStartQuiz).getTime()));
	$('#idTimeElapsed').text(getTimeString(quiz.time));
	if (quiz.currentUser !== null) {
		if (quiz.currentUser.name !== '')
		{
			$('#idUserName').text(quiz.currentUser.name);
		}
		else
		{
			$('#idReportNameOrEmail').text('Email');
			$('#idUserName').text(quiz.currentUser.email);
		}
	}
	$('#idNumOfQuestions').text(options.numOfQuestions);

	if (options.needValuateQuiz)
	{
		// quiz with evaluation
		if (GetTypeOfSubstitution(quiz.mark) === QMAKE_VALUATION_REPLACE_RESULTS)
		{
			$('#idReportSummary').hide();
			PrintReportFinalMessage(GetRemFromMark(quiz.mark));
		}
		else
		{
			$('#idCorrectAnswers').text(quiz.nRight);
			$('#idWrongAnswers').text(quiz.nWrong);
			var nNotValuatedQuestions = options.numOfQuestions - quiz.nRight - quiz.nWrong;
			$('#idNotValuatedAnswers').text(nNotValuatedQuestions);
			$('#idFinalMark').text(GetFinalMark());
		}

		if (!options.allowRetakeQuiz)
		{
			$('#idReportNumRetake').hide();
		}
		else if (options.warnNeedRetake)
		{
			$('#idNumRetake').text(quiz.numOfRetake + " / " + options.maxNumRetake);
		}
		else
		{
			if (quiz.numOfRetake > 0)
			{
				$('#idNumRetake').text(quiz.numOfRetake);
			}
			else
			{
				$('#idReportNumRetake').hide();
			}
		}
	}
	else
	{
		// quiz with no evaluation
		$('#idReportNumOfQuestions').hide();
		$('#idReportCorrectAnswers').hide();
		$('#idReportWrongAnswers').hide();
		$('#idReportNotValuatedAnswers').hide();
		$('#idReportTimeElapsed').hide();
		$('#idReportFinalMark').hide();
		$('#idReportNumRetake').hide();
	}


}

function PrintReportFinalMessage(msg)
{
	$('#idReportFinalMessage').show();
	$('#idReportFinalMessage').html(msg);
}

function PrintReportDetails()
{
	var rootDiv = $('#divReportDetails');
	var textHtml = "";
	var colNum = 1;
	var qstNum;

	for (var i = 0; i < options.numOfQuestions; i++)  // quiz.questions.length
	{
		qstNum = quiz.ordineDomande[i] + 1;

		var question = quiz.questions[qstNum-1];

		if ((typeof question === 'undefined') || (question === null)) continue;

		if (colNum === 1)
		{
			textHtml += "<div class='row'>";
		}

		if (options.reportNumOfColumns === 1)
		{
			textHtml += "<div class='col-sm-12'>";
		}
		else if (options.reportNumOfColumns === 2) {
			textHtml += "<div class='col-sm-6'>";
		}
		else if (options.reportNumOfColumns === 3) {
			textHtml += "<div class='col-sm-4'>";
		}
		else if (options.reportNumOfColumns === 4) {
			textHtml += "<div class='col-sm-3'>";
		}
		else if (options.reportNumOfColumns === 5) {
			textHtml += "<div class='col-sm-2'>";
		}
		else if (options.reportNumOfColumns >= 6) {
			textHtml += "<div class='col-sm-1'>";
		}
		textHtml += PrintReportQuestionDetails(i+1,question);
		textHtml += "</div>"; 

		colNum++;
		if (colNum > options.reportNumOfColumns)
		{
			colNum = 1;
			textHtml += "</div>";
        }
	}
	rootDiv.html(textHtml);
	return textHtml;
}

function PrintReportQuestionDetails(qstNum,question)
{
	var htmlHeader, htmlQst, htmlAns;
	var textToDisplay;
	var textHtml = "";
	var resultMsg = "";

	textToDisplay = "" + qstNum + " / " + options.numOfQuestions;

	textHtml += "<div class='panel panel-primary'>";

	htmlHeader = "<div class='panel-heading'><b>question " + textToDisplay + "</b></div>";
	textHtml += htmlHeader;

	textHtml += "<div class='panel-body'>";

	if (options.showFullQstReport)
	{
		htmlQst = "<p><b>" + question.shortTextQuestion + "</b></p>";
		textHtml += htmlQst;
	}

	if (question.valid === 1) {
		resultMsg = "Correct answer";
	}
	else if (question.valid === -1) {
		resultMsg = "Wrong answer";
	}
	else if (question.valid === 2) {
		resultMsg = "Question not valuated";
	}
	else if (question.valid === 3) {
		resultMsg = "Partially correct answer";
	}
	textHtml += "<p><i>" + resultMsg + "</i></p>";

	if (question.valid === 3)
	{
		if (question.minScore === 0) {
			if (question.typeOfQuestion === QMAKE_MATCHING) {
				textHtml += "<p><i>Right sentences : " + question.nScore + "/" + question.maxScore + "</i></p>";
			}
			else {
				textHtml += "<p><i>Score : " + question.nScore + "/" + question.maxScore + "</i></p>";
			}
		}
		else {
			textHtml += "<p><i>Score : " + question.nScore + " [" + question.minScore + " , " + question.maxScore + "]</i></p>";
		}
	}

	for (var j = 0; j < question.answers.length; j++)
	{
		var answer = question.answers[j];

		htmlAns = PrintReportAnswerDetails(j+1, question.typeOfQuestion, answer);
		textHtml += htmlAns;
	}

	textHtml += "</div></div>";

	return textHtml;
}

function PrintReportAnswerDetails(numOfAns, typeOfQuestion, answer)
{
	var htmlAns = "";

	var imgHtml;
	var guessImg = "";

	if ((typeOfQuestion === QMAKE_MULTIANS) ||
		(typeOfQuestion === QMAKE_MULTIANS_WITH_POINT) ||
		(typeOfQuestion === QMAKE_BOOLEAN))
	{
		if (answer.choice === 0) {
			imgHtml = "<img class='small-icon-image' src='../images/square.png'>";
		}
		else if (answer.choice === 1) {
			imgHtml = "<img class='small-icon-image' src='../images/ok.png'>";
		}

		if (options.reportNotation === QMAKE_REPNOT_PT) {
			if (answer.isGuess) {
				guessImg = "<img class='small-icon-image' src='../images/smile.png'>";
			}
			else {
				guessImg = "<img class='small-icon-image' src='../images/ko.png'>";
			}
		}
		else if (options.reportNotation === QMAKE_REPNOT_SIMPLE)
		{
			if (answer.valuation > 0) {
				guessImg = "<img class='small-icon-image' src='../images/smile.png'>";
			}
			else {
				guessImg = "<img class='small-icon-image' src='../images/ko.png'>";
			}
		}

		htmlAns = "<p>" + guessImg + imgHtml;
		if (options.showFullAnsReport)
		{
			htmlAns +=  " " + answer.shortTextAnswer;
		}
		else
		{
			htmlAns += "Answer " + numOfAns;
		}
		htmlAns += "</p>";

		if (options.showFullRemReport)
		{
			htmlAns += "<p><i>" + answer.shortTextRemark + "</i></p>";
		}
	}
	else if (typeOfQuestion === QMAKE_OPENANS)
	{
		htmlAns = "<p>" + getTextToDisplay(answer.additionalText) + "</p>";
    }
	else if (typeOfQuestion === QMAKE_FILLGAP)
	{
		if (answer.isGuess)
		{
			guessImg = "<img class='small-icon-image' src='../images/smile.png'>";
			htmlAns = "<p>" + guessImg + answer.choice + "</p>";
		}
		else
		{
			var listOfCorrectGaps = "";
			for (k = 0; k < answer.valuation.length; k++) {
				var correctGap = answer.valuation[k].toString().trim();
				listOfCorrectGaps += (k===0?"":",") + correctGap;
			}
			guessImg = "<img class='small-icon-image' src='../images/ko.png'>";
			htmlAns = "<p>" + guessImg + "<strike>" + answer.choice + "</strike> => " + listOfCorrectGaps +  "</p>";
		}
		
	}
	else if (typeOfQuestion === QMAKE_MATCHING)
	{
		if (answer.isGuess)
		{
			guessImg = "<img class='small-icon-image' src='../images/smile.png'>";
			htmlAns = "<p>" + guessImg + answer.choice[0] + " - " + answer.valuation[0] + "</p>";
		}
		else
		{
			guessImg = "<img class='small-icon-image' src='../images/ko.png'>";
			htmlAns = "<p>" + guessImg + answer.choice[0] + " - <strike>" + answer.choice[1] + "</strike> => " + answer.valuation[0] + "</p>";
        }
    }
	return htmlAns;
}

function PrintFinalButtons()
{
	if (options.showPrintButton)
	{
		$('#idBtnPrint').show();
	}
	if (CanRetake())
	{
		$('#idBtnRepeat').show();
	}
	if (options.showLinkButton)
	{
		$('#idBtnLinkback').show();
	}
}

function PostResults(reportHtml)
{
	if ((options.saveQuizMode === QMAKE_SEND_NODEJS) || (options.saveQuizMode === QMAKE_SEND_NODEJS_LOCAL))
	{
		PostResultsNodeJS(reportHtml);
	}
	else if (options.saveQuizMode === QMAKE_SEND_WEBAPP)
	{
		PostResultsWebApp()
	}
}

function PostResultsNodeJS(reportHtml)
{
	var key = options.name + "/" + quiz.currentUser.email;

	$.ajax({
		url: options.saveQuizUrl + '/results',
		type: 'POST',
		data: { name: key, quiz: JSON.stringify(quiz), report: reportHtml },
		success: PostResultsSuccessCallback,
		error: PostResultsFailCallback
	});
}


function PostResultsWebApp()
{
	var webAppData = encodeURI(GetDataForWebApp());

	$.ajax({
		url: options.saveQuizUrl,
		type: 'POST',
		//type: 'GET',
		data: webAppData,
		contentType: "application/x-www-form-urlencoded",  
		//contentType: "text/plain;charset=utf-8",  
		success: PostResultsSuccessCallback,
		error: PostResultsFailCallback
	});
}

function PostResultsSuccessCallback()
{
	PrintSuccess('Quiz saved correctly', 'R');
	deleteCookie("qmake.quiz");
}

function PostResultsFailCallback(jqXHR, exception)
{
	var msg = '';
	deleteCookie("qmake.quiz");

	if (jqXHR.status === 0) {
		msg = 'Not connect. Verify Network.';
	} else if (jqXHR.status === 404) {
		msg = 'Requested page not found. [404]';
	} else if (jqXHR.status === 500) {
		msg = 'Internal Server Error [500].';
	} else if (exception === 'parsererror') {
		msg = 'Requested JSON parse failed.';
	} else if (exception === 'timeout') {
		msg = 'Time out error.';
	} else if (exception === 'abort') {
		msg = 'Ajax request aborted.';
	} else {
		msg = 'Uncaught Error.' + jqXHR.responseText;
	}
	PrintError('Unable to save quiz results : ' + msg, 'R');
}

function RemoveUndefinedQuestions() {

	var onlyValidQuestion = [];

	for (var i = 0; i < quiz.questions.length; i++)
	{
		qstNum = quiz.ordineDomande[i] + 1;
		var question = quiz.questions[qstNum - 1];

		if ((typeof question === 'undefined') || (question === null)) continue;
		onlyValidQuestion.push(question);
	}

	return onlyValidQuestion;
}

function GetDataForWebApp()
{
	var body = "";

	body += "vers=4";
	body += "&encrypt=0";
	body += "&title=" + encodeURIComponent(options.name);
	body += "&titleQuiz=" + encodeURIComponent(options.title);
	body += "&user=" + encodeURIComponent(quiz.currentUser.name);
	body += "&sendTime=" + DateToString(new Date(quiz.dateStartQuiz).getTime());
	body += "&nQuest=" + options.numOfQuestions;
	body += "&maxvoto=" + options.maxmark;
	body += "&timeout=" + options.maxtime;
	body += "&time=" + quiz.time;
	body += "&nc=" + quiz.nRight;
	body += "&ns=" + quiz.nWrong;
	var notValuatedQuests = options.numOfQuestions - quiz.nRight - quiz.nWrong;
	body += "&nr=" + notValuatedQuests;
	body += "&mark=" + quiz.mark;
	body += "&author=" + encodeURIComponent(options.author);
	body += "&argument=" + encodeURIComponent(options.argument);

	var qstIndex;
	//var qstNum;

	for (var i = 0; i < quiz.questions.length; i++)
	{
		//qstNum = quiz.ordineDomande[i] + 1;
		qstIndex = i + 1;

		//var question = quiz.questions[qstNum - 1];
		var question = quiz.questions[i];

		if ((typeof question === 'undefined') || (question === null)) continue;
	
		body += "&datastore" + qstIndex + "=" + question.typeOfQuestion + "," + question.shortTextQuestion;
		body += "&weight" + qstIndex + "=" + question.weight;
		body += "&risposta" + qstIndex + "=" + encodeURIComponent(GetListOfSelectedAnswers(question));
		body += "&score" + qstIndex + "=" + question.nScore + "," + question.maxScore;
	}

	return body;
}

function onPrintClick()
{
	window.print();
}

function onRepeatClick()
{
	var user = quiz.currentUser;
	var numRetake = quiz.numOfRetake;

	ClearQuiz();
	InitQuiz();

	quiz.currentUser = user; // preserve user information
	quiz.numOfRetake = numRetake + 1; // preserve retake number

	if (!options.isQuizAnonymous && options.needLogin) {
		// quiz with login : need to login again to get new session
		PostLogin(quiz.currentUser.email, quiz.currentUser.password);
	}
	else {
		GoFirstPage();
	}
}

function PostLogin(email, passhash) {
	$.ajax({
		url: options.saveQuizUrl + '/login',
		type: 'POST',
		data: { login: email, pwd: passhash },
		success: function (data) {
			var user = JSON.parse(data);
			quiz.currentUser = user;

			GoFirstPage();
		},
		complete: function (xhr, textStatus) {
			if (xhr.status === 401) {
				PrintError('User unauthorized', 'R');
			}
			else if (xhr.status === 404) {
				PrintError('User not found', 'R');
			}
			else if (xhr.status !== 200) {
				PrintError('Login error, http status = ' + xhr.status, 'R');
			}
		}
	});
}

function onExitClick()
{
	GoToPage(FINAL_PAGE_URL);
}