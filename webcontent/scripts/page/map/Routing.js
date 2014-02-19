define([], function () {

    /**
     *
     * @constructor
     */
    var Routing = function () {
        this.routeList = [];
        this.directionsService = new google.maps.DirectionsService();
        $("#route-panel-close-trigger").click(jQuery.proxy(this.closeRoutePanel, this));
    };

    Routing.prototype.handleAddRouteEvent = function (event, eventData) {
        this.handleAddRoute(eventData.latLng, eventData.googleMap);
    };


    Routing.prototype.handleAddRoute = function (latLng, googleMap) {
        this.initializeDirectionRenderer(googleMap);
        this.showRoutePanel();

        this.routeList.push(latLng);
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
        $("#route-directions-panel").html("");
        if (status === google.maps.DirectionsStatus.OK) {
            this.directionsRenderer.setDirections(response);
        }
    };

    Routing.prototype.initializeDirectionRenderer = function (googleMap) {
        this.directionsRenderer = new google.maps.DirectionsRenderer({
            map: googleMap,
            panel: document.getElementById('route-directions-panel'),
            preserveViewport: true,
            suppressMarkers: true,
            draggable: true
        });
    };

    Routing.prototype.closeRoutePanel = function (event) {
        event.preventDefault();
        var mapMainContentRow = $("#map-row-main-content");
        var routeDiv = mapMainContentRow.children().eq(0);
        var mapDiv = mapMainContentRow.children().eq(1);

        routeDiv.hide();
        routeDiv.removeClass("col-md-4");
        mapDiv.removeClass("col-md-8");
        mapDiv.addClass("col-md-12");
    };


    Routing.prototype.showRoutePanel = function () {
        var mapMainContentRow = $("#map-row-main-content");
        var routeDiv = mapMainContentRow.children().eq(0);
        var mapDiv = mapMainContentRow.children().eq(1);

        routeDiv.show();
        routeDiv.addClass("col-md-4");
        mapDiv.addClass("col-md-8");
    };

    return Routing;

});

