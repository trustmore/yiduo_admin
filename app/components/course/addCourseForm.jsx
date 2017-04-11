import React, { Component, PropTypes } from 'react';
import { Form, Input, Button, Radio, Select, Icon, Upload, message } from 'antd';
import { getToken } from '../../utils/request';
import { formItemLayout, tailFormItemLayout } from '../../utils/component-config';

const FormItem = Form.Item;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const Option = Select.Option;
let uuid = 0;

class AddCourseForm extends Component {
    static propTypes = {
        onSubmit: PropTypes.func,
        course: PropTypes.object
    };
    constructor(props) {
        super(props);
        this.state = {
            type: "recite",
            score: "5",
            scoreList: [0, 1, 2, 3, 4, 5]
        };
    }
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
    onSenRemove = (k) => {
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
    onSenAdd = () => {
        uuid++;
        const { form } = this.props;
        const keys = form.getFieldValue('keys');
        const nextKeys = keys.concat(uuid);
        console.log('add==>', keys, nextKeys);
        form.setFieldsValue({
            keys: nextKeys,
        });
    }
    onTypeChange = (e) => {
        this.setState({
            type: e.target.value
        });
    }
    onScoreChange = (value) => {
        console.log(value);
        let scoreList = parseInt(value) === 5 ? [0, 1, 2, 3, 4, 5] : [0, 1, 2, 3, 4, 5, 6];
        this.setState({
            score: value,
            scoreList
        });
    }
    _renderName = () => {
        const { getFieldDecorator } = this.props.form;
        return (
            <FormItem
                {...formItemLayout}
                label="课程名称"
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
        );
    }
    _renderScore = () => {
        const { getFieldDecorator } = this.props.form;
        return (
            <FormItem
                {...formItemLayout}
                label="总分" >
                {getFieldDecorator('score', {
                    initialValue: this.state.score,
                    onChange: this.onScoreChange,
                    rules: [{
                        pattern: /^[5-6]$/,
                        message: '请填写总分值 5 或 6'
                    }, {
                        required: true,
                        message: '请填写分值',
                    }]
                })(
                    <Select style={{width: '25%'}}>
                        <Option value="5">5</Option>
                        <Option value="6">6</Option>
                    </Select>
                )}
            </FormItem>
        );
    }
    _renderType = () => {
        const { getFieldDecorator } = this.props.form;
        return (
            <FormItem
              {...formItemLayout}
              label="课程类型" >
              {getFieldDecorator('type', {
                  initialValue: this.state.type,
                  rules: [{
                      required: true,
                      message: '请选择课程类型',
                  }],
                  onChange: this.onTypeChange
              })(
                  <RadioGroup>
                      <Radio value="performance">课堂表现</Radio>
                      <Radio value="dictation">听写</Radio>
                      <Radio value="recite">背诵</Radio>
                      <Radio value="preview">预习</Radio>
                  </RadioGroup>
              )}
            </FormItem>
        );
    }
    _renderArticle = () => {
        const { getFieldDecorator } = this.props.form;
        if (this.state.type !== 'dictation' && this.state.type !== 'recite') {
            return null;
        }
        return (
            <FormItem
                {...formItemLayout}
                label="相关文章"
                hasFeedback >
                {getFieldDecorator('article')(
                    <Input type='textarea' placeholder="相关文章" style={{}} />
                )}
            </FormItem>
        );
    }
    _renderScoreNote = () => {
        const { getFieldDecorator, getFieldValue } = this.props.form;
        return this.state.scoreList.map((k) => {
            let skey = `score-${k}`;
            let label = k === 0 ? "分值提醒" : "  ";
            return (
                <FormItem
                    {...formItemLayout}
                    label={label}
                    key={skey} >
                    {getFieldDecorator(`sn-${k}`, {
                        validateTrigger: ['onChange', 'onBlur'],
                        rules: [{
                            required: true,
                            whitespace: true,
                            message: "请输入提醒内容",
                        }],
                    })(
                        <Input addonBefore={`${k} 分`} />
                    )}
                </FormItem>
            );
        });
    }
    _renderAddBtn = () => {
        if (this.state.type === 'preview') {
            const formItemLayoutWithOutLabel = {
                wrapperCol: {
                    xs: { span: 24, offset: 0 },
                    sm: { span: 20, offset: 6 },
                },
            };
            return (
                <FormItem {...formItemLayoutWithOutLabel}>
                    <Button type="dashed" onClick={this.onSenAdd} style={{ width: '60%' }}>
                        <Icon type="plus" /> 添加句子
                    </Button>
                </FormItem>
            );
        }
    }
    _renderSentences = () => {
        const { getFieldDecorator, getFieldValue } = this.props.form;
        if (this.state.type !== 'preview') {
            return null;
        }
        getFieldDecorator('keys', { initialValue: [] });
        const keys = getFieldValue('keys');
        const uplaodDefaultProps = {
            name: 'file',
            action: '/api/upload/voice',
            headers: {
                authorization: getToken(),
            },
            defaultFileList: []
        };
        return keys.map((k, index) => {
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
            }, uplaodDefaultProps);
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
                        onClick={() => this.onSenRemove(k)}
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
    }
    render() {
        return (
            <Form onSubmit={this.handleSubmit}>
                {this._renderName()}
                {this._renderType()}
                {this._renderScore()}
                {this._renderScoreNote()}
                {this._renderArticle()}
                {this._renderSentences()}
                {this._renderAddBtn()}
                <FormItem {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit" size="large">添加</Button>
                </FormItem>
            </Form>
        );
    }
}

export default Form.create()(AddCourseForm);
