export const raptileConfig = (dom, value = 80) => {
    let config = {
        credits: {
            enabled: false
        },
        chart: {
            type: 'gauge',
            renderTo: dom,
            plotBackgroundColor: null,
            plotBackgroundImage: null,
            plotBorderWidth: 0,
            plotShadow: false
        },
        title: {
            text: null
        },
        pane: {
            startAngle: -60,
            endAngle: 240,
            background: [{
                backgroundColor: '#C9E3F2',
                borderWidth: 0,
                outerRadius: '112%'
            }, {
                backgroundColor: '#FFF',
                borderWidth: 0,
                outerRadius: '108%'
            }, {
                backgroundColor: '#F7F7F7',
                borderWidth: 0,
                outerRadius: '104%'
            }]
        },
        // the value axis
        yAxis: {
            min: 0,
            max: 300,
            minorTickInterval: 'auto',
            minorTickWidth: 1,
            minorTickLength: 10,
            minorTickPosition: 'inside',
            minorTickColor: '#FFF',
            tickPixelInterval: 60,
            tickWidth: 2,
            tickPosition: 'inside',
            tickLength: 20,
            tickColor: '#FFF',
            labels: {
                step: 4,
                rotation: 'auto'
            },
            title: {
                text: null
            },
            plotBands: [{
                from: 0,
                to: 60,
                thickness: 20,
                color: '#B0D4C4'
            }, {
                from: 60,
                to: 120,
                thickness: 20,
                color: '#89CEE9'
            }, {
                from: 120,
                to: 240,
                thickness: 20,
                color: '#FEC189'
            }, {
                from: 240,
                to: 300,
                thickness: 20,
                color: '#E77A73'
            }]
        },
        series: [{
            name: 'Speed',
            color: '#B0D4C4',
            data: [value],
            tooltip: {
                valueSuffix: 'km/h'
            }
        }]
    };
    return config;
};

export const drewRaptileBackground = (chart) => {
    chart.renderer.arc(150, 150, 150, 142, -Math.PI*2/3, -Math.PI/3).attr({
        fill: '#C9E3F2',
        stroke: 'none',
        'stroke-width': 1
    }).add();
    chart.renderer.arc(150, 150, 150, 142, 0, Math.PI/3).attr({
        fill: '#C9E3F2',
        stroke: 'none',
        'stroke-width': 1
    }).add();
    chart.renderer.arc(150, 150, 150, 142, Math.PI*2/3, Math.PI).attr({
        fill: '#C9E3F2',
        stroke: 'none',
        'stroke-width': 1
    }).add();
};

export const drewRaptileText = (chart) => {
    chart.renderer.text('爬虫预警', 150, 80).css({
        color: '#4572A7',
        fontSize: '16px'
    }).add();
};

export const mapConfig = (dom) => {
    let data = [{
            code: "CN",
            country: "中国",
            color: '#FF0066',
            z: 30552
        }, {
            code: "DE",
            country: "德国",
            color: '#FF6600',
            z: 28970
        }, {
            code: "US",
            country: "美国",
            z: 39208
        }, {
            code: "GB",
            country: "英国",
            z: 10000
        }
    ];
    let config = {
        credits: {
            enabled: false
        },
        chart: {
            borderWidth: 1,
            renderTo: dom,
            map: 'custom/world'
        },
        title: {
            text: null
        },
        legend: {
            enabled: false
        },
        mapNavigation: {
            enabled: false,
            buttonOptions: {
                verticalAlign: 'bottom'
            }
        },
        series: [{
            name: 'Countries',
            color: '#E0E0E0',
            enableMouseTracking: true
        }, {
            type: 'mapbubble',
            name: '爬虫监控',
            joinBy: ['iso-a2', 'code'],
            data: data,
            minSize: 8,
            maxSize: '10%',
            tooltip: {
                pointFormat: '{point.country}: {point.z} 个'
            }
        }]
    };
    return config;
}
