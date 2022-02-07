import "./styles.scss";

var sessionLength: number = 25;
var breakLength: number = 5;
var timer: number,
  timerType: string,
  countdown: NodeJS.Timer,
  countdownState: string;

document.addEventListener("DOMContentLoaded", () => loadContent());

const loadContent = () => {
  timerType = "session";
  countdownState = "idle";
  setTimer(timerType);
  setHtmlContent();
};

const setTimer = (type: string) => {
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
  document.getElementById("sessionVal").innerHTML = sessionLength.toString();
};

const setBreakHtml = () => {
  document.getElementById("breakVal").innerHTML = breakLength.toString();
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
  const displayTimer: string = setTimerDisplay();
  document.getElementById("timer").innerHTML = displayTimer;
};

const setTimerDisplay = (): string => {
  const min: number = Math.floor(timer / 60);
  const sec: number = timer % 60;
  const displayMin: String = min < 10 ? "0" + min : min.toString();
  const displaySec: String = sec < 10 ? "0" + sec : sec.toString();
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
    countdown = undefined;
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
