import BinaryArray from '../src/BinaryArray.js'
import Benchmark from 'nanobench'

const N = 500_000

Benchmark(`binaryArray.shift N = ${N}`, (bench) => {
  const binaryArray = new BinaryArray()
  for (let i = 0; i < N; i++) binaryArray.push(i)
  binaryArray.balance()
  bench.start()
  for (let i = 0; i < N; i++) binaryArray.shift()
  bench.end()
  binaryArray.clear()
})

Benchmark(`regularArray.shift N = ${N}`, (bench) => {
  const regularArray = []
  for (let i = 0; i < N; i++) regularArray.push(i)
  bench.start()
  for (let i = 0; i < N; i++) regularArray.shift()
  bench.end()
  regularArray.length = 0
})

Benchmark(`binaryArray.unshift N = ${N}`, (bench) => {
  const binaryArray = new BinaryArray()
  bench.start()
  for (let i = 0; i < N; i++) binaryArray.unshift(1)
  bench.end()
  binaryArray.clear()
})

Benchmark(`regularArray.unshift N = ${N}`, (bench) => {
  const regularArray = []
  bench.start()
  for (let i = 0; i < N; i++) regularArray.unshift(1)
  bench.end()
  regularArray.length = 0
})
