define(['util/Objects'], function (Objects) {


    var SitePredicates = {};

    SitePredicates.open = function (site) {
        return Objects.isNotNullOrUndef(site.dateOpened);
    };

    SitePredicates.counted = function (site) {
        return site.count;
    };

    SitePredicates.notUserAdded = function (site) {
        return !site.isUserAdded();
    };

    SitePredicates.openAndCounted = function (site) {
        return SitePredicates.open(site) && SitePredicates.counted(site);
    };

    SitePredicates.hasCircle = function (site) {
        return Objects.isNotNullOrUndef(site.circle);
    };

    SitePredicates.isUSA = function (site) {
        return site.address.isUSA();
    };

    return SitePredicates;

});