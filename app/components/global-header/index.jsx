import React, { PropTypes, Component } from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import style from 'styles/modules/global-header/global-header.scss';

@connect(
    state => ({
        user: state.getIn(['user', 'user'])
    }),
    dispatch => bindActionCreators({}, dispatch)
)
export default class GlobalHeader extends Component {
    static propTypes = {
        user: PropTypes.object
    };
    render() {
        return (
            <header className={style['header-box']}>
                <div className={style['header-left']}>
                    <h2>金 睛</h2>
                    <h3>数据反爬服务平台</h3>
                </div>
                <div className={style['header-right']}>
                    <div>{this.props.user.get('name')}</div>
                </div>
            </header>
        );
    }
}
