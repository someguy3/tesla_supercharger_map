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
    this.valueChanged = function (arg) {
    };
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
    this.valueChanged(newValue);
};

/**
 * Initialize map
 */
redshiftsoft.ControlView.prototype.updateTextMilesDisplay = function (newValue) {
    $("#range-number-text").text(newValue + " miles");
};


