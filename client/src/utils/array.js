import { random } from './scalar'

export const zip = (a, b) => a.map((el, idx) => [el, b[idx]])
export const pick = (array, count) => {
  let result = []
  let arrayCopy = [...array]
  while (result.length < count && arrayCopy.length > 0) {
    let sel = random(arrayCopy.length)

    result.push(arrayCopy[sel])
    arrayCopy.splice(sel)
  }

  return result
}
