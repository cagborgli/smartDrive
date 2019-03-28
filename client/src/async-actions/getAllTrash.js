import {
  updateBegin,
  updateDone,
  updateFailed
} from '../action-creators/updateFile'
import { getTrash } from '../api'

export const getAllTrash = () => (dispatch, getState) => {
  dispatch(updateBegin())
  getTrash(undefined, dispatch, updateDone, updateFailed)
}
