import './user-modal.js';
import './user-form.js';
import './nouislider.js';
// import './filter-photo.js';
import {getData} from './api.js';
import {createPhotos, activeFilterDiscussed, activeFilterRandom, activeFilterDefault} from './miniatures.js';
import {closeImageEditor} from './user-modal.js';
import {setUserFormSubmit} from './user-form.js';

const RERENDER_DELAY = 500;

const activeFilter = (photoArray) => {
  activeFilterDiscussed(photoArray);
  activeFilterRandom(photoArray);
  activeFilterDefault(photoArray);
};

getData((photoArray) => {
  createPhotos(photoArray);
  // eslint-disable-next-line
  console.log(photoArray);
  setTimeout( () => activeFilter(photoArray), RERENDER_DELAY);
});

setUserFormSubmit(closeImageEditor);
