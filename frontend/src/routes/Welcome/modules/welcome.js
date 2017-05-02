import { parseJSON, createReducer } from 'shared/utils/misc';
import { data_about_user } from 'shared/utils/http_functions';

// ------------------------------------
// Constants
// ------------------------------------
export const FETCH_PROTECTED_DATA_REQUEST = 'FETCH_PROTECTED_DATA_REQUEST';
export const RECEIVE_PROTECTED_DATA = 'RECEIVE_PROTECTED_DATA';

// ------------------------------------
// Actions
// ------------------------------------

export function receiveProtectedData(data) {
    return {
        type: RECEIVE_PROTECTED_DATA,
        payload: {
            data,
        },
    };
}

export function fetchProtectedDataRequest() {
    return {
        type: FETCH_PROTECTED_DATA_REQUEST,
    };
}

export function fetchProtectedData(token) {
    return (dispatch) => {
        dispatch(fetchProtectedDataRequest());
        data_about_user(token)
            .then(parseJSON)
            .then(response => {
                try{
                    dispatch(receiveProtectedData(response.result));
                }
                catch (e) {
                    alert(e);
                }
            })
            .catch(error => {
                if (error.status === 401) {
                    //dispatch(logoutAndRedirect(error));
                    console.log("error.status: " + error.status);
                }
            });
    };
}



export const actions = {
  receiveProtectedData,
  fetchProtectedDataRequest,
  fetchProtectedData
}

// ------------------------------------
// Action Handlers
// ------------------------------------


// ------------------------------------
// Reducer
// ------------------------------------

const initialState = {
    data: null,
    isFetching: false,
    loaded: false,
};

export default createReducer(initialState, {
    [RECEIVE_PROTECTED_DATA]: (state, payload) =>
        Object.assign({}, state, {
            data: payload.data,
            isFetching: false,
            loaded: true,
        }),
    [FETCH_PROTECTED_DATA_REQUEST]: (state) =>
        Object.assign({}, state, {
            isFetching: true,
        }),
});
