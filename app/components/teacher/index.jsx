// import {push} from 'react-router-redux';
import React, { Component, PropTypes } from 'react';
import { browserHistory, Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Table, Icon, Popconfirm } from 'antd';
import { remove, create, update } from 'redux/reducers/teacher';
import AddModal from './addModal';

import style from 'styles/modules/home/home.scss';

@connect(
    state => ({
        teacherList: state.getIn(['teacher', 'list'])
    }),
    dispatch => bindActionCreators({remove, create, update}, dispatch)
)
export default class Teacher extends Component {
    static propTypes = {
        teacherList: PropTypes.object
    };
    constructor(props) {
        super(props);
        this.state = {
            edit: false,
            visible: false
        };
    }
    componentDidMount() {
    }
    onClickAddBtn = e => {
        e.preventDefault();
        this.setState({
            edit: false,
            visible: true
        });
    }
    onOpenEdit = (e, tid) => {
        e.preventDefault();
        let currentTea = this.props.teacherList.find((t) => {
            return t.get('_id') === tid;
        }).toJS();
        console.log('onOpenEdit===>', tid, currentTea);
        this.setState({
            visible: true,
            edit: true,
            currentTea
        });
    }
    handleCancel = () => {
        this.setState({
            visible: false
        });
    }
    handleSubmit = (values) => {
        if (this.state.edit) {
            values._id = this.state.currentTea._id;
            this.props.update(values).then(ret => {
                this.setState({
                    visible: false
                });
            });
        } else {
            this.props.create(values).then(ret => {
                this.setState({
                    visible: false
                });
            });
        }
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
                title: '英文名',
                dataIndex: 'ename',
                key: 'ename',
                render: (text, i) => <span>{text}</span>
            },
            {
                title: '操作',
                key: 'action',
                render: (text, i) => (
                    <span>
                        <a href='#' onClick={(e) => this.onOpenEdit(e, i._id)}>编辑</a>
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
                ename: t.get('ename'),
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
                    <h1>老师</h1>
                    <a onClick={this.onClickAddBtn} href="#">
                        <Icon type="user-add" />
                        <span>添加老师</span>
                    </a>
                </div>
                { this._renderLoading() }
                { this._renderTeacherList() }
                <AddModal
                    visible={this.state.visible}
                    edit={this.state.edit}
                    currentTea={this.state.currentTea}
                    onOk={this.handleSubmit}
                    onCancel={this.handleCancel} />
            </div>
        );
    }
}
