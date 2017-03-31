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
                    <h2>易多</h2>
                    <h3>后台管理</h3>
                </div>
                <div className="header-right">
                    <div>{this.props.user.get('name')}</div>
                </div>
            </header>
        );
    }
}
