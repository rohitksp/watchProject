import { allCountryTimeZones } from "../functionalities/timeZoneList.js"
import "../functionalities/dateAndTime.js";
import "../functionalities/stopWatch.js";
import "../functionalities/setAlarm.js";

const timeZoneOptions = document.getElementById("timeZone");

function setTimeZoneOptions() {
  allCountryTimeZones.forEach((timeZone, index) => {
    let createOption = document.createElement("option");
    if (timeZone == "Asia/Kolkata") {
      createOption.selected = true;
    }
    createOption.textContent = timeZone;
    createOption.value = timeZone;
    createOption.setAttribute("class", `option${index}`);
    timeZoneOptions.appendChild(createOption);
  })
}

setTimeZoneOptions();

function checkProperFormatting(setProperValue, value) {
  if (value < 10) {
    setProperValue = `0${value}`
  } else {
    setProperValue = value;
  }
  return setProperValue;
}

export {
  checkProperFormatting
}