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
static #negativeZeroSymbol = Symbol('-0')
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
find(callback)
findLast(callback)
some(callback)
every(callback)
findIndex(callback)
findLastIndex(callback)
map(callback)
mapMut(callback)
forEach(callback)
reduce(callback, initial)
reduceRight(callback, initial)
filter(callback)
reject(callback)
reverse()
group(callback)
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
search(target, identity = current => current, greather)`,
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
(Array): Returns the new filtered array.`,
    ],
  },
  reduce: {
    source: `const arr = Brrr.of(1, 2, 3, 4, 5)
return arr.reduce((acc, x, i, arr) => acc+=x, 0)`,
    content: [
      `Reduces collection to a value which is the accumulated result of running each element in collection thru iteratee, where each successive invocation is supplied the return value of the previous. If accumulator is not given, the first element of collection is used as the initial value. The iteratee is invoked with four arguments: (accumulator, value, index, collection).`,
      `Arguments
  [iteratee] (Function): The function invoked per iteration.
  [accumulator] (*): The initial value.`,
      `Returns
(*): Returns the accumulated value.`,
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
    source: `const arr = Brrr
    .of(1, 2, 3, 4)
return arr.group((item) => (item % 2 == 0 ? "even" : "odd"))
.items
.even
.items`,
    content: [
      `Group the collection`,
      `Arguments
[[iteratee] (Function): The function invoked per iteration.`,
      `Returns
(Object): Returns a object/map with groups as keys.`,
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
    paras.forEach(par => contentContainer.appendChild(par))

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
