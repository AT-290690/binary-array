export default class BinaryArray {
  left = [BinaryArray.negativeZeroEmptyValue]
  right = []

  get offsetLeft() {
    return (this.left.length - 1) * -1
  }

  get offsetRight() {
    return this.right.length
  }

  get length() {
    return this.left.length + this.right.length - 1
  }

  get first() {
    return this.get(0)
  }

  get last() {
    return this.get(this.length - 1)
  }

  get pivot() {
    return this.right[0]
  }

  with(...initial) {
    if (this.length) this.clear()
    const half = (initial.length / 2) | 0.5
    for (let i = half - 1; i >= 0; i--) this.addToLeft(initial[i])
    for (let i = half; i < initial.length; i++) this.addToRight(initial[i])
    return this
  }
  /**
   *  index = |offset + offset left|
   *  if (offset + offset left >= 0) -> right [index]
   *  else ->  left [index]
   */
  get(offset) {
    const offsetIndex = offset + this.offsetLeft
    const index = offsetIndex < 0 ? offsetIndex * -1 : offsetIndex
    return offsetIndex >= 0 ? this.right[index] : this.left[index]
  }

  set(index, value) {
    const offset = index + this.offsetLeft
    if (offset >= 0) this.right[offset] = value
    else this.left[offset * -1] = value
  }

  clear() {
    this.left = [BinaryArray.negativeZeroEmptyValue]
    this.right = []
  }

  addToLeft(item) {
    this.left.push(item)
  }

  addToRight(item) {
    this.right.push(item)
  }

  removeFromLeft() {
    if (this.length) {
      if (this.length === 1) this.clear()
      else if (this.left.length > 0) this.left.length--
    }
  }

  removeFromRight() {
    if (this.length) {
      if (this.length === 1) this.clear()
      else if (this.right.length > 0) this.right.length--
    }
  }

  [Symbol.iterator] = function* () {
    for (let i = 0; i < this.length; i++) yield this.get(i)
  }

  isBalanced() {
    return this.offsetRight + this.offsetLeft === 0
  }

  balance() {
    if (this.isBalanced()) return this
    const initial = [...this]
    this.clear()
    const half = (initial.length / 2) | 0.5
    for (let i = half - 1; i >= 0; i--) this.addToLeft(initial[i])
    for (let i = half; i < initial.length; i++) this.addToRight(initial[i])
    return this
  }
  static negativeZeroEmptyValue = -1
  /**
   * Array methods
   */

  static of(...items) {
    return BinaryArray.from(items)
  }

  static isBinaryArray(entity) {
    return entity instanceof BinaryArray
  }

  static from(iterable) {
    if (iterable.length !== undefined) {
      const initial =
        iterable[0] !== undefined ? iterable : Array.from(iterable)
      return new BinaryArray().with(...initial)
    }
  }

  at(index) {
    if (index < 0) return this.get(this.length + index)
    else return this.get(index)
  }

  push(...items) {
    for (let i = 0; i < items.length; i++) this.addToRight(items[i])
    return this.length
  }

  unshift(...items) {
    for (let i = items.length - 1; i >= 0; i--) this.addToLeft(items[i])
    return this.length
  }

  pop() {
    if (this.offsetRight === 0) this.balance()
    const last = this.last
    this.removeFromRight()
    return last
  }

  shift() {
    if (this.offsetLeft === 0) this.balance()
    const first = this.first
    this.removeFromLeft()
    return first
  }

  slice(start, end = this.length) {
    const collection = []
    for (let i = start; i < end; i++) collection.push(this.get(i))
    return BinaryArray.from(collection)
  }

  splice(start, deleteCount = 0, ...items) {
    const deleted = new BinaryArray()
    if (this.offsetLeft + start > 0) {
      const len = this.length - start - deleteCount
      this.rotateRight(len)
      if (deleteCount > 0)
        for (let i = 0; i < deleteCount; i++) deleted.push(this.pop())

      this.append(...items)
      for (let i = 0; i < len; i++) this.append(this.chop())
    } else {
      this.rotateLeft(start)
      if (deleteCount > 0)
        for (let i = 0; i < deleteCount; i++) deleted.push(this.chop())
      this.unshift(...items)
      for (let i = 0; i < start; i++) this.prepend(this.pop())
    }
    return deleted
  }

  indexOf(item) {
    for (let i = 0; i < this.length; i++) if (this.get(i) === item) return i
    return -1
  }

  lastIndexOf(item) {
    for (let i = this.length - 1; i >= 0; i--)
      if (this.get(i) === item) return i
  }

  includes(val, fromIndex = 0) {
    for (let i = fromIndex; i < this.length; i++)
      if (sameValueZero(this.get(i), val)) return true
    return false
  }

  find(callback) {
    for (let i = 0; i < this.length; i++) {
      const current = this.get(i)
      if (callback(current, i, this)) return current
    }
  }

  findLast(callback) {
    for (let i = this.length - 1; i >= 0; i--) {
      const current = this.get(i)
      if (callback(current, i, this)) return current
    }
  }

  some(callback) {
    for (let i = 0; i < this.length; i++)
      if (callback(this.get(i), i, this)) return true
    return false
  }

  every(callback) {
    for (let i = 0; i < this.length; i++)
      if (!callback(this.get(i), i, this)) return false
    return true
  }

  findIndex(callback) {
    for (let i = 0; i < this.length; i++) {
      const current = this.get(i)
      if (callback(current, i, this)) return i
    }
    return -1
  }

  findLastIndex(callback) {
    for (let i = this.length - 1; i >= 0; i--) {
      const current = this.get(i)
      if (callback(current, i, this)) return i
    }
    return -1
  }

  map(callback) {
    const result = new BinaryArray()
    const half = (this.length / 2) | 0.5
    for (let i = half - 1; i >= 0; i--)
      result.addToLeft(callback(this.get(i), i, this))
    for (let i = half; i < this.length; i++)
      result.addToRight(callback(this.get(i), i, this))
    return result
  }

  mapMut(callback) {
    for (let i = 0; i < this.length; i++)
      this.set(i, callback(this.get(i), i, this))
    return this
  }

  forEach(callback) {
    for (let i = 0; i < this.length; i++) callback(this.get(i), i, this)
  }

  reduce(callback, initial) {
    for (let i = 0; i < this.length; i++)
      initial = callback(initial, this.get(i), i, this)
    return initial
  }

  reduceRight(callback, initial) {
    for (let i = this.length - 1; i >= 0; i--)
      initial = callback(initial, this.get(i), i, this)
    return initial
  }

  filter(callback) {
    const out = []
    for (let i = 0; i < this.length; i++) {
      const current = this.get(i)
      const predicat = callback(current, i, this)
      if (predicat) out.push(current)
    }
    return BinaryArray.from(out)
  }

  reverse() {
    if (this.length <= 2) {
      if (this.length === 1) return this
      const temp = this.get(0)
      this.set(0, this.get(1))
      this.set(1, temp)
      return this
    }

    const left = this.left
    const right = this.right
    right.unshift(left.shift())
    this.left = right
    this.right = left
    return this
  }

  /**
   * The group method executes the callback function once for each index of the Binary Array,
   * returning a string (or value that can be coerced to a string) indicating the group of the element.
   * A new property and Binary Array is created in the result object for each unique group name
   * that is returned by the callback.
   * Each element is added to the Binary Array in the property that corresponds to its group.
   * @param callback - (item, index, arr )
   * @returns Object
   * @example
   * BinaryArray.with(1,2,3,4).group((item) => (item % 2 == 0 ? "even" : "odd")
   * // retunrs (this is array view)
   * {"odd":[1,3],"even":[2,4]}
   */
  group(callback) {
    const out = this.reduce((acc, item, index, arr) => {
      const key = callback(item, index, arr)
      if (acc.has(key)) acc.get(key).append(item)
      else acc.set(key, new BinaryArray(key).with(item))
      return acc
    }, new Group())
    out.forEach((item) => item.balance())
    return out
  }

  /**
   * perform merge sort - requires extra memory
   * @param callback - the condition of sorting
   * defaults to ascending
   * @example
   * (a, b) => (a < b ? -1 : 1)
   * */
  mergeSort(callback = (a, b) => (a < b ? -1 : 1)) {
    return mergeSort(this, callback)
  }
  /**
   * perform quick sort - requires extra memory
   * @param order - the order of sorting
   * defaults to ascending
   * @example
   * arr.quickSort('asc')
   * arr.quickSort('des')
   * */
  quickSort(order) {
    return order === 'des'
      ? quickSortDesc(this, 0, this.length - 1)
      : quickSortAsc(this, 0, this.length - 1)
  }

  join(separator = ',') {
    let output = ''
    for (let i = 0; i < this.length - 1; i++) output += this.get(i) + separator
    output += this.get(this.length - 1)
    return output
  }

  concat(second) {
    return BinaryArray.from([...this, ...second])
  }

  flat(levels = 1) {
    const flat =
      levels === Infinity
        ? (collection) => flatten(collection, levels, flat)
        : (collection, levels) => {
            levels--
            return levels === -1
              ? collection
              : flatten(collection, levels, flat)
          }
    return BinaryArray.from(flat(this, levels))
  }

  flatten(callback) {
    return BinaryArray.from(
      this.reduce((acc, current, index, self) => {
        if (BinaryArray.isBinaryArray(current))
          current.forEach((item) => acc.push(callback(item)))
        else acc.push(callback(current, index, self))
        return acc
      }, [])
    )
  }

  addTo(index, value) {
    if (index >= this.length)
      for (let i = this.length; i <= index; i++) this.addToRight(undefined)
    const offset = index + this.offsetLeft
    if (offset >= 0) this.right[offset] = value
    else this.left[offset * -1] = value
    return this
  }

  addAt(key, ...value) {
    if (this.offsetLeft + key > 0) {
      const len = this.length - key
      this.rotateRight(len)
      this.append(...value)
      for (let i = 0; i < len; i++) this.append(this.shift())
    } else {
      this.rotateLeft(key)
      this.unshift(...value)
      for (let i = 0; i < key; i++) this.prepend(this.pop())
    }
    return this
  }

  removeFrom(key, amount) {
    const len = this.length - key
    amount = len < amount ? len : amount
    if (this.offsetLeft + key > 0) {
      this.rotateRight(len)
      for (let i = 0; i < amount; i++) this.cut()
      for (let i = 0; i < len; i++) this.append(this.chop())
    } else {
      this.rotateLeft(key)
      for (let i = 0; i < amount; i++) this.chop()
      for (let i = 0; i < key; i++) this.prepend(this.cut())
    }
    return this
  }

  toArray(deep) {
    return !deep ? [...this] : toArrayDeep(this)
  }

  append(item) {
    this.addToRight(item)
    return this
  }

  prepend(item) {
    this.addToLeft(item)
    return this
  }

  cut() {
    if (this.offsetRight === 0) this.balance()
    const last = this.last
    this.removeFromRight()
    return last
  }

  chop() {
    if (this.offsetLeft === 0) this.balance()
    const first = this.first
    this.removeFromLeft()
    return first
  }

  head() {
    if (this.offsetRight === 0) this.balance()
    this.removeFromRight()
    return this
  }

  tail() {
    if (this.offsetLeft === 0) this.balance()
    this.removeFromLeft()
    return this
  }

  rotateLeft(n = 1) {
    n = n % this.length
    for (let i = 0; i < n; i++) {
      if (this.offsetLeft === 0) this.balance()
      this.addToRight(this.first)
      this.removeFromLeft()
    }
    return this
  }

  rotateRight(n = 1) {
    n = n % this.length
    for (let i = 0; i < n; i++) {
      if (this.offsetRight === 0) this.balance()
      this.addToLeft(this.last)
      this.removeFromRight()
    }
    return this
  }

  rotate(n = 1, direction = 1) {
    return direction === 1 ? this.rotateRight(n) : this.rotateLeft(n)
  }

  // Creates an array excluding all given values using SameValueZero for equality comparisons.
  without(...excludes) {
    return this.filter(
      (item) => !excludes.some((exclude) => sameValueZero(item, exclude))
    )
  }

  compact() {
    return this.filter(Boolean)
  }

  union(b) {
    const a = this
    const out = new BinaryArray()
    const A = new Set(a.toArray())
    const B = new Set(b.toArray())
    A.forEach((item) => out.append(item))
    B.forEach((item) => out.append(item))
    out.balance()
    return out
  }

  symetricdifference(b) {
    const a = this
    const out = new BinaryArray()
    const A = new Set(a.toArray())
    const B = new Set(b.toArray())
    B.forEach((item) => !A.has(item) && out.append(item))
    A.forEach((item) => !B.has(item) && out.append(item))
    out.balance()
    return out
  }

  intersection(b) {
    const a = this
    const out = new BinaryArray()
    const A = new Set(a.toArray())
    const B = new Set(b.toArray())
    B.forEach((item) => A.has(item) && out.append(item))
    out.balance()
    return out
  }

  difference(b) {
    const a = this
    const out = new BinaryArray()
    const A = new Set(a.toArray())
    const B = new Set(b.toArray())
    A.forEach((item) => !B.has(item) && out.append(item))
    out.balance()
    return out
  }

  partition(groups = 1) {
    const res = this.reduce((acc, _, index, arr) => {
      if (index % groups === 0) {
        const part = new BinaryArray()
        for (let i = 0; i < groups; i++) {
          const current = arr.get(index + i)
          if (current !== undefined) part.append(current)
        }
        part.balance()
        acc.append(part)
      }
      return acc
    }, new BinaryArray())
    res.balance()
    return res
  }

  unique() {
    const set = new Set()
    return BinaryArray.from(
      this.reduce((acc, item) => {
        if (!set.has(item)) {
          set.add(item)
          acc.push(item)
        }
        return acc
      }, [])
    )
  }

  duplicates() {
    const set = new Set()
    const extra = []
    const out = this.reduce((acc, item) => {
      set.has(item) ? acc.push(item) : set.add(item)
      return acc
    }, [])

    out.forEach((item) => {
      if (set.has(item)) {
        set.delete(item)
        extra.push(item)
      }
    })
    return BinaryArray.from(out.concat(extra))
  }

  swap(i1, i2) {
    const temp = this.get(i1)
    this.set(i1, this.get(i2))
    this.set(i2, temp)
    return this
  }

  copy() {
    return BinaryArray.from([...this])
  }

  scan(callback) {
    for (let i = 0; i < this.length; i++) callback(this.get(i), i, this)
    return this
  }

  /**
   * @param order
   * check if the array is sorted
   * defaults to scending
   * if a function is provided it will use it instead
   * the default signature is
   * @example
   * (current, index, arr) => !index || arr.at(index - 1) <= current
   * @returns boolean
   */
  isSorted(order = 'asc') {
    return this.every(
      typeof order === 'function'
        ? order
        : order
        ? (current, index, arr) => !index || arr.at(index - 1) <= current
        : (current, index, arr) => !index || arr.at(index - 1) >= current
    )
  }
  /**
   * perform binary search queries in the array
   * requires the array to be sorted first!
   * @param target
   * @param identity
   * @example
   * (current) => current.key
   * */
  search(target, identity = (current) => current) {
    return binarySearch(this, target, identity, 0, this.length)
  }
}

/**  Helper functions */
/** 
  If Type(x) is different from Type(y), return false.
  If Type(x) is Number, then
  If x is NaN and y is NaN, return true.
  If x is +0 and y is -0, return true.
  If x is -0 and y is +0, return true.
  If x is the same Number value as y, return true.
  Return false.
  Return SameValueNonNumber(x, y).
*/
const sameValueZero = (x, y) => x === y || (Number.isNaN(x) && Number.isNaN(y))

const flatten = (collection, levels, flat) =>
  collection.reduce((acc, current) => {
    if (BinaryArray.isBinaryArray(current)) acc.push(...flat(current, levels))
    else acc.push(current)
    return acc
  }, [])

const toArrayDeep = (entity) => {
  return BinaryArray.isBinaryArray(entity)
    ? entity
        .map((item) =>
          BinaryArray.isBinaryArray(item)
            ? item.some(BinaryArray.isBinaryArray)
              ? toArrayDeep(item)
              : item.toArray()
            : item
        )
        .toArray()
    : entity
}

const quickSortAsc = (items, left, right) => {
  if (items.length > 1) {
    let pivot = items.get(((right + left) / 2) | 0.5),
      i = left,
      j = right
    while (i <= j) {
      while (items.get(i) < pivot) i++
      while (items.get(j) > pivot) j--
      if (i <= j) {
        items.swap(i, j)
        i++
        j--
      }
    }
    if (left < i - 1) quickSortAsc(items, left, i - 1) //more elements on the left side of the pivot
    if (i < right) quickSortAsc(items, i, right) //more elements on the right side of the pivot
  }
  return items
}
const quickSortDesc = (items, left, right) => {
  if (items.length > 1) {
    let pivot = items.get(((right + left) / 2) | 0.5),
      i = left,
      j = right
    while (i <= j) {
      while (items.get(i) > pivot) i++
      while (items.get(j) < pivot) j--
      if (i <= j) {
        items.swap(i, j)
        i++
        j--
      }
    }
    if (left < i - 1) quickSortDesc(items, left, i - 1) //more elements on the left side of the pivot
    if (i < right) quickSortDesc(items, i, right) //more elements on the right side of the pivot
  }
  return items
}

const merge = (left, right, callback) => {
  const arr = []
  while (left.length && right.length) {
    callback(right.at(0), left.at(0)) > 0
      ? arr.push(left.chop())
      : arr.push(right.chop())
  }

  for (let i = 0; i < left.length; i++) {
    arr.push(left.get(i))
  }
  for (let i = 0; i < right.length; i++) {
    arr.push(right.get(i))
  }
  const out = new BinaryArray()
  const half = (arr.length / 2) | 0.5
  for (let i = half - 1; i >= 0; i--) out.addToLeft(arr[i])
  for (let i = half; i < arr.length; i++) out.addToRight(arr[i])
  return out
}

const mergeSort = (array, callback) => {
  const half = (array.length / 2) | 0.5
  if (array.length < 2) {
    return array
  }
  const left = array.splice(0, half)
  return merge(mergeSort(left, callback), mergeSort(array, callback), callback)
}

const binarySearch = (arr, target, by, start, end) => {
  const index = ((end - start) / 2 + start) | 0.5
  const current = arr.at(index)
  if (current === undefined) return undefined
  const identity = by(current)
  const is = identity === target
  if (is) return current
  if (end < start && !is) return undefined
  else {
    if (identity > target)
      return binarySearch(arr, target, by, start, index - 1)
    else return binarySearch(arr, target, by, index + 1, end)
  }
}

class Group {
  constructor() {
    this.items = {}
  }
  get(key) {
    return this.items[key]
  }
  set(key, value) {
    this.items[key] = value
    return this
  }
  get values() {
    return Object.values(this.items)
  }
  get keys() {
    return Object.keys(this.items)
  }
  has(key) {
    return key in this.items
  }
  forEntries(callback) {
    for (let key in this.items) {
      callback([key, this.items[key]], this.items)
    }
    return this
  }
  forEach(callback) {
    for (let key in this.items) {
      callback(this.items[key], key)
    }
    return this
  }
  map(callback) {
    for (let key in this.items) {
      this.items[key] = callback(this.items[key], key, this.items)
    }
    return this
  }
}
