// import './miniatures.js';
// import './big-photo.js';
import './user-modal.js';
import './user-form.js';
import './nouislider.js';
import {getData} from './api.js';
// import './slider.js';
import {createPhotos} from './miniatures.js';
import {closeImageEditor} from './user-modal.js';
import {setUserFormSubmit} from './user-form.js';
// import './api.js';

getData((photosArray) => {
  createPhotos(photosArray);
  console.log(photosArray);
});

setUserFormSubmit(closeImageEditor);
