import {createOnPhotosClick} from './big-photo.js';

const photoOtherUsers = document.querySelector('.pictures');

const similarPhotoTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

const renderPhotos = (photosData) => {
  const similarPhotoFragment = document.createDocumentFragment();
  photosData.forEach(({url, comments, likes}) => {
    const photoElement = similarPhotoTemplate.cloneNode(true);
    photoElement.querySelector('.picture__img').src = url;
    photoElement.querySelector('.picture__comments').textContent = comments.length;
    photoElement.querySelector('.picture__likes').textContent = likes;
    similarPhotoFragment.appendChild(photoElement);
  });
  photoOtherUsers.appendChild(similarPhotoFragment);
};

const createPhotos = (photosData) => {
  renderPhotos(photosData);
  photoOtherUsers.addEventListener('click', createOnPhotosClick(photosData));
};

export {photoOtherUsers, createPhotos, renderPhotos};
