const offsetLeft = entity => (entity.left.length - 1) * -1
const offsetRight = entity => entity.right.length
export const make = () => ({ left: [-1], right: [] })
export const length = entity => entity.left.length + entity.right.length - 1
export const clear = entity => {
  entity.left = [-1]
  entity.right = []
  return entity
}
const tailCallOptimisedRecursion =
  func =>
  (...args) => {
    let result = func(...args)
    while (typeof result === 'function') result = result()
    return result
  }
const flatten = tailCallOptimisedRecursion((collection, levels, flat) =>
  to(
    collection,
    (acc, current) => {
      if (isBinaryArray(current)) acc.push(...flat(current, levels))
      else acc.push(current)
      return acc
    },
    []
  )
)
export const get = (entity, offset) => {
  const offsetIndex = offset + offsetLeft(entity)
  const index = offsetIndex < 0 ? offsetIndex * -1 : offsetIndex
  return offsetIndex >= 0 ? entity.right[index] : entity.left[index]
}
export const at = (entity, index) => {
  if (index < 0) return get(entity, length(entity) + index)
  else return get(entity, index)
}
export const set = (entity, index, value) => {
  const offset = index + offsetLeft(entity)
  if (offset >= 0) entity.right[offset] = value
  else entity.left[offset * -1] = value
}
export const first = entity => get(entity, 0)
export const last = entity => get(entity, length(entity) - 1)
export const toArray = entity => {
  const len = length(entity)
  const out = []
  for (let i = 0; i < len; i++) out.push(get(entity, i))
  return out
}
export const copy = entity => {
  const lem = length(entity)
  const out = make()
  const half = (lem / 2) | 0.5
  for (let i = half - 1; i >= 0; i--) addToLeft(out, entity.get(i))
  for (let i = half; i < lem; i++) addToRight(out, entity.get(i))
  return out
}
export const isBinaryArray = entity =>
  typeof entity === 'object' &&
  'left' in entity &&
  Array.isArray(entity.left) &&
  entity.left[0] === -1 &&
  'right' in entity &&
  Array.isArray(entity.right)
export const isBalanced = entity =>
  offsetRight(entity) + offsetLeft(entity) === 0
export const balance = entity => {
  if (isBalanced(entity)) return entity
  const initial = toArray(entity)
  clear(entity)
  const half = (initial.length / 2) | 0.5
  for (let i = half - 1; i >= 0; i--) addToLeft(entity, initial[i])
  for (let i = half; i < initial.length; i++) addToRight(entity, initial[i])
  return entity
}
export const addToLeft = (entity, item) => entity.left.push(item)
export const addToRight = (entity, item) => entity.right.push(item)
export const removeFromLeft = entity => {
  const len = length(entity)
  if (len) {
    if (len === 1) clear(entity)
    else if (entity.left.length > 0) entity.left.length--
  }
}
export const removeFromRight = entity => {
  const len = length(entity)
  if (len) {
    if (len === 1) clear(entity)
    else if (entity.right.length > 0) entity.right.length--
  }
}
export const fill = (entity, ...initial) => {
  const half = (initial.length / 2) | 0.5
  for (let i = half - 1; i >= 0; i--) addToLeft(entity, initial[i])
  for (let i = half; i < initial.length; i++) addToRight(entity, initial[i])
  return entity
}
export const makeWith = (...intilal) => fill(make(), ...intilal)
export const map = (entity, callback) => {
  const result = make()
  const len = length(entity)
  const half = (len / 2) | 0.5
  for (let i = half - 1; i >= 0; i--)
    addToLeft(entity, callback(get(entity, i), i, entity))
  for (let i = half; i < len; i++)
    addToLeft(entity, callback(get(entity, i), i, entity))
  return result
}
export const filter = (entity, callback) => {
  const out = []
  const len = length(entity)
  for (let i = 0; i < len; i++) {
    const current = get(entity, i)
    const predicat = callback(current, i, entity)
    if (predicat) out.push(current)
  }
  return fill(make(), ...out)
}
export const some = (entity, callback) => {
  const len = length(entity)
  for (let i = 0; i < len; i += 1)
    if (callback(get(entity, i), i, entity)) return true
  return false
}
export const every = (entity, callback) => {
  const len = length(entity)
  for (let i = 0; i < len; i += 1)
    if (i >= length(entity) || !callback(get(entity, i), i, entity))
      return false
  return true
}
export const findFirst = (entity, callback) => {
  const len = length(entity)
  for (let i = 0; i < len; i += 1) {
    const current = get(entity, i)
    if (callback(current, i, entity)) return current
  }
}
export const findLast = (entity, callback) => {
  const len = length(entity)
  for (let i = len - 1; i >= 0; i -= 1) {
    const current = get(entity, i)
    if (callback(current, i, entity)) return current
  }
}
export const scan = (entity, callback, dir = 1) => {
  const len = length(entity)
  if (dir === -1)
    for (let i = len; i >= 0; i -= 1) callback(this.get(i), i, entity)
  else for (let i = 0; i < len; i += 1) callback(this.get(i), i, entity)
  return entity
}
export const each = (entity, callback) => {
  const len = length(entity)
  for (let i = 0; i < len; i += 1) callback(this.get(i))
  return entity
}
export const reverse = entity => {
  const len = length(entity)
  if (len <= 2) {
    if (len === 1) return entity
    const temp = get(entity, 0)
    set(entity, 0, get(entity, 1))
    set(entity, 1, temp)
    return entity
  }

  const left = entity.left
  const right = entity.right
  right.unshift(left.shift())
  entity.left = right
  entity.right = left
  return entity
}
export const isEmpty = entity => entity.left.length + entity.right.length === 1
export const isInBounds = (entity, index) => index >= 0 && index < entity.length
export const getInBounds = (entity, index) =>
  get(entity, clamp(index, 0, length(entity) - 1))
export const append = (entity, item) => {
  addToRight(entity, item)
  return entity
}
export const prepend = (entity, item) => {
  addToLeft(entity, item)
  return entity
}
export const cut = entity => {
  if (offsetRight(entity) === 0) balance(entity)
  const out = last(entity)
  removeFromRight(entity)
  return out
}
export const chop = entity => {
  if (offsetLeft(entity) === 0) balance(entity)
  const out = first(entity)
  removeFromLeft(entity)
  return out
}
export const head = entity => {
  if (offsetRight(entity) === 0) balance(entity)
  removeFromRight(entity)
  return entity
}
export const tail = entity => {
  if (offsetLeft(entity) === 0) balance(entity)
  removeFromLeft(entity)
  return entity
}
export const to = (entity, callback, initial) => {
  initial = initial ?? make()
  const len = length(entity)
  for (let i = 0; i < len; i += 1)
    initial = callback(initial, get(entity, i), i, entity)
  return initial
}
export const rotateLeft = (entity, n = 1) => {
  n = n % length(entity)
  for (let i = 0; i < n; i += 1) {
    if (offsetLeft(entity) === 0) balance(entity)
    addToRight(entity, first(entity))
    removeFromLeft(entity)
  }
  return entity
}
export const rotateRight = (entity, n = 1) => {
  n = n % length(entity)
  for (let i = 0; i < n; i += 1) {
    if (offsetRight(entity) === 0) balance(entity)
    addToLeft(entity, last(entity))
    removeFromRight(entity)
  }
  return entity
}
export const rotate = (entity, n = 1, direction = 1) =>
  direction === 1 ? rotateRight(entity, n) : rotateLeft(entity, n)
export const flat = (entity, levels = 1) => {
  const flat =
    levels === Infinity
      ? tailCallOptimisedRecursion(collection =>
          flatten(collection, levels, flat)
        )
      : tailCallOptimisedRecursion((collection, levels) => {
          levels -= 1
          return levels === -1 ? collection : flatten(collection, levels, flat)
        })
  return fill(make(), ...flat(entity, levels))
}
export const swap = (entity, i1, i2) => {
  const temp = get(entity, i1)
  set(entity, i1, get(entity, i2))
  set(entity, i2, temp)
  return entity
}
export const swapRemoveRight = (entity, index) => {
  set(entity, index, cut(entity))
  return entity
}
export const swapRemoveLeft = (entity, index) => {
  set(entity, index, chop(entity))
  return entity
}
export const compact = entity => filter(entity, Boolean)
export const union = (entity, b) => {
  const a = entity
  const out = make()
  const A = new Set(toArray(a))
  const B = new Set(toArray(b))
  A.forEach(item => append(out, item))
  B.forEach(item => append(out, item))
  return balance(out)
}
export const symetricdifference = (entity, b) => {
  const a = entity
  const out = make()
  const A = new Set(toArray(a))
  const B = new Set(toArray(b))
  B.forEach(item => !A.has(item) && append(out, item))
  A.forEach(item => !B.has(item) && append(out, item))
  return balance(out)
}
export const intersection = (entity, b) => {
  const a = entity
  const out = make()
  const A = new Set(toArray(a))
  const B = new Set(toArray(b))
  B.forEach(item => A.has(item) && append(out, item))
  return balance(out)
}
export const difference = (entity, b) => {
  const a = entity
  const out = make()
  const A = new Set(toArray(a))
  const B = new Set(toArray(b))
  A.forEach(item => !B.has(item) && append(out, item))
  return balance(out)
}
export const partition = (entity, groups = 1) =>
  balance(
    to(entity, (acc, _, index, arr) => {
      if (index % groups === 0) {
        const part = make()
        for (let i = 0; i < groups; i += 1) {
          const current = get(arr, index + i)
          if (current !== undefined) append(part, current)
        }
        balance(part)
        append(acc, part)
      }
      return acc
    })
  )
export const unique = entity => {
  const set = new Set()
  return fill(
    make(),
    ...to(
      entity,
      (acc, item) => {
        if (!set.has(item)) {
          set.add(item)
          acc.push(item)
        }
        return acc
      },
      []
    )
  )
}
export const duplicates = entity => {
  const set = new Set()
  const extra = []
  const out = to(
    entity,
    (acc, item) => {
      set.has(item) ? acc.push(item) : set.add(item)
      return acc
    },
    []
  )
  out.forEach(item => {
    if (set.has(item)) {
      set.delete(item)
      extra.push(item)
    }
  })
  return fill(make(), ...out.concat(extra))
}
export const pipe =
  (...fns) =>
  x =>
    fns.reduce((v, f) => f(v), x)
