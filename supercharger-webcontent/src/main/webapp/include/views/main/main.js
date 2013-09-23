$(function () {

    var INITIAL_RANGE_MILES = 230;
    var INITIAL_FILL_OPACITY = 0.15;

    var mapView = new redshiftsoft.MapView(INITIAL_RANGE_MILES);
    mapView.initMap();

    var controlView = new redshiftsoft.ControlView(INITIAL_RANGE_MILES, INITIAL_FILL_OPACITY);

    //
    // Callback: range change
    //
    controlView.rangeChangedCallback = function (newValue) {
        jQuery.doTimeout("rangeTimerId", 200, function () {
            mapView.setRadiusMiles(newValue);
        });
    };


    //
    // Callback: fill-opacity change
    //
    controlView.fillOpacityChangedCallback = function (newValue) {
        jQuery.doTimeout("fillOpacityTimerId", 400, function () {
            mapView.fillOpacity = newValue;
            mapView.drawCircles();
            //alert("new opacity:" + newValue);
        });
    };


    //
    // Callback: mapType change
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