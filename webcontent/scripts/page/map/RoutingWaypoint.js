define([], function () {

    var RoutingWaypoint = function (latLng, displayName) {
        this.latLng = latLng;
        this.displayName = displayName;
    };

    return RoutingWaypoint;
});