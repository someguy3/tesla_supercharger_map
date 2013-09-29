redshiftsoft = createMyNamespace("redshiftsoft");

/**
 * Constructor.
 */
redshiftsoft.Range = function (rangeMetersIn) {
    this.rangeMeters = rangeMetersIn;
};


redshiftsoft.Range.MILES_MIN = 20;
redshiftsoft.Range.MILES_MAX = 300;
redshiftsoft.Range.METERS_PER_MILE = 1609.34;


redshiftsoft.Range.prototype.getCurrent = function () {
    return redshiftsoft.Range.metersToMiles(this.rangeMeters);
};
redshiftsoft.Range.prototype.setCurrent = function (rangeMiles) {
    this.rangeMeters = redshiftsoft.Range.milesToMeters(rangeMiles);
};

redshiftsoft.Range.prototype.getMin = function () {
    return redshiftsoft.Range.MILES_MIN;
};
redshiftsoft.Range.prototype.getMax = function () {
    return redshiftsoft.Range.MILES_MAX;
};
redshiftsoft.Range.prototype.getRangeMeters = function () {
    return this.rangeMeters;
};



// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// static methods
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

/**
 * CONVERT: miles to meters
 */
redshiftsoft.Range.milesToMeters = function (miles) {
    return Math.round(redshiftsoft.Range.METERS_PER_MILE * miles);
};
/**
 * CONVERT: meters to miles
 */
redshiftsoft.Range.metersToMiles = function (meters) {
    return Math.round(meters / redshiftsoft.Range.METERS_PER_MILE);
};