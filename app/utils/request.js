import _ from 'lodash';
import superagent from 'superagent';
import Cookies from 'cookies-js';

function makeUrl(url) {
    let host = '/api';
    return host + url;
}
let _getToken = () => {
    return Cookies.get('_authenticated');
}


/**
 * @this {function}
 * @param {string} ops.type
 * @param {string} ops.dataType
 * @param {string} ops.contentType
 * @param {string} ops.url
 * @param {json} ops.data
 * @param {function} ops.error
 * @param {function} ops.success
 */
export const ajax = (ops = {}) => {
    const options = {
        url: ops.url,
        type: (ops.type || 'GET').toUpperCase(),
        headers: ops.headers,
        dataType: ops.dataType || 'json',
        data: ops.data || {},
        contentType: ops.contentType || 'application/x-www-form-urlencoded',
        error: ops.error,
        success: ops.success
    };
    let token = _getToken() || '';
    let request = superagent(options.type, makeUrl(options.url))
        .set('Content-Type', options.contentType)
        .set('Authorization', token)
        .accept('application/json')
        .on('error', (err) => {
            return options.error ? options.error(err) : null;
        });

    // 请求参数
    if (options.type === 'GET') {
        options.data.t = new Date().getTime();
        request.query(options.data);
    } else {
        request.send(options.data);
    }

    if (options.headers) {
        for (let key in options.headers) {
            request.set(key, options.headers[key]);
        }
    }

    return request.end((err, res) => {
        if (err) {
            if (res.status === 401) {
                return window.location.href = '/signin';;
            }
            return options.error ? options.error(err, res) : null;
        }

        if (res.status >= 200 && res.status < 300) {
            return options.success ? options.success(res.body) : null;
        }

        return options.error ? options.error(err, res) : null;
    });
};

export const upload = (options) => {
    let request = superagent.post(options.url);

    for (let name in options.data) {
        request = request.field(name, options.data[name]);
    }

    return request.attach('file', options.file)
        .on('progress', e => {
            return options.progress ? options.progress(e) : null;
        })
        .end((err, res) => {
            if (err) {
                return options.error ? options.error(err, res) : null;
            }

            if (res.status >= 200 && res.status < 300) {
                return options.success ? options.success(res.body) : null;
            }

            return options.error ? options.error(err, res) : null;
        });
};

export const encodeObjectToQuery = data => {
    let obj = data || {};
    let params = [];
    _.forEach(obj, (val, key) => {
        if (_.isArray(val) && val.length > 0) {
            params.push(val.map((v) => `${key}=${encodeURIComponent(v)}`).join('&'));
        } else if (_.isString(val) || _.isNumber(val) || _.isBoolean(val)) {
            if (val && val !== '') {
                params.push(`${key}=${encodeURIComponent(val)}`);
            }
            if (val === 0 || val === false) {
                params.push(`${key}=${encodeURIComponent(val)}`);
            }
        } else if (_.isObject(val) && !_.isEmpty(val)) {
            params.push(`${key}=${JSON.stringify(val)}`);
        }
    });
    return params.join('&');
};

export const getToken = _getToken;
