# binary-array

Making the JavaScript array fast for large inputs.

![1_zVaXjvuxUmALcBbQW6Ttlg](https://user-images.githubusercontent.com/88512646/189848446-db97cd75-58ac-483f-82ab-4e8924308f79.png)


insert O(1)  
remove O(1)  
access O(1)  
memory O(N)

npm i --save-dev

run tests:
npm run test

run benchmarks:
npm run bench

Comparison for N = 200 000 (runned on MacBook Pro M1 chip laptop)

yarn run v1.22.15
$ node benchmark/benchmark.js
NANOBENCH version 2
> node benchmark/benchmark.js

N = 200 000
 
regularArray.get middle
ok ~54 μs (0 s + 54292 ns)

binaryArray.get middle
ok ~118 μs (0 s + 118333 ns)

regularArray.get random
ok ~7.45 ms (0 s + 7449834 ns)

binaryArray.get random
ok ~7.49 ms (0 s + 7489583 ns)

regularArray.push
ok ~5.28 ms (0 s + 5283917 ns)

binaryArray.push
ok ~7.96 ms (0 s + 7960417 ns)

regularArray.pop
ok ~2.15 ms (0 s + 2145750 ns)

binaryArray.pop
ok ~8.93 ms (0 s + 8927333 ns)

regularArray.shift
ok ~4.97 s (4 s + 973667083 ns)

binaryArray.shift
ok ~72 ms (0 s + 72263500 ns)

regularArray.unshift
ok ~4.59 s (4 s + 588392875 ns)

binaryArray.unshift
ok ~5.53 ms (0 s + 5534333 ns)

all benchmarks completed
ok ~9.68 s (9 s + 679287250 ns)

✨  Done in 10.22s.


![1_CJHj_FVbZ61iWSIevvMrsw](https://user-images.githubusercontent.com/88512646/189848001-5274f5bf-200d-46e3-80df-25c5718bfc4a.gif)
![1_3sZTCd-Ca1ua3I0i5SG3xw](https://user-images.githubusercontent.com/88512646/189848250-d4ae2333-93c4-411c-94e7-66dbf6e9794d.png)


