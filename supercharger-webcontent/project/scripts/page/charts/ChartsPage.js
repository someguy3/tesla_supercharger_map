define(['page/charts/TotalOpenChart'], function (TotalOpenChart) {

    /**
     *
     * @constructor
     */
    var ChartsPage = function () {

    };

    ChartsPage.prototype.onPageShow = function () {
        new TotalOpenChart().draw();
    };

    return ChartsPage;


});