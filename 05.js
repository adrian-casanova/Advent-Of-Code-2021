const fs = require('fs');

class LineSegment {
  constructor(segmentStr) {
    this.segmentStr = segmentStr;
    this.serialize();
  }

  serialize() {
    const [x, y] = this.segmentStr.split(',');
    this.x = Number(x);
    this.y = Number(y);
  }
}

class Board {
  constructor(segments) {
    this.init(segments);
  }

  markSegment(segment) {
    const [left, right] = segment;

    if (left.x !== right.x && left.y !== right.y) {
      return;
    }

    if (left.x === right.x) {
      const diff = right.y - left.y;
      let direction = diff > 0 ? 1 : -1;

      if (!this.board[left.x]) {
        return;
      }

      let column = left.y;

      for (let i = 0; i <= Math.abs(diff); i++) {
        this.board[left.x][column] = Number(this.board[left.x][column]) + 1;

        column = column + direction;
      }
      return;
    }

    if (left.y === right.y) {
      const diff = right.x - left.x;
      let direction = diff > 0 ? 1 : -1;

      if (!this.board[left.y]) {
        return;
      }

      let row = left.x;

      for (let i = 0; i <= Math.abs(diff); i++) {
        this.board[row][left.y] = Number(this.board[row][left.y]) + 1;

        row = row + direction;
      }

      return;
    }
  }

  getScore() {
    let total = 0;
    for (let i = 0; i < this.board.length; i++) {
      if (!this.board[i]) continue;
      for (let j = 0; j < this.board[i].length; j++) {
        if (this.board[i][j] >= 2) {
          total += 1;
        }
      }
    }

    console.log('TOTAL: ', total);
  }

  getDimensions(segments) {
    let x = 0;
    let y = 0;
    for (const segment of segments) {
      const [left, right] = segment;

      if (left.x === right.x) {
        if (left.x > x) {
          x = Number(left.x);
        }
      }

      if (left.y === right.y) {
        if (left.y > y) {
          y = Number(left.y);
        }
      }
    }

    return [x, y];
  }

  init(segments) {
    const [x, y] = this.getDimensions(segments);

    const arr = [];

    for (let i = 0; i < x; i++) {
      arr.push([]);
    }

    for (const item of arr) {
      for (let i = 0; i < y; i++) {
        item.push(0);
      }
    }

    this.board = arr;
  }
}

const file = fs.readFileSync('./05.txt', 'utf-8');

const lines = file.split('\n');

const segments = [];

for (const line of lines) {
  const [left, right] = line.split(' -> ');
  if (!left) continue;

  const leftSegment = new LineSegment(left);
  const rightSegment = new LineSegment(right);

  segments.push([leftSegment, rightSegment]);
}

const board = new Board(segments);

for (const segment of segments) {
  board.markSegment(segment);
}

board.getScore();
