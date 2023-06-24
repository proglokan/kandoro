// TIMER EXTENDS INTERVAL? EACH INTERVAL HAS A TIMER
class Timer {
  private _interval: Interval;

  constructor(interval: Interval) {
    this._interval = interval;
  }

  start(): void {
    this._interval.start();
    console.log('started');
  }

  pause(): void {
    this._interval.pause();
    console.log('paused');
  }

  continue(): void {
    this._interval.continue();
    console.log('continued');
  }
}

class Interval {
  private _minuteValue: number;
  private _secondValue: number;
  private _minutesDisplay: HTMLSpanElement | null = null;
  private _secondsDisplay: HTMLSpanElement | null = null;
  private _timerId: number | null = null;
  private _paused: boolean = false;

  constructor(minutesDisplay: HTMLSpanElement | null, secondsDisplay: HTMLSpanElement | null) {
    this._minutesDisplay = minutesDisplay;
    this._minuteValue = minutesDisplay ? +minutesDisplay.textContent! : 25;
    this._secondsDisplay = secondsDisplay;
    this._secondValue = secondsDisplay ? +secondsDisplay.textContent! : 0;
  }

  start(): void {
    this._timerId = setInterval(() => {
      if (this._paused) return;

      if (this._secondValue === 0) {
        this._secondValue = 59;
        --this._minuteValue;
      } else --this._secondValue;

      this.updateDisplay();

      if (this._minuteValue === 0 && this._secondValue === 0) this.pause();

    }, 1000);
  }

  pause(): void {
    if (this._timerId) {
      clearInterval(this._timerId);
      this._timerId = null;
      this._paused = true;
    }
  }

  continue(): void {
    this._paused = false;
      this.start();
  }

  private updateDisplay(): void {
    if (this._minutesDisplay) {
      this._minutesDisplay.textContent = this._minuteValue < 10 ? `0${this._minuteValue}` : `${this._minuteValue}`;
    }
    if (this._secondsDisplay) {
      this._secondsDisplay.textContent = this._secondValue < 10 ? `0${this._secondValue}` : `${this._secondValue}`;
    }
  }
}

const interval = new Interval(document.querySelector('#minute'), document.querySelector('#second'));
const timer = new Timer(interval);

function disableStartButton() {
  const startContainer: SVGPathElement | null = document.querySelector('#startContainer');
  if (startContainer) startContainer.style.display = 'none';
}

function enablePauseButton() {
  const pauseButton: SVGElement | null = document.querySelector('#pause-button');
  if (pauseButton) pauseButton.style.display = 'block';
  pauseButton?.addEventListener('click', () => {
    disablePauseButton();
    timer.pause();
    enableContinueButton();
  });
}

function disablePauseButton() {
  const pauseButton: SVGElement | null = document.querySelector('#pause-button');
  if (pauseButton) pauseButton.style.display = 'none';
}

function enableContinueButton() {
  const startContainer: SVGPathElement | null = document.querySelector('#startContainer');
  if (startContainer) startContainer.style.display = 'block';
  startContainer?.addEventListener('click', () => {
    disableContinueButton();
    timer.continue();
    enablePauseButton();
  });
}

function disableContinueButton() {
  disableStartButton();
}

function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function addListeners(): void {
  const playButton: SVGPathElement | null = document.querySelector('#start-button');
    playButton?.addEventListener('click', () => {
      disableStartButton();
      enablePauseButton();
      timer.start();
    });
}

addListeners();

