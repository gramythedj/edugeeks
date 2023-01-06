$(document).ready(function () {
  $('[data-toggle="tooltip"]').tooltip();
  $.fn.SetNumericOnly = function () {
    return this.each(function () {
      $(this).keydown(function (e) {
        var key = e.charCode || e.keyCode || 0;
        return (
          key == 8 ||
          key == 9 ||
          key == 13 ||
          key == 46 ||
          //key == 110 ||
          //key == 190 ||
          (key >= 35 && key <= 40) ||
          (key >= 48 && key <= 57) ||
          (key >= 96 && key <= 105) ||
          ((e.keyCode == 65 || e.keyCode == 86 || e.keyCode == 67) &&
            (e.ctrlKey === true || e.metaKey === true))
        );
        //if (e.shiftKey || e.ctrlKey || e.altKey) {
        //if (e.altKey) {
        //    e.preventDefault();
        //} else {
        //    var key = e.keyCode;

        //    var ctrlDown = false, ctrlKey = 17, cmdKey = 91, vKey = 86, cKey = 67;
        //    $(document).keydown(function (e) {
        //        if (e.keyCode == e.ctrlKey) ctrlDown = true;
        //    }).keyup(function (e) {
        //        if (e.keyCode == e.ctrlKey) ctrlDown = false;
        //    });
        //    if (ctrlDown && key == vKey) {
        //    }
        //    if (!((key == 8) || (key == 9) || (key == 46) || (key >= 35 && key <= 40) || (key >= 48 && key <= 57) || (key >= 96 && key <= 105))) {
        //        e.preventDefault();
        //    }
        //}
      });
    });
  };
  $.fn.SetDecimalOnly = function () {
    return this.each(function () {
      $(this).keydown(function (e) {
        var key = e.charCode || e.keyCode || 0;
        return (
          key == 8 ||
          key == 9 ||
          key == 13 ||
          key == 46 ||
          key == 110 ||
          key == 190 ||
          (key >= 35 && key <= 40) ||
          (key >= 48 && key <= 57) ||
          (key >= 96 && key <= 105)
        );
      });
    });
  };
  $.fn.SetAlphabetOnly = function () {
    return this.each(function () {
      $(this).keydown(function (e) {
        var key = e.charCode || e.keyCode || 0;
        return (
          key == 8 ||
          key == 9 ||
          key == 13 ||
          key == 46 ||
          key == 32 ||
          key == 37 ||
          key == 39 ||
          (key >= 65 && key <= 90) ||
          ((e.keyCode == 65 || e.keyCode == 86 || e.keyCode == 67) &&
            (e.ctrlKey === true || e.metaKey === true))
        );
      });
    });
  };
  $.fn.SetAlphaNumericOnly = function () {
    return this.each(function () {
      $(this).keydown(function (e) {
        var key = e.charCode || e.keyCode || 0;
        return (
          key == 8 || //backspace
          key == 32 || //(space)
          key == 46 || //delete
          key == 36 || //home
          key == 35 || //end
          key == 37 || //left arrow
          key == 39 || //right arrow
          key == 144 || //num lock
          key == 188 || //comma
          key == 189 || //dash
          key == 190 || //period
          //(0=48 .......9=57, a=65......z=90, numpad 0=97.....numpad 9=105)
          (key >= 48 && key <= 57) ||
          (key >= 65 && key <= 90) ||
          (key >= 97 && key <= 105) ||
          ((e.keyCode == 65 || e.keyCode == 86 || e.keyCode == 67) &&
            (e.ctrlKey === true || e.metaKey === true))
        );
      });
    });
  };

  $.fn.CheckAlphabetOnly = function () {
    return this.each(function () {
      $(this).blur(function (e) {
        var control = $(this);
        var str = control.val();
        var letters = /^[A-Za-z ]+$/;
        if (str.match(letters)) {
          return true;
        } else {
          swal("", "Please enter alphabets only", "error");
          setTimeout(function () {
            $(window).focus();
            control.focus();
          }, 1);
          return false;
        }
      });
    });
  };
  $.fn.CheckAlphaNumericOnly = function () {
    return this.each(function () {
      $(this).blur(function (e) {
        var control = $(this);
        var str = control.val();
        //var letters = /^([A-Z]){4}([0-9]){7}?$/;
        //var letters = /^([A-Z]){1}([-]){1}([0-9]){3,5}?$/;
        var letters = /^[A-Z0-9]+$/;
        if (str.match(letters)) {
          return true;
        } else {
          swal("", "Alphanumerics in capital only: [AXXXXXXXX67]", "error");
          //setTimeout(function () { $(window).focus(); control.focus() }, 1);
          return false;
        }
      });
    });
  };
});
