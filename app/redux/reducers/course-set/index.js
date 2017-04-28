
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
    CREATE_CS_FAIL
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
        var index = state.get('cs').findIndex( item => item.get("_id") === action.result._id );
        if (action.result.name) {
            return state.setIn(['cs', index, 'name'], I.fromJS(action.result.name));
        }
        return state.setIn(['cs', index, 'courses'], I.fromJS(action.result.courses));
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
