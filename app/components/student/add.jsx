// import {push} from 'react-router-redux';
import React, { Component, PropTypes } from 'react';
import { browserHistory, Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { create } from 'redux/reducers/student';
import AddStudentForm from './AddStudentForm';

@connect(
    state => ({
        clazzList: state.getIn(['clazz', 'list'])
    }),
    dispatch => bindActionCreators({create}, dispatch)
)
export default class StudentAdd extends Component {
    static propTypes = {
        clazzList: PropTypes.object,
        create: PropTypes.func
    };
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        // this.props.fetch();
    }
    _renderLoading() {
        if (this.props.isFetching) {
            return (
                <Icon type="loading" />
            );
        }
    }
    _handleAddSubmit = (values) => {
        this.props.create(values).then(ret => {
            if (ret && ret.type === 'success') {
                browserHistory.push('/student');
            }
        });
    }
    render() {
        let clazzList = this.props.clazzList;
        return (
            <div>
                <div>
                    <h1>添加学生</h1>
                    <AddStudentForm clazzList={clazzList} onSubmit={this._handleAddSubmit} />
                </div>
            </div>
        );
    }
}
