
import I from 'immutable';
import { createReducer } from 'redux/creator';
import { message } from 'antd';
import { browserHistory } from 'react-router';

import { ajax } from 'utils/request';
import {
    FETCH_ARTICLE_LIST_DATA,
    FETCH_ARTICLE_LIST_DATA_SUCCESS,
    FETCH_ARTICLE_LIST_DATA_FAIL,
    FETCH_ARTICLE_DETAIL_SUCCESS,
    CREATE_ARTICLE,
    CREATE_ARTICLE_SUCCESS,
    CREATE_ARTICLE_FAIL
} from 'redux/action-types';

let defaultState = I.fromJS({
    list: [],
    isFetching: false,
    creating: false
});

export default createReducer(I.fromJS(defaultState), {
    [FETCH_ARTICLE_LIST_DATA](state, action) {
        return state.set('isFetching', true);
    },
    [FETCH_ARTICLE_LIST_DATA_SUCCESS](state, action) {
        return state.set('list', I.fromJS(action.result)).set('isFetching', false);
    },

    [FETCH_ARTICLE_DETAIL_SUCCESS](state, action) {
        if (action.result[0]) {
            return state.set('detail', I.fromJS(action.result[0]));
        }
        return state;
    },
    [CREATE_ARTICLE](state, action) {
        return state.set('creating', true);
    },
    [CREATE_ARTICLE_SUCCESS](state, action) {
        message.success('添加成功');
        return state.set('creating', false);
    },
    [CREATE_ARTICLE_FAIL](state, action) {
        message.warning('添加失败');
        return state.set('creating', false);
    }
});

export function fetch() {
    return {
        types: [FETCH_ARTICLE_LIST_DATA, FETCH_ARTICLE_LIST_DATA_SUCCESS, FETCH_ARTICLE_LIST_DATA_FAIL],
        promise: () => {
            return new Promise((resolve, reject) => {
                ajax({
                    url: '/article/all',
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
        types: [CREATE_ARTICLE, CREATE_ARTICLE_SUCCESS, CREATE_ARTICLE_FAIL],
        promise: () => {
            return new Promise((resolve, reject) => {
                ajax({
                    url: '/article/create',
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
        types: [FETCH_ARTICLE_DETAIL, FETCH_ARTICLE_DETAIL_SUCCESS, FETCH_ARTICLE_DETAIL_FAIL],
        promise: () => {
            return new Promise((resolve, reject) => {
                ajax({
                    url: '/article/query',
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
    return {
        types: [UPDATE_ARTICLE, UPDATE_ARTICLE_SUCCESS, UPDATE_ARTICLE_FAIL],
        promise: () => {
            return new Promise((resolve, reject) => {
                ajax({
                    url: '/article/update',
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
        types: [DELETE_ARTICLE, DELETE_ARTICLE_SUCCESS, DELETE_ARTICLE_FAIL],
        promise: () => {
            return new Promise((resolve, reject) => {
                ajax({
                    url: '/article/delete',
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
