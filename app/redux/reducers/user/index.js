
import I from 'immutable';
import { createReducer } from 'redux/creator';

import { ajax } from 'utils/request';
import {
    FETCH_USER_INFO_DATA,
    FETCH_USER_INFO_DATA_SUCCESS,
    FETCH_USER_INFO_DATA_FAIL
} from 'redux/action-types';

let defaultState = I.fromJS({
    user: null,
    isFetching: false
});

export default createReducer(I.fromJS(defaultState), {
    [FETCH_USER_INFO_DATA](state, action) {
        console.log('FETCH_USER_INFO_DATA', action.result);
        return state.set('isFetching', true);
    },
    [FETCH_USER_INFO_DATA_SUCCESS](state, action) {
        console.log('FETCH_USER_INFO_DATA_SUCCESS', action.result);
        return state.set('user', I.fromJS(action.result)).set('isFetching', false);
    },
    [FETCH_USER_INFO_DATA_FAIL](state, action) {
        console.log('FETCH_USER_INFO_DATA_FAIL', action.result);
        return state.set('isFetching', false);
    }
});

export function fetchUserData() {
    console.log('get user info');
    return {
        types: [FETCH_USER_INFO_DATA, FETCH_USER_INFO_DATA_SUCCESS, FETCH_USER_INFO_DATA_FAIL],
        promise: () => {
            return new Promise((resolve, reject) => {
                ajax({
                    url: '/user/info',
                    type: 'GET',
                    data: {},
                    success: response => resolve(response),
                    error: error => reject(error)
                });
            });
        }
    };
}
