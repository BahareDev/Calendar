"use strict";

import { currentDate } from "./calendar.js";
import { formatDate } from "./utils.js";
import { loadEvents, eventReset, saveEvent } from "./eventManager.js";

export function handleModal() {
  let modalElement = document.getElementById("eventModal");
  let modal = new bootstrap.Modal(modalElement);

  const eventForm = document.querySelector(".event-form");
  const eventInput = document.querySelector(".event-input");

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
    });
  });
  closemodal.addEventListener("click", () => {
    modal.hide();
  });

  eventForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const modal = document.getElementById("eventModal");
    let selectedDate = modal.getAttribute("data-date");

    const newEvent = {
      id: Date.now(),
      title: eventInput.value.trim(),
    };
    if (!eventInput.value.trim()) return;

    saveEvent(newEvent, selectedDate);
    loadEvents(selectedDate);
    eventReset();
  });
}

function ShowInfo(day) {
  const dayElement = document.querySelector(".info>p");
  const dateElement = document.querySelector("#date");

  const innerInfo = formatDate(currentDate, {
    weekday: "long",
    month: "long",
    year: "numeric",
  });

  dayElement.textContent = day.textContent;
  dateElement.textContent = innerInfo;
}
