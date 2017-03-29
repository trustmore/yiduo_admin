import React, { PropTypes, Component } from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

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
            <header className="header-box">
                <div className="header-left">
                    <h2>金 睛</h2>
                    <h3>数据反爬服务平台</h3>
                </div>
                <div className="header-right">
                    <div>{this.props.user.get('name')}</div>
                </div>
            </header>
        );
    }
}
