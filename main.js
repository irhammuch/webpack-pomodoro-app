var sessionLength = 1;
var breakLength = 2;
var timer, timerType, countdown, countdownState;

document.addEventListener("DOMContentLoaded", () => loadContent());

const loadContent = () => {
  timerType = "session";
  countdownState = "idle";
  setTimer(timerType);

  countdown = setInterval(setCountDown, 1000);
  setHtmlContent();
};

const setTimer = (type) => {
  minute = type == "session" ? sessionLength : breakLength;
  timer = minute * 60;
};

const setHtmlContent = () => {
  setSessionHtml();
  setBreakHtml();
  setTimerHtml();
  setPlayButtonHtml();
};

const setSessionHtml = () => {
  document.getElementById("sessionVal").innerHTML = sessionLength;
};

const setBreakHtml = () => {
  document.getElementById("breakVal").innerHTML = breakLength;
};

const setPlayButtonHtml = () => {
  document.getElementById("playButton").innerHTML =
    countdownState == "idle" ? "Play" : "Pause";
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
  countdownState = countdownState == "idle" ? "start" : "idle";
  setPlayButtonHtml();
};

const resetCountdown = () => {
  clearInterval(countdown);
  loadContent();
};

const addSessionVal = () => {
  sessionLength++;
  setSessionHtml();
};

const subSessionVal = () => {
  if (sessionLength < 2) return;
  sessionLength--;
  setSessionHtml();
};

const addBreakVal = () => {
  breakLength++;
  setBreakHtml();
};

const subBreakVal = () => {
  if (breakLength < 2) return;
  breakLength--;
  setBreakHtml();
};
