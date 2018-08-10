//This pattern is well known as a Immediately Invoked Function Expression or IIFE
var tuiUtils = (function() {
    'use strict';
    var chartOptions = {
        chart: {
            // width: 600,
            // height: 250,
            title: 'Chart Title',
            format: '1,000'
        },
        yAxis: {
            title: 'Y Axis'
        },
        xAxis: {
            title: 'X Axis',
            min: 0,
            //max: 9000,
            // suffix: '$'
        },
        series: {
            showLabel: true
        }
    };
    var chartTheme = {
        series: {
            colors: [
                '#83b14e', '#458a3f', '#295ba0', '#2a4175', '#289399',
                '#289399', '#617178', '#8a9a9a', '#516f7d', '#dddddd'
            ]
        }
    };

    // For apply theme

    // tui.chart.registerTheme('myTheme', theme);
    // options.theme = 'myTheme';

    //set user provided chart settings
    var generateChartOptions = function(settings) {
        _.set(chartOptions, "chart.title", settings.chartTitle);
        _.set(chartOptions, "yAxis.title", settings.yAxisTitle);
        _.set(chartOptions, "xAxis.title", settings.chartTitle);
        return chartOptions;
    };

    var drawBarChart = function(chartData) {
        // chartData.selector -> it may be class, id or any selector but in most case it will be ID
        // chartData.data may be raw data or processed data for charts
        tui.chart.barChart(document.getElementById(chartData.selector), chartData.data, generateChartOptions(chartData.options));
    };

    return {
        drawBarChart,
        generateChartOptions
    };
})();