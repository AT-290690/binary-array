const create = (...initial) => {
  const list = {
    offsetRight: 0,
    offsetLeft: 0,
    vector: [[null, null]],
    size: 0
  };
  list.thunk = () => list;
  list[Symbol.iterator] = function* () {
    for (let i = 0; i < this.size; i++) yield get(list, i);
  };
  if (initial.length) {
    const half = Math.floor(initial.length / 2);
    for (let i = half - 1; i >= 0; i--) addToLeft(list, initial[i]);
    for (let i = half; i < initial.length; i++) addToRight(list, initial[i]);
  }
  return list;
};
const pipe =
  (...fn) =>
  x =>
    fn.reduce((v, f) => f(v), x);
const abs = key => (key < 0 ? key * -1 : key);
const remove = (list, key) => {
  const index = abs(key);
  const current = list.vector[index];
  if (!current) return null;

  if (list.size === 1) {
    list.vector = [[null, null]];
    list.size = 0;
  }

  if (key < 0) current[0] = null;
  if (key >= 0) current[1] = null;
  const next = list.vector[index + 1] || [null, null];
  const prev = list.vector[index - 1] || [null, null];
  if (
    current[0] === null &&
    current[1] === null &&
    next[0] === null &&
    next[1] === null &&
    prev[0] === null &&
    prev[1] === null
  ) {
    list.vector.length--;
  }
  list.size--;
};
const add = (list, key, value) => {
  const index = abs(key);
  if (!list.vector[index]) list.vector[index] = [null, null];
  const current = list.vector[index];
  if (key >= 0) current[1] = value;
  else current[0] = value;
  list.size++;
};
const addToLeft = (list, value) => add(list, --list.offsetLeft, value);
const addToRight = (list, value) => add(list, list.offsetRight++, value);
const removeFromLeft = list => list.size && remove(list, list.offsetLeft++);
const removeFromRight = list => list.size && remove(list, --list.offsetRight);
const access = (list, key) => {
  const index = abs(key);
  const current = list.vector[index];
  if (!current) return null;
  return key >= 0 ? current[1] : current[0];
};
const vectorIndexOf = (list, index) => {
  const key = index + list.offsetLeft;
  return key < 0 ? [key * -1, -1] : [key, 1];
};
const get = (list, index) => access(list, index + list.offsetLeft);
const clear = list => {
  list.vector = [[null, null]];
  list.size = 0;
  list.offsetLeft = 0;
  list.offsetRight = 0;
};
const set = (list, key, value) => {
  const index = vectorIndexOf(list, key);
  return index[1] >= 0
    ? (list.vector[index[0]][1] = value)
    : (list.vector[index[0]][0] = value);
};
const first = list => get(list, 0);
const last = list => get(list, this.size - 1);
const pivot = list => list.vector[0][1];
const push =
  (...items) =>
  list => {
    for (let i = 0; i < items.length; i++) addToRight(list, items[i]);
    return list;
  };
const unshift =
  (...items) =>
  list => {
    for (let i = items.length - 1; i >= 0; i--) addToLeft(list, items[i]);
    return list;
  };
const pop = () => list => removeFromRight(list) && list;
const shift = () => list => removeFromLeft(list) && list;

const map = callback => list => {
  const result = create();
  const half = Math.floor(list.size / 2);
  for (let i = half - 1; i >= 0; i--)
    addToLeft(result, callback(get(list, i), i, list));
  for (let i = half; i < list.size; i++)
    addToRight(result, callback(get(list, i), i, list));
  return result;
};

const filter = callback => list => {
  const out = [];
  for (let i = 0; i < list.size; i++) {
    const current = get(list, i);
    const predicat = callback(current, i, list);
    if (predicat) out.push(current);
  }
  return create(...out);
};

export {
  create,
  remove,
  get,
  clear,
  set,
  first,
  last,
  pivot,
  push,
  pop,
  shift,
  unshift,
  map,
  filter,
  pipe
};
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

  slice(start, end = this.size) {
    const result = new BinaryArray();
    const half = Math.floor(end / 2);
    for (let i = half - 1; i >= start; i--) result.addToLeft(this.get(i));
    for (let i = half; i < end; i++) result.addToRight(this.get(i));
    return result;
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
        ? (collection, levels) => {
            return flatten(collection, levels);
          }
        : (collection, levels) => {
            levels--;
            return levels === -1 ? collection : flatten(collection, levels);
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

  balance() {
    if (this._offsetRight + this._offsetLeft === 0) return;
    const array = this.toArray();
    this.clear();
    return this.init(array);
  }
}

const curry =
  (fn, ...val) =>
  (...nxt) =>
    nxt.length ? curry(fn, ...val)(...nxt) : fn(...val);
