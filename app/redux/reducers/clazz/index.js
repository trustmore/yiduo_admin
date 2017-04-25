
import I from 'immutable';
import { createReducer } from 'redux/creator';
import { message } from 'antd';

import { ajax } from 'utils/request';
import {
    FETCH_CLAZZ_LIST_DATA,
    FETCH_CLAZZ_LIST_DATA_SUCCESS,
    FETCH_CLAZZ_LIST_DATA_FAIL,
    CREATE_CLAZZ,
    CREATE_CLAZZ_SUCCESS,
    CREATE_CLAZZ_FAIL,
    UPDATE_CLAZZ,
    UPDATE_CLAZZ_SUCCESS,
    UPDATE_CLAZZ_FAIL
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
    },
    [CREATE_CLAZZ_SUCCESS](state, action) {
        console.log('CREATE_CLAZZ_SUCCESS', action);
        const tlist = state.get('list');
        return state.set('cs', tlist.push(I.fromJS(action.result)));
    },
    [UPDATE_CLAZZ_SUCCESS](state, action) {
        console.log('UPDATE_CLAZZ_SUCCESS', action);
        message.success('修改成功');
        var index = state.get('list').findIndex( item => item.get("_id") === action.result._id );
        console.log('reducers', index, action.result);
        return state.setIn(['list', index], I.fromJS(action.result));
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

export function create(params) {
    return {
        types: [CREATE_CLAZZ, CREATE_CLAZZ_SUCCESS, CREATE_CLAZZ_FAIL],
        promise: () => {
            return new Promise((resolve, reject) => {
                ajax({
                    url: '/clazz/create',
                    type: 'POST',
                    data: params,
                    success: response => resolve(response),
                    error: error => reject(error)
                });
            });
        }
    };
}

export function update(params) {
    return {
        types: [UPDATE_CLAZZ, UPDATE_CLAZZ_SUCCESS, UPDATE_CLAZZ_FAIL],
        promise: () => {
            return new Promise((resolve, reject) => {
                ajax({
                    url: '/clazz/update',
                    type: 'POST',
                    data: params,
                    success: response => resolve(response),
                    error: error => reject(error)
                });
            });
        }
    };
}
