// import {push} from 'react-router-redux';
import React, { Component, PropTypes } from 'react';
import {Link, browserHistory} from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Table, Icon } from 'antd';
import SortableComponent from './sortable';
import { updateCourseSet } from 'redux/reducers/course-set';

import style from 'styles/modules/home/home.scss';

@connect(
    state => ({
        cs: state.getIn(['cs', 'current_cs'])
    }),
    dispatch => bindActionCreators({updateCourseSet}, dispatch)
)
export default class CsDetail extends Component {
    static propTypes = {
        updateCourseSet: PropTypes.func,
        cs: PropTypes.object
    };
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    componentDidMount() {
    }
    onSortEnd = (items) => {
        console.log('onSortEnd', items);
        let courses = [];
        items.map(i => {
            courses.push(i._id);
        })
        console.log('before request', courses, this.props.cs.get('_id'));
        this.props.updateCourseSet({
            csid: this.props.cs.get('_id'),
            courses
        });
    };
    _renderCourseList = () => {
        const columns = [
            {
                title: '名称',
                dataIndex: 'name',
                key: 'name',
                render: (text, i) => <span>{text}</span>
            }
        ];
        let dataList = [];
        if (this.props.cs) {
            let cs = this.props.cs.toJS();
            let csList = cs.courses;
            csList.map((t, i) => {
                let tmp = {
                    key: t['_id'],
                    _id: t['_id'],
                    name: t['name']
                };
                dataList.push(tmp);
            });
        }
        return (
            <SortableComponent onSortEnd={this.onSortEnd} dataList={dataList} />
        );
    }
    render() {
        return (
            <div id={style.home}>
                <div>
                    <h1>{this.props.cs.get('name')}</h1>
                </div>
                { this._renderCourseList() }
            </div>
        );
    }
}