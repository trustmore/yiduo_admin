import React, { Component, PropTypes } from 'react';
import moment from 'moment';
import { Form, Input, Button, Radio, Select, Modal } from 'antd';
const FormItem = Form.Item;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const Option = Select.Option;
import { formItemLayout, tailFormItemLayout } from '../../utils/component-config';

class AddStudentForm extends Component {
    static propTypes = {
        onSubmit: PropTypes.func,
        clazzList: PropTypes.object,
        clazz: PropTypes.object,
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
    handleSelectChange = (value) => {
        console.log(value);
        this.props.form.setFieldsValue({
            clazz: value,
        });
    }
    renderOptions = () => {
        const options = [];
        console.log(this.props.clazzList.toJS());
        this.props.clazzList.map(clazz => {
            options.push(<Option key={clazz.get('_id')}>{clazz.get('name')}</Option>);
        });
        return options;
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        let name = this.props.edit ? this.props.student.name : undefined;
        let sex = this.props.edit ? this.props.student.sex : 'm';
        let ptel = this.props.edit ? this.props.student.ptel : undefined;
        let birthday = this.props.edit ? moment(this.props.student.birthday).format('YYYY-MM-DD') : undefined;
        let clazzDefault = this.props.clazz ? this.props.clazz._id : undefined;
        return (
            <Modal
              visible={this.props.visible}
              title="添加学生"
              okText="添加"
              onCancel={this.props.onCancel}
              onOk={this.props.onOk}
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
                                message: '请填写学生名字'
                            }, {
                                required: true,
                                message: '请填写学生名字',
                            }]
                        })(
                            <Input />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="性别" >
                        {getFieldDecorator('sex', {
                            initialValue: 'm'
                        })(
                            <RadioGroup>
                                <Radio value="m">男生</Radio>
                                <Radio value="f">女生</Radio>
                            </RadioGroup>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="生日"
                        hasFeedback >
                        {getFieldDecorator('birthday', {
                            initialValue: birthday,
                            rules: [{
                                pattern: /^\d{4}-\d{2}-\d{2}$/,
                                message: '生日格式为：2010-01-01'
                            }, {
                                required: false, message: '请填写生日',
                            }]
                        })(
                            <Input />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="家长手机"
                        hasFeedback >
                        {getFieldDecorator('ptel', {
                            initialValue: ptel,
                            rules: [{
                                pattern: /^1\d{10}$/,
                                message: '手机号码为 11 位'
                            }, {
                                required: false, message: '请填写手机号码',
                            }]
                        })(
                            <Input />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="班级" >
                        {getFieldDecorator('clazz', {
                            initialValue: clazzDefault,
                            rules: [{ required: true, message: '请选择班级' }],
                            onChange: this.handleSelectChange,
                        })(
                            <Select placeholder="请选择班级">
                                {this.renderOptions()}
                            </Select>
                        )}
                    </FormItem>
                </Form>
            </Modal>
        );
    }
}
const AddForm = Form.create()(AddStudentForm);

export default class AddModal extends Component {
    static propTypes = {
        onSubmit: PropTypes.func,
        handleOk: PropTypes.func,
        handleCancel: PropTypes.func,
        closeModal: PropTypes.func,
        clazzList: PropTypes.object,
        student: PropTypes.object,
        edit: PropTypes.bool,
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
        console.log('in modal', this.props);
        if (this.props.visible) {
            return (
                <AddForm
                    ref={this.saveFormRef}
                    visible={this.props.visible}
                    student={this.props.student}
                    edit={this.props.edit}
                    clazz={this.props.clazz}
                    onCancel={this.handleCancel}
                    onOk={this.handleOk}
                    onSubmit={this.props.handleOk}
                    clazzList={this.props.clazzList}
                />
            );
        }
        return null;
    }
}
