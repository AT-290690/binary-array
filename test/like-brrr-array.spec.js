import Brrr from '../src/Brrr.js'

describe('Brrr mimic Array', () => {
  it('.get and .at should access the correct element', () => {
    const arr = Array.from([1, 2, 3])
    const binArr = Brrr.from(arr)

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
    const binArr = Brrr.from(arr)

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

  it('.length should modify the collection the same', () => {
    const arr = Array.from([1, 2, 3])
    const binArr = Brrr.from(arr)
    expect(arr.length).toEqual(binArr.length)
    binArr.length = 2
    arr.length = 2
    expect(arr.length).toEqual(binArr.length)
    expect([...binArr]).toEqual(arr)
  })
  it('.filter should work exactly like Array.prototype.filter', () => {
    const isPrime = num => {
      for (let i = 2; num > i; i++) if (num % i === 0) return false
      return num > 1
    }
    const array1 = [-3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]

    expect(array1.filter(isPrime)).toEqual(
      Brrr.from(array1).filter(isPrime).items
    )

    let arrayInvalidEntries = 0
    let brrryArrayInvalidEntries = 0
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
      Brrr.from(array2).filter(item => {
        if (Number.isFinite(item.id) && item.id !== 0) return true
        brrryArrayInvalidEntries++
        return false
      }).items
    )
    expect(arrayInvalidEntries).toEqual(brrryArrayInvalidEntries)

    const fruits = ['apple', 'banana', 'grapes', 'mango', 'orange']
    const brrryFruits = Brrr.from(fruits)

    const filterItems = (arr, query) =>
      arr.filter(el => el.toLowerCase().includes(query.toLowerCase()))
    expect(filterItems(fruits, 'ap')).toEqual(
      filterItems(brrryFruits, 'ap').items
    ) // ['apple', 'grapes']
    expect(filterItems(fruits, 'an')).toEqual(
      filterItems(brrryFruits, 'an').items
    ) // ['banana', 'mango', 'orange']
  })

  it('operations 1 .map, .filter, .mergeSort, .reverse, .slice, .reduce, .flat should modify the collection the same', () => {
    const arr = [4, 1, 1, 2, 3, 8, 7]
    const binArr = Brrr.from(arr)

    const rasultBrrryArray = binArr
      .map(i => i * i)
      .filter(i => i > 3)
      .mergeSort((a, b) => a - b)
      .reverse()
      .slice(1)

    const resultArray = arr
      .map(i => i * i)
      .filter(i => i > 3)
      .sort((a, b) => a - b)
      .reverse()
      .slice(1)

    expect([...rasultBrrryArray]).toEqual(resultArray)
    expect(resultArray.length).toEqual(rasultBrrryArray.length)

    const flatBinArr = rasultBrrryArray.concat(
      Brrr.from([
        51,
        12,
        33,
        Brrr.from([
          Brrr.from([1, 2, 3, 4, 5, Brrr.from([1, 2, 3, 4]), 1]),
          Brrr.from([2, 3, 4, 5]),
          Brrr.from([23, Brrr.from([222, 33, 1, 2])]),
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

    const infiniteBinNest = Brrr.from([
      Brrr.from([
        Brrr.from([Brrr.from([1, 2, 3, 4]), Brrr.from([1, 2, 3, 4]), 3, 4]),
        Brrr.from([1, Brrr.from([1, 2, Brrr.from([1, 2, 3, 4]), 4]), 3, 4]),
      ]),
      Brrr.from([Brrr.from([1, 2, 3, 4]), Brrr.from([1, 2, 3, 4])]),
    ])

    expect(infiniteBinNest.flat(Infinity).items).toEqual(
      infiniteArrNest.flat(Infinity)
    )
    expect(infiniteArrNest.length).toEqual(infiniteBinNest.length)
    expect(infiniteArrNest.flat(Infinity).length).toEqual(
      infiniteBinNest.flat(Infinity).items.length
    )
  })

  it('operations 2 .map, .filter, .mergeSort, .reverse, .slice, .reduce, .flat should modify the collection the same', () => {
    const arr = [4, 1, 1, 2, 3, 8, 7]
    const binArr = Brrr.from(arr)

    const rasultBrrryArray = binArr
      .map(i => i ** i)
      .reverse()
      .mergeSort((a, b) => a + b)
      .slice(2)

    const resultArray = arr
      .map(i => i ** i)
      .reverse()
      .sort((a, b) => a + b)
      .slice(2)

    expect([...rasultBrrryArray]).toEqual(resultArray)
    expect(resultArray.length).toEqual(rasultBrrryArray.length)
  })
  it('.flat, flatten should work the same way', () => {
    const arr = [4, 1, 1, 2, 3, 8, 7]
    const binArr = Brrr.from(arr)
    const rasultBrrryArray = binArr.map(i => i ** i + 10 - 2)
    const resultArray = arr.map(i => i ** i + 10 - 2)
    const flatBinArr = rasultBrrryArray.concat(
      Brrr.from([
        51,
        12,
        33,
        Brrr.from([
          Brrr.from([
            1,
            2,
            3,
            4,
            5,
            rasultBrrryArray,
            [...Brrr.from([1, 2, 3, 4]).reverse().splice(1, 2)],
            1,
          ]),
          Brrr.from([2, 3, 4, 5]).slice(2, 4),
          Brrr.from([23, Brrr.from([222, 33, 1, 2])]),
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

    expect(flatBinArr.items).toEqual(flatArr)
    expect(flatArr.length).toEqual(flatBinArr.length)

    const flatMapArray = [[1, 2, 3, 4], [1, 2, 3, 4].reverse()]
    const flatMapBrrryArray = Brrr.from([
      Brrr.from([1, 2, 3, 4]),
      Brrr.from([1, 2, 3, 4]).reverse(),
    ])

    expect(flatMapBrrryArray.flatten(x => x * 10 + 4).items).toEqual(
      flatMapArray.flatMap(item => item.map(x => x * 10 + 4))
    )
    expect([1, 2, [3, 4]].flat()).toEqual(
      new Brrr().with(1, 2, new Brrr().with(3, 4)).flat().items
    )

    expect([1, 2, [3, 4, [5, 6]]].flat()).toEqual(
      new Brrr().with(1, 2, new Brrr().with(3, 4, new Brrr().with(5, 6))).flat()
        .items
    )
    expect([1, 2, [3, 4, [5, 6]]].flat(2)).toEqual(
      new Brrr()
        .with(1, 2, new Brrr().with(3, 4, new Brrr().with(5, 6)))
        .flat(2).items
    )
    expect([1, 2, [3, 4, [5, 6, [7, 8, [9, 10]]]]].flat(Infinity)).toEqual(
      new Brrr()
        .with(
          1,
          2,
          new Brrr().with(
            3,
            4,
            new Brrr().with(5, 6, new Brrr().with(7, 8, new Brrr().with(9, 10)))
          )
        )
        .flat(Infinity).items
    )
    // ignore this case for now
    // expect([1, 2, , 4, 5].flat()).toEqual(
    //   Brrr.from([1, 2, , 4, 5]).flat().items
    // )
  })
  it('.reverse should modify the collection the same', () => {
    const arr1 = [4, 1, 1, 2, 3, 8, 7]
    const binArr1 = Brrr.from(arr1)
    expect(binArr1.reverse().items).toEqual(arr1.reverse())
    expect(binArr1.reverse().reverse().items).toEqual(arr1.reverse().reverse())
    expect(arr1.length).toEqual(binArr1.length)

    const arr2 = [4, 1, 1, 2, 3, 8, 7, 8]
    const binArr2 = Brrr.from(arr2)
    expect(binArr2.reverse().items).toEqual(arr2.reverse())
    expect(binArr2.reverse().reverse().items).toEqual(arr2.reverse().reverse())
    expect(arr2.length).toEqual(binArr2.length)
  })

  it('.slice should create a new collection from the same range', () => {
    const arr = [4, 1, 1, 2, 3, 8, 7]
    const binArr = Brrr.from(arr)
    expect(arr.slice(1)).toEqual(binArr.slice(1).items)
    expect(arr.slice(1, 2)).toEqual(binArr.slice(1, 2).items)
    expect(arr.slice(3)).toEqual(binArr.slice(3).items)
    expect(arr.slice(2, 5)).toEqual(binArr.slice(2, 5).items)
    expect(arr.slice(4, 5)).toEqual(binArr.slice(4, 5).items)
  })

  it('.splice should modify the array in place', () => {
    const months = ['Jan', 'March', 'April', 'June']
    const binMonths = Brrr.from(months)
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
    const binArr = Brrr.from(arr)

    expect(arr.splice(2, 3, 'a', 'b', 'c')).toEqual([
      ...binArr.splice(2, 3, 'a', 'b', 'c'),
    ])
    expect(arr).toEqual([...binArr])
    expect(arr.length).toEqual(binArr.length)
  })

  it('.addTo shoud update the size of the array if index is bigger than the current array size', () => {
    const arr = [4, 1, 1, 2, 3, 8, 7]
    const binArr = Brrr.from(arr)
    arr[20] = 10
    binArr.addTo(20, 10)
    expect(arr).toEqual(binArr.items)
    expect(arr[15]).toEqual(binArr.get(15))
    expect(arr.length).toEqual(binArr.length)
  })

  it('.join should return expected array', () => {
    const string = '0101010101.01010101010101000.010101001.01.0101001.010.101'
    expect(
      Brrr.from(string)
        .filter(x => x !== '.')
        .join('.')
    ).toEqual(
      Array.from(string)
        .filter(x => x !== '.')
        .join('.')
    )
  })

  it('.includes should return expected array', () => {
    const arr = ['apple', 'orange', 'peach', 'lemon']
    const binArr = Brrr.from(arr)
    expect(binArr.includes('orange')).toBe(arr.includes('orange'))
    expect(binArr.includes('lemon')).toBe(arr.includes('lemon'))
    expect(binArr.includes('pomegranate')).toBe(arr.includes('pomegranate'))

    expect([1, 2, 3].includes(2)).toBe(Brrr.from([1, 2, 3]).includes(2))
    expect([1, 2, 3].includes(4)).toBe(Brrr.from([1, 2, 3]).includes(4))
    expect([1, 2, 3].includes(3, 3)).toBe(Brrr.from([1, 2, 3]).includes(3, 3))
    expect([1, 2, 3].includes(3, -1)).toBe(Brrr.from([1, 2, 3]).includes(3, -1))
    expect([1, 2, NaN].includes(NaN)).toBe(Brrr.from([1, 2, NaN]).includes(NaN))
    expect(['1', '2', '3'].includes(3)).toBe(
      Brrr.from(['1', '2', '3']).includes(3)
    )
  })

  it('.find should return expected array', () => {
    const isPrime = num => {
      for (let i = 2; num > i; i++) if (num % i === 0) return false
      return num > 1
    }
    const arr = ['apple', 'orange', 'peach', 'lemon']
    const binArr = Brrr.from(arr)
    expect(binArr.find(item => item === 'orange')).toBe(
      arr.find(item => item === 'orange')
    )
    expect(binArr.find(item => item === 'lemon')).toBe(
      arr.find(item => item === 'lemon')
    )
    expect(binArr.find(item => item === 'pomegranate')).toBe(
      arr.find(item => item === 'pomegranate')
    )
    expect(binArr.indexOf('orange')).toBe(arr.indexOf('orange'))
    expect(binArr.indexOf('lemon')).toBe(arr.indexOf('lemon'))
    expect(binArr.indexOf('pomegranate')).toBe(arr.indexOf('pomegranate'))

    const lastArr1 = [4, 6, 8, 12]
    const lastArr2 = [4, 5, 7, 8, 9, 11, 12]
    const lastBin1 = Brrr.from(lastArr1)
    const lastBin2 = Brrr.from(lastArr2)
    // Todo use Array.prototype.findLast once it is available in node
    expect([...lastArr1].reverse().find(isPrime)).toEqual(
      lastBin1.findLast(isPrime)
    ) // undefined, not found
    expect([...lastArr2].reverse().find(isPrime)).toEqual(
      lastBin2.findLast(isPrime)
    ) // 11
    expect([...lastArr1].reverse().find(isPrime)).toEqual(
      lastBin1.reverse().find(isPrime)
    ) // undefined, not found
    expect([...lastArr2].reverse().find(isPrime)).toEqual(
      lastBin2.reverse().find(isPrime)
    ) // 11
  })

  it('.splice should return expected array', () => {
    const arr1 = ['angel', 'clown', 'mandarin', 'sturgeon']
    const ba1 = Brrr.from(arr1)
    expect(arr1.splice(2, 0, 'drum')).toEqual(ba1.splice(2, 0, 'drum').items)
    expect(arr1).toEqual(ba1.items)

    const arr2 = ['angel', 'clown', 'mandarin', 'sturgeon']
    const ba2 = Brrr.from(arr2)
    expect(ba2.splice(2, 0, 'drum', 'guitar').items).toEqual(
      arr2.splice(2, 0, 'drum', 'guitar')
    )
    expect(arr2).toEqual(ba2.items)
    const arr3 = ['angel', 'clown', 'drum', 'mandarin', 'sturgeon']
    const ba3 = Brrr.from(arr3)
    expect(ba3.splice(3, 1).items).toEqual(arr3.splice(3, 1))
    expect(arr3).toEqual(ba3.items)

    const arr4 = ['angel', 'clown', 'trumpet', 'sturgeon']
    const ba4 = Brrr.from(arr4)
    expect(ba4.splice(0, 2, 'parrot', 'anemone', 'blue').items).toEqual(
      arr4.splice(0, 2, 'parrot', 'anemone', 'blue')
    )
    expect(arr4).toEqual(ba4.items)

    const arr5 = ['parrot', 'anemone', 'blue', 'trumpet', 'sturgeon']
    const ba5 = Brrr.from(arr5)
    expect(ba5.splice(2, 2).items).toEqual(arr5.splice(2, 2))
    expect(arr5).toEqual(ba5.items)

    const arr6 = ['angel', 'clown', 'mandarin', 'sturgeon']
    const ba6 = Brrr.from(arr6)
    expect(ba6.splice(2).items).toEqual(arr6.splice(2))
    expect(arr6).toEqual(ba6.items)

    const arr7 = ['angel', 'clown', 'mandarin', 'sturgeon']
    const ba7 = Brrr.from(arr7)
    expect(ba7.splice(-2, 1).items).toEqual(arr7.splice(-2, 1))
    expect(arr7).toEqual(ba7.items)

    const arr8 = ['angel', 'clown', 'drum', 'sturgeon']
    const ba8 = Brrr.from(arr8)

    expect(arr8.splice(2, 1, 'trumpet')).toEqual(
      ba8.splice(2, 1, 'trumpet').items
    )
    expect(arr8).toEqual(ba8.items)
  })

  it('.every should work like array.every', () => {
    const isBigEnough = element => element >= 10
    expect(Brrr.from([12, 5, 8, 130, 44]).every(isBigEnough)).toBe(
      [12, 5, 8, 130, 44].every(isBigEnough)
    )
    expect(Brrr.from([12, 54, 18, 130, 44]).every(isBigEnough)).toBe(
      [12, 54, 18, 130, 44].every(isBigEnough)
    )

    const isSubset = (array1, array2) =>
      array2.every(element => array1.includes(element))

    expect(
      isSubset(Brrr.from([1, 2, 3, 4, 5, 6, 7]), Brrr.from([5, 7, 6]))
    ).toBe(isSubset([1, 2, 3, 4, 5, 6, 7], [5, 7, 6])) // true
    expect(
      isSubset(Brrr.from([1, 2, 3, 4, 5, 6, 7]), Brrr.from([5, 8, 7]))
    ).toBe(isSubset([1, 2, 3, 4, 5, 6, 7], [5, 8, 7])) // false

    expect(Brrr.from([1, undefined, 3]).every(x => x !== undefined)).toBe(
      [1, undefined, 3].every(x => x !== undefined)
    ) // true
    expect(Brrr.from([2, undefined, 3]).every(x => x === 2)).toBe(
      [2, undefined, 2].every(x => x === 2)
    ) // true
    // ---------------
    // Modifying items
    // ---------------
    const arr = [1, 2, 3, 4]
    let out1 = ''
    arr.every((elem, index, arr) => {
      arr[index + 1]--
      out1 += `[${arr}][${index}] -> ${elem}`
      return elem < 2
    })
    const brrr = Brrr.from([1, 2, 3, 4])
    let out2 = ''
    brrr.every((elem, index, arr) => {
      arr.set(index + 1, arr.get(index + 1) - 1)
      out2 += `[${arr.items}][${index}] -> ${elem}`
      return elem < 2
    })
    expect(out1).toBe(out2)
    // Loop runs for 3 iterations, but would
    // have run 2 iterations without any modification
    //
    // 1st iteration: [1,1,3,4][0] -> 1
    // 2nd iteration: [1,1,2,4][1] -> 1
    // 3rd iteration: [1,1,2,3][2] -> 2
    // ---------------
    // Appending items
    // ---------------
    const arr2 = [1, 2, 3]
    let out3 = ''
    arr2.every((elem, index, arr) => {
      arr.push('new')
      out3 += `[${arr}][${index}] -> ${elem}`
      return elem < 4
    })
    const brrr2 = Brrr.from([1, 2, 3])
    let out4 = ''
    brrr2.every((elem, index, arr) => {
      arr.push('new')
      out4 += `[${arr.items}][${index}] -> ${elem}`
      return elem < 4
    })
    expect(out3).toBe(out4)
    // Loop runs for 3 iterations, even after appending new items
    //
    // 1st iteration: [1, 2, 3, new][0] -> 1
    // 2nd iteration: [1, 2, 3, new, new][1] -> 2
    // 3rd iteration: [1, 2, 3, new, new, new][2] -> 3
    // ---------------
    // Deleting items
    // ---------------
    const arr3 = [1, 2, 3, 4]
    let out5 = ''
    arr3.every((elem, index, arr) => {
      arr.pop()
      out5 += `[${arr}][${index}] -> ${elem}`
      return elem < 4
    })

    const brrr3 = Brrr.from([1, 2, 3, 4])
    let out6 = ''
    brrr3.every((elem, index, arr) => {
      arr.pop()
      out6 += `[${arr.items}][${index}] -> ${elem}`
      return elem < 4
    })

    expect(out5).toBe(out6)

    // Loop runs for 2 iterations only, as the remaining
    // items are `pop()`ed off
    //
    // 1st iteration: [1,2,3][0] -> 1
    // 2nd iteration: [1,2][1] -> 2
  })

  function isBiggerThan10(element, index, array) {
    return element > 10
  }
  expect([2, 5, 8, 1, 4].some(isBiggerThan10)).toBe(
    Brrr.from([2, 5, 8, 1, 4]).some(isBiggerThan10)
  ) // false
  expect([12, 5, 8, 1, 4].some(isBiggerThan10)).toBe(
    Brrr.from([12, 5, 8, 1, 4]).some(isBiggerThan10)
  ) // true
  expect([2, 5, 8, 1, 4].some(x => x > 10)).toBe(
    Brrr.from([2, 5, 8, 1, 4]).some(x => x > 10)
  ) // false
  expect([12, 5, 8, 1, 4].some(x => x > 10)).toBe(
    Brrr.from([12, 5, 8, 1, 4]).some(x => x > 10)
  ) // true
})
