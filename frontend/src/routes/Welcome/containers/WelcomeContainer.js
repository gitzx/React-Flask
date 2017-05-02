import { connect } from 'react-redux'
import { fetchProtectedData, fetchProtectedDataRequest, receiveProtectedData } from '../modules/welcome'
import Welcome from '../components/Welcome'


const mapStateToProps = (state) => ({
    data: state.welcome.data,
    token: state.auth.token,
    loaded: state.welcome.loaded,
    isFetching: state.welcome.isFetching
})

const mapDispatchToProps = {
  fetchProtectedData
}

export default connect(mapStateToProps, mapDispatchToProps)(Welcome)
