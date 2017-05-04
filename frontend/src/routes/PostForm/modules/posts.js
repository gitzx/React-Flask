import { fetchTagsForm } from './tags';
import { fetchItems } from './items';

import { createAuthorizedRequest, trimPost  } from 'shared/utils/http_functions';
import { browserHistory } from 'react-router';
const POST_PATH = '/api/cms';

// ------------------------------------
// Constants
// ------------------------------------
export const FETCH_NEW_POST_SUCCESS = 'FETCH_NEW_POST_SUCCESS';
export const FETCH_EDIT_POST_SUCCESS = 'FETCH_EDIT_POST_SUCCESS';
export const SAVE_POST_SUCCESS = 'SAVE_POST_SUCCESS';
export const SAVE_POST_FAILURE= 'SAVE_POST_FAILURE';

// ------------------------------------
// Actions
// ------------------------------------
function fetchNewPostSuccess(response) {
  return {
    type: FETCH_NEW_POST.SUCCESS,
    payload: {
      items: [],
      tags: {
        tags: [],
        tagSuggestions: response.tagSuggestions,
      },
    },
  };
}

export function fetchNewPost() {
  const request = createAuthorizedRequest('get', `${POST_PATH}/new`);
  return dispatch => {
    return request
      .then(response => dispatch(fetchNewPostSuccess(response.data)))
      .then(response => {
        dispatch(fetchItems(response.payload.items));
        dispatch(fetchTagsForm(response.payload.tags));
      });
  };
}


function fetchEditPostSuccess(response) {
  return {
    type: FETCH_EDIT_POST.SUCCESS,
    payload: {
      postForm: {
        id: response.id,
        title: response.title,
        leadSentence: response.leadSentence,
        publishedAt: response.publishedAt,
      },
      items: response.items,
      tags: {
        tags: response.tags,
        tagSuggestions: response.tagSuggestions,
      },
    },
  };
}

export function fetchEditPost(id) {
  const request = createAuthorizedRequest('get', `${POST_PATH}/${id}/edit`);
  return dispatch => {
    return request
      .then(response => dispatch(fetchEditPostSuccess(response.data)))
      .then((response) => {
        dispatch(fetchItems(response.payload.items));
        dispatch(fetchTagsForm(response.payload.tags));
      });
  };
}


export function savePostRequest() {
  return {
    type: SAVE_POST.REQUEST,
  };
}

function savePostSuccess() {
  return {
    type: SAVE_POST.SUCCESS,
  };
}

function savePostFailure({ errorMessage }) {
  return {
    type: SAVE_POST.FAILURE,
    payload: { errorMessage },
  };
}

export function savePost(props) {
  const post = trimPost(props.post);
  let request;
  if (props.post.id) {
    request = createAuthorizedRequest('patch', `${POST_PATH}/${post.id}`, { post });
  } else {
    request = createAuthorizedRequest('post', `${POST_PATH}`, { post });
  }
  return dispatch => {
    dispatch(savePostRequest());
    return (
      request
        .then(() => dispatch(savePostSuccess()))
        .then(() => browserHistory.push('/cms'))
        .catch(error => dispatch(savePostFailure(error.data)))
    );
  };
}

export const actions = {
}

// ------------------------------------
// Action Handlers
// ------------------------------------

// ------------------------------------
// Reducer
// ------------------------------------

const INITIAL_STATE = { 
  posts: [],
  loading: false,
  limit: 20, 
  page: 1, 
  total: 0,
  post: { title: '', publishedAt: '' },
  postForm: { },
  errorMessage: ''
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_EDIT_POST_SUCCESS:
      return { ...state, postForm: action.payload.postForm, errorMessage: '' };
    
    case FETCH_NEW_POST_SUCCESS:
    case SAVE_POST_SUCCESS:
      return { ...state, postForm: {}, errorMessage: '' };

    case SAVE_POST_FAILURE:
      return { ...state, errorMessage: action.payload.errorMessage };
    
    default:
      return state;
  }
}