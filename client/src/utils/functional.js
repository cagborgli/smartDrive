export const delay = dispatch => ({
  of: action => ({
    by: ms => setTimeout(() => dispatch(action), ms)
  })
})
