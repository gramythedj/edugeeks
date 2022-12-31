//=========================================
// File name: time.js
//-----------------------------------------
// Project : QuizFaber 4.0.20
// Licence : GNU General Public License v3.0
// Author  : Luca Galli
// Email   : info@quizfaber.com
//-----------------------------------------
// Functions included in this file:
// - StartTime()
// - getTimeString()
// - Timer()
// - PauseTimer()
// - ResumeTimer()
// - RestartTimer()
//=========================================

var ctmnow=0;
var oldtime = 0;
var timerInPause = false;
var pauseTime;

// -----------------
// Inizializza Timer
// -----------------
// con questo valore viene valorizzata la variabile oldtime
function StartTime()
{
	var data,sec;

	data = new Date();
	sec = Math.floor(data.getTime()/1000);
	return sec;
}

// -----------------------
// Tempo totale trascorso
// -----------------------
// solo per i quiz senza tempo, altrimenti quiz.time è sempre aggiornato da Timer()
function ComputeFinalTime()
{
	if (options.maxtime === 0)
	{
		var nowTime = Math.floor(new Date().getTime()/1000);
		quiz.time =	nowTime - quiz.startTime;
	}
}

// -----------------------
// Tempo trascorso
// -----------------------
// Converte un intervallo di tempo (in secondi)
// in una stringa nel formato hh:mm:ss
function getTimeString(deltatime)
{
	var resto,h,m,s;
	var str;

	// converti tempo impiegato per rispondere nel formato hh:mm:ss
	h = Math.floor(deltatime/3600);
	resto = deltatime%3600;
	m = Math.floor(resto/60);
	s = resto%60;
	if (h<10) h='0'+h;
	if (m<10) m='0'+m;
	if (s<10) s='0'+s;

	str = h+":"+m+":"+s;
	return str;
}

// --------------------------
// TIMER: Conto alla rovescia
// --------------------------
function Timer()
{
	var i,delta;

	if (ctmnow) 
	{
		clearTimeout(ctmnow);
		ctmnow=0;
	}

	var cnewdt = new Date();
	var time   = Math.floor(cnewdt.getTime()/1000);
	delta = options.maxtime - (time-oldtime);
	quiz.time =	time-oldtime;

	// visualizza il tempo rimanente nell'orologio
	if ((!quiz.isQuizCompleted) && (oldtime !== time) && options.showTimeout)
	{
		SetClock(getTimeString(delta));
	}

	// ***** timeout *****
	if ((delta <= 0) && (!quiz.isQuizCompleted))
	{
		EndQuiz();
		PrintTimeOver();
	}
	else
	{
		if (!timerInPause)
		{
			// rischedula il timer
			ctmnow = setTimeout("Timer()", 1000);
		}
		else
		{
			// il timer non è più schedulato
			// pauseTime = time;         
		}
	}
}

// ------------------------------------------------------------------------
// Pausa nel TIMER
// ------------------------------------------------------------------------
// viene usato quanto il quiz è creato con le slide: durante le slide non
// scorre il tempo
// ------------------------------------------------------------------------
function PauseTimer() 
{
    timerInPause = true;

    if (!quiz.isQuizCompleted)
    {
        // tempo di inizio pausa
        var cnewdt = new Date();
        pauseTime = Math.floor(cnewdt.getTime() / 1000);
    }
}

// ------------------------------------------------------------------------
// Ripristina il TIMER
// ------------------------------------------------------------------------
// viene usato quanto il quiz è creato con le slide: durante le slide non
// scorre il tempo
// ------------------------------------------------------------------------
function ResumeTimer() 
{
    if (timerInPause) 
    {
        timerInPause = false;

        if ((oldtime > 0) && (!quiz.isQuizCompleted))
        {
            var cnewdt = new Date();
            var time = Math.floor(cnewdt.getTime() / 1000);
            oldtime = oldtime + (time - pauseTime);

            quiz.startTime = oldtime;
            Timer();
        }
    }    
}

// ------------------------------------------------------------------------
// Riavvia il TIMER
// ------------------------------------------------------------------------
// viene usato quanto il quiz è creato con una domanda per pagina
// dato che la pagina viene carica (e non ci sono frame di stato) occorre far
// ripartire il timer
// ------------------------------------------------------------------------
function RestartTimer()
{
	if (ctmnow) 
	{
		clearTimeout(ctmnow);
		ctmnow=0;
	}
	ctmnow=setTimeout("Timer()",1000);
}

function SetClock(timeStr) 
{
	$('#idClock').text(timeStr);
}




var qstTimer;
var localTimeout;
const DELTA_TIME_TO_ANSWER = 1000; // milliseconds
var enableLocalTimer = true;

function StartLocalTimerForQuest()
{
	localTimeout = quiz.timeToAnswer;
	qstTimer = setTimeout(CallbackLocalTimer, DELTA_TIME_TO_ANSWER);
}


function CallbackLocalTimer()
{
	localTimeout -= DELTA_TIME_TO_ANSWER;
	var percent = Math.round(localTimeout / quiz.timeToAnswer * 100);
	SetProgressBar(percent);
	
	if (localTimeout === 0)
	{
		PrintQuestionTimeIsElapsed(quiz.currentQuestionIndex);
		var idOkButton = "#idOkButton" + quiz.currentQuestionIndex
		$(idOkButton).click();
	}
	qstTimer = setTimeout(CallbackLocalTimer, DELTA_TIME_TO_ANSWER);
}

function PauseRestoreLocalTimer()
{
	if (enableLocalTimer)
	{
		enableLocalTimer = false;
		clearTimeout(qstTimer);
	}
	else
	{
		enableLocalTimer = true;
		CallbackLocalTimer();
	}
}

function StopLocalTimer()
{
	if (qstTimer)
	{
		enableLocalTimer = false;
		clearTimeout(qstTimer);
	}
}
