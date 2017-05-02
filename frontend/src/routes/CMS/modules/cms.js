import jwtDecode from 'jwt-decode';
import { parseJSON, createReducer } from 'shared/utils/misc';
import { get_token } from 'shared/utils/http_functions';
import { browserHistory } from 'react-router';
//import { createRequestTypes } from 'shared/utils/misc';
import { createAuthorizedRequest } from 'shared/utils/http_functions';

// ------------------------------------
// Constants
// ------------------------------------
export const FETCH_POSTS_SUCCESS = 'FETCH_POSTS_SUCCESS';
export const TOGGLE_POST_SUCCESS = 'TOGGLE_POST_SUCCESS';
const POST_PATH = '/api/cms';

// ------------------------------------
// Actions
// ------------------------------------

function fetchPostsSuccess(response) {
  return {
    type: FETCH_POSTS_SUCCESS,
    payload: {
      posts: response.posts,
      total: response.meta.pagination.total,
      page: response.meta.pagination.page,
      limit: response.meta.pagination.limit,
    },
  };
}

export function fetchPosts(page = 1) {
    //const request = createAuthorizedRequest('get', `${POST_PATH}?page=${page}`);
    const request = createAuthorizedRequest('get', `${POST_PATH}?page=${page}`);
    return dispatch => {
        return (
            request
                .then(response => dispatch(fetchPostsSuccess(response.data)))
        );
    };
}

function togglePostSuccess(sortRank, response) {
  return {
    type: TOGGLE_POST.SUCCESS,
    payload: {
      sortRank,
      status: response.status,
      accepted: response.accepted,
    },
  };
}

export function togglePost(sortRank, id) {
  const request = createAuthorizedRequest('patch', `${POST_PATH}/${id}/acceptance`);
  return dispatch => {
    return (
      request
        .then(response => dispatch(togglePostSuccess(sortRank, response.data)))
    );
  };
}

export const actions = {
  fetchPostsSuccess,
  fetchPosts,
  togglePostSuccess,
  togglePost
}

// ------------------------------------
// Action Handlers
// ------------------------------------

// ------------------------------------
// Reducer
// ------------------------------------

const initialState =  { 
  posts: [],
  limit: 20, 
  page: 1, 
  total: 0
};

export default createReducer(initialState, {
    [FETCH_POSTS_SUCCESS]: (state, payload) =>
        Object.assign({}, state, {
            posts: payload.posts,
            limit: payload.limit,
            page: payload.page,
            total: payload.total
        }),
    [TOGGLE_POST_SUCCESS]: (state, payload) =>
        Object.assign({}, state, {
            posts: []
        }),
});
