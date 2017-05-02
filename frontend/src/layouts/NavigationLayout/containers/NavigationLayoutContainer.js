import { connect } from 'react-redux'
import { logoutAndRedirect } from 'routes/Login/modules/login'
import NavigationLayout from '../components/NavigationLayout'


const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated
})

const mapDispatchToProps = {
  logoutAndRedirect
}

export default connect(mapStateToProps, mapDispatchToProps)(NavigationLayout)
