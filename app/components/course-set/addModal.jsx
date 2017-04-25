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
        const { getFieldDecorator } = this.props.form;
        return (
            <Modal
              visible={this.props.visible}
              title="添加课程集"
              okText="添加"
              onCancel={this.props.onCancel}
              onOk={this.props.onOk}
            >
                <Form onSubmit={this.handleSubmit}>
                    <FormItem
                        {...formItemLayout}
                        label="名称"
                        hasFeedback >
                        {getFieldDecorator('name', {
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
        visible: PropTypes.bool
    };
    constructor(props) {
        super(props);
    }
    handleOk = () => {
        console.log('handleOk', this.props);
        this.form.validateFieldsAndScroll((err, values) => {
            if (err){ return; }
            console.log('Received values of form: ', values);
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
        return (
            <AddForm
                ref={this.saveFormRef}
                visible={this.props.visible}
                onCancel={this.handleCancel}
                onOk={this.handleOk}
                onSubmit={this.props.handleOk}
            />
        );
    }
}