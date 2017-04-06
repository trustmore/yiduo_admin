import React, { Component, PropTypes } from 'react';
import { Form, Input, Button, Radio, Select, Icon, Upload, message } from 'antd';
import { formItemLayout, tailFormItemLayout } from '../../utils/component-config';
import { getToken } from '../../utils/request';
const FormItem = Form.Item;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const Option = Select.Option;
let uuid = 0;

class AddArticleForm extends Component {
    static propTypes = {
        onSubmit: PropTypes.func,
        clazzList: PropTypes.object,
        voices: PropTypes.object,
        teacherList: PropTypes.object
    };
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                console.log('props: ', this.props);
                let voiceUploaded = true;
                for (let key in values) {
                    if (key.match(/^sentence-/)) {
                        let voiceKey = key.replace(/^sentence-/, 'voice-');
                        if (!this.props.voice[voiceKey]) {
                            voiceUploaded = false;
                        }
                    }
                }
                if (!voiceUploaded) {
                    message.warn('请上传相应语音');
                    return false;
                } else {
                    for (let key in this.props.voice) {
                        values[key] = this.props.voice[key];
                    }
                }
                this.props.onSubmit(values);
            }
        });
    }
    remove = (k) => {
        const { form } = this.props;
        const keys = form.getFieldValue('keys');
        if (keys.length === 1) {
            return;
        }
        form.setFieldsValue({
            keys: keys.filter(key => key !== k)
        });
        delete this.props.voice[`voice-${k}`];
    }
    add = () => {
        uuid++;
        const { form } = this.props;
        const keys = form.getFieldValue('keys');
        const nextKeys = keys.concat(uuid);
        console.log('add==>', keys, nextKeys);
        form.setFieldsValue({
            keys: nextKeys,
        });
    }

    render() {
        console.log('----', this.props.clazzList);
        const { getFieldDecorator, getFieldValue } = this.props.form;
        const formItemLayout = {
          labelCol: {
            xs: { span: 24 },
            sm: { span: 4 },
          },
          wrapperCol: {
            xs: { span: 24 },
            sm: { span: 20 },
          },
        };
        const formItemLayoutWithOutLabel = {
          wrapperCol: {
            xs: { span: 24, offset: 0 },
            sm: { span: 20, offset: 4 },
          },
        };
        const uplaodDefaultProps = {
            name: 'file',
            action: '/api/upload/voice',
            headers: {
                authorization: getToken(),
            },
            defaultFileList: []
        };
        getFieldDecorator('keys', { initialValue: [] });
        const keys = getFieldValue('keys');

        const formItems = keys.map((k, index) => {
            let voice = `voice-${k}`;
            let uplaodProps = Object.assign({
                voice,
                key: voice,
                onChange: (info) => {
                    if (info.file.status !== 'uploading') {
                        console.log(info.file, info.fileList);
                    }
                    if (info.file.status === 'done') {
                        message.success(`${info.file.name} 上传成功`);
                        this.props.voice[voice] = info.file.response.id;
                    } else if (info.file.status === 'error') {
                        message.error(`${info.file.name} 上传失败`);
                    }
                }
            }, uplaodDefaultProps);;
            return (
                <FormItem
                    {...formItemLayout}
                    label={`句子${index+1}`}
                    required={false}
                    key={k} >
                    {getFieldDecorator(`sentence-${k}`, {
                        validateTrigger: ['onChange', 'onBlur'],
                        rules: [{
                            required: true,
                            whitespace: true,
                            message: "请输入句子内容",
                        }],
                    })(
                        <Input type='textarea' placeholder="句子" style={{ width: '60%', marginRight: 8 }} />
                    )}
                    <Icon
                        className="dynamic-delete-button"
                        type="minus-circle-o"
                        disabled={keys.length === 1}
                        onClick={() => this.remove(k)}
                    />
                    <br></br>
                    <Upload {...uplaodProps}>
                        <Button>
                          <Icon type="upload" /> 语音上传
                        </Button>
                    </Upload>
                </FormItem>
            );
        });

        return (
            <Form onSubmit={this.handleSubmit}>
                <FormItem
                    {...formItemLayout}
                    label="文章"
                    hasFeedback >
                    {getFieldDecorator('name', {
                        rules: [{
                            pattern: /\S+/,
                            message: '请填写文章名称'
                        }, {
                            required: true,
                            message: '请填写文章名称',
                        }]
                    })(
                        <Input />
                    )}
                </FormItem>
                {formItems}
                <FormItem {...formItemLayoutWithOutLabel}>
                    <Button type="dashed" onClick={this.add} style={{ width: '60%' }}>
                        <Icon type="plus" /> 添加句子
                    </Button>
                </FormItem>
                <FormItem {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit" size="large">添加</Button>
                </FormItem>
            </Form>
        );
    }
}

export default Form.create()(AddArticleForm);
