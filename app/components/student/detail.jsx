// import {push} from 'react-router-redux';
import React, { Component, PropTypes } from 'react';
import { browserHistory, Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchOne } from 'redux/reducers/student';

@connect(
    state => ({
        detail: state.getIn(['student', 'detail']),
        teacherList: state.getIn(['teacher', 'list'])
    }),
    dispatch => bindActionCreators({fetchOne}, dispatch)
)
export default class StudentDetail extends Component {
    static propTypes = {
        detail: PropTypes.object,
        teacherList: PropTypes.object,
        fetchOne: PropTypes.func
    };
    constructor(props) {
        super(props);
        let id = props.params.id
        this.state = {
            id
        };
    }
    componentDidMount() {
        this.props.fetchOne(this.state.id);
    }
    render() {
        console.log('==99999==', this.props.teacherList);
        return (
            <div>
                <div>
                    <h1>{this.props.detail.get('name')}</h1>
                </div>
            </div>
        );
    }
}
