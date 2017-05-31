import React, { Component, PropTypes } from 'react';
import { Table, Modal } from 'antd';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import I from 'immutable';

@connect(
    state => ({
        courseList: state.getIn(['course', 'list'])
    }),
    dispatch => bindActionCreators({}, dispatch)
)
export default class AddCourseModal extends Component {
    static propTypes = {
        courseList: PropTypes.object,
        currentCs: PropTypes.object,
        onAddCourse: PropTypes.func,
        closeModal: PropTypes.func,
        visible: PropTypes.bool
    };
    constructor(props) {
        super(props);
        this.state = {
            selectedRowKeys: []
        }
    }
    _renderCourseList = () => {
        // rowSelection object indicates the need for row selection
        const rowSelection = {
            onChange: (selectedRowKeys, selectedRows) => {

                this.state.selectedRowKeys = selectedRowKeys || [];
            }
        };
        const columns = [
            {
                title: '名称',
                dataIndex: 'name',
                key: 'name',
                render: (text, i) => <span>{text}</span>
            },
            {
                title: '总分',
                dataIndex: 'score',
                key: 'score',
                render: text => <a href="#">{text}</a>
            }
        ];
        let dataList = [];
        if (this.props.courseList) {
            let courseList = this.props.courseList.toJS();
            let selectedRowKeys = [];
            courseList.map((t, i) => {
                let tmp = {
                    key: t['type'] + ':' + t['_id'],
                    _id: t['_id'],
                    name: t['name'],
                    type: t['type'],
                    score: t['score'],
                    sentence: 0
                };
                dataList.push(tmp);
                if (this.props.currentCs && this.props.currentCs.courses.includes(tmp['key'])) {
                    selectedRowKeys.push(tmp['key']);
                }
            });
            rowSelection.getCheckboxProps =  (record) => {
                return { defaultChecked: selectedRowKeys.includes(record.key) };
            };
        }
        return (
            <Table pagination={false} scroll={{ y: 240 }} rowSelection={rowSelection} columns={columns} dataSource={dataList} />
        );
    }
    render() {
        if (!this.props.visible) {
            return null;
        }
        return (
            <Modal
              visible={this.props.visible}
              title="选择相应课程"
              okText="确认"
              onCancel={this.props.closeModal}
              onOk={() => this.props.onAddCourse(this.state.selectedRowKeys)}
            >
                {this._renderCourseList()}
            </Modal>
        );
    }
}
