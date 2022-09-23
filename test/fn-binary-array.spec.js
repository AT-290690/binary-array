import {
  at,
  set,
  get,
  pipe,
  toArray,
  append,
  prepend,
  chop,
  cut,
  length,
  filter,
  reverse,
  makeWith,
  findFirst,
  findLast,
  rotate,
} from '../src/binar-fn.js'
const isPrime = num => {
  for (let i = 2; num > i; i++) if (num % i === 0) return false
  return num > 1
}
describe('Binar mimic Array', () => {
  it('.get and .at should access the correct element', () => {
    const arr = Array.from([1, 2, 3])
    const binArr = makeWith(...arr)
    expect(arr[0]).toEqual(get(binArr, 0))
    expect(arr[1]).toEqual(get(binArr, 1))
    expect(arr[2]).toEqual(get(binArr, 2))
    expect(arr.at(-1)).toEqual(at(binArr, -1))
    expect(arr.at(-2)).toEqual(at(binArr, -2))
    expect(arr.at(-3)).toEqual(at(binArr, -3))
    expect(arr.at(0)).toEqual(at(binArr, 0))
    expect(arr.at(1)).toEqual(at(binArr, 1))
    expect(arr.at(2)).toEqual(at(binArr, 2))
  })

  it('.push, .pop, .unshift, .shift, .set should modify the collection the same', () => {
    const arr = Array.from([1, 2, 3])
    const binArr = makeWith(...arr)

    expect(toArray(binArr)).toEqual(arr)

    append(binArr, 6)
    append(binArr, 7)
    append(binArr, 8)

    set(binArr, 3, cut(binArr))
    prepend(binArr, 1)
    prepend(binArr, 4)
    prepend(binArr, 5)
    chop(binArr)

    arr.push(6, 7, 8)
    arr[3] = arr.pop()
    arr.unshift(5, 4, 1)
    arr.shift()

    expect(toArray(binArr)).toEqual(arr)
    expect(length(binArr)).toEqual(arr.length)
  })

  it('.filter should work exactly like Array.prototype.filter', () => {
    const array1 = [-3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]

    expect(array1.filter(isPrime)).toEqual(
      toArray(filter(makeWith(...array1), isPrime))
    )

    let arrayInvalidEntries = 0
    let binaryArrayInvalidEntries = 0
    const array2 = [
      { id: 15 },
      { id: -1 },
      { id: 0 },
      { id: 3 },
      { id: 12.2 },
      {},
      { id: null },
      { id: NaN },
      { id: 'undefined' },
    ]
    expect(
      array2.filter(item => {
        if (Number.isFinite(item.id) && item.id !== 0) return true
        arrayInvalidEntries++
        return false
      })
    ).toEqual(
      toArray(
        filter(makeWith(...array2), item => {
          if (Number.isFinite(item.id) && item.id !== 0) return true
          binaryArrayInvalidEntries++
          return false
        })
      )
    )
    expect(arrayInvalidEntries).toEqual(binaryArrayInvalidEntries)

    const fruits = ['apple', 'banana', 'grapes', 'mango', 'orange']
    const binaryFruits = makeWith(...fruits)
    const filterItems = (arr, query) =>
      arr.filter(el => el.toLowerCase().includes(query.toLowerCase()))
    const filterItemsBaFn = (arr, query) =>
      filter(arr, el => el.toLowerCase().includes(query.toLowerCase()))
    expect(filterItems(fruits, 'ap')).toEqual(
      toArray(filterItemsBaFn(binaryFruits, 'ap'))
    ) // ['apple', 'grapes']
    expect(filterItems(fruits, 'an')).toEqual(
      toArray(filterItemsBaFn(binaryFruits, 'an'))
    ) // ['banana', 'mango', 'orange']
  })
  it('.reverse should modify the collection the same', () => {
    const arr1 = [4, 1, 1, 2, 3, 8, 7]
    const binArr1 = makeWith(...arr1)
    expect(pipe(reverse, toArray)(binArr1)).toEqual(arr1.reverse())
    expect(pipe(reverse, reverse, toArray)(binArr1)).toEqual(
      arr1.reverse().reverse()
    )
    expect(arr1.length).toEqual(length(binArr1))

    const arr2 = [4, 1, 1, 2, 3, 8, 7, 8]
    const binArr2 = makeWith(...arr2)
    expect(pipe(reverse, toArray)(binArr2)).toEqual(arr2.reverse())
    expect(pipe(reverse, reverse, toArray)(binArr2)).toEqual(
      arr2.reverse().reverse()
    )
    expect(arr2.length).toEqual(length(binArr2))
  })

  it('.find should return expected array', () => {
    const arr = ['apple', 'orange', 'peach', 'lemon']
    const binArr = makeWith(...arr)
    expect(findFirst(binArr, item => item === 'orange')).toBe(
      arr.find(item => item === 'orange')
    )
    expect(findFirst(binArr, item => item === 'lemon')).toBe(
      arr.find(item => item === 'lemon')
    )
    expect(findFirst(binArr, item => item === 'pomegranate')).toBe(
      arr.find(item => item === 'pomegranate')
    )

    const lastArr1 = [4, 6, 8, 12]
    const lastArr2 = [4, 5, 7, 8, 9, 11, 12]
    const lastBin1 = makeWith(...lastArr1)
    const lastBin2 = makeWith(...lastArr2)
    // Todo use Array.prototype.findLast once it is available in node
    expect([...lastArr1].reverse().find(isPrime)).toEqual(
      findLast(lastBin1, isPrime)
    ) // undefined, not found
    expect([...lastArr2].reverse().find(isPrime)).toEqual(
      findLast(lastBin2, isPrime)
    ) // 11
    expect([...lastArr1].reverse().find(isPrime)).toEqual(
      pipe(reverse, arr => findFirst(arr, isPrime))(lastBin1)
    ) // undefined, not found
    expect([...lastArr2].reverse().find(isPrime)).toEqual(
      pipe(reverse, arr => findFirst(arr, isPrime))(lastBin2)
    ) // 11
  })

  it('.rotate should work as expected', () => {
    const arr1 = [1, 2, 3]

    expect(toArray(rotate(makeWith(...arr1), 0, 1))).toEqual([1, 2, 3])
    expect(toArray(rotate(makeWith(...arr1), 1, 1))).toEqual([3, 1, 2])
    expect(toArray(rotate(makeWith(...arr1), 2, 1))).toEqual([2, 3, 1])
    expect(toArray(rotate(makeWith(...arr1), 3, 1))).toEqual([1, 2, 3])
    expect(toArray(rotate(makeWith(...arr1), 4, 1))).toEqual([3, 1, 2])
    expect(toArray(rotate(makeWith(...arr1), 6, 1))).toEqual([1, 2, 3])
    expect(toArray(rotate(makeWith(...arr1), 0, -1))).toEqual([1, 2, 3])
    expect(toArray(rotate(makeWith(...arr1), 1, -1))).toEqual([2, 3, 1])
    expect(toArray(rotate(makeWith(...arr1), 2, -1))).toEqual([3, 1, 2])
    expect(toArray(rotate(makeWith(...arr1), 3, -1))).toEqual([1, 2, 3])
    expect(toArray(rotate(makeWith(...arr1), 4, -1))).toEqual([2, 3, 1])
    expect(toArray(rotate(makeWith(...arr1), 6, -1))).toEqual([1, 2, 3])

    const arr2 = [1, 2, 3, 4]

    expect(toArray(rotate(makeWith(...arr2), 0, 1))).toEqual([1, 2, 3, 4])
    expect(toArray(rotate(makeWith(...arr2), 1, 1))).toEqual([4, 1, 2, 3])
    expect(toArray(rotate(makeWith(...arr2), 2, 1))).toEqual([3, 4, 1, 2])
    expect(toArray(rotate(makeWith(...arr2), 3, 1))).toEqual([2, 3, 4, 1])
    expect(toArray(rotate(makeWith(...arr2), 4, 1))).toEqual([1, 2, 3, 4])
  })
})
