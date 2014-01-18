define(['page/charts/TotalOpenChart'], function (TotalOpenChart) {

    /**
     *
     * @constructor
     */
    var ChartsPage = function () {

    };

    ChartsPage.prototype.loadPage = function () {
        new TotalOpenChart().draw();
    };

    return ChartsPage;


});