// import {push} from 'react-router-redux';
import React, { Component, PropTypes } from 'react';
import { browserHistory, Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

@connect(
    state => ({
        teacherList: state.getIn(['teacher', 'list'])
    }),
    dispatch => bindActionCreators({}, dispatch)
)
export default class TeacherDetail extends Component {
    static propTypes = {
        clazzList: PropTypes.object,
        create: PropTypes.func
    };
    constructor(props) {
        super(props);
        let teacher = props.teacherList.find(t => { return props.params.id === t.get('_id'); });
        this.state = {
            teacher
        };
    }
    componentDidMount() {
    }
    render() {
        return (
            <div>
                <div>
                    <h1>{this.state.teacher.get('name')}</h1>
                </div>
            </div>
        );
    }
}
