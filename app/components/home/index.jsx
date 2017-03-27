// import {push} from 'react-router-redux';
import React, { PropTypes, Component } from 'react';
import ReactDOM from 'react-dom';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import moment from 'moment';
import Highcharts from 'highcharts';
import HighchartsMore from 'highcharts-more';
// import HighchartsData from 'highcharts-data';
import HighchartsMap from 'highcharts/modules/map';
HighchartsMap(Highcharts);
// HighchartsData(Highcharts);
HighchartsMore(Highcharts);
import { raptileConfig, drewRaptileBackground, drewRaptileText, mapConfig } from '../charts/chart-config';
import { numberWithCommas } from 'utils/api';
import mapData from '../charts/map-paths';

import style from 'styles/modules/home/home.scss';

@connect(
    state => ({
        user: state.getIn(['user', 'user'])
    }),
    dispatch => bindActionCreators({}, dispatch)
)
export default class Home extends Component {
    static propTypes = {
        user: PropTypes.object
    };
    componentDidMount() {
        this._buildRaptileChart();
        this._buildMapChart();
    }
    _buildRaptileChart() {
        let raptileDom = ReactDOM.findDOMNode(this.refs.chart);
        let chartConfig = raptileConfig(raptileDom);
        new Highcharts.Chart(chartConfig, chart => {
            drewRaptileText(chart);
            drewRaptileBackground(chart);
        });
    }
    _buildMapChart() {
        Highcharts.maps["custom/world"] = mapData;
        let dom = ReactDOM.findDOMNode(this.refs.mapchart);
        console.log('===dom===', mapData);
        let chartConfig = mapConfig(dom);
        new Highcharts.mapChart(chartConfig, chart => {});
    }
    _renderOptions() {
        let options = ['近1周', '近3天', '近1天', '近3小时', '实时'].map((option, index) => {
            return (
                <div className={style.option} key={`option-${index}`}>{option}</div>
            );
        });
        return options;
    }
    _renderOverviews() {
        let overviewsData = [
            {title: '访问总次数', count: 12823},
            {title: '爬虫访问次数', count: 8888},
            {title: '阻断爬虫次数', count: 12823},
            {title: '阻断爬虫个数', count: 666}
        ];
        let overviews = overviewsData.map((overview, index) => {
            let className = style.overview;
            if (index === 3){
                className = `${style.overview} ${style['overview-last']}`;
            }
            console.log('className', className);
            return (
                <div key={`overview-${index}`} className={className}>
                    <div className={style['ov-title']}>{overview.title}</div>
                    <div className={style['ov-count']}>{numberWithCommas(overview.count)}</div>
                </div>
            );
        });
        return overviews;
    }

    render() {
        console.log('today===>', this.props.user.get('name'));
        return (
            <div id={style.home}>
                <h1>态势分析<span>已保护您的数据资产：<b>154</b> 天</span></h1>
                <div className={style['dash-box']}>
                    <div className={`${style['chart-box']} module-bg`}>
                        <div style={{width: '300px', height: '300px'}} ref="chart" />
                    </div>
                    <div className={`${style['overview-box']} module-bg`}>
                        <h2>{moment().format('YYYY 年 MM 月 DD 日')}</h2>
                        <div className={`${style.options}`}>
                            {this._renderOptions()}
                        </div>
                        <div className={`${style['overview-items']}`}>
                            {this._renderOverviews()}
                        </div>
                    </div>
                </div>
                <h1 style={{marginTop: '20px'}}>访问浏览</h1>
                <div className={`${style['visitor-box']} module-bg`}>
                    <div className="overview">
                        <h2>此刻网站上有</h2>
                        <h3>8760</h3>
                        <h4>实时访客</h4>
                        <div className="label">
                            <div className="raptile">
                                <span></span>爬虫
                            </div>
                            <div className="nomal">
                                <span></span>正常用户
                            </div>
                        </div>
                    </div>
                    <div className="overview"></div>
                    <div style={{width: '600px', height: '400px'}} ref="mapchart" />
                </div>
            </div>
        );
    }
}
