import React, { Component, PropTypes } from 'react';
import { Form, Input, Button, Radio, Select, Modal } from 'antd';
const FormItem = Form.Item;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const Option = Select.Option;
import { formItemLayout, tailFormItemLayout } from '../../utils/component-config';

class AddClazzForm extends Component {
    static propTypes = {
        onSubmit: PropTypes.func,
        visible: PropTypes.bool,
        edit: PropTypes.bool,
        onCancel: PropTypes.func,
        onOk: PropTypes.func,
        clazzList: PropTypes.object,
        teacherList: PropTypes.object,
        currentClazz: PropTypes.object,
        cs: PropTypes.object
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
    renderTeacherOptions = () => {
        const options = [];
        this.props.teacherList.map(t => {
            options.push(<Option key={t.get('_id')}>{t.get('name')}</Option>);
        });
        return options;
    }
    renderCsOptions = () => {
        const options = [];
        this.props.cs.map(t => {
            options.push(<Option value={t.get('_id')} key={t.get('_id')}>{t.get('name')}</Option>);
        });
        return options;
    }
    render() {
        console.log('in AddModal', this.props.currentClazz);
        const { getFieldDecorator } = this.props.form;
        let nameInitValue = this.props.edit ? this.props.currentClazz.name : undefined;
        let tInitValue = this.props.edit ? this.props.currentClazz.teachers : undefined;
        let csInitValue = this.props.edit ? this.props.currentClazz.cs : undefined;
        let okText = this.props.edit ? "修改" : "添加";
        return (
            <Modal
              visible={this.props.visible}
              title="名称"
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
                            initialValue: nameInitValue,
                            rules: [{
                                pattern: /\S+/,
                                message: '请填写班级名字'
                            }, {
                                required: true,
                                message: '请填写班级名字',
                            }]
                        })(
                            <Input />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="任课老师" >
                        {getFieldDecorator('teachers', {
                            initialValue: tInitValue,
                            rules: [{ required: true, message: '请选择任课老师' }],
                            onChange: this.handleTeacherChange,
                        })(
                            <Select multiple placeholder="请选择任课老师">
                                {this.renderTeacherOptions()}
                            </Select>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="课程集" >
                        {getFieldDecorator('cs', {
                            initialValue: csInitValue,
                            rules: [{ required: true, message: '请选择课程集' }],
                            onChange: this.handleCsChange,
                        })(
                            <Select placeholder="请选择课程集">
                                {this.renderCsOptions()}
                            </Select>
                        )}
                    </FormItem>
                </Form>
            </Modal>
        );
    }
}
const AddForm = Form.create()(AddClazzForm);

export default class AddModal extends Component {
    static propTypes = {
        onSubmit: PropTypes.func,
        handleOk: PropTypes.func,
        handleCancel: PropTypes.func,
        closeModal: PropTypes.func,
        clazzList: PropTypes.object,
        cs: PropTypes.object,
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
        if (this.props.visible) {
            return (
                <AddForm
                    ref={this.saveFormRef}
                    visible={this.props.visible}
                    edit={this.props.edit}
                    currentClazz={this.props.currentClazz}
                    onCancel={this.handleCancel}
                    onOk={this.handleOk}
                    onSubmit={this.props.handleOk}
                    clazzList={this.props.clazzList}
                    teacherList={this.props.teacherList}
                    cs={this.props.cs}
                />
            );
        }
        return null;
    }
}
