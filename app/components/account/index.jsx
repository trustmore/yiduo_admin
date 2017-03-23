// import {push} from 'react-router-redux';
import React, { Component, PropTypes } from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {fetch} from 'redux/reducers/account';

// const success = () => {
//   const hide = message.loading('Action in progress..', 0);
//   // Dismiss manually and asynchronously
//   setTimeout(hide, 2500);
// };
//
// ReactDOM.render(<Button onClick={success}>Display a loading indicator</Button>
// , mountNode);

import style from 'styles/modules/home/home.scss';

@connect(
    state => ({
        isFetching: state.getIn(['account', 'isFetching']),
        list: state.getIn(['account', 'list'])
    }),
    dispatch => bindActionCreators({fetch}, dispatch)
)
export default class Home extends Component {
    static propTypes = {
        list: PropTypes.object,
        isFetching: PropTypes.object,
        fetch: PropTypes.func
    };
    constructor(props) {
        super(props);
        this.state = {
            hhh: 1
        };
    }
    componentDidMount() {
        this.props.fetch();
    }
    _renderLoading() {
        if (this.props.isFetching) {
            return (
                <p>fetching...</p>
            );
        }
    }
    render() {
        let list = this.props.list;
        list = list ? list.toArray() : [];
        console.log('====in render====', list);
        return (
            <div id={style.home}>
                <h1>account</h1>
                { this._renderLoading() }
                {list.map((t, i) => {
                    return <p key={i}>{t.get('name')}</p>;
                })}
            </div>
        );
    }
}
