import {createStore, combineReducers, applyMiddleware} from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import user from './user'
import messages from './messages'
import interests from './interests'
import preferences from './preferences'
import countries from './countries'
import penpals from './penpals'
import friends from './friends'

const reducer = combineReducers({user, messages, interests, preferences, countries, penpals, friends})
const middleware = composeWithDevTools(applyMiddleware(
  thunkMiddleware,
  createLogger({collapsed: true})
))
const store = createStore(reducer, middleware)

export default store
export * from './user'
export * from './messages'
export * from './interests'
export * from './preferences'
export * from './countries'
export * from './penpals'
export * from './friends'
