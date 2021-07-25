import {createOnPhotosClick} from './big-photo.js';
import {debounce} from './utils/debounce.js';

const photoOtherUsers = document.querySelector('.pictures');
const filterPhoto = document.querySelector('.img-filters');
const filterDefault = document.querySelector('#filter-default');
const filterRandom = document.querySelector('#filter-random');
const filterDiscussed = document.querySelector('#filter-discussed');
const filtersForm = document.querySelector('.img-filters__form');
const NUMBER_RANDOM_FILTER_PHOTO = 10;
const RERENDER_DELAY = 500;

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
  filterPhoto.classList.remove('img-filters--inactive');
};

const createPhotos = (photosData) => {
  renderPhotos(photosData);
  photoOtherUsers.addEventListener('click', createOnPhotosClick(photosData));
};

//Фильтрация фото
//отрисовка по умолчанию, т.е. по данным от сервера
const activeFilterDefault = (photosData) => {
  filterDefault.addEventListener('click', debounce((evt) => {
    evt.preventDefault();
    filterDiscussed.classList.remove('img-filters__button--active');
    filterDefault.classList.add('img-filters__button--active');
    filterRandom.classList.remove('img-filters__button--active');

    const getRemovePhoto = document.querySelectorAll('.picture');
    for (let i = 0; i < getRemovePhoto.length; i++) {
      getRemovePhoto[i].remove();
    }

    const similarPhotoFragment = document.createDocumentFragment();
    photosData
      .forEach(({url, comments, likes}) => {
        const photoElement = similarPhotoTemplate.cloneNode(true);
        photoElement.querySelector('.picture__img').src = url;
        photoElement.querySelector('.picture__comments').textContent = comments.length;
        photoElement.querySelector('.picture__likes').textContent = likes;
        similarPhotoFragment.appendChild(photoElement);
      });
    photoOtherUsers.appendChild(similarPhotoFragment);
    filterPhoto.classList.remove('img-filters--inactive');
  }, RERENDER_DELAY));
};
//отрисовка 10 рандомных, не повторяющихся фото
const activeFilterRandom = (photosData) => {
  filterRandom.addEventListener('click', debounce((evt) => {
    evt.preventDefault();
    filterDiscussed.classList.remove('img-filters__button--active');
    filterDefault.classList.remove('img-filters__button--active');
    filterRandom.classList.add('img-filters__button--active');

    const getRemovePhoto = document.querySelectorAll('.picture');
    for (let i = 0; i < getRemovePhoto.length; i++) {
      getRemovePhoto[i].remove();
    }

    const similarPhotoFragment = document.createDocumentFragment();
    photosData
      .slice()
      .sort(() => Math.random() - 0.5)
      .slice(photosData.length - NUMBER_RANDOM_FILTER_PHOTO)
      .forEach(({url, comments, likes}) => {
        const photoElement = similarPhotoTemplate.cloneNode(true);
        photoElement.querySelector('.picture__img').src = url;
        photoElement.querySelector('.picture__comments').textContent = comments.length;
        photoElement.querySelector('.picture__likes').textContent = likes;
        similarPhotoFragment.appendChild(photoElement);
      });
    photoOtherUsers.appendChild(similarPhotoFragment);
    filterPhoto.classList.remove('img-filters--inactive');
  }, RERENDER_DELAY));
};

//отрисовка с сортировкой по количеству комментов
const activeFilterDiscussed = (photosData) => {
  filterDiscussed.addEventListener('click', debounce((evt) => {
    evt.preventDefault();
    filterDefault.classList.remove('img-filters__button--active');
    filterRandom.classList.remove('img-filters__button--active');
    filterDiscussed.classList.add('img-filters__button--active');

    const getRemovePhoto = document.querySelectorAll('.picture');
    for (let i = 0; i < getRemovePhoto.length; i++) {
      getRemovePhoto[i].remove();
    }

    const similarPhotoFragment = document.createDocumentFragment();
    photosData
      .slice()
      .sort((a, b) => (b.comments.length - a.comments.length))
      .forEach(({url, comments, likes}) => {
        const photoElement = similarPhotoTemplate.cloneNode(true);
        photoElement.querySelector('.picture__img').src = url;
        photoElement.querySelector('.picture__comments').textContent = comments.length;
        photoElement.querySelector('.picture__likes').textContent = likes;
        similarPhotoFragment.appendChild(photoElement);
      });
    photoOtherUsers.appendChild(similarPhotoFragment);
    filterPhoto.classList.remove('img-filters--inactive');
  }, RERENDER_DELAY));
};

filtersForm.addEventListener('click', debounce((evt) => {
  evt.preventDefault();
}, RERENDER_DELAY));

export {
  createPhotos,
  renderPhotos,
  activeFilterDiscussed,
  activeFilterRandom,
  activeFilterDefault,
  photoOtherUsers};
