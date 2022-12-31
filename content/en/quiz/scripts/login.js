//=========================================
// File name: login.js
//-----------------------------------------
// Project : QuizFaber 4.0.20
// Licence : GNU General Public License v3.0
// Author  : Luca Galli
// Email   : info@quizfaber.com
//-----------------------------------------
// Functions for registration and login operations
//=========================================

function PageLoadIndex()
{
	DisableRightClickMenu();
	ClearQuiz();
	InitQuiz();
	closedFromBrowser = true;

	if (!options.isQuizAnonymous)
	{
		// quiz with login or only the student name 
		if (options.needLogin) {
			$('#idFieldName').hide();
		}
		else {
			$('#idFieldEmail').hide();
			$('#idFieldPassword').hide();
			$('#idRegistrationLink').hide();
		}
		PrintTitleAndDescription();
		PrintStatusBar();
		PrintCopyrightMsg();
	}
	else
	{
		// anonymous quiz
		quiz.currentUser = new Login(USER_LOGIN_ANONYMOUS, USER_EMAIL_ANONYMOUS, '', null);
		GoFirstPage('./pages/');
	}
}

function onRegistration()
{
	var name = "";  // build using 'identity' attribute
	var email = $('#email').val();
	var pwd = $('#pwd').val();
	var pwd2 = $('#pwd2').val();

	if ((!options.needSaveQuiz) || (options.saveQuizMode !== QMAKE_SEND_NODEJS && options.saveQuizMode !== QMAKE_SEND_NODEJS_LOCAL))
	{
		PrintError('The quiz was not created with the enabled option : saving on server', 'X');
		return;
	}

	var numOfOtherRegField = parseInt($('#numOtherRegistrationFields').val());

	var index;
	var isMandatory;
	var isIdentity;
	var otherFieldValue;
	var otherFieldName;
	var jsonText = "[";

	var missingMandatoryField = false;
	for (index = 1; index <= numOfOtherRegField; index++)
	{
		otherFieldValue = $('#otherField' + index.toString()).val();
		otherFieldName = $('#otherField' + index.toString()).attr('placeholder');

		if (jsonText !== "[") jsonText += ",";
		jsonText += "{";
		jsonText += "\"Name\" : \"" + otherFieldName.trim() + "\",";
		jsonText += "\"Value\" : \"" + otherFieldValue.trim() + "\"";
		jsonText += "}";

		// check if field is mandatory
		isMandatory = $('#isMandatoryOtherField' + index.toString()).val();
		if ((isMandatory === "true") && (otherFieldValue === ""))
		{
			missingMandatoryField = true;
		}

		// check if field is identity
		isIdentity = $('#isIdentityOtherField' + index.toString()).val();
		if (isIdentity === "true")
		{
			if (name !== "") name += " ";
			name += otherFieldValue;
		}
	}
	jsonText += "]";

	if (email === "" || pwd === "" || missingMandatoryField)
	{
		PrintWarning('All the fields with (*) are mandatory', 'X');
	}
	else if (!ValidateEmail(email))
	{
		PrintWarning('Not a valid email address', 'X');
    }
	else if (pwd !== pwd2)
	{
		PrintWarning('Password mismatch', 'X');
	}
	else
	{
		var passhash = CryptoJS.MD5(pwd).toString();
		var login = new Login(name, email, passhash, null);
		login.otherFields = JSON.parse(jsonText); 

		var loginJson = JSON.stringify(login);

		GetCheckLogin(email, loginJson);
	}
}

function GetCheckLogin(loginKey, loginData)
{
	$.ajax({
		url: options.saveQuizUrl + '/checklogin',
		type: 'GET',
		data: { login: loginKey },
		success: function (msg)
		{
			PrintError('User already registered', 'X');
		},
		complete: function (xhr, textStatus)
		{
			if (xhr.status === 404)
			{
				PostRegistration(loginData);
			}
			else if (xhr.status !== 200)
			{
				PrintError('Server error, http status = ' + xhr.status, 'X');
			}
		}
	});
}

function PostRegistration(loginData)
{
	$.ajax({
		url: options.saveQuizUrl + '/registration',
		type: 'POST',
		data: { login: loginData },
		success: function (msg) {
			PrintRegistrationSuccess();
		},
		error: function (msg) {
			PrintError('Registration error : ' + msg, 'X');
		}
	});
}

function onLogin()
{
	if (options.needLogin)
	{
		if ((!options.needSaveQuiz) || (options.saveQuizMode !== QMAKE_SEND_NODEJS && options.saveQuizMode !== QMAKE_SEND_NODEJS_LOCAL))
		{
			PrintError('The quiz was not created with the enabled option : saving on server', 'I');
			return;
		}

		var email = $('#email').val();
		var pwd = $('#pwd').val();
		var passhash = CryptoJS.MD5(pwd).toString();

		PostLogin(email, passhash);
	}
	else
	{
		var name = $('#name').val();
		if (name.length > 0)
		{
			quiz.dateStartQuiz = new Date();
			quiz.startTime = StartTime();
			quiz.currentUser = new Login(name, USER_EMAIL_ANONYMOUS, '', null);
			GoFirstPage('./pages/');
		}
		else
		{
			PrintError('The field name cannot be empty', 'I');
		}
	}
}

function PostLogin(email, passhash)
{
	$.ajax({
		url: options.saveQuizUrl + '/login',
		type: 'POST',
		data: { login: email, pwd: passhash },
		success: function (data)
		{
			var user = JSON.parse(data);
			quiz.currentUser = user;

			GetCheckQuiz(options.name, user.email);			
		},
		complete: function (xhr, textStatus)
		{
			if (xhr.status === 401) {
				PrintError('User unauthorized','I');
			}
			else if (xhr.status === 404) {
				PrintError('User not found', 'I');
			}
			else if (xhr.status !== 200){
				PrintError('Login error, http status = ' + xhr.status, 'I');
			}
		} 
	});
}

function GetCheckQuiz(quizname, email)
{
	$.ajax({
		url: options.saveQuizUrl + '/checkresult',
		type: 'GET',
		data: { name : quizname, login: email },
		success: function (data)
		{
			// quiz was taken at least one time
			var retakeInfo = JSON.parse(data);

			quiz.numOfRetake = parseInt(retakeInfo.NumOfRetake);
			quiz.mark = parseFloat(retakeInfo.FinalMark); // mark of the last quiz

			if (CanRetake())
			{
				quiz.numOfRetake++;
				quiz.dateStartQuiz = new Date();
				quiz.startTime = StartTime();
				GoFirstPage('./pages/');
			}
			else
			{
				PrintWarning('Quiz already taken', 'I');				
            }
		},
		complete: function (xhr, textStatus)
		{
			if (xhr.status === 404) // not found, quiz never taken
			{
				quiz.dateStartQuiz = new Date();
				quiz.startTime = StartTime();
				GoFirstPage('./pages/');
			}
			else if (xhr.status !== 200)
			{
				PrintError('Server error, http status = ' + xhr.status, 'I');
			}
		}
	});
}