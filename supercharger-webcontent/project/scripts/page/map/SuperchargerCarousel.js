define(['page/data/ConstructionCount'], function (ConstructionCount) {


    /**
     *
     * @constructor
     */
    var SuperchargerCarousel = function () {
        this.currentIndex = 0;
        this.countryCountArray = ConstructionCount.getConstructionCount();
        this.table = $("#carousel-table");

        this.cellUp = this.table.find("td.up");
        this.cellDown = this.table.find("td.down");

        this.cellUp.click(jQuery.proxy(this.handleUp, this));
        this.cellDown.click(jQuery.proxy(this.handleDown, this));

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

        this.updateTableControls();
    };

    SuperchargerCarousel.prototype.updateTableRow = function (row, countryEntry) {
        var nonControlCells = row.find("td[rowspan!=2]");
        nonControlCells.eq(0).text(countryEntry.open);
        nonControlCells.eq(1).text(countryEntry.construction);
        nonControlCells.eq(2).text(countryEntry.countryName);
        if (countryEntry.countryName === "Total") {
            row.addClass("emphasize");
        } else {
            row.removeClass("emphasize");
        }
    };

    SuperchargerCarousel.prototype.updateTableControls = function () {
        if (this.currentIndex === 0) {
            this.cellUp.find("div").addClass("icon-grey-link");
        } else {
            this.cellUp.find("div").removeClass("icon-grey-link");
        }
        if (this.currentIndex === this.countryCountArray.length - 2) {
            this.cellDown.find("div").addClass("icon-grey-link");
        } else {
            this.cellDown.find("div").removeClass("icon-grey-link");
        }

    };


    return SuperchargerCarousel;

});