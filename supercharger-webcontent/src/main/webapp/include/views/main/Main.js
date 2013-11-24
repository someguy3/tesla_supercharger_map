/**
 * MapView setup
 */
$(function () {

    var INITIAL_RANGE_METERS = redshiftsoft.Range.milesToMeters(40.0);
    var INITIAL_FILL_OPACITY = 0.15;
    var INITIAL_FILL_COLOR = "#86c4ec";

    var INITIAL_BORDER_OPACITY = 0.6;
    var INITIAL_BORDER_COLOR = "#181fe7";

    var mapView = new redshiftsoft.MapView(INITIAL_RANGE_METERS,
        INITIAL_FILL_OPACITY, INITIAL_FILL_COLOR,
        INITIAL_BORDER_OPACITY, INITIAL_BORDER_COLOR);

    var controlView = new redshiftsoft.ControlView(
        INITIAL_RANGE_METERS,
        INITIAL_FILL_OPACITY, INITIAL_FILL_COLOR,
        INITIAL_BORDER_OPACITY, INITIAL_BORDER_COLOR);

    //
    // Callback: range change
    //
    controlView.on("range-change-event", function (event, newRadiusMeters) {
        jQuery.doTimeout("rangeTimerId", 200, function () {
            mapView.setRadiusMeters(newRadiusMeters);
            mapView.drawCircles();
        });
    });

    //
    // Callback: mapType change
    //
    controlView.on("map-type-change-event", function (event, newMapType) {
        if (newMapType == "SATELLITE") {
            mapView.googleMap.setMapTypeId(google.maps.MapTypeId.SATELLITE);
        } else if (newMapType == "ROADMAP") {
            mapView.googleMap.setMapTypeId(google.maps.MapTypeId.ROADMAP);
        } else if (newMapType == "HYBRID") {
            mapView.googleMap.setMapTypeId(google.maps.MapTypeId.HYBRID);
        } else {
            mapView.googleMap.setMapTypeId(google.maps.MapTypeId.TERRAIN);
        }
    });

    //
    // Callback: fill-opacity change
    //
    controlView.on("fill-opacity-changed-event", function (event, newFillOpacity) {
        jQuery.doTimeout("fillOpacityTimerId", 400, function () {
            mapView.setFillOpacity(newFillOpacity);
            mapView.drawCircles();
        });

    });

    //
    // Callback: fill color change
    //
    controlView.on("fill-color-change-event", function (event, newColor) {
        mapView.setFillColor(newColor);
        mapView.drawCircles();
    });

    //
    // Callback: fill-opacity change
    //
    controlView.on("border-opacity-changed-event", function (event, newValue) {
        jQuery.doTimeout("borderOpacityTimerId", 400, function () {
            mapView.setBorderOpacity(newValue);
            mapView.drawCircles();
        });
    });

    //
    // Callback: fill color change
    //
    controlView.on("border-color-change-event", function (event, newColor) {
        mapView.setBorderColor(newColor);
        mapView.drawCircles();
    });


});

/**
 * SuperChargerCount
 */
$(function () {
    new redshiftsoft.SuperchargerCount();
    new redshiftsoft.ControlView_Table();
});