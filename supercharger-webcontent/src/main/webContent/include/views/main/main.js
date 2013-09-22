$(function () {

    var mapView = new redshiftsoft.MapView();
    mapView.initMap();

    var controlView = new redshiftsoft.ControlView();
    controlView.init();
    controlView.valueChanged = function (newValue) {
        jQuery.doTimeout("timerId", 200, function () {
            mapView.setRadiusMiles(newValue);
        });

    }

});