//说明
// sentences为句子列表，结构为：
// sentences = [{
//     _id: //编辑时的句子 ID
//     key: 10,
//     content: '句子内容',
//     voice: {
//         _id
//         path
//         filename
//     }
// }]
import React, { Component, PropTypes } from 'react';
import { Form, Input, Button, Radio, Select, Icon, Upload, message } from 'antd';
import { getToken } from '../../utils/request';
import { formItemLayout, tailFormItemLayout } from '../../utils/component-config';

const FormItem = Form.Item;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const Option = Select.Option;

class AddCourseForm extends Component {
    static propTypes = {
        onSubmit: PropTypes.func,
        course: PropTypes.object
    };
    constructor(props) {
        super(props);
        let course = props.course ? props.course.toJS() : {};
        console.log('AddCourseForm', props);
        //需要处理 sentences 的 key 和 uuid
        if (course.sentences && course.sentences.length > 0) {
            course.uuid = course.sentences.length - 1;
        }
        this.state = Object.assign({}, {
            type: "recite",
            scoreNotes: [],
            score: 5,
            uuid: 0
        }, course);
    }
    componentDidMount() {
        let course = this.props.course ? this.props.course.toJS() : {};
        console.log('componentDidMount', course);
        if (course.sentences && course.sentences.length > 0) {
            course.sentences.map((t, index) => {
                t.key = index;
            });
            this.props.form.setFieldsValue({sentences: course.sentences});
        }
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                let voiceUploaded = true;
                const sentences = this.props.form.getFieldValue('sentences');
                sentences.map(s => {
                    if (!s.voice) {
                        voiceUploaded = false;
                    }
                });
                if (!voiceUploaded) {
                    message.warn('请上传相应语音');
                    return false;
                }
                values.sentences = sentences;
                this.props.onSubmit(values);
            }
        });
    }
    onSenRemove = (key) => {
        const { form } = this.props;
        const sentences = form.getFieldValue('sentences');
        if (sentences.length === 1) {
            return;
        }
        form.setFieldsValue({
            sentences: sentences.filter(k => k.key !== key)
        });
    }
    onSenAdd = () => {
        this.state.uuid++;
        const { form } = this.props;
        const sentences = form.getFieldValue('sentences') || [];
        console.log('uuid', this.state.uuid);
        sentences.push({
            key: this.state.uuid,
            content: ''
        });
        form.setFieldsValue({
            sentences
        });
    }
    onTypeChange = (e) => {
        console.log('onTypeChange', e.target.value);
        this.setState({
            type: e.target.value
        });
    }
    onScoreChange = (value) => {
        this.setState({
            score: parseInt(value)
        });
    }
    _onUploadSuccess = (key, obj) => {
        const sentences = this.props.form.getFieldValue('sentences');
        sentences.find(s => { return s.key === key; }).voice = {
            _id: obj.response.id,
            filename: obj.name
        };
        console.log('_onUploadSuccess', key, sentences);
        this.props.form.setFieldsValue({
            sentences
        });
    }
    onSenChange = (e, key) => {
        const sentences = this.props.form.getFieldValue('sentences');
        sentences.find(s => { return s.key === key; }).content = e.target.value;
        console.log('onSenChange', e.target.value, sentences);
        this.props.form.setFieldsValue({
            sentences
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
                    initialValue: this.state.name,
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
                    initialValue: this.state.score.toString(),
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
                {getFieldDecorator('article', {
                    initialValue: this.state.article,
                })(
                    <Input type='textarea' placeholder="相关文章" style={{}} />
                )}
            </FormItem>
        );
    }
    _renderScoreNote = () => {
        const { getFieldDecorator, getFieldValue } = this.props.form;
        return [...Array(this.state.score + 1).keys()].map((k) => {
            let skey = `score-${k}`;
            let label = k === 0 ? "分值提示" : "  ";
            return (
                <FormItem
                    {...formItemLayout}
                    label={label}
                    key={skey} >
                    {getFieldDecorator(`sn-${k}`, {
                        validateTrigger: ['onChange', 'onBlur'],
                        initialValue: this.state.scoreNotes[k],
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
        getFieldDecorator('sentences', { initialValue: [] });
        const sentences = getFieldValue('sentences');
        const uplaodDefaultProps = {
            name: 'file',
            action: '/api/upload/voice',
            headers: {
                authorization: getToken(),
            },
        };
        console.log('_renderSentences', sentences);
        return sentences.map((k, index) => {
            console.log('_renderSentences key', k.key);
            let voice = `voice-${k.key}`;
            let up = {
                voice,
                key: voice,
                defaultFileList: [],
                onChange: (info) => {
                    if (info.file.status !== 'uploading') {
                        console.log(info.file, info.fileList);
                    }
                    if (info.file.status === 'done') {
                        message.success(`${info.file.name} 上传成功`);
                        this._onUploadSuccess(k.key, info.file);
                    } else if (info.file.status === 'error') {
                        message.error(`${info.file.name} 上传失败`);
                    }
                }
            };
            if (k.voice) {
                up.defaultFileList = [{
                      uid: voice,
                      name: k.voice.filename,
                      status: 'done',
                      url: '#',
                }];
            }
            let uplaodProps = Object.assign(up, uplaodDefaultProps);
            console.log('uplaodProps', uplaodProps);
            return (
                <FormItem
                    {...formItemLayout}
                    label={`句子${index+1}`}
                    required={false}
                    key={k.key} >
                    {getFieldDecorator(`sentence-${k.key}`, {
                        initialValue: k.content,
                        validateTrigger: ['onChange', 'onBlur'],
                        onChange: (e) => {
                            this.onSenChange(e, k.key);
                        },
                        rules: [{
                            required: true,
                            whitespace: true,
                            message: "请输入句子内容",
                        }]
                    })(
                        <Input type='textarea' placeholder="句子" style={{ width: '60%', marginRight: 8 }} />
                    )}
                    <Icon
                        className="dynamic-delete-button"
                        type="minus-circle-o"
                        disabled={sentences.length === 1}
                        onClick={() => this.onSenRemove(k.key)}
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
        let btnText = this.props.edit ? '修改' : '添加';
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
                    <Button type="primary" htmlType="submit" size="large">{btnText}</Button>
                </FormItem>
            </Form>
        );
    }
}

export default Form.create()(AddCourseForm);
