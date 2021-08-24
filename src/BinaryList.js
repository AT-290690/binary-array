export class BinaryList {
  offsetRight = 0;
  offsetLeft = 0;
  left = [];
  right = [];
  size = 0;
  constructor(initial = []) {
    this.init(initial);
  }

  _access(key) {
    const index = this.abs(key);
    return key >= 0 ? this.right[index] : this.left[index];
  }

  _add(key, value) {
    const index = this.abs(key);
    if (key >= 0) this.right[index] = value;
    else this.left[index] = value;
    this.size++;
  }

  _delete(key) {
    if (this.size === 1) {
      this.left = [];
      this.right = [];
      this.size = 0;
    }
    if (key < 0 && this.left.lenght > 0) this.left.length--;
    if (key >= 0 && this.right.lenght > 0) this.right.length--;
    this.size--;
  }

  abs(key) {
    return key < 0 ? key * -1 : key;
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

  get(index) {
    return this._access(index + this.offsetLeft);
  }

  clear() {
    this.right = [];
    this.left = [];
    this.size = 0;
    this.offsetLeft = 0;
    this.offsetRight = 0;
  }

  addToLeft(item) {
    this._add(--this.offsetLeft, item);
  }

  addToRight(item) {
    this._add(this.offsetRight++, item);
  }

  removeFromLeft() {
    this.size && this._delete(this.offsetLeft++);
  }

  removeFromRight() {
    this.size && this._delete(--this.offsetRight);
  }

  vectorIndexOf(index) {
    const key = index + this.offsetLeft;
    return key < 0 ? [key * -1, -1] : [key, 1];
  }

  set(key, value) {
    const [index, direction] = this.vectorIndexOf(key);
    return direction >= 0
      ? (this.right[index] = value)
      : (this.left[index] = value);
  }

  [Symbol.iterator] = function* () {
    for (let i = 0; i < this.size; i++) yield this.get(i);
  };

  toArray() {
    return [...this];
  }
}
