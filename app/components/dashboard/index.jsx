// import {push} from 'react-router-redux';
import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

@connect(
    null,
    dispatch => bindActionCreators({}, dispatch)
)
export default class Dashboard extends Component {
    static propTypes = {
    };
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    componentDidMount() {
    }
    render() {
        return (
            <div id="">
                <h1>dashboard</h1>
            </div>
        );
    }
}
