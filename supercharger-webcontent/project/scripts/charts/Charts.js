define(['data/SuperchargerData', 'util/Objects', 'lib/highcharts'], function (SuperchargerData, Objects) {


    var Charts = function () {

    };

    Charts.prototype.drawChart = function () {

        Highcharts.setOptions({
            global: {
                useUTC: false
            }
        });

        var livePerDateArray = [];

        var list = SuperchargerData.LIST.sort(SuperchargerData.sort);

        var count = 0;
        $.each(list, function (index, val) {
            if (!Objects.isNullOrUndefined(val.dateOpened)) {
                count++;
                var date = val.dateOpened;
                livePerDateArray.push([date, count]);
            }
        });

        $("#chart-supercharger-over-time").highcharts({
            chart: {
                zoomType: 'x',
                type: 'line'
            },
            credits: {
                enabled: false
            },
            colors: ['red', 'black', 'orange'],
            title: {
                text: "Open Superchargers Over Time"
            },
            rangeSelector: {},
            tooltip: {
                shared: true
            },
            legend: {
                enabled: true
            },
            plotOptions: {},
            xAxis: {
                type: 'datetime',
                dateTimeLabelFormats: { // don't display the dummy year
                    month: '%e. %b',
                    year: '%b'
                }
            },
            yAxis: {
                title: {
                    text: 'Supercharger Count'
                },
                min: 0
            },
            series: [
                {
                    name: 'Date',
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