import React, { Component, PropTypes } from 'react';
import { Modal } from 'antd';
import AddStudentForm from './addStudentForm';

export default class AddStudentModal extends Component {
    static propTypes = {
        onSubmit: PropTypes.func,
        handleOk: PropTypes.func,
        handleCancel: PropTypes.func,
        clazzList: PropTypes.object,
        visible: PropTypes.bool
    };
    constructor(props) {
        super(props);
    }
    render() {
        console.log('AddModal', this.props);
        return (
            <Modal title="Basic Modal"
                visible={this.props.visible}
                onOk={this.props.handleOk}
                onCancel={this.props.handleCancel} >
                <AddStudentForm clazzList={this.props.clazzList} onSubmit={this.props.onSubmit} />
            </Modal>
        );
    }
}
