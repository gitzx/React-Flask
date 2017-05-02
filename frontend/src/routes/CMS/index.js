import { injectReducer } from '../../store/reducers'

export default (store) => ({
  path : 'cms',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const CMS = require('./containers/CMSContainer').default
      const reducer = require('./modules/cms').default
      //injectReducer(store, { key: 'cms', reducer })
      cb(null, CMS)
    }, 'cms')
  }
})
