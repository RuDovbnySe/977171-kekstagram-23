import {isEscEvent} from './util.js';
import {body} from './big-photo.js';
import {imgUploadPreviewPhoto, sliderElementBox} from './slider.js';

const uploadFile = document.querySelector('#upload-file');
const uploadCancel = document.querySelector('.img-upload__cancel');
const imageEditor = document.querySelector('.img-upload__overlay');
const uploadFileTextHashtags = document.querySelector('.text__hashtags');
const uploadFileTextDescriptions = document.querySelector('.text__description');
const fileChooser = document.querySelector('.img-upload__input[type=file]');
const previewPhoto = document.querySelector('.img-upload__img');
const MAX_HASHTAGS = 5;
const MIN_HASHTAGS_LENGTH = 2;
const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const onPopupEscKeydown = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();

    if (document.activeElement !== uploadFileTextHashtags && document.activeElement !== uploadFileTextDescriptions) {
      // eslint-disable-next-line
      closeImageEditor();
    }
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
  imgUploadPreviewPhoto.setAttribute('style', 'transform:scale(1)');
  imgUploadPreviewPhoto.style = null;
  imgUploadPreviewPhoto.className = 'img-upload__img';
  sliderElementBox.classList.add('hidden');
  previewPhoto.src = '';
  uploadFileTextDescriptions.value = '';
  uploadFileTextHashtags.value = '';
};

uploadFile.addEventListener('change', function () {
  if (this.value) {
    openImageEditor();
  }
});

uploadCancel.addEventListener('click', (evt) => {
  closeImageEditor(evt);
});

fileChooser.addEventListener('change', () => {
  const file = fileChooser.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      previewPhoto.src = reader.result;
    });

    reader.readAsDataURL(file);
  }
});

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

export {openImageEditor, closeImageEditor};
