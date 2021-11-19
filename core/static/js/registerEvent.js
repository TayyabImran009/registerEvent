const eventAddBar = document.getElementById("eventAddBar");
const eventAddBtn = document.getElementById("eventAddBtn");

const fields = document.querySelectorAll("#fields");
const fieldsData = document.querySelectorAll("#fieldsData");
const createEventContentData = document.querySelectorAll(
  "#createEventContentData"
);

eventAddBtn.addEventListener("click", function () {
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
        fields[index].value = formatLength(eventAddBar.value) + "min";
        if (fields[index].value != "none") {
          createEventContentData[index].style.display = "block";
          fieldsData[index].innerText = fields[index].value;
        }
      } else if (index == 1) {
        fields[index].value = formatDate(eventAddBar.value);
        createEventContentData[index].style.display = "block";
        fieldsData[index].innerText = fields[index].value;
      } else if (index == 2) {
        if (eventAddBar.value.indexOf("-") > -1) {
          fields[index].value = formatTime(eventAddBar.value.split("-")[0]);
          createEventContentData[index].style.display = "block";
          fieldsData[index].innerText = fields[index].value;

          fields[index + 1].value = timeandlength(eventAddBar.value) + "min";
          createEventContentData[index + 1].style.display = "block";
          fieldsData[index + 1].innerText =
            timeandlength(eventAddBar.value) + "min";
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
});

function getFieldNumber() {
  for (let i = 0; i < fields.length; i++) {
    if (fields[i].value == "none") {
      return i;
    }
  }
}

function getNextValue(index) {
  if (index == 0) {
    eventAddBar.type = "text";
    return "Type event title";
  } else if (index == 1) {
    eventAddBar.type = "text";
    return "Enter Date";
  } else if (index == 2) {
    eventAddBar.type = "text";
    return "Enter Start Time";
  } else if (index == 3) {
    eventAddBar.type = "text";
    return "Enter Length";
  } else if (index == 4) {
    eventAddBar.type = "text";
    return "Enter Emails saprated by coma";
  } else if (index == 5) {
    eventAddBar.type = "text";
    return "Enter Location";
  } else if (index == 6) {
    eventAddBar.type = "text";
    return "Enter Calander to add";
  } else if (index == 7) {
    eventAddBar.type = "text";
    return "Enter Description";
  } else {
    eventAddBar.type = "text";
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
  });
}

function getRemovedValue(index) {
  if (index == 0) {
    eventAddBar.type = "text";
    return "Type event title";
  } else if (index == 1) {
    eventAddBar.type = "text";
    return "Enter Date";
  } else if (index == 2) {
    eventAddBar.type = "text";
    return "Enter Start Time";
  } else if (index == 3) {
    eventAddBar.type = "text";
    return "Enter Length";
  } else if (index == 4) {
    eventAddBar.type = "text";
    return "Enter Location";
  } else if (index == 5) {
    eventAddBar.type = "text";
    return "Enter Calander to add";
  } else if (index == 6) {
    eventAddBar.type = "text";
    return "Enter Description";
  } else {
    eventAddBar.type = "text";
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
  onlyNum = nospace.match(/\d+/)[0];
  if (nospace.indexOf("m") > -1 || nospace.indexOf("M") > -1) {
    return onlyNum;
  }
  if (nospace.indexOf("h") > -1 || nospace.indexOf("H") > -1) {
    return parseFloat(onlyNum) * 60;
  } else {
    return "none";
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
    } else {
      timeHold = time[0] + time[1];
      if (parseInt(timeHold) < 13) {
        if (time.length == 1) {
          return time + ":" + "00" + "am";
        } else if (time.length == 2) {
          return time + ":" + "00" + "am";
        } else if (time.indexOf("am") > -1 || time.indexOf("pm") > -1) {
          return timeHold + ":" + time[2] + time[3] + time[4] + time[5];
        } else {
          return timeHold + ":" + time[2] + time[3] + "am";
        }
      } else {
        return parseInt(timeHold) - 12 + ":" + "00" + "pm";
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

formatDate("12oct2021");

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
    console.log(today);
    return today;
  } else if (d_ate.toLowerCase() == "next wednesday") {
    var today = new Date();
    today.setDate(today.getDate() + ((3 + 7 - today.getDay()) % 7 || 7));
    var dd = parseInt(String(today.getDate()).padStart(2, "0")) + 7;
    var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = today.getFullYear();
    today = dd + "/" + mm + "/" + yyyy;
    console.log(today);
    return today;
  } else if (d_ate.toLowerCase() == "next thursday") {
    var today = new Date();
    today.setDate(today.getDate() + ((4 + 7 - today.getDay()) % 7 || 7));
    var dd = parseInt(String(today.getDate()).padStart(2, "0")) + 7;
    var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = today.getFullYear();
    today = dd + "/" + mm + "/" + yyyy;
    console.log(today);
    return today;
  } else if (d_ate.toLowerCase() == "next friday") {
    var today = new Date();
    today.setDate(today.getDate() + ((5 + 7 - today.getDay()) % 7 || 7));
    var dd = parseInt(String(today.getDate()).padStart(2, "0")) + 7;
    var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = today.getFullYear();
    today = dd + "/" + mm + "/" + yyyy;
    console.log(today);
    return today;
  } else if (d_ate.toLowerCase() == "next saturday") {
    var today = new Date();
    today.setDate(today.getDate() + ((6 + 7 - today.getDay()) % 7 || 7));
    var dd = parseInt(String(today.getDate()).padStart(2, "0")) + 7;
    var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = today.getFullYear();
    today = dd + "/" + mm + "/" + yyyy;
    console.log(today);
    return today;
  } else if (d_ate.toLowerCase() == "next sunday") {
    var today = new Date();
    today.setDate(today.getDate() + ((7 + 7 - today.getDay()) % 7 || 7));
    var dd = parseInt(String(today.getDate()).padStart(2, "0")) + 7;
    var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = today.getFullYear();
    today = dd + "/" + mm + "/" + yyyy;
    console.log(today);
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
    console.log(newdate);
    return newdate;
  } else if (d_ate.indexOf("-") > -1 && d_ate.split("-").length == 3) {
    newdate = "";
    yearindex = 0;
    splitDate = d_ate.split("-");
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
    console.log(newdate);
    return newdate;
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
    console.log(newdate);
    return newdate;
  } else if (d_ate.indexOf("-") > -1 && d_ate.split("-").length == 2) {
    newdate = "";
    yearindex = 0;
    splitDate = d_ate.split("-");
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
    console.log(newdate);
    return newdate;
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
        finalDate =
          dateNoSpace[0] +
          "/" +
          getMonthNumber(dateNoSpace[1]) +
          "/" +
          dateNoSpace[2];
        console.log(finalDate);
        return finalDate;
      } else {
        finalDate =
          dateNoSpace[1] +
          "/" +
          getMonthNumber(dateNoSpace[0]) +
          "/" +
          dateNoSpace[2];
        console.log(finalDate);
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
      console.log(numbers);
      console.log(monthName);
      if (numbers.length == 5) {
        console.log(
          numbers[0] +
            "/" +
            getMonthNumber(monthName) +
            "/" +
            numbers[1] +
            numbers[2] +
            numbers[3] +
            numbers[4]
        );
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
      } else {
        console.log(
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
      }
    }
  } else {
    console.log("Blank");
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
