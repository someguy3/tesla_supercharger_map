define(['jquery'], function (jQuery) {


    /**
     * Constructor.
     */
    var ControlView = function (controlState) {

        this.controlState = controlState;

        this.viewDiv = $("#rendering-controls-table");

        this.initializeControls();

        $("input[name='distUnit']").change(jQuery.proxy(this.handleDistanceUnit, this));

    };

//- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// Event methods that delegate to jquery object for triggering/observing custom events.
//
// range-change-event          [newRadiusMeters]
// fill-opacity-change-event   [newFillOpacity]
// fill-color-event-change     [newFillColor]
// border-opacity-change-event [newBorderOpacity]
// border-color-event-change   [newBorderColor]
//- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

    ControlView.prototype.on = function (eventName, callback) {
        this.viewDiv.on(eventName, callback);
    };
    ControlView.prototype.trigger = function (eventName, customData) {
        this.viewDiv.trigger(eventName, customData);
    };

//- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// Initialization
//- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

    /**
     * Initialize controls
     */
    ControlView.prototype.initializeControls = function () {


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
    ControlView.prototype.initializeRangeControl = function () {
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
    ControlView.prototype.handleFillColorChange = function (newColor) {
        this.controlState.fillColor = "" + newColor;
        this.trigger("fill-color-change-event", this.controlState);
    };

    /**
     * Handle border color change.
     */
    ControlView.prototype.handleBorderColorChange = function (newColor) {
        this.controlState.borderColor = "" + newColor;
        this.trigger("border-color-change-event", this.controlState);
    };

    /**
     * Handle range slider change.
     */
    ControlView.prototype.handleRangeSlide = function (event) {
        var newValueMiles = $("#range-slider").slider("value");
        this.controlState.range.setCurrent(newValueMiles);
        this.updateTextRangeDisplay();
        this.trigger("range-change-event", this.controlState);
    };

    /**
     * Handle fill-opacity slider change.
     */
    ControlView.prototype.handleFillOpacitySlide = function (event) {
        var newFillOpacity = $("#fill-opacity-slider").slider("value");
        this.controlState.fillOpacity = newFillOpacity;
        this.updateTextFillOpacityDisplay();
        this.trigger("fill-opacity-changed-event", this.controlState);
    };

    /**
     * Handle border-opacity slider change.
     */
    ControlView.prototype.handleBorderOpacitySlide = function (event) {
        var newBorderOpacity = $("#border-opacity-slider").slider("value");
        this.controlState.borderOpacity = newBorderOpacity;
        this.updateTextBorderOpacityDisplay();
        this.trigger("border-opacity-changed-event", this.controlState);
    };

    /**
     * Handle changes to distance unit.
     */
    ControlView.prototype.handleDistanceUnit = function () {
        var newUnit = $("input[name='distUnit']:checked").val();
        if (newUnit === "M") {
            this.controlState.range.setUnit(redshiftsoft.Range.Unit.miles);
        } else if (newUnit === "K") {
            this.controlState.range.setUnit(redshiftsoft.Range.Unit.kilometers);
        }
        this.initializeRangeControl();
    };

//- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// Display update methods.
//- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

    /**
     * Update the range text display value.
     */
    ControlView.prototype.updateTextRangeDisplay = function () {
        $("#range-number-text").text(this.controlState.range.getCurrent() + " " + this.controlState.range.getUnitName());
    };

    /**
     * Update the fill-opacity text display value.
     */
    ControlView.prototype.updateTextFillOpacityDisplay = function () {
        $("#fill-opacity-number-text").text(this.controlState.fillOpacity);
    };

    /**
     * Update the border-opacity text display value.
     */
    ControlView.prototype.updateTextBorderOpacityDisplay = function () {
        $("#border-opacity-number-text").text(this.controlState.borderOpacity);
    };

    return ControlView;

});
