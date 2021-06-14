import {similarPhoto} from './data-photo';

similarPhoto;

// const MESSAGES = [
//   'Всё отлично!',
//   'В целом неплохо. Но не всё.',
//   'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
//   'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
//   'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
//   'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
// ];
// const USERS_NAMES = [
//   'Иван',
//   'Елисей',
//   'Мария',
//   'Иннокентий',
//   'Виктор',
//   'Юлия',
//   'Платон',
//   'Евлампий',
//   'Роман',
//   'Фёдор',
//   'Кристина',
// ];
// const DESCRIPTIONS = [
//   'Фокус размыт.',
//   'Отличное фото',
//   'Класс!',
//   'Великолепно',
//   'Лучше бы и не брался!',
//   'Шикарно',
//   'Так себе',
//   'Ты можешь лучше',
//   'И я там был',
//   'Идеально',
//   'Супер кадр',
//   'Лучше удали',
// ];
// const MAX_AVATAR = 6;
// const MIN_LIKE = 15;
// const MAX_LIKE = 200;
// const MAX_COMMENT = 10;
// const NUMBER_PICTURE = 25;
//
// //рандомное число из диапазона
// const getRandomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);
//
// //возвращает true если длинна элемента меньше заданного числа
// const getLineLength = (line, lineMax) => {
//   if (line.length <= lineMax) {
//     return true;
//   }
// };
//
// getLineLength('Это позитивно', 140);
//
// // рандомный элемент массива
// const getRandomArrayElement = (elements) => elements[getRandomNumber(0, elements.length - 1)];
//
// // рандомный элемент массива комментариев
// const createComment = (idUser) => ({
//   id: idUser + 1,
//   avatar: `img/avatar-${getRandomNumber(1, MAX_AVATAR)}.svg`,
//   message: getRandomArrayElement(MESSAGES),
//   name: getRandomArrayElement(USERS_NAMES),
// });
//
// // создаём массив комментов
// const similarComment = new Array(MAX_COMMENT).fill(null).map((item, index) => createComment(index));
// similarComment.slice(0,getRandomNumber(1, MAX_COMMENT));
//
// // рандомный элемент массива фото с комментами
// // комментарии это случайный массив рандомной длины из массива комментариев
// const createPhoto = (idDescription) => ({
//   id: idDescription + 1,
//   url: `photos/${idDescription + 1}.jpg`,
//   description: getRandomArrayElement(DESCRIPTIONS),
//   likes: getRandomNumber(MIN_LIKE, MAX_LIKE),
//   comments: similarComment.slice(0,getRandomNumber(1, MAX_COMMENT)),
// });
//
// // создаём массив фото с комментами
// const similarPhoto = new Array(NUMBER_PICTURE).fill(null).map((item, index) => createPhoto(index));
//
// similarPhoto;
// // console.log(similarPhoto);
