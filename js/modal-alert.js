import {body} from './big-photo.js';
import {closeImageEditor} from './user-modal.js';

const successModalTemplate = document.querySelector('#success')
  .content
  .querySelector('.success');
const errorModalTemplate = document.querySelector('#error')
  .content
  .querySelector('.error');
const errorLoadDataTemplate = document.querySelector('#errorLoadData')
  .content
  .querySelector('.error');

const openModallAlertError = (template) => {
  const modalElement = template.cloneNode(true);
  body.appendChild(modalElement);
  closeImageEditor();
  const errorAlert = document.querySelector('.error');
  const closeModalAlertButton = modalElement.querySelector('.error__button');
  closeModalAlertButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    body.removeChild(errorAlert);
  });
};

const openModallAlertSuccess = (template) => {
  const modalElement = template.cloneNode(true);
  body.appendChild(modalElement);
  closeImageEditor();
  const errorAlert = document.querySelector('.success');
  const closeModalAlertButton = modalElement.querySelector('.success__button');
  closeModalAlertButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    body.removeChild(errorAlert);
  });
};

export {successModalTemplate, errorModalTemplate, errorLoadDataTemplate, openModallAlertError, openModallAlertSuccess};
