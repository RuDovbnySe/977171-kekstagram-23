import './user-modal.js';
import './nouislider.js';
import {getData} from './api.js';
import {createPhotos, activeFilterDiscussed, activeFilterRandom, activeFilterDefault} from './miniatures.js';
import {closeImageEditor, setUserFormSubmit} from './user-modal.js';

getData((photoArray) => {
  createPhotos(photoArray);
  // eslint-disable-next-line
  console.log(photoArray);
  activeFilterDiscussed(photoArray);
  activeFilterRandom(photoArray);
  activeFilterDefault(photoArray);
});

setUserFormSubmit(closeImageEditor);
