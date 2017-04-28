import React, { PropTypes, Component } from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Cookies from 'cookies-js';
import {Icon} from 'antd';
import {logout} from 'redux/reducers/user';

@connect(
    state => ({
        user: state.getIn(['user', 'user'])
    }),
    dispatch => bindActionCreators({logout}, dispatch)
)
export default class GlobalHeader extends Component {
    static propTypes = {
        user: PropTypes.object,
        logout: PropTypes.func
    };
    onLogout = () => {
        this.props.logout().then(() => {
            Cookies.expire('_authenticated');
            window.location.href = '/signin';
        });
    }
    render() {
        return (
            <header className="header-box">
                <div className="header-left">
                    <h2>易多</h2>
                    <h3>后台管理</h3>
                </div>
                <div className="header-right">
                    <div>{this.props.user.get('name')} <Icon onClick={this.onLogout} type="logout" /></div>
                </div>
            </header>
        );
    }
}
