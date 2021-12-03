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
    console.log(dropdownOption[i].innerHTML);
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
  if(eventAddBar.placeholder == "email"){
    addEmail()
  }else{
    performTask();
  }
  eventAddBar.focus();
});

eventAddBar.addEventListener("keydown", function (event) {
  if (event.keyCode === 13) {
    if(eventAddBar.placeholder == "email"){
      addEmail()
    }else{
      performTask();
    }
    eventAddBar.focus();
  }
});
emailList = [];

function addEmail(){
  
    const createEventContentDataEmailArea = document.querySelector(
      ".createEventContentDataEmailArea"
    );
    if(eventAddBar.value != ""){
      emailList.push(eventAddBar.value);
      let output = "";
      for(let i=0; i<emailList.length; i++){
        console.log(emailList[i]);
        output +=
          "<div class='createEventContentDataEmail2' id='createEventContentData'><p id='fieldsData'>" +
          emailList[i] +
          "</p><i id='removeParticipent' class='fa fa-times' aria-hidden='true' onclick=removeEmail("+i+")></i></div>";
      }
      createEventContentDataEmailArea.style.display = "block";
      createEventContentDataEmailArea.innerHTML = output;
      createEventContentData[4].style.display = "block";
      eventAddBar.value="";
    }else{
      console.log("Here");
      if(emailList != []){
        mailtemp = "";
      for(let i=0; i<emailList.length; i++){
        if(mailtemp != ""){
          mailtemp = mailtemp+","+emailList[i];
        }else{
          mailtemp = emailList[i];
        }
      }
      console.log(mailtemp);
      fields[4].value = mailtemp;
      eventAddBar.value = "";
      index = getFieldNumber();
      eventAddBar.placeholder = getNextValue(index);
      }
    }
}


function performTask() {
  if (
    eventAddBar.value != "" &&
    eventAddBar.value.replace(/\s/g, "").length &&
    eventAddBar.placeholder != "Done"
  ) {
    let index = getFieldNumber();
    
      if (index == 3) {
        holdLength = formatLength(eventAddBar.value);
        if(holdLength!="none"){
          fields[index].value = formatLength(eventAddBar.value);
          if (fields[index].value != "none") {
            createEventContentData[index].style.display = "block";
            fieldsData[index].innerText = fields[index].value;
          }
        }
      } else if (index == 1) {
        returnDate = formatDate(eventAddBar.value);
        console.log("call: " + returnDate);
        fDate = setDate(returnDate);
        fields[index].value = fDate;
        createEventContentData[index].style.display = "block";
        fieldsData[index].innerText = fields[index].value;
      } else if (index == 2) {
        if (eventAddBar.value.indexOf("-") > -1) {
          timeAndLength = timeandlength(eventAddBar.value);
          fields[index].value = formatTime(timeAndLength.split("-")[0]);
          createEventContentData[index].style.display = "block";
          fieldsData[index].innerText = fields[index].value;

          fields[index + 1].value = putTimeInHM(timeAndLength.split("-")[1]);
          createEventContentData[index + 1].style.display = "block";
          fieldsData[index + 1].innerText = putTimeInHM(
            timeAndLength.split("-")[1]
          );
        } else {
          hold = formatTime(eventAddBar.value);
          if (hold != "none") {
            fields[index].value = hold;
            createEventContentData[index].style.display = "block";
            fieldsData[index].innerText = fields[index].value;
          }
        }
      } else {
        fields[index].value = eventAddBar.value;
        createEventContentData[index].style.display = "block";
        fieldsData[index].innerText = eventAddBar.value;
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
    return "email";
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

function removeEmail(id) {
  const createEventContentDataEmail2 = document.querySelectorAll(".createEventContentDataEmail2");
  createEventContentDataEmail2[id].style.display="none";
  emailList.splice(id, 1);
  console.log(emailList);
  eventAddBar.focus();

  
  mailtemp = "";
  for(let i=0; i<emailList.length; i++){
    if(mailtemp != ""){
      mailtemp = mailtemp+","+emailList[i];
    }else{
      mailtemp = emailList[i];
    }
  }
  console.log(mailtemp);
  fields[4].value = mailtemp;
  if (emailList == []){
    fields[4].value = "none";
  }
  
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

const savedData = document.getElementById("savedData");

function saveEvent(mydata) {
  $.ajax({
    url: "/test/",
    method: "POST",
    data: mydata,
    success: function (data) {
      console.log(data.newData[0]);
      x = data.newData[0];
      savedData.innerHTML =
        x.title +
        " " +
        x.date +
        " " +
        x.startTime +
        " " +
        x.length +
        " " +
        x.email +
        " " +
        x.location +
        " " +
        x.calender +
        " " +
        x.description;
    },
  });
}

// *************************************** formating Length
function formatLength(length) {
  if(length.indexOf("m") > -1 || length.indexOf("M") > -1 || length.indexOf("H") > -1 || length.indexOf("h") > -1)
  {
    nospace = length.replace(/ +/g, "");
    index = 0;
    onlyNum = "";
    console.log(nospace[index]);
    for (let i = 0; nospace[i] != "h" && nospace[i] != "m"; i++) {
      onlyNum += nospace[i];
      console.log(onlyNum);
    }
    console.log(onlyNum);
    if (nospace.indexOf("m") > -1 || nospace.indexOf("M") > -1) {
      console.log(onlyNum);
      putTimeInHM(onlyNum);
      return putTimeInHM(onlyNum);
    }
    if (nospace.indexOf("h") > -1 || nospace.indexOf("H") > -1) {
      console.log(parseFloat(onlyNum) * 60);
      putTimeInHM(parseFloat(onlyNum) * 60);
      return putTimeInHM(parseFloat(onlyNum) * 60);
    } else {
      console.log("none");
      return "none";
    }
  }else{
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
      console.log(h2 + " hour");
      return h2 + " hour";
    } else {
      console.log(h2 + " hour " + min2 + " min");
      return h2 + " hour " + min2 + " min";
    }
  } else {
    console.log(time + " min");
    return time + " min";
  }
}

// *************************************** formating Time

// console.log(formatTime("0900pm"));

function formatTime(time) {
  if (time.length > 3 && time.indexOf(":") > -1) {
    tempTime = time;
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
        if (tempTime.indexOf("m") > -1) {
          console.log(time + tempTime[4] + tempTime[5]);
          console.log("here");
          return time + tempTime[4] + tempTime[5];
        } else {
          console.log(time + "am");
          console.log("here");
          return time + "am";
        }
      } else {
        timeHold = time[0] + time[1];
        if (parseInt(timeHold) < 13) {
          if (tempTime.indexOf("m") > -1) {
            console.log(time + tempTime[5] + tempTime[6]);
            return time + tempTime[5] + tempTime[6];
          } else {
            console.log(time + "pm");
            return time + "pm";
          }
        } else {
          timeH = parseInt(timeHold) - 12;
          timeM = time[3] + time[4];
          if (tempTime.indexOf("m") > -1) {
            formatedTime = timeH + ":" + timeM + tempTime[5] + tempTime[6];
          } else {
            formatedTime = timeH + ":" + timeM + "pm";
          }
          console.log(formatedTime);
          return formatedTime;
        }
      }
    } else {
      if (time.length == 3) {
        timeH = time[0];
        timeM = time[1] + time[2];
        formatedTime = timeH + ":" + timeM + "am";
        console.log(formatedTime);
        return formatedTime;
      } else {
        if (time[0] == "0") {
          timeH = time[1];
          timeM = time[2] + time[3];
          formatedTime = timeH + ":" + timeM + "am";
          console.log(formatedTime);
          return formatedTime;
        } else {
          timeHold = time[0] + time[1];
          if (parseInt(timeHold) < 13) {
            timeH = time[0] + time[1];
            timeM = time[2] + time[3];
            formatedTime = timeH + ":" + timeM + "am";
            console.log(formatedTime);
            return formatedTime;
          } else {
            timeH = parseInt(timeHold) - 12;
            timeM = time[2] + time[3];
            formatedTime = timeH + ":" + timeM + "pm";
            console.log(formatedTime);
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
      console.log("here");
      return time[0] + ":" + "00" + time[1] + time[2];
    } else if (time.length == 3) {
      console.log("here");
      return time[0] + ":" + time[1] + time[2] + "am";
    } else if (time.length == 5) {
      console.log("here");
      return time[0] + ":" + time[1] + time[2] + time[3] + time[4];
    } else {
      timeHold = time[0] + time[1];
      if (parseInt(timeHold) < 13) {
        if (time.length == 1) {
          console.log("here");
          return time + ":" + "00" + "am";
        } else if (time.length == 2) {
          console.log("here");
          return time + ":" + "00" + "am";
        } else if (
          (time.indexOf("am") > -1 || time.indexOf("pm") > -1) &&
          time.length == 4
        ) {
          console.log(timeHold + ":" + "00" + time[2] + time[3]);
          console.log("here");
          return timeHold + ":" + "00" + time[2] + time[3];
        } else if (time.indexOf("am") > -1 || time.indexOf("pm") > -1) {
          console.log(timeHold + ":" + time[2] + time[3] + time[4] + time[5]);
          console.log("here");
          return timeHold + ":" + time[2] + time[3] + time[4] + time[5];
        } else {
          console.log(timeHold + ":" + time[2] + time[3] + "am");
          console.log("here");
          return timeHold + ":" + time[2] + time[3] + "am";
        }
      } else {
        if (time.length == 2) {
          console.log("here");
          if (parseInt(timeHold) - 12 > 12) {
            return "none";
          } else {
            return parseInt(timeHold) - 12 + ":" + "00" + "pm";
          }
        } else {
          console.log("here");
          if (parseInt(timeHold) > 12) {
            if (parseInt(timeHold) - 12 < 13) {
              if (time.indexOf("am") > -1) {
                return "none";
              } else {
                console.log(parseInt(timeHold) - 12 + ":" + time[2] + time[3] + "pm");
                return parseInt(timeHold) - 12 + ":" + time[2] + time[3] + "pm";
              }
            } else {
              return "none";
            }
          } else {
            return parseInt(timeHold) - 12 + ":" + time[2] + time[3] + "pm";
          }
        }
      }
    }
  }
}

// ******************************************** time and length

console.log(timeandlength("2216-2620"));

function timeandlength(time) {
  hold = time.split("-");
  formatTime1 = hold[0];
  formatTime2 = hold[1];

  chk24h = formatTime2[0]+formatTime2[1];

  if(parseInt(chk24h) > 24){
    time1 = formatTime(formatTime1);
    if(formatTime2.length == 5){
      time2 = formatTime2;
      console.log("here is T2: "+time2);
    } else if(formatTime2.length == 4){
      time2 = formatTime2[0]+formatTime2[1]+":"+formatTime2[2]+formatTime2[3]+"pm";
      console.log("here is T2: "+time2);
    } else if(formatTime2.length == 2){
      time2 = formatTime2[0]+formatTime2[1]+":"+"00pm";
      console.log("here is T2: "+time2);
    }else{
      time2 = formatTime2[0]+":"+"00"+"pm";
      console.log("here is T2: "+time2);
    }
  }else{
    time1 = formatTime(formatTime1);
    time2 = formatTime(formatTime2);
    console.log("Time: " + time1);
    console.log("Time: " + time2);

    console.log(formatTime1);
    console.log(formatTime1.indexOf("m") > -1);
    if (formatTime1.indexOf("m") > -1 || formatTime1.indexOf("M") > -1) {
      console.log("1 has m");
    } else {
      console.log("no m");
      if (formatTime2.indexOf("m") > -1 || formatTime2.indexOf("M") > -1) {
        console.log("have m");
        if (parseInt(time1.split(":")[0]) < parseInt(time2.split(":")[0])) {
          if (formatTime2.indexOf("am") > -1) {
            if (time1.length == 6) {
              time1 = time1[0] + time1[1] + time1[2] + time1[3] + "am";
              console.log("Here");
            } else {
              time1 = time1[0] + time1[1] + time1[2] + time1[3] + time1[4] + "am";
              console.log("Here");
            }
          } else {
            if (time1.length == 6) {
              time1 = time1[0] + time1[1] + time1[2] + time1[3] + "pm";
              console.log("Here");
            } else {
              time1 = time1[0] + time1[1] + time1[2] + time1[3] + time1[4] + "pm";
              console.log("Here");
            }
          }
        } else {
          if (formatTime2.indexOf("am") > -1) {
            if (time1.length == 6) {
              time1 = time1[0] + time1[1] + time1[2] + time1[3] + "pm";
              console.log("Here");
            } else {
              time1 = time1[0] + time1[1] + time1[2] + time1[3] + time1[4] + "pm";
              console.log("Here");
            }
          } else {
            if (time1.length == 6) {
              time1 = time1[0] + time1[1] + time1[2] + time1[3] + "am";
              console.log("Here");
            } else {
              time1 = time1[0] + time1[1] + time1[2] + time1[3] + time1[4] + "am";
              console.log("Here");
            }
          }
        }
      }
    }
  }

  hours1 = "";
  minutes1 = "";
  timeState1 = "";
  hours2 = "";
  minutes2 = "";
  timeState2 = "";
  if (time1.length == 6) {
    hours1 = time1[0];
    minutes1 = time1[2] + time1[3];
    timeState1 = time1[4] + time1[5];
  } else {
    hours1 = time1[0] + time1[1];
    minutes1 = time1[3] + time1[4];
    timeState1 = time1[5] + time1[6];
  }
  console.log("time1:" + hours1 + ":" + minutes1 + timeState1);
  if (time2.length == 6) {
    hours2 = time2[0];
    minutes2 = time2[2] + time2[3];
    timeState2 = time2[4] + time2[5];
  } else {
    hours2 = time2[0] + time2[1];
    minutes2 = time2[3] + time2[4];
    timeState2 = time2[5] + time2[6];
  }
  console.log("time2:" + hours2 + ":" + minutes2 + timeState2);

  if (parseInt(hours1) > parseInt(hours2)) {
    timeLimitHours = 12 - (parseInt(hours1) - parseInt(hours2));
    timeLimitMinitus = parseInt(minutes2) - parseInt(minutes1);
    console.log(timeLimitHours);
    console.log(timeLimitMinitus);
  } else {
    timeLimitHours = parseInt(hours2) - parseInt(hours1);
    timeLimitMinitus = parseInt(minutes2) - parseInt(minutes1);
    if (timeState1 != timeState2) {
      timeLimitHours += 12;
    }
    if(parseInt(chk24h)>24){
      timeLimitHours = timeLimitHours - 12;
    }
    console.log(timeLimitHours);
    console.log(timeLimitMinitus);
  }

  if (timeLimitMinitus < 0) {
    timeLimitHours--;
    timeLimitMinitus += 60;
  }

  if (timeLimitHours == 0) {
    hrs = 0;
  } else {
    // if (Math.abs(timeLimitHours) < 12) {
    //   hrs = Math.abs(timeLimitHours) * 60;
    // } else {
    //   hrs = Math.abs(Math.abs(timeLimitHours) - 12) * 60;
    // }
    hrs = Math.abs(timeLimitHours) * 60;
  }
  mins = Math.abs(timeLimitMinitus);
  console.log(hrs);
  console.log(mins);
  totalMin = hrs + mins;
  console.log(time1 + "-" + totalMin);
  return time1 + "-" + totalMin;
}

// console.log(formatTime("1:30pm"));

// ******************************************** Date

// console.log(formatDate("2022 Sep 25"));
function formatDate(d_ate) {
  if (d_ate.toLowerCase() == "today") {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = today.getFullYear();

    today = dd + "/" + mm + "/" + yyyy;
    console.log(today);
    return today;
  } else if (d_ate.toLowerCase() == "tomorrow") {
    var today = new Date();
    var dd = parseInt(String(today.getDate()).padStart(2, "0")) + 1;
    var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = today.getFullYear();
    today = dd + "/" + mm + "/" + yyyy;
    console.log(today);
    return today;
  } else if (d_ate.toLowerCase() == "day after tomorrow") {
    var today = new Date();
    var dd = parseInt(String(today.getDate()).padStart(2, "0")) + 2;
    var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = today.getFullYear();
    today = dd + "/" + mm + "/" + yyyy;
    console.log(today);
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
    console.log(today);
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
    console.log(today);
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
    console.log(today);
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
    console.log(today);
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
    console.log(today);
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
    console.log(today);
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
    console.log(today);
    return today;
  } else if (d_ate.toLowerCase() == "next monday") {
    var today = new Date();
    today.setDate(today.getDate() + ((1 + 7 - today.getDay()) % 7 || 7));
    var dd = parseInt(String(today.getDate()).padStart(2, "0")) + 7;
    var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = today.getFullYear();
    today = dd + "/" + mm + "/" + yyyy;
    console.log(today);
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
  } else if (d_ate.indexOf("月") > -1) {
    hold_date = d_ate;
    hold_date = hold_date.replace("月", "/");
    hold_date = hold_date.replace("日", "");
    return formatDate(hold_date);
  } else if (d_ate.indexOf("/") > -1 && d_ate.split("/").length == 3) {
    newdate = "";
    splitDate = d_ate.split("/");
    if (parseInt(splitDate[0]) > 2000) {
      newdate = splitDate[2] + "/" + splitDate[1] + "/" + splitDate[0];
      console.log(newdate);
    } else if (parseInt(splitDate[0]) < 13) {
      newdate = splitDate[1] + "/" + splitDate[0] + "/" + splitDate[2];
      console.log(newdate);
    } else {
      newdate = splitDate[0] + "/" + splitDate[1] + "/" + splitDate[2];
      console.log(newdate);
    }
    return newdate;
  } else if (d_ate.indexOf("-") > -1 && d_ate.split("-").length == 3) {
    var today = new Date();
    var yyyy = today.getFullYear();
    var regExp = /[a-zA-Z]/g;
    newdate = "";
    yearindex = 0;
    splitDate = d_ate.split("-");

    if (regExp.test(d_ate)) {
      console.log(
        splitDate[0] + "/" + getMonthNumber(splitDate[1]) + "/" + yyyy
      );

      return splitDate[0] + "/" + getMonthNumber(splitDate[1]) + "/" + yyyy;
    } else {
      if (parseInt(splitDate[0]) > 2000) {
        newdate = splitDate[2] + "/" + splitDate[1] + "/" + splitDate[0];
        console.log(newdate);
      } else if (parseInt(splitDate[0]) < 13) {
        newdate = splitDate[1] + "/" + splitDate[0] + "/" + splitDate[2];
        console.log(newdate);
      } else {
        newdate = splitDate[0] + "/" + splitDate[1] + "/" + splitDate[2];
        console.log(newdate);
      }
      console.log(newdate);
      return newdate;
    }
  } else if (d_ate.indexOf("/") > -1 && d_ate.split("/").length == 2) {
    newdate = "";
    splitDate = d_ate.split("/");
    if (parseInt(splitDate[0]) > 12) {
      newdate = splitDate[0] + "/" + splitDate[1];
      console.log(newdate);
    } else {
      newdate = splitDate[1] + "/" + splitDate[0];
      console.log(newdate);
    }
    var today = new Date();
    var yyyy = today.getFullYear();
    newdate = newdate + "/" + yyyy;
    console.log(newdate);
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
        splitDateBySpace = splitDate[1].split(" ");
        if (splitDateBySpace.length > 1) {
          newdate =
            splitDate[0] +
            "/" +
            getMonthNumber(splitDateBySpace[0]) +
            "/" +
            splitDateBySpace[1];
        } else {
          newdate =
            splitDate[0] + "/" + getMonthNumber(splitDate[1]) + "/" + yyyy;
        }
      }
      console.log(newdate);
      return newdate;
    } else {
      if(parseInt(splitDate[0]) > 12){
        newdate = splitDate[0] + "/" + splitDate[1] + "/" + yyyy;
        console.log(newdate);
      }else{
        newdate = splitDate[1] + "/" + splitDate[0] + "/" + yyyy;
        console.log(newdate);
      }
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
          console.log(finalDate);
          return finalDate;
        } else {
          if (!/\d/.test(dateNoSpace[1])) {
            if(parseInt(dateNoSpace[0]) > 2020){
              finalDate =
              dateNoSpace[2] +
              "/" +
              getMonthNumber(dateNoSpace[1]) +
              "/" +
              dateNoSpace[0];
              console.log(finalDate);
              return finalDate;
            }else{
              finalDate =
              dateNoSpace[0] +
              "/" +
              getMonthNumber(dateNoSpace[1]) +
              "/" +
              dateNoSpace[2];
              console.log(finalDate);
              return finalDate;
            }
          } else {
            if (parseInt(dateNoSpace[0]) > 12) {
              console.log(dateNoSpace);
              if(dateNoSpace.length == 3){
                finalDate =
                dateNoSpace[0] + "/" + dateNoSpace[1] + "/" + dateNoSpace[2];
                console.log(finalDate);
                return finalDate;
              }else{
                dateMonth = "";
                holdYYYY = "";
                for(let i=0; i<dateNoSpace[1].length; i++){
                  if(!/\d/.test(dateNoSpace[1][i])){
                    dateMonth += dateNoSpace[1][i];
                  }else{
                    holdYYYY += dateNoSpace[1][i];
                  }
                }
                console.log(dateNoSpace[0] + "/" + getMonthNumber(dateMonth) + "/" + holdYYYY);
                return dateNoSpace[0] + "/" + getMonthNumber(dateMonth) + "/" + holdYYYY;
              }
            } else {
              if (dateNoSpace.length == 2) {
                finalDate = dateNoSpace[1] + "/" + dateNoSpace[0] + "/" + yyyy;
                console.log(finalDate);
                return finalDate;
              } else {
                finalDate =
                  dateNoSpace[1] + "/" + dateNoSpace[0] + "/" + dateNoSpace[2];
                console.log(finalDate);
                return finalDate;
              }
            }
          }
        }
      } else {
        if (dateNoSpace.length == 3) {
          finalDate =
            dateNoSpace[1] +
            "/" +
            getMonthNumber(dateNoSpace[0]) +
            "/" +
            dateNoSpace[2];
          console.log(finalDate);
          return finalDate;
        } else {
          var today = new Date();
          var yyyy = today.getFullYear();
          console.log(dateNoSpace)
          console.log(parseInt(dateNoSpace[1]) +2)
          if(parseInt(dateNoSpace[1]) > 2020){
            if(parseInt(dateNoSpace[1].length) == 5){
              finalDate =
              dateNoSpace[1][0] + "/" + getMonthNumber(dateNoSpace[0]) + "/" + dateNoSpace[1][1]+dateNoSpace[1][2]+dateNoSpace[1][3]+dateNoSpace[1][4];
              console.log(finalDate);
            }else{
              finalDate =
              dateNoSpace[1][0]+dateNoSpace[1][1] + "/" + getMonthNumber(dateNoSpace[0]) + "/" + dateNoSpace[1][2]+dateNoSpace[1][3]+dateNoSpace[1][4]+dateNoSpace[1][5];
              console.log(finalDate);
            }

          }else{
            finalDate =
            dateNoSpace[1] + "/" + getMonthNumber(dateNoSpace[0]) + "/" + yyyy;
          console.log(finalDate);
          }
          return finalDate;
        }
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
      } else if (numbers.length > 8) {
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
      } else {
        var today = new Date();
        var yyyy = today.getFullYear();
        if (numbers.length > 6) {
          chkyear = numbers[0] + numbers[1] + numbers[2] + numbers[3];
          console.log(chkyear);
          if (parseInt(chkyear) > 2020 && numbers.length == 7) {
            chkMon = numbers[4] + numbers[5];
            if (parseInt(chkMon) < 13) {
              console.log(numbers[6] + "/" + chkMon + "/" + chkyear);
              return numbers[6] + "/" + chkMon + "/" + chkyear;
            } else {
              console.log(
                numbers[4] + "/" + numbers[5] + numbers[6] + "/" + chkyear
              );
              return numbers[4] + "/" + numbers[5] + numbers[6] + "/" + chkyear;
            }
          } else if (parseInt(chkyear) > 2020 && numbers.length == 8) {
            console.log(
              numbers[6] +
                numbers[7] +
                "/" +
                numbers[4] +
                numbers[5] +
                "/" +
                chkyear
            );
            return (
              numbers[6] +
              numbers[7] +
              "/" +
              numbers[4] +
              numbers[5] +
              "/" +
              chkyear
            );
          } else if (numbers.length == 7) {
            chkMon = numbers[0] + numbers[1];
            if (parseInt(chkMon) < 13) {
              console.log(
                numbers[2] +
                  "/" +
                  chkMon +
                  "/" +
                  numbers[3] +
                  numbers[4] +
                  numbers[5] +
                  numbers[6]
              );
              return (
                numbers[2] +
                "/" +
                chkMon +
                "/" +
                numbers[3] +
                numbers[4] +
                numbers[5] +
                numbers[6]
              );
            } else {
              console.log(
                numbers[0] +
                  "/" +
                  numbers[1] +
                  numbers[2] +
                  "/" +
                  numbers[3] +
                  numbers[4] +
                  numbers[5] +
                  numbers[6]
              );
              return (
                numbers[0] +
                "/" +
                numbers[1] +
                numbers[2] +
                "/" +
                numbers[3] +
                numbers[4] +
                numbers[5] +
                numbers[6]
              );
            }
          } else {
            chkMon = numbers[0] + numbers[1];
            if (parseInt(chkMon) < 13) {
              console.log(
                numbers[2] +
                  numbers[3] +
                  "/" +
                  chkMon +
                  "/" +
                  numbers[4] +
                  numbers[5] +
                  numbers[6] +
                  numbers[7]
              );
              return (
                numbers[2] +
                numbers[3] +
                "/" +
                chkMon +
                "/" +
                numbers[4] +
                numbers[5] +
                numbers[6] +
                numbers[7]
              );
            } else {
              console.log(
                numbers[0] +
                  numbers[1] +
                  "/" +
                  numbers[2] +
                  numbers[3] +
                  "/" +
                  numbers[4] +
                  numbers[5] +
                  numbers[6] +
                  numbers[7]
              );
              return (
                numbers[0] +
                numbers[1] +
                "/" +
                numbers[2] +
                numbers[3] +
                "/" +
                numbers[4] +
                numbers[5] +
                numbers[6] +
                numbers[7]
              );
            }
          }
        }
        if(monthName != ""){
          console.log(
            // numbers[0] + numbers[1] + "/" + numbers[2] + numbers[3] + "/" + yyyy
            numbers[0] + numbers[1] + "/" + getMonthNumber(monthName) + "/" + yyyy
          );
          return (
            // numbers[0] + numbers[1] + "/" + numbers[2] + numbers[3] + "/" + yyyy
            numbers[0] + numbers[1] + "/" + getMonthNumber(monthName) + "/" + yyyy
          );
        }else{
          if(parseInt(numbers[0] + numbers[1]) > 12){
            console.log(
              // numbers[0] + numbers[1] + "/" + numbers[2] + numbers[3] + "/" + yyyy
              numbers[0] + numbers[1] + "/" + numbers[2] + numbers[3] + "/" + yyyy
            );
            return (
              // numbers[0] + numbers[1] + "/" + numbers[2] + numbers[3] + "/" + yyyy
              numbers[0] + numbers[1] + "/" + numbers[2] + numbers[3] + "/" + yyyy
            );
          }else{
            console.log(
              // numbers[0] + numbers[1] + "/" + numbers[2] + numbers[3] + "/" + yyyy
              numbers[2] + numbers[3] + "/" + numbers[0] + numbers[1] + "/" + yyyy
            );
            return (
              // numbers[0] + numbers[1] + "/" + numbers[2] + numbers[3] + "/" + yyyy
              numbers[2] + numbers[3] + "/" + numbers[0] + numbers[1] + "/" + yyyy
            );
          }
          
        }
        
      }
    }
  } else {
    console.log("Blank");
    return "none";
  }

  // function getDayNumber(day) {
  //   if (day.toLowerCase() == "monday" || day.toLowerCase() == "mon") {
  //     return 1;
  //   } else if (day.toLowerCase() == "tuesday" || day.toLowerCase() == "tue") {
  //     return 2;
  //   } else if (day.toLowerCase() == "wednesday" || day.toLowerCase() == "wed") {
  //     return 3;
  //   } else if (day.toLowerCase() == "thursday" || day.toLowerCase() == "thus") {
  //     return 4;
  //   } else if (day.toLowerCase() == "friday" || day.toLowerCase() == "fri") {
  //     return 5;
  //   } else if (day.toLowerCase() == "saturday" || day.toLowerCase() == "sat") {
  //     return 6;
  //   } else if (day.toLowerCase() == "sunday" || day.toLowerCase() == "sun") {
  //     return 7;
  //   } else {
  //     return 0;
  //   }
  // }

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

// console.log(setDate("29/2/2021"));
function setDate(get_date) {
  console.log(get_date);
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  var yyyy = today.getFullYear();

  monthDays = getDaysInMonths(get_date);
  chkDate = get_date.split("/");
  holdDay = parseInt(chkDate[0]);
  holdMonth = parseInt(chkDate[1]);
  holdYear = parseInt(chkDate[2]);
  if (holdDay > monthDays) {
    while (holdDay > monthDays) {
      holdDay = holdDay - monthDays;
      holdMonth += 1;
      console.log("g");
    }
  }

  if (holdMonth > 12) {
    holdYear += 1;
    console.log("g");
  }

  if ((holdDay < parseInt(dd) || holdMonth < mm) && holdYear <= yyyy) {
    if(holdMonth < mm){
      holdYear = yyyy + 1;
      console.log("g");
    }
  }

  return  holdYear+ "/" + holdMonth + "/" + holdDay;
}

function getDaysInMonths(monthCheck) {
  monthCheck = monthCheck.split("/");
  if (monthCheck[1] == "1" || monthCheck[1] == "01") {
    console.log("here");
    return 31;
  } else if (monthCheck[1] == "2" || monthCheck[1] == "02") {
    if (monthCheck[2] % 2 == 0) {
      console.log("here");
      return 29;
    } else {
      console.log("here");
      return 28;
    }
  } else if (monthCheck[1] == "3" || monthCheck[1] == "03") {
    console.log("here");
    return 31;
  } else if (monthCheck[1] == "4" || monthCheck[1] == "04") {
    console.log("here");
    return 30;
  } else if (monthCheck[1] == "5" || monthCheck[1] == "05") {
    console.log("here");
    return 31;
  } else if (monthCheck[1] == "6" || monthCheck[1] == "06") {
    console.log("here");
    return 30;
  } else if (monthCheck[1] == "7" || monthCheck[1] == "07") {
    console.log("here");
    return 31;
  } else if (monthCheck[1] == "8" || monthCheck[1] == "08") {
    console.log("here");
    return 30;
  } else if (monthCheck[1] == "9" || monthCheck[1] == "09") {
    console.log("here");
    return 31;
  } else if (monthCheck[1] == "10") {
    console.log("here");
    return 30;
  } else if (monthCheck[1] == "11") {
    console.log("here");
    return 30;
  } else if (monthCheck[1] == "12") {
    console.log("here");
    return 31;
  } else {
    console.log("here");
    return none;
  }
}
