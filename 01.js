const fs = require('fs');

const text = fs.readFileSync('./01.txt.back', 'utf-8');

const split = text.split('\n');

const windows = [];

const workingWindows = [[], [], []];

let windowIdx = 0;
const MAX_WINDOW_SIZE = 3;

for (let i = 0; i < split.length; i++) {
  const item = split[i];

  for (let j = 0; j < MAX_WINDOW_SIZE; j++) {
    console.log('WORKING: ', workingWindows);
    if (workingWindows[j].length === MAX_WINDOW_SIZE) {
      windows.push(JSON.parse(JSON.stringify(workingWindows[j])));
      workingWindows[j] = [];
    }
    if (!workingWindows[j].length) {
      workingWindows[j].push(item);

      if (workingWindows[j + 1] && !workingWindows[j + 1].length) {
        break;
      }
    } else {
      workingWindows[j].push(item);
    }
  }
}

const sums = [];

for (const window of windows) {
  const sum = window.reduce((accum, val) => Number(accum) + Number(val));
  sums.push(sum);
}

let total = 0;

for (let i = 1; i < sums.length; i++) {
  if (Number(sums[i]) > Number(sums[i - 1])) {
    total += 1;
  }
}

console.log('TOTAL: ', total);

console.log('LENGTH: ', split.length);
