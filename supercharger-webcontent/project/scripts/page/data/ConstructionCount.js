define(['page/data/CountryCodes', 'page/data/SuperchargerData'], function (CountryCodes, SuperchargerData) {

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
     *   { countryName: 'USA',    countryCode: 'us', open: 3, construction: 7  },
     *   { countryName: 'Germany',countryCode: 'de', open: 3, construction: 7  }
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
            totalConstruction = 0;

        for (; i < SuperchargerData.LIST.length; i++) {
            var supercharger = SuperchargerData.LIST[i];
            if (!supercharger.custom && supercharger.count) {
                var countryName = supercharger.address.country;
                if (!countryRefMap[countryName]) {
                    var newEntry = { countryName: countryName, countryCode: CountryCodes.fromName(countryName), open: 0, construction: 0 };
                    countryRefMap[countryName] = newEntry;
                    countryArray.push(newEntry);
                }
                if (supercharger.construction) {
                    countryRefMap[countryName].construction++;
                    totalConstruction++;
                } else {
                    countryRefMap[countryName].open++;
                    totalOpen++;
                }
            }
        }
        countryArray.push({ countryName: 'Total', countryCode: 'Total', open: totalOpen, construction: totalConstruction });
        countryArray.sort(ConstructionCount.sort);
        return countryArray;
    };


    ConstructionCount.sort = function (one, two) {
        return two.open - one.open;
    };

    return ConstructionCount;

});