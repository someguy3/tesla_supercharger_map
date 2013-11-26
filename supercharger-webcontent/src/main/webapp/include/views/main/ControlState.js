redshiftsoft = createMyNamespace("redshiftsoft");


/**
 * Constructor
 */
redshiftsoft.ControlState = function () {

    var rangeMeters = redshiftsoft.Range.milesToMeters(140.0);

    this.range = new redshiftsoft.Range(rangeMeters);

    this.fillOpacity = 0.15;
    this.fillColor = "#86c4ec";

    this.borderOpacity = 0.3;
    this.borderColor = "#181fe7";
}