import React, { Component, PropTypes } from 'react';
import { Form, Input, Button, Radio, Select, Modal } from 'antd';
const FormItem = Form.Item;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const Option = Select.Option;
import { formItemLayout, tailFormItemLayout } from '../../utils/component-config';

class AddCsForm extends Component {
    static propTypes = {
        onSubmit: PropTypes.func,
        clazzList: PropTypes.object,
        visible: PropTypes.bool,
        edit: PropTypes.bool,
        currentCs: PropTypes.object,
        onCancel: PropTypes.func,
        onOk: PropTypes.func
    };
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                this.props.onSubmit(values);
            }
        });
    }
    render() {
        console.log('cs modal ', this.props);
        const { getFieldDecorator } = this.props.form;
        let name = this.props.edit ? this.props.currentCs.name : undefined;
        let okText = this.props.edit ? '修改' : '添加';
        let title = this.props.edit ? '修改课程集' : '添加课程集';
        return (
            <Modal
              visible={this.props.visible}
              title={title}
              okText={okText}
              onCancel={this.props.onCancel}
              onOk={this.props.onOk}
            >
                <Form onSubmit={this.handleSubmit}>
                    <FormItem
                        {...formItemLayout}
                        label="名称"
                        hasFeedback >
                        {getFieldDecorator('name', {
                            initialValue: name,
                            rules: [{
                                pattern: /\S+/,
                                message: '课程集名称空白'
                            }, {
                                required: true,
                                message: '请填写课程集名称',
                            }]
                        })(
                            <Input />
                        )}
                    </FormItem>
                </Form>
            </Modal>
        );
    }
}
const AddForm = Form.create()(AddCsForm);

export default class AddModal extends Component {
    static propTypes = {
        onSubmit: PropTypes.func,
        handleOk: PropTypes.func,
        handleCancel: PropTypes.func,
        closeModal: PropTypes.func,
        currentCs: PropTypes.object,
        visible: PropTypes.bool,
        edit: PropTypes.bool
    };
    constructor(props) {
        super(props);
    }
    handleOk = () => {
        this.form.validateFieldsAndScroll((err, values) => {
            if (err){ return; }
            this.props.onSubmit(values);
        });
    }
    handleCancel = () => {
        this.props.closeModal();
    }
    saveFormRef = (form) => {
        this.form = form;
    }
    render() {
        if (!this.props.visible) {
            return null;
        }
        return (
            <AddForm
                ref={this.saveFormRef}
                visible={this.props.visible}
                edit={this.props.edit}
                currentCs={this.props.currentCs}
                onCancel={this.handleCancel}
                onOk={this.handleOk}
                onSubmit={this.props.handleOk}
            />
        );
    }
}
