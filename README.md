# binar

## Making the JavaScript array fast for large inputs.

npm i --save-dev

npm run test

npm run bench

insert O(1)  
remove O(1)  
access O(1)  
memory O(N)

Elegant API (Entire algorithms can be expressed in few lines of code)

```js
// validate matching parens
Binar.from('((()))()()(())')
  .to((acc, x) =>
    x === '(' ? acc.prepend(x) : acc.first === '(' ? acc.tail() : acc.append(x)
  )
  .isEmpty()
```
[playground](https://at-290690.github.io/YavaScript/?g=AT-290690/9021bc9afd9420cb44d4db652cbff59c/raw/8a305d1dc3f56e424ed339e857b549ee7dd38595/BinaryArray.js)

Structure

```js
const array = new Binar().insertLeft(-2, -1).insertRight(0, 1, 2, 3, 4);
{
  left: [ -1, -1, -2 ],
  right: [ 0, 1, 2, 3, 4 ]
}
array.items => [-2, -1, 0, 1, 2, 3, 4]
```

Get each index

![1_CJHj_FVbZ61iWSIevvMrsw](https://user-images.githubusercontent.com/88512646/189848001-5274f5bf-200d-46e3-80df-25c5718bfc4a.gif)

Comparison for N = 200 000 (runned on MacBook Pro M1 chip laptop)

```
$ node benchmark/benchmark.js
NANOBENCH version 2

> node benchmark/benchmark.js

N = 200 000

binArray.get middle (once)
ok ~118 μs (0 s + 118333 ns)

regularArray.get middle (once)
ok ~54 μs (0 s + 54292 ns)

binArray.get random
ok ~7.49 ms (0 s + 7489583 ns)

regularArray.get random
ok ~7.45 ms (0 s + 7449834 ns)

binArray.push
ok ~7.96 ms (0 s + 7960417 ns)

regularArray.push
ok ~5.28 ms (0 s + 5283917 ns)

binArray.pop
ok ~8.93 ms (0 s + 8927333 ns)

regularArray.pop
ok ~2.15 ms (0 s + 2145750 ns)

binArray.shift 🚀
ok ~72 ms (0 s + 72263500 ns)

regularArray.shift 🐌
ok ~4.97 s (4 s + 973667083 ns)

binArray.unshift 🚀
ok ~5.53 ms (0 s + 5534333 ns)

regularArray.unshift 🐌
ok ~4.59 s (4 s + 588392875 ns)

all benchmarks completed
ok ~9.68 s (9 s + 679287250 ns)
```
