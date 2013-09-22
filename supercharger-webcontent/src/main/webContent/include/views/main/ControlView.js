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

    $("#slider").slider(
        {
            value: 275,
            min: redshiftsoft.ControlView.MILES_MIN,
            max: redshiftsoft.ControlView.MILES_MAX,
            step: 5,
            slide: jQuery.proxy(this.handleSlide, this)
        });

    var newValue = $("#slider").slider("value");
    $("#amount").val(newValue);
};

/**
 * Initialize map
 */
redshiftsoft.ControlView.prototype.handleSlide = function (event) {
    var newValue = $("#slider").slider("value");
    $("#amount").val(newValue);
    this.valueChanged(newValue);
};


