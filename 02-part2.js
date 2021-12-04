const fs = require('fs');

const file = fs.readFileSync('./02.txt', 'utf-8');

const lines = file.split('\n');

const map = {
  forward: (x, obj) => {
    obj['horizontal'] += x;
    obj['depth'] += obj['aim'] * x;
  },
  down: (x, obj) => (obj['aim'] += x),
  up: (x, obj) => (obj['aim'] -= x),
};

const result = { horizontal: 0, depth: 0, aim: 0 };

for (const line of lines) {
  const [direction, value] = line.split(' ');
  console.log('direction: ', direction);
  if (!direction) continue;
  map[direction](Number(value), result);
}

console.log('result: ', result);

console.log('TOTAL: ', result['horizontal'] * result['depth']);
