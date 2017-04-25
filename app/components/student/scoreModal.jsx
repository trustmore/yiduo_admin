import React, { Component, PropTypes } from 'react';
import moment from 'moment';
import { Form, Input, Button, Radio, Select, Modal } from 'antd';
const FormItem = Form.Item;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const Option = Select.Option;
import { formItemLayout, tailFormItemLayout } from '../../utils/component-config';

class ScoreForm extends Component {
    static propTypes = {
        onSubmit: PropTypes.func,
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
        let score = this.props.edit ? this.props.score : undefined;
        let name = this.props.name;
        return (
            <Modal
              visible={this.props.visible}
              title={`给${name}打分`}
              okText="确定"
              onCancel={this.props.onCancel}
              onOk={this.props.onOk}
            >
                <Form>
                    <FormItem
                        {...formItemLayout}
                        label="分数"
                        hasFeedback >
                        {getFieldDecorator('score', {
                            initialValue: score,
                            rules: [{
                                pattern: /^[0-6]{1}$/,
                                message: '0 - 6 分'
                            }, {
                                required: true,
                                message: '请填写分数',
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
const EditScoreForm = Form.create()(ScoreForm);

export default class ScoreModal extends Component {
    static propTypes = {
        onSubmit: PropTypes.func,
        handleOk: PropTypes.func,
        handleCancel: PropTypes.func,
        closeModal: PropTypes.func,
        name: PropTypes.string,
        score: PropTypes.string,
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
                <EditScoreForm
                    ref={this.saveFormRef}
                    visible={this.props.visible}
                    edit={this.props.edit}
                    name={this.props.name}
                    score={this.props.score}
                    onCancel={this.handleCancel}
                    onOk={this.handleOk}
                />
            );
        }
        return null;
    }
}
