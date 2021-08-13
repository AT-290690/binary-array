# binary-array

Making the JavaScript array fast for large inputs.

insert O(1)
remove O(1)
access O(1)
memory O(N) ~ O(N*2)

npm i --save-dev

npm i npm-run-all 

run tests:
npm run test

run benchmarks:
npm run bench


Comparison for N = 100000 (runned on MacBook Pro M1 chip laptop) 

----------Binary Array------------
binary array insert at start: 28.983ms
binary array get: 0.041ms
binary array remove at start: 15.064ms
binary array insert at end: 4.072ms
binary array get: 0.149ms
binary array remove at end: 5.278ms
binary array total: 54.234ms

-------------Array----------------
array insert at start: 1.102s
array get: 0.012ms
array remove at start: 1.095s
array insert at end: 4.508ms
array get: 0.005ms
array remove at end: 3.265ms
array total: 2.205s

result: 
array is: 
up to ~2ms faster for push and pop, 
up to ~0.030ms faster for access,
but for shift and unshift with an input of size 100000
its ~972ms slower and grows quadratically.


