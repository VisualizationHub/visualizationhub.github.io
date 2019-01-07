var dashboardData = [];

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
    switch (options.title) {
        //highchartjs
        case 'tui-bar-container':
            getBarTuiChart({
                Id: options.Id,
                Data: options.data,
                chartsFor: "Articles"
            });
            break;
        case 'tui-bar-blogs-container':
            getBarTuiChart({
                Id: options.Id,
                Data: options.data,
                chartsFor: "Blogs"
            });
            break;
        case 'tui-bar-videos-container':
            getBarTuiChart({
                Id: options.Id,
                Data: options.data,
                chartsFor: "Videos"
            });
            break;
        case 'tui-bar-full-container':
            getFullWidthColumnTuiChart({
                Id: options.Id,
                Data: options.data,
                chartsFor: "All Category"
            });
            break;
        case 'tui-pie-dotnet-container':
            getPieTuiChart({
                Id: options.Id,
                Data: options.data,
                chartsFor: "ASP.NET" // Write name same as available keys in charts data 
            });
            break;
        case 'tui-pie-sharepoint-container':
            getPieTuiChart({
                Id: options.Id,
                Data: options.data,
                chartsFor: "SharePoint" // Write name same as available keys in charts data 
            });
            break;
        case 'tui-pie-csharp-container':
            getPieTuiChart({
                Id: options.Id,
                Data: options.data,
                chartsFor: "C#" // Write name same as available keys in charts data 
            });
            break;
    }
}


var togglechart = function(e) {
    console.log("togglechart BUTTON CLICKED.");

    console.log(e);
    // Temporary logic to do zoom for all charts
    var title = $(e).parent().text().trim();
    var chartTitle = $(e).attr('data-target-id');


    // Do Some calculation or some stuff for zomm in chart
    // Clear old contents from popup
    $('#zoomTitle').empty();
    $('#zoomTitle').text(title);
    $('#zoombody').empty();

    // fix height& width issue
    var element = document.getElementById('zoombody');
    element.removeAttribute("style");
    element.removeAttribute("class");
    element.style.height = "500px";

    // Update requested charts in Zoom mode
    // For Temporary purpose used setTimout function as popup opened after zoomInCharts function
    setTimeout(function() {
        zoomInCharts({
            title: chartTitle,
            Id: 'zoombody',
            data: dashboardData,
        });
    }, 0);

    //show thw popup
    $('#zoomPopup').modal('show');
};


$(function() {
    console.log("DOM is ready");


    $(document).on("click", ".togglechart", function() {
        togglechart(this);
    });

    prepareDataPassedIntoCharts();


    $('body').on('click', function(e) {
        $("[data-toggle=popover]").each(function(i, obj) {
            $(this).popover({
                html: true,
                content: function() {
                    var id = $(this).attr('id');
                    return $('#popover-content-' + id).html();
                }
            });
            if (!$(this).is(e.target) && $(this).has(e.target).length === 0 && $('.popover').has(e.target).length === 0) {
                $(this).popover('hide');
            }
        });
    });
});





var prepareDataPassedIntoCharts = function() {
    //Sample format data/cSharpcornerStatistics--dd-mm-yyyy 
    //var promise = $.getJSON('data/csharpcorner.json');
    //var promise = $.getJSON('data/cSharpcornerStatistics--04-11-2018.json');
    var promise = $.getJSON('data/cSharpcornerStatistics--3-1-2019.json');


    promise.done(function(data) {
        console.log(data);
        dashboardData = data;
        initCharts(data);
        $("#dashboard-summary").html(prepareSummary(data));
    });

    promise.fail(function() {
        dashboardData = sampledata;
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
            // Push Category wise count based on categorytype e.g.  News Article for each technology category
            seriesData[subCategory.categoryType].push(parseFloat(subCategory.count));
        });

    });


    for (var key in seriesData) {
        var totalCount = _.sum(seriesData[key]);
        totalContribution += totalCount;
        //     htmlContent += "<li> Total " + key + " Count : <b>" + totalCount + " </b></li>";
        $("." + key).html(doNumberFormat(totalCount, 0)).attr("title", totalCount);
    }
    $(".Technology").html(doNumberFormat(data.length)).attr("title", data.length);
    $(".Contribution").html(doNumberFormat(totalContribution)).attr("title", totalContribution);
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




function doNumberFormat(number, decPlaces) {
    // Default value for decimal Place is 0 if not passed in argument
    if (!decPlaces) { decPlaces = 0; }
    // 2 decimal places => 100, 3 => 1000, etc
    decPlaces = Math.pow(10, decPlaces);

    // Enumerate number abbreviations
    var abbrev = ["k", "m", "b", "t"];

    // Go through the array backwards, so we do the largest first
    for (var i = abbrev.length - 1; i >= 0; i--) {

        // Convert array index to "1000", "1000000", etc
        var size = Math.pow(10, (i + 1) * 3);

        // If the number is bigger or equal do the abbreviation
        if (size <= number) {
            // Here, we multiply by decPlaces, round, and then divide by decPlaces.
            // This gives us nice rounding to a particular decimal place.
            number = Math.round(number * decPlaces / size) / decPlaces;

            // Handle special case where we round up to the next abbreviation
            if ((number == 1000) && (i < abbrev.length - 1)) {
                number = 1;
                i++;
            }

            // Add the letter for the abbreviation
            number += abbrev[i];

            // We are done... stop
            break;
        }
    }

    return number;
}