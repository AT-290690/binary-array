import Binar from '../src/Binar.js'
import Benchmark from 'nanobench'

const N = 1_000_000
Benchmark(`binArray.get middle N = ${N}`, bench => {
  const binArray = new Binar()
  for (let i = 0; i < N; i++) binArray.append(i)
  binArray.balance()
  bench.start()
  binArray.get(N / 2)
  bench.end()
  binArray.clear()
})

Benchmark(`binArray.get random N = ${N}`, bench => {
  const binArray = new Binar()
  for (let i = 0; i < N; i++) binArray.append(i)
  binArray.balance()
  bench.start()
  for (let i = 0; i < N; i++) binArray.get(Math.floor(Math.random() * N))
  bench.end()
  binArray.clear()
})

Benchmark(`binArray.append N = ${N}`, bench => {
  const binArray = new Binar()
  binArray.balance()
  bench.start()
  for (let i = 0; i < N; i++) binArray.append(1)
  bench.end()
  binArray.clear()
})

Benchmark(`binArray.head N = ${N}`, bench => {
  const binArray = new Binar()
  for (let i = 0; i < N; i++) binArray.append(i)
  binArray.balance()
  bench.start()
  for (let i = 0; i < N; i++) binArray.head()
  bench.end()
  binArray.clear()
})

Benchmark(`binArray.tail N = ${N}`, bench => {
  const binArray = new Binar()
  for (let i = 0; i < N; i++) binArray.append(i)
  binArray.balance()
  bench.start()
  for (let i = 0; i < N; i++) binArray.tail()
  bench.end()
  binArray.clear()
})

Benchmark(`binArray.prepend N = ${N}`, bench => {
  const binArray = new Binar()
  binArray.balance()
  bench.start()
  for (let i = 0; i < N; i++) binArray.prepend(1)
  bench.end()
  binArray.clear()
})

Benchmark(`binArray.rotateRight N = ${N}`, bench => {
  const binArray = new Binar()
  for (let i = 0; i < N; i++) binArray.append(i)
  binArray.balance()
  bench.start()
  binArray.rotateRight(N - 1)
  bench.end()
  binArray.clear()
})

Benchmark(`binArray.rotateLeft N = ${N}`, bench => {
  const binArray = new Binar()
  for (let i = 0; i < N; i++) binArray.append(i)
  binArray.balance()
  bench.start()
  binArray.rotateLeft(N - 1)
  bench.end()
  binArray.clear()
})

Benchmark(`binArray.search N = ${N}`, bench => {
  const binArray = new Binar()
  for (let i = 0; i < N; i++) binArray.append(i)
  const target = (N / 3) | 0.5
  binArray.append(target)
  binArray.balance()

  bench.start()
  binArray.search(target)
  bench.end()
  binArray.clear()
})

Benchmark(`binArray.quickSort and binArray.search N = ${N}`, bench => {
  const binArray = new Binar()
  for (let i = 0; i < N / 10; i++) binArray.append(Math.random() * 1000)
  const target = -1
  binArray.append(target)
  binArray.balance()
  bench.start()
  binArray.quickSort('asc').search(target)
  bench.end()
  binArray.clear()
})

Benchmark(`binArray.quickSort and binArray.search N = ${N}`, bench => {
  const binArray = new Binar()
  for (let i = 0; i < N / 10; i++) binArray.append(Math.random() * 1000)
  const target = -1
  binArray.append(target)
  binArray.balance()
  bench.start()
  const sorted = binArray.quickSort()
  sorted.search(target)
  bench.end()
  binArray.clear()
})
