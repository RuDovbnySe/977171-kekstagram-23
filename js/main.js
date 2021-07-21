import './user-modal.js';
import './user-form.js';
import './nouislider.js';
import {getData} from './api.js';
import {createPhotos} from './miniatures.js';
import {closeImageEditor} from './user-modal.js';
import {setUserFormSubmit} from './user-form.js';


getData((photosArray) => {
  createPhotos(photosArray);
  // eslint-disable-next-line
  console.log(photosArray);
});

setUserFormSubmit(closeImageEditor);
