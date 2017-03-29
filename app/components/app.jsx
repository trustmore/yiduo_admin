import React, { Component, PropTypes } from 'react';

import GlobalHeader from './global-header';
import GlobalNav from './global-nav';

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
            <div className="app-inner">
                <GlobalHeader />
                <div className="main-box">
                    <GlobalNav collapsed={props.collapsed} />
                    <div  className="content-box">
                        <div style={{ margin: '0 16px 0', padding: 20, minHeight: 280 }}>
                            {this.props.children && React.cloneElement(this.props.children, props)}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
