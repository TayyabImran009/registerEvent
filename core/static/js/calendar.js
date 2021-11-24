const date = new Date();

selectedDate = new Date().getDate();
const renderCalendar = () => {
  date.setDate(1);

  const monthDays = document.querySelector(".days");

  const lastDay = new Date(
    date.getFullYear(),
    date.getMonth() + 1,
    0
  ).getDate();

  const prevLastDay = new Date(
    date.getFullYear(),
    date.getMonth(),
    0
  ).getDate();

  const firstDayIndex = date.getDay();

  const lastDayIndex = new Date(
    date.getFullYear(),
    date.getMonth() + 1,
    0
  ).getDay();

  const nextDays = 7 - lastDayIndex - 1;

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  document.querySelector(".date h1").innerHTML = months[date.getMonth()];

  document.querySelector(".date p").innerHTML = new Date().toDateString();

  let days = "";

  for (let x = firstDayIndex; x > 0; x--) {
    days += `<div class="prev-date">${prevLastDay - x + 1}</div>`;
  }

  for (let i = 1; i <= lastDay; i++) {
    if (
      i === selectedDate
      // &&
      // date.getMonth() === new Date().getMonth()
    ) {
      days += `<div class="today">${i}</div>`;
    } else {
      days += `<div>${i}</div>`;
    }
  }

  for (let j = 1; j <= nextDays; j++) {
    days += `<div class="next-date">${j}</div>`;
    monthDays.innerHTML = days;
  }
};

document.querySelector(".prev").addEventListener("click", () => {
  date.setMonth(date.getMonth() - 1);
  renderCalendar();
});

document.querySelector(".next").addEventListener("click", () => {
  date.setMonth(date.getMonth() + 1);
  renderCalendar();
});

renderCalendar();

eventAddBar.onkeyup = function () {
  if (eventAddBar.placeholder == "Enter Date") {
    if (
      eventAddBar.value.indexOf("/") > -1 ||
      eventAddBar.value.indexOf("-") > -1
    ) {
      if (eventAddBar.value.indexOf("/") > -1) {
        nDate2 = eventAddBar.value.split("/");
      } else {
        nDate2 = eventAddBar.value.split("-");
      }
      selectedDate = parseInt(nDate2[0]);
      if (nDate2[1] != "") {
        cMNumber = date.getMonth();
        mIndex = 0;
        if (cMNumber == parseInt(nDate2[1]) - 1) {
          mIndex = 0;
        } else if (cMNumber > parseInt(nDate2[1]) - 1) {
          mIndex = cMNumber - (parseInt(nDate2[1]) - 1);
          date.setMonth(date.getMonth() - mIndex);
        } else {
          mIndex = parseInt(nDate2[1]) - 1 - cMNumber;
          date.setMonth(date.getMonth() + mIndex);
        }
      }
      renderCalendar();
    } else {
      if (eventAddBar.value == "") {
        selectedDate = new Date().getDate();
        renderCalendar();
      } else {
        selectedDate = parseInt(eventAddBar.value);
        renderCalendar();
      }
    }
  }
};
