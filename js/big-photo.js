import {photoOtherUsers} from './miniatures.js';
import {similarPhotos} from './data-photo.js';
import {similarComments} from './data-comments.js';

const bigPicture = document.querySelector('.big-picture');
const commentParent = bigPicture.querySelector('.big-picture__social');
const closeBigPicture = bigPicture.querySelector('#picture-cancel');

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

photoOtherUsers.addEventListener('click', (evt) => {
  evt.preventDefault();
  // Индекс фото, которое кликнуто
  // const photoIndex = photoOtherUsers.indexOf(evt.target);

  // загружаем атрибуты в разметку
  bigPicture.querySelector('.big-picture__img img').src = similarPhotos[0].url;
  bigPicture.querySelector('.likes-count').textContent = similarPhotos[0].likes;
  bigPicture.querySelector('.comments-count').textContent = similarPhotos[0].comment;
  bigPicture.querySelector('.social__caption').textContent = similarPhotos[0].description;

  commentParent.appendChild(createCommentContainer(similarComments));

  // показываем блок с полной картинкой, удалив класс hidden
  bigPicture.classList.remove('hidden');
});

// убираем блок с полной картинкой, добавив класс hidden по клику на закрывающую кнопку
closeBigPicture.addEventListener('click', (evt) => {
  evt.preventDefault();
  bigPicture.classList.add('hidden');
});

// убираем блок с полной картинкой, добавив класс hidden по нажатию escape на клавиатуре
document.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    bigPicture.classList.add('hidden');
  }
});
