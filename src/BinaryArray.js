const flatten = (collection, levels, flat) =>
  collection.reduce((acc, current) => {
    if (BinaryArray.isBinaryArray(current)) {
      acc.push(...flat(current, levels));
    } else {
      acc.push(current);
    }
    return acc;
  }, []);

const abs = key => (key < 0 ? key * -1 : key);

const toArrayDeep = entity => {
  return BinaryArray.isBinaryArray(entity)
    ? entity
        .map(item =>
          BinaryArray.isBinaryArray(item)
            ? item.some(BinaryArray.isBinaryArray)
              ? toArrayDeep(item)
              : item.toArray()
            : item
        )
        .toArray()
    : entity;
};

export class BinaryArray {
  left = [undefined];
  right = [];

  constructor(initial = []) {
    this.init(initial);
  }

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

  get offsetLeft() {
    return (this.left.length - 1) * -1;
  }

  get offsetRight() {
    return this.right.length;
  }
  /**
   *  size = offset left - offset right - 1
   */
  get size() {
    return this.left.length + this.right.length - 1;
  }
  // alias for size
  get length() {
    return this.left.length + this.right.length - 1;
  }

  get first() {
    return this.get(0);
  }

  get last() {
    return this.get(this.length - 1);
  }

  get pivot() {
    return this.right[0];
  }

  _delete(key) {
    if (this.length === 1) {
      this.left = [undefined];
      this.right = [];
      return;
    }
    if (key === -1 && this.left.length > 0) this.left.length--;
    else if (key === 1 && this.right.length > 0) this.right.length--;
  }

  init(initial) {
    if (
      initial &&
      !Array.isArray(initial) &&
      typeof initial[Symbol.iterator] === 'function'
    ) {
      initial = [...initial];
    }
    if (this.length) this.clear();
    const half = Math.floor(initial.length / 2);
    for (let i = half - 1; i >= 0; i--) this._addToLeft(initial[i]);
    for (let i = half; i < initial.length; i++) this._addToRight(initial[i]);
  }

  with(...initial) {
    if (this.length) this.clear();
    const half = Math.floor(initial.length / 2);
    for (let i = half - 1; i >= 0; i--) this._addToLeft(initial[i]);
    for (let i = half; i < initial.length; i++) this._addToRight(initial[i]);
    return this;
  }
  /**
   *  index = |key + offset left|
   *  if (key + offset left >= 0) -> right [index]
   *  else ->  left [index]
   */
  get(key) {
    const offsetKey = key + this.offsetLeft;
    const index = abs(offsetKey);
    return offsetKey >= 0 ? this.right[index] : this.left[index];
  }

  clear() {
    this.right = [];
    this.left = [undefined];
  }

  _addToLeft(item) {
    this.left.push(item);
  }

  _addToRight(item) {
    this.right.push(item);
  }

  _removeFromLeft() {
    if (this.length) {
      this._delete(-1);
    }
  }

  _removeFromRight() {
    if (this.length) {
      this._delete(1);
    }
  }

  tail() {
    this._removeFromLeft();
    return this;
  }

  head() {
    this.removeFromRight();
    return this;
  }

  binaryIndex(index) {
    const key = index + this.offsetLeft;
    return key < 0 ? [key * -1, -1] : [key, 1];
  }

  set(key, value) {
    const [index, direction] = this.binaryIndex(key);
    return direction >= 0
      ? (this.right[index] = value)
      : (this.left[index] = value);
  }

  [Symbol.iterator] = function* () {
    for (let i = 0; i < this.length; i++) yield this.get(i);
  };

  toArray(deep) {
    return !deep ? [...this] : toArrayDeep(this);
  }

  at(index) {
    if (index < 0) {
      return this.get(this.length + index);
    } else {
      return this.get(index);
    }
  }

  push(...items) {
    for (let i = 0; i < items.length; i++) this._addToRight(items[i]);
    return this.length;
  }

  unshift(...items) {
    for (let i = items.length - 1; i >= 0; i--) this._addToLeft(items[i]);
    return this.length;
  }

  pop() {
    if (this.offsetRight === 0) {
      this.balance();
    }
    const last = this.last;
    this._removeFromRight();
    return last;
  }
  shift() {
    if (this.offsetLeft === 0) {
      this.balance();
    }
    const first = this.first;
    this._removeFromLeft();
    return first;
  }

  slice(start, end = this.length) {
    const collection = [];
    for (let i = start; i < end; i++) collection.push(this.get(i));
    return new BinaryArray(collection);
  }

  splice(start, deleteCount = 0, ...items) {
    const deleted = [];
    if (this.offsetLeft + start > 0) {
      const len = this.length - start - deleteCount;
      this.rotateRight(len);
      if (deleteCount > 0) {
        for (let i = 0; i < deleteCount; i++) {
          deleted.push(this.pop());
        }
      }
      this.push(...items);
      for (let i = 0; i < len; i++) {
        this.push(this.shift());
      }
    } else {
      this.rotateLeft(start);
      if (deleteCount > 0) {
        for (let i = 0; i < deleteCount; i++) {
          deleted.push(this.shift());
        }
      }
      this.unshift(...items);
      for (let i = 0; i < start; i++) {
        this.unshift(this.pop());
      }
    }
    return deleted;
  }

  indexOf(item) {
    for (let i = 0; i < this.length; i++) {
      if (this.get(i) === item) return i;
    }
    return -1;
  }

  lastIndexOf(item) {
    for (let i = this.length - 1; i >= 0; i--) {
      if (this.get(i) === item) return i;
    }
    return -1;
  }

  includes(val) {
    for (let i = 0; i < this.length; i++) {
      if (this.get(i) === val) return true;
    }
    return false;
  }

  find(callback) {
    for (let i = 0; i < this.length; i++) {
      const current = this.get(i);
      if (callback(current, i, this)) return current;
    }
  }

  some(callback) {
    for (let i = 0; i < this.length; i++) {
      if (callback(this.get(i), i, this)) return true;
    }
    return false;
  }

  every(callback) {
    for (let i = 0; i < this.length; i++) {
      if (!callback(this.get(i), i, this)) return false;
    }
    return true;
  }

  findIndex(callback) {
    for (let i = 0; i < this.length; i++) {
      const current = this.get(i);
      if (callback(current, i, this)) return i;
    }
    return -1;
  }

  map(callback) {
    const result = new BinaryArray();
    const half = Math.floor(this.length / 2);
    for (let i = half - 1; i >= 0; i--)
      result._addToLeft(callback(this.get(i), i, this));
    for (let i = half; i < this.length; i++)
      result._addToRight(callback(this.get(i), i, this));
    return result;
  }

  mapMut(callback) {
    for (let i = 0; i < this.length; i++)
      this.set(i, callback(this.get(i), i, this));
    return this;
  }

  forEach(callback) {
    for (let i = 0; i < this.length; i++) callback(this.get(i), i, this);
  }

  reduce(callback, initial) {
    for (let i = 0; i < this.length; i++) {
      initial = callback(initial, this.get(i), i, this);
    }
    return initial;
  }

  reduceRight(callback, initial) {
    for (let i = this.length - 1; i >= 0; i--) {
      initial = callback(initial, this.get(i), i, this);
    }
    return initial;
  }

  filter(callback) {
    const out = [];
    for (let i = 0; i < this.length; i++) {
      const current = this.get(i);
      const predicat = callback(current, i, this);
      if (predicat) out.push(current);
    }
    return new BinaryArray(out);
  }

  reverse() {
    if (this.length <= 2) {
      if (this.length === 1) {
        return this;
      }
      const temp = this.get(0);
      this.set(0, this.get(1));
      this.set(1, temp);
      return this;
    }

    const left = this.left;
    const right = this.right;
    right.unshift(left.shift());
    this.left = right;
    this.right = left;
    return this;
  }

  reverseCopy() {
    const copy = new BinaryArray(this);
    copy.reverse();
    return copy;
  }

  sort(callback) {
    return new BinaryArray(this.toArray().sort(callback));
  }

  join(separator = ',') {
    let output = '';
    for (let i = 0; i < this.length - 1; i++) output += this.get(i) + separator;
    output += this.get(this.length - 1);
    return output;
  }

  concat(second) {
    return new BinaryArray([...this, ...second]);
  }

  flat(levels = 1) {
    const flat =
      levels === Infinity
        ? collection => flatten(collection, levels, flat)
        : (collection, levels) => {
            levels--;
            return levels === -1
              ? collection
              : flatten(collection, levels, flat);
          };
    return new BinaryArray(flat(this, levels));
  }

  flatten(callback) {
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
    if (key >= this.length) {
      for (let i = this.length; i <= key; i++) {
        this._addToRight(undefined);
      }
    }
    const [index, direction] = this.binaryIndex(key);
    direction >= 0 ? (this.right[index] = value) : (this.left[index] = value);
    return this;
  }

  addAt(key, ...value) {
    if (this.offsetLeft + key > 0) {
      const len = this.length - key;
      this.rotateRight(len);
      this.push(...value);
      for (let i = 0; i < len; i++) {
        this.push(this.shift());
      }
    } else {
      this.rotateLeft(key);
      this.unshift(...value);
      for (let i = 0; i < key; i++) {
        this.unshift(this.pop());
      }
    }
    return this;
  }

  removeFrom(key, amount) {
    const len = this.length - key;
    amount = Math.min(len, amount);

    if (this.offsetLeft + key > 0) {
      this.rotateRight(len);
      for (let i = 0; i < amount; i++) {
        this.pop();
      }
      for (let i = 0; i < len; i++) {
        this.push(this.shift());
      }
    } else {
      this.rotateLeft(key);
      for (let i = 0; i < amount; i++) {
        this.shift();
      }
      for (let i = 0; i < key; i++) {
        this.unshift(this.pop());
      }
    }
    return this;
  }

  removeFromCopy(key, amount) {
    const copy = new BinaryArray(this);
    copy.removeFrom(key, amount);
    return copy;
  }

  rotateLeft(n = 1) {
    n = n % this.length;
    for (let i = 0; i < n; i++) {
      if (this.offsetLeft === 0) {
        this.balance();
      }
      this._addToRight(this.first);
      this._removeFromLeft();
    }
    return this;
  }

  rotateRight(n = 1) {
    n = n % this.length;
    for (let i = 0; i < n; i++) {
      if (this.offsetRight === 0) {
        this.balance();
      }
      this._addToLeft(this.last);
      this._removeFromRight();
    }
    return this;
  }

  rotate(n = 1, direction = 1) {
    return direction === 1 ? this.rotateRight(n) : this.rotateLeft(n);
  }

  rotateCopy(n = 1, direction = 1) {
    const copy = new BinaryArray(this);
    direction === 1 ? copy.rotateRight(n) : copy.rotateLeft(n);
    return copy;
  }

  compact() {
    return this.filter(Boolean);
  }

  union(b) {
    const a = this;
    const out = new BinaryArray();
    const A = new Set(a.toArray());
    const B = new Set(b.toArray());
    A.forEach(item => out.push(item));
    B.forEach(item => out.push(item));
    out.balance();
    return out;
  }

  symetricdifference(b) {
    const a = this;
    const out = new BinaryArray();
    const A = new Set(a.toArray());
    const B = new Set(b.toArray());
    B.forEach(item => {
      if (!A.has(item)) out.push(item);
    });
    A.forEach(item => {
      if (!B.has(item)) out.push(item);
    });
    out.balance();
    return out;
  }

  intersection(b) {
    const a = this;
    const out = new BinaryArray();
    const A = new Set(a.toArray());
    const B = new Set(b.toArray());
    B.forEach(item => {
      if (A.has(item)) out.push(item);
    });
    out.balance();
    return out;
  }

  difference(b) {
    const a = this;
    const out = new BinaryArray();
    const A = new Set(a.toArray());
    const B = new Set(b.toArray());
    A.forEach(item => {
      if (!B.has(item)) out.push(item);
    });
    out.balance();
    return out;
  }

  partition(groups = 1) {
    const res = this.reduce((acc, _, index, arr) => {
      if (index % groups === 0) {
        const part = new BinaryArray();
        for (let i = 0; i < groups; i++) {
          const current = arr.get(index + i);
          if (current !== undefined) part.push(current);
        }
        part.balance();
        acc.push(part);
      }
      return acc;
    }, new BinaryArray());
    res.balance();
    return res;
  }

  unique() {
    const set = new Set();
    return BinaryArray.from(
      this.reduce((acc, item) => {
        if (!set.has(item)) {
          set.add(item);
          acc.push(item);
        }
        return acc;
      }, [])
    );
  }

  duplicates() {
    const set = new Set();
    const extra = [];
    const out = this.reduce((acc, item) => {
      if (set.has(item)) {
        acc.push(item);
      } else {
        set.add(item);
      }
      return acc;
    }, []);

    out.forEach(item => {
      if (set.has(item)) {
        set.delete(item);
        extra.push(item);
      }
    });
    return BinaryArray.from(out.concat(extra));
  }

  scan(callback) {
    for (let i = 0; i < this.length; i++) callback(this.get(i), i, this);
    return this;
  }

  balance() {
    if (this.offsetRight + this.offsetLeft === 0) return this;
    const array = this.toArray();
    this.clear();
    this.init(array);
    return this;
  }
}
