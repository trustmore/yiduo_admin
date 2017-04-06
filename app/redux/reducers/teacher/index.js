
import I from 'immutable';
import { createReducer } from 'redux/creator';
import { message } from 'antd';
import { browserHistory } from 'react-router';

import { ajax } from 'utils/request';
import {
    FETCH_TEACHER_LIST_DATA,
    FETCH_TEACHER_LIST_DATA_SUCCESS,
    FETCH_TEACHER_LIST_DATA_FAIL,
    CREATE_TEACHER,
    CREATE_TEACHER_SUCCESS,
    CREATE_TEACHER_FAIL,
    DELETE_TEACHER,
    DELETE_TEACHER_SUCCESS,
    DELETE_TEACHER_FAIL
} from 'redux/action-types';

let defaultState = I.fromJS({
    list: [],
    isFetching: false
});

export default createReducer(I.fromJS(defaultState), {
    [FETCH_TEACHER_LIST_DATA](state, action) {
        return state.set('isFetching', true);
    },
    [FETCH_TEACHER_LIST_DATA_SUCCESS](state, action) {
        return state.set('list', I.fromJS(action.result)).set('isFetching', false);
    },
    [FETCH_TEACHER_LIST_DATA_FAIL](state, action) {
        if (action.result[0]) {
            return state.set('detail', I.fromJS(action.result[0]));
        }
        return state;
    },

    [CREATE_TEACHER](state, action) {
        return state;
    },
    [CREATE_TEACHER_SUCCESS](state, action) {
        const tlist = state.get('list');
        return state.set('list', tlist.push(I.fromJS(action.result)));
    },
    [CREATE_TEACHER_FAIL](state, action) {
        return state;
    },

    [DELETE_TEACHER](state, action) {
        return state;
    },
    [DELETE_TEACHER_SUCCESS](state, action) {
        const tlist = state.get('list');
        message.success('删除成功');
        return state.set('list', tlist.filter(t => {
            return t.get('_id') !== action.result._id;
        }));
    },
    [DELETE_TEACHER_FAIL](state, action) {
        return state;
    }
});

export function fetch() {
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

export function create(params) {
    return {
        types: [CREATE_TEACHER, CREATE_TEACHER_SUCCESS, CREATE_TEACHER_FAIL],
        promise: () => {
            return new Promise((resolve, reject) => {
                ajax({
                    url: '/teacher/create',
                    type: 'POST',
                    data: params,
                    success: response => resolve(response),
                    error: error => reject(error)
                });
            });
        }
    };
}

export function remove(params) {
    return {
        types: [DELETE_TEACHER, DELETE_TEACHER_SUCCESS, DELETE_TEACHER_FAIL],
        promise: () => {
            return new Promise((resolve, reject) => {
                ajax({
                    url: '/teacher/delete',
                    type: 'POST',
                    data: params,
                    success: response => resolve(response),
                    error: error => reject(error)
                });
            });
        }
    };
}
