// удалить эту строку потом
import {isEscEvent} from './util.js';

const body = document.querySelector('body');

// и раскомментировать эту
// всё из-за наложения слушателей событий, нужно из big-foto исключить блок с загрузкой фото
// import {body} from './big-photo.js';

const uploadFile = document.querySelector('#upload-file');
const uploadCancel = document.querySelector('.img-upload__cancel');
const imageEditor = document.querySelector('.img-upload__overlay');
const uploadFileTextHashtags = document.querySelector('.text__hashtags');
// const uploadFileTextDescription = document.querySelector('.text__description');
const MIN_HASHTAG_LENGTH = 2;
const MAX_HASHTAG_LENGTH = 20;

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
  const valueLength = uploadFileTextHashtags.value.length;
  const regular = /^#[A-Za-zА-Яа-я0-9]{1,19}$/;

  if (valueLength < MIN_HASHTAG_LENGTH) {
    uploadFileTextHashtags.setCustomValidity(`Ещё ${MIN_HASHTAG_LENGTH - valueLength} симв.`);
  } else if (valueLength > MAX_HASHTAG_LENGTH) {
    uploadFileTextHashtags.setCustomValidity(`Удалите лишние ${valueLength - MAX_HASHTAG_LENGTH} симв.`);
  } else if (regular.test(uploadFileTextHashtags.value)) {
    uploadFileTextHashtags.setCustomValidity('Некорректный хэштег');
  } else if (uploadFileTextHashtags.value[0] !== '#') {
    uploadFileTextHashtags.setCustomValidity('Первый символ хештега обязательно #');
  } else {
    uploadFileTextHashtags.setCustomValidity('');
  }

  // const output = uploadFileTextHashtags.value.join(' #');
  // console.log(output);

  uploadFileTextHashtags.reportValidity();
});
