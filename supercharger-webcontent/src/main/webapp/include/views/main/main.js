$(function () {

    var INITIAL_RANGE_MILES = 250;

    var mapView = new redshiftsoft.MapView();
    mapView.initMap();

    var controlView = new redshiftsoft.ControlView(INITIAL_RANGE_MILES);
    controlView.valueChanged = function (newValue) {
        jQuery.doTimeout("timerId", 200, function () {
            mapView.setRadiusMiles(newValue);
        });

    }

});