import React, { Component, PropTypes } from 'react';
import { Form, Input, Button, Radio, Select } from 'antd';
const FormItem = Form.Item;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const Option = Select.Option;
import { formItemLayout, tailFormItemLayout } from '../../utils/component-config';

class AddTeacherForm extends Component {
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
        return (
            <Form onSubmit={this.handleSubmit}>
                <FormItem
                    {...formItemLayout}
                    label="姓名"
                    hasFeedback >
                    {getFieldDecorator('name', {
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
                <FormItem {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit" size="large">添加</Button>
                </FormItem>
            </Form>
        );
    }
}

export default Form.create()(AddTeacherForm);
