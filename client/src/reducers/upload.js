import {
  SET_UPLOAD_FILES,
  UPLOAD_BEGIN,
  UPLOAD_DONE,
  UPLOAD_FAILED,
  SHOW_MODAL,
  HIDE_MODAL
} from '../action-types/index'

const uploadInitialState = {
  files: [],
  errorMessage: '',
  error: false,
  uploading: false,
  modalVisible: false
}

export default function uploadReducer (state = uploadInitialState, action) {
  const { type, payload } = action
  switch (type) {
    case UPLOAD_BEGIN:
      return {
        ...state,
        error: false,
        errorMessage: '',
        uploading: true
      }
    case UPLOAD_FAILED:
      return {
        ...state,
        error: true,
        errorMessage: payload,
        uploading: false
      }
    case UPLOAD_DONE:
      return {
        ...state,
        uploading: false,
        files: [],
        error: false,
        modalVisible: false
      }
    case SET_UPLOAD_FILES:
      return {
        ...state,
        files: payload
      }

    case SHOW_MODAL:
      return {
        ...state,
        modalVisible: true
      }
    case HIDE_MODAL:
      return {
        ...state,
        modalVisible: false
      }
    default:
      return state
  }
}
