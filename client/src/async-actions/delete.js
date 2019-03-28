import {
  updateBegin,
  updateFailed,
  deleteFile
} from '../action-creators/updateFile'

import { deleteFiles } from '../api'

export const del = id => (dispatch, getState) => {
  dispatch(updateBegin())
  const request = [id]
  deleteFiles(request, dispatch, () => deleteFile(id), updateFailed)
}
