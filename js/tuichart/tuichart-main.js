
var getBarTuiChart=function(element){
 var topData =  _.chain(element.Data)
 .sortBy(function(item) {var ele = _.find(item.categoryData, (e) => { return e.categoryType === "Articles"?e.count:0; });  return parseInt(ele.count) * -1; })
 .first(10)
 .value();

 var data = {
   // categories: _.pluck(topData,'category'),
   categories: ['category'],
    series: _.map(topData, function(e){ var ele = _.find(e.categoryData, (e) => { return e.categoryType === "Articles"?e.count:0; }); return {name:e.category, data:parseInt(ele.count)};})
};
var options = {
    chart: {
        // width: 600,
        // height: 250,
         title: 'Technology wise statistics',
        format: '1,000'
    },
    yAxis: {
        title: 'category'
    },
    xAxis: {
        title: 'Count',
        min: 0,
        //max: 9000,
       // suffix: '$'
    }
};
var theme = {
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

    tui.chart.barChart(document.getElementById(element.Id), data, options);
    

};