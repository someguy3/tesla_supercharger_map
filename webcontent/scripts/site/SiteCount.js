define(['site/SiteIterator'], function (SiteIterator) {

    /**
     *
     * @constructor
     */
    var SiteCount = function () {
    };

    /**
     * Site count.
     *
     * RETURNED ARRAY:
     *
     *  [
     *   { countryName: 'USA',    open: 3, construction: 7, permit: 2  },
     *   { countryName: 'Germany',open: 3, construction: 4, permit: 1   }
     *  ]
     *
     * REFERENCE MAP:
     *
     * { us : arrayRef,
     *   de: arrayRef
     * }
     */
    SiteCount.getCountList = function () {
        var i = 0,
            countryRefMap = {},
            countryArray = [],
            totalOpen = 0,
            totalConstruction = 0,
            totalPermit = 0;

        new SiteIterator()
            .withPredicate(SiteIterator.PRED_NOT_USER_ADDED)
            .withPredicate(SiteIterator.PRED_IS_COUNTED)
            .iterate(function (supercharger) {
                var countryName = supercharger.address.country;
                if (!countryRefMap[countryName]) {
                    var newEntry = { countryName: countryName, open: 0, construction: 0, permit: 0 };
                    countryRefMap[countryName] = newEntry;
                    countryArray.push(newEntry);
                }
                if (supercharger.isConstruction()) {
                    countryRefMap[countryName].construction++;
                    totalConstruction++;
                }
                else if (supercharger.isPermit()) {
                    countryRefMap[countryName].permit++;
                    totalPermit++;
                }
                else if (supercharger.isOpen()) {
                    countryRefMap[countryName].open++;
                    totalOpen++;
                } else {
                    throw new Error("unexpected supercharger status" + supercharger);
                }
            }
        );

        countryArray.push({ countryName: 'Total', open: totalOpen, construction: totalConstruction, permit: totalPermit });
        countryArray.sort(SiteCount.sortByOpenCount);
        return countryArray;
    };


    SiteCount.sortByOpenCount = function (one, two) {
        return two.open - one.open;
    };

    return SiteCount;

});