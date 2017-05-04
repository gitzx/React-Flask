import { injectReducer } from '../../store/reducers'

export default (store) => ({
  path : '/postnew',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const PostForm = require('./containers/PostFormContainer').default
      //const reducer = require('./modules/cms').default
      //injectReducer(store, { key: 'cms', reducer })
      cb(null, PostForm)
    }, '/postnew')
  }
})
