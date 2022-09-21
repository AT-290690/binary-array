import BinaryArray from '../src/BinaryArray.js'
import Benchmark from 'nanobench'

const N = 200_000
let input = ''
for (let i = 0; i < N; i++) {
  input += Math.random() > 0.25 ? '(' : ')'
}

Benchmark(`binaryArray matching parens N = ${N}`, (bench) => {
  bench.start()
  BinaryArray.from(input)
    .to((acc, x) =>
      x === '('
        ? acc.prepend(x)
        : acc.first === '('
        ? acc.tail()
        : acc.append(x)
    )
    .isEmpty()
  bench.end()
})

Benchmark(`regularArray matching parens N = ${N}`, (bench) => {
  bench.start()
  Array.from(input).reduce((acc, x) => {
    x === '(' ? acc.unshift(x) : acc[0] === '(' ? acc.pop() : acc.push(x)
    return acc
  }, []).length === 0
  bench.end()
})
