define([], function () {

    /**
     * @constructor
     */
    var RoutingPanel = function () {
        this.directionPanel = $("#route-directions-panel");
        this.waypointsPanel = $("#route-waypoints-panel");

        $("#route-panel-close-trigger").click(jQuery.proxy(this.hide, this));
    };

    RoutingPanel.prototype.clearDirections = function () {
        this.directionPanel.html("");
    };

    RoutingPanel.prototype.show = function () {
        var mapMainContentRow = $("#map-row-main-content");
        var routeDiv = mapMainContentRow.children().eq(0);
        var mapDiv = mapMainContentRow.children().eq(1);

        routeDiv.show();
        routeDiv.addClass("col-md-4");
        mapDiv.addClass("col-md-8");
    };

    RoutingPanel.prototype.hide = function (event) {
        event.preventDefault();
        var mapMainContentRow = $("#map-row-main-content");
        var routeDiv = mapMainContentRow.children().eq(0);
        var mapDiv = mapMainContentRow.children().eq(1);

        routeDiv.hide();
        routeDiv.removeClass("col-md-4");
        mapDiv.removeClass("col-md-8");
        mapDiv.addClass("col-md-12");
    };

    RoutingPanel.prototype.addWaypoint = function (latLnt) {
        this.waypointsPanel.find("ul").append("<li>" + latLnt + "</li>");
    };

    RoutingPanel.prototype.getDirectionsPanel = function () {
        return this.directionPanel;
    };

    return RoutingPanel;
});