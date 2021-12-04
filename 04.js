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

    console.log(
      'NOT MARKED SUM: ',
      notMarkedSum,
      'num: ',
      num,
      'total:',
      notMarkedSum * num,
    );
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
    let outCheck = 0;
    for (let i = 0; i < this.board.length; i++) {
      if (this.board[i][0].checked) {
        outCheck += 1;

        if (outCheck === this.board.length) {
          return true;
        }
      }
      let checked = 0;
      for (let j = 0; j < this.board[i].length; j++) {
        if (this.board[i][j].checked) {
          checked += 1;
        }
      }

      if (checked === this.board[i].length) {
        return true;
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
  console.log('IDX:', idx);

  for (const board of boards) {
    for (const num of numsToUser) {
      board.markPiece(num);

      if (board.checkWon()) {
        console.log('WON: ', board.board);
        board.getScore(num);

        process.exit(0);
      }
    }
  }

  idx += 1;
}

console.log('board: ', boards[0].board);
