import {
  UPLOAD_BEGIN,
  UPLOAD_DONE,
  UPLOAD_FAILED,
  SET_UPLOAD_FILES,
  SHOW_MODAL,
  HIDE_MODAL
} from '../action-types/index'
import { createAction } from '../utils/redux'

export const setUploadFiles = filenames =>
  createAction(SET_UPLOAD_FILES, filenames)

export const uploadBegin = () => createAction(UPLOAD_BEGIN)

export const uploadDone = payload => createAction(UPLOAD_DONE, payload)

export const uploadFailed = message => createAction(UPLOAD_FAILED, message)

export const showModal = () => createAction(SHOW_MODAL)

export const hideModal = () => createAction(HIDE_MODAL)
