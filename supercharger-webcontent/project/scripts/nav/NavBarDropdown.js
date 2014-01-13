define(['jquery', 'util/Events'], function ($, Events) {

    /**
     *
     * @constructor
     */
    var NavBarDropdown = function () {

    };

    //- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    // Events
    //
    // nav-dropdown-event-dist-unit
    //
    //- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

    NavBarDropdown.prototype.on = function (eventName, callback) {
        $("#navbar-map-dropdown").on(eventName, callback);
    };
    NavBarDropdown.prototype.trigger = function (eventName, customData) {
        $("#navbar-map-dropdown").trigger(eventName, customData);
    };

    //- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

    NavBarDropdown.prototype.handleAction = function (event) {
        var eventDetail = Events.eventDetail(event);

        eventDetail.link.find(".glyphicon").toggleClass("glyphicon-check");
        eventDetail.link.find(".glyphicon").toggleClass("glyphicon-unchecked");

        if (eventDetail.actionName === "range") {
            this.handleRangeAction();
        }
        else if (eventDetail.actionName === "status") {
            this.handleStatusAction();
        }
        else if (eventDetail.actionName === "rendering") {
            this.handleRenderingAction();
        }
        else if (eventDetail.actionName === "use-kilometers") {
            var newUnit = eventDetail.link.find(".glyphicon").hasClass("glyphicon-check") ? 'K' : 'M';
            this.trigger("nav-dropdown-event-dist-unit", newUnit);
        }
    };

    NavBarDropdown.prototype.handleRangeAction = function () {
        $("#control-row-one").children().eq(0).toggle();
    };

    NavBarDropdown.prototype.handleStatusAction = function () {
        $("#control-row-one").children().eq(1).toggle();
    };

    NavBarDropdown.prototype.handleRenderingAction = function () {
        $("#control-row-rendering").toggle();
    };

    return NavBarDropdown;

});
