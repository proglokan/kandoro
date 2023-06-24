
class Interval {
  private _minuteValue: number;
  private _secondValue: number;
  private _minutesDisplay: HTMLSpanElement | null = null;
  private _secondsDisplay: HTMLSpanElement | null = null;
  public paused: boolean = false;

  constructor(minutesDisplay: HTMLSpanElement | null, secondsDisplay: HTMLSpanElement | null) {
    this._minutesDisplay = minutesDisplay;
    minutesDisplay?.textContent ? this._minuteValue = +minutesDisplay.textContent : this._minuteValue = 25;
    this._secondsDisplay = secondsDisplay;
    secondsDisplay?.textContent ? this._secondValue = +secondsDisplay.textContent : this._secondValue = 0;
  }

  start(): void {
    const timer = setInterval(() => {
      if (this.paused) clearInterval(timer);
      if (this._secondValue === 0) {
        this._secondValue = 59;
        --this._minuteValue;
      } else --this._secondValue;

      this._minuteValue < 10 ? this._minutesDisplay!.textContent = `0${this._minuteValue+''}` : this._minutesDisplay!.textContent = this._minuteValue+'';
      this._secondValue < 10 ? this._secondsDisplay!.textContent = `0${this._secondValue+''}` : this._secondsDisplay!.textContent = this._secondValue+'';

      if (this._minuteValue === 0 && this._secondValue === 0) clearInterval(timer);

    }, 1000);
  }

  pause(): void {
    this.paused = true;
  }

  continue(): void {
    
  }

}

function disableStartButton() {
  const startContainer: SVGPathElement | null = document.querySelector('#startContainer');
  if (startContainer) startContainer.style.display = 'none';
    
}

function enablePauseButton() {
  const pauseButton: SVGElement | null = document.querySelector('#pause-button');
  if (pauseButton) pauseButton.style.display = 'block';
  pauseButton?.addEventListener('click', () => {
    pauseTimer();
  });
}

function startTimer() {
  disableStartButton(), enablePauseButton();
  const minute: HTMLSpanElement | null = document.querySelector('#minute');
  const second: HTMLSpanElement | null = document.querySelector('#second');

  sleep(1000);

  let minuteContent: string | null | undefined = minute?.textContent, secondContent: string | null | undefined = second?.textContent;
  let minuteValue = minuteContent ? +minuteContent : 25, secondValue = secondContent ? +secondContent : 0;

  const timer = setInterval(() => {
    
    if (secondValue === 0) {
      secondValue = 59;
      --minuteValue;
    } else --secondValue;

    minuteValue < 10 ? minute!.textContent = `0${minuteValue+''}` : minute!.textContent = minuteValue+'';
    secondValue < 10 ? second!.textContent = `0${secondValue+''}` : second!.textContent = secondValue+'';

    if (minuteValue === 0 && secondValue === 0) {
      clearInterval(timer);
    }

  }, 1000);
}

function pauseTimer() {
  console.log(true);
}

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function addListeners() {
  const playButton: SVGPathElement | null = document.querySelector('#start-button');
    playButton?.addEventListener('click', () => {
      startTimer();
    });
}

window.addEventListener('DOMContentLoaded', () => {
  addListeners();
});