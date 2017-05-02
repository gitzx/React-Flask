// We only need to import the modules necessary for initial render
import CoreLayout from '../layouts/CoreLayout'
import AppNavLayout from '../layouts/NavigationLayout'
import Home from './Home'
import CounterRoute from './Counter'
import Login from './Login'
import Register from './Register'
import Welcome from './Welcome'
import CMS from './CMS'

/*  Note: Instead of using JSX, we recommend using react-router
    PlainRoute objects to build route definitions.   */

let isAuthExpired = false;

function checkAuthExpired() {
  console.log("localStorage.getItem('token')" + localStorage.getItem('token'))
  if(typeof localStorage.getItem('token') === "undefined" || localStorage.getItem('token') === null)
  {
    isAuthExpired = true;
    console.log("  isAuthExpired: " +isAuthExpired)
    return;
  }
  const token = localStorage.getItem('token');
  fetch('api/is_token_valid', {
      method: 'post',
      credentials: 'include',
      headers: {
          'Accept': 'application/json', // eslint-disable-line quote-props
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token }),
  })
    .then(res => {
      console.log("4444444444444 : " + res.status);
      if (res.status === 200) {
          isAuthExpired = false;
      } else {
          isAuthExpired = true;
      }
      console.log("  isAuthExpired: " +isAuthExpired)
    });
}

const requireAuth = (store) => (nextState, replace) => {
  const state = store.getState();
  checkAuthExpired();
  console.log("state.auth:   " + state.auth + " state.auth.isAuthenticated: " + state.auth.isAuthenticated );
  if( (nextState.location.pathname === '/login') || !isAuthExpired ) 
  {
    return;
  }
  if (!state.auth || !state.auth.isAuthenticated) {
      replace({
        pathname: '/login',
        state: {nextPathname: nextState.location.pathname}
      });
  }
};

export const createRoutes = (store) => ({
  path: '/',
  childRoutes: [
    // authed route root
    {
      component: AppNavLayout,
      onEnter: requireAuth(store),
      indexRoute: Home,
      childRoutes: [
        CounterRoute(store),
        Welcome(store),
        CMS(store),
      ]
    },
    // non-authed routes
    {
      component: CoreLayout,
      childRoutes: [
        Login(store),
        Register(store) // has for example /login /reset
      ]
    },
    // etc.. other non authed routes
    //HelpRoute,
    //ContactRoute
  ]
});

/*  Note: childRoutes can be chunked or otherwise loaded programmatically
    using getChildRoutes with the following signature:

    getChildRoutes (location, cb) {
      require.ensure([], (require) => {
        cb(null, [
          // Remove imports!
          require('./Counter').default(store)
        ])
      })
    }

    However, this is not necessary for code-splitting! It simply provides
    an API for async route definitions. Your code splitting should occur
    inside the route `getComponent` function, since it is only invoked
    when the route exists and matches.
*/


export default createRoutes
