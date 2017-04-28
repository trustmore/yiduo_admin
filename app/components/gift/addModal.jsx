import React, { Component, PropTypes } from 'react';
import { Form, Input, Button, Radio, Select, Modal, Upload, Icon, message } from 'antd';
const FormItem = Form.Item;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const Option = Select.Option;
import { formItemLayout, tailFormItemLayout } from '../../utils/component-config';
import { getToken } from '../../utils/request';

class AddGiftForm extends Component {
    static propTypes = {
        visible: PropTypes.bool,
        edit: PropTypes.bool,
        currentGift: PropTypes.object,
        onOk: PropTypes.func,
        onCancel: PropTypes.func
    };
    constructor(props) {
        super(props);
        this.state = {
            image: props.currentGift ? props.currentGift.image : undefined
        };
    }
    handleSubmit = (e) => {
        e.preventDefault();
        const image = this.state.image;
        if (!image) {
            return message.error('请上传奖品图片');
        }
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                values.image = image;
                this.props.onOk(values);
            }
        });
    }
    _onUploadSuccess = (obj) => {
        console.log('_onUploadSuccess', obj.response.path);
        this.state.image = obj.response.path;
    }
    _onUploadRemove = () => {
        delete this.state.image;
    }
    _renderUploadBtn() {
        return (
            <div>
                <Icon type="plus" />
                <div className="ant-upload-text">上传奖品图片</div>
            </div>
        );
    }
    _renderUpload = () => {
        console.log('_renderUpload', '--------');
        let defaultFileList = this.props.edit ? [{
            uid: 'xxx',
            name: 'xxx.png',
            status: 'done',
            url: this.props.currentGift.image
        }] : [];
        let uploadProps = {
            name: 'file',
            action: '/api/upload/image',
            listType: "picture-card",
            defaultFileList,
            headers: {
                authorization: getToken()
            },
            onChange: (info) => {
                if (info.file.status === 'removed') {
                    this._onUploadRemove();
                }
                if (info.file.status === 'done') {
                    message.success(`${info.file.name} 上传成功`);
                    console.log('_onUploadSuccess', info);
                    this._onUploadSuccess(info.file);
                } else if (info.file.status === 'error') {
                    message.error(`${info.file.name} 上传失败`);
                }
            }
        };
        return (
            <Upload {...uploadProps}>
                {this._renderUploadBtn()}
            </Upload>
        );
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        let currentGift = this.props.currentGift;
        let name = this.props.edit ? currentGift.name : undefined;
        let stock = this.props.edit ? currentGift.stock : undefined;
        let points = this.props.edit ? currentGift.points : undefined;
        let status = this.props.edit ? currentGift.status : 'able';
        let okText = this.props.edit ? '修改' : '添加';
        return (
            <Modal
              visible={this.props.visible}
              title="奖品"
              okText={okText}
              onCancel={this.props.onCancel}
              onOk={this.handleSubmit}
            >
                <Form>
                    <FormItem
                        {...formItemLayout}
                        label="名称"
                        hasFeedback >
                        {getFieldDecorator('name', {
                            initialValue: name,
                            rules: [{
                                pattern: /\S+/,
                                message: '请填写奖品名称'
                            }, {
                                required: true,
                                message: '请填写奖品名称',
                            }]
                        })(
                            <Input />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="库存"
                        hasFeedback >
                        {getFieldDecorator('stock', {
                            initialValue: stock,
                            rules: [{
                                pattern: /^\d+$/,
                                message: '请填写库存数量'
                            }, {
                                required: true,
                                message: '请填写库存数量',
                            }]
                        })(
                            <Input />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="兑换积分"
                        hasFeedback >
                        {getFieldDecorator('points', {
                            initialValue: points,
                            rules: [{
                                pattern: /^\d+$/,
                                message: '请填写所需积分'
                            }, {
                                required: true,
                                message: '请填写所需积分',
                            }]
                        })(
                            <Input />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="奖品状态" >
                        {getFieldDecorator('status', {
                            initialValue: status
                        })(
                            <RadioGroup>
                                <Radio value="able">可兑换</Radio>
                                <Radio value="disabled">不可兑换</Radio>
                            </RadioGroup>
                        )}
                    </FormItem>
                </Form>
                <div style={{margin: '0 50px'}}>
                    {this._renderUpload()}
                </div>
            </Modal>
        );
    }
}
const AddForm = Form.create()(AddGiftForm);

export default class AddModal extends Component {
    static propTypes = {
        visible: PropTypes.bool,
        edit: PropTypes.bool,
        currentGift: PropTypes.object,
        onOk: PropTypes.func,
        onCancel: PropTypes.func
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
                currentGift={this.props.currentGift}
                onOk={this.props.onOk}
                onCancel={this.props.onCancel}
            />
        );
    }
}
