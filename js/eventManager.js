"use strict";

const eventListElm = document.querySelector(".eventlist");

export function loadEvents(selectedDate) {
  const events = getEventsByDate(selectedDate);
  createEvents(events);
}

function getEventsByDate(selectedDate) {
  let savedEvents = JSON.parse(localStorage.getItem("events")) || {};
  return savedEvents[selectedDate] || [];
}

export function createEvents(eventArray) {
  let result = "";
  eventArray.forEach((event) => {
    result += `<li class="event">
                  <p class="event__title">${event.title}</p>
              </li>`;
  });

  eventListElm.innerHTML = result;
  eventReset();
}

export function eventReset() {
  const eventInput = document.querySelector(".event-input");
  return (eventInput.value = "");
}

export function saveEvent(event, selectedDate) {
  let savedEvents = JSON.parse(localStorage.getItem("events")) || {};
  if (!savedEvents[selectedDate]) {
    savedEvents[selectedDate] = [];
  }
  savedEvents[selectedDate].push(event);
  localStorage.setItem("events", JSON.stringify(savedEvents));
}
