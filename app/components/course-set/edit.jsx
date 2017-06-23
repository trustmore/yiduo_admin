// import {push} from 'react-router-redux';
import React, { Component, PropTypes } from 'react';
import {Link, browserHistory} from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Table, Icon, Popconfirm } from 'antd';
import { updateCourseSet } from 'redux/reducers/course-set';
import { removeCsCourse } from 'redux/reducers/course-set';

import style from 'styles/modules/home/home.scss';

@connect(
    state => ({
        cs: state.getIn(['cs', 'current_cs'])
    }),
    dispatch => bindActionCreators({removeCsCourse}, dispatch)
)
export default class CsList extends Component {
    static propTypes = {
        removeCsCourse: PropTypes.func,
        cs: PropTypes.object
    };
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    componentWillMount() {
        let cs = this.props.cs;
        if (!cs){
            browserHistory.push('/course');
        }
    }
    componentDidMount() {
    }
    onRemoveCourse = (key) => {
        this.props.removeCsCourse({
            key: key,
            csid: this.props.cs.get('_id')
        });
    }
    _renderCsCourseList() {
        const columns = [
            {
                title: '课程名称',
                dataIndex: 'name',
                key: 'name',
                render: (text, i) => <a href='#' onClick={(e) => this.linkToDetail(e, i._id)}>{text}</a>
            },
            {
                title: '简称',
                dataIndex: 'abbr',
                key: 'abbr',
                render: text => <a href="#">{text}</a>,
            },
            {
                title: '',
                key: 'action',
                render: (text, i) => (
                    <span>
                        <Popconfirm title="确认将课程从该课程集移除吗？" onConfirm={() => this.onRemoveCourse(i.key)} okText="确认" cancelText="取消">
                            <a href="#">移除</a>
                        </Popconfirm>
                    </span>
                )
            }
        ];
        let dataList = [];
        if (this.props.cs) {
            let cs = this.props.cs.toJS();
            let csList = cs.courses;
            csList.map((t, i) => {
                let tmp = {
                    key: `${t['type']}:${t['_id']}`,
                    _id: t['_id'],
                    name: t['name'],
                    abbr: t['abbr'],
                    courses: t['courses'] ? t['courses'].length : 0
                };
                dataList.push(tmp);
            });
        }
        return (
            <Table columns={columns} pagination={false} dataSource={dataList} />
        );
    }
    render() {
        let cs = this.props.cs.toJS();
        return (
            <div id={style.home}>
                <div>
                    <h1>编辑课程集 - {cs.name}</h1>
                </div>
                { this._renderCsCourseList() }
            </div>
        );
    }
}
