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
     *   { countryName: 'USA',    open: 3, construction: 7, planned: 2  },
     *   { countryName: 'Germany',open: 3, construction: 4, planned: 1   }
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
            totalPlanned = 0;

        new SiteIterator()
            .withPredicate(SiteIterator.PRED_NOT_CUSTOM)
            .withPredicate(SiteIterator.PRED_IS_COUNTED)
            .iterate(function (supercharger) {
                var countryName = supercharger.address.country;
                if (!countryRefMap[countryName]) {
                    var newEntry = { countryName: countryName, open: 0, construction: 0, planned: 0 };
                    countryRefMap[countryName] = newEntry;
                    countryArray.push(newEntry);
                }
                if (supercharger.isConstruction()) {
                    countryRefMap[countryName].construction++;
                    totalConstruction++;
                }
                else if (supercharger.isPlanned()) {
                    countryRefMap[countryName].planned++;
                    totalPlanned++;
                }
                else if (supercharger.isOpen()) {
                    countryRefMap[countryName].open++;
                    totalOpen++;
                } else {
                    throw new Error("unexpected supercharger status" + supercharger);
                }
            }
        );

        countryArray.push({ countryName: 'Total', open: totalOpen, construction: totalConstruction, planned: totalPlanned });
        countryArray.sort(SiteCount.sortByOpenCount);
        return countryArray;
    };


    SiteCount.sortByOpenCount = function (one, two) {
        return two.open - one.open;
    };

    return SiteCount;

});