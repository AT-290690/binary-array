import { BinaryArray } from '../src/BinaryArray.js';

describe('BinaryArray mimic Array', () => {
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
    expect(arr.length).toEqual(binArr.length);
  });

  it('operations 1 .map, .filter, .sort, .reverse, .slice, .reduce, .flat should modify the collection the same', () => {
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
    expect(resultArray.length).toEqual(rasultBinaryArray.length);

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
    expect(flatArr.length).toEqual(flatBinArr.length);

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
    expect(infiniteArrNest.length).toEqual(infiniteBinNest.length);
    expect(infiniteArrNest.flat(Infinity).length).toEqual(
      infiniteBinNest.flat(Infinity).toArray().length
    );
  });

  it('operations 2 .map, .filter, .sort, .reverse, .slice, .reduce, .flat should modify the collection the same', () => {
    const arr = [4, 1, 1, 2, 3, 8, 7];
    const binArr = new BinaryArray(arr);

    const rasultBinaryArray = binArr
      .map(i => i ** i)
      .reverse()
      .sort((a, b) => a + b)
      .slice(2);

    const resultArray = arr
      .map(i => i ** i)
      .reverse()
      .sort((a, b) => a + b)
      .slice(2);

    expect([...rasultBinaryArray]).toEqual(resultArray);
    expect(resultArray.length).toEqual(rasultBinaryArray.length);

    const flatBinArr = rasultBinaryArray.concat(
      new BinaryArray([
        51,
        12,
        33,
        new BinaryArray([
          new BinaryArray([
            1,
            2,
            3,
            4,
            5,
            rasultBinaryArray,
            new BinaryArray([1, 2, 3, 4]).reverse().splice(1, 2),
            1
          ]),
          new BinaryArray([2, 3, 4, 5]).slice(2, 4),
          new BinaryArray([23, new BinaryArray([222, 33, 1, 2])])
        ])
      ])
        .reverse()
        .flat(2)
    );

    const flatArr = resultArray.concat(
      [
        51,
        12,
        33,
        [
          [1, 2, 3, 4, 5, resultArray, [1, 2, 3, 4].reverse().splice(1, 2), 1],
          [2, 3, 4, 5].slice(2, 4),
          [23, [222, 33, 1, 2]]
        ]
      ]
        .reverse()
        .flat(2)
    );

    expect(flatBinArr.toArray(true)).toEqual(flatArr);
    expect(flatArr.length).toEqual(flatBinArr.length);

    const flatMapArray = [[1, 2, 3, 4], [1, 2, 3, 4].reverse()];
    const flatMapBinaryArray = new BinaryArray([
      new BinaryArray([1, 2, 3, 4]),
      new BinaryArray([1, 2, 3, 4]).reverse()
    ]);

    expect(flatMapBinaryArray.flatten(x => x * 10 + 4).toArray(true)).toEqual(
      flatMapArray.flatMap(item => item.map(x => x * 10 + 4))
    );
  });

  it('.reverse should modify the collection the same', () => {
    const arr1 = [4, 1, 1, 2, 3, 8, 7];
    const binArr1 = new BinaryArray(arr1);
    expect(binArr1.reverse().toArray()).toEqual(arr1.reverse());
    expect(binArr1.reverse().reverse().toArray()).toEqual(
      arr1.reverse().reverse()
    );
    expect(arr1.length).toEqual(binArr1.length);

    const arr2 = [4, 1, 1, 2, 3, 8, 7, 8];
    const binArr2 = new BinaryArray(arr2);
    expect(binArr2.reverse().toArray()).toEqual(arr2.reverse());
    expect(binArr2.reverse().reverse().toArray()).toEqual(
      arr2.reverse().reverse()
    );
    expect(arr2.length).toEqual(binArr2.length);
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

  it('.splice should modify the array in place', () => {
    const months = ['Jan', 'March', 'April', 'June'];
    const binMonths = new BinaryArray(months);
    expect(months.splice(1, 0, 'Feb')).toEqual(binMonths.splice(1, 0, 'Feb'));
    expect(months).toEqual([...binMonths]);
    expect(months.length).toEqual(binMonths.length);
    expect(months.splice(4, 1, 'May')).toEqual(binMonths.splice(4, 1, 'May'));
    expect(months).toEqual([...binMonths]);
    expect(months.length).toEqual(binMonths.length);

    const arr = [1, 2, 3, 4, 5, 6];
    const binArr = new BinaryArray(arr);

    expect(arr.splice(2, 3, 'a', 'b', 'c')).toEqual(
      binArr.splice(2, 3, 'a', 'b', 'c')
    );
    expect(arr).toEqual([...binArr]);
    expect(arr.length).toEqual(binArr.length);
  });

  it('.addTo shoud update the size of the array if index is bigger than the current array size', () => {
    const arr = [4, 1, 1, 2, 3, 8, 7];
    const binArr = new BinaryArray(arr);
    arr[20] = 10;
    binArr.addTo(20, 10);
    expect(arr).toEqual(binArr.toArray());
    expect(arr[15]).toEqual(binArr.get(15));
    expect(arr.length).toEqual(binArr.length);
  });
  it('.removeFrom (non-array function) should work as expected', () => {
    const arr = [1, 2, 3, 4, 5, 6, 7];
    expect(new BinaryArray(arr).removeFromCopy(1, 3).toArray()).toEqual([
      1, 5, 6, 7
    ]);
    expect(
      new BinaryArray(arr).removeFromCopy(1, arr.length).toArray()
    ).toEqual([1]);
    expect(new BinaryArray(arr).removeFromCopy(3, 1).toArray()).toEqual([
      1, 2, 3, 5, 6, 7
    ]);
    expect(new BinaryArray(arr).removeFromCopy(3, 0).toArray()).toEqual([
      1, 2, 3, 4, 5, 6, 7
    ]);
    expect(
      new BinaryArray(arr).removeFromCopy(0, arr.length).toArray()
    ).toEqual([]);
  });
  it('.join should return expected array', () => {
    const string = '0101010101.01010101010101000.010101001.01.0101001.010.101';
    expect(
      BinaryArray.from(string)
        .filter(x => x !== '.')
        .join('.')
    ).toEqual(
      Array.from(string)
        .filter(x => x !== '.')
        .join('.')
    );
  });
});
