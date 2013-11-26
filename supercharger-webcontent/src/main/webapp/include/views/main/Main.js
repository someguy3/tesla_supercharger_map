redshiftsoft = createMyNamespace("redshiftsoft");


/**
 * Constructor
 */
redshiftsoft.Main = function () {

    var initialControlState = new redshiftsoft.ControlState();

    this.initMapView(initialControlState);
    this.initControlView(initialControlState);

    new redshiftsoft.ControlView_Table();
    new redshiftsoft.SuperchargerCount();
}


/**
 * INIT: MapView
 */
redshiftsoft.Main.prototype.initMapView = function (controlState) {
    this.mapView = new redshiftsoft.MapView(controlState);
}


/**
 * INIT: ControlView
 */
redshiftsoft.Main.prototype.initControlView = function (controlState) {

    var mapView = this.mapView;

    var controlView = new redshiftsoft.ControlView(controlState);

    //
    // Callback: range change
    //
    controlView.on("range-change-event", function (event, controlState) {
        jQuery.doTimeout("rangeTimerId", 200, function () {
            mapView.setControlState(controlState);
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
    controlView.on("fill-opacity-changed-event", function (event, controlState) {
        jQuery.doTimeout("fillOpacityTimerId", 400, function () {
            mapView.setControlState(controlState);
            mapView.drawCircles();
        });

    });

    //
    // Callback: fill color change
    //
    controlView.on("fill-color-change-event", function (event, controlState) {
        mapView.setControlState(controlState);
        mapView.drawCircles();
    });

    //
    // Callback: fill-opacity change
    //
    controlView.on("border-opacity-changed-event", function (event, controlState) {
        jQuery.doTimeout("borderOpacityTimerId", 400, function () {
            mapView.setControlState(controlState);
            mapView.drawCircles();
        });
    });

    //
    // Callback: fill color change
    //
    controlView.on("border-color-change-event", function (event, controlState) {
        mapView.setControlState(controlState);
        mapView.drawCircles();
    });

}


/**
 * ON DOCUMENT READY
 */
$(document).ready(function () {
    new redshiftsoft.Main();
});
