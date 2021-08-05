import { BinaryArray } from './src/BinaryArray.js';
import Benchmark from 'benchmark';
const suite = new Benchmark.Suite();
const binaryArray = new BinaryArray();
const regularArray = [];
suite
  .add('regularArray.unshift', () => regularArray.unshift(1))
  .add('binaryArray.unshift', () => binaryArray.unshift(1))
  .on('cycle', event => console.log(String(event.target)))
  .on('complete', function () {
    console.log('Fastest is ' + this.filter('fastest').map('name'));
  })
  .run({ async: true });
