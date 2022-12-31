//=========================================
// File name: storage.js
//-----------------------------------------
// Project : QuizFaber 4.0.20
// Licence : GNU General Public License v3.0
// Author  : Luca Galli
// Email   : info@quizfaber.com
//-----------------------------------------
// Functions included in this file:
// - StoreValue()
// - StoreInt()
// - RetrieveString()
//=========================================

function GetStorage()
{
	var storage = null;

	try 
	{
		storage = window.localStorage; // store data for your entire website, permanently.
		// sessionStorage // store data on a temporary basis, for a single window (or tab). The data disappears when session ends i.e. when the user closes that window (or tab).
	}
	catch(err)
	{
	}
	return storage; 
}

//------------------------------------------
// Memorizza una stringa nello Web Storage (o dai cookie)
//------------------------------------------
function StoreValue(field_name, field_value)
{
	var webStorage = GetStorage();
	
    if (webStorage)
    {
        webStorage.setItem(field_name, field_value);
    }
    else
    {
        setSessionCookie(field_name, field_value);
    }
}

//------------------------------------------
// Legge una stringa dallo Web Storage (o dai cookie)
//------------------------------------------
function RetrieveString(field_name)
{
	var webStorage = GetStorage();
    var field_value;
	
    if (webStorage)
    {
        field_value = webStorage.getItem(field_name);
    }
    else
    {
        field_value = getCookie(field_name);
    }
    return field_value;
}

//------------------------------------------
//  Cancella una chiave dallo Web Storage (o dai cookie)
//------------------------------------------
function RemoveValue(field_name)
{
	var webStorage = GetStorage();
	
    if (webStorage)
    {
        webStorage.removeItem(field_name);
    }
    else
    {
        deleteCookie(field_name);
    }
}
