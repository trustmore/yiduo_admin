// import {push} from 'react-router-redux';
import React, { Component, PropTypes } from 'react';
import {Link, browserHistory} from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Table, Icon } from 'antd';
import { fetchOne, create, updateCourseSet } from 'redux/reducers/course-set';
import AddModal from './AddModal';
import AddCourseModal from './AddCourseModal';
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
    onClickAddBtn = e => {
        e.preventDefault();
        this.setState({
            visible: true
        });
    }
    showAddCourseModal = (e, csid) => {
        e.preventDefault();
        this.state.csid = csid;
        let currentCs = this.props.cs.find((c) => {
            return c.get('_id') === this.state.csid;
        }).toJS();
        console.log('currentCs', currentCs);
        this.setState({
            acvisible: true,
            currentCsId: csid,
            currentCs
        });
    }
    handleSubmit = (values) => {
        this.props.create(values).then(ret => {
            this.setState({
                visible: false
            });
        });
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
                render: (text, i) => <a href='#' onClick={(e) => this.linkToDetail(e, i._id)}>{text}</a>
            },
            {
                title: '课程数',
                dataIndex: 'courses',
                key: 'courses',
                render: text => <a href="#">{text}</a>,
            },
            {
                title: '操作',
                key: 'action',
                render: (text, i) => (
                    <span>
                        <a href='#'>编辑</a>
                        <span className="ant-divider" />
                        <a href='#'>删除</a>
                        <span className="ant-divider" />
                        <a href='#' onClick={(e) => this.showAddCourseModal(e, i._id)}>添加课程</a>
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
                    courses: t['courses'] ? t['courses'].length : 0
                };
                dataList.push(tmp);
            });
        }
        return (
            <Table columns={columns} defaultPageSize={20} pagination={{defaultCurrent: 1, total: 50}} dataSource={dataList} />
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
                    closeModal={this.closeAddModal}
                    handleCancel={this.closeAddModal}
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
