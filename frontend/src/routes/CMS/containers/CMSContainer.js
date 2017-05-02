import { connect } from 'react-redux'
import { fetchPosts, togglePost } from '../modules/cms'
import CMS from '../components/CMS'


const mapStateToProps = (state) => ({
	posts: state.cms.posts,
    page: state.cms.page,
    limit: state.cms.limit,
    total: state.cms.total
})

const mapDispatchToProps = {
	fetchPosts, 
	togglePost 
}

export default connect(mapStateToProps, mapDispatchToProps)(CMS)
