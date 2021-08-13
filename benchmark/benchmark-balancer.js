import { BinaryArrayBalancer } from '../src/BinaryArrayBalancer.js';
import Benchmark from 'nanobench';

const N = 200000;
      
Benchmark('regularArray.get middle 200.000 items', b => {
  const regularArray = [];
  const mid = N/2;
  for (let i = 0; i < N; i++) {
    regularArray.push(i);
  }
      
  b.start();
  regularArray[mid];
  b.end();
  regularArray.length = 0;
});

Benchmark('binaryArrayBalancer.get middle 200.000 items', b => {
  const binaryArray = new BinaryArrayBalancer();
  const mid = N/2;
  for (let i = 0; i < N; i++) {
    binaryArray.push(i);
  }
      
  b.start();
  binaryArray.get(mid);
  b.end();
  binaryArray.clear();
});

Benchmark('regularArray.push 200.000 times', b => {
  const regularArray = [];
      
  b.start();
  for (let i = 0; i < N; i++) {
    regularArray.push(1);
  }
  b.end();
  regularArray.length = 0;
});

Benchmark('binaryArrayBalancer.push 200.000 times', b => {
  const binaryArray = new BinaryArrayBalancer();

  b.start();
  for (let i = 0; i < N; i++) {
    binaryArray.push(1);
  }
  b.end();
  binaryArray.clear();
});

Benchmark('regularArray.pop 200.000 times', b => {
  const regularArray = [];

  b.start();
  for (let i = 0; i < N; i++) {
    regularArray.pop();
  }
  b.end();
  regularArray.length = 0;
});

Benchmark('binaryArrayBalancer.pop 200.000 times', b => {
  const binaryArray = new BinaryArrayBalancer();

  b.start();
  for (let i = 0; i < N; i++) {
    binaryArray.pop();
  }
  b.end();
  binaryArray.clear();
});

Benchmark('regularArray.shift 200.000 times', b => {
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

Benchmark('binaryArrayBalancer.shift 200.000 times', b => {
  const binaryArray = new BinaryArrayBalancer();
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

Benchmark('regularArray.unshift 200.000 times', b => {
  const regularArray = [];

  b.start();
  for (let i = 0; i < N; i++) {
    regularArray.unshift(1);
  }
  b.end();
  regularArray.length = 0;
});

Benchmark('binaryArrayBalancer.unshift 200.000 times', b => {
  const binaryArray = new BinaryArrayBalancer();

  b.start();
  for (let i = 0; i < N; i++) {
    binaryArray.unshift(1);
  }
  b.end();
  binaryArray.clear();
});
