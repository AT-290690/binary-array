import Binar from '../src/Binar.js'
import Benchmark from 'nanobench'

const N = 200_000

Benchmark(`binArray.get middle N = ${N}`, (bench) => {
  const binArray = new Binar()
  const mid = N / 2
  for (let i = 0; i < N; i++) binArray.push(i)
  binArray.balance()
  bench.start()
  binArray.get(mid)
  bench.end()
  binArray.clear()
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

Benchmark(`binArray.get random N = ${N}`, (bench) => {
  const binArray = new Binar()
  for (let i = 0; i < N; i++) binArray.push(i)
  binArray.balance()
  bench.start()
  for (let i = 0; i < N; i++) binArray.get(Math.floor(Math.random() * N))
  bench.end()
  binArray.clear()
})

Benchmark(`regularArray.get random N = ${N}`, (bench) => {
  const regularArray = []
  for (let i = 0; i < N; i++) regularArray.push(i)
  bench.start()
  for (let i = 0; i < N; i++) regularArray[Math.floor(Math.random() * N)]
  bench.end()
  regularArray.length = 0
})

Benchmark(`binArray.push N = ${N}`, (bench) => {
  const binArray = new Binar()
  bench.start()
  for (let i = 0; i < N; i++) binArray.push(1)
  bench.end()
  binArray.clear()
})

Benchmark(`regularArray.push N = ${N}`, (bench) => {
  const regularArray = []
  bench.start()
  for (let i = 0; i < N; i++) regularArray.push(1)
  bench.end()
  regularArray.length = 0
})

Benchmark(`binArray.pop N = ${N}`, (bench) => {
  const binArray = new Binar()
  for (let i = 0; i < N; i++) binArray.push(i)
  binArray.balance()
  bench.start()
  for (let i = 0; i < N; i++) binArray.pop()
  bench.end()
  binArray.clear()
})

Benchmark(`regularArray.pop N = ${N}`, (bench) => {
  const regularArray = []
  for (let i = 0; i < N; i++) regularArray.push(i)
  bench.start()
  for (let i = 0; i < N; i++) regularArray.pop()
  bench.end()
  regularArray.length = 0
})

Benchmark(`binArray.shift N = ${N}`, (bench) => {
  const binArray = new Binar()
  for (let i = 0; i < N; i++) binArray.push(i)
  binArray.balance()
  bench.start()
  for (let i = 0; i < N; i++) binArray.shift()
  bench.end()
  binArray.clear()
})

Benchmark(`regularArray.shift N = ${N}`, (bench) => {
  const regularArray = []
  for (let i = 0; i < N; i++) regularArray.push(i)
  bench.start()
  for (let i = 0; i < N; i++) regularArray.shift()
  bench.end()
  regularArray.length = 0
})

Benchmark(`binArray.unshift N = ${N}`, (bench) => {
  const binArray = new Binar()
  bench.start()
  for (let i = 0; i < N; i++) binArray.unshift(1)
  bench.end()
  binArray.clear()
})

Benchmark(`regularArray.unshift N = ${N}`, (bench) => {
  const regularArray = []
  bench.start()
  for (let i = 0; i < N; i++) regularArray.unshift(1)
  bench.end()
  regularArray.length = 0
})

Benchmark(`binArray.quickSort N = ${N}`, (bench) => {
  const binArray = new Binar()
  for (let i = 0; i < N; i++) {
    binArray.append(Math.random() * 1000)
  }

  bench.start()
  binArray.quickSort()
  bench.end()

  binArray.clear()
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
