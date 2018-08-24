import { createStore, compose, applyMiddleware } from 'redux'
import { fetchData } from './reducers'
import thunk from 'redux-thunk'

const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?   
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose

const enhancer = composeEnhancers(
  applyMiddleware(thunk)
)

export default createStore(fetchData, enhancer)