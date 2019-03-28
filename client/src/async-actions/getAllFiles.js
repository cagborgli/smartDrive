import {
  startLoading,
  doneLoading,
  setErrorMessage
} from '../action-creators/home'
import { getFiles } from '../api'

export const getAllFiles = () => (dispatch, getState) => {
  dispatch(startLoading())
  getFiles(undefined, dispatch, doneLoading, setErrorMessage)
}
