import {
  updateBegin,
  updateDone,
  updateFailed
} from '../action-creators/updateFile'
import { getAllFiles } from '../async-actions/getAllFiles'
import { getAllTrash } from '../async-actions/getAllTrash'
import { updateFiles } from '../api'

const syncViews = () => dispatch => {
  dispatch(getAllFiles())
  dispatch(getAllTrash())
}

export const trash = id => (dispatch, getState) => {
  dispatch(updateBegin())
  const request = [{ id, isTrash: true, folderId: 0 }]
  updateFiles(request, dispatch, syncViews, updateFailed)
}

export const untrash = id => (dispatch, getState) => {
  dispatch(updateBegin())
  const request = [{ id, isTrash: false }]
  updateFiles(request, dispatch, syncViews, updateFailed)
}

export const rename = (id, name) => (dispatch, getState) => {
  dispatch(updateBegin())
  const request = [{ id, name }]
  updateFiles(request, dispatch, updateDone, updateFailed)
}
