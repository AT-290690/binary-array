import { BinaryArrayBalancer } from '../src/BinaryArrayBalancer.js';
import Benchmark from 'nanobench';

Benchmark('regularArray.get 200.000 items', b => {
  const regularArray = [];
  for (let i = 0; i < 200000; i++) {
    regularArray.push(i);
  }
  b.start();
  regularArray[100000];
  b.end();
  regularArray.length = 0;
});

Benchmark('binaryArrayBalancer.get 200.000 items', b => {
  const binaryArray = new BinaryArrayBalancer();
  for (let i = 0; i < 200000; i++) {
    binaryArray.push(i);
  }
  b.start();
  binaryArray.get(100000);
  b.end();
  binaryArray.clear();
});

Benchmark('regularArray.push 200.000 times', b => {
  const regularArray = [];
  b.start();
  for (let i = 0; i < 200000; i++) {
    regularArray.push(1);
  }
  b.end();
  regularArray.length = 0;
});

Benchmark('binaryArrayBalancer.push 200.000 times', b => {
  const binaryArray = new BinaryArrayBalancer();

  b.start();
  for (let i = 0; i < 200000; i++) {
    binaryArray.push(1);
  }
  b.end();
  binaryArray.clear();
});

Benchmark('regularArray.pop 200.000 times', b => {
  const regularArray = [];

  b.start();
  for (let i = 0; i < 200000; i++) {
    regularArray.pop();
  }
  b.end();
  regularArray.length = 0;
});

Benchmark('binaryArrayBalancer.pop 200.000 times', b => {
  const binaryArray = new BinaryArrayBalancer();

  b.start();
  for (let i = 0; i < 200000; i++) {
    binaryArray.pop();
  }
  b.end();
  binaryArray.clear();
});

Benchmark('regularArray.shift 200.000 times', b => {
  const regularArray = [];
  for (let i = 0; i < 200000; i++) {
    regularArray.push(i);
  }
  b.start();
  for (let i = 0; i < 200000; i++) {
    regularArray.shift();
  }
  b.end();
  regularArray.length = 0;
});

Benchmark('binaryArrayBalancer.shift 200.000 times', b => {
  const binaryArray = new BinaryArrayBalancer();
  for (let i = 0; i < 200000; i++) {
    binaryArray.push(i);
  }
  b.start();
  for (let i = 0; i < 200000; i++) {
    binaryArray.shift();
  }
  b.end();
  binaryArray.clear();
});

Benchmark('regularArray.unshift 200.000 times', b => {
  const regularArray = [];

  b.start();
  for (let i = 0; i < 200000; i++) {
    regularArray.unshift(1);
  }
  b.end();
  regularArray.length = 0;
});

Benchmark('binaryArrayBalancer.unshift 200.000 times', b => {
  const binaryArray = new BinaryArrayBalancer();

  b.start();
  for (let i = 0; i < 200000; i++) {
    binaryArray.unshift(1);
  }
  b.end();
  binaryArray.clear();
});
