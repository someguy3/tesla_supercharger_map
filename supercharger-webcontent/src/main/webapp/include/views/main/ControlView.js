//======================================================================================================================
//
//
//
//======================================================================================================================


/**
 * Constructor.
 */
redshiftsoft.ControlView = function (initialRangeMiles, initialFillOpacity) {
    this.initializeControls(initialRangeMiles, initialFillOpacity);
    this.rangeChangedCallback = function (arg) {
    };
    this.fillOpacityChangedCallback = function (arg) {
    };
    this.mapTypeChangedCallback = function (arg) {
    };
    this.fillColorChangeCallback = function(color) {
    };
    $("input[name='mapType']").change(jQuery.proxy(this.handleMapType, this));
};

redshiftsoft.ControlView.MILES_MIN = 20;
redshiftsoft.ControlView.MILES_MAX = 300;


/**
 * Initialize map
 */
redshiftsoft.ControlView.prototype.initializeControls = function (rangeMiles, fillOpacity) {

    $("#range-slider").slider(
        {
            value: rangeMiles,
            min: redshiftsoft.ControlView.MILES_MIN,
            max: redshiftsoft.ControlView.MILES_MAX,
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

    $("#fill-color-input").spectrum({
        color: "#f00",
        change: jQuery.proxy(this.handleFillColorChange, this)
    });

    this.updateTextMilesDisplay(rangeMiles);
    this.updateTextFillOpacityDisplay(fillOpacity);
};


/**
 * Handle fill color change.
 */
redshiftsoft.ControlView.prototype.handleFillColorChange = function (newColor) {
    this.fillColorChangeCallback("" + newColor);
};

/**
 * Handle range slider change.
 */
redshiftsoft.ControlView.prototype.handleRangeSlide = function (event) {
    var newValue = $("#range-slider").slider("value");
    this.updateTextMilesDisplay(newValue);
    this.rangeChangedCallback(newValue);
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
 * Handle changes to map type.
 */
redshiftsoft.ControlView.prototype.handleMapType = function () {
    var newMapType = $("input[name='mapType']:checked").val();
    this.mapTypeChangedCallback(newMapType);
};

/**
 * Update the range text display value.
 */
redshiftsoft.ControlView.prototype.updateTextMilesDisplay = function (newValue) {
    $("#range-number-text").text(newValue + " miles");
};

/**
 * Update the fill-opacity text display value.
 */
redshiftsoft.ControlView.prototype.updateTextFillOpacityDisplay = function (newValue) {
    $("#fill-opacity-number-text").text(newValue);
};


