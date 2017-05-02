import { connect } from 'react-redux'
import { registerUser } from '../modules/register'
import Register from '../components/Register'


const mapStateToProps = (state) => ({
  isRegistering: state.register.isRegistering,
  registerStatusText: state.register.registerStatusText
})

const mapDispatchToProps = {
  registerUser
}

export default connect(mapStateToProps, mapDispatchToProps)(Register)
