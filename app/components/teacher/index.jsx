// import {push} from 'react-router-redux';
import React, { Component, PropTypes } from 'react';
import {Link} from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Table, Icon } from 'antd';

import style from 'styles/modules/home/home.scss';

@connect(
    state => ({
        teacherList: state.getIn(['teacher', 'list'])
    }),
    dispatch => bindActionCreators({fetch}, dispatch)
)
export default class Teacher extends Component {
    static propTypes = {
        teacherList: PropTypes.object
    };
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    componentDidMount() {
    }
    _renderLoading() {
        if (this.props.isFetching) {
            return (
                <p>fetching...</p>
            );
        }
    }
    _renderTeacherList() {
        const columns = [
            {
                title: '姓名',
                dataIndex: 'name',
                key: 'name',
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
        let teacherList = this.props.teacherList.toArray();
        console.log('teacherList', teacherList);
        teacherList.map((t, i) => {
            let tmp = {
                _id: t.get('_id'),
                key: t.get('_id'),
                name: t.get('name')
            };
            dataList.push(tmp);
        })
        return (
            <Table columns={columns} defaultPageSize={20} pagination={{defaultCurrent: 1, total: 50}} dataSource={dataList} />
        );
    }
    render() {
        return (
            <div id={style.home}>
                <div>
                    <h1>teacher</h1>
                    <Link to="/teacher/add">
                        <Icon type="user-add" />
                        <span>添加老师</span>
                    </Link>
                </div>
                { this._renderLoading() }
                { this._renderTeacherList() }
            </div>
        );
    }
}
