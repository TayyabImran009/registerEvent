const eventAddBar = document.getElementById("eventAddBar");
const eventAddBtn = document.getElementById("eventAddBtn");

const fields = document.querySelectorAll("#fields");
const fieldsData = document.querySelectorAll("#fieldsData");
const createEventContentData = document.querySelectorAll(
  "#createEventContentData"
);

const calanderDiv = document.getElementById("calanderDiv");

const dropdownOption = document.querySelectorAll("#dropdownOption");

const inputDiv = document.getElementById("inputDiv");

dropDownDiv.style.display = "none";

for (let i = 0; i < dropdownOption.length; i++) {
  dropdownOption[i].addEventListener("click", function () {
    fields[6].value = dropdownOption[i].innerHTML;
    createEventContentData[6].style.display = "block";
    fieldsData[6].innerText = dropdownOption[i].innerHTML;
    eventAddBar.value = "";
    index = getFieldNumber();
    eventAddBar.placeholder = getNextValue(index);
    eventAddBar.focus();
  });
}

calanderDiv.style.display = "none";
eventAddBtn.addEventListener("click", function () {
  performTask();
  eventAddBar.focus();
});

eventAddBar.addEventListener("keydown", function (event) {
  if (event.keyCode === 13) {
    performTask();
    eventAddBar.focus();
  }
});

function performTask() {
  if (
    eventAddBar.value != "" &&
    eventAddBar.value.replace(/\s/g, "").length &&
    eventAddBar.placeholder != "Done"
  ) {
    let index = getFieldNumber();
    if (index == 4) {
      const createEventContentDataEmailArea = document.querySelector(
        ".createEventContentDataEmailArea"
      );
      const emails = eventAddBar.value.split(",");
      let output = "";
      for (let i = 0; i < emails.length; i++) {
        output +=
          "<div class='createEventContentDataEmail2' id='createEventContentData'><p id='fieldsData'>" +
          emails[i] +
          "</p><i class='fa fa-times' aria-hidden='true'  onclick=removeEmail()></i></div>";
      }
      createEventContentDataEmailArea.style.display = "block";
      createEventContentDataEmailArea.innerHTML = output;
      createEventContentData[index].style.display = "block";
      fields[index].value = eventAddBar.value;
    } else {
      if (index == 3) {
        fields[index].value = formatLength(eventAddBar.value);
        if (fields[index].value != "none") {
          createEventContentData[index].style.display = "block";
          fieldsData[index].innerText = fields[index].value;
        }
      } else if (index == 1) {
        returnDate = formatDate(eventAddBar.value);
        fDate = setDate(returnDate);
        fields[index].value = fDate;
        createEventContentData[index].style.display = "block";
        fieldsData[index].innerText = fields[index].value;
      } else if (index == 2) {
        if (eventAddBar.value.indexOf("-") > -1) {
          fields[index].value = formatTime(eventAddBar.value.split("-")[0]);
          createEventContentData[index].style.display = "block";
          fieldsData[index].innerText = fields[index].value;

          fields[index + 1].value = putTimeInHM(
            timeandlength(eventAddBar.value)
          );
          createEventContentData[index + 1].style.display = "block";
          fieldsData[index + 1].innerText = putTimeInHM(
            timeandlength(eventAddBar.value)
          );
        } else {
          fields[index].value = formatTime(eventAddBar.value);
          createEventContentData[index].style.display = "block";
          fieldsData[index].innerText = fields[index].value;
        }
      } else {
        fields[index].value = eventAddBar.value;
        createEventContentData[index].style.display = "block";
        fieldsData[index].innerText = eventAddBar.value;
      }
    }
    eventAddBar.value = "";
    index = getFieldNumber();
    eventAddBar.placeholder = getNextValue(index);
  }
}

function getFieldNumber() {
  for (let i = 0; i < fields.length; i++) {
    if (fields[i].value == "none") {
      return i;
    }
  }
}

function getNextValue(index) {
  if (index == 0) {
    calanderDiv.style.display = "none";
    dropDownDiv.style.display = "none";
    inputDiv.style.display = "block";
    return "Type event title";
  } else if (index == 1) {
    eventAddBar.type = "text";
    calanderDiv.style.display = "block";
    dropDownDiv.style.display = "none";
    inputDiv.style.display = "block";
    return "Enter Date";
  } else if (index == 2) {
    eventAddBar.type = "text";
    calanderDiv.style.display = "none";
    dropDownDiv.style.display = "none";
    inputDiv.style.display = "block";
    return "Enter Start Time";
  } else if (index == 3) {
    eventAddBar.type = "text";
    calanderDiv.style.display = "none";
    dropDownDiv.style.display = "none";
    inputDiv.style.display = "block";
    return "Enter Length";
  } else if (index == 4) {
    eventAddBar.type = "text";
    calanderDiv.style.display = "none";
    dropDownDiv.style.display = "none";
    inputDiv.style.display = "block";
    return "Enter Emails saprated by coma";
  } else if (index == 5) {
    eventAddBar.type = "text";
    calanderDiv.style.display = "none";
    dropDownDiv.style.display = "none";
    inputDiv.style.display = "block";
    return "Enter Location";
  } else if (index == 6) {
    eventAddBar.type = "text";
    calanderDiv.style.display = "none";
    dropDownDiv.style.display = "block";
    inputDiv.style.display = "none";
    return "Enter Calander to add";
  } else if (index == 7) {
    eventAddBar.type = "text";
    calanderDiv.style.display = "none";
    dropDownDiv.style.display = "none";
    inputDiv.style.display = "block";
    return "Enter Description";
  } else {
    eventAddBar.type = "text";
    calanderDiv.style.display = "none";
    dropDownDiv.style.display = "none";
    inputDiv.style.display = "block";
    return "Done";
  }
}

// ****************************************// remove field

const removeField = document.querySelectorAll("#removeField");

for (let i = 0; i < removeField.length; i++) {
  removeField[i].addEventListener("click", function () {
    removeField[i].closest("#createEventContentData").style.display = "none";
    removeField[i].nextElementSibling.value = "none";
    eventAddBar.placeholder = getRemovedValue(i);
    eventAddBar.focus();
  });
}

function getRemovedValue(index) {
  if (index == 0) {
    calanderDiv.style.display = "none";
    dropDownDiv.style.display = "none";
    inputDiv.style.display = "block";
    return "Type event title";
  } else if (index == 1) {
    calanderDiv.style.display = "block";
    dropDownDiv.style.display = "none";
    inputDiv.style.display = "block";
    return "Enter Date";
  } else if (index == 2) {
    calanderDiv.style.display = "none";
    dropDownDiv.style.display = "none";
    inputDiv.style.display = "block";
    return "Enter Start Time";
  } else if (index == 3) {
    calanderDiv.style.display = "none";
    dropDownDiv.style.display = "none";
    inputDiv.style.display = "block";
    return "Enter Length";
  } else if (index == 4) {
    calanderDiv.style.display = "none";
    dropDownDiv.style.display = "none";
    inputDiv.style.display = "block";
    return "Enter Location";
  } else if (index == 5) {
    calanderDiv.style.display = "none";
    dropDownDiv.style.display = "block";
    inputDiv.style.display = "none";
    return "Enter Calander to add";
  } else if (index == 6) {
    calanderDiv.style.display = "none";
    dropDownDiv.style.display = "none";
    inputDiv.style.display = "block";
    return "Enter Description";
  } else {
    calanderDiv.style.display = "none";
    dropDownDiv.style.display = "none";
    inputDiv.style.display = "block";
    return "Done";
  }
}
// **************************************** // remove email field

function removeEmail() {
  const emailField = document.querySelector(".emailField");
  eventAddBar.value = emailField.value;
  emailField.value = "none";
  document.querySelector(".createEventContentDataEmailArea").style.display =
    "none";
}

// **************************************** // ajax call

const submitData = document.getElementById("submitData");

submitData.addEventListener("click", function () {
  if (eventAddBar.placeholder == "Done") {
    const titleField = document.querySelector(".titleField");
    const dateField = document.querySelector(".dateField");
    const startTimeField = document.querySelector(".startTimeField");
    const lengthField = document.querySelector(".lengthField");
    const emailField = document.querySelector(".emailField");
    const locationField = document.querySelector(".locationField");
    const calenderField = document.querySelector(".calenderField");
    const descriptionField = document.querySelector(".descriptionField");

    var mydata = {
      title: titleField.value,
      date: dateField.value,
      startTime: startTimeField.value,
      length: lengthField.value,
      email: emailField.value,
      location: locationField.value,
      calender: calenderField.value,
      description: descriptionField.value,
    };
    saveEvent(mydata);
    document.getElementById("popupMessage").style.display = "block";

    for (let i = 0; i < fields.length; i++) {
      fields[i].value = "none";
    }

    eventAddBar.placeholder = "Type event title";

    for (let i = 0; i < createEventContentData.length; i++) {
      createEventContentData[i].style.display = "none";
    }

    document.querySelector(".createEventContentDataEmailArea").style.display =
      "none";

    window.scrollTo(0, 0);
  }
});

function saveEvent(mydata) {
  $.ajax({
    url: "/test/",
    method: "POST",
    data: mydata,
    success: function (data) {
      console.log(data);
    },
  });
}

// *************************************** formating Length
function formatLength(length) {
  nospace = length.replace(/ +/g, "");
  index = 0;
  onlyNum = "";
  for (let i = 0; nospace[i] != "h" && nospace[i] != "m"; i++) {
    onlyNum += nospace[i];
  }
  if (nospace.indexOf("m") > -1 || nospace.indexOf("M") > -1) {
    putTimeInHM(onlyNum);
    return putTimeInHM(onlyNum);
  }
  if (nospace.indexOf("h") > -1 || nospace.indexOf("H") > -1) {
    putTimeInHM(parseFloat(onlyNum) * 60);
    return putTimeInHM(parseFloat(onlyNum) * 60);
  } else {
    return "none";
  }
}

function putTimeInHM(time) {
  if (parseFloat(time) >= 60) {
    h2 = 0;
    min2 = 0;
    t2 = parseFloat(time);
    while (t2 >= 60) {
      h2 = h2 + 1;
      t2 = t2 - 60;
    }
    min2 = t2;
    if (min2 == 0) {
      return h2 + " hour";
    } else {
      return h2 + " hour " + min2 + " min";
    }
  } else {
    return time + " min";
  }
}

// *************************************** formating Time

function formatTime(time) {
  if (time.length > 3 && time.indexOf(":") > -1) {
    if (time.indexOf("am") > -1) {
      time = time.replace("am", "");
      time = time.replace(/ +/g, "");
    }

    if (time.indexOf("pm") > -1) {
      time = time.replace("pm", "");
      time = time.replace(/ +/g, "");
    }
    if (time.indexOf(":") > -1) {
      if (time.length == 4) {
        return time + "am";
      } else {
        timeHold = time[0] + time[1];
        if (parseInt(timeHold) < 13) {
          return time + "am";
        } else {
          timeH = parseInt(timeHold) - 12;
          timeM = time[3] + time[4];
          formatedTime = timeH + ":" + timeM + "pm";
          return formatedTime;
        }
      }
    } else {
      if (time.length == 3) {
        timeH = time[0];
        timeM = time[1] + time[2];
        formatedTime = timeH + ":" + timeM + "am";
        return formatedTime;
      } else {
        if (time[0] == "0") {
          timeH = time[1];
          timeM = time[2] + time[3];
          formatedTime = timeH + ":" + timeM + "am";
          return formatedTime;
        } else {
          timeHold = time[0] + time[1];
          if (parseInt(timeHold) < 13) {
            timeH = time[0] + time[1];
            timeM = time[2] + time[3];
            formatedTime = timeH + ":" + timeM + "am";
            return formatedTime;
          } else {
            timeH = parseInt(timeHold) - 12;
            timeM = time[2] + time[3];
            formatedTime = timeH + ":" + timeM + "pm";
            return formatedTime;
          }
        }
      }
    }
  } else {
    if (
      time.length == 3 &&
      (time.indexOf("am") > -1 || time.indexOf("pm") > -1)
    ) {
      return time[0] + ":" + "00" + time[1] + time[2];
    } else if (time.length == 3) {
      return time[0] + ":" + time[1] + time[2] + "am";
    } else if (time.length == 5) {
      return time[0] + ":" + time[1] + time[2] + time[3] + time[4];
    } else {
      timeHold = time[0] + time[1];
      if (parseInt(timeHold) < 13) {
        if (time.length == 1) {
          return time + ":" + "00" + "am";
        } else if (time.length == 2) {
          return time + ":" + "00" + "am";
        } else if (
          (time.indexOf("am") > -1 || time.indexOf("pm") > -1) &&
          time.length == 4
        ) {
          return timeHold + ":" + "00" + time[2] + time[3];
        } else if (time.indexOf("am") > -1 || time.indexOf("pm") > -1) {
          return timeHold + ":" + time[2] + time[3] + time[4] + time[5];
        } else {
          return timeHold + ":" + time[2] + time[3] + "am";
        }
      } else {
        if (time.length == 2) {
          return parseInt(timeHold) - 12 + ":" + "00" + "pm";
        } else {
          return parseInt(timeHold) - 12 + ":" + time[2] + time[3] + "pm";
        }
      }
    }
  }
}

// ******************************************** time and length

function timeandlength(time) {
  hold = time.split("-");
  time1 = formatTime(hold[0]);
  time2 = formatTime(hold[1]);
  hours1 = "";
  minutes1 = "";
  hours2 = "";
  minutes2 = "";
  if (time1.length == 6) {
    hours1 = time1[0];
    minutes1 = time1[2] + time1[3];
  } else {
    hours1 = time1[0] + time1[1];
    minutes1 = time1[3] + time1[4];
  }
  if (time2.length == 6) {
    hours2 = time2[0];
    minutes2 = time2[2] + time2[3];
  } else {
    hours2 = time2[0] + time2[1];
    minutes2 = time2[3] + time2[4];
  }

  if (parseInt(hours1) > parseInt(hours2)) {
    timeLimitHours = parseInt(hours1) - parseInt(hours2) - 12;
    timeLimitMinitus = parseInt(minutes2) - parseInt(minutes1);
  } else {
    timeLimitHours = parseInt(hours2) - parseInt(hours1);
    timeLimitMinitus = parseInt(minutes2) - parseInt(minutes1);
  }

  if (timeLimitMinitus < 0) {
    timeLimitHours--;
    timeLimitMinitus += 60;
  }

  if (timeLimitHours == 0) {
    hrs = 0;
  } else {
    if (Math.abs(timeLimitHours) < 12) {
      hrs = Math.abs(timeLimitHours) * 60;
    } else {
      hrs = Math.abs(Math.abs(timeLimitHours) - 12) * 60;
    }
  }
  mins = Math.abs(timeLimitMinitus);
  return hrs + mins;
}

// ******************************************** Date

// formatDate("23/2/2021");

function formatDate(d_ate) {
  if (d_ate.toLowerCase() == "today") {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = today.getFullYear();

    today = dd + "/" + mm + "/" + yyyy;
    return today;
  } else if (d_ate.toLowerCase() == "tomorrow") {
    var today = new Date();
    var dd = parseInt(String(today.getDate()).padStart(2, "0")) + 1;
    var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = today.getFullYear();
    today = dd + "/" + mm + "/" + yyyy;
    return today;
  } else if (d_ate.toLowerCase() == "day after tomorrow") {
    var today = new Date();
    var dd = parseInt(String(today.getDate()).padStart(2, "0")) + 2;
    var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = today.getFullYear();
    today = dd + "/" + mm + "/" + yyyy;
    return today;
  } else if (
    d_ate.toLowerCase() == "monday" ||
    d_ate.toLowerCase() == "this monday"
  ) {
    var today = new Date();
    today.setDate(today.getDate() + ((1 + 7 - today.getDay()) % 7 || 7));
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = today.getFullYear();
    today = dd + "/" + mm + "/" + yyyy;
    return today;
  } else if (
    d_ate.toLowerCase() == "tuesday" ||
    d_ate.toLowerCase() == "this tuesday"
  ) {
    var today = new Date();
    today.setDate(today.getDate() + ((2 + 7 - today.getDay()) % 7 || 7));
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = today.getFullYear();
    today = dd + "/" + mm + "/" + yyyy;
    return today;
  } else if (
    d_ate.toLowerCase() == "wednesday" ||
    d_ate.toLowerCase() == "this wednesday"
  ) {
    var today = new Date();
    today.setDate(today.getDate() + ((3 + 7 - today.getDay()) % 7 || 7));
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = today.getFullYear();
    today = dd + "/" + mm + "/" + yyyy;
    return today;
  } else if (
    d_ate.toLowerCase() == "thursday" ||
    d_ate.toLowerCase() == "this thursday"
  ) {
    var today = new Date();
    today.setDate(today.getDate() + ((4 + 7 - today.getDay()) % 7 || 7));
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = today.getFullYear();
    today = dd + "/" + mm + "/" + yyyy;
    return today;
  } else if (
    d_ate.toLowerCase() == "friday" ||
    d_ate.toLowerCase() == "this friday"
  ) {
    var today = new Date();
    today.setDate(today.getDate() + ((5 + 7 - today.getDay()) % 7 || 7));
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = today.getFullYear();
    today = dd + "/" + mm + "/" + yyyy;
    return today;
  } else if (
    d_ate.toLowerCase() == "saturday" ||
    d_ate.toLowerCase() == "this saturday"
  ) {
    var today = new Date();
    today.setDate(today.getDate() + ((6 + 7 - today.getDay()) % 7 || 7));
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = today.getFullYear();
    today = dd + "/" + mm + "/" + yyyy;
    return today;
  } else if (
    d_ate.toLowerCase() == "sunday" ||
    d_ate.toLowerCase() == "this sunday"
  ) {
    var today = new Date();
    today.setDate(today.getDate() + ((7 + 7 - today.getDay()) % 7 || 7));
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = today.getFullYear();
    today = dd + "/" + mm + "/" + yyyy;
    return today;
  } else if (d_ate.toLowerCase() == "next monday") {
    var today = new Date();
    today.setDate(today.getDate() + ((1 + 7 - today.getDay()) % 7 || 7));
    var dd = parseInt(String(today.getDate()).padStart(2, "0")) + 7;
    var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = today.getFullYear();
    today = dd + "/" + mm + "/" + yyyy;
    return today;
  } else if (d_ate.toLowerCase() == "next tuesday") {
    var today = new Date();
    today.setDate(today.getDate() + ((2 + 7 - today.getDay()) % 7 || 7));
    var dd = parseInt(String(today.getDate()).padStart(2, "0")) + 7;
    var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = today.getFullYear();
    today = dd + "/" + mm + "/" + yyyy;
    return today;
  } else if (d_ate.toLowerCase() == "next wednesday") {
    var today = new Date();
    today.setDate(today.getDate() + ((3 + 7 - today.getDay()) % 7 || 7));
    var dd = parseInt(String(today.getDate()).padStart(2, "0")) + 7;
    var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = today.getFullYear();
    today = dd + "/" + mm + "/" + yyyy;
    return today;
  } else if (d_ate.toLowerCase() == "next thursday") {
    var today = new Date();
    today.setDate(today.getDate() + ((4 + 7 - today.getDay()) % 7 || 7));
    var dd = parseInt(String(today.getDate()).padStart(2, "0")) + 7;
    var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = today.getFullYear();
    today = dd + "/" + mm + "/" + yyyy;
    return today;
  } else if (d_ate.toLowerCase() == "next friday") {
    var today = new Date();
    today.setDate(today.getDate() + ((5 + 7 - today.getDay()) % 7 || 7));
    var dd = parseInt(String(today.getDate()).padStart(2, "0")) + 7;
    var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = today.getFullYear();
    today = dd + "/" + mm + "/" + yyyy;
    return today;
  } else if (d_ate.toLowerCase() == "next saturday") {
    var today = new Date();
    today.setDate(today.getDate() + ((6 + 7 - today.getDay()) % 7 || 7));
    var dd = parseInt(String(today.getDate()).padStart(2, "0")) + 7;
    var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = today.getFullYear();
    today = dd + "/" + mm + "/" + yyyy;
    return today;
  } else if (d_ate.toLowerCase() == "next sunday") {
    var today = new Date();
    today.setDate(today.getDate() + ((7 + 7 - today.getDay()) % 7 || 7));
    var dd = parseInt(String(today.getDate()).padStart(2, "0")) + 7;
    var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = today.getFullYear();
    today = dd + "/" + mm + "/" + yyyy;
    return today;
  } else if (d_ate.indexOf("/") > -1 && d_ate.split("/").length == 3) {
    newdate = "";
    yearindex = 0;
    splitDate = d_ate.split("/");
    for (i = 0; i < splitDate.length; i++) {
      if (splitDate[i].length < 3) {
        if (newdate == "") {
          newdate = splitDate[i];
        } else {
          newdate = newdate + "/" + splitDate[i];
        }
      } else {
        yearindex = i;
      }
    }
    newdate = newdate + "/" + splitDate[yearindex];
    return newdate;
  } else if (d_ate.indexOf("-") > -1 && d_ate.split("-").length == 3) {
    var today = new Date();
    var yyyy = today.getFullYear();
    var regExp = /[a-zA-Z]/g;
    newdate = "";
    yearindex = 0;
    splitDate = d_ate.split("-");

    if (regExp.test(d_ate)) {
      return splitDate[0] + "/" + getMonthNumber(splitDate[1]) + "/" + yyyy;
    } else {
      for (i = 0; i < splitDate.length; i++) {
        if (splitDate[i].length < 3) {
          if (newdate == "") {
            newdate = splitDate[i];
          } else {
            newdate = newdate + "/" + splitDate[i];
          }
        } else {
          yearindex = i;
        }
      }
      newdate = newdate + "/" + splitDate[yearindex];
      return newdate;
    }
  } else if (d_ate.indexOf("/") > -1 && d_ate.split("/").length == 2) {
    newdate = "";
    yearindex = 0;
    splitDate = d_ate.split("/");
    for (i = 0; i < splitDate.length; i++) {
      if (splitDate[i].length < 3) {
        if (newdate == "") {
          newdate = splitDate[i];
        } else {
          newdate = newdate + "/" + splitDate[i];
        }
      }
    }
    var today = new Date();
    var yyyy = today.getFullYear();
    newdate = newdate + "/" + yyyy;
    return newdate;
  } else if (d_ate.indexOf("-") > -1 && d_ate.split("-").length == 2) {
    newdate = "";
    yearindex = 0;
    var regExp = /[a-zA-Z]/g;
    var today = new Date();
    var yyyy = today.getFullYear();
    splitDate = d_ate.split("-");
    if (regExp.test(d_ate)) {
      if (regExp.test(splitDate[0])) {
        newdate =
          splitDate[1] + "/" + getMonthNumber(splitDate[0]) + "/" + yyyy;
      } else {
        newdate =
          splitDate[0] + "/" + getMonthNumber(splitDate[1]) + "/" + yyyy;
      }
      return newdate;
    } else {
      for (i = 0; i < splitDate.length; i++) {
        if (splitDate[i].length < 3) {
          if (newdate == "") {
            newdate = splitDate[i];
          } else {
            newdate = newdate + "/" + splitDate[i];
          }
        }
      }
      newdate = newdate + "/" + yyyy;
      return newdate;
    }
  } else if (
    d_ate.indexOf("jan") ||
    d_ate.indexOf("feb") ||
    d_ate.indexOf("mar") ||
    d_ate.indexOf("apr") ||
    d_ate.indexOf("may") ||
    d_ate.indexOf("jun") ||
    d_ate.indexOf("jul") ||
    d_ate.indexOf("aug") ||
    d_ate.indexOf("sep") ||
    d_ate.indexOf("oct") ||
    d_ate.indexOf("nov") ||
    d_ate.indexOf("dev")
  ) {
    nocoma = "";
    if (d_ate.indexOf(",") > -1) {
      nocoma = d_ate.replace(",", "");
    } else {
      nocoma = d_ate;
    }
    dateNoSpace = nocoma.split(" ");
    if (dateNoSpace.length > 1) {
      finalDate = "";
      if (/\d/.test(dateNoSpace[0])) {
        var today = new Date();
        var yyyy = today.getFullYear();
        if (parseInt(dateNoSpace[0]) == parseInt(yyyy)) {
          finalDate =
            dateNoSpace[2] +
            "/" +
            getMonthNumber(dateNoSpace[1]) +
            "/" +
            dateNoSpace[0];
          return finalDate;
        } else {
          finalDate =
            dateNoSpace[0] +
            "/" +
            getMonthNumber(dateNoSpace[1]) +
            "/" +
            dateNoSpace[2];
          return finalDate;
        }
      } else {
        finalDate =
          dateNoSpace[1] +
          "/" +
          getMonthNumber(dateNoSpace[0]) +
          "/" +
          dateNoSpace[2];
        return finalDate;
      }
    } else {
      numbers = "";
      monthName = "";
      dateWithNoSpace = dateNoSpace[0];
      for (let i = 0; i < dateWithNoSpace.length; i++) {
        if (/\d/.test(dateWithNoSpace[i])) {
          numbers = numbers + dateWithNoSpace[i];
        } else {
          monthName = monthName + dateWithNoSpace[i];
        }
      }
      if (numbers.length == 5) {
        return (
          numbers[0] +
          "/" +
          getMonthNumber(monthName) +
          "/" +
          numbers[1] +
          numbers[2] +
          numbers[3] +
          numbers[4]
        );
      } else if (numbers.length > 8) {
        return (
          numbers[0] +
          numbers[1] +
          "/" +
          getMonthNumber(monthName) +
          "/" +
          numbers[2] +
          numbers[3] +
          numbers[4] +
          numbers[5]
        );
      } else {
        var today = new Date();
        var yyyy = today.getFullYear();
        if (numbers.length > 6) {
          chkyear = numbers[0] + numbers[1] + numbers[2] + numbers[3];
          if (parseInt(yyyy) == chkyear) {
            if (numbers.length == 7) {
              return numbers[6] + "/" + numbers[4] + numbers[5] + "/" + yyyy;
            } else {
              return (
                numbers[6] +
                numbers[7] +
                "/" +
                numbers[4] +
                numbers[5] +
                "/" +
                yyyy
              );
            }
          } else {
            if (numbers.length == 8) {
              return (
                numbers[0] +
                numbers[1] +
                "/" +
                numbers[2] +
                numbers[3] +
                "/" +
                yyyy
              );
            } else {
              return numbers[0] + "/" + numbers[1] + numbers[2] + "/" + yyyy;
            }
          }
        }
        return (
          // numbers[0] + numbers[1] + "/" + numbers[2] + numbers[3] + "/" + yyyy
          numbers[0] + numbers[1] + "/" + getMonthNumber(monthName) + "/" + yyyy
        );
      }
    }
  } else {
    return "none";
  }

  function getMonthNumber(month) {
    if (month.toLowerCase() == "january" || month.toLowerCase() == "jan") {
      return 1;
    } else if (
      month.toLowerCase() == "february" ||
      month.toLowerCase() == "feb"
    ) {
      return 2;
    } else if (month.toLowerCase() == "march" || month.toLowerCase() == "mar") {
      return 3;
    } else if (month.toLowerCase() == "april" || month.toLowerCase() == "apr") {
      return 4;
    } else if (month.toLowerCase() == "may" || month.toLowerCase() == "may") {
      return 5;
    } else if (month.toLowerCase() == "june" || month.toLowerCase() == "jun") {
      return 6;
    } else if (month.toLowerCase() == "july" || month.toLowerCase() == "july") {
      return 7;
    } else if (
      month.toLowerCase() == "august" ||
      month.toLowerCase() == "aug"
    ) {
      return 8;
    } else if (
      month.toLowerCase() == "september" ||
      month.toLowerCase() == "sep"
    ) {
      return 9;
    } else if (
      month.toLowerCase() == "october" ||
      month.toLowerCase() == "oct"
    ) {
      return 10;
    } else if (
      month.toLowerCase() == "november" ||
      month.toLowerCase() == "nov"
    ) {
      return 11;
    } else if (
      month.toLowerCase() == "december" ||
      month.toLowerCase() == "dec"
    ) {
      return 12;
    }
  }
}

chkExpire("23/11/2021");
function chkExpire(expDate) {
  chkExpire = expDate.split("/");
  expDay = parseInt(chkExpire[0]);
  expMonth = parseInt(chkExpire[1]);
  expYear = parseInt(chkExpire[2]);

  var today = new Date();
  var dd = parseInt(String(today.getDate()).padStart(2, "0"));
  var mm = parseInt(String(today.getMonth() + 1).padStart(2, "0")); //January is 0!
  var yyyy = parseInt(today.getFullYear());
}

function setDate(get_date) {
  monthDays = getDaysInMonths(get_date);
  chkDate = get_date.split("/");
  holdDay = parseInt(chkDate[0]);
  holdMonth = parseInt(chkDate[1]);
  holdYear = parseInt(chkDate[2]);
  if (holdDay > monthDays) {
    holdDay = holdDay - monthDays;
    holdMonth += 1;
  }

  if (holdMonth > 12) {
    holdYear += 1;
  }

  return holdDay + "/" + holdMonth + "/" + holdYear;
}

function getDaysInMonths(monthCheck) {
  monthCheck = monthCheck.split("/");
  if (monthCheck[1] == "1" || monthCheck[1] == "01") {
    return 31;
  } else if (monthCheck[1] == "2" || monthCheck[1] == "02") {
    if (monthCheck[2] % 2 == 0) {
      return 29;
    } else {
      return 28;
    }
  } else if (monthCheck[1] == "3" || monthCheck[1] == "03") {
    return 31;
  } else if (monthCheck[1] == "4" || monthCheck[1] == "04") {
    return 30;
  } else if (monthCheck[1] == "5" || monthCheck[1] == "05") {
    return 31;
  } else if (monthCheck[1] == "6" || monthCheck[1] == "06") {
    return 30;
  } else if (monthCheck[1] == "7" || monthCheck[1] == "07") {
    return 31;
  } else if (monthCheck[1] == "8" || monthCheck[1] == "08") {
    return 30;
  } else if (monthCheck[1] == "9" || monthCheck[1] == "09") {
    return 31;
  } else if (monthCheck[1] == "10") {
    return 30;
  } else if (monthCheck[1] == "11") {
    return 30;
  } else if (monthCheck[1] == "12") {
    return 31;
  } else {
    return none;
  }
}
