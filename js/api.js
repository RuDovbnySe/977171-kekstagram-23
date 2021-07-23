import {
  openModallAlertSuccess,
  openModallAlertError,
  successModalTemplate,
  errorModalTemplate,
  errorLoadDataTemplate
} from './modal-alert.js';

const getData = (onSuccess, onFail) => {
  fetch('https://23.javascript.pages.academy/kekstagram/data')
    .then((response) => {
      if (!response.ok) {
        throw new Error('some error');
      }
      return response.json();
    })
    .then(onSuccess)
    // .catch(onFail);

    .catch(() => {
      openModallAlertError(errorLoadDataTemplate);
      onFail();
    });
};

const sendData = (onSuccess, onFail, body) => {
  fetch(
    'https://23.javascript.pages.academy/kekstagram',
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
        openModallAlertSuccess(successModalTemplate);
      } else {
        openModallAlertError(errorModalTemplate);
        // onFail('Не удалось отправить форму. Попробуйте ещё раз');
      }
    })
    .catch(() => {
      openModallAlertError(errorModalTemplate);
      // onFail('Не удалось отправить форму. Попробуйте ещё раз');
    });
};

export {getData, sendData};
