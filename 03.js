const fs = require('fs');

const file = fs.readFileSync("./03.txt", "utf8");

const lines = file.split("\n");

const bitLength = lines[0].length;

let gamma = "";
let epsilon = "";

for (let i = 0; i < bitLength; i++) {
  const res = { 0: 0, 1: 0 };

  for (const line of lines) {
    res[line[i]] += 1;
  }

  if (res[0] > res[1]) {
      gamma += "0";
      epsilon += "1";
  } else {
      gamma += "1";
      epsilon += "0";
  }
}


const gammaNum = parseInt(gamma, 2);
const epsilonNum = parseInt(epsilon, 2);
console.log("gama: ", gammaNum, "epsilon: ", epsilonNum);

console.log(gammaNum * epsilonNum);



