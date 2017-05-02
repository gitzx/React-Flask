import React from 'react';
import PropTypes from 'prop-types'
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Footer } from './components/Footer';
const NavigationLayout = require('./containers/NavigationLayoutContainer').default

/* global styles for app */
import './styles/app.scss';


export const AppNavLayout = ({ children }) => (
	<MuiThemeProvider muiTheme={getMuiTheme()}>
	  <section>
	    <NavigationLayout />
	    <div
	    	className="container"
	    	style={{ marginTop: 60, paddingBottom: 250 }}
        >
	      	{children}
	    </div>
	    <div>
	    	<Footer />
        </div>
	  </section>
	</MuiThemeProvider>
)

AppNavLayout.propTypes = {
  children : PropTypes.element.isRequired
}

export default AppNavLayout