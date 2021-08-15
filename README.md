# binary-array

Making the JavaScript array fast for large inputs.

insert O(1)  
remove O(1)  
access O(1)  
memory O(N) ~ O(N*2)  

npm i --save-dev

run tests:
npm run test

run benchmarks:

npm run binary-array-bench  
npm run binary-array-balancer-bench  
npm run time-per-operation-bench  
npm run time-per-operation-bench-balancer  

  
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
BinaryArray is ~40 times faster than regular array
for input of 100000 items  
(and as the input grows beyond that - it gets even more times faster)

