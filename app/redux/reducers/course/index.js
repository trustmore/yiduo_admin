
import I from 'immutable';
import { createReducer, createAction } from 'redux/creator';
import { message } from 'antd';
import { browserHistory } from 'react-router';

import { ajax } from 'utils/request';
import {
    FETCH_COURSE_LIST_DATA,
    FETCH_COURSE_LIST_DATA_SUCCESS,
    FETCH_COURSE_LIST_DATA_FAIL,

    FETCH_COURSE_DETAIL,
    FETCH_COURSE_DETAIL_SUCCESS,
    FETCH_COURSE_DETAIL_FAIL,

    CREATE_COURSE,
    CREATE_COURSE_SUCCESS,
    CREATE_COURSE_FAIL,

    UPDATE_COURSE,
    UPDATE_COURSE_SUCCESS,
    UPDATE_COURSE_FAIL,

    REMOVE_CACHE_COURSE
} from 'redux/action-types';

let defaultState = I.fromJS({
    list: [],
    isFetching: false,
    course: {},
    creating: false
});

export default createReducer(I.fromJS(defaultState), {
    [FETCH_COURSE_LIST_DATA](state, action) {
        return state.set('isFetching', true);
    },
    [FETCH_COURSE_LIST_DATA_SUCCESS](state, action) {
        return state.set('list', I.fromJS(action.result)).set('isFetching', false);
    },

    [FETCH_COURSE_DETAIL_SUCCESS](state, action) {
        console.log('FETCH_COURSE_DETAIL_SUCCESS', action);
        return state.set('course', I.fromJS(action.result));
    },

    [CREATE_COURSE](state, action) {
        return state.set('creating', true);
    },
    [CREATE_COURSE_SUCCESS](state, action) {
        message.success('添加成功');
        return state.set('creating', false);
    },
    [CREATE_COURSE_FAIL](state, action) {
        message.warning('添加失败');
        return state.set('creating', false);
    },

    [UPDATE_COURSE](state, action) {
        return state;
    },
    [UPDATE_COURSE_SUCCESS](state, action) {
        message.success('修改成功');
        return state;
    },
    [UPDATE_COURSE_FAIL](state, action) {
        message.warning('修改失败');
        return state;
    },

    [REMOVE_CACHE_COURSE](state, action) {
        return state.set('course', I.fromJS({}));
    }
});

export const removeCacheCourse = createAction(REMOVE_CACHE_COURSE, 'payload');

export function fetch() {
    return {
        types: [FETCH_COURSE_LIST_DATA, FETCH_COURSE_LIST_DATA_SUCCESS, FETCH_COURSE_LIST_DATA_FAIL],
        promise: () => {
            return new Promise((resolve, reject) => {
                ajax({
                    url: '/course/all',
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
        types: [CREATE_COURSE, CREATE_COURSE_SUCCESS, CREATE_COURSE_FAIL],
        promise: () => {
            return new Promise((resolve, reject) => {
                ajax({
                    url: '/course/create',
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
    return {
        types: [FETCH_COURSE_DETAIL, FETCH_COURSE_DETAIL_SUCCESS, FETCH_COURSE_DETAIL_FAIL],
        promise: () => {
            return new Promise((resolve, reject) => {
                ajax({
                    url: `/course/${id}/detail`,
                    type: 'POST',
                    data: {
                        id
                    },
                    success: response => resolve(response),
                    error: error => reject(error)
                });
            });
        }
    };
}

export function update(params) {
    return {
        types: [UPDATE_COURSE, UPDATE_COURSE_SUCCESS, UPDATE_COURSE_FAIL],
        promise: () => {
            return new Promise((resolve, reject) => {
                ajax({
                    url: '/course/update',
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
    return {
        types: [DELETE_COURSE, DELETE_COURSE_SUCCESS, DELETE_COURSE_FAIL],
        promise: () => {
            return new Promise((resolve, reject) => {
                ajax({
                    url: '/course/delete',
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
