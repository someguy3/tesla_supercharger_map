define(['page/map/Range', 'page/map/RangeInput', 'lib/spectrum'], function (Range, RangeInput) {


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
// fill-color-event-change     [newFillColor]
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
        this.fillOpacitySlider = new RangeInput("#fill-opacity-slider", "#fill-opacity-number-text", 0.0, 1.0, 0.1, this.controlState.fillOpacity);
        this.borderOpacitySlider = new RangeInput("#border-opacity-slider", "#border-opacity-number-text", 0.0, 1.0, 0.1, this.controlState.borderOpacity);
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
        this.rangeSlider = new RangeInput("#range-slider", "#range-number-text",
            this.controlState.range.getMin(),
            this.controlState.range.getMax(),
            5,
            this.controlState.range.getCurrent());
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
// getters
//- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

    ControlView.prototype.getRangeSlider = function () {
        return this.rangeSlider;
    };
    ControlView.prototype.getBorderOpacitySlider = function () {
        return this.borderOpacitySlider;
    };
    ControlView.prototype.getFillOpacitySlider = function () {
        return this.fillOpacitySlider;
    };

    return ControlView;

});

