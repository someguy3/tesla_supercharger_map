redshiftsoft = createMyNamespace("redshiftsoft");


/**
 * Constructor
 */
redshiftsoft.Main = function () {

    redshiftsoft.Main.INITIAL_RANGE_METERS = redshiftsoft.Range.milesToMeters(40.0);

    this.initMapView();
    this.initControlView();

    new redshiftsoft.ControlView_Table();
    new redshiftsoft.SuperchargerCount();
}

redshiftsoft.Main.INITIAL_RANGE_METERS = 0;
redshiftsoft.Main.INITIAL_FILL_OPACITY = 0.15;
redshiftsoft.Main.INITIAL_FILL_COLOR = "#86c4ec";
redshiftsoft.Main.INITIAL_BORDER_OPACITY = 0.6;
redshiftsoft.Main.INITIAL_BORDER_COLOR = "#181fe7";


/**
 * INIT: MapView
 */
redshiftsoft.Main.prototype.initMapView = function () {
    this.mapView = new redshiftsoft.MapView(
        redshiftsoft.Main.INITIAL_RANGE_METERS,
        redshiftsoft.Main.INITIAL_FILL_OPACITY,
        redshiftsoft.Main.INITIAL_FILL_COLOR,
        redshiftsoft.Main.INITIAL_BORDER_OPACITY,
        redshiftsoft.Main.INITIAL_BORDER_COLOR);

}


/**
 * INIT: ControlView
 */
redshiftsoft.Main.prototype.initControlView = function () {

    var mapView = this.mapView;

    var controlView = new redshiftsoft.ControlView(
        redshiftsoft.Main.INITIAL_RANGE_METERS,
        redshiftsoft.Main.INITIAL_FILL_OPACITY,
        redshiftsoft.Main.INITIAL_FILL_COLOR,
        redshiftsoft.Main.INITIAL_BORDER_OPACITY,
        redshiftsoft.Main.INITIAL_BORDER_COLOR);

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

}


/**
 * ON DOCUMENT READY
 */
$(document).ready(function () {
    new redshiftsoft.Main();
});
