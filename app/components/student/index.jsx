// import {push} from 'react-router-redux';
import React, { Component, PropTypes } from 'react';
import {Link} from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { create, fetch, remove, update } from 'redux/reducers/student';
import { Table, Icon, Popconfirm, Select } from 'antd';
const Option = Select.Option;
import AddModal from './addModal';

import style from 'styles/modules/home/home.scss';

@connect(
    state => ({
        isFetching: state.getIn(['student', 'isFetching']),
        clazzList: state.getIn(['clazz', 'list']),
        total: state.getIn(['student', 'total']),
        page: state.getIn(['student', 'page']),
        list: state.getIn(['student', 'list'])
    }),
    dispatch => bindActionCreators({create, fetch, remove, update}, dispatch)
)
export default class Student extends Component {
    static propTypes = {
        list: PropTypes.object,
        clazzList: PropTypes.object,
        total: PropTypes.number,
        page: PropTypes.number,
        isFetching: PropTypes.object,
        fetch: PropTypes.func,
        update: PropTypes.func,
        remove: PropTypes.func
    };
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            edit: false
        };
    }
    componentDidMount() {
        this.props.fetch();
    }
    onClickAddBtn = e => {
        e.preventDefault();
        this.setState({
            edit: false,
            visible: true
        });
    }
    handleOk = () => {
        this.setState({
            visible: false
        });
    }
    closeModal = () => {
        this.setState({
            visible: false
        });
    }
    handleSubmit = (values) => {
        console.log('submit values', values);
        if (this.state.edit) {
            values._id = this.state.currentStu._id;
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
    onClickEditBtn = (e, _id) => {
        e.preventDefault();
        let currentStu = this.props.list.find((s) => {
            return s.get('_id') === _id;
        }).toJS();
        let currentClazz = this.props.clazzList.find((c) => {
            return c.get('_id') === currentStu.clazz;
        }).toJS();
        this.setState({
            visible: true,
            edit: true,
            currentStu,
            currentClazz
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
        this.props.remove({_id}).then(ret => {});
    }
    onFilter = (value, type) => {
        this.state[type] = value;
        let params = {};
        this.state[type] == 'all' ? null : params[type] = this.state[type];
        this.props.fetch(params);
    }
    _renderAddBtn() {
        return (
            <a onClick={this.onClickAddBtn} href="#">
                <Icon type="user-add" />
                <span>添加学生</span>
            </a>
        )
    }
    _renderClazzOptions() {
        let clazzes = this.props.clazzList.toJS();
        let options = clazzes.map(c => {
            return (
                <Option value={c._id} key={c._id}>{c.name}</Option>
            )
        })
        return options;
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
                title: '积分',
                dataIndex: 'stars',
                key: 'stars',
            },
            {
                title: '班级',
                dataIndex: 'clazz',
                key: 'clazz',
            },
            {
                title: '邀请码',
                dataIndex: 'invitecode',
                key: 'invitecode',
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
                            <a onClick={(e) => this.onClickEditBtn(e, i._id)} href="#">
                                <span>编辑</span>
                            </a>
                            <span className="ant-divider" />
                            <Popconfirm title="确认删除吗？" onConfirm={() => this.remove(i._id)} okText="确认" cancelText="取消">
                                <a href="#">删除</a>
                            </Popconfirm>
                        </span>
                    );
                }
            }
        ];
        let dataList = [];
        let studentList = this.props.list.toArray();
        let clazzList = this.props.clazzList.toArray();
        studentList.map((t, i) => {
            let clazz = clazzList.find(c => {
                return t.get('clazz') === c.get('_id');
            });
            let tmp = {
                _id: t.get('_id'),
                name: t.get('name'),
                stars: t.get('stars') || 0,
                key: t.get('_id'),
                invitecode: t.get('invitecode'),
                ptel: t.get('ptel'),
                clazz: clazz ? clazz.get('name') : '未知'
            };
            dataList.push(tmp);
        });
        let pagination = {
            pageSize: 50,
            current: this.props.page,
            total: this.props.total,
            onChange: (page, pageSize) => {
                let params = {page, pageSize};
                this.state.clazz == 'all' ? null : params.clazz = this.state.clazz;
                this.props.fetch(params);
            }
        }
        return (
            <Table columns={columns} defaultPageSize={20} pagination={pagination} dataSource={dataList} />
        );
    }
    render() {
        return (
            <div id={style.home}>
                <div>
                    <h1>学生</h1>
                </div>
                { this._renderLoading() }
                <div style={{margin: '20px 0'}}>
                    <span>学生筛选:&nbsp; </span>
                    <Select onChange={(value) => {this.onFilter(value, 'clazz')}} defaultValue='all' style={{ width: 120 }} >
                        <Option value="all">全部</Option>
                        {this._renderClazzOptions()}
                    </Select>
                </div>
                { this._renderStudentList() }

                <AddModal
                    visible={this.state.visible}
                    edit={this.state.edit}
                    student={this.state.currentStu}
                    clazz={this.state.currentClazz}
                    closeModal={this.closeModal}
                    handleOk={this.handleOk}
                    handleCancel={this.handleCancel}
                    onSubmit={this.handleSubmit}
                    clazzList={this.props.clazzList} />
            </div>
        );
    }
}
