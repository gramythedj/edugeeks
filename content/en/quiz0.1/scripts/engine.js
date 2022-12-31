//=========================================
// File name: engine.js
//-----------------------------------------
// Project : QuizFaber 4.0.20
// Licence : GNU General Public License v3.0
// Author  : Luca Galli
// Email   : info@quizfaber.com
//-----------------------------------------
// Main functions for managing quizzes
//=========================================

var quiz = null;

var closedFromBrowser;

function PageLoad(questionIndex, questionTime)
{
	RestoreQuiz();
	/*RestoreUser();
	RestoreRetake();
	RestoreQuestionsSortOrder();*/
	closedFromBrowser = true;
	
	if (!quiz.isQuizCompleted)
	{
		StartQuiz(questionIndex, questionTime);		
	}
	else
	{
		GoToPage(FINAL_PAGE_URL);
	}
}

function PageUnload()
{
	if (!closedFromBrowser) {
		StoreQuiz();
	}
	else {
		ClearQuiz();
	}
}

function PageUnloadIndex()
{
	if (!closedFromBrowser) {
		StoreQuiz(false);  // local storage
		StoreQuiz(true);   // cookie (per firefox)
	}
	else {
		// non dovrebbe essere necessario
		ClearQuiz();
	}
}

function InitQuiz()
{
	quiz = new Quiz(options.numOfQuestions, StartTime());
	InitQuestionsOrder();
}

function StartQuiz(qstIndex, qstTime)
{
	quiz.currentQuestionIndex = qstIndex;
	quiz.timeToAnswer = qstTime;

	if ((quiz.currentQuestionPage === 1) && (quiz.startTime === 0)) // note time==0 to avoid reload
	{
		StartQuizOnFirstPage();
	}
	else 
	{
		StartQuizOnPage();
	}
}

function StartQuizOnFirstPage()
{
	quiz.dateStartQuiz = new Date();
	quiz.startTime = StartTime();
	StartQuizOnPage();
}

function StartQuizOnPage()
{
	document.title = options.name;
	PrintTitleAndDescription();
	PrintStatusBar();
	StartTimer();
	PrintCountOfAnswers();
	PrintQuestionNumber();
	PrintRetireButton();
	ShowHidePrevNextButton();
	DisableRightClickMenu();
	PlayBackgroundSound();
	ShowUniqueOkButton();
	PrintIntroEpilogueText();

	if ((!options.questSlide) && options.randQuest)
	{
		ShuffleQuestionsSamePage();
	}

	var question = quiz.questions[quiz.currentQuestionIndex];

	if (typeof (question) !== "undefined" && question !== null)
	{
		if (question.alreadyAnswered)
		{
			RestoreSelection(question, quiz.currentQuestionIndex);
			PrintFeedback(question, quiz.currentQuestionIndex);
			ShowHideHintsAndFeedbacks(question, quiz.currentQuestionIndex);
		}
	}
	else if (options.questSlide)
	{
		if (quiz.timeToAnswer > 0)
		{
			ShowProgressBar();
			StartLocalTimerForQuest();
		}
		if (IsLastPage())
		{
			$('#idLinkNext').text('Finish');
		}
	}
}

function StartTimer()
{
	if (options.maxtime > 0)
	{
		oldtime = quiz.startTime;
		Timer();
	}
}

function StoreQuiz(useCookie = false)
{
	if (quiz !== null) 
	{
		var jsonStr = JSON.stringify(quiz);

		if (!useCookie) {
			StoreValue("qmake.quiz", jsonStr);
		}
		else {
			setSessionCookie("qmake.quiz", jsonStr);
		}
	}
}

function RestoreQuiz()
{
	var jsonStr;

	jsonStr = getCookie("qmake.quiz");
	if ((jsonStr !== '') && (jsonStr !== null)) {
		deleteSessionCookie("qmake.quiz");
	}

	if (jsonStr === '') {
		jsonStr = RetrieveString("qmake.quiz");
		RemoveValue("qmake.quiz");
	}

	if ((jsonStr !== '') && (jsonStr !== null))
	{
		quiz = JSON.parse(jsonStr);		
	}
	else 
	{
		InitQuiz();
	}
}

function ClearQuiz()
{
	quiz = null;
	RemoveValue("qmake.quiz");
	deleteCookie("qmake.quiz");
}


function EndQuiz()
{
	quiz.isQuizCompleted = true;

	var currentdate = new Date();
	quiz.dateCompleted = currentdate;
	quiz.dateCompletedStr = GetStringFromCurrentUtcDate();

	PauseBackgroundSound();
	ComputeFinalTime();

	if (options.needValuateQuiz)
	{
		ComputeMarks();
	}
}

function CanRetake()
{
	return options.needValuateQuiz && ((options.allowRetakeQuiz && !options.warnNeedRetake) || (options.warnNeedRetake && (quiz.numOfRetake < options.maxNumRetake) && (quiz.mark <= options.upperMarkForRetake)));
}

/////////////////////////////////////////////////////////

function onOkButtonClick(InitQuestion)
{
	var question;
	var questionIndex = quiz.currentQuestionIndex;

	if ((options.questSlide && options.lockRightAns) || options.allowChangeChoiceAlways)
	{
		// valutate the choice always, until the answer is correct or until the quiz ends
		question = InitQuestion();
		if (question.noChoice && (question.typeOfQuestion === QMAKE_BOOLEAN || question.typeOfQuestion === QMAKE_MATCHING)) {
			PrintNeedToAnswerAllItem(questionIndex);
			return;
		}
		if (question.noChoice && options.verifyAtLeastOneChoice) {
			PrintNeedToAnswer(questionIndex);
			return;
		}
		quiz.questions[questionIndex] = question;

		HideFeedback(questionIndex);
		ManageYourChoice(question, questionIndex);
	}
	else
	{
		// valutate the choice only the first time, otherwise prints that you have already answered to question
		question = quiz.questions[questionIndex];

		if (typeof (question) === "undefined" || question === null)
		{
			question = InitQuestion();
			if (question.noChoice && (question.typeOfQuestion === QMAKE_BOOLEAN || question.typeOfQuestion === QMAKE_MATCHING))
			{
				PrintNeedToAnswerAllItem(questionIndex);
				return;
			}
			if (question.noChoice && options.verifyAtLeastOneChoice)
			{
				PrintNeedToAnswer(questionIndex);
				return;
			}
			quiz.questions[questionIndex] = question;
		}

		if ((options.questSlide) && (quiz.timeToAnswer > 0))
		{
			StopLocalTimer();
		}

		if (question.alreadyAnswered)
		{
			PrintDoneBefore(questionIndex);
		}
		else
		{
			ManageYourChoice(question, questionIndex);
		}
	}	
}

function ManageYourChoice(question, questionIndex)
{
	$('#divWarning' + questionIndex).hide();
	$('#divError' + questionIndex).hide();

	DoValuateQuestion(question);
	PrintFeedback(question, questionIndex);
	var quizDone = PrintCountOfAnswers();
	ShowHideHintsAndFeedbacks(question, questionIndex);
	ShowTopOfQuestion(questionIndex);

	if (quizDone)
	{
		EndQuiz();

		if (!options.questSlide && !options.uniqueOkButton)
		{
			PrintAnsweredToAllQuestions();
		}
	}
}

function onVerifyButtonClick()
{
	var index;
	for (index = 0; index < allInitQuestionFunctions.length; ++index)
	{
		quiz.currentQuestionIndex = index;
		onOkButtonClick(allInitQuestionFunctions[index]);
	}
	HideUniqueOkButton();
	ShowQuizResultsButton();
}

function onQuizResultsButtonClick()
{
	GoToPage(RESULT_PAGE_URL);
}

function onAbandonButtonClick()
{
	PrintAskAbandonQuiz();
}

function onPrintQuizButtonClick()
{
	window.print();
}




