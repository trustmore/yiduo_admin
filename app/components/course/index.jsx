// import {push} from 'react-router-redux';
import React, { Component, PropTypes } from 'react';
import {Link} from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Table, Icon } from 'antd';
import { fetch } from 'redux/reducers/course';

import style from 'styles/modules/home/home.scss';

@connect(
    state => ({
        isFetching: state.getIn(['course', 'isFetching']),
        courseList: state.getIn(['course', 'list'])
    }),
    dispatch => bindActionCreators({fetch}, dispatch)
)
export default class CourseList extends Component {
    static propTypes = {
        courseList: PropTypes.object,
        isFetching: PropTypes.object
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
    _renderCourseList() {
        const columns = [
            {
                title: '名称',
                dataIndex: 'name',
                key: 'name',
                render: (text, i) => <Link to={`/course/${i._id}/edit`}>{text}</Link>
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
                render: (text, s) => (
                    <span>
                        <a href="#">详情</a>
                        <span className="ant-divider" />
                        <a href="#">删除</a>
                        <span className="ant-divider" />
                        <a href="#" className="ant-dropdown-link">
                        更多 <Icon type="down" />
                        </a>
                    </span>
                )
            }
        ];
        let dataList = [];
        if (this.props.courseList) {
            let courseList = this.props.courseList.toArray();
            courseList.map((t, i) => {
                let tmp = {
                    key: t.get('_id'),
                    _id: t.get('_id'),
                    name: t.get('name'),
                    sentence: 9
                };
                dataList.push(tmp);
            })
        }
        console.log('dataList xxxx=>', dataList);
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
                        <span>添加文章</span>
                    </Link>
                </div>
                { this._renderLoading() }
                { this._renderCourseList() }
            </div>
        );
    }
}
