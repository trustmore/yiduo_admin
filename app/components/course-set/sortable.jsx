import React, { Component, PropTypes } from 'react';
import {render} from 'react-dom';
import { Icon } from 'antd';
import {SortableContainer, SortableElement, arrayMove} from 'react-sortable-hoc';

//貌似不能传递 index 参数
const SortableItem = SortableElement(({value}) => {
    return (
        <tr className="ant-table-row  ant-table-row-level-0">
            <td className="">{value.name}</td>
            <td className="">{value.abbr}</td>
            <td className="">{value.index + 1}</td>
            <td className=""><Icon type="bars" /></td>
        </tr>
    );
});

const SortableList = SortableContainer(({items}) => {
    return (
        <div className="ant-table-wrapper">
            <div className="ant-spin-nested-loading">
                <div className="ant-spin-container">
                    <div className="ant-table ant-table-large ant-table-scroll-position-left">
                        <div className="ant-table-content">
                            <div className="ant-table-body">
                                <table className="">
                                    <colgroup>
                                        <col />
                                        <col />
                                        <col />
                                    </colgroup>
                                    <thead className="ant-table-thead">
                                        <tr>
                                            <th className=""><span>课程名称</span></th>
                                            <th className=""><span>简称</span></th>
                                            <th className=""><span>次序</span></th>
                                            <th className=""><span>排序</span></th>
                                        </tr>
                                    </thead>
                                    <tbody className="ant-table-tbody">
                                        {items.map((value, index) => (
                                            <SortableItem key={`item-${index}`} index={index} value={value} />
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
});

export default class SortableComponent extends Component {
    static propTypes = {
        dataList: PropTypes.array,
        onSortEnd: PropTypes.func
    };
    constructor(props) {
        super(props);
        props.dataList.map((i, index) => {
            i.index = index;
        });
        this.state = {
            items: props.dataList
        };
    }
    onSortEnd = ({oldIndex, newIndex}) => {
        console.log('onSortEnd', arrayMove(this.state.items, oldIndex, newIndex))
        let endItems = arrayMove(this.state.items, oldIndex, newIndex);
        endItems.map((i, index) => {
            i.index = index;
        });
        this.setState({
            items: endItems
        });
        this.props.onSortEnd(endItems);
    };
    render() {
        return <SortableList items={this.state.items} onSortEnd={this.onSortEnd} />;
    }
}
