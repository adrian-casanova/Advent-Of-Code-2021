const fs = require('fs');
const file = fs.readFileSync('./07.txt', 'utf-8');

const positions = file.split(',');

const max = Math.max(...positions);

const res = [];

for (let i = 0; i < max; i++) {
  const r = [];
  for (const position of positions) {
    const diff = Math.abs(i - Number(position));

    let j = 1;

    let innerSum = 0;

    for (let k = 0; k < diff; k++) {
      innerSum += j;
      j += 1;
    }

    r.push(innerSum);
  }

  const sum = r.reduce((accum, val) => accum + val);

  res.push(sum);
}

console.log('res: ', res);

console.log(Math.min(...res));
