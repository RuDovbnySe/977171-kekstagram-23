// global noUiSlider:readonly

const sliderElementBox = document.querySelector('.effect-level');
const sliderElement = document.querySelector('.effect-level__slider');
const valueElement = document.querySelector('.effect-level__value');
const effectsList = document.querySelector('.effects__list');
const imgUploadPreviewPhoto = document.querySelector('.img-upload__img');

const effectNone = 'effect-none';

const checkedRadio = document.querySelector('input[name="effect"]:checked');

const effectToOptionsMap = {
  none: {
    range: {
      min: 0,
      max: 100,
    },
    step: 1,
    classPhoto: 'effect-none',
  },
  chrome: {
    range: {
      min: 0,
      max: 1,
    },
    step: 0.1,
    classPhoto: 'effect-chrome',
  },
  sepia: {
    range: {
      min: 0,
      max: 1,
    },
    step: 0.1,
    classPhoto: 'effect-sepia',
  },
  marvin: {
    range: {
      min: 0,
      max: 100,
    },
    step: 1,
    classPhoto: 'effect-marvin',
  },
  phobos: {
    range: {
      min: 0,
      max: 3,
    },
    step: 0.1,
    classPhoto: 'effect-phobos',
  },
  heat: {
    range: {
      min: 1,
      max: 3,
    },
    step: 0.1,
    classPhoto: 'effect-heat',
  },
};

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
  classPhoto: 'effect-none',
});

sliderElement.noUiSlider.on('update', (_, handle, unencoded) => {
  valueElement.value = unencoded[handle];
  // eslint-disable-next-line
  console.log(valueElement.value);
});

effectsList.addEventListener('change', (evt) => {
  const options = effectToOptionsMap[evt.target.value];
  // eslint-disable-next-line
  console.log(options);
  if (evt.target.id === effectNone) {
    sliderElementBox.classList.add('hidden');
    imgUploadPreviewPhoto.classList.add('effect-none');
  } else {
    sliderElementBox.classList.remove('hidden');
  }

  sliderElement.noUiSlider.updateOptions({
    range: {
      min: options.range.min,
      max: options.range.max,
    },
    start: options.range.max,
    step: options.step,
    classPhoto: imgUploadPreviewPhoto.classList.toggle(options.classPhoto),
  });
});
