import { BinaryArray } from '../src/BinaryArray.js';
import Benchmark from 'nanobench';

const N = 200000;

Benchmark('regularArray.get middle N = 200 000', b => {
  const regularArray = [];
  const mid = N / 2;
  for (let i = 0; i < N; i++) {
    regularArray.push(i);
  }

  b.start();
  regularArray[mid];
  b.end();
  regularArray.length = 0;
});

Benchmark('binaryArray.get middle N = 200 000', b => {
  const binaryArray = new BinaryArray();
  const mid = N / 2;
  for (let i = 0; i < N; i++) {
    binaryArray.push(i);
  }

  b.start();
  binaryArray.get(mid);
  b.end();
  binaryArray.clear();
});

Benchmark('regularArray.get random N = 200 000', b => {
  const regularArray = [];
  for (let i = 0; i < N; i++) {
    regularArray.push(i);
  }

  b.start();
  for (let i = 0; i < N; i++) {
    regularArray[Math.floor(Math.random() * N)];
  }
  b.end();
  regularArray.length = 0;
});

Benchmark('binaryArray.get random N = 200 000', b => {
  const binaryArray = new BinaryArray();
  for (let i = 0; i < N; i++) {
    binaryArray.push(i);
  }

  b.start();
  for (let i = 0; i < N; i++) {
    binaryArray.get(Math.floor(Math.random() * N));
  }
  b.end();
  binaryArray.clear();
});

Benchmark('regularArray.push N = 200 000', b => {
  const regularArray = [];

  b.start();
  for (let i = 0; i < N; i++) {
    regularArray.push(1);
  }
  b.end();
  regularArray.length = 0;
});

Benchmark('binaryArray.push N = 200 000', b => {
  const binaryArray = new BinaryArray();

  b.start();
  for (let i = 0; i < N; i++) {
    binaryArray.push(1);
  }
  b.end();
  binaryArray.clear();
});

Benchmark('regularArray.pop N = 200 000', b => {
  const regularArray = [];

  b.start();
  for (let i = 0; i < N; i++) {
    regularArray.pop();
  }
  b.end();
  regularArray.length = 0;
});

Benchmark('binaryArray.pop N = 200 000', b => {
  const binaryArray = new BinaryArray();

  b.start();
  for (let i = 0; i < N; i++) {
    binaryArray.pop();
  }
  b.end();
  binaryArray.clear();
});

Benchmark('regularArray.shift N = 200 000', b => {
  const regularArray = [];
  for (let i = 0; i < N; i++) {
    regularArray.push(i);
  }

  b.start();
  for (let i = 0; i < N; i++) {
    regularArray.shift();
  }
  b.end();
  regularArray.length = 0;
});

Benchmark('binaryArray.shift N = 200 000', b => {
  const binaryArray = new BinaryArray();
  for (let i = 0; i < N; i++) {
    binaryArray.push(i);
  }

  b.start();
  for (let i = 0; i < N; i++) {
    binaryArray.shift();
  }
  b.end();
  binaryArray.clear();
});

Benchmark('regularArray.unshift N = 200 000', b => {
  const regularArray = [];

  b.start();
  for (let i = 0; i < N; i++) {
    regularArray.unshift(1);
  }
  b.end();
  regularArray.length = 0;
});

Benchmark('binaryArray.unshift N = 200 000', b => {
  const binaryArray = new BinaryArray();

  b.start();
  for (let i = 0; i < N; i++) {
    binaryArray.unshift(1);
  }
  b.end();
  binaryArray.clear();
});
