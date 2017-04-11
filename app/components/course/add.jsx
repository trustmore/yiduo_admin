// import {push} from 'react-router-redux';
import React, { Component, PropTypes } from 'react';
import { browserHistory, Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { create, fetchOne } from 'redux/reducers/course';
import AddCourseForm from './addCourseForm';

@connect(
    state => ({
        clazzList: state.getIn(['clazz', 'list']),
        course: state.getIn(['course', 'course'])
    }),
    dispatch => bindActionCreators({create, fetchOne}, dispatch)
)
export default class StudentAdd extends Component {
    static propTypes = {
        clazzList: PropTypes.object,
        course: PropTypes.object,
        edit: PropTypes.bool,
        isFetching: PropTypes.bool,
        create: PropTypes.func
    };
    constructor(props) {
        super(props);
        let id = props.params.id
        let edit = id ? true : false;
        let isFetching = edit ? true : false;
        this.state = {
            edit,
            isFetching
        };
    }
    componentDidMount() {
        console.log('course add', this.state);
        if (this.state.edit) {
            this.props.fetchOne(this.props.params.id).then(ret => {
                this.setState({
                    isFetching: false
                })
            });
        }
    }
    _renderLoading() {
        if (this.props.isFetching) {
            return (
                <p>loading</p>
            );
        }
    }
    _handleAddSubmit = (values) => {
        console.log('_handleAddSubmit=>', values, this.props.from);
        this.props.create(values).then(ret => {
            console.log('create===>', ret);
            if (ret && ret.type === 'success') {
                browserHistory.push('/course');
            }
        });
    }
    render() {
        if (this.props.isFetching) {
            return (
                <div>稍等...</div>
            );
        }
        return (
            <div>
                <div>
                    <h1>添加课程</h1>
                    <AddCourseForm course={this.props.course} onSubmit={this._handleAddSubmit} />
                </div>
            </div>
        );
    }
}
