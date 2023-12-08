const path = require('path');
const { readFile } = require('../helpers');

function loadInput(file) {
  return readFile(path.join(__dirname, file)).then((data) => {
    return data.toString().split('\n');
  });
}

const cellATruthyValue = '+';
const cellAFalsyValue = '';

function foo(input) {
  return input.map((m) =>
    m.split('').map((m) => {
      if (['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'].indexOf(m) !== -1) {
        return m;
      } else if (m === '.') {
        return cellAFalsyValue;
      }
      return cellATruthyValue;
    })
  );
}

function checkAdjacent(d, ri, ci) {
  return (
    (d[ri] && d[ri][ci - 1] === cellATruthyValue) ||
    (d[ri] && d[ri][ci + 1] === cellATruthyValue) ||
    (d[ri - 1] && d[ri - 1][ci] === cellATruthyValue) ||
    (d[ri + 1] && d[ri + 1][ci] === cellATruthyValue) ||
    (d[ri - 1] && d[ri - 1][ci - 1] === cellATruthyValue) ||
    (d[ri - 1] && d[ri - 1][ci + 1] === cellATruthyValue) ||
    (d[ri + 1] && d[ri + 1][ci - 1] === cellATruthyValue) ||
    (d[ri + 1] && d[ri + 1][ci + 1] === cellATruthyValue)
  );
}

function part1() {
  loadInput('input.txt').then((input) => {
    const d = foo(input);
    let sum = 0;
    let number = '';
    let hasAdjacent = false;

    d.forEach((row, rowIndex) => {
      row.forEach((cell, cellIndex) => {
        if (['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'].indexOf(cell) !== -1) {
          number = number + cell;
          hasAdjacent = hasAdjacent ? hasAdjacent : checkAdjacent(d, rowIndex, cellIndex);
        } else {
          if (number && hasAdjacent) {
            sum = sum + parseInt(number, 10);
          }
          number = '';
          hasAdjacent = false;
        }
      });
    });
    console.log(sum);
  });
}

// part1();

function foo2(input) {
  let number = '';
  let id = 0;
  return input.map((row) => {
    number = '';
    return row.split('').reduce((acc, cell, index) => {      
      if (['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'].indexOf(cell) !== -1) {
        number = number + cell;

        return [
          ...acc,
          ...(row.length - 1 === index ? number.split('').map(() => ({ id, value: Number(number) })) : []),
        ];
      }
      const tempNumber = number;

      if (number) {
        number = '';
        id++;
      }

      return [
        ...acc,
        ...tempNumber.split('').map(() => ({ id, value: Number(tempNumber) })),
        ...(cell === '*' ? [cellATruthyValue] : [cellAFalsyValue]),
      ];
    }, []);
  });
}

function getAdjacent(d, ri, ci) {
  const foundAdjacent = [];
  const usedIds = [];

  if (typeof d[ri][ci - 1] === 'object') {
    const { id, value } = d[ri][ci - 1];
    if (usedIds.indexOf(id) === -1) {
      usedIds.push(id);
      foundAdjacent.push(value);
    }
  }
  if (typeof d[ri][ci + 1] === 'object') {
    const { id, value } = d[ri][ci + 1];
    if (usedIds.indexOf(id) === -1) {
      usedIds.push(id);
      foundAdjacent.push(value);
    }
  }
  if (typeof d[ri - 1][ci] === 'object') {
    const { id, value } = d[ri - 1][ci];
    if (usedIds.indexOf(id) === -1) {
      usedIds.push(id);
      foundAdjacent.push(value);
    }
  }
  if (typeof d[ri + 1][ci] === 'object') {
    const { id, value } = d[ri + 1][ci];
    if (usedIds.indexOf(id) === -1) {
      usedIds.push(id);
      foundAdjacent.push(value);
    }
  }
  if (typeof d[ri - 1][ci - 1] === 'object') {
    const { id, value } = d[ri - 1][ci - 1];
    if (usedIds.indexOf(id) === -1) {
      usedIds.push(id);
      foundAdjacent.push(value);
    }
  }
  if (typeof d[ri - 1][ci + 1] === 'object') {
    const { id, value } = d[ri - 1][ci + 1];
    if (usedIds.indexOf(id) === -1) {
      usedIds.push(id);
      foundAdjacent.push(value);
    }
  }
  if (typeof d[ri + 1][ci - 1] === 'object') {
    const { id, value } = d[ri + 1][ci - 1];
    if (usedIds.indexOf(id) === -1) {
      usedIds.push(id);
      foundAdjacent.push(value);
    }
  }
  if (typeof d[ri + 1][ci + 1] === 'object') {
    const { id, value } = d[ri + 1][ci + 1];
    if (usedIds.indexOf(id) === -1) {
      usedIds.push(id);
      foundAdjacent.push(value);
    }
  }

  return foundAdjacent;
}

function part2() {
  loadInput('input2.txt').then((input) => {
    const d = foo2(input);
    let sum = 0;
    
    d.forEach((row, rowIndex) => {
      row.forEach((cell, cellIndex) => {
        if (cell === cellATruthyValue) {
          const foundAdjacent = getAdjacent(d, rowIndex, cellIndex);
          if (foundAdjacent.length === 2) {
            sum = sum + foundAdjacent[0] * foundAdjacent[1];
          }
        }
      });
    });

    console.log(sum);
  });
}

part2();
