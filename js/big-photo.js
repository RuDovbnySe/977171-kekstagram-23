import {photoOtherUsers} from './miniatures.js';
import {similarPhotos} from './data-photo.js';
import {similarComments} from './data-comments.js';
import {isEscEvent} from './util.js';

const bigPicture = document.querySelector('.big-picture');
// const commentParent = bigPicture.querySelector('.big-picture__social');
const closeBigPictureButton = bigPicture.querySelector('#picture-cancel');
const socialComments = bigPicture.querySelector('.social__comments');

const commentsNumber = bigPicture.querySelector('.social__comment-count');
const moreCommentLoader = bigPicture.querySelector('.comments-loader');
const body = document.querySelector('body');

const commentsLoader = document.querySelector('.comments-loader');
let NUMBER_COMMENTS_LOAD = 5;

// генерация списка с комментариями
const cleanSocialComments = () => {
  while (socialComments.hasChildNodes()) {
    socialComments.removeChild(socialComments.lastChild);
  }
};

cleanSocialComments();

const createComments = similarComments;

// const similarCometFragment = document.createDocumentFragment();

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

// показываем блок с полной картинкой, удалив класс hidden
const openBigPictureModal = () => {
  bigPicture.classList.remove('hidden');
  // commentsNumber.classList.add('hidden');
  // moreCommentLoader.classList.add('hidden');
  body.classList.add('modal-open');

  document.addEventListener('keydown', onPopupEscKeydown);
};

const closeBigPictureModal = () => {
  bigPicture.classList.add('hidden');
  commentsNumber.classList.remove('hidden');
  moreCommentLoader.classList.remove('hidden');
  body.classList.remove('modal-open');

  document.removeEventListener('keydown', onPopupEscKeydown);
  cleanSocialComments();
  NUMBER_COMMENTS_LOAD = 5;
  // eslint-disable-next-line
  console.log(NUMBER_COMMENTS_LOAD);
};

const pictures = Array.from(photoOtherUsers.querySelectorAll('.picture'));

photoOtherUsers.addEventListener('click', (evt) => {
  if (!evt.target.closest('.picture')) {
    return;
  }
  evt.preventDefault();
  // Индекс фото, которое кликнуто
  const photoIndex = pictures.indexOf(evt.target.closest('.picture'));

  // загружаем атрибуты в разметку
  bigPicture.querySelector('.big-picture__img img').src = similarPhotos[photoIndex].url;
  bigPicture.querySelector('.likes-count').textContent = similarPhotos[photoIndex].likes;
  bigPicture.querySelector('.comments-count').textContent = similarPhotos[photoIndex].comments.length;
  bigPicture.querySelector('.social__caption').textContent = similarPhotos[photoIndex].description;

  // commentParent.appendChild(similarCometFragment);

  // показываем блок с полной картинкой, удалив класс hidden
  openBigPictureModal();
  NUMBER_COMMENTS_LOAD = 5;
  //загружаю первые 5 комментов
  if (similarPhotos[photoIndex].comments.length <= NUMBER_COMMENTS_LOAD) {
    createCommentsList(similarPhotos[photoIndex].comments.length);
    bigPicture.querySelector('.comments-count-length').textContent = socialComments.children.length;
  } else if (createComments.length < similarPhotos[photoIndex].comments.length) {
    createCommentsList(createComments.length);
    bigPicture.querySelector('.comments-count-length').textContent = socialComments.children.length;
  } else if (createComments.length >= similarPhotos[photoIndex].comments.length) {
    createCommentsList(NUMBER_COMMENTS_LOAD);
    bigPicture.querySelector('.comments-count-length').textContent = socialComments.children.length;
  }

  commentsLoader.addEventListener('click', (event) => {
    event.preventDefault();
    if (similarPhotos[photoIndex].comments.length > socialComments.children.length) {
      if ((similarPhotos[photoIndex].comments.length - socialComments.children.length) >= 5) {
        // NUMBER_COMMENTS_LOAD += 5;
        createCommentsList(NUMBER_COMMENTS_LOAD);
        bigPicture.querySelector('.comments-count-length').textContent = socialComments.children.length;
        // eslint-disable-next-line
        console.log('Догружаем 5 комментов  ' + NUMBER_COMMENTS_LOAD);
      } else if ((similarPhotos[photoIndex].comments.length - socialComments.children.length) < 5) {
        NUMBER_COMMENTS_LOAD = (similarPhotos[photoIndex].comments.length - socialComments.children.length);
        createCommentsList(NUMBER_COMMENTS_LOAD);
        bigPicture.querySelector('.comments-count-length').textContent = socialComments.children.length;
        // eslint-disable-next-line
        console.log('Догружаем остаток комментов  ' + NUMBER_COMMENTS_LOAD);
      } else if (similarPhotos[photoIndex].comments.length === socialComments.children.length) {
        // eslint-disable-next-line
        console.log('Все комменты выгружены' + NUMBER_COMMENTS_LOAD);
      }
    }

    // eslint-disable-next-line
    console.log(socialComments.children.length + ' из ' + similarPhotos[photoIndex].comments.length);
    // eslint-disable-next-line
    console.log(NUMBER_COMMENTS_LOAD);
  });
});

//событие по нажатию 'Закрыть' мышкой для закрытия большого изображения
closeBigPictureButton.addEventListener('click', (evt) => {
  closeBigPictureModal(evt);
});

export {bigPicture, body};
