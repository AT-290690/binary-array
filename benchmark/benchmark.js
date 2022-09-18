import BinaryArray from "../src/BinaryArray.js"
import Benchmark from "nanobench"

const N = 200_000

Benchmark(`binaryArray.get middle N = ${N}`, (bench) => {
  const binaryArray = new BinaryArray()
  const mid = N / 2
  for (let i = 0; i < N; i++) binaryArray.push(i)
  binaryArray.balance()
  bench.start()
  binaryArray.get(mid)
  bench.end()
  binaryArray.clear()
})

Benchmark(`regularArray.get middle N = ${N}`, (bench) => {
  const regularArray = []
  const mid = N / 2
  for (let i = 0; i < N; i++) regularArray.push(i)
  bench.start()
  regularArray[mid]
  bench.end()
  regularArray.length = 0
})

Benchmark(`binaryArray.get random N = ${N}`, (bench) => {
  const binaryArray = new BinaryArray()
  for (let i = 0; i < N; i++) binaryArray.push(i)
  binaryArray.balance()
  bench.start()
  for (let i = 0; i < N; i++) binaryArray.get(Math.floor(Math.random() * N))
  bench.end()
  binaryArray.clear()
})

Benchmark(`regularArray.get random N = ${N}`, (bench) => {
  const regularArray = []
  for (let i = 0; i < N; i++) regularArray.push(i)
  bench.start()
  for (let i = 0; i < N; i++) regularArray[Math.floor(Math.random() * N)]
  bench.end()
  regularArray.length = 0
})

Benchmark(`binaryArray.push N = ${N}`, (bench) => {
  const binaryArray = new BinaryArray()
  bench.start()
  for (let i = 0; i < N; i++) binaryArray.push(1)
  bench.end()
  binaryArray.clear()
})

Benchmark(`regularArray.push N = ${N}`, (bench) => {
  const regularArray = []
  bench.start()
  for (let i = 0; i < N; i++) regularArray.push(1)
  bench.end()
  regularArray.length = 0
})

Benchmark(`binaryArray.pop N = ${N}`, (bench) => {
  const binaryArray = new BinaryArray()
  for (let i = 0; i < N; i++) binaryArray.push(i)
  binaryArray.balance()
  bench.start()
  for (let i = 0; i < N; i++) binaryArray.pop()
  bench.end()
  binaryArray.clear()
})

Benchmark(`regularArray.pop N = ${N}`, (bench) => {
  const regularArray = []
  for (let i = 0; i < N; i++) regularArray.push(i)
  bench.start()
  for (let i = 0; i < N; i++) regularArray.pop()
  bench.end()
  regularArray.length = 0
})

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

Benchmark(`binaryArray.quickSort N = ${N}`, (bench) => {
  const binaryArray = new BinaryArray()
  for (let i = 0; i < N; i++) {
    binaryArray.append(Math.random() * 1000)
  }

  bench.start()
  binaryArray.quickSort()
  bench.end()

  binaryArray.clear()
})

Benchmark(`regularArray.sort N = ${N}`, (bench) => {
  const regularArray = []
  for (let i = 0; i < N; i++) {
    regularArray.push(Math.random() * 1000)
  }

  bench.start()
  regularArray.sort()
  bench.end()
  regularArray.length = 0
})
