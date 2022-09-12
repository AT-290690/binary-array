import BinaryArray from '../src/BinaryArray.js';
import Benchmark from 'nanobench';

const N = 1_000_000;

Benchmark(`binaryArray.get middle N = ${N}`, bench => {
  const binaryArray = new BinaryArray();
  for (let i = 0; i < N; i++) {
    binaryArray.append(i);
  }
  binaryArray.balance();

  bench.start();
  binaryArray.get(N / 2);
  bench.end();
  binaryArray.clear();
});

Benchmark(`binaryArray.get random N = ${N}`, bench => {
  const binaryArray = new BinaryArray();
  for (let i = 0; i < N; i++) {
    binaryArray.append(i);
  }
  binaryArray.balance();

  bench.start();
  for (let i = 0; i < N; i++) {
    binaryArray.get(Math.floor(Math.random() * N));
  }
  bench.end();
  binaryArray.clear();
});

Benchmark(`binaryArray.append N = ${N}`, bench => {
  const binaryArray = new BinaryArray();
  binaryArray.balance();

  bench.start();
  for (let i = 0; i < N; i++) {
    binaryArray.append(1);
  }
  bench.end();
  binaryArray.clear();
});

Benchmark(`binaryArray.head N = ${N}`, bench => {
  const binaryArray = new BinaryArray();
  for (let i = 0; i < N; i++) {
    binaryArray.append(i);
  }
  binaryArray.balance();

  bench.start();
  for (let i = 0; i < N; i++) {
    binaryArray.head();
  }
  bench.end();
  binaryArray.clear();
});

Benchmark(`binaryArray.tail N = ${N}`, bench => {
  const binaryArray = new BinaryArray();
  for (let i = 0; i < N; i++) {
    binaryArray.append(i);
  }
  binaryArray.balance();

  bench.start();
  for (let i = 0; i < N; i++) {
    binaryArray.tail();
  }
  bench.end();
  binaryArray.clear();
});

Benchmark(`binaryArray.prepend N = ${N}`, bench => {
  const binaryArray = new BinaryArray();
  binaryArray.balance();

  bench.start();
  for (let i = 0; i < N; i++) {
    binaryArray.prepend(1);
  }
  bench.end();
  binaryArray.clear();
});

Benchmark(`binaryArray.rotateRight N = ${N}`, bench => {
  const binaryArray = new BinaryArray();
  for (let i = 0; i < N; i++) {
    binaryArray.append(i);
  }
  binaryArray.balance();

  bench.start();
  binaryArray.rotateRight(N - 1);
  bench.end();
  binaryArray.clear();
});

Benchmark(`binaryArray.rotateLeft N = ${N}`, bench => {
  const binaryArray = new BinaryArray();
  for (let i = 0; i < N; i++) {
    binaryArray.append(i);
  }
  binaryArray.balance();

  bench.start();
  binaryArray.rotateLeft(N - 1);
  bench.end();
  binaryArray.clear();
});