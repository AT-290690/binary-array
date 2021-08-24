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
    return this.right[0];
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
    const collection = [];
    for (let i = start; i < end; i++) collection.push(this.get(i));
    return new BinaryArray(collection);
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
    return -1;
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
    if (this.size <= 2) {
      if (this.size === 1) {
        return this;
      }
      const temp = this.get(0);
      this.set(0, this.get(1));
      this.set(1, temp);
      return this;
    }
    const temp = this.offsetRight * -1;
    this.offsetRight = this.offsetLeft * -1 + 1;
    this.offsetLeft = temp + 1;
    for (let i = 0; i < this.size; i++) {
      const right = this.right[i] ?? this.left[i];
      const left = this.left[i] ?? this.right[i];
      this.right[i] = left;
      this.left[i] = right;
    }

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
    return new BinaryArray([...this, ...second]);
  }

  flat(levels = 1) {
    const flatten = collection =>
      collection.reduce((acc, current) => {
        if (BinaryArray.isBinaryArray(current)) {
          acc.push(...flat(current, levels));
        } else {
          acc.push(current);
        }
        return acc;
      }, []);
    const flat =
      levels === Infinity
        ? collection => {
            return flatten(collection);
          }
        : (collection, levels) => {
            levels--;
            return levels === -1 ? collection : flatten(collection);
          };
    return new BinaryArray(flat(this, levels));
  }

  flatMap(callback) {
    return new BinaryArray(
      this.reduce((acc, current, index, self) => {
        if (BinaryArray.isBinaryArray(current)) {
          current.forEach(item => {
            acc.push(callback(item));
          });
        } else {
          acc.push(callback(current, index, self));
        }
        return acc;
      }, [])
    );
  }

  addTo(key, value) {
    if (key >= this.size) {
      for (let i = this.size; i <= key; i++) {
        this.addToRight(undefined);
      }
    }
    const [index, direction] = this.vectorIndexOf(key);
    direction >= 0 ? (this.right[index] = value) : (this.left[index] = value);
    this.balance();
    return this.size;
  }

  balance() {
    if (this.offsetRight + this.offsetLeft === 0) return;
    const array = this.toArray();
    this.clear();
    return this.init(array);
  }
}
