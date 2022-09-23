export default class Binar {
  #left = [Binar.#negativeZeroEmptyValue]
  #right = []

  get offsetLeft() {
    return (this.#left.length - 1) * -1
  }

  get offsetRight() {
    return this.#right.length
  }

  get length() {
    return this.#left.length + this.#right.length - 1
  }

  get first() {
    return this.get(0)
  }

  get last() {
    return this.get(this.length - 1)
  }

  get items() {
    return toArrayDeep(this)
  }

  with(...initial) {
    if (this.length) this.clear()
    const half = (initial.length / 2) | 0.5
    for (let i = half - 1; i >= 0; i -= 1) this.#addToLeft(initial[i])
    for (let i = half; i < initial.length; i += 1) this.#addToRight(initial[i])
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
    return offsetIndex >= 0 ? this.#right[index] : this.#left[index]
  }

  set(index, value) {
    const offset = index + this.offsetLeft
    if (offset >= 0) this.#right[offset] = value
    else this.#left[offset * -1] = value
  }

  clear() {
    this.#left = [Binar.#negativeZeroEmptyValue]
    this.#right = []
  }

  #addToLeft(item) {
    this.#left.push(item)
  }

  #addToRight(item) {
    this.#right.push(item)
  }

  #removeFromLeft() {
    if (this.length) {
      if (this.length === 1) this.clear()
      else if (this.#left.length > 0) this.#left.length -= 1
    }
  }

  #removeFromRight() {
    if (this.length) {
      if (this.length === 1) this.clear()
      else if (this.#right.length > 0) this.#right.length -= 1
    }
  }

  [Symbol.iterator] = function* () {
    for (let i = 0, len = this.length; i < len; i += 1) yield this.get(i)
  }

  isBalanced() {
    return this.offsetRight + this.offsetLeft === 0
  }

  balance() {
    if (this.isBalanced()) return this
    const initial = [...this]
    this.clear()
    const half = (initial.length / 2) | 0.5
    for (let i = half - 1; i >= 0; i -= 1) this.#addToLeft(initial[i])
    for (let i = half; i < initial.length; i += 1) this.#addToRight(initial[i])
    return this
  }
  /**
   * NegativeZeroEmptyValue is the first left index
   * It is never used.
   * It stays there as an offset
   * Indexing is calculated (offset + offset left)
   * where positive results are indexing the right branch
   * and negative are indexing the left branch
   * index 2 is the third item of branch right
   * index -2 is the third item of branch left
   * When zero index is calculated to be 0 then
   * the item is the first element of the right branch
   * The left branch will have an unreachable value
   * @example
   * // Regular Array View
   * [1, 2, 3, 4, 5, 6]
   * // The above as Binary Array
   * [-1, 3, 2, 1] // left
   *   0  1  2  3  // indexes
   * [ 4, 5. 6, 7] // right
   */
  static #negativeZeroEmptyValue = -1

  static of(...items) {
    return Binar.from(items)
  }

  static isBinaryArray(entity) {
    return entity instanceof Binar
  }

  static from(iterable) {
    if (!isIterable(iterable))
      throw new Error(
        'TypeError: From input is not iterable (cannot read property '
      )
    const out = new Binar()
    const half = (iterable.length / 2) | 0.5
    for (let i = half - 1; i >= 0; i -= 1) out.#addToLeft(iterable[i])
    for (let i = half; i < iterable.length; i += 1) out.#addToRight(iterable[i])
    return out
  }

  static matrix(...dimensions) {
    return toMatrix(...dimensions)
  }

  at(index) {
    if (index < 0) return this.get(this.length + index)
    else return this.get(index)
  }

  push(...items) {
    for (let i = 0; i < items.length; i += 1) this.#addToRight(items[i])
    return this.length
  }

  unshift(...items) {
    for (let i = items.length - 1; i >= 0; i -= 1) this.#addToLeft(items[i])
    return this.length
  }

  pop() {
    if (this.offsetRight === 0) this.balance()
    const last = this.last
    this.#removeFromRight()
    return last
  }

  shift() {
    if (this.offsetLeft === 0) this.balance()
    const first = this.first
    this.#removeFromLeft()
    return first
  }
  /**
   * Returns a copy of a section of an array. For both start and end,
   * a negative index can be used to indicate an offset from the end of the array. For example,
   * -2 refers to the second to last element of the array.
   * @param start
   * The beginning index of the specified portion of the array.
   * If start is undefined, then the slice begins at index 0.
   * @param end
   * The end index of the specified portion of the array.
   * This is exclusive of the element at the index 'end'.
   * If end is undefined, then the slice extends to the end of the array.
   */
  slice(start, end = this.length) {
    const collection = []
    for (let i = start; i < end; i += 1) collection.push(this.get(i))
    return Binar.from(collection)
  }
  /**
   * Removes elements from an array and,
   * if necessary, inserts new elements in their place,
   * returning the deleted elements.
   * @param start — The zero-based location in the array from which to start removing elements.
   * @param deleteCount — The number of elements to remove.
   * @returns — An array containing the elements that were deleted.
   */
  splice(dir, deleteCount, ...items) {
    const start = Math.abs(dir)
    deleteCount = deleteCount ?? this.length - start
    const deleted = new Binar()
    if (this.offsetLeft + start > 0) {
      const len = this.length - start - deleteCount
      this.rotateRight(len)
      if (deleteCount > 0)
        for (let i = 0; i < deleteCount; i += 1) deleted.push(this.cut())
      dir < 0 ? this.unshift(...items) : this.push(...items)
      for (let i = 0; i < len; i += 1) this.append(this.chop())
    } else {
      this.rotateLeft(start)
      if (deleteCount > 0)
        for (let i = 0; i < deleteCount; i += 1) deleted.push(this.chop())
      dir < 0 ? this.push(...items) : this.unshift(...items)
      for (let i = 0; i < start; i += 1) this.prepend(this.cut())
    }
    return deleted
  }
  /**
   * Returns the index of the first occurrence of a value in an array,
   * or -1 if it is not present.
   * @param searchElement — The value to locate in the array.
   * @param fromIndex — The array index at which to begin the search.
   * If fromIndex is omitted, the search starts at index 0.
   */
  indexOf(item) {
    for (let i = 0, len = this.length; i < len; i += 1)
      if (this.get(i) === item) return i
    return -1
  }
  /**
   * Returns the index of the last occurrence of a specified value in an array,
   * or -1 if it is not present.
   * @param searchElement — The value to locate in the array.
   * @param fromIndex — The array index at which to begin searching backward.
   * If fromIndex is omitted, the search starts at the last index in the array.
   */
  lastIndexOf(item) {
    for (let i = this.length - 1; i >= 0; i -= 1)
      if (this.get(i) === item) return i
  }

  includes(val, fromIndex = 0) {
    for (let i = fromIndex, len = this.length; i < len; i += 1)
      if (sameValueZero(this.get(i), val)) return true
    return false
  }
  /**
   * Returns the value of the first element in the array where predicate is true, and undefined otherwise.
   * @param predicate
   * find calls predicate once for each element of the array, in ascending order, until it finds one where predicate returns true. If such an element is found, find immediately returns that element value. Otherwise, find returns undefined.
   * @param thisArg
   * If provided, it will be used as the this value for each invocation of predicate. If it is not provided, undefined is used instead.
   */
  find(callback) {
    for (let i = 0, len = this.length; i < len; i += 1) {
      const current = this.get(i)
      if (callback(current, i, this)) return current
    }
  }

  findLast(callback) {
    for (let i = this.length - 1; i >= 0; i -= 1) {
      const current = this.get(i)
      if (callback(current, i, this)) return current
    }
  }
  /**
   * Determines whether the specified callback function returns true for any element of an array.
   * @param predicate
   * A function that accepts up to three arguments.
   * The some method calls the predicate function for each element in the array
   * until the predicate returns a value which is coercible to the Boolean value true,
   * or until the end of the array.
   * @param thisArg
   * An object to which the this keyword can refer in the predicate function.
   * If thisArg is omitted, undefined is used as the this value.
   */
  some(callback) {
    for (let i = 0, len = this.length; i < len; i += 1)
      if (callback(this.get(i), i, this)) return true
    return false
  }
  /**
   * Determines whether all the members of an array satisfy the specified test.
   * @param predicate
   * A function that accepts up to three arguments. The every method calls the predicate function for each element in the array until the predicate returns a value which is coercible to the Boolean value false, or until the end of the array.
   * @param thisArg
   * An object to which the this keyword can refer in the predicate function. If thisArg is omitted, undefined is used as the this value.
   */
  every(callback) {
    for (let i = 0, len = this.length; i < len; i += 1)
      if (!callback(this.get(i), i, this)) return false
    return true
  }

  findIndex(callback) {
    for (let i = 0, len = this.length; i < len; i += 1) {
      const current = this.get(i)
      if (callback(current, i, this)) return i
    }
    return -1
  }

  findLastIndex(callback) {
    for (let i = this.length - 1; i >= 0; i -= 1) {
      const current = this.get(i)
      if (callback(current, i, this)) return i
    }
    return -1
  }
  /**
   * Calls a defined callback function on each element of an array,
   * and returns an array that contains the results.
   * @param callbackfn — A function that accepts up to three arguments.
   * The map method calls the callbackfn function one time for each element in the array.
   * @param thisArg — An object to which the this keyword can refer in the callbackfn function.
   * If thisArg is omitted, undefined is used as the this value.
   */
  map(callback) {
    const result = new Binar()
    const half = (this.length / 2) | 0.5
    for (let i = half - 1; i >= 0; i -= 1)
      result.#addToLeft(callback(this.get(i), i, this))
    for (let i = half, len = this.length; i < len; i += 1)
      result.#addToRight(callback(this.get(i), i, this))
    return result
  }

  mapMut(callback) {
    for (let i = 0, len = this.length; i < len; i += 1)
      this.set(i, callback(this.get(i), i, this))
    return this
  }

  forEach(callback) {
    for (let i = 0, len = this.length; i < len; i += 1)
      callback(this.get(i), i, this)
  }
  /**
   * Calls the specified callback function for all the elements in an array.
   * The return value of the callback function is the accumulated result,
   * and is provided as an argument in the next call to the callback function.
   * @param callbackfn — A function that accepts up to four arguments.
   * The reduce method calls the callbackfn function one time for each element in the array.
   * @param initialValue — If initialValue is specified,
   * it is used as the initial value to start the accumulation.
   * The first call to the callbackfn function provides this value as an argument
   * instead of an array value.
   */
  reduce(callback, initial) {
    for (let i = 0, len = this.length; i < len; i += 1)
      initial = callback(initial, this.get(i), i, this)
    return initial
  }

  reduceRight(callback, initial) {
    for (let i = this.length - 1; i >= 0; i -= 1)
      initial = callback(initial, this.get(i), i, this)
    return initial
  }
  /**
   * Returns the elements of an array that meet the condition specified in a callback function.
   * @param predicate — A function that accepts up to three arguments.
   * The filter method calls the predicate function one time for each element in the array.
   * @param thisArg — An object to which the this keyword can refer in the predicate function.
   * If thisArg is omitted, undefined is used as the this value.
   */
  filter(callback) {
    const out = []
    for (let i = 0, len = this.length; i < len; i += 1) {
      const current = this.get(i)
      const predicat = callback(current, i, this)
      if (predicat) out.push(current)
    }
    return Binar.from(out)
  }
  /**
   * Reverses the elements in an array in place.
   * This method mutates the array and returns a reference to the same array.
   */
  reverse() {
    if (this.length <= 2) {
      if (this.length === 1) return this
      const temp = this.get(0)
      this.set(0, this.get(1))
      this.set(1, temp)
      return this
    }

    const left = this.#left
    const right = this.#right
    right.unshift(left.shift())
    this.#left = right
    this.#right = left
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
   * Binar.with(1,2,3,4).group((item) => (item % 2 == 0 ? "even" : "odd")
   * // retunrs (this is array view)
   * {"odd":[1,3],"even":[2,4]}
   */
  group(callback) {
    const out = this.reduce((acc, item, index, arr) => {
      const key = callback(item, index, arr)
      if (acc.has(key)) acc.get(key).append(item)
      else acc.set(key, new Binar(key).with(item))
      return acc
    }, new Group())
    out.forEach(item => item.balance())
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
    for (let i = 0, len = this.length; i < len - 1; i += 1)
      output += this.get(i) + separator
    output += this.get(this.length - 1)
    return output
  }

  concat(second) {
    return Binar.from([...this, ...second])
  }
  /**
   * Returns a new array with all sub-array elements concatenated
   * into it recursively up to the specified depth.
   * @param depth — The maximum recursion depth
   */
  flat(levels = 1) {
    const flat =
      levels === Infinity
        ? tailCallOptimisedRecursion(collection =>
            flatten(collection, levels, flat)
          )
        : tailCallOptimisedRecursion((collection, levels) => {
            levels -= 1
            return levels === -1
              ? collection
              : flatten(collection, levels, flat)
          })
    return Binar.from(flat(this, levels))
  }

  flatten(callback) {
    return Binar.from(
      this.reduce((acc, current, index, self) => {
        if (Binar.isBinaryArray(current))
          current.forEach(item => acc.push(callback(item)))
        else acc.push(callback(current, index, self))
        return acc
      }, [])
    )
  }

  addTo(index, value) {
    if (index >= this.length)
      for (let i = this.length; i <= index; i += 1) this.#addToRight(undefined)
    const offset = index + this.offsetLeft
    if (offset >= 0) this.#right[offset] = value
    else this.#left[offset * -1] = value
    return this
  }

  addAt(key, ...value) {
    if (this.offsetLeft + key > 0) {
      const len = this.length - key
      this.rotateRight(len)
      this.push(...value)
      for (let i = 0; i < len; i += 1) this.append(this.shift())
    } else {
      this.rotateLeft(key)
      this.unshift(...value)
      for (let i = 0; i < key; i += 1) this.prepend(this.pop())
    }
    return this
  }

  removeFrom(key, amount) {
    const len = this.length - key
    amount = len < amount ? len : amount
    if (this.offsetLeft + key > 0) {
      this.rotateRight(len)
      for (let i = 0; i < amount; i += 1) this.cut()
      for (let i = 0; i < len; i += 1) this.append(this.chop())
    } else {
      this.rotateLeft(key)
      for (let i = 0; i < amount; i += 1) this.chop()
      for (let i = 0; i < key; i += 1) this.prepend(this.cut())
    }
    return this
  }

  toArray(deep) {
    return !deep ? [...this] : toArrayDeep(this)
  }

  append(item) {
    this.#addToRight(item)
    return this
  }

  prepend(item) {
    this.#addToLeft(item)
    return this
  }
  /**
   * Remove the last element
   * @returns the removed element
   */
  cut() {
    if (this.offsetRight === 0) this.balance()
    const last = this.last
    this.#removeFromRight()
    return last
  }
  /**
   * Remove the first element
   * @returns the removed element
   */
  chop() {
    if (this.offsetLeft === 0) this.balance()
    const first = this.first
    this.#removeFromLeft()
    return first
  }

  head() {
    if (this.offsetRight === 0) this.balance()
    this.#removeFromRight()
    return this
  }

  tail() {
    if (this.offsetLeft === 0) this.balance()
    this.#removeFromLeft()
    return this
  }

  insertRight(...items) {
    for (let i = 0; i < items.length; i += 1) this.#addToRight(items[i])
    return this
  }

  insertLeft(...items) {
    for (let i = items.length - 1; i >= 0; i -= 1) this.#addToLeft(items[i])
    return this
  }

  /**
   * Creates a slice of array with n elements taken from the beginning.
   * @params
    array (Array): The array to query.
    [n=1] (number): The number of elements to take.
    @returns
    (Array): Returns the slice of array.
    @example 
    [1, 2, 3].take() // => [1]
    [1, 2, 3].take(2) // => [1, 2]
    [1, 2, 3].take(5) // => [1, 2, 3]
    [1, 2, 3].take(0); // => []
   */
  take(n = 1) {
    const collection = []
    const len = Math.min(n, this.length)
    for (let i = 0; i < len; i += 1) collection.push(this.get(i))
    return Binar.from(collection)
  }
  /**
   * Creates a slice of array with n elements taken from the end.
   */
  takeRight(n = 1) {
    const collection = []
    const length = this.length
    const len = Math.min(n, length)
    for (let i = 0; i < len; i += 1)
      collection.push(this.get(length - (len - i)))
    return Binar.from(collection)
  }

  to(callback, initial = new Binar()) {
    for (let i = 0, len = this.length; i < len; i += 1)
      initial = callback(initial, this.get(i), i, this)
    return initial
  }

  rotateLeft(n = 1) {
    n = n % this.length
    for (let i = 0; i < n; i += 1) {
      if (this.offsetLeft === 0) this.balance()
      this.#addToRight(this.first)
      this.#removeFromLeft()
    }
    return this
  }

  rotateRight(n = 1) {
    n = n % this.length
    for (let i = 0; i < n; i += 1) {
      if (this.offsetRight === 0) this.balance()
      this.#addToLeft(this.last)
      this.#removeFromRight()
    }
    return this
  }

  rotate(n = 1, direction = 1) {
    return direction === 1 ? this.rotateRight(n) : this.rotateLeft(n)
  }

  // Creates an array excluding all given values using SameValueZero for equality comparisons.
  without(...excludes) {
    return this.filter(
      item => !excludes.some(exclude => sameValueZero(item, exclude))
    )
  }

  compact() {
    return this.filter(Boolean)
  }

  union(b) {
    const a = this
    const out = new Binar()
    const A = new Set(a.toArray())
    const B = new Set(b.toArray())
    A.forEach(item => out.append(item))
    B.forEach(item => out.append(item))
    out.balance()
    return out
  }

  symetricdifference(b) {
    const a = this
    const out = new Binar()
    const A = new Set(a.toArray())
    const B = new Set(b.toArray())
    B.forEach(item => !A.has(item) && out.append(item))
    A.forEach(item => !B.has(item) && out.append(item))
    out.balance()
    return out
  }

  intersection(b) {
    const a = this
    const out = new Binar()
    const A = new Set(a.toArray())
    const B = new Set(b.toArray())
    B.forEach(item => A.has(item) && out.append(item))
    out.balance()
    return out
  }

  difference(b) {
    const a = this
    const out = new Binar()
    const A = new Set(a.toArray())
    const B = new Set(b.toArray())
    A.forEach(item => !B.has(item) && out.append(item))
    out.balance()
    return out
  }

  partition(groups = 1) {
    const res = this.reduce((acc, _, index, arr) => {
      if (index % groups === 0) {
        const part = new Binar()
        for (let i = 0; i < groups; i += 1) {
          const current = arr.get(index + i)
          if (current !== undefined) part.append(current)
        }
        part.balance()
        acc.append(part)
      }
      return acc
    }, new Binar())
    res.balance()
    return res
  }

  unique() {
    const set = new Set()
    return Binar.from(
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

    out.forEach(item => {
      if (set.has(item)) {
        set.delete(item)
        extra.push(item)
      }
    })
    return Binar.from(out.concat(extra))
  }

  swap(i1, i2) {
    const temp = this.get(i1)
    this.set(i1, this.get(i2))
    this.set(i2, temp)
    return this
  }

  swapRemoveRight(index) {
    this.set(index, this.cut())
    return this
  }

  swapRemoveLeft(index) {
    this.set(index, this.chop())
    return this
  }

  copy() {
    return Binar.from([...this])
  }

  scan(callback, dir = 1) {
    if (dir === -1)
      for (let i = this.length; i >= 0; i -= 1) callback(this.get(i), i, this)
    else
      for (let i = 0, len = this.length; i < len; i += 1)
        callback(this.get(i), i, this)
    return this
  }

  isEmpty() {
    return this.#left.length + this.#right.length === 1
  }

  isInBounds(index) {
    return index >= 0 && index < this.length
  }

  getInBounds(index) {
    return this.get(clamp(index, 0, this.length - 1))
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
   * @param greather
   * @example
   * current => current.key // identity
   * current => identity(current) > target // greather
   * */
  search(target, identity = current => current, greather) {
    return binarySearch(
      this,
      target,
      identity,
      greather ?? (current => identity(current) > target),
      0,
      this.length
    )
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
const clamp = (num, min, max) => Math.min(Math.max(num, min), max)
const isIterable = iter =>
  iter === null || iter === undefined
    ? false
    : typeof iter[Symbol.iterator] === 'function'

const tailCallOptimisedRecursion =
  func =>
  (...args) => {
    let result = func(...args)
    while (typeof result === 'function') {
      result = result()
    }
    return result
  }

const flatten = tailCallOptimisedRecursion((collection, levels, flat) =>
  collection.reduce((acc, current) => {
    if (Binar.isBinaryArray(current)) acc.push(...flat(current, levels))
    else acc.push(current)
    return acc
  }, [])
)

const toMatrix = tailCallOptimisedRecursion((...args) => {
  if (args.length === 0) return
  const dimensions = new Binar().with(...args)
  const dim = dimensions.chop()
  const arr = new Binar()
  for (let i = 0; i < dim; i += 1) arr.set(i, toMatrix(...dimensions))
  return arr
})

const toArrayDeep = tailCallOptimisedRecursion(entity => {
  return Binar.isBinaryArray(entity)
    ? entity
        .map(item =>
          Binar.isBinaryArray(item)
            ? item.some(Binar.isBinaryArray)
              ? toArrayDeep(item)
              : item.toArray()
            : item
        )
        .toArray()
    : entity
})

const quickSortAsc = tailCallOptimisedRecursion((items, left, right) => {
  if (items.length > 1) {
    let pivot = items.get(((right + left) / 2) | 0.5),
      i = left,
      j = right
    while (i <= j) {
      while (items.get(i) < pivot) i += 1
      while (items.get(j) > pivot) j -= 1
      if (i <= j) {
        items.swap(i, j)
        i += 1
        j -= 1
      }
    }
    if (left < i - 1) quickSortAsc(items, left, i - 1)
    if (i < right) quickSortAsc(items, i, right)
  }
  return items
})

const quickSortDesc = tailCallOptimisedRecursion((items, left, right) => {
  if (items.length > 1) {
    let pivot = items.get(((right + left) / 2) | 0.5),
      i = left,
      j = right
    while (i <= j) {
      while (items.get(i) > pivot) i += 1
      while (items.get(j) < pivot) j -= 1
      if (i <= j) {
        items.swap(i, j)
        i += 1
        j -= 1
      }
    }
    if (left < i - 1) quickSortDesc(items, left, i - 1)
    if (i < right) quickSortDesc(items, i, right)
  }
  return items
})

const merge = (left, right, callback) => {
  const arr = []
  while (left.length && right.length) {
    callback(right.at(0), left.at(0)) > 0
      ? arr.push(left.chop())
      : arr.push(right.chop())
  }

  for (let i = 0; i < left.length; i += 1) {
    arr.push(left.get(i))
  }
  for (let i = 0; i < right.length; i += 1) {
    arr.push(right.get(i))
  }
  const out = new Binar()
  const half = (arr.length / 2) | 0.5
  for (let i = half - 1; i >= 0; i -= 1) out.prepend(arr[i])
  for (let i = half; i < arr.length; i += 1) out.append(arr[i])
  return out
}

const mergeSort = tailCallOptimisedRecursion((array, callback) => {
  const half = (array.length / 2) | 0.5
  if (array.length < 2) {
    return array
  }
  const left = array.splice(0, half)
  return merge(mergeSort(left, callback), mergeSort(array, callback), callback)
})

const binarySearch = tailCallOptimisedRecursion(
  (arr, target, by, greather, start, end) => {
    if (start > end) return undefined
    const index = ((start + end) / 2) | 0.5
    const current = arr.get(index)
    if (current === undefined) return undefined
    const identity = by(current)
    if (identity === target) return current
    if (greather(current))
      return binarySearch(arr, target, by, greather, start, index - 1)
    else return binarySearch(arr, target, by, greather, index + 1, end)
  }
)

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
