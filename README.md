# binary-array

Making the JavaScript array fast for large inputs.

 +-------+--------+--------+--------+--------+ +-------+---------+
 | from  | insert | access | assign | delete | | case  | memory  |
 +-------+--------+--------+--------+--------+ +-------+---------+
 | start |  O(1)  |  O(1)  |  O(1)  |  O(1)  | | worst | O(N*2)  |
 +-------+--------+--------+--------+--------+ +-------+---------+
 | end   |  O(1)  |  O(1)  |  O(1)  |  O(1)  | | best  |  O(N)   |
 +-------+--------+--------+--------+--------+ +-------+---------+
 | mid   |  O(N)  |  O(1)  |  O(1)  |  O(N)  | | avg   | O(N+N/2)|
 +-------+--------+--------+--------+--------+ +-------+---------+

npm i --save-dev

run tests:
npm run test

run benchmarks:
npm run bench
