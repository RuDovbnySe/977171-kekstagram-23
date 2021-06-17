import {similarPhotos} from './data-photo';

const photoOtherUsers = document.querySelector('.pictures');

const similarPhotoTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

const createPhotos = similarPhotos();

const similarPhotoFragment = document.createDocumentFragment();

createPhotos.forEach(({url, comments, likes}) => {
  const photoElement = similarPhotoTemplate.cloneNode(true);
  photoElement.querySelector('.picture__img').src = url;
  photoElement.querySelector('.picture__comments').textContent = comments;
  photoElement.querySelector('.picture__likes').textContent = likes;
  similarPhotoFragment.appendChild(photoElement);
});

photoOtherUsers.appendChild(similarPhotoFragment);

export {photoOtherUsers};
