import { renderDataInitially } from "./utils/renderDataInitially.js";
import { displayHeadlineAndCalendar } from "./utils/calendar.js";
import { fetchAndDisplayQuote } from "./utils/quote.js";
import { changeElementDisplay } from "./utils/utils.js";
import { setUpEventListeners } from "./utils/setUpEventlisteners.js";

const quoteDabba = document.getElementById("quoteDabba");
const tasksDabba = document.getElementById("tasksDabba");

// =====================

document.addEventListener("DOMContentLoaded", () => {
  renderDataInitially();
  displayHeadlineAndCalendar();
  fetchAndDisplayQuote();
  setUpEventListeners();
});

// listening for user actions
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  // quote related
  if (message.command === "show quote") {
    changeElementDisplay(quoteDabba, "flex");
  } else if (message.command === "hide quote") {
    changeElementDisplay(quoteDabba, "none");
  }

  // tasks related
  else if (message.command === "show tasks") {
    changeElementDisplay(tasksDabba, "block");
  } else if (message.command === "hide tasks") {
    changeElementDisplay(tasksDabba, "none");
  }

  // title related
  else if (message.command === "change title") {
    chrome.storage.local.get(["docTitle"]).then((data) => {
      document.title = data.docTitle;
    });
  }
});

// =====================
