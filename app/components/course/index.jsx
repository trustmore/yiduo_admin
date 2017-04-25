// import {push} from 'react-router-redux';
import React, { Component, PropTypes } from 'react';
import {Link, browserHistory} from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Table, Icon, Select} from 'antd';
const Option = Select.Option;
import { fetch, fetchOne } from 'redux/reducers/course';

import style from 'styles/modules/home/home.scss';

@connect(
    state => ({
        isFetching: state.getIn(['course', 'isFetching']),
        cs: state.getIn(['cs', 'cs']),
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
    handleChange(value) {
        console.log('handleChange', value);
    }
    renderOptions = () => {
        const options = [];
        if (this.props.cs){
            this.props.cs.map(t => {
                options.push(<Option key={t.get('_id')}>{t.get('name')}</Option>);
            });
            return options;
        }
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
                title: '总分',
                dataIndex: 'score',
                key: 'score',
                render: text => <a href="#">{text}</a>
            },
            {
                title: '所属课程集',
                dataIndex: '_id',
                key: '_id',
                render: text => {
                    let value = '';
                    if (this.props.cs) {
                        let cs = this.props.cs.toJS();
                        let tmp = cs.find(t => t._id === text);
                        if (tmp && tmp.courses && tmp.courses.length > 0) {
                            value = tmp.courses.includes(text) ? tmp.name : '';
                        }
                    }
                    return (
                        <span>{value}</span>
                    );
                }
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
                    score: t['score'],
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
                    <h1>课程</h1>
                    <Link to="/course/add">
                        <span>添加新课程</span>
                    </Link>

                    <span className="ant-divider" />

                    <Link to="/cs">
                        <span>查看课程集</span>
                    </Link>
                </div>
                { this._renderLoading() }
                { this._renderCourseList() }
            </div>
        );
    }
}
