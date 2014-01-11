var redshiftsoft = redshiftsoft || {};

/**
 *
 * @constructor
 */
redshiftsoft.NavBarMapAction = function () {

};


redshiftsoft.NavBarMapAction.prototype.handleAction = function (event) {
    var eventDetail = redshiftsoft.eventDetail(event);

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

redshiftsoft.NavBarMapAction.prototype.handleRangeAction = function () {
    $("#control-row-one").children().eq(0).toggle();
};

redshiftsoft.NavBarMapAction.prototype.handleStatusAction = function () {
    $("#control-row-one").children().eq(1).toggle();
};

redshiftsoft.NavBarMapAction.prototype.handleRenderingAction = function () {
    $("#control-row-rendering").toggle();
};