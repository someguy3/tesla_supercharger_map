$(function () {

    var INITIAL_RANGE_MILES = 230;

    var mapView = new redshiftsoft.MapView(INITIAL_RANGE_MILES);
    mapView.initMap();

    var controlView = new redshiftsoft.ControlView(INITIAL_RANGE_MILES);

    //
    //
    //
    controlView.rangeChangedCallback = function (newValue) {
        jQuery.doTimeout("timerId", 200, function () {
            mapView.setRadiusMiles(newValue);
        });
    };


    //
    //
    //
    controlView.mapTypeChangedCallback = function (newValue) {
        if (newValue == "SATELLITE") {
            mapView.googleMap.setMapTypeId(google.maps.MapTypeId.SATELLITE);
        } else if (newValue == "ROADMAP") {
            mapView.googleMap.setMapTypeId(google.maps.MapTypeId.ROADMAP);
        } else if (newValue == "HYBRID") {
            mapView.googleMap.setMapTypeId(google.maps.MapTypeId.HYBRID);
        } else {
            mapView.googleMap.setMapTypeId(google.maps.MapTypeId.TERRAIN);
        }
    };

});