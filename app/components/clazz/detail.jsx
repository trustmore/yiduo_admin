// import {push} from 'react-router-redux';
import React, { Component, PropTypes } from 'react';
import {Link, browserHistory} from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Table, Icon } from 'antd';

import style from 'styles/modules/home/home.scss';

@connect(
    state => ({
        detail: state.getIn(['clazz', 'detail'])
    }),
    dispatch => bindActionCreators({}, dispatch)
)
export default class CsDetail extends Component {
    static propTypes = {
        detail: PropTypes.object
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
                title: '姓名',
                dataIndex: 'name',
                key: 'name',
                render: (text, i) => <Link to={`/student/${i._id}`}>{text}</Link>
            },
            {
                title: '家长电话',
                dataIndex: 'ptel',
                key: 'ptel',
            },
            {
                title: '操作',
                key: 'action',
                render: (text, i) => {
                    return (
                        <span>
                            <a href="#">
                                <span>移出班级</span>
                            </a>
                        </span>
                    );
                }
            }
        ];
        let dataList = [];
        let clazz = this.props.detail.toJS();
        let studentList = clazz.students;
        studentList.map((t, i) => {
            let tmp = {
                _id: t._id,
                name: t.name,
                key: t._id,
                ptel: t.ptel
            };
            dataList.push(tmp);
        })
        return (
            <Table columns={columns} pagination={false} dataSource={dataList} />
        );
    }
    render() {
        if (!this.props.detail) {
            return (
                <div>loading...</div>
            )
        }
        return (
            <div id={style.home}>
                <div>
                    <h1>{this.props.detail.get('name')}</h1>
                    <p>班级成员</p>
                </div>
                { this._renderStudentList() }
            </div>
        );
    }
}
