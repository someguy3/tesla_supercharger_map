define(['page/map/RoutingPanel'], function (RoutingPanel) {

    /**
     *
     * @constructor
     */
    var Routing = function (googleMap) {
        this.waypointList = [];
        this.googleMap = googleMap;
        this.directionsService = new google.maps.DirectionsService();
        this.routingPanel = new RoutingPanel();
    };

    Routing.prototype.handleAddRouteEvent = function (event, routingWaypoint) {
        this.handleAddRoute(routingWaypoint);
    };

    Routing.prototype.handleAddRoute = function (routingWaypoint) {
        this.initializeDirectionRenderer();
        this.routingPanel.show();

        this.waypointList.push(routingWaypoint);
        this.routingPanel.updateWaypoints(this.waypointList);
        var routeListLength = this.waypointList.length;

        if (routeListLength > 1) {
            var routeListClone = this.waypointList.slice(0);
            var directionsRequest = {
                origin: routeListClone.shift().latLng,
                destination: routeListClone.pop().latLng,
                waypoints: this.calcWayPoints(routeListClone),
                travelMode: google.maps.TravelMode.DRIVING
            };
            this.directionsService.route(directionsRequest, jQuery.proxy(this.handleRouteResponse, this));
        }
    };

    Routing.prototype.calcWayPoints = function (locationList) {
        var wayPoints = [];
        jQuery.each(locationList, function (index, value) {
            wayPoints.push({ location: value.latLng, stopover: true});
        });
        return wayPoints;
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

