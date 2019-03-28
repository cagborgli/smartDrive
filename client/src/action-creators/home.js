import {
  SET_SELECTED_FILE,
  SET_FILE_LIST,
  SET_CURRENT_FOLDER,
  SET_ERROR_MESSAGE,
  START_LOADING,
  DONE_LOADING,
  SET_VIEW_MODE_GRID,
  SET_VIEW_MODE_LIST,
  INSERT_FILES
} from '../action-types'
import { createAction } from '../utils/redux'

export const setSelectedFile = id => createAction(SET_SELECTED_FILE, id)
export const setFileList = files => createAction(SET_FILE_LIST, files)
export const setCurrentFolder = id => createAction(SET_CURRENT_FOLDER, id)
export const setErrorMessage = message =>
  createAction(SET_ERROR_MESSAGE, message)
export const startLoading = () => createAction(START_LOADING)
export const doneLoading = files => createAction(DONE_LOADING, files)
export const setViewModeGrid = () => createAction(SET_VIEW_MODE_GRID)
export const setViewModeList = () => createAction(SET_VIEW_MODE_LIST)
export const insertFiles = files => createAction(INSERT_FILES, files)
