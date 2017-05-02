import React from 'react';
import PropTypes from 'prop-types'

class Welcome extends React.Component {

	constructor(props) {
        super(props);
        for(var prop in this.props)
        {
        	console.log("this.props." + prop + " = " + this.props[prop]);
        }
        this.state = {
    		loaded: props.loaded,
    		data: props.data,
    		token: localStorage.getItem('token'),
        };
    }

	componentDidMount() {
        this.fetchData();
    }

    fetchData() {
        //const token = this.props.token;
        const token = localStorage.getItem('token');
        console.log("token:  " + token);
        this.props.fetchProtectedData(token);
        console.log("this.props.loaded: " + this.props.loaded + " this.state.loaded: " + this.state.loaded);
    }

    render() {
        return (
            <div>
                {!this.props.loaded
                    ? <h1>Loading data...</h1>
                    :
                    <div>
                        <h1 className='container text-center'>Welcome back,
                            {this.props.data.email}!</h1>
                    </div>
                }
            </div>
        );
    }
}

Welcome.propTypes = {
    fetchProtectedData: PropTypes.func,
    loaded: PropTypes.bool,
    userName: PropTypes.string,
    data: PropTypes.any,
    token: PropTypes.string,
}

export default Welcome