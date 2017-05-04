import { combineReducers } from 'redux'
import locationReducer from './location'
//import createReducer from 'routes/Login/modules/login'
const loginReducer = require('routes/Login/modules/login').default
const registerReducer = require('routes/Register/modules/register').default
const welcomeReducer = require('routes/Welcome/modules/welcome').default
const cmsReducer = require('routes/CMS/modules/cms').default
const postsReducer = require('routes/PostForm/modules/posts').default
const itemsReducer = require('routes/PostForm/modules/items').default
const tagsReducer = require('routes/PostForm/modules/tags').default

export const makeRootReducer = (asyncReducers) => {
  return combineReducers({
    auth: loginReducer,
    register: registerReducer,
    welcome: welcomeReducer,
    cms: cmsReducer,
    posts: postsReducer,
    items: itemsReducer,
    tags: tagsReducer,
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
