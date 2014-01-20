define(['site/SiteList', 'site/SiteSorting', 'site/SitePredicates'], function (SiteList, SiteSorting, SitePredicates) {

    /**
     *
     * @constructor
     */
    var Sites = {};

    Sites.LIST = SiteList;

    //initializeIds();


    Sites.FUN_SORT_BY_OPEN_DATE = SiteSorting.sortByOpenedDate;
    Sites.FUN_PRED_OPEN_AND_COUNTED = SitePredicates.openAndCounted;

    Sites.iterate = function (applyFunction, predicateFunction, orderFunction) {
        var LENGTH = Sites.LIST.length;
        var i = 0;

        if (orderFunction !== null) {
            Sites.LIST.sort(orderFunction);
        }

        for (i = 0; i < LENGTH; i++) {
            var site = Sites.LIST[i];
            if (predicateFunction === null || predicateFunction(site)) {
                applyFunction(site);
            }
        }
    };


    function initializeIds() {
        var count = 0;
        var SIZE = this.sites.length;
        for (var i = 0; i < SIZE; i++) {
            var supercharger = this.sites[i];
            supercharger.id = count++;
        }
    }

    return Sites;

});