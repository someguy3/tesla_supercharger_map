define(['data/SuperchargerData', 'util/Objects', 'lib/stupidtable' ], function (SuperchargerData, Objects) {

    /**
     * Constructor
     */
    var DataViewTable = function () {

        this.superChargerDataTable = $("#supercharger-data-table");

        this.superData = new SuperchargerData();

        this.draw();
        this.sort();
    };

    DataViewTable.prototype.draw = function () {

        var tableBodyData = this.superChargerDataTable.find("tbody");

        for (var i = 0; i < this.superData.size(); i++) {
            var supercharger = this.superData.get(i);

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
                "<td>" + Objects.nullSafeToString(supercharger.dateOpened) + "</td>" +
                "<td class='tog'>" + "<a href='" + supercharger.url + "'>link</a></td>" +
                "</tr>"
            );
        }
    };

    DataViewTable.prototype.sort = function () {
        var table = $("#supercharger-data-table").stupidtable({});

        table.on("aftertablesort", function (event, data) {
            var th = $(this).find("th");
            th.find(".arrow").remove();
            var dir = $.fn.stupidtable.dir;

            var arrow = data.direction === dir.ASC ? "&uarr;" : "&darr;";
            th.eq(data.column).append('<span class="arrow">&nbsp;' + arrow +'</span>');
        });

    }


    return DataViewTable;

});