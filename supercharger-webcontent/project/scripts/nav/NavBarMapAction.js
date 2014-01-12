define(['jquery'], function ($) {

    /**
     *
     * @constructor
     */
    var NavBarMapAction = function () {

    };


    NavBarMapAction.prototype.handleAction = function (event) {
        var eventDetail = eventDetail(event);

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
    };

    NavBarMapAction.prototype.handleRangeAction = function () {
        $("#control-row-one").children().eq(0).toggle();
    };

    NavBarMapAction.prototype.handleStatusAction = function () {
        $("#control-row-one").children().eq(1).toggle();
    };

    NavBarMapAction.prototype.handleRenderingAction = function () {
        $("#control-row-rendering").toggle();
    };

    return NavBarMapAction;

});
