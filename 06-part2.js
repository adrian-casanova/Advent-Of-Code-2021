const fs = require('fs');

let file = fs.readFileSync('./06.txt', 'utf-8');
file = file.replace(/\n/g, '');
const inputs = file.split(',');

let fish = {};

for (const input of inputs) {
  if (fish.hasOwnProperty(input)) {
    fish[input] += 1;
  } else {
    fish[input] = 1;
  }
}

for (let day = 1; day <= 256; day++) {
  const innerDic = {};

  for (const [key, val] of Object.entries(fish)) {
    if (key === '0') {
      if (innerDic.hasOwnProperty('6')) {
        innerDic['6'] += val;
      } else {
        innerDic['6'] = val;
      }

      if (innerDic.hasOwnProperty('8')) {
        innerDic['8'] += val;
      } else {
        innerDic['8'] = val;
      }
    } else {
      if (innerDic.hasOwnProperty(Number(key) - 1)) {
        innerDic[Number(key) - 1] += val;
      } else {
        innerDic[Number(key) - 1] = val;
      }
    }

    fish = JSON.parse(JSON.stringify(innerDic));
  }
}

let sum = 0;

for (let key in fish) {
  sum += Number(fish[key]);
}

console.log(sum);
