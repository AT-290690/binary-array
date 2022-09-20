import BinaryArray from '../src/BinaryArray.js'
const isPrime = (num) => {
  for (let i = 2; num > i; i++) if (num % i === 0) return false
  return num > 1
}
describe('BinaryArray mimic Array', () => {
  it('.get and .at should access the correct element', () => {
    const arr = Array.from([1, 2, 3])
    const binArr = BinaryArray.from(arr)

    expect(arr[0]).toEqual(binArr.get(0))
    expect(arr[1]).toEqual(binArr.get(1))
    expect(arr[2]).toEqual(binArr.get(2))

    expect(arr.at(-1)).toEqual(binArr.at(-1))
    expect(arr.at(-2)).toEqual(binArr.at(-2))
    expect(arr.at(-3)).toEqual(binArr.at(-3))

    expect(arr.at(0)).toEqual(binArr.at(0))
    expect(arr.at(1)).toEqual(binArr.at(1))
    expect(arr.at(2)).toEqual(binArr.at(2))
  })

  it('.push, .pop, .unshift, .shift, .set should modify the collection the same', () => {
    const arr = Array.from([1, 2, 3])
    const binArr = BinaryArray.from(arr)

    expect([...binArr]).toEqual(arr)

    binArr.push(6, 7, 8)
    binArr.set(3, binArr.pop())
    binArr.unshift(5, 4, 1)
    binArr.shift()

    arr.push(6, 7, 8)
    arr[3] = arr.pop()
    arr.unshift(5, 4, 1)
    arr.shift()

    expect([...binArr]).toEqual(arr)
    expect(arr.length).toEqual(binArr.length)
  })

  it('.filter should work exactly like Array.prototype.filter', () => {
    const array1 = [-3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]

    expect(array1.filter(isPrime)).toEqual(
      BinaryArray.from(array1).filter(isPrime).toArray()
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
      array2.filter((item) => {
        if (Number.isFinite(item.id) && item.id !== 0) return true
        arrayInvalidEntries++
        return false
      })
    ).toEqual(
      BinaryArray.from(array2)
        .filter((item) => {
          if (Number.isFinite(item.id) && item.id !== 0) return true
          binaryArrayInvalidEntries++
          return false
        })
        .toArray()
    )
    expect(arrayInvalidEntries).toEqual(binaryArrayInvalidEntries)

    const fruits = ['apple', 'banana', 'grapes', 'mango', 'orange']
    const binaryFruits = BinaryArray.from(fruits)

    const filterItems = (arr, query) =>
      arr.filter((el) => el.toLowerCase().includes(query.toLowerCase()))
    expect(filterItems(fruits, 'ap')).toEqual(
      filterItems(binaryFruits, 'ap').toArray()
    ) // ['apple', 'grapes']
    expect(filterItems(fruits, 'an')).toEqual(
      filterItems(binaryFruits, 'an').toArray()
    ) // ['banana', 'mango', 'orange']
  })

  it('operations 1 .map, .filter, .mergeSort, .reverse, .slice, .reduce, .flat should modify the collection the same', () => {
    const arr = [4, 1, 1, 2, 3, 8, 7]
    const binArr = BinaryArray.from(arr)

    const rasultBinaryArray = binArr
      .map((i) => i * i)
      .filter((i) => i > 3)
      .mergeSort((a, b) => a - b)
      .reverse()
      .slice(1)

    const resultArray = arr
      .map((i) => i * i)
      .filter((i) => i > 3)
      .sort((a, b) => a - b)
      .reverse()
      .slice(1)

    expect([...rasultBinaryArray]).toEqual(resultArray)
    expect(resultArray.length).toEqual(rasultBinaryArray.length)

    const flatBinArr = rasultBinaryArray.concat(
      BinaryArray.from([
        51,
        12,
        33,
        BinaryArray.from([
          BinaryArray.from([1, 2, 3, 4, 5, BinaryArray.from([1, 2, 3, 4]), 1]),
          BinaryArray.from([2, 3, 4, 5]),
          BinaryArray.from([23, BinaryArray.from([222, 33, 1, 2])]),
        ]),
      ]).flat(3)
    )
    const flatArr = resultArray.concat(
      [
        51,
        12,
        33,
        [
          [1, 2, 3, 4, 5, [1, 2, 3, 4], 1],
          [2, 3, 4, 5],
          [23, [222, 33, 1, 2]],
        ],
      ].flat(3)
    )
    expect([...flatBinArr]).toEqual(flatArr)
    expect(flatBinArr.reduce((acc, i) => acc + i, 1)).toEqual(
      flatArr.reduce((acc, i) => acc + i, 1)
    )
    expect(flatArr.length).toEqual(flatBinArr.length)

    const infiniteArrNest = [
      [
        [[1, 2, 3, 4], [1, 2, 3, 4], 3, 4],
        [1, [1, 2, [1, 2, 3, 4], 4], 3, 4],
      ],
      [
        [1, 2, 3, 4],
        [1, 2, 3, 4],
      ],
    ]

    const infiniteBinNest = BinaryArray.from([
      BinaryArray.from([
        BinaryArray.from([
          BinaryArray.from([1, 2, 3, 4]),
          BinaryArray.from([1, 2, 3, 4]),
          3,
          4,
        ]),
        BinaryArray.from([
          1,
          BinaryArray.from([1, 2, BinaryArray.from([1, 2, 3, 4]), 4]),
          3,
          4,
        ]),
      ]),
      BinaryArray.from([
        BinaryArray.from([1, 2, 3, 4]),
        BinaryArray.from([1, 2, 3, 4]),
      ]),
    ])

    expect(infiniteBinNest.flat(Infinity).toArray()).toEqual(
      infiniteArrNest.flat(Infinity)
    )
    expect(infiniteArrNest.length).toEqual(infiniteBinNest.length)
    expect(infiniteArrNest.flat(Infinity).length).toEqual(
      infiniteBinNest.flat(Infinity).toArray().length
    )
  })

  it('operations 2 .map, .filter, .mergeSort, .reverse, .slice, .reduce, .flat should modify the collection the same', () => {
    const arr = [4, 1, 1, 2, 3, 8, 7]
    const binArr = BinaryArray.from(arr)

    const rasultBinaryArray = binArr
      .map((i) => i ** i)
      .reverse()
      .mergeSort((a, b) => a + b)
      .slice(2)

    const resultArray = arr
      .map((i) => i ** i)
      .reverse()
      .sort((a, b) => a + b)
      .slice(2)

    expect([...rasultBinaryArray]).toEqual(resultArray)
    expect(resultArray.length).toEqual(rasultBinaryArray.length)

    const flatBinArr = rasultBinaryArray.concat(
      BinaryArray.from([
        51,
        12,
        33,
        BinaryArray.from([
          BinaryArray.from([
            1,
            2,
            3,
            4,
            5,
            rasultBinaryArray,
            [...BinaryArray.from([1, 2, 3, 4]).reverse().splice(1, 2)],
            1,
          ]),
          BinaryArray.from([2, 3, 4, 5]).slice(2, 4),
          BinaryArray.from([23, BinaryArray.from([222, 33, 1, 2])]),
        ]),
      ])
        .reverse()
        .flat(2)
    )

    const flatArr = resultArray.concat(
      [
        51,
        12,
        33,
        [
          [1, 2, 3, 4, 5, resultArray, [1, 2, 3, 4].reverse().splice(1, 2), 1],
          [2, 3, 4, 5].slice(2, 4),
          [23, [222, 33, 1, 2]],
        ],
      ]
        .reverse()
        .flat(2)
    )

    expect(flatBinArr.toArray(true)).toEqual(flatArr)
    expect(flatArr.length).toEqual(flatBinArr.length)

    const flatMapArray = [[1, 2, 3, 4], [1, 2, 3, 4].reverse()]
    const flatMapBinaryArray = BinaryArray.from([
      BinaryArray.from([1, 2, 3, 4]),
      BinaryArray.from([1, 2, 3, 4]).reverse(),
    ])

    expect(flatMapBinaryArray.flatten((x) => x * 10 + 4).toArray(true)).toEqual(
      flatMapArray.flatMap((item) => item.map((x) => x * 10 + 4))
    )
  })

  it('.reverse should modify the collection the same', () => {
    const arr1 = [4, 1, 1, 2, 3, 8, 7]
    const binArr1 = BinaryArray.from(arr1)
    expect(binArr1.reverse().toArray()).toEqual(arr1.reverse())
    expect(binArr1.reverse().reverse().toArray()).toEqual(
      arr1.reverse().reverse()
    )
    expect(arr1.length).toEqual(binArr1.length)

    const arr2 = [4, 1, 1, 2, 3, 8, 7, 8]
    const binArr2 = BinaryArray.from(arr2)
    expect(binArr2.reverse().toArray()).toEqual(arr2.reverse())
    expect(binArr2.reverse().reverse().toArray()).toEqual(
      arr2.reverse().reverse()
    )
    expect(arr2.length).toEqual(binArr2.length)
  })

  it('.slice should create a new collection from the same range', () => {
    const arr = [4, 1, 1, 2, 3, 8, 7]
    const binArr = BinaryArray.from(arr)
    expect(arr.slice(1)).toEqual(binArr.slice(1).toArray())
    expect(arr.slice(1, 2)).toEqual(binArr.slice(1, 2).toArray())
    expect(arr.slice(3)).toEqual(binArr.slice(3).toArray())
    expect(arr.slice(2, 5)).toEqual(binArr.slice(2, 5).toArray())
    expect(arr.slice(4, 5)).toEqual(binArr.slice(4, 5).toArray())
  })

  it('.splice should modify the array in place', () => {
    const months = ['Jan', 'March', 'April', 'June']
    const binMonths = BinaryArray.from(months)
    expect(months.splice(1, 0, 'Feb')).toEqual([
      ...binMonths.splice(1, 0, 'Feb'),
    ])
    expect(months).toEqual([...binMonths])
    expect(months.length).toEqual(binMonths.length)
    expect(months.splice(4, 1, 'May')).toEqual([
      ...binMonths.splice(4, 1, 'May'),
    ])
    expect(months).toEqual([...binMonths])
    expect(months.length).toEqual(binMonths.length)

    const arr = [1, 2, 3, 4, 5, 6]
    const binArr = BinaryArray.from(arr)

    expect(arr.splice(2, 3, 'a', 'b', 'c')).toEqual([
      ...binArr.splice(2, 3, 'a', 'b', 'c'),
    ])
    expect(arr).toEqual([...binArr])
    expect(arr.length).toEqual(binArr.length)
  })

  it('.addTo shoud update the size of the array if index is bigger than the current array size', () => {
    const arr = [4, 1, 1, 2, 3, 8, 7]
    const binArr = BinaryArray.from(arr)
    arr[20] = 10
    binArr.addTo(20, 10)
    expect(arr).toEqual(binArr.toArray())
    expect(arr[15]).toEqual(binArr.get(15))
    expect(arr.length).toEqual(binArr.length)
  })

  it('.join should return expected array', () => {
    const string = '0101010101.01010101010101000.010101001.01.0101001.010.101'
    expect(
      BinaryArray.from(string)
        .filter((x) => x !== '.')
        .join('.')
    ).toEqual(
      Array.from(string)
        .filter((x) => x !== '.')
        .join('.')
    )
  })

  it('.includes should return expected array', () => {
    const arr = ['apple', 'orange', 'peach', 'lemon']
    const binArr = BinaryArray.from(arr)
    expect(binArr.includes('orange')).toBe(arr.includes('orange'))
    expect(binArr.includes('lemon')).toBe(arr.includes('lemon'))
    expect(binArr.includes('pomegranate')).toBe(arr.includes('pomegranate'))
  })

  it('.find should return expected array', () => {
    const arr = ['apple', 'orange', 'peach', 'lemon']
    const binArr = BinaryArray.from(arr)
    expect(binArr.find((item) => item === 'orange')).toBe(
      arr.find((item) => item === 'orange')
    )
    expect(binArr.find((item) => item === 'lemon')).toBe(
      arr.find((item) => item === 'lemon')
    )
    expect(binArr.find((item) => item === 'pomegranate')).toBe(
      arr.find((item) => item === 'pomegranate')
    )
    expect(binArr.indexOf('orange')).toBe(arr.indexOf('orange'))
    expect(binArr.indexOf('lemon')).toBe(arr.indexOf('lemon'))
    expect(binArr.indexOf('pomegranate')).toBe(arr.indexOf('pomegranate'))

    const lastArr1 = [4, 6, 8, 12]
    const lastArr2 = [4, 5, 7, 8, 9, 11, 12]
    // Todo use Array.prototype.findLast once it is available in node
    expect([...lastArr1].reverse().find(isPrime)).toEqual(
      BinaryArray.from(lastArr1).findLast(isPrime)
    ) // undefined, not found
    expect([...lastArr2].reverse().find(isPrime)).toEqual(
      BinaryArray.from(lastArr2).findLast(isPrime)
    ) // 11
    expect([...lastArr1].reverse().find(isPrime)).toEqual(
      BinaryArray.from(lastArr1).reverse().find(isPrime)
    ) // undefined, not found
    expect([...lastArr2].reverse().find(isPrime)).toEqual(
      BinaryArray.from(lastArr2).reverse().find(isPrime)
    ) // 11
  })
})
