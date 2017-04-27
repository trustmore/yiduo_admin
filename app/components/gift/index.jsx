// import {push} from 'react-router-redux';
import React, { Component, PropTypes } from 'react';
import { browserHistory, Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Table, Icon, Popconfirm } from 'antd';
import { fetch, create, update, remove } from 'redux/reducers/gift';
import AddModal from './addModal';

import style from 'styles/modules/home/home.scss';

@connect(
    state => ({
        giftList: state.getIn(['gift', 'list'])
    }),
    dispatch => bindActionCreators({fetch, create, update, remove}, dispatch)
)
export default class Gift extends Component {
    static propTypes = {
        giftList: PropTypes.object,
        fetch: PropTypes.func,
        create: PropTypes.func,
        update: PropTypes.func,
        remove: PropTypes.func
    };
    constructor(props) {
        super(props);
        this.state = {
            edit: false,
            visible: false
        };
    }
    componentDidMount() {
        this.props.fetch();
    }
    onClickAddBtn = e => {
        e.preventDefault();
        this.setState({
            edit: false,
            visible: true
        });
    }
    handleSubmit = (values) => {
        if (this.state.edit) {
            values._id = this.state.currentGift._id;
            this.props.update(values).then(ret => {
                this.setState({
                    visible: false
                });
            });
        } else {
            this.props.create(values).then(ret => {
                this.setState({
                    visible: false
                });
            });
        }
    }
    handleCancel = () => {
        this.setState({
            visible: false
        });
    }
    onOpenEdit = (e, gid) => {
        e.preventDefault();
        let currentGift = this.props.giftList.find((t) => {
            return t.get('_id') === gid;
        }).toJS();
        console.log('onOpenEdit===>', gid, currentGift);
        this.setState({
            visible: true,
            edit: true,
            currentGift
        });
    }
    onRemove = (id) => {
        this.props.remove(id);
    }
    _renderLoading() {
        if (this.props.isFetching) {
            return (
                <p>fetching...</p>
            );
        }
    }
    _renderGiftList() {
        const columns = [
            {
                title: '名称',
                dataIndex: 'name',
                key: 'name',
                render: (text, i) => <Link to={`/gift/${i._id}`}>{text}</Link>
            },
            {
                title: '库存',
                dataIndex: 'stock',
                key: 'stock',
                render: (text, i) => <span>{text}</span>
            },
            {
                title: '状态',
                dataIndex: 'status',
                key: 'status',
                render: (text, i) => <span>{text}</span>
            },
            {
                title: '兑换积分',
                dataIndex: 'points',
                key: 'points',
                render: (text, i) => <span>{text}</span>
            },
            {
                title: '操作',
                key: 'action',
                render: (text, i) => (
                    <span>
                        <a href='#' onClick={(e) => this.onOpenEdit(e, i._id)}>编辑</a>
                        <span className="ant-divider" />
                        <Popconfirm title="确认删除吗？" onConfirm={() => this.onRemove(i._id)} okText="确认" cancelText="取消">
                            <a href="#">删除</a>
                        </Popconfirm>
                    </span>
                )
            }
        ];
        let dataList = [];
        let giftList = this.props.giftList ? this.props.giftList.toJS() : [];
        giftList.map((t, i) => {
            let tmp = {
                _id: t._id,
                key: t._id,
                stock: t.stock,
                status: t.status == 'able' ? '可兑换' : '不可兑换',
                points: t.points,
                name: t.name
            };
            dataList.push(tmp);
        })
        return (
            <Table columns={columns} pagination={false} dataSource={dataList} />
        );
    }
    render() {
        return (
            <div id={style.home}>
                <div>
                    <h1>奖品</h1>
                    <a onClick={this.onClickAddBtn} href="#">
                        <Icon type="user-add" />
                        <span>添加奖品</span>
                    </a>
                </div>
                { this._renderLoading() }
                { this._renderGiftList() }
                <AddModal
                    visible={this.state.visible}
                    edit={this.state.edit}
                    currentGift={this.state.currentGift}
                    onOk={this.handleSubmit}
                    onCancel={this.handleCancel} />
            </div>
        );
    }
}
