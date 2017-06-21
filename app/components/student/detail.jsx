// import {push} from 'react-router-redux';
import React, { Component, PropTypes } from 'react';
import { browserHistory, Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchOne, mark } from 'redux/reducers/student';
import { Table } from 'antd';
import ScoreModal from './scoreModal';
import moment from 'moment';

@connect(
    state => ({
        detail: state.getIn(['student', 'detail']),
        isFetching: state.getIn(['student', 'isFetching']),
        teacherList: state.getIn(['teacher', 'list'])
    }),
    dispatch => bindActionCreators({fetchOne, mark}, dispatch)
)
export default class StudentDetail extends Component {
    static propTypes = {
        detail: PropTypes.object,
        teacherList: PropTypes.object,
        isFetching: PropTypes.bool,
        fetchOne: PropTypes.func
    };
    constructor(props) {
        super(props);
        let id = props.params.id
        this.state = {
            isFetching: true,
            sid: id
        };
    }
    componentDidMount() {
        this.props.fetchOne(this.state.sid).then(() => {
            this.setState({
                isFetching: false
            });
        });
    }
    onClickEditBtn(e, cid) {
        e.preventDefault();
        this.setState({
            visible: true,
            cid: cid
        });
    }
    closeModal = () => {
        this.setState({
            visible: false
        });
    }
    handleSubmit = (values) => {
        values.cid = this.state.cid;
        values.sid = this.state.sid;
        this.props.mark(values).then(() => {
            this.setState({
                visible: false
            });
        });
    }
    _renderStudentList() {
        const columns = [
            {
                title: '课程',
                dataIndex: 'name',
                key: 'name',
                render: (text, i) => <span>{text}</span>
            },
            {
                title: '得分',
                dataIndex: 'stars',
                key: 'stars',
            },
            {
                title: '打分时间',
                dataIndex: 'date',
                key: 'date',
            },
            {
                title: '操作',
                key: 'action',
                render: (text, i) => {
                    return (
                        <span>
                            <a onClick={(e) => this.onClickEditBtn(e, i._id)} href="#">
                                <span>修改分数</span>
                            </a>
                        </span>
                    );
                }
            }
        ];
        let detail = this.props.detail.toJS();
        let dataList = [];
        let courses = detail.courses;
        let stucourses = detail.stucourses;
        courses.map((c, i) => {
            let stucourse = stucourses.find(r => {
                return c._id === r.course;
            });
            let stars = '';
            if (stucourse){
                if (stucourse.mark) {
                    stars = stucourse.mark.score || '';
                }
            }
            let tmp = {
                _id: c._id,
                name: c.name,
                key: c._id,
                stars,
                date: stucourse ? moment(stucourse.updateTime).format('YYYY-MM-DD HH:mm') : ''
            };
            dataList.push(tmp);
        })
        return (
            <Table columns={columns} pagination={false} dataSource={dataList} />
        );
    }
    render() {
        if (this.state.isFetching) {
            return (
                <dix>loading...</dix>
            );
        }
        let detail = this.props.detail.toJS();
        console.log('detail===>', detail);
        let stucourse = detail.stucourses.find(r => {
            return detail.student._id === r.course;
        });
        let score = stucourse ? stucourse.score : '';
        return (
            <div>
                <div>
                    <h1>{detail.student.name}</h1>
                </div>
                <p>家长电话: {detail.student.ptel}</p>
                <div>
                    <h3 style={{margin: '20px 0'}}>课程学习情况</h3>
                    {this._renderStudentList()}
                </div>

                <ScoreModal
                    visible={this.state.visible}
                    name={detail.student.name}
                    score={score}
                    closeModal={this.closeModal}
                    handleOk={this.handleOk}
                    handleCancel={this.handleCancel}
                    onSubmit={this.handleSubmit} />
            </div>
        );
    }
}
