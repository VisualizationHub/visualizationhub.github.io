var commonData=[{"name":"Year 1800","data":[107,31,635,203],"country":"Africa"}
,{"name":"Year 1900","data":[133,156,947,408],"country":"America"}
,{"name":"Year 2000","data":[814,841,3714,727],"country":"Asia"}
,{"name":"Year 2016","data":[1216,1001,4436,738],"country":"Europe"}];
Highcharts.chart('hc-bar-container', {
    chart: {
        type: 'column'
    },
    title: {
        text: 'Historic World Population by Region'
    },
    subtitle: {
        text: ''
    },
    xAxis: {
        categories: _.pluck(commonData,"country") ,
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
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'top',
        x: -40,
        y: 80,
        floating: true,
        borderWidth: 1,
        backgroundColor: ((Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'),
        shadow: true
    },
    credits: {
        enabled: false
    },
    series: commonData
});