const getRandomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

const getLineLength = (line, lineMax) => {
  if (line.length <= lineMax) {
    return true;
  }
};

getLineLength('Это позитивно', 140);

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
const MAX_AVATAR = 6;
const MIN_LIKE = 15;
const MAX_LIKE = 200;
const MAX_COMMENT = 10;
const NUMBER_PICTURE = 25;

// рандомный элемент массива
const getRandomArrayElement = (elements) => {
  return elements[getRandomNumber(0, elements.length)];
};

// рандомный элемент массива комментариев
const createComment = (i) => {
  return {
    id: i + 1,
    avatar: `img/avatar-${getRandomNumber(1, MAX_AVATAR)}.svg`,
    message: getRandomArrayElement(MESSAGES),
    name: getRandomArrayElement(USERS_NAMES),
  };
};

// создаём массив комментов
let comments = [];

for (let i = 0; i < MAX_COMMENT; i++) {
  const createCommentsData = createComment(i);
  comments.push(createCommentsData);
};


// рандомный элемент массива фото с комментами
const createPhoto = (i) => {
  return {
    id: i + 1,
    url: `photos/${i + 1}.jpg`,
    description: getRandomArrayElement(DESCRIPTIONS),
    likes: getRandomNumber(MIN_LIKE, MAX_LIKE),
    comments: getRandomArrayElement(comments),
  };
};

// const similarPhoto = new Array(NUMBER_PICTURE).fill(null).map(() => createPhoto());
// console.log(similarPhoto);

// создаём массив фото с комментами
let pictures = [];

for (let i = 0; i < NUMBER_PICTURE; i++) {
  const createPhototsData = createPhoto(i);
  pictures.push(createPhototsData);
};

console.log(pictures);
console.log(comments);
