import { checkProperFormatting } from "../main/index.js";
const stopWatchTimer = document.querySelector(".stopWatchTimer");
const resetButton = document.getElementById("resetButton");
const playButton = document.getElementById("playButton");

// Initialized a object that has multiple variables
let variablesForStopWatch = {
  timer: null,
  hour: 0,
  minute: 0,
  seconds: 0,
  getProperHours: null,
  getProperMinutes: null,
  getProperSeconds: null,
  isPlayButton: true,
}

// Destructing all the variables from the object
let {
  timer,
  getProperSeconds,
  getProperMinutes,
  getProperHours,
  hour,
  minute,
  seconds,
  isPlayButton
} = variablesForStopWatch;

function startTimer() {
  if (isPlayButton) {
    // Checking if seconds or minutes complete 60 steps.
    timer = setInterval(() => {
      seconds++;
      if ( seconds === 60) {
        seconds = 0;
        minute++;
      }
      if (minute === 60) {
        minute = 0;
        hour++;
      }

      // Setting the extra zero for proper time convention
      getProperHours = checkProperFormatting(getProperHours, hour);
      getProperMinutes = checkProperFormatting(getProperMinutes, minute);
      getProperSeconds = checkProperFormatting(getProperSeconds, seconds);

      // Updating the dom element
      stopWatchTimer.innerText = `${getProperHours}:${getProperMinutes}:${getProperSeconds}`;
    }, 1000)
    createAndChangeIcon("pauseButton", "pause", "pause");
    isPlayButton = false;
  } else {
    window.clearInterval(timer);
    createAndChangeIcon("playButton", "play_arrow", "play");
    isPlayButton = true;
  }
}

function createAndChangeIcon(btnId, icon, iconId) {
  let pauseButton;
  if (iconId == "play") {
    pauseButton = document.getElementById("pauseButton");
  }
  let button = iconId == "play" ? pauseButton : playButton;
  button.id = btnId;
  button.children[0].id = iconId;
  button.children[0].textContent = icon;
}

function resetTimer() {
  window.clearInterval(timer)
  seconds = 0;
  minute = 0;
  hour = 0;
  stopWatchTimer.innerText = "00:00:00";
  createAndChangeIcon("playButton", "play_arrow", "play");
  isPlayButton = true;
}

playButton.addEventListener("click", startTimer);
resetButton.addEventListener("click", resetTimer);