import { BinaryList } from '../src/BinaryList.js';
describe('BinaryList', () => {
  it('init should create an array of items', () => {
    const list = new BinaryList([1]);
    expect([...list]).toEqual([1]);
  });

  it('addToRight should add item at the end', () => {
    const list = new BinaryList();
    list.addToRight(1);
    expect([...list]).toEqual([1]);
    list.addToRight(2);
    expect([...list]).toEqual([1, 2]);
  });

  it('addToLeft should add item at the start', () => {
    const list = new BinaryList();
    list.addToLeft(1);
    expect([...list]).toEqual([1]);
    list.addToLeft(2);
    expect([...list]).toEqual([2, 1]);
  });

  it('removeFromRight should remove item from the end', () => {
    const list = new BinaryList([1, 2, 3]);
    list.removeFromRight();
    expect([...list]).toEqual([1, 2]);
    list.removeFromRight();
    expect([...list]).toEqual([1]);
    list.removeFromRight();
    expect([...list]).toEqual([]);
  });

  it('removeFromLeft should remove item from the left', () => {
    const list = new BinaryList([1, 2, 3]);
    list.removeFromLeft();
    expect([...list]).toEqual([2, 3]);
    list.removeFromLeft();
    expect([...list]).toEqual([3]);
    list.removeFromLeft();
    expect([...list]).toEqual([]);
  });

  it('get should access the desired element', () => {
    const list = new BinaryList();
    expect(list.get(0)).toBe(null);
    list.addToRight(0);
    list.addToRight(1);
    list.addToRight(2);
    list.addToLeft(-1);
    list.addToLeft(-2);
    expect(list.get(0)).toBe(-2);
    expect(list.get(1)).toBe(-1);
    expect(list.get(2)).toBe(0);
    expect(list.get(3)).toBe(1);
    expect(list.get(4)).toBe(2);
    expect(list.get(5)).toBe(null);
  });
});
