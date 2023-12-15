const { readFile } = require('../helpers');
const path = require('path');

function loadInput(file) {
  return readFile(path.join(__dirname, file)).then((data) => {
    return data.toString().split('\n');
  });
}

function part1() {
  loadInput('input.txt').then((data) => {
    let sum = 0;

    data.forEach((card) => {
      const [myNumbers, winningNumbers] = card
        .split(':')[1]
        .trim()
        .split(' | ')
        .map((m) => m.split(/\s+/).map(Number));
      let cardPoints = 0;
      myNumbers.forEach((myNum) => {
        if (winningNumbers.indexOf(myNum) !== -1) {
          if (!cardPoints) {
            cardPoints = 1;
          } else {
            cardPoints = cardPoints * 2;
          }
        }
      });
      sum = sum + cardPoints;
    });

    console.log(sum);
  });
}

// part1();

function scratchCard(set) {
  const cardCount = set.map((_) => 1);

  console.log(set.length);

  // loop over each card
  for (let cardId = 0; cardId < set.length; cardId++) {
    const line = set[cardId];
    const [myNumbers, winningNumbers] = line;
    const matchCount = myNumbers.filter(myNumber => winningNumbers.indexOf(myNumber) !== -1);

    // for the number of wins, update any cards with extras.
    for (let i = 0; i < matchCount.length; i++){
      cardCount[cardId + 1 + i] += cardCount[cardId];
    }
  }
  const result = cardCount.reduce((acc, curr) => {
    console.log(acc, curr);
    return acc + curr;
  }, 0)

  console.log(result);
}

function part2() {
  loadInput('input.txt').then((data) => {
    let sum = 0;

    const normalizedCards = data.map((card) =>
      card
        .split(':')[1]
        .trim()
        .split(' | ')
        .map((m) => m.split(/\s+/).map(Number))
    );

    scratchCard(normalizedCards);
  });
}

part2();
