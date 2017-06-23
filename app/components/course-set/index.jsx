// import {push} from 'react-router-redux';
import React, { Component, PropTypes } from 'react';
import {Link, browserHistory} from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Table, Icon } from 'antd';
import { fetchOne, create, updateCourseSet } from 'redux/reducers/course-set';
import AddModal from './addModal';
import AddCourseModal from './addCourseModal';
import I from 'immutable';

import style from 'styles/modules/home/home.scss';

@connect(
    state => ({
        cs: state.getIn(['cs', 'cs'])
    }),
    dispatch => bindActionCreators({fetchOne, create, updateCourseSet}, dispatch)
)
export default class CsList extends Component {
    static propTypes = {
        fetchOne: PropTypes.func,
        create: PropTypes.func,
        cs: PropTypes.object
    };
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            edit: false,
            acvisible: false
        };
    }
    componentDidMount() {
    }
    linkToDetail(e, id) {
        e.preventDefault();
        this.props.fetchOne(id).then(ret => {
            if (ret && ret.type === 'success') {
                browserHistory.push(`/cs/${id}`);
            }
        });
    }
    linkToEdit(e, id) {
        e.preventDefault();
        this.props.fetchOne(id).then(ret => {
            if (ret && ret.type === 'success') {
                browserHistory.push(`/cs/${id}/edit`);
            }
        });
    }
    onClickAddBtn = e => {
        e.preventDefault();
        this.setState({
            edit: false,
            visible: true
        });
    }
    showAddCourseModal = (e, csid) => {
        e.preventDefault();
        this.state.csid = csid;
        let currentCs = this.props.cs.find((c) => {
            return c.get('_id') === this.state.csid;
        }).toJS();
        this.setState({
            acvisible: true,
            currentCsId: csid,
            currentCs
        });
    }
    showEditModal = (e, csid) => {
        e.preventDefault();
        this.state.csid = csid;
        let currentCs = this.props.cs.find((c) => {
            return c.get('_id') === this.state.csid;
        }).toJS();
        this.setState({
            visible: true,
            edit: true,
            currentCsId: csid,
            currentCs
        });
    }
    handleSubmit = (values) => {
        if (this.state.edit) {
            this.props.updateCourseSet({
                csid: this.state.csid,
                name: values.name
            }).then(ret => {
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
    closeAddModal = () => {
        this.setState({
            visible: false
        });
    }
    closeAddCourseModal = () => {
        this.setState({
            acvisible: false
        });
    }
    handleAddCourse = (keys) => {
        this.props.updateCourseSet({
            csid: this.state.csid,
            courses: keys
        }).then(ret => {
            this.closeAddCourseModal();
        });
    }
    _renderCsList() {
        const columns = [
            {
                title: '名称',
                dataIndex: 'name',
                key: 'name',
                render: (text, i) => <span>{text}</span>
            },
            {
                title: '课程数',
                dataIndex: 'courses',
                key: 'courses',
                render: text => <span>{text}</span>
            },
            {
                title: '操作',
                key: 'action',
                render: (text, i) => (
                    <span>
                        <a href='#' onClick={(e) => this.showEditModal(e, i._id)}>修改名称</a>
                        <span className="ant-divider" />
                        <a href='#' onClick={(e) => this.linkToEdit(e, i._id)}>增删课程</a>
                        <span className="ant-divider" />
                        <a href='#' onClick={(e) => this.linkToDetail(e, i._id)}>调整课程顺序</a>
                    </span>
                )
            }
        ];
        let dataList = [];
        if (this.props.cs) {
            let csList = this.props.cs.toJS();
            csList.map((t, i) => {
                let tmp = {
                    key: t['_id'],
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
        return (
            <div id={style.home}>
                <div>
                    <h1>课程集</h1>
                    <a onClick={this.onClickAddBtn} href="#">
                        <Icon type="user-add" />
                        <span>添加课程集</span>
                    </a>
                </div>
                { this._renderCsList() }
                <AddModal
                    visible={this.state.visible}
                    edit={this.state.edit}
                    closeModal={this.closeAddModal}
                    handleCancel={this.closeAddModal}
                    currentCs={this.state.currentCs}
                    onSubmit={this.handleSubmit} />
                <AddCourseModal
                    visible={this.state.acvisible}
                    currentCs={this.state.currentCs}
                    closeModal={this.closeAddCourseModal}
                    onAddCourse={this.handleAddCourse} />
            </div>
        );
    }
}
