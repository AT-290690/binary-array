import Brrr from '../src/Brrr.js'
import Benchmark from 'nanobench'

const N = 500_000

Benchmark(`brrrArray.shift N = ${N}`, bench => {
  const brrrArray = new Brrr()
  for (let i = 0; i < N; i++) brrrArray.push(i)
  brrrArray.balance()
  bench.start()
  for (let i = 0; i < N; i++) brrrArray.shift()
  bench.end()
  brrrArray.clear()
})

Benchmark(`regularArray.shift N = ${N}`, bench => {
  const regularArray = []
  for (let i = 0; i < N; i++) regularArray.push(i)
  bench.start()
  for (let i = 0; i < N; i++) regularArray.shift()
  bench.end()
  regularArray.length = 0
})

Benchmark(`brrrArray.unshift N = ${N}`, bench => {
  const brrrArray = new Brrr()
  bench.start()
  for (let i = 0; i < N; i++) brrrArray.unshift(1)
  bench.end()
  brrrArray.clear()
})

Benchmark(`regularArray.unshift N = ${N}`, bench => {
  const regularArray = []
  bench.start()
  for (let i = 0; i < N; i++) regularArray.unshift(1)
  bench.end()
  regularArray.length = 0
})
