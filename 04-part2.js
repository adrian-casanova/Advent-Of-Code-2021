const fs = require('fs');

class Board {
  constructor(board) {
    this.boardStr = board;
  }

  getScore(num) {
    let notMarkedSum = 0;
    for (let i = 0; i < this.board.length; i++) {
      for (let j = 0; j < this.board[i].length; j++) {
        if (!this.board[i][j].checked) {
          notMarkedSum += Number(this.board[i][j].val);
        }
      }
    }

    console.log('notMarked: ', notMarkedSum, 'num: ', num, notMarkedSum * num);
  }

  markPiece(num) {
    for (let i = 0; i < this.board.length; i++) {
      for (let j = 0; j < this.board[i].length; j++) {
        if (this.board[i][j].val === num) {
          this.board[i][j].checked = true;
        }
      }
    }
  }

  checkWon() {
    for (let i = 0; i < this.board.length; i++) {
      let checked = 0;
      for (let j = 0; j < this.board[i].length; j++) {
        if (this.board[i][j].checked) {
          checked += 1;
        }
      }

      if (checked === this.board[i].length) {
        console.log('WON ROW');
        return true;
      }
    }

    for (let i = 0; i < this.board.length; i++) {
      let checked = 0;
      for (let j = 0; j < this.board[i].length; j++) {
        if (this.board[j][i].checked) {
          checked += 1;
        }

        if (checked === this.board[j][i].length) {
          console.log("WON COLUMMN");
          return true;
        }
      }
    }

    return false;
  }

  serialize() {
    const splitLines = this.boardStr;

    const board = [];

    for (const line of splitLines) {
      if (!line) continue;
      const chars = line.split(' ');

      const lineOf = [];

      for (const char of chars) {
        if (!char) continue;
        lineOf.push({ val: char, checked: false });
      }
      board.push(lineOf);
    }
    this.board = board;
  }
}

const numsFile = fs.readFileSync('./04.txt.nums', 'utf8');
const boardsFile = fs.readFileSync('./04.txt.boards', 'utf8');

const nums = numsFile.split(',');

const boardsSplit = boardsFile.split('\n');

let currBoard = [];
const boards = [];

for (const line of boardsSplit) {
  if (line.length) {
    currBoard.push(line);
    continue;
  }

  const board = new Board(currBoard);
  board.serialize();
  boards.push(board);
  currBoard = [];
}

let winner = false;

let idx = 0;

while (!winner) {
  if (idx > nums.length) break;
  const numsToUser = nums.slice(idx * 5, idx * 5 + 5);

  console.log('NumsToUser:', numsToUser);
  console.log('IDX:', idx);

  let bIndex = 0;
  for (const board of boards) {
    for (const num of numsToUser) {
      board.markPiece(num);

      if (board.checkWon()) {
        if (boards.length === 1) {
          console.log('LAST BOARD WON: ', board.board);
          board.getScore(num);
          process.exit(0);
        }

        boards.splice(bIndex, 1);
        console.log('BOARD : ', bIndex, ' WON', 'boardsLeft: ', boards.length);
      }
    }

    bIndex += 1;
  }

  idx += 1;
}

console.log('board: ', boards[0].board);
