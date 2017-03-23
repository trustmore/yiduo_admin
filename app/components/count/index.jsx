// import {push} from 'react-router-redux';
import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import style from 'styles/modules/home/home.scss';

@connect(
    null,
    dispatch => bindActionCreators({}, dispatch)
)
export default class Home extends Component {
    static propTypes = {
    };

    render() {
        return (
            <div id={style.home}>
                <h1>这是 account 啊!</h1>
            </div>
        );
    }
}
