define(['data/CountryCodes', 'data/SuperchargerData'], function (CountryCodes, SuperchargerData) {


    /**
     *
     * @constructor
     */
    var SuperchargerCarousel = function () {
        this.currentIndex = 0;
        this.countryCountArray = this.getConstructionCount();
        this.table = $("#carousel-table");

        this.table.find("td.up").click(jQuery.proxy(this.handleUp, this));
        this.table.find("td.down").click(jQuery.proxy(this.handleDown, this));

        this.updateView();
    };

    SuperchargerCarousel.prototype.handleUp = function (event) {
        event.preventDefault();
        if (this.currentIndex > 0) {
            this.currentIndex--;
            this.updateView();
        }
    };
    SuperchargerCarousel.prototype.handleDown = function (event) {
        event.preventDefault();
        if (this.currentIndex < this.countryCountArray.length - 2) {
            this.currentIndex++;
            this.updateView();
        }
    };


    SuperchargerCarousel.prototype.updateView = function () {
        var countryEntry1 = this.countryCountArray[this.currentIndex];
        var countryEntry2 = this.countryCountArray[this.currentIndex + 1];

        var row1 = this.table.find("tr").eq(0);
        var row2 = this.table.find("tr").eq(1);

        this.updateTableRow(row1, countryEntry1);
        this.updateTableRow(row2, countryEntry2);
    }

    SuperchargerCarousel.prototype.updateTableRow = function (row, countryEntry) {
        row.find("td").eq(0).text(countryEntry.countryName);
        row.find("td").eq(1).text(countryEntry.open);
        row.find("td").eq(2).text(countryEntry.construction);
    }


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
    SuperchargerCarousel.prototype.getConstructionCount = function () {
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
        countryArray.sort(this.sort);
        return countryArray;
    };


    SuperchargerCarousel.prototype.sort = function (one, two) {
        return two.open - one.open;
    };

    return SuperchargerCarousel;

});