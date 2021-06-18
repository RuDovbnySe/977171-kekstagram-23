import {similarComments, MAX_COMMENT} from './data-comments.js';
import {getRandomArrayElement, getRandomNumber} from './util.js';

const DESCRIPTIONS = [
  'Фокус размыт.',
  'Отличное фото',
  'Класс!',
  'Великолепно',
  'Лучше бы и не брался!',
  'Шикарно',
  'Так себе',
  'Ты можешь лучше',
  'И я там был',
  'Идеально',
  'Супер кадр',
  'Лучше удали',
];
const MIN_LIKE = 15;
const MAX_LIKE = 200;
const NUMBER_PICTURE = 25;

// рандомный элемент массива фото с комментами
// комментарии это случайный массив рандомной длины из массива комментариев
const createPhoto = (idDescription) => ({
  id: idDescription + 1,
  url: `photos/${idDescription + 1}.jpg`,
  description: getRandomArrayElement(DESCRIPTIONS),
  likes: getRandomNumber(MIN_LIKE, MAX_LIKE),
  comments: similarComments.slice(0,getRandomNumber(1, MAX_COMMENT)),
});

// создаём массив фото с комментами
const similarPhotos = new Array(NUMBER_PICTURE).fill(null).map((item, index) => createPhoto(index));

export {similarPhotos};
