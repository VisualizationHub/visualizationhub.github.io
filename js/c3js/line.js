
var getLineC3Js = function (element) {


    var linechart =c3.generate({
    bindto: '#' + element.Id,
    data: {
        x:'x',
        columns: [
           ['x',"Africa", "America", "Asia", "Europe"],
            ['Year 1800', 107,31,635,203],
            ['Year 1900', 133,156,947,408 ]
            ,
            ['Year 2000',814,841,3714,727 ]
            ,
            ['Year 2010',1216,1001,4436,738]
        ],
        //x:'country',
        //json:commonData,
        //json:_.pluck(commonData,"data") ,
       // type: 'bar',
        labels: true
        // keys: {
        // //    tick:{ value: _.pluck(commonData,"country")}
            
        // }
    },
    axis: {
        rotated:element.isRotate,
        x: {
            type: 'category' // this needed to load string x value
        }
    },
    bar: {
        width: {
            ratio: 0.5 // this makes bar width 50% of length between ticks
        }
        // or
        //width: 100 // this makes bar width 100px
    },
    grid: {
        x: {
            show: true
        },
        y: {
            show: true
        }
    }
});

setTimeout(function () {
    linechart.resize();
}, 100);
};