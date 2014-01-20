define(['util/Objects'], function (Objects) {


    var SitePredicates = {};

    SitePredicates.open = function (site) {
        return !Objects.isNullOrUndefined(site.dateOpened);
    };

    SitePredicates.counted = function (site) {
        return site.count;
    };

    SitePredicates.openAndCounted = function (site) {
        return SitePredicates.open(site) && SitePredicates.counted(site);
    };


    return SitePredicates;

});