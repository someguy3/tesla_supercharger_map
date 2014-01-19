define(['page/data/SuperchargerData', 'util/Dates', 'lib/stupidtable' ], function (SuperchargerData, Dates) {

    /**
     * Constructor
     */
    var DataViewTable = function () {
        this.superChargerDataTable = $("#supercharger-data-table");
    };

    DataViewTable.prototype.createTable = function () {
        this.appendTableContent();
        this.setupTableSortPlugin();
    };

    DataViewTable.prototype.appendTableContent = function () {

        var tableBodyData = this.superChargerDataTable.find("tbody");

        var superData = new SuperchargerData();

        for (var i = 0; i < superData.size(); i++) {
            var supercharger = superData.get(i);

            tableBodyData.append("" +
                "<tr>" +
                "<td>" + supercharger.displayName + "</td>" +
                "<td>" + supercharger.address.street + "</td>" +
                "<td>" + supercharger.address.city + "</td>" +
                "<td>" + supercharger.address.state + "</td>" +
                "<td>" + supercharger.address.zip + "</td>" +
                "<td>" + supercharger.address.country + "</td>" +
                "<td class='gps'>" + supercharger.location.toUrlValue() + "</td>" +
                "<td>" + (supercharger.construction ? "Construction" : "Open") + "</td>" +
                "<td>" + Dates.toString(supercharger.dateOpened) + "</td>" +
                "<td class='tog'>" + "<a href='" + supercharger.url + "'>link</a></td>" +
                "</tr>"
            );
        }
    };

    DataViewTable.prototype.setupTableSortPlugin = function () {
        var table = $("#supercharger-data-table").stupidtable({});

        table.on("aftertablesort", function (event, data) {
            var th = $(this).find("th");
            th.find(".arrow").remove();
            var dir = $.fn.stupidtable.dir;

            var arrow = data.direction === dir.ASC ? "&uarr;" : "&darr;";
            th.eq(data.column).append('<span class="arrow">&nbsp;' + arrow + '</span>');
        });

    };


    return DataViewTable;

});