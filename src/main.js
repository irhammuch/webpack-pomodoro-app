import "./styles.scss";

var sessionLength = 25;
var breakLength = 5;
var timer, timerType, countdown, countdownState;

document.addEventListener("DOMContentLoaded", () => loadContent());

const loadContent = () => {
  timerType = "session";
  countdownState = "idle";
  setTimer(timerType);
  setHtmlContent();
};

const setTimer = (type) => {
  const minute = type == "session" ? sessionLength : breakLength;
  timer = minute * 60;
};

const setHtmlContent = () => {
  setSessionHtml();
  setBreakHtml();
  setTimerHtml();
  setCoundownStateHtml();
  setPlayButtonHtml();
};

const setSessionHtml = () => {
  document.getElementById("sessionVal").innerHTML = sessionLength;
};

const setBreakHtml = () => {
  document.getElementById("breakVal").innerHTML = breakLength;
};

const setPlayButtonHtml = () => {
  const element = document.getElementById("playButton");
  if (countdownState == "idle") {
    element.classList.remove("icon-pause");
    element.classList.add("icon-play");
  } else {
    element.classList.remove("icon-play");
    element.classList.add("icon-pause");
  }
};

const setCoundownStateHtml = () => {
  const state =
    countdownState == "idle"
      ? "idle"
      : timerType == "break"
      ? "break"
      : "start";
  document.getElementById("countdownState").innerHTML = state;
};

const setTimerHtml = () => {
  const displayTimer = setTimerDisplay();
  document.getElementById("timer").innerHTML = displayTimer;
};

const setTimerDisplay = () => {
  var min = Math.floor(timer / 60);
  var sec = timer % 60;
  const displayMin = min < 10 ? "0" + min : min;
  const displaySec = sec < 10 ? "0" + sec : sec;
  return `${displayMin}:${displaySec}`;
};

const setCountDown = () => {
  if (countdownState == "start") {
    timer--;
    setTimerHtml();
    if (timer < 1) {
      timerType = timerType == "session" ? "break" : "session";
      setTimer(timerType);
    }
  }
};

const toggleCountdown = () => {
  if (!countdown) {
    countdown = setInterval(setCountDown, 1000);
  }
  countdownState = countdownState == "idle" ? "start" : "idle";
  setCoundownStateHtml();
  setPlayButtonHtml();
};

const resetCountdown = () => {
  if (countdown) {
    clearInterval(countdown);
    countdown = !countdown;
    loadContent();
  }
};

const resetTimer = () => {
  setTimer(timerType);
  setTimerHtml();
};

const addSessionVal = () => {
  sessionLength++;
  setSessionHtml();
  !countdown && resetTimer();
};

const subSessionVal = () => {
  if (sessionLength < 2) return;
  sessionLength--;
  setSessionHtml();
  !countdown && resetTimer();
};

const addBreakVal = () => {
  breakLength++;
  setBreakHtml();
  !countdown && resetTimer();
};

const subBreakVal = () => {
  if (breakLength < 2) return;
  breakLength--;
  setBreakHtml();
  !countdown && resetTimer();
};

export {
  toggleCountdown,
  resetCountdown,
  addSessionVal,
  subSessionVal,
  addBreakVal,
  subBreakVal,
};
