const refs = {
  startBtn: document.querySelector('[data-start]'),
  stopBtn: document.querySelector('[data-stop]'),
  body: document.querySelector('body'),
};

const NEW_COLOR_DELAY = 1000;
let intervalId = null;
let startDisabled = false;

refs.startBtn.addEventListener('click', onStartClick);
refs.stopBtn.addEventListener('click', onStopClick);

function onStartClick() {
  if (!startDisabled) {
    startDisabled = true;
    intervalId = setInterval(() => {
      const currentColor = getRandomHexColor();
      refs.body.style.backgroundColor = currentColor;
    }, NEW_COLOR_DELAY);
  }
}

function onStopClick() {
  clearInterval(intervalId);
  startDisabled = false;
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
