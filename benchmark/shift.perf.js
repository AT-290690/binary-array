import { BinaryArray } from '../src/BinaryArray.js';
import Benchmark from 'benchmark';
const suite = new Benchmark.Suite();
const binaryArray = new BinaryArray();
const array = new Array();
for (let i = 0; i < 100000; i++) {
  array.push(i);
  binaryArray.push(i);
}

suite
  .add('array.shift', () => array.shift(1))
  .add('binaryArray.shift', () => binaryArray.shift(1))
  .on('cycle', event => console.log(String(event.target)))
  .on('complete', function () {
    console.log('Fastest is ' + this.filter('fastest').map('name'));
  })
  .run({ async: true });
