import React from 'react'
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import { validateEmail } from 'shared/utils/misc';
import { browserHistory } from 'react-router';

const style = {
    marginTop: 50,
    paddingBottom: 50,
    paddingTop: 25,
    width: '100%',
    textAlign: 'center',
    display: 'inline-block',
};

class Login extends React.Component {

    constructor(props) {
        super(props);
        for(var prop in this.props)
        {
            console.log("this.props." + prop + " = " + this.props[prop]);
        }
        const redirectRoute = '/login';
        this.state = {
            token: props.token,
            email: props.email,
            isAuthenticated: props.isAuthenticated,
            isAuthenticating: props.isAuthenticating,
            statusText: props.statusText,

            password: '',
            email_error_text: null,
            password_error_text: null,
            redirectTo: redirectRoute,
            disabled: true,
        };
    }

    isDisabled() {
        let email_is_valid = false;
        let password_is_valid = false;

        if (this.state.email === '') {
            this.setState({
                email_error_text: null,
            });
        } else if (validateEmail(this.state.email)) {
            email_is_valid = true;
            this.setState({
                email_error_text: null,
            });

        } else {
            this.setState({
                email_error_text: '邮箱格式不对！',
            });
        }

        if (this.state.password === '' || !this.state.password) {
            this.setState({
                password_error_text: null,
            });
        } else if (this.state.password.length >= 6) {
            password_is_valid = true;
            this.setState({
                password_error_text: null,
            });
        } else {
            this.setState({
                password_error_text: '密码至少六个字符！',
            });

        }

        if (email_is_valid && password_is_valid) {
            this.setState({
                disabled: false,
            });
        }

    }

    changeValue(e, type) {
        const value = e.target.value;
        const next_state = {};
        next_state[type] = value;
        this.setState(next_state, () => {
            this.isDisabled();
        });
    }

    _handleKeyPress(e) {
        if (e.key === 'Enter') {
            if (!this.state.disabled) {
                this.login(e);
            }
        }
    }

    redirectRegister(){
      browserHistory.push('/register');
    }

    register(e) {
        e.preventDefault();
        this.redirectRegister();
    }

    login(e) {
        e.preventDefault();
        this.props.loginUser(this.state.email, this.state.password, this.state.redirectTo);
    }

    render() {
        return (
            <div className="col-md-6 col-md-offset-3" onKeyPress={(e) => this._handleKeyPress(e)}>
                <Paper style={style}>
                    <form role="form">
                        <div className="text-center">
                            <h2>账号登录</h2>
                            {
                                this.props.statusText &&
                                    <div className="alert alert-info">
                                        {this.props.statusText}
                                    </div>
                            }

                            <div className="col-md-12">
                                <TextField
                                  hintText="Email"
                                  floatingLabelText="Email"
                                  type="email"
                                  errorText={this.state.email_error_text}
                                  onChange={(e) => this.changeValue(e, 'email')}
                                />
                            </div>
                            <div className="col-md-12">
                                <TextField
                                  hintText="Password"
                                  floatingLabelText="Password"
                                  type="password"
                                  errorText={this.state.password_error_text}
                                  onChange={(e) => this.changeValue(e, 'password')}
                                />
                            </div>

                            <RaisedButton
                              style={{ marginTop: 50 }}
                              label="Register"
                              onClick={(e) => this.register(e)}
                            />

                            <RaisedButton
                              disabled={this.state.disabled}
                              style={{ marginLeft: 40 }}
                              label="Submit"
                              onClick={(e) => this.login(e)}
                            />

                        </div>
                    </form>
                </Paper>

            </div>
        );

    }
}

Login.propTypes = {
  loginUser: React.PropTypes.func,
  isAuthenticated: React.PropTypes.bool, 
  isAuthenticating: React.PropTypes.bool, 
  statusText: React.PropTypes.string
}

export default Login
