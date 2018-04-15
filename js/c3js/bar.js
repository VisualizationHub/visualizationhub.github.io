var commonData=[{"name":"Year 1800","data":[107,31,635,203],"country":"Africa"}
,{"name":"Year 1900","data":[133,156,947,408],"country":"America"}
,{"name":"Year 2000","data":[814,841,3714,727],"country":"Asia"}
,{"name":"Year 2016","data":[1216,1001,4436,738],"country":"Europe"}];
var chart = c3.generate({
    bindto: '#c3-bar-container',
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
        type: 'bar',
        labels: true
        // keys: {
        // //    tick:{ value: _.pluck(commonData,"country")}
            
        // }
    },
    axis: {
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
    }
});