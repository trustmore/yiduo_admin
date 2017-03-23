import _ from 'lodash';
import React, { Component, PropTypes } from 'react';

import GlobalHeader from './global-header';
import GlobalNav from './global-nav';
import { Layout } from 'antd';
const { Content } = Layout;

require('styles/global/style.scss');

export default class App extends Component {
    static propTypes = {
        collapsed: PropTypes.func,
        children: PropTypes.object.isRequired
    };

    componentDidMount() {
        // window.onbeforeunload = function() {
        //     return '您确定要退出页面吗？';
        // };
    }

    componentDidUpdate() {
    }

    render() {
        let props: Object = _.assign({collapsed: true}, this.state, this.props);
        delete props.children;
        return (
            <Layout className="app-inner">
                <GlobalHeader />
                <Layout className="ant-layout-has-sider main-box">
                    <GlobalNav collapsed={props.collapsed} />
                    <Layout>
                        <Content style={{ margin: '0 16px 0', padding: 20, minHeight: 280 }}>
                            {this.props.children && React.cloneElement(this.props.children, props)}
                        </Content>
                    </Layout>
                </Layout>
            </Layout>
        );
    }
}
