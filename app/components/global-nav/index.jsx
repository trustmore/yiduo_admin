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
                    onClick={ null }
                    defaultOpenKeys={['sub3']}
                    style={{ width: 200 }}
                    mode="inline" >
                    <Menu.Item key="sub1">
                        <Link activeClassName="active" to="/">
                            <Icon type="mail" />
                            <span className="nav-text">安全情报板</span>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="sub2">
                        <Link activeClassName="active" to="/dashboard">
                            <Icon type="mail" />
                            <span className="nav-text">防御效果</span>
                        </Link>
                    </Menu.Item>
                    <SubMenu key="sub3" title={<span><Icon type="mail" /><span>爬虫分析</span></span>}>
                        <Menu.Item key="sub4">
                            <Link activeClassName="active" to="/dashboard">
                                <Icon type="mail" />
                                <span className="nav-text">地域分布</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="sub5">
                            <Link activeClassName="active" to="/dashboard">
                                <Icon type="mail" />
                                <span className="nav-text">地域分布</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="sub6">
                            <Link activeClassName="active" to="/dashboard">
                                <Icon type="mail" />
                                <span className="nav-text">爬虫来源</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="sub7">
                            <Link activeClassName="active" to="/dashboard">
                                <Icon type="mail" />
                                <span className="nav-text">被爬取数据</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="sub2">
                            <Link activeClassName="active" to="/dashboard">
                                <Icon type="mail" />
                                <span className="nav-text">爬虫细查</span>
                            </Link>
                        </Menu.Item>
                    </SubMenu>
                    <Menu.Item key="sub8">
                        <Link activeClassName="active" to="/dashboard">
                            <Icon type="mail" />
                            <span className="nav-text">反爬报告</span>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="sub9">
                        <Link activeClassName="active" to="/dashboard">
                            <Icon type="mail" />
                            <span className="nav-text">爬虫防御配置</span>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="sub10">
                        <Link activeClassName="active" to="/dashboard">
                            <Icon type="mail" />
                            <span className="nav-text">用户管理</span>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="sub11">
                        <Link activeClassName="active" to="/dashboard">
                            <Icon type="mail" />
                            <span className="nav-text">日志管理</span>
                        </Link>
                    </Menu.Item>
                </Menu>
            </div>
        );
    }
}
