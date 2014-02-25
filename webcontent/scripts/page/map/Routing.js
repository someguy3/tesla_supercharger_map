define(['page/map/RoutingPanel', 'page/map/RoutingModel'], function (RoutingPanel, RoutingModel) {

    /**
     *
     * @constructor
     */
    var Routing = function (googleMap) {
        this.routingModel = RoutingModel.INSTANCE;
        this.googleMap = googleMap;
        this.directionsService = new google.maps.DirectionsService();
        this.routingPanel = new RoutingPanel();
    };

    Routing.prototype.handleAddRouteEvent = function (event, routingWaypoint) {
        this.initializeDirectionRenderer();
        this.routingPanel.show();
        this.routingModel.addWaypoint(routingWaypoint);

        if (this.routingModel.size() > 1) {
            var directionsRequest = {
                origin: this.routingModel.getFirstLatLng().latLng,
                destination: this.routingModel.getLastLatLng().latLng,
                waypoints: this.routingModel.getBetweenLatLngList(),
                travelMode: google.maps.TravelMode.DRIVING
            };
            this.directionsService.route(directionsRequest, jQuery.proxy(this.handleRouteResponse, this));
        }
    };

    Routing.prototype.handleRouteResponse = function (response, status) {
        this.routingPanel.clearDirections();
        if (status === google.maps.DirectionsStatus.OK) {
            this.directionsRenderer.setDirections(response);
        }
    };

    Routing.prototype.initializeDirectionRenderer = function () {
        this.directionsRenderer = new google.maps.DirectionsRenderer({
            map: this.googleMap,
            panel: this.routingPanel.getDirectionsPanel().get(0),
            preserveViewport: true,
            suppressMarkers: true,
            draggable: true
        });
    };

    return Routing;
});

