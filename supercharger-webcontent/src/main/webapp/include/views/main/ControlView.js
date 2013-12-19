//======================================================================================================================
//
//
//
//======================================================================================================================

var redshiftsoft = redshiftsoft || {};

/**
 * Constructor.
 */
redshiftsoft.ControlView = function (controlState) {

    this.controlState = controlState;

    this.viewDiv = $("#control-view-div");

    this.initializeControls();

    $("#controls-tabs").tabs({
        activate: jQuery.proxy(this.activateTab, this)
    });

    $("input[name='mapType']").change(jQuery.proxy(this.handleMapType, this));
    $("input[name='distUnit']").change(jQuery.proxy(this.handleDistanceUnit, this));

    $("#advanced-options-trigger").click(function (event) {
        event.preventDefault();
        var link = $(this);
        if (link.html().indexOf("hide") >= 0) {
            link.html("show advanced options");
        } else {
            link.html("hide advanced options");
        }
        $("#controls-tabs").toggle();
    });

};

//- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// Event methods that delegate to jquery object for triggering/observing custom events.
//
// range-change-event          [newRadiusMeters]
// map-type-change-event       [newMapType]
// fill-opacity-change-event   [newFillOpacity]
// fill-color-event-change     [newFillColor]
// border-opacity-change-event [newBorderOpacity]
// border-color-event-change   [newBorderColor]
//- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

redshiftsoft.ControlView.prototype.on = function (eventName, callback) {
    this.viewDiv.on(eventName, callback);
};
redshiftsoft.ControlView.prototype.trigger = function (eventName, arg1) {
    this.viewDiv.trigger(eventName, arg1);
};

//- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// Initialization
//- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

/**
 * Initialize controls
 */
redshiftsoft.ControlView.prototype.initializeControls = function () {


    $("#fill-opacity-slider").slider(
        {
            value: this.controlState.fillOpacity,
            min: 0.0,
            max: 1.0,
            step: 0.10,
            slide: jQuery.proxy(this.handleFillOpacitySlide, this)
        });

    $("#border-opacity-slider").slider(
        {
            value: this.controlState.borderOpacity,
            min: 0.0,
            max: 1.0,
            step: 0.10,
            slide: jQuery.proxy(this.handleBorderOpacitySlide, this)
        });

    $("#fill-color-input").spectrum({
        color: this.controlState.fillColor,
        change: jQuery.proxy(this.handleFillColorChange, this)
    });

    $("#border-color-input").spectrum({
        color: this.controlState.borderColor,
        change: jQuery.proxy(this.handleBorderColorChange, this)
    });

    var controlView = this;
    $("#status-completed-check").change(function (event) {
        controlView.controlState.showCompleted = $(this).is(':checked');
        controlView.trigger("station-status-change-event", controlView.controlState);
    });
    $("#status-construction-check").change(function (event) {
        controlView.controlState.showConstruction = $(this).is(':checked');
        controlView.trigger("station-status-change-event", controlView.controlState);
    });

    this.initializeRangeControl();
    this.updateTextFillOpacityDisplay();
    this.updateTextBorderOpacityDisplay();
};

/**
 * Initialize range control.
 */
redshiftsoft.ControlView.prototype.initializeRangeControl = function () {
    $("#range-slider").slider(
        {
            value: this.controlState.range.getCurrent(),
            min: this.controlState.range.getMin(),
            max: this.controlState.range.getMax(),
            step: 5,
            slide: jQuery.proxy(this.handleRangeSlide, this)
        });
    this.updateTextRangeDisplay();
};

//- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// Handlers for various UI component changes
//- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

/**
 * Handle fill color change.
 */
redshiftsoft.ControlView.prototype.handleFillColorChange = function (newColor) {
    this.controlState.fillColor = "" + newColor;
    this.trigger("fill-color-change-event", this.controlState);
};

/**
 * Handle border color change.
 */
redshiftsoft.ControlView.prototype.handleBorderColorChange = function (newColor) {
    this.controlState.borderColor = "" + newColor;
    this.trigger("border-color-change-event", this.controlState);
};

/**
 * Handle range slider change.
 */
redshiftsoft.ControlView.prototype.handleRangeSlide = function (event) {
    var newValueMiles = $("#range-slider").slider("value");
    this.controlState.range.setCurrent(newValueMiles);
    this.updateTextRangeDisplay();
    this.trigger("range-change-event", this.controlState);
};

/**
 * Handle fill-opacity slider change.
 */
redshiftsoft.ControlView.prototype.handleFillOpacitySlide = function (event) {
    var newFillOpacity = $("#fill-opacity-slider").slider("value");
    this.controlState.fillOpacity = newFillOpacity;
    this.updateTextFillOpacityDisplay();
    this.trigger("fill-opacity-changed-event", this.controlState);
};

/**
 * Handle border-opacity slider change.
 */
redshiftsoft.ControlView.prototype.handleBorderOpacitySlide = function (event) {
    var newBorderOpacity = $("#border-opacity-slider").slider("value");
    this.controlState.borderOpacity = newBorderOpacity;
    this.updateTextBorderOpacityDisplay();
    this.trigger("border-opacity-changed-event", this.controlState);
};

/**
 * Handle changes to map type.
 */
redshiftsoft.ControlView.prototype.handleMapType = function () {
    var newMapType = $("input[name='mapType']:checked").val();
    this.trigger("map-type-change-event", newMapType);
};

/**
 * Handle changes to distance unit.
 */
redshiftsoft.ControlView.prototype.handleDistanceUnit = function () {
    var newUnit = $("input[name='distUnit']:checked").val();
    if (newUnit === "M") {
        this.controlState.range.setUnit(redshiftsoft.Range.Unit.miles);
    } else if (newUnit === "K") {
        this.controlState.range.setUnit(redshiftsoft.Range.Unit.kilometers);
    }
    this.initializeRangeControl();
};

redshiftsoft.ControlView.prototype.activateTab = function (event, ui) {
    var newTabName = ui.newTab.find('a').attr('href');
    if (newTabName === '#tab-about' && !ui.newTab.data('about-tab-initialized')) {
        jQuery.getJSON("version.json", function (data) {
            $(newTabName).append("" +
                "<br/>" +
                "<b>Last Updated: </b>" + data.buildTimestamp + "<br/>" +
                "<br/>" +
                "Send updates/corrections to <b>map" + "@tes" + "lawiki.net</b>" +
                "<br/>"
            );
            ui.newTab.data('about-tab-initialized', true);
        });
    }
};

//- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// Display update methods.
//- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

/**
 * Update the range text display value.
 */
redshiftsoft.ControlView.prototype.updateTextRangeDisplay = function () {
    $("#range-number-text").text(this.controlState.range.getCurrent() + " " + this.controlState.range.getUnitName());
};

/**
 * Update the fill-opacity text display value.
 */
redshiftsoft.ControlView.prototype.updateTextFillOpacityDisplay = function () {
    $("#fill-opacity-number-text").text(this.controlState.fillOpacity);
};

/**
 * Update the border-opacity text display value.
 */
redshiftsoft.ControlView.prototype.updateTextBorderOpacityDisplay = function () {
    $("#border-opacity-number-text").text(this.controlState.borderOpacity);
};