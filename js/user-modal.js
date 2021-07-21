import {isEscEvent} from './util.js';
import {body} from './big-photo.js';
import {imgUploadPreviewPhoto, sliderElementBox} from './slider.js';

const uploadFile = document.querySelector('#upload-file');
const uploadCancel = document.querySelector('.img-upload__cancel');
const imageEditor = document.querySelector('.img-upload__overlay');

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
  imgUploadPreviewPhoto.setAttribute('style', 'transform:scale(1)');
  imgUploadPreviewPhoto.style = null;
  imgUploadPreviewPhoto.className = 'img-upload__img';
  sliderElementBox.classList.add('hidden');
};

uploadFile.addEventListener('change', function () {
  if (this.value) {
    openImageEditor();
  }
});

uploadCancel.addEventListener('click', (evt) => {
  closeImageEditor(evt);
});

export {openImageEditor, closeImageEditor};
