define(['data/SuperchargerData', 'lib/highcharts'], function (SuperchargerData) {


    var Charts = function () {

    };

    Charts.prototype.drawChart = function () {

        Highcharts.setOptions({
            global: {
                useUTC: false
            }
        });

        var tempInsideData = [];

        $.each(SuperchargerData.LIST, function (index, val) {

            //tempInsideData.push([date, val.tempInside]);
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
                text: null
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
                title: {
                    text: null
                }
            },
            yAxis: [
                {
                    title: {
                        text: 'Supercharger Count'
                    },
                    tickInterval: 2
                }
            ],
            series: [
                {
                    name: 'Date',
                    data: tempInsideData,
                    yAxis: 0,
                    lineWidth: 1,
                    marker: {
                        radius: 1
                    }
                }
            ]
        });


    };

    return Charts;


});