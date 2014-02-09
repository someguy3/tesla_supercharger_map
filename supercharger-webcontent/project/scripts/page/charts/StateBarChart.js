define(['site/Sites', 'site/SiteIterator', 'util/Objects', 'lib/highcharts'], function (Sites, SiteIterator, Objects) {

    /**
     *
     * @constructor
     */
    var CountryBarChart = function () {

    };

    CountryBarChart.prototype.draw = function () {

        var stateMap = {};

        new SiteIterator()
            .withPredicate(SiteIterator.PRED_IS_OPEN)
            .withPredicate(SiteIterator.PRED_IS_COUNTED)
            .withPredicate(SiteIterator.PRED_IS_USA)
            .withSort(SiteIterator.FUN_SORT_BY_OPEN_DATE)
            .iterate(function (supercharger) {
                var state = supercharger.address.state;
                if (Objects.isNullOrUndef(stateMap[state])) {
                    stateMap[state] = 1;
                } else {
                    stateMap[state] = (stateMap[state] + 1);
                }
            });

        var stateNameList= [];
        var stateCountList = [];

        $.each(stateMap, function (key, value) {
            stateNameList.push(key);
            stateCountList.push(value);
        });

        $("#chart-state-bar").highcharts({
            chart: {
                type: 'column'
            },
            credits: {
                enabled: false
            },
            title: {
                text: 'Superchargers Per Country'
            },
            subtitle: {
                text: null
            },
            legend: {
                enabled: false
            },
            xAxis: {
                categories: stateNameList
            },
            yAxis: {
                title: {
                    text: 'Count'
                }
            },
            tooltip: {
                formatter: function () {
                    return '<b>' + this.series.name + '</b><br/>' +
                        "superchargers: " + this.y;
                }
            },
            plotOptions: {
                bar: {
                    dataLabels: {
                        enabled: true
                    }
                }
            },
            series: [
                {
                    name: "Count",
                    data: stateCountList
                }
            ]
        });


    };

    return CountryBarChart;


});