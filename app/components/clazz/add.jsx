// import {push} from 'react-router-redux';
import React, { Component, PropTypes } from 'react';
import { browserHistory, Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { create } from 'redux/reducers/clazz';
import AddClazzForm from './addClazzForm';

@connect(
    state => ({
        clazzList: state.getIn(['clazz', 'list']),
        teacherList: state.getIn(['teacher', 'list'])
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
        console.log('_handleAddSubmit=>', values, this.props);
        this.props.create(values).then(ret => {
            console.log('create===>', ret);
            if (ret && ret.type === 'success') {
                browserHistory.push('/student');
            }
        });
    }
    render() {
        let clazzList = this.props.clazzList;
        let teacherList = this.props.teacherList;
        console.log('====in render clazzList====', clazzList);
        return (
            <div>
                <div>
                    <h1>添加班级</h1>
                    <AddClazzForm teacherList={teacherList} clazzList={clazzList} onSubmit={this._handleAddSubmit} />
                </div>
            </div>
        );
    }
}
