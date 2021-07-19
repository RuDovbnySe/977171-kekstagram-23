// global noUiSlider:readonly

const sliderElementBox = document.querySelector('.effect-level');
const sliderElement = document.querySelector('.effect-level__slider');
const valueElement = document.querySelector('.effect-level__value');
const effectsList = document.querySelector('.effects__list');
const imgUploadPreviewPhoto = document.querySelector('.img-upload__img');
let valueFilter = 3;
const effectNone = 'effect-none';
let effectToOptionsMap = {
  none: {
    range: {
      min: 0,
      max: 3,
    },
    step: 1,
    classPhoto: 'effect-none',
    filterPhoto: 'None',
  },
  chrome: {
    range: {
      min: 0,
      max: 1,
    },
    step: 0.1,
    classPhoto: 'effect-chrome',
    filterPhoto: `grayscale(${valueFilter})`,
  },
  sepia: {
    range: {
      min: 0,
      max: 1,
    },
    step: 0.1,
    classPhoto: 'effect-sepia',
    filterPhoto: `sepia(${valueFilter})`,
  },
  marvin: {
    range: {
      min: 0,
      max: 100,
    },
    step: 1,
    classPhoto: 'effect-marvin',
    filterPhoto: `invert(${valueFilter}%)`,
  },
  phobos: {
    range: {
      min: 0,
      max: 3,
    },
    step: 0.1,
    classPhoto: 'effect-phobos',
    filterPhoto: `blur(${valueFilter}px)`,
  },
  heat: {
    range: {
      min: 1,
      max: 3,
    },
    step: 0.1,
    classPhoto: 'effect-heat',
    filterPhoto: `brightness(${valueFilter})`,
    // filterPhoto: imgUploadPreviewPhoto.style.filter = 'brightness',
  },
};
// let options = 0;
const zoomElementValue = document.querySelector('.scale__control--value');
const zoomElementSmaller = document.querySelector('.scale__control--smaller');
const zoomElementBigger = document.querySelector('.scale__control--bigger');

const checkedRadio = document.querySelector('input[name="effect"]:checked');

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

sliderElement.noUiSlider.on('update', (_, handle, unencoded) => {
  valueElement.value = unencoded[handle];
  valueFilter = valueElement.value;
  effectToOptionsMap = {
    none: {
      range: {
        min: 0,
        max: 3,
      },
      step: 1,
      classPhoto: 'effect-none',
      filterPhoto: 'None',
    },
    chrome: {
      range: {
        min: 0,
        max: 1,
      },
      step: 0.1,
      classPhoto: 'effect-chrome',
      filterPhoto: `grayscale(${valueFilter})`,
    },
    sepia: {
      range: {
        min: 0,
        max: 1,
      },
      step: 0.1,
      classPhoto: 'effect-sepia',
      filterPhoto: `sepia(${valueFilter})`,
    },
    marvin: {
      range: {
        min: 0,
        max: 100,
      },
      step: 1,
      classPhoto: 'effect-marvin',
      filterPhoto: `invert(${valueFilter}%)`,
    },
    phobos: {
      range: {
        min: 0,
        max: 3,
      },
      step: 0.1,
      classPhoto: 'effect-phobos',
      filterPhoto: `blur(${valueFilter}px)`,
    },
    heat: {
      range: {
        min: 1,
        max: 3,
      },
      step: 0.1,
      classPhoto: 'effect-heat',
      filterPhoto: `brightness(${valueFilter})`,
      // filterPhoto: imgUploadPreviewPhoto.style.filter = 'brightness',
    },
  };
  // eslint-disable-next-line
  console.log(valueFilter);
});

effectsList.addEventListener('change', (evt) => {
  const options = effectToOptionsMap[evt.target.value];
  if (evt.target.id === effectNone) {
    sliderElementBox.classList.add('hidden');
    imgUploadPreviewPhoto.classList.add('effect-none');
  } else {
    sliderElementBox.classList.remove('hidden');
  }
  imgUploadPreviewPhoto.className = 'img-upload__img';

  sliderElement.noUiSlider.updateOptions({
    range: {
      min: options.range.min,
      max: options.range.max,
    },
    step: options.step,
    start: options.range.max,
    classPhoto: imgUploadPreviewPhoto.classList.toggle(options.classPhoto),
    filterPhoto: imgUploadPreviewPhoto.style.filter = options.filterPhoto,
  });
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

export {imgUploadPreviewPhoto};
