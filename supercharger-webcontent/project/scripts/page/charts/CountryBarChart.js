define(['site/Sites', 'site/SiteIterator', 'util/Objects', 'lib/highcharts'], function (Sites, SiteIterator, Objects) {

    /**
     *
     * @constructor
     */
    var CountryBarChart = function () {

    };

    CountryBarChart.prototype.draw = function () {

        var countryMap = {};

        new SiteIterator()
            .withPredicate(SiteIterator.PRED_IS_OPEN)
            .withPredicate(SiteIterator.PRED_IS_COUNTED)
            .withSort(SiteIterator.FUN_SORT_BY_OPEN_DATE)
            .iterate(function (supercharger) {
                var country = supercharger.address.country;
                if (Objects.isNullOrUndef(countryMap[country])) {
                    countryMap[country] = 1;
                } else {
                    countryMap[country] = (countryMap[country] + 1);
                }
            });

        var countryNameList = [];
        var countryCountList = [];

        $.each(countryMap, function (key, value) {
            countryNameList.push(key);
            countryCountList.push(value);
        });

        $("#chart-country-bar").highcharts({
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
                categories: countryNameList
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
                    data: countryCountList
                }
            ]
        });


    };

    return CountryBarChart;


});