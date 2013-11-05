/**
 * MapView setup
 */
$(function () {

    var INITIAL_RANGE_METERS = redshiftsoft.Range.milesToMeters(50.0);
    var INITIAL_FILL_OPACITY = 0.15;
    var INITIAL_FILL_COLOR = "#86c4ec";

    var INITIAL_BORDER_OPACITY = 0.6;
    var INITIAL_BORDER_COLOR = "#181fe7";

    var mapView = new redshiftsoft.MapView(INITIAL_RANGE_METERS,
        INITIAL_FILL_OPACITY, INITIAL_FILL_COLOR,
        INITIAL_BORDER_OPACITY, INITIAL_BORDER_COLOR);

    mapView.initMap();

    var controlView = new redshiftsoft.ControlView(
        INITIAL_RANGE_METERS,
        INITIAL_FILL_OPACITY, INITIAL_FILL_COLOR,
        INITIAL_BORDER_OPACITY, INITIAL_BORDER_COLOR);

    //
    // Callback: range change
    //
    controlView.rangeChangedCallback = function (newRadiusMeters) {
        jQuery.doTimeout("rangeTimerId", 200, function () {
            mapView.setRadiusMeters(newRadiusMeters);
            mapView.drawCircles();
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

/**
 * SuperChargerCount
 */
$(function () {
    new redshiftsoft.SuperchargerCount();
    new redshiftsoft.ControlView_Table();
});