// import {push} from 'react-router-redux';
import React, { Component, PropTypes } from 'react';
import {Link, browserHistory} from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Table, Icon } from 'antd';

import style from 'styles/modules/home/home.scss';

@connect(
    state => ({
        schedule: state.getIn(['clazz', 'schedule'])
    }),
    dispatch => bindActionCreators({}, dispatch)
)
export default class CsDetail extends Component {
    static propTypes = {
        schedule: PropTypes.object
    };
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    componentWillMount() {
    }
    componentDidMount() {
    }
    _renderStudentList() {
        const columns = [
            {
                title: '课程名称',
                dataIndex: 'name',
                key: 'name',
                render: (text, i) => <Link to={`/course/${i._id}`}>{text}</Link>
            },
            {
                title: '已完成学生数',
                dataIndex: 'done',
                key: 'done',
            },
            {
                title: '未完成学生数',
                dataIndex: 'undo',
                key: 'undo',
            }
        ];
        let dataList = [];
        let clazz = this.props.schedule.toJS();
        console.log('in schedule', clazz);
        let courseList = clazz.courses;
        courseList.map((t, i) => {
            let tmp = {
                _id: t._id,
                name: t.name,
                key: t._id,
                undo: t.undo,
                done: t.done
            };
            dataList.push(tmp);
        })
        return (
            <Table columns={columns} pagination={false} dataSource={dataList} />
        );
    }
    render() {
        if (!this.props.schedule) {
            return (
                <div>loading...</div>
            )
        }
        return (
            <div id={style.home}>
                <div>
                    <h1>{this.props.schedule.get('name')}</h1>
                </div>
                { this._renderStudentList() }
            </div>
        );
    }
}
