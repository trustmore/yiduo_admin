
import I from 'immutable';
import { createReducer } from 'redux/creator';
import { message } from 'antd';
import { browserHistory } from 'react-router';

import { ajax } from 'utils/request';
import {
    FETCH_TEACHER_LIST_DATA,
    FETCH_TEACHER_LIST_DATA_SUCCESS,
    FETCH_TEACHER_LIST_DATA_FAIL
} from 'redux/action-types';

let defaultState = I.fromJS({
    list: [],
    isFetching: false
});

export default createReducer(I.fromJS(defaultState), {
    [FETCH_TEACHER_LIST_DATA](state, action) {
        console.log('FETCH_TEACHER_LIST_DATA', action.result);
        return state.set('isFetching', true);
    },
    [FETCH_TEACHER_LIST_DATA_SUCCESS](state, action) {
        console.log('FETCH_TEACHER_LIST_DATA_SUCCESS', action.result);
        return state.set('list', I.fromJS(action.result)).set('isFetching', false);
    },

    [FETCH_TEACHER_LIST_DATA_FAIL](state, action) {
        if (action.result[0]) {
            return state.set('detail', I.fromJS(action.result[0]));
        }
        return state;
    }
});

export function fetch() {
    console.log('FETCH_TEACHER_LIST_DATA');
    return {
        types: [FETCH_TEACHER_LIST_DATA, FETCH_TEACHER_LIST_DATA_SUCCESS, FETCH_TEACHER_LIST_DATA_FAIL],
        promise: () => {
            return new Promise((resolve, reject) => {
                ajax({
                    url: '/teacher/all',
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
