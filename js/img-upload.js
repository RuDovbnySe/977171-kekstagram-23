import {isEscEvent} from './util.js';
// потом удалить эту строку
// const body = document.querySelector('body');

// и раскомментировать эту
// всё из-за наложения слушателей событий, нужно из big-foto исключить блок с загрузкой фото
import {body} from './big-photo.js';

const uploadFile = document.querySelector('#upload-file');
const uploadCancel = document.querySelector('.img-upload__cancel');
const imageEditor = document.querySelector('.img-upload__overlay');
const uploadFileTextHashtags = document.querySelector('.text__hashtags');
const uploadFileContainer = document.querySelector('.img-upload__start');
// const uploadFileTextDescription = document.querySelector('.text__description');
const MIN_HASHTAG_LENGTH = 2;
// const MAX_HASHTAG_LENGTH = 20;
const MAX_HASHTAGS = 5;

uploadFileContainer.removeEventListener('click', (evt) => evt);

const onPopupEscKeydown = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    // eslint-disable-next-line
    closeImageEditor();
  }
};

const openImageEditor = () => {
  body.classList.add('modal-open');
  imageEditor.classList.remove('hidden');

  document.addEventListener('keydown', onPopupEscKeydown);
};

const closeImageEditor = () => {
  body.classList.remove('modal-open');
  imageEditor.classList.add('hidden');
  uploadFile.value = '';

  document.removeEventListener('keydown', onPopupEscKeydown);
};

uploadFile.addEventListener('change', function () {
  if (this.value) {
    openImageEditor();
  }
});

uploadCancel.addEventListener('click', (evt) => {
  closeImageEditor(evt);
});

//вывод сообщения при некорректном вводе хэштега
uploadFileTextHashtags.addEventListener('input', () => {
  const regular = /^#(?=.*[^0-9])[a-zA-Zа-яА-ЯЁё0-9]{1,19}$/;

  const tags = uploadFileTextHashtags.value
    .trim() // удаляем пробелы в начале и в конце строки
    .toLowerCase() //хэш-теги нечувствительны к регистру
    .split(' ')// преобразуем строку в массив, пробел используется как разделитель
    .filter((tag) => tag); //удаляем пустые тэги, если пользователь ввёл несколько пробелов

  const tagsArray = new Set(tags);
  let numberTags = 0;
  const checkNumberTags = () => {
    if (tags.length > MAX_HASHTAGS) {
      numberTags = 1;
    }
  };
  checkNumberTags();

  tagsArray.forEach((tag) => {
    if (tag.length < MIN_HASHTAG_LENGTH) {
      uploadFileTextHashtags.setCustomValidity(`Ещё ${MIN_HASHTAG_LENGTH - tag.length} симв.`);
    } else if (!regular.test(tag)) {
      uploadFileTextHashtags.setCustomValidity('Некорректный хэштег');
    } else if (numberTags === 1) {
      uploadFileTextHashtags.setCustomValidity('Максимально 5 хештегов, пожалуйста удалите лишние');
    } else {
      uploadFileTextHashtags.setCustomValidity('');
    }
  });

  uploadFileTextHashtags.reportValidity();
});
