//======================================================================================================================
//
//
//
//======================================================================================================================

redshiftsoft = createMyNamespace("redshiftsoft");

/**
 * Constructor.
 */
redshiftsoft.ControlView = function (initialRangeMeters, initialFillOpacity, initialFillColor, initialBorderOpacity, initialBorderColor) {

    this.range = new redshiftsoft.Range(initialRangeMeters);

    this.initializeControls(initialFillOpacity, initialFillColor, initialBorderOpacity, initialBorderColor);

    this.rangeChangedCallback = function (newRadiusMeters) {
    };
    this.mapTypeChangedCallback = function (arg) {
    };

    this.fillOpacityChangedCallback = function (arg) {
    };
    this.fillColorChangeCallback = function (color) {
    };

    this.borderOpacityChangedCallback = function (arg) {
    };
    this.borderColorChangeCallback = function (color) {
    };

    $("input[name='mapType']").change(jQuery.proxy(this.handleMapType, this));
    $("input[name='distUnit']").change(jQuery.proxy(this.handleDistanceUnit, this));

    $("#advanced-options-trigger").click(function (event) {
        event.preventDefault();
        $("tr.advanced").toggle();
    });

};

/**
 * Initialize controls
 */
redshiftsoft.ControlView.prototype.initializeControls = function (fillOpacity, fillColor, borderOpacity, borderColor) {


    $("#fill-opacity-slider").slider(
        {
            value: fillOpacity,
            min: 0.0,
            max: 1.0,
            step: .10,
            slide: jQuery.proxy(this.handleFillOpacitySlide, this)
        });

    $("#border-opacity-slider").slider(
        {
            value: borderOpacity,
            min: 0.0,
            max: 1.0,
            step: .10,
            slide: jQuery.proxy(this.handleBorderOpacitySlide, this)
        });

    $("#fill-color-input").spectrum({
        color: fillColor,
        change: jQuery.proxy(this.handleFillColorChange, this)
    });

    $("#border-color-input").spectrum({
        color: borderColor,
        change: jQuery.proxy(this.handleBorderColorChange, this)
    });

    this.initializeRangeControl();
    this.updateTextFillOpacityDisplay(fillOpacity);
    this.updateTextBorderOpacityDisplay(borderOpacity);
};

/**
 * Initialize range control.
 */
redshiftsoft.ControlView.prototype.initializeRangeControl = function () {
    $("#range-slider").slider(
        {
            value: this.range.getCurrent(),
            min: this.range.getMin(),
            max: this.range.getMax(),
            step: 5,
            slide: jQuery.proxy(this.handleRangeSlide, this)
        });
    this.updateTextRangeDisplay();
};


/**
 * Handle fill color change.
 */
redshiftsoft.ControlView.prototype.handleFillColorChange = function (newColor) {
    this.fillColorChangeCallback("" + newColor);
};

/**
 * Handle border color change.
 */
redshiftsoft.ControlView.prototype.handleBorderColorChange = function (newColor) {
    this.borderColorChangeCallback("" + newColor);
};

/**
 * Handle range slider change.
 */
redshiftsoft.ControlView.prototype.handleRangeSlide = function (event) {
    var newValueMiles = $("#range-slider").slider("value");
    this.range.setCurrent(newValueMiles);
    this.updateTextRangeDisplay();
    this.rangeChangedCallback(this.range.getRangeMeters());
};

/**
 * Handle fill-opacity slider change.
 */
redshiftsoft.ControlView.prototype.handleFillOpacitySlide = function (event) {
    var newValue = $("#fill-opacity-slider").slider("value");
    this.updateTextFillOpacityDisplay(newValue);
    this.fillOpacityChangedCallback(newValue);
};

/**
 * Handle fill-opacity slider change.
 */
redshiftsoft.ControlView.prototype.handleBorderOpacitySlide = function (event) {
    var newValue = $("#border-opacity-slider").slider("value");
    this.updateTextBorderOpacityDisplay(newValue);
    this.borderOpacityChangedCallback(newValue);
};

/**
 * Handle changes to map type.
 */
redshiftsoft.ControlView.prototype.handleMapType = function () {
    var newMapType = $("input[name='mapType']:checked").val();
    this.mapTypeChangedCallback(newMapType);
};

/**
 * Handle changes to distance unit.
 */
redshiftsoft.ControlView.prototype.handleDistanceUnit = function () {
    var newUnit = $("input[name='distUnit']:checked").val();
    if (newUnit == "M") {
        this.range.setUnit(redshiftsoft.Range.Unit.miles);
    } else if (newUnit == "K") {
        this.range.setUnit(redshiftsoft.Range.Unit.kilometers);
    }
    this.initializeRangeControl();
};

/**
 * Update the range text display value.
 */
redshiftsoft.ControlView.prototype.updateTextRangeDisplay = function () {
    $("#range-number-text").text(this.range.getCurrent() + " " + this.range.getUnitName());
};

/**
 * Update the fill-opacity text display value.
 */
redshiftsoft.ControlView.prototype.updateTextFillOpacityDisplay = function (newValue) {
    $("#fill-opacity-number-text").text(newValue);
};

/**
 * Update the border-opacity text display value.
 */
redshiftsoft.ControlView.prototype.updateTextBorderOpacityDisplay = function (newValue) {
    $("#border-opacity-number-text").text(newValue);
};

