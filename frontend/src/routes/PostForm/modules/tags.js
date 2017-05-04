import { createReducer } from 'shared/utils/misc';

// ------------------------------------
// Constants
// ------------------------------------
export const FETCH_TAGS = 'FETCH_TAGS';
export const FETCH_TAGS_FORM = 'FETCH_TAGS_FORM';
export const CREATE_TAG = 'CREATE_TAG';
export const DELETE_TAG = 'DELETE_TAG';

// ------------------------------------
// Actions
// ------------------------------------
export function fetchTags(tags) {
    return {
        type: FETCH_TAGS,
        payload: { tags },
    };
}

export function fetchTagsForm(response) {
    return {
        type: FETCH_TAGS_FORM,
        payload: {
            tags: response.tags,
            tagSuggestions: response.tagSuggestions,
        },
    };
}

export function createTag(tag) {
    return {
        type: CREATE_TAG,
        payload: { tag },
    };
}

export function deleteTag(sortRank) {
    return {
        type: DELETE_TAG,
        payload: { sortRank },
    };
}

export const actions = {
    fetchTags,
    fetchTagsForm,
    createTag,
    deleteTag
}

// ------------------------------------
// Action Handlers
// ------------------------------------

// ------------------------------------
// Reducer
// ------------------------------------

const INITIAL_STATE = { tags: [], tagSuggestions: [] };

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_TAGS:
      //tags -> [{id:1, name:'tag' }]
      return { tags: action.payload.tags };

    case FETCH_TAGS_FORM:
      //tags -> [ {id:1, text:'tag' }]
      return { ...state, tags: action.payload.tags, tagSuggestions: action.payload.tagSuggestions };

    case CREATE_TAG:
      return { ...state, tags: [...state.tags, action.payload.tag] };
    
    case DELETE_TAG:
      const tags = [...state.tags.slice(0, action.payload.sortRank), ...state.tags.slice(action.payload.sortRank + 1)];
      return { ...state, tags };
    
    default:
      return state;
  }
}
