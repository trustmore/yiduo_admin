// import {push} from 'react-router-redux';
import React, { Component, PropTypes } from 'react';
import { browserHistory, Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { create, fetchOne, update } from 'redux/reducers/course';
import AddCourseForm from './addCourseForm';

@connect(
    state => ({
        clazzList: state.getIn(['clazz', 'list']),
        course: state.getIn(['course', 'course'])
    }),
    dispatch => bindActionCreators({create, fetchOne, update}, dispatch)
)
export default class StudentAdd extends Component {
    static propTypes = {
        clazzList: PropTypes.object,
        course: PropTypes.object,
        edit: PropTypes.bool,
        isFetching: PropTypes.bool,
        create: PropTypes.func,
        update: PropTypes.func
    };
    constructor(props) {
        super(props);
        let id = this.props.location.query.id;
        let edit = this.props.location.query.edit ? true : false;
        let isFetching = edit ? true : false;
        this.state = {
            id,
            edit,
            isFetching
        };
    }
    componentDidMount() {
        // if (this.state.id) {
        //     this.props.fetchOne(this.state.id).then(ret => {
        //         this.setState({
        //             isFetching: false
        //         });
        //     });
        // }
    }
    _renderLoading() {
        if (this.props.isFetching) {
            return (
                <p>loading</p>
            );
        }
    }
    _handleAddSubmit = (values) => {
        console.log('submit values', values);
        if (values.sentences && values.sentences.length > 0){
            let sentences = values.sentences;
            sentences.map((s, index) => {
                values[`voice-${index}`] = s.voice._id;
                values[`sentence-${index}`] = s.content;
            });
            delete values.sentences;
        }
        console.log('submit values', values);
        if (this.state.edit) {
            values._id = this.state.id;
            this.props.update(values).then(ret => {
                if (ret && ret.type === 'success') {
                    browserHistory.push('/course');
                }
            });
        } else {
            this.props.create(values).then(ret => {
                if (ret && ret.type === 'success') {
                    browserHistory.push('/course');
                }
            });
        }
    }
    render() {
        console.log('add render');
        if (this.props.isFetching) {
            return (
                <div>稍等...</div>
            );
        }
        let hText = this.state.edit ? '修改课程' : '添加课程';
        let course = this.state.id ? this.props.course : null;
        return (
            <div>
                <div>
                    <h1>{hText}</h1>
                    <AddCourseForm edit={this.state.edit} course={course} onSubmit={this._handleAddSubmit} />
                </div>
            </div>
        );
    }
}
