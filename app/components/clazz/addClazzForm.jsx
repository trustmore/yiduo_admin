import React, { Component, PropTypes } from 'react';
import { Form, Input, Button, Radio, Select } from 'antd';
const FormItem = Form.Item;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const Option = Select.Option;

class AddStudentForm extends Component {
    static propTypes = {
        onSubmit: PropTypes.func,
        clazzList: PropTypes.object,
        teacherList: PropTypes.object
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
            teachers: value,
        });
    }
    renderOptions = () => {
        const options = [];
        this.props.teacherList.map(t => {
            options.push(<Option key={t.get('_id')}>{clazz.get('name')}</Option>);
        });
        return options;
    }
    render() {
        console.log('----', this.props.clazzList);
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 6 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 14 },
            }
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 14,
                    offset: 6,
                }
            }
        };
        return (
            <Form onSubmit={this.handleSubmit}>
                <FormItem
                    {...formItemLayout}
                    label="名称"
                    hasFeedback >
                    {getFieldDecorator('name', {
                        rules: [{
                            pattern: /\S+/,
                            message: '请填写班级名称'
                        }, {
                            required: true,
                            message: '请填写班级名称',
                        }]
                    })(
                        <Input />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="年级" >
                    {getFieldDecorator('grade', {
                        rules: [{
                            type: 'number',
                            message: '请填写年级数字'
                        }, {
                            required: true,
                            message: '请填写年级',
                        }]
                    })(
                        <Input />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="班次" >
                    {getFieldDecorator('rank', {
                        rules: [{
                            type: 'number',
                            message: '请填写班次数字'
                        }, {
                            required: true,
                            message: '请填写班次',
                        }]
                    })(
                        <Input />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="任课老师" >
                    {getFieldDecorator('teachers', {
                        rules: [{ required: true, message: '请选择任课老师' }],
                        onChange: this.handleSelectChange,
                    })(
                        <Select placeholder="请选择任课老师">
                            {this.renderOptions()}
                        </Select>
                    )}
                </FormItem>
                <FormItem {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit" size="large">添加</Button>
                </FormItem>
            </Form>
        );
    }
}

export default Form.create()(AddStudentForm);
