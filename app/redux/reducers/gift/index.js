
import I from 'immutable';
import { createReducer } from 'redux/creator';
import { message } from 'antd';

import { ajax } from 'utils/request';
import {
    FETCH_GIFT,
    FETCH_GIFT_SUCCESS,
    FETCH_GIFT_FAIL,

    CREATE_GIFT,
    CREATE_GIFT_SUCCESS,
    CREATE_GIFT_FAIL,

    UPDATE_GIFT,
    UPDATE_GIFT_SUCCESS,
    UPDATE_GIFT_FAIL,

    REMOVE_GIFT,
    REMOVE_GIFT_SUCCESS,
    REMOVE_GIFT_FAIL
} from 'redux/action-types';

let defaultState = I.fromJS({
    list: [],
    detail: {},
    isFetching: false
});

export default createReducer(I.fromJS(defaultState), {
    [FETCH_GIFT](state, action) {
        return state.set('isFetching', true);
    },
    [FETCH_GIFT_SUCCESS](state, action) {
        console.log('FETCH_GIFT_SUCCESS', action);
        return state.set('list', I.fromJS(action.result)).set('isFetching', false);
    },
    [FETCH_GIFT_FAIL](state, action) {
        return state.set('isFetching', false);
    },

    [CREATE_GIFT_SUCCESS](state, action) {
        let list = state.get('list');
        return state.set('list', list.push(I.fromJS(action.result))).set('isFetching', false);
    },

    [UPDATE_GIFT_SUCCESS](state, action) {
        message.success('修改成功');
        var index = state.get('list').findIndex( item => item.get("_id") === action.result._id );
        return state.setIn(['list', index], I.fromJS(action.result));
    },

    [REMOVE_GIFT_SUCCESS](state, action) {
        const tlist = state.get('list');
        message.success('删除成功');
        return state.set('list', tlist.filter(t => {
            return t.get('_id') !== action.result._id;
        }));
    }
});

export function fetch() {
    return {
        types: [FETCH_GIFT, FETCH_GIFT_SUCCESS, FETCH_GIFT_FAIL],
        promise: () => {
            return new Promise((resolve, reject) => {
                ajax({
                    url: '/gift/all',
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
        types: [CREATE_GIFT, CREATE_GIFT_SUCCESS, CREATE_GIFT_FAIL],
        promise: () => {
            return new Promise((resolve, reject) => {
                ajax({
                    url: '/gift/create',
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
        types: [UPDATE_GIFT, UPDATE_GIFT_SUCCESS, UPDATE_GIFT_FAIL],
        promise: () => {
            return new Promise((resolve, reject) => {
                ajax({
                    url: '/gift/update',
                    type: 'POST',
                    data: params,
                    success: response => resolve(response),
                    error: error => reject(error)
                });
            });
        }
    };
}

export function remove(id) {
    return {
        types: [REMOVE_GIFT, REMOVE_GIFT_SUCCESS, REMOVE_GIFT_FAIL],
        promise: () => {
            return new Promise((resolve, reject) => {
                ajax({
                    url: '/gift/remove',
                    type: 'POST',
                    data: {_id: id},
                    success: response => resolve(response),
                    error: error => reject(error)
                });
            });
        }
    };
}
