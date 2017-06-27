// import {push} from 'react-router-redux';
import React, { Component, PropTypes } from 'react';
import { browserHistory, Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchOne } from 'redux/reducers/teacher';
import { Table } from 'antd';

@connect(
    state => ({
        teacherList: state.getIn(['teacher', 'list']),
        teacher: state.getIn(['teacher', 'teacher'])
    }),
    dispatch => bindActionCreators({fetchOne}, dispatch)
)
export default class TeacherDetail extends Component {
    static propTypes = {
        clazzList: PropTypes.object,
        teacher: PropTypes.object,
        fetchOne: PropTypes.func
    };
    constructor(props) {
        super(props);
        let teacher = props.teacherList.find(t => { return props.params.id === t.get('_id'); });
        this.state = {
            teacher
        };
    }
    componentDidMount() {
        let tid = this.props.params.id
        this.props.fetchOne(tid).then(() => {});
    }
    _renderTeacherList() {
        const columns = [
            {
                title: '班级名称',
                dataIndex: 'name',
                key: 'name',
                render: (text, i) => <span>{text}</span>
            }
        ];
        let teacher = this.props.teacher.toJS();
        let dataList = [];
        let clazzes = teacher.clazzes;
        if (clazzes && clazzes.length > 0){
            clazzes.map((c, i) => {
                let tmp = {
                    _id: c._id,
                    name: c.name
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
            <div>
                <div>
                    <h1>{this.state.teacher.get('name')}</h1>
                    <div>
                        <h3 style={{margin: '20px 0'}}>任课班级</h3>
                        {this._renderTeacherList()}
                    </div>
                </div>
            </div>
        );
    }
}
