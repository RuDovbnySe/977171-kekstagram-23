import {photoOtherUsers} from './miniatures.js';
import {similarPhotos} from './data-photo.js';
import {similarComments} from './data-comments.js';
import {isEscEvent} from './util.js';

const bigPicture = document.querySelector('.big-picture');
const commentParent = bigPicture.querySelector('.big-picture__social');
const closeBigPictureButton = bigPicture.querySelector('#picture-cancel');
const socialComments = bigPicture.querySelector('.social__comments');
const numberComments = bigPicture.querySelector('.social__comment-count');
const newCommentLoader = bigPicture.querySelector('.comments-loader');
const body = document.querySelector('body');

// генерация списка с комментариями
const cleanSocialComments = () => {
  while(socialComments.hasChildNodes()) {
    socialComments.removeChild(socialComments.lastChild);
  }
};

cleanSocialComments();

const createComments = similarComments;

const similarCometFragment = document.createDocumentFragment();

createComments.forEach(({avatar, name, message}) => {
  const li = document.createElement('li');
  li.classList.add('social__comment');
  socialComments.appendChild(li);
  const img = document.createElement('img');
  img.classList.add('social__picture');
  img.setAttribute('src', avatar);
  img.setAttribute('alt', name);
  img.setAttribute('width',35);
  img.setAttribute('height', 35);
  li.appendChild(img);
  const paragraph = document.createElement('p');
  paragraph.classList.add('social__text');
  paragraph.textContent = message;
  li.appendChild(paragraph);

  socialComments.appendChild(li);
});


const onPopupEscKeydown = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    // eslint-disable-next-line
    closeBigPictureModal();
  }
};

// показываем блок с полной картинкой, удалив класс hidden
const openBigPictureModal = () => {
  bigPicture.classList.remove('hidden');
  numberComments.classList.add('hidden');
  newCommentLoader.classList.add('hidden');
  body.classList.add('modal-open');

  document.addEventListener('keydown', onPopupEscKeydown);
};

const closeBigPictureModal = () => {
  bigPicture.classList.add('hidden');
  numberComments.classList.remove('hidden');
  newCommentLoader.classList.remove('hidden');
  body.classList.remove('modal-open');

  document.removeEventListener('keydown', onPopupEscKeydown);
};

const pictures = Array.from(photoOtherUsers.querySelectorAll('.picture'));

photoOtherUsers.addEventListener('click', (evt) => {
  evt.preventDefault();
  // Индекс фото, которое кликнуто
  const photoIndex = pictures.indexOf(evt.target.closest('.picture'));

  // загружаем атрибуты в разметку
  bigPicture.querySelector('.big-picture__img img').src = similarPhotos[photoIndex].url;
  bigPicture.querySelector('.likes-count').textContent = similarPhotos[photoIndex].likes;
  bigPicture.querySelector('.comments-count').textContent = similarComments.length;
  bigPicture.querySelector('.social__caption').textContent = similarPhotos[photoIndex].description;

  commentParent.appendChild(similarCometFragment);

  // показываем блок с полной картинкой, удалив класс hidden
  openBigPictureModal();
});

//событие по нажатию 'Закрыть' мышкой для закрытия большого изображения
closeBigPictureButton.addEventListener('click', (evt) => {
  closeBigPictureModal(evt);
});

export {bigPicture, body};
