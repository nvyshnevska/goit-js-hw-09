import Notiflix from 'notiflix';

const refs = {
  delayRef: document.querySelector('input[name="delay"]'),
  stepRef: document.querySelector('input[name="step"]'),
  amountRef: document.querySelector('input[name="amount"]'),
  formRef: document.querySelector('.form'),
};

refs.formRef.addEventListener('submit', onFormSubmit);

function onFormSubmit(evt) {
  evt.preventDefault();

  let delay = Number(refs.delayRef.value);
  let step = Number(refs.stepRef.value);
  let amount = Number(refs.amountRef.value);
  let position = 1;

  if (delay < 0 || step < 0) {
    Notiflix.Notify.failure('Value must be a positive number');
    return;
  } else {
    for (let i = 1; i <= amount; i += 1) {
      createPromise(position, delay)
        .then(({ position, delay }) => {
          Notiflix.Notify.success(
            `✅ Fulfilled promise ${position} in ${delay}ms`
          );
        })
        .catch(({ position, delay }) => {
          Notiflix.Notify.failure(
            `❌ Rejected promise ${position} in ${delay}ms`
          );
        });
      position += 1;
      delay = delay + step;
    }
  }
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
