import {getRandomArrayElement, getRandomNumber} from './util.js';

const MESSAGES = [
  'Всё отлично!',
  'В целом неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];
const USERS_NAMES = [
  'Иван',
  'Елисей',
  'Мария',
  'Иннокентий',
  'Виктор',
  'Юлия',
  'Платон',
  'Евлампий',
  'Роман',
  'Фёдор',
  'Кристина',
];
const MAX_AVATAR = 6;
const MAX_COMMENT = 20;
// рандомный элемент массива комментариев
const createComment = (idUser) => ({
  id: idUser + 1,
  avatar: `img/avatar-${getRandomNumber(1, MAX_AVATAR)}.svg`,
  message: getRandomArrayElement(MESSAGES),
  name: getRandomArrayElement(USERS_NAMES),
});

// создаём массив комментов
const similarComments = new Array(MAX_COMMENT)
  .fill(null)
  .map((item, index) => createComment(index));

export {similarComments, MAX_COMMENT};
