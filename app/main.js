import I from 'immutable';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { syncHistoryWithStore } from 'react-router-redux';
import { Router, browserHistory } from 'react-router';
import { fetchUserData } from 'redux/reducers/user';

import moment from 'moment';
moment.locale('zh-cn');

import initStore from './redux/init';

(async() => {
    const routes = require('./route');

    let createElement = (Component, props) => {
        return <Component {...props} />;
    };

    const store = initStore(I.fromJS({}));
    let lastRoute = null;
    let lastRouteJS = null;

    // https://hashnode.com/post/how-to-use-react-router-redux-with-immutablejs-ciserp17q0wm1zz53g5ytdohh
    const history = syncHistoryWithStore(browserHistory, store, {
        selectLocationState: (state) => {
            // cache router
            if (state.get('router') !== lastRoute) {
                lastRoute = state.get('router');
                lastRouteJS = lastRoute.toJS();
                return lastRouteJS;
            }
            return lastRouteJS;
        }
    });

    await store.dispatch(fetchUserData());

    ReactDOM.render(
        <Provider store={store}>
            <Router
                createElement={createElement}
                history={history}
                routes={routes}
                onUpdate={() => {}} />
        </Provider>,
        document.getElementById('App'));
})();
