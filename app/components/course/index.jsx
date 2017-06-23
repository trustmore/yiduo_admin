// import {push} from 'react-router-redux';
import React, { Component, PropTypes } from 'react';
import {Link, browserHistory} from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Table, Icon, Select, Button, message} from 'antd';
const Option = Select.Option;
import { fetch, fetchOne } from 'redux/reducers/course';
import { addCourseToCs } from 'redux/reducers/course-set';

import style from 'styles/modules/home/home.scss';

@connect(
    state => ({
        isFetching: state.getIn(['course', 'isFetching']),
        cs: state.getIn(['cs', 'cs']),
        total: state.getIn(['course', 'total']),
        page: state.getIn(['course', 'page']),
        courseList: state.getIn(['course', 'list'])
    }),
    dispatch => bindActionCreators({fetch, fetchOne, addCourseToCs}, dispatch)
)
export default class CourseList extends Component {
    static propTypes = {
        courseList: PropTypes.object,
        isFetching: PropTypes.object,
        total: PropTypes.number,
        page: PropTypes.number,
        addCourseToCs: PropTypes.func,
        fetchOne: PropTypes.func
    };
    constructor(props) {
        super(props);
        this.state = {
            type: 'all',
            grade: 'all',
            grades: [
                '学前',
                '一年级',
                '二年级',
                '三年级',
                '四年级',
                '五年级',
                '六年级',
                '七年级',
                '八年级',
                '九年级'
            ]
        };
    }
    componentWillMount() {
        if (!this.props.cs){
            browserHistory.push('/');
        }
    }
    componentDidMount() {
        this.props.fetch({page: 1, pageSize: 20});
    }
    _renderLoading() {
        if (this.props.isFetching) {
            return (
                <p>fetching...</p>
            );
        }
    }
    linkToAdd(e, id, edit) {
        e.preventDefault();
        let url = edit ? `/course/add?id=${id}&edit=true` : `/course/add?id=${id}`;
        this.props.fetchOne(id).then(ret => {
            if (ret && ret.type === 'success') {
                browserHistory.push(url);
            }
        });
    }
    onFilter = (value, type) => {
        this.state[type] = value;
        let params = {};
        this.state.type == 'all' ? null : params.type = this.state.type;
        this.state.grade == 'all' ? null : params.grade = this.state.grade;
        this.props.fetch(params);
    }
    renderOptions = () => {
        const options = [];
        if (this.props.cs){
            this.props.cs.map(t => {
                options.push(<Option value={t.get('_id')} key={t.get('_id')}>{t.get('name')}</Option>);
            });
            return options;
        }
    }
    onTargetCsChange = (value) => {
        if (value != 'none'){
            this.setState({
                targetCs: value
            });
        }
    }
    addCourseToCs = () => {
        if (!this.state.selectedRowKeys || this.state.selectedRowKeys.length == 0){
            return message.warn('请选择课程');
        }
        if (!this.state.targetCs){
            return message.warn('请选择课程集');
        }
        this.props.addCourseToCs({
            csid: this.state.targetCs,
            courses: JSON.stringify(this.state.selectedRowKeys)
        });
    }
    _renderAddToCs() {
        return (
            <div>
                <span>将已选课程添加到课程集: &nbsp;&nbsp;</span>
                <Select onChange={(value) => {this.onTargetCsChange(value)}} defaultValue='none' style={{ width: 120 }} >
                    <Option value="none">选择课程</Option>
                    {this.renderOptions()}
                </Select>&nbsp;&nbsp;
                <Button onClick={() => {this.addCourseToCs()}} type="primary">添加</Button>
            </div>
        );
    }
    _renderCourseList() {
        const rowSelection = {
            onChange: (selectedRowKeys, selectedRows) => {
                this.setState({
                    selectedRowKeys: selectedRowKeys
                });
            }
        };
        const columns = [
            {
                title: '名称',
                dataIndex: 'name',
                key: 'name',
                render: (text, i) => <Link to={`/course/${i._id}`}>{text}</Link>
            },
            {
                title: '简称',
                dataIndex: 'abbr',
                key: 'abbr',
                render: (text, i) => <span>{text}</span>
            },
            {
                title: '总分',
                dataIndex: 'score',
                key: 'score',
                render: text => <a href="#">{text}</a>
            },
            {
                title: '适用年级',
                dataIndex: 'grade',
                key: 'grade',
                render: text => {
                    let value = '';
                    if (text !== undefined) {
                        value = this.state.grades[parseInt(text)];
                    }
                    return (
                        <span>{value}</span>
                    );
                }
            },
            {
                title: '操作',
                key: 'action',
                render: (text, i) => (
                    <span>
                        <a href='#' onClick={(e) => this.linkToAdd(e, i._id, true)}>编辑</a>
                        <span className="ant-divider" />
                        <a href='#' onClick={(e) => this.linkToAdd(e, i._id)}>复制并添加课程</a>
                    </span>
                )
            }
        ];
        let dataList = [];
        if (this.props.courseList) {
            let courseList = this.props.courseList.toJS();
            courseList.map((t, i) => {
                let tmp = {
                    key: `${t['type']}:${t['_id']}`,
                    _id: t['_id'],
                    name: t['name'],
                    abbr: t['abbr'],
                    score: t['score'],
                    grade: t['grade'],
                    sentence: 0
                };
                dataList.push(tmp);
            })
        }
        let pagination = {
            pageSize: 20,
            current: this.props.page,
            total: this.props.total,
            onChange: (page, pageSize) => {
                let params = {page, pageSize};
                this.state.type == 'all' ? null : params.type = this.state.type;
                this.state.grade == 'all' ? null : params.grade = this.state.grade;
                this.props.fetch(params);
            }
        }
        return (
            <Table columns={columns} rowSelection={rowSelection} pagination={pagination} dataSource={dataList} />
        );
    }
    render() {
        return (
            <div id={style.home}>
                <div>
                    <h1>课程</h1>
                    <Link to="/course/add">
                        <span>添加新课程</span>
                    </Link>

                    <span className="ant-divider" />

                    <Link to="/cs">
                        <span>查看课程集</span>
                    </Link>
                </div>
                <div style={{margin: '20px 0'}}>
                    <span>课程筛选:&nbsp; </span>
                    <Select onChange={(value) => {this.onFilter(value, 'type')}} defaultValue='all' style={{ width: 120 }} >
                        <Option value="all">全部</Option>
                        <Option value="performance">课堂表现</Option>
                        <Option value="dictation">听写</Option>
                        <Option value="recite">背诵</Option>
                        <Option value="preview">预习</Option>
                    </Select>
                    <span> &nbsp;</span>
                    <Select onChange={(value) => {this.onFilter(value, 'grade')}} defaultValue='all' style={{ width: 120 }} >
                        <Option value="all">全部</Option>
                        <Option value="0">学前</Option>
                        <Option value="1">一年级</Option>
                        <Option value="2">二年级</Option>
                        <Option value="3">三年级</Option>
                        <Option value="4">四年级</Option>
                        <Option value="5">五年级</Option>
                        <Option value="6">六年级</Option>
                        <Option value="7">七年级</Option>
                        <Option value="8">八年级</Option>
                        <Option value="9">九年级</Option>
                    </Select>
                </div>
                { this._renderLoading() }
                { this._renderCourseList() }
                { this._renderAddToCs() }
            </div>
        );
    }
}
