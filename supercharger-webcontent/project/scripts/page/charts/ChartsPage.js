define(['page/charts/TotalOpenChart'], function (TotalOpenChart) {

    /**
     *
     * @constructor
     */
    var ChartsPage = function () {
        this.page = $("#page-charts");
    };

    ChartsPage.INIT_PROP = "page-initialized";

    ChartsPage.prototype.onPageShow = function () {
        if (!this.page.data(ChartsPage.INIT_PROP)) {
            new TotalOpenChart().draw();
            this.page.data(ChartsPage.INIT_PROP, true);
        }
    };

    return ChartsPage;


});