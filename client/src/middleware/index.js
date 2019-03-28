import { applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { routerMiddleware } from 'react-router-redux'
import { composeWithDevTools } from 'redux-devtools-extension'

export default history => {
  const middlewares = [thunk, routerMiddleware(history)]
  const enhancers = [applyMiddleware(...middlewares)]
  const composeEnhancers = composeWithDevTools({
    // Specify name here, actionsBlacklist, actionsCreators and other options if needed
  })

  return composeEnhancers(...enhancers)
}
