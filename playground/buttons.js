import { editor } from './main.js'

const buttonContainer = document.getElementById('buttons')
const contentContainer = document.getElementById('content')
const snippets = {
  map: {
    source: `const arr = Brrr.of(1, 2, 3, 4, 5)
return arr.map((x, i, arr) => x * i * 2)`,
    content: 'Create new array by iterating over the existing one',
  },
}
export const createButton = label => {
  const button = document.createElement('button')
  button.textContent = label
  buttonContainer.appendChild(button)
  button.addEventListener('click', () => {
    contentContainer.innerHTML = ''
    const paras = [document.createElement('p'), document.createElement('p')]
    paras[0].textContent = label
    paras[1].textContent = snippets[label].content
    paras.forEach(par => contentContainer.appendChild(par))
    editor.setValue(snippets[label].source)
  })
}
