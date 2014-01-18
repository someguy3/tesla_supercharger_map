define(['data/SuperchargerData', 'util/Objects', 'lib/highcharts'], function (SuperchargerData, Objects) {


    var Charts = function () {

    };

    Charts.prototype.drawChart = function () {

        var livePerDateUS = [];
        var livePerDateNotUS = [];

        var list = SuperchargerData.LIST.sort(SuperchargerData.sort);

        var countUSA = 0;
        var countNotUSA = 0;

        function doesArrayContainUTCDate(array, dateUTC) {
            return array.length > 0 && array[array.length - 1][0] == dateUTC;
        }

        $.each(list, function (index, supercharger) {
            if (!Objects.isNullOrUndefined(supercharger.dateOpened) && supercharger.count) {
                var date = supercharger.dateOpened;
                var dateUTC = Date.UTC(1900 + date.getYear(), date.getMonth(), date.getDate());

                if (supercharger.address.isUSA()) {
                    countUSA++;
                    if (!doesArrayContainUTCDate(livePerDateUS, dateUTC)) {
                        livePerDateUS.push([dateUTC, countUSA]);
                    }
                } else {
                    countNotUSA++;
                    if (!doesArrayContainUTCDate(livePerDateNotUS, dateUTC)) {
                        livePerDateNotUS.push([dateUTC, countNotUSA]);
                    }

                }
            }
        });


        $("#chart-supercharger-over-time").highcharts({
            chart: {
                zoomType: 'x',
                type: 'spline'
            },
            credits: {
                enabled: false
            },
            title: {
                text: 'Superchargers Over Time'
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
                }
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
                        Highcharts.dateFormat('%b %e %Y', this.x) + ', count=' + this.y;
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

    return Charts;


});