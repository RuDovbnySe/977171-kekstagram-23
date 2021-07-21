// import {similarPhotos} from './data-photo.js';

const photoOtherUsers = document.querySelector('.pictures');

const similarPhotoTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

// const createPhotos = similarPhotos;
const createPhotos = (photosData) => {
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

export {photoOtherUsers, createPhotos};
