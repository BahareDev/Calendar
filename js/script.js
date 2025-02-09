"use strict";

// Date Utilities
const currentDate = new Date();
const [month, year, day] = [
  currentDate.getMonth(),
  currentDate.getFullYear(),
  currentDate.getDay(),
];

function formatDate(date, Option) {
  return date.toLocaleDateString("en-US", Option);
}

function getFirstDayOfMonth(date) {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

function getLastDayOfMonth(date) {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0);
}

// Event Managment
const eventListElm = document.querySelector(".eventlist");
const eventForm = document.querySelector(".event-form");
const eventInput = document.querySelector(".event-input");

function loadEvents(selectedDate) {
  const events = getEventsByDate(selectedDate);
  createEvents(events);
}

function createEvents(eventArray) {
  let result = "";
  eventArray.forEach((event) => {
    result += `<li class="event">
                  <p class="event__title">${event.title}</p>
              </li>`;
  });

  eventListElm.innerHTML = result;
  eventInput.value = "";
}

function saveEvent(event, selectedDate) {
  let savedEvents = JSON.parse(localStorage.getItem("events")) || {};
  if (!savedEvents[selectedDate]) {
    savedEvents[selectedDate] = [];
  }
  savedEvents[selectedDate].push(event);
  localStorage.setItem("events", JSON.stringify(savedEvents));
}

function getEventsByDate(selectedDate) {
  let savedEvents = JSON.parse(localStorage.getItem("events")) || {};
  return savedEvents[selectedDate] || [];
}

function handleSubmit(e) {
  e.preventDefault();
  if (!eventInput.value.trim()) return;

  const modal = document.getElementById("eventModal");
  let selectedDate = modal.getAttribute("data-date");

  const newEvent = {
    id: Date.now(),
    title: eventInput.value.trim(),
  };

  saveEvent(newEvent, selectedDate);
  loadEvents(selectedDate);
  eventInput.value = "";
}

function saveAllEvents(event) {
  localStorage.setItem("events", JSON.stringify(event));
}

// CalenderRendering
const prevBtn = document.querySelector(".prevBtn");
const nextBtn = document.querySelector(".nextBtn");
let calendarBody = document.querySelector("#table");

function renderCalender() {
  produceGridCalendar();
  handleModal();

  let modal = document.getElementById("eventModal");
  let selectedDate = modal.getAttribute("data-date");
  if (selectedDate) {
    loadEvents(selectedDate);
  }
}

function produceGridCalendar() {
  const showMonth = document.querySelector("#showMonth");

  showMonth.innerText = formatDate(currentDate, {
    month: "long",
    year: "numeric",
  });

  const firstDayOfMonth = getFirstDayOfMonth(currentDate);
  const lastDayOfMonth = getLastDayOfMonth(currentDate);

  let day = 1;
  let html = "";

  for (let i = 0; i < 5; i++) {
    let row = "<tr>";
    for (let j = 0; j < 7; j++) {
      if (
        (i === 0 && j < firstDayOfMonth.getDay()) ||
        day > lastDayOfMonth.getDate()
      ) {
        row += "<td></td>";
      } else {
        let isToday =
          currentDate.toDateString() ===
          new Date(year, month, day).toDateString();
        row += `<td class="day ${
          isToday ? "currentDay" : ""
        }" data-day="${day} data-toggle="modal" data-target=#modalC" >${day}</td>`;

        day++;
      }
    }
    row += "</tr>";
    html += row;
  }

  calendarBody.innerHTML = html;
}

//Modal handling
function handleModal() {
  let modalElement = document.getElementById("eventModal");
  let modal = new bootstrap.Modal(modalElement);

  const dayElement = document.querySelectorAll(".day");
  const closemodal = document.querySelector(".cross");

  dayElement.forEach((item) => {
    item.addEventListener("click", () => {
      const selectedDate = `${currentDate.getFullYear()}-${
        currentDate.getMonth() + 1
      }-${item.textContent.trim()}`;
      modalElement.setAttribute("data-date", selectedDate);
      modal.show();
      ShowInfo(item);
      loadEvents(selectedDate);
      AddEvent();

      closemodal.addEventListener("click", () => {
        modal.hide();
      });
    });
  });
}

function ShowInfo(day) {
  const innerInfo = formatDate(currentDate, {
    weekday: "long",
    month: "long",
    year: "numeric",
  });

  const dayElement = document.querySelector(".info>p");
  const dateElement = document.querySelector("#date");

  dayElement.textContent = day.textContent;
  dateElement.textContent = innerInfo;
}

function AddEvent() {
  eventForm.addEventListener("submit", handleSubmit);
}

// Main
document.addEventListener("DOMContentLoaded", function () {
  renderCalender();
});

prevBtn.addEventListener("click", function () {
  currentDate.setMonth(currentDate.getMonth() - 1);
  renderCalender();
});

nextBtn.addEventListener("click", function () {
  currentDate.setMonth(currentDate.getMonth() + 1);
  renderCalender();
});
