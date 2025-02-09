"use strict";

import { renderCalender, currentDate } from "./calendar.js";

// Main
const prevBtn = document.querySelector(".prevBtn");
const nextBtn = document.querySelector(".nextBtn");

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
