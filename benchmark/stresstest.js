import Bitz from '../src/Bitz.js'
import Benchmark from 'nanobench'

const N = 1_000_000
Benchmark(`bitzArray.get middle N = ${N}`, bench => {
  const bitzArray = new Bitz()
  for (let i = 0; i < N; i++) bitzArray.append(i)
  bitzArray.balance()
  bench.start()
  bitzArray.get(N / 2)
  bench.end()
  bitzArray.clear()
})

Benchmark(`bitzArray.get random N = ${N}`, bench => {
  const bitzArray = new Bitz()
  for (let i = 0; i < N; i++) bitzArray.append(i)
  bitzArray.balance()
  bench.start()
  for (let i = 0; i < N; i++) bitzArray.get(Math.floor(Math.random() * N))
  bench.end()
  bitzArray.clear()
})

Benchmark(`bitzArray.append N = ${N}`, bench => {
  const bitzArray = new Bitz()
  bitzArray.balance()
  bench.start()
  for (let i = 0; i < N; i++) bitzArray.append(1)
  bench.end()
  bitzArray.clear()
})

Benchmark(`bitzArray.head N = ${N}`, bench => {
  const bitzArray = new Bitz()
  for (let i = 0; i < N; i++) bitzArray.append(i)
  bitzArray.balance()
  bench.start()
  for (let i = 0; i < N; i++) bitzArray.head()
  bench.end()
  bitzArray.clear()
})

Benchmark(`bitzArray.tail N = ${N}`, bench => {
  const bitzArray = new Bitz()
  for (let i = 0; i < N; i++) bitzArray.append(i)
  bitzArray.balance()
  bench.start()
  for (let i = 0; i < N; i++) bitzArray.tail()
  bench.end()
  bitzArray.clear()
})

Benchmark(`bitzArray.prepend N = ${N}`, bench => {
  const bitzArray = new Bitz()
  bitzArray.balance()
  bench.start()
  for (let i = 0; i < N; i++) bitzArray.prepend(1)
  bench.end()
  bitzArray.clear()
})

Benchmark(`bitzArray.rotateRight N = ${N}`, bench => {
  const bitzArray = new Bitz()
  for (let i = 0; i < N; i++) bitzArray.append(i)
  bitzArray.balance()
  bench.start()
  bitzArray.rotateRight(N - 1)
  bench.end()
  bitzArray.clear()
})

Benchmark(`bitzArray.rotateLeft N = ${N}`, bench => {
  const bitzArray = new Bitz()
  for (let i = 0; i < N; i++) bitzArray.append(i)
  bitzArray.balance()
  bench.start()
  bitzArray.rotateLeft(N - 1)
  bench.end()
  bitzArray.clear()
})

Benchmark(`bitzArray.search N = ${N}`, bench => {
  const bitzArray = new Bitz()
  for (let i = 0; i < N; i++) bitzArray.append(i)
  const target = (N / 3) | 0.5
  bitzArray.append(target)
  bitzArray.balance()

  bench.start()
  bitzArray.search(target)
  bench.end()
  bitzArray.clear()
})

Benchmark(`bitzArray.quickSort and bitzArray.search N = ${N}`, bench => {
  const bitzArray = new Bitz()
  for (let i = 0; i < N / 10; i++) bitzArray.append(Math.random() * 1000)
  const target = -1
  bitzArray.append(target)
  bitzArray.balance()
  bench.start()
  bitzArray.quickSort('asc').search(target)
  bench.end()
  bitzArray.clear()
})

Benchmark(`bitzArray.quickSort and bitzArray.search N = ${N}`, bench => {
  const bitzArray = new Bitz()
  for (let i = 0; i < N / 10; i++) bitzArray.append(Math.random() * 1000)
  const target = -1
  bitzArray.append(target)
  bitzArray.balance()
  bench.start()
  const sorted = bitzArray.quickSort()
  sorted.search(target)
  bench.end()
  bitzArray.clear()
})
