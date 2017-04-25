import React, { Component, PropTypes } from 'react';
import { Form, Input, Button, Radio, Select, Modal } from 'antd';
const FormItem = Form.Item;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const Option = Select.Option;
import { formItemLayout, tailFormItemLayout } from '../../utils/component-config';

class AddTeacherForm extends Component {
    static propTypes = {
        visible: PropTypes.bool,
        edit: PropTypes.bool,
        currentTea: PropTypes.object,
        onOk: PropTypes.func,
        onCancel: PropTypes.func
    };
    handleSubmit = (e) => {
        e.preventDefault();
        console.log('====', this.props);
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                this.props.onOk(values);
            }
        });
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        let currentTea = this.props.currentTea;
        let name = this.props.edit ? currentTea.name : undefined;
        let fname = this.props.edit ? currentTea.fname : undefined;
        let ename = this.props.edit ? currentTea.ename : undefined;
        let sex = this.props.edit ? currentTea.sex : 'm';
        let okText = this.props.edit ? '修改' : '添加';
        return (
            <Modal
              visible={this.props.visible}
              title="姓名"
              okText={okText}
              onCancel={this.props.onCancel}
              onOk={this.handleSubmit}
            >
                <Form>
                    <FormItem
                        {...formItemLayout}
                        label="姓名"
                        hasFeedback >
                        {getFieldDecorator('name', {
                            initialValue: name,
                            rules: [{
                                pattern: /\S+/,
                                message: '请填写老师名字'
                            }, {
                                required: true,
                                message: '请填写老师名字',
                            }]
                        })(
                            <Input />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="姓"
                        hasFeedback >
                        {getFieldDecorator('fname', {
                            initialValue: fname,
                            rules: [{
                                pattern: /\S+/,
                                message: '请填写老师姓氏'
                            }, {
                                required: true,
                                message: '请填写老师姓氏',
                            }]
                        })(
                            <Input />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="英文名"
                        hasFeedback >
                        {getFieldDecorator('ename', {
                            initialValue: ename,
                            rules: [{
                                pattern: /\S+/,
                                message: '请填写英文名'
                            }, {
                                required: false,
                                message: '请填写英文名',
                            }]
                        })(
                            <Input />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="性别" >
                        {getFieldDecorator('sex', {
                            initialValue: sex
                        })(
                            <RadioGroup>
                                <Radio value="m">男</Radio>
                                <Radio value="f">女</Radio>
                            </RadioGroup>
                        )}
                    </FormItem>
                </Form>
            </Modal>
        );
    }
}
const AddForm = Form.create()(AddTeacherForm);

export default class AddModal extends Component {
    static propTypes = {
        visible: PropTypes.bool,
        edit: PropTypes.bool,
        currentTea: PropTypes.object,
        onOk: PropTypes.func,
        onCancel: PropTypes.func
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
                currentTea={this.props.currentTea}
                onOk={this.props.onOk}
                onCancel={this.props.onCancel}
            />
        );
    }
}
