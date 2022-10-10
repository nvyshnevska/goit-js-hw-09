import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const refs = {
  dateInput: document.querySelector('#datetime-picker'),
  startBtn: document.querySelector('[data-start]'),
  dataDays: document.querySelector('[data-days]'),
  dataHours: document.querySelector('[data-hours]'),
  dataMinutes: document.querySelector('[data-minutes]'),
  dataSeconds: document.querySelector('[data-seconds]'),
};

refs.startBtn.setAttribute('disabled', true);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    let selectedDate = selectedDates[0];

    if (selectedDate <= Date.now()) {
      Notiflix.Notify.failure('Please choose a date in the future', {
        position: 'center-center',
        backOverlay: true,
        clickToClose: true,
      });
      return;
    }

    refs.startBtn.removeAttribute('disabled');

    const timer = new Timer({
      onTick: updateTimerInterface,
      targetDate: selectedDate,
    });

    refs.startBtn.addEventListener('click', timer.start.bind(timer));
  },
};

flatpickr(refs.dateInput, options);

class Timer {
  constructor({ onTick, targetDate }) {
    this.intervalId = null;
    this.onTick = onTick;
    this.targetDate = targetDate;
  }

  start() {
    this.intervalId = setInterval(() => {
      const timeLeft = this.targetDate.getTime() - Date.now();
      if (timeLeft <= 0) {
        clearInterval(this.intervalId);
        return;
      }
      const timeLeftConverted = this.convertMs(timeLeft);
      this.onTick(timeLeftConverted);
    }, 1000);
  }

  convertMs(timeLeft) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const days = this.addLeadingZero(Math.floor(timeLeft / day));
    const hours = this.addLeadingZero(Math.floor((timeLeft % day) / hour));
    const minutes = this.addLeadingZero(
      Math.floor(((timeLeft % day) % hour) / minute)
    );
    const seconds = this.addLeadingZero(
      Math.floor((((timeLeft % day) % hour) % minute) / second)
    );

    return { days, hours, minutes, seconds };
  }

  addLeadingZero(value) {
    return String(value).padStart(2, '0');
  }
}

function updateTimerInterface({ days, hours, minutes, seconds }) {
  refs.dataDays.textContent = `${days}`;
  refs.dataHours.textContent = `${hours}`;
  refs.dataMinutes.textContent = `${minutes}`;
  refs.dataSeconds.textContent = `${seconds}`;
}
