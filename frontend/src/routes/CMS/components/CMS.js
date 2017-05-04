import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import {
	Table,
  	TableHeaderColumn,
  	TableHeader,
  	TableBody,
  	TableRow,
  	TableRowColumn,
  	TableFooter,
} from 'material-ui/Table';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Item from './Item/index';
import NoContent from 'shared/components/NoContent/index';
import Pagination from 'shared/components/Pagination/index';
import inlineStyles from 'shared/styles/MaterialUI/index';
//import styles from './styles';


class CMS extends Component {

  constructor(props) {
    super(props);
    this.state = { loading: true };


    this.handleToggle = this.handleToggle.bind(this);
    this.handleMovePage = this.handleMovePage.bind(this);
  }

  componentDidMount() {
    this.props.fetchPosts()
      .then(() => {
        this.setState({ loading: false });
      });
  }

  handleToggle(sortRank, postId) {
    this.props.togglePost(sortRank, postId);
  }

  handleMovePage(page) {
    this.props.fetchPosts(page);
  }

  render() {
    if (this.state.loading) {
      return <section />;
    }

    const newButton = (
      <Link to="/postnew">
        <FloatingActionButton style={inlineStyles.floatButton} disableTouchRipple >
          <ContentAdd />
        </FloatingActionButton>
      </Link>
    );

    if (!this.props.posts.length) {
      return (
        <section>
          {newButton}
          <NoContent pageName="posts" />
        </section>
      );
    }

    return (
      <section>
       {newButton}
        <h1 >Post</h1>
        <Table fixedHeader fixedFooter>
          <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
            <TableRow selectable={false}>
              <TableHeaderColumn colSpan="1" style={inlineStyles.headerColumn}>
                ID
              </TableHeaderColumn>
              <TableHeaderColumn colSpan="4" style={inlineStyles.headerColumn}>
                Title
              </TableHeaderColumn>
              <TableHeaderColumn colSpan="1" style={inlineStyles.headerColumn}>
                Status
              </TableHeaderColumn>
              <TableHeaderColumn colSpan="2" style={inlineStyles.headerColumn}>
                Date
              </TableHeaderColumn>
              <TableHeaderColumn colSpan="3" style={inlineStyles.headerColumn}>
                Action
              </TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false}>
            {this.props.posts.map((post, index) => (
              <Item
                {...post}
                key={post.id}
                sortRank={index}
                handleToggle={this.handleToggle}
              />
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableRowColumn>
                <Pagination
                  page={this.props.page}
                  total={this.props.total}
                  limit={this.props.limit}
                  handlePageClick={this.handleMovePage}
                />
              </TableRowColumn>
            </TableRow>
          </TableFooter>
        </Table>
      </section>
    );
  }
}

CMS.propTypes = {
	posts: PropTypes.arrayOf(
	    PropTypes.shape({
	    	title: PropTypes.string.isRequired,
	      	publishedAt: PropTypes.string,
	      	status: PropTypes.number.isRequired,
	      	accepted: PropTypes.bool.isRequired,
	    }).isRequired
  	).isRequired,
  	page: PropTypes.number.isRequired,
  	limit: PropTypes.number.isRequired,
  	total: PropTypes.number.isRequired,
  	fetchPosts: PropTypes.func.isRequired,
  	togglePost: PropTypes.func.isRequired
};

export default CMS