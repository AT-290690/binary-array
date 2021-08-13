import { BinaryListBalancer } from './BinaryListBalancer.js';

export class BinaryArrayBalancer extends BinaryListBalancer {
  static isBinaryArrayBalancer(entity) {
    return entity instanceof BinaryArrayBalancer;
  }

  static from(iterable) {
    if (iterable.length !== undefined) {
      const initial =
        iterable[0] !== undefined ? iterable : Array.from(iterable);
      return new BinaryArrayBalancer([...initial]);
    }
  }

  static of(...items) {
    return new BinaryArrayBalancer(items);
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
    for (let i = 0; i < items.length; i++) this.addToRightBalance(items[i]);
    return this.size;
  }

  unshift(...items) {
    for (let i = items.length - 1; i >= 0; i--) this.addToLeftBalance(items[i]);
    return this.size;
  }

  pop() {
    const last = this.last;
    this.removeFromRightBalance();
    return last;
  }

  shift() {
    const first = this.first;
    this.removeFromLeftBalance();
    return first;
  }

  slice(start, end = this.size) {
    const result = new BinaryArrayBalancer();
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

  map(callback) {
    const result = new BinaryArrayBalancer();
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
    return new BinaryArrayBalancer(out);
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
    return new BinaryArrayBalancer(this.toArray().sort(callback));
  }

  join(separator = ',') {
    let output = '';
    for (let i = 0; i < this.size; i++) output += this.get(i) + separator;
    return output;
  }

  concat(second) {
    return new BinaryArrayBalancer([...this.toArray(), ...second.toArray()]);
  }

  flat(levels = 1) {
    let flat;
    if (levels === Infinity) {
      flat = (collection, levels) => {
        return collection.reduce((acc, current) => {
          if (BinaryArrayBalancer.isBinaryArrayBalancer(current)) {
            acc.push(...flat(current.toArray(), levels));
          } else {
            acc.push(current);
          }
          return acc;
        }, []);
      };
    } else {
      flat = (collection, levels) => {
        levels--;
        return levels === -1
          ? collection
          : collection.reduce((acc, current) => {
              if (BinaryArrayBalancer.isBinaryArrayBalancer(current)) {
                acc.push(...flat(current.toArray(), levels));
              } else {
                acc.push(current);
              }
              return acc;
            }, []);
      };
    }
    return new BinaryArrayBalancer(flat(this, levels));
  }

  flatMap(callback) {
    return new BinaryArrayBalancer(
      this.reduce((acc, current, index, self) => {
        if (BinaryArrayBalancer.isBinaryArrayBalancer(current)) {
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
}
