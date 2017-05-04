import React from 'react'
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import PropTypes from 'prop-types'
import './CoreLayout.scss'
import '../../styles/core.scss'


export const CoreLayout = ({ children }) => (
	<MuiThemeProvider muiTheme={getMuiTheme()}>
	  <div className='container text-center'>

	    <div className='core-layout__viewport'>
	      {children}
	    </div>
	  </div>
	</MuiThemeProvider>
)

CoreLayout.propTypes = {
  children : PropTypes.element.isRequired
}

export default CoreLayout
