const { readFile } = require('../helpers');
const path = require('path');

// only 12 red cubes, 13 green cubes, and 14 blue cubes
const availableCubes = {
  red: 12,
  green: 13,
  blue: 14,
};

const defaultColorSet = {
  red: 1,
  green: 1,
  blue: 1,
};

function loadInput(file) {
  return readFile(path.join(__dirname, file)).then((data) => {
    return data.toString().split('\n');
  });
}

function part1() {
  loadInput('input.txt').then((result) => {
    const normalizedData = result.reduce((acc, row) => {
      // Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
      const [gameName, gamesString] = row.split(': ');
      const id = parseInt(gameName.replace('Game ', ''), 10);

      const gameAvailable = gamesString.split('; ').every((gameString) => {
        return gameString.split(', ').every((cubeString) => {
          const [count, color] = cubeString.split(' ');
          return count <= availableCubes[color];
        });
      });

      return gameAvailable ? acc + id : acc;
    }, 0);

    console.log(normalizedData);
  });
}

function part2() {
  loadInput('input2.txt').then((result) => {
    const normalizedData = result.reduce((acc, row) => {
      // Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
      const [gameName, gamesString] = row.split(': ');
      const id = parseInt(gameName.replace('Game ', ''), 10);

      const minSet = gamesString.split('; ').reduce((acc, gameString) => {
        return gameString.split(', ').reduce((foo, curr) => {
          const [count, color] = curr.split(' ');

          return {
            ...foo,
            ...(!foo[color] || foo[color] < count ? { [color]: parseInt(count, 10) } : {}),
          };
        }, acc);
      }, {});

      
      const gamePowerResult = Object.values(minSet).reduce((acc, value) => acc * value);

      return acc + gamePowerResult;
    }, 0);

    console.log(normalizedData);
  });
}

part2();
