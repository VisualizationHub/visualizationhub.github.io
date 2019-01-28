var getBarChartJs = function(element) {
    var data = {
        labels: ["Africa"],
        datasets: [{
                label: "Year 1800",
                data: [107, 31, 635, 203],
            },
            {
                label: "Year 1900",
                data: [133, 156, 947, 408],
            },
            {
                label: "Year 2000",
                data: [814, 841, 3714, 727],
            },
            {
                label: "Year 2010",
                data: [1216, 1001, 4436, 738],
            }
        ]
    };
    var options = {
        scales: {
            yAxes: [{
                //	stacked:true,
                gridLines: {
                    display: true,
                    color: "rgba(255,99,132,0.2)"
                }
            }],
            xAxes: [{
                stacked: false,
                gridLines: {
                    display: false
                }
            }]
        }
    };


    var ctx = document.getElementById(element.Id);
    //console.log(ctx);

    new Chart(ctx, {
        type: element.isRotate === undefined ? "bar" : element.isRotate, //'bar',//'horizontalBar', for rotate charts
        data: data,
        options: options
    });

};