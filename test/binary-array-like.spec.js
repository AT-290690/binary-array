import { BinaryArray } from '../src/BinaryArray.js';
describe('BinaryArray', () => {
  it('.push, .pop, .unshift, .shift, .set should modify the collection the same', () => {
    const arr = [1, 2, 3];
    const binArr = new BinaryArray(arr);

    expect([...binArr]).toEqual(arr);

    binArr.push(6, 7, 8);
    binArr.set(3, binArr.pop());
    binArr.unshift(5, 4, 1);
    binArr.shift();

    arr.push(6, 7, 8);
    arr[3] = arr.pop();
    arr.unshift(5, 4, 1);
    arr.shift();

    expect([...binArr]).toEqual(arr);
  });
  it('.map, .filter, .sort, .reverse, .slice, .reduce, flat should modify the collection the same', () => {
    const arr = [4, 1, 1, 2, 3, 8, 7];
    const binArr = new BinaryArray(arr);

    const rasultBinaryArray = binArr
      .map(i => i * i)
      .filter(i => i > 3)
      .sort((a, b) => a - b)
      .reverse()
      .slice(1);

    const resultArray = arr
      .map(i => i * i)
      .filter(i => i > 3)
      .sort((a, b) => a - b)
      .reverse()
      .slice(1);

    expect([...rasultBinaryArray]).toEqual(resultArray);

    const flatBinArr = rasultBinaryArray.concat(
      new BinaryArray([
        51,
        12,
        33,
        new BinaryArray([
          new BinaryArray([1, 2, 3, 4, 5, new BinaryArray([1, 2, 3, 4]), 1]),
          new BinaryArray([2, 3, 4, 5]),
          new BinaryArray([23, new BinaryArray([222, 33, 1, 2])])
        ])
      ]).flat(3)
    );
    const flatArr = resultArray.concat(
      [
        51,
        12,
        33,
        [
          [1, 2, 3, 4, 5, [1, 2, 3, 4], 1],
          [2, 3, 4, 5],
          [23, [222, 33, 1, 2]]
        ]
      ].flat(3)
    );
    expect([...flatBinArr]).toEqual(flatArr);
    expect(flatBinArr.reduce((acc, i) => acc + i, 1)).toEqual(
      flatArr.reduce((acc, i) => acc + i, 1)
    );
    const infiniteArrNest = [
      [
        [[1, 2, 3, 4], [1, 2, 3, 4], 3, 4],
        [1, [1, 2, [1, 2, 3, 4], 4], 3, 4]
      ],
      [
        [1, 2, 3, 4],
        [1, 2, 3, 4]
      ]
    ];

    const infiniteBinNest = new BinaryArray([
      new BinaryArray([
        new BinaryArray([
          new BinaryArray([1, 2, 3, 4]),
          new BinaryArray([1, 2, 3, 4]),
          3,
          4
        ]),
        new BinaryArray([
          1,
          new BinaryArray([1, 2, new BinaryArray([1, 2, 3, 4]), 4]),
          3,
          4
        ])
      ]),
      new BinaryArray([
        new BinaryArray([1, 2, 3, 4]),
        new BinaryArray([1, 2, 3, 4])
      ])
    ]);

    expect(infiniteBinNest.flat(Infinity).toArray()).toEqual(
      infiniteArrNest.flat(Infinity)
    );
  });
  it('.reverse should modify the collection the same', () => {
    const arr1 = [4, 1, 1, 2, 3, 8, 7];
    const binArr1 = new BinaryArray(arr1);
    expect(binArr1.reverse().toArray()).toEqual(arr1.reverse());
    expect(binArr1.reverse().reverse().toArray()).toEqual(
      arr1.reverse().reverse()
    );
    const arr2 = [4, 1, 1, 2, 3, 8, 7, 8];
    const binArr2 = new BinaryArray(arr2);
    expect(binArr2.reverse().toArray()).toEqual(arr2.reverse());
    expect(binArr2.reverse().reverse().toArray()).toEqual(
      arr2.reverse().reverse()
    );
  });
  it('.slice should create a new collection from the same range', () => {
    const arr = [4, 1, 1, 2, 3, 8, 7];
    const binArr = new BinaryArray(arr);
    expect(arr.slice(1)).toEqual(binArr.slice(1).toArray());
    expect(arr.slice(1, 2)).toEqual(binArr.slice(1, 2).toArray());
    expect(arr.slice(3)).toEqual(binArr.slice(3).toArray());
    expect(arr.slice(2, 5)).toEqual(binArr.slice(2, 5).toArray());
    expect(arr.slice(4, 5)).toEqual(binArr.slice(4, 5).toArray());
  });
  it('.addTo shoud update the size of the array if index is bigger than the current array size', () => {
    const arr = [4, 1, 1, 2, 3, 8, 7];
    const binArr = new BinaryArray(arr);
    arr[20] = 10;
    binArr.addTo(20, 10);
    expect(arr).toEqual(binArr.toArray());
    expect(arr[15]).toEqual(binArr.get(15));
  });
});
