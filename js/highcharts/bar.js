var getBarHighchart = function(element) {


    var commonData = [{ "name": "Year 1800", "data": [107, 31, 635, 203] }, { "name": "Year 1900", "data": [133, 156, 947, 408] }, { "name": "Year 2000", "data": [814, 841, 3714, 727] }, { "name": "Year 2016", "data": [1216, 1001, 4436, 738] }];
    Highcharts.chart(element.Id, {
        chart: {
            type: element.isRotate === undefined ? 'bar' : element.isRotate
        },
        title: {
            text: 'Historic World Population by Region'
        },
        subtitle: {
            text: ''
        },
        xAxis: {
            // categories: _.pluck(commonData, "country"),
            // OLD way commnted and make dynamic based on base data
            // ['Africa', 'America', 'Asia', 'Europe', 'Oceania'],
            title: {
                text: null
            }
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Population (millions)',
                align: 'high'
            },
            labels: {
                overflow: 'justify'
            }
        },
        tooltip: {
            valueSuffix: ' millions'
        },
        plotOptions: {
            bar: {
                dataLabels: {
                    enabled: true
                }
            }
        },
        legend: {
            // Commented below code due to Roate chart feature as this chart doesn't fit in available region
            // layout: 'vertical',
            // align: 'right',
            // verticalAlign: 'top',
            // x: -30,
            // y: 50,
            //floating: true,
            borderWidth: 1,
            backgroundColor: ((Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'),
            shadow: true
        },
        credits: {
            enabled: false
        },
        series: commonData
    });
}