import { BinaryArray } from '../src/BinaryArray.js';

describe('BinaryArray extra features', () => {
  it('.rotate should work as expected', () => {
    const arr1 = [1, 2, 3];
    expect(new BinaryArray(arr1).rotateCopy(0, 1).toArray()).toEqual([1, 2, 3]);
    expect(new BinaryArray(arr1).rotateCopy(1, 1).toArray()).toEqual([3, 1, 2]);
    expect(new BinaryArray(arr1).rotateCopy(2, 1).toArray()).toEqual([2, 3, 1]);
    expect(new BinaryArray(arr1).rotateCopy(3, 1).toArray()).toEqual([1, 2, 3]);
    expect(new BinaryArray(arr1).rotateCopy(4, 1).toArray()).toEqual([3, 1, 2]);
    expect(new BinaryArray(arr1).rotateCopy(6, 1).toArray()).toEqual([1, 2, 3]);
    expect(new BinaryArray(arr1).rotateCopy(0, -1).toArray()).toEqual([
      1, 2, 3
    ]);
    expect(new BinaryArray(arr1).rotateCopy(1, -1).toArray()).toEqual([
      2, 3, 1
    ]);
    expect(new BinaryArray(arr1).rotateCopy(2, -1).toArray()).toEqual([
      3, 1, 2
    ]);
    expect(new BinaryArray(arr1).rotateCopy(3, -1).toArray()).toEqual([
      1, 2, 3
    ]);
    expect(new BinaryArray(arr1).rotateCopy(4, -1).toArray()).toEqual([
      2, 3, 1
    ]);
    expect(new BinaryArray(arr1).rotateCopy(6, -1).toArray()).toEqual([
      1, 2, 3
    ]);

    const arr2 = [1, 2, 3, 4];

    expect(new BinaryArray(arr2).rotateCopy(0, 1).toArray()).toEqual([
      1, 2, 3, 4
    ]);
    expect(new BinaryArray(arr2).rotateCopy(1, 1).toArray()).toEqual([
      4, 1, 2, 3
    ]);
    expect(new BinaryArray(arr2).rotateCopy(2, 1).toArray()).toEqual([
      3, 4, 1, 2
    ]);
    expect(new BinaryArray(arr2).rotateCopy(3, 1).toArray()).toEqual([
      2, 3, 4, 1
    ]);
    expect(new BinaryArray(arr2).rotateCopy(4, 1).toArray()).toEqual([
      1, 2, 3, 4
    ]);
  });

  it('.compact should work as expected', () => {
    expect(
      new BinaryArray()
        .with(1, 0, 0, 4, '', false, undefined, 3, 4)
        .compact()
        .toArray()
    ).toEqual([1, 4, 3, 4]);
  });

  it('.unique should work as expected', () => {
    expect(
      new BinaryArray().with(1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3).unique().toArray()
    ).toEqual([1, 2, 3]);
  });

  it('.duplicates should work as expected', () => {
    expect(
      new BinaryArray()
        .with(1, 2, 2, 0, 2, 5, 2, 9, 3, 3, 3, 4, 8, 9)
        .duplicates()
        .sort()
        .toArray()
    ).toEqual([2, 2, 2, 2, 3, 3, 3, 9, 9]);
  });

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
      [3, 3]
    ]);
  });

  it('Set methods should work as expected', () => {
    const a1 = new BinaryArray().with(1, 2, 3, 4);
    const b1 = new BinaryArray().with(8, 9, 3, 2, 4);
    expect(a1.symetricdifference(b1).toArray()).toEqual([8, 9, 1]);

    const a2 = new BinaryArray().with(1, 2, 3, 4);
    const b2 = new BinaryArray().with(8, 9, 3, 2, 4);
    expect(a2.difference(b2).toArray()).toEqual([1]);

    const a3 = new BinaryArray().with(1, 2, 3, 4);
    const b3 = new BinaryArray().with(8, 9, 3, 2, 4);
    expect(a3.union(b3).toArray()).toEqual([1, 2, 3, 4, 8, 9, 3, 2, 4]);

    const a4 = new BinaryArray().with(1, 2, 3, 4);
    const b4 = new BinaryArray().with(8, 9, 3, 2, 4);
    expect(a4.intersection(b4).toArray()).toEqual([3, 2, 4]);

    const a5 = new BinaryArray().with(1, 2, 3, 4);
    const b5 = new BinaryArray().with(8, 9, 3, 2, 4);
    expect(a5.union(b5).unique().toArray()).toEqual([1, 2, 3, 4, 8, 9]);

    const a6 = new BinaryArray().with(1, 2, 3, 4, 5, 8);
    const b6 = new BinaryArray().with(8, 9, 3, 2, 4);
    expect(
      a6.unique().union(b6.unique()).symetricdifference(b6).toArray()
    ).toEqual([1, 5]);
  });

  it('.scan should work as expected', () => {
    const out = [];
    new BinaryArray()
      .with(1, 2, 3)
      .scan(x => out.push(x))
      .scan(x => out.push(x * 2))
      .scan(x => out.push(x * 3));
    expect(out).toEqual([1, 2, 3, 2, 4, 6, 3, 6, 9]);
  });
});
