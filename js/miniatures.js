import {createOnPhotosClick, updateData} from './big-photo.js';
import {debounce} from './utils/debounce.js';

const NUMBER_RANDOM_FILTER_PHOTO = 10;
const RERENDER_DELAY = 500;
const photoOtherUsers = document.querySelector('.pictures');
const filterPhoto = document.querySelector('.img-filters');
const filterDefault = document.querySelector('#filter-default');
const filterRandom = document.querySelector('#filter-random');
const filterDiscussed = document.querySelector('#filter-discussed');
const filtersForm = document.querySelector('.img-filters__form');

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

const filterByDefault = (photosData) => {
  filterDefault.classList.add('img-filters__button--active');
  updateData(photosData);
  renderPhotos(photosData);
};

const filterByRandom = (photosData) => {
  filterRandom.classList.add('img-filters__button--active');
  const newData = photosData.slice()
    .sort(() => Math.random() - 0.5)
    .slice(photosData.length - NUMBER_RANDOM_FILTER_PHOTO);
  updateData(newData);
  renderPhotos(newData);
};

const filterByDiscussed = (photosData) => {
  filterDiscussed.classList.add('img-filters__button--active');
  const newData = photosData.slice().sort((a, b) => (b.comments.length - a.comments.length));
  updateData(newData);
  renderPhotos(newData);
};

const clearPreviousFilters = () => {
  photoOtherUsers.querySelectorAll('.picture').forEach((picture) => picture.remove());
  filterDiscussed.classList.remove('img-filters__button--active');
  filterDefault.classList.remove('img-filters__button--active');
  filterRandom.classList.remove('img-filters__button--active');
};

const activateFilters = (photoData) => {
  filtersForm.addEventListener('click', debounce((evt) => {
    evt.preventDefault();
    if (filterDefault.contains(evt.target)) {
      clearPreviousFilters();
      filterByDefault(photoData);
    } else if (filterRandom.contains(evt.target)) {
      clearPreviousFilters();
      filterByRandom(photoData);
    } else if (filterDiscussed.contains(evt.target)) {
      clearPreviousFilters();
      filterByDiscussed(photoData);
    }
  }, RERENDER_DELAY));
};

export {
  createPhotos,
  renderPhotos,
  photoOtherUsers,
  activateFilters
};
