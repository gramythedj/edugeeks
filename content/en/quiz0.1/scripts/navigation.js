//=========================================
// File Name: navigation.js
// Functions for questions and slides navigation
//-----------------------------------------
// Project : QuizFaber 4.0.20
// Licence : GNU General Public License v3.0
// Author  : Luca Galli
// Email   : info@quizfaber.com
//=========================================

const filename = 'page';
const fileExtension = 'html';
const PADDING_LEN = 5;

function pad (str, max) 
{
	str = str.toString();
	return str.length < max ? pad("0" + str, max) : str;
}

function GoToPage(url, newTab=false)
{
    closedFromBrowser = false;

    if (!newTab)
    {
        if (options.clearAlwaysHistory)
        {
            window.location.replace(url);
        }
        else
        {
            window.location.href = url;
        }
        //  The difference between href and replace, is that replace() removes the URL of the current document from the document history, meaning that it is not possible to use the "back" button to navigate back to the original document.
    }
    else
    {
        window.open(url, '_blank');
    }
}

function GoNextPage(urlPrefix = "./")
{
	var questionIndex = quiz.currentQuestionIndex;
    var question = quiz.questions[questionIndex];

    var alreadyAnswered = false;
	
	if (quiz.questions.length > questionIndex)
    {        
        if (typeof (question) !== "undefined" && question !== null)
        {
            alreadyAnswered = question.alreadyAnswered;
        }
	}
	
    if (options.verifyQuestBeforeNext && !alreadyAnswered)
    {
        PrintNeedToAnswer(questionIndex);
    }
    else if (options.lockRightAns && !IsQuestionCorrectlyAnswered(question))
    {
        PrintNeedToAnswerCorrectly(questionIndex);
    }
	else 
	{
		var page = urlPrefix + NextPage();
		GoToPage(page);
	}
}

function GoPreviousPage(urlPrefix = "./")
{
	var page = urlPrefix + PreviousPage();
	GoToPage(page);
}

function GoFirstPage(urlPrefix = "./")
{
    var page;
    if (options.questSlide)
    {
        page = urlPrefix + NextPage();
    }
    else
    {
        page = urlPrefix + "page.html";
    }
    GoToPage(page);
}


//------------------------------------
// Inizializza l'ordine delle domande 
//------------------------------------
function InitQuestionsOrder()
{
    for (quiz.ordineDomande = [], i = 0; i < options.numOfQuestions; ++i) quiz.ordineDomande[i] = i;

    if (options.randQuest)
    {
        quiz.ordineDomande = shuffle(quiz.ordineDomande);
    }
}

////////////////////////////////////////////
//       GESTIONE AVANZAMENTO DOMANDE     //
////////////////////////////////////////////

//------------------------------------
// Dato il numero di domanda, restituisce il nome del file della prima slide che la precede, o il nome del file della domanda stessa, se non ha slide antecedenti.
//------------------------------------
function GetInitialNextPageName(nextQuestNum)
{
    if (quiz.allSlidesIndex_before.length >= nextQuestNum)
    {
        if (quiz.allSlidesIndex_before[nextQuestNum - 1].length > 0)
        {
            var slideIndex = quiz.allSlidesIndex_before[nextQuestNum - 1][0];
            quiz.allSlidesIndex_before[nextQuestNum - 1].shift();
            return filename + "_S" + pad(slideIndex,PADDING_LEN) + "." + fileExtension;
        }  
    }
    quiz.isQstDisplayed[nextQuestNum - 1] = 1;
    return filename + "_" + pad(nextQuestNum,PADDING_LEN) + "." + fileExtension;
}

function GetInitialPrevPageName(prevQuestNum)
{
    if (quiz.allSlidesIndex_after.length >= prevQuestNum)
    {
        if (quiz.allSlidesIndex_after[prevQuestNum - 1].length > 0)
        {
			var lastIndex = quiz.allSlidesIndex_after[prevQuestNum - 1].length - 1;
            var slideIndex = quiz.allSlidesIndex_after[prevQuestNum - 1][lastIndex];
            quiz.allSlidesIndex_after[prevQuestNum - 1].pop();
            return filename + "_S" + pad(slideIndex,PADDING_LEN) + "." + fileExtension;
        }  
    }
    //quiz.isQstDisplayed[prevQuestNum - 1] = 0;
    return filename + "_" + pad(prevQuestNum,PADDING_LEN) + "." + fileExtension;
}

//------------------------------------
// Nel quiz con una domanda per pagina, restituisce il nome della pagina successiva, che sia una domanda o una slide
//------------------------------------
function NextPage()
{
    var currQuestNum;
    var nextQuestNum = -1;
    var slideIndex;

    // numero di domanda corrente
    currQuestNum = quiz.ordineDomande[quiz.currentQuestionPage - 1] + 1;

    ////
    if (quiz.ordineDomande.length > quiz.currentQuestionPage)
    {
        // numero della prossima domanda
        nextQuestNum = quiz.ordineDomande[quiz.currentQuestionPage] + 1;
    }
    /////

    if (quiz.allSlidesIndex_before.length >= currQuestNum)
    {
        if (quiz.allSlidesIndex_before[currQuestNum - 1].length > 0)
        {
            slideIndex = quiz.allSlidesIndex_before[currQuestNum - 1][0];
            quiz.allSlidesIndex_before[currQuestNum - 1].shift();
            return filename + "_S" + pad(slideIndex,PADDING_LEN) + "." + fileExtension;
        }
    }
    

    if (quiz.isQstDisplayed[currQuestNum-1] === 0)
    {
        // domanda non ancora visualizzata
        quiz.isQstDisplayed[currQuestNum - 1] = 1;
        return filename + "_" + pad(currQuestNum,PADDING_LEN) + "." + fileExtension;            
    }
   
    // domanda già visualizzata, ora tocca alle eventuali slide after

    if (quiz.allSlidesIndex_after.length >= currQuestNum)
    {
        if (quiz.allSlidesIndex_after[currQuestNum - 1].length > 0)
        {
            slideIndex = quiz.allSlidesIndex_after[currQuestNum - 1][0];
            quiz.allSlidesIndex_after[currQuestNum - 1].shift();
            return filename + "_S" + pad(slideIndex,PADDING_LEN) + "." + fileExtension;
        }

        // passa alla domanda successiva
		if (nextQuestNum !== -1)
		{
			quiz.currentQuestionPage++;
			return GetInitialNextPageName(nextQuestNum);
		}
		return RESULT_PAGE_URL;
    }
    return ""; // this line should not never be reached
}

function IsLastPage()
{
    var currQuestNum;
    var nextQuestNum = -1;

    // numero di domanda corrente
    currQuestNum = quiz.ordineDomande[quiz.currentQuestionPage - 1] + 1;

    ////
    if (quiz.ordineDomande.length > quiz.currentQuestionPage) {
        // numero della prossima domanda
        return false;
    }
    /////

    if (quiz.allSlidesIndex_before.length >= currQuestNum) {
        if (quiz.allSlidesIndex_before[currQuestNum - 1].length > 0) {
            return false;
        }
    }

    if (quiz.isQstDisplayed[currQuestNum - 1] === 0) {
        // domanda non ancora visualizzata
        return false;
    }

    // domanda già visualizzata, ora tocca alle eventuali slide after

    if (quiz.allSlidesIndex_after.length >= currQuestNum) {
        if (quiz.allSlidesIndex_after[currQuestNum - 1].length > 0) {
            return false;
        }
        // passa alla domanda successiva
        if (nextQuestNum !== -1) {
            return false;
        }
        return true;
    }
    return false; // this line should not never be reached
}

function PreviousPage()
{
	var currQuestNum;
    var prevQuestNum = -1;
    var slideIndex;

    // numero di domanda corrente
    currQuestNum = quiz.ordineDomande[quiz.currentQuestionPage - 1] + 1;

    ////
    if (quiz.ordineDomande.length > quiz.currentQuestionPage - 1)
    {
        // numero della precedente domanda
        prevQuestNum = quiz.ordineDomande[quiz.currentQuestionPage - 2] + 1;
    }
    /////
	
	/*if (quiz.allSlidesIndex_after.length >= currQuestNum)
    {
        if (quiz.allSlidesIndex_after[currQuestNum - 1].length > 0)
        {
			var lastIndex = quiz.allSlidesIndex_after[currQuestNum - 1].length - 1;
			slideIndex = quiz.allSlidesIndex_after[currQuestNum - 1][lastIndex];
			quiz.allSlidesIndex_after[currQuestNum - 1].pop();
			return filename + "_S" + pad(slideIndex,PADDING_LEN) + "." + fileExtension;
		}
	}*/
	// solo se ho after e gli ho finiti
	/*if (quiz.isQstDisplayed[currQuestNum-1] === 1)
    {
        // domanda già visualizzata
        quiz.isQstDisplayed[currQuestNum - 1] = 0;
        return filename + "_" + pad(currQuestNum,PADDING_LEN) + "." + fileExtension;            
    }*/
	quiz.isQstDisplayed[currQuestNum - 1] = 0; 
	
	// todo before
	// quando ho finito i before
	
	// passa alla domanda precedente
    quiz.currentQuestionPage--;
    return GetInitialPrevPageName(prevQuestNum);
}

//------------------------------------
// Nel quiz con una domanda per pagina, determina se è l'ultima slide visualizzata
//------------------------------------
function IsLastSlide()
{
    var currQuestNum;

    // numero di domanda corrente
    currQuestNum = quiz.ordineDomande[quiz.currentQuestionPage - 1] + 1;

    if (quiz.allSlidesIndex_before.length >= currQuestNum) {
        if (quiz.allSlidesIndex_before[currQuestNum - 1].length === 0) {
            if (quiz.allSlidesIndex_after.length >= currQuestNum) {
                if (quiz.allSlidesIndex_after[currQuestNum - 1].length === 0) {
                    if (quiz.isQstDisplayed[currQuestNum - 1] === 1)
                        return true;
                }
            }
        }
    }
    return false;
}
