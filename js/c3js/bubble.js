var getBubbleC3Js = function (element) {
    var bubbleChart = c3.generate({
        bindto: '#' + element.Id,
        title: {
            show: false,
            text: 'Correlation between Life Expectancy, Fertility Rate and Population of some world countries (2017)',
            position: 'top-center',   // top-left, top-center and top-right
            padding: {
                top: 0,
                right: 0,
                bottom: 20,
                left: 0
            }
        },
        data: {
            selection: {
                enabled: true,
                multiple: false
            },
            hide: ['FertilityRate', 'Population'],
            names: {
                LifeExpectancy: 'Life Expectancy (Years)',
                FertilityRate: 'Fertility Rate'
            },
            columns: [
                ["LifeExpectancy", 76.5, 68.3, 79.3, 81.2, 82.4, 82.7, 62.9, 82.2, 74.5, 82.8, 81.9, 77.1, 80.6, 81.6, 74.7, 76.2, 69.9, 69.8, 70.9],
                ["FertilityRate", 1.6, 2.43, 1.87, 1.88, 2.07, 1.44, 2.29, 1.6, 2.09, 1.77, 1.78, 2.32, 1.73, 2.02, 2.4, 1.96, 2.41, 1.9, 3.47],
                ["Population", 1409517397, 1339180127, 322179605, 66181585, 64979548, 59359900, 56717156, 36624199, 32938213, 24450561, 17035938, 9400145, 5733551, 4705818, 4136528, 2890299, 905502, 807610, 97553151]
            ],
            axes: {
                LifeExpectancy: 'y',
                FertilityRate: 'y',
                Population: 'y'
            },
            type: 'scatter'
        },
        legend: {
            position: 'right',
            item: {
                onclick: function (id) {
                    loadChart(id);
                }
            }
        },
        point: {
            r: 5
        },
        axis: {
            rotated: element.isRotate,
            x: {
                tick: {
                    fit: true,
                    centered: true
                },
                height: 60,
                type: 'category',
                categories: ["China", "India", "United States", "United Kingdom", "France", "Italy", "South Africa", "Canada", "Saudi Arabia", "Australia", "Netherlands", "United Arab Emirates", "Denmark", "New Zealand", "Kuwait", "Jamaica", "Fiji", "Bhutan", "Egypt"]
            },
            y: {
                show: true
            }
        }
    });

    function loadChart(id) {
        var legendArray = ['LifeExpectancy', 'FertilityRate', 'Population']
        legendArray.remove(id);
        bubbleChart.hide(legendArray);
        bubbleChart.show(id);
    }
    setTimeout(function () {
        bubbleChart.resize();
    }, 100);
};

// To remove from Array
Array.prototype.remove = function () {
    var what, a = arguments, L = a.length, ax;
    while (L && this.length) {
        what = a[--L];
        while ((ax = this.indexOf(what)) !== -1) {
            this.splice(ax, 1);
        }
    }
    return this;
};

//to take care of IE8 and below-
if (!Array.prototype.indexOf) {
    Array.prototype.indexOf = function (what, i) {
        i = i || 0;
        var L = this.length;
        while (i < L) {
            if (this[i] === what) return i;
            ++i;
        }
        return -1;
    };
}