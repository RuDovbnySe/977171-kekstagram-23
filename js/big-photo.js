import {photoOtherUsers} from './miniatures.js';
import {similarPhotos} from './data-photo.js';
import {similarComments} from './data-comments.js';
import {isEscEvent} from './util.js';

const bigPicture = document.querySelector('.big-picture');
const commentParent = bigPicture.querySelector('.big-picture__social');
const closeBigPictureButton = bigPicture.querySelector('#picture-cancel');

// генерация списка с комментариями
const createCommentContainer = (array) => {
  const list = document.createElement('ul');
  list.classList.add('social__comments');
  for (let index = 0; index < array.length; index++) {
    const li = document.createElement('li');
    li.classList.add('social__comment');
    list.appendChild(li);
    const img = document.createElement('img');
    img.classList.add('social__picture');
    img.setAttribute('src', array[index].avatar);
    img.setAttribute('alt', array[index].name);
    li.appendChild(img);
    const paragraph = document.createElement('p');
    paragraph.classList.add('social__text');
    paragraph.textContent = array[index].message;
    li.appendChild(paragraph);
  }

  return list;
};

// показываем блок с полной картинкой, удалив класс hidden
const openBigPictureModal = () => {
  bigPicture.classList.remove('hidden');

  document.removeEventListener('keydown', (evt) => {
    if (isEscEvent(evt)) {
      evt.preventDefault();
      bigPicture.classList.add('hidden');
    }
  });
};

const closeBigPictureModal = () => {
  bigPicture.classList.add('hidden');

  document.removeEventListener('keydown', (evt) => {
    if (isEscEvent(evt)) {
      evt.preventDefault();
      bigPicture.classList.add('hidden');
    }
  });
};


photoOtherUsers.addEventListener('click', (evt) => {
  evt.preventDefault();
  // Индекс фото, которое кликнуто
  const pictures = Array.from(photoOtherUsers.querySelectorAll('.picture'));
  const photoIndex = pictures.indexOf(evt.target.closest('.picture'));

  // загружаем атрибуты в разметку
  bigPicture.querySelector('.big-picture__img img').src = similarPhotos[photoIndex].url;
  bigPicture.querySelector('.likes-count').textContent = similarPhotos[photoIndex].likes;
  bigPicture.querySelector('.comments-count').textContent = similarPhotos[photoIndex].comment;
  bigPicture.querySelector('.social__caption').textContent = similarPhotos[photoIndex].description;

  commentParent.appendChild(createCommentContainer(similarComments));

  // показываем блок с полной картинкой, удалив класс hidden
  openBigPictureModal();
});

//событие по нажатию 'Закрыть' мышкой для закрытия большого изображения
closeBigPictureButton.addEventListener('click', (evt) => {
  closeBigPictureModal(evt);
});

//Событие по нажатию Escape для закрытия большого изображения
document.addEventListener('keydown', (evt) => {
  if (isEscEvent(evt)) {
    closeBigPictureModal();
  }
});

export {bigPicture};
