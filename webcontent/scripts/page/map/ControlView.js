define(['page/map/Range', 'lib/spectrum'], function (Range) {


    /**
     * Constructor.
     */
    var ControlView = function (controlState) {

        this.controlState = controlState;

        this.viewDiv = $("#rendering-controls-table");

        this.initializeControls();
    };

//- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// Event methods that delegate to jquery object for triggering/observing custom events.
//
// range-change-event          [newRadiusMeters]
// fill-opacity-change-event   [newFillOpacity]
// fill-color-event-change     [newFillColor]
// border-opacity-change-event [newBorderOpacity]
// border-color-event-change   [newBorderColor]
// control-event-zoom-location [newLocation]
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
        this.initZoomToLocationInput();
        this.initRangeControl();
        this.initStatusCheckboxes();
        this.initRangeUnitControls();
        this.initColorSliders();
        this.initColorInputs();

        this.updateTextFillOpacityDisplay();
        this.updateTextBorderOpacityDisplay();
    };

    ControlView.prototype.initRangeUnitControls = function () {
        var control = this;
        $("#range-unit-mi-label").click(function () {
            control.handleDistanceUnit("mi");
        });
        $("#range-unit-km-label").click(function () {
            control.handleDistanceUnit("km");
        });
    };

    ControlView.prototype.initColorSliders = function () {
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
    };

    ControlView.prototype.initColorInputs = function () {
        $("#fill-color-input").spectrum({
            color: this.controlState.fillColor,
            change: jQuery.proxy(this.handleFillColorChange, this)
        });

        $("#border-color-input").spectrum({
            color: this.controlState.borderColor,
            change: jQuery.proxy(this.handleBorderColorChange, this)
        });
    };

    ControlView.prototype.initZoomToLocationInput = function () {
        var controlView = this;
        $("#zoom-to-location-button").click(jQuery.proxy(this.handleZoomToLocation, this));
        $("#zoom-to-location-input").on('keypress', function (event) {
            if (event.keyCode === 13) {
                event.preventDefault();
                controlView.handleZoomToLocation(event);
            }
        });
    };

    ControlView.prototype.initStatusCheckboxes = function () {

        function toggleCheckbox(enclosingDiv, newCheckState) {
            var imageSpan = enclosingDiv.find(".glyphicon");
            imageSpan.toggleClass("glyphicon-unchecked", !newCheckState);
            imageSpan.toggleClass("glyphicon-check", newCheckState);
        }

        var controlView = this;
        $("#status-completed-check").click(function (event) {
            controlView.controlState.showOpen = !controlView.controlState.showOpen;
            toggleCheckbox($(this), controlView.controlState.showOpen);
            controlView.trigger("station-status-change-event", controlView.controlState);
        });
        $("#status-construction-check").click(function (event) {
            controlView.controlState.showConstruction = !controlView.controlState.showConstruction;
            toggleCheckbox($(this), controlView.controlState.showConstruction);
            controlView.trigger("station-status-change-event", controlView.controlState);
        });
        $("#status-permit-check").click(function (event) {
            controlView.controlState.showPermit = !controlView.controlState.showPermit;
            toggleCheckbox($(this), controlView.controlState.showPermit);
            controlView.trigger("station-status-change-event", controlView.controlState);
        });
    };

    /**
     * Initialize range control.
     */
    ControlView.prototype.initRangeControl = function () {
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
        var newValue = $("#range-slider").slider("value");
        this.controlState.range.setCurrent(newValue);
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
    ControlView.prototype.handleDistanceUnit = function (newUnit) {
        if (newUnit === "mi") {
            this.controlState.range.setUnit(Range.Unit.miles);
        } else if (newUnit === "km") {
            this.controlState.range.setUnit(Range.Unit.kilometers);
        }
        this.initRangeControl();
    };

    /**
     * Handle zoom to location.
     */
    ControlView.prototype.handleZoomToLocation = function (event) {
        event.preventDefault();
        var locationText = $("#zoom-to-location-input").val();
        this.trigger("control-event-zoom-location", locationText);
    };


//- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// Display update methods.
//- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

    /**
     * Update the range text display value.
     */
    ControlView.prototype.updateTextRangeDisplay = function () {
        $("#range-number-text").text(this.controlState.range.getCurrent());
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

    /**
     * Update the range slider value (new value interpreted in whatever current units are).
     */
    ControlView.prototype.updateRangeSliderValue = function (newValue) {
        this.controlState.range.setCurrent(newValue);
        this.updateTextRangeDisplay();
        $("#range-slider").slider("value", newValue);
    };

    return ControlView;

});
