import { editor } from './main.js'

const buttonContainer = document.getElementById('buttons')
const contentContainer = document.getElementById('content')
const searchInput = document.getElementById('search')

const snippets = {
  Brrr: {
    source: undefined,
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
return arr.map((x, i, arr) => x * i * 2)`,
    content: [
      `Creates an array of values by `,
      `Arguments
[iteratee] (Function): The function invoked per iteration.`,
      `Returns
(Array): The new mapped array.`,
    ],
  },
  reduce: {
    source: `const arr = Brrr.of(1, 2, 3, 4, 5)
return arr.reduce((acc, x, i, arr) => acc+=x, 0)`,
    content: [
      `Creates a`,
      `Arguments
[iteratee] (Function): The function invoked per iteration.`,
      `Returns
(Array): The new mapped array.`,
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
(Any): The item of the array at the given index`,
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
(Any): The item of the array at the given index`,
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
const defaults = ['Brrr']
searchInput.addEventListener('input', e => {
  if (e.target.value.trim() === '') {
    buttonContainer.innerHTML = ''
    return createButton(defaults)
  }
  const key = inclusions.find(inc => inc.includes(e.target.value.trim()))
  if (key) {
    buttonContainer.innerHTML = ''
    createButton(key)
  }
})
