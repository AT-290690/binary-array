import { CodeMirror } from './libs/editor/editor.bundle.js'
import Brrr from '../src/Brrr.js'
import { createButton } from './manual.js'

const app = document.getElementById('app')
const mainContainer = document.getElementById('editor-container')
const consoleElement = document.getElementById('console')
app.style.height = window.innerHeight
globalThis.Brrr = Brrr
export const editor = CodeMirror(mainContainer, {})
editor.changeFontSize('15px')
const print = function (...values) {
  values.forEach(
    x => (consoleElement.value += `${JSON.stringify(x) ?? undefined}`)
  )
  return values
}
const printErrors = errors => {
  consoleElement.classList.remove('info_line')
  consoleElement.classList.add('error_line')
  consoleElement.value = errors
}
const run = () => {
  consoleElement.classList.add('info_line')
  consoleElement.classList.remove('error_line')
  consoleElement.value = ''
  // popupContainer.style.display = 'none'
  try {
    const out = new Function(`${editor.getValue().trim()}`)()
    if (out !== undefined) {
      Brrr.isBrrr(out) ? print(out.toObject(true)) : print(out)
    } else {
      return print(undefined)
    }
    return out
  } catch (err) {
    printErrors(err)
  }
}

const resize = () => editor.setSize(window.innerWidth, window.innerHeight / 2)
window.addEventListener('resize', resize)

document.addEventListener('keydown', e => {
  if (e.key.toLowerCase() === 's' && (e.ctrlKey || e.metaKey)) {
    e = e || window.event
    e.preventDefault()
    e.stopPropagation()
    run()
  }
})
;(() => {
  document.getElementById('run').addEventListener('click', run)
  consoleElement.value = ''
  editor.setValue(`return Brrr.of(1, 2, 3, 4).items`)
  ;['Brrr', 'List'].forEach(createButton)
  window.dispatchEvent(new Event('resize'))
  document.getElementById('app').style.height = 'auto'
})()
