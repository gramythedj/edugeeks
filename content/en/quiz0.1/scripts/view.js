//=========================================
// File name: view.js
//-----------------------------------------
// Project : QuizFaber 4.0.20
// Licence : GNU General Public License v3.0
// Author  : Luca Galli
// Email   : info@quizfaber.com
//-----------------------------------------
// Main functions for display messages and status info
//=========================================

var currentPlayingAudio = "";

function RestoreSelection(question, questionIndex)
{
	if (question.typeOfQuestion === QMAKE_MULTIANS)          // risposte multiple del tipo r/w
	{
		if (question.isSingleAns) {
			RestoreSelectionSingleAns(question, questionIndex);
		}
		else {
			RestoreSelectionMultiAns(question, questionIndex);
		}
	}
	else if (question.typeOfQuestion === QMAKE_MULTIANS_WITH_POINT)   // risposte multiple a punteggio
		RestoreSelectionMultiAns(question, questionIndex);
	else if (question.typeOfQuestion === QMAKE_BOOLEAN)    // risposte booleane
		RestoreSelectionBoolAns(question, questionIndex);
	else if (question.typeOfQuestion === QMAKE_OPENANS)     // risposta aperta
		RestoreSelectionOpenAns(question, questionIndex);
	else if (question.typeOfQuestion === QMAKE_FILLGAP)     // fill-gap
		RestoreSelectionFillGap(question, questionIndex);
	else if (question.typeOfQuestion === QMAKE_MATCHING)     // risposta matching
		RestoreSelectionMatching(question, questionIndex);
}

function RestoreSelectionSingleAns(question, questionIndex)
{
	var i;

	for (i = 0; i < question.answers.length; i++)
	{
		var answer = question.answers[i];
		var radioId = '#idRadio' + questionIndex + "_" + i;
		$(radioId).prop('checked', (answer.choice === 1));
	}
}

function RestoreSelectionMultiAns(question, questionIndex)
{
	var i = 0;

	for (i = 0; i < question.answers.length; i++)
	{
		var answer = question.answers[i];
		var checkBoxId = '#idCheckbox' + questionIndex + "_" + i;
		$(checkBoxId).prop('checked', (answer.choice === 1));
	}
}

function RestoreSelectionOpenAns(question, questionIndex)
{
	var answer = question.answers[0];
	$("#comment" + questionIndex).val(answer.additionalText);
}

function RestoreSelectionBoolAns(question, questionIndex)
{
	var i = 0;
	for (i = 0; i < question.answers.length; i++)
	{
		var answer = question.answers[i];
		var radioId = '#idRadio' + questionIndex + "_" + i;
		var radioIdTrue = radioId + "_T";
		var radioIdFalse = radioId + "_F";
		$(radioIdTrue).prop('checked', (answer.choice === 1));
		$(radioIdFalse).prop('checked', (answer.choice === 0));
	}
}

function RestoreSelectionFillGap(question, questionIndex)
{
	var i = 0;
	for (i = 0; i < question.answers.length; i++)
	{
		var answer = question.answers[i];
		var inputId = '#idGap' + questionIndex + "_" + i;
		$(inputId).val(answer.choice);
	}
}

function RestoreSelectionMatching(question, questionIndex)
{
	var i = 0;
	for (i = 0; i < question.answers.length; i++)
	{
		var answer = question.answers[i];

		SetSelectedItemLeft("idDD" + questionIndex, i, answer.choice[0]);
		SetSelectedItemRight("idDD" + questionIndex, i, answer.choice[1]);
	}
}

function GetSingleAnswerChoice(questionIndex)
{
	var optname = "optradio" + questionIndex;
	var choice = $("input[name='" + optname + "']:checked").val();
	if (typeof choice === 'undefined') choice = 0;

	return choice;
}

function GetMultipleAnswerChoice(questionIndex, answerIndex)
{
	var checkboxName = '#idCheckbox' + questionIndex + "_" + answerIndex;
	var isChecked = $(checkboxName).is(':checked');
	return (isChecked ? 1 : 0);
}

function GetBooleanChoice(questionIndex, answerIndex)
{
	var radioId = "#idRadio" + questionIndex + "_" + answerIndex + "_T";
	return ($(radioId).is(':checked')) ? 1 : 0;
}

function IsBooleanChoiceSelected(questionIndex, answerIndex)
{
	var radioId_True = "#idRadio" + questionIndex + "_" + answerIndex + "_T";
	var radioId_False = "#idRadio" + questionIndex + "_" + answerIndex + "_F";
	return ($(radioId_True).is(':checked')) || ($(radioId_False).is(':checked'));
}

function PrintTitleAndDescription()
{
	$('#idQuizTitle').text(options.name);
	$('#idQuizDescription').text(options.title);

	if (options.hideTitleBar)
	{
		$('#idQuizHeader').hide();
	}

	if (options.includeProfile)
	{
		$('#idQuizProfile').show();
		$('#idAuthor').text(options.author);
		$('#idArgument').text(options.argument);
		$('#idCompany').text(options.company);
		$('#idDate').text(options.quiz_date);
	}
}

function PrintQuestionNumber()
{
	// numero di domanda corrente
	//var currQuestNum = quiz.ordineDomande[quiz.currentQuestionPage - 1] + 1;
	var currQuestNum = quiz.currentQuestionPage.toString();
	var textToDisplay = "" + currQuestNum + " / " + options.numOfQuestions;

	$('#idQuestionNumber').text(textToDisplay);
}

function ShowTopOfQuestion(questionIndex)
{
	var numQst = 0;
	var panelQst;

	if (options.questSlide)
	{
		// una domanda per pagina
		numQst = questionIndex+ 1;
	}
	else {
		// tutte le domande nella stessa pagina
		for (var i = 0; i < quiz.ordineDomande.length; i++)
		{
			if (quiz.ordineDomande[i] === questionIndex)
			{
				numQst = i + 1;
				break;
			}
		}
	}

	if (numQst > 0)
	{
		panelQst = document.getElementById("idPanel" + numQst);
		var heightPanel = panelQst.offsetHeight;

		if (heightPanel > window.innerHeight)
		{
			// se complessivamente la domanda (con tutte le sue risposte) occupa pi? spazio verticale dell'altezza della finestra del browser
			panelQst.scrollIntoView(true);

			if (!options.questSlide)
			{
				// nel caso di tutte le domande sulla stessa pagina : tiene conto dell'altezza barra superiore (header)
				var header = document.getElementById("idTopBar");
				var heightHeader = header.offsetHeight;
				window.scrollBy(0, -heightHeader);
			}
		}
	}
}

function ShowHidePrevNextButton()
{
	if (options.questSlide)
	{
		if (quiz.currentQuestionPage === 1)
		{
			$('#idLinkPrev').hide();
		}
	}
}

function PrintStatusBar()
{
	if (options.hideStatusBar)
	{
		$('#idQuizFooter').hide();
	}
}

function PrintIntroEpilogueText()
{
	if (!options.questSlide)
	{
		if (options.hasIntroText)
		{
			$('#idSectionTextIntro').show();
		}
		if (options.hasEpilogueText)
		{
			$('#idSectionTextEpilogue').show();
		}
	}
	else
	{
		if (quiz.currentQuestionPage === 1)
		{
			if (options.hasIntroText)
			{
				$('#idSectionTextIntro').show();
			}
		}
		else if (quiz.currentQuestionPage === options.numOfQuestions)
		{
			if (options.hasEpilogueText)
			{
				$('#idSectionTextEpilogue').show();
			}
		}
	}
}

function PrintFeedback(question, questionIndex)
{
	var divToShow = '';
	var audioToPlay = '';

	if (!options.silentBeforeEndQuiz && options.needValuateQuiz)
	{
		if (question.valid === 1)
		{
			divToShow = '#divSuccess' + questionIndex;
			audioToPlay = '#idCorrectAnswerSound';
		}
		else if (question.valid === -1)
		{
			divToShow = '#divFail' + questionIndex;
			audioToPlay = '#idWrongAnswerSound';
		}
		else if (question.valid === 2)
		{
			divToShow = '#divInfo' + questionIndex;
			audioToPlay = '';
		}
		else if (question.valid === 3)
		{
			if (question.nScore === question.maxScore)
			{
				divToShow = '#divSuccess' + questionIndex;
				audioToPlay = '#idCorrectAnswerSound';
			}
			else if (question.nScore === question.minScore)
			{
				divToShow = '#divFail' + questionIndex;
				audioToPlay = '#idWrongAnswerSound';
			}
			else
			{
				divToShow = '#divPartiallyCorrect' + questionIndex;
				audioToPlay = '#idPartiallyCorrectAnswerSound';
			}
		}
	}
	else
	{
		// silent before end of quiz
		divToShow = '#divInfo' + questionIndex;
		audioToPlay = '';
	}

	if (divToShow !== '')
	{
		$(divToShow).show();
	}

	if ((audioToPlay !== '') && (options.playSounds))
	{
		if (currentPlayingAudio !== "") {
			$(currentPlayingAudio).trigger("pause");
		}
		currentPlayingAudio = audioToPlay
		$(audioToPlay).trigger("play");
	}
}

function HideFeedback(questionIndex)
{
	var divSuccess = '#divSuccess' + questionIndex;
	var divFail = '#divFail' + questionIndex;
	var divInfo = '#divInfo' + questionIndex;
	var divPartiallyCorrect = '#divPartiallyCorrect' + questionIndex;
	$(divSuccess).hide();
	$(divFail).hide();
	$(divInfo).hide();
	$(divPartiallyCorrect).hide();
}


function ShowHideHintsAndFeedbacks(question, questionIndex)
{
	var i = 0;
	for (i = 0; i < question.answers.length; i++)
	{
		if ($('#idHint' + questionIndex + "_" + i).length)
		{
			$('#idHint' + questionIndex + "_" + i).hide();
		}
		if (options.needValuateQuiz)
		{
			if ($('#idFeedbackAns' + questionIndex + "_" + i).length)
			{
				$('#idFeedbackAns' + questionIndex + "_" + i).show();
			}
		}
	}
	if (options.needValuateQuiz)
	{
		if ($('#divQuestionFeedback' + questionIndex).length)
		{
			$('#divQuestionFeedback' + questionIndex).show();
		}
	}
}


function PrintCountOfAnswers()
{
	var quizDone = CountAnswers();

	$('#idCorrectAnswers').text(quiz.nRight.toString());
	$('#idWrongAnswers').text(quiz.nWrong.toString());
	$('#idToBeAnswered').text(quiz.nToDo.toString());

	if (options.silentBeforeEndQuiz || !options.needValuateQuiz)
	{
		$('#idDivCorrectAnswer').hide();
		$('#idDivWrongAnswer').hide();
		$("#idDivToBeAnswered").removeClass("col-xs-3").removeClass("col-sm-2").addClass("col-sm-6").addClass("col-xs-9"); //.addClass("text-xs-left");
	}
	return quizDone;
}

function PrintRetireButton()
{
	if (options.allowAbandonFromQuiz)
	{
		$('#idBtnRetire').show();
	}
}

function ShowUniqueOkButton()
{
	if (!options.questSlide && options.uniqueOkButton)
	{
		if (options.uniqueOkButtonPos === "TOP")
		{
			$('#idVerifyPanelTop').show();
		}
		else
		{
			$('#idVerifyPanelBottom').show();
		}
	}
}

function HideUniqueOkButton()
{
	if (!options.questSlide && options.uniqueOkButton)
	{
		if (options.uniqueOkButtonPos === "TOP")
		{
			$('#idVerifyPanelTop').hide();
		}
		else
		{
			$('#idVerifyPanelBottom').hide();
		}
	}
}

function ShowQuizResultsButton()
{
	if (options.uniqueOkButtonPos === "TOP")
	{
		$('#idQuizResultsPanelTop').show();
	}
	else
	{
		$('#idQuizResultsPanelBottom').show();
	}
}

function ShowProgressBar()
{
	$('#idProgressBarTimeToAnswer').show();
}

function SetProgressBar(percent)
{
	$('#idProgressBarTimeToAnswer').attr('aria-valuenow', percent).css('width', percent + '%');
}

function PrintAnsweredToAllQuestions()
{
	$("#idModalNotificationCloseButton").click(function ()
	{
		if (!options.reviewQuizAtTheEnd || options.questSlide)
		{
			GoToPage(RESULT_PAGE_URL);
		}
		else
		{
			$('#idBtnRetire').hide();
			$('#idBtnGoToResults').show();
			if (options.askPrintAtTheEnd)
			{
				$('#idBtnPrintQuiz').show();
			}
		}
	});
	$('#idBtnRetire').hide();
	$('#idModalNotificationText').text('You have answered all of the questions');
	$('#idModalNotification').modal('show');
}

function PrintTimeOver()
{
	$("#idModalNotificationCloseButton").click(function ()
	{
		if (!options.reviewQuizAtTheEnd || options.questSlide)
		{
			GoToPage(RESULT_PAGE_URL);
		}
		else
		{
			$('#idBtnRetire').hide();
			$('#idBtnGoToResults').show();
		}
	});
	$('#idModalNotificationText').text('The time is over!');
	$('#idModalNotification').modal('show');
}

function PrintAskAbandonQuiz()
{
	$("#idModalConfirmationYesButton").click(function ()
	{
		quiz.isQuizAbandoned = true;
		if (options.valuateAfterAbandon)
			GoToPage(RESULT_PAGE_URL); 
		else
			GoToPage(FINAL_PAGE_URL);
	});
	$('#idModalConfirmationText').text('Are you sure?');
	$('#idModalConfirmation').modal('show');
}

function PrintRegistrationSuccess()
{
	$("#idModalNotificationCloseButton").click(function () {
		GoToPage(INITIAL_PAGE_URL);
	});
	$('#idModalNotificationText').text('The registration was successful');
	$('#idModalNotification').modal('show');
}

function PrintDoneBefore(questionIndex)
{
	PrintWarning('You have already answered the question', questionIndex);
}

function PrintQuestionTimeIsElapsed(questionIndex)
{
	PrintWarning('Time for answering this question is elapsed', questionIndex);
}

function PrintNeedToAnswer(questionIndex)
{
	PrintWarning('The answer is incompleted. Please, choose at least one answer', questionIndex);  // "Prima di proseguire devi rispondere alla domanda"
}

function PrintNeedToAnswerAllItem(questionIndex)
{
	PrintWarning('The answer is incompleted. Please, choose all the items', questionIndex);  // "Prima di proseguire devi rispondere al tutte le uscite"
}

function PrintNeedToAnswerCorrectly(questionIndex)
{
	PrintWarning('Before next step, you have to answer it correctly', questionIndex);  // "Prima di proseguire devi rispondere alla domanda in modo corretto"
}

function PrintWrongKeyword(questionIndex)
{
	PrintError('Unable to continue the quiz', questionIndex);
}

function PrintErrorComputeMark(questionIndex)
{
	PrintError('unable to compute final mark', questionIndex);
}

function PrintCopyrightMsg()
{
	var copyRightMsg = "This quiz was created ";
	if ((options.author !== null) && (options.author !== '')) {
		copyRightMsg += "by " + options.author + " ";
	}
	copyRightMsg += "with QuizFaber 4.0";

	$('#idCopyrightMsg').html("<I>" + copyRightMsg + "</I>");
}

function PrintWarning(msg, questionIndex)
{
	var divToShow = '#divWarning' + questionIndex;
	$('#idWarningMsg' + questionIndex).html(msg);
	$(divToShow).show();
}

function PrintError(msg, questionIndex)
{
	var divToShow = '#divError' + questionIndex;
	$('#idErrorMsg' + questionIndex).html(msg);
	$(divToShow).show();
}

function PrintSuccess(msg, questionIndex)
{
	var divToShow = '#divSuccess' + questionIndex;
	$('#idSuccessMsg' + questionIndex).html(msg);
	$(divToShow).show();
}

function PlayBackgroundSound()
{
	if (options.playSounds)
	{
		var audioToPlay = '#idBackgroundSound';
		$(audioToPlay).muted = false;
		$(audioToPlay).trigger("play");
	}
}

function PauseBackgroundSound()
{
	if (options.playSounds)
	{
		var audioToPlay = '#idBackgroundSound';
		$(audioToPlay).muted = false;
		$(audioToPlay).trigger("pause");
	}
}

//------------------------------------
// Rimescola l'ordine delle domande in modo casuale
//------------------------------------
function ShuffleQuestionsSamePage()
{
	var i;
	var idPanelQuest;
	var nQuest;
	var nNewQuest;

	var fromContent = [];
	fromContent.length = options.numOfQuestions;

	for (i = 0; i < options.numOfQuestions; i++)
	{
		nQuest = i + 1;
		idPanelQuest = "#idPanel" + nQuest;
		fromContent[i] = $(idPanelQuest).html();
	}

	for (i = 0; i < options.numOfQuestions; i++)
	{
		nQuest = i + 1;
		nNewQuest = quiz.ordineDomande[i] + 1;
		idPanelQuest = "#idPanel" + nQuest;
		
		newContent = fromContent[quiz.ordineDomande[i]];
		newContent = newContent.replace("<b>question " + nNewQuest + "</b>", "<b>question " + nQuest + "</b>")

		$(idPanelQuest).html(newContent);
	}
}