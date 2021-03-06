// global noUiSlider:readonly

const sliderElementBox = document.querySelector('.effect-level');
const sliderElement = document.querySelector('.effect-level__slider');
const valueElement = document.querySelector('.effect-level__value');
const effectsList = document.querySelector('.effects__list');
const imgUploadPreviewPhoto = document.querySelector('.img-upload__img');
let valueFilter = 3;
const effectNone = 'effect-none';
const zoomElementValue = document.querySelector('.scale__control--value');
const zoomElementSmaller = document.querySelector('.scale__control--smaller');
const zoomElementBigger = document.querySelector('.scale__control--bigger');

const checkedRadio = document.querySelector('input[name="effect"]:checked');

const currentOptions = {
  range: {
    min: '',
    max: '',
  },
  start: '',
  step: '',
  classPhoto: '',
  filterPhoto: 'none',
  filterPhotoUnit:'',
};
const effectToOptionsMap = {
  none: {
    range: {
      min: 0,
      max: 3,
    },
    step: 1,
    classPhoto: 'effect-none',
    filterPhoto: 'None',
    filterPhotoUnit:'',
  },
  chrome: {
    range: {
      min: 0,
      max: 1,
    },
    step: 0.1,
    classPhoto: 'effect-chrome',
    filterPhoto: 'grayscale',
    filterPhotoUnit:'',
  },
  sepia: {
    range: {
      min: 0,
      max: 1,
    },
    step: 0.1,
    classPhoto: 'effect-sepia',
    filterPhoto: 'sepia',
    filterPhotoUnit:'',
  },
  marvin: {
    range: {
      min: 0,
      max: 100,
    },
    step: 1,
    classPhoto: 'effect-marvin',
    filterPhoto: 'invert',
    filterPhotoUnit: '%',
  },
  phobos: {
    range: {
      min: 0,
      max: 3,
    },
    step: 0.1,
    classPhoto: 'effect-phobos',
    filterPhoto: 'blur',
    filterPhotoUnit:'px',
  },
  heat: {
    range: {
      min: 1,
      max: 3,
    },
    step: 0.1,
    classPhoto: 'effect-heat',
    filterPhoto: 'brightness',
    filterPhotoUnit:'',
  },
};

//Удалить слайдер для фильтра "оригинал"
if (checkedRadio.id === effectNone) {
  sliderElementBox.classList.add('hidden');
}

noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: 3,
  },
  start: 3,
  step: 1,
  connect: 'lower',
  classPhoto: 'effect-none',
  filterPhoto: 'None',
});

effectsList.addEventListener('change', (evt) => {
  const options = effectToOptionsMap[evt.target.value];
  if (evt.target.id === effectNone) {
    sliderElementBox.classList.add('hidden');
    imgUploadPreviewPhoto.classList.add('effect-none');
    imgUploadPreviewPhoto.style.filter = '';
  } else {
    sliderElementBox.classList.remove('hidden');
  }
  imgUploadPreviewPhoto.className = 'img-upload__img';
  currentOptions.filterPhoto = options.filterPhoto;
  currentOptions.filterPhotoUnit = options.filterPhotoUnit;

  sliderElement.noUiSlider.updateOptions({
    range: {
      min: options.range.min,
      max: options.range.max,
    },
    step: options.step,
    start: options.range.max,
    classPhoto: imgUploadPreviewPhoto.classList.toggle(options.classPhoto),
  });
});

sliderElement.noUiSlider.on('update', (_, handle, unencoded) => {
  if (!currentOptions) {
    return;
  }
  valueElement.value = unencoded[handle];
  valueFilter = valueElement.value;
  imgUploadPreviewPhoto.style.filter = `${currentOptions.filterPhoto}(${valueFilter}${currentOptions.filterPhotoUnit})`;
});

zoomElementBigger.addEventListener('click', (evt) => {
  evt.preventDefault();
  if (zoomElementValue.value === `${25}%`) {
    zoomElementValue.value = `${50}%`;
    imgUploadPreviewPhoto.setAttribute('style', 'transform:scale(0.5)');
  } else if (zoomElementValue.value === `${50}%`) {
    zoomElementValue.value = `${75}%`;
    imgUploadPreviewPhoto.setAttribute('style', 'transform:scale(0.75)');
  } else if (zoomElementValue.value === `${75}%`) {
    zoomElementValue.value = `${100}%`;
    imgUploadPreviewPhoto.setAttribute('style', 'transform:scale(1)');
  }
});

zoomElementSmaller.addEventListener('click', (evt) => {
  evt.preventDefault();
  if (zoomElementValue.value === `${100}%`) {
    zoomElementValue.value = `${75}%`;
    imgUploadPreviewPhoto.setAttribute('style', 'transform:scale(0.75)');
  } else if (zoomElementValue.value === `${75}%`) {
    zoomElementValue.value = `${50}%`;
    imgUploadPreviewPhoto.setAttribute('style', 'transform:scale(0.5)');
  } else if (zoomElementValue.value === `${50}%`) {
    zoomElementValue.value = `${25}%`;
    imgUploadPreviewPhoto.setAttribute('style', 'transform:scale(0.25)');
  }
});

export {imgUploadPreviewPhoto, sliderElement, sliderElementBox, zoomElementValue};
