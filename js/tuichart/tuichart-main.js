var getBarTuiChart = function(element) {
    console.log(element.Data);
    var categoryData = ["Articles", "Blogs", "Links", "Videos", "News"];
    // Old Code which filter using underscore js
    // var topData = _.chain(element.Data)
    //     .sortBy(function(item) { var ele = _.find(item.categoryData, (e) => { return e.categoryType === "Articles" ? e.count : 0; }); return parseInt(ele.count) * -1; })
    //     .first(10)
    //     .value();

    //// New code which filter using lodash js
    // First custom sort by integer count by converting it to float then reverse result
    //    var topData = _.chain(element.Data).sortBy(function(item) { return parseFloat(item.categoryData[0].count); }).reverse().take(10).value();
    // Much better optimized result for descending order by multiply by -1  
    //var topData = _.chain(element.Data).sortBy(function(item) { return -1 * parseFloat(item.categoryData[0].count); }).take(10).value();
    var topData = _.chain(element.Data).sortBy(function(item) { return -1 * parseFloat(item.categoryData[categoryData.indexOf("Articles")].count); }).take(10).value();


    var data = {
        // categories: _.pluck(topData,'category'),
        categories: ['Articles'],
        series: _.map(topData, function(e) { var ele = _.find(e.categoryData, (e) => { return e.categoryType === "Articles" ? e.count : 0; }); return { name: e.category, data: parseInt(ele.count) }; })
    };
    /**Commented below old code for generate tui bar charts, it looks very redudant */
    /*
    // var options = {
        
    //     chart: {
    //         // width: 600,
    //         // height: 250,
    //         title: 'Technology wise contributed Article counts',
    //         format: '1,000'
    //     },
    //     yAxis: {
    //         title: 'Articles'
    //     },
    //     xAxis: {
    //         title: 'Count',
    //         min: 0,
    //         //max: 9000,
    //         // suffix: '$'
    //     },
    //     series: { showLabel: true }
    // };
    // var theme = {
    //     series: {
    //         colors: [
    //             '#83b14e', '#458a3f', '#295ba0', '#2a4175', '#289399',
    //             '#289399', '#617178', '#8a9a9a', '#516f7d', '#dddddd'
    //         ]
    //     }
    // };

    // For apply theme

    // tui.chart.registerTheme('myTheme', theme);
    // options.theme = 'myTheme';

    //tui.chart.barChart(document.getElementById(element.Id), data, options);
*/
    var chartOptions = { "chartTitle": "Technology wise contributed Article counts", "xAxisTitle": "Article count", "yAxisTitle": "Technologies" };
    var chartData = { selector: element.Id, options: chartOptions, data: data };
    tuiUtils.drawBarChart(chartData);
};