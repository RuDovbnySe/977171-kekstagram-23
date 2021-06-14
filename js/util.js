//рандомное число из диапазона
const getRandomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

// рандомный элемент массива
const getRandomArrayElement = (elements) => elements[getRandomNumber(0, elements.length - 1)];

export {getRandomArrayElement};
export {getRandomNumber};