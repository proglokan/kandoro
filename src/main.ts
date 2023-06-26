'use strict';


class Session {
  public sessionStatus: HTMLDivElement | null = null;
  public _newSessionButton: HTMLButtonElement | null = null;
  constructor (sessionStatus: HTMLDivElement | null, newSessionButton: HTMLButtonElement | null) {
    this.sessionStatus = sessionStatus;
    this._newSessionButton = newSessionButton;
  }

  removeButton(): void {
    if (this._newSessionButton) this._newSessionButton.style.display = 'none';
  }

  inProgress(): void {
    this.sessionStatus?.classList.add('inProgress');
  }

  complete(): void {
    this.sessionStatus?.classList.remove('inProgress');
    this.sessionStatus?.classList.add('complete');
    this.reset();
  }

  reset(): void {
    if (this._newSessionButton) this._newSessionButton.style.display = 'block';
  }
}

class Timer {
  private _startButton: SVGPathElement | null;
  private _stopButton: SVGElement | null;
  private _minutesSpan: HTMLSpanElement | null;
  private _secondsSpan: HTMLSpanElement | null;
  private _intervalId: number | undefined;
  public minutesValue: number;
  public secondsValue: number;
  public session: Session;
  constructor(startButton: SVGPathElement, stopButton: SVGElement, minutesSpan: HTMLSpanElement, secondsSpan: HTMLSpanElement, minutesValue: number, secondsValue: number, session: Session) {
    this._startButton = startButton;
    this._stopButton = stopButton;
    this._minutesSpan = minutesSpan;
    this._secondsSpan = secondsSpan;
    this.minutesValue = minutesValue;
    this.secondsValue = secondsValue;
    this._startButton?.addEventListener('click', () => {
      this.start(), this.deactivate();
    });
    this._stopButton?.addEventListener('click', () => {
      this.stop(), this.reactivate();
    });
    this.session = session;
  }

  activate(): void {
    if (this._startButton) this._startButton.style.display = 'block';
  }

  deactivate(): void {
    if (this._startButton) this._startButton.style.display = 'none';
    if (this._stopButton) this._stopButton.style.display = 'block';
  }

  reactivate(): void {
    if (this._stopButton) this._stopButton.style.display = 'none';
    if (this._startButton) this._startButton.style.display = 'block';
  }

  start(): void {
    this._intervalId = setInterval(() => {

      if (this.minutesValue === 0 && this.secondsValue === 0) {
        this.stop(), this.complete();
        return;
      }

      if (this.secondsValue === 0) {
        this.minutesValue--, this.secondsValue = 59, this.updateTime(this.minutesValue, this.secondsValue);
        return;
      }

      --this.secondsValue;
      this.updateTime(this.minutesValue, this.secondsValue);
    }, 1000);
  }

  updateTime(minutes: number, seconds: number): void {
    if (this._minutesSpan) minutes < 10 ? this._minutesSpan.textContent = `0${minutes}` : this._minutesSpan.textContent = `${minutes}`;
    if (this._secondsSpan) seconds < 10 ? this._secondsSpan.textContent = `0${seconds}` : this._secondsSpan.textContent = `${seconds}`;
  }

  stop(): void {
    clearInterval(this._intervalId);
    this._intervalId = undefined;
  }

  complete(): void {
    this.reset();
    if (this._stopButton) this._stopButton.style.display = 'none';
    this.session.complete();
  }

  reset(): void {
    this.minutesValue = 25, this.secondsValue = 0;
    this.updateTime(this.minutesValue, this.secondsValue);
  }
}


function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const newSessionButton: HTMLButtonElement | null = document.querySelector('#newSession');
newSessionButton?.addEventListener('click', () => {
  const sessionIndex: number = getSessionIndex();
  const sessionStatus = document.querySelector(`#session${sessionIndex}`) as HTMLDivElement;
  const session = new Session(sessionStatus, newSessionButton);
  session.removeButton();
  session.inProgress();
  const startButton = document.querySelector('#startContainer') as SVGPathElement;
  const stopButton = document.querySelector('#stopButton') as SVGElement;
  const minutesSpan = document.querySelector('#minutes') as HTMLSpanElement;
  const secondsSpan = document.querySelector('#seconds') as HTMLSpanElement;
  const minutesValue = minutesSpan.textContent ? +minutesSpan.textContent : 25;
  const secondsValue = secondsSpan.textContent ? +secondsSpan.textContent : 0;
  const timer: Timer = new Timer(startButton, stopButton, minutesSpan, secondsSpan, minutesValue, secondsValue, session);
  timer.activate();
});

function getSessionIndex(): number {
  const sessionCount: NodeList | null = document.querySelectorAll('.complete');
  return sessionCount?.length;
}
