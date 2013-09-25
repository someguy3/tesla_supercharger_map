$(function () {

    var INITIAL_RANGE_MILES = 230;
    var INITIAL_FILL_OPACITY = 0.15;
    var INITIAL_FILL_COLOR = "#c5e50b";

    var INITIAL_BORDER_OPACITY = 1.0;
    var INITIAL_BORDER_COLOR = "#c5e50b";

    var mapView = new redshiftsoft.MapView(INITIAL_RANGE_MILES,
        INITIAL_FILL_OPACITY, INITIAL_FILL_COLOR,
        INITIAL_BORDER_OPACITY, INITIAL_BORDER_COLOR);

    mapView.initMap();

    var controlView = new redshiftsoft.ControlView(
        INITIAL_RANGE_MILES,
        INITIAL_FILL_OPACITY, INITIAL_FILL_COLOR,
        INITIAL_BORDER_OPACITY, INITIAL_BORDER_COLOR);

    //
    // Callback: range change
    //
    controlView.rangeChangedCallback = function (newValue) {
        jQuery.doTimeout("rangeTimerId", 200, function () {
            mapView.setRadiusMiles(newValue);
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

    //
    // Callback: fill-opacity change
    //
    controlView.fillOpacityChangedCallback = function (newValue) {
        jQuery.doTimeout("fillOpacityTimerId", 400, function () {
            mapView.setFillOpacity(newValue);
            mapView.drawCircles();
        });
    };

    //
    // Callback: fill color change
    //
    controlView.fillColorChangeCallback = function (newColor) {
        mapView.setFillColor(newColor);
        mapView.drawCircles();
    };

    //
    // Callback: fill-opacity change
    //
    controlView.borderOpacityChangedCallback = function (newValue) {
        jQuery.doTimeout("borderOpacityTimerId", 400, function () {
            mapView.setBorderOpacity(newValue);
            mapView.drawCircles();
        });
    };

    //
    // Callback: fill color change
    //
    controlView.borderColorChangeCallback = function (newColor) {
        mapView.setBorderColor(newColor);
        mapView.drawCircles();
    };


});