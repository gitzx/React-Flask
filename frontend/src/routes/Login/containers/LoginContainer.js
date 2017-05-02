import { connect } from 'react-redux'
import { loginUser } from '../modules/login'
import Login from '../components/Login'


const mapStateToProps = (state) => ({
  isAuthenticating: state.auth.isAuthenticating,
  statusText: state.auth.statusText,
  isAuthenticated: state.auth.isAuthenticated,
  userName: state.auth.userName,
  token: state.auth.token
})

const mapDispatchToProps = {
  loginUser
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
