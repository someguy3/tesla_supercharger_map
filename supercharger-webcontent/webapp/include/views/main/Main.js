var redshiftsoft = redshiftsoft || {};


/**
 *
 * @constructor
 */
redshiftsoft.Main = function () {

    this.routing = new redshiftsoft.Routing();

    new redshiftsoft.NavBar();

    var initialControlState = new redshiftsoft.ControlState();

    this.initMapView(initialControlState);
    this.initControlView(initialControlState);

    new redshiftsoft.ControlViewTable();
    new redshiftsoft.SuperchargerCount();
};


/**
 * INIT: MapView
 */
redshiftsoft.Main.prototype.initMapView = function (controlState) {
    this.mapView = new redshiftsoft.MapView(controlState);
    this.mapView.on("map-event-route-added", jQuery.proxy(this.routing.handleAddRouteEvent, this.routing));
};


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
            mapView.redraw(false);
        });
    });

    //
    // Callback: fill-opacity change
    //
    controlView.on("fill-opacity-changed-event", function (event, controlState) {
        jQuery.doTimeout("fillOpacityTimerId", 400, function () {
            mapView.setControlState(controlState);
            mapView.redraw(false);
        });

    });

    //
    // Callback: fill color change
    //
    controlView.on("fill-color-change-event", function (event, controlState) {
        mapView.setControlState(controlState);
        mapView.redraw(false);
    });

    //
    // Callback: fill-opacity change
    //
    controlView.on("border-opacity-changed-event", function (event, controlState) {
        jQuery.doTimeout("borderOpacityTimerId", 400, function () {
            mapView.setControlState(controlState);
            mapView.redraw(false);
        });
    });

    //
    // Callback: fill color change
    //
    controlView.on("border-color-change-event", function (event, controlState) {
        mapView.setControlState(controlState);
        mapView.redraw(false);
    });

    //
    // Callback: station status change
    //
    controlView.on("station-status-change-event", function (event, controlState) {
        mapView.setControlState(controlState);
        mapView.redraw(true);
    });

};


/**
 * ON DOCUMENT READY
 */
$(document).ready(function () {
    new redshiftsoft.Main();
});
