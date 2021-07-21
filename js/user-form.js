import {showAlert} from './util.js';
import {sendData} from './api.js';

const uploadFileTextHashtags = document.querySelector('.text__hashtags');
const hashtagsForm = document.querySelector('.img-upload__form');

const MAX_HASHTAGS = 5;
const MIN_HASHTAGS_LENGTH = 2;

//вывод сообщения при некорректном вводе хэштега
uploadFileTextHashtags.addEventListener('input', () => {
  const regular = /^#(?=.*[^0-9])[a-zA-Zа-яА-ЯЁё0-9]{1,19}$/;

  const tags = uploadFileTextHashtags.value
    .trim() // удаляем пробелы в начале и в конце строки
    .toLowerCase() //приводим все символы к нижнему регистру для проверки на дубли
    .split(' ') // преобразуем строку в массив, пробел используется как разделитель
    .filter((tag) => tag); //удаляем пустые тэги, если пользователь ввёл несколько пробелов

  const tagsArray = new Set(tags);


  if (tags.length > MAX_HASHTAGS) {
    uploadFileTextHashtags.setCustomValidity('Максимально 5 хештегов, пожалуйста удалите лишние');
  } else if (tags.length > 0 && tagsArray.size < tags.length) {
    uploadFileTextHashtags.setCustomValidity('Обнаружены повторяющиеся хештеги, пожалуйста удалите лишние');
  } else if (tags.find((tag) => tag.length < MIN_HASHTAGS_LENGTH)) {
    uploadFileTextHashtags.setCustomValidity('Минимальное количество символов Хештега 2');
  } else if (tags.find((tag) => !regular.test(tag))) {
    uploadFileTextHashtags.setCustomValidity('Некорректный хэштег');
  } else {
    uploadFileTextHashtags.setCustomValidity('');
  }

  uploadFileTextHashtags.reportValidity();
});

//отправка формы в фоновом режиме (без обновления страницы).
const setUserFormSubmit = (onSuccess) => {
  hashtagsForm.addEventListener('submit', (evt) => {
    //отменяем действия по умолчанию (отправка с обновлением)
    evt.preventDefault();
    sendData(
      () => onSuccess(),
      () => showAlert('Не удалось отправить форму. Попробуйте ещё раз'),
      new FormData(evt.target),
    );
  });
};

export {setUserFormSubmit};
