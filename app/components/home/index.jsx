import React, { PropTypes, Component } from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import style from 'styles/modules/home/home.scss';

@connect(
    state => ({
        user: state.getIn(['user', 'user'])
    }),
    dispatch => bindActionCreators({}, dispatch)
)
export default class Home extends Component {
    static propTypes = {
        students: PropTypes.object
    };
    componentDidMount() {
    }
    render() {
        return (
            <div id={style.home}>
                <h1>易多</h1>
            </div>
        );
    }
}
