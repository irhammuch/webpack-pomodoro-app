class App {
  sessionLength: number = 25;
  breakLength: number = 5;
  timer: number;
  timerType: string;
  countdown: NodeJS.Timer;
  countdownState: string;

  constructor() {
    this.loadContent();
  }

  loadContent = () => {
    this.timerType = "session";
    this.countdownState = "idle";
    this.setTimer(this.timerType);
    this.setHtmlContent();
  };

  setTimer = (type: string) => {
    const minute = type == "session" ? this.sessionLength : this.breakLength;
    this.timer = minute * 60;
  };

  setHtmlContent = () => {
    this.setSessionHtml();
    this.setBreakHtml();
    this.setTimerHtml();
    this.setCoundownStateHtml();
    this.setPlayButtonHtml();
  };

  setSessionHtml = () => {
    document.getElementById("sessionVal").innerHTML =
      this.sessionLength.toString();
  };

  setBreakHtml = () => {
    document.getElementById("breakVal").innerHTML = this.breakLength.toString();
  };

  setPlayButtonHtml = () => {
    const element = document.getElementById("playButton");
    if (this.countdownState == "idle") {
      element.classList.remove("icon-pause");
      element.classList.add("icon-play");
    } else {
      element.classList.remove("icon-play");
      element.classList.add("icon-pause");
    }
  };

  setCoundownStateHtml = () => {
    const state =
      this.countdownState == "idle"
        ? "idle"
        : this.timerType == "break"
        ? "break"
        : "start";
    document.getElementById("countdownState").innerHTML = state;
  };

  setTimerHtml = () => {
    const displayTimer: string = this.setTimerDisplay();
    document.getElementById("timer").innerHTML = displayTimer;
  };

  setTimerDisplay = (): string => {
    const min: number = Math.floor(this.timer / 60);
    const sec: number = this.timer % 60;
    const displayMin: String = min < 10 ? "0" + min : min.toString();
    const displaySec: String = sec < 10 ? "0" + sec : sec.toString();
    return `${displayMin}:${displaySec}`;
  };

  setCountDown = () => {
    if (this.countdownState == "start") {
      this.timer--;
      this.setTimerHtml();
      if (this.timer < 1) {
        this.timerType = this.timerType == "session" ? "break" : "session";
        this.setTimer(this.timerType);
      }
    }
  };

  toggleCountdown = () => {
    if (!this.countdown) {
      this.countdown = setInterval(this.setCountDown, 1000);
    }
    this.countdownState = this.countdownState == "idle" ? "start" : "idle";
    this.setCoundownStateHtml();
    this.setPlayButtonHtml();
  };

  resetCountdown = () => {
    if (this.countdown) {
      clearInterval(this.countdown);
      this.countdown = undefined;
      this.loadContent();
    }
  };

  resetTimer = () => {
    this.setTimer(this.timerType);
    this.setTimerHtml();
  };

  addSessionVal = () => {
    this.sessionLength++;
    this.setSessionHtml();
    !this.countdown && this.resetTimer();
  };

  subSessionVal = () => {
    if (this.sessionLength < 2) return;
    this.sessionLength--;
    this.setSessionHtml();
    !this.countdown && this.resetTimer();
  };

  addBreakVal = () => {
    this.breakLength++;
    this.setBreakHtml();
    !this.countdown && this.resetTimer();
  };

  subBreakVal = () => {
    if (this.breakLength < 2) return;
    this.breakLength--;
    this.setBreakHtml();
    !this.countdown && this.resetTimer();
  };
}
module.exports = App;
