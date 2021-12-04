const fs = require('fs');

const file = fs.readFileSync('./03.txt', 'utf8');

const linesOrig = file.split('\n').filter(item => item);

let lines = linesOrig.slice(0);
let linesTwo = linesOrig.slice(0);
const bitLength = lines[0].length;

let gamma = '';

for (let i = 0; i < bitLength; i++) {
  const totalNums = { 0: [], 1: [] };

  for (let j = 0; j < lines.length; j++) {
    const line = lines[j];
    if (!line) continue;
    totalNums[line[i]].push(line);
  }

  if (totalNums[0].length > totalNums[1].length) {
    lines = totalNums[0];
    console.log("WON: ", 0, "idx: ", i);
  } else {
    lines = totalNums[1];
    console.log("WON: ", 1, "idx:", i);
  }

  console.log("LINES: ", lines);


  if (lines.length === 1) {
    gamma = lines[0];
    break;
  }
}

console.log("Gamma: ", gamma);

let epsilon = '';

for (let i = 0; i < bitLength; i++) {
  const totalNums = { 0: [], 1: [] };

  for (let j = 0; j < linesTwo.length; j++) {
    const line = linesTwo[j];
    if (!line) continue;
    totalNums[line[i]].push(line);
  }

 if (totalNums[0].length > totalNums[1].length) {
    linesTwo = totalNums[1];
    console.log("WON: ", 1, "idx: ", i);
  } else {
    linesTwo = totalNums[0];
    console.log("WON: ", 0, "idx: ", i);
  }
  console.log("LINES22: ", linesTwo);

  if (linesTwo.length === 1) {
    epsilon = linesTwo[0];
    break;
  }
}

console.log(gamma);
console.log(epsilon);

const gammaNum = parseInt(gamma, 2);
const epsilonNum = parseInt(epsilon, 2);

console.log(
  'GAMMA NUM : ',
  gammaNum,
  'epsilonNum: ',
  epsilonNum,
  'tota;:',
  gammaNum * epsilonNum,
);
