import {photoOtherUsers} from './miniatures.js';
import {isEscEvent} from './util.js';

const COMMENTS_COUNT_PER_CLICK = 5;

const bigPicture = document.querySelector('.big-picture');
const closeBigPictureButton = bigPicture.querySelector('#picture-cancel');
const socialComments = bigPicture.querySelector('.social__comments');
const commentsNumber = bigPicture.querySelector('.social__comment-count');
const moreCommentLoader = bigPicture.querySelector('.comments-loader');
const body = document.querySelector('body');
const commentsLoader = document.querySelector('.comments-loader');
let photoIndex = 0;
let createPhotos;
let createComments;

// генерация списка с комментариями
const cleanSocialComments = () => {
  while (socialComments.hasChildNodes()) {
    socialComments.removeChild(socialComments.lastChild);
  }
};

cleanSocialComments();

// Функция по загрузке массива комментариев в список <ul>
const createCommentsList = () => createComments
  .slice(socialComments.children.length, socialComments.children.length + COMMENTS_COUNT_PER_CLICK)
  .forEach(({avatar, name, message}) => {
    const li = document.createElement('li');
    li.classList.add('social__comment');
    socialComments.appendChild(li);
    const img = document.createElement('img');
    img.classList.add('social__picture');
    img.setAttribute('src', avatar);
    img.setAttribute('alt', name);
    img.setAttribute('width', 35);
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
//функция отображения количества показанных комментариев
const onSiderbarClick = () => {
  if (createPhotos[photoIndex].comments.length > socialComments.children.length) {
    if ((createPhotos[photoIndex].comments.length - socialComments.children.length) > 5) {
      createCommentsList();
      bigPicture.querySelector('.comments-count-length').textContent = socialComments.children.length.toString();
    } else if ((createPhotos[photoIndex].comments.length - socialComments.children.length) === 5) {
      createCommentsList();
      bigPicture.querySelector('.comments-count-length').textContent = socialComments.children.length.toString();
      commentsLoader.classList.add('hidden');
    }
    else if ((createPhotos[photoIndex].comments.length - socialComments.children.length) < 5) {
      createCommentsList();
      bigPicture.querySelector('.comments-count-length').textContent = socialComments.children.length.toString();
      commentsLoader.classList.add('hidden');
    } else if (createPhotos[photoIndex].comments.length === socialComments.children.length) {
      commentsLoader.classList.add('hidden');
    }
  }
};

// показываем блок с полной картинкой, удалив класс hidden
const openBigPictureModal = () => {
  bigPicture.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onPopupEscKeydown);
  cleanSocialComments();
  commentsLoader.addEventListener('click', onSiderbarClick);
};

const closeBigPictureModal = () => {
  bigPicture.classList.add('hidden');
  commentsNumber.classList.remove('hidden');
  moreCommentLoader.classList.remove('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onPopupEscKeydown);
  cleanSocialComments();
  photoIndex = 0;
  commentsLoader.removeEventListener('click', onSiderbarClick);
  commentsLoader.classList.remove('hidden');
};

const getComments = (photosData, index) => {
  bigPicture.querySelector('.likes-count').textContent = photosData[index].likes.toString();
  bigPicture.querySelector('.comments-count').textContent = photosData[index].comments.length.toString();
  bigPicture.querySelector('.social__caption').textContent = photosData[index].description;
};

const updateData = (photosData) => {
  createPhotos = photosData;
};

const createOnPhotosClick = (photosData) => {
  createPhotos = photosData;

  return (evt) => {
    const picture = evt.target.closest('.picture');
    if (!picture) {
      return;
    }
    evt.preventDefault();
    const pictures = Array.from(photoOtherUsers.querySelectorAll('.picture'));
    photoIndex = pictures.indexOf(picture);
    createComments = createPhotos[photoIndex].comments;
    getComments(createPhotos, photoIndex);
    bigPicture.querySelector('.big-picture__img img').src = picture.querySelector('img').src;

    // показываем блок с полной картинкой, удалив класс hidden
    openBigPictureModal();

    createCommentsList();
    bigPicture.querySelector('.comments-count-length').textContent = socialComments.children.length.toString();
    if (socialComments.children.length === createPhotos[photoIndex].comments.length) {
      commentsLoader.classList.add('hidden');
    }
  };
};

closeBigPictureButton.addEventListener('click', (eventClose) => {
  eventClose.preventDefault();
  closeBigPictureModal();
});

export {bigPicture, body, createOnPhotosClick, updateData};
