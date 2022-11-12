import { CodeMirror } from '../libs/editor/editor.bundle.js'
import Brrr from '../src/Brrr.js'
const mainContainer = document.getElementById('editor-container')
const consoleElement = document.getElementById('console')
globalThis.Brrr = Brrr
const editor = CodeMirror(mainContainer, {})
editor.changeFontSize('18px')
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
    if (out !== undefined) print(out)
    return out
  } catch (err) {
    printErrors(err)
  }
}
const resize = e => {
  editor.setSize(
    mainContainer.getBoundingClientRect().width,
    mainContainer.getBoundingClientRect().height
  )
}
window.addEventListener('resize', resize)

document.addEventListener('keydown', e => {
  if (e.key.toLowerCase() === 's' && (e.ctrlKey || e.metaKey)) {
    e = e || window.event
    e.preventDefault()
    e.stopPropagation()
    run()
  }
})

consoleElement.value = ''
window.dispatchEvent(new Event('resize'))
editor.setValue(`return Brrr.of(1, 2, 3, 4).items`)
