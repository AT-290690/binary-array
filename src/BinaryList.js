export class BinaryList {
  _offsetRight = 0;
  _offsetLeft = 0;
  vector = [[null, null]];
  size = 0;
  constructor(initial = []) {
    this.init(initial);
  }

  _access(key) {
    const index = this.abs(key);
    const current = this.vector[index];
    if (!current) return null;
    return key >= 0 ? current[1] : current[0];
  }

  _add(key, value) {
    const index = this.abs(key);
    if (!this.vector[index]) this.vector[index] = [null, null];
    const current = this.vector[index];
    if (key >= 0) current[1] = value;
    else current[0] = value;
    this.size++;
  }

  _delete(key) {
    const index = this.abs(key);
    const current = this.vector[index];
    if (!current) return null;
    if (this.size === 1) {
      this.vector = [[null, null]];
      this.size = 0;
    }
	
    if (key >= 0) {
      current[1] = null;
      const prev = this.vector[index - 1] || [null, null];
      if (
        current[0] === null &&
        current[1] === null &&
        prev[0] === null &&
        prev[1] === null
      ) {
        this.vector.length--;
      }
    }
    if (key < 0) {
      current[0] = null;
      const next = this.vector[index + 1] || [null, null];
      if (
        current[0] === null &&
        current[1] === null &&
        next[0] === null &&
        next[1] === null
      ) {
        this.vector.length--;
      }
    }
    this.size--;
  }

  abs(key) {
    return key < 0 ? key * -1 : key;
  }

  get size() {
    return this.size;
  }

  init(initial) {
    if (
      initial &&
      !Array.isArray(initial) &&
      typeof initial[Symbol.iterator] === 'function'
    ) {
      initial = [...initial];
    }
    if (this.size) this.clear();
    const half = Math.floor(initial.length / 2);
    for (let i = half - 1; i >= 0; i--) this.addToLeft(initial[i]);
    for (let i = half; i < initial.length; i++) this.addToRight(initial[i]);
  }

  get vector() {
    return this.vector;
  }

  get(index) {
    return this._access(index + this._offsetLeft);
  }

  get size() {
    return this.size;
  }

  clear() {
    this.vector = [[null, null]];
    this.size = 0;
    this._offsetLeft = 0;
    this._offsetRight = 0;
  }

  addToLeft(item) {
    this._add(--this._offsetLeft, item);
  }

  addToRight(item) {
    this.size && this._add(this._offsetRight++, item);
  }

  removeFromLeft() {
    this.size && this._delete(this._offsetLeft++);
  }

  removeFromRight() {
    this.size && this._delete(--this._offsetRight);
  }

  set(key, value) {
    const index = this.vectorIndexOf(key);
    return index[1] >= 0
      ? (this.vector[index[0]][1] = value)
      : (this.vector[index[0]][0] = value);
  }

  toArray() {
    const result = [];
    const vector = this.vector;
    for (let i = 0, len = vector.length; i < len; i++) {
      const values = vector[i];
      if (!values) continue;
      if (values[1] !== null) result[i - this._offsetLeft] = values[1];
      if (values[0] !== null) result[i * -1 - this._offsetLeft] = values[0];
    }
    return result;
  }
}
