import Binar from '../src/Binar.js'
import Benchmark from 'nanobench'

const N = 500_000

Benchmark(`binArray.shift N = ${N}`, bench => {
  const binArray = new Binar()
  for (let i = 0; i < N; i++) binArray.push(i)
  binArray.balance()
  bench.start()
  for (let i = 0; i < N; i++) binArray.shift()
  bench.end()
  binArray.clear()
})

Benchmark(`regularArray.shift N = ${N}`, bench => {
  const regularArray = []
  for (let i = 0; i < N; i++) regularArray.push(i)
  bench.start()
  for (let i = 0; i < N; i++) regularArray.shift()
  bench.end()
  regularArray.length = 0
})

Benchmark(`binArray.unshift N = ${N}`, bench => {
  const binArray = new Binar()
  bench.start()
  for (let i = 0; i < N; i++) binArray.unshift(1)
  bench.end()
  binArray.clear()
})

Benchmark(`regularArray.unshift N = ${N}`, bench => {
  const regularArray = []
  bench.start()
  for (let i = 0; i < N; i++) regularArray.unshift(1)
  bench.end()
  regularArray.length = 0
})
