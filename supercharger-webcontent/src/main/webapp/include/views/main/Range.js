var redshiftsoft = createMyNamespace("redshiftsoft");

/**
 * Constructor.
 */
redshiftsoft.Range = function (rangeMetersIn) {
    this.rangeMeters = rangeMetersIn;
    this.unit = redshiftsoft.Range.Unit.miles;
};


redshiftsoft.Range.MILES_MIN = 0;
redshiftsoft.Range.MILES_MAX = 305;
redshiftsoft.Range.METERS_PER_MILE = 1609.34;
redshiftsoft.Range.METERS_PER_KM = 1000.0;

redshiftsoft.Range.Unit = { "miles": 1, "kilometers": 2};


// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
//
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

redshiftsoft.Range.prototype.getCurrent = function () {
    if (this.unit === redshiftsoft.Range.Unit.miles) {
        return redshiftsoft.Range.metersToMiles(this.rangeMeters);
    } else {
        return redshiftsoft.Range.metersToKilometers(this.rangeMeters);
    }
};
redshiftsoft.Range.prototype.setCurrent = function (newRange) {
    if (this.unit === redshiftsoft.Range.Unit.miles) {
        this.rangeMeters = redshiftsoft.Range.milesToMeters(newRange);
    } else {
        this.rangeMeters = redshiftsoft.Range.kilometersToMeters(newRange);
    }
};

redshiftsoft.Range.prototype.getMin = function () {
    if (this.unit === redshiftsoft.Range.Unit.miles) {
        return redshiftsoft.Range.MILES_MIN;
    } else {
        return redshiftsoft.Range.milesToKilometers(redshiftsoft.Range.MILES_MIN);
    }
};

redshiftsoft.Range.prototype.getMax = function () {
    if (this.unit === redshiftsoft.Range.Unit.miles) {
        return redshiftsoft.Range.MILES_MAX;
    } else {
        return redshiftsoft.Range.milesToKilometers(redshiftsoft.Range.MILES_MAX);
    }
};

redshiftsoft.Range.prototype.getUnitName = function () {
    if (this.unit === redshiftsoft.Range.Unit.miles) {
        return "miles";
    } else {
        return "kilometers";
    }
};


// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// getters/setters
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

redshiftsoft.Range.prototype.getRangeMeters = function () {
    return this.rangeMeters;
};

redshiftsoft.Range.prototype.setUnit = function (newUnit) {
    if (newUnit !== redshiftsoft.Range.Unit.miles && newUnit !== redshiftsoft.Range.Unit.kilometers) {
        throw new Error("invalid unit=" + newUnit);
    }
    this.unit = newUnit;
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
 * CONVERT: miles to kilometers
 */
redshiftsoft.Range.milesToKilometers = function (miles) {
    return Math.round(redshiftsoft.Range.METERS_PER_MILE * miles / redshiftsoft.Range.METERS_PER_KM);
};
/**
 * CONVERT: meters to miles
 */
redshiftsoft.Range.metersToMiles = function (meters) {
    return Math.round(meters / redshiftsoft.Range.METERS_PER_MILE);
};

/**
 * CONVERT: meters to kilometers
 */
redshiftsoft.Range.metersToKilometers = function (meters) {
    return Math.round(meters / redshiftsoft.Range.METERS_PER_KM);
};

/**
 * CONVERT: kilometers to meters
 */
redshiftsoft.Range.kilometersToMeters = function (kilometers) {
    return Math.round(kilometers * redshiftsoft.Range.METERS_PER_KM);
};