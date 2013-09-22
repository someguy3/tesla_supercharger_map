$(function () {

    var INITIAL_RANGE_MILES = 230;

    var mapView = new redshiftsoft.MapView(INITIAL_RANGE_MILES);
    mapView.initMap();

    var controlView = new redshiftsoft.ControlView(INITIAL_RANGE_MILES);
    controlView.valueChanged = function (newValue) {
        jQuery.doTimeout("timerId", 200, function () {
            mapView.setRadiusMiles(newValue);
        });

    }

});