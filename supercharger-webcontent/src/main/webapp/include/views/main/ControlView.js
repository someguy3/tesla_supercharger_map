//======================================================================================================================
//
//
//
//======================================================================================================================


/**
 * Constructor.
 */
redshiftsoft.ControlView = function () {
    this.radiusMeters = 265;
    this.valueChanged = function (arg) {
    };
};

redshiftsoft.ControlView.MILES_MIN = 20;
redshiftsoft.ControlView.MILES_MAX = 300;


/**
 * Initialize map
 */
redshiftsoft.ControlView.prototype.init = function () {

    $("#range-slider").slider(
        {
            value: 275,
            min: redshiftsoft.ControlView.MILES_MIN,
            max: redshiftsoft.ControlView.MILES_MAX,
            step: 5,
            slide: jQuery.proxy(this.handleSlide, this)
        });

    var newValue = $("#range-slider").slider("value");
    $("#range-number-text").text(newValue);
};

/**
 * Initialize map
 */
redshiftsoft.ControlView.prototype.handleSlide = function (event) {
    var newValue = $("#range-slider").slider("value");
    $("#range-number-text").text(newValue);
    this.valueChanged(newValue);
};


