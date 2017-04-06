// import {push} from 'react-router-redux';
import React, { Component, PropTypes } from 'react';
import {Link} from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Table, Icon } from 'antd';

import style from 'styles/modules/home/home.scss';

@connect(
    state => ({
        clazzList: state.getIn(['clazz', 'list']),
        teacherList: state.getIn(['teacher', 'list'])
    }),
    dispatch => bindActionCreators({}, dispatch)
)
export default class Student extends Component {
    static propTypes = {
        clazzList: PropTypes.object
    };
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    componentDidMount() {
    }
    _renderClazzList() {
        const columns = [
            {
                title: '名称',
                dataIndex: 'name',
                key: 'name',
                render: text => <a href="#">{text}</a>,
            },
            {
                title: '年级',
                dataIndex: 'grade',
                key: 'grade',
            },
            {
                title: '班次',
                key: 'rank',
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
        let clazzList = this.props.clazzList.toArray();
        clazzList.map((t, i) => {
            let tmp = {
                key: t.get('_id'),
                _id: t.get('_id'),
                name: t.get('name'),
                grade: t.get('grade'),
                rank: t.get('rank')
            };
            dataList.push(tmp);
        })
        console.log('dataList xxxx=>', dataList);
        return (
            <Table columns={columns} defaultPageSize={20} pagination={{defaultCurrent: 1, total: 50}} dataSource={dataList} />
        );
    }
    render() {
        return (
            <div id={style.home}>
                <div>
                    <h1>clazz</h1>
                    <Link to="/clazz/add">
                        <Icon type="user-add" />
                        <span>添加班级</span>
                    </Link>
                </div>
                { this._renderClazzList() }
            </div>
        );
    }
}
