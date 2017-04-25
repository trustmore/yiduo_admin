// import {push} from 'react-router-redux';
import React, { Component, PropTypes } from 'react';
import {Link} from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Table, Icon } from 'antd';
import { create, update } from 'redux/reducers/clazz';
import { create as createStudent } from 'redux/reducers/student';
import AddModal from './AddModal';
import AddStudentModal from '../student/AddModal';

import style from 'styles/modules/home/home.scss';

@connect(
    state => ({
        clazzList: state.getIn(['clazz', 'list']),
        cs: state.getIn(['cs', 'cs']),
        teacherList: state.getIn(['teacher', 'list'])
    }),
    dispatch => bindActionCreators({create, update, createStudent}, dispatch)
)
export default class Student extends Component {
    static propTypes = {
        clazzList: PropTypes.object,
        teacherList: PropTypes.object,
        cs: PropTypes.object
    };
    constructor(props) {
        super(props);
        console.log('constructor', props.teacherList);
        this.state = {
            edit: false,
            visible: false,
            asVisible: false
        };
    }
    componentDidMount() {
    }
    onClickAddBtn = e => {
        e.preventDefault();
        this.setState({
            edit: false,
            asVisible: false,
            visible: true
        });
    }
    openEditModal = (e, cid) => {
        e.preventDefault();
        let currentClazz = this.props.clazzList.find((c) => {
            return c.get('_id') === cid;
        }).toJS();
        console.log('openEditModal', cid, currentClazz);
        this.setState({
            visible: true,
            asVisible: false,
            edit: true,
            currentClazz
        });
    }
    openAddStuModal = (e, cid) => {
        e.preventDefault();
        let currentClazz = this.props.clazzList.find((c) => {
            return c.get('_id') === cid;
        }).toJS();
        this.setState({
            visible: false,
            edit: false,
            asVisible: true,
            currentClazz
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
    closeAsModal = () => {
        this.setState({
            asVisible: false
        });
    }
    handleSubmit = (values) => {
        console.log('submit values', values);
        if (this.state.edit){
            values.cid = this.state.currentClazz._id;
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
    handleAsSubmit = (values) => {
        this.props.createStudent(values).then(ret => {
            this.setState({
                asVisible: false
            });
        });
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
                title: '课程集',
                dataIndex: 'cs',
                key: 'cs',
            },
            {
                title: '',
                key: 'rank',
                render: (text, s) => (
                    <span>
                        <a href="#" onClick={(e) => this.openAddStuModal(e, s._id)}>添加学生</a>
                        <span className="ant-divider" />
                        <a href="#" onClick={(e) => this.openEditModal(e, s._id)}>修改</a>
                        <span className="ant-divider" />
                        <a href="#">删除</a>
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
        return (
            <Table columns={columns} defaultPageSize={20} pagination={{defaultCurrent: 1, total: 50}} dataSource={dataList} />
        );
    }
    render() {
        return (
            <div id={style.home}>
                <div>
                    <h1>班级</h1>
                    <a onClick={this.onClickAddBtn} href="#">
                        <Icon type="user-add" />
                        <span>添加班级</span>
                    </a>
                </div>
                { this._renderClazzList() }

                <AddModal
                    visible={this.state.visible}
                    edit={this.state.edit}
                    currentClazz={this.state.currentClazz}
                    closeModal={this.closeModal}
                    handleOk={this.handleOk}
                    handleCancel={this.closeModal}
                    onSubmit={this.handleSubmit}
                    cs={this.props.cs}
                    teacherList={this.props.teacherList} />

                <AddStudentModal
                    visible={this.state.asVisible}
                    clazz={this.state.currentClazz}
                    closeModal={this.closeAsModal}
                    handleOk={this.handleAsOk}
                    handleCancel={this.closeAsModal}
                    onSubmit={this.handleAsSubmit}
                    clazzList={this.props.clazzList} />
            </div>
        );
    }
}
