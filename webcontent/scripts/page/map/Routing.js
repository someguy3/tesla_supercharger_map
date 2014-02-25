define(['page/map/RoutingPanel'], function (RoutingPanel) {

    /**
     *
     * @constructor
     */
    var Routing = function () {
        this.routeList = [];
        this.directionsService = new google.maps.DirectionsService();
        this.routingPanel = new RoutingPanel();
    };

    Routing.prototype.handleAddRouteEvent = function (event, eventData) {
        this.handleAddRoute(eventData.latLng, eventData.googleMap);
    };


    Routing.prototype.handleAddRoute = function (latLng, googleMap) {
        this.initializeDirectionRenderer(googleMap);
        this.routingPanel.show();

        this.routeList.push(latLng);
        this.routingPanel.addWaypoint(latLng);
        var routeListLength = this.routeList.length;

        if (routeListLength > 1) {
            var routeListClone = this.routeList.slice(0);
            var request = {
                origin: routeListClone.shift(),
                destination: routeListClone.pop(),
                waypoints: this.calcWayPoints(routeListClone),
                travelMode: google.maps.TravelMode.DRIVING
            };
            this.directionsService.route(request, jQuery.proxy(this.handleRouteResponse, this));
        }
    };

    Routing.prototype.calcWayPoints = function (locationList) {
        var wayPoints = [];
        jQuery.each(locationList, function (index, value) {
            wayPoints.push({ location: value, stopover: true});
        });
        return wayPoints;
    };

    Routing.prototype.handleRouteResponse = function (response, status) {
        this.routingPanel.clearDirections();
        if (status === google.maps.DirectionsStatus.OK) {
            this.directionsRenderer.setDirections(response);
        }
    };

    Routing.prototype.initializeDirectionRenderer = function (googleMap) {
        this.directionsRenderer = new google.maps.DirectionsRenderer({
            map: googleMap,
            panel: this.routingPanel.getDirectionsPanel().get(0),
            preserveViewport: true,
            suppressMarkers: true,
            draggable: true
        });
    };


    return Routing;

});

