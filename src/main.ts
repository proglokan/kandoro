
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