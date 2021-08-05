import { BinaryList } from './BinaryList.js';

export class BinaryArray extends BinaryList {
  static isBinaryArray(entity) {
    return entity instanceof BinaryArray;
  }

  static from(iterable) {
    if (iterable.length !== undefined) {
      const initial =
        iterable[0] !== undefined ? iterable : Array.from(iterable);
      return new BinaryArray([...initial]);
    }
  }

  static of(...items) {
    return new BinaryArray(items);
  }

  constructor(initial) {
    super(initial);
  }

  get first() {
    return this.get(0);
  }

  get last() {
    return this.get(this.size - 1);
  }

  get pivot() {
    return this.vector[0][1];
  }

  push(...items) {
    for (let i = 0; i < items.length; i++) this.addToRight(items[i]);
    return this.size;
  }

  unshift(...items) {
    for (let i = items.length - 1; i >= 0; i--) this.addToLeft(items[i]);
    return this.size;
  }

  pop() {
    const last = this.last;
    this.removeFromRight();
    return last;
  }

  shift() {
    const first = this.first;
    this.removeFromLeft();
    return first;
  }

  slice(start, end = this.size) {
    const result = new BinaryArray();
    const half = Math.floor(end / 2);
    for (let i = half - 1; i >= start; i--) result.addToLeft(this.get(i));
    for (let i = half; i < end; i++) result.addToRight(this.get(i));
    return result;
  }

  vectorIndexOf(index) {
    const key = index + this._offsetLeft;
    return key < 0 ? [key * -1, -1] : [key, 1];
  }

  indexOf(item) {
    for (let i = 0; i < this.size; i++) {
      if (this.get(i) === item) return i;
    }
    return -1;
  }

  lastIndexOf(item) {
    for (let i = this.size - 1; i >= 0; i--) {
      if (this.get(i) === item) return i;
    }
    return -1;
  }

  includes(val) {
    for (let i = 0; i < this.size; i++) {
      if (this.get(i) === val) return true;
    }
    return false;
  }
  find(callback) {
    for (let i = 0; i < this.size; i++) {
      const current = this.get(i);
      if (callback(current, i, this)) return current;
    }
  }

  some(callback) {
    for (let i = 0; i < this.size; i++) {
      if (callback(this.get(i), i, this)) return true;
    }
    return false;
  }

  every(callback) {
    for (let i = 0; i < this.size; i++) {
      if (!callback(this.get(i), i, this)) return false;
    }
    return true;
  }

  findIndex(callback) {
    for (let i = 0; i < this.size; i++) {
      const current = this.get(i);
      if (callback(current, i, this)) return i;
    }
  }

  map(callback) {
    const result = new BinaryArray();
    const half = Math.floor(this.size / 2);
    for (let i = half - 1; i >= 0; i--)
      result.addToLeft(callback(this.get(i), i, this));
    for (let i = half; i < this.size; i++)
      result.addToRight(callback(this.get(i), i, this));
    return result;
  }

  mapMut(callback) {
    for (let i = 0; i < this.size; i++)
      this.set(i, callback(this.get(i), i, this));
    return this;
  }

  forEach(callback) {
    for (let i = 0; i < this.size; i++) callback(this.get(i), i, this);
  }

  reduce(callback, initial) {
    for (let i = 0; i < this.size; i++) {
      initial = callback(initial, this.get(i), i, this);
    }
    return initial;
  }

  reduceRight(callback, initial) {
    for (let i = this.size - 1; i >= 0; i--) {
      initial = callback(initial, this.get(i), i, this);
    }
    return initial;
  }

  filter(callback) {
    const out = [];
    for (let i = 0; i < this.size; i++) {
      const current = this.get(i);
      const predicat = callback(current, i, this);
      if (predicat) out.push(current);
    }
    return new BinaryArray(out);
  }

  reverse() {
    const diff = this._offsetRight + this._offsetLeft;
    const temp = this._offsetRight * -1;
    this._offsetRight = this._offsetLeft * -1;
    this._offsetLeft = temp + diff;
    for (let i = 0; i < this.size; i++) {
      const right = this.vector[i]?.[1] ?? null;
      const left = this.vector[i]?.[0] ?? null;
      if (right || left) this.vector[i] = [right, left];
    }
    if (this.vector[0][1] === null)
      this.vector[0] = [this.vector[0][1], this.vector[0][0]];
    return this;
  }

  sort(callback) {
    return new BinaryArray(this.toArray().sort(callback));
  }

  join(separator = ',') {
    let output = '';
    for (let i = 0; i < this.size; i++) output += this.get(i) + separator;
    return output;
  }

  concat(second) {
    return new BinaryArray([...this.toArray(), ...second.toArray()]);
  }

  flat(levels = 1) {
    const flat = (collection, levels) => {
      levels--;
      return levels === -1
        ? collection
        : collection.reduce((acc, current) => {
            if (BinaryArray.isBinaryArray(current)) {
              acc.push(...flat(current.toArray(), levels));
            } else {
              acc.push(current);
            }
            return acc;
          }, []);
    };
    const result = flat(this, levels);
    return new BinaryArray(result);
  }

  flatMap(callback) {
    const levels = 1;
    const flat = (collection, levels) => {
      levels--;
      return levels === -1
        ? collection
        : collection.reduce((acc, current, index, self) => {
            if (BinaryArray.isBinaryArray(current)) {
              acc.push(...flat(current.map(callback).toArray(), levels));
            } else {
              acc.push(callback(current, index, self));
            }
            return acc;
          }, []);
    };
    const result = flat(this, levels);
    return new BinaryArray(result);
  }

  balance() {
    if (this._offsetRight + this._offsetLeft === 0) return;
    const array = this.toArray();
    this.clear();
    return this.init(array);
  }
}
