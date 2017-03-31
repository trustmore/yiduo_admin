
import I from 'immutable';
import { createReducer } from 'redux/creator';

import { ajax } from 'utils/request';
import {
    FETCH_CLAZZ_LIST_DATA,
    FETCH_CLAZZ_LIST_DATA_SUCCESS,
    FETCH_CLAZZ_LIST_DATA_FAIL
} from 'redux/action-types';

let defaultState = I.fromJS({
    list: [],
    isFetching: false
});

export default createReducer(I.fromJS(defaultState), {
    [FETCH_CLAZZ_LIST_DATA](state, action) {
        return state.set('isFetching', true);
    },
    [FETCH_CLAZZ_LIST_DATA_SUCCESS](state, action) {
        return state.set('list', I.fromJS(action.result)).set('isFetching', false);
    },
    [FETCH_CLAZZ_LIST_DATA_FAIL](state, action) {
        return state.set('isFetching', false);
    }
});

export function fetch() {
    return {
        types: [FETCH_CLAZZ_LIST_DATA, FETCH_CLAZZ_LIST_DATA_SUCCESS, FETCH_CLAZZ_LIST_DATA_FAIL],
        promise: () => {
            return new Promise((resolve, reject) => {
                ajax({
                    url: '/clazz/all',
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
