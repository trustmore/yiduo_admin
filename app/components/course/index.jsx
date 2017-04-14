// import {push} from 'react-router-redux';
import React, { Component, PropTypes } from 'react';
import {Link, browserHistory} from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Table, Icon } from 'antd';
import { fetch, fetchOne } from 'redux/reducers/course';

import style from 'styles/modules/home/home.scss';

@connect(
    state => ({
        isFetching: state.getIn(['course', 'isFetching']),
        courseList: state.getIn(['course', 'list'])
    }),
    dispatch => bindActionCreators({fetch, fetchOne}, dispatch)
)
export default class CourseList extends Component {
    static propTypes = {
        courseList: PropTypes.object,
        isFetching: PropTypes.object,
        fetchOne: PropTypes.func
    };
    constructor(props) {
        super(props);
        this.state = {
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
    linkToAdd(e, id, edit) {
        e.preventDefault();
        let url = edit ? `/course/add?id=${id}&edit=true` : `/course/add?id=${id}`;
        this.props.fetchOne(id).then(ret => {
            if (ret && ret.type === 'success') {
                browserHistory.push(url);
            }
        });
    }
    _renderCourseList() {
        const columns = [
            {
                title: '名称',
                dataIndex: 'name',
                key: 'name',
                render: (text, i) => <Link to={`/course/${i._id}`}>{text}</Link>
            },
            {
                title: '句子数',
                dataIndex: 'sentence',
                key: 'sentence',
                render: text => <a href="#">{text}</a>,
            },
            {
                title: '操作',
                key: 'action',
                render: (text, i) => (
                    <span>
                        <a href='#' onClick={(e) => this.linkToAdd(e, i._id, true)}>编辑</a>
                        <span className="ant-divider" />
                        <a href='#' onClick={(e) => this.linkToAdd(e, i._id)}>复制并添加课程</a>
                    </span>
                )
            }
        ];
        let dataList = [];
        if (this.props.courseList) {
            let courseList = this.props.courseList.toJS();
            courseList.map((t, i) => {
                let tmp = {
                    key: t['_id'],
                    _id: t['_id'],
                    name: t['name'],
                    sentence: 0
                };
                dataList.push(tmp);
            })
        }
        return (
            <Table columns={columns} defaultPageSize={20} pagination={{defaultCurrent: 1, total: 50}} dataSource={dataList} />
        );
    }
    render() {
        return (
            <div id={style.home}>
                <div>
                    <h1>course</h1>
                    <Link to="/course/add">
                        <Icon type="user-add" />
                        <span>添加新课程</span>
                    </Link>
                </div>
                { this._renderLoading() }
                { this._renderCourseList() }
            </div>
        );
    }
}
