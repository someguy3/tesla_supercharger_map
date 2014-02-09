define(['page/charts/TotalOpenChart', 'page/charts/CountryBarChart'], function (TotalOpenChart, CountryBarChart) {

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
            new CountryBarChart().draw();
            this.page.data(ChartsPage.INIT_PROP, true);
        }
    };

    return ChartsPage;


});