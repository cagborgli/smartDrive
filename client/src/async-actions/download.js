import { downloadFile } from '../api'
import { saveData } from '../utils/file'

export const download = id => (dispatch, getState) => {
  downloadFile(id)(
    null,
    b => (b ? window.alert(b) : b),
    ({ name, data, type }) => {
      saveData(name, data, type)
      return false
    },
    fail => fail
  )
}
