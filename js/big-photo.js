import {photoOtherUsers} from './miniatures.js';
import {similarPhotos} from './data-photo.js';
import {similarComments} from './data-comments.js';
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

// генерация списка с комментариями
const cleanSocialComments = () => {
  while (socialComments.hasChildNodes()) {
    socialComments.removeChild(socialComments.lastChild);
  }
};

cleanSocialComments();

const createComments = similarComments;

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

const handlerLoadComments = () => {
  if (similarPhotos[photoIndex].comments.length > socialComments.children.length) {
    if ((similarPhotos[photoIndex].comments.length - socialComments.children.length) >= 5) {
      createCommentsList(numberCommetsLoad);
      bigPicture.querySelector('.comments-count-length').textContent = socialComments.children.length;
      // eslint-disable-next-line
      console.log('Догружаем 5 комментов  ' + numberCommetsLoad);
    } else if ((similarPhotos[photoIndex].comments.length - socialComments.children.length) < 5) {
      numberCommetsLoad = (similarPhotos[photoIndex].comments.length - socialComments.children.length);
      createCommentsList(numberCommetsLoad);
      bigPicture.querySelector('.comments-count-length').textContent = socialComments.children.length;
      commentsLoader.classList.add('hidden');
      // eslint-disable-next-line
      console.log('Догружаем остаток комментов  ' + numberCommetsLoad);
    } else if (similarPhotos[photoIndex].comments.length === socialComments.children.length) {
      commentsLoader.classList.add('hidden');
      // eslint-disable-next-line
      console.log('Все комменты выгружены' + numberCommetsLoad);
    }
  }
  // eslint-disable-next-line
  console.log(socialComments.children.length + ' из ' + similarPhotos[photoIndex].comments.length);
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

const pictures = Array.from(photoOtherUsers.querySelectorAll('.picture'));

photoOtherUsers.addEventListener('click', (evt) => {
  if (!evt.target.closest('.picture')) {
    return;
  }
  evt.preventDefault();
  // Индекс фото, которое кликнуто
  photoIndex = pictures.indexOf(evt.target.closest('.picture'));
  // загружаем атрибуты в разметку
  bigPicture.querySelector('.big-picture__img img').src = similarPhotos[photoIndex].url;
  bigPicture.querySelector('.likes-count').textContent = similarPhotos[photoIndex].likes;
  bigPicture.querySelector('.comments-count').textContent = similarPhotos[photoIndex].comments.length;
  bigPicture.querySelector('.social__caption').textContent = similarPhotos[photoIndex].description;

  // показываем блок с полной картинкой, удалив класс hidden
  openBigPictureModal();

  //загружаю первые 5 комментов
  if (similarPhotos[photoIndex].comments.length >= numberCommetsLoad) {
    createCommentsList(numberCommetsLoad);
    bigPicture.querySelector('.comments-count-length').textContent = socialComments.children.length;
  }  else {
    createCommentsList(similarPhotos[photoIndex].comments.length);
    bigPicture.querySelector('.comments-count-length').textContent = socialComments.children.length;
    commentsLoader.classList.add('hidden');
  }
  // eslint-disable-next-line
  console.log(socialComments.children.length + ' из ' + similarPhotos[photoIndex].comments.length);
});
closeBigPictureButton.addEventListener('click', (eventClose) => {
  eventClose.preventDefault();
  closeBigPictureModal();
});
export {bigPicture, body};
