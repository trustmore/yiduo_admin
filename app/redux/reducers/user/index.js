
import I from 'immutable';
import { createReducer } from 'redux/creator';

import { ajax } from 'utils/request';
import {
    FETCH_USER_INFO_DATA,
    FETCH_USER_INFO_DATA_SUCCESS,
    FETCH_USER_INFO_DATA_FAIL,
    LOGOUT,
    LOGOUT_SUCCESS,
    LOGOUT_FAIL
} from 'redux/action-types';

let defaultState = I.fromJS({
    user: {},
    isFetching: false
});

export default createReducer(I.fromJS(defaultState), {
    [FETCH_USER_INFO_DATA](state, action) {
        return state.set('isFetching', true);
    },
    [FETCH_USER_INFO_DATA_SUCCESS](state, action) {
        return state.set('user', I.fromJS(action.result)).set('isFetching', false);
    },
    [FETCH_USER_INFO_DATA_FAIL](state, action) {
        return state.set('isFetching', false);
    }
});

export function fetchUserData() {
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

export function logout() {
    return {
        types: [LOGOUT, LOGOUT_SUCCESS, LOGOUT_FAIL],
        promise: () => {
            return new Promise((resolve, reject) => {
                ajax({
                    url: '/logout',
                    type: 'POST',
                    data: {},
                    success: response => resolve(response),
                    error: error => reject(error)
                });
            });
        }
    };
}
