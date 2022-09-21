import BinaryArray from '../src/BinaryArray.js'

describe('BinaryArray extra features', () => {
  it('.rotate should work as expected', () => {
    const arr1 = [1, 2, 3]
    expect(BinaryArray.from(arr1).copy().rotate(0, 1).items).toEqual([1, 2, 3])
    expect(BinaryArray.from(arr1).copy().rotate(1, 1).items).toEqual([3, 1, 2])
    expect(BinaryArray.from(arr1).copy().rotate(2, 1).items).toEqual([2, 3, 1])
    expect(BinaryArray.from(arr1).copy().rotate(3, 1).items).toEqual([1, 2, 3])
    expect(BinaryArray.from(arr1).copy().rotate(4, 1).items).toEqual([3, 1, 2])
    expect(BinaryArray.from(arr1).copy().rotate(6, 1).items).toEqual([1, 2, 3])
    expect(BinaryArray.from(arr1).copy().rotate(0, -1).items).toEqual([1, 2, 3])
    expect(BinaryArray.from(arr1).copy().rotate(1, -1).items).toEqual([2, 3, 1])
    expect(BinaryArray.from(arr1).copy().rotate(2, -1).items).toEqual([3, 1, 2])
    expect(BinaryArray.from(arr1).copy().rotate(3, -1).items).toEqual([1, 2, 3])
    expect(BinaryArray.from(arr1).copy().rotate(4, -1).items).toEqual([2, 3, 1])
    expect(BinaryArray.from(arr1).copy().rotate(6, -1).items).toEqual([1, 2, 3])

    const arr2 = [1, 2, 3, 4]

    expect(BinaryArray.from(arr2).copy().rotate(0, 1).items).toEqual([
      1, 2, 3, 4,
    ])
    expect(BinaryArray.from(arr2).copy().rotate(1, 1).items).toEqual([
      4, 1, 2, 3,
    ])
    expect(BinaryArray.from(arr2).copy().rotate(2, 1).items).toEqual([
      3, 4, 1, 2,
    ])
    expect(BinaryArray.from(arr2).copy().rotate(3, 1).items).toEqual([
      2, 3, 4, 1,
    ])
    expect(BinaryArray.from(arr2).copy().rotate(4, 1).items).toEqual([
      1, 2, 3, 4,
    ])
  })

  it('.compact should work as expected', () => {
    expect(
      new BinaryArray().with(1, 0, 0, 4, '', false, undefined, 3, 4).compact()
        .items
    ).toEqual([1, 4, 3, 4])
  })

  it('.unique should work as expected', () => {
    expect(
      new BinaryArray().with(1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3).unique().items
    ).toEqual([1, 2, 3])
  })

  it('.duplicates should work as expected', () => {
    expect(
      new BinaryArray()
        .with(1, 2, 2, 0, 2, 5, 2, 9, 3, 3, 3, 4, 8, 9)
        .duplicates()
        .mergeSort().items
    ).toEqual([2, 2, 2, 2, 3, 3, 3, 9, 9])
  })

  it('.partition should work as expected', () => {
    expect(
      new BinaryArray()
        .with(1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3)
        .partition(3)
        .toArray(true)
    ).toEqual([
      [1, 1, 1],
      [1, 2, 2],
      [2, 2, 3],
      [3, 3],
    ])
  })

  it('Set methods should work as expected', () => {
    const a1 = new BinaryArray().with(1, 2, 3, 4)
    const b1 = new BinaryArray().with(8, 9, 3, 2, 4)
    expect(a1.symetricdifference(b1).items).toEqual([8, 9, 1])

    const a2 = new BinaryArray().with(1, 2, 3, 4)
    const b2 = new BinaryArray().with(8, 9, 3, 2, 4)
    expect(a2.difference(b2).items).toEqual([1])

    const a3 = new BinaryArray().with(1, 2, 3, 4)
    const b3 = new BinaryArray().with(8, 9, 3, 2, 4)
    expect(a3.union(b3).items).toEqual([1, 2, 3, 4, 8, 9, 3, 2, 4])

    const a4 = new BinaryArray().with(1, 2, 3, 4)
    const b4 = new BinaryArray().with(8, 9, 3, 2, 4)
    expect(a4.intersection(b4).items).toEqual([3, 2, 4])

    const a5 = new BinaryArray().with(1, 2, 3, 4)
    const b5 = new BinaryArray().with(8, 9, 3, 2, 4)
    expect(a5.union(b5).unique().items).toEqual([1, 2, 3, 4, 8, 9])

    const a6 = new BinaryArray().with(1, 2, 3, 4, 5, 8)
    const b6 = new BinaryArray().with(8, 9, 3, 2, 4)
    expect(a6.unique().union(b6.unique()).symetricdifference(b6).items).toEqual(
      [1, 5]
    )
  })

  it('.swap should work as expected', () => {
    const arr = new BinaryArray().with(1, 2, 3)
    arr.swap(0, 2)
    expect([...arr]).toEqual([3, 2, 1])
    arr.swap(0, 2)
    expect([...arr]).toEqual([1, 2, 3])
  })

  it('.scan should work as expected', () => {
    const out = []
    new BinaryArray()
      .with(1, 2, 3)
      .scan((x) => out.push(x))
      .scan((x) => out.push(x * 2))
      .scan((x) => out.push(x * 3))
    expect(out).toEqual([1, 2, 3, 2, 4, 6, 3, 6, 9])
  })

  it('.append, .prepend, .tail, .head should work as expected', () => {
    const arr = new BinaryArray().with(1, 2, 3)
    expect(
      arr.append(4).append(5).prepend(0).prepend(-1).prepend(-2).items
    ).toEqual([-2, -1, 0, 1, 2, 3, 4, 5])
    expect(arr.tail().head().tail().head().items).toEqual([0, 1, 2, 3])
    expect(arr.cut()).toBe(3)
    expect(arr.items).toEqual([0, 1, 2])
    expect(arr.chop()).toBe(0)
    expect(arr.items).toEqual([1, 2])
    expect(arr.chop()).toBe(1)
    expect(arr.chop()).toBe(2)
  })

  it('.balance should work as expected', () => {
    const arr = new BinaryArray().with(6, 6, 6)

    arr.push(-2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10)
    arr.unshift(-3, -4)

    expect(arr.left).toEqual([BinaryArray.negativeZeroEmptyValue, 6, -4, -3])
    expect(arr.right).toEqual([6, 6, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
    arr.balance()
    expect(arr.offsetLeft * -1).toEqual(arr.offsetRight)
    expect(arr.left.length - 1).toEqual(arr.right.length)
    expect(arr.left).toEqual([
      BinaryArray.negativeZeroEmptyValue,
      1,
      0,
      -1,
      -2,
      6,
      6,
      6,
      -4,
      -3,
    ])
    expect(arr.right).toEqual([2, 3, 4, 5, 6, 7, 8, 9, 10])
  })

  it('.removeFrom should work as expected', () => {
    expect(
      new BinaryArray()
        .with(-2, -1, 0, 1, 2, 3, 4, 5, 2, 3, 4, 5)
        .removeFrom(0, 0).items
    ).toEqual([-2, -1, 0, 1, 2, 3, 4, 5, 2, 3, 4, 5])
    expect(
      new BinaryArray()
        .with(-2, -1, 0, 1, 2, 3, 4, 5, 2, 3, 4, 5)
        .removeFrom(0, 1).items
    ).toEqual([-1, 0, 1, 2, 3, 4, 5, 2, 3, 4, 5])
    expect(
      new BinaryArray()
        .with(-2, -1, 0, 1, 2, 3, 4, 5, 2, 3, 4, 5)
        .removeFrom(0, 2).items
    ).toEqual([0, 1, 2, 3, 4, 5, 2, 3, 4, 5])
    expect(
      new BinaryArray()
        .with(-2, -1, 0, 1, 2, 3, 4, 5, 2, 3, 4, 5)
        .removeFrom(1, 1).items
    ).toEqual([-2, 0, 1, 2, 3, 4, 5, 2, 3, 4, 5])
    expect(
      new BinaryArray()
        .with(-2, -1, 0, 1, 2, 3, 4, 5, 2, 3, 4, 5)
        .removeFrom(2, 1).items
    ).toEqual([-2, -1, 1, 2, 3, 4, 5, 2, 3, 4, 5])
    expect(
      new BinaryArray()
        .with(-2, -1, 0, 1, 2, 3, 4, 5, 2, 3, 4, 5)
        .removeFrom(2, 4).items
    ).toEqual([-2, -1, 4, 5, 2, 3, 4, 5])
    const arr = [1, 2, 3, 4, 5, 6, 7]
    expect(BinaryArray.from(arr).copy().removeFrom(1, 3).items).toEqual([
      1, 5, 6, 7,
    ])
    expect(
      BinaryArray.from(arr).copy().removeFrom(1, arr.length).items
    ).toEqual([1])
    expect(BinaryArray.from(arr).copy().removeFrom(3, 1).items).toEqual([
      1, 2, 3, 5, 6, 7,
    ])
    expect(BinaryArray.from(arr).copy().removeFrom(3, 0).items).toEqual([
      1, 2, 3, 4, 5, 6, 7,
    ])
    expect(
      BinaryArray.from(arr).copy().removeFrom(0, arr.length).items
    ).toEqual([])
  })

  it('.group should work as expected', () => {
    const group = new BinaryArray()
      .with(1, 2, 3, 4, 4, 5, 8, 9, 1, 2, 32, 222, 2)
      .group((item) => (item % 2 == 0 ? 'even' : 'odd'))
      .map((item) => item.items)
    expect(group.items).toEqual({
      odd: [1, 3, 5, 9, 1],
      even: [2, 4, 4, 8, 2, 32, 222, 2],
    })
  })

  it('.isSorted should work as expected', () => {
    expect(BinaryArray.from([1, 2, 3, 4, 5]).isSorted()).toBe(true)
    expect(BinaryArray.from([1, 2, 8, 9, 9]).isSorted()).toBe(true)
    expect(BinaryArray.from([1, 2, 2, 3, 2]).isSorted()).toBe(false)
    expect(BinaryArray.from(['a', 'b', 'c']).isSorted()).toBe(true)
    expect(BinaryArray.from(['a', 'c', 'b']).isSorted()).toBe(false)
    expect(BinaryArray.from(['c', 'b', 'a']).isSorted()).toBe(false)
    expect(BinaryArray.from(['c', 'b', 'a']).isSorted(false)).toBe(true)
    expect(
      BinaryArray.from([
        { key: 'a', value: 1 },
        { key: 'b', value: 2 },
        { key: 'c', value: 4 },
      ]).isSorted(
        (current, index, arr) => !index || arr.at(index - 1).key <= current.key
      )
    ).toBe(true)
    expect(
      BinaryArray.from([
        { key: 'b', value: 1 },
        { key: 'a', value: 8 },
        { key: 'c', value: 9 },
      ]).isSorted(
        (current, index, arr) => !index || arr.at(index - 1).key <= current.key
      )
    ).toBe(false)
  })

  it('.quickSort should work as expected', () => {
    expect(
      BinaryArray.from([3, 1, 8, 5, 9, 1, 2, 4]).quickSort('asc').items
    ).toEqual([1, 1, 2, 3, 4, 5, 8, 9])
    expect(
      BinaryArray.from([3, 1, 8, 5, 9, 1, 2, 4]).quickSort('des').items
    ).toEqual([1, 1, 2, 3, 4, 5, 8, 9].reverse())
  })

  it('.search should work as expected', () => {
    expect(BinaryArray.from([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]).search(3)).toBe(3)
    expect(BinaryArray.from([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]).search(9)).toBe(9)
    expect(BinaryArray.from([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]).search(11)).toBe(
      undefined
    )
    const searchKey = 'd'
    const objectTarget = { key: searchKey, value: 7 }
    expect(
      BinaryArray.from([
        { key: 'f', value: 14 },
        { key: 'g', value: 24 },
        { key: 'g', value: 14 },
        { key: 'b', value: 2 },
        { key: 'c', value: 43 },
        objectTarget,
        { key: 'e', value: 24 },
        { key: 'a', value: 1 },
        { key: 'm', value: 24 },
        { key: 'l', value: 43 },
      ])
        .mergeSort((a, b) => (a.key > b.key ? 1 : -1))
        .search(searchKey, (current) => current.key)
    ).toMatchObject(objectTarget)

    const input = [1, 2, 3, 2, 3, 7, 1, 2, 3, 2, 3, 7, 13]
    expect(
      new BinaryArray()
        .with(...input)
        .unique()
        .map((x, i) => ({ key: x + '-' + i, x }))
        .mergeSort((a, b) => (a.key.localeCompare(b.key) ? 1 : -1))
        .search(
          '3-2',
          (current) => current.key,
          (current) => current.key.localeCompare('3-2')
        )
    ).toEqual({ key: '3-2', x: 3 })
    expect(
      new BinaryArray()
        .with(...input)
        .unique()
        .map((x, i) => ({ key: x + '-' + i, x }))
        .mergeSort((a, b) => (a.key.localeCompare(b.key) ? -1 : 1))
        .search(
          '3-2',
          (current) => current.key,
          (current) => current.key.localeCompare('3-2')
        )
    ).toEqual({ key: '3-2', x: 3 })

    const dateTarget = new Date('1970-01-01T00:00:00.002Z')
    expect(
      new BinaryArray()
        .with(...input)
        .unique()
        .map((x, i) => ({ date: new Date(i), x }))
        .mergeSort((a, b) => (a.date.getTime() > b.date.getTime() ? -1 : 1))
        .search(
          dateTarget.getTime(),
          (current) => current.date.getTime(),
          (current) => current.date.getTime() > dateTarget.getTime()
        )
    ).toEqual({ date: dateTarget, x: 3 })
  })

  it('.without should work as expected', () => {
    const items = [2, 1, 2, 3]
    const binArr = BinaryArray.from(items)
    expect(binArr.without(1, 2).items).toEqual([3])
    expect(binArr.without(1).items).toEqual([2, 2, 3])
    expect(binArr.without(3).items).toEqual([2, 1, 2])
  })

  it('.isInBouds and .getInBounds should work as expected', () => {
    const binArr = new BinaryArray().with(0, 1, 2, 3)
    expect(binArr.isInBouds(4)).toBe(false)
    expect(binArr.isInBouds(-1)).toBe(false)
    expect(binArr.isInBouds(2)).toBe(true)
    expect(binArr.getInBounds(2)).toBe(2)
    expect(binArr.getInBounds(192)).toBe(3)
    expect(binArr.getInBounds(0)).toBe(0)
    expect(binArr.getInBounds(-100)).toBe(0)
  })

  it('.take and .takeRight should work as expected', () => {
    expect(BinaryArray.from([1, 2, 3]).take().items).toEqual([1])
    expect(BinaryArray.from([1, 2, 3]).take(2).items).toEqual([1, 2])
    expect(BinaryArray.from([1, 2, 3]).take(5).items).toEqual([1, 2, 3])
    expect(BinaryArray.from([]).take(0).items).toEqual([])

    expect(BinaryArray.from([1, 2, 3]).takeRight().items).toEqual([3])
    expect(BinaryArray.from([2, 3]).takeRight(2).items).toEqual([2, 3])
    expect(BinaryArray.from([1, 2, 3]).takeRight(5).items).toEqual([1, 2, 3])
    expect(BinaryArray.from([]).takeRight(0).items).toEqual([])
  })

  it('.to should work as expected', () => {
    expect(
      BinaryArray.from('(())')
        .to((acc, x) =>
          x === '('
            ? acc.prepend(x)
            : acc.first === '('
            ? acc.tail()
            : acc.append(x)
        )
        .isEmpty()
    ).toBe(true)

    expect(
      BinaryArray.from('101234')
        .map(Number)
        .to((acc, item) => (acc += item), 0)
    ).toBe(11)
  })
})
