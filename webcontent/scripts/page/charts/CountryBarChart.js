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

        var sortableList = [];
        $.each(countryMap, function (key, value) {
            sortableList.push({countryName: key, count: value});
        });

        sortableList.sort(function (a, b) {
            return b.count - a.count;
        });

        var countryNameList = [];
        var countryCountList = [];

        $.each(sortableList, function (index, map) {
            countryNameList.push(map.countryName);
            countryCountList.push(map.count);
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
                    text: 'Supercharger Count'
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