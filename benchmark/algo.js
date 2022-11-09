import Brrr from '../src/Brrr.js'
import Benchmark from 'nanobench'

const N = 200_000

{
  let input = ''
  for (let i = 0; i < N; i++) {
    input += Math.random() > 0.25 ? '(' : ')'
  }
  Benchmark(`brrrArray matching parens N = ${N}`, bench => {
    bench.start()
    Brrr.from(input)
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

  Benchmark(`regularArray matching parens N = ${N}`, bench => {
    bench.start()
    Array.from(input).reduce((acc, x) => {
      x === '(' ? acc.unshift(x) : acc[0] === '(' ? acc.shift() : acc.push(x)
      return acc
    }, []).length === 0
    bench.end()
  })
}
{
  const tokens = { '(': ')', '{': '}', '[': ']' }
  const gen = Object.entries(tokens)
  let input = ''
  for (let i = 0; i < N; i++) {
    input +=
      gen[((Math.random() * 3) | 0.5) % 3][((Math.random() * 2) | 0.5) % 2]
  }

  Benchmark(`brrrArray matching all parens N = ${N}`, bench => {
    bench.start()
    Brrr.from(input).to((acc, x) =>
      x in tokens
        ? acc.prepend(x)
        : tokens[acc.first] === x
        ? acc.tail()
        : acc.append(x)
    )
    bench.end()
  })

  Benchmark(`regularArray matching all parens N = ${N}`, bench => {
    bench.start()
    Array.from(input).reduce((acc, x) => {
      x in tokens
        ? acc.unshift(x)
        : tokens[acc[0]] === x
        ? acc.shift()
        : acc.push(x)
      return acc
    }, [])
    bench.end()
  })
}
