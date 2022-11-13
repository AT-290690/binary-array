import { editor } from './main.js'

const buttonContainer = document.getElementById('buttons')
const contentContainer = document.getElementById('content')
const searchInput = document.getElementById('search')

const snippets = {
  List: {
    source: `get offsetLeft()
get offsetRight()
get length()
get first()
get last()
get items()
get reflection()
get shape()
with(...initial)
get(offset)
set(index, value)
clear()
isBalanced()
balance()
static of(...items)
static isBrrr(entity)
static from(iterable)
static matrix(...dimensions)
static zeroes(size)
static ones(size)
at(index)
push(...items)
unshift(...items)
pop()
shift()
slice(start, end = this.length)
splice(dir, deleteCount, ...items)
indexOf(item)
lastIndexOf(item)
includes(val, fromIndex = 0)
find(callback = Identity)
findLast(callback = Identity)
some(callback = Identity)
every(callback = Identity)
findIndex(callback = Identity)
findLastIndex(callback = Identity)
map(callback)
mapMut(callback)
forEach(callback)
reduce(callback, initial)
reduceRight(callback, initial)
filter(callback = Identity)
reject(callback = Identity)
reverse()
group(callback = Identity)
mergeSort(callback = (a, b) => (a < b ? -1 : 1))
quickSort(order)
join(separator = ',')
concat(second)
flat(levels = 1)
flatten(callback)
addTo(index, value)
addAt(key, ...value)
removeFrom(key, amount)
toArray(deep = false)
toObject(deep = false)
append(item)
prepend(item)
cut()
chop()
head()
tail()
insertRight(...items)
insertLeft(...items)
take(n = 1)
takeRight(n = 1)
to(callback, initial = new Brrr())
rotateLeft(n = 1)
rotateRight(n = 1)
rotate(n = 1, direction = 1)
without(...excludes)
compact()
union(b)
symetricDifference(b)
intersection(b)
difference(b)
partition(groups = 1)
unique()
duplicates()
swap(i1, i2)
swapRemoveRight(index)
swapRemoveLeft(index)
copy()
scan(callback, dir = 1)
isEmpty() 
isInBounds(index) 
isSorted(order = 'asc') 
search(target, identity = Identity, greather)`,
    content: [
      'All existing methods',
      'to RUN the code: press the thunder on the left OR',
      'CMD + S / Ctrl + S',
    ],
  },
  Brrr: {
    source: `return Brrr.of(1, 2, 3, 4).items`,
    content: [
      '(array-like data structure with fast operations)',
      'to RUN the code: press the thunder on the left OR',
      'CMD + S / Ctrl + S',
    ],
  },
  map: {
    source: `const arr = Brrr.of(1, 2, 3, 4, 5)
return arr.map((x, i, arr) => x * i * 2)`,
    content: [
      `Creates an array of values by running each element in collection thru iteratee. The iteratee is invoked with three arguments: (value, index, collection).`,
      `Arguments
[iteratee] (Function): The function invoked per iteration.`,
      `Returns
(Array): The new mapped array.`,
    ],
  },
  filter: {
    source: `const arr = Brrr.of(1, 2, 3, 4, 5)
// remove even elements
return arr.filter((x, i, arr) => x % 2)`,
    content: [
      `Iterates over elements of collection, returning an array of all elements predicate returns truthy for. The predicate is invoked with three arguments: (value, index, collection) `,
      `Arguments
[iteratee] (Function): The function invoked per iteration.`,
      `Returns
(Array): The new filtered array.`,
    ],
  },
  reject: {
    source: `const arr = Brrr.of(1, 2, 3, 4, 5)
// keep even elements
return arr.reject((x, i, arr) => x % 2)`,
    content: [
      `The opposite of Brrr.filter; this method returns the elements of collection that predicate does not return truthy for.`,
      `Arguments
[iteratee] (Function): The function invoked per iteration.`,
      `Returns
(Array): The new filtered array.`,
    ],
  },
  compact: {
    source: `const arr = Brrr.of(1, 2, null, 3, false, 4, 0, 5)
return arr.compact()`,
    content: [
      `Creates an array with all falsey values removed. The values false, null, 0, "", undefined, and NaN are falsey.`,
      `Argumetns void`,
      `(Array): Returns the new array of filtered values.`,
    ],
  },
  reduce: {
    source: `const arr = Brrr.of(1, 2, 3, 4, 5)
return arr.reduce((acc, x, i, arr) => acc += x, 0)`,
    content: [
      `Reduces collection to a value which is the accumulated result of running each element in collection thru iteratee, where each successive invocation is supplied the return value of the previous.`,
      `If accumulator is not given, the first element of collection is used as the initial value.`,
      `The iteratee is invoked with four arguments: (accumulator, value, index, collection).`,
      `Arguments
  [iteratee] (Function): The function invoked per iteration.
  [accumulator] (*): The initial value.`,
      `Returns
(*): The accumulated value.`,
    ],
  },
  reduceRight: {
    source: `const arr = Brrr.of(1, 2, 3, 4, 5)
return arr.reduceRight((acc, x, i, arr) => acc /= x)`,
    content: [
      `This method is like Brrr.reduce except that it iterates over elements of collection from right to left.`,
      `Arguments
  [iteratee] (Function): The function invoked per iteration.
  [accumulator] (*): The initial value.`,
      `Returns
(*): The accumulated value.`,
    ],
  },
  get: {
    source: `const arr = Brrr.of(1, 2, 3, 4, 5)
return arr.get(2)`,
    content: [
      `Access element of the array`,
      `Arguments
[index] (Number): index of the array`,
      `Returns
(*) The item of the array at the given index`,
    ],
  },
  at: {
    source: `const arr = Brrr.of(1, 2, 3, 4, 5)
return arr.at(-1)`,
    content: [
      `Access element of the array`,
      `Arguments
[index] (Number): index of the array`,
      `Returns
(*): The item of the array at the given index`,
    ],
  },
  first: {
    source: `const arr = Brrr.of(1, 2, 3, 4, 5)
return arr.first`,
    content: [
      `Get the first element of the array`,
      `Getter`,
      `Returns
(*): The first element of the array`,
    ],
  },
  last: {
    source: `const arr = Brrr.of(1, 2, 3, 4, 5)
return arr.last`,
    content: [
      `Get the last element of the array`,
      `Getter`,
      `Returns
(*): The last element of the array`,
    ],
  },
  group: {
    source: `const arr = Brrr.of(1, 2, 3, 4)
return arr.group((item) => (item % 2 == 0 ? "even" : "odd"))
.items
.even
.items`,
    content: [
      `Group the collection`,
      `Arguments
[[iteratee] (Function): The function invoked per iteration.`,
      `Returns
(Object): The Object/Map with groups as keys.`,
    ],
  },
  find: {
    source: `const arr = Brrr.of(1, 2, 3, 4)
return arr.find((x) => x > 2)`,
    content: [
      `Iterates over elements of collection, returning the first element predicate returns truthy for.`,
      `The predicate is invoked with three arguments: (value, index, collection).`,
      `Arguments
[predicate=Identity] (Function): The function invoked per iteration.
[fromIndex=0] (number): The index to search from.`,
      `Returns
The found element or undefined if none is found`,
    ],
  },
  concat: {
    source: `const a = Brrr.of(1, 2, 3, 4)
const b = Brrr.of(5, 6, 7)
return a.concat(b)`,
    content: [
      `Creates a new array concatenating array with any additional arrays.`,
      `Arguments
array (Array): The array to concatenate.`,
      `Returns
(Array): The new concatenated array.`,
    ],
  },
  head: {
    source: `const arr = Brrr.of(1, 2, 3, 4)
return arr.head()`,
    content: [
      `Removes the last element of the array`,
      `Arguments void.`,
      `Returns
(Array): All but the last element of the array.`,
    ],
  },
  tail: {
    source: `const arr = Brrr.of(1, 2, 3, 4)
return arr.tail()`,
    content: [
      `Removes the first element of the array`,
      `Arguments void.`,
      `Returns
(Array): All but the first element of the array.`,
    ],
  },

  cut: {
    source: `const arr = Brrr.of(1, 2, 3, 4)
return arr.cut()`,
    content: [
      `Removes the last element of the array`,
      `Arguments void.`,
      `Returns
(*): Returns the removed element`,
    ],
  },
  chop: {
    source: `const arr = Brrr.of(1, 2, 3, 4)
return arr.chop()`,
    content: [
      `Removes the first element of the array`,
      `Arguments void.`,
      `Returns
(*): Returns the removed element`,
    ],
  },
  flat: {
    source: `const arr = Brrr.of(1, Brrr.of(1, 2, Brrr.of(1, 2, 3)), 3, Brrr.of(1, 2, 3))
return arr.flat(Infinity)`,
    content: [
      `Flattens the array of a certain depth level.`,
      `Arguments
[level] (Number): index of the array`,
      `Returns
(Array): Flatten array of the given levels`,
    ],
  },
}

export const createButton = label => {
  const button = document.createElement('button')
  button.textContent = label
  buttonContainer.appendChild(button)

  button.addEventListener('click', () => {
    contentContainer.innerHTML = ''
    const par = document.createElement('p')
    par.textContent = label
    contentContainer.appendChild(par)
    const paras = snippets[label].content.map(content => {
      const par = document.createElement('p')
      par.textContent = content
      return par
    })
    const parContainer = document.createElement('div')
    contentContainer.appendChild(parContainer)
    parContainer.classList.add('section')
    paras.forEach(par => parContainer.appendChild(par))

    if (snippets[label].source) editor.setValue(snippets[label].source)
  })
}
const inclusions = Object.keys(snippets)
const defaults = ['Brrr', 'List']
searchInput.addEventListener('input', e => {
  if (e.target.value.trim() === '') {
    buttonContainer.innerHTML = ''
    return defaults.forEach(createButton)
  }
  const keys = inclusions.filter(inc =>
    inc.toLowerCase().includes(e.target.value.trim().toLowerCase())
  )
  if (keys.length) {
    buttonContainer.innerHTML = ''
    keys.forEach(createButton)
  }
})
