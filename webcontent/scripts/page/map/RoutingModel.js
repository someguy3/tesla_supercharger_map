define([], function () {

    /**
     *
     * @constructor
     */
    var RoutingModel = function () {
        this.waypointList = [];
        this.eventDiv = $("#route-waypoints-panel");
    };

    RoutingModel.INSTANCE = new RoutingModel();

    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    // events
    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

    RoutingModel.prototype.on = function (eventName, callback) {
        this.eventDiv.on(eventName, callback);
    };
    RoutingModel.prototype.trigger = function (eventName, customData) {
        this.eventDiv.trigger(eventName, customData);
    };

    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    //
    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

    RoutingModel.prototype.getWaypoints = function () {
        return this.waypointList;
    };

    RoutingModel.prototype.addWaypoint = function (waypoint) {
        this.waypointList.push(waypoint);
        this.trigger("model-changed");
    };

    RoutingModel.prototype.removeWaypoint = function (index) {
        this.waypointList.splice(index, 1);
        this.trigger("model-changed");
    };

    RoutingModel.prototype.size = function (index) {
        return this.waypointList.length;
    };

    RoutingModel.prototype.getFirstLatLng = function (index) {
        return this.waypointList[0];
    };

    RoutingModel.prototype.getLastLatLng = function (index) {
        return this.waypointList[this.size() - 1];
    };

    RoutingModel.prototype.getBetweenLatLngList = function () {
        var wayPointLatLngList = [];
        var INDEX_LAST = this.waypointList.length - 1;
        var INDEX_FIRST = 0;
        jQuery.each(this.waypointList, function (index, value) {
            if ((index !== INDEX_FIRST) && (index !== INDEX_LAST)) {
                wayPointLatLngList.push({ location: value.latLng, stopover: true});
            }
        });
        return wayPointLatLngList;
    };

    return RoutingModel;

});