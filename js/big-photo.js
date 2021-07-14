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
let NumberCommetsLoad = 5;

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

const loadMoreComments = (similarPhotosCommentslength) => {
  (commentsLoader.addEventListener('click', (event) => {
    event.preventDefault();
    if (similarPhotosCommentslength > socialComments.children.length) {
      if ((similarPhotosCommentslength - socialComments.children.length) >= 5) {
        // NumberCommetsLoad += 5;
        createCommentsList(NumberCommetsLoad);
        bigPicture.querySelector('.comments-count-length').textContent = socialComments.children.length;
        // eslint-disable-next-line
        console.log('Догружаем 5 комментов  ' + NumberCommetsLoad);
      } else if ((similarPhotosCommentslength - socialComments.children.length) < 5) {
        NumberCommetsLoad = (similarPhotosCommentslength - socialComments.children.length);
        createCommentsList(NumberCommetsLoad);
        bigPicture.querySelector('.comments-count-length').textContent = socialComments.children.length;
        commentsLoader.classList.add('hidden');
        // eslint-disable-next-line
        console.log('Догружаем остаток комментов  ' + NumberCommetsLoad);
      } else if (similarPhotosCommentslength === socialComments.children.length) {
        commentsLoader.classList.add('hidden');
        // eslint-disable-next-line
        console.log('Все комменты выгружены' + NumberCommetsLoad);
        // eslint-disable-next-line
        commentsLoader.removeEventListener('click', event);
      }
    }
  }));
};

const onPopupEscKeydown = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    // eslint-disable-next-line
    closeBigPictureModal();
    document.removeEventListener('click', loadMoreComments);
  }
};

// показываем блок с полной картинкой, удалив класс hidden
const openBigPictureModal = () => {
  bigPicture.classList.remove('hidden');
  body.classList.add('modal-open');

  document.addEventListener('keydown', onPopupEscKeydown);
  cleanSocialComments();
  NumberCommetsLoad = 5;
  document.removeEventListener('click', loadMoreComments);
};

const closeBigPictureModal = () => {
  bigPicture.classList.add('hidden');
  commentsNumber.classList.remove('hidden');
  moreCommentLoader.classList.remove('hidden');
  body.classList.remove('modal-open');

  document.removeEventListener('keydown', onPopupEscKeydown);
  cleanSocialComments();
  NumberCommetsLoad = 5;
  commentsLoader.removeEventListener('click', loadMoreComments);
};

const pictures = Array.from(photoOtherUsers.querySelectorAll('.picture'));

photoOtherUsers.addEventListener('click', (evt) => {
  if (!evt.target.closest('.picture')) {
    return;
  }
  evt.preventDefault();
  // Индекс фото, которое кликнуто
  const photoIndex = pictures.indexOf(evt.target.closest('.picture'));
  const similarPhotosCommentslength = similarPhotos[photoIndex].comments.length;
  // загружаем атрибуты в разметку
  bigPicture.querySelector('.big-picture__img img').src = similarPhotos[photoIndex].url;
  bigPicture.querySelector('.likes-count').textContent = similarPhotos[photoIndex].likes;
  bigPicture.querySelector('.comments-count').textContent = similarPhotos[photoIndex].comments.length;
  bigPicture.querySelector('.social__caption').textContent = similarPhotos[photoIndex].description;

  // показываем блок с полной картинкой, удалив класс hidden
  openBigPictureModal();
  NumberCommetsLoad = 5;

  //загружаю первые 5 комментов
  if (similarPhotosCommentslength <= NumberCommetsLoad) {
    createCommentsList(similarPhotosCommentslength);
    bigPicture.querySelector('.comments-count-length').textContent = socialComments.children.length;
    commentsLoader.classList.add('hidden');
  } else if (createComments.length < similarPhotosCommentslength) {
    createCommentsList(createComments.length);
    bigPicture.querySelector('.comments-count-length').textContent = socialComments.children.length;
    commentsLoader.classList.add('hidden');
  } else if (createComments.length > similarPhotosCommentslength) {
    createCommentsList(NumberCommetsLoad);
    bigPicture.querySelector('.comments-count-length').textContent = socialComments.children.length;
    loadMoreComments(event);
  } else if (createComments.length === similarPhotosCommentslength) {
    createCommentsList(NumberCommetsLoad);
    bigPicture.querySelector('.comments-count-length').textContent = socialComments.children.length;
    commentsLoader.classList.add('hidden');
  }
  loadMoreComments(similarPhotosCommentslength);
  // eslint-disable-next-line
  console.log(socialComments.children.length + ' из ' + similarPhotos[photoIndex].comments.length);
});

//событие по нажатию 'Закрыть' мышкой для закрытия большого изображения
closeBigPictureButton.addEventListener('click', (evt) => {
  closeBigPictureModal(evt);
  commentsLoader.classList.remove('hidden');
  document.removeEventListener('click', loadMoreComments);
});

export {bigPicture, body};
