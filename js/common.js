// common initial function to bind and pass data into chart
var initCharts = function () {
    //highchartjs
    getBarHighchart({
        Id: 'hc-bar-container'
    });
    getAreaHighchart({
        Id: 'hc-area-container'
    });
    getColumnHighchart({
        Id: 'hc-column-container'
    });
    getPieHighchart({
        Id: 'hc-pie-container'
    });
    getBubbleHighchart({
        Id: 'hc-bubble-container'
    });

    //c3.js
    getBarC3Js({
        Id: 'c3-bar-container'
    });

    getDonutC3Js({
        Id: 'c3-donut-container'
    });

    getLineC3Js({
        Id: 'c3-line-container'
    });

    getPieC3Js({
        Id: 'c3-pie-container'
    });

    getBubbleC3Js({
        Id: 'c3-bubble-container'
    });



    //chart.js
    getBarChartJs({
        Id: 'chart-bar-container'
    });
    getDoughNutChartJs({
        Id: 'chart-doughnut-container'
    });
    getBubbleChartJs({
        Id: 'chart-bubble-container'
    });

    //tuichart.js
    getBarTuiChart({
        Id: "tui-bar-container"
    });

};


function zoomInCharts(options) {
    console.log("zoomInCharts called ...");
    //TO DO options should contain lot more info to make dyanmic for each charts based on parameter
    // Temporary logic to do zoom for all charts
    switch (options.title) {
        //highchartjs
        case 'Bar Chart (Highchart.JS)':
            getBarHighchart({
                Id: options.Id
            });
            break;
        case 'Stacked Area Chart (Highchart.JS)':
            getAreaHighchart({
                Id: options.Id
            });
            break;
        case 'Column Chart (Highchart.JS)':
            getColumnHighchart({
                Id: options.Id
            });
            break;
        case 'Pie Chart (Highchart.JS)':
            getPieHighchart({
                Id: options.Id
            });
            break;
        case 'Bubble Chart (Highchart.JS)':
            getBubbleHighchart({
                Id: options.Id
            });
            break;

        //c3.js
        case 'Bar Chart (C3.JS)':
            getBarC3Js({
                Id: options.Id
            });
            break;
        case 'Donut Chart (C3.JS)':
            getDonutC3Js({
                Id: options.Id
            });
            break;
        case 'Line Chart (C3.JS)':
            getLineC3Js({
                Id: options.Id
            });
            break;
        case 'Pie Chart (C3.JS)':
            getPieC3Js({
                Id: options.Id
            });
            break;
        case 'Bar Chart (Tui Chart.JS)':
            getBarTuiChart({
                Id: options.Id
            });
            break;
        case 'Bubble Chart (C3.JS)':
            getBubbleC3Js({
                Id: options.Id
            });
            break;



        //chart.js

        case 'Bar Chart (Chart.JS)':
            // Temporary fix to append canvas in html for the chartjs
            var canv = document.createElement("canvas");

            canv.setAttribute("id", "chart-zoom");
            document.getElementById(options.Id).appendChild(canv); // adds the canvas

            getBarChartJs({
                Id: "chart-zoom"
            });
            break;
        case 'Doughnut (Chart.JS)':
            // Temporary fix to append canvas in html for the chartjs
            var canv2 = document.createElement("canvas");

            canv2.setAttribute("id", "chart-zoom");
            document.getElementById(options.Id).appendChild(canv2); // adds the canvas

            getDoughNutChartJs({
                Id: "chart-zoom"
            });
            break;
        case 'Bubble Chart (Chart.JS)':
            // Temporary fix to append canvas in html for the chartjs
            var canv2 = document.createElement("canvas");

            canv2.setAttribute("id", "chart-zoom");
            document.getElementById(options.Id).appendChild(canv2); // adds the canvas

            getBubbleChartJs({
                Id: "chart-zoom"
            });
            break;
    }

}

var togglechart = function (e) {
    console.log("togglechart BUTTON CLICKED.");

    console.log(e);
    // Temporary logic to do zoom for all charts
    var chartTitle = $(e).parent().text().trim();


    // Do Some calculation or some stuff for zomm in chart
    // Clear old contents from popup
    $('#zoomTitle').empty();
    $('#zoomTitle').text(chartTitle);
    $('#zoombody').empty();

    // fix height& width issue
    var element = document.getElementById('zoombody');
    element.removeAttribute("style");
    element.removeAttribute("class");
    element.style.height = "500px";

    // Update requested charts in Zoom mode
    // For Temporary purpose used setTimout function as popup opened after zoomInCharts function
    setTimeout(function () {
        zoomInCharts({
            title: chartTitle,
            Id: 'zoombody'
        });
    }, 0);

    //show thw popup
    $('#zoomPopup').modal('show');
};



$(function () {
    console.log("DOM is ready");
    initCharts();

    $(".togglechart").click(function () {
        togglechart(this);
    });
    // Dashboard toggle view using switch
    $('#toggleDashboard').click(function (e) {
        var element = $("#toggleDashboard").children();
        if ($(element).hasClass('fa-toggle-off')) {
            $(element).toggleClass('fa-toggle-off fa-toggle-on');
            $("#toggleDashboard").attr('title', "Click to switch main dashboard");
            $("#dashboard-title").html('Second Dashboard');
            $('.main-dashboard').hide();
            //temporary fixed issue common ids and charts loads
            $('.second-dashboard').html($('.main-dashboard').html());
            $('.second-dashboard').show();

        } else {
            $(element).toggleClass('fa-toggle-on fa-toggle-off');
            $("#toggleDashboard").attr('title', "Click to switch second dashboard");
            $("#dashboard-title").html('Main Dashboard');
            $('.main-dashboard').show();
            $('.second-dashboard').hide();
        }
    });

    $(".rotate-chart").click(function (e) {
        //Store current element in local as cache value to reduce extra traversing for same element using jquery
        var $currentElement = $(this);
        var chartLib = $currentElement.attr("data-lib");
        var chartType = $currentElement.attr("data-chart-type");
        if (chartLib === "c3js") {

            //Below code for rotate charts only works for c3 bar charts
            var isRotate = $currentElement.attr("data-rotate") === "false" ? true : false;
            console.log(this);
            $currentElement.attr("data-rotate", isRotate);
            var chartId = "c3-" + chartType + "-container";
            switch (chartType) {
                case "bar":

                    getBarC3Js({
                        Id: chartId, //$(this).attr("data-target-id"),
                        isRotate: isRotate
                    });

                    break;
                case "line":

                    getLineC3Js({
                        Id: chartId, //$(this).attr("data-target-id"),
                        isRotate: isRotate
                    });

                    break;
                default:
                    break;
            }
        } else if (chartLib === "chartjs") {
            //Below code for rotate charts only works for chartsjs bar/column charts
            var isRotate = $currentElement.attr("data-rotate") === "bar" ? "horizontalBar" : "bar";
            //console.log(this);
            $currentElement.attr("data-rotate", isRotate);
            var chartId = "chart-" + chartType + "-container";
            switch (chartType) {
                case "bar":

                    getBarChartJs({
                        Id: chartId, //$(this).attr("data-target-id"),
                        isRotate: isRotate
                    });

                    break;
                default:
                    break;
            }
        } else if (chartLib === "highchartjs") {
            //Below code for rotate charts only works for chartsjs bar/column charts
            var isRotate = $currentElement.attr("data-rotate") === "bar" ? "column" : "bar";
            //console.log(this);
            $currentElement.attr("data-rotate", isRotate);
            var chartId = "hc-" + chartType + "-container";
            switch (chartType) {
                case "bar":

                    getBarHighchart({
                        Id: chartId, //$(this).attr("data-target-id"),
                        isRotate: isRotate
                    });

                    break;
                case "column":

                    getColumnHighchart({
                        Id: chartId, //$(this).attr("data-target-id"),
                        isRotate: isRotate
                    });

                    break;

                default:
                    break;
            }
        }
    });

    $('body').on('click', function (e) {
        $("[data-toggle=popover]").each(function (i, obj) {
            $(this).popover({
                html: true,
                content: function () {
                    var id = $(this).attr('id')
                    return $('#popover-content-' + id).html();
                }
            });
            if (!$(this).is(e.target) && $(this).has(e.target).length === 0 && $('.popover').has(e.target).length === 0) {
                $(this).popover('hide');
            }
        });
    });
});