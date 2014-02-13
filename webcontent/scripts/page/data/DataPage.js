define(['page/data/DataViewTable'], function (DataViewTable) {
    /**
     *
     * @constructor
     */
    var DataPage = function () {
        this.page = $("#page-data");
    };

    DataPage.INIT_PROP = 'page-initialized';

    DataPage.prototype.onPageShow = function () {
        if (!this.page.data(DataPage.INIT_PROP)) {
            new DataViewTable().createTable();
            this.page.data(DataPage.INIT_PROP, true);
        }
    };


    return DataPage;
});