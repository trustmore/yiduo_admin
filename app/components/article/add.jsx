// import {push} from 'react-router-redux';
import React, { Component, PropTypes } from 'react';
import { browserHistory, Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { create } from 'redux/reducers/article';
import AddArticleForm from './AddArticleForm';

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
                <p>loading</p>
            );
        }
    }
    _handleAddSubmit = (values) => {
        console.log('_handleAddSubmit=>', values, this.props);
        this.props.create(values).then(ret => {
            console.log('create===>', ret);
            if (ret && ret.type === 'success') {
                browserHistory.push('/article');
            }
        });
    }
    render() {
        let clazzList = this.props.clazzList;
        console.log('====in render clazzList====', clazzList);
        return (
            <div>
                <div>
                    <h1>添加班级</h1>
                    <AddArticleForm onSubmit={this._handleAddSubmit} />
                </div>
            </div>
        );
    }
}
