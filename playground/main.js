import { CodeMirror } from './libs/editor/editor.bundle.js'
import Brrr from '../src/Brrr.js'
import { createButton } from './buttons.js'
const mainContainer = document.getElementById('editor-container')
const consoleElement = document.getElementById('console')
globalThis.Brrr = Brrr
export const editor = CodeMirror(mainContainer, {})
editor.changeFontSize('15px')
const print = function (...values) {
  values.forEach(
    x => (consoleElement.value += `${JSON.stringify(x) ?? undefined}`)
  )
  return values
}
editor.setSize(mainContainer.getBoundingClientRect().width, 300)
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
    }
    return out
  } catch (err) {
    printErrors(err)
  }
}
const resize = () =>
  editor.setSize(mainContainer.getBoundingClientRect().width, 300)
window.addEventListener('resize', resize)

document.addEventListener('keydown', e => {
  if (e.key.toLowerCase() === 's' && (e.ctrlKey || e.metaKey)) {
    e = e || window.event
    e.preventDefault()
    e.stopPropagation()
    run()
  }
})

document.getElementById('run').addEventListener('click', run)
consoleElement.value = ''
window.dispatchEvent(new Event('resize'))
editor.setValue(`return Brrr.of(1, 2, 3, 4).items`)
;['map', 'filter', 'reduce', 'every'].forEach(x => createButton(x))
