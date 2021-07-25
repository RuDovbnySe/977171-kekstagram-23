const ALERT_SHOW_TIME = 5000;

// событие на кнопке Escape
const isEscEvent = (evt) => evt.key === 'Escape' || evt.key === 'Esc';
//рандомное число из диапазона
const getRandomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);
// рандомный элемент массива
const getRandomArrayElement = (elements) => elements[getRandomNumber(0, elements.length - 1)];

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = 100;
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = 0;
  alertContainer.style.top = 0;
  alertContainer.style.right = 0;
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

export {getRandomArrayElement, getRandomNumber, isEscEvent, showAlert};
