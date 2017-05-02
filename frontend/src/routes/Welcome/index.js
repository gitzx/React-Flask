import { injectReducer } from '../../store/reducers'

export default (store) => ({
  path : 'welcome',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const Welcome = require('./containers/WelcomeContainer').default
      const reducer = require('./modules/welcome').default
      injectReducer(store, { key: 'welcome', reducer })
      cb(null, Welcome)
    }, 'welcome')
  }
})
