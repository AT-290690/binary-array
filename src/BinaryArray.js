/**
 * Helper functions
 */

const flatten = (collection, levels, flat) =>
  collection.reduce((acc, current) => {
    if (BinaryArray.isBinaryArray(current)) acc.push(...flat(current, levels));
    else acc.push(current);
    return acc;
  }, []);

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

export default class BinaryArray {
  /**
   * Main methods
   */
  left = [undefined];
  right = [];

  get offsetLeft() {
    return (this.left.length - 1) * -1;
  }

  get offsetRight() {
    return this.right.length;
  }

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

  with(...initial) {
    const half = (initial.length / 2) | 0.5;
    for (let i = half - 1; i >= 0; i--) this.addToLeft(initial[i]);
    for (let i = half; i < initial.length; i++) this.addToRight(initial[i]);
    return this;
  }
  /**
   *  index = |offset + offset left|
   *  if (offset + offset left >= 0) -> right [index]
   *  else ->  left [index]
   */
  get(offset) {
    const offsetIndex = offset + this.offsetLeft;
    const index = offsetIndex < 0 ? offsetIndex * -1 : offsetIndex;
    return offsetIndex >= 0 ? this.right[index] : this.left[index];
  }

  index(index) {
    const key = index + this.offsetLeft;
    return key < 0 ? [key * -1, -1] : [key, 1];
  }

  set(key, value) {
    const [index, direction] = this.index(key);
    return direction >= 0
      ? (this.right[index] = value)
      : (this.left[index] = value);
  }

  clear() {
    this.left = [undefined];
    this.right = [];
  }

  addToLeft(item) {
    this.left.push(item);
  }

  addToRight(item) {
    this.right.push(item);
  }

  removeFromLeft() {
    if (this.length) {
      if (this.length === 1) this.clear();
      else if (this.left.length > 0) this.left.length--;
    }
  }

  removeFromRight() {
    if (this.length) {
      if (this.length === 1) this.clear();
      else if (this.right.length > 0) this.right.length--;
    }
  }

  [Symbol.iterator] = function* () {
    for (let i = 0; i < this.length; i++) yield this.get(i);
  };

  balance() {
    if (this.offsetRight + this.offsetLeft === 0) return this;
    const initial = [...this];
    this.clear();
    const half = (initial.length / 2) | 0.5;
    for (let i = half - 1; i >= 0; i--) this.addToLeft(initial[i]);
    for (let i = half; i < initial.length; i++) this.addToRight(initial[i]);
    return this;
  }

  /**
   * Array methods
   */

  static of(...items) {
    return BinaryArray.from(items);
  }

  static isBinaryArray(entity) {
    return entity instanceof BinaryArray;
  }

  static from(iterable) {
    if (iterable.length !== undefined) {
      const initial =
        iterable[0] !== undefined ? iterable : Array.from(iterable);
      return new BinaryArray().with(...initial);
    }
  }

  at(index) {
    if (index < 0) return this.get(this.length + index);
    else return this.get(index);
  }

  push(...items) {
    for (let i = 0; i < items.length; i++) this.addToRight(items[i]);
    return this.length;
  }

  unshift(...items) {
    for (let i = items.length - 1; i >= 0; i--) this.addToLeft(items[i]);
    return this.length;
  }

  pop() {
    if (this.offsetRight === 0) this.balance();
    const last = this.last;
    this.removeFromRight();
    return last;
  }

  shift() {
    if (this.offsetLeft === 0) this.balance();
    const first = this.first;
    this.removeFromLeft();
    return first;
  }

  slice(start, end = this.length) {
    const collection = [];
    for (let i = start; i < end; i++) collection.push(this.get(i));
    return BinaryArray.from(collection);
  }

  splice(start, deleteCount = 0, ...items) {
    const deleted = [];
    if (this.offsetLeft + start > 0) {
      const len = this.length - start - deleteCount;
      this.rotateRight(len);
      if (deleteCount > 0)
        for (let i = 0; i < deleteCount; i++) deleted.push(this.pop());

      this.append(...items);
      for (let i = 0; i < len; i++) this.append(this.shift());
    } else {
      this.rotateLeft(start);
      if (deleteCount > 0)
        for (let i = 0; i < deleteCount; i++) deleted.push(this.shift());
      this.unshift(...items);
      for (let i = 0; i < start; i++) this.unshift(this.pop());
    }
    return deleted;
  }

  indexOf(item) {
    for (let i = 0; i < this.length; i++) if (this.get(i) === item) return i;
    return -1;
  }

  lastIndexOf(item) {
    for (let i = this.length - 1; i >= 0; i--)
      if (this.get(i) === item) return i;
  }

  includes(val) {
    for (let i = 0; i < this.length; i++) if (this.get(i) === val) return true;
    return false;
  }

  find(callback) {
    for (let i = 0; i < this.length; i++) {
      const current = this.get(i);
      if (callback(current, i, this)) return current;
    }
  }

  some(callback) {
    for (let i = 0; i < this.length; i++)
      if (callback(this.get(i), i, this)) return true;
    return false;
  }

  every(callback) {
    for (let i = 0; i < this.length; i++)
      if (!callback(this.get(i), i, this)) return false;
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
    const half = (this.length / 2) | 0.5;
    for (let i = half - 1; i >= 0; i--)
      result.addToLeft(callback(this.get(i), i, this));
    for (let i = half; i < this.length; i++)
      result.addToRight(callback(this.get(i), i, this));
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
    for (let i = 0; i < this.length; i++)
      initial = callback(initial, this.get(i), i, this);
    return initial;
  }

  reduceRight(callback, initial) {
    for (let i = this.length - 1; i >= 0; i--)
      initial = callback(initial, this.get(i), i, this);
    return initial;
  }

  filter(callback) {
    const out = [];
    for (let i = 0; i < this.length; i++) {
      const current = this.get(i);
      const predicat = callback(current, i, this);
      if (predicat) out.push(current);
    }
    return BinaryArray.from(out);
  }

  reverse() {
    if (this.length <= 2) {
      if (this.length === 1) return this;
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
    const copy = BinaryArray.from(this);
    copy.reverse();
    return copy;
  }

  sort(callback) {
    return BinaryArray.from(this.toArray().sort(callback));
  }

  join(separator = ',') {
    let output = '';
    for (let i = 0; i < this.length - 1; i++) output += this.get(i) + separator;
    output += this.get(this.length - 1);
    return output;
  }

  concat(second) {
    return BinaryArray.from([...this, ...second]);
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
    return BinaryArray.from(flat(this, levels));
  }

  flatten(callback) {
    return BinaryArray.from(
      this.reduce((acc, current, index, self) => {
        if (BinaryArray.isBinaryArray(current))
          current.forEach(item => acc.push(callback(item)));
        else acc.push(callback(current, index, self));
        return acc;
      }, [])
    );
  }

  addTo(key, value) {
    if (key >= this.length)
      for (let i = this.length; i <= key; i++) this.addToRight(undefined);
    const [index, direction] = this.index(key);
    direction >= 0 ? (this.right[index] = value) : (this.left[index] = value);
    return this;
  }

  addAt(key, ...value) {
    if (this.offsetLeft + key > 0) {
      const len = this.length - key;
      this.rotateRight(len);
      this.append(...value);
      for (let i = 0; i < len; i++) this.append(this.shift());
    } else {
      this.rotateLeft(key);
      this.unshift(...value);
      for (let i = 0; i < key; i++) this.prepend(this.pop());
    }
    return this;
  }

  removeFrom(key, amount) {
    const len = this.length - key;
    amount = len < amount ? len : amount;

    if (this.offsetLeft + key > 0) {
      this.rotateRight(len);
      for (let i = 0; i < amount; i++) this.pop();
      for (let i = 0; i < len; i++) this.append(this.shift());
    } else {
      this.rotateLeft(key);
      for (let i = 0; i < amount; i++) this.shift();
      for (let i = 0; i < key; i++) this.prepend(this.pop());
    }
    return this;
  }

  removeFromCopy(key, amount) {
    const copy = BinaryArray.from(this);
    copy.removeFrom(key, amount);
    return copy;
  }

  /**
   * Extra methods
   */

  toArray(deep) {
    return !deep ? [...this] : toArrayDeep(this);
  }

  append(item) {
    this.addToRight(item);
    return this;
  }

  prepend(item) {
    this.addToLeft(item);
    return this;
  }

  head() {
    if (this.offsetRight === 0) this.balance();
    this.removeFromRight();
    return this;
  }

  tail() {
    if (this.offsetLeft === 0) this.balance();
    this.removeFromLeft();
    return this;
  }

  rotateLeft(n = 1) {
    n = n % this.length;
    for (let i = 0; i < n; i++) {
      if (this.offsetLeft === 0) this.balance();
      this.addToRight(this.first);
      this.removeFromLeft();
    }
    return this;
  }

  rotateRight(n = 1) {
    n = n % this.length;
    for (let i = 0; i < n; i++) {
      if (this.offsetRight === 0) this.balance();
      this.addToLeft(this.last);
      this.removeFromRight();
    }
    return this;
  }

  rotate(n = 1, direction = 1) {
    return direction === 1 ? this.rotateRight(n) : this.rotateLeft(n);
  }

  rotateCopy(n = 1, direction = 1) {
    const copy = BinaryArray.from(this);
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
    A.forEach(item => out.append(item));
    B.forEach(item => out.append(item));
    out.balance();
    return out;
  }

  symetricdifference(b) {
    const a = this;
    const out = new BinaryArray();
    const A = new Set(a.toArray());
    const B = new Set(b.toArray());
    B.forEach(item => !A.has(item) && out.append(item));
    A.forEach(item => !B.has(item) && out.append(item));
    out.balance();
    return out;
  }

  intersection(b) {
    const a = this;
    const out = new BinaryArray();
    const A = new Set(a.toArray());
    const B = new Set(b.toArray());
    B.forEach(item => A.has(item) && out.append(item));
    out.balance();
    return out;
  }

  difference(b) {
    const a = this;
    const out = new BinaryArray();
    const A = new Set(a.toArray());
    const B = new Set(b.toArray());
    A.forEach(item => !B.has(item) && out.append(item));
    out.balance();
    return out;
  }

  partition(groups = 1) {
    const res = this.reduce((acc, _, index, arr) => {
      if (index % groups === 0) {
        const part = new BinaryArray();
        for (let i = 0; i < groups; i++) {
          const current = arr.get(index + i);
          if (current !== undefined) part.append(current);
        }
        part.balance();
        acc.append(part);
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
      set.has(item) ? acc.push(item) : set.add(item);
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
}
