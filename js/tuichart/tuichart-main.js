var getBarTuiChart = function(element) {
    //console.log(element.Data);
    var categoryData = ["Articles", "Blogs", "Links", "Videos", "News"];
    var topData = _.chain(element.Data).sortBy(function(item) {
        return -1 * parseFloat(item.categoryData[categoryData.indexOf(element.chartsFor)].count);
    }).take(10).value();

    // Generate series data based on technology
    var data = {
        // categories: _.pluck(topData,'category'),
        categories: [element.chartsFor],
        series: _.map(topData, function(e) {
            var ele = _.find(e.categoryData, function(e) {
                return e.categoryType === element.chartsFor ? e.count : 0;
            });
            return {
                name: e.category,
                data: parseInt(ele.count)
            };
        })
    };

    var chartOptions = {
        "chartTitle": "Technology wise contributed " + element.chartsFor + " counts",
        "xAxisTitle": element.chartsFor + " count",
        "yAxisTitle": "Technologies",
        "width": element.Id === "zoombody" ? 700 : 470,
        "height": element.Id === "zoombody" ? 470 : 470
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
    var topData = _.chain(element.Data).sortBy(function(item) {
        // For All Category 
        return -1 * parseFloat(item.categoryData[categoryData.indexOf("Articles")].count);
    }).take(10).value();

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
        // OLD Code for transform array of one object to another object
        // newItem.series = _.map(item.categoryData, (function(item) {
        //     return {
        //         name: item.categoryType,
        //         data: item.count
        //     };
        // }));

        // Transform array of one object to another object
        newItem.series = DTO.mapTo(item.categoryData, { "categoryType": "name", "count": "data" });

        _.map(item.categoryData, function(subCategory) {
            // _.map(category, function(subCategory) {
            // Check category type exist or not if not exist then add key and assign empty array to it
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
    // Filter or grab data based on provided category e.g. "ASP.NET"
    var filterCategoryData = _.find(element.Data, {
        category: element.chartsFor
    });

    // OLD CODE to Generate series data based by static way to renaming key in json data
    // // Generate series data based on technology
    // var data = {
    //     // categories: _.pluck(topData,'category'),
    //     categories: [element.chartsFor],
    //     series: _.map(filterCategoryData.categoryData, function(e) {
    //         return {
    //             name: e.categoryType,
    //             data: parseInt(e.count)
    //         };
    //     })
    // };

    //Generate series data by renaming key in json data dynamic way.
    var data = {
        // categories: _.pluck(topData,'category'),
        categories: [element.chartsFor],
        series: DTO.mapTo(filterCategoryData.categoryData, { "categoryType": "name", "count": "data" })
    };

    var chartOptions = {
        "chartTitle": 'Contibution of ' + element.chartsFor + " Articles",
        "xAxisTitle": element.chartsFor + " count",
        "yAxisTitle": "Technologies",
        "width": element.Id === "zoombody" ? 600 : 470,
        "height": element.Id === "zoombody" ? 450 : 300
    };
    var chartData = {
        selector: element.Id,
        options: chartOptions,
        data: data
    };
    tuiUtils.drawpieChart(chartData);
};