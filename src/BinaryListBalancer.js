import { BinaryList } from './BinaryList.js';

export class BinaryListBalancer extends BinaryList {
  _balanceFactor = 2;
  _balanceDiff = 8;
  _prevSize = 0;
  constructor(initial) {
    super(initial);
  }
  setBalanceDiff(diff) {
    this._balanceDiff = diff;
  }
  _setBalanceFactor(factor) {
    this._balanceFactor = factor;
  }
  applyBalance() {
    this.setBalanceDiff(this._balanceDiff * this._balanceFactor);
    const array = this.toArray();
    this.clear();
    this.init(array);
    this._prevSize = this.size;
  }
  isOffBalance() {
    const isOff =
      Math.abs(this._offsetLeft + this._offsetRight) === this._balanceDiff;
    isOff && this._prevSize > this.size
      ? this._setBalanceFactor(0.5)
      : this._setBalanceFactor(2);
    return isOff;
  }
  addToRightBalance(item) {
    if (this.isOffBalance()) this.applyBalance();
    return this.addToRight(item);
  }
  removeFromRightBalance() {
    if (this.isOffBalance()) this.applyBalance();
    return this.removeFromRight();
  }
  addToLeftBalance(item) {
    if (this.isOffBalance()) this.applyBalance();
    return this.addToLeft(item);
  }
  removeFromLeftBalance() {
    if (this.isOffBalance()) this.applyBalance();
    return this.removeFromLeft();
  }
}
