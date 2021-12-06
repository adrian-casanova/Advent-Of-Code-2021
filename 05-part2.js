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

    if (left.x === right.x) {
      const diff = right.y - left.y;
      let direction = diff > 0 ? 1 : -1;

      let y = left.y;

      for (let i = 0; i <= Math.abs(diff); i++) {
        this.board[y][left.x] = Number(this.board[y][left.x]) + 1;

        y = y + direction;
      }
    } else if (left.y === right.y) {
      const diff = right.x - left.x;
      let direction = diff > 0 ? 1 : -1;

      let x = left.x;

      for (let i = 0; i <= Math.abs(diff); i++) {
        this.board[left.y][x] = Number(this.board[left.y][x]) + 1;
        x = x + direction;
      }

      return;
    } else {
      const yDiff = right.y - left.y;
      const xDiff = right.x - left.x;

      const slope = (left.y - right.y) / (left.x - right.x);

      if (Math.abs(slope) !== 1) {
        console.log('SLOPE: ', slope);
        return;
      }

      let yDirection = yDiff > 0 ? 1 : -1;
      let xDirection = xDiff > 0 ? 1 : -1;

      let x = left.x;
      let y = left.y;

      let run = true;

      while (run) {
        this.board[y][x] = Number(this.board[y][x]) + 1;
        if (y === right.y && x === right.x) {
          run = false;
        }

        x = x + xDirection;
        y = y + yDirection;
      }

      return;
    }
  }

  getScore() {
    let total = 0;
    for (let i = 0; i < this.board.length; i++) {
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

      if (left.x > x) {
        x = Number(left.x);
      }

      if (left.y > y) {
        y = Number(left.y);
      }
    }

    x += 1;
    y += 1;

    return Math.max(x, y);
  }

  init(segments) {
    const max = this.getDimensions(segments);

    const arr = [];

    for (let i = 0; i < max; i++) {
      arr.push([]);
    }

    for (const item of arr) {
      for (let i = 0; i < max; i++) {
        item.push(0);
      }
    }

    this.board = arr;
  }
}

const file = fs.readFileSync('./05.txt.back', 'utf-8');

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
