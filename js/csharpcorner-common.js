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




};

function zoomInCharts(options) {
    console.log("zoomInCharts called ...");
};

$(function() {
    console.log("DOM is ready");
    prepareDataPassedIntoCharts();
});





var prepareDataPassedIntoCharts = function() {
    var promise = $.getJSON('data/csharpcorner.json');

    promise.done(function(data) {
        initCharts(data);
    });

    promise.fail(function() {
        initCharts(sampledata);
    });
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