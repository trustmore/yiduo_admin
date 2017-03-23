import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import { Layout, Menu, Icon } from 'antd';
const { Sider } = Layout;
const SubMenu = Menu.SubMenu;

require('styles/modules/global-nav/global-nav.scss');

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
            <Sider width={200}>
                <Menu
                    mode="inline"
                    className="nav"
                    theme="dark"
                    style={{ height: '100%' }} >
                    <Menu.Item key="sub1">
                        <Link activeClassName="active" to="/">
                            <Icon type="user" />
                            <span className="nav-text">安全情报板</span>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="sub2">
                        <Link activeClassName="active" to="/dashboard">
                            <Icon type="video-camera" />
                            <span className="nav-text">防御效果</span>
                        </Link>
                    </Menu.Item>
                    <SubMenu key="sub3" title={<span><Icon type="setting" /><span>爬虫分析</span></span>}>
                        <Menu.Item key="sub4">地域分布</Menu.Item>
                        <Menu.Item key="sub5">爬虫来源</Menu.Item>
                        <Menu.Item key="sub6">被爬取数据</Menu.Item>
                        <Menu.Item key="sub7">爬虫细查</Menu.Item>
                    </SubMenu>
                    <Menu.Item key="sub8">
                        <Link activeClassName="active" to="/">
                            <Icon type="user" />
                            <span className="nav-text">反爬报告</span>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="sub9">
                        <Link activeClassName="active" to="/dashboard">
                            <Icon type="video-camera" />
                            <span className="nav-text">爬虫防御配置</span>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="sub10">
                        <Link activeClassName="active" to="/">
                            <Icon type="user" />
                            <span className="nav-text">用户管理</span>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="sub11">
                        <Link activeClassName="active" to="/dashboard">
                            <Icon type="video-camera" />
                            <span className="nav-text">日志管理</span>
                        </Link>
                    </Menu.Item>
                </Menu>
            </Sider>
        );
    }
}
