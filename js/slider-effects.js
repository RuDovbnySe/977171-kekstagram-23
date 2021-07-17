// global noUiSlider:readonly

const sliderElementBox = document.querySelector('.effect-level');
const sliderElement = document.querySelector('.effect-level__slider');
const valueElement = document.querySelector('.effect-level__value');
const specialEffectNone = document.querySelector('#effect-none');
const specialEffectChrome = document.querySelector('#effect-chrome');
const specialEffectSepia = document.querySelector('#effect-sepia');
const specialEffectMarvin = document.querySelector('#effect-marvin');
const specialEffectPhobos = document.querySelector('#effect-phobos');
const specialEffectHeat = document.querySelector('#effect-heat');
const imgUploadPreviewPhoto = document.querySelector('.img-upload__img');
const effectNone = 'effect-none';

const checkedRadio = document.querySelector('input[name="effect"]:checked');

//Удалить слайдер для фильтра "оригинал"
if (checkedRadio.id === effectNone) {
  sliderElementBox.classList.add('hidden');
}

noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: 100,
  },
  start: 100,
  step: 1,
  connect: 'lower',
});

sliderElement.noUiSlider.on('update', (_, handle, unencoded) => {
  valueElement.value = unencoded[handle];
  // eslint-disable-next-line
  console.log(valueElement.value);
});

specialEffectNone.addEventListener('change', (evt) => {
  if (evt.target.checked) {
    sliderElementBox.classList.add('hidden');
    imgUploadPreviewPhoto.classList.add('effect-none');
    imgUploadPreviewPhoto.classList.remove('effect-chrome');
    imgUploadPreviewPhoto.classList.remove('effect-sepia');
    imgUploadPreviewPhoto.classList.remove('effect-marvin');
    imgUploadPreviewPhoto.classList.remove('effect-phobos');
    imgUploadPreviewPhoto.classList.remove('effect-heat');
    // eslint-disable-next-line
    console.log('effectNone');
  }
});

specialEffectChrome.addEventListener('change', (evt) => {
  if (evt.target.checked) {
    sliderElementBox.classList.remove('hidden');
    imgUploadPreviewPhoto.classList.remove('effect-none');
    imgUploadPreviewPhoto.classList.add('effect-chrome');
    imgUploadPreviewPhoto.classList.remove('effect-sepia');
    imgUploadPreviewPhoto.classList.remove('effect-marvin');
    imgUploadPreviewPhoto.classList.remove('effect-phobos');
    imgUploadPreviewPhoto.classList.remove('effect-heat');
    // eslint-disable-next-line
    console.log('effect-chrome');

    sliderElement.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 1,
      },
      step: 0.1,
    });
  }
});

specialEffectSepia.addEventListener('change', (evt) => {
  if (evt.target.checked) {
    sliderElementBox.classList.remove('hidden');
    imgUploadPreviewPhoto.classList.remove('effect-none');
    imgUploadPreviewPhoto.classList.remove('effect-chrome');
    imgUploadPreviewPhoto.classList.add('effect-sepia');
    imgUploadPreviewPhoto.classList.remove('effect-marvin');
    imgUploadPreviewPhoto.classList.remove('effect-phobos');
    imgUploadPreviewPhoto.classList.remove('effect-heat');
    // eslint-disable-next-line
    console.log('effect-sepia');

    sliderElement.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 1,
      },
      step: 0.1,
    });
  }
});

specialEffectMarvin.addEventListener('change', (evt) => {
  if (evt.target.checked) {
    sliderElementBox.classList.remove('hidden');
    imgUploadPreviewPhoto.classList.remove('effect-none');
    imgUploadPreviewPhoto.classList.remove('effect-chrome');
    imgUploadPreviewPhoto.classList.remove('effect-sepia');
    imgUploadPreviewPhoto.classList.add('effect-marvin');
    imgUploadPreviewPhoto.classList.remove('effect-phobos');
    imgUploadPreviewPhoto.classList.remove('effect-heat');
    // eslint-disable-next-line
    console.log('effect-marvin');

    sliderElement.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 100,
      },
      step: 1,
    });
  }
});

specialEffectPhobos.addEventListener('change', (evt) => {
  if (evt.target.checked) {
    sliderElementBox.classList.remove('hidden');
    imgUploadPreviewPhoto.classList.remove('effect-none');
    imgUploadPreviewPhoto.classList.remove('effect-chrome');
    imgUploadPreviewPhoto.classList.remove('effect-sepia');
    imgUploadPreviewPhoto.classList.remove('effect-marvin');
    imgUploadPreviewPhoto.classList.add('effect-phobos');
    imgUploadPreviewPhoto.classList.remove('effect-heat');
    // eslint-disable-next-line
    console.log('effect-phobos');

    sliderElement.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 3,
      },
      step: 0.1,
    });
  }
});

specialEffectHeat.addEventListener('change', (evt) => {
  if (evt.target.checked) {
    sliderElementBox.classList.remove('hidden');
    imgUploadPreviewPhoto.classList.remove('effect-none');
    imgUploadPreviewPhoto.classList.remove('effect-chrome');
    imgUploadPreviewPhoto.classList.remove('effect-sepia');
    imgUploadPreviewPhoto.classList.remove('effect-marvin');
    imgUploadPreviewPhoto.classList.remove('effect-phobos');
    imgUploadPreviewPhoto.classList.add('effect-heat');
    // eslint-disable-next-line
    console.log('effect-heat');

    sliderElement.noUiSlider.updateOptions({
      range: {
        min: 1,
        max: 3,
      },
      step: 0.1,
    });
  }
});
