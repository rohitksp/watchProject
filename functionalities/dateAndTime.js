import { checkProperFormatting } from "../main/index.js"

const hoursAndMinutes = document.querySelector(".time");
const setAmAndPm = document.querySelector(".setAmAndPm");
const date = document.querySelector(".date");
const changeDisplayFormat = document.querySelector("#changeDisplayFormat");
const timeZoneOptions = document.getElementById("timeZone");

// Initialized a object that has multiple variables
let setVariablesForDateTime = {
  getDateAndTime: null,
  setHours: null,
  setMinutes: null,
  setMonth: null,
  setDate: null,
  setYear: null,
  displayFormat: 12,
  getProperMinutes: null,
  getProperHours: null,
  getProperMonths: null,
  getProperDates: null,
}

// Destructing all the variables from the object
let {
  getDateAndTime,
  setHours,
  setMinutes,
  setMonth,
  setDate,
  setYear,
  displayFormat,
  getProperMinutes,
  getProperHours,
  getProperMonths,
  getProperDates,
} = setVariablesForDateTime;

// Button for change display format
changeDisplayFormat.addEventListener("click", changeDisplayFormatHandler)

// Initialized for change display format
function changeDisplayFormatHandler() {
  if (displayFormat === 12) {
    displayFormat = 24;
    changeDisplayFormat.innerText = "12H"
  } else {
    displayFormat = 12;
    changeDisplayFormat.innerText = "24H"
  }
}

// Set proper time format
function setTimeValues(getDateAndTime) {
  // Importing variables from the index.js file
  setHours = getDateAndTime.getHours() % displayFormat;
  setMinutes = getDateAndTime.getMinutes();
  getProperHours = checkProperFormatting(getProperHours, setHours);
  getProperMinutes = checkProperFormatting(getProperMinutes, setMinutes);
  setAmAndPm.innerText = getDateAndTime.getHours() >= 12 ? "PM" : "AM";
  hoursAndMinutes.innerText = `${getProperHours}:${getProperMinutes}`;
}

// Set proper date format
function setDateValues(getDateAndTime) {
  // Importing variables from the index.js file
  setDate = getDateAndTime.getDate();
  setMonth = getDateAndTime.getMonth() + 1;
  getProperDates = checkProperFormatting(getProperDates, setDate);
  getProperMonths = checkProperFormatting(getProperMonths, setMonth);
  setYear = getDateAndTime.getFullYear();
  date.innerText = `${getProperDates}-${getProperMonths}-${setYear}`;
}

// Running the time frequently.
function setDateAndTime() {
  setInterval(() => {
    getDateAndTime = new Date();
    let currentTime = getDateAndTime.toLocaleTimeString("en-US", {timeZone: timeZoneOptions.value});
    let currentDate = getDateAndTime.toLocaleDateString("en-US", {timeZone: timeZoneOptions.value});
    let dateAndTime = new Date(currentDate + " " + currentTime);
    setTimeValues(dateAndTime);
    setDateValues(dateAndTime);
  }, 1000)
}

setDateAndTime();
timeZoneOptions.addEventListener("change", setDateAndTime);