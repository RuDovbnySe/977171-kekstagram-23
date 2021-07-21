import {photoOtherUsers} from './miniatures.js';
import {isEscEvent} from './util.js';

const bigPicture = document.querySelector('.big-picture');
const closeBigPictureButton = bigPicture.querySelector('#picture-cancel');
const socialComments = bigPicture.querySelector('.social__comments');
const commentsNumber = bigPicture.querySelector('.social__comment-count');
const moreCommentLoader = bigPicture.querySelector('.comments-loader');
const body = document.querySelector('body');
const commentsLoader = document.querySelector('.comments-loader');
let numberCommetsLoad = 5;
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
const createCommentsList = (startLength) => createComments
  .slice(0, startLength)
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
const handlerLoadComments = () => {
  if (createPhotos[photoIndex].comments.length > socialComments.children.length) {
    if ((createPhotos[photoIndex].comments.length - socialComments.children.length) > 5) {
      createCommentsList(numberCommetsLoad);
      bigPicture.querySelector('.comments-count-length').textContent = socialComments.children.length;
    } else if ((createPhotos[photoIndex].comments.length - socialComments.children.length) === 5) {
      createCommentsList(numberCommetsLoad);
      bigPicture.querySelector('.comments-count-length').textContent = socialComments.children.length;
      commentsLoader.classList.add('hidden');
    }
    else if ((createPhotos[photoIndex].comments.length - socialComments.children.length) < 5) {
      numberCommetsLoad = (createPhotos[photoIndex].comments.length - socialComments.children.length);
      createCommentsList(numberCommetsLoad);
      bigPicture.querySelector('.comments-count-length').textContent = socialComments.children.length;
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
  numberCommetsLoad = 5;
  commentsLoader.addEventListener('click', handlerLoadComments);
};
const closeBigPictureModal = () => {
  bigPicture.classList.add('hidden');
  commentsNumber.classList.remove('hidden');
  moreCommentLoader.classList.remove('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onPopupEscKeydown);
  cleanSocialComments();
  numberCommetsLoad = 0;
  photoIndex = 0;
  commentsLoader.removeEventListener('click', handlerLoadComments);
  commentsLoader.classList.remove('hidden');
};

const getComments = (photosData, index) => {
  // bigPicture.querySelector('.big-picture__img img').src = photosData.url;
  bigPicture.querySelector('.likes-count').textContent = photosData[index].likes;
  bigPicture.querySelector('.comments-count').textContent = photosData[index].comments.length;
  bigPicture.querySelector('.social__caption').textContent = photosData[index].description;
};

const createOnPhotosClick = (photosData) => {
  const pictures = Array.from(photoOtherUsers.querySelectorAll('.picture'));
  createPhotos = photosData;

  return (evt) => {
    if (!evt.target.closest('.picture')) {
      return;
    }
    evt.preventDefault();
    photoIndex = pictures.indexOf(evt.target.closest('.picture'));
    createComments = photosData[photoIndex].comments;
    getComments(photosData, photoIndex);
    bigPicture.querySelector('.big-picture__img img').src = evt.target.src;

    // показываем блок с полной картинкой, удалив класс hidden
    openBigPictureModal();

    //загружаю первые 5 комментов
    if (photosData[photoIndex].comments.length > numberCommetsLoad) {
      createCommentsList(numberCommetsLoad);
      bigPicture.querySelector('.comments-count-length').textContent = socialComments.children.length;
    }  else {
      createCommentsList(photosData[photoIndex].comments.length);
      bigPicture.querySelector('.comments-count-length').textContent = socialComments.children.length;
      commentsLoader.classList.add('hidden');
    }
  };
};

closeBigPictureButton.addEventListener('click', (eventClose) => {
  eventClose.preventDefault();
  closeBigPictureModal();
});

export {bigPicture, body, createOnPhotosClick};
