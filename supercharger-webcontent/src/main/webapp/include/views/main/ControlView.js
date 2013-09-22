//======================================================================================================================
//
//
//
//======================================================================================================================


/**
 * Constructor.
 */
redshiftsoft.ControlView = function (initialRangeMiles) {
    this.initializeMap(initialRangeMiles);
    this.rangeChangedCallback = function (arg) {
    };
    this.mapTypeChangedCallback = function (arg) {
    };
    $("input[name='mapType']").change(jQuery.proxy(this.handleMapType, this));
};

redshiftsoft.ControlView.MILES_MIN = 20;
redshiftsoft.ControlView.MILES_MAX = 300;


/**
 * Initialize map
 */
redshiftsoft.ControlView.prototype.initializeMap = function (rangeMiles) {

    $("#range-slider").slider(
        {
            value: rangeMiles,
            min: redshiftsoft.ControlView.MILES_MIN,
            max: redshiftsoft.ControlView.MILES_MAX,
            step: 5,
            slide: jQuery.proxy(this.handleSlide, this)
        });

    this.updateTextMilesDisplay(rangeMiles);
};

/**
 * Initialize map
 */
redshiftsoft.ControlView.prototype.handleSlide = function (event) {
    var newValue = $("#range-slider").slider("value");
    this.updateTextMilesDisplay(newValue);
    this.rangeChangedCallback(newValue);
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


