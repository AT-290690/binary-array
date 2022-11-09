import Brrr from '../src/Brrr.js'
import Benchmark from 'nanobench'

const N = 1_000_000
Benchmark(`brrrArray.get middle N = ${N}`, bench => {
  const brrrArray = new Brrr()
  for (let i = 0; i < N; i++) brrrArray.append(i)
  brrrArray.balance()
  bench.start()
  brrrArray.get(N / 2)
  bench.end()
  brrrArray.clear()
})

Benchmark(`brrrArray.get random N = ${N}`, bench => {
  const brrrArray = new Brrr()
  for (let i = 0; i < N; i++) brrrArray.append(i)
  brrrArray.balance()
  bench.start()
  for (let i = 0; i < N; i++) brrrArray.get(Math.floor(Math.random() * N))
  bench.end()
  brrrArray.clear()
})

Benchmark(`brrrArray.append N = ${N}`, bench => {
  const brrrArray = new Brrr()
  brrrArray.balance()
  bench.start()
  for (let i = 0; i < N; i++) brrrArray.append(1)
  bench.end()
  brrrArray.clear()
})

Benchmark(`brrrArray.head N = ${N}`, bench => {
  const brrrArray = new Brrr()
  for (let i = 0; i < N; i++) brrrArray.append(i)
  brrrArray.balance()
  bench.start()
  for (let i = 0; i < N; i++) brrrArray.head()
  bench.end()
  brrrArray.clear()
})

Benchmark(`brrrArray.tail N = ${N}`, bench => {
  const brrrArray = new Brrr()
  for (let i = 0; i < N; i++) brrrArray.append(i)
  brrrArray.balance()
  bench.start()
  for (let i = 0; i < N; i++) brrrArray.tail()
  bench.end()
  brrrArray.clear()
})

Benchmark(`brrrArray.prepend N = ${N}`, bench => {
  const brrrArray = new Brrr()
  brrrArray.balance()
  bench.start()
  for (let i = 0; i < N; i++) brrrArray.prepend(1)
  bench.end()
  brrrArray.clear()
})

Benchmark(`brrrArray.rotateRight N = ${N}`, bench => {
  const brrrArray = new Brrr()
  for (let i = 0; i < N; i++) brrrArray.append(i)
  brrrArray.balance()
  bench.start()
  brrrArray.rotateRight(N - 1)
  bench.end()
  brrrArray.clear()
})

Benchmark(`brrrArray.rotateLeft N = ${N}`, bench => {
  const brrrArray = new Brrr()
  for (let i = 0; i < N; i++) brrrArray.append(i)
  brrrArray.balance()
  bench.start()
  brrrArray.rotateLeft(N - 1)
  bench.end()
  brrrArray.clear()
})

Benchmark(`brrrArray.search N = ${N}`, bench => {
  const brrrArray = new Brrr()
  for (let i = 0; i < N; i++) brrrArray.append(i)
  const target = (N / 3) | 0.5
  brrrArray.append(target)
  brrrArray.balance()

  bench.start()
  brrrArray.search(target)
  bench.end()
  brrrArray.clear()
})

Benchmark(`brrrArray.quickSort and brrrArray.search N = ${N}`, bench => {
  const brrrArray = new Brrr()
  for (let i = 0; i < N / 10; i++) brrrArray.append(Math.random() * 1000)
  const target = -1
  brrrArray.append(target)
  brrrArray.balance()
  bench.start()
  brrrArray.quickSort('asc').search(target)
  bench.end()
  brrrArray.clear()
})

Benchmark(`brrrArray.quickSort and brrrArray.search N = ${N}`, bench => {
  const brrrArray = new Brrr()
  for (let i = 0; i < N / 10; i++) brrrArray.append(Math.random() * 1000)
  const target = -1
  brrrArray.append(target)
  brrrArray.balance()
  bench.start()
  const sorted = brrrArray.quickSort()
  sorted.search(target)
  bench.end()
  brrrArray.clear()
})
