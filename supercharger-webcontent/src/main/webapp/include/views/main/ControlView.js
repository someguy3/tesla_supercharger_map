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

    $("#advanced-options-trigger").click(function (event) {
        event.preventDefault();
        $("tr.advanced").toggle();
    });

};

/**
 * Initialize map
 */
redshiftsoft.ControlView.prototype.initializeControls = function (fillOpacity, fillColor, borderOpacity, borderColor) {

    $("#range-slider").slider(
        {
            value: this.range.getCurrent(),
            min: this.range.getMin(),
            max: this.range.getMax(),
            step: 5,
            slide: jQuery.proxy(this.handleRangeSlide, this)
        });

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


    this.updateTextRangeDisplay();
    this.updateTextFillOpacityDisplay(fillOpacity);
    this.updateTextBorderOpacityDisplay(borderOpacity);
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
 * Update the range text display value.
 */
redshiftsoft.ControlView.prototype.updateTextRangeDisplay = function () {
    $("#range-number-text").text(this.range.getCurrent() + " miles");
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

