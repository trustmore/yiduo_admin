
import I from 'immutable';
import { createReducer } from 'redux/creator';

import { ajax } from 'utils/request';
import {
    FETCH_ACCOUNT_LIST_DATA,
    FETCH_ACCOUNT_LIST_DATA_SUCCESS,
    FETCH_ACCOUNT_LIST_DATA_FAIL,

    CREATE_ACCOUNT,
    CREATE_ACCOUNT_SUCCESS,
    CREATE_ACCOUNT_FAIL,

    UPDATE_ACCOUNT,
    UPDATE_ACCOUNT_SUCCESS,
    UPDATE_ACCOUNT_FAIL,

    FETCH_ACCOUNT_DETAIL,
    FETCH_ACCOUNT_DETAIL_SUCCESS,
    FETCH_ACCOUNT_DETAIL_FAIL,

    DELETE_ACCOUNT,
    DELETE_ACCOUNT_SUCCESS,
    DELETE_ACCOUNT_FAIL
} from 'redux/action-types';

let defaultState = I.fromJS({
    list: [],
    isFetching: false,
    detail: null
});

export default createReducer(I.fromJS(defaultState), {
    [FETCH_ACCOUNT_LIST_DATA](state, action) {
        console.log('FETCH_ACCOUNT_LIST_DATA', action.result);
        return state.set('isFetching', true);
    },
    [FETCH_ACCOUNT_LIST_DATA_SUCCESS](state, action) {
        console.log('FETCH_ACCOUNT_LIST_DATA_SUCCESS', action.result);
        return state.set('list', I.fromJS(action.result)).set('isFetching', false);
    },

    [FETCH_ACCOUNT_DETAIL_SUCCESS](state, action) {
        if (action.result[0]) {
            return state.set('detail', I.fromJS(action.result[0]));
        }

        return state;
    }
});

export function fetch() {
    console.log('requestFetchAccountList');
    return {
        types: [FETCH_ACCOUNT_LIST_DATA, FETCH_ACCOUNT_LIST_DATA_SUCCESS, FETCH_ACCOUNT_LIST_DATA_FAIL],
        promise: () => {
            return new Promise((resolve, reject) => {
                ajax({
                    url: '/account/query',
                    type: 'GET',
                    data: {
                        offset: 0,
                        limit: 15
                    },
                    success: response => resolve(response),
                    error: error => reject(error)
                });
            });
        }
    };
}

export function create(params) {
    console.log('requestCreateAccount', params);
    return {
        types: [CREATE_ACCOUNT, CREATE_ACCOUNT_SUCCESS, CREATE_ACCOUNT_FAIL],
        promise: () => {
            return new Promise((resolve, reject) => {
                ajax({
                    url: '/account/create',
                    type: 'POST',
                    data: params,
                    success: response => resolve(response),
                    error: error => reject(error)
                });
            });
        }
    };
}

export function fetchOne(id) {
    console.log('requestFetchAccountDetail', id);
    return {
        types: [FETCH_ACCOUNT_DETAIL, FETCH_ACCOUNT_DETAIL_SUCCESS, FETCH_ACCOUNT_DETAIL_FAIL],
        promise: () => {
            return new Promise((resolve, reject) => {
                ajax({
                    url: '/account/query',
                    type: 'GET',
                    data: {
                        id: parseInt(id)
                    },
                    success: response => resolve(response),
                    error: error => reject(error)
                });
            });
        }
    };
}

export function update(params) {
    console.log('requestUpdateAccount', params);
    return {
        types: [UPDATE_ACCOUNT, UPDATE_ACCOUNT_SUCCESS, UPDATE_ACCOUNT_FAIL],
        promise: () => {
            return new Promise((resolve, reject) => {
                ajax({
                    url: '/account/update',
                    type: 'POST',
                    data: params,
                    success: response => resolve(response),
                    error: error => reject(error)
                });
            });
        }
    };
}

export function deleteOne(id) {
    console.log('requestDeleteAccount', id);
    return {
        types: [DELETE_ACCOUNT, DELETE_ACCOUNT_SUCCESS, DELETE_ACCOUNT_FAIL],
        promise: () => {
            return new Promise((resolve, reject) => {
                ajax({
                    url: '/account/delete',
                    type: 'POST',
                    data: {
                        id: parseInt(id)
                    },
                    success: response => resolve(response),
                    error: error => reject(error)
                });
            });
        }
    };
}
