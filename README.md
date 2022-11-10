# Brrr

<p align="center">
<img  width="100" alt="Thunder Logo" src="https://user-images.githubusercontent.com/88512646/200684693-ff06ff9d-12a1-404c-9d4e-7fbb541dba23.png" />
</p>

## Instant array operations

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
Brrr.from('((()))()()(())()')
  .to((stack, paren) =>
    paren === '('
      ? stack.prepend(paren)
      : stack.first === '('
      ? stack.tail()
      : stack.append(paren)
  )
  .isEmpty()
```

Unoptimal array solutions are as efficient as optimal ones

Try it out at the [playground](https://at-290690.github.io/YavaScript/?g=AT-290690/675b2c3d986aca3fd04bf64daa66b631/raw/afe22cebc8c90170c0fa52dc92dfe1105f40b613/BitzArray.js)

Structure

```js
const array = new Brrr().insertLeft(-2, -1).insertRight(0, 1, 2, 3, 4);
{
  left: [ -1, -1, -2 ],
  right: [ 0, 1, 2, 3, 4 ]
}
array.items => [-2, -1, 0, 1, 2, 3, 4]
```

Indexing is guaranteed without the need of reordering thanks to simple arithmetics:

![1_CJHj_FVbZ61iWSIevvMrsw](https://user-images.githubusercontent.com/88512646/189848001-5274f5bf-200d-46e3-80df-25c5718bfc4a.gif)

```js
 -  [Symbol(-0), 3, 2, 1, 0] // left
 +  [4, 5, 6, 7, 8]          // right

[0] -> 0 - 4 = -4 => 0 // -
[1] -> 1 - 4 = -3 => 1 // -
[2] -> 2 - 4 = -2 => 2 // -
[3] -> 3 - 4 = -1 -> 3 // -
[4] -> 4 - 4 =  0 => 4 // +
[5] -> 5 - 4 =  1 => 5 // +
[6] -> 6 - 4 =  2 => 6 // +
[7] -> 7 - 4 =  3 => 7 // +
[8] -> 8 - 4 =  4 => 8 // +

[0, 1, 2, 3, 4, 5, 6, 7, 8]
```

Comparison for N = 200 000 (runned on MacBook Pro M1 chip laptop)

```
$ node benchmark/benchmark.js
NANOBENCH version 2

> node benchmark/benchmark.js

N = 200 000

brrrArray.get middle (once)
ok ~118 μs (0 s + 118333 ns)

regularArray.get middle (once)
ok ~54 μs (0 s + 54292 ns)

brrrArray.get random
ok ~7.49 ms (0 s + 7489583 ns)

regularArray.get random
ok ~7.45 ms (0 s + 7449834 ns)

brrrArray.push
ok ~7.96 ms (0 s + 7960417 ns)

regularArray.push
ok ~5.28 ms (0 s + 5283917 ns)

brrrArray.pop
ok ~8.93 ms (0 s + 8927333 ns)

regularArray.pop
ok ~2.15 ms (0 s + 2145750 ns)

brrrArray.shift 🚀
ok ~72 ms (0 s + 72263500 ns)

regularArray.shift 🐌
ok ~4.97 s (4 s + 973667083 ns)

brrrArray.unshift 🚀
ok ~5.53 ms (0 s + 5534333 ns)

regularArray.unshift 🐌
ok ~4.59 s (4 s + 588392875 ns)

all benchmarks completed
ok ~9.68 s (9 s + 679287250 ns)
```
