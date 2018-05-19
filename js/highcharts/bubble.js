var getBubbleHighchart = function (element) {
    Highcharts.chart(element.Id, {
        chart: {
            type: 'bubble',
            plotBorderWidth: 1,
            zoomType: 'xy'
        },

        legend: {
            enabled: false
        },

        title: {
            text: 'Correlation between Life Expectancy, Fertility Rate and Population of some world countries (2017)'
        },

        subtitle: {
            text: 'Source: Wikipedia and www.cia.gov'
        },

        xAxis: {
            startOnTick: true,
            endOnTick: true,
            gridLineWidth: 1,
            title: {
                text: 'Life Expectancy (Year)'
            },
            labels: {
                format: '{value}'
            },
            tickInterval: 1/*,
            maxPadding:0.2
            /*,
            plotLines: [{
                color: 'black',
                dashStyle: 'dot',
                width: 2,
                value: 65,
                label: {
                    rotation: 0,
                    y: 15,
                    style: {
                        fontStyle: 'italic'
                    },
                    text: 'Safe fat intake 65g/day'
                },
                zIndex: 3
            }]*/
        },

        yAxis: {
            startOnTick: true,
            endOnTick: true,
            tickInterval: .5,
            title: {
                text: 'Fertility Rate (Children Born/Woman)'
            },
            labels: {
                format: '{value}'
            },
            maxPadding: 0.1/*,
            plotLines: [{
                color: 'black',
                dashStyle: 'dot',
                width: 2,
                value: 50,
                label: {
                    align: 'right',
                    style: {
                        fontStyle: 'italic'
                    },
                    text: 'Safe sugar intake 50g/day',
                    x: -10
                },
                zIndex: 3
            }]*/
        },

        tooltip: {
            useHTML: true,
            headerFormat: '<table>',
            pointFormat: '<tr><th colspan="2"><h4>{point.country}</h4></th></tr>' +
                '<tr><th>Life Expectancy:</th><td>{point.x} </td></tr>' +
                '<tr><th>Fertility Rate:</th><td>{point.y} </td></tr>' +
                '<tr><th>Population :</th><td>{point.z} </td></tr>',
            footerFormat: '</table>',
            followPointer: true
        },

        plotOptions: {
            series: {
                dataLabels: {
                    enabled: true,
                    format: '{point.name}'
                }
            }
        },

        series: [{
            data: [
                { x: 76.5, y: 1.6, z: 1409517397, name: 'CN', country: 'China' },
                { x: 68.3, y: 2.43, z: 1339180127, name: 'IN', country: 'India' },
                { x: 79.3, y: 1.87, z: 322179605, name: 'US', country: 'United States' },
                { x: 81.2, y: 1.88, z: 66181585, name: 'GB', country: 'United Kingdom' },
                { x: 82.4, y: 2.07, z: 64979548, name: 'FR', country: 'France' },
                { x: 82.7, y: 1.44, z: 59359900, name: 'IT', country: 'Italy' },
                { x: 62.9, y: 2.29, z: 56717156, name: 'ZA', country: 'South Africa' },
                { x: 82.2, y: 1.6, z: 36624199, name: 'CA', country: 'Canada' },
                { x: 74.5, y: 2.09, z: 32938213, name: 'SA', country: 'Saudi Arabia' },
                { x: 82.8, y: 1.77, z: 24450561, name: 'AU', country: 'Australia' },
                { x: 81.9, y: 1.78, z: 17035938, name: 'NL', country: 'Netherlands' },
                { x: 77.1, y: 2.32, z: 9400145, name: 'AE', country: 'United Arab Emirates' },
                { x: 80.6, y: 1.73, z: 5733551, name: 'DK', country: 'Denmark' },
                { x: 81.6, y: 2.02, z: 4705818, name: 'NZ', country: 'New Zealand' },
                { x: 74.7, y: 2.4, z: 4136528, name: 'KW', country: 'Kuwait' },
                { x: 76.2, y: 1.96, z: 2890299, name: 'JM', country: 'Jamaica' },
                { x: 69.9, y: 2.41, z: 905502, name: 'FJ', country: 'Fiji' },
                { x: 69.8, y: 1.9, z: 807610, name: 'BT', country: 'Bhutan' },
                { x: 70.9, y: 3.47, z: 97553151, name: 'EG', country: 'Egypt' }
            ]
        }]

    });
};