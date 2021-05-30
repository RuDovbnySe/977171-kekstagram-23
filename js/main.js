const getRandomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);
const MAX_LENGTH = 140;

const getLineLength = (line) => {
  // console.log(line.length);
  if (line.length <= MAX_LENGTH) {
    return true;
  }
};

getLineLength('Это позитивно');
getRandomNumber(1, 10);
