import React, { Component, PropTypes } from 'react';
import { browserHistory } from 'react-router';
import AppBar from 'material-ui/AppBar';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import Divider from 'material-ui/Divider';
import {spacing, typography, zIndex} from 'material-ui/styles';
import {cyan500} from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import AppNavDrawer from './AppNavDrawer';
import IconButton from 'material-ui/IconButton';
import NotificationsIcon from 'material-ui/svg-icons/social/notifications';


class NavigationLayout extends React.Component{
	constructor(props) {
        super(props);
        this.state = {
            open: false,
        };
    }

	static propTypes = {
		location: PropTypes.object,
	};

    static contextTypes = {
        router: React.PropTypes.object.isRequired,
    };

    static childContextTypes = {
        muiTheme: PropTypes.object,
    };

    getChildContext() {
        return {
            muiTheme: this.state.muiTheme,
        };
    }

    componentWillMount() {
        this.setState({
            muiTheme: getMuiTheme(),
        });
    }

  componentWillReceiveProps(nextProps, nextContext) {
    const newMuiTheme = nextContext.muiTheme ? nextContext.muiTheme : this.state.muiTheme;
    this.setState({
      muiTheme: newMuiTheme,
    });
  }

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
            appBar: {
                position: 'fixed',
                // Needed to overlap the examples
                zIndex: this.state.muiTheme.zIndex.appBar + 1,
                top: 0,
            },
        };
        return styles;
    }

    handleChangeList = (event, value) => {
        this.context.router.push(value);
        this.setState({
            open: false,
        });
    };

    dispatchNewRoute(route) {
        browserHistory.push(route);
        this.setState({
            open: false,
        });

    }

    logout(e) {
        e.preventDefault();
        this.props.logoutAndRedirect();
        this.setState({
            open: false,
        });
    }

    openNav() {
        this.setState({
            open: true,
        });
    }

    closeNav() {
        this.setState({
            open: false,
        });
    }

    render(){
        const styles = this.getStyles();
        return (
            <header>
                <AppBar
                   showMenuIconButton = {true}
                   title = "Hello"
                   //styles = {styles.appBar}
                   zDepth = {0}
                   onLeftIconButtonTouchTap = {() => this.openNav()}
                   iconElementRight={
                      //<FlatButton label="Home" onClick={() => this.dispatchNewRoute('/main')} />
                      <IconButton tooltip="Hello World"  onClick={() => this.dispatchNewRoute('/counter')}>
                        <NotificationsIcon />
                      </IconButton>
                    }
                />
                <AppNavDrawer
                    location={location}
                    docked={false}
                    open={this.state.open}
                    isAuthenticated={this.props.isAuthenticated}
                    onRequestChangeNavDrawer={() => this.closeNav()}
                    onChangeList={this.handleChangeList}
                    onLogOut={(e) => this.logout(e)}
                />
            </header>
        );
    }
}

NavigationLayout.propTypes = {
    logoutAndRedirect: React.PropTypes.func,
    isAuthenticated: React.PropTypes.bool,
};

export default NavigationLayout















