//=========================================
// File name: engine.js
// Functions for manage valuation of questions
// and compute final mark.
//-----------------------------------------
// Project : QuizFaber 4.0.20
// Licence : GNU General Public License v3.0
// Author  : Luca Galli
// Email   : info@quizfaber.com
//-----------------------------------------
// Functions included in this file:
// - AnsReport()
//
// - DoValuateQuestion()
// - DoValuateMultiAns()
// - DoValuateWithPoints()
// - DoValuateBoolAns()
// - DoValuateFillGap()
// - DoValuateMatching()
// - DoValuateOpenAns()
//
// - getGuessAns()
// - getGuessMatch()
// - getGuessMatchN()
// - getGuessFillGap()
// - getGuessFillGapN()
// - getScore()
//
// - CountAnswers()
// - ComputeMarks()
// - ComputeFinalMark()
//
// Not definited in this file:
// - CustomComputeFinalMark()
// - ConvertPointToMark()
//=========================================

// -----------------------------------
// Valuta la domanda n-esima
// -----------------------------------
function DoValuateQuestion(question)
{
	if (question.typeOfQuestion===QMAKE_MULTIANS)          // risposte multiple del tipo r/w
		DoValuateMultiAns(question);
	else if (question.typeOfQuestion===QMAKE_MULTIANS_WITH_POINT)   // risposte multiple a punteggio
		DoValuateMultiAnsWithPoints(question);
	else if (question.typeOfQuestion===QMAKE_BOOLEAN)    // risposte booleane
		DoValuateBoolAns(question);
	else if (question.typeOfQuestion===QMAKE_OPENANS)     // risposta aperta
		DoValuateOpenAns(question);
	else if (question.typeOfQuestion===QMAKE_FILLGAP)     // fill-gap
		DoValuateFillGap(question);
	else if (question.typeOfQuestion===QMAKE_MATCHING)     // risposta matching
		DoValuateMatching(question);
	else if (question.typeOfQuestion === QMAKE_CUSTOMQST)     // tipologia custom
		DoValuateCustom(question);

	question.alreadyAnswered = true;	
}

// -----------------------------------
// Valuta la domanda n-esima per risposte multiple R/W
// -----------------------------------
function DoValuateMultiAns(question)
{
	question.nScore = getGuessAns(question);
	question.maxScore = question.answers.length;
	question.minScore = 0;

	if (question.nScore === question.maxScore)
	{
		question.valid = 1; // correct answer
	}
	else 
	{
		question.valid = -1; // wrong answer
	}
}

// -----------------------------------
// Valuta la domanda n-esima per risposte multiple a punteggio
// -----------------------------------
function DoValuateMultiAnsWithPoints(question)
{
	question.nScore = getScore(question);
	question.maxScore = getMaxScore(question);
	question.minScore = getMinScore(question);
	question.valid = 3;
}

// -----------------------------------
// Valuta la domanda n-esima per risposte booleane
// -----------------------------------
function DoValuateBoolAns(question)
{
	question.nScore = getGuessAns(question);
	question.maxScore = question.answers.length;
	question.minScore = 0;
	
	if (question.nScore === question.maxScore)
	{
		question.valid = 1; // all correct answers
	}
	else if (question.nScore === 0)
	{
		question.valid = -1; // all wrong answers
	}
	else
	{
		question.valid = 3; // some correct and some wrong answers
	}
}

// -----------------------------------
// Valuta la domanda n-esima per risposte fill-gap
// -----------------------------------
function DoValuateFillGap(question)
{
	question.nScore = getGuessFillGap(question);
	question.maxScore = question.answers.length;
	question.minScore = 0;
  
	if (question.nScore === question.maxScore)
	{
		question.valid = 1; // all correct answers
	}
	else if (question.nScore === 0)
	{
		question.valid = -1; // all wrong answers
	}
	else
	{
		question.valid = 3; // some correct and some wrong answers
	}
}

// -----------------------------------
// Valuta la domanda n-esima per risposte matching
// -----------------------------------
function DoValuateMatching(question)
{
	question.nScore = getGuessMatch(question);
	question.maxScore = question.answers.length;
	question.minScore = 0;
  
	if (question.nScore === question.maxScore)
	{
		question.valid = 1; // all correct answers
	}
	else if (question.nScore === 0)
	{
		question.valid = -1; // all wrong answers
	}
	else
	{
		question.valid = 3; // some correct and some wrong answers
	}
}

// -----------------------------------
// Valuta la domanda n-esima per risposte custom
// -----------------------------------
function DoValuateCustom(question)
{
	question.nScore = question.answers[0].score;
	question.maxScore = question.answers[0].ansWeight;
	question.minScore = question.answers[0].noAnsWeight;

	if (question.nScore === question.maxScore) {
		question.valid = 1; // all correct answers
	}
	else if (question.nScore === 0) {
		question.valid = -1; // all wrong answers
	}
	else {
		question.valid = 3; // some correct and some wrong answers
	}
}

// -----------------------------------
// Valuta la domanda n-esima per risposte aperte
// -----------------------------------
function DoValuateOpenAns(question)
{
	question.nScore   = 0;
	question.maxScore = 0;
	question.minScore = 0;
	question.valid    = 2;
}


// -----------------------------------
// Stringa con elenco delle risposte selezionate
// -----------------------------------
function GetListOfSelectedAnswers(question)
{
	var j, msg = '';

	if (question.typeOfQuestion === QMAKE_OPENANS)
	{    
		return question.answers[0].additionalText;
	}

	for (j = 0; j < question.answers.length; j++)
	{
		choice = question.answers[j].choice;

		if ((question.typeOfQuestion === QMAKE_MULTIANS) ||          // risposte multiple del tipo r/w
			(question.typeOfQuestion === QMAKE_MULTIANS_WITH_POINT))          // risposte multiple a punteggio
		{       
			if (choice === 1)
			{
				if (msg !== '') msg += " ";
				msg += NumberToLetter(j);
			}
		}
		else if (question.typeOfQuestion === QMAKE_BOOLEAN) 
		{    
			if (msg !== '') msg += " ";
			if (choice === 1)
			{
				msg += 'TRUE';
			}
			else if (choice === 0)
			{
				msg += 'FALSE';
			}
		}
		else if (question.typeOfQuestion === QMAKE_FILLGAP) 
		{    
			if (msg !== '') msg += ",";
			msg += choice;
		}
		else if (question.typeOfQuestion === QMAKE_MATCHING) 
		{   
			if (msg !== '') msg += ", ";
			msg += choice[0] + "-" + choice[1];
		}
	}
	return msg;
}

// -----------------------------------
// Restituisce il numero di risposte indovinate
// -----------------------------------
function getGuessAns(question)
{
	var i,guess=0;

	for (i=0;i<question.answers.length;i++) 
	{
		var answer = question.answers[i];
		if (((answer.valuation>0)&&(answer.choice===1)) || ((answer.valuation<0)&&(answer.choice===0)))
		{
			answer.isGuess = true;
			guess++;
		}
	}
	return guess;
}


// -----------------------------------
// Restituisce il punteggio
// -----------------------------------
function getScore(question)
{
	var score = 0, nchoice = 0;

	for (var i = 0; i < question.answers.length; i++)
	{
		var answer = question.answers[i];
		answer.isGuess = false;

		if (answer.choice === 1)
		{
			score += answer.ansWeight;
			nchoice++;

			if (answer.ansWeight > answer.noAnsWeight) {
				answer.isGuess = true;
			}
		}
		else
		{
			score += answer.noAnsWeight;

			if (answer.noAnsWeight > answer.ansWeight) {
				answer.isGuess = true;
			}
		}
	}
	// nel caso l'allievo non risponde a nessuna risposta,
	// gli viene assegnato un punteggio predefinito
	//if (nchoice === 0)
	//{
	//	return omitPoint[n];
	//}

	return score;
}

function getMaxScore(question)
{
	var maxScore = 0;
	var weight;

	for (var i = 0; i < question.answers.length; i++)
	{
		var answer = question.answers[i];
		if (answer.ansWeight > answer.noAnsWeight)
			weight = answer.ansWeight;
		else
			weight = answer.noAnsWeight;

		maxScore += weight;
	}

	return maxScore;
}


function getMinScore(question)
{
	var minScore = 0;
	var weight;

	for (var i = 0; i < question.answers.length; i++)
	{
		var answer = question.answers[i];
		if (answer.ansWeight > answer.noAnsWeight)
			weight = answer.noAnsWeight;
		else
			weight = answer.ansWeight;

		minScore += weight;
	}

	return minScore;
}

// -----------------------------------
// Restituisce il numero di risposte indovinate
// -----------------------------------
function getGuessMatch(question)
{
	var i,guess=0;

	for (i = 0; i < question.answers.length; i++)
	{
		var answer = question.answers[i];

		answer.isGuess = false;
		if (getGuessMatchN(question.answers, answer, i))
		{
			answer.isGuess = true;
			guess++;
		}
	}
	return guess;
}

// -----------------------------------
// Restituisce true se il m-esimo match
// della n-esima domanda (di tipo matching)
// e' esatta.
// -----------------------------------
// n = numero di domanda (da 0)
// m = numero di match
// Restituisce:
// 0  : sbagliata
// 1  : corretta
// -1 : doppione (quindi sbagliata)
// -----------------------------------
function getGuessMatchN(answers, currAnswer, indexAnswer)
{
	var i,j,value,choice;
	var str1,str2,str3;

	value = currAnswer.valuation;
	choice = currAnswer.choice;

	str1 = choice[0] + choice[1];

	for (i = 0; i < value.length; i++)
	{
		str2 = choice[0] + value[i];

		if (str1.toString().toLowerCase() === str2.toString().toLowerCase())
		{
			// verifica che non sia un doppione
			for (j = 0; j < answers.length; j++)
			{
				str3 = answers[j].choice[0] + answers[j].choice[1];
				if (str1.toString().toLowerCase() === str3.toString().toLowerCase())
				{
					if (j === indexAnswer)
					{
						return true; // non e' doppia
					}
					else {
						return false; // e' doppia
					}
				}
			}
		}
	}
	return false;
}

// -----------------------------------
// Restituisce il numero di risposte indovinate per domande fill-gap
// -----------------------------------
function getGuessFillGap(question)
{
	var i,guess=0;

	for (i = 0; i < question.answers.length; i++)
	{
		var answer = question.answers[i];

		if (getGuessFillGapN(answer))
		{
			answer.isGuess = true;
			guess++;
		}
	}
  
	return guess;
}

// -----------------------------------
// Restituisce true se il m-esimo gap
// della n-esima domanda (di tipo fill-gap)
// e' esatta.
// -----------------------------------
// Restituisce:
// false  : sbagliata
// true : corretta
// -----------------------------------
function getGuessFillGapN(answer)
{
	var i;
	var str1,str2;

	var choice = answer.choice;
	var valuation = answer.valuation;

	str1 = choice.toString().trim().toLowerCase();

	for (i = 0; i < valuation.length; i++)
	{
		str2 = valuation[i].toString().trim().toLowerCase();
		if (str1 === str2)
		{
			return true;
		}
	}
	return false;
}

//---------------
// CountAnswers
//---------------
// Conta risposte fatte, corrette, sbagliate
// Restituisce 1 se non esistono altre domande,
// 0 altrimenti.

function CountAnswers() 
{
	var ratio;
	var nexcl=0;
	
	quiz.nRight = 0;
	quiz.nWrong = 0;
	quiz.nToDo = options.numOfQuestions;
	
	for (var i=0;i<quiz.questions.length;i++) 
	{
		var question = quiz.questions[i];
		
		if ((typeof question === 'undefined')||(question === null)) continue;
			
		if (question.valid===1) 
		{
			quiz.nRight++;
		}
		else if (question.valid===-1) 
		{
			quiz.nWrong++;
		}
		else if (question.valid === 3) 
		{
			ratio = 100 * (question.nScore - question.minScore) / (question.maxScore - question.minScore);
			if (ratio>=60) quiz.nRight++;
			else quiz.nWrong++;
		}
		if (question.valid!==0) quiz.nToDo--;
		if ((question.valid===2)||(question.valid===4)) nexcl++;
	}

	if (options.questSlide && options.lockRightAns) 
	{
		if (quiz.nRight + nexcl === options.numOfQuestions) return true;
	}
	else 
	{
		if (quiz.nToDo===0) return true;
	}
	return false;
}


function IsQuestionCorrectlyAnswered(question)
{

	if (
		(question.valid === 1) || (question.valid === 2) || (question.valid === 4)
		|| ((question.valid === 3) && (question.nScore === question.maxScore))
	)
	{
		return true;
	}
	return false;
}

// ----------------------
// Calcola il voto finale
// ----------------------
// La funzione calcola il voto finale
// utilizzando la formula della media pesata
function ComputeMarks()
{
	var sommaPesi = 0;
	var sommatoria = 0;

	for (var i = 0; i < options.numOfQuestions; i++)   // quiz.questions.length
	{
		var question = quiz.questions[i];

		if ((typeof question === 'undefined') || (question === null))
		{
			sommaPesi += options.notValuatedQuestionsArray[i];
		}
		else
		{
			// *** calcola il denominatore ***
			// somma i pesi purche' non sia domanda non valutata (2) o eslusa (4)
			if ((question.valid !== 2) && (question.valid !== 4)) {
				sommaPesi += question.weight;
			}

			// calcola il numeratore:
			if (question.valid === 1) {
				sommatoria += question.weight;
			}
			else if (question.valid === 3) {
				sommatoria += question.weight * (question.nScore - question.minScore) / (question.maxScore - question.minScore);
			}
		}
	}

	if (sommaPesi !== 0) 
	{
		quiz.mark = ComputeFinalMark(sommatoria, sommaPesi);
	}
	else 
	{
		quiz.mark = options.minmark;
	}
}


function ComputeFinalMark(sommatoria, sommaPesi) 
{
    var votoReal = 0.0;
    var voto = 0;

	if (options.computeMarkFnType === QMAKE_COMPUTE_MARK_BASIC) 
    {
		if (options.roundmark === 1)
		{
			voto = options.minmark + Math.round(sommatoria * (options.maxmark - options.minmark) / sommaPesi);
		}
		else if (options.roundmark === 0) 
		{
			voto = options.minmark + sommatoria * (options.maxmark - options.minmark) / sommaPesi;
        }
        else 
		{
			votoReal = sommatoria * (options.maxmark - options.minmark) / sommaPesi;
			voto = options.minmark + Math.round(votoReal / options.roundmark) * options.roundmark;
        }
    }
	else if (options.computeMarkFnType === QMAKE_COMPUTE_MARK_PRECISE) 
    {
        if (sommaPesi >= 1)
			votoReal = ((((options.maxmark - options.minmark) + 1) / sommaPesi) * sommatoria) + options.minmark - 1;
        else
			votoReal = options.minmark;

		if ((options.roundmark > 0) && (options.roundmark < 1))
			voto = Math.round(votoReal / options.roundmark) * options.roundmark;
        else
            voto = votoReal;
    }
	else if (options.computeMarkFnType === QMAKE_COMPUTE_MARK_CUSTOM) 
	{
        voto = CustomComputeFinalMark(sommatoria, sommaPesi);
    }
	else 
	{
		quiz.computeMarkErr = 1;
	}

    return voto;
}

function GetFinalMark()
{
	var tipo;
	var str = "";
	tipo = GetTypeOfSubstitution(quiz.mark);

	if (tipo === QMAKE_VALUATION_REPLACE_MARK)
	{
		// valuation replaces mark
		return GetRemFromMark(quiz.mark);
	}
	else
	{
		str += "" + quiz.mark + "/" + options.maxmark;

		if (options.markPercentage)
		{
			// mark in percentage
			var perc = Math.floor(quiz.mark * 100 / (options.maxmark - options.minmark));
			str += " ( " + perc + "% )";
		}

		if (tipo === QMAKE_VALUATION_NEAR_TO_MARK)
		{
			// valuation near to mark
			str += " - " + GetRemFromMark(quiz.mark);
		}
		return str;
	}
}

