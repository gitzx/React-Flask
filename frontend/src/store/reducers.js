import { combineReducers } from 'redux'
import locationReducer from './location'
//import createReducer from 'routes/Login/modules/login'
const loginReducer = require('routes/Login/modules/login').default
const registerReducer = require('routes/Register/modules/register').default
const welcomeReducer = require('routes/Welcome/modules/welcome').default
const cmsReducer = require('routes/CMS/modules/cms').default

export const makeRootReducer = (asyncReducers) => {
  return combineReducers({
  	auth: loginReducer,
  	register: registerReducer,
  	welcome: welcomeReducer,
    cms: cmsReducer,
    location: locationReducer,
    ...asyncReducers
  })
}

export const injectReducer = (store, { key, reducer }) => {
  if (Object.hasOwnProperty.call(store.asyncReducers, key)) return

  store.asyncReducers[key] = reducer
  store.replaceReducer(makeRootReducer(store.asyncReducers))
}

export default makeRootReducer
