define(['page/map/Range'], function (Range) {

    /**
     *
     * @constructor
     */
    var ControlState = function () {

        var rangeMeters = Range.milesToMeters(0.0);

        this.range = new Range(rangeMeters);

        this.fillOpacity = 0.15;
        this.fillColor = "#86c4ec";

        this.borderOpacity = 0.3;
        this.borderColor = "#181fe7";

        this.showCompleted = true;
        this.showConstruction = true;
    };

    return ControlState;

});