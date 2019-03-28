import {
  SET_UPDATE_FILES,
  UPDATE_BEGIN,
  UPDATE_DONE,
  UPDATE_FAILED,
  DELETE_FILE
} from '../action-types/index'

const updateInitialState = {
  fileObjects: [],
  errorMessage: '',
  error: false
}

export default function trashReducer (state = updateInitialState, action) {
  const { type, payload } = action
  switch (type) {
    case UPDATE_BEGIN:
      return {
        ...state,
        error: false,
        errorMessage: ''
      }
    case UPDATE_FAILED:
      return {
        ...state,
        error: true,
        errorMessage: payload
      }
    case UPDATE_DONE:
      return {
        ...state,
        fileObjects: payload
      }
    case SET_UPDATE_FILES:
      return {
        ...state,
        fileObjects: payload
      }

    case DELETE_FILE:
      return {
        ...state,
        fileObjects: [...state.fileObjects.filter(fo => fo.id !== payload)]
      }
    default:
      return state
  }
}
