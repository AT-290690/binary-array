import Brrr from '../src/Brrr.js'
import Benchmark from 'nanobench'

const N = 200_000

Benchmark(`brrrArray.get middle N = ${N}`, bench => {
  const brrrArray = new Brrr()
  const mid = N / 2
  for (let i = 0; i < N; i++) brrrArray.push(i)
  brrrArray.balance()
  bench.start()
  brrrArray.get(mid)
  bench.end()
  brrrArray.clear()
})

Benchmark(`regularArray.get middle N = ${N}`, bench => {
  const regularArray = []
  const mid = N / 2
  for (let i = 0; i < N; i++) regularArray.push(i)
  bench.start()
  regularArray[mid]
  bench.end()
  regularArray.length = 0
})

Benchmark(`brrrArray.get random N = ${N}`, bench => {
  const brrrArray = new Brrr()
  for (let i = 0; i < N; i++) brrrArray.push(i)
  brrrArray.balance()
  bench.start()
  for (let i = 0; i < N; i++) brrrArray.get(Math.floor(Math.random() * N))
  bench.end()
  brrrArray.clear()
})

Benchmark(`regularArray.get random N = ${N}`, bench => {
  const regularArray = []
  for (let i = 0; i < N; i++) regularArray.push(i)
  bench.start()
  for (let i = 0; i < N; i++) regularArray[Math.floor(Math.random() * N)]
  bench.end()
  regularArray.length = 0
})

Benchmark(`brrrArray.push N = ${N}`, bench => {
  const brrrArray = new Brrr()
  bench.start()
  for (let i = 0; i < N; i++) brrrArray.push(1)
  bench.end()
  brrrArray.clear()
})

Benchmark(`regularArray.push N = ${N}`, bench => {
  const regularArray = []
  bench.start()
  for (let i = 0; i < N; i++) regularArray.push(1)
  bench.end()
  regularArray.length = 0
})

Benchmark(`brrrArray.pop N = ${N}`, bench => {
  const brrrArray = new Brrr()
  for (let i = 0; i < N; i++) brrrArray.push(i)
  brrrArray.balance()
  bench.start()
  for (let i = 0; i < N; i++) brrrArray.pop()
  bench.end()
  brrrArray.clear()
})

Benchmark(`regularArray.pop N = ${N}`, bench => {
  const regularArray = []
  for (let i = 0; i < N; i++) regularArray.push(i)
  bench.start()
  for (let i = 0; i < N; i++) regularArray.pop()
  bench.end()
  regularArray.length = 0
})

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

Benchmark(`brrrArray.quickSort N = ${N}`, bench => {
  const brrrArray = new Brrr()
  for (let i = 0; i < N; i++) {
    brrrArray.append(Math.random() * 1000)
  }

  bench.start()
  brrrArray.quickSort()
  bench.end()

  brrrArray.clear()
})

Benchmark(`regularArray.sort N = ${N}`, bench => {
  const regularArray = []
  for (let i = 0; i < N; i++) {
    regularArray.push(Math.random() * 1000)
  }

  bench.start()
  regularArray.sort()
  bench.end()
  regularArray.length = 0
})
