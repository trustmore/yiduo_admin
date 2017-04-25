// import {push} from 'react-router-redux';
import React, { Component, PropTypes } from 'react';
import { browserHistory, Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Table, Icon, Popconfirm } from 'antd';
import { remove, create } from 'redux/reducers/teacher';
import AddModal from './AddModal';

import style from 'styles/modules/home/home.scss';

@connect(
    state => ({
        teacherList: state.getIn(['teacher', 'list'])
    }),
    dispatch => bindActionCreators({remove, create}, dispatch)
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
    onClickAddBtn = e => {
        e.preventDefault();
        this.setState({
            visible: true
        });
    }
    handleSubmit = (values) => {
        console.log('submit values', values);
        this.props.create(values).then(ret => {
            this.setState({
                visible: false
            });
        });
    }
    _renderLoading() {
        if (this.props.isFetching) {
            return (
                <p>fetching...</p>
            );
        }
    }
    remove(_id) {
        this.props.remove({_id}).then(ret => {
            if (ret && ret.type === 'success') {
                browserHistory.push('/teacher');
            }
        });
        return false;
    }
    _renderTeacherList() {
        const columns = [
            {
                title: '姓名',
                dataIndex: 'name',
                key: 'name',
                render: (text, i) => <Link to={`/teacher/${i._id}`}>{text}</Link>
            },
            {
                title: '操作',
                key: 'action',
                render: (text, i) => (
                    <span>
                        <Link to={`/teacher/${i._id}`}>详情</Link>
                        <span className="ant-divider" />
                        <Popconfirm title="确认删除吗？" onConfirm={() => this.remove(i._id)} okText="确认" cancelText="取消">
                            <a href="#">删除</a>
                        </Popconfirm>
                    </span>
                )
            }
        ];
        let dataList = [];
        let teacherList = this.props.teacherList.toArray();
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
                    <a onClick={this.onClickAddBtn} href="#">
                        <Icon type="user-add" />
                        <span>添加老师</span>
                    </a>
                </div>
                { this._renderLoading() }
                { this._renderTeacherList() }
                <AddModal
                    visible={this.state.visible}
                    closeModal={this.closeModal}
                    handleOk={this.handleOk}
                    handleCancel={this.handleCancel}
                    onSubmit={this.handleSubmit} />
            </div>
        );
    }
}
