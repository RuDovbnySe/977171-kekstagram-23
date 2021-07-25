import './user-modal.js';
import './nouislider.js';
import {getData} from './api.js';
import {createPhotos, activateFilters} from './miniatures.js';
import {closeImageEditor, setUserFormSubmit} from './user-modal.js';

getData((photoArray) => {
  createPhotos(photoArray);
  activateFilters(photoArray);
});

setUserFormSubmit(closeImageEditor);
