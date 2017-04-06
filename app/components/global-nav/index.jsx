import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import { Menu, Icon } from 'antd';
const SubMenu = Menu.SubMenu;

@connect(
    null,
    dispatch => bindActionCreators({}, dispatch)
)
export default class GlobalNav extends Component {
    static propTypes = {
    }
    constructor(props) {
        super(props);
        this.state = {
            collapsed: false
        };
    }
    toggle() {
        this.setState({
            collapsed: !this.state.collapsed
        });
    }
    render() {
        // let props: Object = _.assign({}, this.state, this.props);
        return (
            <div className="nav-box">
                <Menu
                    theme="dark"
                    defaultOpenKeys={['sub3']}
                    style={{ width: 200 }}
                    mode="inline" >
                    <Menu.Item key="sub1">
                        <Link activeClassName="active" to="/">
                            <Icon type="home" />
                            <span className="nav-text">首页</span>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="sub2">
                        <Link activeClassName="active" to="/teacher">
                            <Icon type="user" />
                            <span className="nav-text">老师</span>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="sub3">
                        <Link activeClassName="active" to="/student">
                            <Icon type="smile-o" />
                            <span className="nav-text">学生</span>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="sub4">
                        <Link activeClassName="active" to="/clazz">
                            <Icon type="team" />
                            <span className="nav-text">班级</span>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="sub5">
                        <Link activeClassName="active" to="/article">
                            <Icon type="file-text" />
                            <span className="nav-text">文章</span>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="sub6">
                        <Link activeClassName="active" to="/parent">
                            <Icon type="mail" />
                            <span className="nav-text">家长</span>
                        </Link>
                    </Menu.Item>
                </Menu>
            </div>
        );
    }
}
