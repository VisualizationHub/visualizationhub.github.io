// common initial function to bind and pass data into chart
var initCharts = function(data) {
    //tuichart.js
    getBarTuiChart({
        Id: "tui-bar-container",
        Data: data,
        chartsFor: "Articles"
    });

    getBarTuiChart({
        Id: "tui-bar-blogs-container",
        Data: data,
        chartsFor: "Blogs"
    });
    getBarTuiChart({
        Id: "tui-bar-videos-container",
        Data: data,
        chartsFor: "Videos"
    });
    getFullWidthColumnTuiChart({
        Id: "tui-bar-full-container",
        Data: data,
        chartsFor: "All Category"
    });
    getPieTuiChart({
        Id: "tui-pie-dotnet-container",
        Data: data,
        chartsFor: "ASP.NET" // Write name same as available keys in charts data 
    });
    getPieTuiChart({
        Id: "tui-pie-sharepoint-container",
        Data: data,
        chartsFor: "SharePoint" // Write name same as available keys in charts data 
    });
    getPieTuiChart({
        Id: "tui-pie-csharp-container",
        Data: data,
        chartsFor: "C#" // Write name same as available keys in charts data 
    });
};

function zoomInCharts(options) {
    console.log("zoomInCharts called ...");
}

$(function() {
    console.log("DOM is ready");
    prepareDataPassedIntoCharts();
});





var prepareDataPassedIntoCharts = function() {
    var promise = $.getJSON('data/csharpcorner.json');

    promise.done(function(data) {
        console.log(data);
        initCharts(data);

        $("#dashboard-summary").html(prepareSummary(data));
    });

    promise.fail(function() {
        initCharts(sampledata);
    });
};

var prepareSummary = function(data) {
    var seriesData = {};
 //   var htmlContent = "";
    var totalContribution = 0;
    _.each(data, function(category) {

        _.each(category.categoryData, function(subCategory) {
            // Check category type exist or not is not exist then add key and assign empty array to it
            if (!_.has(seriesData, subCategory.categoryType)) {
                // To generate dynamic key for empty object ""+ Must required
                seriesData["" + subCategory.categoryType] = [];
            }
            // Push Category wise count bsed on categorytype e.g.  News Article for each technology category
            seriesData[subCategory.categoryType].push(parseFloat(subCategory.count));
        });

    });


    for (var key in seriesData) {
        var totalCount = _.sum(seriesData[key]);
        totalContribution += totalCount;
   //     htmlContent += "<li> Total " + key + " Count : <b>" + totalCount + " </b></li>";
        $("." + key).html(totalCount);
    }
    $(".Technology").html(data.length);
    $(".Contribution").html(totalContribution);
   // return "<li> Total Technology Categories :  <b>" + data.length + " </b></li>" + "<li> Total Contribution Count :  <b>" + totalContribution + " </b></li>" + htmlContent;

};
// sampledata if getJsonData is not failed.
var sampledata = [{
        "category": "Algorithms in C#",
        "url": "https://www.c-sharpcorner.com/technologies/algorithms-in-csharp",
        "categoryData": [{
                "categoryType": "Articles",
                "count": "73"
            },
            {
                "categoryType": "Blogs",
                "count": "23"
            },
            {
                "categoryType": "Links",
                "count": "3"
            },
            {
                "categoryType": "Videos",
                "count": "0"
            },
            {
                "categoryType": "News",
                "count": "1"
            }
        ]
    },
    {
        "category": "Aurelia",
        "url": "https://www.c-sharpcorner.com/technologies/aurelia",
        "categoryData": [{
                "categoryType": "Articles",
                "count": "1"
            },
            {
                "categoryType": "Blogs",
                "count": "1"
            },
            {
                "categoryType": "Links",
                "count": "0"
            },
            {
                "categoryType": "Videos",
                "count": "0"
            },
            {
                "categoryType": "News",
                "count": "0"
            }
        ]
    }
];