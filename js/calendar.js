"use strict";

import { formatDate, getFirstDayOfMonth, getLastDayOfMonth } from "./utils.js";
import { handleModal } from "./modal.js";
import { loadEvents } from "./eventManager.js";

export const currentDate = new Date();

const [month, year, day] = [
  currentDate.getMonth(),
  currentDate.getFullYear(),
  currentDate.getDay(),
];

let calendarBody = document.querySelector("#table");

export function renderCalender() {
  let modal = document.getElementById("eventModal");
  let selectedDate = modal.getAttribute("data-date");

  produceGridCalendar();
  handleModal();

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
