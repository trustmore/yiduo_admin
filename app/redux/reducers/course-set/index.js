
import I from 'immutable';
import { createReducer } from 'redux/creator';
import { message } from 'antd';

import { ajax } from 'utils/request';
import {
    FETCH_CS_LIST_DATA,
    FETCH_CS_DATA_SUCCESS,
    FETCH_CS_DATA_FAIL,

    UPDATE_CS_DATA,
    UPDATE_CS_DATA_SUCCESS,
    UPDATE_CS_DATA_FAIL,

    FETCH_CS_DETAIL,
    FETCH_CS_DETAIL_SUCCESS,
    FETCH_CS_DETAIL_FAIL,

    CREATE_CS,
    CREATE_CS_SUCCESS,
    CREATE_CS_FAIL,

    CS_ADD_COURSE,
    CS_ADD_COURSE_SUCCESS,
    CS_ADD_COURSE_FAIL,

    CS_REMOVE_COURSE,
    CS_REMOVE_COURSE_SUCCESS,
    CS_REMOVE_COURSE_FAIL
} from 'redux/action-types';

let defaultState = I.fromJS({
    cs: [],
    isFetching: false
});

export default createReducer(I.fromJS(defaultState), {
    [FETCH_CS_DATA_SUCCESS](state, action) {
        return state.set('cs', I.fromJS(action.result)).set('isFetching', false);
    },
    [UPDATE_CS_DATA_SUCCESS](state, action) {
        message.success('修改成功');
        let index = state.get('cs').findIndex( item => item.get("_id") === action.result._id );
        if (action.result.name) {
            return state.setIn(['cs', index, 'name'], I.fromJS(action.result.name));
        }
        return state.setIn(['cs', index, 'courses'], I.fromJS(action.result.courses));
    },
    [CS_ADD_COURSE_SUCCESS](state, action) {
        message.success('添加成功');
        let index = state.get('cs').findIndex( item => item.get("_id") === action.result._id );
        return state.setIn(['cs', index, 'courses'], I.fromJS(action.result.courses));
    },
    [CS_REMOVE_COURSE_SUCCESS](state, action) {
        message.success('移除成功');
        let cid = action.result.key.split(':').pop();
        let _state = state.setIn(['current_cs', 'courses'], state.getIn(['current_cs', 'courses']).filter(c => c.get('_id') != cid));
        let index = _state.get('cs').findIndex( item => item.get("_id") === action.result._id );
        return _state.setIn(['cs', index, 'courses'], I.fromJS(action.result.courses));
    },
    [FETCH_CS_DETAIL_SUCCESS](state, action) {
        return state.set('current_cs', I.fromJS(action.result));
    },
    [CREATE_CS_SUCCESS](state, action) {
        const tlist = state.get('cs');
        return state.set('cs', tlist.push(I.fromJS(action.result)));
    }
});

export function fetch() {
    return {
        types: [FETCH_CS_LIST_DATA, FETCH_CS_DATA_SUCCESS, FETCH_CS_DATA_FAIL],
        promise: () => {
            return new Promise((resolve, reject) => {
                ajax({
                    url: '/cs/all',
                    type: 'POST',
                    data: {},
                    success: response => resolve(response),
                    error: error => reject(error)
                });
            });
        }
    };
}

export function create(data) {
    return {
        types: [CREATE_CS, CREATE_CS_SUCCESS, CREATE_CS_FAIL],
        promise: () => {
            return new Promise((resolve, reject) => {
                ajax({
                    url: '/cs/create',
                    type: 'POST',
                    data,
                    success: response => resolve(response),
                    error: error => reject(error)
                });
            });
        }
    };
}

export function updateCourseSet(data) {
    return {
        types: [UPDATE_CS_DATA, UPDATE_CS_DATA_SUCCESS, UPDATE_CS_DATA_FAIL],
        promise: () => {
            return new Promise((resolve, reject) => {
                ajax({
                    url: '/cs/update',
                    type: 'POST',
                    data,
                    success: response => resolve(response),
                    error: error => reject(error)
                });
            });
        }
    };
}

export function addCourseToCs(data) {
    return {
        types: [CS_ADD_COURSE, CS_ADD_COURSE_SUCCESS, CS_ADD_COURSE_FAIL],
        promise: () => {
            return new Promise((resolve, reject) => {
                ajax({
                    url: '/cs/add/course',
                    type: 'POST',
                    data,
                    success: response => resolve(response),
                    error: error => reject(error)
                });
            });
        }
    };
}

export function removeCsCourse(data) {
    return {
        types: [CS_REMOVE_COURSE, CS_REMOVE_COURSE_SUCCESS, CS_REMOVE_COURSE_FAIL],
        promise: () => {
            return new Promise((resolve, reject) => {
                ajax({
                    url: '/cs/remove/course',
                    type: 'POST',
                    data,
                    success: response => resolve(response),
                    error: error => reject(error)
                });
            });
        }
    };
}

export function fetchOne(id) {
    return {
        types: [FETCH_CS_DETAIL, FETCH_CS_DETAIL_SUCCESS, FETCH_CS_DETAIL_FAIL],
        promise: () => {
            return new Promise((resolve, reject) => {
                ajax({
                    url: `/cs/${id}/detail`,
                    type: 'POST',
                    data: {},
                    success: response => resolve(response),
                    error: error => reject(error)
                });
            });
        }
    };
}
