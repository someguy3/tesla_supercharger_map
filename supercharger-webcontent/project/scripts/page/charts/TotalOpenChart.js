define(['site/Sites', 'site/SiteIterator', 'lib/highcharts'], function (Sites, SiteIterator) {

    /**
     *
     * @constructor
     */
    var TotalOpenChart = function () {

    };

    TotalOpenChart.prototype.draw = function () {

        var livePerDateUS = [];
        var livePerDateNotUS = [];

        var countUSA = 0;
        var countNotUSA = 0;

        function removePreviousIfSameDate(array, dateUTC) {
            if (array.length > 0 && array[array.length - 1][0] === dateUTC) {
                array.pop();
            }
        }

        new SiteIterator()
            .withPredicate(SiteIterator.PRED_IS_OPEN)
            .withPredicate(SiteIterator.PRED_IS_COUNTED)
            .withSort(SiteIterator.FUN_SORT_BY_OPEN_DATE)
            .iterate(function (supercharger) {
                var date = supercharger.dateOpened;
                var dateUTC = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate());

                if (supercharger.address.isUSA()) {
                    countUSA++;
                    removePreviousIfSameDate(livePerDateUS, dateUTC);
                    livePerDateUS.push([dateUTC, countUSA]);

                } else {
                    countNotUSA++;
                    removePreviousIfSameDate(livePerDateNotUS, dateUTC);
                    livePerDateNotUS.push([dateUTC, countNotUSA]);
                }
            });

        var plotLinesArray = [];
        var currentYear = new Date().getFullYear();
        for (var year = 2013; year <= currentYear; year++) {
            plotLinesArray.push(
                {
                    value: Date.UTC(year, 0, 1),
                    color: '#87CEEB',
                    width: 2,
                    label: {
                        text: year,
                        align: 'left',
                        style: {
                            color: 'gray'
                        }
                    }
                }
            );
        }


        $("#chart-supercharger-over-time").highcharts({
            chart: {
                zoomType: 'x',
                type: 'spline'
            },
            credits: {
                enabled: false
            },
            title: {
                text: 'Open Superchargers Over Time'
            },
            subtitle: {
                text: null
            },
            legend: {
                enabled: true
            },
            xAxis: {
                type: 'datetime',
                dateTimeLabelFormats: { // don't display the dummy year
                    month: '%b %e %Y',
                    year: '%b'
                },
                plotLines: plotLinesArray
            },
            yAxis: {
                title: {
                    text: 'Count'
                },
                min: 0
            },
            tooltip: {
                formatter: function () {
                    return '<b>' + this.series.name + '</b><br/>' +
                        Highcharts.dateFormat('%b %e %Y', this.x) + '<br/>' +
                        "superchargers: " + this.y;
                }
            },

            series: [
                {
                    name: "US",
                    data: livePerDateUS,
                    lineWidth: 1,
                    marker: {
                        radius: 3
                    }
                },
                {
                    name: "Outside US",
                    data: livePerDateNotUS,
                    lineWidth: 1,
                    marker: {
                        radius: 3
                    }
                }

            ]
        });


    };

    return TotalOpenChart;


});