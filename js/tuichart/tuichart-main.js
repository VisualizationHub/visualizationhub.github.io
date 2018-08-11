var getBarTuiChart = function(element) {
    //console.log(element.Data);
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
    var topData = _.chain(element.Data).sortBy(function(item) {
        return -1 * parseFloat(item.categoryData[categoryData.indexOf(element.chartsFor)].count);
    }).take(10).value();
    //  console.log(topData);
    // Generate series data based on technology
    var data = {
        // categories: _.pluck(topData,'category'),
        categories: [element.chartsFor],
        series: _.map(topData, function(e) {
            var ele = _.find(e.categoryData, (e) => {
                return e.categoryType === element.chartsFor ? e.count : 0;
            });
            return {
                name: e.category,
                data: parseInt(ele.count)
            };
        })
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
    var chartOptions = {
        "chartTitle": "Technology wise contributed " + element.chartsFor + " counts",
        "xAxisTitle": element.chartsFor + " count",
        "yAxisTitle": "Technologies",
        "width": 550,
        "height": 400
    };
    var chartData = {
        selector: element.Id,
        options: chartOptions,
        data: data
    };
    tuiUtils.drawBarChart(chartData);
};

var getFullWidthColumnTuiChart = function(element) {
    //console.log(element.Data);
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
    var topData = _.chain(element.Data).sortBy(function(item) {
        // For All Category 
        return -1 * parseFloat(item.categoryData[categoryData.indexOf("Articles")].count);
    }).take(10).value();
    //  console.log(topData);
    // Generate series data based on technology
    // var data = {
    //     // categories: _.pluck(topData,'category'),
    //     categories: [element.chartsFor],
    //     series: _.map(topData, function(e) {
    //         var ele = _.find(e.categoryData, (e) => {
    //             return e.categoryType === element.chartsFor ? e.count : 0;
    //         });
    //         return {
    //             name: e.category,
    //             data: parseInt(ele.count)
    //         };
    //     })
    // };

    // Generete series data for contribution based on specific technology e.g. Asp.net 
    // Here if we have DTO or AutoMap type mechanism then this code will be a lot much easier
    var seriesData = {};
    // Here map can be replaced with _.each

    var chartSeriesData = _.map(topData, function(item) {
        var newItem = {
            categories: [],
            series: []
        };
        newItem.categories.push(item.category);
        // Creted new propperty for pluck or map all categories in single array
        newItem.categoryName = item.category;
        newItem.series = _.map(item.categoryData, (function(item) {
            return {
                name: item.categoryType,
                data: item.count
            };
        }));

        _.map(item.categoryData, function(subCategory) {
            // _.map(category, function(subCategory) {
            // Check category type exist or not is not exist then add key and assign empty array to it
            if (!_.has(seriesData, subCategory.categoryType)) {
                seriesData["" + subCategory.categoryType] = [];
            }
            // Push Category wise count bsed on categorytype e.g.  News Article for each technology category
            seriesData[subCategory.categoryType].push(subCategory.count);
            //});
        });
        return newItem;


    });
    console.log(seriesData);
    // Generate key value pair of each technology contribution
    // _.map(seriesData, function(value, key) {
    //     return {
    //         name: key,
    //         data: value
    //     };
    // });


    //Combined Category and series data
    var mixedSeriesData = {
        categories: _.map(topData, "category"),
        series: _.map(seriesData, function(value, key) {
            return {
                name: key,
                data: value
            };
        })
    };
    // console.log(mixedSeriesData);
    // Generete multi series data for contribution based on Article, blogs, news etc technology wise
    // Here if we have DTO or AutoMap type mechanism then this code will be a lot much easier


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
    var chartOptions = {
        "chartTitle": "Technology wise contributed " + element.chartsFor + " counts",
        "xAxisTitle": element.chartsFor + " count",
        "yAxisTitle": "Technologies",
        "width": 1500,
        "height": 500

    };
    var chartData = {
        selector: element.Id,
        options: chartOptions,
        data: mixedSeriesData
    };
    tuiUtils.drawColumnChart(chartData);
};


var getPieTuiChart = function(element) {
    //console.log(element.Data);
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

    // No need to sort data by highest article count
    // var topData = _.chain(element.Data).sortBy(function(item) {
    //     return -1 * parseFloat(item.categoryData[categoryData.indexOf("Articles")].count);
    // }).take(10).value();

    var filterCategoryData = _.find(element.Data, {
        category: element.chartsFor
    });
    //  console.log(topData);
    // Generate series data based on technology
    var data = {
        // categories: _.pluck(topData,'category'),
        categories: [element.chartsFor],
        series: _.map(filterCategoryData.categoryData, function(e) {
            return {
                name: e.categoryType,
                data: parseInt(e.count)
            };
        })
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
    var chartOptions = {
        "chartTitle": 'Contibution of ' + element.chartsFor + " Articles",
        "xAxisTitle": element.chartsFor + " count",
        "yAxisTitle": "Technologies",
        "width": 300,
        "height": 300
    };
    var chartData = {
        selector: element.Id,
        options: chartOptions,
        data: data
    };
    tuiUtils.drawpieChart(chartData);
};