import React, {Component, PropTypes} from 'react';
import Drawer from 'material-ui/Drawer';
import {List, ListItem, makeSelectable} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import MenuItem from 'material-ui/MenuItem';
import {spacing, typography, zIndex} from 'material-ui/styles';
import {cyan500} from 'material-ui/styles/colors';

const SelectableList = makeSelectable(List);

class AppNavDrawer extends Component {
	static propTypes = {
	    docked: PropTypes.bool.isRequired,
	    location: PropTypes.object.isRequired,
	    onRequestChangeNavDrawer: PropTypes.func.isRequired,
	    onChangeList: PropTypes.func.isRequired,
	    open: PropTypes.bool.isRequired,
	    isAuthenticated: PropTypes.bool.isRequired,
  	};

  	static contextTypes = {
    	router: PropTypes.object.isRequired,
  	};

  	getStyles() {
	    const styles = {
	      logo: {
	      	cursor: 'pointer',
	        fontSize: 24,
	        color: typography.textFullWhite,
	        lineHeight: `${spacing.desktopKeylineIncrement}px`,
	        fontWeight: typography.fontWeightLight,
	        backgroundColor: cyan500,
	        paddingLeft: spacing.desktopGutter,
	        marginBottom: 8,
      	  },
    	};
    	return styles;
  	}

  	dispatchNewRoute(route) {
    	this.context.router.push(route);
    	this.props.onRequestChangeNavDrawer();
  	}

  	render(){
  		const {
	      location,
	      docked,
	      open,
	      isAuthenticated,
	      onRequestChangeNavDrawer,
	      onChangeList,
	      onLogOut,
	    } = this.props;

    	const styles = this.getStyles();

    	return(
    		<Drawer
    			docked = {docked}
    			open = {open}
    			onRequestChange={onRequestChangeNavDrawer}
    		>
	    		<div style={styles.logo} onTouchTap={() => this.dispatchNewRoute('/')}>
	          		Hello World
	        	</div>
	          	<div>
	          		<MenuItem onClick={() => this.dispatchNewRoute('/welcome')}>
	          			Welcome
	              	</MenuItem>
	              	<Divider />

	              	<MenuItem onClick={(s) => this.dispatchNewRoute('/counter')}>
	                  	Counter
	              	</MenuItem>
	              	<Divider />

	              	<MenuItem onClick={(s) => this.dispatchNewRoute('/cms')}>
	              		CMS
	              	</MenuItem>
	              	<Divider />

	              	<MenuItem onClick={(s) => this.dispatchNewRoute('/')}>
	                  	Hello Duck
	              	</MenuItem>
	              	<Divider />

	              	<SelectableList
	                	value={location.pathname}
	                	onChange={onChangeList}
	              	>
	                <Subheader>Resources</Subheader>
	                <ListItem
	                	primaryText="Hello 20"
		              	primaryTogglesNestedList={true}
		              	nestedItems={[
	                    	<ListItem primaryText="hello 20" value="/20" />,
	                    	<ListItem primaryText="hello 21" value="/21" />,
	                  	]}
	                />

	                <ListItem
	                	primaryText="Hello 30"
	                  	primaryTogglesNestedList={true}
	                  	nestedItems={[
	                    	<ListItem primaryText="hello 30" value="/30" />,
	                    	<ListItem primaryText="hello 31" value="/31" />,
	                  	]}
	                />
	              	</SelectableList>

	              	<Divider />
	              
	              	<MenuItem onClick={onLogOut}>
	                  	Logout
	              	</MenuItem>
	          	</div>
    		</Drawer>
    	);
  	}
}

export default AppNavDrawer;














