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
