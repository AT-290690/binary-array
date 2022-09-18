import BinaryArray from "../src/BinaryArray.js"

describe("BinaryArray extra features", () => {
  it(".rotate should work as expected", () => {
    const arr1 = [1, 2, 3]
    expect(BinaryArray.from(arr1).rotateCopy(0, 1).toArray()).toEqual([1, 2, 3])
    expect(BinaryArray.from(arr1).rotateCopy(1, 1).toArray()).toEqual([3, 1, 2])
    expect(BinaryArray.from(arr1).rotateCopy(2, 1).toArray()).toEqual([2, 3, 1])
    expect(BinaryArray.from(arr1).rotateCopy(3, 1).toArray()).toEqual([1, 2, 3])
    expect(BinaryArray.from(arr1).rotateCopy(4, 1).toArray()).toEqual([3, 1, 2])
    expect(BinaryArray.from(arr1).rotateCopy(6, 1).toArray()).toEqual([1, 2, 3])
    expect(BinaryArray.from(arr1).rotateCopy(0, -1).toArray()).toEqual([
      1, 2, 3,
    ])
    expect(BinaryArray.from(arr1).rotateCopy(1, -1).toArray()).toEqual([
      2, 3, 1,
    ])
    expect(BinaryArray.from(arr1).rotateCopy(2, -1).toArray()).toEqual([
      3, 1, 2,
    ])
    expect(BinaryArray.from(arr1).rotateCopy(3, -1).toArray()).toEqual([
      1, 2, 3,
    ])
    expect(BinaryArray.from(arr1).rotateCopy(4, -1).toArray()).toEqual([
      2, 3, 1,
    ])
    expect(BinaryArray.from(arr1).rotateCopy(6, -1).toArray()).toEqual([
      1, 2, 3,
    ])

    const arr2 = [1, 2, 3, 4]

    expect(BinaryArray.from(arr2).rotateCopy(0, 1).toArray()).toEqual([
      1, 2, 3, 4,
    ])
    expect(BinaryArray.from(arr2).rotateCopy(1, 1).toArray()).toEqual([
      4, 1, 2, 3,
    ])
    expect(BinaryArray.from(arr2).rotateCopy(2, 1).toArray()).toEqual([
      3, 4, 1, 2,
    ])
    expect(BinaryArray.from(arr2).rotateCopy(3, 1).toArray()).toEqual([
      2, 3, 4, 1,
    ])
    expect(BinaryArray.from(arr2).rotateCopy(4, 1).toArray()).toEqual([
      1, 2, 3, 4,
    ])
  })

  it(".compact should work as expected", () => {
    expect(
      new BinaryArray()
        .with(1, 0, 0, 4, "", false, undefined, 3, 4)
        .compact()
        .toArray()
    ).toEqual([1, 4, 3, 4])
  })

  it(".unique should work as expected", () => {
    expect(
      new BinaryArray().with(1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3).unique().toArray()
    ).toEqual([1, 2, 3])
  })

  it(".duplicates should work as expected", () => {
    expect(
      new BinaryArray()
        .with(1, 2, 2, 0, 2, 5, 2, 9, 3, 3, 3, 4, 8, 9)
        .duplicates()
        .mergeSort()
        .toArray()
    ).toEqual([2, 2, 2, 2, 3, 3, 3, 9, 9])
  })

  it(".partition should work as expected", () => {
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

  it("Set methods should work as expected", () => {
    const a1 = new BinaryArray().with(1, 2, 3, 4)
    const b1 = new BinaryArray().with(8, 9, 3, 2, 4)
    expect(a1.symetricdifference(b1).toArray()).toEqual([8, 9, 1])

    const a2 = new BinaryArray().with(1, 2, 3, 4)
    const b2 = new BinaryArray().with(8, 9, 3, 2, 4)
    expect(a2.difference(b2).toArray()).toEqual([1])

    const a3 = new BinaryArray().with(1, 2, 3, 4)
    const b3 = new BinaryArray().with(8, 9, 3, 2, 4)
    expect(a3.union(b3).toArray()).toEqual([1, 2, 3, 4, 8, 9, 3, 2, 4])

    const a4 = new BinaryArray().with(1, 2, 3, 4)
    const b4 = new BinaryArray().with(8, 9, 3, 2, 4)
    expect(a4.intersection(b4).toArray()).toEqual([3, 2, 4])

    const a5 = new BinaryArray().with(1, 2, 3, 4)
    const b5 = new BinaryArray().with(8, 9, 3, 2, 4)
    expect(a5.union(b5).unique().toArray()).toEqual([1, 2, 3, 4, 8, 9])

    const a6 = new BinaryArray().with(1, 2, 3, 4, 5, 8)
    const b6 = new BinaryArray().with(8, 9, 3, 2, 4)
    expect(
      a6.unique().union(b6.unique()).symetricdifference(b6).toArray()
    ).toEqual([1, 5])
  })

  it(".swap should work as expected", () => {
    const arr = new BinaryArray().with(1, 2, 3)
    arr.swap(0, 2)
    expect([...arr]).toEqual([3, 2, 1])
    arr.swap(0, 2)
    expect([...arr]).toEqual([1, 2, 3])
  })

  it(".scan should work as expected", () => {
    const out = []
    new BinaryArray()
      .with(1, 2, 3)
      .scan((x) => out.push(x))
      .scan((x) => out.push(x * 2))
      .scan((x) => out.push(x * 3))
    expect(out).toEqual([1, 2, 3, 2, 4, 6, 3, 6, 9])
  })

  it(".append, .prepend, .tail, .head should work as expected", () => {
    const arr = new BinaryArray().with(1, 2, 3)
    expect(
      arr.append(4).append(5).prepend(0).prepend(-1).prepend(-2).toArray()
    ).toEqual([-2, -1, 0, 1, 2, 3, 4, 5])
    expect(arr.tail().head().tail().head().toArray()).toEqual([0, 1, 2, 3])
  })

  it(".balance should work as expected", () => {
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

  it(".removeFrom should work as expected", () => {
    const arr = [1, 2, 3, 4, 5, 6, 7]
    expect(BinaryArray.from(arr).removeFromCopy(1, 3).toArray()).toEqual([
      1, 5, 6, 7,
    ])
    expect(
      BinaryArray.from(arr).removeFromCopy(1, arr.length).toArray()
    ).toEqual([1])
    expect(BinaryArray.from(arr).removeFromCopy(3, 1).toArray()).toEqual([
      1, 2, 3, 5, 6, 7,
    ])
    expect(BinaryArray.from(arr).removeFromCopy(3, 0).toArray()).toEqual([
      1, 2, 3, 4, 5, 6, 7,
    ])
    expect(
      BinaryArray.from(arr).removeFromCopy(0, arr.length).toArray()
    ).toEqual([])
  })
  it(".isSorted should work as expected", () => {
    expect(BinaryArray.from([1, 2, 3, 4, 5]).isSorted()).toBe(true)
    expect(BinaryArray.from([1, 2, 8, 9, 9]).isSorted()).toBe(true)
    expect(BinaryArray.from([1, 2, 2, 3, 2]).isSorted()).toBe(false)
    expect(BinaryArray.from(["a", "b", "c"]).isSorted()).toBe(true)
    expect(BinaryArray.from(["a", "c", "b"]).isSorted()).toBe(false)
    expect(BinaryArray.from(["c", "b", "a"]).isSorted()).toBe(false)
    expect(BinaryArray.from(["c", "b", "a"]).isSorted(false)).toBe(true)
    expect(
      BinaryArray.from([
        { key: "a", value: 1 },
        { key: "b", value: 2 },
        { key: "c", value: 4 },
      ]).isSorted(
        (current, index, arr) => !index || arr.at(index - 1).key <= current.key
      )
    ).toBe(true)
    expect(
      BinaryArray.from([
        { key: "b", value: 1 },
        { key: "a", value: 8 },
        { key: "c", value: 9 },
      ]).isSorted(
        (current, index, arr) => !index || arr.at(index - 1).key <= current.key
      )
    ).toBe(false)
  })
  it(".quickSort should work as expected", () => {
    expect(
      BinaryArray.from([3, 1, 8, 5, 9, 1, 2, 4]).quickSort("asc").toArray()
    ).toEqual([1, 1, 2, 3, 4, 5, 8, 9])
    expect(
      BinaryArray.from([3, 1, 8, 5, 9, 1, 2, 4]).quickSort("des").toArray()
    ).toEqual([1, 1, 2, 3, 4, 5, 8, 9].reverse())
  })
  it(".search should work as expected", () => {
    expect(BinaryArray.from([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]).search(3)).toBe(3)
    expect(BinaryArray.from([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]).search(9)).toBe(9)
    expect(BinaryArray.from([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]).search(11)).toBe(
      undefined
    )
    const searchKey = "d"
    const objectTarget = { key: searchKey, value: 7 }
    expect(
      BinaryArray.from([
        { key: "f", value: 14 },
        { key: "g", value: 24 },
        { key: "g", value: 14 },
        { key: "b", value: 2 },
        { key: "c", value: 43 },
        objectTarget,
        { key: "e", value: 24 },
        { key: "a", value: 1 },
        { key: "m", value: 24 },
        { key: "l", value: 43 },
      ])
        .mergeSort((a, b) => (a.key > b.key ? 1 : -1))
        .search((target) =>
          target.key === searchKey
            ? [true, false]
            : [false, target.key > searchKey]
        )
    ).toMatchObject(objectTarget)
  })
})
