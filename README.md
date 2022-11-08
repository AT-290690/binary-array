# Bitz
<p align="center">
<img  width="100" alt="Thunder Logo" src="https://user-images.githubusercontent.com/88512646/200684693-ff06ff9d-12a1-404c-9d4e-7fbb541dba23.png" />
</p>

## instant array operations

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
Bitz.from('((()))()()(())()')
  .to((stack, paren) => 
    paren === '(' ? stack.prepend(paren) : 
                    stack.first === '(' ? stack.tail() :
                                          stack.append(paren))
  .isEmpty()
```

Unoptimal array solutions are as efficient as optimal ones

```js
const code = '49380518301380480923802840'
// change these numbers to reveal subset of the code
const index = 4
const amount = 3

log(
  `|${Bitz.from(code)
    .rotateLeft(index) // shift X times to the left
    .map((char, index, arr) => (index > amount - 1 ? '.' : char)) // mask out a portion of the code
    .rotateRight(index) // shift X times to the right
    .items.join('')}|`,
  `reveal mask subset of the code (index: ${index} amount: ${amount})`
)
```

Try it out at the [playground](https://at-290690.github.io/YavaScript/?g=AT-290690/675b2c3d986aca3fd04bf64daa66b631/raw/50f078a8f14bd5fbfd01e2bad3cb9307a6c2771f/BitzArray.js)

Structure

```js
const array = new Bitz().insertLeft(-2, -1).insertRight(0, 1, 2, 3, 4);
{
  left: [ -1, -1, -2 ],
  right: [ 0, 1, 2, 3, 4 ]
}
array.items => [-2, -1, 0, 1, 2, 3, 4]
```

Indexing is guaranteed without the need of reordering thanks to simple arithmetics:

![1_CJHj_FVbZ61iWSIevvMrsw](https://user-images.githubusercontent.com/88512646/189848001-5274f5bf-200d-46e3-80df-25c5718bfc4a.gif)

Comparison for N = 200 000 (runned on MacBook Pro M1 chip laptop)

```
$ node benchmark/benchmark.js
NANOBENCH version 2

> node benchmark/benchmark.js

N = 200 000

bitzArray.get middle (once)
ok ~118 μs (0 s + 118333 ns)

regularArray.get middle (once)
ok ~54 μs (0 s + 54292 ns)

bitzArray.get random
ok ~7.49 ms (0 s + 7489583 ns)

regularArray.get random
ok ~7.45 ms (0 s + 7449834 ns)

bitzArray.push
ok ~7.96 ms (0 s + 7960417 ns)

regularArray.push
ok ~5.28 ms (0 s + 5283917 ns)

bitzArray.pop
ok ~8.93 ms (0 s + 8927333 ns)

regularArray.pop
ok ~2.15 ms (0 s + 2145750 ns)

bitzArray.shift 🚀
ok ~72 ms (0 s + 72263500 ns)

regularArray.shift 🐌
ok ~4.97 s (4 s + 973667083 ns)

bitzArray.unshift 🚀
ok ~5.53 ms (0 s + 5534333 ns)

regularArray.unshift 🐌
ok ~4.59 s (4 s + 588392875 ns)

all benchmarks completed
ok ~9.68 s (9 s + 679287250 ns)
```
