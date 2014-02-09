define(['page/data/CountryCodes', 'site/SiteIterator'], function (CountryCodes, SiteIterator) {

    /**
     *
     * @constructor
     */
    var ConstructionCount = function () {
    };

    /**
     * Construction count.
     *
     * RETURNED ARRAY:
     *
     *  [
     *   { countryName: 'USA',    countryCode: 'us', open: 3, construction: 7, planned: 2  },
     *   { countryName: 'Germany',countryCode: 'de', open: 3, construction: 4, planned: 1   }
     *  ]
     *
     * REFERENCE MAP:
     *
     * { us : arrayRef,
     *   de: arrayRef
     * }
     */
    ConstructionCount.getConstructionCount = function () {
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
                    var newEntry = { countryName: countryName, countryCode: CountryCodes.fromName(countryName), open: 0, construction: 0, planned: 0 };
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

        countryArray.push({ countryName: 'Total', countryCode: 'Total', open: totalOpen, construction: totalConstruction, planned: totalPlanned });
        countryArray.sort(ConstructionCount.sortByOpenCount);
        return countryArray;
    };


    ConstructionCount.sortByOpenCount = function (one, two) {
        return two.open - one.open;
    };

    return ConstructionCount;

});