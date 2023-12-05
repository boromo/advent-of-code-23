const { readFile } = require('../helpers');
const path = require('path');

const numberPattern = /\d+/g;
const stringToNumMap = {
  'one': '1',
  'two': '2',
  'three': '3',
  'four': '4',
  'five': '5',
  'six': '6',
  'seven': '7',
  'eight': '8',
  'nine': '9',
};

function normalizeString(input) {
  const firstChar = input.charAt(0);

  const nextInput = input.slice(1);
  return [
    ...(!!parseInt(firstChar) ? [firstChar] : Object.keys(stringToNumMap).reduce((acc, key) => {
      if (input.indexOf(key) === 0) {
        return [stringToNumMap[key]]
      }
      return acc;
    }, [])),
    ...(nextInput ? normalizeString(nextInput) : [])
  ]
}

readFile(path.join(__dirname, 'input.txt')).then((data) => {
  const dataArray = data.toString().split('\n');
  const result = dataArray.reduce((acc, row) => {
    const numbersArray = normalizeString(row);
    
    console.log(numbersArray)
    if (numbersArray) {
      const str = numbersArray.join('');
      const firstChar = str.charAt(0);
      console.log(numbersArray);
      if (str.length <= 1) {
        return (acc = acc + parseInt(`${firstChar}${firstChar}`, 10));
      }
      const lastChar = str.charAt(str.length - 1);
      return (acc = acc + parseInt(`${firstChar}${lastChar}`, 10));
    }

    return acc;
  }, 0);

  console.log(result);
});
