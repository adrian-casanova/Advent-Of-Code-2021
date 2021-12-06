const fs = require('fs');

const file = fs.readFileSync('./06.txt', 'utf-8');
const inputs = file.split(',');

class LanternFish {
  firstCycle = true;
  constructor(initialTimer) {
    this.time = Number(initialTimer);
  }

  simulateDay() {
    if (this.time === 0) {
      this.time = 6;
      this.firstCycle = false;
      return;
    }

    this.time -= 1;
  }
}

const fishes = [];

for (const input of inputs) {
  const fish = new LanternFish(input);
  fishes.push(fish);
}

let days = 1;

while (days <= 256) {
  console.log('DAY: ', days);
  let fishToCreate = 0;

  for (const fish of fishes) {
    fish.simulateDay();

    if (fish.time === 6 && !fish.firstCycle) {
      fishToCreate += 1;
    }
  }

  for (let i = 0; i < fishToCreate; i++) {
    const fish = new LanternFish(8);
    fishes.push(fish);
  }

  days += 1;
}

console.log(fishes.length);
