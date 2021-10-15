# binary-array

Making the JavaScript array fast for large inputs.

insert O(1)  
remove O(1)  
access O(1)  
memory O(N)

npm i --save-dev

run tests:
npm run test

run benchmarks:
npm run bench

Comparison for N = 100000 (runned on MacBook Pro M1 chip laptop)   
  
----------Binary Array------------  
binary array insert at start: 10.381ms  
binary array get: 0.27ms  
binary array remove at start: 6.794ms  
binary array insert at end: 7.26ms  
binary array get: 0.249ms  
binary array remove at end: 7.614ms  

binary array total: 33.421ms  
  
-------------Array----------------  
array insert at start: 1.102s    
array get: 0.012ms  
array remove at start: 1.095s    
array insert at end: 4.508ms    
array get: 0.005ms     
array remove at end: 3.265ms    

array total: 2.205s    


result:   
BinaryArray is ~60 times faster than regular array
for input of 100000 items  
(and as the input grows beyond that - it gets even more times faster)

