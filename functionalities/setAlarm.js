const containerForSetAlarm = document.querySelector(".containerForSetAlarm");
const setAlarmButton = document.getElementById("setAlarm");
const saveAlarmButton = document.getElementById("saveAlarm");
const setAlarmInputBox = document.getElementById("setAlarmTime");
const containerForShowAlarms = document.querySelector(".containerForShowAlarms");
const alarmSound = new Audio('../sound/mixkit-retro-game-emergency-alarm-1000.wav');

let setAlarmObject = {
  setAlarmList: [],
  createTagForCount: null,
  createButtonForDelete: null,
}

let {
  setAlarmList,
  createTagForCount,
  createButtonForDelete,
} = setAlarmObject;

function checkAmAndPm(time) {
  const timeParts = time.split(":");
  const hour = parseInt(timeParts[0]);
  let period;
  if (hour >= 0 && hour < 12) {
    period = "AM";
  } else {
    period = "PM";
  }
  return period;
}

function createAlarmList() {
  containerForShowAlarms.innerHTML = "";
  setAlarmList.forEach((timeValue, index) => {
    createTagForCount = document.createElement("p");
    createButtonForDelete = document.createElement("button");
    createButtonForDelete.setAttribute("class", "deleteAlarm");
    createButtonForDelete.innerHTML = `
      <span class="material-symbols-outlined">
        delete
      </span>`;
    createTagForCount.textContent = `${index + 1}. ${timeValue} ${checkAmAndPm(timeValue)}`;
    createTagForCount.setAttribute("class", "alarmCount");
    createButtonForDelete.addEventListener("click", function() {
      setAlarmList.splice(index, 1);
      createAlarmList();
      if (setAlarmList.length == 0) {
        containerForShowAlarms.style.display = 'none';
      }
      alarmSound.pause();
    });
    createTagForCount.appendChild(createButtonForDelete);
    containerForShowAlarms.appendChild(createTagForCount);
  })
}

setAlarmButton.addEventListener("click", function() {
  if (setAlarmList.length < 5) {
    if (containerForSetAlarm.style.display == "none" || !containerForSetAlarm.style.display) {
      containerForSetAlarm.style.display = "flex";
    } else {
      containerForSetAlarm.style.display = "none";
    }
  } else {
    window.alert("Currently you can add only 5 alarms.")
  }
})

saveAlarmButton.addEventListener("click", function() {
  if (setAlarmInputBox && setAlarmInputBox.value) {
    setAlarmList.push(setAlarmInputBox.value)
    createAlarmList();
    containerForSetAlarm.style.display = "none";
    containerForShowAlarms.style.display = "inline-table";

    setAlarmList.forEach(time => {
      let alarmSetTime = new Date();
      let currentTime = new Date();
      alarmSetTime.setHours(time.split(":")[0]);
      alarmSetTime.setMinutes(time.split(":")[1]);
      alarmSetTime.setSeconds(0);
      const timeDiff = alarmSetTime.getTime() - currentTime.getTime();
      if (timeDiff > 0) {
        setTimeout(playAlarm, timeDiff);
      } else {
        window.alert("Invalid alarm time. Please set a future time.");
      }
    })
    setAlarmInputBox.value = "";
  } else {
    window.alert("Please select the time first.")
  }
})

function playAlarm() {
  alarmSound.play();
}
