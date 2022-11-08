import Bitz from '../src/Bitz.js'
import Benchmark from 'nanobench'

const N = 500_000

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
