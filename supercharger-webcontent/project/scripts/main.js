requirejs.config({
    paths: {
        "jquery": "http://ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min",
        "jqueryui": "http://ajax.googleapis.com/ajax/libs/jqueryui/1.10.3/jquery-ui.min"
    },
    shim: {
        'lib/bootstrap': {
            deps: ["jquery"],
            exports: "$.fn.popover"
        },
        'lib/spectrum': {
            deps: ["jquery"]
        },
        'lib/jquery.doTimeout': {
            deps: ["jquery"]
        }
    }
});


// Start the main app logic.
requirejs(
    [
        'jquery', 'jqueryui', 'lib/bootstrap',
        'data/SuperchargerCount',
        'nav/NavBar', 'routing/Routing',
        'map/ControlState', 'map/MapView', 'map/ControlView', 'map/ControlViewTable', 'lib/jquery.doTimeout', 'lib/GoogleAnalytics'
    ],
    function ($, jQueryUI, bootstrap, SuperchargerCount, NavBar, Routing, ControlState, MapView, ControlView, ControlViewTable) {

        /**
         *
         * @constructor
         */
        var Main = function () {

            var controlState = new ControlState();

            this.routing = new Routing();
            this.navBar = new NavBar();

            this.mapView = new MapView(controlState);
            this.controlView = new ControlView(controlState);

            this.initMapViewListeners();
            this.initControlViewListeners();
            this.initNavBarListeners();

            new ControlViewTable();
            new SuperchargerCount();
        };


        Main.prototype.initNavBarListeners = function () {
            var mapView = this.mapView;
            var controlView = this.controlView;

            this.navBar.onDropDownEvent(" nav-dropdown-event-circles-on", function (event) {
                mapView.setAllRangeCircleVisibility(true);
            });

            this.navBar.onDropDownEvent(" nav-dropdown-event-circles-off", function (event) {
                mapView.setAllRangeCircleVisibility(false);
            });

            this.navBar.onDropDownEvent("nav-dropdown-event-dist-unit", function (event, newUnit) {
                controlView.handleDistanceUnit(newUnit);
            });

        }

            /**
         * INIT: MapView
         */
        Main.prototype.initMapViewListeners = function () {
            this.mapView.on("map-event-route-added", jQuery.proxy(this.routing.handleAddRouteEvent, this.routing));
        };


        /**
         * INIT: ControlView
         */
        Main.prototype.initControlViewListeners = function () {

            var mapView = this.mapView;
            var controlView = this.controlView;

            // Callback: range change
            //
            controlView.on("range-change-event", function (event, controlState) {
                jQuery.doTimeout("rangeTimerId", 200, function () {
                    mapView.setControlState(controlState);
                    mapView.redraw(false);
                });
            });

            // Callback: fill-opacity change
            //
            controlView.on("fill-opacity-changed-event", function (event, controlState) {
                jQuery.doTimeout("fillOpacityTimerId", 400, function () {
                    mapView.setControlState(controlState);
                    mapView.redraw(false);
                });

            });

            // Callback: fill color change
            //
            controlView.on("fill-color-change-event", function (event, controlState) {
                mapView.setControlState(controlState);
                mapView.redraw(false);
            });

            // Callback: fill-opacity change
            //
            controlView.on("border-opacity-changed-event", function (event, controlState) {
                jQuery.doTimeout("borderOpacityTimerId", 400, function () {
                    mapView.setControlState(controlState);
                    mapView.redraw(false);
                });
            });

            // Callback: fill color change
            //
            controlView.on("border-color-change-event", function (event, controlState) {
                mapView.setControlState(controlState);
                mapView.redraw(false);
            });

            // Callback: station status change
            //
            controlView.on("station-status-change-event", function (event, controlState) {
                mapView.setControlState(controlState);
                mapView.redraw(true);
            });

            // Callback: zoom to location
            //
            controlView.on("control-event-zoom-location", function (event, locationText) {
                mapView.zoomToLocation(locationText);
            });

        };


        /**
         * ON DOCUMENT READY
         */
        $(document).ready(function () {
            new Main();
        });


        return Main;

    });