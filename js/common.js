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



    //chart.js
    getBarChartJs({
        Id: 'chart-bar-container'
    });
    getDoughNutChartJs({
        Id: 'chart-doughnut-container'
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

});