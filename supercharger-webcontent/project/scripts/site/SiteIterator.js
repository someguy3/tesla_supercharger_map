define(['util/Objects', 'siteload/SiteTransform', 'site/SitePredicates', 'site/SiteSorting'], function (Objects, SiteList, SitePredicates, SiteSorting) {

    /**
     *
     * @constructor
     */
    var SiteIterator = function () {
        this.predicates = [];
        this.sortFunction = null;
    };

    SiteIterator.FUN_SORT_BY_OPEN_DATE = SiteSorting.sortByOpenedDate;

    SiteIterator.PRED_IS_OPEN = SitePredicates.open;
    SiteIterator.PRED_IS_USA = SitePredicates.isUSA;
    SiteIterator.PRED_IS_COUNTED = SitePredicates.counted;
    SiteIterator.PRED_NOT_USER_ADDED = SitePredicates.notUserAdded;
    SiteIterator.PRED_HAS_CIRCLE = SitePredicates.hasCircle;


    SiteIterator.prototype.withPredicate = function (predicateFunction) {
        this.predicates.push(predicateFunction);
        return this;
    };

    SiteIterator.prototype.withSort = function (sortFunction) {
        this.sortFunction = sortFunction;
        return this;
    };


    SiteIterator.prototype.iterate = function (applyFunction) {
        var LENGTH = SiteList.length,
            i = 0;

        if (this.sortFunction !== null) {
            SiteList.sort(this.sortFunction);
        }

        for (; i < LENGTH; i++) {
            var site = SiteList[i];
            if (this.predicates.length === 0 || this.predicatesApply(site)) {
                applyFunction(site);
            }
        }
    };

    SiteIterator.prototype.predicatesApply = function (site) {
        var i = 0;
        for (; i < this.predicates.length; i++) {
            if (!this.predicates[i](site)) {
                return false;
            }
        }
        return true;
    };


    return SiteIterator;

});