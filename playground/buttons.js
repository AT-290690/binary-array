import { editor } from './main.js'

const buttonContainer = document.getElementById('buttons')
const contentContainer = document.getElementById('content')
const snippets = {
  map: {
    source: `const arr = Brrr.of(1, 2, 3, 4, 5)
return arr.map((x, i, arr) => x * i * 2)`,
    content: [
      `Creates an array of values by running each element in collection thru iteratee. The iteratee is invoked with three arguments: (value, index, collection).`,
      `Arguments
collection (Array): The collection to iterate over.
[iteratee] (Function): The function invoked per iteration.`,
      `Returns
(Array): The new mapped array.`,
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
    editor.setValue(snippets[label].source)
  })
}
