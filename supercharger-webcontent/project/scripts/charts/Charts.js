define(['data/SuperchargerData', 'util/Objects', 'lib/highcharts'], function (SuperchargerData, Objects) {


    var Charts = function () {

    };

    Charts.prototype.drawChart = function () {

//        Highcharts.setOptions({
//            global: {
//                useUTC: false
//            }
//        });

        var livePerDateArray = [];

        var list = SuperchargerData.LIST.sort(SuperchargerData.sort);

        var count = 0;
        $.each(list, function (index, val) {
            if (!Objects.isNullOrUndefined(val.dateOpened)) {
                count++;
                var date = val.dateOpened;
                $("body").append("date: " + date + "<br/>");
                livePerDateArray.push([Date.UTC(1900 + date.getYear(), date.getMonth(), date.getDate()), count]);
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
                    month: '%e. %b %Y',
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
                        Highcharts.dateFormat('%e. %b', this.x) + ': ' + this.y;
                }
            },

            series: [
                {
                    name: null,
                    data: livePerDateArray,
                    lineWidth: 1,
                    marker: {
                        radius: 2
                    }
                }
            ]
        });


    };

    return Charts;


});