import Bitz from '../src/Bitz.js'
import Benchmark from 'nanobench'

const N = 200_000

Benchmark(`bitzArray.get middle N = ${N}`, bench => {
  const bitzArray = new Bitz()
  const mid = N / 2
  for (let i = 0; i < N; i++) bitzArray.push(i)
  bitzArray.balance()
  bench.start()
  bitzArray.get(mid)
  bench.end()
  bitzArray.clear()
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

Benchmark(`bitzArray.get random N = ${N}`, bench => {
  const bitzArray = new Bitz()
  for (let i = 0; i < N; i++) bitzArray.push(i)
  bitzArray.balance()
  bench.start()
  for (let i = 0; i < N; i++) bitzArray.get(Math.floor(Math.random() * N))
  bench.end()
  bitzArray.clear()
})

Benchmark(`regularArray.get random N = ${N}`, bench => {
  const regularArray = []
  for (let i = 0; i < N; i++) regularArray.push(i)
  bench.start()
  for (let i = 0; i < N; i++) regularArray[Math.floor(Math.random() * N)]
  bench.end()
  regularArray.length = 0
})

Benchmark(`bitzArray.push N = ${N}`, bench => {
  const bitzArray = new Bitz()
  bench.start()
  for (let i = 0; i < N; i++) bitzArray.push(1)
  bench.end()
  bitzArray.clear()
})

Benchmark(`regularArray.push N = ${N}`, bench => {
  const regularArray = []
  bench.start()
  for (let i = 0; i < N; i++) regularArray.push(1)
  bench.end()
  regularArray.length = 0
})

Benchmark(`bitzArray.pop N = ${N}`, bench => {
  const bitzArray = new Bitz()
  for (let i = 0; i < N; i++) bitzArray.push(i)
  bitzArray.balance()
  bench.start()
  for (let i = 0; i < N; i++) bitzArray.pop()
  bench.end()
  bitzArray.clear()
})

Benchmark(`regularArray.pop N = ${N}`, bench => {
  const regularArray = []
  for (let i = 0; i < N; i++) regularArray.push(i)
  bench.start()
  for (let i = 0; i < N; i++) regularArray.pop()
  bench.end()
  regularArray.length = 0
})

Benchmark(`bitzArray.shift N = ${N}`, bench => {
  const bitzArray = new Bitz()
  for (let i = 0; i < N; i++) bitzArray.push(i)
  bitzArray.balance()
  bench.start()
  for (let i = 0; i < N; i++) bitzArray.shift()
  bench.end()
  bitzArray.clear()
})

Benchmark(`regularArray.shift N = ${N}`, bench => {
  const regularArray = []
  for (let i = 0; i < N; i++) regularArray.push(i)
  bench.start()
  for (let i = 0; i < N; i++) regularArray.shift()
  bench.end()
  regularArray.length = 0
})

Benchmark(`bitzArray.unshift N = ${N}`, bench => {
  const bitzArray = new Bitz()
  bench.start()
  for (let i = 0; i < N; i++) bitzArray.unshift(1)
  bench.end()
  bitzArray.clear()
})

Benchmark(`regularArray.unshift N = ${N}`, bench => {
  const regularArray = []
  bench.start()
  for (let i = 0; i < N; i++) regularArray.unshift(1)
  bench.end()
  regularArray.length = 0
})

Benchmark(`bitzArray.quickSort N = ${N}`, bench => {
  const bitzArray = new Bitz()
  for (let i = 0; i < N; i++) {
    bitzArray.append(Math.random() * 1000)
  }

  bench.start()
  bitzArray.quickSort()
  bench.end()

  bitzArray.clear()
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
