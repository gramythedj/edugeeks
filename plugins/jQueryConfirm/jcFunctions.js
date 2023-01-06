function SuccessMessageCallBack(msg, callBack) {
  $.confirm({
    title: "Alert!",
    content: msg,
    type: "green",
    useBootstrap: false,
    boxWidth: "400px",
    backgroundDismiss: false,
    backgroundDismissAnimation: "shake",
    buttons: {
      ok: {
        btnClass: "btn-primary",
        action: callBack,
      },
    },
  });
}

function SuccessMessage(msg) {
  $.alert({
    title: "Alert!",
    content: msg,
    useBootstrap: false,
    boxWidth: "400px",
    type: "green",
    backgroundDismiss: false,
    backgroundDismissAnimation: "shake",
    buttons: {
      ok: {
        btnClass: "btn-primary",
      },
    },
  });
}

function ErrorMessage(msg) {
  $.alert({
    title: "Error!",
    content: msg,
    type: "red",
    useBootstrap: false,
    boxWidth: "400px",
    backgroundDismiss: false,
    backgroundDismissAnimation: "shake",
    buttons: {
      ok: {
        btnClass: "btn-primary",
      },
    },
  });
}

function ErrorMessageCallBack(msg, callBack) {
  $.confirm({
    title: "Error!",
    content: msg,
    type: "red",
    useBootstrap: false,
    boxWidth: "500px",
    backgroundDismiss: false,
    backgroundDismissAnimation: "shake",
    buttons: {
      ok: {
        btnClass: "btn-primary",
        action: callBack,
      },
    },
  });
}

function ConfirmCallBack(msg, callBack) {
  $.confirm({
    title: "Confirm!",
    content: msg,
    backgroundDismiss: false,
    boxWidth: "500px",
    useBootstrap: false,
    backgroundDismissAnimation: "shake",
    type: "gray",
    buttons: {
      yes: {
        btnClass: "btn-primary",
        action: callBack,
      },
      cancel: {
        btnClass: "btn-primary",
      },
    },
  });
}

function SuccessCallBackMedium(msg, callBack) {
  $.confirm({
    title: "Success!",
    content: msg,
    autoClose: "ok|8000",
    boxWidth: "500px",
    useBootstrap: false,

    type: "green",
    backgroundDismiss: false,
    backgroundDismissAnimation: "shake",
    buttons: {
      ok: {
        btnClass: "btn-primary",
        action: callBack,
      },
    },
  });
}

$(document).on("change", ".btn-upload-doc", function (e) {
  e.preventDefault();
  var btn = $(this);
  var id = btn.attr("data-id");
  var targetfile = $("#" + id + "File");
  if (targetfile.val() == "") {
    ErrorMessage("No File Choosen!!!");
    return false;
  }
  if (forminuse) {
    return false;
  }
  var oldText = btn.html();
  if (btn.hasClass("disabled")) {
    return false;
  }
  btn.text("Processing.....");
  btn.attr("disabled", true);
  btn.addClass("disabled");
  var fileUpload = targetfile.get(0);
  if (window.FormData == undefined) {
    return false;
  }
  var files = fileUpload.files;
  // Create FormData object
  var fileData = new FormData();
  // Looping over all files and add it to FormData object
  for (var i = 0; i < files.length; i++) {
    fileData.append(files[i].name, files[i]);
  }
  if (files.length == 0) {
    fileData.append(targetfile.val(), null);
  }
  fileData.append("id", id);
  forminuse = true;
  $.ajax({
    method: "POST",
    url: window.location.pathname + "/UploadDoc",
    data: fileData,
    async: false,
    cache: false,
    contentType: false, // Not to set any content header
    processData: false,
  })
    .done(function (data) {
      if (data["c"] == "success") {
        SuccessMessageCallBack(data["m"], function () {
          var i = $("#Go" + id);
          i.html(
            '<a style="width:auto" class="btn btn-success mt20" href="' +
              data["p"] +
              '" target="_blank"><i class="fa fa-download"></i> View File</a>'
          );
          $("#hdf" + id + "File").val(data["p"]);
        });
      } else if (data["c"] == "fileExtension") {
        ErrorMessageCallBack(data["m"], function () {
          btn.html(oldText);
          btn.removeAttr("disabled");
          btn.removeClass("disabled");
          targetfile.val("");
        });
      } else if (data["c"] == "sessionexpired") {
        ErrorMessageCallBack(data["m"], function () {});
      } else if (data["c"] == "servererror") {
        ErrorMessageCallBack(data["m"], function () {});
      } else if (data["c"] == "alreadyexist") {
        ErrorMessageCallBack(data["m"], function () {});
      }
      btn.html(oldText);
      btn.removeClass("disabled");
      btn.attr("disabled", false);
      forminuse = false;
    })
    .error(function () {
      ErrorMessage("Opps...! Something went wrong! Please Check File size.");
      btn.html(oldText);
      btn.removeClass("disabled");
      forminuse = false;
    });
});

function EDIUPLOADSingle(id, btn, Savefor, parm1, parm2, parm3) {
  var targetfile = $("#" + id + "File");
  if (targetfile.val() == "") {
    ErrorMessage("No File Choosen!!!");
    return false;
  }
  var oldText = btn.html();
  if (btn.hasClass("disabled")) {
    return false;
  }
  btn.text("Processing.....");
  btn.attr("disabled", true);
  btn.addClass("disabled");
  var fileUpload = targetfile.get(0);
  if (window.FormData == undefined) {
    return false;
  }
  var files = fileUpload.files;
  // Create FormData object
  var fileData = new FormData();
  // Looping over all files and add it to FormData object
  for (var i = 0; i < files.length; i++) {
    fileData.append(files[i].name, files[i]);
  }
  if (files.length == 0) {
    fileData.append(targetfile.val(), null);
  }
  fileData.append("id", id);
  fileData.append("Savefor", Savefor);
  fileData.append("parm1", parm1);
  fileData.append("parm2", parm2);
  fileData.append("parm3", parm3);
  forminuse = true;
  var result;
  $.ajax({
    method: "POST",
    url: window.location.pathname + "/UploadDoc",
    data: fileData,
    async: false,
    cache: false,
    contentType: false, // Not to set any content header
    processData: false,
  })
    .done(function (data) {
      if (data["c"] == "success") {
        result = data["_objUPLOAD"];
        SuccessMessageCallBack(data["m"], function () {
          var i = $("#Go" + id);
          i.html(
            '<a style="width:auto" class="btn btn-success" href="' +
              data["p"] +
              '" target="_blank"><i class="fa fa-download"></i> View File</a>'
          );
          $("#hdf" + id + "File").val(data["p"]);
        });
      } else if (data["c"] == "fileExtension") {
        ErrorMessageCallBack(data["m"], function () {
          btn.html(oldText);
          btn.removeAttr("disabled");
          btn.removeClass("disabled");
          targetfile.val("");
        });
      } else if (data["c"] == "sessionexpired") {
        ErrorMessageCallBack(data["m"], function () {});
      } else if (data["c"] == "servererror") {
        ErrorMessageCallBack(data["m"], function () {});
      } else if (data["c"] == "alreadyexist") {
        ErrorMessageCallBack(data["m"], function () {});
      }
      btn.html(oldText);
      btn.removeClass("disabled");
      btn.attr("disabled", false);
      forminuse = false;
    })
    .error(function () {
      ErrorMessage("Opps...! Something went wrong! Please Check File size.");
      btn.html(oldText);
      btn.removeClass("disabled");
      forminuse = false;
    });
  return result;
}
