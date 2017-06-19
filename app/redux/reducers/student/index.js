
import I from 'immutable';
import { createReducer } from 'redux/creator';
import { message } from 'antd';
import { browserHistory } from 'react-router';

import { ajax } from 'utils/request';
import {
    FETCH_STUDENT_LIST_DATA,
    FETCH_STUDENT_LIST_DATA_SUCCESS,
    FETCH_STUDENT_LIST_DATA_FAIL,

    CREATE_STUDENT,
    CREATE_STUDENT_SUCCESS,
    CREATE_STUDENT_FAIL,

    UPDATE_STUDENT,
    UPDATE_STUDENT_SUCCESS,
    UPDATE_STUDENT_FAIL,

    FETCH_STUDENT_DETAIL,
    FETCH_STUDENT_DETAIL_SUCCESS,
    FETCH_STUDENT_DETAIL_FAIL,

    DELETE_STUDENT,
    DELETE_STUDENT_SUCCESS,
    DELETE_STUDENT_FAIL,

    MARK_STUDENT,
    MARK_STUDENT_SUCCESS,
    MARK_STUDENT_FAIL
} from 'redux/action-types';

let defaultState = I.fromJS({
    list: [],
    isFetching: false,
    detail: {},
    creating: false
});

export default createReducer(I.fromJS(defaultState), {
    [FETCH_STUDENT_LIST_DATA](state, action) {
        return state.set('isFetching', true);
    },
    [FETCH_STUDENT_LIST_DATA_SUCCESS](state, action) {
        return state.set('list', I.fromJS(action.result)).set('isFetching', false);
    },
    [FETCH_STUDENT_LIST_DATA_FAIL](state, action) {
        return state;
    },

    [CREATE_STUDENT](state, action) {
        return state.set('creating', true);
    },
    [CREATE_STUDENT_SUCCESS](state, action) {
        message.success('添加成功');
        const tlist = state.get('list');
        return state.set('list', tlist.push(I.fromJS(action.result)));
    },
    [CREATE_STUDENT_FAIL](state, action) {
        message.warning('添加失败');
        return state.set('creating', false);
    },

    [DELETE_STUDENT](state, action) {
        return state;
    },
    [DELETE_STUDENT_SUCCESS](state, action) {
        const tlist = state.get('list');
        message.success('删除成功');
        return state.set('list', tlist.filter(t => {
            return t.get('_id') !== action.result._id;
        }));
    },
    [DELETE_STUDENT_FAIL](state, action) {
        return state;
    },

    [FETCH_STUDENT_DETAIL](state, action) {
        return state.set('isFetching', true);
    },
    [FETCH_STUDENT_DETAIL_SUCCESS](state, action) {
        return state.set('detail', I.fromJS(action.result)).set('isFetching', false);
    },
    [FETCH_STUDENT_DETAIL_FAIL](state, action) {
        return state.set('isFetching', false);
    },

    [UPDATE_STUDENT_SUCCESS](state, action) {
        message.success('修改成功');
        let index = state.get('list').findIndex( item => item.get("_id") === action.result._id );
        return state.setIn(['list', index], I.fromJS(action.result));
    },
    [MARK_STUDENT_SUCCESS](state, action) {
        message.success('修改成功');
        var index = state.getIn(['detail', 'stucourses']).findIndex( item => item.get("_id") === action.result._id );
        if (index >= 0){
            return state.setIn(['detail', 'stucourses', index], I.fromJS(action.result));
        }
        let tmp = state.getIn(['detail', 'stucourses']);
        return state.setIn(['detail', 'stucourses'], tmp.push(I.fromJS(action.result)));
    },
    [MARK_STUDENT](state, action) {
        return state;
    }
});

export function fetch() {
    return {
        types: [FETCH_STUDENT_LIST_DATA, FETCH_STUDENT_LIST_DATA_SUCCESS, FETCH_STUDENT_LIST_DATA_FAIL],
        promise: () => {
            return new Promise((resolve, reject) => {
                ajax({
                    url: '/student/all',
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
        types: [CREATE_STUDENT, CREATE_STUDENT_SUCCESS, CREATE_STUDENT_FAIL],
        promise: () => {
            return new Promise((resolve, reject) => {
                ajax({
                    url: '/student/create',
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
        types: [FETCH_STUDENT_DETAIL, FETCH_STUDENT_DETAIL_SUCCESS, FETCH_STUDENT_DETAIL_FAIL],
        promise: () => {
            return new Promise((resolve, reject) => {
                ajax({
                    url: `/student/${id}/detail`,
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
        types: [UPDATE_STUDENT, UPDATE_STUDENT_SUCCESS, UPDATE_STUDENT_FAIL],
        promise: () => {
            return new Promise((resolve, reject) => {
                ajax({
                    url: '/student/update',
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
        types: [DELETE_STUDENT, DELETE_STUDENT_SUCCESS, DELETE_STUDENT_FAIL],
        promise: () => {
            return new Promise((resolve, reject) => {
                ajax({
                    url: '/student/delete',
                    type: 'POST',
                    data: params,
                    success: response => resolve(response),
                    error: error => reject(error)
                });
            });
        }
    };
}

export function mark(params) {
    return {
        types: [MARK_STUDENT, MARK_STUDENT_SUCCESS, MARK_STUDENT_FAIL],
        promise: () => {
            return new Promise((resolve, reject) => {
                ajax({
                    url: '/student/mark',
                    type: 'POST',
                    data: params,
                    success: response => resolve(response),
                    error: error => reject(error)
                });
            });
        }
    };
}
