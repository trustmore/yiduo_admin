import React, { Component, PropTypes } from 'react';
import { Form, Input, Button, Radio, Select } from 'antd';
const FormItem = Form.Item;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const Option = Select.Option;

class AddStudentForm extends Component {
    static propTypes = {
        onSubmit: PropTypes.func,
        clazzList: PropTypes.object
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
        this.props.clazzList.map(clazz => {
            options.push(<Option key={clazz.get('_id')}>{clazz.get('name')}</Option>);
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
                    label="姓名"
                    hasFeedback >
                    {getFieldDecorator('name', {
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
                        rules: [{
                            pattern: /^\d{4}-\d{2}-\d{2}$/,
                            message: '生日格式为：2010-01-01'
                        }, {
                            required: true, message: '请填写生日',
                        }]
                    })(
                        <Input />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="班级" >
                    {getFieldDecorator('clazz', {
                        rules: [{ required: true, message: '请选择班级' }],
                        onChange: this.handleSelectChange,
                    })(
                        <Select placeholder="请选择班级">
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
