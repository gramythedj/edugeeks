//=========================================
// File name: matching.js
//-----------------------------------------
// Project : QuizFaber 4.0.20
// Licence : GNU General Public License v3.0
// Author  : Luca Galli
// Email   : info@quizfaber.com
//-----------------------------------------
// Functions included in this file:
// - ShuffleMatchingOrder()
// - CreateMatchingLists()
// - ManageMatchingEvents()
// - GetSelectedItemLeft()
// - GetSelextedItemRight()
//=========================================

const textSelect = "Select";

// ---------------------------------------------
// Genera una sequenza casuale di numeri interi
// compresi tra 0 e nPezzi-1.
// La sequenza e' memorizzata nel vettore vett
// ---------------------------------------------
function ShuffleMatchingOrder(nvett) 
{
    var i,count,n;
    var nuovoPezzo;

    // inizializza il vettore
    this.length=nvett;
    for (i = 0; i < nvett; i++)
    {
        this[i] = -1;
    }

    count=0;
    while (count < nvett)
    {
        n = rand(nvett);
        nuovoPezzo = 1;
        for (i = 0; i < count; i++)
        {
            if (this[i]===n)
            nuovoPezzo = 0;
        }
        if (nuovoPezzo === 1)
        {
            this[count]=n;
            count++;
        }
    }
}

// -------------------------------------
// Prepara il codice HTML per generare
// le n coppie di tag SELECT
// -------------------------------------
function CreateMatchingLists(listaLeft, listLeftHtml, listaRight, orderLeft, orderRight, dropdownIdPrefix, textSelect, hideLeftDropdown)
{
    var textHtml = "";
    var nMatching; // numero di coppia corrente
    var i;
    var idDropdownLeft;
    var idDropdownRight;
    var idBottonLeft;
    var idBottonRight;
    var attrDisabled;

    // per tutte le corrispondenze
    for (nMatching = 0; nMatching < listaLeft.length; nMatching++) 
    {
        idDropdownLeft = dropdownIdPrefix + "_Left_" + nMatching;
        idDropdownRight = dropdownIdPrefix + "_Right_" + nMatching;

        idBottonLeft = dropdownIdPrefix + "_btnLeft_" + nMatching;
        idBottonRight = dropdownIdPrefix + "_btnRight_" + nMatching;

        if (hideLeftDropdown) {
            textHtml += "<div class='row'>";
            textHtml += "<div class='col-sm-12 col-md-6'>"; // first column
        }

        // left list
        if (hideLeftDropdown)
        {
            textHtml += listLeftHtml[nMatching];

            textHtml += "<div class='dropdown' style='visibility: hidden; position:absolute;'>";
            textHtml += "<button id='" + idBottonLeft + "' class='btn btn-default dropdown-toggle dropdown-matching' type='button' data-toggle='dropdown'><i>" + textSelect + "</i><span class='caret'></span></button>";
            textHtml += "<ul ID='" + idDropdownLeft + "' class='dropdown-menu'>";

            for (i = 0; i < listaLeft.length; i++) {
                textHtml += "<li><a href='javascript:void(0);'>Match " + (nMatching + 1) + "</a></li>";
            }
            textHtml += "</ul>";
            textHtml += "</div>"; // dropdown
        }
        else {
            textHtml += "<div class='dropdown'>";
            textHtml += "<button id='" + idBottonLeft + "' class='btn btn-default dropdown-toggle dropdown-matching' type='button' data-toggle='dropdown'><i>" + textSelect + "</i><span class='caret'></span></button>";
            textHtml += "<ul ID='" + idDropdownLeft + "' class='dropdown-menu'>";

            for (i = 0; i < listaLeft.length; i++) {
                textHtml += "<li><a href='javascript:void(0);'>" + listaLeft[orderLeft[i]] + "</a></li>";
            }
            textHtml += "</ul>";
            textHtml += "</div>"; // dropdown
        }  
        /////////////

        if (hideLeftDropdown) {
            textHtml += "</div>"; // column
            textHtml += "<div class='col-sm-12 col-md-6'>"; // second column
        }
        else {
            textHtml += "<span style='width:10px;'></span>"; // separator
        }

        // right list
        textHtml +="<div class='dropdown'>";
        textHtml += "<button id='" + idBottonRight + "' class='btn btn-default dropdown-toggle dropdown-matching' type='button' data-toggle='dropdown'><i>" + textSelect + "</i><span class='caret'></span></button>";
        textHtml +="<ul ID='" + idDropdownRight + "' class='dropdown-menu'>";

        for (i = 0; i < listaRight.length; i++) 
        {
            textHtml += "<li><a href='javascript:void(0);'>" + listaRight[orderRight[i]] + "</a></li>";
        }
        textHtml +="</ul>";        
        textHtml +="</div>"; // dropdown
        //////////////////


        if (hideLeftDropdown) {
            textHtml += "</div>"; // column
            textHtml += "</div>"; // row
        }
        else {
            textHtml += "<br />";
        }

    }
    return textHtml;
}

function ManageMatchingEvents(listaLeft, dropdownIdPrefix, widthLeft, widthRight, lockLeftCol)
{
    var idDropdownLeft;
    var idDropdownRight;
    var idBottonLeft;
    var idBottonRight;
    
    for (var nMatching = 0; nMatching < listaLeft.length; nMatching++)
    {
        idDropdownLeft = dropdownIdPrefix + "_Left_" + nMatching;
        idDropdownRight = dropdownIdPrefix + "_Right_" + nMatching;

        idBottonLeft = dropdownIdPrefix + "_btnLeft_" + nMatching;
        idBottonRight = dropdownIdPrefix + "_btnRight_" + nMatching;

        $("#" + idBottonLeft).width(widthLeft);
        $("#" + idDropdownLeft).width(widthLeft);

        $("#" + idDropdownLeft).on('click', 'li a', { idBtn: idBottonLeft}, function (event) {

            $("#" + event.data.idBtn).html($(this).text() + "<span class='caret'></span>");
            $("#" + event.data.idBtn).val($(this).text());

        });

        $("#" + idBottonRight).width(widthRight);
        $("#" + idDropdownRight).width(widthRight);

        $("#" + idDropdownRight).on('click', 'li a', {idBtn: idBottonRight}, function (event) {

            $("#" + event.data.idBtn).html($(this).text() + "<span class='caret'></span>");
            $("#" + event.data.idBtn).val($(this).text());
        });

        if (lockLeftCol)
        {
            $("#" + idBottonLeft).addClass("disabled");
        }
    }
}

function GetSelectedItemLeft(dropdownIdPrefix, index)
{
    var idBottonLeft = dropdownIdPrefix + "_btnLeft_" + index;
    return $('#' + idBottonLeft).val();
}

function GetSelextedItemRight(dropdownIdPrefix, index)
{
    var idBottonRight = dropdownIdPrefix + "_btnRight_" + index;
    return $('#' + idBottonRight).val();
}


function SetSelectedItemLeft(dropdownIdPrefix, index, text)
{
    var idBottonLeft = dropdownIdPrefix + "_btnLeft_" + index;

    $("#" + idBottonLeft).html(text + "<span class='caret'></span>");
    $('#' + idBottonLeft).val(text);
}

function SetSelextedItemRight(dropdownIdPrefix, index, text)
{
    var idBottonRight = dropdownIdPrefix + "_btnRight_" + index;

    $("#" + idBottonRight).html(text + "<span class='caret'></span>");
    $('#' + idBottonRight).val(text);
}

function SetDefaultLeftColumn(listaLeft, dropdownIdPrefix, hideLeftDropdown)
{
    for (var nMatching = 0; nMatching < listaLeft.length; nMatching++)
    {
        if (hideLeftDropdown) {
            var itemName = "Match " + (nMatching + 1);
            SetSelectedItemLeft(dropdownIdPrefix, nMatching, itemName);
        }
        else {
            SetSelectedItemLeft(dropdownIdPrefix, nMatching, listaLeft[nMatching]);
        }
    }
}

function GetMaxSizeLeftColumn(listaLeft)
{
    var size, maxsize = 10;
    for (var nMatching = 0; nMatching < listaLeft.length; nMatching++)
    {
        size = listaLeft[nMatching].length;
        if (size > maxsize) maxsize = size;
    }
    return maxsize;
}

function GetMaxSizeRightColumn(listaRight)
{
    var size, maxsize = 10;
    for (var nMatching = 0; nMatching < listaRight.length; nMatching++)
    {
        size = listaRight[nMatching].length;
        if (size > maxsize) maxsize = size;
    }
    return maxsize;
}
