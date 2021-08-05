import { BinaryArray } from '../src/BinaryArray.js';
const array = [];
const binaryArray = new BinaryArray();
const iterations = 100000;
console.log('<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<');
console.log('----------Binary Array------------');
console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
console.time('binary array total');
console.time('binary array insert at start');
for (let i = 0; i < iterations; i++) binaryArray.unshift(i);
console.timeEnd('binary array insert at start');
console.time('binary array get');
binaryArray.get(Math.floor(binaryArray.size / 2));
console.timeEnd('binary array get');
console.time('binary array remove at start');
for (let i = 0; i < iterations; i++) binaryArray.shift();
console.timeEnd('binary array remove at start');
console.time('binary array insert at end');
for (let i = 0; i < iterations; i++) binaryArray.push(i);
console.timeEnd('binary array insert at end');
console.time('binary array get');
binaryArray.get(Math.floor(binaryArray.size / 2));
console.timeEnd('binary array get');
console.time('binary array remove at end');
for (let i = 0; i < iterations; i++) binaryArray.pop();
console.timeEnd('binary array remove at end');
console.timeEnd('binary array total');

console.log('<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<');
console.log('-------------Array----------------');
console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
console.time('array total');
console.time('array insert at start');
for (let i = 0; i < iterations; i++) array.unshift(i);
console.timeEnd('array insert at start');
console.time('array get');
array[Math.floor(array.length / 2)];
console.timeEnd('array get');
console.time('array remove at start');
for (let i = 0; i < iterations; i++) array.shift();
console.timeEnd('array remove at start');
console.time('array insert at end');
for (let i = 0; i < iterations; i++) array.push(i);
console.timeEnd('array insert at end');
console.time('array get');
array[Math.floor(array.length / 2)];
console.timeEnd('array get');
console.time('array remove at end');
for (let i = 0; i < iterations; i++) array.pop();
console.timeEnd('array remove at end');
console.timeEnd('array total');
console.log('<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<');