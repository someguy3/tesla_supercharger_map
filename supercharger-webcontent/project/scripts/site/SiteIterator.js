define(['util/Objects'], function (Objects) {

    /**
     *
     * @constructor
     */
    var SiteIterator = function (siteArray) {
        this.predicates = [];
        this.sortFunction = null;
        this.array = siteArray;
    };

    SiteIterator.prototype.withPredicate = function (predicateFunction) {
        this.predicates.push(predicateFunction);
        return this;
    };

    SiteIterator.prototype.withSort = function (sortFunction) {
        this.sortFunction = sortFunction;
        return this;
    };


    SiteIterator.prototype.iterate = function (applyFunction) {
        var LENGTH = this.array.length,
            i = 0;

        if (this.sortFunction !== null) {
            this.array.sort(this.sortFunction);
        }

        for (; i < LENGTH; i++) {
            var site = this.array[i];
            if (this.predicates.length === 0 || this.predicatesApply(site)) {
                applyFunction(site);
            }
        }
    };

    SiteIterator.prototype.predicatesApply = function (site) {
        var i = 0,
            predicate = null,
            result = true;
        for (i = 0; i < this.predicates.length; i++) {
            if (!this.predicates[i](site)) {
                return false;
            }
        }
        return true;
    };


    return SiteIterator;

});